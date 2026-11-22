"""check_words.py: a machine listen of the words the script asks to check (section 10 H; question (m); the Stage 1 brief): "rotation",
"reproduce" / "reproduces", "cycle" / "cycles" and "life cycle", and the verb "live" ("leev", through ../sg_pron.py: Momo's Mark Sentence
j1003), in every voice that says them, and qa/new_words_check.m4a (each take in a row, with its index in qa/new_words_check.txt).
  /home/user/heart-tts/venv/bin/python check_words.py
For each take: the word's span (forced alignment from voice/<id>.json; a one-word line or a buddy's unison track: the whole voiced span), then
pocketsphinx chooses between the right sound and a wrong one (a two-way grammar; "Life cycle." keeps "life" as context): rotation R OW T EY SH
AH N vs R AA T AH SH AH N ("ROT-uh-shun"); reproduce R IY P R AH D UW S vs R IY P R AH D UW Z (a voiced end); reproduces R IY P R AH D UW S AH
Z vs R IY P R AA D AH K S ("re-products"); cycle(s) S AY K AH L (Z) vs S IH K AH L (Z) ("sickle"); live L IY V ("leev") vs L AY V ("laiv").
Each take is decoded three times (whole, 40 ms and 80 ms shorter: the decoder is noisy on short takes) and the majority is printed. Also
printed: Kokoro's own phonemes for each word, and the phonemes sg_pron gives j1003 (what the TTS was asked to say). One row per take."""
import os, sys, json, wave, subprocess, tempfile, numpy as np, soundfile as sf, parselmouth, pocketsphinx
from pocketsphinx import Decoder
H = os.path.dirname(os.path.abspath(__file__)); V = H + "/voice"
ALT = {"rotation": ("R OW T EY SH AH N", "R AA T AH SH AH N"), "reproduce": ("R IY P R AH D UW S", "R IY P R AH D UW Z"), "reproduces": ("R IY P R AH D UW S AH Z", "R IY P R AA D AH K S"),
       "cycle": ("S AY K AH L", "S IH K AH L"), "cycles": ("S AY K AH L Z", "S IH K AH L Z"), "live": ("L IY V", "L AY V")}
B3 = lambda id, word, lab: [(id, word, 0, w, f"{w.capitalize()}, {lab}") for w in ("pip", "basil", "momo")]
# (id, word, nth, who-track or None, label)
TAKES = [("g708", "rotation", 0, None, "Heart: \"Scientists call this turning: rotation.\""), ("g1002", "rotation", 0, None, "Basil, Mark Sentence C0.3: \"the rotation of the Earth\""),
  ("g1002", "rotation", 1, None, "Basil, Mark Sentence C0.3: \"This rotation takes 24 hours.\""), ("hk_rotation", "rotation", 0, None, "Heart, read-along: \"Rotation.\""), *B3("uk_rotation", "rotation", "read-along"),
  ("g403", "cycle", 0, None, "Pip, goal card: \"What a cycle is.\""), ("g404", "cycle", 0, None, "Pip, goal card: \"Cycle or not?\""), ("g1101", "cycle", 0, None, "Heart: \"...has a name: a cycle.\""),
  ("g1103", "cycles", 0, None, "Momo, Mark Sentence C0.1: \"Cycles are repeated patterns of change.\""), ("g1201", "cycle", 0, None, "Basil, HOLD ON!: \"That means it is a cycle!\""),
  ("g1204", "cycle", 0, None, "Basil: \"so it is not a cycle!\""), ("g1301", "cycle", 0, None, "Pip: \"I think it is a cycle.\""), ("g1304", "cycle", 0, None, "Heart, look-closer: \"the traffic light is a cycle!\""),
  ("g1501", "cycles", 0, None, "Momo: \"Do living things have cycles too?\""), ("hk_cycle", "cycle", 0, None, "Heart, read-along: \"Cycle.\""), *B3("uk_cycle", "cycle", "read-along"),
  ("j101", "cycle", 0, None, "Heart, Part 2 recap: \"That is a cycle\""), ("j303", "cycle", 0, None, "Basil, goal card: \"What a life cycle is.\""), ("j304", "cycles", 0, None, "Basil, goal card: \"Why life cycles matter.\""),
  ("j801", "cycle", 0, None, "Heart: \"that is a life cycle!\""), ("j803", "cycle", 0, None, "Basil, Mark Sentence 4.2: \"A life cycle is...\""), ("j902", "cycle", 0, None, "Pip, his notes: \"a life cycle ends at the adult\""),
  ("j905", "cycle", 0, None, "Momo, Showdown: \"A life cycle repeats\""), ("j1003", "cycles", 0, None, "Momo, Mark Sentence 4.1: \"Life cycles ensure...\""),
  ("hk_life_cycle", "cycle", 0, None, "Heart, read-along: \"Life cycle.\""), *B3("uk_life_cycle", "cycle", "read-along: \"Life cycle.\""),
  ("j604", "reproduce", 0, None, "Heart, look-closer: \"Living things reproduce and have young.\""), ("hk_reproduce", "reproduce", 0, None, "Heart, read-along: \"Reproduce.\""), *B3("uk_reproduce", "reproduce", "read-along"),
  ("j803", "reproduces", 0, None, "Basil, Mark Sentence 4.2: \"...grows over time and reproduces.\""),
  ("j1003", "live", 0, None, "Momo, Mark Sentence 4.1: \"can continue to live on Earth\" (sg_pron: leev)")]
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
    _tk = Tokenizer(); PH = {w: _tk.phonemize(w, lang="en-us") for w in ("rotation", "reproduce", "reproduces", "cycle", "cycles", "life cycle", "live")}
    sys.path.insert(0, os.path.join(H, "..")); from sg_pron import to_phonemes
    PH["j1003 (sg_pron)"] = to_phonemes("Life cycles ensure that living things of the same kind can continue to live on Earth.")
    print("Kokoro phonemes:", "  ".join(f"{k} {v}" for k, v in PH.items()))
except Exception as e: PH = {}; print("phonemes not available:", e)

rows = []
for id, word, nth, who, lab in TAKES:
    seg, sr = span(id, word, nth, who)
    ctx = ["life", "cycle"] if id in ("uk_life_cycle", "hk_life_cycle") else None
    good, bad = ALT[word]; vs = [pick(seg[:len(seg) - int(c * sr)] if c else seg, sr, good, bad, word, ctx) for c in (0, .04, .08)]
    v = max(("right", "wrong"), key=vs.count) if vs.count("right") != vs.count("wrong") else "?"; v = v + " " + "".join(x[0] for x in vs)
    tv = tail_voicing(seg, sr) if word == "reproduce" else None
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
