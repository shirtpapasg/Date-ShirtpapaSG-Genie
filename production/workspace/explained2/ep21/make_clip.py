"""make_clip.py: the EP21 new-words test clip for the teacher's listen -> ../pron_clips/Heart_ep21_new_words.mp3 (MP3: the teacher plays it
on a web page). Each sentence is the episode's OWN recorded line (voice/<id>.wav, made by make_voice.py through ../sg_pron.py), so the clip
is exactly what the video says; 1.2 s apart. Run after make_voice.py:  /home/user/heart-tts/venv/bin/python make_clip.py
The sentence start times are measured afterwards with ffmpeg silencedetect (STATE.md lists them)."""
import os, subprocess, json, numpy as np, soundfile as sf
H = os.path.dirname(os.path.abspath(__file__))
CLIP = [   # line id: every word to check, in a sentence from the script, said as the episode says it
 "m805m",    # Momo: freely suspended (suh-SPEN-did; "freely" keeps both syllables), "X means ..., such as ..."
 "m809",     # Basil: 6.17, freely suspended, North-South direction (two words, no "minus")
 "hk_freely_suspended",   # Heart: "Freely suspended." alone (the read-along)
 "n704m",    # Momo: compass (KUM-pus), direction
 "hk_compass",            # Heart: "Compass." alone (the read-along)
 "n702",     # Heart: compass, needle (the look-closer pace)
 "hk_north_south_direction",   # Heart: "North-South direction." at the start of a line (the read-along)
 "hk_needle",             # Heart: "Needle." alone (NEE-dul)
 "m1008",    # Pip: 6.16, interacts (in-ter-AKTS), its own North and South poles
 "n907",     # Pip: "Hence," at the start of the line, with a short pause after the comma
 "m302",     # Heart: swallow
 "m303b",    # Basil: swallows
]
out = [np.zeros(int(48000 * .5))]
for id in CLIP:
    x, sr = sf.read(os.path.join(H, "voice", id + ".wav")); assert sr == 48000
    out += [x, np.zeros(int(48000 * 1.2))]
y = np.concatenate(out)
wav = os.path.join(H, "voice", "_clip_ep21.wav"); sf.write(wav, y.astype(np.float32), 48000, subtype="PCM_16")
mp3 = os.path.join(H, "..", "pron_clips", "Heart_ep21_new_words.mp3")
subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", wav, "-c:a", "libmp3lame", "-b:a", "128k", mp3], check=True); os.remove(wav)
for id in CLIP: L = json.load(open(os.path.join(H, "voice", id + ".json"))); print(id, L["who"], L["text"])
print(mp3, round(len(y) / 48000, 1), "s")
