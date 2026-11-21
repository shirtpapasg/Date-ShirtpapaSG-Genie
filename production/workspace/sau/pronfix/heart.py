"""heart.py: one sentence in Heart's Explored voice, exactly voice.py's recipe (Kokoro af_heart at 0.94, pitch swing 1.6 around
her median, trimmed with the same margins), with the teacher-approved sounds from explained2/sg_pron.py (speak_line)."""
import os, sys, numpy as np, parselmouth
from parselmouth.praat import call
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', 'explained2'))
from sg_pron import needs_fix, speak_line
from kokoro_onnx import Kokoro
D = os.environ.get('KOKORO_DIR', '/home/user/heart-tts'); SR = 24000
k = Kokoro(D + '/kokoro.onnx', D + '/voices.bin')
def heart(p, fix=True, speed=0.94, swing=1.6, shift=1.0):
    if fix and needs_fix(p): a, sr = speak_line(k, p, voice='af_heart', speed=speed)
    else: a, sr = k.create(p, voice='af_heart', speed=speed, lang='en-us')
    x = a.astype(np.float64)
    snd = parselmouth.Sound(x, SR); m = call(snd, 'To Manipulation', 0.01, 120, 500); pt = call(m, 'Extract pitch tier')
    med = call(snd.to_pitch(time_step=0.01, pitch_floor=120, pitch_ceiling=500), 'Get quantile', 0, 0, 0.5, 'Hertz')
    call(pt, 'Formula', f'{med * shift} * 2 ^ ({swing} * log2(self / {med}))'); call([pt, m], 'Replace pitch tier')
    x = call(m, 'Get resynthesis (overlap-add)').values[0]
    idx = np.where(np.abs(x) > 0.01)[0]; return x[max(0, idx[0] - 120): idx[-1] + 240].astype(np.float32)
