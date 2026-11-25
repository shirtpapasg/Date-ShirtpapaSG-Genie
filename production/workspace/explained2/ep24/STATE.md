# EP24 build state (for a resume after a restart)
P3 EP24 "Was that test fair? Change only one thing" (Ch 7, p. 118 + Let's Apply Q1, Q2(b), pp. 123-124; the sixth Magnets episode). The script:
`../p3_ep24_script.md` (version 1, Opus, 25 Nov 2026; the teacher's 25 Nov go-ahead "Go ahead with all the rules, build episode 24, 25 ...";
EP24-26 pre-approved to go live without the teacher's check, the main session reviews first). The source of every spoken word: `script.py`.
- **Part 1** "Is Basil's Test FAIR? Change Only ONE Thing" **5:25.4** (325.36 s, 9761 frames): the science room (EP23's SR23) on Tuesday;
  EP23's dare answered (two, not fair); be a steel paper clip; VARIABLE (Pip); two things changed (7.10 strip; FAIR TEST, Momo; 7.9, Momo);
  HOLD ON! Momo's magnet race (the distance changed too; Basil's fix with a ruler); make it fair (twenty turns each; EXPERIMENT, Basil; 7.8a,
  Basil); the woodlouse; the cliffhanger (Momo's plan).
- **Part 2** "Plan It, Test It, Count It AGAIN! Why Scientists Repeat" **5:39.5** (339.54 s): Wednesday; Round 1 Momo's plan X / Y (no, two
  things changed); PREDICTION (Basil); our plan (the book's table 7.12 row by row; VARIABLE TO BE MEASURED, Momo; the prediction, Pip); the
  Showdown (Pip's card "count once"); be a steel paper clip counted again and again; count it again (9 · 8 · 9 and 5 · 6 · 5; RELIABLE, Pip;
  the crane gets the two-battery hook; 7.11, Basil); the chant; the sparrow; the dare into EP25 (the fridge door).
- Scores: Part 1 1 : 1, 2 : 1; Part 2 1 : 0, 3 : 0.

## Status (25 Nov 2026): BUILT, NOT UPLOADED
## The engine (copied from ../ep23 at 16:40 UTC, never edited there)
Everything EP23 had (lib.js n2 4 decimals, the 25 Nov ghost fix and nykScene cheer fix, the watching hook: `<buddy>_watch_closed` / `_watch_ooh`
drop in by name when they are in spr/; art23.js, sets23.js, lc23.js as libraries). **Changed for EP24:** lib.js OUTCOMES / KW / KWLINE /
SHELF_HIDE / learnAt; tests.js (HIDDEN, the dare constants); common.js PHR / PCOL (the chant, "No!" in red); sound_cues.js (EP24's marks);
finish.sh (names, sheet marks); render.js crf 19 (disk); measure_countdowns.py (5 s rings, Showdown 6 s). **New:** script.py, art24.js
(nail24 iron / steel the same shape, setup24, the boards IRON OR STEEL? and OUR PLAN, Pip's plan card, pins and bar magnets on threads, the
ruler, the woodlouse and the sparrow with FACES notes, SR24, the fridge for the dare), lc24.js (the four look-closers, both journeys, the ring /
card / recap / fun-fact / Mark Sentence / chant pictures), ep24dare.js (EP25's three cards, self-contained: EP25 copies it unchanged),
p1.js, p2.js, run_both.sh (renders both parts under the shared lock, retrying a crashed Chromium), upload.json, app_moments.json.

## Rhythm and music (teacher 25 Nov: "I prefer the rhythm and music of episode 1 to 10")
- Music: the ORIGINAL series beds (EP23's song.js: game groove, calm bed, micro-world pad), one bar clock, 0.8 s crossfades; quiet journeys
  (only the pad from waitw to the end of the pull-out). No Kampong Walk, add_lofi.py not run.
- Pacing, measured on the rendered timelines: Part 1 130 words a minute, a voice 77% of the time; Part 2 120 wpm, 77%. EP1-10: 105-117 wpm,
  68-75%; EP22-23: 125-136, 79-81%. So EP24 is slower and roomier than EP22-23 (EP1-10's 5 s rings for every lock-in, 6 s for the Showdown,
  0.6 s after most lines, a 1.2 s wait after questions) but still a little denser than EP1-10: matching them exactly would need about 80
  fewer words a part (a departure, reported).

## Checks done
- Voices: make_voice.py (EP23's method). Not aligned (spread by word length): m705m, n607, n1103p.
- Sweep (every 1 s): 0 bad both parts. Ghost scan: no buddy ghosting (qa/ghost_p1.txt, qa/ghost_p2.txt). Facing scan: no backwards movers
  (qa/facing_p2.txt; Part 1 run, the same: the woodlouse and sparrow stay on the spot; buddies' pop-in moves only).
- Part 1: decode clean (9761 frames, 1920x1080, 30 fps), -16.0 LUFS; countdowns step 1.00 s with the ticks, the bell on 0 (Round 1 at
  64.93 s, HOLD ON! at 204.03 s).
- Part 2: see the end of this file.

## Changed from the script (and why)
1. Part 1: Momo's "Your iron nail picked up a lot more clips" cut (`momoclips`: the dip shows it); the woodlouse tip given to Pip, and "Now only
   the magnet is different. That is fair!" to Pip (Pip had only two lines); Round 1's question shortened (the dare was read 40 s earlier).
2. Part 2: came out at 5:46.8, so `sparrowtip` and `basilfix` were cut (5:39.5); the sparrow is revealed on a corridor railing seen through the open door (drawn for the reveal; the 280-300 s span re-rendered and spliced in after the first render showed it on the door frame).
3. Basil's fair iron-or-steel test is set up but its result is never shown (script section 3, Facts 1).
4. The magnet race: each bar magnet hangs on a short thread from its owner's paw (nothing floats), drawn in front of the buddies.
