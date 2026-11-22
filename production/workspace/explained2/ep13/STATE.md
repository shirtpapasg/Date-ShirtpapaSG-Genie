# EP13 build state (for a resume after a restart)
P3 EP13 "Design a school bag like an engineer" (P3 book Ch 3, p. 66 + Theme Closure, pp. 70-72): Part 1 "A METAL Strap? Design a School Bag
Like an ENGINEER" (EP12's dare answered; what engineers do; the design steps, unnumbered; design a school bag) and Part 2 "We TESTED Our New
Strap. Then We Designed a ZOO Home!" (the test, 5 weights vs 9; a goat home; Basil's zoo map; why variety matters). The script:
`../p3_ep13_script.md` (version 1, 21 Nov 2026; the teacher's go-ahead in its section 12, "use your recommendation": (a) the five design steps
unnumbered, Heart says only "First" and "Last"; (b) fabric straps and body, a metal zip, a plastic base; (c) nothing tears on screen (the old
strap = a held picture, the new strap stops at 9); (d) testing is "After designing, engineers test their product", not a sixth step; (e) a goat
home with a wooden fence at "a zoo in Singapore", unnamed; (f) D3 answered with the extinction sentence 1.22 + "So we take care of every kind.";
(g) butterfly and frog; (h) Part 2 key words TEST, DIVERSITY, EXTINCT; (i) EP14's dare card one "the Sun moves away"; (j) **on upload EP13
replaces the classic _gRJ0NwV6p0** ("Why That Material? A Glass Trolley And Other Bad Ideas", pp. 59-72; retire_old; its NEW VERSION line points
to EP12 and EP13); (k) the School Lab 3.8 line stays out until signed off; (l) no extra test clips unless a problem is heard).
EP12 is live (its playlists' anchor for EP13: `explained-p3-ep12-part2`; EP12 Part 1 = G03-LFQEld8, Part 2 = ussXaa1fQUQ).

Three stages: **Stage 1 (setup, done 2026-11-22, Opus)** · Stage 2 (drawing + thumbnails, Fable) · Stage 3 (render, checks, upload, Opus).

## Stage 1: done
- **No script change was needed** (the teacher's answers are the script's own recommendations). `p3_ep13_script.md` is untouched.
- **Engine copied from `ep12/`** (as it stands after EP12's Stage 3) with the 21 Nov fixes kept: buddies read the goal cards (`goals3`) and the
  Mark Sentences (`markScene`), lock-in clues on top of the ring and kept through the countdown (`lockN` `c.labels`), the calm recap, the named
  hidden animal (`gameScene` + `hiddenBadge`, `lizReveal`), the look-closer frame (`closer.js` `lookCloser`, `lcLab`, `lcTag`, `lcVerdict` with
  `{ink, edge}` / `{plain, vx}`, `lcStrip`, `lcClock`, `slowTag`), `roundCard`, the "Now you know!" ending; **every action sound hung on the
  action's own mark** (script.py has a mark for each lay, clip, book, lift, zip, set-down, drop, hop, weight, push and hand move; sound_cues.js
  uses them and says so at its top); **the respelling option** (script opt `pron`, make_voice.py `LINE_PRON`, also for `unison` lines: used once,
  j902 "macaw" -> "mcaw"); **finish.sh's fix** (the contact-sheet line; ep13 names; EP13 marks for the stills). Not copied: EP12's art (walk.js;
  only its three school-bag dare boards, see below), its five look-closer arts (closer.js is EP12's Stage 1 frame), its journeys (shrink.js =
  helpers only), its baked walkway / car-park sets, ep11dare.js, ep09drop.js, out/, mp4/wav in git, EP12's voices (only the ritual lines,
  copied unchanged: h501, h860, h864, h1304a/o/t, h1305, u1300, u1305, u1002). `bg/`: stage, stage2, daystage, _grain.
  - **Reused real art:** `ep12dare.js` = EP12's three school-bag dare boards (`PIC.bagFabric`, `PIC.bagMetal`, `PIC.bagWood` with `bagS`, `STRAP`
    and the gradients `wSteel` / `wWood` in `XDEFS12E`), copied unchanged from ep12/walk.js (p1.js `dareBoard`): the cold open's boards, `back`,
    the recap, Round 1's cards, the answer `strapans` with SUITABLE / NOT FOR THIS JOB on them, Mark Sentence 1's under-picture. **Their bag is
    pink (#FF8FB1); the script's real bag is plain orange**: Stage 2 draws the real bag orange (the boards are pictures from last time).
  - Changed shared code (in ep13/ only): `lib.js` (EP13 `KW`, `KWLINE`, `SHELF_HIDE` with the five `lc*` scenes; ENGINEERS in `engineers`, DESIGN
    beside Mark Sentence 1 after the card, INTENDED USE inside `lcbag`; TEST inside `lctest`, DIVERSITY under the strip D3, EXTINCT beside Mark
    Sentence 2 after the card; all `o.at`), `common.js` (EP13 chant words `PHR` / `PCOL`, `chantFlash` -> the board's boxes 1-4 / box 5 + SUITABLE /
    THEN: TEST IT by chant slot), `song.js` (`flutter`, `ribbit`, `meh`, `plip`, `pff`, `thup`), `main.js` (picks up `XDEFS12E` and a Stage 2
    `XDEFS13`), `make_voice.py` (EP13 notes; EXTRA "mcaw", "koi", "dragonfly", "goldfish"), `finish.sh`, `page.html` (ep12dare.js), `closer.js`
    (EP12's Stage 1 frame), `shrink.js` (helpers).
  - `tests.js` rewritten for EP13: the two answer colours (`GOODC` SUITABLE green with a tick, `WEAKC` NOT FOR THIS JOB blue; `jobTag`), `VSTYLE`
    (and `"sun"`: sun-yellow letters on cream with a dark-violet border, for ONE BAG · FOUR PARTS · FOUR USES), the property chips (`CHIPC`,
    `propChip`, `chipAt`), the board OUR DESIGN PLAN (`BOXES`, `PLAN_TILES`, `PLAN()`, functional placeholder `planBoard(t, {flash, small})`: five
    boxes with NO numbers that glow and fill on their marks, the four fabric tiles of the HOLD ON!, the card THEN: TEST IT beside the row, wiped and
    refilled for the goat home in Part 2), Basil's map (`MAP_LINES`, `MAP_FIX`, `zooEasel`), the zoo (`ZONES`, `zooMap`), the p. 70 map
    (`chapterMap`), `HIDDEN` (butterfly / frog placeholders) + `hiddenBadge`, `lcPH`, `ringPH`, the small print (`smallPrint`, `FORCE_RULE`,
    `WEIGHTS_RULE`, `GOAT_RULE`), `DARE_CARDS`, `DARE_LABEL`, `DARE_CLUES`, `NEXT_CARDS`, `weightsPill`.
- **`script.py`**: both parts as data, every line word for word, with the dare names of section 3 resolved (Block A: `{DARE_Q}`, `{DARE_SHORT}`,
  `{CARD2_PICK}`, `{CARD3_PICK}`; Block B: `{NEXT_DARE}`, `{NEXT_JOKE}`), checked by script against the markdown both ways (all 130 spoken quotes of
  sections 4-5 are in script.py with their speaker; every script.py line is in the markdown; `{DARE_Q}` is said as two Heart lines g202 + g203,
  words unchanged, so the cards can have 1.8 s between them without long gaps inside the question; the chant is `CHANT`). Two-speaker cells are
  split one line per speaker. `CUTS` holds section 6's cut tags (none used).
- **Voices** (`voice/`, 121 lines: 111 recorded for EP13 + 10 ritual lines): `/home/user/heart-tts/venv/bin/python make_voice.py` keeps finished
  files and re-records only lines whose text or voice options changed. Pace: Heart .90, .5 s between sentences; a new-term sentence x.93 and
  >= .65 s after it ("That is what engineers do!" g701, "its intended use" g804, "engineers test their product" j505, "maintain diversity" j1002);
  journeys .85, 1.0 s (j604's count .7 s), softer; LOOK CLOSER .85, .8 s between sentences (the counted weights j502 / j503 .35 s, so each weight
  lands about 0.8-1.0 s after the last); buddies (Character Voice Kit) x.88; the two-sentence Mark Sentence cards .6 s between sentences; the recap
  g203 1.8 s between the cards, 2.4 s after (each board >= 2.5 s: 2.66 / 2.55 / 2.70 s). Every text goes through `../sg_pron.py` (`_FixK`): no
  EP13 line is on the list (checked: needs_fix false for every line). All lines aligned. Chant: EP7's call and response (`BAR` 3.2 s, the answer on
  the stomp, 3 lines + YOUR TURN!, no all-together bar; Basil's call louder).
- **The checked words** (script section 10 H / question (l); `check_words.py` -> `qa/new_words_check.json`, `qa/new_words_check.m4a` 1:18 with
  its index `qa/new_words_check.txt`): Kokoro's phonemes are the script's targets in every voice (all four voices use en-us): **engineers**
  ˌɛndʒɪnˈɪɹz "en-juh-NEERZ"; **use** (the noun, in "intended use", "its own use", "the intended use of the object" and the read-along) jˈuːs
  "yooss" ("used" in 3.30 stays the verb); **diversity** daɪvˈɜːsᵻɾi (the British "dy", as in EP1); **extinct** ɛkstˈɪŋkt "ek-STINGKT";
  **salamander** sˈælɐmˌændɚ "SAL-uh-man-der" (the voices' American r; the script's "-duh" is the British form; no respelling: "salamanda" moves
  the stress to "MAN"); **macaw**: Kokoro says mˈækɔː "MAK-aw" (stress on the wrong syllable for the script's "muh-KAW"), so **Basil's j902 says it
  as "mcaw" = məkˈɔː** (opts `pron`; the caption keeps "macaw"). Machine listen (pocketsphinx choosing between the right sound and a wrong one,
  three trims, majority; Praat for the final "s" of "use"): right for every Heart take of every word, for Basil's and Momo's "engineers", every
  "diversity", Basil's and Momo's read-along "Extinct.", "salamander" and "macaw" (muh-KAW, rrr); every "use" ends unvoiced (an "s", not "yooz")
  where the take ends on it (j802 runs on into "of"; decoded right). **To listen to first** (the decoder flags them; they measure fine): Pip's
  read-along "Engineers." (0:29.6; Pip's voice is shifted up and decodes poorly, as in EP12), Basil's read-along "Intended use." (0:45.5; its last
  90 ms unvoiced: "s"), Momo's "will become extinct" in Mark Sentence 1.22 (1:02.4; a phone decode hears "...NG IH K T"), Pip's read-along
  "Extinct." (1:07.4). **No word came out wrong, so no other line was re-spelt.** If a human hears one wrong: add a `pron` to that line (a `unison`
  line takes one too) and re-run make_voice.py, then build_tl.py (only that line is re-recorded).
- **Timelines**: `python3 build_tl.py 1|2`. **Lengths (Stage 1): Part 1 5:14.8 (314.8 s), Part 2 5:12.5 (312.5 s)**, both under about 5:15 WITH
  the five look-closer holds (verdicts 2.5 s). No cut was used; in Part 1 Stage 1's own picture-only waits were kept short to get under 5:15 (the
  first build was 5:19.4): the straps laid on Heart's words, the bag filled in 3.5 s, the drawing 2.8 s speeded up, .15-.2 s between the
  look-closer lines, the title 2.2 s, the pull-out .6 s.
  **Cut candidates if Stage 2 adds time** (script section 6, in its order; never teaching, never a look-closer, a journey step or the pauses round
  new terms): Part 1 the title's second slam (`title2`, picture only), `ouch` g606 Basil "Oops. A metal bar on my shoulder? Ouch!" (about 3 s;
  he does the oops pose in silence), `shoulder` (g603 without "No good on a shoulder!", about 1.5 s; re-record g603), `thousand` (g1401 shortened
  to "Our design is done!", about 1.5 s), `soak` g1006 (last of all; then the tag *Fabric soaks up water* shows, wired). Part 2 `wings` j908 (about
  2 s), `map` (Basil reads only "My zoo map!" and line two: about 6 s; re-record j902), `variety` (j1001 shortened, about 1.5 s), `notglass` j706
  (the card and its tag still show), `nap` j1302 (last). Never: j505 "After designing, engineers test their product." and j1005 "So we take care
  of every kind.". If a Basil line is cut, cut one of Momo's or Pip's as well.
  Lines by speaker (goal cards counted one by one; "Say it with me!" counted): Part 1 Basil 10, Pip 5, Momo 2; Part 2 Momo 8, Basil 7, Pip 2.
- **Sound**: `sound_cues.js` (EP13's cues on the same words and marks as the picture) -> `node dump_cues.js P` (215 / 206 events, no bad times,
  no unknown kinds) -> `node song.js P` -> `out/mix_pP.wav`, both **-16.0 LUFS** (true peak -1.5 dBFS). New: `flutter` (the butterfly: the game,
  the reveal), `ribbit` (the frog), `meh` (the goats), `plip` / `pff` (the drops on plastic / fabric), `thup` (each book); every zip is
  ep09_zip.wav ON its mark (zip1, u_zip, zo1..zc2, jzipclose); a tok + a counter click ON each weight (w1..w9); the fan's hum in the cold open;
  `birds` softly outside the classroom and in the garden, `tank` as the pond's trickle; a far school bell.
- **`p1.js` / `p2.js`**: shared routines wired (Part 1: the cold open's real boards sliding in, the calm recap of EP12's dare with EP12's boards
  stepping forward and their cards lighting, `back` with the pill, the title slam A METAL STRAP? / DESIGN IT LIKE AN ENGINEER!, game, goals read by
  Basil, countdown, Round 1 with the boards on the cards and the clue labels must bend · must not tear on top of the ring, the answer with SUITABLE /
  NOT FOR THIS JOB on the real boards, Momo's bubble, Mark Sentences read by Basil (DESIGN after the card) and Pip (the tag *function = the job of a
  part*), the board OUR DESIGN PLAN as a functional placeholder (sliding in, glowing and filling on its marks; small inside the look-closers), the
  HOLD ON! ring with the bag and three clue labels on top of the ring and the four fabric tiles hopping to the last box and back, Basil's wet-floor
  picture, the speeded-up clock, Pip's correction, the cliffhanger's THEN: TEST IT, ? and PART 2 slam; Part 2: the three-picture recap with labels,
  game, goals read by Momo, Round 1 (three clue labels on top of the ring), the test's two counters counting ON each weight, the answer with Momo,
  the board wiped and filled for the goat home, Basil's "Not glass!" with the blue tag, Mark Sentences read by Basil (the p. 70 map under it) and
  Momo (EXTINCT after the card, the glow on all twelve animals), the Showdown's easel MY ZOO (lines lit as Basil reads, the dragonfly to a green
  line 4), ring, stamp and picks, the full zoo map with the strip D3, the chant with the board's parts flashing, score hand, the EP14 dare cards and
  banner, read-along, "Now you know!"); every new-art scene is a `phScene` placeholder naming what to draw, and each of the five [LOOK CLOSER]
  moments (`lcstraps`, `lcbag`, `lcdraw`, `lctest`, `lcgoat`) is an `lcPH` placeholder inside the real look-closer frame (push-in, dim, window,
  LOOK CLOSER tag, the verdict at its `v_*` mark, a NOW: label naming the current picture beat; the small print wired in `lcstraps`, `lctest`,
  `lcgoat`; the location pill *A zoo in Singapore* in `lcgoat`).
- **`SCENES_TODO.md`** (generated: `python3 make_todo.py`; re-run after any timeline change): every scene's time range, what to draw, what to
  reuse, what is new, its marks and lines (with times); the poses; the choices made where the script was unclear.
- **Checks**: `qa/p1_check.jpg`, `qa/p2_check.jpg` (placeholder stills at every scene start and middle and after every mark: 134 + 106 frames):
  no page errors. No video rendered.
- **`upload.json`** written for Stage 3 (ep12's shape): titles and descriptions from script section 7, playlists PLb8LpPqxQI4E and PLPfEuT7l4KjI
  **after "explained-p3-ep12-part2"** (EP12 Part 2 ussXaa1fQUQ), **"replaces": ["_gRJ0NwV6p0"], "retire_old": true** (the teacher's answer (j):
  with EP12, EP13 covers pp. 59-72). The School Lab 3.8 line is left out of the descriptions until that lab is signed off.

### What Stage 2 (drawing) must draw
Sets: the Primary 3 classroom after school (rows of desks with bag hooks, chairs with rounded top rails, the teacher's table, a whiteboard, ceiling
fans turning slowly, glass louvre windows, the corridor's potted plants; mid-afternoon, bright) and the school's eco-garden (a shelter with a table
and benches, planter boxes, a small pond with lily pads, the classroom block behind), plus the goat home at a zoo (a pen of rounded wooden rails on
posts, a shelter, hay, a water trough, a gate; three small goats with idle loops and the push), used only in `lcgoat`. Props: the real school bag
(plain orange, two padded straps, a metal zip with a metal pull, a moulded plastic base, a blank name-tag window): torn strap; whole; hanging on a
chair; lifted by its strap; set down on the floor; its four parts lit one by one; open with five books inside; a cut-away for the journey); five
exercise books; the three candidate straps (woven fabric strap, flat metal bar, wooden stick; on the table, over the chair's rail, the fabric one
clipped to the bag); a classroom chair; an adult's hands (and a gloved hand for the weights); the board OUR DESIGN PLAN on its low stand with small
picture tiles and the card THEN: TEST IT (replace `planBoard`, keep its marks); the hard-hat card; the wet canteen floor picture; the paper and the
pencil drawing with four label lines; the sample tiles, the dropper and the two drops, the short metal zip; the finished drawing on a small easel;
EP9's test stand with the two straps, the padded tray, the weights and the two counters (ep09/voiddeck.js `testStand`, `hangerSvg`, `counterPill`,
`glovePinch`), the old strap's held picture (torn, 5); the goats' picture card and the pen drawing tile; the pen with a glass wall (card); Basil's
easel MY ZOO with small drawings (replace `zooEasel`); the full zoo map with twelve animals (replace `zooMap`); the p. 70 chapter map (replace
`chapterMap`); the three EP14 dare boards (the same HDB skyline at dusk three times: the Sun sliding away; a small Earth with a turning line; a
cloud in front of the Sun: `PIC.sunAway / sunEarth / sunCloud`, EP14 opens with them); Part 2's three recap pictures; the ring pictures (the bag
with its torn strap; the bag with four label lines; the two straps); small pictures under the Mark Sentence cards. Five look-closer arts
(`strapsArt`, `bagArt`, `drawArt`, `testArt`, `goatArt`) with their sets. Two journeys (BE A BOOK: the books like walls, the zip closing overhead,
the straps pulling tight, the bump on a wet floor, the plastic base; BE THE NEW STRAP: your woven length down to the hanger, the weights, 6-9, no
tear). Two hidden animals, cute and alive: the butterfly on the plant outside the louvre window, the frog on its lily pad. Reused as they are:
EP12's three school-bag dare boards (ep12dare.js), the property chips.

## Stage 2 (Fable): drawing
- Draw every `phScene` / `lcPH` / `ringPH` / `hiddenPH` placeholder in `p1.js` / `p2.js` (SCENES_TODO.md has the list with times, marks and
  lines); keep every action AT its mark (if a drawing needs an action earlier or later, move the mark in script.py and rebuild; never the sound
  alone). New sets in new files before common.js in page.html; gradients in `XDEFS13()`; bake: `NODE_PATH=$(npm root -g) node bake.js <names>`.
- Check stills: `PART=1 ./sheet.sh p1_sheet 10 <times...>` (and `node stills.js`, `node probe.js`); no page errors.
- If anything changes the timeline: `python3 build_tl.py P`, `python3 make_todo.py`, `NODE_PATH=$(npm root -g) node dump_cues.js P`, `node song.js P`.
- **Thumbnails, NEW style (`../THUMBNAIL_V2.md`)**: add entries `ep13_1` / `ep13_2` to `THUMBS` in `../thumb_v2.js` (ep: 'ep13', out:
  'ep13/thumb_part1.jpg' / 'ep13/thumb_part2.jpg', old: the same; a burst colour not used by EP12 (pink, orange): e.g. teal-green or violet; the
  cuts are SVG expressions run in ep13/page.html with Stage 2's own drawing functions; one buddy big and surprised; 0-3 words that open a question
  and never give the answer, e.g. Part 1 "METAL STRAP?" over the three straps on the chair, Part 2 "5 OR 9?" over the two straps on the stand);
  then from `explained2/`: `export NODE_PATH=$(npm root -g); node thumb_v2.js ep13_1 ep13_2` and `node thumb_v2.js sheet`; look at the 320 px
  copies, put a 320 px sheet in `qa/thumbs.jpg`. The script's old-style thumbnail words (section 7) are NOT used; do not use the old `thumb.js`.

## Stage 3 (Opus): `./build_part.sh P` (timeline, cues, song, `flock /tmp/explained_render.lock node render.js P 3`, `finish.sh P`)
- Output `ep13_partP.mp4` (ignored), `ep13_partP.srt`, `sheet_partP.png`; check stills around every action mark, card, look-closer and reveal;
  both parts about -16 LUFS, each at most about 5:15 (cut from the list above if over).
- A human listens to `qa/new_words_check.m4a` (Pip's "Engineers." at 0:29.6 and "Extinct." at 1:07.4 first) before upload.
- Upload with `python3 production/youtube/explained_upload.py production/workspace/explained2/ep13/upload.json` (Made for Kids, public, the
  new-style thumbnails, both playlists right after EP12 Part 2's key `explained-p3-ep12-part2`). With `"replaces": ["_gRJ0NwV6p0"]` and
  `"retire_old": true` the tool takes the classic "Why That Material? A Glass Trolley And Other Bad Ideas" out of both playlists (never deletes it,
  never makes it unlisted or private) and writes ONE first line in its description, "▶ NEW VERSION: <EP13 Part 1 title> <EP13 Part 1 link>".
  **After the upload, edit that first line by hand (YouTube Studio or the API) so it points to BOTH: EP12 Part 1
  https://www.youtube.com/watch?v=G03-LFQEld8 (pp. 59-65) AND EP13 Part 1 (pp. 66-72)**, e.g. "▶ NEW VERSION: Part 1 A GLASS Trolley?
  https://www.youtube.com/watch?v=G03-LFQEld8 · then A METAL Strap? https://www.youtube.com/watch?v=<EP13 Part 1 id>". (The tool skips a
  description that already starts with "▶ NEW VERSION", so a re-run will not overwrite the edit.)
- Status: see ../progress/ep13.json
