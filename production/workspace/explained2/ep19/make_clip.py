"""make_clip.py: the EP19 new-words test clip for the teacher's listen -> ../pron_clips/Heart_ep19_new_words.mp3 (MP3: the teacher plays it
on a web page). Short sentences from the script, each said exactly as the episode says it (make_voice.py's own heart() and buddy(), through
../sg_pron.py), 1.2 s apart. Run with the heart-tts python:  /home/user/heart-tts/venv/bin/python make_clip.py
The sentence start times are measured afterwards with ffmpeg silencedetect (STATE.md lists them)."""
import os, subprocess, numpy as np, soundfile as sf
H = os.path.dirname(os.path.abspath(__file__))
src = open(os.path.join(H, "make_voice.py")).read().split("\nbad = []")[0]   # the voices' own functions, without the recording loop
exec(compile(src, "make_voice.py", "exec"))
CLIP = [   # (who, text): every word to check, in a sentence from the script
 ("heart", "Be an aluminium can! You are an empty drink can, made of aluminium."),
 ("basil", "Two! Dad says drink cans like this are made of aluminium. And aluminium is not iron or steel!"),
 ("heart", "A natural magnet is also called a lodestone."),
 ("pip", "Non-magnetic materials include ceramic, fabric, glass, plastic, rubber and wood."),
 ("basil", "And magnets come in lots of shapes: bar, U-shaped, button, rod, ring and horseshoe!"),
 ("momo", "Scientists think pigeons can sense the Earth's magnetism."),
 ("heart", "Look closer. Bring the magnet near each object, and watch how they interact."),
 ("heart", "One of the ways to classify these materials is to observe how they interact with a magnet."),
 ("momo", "My turn! I tested Mum's iron wok."),
 ("heart", "A little pigeon is hiding in this video. Can you spot it?"),
 ("basil", "Deep in the sea lives a snail with iron in its shell."),
]
out = []
for who, text in CLIP:
    x, sr = heart(text) if who == "heart" else buddy(who, text)
    out += [up48(np.asarray(x, np.float64), sr), np.zeros(int(48000 * 1.2))]
y = np.concatenate([np.zeros(int(48000 * .5))] + out)
wav = os.path.join(H, "voice", "_clip_ep19.wav"); sf.write(wav, y.astype(np.float32), 48000, subtype="PCM_16")
mp3 = os.path.join(H, "..", "pron_clips", "Heart_ep19_new_words.mp3")
subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", wav, "-c:a", "libmp3lame", "-b:a", "128k", mp3], check=True); os.remove(wav)
print(mp3, round(len(y) / 48000, 1), "s")
