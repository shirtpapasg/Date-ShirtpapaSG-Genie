# EP6 build state (for a resume after a restart)
P3 EP6 "Count the legs! Insects, reptiles and mammals (Part 2 of the animal groups)": Part 1 "Is a Spider an Insect? COUNT the Legs!" and
Part 2 "Is a Bat a BIRD? How to Spot a Mammal". Script: `../p3_ep06_script.md` (autopilot). Engine copied from ep05/.
- Teacher's rules of 20 Nov applied: Heart speed .90 with .5 s between sentences (a sentence with a new term x.93 and at least .65 s after);
  buddies 12% slower; key words hold 2.0 s; Mark Sentence cards hold 2.5 s; parts up to about 5:15; Basil speaks at least as much as the others
  (two Basil lines added in Part 2: f702b "And I'm the reptile. No fur for me!", f908b "Scales, not fur. The odd one out is me!").
- Teacher's note on reptiles from behind (refs/monitor_back, gitignored): the monitor is a Malayan water monitor: long low narrow head on a long
  thick neck, heavy body, push-up legs with long claws, long paddle tail, fine bead scales, dark grey-brown with rows of small pale spots.
  `beasts.js` monitor() (side view) and `shrink.js` backView()/myScale() (the journey) follow it.
- Script as data: `script.py`. Voices: `voice/` (`/home/user/heart-tts/venv/bin/python make_voice.py`; keeps finished files). f502 was placed by
  sentence (`venv python fix_align.py f502`) because pocketsphinx could not align it; re-run that after re-recording f502.
- Timeline: `python3 build_tl.py 1|2`. Part 1 = 5:10.3, Part 2 = 5:15.1 (before any trims).
- Picture: `gardens.js` (BG.lake, BG.lakedusk, BG.palmvalley, palms, rain tree, lamp post, gazebo, the little house lizard), `bugs.js` (ant,
  spider + web, grasshopper/mosquito/butterfly from above, moth, pigeon), `beasts.js` (water monitor, snake, turtle, crocodile, eggs, thermometer,
  fruit bat, macaque, cats, sea turtle, bread mould, yeast), `six.js` (the six-tile board, lakeView, macro backgrounds, tags), `shrink.js` (be a
  scale; be a hair), `p1.js`, `p2.js`, `common.js` (unchanged EP5 routines). Bake backgrounds: `node bake.js lake lakedusk palmvalley`.
  Asset sheets: `QS="&test=bugs|beasts|bats" node stills.js qa/_t_x 1` (tests.js).
- Sound: `sound_cues.js` (Part 2 cues in p2cues.js) -> `node dump_cues.js P` -> `node song.js P` (new sounds: xylo, splash, bubble, shine, warm,
  flick, breath, flutter, whine, flap, purr, heart, milk).
- One part end to end: `./build_part.sh P`. Chunks kept in out/chunks_pP/ (delete the ones a change touches).
- Stills: `PART=N ./sheet.sh name cols t1 t2 ...` -> qa/name.jpg.
- Thumbnails: `node thumb_still.js N 1 qa/th/fN.png "&thumb"` then `node thumb.js ...` (see ep05/STATE.md).
- Upload: `upload.json` is written; DO NOT run the uploader (the teacher decides after the comparison with Fable's clips).
- Status: see ../progress/ep06.json
