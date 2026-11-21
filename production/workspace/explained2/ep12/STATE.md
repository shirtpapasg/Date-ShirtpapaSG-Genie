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

Three stages: **Stage 1 (setup, done 2026-11-21, Opus)** · Stage 2 (drawing, Fable) · Stage 3 (render, checks, upload, Opus).

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

## Stage 2 (Fable): draw every `phScene` / `lcPH` / `ringPH` / `hiddenPH` placeholder; keep the marks (or move a mark in script.py and rebuild)
- After any change: `python3 build_tl.py 1 && python3 build_tl.py 2 && python3 make_todo.py`, `NODE_PATH=$(npm root -g) node dump_cues.js P &&
  node song.js P` (mixes), and stills: `PART=1|2 ./sheet.sh name cols t1 t2 ...` -> `qa/name.jpg` (prints page errors); one expression:
  `node probe.js out.jpg 1 '<js>'`; bake sets: `node bake.js walk park`.
- Keep each part at about 5:15 or under; the cut candidates are listed above.

## Stage 3 (Opus): `./build_part.sh P` (timeline, cues, song, `flock /tmp/explained_render.lock node render.js P 3`, `finish.sh P`)
- Output `ep12_partP.mp4` (ignored), `ep12_partP.srt`, `sheet_partP.png`; check stills around every action mark, card, look-closer and reveal.
- A human listens to `qa/new_words_check.m4a` (Pip's read-along "Use." at 0:15.7 first) before upload.
- Thumbnails (script section 7): Part 1 white A TROLLEY, sun-yellow MADE OF GLASS?! (the three dare boards and the real loaded trolley; Basil
  cheering left); Part 2 white ONE CAR, sun-yellow 4 MATERIALS! (the whole car with its four label lines; Momo surprised left):
  `node thumb_still.js N t qa/th/fN.png` then `node thumb.js qa/th/fN.png thumb_partN.jpg N "WHITE" "YELLOW"`.
- Upload with `production/youtube/explained_upload.py ep12/upload.json` (Made for Kids, public, both playlists after EP11 Part 2's key
  `explained-p3-ep11-part2`; nothing replaced or retired: _gRJ0NwV6p0 stays).
- Status: see ../progress/ep12.json
