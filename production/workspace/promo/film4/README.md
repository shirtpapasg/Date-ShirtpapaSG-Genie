# Promo film 4 "The Grey Platform" (the avatar): how it is built

The engine is the "TheOneApp, Explained" one (explained2/ep20), trimmed for a one-part promo. Rebuild in this order:

1. `/home/user/heart-tts/venv/bin/python make_voice.py`: voices from `script.py` -> `voice/` (wav not in git; json in git).
2. `python3 build_tl.py`: the running order (scenes, lines, marks) -> `tl.json` / `tl.js`.
3. With the app served read-only (`cd /home/user/theoneapp && python3 -m http.server 8765 --bind 127.0.0.1`):
   `NODE_PATH=$(npm root -g) node make_avatars.js` (the pupils' characters from the app's avatar.js -> `avatars.js`) and
   `node capture.js` (real app screens -> `shots/*.jpg`). The members-only check cannot reach
   `/api/access` locally, so the pages open by their own "server unreachable" path; nothing in the app is edited.
4. `node sound.js`: music, foley and voices -> `out/mix.wav` (-16 LUFS).
5. `flock /tmp/explained_render.lock node render.js 1 3`: frames -> `out/video_p1.mp4` (30 fps, 300-frame chunks kept on restart).
6. `python3 finish.py` -> `film4.mp4`, `film4.srt`, `contact.jpg`; `node thumb.js` -> `thumb.jpg`.

Read in place, never copied or edited: `../../explained2/kit/style.js`, `../../explained2/ep20/spr/` (the v2 cast sprites, `spr.js`),
`../../explained2/ep20/audio/` (the synth kit), `../../explained2/fonts/`, the voice kits (`explained2/characters/sprites`, `sg_pron.py`).
Files: `art.js` (the Station, Gift Shop, quiz cards, captions, end card), `scenes.js` (the nine scenes + the thumbnail), `lib.js` (the
episodes' buddy code, copied), `main.js`, `page.html`, `stills.js` (frames for checking).
