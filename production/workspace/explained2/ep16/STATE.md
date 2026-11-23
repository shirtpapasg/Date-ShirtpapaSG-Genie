# EP16 build state (for a resume after a restart)
P3 EP16 "A chick looks like a hen. A tadpole doesn't look like a frog!" (Ch 5, Life Cycles of Animals, pp. 80-85 + the key line 5.11, p. 89).
Part 1 "Fish, Frog or Lizard? What Does a TADPOLE Become?" (EP15's dare answered: a frog; frog eggs in a jelly-like covering; be a frog egg;
TADPOLE; HOLD ON! four stages? no, three; the chick beside the hen; the cliffhanger: an empty grasshopper) **5:24.9**. Part 2 "Why Did This
Grasshopper Leave Its SKIN Behind?" (the nymph; the empty skin and why; be the nymph; MOULTING; the Showdown: Pip's cockroach homework and
the egg case; the chant; the praying mantis; the dare into EP17: a caterpillar, is it a nymph?) **5:30.4**.
The script: `../p3_ep16_script.md` (version 1, Opus, 23 Nov 2026). The source of every spoken word: `script.py`.

Stages: **Stage 1 (setup, voices, timelines, staging): DONE 2026-11-23, Opus** · Stage 2 (drawing, sound, full render, self-check: Fable)
· Stage 2.5 (teacher's-eye review, NOTES_REVIEW.md) · Stage 3 (render, checks, upload: Opus).

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

## For Stage 2 (Fable): start here
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
