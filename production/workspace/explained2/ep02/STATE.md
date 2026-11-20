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

## Finished (20 Nov 2026, ~19:30 UTC): LIVE
- Part 2 rendered and finished. Chant fix in both parts: the second chant line ("Living things need all three!") ran under the
  "YOUR TURN!" tag and hid "three!"; `common.js` chantLines now x 900, size 76 (as EP4/EP5). Only the chant chunks were
  re-rendered (p1: 6600-7500, p2: 6900-7500).
- Final: `ep02_part1.mp4` 4:58.5, `ep02_part2.mp4` 4:58.2, 1920x1080 30 fps, -16.0 LUFS each; `.srt`, `sheet_part1.png`,
  `sheet_part2.png`, thumbnails.
- YouTube (public, Made for Kids): Part 1 https://www.youtube.com/watch?v=0GMt5_Z56Ds , Part 2 https://www.youtube.com/watch?v=23sA7ZKKIFU .
  In both playlists right after 3KyRNndmUU8; old hHXI7B1Qg8A taken out of both playlists, still public, its description now
  starts with a pointer to Part 1. Captions (.srt) are not sent by the uploader: add them in YouTube Studio if wanted.
