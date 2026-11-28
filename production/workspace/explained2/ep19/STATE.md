# EP19 build state (for a resume after a restart)
P3 EP19 "Why a magnet ignores a copper wire" (the Interactions theme opens, p. 99; Ch 6, Properties of Magnets, pp. 100-104; the first
Magnets episode). Part 1 "Will a Magnet Pull a COPPER Wire? What a Magnet Really Is" (EP18's dare answered: the steel pin; a brand-new theme;
what a magnet is: the lodestone 6.1, the cut-away, MAGNET, the six shapes, 6.2; be a steel pin; HOLD ON! Mum's iron wok and the fridge door;
is a magnet sticky? ATTRACT, MAGNETIC MATERIALS, 6.3; the pigeon; the cliffhanger: copper is a metal too) **5:31.0**. Part 2 "Copper Is a
METAL. So Why Won't a Magnet Pull It?" (the recycling corner; Round 1: the drink can or the food tin?; be an aluminium can; not all metals:
NON-MAGNETIC MATERIALS, the METALS board, 6.4; the Showdown: Basil's magnet test; the swing, I0.1, INTERACT; 6.4a, CLASSIFY, the tray's
halves named, 6.5; the chant; the snail; the dare into EP20: two ring magnets on a pencil) **5:34.7**.
The script: `../p3_ep19_script.md` (version 1, Opus, 23 Nov 2026). The source of every spoken word: `script.py`.

Stages: **Stage 1 (setup, voices, timelines, staging): DONE 2026-11-23, Opus** · Stage 2 (drawing, sound, full render, self-check: Fable)
· Stage 2.5 (teacher's-eye review, NOTES_REVIEW.md) · Stage 3 (render, checks, upload: Opus).

## For the teacher to listen to (before Stage 3)
- **`../pron_clips/Heart_ep19_new_words.mp3`** (MP3, 59.9 s, 11 sentences, 1.2 s apart; made by `make_clip.py` with the episode's own voice
  functions; start times measured with ffmpeg `silencedetect=noise=-45dB:d=1.0`, the first with d=0.3). **Not committed** (no mp3 in git):
  it is on disk only. Start times (s) and text:

  | # | Start (s) | Who | Sentence | Checks |
  |---|---|---|---|---|
  | 1 | 0.50 | Heart | Be an aluminium can! You are an empty drink can, made of aluminium. | aluminium (x2) |
  | 2 | 6.10 | Basil | Two! Dad says drink cans like this are made of aluminium. And aluminium is not iron or steel! | aluminium (a buddy, x2) |
  | 3 | 13.59 | Heart | A natural magnet is also called a lodestone. | lodestone |
  | 4 | 17.69 | Pip | Non-magnetic materials include ceramic, fabric, glass, plastic, rubber and wood. | non-magnetic, ceramic |
  | 5 | 23.89 | Basil | And magnets come in lots of shapes: bar, U-shaped, button, rod, ring and horseshoe! | U-shaped, horseshoe |
  | 6 | 30.01 | Momo | Scientists think pigeons can sense the Earth's magnetism. | pigeons, magnetism |
  | 7 | 34.48 | Heart | Look closer. Bring the magnet near each object, and watch how they interact. | interact |
  | 8 | 40.60 | Heart | One of the ways to classify these materials is to observe how they interact with a magnet. | classify |
  | 9 | 47.21 | Momo | My turn! I tested Mum's iron wok. | wok |
  | 10 | 51.28 | Heart | A little pigeon is hiding in this video. Can you spot it? | pigeon |
  | 11 | 56.16 | Basil | Deep in the sea lives a snail with iron in its shell. | lives = "leevz" (sg_pron) |

- **No new sg_pron fix:** Kokoro's own "aluminium" is already the British "al-yoo-MIN-ee-um" (its phonemes ˌæljʊmˈɪniəm; only the American
  spelling "aluminum" gives ɐlˈuːmɪnəm), so there is no BEFORE / AFTER pair and no "waiting" row; `../PRONUNCIATION.md` has a "Checked and
  left to Kokoro (P3 EP19)" paragraph now APPROVED by the teacher (23 Nov 2026: "EP19 words OK"). "lives" is the teacher's existing entry. `../sg_pron.py` is
  unchanged.
- The voices are already recorded. If the teacher hears a word wrong: add an entry to `../sg_pron.py`, delete those lines'
  `voice/<id>.json`, re-run `make_voice.py` (heart-tts python) and `build_tl.py 1|2`, `node dump_cues.js 1|2`, `python3 make_todo.py`.

## Stage 1 done (2026-11-23)
- **Engine copied from `../ep18/`** (23 Nov, its Stage 2 in progress; copied, never edited): lib.js, common.js (with EP18's markScene
  `o.achieved`), closer.js, shrink.js, props.js, hotel.js, garden.js, trail.js, materials.js, canteen.js, pics.js, song.js (EP18's `R.deck`
  void deck bed), music.js, audio/, render.js, finish.sh (ep19 names, EP19 contact-sheet marks), bake.js, build_part.sh, build_all.sh,
  dump_cues.js, probe.js, stills.js, sheet.sh, measure_countdowns.py (ep19 names; rings P1 3 s and 5 s, P2 5 s and 5 s), compare_ep1.py
  (EP19 scenes), build_tl.py, make_voice.py (header + EXTRA: basil's, mid-air, non-magnetic, rinsed, u-shaped), main.js (+ `XDEFS19()`),
  page.html (tests.js + ep18dare.js), pose_audit.js, faces_sheet.js/.py, make_preview.sh (spans still EP18's: set them after the render),
  prep_sprites.py; bg/ stage, stage2, daystage, _grain (manifest: those four); spr/ (EP18's 41 v2-cast sprites copied as they are: identical
  to prep_sprites.py's output); the ritual voices h501, h860, h864, h1304a/o/t, h1305, u1300, u1305, u1002. NOT copied: EP18's scene art
  (art16/17/18, home15, garden15, pond16, sets17, lc17, ep17dare), tests.js, p1/p2, pose_reasons.json, highlights.py, make_moments.py,
  app_moments.json (copy them from ../ep18 at Stage 2/3 and point them at EP19).
- **Changed for EP19:** lib.js `OUTCOMES` (P1 Round 1 at `ansglow` Momo right / Pip, Basil wrong; HOLD ON! at m903 Pip, Basil right / Momo
  wrong. P2 Round 1 at `ansglow` Pip, Basil right / Momo wrong; Showdown at n804m Momo, Pip right / Basil wrong), `learnAt` (kw_*, v_*,
  rewrite, groups), `KW` / `KWLINE` (P1 MAGNET, ATTRACT, MAGNETIC MATERIALS; P2 NON-MAGNETIC MATERIALS, INTERACT, CLASSIFY; all o.at),
  `SHELF_HIDE` (+ lcmagnet, lcattract, lcmetals, lcinteract); common.js `PHR` / `PCOL` (the chant; Magnetic! green, Non-magnetic! blue).
  New: `ep18dare.js` (EP18's three dare-card pictures copied UNCHANGED from ../ep18/art18.js: magnet18, pin18, wire18, darePic3; re-copy if
  EP18 changes them), `tests.js` (HIDDEN, PIGEON / PIGEON_R, SNAIL / SNAIL_R (intro / reveal spots), deckPH, cornerPH, **trayPH** (the MAGNET
  TEST TABLE's tray: the halves fill on trayPin / trayWire / ansglow / v_metals / groups and the labels flip to the book's names at
  `groups`), lcPH, ringPH, the three small-print rules, MAGC / NONC and the metals' colours, matChip, ffPH / FF), `p1.js` / `p2.js`
  (placeholders; the shared routines wired: recap with EP18's three cards, title, theme, gameScene push-ins, goals (Pip / Momo), lock-ins
  (P1 three cards 3 s, P2 three cards 5 s), look-closer frames with the strips 6.1 and 6.4a, the strip I0.1, journey tags + riders + chips,
  Mark Sentences (Basil, Momo / Pip, Basil; the cheers after Momo's P1, Pip's P2 1 and Basil's P2 2 wired with `achieved`), chant, score
  hands, lizReveal + funFact, the dare's two cards, read-along, Now you know), `sound_cues.js` (a GENERIC Stage 1 plan + EP18's void deck
  bed under the void deck scenes; the places' ambience and foley per scene are in SCENES_TODO), `make_todo.py` -> `SCENES_TODO.md` (full
  staging per scene and per line, every pose WITH ITS REASON, the hidden animal's spot per scene, ambience and foley on the marks,
  "Changed from the script's tables"), `upload.json`, `sweep.js` (renders every 0.25 s in the page; reports errors / NaN), `make_clip.py`.
- **Voices** (`voice/`, `make_voice.py`, log `voice.log`): every line recorded (Heart: Kokoro af_heart via ../sg_pron.py; buddies: the
  Character Voice Kit, 12% slower), all aligned by pocketsphinx (none PROPORTIONAL). Re-running make_voice.py keeps finished files.
- **Timelines:** `python3 build_tl.py 1|2` -> tl_p1/2.json/js: **Part 1 5:31.0, Part 2 5:34.7** (target 5:15-5:35). `node dump_cues.js 1|2`
  -> cues (93 and 111 events). **Sweep** (`node sweep.js 1|2`, every 0.25 s, 1324 + 1339 frames): no errors, no NaN (one fix on the way:
  Round 1's lockN needed three card cue times for three cards). No full render.
- **Cuts** (`script.py` CUTS; all from script section 6, words kept there): in use from the start, Part 1 `momofix` (m606m), `tape`
  (m1003), `basiloops` (m804b); Part 2 `door` (n901's second example), `basilfix` (n806b), `coin` (n707c), `whiteboard` (n909m), `nextjoke`
  (n1202). Part 1 needed nothing more. **Part 2 was 5:39.7**, so section 6's "If a part must lose more" list for Part 2 was used in full, in
  order: `bothmetal` (Basil's "Both of them are metal!": the ring's clue label says it), `snailtip` (Basil's "Snails come out after rain."),
  `showhold` (the showcard's hold 1.0 -> 0.8 s) -> 5:36.3; then five small non-teaching pacing trims: the recap's after-pause 1.0 -> 0.6 s,
  the `place` waits .8 / .6 -> .5 / .4, Momo's last goal card's after-pause .9 -> .7, the `fix` waits .5 / .5 / .3 -> .4 / .4 / .2, the
  dare's waits .6 / .3 -> .4 / .2 -> **5:34.7**. Never cut: a look-closer, a journey step, a Mark Sentence card, a strip, the pauses around
  new terms, a buddy's explanation of a key word. First to come back if there is room: P1 m606m (Momo fixes her guess in words, +5 s:
  Part 1 has 4 s of room to 5:35); P2 none.
- **Scores:** Part 1 Round 1 1 : 0, HOLD ON! 2 : 0; Part 2 Round 1 1 : 1, Showdown 3 : 1.
- **upload.json:** both parts public, Made for Kids (the uploader sets it), playlists PLb8LpPqxQI4E and PLPfEuT7l4KjI right after
  `explained-p3-ep18-part2`. Titles (87 and 83 characters) and descriptions from script section 7. **No `replaces`:** the classic P3 no. 12
  "Not All Metals Stick! What A Magnet Really Pulls" (**VLGDU0qduEw**, pp. 99-106, labs 6.1B and 6.2) also covers the two poles (pp. 105-106),
  which are EP20's (plan row 20, pp. 105-109); as EP16 -> EP17 did, EP20's upload.json sets `replaces: ["VLGDU0qduEw"]` + `retire_old`.
  School Lab 6.1B line left out (could not confirm the bench is live for pupils). **Not run.** Upload only after EP18 is live.
- **Facts (script section 3, "Facts to check"; no web access here):** 1 pigeons: kept with "scientists think" (homing pigeons' magnetic
  sense is well supported; the mechanism is still studied). 2 the snail: **kept** (the black scaly-foot snails of the Indian Ocean's Kairei
  vent field have iron sulfides, greigite and pyrite, in their foot scales and the shell's outer layer; greigite is ferrimagnetic and the
  snail is widely described as attracted to magnets; caveat: another population is white without the iron); the chiton fallback not used.
  3 the recycling plant: sorting plants use overhead magnets for steel cans (aluminium goes to a separate eddy-current machine): kept general,
  no plant named. 4 6.2 "usually", the cut-away, "Nobody made it" (a lodestone is natural magnetite): fine. 5-7 stainless steel, the iron
  wok, the fridge door: as the script says (SCENES_TODO rule 10). 8 the pin across the gap, the steel food tin, aluminium drink cans: fine.
  9 coins: kept out everywhere (n707c cut; no coin drawn).
- **Thumbnails (Stage 2, THUMBNAIL_V2, thumb_v2.js `ep19_1`, `ep19_2`):** P1 **WHICH ONE?!** + Momo surprised + the bar magnet over a steel pin
  and a curl of copper wire; sky blue to navy burst. P2 **COPPER?!** + Basil surprised + the magnet, a still copper wire and a drink can, a ?;
  lime to emerald burst (gold-to-orange if Basil's teal blends in). Alternates: PIN OR WIRE? / NOT ALL METALS!

## For Stage 2 (Fable): start here
- Read `SCENES_TODO.md` top to bottom (the rules block first, especially rules 5, 6, 8, 10, 11 and "Changed from the script's tables"), then
  `../p3_ep19_script.md` sections 3 (Realism, Facts to check) and 11.
- Places: our block's void deck (EP18's: copy ../ep18's void deck art into a new file such as `deck19.js` once EP18 is finished; never edit
  ../ep18), its recycling corner after a shower, the playground's swing; the HDB kitchen inset; the recycling plant (journey only). Replace
  the placeholders (`deckPH`, `cornerPH`, `trayPH`, `ringPH`, `lcPH`, `ffPH`, every `ph(...)` / `phScene`); keep every mark (the sound keys
  on them).
- Models: ../ep16 and ../ep18 `SC.holdon`, `SC.show` / `SC.fix`, `SC.dare`, the look-closers; ../ep18 `SC.dare` for the dare.
- Before rendering: diff this engine against ../ep18 once EP18 is finished and take any later engine fixes (not the EP-only parts: OUTCOMES,
  KW, KWLINE, PHR, learnAt, SHELF_HIDE); pass `achieved` to Basil's face for his cheer after m1005b (SCENES_TODO `lcattract`); copy
  highlights.py, make_moments.py, pose_reasons.json from ../ep18 and point them at EP19. Then `./build_part.sh 1` and `2` (only with >= 4 GB
  free: the disk had about 2.7 GB free on 23 Nov), contact sheets, the teacher's-eye review, fixes, upload (`--check` first).

## Open points
- **The Showdown sheet vs Basil's line:** the script's sheet text (2:49.0) has line 1 "the steel paper clip" and line 2 "the glass cup", but
  Basil's spoken line (2:57.2, recorded word for word) says "the iron nail" and "the wooden ruler". SCENES_TODO says draw the sheet to match
  what he says; the teacher may want the line re-worded instead.
- The new-words clip waits for the teacher's listen (above); it is an MP3 on disk, not in git.
- Disk space was low (about 2.7 GB free): a full render needs room for out/ chunks.
- Basil's cheer after m1005b needs `achieved` (outside learnAt's window); Pip's P1 cheer at `v_attract` lands right as his line ends.
- The theme's word INTERACT is spoken first in Part 2 (script, rules bent 3 and open point 8).
- The goal labels "What attract means", "How magnets interact", "Test, do not guess" are new (script open point 7).
- Pip has no back-view painting (the P1 cliffhanger uses Momo's back view and a front view of Pip turned in, as EP18).

## Stage 2 (drawing, sound, render, self-check): IN PROGRESS 2026-11-23 (resume from here)
- **Drawn (every placeholder replaced, every mark kept):** `art19.js` (new): the rock pigeon (`pigeon19`), the land snail (`snail19`), the
  scaly-foot snail, Basil's bar magnet with its cut-away (`magnet19`), the iron nail, paper clip, towel, foil, ruler, bowl, eraser, bottle,
  glass cup, drink can, food tin, Mum's iron wok, the lodestone, the six shapes, ring magnets, a hand that holds (four fingers and a thumb);
  the MAGNET TEST TABLE's tray `tray19` (alias `trayPH`; labels above the halves; flip at `groups`); our void deck `VD19` on EP18's baked
  `deck18` (afternoon light, the grey pipe, the INTERACTIONS banner on the easels, notice board, lamp post, bicycle rack, the potted plant;
  Part 2 wet: drips, the blue bin, the planter); the playground `PG19`; the four look-closers (`magnetArt`, `attractArt`, `metalsArt`,
  `interactArt`), the two journeys (`pinJourney`, `canJourney`), Momo's note, the fridge inset, Basil's sheet (`basilSheet`, drawn to his
  SPOKEN lines: the iron nail, the wooden ruler, the foil), the chant board, recap / ring / card / fun-fact / dare pictures. Borrowed unchanged
  from ../ep18 (for their helpers): home15, garden15, pond16, art16, art17, sets17, lc17, art18 (+ baked deck18, grass16, lime17, pond16,
  void17). `ep18dare.js`: magnet18 / pin18 / wire18 / darePic3 now come from art18.js (identical). tests.js: the Stage 1 tray removed.
- **Hidden-animal spots (art19.js PIGAT / SNAT; changed from SCENES_TODO where the planned spot was outside the scene's camera):** pigeon:
  the grey pipe (cold/back/theme/game: intro) · the floor by pillar B (table) · on top of the letterboxes (waitw) · the floor by pillar A
  (answer) · the rim of the potted plant's pot (holdon; never in the ring) · the test table's far edge (sticky) · REVEAL the bicycle rack's top
  bar. Snail: the blue bin's side (place/game: intro) · a wet fallen leaf on the floor (waitw) · the table's leg (tinans) · pillar A's base
  (table) · the foot of Basil's easel (show; never in the ring) · the pot's rim (fix) · the swing frame's leg (interact) · REVEAL a wet leaf of
  the potted plant.
- **Poses (teacher's two new rules applied):** the wrong buddy shy through the WHOLE answer / fix (P1 answer: Pip, Basil; HOLD ON!: Momo; the
  lcmagnet guess: Momo; lcattract: Basil's face shy after `gap`, NO cheer (SCENES_TODO's cheer dropped); P2 answer: Momo; lcmetals: Momo's
  face shy after `metals`, NO cheer at v_metals; Showdown/fix: Basil); the right ones arms crossed through. Reasons: `pose_reasons.json`.
- **Sound:** sound_cues.js Stage 2 block (void deck life, drips after the shower, the playground's birds and swing creak, foley on every mark);
  song.js + `coo` (the pigeon). Part 1 mix measured -16.0 LUFS.
- **Self-check so far:** sweep both parts (0 bad, 0 page errors); stills at every scene (qa/p1a-d, p2a-c, hid1/2: contact sheets).
- **Done:** thumbnails (`../thumb_v2.js` ep19_1 WHICH / ONE?! + Momo surprised, blue burst; ep19_2 COPPER?! + Basil surprised, green burst),
  app_moments.json + chapters_p3.json EP19_P1 / EP19_P2 (make_moments.py: titles <= 64, no negative words: asserted), pose audit +
  qa/buddy_faces_p1/p2.jpg, qa/lines_p1/p2.jpg (a still at every buddy line), highlights.py / make_preview.sh set for EP19.
- **Part 1 rendered** 17:52-18:05 (778 s; chunks kept); countdowns measured in the render: Round 1 (3 s) and HOLD ON! (5 s) numbers step
  1.00 s exactly, 1 frame after each tick. qa/ep1_compare_p1.jpg made. Two fixes after the render (the game's circle was behind Basil:
  T moved to [680, 440] in both parts; HOLD ON!'s Basil overlapped Pip): `out/rerender_p1.sh` re-renders only chunks 900-1500 and
  5400-6900 and finishes again (queued behind other episodes' renders on the shared lock).
- **Part 2 rendered** 18:53-19:05 (722 s). Countdowns in the render: Round 1 and the Showdown (5 s each) step 1.00 s exactly, 1 frame after
  each tick. finish.sh fixed (a Stage 1 bracket typo in its contact-sheet list stopped the .srt and sheet): both parts finished again.

## Stage 2 DONE 2026-11-23 (NOT uploaded: the teacher reviews first)
- **Renders:** `ep19_part1.mp4` **5:31.0**, `ep19_part2.mp4` **5:34.8** (1920x1080, 30 fps, **-16.0 LUFS** both); `ep19_part1.srt` /
  `ep19_part2.srt`; `sheet_part1.png` / `sheet_part2.png`. mp4s NOT committed (rebuild: `./build_part.sh 1` / `2`, about 13 min each under the
  lock). Chunk folders deleted.
- **Review pack:** `qa/buddy_faces_p1.jpg` / `_p2.jpg` (every pose with its reason), `qa/preview_p1_clips.mp4` (97 s) / `_p2` (95 s) (not
  committed), `qa/highlights.jpg` (14 labelled stills), `qa/ep1_compare_p1.jpg` / `_p2`, `qa/lines_p1.jpg` / `_p2` (a still at every buddy
  line), `thumb_part1.jpg` (WHICH / ONE?!) / `thumb_part2.jpg` (COPPER?!). `app_moments.json` (19A / 19B; keys O.interactions / CH.magnets are
  PLACEHOLDERS: check videos.js) and `production/youtube/chapters_p3.json` EP19_P1 / EP19_P2. `explained_upload.py upload.json --check`: OK
  (both parts would go after explained-p3-ep18-part2 once that is up).
- **Next (Stage 2.5 / 3):** the teacher's-eye review (NOTES_REVIEW.md), fixes, re-render, upload after EP18 is live.
- **Still weak / for the reviewer:** the lock-in rings are the shared lockN size (as EP18); the tray's small objects are small in wide shots
  (the camera pushes in when they matter); the hand that holds Basil's magnet is a human hand (four fingers and a thumb: no buddy has a holding
  pose); the pin journey's magnet is shown end-on (its S END is what the pin clicks onto); Momo's note card in HOLD ON! sits behind her at
  times; the dare's pencil stands in front of the tray.

## 23 Nov: LIVE
Teacher: "ok to upload all". Part 1 LZxwTx-EccU, Part 2 JpBskDtIwb0 (after EP18 in both playlists); replaces none (EP20 retires classic VLGDU0qduEw). Known flaw left in (teacher approved as is): the INTERACTIONS banner top is cut in the first shot (P1 0:05). Chapters: chapters_p3.json.

## 24 Nov: EP20's drawing notes applied here too (art-fix agent, Opus; commit 3cc1bd4)
- The dare's pencil passes THROUGH both ring magnets (art19.js `pencilThrough19` after each ring in `pencilRings`). Round 1 (Part 2): the two
  cans and their names moved up out from behind the countdown's number badge (`ringP2`); Round 1 (Part 1): "copper wire" too (`ringP1`).
  Every lock-in picture is clipped to the ring's inner circle (common.js lockN). Part 1 HOLD ON!: the wok picture centred on the ring and
  clipped (p1.js `inner`; it sat 40 px low, the wok behind the badge): Part 1 is the opening-fix agent's render.
- Part 2's voice wavs had been deleted; re-made with make_voice.py's own engine (scratchpad regen_voice.py 19 2): every line EXACT or the
  same take within the voice kit's jitter; the jsons unchanged.
- **Part 2 re-rendered:** `ep19_part2.mp4` **334.77 s**, -16.0 LUFS, peak -2.0 dBFS, Kampong Walk bed (add_lofi.py), countdowns 1.00 s
  steps; tl_p2 / srt unchanged; `qa/preview_p2_720p.mp4` (not committed). upload_v2.json: explained-p3-ep19v2-part2 replaces JpBskDtIwb0;
  chapters key EP19_P2_v2 (= the live Part 2's). `--check` of Part 2 alone OK (the full file waits for the Part 1 render). Not uploaded.

## v2 Part 1: the cold open speaks (2026-11-24, Opus; teacher: "Not speaking for the first few seconds", "fix the live ones too")
- SERIES_FORMAT 11 item 1, EP22's approach: Heart's "Last time, we asked:" now starts at **0.825 s** (was 6.3 s). The void deck stays under
  "A magnet, a steel pin and a copper wire! The pin and the wire are both metal." with every cold mark on a word of the dare: magOff on
  "magnet" 2.26, pinIn on "pin" 3.45, cardsIn on "wire" 4.24, budsIn on "The" 5.20; "lasttime" starts .45 s before "Which" (ltIn 7.76;
  build_tl.py's ("scene", name, {"at": mark, "d": s}), copied from ep22). sound_cues.js: the hand's "lift" now magOff + 1.9 (was a fixed
  3.1). p1.js: camCold over the whole scene, the place card from 0.2 s. Every later Part 1 time is **5.475 s earlier**; no voice re-recorded.
- The voice wavs were gone (only the jsons stayed). Re-made with make_voice.py's own engine (Heart bit-identical; the buddies' Character
  Voice Kit is not bit-exact run to run: same takes within a few ms / ~3 cents). The jsons are unchanged.
- **Render (after the n2 4-decimal fix and the lock-in ring clips, incl. the art-fix agent's EP19 P1 HOLD ON! wok / Round 1 wire moves):**
  `ep19_part1.mp4` 325.533 s, 9766 frames, -16.0 LUFS, decodes; first word 0.825 s; Round 1 numbers 58.304 ... 61.304, HOLD ON! 194.805 ...
  199.805 (1 frame after the ring start, as before; steps 1.000). New srt, sheet_part1.png, `qa/open_p1_first25.jpg`.
- Records: app_moments.json (19A 5.475 s earlier), chapters_p3.json key **EP19_P1_v2**, **upload_v2.json** (explained-p3-ep19v2-part1, after
  explained-p3-ep18v2-part2, replaces LZxwTx-EccU, retire_old). Part 2 is the art-fix agent's re-render (add it to upload_v2.json there).
  Not uploaded.
