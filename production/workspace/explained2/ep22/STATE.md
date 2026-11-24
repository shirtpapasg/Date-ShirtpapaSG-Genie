# EP22 build state (for a resume after a restart)
P3 EP22 "Turn a nail into a magnet (the stroke method)" (Ch 7, Making and Using Magnets, pp. 113-114; the fourth Magnets episode).
Part 1 "Stroke an Iron Nail Again and Again. Is It a MAGNET Now?" (EP21's dare answered: the nail attracts the clips; be the iron nail;
STROKE METHOD (Basil); was it a magnet already? a new nail over still clips, the magnet pulls it but it is not a magnet, Pip's nail with the
magnet shut away: MAGNETISED; Pip's right card, wrong reason: no point; 7.1; HOLD ON! Basil tests with the magnet still in his paw: the
strip 7.2 step 4; what can be magnetised? copper, foil, a chopstick, a steel screwdriver: MAGNETIC OBJECT, 7.2; the woodpecker; the
cliffhanger: Basil's back and forth with both ends) **5:34.5**. Part 2 "Back and Forth, or One Way? Make the STRONGEST Nail Magnet" (the
school maker space; Round 1: Basil's back-and-forth nail or Pip's one-way nail; be a steel paper clip; how do I get back to the head? lift up
and away: SAME DIRECTION, 7.2 steps 1 and 2; the Showdown: Pip's poster, "use the blue end too": SAME POLE, the strip 7.2 step 3; more
strokes? ten, twenty, thirty: STRONGER MAGNET, the thirty-stroke hook lifts the big fish, 7.3; the chant; the ant; the dare into EP23: a
wire coiled round a new nail, joined to a battery) **5:34.9**. Both inside the 5:15-5:35 target.
The script: `../p3_ep22_script.md` (version 1, Opus, 24 Nov 2026). The source of every spoken word: `script.py`.

Stages: **Stage 1 (setup, voices, timelines, staging): DONE 2026-11-24, Opus** · Stage 2 (drawing, sound, full render, self-check: Fable)
· Stage 2.5 (teacher's-eye review, NOTES_REVIEW.md) · Stage 3 (render, checks, upload: Opus; only after EP21 is live).

## For the teacher to listen to (before Stage 2)
- **`../pron_clips/Heart_ep22_new_words.mp3`** (MP3, 58.2 s, 10 sentences, 1.2 s apart; made by `make_clip.py`, which cuts the episode's
  OWN recorded lines from `voice/`, so the clip is exactly what the video says; start times measured with ffmpeg
  `silencedetect=noise=-45dB:d=1.0`, the first with d=0.3; no sentence has an inner pause of 1 s or more, and d=0.3 finds no extra start
  before sentence 2). Committed with this stage.

  | # | Start (s) | Who | Sentence | Checks |
  |---|---|---|---|---|
  | 1 | 0.51 | Basil | Magnetised means made into a magnet, such as Pip's nail after all those strokes! | magnetised (MAG-nuh-tyzd), strokes; "X means ..., such as ..." |
  | 2 | 6.44 | Heart | Magnetised. | magnetised alone (the read-along) |
  | 3 | 8.60 | Basil | The stroke method is a way to make a magnet that uses a strong magnet, such as my bar magnet stroking Pip's iron nail! | stroke method, stroking; "A ... is a ... that ..." |
  | 4 | 16.90 | Heart | Stroke method. | stroke method alone |
  | 5 | 19.06 | Pip | A magnetic object is an object that is made of a magnetic material, such as an iron nail or a steel screwdriver. | magnetic object (the noun OB-ject), screwdriver |
  | 6 | 27.24 | Heart | Magnetic object. | magnetic object alone |
  | 7 | 29.63 | Heart | A little woodpecker is hiding in this video. Can you spot it? | woodpecker (WOOD-pek-er) |
  | 8 | 34.69 | Heart | Look closer. A copper wire, aluminium foil, a wooden chopstick and a new steel screwdriver. Before stroking, none of them attracts any clips. | chopstick, screwdriver, aluminium (the approved British vowel), stroking (look-closer pace) |
  | 9 | 46.62 | Momo | Same direction means the same way every time, such as from the head of the nail to its tip, stroke after stroke! | same direction, stroke |
  | 10 | 54.31 | Heart | Make sure to stroke the iron nail with the same pole. | stroke, same pole (the book strip 7.2 step 3) |

- **No new sg_pron fix, so no BEFORE / AFTER pair:** Kokoro's own phonemizer (kokoro-onnx tokenizer, en-us, checked word by word and in
  the sentences) says "magnetised" mˈæɡnɪtˌaɪzd (as "magnetized", stress on MAG), "stroke" stɹˈoʊk, "stroke method" stɹˈoʊk mˈɛθəd,
  "magnetic object" mæɡnˈɛɾɪk ˈɑːbdʒɛkt (the noun every time), "woodpecker" wˈʊdpɛkɚ, "screwdriver" skɹˈuːdɹaɪvɚ, "chopstick" tʃˈɑːpstɪk,
  "same direction" sˈeɪm dᵻɹˈɛkʃən, "same pole" sˈeɪm pˈoʊl, "stronger magnet" stɹˈɔŋɡɚ mˈæɡnɪt, "undoes" ʌndˈʌz, "aluminium foil"
  ˌæljʊmˈɪniəm fˈɔɪl: all as the dictionary has them. No Singapore name is spoken. `../PRONUNCIATION.md` has a new "Checked and left to
  Kokoro (P3 EP22)" paragraph marked **waiting for the teacher's listen**. `../sg_pron.py` is unchanged. I cannot listen in this session:
  the check is on the phonemes and on the alignment (every line aligned).
- If the teacher hears a word wrong: add an entry to `../sg_pron.py`, delete those lines' `voice/<id>.json`, re-run `make_voice.py`
  (heart-tts python), `build_tl.py 1|2`, `node dump_cues.js 1|2`, `python3 make_todo.py`, `make_clip.py`.

## Stage 1 done (2026-11-24)
- **Engine copied from `../ep21/`** (EP20's final engine with OUTCOMES `to`; copied, never edited): lib.js, common.js, closer.js, shrink.js,
  props.js, hotel.js, garden.js, trail.js, materials.js, canteen.js, pics.js, song.js, music.js, audio/, render.js, finish.sh (ep22 names,
  EP22 contact-sheet marks), bake.js, build_part.sh, build_all.sh, dump_cues.js, probe.js, stills.js, sheet.sh, measure_countdowns.py (ep22
  names; rings P1 3 s and 5 s, P2 5 s and 5 s), compare_ep1.py (EP22 scenes), build_tl.py, make_voice.py (header + EXTRA: magnetised,
  super-fast, pecks, undoes), main.js, page.html (tests.js + ep21dare.js), sweep.js, pose_audit.js, faces_sheet.js/.py (EP22 title),
  make_preview.sh (spans still EP20's: set them after the render), prep_sprites.py; bg/ stage, stage2, daystage, _grain; spr/ (the v2
  cast); the ritual voices h501, h860, h864, h1304a/o/t, h1305, u1300, u1305, u1002. NOT copied: EP21's placeholders (tests.js, p1/p2),
  sound_cues, make_todo, make_clip; pose_reasons.json, highlights.py, make_moments.py, app_moments.json (copy from ../ep20 at Stage 2/3).
- **Changed for EP22:** lib.js `OUTCOMES` (P1 Round 1 at `ansglow`: Basil right to the end of `answer`, Momo wrong to the end of `mark1`;
  Pip (right card, wrong reason) shy from `still` to the end of `mark1`; HOLD ON! at m903 to the end of `holdon` (incl. the strip): Pip, Momo
  right / Basil wrong; Momo's look-closer guess shy from `test` to the end of `mark2`. P2 Round 1 at `ansglow`: Pip, Momo right to the end
  of `r1ans`, Basil wrong to the end of `mark1`; Showdown at n804b to the end of `fix`: Basil, Momo right / Pip wrong); `learnAt` (kw_*,
  v_*, `bigfish`: the thirty-stroke hook lifts the big fish; NOT `rewrite`); `KW` / `KWLINE` (P1 STROKE METHOD, MAGNETISED, MAGNETIC
  OBJECT; P2 SAME DIRECTION, SAME POLE, STRONGER MAGNET; all o.at); `SHELF_HIDE` (+ lcnail, lcthings, lcway, lcmore); common.js `PHR` /
  `PCOL` (the chant; "direction!" green, "pole!" red). New: **`ep21dare.js`** (the ep20dare.js pattern: EP21's two dare cards, `darePic21`
  / `darePic` / `dareCard2`, plus `bar20` copied unchanged from ../ep21/ep20dare.js. EP21 is not drawn yet, so its SC.dare shows plain
  numbered cards: darePic21 draws the cards' own description (the nail over still clips / clips hanging from its tip) as a Stage 1 stand-in;
  **when EP21's Stage 2 draws its dare pictures, copy them into darePic21 unchanged**), `tests.js` (HIDDEN, WOODPECKER / WOODPECKER_R, ANT
  / ANT_R (intro / reveal spots), shopPH, makerPH, **fishBoardPH** (OUR FISHING GAME: Rod 1 on `rod1`, Basil's note card on `try`, the
  green chip on `chipfar`, the list ticked on `list`), **pondPH** (THE FISHING POND + FISH CAUGHT: the big fish lifted on `bigfish`, the row
  on `chart`), **posterPH** (Pip's poster: l1..l3, strike, rewrite), nailArt, clipArt / clipHeap / clipsHang / clipTray, strokeArrow,
  liftArc, backForth, magBox, fishArt, lcPH, ringPH, the five small-print rules, the colours STROKEC green / LIFTC gold / BACKC grey / NAILC
  / MAGC / NOPTC, chipAt, ffPH / FF), `p1.js` / `p2.js` (placeholders; the shared routines wired: EP21's two dare cards in the recap, the
  title, gameScene push-ins (circle at T [680, 440]), goals (Pip / Momo), lock-ins (P1 two cards 3 s; P2 three cards 5 s, the ring up from
  the start of Heart's long question), the look-closer frames, journey tags + riders + the stroke counter, Mark Sentences (Basil, Pip /
  Pip, Basil), the two cream book strips (bookCaption; 7.2 step 4 as two lines), the chant, score hands (Buddies 0 in Part 1), lizReveal +
  funFact, the dare's two cards, read-along, Now you know), `sound_cues.js` (a GENERIC Stage 1 plan + EP18's outdoor bed `R.deck` under the
  hardware shop and EP14's room bed `R.room` under the maker space + the topic's main foley on its marks), `make_todo.py` ->
  `SCENES_TODO.md` (staging per scene and per line, every pose WITH ITS REASON and checked against the timeline's times for "one strong pose
  a minute", the hidden animal's spot per scene, ambience and foley on the marks, "Changed from the script's tables"), `upload.json`,
  `make_clip.py`.
- **Voices** (`voice/`, `make_voice.py`, logs `voice.log`, `voice_redo.log`): every line recorded (Heart: Kokoro af_heart via ../sg_pron.py;
  buddies: the Character Voice Kit, 12% slower), all aligned by pocketsphinx (`hk_magnetised`, "Magnetised." alone, aligned on the padded
  retry, as EP21's hk_compass). `n202b` and `n906` were recorded before their cuts and are kept in voice/ (they come back without a
  re-record).
- **Timelines:** `python3 build_tl.py 1|2` -> tl_p1/2.json/js: **Part 1 5:34.5, Part 2 5:34.9**. `node dump_cues.js 1|2` -> cues (136 and
  146 events). **Sweep** (`node sweep.js 1|2`, every 0.25 s, 1339 + 1340 frames): 0 bad, 0 page errors. Stills of every scene checked by
  eye (placeholders all render; the strip 7.2 step 4 was made two lines after a still showed it too wide). No full render.
- **Cuts** (`script.py` CUTS; all from script section 6, words kept there): in use from the start, Part 1 `basilwhy` (m703b), `momofix`
  (m806m), `basiloops` (m906b), `lcnone` (m1003h's sentence), `sevenone` (7.1's first sentence); Part 2 `basilgotit` (n708b), `usbridge`
  (n709h), `nextjoke` (n1202b). With those the timelines gave **5:36.9 and 5:39.6** (inside the accepted 5:46, over the 5:35 target), so
  section 6's "If a part must lose more" list was applied IN ORDER until each part was inside 5:35: **Part 1 `titleslam`** (the title's hold
  2.2 -> 1.6 s) and **`woodtip`** (Basil's tip shortened to "Listen for a tap, tap, tap!") -> 5:34.5; **Part 2 `anttip`** (Basil's "Ants
  love crumbs! Check near my snack box.") and **`fishline`** (Heart's "Watch! The hook with thirty strokes lifts the big fish out of the
  pond!" becomes picture and sound only: the reel's click and the pluck on `bigfish`, the FISH CAUGHT row on `chart`) -> 5:34.9. No pause
  trims were needed. Nothing that teaches was cut (no key-word line, Mark Sentence, book strip or science explanation). Room left: Part 1
  0.5 s, Part 2 0.1 s under 5:35 (11.5 / 11.1 s under the accepted 5:46).
- **Scores:** Part 1 Round 1 1 : 0 (only Basil right for the right reason), HOLD ON! 2 : 0; Part 2 Round 1 1 : 1, Showdown 3 : 1.
- **upload.json:** both parts public, Made for Kids (the uploader sets it), playlists PLb8LpPqxQI4E and PLPfEuT7l4KjI right after
  `explained-p3-ep21-part2`. Titles (81 and 83 characters) and descriptions from script section 7. **No `replaces`, no `retire_old`**: the
  classic P3 no. 14A `GNQn_TeCRgg` covers the stroke AND the electrical method; EP23 retires it (with a NEW VERSION line pointing to EP22
  Part 1 `{EP22_P1}` and EP23 Part 1). School Lab 7.1A line left out (labs_p3.json: status "review"). `--check` not run.
- **Facts:** from the script's section 3 "Facts to check" (no web check in this session either); nothing was reworded.

## For Stage 2 (Fable): start here
- Read `SCENES_TODO.md` top to bottom (the rules block first, especially rules 5, 6, 8, 10, 11, 12 and "Changed from the script's
  tables"), then `../p3_ep22_script.md` sections 3 (Realism, Facts to check: never a number of clips, never "for ever", no domains inside the
  nail) and 11.
- Places: a hardware shop at an HDB neighbourhood centre (Part 1; the square with the angsana tree) and a school maker space (Part 2); the
  two journeys (the iron nail; the steel paper clip). Replace the placeholders (`shopPH`, `makerPH`, `fishBoardPH`, `pondPH`, `posterPH`,
  `lcPH`, `ffPH`, every `ph(...)` / `phScene`, and the stand-ins nailArt / clip* / magBox / r1Pic); keep every mark (the sound keys on them).
- Models: ../ep21 `SC.holdon`, `SC.show` / `SC.fix`, `SC.dare`, the look-closers; ../ep20 `bar20` (in ep21dare.js) for every magnet.
- Pass `achieved` to the cheers after m704b (Basil, STROKE METHOD), m1005p (Pip, MAGNETIC OBJECT), n705m (Momo, SAME DIRECTION) and n806b
  (Basil, SAME POLE): they fall just outside learnAt's 4 s window.
- The EP23 dare cards: keep their pictures in one helper (as ep21dare.js) so EP23 can copy them unchanged.
- Copy highlights.py, make_moments.py, pose_reasons.json, app_moments.json from ../ep20 and point them at EP22 (app_moments ADDS EP22's
  moments to videos.js; GNQn_TeCRgg stays until EP23 is live). Then `./build_part.sh 1` and `2` (check free disk first: 3.5 GB free on 24 Nov).

## Open points
1. **The new-words clip** waits for the teacher's listen (above). No new sg_pron entry.
2. **EP21's dare pictures:** EP22 Part 1 opens with EP21's two cards; EP21 is not drawn yet, so `ep21dare.js` holds stand-in pictures.
   Copy EP21's final pictures in unchanged after EP21's Stage 2.
3. **Lengths are at the edge** (0.5 s and 0.1 s under 5:35). Anything added at Stage 2 (a longer hold) pushes them over 5:35 but stays well
   inside the accepted 5:46. If the teacher prefers the fuller version, bring back `fishline` (Part 2, Heart narrating the big fish, about
   +1.7 s) and `woodtip` (Part 1, about +1.5 s): both voices are already recorded or re-record in seconds.
4. **The no-point rule in Part 1's Round 1** (Pip right card, wrong reason) is new in a dare round (script open point 4): the teacher may
   prefer Pip's pick "Two. I think the strokes changed the nail." (Buddies 1 : 1).
5. From the script's own open points: the noun definitions ("A ... is a ... that ...") for STROKE METHOD, MAGNETIC OBJECT and STRONGER
   MAGNET; SAME DIRECTION / SAME POLE keep "X means ..., such as ..." (the teacher may prefer "The same direction is ..."); the new goal
   labels; the woodpecker's tongue cut-away (the fact can end after "like super-fast strokes!"); 7.1's first sentence left for EP23.
6. No back views in the v2 set: the cold open and the cliffhanger use front views turned in (as EP19 to EP21).
7. Upload order: EP22 only after EP21 is live. No `replaces` here; EP23's upload.json retires GNQn_TeCRgg.

## Stage 2 (drawing, sound, render, self-check): IN PROGRESS 2026-11-24 (resume from here)
- **New files:** `art22.js` (helpers copied UNCHANGED from art20.js; the WOODPECKER woodpecker22 / woodpeckerAt, the ANT ant22 / antAt / antLine;
  the stroke magAt / strokeAt / rubAt; clipBunch (clips jump up and fall back), trayClips22; magBox22, paperBag22, screwdriver22, copper22, foil22,
  chopstick22; OUR FISHING GAME fishBoard22; THE FISHING POND pond22 + rod22 + FISH CAUGHT wb22; Pip's poster poster22; pawPt = where a buddy's
  paws are, for held props), `sets22.js` (HS22 the hardware shop, baked bg/hs22.png + live; MS22 the maker space, baked bg/ms22.png + live; the
  hidden animals' spots WPAT / ANTAT), `lc22.js` (lcNailArt, lcThingsArt, nailJourney, lcWayArt, lcMoreArt, clipJourney, the ring / card / recap /
  fun-fact / Mark Sentence pictures, chantBoard22), `ep22dare.js` (EP23's two dare cards, self-contained: EP23 copies it unchanged).
  Re-bake after a change to BG.hs22 / BG.ms22: `node bake.js hs22 ms22`.
- **ep21dare.js:** SECTION A now holds EP21's two dare pictures DRAWN (nail21, clip21, clipPile21, hand21, darePic21; self-contained); EP21's
  Stage 2 (in progress in another session) has already copied Section A unchanged into ../ep21/ep21dare.js. Section B (bar20, darePic,
  dareCard2) is EP22's own. If Section A changes again, EP21's copy must change with it.
- **Changed from SCENES_TODO (and why):** held nails / magnets are drawn at the buddy's paws (no code-drawn paws); look-closer and card
  hands are human hands (four fingers and a thumb); in the look-closers the things hang from a wooden rail (a fair-test rig) instead of being
  held one by one; Basil's surprised face in lcthings is a round close-up (faceCam) so the screwdriver's clips stay clear; the P1 answer's
  cheer after Basil's STROKE METHOD line is left out (0.5 s before the scene ends, under his confident outcome: he cheers at Mark Sentence
  1); the P2 dare shows Momo's coil, battery and the clips jumping first (labelled), and the two cards slide in 1 s before "One" (not at the
  dareIn mark, which came 0.6 s into the scene); the sound's card slides moved with them. The big gold fish lies at the pond's LEFT end
  (so Momo's rod reaches it).
- **Sound:** sound_cues.js Stage 2 block (wind chime, bicycle bell, cups, laugh, woodpecker taps, trolley roll; maker space: printer
  whirr, stapler clack, footsteps, far bell, ant patter); both mixes -16.0 LUFS. Two Stage 1 cue bugs fixed (rise / pip without a value).
- **QA so far:** sweeps 0 bad both parts; stills of every scene looked at and fixed; pose_audit both parts; pose_reasons.json;
  qa/buddy_faces_p1.jpg / _p2.jpg.
- **Next:** `./build_part.sh 1` then 2 (check `df -h /` >= 3 GB; the lock is shared); verify each mp4 decodes (`ffmpeg -v error -i ... -f null -`)
  and its frame count; delete out/chunks_p*; measure_countdowns.py, compare_ep1.py, make_preview.sh spans, highlights.py, make_moments.py,
  thumbnails (../thumb_v2.js), `explained_upload.py upload.json --check`.

## Stage 2 DONE 2026-11-24 (NOT uploaded: the teacher reviews first)
- **Renders:** `ep22_part1.mp4` **5:34.5** (10036 frames), `ep22_part2.mp4` **5:34.9** (10047 frames); 1920x1080, 30 fps, **-16.0 LUFS** both;
  each decoded end to end with `ffmpeg -v error -i <mp4> -f null -` (no errors; render.js's copy-join was fine, no re-encode needed);
  `ep22_part1.srt` / `_part2.srt`; `sheet_part1.png` / `sheet_part2.png`. mp4s NOT committed (rebuild: `./build_part.sh 1` / `2`, about 17-27
  min each under the shared lock). Chunk folders and intermediates deleted. Part 2's render started with 2.1 GB free (another session's
  EP21 render was using the disk; the 3 GB check could not be enforced from inside the shared lock); nothing ran short.
- **Countdowns measured in the renders** (measure_countdowns.py): P1 Round 1 (3 s) and HOLD ON! (5 s), P2 Round 1 and the Showdown (5 s):
  every number steps 1.00 s exactly, on the tick; the bell lands on 0.
- **Review pack:** `qa/buddy_faces_p1.jpg` / `_p2.jpg` (every pose on screen with its reason; pose_reasons.json), `qa/preview_p1_clips.mp4`
  (103 s) / `_p2` (109 s) (not committed), `qa/highlights.jpg` (14 labelled stills), `qa/ep1_compare_p1.jpg` / `_p2`, `thumb_part1.jpg` (MAGNET
  NOW?! + Pip surprised, red burst) / `thumb_part2.jpg` (WHICH WAY?! + Basil surprised, cobalt burst). `app_moments.json` (22A / 22B: ADD, nothing
  retired; keys O.interactions / CH.magnets are PLACEHOLDERS: check videos.js) and `production/youtube/chapters_p3.json` EP22_P1 / EP22_P2.
  `explained_upload.py upload.json --check`: OK (both parts after explained-p3-ep21-part2 in both playlists, once EP21 is up).
- **Still weak / for the reviewer:** held nails and magnets sit at the painted paws and do not follow a hop or a pose change; the journey's
  "nail" reads like a long grey road to the vanishing point; in lcthings Basil's round surprised close-up covers the "magnet is away" chip for
  2 s; the clip bunches in lcmore are silver on wood (readable, but small); the big gold fish in the pond scene is small at full shot; the P1
  answer has no cheer for Basil after STROKE METHOD (0.5 s left, he cheers at Mark Sentence 1); Basil's worried face is not on screen during
  the Showdown countdown (only Pip is, as the rule asks); the woodpecker on the pallets (HOLD ON!) is small and partly behind Momo.
