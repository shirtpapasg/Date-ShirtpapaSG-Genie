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
