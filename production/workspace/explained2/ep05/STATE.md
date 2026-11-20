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
