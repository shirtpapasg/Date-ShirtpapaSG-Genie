# EP8 build state (for a resume after a restart)
P3 EP8 "What's your snack box made of? The 7 materials": Part 1 "This Jar Was Once SAND! What Are Things Made Of?" (object and
material; glass, metal, plastic, ceramic) and Part 2 "Your School Shoe Came from a TREE? The 7 Materials" (wood, rubber, fabric;
count the parts; all seven). The script: `../p3_ep08_script.md` (Part 1 Segment 2 as updated on 2026-11-20 to open from EP7's dare).

Three stages: **Stage 1 (setup, done 2026-11-20)** · Stage 2: Fable draws the scenes (`SCENES_TODO.md`) · Stage 3: render.

## Stage 1: done
- Engine copied from `ep05/` (no `out/`, no mp4/wav, no EP5 voices). EP5's scenes are gone: `wetland.js` removed, `shrink.js` keeps
  only the generic journey helpers, `p1.js` / `p2.js` rewritten. `bg/wetland.png` removed.
- `script.py`: both parts as data, every line word for word (checked against the script's tables; a few long cells are split into
  consecutive lines). `CUTS` holds the script's section 6 cut tags (none used).
- Voices (`voice/`, 126 lines + chant + unisons): `/home/user/heart-tts/venv/bin/python make_voice.py` keeps finished files and
  re-records only lines whose text or voice options changed. The new pace as EP6: Heart speed .90, .5 s between sentences; a
  sentence with a new term (opts `term`) x.93 slower and >= .65 s after it; the journeys .85, 1.0 s between sentences, 2.5 dB softer;
  buddies (Character Voice Kit) x.88. Chant: BAR 1.8 s, one name per beat, 9 bars (3 call + 3 YOUR TURN! + all together).
  Not aligned (spread by length, fine for one word): hk_object, hk_material.
- Timeline: `python3 build_tl.py 1|2`. New in EP8: `kw` word marks, `("hold", mark, 2.0, .6)` (a new term holds 2.0 s; Heart waits
  >= .6 s), `hold` 3.5 s for cream book strips, `holdw` for the kiln word strip. lib.js `KWHOLD` = 2.0 (was 1.5); Mark Sentence cards
  hold 2.5 s (the timeline's waits).
- **Lengths (Stage 1): Part 1 5:09.0 (309.0 s), Part 2 4:56.3 (296.3 s).** (Now: see Stage 2b.)
- Sound: `sound_cues.js` -> `node dump_cues.js P` -> `node song.js P` -> `out/mix_pP.wav` (both done, -16.0 LUFS, no missing sounds).
  New: canteen ambience (`R.canteen`, sau sfx `ep05_kids.wav`), library one-shots (`sfx`: hiss, flame_roar, hum, gurgle, squeeze,
  press), synth boing / tok / bubble / pomf / cloth / baa / twang.
- `materials.js`: the board data `MAT` (book order, stamp colours, source slots), `tileFull()`, the material-name pops `NAMES` +
  placeholder `namePop()` (2.0 s, hop to `BOARD_AT`), `wboard` and `magnifier` (kept from EP5), and `phScene()` (the Stage 1 placeholder).
- `p1.js` / `p2.js`: shared routines wired (game, goals, countdown, round cards, lock-ins with cards/picks/reactions, Mark Sentences,
  score hand, scores, read-along, chant, "Now you know!"); every new-art scene is a `phScene` placeholder naming what to draw.
- `SCENES_TODO.md` (generated: `python3 make_todo.py`; re-run after any timeline change): every scene's time range, what to draw,
  what to reuse from ep01-ep06, what is new, its marks and lines; the poses; the choices made where the script was unclear.
- Checks: `qa/p1_check.jpg`, `qa/p2_check.jpg` (placeholder stills, no page errors). No video rendered.

## Stage 2: done (2026-11-21). Every scene is drawn; no `phScene` placeholder is left in `p1.js` / `p2.js`.
- New files: `canteen.js` (BG.canteen, BG.stall = the noodle stall close, BG.under = under the table, all baked in `bg/`; the three
  containers, spoon, sand pile, ceramic bowl and soup spoon, clay lump, pencil, the white canvas school shoe with its four parts that
  light up, the folded T-shirt and its weave, the white-drops disc, the school bag; THE 7 MATERIALS board `board7` / `boardAt`; shared
  helpers `pline`, `ltag`, `kindTag`, `sPip`...), `pics.js` (27 picture-board drawings `PIC.*`, the cow / tree / rock card drawings),
  `probe.js` (draw any expression: `node probe.js out.jpg 1 '<js>'`). `shrink.js` holds both journeys. `page.html` loads them.
- Changed in the shared files: `materials.js` (`tileT(k)`: a tile fills when its popped name lands on it, never before; `namePop`
  redrawn: one low hop to the tile's top edge, a small copy for the shelf words), `sound_cues.js` (the tile stamp uses `tileT`, so the
  stamp for GLASS, METAL and PLASTIC is 0.55 s later than in Stage 1's mix: **re-run dump_cues + song**, which `build_part.sh` does),
  `trail.js` (`ansCard` takes `o.icon`), `common.js` (`lockN` passes `c.icons`; `bookCaption` takes `o.keys` to highlight words),
  `lib.js` (SAP pops at [1480, 850], size 100, under the card's right corner).
- Checks: stills at every scene start and end and round every mark in both parts (460 frames): no page errors. Contact sheets
  `qa/p1_sheet.jpg`, `qa/p2_sheet.jpg`; the journeys `qa/journey_sand.jpg`, `qa/journey_sap.jpg`. Thumbnails `thumb_part1.jpg`,
  `thumb_part2.jpg` (frames `qa/th/f1.png`, `f2.png`; commands as in EP5: `node thumb_still.js N 1 qa/th/fN.png "&thumb"`, then
  `node thumb.js qa/th/f1.png thumb_part1.jpg 1 "THIS JAR" "WAS ONCE|SAND!" 250 170 150` and
  `node thumb.js qa/th/f2.png thumb_part2.jpg 2 "YOUR|SCHOOL SHOE" "CAME FROM|A TREE?" 190 140 132`).
- **No video was rendered in Stage 2** (not even a test clip): motion was judged from stills only. Stage 3 should watch the two
  journeys, the board's slide-in, the name hops and the camera drop in the cliffhanger in motion.
- Deviations from the script are listed in the Stage 2 report (hand-over); the main ones: the spoon's two tags (OBJECT / MATERIAL)
  appear under Mark Sentence 1, not in the spoon scene (the MATERIAL pop fills that scene's last 2 s); the white-drops close-up in
  Part 2 Round 1 is the ring picture, not a pop beside the shoe; Part 2's table holds a pencil, the shoe and the T-shirt; Part 1's
  lizard is on the classroom window beside the noodle stall (seen in the Round 2 ring picture); a small round inset of the shoe
  shows where "you" are in the last stop of the sap journey.
## Stage 2b: done (2026-11-21). The teacher's 21 Nov rules (SERIES_FORMAT 1b, 2, 4, 6, 7, 11) are in. Ready for Stage 3.
**Lengths now: Part 1 5:45.2 (345.2 s), Part 2 5:24.0 (324.0 s).** Both are over the 5:15 guide because of the seven look-closer moments (never
cut for length). Already cut (script section 6, non-teaching): "Now, the metal box.", "And the plastic box.", the waits for the "uses" boards
after GLASS and RUBBER (the boards still show). What could still go, in order: Part 1: Basil's biscuit joke `g1006` (4.9 s; he then has 6 lines
to Pip's 8), the cold open down to 4 s (2 s), the spoken describing lines of the metal and plastic look-closers `g1011` / `g1012` (11 s; the
zoom would then run under the book sentence only). Part 2: the chant's all-together bar (`CUTS` "together", 5.4 s; `make_voice.py` re-makes
the chant), `j405` "Look closer at this tree trunk." (2 s). No teaching line was cut.
- **LOOK CLOSER (new file `closer.js`, loaded after common.js; scenes `lc*` in `script.py`, all in lib.js `SHELF_HIDE`).** One frame for all:
  `lookCloser(t, s, o)`: the scene before is drawn without its HUD (`lcSet`, `window._noHud`) and pushed in on the thing, the set dims, a large
  close-up window opens from that point, a LOOK CLOSER tag, plain label lines (`lcLab`), the book sentence on the cream strip (`lcStrip`), a slow
  push-in all the way, ONE verdict tag (`lcVerdict`) at the `v_*` mark. No score, no shelf, no buddies.
  | Scene | Part, time | Close-up held | What is shown | Heart | Verdict |
  |---|---|---|---|---|---|
  | `lcglass` | P1 2:47-2:59 | 10.5 s | a furnace cut open: the sand heats, glows, melts, then clears; thermometer | g904 + g905 (book: "When sand is heated until it is very hot, it melts and becomes clear.") | GLASS: melted sand |
  | `lcmetal` | P1 3:07-3:19 | 9.4 s | the rock under a magnifying glass: shiny bits | g1011 + g1002 (book) | METAL: dug up from the ground |
  | `lcplastic` | P1 3:27-3:41 | 12.0 s | oil pours into the factory machine; plastic boxes come out | g1012 + g1005 (book) | PLASTIC: made from oil |
  | `lckiln` | P1 4:33-4:43 | 9.4 s | the kiln cut open: a finger dents the soft clay bowl; in; fire (speeded up); out, hard | g1113 + g1114 (book: "Heating hardens ceramic, but it can break easily.") | CERAMIC: clay, baked hard |
  | `lcwood` | P2 0:33-0:43 | 8.9 s | a trunk sawn into planks (speeded up); the plank's lines; the bench with the same lines | j405, j403, j406 | WOOD: from the trunks of trees |
  | `lcsap` | P2 1:53-2:03 | 9.0 s | bark close: the thin cut, white sap runs and drips into the cup (cut open, speeded up); AT THE FACTORY sap -> rubber -> sole | j705, j706 | RUBBER: from the sap of a tree |
  | `lcfabric` | P2 2:21-2:30 | 8.0 s | the T-shirt's weave: one thread followed over, under, over, under | j811 | FABRIC: woven threads |
- **Hidden animals, named by Heart at the start with their picture** (`HIDDEN`, `hiddenBadge` in pics.js; "a little sparrow" / "a little sheep",
  *Can you spot it?*): Part 1 the **sparrow** on the classroom window sill beside the noodle stall (from Round 2's ring to the kiln; it bobs,
  pecks, flicks its tail), reveal `g1202`. Part 2 the **sheep** (wool; Basil's "like a sheep!") grazing in the field of the "trees" picture board
  (`PIC.treesS`, in `trees`, the look-closer's field and `paper`; it walks, chews, flicks an ear), reveal `j1102` "It was in the field, beside the
  trees!" with a ring on the board (`SHEEPXY`). The ant under the bench is gone (`lizUnderBench` is unused). Lines re-recorded: g301, g1202, j301, j1102.
- **Already in from the 04:30 pass, checked again:** the calm recap in Part 2 (`lasttime`: three pictures, 3.3 / 4.1 / 2.7 s, a label each, under
  "Last time..."); Part 1 opens on EP7's dare on the live table (no montage). Goal cards read aloud (Pip in Part 1, Basil in Part 2; each card
  lifts and glows, then a tick). Mark Sentences read by the buddy who says "Say it with me!" (Pip, Basil · Basil, Momo; 0.8 s pause, 2.5 s hold).
  Lines by buddy: Part 1 Pip 8, Basil 7 (most words), Momo 2; Part 2 Basil 11, Momo 5, Pip 4.
- **Lock-ins:** the ring's clue tag sits on top of the ring and stays to the end (`lockN` `c.tag` / `c.labels`); a long question is drawn smaller
  so it clears the bell ("Where do the white drops come from?").
- **Layout fixes:** "Now you know!": the YOU tag stands with two cheering hands (EP7's `nykScene`, `{ bx, hx }`), props between the discs;
  the score-hand board and the chant board no longer touch a disc; the dare's cards are wider (no clipped words) and its small print sits under
  them; the metal book strip clears the shelf.
- **sg_pron:** `make_voice.py` now sends every Heart and buddy text through `../sg_pron.py` (EP7's `_FixK`). No EP8 line has a listed word.
- **Voice:** only changed lines were recorded (15: g301, g904, g905, g1011, g1012, g1113, g1114, g1202, j301, j405, j406, j705, j706, j811, j1102);
  look-closer describing lines at Heart .87 with .6 s between sentences (`LC` in script.py). All aligned.
- **Sound:** `sound_cues.js` has the look-closer cues (a soft whoosh in, the thing's own sounds, the stamp + a chime on the verdict; the calm bed
  under them); `cues_p*.json` and `out/mix_p*.wav` rebuilt, both -16.0 LUFS.
- **Checks (stills only, no page errors):** `qa/p1_sheet.jpg`, `qa/p2_sheet.jpg` (a frame every 3 s), `qa/lc_p1.jpg`, `qa/lc_p2.jpg` (the seven
  look-closers as strips), `qa/journey_sand.jpg`, `qa/journey_sap.jpg`, `qa/recap_p2.jpg`. `SCENES_TODO.md` regenerated (`make_todo.py`).
  `../p3_ep08_script.md`: an update note at the top, **[LOOK CLOSER]** rows, the hidden animals, the new sentences in section 10 D.
- **Deviations from the script (beyond the above):** the kiln's bowl no longer hops back to the counter (it comes out in the look-closer;
  "It can break easily" is now the book's sentence, spoken, plus the tag); "The trunks are cut into long, flat planks." is said inside the wood
  look-closer; the weave disc shows only with the book sentence after the fabric look-closer; `paper` and `fabricb` are new scene names that
  reuse `SC.trees` / `SC.fabric`.
- **Stage 3, watch in motion:** each look-closer's push-in (the set zooms about the thing while the window opens from it) and its cut back out;
  the sand slumping as it melts; the magnifying glass sliding in; boxes on the belt; the finger denting the bowl, the bowl's hops in and out;
  the saw and the planks stacking, the plank rising, the bench sliding in; the sap running along the cut and the drops; the thread's head moving
  with "over, under"; the sheep's walk in the small picture (it flips when it turns); plus the items listed under Stage 2.
## Stage 3: `./build_part.sh P` (timeline, cues, song, `flock /tmp/explained_render.lock node render.js P 3`, `finish.sh P`).
- Stills: `PART=2 ./sheet.sh name cols t1 t2 ...` -> `qa/name.jpg`. Bake backgrounds: `node bake.js <names>`.
- Status: see ../progress/ep08.json

## 21 Nov 2026: Stage 3 (Opus): rendered, checked, LIVE
- Rendered with `./build_part.sh 1|2` (10 s chunks kept in `out/chunks_p1`, `out/chunks_p2`; a patch re-renders only the chunks it touches).
  `ep08_part1.mp4` 349.63 s (**5:49.6**), `ep08_part2.mp4` 327.13 s (**5:27.1**); 1920x1080 30 fps; both -16.0 LUFS, true peak -1.1 / -1.2 dBFS;
  0 page errors. Captions `ep08_part1.srt` (152 cues), `ep08_part2.srt` (158 cues); contact sheets `sheet_part1.png`, `sheet_part2.png`.
  Lengths grew by 4.4 s / 3.1 s from Stage 2b only because the seven look-closer verdicts now hold 2.5 s (see below). Nothing was cut.
- Checked (frame strips from the rendered chunks, `qa/m/`; stills `qa/s2a-l.jpg`; final-file checks `qa/stage3_p1_fixes.jpg`, `qa/stage3_p2_fixes.jpg`):
  board slide-in at 0:03 (Part 1); sparrow / sheep named by Heart at the start with their picture and "Can you spot it?"; goal cards read by
  Pip (P1) / Basil (P2), each lifting with a tick; Mark Sentences read by the buddy who said "Say it with me!" (Pip, Basil · Basil, Momo);
  lock-in clue tags on top of the ring, kept to the bell; calm "Last time" recap (three held pictures, one label each, a "Part 1" tag);
  sand journey (scoop, furnace, grains melt, mould, cool, clear, "You are glass"); sap journey (inside the tree, the cut, the run, the cup,
  rollers, the sole); every look-closer push-in (set zooms and dims, window opens from the thing) and its cut back out; glass: sand glows,
  slumps, melts, clears, thermometer; metal: magnifier slides in, shiny bits; plastic: oil in, boxes ride the belt; kiln: finger dents the soft
  bowl, bowl hops in, fire (speeded up), hops out hard; wood: saw (speeded up), planks stack, one plank rises, the bench slides in under it with
  the same lines; rubber: white sap runs along the cut, drips, the cup fills, AT THE FACTORY sap -> rubber -> sole; fabric: the teal thread goes
  over / under in time with Heart's words; the sheep walks / flips in the small picture and is large in the wood look-closer (about 10 s), so it
  is findable; reveal rings sit on the sparrow / sheep; name hops to the tiles; cliffhanger camera drop (board lifts, under the table to the bag and
  shoe, "PART 2"); count-in onsets measured on the files 1.00 s apart (P1 341.40 / 342.40 / 343.39, P2 318.89 / 319.89 / 320.89, within 7 ms
  of the timeline); look-closer sound cues sit at speech level (whoosh / stamp + chime about -14 to -17 dB RMS against speech -16).
- Fixed (small, local; only the touched chunks re-rendered):
  - The seven look-closer verdict tags showed only 1.3-1.5 s before the hard cut back out: every `v_*` wait in `script.py` is now 2.5 s
    (teacher's priority: a stronger look-closer). This is the only length change.
  - P1 Round 1 lock-in had no clue tag on the ring: `tag: "a pile of sand"` (p1.js SC.r1).
  - P1 glass look-closer: the verdict covered "Only in a factory!": the safety tag moved right (closer.js glassArt, `TX + 120`).
  - P2 wood: the pencil was cut off at the left edge when Heart says "your pencil": `CAMB` centre 420 -> 375 (p2.js).
  - P2 wood look-closer: the planks board slid in at the frame edge during the push-in: it now slides in when we cut back out (`SC.trees` tB =
    `SCN.paper.t0 + .1`).
  - P2 Showdown: Momo's pick card was hidden behind Basil's disc: Basil 420 -> 520, his card 540 -> 640, his bubble 560 -> 495 (tail on him,
    no longer over Pip's notes).
  - P2 sheep reveal: "Where does wood come from?" / "Tell someone at home!" sat on top of the big 7 MATERIALS board (over the WOOD tile) and the
    board ran off the right edge: the reveal now replays the set without the board (`view2` with teach2's camera, so the ring stays on the sheep).
  - Captions: a sentence split into two cues overlapped by 0.25 s; `finish.sh` now ends each cue before the next one starts (0 overlaps).
- Thumbnails `thumb_part1.jpg`, `thumb_part2.jpg` read well (title words large on the bright side, PART pill, surprised buddy); unchanged.
- Uploaded with `upload.json` (Made for Kids, public; both playlists after PBoXgjYIun4 = EP7 Part 2; replaces D9NxEvJuneI, retire_old: it stays
  public, out of both playlists, its description's first line points to Part 1):
  Part 1 https://www.youtube.com/watch?v=5-JcNGeLviE , Part 2 https://www.youtube.com/watch?v=rfRyqc4PLXQ .
- Left for the teacher: both parts are over the 5:15 guide (5:49.6 / 5:27.1) because of the look-closers (never cut); the next cuts, if wanted,
  are listed under Stage 2b. During the wood look-closer's 1 s push-in the book strip "Wood comes from the trees..." zooms off the top edge
  (camera motion, not fixed). The outro discs touch the frame edges as in EP7. A human should listen once.

## On resume (teacher, 21 Nov)
Before Stage 3, apply the 21 Nov rules in SERIES_FORMAT.md, especially section 1b LOOK-CLOSER: each material gets a slow zoom-in on the real thing with the evidence shown (sand melting, clay in the kiln, sap from the cut), held 6-10 s, Heart describing what we see, one verdict tag. Also: Heart names the hidden animal at the start; no orphan labels.
