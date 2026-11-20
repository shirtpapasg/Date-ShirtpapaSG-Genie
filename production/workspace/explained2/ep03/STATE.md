# EP3 build state (for a resume after a restart)
- Engine copied from ep02/ (itself from ep01/). Script as data: `script.py`. Voices: `voice/` (done; `make_voice.py` keeps finished files).
- Timeline: `python3 build_tl.py 1|2`. Part 1 = 4:55.3, Part 2 = 4:59.8 after the section-6 trims (1, 3, 4, 5) and tighter picture-only gaps.
- Picture: `trail.js` (props, BG.patch, BG.farm), `common.js` (shared routines), `shrink.js`, `p1.js`, `p2.js`. Bake backgrounds: `node bake.js patch farm`.
- Sound: `sound_cues.js` -> `node dump_cues.js P` -> `node song.js P`.
- Render: `node render.js P 3` (10 s chunks kept in out/chunks_pP), then `./finish.sh P`.
- Status: see ../progress/ep03.json

## Finished (20 Nov 2026)
- `ep03_part1.mp4` 4:55.3, `ep03_part2.mp4` 4:59.8 (1920x1080, 30 fps, -16.0 LUFS), `.srt` for each, `sheet_part1.png`, `sheet_part2.png`, `thumb_part1.jpg`, `thumb_part2.jpg`.
- Changes from the script (section 6 trims 1, 3, 4, 5 and tighter picture-only gaps) are listed at the top of `script.py` comments and in the build report.
- To change one scene: edit, delete the 10 s chunks it touches in `out/chunks_pN/`, `node render.js N 3`, `./finish.sh N`.
- Thumbnails: `node thumb_still.js N 1 qa/th/fN.png "&thumb"` then `node thumb.js ...` (see the commands in git history).
