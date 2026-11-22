# EP14 build state (for a resume after a restart)
P3 EP14 "Why does the Sun come back every morning? Cycles" (Cycles opener p. 73 + Ch 4 Life Cycles of Plants, pp. 74-75): Part 1 "Why Does the
Sun Come BACK Every Morning?" (EP13's dare answered: the Earth turns; the sky over two days; the globe and the torch; rotation; what a cycle
is; a pencil or a traffic light) and Part 2 "The Boy GREW. The Tree GREW. Why Not the TEDDY BEAR?" (then and now; one chick week after week;
a life cycle; Pip's notes; why life cycles matter). The script: `../p3_ep14_script.md` (version 1, 22 Nov 2026; the teacher's go-ahead in its
section 12: "continue with episode 14 scripts. no changes to be made for now", the recommended answers (a)-(m): (a) the C0.3 card as written;
(b) a globe and a torch, the Sun only a drawing, safety lines; (c) "Be the little red dot"; (d) a pencil (not a cycle) and a traffic light (a
cycle); (e) C0.3a as tags only; (f) the chicken as "egg, chick, adult chicken", no "stage"; (g) the predict question on the teacher sheet only;
(h) the boy, the tree, the teddy bear, the tree unnamed; (i) owl and ladybird; (j) the EP15 dare: mango, flower, young plant; (k) **the classic
RVRoaWWKjEM (pp. 73-79) stays in the playlists until EP15 is live: NO "replaces"**; (l) the School Lab 4.1 line stays out; (m) "live" =
"leev" via sg_pron, a clip only if a problem is heard) **plus the ONE change of 22 Nov: full, human sentences** (section 12.1: 43 lines).
EP13 is live (its playlists' anchor for EP14: `explained-p3-ep13-part2`; EP13 Part 1 = FO1Y_KSZU-c, Part 2 = 8lQ1-1ruveY).

Stages: **Stage 1 (setup, done 2026-11-22, Opus)** · Stage 2 (drawing + thumbnails, Fable) · Stage 2.5 (the teacher's-eye review, a fresh
Opus agent) · Stage 3 (render, checks, upload, Opus).

## Stage 1: done (2026-11-22, Opus)
- **The script change (teacher, 22 Nov): full, human sentences.** Every spoken line of `p3_ep14_script.md` was gone through: 43 spoken facts,
  clues, guesses and verdicts that were 2-3 word fragments are now natural sentences with their reasons (21 in Part 1, 22 in Part 2), same
  meaning, speaker and beat; the tables (sections 3-11) carry the new words and **section 12.1 lists every change old → new**. Left as written:
  reactions, `{DARE_Q}` (EP13's dare, word for word), goal cards, answer cards, the four lamp words, ritual lines, "Say it with me!", Mark
  Sentences and the strip (the book's words), the read-along, the chant, the count-in, on-screen tags. Pip's easel line 1 on screen now reads
  *Day and night are a cycle.* No restructuring.
- **Engine copied from `ep13/`** (as it stands after EP13's Stage 3) with the 21 Nov fixes kept: buddies read the goal cards (`goals3`) and the
  Mark Sentences (`markScene`), lock-in clues on top of the ring and kept through the countdown (`lockN` `c.labels`), the calm recap, the named
  hidden animal, the look-closer frame (`closer.js` = EP13's Stage 1 frame: `lookCloser`, `lcLab`, `lcTag`, `lcVerdict` with `{ink, edge}` /
  `{plain, vx}`, `lcStrip`, `lcClock`, `slowTag`), `roundCard`, the "Now you know!" ending; **every action sound on its own mark** (script.py has
  a mark for each curtain, sticker, torch, turn, lamp, tile, tick, tag, pencil, photo, week, nest, egg tap, strike and bend; sound_cues.js uses
  them and says so at its top); **the respelling option** (script opt `pron`, make_voice.py `LINE_PRON`; used once: Basil's g1002 "24" ->
  "twenty-four", the card shows "24"); **finish.sh's caption-join fix** (a cue joins the next when they start under .6 s apart; no overlaps;
  ep14 names; EP14 marks for the contact-sheet stills).
- **EP12 v2's smooth hidden-animal push-in is the default** (`common.js` = ep12/common.js after the 22 Nov teacher fixes, with EP14's chant words
  and EP13 Stage 3's `lizReveal` pill position as `o.px` / `o.py`): `gameScene(t, s, L, full, R)` stays in the REAL place and pushes straight in
  (1.1 s, ease in-out) onto the owl / the ladybird, the rest softly dimmed, then the score pill glides, the YOU hand(s), "You lock in first", the
  buddy discs, the label *a little owl / ladybird* by the real animal and *Can you spot it?* pop out over it; `lizReveal(..., { from })` melts
  the score hand into the real place, pushes in, and the ring pops on the animal's name. **No cut to the purple game screen.** At Stage 1 the
  "real place" is `flatPH` / `gardenPH` (tests.js: a placeholder card with the animal at `OWL` / `LADY`); Stage 2 passes the drawn sets.
- **Reused real art:** `ep13dare.js` = EP13's three dusk dare boards (`PIC.sunAway`, `PIC.sunEarth`, `PIC.sunCloud`, `duskSky`, `sunDisc`, the
  gradient `gDusk` in `XDEFS13E`), copied unchanged from ep13/garden13.js (p1.js `dareBoard`): the cold open, `back`, the recap, Round 1's cards,
  the answer `globeans` with its tick and x chips. Not copied: EP13's art (school.js, garden13.js except the boards, its five look-closer arts,
  its journeys), ep12dare.js, out/, mp4/wav in git, EP13's voices (only the ritual lines, copied unchanged: h501, h860, h864, h1304a/o/t, h1305,
  u1300, u1305, u1002). `bg/`: stage, stage2, daystage, _grain.
- Changed shared code (in ep14/ only): `lib.js` (EP14 `KW`, `KWLINE`, `SHELF_HIDE` with the six `lc*` scenes; ROTATION in `globeans`, CYCLE in
  `cyclecheck`, REPEATED PATTERN beside Mark Sentence 2 after the card; GROW inside `lcthen`, REPRODUCE inside `lcchick`, LIFE CYCLE in `ring`; all
  `o.at`), `common.js` (above; chant words `PHR` / `PCOL`, `chantFlash` -> the day-and-night ring / the chicken ring / the boxes + A CYCLE),
  `song.js` (`hoo`, `yawn`, `lift`, `curtain`, `click`, `rumble`, `hum`, `signal`, `buzz`, `cluck`, `rooster`, `heartbeat`, `sip`, `squish`),
  `main.js` (picks up `XDEFS13E` and a Stage 2 `XDEFS14`), `make_voice.py` (EP14 notes), `check_words.py`, `finish.sh`, `page.html`
  (tests.js, ep13dare.js), `closer.js` / `shrink.js` (EP14 headers; helpers only).
- `tests.js` written for EP14: the answer colours (`GOODC` A CYCLE / LIVING green with a tick, `WEAKC` NOT A CYCLE / NON-LIVING blue; `cycTag`,
  `tagAt`), `VSTYLE` (and `"sun"` for DAY AND NIGHT: A REPEATED PATTERN), the cream `dnTag` (*day time* / *nighttime*), **the board CYCLE CHECK**
  (`cycleBoard(t, {small, show, two, flash})` + `CYC()`: two tick boxes, a ring of arrows all one way, round slots, NO numbers; every tile, tick
  and tag on its mark; the pencils in a ROW; the two closed rings for the chant and the ending), **Pip's notes** (`notesEasel(t, {lit, strike,
  fix})`), `HIDDEN` (owl / ladybird placeholders), `OWL`, `LADY`, `flatPH`, `gardenPH`, `lcPH`, `ringPH`, the small print (`smallPrint`,
  `SUN_RULE`, `SUN_DRAW_RULE`, `TORCH_RULE`, `HEN_RULE`), `DARE_CARDS`, `DARE_LABEL`, `DARE_CLUES`, `NEXT_CARDS`, `CLOCK` / `WEEKS` / `stepPill`.
- **`script.py`**: both parts as data, every line word for word (the new full sentences), the dare names of section 3 resolved (Block A
  `{DARE_Q}`, `{DARE_SHORT}`, `{CARD1_PICK}`, `{CARD3_PICK}`, `{NAP_BACK}`; Block B `{NEXT_DARE}`, `{NEXT_JOKE}`), the chant `CHANT`, `PRON` (none),
  `CUTS`. Checked by script against the markdown both ways: all 131 spoken quotes of sections 4-5 are in script.py with their speaker (except
  the two cut lines and the chant, which is `CHANT`), and every script.py line is in the markdown (the one short line is section 6's own cut
  form). Cells split into lines of one speaker (words unchanged): `{DARE_Q}` = g202 + g203 (1.8 s between the cards: each board forward 3.35 /
  2.99 / 3.40 s); the traffic light's cell = g1302 "Look closer." (the glide down) + g1303 "Green. Amber. Red. Green again!" (1.45 s between the
  words: the lamps land 2.18 / 1.94 / 2.02 s apart) + g1304 (the verdict sentence). Two-speaker cells are one line per speaker.
- **Voices** (`voice/`, 122 lines in the timelines: 112 recorded for EP14 (the chant c1003 among them) + 10 ritual lines copied from EP13; j907 is recorded but cut): `/home/user/heart-tts/venv/bin/python
  make_voice.py` keeps finished files and re-records only lines whose text or voice options changed. Pace: Heart .90, .5 s between sentences; a
  new-term sentence x.93 and >= .65 s after it ("rotation" g708, "a cycle" g1101, "grow" j505, "reproduce" j604, "a life cycle" j801); the Part 2
  recap j101 .75 s between sentences (its second picture holds 2.68 s); journeys .85, 1.0 s, softer; LOOK CLOSER .85, .8 s between sentences;
  buddies (Character Voice Kit) x.88; the two-sentence Mark Sentence cards .6 s. Every text goes through `../sg_pron.py` (`_FixK`): ONE line is
  on its list, Momo's j1003 ("...can continue to live on Earth": "live" = lˈiːv, "leev"; "Life cycles" / "living things" untouched). Aligned:
  all but two one-word-ish takes (g402 Pip "Day and night.", hk_reproduce: spread by word length, fine for a short line). Chant: EP7's call and
  response (`BAR` 3.2 s, the answer on the stomp, 3 lines + YOUR TURN!, no all-together bar; Basil's call louder).
- **The checked words** (`check_words.py` -> `qa/new_words_check.json`, `qa/new_words_check.m4a` 2:04 with its index `qa/new_words_check.txt`):
  Kokoro's phonemes are the script's targets in every voice (en-us): **rotation** ɹoʊtˈeɪʃən "roh-TAY-shuhn"; **reproduce** ɹᵻpɹədˈuːs,
  **reproduces** ɹᵻpɹədˈuːsᵻz "ree-pruh-DYOOS" (en-us "-DOOS"); **cycle(s)** sˈaɪkəl(z) "SY-kuhl"; **life cycle** lˈaɪf sˈaɪkəl; **live** (j1003,
  through sg_pron) lˈiːv "leev" (Kokoro alone would say lˈaɪv). Machine listen (pocketsphinx choosing between the right sound and a wrong one,
  three trims, majority): right for Heart's and Basil's "rotation", every "cycle(s)" of Heart, Basil and Momo and Pip's "Cycle or not?" / "I
  think it is a cycle." / his notes, Basil's "reproduces", Heart's "Living things reproduce", Momo's read-along "Reproduce.", and **Momo's
  "live" = "leev" (rrr)**; measured too: in j1003 "live" is a steady /iː/ (F1 about 380 Hz, F2 about 3200 Hz) where "Life" glides /aɪ/ (F1
  1000 -> 670, F2 1540 -> 2680). Every one-word "Reproduce." ends unvoiced (an "s", not a "z"). **To listen to first** (the decoder flags them;
  the phonemes are right; Pip's voice is shifted up and decodes poorly, as in EP12 / EP13): Pip's read-along "Rotation." (0:11.9), Pip's goal
  card "What a cycle is." (0:17.0), Heart's "that is a life cycle!" (1:07.9, undecided), Pip's read-along "Life cycle." (1:37.2), Heart's /
  Pip's / Basil's read-along "Reproduce." (1:45.6 / 1:47.0 / 1:48.6). **No word came out wrong in the phonemes, so no line was re-spelt.**
  (Whisper is not installed in this container; installing it was not allowed, so the check is pocketsphinx + Praat only.) If a human hears one
  wrong: add a `pron` to that line (a `unison` line takes one too) and re-run make_voice.py, then build_tl.py (only that line is re-recorded).
- **Timelines**: `python3 build_tl.py 1|2`. **Lengths (Stage 1): Part 1 5:13.7 (313.7 s), Part 2 5:12.3 (312.3 s)**, both under about 5:15 WITH
  the six look-closer holds (verdicts 2.5 s). Part 1: no cut. **Part 2 ran 5:20.5 with every line**, so script section 6's first two Part 2
  cuts are used, in its order (`CUTS = {"forgotegg", "notes13"}`): Pip's "Oops! I forgot that the adult lays an egg!" (j907: the oops pose in
  silence) and Pip reads only "Here are my notes! Two: a life cycle ends at the adult." (lines one and three shown and lit, not read).
  **Cut candidates left if Stage 2 adds time** (section 6's order; never teaching, never a look-closer, a journey step or the pauses round new
  terms): Part 1 `title2` (picture only), `napback` g709 Basil (about 4 s; the cheer pose in silence), `noclouds` g605 Pip (about 3.5 s; the
  labels still show), `pencilback` g1204 Basil (about 3.5 s), `againnight` g606 Heart (about 3 s), `yesmomo` (g802 shortened to "Yes, Momo!";
  re-record), `lookmoves` g801 Momo (last). Part 2 `darkwarm` (j702 without "It is dark and warm in here."; re-record), `nextjoke` j1302 Basil,
  `c02silent` (the strip shown 3.5 s without being read, last). Never: j604 "Living things reproduce and have young." and the four Mark
  Sentences. If a Basil line is cut, cut one of Momo's or Pip's as well.
  Lines by speaker (script's count: goal cards = one line, "Say it with me!" + card = one): Part 1 Basil 5, Pip 4, Momo 4; Part 2 Basil 5, Momo 3,
  Pip 1 (+ his notes' lines lit on screen) after the two cuts. Counted one by one: Part 1 Pip 7, Basil 6, Momo 5; Part 2 Basil 9, Momo 4, Pip 2.
- **Sound**: `sound_cues.js` (EP14's cues on the same words and marks as the picture) -> `node dump_cues.js P` (215 / 201 events, no bad times,
  no unknown kinds) -> `node song.js P` -> `out/mix_pP.wav`, both **-16.0 LUFS** (true peak -1.5 dBFS). Each action on its own mark: the
  curtain rings ON `curtains` / `curtainsopen`, a pat ON `sticker`, the torch's click ON `torchon`, the globe's slow rumble from `turn` without
  a stop, a soft tock ON each lamp (`lampG`, `lampA`, `lampR`, `lampG2`), a hop ON each tile (`tileday`, `tilenight`, `pen1..pen3`, `tegg`,
  `tchick`, `tadult`), a tap ON each tick, a tag ON each tag, a tap ON each clock / week step, the nest's rustle ON `settle`, three cheeps ON
  `chicksout`, cracks ON `jcrack` and each `jtap`, a scribble ON `strike`, a stretch ON `bend`, a pip ON each hen label; birds at dawn and in
  the garden, the night shimmer for the time-lapse's nights and the journey's night, a heartbeat inside the egg, the owl's hoo, the ladybird's buzz.
- **`p1.js` / `p2.js`**: shared routines wired (Part 1: the cold open's real boards sliding in, the calm recap of EP13's dare with its boards
  stepping forward and its cards lighting, `back` with the pill, the title slam WHY DOES THE SUN / COME BACK?, the game's smooth push-in onto the
  owl, goals read by Pip, countdown, Round 1 with the boards on the cards and the clue labels on top of the ring, the answer with the tick and the
  x chips on the real boards (and by Momo and Pip), Mark Sentences read by Basil (C0.3, "twenty-four") and Momo (C0.1, REPEATED PATTERN after the
  card), the board CYCLE CHECK as a functional placeholder (sliding in, its tiles, ticks and tags on their marks; small inside `lclight`), the
  HOLD ON! ring with *IT CHANGES ✓* · *IT REPEATS ?* on top of the ring and the pencils in a row, the owl's smooth reveal, the cliffhanger's cards
  and PART 2 slam; Part 2: the three-picture recap with labels, the garden's pill, the game's smooth push-in onto the ladybird, goals read by
  Basil, Round 1 (four clue labels on top of the ring), the answer with Momo, the strip C0.2, the ring closing on the board, Mark Sentences read
  by Basil (4.2) and Momo (4.1, *ensure = make sure*), the Showdown's easel MY NOTES (lines lit, struck, rewritten in green), ring, stamp and
  picks, the chant with the two-ring board flashing, score hand, the ladybird's smooth reveal, the EP15 dare cards and banner, read-along, "Now
  you know!"); every new-art scene is a `phScene` placeholder naming what to draw, and each of the six [LOOK CLOSER] moments (`lcsky`, `lcglobe`,
  `lclight`, `lcthen`, `lcchick`, `lchens`) is an `lcPH` placeholder inside the real look-closer frame (push-in, dim, window, LOOK CLOSER tag, the
  verdict at its `v_*` mark, a NOW: label naming the current picture beat; wired over it: the small print, the clock pill / week pill, *speeded
  up*, the cream *day time* / *nighttime* tags, the row of four skies, Pip small in `lcsky`, the LIVING / NON-LIVING tags, the small board).
- **`SCENES_TODO.md`** (generated: `python3 make_todo.py`; re-run after any timeline change): every scene's time range, what to draw, what to
  reuse, what is new, **the 22 Nov visual standard written out for that scene (Buddies: a fresh pose or reaction on every line; Camera: a gentle
  push or drift, no needless cuts; Life: the small life in the background; Light: dawn / morning / dusk / night)**, its marks and lines (with
  times); the poses; the choices made where the script was unclear.
- **Checks**: `qa/p1_check.jpg`, `qa/p2_check.jpg` (placeholder stills at every scene start and middle and after every mark: 137 + 124 frames,
  each under 2 MB): no page errors. No video rendered.
- **`upload.json`** written for Stage 3 (ep13's shape): titles and descriptions from script section 7 (the School Lab line left out until that
  lab is signed off), playlists PLb8LpPqxQI4E and PLPfEuT7l4KjI **after "explained-p3-ep13-part2"** (EP13 Part 2 8lQ1-1ruveY), **NO "replaces"**:
  the classic "What Happens After You Plant A Seed? Round And Round" (RVRoaWWKjEM, pp. 73-79) stays in the playlists until EP15 is live
  (the teacher's answer (k)).

### What Stage 2 (drawing) must draw
Sets: **the HDB living room by an EAST window** (Part 1: a sofa, a low table with the globe, the torch on four books, a clock, a ceiling fan, a
school bag by the door, a window with a grille and curtains (open / drawn), the far blocks, the sky, the rain tree with the **owl** asleep on a
branch, the road junction and its traffic light below), in its lights (pre-dawn, dawn, the curtained dim room, full morning, late morning); the
**window's view for the time-lapse** (a function of the clock: dawn, morning, noon, golden afternoon, dusk, a clear starry night with lit windows
and street lamps, dawn again; the Sun rises behind the far blocks and never sets in this window); **the globe and torch model** close up (EXACTLY
half lit, the soft edge, the red sticker on Singapore at every angle of an eastward turn, the hand turning it, the pin mark by the torch); **the
traffic light** close up (three lamps, each state) and seen small from upstairs; **the community garden beside an HDB block** (Part 2: planter
beds, a bench, a young tree on a stake with the **ladybird** on a leaf, a tall old tree with red fruits, the void deck and the block, a water
dish, a bush with a nest of four eggs). Characters and props: the hen, the rooster (far), the chicks, ONE chick with a pale patch at four ages
(downy, feathers coming, a young bird, an adult), the adult and her three chicks, three chickens at the water dish (an old pale hen, the
adult, a chick); the old photo *Tree Planting Day* (a boy, a young tree on a stake, a teddy bear) and its NOW twin (a man, the tall tree with
fruits, the worn teddy bear on the bench) with the three height lines; an adult's hands (curtains, sticker, torch, globe, photo); the board
**CYCLE CHECK** on its low stand with picture tiles (a bright sky, a starry sky; three pencils; three lamps; an egg, a chick, an adult chicken)
and its two-ring form (replace `cycleBoard`, keep its marks); **Pip's easel MY NOTES** with three small drawings and the row that bends into a
ring (replace `notesEasel`); the three cliffhanger picture cards (a hen, a chick, a teddy bear); the small framed picture beside Momo; under
Mark Sentence 1 the small globe and the 24-hour clock; under Mark Sentence 2 of Part 2 the three chickens; the recap's picture 2 (a still of the
globe look-closer); **the three EP15 dare boards** (a mango cut open with its one big flat seed, three times: + a small mango / + a flower / + a
young plant with two leaves: `PIC.mangoA / mangoB / mangoC`, reusable by EP15). Six look-closer arts (`skyArt`, `globeArt`, `lightArt`,
`thenArt`, `chickArt`, `hensArt`) with their sets. Two journeys (BE THE LITTLE RED DOT: the Earth curving away, the steady Sun to one side, the
turn into night with stars and city lights, the dawn line; BE A CHICK: inside the egg, the hatch, the garden from chick height rising with the
weeks, the nest from above, the new egg's taps). Two hidden animals, cute and alive, in the real places: the owl (asleep, breathing; opens its
eyes on its name in the game, one eye at the reveal) and the ladybird (walking along its leaf; lifts its wing cases; flies a hand's width at the
reveal). The smooth push-ins: pass the drawn sets to `gameScene` (`R.world`) and `lizReveal` (the view) and move `OWL` / `LADY`. Reused as they
are: EP13's three dusk dare boards (ep13dare.js), EP11's torch, the rules scene, ring, cards, coins, stamps, the ending.
**Every scene to the 22 Nov visual standard** (SCENES_TODO.md writes it out per scene): a fresh pose or reaction on every buddy line; a gentle
push or drift, no needless cuts; life in the background (the fan, birds, the sky changing, leaves, the chickens); the light of that moment.

## Stage 2 (Fable): drawing and thumbnails
- Draw every scene of `SCENES_TODO.md` into new files (e.g. `flat14.js`, `garden14.js`; add them to page.html after pics.js; gradients in
  `XDEFS14`; bake static sets: `NODE_PATH=$(npm root -g) node bake.js <names>`), replacing each `phScene` / `lcPH` / `ringPH` / `flatPH` /
  `gardenPH` / `hiddenPH` placeholder and redrawing `cycleBoard` and `notesEasel` (keep names, arguments and marks). Draw every action AT its mark;
  if a drawing needs a mark moved, move it in `script.py` and rebuild (`python3 build_tl.py P`, `node dump_cues.js P`, `node song.js P`).
- Stills while drawing: `PART=P ./sheet.sh <name> <cols> t1 t2 ...` (qa/<name>.jpg) or `PART=P NODE_PATH=$(npm root -g) node stills.js qa/_st/f t1
  t2 ...` (prints "no page errors"). Keep QA images at about 5 MB or less.
- **Thumbnails (new style, `../THUMBNAIL_V2.md`)**: add `ep14_1` and `ep14_2` to `THUMBS` in `../thumb_v2.js` (model: `ep13_1`, `ep13_2`), out
  `ep14/thumb_part1.jpg`, `ep14/thumb_part2.jpg` (the files upload.json uploads). Part 1 **WHO MOVED?** (white then yellow #FFD60A, top right):
  Momo surprised, big, at the left; the globe close up, half lit, the red dot on the edge between light and dark, the torch's beam from the right
  edge, a white outline; a radial burst from deep indigo to warm orange (dawn). Part 2 **WHY NOT TEDDY?**: Basil surprised at the left; the teddy
  bear at the foot of the tall tree's trunk with one flat height line; a burst of fresh leaf green to yellow-green. A tiny part chip, no PART
  badge, the bottom right corner free. Make them (from `explained2/`): `NODE_PATH=$(npm root -g) node thumb_v2.js ep14_1 ep14_2`; check the
  320 px copies (`qa/thumbs.jpg`).
- When done: stills every 0.45 s of both parts with no page errors; contact sheets `qa/p1_sheet.jpg`, `qa/p2_sheet.jpg`; one sheet per
  look-closer and journey; re-dump cues and rebuild both mixes at -16 LUFS; write a "Stage 2: done" section here; progress/ep14.json.

## Stage 2.5: the teacher's-eye review (a fresh Opus agent that did not draw it; `../SERIES_FORMAT.md` section 10 rule 6)
- Look at 6-8 key stills per part plus frame strips of every transition (the two smooth push-ins and reveals, every look-closer's push-in and
  pull-out, the journeys' glides) and judge them the way the teacher judged EP1 (`../EP01_vs_EP04_NOTES.md`, `../ep01/NOTES_ROUND3.md`,
  `../EXPLAINED_PLAYBOOK.md`): is every buddy cute and reacting (a fresh pose on every line)? anything floating, cut off, hidden behind a disc,
  unreadable on a phone? any needless cut (in the same place, the camera should move)? is there life in each place and the right light? does
  each look-closer show the WHY (the clear night, the torch that never moves, the flat height line, the chick's weeks)? any 2-3 word spoken
  fragment left? Notes to `ep14/NOTES_REVIEW.md`; the drawing agent fixes every note; the reviewer checks again; only then render. Send the key
  stills to the teacher for information (not a gate).

## Stage 3 (Opus): `./build_part.sh P` (timeline, cues, song, `flock /tmp/explained_render.lock node render.js P 3`, `finish.sh P`)
- Output `ep14_partP.mp4` (ignored), `ep14_partP.srt`, `sheet_partP.png`; check stills around every action mark, card, look-closer and reveal;
  both parts about -16 LUFS, each at most about 5:15 (cut from the list above if over).
- A human listens to `qa/new_words_check.m4a` (Pip's "Rotation." at 0:11.9, "What a cycle is." at 0:17.0, the "Reproduce." takes at 1:45.6-1:48.6
  first, and Momo's "leev" at 1:58.5) before upload.
- Upload with `python3 production/youtube/explained_upload.py production/workspace/explained2/ep14/upload.json --check`, then without `--check`
  (Made for Kids, public, the new-style thumbnails, both playlists right after EP13 Part 2's key `explained-p3-ep13-part2`). **No "replaces"**: the
  classic RVRoaWWKjEM stays in the playlists until EP15 is live (then EP15's upload.json replaces it and its NEW VERSION line points to EP14 and EP15).
- After the upload: the episode guide, the links and `.srt` files to the teacher, the SecondBrain handoff (`Plans/videos/P3-new/HANDOFF.md`).
- Status: see ../progress/ep14.json
