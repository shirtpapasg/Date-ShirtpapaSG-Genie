# EP2 build state (for a resume after a restart)
- Engine copied from ep01/. Script as data: `script.py` (section-6 trims 1-4 already applied there). Voices: `voice/` (done).
- Timeline: `python3 build_tl.py 1|2`.
- Picture: `hotel.js` (set and props), `common.js` (shared routines), `micro.js` (the shrink), `garden.js` (the mimosa garden for the dare), `p1.js` (Part 1, done), `p2.js` (Part 2). Bake backgrounds: `node bake.js`.
- Sound: `sound_cues.js` -> `node dump_cues.js P` -> `node song.js P`.
- Render: `flock /tmp/explained_render.lock node render.js P 3` (10 s chunks kept in out/chunks_pP), then `./finish.sh P`.
- Upload: `upload.json`, then `python3 ../../../youtube/explained_upload.py ep02/upload.json` (run `--check` first).
- Status: see ../progress/ep02.json

## Where it stands (20 Nov 2026, 14:40 UTC)
- Part 1 and Part 2 pictures are finished and checked in stills (qa/s1, qa/s2, qa/s2b, qa/c1-c3). Sound cues written; `out/mix_p1.wav`, `out/mix_p2.wav` built (-16.0 LUFS).
- Timelines: Part 1 = 4:58.5, Part 2 = 4:58.2 (script.py: section-6 trims 1-4, plus shorter picture-only gaps; no ring, hold, card or teaching line was shortened).
- Thumbnails made: `thumb_part1.jpg`, `thumb_part2.jpg` (frames: `node thumb_still.js N 1 qa/th/fN.png "&thumb"`; words: `node thumb.js qa/th/f1.png thumb_part1.jpg 1 "IS IT|SAD?" "WHAT DOES|IT NEED?"`, `node thumb.js qa/th/f2.png thumb_part2.jpg 2 "2 WEEKS|IN THE DARK" "WHAT IS|MISSING?"`).
- `upload.json` written; `--check` passes.
- NEXT: `flock /tmp/explained_render.lock node render.js 1 3` and `... 2 3` (finished 10 s chunks are kept), `./finish.sh 1`, `./finish.sh 2`, look at the contact sheets and stills from the mp4s, then upload.
