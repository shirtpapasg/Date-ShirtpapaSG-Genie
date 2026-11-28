# EP11 build state (for a resume after a restart)
P3 EP11 "See-through, blurry or blocked? Light and materials" (P3 book Ch 3, p. 58: transparency): Part 1 "The TORCH Test: Which Glass Lets
Only SOME Light Through?" (the torch test, transparent, frosted glass, translucent; EP10's dare answered) and Part 2 "It Is WHITE. So Can Light
Pass Through a Wooden Door?" (opaque, transparency, "some plastics"). The script: `../p3_ep11_script.md` (version 1, 21 Nov 2026; the teacher's
go-ahead in its section 12: transparency taught last, in Part 2; the HOLD ON! on an unfair test stays; the door is painted white; the "cloudy"
plastic box; the OPAQUE tag white with a dark border; goldfish and moth; FROSTED GLASS a key word; the EP12 dare keeps glass, metal, fabric;
on upload EP11 replaces the classic X7Ys0KAaYyg; the four new words use Kokoro's own sounds). EP10 is live (its playlists' anchor for EP11).

Three stages: **Stage 1 (setup, done 2026-11-21, Opus)** · **Stage 2 (drawing, done 2026-11-21, Fable)** · **Stage 3 (render, checks, upload: done 2026-11-21, Opus; LIVE)**.

## Stage 1: done
- **No script change was needed** (the teacher's answers are the script's own recommendations). `p3_ep11_script.md` is untouched.
- **Engine copied from `ep10/`** (as it stands after EP10's Stage 3) with the 21 Nov fixes kept: buddies read the goal cards (`goals3`) and
  the Mark Sentences (`markScene`), lock-in clues on top of the ring and kept through the countdown (`lockN` `c.tag` / `c.labels`), the calm
  recap, the named hidden animal (`gameScene` + `hiddenBadge`, `lizReveal`), the look-closer frame (`closer.js` `lookCloser`, `lcLab`, `lcTag`,
  `lcVerdict`, `lcStrip`, + EP10's `slowTag`), `roundCard`, the "Now you know!" ending; and **EP10's Stage 3 lesson: every action sound is
  hung on the action's own mark** (script.py has a mark for each torch click, light, robot, swap and hand move; sound_cues.js uses them and
  says so at its top). Not copied: EP10's art files (water.js, rainy.js), its five look-closer arts (closer.js trimmed to the frame), its
  journeys (shrink.js is EP10's Stage 1 file: helpers only), its baked beach / void-deck sets, out/, mp4/wav in git, EP10's voices (only the
  ritual lines, copied unchanged: h501, h860, h864, u1300, h1304a/o/t, h1305, u1305, u1002). `bg/`: stage, stage2, daystage, _grain.
  - **Reused EP10 art:** `ep10dare.js` = EP10's three dare boards (`PIC.dClear`, `PIC.dFrost`, `PIC.dDoor`) and their small `torch()`, copied
    unchanged from ep10/rainy.js. So Part 1's recap of EP10's dare and Round 1's ring use the real boards (not placeholders); p1.js `dareBoard`.
  - Changed shared code (in ep11/ only): `lib.js` (EP11 `KW`, `KWLINE`, `SHELF_HIDE` with the five `lc*` scenes; TRANSPARENT, TRANSLUCENT,
    OPAQUE pop beside their Mark Sentence card after its last word, TRANSPARENCY on its own word, FROSTED GLASS inside `lcfrost`, all `o.at`),
    `common.js` (EP11 chant words `PHR` / `PCOL`, `chantFlash` -> the board's three rows), `closer.js` (`lcVerdict` takes `{ ink, edge }` for
    the white NO LIGHT verdict), `song.js` (a `tank` region: the goldfish tank's soft bubbles), `make_voice.py` (EP11 chant `ANS_AT`
    [.5, .5, .5]), `finish.sh` (ep11 names, EP11 marks for the contact sheet), `page.html` (ep10dare.js instead of water.js / rainy.js).
  - `tests.js` rewritten for EP11: the three answer styles `ANS` / `ansTag` / `VSTYLE` (MOST LIGHT / TRANSPARENT green, ONLY SOME LIGHT /
    TRANSLUCENT blue, NO LIGHT / OPAQUE plain white with a dark-violet border and letters), `LIGHTC`; the board OUR TORCH TEST (`ROWS`,
    `TILES()`, functional placeholder `torchBoard(t, {glow, flash})`: tiles hop on at their marks, the word stamped .8 s later, the heading
    TRANSPARENCY at `heading`); `HIDDEN` (goldfish / moth, placeholder art) + `hiddenBadge`; `lcPH` (with a NOW: label of the current
    picture beat); `ringPH`; `TORCH_RULE` / `torchRule` (the small print *Never shine a torch at anyone's eyes.*, upper left).
- **`script.py`**: both parts as data, every line word for word (checked by script against the markdown both ways: every script.py line is in
  the markdown with its speaker, and all 126 spoken quotes of sections 4-5 are in script.py; the chant is `CHANT`). Two-speaker cells are split
  one line per speaker. `CUTS` holds the script's section 6 cut tags (none used).
- **Voices** (`voice/`, 118 lines: 108 recorded for EP11 + 10 ritual lines): `/home/user/heart-tts/venv/bin/python make_voice.py` keeps
  finished files and re-records only lines whose text or voice options changed. Pace: Heart .90, .5 s between sentences; a new-term sentence
  x.93 and >= .65 s after it ("The frosted glass" in g1001); journeys .85, 1.0 s, softer; LOOK CLOSER .85, .8 s between sentences; buddies
  (Character Voice Kit) x.88; the two-sentence Mark Sentence cards .6 s between sentences; the recap g202 1.3 s between sentences (each board
  >= 2.5 s). Every text goes through `../sg_pron.py` (`_FixK`); no EP11 line is on the pronunciation list (checked: `needs_fix` is false for
  all). Chant: EP7's call and response (`BAR` 3.2 s, the answer on the stomp, 3 lines + YOUR TURN!, no all-together bar; Basil's call
  louder). Not aligned (spread by length, harmless): hk_transparency (one word).
- **The four new words** (script section 10 H / 12 (k)): Kokoro's phonemes are exactly the script's targets in every voice (all four voices
  use en-us): transparent tɹænspˈæɹənt ("trans-PAIR-uhnt"), translucent tɹænslˈuːsənt ("trans-LOO-suhnt"), opaque oʊpˈeɪk ("oh-PAKE", two
  beats), transparency tɹænspˈæɹənsi. Machine listen (pocketsphinx, choosing between "opaque" / "oh-pack" / "oh-pah-kay" / "op-ick"): every
  Heart, Basil, Momo, read-along and chant take decodes as the right word. **One to listen to first: Pip's "opaque" at the end of his Mark
  Sentence card (j602, "These materials are opaque.")**: the decoder heard "op-ick"; its formants do glide like "-PAKE" (F2 2290 -> 2970 Hz),
  but its start is open, so it may sound a little like "oh-PIKE" to a listener. Pip's other "Opaque!" (the chant) decodes correctly. If a
  human hears it wrong: add a `PRON` respelling for that one line (or re-record j602 alone) and rebuild the timeline (the card's length moves
  only a little). `qa/new_words_check.m4a` (2:06): each voice's lines with the new words in a row (Heart 0:00, Pip 0:41, Basil 0:52, Momo
  1:10, the read-along 1:17, each buddy's chant answers 1:26, the whole chant 1:46).
- **Timelines**: `python3 build_tl.py 1|2`. **Lengths (Stage 1): Part 1 4:54.6 (294.6 s), Part 2 5:04.5 (304.5 s)**, both under 5:15 WITH
  the five look-closer holds (verdicts 2.5 s). No cut was needed. Cut candidates if Stage 2 adds time (script section 6, never teaching):
  Part 1 the title's second slam (picture), `button` g605 (about 1.8 s), `blurry` g1006 (about 2.5 s), `bookwords` g701 (about 1.4 s), `oops`
  g804 (last: the three tags say it; it is replaced by a 2.4 s wait, so it saves little); Part 2 `snacks` j1402 (about 3 s), `both` j1104
  (about 1.5 s), `notes` (Pip reads only "My notes!" and line two; j1001 re-recorded short, about 5 s), `colour` j505 (last of all; then the tag
  *White is only its colour* must show). If a Basil line is cut, cut one of Pip's or Momo's too.
  Lines by speaker (goal cards counted one by one): Part 1 Basil 7, Pip 6 (4 goal cards), Momo 4; Part 2 Basil 9 (4 goal cards), Pip 5, Momo 3.
- **Sound**: `sound_cues.js` (EP11's cues on the same words and marks as the picture) -> `node dump_cues.js P` (166 / 176 events) ->
  `node song.js P` -> `out/mix_pP.wav`, both **-16.0 LUFS** (true peak -1.5 dBFS), no missing sounds, no bad times. New uses: the `tank` region
  (bubble.wav), the `night` crickets in the corridor, library one-shots click.wav (every torch switch), hum.wav (the light), ping.wav (the
  bright spot), hiss.wav (the soft glow), thud.wav (the door), ep09_wings.wav (the moth), rush.wav, pass_by.wav.
- **`p1.js` / `p2.js`**: shared routines wired (Part 1's calm recap of EP10's dare with EP10's real boards stepping forward as Heart says each
  card and its card lighting; the title slam over the dimmed table; game; goals read by Pip / Basil; countdown; the setup's safety print growing
  to the middle; the HOLD ON! ring with both clue labels on top of the ring kept through Heart's rule; round cards; lock-ins with cards, clue
  labels on top of the ring, picks and reactions (Part 1 with EP10's boards in the ring); Mark Sentences read by Momo, Basil / Pip, Basil; the
  book strips (g704, g1103, j604, j1105); the board OUR TORCH TEST as a functional placeholder in every scene it stands in; Part 2's
  three-picture recap with its coloured labels; the tip card; the EP12 dare cards; chant; score hand; read-along; "Now you know!"); every
  new-art scene is a `phScene` placeholder naming what to draw, and each of the five [LOOK CLOSER] moments (`lcclear`, `lcfrost`, `lcdoor`,
  `lcthree`, `lcbox`) is an `lcPH` placeholder inside the real look-closer frame (push-in, dim, window, LOOK CLOSER tag, the verdict in its
  answer style at its `v_*` mark, a NOW: label naming the current picture beat).
- **`SCENES_TODO.md`** (generated: `python3 make_todo.py`; re-run after any timeline change): every scene's time range, what to draw, what to
  reuse, what is new, its marks and lines (with times); the poses; the choices made where the script was unclear.
- **Checks**: `qa/p1_check.jpg`, `qa/p2_check.jpg` (placeholder stills at every scene start and middle and after every mark: 95 + 80
  frames): no page errors. No video rendered.
- **`upload.json`** written for Stage 3 (ep10's shape): titles and descriptions from script section 7, playlists PLb8LpPqxQI4E and
  PLPfEuT7l4KjI **after "explained-p3-ep10-part2"** (EP10 Part 2 HjN5HO7qFnY, uploaded under that key), `"replaces": ["X7Ys0KAaYyg"]`
  (the classic "Waterproof Or See-Through? Testing Materials (Part B)"), `"retire_old": true`. The School Lab 3.6 line is left out of the
  descriptions until that lab is signed off.

### What Stage 2 (drawing) must draw
Sets: the living room of an HDB flat at dusk (clear glass window with the evening sky, a white bedroom door, the bathroom door ajar with its
frosted window glowing, sofa, standing lamp, a shelf with a small glass fish tank) + a dimmer version for the tests; the common corridor of the
HDB block at night (the white front door, metal gate folded open, rubber doormat, shoe rack with a metal tray, potted plants, a clear window
showing the lit room, a frosted window glowing, the ceiling lamp, the parapet, the night sky, the lit block opposite, a small folding table).
Props: the test table (a small hand torch on a low wooden stand on the painted TORCH MARK, the beam as a soft pale cone, a wooden holder, the
card OUR CARD, the rack, the label OUR TORCH TEST), three framed sheets (clear glass, frosted glass, a piece of a white wooden door with bare
edges and a knob), the rubber doormat and the metal tray in frames, two plastic lunch boxes (clear, cloudy), EP1's robot at table scale
(props.js `robotRig`: sharp / blurred / hidden), an adult's hands and finger, the board OUR TORCH TEST and its seven tiles (replace
`torchBoard`), Pip's notes on an easel, the three EP12 dare boards (a supermarket trolley of glass, of metal, of fabric, each whole, with a
bag of rice). Five look-closer arts (`clearArt`, `frostArt`, `doorArt`, `threeArt`, `boxArt`) with their sets; the ring pictures (Part 1
HOLD ON!'s table, Part 2 Round 1's white door); small pictures under the four Mark Sentence cards; Part 2's three recap pictures. Two journeys
(BE THE LIGHT: inside the torch, the table plain, the clear glass glint, the card wall, the cloudy wall; BE THE LIGHT OF THE LAMP: the flat at
night from inside, the door, the frosted pane, the clear window and the corridor beyond). Two hidden animals, cute and alive: the goldfish in
the tank, the moth by the corridor lamp. No shadow anywhere. Reused as they are: EP10's three dare boards and torches (ep10dare.js), EP10's
three cards.

## Stage 2: done (2026-11-21, Fable). Every scene is drawn; no `phScene` / `lcPH` / `ringPH` / `hiddenPH` placeholder is left in `p1.js` / `p2.js`.
**Lengths unchanged: Part 1 4:54.6 (294.6 s), Part 2 5:04.5 (304.5 s).** `script.py`, the voices and the timelines were not touched (no cut used).
- **New file** `flat.js` (page.html loads it after ep10dare.js): `BG.flat` / `BG.flatD` (the HDB living room at dusk / dimmer for the tests,
  baked), `BG.corridor` (the corridor at night, baked) (`node bake.js flat flatD corridor` after any change to them); `tableView(t, o, cam)`
  = a set with everything on its table; `rig(t, o)` = the side-on torch test (torch on its stand on the TORCH MARK, holder, OUR CARD, a sheet
  `clear | frost | door | mat | tray | boxC | boxF`, the soft pale beam, the spot / the soft glow, EP1's robot BEHIND the sheet (sharp /
  blurred / hidden), an adult's hands `hand` / `finger`); `frontView` (looking straight through a sheet); `rigCard` (the test in a small
  frame); `swapSheet` / `setHand` / `pressAny` (the hands on their marks); `TILEPIC` (the board's seven tiles); `tankSvg` + `goldfishArt`,
  `mothArt` + `mothLive`; `pipNotes`; `lunchBox`; `PIC.trGlass / trMetal / trFabric` (the EP12 trolley boards); `XDEFS10` (gradients, blurs).
- **Changed:** `tests.js` (`torchBoard` drawn: rows in the three answer styles, picture tiles, `o.tg` tile glow; `HIDDEN` = the drawn
  goldfish / moth), `closer.js` (the five arts `clearArt`, `frostArt`, `doorArt`, `threeArt`, `boxArt`, `splitPic`, `verdictPills`),
  `shrink.js` (both journeys), `p1.js` / `p2.js` (all scenes), `sound_cues.js` (ONE change: the second torch click at `tray + .15` is
  removed, because in row 3 the torch goes on once at `mat + .15` and stays on while the hands change the mat for the tray).
- **LOOK CLOSER as built** (shared frame: push-in, set dims, no score / shelf / buddies / hidden animal, one verdict held 2.5 s):
  | Scene | Part, time (verdict) | What is shown | Verdict |
  |---|---|---|---|
  | `lcclear` | P1 1:02.5-1:24.0 (1:21.5) | a finger presses the switch (on1); the beam goes into the glass and out, just as bright; the view widens to the card: a bright spot with a clean edge (spot1); torch off (off1), the room lightens; a hand sets the robot behind the glass (robot1); the camera swings round: the robot sharp | MOST LIGHT PASSES THROUGH (green) |
  | `lcfrost` | P1 2:37.7-3:06.2 (3:03.7) | FROSTED GLASS pops; torch on (on2): the sheet itself glows, behind it only a wide faint fan; a soft glow on the card (glow2); split (split): clear glass · a bright spot / frosted glass · a soft glow; torch off (off2); the robot set behind (robot2); swing: a soft blur of its colours | ONLY SOME LIGHT PASSES THROUGH (blue) |
  | `lcdoor` | P2 0:54.1-1:20.1 (1:17.6) | torch on (on3): the beam ENDS on the brightly lit white front; the camera slides behind (behind): the card as dim as the corridor, no bright spot · no glow; torch off (off3); swing to the door's front; a hand lifts the door (lift): the robot is there; the door goes back | NO LIGHT PASSES THROUGH (white, dark border and letters) |
  | `lcthree` | P2 1:52.2-2:08.8 (2:06.3) | three test lines one above the other (clear glass, frosted glass, wooden door), the same torch; the cards light in turn (c1 a bright spot, c2 a soft glow, c3 no spot, no glow); a plain bracket: How much light? | three pills: MOST (green) · ONLY SOME (blue) · NONE (white, dark border) |
  | `lcbox` | P2 3:20.6-3:41.5 (3:39.0) | a hand sets the clear box in the holder; torch on (on4): a bright spot; the hands change the boxes (swap; the torch stays on, the spot shows for a moment between them): a soft glow; split (split2): plastic · a bright spot / plastic · a soft glow | three pills: BOTH PLASTIC (dark) · ONE TRANSPARENT (green) · ONE TRANSLUCENT (blue) |
- **Journeys:** BE THE LIGHT (P1 3:36.4-4:01.3: inside the torch (the shiny cup, the lens ahead, the tiny bulb), Click!, out over the table
  plain, the wooden frame with a glint grows and slides past, the card rushes up, a bright ring; again: the cloudy wall fills the view and
  glows, beyond it the view is dimmer and the card has a wide soft glow) · BE THE LIGHT OF THE LAMP (P2 2:24.5-2:46.8: the flat from up by
  the lamp, the white front door rushes up, lights up and stops you; the frosted pane, the corridor beyond a dim blur; the clear window's
  frame slides past, the corridor sharp: parapet, plants, night sky, lit windows). The edges of the view glow all the way.
- **Hidden animals** (named by Heart with the drawn badge; the reveal rings them): the **goldfish** in the glass tank on the shelf by the
  window (`GF` [1372, 420]) in every wide shot of the living room (it swims to and fro, bubbles; at the reveal it comes forward and waves its
  tail); the **moth** by the corridor's ceiling lamp (`MOTH` [1000, 168], a slow loop) in every wide corridor shot (at the reveal it flutters
  down to the wall, opens its wings and waves a feeler). Neither is in a look-closer or a journey.
- **No shadow** is drawn anywhere: the things on the tables have no contact shadows; the robot is behind a see-through sheet only while the
  torch is off (behind the door / mat / tray no light reaches it). (EP10's own dare boards keep their small torch's soft base, unchanged.)
- **Deviations from the script / SCENES_TODO** (picture only): the side view is seen from a little towards the torch, so each sheet and
  the card show their front, and the robot "behind the sheet" is seen THROUGH it at table scale too (hidden by the door); the cliffhanger
  uses this same view (not a separate view from the torch's side); the camera's "swing round" is a quick turn to a front view; the spot
  "lands" by the view widening to the card (light is at once); the robot goes back to its place by the rack as the sheets change in HOLD ON!;
  the HOLD ON!, fixtorch, robot and cliff scenes shift / zoom the table so nothing stands behind a buddy's disc (the board is out of frame in
  HOLD ON! and Momo's close-up); `lcthree` is three side views stacked (not a view from above) and its torches are already on; row 3: one
  click (see sound_cues), the tray's front lit from `tray - .35`; the Showdown and the dare are on the dimmed / cleared corridor table; the
  waiting cloudy box stands left of the torch; `fix` has no small print (the strips need the room); "Last time" (Part 1) stays on the stage;
  the buddies stay small in both `waitw` glides; the robot is EP1's rig unchanged (one red, one yellow button and a blue bar).
- **Checks (stills only; no video rendered):** stills every 0.45 s of both parts: no page errors. `qa/p1_sheet.jpg`, `qa/p2_sheet.jpg`
  (a frame about every 3 s), `qa/lc_p1.jpg`, `qa/lc_p2.jpg` (the five look-closers as strips), `qa/journey_light.jpg`, `qa/journey_lamp.jpg`.
  Thumbnails `thumb_part1.jpg`, `thumb_part2.jpg` (`node thumb_still.js N 1 qa/th/fN.png "&thumb"`, then
  `node thumb.js qa/th/f1.png thumb_part1.jpg 1 "CLEAR GLASS" "FROSTED GLASS?!" 230 150 132` and
  `node thumb.js qa/th/f2.png thumb_part2.jpg 2 "A WHITE DOOR" "LIGHT? NONE!" 230 150 132`). Cues and preview mixes rebuilt (-16.0 LUFS).
- **Stage 3 should watch in motion:** every hand (sheets in and out at sheet1, swap1, doorIn, mat, tray, the boxes; the finger on the
  switch at each on / off mark; the robot set behind the glass) against its sound; the two camera swings and the door lift (lift .. +1.3);
  the widening to the card at spot1 / glow2 and the slide behind the door; both splits' cream flash; the low slides (dare boards, the board,
  the robot at `robot`, HOLD ON! and the cliff, the torch push and its way back, the trolley boards); the journeys' rushes (Click! at
  3:41, the frame pass at 3:46, the door stop at 2:32, the window pass at 2:42); the row-3 swaps (fast: 0.5-0.6 s each); the frosted
  robot's blur (heavy filter: check render speed in `lcfrost` 2:57-3:06, row2 and the frosted journey); the goldfish's turn-around and the
  moth's flutter and landing; label overlaps on the long book strips (row1 / row2 are 42 / 40 px, shifted left of the shelf).
- Stills: `PART=1|2 ./sheet.sh name cols t1 t2 ...` -> `qa/name.jpg` (prints page errors). Draw one expression: `node probe.js out.jpg 1 '<js>'`.

## Stage 3 (Opus): `./build_part.sh P` (timeline, cues, song, `flock /tmp/explained_render.lock node render.js P 3`, `finish.sh P`)
- Output `ep11_partP.mp4` (ignored), `ep11_partP.srt`, `sheet_partP.png`; check stills around every swap, card, look-closer and reveal.
- A human listens to `qa/new_words_check.m4a` (Pip's j602 "opaque" first) before upload.
- Upload with `production/youtube/explained_upload.py ep11/upload.json` (Made for Kids, public, both playlists after EP10 Part 2's key
  `explained-p3-ep10-part2`; `retire_old`: the classic X7Ys0KAaYyg "Waterproof Or See-Through? Testing Materials (Part B)" leaves the
  playlists and points to the new episode; never deleted, stays public). If its NEW VERSION line should also name EP10, add it by hand.
- Status: see ../progress/ep11.json

## 21 Nov 2026: Stage 3 (Opus): rendered, checked, LIVE
- **j602 re-recorded.** Pip's "opaque" ("These materials are opaque.") with Kokoro's own oʊpˈeɪk came out with a reduced first syllable and a
  short, open second vowel: pocketsphinx chose "oh-pack" / "oh-peck" over "opaque" for that phoneme string at five speeds (phone loop
  "AW P IH"). Formants show a front glide (F2 2600 -> 3000 Hz, not the low F2 of "oh-PIKE" that Pip's own "oh-pike" has, about 1900 Hz),
  so it was never "PIKE", but it was not clearly "oh-PAKE". The respelling "oh-pake" (ˈoʊpˈeɪk) decodes as "opaque" (phones OW P EY K) in 4
  of 5 speeds. New script opt `pron` (a respelling for ONE line; the caption keeps the script's words): j602 has
  `{"pron": {"are opaque.": "are oh-pake."}}`; make_voice.py applies it (`LINE_PRON`) and aligns "oh-pake" (EXTRA). Only j602 was
  re-recorded (5.44 -> 5.46 s); Part 2's timeline moved by .02 s. `qa/j602_opaque_check.m4a` (11 s): the old ending, the new ending, the new
  whole line. The chant's "Opaque!" and every other take are unchanged.
- Rendered with `./build_part.sh 1|2` (10 s chunks in `out/chunks_p1`, `out/chunks_p2`; about 11 min a part, 3 workers). `ep11_part1.mp4`
  294.67 s (**4:54.7**), `ep11_part2.mp4` 305.10 s (**5:05.1**); 1920x1080 30 fps; both -16.0 LUFS (true peak -1.0 / -1.3 dBFS). Captions
  `ep11_part1.srt` (123 cues), `ep11_part2.srt` (129 cues), 0 overlapping cues; contact sheets `sheet_part1.png`, `sheet_part2.png`.
  Render speed was fine in the frosted-blur stretches (lcfrost, row2, both journeys).
- **Checked** (frame strips from the rendered chunks and files, `qa/stage3/`): the cold open (EP10's three boards slide in, "Never shine a torch
  at anyone's eyes." on screen from 0.7 s; in Part 2 from the corridor shot on); the calm recaps (P1 EP10's boards with their cards; P2 three
  pictures, each with its coloured label, the board beside the white door); the goldfish / moth named with their picture ("a little goldfish",
  "a little moth") and ringed at the end with Heart's pill; goal cards read by Pip (P1) / Basil (P2), each ticked; the Mark Sentences read by
  the "Say it with me!" buddy (Momo, Basil; Pip, Basil) with the key word popping beside the card; the HOLD ON! ring with "the sheet: changed"
  / "the torch: moved" above it through the countdown; Round 1 lock-ins (P1 clear glass / frosted glass / wood; P2 wood / painted white
  above the ring through the countdown); all five look-closers in motion: the finger on the switch at every on / off mark, the beam, the
  widening to the card (spot1, glow2), the robot set behind the glass by a hand (robot1, robot2), the quick turn to the front, the frosted
  robot's blur, the split's cream flash, the slide behind the door, the door lift (the robot is there; the door goes back), the three test
  lines lighting in turn, the box swap (hand out, spot for a moment, cloudy box in, soft glow), split2; verdicts in their answer style (NO
  LIGHT white with a dark border); row 3's fast swaps (rubber mat in, lit briefly, tray in); BE THE LIGHT (inside the torch, Click! ~3:41,
  the frame pass, the card rush and bright ring, the cloudy wall and soft glow) and BE THE LIGHT OF THE LAMP (the door rushes up and stops
  you ~2:32, the frosted pane blur, the window pass ~2:42 out into the night); the showdown (Pip's notes, ring on line two, picks, the two
  boxes); the chant; score hands; the EP12 trolley boards; key words; "Now you know!". No shadow anywhere. Action sounds checked against their
  marks in cues_p1.json / cues_p2.json (clicks on on* / off*, ting on spot1, ratchet on the robot, tok on each sheet).
- **Fixed** (small, local; only the affected chunks re-rendered):
  - P1 cold open: OUR CARD stood in front of EP10's first board and hid "clear glass" -> the boards stand further right (`DBX` 1320 / 1505 /
    1690). Chunk 0-10 s.
  - P1 row2: the strip "You cannot clearly see the objects placed behind translucent materials." ran under the shelf's TRANSPARENT pill
    (its full stop hidden) -> size 37, x 830. Chunks 200-220 s.
  - P1 goldfish reveal / P2 moth reveal: the board OUR TORCH TEST stood cut off at the frame's edge under Heart's pill -> no board in `liz`.
    Chunks 240-260 s (P1), 260-270 s (P2).
  - P2 row3: the second strip "You cannot see objects placed behind opaque materials." ran under the small print "Never shine a torch..."
    (its "Y" hidden) -> x 1175.
  - P2 `fix`: the strip "Frosted glass and some plastics are translucent." ran under the TRANSPARENCY pill -> size 44, x 900. Chunks 220-240 s.
  - P2 `lcthree` / `lcbox`: three verdict pills land one after another (.44 s), so the last pill was readable only about 2.2 s -> new
    `VERDICT3` (2.8 s) in script.py for v_three and v_box. Part 2 +0.6 s; its cues, mix and chunks from 100 s re-rendered.
  - finish.sh: a stray `)` in the contact-sheet line stopped the stills and the .srt (Stage 1 bug); fixed.
- Not changed (noted): the key word's fly to the shelf passes over the Mark Sentence card for a moment (as in earlier episodes); in Round 1 /
  the showdown a buddy's bubble springs in while the one before is still fading (about .3 s); in the showdown Basil's disc touches the edge
  of Momo's "2" card (the number stays readable); the camera's quick turn in the look-closers squeezes the view for a few frames (by design);
  the first thumbnail's PART 1 badge covers the left torch's TORCH MARK label (the thumbnails otherwise read well; unchanged).
- Uploaded with `upload.json` (checked against ep10/upload.json; Made for Kids, public; both playlists PLb8LpPqxQI4E and PLPfEuT7l4KjI right
  after EP10 Part 2 HjN5HO7qFnY via the key `explained-p3-ep10-part2`; `retire_old`: the classic X7Ys0KAaYyg "Waterproof Or See-Through?
  Testing Materials (Part B)" left both playlists and its description now starts with "▶ NEW VERSION: ..." pointing to EP11 Part 1; it stays
  public, never deleted). The School Lab 3.6 line is left out of the descriptions until that lab is signed off.
  Part 1 https://www.youtube.com/watch?v=ABTKBrfkDW0 , Part 2 https://www.youtube.com/watch?v=q2KJp6lKln0 .
- Left for the teacher: listen once to `qa/j602_opaque_check.m4a` (Pip's new "opaque") and `qa/new_words_check.m4a` (the other new words);
  watch the five look-closers, both journeys and the goldfish / moth reveals. The old video's NEW VERSION line names EP11 Part 1 only; if it
  should also name EP10, add it by hand.
