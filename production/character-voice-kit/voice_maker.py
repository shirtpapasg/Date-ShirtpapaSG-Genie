"""Character Voice Maker: natural, younger-sounding character voices from Kokoro TTS. Free and offline.

How a voice is made (the "kid voice" recipe):
  1. Blend Kokoro voices:  style = sum(weight * voice)   e.g. af_heart .6 + af_nova .4
  2. Speak the text at a set speed.
  3. Praat "Change gender": raises the formants (smaller body/throat) and the pitch median,
     and widens the pitch range. Sounds natural, unlike plain pitch-shifting (robotic).
  4. Loudness to -16 LUFS, 48 kHz (ready for video mixing).

  python voice_maker.py --char pip   "Hi! I'm Pip!" -o pip.wav
  python voice_maker.py --char basil --file lines.txt -o basil.mp3
  python voice_maker.py --list
  # design a NEW character: try 3 variants, listen, keep the best, add it to CHARACTERS
  python voice_maker.py --mix af_bella:.6,af_sky:.4 --speed 1.05 --formant 1.12 --median 300 --range 1.35 "Hello!" -o new.wav
"""
import argparse, os, re, subprocess, sys, tempfile, urllib.request
import numpy as np, soundfile as sf

# Chosen 11 Oct 2026 by the teacher. formant = formant shift ratio, median = new pitch median (Hz), range = pitch range factor.
CHARACTERS = {
    "pip":   dict(desc="Pip the chinchilla: cute, lively, small and playful",
                  mix={"af_heart": .6, "af_nova": .4}, speed=1.10, formant=1.18, median=340, range=1.4),
    "basil": dict(desc="Basil the kid lizard: sharp, energetic, young",
                  mix={"am_puck": .6, "am_fenrir": .4}, speed=1.10, formant=1.16, median=245, range=1.3),
    "momo":  dict(desc="Momo: playful, cute, friendly",
                  mix={"af_heart": .5, "af_aoede": .3, "af_jessica": .2}, speed=1.06, formant=1.16, median=325, range=1.4),
}

HOME = os.path.expanduser("~/.heart-voice")
BASE = "https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0/"


def fetch(name):
    path = os.path.join(HOME, name)
    if not os.path.exists(path):
        os.makedirs(HOME, exist_ok=True)
        print(f"Downloading {name} (one time only)...", file=sys.stderr)
        urllib.request.urlretrieve(BASE + name, path + ".part"); os.replace(path + ".part", path)
    return path


def load(model, voices):
    from kokoro_onnx import Kokoro
    try:
        import espeakng_loader
        from kokoro_onnx.config import EspeakConfig
        return Kokoro(model, voices, espeak_config=EspeakConfig(lib_path=espeakng_loader.get_library_path(),
                      data_path=os.path.dirname(espeakng_loader.get_data_path())))
    except ImportError:
        return Kokoro(model, voices)


def speak(k, text, p, gap=0.2, para_gap=0.6):
    import parselmouth
    from parselmouth.praat import call
    style = sum(w * k.get_voice_style(v) for v, w in p["mix"].items())
    parts, sr = [], 24000
    for para in [x.strip() for x in re.split(r"\n\s*\n", text) if x.strip()]:
        for s in [x for x in re.split(r"(?<=[.!?])\s+", para) if x]:
            a, sr = k.create(s, voice=style, speed=p["speed"], lang="en-us")
            parts += [a, np.zeros(int(sr * gap), np.float32)]
        parts.append(np.zeros(int(sr * para_gap), np.float32))
    snd = parselmouth.Sound(np.concatenate(parts).astype(np.float64), sampling_frequency=sr)
    kid = call(snd, "Change gender", 75, 500, p["formant"], p["median"], p["range"], 1.0)
    return kid.values[0].astype(np.float32), sr


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("text", nargs="?"); ap.add_argument("--file"); ap.add_argument("-o", "--out", default="voice.wav")
    ap.add_argument("--char", choices=CHARACTERS); ap.add_argument("--list", action="store_true")
    ap.add_argument("--mix", help="voice:weight,... e.g. af_heart:.6,af_nova:.4")
    for a in ("speed", "formant", "median", "range"): ap.add_argument("--" + a, type=float)
    ap.add_argument("--model"); ap.add_argument("--voices")
    a = ap.parse_args()
    if a.list:
        for n, p in CHARACTERS.items(): print(f"{n:6} {p['desc']}\n       {p}")
        return
    p = dict(CHARACTERS[a.char]) if a.char else dict(mix={"af_heart": 1.0}, speed=1.0, formant=1.1, median=280, range=1.3)
    if a.mix: p["mix"] = {v: float(w) for v, w in (x.split(":") for x in a.mix.split(","))}
    for f in ("speed", "formant", "median", "range"):
        if getattr(a, f) is not None: p[f] = getattr(a, f)
    text = open(a.file, encoding="utf-8").read() if a.file else a.text
    if not text: ap.error("give text or --file")
    k = load(a.model or fetch("kokoro-v1.0.int8.onnx"), a.voices or fetch("voices-v1.0.bin"))
    audio, sr = speak(k, text, p)
    with tempfile.TemporaryDirectory() as d:
        raw = os.path.join(d, "raw.wav"); sf.write(raw, audio, sr)
        subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", raw, "-af", "loudnorm=I=-16", "-ar", "48000", a.out], check=True)
    print(f"{a.out}  ({len(audio) / sr:.1f} s)")


if __name__ == "__main__":
    main()
