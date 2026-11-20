# EP2 build state (for a resume after a restart)
- Engine copied from ep01/. Script as data: `script.py` (section-6 trims 1-4 already applied there). Voices: `voice/` (done).
- Timeline: `python3 build_tl.py 1|2`.
- Picture: `hotel.js` (set and props), `common.js` (shared routines), `micro.js` (the shrink), `garden.js` (the mimosa garden for the dare), `p1.js` (Part 1, done), `p2.js` (Part 2). Bake backgrounds: `node bake.js`.
- Sound: `sound_cues.js` -> `node dump_cues.js P` -> `node song.js P`.
- Render: `flock /tmp/explained_render.lock node render.js P 3` (10 s chunks kept in out/chunks_pP), then `./finish.sh P`.
- Upload: `upload.json`, then `python3 ../../../youtube/explained_upload.py ep02/upload.json` (run `--check` first).
- Status: see ../progress/ep02.json
