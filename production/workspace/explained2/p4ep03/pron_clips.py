"""pron_clips.py (P4 EP3, the script question 17): before / after clips of "pandan", "hibiscus", "jagged" (Heart, Kokoro own vs ../sg_pron.py), into /dev/shm/p4ep03/pron.
  /home/user/heart-tts/venv/bin/python pron_clips.py   (then pron_check.py measures them; the mp3s are cut with ffmpeg, see STATE.md)"""
import sys, os, json, numpy as np, soundfile as sf, subprocess
EP = "/home/user/Date-ShirtpapaSG-Genie/production/workspace/explained2/p4ep03"; sys.path.insert(0, EP); sys.path.insert(0, EP + "/..")
sys.path.insert(0, EP + "/../characters/sprites")
import voice_maker as vm
OUT = "/dev/shm/p4ep03/pron"
k = vm.load("/home/user/heart-tts/kokoro.onnx", "/home/user/heart-tts/voices.bin")
def raw(text, voice="af_heart", speed=.9):
    a, sr = k.create(text, voice=voice, speed=speed, lang="en-us"); return a, sr
# Kokoro's own (no sg_pron) for the before clips, Heart's voice
for name, text in [("pandan_before", "Sorry, pandan. You're free to go."), ("hibiscus_before", "Suspect three: the hibiscus."), ("jagged_heart", "The mystery leaf has a jagged edge, like tiny teeth.")]:
    a, sr = raw(text); sf.write(f"{OUT}/{name}.wav", a, sr)
from sg_pron import speak_line
for name, text in [("pandan_after", "Sorry, pandan. You're free to go."), ("hibiscus_after", "Suspect three: the hibiscus.")]:
    a, sr = speak_line(k, text, voice="af_heart", speed=.9); sf.write(f"{OUT}/{name}.wav", a, sr)
for w, sp in [("pandan", True), ("hibiscus", True), ("jagged", False)]:
    for tag in ("before", "after") if sp else ("own",):
        if tag == "after": a, sr = speak_line(k, w, voice="af_heart", speed=.9)
        else: a, sr = raw(w)
        sf.write(f"{OUT}/word_{w}_{tag}.wav", a, sr)
print("ok")
