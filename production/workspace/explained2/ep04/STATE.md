# EP4 build state (for a resume after a restart)
- Engine copied from ep03/. Script as data: `script.py` (autopilot: no teacher approval before the render). The script file `../p3_ep04_script.md`
  is GENERATED: `python3 make_script_md.py` (words from script.py, times from tl_p*.json, notes in make_script_md.py, the rest in script_frame.md).
- Voices: `voice/` (`/home/user/heart-tts/venv/bin/python make_voice.py` keeps finished files; delete a line's .wav/.json to redo it).
- Timeline: `python3 build_tl.py 1|2`. Part 1 = 4:58.9, Part 2 = 5:01.4.
- Picture: `ep4.js` (crates, chilli plant, fern on the rain tree, bacteria, note boards, fview = farm, gview = garden), `common.js`, `shrink.js`
  (both first-person journeys), `p1.js`, `p2.js`. Backgrounds are EP3's baked PNGs (`bg/`).
- Sound: `sound_cues.js` -> `node dump_cues.js P` -> `node song.js P`.
- One part end to end: `./build_part.sh P` (timeline, cues, song, render in 10 s chunks kept in out/chunks_pP, finish.sh). Renders are wrapped in
  `flock /tmp/explained_render.lock` (one episode renders at a time on this machine).
- To change one scene: edit, delete the 10 s chunks it touches in `out/chunks_pN/`, `./build_part.sh N`.
- Stills: `PART=N ./sheet.sh name cols t1 t2 ...` -> qa/name.jpg.
- Upload: `python3 ../../../youtube/explained_upload.py ep04/upload.json --check`, then without `--check`.
- Status: see ../progress/ep04.json

## Finished (20 Nov 2026, ~19:50 UTC): LIVE
- Part 1: the queued fixes (mushroom hop in open3, ending props in nyk) were already in the re-rendered chunks 3000-3600 and 8400-8700; final 4:58.9.
- Part 2 rendered, then one fix: the shelf's slide-aside used a fixed 560 px, so the long "NON-FLOWERING PLANTS" pill stayed half on
  screen at the right edge in the showdown card, the score/lizard and the ending. `lib.js` now slides by `ww + 160` (as EP5);
  chunks 5100, 7200, 7500, 8400, 8700, 9000 re-rendered. Final 5:01.4.
- Both parts 1920x1080 30 fps, -16.0 LUFS; `.srt`, `sheet_part1.png`, `sheet_part2.png`, thumbnails.
- YouTube (public, Made for Kids): Part 1 https://www.youtube.com/watch?v=sZZh7fjmaKQ , Part 2 https://www.youtube.com/watch?v=HCDeYV32P8w ,
  in both playlists right after EP3 Part 2 (VQQmu6Gjfhc). Captions (.srt) not sent by the uploader.
