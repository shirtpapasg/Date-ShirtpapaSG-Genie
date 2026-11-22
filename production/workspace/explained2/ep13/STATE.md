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

Three stages: **Stage 1 (setup, done 2026-11-22, Opus)** · **Stage 2 (drawing + thumbnails, done 2026-11-22, Fable)** · **Stage 3 (render, checks, upload: done 2026-11-22, Opus; LIVE)**.

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

## Stage 2: done (2026-11-22, Fable). Every scene is drawn; no `phScene` / `lcPH` / `ringPH` / `hiddenPH` placeholder is left in `p1.js` / `p2.js`.
**Lengths unchanged: Part 1 5:14.8 (314.8 s), Part 2 5:12.5 (312.5 s).** `script.py`, the voices and the timelines were not touched (no cut
used, no mark moved: every action is drawn AT its own mark). No video rendered.
- **New files** (page.html loads them after pics.js, before tests.js): `school.js` (`XDEFS13`; `BG.classroom` / `classroomD`, baked; `VC(t, o, cam)`
  with the two live ceiling fans and the butterfly at `BFLY`; `bag13(o)` = the real ORANGE school bag, front view like EP12's boards (straps
  `ok` / `torn` / `tornflat` / `new` / `none`, `pull`, `zip`, `open`, `books`, `lit`); `bookC`, `bookFlat`, `booksOut`, `bookStack`; `strapBand`
  (fabric / metal / wood), `ribbon`; `chairS` (seen from behind), `tTable`, `deskS`; `aHand`; `bagDrawing(k, o)` (the pencil drawing: `mat`,
  `tags`, `left`), `drawingPic`, `paperS`, `pencilHand`; `sampleTile` (fabric / plastic / wood; `wet`, `bead`), `dropper`, `waterDrop`,
  `zipShort(u)`; `hardHatCard`, `easelS`, `wetFloorPic`; `butterfly` / `butterflyArt`) and `garden13.js` (`BG.garden` / `gardenD`, `BG.goatpen`,
  baked; `VG(t, o, cam)` with the pond's rings and the frog at `FROG`; `VZ(t)` = the goat pen with its three live goats behind the fence;
  EP9's `glovePinch`, `weightDisc`, `hangerSvg`, `counterPill` (copied; the hanger's rod is longer so nine weights fit); `newStrap`,
  `oldStrapCard` (the HELD PICTURE of the old strap: torn, five weights, *before the video*), `stand13` (EP9's stand: the picture card on the
  left clamp, the live new strap on the right), `weightRow`; `goatS` + `GOATS`, `penFence`, `hayHeap`, `trough`, `shelterS`; `frog` / `frogArt`,
  `lilyPad`; `ZOO.name(t)` = the twelve animals; `PIC.sunAway` / `sunEarth` / `sunCloud` + `NEXT_PICS` = **the three dusk boards EP14 opens
  with**). Bake after a change: `node bake.js classroom classroomD garden gardenD goatpen`.
- **Changed:** `tests.js` (`planBoard` drawn: a wooden-framed board on a low stand, five boxes with NO numbers, picture tiles `PLAN_PIC`, the
  card THEN: TEST IT on its own feet beside the row, `o.small` for the little board in the look-closers; `zooEasel`, `zooMap`, `chapterMap`
  drawn; `HIDDEN` = the drawn butterfly / frog), `closer.js` (the five arts `strapsArt`, `bagArt`, `drawArt`, `testArt`, `goatArt`; `lcRoom`,
  `lcTable`, `lcHit`, `weaveRing`), `shrink.js` (both journeys), `p1.js` / `p2.js` (all scenes), `lib.js` (TEST pops at [1440, 262]),
  `sound_cues.js` (**a Stage 1 slip put right**: Part 2 has ONE mark `strongchip`, the goat fence's; the journey's sparkle now sits on Heart's
  "strong" (`W("j604", "strong")`) and the fence's chip has its own soft pop), `../thumb_v2.js` (`ep13_1`, `ep13_2`).
- **LOOK CLOSER as built** (shared frame: slow push-in, the set dims, no score / shelf / buddies / hidden animal, one verdict held 2.5 s):
  | Scene | Part, time (verdict) | What is shown | Verdict |
  |---|---|---|---|
  | `lcstraps` | P1 1:08.2-1:36.6 (1:34.1) | the chair's top rail across the window; a hand lowers the fabric strap onto it (`lay1`): it hangs down on both sides, *bends round it*, chip FLEXIBLE; the metal bar (`lay2`) and the wooden stick (`lay3`) are laid across like see-saws and rock once, *stays straight* x2; both lifted away (`clear`); the bag on the table: the new strap clipped on (`clip`), five books fly in one by one (`books`), a hand lifts the bag by the strap alone (`lift`: the strap straight, one swing); a magnifier on the seam (`notear`), *a bag full of books*, *no tear*, STRONG | FABRIC: FLEXIBLE AND STRONG (green, both chips) |
  | `lcbag` | P1 2:11.9-2:44.7 (2:42.2) | five books slide into the open bag (`booksin`), a hand closes the zip (`zip1`), two hands hang it on the chair (`hang`), *to carry books to school*; each part lit with its name while the rest is dimmed (`p_*`); INTENDED USE pops; each part does its job with its label: it swings on the chair (`u_straps`), the top is opened: five books (`u_body`), the zip is run closed (`u_zip`), the bag is set down on the floor (`u_base`); the little board top left | ONE BAG · FOUR PARTS · FOUR USES (sun-yellow on cream, dark border) |
  | `lcdraw` | P1 3:14.0-3:43.7 (3:41.2) | the paper: a hand with a pencil draws the bag and four label lines (*speeded up*); the plastic and fabric tiles: a drop from the dropper stays a bead on plastic (`drop1`), sinks into the fabric as a dark patch (`drop2`); the plastic tile hops onto the base (*base · plastic*), WATERPROOF; the short metal zip run open, close, open, close (`zo1`..`zc2`), hops on (*zip · metal*), STRONG; the fabric tile and the strap hop on (*straps · fabric*, *body · fabric*), FLEXIBLE, STRONG | OUR DESIGN: A SUITABLE MATERIAL FOR EACH PART (green) |
  | `lctest` | P2 0:53.8-1:23.7 (1:21.2) | left the HELD PICTURE of the old strap (torn, five weights, *before the video*), right the new strap, live; *same length* / *same width* marks; a gloved hand slides a weight on AT each number (`w1`..`w9`), the two counters in the middle (5 and 1..9), a plain line joins them at `link5`; the hand opens, empty; a magnifier on the weave (*no tear*, *9 weights*); *old strap: 5* · *new strap: 9*; TEST pops; a tick on the small card THEN: TEST IT (left edge). Nothing tears | TESTED: THE NEW STRAP IS STRONGER (green) |
  | `lcgoat` | P2 2:06.6-2:24.2 (2:21.8) | its own place (the goat pen; pill *A zoo in Singapore*, small print *We look. We do not feed the goats.*): three wooden rails; a goat walks up behind them (`goatwalk`), rubs its side on the middle rail (`push1`), lowers its head and pushes with its forehead (`push2`): the rail does not move; *a wooden fence*, *the goat pushes*, *no break*, STRONG; the camera glides to the gap (`glide`) while the goat trots back; through the gap the three goats, the hay, the trough, the shelter (*we can see the goats*) | THE FENCE: WOOD · STRONG (green, with the chip) |
- **Journeys:** BE A BOOK (P1 4:01.2-4:23.5: you look up from your own cover; the other books like tall walls; the open top bright with the
  ceiling fan far away; the metal teeth close overhead from one end to the other and the light turns orange; the straps' shadows go tight, the
  walls sway, streaks run down as you rise; a bump; then a cut-away at the bottom of the bag: you and the books on the dry floor, the thick
  plastic base, outside a thin shining line of water and a wet-floor sign; *water* / *dry*; WATERPROOF glows) · BE THE NEW STRAP (P2
  1:33.9-1:54.7: your woven length like a long orange road down to the hanger, the table, the padded tray and the pond far below; a weight
  slides on at `jw1` and `jw2`, the view dips, the weave's edges draw straight; *pulled tight*; 6 · 7 · 8 · 9 rise past you; *9 weights · you do
  not tear*; STRONG glows on Heart's "strong").
- **Hidden animals** (named by Heart with the drawn badge; the reveal rings them): the **butterfly** (a plain tiger; `BFLY` [1262, 398]) on the
  potted plant outside the first louvre window, in every classroom shot (it opens and closes its wings; at the reveal it flutters up and
  settles); the **frog** (`FROG` [1575, 1024]) on a lily pad in the pond, in every garden shot (it blinks, its throat puffs; at the reveal it
  hops to the next pad, rings on the water). Neither is in a look-closer or a journey.
- **Thumbnails (new style; the files upload.json uploads):** `thumb_part1.jpg` = **METAL STRAP?** (white / yellow; Pip surprised, the orange bag
  with its torn strap and the metal bar, a teal-green burst, chip 1); `thumb_part2.jpg` = **5 OR 9?** (yellow; Basil surprised, the new strap
  with five weights and a sixth sliding on, a violet burst, chip 2). Both at 320 px: `qa/thumbs.jpg`. Remake (from `explained2/`):
  `NODE_PATH=$(npm root -g) node thumb_v2.js ep13_1 ep13_2`.
- **Deviations from the script / SCENES_TODO** (picture only): the bag is drawn from the FRONT everywhere (as on EP12's boards), so the chair
  is seen from behind, not side-on, and in `lcstraps` the rail runs across the window: the fabric strap hangs over it, the bar and the stick
  lie across it pointing towards us (the three hang on ONE rail, left to right); the cold open's boards stand beside the table (not in front
  of it); `engineers` is the table top seen from above (three long straps in a row with their tags, the hard-hat card); the three small discs
  are all at the lower left in the classroom and the garden; `strapans`, `holdon`, `wetfloor`, `testans`, `notglass`, the Showdown, `fix`,
  `zoomap` and the dare stand on the dimmed set; the wet-floor picture stands on an easel; the paper on the table is a small sheet, the finished
  drawing then stands on a small easel on the table (`pipfix`, the glide, `cliff`); in `lctest` the old strap is a photo card hanging from the
  left clamp (in the wide garden too), the two counters stand between the straps and *old strap: 5* · *new strap: 9* land under them; the
  goat that pushed walks back to the other two during the glide (so three goats are seen through the gap); the 3, 4, 5th weights are not
  shown in the journey (the stack is seen from above; only the numbers 6-9 rise); the chant's board is at the left, its lines at the right;
  the dare's three dusk boards stand under their cards; *Never look at the Sun.* is small print at the lower right of the dare.
- **Checks (stills only):** stills every 0.45 s of both parts: no page errors. `qa/p1_sheet.jpg`, `qa/p2_sheet.jpg` (a frame every 2.7 s),
  `qa/lc_straps.jpg`, `lc_bag.jpg`, `lc_draw.jpg`, `lc_test.jpg`, `lc_goat.jpg`, `qa/journey_book.jpg`, `qa/journey_strap.jpg`, `qa/thumbs.jpg`
  (Stage 1's placeholder sheets `p1_check.jpg` / `p2_check.jpg` are removed). Cues re-dumped (215 / 207 events) and both preview mixes rebuilt
  at -16.0 LUFS (peak -1.5 dBFS). `SCENES_TODO.md` is Stage 1's list (not regenerated).
- **For Stage 3 to watch in motion:** (1) the hands (one simple arm with a blue sleeve, moved by its fingertips; the yellow glove in the
  test): the strap and the planks being lowered in `lcstraps` (the hand comes from above / the right and may sit partly outside the window),
  the lift, the books flying in, the zip pulls, the hang and the set-down in `lcbag`, the pencil, the dropper, the short zip in `lcdraw`; (2)
  the cross-fade from the rail to the bag at `clip` (0.3 s before the mark) and the bag's single swing after `lift`; (3) the planks' rock at
  `lay2` / `lay3` against the tink / tok; (4) `lcbag`: the bag's path to the chair at `hang` (0.8 s) and down to the floor (it lands AT
  `u_base`), the lit parts; (5) `lcdraw`: each drop lands AT `drop1` / `drop2`, the three hops, the labels turning to *base · plastic* etc.;
  (6) `lctest`: each weight reaches the hanger AT its mark (0.45 s slide), the counter's bump, the glove drawing back between weights; (7)
  `lcgoat`: the walk-up, the rub and the head push against the knock sounds, the glide (2.2 s) with the goat shrinking as it walks back;
  (8) the board: tiles hopping on at `fill1` / `fill23` / `fill4` / `fill5` (seen on the little board inside the look-closers), the fabric
  tiles of the HOLD ON!, THEN: TEST IT sliding in at `testcard`, Part 2's wipe and refill, the tick at `testtick` (also on the art's own
  small card), the chant's flashes; (9) both journeys' cuts (the cream dip 1.5 s after `jbump`), the zip closing overhead, the numbers 6-9;
  (10) both reveals and their rings; the easel's dragonfly hop at `dfly`; the zoo map's twelve idle loops and the glow at `glowall`;
  (11) the dimmed set's own words (OUR TEST STAND, the board) showing faintly round the look-closer window.

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

## 22 Nov 2026: Stage 3 (Opus): rendered, checked, LIVE (released as it is, the teacher's word)
- Rendered with `./build_part.sh 1|2` (10 s chunks in `out/chunks_p1`, `out/chunks_p2`; about 10-12 min a part, 3 workers). `ep13_part1.mp4`
  314.80 s (**5:14.8**), `ep13_part2.mp4` 312.57 s (**5:12.6**); 1920x1080 30 fps; both **-16.0 LUFS** (true peak -1.3 dBFS). No time added, no
  cut used, no mark moved: every fix below is picture only. Captions `ep13_part1.srt` (140 cues), `ep13_part2.srt` (145 cues), 0 overlapping
  cues; contact sheets `sheet_part1.png`, `sheet_part2.png`. No page errors (stills.js after each fix).
- **Checked** (frame strips from the rendered files, dense round every action mark; a set of them in `qa/stage3/`): the cold open (the tipped
  bag, EP12's three boards stand in, place pill); the calm recaps (P1 EP12's boards with their cards; P2 three pictures, one at a time, each with
  its label); the butterfly / frog named by Heart with their picture ("a little butterfly", "a little frog") and ringed at the end ("It was on the
  plant by the window!", "It was on the lily pad in the pond!"); goal cards read by Basil (P1) / Momo (P2), each lifted and ticked; Mark Sentences
  read by the "Say it with me!" buddy (Basil, Pip; Basil, Momo), DESIGN / EXTINCT popping after the card; lock-in clues above the ring through the
  countdown (P1 Round 1 *must bend* / *must not tear*; HOLD ON! *four parts* / *four uses* / *one material?*; P2 Round 1 *same length* / *same
  width* / *old strap: 5*); the "Now you know!" ending. In motion, from Stage 2's list: (1) every hand (the strap lowered onto the rail, the bar /
  stick laid and lifted, the clip, the books, the lift, the zip, the hang, the set-down, the pencil, the dropper, the short zip, the glove in the
  test); (2) the cross-fade at `clip` and the bag's swing after `lift`; (3) the planks (fixed, below); (4) `lcbag`: to the chair at `hang`, down
  to the floor AT `u_base`, the lit parts; (5) `lcdraw`: each drop lands AT `drop1` / `drop2` (plip / pff on the mark), the three hops, the
  labels turning to *base · plastic* etc.; (6) `lctest`: each weight reaches the hanger AT its mark with a tok and the counter's click (checked
  frame by frame at w1, w2, w5, w9), the glove draws back, nothing tears (the old strap only as the held picture); (7) `lcgoat`: walk-up, the
  rub at `push1` and the head push at `push2` land on their knocks, the glide; (8) the board's tiles, the HOLD ON! fabric tiles, THEN: TEST IT
  at `testcard`, Part 2's wipe and refill, the ticks; (9) both journeys (the zip closing overhead, the cream dip, the numbers 6-9 rising and
  growing); (10) both reveals (fixed P2, below), the dragonfly's hop to line 4, the zoo map; (11) the dimmed set round the look-closer windows:
  nothing readable leaks. Every action sound sits on its mark in `cues_pP.json` (lay1-3, clip, lift, zip1, u_base, drop1/2, zo1, jzipclose,
  w1-w9, push1/2).
- **Fixed** (small, local; only the affected chunks re-rendered):
  - P1 `lcstraps`: the metal bar and the wooden stick read as LEANING (a long slanted trapezoid from above the rail down to the lower rail) ->
    each now lies straight across the top rail like a balanced see-saw (`closer.js` plank: far end 150 above, near end 160 below the rail, no
    skew, clear of the lower rail; the rock kept; *stays straight* points at the far end). Chunks 70-90 s.
  - P1 `wetfloor`: Basil's wet-floor picture on its easel landed on top of the board OUR DESIGN PLAN (title hidden) -> it lands at x 890,
    between the bag and the board (`p1.js` slideX). Chunks 180-200 s.
  - P1 `lcdraw`: the dropper floated with no hand -> a hand holds it by its bulb, from above (`closer.js`). Chunk 200-210 s.
  - P2 `lcgoat`: the verdict banner covered the end of the pill *A zoo in Singapore* -> the pill fades out just before the verdict
    (`p2.js`). Chunk 140-150 s.
  - P2 `liz`: the two pills ("It was on the lily pad in the pond!", "Tell someone at home!") sat on top of the frog and its ring through the
    hop -> they stand to the left (x 560; `common.js` `lizReveal` takes `py`, `px`; Part 1 unchanged). Chunks 260-280 s.
  - Captions: Pip's "Two." and "A dragonfly has six legs." started .28 s apart, so the .3 s minimum made two cues overlap -> `finish.sh` joins a
    cue to the next one when they start under .6 s apart ("Two. A dragonfly has six legs.").
- Not changed (noted): the title slam's first frames are larger than the screen (a slam); the round cards' small pictures; the "+1 arms crossed"
  coin passes over the shelf's INTENDED USE pill for a moment; the zoomed butterfly reveal crops the board behind (background); the cliffhanger's
  THEN: TEST IT card is small beside the board (about 20 px letters at 1080p; Heart says "They test!"); Part 2's small print *An adult adds the
  weights.* also shows on the game screen; in BE THE NEW STRAP the next weight flies in over the pond for a moment; in `lcgoat` the goat walking
  back looks long for a few frames of the glide.
- **Listen check (machine; not by ear):** Whisper (small.en and base.en, CPU) hears every flagged take right: Pip's "Engineers." and
  "Extinct.", Basil's "Intended use.", Momo's j1004 "...will become extinct. This means that they will all die out." word for word, the other
  read-along takes, and Basil's j902 ("flamingo, macaw"). No re-record. A human should still listen once (`qa/new_words_check.m4a`).
- Thumbnails: `thumb_part1.jpg` (METAL STRAP?) and `thumb_part2.jpg` (5 OR 9?) read well at 320 px; uploaded as they are.
- Uploaded with `upload.json` (checked against ep12/upload.json and the live EP12 keys in explained_uploaded.json; Made for Kids, public;
  both playlists PLb8LpPqxQI4E (positions 25, 26) and PLPfEuT7l4KjI (43, 44) right after EP12 Part 2 ussXaa1fQUQ via `explained-p3-ep12-part2`;
  `"replaces": ["_gRJ0NwV6p0"]`, `retire_old`: the classic "Why That Material? A Glass Trolley And Other Bad Ideas" left both playlists; it
  stays PUBLIC, never deleted). **Part 1 https://www.youtube.com/watch?v=FO1Y_KSZU-c , Part 2 https://www.youtube.com/watch?v=8lQ1-1ruveY .**
- The old video's first description line, written by hand after the upload (API, `yt.call`, description only; the rest kept): "▶ NEW
  VERSION: choosing materials https://www.youtube.com/watch?v=G03-LFQEld8 · design like an engineer https://www.youtube.com/watch?v=FO1Y_KSZU-c".
  (The uploader skips a description that starts with "▶ NEW VERSION", so a re-run keeps it.)
- Left for the teacher: listen to Pip's "Engineers." / "Extinct.", Basil's "Intended use.", Momo's "will become extinct"; watch the five
  look-closers (the planks now lie flat across the rail), both journeys and the butterfly / frog reveals. The School Lab 3.8 line stays out of
  the descriptions until that lab is signed off.


## 22 Nov 2026: Improved Part 1 (and Part 2), the teacher's-eye redo: awaiting the teacher's OK; NOT uploaded
The teacher, after watching EP12/EP13: "ALL these are important and you did not make these mistakes when creating episode 1" ("Basic"). The live
videos (FO1Y_KSZU-c, 8lQ1-1ruveY) stay as they are until the teacher has seen the preview. Old live files kept for comparison:
`out/ep13_part1_OLD.mp4`, `out/ep13_part2_OLD.mp4` (not in git).
- **Files:** `p1v2.js` / `p2v2.js` (loaded after p1.js / p2.js; they replace the parts' scenes), `v2common.js` (shared: `peek` the reacting buddy
  face in a look-closer, `bigRing` the countdown that pulses on every tick and pops its number on each whole second, `stampHold`, `clue` (Fredoka
  60 clue labels), `circleShot` (EP12 v2's push-in + the black-ringed circle on the blue stage), `animalLabel`, `picCard` (ONE big numbered picture
  card)); `bagArt2` (p1v2.js, the bag look-closer redrawn for the whole panel); `closer.js` (`partChip`, `sName`, the drawing colour-coded, the strap
  chips tied by a line); `school.js` (`PARTC` part colours, `bagDrawing({cc})`, `dimF` = opaque greying instead of the 28 % see-through "ghost");
  `trail.js adultHand` (four fingers and a thumb); `lib.js ringTicks` (a short ring's first second is one plain tick); `common.js` (`goals3` layout
  option, `nykScene` buddy size); `shrink.js` (the buddies ride along; your bookmark; "you" on your book); `sound_cues.js` / `song.js` (the game bed
  rests under every countdown; LOCKED IN! on the bell; place beds: classroom, eco-garden, zoo); `script.py` + `../p3_ep13_script.md` section 12 (the
  ONE word change: a fun fact at each reveal, g1303 Momo / j1203 Pip, Heart's reveal line split round it); `spr/` (the back views basil_back,
  momo_back via prep_sprites.py). Review notes: `NOTES_REVIEW_P1.md`. Tools: `make_preview.py P`, `measure_ring.py P`.
- **Part 1: rendered, 5:22.2 (322.2 s; was 5:14.8: the fun fact), -16.0 LUFS, 143 captions, 0 overlapping.** `ep13_part1.mp4` (not in git).
  Preview: `qa/preview_p1_before_after.jpg`, `qa/preview_p1_countdown_vs_ep1.jpg`, `qa/preview_p1_clips.mp4`; ring timing `qa/ring_check_p1.txt`,
  `qa/ring_badges_p1.png`.
- **What EP1 had and EP12/EP13 lost (keep it from EP14 on):** the engine is the same (ep01/ep13 `ringTimer`, `buddy`, `stamp` are identical); the
  loss was in how the scenes used it. EP1: the ring big in the centre with the thing itself moving inside it (the walking robot); both choice cards
  pulsing on every tick; the YOU hand swinging between the choices; the buddies in a row, reacting; the bell, then LOCKED IN!. EP12/EP13: the ring
  pushed to the side and shrunk (0.74; HOLD ON! a 150 px ring on the dimmed room with the board), its picture still, the card glow cycling every
  0.5 s off the beat, the 104 bpm game groove playing on under the 1 s ticks (the "rhythm is off"), a 3 s ring ticking twice a second from its
  first second, HOLD ON!'s Pip sitting still through it, LOCKED IN! 0.7 s after the bell, the +1 coin over the shelf, discs 120 px in a corner.
  From EP14 on: `bigRing` (or the same ideas), one big buddy fidgeting on the beat, no music under a countdown, the stamp ON the bell, and check
  it in the rendered file (`measure_ring.py`).
- **Part 2: rendered, 5:20.5 (320.5 s; was 5:12.6: the fun fact), -16.0 LUFS, 149 captions, 0 overlapping.** `ep13_part2.mp4` (not in git).
  Review notes `NOTES_REVIEW_P2.md`; preview `qa/preview_p2_before_after.jpg`, `qa/preview_p2_countdown_vs_ep1.jpg`, `qa/preview_p2_clips.mp4`;
  ring timing `qa/ring_check_p2.txt`. Small picture fixes after the full render were spliced in at chunk boundaries (keyframes) with ffmpeg's
  concat `inpoint` / `outpoint` (P1 60-100 s, P2 20-60, 80-90, 270-300 s), audio re-muxed from `out/mix_pP.wav`.
- **Status: Improved Part 1 and Part 2, 22 Nov: awaiting the teacher's OK; not uploaded.** On the teacher's OK: re-upload both parts as new
  videos with `upload.json` (titles unchanged), retire FO1Y_KSZU-c / 8lQ1-1ruveY the usual way (never delete; ask before unlisting), and point
  the classic _gRJ0NwV6p0's first description line to the new Part 1. The captions changed (the fun fact): send the new `.srt` files.
