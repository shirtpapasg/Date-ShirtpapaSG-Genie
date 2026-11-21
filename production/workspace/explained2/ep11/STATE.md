# EP11 build state (for a resume after a restart)
P3 EP11 "See-through, blurry or blocked? Light and materials" (P3 book Ch 3, p. 58: transparency): Part 1 "The TORCH Test: Which Glass Lets
Only SOME Light Through?" (the torch test, transparent, frosted glass, translucent; EP10's dare answered) and Part 2 "It Is WHITE. So Can Light
Pass Through a Wooden Door?" (opaque, transparency, "some plastics"). The script: `../p3_ep11_script.md` (version 1, 21 Nov 2026; the teacher's
go-ahead in its section 12: transparency taught last, in Part 2; the HOLD ON! on an unfair test stays; the door is painted white; the "cloudy"
plastic box; the OPAQUE tag white with a dark border; goldfish and moth; FROSTED GLASS a key word; the EP12 dare keeps glass, metal, fabric;
on upload EP11 replaces the classic X7Ys0KAaYyg; the four new words use Kokoro's own sounds). EP10 is live (its playlists' anchor for EP11).

Three stages: **Stage 1 (setup, done 2026-11-21, Opus)** · Stage 2: Fable draws the scenes (`SCENES_TODO.md`) · Stage 3: render (Opus).

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

## Stage 2 (Fable): draw every scene in SCENES_TODO.md
- Replace each `phScene` / `lcPH` / `ringPH` / `hiddenPH` / `torchBoard` placeholder; keep the function names and arguments the scenes call.
- New sets in new files loaded before common.js in page.html; bake static sets: `NODE_PATH=$(npm root -g) node bake.js flat corridor`.
- Keep each action on its mark (on1.., off1.., robot1.., swap, mat, tray, doorIn, ...); if one must move, move its cue in sound_cues.js too.
- Stills: `PART=1|2 ./sheet.sh name cols t1 t2 ...` -> `qa/name.jpg` (prints page errors). Draw one expression: `node probe.js out.jpg 1 '<js>'`.
- After any timeline change: `python3 build_tl.py 1|2`, `python3 make_todo.py`, `node dump_cues.js P`, `node song.js P` (all with
  `NODE_PATH=$(npm root -g)`).
- Thumbnails (script section 7): Part 1 a bright frame of `lcfrost`'s split (clear glass with its bright spot left, frosted glass with its soft
  glow right), words CLEAR GLASS / FROSTED GLASS?!, Basil surprised at the left; Part 2 a bright frame of `lcdoor` (the beam ending on the
  bright white door, the card behind with no spot), words A WHITE DOOR / LIGHT? NONE!, Momo surprised at the left. `node thumb_still.js N 1
  qa/th/fN.png "&thumb"`, then `node thumb.js qa/th/f1.png thumb_part1.jpg 1 "CLEAR GLASS" "FROSTED GLASS?!" ...` (as EP10).

## Stage 3 (Opus): `./build_part.sh P` (timeline, cues, song, `flock /tmp/explained_render.lock node render.js P 3`, `finish.sh P`)
- Output `ep11_partP.mp4` (ignored), `ep11_partP.srt`, `sheet_partP.png`; check stills around every swap, card, look-closer and reveal.
- A human listens to `qa/new_words_check.m4a` (Pip's j602 "opaque" first) before upload.
- Upload with `production/youtube/explained_upload.py ep11/upload.json` (Made for Kids, public, both playlists after EP10 Part 2's key
  `explained-p3-ep10-part2`; `retire_old`: the classic X7Ys0KAaYyg "Waterproof Or See-Through? Testing Materials (Part B)" leaves the
  playlists and points to the new episode; never deleted, stays public). If its NEW VERSION line should also name EP10, add it by hand.
- Status: see ../progress/ep11.json
