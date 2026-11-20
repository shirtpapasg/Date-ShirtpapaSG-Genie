# EP7 build state (for a resume after a restart)
P3 EP7 "A mushroom is NOT a plant: fungi and bacteria": Part 1 "We Sealed Bread in a Bag for 10 Days. What GREW?" (fungi) and Part 2
"Your Hands LOOK Clean. What Is Living on Them?" (bacteria, the table of clues, the chapter map). Script: `../p3_ep07_script.md` (Fable).
Three stages: 1 setup (Opus) -> 2 scenes (Fable) -> 3 render (Opus). Status: `../progress/ep07.json`.

## Stage 1 (setup): DONE (20 Nov 2026)
- Engine copied from `ep05/` (no `out/`, voices, renders, QA). EP5's scenes were cleared: `p1.js` and `p2.js` are empty stubs that list the
  scenes to draw; `shrink.js` keeps only the generic journey helpers (`youTag`, `feelTag`, `uwRays`, `uwSpecks`, `hexL`); `bg/wetland.png` removed.
  Shared code kept as is: lib.js, common.js, props.js, hotel.js, garden.js, trail.js, wetland.js (its animals are reused on the map), main.js,
  render.js, bake.js, finish.sh, sheet.sh, stills.js, thumb*.js, audio/, spr/.
- New pace (SERIES_FORMAT section 3, teacher 20 Nov), taken from `ep06/make_voice.py`: Heart .90 with .5 s between sentences; a sentence
  with a NEW TERM (opts `term`) x.93 slower with at least .65 s after it; buddies 12% slower than default (x.88); journeys at .85.
  Timeline (`script.py`): a new key word pops .45 s after its sentence and holds 2.0 s (`KWPOP`; lib.js `KW` hold 2.0); Mark Sentence cards
  hold 2.5 s (`MARKHOLD`); book sentences on cream strips (`strip`) keep the cursor at least 3.5 s from the line's start (`build_tl.py`,
  stored as `lines[id].strip`).
- `script.py`: both parts as data, word for word (checked against the markdown: only the three cuts differ). Chant (Part 2): three call and
  answer lines, YOUR TURN! after each, no all-together bar; bar 2.8 s (`make_voice.py` `BAR`, `ANS_AT`, `SLOTS`).
- Voices: `voice/` (all recorded; ritual lines shared with EP6 were copied from `ep06/voice`). Re-run
  `/home/user/heart-tts/venv/bin/python make_voice.py` after a text change: it keeps finished files and records only changed lines.
  Not aligned (spread by word length, harmless): `hk_yeast`, `j202`.
- Timelines: `python3 build_tl.py 1|2` -> Part 1 **5:15.4**, Part 2 **5:15.4**.
- Cuts (script section 6; Part 1 first came to 5:18.6): 1 the title's second slam; 2 Heart's "Day ten!"; 3 Momo's "Is it dust?" (Heart now
  says "It is not dust. It grew!"). Part 2 came to 5:15.9: no script cut; 0.5 s came out of two picture-only waits (`pullout`, `dare`).
- Sound: `sound_cues.js` (both parts, on the timeline's cues; `window.DAYSTEP` = the time-lapse's day step) -> `node dump_cues.js P` ->
  `cues_pP.json` -> `node song.js P` -> `out/mix_pP.wav` (-16 LUFS). `song.js` has EP7's new sounds (fridge hum, tap water, far canteen,
  zip, bin lid, bubbles, drain, sand pour, wind, kettle). The mixes are audio previews only: rebuild them after Stage 2 if cues move.
- `SCENES_TODO.md`: the artist's brief per scene (times, what to draw, what to reuse, what is new, lines and marks, the poses). It is
  generated: `python3 make_scenes_todo.py` (re-run after any retime).

## Stage 2 (scenes, Fable): NEXT
Draw every scene in `SCENES_TODO.md` in `p1.js`, `p2.js`, `shrink.js` (+ a kitchen set file if wanted, added to `page.html`).
Stills: `PART=1 ./sheet.sh name 4 t1 t2 ...` -> `qa/name.jpg`. Bake static sets: `node bake.js <name>`.

## Stage 3 (render, Opus)
One part end to end: `./build_part.sh P` (timeline, cues, song, `flock /tmp/explained_render.lock node render.js P 3`, `finish.sh P`).
10 s chunks are kept in `out/chunks_pP/`. Then thumbnails (`thumb_still.js`, `thumb.js`), `upload.json`, and the upload (SERIES_FORMAT
section 10, Autopilot). Never commit .mp4 or .wav.
