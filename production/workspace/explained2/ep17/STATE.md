# EP17 build state (for a resume after a restart)
P3 EP17 "The caterpillar that becomes a butterfly: 4 stages" (Ch 5, Life Cycles of Animals, pp. 86-89). Part 1 "Is a Caterpillar a
NYMPH? The Butterfly's Secret Stage" (EP16's dare answered: not a nymph; a worm? the legs look-closer: six legs and PROLEGS; be a butterfly
egg; LARVA; HOLD ON! the pupa is just resting? PUPA; inside the pupa look-closer; OUR BUTTERFLY'S LIFE CYCLE; the moth; the cliffhanger:
something wriggling in a pail of rainwater) **5:19.5**. Part 2 "What's WRIGGLING in This Pail of Rainwater?" (Round 1: what comes after the
wriggler? the wrigglers look-closer: WRIGGLER; be a mosquito egg; the answer: the pupa; the Showdown: Basil's homework, DENGUE; the
flower-pot plate in an HDB corridor: STAGNANT WATER; the chant; the dragonfly; the dare into EP18: a frog and a mosquito, the same life
cycle?) **5:27.4**.
The script: `../p3_ep17_script.md` (version 1, Opus, 23 Nov 2026). The source of every spoken word: `script.py`.

Stages: **Stage 1 (setup, voices, timelines, staging): DONE 2026-11-23, Opus** · Stage 2 (drawing, sound, full render, self-check: Fable)
· Stage 2.5 (teacher's-eye review, NOTES_REVIEW.md) · Stage 3 (render, checks, upload: Opus).

## For the teacher to listen to (before Stage 3)
- **`../pron_clips/Heart_ep17_new_words.m4a`** (Heart, 11 sentences, 1.2 s apart; sentence 3 is Basil):
  1 "...They are called prolegs." AFTER the fix ("PRO-legs") · 2 the same BEFORE (Kokoro's own "PRO-lugz") · 3 Basil: "Prolegs are false
  legs that help the caterpillars to move." (after the fix) · 4 larva, moults · 5 pupa, pupal case · 6 wriggler(s) · 7 dengue, stagnant
  water · 8 "Aedes albopictus and Aedes aegypti" BEFORE (Kokoro's own "EEDS") · 9 the same AFTER the fix ("ay-EE-deez al-boh-PIK-tus",
  "ay-EE-deez ee-JIP-tie") · 10 pupae, larvae · 11 cocoon, a dragonfly nymph that "lives" (leevz) underwater.
- The voices are already recorded WITH the two fixes (a705, a706b, a708, the read-along "Prolegs"; b806). If the teacher rejects a fix:
  change `../sg_pron.py`, delete the affected `voice/<id>.json`, re-run make_voice.py and build_tl.py (one or two lines each).

## Stage 1 done (2026-11-23)
- **Engine copied from `../ep16/`** (its live engine, unchanged): lib.js (EP15's v2-cast working copy: `SIZE_K` basil **.94**,
  `POSE_SUB` worried -> thinking for Pip and Momo, the one-job-per-pose `reactPose` / cheer only when learnt, the `_POSE` QA hook),
  common.js, closer.js, shrink.js, props.js, hotel.js, garden.js, trail.js, materials.js, canteen.js, pics.js, song.js, music.js, audio/,
  render.js, finish.sh, bake.js, build_part.sh, build_all.sh, dump_cues.js, probe.js, stills.js, sheet.sh, measure_countdowns.py,
  compare_ep1.py, build_tl.py, make_voice.py (header + EXTRA), main.js (+ `XDEFS17()` if it exists), page.html (tests.js + ep16dare.js);
  bg/ stage, stage2, daystage, _grain; the ritual voices h501, h860, h864, h1304a/o/t, h1305, u1300, u1305, u1002. NOT copied: EP16's scene
  art (art16.js, pond16.js, garden15.js, home15.js, its p1/p2, tests.js, ep15dare.js). ep16 was mid-Stage-2 (uncommitted art16.js / p1.js
  changes); none of its engine files had changed since its Stage 1 except lib.js's KW position (EP16-only). **Stage 2: diff this engine
  against ../ep16's once EP16 is finished and take any later engine fixes** (not the EP-only parts: OUTCOMES, KW, KWLINE, PHR, learnAt marks).
- **Sprites** (`prep_sprites.py`, 41 sprites): the v2 cast as EP16: Pip (grey, unchanged), `momo_v2`, `basil_v2`.
- **Changed for EP17:** lib.js `OUTCOMES` (P1: Round 1 at ansglow Pip, Momo right / Basil wrong; the look-closer guess Momo (a worm) wrong
  at a703p; HOLD ON! at a1003 Basil, Momo right / Pip wrong. P2: Round 1 at ansglow Basil, Pip right / Momo wrong; Showdown at b804p Pip,
  Momo right / Basil wrong; the look-closer guess Pip (too little water) wrong at the mark `wrigglers`), `learnAt` (kw_*, v_*, ltback,
  rewrite, jpupa, jfly), `KW` / `KWLINE` (P1 PROLEGS, LARVA, PUPA; P2 WRIGGLER, DENGUE, STAGNANT WATER, all o.at), `SHELF_HIDE` (+ lclegs,
  lcpupa, lcwriggler, lcplate); common.js `PHR` (the chant). New: `ep16dare.js` (a STUB: EP16's dare cards are not drawn yet; copy EP16's
  two card pictures in at Stage 2 and set `DARE_PICS`), `tests.js` (HIDDEN, MOTH / MOTH_R, DRAGONFLY / DRAGONFLY_R (intro / reveal
  spots), limePH, cornerPH, lcPH, ringPH, the small print, the part colours, ffPH / FF), `p1.js` / `p2.js` (placeholders; the shared
  routines wired: recap with EP16's two cards, title, gameScene push-ins, goals, lock-ins (P1 Round 1 two cards, P2 three), thought
  bubbles, look-closer frames, strips, Mark Sentences, journey tags + riders, chant, score hands, lizReveal + funFact, the dare's two
  cards, read-along, Now you know), `sound_cues.js` (a GENERIC Stage 1 plan; the places' ambience and foley per scene in SCENES_TODO),
  finish.sh's contact-sheet marks and compare_ep1.py's scenes (EP17), `make_todo.py` -> `SCENES_TODO.md` (full staging per scene and
  per line, every pose WITH ITS REASON, the hidden animal's spot per scene, real places with ambience and foley on the marks),
  `upload.json`.
- **Pronunciation** (the clip above): **fixed** in ../sg_pron.py and ../PRONUNCIATION.md (waiting for the teacher's listen): "prolegs"
  (pɹˈoʊlˌɛɡz), "Aedes albopictus" / "Aedes aegypti" (the script's respelling "Ay-ee-deez" read as "EYE-ee-deez": the AEDES respelling in
  script.py is now empty). Dropped b906's "pupae" respelling (Kokoro's own is right). Left to Kokoro: larva(e), pupa, pupal, wriggler(s),
  dengue, stagnant, cocoon, dragonfly, nymph, moth.
- **Voices** (`voice/`, `make_voice.py`, log `voice.log`): every line recorded (Heart: Kokoro af_heart via sg_pron; buddies: the
  Character Voice Kit, 12% slower), aligned (pocketsphinx; new dictionary words in EXTRA). Four lines the aligner missed were spread by word length (PROPORTIONAL): a404, a505, hk_prolegs (one word), b502p (its `tube` mark is approximate).
- **Timelines:** `python3 build_tl.py 1|2` -> tl_p1/2.json/js: **Part 1 5:19.5, Part 2 5:27.4** (target 5:15-5:35). Both inside the target: **no cut** beyond the script's section 6 list (`CUTS` unchanged).
  `node dump_cues.js 1|2` -> cues. A sweep rendering every 0.25 s of both parts in the page: no errors, no NaN. Cues: 87 / 104 events.
- **Book strips with two sentences** (a1102, a1201, b806) are shown one sentence at a time (`lcStrips`, tests.js): one line at 50 px ran off the frame.
- **Scores:** Part 1 Round 1 1 : 1, HOLD ON! 2 : 1; Part 2 Round 1 1 : 1, Showdown 3 : 1.
- **upload.json:** both parts public, Made for Kids (the uploader sets it), playlists PLb8LpPqxQI4E and PLPfEuT7l4KjI right after
  `explained-p3-ep16-part2`; **`replaces: ["2Atm-edXKVk"]`, `retire_old: true`** (the classic P3 no. 10 "A Tadpole Has No Legs. So How
  Does It Become A Frog?", pp. 80-89, now covered by EP16 + EP17; never deleted, it gets a NEW VERSION first line). Titles and
  descriptions from script section 7. **The B-L-O-C-K steps carry a `[CHECK NEA wording]` marker in both descriptions: the main session
  checks them against NEA's current Mozzie Wipeout page and removes the marker before upload.** **Not run.**

## For Stage 2 (Fable): start here
- Read `SCENES_TODO.md` top to bottom (the rules block first, especially rule 5 and "Changed from the script's tables"), then
  `../p3_ep17_script.md` section 3 (Realism) and 11.
- Places: EP15 / EP16's community garden (the lime-plant side; the far corner by the tap after rain; the void deck) and an HDB corridor.
  Borrow ../ep15/garden15.js and ../ep16's garden art; put EP17's sets in new files (e.g. `lime17.js`, `corner17.js`, `corridor17.js`)
  loaded after ep16dare.js in page.html. Replace the placeholders; keep every mark (the sound keys on them).
- Models: ../ep16 (once drawn) `SC.holdon`, `SC.show` / `SC.fix`, `SC.dare`, the look-closers; ../ep15 the same.
- Before rendering: copy EP16's dare-card art into ep16dare.js. Then `./build_part.sh 1` and `2`, contact sheets, the teacher's-eye
  review, fixes, upload (`--check` first).

## Open points
- The two sg_pron fixes wait for the teacher's listen (above).
- Part 1 has room for script section 6's first line to come back (`mealworm`, a909m, about +5 s: the book's first four-stage animal).
- The book's larva and pupa words are printed for the beetle (5.7); the strips use them for the butterfly (script section 12, point 2).
- The dengue picture is calm (a child in bed, cared for); the teacher may prefer none (script section 12, point 4).
- Fun facts checked from established natural history (no web access): many moth caterpillars spin a silk cocoon (silk from the silkworm
  moth); dragonfly nymphs live underwater and eat mosquito larvae.
- School Lab 5.1 stays out of the description until its bench stops numbering the stages.
