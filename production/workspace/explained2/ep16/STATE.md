# EP16 build state (for a resume after a restart)
P3 EP16 "A chick looks like a hen. A tadpole doesn't look like a frog!" (Ch 5, Life Cycles of Animals, pp. 80-85 + the key line 5.11, p. 89).
Part 1 "Fish, Frog or Lizard? What Does a TADPOLE Become?" (EP15's dare answered: a frog; frog eggs in a jelly-like covering; be a frog egg;
TADPOLE; HOLD ON! four stages? no, three; the chick beside the hen; the cliffhanger: an empty grasshopper) **5:24.9**. Part 2 "Why Did This
Grasshopper Leave Its SKIN Behind?" (the nymph; the empty skin and why; be the nymph; MOULTING; the Showdown: Pip's cockroach homework and
the egg case; the chant; the praying mantis; the dare into EP17: a caterpillar, is it a nymph?) **5:30.4**.
The script: `../p3_ep16_script.md` (version 1, Opus, 23 Nov 2026). The source of every spoken word: `script.py`.

Stages: **Stage 1 (setup, voices, timelines, staging): DONE 2026-11-23, Opus** · **Stage 2 (drawing, sound, full render, self-check): DONE
2026-11-23** · **Stage 2.5 (teacher's-eye review, NOTES_REVIEW.md): DONE 2026-11-23** (the teacher's quick look next: qa/) · Stage 3 (render, checks, upload: Opus).

## Stage 1 done (2026-11-23)
- **Engine copied from `../ep15/`** (its live engine): lib.js (EP15's v2-cast working copy: `SIZE_K` basil **.94**, `POSE_SUB` worried ->
  thinking for Pip and Momo, the `_POSE` QA hook), common.js, closer.js, shrink.js, props.js, hotel.js, garden.js, trail.js, materials.js,
  canteen.js, pics.js, song.js, music.js, audio/, render.js, finish.sh (ep16 names), bake.js, build_part.sh, build_all.sh, dump_cues.js,
  probe.js, stills.js, sheet.sh, measure_countdowns.py, compare_ep1.py (ep16 names), build_tl.py, make_voice.py (header + EXTRA), main.js
  (+ `XDEFS16()` if it exists), page.html (tests.js + ep15dare.js); bg/ stage, stage2, daystage, _grain; the ritual voices h501, h860,
  h864, h1304a/o/t, h1305, u1300, u1305, u1002. NOT copied: EP15's scene art (home15.js, garden15.js, its p1/p2, tests.js, ep14dare.js).
- **EP15's redo was in progress while this was copied:** its uncommitted one-job-per-pose engine changes (23 Nov) are ported here: lib.js
  `reactPose` (only "thinking", after a real question), cheer only when learnt or `o.achieved`; common.js `SC.count`, `goals3`, `lockN`
  (the lead thinks, then is WORRIED through the countdown), `markScene` (the reader points at the card, then listens); closer.js
  `lcPeekAuto` (the peeking face listens; poses only via `peekEv`). **Stage 2: diff ep16's engine against ep15's once EP15's redo is
  committed and take any later engine fixes** (not the EP15-only parts: OUTCOMES, KW, PHR, learnAt marks).
- **Sprites** (`prep_sprites.py`, 41 sprites): the v2 cast, one style: Pip (grey, unchanged), `momo_v2`, `basil_v2`
  (../characters/sprites/*_v2_sit_*.png, *_v2_sit.json, poses.json "momo_v2" / "basil_v2"). Every pose is painted (Basil also worried and
  laughing); no stand-ins except worried -> thinking for Pip and Momo.
- **Changed for EP16:** lib.js `OUTCOMES` (P1: Round 1 at ansglow Momo right / Pip, Basil wrong; HOLD ON! at e903 Basil, Momo right / Pip
  wrong; the look-closer guesses Momo wrong at e605b, Basil wrong at e1105p. P2: Round 1 at ansglow Pip, Momo right / Basil wrong; Momo
  wrong at f702 (the skin); Showdown at f1105b Basil, Momo right / Pip wrong), `learnAt` (kw_*, v_*, tback, bracket, rewrite, jfrog,
  jwings), `KW` / `KWLINE` (P1 JELLY-LIKE COVERING, TADPOLE, CHICK; P2 NYMPH, MOULTING, EGG CASE), `SHELF_HIDE` (+ lceggs, lcchick, lcnymph,
  lcskin); common.js `PHR` (the chant). New: `ep15dare.js` (EP15's three dare cards PIC.fish15 / frog15 / liz15, copied unchanged from
  ../ep15/garden15.js), `tests.js` (HIDDEN, TREEFROG / TREEFROG_R, MANTIS / MANTIS_R (intro / reveal spots), pondPH, grassPH, lcPH, ringPH,
  the small print, LIKEC / UNLIKEC, ffPH / FF), `p1.js` / `p2.js` (placeholders; the shared routines wired: recap, title, gameScene
  push-ins, goals, lock-ins (P2 Round 1 two cards), thought bubbles, look-closer frames, strips, Mark Sentences, journey tags + riders,
  chant, score hands, lizReveal + funFact, the dare's two cards, read-along, Now you know), `sound_cues.js` (a GENERIC Stage 1 plan;
  the places' ambience and foley are listed per scene in SCENES_TODO), `make_todo.py` -> `SCENES_TODO.md` (full staging per scene and
  per line, every pose WITH ITS REASON from the one-job-per-pose table, the hidden animal's spot per scene, ambience and foley on the
  marks), `upload.json`.
- **Script changes at Stage 1** (script.py and ../p3_ep16_script.md both updated):
  (1) the two reveal lines named the INTRO spot (against the 23 Nov rule): now e1302 "Did you spot the tree frog? It was on the garden tap,
  beside the pond!" and f1302 "Did you spot the praying mantis? It was on a sunflower, keeping very still!"; P1 `ring` and P2 `waitw` got
  their own spots (no spot twice). (2) Part 2's skin look-closer had no verdict mark: `VERDICT("v_skin")` added (+2.5 s). (3) holdon's
  kw mark "legs" collided with lcchick's "legs": renamed `bracket`. (4) e705's `jfrog` pointed at a second "frog" that is not there: first.
- **Pronunciation** (test clip `../pron_clips/Heart_ep16_new_words.m4a`, Heart, 9 sentences): Kokoro's "mantis" is "mˈæntiz" (man-teez):
  **fixed** in ../sg_pron.py (`"mantis": mˈæntɪs`, "MAN-tis") and ../PRONUNCIATION.md (waiting for the teacher's listen). Left to
  Kokoro: "nymph" nˈɪmf, "moult(ing)" (identical phonemes to "molt", mˈoʊlt: the MOULT respelling is harmless, the chant needs none),
  "jelly-like" dʒˈɛlɪlˈaɪk, "HDB" H-D-B. "lives" = "leev(z)" via sg_pron (e202, e805).
- **Voices** (`voice/`, `make_voice.py`, log `voice.log`): every line recorded (Heart: Kokoro af_heart via sg_pron; buddies: the
  Character Voice Kit, 12% slower), aligned (pocketsphinx); f404 and f503m were spread by word length (PROPORTIONAL: the aligner missed
  them; f503m's `wings` mark is approximate). Re-running make_voice.py keeps finished files and records only changed lines.
- **Timelines:** `python3 build_tl.py 1|2` -> tl_p1/2.json/js: **Part 1 5:24.9, Part 2 5:30.4** (target 5:15-5:35: no cut beyond the
  script's section 6 list; Part 1 has room for `hencount`, the first line to come back, about +5 s). `node dump_cues.js 1|2` -> cues
  (88 / 106 events). A sweep that renders every 0.25 s of both parts in the page: no errors, no NaN.
- **Scores:** Part 1 Round 1 1 : 0, HOLD ON! 2 : 0; Part 2 Round 1 1 : 1, Showdown 3 : 1.
- **upload.json:** both parts public, Made for Kids (the uploader sets it), playlists PLb8LpPqxQI4E and PLPfEuT7l4KjI right after
  `explained-p3-ep15-part2`. **No `replaces`:** the classic P3 no. 10 "A Tadpole Has No Legs. So How Does It Become A Frog?"
  (`2Atm-edXKVk`) covers pp. 80-89 (three AND four stages); EP16 covers pp. 80-85 only, so it stays until EP17 (pp. 86-89) is live and
  EP17's upload.json retires it (as EP14 / EP15 did with RVRoaWWKjEM). **Not run.** Titles and descriptions from script section 7.
- **Thumbnails (Stage 2, THUMBNAIL_V2, thumb_v2.js `ep16_1`, `ep16_2`):** P1 **FISH OR FROG?** (FROG? in yellow #FFD60A) + Basil surprised
  + a tadpole with its back legs just out, frog eggs behind; turquoise to deep teal-green burst. P2 **EMPTY SKIN?!** + Momo surprised + the
  empty grasshopper skin and the grasshopper that came out of it; warm orange to red burst. Alternates: WHAT IS IT?! / WHO LEFT THIS?

## Stage 2 done (2026-11-23)
- **Engine:** EP15's redo was not yet committed as "Redo with v2 cast done" when this was drawn; its later engine fixes (in its checkpointed
  working copy) are ported: common.js count / finalScene / nyk at one size per depth (420 / 430), the Mark Sentence reader points at the card
  only in the pause before reading, no waving at the start of "Now you know!". **The main session: diff ep16's lib.js / common.js / closer.js
  / main.js against ep15's once EP15's redo is committed** (EP16-only parts: OUTCOMES, KW, KWLINE, SHELF_HIDE, learnAt, PHR).
- **Art** (loaded after ep15dare.js in page.html): `home15.js` + `garden15.js` (EP15's garden helpers, copied unchanged with a header),
  `pond16.js` (the animals: frog eggs in jelly, the tadpole at three stages, the young pond frog, the four-lined tree frog, the praying
  mantis, the hen and chicks, the grasshopper nymph / adult / empty skin, the cute cockroach and its egg case, the foam nest, the mantis egg
  case, the lime butterfly caterpillar; the sets BG.pond16 + VP16 (the pond side, dawn light option) and BG.grass16 + VG16 (the grassy
  corner by the void deck); the hidden animals' spots FROGAT / MANTISAT), `art16.js` (Pip's board of four with the bracket and the loop,
  loopBoard16 OUR FROG'S LIFE CYCLE, the four look-closers eggsArt / chickArt / nymphArt / skinArt, the two journeys eggJourney /
  nymphJourney, Pip's cockroach homework roachSheet, the board of four loops fourLoops, the fun-fact pictures, the recap pictures, the cards).
  Baked: bg/pond16, bg/grass16 (`node bake.js pond16 grass16`). p1.js / p2.js: every placeholder replaced, every mark kept.
- **Timeline fixes (script.py):** P2 `l3` was on the first "three" (now ["l3", "three", 1]); P2 recap marks `pic2` / `pic3` moved to "It" /
  "Then" (each picture now held >= 3.2 s; was 1.2 s). No audio change.
- **Sound** (sound_cues.js Stage 2 block, song.js): one place, the garden: R.garden (birds, far children, leaves) for both sets; the pond's
  frog chorus at dawn, drips, a trickle, bubbles; R.hens (NEW in song.js: clucks and peeps) only while the hen is on screen (hen, lcchick to
  `pairs`); grasshopper clicks in the grass; foley on the marks (label clicks, the fish's bloop, the sun's shimmer, underwater hush, the
  hatch, kicks, splash, ribbits, paper, the bracket, tiles, pecks, munching, creak, crack, rustle, wings, strike, scribble, the egg case).
  No ambience one-shots under the countdowns; the beds pause there (song.js). Both mixes -16.0 LUFS.
- **Rendered** (build_part.sh under /tmp/explained_render.lock; then rerender.sh: only the changed 10 s chunks, frame-exact):
  `ep16_part1.mp4` **5:24.9** (324.9 s), `ep16_part2.mp4` **5:30.4** (330.4 s), 1920x1080 30 fps, -16.0 LUFS (not committed);
  `ep16_part1.srt` / `ep16_part2.srt`, `sheet_part1.png` / `sheet_part2.png`.
- **Countdowns measured** (measure_countdowns.py on the rendered files): P1 Round 1 numbers 58.167 / 59.167 / 60.167 / 61.167 (steps 1.000),
  bell 61.134 = timeline; P1 HOLD ON! steps 1.000 x5, bell 193.895; P2 Round 1 steps 1.000 x5, bell 49.329; P2 Showdown steps 1.000 x5,
  bell 219.412. Only the ticks and the bell under each.
- **Review:** `NOTES_REVIEW.md` (28 notes, all fixed; what is still weak). QA for the teacher: `qa/highlights.jpg`, `qa/buddy_faces_p1.jpg` /
  `_p2.jpg` (every pose on screen with its time and reason, pose_reasons.json), `qa/preview_p1_clips.mp4` / `_p2` (720p with sound, not
  committed), `qa/ep1_compare_p1.jpg` / `_p2.jpg`, drawing sheets qa/p1a-p1e, p2a-p2d, rv1a/b, rv2a/b (every line).
- **Thumbnails** (thumb_v2.js `ep16_1`, `ep16_2`): `thumb_part1.jpg` FISH OR FROG? + Basil (v2) surprised + a tadpole with back legs and
  frog eggs in a pond (teal burst); `thumb_part2.jpg` EMPTY SKIN?! + Momo (v2) surprised + the empty skin on its blade and the grasshopper
  with wings (orange-red burst).
- **App:** `app_moments.json` (16A / 16B, 12 + 11 moments, 1.5 s before each idea; keys O.cycles + a PLACEHOLDER CH.animalCycles: check the
  real constant in videos.js); `production/youtube/chapters_p3.json` EP16_P1 / EP16_P2.
- Not run: the upload (the main session uploads after the teacher's quick look). Chunk folders deleted after muxing.

## For Stage 2 (Fable): start here (done)
- Read `SCENES_TODO.md` top to bottom (the rules block first, especially rule 5: every pose with its reason), then `../p3_ep16_script.md`
  sections 3 (Realism) and 11.
- One place: EP15's community garden. Borrow its art from ../ep15/garden15.js (`BG.garden15`, `VG15`) and put EP16's sets in new files
  (e.g. `pond16.js`, `grass16.js`) loaded after ep15dare.js in page.html. Replace the placeholders; keep every mark (the sound keys on them).
- Models in ep15/: `SC.holdon` (p1.js), `SC.show` / `SC.fix` / `SC.dare` (p2.js), `adultArt` / `seedArt` for the look-closers,
  `seedJourney` / `flowerJourney` for a journey with riders.
- Before rendering: point finish.sh's contact-sheet marks and compare_ep1.py's times at EP16 (they still list EP15's); add the hen to the
  garden bed in song.js (EP15's says "no hens"). Then `./build_part.sh 1` and `2`, contact sheets, the teacher's-eye review, fixes, upload
  (`--check` first).

## Open points
- The tree frog's and the mantis's reveal spots were changed at Stage 1 (above); the teacher may prefer other spots (one line each to re-record).
- "mantis" respelling waits for the teacher's listen (the clip above).
- Fun facts checked from established natural history (no web access): the four-lined tree frog's foam nest over water; the mantis a
  close relative of the cockroach, with an egg case and many nymphs hatching together (script section 3).
- Some staging notes in the script's segment tables predate the 23 Nov one-job-per-pose rule (e.g. Basil "cheer" while waving the viewer
  into a journey): SCENES_TODO.md is the one to follow.
- School Lab 5.1 stays out of the description until its bench stops numbering the stages.

## 23 Nov: teacher approved the voices
The three "praying mantis" lines and the new-words clip (nymph, moulting, mantis, jelly-like, HDB) are approved as recorded.

## 23 Nov: every leaf on a stem (SERIES_FORMAT "Plants grow the way real plants grow, and what is gone is gone")
- **Found** (stills of every scene, both parts, before and after: `qa/leaf_fix/before_after.jpg`): the lime plant in the grassy corner
  (pond16.js BG.grass16: 26 leaves scattered by hash() round a bare stem; in every grass16 scene of both parts, the worst at P2 4:40);
  the bougainvillea in the pond-side pot (pond16.js BG.pond16: 12 loose blobs round a point, not one bush); the tree frog's fun-fact
  leaf (art16.js ffDrop: floating, no branch; ffFoam: no stalk, the frog hovering over the branch); the two grass blades in Part 2's
  nymph look-closer (art16.js nymphArt: both ends free, in mid-air); the leaf munched in BE THE NYMPH (art16.js: no stalk or stem).
  Nothing fades to a ghost (checked every fade of a thing the story removes: the tail, the leaf, the numbers, the jelly; all go to 0).
- **Fixed:** pond16.js `limeTree16` (EP18's limePlant18 approach: a trunk and six branches as quadratics, every leaf on a 11 px leaf stalk
  along a branch, one at each tip; same pot, place and crown size; branch B1 ends at (1620, 404) where P2's dare caterpillar leaf now
  sits on its own stalk, p2.js SC.dare) and `bougain16` (one bush mass on the rim, its small leaves and pink bracts on that mass);
  art16.js ffFoam / ffDrop (the leaf hangs from a branch on a stalk in both; the frog sits on the branch), `grassLeaf16` (nymphArt's
  blades grow out of the ground at their left end and taper to the tip; the stretch the grasshoppers stand on is unchanged), the munched
  leaf on a stalk and a stem from below the frame. Re-baked `bg/grass16.png`, `bg/pond16.png` (`node bake.js pond16 grass16`).
- **Re-rendered both parts fully** (build_part.sh 1 and 2; audio rebuilt from the same cues, unchanged): `ep16_part1.mp4` 324.9 s, 9747
  frames; `ep16_part2.mp4` 330.433 s, 9913 frames; 1920x1080 30 fps, both -16.0 LUFS. The Showdown fix (230-250 s: Pip oops, Basil and
  Momo arms crossed through the whole fix) comes from p2.js, so it is in the new Part 2 (checked at 236 s and 245 s). Countdowns
  re-measured: P1 Round 1 steps 1.000 x3, HOLD ON! 1.000 x5 (bell 193.895); P2 Round 1 1.000 x5 (bell 49.329), Showdown 1.000 x5
  (numbers 214.445 ... 219.445, bell 219.412). New sheet_part1/2.png, srt, `qa/highlights.jpg`, `qa/preview_p1_clips.mp4` / `_p2`.
  Chunk folders deleted. Thumbnails not regenerated (the lime plant is not in them; see the open point).
- **Open point:** `thumb_part2.jpg` shows the empty skin and the grasshopper on two loose grass blades (sticker style on a burst, as
  every thumbnail): if the teacher reads those as floating leaves, root them in a strip of ground in thumb_v2.js `ep16_2`.
