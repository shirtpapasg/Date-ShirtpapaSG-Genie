# EP18 build state (for a resume after a restart)
P3 EP18 "Frog vs mosquito: same or different? How to compare" (Ch 5, Life Cycles of Animals, pp. 90-98; the Cycles theme closes). Part 1
"Frog vs Mosquito: SAME or DIFFERENT? Count the Stages!" (EP17's dare answered: different; SIMILARITIES and DIFFERENCES; be a raindrop:
three stages and four; OBSERVABLE CHARACTERISTICS; HOLD ON! frog and grasshopper "exactly the same"; the young beside their parents; the
cicada; the cliffhanger: the hen on her eggs) **5:28.2**. Part 2 "Which Came First, the Chicken or the EGG?" (Round 1: neither; be an egg;
REPEATED, NO FIRST OR LAST STAGE; the Showdown: Momo's mosquito and mealworm-beetle homework; PHYSICAL FEATURES; the butterfly lays an
egg, 5.17 and the theme's three questions; the chant; the honeybee; the dare into EP19: a magnet, a steel pin and a copper wire) **5:33.6**.
The script: `../p3_ep18_script.md` (version 1, Opus, 23 Nov 2026). The source of every spoken word: `script.py`.

Stages: **Stage 1 (setup, voices, timelines, staging): DONE 2026-11-23, Opus** · Stage 2 (drawing, sound, full render, self-check: Fable)
· Stage 2.5 (teacher's-eye review, NOTES_REVIEW.md) · Stage 3 (render, checks, upload: Opus).

## For the teacher to listen to (before Stage 3)
- **DONE 23 Nov:** the teacher said "OK to all" and chose **cicada = sih-KAY-duh** (Kokoro's own). The sg_pron entries were removed; k301a, k301b,
  k1202 and k1203b re-recorded; tl_p1/2 rebuilt (Part 1 5:28.7, Part 2 5:33.6). The honeybee line ("more than a thousand") stays: the
  teacher OK'd the clip that says it, and a queen at her peak lays about 1,500 to 2,000 a day.
- **`../pron_clips/Heart_ep18_new_words.m4a`** (68 s, 11 sentences, 1.2 s apart): 1 similarities, differences · 2 observable
  characteristics · 3 "A little cicada is hiding..." AFTER the fix ("sih-KAH-duh") · 4 the same BEFORE (Kokoro's own American
  "sih-KAY-duh") · 5 Basil's cicada fun fact (after the fix; "seventeen"; "live underground" = "leev") · 6 honeybee · 7 Pip: a queen
  honeybee, a thousand eggs · 8 Basil: mealworm, beetle (Kokoro's soft American t in "beetle") · 9 repeated, no first or last stage ·
  10 physical features · 11 flower-pot plate, wrigglers, larvae.
- The voices are already recorded WITH the cicada fix (k301a, k301b, k1202, k1203b). If the teacher prefers "sih-KAY-duh": delete the two
  `cicada` entries in `../sg_pron.py`, delete those four `voice/<id>.json`, re-run make_voice.py and build_tl.py.
- The fun facts (no web access here): periodical cicadas in the eastern US spend 17 years underground as nymphs (very sure); a western
  honeybee queen at her peak lays 1,500 to 2,000 eggs a day (the line says "can lay more than a thousand"; "hundreds" is the very safe
  version, script section 3).

## Stage 1 done (2026-11-23)
- **Engine copied from `../ep15/`** (the newest finished engine, its v2-cast redo, committed 7aac825): lib.js (`SIZE_K` basil **.94**,
  `POSE_SUB` worried -> thinking for Pip and Momo, one job per pose: reactPose only "thinking" after a real question, cheer only when
  learnt or `o.achieved`, the `_POSE` QA hook), common.js (lockN: the lead thinks, then is WORRIED through the countdown; markScene: the
  reader points at the card in the pause; one size at one depth), closer.js (faces listen; poses only via `peekEv`), shrink.js, props.js,
  hotel.js, garden.js, trail.js, materials.js, canteen.js, pics.js, song.js, music.js, audio/, render.js, finish.sh (ep18 names, EP18
  contact-sheet marks), bake.js, build_part.sh, build_all.sh, dump_cues.js, probe.js, stills.js, sheet.sh, measure_countdowns.py (ep18
  names; same ring lengths as EP15: P1 3 s and 5 s, P2 5 s and 5 s), compare_ep1.py (EP18 scenes), build_tl.py, make_voice.py (header +
  EXTRA), main.js (+ `XDEFS18()` if it exists), page.html (tests.js + ep17dare.js), the QA tools pose_audit.js, faces_sheet.js/.py,
  make_preview.sh (its spans are still EP15's: set them after the render); bg/ stage, stage2, daystage, _grain; the ritual voices h501,
  h860, h864, h1304a/o/t, h1305, u1300, u1305, u1002. NOT copied: EP15's scene art (home15.js, garden15.js, its p1/p2, tests.js,
  ep14dare.js), pose_reasons.json, highlights.py, make_moments.py (EP15-only; copy and point them at EP18 at Stage 3).
- **Sprites** (`prep_sprites.py` with the heart-tts venv python, 41 sprites, identical to EP15's): Pip (grey), `momo_v2`, `basil_v2`.
- **Changed for EP18:** lib.js `OUTCOMES` (P1: Round 1 at `ansglow` Pip right / Momo wrong; **Basil right card, wrong reason (size): no
  point, never confident: he listens at ansglow and is shy at Heart's k804**; HOLD ON! at k1003 Basil, Momo right / Pip wrong. P2: Round 1
  at `ansglow` Pip, Momo right / Basil wrong; Showdown at d804b Basil, Pip right / Momo wrong), `learnAt` (kw_*, v_*, jfrog, jmosq, jagain,
  rewrite, plant), `KW` / `KWLINE` (P1 SIMILARITIES, DIFFERENCES (two spots: both land in k603), OBSERVABLE CHARACTERISTICS; P2 REPEATED,
  NO FIRST OR LAST STAGE, PHYSICAL FEATURES; all o.at), `SHELF_HIDE` (+ lccompare, lcyoung, lcloop, lcbeetle); common.js `PHR` (the
  chant). New: `ep17dare.js` (a STUB: EP17's dare cards are not drawn yet; copy them in at Stage 2 and set `DARE_PICS`), `tests.js`
  (HIDDEN, CICADA / CICADA_R, BEE / BEE_R (intro / reveal spots), deckPH, gardenPH, lcPH, ringPH, the small print, SAMEC / DIFFC /
  WRIGC / MEALC, cmpChip, dots (the journey's tally), ffPH / FF), `p1.js` / `p2.js` (placeholders; the shared routines wired: recap with
  EP17's two cards, title, gameScene push-ins, goals (Momo / Basil), lock-ins (P1 two cards 3 s, P2 three cards 5 s), look-closer frames
  with their SAME / DIFFERENT chips, the raindrop's two dot counters, journey tags + riders, Mark Sentences (Pip, Momo / Basil, Pip), the
  5.17 strip, chant, score hands, lizReveal + funFact, the dare's three cards, read-along, Now you know), `sound_cues.js` (a GENERIC Stage 1
  plan; the places' ambience and foley per scene in SCENES_TODO), `make_todo.py` -> `SCENES_TODO.md` (full staging per scene and per line,
  every pose WITH ITS REASON (few: listening is the default; about 30 pose moments a part, most wired), the hidden animal's spot per scene,
  the void deck and the garden with ambience and foley on the marks, "Changed from the script's tables"), `upload.json`.
- **Script changes at Stage 1** (script.py and ../p3_ep18_script.md): the LARVAE respelling ("larvee", "pew-pee") is now empty: Kokoro's
  own "larvae" / "pupae" are right (EP17's clip; the respelling stressed both halves). Part 2 was 5:37.5 with section 6's cuts in use, so three more
  non-teaching trims: Momo's "My homework!" (d802m), the theme board's hold 1.5 s -> .8 s (both section 6's list, in order), and the
  first half of Basil's bee tip "Bees fly from flower to flower." (d201b, now "Look for a fuzzy, striped body!": game chatter, the twin of
  Part 1's listed tip cut). Part 1 needed no cut.
- **Pronunciation**: "cicada(s)" = "sih-KAH-duh" through ../sg_pron.py (new entries; ../PRONUNCIATION.md row "waiting for the teacher's
  listen"). Left to Kokoro (same clip): similarities, differences, observable characteristics, honeybee, mealworm, beetle, seventeen,
  repeated, physical features, wrigglers, larvae.
- **Voices** (`voice/`, `make_voice.py`, log `voice.log`): every line recorded (Heart: Kokoro af_heart via sg_pron; buddies: the
  Character Voice Kit, 12% slower), aligned (pocketsphinx; new dictionary words in EXTRA: beetle's, flower-pot, pupae, wriggler(s),
  wriggles). Only the two one-word read-along lines hk_similarities and hk_differences were spread by word
  length (PROPORTIONAL: one word each, so exact enough). Re-running make_voice.py keeps finished files and records only changed lines.
- **Timelines:** `python3 build_tl.py 1|2` -> tl_p1/2.json/js: **Part 1 5:28.2, Part 2 5:33.6** (target 5:15-5:35). `node dump_cues.js 1|2`
  -> cues. A sweep rendering every 0.25 s of both parts in the page: no errors, no NaN.
- **Scores:** Part 1 Round 1 1 : 0, HOLD ON! 2 : 0; Part 2 Round 1 1 : 1, Showdown 3 : 1.
- **upload.json:** both parts public, Made for Kids (the uploader sets it), playlists PLb8LpPqxQI4E and PLPfEuT7l4KjI right after
  `explained-p3-ep17-part2`; **`replaces: ["xaCprQPXVYY"]`, `retire_old: true`**: the classic P3 no. 11 "Frog Or Mosquito: Who Changes
  More? Comparing Life Cycles" covers exactly pp. 90-98 (lab 5.2; ../../episode-guide/explained-episode-guide.html), so EP18 retires it
  (out of both playlists, a NEW VERSION first line; never deleted or unlisted). Part 2's title drops the script's "and" (YouTube's
  100-character limit: "Which Came First, the Chicken or the EGG? (Part 2) | No First or Last Stage, Why Life Cycles Matter").
  Titles and descriptions from script section 7. School Lab 5.2 line left out (the bench numbers the stages). **Not run.** Upload only
  after EP17 is live.
- **Thumbnails (Stage 2, THUMBNAIL_V2, thumb_v2.js `ep18_1`, `ep18_2`):** P1 **SAME?!** + Momo surprised + a frog and a friendly mosquito
  face to face on a lily pad's edge, each with its loop (three tiles, four tiles); warm yellow to orange-red burst. P2 **WHICH FIRST?** +
  Basil surprised + the hen on her nest with a big egg in front, a ? between; magenta to deep purple burst. Alternates: FROG = MOSQUITO? /
  EGG OR HEN?

## For Stage 2 (Fable): start here
- Read `SCENES_TODO.md` top to bottom (the rules block first, especially rules 4 to 6 and "Changed from the script's tables"), then
  `../p3_ep18_script.md` sections 3 (Realism) and 11.
- Places: our block's void deck with the LIFE CYCLE DAY board (new) and EP15 to EP17's garden edge (the hen's nest, the ixora, the lime
  plant). Borrow ../ep15/garden15.js and EP16 / EP17's garden art once drawn; put EP18's sets in new files (e.g. `deck18.js`, `edge18.js`)
  loaded after ep17dare.js in page.html. Replace the placeholders; keep every mark (the sound keys on them).
- Models: ../ep16 and ../ep17 (once drawn) `SC.holdon`, `SC.show` / `SC.fix`, `SC.dare`, the look-closers; ../ep15 the same; EP14's
  day-and-night loop (../ep14/) for `lcloop`.
- Before rendering: copy EP17's two dare-card pictures into ep17dare.js; diff this engine against ../ep16 and ../ep17 once they are
  finished and take any later engine fixes (not the EP-only parts: OUTCOMES, KW, KWLINE, PHR, learnAt marks); pass `o.achieved` for
  Basil's cheer after Part 2's Mark Sentence 1 (his own mistake fixed). Then `./build_part.sh 1` and `2`, contact sheets, the
  teacher's-eye review, fixes, upload (`--check` first).

## Open points
- The cicada respelling waits for the teacher's listen (above).
- Part 1 (5:28.2) has room for script section 6's first line to come back (`k805b`, Basil: "Oops! I compared their sizes. Next time, I
  will count the stages, like Pip.", about +5 s): good modelling of fixing his own reason; one line to record.
- The theme board's answer chips (C1 to C3) are on screen only; the teacher may want them spoken (script section 12, point 4).
- 5.13 and 5.17a are not read in full (length): 5.13 is shown by the young look-closer, 5.17a is Momo's own words.
- Pip has no back-view painting yet (Part 1's cliff asks for back views of Momo and Pip watching the nest).

## Stage 2 (drawing, sound, render, self-check): IN PROGRESS 2026-11-23 (resume from here)
- **Drawn (all placeholders replaced, every mark kept):** `art18.js` (new): the cicada (`cicada18`, its nymph), the honeybee (`bee18`, the
  queen), the mealworm, its pupa and the beetle, the hen sitting on her straw nest (`henNest18`), ONE loop style for every life cycle
  (`loopN`: n tiles round curved arrows, no numbers), the LIFE CYCLE DAY board with its COMPARE FRAME (`lcdBoard`, `compareFrame`), our void
  deck (`BG.deck18` baked + `VDK`: the rain tree outside, the fan, a pigeon, a child cycling past), the garden's edge (`VGE` on EP17's baked
  `lime17`: ixora, the low bush over the nest, the lime plant with small white flowers, the watering can), the four look-closers
  (`compareArt`, `youngArt`, `loopArt` + `dayNight18`, `larvaeArt`), the two journeys (`rainJourney`, `eggJourney18`), Pip's sheet, Momo's
  homework, the mealworm tub, the theme board, the picture model, the dare's magnet / pin / wire, the chant board, the recap and fun-fact
  pictures. Borrowed unchanged (headers say so): `home15.js`, `garden15.js`, `pond16.js`, `art16.js` (from ../ep16), `art17.js`, `sets17.js`,
  `lc17.js` (from ../ep17, 23 Nov snapshot). `ep17dare.js`: EP17's own dare cards (twoLoops with = / ≠; their two name labels lifted 16 px
  because at y 120 choiceCard3 clipped their tails: "froa"; EP17's own dare has the same clip). Baked: deck18, void17, lime17, pond16, grass16.
- **Engine:** main.js also calls XDEFS16 / XDEFS17; common.js markScene passes `o.achieved` (Basil's cheer after Part 2's Mark Sentence 1).
- **Hidden animals:** cicada intro on the rain tree's trunk (cold/back/title/game), then the pillar by the letterboxes (board), the flower pot's
  rim by the pond (waitw: was "planter wall", the pond set has none), the side of the letterboxes behind a flyer (answer), the top of Pip's
  easel (holdon), the REVEAL on the board's easel leg. Honeybee intro on an ixora flower (place/game), then a yellow flower of the bush over the
  nest (waitw), the bench's armrest (eggans), the top of Momo's easel (show), the watering can's spout (fix), the tub's lid (beetle), the lime
  pot's rim (closure), the REVEAL on a white flower of the lime plant. Never on screen in a look-closer, a journey or a countdown.
- **Part 1 cliffhanger adapted:** no back views (Pip has no back painting): Momo and Pip face the nest from the right, front views turned in.
- **Sound:** song.js = EP16's (with R.hens) + R.deck (the void deck bed) + cicada / bzz / whine one-shots; sound_cues.js Stage 2 block (beds
  per place, rain over the pond, foley on the marks). Mixes -16.0 LUFS.
- **Poses:** pose_audit.js: Part 1 32 moments, Part 2 31, every one with its reason in `pose_reasons.json`.
- **QA tools ready:** make_preview.sh spans (EP18), make_moments.py (app_moments.json + chapters_p3.json EP18_P1 / EP18_P2 written),
  highlights.py (EP18 stills). Next: render (`./build_part.sh 1` and `2` under /tmp/explained_render.lock, only with >= 4 GB free), then
  measure_countdowns.py, compare_ep1.py, faces_sheet.js/.py, highlights.py, make_preview.sh.
- **Render NOT done (blocked, 23 Nov 16:50):** the hard rule needs >= 4 GB free on / before a full render; the shared disk stayed at 1.9 to
  2.7 GB from 14:49 to 16:50 (no render running at the end; the space is other agents' files, which this agent may not delete). Resume:
  check `df -h /` (>= 4 GB), then `./build_part.sh 1` and `./build_part.sh 2` (they take /tmp/explained_render.lock), then
  `python3 measure_countdowns.py 1|2`, `python3 compare_ep1.py 1|2`, `python3 highlights.py`, `./make_preview.sh`; delete out/chunks_p* after.
  A render needs only about 0.5 GB per part (EP17: video 110-120 MB, chunks about the same).
- **Self-check done on the page (no render needed):** a sweep of both parts every 0.25 s (no errors, no NaN); contact stills of every scene,
  fixed: Pip's sheet / Momo's sheet hidden behind the speaker, the compare look-closer's verdict over the strips and its pan cutting the
  loops, EP17's dare-card labels clipped ("froa"), the hen standing on (not sitting in) her nest, the cliffhanger's nest off the bottom of the
  frame, the answer's dare cards over the board's banner, the young look-closer's labels and bubbles overlapping (the nymph now smaller than the
  adult), the fun-fact question pill over the panel, the chick's own wings drawn off-screen, the new egg not centred in the golden circle, the
  5.17 strip under the shelf, the theme board too small to read, the chant board and the dare's magnet under the shelf, a 1-frame
  Basil pointing at the end of HOLD ON!. Pose audit: P1 32 / P2 31 moments, each with its reason (qa/buddy_faces_p1/p2.jpg).
- **Still weak:** the OUR CYCLES THEME board is on screen only about 2 s (the script's .8 s hold); the raindrop's fall is simple; the
  chick's view of the mother hen is a big head and body from the corner; Momo's v2 talking sprite has her arms crossed (the cast's own art).

## Stage 2 DONE (2026-11-23, after the coordinator freed space and lowered the rule to 3 GB for EP18)
- **Teacher's two new rules applied before the final render:** every leaf on a twig (`limePlant18`: EP17's lime plant scattered its leaves;
  the ixora's and the bush's leaves now sit on their masses; the white flowers at twig ends) and full fades (the picture model's plants, the
  hatched frog-egg clump); shy / confident through every fix: P1 answer (Momo oops, Pip arms crossed; Basil oops from k804), HOLD ON! (Pip
  oops, Basil and Momo arms crossed to the end; Pip's face shy in lcyoung until k1104), P2 eggans (Basil oops; Pip, Momo arms crossed; his
  face shy in lcloop until REPEATED), Showdown and fix (Momo oops through the fix; Basil and Pip arms crossed). Basil's cheer after P2 Mark
  Sentence 1 removed (a fixed mistake is no longer a cheer). Pose audit: P1 36, P2 37 moments, reasons in pose_reasons.json.
- **finish.sh** had a Stage 1 syntax error (an extra parenthesis in the contact-sheet marks): fixed; the srt and sheets now build.
- **Rendered:** `ep18_part1.mp4` **5:28.7** (328.7 s), `ep18_part2.mp4` **5:33.6** (333.6 s), 1920x1080 30 fps, -16.0 LUFS (not committed);
  `ep18_part1/2.srt`, `sheet_part1/2.png`. Chunks deleted.
- **Countdowns (measure_countdowns.py):** P1 Round 1 3 steps of 1.000 s, bell 59.759 = timeline; HOLD ON! 5 x 1.000, bell 231.087; P2 Round 1
  5 x 1.000, bell 49.898; Showdown 5 x 1.000 (the number changes 1 frame after the tick, 172.369 vs 172.336), bell 177.336.
- **Review pack:** qa/buddy_faces_p1.jpg, qa/buddy_faces_p2.jpg, qa/preview_p1_clips.mp4 (82 s), qa/preview_p2_clips.mp4 (87 s; not
  committed), qa/highlights.jpg, qa/ep1_compare_p1/p2.jpg; thumbnails thumb_part1.jpg (SAME?!) / thumb_part2.jpg (WHICH FIRST?) via
  ../thumb_v2.js ep18_1 / ep18_2; app_moments.json; chapters_p3.json EP18_P1 / EP18_P2. Not uploaded.

## 23 Nov: LIVE
Teacher: "ok to upload all". Part 1 MnDMkHAvOjc, Part 2 f2MG82O_9sA (after EP17 in both playlists); classic xaCprQPXVYY retired (NEW VERSION line -> Part 1). Chapters: chapters_p3.json.

## v2: the cold open speaks (2026-11-24, Opus; teacher: "Not speaking for the first few seconds", "fix the live ones too")
- SERIES_FORMAT 11 item 1, EP22's approach: Heart's "Last time, we asked:" now starts at **0.825 s** (was 6.3 s). The void deck stays under
  "A frog and a mosquito! Both lay their eggs in water, and both have young that look nothing like the adult." with every cold mark on a word
  of the dare: loopsIn on "frog" 2.26, cardsIn on "Both" 4.06, budsIn on "young" 6.84; "lasttime" starts .45 s before "Are" (ltIn 9.21;
  build_tl.py's ("scene", name, {"at": mark, "d": s}), copied from ep22). The cold scene is 8.8 s (was 6.0 s), all of it spoken over.
  p1.js: camCold over the whole scene, the place card from 0.2 s. Every later Part 1 time is **5.475 s earlier**; no voice re-recorded.
- The voice wavs were gone (only the jsons stayed). Re-made with make_voice.py's own engine (Heart bit-identical; the buddies' Character
  Voice Kit is not bit-exact run to run: same takes within a few ms / ~3 cents). The jsons are unchanged.
- **Renders (after the n2 4-decimal fix and the lock-in ring clip):** `ep18_part1.mp4` 323.233 s, 9697 frames, -16.0 LUFS, decodes; first
  word 0.825 s; Round 1 51.284 ... 54.284, HOLD ON! numbers 220.645 ... 225.645 (bell 225.612 = timeline; steps 1.000). Part 2 re-rendered
  from the unchanged script (it already spoke at 0.30 s; one-bed music fix): `ep18_part2.mp4` 333.6 s, 10008 frames, -16.0 LUFS, decodes;
  Round 1 44.898 ... 49.898, Showdown numbers 172.369 ... 177.369 (steps 1.000). New srt, sheets, `qa/open_p1_first25.jpg`. The music
  agent adds Kampong Walk to both mp4s.
- Records: app_moments.json (18A 5.475 s earlier), chapters_p3.json keys **EP18_P1_v2** / **EP18_P2_v2**, **upload_v2.json**
  (explained-p3-ep18v2-part1/2, after explained-p3-ep17v2-part2, replaces MnDMkHAvOjc + f2MG82O_9sA, retire_old). Not uploaded.
