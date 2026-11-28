"""make_clip.py: the EP0 (mind map special) new-words test clip for the teacher's listen -> ../pron_clips/Heart_ep00_new_words.mp3 (script
section 10 G). Each sentence is the episode's OWN recorded line (voice/<id>.wav, made by make_voice.py through ../sg_pron.py), so the clip is
exactly what the video says; 1.2 s apart. Run after make_voice.py:  /home/user/heart-tts/venv/bin/python make_clip.py
The sentence start times are measured afterwards with ffmpeg silencedetect (STATE.md lists them)."""
import os, subprocess, json, numpy as np, soundfile as sf
H = os.path.dirname(os.path.abspath(__file__))
CLIP = [   # line id: every word to check (script section 10 G), in a sentence from the script, said as the episode says it
 "a606b",    # Basil: generation effect ("effect", not "affect"), "X means ..., such as ..."
 "hk_generation_effect",  # Heart: "Generation effect." alone (the read-along)
 "a101h",    # Heart: ready-made, mind map (a clear break: not "mine map"), "Pip reads" (present tense)
 "a404h",    # Heart: "the words you read" in the question (present tense, works both ways)
 "b501h",    # Heart: TheOneApp ("the one app"), Mind Maps, Make my own mind map
 "b507h",    # Heart: Compare with the poster, Back to my mind map (the app's button names)
 "b801h",    # Heart: spaced practice
 "a802h",    # Heart: crow, letterboxes, void deck
 "a203b",    # Basil: railings, lamp posts
 "a409h",    # Heart: scrolling
 "a407m",    # Momo: riddle
 "a902b",    # Basil: Tuesday, Thursday
 "b602h",    # Heart: Showdown
 "a603h",    # Heart: grown-ups, worked-out (the look-closer pace)
 "hk_make_your_own",      # Heart: "Make your own." alone
 "hk_memory_first",       # Heart: "Memory first." alone
 "hk_check_and_fix",      # Heart: "Check and fix." alone
 "hk_space_it_out",       # Heart: "Space it out." alone (the soft t between "it" and "out")
]
out = [np.zeros(int(48000 * .5))]
for id in CLIP:
    x, sr = sf.read(os.path.join(H, "voice", id + ".wav")); assert sr == 48000
    out += [x, np.zeros(int(48000 * 1.2))]
y = np.concatenate(out)
wav = os.path.join(H, "voice", "_clip_ep00.wav"); sf.write(wav, y.astype(np.float32), 48000, subtype="PCM_16")
mp3 = os.path.join(H, "..", "pron_clips", "Heart_ep00_new_words.mp3")
subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", wav, "-c:a", "libmp3lame", "-b:a", "128k", mp3], check=True); os.remove(wav)
for id in CLIP: L = json.load(open(os.path.join(H, "voice", id + ".json"))); print(id, L["who"], L["text"])
print(mp3, round(len(y) / 48000, 1), "s")
