# EP15 build state (for a resume after a restart)
P3 EP15 "One mango seed to a tree full of mangoes: 3 stages" (Ch 4, Life Cycles of Plants, pp. 76-79; 5.16 from p. 93). Part 1 "We Planted
a Mango SEED. What Grows FIRST?" (EP14's dare answered: a young plant; observing like a scientist; the seed through a window in the pot:
root first, then the shoot; be the mango seed; measuring with a ruler; HOLD ON! from the table) **5:27.9**. Part 2 "The Mango or the Seed:
Which Came FIRST?" (the old tree in flower: an adult plant; be a mango flower; the seed inside the fruit; the loop of three stages, no first
or last; Showdown: Momo's homework; Singapore's seed bank; the chant; the dare into EP16: a tadpole) **5:41.9** (over the 5:30 aim after
all non-teaching cuts: `../p3_ep15_script.md` section 6 lists what else could go).
The script: `../p3_ep15_script.md` (version 1, Opus, 22-23 Nov 2026; its segment tables are generated from `script.py` + the timelines).

Stages: **Stage 1 (setup, voices, timelines, staging): DONE 2026-11-23, Opus** (paused by the teacher on 22 Nov, resumed "continue" 23 Nov)
· **Stage 2 (drawing, sound, full render, self-check): DONE 2026-11-23, Opus** · **Redo with v2 cast: DONE 2026-11-23, Opus (rendered, awaiting the teacher's review of qa/; NOT uploaded)** · Stage 2.5 (teacher's-eye review: the teacher reviews qa/buddy_faces_p1/p2.jpg, qa/preview_p*_clips.mp4, qa/highlights.jpg first) · Stage 3 (render, checks, upload: Opus).

## Redo with v2 cast done (2026-11-23, Opus)
- **Cast:** prep_sprites.py SET pip -> pip (grey, unchanged), momo -> momo_v2, basil -> basil_v2 (41 sprites; Basil now also has
  arms_crossed, worried, laughing; Momo every pose). lib.js POSE_SUB: the old stand-ins removed; only `worried` -> thinking for Pip and
  Momo (no worried painting yet). **SIZE_K basil .94** (was .88 for the old, wider Basil): measured on the sprites, at .94 Basil v2's painted
  area (tail included) equals Pip's and Momo's at the same height, and his crest sits level with Pip's head; `qa/size_check.jpg` shows the
  three side by side. Same depth = same size fixed in the kitchen (Momo 400, Pip 395), the count-in (all 420, Basil off the low centre),
  the score hand (all 430), both "Be the ..." send-offs (Pip 410), the HOLD ON! fix (Pip 420, Momo 390).
- **Reactions with a reason** (SERIES_FORMAT 5, one job per pose). Audit tool `pose_audit.js <part>` (samples every 0.1 s through lib.js
  `window._POSE`, which now carries `why`: scene / outcome / react) -> out/poses_p*.json. Before: 160 pose moments (P1 85, P2 75); after:
  75 (P1 37, P2 38). About 90 had no reason and became listening (sit, blink, nod); about 12 were changed to the pose that has the reason
  (countdowns -> worried; send-offs -> waving goodbye; Basil's "Three, a lizard!" -> laughing; cheers moved onto the learning marks).
  Engine: lib.js reactPose keeps only "thinking" right after a real question (not "Are you ready?" / "Three fingers?"); no automatic
  oops / surprised / cheer from words; a cheer outside a learning mark becomes sit (never a stand-in arms-crossed); learnAt adds the
  journeys' last stops (jyoung, jnew). common.js: lockN lead = thinking after the question, WORRIED through the countdown, listening after
  the bell (no oops before the reveal); goals/chant/kwrecap/pop-ins/fun-fact teller/NYK listen; markScene reader points at the card in
  the 0.8 s pause; gameScene finder points at the animal 2.5 s. closer.js: look-closer faces listen; poses only via `peekEv`. P2 Round 1
  lead is now Basil (his painted worried face). Every kept pose and its reason: `pose_reasons.json` (read by the face sheets). In short:
  thinking only after a question (Momo/Pip holding last time's answer; Momo's open questions; the dare); worried in all four countdowns
  (Basil x3; Momo in the Showdown shows her thinking face); oops/arms crossed only at reveals (OUTCOMES) and while a buddy's own mistake is
  on screen (Basil's roots idea, his table ruler, his "buy seeds" idea; Momo's homework); surprised only for red-leaves-are-normal, 12 cm
  not 20 cm, the new seed in the cut mango; cheer only on A YOUNG PLANT COMES FIRST, the journeys' last stops, FLOWERS AND FRUITS, THREE
  STAGES, Momo's fixed homework, SEEDS KEPT SAFE and "Now you know!" (each buddy about once a minute at most); pointing only at a named
  thing (the hidden animal, the root, the shoot, the young plant, the ruler's zero, the old tree, the board, the card, the tadpole);
  waving only hello (Pip, cold open) and the goodbyes into the journeys; laughing once (the lizard joke).
- **Fixes:** the hidden animals: SNAILC/ANTAT rebuilt so neither ever returns to its intro spot or repeats a spot (snail: seedans moved off
  the floor where Pip hid it, strip no longer repeats measure; ant: adultans off the intro leaf, waitw off the trunk, the reveal on a new
  leaf at the left of the crown). Mango flower sprays redrawn as branched panicles (pink-red stalks, side branches and twigs, clusters of
  tiny five-petal flowers; dots when far). Cold-open lifting hand and the P2 pot-carrying hands come in level from the sides. P2 look-closer
  tags: in screen space at the panel's foot, joined to their plants, clear of the face, the bubble (moved to the free sky) and the verdict;
  "tiny flowers" / "new leaves" labels no longer clipped at the panel top or under the strip. Basil's fruit-cut bubble moved off the "a new
  seed" tag. Showdown: Momo's homework grows big for the countdown; the homework page taller so line 3's pictures and the fix never sit on
  its words. Journey (P1) richer: a Day 1 -> Day 30 pill with "speeded up", water drops seeping down to the seed, riders bigger (h 200,
  both journeys).
- **Rendered 2026-11-23** (build_part.sh + finish.sh, chunks deleted): `ep15_part1.mp4` **5:28.0** (327.97 s), `ep15_part2.mp4`
  **5:41.9** (341.93 s), both -16.0 LUFS; srt, sheet_part1/2.png, qa/ep1_compare_p1/p2.jpg. **Countdowns** (measure_countdowns.py): P1
  Round 1 numbers 60.381/61.381/62.381/63.381 (steps 1.000), bell 63.348; P1 HOLD ON! steps 1.000 x5, bell 254.013; P2 Round 1 steps 1.000
  x5, bell 54.234; P2 Showdown steps 1.000 x5, bell 192.49. Only ticks and the bell under them.
- **For the teacher's review (qa/):** `buddy_faces_p1.jpg`, `buddy_faces_p2.jpg` (every pose on screen, time + reason; faces_sheet.js/.py),
  `preview_p1_clips.mp4` (74 s) and `preview_p2_clips.mp4` (75 s), 720p with sound (make_preview.sh; not committed), `highlights.jpg`
  (10 labelled stills; highlights.py), `size_check.jpg`.
- **App time-stamps for upload day:** `app_moments.json` (videos.js P3 entries 15A / 15B, 12 + 14 moments, 1.5 s before each idea, keys
  O.cycles + CH.plantCycles as names; they replace the classic no 15 RVRoaWWKjEM) and `production/youtube/chapters_p3.json` keys
  "EP15_P1" / "EP15_P2" (swap in the video ids after upload). `python3 make_moments.py` regenerates both.
- **Still weak / for the reviewer:** Pip and Momo have no worried painting (thinking face stands in; Momo's Showdown); the P2 pot-carrying
  hands are level now but still float without arms; P2 lcbank's fine print briefly crosses the SEED BANK sign during the push-in; key words
  still pop large over the pot in seedans (engine, as EP14); Part 2 is 5:41.9 (aim 5:30).

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

## Stage 2 done (2026-11-23, Opus)
- **New art files** (loaded after ep14dare.js in page.html): `home15.js` (shared props: hand15 with four fingers and a thumb, the mango, its
  ONE big flat hairy seed, mango leaves red -> green, youngPlant15 at any age, OUR terracotta pot, a clear 30 cm ruler at CM = 18 px, the
  snail; the HDB kitchen after rain `BG.kitchen15` + `VK`; the common corridor `BG.corridor15` + `VC` with our pot on its plant stand (the
  table) and the old mango tree's crown beyond the parapet; look-closer arts `obsArt` (the seed and the journal) and `seedArt` (the window in
  the pot, Day 1 to Day 45); the journey `seedJourney`; `strip15`, a two-line book strip), `garden15.js` (the weaver ant; the community
  garden `BG.garden15` + `VG15` with the old mango tree, its flower sprays, green mangoes, red new leaves, the leaf nest, the pond and its
  tadpoles; `adultArt`, `loopBoard` OUR MANGO'S LIFE CYCLE (no numbers, no start, no end), `hwEasel` (Momo's homework), `bankArt`, the
  journey `flowerJourney`, the fun-fact pictures ffTeeth / ffScrape / ffNest / ffBaby / ffTree, the dare's cards PIC.fish15 / frog15 / liz15,
  `recapPic` for Part 2's "Last time..."). Baked: bg/kitchen15, corridor15, garden15 (`node bake.js kitchen15 corridor15 garden15`).
- **p1.js / p2.js**: every placeholder replaced; every mark kept. The hidden animal moves scene to scene (`SNAILC` in home15.js, `ANTAT`
  in garden15.js), pushes in to its black-ringed circle, the reveals end with the labelled fun-fact panels.
- **Engine fixes**: lib.js buddy() sorts its pose list (an unsorted list gave a NaN sparkle in HOLD ON!); common.js funFact takes `sx, sy`
  for its bubble; `g14Mango` (EP14's dare boards' gradient) was missing in EP15: now in XDEFS15.
- **Sound** (sound_cues.js Stage 2 block, song.js): beds per place (R.room: the kitchen and the corridor; R.garden: the garden, no hens),
  drips in the kitchen, the neighbour's wind chime in the corridor (new synth `windchime`), the seed bank's hum; foley on the marks
  (knife, squish, seed on saucer, soil pats, water drops, journal, pencil, sniff, root creak, shoot pop, leaves, ruler slide/clack, tiles,
  strike, jars, cold-room door, the pond). No music under the countdowns (song.js gaps, as EP14). Mix at -16 LUFS.
- **Thumbnails** (thumb_v2.js `ep15_1`, `ep15_2`): P1 WHAT GROWS FIRST? + Basil surprised + the seed with its root and red-leaved shoot
  (sky-blue burst); P2 WHICH CAME FIRST? + Momo thinking + the cut mango, its seed, a loop arrow to a young plant (pink burst).
- measure_countdowns.py and compare_ep1.py point at EP15 (P2's rings are 5 s).
- **Rendered 2026-11-23** (build_part.sh, one at a time under /tmp/explained_render.lock; chunks deleted after muxing): `ep15_part1.mp4`
  5:28.0, -16.0 LUFS; `ep15_part2.mp4` 5:41.9, -16.0 LUFS (both 1920x1080, 30 fps; not committed). `ep15_part1.srt`, `ep15_part2.srt`,
  `sheet_part1.png`, `sheet_part2.png`. Part 1's sound was re-mixed once after the render (a wind chime fell inside the HOLD ON!
  countdown: sound_cues.js now drops ambience one-shots in every countdown window) and re-muxed onto the same picture.
- **Countdowns measured** (measure_countdowns.py): P1 Round 1 numbers at 60.381/61.381/62.381/63.381 (steps 1.000 s), bell onset 63.348 =
  the timeline; P1 HOLD ON! steps 1.000 s x5, bell 254.013; P2 Round 1 steps 1.000 s x5, bell 54.234; P2 Showdown steps 1.000 s x5, bell
  192.49. Only ticks and the bell under each countdown.
- **QA for the teacher** (qa/): `buddy_faces_p1.jpg` / `buddy_faces_p2.jpg` (every buddy face/pose actually on screen, up to 4 moments each,
  with time and scene; made by sampling buddy() through a debug hook `window._POSE` in lib.js, off by default), `preview_p1_clips.mp4`
  (65 s) and `preview_p2_clips.mp4` (73 s), 720p with sound (not committed), `ep1_compare_p1.jpg` / `ep1_compare_p2.jpg`, `thumbs.jpg`,
  the drawing-stage sheets p1a-p1d, p2a-p2e.
- **Known weak spots (for the reviewer)**: P2 1:36-1:42 the two tags "young plant: no flowers, no fruits" / "only the adult plant: flowers
  and fruits" run past the look-closer panel's edges in the render (fixed in garden15.js after the render: needs a re-render of that span);
  the two journeys are simple (soil and sky / a branch and the growing fruit); sprays of flowers on the old tree read as cream cones; the
  hands in the cold open come in from above at an angle; key words pop large over the pot in seedans (engine behaviour, as EP14).

## For Stage 2 (Fable): start here (done)
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

## Teacher note 23 Nov (for the fix round)
The hidden animals (snail P1, weaver ant P2) must never appear again at the spot where the game push-in introduced them, and never twice in the same spot (SERIES_FORMAT 4). Check every scene's spot.

## Teacher note 23 Nov: Basil too big
Basil looked much bigger than Momo and Pip in the kitchen (0:05). Fixed: lib.js SIZE_K basil .88 everywhere, and the kitchen Basil (on the counter, further back) 460 -> 400 before the factor. The fix round must check the buddy sizes in EVERY scene (same depth = same size, further back = smaller, nobody >15% bigger at the same depth).

## 23 Nov: v2 LIVE
Teacher: "ok to upload". Part 1 _EhWglg1APE, Part 2 YQTvuQj5aQ8 (after EP14 v3 in both playlists); classic RVRoaWWKjEM retired (points to the new Part 1). YouTube chapters applied; app moments in TheOneApp PR #254 (branch claude/explained-timestamps, commit 55e139f).
