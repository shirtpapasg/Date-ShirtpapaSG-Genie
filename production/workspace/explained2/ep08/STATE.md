# EP8 build state (for a resume after a restart)
P3 EP8 "What's your snack box made of? The 7 materials": Part 1 "This Jar Was Once SAND! What Are Things Made Of?" (object and
material; glass, metal, plastic, ceramic) and Part 2 "Your School Shoe Came from a TREE? The 7 Materials" (wood, rubber, fabric;
count the parts; all seven). The script: `../p3_ep08_script.md` (Part 1 Segment 2 as updated on 2026-11-20 to open from EP7's dare).

Three stages: **Stage 1 (setup, done 2026-11-20)** · Stage 2: Fable draws the scenes (`SCENES_TODO.md`) · Stage 3: render.

## Stage 1: done
- Engine copied from `ep05/` (no `out/`, no mp4/wav, no EP5 voices). EP5's scenes are gone: `wetland.js` removed, `shrink.js` keeps
  only the generic journey helpers, `p1.js` / `p2.js` rewritten. `bg/wetland.png` removed.
- `script.py`: both parts as data, every line word for word (checked against the script's tables; a few long cells are split into
  consecutive lines). `CUTS` holds the script's section 6 cut tags (none used).
- Voices (`voice/`, 126 lines + chant + unisons): `/home/user/heart-tts/venv/bin/python make_voice.py` keeps finished files and
  re-records only lines whose text or voice options changed. The new pace as EP6: Heart speed .90, .5 s between sentences; a
  sentence with a new term (opts `term`) x.93 slower and >= .65 s after it; the journeys .85, 1.0 s between sentences, 2.5 dB softer;
  buddies (Character Voice Kit) x.88. Chant: BAR 1.8 s, one name per beat, 9 bars (3 call + 3 YOUR TURN! + all together).
  Not aligned (spread by length, fine for one word): hk_object, hk_material.
- Timeline: `python3 build_tl.py 1|2`. New in EP8: `kw` word marks, `("hold", mark, 2.0, .6)` (a new term holds 2.0 s; Heart waits
  >= .6 s), `hold` 3.5 s for cream book strips, `holdw` for the kiln word strip. lib.js `KWHOLD` = 2.0 (was 1.5); Mark Sentence cards
  hold 2.5 s (the timeline's waits).
- **Lengths: Part 1 5:09.0 (309.0 s), Part 2 4:56.3 (296.3 s).** Both under 5:15: no cuts.
- Sound: `sound_cues.js` -> `node dump_cues.js P` -> `node song.js P` -> `out/mix_pP.wav` (both done, -16.0 LUFS, no missing sounds).
  New: canteen ambience (`R.canteen`, sau sfx `ep05_kids.wav`), library one-shots (`sfx`: hiss, flame_roar, hum, gurgle, squeeze,
  press), synth boing / tok / bubble / pomf / cloth / baa / twang.
- `materials.js`: the board data `MAT` (book order, stamp colours, source slots), `tileFull()`, the material-name pops `NAMES` +
  placeholder `namePop()` (2.0 s, hop to `BOARD_AT`), `wboard` and `magnifier` (kept from EP5), and `phScene()` (the Stage 1 placeholder).
- `p1.js` / `p2.js`: shared routines wired (game, goals, countdown, round cards, lock-ins with cards/picks/reactions, Mark Sentences,
  score hand, scores, read-along, chant, "Now you know!"); every new-art scene is a `phScene` placeholder naming what to draw.
- `SCENES_TODO.md` (generated: `python3 make_todo.py`; re-run after any timeline change): every scene's time range, what to draw,
  what to reuse from ep01-ep06, what is new, its marks and lines; the poses; the choices made where the script was unclear.
- Checks: `qa/p1_check.jpg`, `qa/p2_check.jpg` (placeholder stills, no page errors). No video rendered.

## Stage 2: done (2026-11-21). Every scene is drawn; no `phScene` placeholder is left in `p1.js` / `p2.js`.
- New files: `canteen.js` (BG.canteen, BG.stall = the noodle stall close, BG.under = under the table, all baked in `bg/`; the three
  containers, spoon, sand pile, ceramic bowl and soup spoon, clay lump, pencil, the white canvas school shoe with its four parts that
  light up, the folded T-shirt and its weave, the white-drops disc, the school bag; THE 7 MATERIALS board `board7` / `boardAt`; shared
  helpers `pline`, `ltag`, `kindTag`, `sPip`...), `pics.js` (27 picture-board drawings `PIC.*`, the cow / tree / rock card drawings),
  `probe.js` (draw any expression: `node probe.js out.jpg 1 '<js>'`). `shrink.js` holds both journeys. `page.html` loads them.
- Changed in the shared files: `materials.js` (`tileT(k)`: a tile fills when its popped name lands on it, never before; `namePop`
  redrawn: one low hop to the tile's top edge, a small copy for the shelf words), `sound_cues.js` (the tile stamp uses `tileT`, so the
  stamp for GLASS, METAL and PLASTIC is 0.55 s later than in Stage 1's mix: **re-run dump_cues + song**, which `build_part.sh` does),
  `trail.js` (`ansCard` takes `o.icon`), `common.js` (`lockN` passes `c.icons`; `bookCaption` takes `o.keys` to highlight words),
  `lib.js` (SAP pops at [1480, 850], size 100, under the card's right corner).
- Checks: stills at every scene start and end and round every mark in both parts (460 frames): no page errors. Contact sheets
  `qa/p1_sheet.jpg`, `qa/p2_sheet.jpg`; the journeys `qa/journey_sand.jpg`, `qa/journey_sap.jpg`. Thumbnails `thumb_part1.jpg`,
  `thumb_part2.jpg` (frames `qa/th/f1.png`, `f2.png`; commands as in EP5: `node thumb_still.js N 1 qa/th/fN.png "&thumb"`, then
  `node thumb.js qa/th/f1.png thumb_part1.jpg 1 "THIS JAR" "WAS ONCE|SAND!" 250 170 150` and
  `node thumb.js qa/th/f2.png thumb_part2.jpg 2 "YOUR|SCHOOL SHOE" "CAME FROM|A TREE?" 190 140 132`).
- **No video was rendered in Stage 2** (not even a test clip): motion was judged from stills only. Stage 3 should watch the two
  journeys, the board's slide-in, the name hops and the camera drop in the cliffhanger in motion.
- Deviations from the script are listed in the Stage 2 report (hand-over); the main ones: the spoon's two tags (OBJECT / MATERIAL)
  appear under Mark Sentence 1, not in the spoon scene (the MATERIAL pop fills that scene's last 2 s); the white-drops close-up in
  Part 2 Round 1 is the ring picture, not a pop beside the shoe; Part 2's table holds a pencil, the shoe and the T-shirt; Part 1's
  lizard is on the classroom window beside the noodle stall (seen in the Round 2 ring picture); a small round inset of the shoe
  shows where "you" are in the last stop of the sap journey.
## Stage 3: `./build_part.sh P` (timeline, cues, song, `flock /tmp/explained_render.lock node render.js P 3`, `finish.sh P`).
- Stills: `PART=2 ./sheet.sh name cols t1 t2 ...` -> `qa/name.jpg`. Bake backgrounds: `node bake.js <names>`.
- Status: see ../progress/ep08.json

## On resume (teacher, 21 Nov)
Before Stage 3, apply the 21 Nov rules in SERIES_FORMAT.md, especially section 1b LOOK-CLOSER: each material gets a slow zoom-in on the real thing with the evidence shown (sand melting, clay in the kiln, sap from the cut), held 6-10 s, Heart describing what we see, one verdict tag. Also: Heart names the hidden animal at the start; no orphan labels.
