# EP21 build state (for a resume after a restart)
P3 EP21 "Hang a magnet and it points North–South. Every time." (Ch 6, Properties of Magnets, pp. 110-112; the third Magnets episode).
Part 1 "Spin a Hanging Magnet. Why Does It Stop the SAME Way?" (EP20's dare answered: the same way every time; be the hanging magnet;
Basil's two cones; Pip's goalpost guess and the same line in three places: FREELY SUSPENDED, NORTH–SOUTH DIRECTION, 6.17; HOLD ON! Basil's
bench; how does it know? the whole Earth: EARTH BEHAVES LIKE A MAGNET, 6.16; the swallow; the cliffhanger: is the needle a magnet?)
**5:28.0**. Part 2 "Bring a Magnet Near a Compass. What Does the Needle DO?" (Pulau Ubin; Round 1: a bar magnet near a compass; be the
compass needle; NEEDLE; turn the compass, not the needle: COMPASS, the trail map's rose and route, 6.15; the Showdown: Momo's compass
checklist; night and far away: TELL THE DIRECTION, 6.16's "Hence" line; the chant; the sea turtle; the dare into EP22: an iron nail
stroked with a magnet) **5:29.6**. Both inside the 5:15-5:35 target.
The script: `../p3_ep21_script.md` (version 1, Opus, 24 Nov 2026). The source of every spoken word: `script.py`.

Stages: **Stage 1 (setup, voices, timelines, staging): DONE 2026-11-24, Opus** · Stage 2 (drawing, sound, full render, self-check: Fable)
· Stage 2.5 (teacher's-eye review, NOTES_REVIEW.md) · Stage 3 (render, checks, upload: Opus; only after EP20 is live).

## For the teacher to listen to (before Stage 2)
- **`../pron_clips/Heart_ep21_new_words.mp3`** (MP3, 63.3 s, 12 sentences, 1.2 s apart; made by `make_clip.py`, which cuts the episode's
  OWN recorded lines from `voice/`, so the clip is exactly what the video says; start times measured with ffmpeg
  `silencedetect=noise=-45dB:d=1.0`, the first with d=0.3; the pauses inside sentences 6 and 9 are shorter than 1 s, so they are not
  reported; d=0.3 also finds Momo's comma pause at 3.88 s inside sentence 1: not a new sentence). Committed with this stage.

  | # | Start (s) | Who | Sentence | Checks |
  |---|---|---|---|---|
  | 1 | 0.50 | Momo | Freely suspended means hanging so that it can turn freely, such as a magnet on a string! | suspended, freely suspended (a buddy) |
  | 2 | 6.76 | Basil | A freely suspended magnet comes to rest in the North-South direction. | 6.17; North-South (two words, no "minus"), direction |
  | 3 | 11.81 | Heart | Freely suspended. | the read-along, alone |
  | 4 | 14.14 | Momo | A compass is a tool that helps us find the direction, such as my hiking compass! | compass (KUM-pus), direction |
  | 5 | 20.19 | Heart | Compass. | compass alone (KUM-pus, not KOM-pass) |
  | 6 | 22.06 | Heart | Look closer. Turn the compass round. The letters turn, but the needle does not! | compass, needle (look-closer pace) |
  | 7 | 29.52 | Heart | North-South direction. | "North-South" at the start of a line |
  | 8 | 31.95 | Heart | Needle. | needle alone (NEE-dul) |
  | 9 | 33.74 | Pip | Earth behaves like a magnet with its own North and South poles. It interacts with a freely suspended magnet. This causes the freely suspended magnet to always point in the North-South direction. | 6.16; interacts (in-ter-AKTS) |
  | 10 | 47.58 | Pip | Hence, a freely suspended magnet can be used to tell the direction. | "Hence," first, a pause after the comma |
  | 11 | 52.63 | Heart | A little swallow is hiding in this video. Can you spot it? | swallow |
  | 12 | 57.46 | Basil | Swallows swoop low over a field, catching tiny insects. Look high, and look low! | swallows (a buddy) |

- **No new sg_pron fix, so no BEFORE / AFTER pair:** Kokoro's own phonemizer says "compass" kˈʌmpəs (KUM-pus), as asked, not "KOM-pass".
  The others as the dictionary has them: suspended səspˈɛndᵻd, freely fɹˈiːli, direction dᵻɹˈɛkʃən, North-South nˈɔːɹθsˈaʊθ, needle
  nˈiːdəl, interacts ˌɪntɚɹˈækts, Hence hˈɛns. **One to listen for: "swallow" is swˈɔloʊ** (the American "SWAW-loh"); the script asks for
  "SWOL-oh". If the teacher wants the British vowel, add `"swallow": {"ph": "swˈɒloʊ"}` / `"swallows": {"ph": "swˈɒloʊz"}` to
  `../sg_pron.py` (ɒ is in Kokoro's vocabulary; Kokoro's own en-gb gives swˈɒləʊ) and re-record the swallow lines (m302, m303b, m1102,
  m1103b). `../PRONUNCIATION.md` has a new "Checked and left to Kokoro (P3 EP21)" paragraph marked **waiting for the teacher's listen**.
  `../sg_pron.py` is unchanged. I cannot listen in this session: the check is on the phonemes and on the alignment (every line aligned).
- If the teacher hears a word wrong: add an entry to `../sg_pron.py`, delete those lines' `voice/<id>.json`, re-run `make_voice.py`
  (heart-tts python), `build_tl.py 1|2`, `node dump_cues.js 1|2`, `python3 make_todo.py`, `make_clip.py`.

## Stage 1 done (2026-11-24)
- **Engine copied from `../ep20/`** (EP20 Stage 2 is finished; copied, never edited): lib.js (with EP20's OUTCOMES `to` field), common.js,
  closer.js, shrink.js, props.js, hotel.js, garden.js, trail.js, materials.js, canteen.js, pics.js, song.js, music.js, audio/, render.js,
  finish.sh (ep21 names, EP21 contact-sheet marks), bake.js, build_part.sh, build_all.sh, dump_cues.js, probe.js, stills.js, sheet.sh,
  measure_countdowns.py (ep21 names; rings P1 3 s and 5 s, P2 5 s and 5 s, as EP20), compare_ep1.py (EP21 scenes), build_tl.py,
  make_voice.py (header + EXTRA: needle's, netball, north-south, seagrass), make_clip.py (EP21's sentences), main.js, page.html (tests.js +
  ep20dare.js), sweep.js, pose_audit.js, faces_sheet.js/.py, make_preview.sh (spans still EP20's: set them after the render),
  prep_sprites.py; bg/ stage, stage2, daystage, _grain (manifest: those four); spr/ (the v2 cast); the ritual voices h501, h860, h864,
  h1304a/o/t, h1305, u1300, u1305, u1002. NOT copied: EP20's scene art (art20, sets20, lc20), tests.js, p1/p2, sound_cues' Stage 2 block,
  pose_reasons.json, highlights.py, make_moments.py, app_moments.json (copy them from ../ep20 at Stage 2/3 and point them at EP21).
- **Changed for EP21:** lib.js `OUTCOMES` (P1 Round 1 at `ansglow` to the end of `answer`: Pip, Basil right / Momo wrong; HOLD ON! at m903
  to the end of `holdon`: Pip, Momo right / Basil wrong. P2 Round 1 at `ansglow` to the end of `r1ans`: Momo, Basil right / Pip wrong;
  Showdown at n804b to the end of `fix`: Basil, Pip right / Momo wrong), so the corrected buddy is shy and the right ones confident through
  the WHOLE fix; `learnAt` (kw_*, v_*, `route`; NOT `rewrite`: Momo, whose mistake it is, stays shy); `KW` / `KWLINE` (P1 FREELY SUSPENDED,
  NORTH–SOUTH DIRECTION, EARTH BEHAVES LIKE A MAGNET; P2 NEEDLE, COMPASS, TELL THE DIRECTION; all o.at); `SHELF_HIDE` (+ lcplaces, lcearth,
  lcuse, lcnight); common.js `PHR` / `PCOL` (the chant; "North-South!" gold). New: `ep20dare.js` (EP20's dare helpers copied UNCHANGED from
  ../ep20/art20.js and lc20.js: bar20, hangMag, darePic20, hangingMagnet; + `darePic` / `dareCard2`), `tests.js` (HIDDEN, SWALLOW /
  SWALLOW_R, TURTLE / TURTLE_R (intro / reveal spots), fieldPH, jettyPH, bwalkPH, **spinChartPH** (arrows on `chart1`; wiped and rewritten
  with the three places and the N – S line on `nsline`; the small Earth on `chartEarth`), **trailMapPH** (the rose N, E, S, W from `rose`;
  the route lit on `route`), compassPH + settle, **nsLine** (the dashed gold North-South line, N and S ends), lcPH, ringPH, the four
  small-print rules, the colours NSC gold / PULLC green / PUSHC magenta / NORTHC / SOUTHC / NEEDLEC / CONEC, ppChip, ffPH / FF), `p1.js` /
  `p2.js` (placeholders; the shared routines wired: EP20's two dare cards in the recap, the title, gameScene push-ins (circle at T [680,
  440]), goals (Momo / Basil), lock-ins (P1 two cards 3 s with the hanging magnet as the ring's picture; P2 three cards 5 s), the
  look-closer frames, journey tags + riders + chips, Mark Sentences (Basil, Pip / Momo, Pip), the chant, score hands, lizReveal +
  funFact, the dare's two cards, read-along, Now you know), `sound_cues.js` (a GENERIC Stage 1 plan + EP18's outdoor bed `R.deck` under
  the school field and EP10's `R.sea` under Pulau Ubin + the topic's main foley on its marks), `make_todo.py` -> `SCENES_TODO.md` (staging
  per scene and per line, every pose WITH ITS REASON and checked against the timeline's times for "one strong pose a minute", the hidden
  animal's spot per scene, ambience and foley on the marks, "Changed from the script's tables"), `upload.json`, `make_clip.py`.
- **Voices** (`voice/`, `make_voice.py`, logs `voice.log`, `voice_redo.log`): every line recorded (Heart: Kokoro af_heart via ../sg_pron.py;
  buddies: the Character Voice Kit, 12% slower), all aligned by pocketsphinx. Two needed help: `hk_compass` ("Compass." alone) aligned on
  the padded retry; `n802m` (Momo's checklist) is PARTIAL: the aligner stopped before "help it.", which share the last span (word times
  only; the mouth track is from the audio; the audio is whole, 9.6 s).
- **Timelines:** `python3 build_tl.py 1|2` -> tl_p1/2.json/js: **Part 1 5:28.0, Part 2 5:29.6**. `node dump_cues.js 1|2` -> cues (110 and
  133 events). **Sweep** (`node sweep.js 1|2`, every 0.25 s, 1312 + 1319 frames): 0 bad, 0 page errors, first time. Stills of every
  scene checked by eye (placeholders all render). No full render.
- **Cuts** (`script.py` CUTS; all from script section 6, words kept there): in use from the start, Part 1 `pipwhy` (m706), `lcfloat`
  (m807); Part 2 `ubinhello` (n201), `n7spoon` (n705), `basilrepel` (n603), `nextjoke` (n1202). **Nothing more was cut:** the real lines
  came out SHORTER than the script's estimate (it said about 5:52 and 5:57; the timelines gave 5:24.7 and 5:29.6), so no "lose more" cut
  and no pause trim was needed. **Brought back:** `basiltangle` (m905, Basil: "Oops! Free to turn, not just free from my paws."), which
  section 6 names "first to come back if Part 1 has 3 s" -> Part 1 5:28.0. Part 2's first to come back, `ubinhello` (n201), stays out: it
  says "Pulau Ubin" aloud, and "Ubin" is a new Singapore name that needs the teacher's approved clip first. Room left: Part 1 about 7 s,
  Part 2 about 5 s under 5:35 (17 / 16 s under the accepted 5:46).
- **Scores:** Part 1 Round 1 1 : 1, HOLD ON! 2 : 1; Part 2 Round 1 1 : 1, Showdown 3 : 1.
- **upload.json:** both parts public, Made for Kids (the uploader sets it), playlists PLb8LpPqxQI4E and PLPfEuT7l4KjI right after
  `explained-p3-ep20-part2`. Titles (72 and 74 characters) and descriptions from script section 7. **`replaces: ["6zA-Adh7QqU"]`,
  `retire_old: true`** (the classic P3 no. 13, now covered by EP20 pp. 105-109 + EP21 pp. 110-112), with `new_version_line` naming EP20
  Part 1 (`{EP20_P1}`, a LITERAL placeholder: EP20 is not uploaded yet; the main session fills it once EP20 is live) and EP21 Part 1
  (`{P1}`, filled by the uploader). The uploader only fills `{P1}` / `{EP17_P1}`: never upload with `{EP20_P1}` still in the line. School
  Lab 6.4 line left out (labs_p3.json: status "review"). `--check` not run.
- **Facts:** from the script's section 3 "Facts to check" (no web check in this session either); nothing was reworded.

## For Stage 2 (Fable): start here
- Read `SCENES_TODO.md` top to bottom (the rules block first, especially rules 5, 6, 8, 10, 11, 12 and "Changed from the script's
  tables"), then `../p3_ep21_script.md` sections 3 (Realism, Facts to check: the Earth is never coloured and its poles never named) and 11.
- Places: a school field (Part 1, with a classroom and the whole Earth inside the look-closers) and Pulau Ubin (Part 2: the jetty, the
  boardwalk; the Singapore Strait at night and a foggy US forest inside `lcnight`); the two journeys (the hanging magnet; the compass
  needle). Replace the placeholders (`fieldPH`, `jettyPH`, `bwalkPH`, `spinChartPH`, `trailMapPH`, `compassPH`, `lcPH`, `ffPH`, every
  `ph(...)` / `phScene`); keep every mark (the sound keys on them).
- Models: ../ep20 `SC.holdon`, `SC.show` / `SC.fix`, `SC.dare`, the look-closers `lcpoles` / `lclike`; EP20's `hangingMagnet` and `bar20`
  (ep20dare.js) for the magnets.
- Pass `achieved` to the cheers after m805m (Momo, FREELY SUSPENDED), n602b (Basil, NEEDLE) and n905p (Pip, TELL THE DIRECTION): they fall
  just outside learnAt's 4 s window.
- Copy highlights.py, make_moments.py, pose_reasons.json, app_moments.json from ../ep20 and point them at EP21 (app_moments replaces
  6zA-Adh7QqU's fourth moment, "A free magnet finds North", in videos.js once EP21 is live). Then `./build_part.sh 1` and `2` (check free
  disk first: 3.6 GB free on 24 Nov).

## Open points
1. **Noun definitions (for the teacher):** COMPASS and NEEDLE use natural English for a thing, "A compass is a tool that helps us find the
   direction, such as my hiking compass!" (Momo, n704m) and "The needle is the small magnet inside a compass, such as this thin red one."
   (Basil, n602b), instead of the "X means ..., such as ..." pattern the teacher gave for EP20 (the script had "Compass means ..." / "The
   needle means ..."). FREELY SUSPENDED, NORTH–SOUTH DIRECTION and TELL THE DIRECTION keep "X means ..., such as ...". script.py has the new
   words; `../p3_ep21_script.md`'s tables still show the old ones.
2. The new-words clip waits for the teacher's listen (above), especially "swallow" (SWAW-loh vs SWOL-oh).
3. Part 2's read-along is NEEDLE · COMPASS · TELL THE DIRECTION (the order they are learnt and stack on the shelf; the script listed
   Compass first).
4. Both parts have room (about 7 s and 5 s under 5:35). Candidates to bring back (section 6): Part 2 `basilrepel` (n603, Basil: "It
   repelled my magnet, so the needle is a magnet. The repel test!", about 4 s: EP20's repel test reused) or `ubinhello` (n201, about 5 s,
   only after a "Pulau Ubin" test clip is approved); Part 1 `pipwhy` (m706, about 3.5 s). Not done: the main session's or the teacher's
   call.
5. From the script's own open points: the Earth's poles are never named (Facts to check 1; a small-print hint can be added to `lcearth`
   without a spoken change); "Hence, ..." as a Mark Sentence (optional *(p. 111)* in grey on the card); the new goal labels "The
   North-South direction", "A magnet near a compass", "Telling the direction"; EARTH BEHAVES LIKE A MAGNET and TELL THE DIRECTION are long
   shelf words (short forms allowed on a pill if they do not fit).
6. The script put the sea turtle "by the boardwalk's posts" in both `show` and `fix`: `fix` now uses a new spot (beside the boardwalk's
   wooden ladder).
7. No back views in the v2 set: the cold open and the cliffhanger use front views turned in (as EP19 / EP20).
8. Upload order: EP21 only after EP20 is live, and only once `{EP20_P1}` in `upload.json`'s `new_version_line` is filled with EP20 Part 1's
   real id.

## Stage 2 (drawing, sound, render, self-check): IN PROGRESS 2026-11-24 (resume from here)
- **New files:** `art21.js` (helpers copied UNCHANGED from ../ep20/art20.js; XDEFS21; the BARN SWALLOW swallow21 / swallowFly / swallowAt; the SEA
  TURTLE turtle21 / turtleAt / turtleSwim; hangMag21 (a bar magnet hanging level, turning, with its end face), spinAng, miniMag; Momo's compass
  compass21 + settle21; cone21, chair21, broom21, bench21, giantFinger, binnacle21, smallEasel), `ep21dare.js` (SECTION A of ../ep22/ep21dare.js
  copied UNCHANGED: nail21, clip21, clipPile21, hand21, darePic21: the dare cards are EP22's own pictures), `sets21.js` (FD21 the school field,
  baked bg/fd21.png + live: the rain tree, the goal, the hoops, the trolley, the children, THE SPIN CHART spinChart21, the chairs, the broom
  handle and the hanging magnet, the cones; SWAT the swallow's spots; UB21 the jetty, baked bg/ub21.png + live: the mangroves, the heron, the
  buoy, the bumboats, THE TRAIL MAP trailMap21; TTAT the turtle's spots; BW21 the boardwalk, baked bg/bw21.png + live: the seagrass, the
  boardwalk and its ladder; BWAT), `lc21.js` (the Earth earth21 / earthMag (an orthographic globe: place words only), magnetJourney,
  needleJourney, peekFace, lcXY, magni21, lcPlacesArt, riseView + lcEarthArt, lcUseArt, lcNightArt, and the pictures). page.html loads them
  after ep20dare.js; main.js adds XDEFS21. Re-bake after a change to BG.fd21 / ub21 / bw21: `node bake.js fd21 ub21 bw21`.
- **p1.js / p2.js** rewritten: every scene drawn to SCENES_TODO, every action AT its mark. Sweeps (every 0.5 s): 0 bad, 0 page errors.
