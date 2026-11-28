"""make_voice.py: placeholder voices for the motion test + the lip-sync envelopes.
  /home/user/heart-tts/venv/bin/python make_voice.py
Writes voice/<id>.wav (24 kHz) and voice/<id>.json = {fps:30, dur, rms:[...], open:[...], bright:[...]}:
  rms    loudness per 1/30 s (dB-normalised 0..1),
  open   the mouth track for the rig's o.mouth: gated on silence, fast attack (1 frame), slower release (about 3 frames),
  bright spectral centroid 0..1 (0 = dark "oo", 1 = bright "ee/ss"), for a future mouthShape hook.
The same envelope() works on any wav (the real Character Voice Kit lines later): python make_voice.py --env some.wav out.json"""
import sys, json, os, numpy as np, soundfile as sf
H = os.path.dirname(os.path.abspath(__file__)); FPS = 30

def envelope(x, sr, fps=FPS):
    hop = sr // fps; n = int(np.ceil(len(x) / hop)); x = np.concatenate([x, np.zeros(n * hop - len(x) + hop)])
    rms, bright = [], []
    for i in range(n):
        w = x[max(0, i * hop - hop // 2): i * hop + hop + hop // 2]        # a 2-frame window centred on the frame
        r = np.sqrt(np.mean(w ** 2) + 1e-12); rms.append(r)
        sp = np.abs(np.fft.rfft(w * np.hanning(len(w)))); f = np.fft.rfftfreq(len(w), 1 / sr)
        bright.append(float((sp * f).sum() / (sp.sum() + 1e-9)))
    rms = np.array(rms); db = 20 * np.log10(rms + 1e-9); top = np.percentile(db[db > -55], 95) if (db > -55).any() else -20
    lv = np.clip((db - (top - 26)) / 26, 0, 1)                               # 26 dB of range under the loud syllables
    gate = lv > .18; raw = np.where(gate, lv ** .8, 0)
    # the vowel core opens the mouth, consonant dips close it: sharpen the dips, then attack/release
    op = np.zeros(n); v = 0.0
    for i in range(n):
        tgt = raw[i]; v = v + (tgt - v) * (.85 if tgt > v else .42); op[i] = v
    op = np.where(op < .06, 0, op)
    br = np.clip((np.array(bright) - 700) / 2300, 0, 1)
    r3 = lambda a: [round(float(q), 3) for q in a]
    return {"fps": fps, "dur": round(len(x) / sr, 3), "rms": r3(lv), "open": r3(op), "bright": r3(br)}

if len(sys.argv) > 3 and sys.argv[1] == "--env":
    x, sr = sf.read(sys.argv[2]); x = x.mean(1) if x.ndim > 1 else x; json.dump(envelope(x, sr), open(sys.argv[3], "w")); sys.exit()

import parselmouth
from parselmouth.praat import call
from kokoro_onnx import Kokoro
D = '/home/user/heart-tts'; k = Kokoro(D + '/kokoro.onnx', D + '/voices.bin'); SR = 24000
LINES = [  # id, voice, speed, pitch shift in semitones, pitch swing, text   (placeholders; the real voices come from the Character Voice Kit)
  ("heart1", "af_heart", .96, 0, 1.6, "The wind-up robot. Look at it go!"),
  ("heart2", "af_heart", .96, 0, 1.6, "Living, or non-living? Lock it in!"),
  ("heart3", "af_heart", 1.02, 3, 2.2, "Locked in!"),
  ("basil", "am_puck", 1.02, 2, 1.7, "Living! It moves, so it's living!"),
  ("pip", "am_michael", 1.0, 5, 1.5, "Non-living. I saw you wind it up, Basil."),
  ("momo", "af_bella", 1.0, 3, 1.8, "Non-living. Does it ever get hungry?")]
out = {}
for id, voice, speed, semi, swing, text in LINES:
    f = f"{H}/voice/{id}.wav"
    if not os.path.exists(f):
        a, sr = k.create(text, voice=voice, speed=speed, lang='en-us'); x = a.astype(np.float64)
        snd = parselmouth.Sound(x, SR); m = call(snd, 'To Manipulation', 0.01, 90, 500); pt = call(m, 'Extract pitch tier')
        med = call(snd.to_pitch(time_step=0.01, pitch_floor=90, pitch_ceiling=500), 'Get quantile', 0, 0, 0.5, 'Hertz')
        call(pt, 'Formula', f'{med * 2 ** (semi / 12)} * 2 ^ ({swing} * log2(self / {med}))'); call([pt, m], 'Replace pitch tier')
        x = call(m, 'Get resynthesis (overlap-add)').values[0]
        idx = np.where(np.abs(x) > 0.01)[0]; x = x[max(0, idx[0] - 120): idx[-1] + 480]
        sp = x[np.abs(x) > 0.003]; x = np.clip(x * (10 ** (-20.5 / 20) / np.sqrt(np.mean(sp ** 2))), -0.98, 0.98)
        sf.write(f, x.astype(np.float32), SR, subtype='PCM_16')
    x, sr = sf.read(f); e = envelope(x, sr); json.dump(e, open(f"{H}/voice/{id}.json", "w")); out[id] = e; print(id, e["dur"], flush=True)
# one js file the pages load: window.VOICE = { id: {fps, dur, open, rms, bright} }
open(f"{H}/voice/voice.js", "w").write("window.VOICE = " + json.dumps(out) + ";\n")
