"""check_words.py: a machine listen of the words the script asks to check (section 10 H and question (l); the brief): "engineers", "use" (the
noun in "intended use" / "its own use", "yooss"), "diversity" (the British "dy"), "extinct", "salamander", "macaw" ("muh-KAW"; j902 says it
as "mcaw"), in every voice that says them, and qa/new_words_check.m4a (each take in a row, with its index in qa/new_words_check.txt).
  /home/user/heart-tts/venv/bin/python check_words.py
For each take: the word's span (forced alignment from voice/<id>.json; a one-word line or a buddy's unison track: the whole voiced span), then
pocketsphinx chooses between the right sound and a wrong one (a two-way grammar; the read-along's "Intended use." keeps "intended" as context):
engineers EH N JH AH N IH R Z vs EH N JH AY N ER Z ("en-JINE-ers"); use Y UW S vs Y UW Z; diversity D AY V ER S AH T IY vs D IH V ER S AH T IY;
extinct IH K S T IH NG K T vs IH K S T IH N T (the k lost); salamander S AE L AH M AE N D ER vs S AH L AE M AH N D ER (sa-LAM-under); macaw
M AH K AO vs M AE K AO ("MAK-aw"). Each take is decoded three times (whole, 40 ms and 80 ms shorter: the decoder is noisy on short takes) and
the majority is printed; for "use" Praat measures how voiced the last 90 ms are (an "s" is unvoiced: low; a "z" is voiced: high).
Also printed: Kokoro's own phonemes for each word (what the TTS was asked to say). Prints one row per take."""
import os, sys, json, wave, subprocess, tempfile, numpy as np, soundfile as sf, parselmouth, pocketsphinx
from pocketsphinx import Decoder
H = os.path.dirname(os.path.abspath(__file__)); V = H + "/voice"
ALT = {"engineers": ("EH N JH AH N IH R Z", "EH N JH AY N ER Z"), "use": ("Y UW S", "Y UW Z"), "diversity": ("D AY V ER S AH T IY", "D IH V ER S AH T IY"),
       "extinct": ("IH K S T IH NG K T", "IH K S T IH N T"), "salamander": ("S AE L AH M AE N D ER", "S AH L AE M AH N D ER"), "macaw": ("M AH K AO", "M AE K AO")}
B3 = lambda id, word, lab: [(id, word, 0, w, f"{w.capitalize()}, {lab}") for w in ("pip", "basil", "momo")]
# (id, word, nth, who-track or None, label)
TAKES = [("g402", "engineers", 0, None, "Basil, goal card: \"What engineers do.\""), ("g701", "engineers", 0, None, "Heart: \"That is what engineers do!\""),
  ("g702", "engineers", 0, None, "Momo: \"So we are engineers too!\""), ("g703", "engineers", 0, None, "Heart: \"Engineers design and make new products.\""),
  ("g801", "engineers", 0, None, "Heart: \"Engineers follow a plan.\""), ("g1402", "engineers", 0, None, "Heart: \"Engineers do not guess.\""),
  ("j101", "engineers", 0, None, "Heart, Part 2 recap: \"like engineers\""), ("j505", "engineers", 0, None, "Heart: \"After designing, engineers test their product.\""),
  ("hk_engineers", "engineers", 0, None, "Heart, read-along: \"Engineers.\""), *B3("uk_engineers", "engineers", "read-along"),
  ("g804", "use", 0, None, "Heart, look-closer: \"its intended use\""), ("g903", "use", 0, None, "Heart, HOLD ON!: \"Each part has its own use.\""),
  ("hk_intended_use", "use", 0, None, "Heart, read-along: \"Intended use.\""), *B3("uk_intended_use", "use", "read-along: \"Intended use.\""),
  ("j802", "use", 0, None, "Basil, Mark Sentence 3.30: \"the intended use of the object\""),
  ("j1002", "diversity", 0, None, "Heart, the strip D3: \"maintain diversity\""), ("hk_diversity", "diversity", 0, None, "Heart, read-along: \"Diversity.\""), *B3("uk_diversity", "diversity", "read-along"),
  ("j1004", "extinct", 0, None, "Momo, Mark Sentence 1.22: \"will become extinct\""), ("hk_extinct", "extinct", 0, None, "Heart, read-along: \"Extinct.\""), *B3("uk_extinct", "extinct", "read-along"),
  ("j902", "salamander", 0, None, "Basil, zoo map: \"Frog and salamander.\""), ("j902", "macaw", 0, None, "Basil, zoo map: \"Flamingo, macaw\" (spoken as \"mcaw\")")]
norm = lambda w: "".join(c for c in w.lower() if c.isalpha())

def span(id, word, nth, who):
    j = json.load(open(f"{V}/{id}.json")); f = f"{V}/{id}_{who}.wav" if who else f"{V}/{id}.wav"; x, sr = sf.read(f)
    if x.ndim > 1: x = x.mean(1)
    ws = [w for w in j["words"] if norm(w["w"]) == word]; one = len(j["words"]) == 1
    if who or one or not j.get("aligned", True):
        seg = x; env = np.convolve(np.abs(seg), np.ones(480) / 480, "same"); on = np.where(env > env.max() * .08)[0]
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

def tail_voicing(seg, sr):
    end = len(seg) / sr; snd = parselmouth.Sound(seg.astype(np.float64), sr); p = snd.to_pitch(time_step=.005, pitch_floor=90, pitch_ceiling=600)
    f = p.selected_array["frequency"]; ts = p.xs(); v = f[(ts > end - .09)]; return float((v > 0).mean()) if len(v) else 0.0

try:
    from kokoro_onnx.tokenizer import Tokenizer
    _tk = Tokenizer(); PH = {w: _tk.phonemize(w, lang="en-us") for w in ("engineers", "intended use", "diversity", "extinct", "salamander", "macaw", "mcaw")}
    print("Kokoro phonemes:", "  ".join(f"{k} {v}" for k, v in PH.items()))
except Exception as e: PH = {}; print("phonemes not available:", e)

rows = []
for id, word, nth, who, lab in TAKES:
    seg, sr = span(id, word, nth, who)
    ctx = ["intended", "use"] if id in ("uk_intended_use", "hk_intended_use") else None
    good, bad = ALT[word]; vs = [pick(seg[:len(seg) - int(c * sr)] if c else seg, sr, good, bad, word, ctx) for c in (0, .04, .08)]
    v = max(("right", "wrong"), key=vs.count) if vs.count("right") != vs.count("wrong") else "?"; v = v + " " + "".join(x[0] for x in vs)
    tv = tail_voicing(seg, sr) if word == "use" else None
    rows.append((lab, id, word, v, tv)); print(f"{lab:62s} {id:16s} {word:10s} heard: {v:9s}" + (f"  last 90 ms voiced {tv:.2f}" if tv is not None else ""), flush=True)
json.dump({"phonemes": PH, "takes": [{"take": r[0], "id": r[1], "word": r[2], "heard": r[3], "tail_voiced": r[4]} for r in rows]}, open(H + "/qa/new_words_check.json", "w"), indent=1)

# the listening clip: every take in a row (a short line whole; a long line cut to the word with 1.4 s round it; the one-word / unison takes whole), 0.6 s apart
clips, t, idx = [], 0.0, []
for id, word, nth, who, lab in TAKES:
    f = f"{V}/{id}_{who}.wav" if who else f"{V}/{id}.wav"; x, sr = sf.read(f)
    if x.ndim > 1: x = x.mean(1)
    j = json.load(open(f"{V}/{id}.json"))
    if not who and len(x) / sr > 6:
        w = [w for w in j["words"] if norm(w["w"]) == word][nth]; x = x[int(max(0, w["a"] - 1.4) * sr): int(min(len(x) / sr, w["b"] + 1.0) * sr)]
    idx.append(f"{int(t // 60)}:{t % 60:04.1f}  {lab} ({id}{'/' + who if who else ''}, {word})"); clips += [x, np.zeros(int(.6 * sr))]; t += len(x) / sr + .6
y = np.concatenate(clips); y = y / max(1e-6, np.abs(y).max()) * .9
sf.write(H + "/qa/_new_words_check.wav", y.astype(np.float32), sr)
subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", H + "/qa/_new_words_check.wav", "-c:a", "aac", "-b:a", "96k", H + "/qa/new_words_check.m4a"], check=True)
os.remove(H + "/qa/_new_words_check.wav")
open(H + "/qa/new_words_check.txt", "w").write("qa/new_words_check.m4a: each take in a row (check_words.py)\n" + "\n".join(idx) + "\n")
print(f"qa/new_words_check.m4a {t:.1f} s")
