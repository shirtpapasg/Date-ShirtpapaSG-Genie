---
name: character-voice
description: Make natural, younger-sounding character voices (Pip the chinchilla, Basil the kid lizard, Momo) or design a new character voice, free and offline with Kokoro TTS + Praat. Use when the user asks for a character's voice, a new character voice, a cartoon/kid voice, or dialogue lines for TheOneApp or the "TheOneApp, Explained" videos.
---

# Character voices

Narrator stays **Heart** (heart-voice kit). Characters use `voice_maker.py` next to this file.

## Saved characters (chosen by the teacher, 11 Oct 2026)
| Name | Who | Recipe |
|---|---|---|
| pip | chinchilla, cute and lively | af_heart .6 + af_nova .4, speed 1.10, formant 1.18, median 340 Hz, range 1.4 |
| basil | kid lizard, sharp and energetic | am_puck .6 + am_fenrir .4, speed 1.10, formant 1.16, median 245 Hz, range 1.3 |
| momo | playful, cute and friendly | af_heart .5 + af_aoede .3 + af_jessica .2, speed 1.06, formant 1.16, median 325 Hz, range 1.4 |

## Steps
1. `pip install -r requirements.txt` (also needs ffmpeg).
2. `python voice_maker.py --char pip "Hi! I'm Pip!" -o pip.wav` (or `--file lines.txt`).

## Designing a new character (the process the teacher liked)
1. Make 2 base blends (A/B) from Kokoro voices that fit the personality; let the teacher pick one.
2. On the chosen blend, make 3 kid versions with Praat "Change gender", stepping up:
   kid1 formant ~1.08-1.10 / median +0, kid2 ~1.12-1.16, kid3 ~1.16-1.18 and slightly faster.
   Use `--mix --speed --formant --median --range`.
3. Send all 3 with a one-line description each; the teacher picks; add it to CHARACTERS in voice_maker.py
   and record it in the Second Brain.
Never use plain pitch shifting (rubberband): it sounded robotic. Keep language positive and child-friendly.
