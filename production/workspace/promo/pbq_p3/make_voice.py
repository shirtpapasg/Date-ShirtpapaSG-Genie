"""make_voice.py: renders script.py's lines in Heart's voice, the game's own recipe (render_all.heart: Kokoro af_heart, speed 0.90,
pitch swing 1.6, sentence gap 0.35 s, sg_pron fixes). "TheOneApp" is spoken "The One App". Output voice/<id>.wav (24 kHz) + voice/dur.json.
Run with the heart-tts venv:  /home/user/heart-tts/venv/bin/python make_voice.py [--force]"""
import os, sys, re, json
import numpy as np, soundfile as sf
H = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, H)
sys.path.insert(0, "/tmp/claude-0/-home-user/74176568-2247-5488-9d44-67460063f436/scratchpad/p3quest")
sys.argv = sys.argv[:1] + [x for x in sys.argv[1:] if x == "--force"]
import render_all as RA                     # heart() = the game's Heart recipe; it passes every sentence through sg_pron
from sg_pron import needs_fix
from script import LINES
os.makedirs(H + "/voice", exist_ok=True); DUR = {}
for k, L in LINES.items():
    f = f"{H}/voice/{k}.wav"; say = re.sub(r"\bTheOneApp\b", "The One App", L["say"])
    if os.path.exists(f) and "--force" not in sys.argv: DUR[k] = sf.info(f).duration; continue
    x, sr = RA.heart(say, gap=.35)
    x = np.asarray(x, np.float64); i = np.where(np.abs(x) > .01)[0]; x = x[max(0, i[0] - int(.02 * sr)): i[-1] + int(.12 * sr)]
    sf.write(f, x.astype(np.float32), sr, subtype="PCM_16"); DUR[k] = len(x) / sr
    print(f"{k:8s} {DUR[k]:.2f}s sg_pron:{needs_fix(say)} | {say}", flush=True)
json.dump({k: round(v, 3) for k, v in DUR.items()}, open(H + "/voice/dur.json", "w"), indent=1)
