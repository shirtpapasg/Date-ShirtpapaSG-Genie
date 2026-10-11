import sys, os, numpy as np, soundfile as sf, espeakng_loader
from kokoro_onnx import Kokoro
from kokoro_onnx.config import EspeakConfig
T = sys.argv[1]
k = Kokoro(T + "/model_q8.onnx", T + "/voices.npz", espeak_config=EspeakConfig(lib_path=espeakng_loader.get_library_path(), data_path=os.path.dirname(espeakng_loader.get_data_path())))
line = "Hi there! Did you know that leaves are like tiny food factories? They use sunlight to make food for the whole plant. Pretty amazing, right?"
V = k.get_voices() if hasattr(k, "get_voices") else []
blend = 0.6 * k.get_voice_style("af_heart") + 0.4 * k.get_voice_style("af_bella")
for name, voice, sp, lang in [("1_heart_current", "af_heart", 0.88, "en-us"), ("2_heart_livelier", "af_heart", 0.95, "en-us"),
                              ("3_bella", "af_bella", 0.92, "en-us"), ("4_heart_bella_blend", blend, 0.92, "en-us"),
                              ("5_nicole_soft", "af_nicole", 0.95, "en-us"), ("6_emma_british", "bf_emma", 0.92, "en-gb")]:
    a, sr = k.create(line, voice=voice, speed=sp, lang=lang); sf.write(f"{name}.wav", a, sr); print(name, round(len(a) / sr, 1), "s")
