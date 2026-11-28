"""ep13/voice13.py: every spoken line of EP13 -> <aud>/<id>.wav (24 kHz mono, as voice.py), plus ep13/mouth13.js (the buddies' lip-sync).
  Heart  = voice.py's recipe exactly (Kokoro af_heart, speed .94, pitch swing x1.6, .57 s between sentences, -21.7 dB; "excited": brighter).
           "soft" (the BE THE THING journey, as the Explained series' journeys): speed .86, .9 s between sentences, 2.5 dB quieter.
  Pip / Momo / Basil = the saved Character Voice Kit recipes (explained2/characters/sprites/voice_maker.py CHARACTERS, chosen 11 Oct 2026),
           12% slower and -18 dB RMS as in the Explained episodes (explained2/ep27/make_voice.py buddy()), resampled to 24 kHz.
  Names on the teacher's pronunciation list go through explained2/sg_pron.py (none in EP13; checked).
    /home/user/heart-tts/venv/bin/python ep13/voice13.py ep13/ep13_segments.json ep13/aud      (from workspace/sau)"""
import sys, json, os, re, hashlib, numpy as np, soundfile as sf, parselmouth
from parselmouth.praat import call
HERE = os.path.dirname(os.path.abspath(__file__)); EX = os.path.join(HERE, '..', '..', 'explained2')
sys.path.insert(0, EX); sys.path.insert(0, os.path.join(EX, 'characters', 'sprites'))
from sg_pron import needs_fix, speak_line
import voice_maker as vm
D = '/home/user/heart-tts'; SR = 24000; FPS = 30
k = vm.load(D + '/kokoro.onnx', D + '/voices.bin')
spec = json.load(open(sys.argv[1])); out = sys.argv[2]; os.makedirs(out + '/sent', exist_ok=True)
def sents(t): return [p for p in re.split(r'(?<=[.!?])\s+', t.replace('TheOneApp', 'The One App')) if p.strip()]
def heart(s):
    ex, soft = bool(s.get('excited')), bool(s.get('soft'))
    speed, swing, shift, gain = (1.02, 2.2, 2 ** (3 / 12), 3.0) if ex else ((0.86, 1.6, 1.0, -2.5) if soft else (0.94, 1.6, 1.0, 0.0))
    gap = 0.9 if soft else 0.57; parts = []
    for i, p in enumerate(sents(s['text'])):
        f = f"{out}/sent/{s['id']}_{i:02d}_{'s' if soft else 'x' if ex else 'n'}_{hashlib.md5(p.encode()).hexdigest()[:8]}.wav"   # keyed by the sentence's words
        if not os.path.exists(f):
            a, sr = speak_line(k, p, voice='af_heart', speed=speed) if needs_fix(p) else k.create(p, voice='af_heart', speed=speed, lang='en-us')
            x = a.astype(np.float64); snd = parselmouth.Sound(x, SR); m = call(snd, 'To Manipulation', 0.01, 120, 500); pt = call(m, 'Extract pitch tier')
            med = call(snd.to_pitch(time_step=0.01, pitch_floor=120, pitch_ceiling=500), 'Get quantile', 0, 0, 0.5, 'Hertz')
            call(pt, 'Formula', f'{med * shift} * 2 ^ ({swing} * log2(self / {med}))'); call([pt, m], 'Replace pitch tier')
            x = call(m, 'Get resynthesis (overlap-add)').values[0]; idx = np.where(np.abs(x) > 0.01)[0]; x = x[max(0, idx[0] - 120): idx[-1] + 240]
            sf.write(f, x.astype(np.float32), SR)
        x, _ = sf.read(f); parts += [x, np.zeros(int(SR * gap))]
    x = np.concatenate(parts[:-1]); sp = x[np.abs(x) > 0.003]
    return np.clip(x * (10 ** ((-21.7 + gain) / 20) / np.sqrt(np.mean(sp ** 2))), -0.98, 0.98)
def resample(x, sr, to):
    if sr == to: return x
    n = int(len(x) * to / sr); X = np.fft.rfft(x); Y = np.zeros(n // 2 + 1, complex); m = min(len(X), len(Y)); Y[:m] = X[:m]
    return np.fft.irfft(Y, n) * (n / len(x))
def buddy(who, text):
    c = dict(vm.CHARACTERS[who]); c['speed'] = c['speed'] * .88
    x, sr = vm.speak(k, text, c, gap=.22, para_gap=0); x = x.astype(np.float64)
    idx = np.where(np.abs(x) > .01)[0]; x = x[max(0, idx[0] - 240): idx[-1] + 2400]; x = resample(x, sr, SR)
    sp = x[np.abs(x) > .003]; return np.clip(x * (10 ** (-18 / 20) / np.sqrt(np.mean(sp ** 2))), -.98, .98)
def mouth(x):
    """0 closed, 1 half, 2 wide per frame (30 fps): loudness against the line's loud parts, with a 2-frame minimum hold"""
    hop = SR // FPS; n = int(np.ceil(len(x) / hop)); y = np.concatenate([x, np.zeros(n * hop - len(x) + hop)])
    db = np.array([20 * np.log10(np.sqrt(np.mean(y[i * hop:(i + 1) * hop] ** 2)) + 1e-9) for i in range(n)])
    top = np.percentile(db[db > -55], 90) if (db > -55).any() else -20; lv = np.clip((db - (top - 24)) / 24, 0, 1)
    m = np.where(lv > .62, 2, np.where(lv > .22, 1, 0)); o = m.copy()
    for i in range(1, n):
        if o[i] != o[i - 1] and i >= 2 and o[i - 1] != o[i - 2]: o[i] = o[i - 1]
    return [int(v) for v in o]
MOUTH = {}
for s in spec['segments']:
    if s.get('silent'): continue
    who = s.get('who', 'heart'); f = f"{out}/{s['id']}.wav"; meta = f"{out}/{s['id']}.txt"; key = who + '|' + str(s.get('soft')) + '|' + s['text']
    if os.path.exists(f) and os.path.exists(meta) and open(meta).read() == key: x, _ = sf.read(f)
    else:
        x = heart(s) if who == 'heart' else buddy(who, s['text'])
        sf.write(f, x.astype(np.float32), SR, subtype='PCM_16'); open(meta, 'w').write(key)
    if who != 'heart': MOUTH[s['id']] = {'who': who, 'm': mouth(x)}
    print(s['id'], who, round(len(x) / SR, 2), flush=True)
if os.path.basename(out.rstrip('/')) == 'aud':     # the episode's lip-sync (the Shorts reuse the same line ids)
    open(os.path.join(HERE, 'mouth13.js'), 'w').write('window.MOUTH = ' + json.dumps(MOUTH, separators=(',', ':')) + ';\n')
