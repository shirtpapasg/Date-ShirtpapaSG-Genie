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

Stages: **Stage 1 (setup, done 2026-11-22, Opus)** · **Stage 1b (Trial: buddies teach, done 2026-11-22, Opus)** · **Stage 1 colour (done 2026-11-22, Opus)** · **Stage 2 (drawing, sound, render, done 2026-11-22, Opus: the Fable agent hit its limit)** · **Stage 2.5 (the teacher's-eye review, done 2026-11-22: NOTES_REVIEW.md)** · **Stage 3 (render, checks, upload: done, LIVE 2026-11-22)**.

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

## Stage 1b: Trial: buddies teach (done 2026-11-22, Opus)
The teacher (22 Nov): "I want to try a new episode with the pet buddies not having the colour circular background. Let them blend in. Also,
make them bigger so the cute pet buddies can create a more relatable connection with the viewer. Focus more on their dialogue and how they
explain / teach scientific terms." (`../SERIES_FORMAT.md` 1d.) EP14 is the trial. **Stage 2 draws the trial style: read `SCENES_TODO.md`'s
"THE TRIAL" section first; it replaces the 22 Nov visual standard and the aura-disc rule below wherever they differ.**
- **Dialogue** (`../p3_ep14_script.md` section 12.2, the tables of sections 4-5, section 6 and section 10 D): every term (day and night,
  rotation, 24 hours, cycle, repeated pattern, grow, adult / young, reproduce, life cycle, the same kind) is explained by a buddy in their own
  words in a short back-and-forth tied to what we see and the child's life; Heart hosts, names the book's term on its slow line (the key-word
  pops stay on Heart's lines, GROW on Pip's) and confirms; Pip careful and step by step, Basil bold with comparisons (globe, pyjamas, school
  week, height marks, family photo) and the most lines, Momo curious ("But why does it keep repeating?", "Why did it not grow?", "What does
  reproduce mean?"). Book wording, cards, game beats, look-closers, journeys, dare and hidden animals unchanged; full sentences.
- **The game segment, both parts: FIND the hidden animal first** (Heart names it; Momo / Basil make the search fun), then the fingers and
  lock-in rules (teacher, 22 Nov). `gameScene` (common.js) now takes `[find, buddy, rules]` line ids.
- **Lines per speaker** (goal cards = one; "Say it with me!" + card = one): Part 1 Heart 38, Basil 10, Pip 9, Momo 7; Part 2 Heart 32,
  Basil 10, Momo 7, Pip 6. Heart's words 428 -> 300 and 429 -> 317.
- **Voices:** 50 new or changed lines recorded with `make_voice.py` (Heart via sg_pron; the buddies via the Character Voice Kit, x.88); all
  aligned except j801p and the two Stage 1 ones (g402, hk_reproduce: spread by word length). New dictionary words: MRT, pyjama(s). 21 voice
  files of lines no longer spoken removed (g301, g602-g607, g703-g706, g1304, j201, j502-j505, j602, j603...). `script.py` checked against the
  markdown both ways, sentence by sentence and speaker by speaker: every script.py sentence is in the tables; the only table sentences not in
  script.py are the CUTS.
- **Timelines** (`build_tl.py`): **Part 1 5:17.1, Part 2 5:16.8** with CUTS = title2, napback, pencilback, mrt (new), yesmomo; forgotegg,
  notes13, darkwarm, kitten (new), nextjoke, c02silent (the strip shown 3.5 s, not read). No teaching line, look-closer hold, journey step,
  new-term pause or card hold was cut; the trimmed waits were picture beats inside look-closers, now filled by the buddies.
- **Sound:** `sound_cues.js` (the new line ids; a pop as each buddy joins the hidden-animal search) -> `dump_cues.js` 214 / 197 events ->
  `song.js` -> out/mix_p1.wav, out/mix_p2.wav, both **-16.0 LUFS**. Every action still on its own mark (tiles and ticks now land on Pip's words).
- **Words check** refreshed (`check_words.py` -> `qa/new_words_check.m4a`, 2:04): Basil's "rotation" (g709r), "cycle" in g1101 / g1304b heard
  right; **Momo's "What does reproduce mean?" (j606m) is flagged** (phonemes right, the "s" runs into "mean"): listen first.
- **Placeholder stills:** `qa/p1_check.jpg`, `qa/p2_check.jpg` (every scene start / middle, every mark, every line start): **no page errors**.
  The new buddy lines have no speech bubbles yet in the placeholders (Stage 2 draws every bubble).
- **Staging for Stage 2** (`SCENES_TODO.md`, generated by `make_todo.py` from the timelines + `todo_trial.py`): for every scene, who is in
  frame, where (L / C / R, FG / MG) and how big; the camera and its zoom target per line; each buddy's pose per line; the hidden animal's
  hiding place; life; light; what to keep. The trial rules written there: no aura discs (contact shadow, the scene's light, colours only on
  name tags / bubble borders / pick cards); buddies at least 1.5x their EP12-EP13 size, the speaker 45-55% of the frame height; balanced
  layouts (never bunched on one side); the camera frames whoever talks and moves smoothly (no jump cuts); the camera pushes in on whatever a
  line names (boards, globe, photo, clock) with the speaker big beside it; each recurring board keeps ONE home (listed) and glides, never
  jumps; countdowns take the stage (the ring big and central, clue labels >= 40 px cap height, the blue game stage, one big buddy at most);
  lock-ins use ONE set of big numbered picture cards; look-closers fill the panel, boards large, each named part its own push-in and big
  label, and the speaker's FACE peeks in from a lower corner reacting on the beats (no ghost overlaps); the hidden animal: push-in -> iris
  wipe with a thick BLACK ring -> the blue-violet starry game stage -> the game objects pop; the same circle at the reveal; the owl and the
  ladybird change their hiding place scene by scene (each spot listed; the reveal replays the spot Heart names).
- **The journeys bring company (teacher, 22 Nov):** in BE THE LITTLE RED DOT and BE A CHICK the viewer is present in first person (a
  *You: ...* tag; a "you are here" glow with tiny waving hands; the chick's wing tips and feet, like EP5's frog hands) and the three buddies
  shrink down with the viewer and ride along beside them, reacting at each stop (SCENES_TODO `shrink`, `waitw`, `pullout`). Words unchanged.
- **Kept from the partial Stage 2 commit (eecdae5):** all of flat14.js and garden14.js (sets, props, look-closer arts, journeys, animals),
  bg/flat.png, bg/garden14.png, the camera keys and action timing of p1.js; to change: every buddy call (no aura, new sizes and places),
  `lookCloser` (full-bleed + `peekFace`), `gameScene` / `lizReveal` (the iris), `lockN` (one picture-card set), the countdown staging.

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

## 22 Nov: buddies in colour from EP14
Teacher: from EP14 the buddies are in colour; EP14 mentions it casually (script section 12.3). Drawing waits for the coloured sitting sets (4 per buddy) and the coloured poses EP14 uses. The Opus pass before drawing records the two lines with the fun facts and retimes.

## 22 Nov: Pip stays grey
Teacher: Pip remains grey. EP14 colour lines updated (script 12.3): Momo has her colours; Pip is happy to stay grey; Basil decided after a test.

## 22 Nov: Basil teal
Teacher approved the teal Basil test ("this looks cool!"). Cast from EP14: Momo coral, Pip grey (unchanged), Basil teal. Basil line added (script 12.3). Waiting for 20 paintings (Momo 10, Basil 10).

## Stage 1 done: the buddies in colour, the colour moment and the fun facts (2026-11-22, Opus)
Drawing (Stage 2) can start: everything below is wired and timed. Read `../p3_ep14_script.md` section 12.4 and SCENES_TODO.md note 12.
- **Sprites (EP14 is the first episode in colour).** `prep_sprites.py` now copies ONLY coloured Momo / Basil files into `spr/` under the
  plain names (`momo_sit_closed`, `basil_cheer` ...), so no scene code changed; Pip is his grey set, unchanged. It empties `spr/` first,
  so no grey Momo / Basil can survive a re-run.
  - **Basil (teal):** `../characters/sprites/basil_c_sit_*` (closed, half, wide, blink, half_blink, wide_blink; the helper's set was
    checked and is right: only the face changes, 0 px below the neck, no seam) + poses oops, waving, thinking, surprised, pointing, cheer
    (cheer is cut from a 2x2 sheet and enlarged: a little softer). **No coloured arms_crossed:** lib.js `POSE_SUB` turns "arms_crossed"
    into thinking.
  - **Momo (coral):** her talking set is the ARMS-CROSSED painting: `momo_c_sit_*` from the teacher's four paintings
    (`poses_inbox/momo_c_talk_{closed,half,wide,blink}.jpg`, built with `align_set.py momo_c`: the base is the closed painting, the half /
    wide mouths and the blink lids are patched in; the other three are cropped paintings but only their faces are used) + poses oops,
    waving, thinking, surprised, cheer, arms_crossed. **"pointing" = waving** (POSE_SUB; every EP14 use is an inviting / showing
    gesture). Her coloured pointing painting is cropped (a straight cut through the tail): it is in the set as `momo_pointing_cut`
    (pose "pointing_cut"), for shots where her tail side is hidden ONLY. An uncropped one has been asked for; when it arrives, add it to
    poses.py, drop the RENAME in prep_sprites.py and re-run poses.py + prep_sprites.py (POSE_SUB then steps aside by itself).
  - `poses.py` puts momo_c and basil_c poses on their OWN coloured sitting sets (SITREF empty). QA: `../characters/sprites/qa/`
    `basil_c_{states,cycle,edges,seams,poseswap,headturn}.png`, `momo_c_{states,cycle,edges,seams,poseswap}.png`, `poses_momo_c.png`,
    `poses_basil_c.png`. No coloured back views exist: none is used in EP14.
- **The colour moment (script 12.3)**, Part 1 game, between Momo's search line and the rules: g301c Momo (waving + a twirl on
  "colours": lib.js `o.twirl`, mark `twirl`), g301p Pip (arms crossed, chin up), g301t Basil (cheer: no coloured arms crossed). Wired in
  `gameScene` (common.js; it takes the line ids [find, buddy, ..., rules]); a sparkle on the twirl and on "handsome", a pop on "grey".
- **Fun-fact reveals (rulebook 4)**: Heart "Did you spot ...? It was ...!" -> a buddy's fact with a labelled picture -> Heart "Tell
  someone at home!" (own line; `lizReveal(..., { tell, fact })`). Part 1 g1402 / **g1403 Momo** "Here is a fun fact! Most owls sleep in
  the day and wake up at night. Our day time is their bedtime!" (marks ff_in, ff_day, ff_night: *day: asleep* / *night: awake*) / g1404.
  Part 2 j1202 / **j1203 Pip** "Here is a fun fact! A baby ladybird looks nothing like its parent. It hatches as a spiky larva, like a tiny
  crocodile. Then it becomes a pupa, and then a ladybird!" (marks ff_in, ff_larva, ff_pupa, ff_adult) / j1204. The panel is a placeholder
  (common.js `funFact`: dashed boxes saying what to draw, the labels); Stage 2 draws the pictures. Fact-checked (script 12.4).
- **Voices:** 9 lines recorded with make_voice.py (Heart via Kokoro + sg_pron; buddies via the Character Voice Kit, x.88): g301c 5.6 s,
  g301p 4.5 s, g301t 3.2 s, g1402 3.6 s, g1403 6.0 s, g1404 1.0 s, j1202 3.6 s, j1203 11.2 s, j1204 1.0 s. No word on PRONUNCIATION.md's list.
  Pip's g301p is spread by word length (his pitched-up voice does not force-align, like g402; "chinchillas" added to the aligner's words).
- **Timing:** CUTS + `lookmoves` (the last Part 1 item of section 6). **Part 1 5:34.4, Part 2 5:28.2**: over the 5:15-5:25 target, as
  section 6 is used up and nothing teaching may go. Options for the teacher in script 12.4 (recommended: accept for this trial).
- **Sound:** sound_cues.js has the new cues; `node dump_cues.js 1|2` -> cues_p1.json (219), cues_p2.json (201). **The mixes
  (`node song.js P`) were NOT rebuilt** (wav, not committed): Stage 2 rebuilds them after drawing, as its checklist says.
- **Checks:** stills of the colour moment, Momo's Mark Sentence (coloured talking set), and both fun-fact panels: no page errors.
  `qa/p1_check.jpg` / `qa/p2_check.jpg` were not regenerated (times moved; Stage 2 makes new sheets).
- `SCENES_TODO.md` regenerated (make_todo.py, todo_trial.py: the colour moment and fact poses per line, note 12 = the coloured pose list).

## Stage 2 done: drawn in the trial style, sound beds, rendered (2026-11-22, Opus; the Fable agent hit its monthly limit, so Opus drew it)
Not uploaded: a fresh reviewer checks the render against EP1 first (`qa/ep1_compare_p1.jpg`, `qa/ep1_compare_p2.jpg`), then Stage 3 uploads.
- **Renders:** `ep14_part1.mp4` (5:34.5, -16.0 LUFS), `ep14_part2.mp4` (5:28.3, -16.0 LUFS) (not in git), `ep14_part1.srt`, `ep14_part2.srt`,
  `sheet_part1.png`, `sheet_part2.png` (30 stills each, finish.sh). Lengths as accepted for the trial (5:34 / 5:28).
- **The trial engine (shared code, ep14 only):** `lib.js`: `TRIAL` = no aura discs anywhere (a contact shadow only); EP12 v3's "never frozen"
  reactions (`reactAt`: every buddy on screen reacts to every sentence someone else says); EP12 v3's ring timer (number pop on each change,
  `chg`) and `jolt` / `impactFX` / `faceCam`; **automatic speech bubbles** (`autoSay`, called by main.js): every buddy line gets its cream
  bubble with the speaker's colour beside the speaker's head (where `buddy()` drew it this frame) unless the scene drew its own `say()`;
  `SHELF_AWAY(t)` slides the key-word shelf aside for a countdown. `common.js`: EP12 v3's countdown (`SC.count`), `lockN` (the stage, ONE set of
  big numbered picture cards, clue labels >= 54 px on top of the ring joined by lines, ONE big buddy fidgeting through the countdown, the YOU
  hand counting with the ticks, the others pop in for the picks), `iris` + `lizReveal` (black-ringed circle on the blue starry stage) with
  EP14's drawn **fun-fact panels** (`funFact` + `ffOwlDay` / `ffOwlNight`, `ffLarva` / `ffPupa` / `ffLady`: labelled, colour-coded, the
  fact buddy big at the right with its bubble); a new `gameScene` (push-in -> iris circle centre-left, FIND first with the finder big at the
  right, the colour moment with sparkles on the twirl and on "handsome", then the circle glides to the upper left and the hands, pill and
  other buddies pop in); every routine's buddies at trial sizes (goals reader 540, Mark Sentence reader 560 with the card large at the
  right; a second speaker after the card pops in at the right while the card steps back; final 380-440; read-along 340; chant 360-380;
  ending 420); EP12 v3's `riders` (the buddies ride along in both journeys). `closer.js`: the panel fills the frame (1800 x 866) and
  `lcPeekAuto` puts the FACE of whoever speaks (or spoke last / speaks next) in a lower corner of every look-closer (`peekSide` l / r / c).
- **Part 1** (`p1.js`): every buddy 1.6x (speakers 1.75-2.2x) standing in the room with a contact shadow, spread left / centre / right; the
  owl hides somewhere new by scene (`OWLAT` + flat14.js `owl.at`: the branch tip, the trunk's fork, in the leaves' shade; the game and the
  reveal use the branch Heart names); Round 1 on the stage with the dare boards on the numbered cards; **HOLD ON! redone**: the room gives way
  to the blue stage, the ring R 215 in the centre with the three pencils, IT CHANGES ✓ / IT REPEATS ? as big clue labels joined to the ring,
  the YOU crossed arms, Basil alone fidgeting, the board glides out and back, the shelf slides aside.
- **Part 2** (`p2.js`, every placeholder replaced): the recap's three pictures (the board, the globe-and-torch model, the hen / chick /
  teddy cards); the garden (`VG`) in every garden scene with its life; the ladybird hides somewhere new (`LB` + garden14.js `lady.at`: the
  planter sign, the bench, the stake, the bush, the dish rim, a fruit; the game and the reveal use the leaf Heart names); Round 1 with the old
  photo in the ring, four clue labels and three picture cards (the boy and the tree / all three / only the tree, with up arrows); the
  look-closers on thenArt / chickArt / hensArt; the answer with THEN / NOW on the bench; the strip over the garden with Pip and Momo; Be a
  chick (glide into the nest, the journey with riders and the chick's wing tips, pull back out); the ring on the board at its home; the
  Showdown (Pip's easel at its home, the countdown on the blue stage with the ring and the counting hand, Pip alone fidgeting, picks after the
  bell); the fix; Mark Sentence 2 with the three chickens labelled; the chant; the reveal; the mango dare (three numbered picture boards).
- **Sound:** `sound_cues.js` R.room (the living room: soft birds outside, the fan's hum, a bus passing now and then) and R.garden (birds,
  far children, clucks, leaves) under every scene of that place; `song.js`: the game bed stops for every countdown (EP12 v3) and the whole
  seconds are the loud tock, so only the ticks keep time. Both mixes -16.0 LUFS.
- **Countdowns measured in the rendered files** (`measure_countdowns.py P` -> `qa/countdowns_p1.txt`, `qa/countdowns_p2.txt`): the number
  changes once per second exactly (1.000 s steps; the frame is the first one after the tick, +1 frame), the whole-second tocks land on the
  ring's seconds, the bell on 0. P1 Round 1 (3 s): 71.28 / 72.28 / 73.28 / 74.28, the bell 74.25; HOLD ON! (5 s): 244.07 ... 249.07 in 1.000 s steps, the bell 249.04. P2 Round 1 (6 s): 49.00 ... 55.00, the bell 54.97; Showdown (6 s): 199.03 ... 205.03, the bell 205.03. No music and no place bed under any countdown (only the ticks, faster in the last 3 s, and the bell).
- **Thumbnails** (`../thumb_v2.js` ep14_1 / ep14_2, the coloured Momo / Basil from `characters/sprites/poses/*_c_*`): `thumb_part1.jpg`
  WHO MOVED? (Momo surprised; the torch lighting the globe's left half, the red dot on the edge between light and dark; the beam comes from the
  left, not the right edge, so the globe's map stays the right way round), `thumb_part2.jpg` WHY NOT TEDDY? (Basil surprised; the tall tree
  with its fruits, the worn teddy bear at its foot with one flat height line).
- **Self-check (rulebook section 10, rule 6), what is known to be still weak:** 
  - Look-closers: the speaker's face and its bubble sit in a lower corner and sometimes cover a label or part of the picture (lcsky's row of
    four skies, lcglobe's "the torch stays still" for a moment, the THEN picture's bottom in lcthen); lclight's small CYCLE CHECK picture in
    the panel is small (the rule asks for a board about half the panel).
  - lchens (rendered): the label "a grandmother hen" is partly under the small print at the top left. FIXED in p2.js after the render (the
    small print moved to the bottom): the next render of Part 2 picks it up.
  - Lock-ins: the ring's number badge touches card 2's number badge; the lead buddy's face-down pick card touches card 1.
  - Hidden animals: the owl and the ladybird move between scenes, but scenes on the blue stage / cards have no animal (by design); the owl in
    `back` / `title` sits on the game's branch (so the push-in does not jump).
  - Countdown ring: it drains one step a second on the tick (EP12 v3's design), so the arc is empty during the last second while the
    number still shows 1.
  - The chick journey's first-person wing tips are small and read a little like leaves; Part 1's journey has the buddies riding along
    but no "you are here" hands (the You: tag only).
  - The dare (Part 2) has Basil and Pip; Momo is not in that scene. Momo's talking sprite is her arms-crossed painting (as decided), so
    her "sit" lines all look arms-crossed.
  - Thumbnail 1: the torch beam comes from the left (STATE asked for the right edge) so the globe's map is not mirrored.
  - One console error at Part 2 154.4 s (a full-width grass rect off the bottom of the frame with a negative height in chickJourney): not
    visible; fixed in garden14.js (Math.max) after the render.
- `upload.json` unchanged from Stage 1 (titles / descriptions per script section 7, the new thumbnails, both playlists after
  `explained-p3-ep13-part2` = 8lQ1-1ruveY, public, Made for Kids as the uploader sets, no "replaces"). The uploader was NOT run.

## Stage 3 done, live (2026-11-22, Opus: a fresh teacher's-eye reviewer, then fixes, one render, upload)
- **Live:** Part 1 https://youtu.be/YoxJL8fjAkc · Part 2 https://youtu.be/q7OR-eImAsk (public, Made for Kids, thumbnails set; both
  playlists PLb8LpPqxQI4E and PLPfEuT7l4KjI right after EP13 Part 2 8lQ1-1ruveY; no replaces: RVRoaWWKjEM stays until EP15).
- **Review:** `NOTES_REVIEW.md` (28 numbered notes, worst first, from stills of every scene and every buddy line against EP1).
- **Fixed before the render:** Round 1 cards showed only rooftops (the Sun / globe / cloud cut off); the Sun small print on card 3; every
  pick bubble covered the answer cards (lockN: stage shrinks to .55 and rises, bubbles under the cards); the ring empty in the last
  second (ringState: the arc shows the number, steps on the tick); ring badge / card badge, lead pick card / card 1, "1, 2 or 3 fingers"
  under the hand; lcsky labels on each other; the bubble over the torch (lcglobe) and over the chick (lchens) (lib.js autoSay takes a
  scene's free spot: `window._BUBAT`); Cycle check bubbles over the board; HOLD ON! answer Pip big; lclight board bigger and clean
  until the lights fill it; game and key-word buddies spread; cliff PART 2 off the strip; loose x chips -> pick cards; YOU on the red
  dot; chick wings rounder with YOU, Week / speeded-up pills clear; Momo in the dare; Last time pictures bigger; THEN photo in at once;
  height labels bow out for LIVING tags; the ladybird fun fact fills from the first word; no egg-like patch on hen wings.
- **Render:** `ep14_part1.mp4` 5:34.5, `ep14_part2.mp4` 5:28.3 (not in git), both -16.0 LUFS; `ep14_part1.srt`, `ep14_part2.srt`;
  `sheet_part1.png`, `sheet_part2.png`; countdowns re-measured (`qa/countdowns_p1.txt`, `_p2.txt`: 1.000 s steps, bell on 0).
- **For the teacher:** `qa/ep14_highlights.jpg` (10 labelled stills of the new style). Needs a painting / the teacher's eye: chick
  wings (first person), a grown-up's hand, Momo's arms-crossed talking set, the PART 2 slam over "Part Two" (NOTES_REVIEW listen-proxy).

## 22 Nov ~14:00: v2 live (teacher notes after watching)
Fixes: speaking buddies always lip-sync (P1 3:30-3:37); calmer, meaningful reactions; logical reactions (shy when wrong, confident when right, cheer only when something is learnt; lib.js OUTCOMES, learnAt); P2 0:33 Round 1 photo + labels arrive with the story; P2 2:18 Heart reads the book strip C0.2 (c02silent restored); Momo's "So the Sun only looks as if it moves!" restored so Heart's "Yes, Momo!" makes sense. Lengths 5:37.7 / 5:33.1, -16 LUFS, countdowns measured exact. Uploaded: Part 1 m2Ayyhq7XKg, Part 2 xvD4HPaYjtQ (upload_v2.json), replacing YoxJL8fjAkc / q7OR-eImAsk (they stay public, pointing to the new Part 1).
