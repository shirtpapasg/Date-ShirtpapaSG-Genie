# EP23 build state (for a resume after a restart)
P3 EP23 "The magnet you can switch off: electromagnets (the electrical method)" (Ch 7, Making and Using Magnets, pp. 115-117 + Let's Apply
Q2(a), p. 124; the fifth Magnets episode). The script: `../p3_ep23_script.md` (version 1, Opus, 24 Nov 2026), **approved by the teacher on
25 Nov 2026 ("OK to the EP23 script")**. The source of every spoken word: `script.py`.
- **Part 1** "Take the Battery Away. Do the Clips STAY or DROP?" **5:36.0** (335.96 s): a coffee shop in an industrial estate across the
  road from a scrap metal yard; EP22's dare answered (two, the clips drop off); be the iron nail in a coil; ELECTRICAL METHOD (Momo); is it
  still a magnet? (battery away, on, off, the scrapyard crane: ELECTROMAGNET, Pip; 7.4, Momo); HOLD ON! Momo and the wall socket (Basil's
  fix, the main electrical supply, the WARNING strip 7.5); what makes it a magnet? (the battery alone, the nail alone, one end, both ends:
  COIL, Basil; 7.4's three steps, Basil); the millipede; the cliffhanger (no more batteries).
- **Part 2** "Ten Turns or Twenty? Make the STRONGEST Electromagnet" **5:44.8** (344.81 s): the school science room and its old electric
  bell; Round 1 ten turns or twenty; be a steel bolt; TURNS OF WIRE (Basil); why do more turns help? (STRENGTH, Momo; the bell cut away;
  7.6, Basil); Showdown: Momo's poster (the 7.8 strip); one battery or two? (NUMBER OF BATTERIES, Pip; the crane carries the bolt to the
  lorry; 7.7, Pip); the chant; the cricket; the dare into EP24 (25 turns on an iron nail, 8 on a steel nail: is it fair?).
- Scores: Part 1 Round 1 1 : 1, HOLD ON! 2 : 1; Part 2 Round 1 1 : 1, Showdown 3 : 1.

## Status (25 Nov 2026): BUILT, NOT UPLOADED (the main session uploads after the teacher has seen it)
Stage 1 (voices, timelines) and Stage 2 (drawing, sound, render, checks) done in one session (Opus), from EP22's engine.

## The engine (copied from ../ep22, never edited there)
lib.js (n2 rounds to 4 decimals; the 25 Nov ghost fix and the nykScene cheer fix are in), common.js, closer.js, shrink.js, props.js,
hotel.js, garden.js, trail.js, materials.js, canteen.js, pics.js, song.js, music.js, audio/, render.js, finish.sh, bake.js, build_part.sh,
build_all.sh, dump_cues.js, probe.js, stills.js, sheet.sh, sweep.js, measure_countdowns.py, compare_ep1.py, build_tl.py, make_voice.py,
main.js, page.html, pose_audit.js, faces_sheet.*, make_preview.sh, prep_sprites.py, highlights.py, make_clip.py, ep21dare.js, ep22dare.js
(EP22's two dare cards, UNCHANGED: Part 1 opens with them), art22.js (helpers); spr/ (the v2 cast); the ritual voices.
**Changed for EP23:** lib.js `OUTCOMES` (P1 Round 1: Pip right to the end of `answer`, Momo right until she teaches (l:m601), Basil wrong
to the end of `mark1`; HOLD ON! at m803 Basil, Pip right / Momo wrong to the end of `holdon`; Pip's look-closer guess shy from `alone1` to
the end of `mark2`. P2 Round 1: Momo right to the end of `r1ans`, Basil right until he teaches (l:n601), Pip wrong to the end of `mark1`;
Showdown at n804b Basil, Pip right / Momo wrong to the end of `fix`), `learnAt` (kw_*, v_*, `drop`: the crane drops the bolt in the
lorry), `KW` / `KWLINE` / `SHELF_HIDE`, and **WATCHING** (buddy0 `o.watch`: see below); common.js `PHR` / `PCOL` (the chant; "Never!" in
red) and `gameScene` (`R.finder`, `R.poses`, Pip can be the finder); closer.js `lcPeekAuto` (the face watches the panel); main.js
(XDEFS23); **song.js: the ORIGINAL series music** (below); finish.sh (ep23 names, EP23 sheet marks; `add_lofi.py` stays commented out).
**New:** `script.py`, `tests.js` (EP23 data), `art23.js` (the electromagnet rig `rig23` / `rigW`, the battery holders, the scrap, the
mini crane, the paper lorry, OUR MINI CRANE, HOW STRONG?, Momo's poster, the wall socket, the school bell and its cut-away, the scrapyard
crane, the millipede, the cricket, the auntie, `watchO`), `sets23.js` (CS23 the coffee shop + scrap yard, baked bg/cs23.png; SR23 the
science room, baked bg/sr23.png; the hidden animals' spots MPAT / CKAT), `lc23.js` (the four look-closers, the two journeys, the ring /
card / recap / fun-fact / Mark Sentence / chant pictures), `ep23dare.js` (EP24's two cards, self-contained: EP24 copies it unchanged),
`p1.js`, `p2.js`, `sound_cues.js`, `make_moments.py`, `upload.json`, `app_moments.json`. Re-bake after a change to BG.cs23 / BG.sr23:
`node bake.js cs23 sr23`.

## Music (teacher, 25 Nov 2026: "For future episodes we use the original music")
song.js plays the series' own beds again (the game groove, the calm bed, the micro-world pad), NOT Kampong Walk. Smoothed: ONE bar clock
per part (every groove and calm note sits on the global grid k x 4 beats at 104 BPM, so a bed that stops resumes on the beat and in the same
chord order), and every change between beds or around a countdown is a 0.8 s crossfade (regions widened by 0.4 s at both ends, every note
scaled by its place in the fade). The groove stops for every countdown (only the ticks) and the chant; the journeys are QUIET: no groove or
calm bed from `waitw` to the end of `pullout`, only the micro-world pad in the journey (measured on the Part 1 stems: music -41 dB in
waitw, silent in shrink, pad -30 dB; the Round 1 ring -52 dB). Both mixes -16.0 LUFS.

## Watching (teacher, 25 Nov 2026: "The pet buddies should look towards the magnet during this close up demonstration")
art23.js `watchO(x, objectX)` turns a listening buddy towards the object (flip + a 5 degree lean); used in every close-up demonstration
(the cold open's coiling, back, lc1q, lc2q, the cliffhanger, Part 2's lab, the crane, the journeys' riders) and by every look-closer face
(closer.js / peek23 pass `watch`). lib.js buddy0: when the teacher's paintings `<buddy>_watch_closed` / `_watch_ooh` exist in spr/ (their
heads turned to the viewer's LEFT), they replace the sitting pose automatically while the buddy listens, flipped so the buddy looks at the
object (`o.ooh` picks the "ooh" mouth). To drop them in: put the six PNGs in characters/sprites/poses/ with entries in poses.json (as every
pose), run `prep_sprites.py`, re-render. One buddy a scene may glance at the viewer with a 1 s wave (`glanceWave`), never on the teaching
line (Pip in the cold open and in journey 1 while the wire is still being coiled; Basil in journey 2 among the scrap).

## Checks done
- Voices: every line recorded with EP22's make_voice.py method and settings (Heart Kokoro af_heart .90 through ../sg_pron.py; buddies the
  Character Voice Kit 12% slower); all aligned (voice.log: `not aligned: []`). New aligner words: millipede(s), ring-pulls, scrapyard, wire's.
- `../pron_clips/Heart_ep23_new_words.mp3` (62.7 s, 12 lines, 1.2 s apart; section 10 G): starts 0.5, 7.2, 9.5, 18.4, 20.7, 27.4, 29.2,
  43.8, 48.9, 50.8, 53.2, 58.2 s (Pip electromagnet; "Electromagnet."; Momo electrical method; "Electrical method."; Basil coil; "Coil.";
  the WARNING strip; millipede; "Strength."; "Number of batteries."; the steel bolt / scrapyard / ring-pulls line). No sg_pron entry.
- `node sweep.js 1|2` (every 1 s): 0 bad, 0 page errors. Stills of every scene looked at (qa/p1a-c.jpg, qa/p2a-d.jpg) and fixed.
- `node ../qa/buddy_ghost_scan.js ep23 1|2`: **no buddy ghosting** in either part (qa/ghost_p1.txt, ghost_p2.txt).
- Render / decode / countdown / loudness results: see the end of this file.

## Changed from the script's tables (and why)
1. **Music:** the script (24 Nov) asked for one continuous Kampong Walk bed; the teacher's 25 Nov rule (SERIES_FORMAT 9) replaced it with
   the original series music, smoothed, the journeys quiet. Done as the rule says.
2. **Part 2 `bellline` cut** (Basil's "Hear that? Our school bell has an electromagnet inside!"): Part 2 came out at 5:46.3, over the
   script's 5:45, so section 6's "If a part must lose more" list was applied in order (its first item). The bell is still seen and heard
   ringing at the start of the scene and explained in look-closer 1. Part 2 now 5:44.8; Part 1 5:36.0 needed nothing.
3. **Part 2 recap:** the third picture ("Batteries only") comes after Heart's last word and holds 2.5 s (each picture >= 2.5 s).
4. **Look-closer 1 of Part 2:** the two coiled nails stand side by side (tips down over their trays) instead of one above the other, so
   each can dip into its own tray.
5. **Held things:** the coiled nail a buddy holds is drawn at the paw in screen space (the buddies are not moved by the camera) with its
   holder on the table tracked through the camera; cameras near Momo's coil zoom about the clip tray so the tip stays in it.
6. **Thinking poses** for a buddy who is shy (Basil in lc1q, Pip in lc1q of Part 2) are not shown: the 23 Nov rule (shy through the
   WHOLE fix) wins over the table's "thinking at the end".
7. **Mark Sentence 2 of Part 1** (7.4's three steps) is read as one card with three small numbered pictures under it (the card itself is
   not split into numbered lines, so the words light exactly as Basil reads them).
8. Small: Pip in the cold open waves right at Heart's first words, then watches; the HOLD ON!'s "Basil lowers Momo's coil" is shown as
   the coil sinking to the table as Basil hops (no code-drawn paws); in the cliffhanger Basil's leftover wire is a small coil at his paw.

## Open points for the teacher
1. The new-words clip (above) waits for the teacher's listen.
2. The watching paintings: the engine uses them by name once they are in spr/ (see Watching).
3. TheOneApp: `app_moments.json` adds EP23's two parts and retires the classic GNQn_TeCRgg (now '23A' in videos.js; its partner '23B'
   zAUE_ZuxcDs stays until EP24/EP25): the numbers need settling when the app is updated.
4. From the script's own open points: "most of its magnetism" (not "all"); the bell line says "Our school bell"; the WARNING strip read in
   full (about 13 s); Pip wrong three times across the two parts; TURNS OF WIRE defined as "A turn of wire is ...".
