import sys, os, soundfile as sf, espeakng_loader
from kokoro_onnx import Kokoro
from kokoro_onnx.config import EspeakConfig
T = sys.argv[1]
k = Kokoro(T + "/model_q8.onnx", T + "/voices.npz", espeak_config=EspeakConfig(lib_path=espeakng_loader.get_library_path(), data_path=os.path.dirname(espeakng_loader.get_data_path())))
line = "Hi there! Did you know that leaves are like tiny food factories? They use sunlight to make food for the whole plant. Pretty amazing, right?"
blend = 0.6 * k.get_voice_style("af_heart") + 0.4 * k.get_voice_style("af_bella")
for name, voice, sp in [("heart_1.00", "af_heart", 1.0), ("heart_1.08", "af_heart", 1.08), ("bella_1.00", "af_bella", 1.0), ("bella_1.08", "af_bella", 1.08), ("blend_1.05", blend, 1.05)]:
    a, sr = k.create(line, voice=voice, speed=sp, lang="en-us"); sf.write(f"{name}.wav", a, sr); print(name, round(len(a) / sr, 1), "s")
