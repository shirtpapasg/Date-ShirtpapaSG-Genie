# EP5 build state (for a resume after a restart)
P3 EP5 "Feathers, scales or moist skin? Animal groups (Part 1)": Part 1 (animals, outer coverings, observable characteristics, amphibians) and Part 2 (birds, fish, the mudskipper).
- Engine copied from ep03/. Script as data: `script.py` (the script in words: `../p3_ep05_script.md`). Voices: `voice/` (done; `/home/user/heart-tts/venv/bin/python make_voice.py` keeps finished files and re-records only changed lines).
- Timeline: `python3 build_tl.py 1|2`.
- Picture: `wetland.js` (the Sungei Buloh set `BG.wetland`, `wetView`, every animal, the cover swatches), `shrink.js` (the two first-person journeys: be the frog, be the mudskipper), `common.js` (shared routines), `p1.js`, `p2.js`. `trail.js` holds the spotter card (`trailCard`, three stamps). Bake backgrounds: `node bake.js wetland stage stage2 daystage`.
- Sound: `sound_cues.js` -> `node dump_cues.js P` -> `node song.js P`.
- One part end to end: `./build_part.sh P` (timeline, cues, song, `flock /tmp/explained_render.lock node render.js P 3`, `finish.sh P`). 10 s chunks are kept in `out/chunks_pP/`; to change one scene, edit, delete the chunks it touches, run `./build_part.sh P` again.
- Stills: `PART=2 ./sheet.sh name cols t1 t2 ...` -> `qa/name.jpg`.
- Thumbnails: `node thumb_still.js N 1 qa/th/fN.png "&thumb"` then `node thumb.js qa/th/fN.png thumb_partN.jpg N "WHITE|LINES" "YELLOW|LINES"`.
- Upload: `upload.json`, then `python3 ../../../youtube/explained_upload.py ep05/upload.json --check` and again without `--check`. EP5 goes after EP4 Part 2 in both playlists, so wait for the key `explained-p3-ep04-part2` in `production/youtube/explained_uploaded.json`.
- Status: see ../progress/ep05.json

## Finished (20 Nov 2026, ~20:00 UTC): LIVE
- Part 1 was already rendered (5:00.7); Part 2 rendered from the kept chunks (the three half-written `.part` chunks were removed first), 5:05.5.
  Both 1920x1080 30 fps, -16.0 LUFS; `.srt`, `sheet_part1.png`, `sheet_part2.png`, thumbnails. No fixes were needed.
- YouTube (public, Made for Kids): Part 1 https://www.youtube.com/watch?v=O1KiFUs7pkE , Part 2 https://www.youtube.com/watch?v=2WuoSmh7xWY ,
  in both playlists right after EP4 Part 2 (HCDeYV32P8w). Captions (.srt) not sent by the uploader.

## VERSION 2 (21 Nov 2026): the teacher's fixes. READY FOR STAGE 3 (render to `v2/` and upload: Opus). Nothing is rendered or uploaded yet.
The live films `ep05_part1.mp4` / `ep05_part2.mp4` (and their `.srt`, sheets) are untouched. **Render version 2 only with `EP_OUT=v2`:**
`EP_OUT=v2 ./build_part.sh 1` and `EP_OUT=v2 ./build_part.sh 2` -> `v2/out/chunks_pP/`, `v2/ep05_partP.mp4`, `v2/ep05_partP.srt`, `v2/sheet_partP.png`
(`render.js` and `finish.sh` read `EP_OUT`; without it they would overwrite the live files). Timelines, cues and `out/mix_pP.wav` are already rebuilt:
Part 1 = 5:05.5 (305.5 s), Part 2 = 5:09.2 (309.2 s), both -16.0 LUFS. No page errors on any still.

What changed (all seven notes):
1. **Every animal redrawn, cute AND alive**: new file `animals.js` (loaded after `wetland.js`, which no longer holds animals): frog, toad, salamander, kingfisher
   (collared), penguin, ostrich, duck, hen, fish (also cod, guppy), mudskipper, sea star, ant, spider. Buddy look (big glossy eyes, blush, smile, soft outline) on
   the true shape. Each one blinks, breathes and bobs by itself (`AT` = the frame's time, set in `main.js`), and has its action: `penguin({walk, flap})` waddles and
   flaps, `ostrich({step})` steps and bobs its neck, `kingfisher({spread, beat})` opens both wings, fish always swim, `mudskipper({push})` pushes on its front
   fins when it hops, the frog hops in Round Zero. The bird cards (Part 2, 0:59) are bigger; the WINGS card shows the kingfisher with both wings spread and beating.
   `node zoo.js qa/x.jpg <t> all|birds` draws every animal on one sheet.
2. **A buddy reads the goal cards** (`goals3` in `common.js`): Pip in Part 1 (`g100`-`g103`, 1:00.1-1:07.0), Momo in Part 2 (`g200`-`g203`, 0:12.3-0:18.6);
   word for word, about 0.4 s between cards; the card being read lifts and glows.
3. **The calm Part 2 opening** (`SC.recap` in `p2.js`, 0:00-0:11.7; the old `lasttime` scene is gone): picture 1, the frog on its leaf, "The frog: an amphibian" /
   "with moist skin" (about 5 s); picture 2, its skin close up, "Its outer covering: moist skin" / "an observable characteristic: we can see it" (about 3.5 s);
   then the new question, "Two more animals to spot!". Soft dissolves, a gentle push-in, no flashes. Heart's `b201` is the old recording, unchanged.
4. **Lock-ins**: `lockN` takes `clue(t)`, drawn on top of the ring frame and never removed (Round 2: fins, scales, gills).
5. **The hidden animal** is no longer the lizard: Part 1 a duck behind the boardwalk rail (from 3:50, to the end of Basil's rule), Part 2 the frog on a mangrove
   root (Showdown and "Fixed!"; its lily pad is empty meanwhile). Lines re-recorded (Heart, same recipe): `a302`, `b301` ("A little animal is hiding in this
   video. Can you spot it?"), `a1202`, `b1202` ("Did you spot the hidden animal? It was the duck, behind the boardwalk rail! / the frog, on a mangrove root!
   Tell someone at home."). The rules scene shows a "?" disc, never the animal.
6. **Mark Sentences are read by the buddy who says "Say it with me!"** (0.8 s pause before, 2.5 s hold after; the highlight follows the new voice):
   `a503` Pip, `a1003` Momo, `b413` Basil, `b504` Momo (buddy pace x0.88).
7. **"live" / "lives" = "leev"** (`sg_pron`, teacher 21 Nov). `make_voice.py` now speaks any line with a fixed word from the approved phonemes (Heart:
   `speak_line`; a buddy: the same phonemes in the buddy's voice) and marks its json `"leev": true`. Every EP5 line with "live" (all re-recorded):

| Part | id | Voice | Line |
|---|---|---|---|
| 1 | `a601` | Heart | Some animals live only on land, while some live only in water. There are also some animals that can live both on land and in water. |
| 1 | `a602` | Heart | Animals have different outer coverings as they live in different places. |
| 1 | `a801` | Heart | Round one. This frog sits on a leaf. Then, splash! It swims. Where can a frog live? One, only on land. Two, only in water. Three, both. Show me with your fingers. |
| 1 | `a803` | Momo | Two! It swims so well. It must live in water. |
| 1 | `a1003` | Momo | Amphibians are animals that can live both on land and in water. Amphibians usually have four legs. |
| 2 | `b408` | Heart | Birds live largely on land. Birds have beaks that enable them to pick up food. |
| 2 | `b502` | Heart | Fish are animals that usually live only in water. They have fins to help them swim in water. |
| 2 | `b802` | Heart | Mudskippers are special fish that can live on land as well as in water. |

   (`a1202` used to have "live"; its new wording does not.) The old takes of every replaced line are in `voice/_v1/`.

Checks: `qa/v2_p1.jpg`, `qa/v2_p1b.jpg`, `qa/v2_p2_open.jpg`, `qa/v2_p2_birds.jpg`, `qa/v2_p2_lock_hidden.jpg` (contact sheets); `qa/v2_zoo_all.jpg`,
`qa/v2_zoo_birds.jpg` (every animal); single stills `qa/v2_*_pN_*.jpg`. Before: `qa/v2_before_*.jpg`.
Still to do (Stage 3): render both parts with `EP_OUT=v2`, watch the penguin, ostrich and wing motion once in the film, LISTEN to the new takes (the "leev"
lines, the buddies' card readings), new `.srt`, `upload_v2.json`, upload. The thumbnails still use the frames `&thumb` (new animals: remake them with `thumb_still.js`).

## VERSION 2 LIVE (21 Nov 2026, Stage 3: Opus)
- Rendered with `EP_OUT=v2 ./build_part.sh 1|2` (the script takes `/tmp/explained_render.lock` itself around render and finish; do not wrap the
  whole script in the same lock, it would wait on itself). `v2/ep05_part1.mp4` 305.5 s, `v2/ep05_part2.mp4` 309.2 s, 1920x1080 30 fps, both -16.0 LUFS.
  New `v2/ep05_partP.srt`, `v2/sheet_partP.png`; check stills `v2/qa/p1_checks.jpg`, `v2/qa/p2_checks.jpg`. Render chunks deleted after the upload.
- Thumbnails: `node thumb_still.js N 1 v2/th/fN.png "&thumb"`, then `node thumb.js v2/th/f1.png v2/thumb_part1.jpg 1 "ONE GROUP" "OR THREE?"` and
  `node thumb.js v2/th/f2.png v2/thumb_part2.jpg 2 "THIS FISH|WALKS ON" "LAND!" 230` (same words and layout as v1; before/after: `v2/th/compare.jpg`).
- Checks passed (no re-render): "Say it with me!" -> buddy reading after 0.96 s (all four); goal cards read by Pip / Momo with the card glowing;
  Part 2 lock-in clues (fins, scales, gills) above the ring through the countdown; calm Part 2 recap; chant (Part 2) and key-word read-along (both);
  "One!", "two!", "Now you know!" 1.00 s apart with the blast (about +5 dB) on "know"; outro 5.6 s; hidden-animal lines generic, reveals duck / frog.
- YouTube (`upload_v2.json`, same titles, descriptions and tags as v1; the v1 descriptions never named the lizard): Part 1
  https://www.youtube.com/watch?v=M2PLrTN65vM , Part 2 https://www.youtube.com/watch?v=arTMOT9X1iE . Both playlists: EP4 Part 2 (HCDeYV32P8w) ->
  M2PLrTN65vM -> arTMOT9X1iE -> EP6 n_NzfK47Sgc -> NpkenGlnOVQ (checked). v1 O1KiFUs7pkE / 2WuoSmh7xWY left the playlists, stay public, and their
  descriptions start with "NEW VERSION" pointing to M2PLrTN65vM. Captions (.srt) not sent by the uploader.

## VERSION 3 LIVE (21 Nov 2026: the hidden animal named at the start)
- Teacher: "Heart no longer shares what animal to find in the video". Re-recorded ONLY a302 / b301 ("A little duck / frog is hiding in this
  video. Can you spot it?") and a1202 / b1202 ("Did you spot the duck? It was behind the boardwalk rail! Tell someone at home." / "Did you spot
  the frog? It was on a mangrove root! Tell someone at home."). The v2 takes, timelines and mixes are kept in v3/out/live/.
- Rules scene (common.js gameScene(..., an, pic) + mysteryPic): on the animal's name the mystery disc shows duck() / frog() (animals.js) for 1.5 s,
  then the "?" comes back; the pill now says "A little duck / frog is hiding!". Cue "curious" on the animal's name.
- Line length changes snapped to whole frames ("post" in script.py), so only the changed spans were rendered with EP_OUT=v3 (v3/patch_v3.sh)
  and spliced into the v2 render with ../kit_resplice.sh: P1 20-39.8 and 259.8-268.83 s, P2 20-29.83 and 259.83-268.83 s; seams frame-identical.
- v3/ep05_part1.mp4 304.33 s, v3/ep05_part2.mp4 308.03 s, both -16.0 LUFS, new v3/*.srt, v3/sheet_part*.png; stills v3/qa/fix_p*_rules.jpg,
  v3/qa/v3_checks.jpg. v1 (ep05_partP.*) and v2 (v2/) files untouched; thumbnails reused from v2/.
- YouTube (upload_v3.json, after HCDeYV32P8w, replaces M2PLrTN65vM / arTMOT9X1iE, retire_old): Part 1 https://www.youtube.com/watch?v=zexMf4fY7Ms ,
  Part 2 https://www.youtube.com/watch?v=1FGxQNHwrUo . Both playlists checked: HCDeYV32P8w -> zexMf4fY7Ms -> 1FGxQNHwrUo -> fNZuqF2zDww -> Ojuq9XJI66E.
  Render spans deleted after the upload.
