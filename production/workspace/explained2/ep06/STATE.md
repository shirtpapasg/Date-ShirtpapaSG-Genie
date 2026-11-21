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

## Finished (21 Nov 2026): rendered, NOT uploaded (the teacher decides after the comparison with Fable's clips)
- Part 1 `ep06_part1.mp4` 5:10.27, Part 2 `ep06_part2.mp4` 5:14.30; both 1920x1080 30 fps, -16.0 LUFS; `.srt`, `sheet_part1.png`,
  `sheet_part2.png`, `thumb_part1.jpg`, `thumb_part2.jpg`, `upload.json` (playlists after 2WuoSmh7xWY, replaces sO31eHgDCGI, retire_old).
- Comparison moments: P1 cold open 0:00.00-0:07.00 (the callback and title end 0:19.57); P1 "Be a scale!" 3:21.28-3:55.32 (the shrink itself
  3:25.28-3:52.32); P2 ending, read-along to the end of the outro, 4:49.91-5:14.30 ("Now you know!" 5:02.95).
- After the finish: the buddies' name tags are hidden from the "Now you know!" shout on (no text in the bottom fifth of the outro;
  common.js nykScene), and the fruit bat hangs from the board's corner in Part 2's ending. Last chunks of both parts re-rendered.
- Checks: count-in onsets measured on the mix 1.000/0.999 s apart, the blast on "know"; "Say it with me!/us!" then 0.8 s; no EP6 line
  needs sg_pron (no "live").
- Stills of the monitor: qa/still_monitor_p1_3m00s.jpg (Part 1 3:00.5), qa/still_scale_journey_p1_3m36s.jpg (Part 1 3:36.5).

## 21 Nov 2026: the Fable redraw (the teacher chose Fable's clips). READY FOR STAGE 3 (render and final checks: Opus). Nothing rendered, nothing uploaded.
The .mp4 / .srt / sheet_part*.png in this folder are the OLD Opus render: they no longer match the timelines. Stage 3 must re-render both parts.
- New files: `fable_art.js` (animals and props: snake, terrapin, crocodile, sea turtle, fruit bat, cat, macaque, grasshopper (side), squirrel, the plain
  thermometer `thermoF`, blinking eyes `eyeF`, the hidden-animal bush icon), `fable1.js` (shared pieces + Part 1 scenes), `fable2.js` (Part 2 scenes).
  They load after p1.js / p2.js (page.html): a scene defined there REPLACES the one of the same name in p1.js / p2.js / shrink.js. beasts.js keeps
  the old names and hands over to fable_art.js. `gardens.js`: the lake set now has the Bandstand, lily pads, the warm rock (ROCKW), heliconias.
- Replaced scenes. Part 1: cold, callback, goals, waitw, shrink, pullout, mark2, kwrecap (+pictures), nyk. Part 2: recap, lasttime, goals, waitw,
  shrink, reveal, warm, dare, kwrecap (+pictures), nyk. Every other scene is the earlier build with the new set and the new animals in it.
- The teacher's notes of 21 Nov, all applied:
  - Journeys: BE A SCALE = the beaded water monitor from behind, the YOU magnifier window, PLACE / LIZARD thermometers, the warm rock, the lake;
    the cold-blooded card is the cream book card (tab MARK SENTENCE 2 of 2, footer "From your book") with the YOU thermometer that stays the same.
    BE A HAIR = the same language on a fruit bat's back: AIR falls, BAT stays the same; the baby bat drinks milk.
  - Part 2 ending: read-along with pictures, the NEXT TIME dare card (mould / yeast, cards 1 Mould, 2 Yeast; words unchanged), the outro with
    MAMMAL / MAMMAL / REPTILE tags and the lizard on its rock (no board). Part 1 outro: the board is centred in the free space, 30% taller.
  - Part 2 opens with the calm recap (rulebook 2): three held pictures with one label each under Heart's "Last time" line. script.py: the recap
    scene is 1.2 s (was 4.0), and 1.1 s of picture-only time follows Basil's line.
  - Goals read aloud (rulebook 11.3): new lines e5g0-e5g3 (Basil) and f3g0-f3g3 (Pip); `goalsRead()` lifts and lights each card as it is read.
  - Mark Sentences are read by the buddy who says "Say it with me!": e608 Momo, e1202 Basil, f605 Pip, f1203 Momo (re-recorded, same words).
  - Lock-ins: `lockN` takes `clue(t)`, drawn on top of the ring frame for the whole countdown (Part 1 Round 2's "dry and scaly").
  - Animals cute and alive: bright blinking eyes, breathing, tails, ears, tongues (fable_art.js; the monitor's eye in beasts.js).
  - The hidden animal: Part 1 the grasshopper (it hops from its grass blade onto the lamp post during HOLD ON!), Part 2 a plantain squirrel on the
    palm trunk by the lamp. Re-recorded: e301, e1302, f301, f1302. Rules icon: a bush with two eyes, "Can you spot it?". The "chek" cues are gone.
- Timelines rebuilt (`python3 build_tl.py 1|2`): Part 1 = 5:13.3, Part 2 = 5:18.8. Part 2 is over the 5:15 guide because of the new read-aloud
  lines; nothing was cut. If it must come down, the script's own cut order is: "Six animal groups!", the chant's all-together bar, "Pip and I are mammals!".
- Sound: sound_cues.js / p2cues.js updated (goal pops on the new lines, the recap's clacks became three soft pops, no "chek"). `node dump_cues.js P`
  runs clean (234 / 236 events). The mixes in out/ are OLD: `./build_part.sh P` rebuilds timeline, cues, song, picture and mux. Delete out/chunks_p1
  and out/chunks_p2 first (every chunk changed).
- Thumbnails (new): thumb_part1.jpg, thumb_part2.jpg (`node thumb_still.js N t qa/th/fN.png "&thumb"`, then thumb.js; frames THUMB1 / THUMB2 in fable1/2.js).
- Checks: qa/sheet_p1_fable.jpg, qa/sheet_p2_fable.jpg (a still in every scene), qa/f1a-c.jpg, qa/f2a-c.jpg (swaps, cards, the journeys).
  Stills: qa/still_scale_journey_fable_p1_3m46s.jpg, qa/still_hair_journey_fable_p2_1m11s.jpg, qa/still_hair_baby_milk_fable_p2_1m18s.jpg.
  No motion test was rendered: Stage 3 should watch both journeys, the cold open (the spider's drop) and the splash in motion.
- To stretch a segment for slower pacing: add ("wait", s) or raise "post" in script.py and rebuild; every scene hangs on marks and word times.
- upload.json: the descriptions still say "lizard" for the hidden animal if they mention it; check before any upload. A human must listen first.

## 21 Nov 2026: Stage 3 (Opus): rendered, checked, LIVE
- Part 2 cut (script section 6 order; the recap is now required by the rulebook, so it stays): the chant's all-together pass (bars 6-8, -5.4 s).
  voice/c1103 trimmed to 6 bars (full take kept in out/c1103_full/), make_voice.py SLOTS/NBARS updated, sound_cues.js skips the all-together pop when
  there is none. "Six animal groups!" and "Pip and I are mammals!" kept (not needed). Recap untouched: pictures 0-5.1 / 5.1-9.8 / 9.8-12.8 s, each labelled.
- ep06_part1.mp4 5:13.37, ep06_part2.mp4 5:13.47; both -16.0 LUFS, 0 page errors; new .srt, sheet_part1/2.png, check stills qa/stage3_p1.jpg, qa/stage3_p2.jpg.
- Checks: "Say it with me!/us!" -> 0.96 s -> the buddy reads (timeline); count-in onsets 1.005/1.000 s (P1) and 1.000/1.000 s (P2) on the mix, blast on "know";
  P1 Round 2 clue "dry and scaly" above the ring at +0.6 and +4.6 s; outro 5.2 s (P1) / 4.8 s (P2) after the shout; reveal "Did you spot the hidden animal?".
- Uploaded: Part 1 n_NzfK47Sgc, Part 2 NpkenGlnOVQ; both playlists after 2WuoSmh7xWY; sO31eHgDCGI out of the playlists, description points to Part 1.
- Render chunks deleted after the upload.

## 21 Nov 2026: v2 patch (teacher: "Heart no longer shares what animal to find" + the orphan YOU tag), LIVE
- New rule (SERIES_FORMAT "The hidden animal"): Heart names it at the start with a small picture. Re-recorded ONLY e301 / f301
  ("A little grasshopper / squirrel is hiding in this video. Can you spot it?") and e1302 / f1302 ("Did you spot the grasshopper? It was on the
  lamp post! Is it an insect? Tell someone at home." / "Did you spot the squirrel? It was on the palm trunk! Is it cold-blooded, or warm-blooded?
  Tell someone at home."). Old takes kept in out/live/voice/.
- Rules scene (common.js gameScene(t, s, L, full, an, pic) + hidPic): on the animal's name the paper disc shows hopperF / squirrelF (fable_art.js,
  moving and blinking) for 1.5 s, then the bush with two eyes pops in, then "Can you spot it?". Sound cue "curious" now on the animal's name.
- Part 1 outro: no YOU tag (no orphan labels): nykScene(t, s, prop, { you: false }) in fable1.js. Part 2 keeps YOU over the lizard.
- Each re-recorded line's length change was snapped to whole frames with its "post" in script.py (+6, -27 frames in Part 1; -2, -33 in Part 2),
  so only the changed spans were rendered (out/patch_v2.sh) and spliced between untouched spans of the live render with ../kit_resplice.sh
  (segment muxer at the 300-frame keyframes; the concat demuxer's inpoint/outpoint let extra frames through, do not use it).
  Spans: P1 20-30.2, 260.2-279.3, 299.3-end; P2 20-29.93, 259.93-278.83. Every seam checked frame-identical to the live render (PSNR inf).
- ep06_part1.mp4 312.63 s (9379 frames), ep06_part2.mp4 312.30 s (9369 frames); both -16.0 LUFS; new .srt and sheet_part*.png.
  Check stills: qa/fix_p1_rules.jpg, qa/fix_p2_rules.jpg (page), qa/v2_p1_checks.jpg, qa/v2_p2_checks.jpg (from the final files).
- Uploaded with upload_v2.json (same titles, descriptions, tags, thumbnails; after arTMOT9X1iE; replaces n_NzfK47Sgc, NpkenGlnOVQ, retire_old):
  Part 1 https://www.youtube.com/watch?v=fNZuqF2zDww , Part 2 https://www.youtube.com/watch?v=Ojuq9XJI66E . Old ones out of both playlists, public,
  pointing to the new Part 1. Render spans deleted after the upload.
