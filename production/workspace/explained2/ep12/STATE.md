# EP12 build state (for a resume after a restart)
P3 EP12 "Why isn't a trolley made of glass? Choosing materials" (P3 book Ch 3, pp. 59-65): Part 1 "A GLASS Trolley? Why Supermarket Trolleys
Are Made of METAL" (objects and purposes, properties decide uses; EP11's dare answered; the glass fish tank) and Part 2 "One Car, FOUR Materials!
Why Not Just One?" (one object, different materials: the three bottles; many materials, one object: the car; suitable). The script:
`../p3_ep12_script.md` (version 1, 21 Nov 2026; the teacher's go-ahead in its section 12: (a) fabric stays the trolley dare's third card,
(b) "rigid" stays out, (c) the windscreen shows WATERPROOF and TRANSPARENT (waterproof first), (d) no glass breaks, (e) the school bottle answer
is plastic, (f) the fish tank, (g) mynah and squirrel, (h) key words as written, (i) the HDB car park, (j) the EP13 dare fabric / metal / wood,
(k) the School Lab 3.7 line stays out, (l) **EP12 does NOT replace the classic _gRJ0NwV6p0** ("Why That Material? A Glass Trolley And Other Bad
Ideas", pp. 59-72): it stays in the playlists until a later episode also covers pp. 66-72, (m) no extra test clips unless a problem is heard).
EP11 is live (its playlists' anchor for EP12: `explained-p3-ep11-part2`).

Three stages: **Stage 1 (setup, done 2026-11-21, Opus)** · **Stage 2 (drawing + thumbnails, done 2026-11-22, Fable)** · **Stage 3 (render, checks, upload: done 2026-11-22, Opus; LIVE)**.
**v3, 22 Nov — awaiting teacher's OK; not uploaded** (see the last section and `NOTES_REVIEW_V3.md`). **Current live version: EP12 v2 (teacher fixes, 22 Nov): Part 1 https://www.youtube.com/watch?v=vqSehdxTCg8 , Part 2 https://www.youtube.com/watch?v=D2U_Zom1Wzs** (the first upload G03-LFQEld8 / ussXaa1fQUQ is retired: public, out of the playlists, pointing to the new Part 1).

## Stage 1: done
- **No script change was needed** (the teacher's answers are the script's own recommendations). `p3_ep12_script.md` is untouched.
- **Engine copied from `ep11/`** (as it stands after EP11's Stage 3) with the 21 Nov fixes kept: buddies read the goal cards (`goals3`) and
  the Mark Sentences (`markScene`), lock-in clues on top of the ring and kept through the countdown (`lockN` `c.labels`), the calm recap, the
  named hidden animal (`gameScene` + `hiddenBadge`, `lizReveal`), the look-closer frame (`closer.js` `lookCloser`, `lcLab`, `lcTag`, `lcVerdict`
  with `{ink, edge}` / `{plain, vx}`, `lcStrip`, `slowTag`), `roundCard`, the "Now you know!" ending; **every action sound hung on the action's
  own mark** (EP10 Stage 3's lesson, kept in EP11: script.py has a mark for each load, push, knock, drop, press, pour and hand move;
  sound_cues.js uses them and says so at its top); **the respelling option** (script opt `pron`, make_voice.py `LINE_PRON`, now also for
  `unison` lines); **finish.sh's fix** (the contact-sheet line; ep12 names; EP12 marks for the stills). Not copied: EP11's art (flat.js,
  ep10dare.js), its five look-closer arts (closer.js is EP11's Stage 1 frame), its journeys (shrink.js = helpers only), its baked flat /
  corridor sets, out/, mp4/wav in git, EP11's voices (only the ritual lines, copied unchanged: h501, h860, h864, h1304a/o/t, h1305, u1300,
  u1305, u1002). `bg/`: stage, stage2, daystage, _grain.
  - **Reused real art:** `ep11dare.js` = EP11's three trolley dare boards (`PIC.trGlass`, `PIC.trMetal`, `PIC.trFabric`), copied unchanged
    from ep11/flat.js (p1.js `dareBoard`): the cold open's boards, the recap, Round 1's cards, the glass / fabric / answer scenes, Mark
    Sentence 2's under-picture. `ep09drop.js` = EP9's drop box and cups (`ep9DropPic`, `PIC.ep9drop`, `XDEFS9`), copied unchanged from
    ep09/voiddeck.js: the ONE held picture "from Episode 9" in `glass` (no glass is broken in EP12).
  - Changed shared code (in ep12/ only): `lib.js` (EP12 `KW`, `KWLINE`, `SHELF_HIDE` with the five `lc*` scenes; PURPOSE inside `lcjob`,
    PHYSICAL PROPERTIES beside Mark Sentence 2, USE beside Mark Sentence 1, PARTS inside `lccar`, SUITABLE beside the strip, all `o.at`),
    `common.js` (EP12 chant words `PHR` / `PCOL`, `chantFlash` -> the board's PURPOSE / PROPERTY / MATERIAL columns by chant slot), `song.js`
    (`mynah`, `clang`, `clangslow`; `birds` softer outdoors), `main.js` (picks up `XDEFS9` and a Stage 2 `XDEFS12`), `make_voice.py` (EP12
    notes; unison `pron`; EXTRA "pe", "windscreen"), `finish.sh`, `page.html` (ep11dare.js, ep09drop.js), `closer.js` (EP11's Stage 1 frame).
  - `tests.js` rewritten for EP12: the two answer colours (`GOODC` RIGHT FOR THE JOB / SUITABLE green with a tick, `WEAKC` NOT FOR THIS JOB
    blue; `jobTag`, `goodWord`: the green tag reads SUITABLE after `kw_suitable`), `VSTYLE` (and `"sun"`: sun-yellow letters on cream for the
    purpose verdict, with a dark-violet border), the property chips in EP9-EP11's colours (`CHIPC`, `propChip`, `chipAt`), the board MATCH THE
    JOB (`COLS`, `BROWS`, `ROWT`, functional placeholder `matchBoard(t, {col, row, flash})`: four columns, seven rows that fill cell by cell at
    `row1o` / `row1p` / `row1m` / `row2` / `row3` / `carrows`, a tick per row at `ticks`), `HIDDEN` (mynah / squirrel, placeholder art) +
    `hiddenBadge`, `lcPH`, `ringPH`, the small print (`trolleyRule`, `carRules`, `smallPrint`, `TANK_RULE`, `GLASS_RULE`), `DARE_CARDS`,
    `DARE_LABEL`, `NEXT_CARDS`.
- **`script.py`**: both parts as data, every line word for word, with the dare names of section 3 resolved (Block A, fabric: `{DARE_Q}`,
  `{DARE_SHORT}`, `{CARD3_PICK}`, `{CARD3_TEST}`, `{CARD3_REACT}`; Block B: `{NEXT_DARE}`, `{NEXT_JOKE}`), checked by script against the
  markdown both ways (the seven block texts equal the markdown's; all 126 spoken quotes of sections 4-5 are in script.py with their speaker; every
  script.py line is in the markdown). Two-speaker cells are split one line per speaker. `CUTS` holds section 6's cut tags (none used).
- **Voices** (`voice/`, 118 lines: 108 recorded for EP12 + 10 ritual lines): `/home/user/heart-tts/venv/bin/python make_voice.py` keeps
  finished files and re-records only lines whose text or voice options changed. Pace: Heart .90, .5 s between sentences; a new-term sentence
  x.93 and >= .65 s after it ("That is its purpose." g504, "Four parts." j706, "suitable" j1008); journeys .85, 1.0 s, softer; LOOK CLOSER .85,
  .8 s between sentences; buddies (Character Voice Kit) x.88; the two-sentence Mark Sentence cards .6 s between sentences; the recap g202 1.8 s
  between sentences, 2.0 s after (each board >= 2.5 s: 2.64 / 2.55 / 2.58 s). Every text goes through `../sg_pron.py` (`_FixK`): **g805
  ("Glass is fragile, but metal is strong...") is the only EP12 line on the list: "fragile" = fɹˈædʒaɪl, FRAJ-ile**, aligned as "fragyle".
  Chant: EP7's call and response (`BAR` 3.2 s, the answer on the stomp, 3 lines + YOUR TURN!, no all-together bar; Basil's call louder).
  Not aligned (spread by length, harmless): hk_purpose (one word).
- **The checked words** (script section 10 H; `check_words.py` -> `qa/new_words_check.json`, `qa/new_words_check.m4a` 1:44 with its index
  `qa/new_words_check.txt`): Kokoro's phonemes are the script's targets in every voice (all four voices use en-us): **use** (the noun, in
  every line and alone in the read-along) jˈuːs "yooss" (the verb "use"/"used" in "Never use glass", 3.24, 3.25 stays jˈuːz(d)); "uses" (the
  noun, Momo's goal card) jˈuːsᵻz; **suitable** sˈuːɾəbəl "SOO-tuh-bul"; **purpose** pˈɜːpəs "PUR-puhs"; **fragile** fɹˈædʒaɪl via sg_pron.
  Machine listen: Praat finds the end of every "use" / "purpose" take unvoiced (an "s", not a "z"; where the take ends the line or stands
  alone); pocketsphinx, choosing between the right sound and a wrong one (use: -s / -z; suitable: "soo-" / "swee-"; purpose: -s / -z;
  fragile: -ile / -uhl), picks the right one for most takes and "fragile" (FRAJ-ile) for g805, but it is noisy on one-word takes (it swings
  between three trims). **One to listen to first: Pip's "Use." in the read-along (uk_use, 0:15.7 in the clip)**: his final "s" is soft (little
  energy above 3.5 kHz; unvoiced, so not "yooz"); six respellings were tried ("Yooss.", "Yoose.", "Yuce.", "Use!", "A use.", "The use.") and all
  give the same jˈuːs and the same soft "s" (Pip's voice is shifted up, so his "s" sits high and quiet; his "Purpose." measures the same), so
  none was kept. Also flagged by the decoder (measure fine): Basil's read-along "Use." (0:17.1), Momo's "A different use!" (g1105, 0:26.8),
  Momo's read-along "Suitable." (0:39.6; its first vowel's F2 matches Pip's and Basil's, which decode right). **No word came out wrong, so no
  line was re-spelt.** If a human hears one wrong: add a `pron` to that line (a `unison` line takes one too) and re-run make_voice.py, then
  build_tl.py (only that line is re-recorded).
- **Timelines**: `python3 build_tl.py 1|2`. **Lengths (Stage 1): Part 1 5:14.8 (314.8 s), Part 2 5:14.8 (314.8 s)**, both just under 5:15
  WITH the five look-closer holds (verdicts 2.5 s). No cut was used; Stage 1's own picture-only waits were kept short to get there (Part 2:
  the car's four rows hop on during `lccar`'s verdict hold instead of a scene of their own, the school bottle's row fills while Momo speaks,
  .7 s between the car's parts). Script estimates were 5:00-5:10 and 5:00-5:13.
  **Cut candidates if Stage 2 adds time** (script section 6, in its order; never teaching, never a look-closer, a journey step or the pauses
  round new terms): Part 1 the title's second slam (`title2`, picture only), `snacks` g806 Basil "Oops. Bye-bye, snacks!" (about 2 s; he does
  the oops pose in silence), `things` g603 "A towel. Scissors. A raincoat. Each has its own purpose." (about 1.5 s: the scene keeps 4.5 s of
  silent tags), `sameglass` g1105 (last of all; then the tag *The same glass. A different use.* shows, wired). Part 2 `notes` (Momo reads only
  "My notes!" and line two; j1001 re-recorded short: about 6 s), `water` j508 (about 1 s net; the tag shows instead, wired), `tip` j1007 (only
  if the tip card holds 3.5 s in silence: little gain), `metalstrap` j1302 (last). If a Basil line is cut, cut one of Momo's or Pip's too.
  Lines by speaker (goal cards counted one by one): Part 1 Basil 6, Momo 7 (4 goal cards), Pip 4; Part 2 Basil 5, Momo 5, Pip 6 (4 goal cards).
- **Sound**: `sound_cues.js` (EP12's cues on the same words and marks as the picture) -> `node dump_cues.js P` (177 / 209 events) ->
  `node song.js P` -> `out/mix_pP.wav`, both **-16.0 LUFS** (true peak -1.5 dBFS), no missing sounds, no bad times. New: `mynah` (two-note
  call: the cold open, the game, the reveal), `clang` (the knock in the bay, on `clang`) and `clangslow` (slow motion; the journey's knock),
  the trolley's wheels (`whirr` from `push` to `stop`), `birds` softly outdoors, `tank` at the aquarium shop, drips for the watering can
  (`pour`), knocks (`land`, `knock`), the far tinkle of EP9's picture (ep06_clink.wav), ep09_zip.wav (the school bag).
- **`p1.js` / `p2.js`**: shared routines wired (Part 1: the cold open's real boards sliding in, the calm recap of EP11's dare with EP11's
  boards stepping forward and their cards lighting, the title slam A TROLLEY / MADE OF GLASS?! over the dimmed board scene, game, goals read
  by Momo, countdown, Mark Sentences read by Pip and Basil, Round 1 with the boards on the cards and the clue labels on top of the ring, the
  glass scene with EP9's real picture, the book's strips, FRAGILE / STRONG and the job tags on the real boards, the fabric tags and FLEXIBLE,
  the answer with the real boards, the HOLD ON! ring with the glass card and three clue labels on top of the ring, the board MATCH THE JOB as a
  functional placeholder; Part 2: the three-picture recap with labels, game, goals read by Pip, Round 1 (clue labels on top of the ring), the
  answer with Momo, Mark Sentences read by Basil and Momo (the tag *function = the job of a part*, the four parts pulsing on Heart's re-say),
  the Showdown's notes (functional placeholder `momoNotes`), ring, stamp and picks, the fix and the tip card, the strip and the seven ticks,
  chant, score hand, the EP13 dare cards, read-along, "Now you know!"); every new-art scene is a `phScene` placeholder naming what to draw,
  and each of the five [LOOK CLOSER] moments (`lcjob`, `lcmetal`, `lctank`, `lcbottles`, `lccar`) is an `lcPH` placeholder inside the real
  look-closer frame (push-in, dim, window, LOOK CLOSER tag, the verdict at its `v_*` mark, a NOW: label naming the current picture beat; the
  book strip j506 wired inside `lcbottles`, the tank's small print wired in `lctank`).
- **`SCENES_TODO.md`** (generated: `python3 make_todo.py`; re-run after any timeline change): every scene's time range, what to draw, what to
  reuse, what is new, its marks and lines (with times); the poses; the choices made where the script was unclear.
- **Checks**: `qa/p1_check.jpg`, `qa/p2_check.jpg` (placeholder stills at every scene start and middle and after every mark: 119 + 97
  frames): no page errors. No video rendered.
- **`upload.json`** written for Stage 3 (ep11's shape): titles and descriptions from script section 7, playlists PLb8LpPqxQI4E and
  PLPfEuT7l4KjI **after "explained-p3-ep11-part2"** (EP11 Part 2 q2KJp6lKln0, uploaded under that key), **no "replaces", no "retire_old"**
  (the classic _gRJ0NwV6p0 covers pp. 59-72 and stays). The School Lab 3.7 line is left out of the descriptions until that lab is signed off.

### What Stage 2 (drawing) must draw
Sets: the covered walkway at the foot of an HDB block, mid-morning (the open front of a neighbourhood supermarket with a plain SUPERMARKET sign,
sacks of rice and crates of drinks, the trolley bay under its TROLLEYS sign on a post, the aquarium shop next door with tanks on stands,
pillars, floor tiles, a letterbox row, greenery) and the open-air car park beside the block (marked lots, the plain family car with its boot
open, a covered linkway, a grass verge with a rain tree, the block beyond, a small folding table). Props: the supermarket trolley (empty;
loaded with a RICE 10 kg sack, four bottles, tins; from the side; from above; the bottom bars close up with the guide line; in the bay at the
knock), the shopping basket with a bath towel, scissors in their pack and a folded raincoat, Pip's fabric shopping bag (empty, with rice,
folded flat), the planted glass fish tank on its wooden stand with six guppies (the magnifier, the dry shelf), the three water bottles (plastic,
glass, metal: in the trolley, on the table, close up, the plastic one falling, landing, rolling) and their tick table, the car (whole; a tyre with
a palm; the seats through the open door with a hand; the windscreen with water running and the dry seats behind; the door panel with knuckles;
the boot), the watering can, an adult's hands throughout, the board MATCH THE JOB with picture and material tiles (replace `matchBoard`), Momo's
notes on an easel with three small drawings (replace `momoNotes`), the tip card's picture, the three EP13 dare boards (the same school bag with
a torn strap: a fabric strap, a flat metal bar, a wooden stick; `PIC.bagFabric / bagMetal / bagWood`), the school bag in Round 1's ring, the
loaded trolley in Round 1's ring, Part 2's three recap pictures, small pictures under the Mark Sentence cards. Five look-closer arts (`jobArt`,
`metalArt`, `tankArt`, `bottleArt`, `carArt`) with their sets. Two journeys (BE THE METAL: a bar at the bottom of the trolley, the sack
landing, the floor rushing past, the knock; BE A DROP OF WATER: the spout, the windscreen, the seats seen through it, the painted metal slope,
the tyre, the ground and a drain cover). Two hidden animals, cute and alive: the mynah on the TROLLEYS sign, the squirrel on the rain tree.
Reused as they are: EP11's three trolley boards (ep11dare.js), EP9's drop-box picture (ep09drop.js), the property chips.

## Stage 2: done (2026-11-22, Fable). Every scene is drawn; no `phScene` / `lcPH` / `ringPH` / `hiddenPH` placeholder is left in `p1.js` / `p2.js`.
**Lengths unchanged: Part 1 5:14.8 (314.8 s), Part 2 5:14.8 (314.8 s).** `script.py`, the voices, the timelines and `sound_cues.js` were not touched
(no cut used, no mark moved: every action is drawn AT its own mark). No video rendered.
- **New file** `walk.js` (page.html loads it after pics.js, before tests.js): `XDEFS12` (gradients, the weave / brushed-steel patterns);
  `BG.walk` / `BG.walkD` (the covered walkway: SUPERMARKET front with shelves, rice sacks and crates, the trolley bay with its TROLLEYS sign on
  a post, the letterbox row, a plant, the AQUARIUM shop; `walkD` = dimmed) and `BG.park` / `BG.parkD` (the open-air car park: the block, the
  covered linkway, the grass verge, the rain tree with its low branch, marked lots), all baked (`node bake.js walk walkD park parkD` after any
  change); `VW(t, o, cam)` / `VP(t, o, cam)` = a set with its live things (the tank with swimming guppies and the mynah / the squirrel, the car,
  the trolley, the folding table with the three bottles) under a camera `[zoom, cx, cy]`; `trolleyS({load, rot, dip, rat, flap})` (side view;
  `load` = how far above its place each thing still is), `bayRow`, `baySign`, `trolleyTop`; `riceSack`, `drinkB`, `tinC`; `bottleSvg(kind, {glow})`
  (plastic / glass / metal, the same shape); `tankSvg` + `guppy` / `guppyAt`; `carSide({boot, bags, lit, dim})` + `CARPT`; `foldTable`, `canW`
  (the watering can), `shopBag`, `basketS`, `towelS`, `scissorsS`, `raincoatS`, `clothBag({rice, fold, lift})`, `riceSmall`; `aHand(x, y, rot, sc,
  flip)` (the adult's hand, by its fingertips); `mynahBird` / `mynahArt`, `squirrelBody` / `squirrelArt`; `TILE` / `SWATCH` (the board's picture
  and material tiles); `bagS` + `PIC.bagFabric / bagMetal / bagWood` (**EP13 opens with these boards**).
- **Changed:** `tests.js` (`matchBoard` drawn: a wooden-framed board on a low stand, picture tiles, material swatches, ONE car picture with a
  bracket beside rows 4-7, `o.good` = the green SUITABLE tag above the MATERIAL column; `HIDDEN` = the drawn mynah / squirrel; `trolleyRule`
  sits just under the logo (y 126) so it does not cover the SUPERMARKET sign), `closer.js` (the five arts `jobArt`, `metalArt`, `tankArt`,
  `bottleArt`, `carArt`; `recapPic` (Part 2's three recap pictures), `tickTable`, `bottlePic`, `crossBadge`, `LOADED`), `shrink.js` (both
  journeys), `p1.js` / `p2.js` (all scenes; `momoNotes` drawn on an easel with a small drawing on each line, the tip card's picture `rainPic`).
  `../thumb_v2.js`: entries `ep12_1`, `ep12_2`.
- **LOOK CLOSER as built** (shared frame: slow push-in, the set dims, no score / shelf / buddies / hidden animal, one verdict held 2.5 s):
  | Scene | Part, time (verdict) | What is shown | Verdict |
  |---|---|---|---|
  | `lcjob` | P1 0:54.6-1:15.3 (1:12.8) | two hands lower the sack RICE 10 kg: it lands at `rice` and the trolley dips on its wheels; four bottles, three tins drop in on their marks; labels handle: to push · basket: holds the groceries · wheels: roll; one hand takes the handle and the loaded trolley rolls across the window (`push` to `stop`); PURPOSE pops | ITS PURPOSE: TO CARRY HEAVY GROCERIES (sun-yellow letters on cream, dark border) |
  | `lcmetal` | P1 1:54.6-2:22.7 (2:20.2) | push-in to the bottom of the basket; two panels side by side (basket empty / with the heavy sack): the same bar along ONE dashed guide line, *metal bars*, *still straight*; the wide view: the hand pushes the trolley into the back of the last trolley in the bay (contact at `clang`, a small bounce back, the bottles rattle); *slow motion*: once more, 2.4 x slower; a round close-up where metal met metal: smooth, glints; *a hard knock* · *no crack* · *no break*; chip STRONG; EP11's metal board with RIGHT FOR THE JOB (`goodtag`) | METAL: STRONG (green) |
  | `lctank` | P1 3:28.4-3:52.5 (3:50.0) | the planted tank (lid, bubbles, six guppies swimming); a magnifier follows one guppy (enlarged, sharp); *glass*, *We see every fish clearly*, chip TRANSPARENT; the view glides down to the bottom edge and the wooden shelf (little sparkles: dry); *full of water*, *the shelf: dry*, chip WATERPROOF; back to the whole tank with both chips; small print *We do not tap the glass.* upper right for the whole shot | GLASS: TRANSPARENT AND WATERPROOF (green) |
  | `lcbottles` | P2 0:55.4-1:29.4 (1:26.9) | three bottles on the table over a cream tick table; row 1: a magnifier glides along the table under them (*dry*), three ticks; row 2: a soft light from behind, the water line shows in plastic and glass (*the water* x2), metal *cannot see inside* (a cross); row 3: a hand carries the plastic bottle out over the ground, lets go .42 s before `land`, it lands on its side, bounces once, rolls; the hand picks it up and turns it (*no crack · no leak*, tick) and puts it back; a hand rests on the glass bottle (not lifted), the tag *We do not drop glass.* on that bottle; the book's strip; a cross under glass, a tick under metal; a green ring round the plastic bottle; *At home, on a table: glass is fine.* · *Handle it carefully.* | FOR SCHOOL: THE PLASTIC BOTTLE (green) |
  | `lccar` | P2 1:54.1-2:27.8 (2:25.3) | four close-ups, each with ONE label line and its chip: the front tyre under the wheel arch, a palm pushes its side (*it does not give*, STRONG); the seat through the open door, a hand presses: the cushion dips and comes back (FLEXIBLE); the windscreen from the front, the watering can tips and water runs down in streams and beads and off the bottom edge, the two seats behind sharp (*the seats: dry*; WATERPROOF then TRANSPARENT); the door panel, a fist knocks twice (two plain rings; STRONG); then the whole car, the four parts lit one by one with label + chip; PARTS pops | ONE CAR · FOUR MATERIALS (green) |
- **Journeys:** BE THE METAL (P1 4:01.0-4:24.3: you look along the bottom of the basket: the bars run away like shining rails, the wire sides
  and the ceiling above; the underside of the sack RICE 10 kg comes down and settles (the view dips a little, the rails stay straight); the
  floor's lines rush past between the bars and the pillars slide by; the wire back of the next trolley rushes up, a white flash, one shake,
  whole again; the chip STRONG glows) · BE A DROP OF WATER (P2 2:46.7-3:08.1: inside the green spout, the round opening and the sky; out,
  the tilted windscreen rises from below; Splash! rings, the view against the glass; through it the two woven seats, large and sharp, beads
  of water on your side; the blue painted slope with the sky in it; the black wall of the tyre's grooves rushing past; a puddle, rings, a
  drain cover a little way off). The edges of the water view wobble all the way.
- **Hidden animals** (named by Heart with the drawn badge; the reveal rings them): the **mynah** on top of the TROLLEYS sign (`MYNAH`
  [250, 358]; it bobs, tilts its head, blinks) in every walkway shot, also the dimmed ones (at the reveal it hops twice, flaps once and
  nods); the **squirrel** on the low branch of the rain tree (`SQ` [1340, 442]; its tail flicks, it blinks) in every car-park shot that shows
  the tree (at the reveal it runs along the branch, sits up and flicks its tail). Neither is in a look-closer or a journey.
- **Thumbnails (new style, THUMBNAIL_V2.md; these are the files upload.json uploads):** `thumb_part1.jpg` = **GLASS TROLLEY?** (white /
  yellow; Basil surprised, EP11's glass trolley with the rice and two bottles in it, a pink-red burst, chip 1); `thumb_part2.jpg` =
  **WHY 4 MATERIALS?** (Momo surprised, the car, an orange burst, chip 2). No PART badge. Both at 320 px: `qa/thumbs.jpg`.
  Remake: `NODE_PATH=$(npm root -g) node ../thumb_v2.js ep12_1 ep12_2` (from `explained2/`). The script's old-style thumbnail words
  (section 7) are NOT used.
- **Deviations from the script / SCENES_TODO** (picture only): the trolley is seen from the side everywhere (the push-in "down through the
  side of the basket" is a zoom on the side view; the bars before / after are two side close-ups of ONE bar with its cross rods); the knock
  is side-on and its slow replay is the same view (no zoom) with the close-up as a round inset; the trolley stays loaded from `lcjob` on,
  except in the glide into BE THE METAL (empty basket, as the journey starts with the sack coming down); the camera "turn" to the
  aquarium shop is a pan and zoom; the trolley "from above" (cliffhanger, recap) is a plan view with the three bottles drawn upright in the
  flap section; the car is a side view in every wide shot (the "front quarter" view is not drawn; `allfour` is the side view, where all
  four parts show), the boot is at the car's left end; *We do not drop glass.* is a tag ON the glass bottle (a line from the side would
  have crossed the metal bottle); `things`: the hand carries each thing from the basket to its place (it lands at its mark), the tags
  stand above with a plain line; `fabric`: both tags stay, Pip's bag is plain lilac cotton with no name on it (a tag *Pip's bag: fabric*
  shows before the lift); `metalans`: EP11's boards left, the board MATCH THE JOB right, on the dimmed walkway; "Last time" (Part 1) stays
  on the stage; the Showdown, the fix, the big board and the dare stand on the dimmed, cleared car park (no car, so no car small print in
  `show`, `fix`, `board`; the game scene has none either); the chant's lines are on the left and the board on the right of them (behind
  nobody); the tip card stands on its own low stand; the watering can in `waitw` is held above the car's front.
- **Checks (stills only):** stills every 0.45 s of both parts: no page errors. `qa/p1_sheet.jpg`, `qa/p2_sheet.jpg` (a frame about every
  3 s), `qa/lc_p1.jpg`, `qa/lc_p2.jpg` (the five look-closers as strips), `qa/journey_metal.jpg`, `qa/journey_drop.jpg`, `qa/thumbs.jpg`.
  Cues re-dumped (unchanged counts) and both preview mixes rebuilt at -16.0 LUFS.
- **For Stage 3 to watch in motion:** (1) the hands: every hand is the same simple arm with a blue sleeve, moved by its fingertips (the two
  hands lowering the sack in `lcjob`, the push, the bag lift in `fabric`, the drop in `lcbottles`, the palm / press / knuckles in `lccar`,
  the boot lid at `bootshut`): check none pops or crosses a label; (2) the sack's landing at `rice` and the knock at `clang` / the slow
  replay's contact at `slowmo + .8` against their sounds; (3) the plastic bottle's fall (released at `land - .42`), bounce and roll, and its
  trip back to the table before `rest`; (4) the water on the windscreen (2.6 s from `pour`) and the can's tilt; (5) the magnifier following
  the guppy in `lctank` and the glide down / back; (6) the board's rows hopping on at `row1o` / `row1p` / `row1m` / `row2` / `row3` /
  `carrows` (during `lccar` the board is outside the window, so the car's rows are first SEEN in `mark2`-`board`: fine, but say so if the
  teacher asks) and the seven ticks; (7) the chant: the board's columns flash and the SUITABLE tag pops on line 3; (8) both reveals (the
  mynah's hop, the squirrel's run) and their rings; (9) the cliffhanger's PART 2 slam over the bottles' tags; (10) the journeys' cuts
  (the dips between the drop's stops are short: 0.2 s).

## Stage 3 (Opus): `./build_part.sh P` (timeline, cues, song, `flock /tmp/explained_render.lock node render.js P 3`, `finish.sh P`)
- Output `ep12_partP.mp4` (ignored), `ep12_partP.srt`, `sheet_partP.png`; check stills around every action mark, card, look-closer and reveal.
- A human listens to `qa/new_words_check.m4a` (Pip's read-along "Use." at 0:15.7 first) before upload.
- Thumbnails are DONE in the new style (Stage 2 above): `thumb_part1.jpg` (GLASS TROLLEY?), `thumb_part2.jpg` (WHY 4 MATERIALS?); look at
  `qa/thumbs.jpg` once more before upload. Do not remake them with the old `thumb.js`.
- Upload with `production/youtube/explained_upload.py ep12/upload.json` (Made for Kids, public, both playlists after EP11 Part 2's key
  `explained-p3-ep11-part2`; nothing replaced or retired: _gRJ0NwV6p0 stays).
- Status: see ../progress/ep12.json

## 22 Nov 2026: Stage 3 (Opus): rendered, checked, LIVE
- Rendered with `./build_part.sh 1|2` (10 s chunks in `out/chunks_p1`, `out/chunks_p2`; about 10-11 min a part, 3 workers). `ep12_part1.mp4`
  314.87 s (**5:14.9**), `ep12_part2.mp4` 314.83 s (**5:14.8**); 1920x1080 30 fps; both **-16.0 LUFS** (true peak -1.3 / -1.4 dBFS). No time
  added, no cut used, no mark moved: every fix below is picture only. Captions `ep12_part1.srt` (136 cues), `ep12_part2.srt` (133 cues),
  0 overlapping cues; contact sheets `sheet_part1.png`, `sheet_part2.png`. No page errors.
- **Checked** (frame strips from the rendered files, `qa/stage3/`; dense strips round every action mark): the cold open (EP11's three boards
  slide in; small print from 0.7 s); the calm recaps (P1 EP11's boards with their cards; P2 three pictures, one at a time, each with its label);
  the mynah / squirrel named by Heart with their picture ("a little mynah", "a little squirrel") and ringed at the end with Heart's pill
  ("It was on the trolley bay sign!", "It was on the tree by the cars!"); goal cards read by Momo (P1) / Pip (P2), each lifted and ticked;
  Mark Sentences read by the "Say it with me!" buddy (Pip, Basil; Basil, Momo) with the key word popping; lock-in clues above the ring through
  the countdown (P1 Round 1 "for heavy groceries" / "gets knocked"; HOLD ON! "glass: fragile" / "bad for a trolley" / "bad for everything?";
  P2 Round 1 "must not break when dropped" / "see the water inside"); the calm recap. In motion (from the drawing agent's list): (1) every
  hand (sack, push, bag lift, bottle drop / pick-up / return, palm, press, knuckles, boot lid, the can) - none crosses a label after the fixes;
  (2) the sack lands at `rice` on the thump, the trolley meets the bay's last trolley exactly at `clang` (129.25) and in the slow replay at
  `slowmo + .8` (132.75), each on its sound, then bounces back; (3) the plastic bottle is let go at `land - .42`, lands on its side at `land`,
  bounces, rolls, is picked up, turned (*no crack · no leak*) and back on the table before `rest`; (4) water streams down the windscreen
  from `pour`, the can tilted, the seats behind stay sharp; (5) the magnifier follows one guppy, the view glides to the dry shelf and back;
  (6) the board's rows hop on, the car's four rows first seen in `mark2`/`board`, the seven ticks at `ticks`; (7) the chant: PURPOSE /
  PROPERTY / MATERIAL columns flash on their lines and the green SUITABLE tag pops above MATERIAL on line 3; (8) both reveals and rings;
  (9) PART 2 slam (moved, below); (10) BE A DROP OF WATER's dips are soft 0.2 s fades and each stop's label then reads about 1 s
  (slope, tyre: short but clear); (11) the bottle look-closer (below). Verdicts held 2.5 s, readable; no glass breaks on screen (EP9's held
  picture only); small print where scripted (trolley rule, car rules, *We do not tap the glass.*, *We do not drop glass.*).
- **Fixed** (small, local; only the affected chunks re-rendered):
  - P1 cold open: the small print "Trolleys are for groceries, not for rides." sat on top of the place label (and the SUPERMARKET sign) ->
    `finePrint` on the floor, bottom middle (1180, 1010). Chunk 0-10 s.
  - P1 `lcjob`: the RICE sack dropped in .5 s from above the window (ease-in), so it popped in ahead of the two hands, which only showed
    after it had landed -> the hands lower it over 1.3 s (`closer.js` jobArt: blend of ease-in-out and linear, still landing ON `rice`).
    Chunk 50-60 s.
  - P1 `things`: the raincoat's tags ("plastic", "keeps you dry in the rain") hid the scissors' "metal" tag -> raised (y 436). Chunks 80-100 s.
  - P1 `fabric`: the lifting hands touched the end of "holds the rice" -> the tag 50 px left. Chunks 150-170 s.
  - P1 `fishnext`: after the turn to the aquarium Basil's disc covered the loaded trolley -> Basil at x 1260 (bottom middle), his bubble to
    his left. Chunk 200-210 s.
  - P1 `cliff`: the PART 2 slam covered the glass / metal tags -> it lands below the trolley (880, 905). Chunk 300-310 s.
  - P2 `lcbottles`: at the verdict push-in the tick table's row labels lost their first letters at the window's edge -> labels start at
    -766 (sizes 28 / 25, also in Mark Sentence 1's small picture); "At home, on a table: glass is fine." / "Handle it carefully." 26 -> 30 px
    and 45 px left. The bottles (scale 1.05) and *We do not drop glass.* (26 px, about 27 px on screen) read clearly at 1080p: unchanged
    (bigger would push the tag over the plastic bottle's green ring). Chunks 50-110 s.
  - P2 `board`: the book strip "...whose physical property" ran under the SUITABLE shelf pill (its last letter hidden) -> both lines 70 px
    lower (320 / 410). Chunks 230-250 s.
- Not changed (noted): the key word's fly to the shelf passes over the Mark Sentence's small picture for a moment (as before); the glass
  scene's book strip touches the top edge of EP11's glass board (its FRAGILE chip stays readable); in the two walkway / car-park buddy shots the
  trolley bay's wheels sit behind Pip's disc and, in the dimmed `bottleans`, the parked trolley behind Momo's (background only); the hand in
  `things` passes over the scissors' tag line (not the tag) for a moment; the plastic bottle is carried in front of the other two on its
  way out and back; the chant's SUITABLE tag shows only while line 3 flashes (by design); EP11's metal board with RIGHT FOR THE JOB in
  `lcmetal` shows 1.3 s (the verdict METAL: STRONG holds 2.5 s).
- **Listen check (not done by ear here):** Pip's read-along "Use." (should be "yooss", `qa/new_words_check.m4a` 0:15.7) and Heart's
  "fragile" in g805 (FRAJ-ile) were machine-checked in Stage 1 (right sound, soft final "s" for Pip); no re-record. A human should listen once.
- Thumbnails: the new-style `thumb_part1.jpg` (GLASS TROLLEY?) and `thumb_part2.jpg` (WHY 4 MATERIALS?) read well at 320 px (`qa/thumbs.jpg`);
  uploaded as they are.
- Uploaded with `upload.json` (checked against ep11/upload.json and the live EP11 keys in explained_uploaded.json; Made for Kids, public; both
  playlists PLb8LpPqxQI4E (positions 23, 24) and PLPfEuT7l4KjI (41, 42) right after EP11 Part 2 q2KJp6lKln0 via `explained-p3-ep11-part2`;
  **no "replaces", no retire_old**: the classic _gRJ0NwV6p0 stays in both playlists, right after EP12 Part 2, untouched).
  **Part 1 https://www.youtube.com/watch?v=G03-LFQEld8 , Part 2 https://www.youtube.com/watch?v=ussXaa1fQUQ .**
- Left for the teacher: listen to Pip's "Use." and Heart's "fragile" (above); watch the five look-closers, both journeys and the mynah /
  squirrel reveals. The School Lab 3.7 line stays out of the descriptions until that lab is signed off.

## Teacher fixes, 22 Nov (drawing only; Stage 3 must re-render the chunks listed; nothing rendered or uploaded here)
No timeline mark, word or sound cue moved (`tl_p*.json`, `sound_cues.js`, `script.py` untouched). Files: `tests.js`, `common.js`, `p1.js`, `p2.js`.

### 1 · The trolley board ("change the object to a trolley instead of a whiteboard. A glass trolley episode.")
- **`matchBoard` (tests.js) is now a big supermarket trolley** in the episode's own trolley art (`trolleyFrame`: walk.js's MET / METD / METL
  metal, the wire grid, the red grip, the dark wheels on their forks) with the chart MATCH THE JOB **clipped to the side of its basket** (two
  metal clips over the rim). Wheels on the ground; origin = the ground under the basket's middle. The cream whiteboard on legs is gone.
- **The chart is laid out per part so the words are big** (`MBL`): Part 1 = two tall rows (words 36 units, purposes 34, chips 30, chips
  stacked); Part 2 = seven rows of different heights (words 27, purposes 26, chips 25 side by side, "does not break easily" on its own line).
  Cells still appear at `ROWT()` and ticks at `tickT()`; `o.col` / `o.flash` / `o.row` / `o.good` work as before.
- **Sizes on screen** (trolley + chart width; smallest table word at 1080p): P1 `nyk` 1200 px = 62 % (words 29 / 27 px, chips 24 px);
  P2 `board` 1457 px with the chart 1231 px = 64 % (25 / 24 / 23.5 px: the seven rows cannot reach 26 px in that height under the two caption
  lines); P2 `nyk` 1209 px = 63 % (21 / 20 px: seven rows under the title); P2 `chant` 1054 px (18 px); in the wide walkway / car-park
  shots it is set dressing (P1 .45, P2 .32) and is read in the board scenes above.
- **Scenes re-laid for it:** `nyk` both parts (discs 220 px at the sides: Pip 125, Momo 1578, Basil 1800; the trolley centred in the free
  space between them, never behind a disc; the YOU hands and tag above Pip; "Say it with us!" a little higher: `nykScene` takes `bh`, `sayY`);
  P2 `board` (the trolley at .94, the two book lines at 306 / 388, 43 px); P2 `chant` (lines top left, discs 200 px bottom left, the trolley on
  the floor at the right at .68, YOU hands above it, the bubble over the discs: `chantScene` takes `xs`, `bh`, `tx`, `ty`, `sayX`, `sayY`);
  P1 walkway `BDX` 1220; P1 `mark1` .42; P2 car park `BDS` .32, `BDX` 1640.

### 2 · The hidden-animal moments ("from the real scene, directly zoom into the animal, then the other objects pop out ... no unnecessary cutting")
- **`gameScene` (common.js) no longer cuts to the purple stage.** It takes `R = { world, A, T, Z, pre, dim0, ... }`: the real place stays,
  ONE push-in (`pushCam`, ease in-out, 1.1 s) carries the animal to its place on screen (mynah x3 to 1330, 470; squirrel x2.6 to 1360, 500),
  the rest softly dimmed round it (`spotDim`); the scene before's small discs, rule lines, caption and title words slip away in .3 s; the score
  pill GLIDES from its corner to the middle. Then the game's things pop out over the zoomed place, each on its old word (never before the push
  has landed): the YOU hand(s) / ring and "You lock in first" with a sparkle (`popSpark`), the buddy discs, the name label
  (`animalLabel`: "a little mynah / squirrel" with a tail, standing by the REAL animal; the picture-in-a-circle badge is no longer used
  here), "Can you spot it?".
- **`lizReveal`**: the picture melts from the score hand into the real place (`o.from`, .45 s, no jump cut), pushes in as before, and the
  ring POPS round the animal on its name (with the sparkle cue) instead of being there from the first frame.
- **P2 `dare`**: its first .8 s pulls back from the squirrel's branch to the whole car park while it dims (same place: no cut).
- Still cuts (card screens, not the real place): game -> goals (both parts), P1 reveal -> key-word recap.

### Changed scenes and the 10 s chunks to re-render
| Part | Scenes (time) | Chunks (index = floor(t / 10)) |
|---|---|---|
| P1 | `board` 22.32-24.86, `title` 24.86-27.26, `game` 27.26-36.84 | 2, 3 |
| P1 | `trolley` 50.77-54.61, `lcjob` 54.61-75.31, `mark1` 75.31-85.81 | 5, 6, 7, 8 |
| P1 | `lcmetal` 114.57-142.71 | 11, 12, 13, 14 |
| P1 | `metalans` 164.63-170.81 | 16, 17 |
| P1 | `tankrow` 232.52-237.05, `waitw` 237.05-241.04 | 23, 24 |
| P1 | `pullout` 264.30-265.10, `liz` 272.93-278.59 | 26, 27 |
| P1 | `cliff` 289.33-303.13, `nyk` 303.13-314.84 | 28, 29, 30, 31 |
| P2 | `place` 9.57-11.57, `game` 11.57-17.32 | 0, 1 |
| P2 | `lcbottles` 55.44-89.36, `bottleans` 89.36-97.91 | 5, 6, 7, 8, 9 |
| P2 | `boot` 109.60-114.07, `lccar` 114.07-147.77 | 10, 11, 12, 13, 14 |
| P2 | `waitw` 162.30-166.67 | 16 |
| P2 | `board` 230.88-240.58, `chant` 240.58-262.43 | 23, 24, 25, 26 |
| P2 | `liz` 270.04-275.63, `dare` 275.63-276.43 (the pull-back only) | 27 |
| P2 | `nyk` 303.09-314.81 | 30, 31 |

### Checks (stills only)
- Stills every 0.45 s of both parts: no page errors.
- `qa/trolley_board/pP_<time>.jpg`: before (left) / after (right) of every affected scene, both parts (67 pairs).
- `qa/trolley_board/check_320px.jpg`: P1 `nyk`, P2 `board`, P2 `nyk`, P1 `waitw` at 320 px.
- `qa/trolley_board/strip_p1_game_pushin.jpg`, `strip_p2_game_pushin.jpg`, `strip_p1_reveal.jpg`, `strip_p2_reveal_pullback.jpg`: frame strips
  of the new transitions.
- Not done here: no video rendered, no sound mixed, nothing uploaded. The thumbnails and `sheet_part*.png` still show the old board until
  Stage 3 re-renders.

## 22 Nov 2026: teacher's-eye review, re-render and re-upload (EP12 v2, Opus; LIVE)
- **Review** (a separate Opus agent, not the drawing agent): `NOTES_REVIEW.md`. The trolley reads as a trolley on its wheels everywhere,
  centred and behind no disc in `nyk`; both push-ins are one smooth shot that lands on the animal; the reveals melt in, push in and ring the
  animal; the P2 `dare` pull-back has no jump. Fixed in the drawing code (no mark, word or sound cue moved):
  - P2 `chant`: the chart .68 -> .88 (words about 18 -> 23-24 px), discs smaller in the bottom-left corner (bh 165 at 100 / 305 / 510), chant
    lines higher (y0 185, dy 92) so the trolley's grip clears line 3, YOU hands + YOUR TURN! at (1100, 300) scale .8 (`chantScene` takes
    `o.ts`), the bubble at (330, 750).
  - P2 `nyk`: the trolley .78 -> .90 at x 880 (words about 21 -> 24-25 px); Pip 110, Momo 1625, Basil 1820 (bh 200), YOU hands at 110,
    "Say it with us!" at y 330.
  - P2 car park: `BDS` .30, `BDX` 1660, `BDY` PGROUND - 12: the trolley's wheel clear of Momo's disc and its red grip off the metal bottle.
  - P1 `game`: the mynah lands at x 1400 (the score hand no longer covers the sign's "T"); the small lock-in ring at (200, 470) left of the
    answer hand (it sat on the TROLLEYS sign); "+1" at (880, 470); "Can you spot it?" at (1730, 430) off the mynah's beak.
  - Noted, not changed: in P1 `waitw` and P2 `boot` / `waitw` the camera's push lets the frame cut the board's right end and Momo's disc
    touch its rim for about 2 s (background, as with the old whiteboard).
- **Re-rendered in full** (`./build_part.sh 1|2`, chunks cleared first): `ep12_part1.mp4` 314.87 s (5:14.9), `ep12_part2.mp4` 314.83 s
  (5:14.8), both **-16.0 LUFS**; timelines identical to before, so `ep12_part1.srt` / `ep12_part2.srt` are byte-identical (no overlaps);
  new `sheet_part1.png`, `sheet_part2.png`. No page errors. Frames of every changed scene from the finished mp4s: `qa/stage3_v2/`.
- **Re-uploaded** with `upload_v2.json` (keys `explained-p3-ep12v2-part1/-part2`; same titles, descriptions, tags and new-style thumbnails;
  `replaces` G03-LFQEld8, ussXaa1fQUQ, `retire_old`): **Part 1 https://www.youtube.com/watch?v=vqSehdxTCg8 , Part 2
  https://www.youtube.com/watch?v=D2U_Zom1Wzs**. Both playlists now run EP11 P2 (q2KJp6lKln0) -> EP12v2 P1 -> EP12v2 P2 -> EP13 P1
  (FO1Y_KSZU-c) -> EP13 P2 (8lQ1-1ruveY) (PLb8LpPqxQI4E 22-26, PLPfEuT7l4KjI 40-44). The old two are out of the playlists, still public,
  each with a first line "▶ NEW VERSION: ... vqSehdxTCg8". The classic _gRJ0NwV6p0's first line now reads "choosing materials
  https://www.youtube.com/watch?v=vqSehdxTCg8 · design like an engineer ..." (only that line edited).
- Episode guide (`production/episode-guide/gen.mjs`, `explained-episode-guide.html`) carries the new IDs.

## v3, 22 Nov — awaiting teacher's OK; not uploaded (Opus redo to the EP1 standard)
The teacher on v2: "Quality really dropped quite extensively"; "ALL these are important and you did not make these mistakes when creating
episode 1." Every 22 Nov rule applied (picture, layout, animation, sound); the full list, old -> new per rule and per scene, with the EP1
match: `NOTES_REVIEW_V3.md`. Previews for the teacher (nothing uploaded; the live v2 stays live): `qa/preview_p1_before_after.jpg`,
`qa/preview_p2_before_after.jpg`, `qa/preview_p1_clips.mp4`, `qa/preview_p2_clips.mp4`, `qa/teachers_eye_p*_old_new_ep1.jpg`,
`qa/countdown_p*.jpg`. The v2 renders are kept as `out/ep12_part1_OLD.mp4`, `out/ep12_part2_OLD.mp4` (ignored).
- **The one word change (teacher, 22 Nov, on the mynah reveal: "It must be a fun fact which most children are shocked to find out!"):**
  g1302 / j1202 split; Basil's new lines g1302f "Here's a fun fact! Mynahs build their nests from dry grass, twigs, string, and even bits
  of plastic!" and j1202f "Fun fact! A squirrel's nest has strong twigs outside and soft leaves inside. Different materials for different
  jobs!", then Heart g1302t / j1202t "Tell someone at home!" (make_voice.py; Basil's two takes are spread by length: pocketsphinx could not
  align "Here's" / "squirrel's"; the mouth track is from the audio). script.py and p3_ep12_script.md (rows + section 12 note) updated.
  To stay near 5:20, picture-only waits were trimmed: P1 the title's hold 2.4 -> 1.8 s, the cliffhanger's end .9 -> .6, the reveal's pre
  .6 -> .4; P2 the car park's opening 2.0 -> 1.3 s, the journey's end 1.5 -> 1.2, the reveal's pre .5 -> .3, the fact shortened.
  **Rendered: `ep12_part1.mp4` 320.13 s (5:20.1), `ep12_part2.mp4` 321.03 s (5:21.0), both -16.0 LUFS; 1920x1080 30 fps.** All marks after the reveal moved with the timeline (the picture and the
  sound key on marks, so they moved together); `.srt` rebuilt by finish.sh (no overlaps).
- **New / changed files:** `v3.js` (new: fun-fact cards and nests, `lcPeek`, `riders`, `partTag` / `PARTC`, `numBadge`), `lib.js` (`reactAt`
  never-frozen reactions, `jolt` / `JOLT` / `impactFX` / `faceCam`, ring drains in steps and the number pops, `SHELF_WIN`), `common.js`
  (`lockN` rewritten: the countdown takes the stage, `choiceCard3`, `clue3`; `iris`; `gameScene` / `lizReveal` circle + stage; goals, count,
  score hand, read-along sizes), `canteen.js` (`BUDL` set buddies 1.5x), `closer.js` (`lookCloser` takes `peek`, `jolt`, `fxs`; bigger
  `jobArt`; named bottles; colour-coded car), `shrink.js` (YOU presence, riders, impacts, Basil's / Pip's face), `trail.js` (`adultHand`:
  four fingers and a thumb), `walk.js` (`carSide` `o.pc` part colours; the car park's trolley at `TRPX` 330), `p1.js` / `p2.js` (scene by
  scene), `main.js` (`window._S`), `page.html` (v3.js), `song.js` (the place beds + foley; `AMBK`), `sound_cues.js` (iris whooshes, the fact's
  pop and sparkle, the impact thuds, the splash). `spr/` rebuilt with `prep_sprites.py` (Momo's and Basil's back views).
- **Sound:** the place bed (`song.js`, after "ambiences"): measured on the stems about 15 dB under the voice in the walkway (AMBK 12),
  ducked under speech; both mixes -16.0 LUFS. A human should listen once.
- **Countdowns measured in the renders** (`qa/countdown_p*.jpg`, NOTES_REVIEW_V3): numbers step once a second on the tock, bell on 0
  (0-3 ms). The game bed now stops for every countdown (`song.js`): its 104 BPM beat was what made the rhythm feel off.
- **Render notes:** Part 2's first render died with the disk full (22 Nov, about 07:50; the coordinator freed space); re-rendered in full,
  every chunk checked with ffprobe (33 x 10 s). Chunks deleted after muxing. Part 1's HOLD ON! chunks (180-210 s) were re-rendered once for
  the clue line that crossed the number badge.
- **Not uploaded.** `upload_v2.json` is the live set; a v3 upload needs the teacher's OK, then an `upload_v3.json` with `replaces` the v2
  IDs (vqSehdxTCg8, D2U_Zom1Wzs) and `retire_old`.

## 22 Nov: v3 LIVE
Teacher: "so much better!" / "upload the change into the new episode now". Uploaded v3: Part 1 3gryN39MnNY, Part 2 sAaYWPH8L90 (upload_v3.json). Replaced v2 vqSehdxTCg8 / D2U_Zom1Wzs (out of the playlists, first line points to the new part 1). v1 G03-LFQEld8 / ussXaa1fQUQ and the classic _gRJ0NwV6p0 now point straight to 3gryN39MnNY. Known small limits left: car under Mark Sentence 2 small, ending buddies partly cropped, empty corner in the bottle look-closer.
