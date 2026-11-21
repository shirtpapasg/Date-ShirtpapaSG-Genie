# EP10 build state (for a resume after a restart)
P3 EP10 "A metal ship floats but a metal spoon sinks. Why?" (P3 book Ch 3, pp. 56-57; treatment p. 54): Part 1 "A Metal Spoon SINKS. So How
Does a Giant Metal Ship FLOAT?" (float or sink, the material matters, trapped air) and Part 2 "Raincoat vs School Shoe: Which One SOAKS UP the
Rain?" (absorb, waterproof, wax: treatment). The script: `../p3_ep10_script.md` (version 1, 21 Nov 2026; the teacher's go-ahead in its
section 12: the HOLD ON! stays "heavy things sink, and light things float"; the metal bowl stays; East Coast Park; **the wax goes on
rubber-soled fabric BOOTS and is named "shoe wax"**, while the drop test still compares the plastic raincoat with a fabric school shoe; otter
and snail; EP10 replaces the classic 5fBBrJMrAcU). **EP10 uploads only after EP9 is live** (its playlists anchor on EP9 Part 2, and it retires
the old video that EP9 left in place).

Three stages: **Stage 1 (setup, done 2026-11-21, Opus)** · Stage 2: Fable draws the scenes (`SCENES_TODO.md`) · Stage 3: render (Opus).

## Stage 1: done
- **Script changes for the teacher's answers 4 and 5** (listed at the end of the script's section 12): Heart's four wax lines say boot(s)
  instead of shoe(s), and f902 names it: "Two fabric boots. A hand rubs shoe wax over one. A thin layer."; small print *An adult rubs on cold
  shoe wax. No candles. No flame.*; the block is labelled SHOE WAX; the waxed BOOT slides onto WATERPROOF; Basil's notes line 3 shows the
  waxed boot; Part 2's thumbnail words ONE BOOT SOAKS / ONE STAYS DRY!; Short 3 and the alternate title. Nothing else changed.
- **Engine copied from `ep09/`** (its committed Stage 1, before EP9's drawing) with the 21 Nov fixes kept: buddies read the goal cards
  (`goals3`) and the Mark Sentences (`markScene`), lock-in clue tags on top of the ring and kept through the countdown (`lockN` `c.tag`), the
  calm recap, the named hidden animal (`gameScene` + `hiddenBadge`, `lizReveal`), the look-closer frame (`closer.js` `lookCloser`, `lcLab`,
  `lcTag`, `lcVerdict`, `lcStrip`), `roundCard` sized to its longer line, the "Now you know!" ending with the YOU tag only beside the YOU
  hands. No `out/`, no mp4/wav in git, no EP9 voices (only the ritual lines, copied unchanged: h501, h860, h864, u1300, h1304a/o/t, h1305,
  u1305, u1002). `bg/`: stage, stage2, daystage, _grain.
  - Changed shared code (in ep10/ only): `lib.js` (EP10 `KW`, `KWLINE`, `SHELF_HIDE` with the five `lc*` scenes; FLOAT/SINK, TRAPPED AIR,
    ABSORB and WAX pop beside their thing with `o.at`; WATERPROOF pops large), `common.js` (EP10 chant words `PHR`/`PCOL`, `chantFlash` ->
    [blocks, ship, bead]), `song.js` (a `sea` ambience region: the sea wash at the beach), `make_voice.py` (chant `ANS_AT` [.5, .5, .25];
    "bobs" for the aligner), `finish.sh` (ep10 names, EP10 marks for the contact sheet).
  - `tests.js` rewritten for EP10: answer colours `GOODC` (green: FLOATS, WATERPROOF) / `WEAKC` (blue: SINKS, NOT WATERPROOF); the board
    OUR 3 WATER TESTS (`TESTS`, `ticked`, placeholder `board3(t, {glow})`; Part 2 starts with row 1 ticked); `HIDDEN` (otter / snail,
    placeholder art) + `hiddenBadge`; `lcPH`; `traysPH` (the two trays); `ringPH`.
- **`script.py`**: both parts as data, every line word for word (checked by script against the markdown both ways: every script.py line is
  in the markdown, and all 131 spoken quotes of sections 4-5 are in script.py with the right speaker; the chant is `CHANT`). Two-speaker cells
  are split one line per speaker. `CUTS` holds the script's section 6 cut tags (none used).
- **Voices** (`voice/`, 123 files: 113 recorded for EP10 + 10 ritual lines): `/home/user/heart-tts/venv/bin/python make_voice.py` keeps
  finished files and re-records only lines whose text or voice options changed. Pace: Heart .90, .5 s between sentences; a new-term sentence
  x.93 and >= .65 s after it; journeys .85, 1.0 s, softer; LOOK CLOSER .85, .8 s between sentences; buddies (Character Voice Kit) x.88;
  Basil's two-sentence card .6 s between sentences. Every text goes through `../sg_pron.py` (`_FixK`); no EP10 line is on the pronunciation
  list (checked: `needs_fix` is false for all). Chant: EP7's call and response (`BAR` 3.2 s, `ANS_AT` [.5, .5, .25], 3 lines + YOUR TURN!,
  no all-together bar; Basil's call louder). Not aligned (spread by length, harmless): e805 ("Oh! Not wood. Air!"), e904 (a journey line;
  its mark is at the line start), hk_wax. **For a human to listen to:** "Splat!" in f703 (the script allows dropping the word), "absorb".
- **Timelines**: `python3 build_tl.py 1|2`. **Lengths (Stage 1): Part 1 4:50.2 (290.2 s), Part 2 5:08.9 (308.9 s)**, both under 5:15 WITH
  the five look-closer holds (verdicts 2.5 s). No cut was needed. Cut candidates if Stage 2 adds time (script section 6, never teaching):
  Part 1 the title's second slam (picture), `notwood` e805 (2.9 s), `momotwo` e706 (about 1 s), `whyship` e1001 (about 2 s), `samesize` e506
  (last); Part 2 `hide` f1402 (about 2.5 s), `nowater` f507, `newprop` f905, `notes` (Basil reads only "My notes!" and line two; f1101 is
  then re-recorded). If a Basil line is cut, cut one of Pip's or Momo's too.
  Lines by speaker (goal cards counted one by one): Part 1 Basil 9 (4 goal cards), Momo 4, Pip 3; Part 2 Momo 7 (4 goal cards), Basil 6, Pip 5.
- **Sound**: `sound_cues.js` (EP10's cues on the same words and marks as the picture) -> `node dump_cues.js P` (173 / 179 events) ->
  `node song.js P` -> `out/mix_pP.wav`, both **-16.0 LUFS**, no missing sounds, no NaN. New uses: the `sea` region (sea_wash.wav), rain
  regions (Part 1's cliffhanger, Part 2's void deck and the raindrop journey), library one-shots `ep06_plop.wav` (the blocks, spoons),
  `ep06_gurgle.wav` (the bowl filling), `boom.wav` (the hull window), `underwater.wav`, `wind.wav`, `thunder.wav` (soft), `splash.wav` (the
  otter), `drip.wav`, `click.wav` (the torch), `ep05_horn.wav` (far ships).
- **`p1.js` / `p2.js`**: shared routines wired (Part 1's calm recap of EP9's dare with its three cards glowing as Heart counts them; game;
  goals read by Basil / Momo; countdown; the HOLD ON! ring with its two pictures and both clue labels on top of the ring, kept until Heart has
  said the two facts; round cards; lock-ins with cards, clue tag, picks and reactions; Mark Sentences read by Momo, Basil / Pip, Basil; the book
  strips (e505, f603, f801, f1003); Part 2's three-picture recap; chant; score hand; read-along; "Now you know!"); every new-art scene is a
  `phScene` placeholder naming what to draw, and each of the five [LOOK CLOSER] moments (`lcblocks`, `lcship`, `lcbowl`, `lcdrip`, `lcwax`)
  is an `lcPH` placeholder inside the real look-closer frame (push-in, dim, window, LOOK CLOSER tag, the verdict at its `v_*` mark).
- **`SCENES_TODO.md`** (generated: `python3 make_todo.py`; re-run after any timeline change): every scene's time range, what to draw, what to
  reuse, what is new, its marks and lines (with times); the poses; the choices made where the script was unclear.
- **Checks**: `qa/p1_check.jpg`, `qa/p2_check.jpg` (placeholder stills at every scene start and middle and after every key word, verdict,
  tick and ring: 83 + 77 frames): no page errors. No video rendered.
- **`upload.json`** written for Stage 3 (ep08's shape): titles and descriptions from script section 7, playlists PLb8LpPqxQI4E and
  PLPfEuT7l4KjI **after "explained-p3-ep09-part2"** (a key: the uploader resolves it from explained_uploaded.json, so EP9 Part 2 must have
  been uploaded by `explained_upload.py` under that key first; if EP9's upload.json uses another key, change it here), `"replaces":
  ["5fBBrJMrAcU"]`, `"retire_old": true`.

### What Stage 2 (drawing) must draw
Sets: the beach shelter at East Coast Park (bright; + grey clouds with the first rain), the void deck of an HDB block in the rain (EP9's void
deck + flower pots, the covered walkway with a metal roof, the block opposite). Props: the tub OUR TUB, a wooden block and a metal block (same
size), a wooden spoon and a metal spoon, a stainless-steel bowl and a jug, an adult's hands, the board OUR 3 WATER TESTS (replace `board3`),
the giant container ship (outside on the sea; with a see-through window in the hull; small in a ring), a plastic raincoat on a stand, a white
fabric school shoe (plain / wet patch / cut view with a sock), a pair of fabric boots with rubber soles (plain / wet / waxed toe), a block of
shoe wax labelled SHOE WAX, a dropper and cup, the two trays WATERPROOF / NOT WATERPROOF (replace `traysPH`), four tiles (rubber boots,
raincoat, glass window, metal roof), Basil's notes on an easel, the EP11 dare boards (clear glass, frosted glass, wooden door, each with a
torch). Five look-closer arts (`blocksArt`, `shipArt`, `bowlArt`, `dripArt`, `waxArt`). Two journeys (BE THE AIR inside the ship; BE A
RAINDROP: raincoat, rolling, the shoe's weave, the sock). Two hidden animals, cute and alive: the otter by the rocks, the snail on the
flower pot. Reused: EP9's two dare boards (being drawn now in ep09/) and EP9's three cards.

## Stage 2 (Fable): draw the scenes in `SCENES_TODO.md`
- Stills: `PART=1|2 ./sheet.sh name cols t1 t2 ...` -> `qa/name.jpg` (prints page errors). Draw one expression: `node probe.js out.jpg 1 '<js>'`.
- Bake a static set: `NODE_PATH=$(npm root -g) node bake.js <name>` (writes `bg/<name>.png` and `bg/manifest.js`).
- After any change to `script.py`: `/home/user/heart-tts/venv/bin/python make_voice.py`, `python3 build_tl.py 1` and `2`, `python3 make_todo.py`;
  after any change to a cue: `node dump_cues.js P && node song.js P`.
- Then write progress/ep10.json (pct 75, "Stage 2: drawing done (Fable)", next "Stage 3: render (Opus)").

## Stage 3 (Opus): `./build_part.sh P` (timeline, cues, song, `flock /tmp/explained_render.lock node render.js P 3`, `finish.sh P`)
- Output `ep10_partP.mp4` (ignored), `ep10_partP.srt`, `sheet_partP.png`; check stills around every swap, card, look-closer and reveal.
- Thumbnails as EP8/EP9 (`thumb_still.js` + `thumb.js`; script section 7: Part 1 "METAL SPOON SINKS" / "METAL SHIP FLOATS?!", Part 2
  "ONE BOOT SOAKS" / "ONE STAYS DRY!").
- **Upload only after EP9 is live**, with `production/youtube/explained_upload.py ep10/upload.json` (Made for Kids, public, both playlists
  after EP9 Part 2's key `explained-p3-ep09-part2`; `retire_old`: the classic "Strong, Bendy, Floaty: Testing Materials (Part A)"
  5fBBrJMrAcU leaves the playlists and points to EP9 and EP10; never deleted).
- Status: see ../progress/ep10.json
