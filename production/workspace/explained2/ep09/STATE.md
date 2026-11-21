# EP9 build state (for a resume after a restart)
P3 EP9 "Snap it or bend it: strong vs flexible" (P3 book Ch 3, pp. 53-55): Part 1 "Paper vs Fabric: We Hung Weights Until One TORE!"
(physical property, strength, strong and fragile) and Part 2 "Rubber Band vs Ice-Cream Stick: Which One SNAPS?" (flexibility, flexible and
rigid, the three tubes, strong is not flexible). The script: `../p3_ep09_script.md` (version 1, 21 Nov 2026; the teacher's answers in its
section 12: "fragile" is said FRAJ-ile; strength first, EP8's dare answered in Part 2 Round 1; the glass cup breaking in the drop box is OK, with
the metal cup bouncing too; the cute spider stays as Part 1's hidden animal). **EP9 replaces no old video on upload** (the classic
5fBBrJMrAcU stays in the playlists until EP10 is live; EP10 then retires it).

Three stages: **Stage 1 (setup, done 2026-11-21, Opus)** · Stage 2: Fable draws the scenes (`SCENES_TODO.md`) · Stage 3: render (Opus).

## Stage 1: done
- **Engine copied from `ep08/`** with EP7/EP8's 21 Nov fixes kept: buddies read the goal cards (`goals3`) and the Mark Sentences (`markScene`),
  lock-in clue tags on top of the ring and kept through the countdown (`lockN` `c.tag`), the calm recap, the named hidden animal (`gameScene`
  + `hiddenBadge`, `lizReveal`), the look-closer frame (`closer.js` `lookCloser`, `lcLab`, `lcTag`, `lcVerdict`, `lcStrip`), the "Now you know!"
  ending with the YOU tag only beside the YOU hands. No `out/`, no mp4/wav in git, no EP8 voices (only EP8's ritual lines, copied unchanged:
  h501, h860, h864, u1300, h1304a/o/t, h1305, u1305, u1002).
  - Kept as EP8 libraries for reuse: `materials.js` (MAT, `phScene`), `canteen.js` (`board7`, `boardAt`, `pline`, `ltag`, `slamLine`,
    `boardSlide` ...), `pics.js` (`picBoard`, PIC.* incl. `band1` / `stick`; its sparrow/sheep HIDDEN removed). EP8's seven look-closer scenes
    were removed from `closer.js` and its two journeys from `shrink.js` (models: `ep08/closer.js`, `ep08/shrink.js`). `bg/`: only stage,
    stage2, daystage, _grain (EP8's canteen/stall/under bakes not copied; `bg/manifest.js` updated).
  - Changed shared code: `lib.js` (EP9 `KW`, `KWLINE`, `SHELF_HIDE` with the five `lc*` scenes; FRAGILE/STRONG and FLEXIBLE/RIGID pop
    beside the strip / card with `o.at`), `common.js` (EP9 chant words `PHR`/`PCOL`, `chantFlash` -> [line1, line2, line3], `chantScene`
    takes x/y0/dy/size; `roundCard` sizes its card to the longer line), `closer.js` (`lcVerdict` draws a long tag smaller so it fits).
  - New `tests.js`: answer colours `GOODC` (green: STRONG, FLEXIBLE) / `WEAKC` (blue: FRAGILE, RIGID); the board `TESTS`, `ticked`, placeholder
    `board3(t, {glow})`; `HIDDEN` (spider / caterpillar, placeholder art) + `hiddenBadge`; `lcPH` (a look-closer placeholder inside the real frame).
- **`script.py`**: both parts as data, every line word for word (checked by script against the markdown both ways: every script.py line is in
  the markdown, and all 125 spoken quotes of sections 4-5 are in script.py; the chant is `CHANT`). Two-speaker cells are split one line per
  speaker. `CUTS` holds the script's section 6 cut tags (none used).
- **Voices** (`voice/`, 117 files: 107 recorded for EP9 + 10 ritual lines from EP8): `/home/user/heart-tts/venv/bin/python make_voice.py` keeps
  finished files and re-records only lines whose text or voice options changed. Pace: Heart .90, .5 s between sentences; a new-term sentence
  x.93 and >= .65 s after it; journeys .85, 1.0 s, softer; **LOOK CLOSER .85, .8 s between sentences** (script: "about 0.85 ... 0.8 to 1.0 s");
  buddies (Character Voice Kit) x.88. Every Heart and buddy text goes through `../sg_pron.py` (`_FixK`): **"fragile" is said FRAJ-ile**
  (fɹˈædʒaɪl) in g404 (Momo), g1104, hk_fragile, uk_fragile (all three buddies), j101; checked: every one of these goes through `speak_line`,
  and the forced aligner matches g1104 / hk_fragile to "F R AE JH AY L" (`make_voice.py` aligns "fragile" to the FRAJ-ile sound). Listen clip
  for a human: `qa/fragile_check.m4a` (the five lines in a row). Buddies take the line's `gap` (Momo's two-sentence card: .6 s).
  Chant: EP7's call and response (`make_voice.py` `BAR` 3.2 s, `ANS_AT` [.5, .25, .5], 3 lines + YOUR TURN!, no all-together bar; Basil's call
  louder). Not aligned (spread by length, harmless for one word): hk_flexibility.
- **Timelines**: `python3 build_tl.py 1|2`. **Lengths (Stage 1): Part 1 5:09.9 (309.9 s), Part 2 4:57.3 (297.3 s)**, both under 5:15 WITH the
  five look-closer holds (verdicts 2.5 s). No cut was needed. Cut candidates if Stage 2 adds time (script section 6, never teaching):
  Part 1 `firsttwo` g508 (about 1.9 s), `sorrycup` g1004 (2.2 s), `piptwo` g605 (1.0 s), `sizesame` g706 (4.3 s); Part 2 `hungry` j807 (1.3 s),
  `snapped` j504 (2.2 s), `tiles` j703 (5.8 s), `million` j1302 (3.4 s). If a Basil line is cut, cut one of Pip's or Momo's too.
  Lines by buddy: Part 1 Basil 7, Momo 6 (4 are the goal cards), Pip 3; Part 2 Pip 7 (4 goal cards), Basil 6, Momo 5.
- **Sound**: `sound_cues.js` (EP9's cues on the same words and marks as the picture) -> `node dump_cues.js P` (188 / 165 events) ->
  `node song.js P` -> `out/mix_pP.wav`, both **-16.0 LUFS**, no missing sounds. New uses: the void deck / playground ambience (`R.canteen`, far
  children), library one-shots `click.wav`, `ep03_clank.wav` (the metal cup), `ep05_crack.wav` (the glass, low), `ep08_snap.wav` (the stick),
  `footsteps.wav`, `ep05_horn.wav` (the ship). (Fixed: a `pluck` cue with no value made NaN in Part 2's mix.)
- **`p1.js` / `p2.js`**: shared routines wired (Part 1's calm recap with EP8's own board7 and dare boards; game; goals read by Momo / Pip;
  countdown; round cards; lock-ins with cards, clue tag, picks and reactions; Mark Sentences read by Pip, Basil / Basil, Momo; FRAGILE/STRONG
  book strips; Part 2's three-picture recap timing and labels; chant; score hand; read-along; "Now you know!"); every new-art scene is a
  `phScene` placeholder naming what to draw, and each of the five [LOOK CLOSER] moments is an `lcPH` placeholder inside the real look-closer
  frame (push-in, dim, window, LOOK CLOSER tag, the verdict at its `v_*` mark, the book strip for j902).
- **`SCENES_TODO.md`** (generated: `python3 make_todo.py`; re-run after any timeline change): every scene's time range, what to draw, what to
  reuse from ep01-ep08, what is new, its marks and lines (with times); the poses; the choices made where the script was unclear.
- **Checks**: `qa/p1_check.jpg`, `qa/p2_check.jpg` (placeholder stills at every scene start and middle and after every key word, verdict and
  tick: 65 + 60 frames): no page errors. No video rendered.

### What Stage 2 (drawing) must draw
Sets: the void deck of an HDB block (+ long-shadow version), the playground beside the block. Props: OUR TEST STAND (clamp, hanger, flat
weights, mat, counter pills WEIGHTS: n), paper strip and fabric strip (whole / torn / magnified edges), the two-bar chart, the fabric school bag,
the board OUR 3 TESTS (replace `board3`), a stainless-steel cup and a glass cup (whole / broken), the DROP BOX, an adult's gloved hands, the
safety card, the rubber band (loop / half / twist) and the ice-cream stick (straight / bowed / cracked / two pieces) on a tray, the trays
FLEXIBLE (green) and RIGID (blue), rubber-tile and ceramic-tile boards, three tubes with clamps and weights, Momo's notes on an easel, the five
property tiles, the EP10 dare boards (spoon in a tub of water; a giant metal ship). Five look-closer arts (`paperArt`, `pullArt`, `dropArt`,
`bendArt`, `tubesArt`). Two journeys (inside a fabric bag's weave; a rubber band at a chicken rice stall). Two hidden animals, cute and alive:
the spider on its thread by the letterboxes, the caterpillar on the slide's handrail. Reused: EP8's THE 7 MATERIALS board and the two dare boards.

## Stage 2 (Fable): draw the scenes in `SCENES_TODO.md`
- Stills: `PART=1|2 ./sheet.sh name cols t1 t2 ...` -> `qa/name.jpg` (prints page errors). Draw one expression: `node probe.js out.jpg 1 '<js>'`.
- Bake a static set: `NODE_PATH=$(npm root -g) node bake.js <name>` (writes `bg/<name>.png` and `bg/manifest.js`).
- After any change to `script.py`: `/home/user/heart-tts/venv/bin/python make_voice.py`, `python3 build_tl.py 1` and `2`, `python3 make_todo.py`;
  after any change to a cue: `node dump_cues.js P && node song.js P`.
- Then write progress/ep09.json (pct 75, "Stage 2: drawing done (Fable)", next "Stage 3: render (Opus)").

## Stage 3 (Opus): `./build_part.sh P` (timeline, cues, song, `flock /tmp/explained_render.lock node render.js P 3`, `finish.sh P`)
- Output `ep09_partP.mp4` (ignored), `ep09_partP.srt`, `sheet_partP.png`; check stills around every swap, card, look-closer and reveal.
- Thumbnails as EP8 (`thumb_still.js` + `thumb.js`; script section 7: Part 1 "PAPER vs FABRIC" / "WHICH ONE TEARS?", Part 2 "SNAP IT" /
  "OR BEND IT?").
- Upload with `production/youtube/explained_upload.py ep09/upload.json` (Made for Kids, public, both playlists after EP8 Part 2
  rfRyqc4PLXQ). **No `retire_old`: EP9 replaces no old video** (teacher, 21 Nov).
- Status: see ../progress/ep09.json
