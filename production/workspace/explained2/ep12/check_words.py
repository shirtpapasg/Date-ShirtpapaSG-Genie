"""check_words.py: a machine listen of the words the script asks to check (section 10 H; the brief): "use" (the noun, "yooss"), "suitable",
"purpose" (and "purposes"), "fragile" (FRAJ-ile, from ../sg_pron.py), in every voice that says them, and qa/new_words_check.m4a (each clip in a row).
  /home/user/heart-tts/venv/bin/python check_words.py
For each take: the word's span (forced alignment from voice/<id>.json; a one-word line or a buddy's unison / chant track: the whole voiced span),
then pocketsphinx chooses between the right sound and a wrong one (a two-way grammar) (use: Y UW S vs Y UW Z; suitable: S UW T AH B AH L vs S W IY T AH B AH L;
purpose: P ER P AH S vs P ER P OW Z; fragile: F R AE JH AY L vs F R AE JH AH L) and Praat measures how voiced the last 90 ms are (an "s" is
unvoiced: low; a "z" is voiced: high). Prints one row per take."""
import os, sys, json, wave, subprocess, tempfile, numpy as np, soundfile as sf, parselmouth, pocketsphinx
from pocketsphinx import Decoder
H = os.path.dirname(os.path.abspath(__file__)); V = H + "/voice"
ALT = {"use": ("Y UW S", "Y UW Z"), "uses": ("Y UW S IH Z", "Y UW Z IH Z"), "suitable": ("S UW T AH B AH L", "S W IY T AH B AH L"),
       "purpose": ("P ER P AH S", "P ER P OW Z"), "purposes": ("P ER P AH S IH Z", "P ER P OW Z IH Z"), "fragile": ("F R AE JH AY L", "F R AE JH AH L")}
# (id, word, nth, who-track or None, label)
TAKES = [("g1003", "use", 0, None, "Heart, HOLD ON!: \"It depends on the use.\""), ("j1008", "use", 0, None, "Heart, the strip: \"the intended use\""),
  ("hk_use", "use", 0, None, "Heart, read-along: \"Use.\""), ("uk_use", "use", 0, "pip", "Pip, read-along"), ("uk_use", "use", 0, "basil", "Basil, read-along"), ("uk_use", "use", 0, "momo", "Momo, read-along"),
  ("j602", "use", 0, None, "Basil, Mark Sentence 3.26: \"the use of the object\""), ("g1105", "use", 0, None, "Momo: \"A different use!\""), ("g403", "uses", 0, None, "Momo, goal card: \"Properties decide uses.\""),
  ("j304", "suitable", 0, None, "Pip, goal card: \"Choosing a suitable material.\""), ("j1008", "suitable", 0, None, "Heart, the strip: \"suitable\""), ("hk_suitable", "suitable", 0, None, "Heart, read-along: \"Suitable.\""),
  ("uk_suitable", "suitable", 0, "pip", "Pip, read-along"), ("uk_suitable", "suitable", 0, "basil", "Basil, read-along"), ("uk_suitable", "suitable", 0, "momo", "Momo, read-along"),
  ("c1003", "suitable", 0, "pip", "Pip, chant"), ("c1003", "suitable", 0, "basil", "Basil, chant"), ("c1003", "suitable", 0, "momo", "Momo, chant"),
  ("g402", "purposes", 0, None, "Momo, goal card: \"Objects have purposes.\""), ("g504", "purpose", 0, None, "Heart, look-closer: \"That is its purpose.\""), ("g602", "purposes", 0, None, "Pip, Mark Sentence 3.24: \"different purposes\""),
  ("g603", "purpose", 0, None, "Heart: \"Each has its own purpose.\""), ("hk_purpose", "purpose", 0, None, "Heart, read-along: \"Purpose.\""),
  ("uk_purpose", "purpose", 0, "pip", "Pip, read-along"), ("uk_purpose", "purpose", 0, "basil", "Basil, read-along"), ("uk_purpose", "purpose", 0, "momo", "Momo, read-along"),
  ("c1003", "purpose", 0, "pip", "Pip, chant"), ("c1003", "purpose", 0, "basil", "Basil, chant"), ("c1003", "purpose", 0, "momo", "Momo, chant"),
  ("g805", "fragile", 0, None, "Heart, the strip 3.13a (sg_pron FRAJ-ile)")]
norm = lambda w: "".join(c for c in w.lower() if c.isalpha())

def span(id, word, nth, who):
    j = json.load(open(f"{V}/{id}.json")); f = f"{V}/{id}_{who}.wav" if who else f"{V}/{id}.wav"; x, sr = sf.read(f)
    if x.ndim > 1: x = x.mean(1)
    ws = [w for w in j["words"] if norm(w["w"]) == word]; one = len(j["words"]) == 1
    if who or one or not j.get("aligned", True):
        if who and id == "c1003": a, b = ws[nth]["a"] - .15, ws[nth]["b"] + .35       # the chant: the answer's slot (spread evenly), padded
        else: a, b = 0, len(x) / sr
        seg = x[int(max(0, a) * sr): int(b * sr)]; env = np.convolve(np.abs(seg), np.ones(480) / 480, "same"); on = np.where(env > env.max() * .08)[0]
        return seg[max(0, on[0] - int(.05 * sr)): on[-1] + int(.15 * sr)], sr       # padded: a final "s" is quiet
    w = ws[nth]; return x[int(max(0, w["a"] - .04) * sr): int((w["b"] + .14) * sr)], sr

def pick(seg, sr, good, bad, word, ctx=None):
    """pocketsphinx chooses between the right and the wrong sound (a JSGF grammar: [context] (right | wrong) [context]) -> "right" / "wrong" / "?" """
    with tempfile.TemporaryDirectory() as td:
        w = td + "/a.wav"; sf.write(w, seg.astype(np.float32), sr); w16 = td + "/b.wav"
        subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", w, "-ar", "16000", "-ac", "1", "-c:a", "pcm_s16le", w16], check=True)
        d = Decoder(samprate=16000, loglevel="FATAL"); d.add_word("xright", good, True); d.add_word("xwrong", bad, True)
        body = " ".join("(xright | xwrong)" if c == word else c for c in (ctx or [word]))
        d.add_jsgf_string("g", "#JSGF V1.0; grammar g; public <s> = " + body + ";"); d.activate_search("g")
        wf = wave.open(w16, "rb"); raw = wf.readframes(wf.getnframes()); d.start_utt(); d.process_raw(raw, full_utt=True); d.end_utt()
        h = d.hyp(); hs = h.hypstr if h else ""
        return "right" if "xright" in hs else "wrong" if "xwrong" in hs else "?"

def tail_voicing(seg, sr, word):
    end = len(seg) / sr; snd = parselmouth.Sound(seg.astype(np.float64), sr); p = snd.to_pitch(time_step=.005, pitch_floor=90, pitch_ceiling=600)
    f = p.selected_array["frequency"]; ts = p.xs(); v = f[(ts > end - .09)]; return float((v > 0).mean()) if len(v) else 0.0

rows = []
for id, word, nth, who, lab in TAKES:
    seg, sr = span(id, word, nth, who)
    ctx = (["the", word] if word == "purpose" else ["a", word, "material"]) if id == "c1003" else None
    good, bad = ALT[word]; vs = [pick(seg[:len(seg) - int(c * sr)] if c else seg, sr, good, bad, word, ctx) for c in (0, .04, .08)]
    v = max(("right", "wrong"), key=vs.count) if vs.count("right") != vs.count("wrong") else "?"; v = v + " " + "".join(x[0] for x in vs)
    tv = tail_voicing(seg, sr, word) if word in ("use", "purpose", "uses", "purposes") and not ctx else None
    rows.append((lab, id, word, v, tv)); print(f"{lab:58s} {id:12s} {word:9s} heard: {v:6s}" + (f"  last 90 ms voiced {tv:.2f}" if tv is not None else ""), flush=True)
json.dump([{"take": r[0], "id": r[1], "word": r[2], "heard": r[3], "tail_voiced": r[4]} for r in rows], open(H + "/qa/new_words_check.json", "w"), indent=1)

# the listening clip: every take in a row (each word's whole line, or the one-word / unison / chant take), 0.6 s apart, with the index printed
clips, t, idx = [], 0.0, []
seen = set()
for id, word, nth, who, lab in TAKES:
    key = (id, who)
    if key in seen: continue
    seen.add(key); f = f"{V}/{id}_{who}.wav" if who else f"{V}/{id}.wav"; x, sr = sf.read(f)
    if x.ndim > 1: x = x.mean(1)
    if id == "c1003":   # only the answers of lines 1 and 3 (the purpose, a suitable material): slots 0 and 2
        j = json.load(open(f"{V}/{id}.json")); ws = [w for w in j["words"] if w["w"] in ("The", "purpose!", "A", "suitable", "material!")]
        x = np.concatenate([x[int((ws[0]["a"] - .1) * sr): int((ws[1]["b"] + .4) * sr)], np.zeros(int(.4 * sr)), x[int((ws[2]["a"] - .1) * sr): int((ws[4]["b"] + .5) * sr)]])
    idx.append(f"{int(t // 60)}:{t % 60:04.1f}  {lab} ({id}{'/' + who if who else ''})"); clips += [x, np.zeros(int(.6 * sr))]; t += len(x) / sr + .6
y = np.concatenate(clips); y = y / max(1e-6, np.abs(y).max()) * .9
sf.write(H + "/qa/_new_words_check.wav", y.astype(np.float32), sr)
subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", H + "/qa/_new_words_check.wav", "-c:a", "aac", "-b:a", "96k", H + "/qa/new_words_check.m4a"], check=True)
os.remove(H + "/qa/_new_words_check.wav")
open(H + "/qa/new_words_check.txt", "w").write("qa/new_words_check.m4a: each take in a row (check_words.py)\n" + "\n".join(idx) + "\n")
print(f"qa/new_words_check.m4a {t:.1f} s")
