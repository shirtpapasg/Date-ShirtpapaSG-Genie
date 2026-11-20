# EP3 build state (for a resume after a restart)
- Engine copied from ep02/ (itself from ep01/). Script as data: `script.py`. Voices: `voice/` (done; `make_voice.py` keeps finished files).
- Timeline: `python3 build_tl.py 1|2`. Part 1 = 4:55.3, Part 2 = 4:59.8 after the section-6 trims (1, 3, 4, 5) and tighter picture-only gaps.
- Picture: `trail.js` (props, BG.patch, BG.farm), `common.js` (shared routines), `shrink.js`, `p1.js`, `p2.js`. Bake backgrounds: `node bake.js patch farm`.
- Sound: `sound_cues.js` -> `node dump_cues.js P` -> `node song.js P`.
- Render: `node render.js P 3` (10 s chunks kept in out/chunks_pP), then `./finish.sh P`.
- Status: see ../progress/ep03.json
