# EP9 build state (for a resume after a restart)
P3 EP9 "Snap it or bend it: strong vs flexible" (P3 book Ch 3, pp. 53-55): Part 1 "Paper vs Fabric: We Hung Weights Until One TORE!"
(physical property, strength, strong and fragile) and Part 2 "Rubber Band vs Ice-Cream Stick: Which One SNAPS?" (flexibility, flexible and
rigid, the three tubes, strong is not flexible). The script: `../p3_ep09_script.md` (version 1, 21 Nov 2026; the teacher's answers in its
section 12: "fragile" is said FRAJ-ile; strength first, EP8's dare answered in Part 2 Round 1; the glass cup breaking in the drop box is OK, with
the metal cup bouncing too; the cute spider stays as Part 1's hidden animal). **EP9 replaces no old video on upload** (the classic
5fBBrJMrAcU stays in the playlists until EP10 is live; EP10 then retires it).

Three stages: **Stage 1 (setup, done 2026-11-21, Opus)** · **Stage 2 (drawing, done 2026-11-21, Fable)** · **Stage 3 (render, checks, upload: done 2026-11-21, Opus): LIVE**.

## Stage 1: done
- **Engine copied from `ep08/`** with EP7/EP8's 21 Nov fixes kept: buddies read the goal cards (`goals3`) and the Mark Sentences (`markScene`),
  lock-in clue tags on top of the ring and kept through the countdown (`lockN` `c.tag`), the calm recap, the named hidden animal (`gameScene`
  + `hiddenBadge`, `lizReveal`), the look-closer frame (`closer.js` `lookCloser`, `lcLab`, `lcTag`, `lcVerdict`, `lcStrip`), the "Now you know!"
  ending with the YOU tag only beside the YOU hands. No `out/`, no mp4/wav in git, no EP8 voices (only EP8's ritual lines, copied unchanged:
  h501, h860, h864, u1300, h1304a/o/t, h1305, u1305, u1002).
  - Kept as EP8 libraries for reuse: `materials.js` (MAT, `phScene`), `canteen.js` (`board7`, `boardAt`, `pline`, `ltag`, `slamLine`,
    `boardSlide` ...), `pics.js` (`picBoard`, PIC.* incl. `band1` / `stick`; its sparrow/sheep HIDDEN removed). EP8's seven look-closer scenes
    were removed from `closer.js` and its two journeys from `shrink.js` (models: `ep08/closer.js`, `ep08/shrink.js`). `bg/`: only stage,
    stage2, daystage, _grain (EP8's canteen/stall/under bakes not copied; `bg/manifest.js` updated).
  - Changed shared code: `lib.js` (EP9 `KW`, `KWLINE`, `SHELF_HIDE` with the five `lc*` scenes; FRAGILE/STRONG and FLEXIBLE/RIGID pop
    beside the strip / card with `o.at`), `common.js` (EP9 chant words `PHR`/`PCOL`, `chantFlash` -> [line1, line2, line3], `chantScene`
    takes x/y0/dy/size; `roundCard` sizes its card to the longer line), `closer.js` (`lcVerdict` draws a long tag smaller so it fits).
  - New `tests.js`: answer colours `GOODC` (green: STRONG, FLEXIBLE) / `WEAKC` (blue: FRAGILE, RIGID); the board `TESTS`, `ticked`, placeholder
    `board3(t, {glow})`; `HIDDEN` (spider / caterpillar, placeholder art) + `hiddenBadge`; `lcPH` (a look-closer placeholder inside the real frame).
- **`script.py`**: both parts as data, every line word for word (checked by script against the markdown both ways: every script.py line is in
  the markdown, and all 125 spoken quotes of sections 4-5 are in script.py; the chant is `CHANT`). Two-speaker cells are split one line per
  speaker. `CUTS` holds the script's section 6 cut tags (none used).
- **Voices** (`voice/`, 117 files: 107 recorded for EP9 + 10 ritual lines from EP8): `/home/user/heart-tts/venv/bin/python make_voice.py` keeps
  finished files and re-records only lines whose text or voice options changed. Pace: Heart .90, .5 s between sentences; a new-term sentence
  x.93 and >= .65 s after it; journeys .85, 1.0 s, softer; **LOOK CLOSER .85, .8 s between sentences** (script: "about 0.85 ... 0.8 to 1.0 s");
  buddies (Character Voice Kit) x.88. Every Heart and buddy text goes through `../sg_pron.py` (`_FixK`): **"fragile" is said FRAJ-ile**
  (fɹˈædʒaɪl) in g404 (Momo), g1104, hk_fragile, uk_fragile (all three buddies), j101; checked: every one of these goes through `speak_line`,
  and the forced aligner matches g1104 / hk_fragile to "F R AE JH AY L" (`make_voice.py` aligns "fragile" to the FRAJ-ile sound). Listen clip
  for a human: `qa/fragile_check.m4a` (the five lines in a row). Buddies take the line's `gap` (Momo's two-sentence card: .6 s).
  Chant: EP7's call and response (`make_voice.py` `BAR` 3.2 s, `ANS_AT` [.5, .25, .5], 3 lines + YOUR TURN!, no all-together bar; Basil's call
  louder). Not aligned (spread by length, harmless for one word): hk_flexibility.
- **Timelines**: `python3 build_tl.py 1|2`. **Lengths (Stage 1): Part 1 5:09.9 (309.9 s), Part 2 4:57.3 (297.3 s)**, both under 5:15 WITH the
  five look-closer holds (verdicts 2.5 s). No cut was needed. Cut candidates if Stage 2 adds time (script section 6, never teaching):
  Part 1 `firsttwo` g508 (about 1.9 s), `sorrycup` g1004 (2.2 s), `piptwo` g605 (1.0 s), `sizesame` g706 (4.3 s); Part 2 `hungry` j807 (1.3 s),
  `snapped` j504 (2.2 s), `tiles` j703 (5.8 s), `million` j1302 (3.4 s). If a Basil line is cut, cut one of Pip's or Momo's too.
  Lines by buddy: Part 1 Basil 7, Momo 6 (4 are the goal cards), Pip 3; Part 2 Pip 7 (4 goal cards), Basil 6, Momo 5.
- **Sound**: `sound_cues.js` (EP9's cues on the same words and marks as the picture) -> `node dump_cues.js P` (188 / 165 events) ->
  `node song.js P` -> `out/mix_pP.wav`, both **-16.0 LUFS**, no missing sounds. New uses: the void deck / playground ambience (`R.canteen`, far
  children), library one-shots `click.wav`, `ep03_clank.wav` (the metal cup), `ep05_crack.wav` (the glass, low), `ep08_snap.wav` (the stick),
  `footsteps.wav`, `ep05_horn.wav` (the ship). (Fixed: a `pluck` cue with no value made NaN in Part 2's mix.)
- **`p1.js` / `p2.js`**: shared routines wired (Part 1's calm recap with EP8's own board7 and dare boards; game; goals read by Momo / Pip;
  countdown; round cards; lock-ins with cards, clue tag, picks and reactions; Mark Sentences read by Pip, Basil / Basil, Momo; FRAGILE/STRONG
  book strips; Part 2's three-picture recap timing and labels; chant; score hand; read-along; "Now you know!"); every new-art scene is a
  `phScene` placeholder naming what to draw, and each of the five [LOOK CLOSER] moments is an `lcPH` placeholder inside the real look-closer
  frame (push-in, dim, window, LOOK CLOSER tag, the verdict at its `v_*` mark, the book strip for j902).
- **`SCENES_TODO.md`** (generated: `python3 make_todo.py`; re-run after any timeline change): every scene's time range, what to draw, what to
  reuse from ep01-ep08, what is new, its marks and lines (with times); the poses; the choices made where the script was unclear.
- **Checks**: `qa/p1_check.jpg`, `qa/p2_check.jpg` (placeholder stills at every scene start and middle and after every key word, verdict and
  tick: 65 + 60 frames): no page errors. No video rendered.

### What Stage 2 (drawing) must draw
Sets: the void deck of an HDB block (+ long-shadow version), the playground beside the block. Props: OUR TEST STAND (clamp, hanger, flat
weights, mat, counter pills WEIGHTS: n), paper strip and fabric strip (whole / torn / magnified edges), the two-bar chart, the fabric school bag,
the board OUR 3 TESTS (replace `board3`), a stainless-steel cup and a glass cup (whole / broken), the DROP BOX, an adult's gloved hands, the
safety card, the rubber band (loop / half / twist) and the ice-cream stick (straight / bowed / cracked / two pieces) on a tray, the trays
FLEXIBLE (green) and RIGID (blue), rubber-tile and ceramic-tile boards, three tubes with clamps and weights, Momo's notes on an easel, the five
property tiles, the EP10 dare boards (spoon in a tub of water; a giant metal ship). Five look-closer arts (`paperArt`, `pullArt`, `dropArt`,
`bendArt`, `tubesArt`). Two journeys (inside a fabric bag's weave; a rubber band at a chicken rice stall). Two hidden animals, cute and alive:
the spider on its thread by the letterboxes, the caterpillar on the slide's handrail. Reused: EP8's THE 7 MATERIALS board and the two dare boards.

## Stage 2: done (2026-11-21, Fable). Every scene is drawn; no `phScene` / `lcPH` / `ringPH` placeholder is left in `p1.js` / `p2.js`.
**Lengths unchanged: Part 1 5:09.9, Part 2 4:57.3** (no picture-only time added, no cut used; `script.py` and the voices untouched).
- **New file `voiddeck.js`** (loaded after tests.js; gradients `XDEFS9`, added to main.js): the sets `BG.voiddeck`, `BG.voiddeckL` (long afternoon
  light, the cliffhanger), `BG.playground`, all baked in `bg/`; `deckView` / `playView` (things stand at `TYD` / `TYP`; places `DK`, `PK`);
  OUR TEST STAND (`testStand`: clamps, `stripSvg` paper / fabric with bend, tear from the left edge, the dropped piece; `hangerSvg`, weights,
  mat, `counterPill` WEIGHTS: n), `stripsFlat`, `weightTray`, `fabricBag(full)`, the gloved hands `glovePinch` / `gloveFinger`, `metalCup`,
  `glassCup(crack)`, `glassPieces` (five big pieces), `dropBox`, `safetyCard`, the rubber band `bandPts` / `bandSvg(fold, twist)`, the stick
  `stickSvg({bend, crack, snap})`, `bandTray`, `ansTray` FLEXIBLE / RIGID, `tubeSvg` / `tubeClamp` / `hookWeight` / `tubeRig`, the five property
  tiles `propTile`, goal icons, `pullPic` / `pushPic`, `PIC.rtile` / `PIC.ctile` / `PIC.spoonTub` / `PIC.ship` (EP10 reuses the last two),
  `momoNotes`, the hidden animals `spiderBody` / `spiderArt` / `spiderOnThread` and `caterpillarBody` / `caterpillarArt` / `catOnRail`.
  `tests.js`: `board3` redrawn (same name and arguments). `closer.js`: `lcVerdict` takes two lines + small print + an x offset; the five
  pictures `paperArt`, `pullArt`, `dropArt`, `bendArt`, `tubesArt`. `shrink.js`: both journeys. `lib.js`: FLEXIBLE / RIGID pop at [940, 905] / [1400, 905].
- **LOOK CLOSER as built** (timeline times):
  | Scene | Part, time | What is shown | Verdict (at) |
  |---|---|---|---|
  | `lcpaper` | P1 0:51.8-1:08.9 | a gloved finger pushes the strip: it bends, springs back (observe lights); one weight slides on the hanger, the strip holds, WEIGHTS: 1 (measure lights) | A PHYSICAL PROPERTY: / measure or observe, two lines (1:06.4) |
  | `lcpull` | P1 2:02.2-2:37.0 | slow motion: weights 1, 2, 3 on the paper; lens on its left edge: a tiny tear, it runs across, the lower piece drops onto the mat (It tears); camera slides to the fabric: 3..8, lens: threads draw tight (It holds); at `bars` the two counters fly to a chart and become bars 3 and 8 | FABRIC: STRONGER THAN PAPER (2:34.5) |
  | `lcdrop` | P1 3:55.1-4:09.2 | the DROP BOX from the side, an adult's gloved hands, "An adult does this test. Never try it." on screen all through; the metal cup falls, hits on "Clang!", bounces once, tips and rests whole (not broken, STRONG); the glass cup falls, a crack runs up on "Crack!", five big pieces stay in the box (broken) | GLASS: FRAGILE (4:06.7) |
  | `lcbend` | P2 0:53.2-1:17.0 | gloved hands bend the band in half, into a twist, lens: no crack, it springs back to its loop; the stick bows, lens on the outside of the bend: a pale crack opens, snap, two splintered pieces; both laid side by side | IT BENDS / WITHOUT BREAKING, under the band (1:14.5) |
  | `lctubes` | P2 2:28.6-2:50.2 | three tubes clamped level, the same weight hung on each by a gloved hand; rubber droops most, plastic a little, metal hardly; level line and drop marks; the book's two sentences on two strips | Rubber: the most flexible / Metal: the least flexible, small "among the three tubes" (2:47.7) |
- **Journeys:** BE A THREAD (teal weave from inside: the dive into the weave, your pale thread running away with threads over / under, five books
  land on the thud times, the handles lift and the weave goes straight, close on the crossings, the void deck and the lift door through the gaps).
  BE A RUBBER BAND (you look out through your own loop at the chicken rice stall, two fingers close and the loop folds to a slit, the packet
  seen from its end with you hugging its four corners (each glows), the red bag, the kitchen: a finger pulls you off, you spring to a loop: flexible).
- **Hidden animals:** Part 1 the spider on its thread between the letterboxes and the left pillar (`SPIDER`; every void-deck view, bobs, legs
  wiggle, blinks; waves in the reveal). Part 2 the caterpillar inching along the blue handrail of the slide (`RAIL`; arches and stretches, turns round).
  Both named by Heart at the start with their picture (`HIDDEN[1]`), ringed in the reveal with a pill of Heart's own words.
- **Thumbnails:** `thumb_part1.jpg`, `thumb_part2.jpg` (frames `qa/th/f1.png`, `f2.png`: `node thumb_still.js N 1 qa/th/fN.png "&thumb"`, then
  `node thumb.js qa/th/f1.png thumb_part1.jpg 1 "PAPER vs|FABRIC" "WHICH ONE|TEARS?" 190 150 132` and
  `node thumb.js qa/th/f2.png thumb_part2.jpg 2 "SNAP IT" "OR BEND IT?" 190 170 140`).
- **Checks (stills only, no page errors):** `qa/p1_sheet.jpg`, `qa/p2_sheet.jpg` (a frame every 3 s), `qa/lc_p1.jpg`, `qa/lc_p2.jpg` (the five
  look-closers as strips), `qa/journey_thread.jpg`, `qa/journey_band.jpg`. Cues and mixes rebuilt (188 / 165 events, both -16.0 LUFS).
  **No video was rendered.** `SCENES_TODO.md` is Stage 1's list (not regenerated; its "to draw" notes are now done).
- **Deviations from the script:** the DROP BOX stands on the stone table, not on the ground (the table fills the front of the set), and from
  `drop` on the test stand and the bag are tidied off the table; the hanger is already clipped to the strip when the paper look-closer opens;
  the lock-in ring of Part 1 shows the two strips without their counter pills (too small to read); the pull test's "paper" / "fabric" tags sit
  above the counters; the cards in the cliffhanger are number badges 1 / 2 on the two boards; the fix's two replay pictures are at the left of
  the easel, not above it; `tiles` tags read "bends" / "breaks when bent"; the weave is teal (the bag's colour), not pale cream; in the band
  journey only the hook and "bent in half" are seen through your own loop, the packet, bag and kitchen are seen from just outside; small added
  pills from Heart's own words ("Two tests done!", "Today: the first two!", "On its thread, by the letterboxes!", "On the handrail of the
  slide!", "over you" / "under you", "You bend again"); set dressing words LETTERBOXES, BLK 9, CHICKEN RICE.
- **Stage 3, watch in motion:** each look-closer's push-in from its set; the finger's push and the strip's spring-back; weights sliding on with the
  gloved hand (it must not cover the counter); the tear running across and the drop to the mat; the camera slide to the fabric and the pull-back
  to the chart, the counters flying into bars; the metal cup's bounce, tip and rocking (it turns about its base) and the glass pieces settling;
  the band's fold / unfold / twist morph (the 0.4 s unfold between "In half" and "Into a twist") and the hands following its ends; the stick's
  snap and the hands' tilt; the band and stick swapping places at the tray; the tube weights and the hand; the journeys' dips between stops, the
  books' landings against the thuds, the finger pulling the band off the packet (the roughest shot); the spider's bob and the caterpillar turning
  round at the rail's ends (it flips); board and tray slide-ins; the dive cameras in both `waitw`; Momo's speech bubble beside the easel.

## Stage 3 (Opus): `./build_part.sh P` (timeline, cues, song, `flock /tmp/explained_render.lock node render.js P 3`, `finish.sh P`)
- Output `ep09_partP.mp4` (ignored), `ep09_partP.srt`, `sheet_partP.png`; check stills around every swap, card, look-closer and reveal.
- Thumbnails as EP8 (`thumb_still.js` + `thumb.js`; script section 7: Part 1 "PAPER vs FABRIC" / "WHICH ONE TEARS?", Part 2 "SNAP IT" /
  "OR BEND IT?").
- Upload with `production/youtube/explained_upload.py ep09/upload.json` (Made for Kids, public, both playlists after EP8 Part 2
  rfRyqc4PLXQ). **No `retire_old`: EP9 replaces no old video** (teacher, 21 Nov).
- Status: see ../progress/ep09.json

## 21 Nov 2026: Stage 3 (Opus): rendered, checked, LIVE
- Rendered with `./build_part.sh 1|2` (10 s chunks kept in `out/chunks_p1`, `out/chunks_p2`). `ep09_part1.mp4` 309.97 s (**5:10.0**),
  `ep09_part2.mp4` 297.33 s (**4:57.3**); 1920x1080 30 fps; both -16.0 LUFS, true peak -1.3 / -1.4 dBFS; 0 page errors. Captions
  `ep09_part1.srt` (141 cues), `ep09_part2.srt` (126 cues), 0 overlapping cues; contact sheets `sheet_part1.png`, `sheet_part2.png`.
  Both parts are under 5:15 with every look-closer verdict held 2.5 s (v_* to the scene end: 2.5 s each). Nothing was cut.
- **"fragile" listen check:** every take goes through sg_pron (FRAJ-ile). The three-buddy line `uk_fragile` had not been checked acoustically:
  each buddy track (`voice/uk_fragile_pip|basil|momo.wav`) was compared with a fresh synthesis of "Fragile." through the fixed path and through
  plain Kokoro (FRAJ-uhl): MFCC-DTW distance to the fixed take 22 / 34 / 24 vs 99 / 89 / 86 to the plain one, and the second syllable's
  formants match the fixed take (F1 about 900-1000 Hz, the open /a/ of "-ile"; plain Kokoro's schwa sits near 600 Hz). It says FRAJ-ile; not
  re-recorded. `qa/fragile_check.m4a` is still the clip for a human ear.
- Checked (frame strips from the rendered files, `qa/stage3/`): cold open and board slide-ins; calm recap (P2: three held pictures, one label
  each, "Part 1" tag); spider / caterpillar named by Heart at the start with their picture and "Can you spot it?", ringed in the reveal with
  Heart's pill; goal cards read by Momo (P1) / Pip (P2), each lifting with a tick; Mark Sentences read by the "Say it with me!" buddy (Pip, Basil ·
  Basil, Momo); Round 1 lock-in clue tags ("same length · same thickness", "rubber · wood") on top of the ring through the countdown; every
  look-closer push-in and cut back out; the finger push and spring-back (the hand does not cover the counter; WEIGHTS ticks to 1 on "count:
  one"); weights sliding on; the tear running across and the lower piece dropping to the mat; the camera slide to the fabric, the lens on the
  threads, the counters flying into bars 3 and 8; the drop box ("An adult does this test. Never try it." on screen throughout; the metal cup
  bounces, tips and rests; the glass cracks on "Crack!" and its five pieces settle inside the box); the bend test (fold / unfold / twist,
  hands on the band's ends, the stick bows, crack, snap on "Snap!" at 72.3 s, band and stick swapping at the tray); tubes (gloved hand, weights,
  rubber droops most); both journeys (dips between stops, books landing, the dive cameras); Momo's bubble beside the easel; the dare boards and
  cards; key words; "Now you know!". Sound sync measured: clank 239.30 s (cup lands 239.3), crack 244.53 s, snap 72.26 s.
- Fixed (small, local; only P2 chunks 60-80 s and 120-140 s re-rendered):
  - P2 bend look-closer: the band's "no crack" pill sat right under the ice-cream stick while the stick cracked (it read as the stick's label).
    It now sits BESIDE the band on the tray (closer.js `bendArt`, x -330).
  - P2 band journey: "CHICKEN RICE" was cut to "ICKEN RICE" by your own loop's edge: the sign is centred further right and a little smaller
    (shrink.js `stall`, x 900, size 104).
  - P2 band journey, the roughest shot: after the finger pulled you off the packet you hung in mid-air in a half-packet shape for 1.6 s. Now
    you spring back to a round loop and drop onto the table beside the packet (shrink.js, `land`), before "You bend again".
- Not changed (noted): the caterpillar turns round at the rail's ends with an instant mirror flip (it is still at that moment, so it reads as a
  turn); the torn lower paper piece lands standing on its weights on the mat; in the band journey's first stop the sign's tops touch the loop as
  it folds.
- Thumbnails `thumb_part1.jpg`, `thumb_part2.jpg` read well (title words large on the bright right side, PART pill, surprised Momo / Basil); unchanged.
- Uploaded with `upload.json` (Made for Kids, public; both playlists PLb8LpPqxQI4E and PLPfEuT7l4KjI right after rfRyqc4PLXQ = EP8 Part 2;
  no `replaces`, no `retire_old`: the classic 5fBBrJMrAcU stays in the playlists until EP10 is live). The School Lab 3.2 line is left out of
  the descriptions (script section 7: only once that lab is signed off for pupils, as EP10 does).
  Part 1 https://www.youtube.com/watch?v=JMpROK4Cz2c , Part 2 https://www.youtube.com/watch?v=mbUzXp6CKbs .
- Left for the teacher: listen once (fragile, the chant); watch the five look-closers, the drop box and the spider / caterpillar reveals.
