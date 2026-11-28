"""make_clip.py: the EP22 new-words test clip for the teacher's listen -> ../pron_clips/Heart_ep22_new_words.mp3 (MP3: the teacher plays it
on a web page). Each sentence is the episode's OWN recorded line (voice/<id>.wav, made by make_voice.py through ../sg_pron.py), so the clip
is exactly what the video says; 1.2 s apart. Run after make_voice.py:  /home/user/heart-tts/venv/bin/python make_clip.py
The sentence start times are measured afterwards with ffmpeg silencedetect (STATE.md lists them)."""
import os, subprocess, json, numpy as np, soundfile as sf
H = os.path.dirname(os.path.abspath(__file__))
CLIP = [   # line id: every word to check, in a sentence from the script, said as the episode says it
 "m806b",    # Basil: magnetised (MAG-nuh-tyzd), "X means ..., such as ...", strokes
 "hk_magnetised",         # Heart: "Magnetised." alone (the read-along)
 "m704b",    # Basil: stroke method, stroking ("A ... is a ... that ..., such as ...")
 "hk_stroke_method",      # Heart: "Stroke method." alone (the read-along)
 "m1005p",   # Pip: magnetic object (OB-ject, the noun), screwdriver
 "hk_magnetic_object",    # Heart: "Magnetic object." alone (the read-along)
 "m303",     # Heart: woodpecker
 "m1002",    # Heart: copper wire, aluminium foil, wooden chopstick, steel screwdriver, stroking (the look-closer pace)
 "n705m",    # Momo: same direction, stroke after stroke
 "n807s",    # Heart: the book strip 7.2 step 3: stroke, same pole
]
out = [np.zeros(int(48000 * .5))]
for id in CLIP:
    x, sr = sf.read(os.path.join(H, "voice", id + ".wav")); assert sr == 48000
    out += [x, np.zeros(int(48000 * 1.2))]
y = np.concatenate(out)
wav = os.path.join(H, "voice", "_clip_ep22.wav"); sf.write(wav, y.astype(np.float32), 48000, subtype="PCM_16")
mp3 = os.path.join(H, "..", "pron_clips", "Heart_ep22_new_words.mp3")
subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", wav, "-c:a", "libmp3lame", "-b:a", "128k", mp3], check=True); os.remove(wav)
for id in CLIP: L = json.load(open(os.path.join(H, "voice", id + ".json"))); print(id, L["who"], L["text"])
print(mp3, round(len(y) / 48000, 1), "s")
