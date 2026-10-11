import sys, os, numpy as np, espeakng_loader, parselmouth
from parselmouth.praat import call
from kokoro_onnx import Kokoro
from kokoro_onnx.config import EspeakConfig
T = sys.argv[1]
k = Kokoro(T + "/model_q8.onnx", T + "/voices.npz", espeak_config=EspeakConfig(lib_path=espeakng_loader.get_library_path(), data_path=os.path.dirname(espeakng_loader.get_data_path())))
a, sr = k.create("Did you know that leaves are like tiny food factories? Pretty amazing, right?", voice="af_heart", speed=0.9, lang="en-us")
def rng(x):
    p = parselmouth.Sound(x.astype(np.float64), sr).to_pitch_ac(0.01, 140, 15, False, 0.03, 0.45, 0.01, 0.35, 0.14, 450).selected_array['frequency']; p = p[p > 0]
    st = 12 * np.log2(p / np.median(p)); return round(np.percentile(st, 90) - np.percentile(st, 10), 1), len(p)
def widen(a, kf, floor=140, ceil=450):
    snd = parselmouth.Sound(a.astype(np.float64), sampling_frequency=sr)
    man = call(snd, "To Manipulation", 0.01, floor, ceil); pt = call(man, "Extract pitch tier")
    m = call(pt, "Get mean (curve)", 0, 0); call(pt, "Formula", f"{m} * (self / {m}) ^ {kf}")
    call([pt, man], "Replace pitch tier"); return call(man, "Get resynthesis (overlap-add)").values[0]
print("original", rng(a))
for kf in (1.5, 1.9): print(kf, rng(widen(a, kf)), "old floor100/600:", rng(widen(a, kf, 100, 600)))
