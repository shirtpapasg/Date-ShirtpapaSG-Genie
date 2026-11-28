"""make_clip.py: the EP23 new-words test clip for the teacher's listen -> ../pron_clips/Heart_ep23_new_words.mp3 (MP3: the teacher plays it
on a web page). Each sentence is the episode's OWN recorded line (voice/<id>.wav, made by make_voice.py through ../sg_pron.py), so the clip
is exactly what the video says; 1.2 s apart. Run after make_voice.py:  /home/user/heart-tts/venv/bin/python make_clip.py
The sentence start times are measured afterwards with ffmpeg silencedetect (STATE.md lists them)."""
import os, subprocess, json, numpy as np, soundfile as sf
H = os.path.dirname(os.path.abspath(__file__))
CLIP = [   # line id: every word to check, in a sentence from the script (section 10 G's suggested clip), said as the episode says it
 "m706p",    # Pip: electromagnet ("An electromagnet ..." linked), electricity
 "hk_electromagnet",      # Heart: "Electromagnet." alone (the read-along)
 "m603m",    # Momo: electrical method, electricity, battery
 "hk_electrical_method",  # Heart: "Electrical method." alone
 "m905b",    # Basil: coil, neat turns
 "hk_coil",               # Heart: "Coil." alone (one syllable: not swallowed?)
 "m805s",    # Heart: the WARNING strip 7.5: electromagnet, exposed wires, main electrical supply
 "m204",     # Heart: millipede
 "hk_strength", "hk_number_of_batteries",   # Heart: "Strength." (the final th), "Number of batteries." (BAT-er-eez)
 "n502",     # Heart: steel bolt, scrapyard, aluminium ring-pulls (no pause at the hyphen), plastic caps (journey pace)
]
out = [np.zeros(int(48000 * .5))]
for id in CLIP:
    x, sr = sf.read(os.path.join(H, "voice", id + ".wav")); assert sr == 48000
    out += [x, np.zeros(int(48000 * 1.2))]
y = np.concatenate(out)
wav = os.path.join(H, "voice", "_clip_ep23.wav"); sf.write(wav, y.astype(np.float32), 48000, subtype="PCM_16")
mp3 = os.path.join(H, "..", "pron_clips", "Heart_ep23_new_words.mp3")
subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", wav, "-c:a", "libmp3lame", "-b:a", "128k", mp3], check=True); os.remove(wav)
for id in CLIP: L = json.load(open(os.path.join(H, "voice", id + ".json"))); print(id, L["who"], L["text"])
print(mp3, round(len(y) / 48000, 1), "s")
