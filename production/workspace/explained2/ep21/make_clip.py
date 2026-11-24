"""make_clip.py: the EP20 new-words test clip for the teacher's listen -> ../pron_clips/Heart_ep20_new_words.mp3 (MP3: the teacher plays it
on a web page). Each sentence is the episode's OWN recorded line (voice/<id>.wav, made by make_voice.py through ../sg_pron.py), so the clip
is exactly what the video says; 1.2 s apart. Run after make_voice.py:  /home/user/heart-tts/venv/bin/python make_clip.py
The sentence start times are measured afterwards with ffmpeg silencedetect (STATE.md lists them)."""
import os, subprocess, json, numpy as np, soundfile as sf
H = os.path.dirname(os.path.abspath(__file__))
CLIP = [   # line id: every word to check, in a sentence from the script, said as the episode says it
 "m1005",    # Heart: repel (rih-PEL), a new term (said a little slower)
 "m1007b",   # Basil: Repel means push!
 "n703p",    # Pip: unlike poles, North pole, South pole, attract
 "n707b",    # Basil: like poles, North and North, South and South, repel
 "n712",     # Pip: 6.14, "Unlike poles attract and like poles repel." (unlike vs like)
 "m805s",    # Heart: attraction (the strip 6.7)
 "n502",     # Heart: carriage (the journey, slow and soft)
 "m1010",    # Basil: 6.9 as spoken, "Magnets can attract, pull, or repel, push, one another. ..."
 "m802",     # Heart: stationery
 "m202",     # Heart: mid-air (EP19's dare, word for word)
 "n705",     # Heart: North pole, South pole
 "hk_poles", # Heart: "Poles." alone at the start of a line (the read-along)
]
out = [np.zeros(int(48000 * .5))]
for id in CLIP:
    x, sr = sf.read(os.path.join(H, "voice", id + ".wav")); assert sr == 48000
    out += [x, np.zeros(int(48000 * 1.2))]
y = np.concatenate(out)
wav = os.path.join(H, "voice", "_clip_ep20.wav"); sf.write(wav, y.astype(np.float32), 48000, subtype="PCM_16")
mp3 = os.path.join(H, "..", "pron_clips", "Heart_ep20_new_words.mp3")
subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", wav, "-c:a", "libmp3lame", "-b:a", "128k", mp3], check=True); os.remove(wav)
for id in CLIP: L = json.load(open(os.path.join(H, "voice", id + ".json"))); print(id, L["who"], L["text"])
print(mp3, round(len(y) / 48000, 1), "s")
