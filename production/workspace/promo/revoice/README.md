# Promo films 1-3 re-voiced (teacher, 24 Nov 2026: "re-record, use the original voice and overhaul the voice for the pet buddies. Keep the rest the same.")

Same picture (video stream copied byte for byte), same music and sound effects, new voices: Heart = Kokoro af_heart through
`explained2/sg_pron.py` (the episodes' recipe at film 4's promo pace); Pip, Momo, Basil = the Character Voice Kit, as the
Explained episodes and promo film 4 (`make_voice.py` copies film 4's engine). "Pip, Momo and Basil" lines = the three together.

Rebuild:
1. `lines_film<N>.json`: the words from the burned-in captions (`capocr.py`, RapidOCR on the caption band) checked by eye,
   times from faster-whisper word stamps; `start`/`end` are refined in step 4 from the old vocal stem (`start_rough`/`end_rough` keep the
   rough ones). Film 2's two opening Heart lines have no caption (`"captioned": false`): words from Whisper on the vocal stem.
2. Old voices out: Demucs htdemucs_ft vocals model (`sep_vocals.py`, venv with torch + demucs) -> `<n>_vocals.wav` / `<n>_no_vocals.wav`.
3. `/home/user/heart-tts/venv/bin/python make_voice.py 1 2 3` -> `voice/` (not in git).
4. `/home/user/heart-tts/venv/bin/python mix.py <N> <original.mp4> <no_vocals.wav> <vocals.wav>` -> `film<N>_v2.mp4`
   (each line at the old start; atempo <= x1.15 only if it overruns the gap to the next line; bed ducked 4 dB; -16 LUFS, TP <= -1).
5. `sample_film<N>.mp4`: 30 s, 720p, a stretch with all four voices (film 1 from 0:29, film 2 from 0:39.5, film 3 from 0:41).

## 24 Nov 2026, ~05:40–05:49 UTC: newer PUBLIC copies of films 1–3, not uploaded from this session
- nZUOyUq193w: Film 1, 1:18
- by9XehOWfUE: Film 2, 1:12
- pAVAJF9ye1c: Film 3, 1:10

These are the copies people can watch. Our v2 uploads (VIq1qSd85R0, S4Cv2H0IG9Y, IVYktYPowNI: 1:23, 1:16, 1:17) were set private elsewhere.
The public copies have no custom thumbnail. When new thumbnails are approved, set them on the PUBLIC ids above.

## 24 Nov 2026: thumbnails chosen by the teacher ("1A, 2B, 3A") are set on the PUBLIC copies
- nZUOyUq193w: thumb1_v3a.jpg ("IT'S COMING!", Pip and the fog)
- by9XehOWfUE: thumb2_v3b.jpg ("HOW?!", the three sleeping Guardians)
- pAVAJF9ye1c: thumb3_v3a.jpg ("A CURSE?!", Pip and the black eclipse)

Each was checked live on i.ytimg.com. The research is in THUMBNAILS.md.
