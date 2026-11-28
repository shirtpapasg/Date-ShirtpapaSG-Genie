# EP17 build state (for a resume after a restart)
P3 EP17 "The caterpillar that becomes a butterfly: 4 stages" (Ch 5, Life Cycles of Animals, pp. 86-89). Part 1 "Is a Caterpillar a
NYMPH? The Butterfly's Secret Stage" (EP16's dare answered: not a nymph; a worm? the legs look-closer: six legs and PROLEGS; be a butterfly
egg; LARVA; HOLD ON! the pupa is just resting? PUPA; inside the pupa look-closer; OUR BUTTERFLY'S LIFE CYCLE; the moth; the cliffhanger:
something wriggling in a pail of rainwater) **5:19.5**. Part 2 "What's WRIGGLING in This Pail of Rainwater?" (Round 1: what comes after the
wriggler? the wrigglers look-closer: WRIGGLER; be a mosquito egg; the answer: the pupa; the Showdown: Basil's homework, DENGUE; the
flower-pot plate in an HDB corridor: STAGNANT WATER; the chant; the dragonfly; the dare into EP18: a frog and a mosquito, the same life
cycle?) **5:27.4**.
The script: `../p3_ep17_script.md` (version 1, Opus, 23 Nov 2026). The source of every spoken word: `script.py`.

Stages: **Stage 1 (setup, voices, timelines, staging): DONE 2026-11-23, Opus** · **Stage 2 (drawing, sound, full render, self-check) and
Stage 2.5 (teacher's-eye review, NOTES_REVIEW.md, fixes, re-render): DONE 2026-11-23** · Stage 3 (checks, upload: the main session).

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
- **Pronunciation** (the clip above): **fixed** in ../sg_pron.py and ../PRONUNCIATION.md (APPROVED by the teacher 23 Nov 2026, EP17 review page): "prolegs"
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

## Stage 2 done (2026-11-23): drawn, reviewed, fixed, rendered (NOT uploaded: the teacher has a quick look first)
- **Renders:** `ep17_part1.mp4` **5:19.5**, `ep17_part2.mp4` **5:27.4** (1920x1080, 30 fps, **-16.0 LUFS** both), captions `ep17_part1.srt` /
  `ep17_part2.srt`, contact sheets `sheet_part1.png` / `sheet_part2.png`. The mp4s are NOT committed (rebuild: `./build_part.sh 1` and `2`,
  about 11 min each under /tmp/explained_render.lock). Chunk folders deleted after muxing.
- **Countdowns measured in the renders** (`python3 measure_countdowns.py 1|2`): P1 Round 1 (3 s) numbers at 54.87, 55.87, 56.87, 57.87 s;
  HOLD ON! (5 s) steps 1.00 s from 190.64 (1 frame after the tick); P2 Round 1 (5 s) steps 1.00 s exactly from 45.26; Showdown (5 s) steps
  1.00 s from 161.25 (1 frame). Ticks and the bell on the numbers; no music and no ambience one-shot under any countdown.
- **Engine:** compared with ../ep15's finished engine (lib.js, common.js, closer.js, main.js; tests.js is EP-only): closer.js / main.js /
  lib.js identical apart from EP17's own parts (OUTCOMES, KW, KWLINE, learnAt marks, SHELF_HIDE). common.js: EP15's final versions of
  `SC.count` and `finalScene` (one size at one depth), `markScene` (the reader points at the card in the pause, then reads) and `nykScene`
  (no waving at the start) brought over; EP17's chant `PHR` kept. lib.js `KW`: STAGNANT WATER lands at [1250, 480] (clear of the magnifier).
- **EP16's dare cards** (`ep16dare.js`): copied unchanged from ../ep16/p2.js `nextPic` (PIC.nymph16: the grasshopper nymph with a ?;
  PIC.cat16: the caterpillar), drawn with EP16's own `hopper16` / `caterpillar16` (pond16.js, copied); `dareCard3` = EP16's choiceCard3.
- **Borrowed art files (copied unchanged, header noted):** home15.js, garden15.js (../ep15), pond16.js, art16.js (../ep16 snapshot).
- **New art:** `art17.js` (the animals: lime egg, caterpillar `cat17` with three pairs of true legs and five pairs of prolegs, the pupa
  `pupa17` with silk pad and girdle (no cocoon), the lime butterfly `bfly17` / `bflySide`, the moth, a silk cocoon, the wriggler, the
  mosquito pupa and adult, mosquito eggs, the dragonfly and its nymph; the loop board `loop4` (no numbers), `miniLoop4`, Pip's JUST RESTING!
  board, Basil's homework sheet); `sets17.js` (BG.lime17 + VL the lime-plant side, BG.corner17 + VCR the far corner after rain with the
  pail, BG.corr17 + VH the HDB corridor, BG.void17 + VD the void deck; all four baked in bg/); `lc17.js` (the four look-closers legsArt,
  pupaArt, wrigArt, plateArt; the journeys bflyJourney, mosqJourney; the recap, ring, idea, dengue, fun-fact and dare pictures, the chant
  board). p1.js / p2.js: every placeholder replaced; every mark kept.
- **Hidden-animal spots actually used** (changed from SCENES_TODO where the spot was not visible in the frame): P1 moth: void deck pillar
  (cold, back, title, game: intro) · a lime leaf at the plant's left (answer1: now the tip leaf of its own twig, the moth sitting on it) · on a leaf at the top (lime: drawn in front of the crown since 23 Nov, it was hidden behind the new leaves) · the fence post (waitw) ·
  the watering can on the pot's LEFT (larva) · the top of Pip's easel (holdon) · the board's top-left corner (ring) · REVEAL the side of
  the pot (liz). P2 dragonfly: a bamboo stake's tip (place, game: intro) · the pail's rim (waitw) · the tap (mosqans) · Basil's easel top
  (show) · on top of the letterboxes (fix) · the corridor railing (plate) · REVEAL the watering can's handle (liz).
- **Sound** (`sound_cues.js`, Stage 2 block): the garden bed, drips after rain, the corridor / void deck bed, foley on every mark (listed in
  NOTES_REVIEW.md); no ambience one-shot inside a countdown.
- **Review** (`NOTES_REVIEW.md`): 15 notes from the first full render, all fixed, both parts re-rendered whole. Open points there.
- **For the teacher:** `qa/highlights.jpg` (10 labelled stills), `qa/buddy_faces_p1.jpg` / `_p2.jpg` (every pose on screen with its time
  and reason, `pose_reasons.json`), `qa/preview_p1_clips.mp4` / `_p2` (720p with sound; not committed: rebuild with `./make_preview.sh`),
  `qa/ep1_compare_p1.jpg` / `_p2` (EP1 side by side), `qa/lines_p1.jpg` / `_p2` (a still at every buddy line), `qa/thumbs.jpg`.
- **Thumbnails (v2, `../thumb_v2.js` ep17_1 / ep17_2):** P1 **NYMPH?!** (yellow) + Basil surprised + the caterpillar with its legs and
  prolegs, lime-green burst; P2 **WHAT'S IN / HERE?** + Momo surprised + three wrigglers hanging in still water, sky-blue to violet burst.
  Bottom right kept free.
- **App:** `app_moments.json` (17A / 17B, keys O.cycles / CH.animalCycles, titles <= 64 characters, positive words only: checked in
  make_moments.py) and `production/youtube/chapters_p3.json` "EP17_P1" / "EP17_P2" (the main session swaps in the video ids).

## Leaves on twigs, full fades (23 Nov 2026, the teacher's rule "Plants grow the way real plants grow, and what is gone is gone")
- **The lime plant (`sets17.js` limePlant) is a real plant now** (EP18's `limePlant18` approach): the trunk, eight branches (`LIMEBR`) and
  eight side twigs (`LIMETW`), every leaf on a short leaf stalk (`limeLeaf`); the old 72 hash-scattered `LIMELEAVES` are gone. Same pot, same
  crown (x 815..1505, y 205..675), so nothing else in the scenes moved. The caterpillar's twig (answer1's twig, LT_CAT) is real wood, its
  leaves hanging below; the chewed leaf sits on a stalk at the caterpillar's head; the young leaf at LT_EGG on a stalk at the egg branch's tip
  (the egg moved 6 / 4 px with it: `camGlide` in p1.js follows, LT_EGG - [82, 26]); the pupa hangs from the pupa branch's end; `o.cut`
  still drops about 10% of the leaves. Hidden moth: answer1's leaf (820, 330) is the tip leaf of a twig off the egg branch; the lime scene's
  moth (on a top leaf) is drawn in front of the crown (`MOTHAT` 5th field "front").
- **Other plants:** the far corner's bean vines (`BG.corner17`, re-baked: `node bake.js corner17`) carry their leaves on the vines; the
  flower pots on plates (`plantPotPlate`, corner and corridor) have stems from the soil, leaves on the stems and the pink flower on its
  stem (it floated before); inside the pupa (`pupaArt`) the two leaves come in on twigs from the panel's edges; the journey's out-of-focus
  leaves (`leafField`) hang from the out-of-focus branch; the ring picture, Part 2's recap picture and the egg tile (`bPic`) leaves got their
  stalks / twig. New helpers in sets17.js: `stalkLeaf17`, `leafyTwig17`. Unchanged (fine): fallen leaves floating on water (pail, plate),
  the legs look-closer's leaves (on the twig), the planter herbs.
- **Fades checked:** nothing that is gone stays as a ghost (the plate's water, its leaves and the hand fade to 0; the mosquito loop's dimmed
  tiles carry their "no eggs / no wrigglers ..." labels on purpose; the journey's background leaves are out of focus, not gone).
- Stills checked at every plant scene (P1 cold, back, answer1, lime, waitw dive, pullout, larva, lcpupa, ring, final; P2 recap, place,
  waitw, show, plate). Both parts re-rendered whole (below).
- **Re-rendered 23 Nov (after the leaf fix), both parts whole** (`./build_part.sh 1` and `2`, audio unchanged): `ep17_part1.mp4` **319.53 s**
  (9586 frames), `ep17_part2.mp4` **327.47 s** (9824 frames), 1920x1080 30 fps, **-16.0 LUFS** both; srt and sheet_part1/2.png rebuilt;
  chunks deleted. Part 2's Showdown fix poses (Basil oops, Pip and Momo arms crossed through the fix) come from p2.js, so they are in the full
  render (checked at 176, 185, 195 s); `out/fix_170.mp4` (the old splice) is no longer needed. Countdowns unchanged: P1 Round 1 54.866..57.866,
  HOLD ON! 190.638..195.638 (1 frame after the tick, as before), P2 Round 1 45.264..50.264, Showdown 161.248..166.248, all 1.000 s steps.
  `qa/highlights.jpg` and `qa/preview_p1_clips.mp4` (67.8 s) / `_p2` (64.7 s) rebuilt. Thumbnails not touched (no plant in them).

## v2: the cold open speaks (2026-11-24, Opus; teacher: "Not speaking for the first few seconds", "fix the live ones too")
- SERIES_FORMAT 11 item 1, EP22's approach: Heart's "Last time, we asked:" now starts at **0.825 s** (was 6.3 s). The lime plant stays
  under "A caterpillar! One day, it will become a butterfly." (munch 0.6, cardsIn after a201 at 2.0, budsIn on "One" 3.57); "lasttime"
  starts .45 s before "Is" (ltIn 6.08; build_tl.py's ("scene", name, {"at": mark, "d": s}), copied from ep22). p1.js: camCold over the
  whole scene, the place card from 0.2 s. Every later Part 1 time is **5.475 s earlier**; no voice re-recorded.
- The voice wavs were gone (only the jsons stayed). Re-made with make_voice.py's own engine (Heart bit-identical; the buddies' Character
  Voice Kit is not bit-exact run to run: same takes within a few ms / ~3 cents). The jsons are unchanged.
- **Final renders (after the n2 4-decimal fix and the lock-in ring clip, commit 3cc1bd4):** `ep17_part1.mp4` 314.067 s, 9422 frames,
  -16.0 LUFS, decodes; first word 0.825 s; Round 1 49.391 ... 52.391, HOLD ON! 185.13 ... 190.13 (steps 1.000). `ep17_part2.mp4` re-rendered
  from the unchanged script (it already spoke at 0.30 s; one-bed music fix; also picks up the moved wrigglers): 327.467 s, 9824 frames,
  -16.0 LUFS, decodes; Round 1 45.264 ... 50.264, Showdown 161.248 ... 166.248 (as before). New srt, sheets, `qa/open_p1_first25.jpg`.
- Records: app_moments.json (17A 5.475 s earlier, len 5:14), chapters_p3.json keys **EP17_P1_v2** / **EP17_P2_v2**, **upload_v2.json**
  (explained-p3-ep17v2-part1/2, after explained-p3-ep16v2-part2, replaces TKO73GxJVB0 + 6rVLGfilVXQ, retire_old). Not uploaded. The music
  agent adds Kampong Walk to both mp4s.
