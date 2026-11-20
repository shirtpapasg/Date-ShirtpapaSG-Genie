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

## Stage 2 (next): draw the scenes (Fable). Read `SCENES_TODO.md` first.
## Stage 3: `./build_part.sh P` (timeline, cues, song, `flock /tmp/explained_render.lock node render.js P 3`, `finish.sh P`).
- Stills: `PART=2 ./sheet.sh name cols t1 t2 ...` -> `qa/name.jpg`. Bake backgrounds: `node bake.js <names>`.
- Status: see ../progress/ep08.json
