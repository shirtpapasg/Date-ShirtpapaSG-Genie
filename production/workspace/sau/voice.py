"""voice.py: Heart's narration for a TheOneApp, Explored video (voice 3, the same recipe as the episodes).

Kokoro af_heart, one sentence at a time at speed 0.94, pitch swing widened 1.6 times around her median, 0.57 s between
sentences, levelled to -21.7 dB. A segment marked "excited" (the closing "Now you know!") is said brighter: faster,
pitched up about three semitones, a wider swing and 3 dB louder.

    python voice.py ep01/ep01_segments.json ep01/aud        (needs kokoro-onnx, soundfile, praat-parselmouth;
                                                             KOKORO_DIR holds kokoro.onnx and voices.bin)
"""
import sys, json, os, re, numpy as np, soundfile as sf, parselmouth
from parselmouth.praat import call
from kokoro_onnx import Kokoro
D = os.environ.get('KOKORO_DIR', '/home/user/heart-tts'); k = Kokoro(D + '/kokoro.onnx', D + '/voices.bin'); SR = 24000
spec = json.load(open(sys.argv[1])); out = sys.argv[2]; GAP = 0.57
os.makedirs(out + '/sent', exist_ok=True)
def sents(t): return [p for p in re.split(r'(?<=[.!?])\s+', t.replace('TheOneApp', 'The One App')) if p.strip()]
for s in spec['segments']:
    ex = bool(s.get('excited')); speed, swing, shift, gain = (1.02, 2.2, 2 ** (3 / 12), 3.0) if ex else (0.94, 1.6, 1.0, 0.0)
    for i, p in enumerate(sents(s['text'])):
        f = f"{out}/sent/{s['id']}_{i:02d}.wav"
        if os.path.exists(f): continue
        a, sr = k.create(p, voice='af_heart', speed=speed, lang='en-us'); x = a.astype(np.float64)
        snd = parselmouth.Sound(x, SR); m = call(snd, 'To Manipulation', 0.01, 120, 500); pt = call(m, 'Extract pitch tier')
        med = call(snd.to_pitch(time_step=0.01, pitch_floor=120, pitch_ceiling=500), 'Get quantile', 0, 0, 0.5, 'Hertz')
        call(pt, 'Formula', f'{med * shift} * 2 ^ ({swing} * log2(self / {med}))'); call([pt, m], 'Replace pitch tier')
        x = call(m, 'Get resynthesis (overlap-add)').values[0]
        idx = np.where(np.abs(x) > 0.01)[0]; x = x[max(0, idx[0] - 120): idx[-1] + 240]
        sf.write(f, x.astype(np.float32), SR)
    parts = []
    for i in range(len(sents(s['text']))):
        x, _ = sf.read(f"{out}/sent/{s['id']}_{i:02d}.wav"); parts += [x, np.zeros(int(SR * GAP))]
    x = np.concatenate(parts[:-1]); sp = x[np.abs(x) > 0.003]
    x = np.clip(x * (10 ** ((-21.7 + gain) / 20) / np.sqrt(np.mean(sp ** 2))), -0.98, 0.98)
    sf.write(f"{out}/{s['id']}.wav", x.astype(np.float32), SR, subtype='PCM_16'); print(s['id'], round(len(x) / SR, 2), flush=True)
