# EP7 build state (for a resume after a restart)
P3 EP7 "A mushroom is NOT a plant: fungi and bacteria": Part 1 "We Sealed Bread in a Bag for 10 Days. What GREW?" (fungi) and Part 2
"Your Hands LOOK Clean. What Is Living on Them?" (bacteria, the table of clues, the chapter map). Script: `../p3_ep07_script.md` (Fable).
Three stages: 1 setup (Opus) -> 2 scenes (Fable) -> 3 render (Opus). Status: `../progress/ep07.json`.

## Stage 1 (setup): DONE (20-21 Nov 2026)
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
- Pronunciation (teacher, 21 Nov): `make_voice.py` sends every Heart and buddy text through `../sg_pron.py` (`needs_fix` -> `speak_line`):
  Sungei Buloh, (Pulau) Semakau, "live"/"lives" said "liv". No EP7 line contains any of them (checked 21 Nov), so nothing was re-recorded;
  a future line with one is fixed automatically.
- Timelines: `python3 build_tl.py 1|2` -> Part 1 **5:15.4**, Part 2 **5:15.4**.
- Cuts (script section 6; Part 1 first came to 5:18.6): 1 the title's second slam; 2 Heart's "Day ten!"; 3 Momo's "Is it dust?" (Heart now
  says "It is not dust. It grew!"). Part 2 came to 5:15.9: no script cut; 0.5 s came out of two picture-only waits (`pullout`, `dare`).
- Sound: `sound_cues.js` (both parts, on the timeline's cues; `window.DAYSTEP` = the time-lapse's day step) -> `node dump_cues.js P` ->
  `cues_pP.json` -> `node song.js P` -> `out/mix_pP.wav` (-16 LUFS). `song.js` has EP7's new sounds (fridge hum, tap water, far canteen,
  zip, bin lid, bubbles, drain, sand pour, wind, kettle). The mixes are audio previews only: rebuild them after Stage 2 if cues move.
- `SCENES_TODO.md`: the artist's brief per scene (times, what to draw, what to reuse, what is new, lines and marks, the poses). It is
  generated: `python3 make_scenes_todo.py` (re-run after any retime).

## Stage 2 (scenes, Fable): DONE (21 Nov 2026). Ready for Stage 3.
Lengths now: **Part 1 5:17.2, Part 2 5:15.5** (the teacher's 21 Nov rules added spoken lines; .9 s of picture-only waits came out of Part 1).
Part 1 is about 2 s over the 5:15 guide: the next cut in the script's own order (section 6) is Basil's "Nice cap! Can I try it on?" (2.4 s).

**Files.** `kitchen.js` (the HDB kitchen `BG.kitchen` / `BG.kitchen_night`, baked; the tray OUR BREAD BAG, slice, bag, `mould(day)`, dough bowl, yeast
packet, day pill, pedal bin, the hidden snail and ant, `kitchenView`, `closeBg`), `things.js` (trays USEFUL/HARMFUL, mushroom side + underside, spore
dust, punnet, tempeh, hands + `sinkView`, microscopes, round view, yoghurt, body, Pip's table, the chapter map, canteen, sandwich, strips, cards),
`shrink.js` (`sporeJourney`, `bactJourney`), `p1.js`, `p2.js`, `reuse.js` (copied unchanged from ep04/ep06/ep08: do not edit),
`animals.js` + `wetland.js` (copies of ep05's cute animals), `fable_art.js` (copy of ep06's: the bat), `tests.js` (asset sheets: `QS="&test=kitchen"`).
After changing the kitchen set: `node bake.js kitchen kitchen_night`.

**The teacher's rules of 21 Nov, as built here**
- Calm recap (Part 2): the silent 4 s montage is gone (`recap` scene removed). `lasttime` = three pictures under Heart's "Last time..." line, each
  large, one at a time, with a label and a gentle push-in: the Day 10 bag "Bread mould: a harmful fungus" (5.2 s), the risen dough "Yeast: a useful
  fungus" (3.2 s), the clean hands "We washed our hands. Why?" (2.6 s, and the same picture carries on into `pipclean`).
- Goal cards read aloud: Momo in Part 1 (`g401`-`g404`), Basil in Part 2 (`j251`-`j254`); `goals3(t, s, goals, who, ids)` lifts and glows each card as it is read.
- Mark Sentences are read by the buddy who says "Say it with me!": `g1003` Basil, `g1105` Momo, `j708` Basil, `j1103` Pip (old Heart takes were removed).
- Lock-ins: `lockN` has `labels(t)`, drawn on top of the ring and kept through the countdown; cards and ring picture stay.
- Hidden animal: Part 1 a little snail on the window glass during two nights of the time-lapse (`winSnail`); Part 2 an ant walking along the sink's edge
  by the soap pump in `harmful`. Heart names them: `g301`, `g1302`, `j301`, `j1202` (re-recorded). The rules scene shows the animal's picture.
- Cute and alive: frog, kingfisher, fish, ant (ep05/animals.js), the bat (ep06/fable_art.js) and the monitor move on the map; snail and ant blink and walk;
  bacteria and mould have NO faces (the script's accuracy rule) but drift, sway and grow.
- No orphan labels: the ending's YOU tag now stands with two cheering hands (`nykScene`).
- Look-closer moments (rulebook 1b): the ten-day time-lapse is a slow push-in with the score and shelf away and one verdict tag ("It grew!"); a magnifier
  on one patch with plain labels "threads" and "spores" while the book sentence is read (`patches`); the dough card comes forward and swells while the
  yeast sentence is read, verdict "The dough is bigger: useful!" (`trays`); bacteria in the large round view (`shapes`); the two trays.
- sg_pron: no EP7 line has a listed word (make_voice.py routes every line through it).

**Deviations from the script's "On screen" column** (all from the 21 Nov rules unless said): the hidden lizards became a snail (window) and an ant (soap pump),
with new Heart lines; the Part 2 montage became the calm recap; goals are spoken; buddies read the cards; "threads"/"spores" labels and the dough verdict
tag are new on-screen words; in the trays scene the tag reads "dispersed = spread far and wide"; the bag's zip runs along its mouth, which lies at an
angle on the tray (it still closes left to right); the mushroom is drawn new, as a brown market mushroom (EP4's small one stays on the map and in the table).

**Sound.** `sound_cues.js` follows the new timeline (no "chek-chek": soft pops for the snail and ant; no montage clacks; a pop per goal card as it is read;
the `slam2` cue that had no mark is gone). `out/mix_p*.wav` were rebuilt as previews.

**Checks.** `qa/sheet_part1.jpg`, `qa/sheet_part2.jpg` (contact sheets, no page errors), `qa/stills/p1_spore_*.jpg`, `qa/stills/p2_bact_*.jpg` (the two
journeys), `thumb_part1.jpg`, `thumb_part2.jpg` (`node thumb_still.js N 1 qa/th/fN.png "&thumb"`, then `thumb.js`). No motion test was rendered:
Stage 3 should watch the two journeys, the bag being binned (`cliff`), the yoghurt hop and the dough close-up for motion.

## Stage 3 (render, Opus)
One part end to end: `./build_part.sh P` (timeline, cues, song, `flock /tmp/explained_render.lock node render.js P 3`, `finish.sh P`).
10 s chunks are kept in `out/chunks_pP/`. Then thumbnails (`thumb_still.js`, `thumb.js`), `upload.json`, and the upload (SERIES_FORMAT
section 10, Autopilot). Never commit .mp4 or .wav.
