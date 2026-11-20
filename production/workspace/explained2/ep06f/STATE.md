# EP6 "Count the legs!": the three Fable moments (build state)
Three standalone clips of P3 EP6 for a side-by-side comparison with the full episode in `ep06/` (made by another model; not read).
- `clip1_coldopen.mp4` 0:40 · `clip2_journey.mp4` 1:00 · `clip3_ending.mp4` 0:42. All 1920x1080, 30 fps, -16 LUFS; each has an `.srt`.
- The words: `SCRIPT.md` (segment tables, the non-textbook sentences, things to check). As data: `script.py` (SEQS 1, 2, 3 = the three clips).
- Engine: copied from `ep05/`. New: `f6set.js` (BG.gardens = Botanic Gardens Bandstand, BG.lake, the monitor lizard, the thermometer, the mushroom, the web),
  `f6.js` (every scene of the three clips), `sound_cues.js` (rewritten), `build_clip.sh`. `lib.js`: key words per clip, a new key word holds 2.0 s.
  `make_voice.py`: Heart 0.90 / 0.5 s, buddies x0.88 (the 20 Nov pacing rule). `shrink.js`, `hotel.js`, `garden.js` are EP5's (shrink.js is not loaded).
- Voices: `/home/user/heart-tts/venv/bin/python make_voice.py` (keeps finished lines). The "Now you know!" shout and crowd are EP5's approved takes.
- One clip end to end: `./build_clip.sh N` (N = 1, 2, 3; `FRESH=1` to drop the kept 10 s chunks). Backgrounds: `node bake.js gardens lake`.
- Stills: `PART=N ./sheet.sh name cols t1 t2 ...` -> `qa/name.jpg` (qa/c1a, c1b, c2a, c2b, c3a are the checks of every swap, card and mouth change).
- Checked: no page errors; count-in onsets 33.318 / 34.318 / 35.318 s (1.000 s apart); the blast is 21 ms after the title frame; 6.2 s of outro.
- Not uploaded to YouTube. A human must listen before any upload.
