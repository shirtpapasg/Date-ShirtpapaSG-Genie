# EP15 build state (for a resume after a restart)
P3 EP15 "One mango seed to a tree full of mangoes: 3 stages" (Ch 4, Life Cycles of Plants, pp. 76-79; 5.16 from p. 93). Part 1 "We Planted
a Mango SEED. What Grows FIRST?" (EP14's dare answered: a young plant; observing like a scientist; the seed through a window in the pot:
root first, then the shoot; be the mango seed; measuring with a ruler; HOLD ON! from the table) **5:27.9**. Part 2 "The Mango or the Seed:
Which Came FIRST?" (the old tree in flower: an adult plant; be a mango flower; the seed inside the fruit; the loop of three stages, no first
or last; Showdown: Momo's homework; Singapore's seed bank; the chant; the dare into EP16: a tadpole) **5:41.9** (over the 5:30 aim after
all non-teaching cuts: `../p3_ep15_script.md` section 6 lists what else could go).
The script: `../p3_ep15_script.md` (version 1, Opus, 22-23 Nov 2026; its segment tables are generated from `script.py` + the timelines).

Stages: **Stage 1 (setup, voices, timelines, staging): DONE 2026-11-23, Opus** (paused by the teacher on 22 Nov, resumed "continue" 23 Nov)
· Stage 2 (drawing: Fable) · Stage 2.5 (teacher's-eye review, NOTES_REVIEW.md) · Stage 3 (render, checks, upload: Opus).

## Stage 1 done (2026-11-23)
- **Engine copied from `../ep14/`** (its final, live engine): lib.js, common.js, closer.js, shrink.js, props.js, hotel.js, garden.js, trail.js,
  materials.js, canteen.js, pics.js, song.js, music.js, audio/, render.js, finish.sh (ep15 names, EP15 contact-sheet marks), bake.js,
  build_part.sh, build_all.sh, dump_cues.js, probe.js, stills.js, sheet.sh, measure_countdowns.py, compare_ep1.py, build_tl.py, make_voice.py
  (EXTRA += "momo's"), prep_sprites.py; bg/ stage, stage2, daystage, _grain. NOT copied: EP14's scenes and art (flat14.js, garden14.js,
  tests.js, p1.js, p2.js, ep13dare.js), its voices (only the ritual lines h501, h860, h864, h1304a/o/t, h1305, u1300, u1305, u1002),
  check_words.py (EP14's words).
- **Changed for EP15:** lib.js `POSE_SUB` (only Basil arms_crossed -> thinking: Momo and Basil have coloured pointing), `OUTCOMES` (EP15's
  reveals), `learnAt` (kw_*, v_*, tagadult, tback, bend), `KW` / `KWLINE` (P1 OBSERVING, SEED, YOUNG PLANT; P2 ADULT PLANT, THREE STAGES,
  SEED BANK), `SHELF_HIDE` (+ lcobserve, lcseed, lcadult, lcbank); common.js `PHR` (the chant), `animalLabel` uses `HIDDEN[2]` (the label
  "weaver ant"); main.js calls `XDEFS14E` and a Stage 2 `XDEFS15`; page.html loads tests.js + ep14dare.js.
- **New:** `ep14dare.js` (EP14's three mango dare boards, real art, copied unchanged from ep14/garden14.js), `tests.js` (EP15 data and
  placeholders: HIDDEN, SNAIL, ANT, kitchenPH, corridorPH, gardenPH, lcPH, ringPH, small print, DAYS, ffPH / FF), `p1.js` / `p2.js`
  (placeholders; the shared routines wired: recap, title, gameScene push-ins, goals, lock-ins, look-closer frames, strips, Mark Sentences,
  chant, score hands, lizReveal + funFact, read-along, Now you know), `sound_cues.js` (a GENERIC Stage 1 plan: rituals and beds; Stage 2
  adds each place's bed and foley on the marks), `script.py` (every line; CUTS), `make_todo.py` -> `SCENES_TODO.md` (full staging per scene
  and per line: draw, frame, camera, poses per line, the hidden animal's spot, life, light, marks, lines), `upload.json`.
- **Voices** (`voice/`, `make_voice.py`, log `voice.log`): every line recorded (Heart: Kokoro af_heart via sg_pron; buddies: the Character
  Voice Kit, 12% slower), aligned (pocketsphinx), "live(s)" = "leev(z)" via sg_pron (Heart's 4.6 line and the dare), "2019" spoken "twenty
  nineteen", Pip's "The 3 plant stages" says "three". Re-running make_voice.py keeps finished files and records only changed lines.
- **Timelines:** `python3 build_tl.py 1|2` -> tl_p1/2.json/js. `node dump_cues.js 1|2` -> cues (88 / 107 events). A sweep that renders
  every 0.25 s of both parts in the page: no errors. `prep_sprites.py` run (38 coloured sprites).
- **Scores:** Part 1 Round 1 1 : 0, HOLD ON! 2 : 0; Part 2 Round 1 1 : 1, Showdown 3 : 1.
- **upload.json:** both parts public, Made for Kids (the uploader sets it), playlists PLb8LpPqxQI4E and PLPfEuT7l4KjI right after
  `explained-p3-ep14v2-part2`; `replaces` the classic RVRoaWWKjEM ("What Happens After You Plant A Seed? Round And Round", pp. 73-79, now
  covered by EP14 + EP15; EP14's STATE said it stays until EP15 is live) with `retire_old` (out of the playlists + a NEW VERSION line; never
  deleted or unlisted). **Not run.** Thumbnails (`thumb_part1.jpg`, `thumb_part2.jpg`) are Stage 2's (THUMBNAIL_V2: P1 WHAT GROWS FIRST? +
  Basil surprised + the seed's root and shoot; P2 WHICH CAME FIRST? + Momo thinking + the cut mango and its seed with a loop arrow).

## For Stage 2 (Fable): start here
- Read `SCENES_TODO.md` top to bottom (the rules block first), then `../p3_ep15_script.md` sections 3 and 11.
- New sets in new files (e.g. `home15.js`: the kitchen + the corridor + the pot with its window + the journal + the ruler; `garden15.js`: the
  garden, the old mango tree, the loop board, Momo's easel, the seed bank, the two journeys, the snail and the weaver ant), loaded after
  tests.js in page.html. Replace the placeholders, keep every mark (the sound keys on them).
- Models in ep14/: `SC.holdon` (p1.js) for the HOLD ON!, `SC.show` / `SC.fix` (p2.js) for the Showdown, `SC.dare` (p2.js) for the dare,
  `lcthen` / `lcchick` for the look-closers, `chickJourney` for a journey with riders.
- Then `./build_part.sh 1` and `2`, contact sheets, the teacher's-eye review (SERIES_FORMAT 10.6), fixes, upload (`--check` first).

## Open points
- Part 2 is 5:41.9 (aim about 5:30): if the reviewer wants it shorter, section 6 of the script lists the next cuts.
- Fun facts checked from established natural history (no web access here): snails' radula with thousands of teeth; weaver ant larvae
  give the silk for the nest. Seed bank: Singapore's first, 2019, Singapore Botanic Gardens (definitions file + brief).
- School Lab 4.2 stays out until its bench stops numbering the stages (the brief's warning).
