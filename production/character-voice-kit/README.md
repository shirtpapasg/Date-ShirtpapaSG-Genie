# Character Voice Kit

Free, offline character voices for TheOneApp and "TheOneApp, Explained".

- `voice_maker.py`: speaks any text as Pip, Basil or Momo, or as a new character you design.
- `sample_pip.mp3`, `sample_basil.mp3`, `sample_momo.mp3`: what each saved voice sounds like.
- `SKILL.md`: drop this folder into `~/.claude/skills/character-voice/` so Claude remembers how to make voices.

Install once: `pip install -r requirements.txt` (and ffmpeg). The first run downloads the Kokoro model (~115 MB).

```
python voice_maker.py --list
python voice_maker.py --char momo "Is it living, or non-living?" -o momo.wav
python voice_maker.py --mix af_bella:.6,af_sky:.4 --formant 1.12 --median 300 "Hello!" -o new.wav
```

Why it sounds natural: the voice is blended from real Kokoro voices, then Praat's "Change gender"
moves the formants and the pitch together, like a smaller speaker. Plain pitch-shifting sounds robotic.
