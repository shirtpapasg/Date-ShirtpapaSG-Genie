import sys, os, numpy as np, soundfile as sf, espeakng_loader, parselmouth
from parselmouth.praat import call
from kokoro_onnx import Kokoro
from kokoro_onnx.config import EspeakConfig
T = sys.argv[1]
k = Kokoro(T + "/model_q8.onnx", T + "/voices.npz", espeak_config=EspeakConfig(lib_path=espeakng_loader.get_library_path(), data_path=os.path.dirname(espeakng_loader.get_data_path())))
plain = "Hi there! Did you know that leaves are like tiny food factories? They use sunlight to make food for the whole plant. Pretty amazing, right?"
# storyteller pacing: (text, speed, pause after)
paced = [("Hi there!", 0.95, 0.35), ("Did you know that leaves are like...", 0.92, 0.3), ("tiny food factories?", 0.82, 0.6),
         ("They use sunlight to make food,", 0.92, 0.12), ("for the whole plant!", 0.86, 0.55), ("Pretty amazing,", 0.84, 0.1), ("right?", 0.9, 0)]
blend = 0.6 * k.get_voice_style("af_heart") + 0.4 * k.get_voice_style("af_bella")
def say_plain(v, sp): a, sr = k.create(plain, voice=v, speed=sp, lang="en-us"); return a, sr
def say_paced(v):
    out = []
    for txt, sp, gap in paced:
        a, sr = k.create(txt, voice=v, speed=sp, lang="en-us"); out += [a, np.zeros(int(sr * gap), np.float32)]
    return np.concatenate(out), sr
def widen(a, sr, kf):
    snd = parselmouth.Sound(a.astype(np.float64), sampling_frequency=sr)
    man = call(snd, "To Manipulation", 0.01, 100, 600); pt = call(man, "Extract pitch tier")
    m = call(pt, "Get mean (curve)", 0, 0)
    call(pt, "Formula", f"{m} * (self / {m}) ^ {kf}")
    call([pt, man], "Replace pitch tier"); out = call(man, "Get resynthesis (overlap-add)")
    return out.values[0].astype(np.float32)
jobs = [("1_Heart_original", "af_heart", "plain", 1.0), ("2_Heart_wider_range", "af_heart", "plain", 1.5),
        ("3_Heart_expressive", "af_heart", "paced", 1.6), ("4_Heart_very_expressive", "af_heart", "paced", 1.9),
        ("5_Bella_expressive", "af_bella", "paced", 1.6), ("6_Bella_very_expressive", "af_bella", "paced", 1.9),
        ("7_Blend_expressive", blend, "paced", 1.7)]
for name, v, mode, kf in jobs:
    a, sr = say_plain(v, 0.88) if mode == "plain" else say_paced(v)
    if kf != 1.0: a = widen(a, sr, kf)
    sf.write(name + ".wav", a, sr); print(name, round(len(a) / sr, 1), "s")
