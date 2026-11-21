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

## Stage 2: done (2026-11-21, Fable). Every scene is drawn; no `phScene` / `lcPH` / `ringPH` placeholder is left in `p1.js` / `p2.js`.
**Lengths unchanged: Part 1 4:50.2 (290.2 s), Part 2 5:08.9 (308.9 s).** `script.py`, the voices and the timelines were not touched (no cut used).
- **New files** (page.html loads them after tests.js): `water.js` (BG.beach / BG.beachR = the East Coast Park shelter, bright / under grey
  clouds, baked; `beachView`, `seaView`; OUR TUB `tubSvg` + `tubThings`, the two blocks and two spoons (one shape each, two fills), the
  steel bowl, the jug, `holdDown` = an adult's arm holding a thing from above, `bead` / `tear` / `dropper` / `cupSvg` / `waxBlock`, the
  board `board3Art`, the container ship `shipSide` + its hull window `shipInside` + `seaOver` + `shipCard`, `otterArt`, `snailArt`, EP9's two
  dare boards `PIC.spoonTub` / `PIC.ship` copied from ep09/voiddeck.js, `rainIn` / `splashes`) and `rainy.js` (BG.vdrain = the void deck in
  the rain, drawn again in ep10 in EP9's style + flower pots, the covered walkway's metal roof, the block opposite; `deckView`, `traysOn`;
  `coatStand`, `shoeTray` / `shoeWet` (EP8's shoe + a wet patch), `bootFront` (toe towards us; `wet`, `wax`), `bootsTray`, `kitSvg`, the trays
  `trayG` / `trayB` / `traysPH`, four tiles `PIC.tRubber/tCoat/tGlass/tMetal`, `basilNotes`, EP11's dare boards `PIC.dClear/dFrost/dDoor` +
  `torch`). `main.js` adds `XDEFS10`; `bg/`: beach, beachR, vdrain baked (`node bake.js beach beachR vdrain` after any change to them).
- **Changed:** `tests.js` (`board3` -> `board3Art`; `HIDDEN` = the drawn otter / snail; `traysPH` moved to rainy.js), `closer.js` (`lcVerdict`
  takes `{ plain, vx }`: coloured words, an off-centre verdict; the five arts and `SC.lc*`), `shrink.js` (both journeys), `lib.js` (key-word
  pop positions: FLOAT [320, 474] 72, SINK [1600, 695] 72, TRAPPED AIR [1370, 930] 84, WAX [960, 372] 80; ABSORB as Stage 1).
- **LOOK CLOSER as built** (all in the shared frame: push-in, set dims, no score / shelf / buddies, one verdict held 2.5 s):
  | Scene | Part, time (verdict) | What is shown | Verdict |
  |---|---|---|---|
  | `lcblocks` | P1 0:50.9-1:11.2 (1:08.7) | slow motion: hands lower the wooden block (dips, bobs, floats half under: FLOAT), then the metal block (straight down, bubbles, rests: SINK); two spoons the same way | WOOD FLOATS · METAL SINKS (violet; FLOATS green, SINKS blue) |
  | `lcship` | P1 2:19.5-2:46.3 (2:43.8) | the ship side on, "part of it is under the water"; a window opens in the hull (rooms, ladders, doors, engine room, air · air · air); split: the solid block with a little window (hatched metal) | TRAPPED AIR INSIDE |
  | `lcbowl` | P1 3:43.5-4:00.8 (3:58.3) | the bowl cut open, floating (air inside); the jug pours, it sits lower and lower, water runs over the rim, it goes down and rests beside the block (water inside) | THE AIR IS GONE: IT SINKS (blue) |
  | `lcdrip` | P2 0:57.3-1:28.3 (1:25.8) | slow motion, three pages that slide: the sleeve (a bead, lens: smooth · no gaps, a hand tilts it, it rolls off, dry) -> the shoe's toe (the drop flattens, a wet patch spreads, lens: water between the threads, ABSORB) -> the cut view (sock inside, a dark spot: It passes through, a wet sock) | FABRIC ABSORBS WATER (blue) |
  | `lcwax` | P2 2:35.1-2:54.1 (2:51.6) | two boots (plain · with wax); a hand rubs the block SHOE WAX over the right one (a thin shiny layer, WAX); one drop on each: soaks in / sits as a bead and rolls off; the small print stays on | WITH WAX: WATERPROOF (green, on the right boot) |
- **Journeys:** BE THE AIR (P1 2:58.5-3:26.1: over the sea, the hull grows, in through the door, the huge room, the door slides shut and a lamp
  comes on = trapped air, a round window with a fish, the room rocks) · BE A RAINDROP (P2 1:58.4-2:21.6: falling over the estate onto a child
  in a yellow raincoat seen from above, splat, the yellow slope turns over, off its edge onto the white weave, down between the ropes, out
  onto a knitted sock).
- **Hidden animals** (named by Heart with the drawn badge; the reveal rings them and they wave): the **otter** at `OTT` [452, 604] by the
  breakwater rocks in every wide beach shot (not in the look-closers / the lift-off); the **snail** at `SNL` on the rim of the biggest flower
  pot in every void-deck shot (it glides a little along the rim).
- **21 Nov rules:** the HOLD ON! ring keeps its two pictures (EP9's two boards, small) and both clue labels through the countdown; the
  crossed arms sit UNDER the pictures now. Trays, boards and props stand clear of the buddy discs (trays G 330-1130, B 1140-1480).
- **Deviations from the script / SCENES_TODO** (all picture only): the two blocks (and the two spoons) are let go one after the other, each as
  Heart describes it, not together; the ship's "air" labels sit inside the rooms (no lines); the tub's sticker is on its lower left; in the
  bowl scenes the wooden block and both spoons are back on the tray (only the metal block stays in the tub); the "finger" that tilts the
  sleeve is a hand lifting its end; the board stands at the back of the void-deck table; `four`'s tiles stand in a row on a wide green
  tray beside the raincoat; in `treated` the tiles are gone (the waxed boot takes their place); Part 2's Showdown and dare are on the dimmed
  / cleared void deck; the chant's board is at the lower left (.4) with the three flash pictures beside the lines; EP9's dare boards are EP9's
  `PIC.spoonTub` / `PIC.ship` with tags metal · sinks / metal · floats (EP9's own dare scene was not drawn yet: keep the two alike).
- **Checks (stills only; no video rendered):** stills every 0.45 s of both parts: no page errors. `qa/p1_sheet.jpg`, `qa/p2_sheet.jpg` (a
  frame every 3 s), `qa/lc_p1.jpg`, `qa/lc_p2.jpg` (the five look-closers as strips), `qa/journey_air.jpg`, `qa/journey_rain.jpg`.
  Thumbnails `thumb_part1.jpg`, `thumb_part2.jpg` (`node thumb_still.js N 1 qa/th/fN.png "&thumb"`, then
  `node thumb.js qa/th/f1.png thumb_part1.jpg 1 "METAL SPOON|SINKS" "METAL SHIP|FLOATS?!" 230 150 132` and
  `node thumb.js qa/th/f2.png thumb_part2.jpg 2 "ONE BOOT|SOAKS" "ONE STAYS|DRY!" 230 150 132`). Cues and preview mixes rebuilt (-16 LUFS).
- **Stage 3 should watch in motion:** the two journeys (the hull's growth and the door pass at 3:03-3:08; the roll at 2:08-2:13, which turns
  the view over twice); each look-closer's cut in and out; the blocks' bob and sink, the hand lifting away; the bowl's fill against Heart's
  "lower. And lower."; the three sliding pages of the drop test and the lens's water; the wax hand's rub; the low slides (dare boards, the
  board, trays, the raincoat and shoe, the boots in `treated`); the rain's density; the otter's and snail's idle loops and waves.
- Stills: `PART=1|2 ./sheet.sh name cols t1 t2 ...` -> `qa/name.jpg` (prints page errors). Draw one expression: `node probe.js out.jpg 1 '<js>'`.

## Stage 3 (Opus): `./build_part.sh P` (timeline, cues, song, `flock /tmp/explained_render.lock node render.js P 3`, `finish.sh P`)
- Output `ep10_partP.mp4` (ignored), `ep10_partP.srt`, `sheet_partP.png`; check stills around every swap, card, look-closer and reveal.
- Thumbnails as EP8/EP9 (`thumb_still.js` + `thumb.js`; script section 7: Part 1 "METAL SPOON SINKS" / "METAL SHIP FLOATS?!", Part 2
  "ONE BOOT SOAKS" / "ONE STAYS DRY!").
- **Upload only after EP9 is live**, with `production/youtube/explained_upload.py ep10/upload.json` (Made for Kids, public, both playlists
  after EP9 Part 2's key `explained-p3-ep09-part2`; `retire_old`: the classic "Strong, Bendy, Floaty: Testing Materials (Part A)"
  5fBBrJMrAcU leaves the playlists and points to EP9 and EP10; never deleted).
- Status: see ../progress/ep10.json
