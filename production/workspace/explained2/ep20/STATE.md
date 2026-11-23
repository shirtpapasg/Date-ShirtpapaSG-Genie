# EP20 build state (for a resume after a restart)
P3 EP20 "Magnets that float in mid-air: poles, pulls and pushes" (Ch 6, Properties of Magnets, pp. 105-109; the second Magnets episode).
Part 1 "Why Does This Magnet FLOAT? Two Poles, a Pull and a Push" (EP19's dare answered: a push; be the top ring magnet; where is a magnet
strongest? the class's steel paper clips: POLES, the strip 6.7 and ATTRACTION, every shape has two poles; HOLD ON! Pip: "the ring must be
broken"; pull or push? two bar magnets on round pencils: REPEL, 6.9; the spider; the cliffhanger: two blue ends, is there a rule?)
**5:33.5**. Part 2 "Flip It and It SNAPS! Like Poles, Unlike Poles, and Is It a Magnet?" (Pip's HDB kitchen; Round 1: turn one magnet round;
be a toy train carriage; like and unlike poles on the fridge card WHICH POLES FACE?, the rings' payoff, 6.14; the Showdown: Pip's homework;
Dad's two grey bars: THE REPEL TEST, 6.13; the chant; the lizard; the dare into EP21: a bar magnet on a string, spun) **5:43.5 (8.5 s over
the 5:35 target: see "Cuts" and "Open points")**.
The script: `../p3_ep20_script.md` (version 1, Opus, 23 Nov 2026). The source of every spoken word: `script.py`.

Stages: **Stage 1 (setup, voices, timelines, staging): DONE 2026-11-23, Opus** · Stage 2 (drawing, sound, full render, self-check: Fable)
· Stage 2.5 (teacher's-eye review, NOTES_REVIEW.md) · Stage 3 (render, checks, upload: Opus).

## For the teacher to listen to (before Stage 2)
- **`../pron_clips/Heart_ep20_new_words.mp3`** (MP3, 75.0 s, 12 sentences, 1.2 s apart; made by `make_clip.py`, which cuts the episode's
  OWN recorded lines from `voice/`, so the clip is exactly what the video says; start times measured with ffmpeg
  `silencedetect=noise=-45dB:d=1.0`, the first with d=0.3; sentence 7 has a 1.0 s pause inside it, the journey's pace, which silencedetect
  also reports at 38.92 s: that is not a new sentence). Committed with this stage. Start times (s) and text:

  | # | Start (s) | Who | Sentence | Checks |
  |---|---|---|---|---|
  | 1 | 0.50 | Heart | When magnets push each other away, we say they repel. | repel (a new term: said a little slower) |
  | 2 | 5.42 | Basil | Repel means push! Magnets can push each other away, without even touching! | repel (a buddy) |
  | 3 | 10.87 | Pip | Unlike means not the same. A North pole and a South pole are unlike poles, so they attract! | unlike poles, North pole, South pole |
  | 4 | 17.78 | Basil | Like means the same. North and North, or South and South, are like poles, so they repel! | like poles |
  | 5 | 24.10 | Pip | Unlike poles attract and like poles repel. | "unlike" vs "like" (stress on LIKE in both) |
  | 6 | 27.93 | Heart | The bar magnet has the strongest pull or attraction at the two poles. | attraction (the strip 6.7) |
  | 7 | 34.19 | Heart | You are a toy train carriage, with a small magnet at each end. Ahead of you is the engine. | carriage (two syllables) |
  | 8 | 41.60 | Basil | Magnets can attract, pull, or repel, push, one another. This depends on which poles are facing each other. | 6.9 as spoken (the card prints the brackets) |
  | 9 | 49.04 | Heart | Look closer. Dip a bar magnet into the steel paper clips from our class stationery tray. | stationery |
  | 10 | 56.66 | Heart | Two ring magnets on a pencil! The top one floats in mid-air, with no glue and no string. What holds it up? | mid-air |
  | 11 | 64.71 | Heart | North pole to North pole: they push apart. And South pole to South pole? They push apart too! | North pole, South pole (Heart) |
  | 12 | 73.21 | Heart | Poles. | "Poles." alone (the read-along) |

- **No new sg_pron fix, so no BEFORE / AFTER pair:** Kokoro's own phonemizer already gives every word as the dictionary says it: repel
  ɹᵻpˈɛl (rih-PEL), unlike poles ʌnlˈaɪk pˈoʊlz, like poles lˈaɪk pˈoʊlz, attraction ɐtɹˈækʃən, carriage kˈæɹɪdʒ (KA-rij), stationery
  stˈeɪʃənˌɛɹi, mid-air mˈɪdˈɛɹ, North pole nˈɔːɹθ pˈoʊl, South pole sˈaʊθ pˈoʊl. `../PRONUNCIATION.md` has a new "Checked and left to Kokoro
  (P3 EP20)" paragraph marked **waiting for the teacher's listen**. `../sg_pron.py` is unchanged. I cannot listen in this session: the check
  is on the phonemes and on the alignment (every line aligned).
- If the teacher hears a word wrong: add an entry to `../sg_pron.py`, delete those lines' `voice/<id>.json`, re-run `make_voice.py`
  (heart-tts python), `build_tl.py 1|2`, `node dump_cues.js 1|2`, `python3 make_todo.py`, `make_clip.py`.

## Stage 1 done (2026-11-23)
- **Engine copied from `../ep19/`** (EP19 is finished and LIVE; copied, never edited): lib.js, common.js, closer.js, shrink.js, props.js,
  hotel.js, garden.js, trail.js, materials.js, canteen.js, pics.js, song.js (with EP19's `coo`), music.js, audio/, render.js, finish.sh (ep20
  names, EP20 contact-sheet marks), bake.js, build_part.sh, build_all.sh, dump_cues.js, probe.js, stills.js, sheet.sh, measure_countdowns.py
  (ep20 names; rings P1 3 s and 5 s, P2 5 s and 5 s, the same as EP19), compare_ep1.py (EP20 scenes), build_tl.py, make_voice.py (header +
  EXTRA: pip's, lizard's, magnet's, stationery, underneath; and an alignment retry with .3 s of padding + a PARTIAL fallback), main.js (+
  `XDEFS20()`), page.html (tests.js + ep19dare.js), sweep.js, pose_audit.js, faces_sheet.js/.py, make_preview.sh (spans still EP19's: set
  them after the render), prep_sprites.py; bg/ stage, stage2, daystage, _grain (manifest: those four); spr/ (the v2 cast, as EP19); the
  ritual voices h501, h860, h864, h1304a/o/t, h1305, u1300, u1305, u1002. NOT copied: EP19's scene art (art16-19, home15, garden15, pond16,
  sets17, lc17, ep18dare), tests.js, p1/p2, pose_reasons.json, highlights.py, make_moments.py, app_moments.json (copy them from ../ep19 at
  Stage 2/3 and point them at EP20).
- **Changed for EP20:** lib.js `OUTCOMES` (P1 Round 1 at `ansglow` Pip, Basil right / Momo wrong; HOLD ON! at m903 Basil, Momo right / Pip
  wrong. P2 Round 1 at `ansglow` Momo, Pip right / Basil wrong; Showdown at n804b Basil, Momo right / Pip wrong) **with a new `to` field**
  (`s:answer`, `s:holdon`, `s:r1ans`, `s:fix`): the reaction now lasts to the end of the fix, not 4 s, so the 23 Nov rule (the corrected
  buddy shy through the WHOLE fix, the right ones confident) is wired; `learnAt` (kw_*, v_*, rule; NOT `rewrite`: Pip, whose mistake it is,
  stays shy); `KW` / `KWLINE` (P1 POLES, ATTRACTION, REPEL; P2 UNLIKE POLES, LIKE POLES, THE REPEL TEST; all o.at); `SHELF_HIDE` (+ lcpoles,
  lcpushpull, lclike, lctest); common.js `PHR` / `PCOL` (the chant; Attract! green, Repel! magenta). New: `ep19dare.js` (EP19's dare-card
  helpers copied UNCHANGED from ../ep19/art19.js: ringMag19, pencilRings, nextPic; `dareCard2`), `tests.js` (HIDDEN, SPIDER / SPIDER_R,
  LIZARD / LIZARD_R (intro / reveal spots), roomPH, kitchenPH, **polesBoardPH** (fills on kw_poles, stars, board2), **fridgeCardPH** (boxes
  on ns, sn, nn, ss; the rule at `rule`; the note card at `note`), lcPH, ringPH, the four small-print rules, PULLC green / PUSHC magenta
  #D9468F / NORTHC / SOUTHC and the props' colours, ppChip, ffPH / FF), `p1.js` / `p2.js` (placeholders; the shared routines wired: recap
  with EP19's two cards, title, gameScene push-ins (circle at T [680, 440], EP19's fix), goals (Basil / Pip), lock-ins (P1 two cards 3 s with
  the floating ring as the ring's picture; P2 three cards 5 s, Pip's card FIXED since his line is cut), look-closer frames with the strip
  6.7, journey tags + riders + chips, Mark Sentences (Momo, Basil / Pip, Basil), chant, score hands, lizReveal + funFact, the dare's two
  cards, read-along, Now you know), `sound_cues.js` (a GENERIC Stage 1 plan + EP14's indoor bed `R.room` under the science room and the
  kitchen + the magnets' main foley on their marks: boing, clack, flip, whoosh), `make_todo.py` -> `SCENES_TODO.md` (full staging per scene
  and per line, every pose WITH ITS REASON and checked against the timeline's times for "one strong pose a minute", the hidden animal's spot
  per scene, ambience and foley on the marks, "Changed from the script's tables"), `upload.json`, `make_clip.py`.
- **Voices** (`voice/`, `make_voice.py`, log `voice.log`): every line recorded (Heart: Kokoro af_heart via ../sg_pron.py; buddies: the
  Character Voice Kit, 12% slower), all aligned by pocketsphinx. Two needed help: `hk_attraction` ("Attraction." alone) aligned on the
  padded retry; `m807m` (Momo: "...not in the middle!") is PARTIAL: the aligner stopped on "the", so "the middle!" share the last span (word
  times only; the mouth track is from the audio). I checked the audio is not cut short ("middle" is there: the same length with "." or "!").
- **Timelines:** `python3 build_tl.py 1|2` -> tl_p1/2.json/js: **Part 1 5:33.5, Part 2 5:43.5**. `node dump_cues.js 1|2` -> cues (106 and
  126 events). **Sweep** (`node sweep.js 1|2`, every 0.25 s, 1335 + 1374 frames): no errors, no NaN (one fix on the way: Round 1 of Part 2
  needed a FIXED pick for Pip once his line was cut). Stills of every scene checked by eye (placeholders all render). No full render.
- **Cuts** (`script.py` CUTS; all from script section 6, words kept there): in use from the start, Part 1 `momonudge` (m705), `basiloops`
  (m806b), `pencilcase` (m1006); Part 2 `strip610` (n704s, 6.10), `strip611` (n706s, 6.11), `momofix` (n708m), `nextjoke` (n1202). **Part 1
  was 5:38.1**, so section 6's "If a part must lose more" list for Part 1, in order: `spidertip` (Basil's "and look for a thin silk thread"),
  `titleslam` (the title's hold 2.2 -> 1.6 s; both slams still land), `holdshort` (Heart's HOLD ON! follow-up -> "The floating ring was
  pushed, not broken.") -> **5:33.5**. **Part 2 was 5:57.1**: section 6's list for Part 2 in full, in order: `trainline` (Basil's "I brought
  my toy train!..."), `lizardtip` (Momo keeps only "Look up high!"), `pipreason` (Pip's Round 1 reason; his number card still shows his
  pick), `showhold` (the Showdown card 1.0 -> 0.8 s) -> 5:45.6; then small non-teaching pause trims: the recap's after-pause .6 -> .3, the
  goals' last after-pause .9 -> .7, the wait after Round 1's picks .3 -> .15, the pre-pause of Momo's fridge line, Heart's Showdown line and
  Pip's "how can I prove it?" .5 -> .3, the `fix` waits .3 / .5 / .5 / .3 -> .2 / .4 / .4 / .2, the score hand's after-pause .5 -> .3, the
  reveal's pre-pause .5 -> .3, "Tell someone at home!"'s after-pause .5 -> .3, the dare's waits .6 / .4 -> .4 / .3 -> **5:43.5**. Never cut:
  a look-closer, a journey step, a Mark Sentence card, the strip 6.7, the pauses around new terms, a buddy's explanation of a key word, the
  rings' payoff. Part 2 is still 8.5 s over: nothing else on the script's list may go (see Open points 1).
- **Scores:** Part 1 Round 1 1 : 1, HOLD ON! 2 : 1; Part 2 Round 1 1 : 1, Showdown 3 : 1.
- **upload.json:** both parts public, Made for Kids (the uploader sets it), playlists PLb8LpPqxQI4E and PLPfEuT7l4KjI right after
  `explained-p3-ep19-part2`. Titles (80 and 91 characters) and descriptions from script section 7. **`replaces: ["VLGDU0qduEw"]`,
  `retire_old: true`** (the classic P3 no. 12, now covered by EP19 pp. 99-104 + EP20 pp. 105-109), with `new_version_line` pointing to EP19
  Part 1 (LZxwTx-EccU) and EP20 Part 1 (`{P1}`). **NOT `6zA-Adh7QqU`** (classic no. 13: its fourth moment, a free magnet finds North, pp.
  110-112, is EP21's; EP21 retires it). School Lab 6.1A line left out (could not confirm the bench is live for pupils). `--check` not run.
- **Facts (script section 3, "Facts to check"; a short web check on 23 Nov):** 1 the spider fact: kept as worded ("many baby spiders",
  "the wind lifts them"): ballooning is well documented; most trips are short, a few go hundreds of kilometres; a 2018 study found the
  air's electric field can also give lift (left unspoken on purpose, as the script says). 2 the lizard fact: kept (house geckos' toe pads:
  microscopic hairs, no glue, no suction, no magnetism). 3 ring magnets magnetised through their thickness, the pencil stops the flip, the
  push grows as the gap shrinks: kept (well established). 4-5 the clips bunch at the ends; red = North on this magnet: kept ("On this
  magnet..."). 6 toy-train magnets: kept with "my toy train" (magnetic couplings with a pole at each end are common; some makers sell
  couplings that join either way, which is why the line says "my"). 7 the repel test said the book's way; never "only a magnet can be
  repelled". 8 nails and clips are not magnets: kept. 9 6.8 used as the definitions file gives it (no "the"). 10 6.9's brackets read as
  short pauses (spoken "attract, pull, or repel, push,"; the card keeps the brackets): the teacher hears it in clip sentence 8. 11 the
  pencil-case line is cut.

## For Stage 2 (Fable): start here
- Read `SCENES_TODO.md` top to bottom (the rules block first, especially rules 5, 6, 8, 11, 12 and "Changed from the script's tables"),
  then `../p3_ep20_script.md` sections 3 (Realism, Facts to check) and 11.
- Places: a school science room (Part 1) and Pip's HDB flat, the kitchen and the living room through the doorway (Part 2); the two
  journeys (the pencil at ring size; the toy track at carriage size). Replace the placeholders (`roomPH`, `kitchenPH`, `polesBoardPH`,
  `fridgeCardPH`, `ringPH`, `lcPH`, `ffPH`, every `ph(...)` / `phScene`); keep every mark (the sound keys on them).
- Models: ../ep19 `SC.holdon` (the wok), `SC.show` / `SC.fix`, `SC.dare`, the look-closers `lcattract` / `lcmetals`; EP19's `pencilRings`
  (ep19dare.js) for the rings.
- Pass `achieved` to the peeking faces' cheers after m805p (Pip), n703p (Pip) and n707b (Basil): they fall just outside learnAt's window.
- Copy highlights.py, make_moments.py, pose_reasons.json, app_moments.json from ../ep19 and point them at EP20 (app_moments replaces
  VLGDU0qduEw's moments in videos.js once EP20 is live). Then `./build_part.sh 1` and `2` (check free disk first: 4.8 GB free on 23 Nov).

## Open points
1. **Part 2 is 5:43.5, 8.5 s over the 5:35 target** after section 6's whole list and the pause trims. The script estimated 5:45 with its
   first cuts; the real lines are longer than its estimate. Next candidates (NOT done; for the main session or the teacher): Part 2 Round 1's
   ring 5 -> 3 s (as Part 1's; -2 s), Heart's n903 second sentence ("So being pulled does not tell us which one is the magnet.", -3.5 s,
   but it is the reason attraction is not proof), Momo's "Look up high!" (-1.3 s), or accept about 5:43.
2. The new-words clip waits for the teacher's listen (above).
3. EP19's two dare cards have INK arrows (copied unchanged), not the green / magenta the EP20 script describes for them.
4. The lizard's spot in `fix` is the top of the TV cabinet (the script repeated the curtain rail from `show`); the spider's spare spot (the
   fan's switch box) is unused.
5. From the script's own open points: THE REPEL TEST is our own shelf word; 6.10 / 6.11 are not read aloud (they came back first only if
   Part 2 had room: it has none); the goal labels "Where the pull is strongest", "Unlike and like poles", "Why the ring floats" are new.
6. Pip has no back-view painting (the P1 cliffhanger uses Momo's back view and a front view of Pip turned in, as EP18 / EP19).

## Stage 2 (drawing, sound, render, self-check): IN PROGRESS 2026-11-23 (resume from here)
- **New files:** `art20.js` (helpers copied UNCHANGED from EP15/16/19: hand15, bird15, camPt, eye16, blink16, xChip16, tickChip16, camOn,
  camMix, holdHand; the topic's arrows fatArrow / ppArrows / chevrons; the JUMPING SPIDER spider20 / spiderAt (eight legs, two big glossy
  front eyes, a silk line); the HOUSE LIZARD lizard20 / lizardAt (seen from above on the wall, five-toed pads, see-through, `squash` for the
  ceiling); bar20 (red N / blue S, `flip` = turned round), barOnPencils, clip20, ring20 / rings20 (Pip's pencil: `gap`, `press`, `finger`,
  `topY`, `topSy` for the flip), tray20 (the class stationery tray), plant20 (every leaf on a stem with a stalk), pipNote, the wooden train,
  greyBar (Dad's bars A / B), toolbox20, nail20, wbMag), `sets20.js` (the SCIENCE ROOM: BG.sci20 baked to bg/sci20.png + SR20 live: the fan,
  the plant, a child passing in the corridor, THE POLES BOARD `poles20` filling on kw_poles / stars / board2, `polesCard`; the HDB KITCHEN:
  BG.kit20 baked + KT20 live: the laundry, the TV's glow, the ceiling light, a moth; WHICH POLES FACE? `fridgeCard20` / `fridgeCardAt`
  filling on ns / sn / nn / ss, the rule at `rule`, the note at `note`; the hidden animals' spots SPAT / LZAT), `lc20.js` (lcPolesArt,
  lcPushPullArt, ringJourney, lcLikeArt, lcTestArt, trainJourney, and the pictures: ringP1 / ringHold / ringP2, recapP2, r1Pic, the fun facts,
  markPoles / markPairs, pipSheet, chantBoard20, darePic20, hangingMagnet). page.html loads them after ep19dare.js. Re-bake after a change to
  BG.sci20 / BG.kit20: `node bake.js sci20 kit20`. tests.js placeholders are no longer called (kept as Stage 1 left them).
- **p1.js / p2.js** rewritten: every scene drawn to SCENES_TODO, every action AT its mark. Sweeps (every 0.25 s): 0 bad, 0 page errors.
- **Changed from SCENES_TODO (and why):**
  - The repel test (lctest) is staged TRUE to the physics: in the first pass each end of bar B is met by the end of Basil's magnet that
    attracts it (so "pulls both bars, at both ends" is true); then the magnet is TURNED ROUND at bar B's right end and that end pushes it
    away; bar A is tested again and only pulls. SCENES_TODO's "the red end at all four ends pulls" would be wrong for bar B (a magnet:
    its North end would push a red North end). Bars stacked (A above B) so the magnet can reach both ends of each.
  - No back views (the poses folder's back paintings are not in the v2 set: style mixing): front views turned in, as EP19.
  - The cliffhanger: pairs2 turns the LEFT magnet (so a red end meets a red end); blueends turns both (two blue ends).
  - The journey "be the top ring" looks DOWN the pencil from the top ring (your rim at the bottom edge); the push comes UP at you (magenta
    arrows pointing at your rim, a "pushing up on you" chip). The finger is drawn as a hand with four fingers and a thumb (Pip's finger, as
    the script says), the paw in the train journey as a soft shadow and a "Basil turns you round" pill (no code-drawn buddy parts).
  - The dare's magnet hangs from a string tied to a ruler laid across two piles of books on the table (no hand: Basil hung it).
  - The lizard's reveal: upside down on the ceiling above the fridge, drawn foreshortened on the ceiling strip.
  - P2 Pip's homework is drawn to what he SAYS (n802p); the rewrite as SCENES_TODO.
- **Sound** (sound_cues.js Stage 2 block): Part 1 the science room on EP18's R.deck bed (the fan's hum, children far off, birds) + a far
  school bell, foley on every mark (the pencil slid in, the clips' tinkle, the magnifiers, the slide down the pencil, the springy riser,
  the presses and boings, the flip / CLICK, the pencils' rolling rattle); Part 2 the flat on R.room + a neighbour's pot-lid clink, a far TV,
  the lizard's "chik", the train's wooden rattle, the wheels, the box ticks, the toolbox clunk, the clicks and roll-back of the repel test.
  The Stage 1 foley offsets were moved onto the picture (click / snap / jclick at the mark; flip +.9 / flipr +.6 / jturn +1.3; press boing
  +1.7; flipback boing +1.5). Part 1 mix -16.0 LUFS.
- **QA so far:** stills of every scene checked by eye and fixed (cameras off the board's label rows, the push / pull layout, mirrored
  letters on turned magnets, the POLES BOARD's crowded bottom, two-row pairs in lclike, the homework easel); pose_audit both parts;
  pose_reasons.json written; thumbnails (`../thumb_v2.js` ep20_1 IT FLOATS?! + Pip surprised, magenta burst; ep20_2 FLIP IT, SNAP! + Basil
  surprised, teal burst); app_moments.json + chapters_p3.json EP20_P1 / EP20_P2 (make_moments.py); make_preview.sh spans set; highlights.py.

## Stage 2 DONE 2026-11-23 (NOT uploaded: the teacher reviews first)
- **Renders:** `ep20_part1.mp4` **5:33.5**, `ep20_part2.mp4` **5:45.9** (1920x1080, 30 fps, **-16.0 LUFS** both); `ep20_part1.srt` /
  `ep20_part2.srt`; `sheet_part1.png` / `sheet_part2.png`. mp4s NOT committed (rebuild: `./build_part.sh 1` / `2`, about 13 min each under
  the lock). Chunk folders deleted.
- **Countdowns measured in the renders** (measure_countdowns.py): P1 Round 1 (3 s) and HOLD ON! (5 s), P2 Round 1 and the Showdown (5 s):
  every number steps 1.00 s exactly, on the tick; the bell lands on 0.
- **Review pack:** `qa/buddy_faces_p1.jpg` / `_p2.jpg` (every pose on screen with its reason; all match pose_reasons.json),
  `qa/preview_p1_clips.mp4` (98.6 s) / `_p2` (96.9 s) (not committed), `qa/highlights.jpg` (14 labelled stills), `qa/ep1_compare_p1.jpg` /
  `_p2`, `thumb_part1.jpg` (IT FLOATS?!) / `thumb_part2.jpg` (FLIP IT, SNAP!). `app_moments.json` (20A / 20B; keys O.interactions /
  CH.magnets are PLACEHOLDERS: check videos.js; VLGDU0qduEw's moments go when these go in) and `production/youtube/chapters_p3.json`
  EP20_P1 / EP20_P2. `explained_upload.py upload.json --check`: OK (both parts after JpBskDtIwb0 in both playlists; VLGDU0qduEw retired).
- **Still weak / for the reviewer:** the top-ring journey looks DOWN the pencil, so the push arrows point down at your rim (a "pushing up on
  you" chip carries the meaning); the lizard's reveal on the ceiling is a foreshortened lizard on a thin ceiling strip; the key-word pops in
  lclike cover the card's title for 2 s; lctest stacks bar A over bar B (the book's set-up is side by side); the train journey's paw is a
  shadow and a pill (no code-drawn buddy parts); the cards in r1ans / answer are small at the top left (as EP19). No teaching cut (Part 2 at
  5:45.9 as the teacher accepted).
