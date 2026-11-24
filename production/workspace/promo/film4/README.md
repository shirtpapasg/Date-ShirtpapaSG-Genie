# Promo film 4 "The Grey Platform" (the avatar): how it is built

The engine is the "TheOneApp, Explained" one (explained2/ep20), trimmed for a one-part promo. Rebuild in this order:

1. `/home/user/heart-tts/venv/bin/python make_voice.py`: voices from `script.py` -> `voice/` (wav not in git; json in git).
2. `python3 build_tl.py`: the running order (scenes, lines, marks) -> `tl.json` / `tl.js`.
3. With the app served read-only (`cd /home/user/theoneapp && python3 -m http.server 8765 --bind 127.0.0.1`):
   `NODE_PATH=$(npm root -g) node make_avatars.js` (the pupils' characters from the app's avatar.js -> `avatars.js`) and
   `node capture.js` (real app screens -> `shots/*.jpg`). The members-only check cannot reach
   `/api/access` locally, so the pages open by their own "server unreachable" path; nothing in the app is edited.
4. `node sound.js`: music, foley and voices -> `out/mix.wav` (-16 LUFS).
5. `flock /tmp/explained_render.lock node render.js 1 3`: frames -> `out/chunks_v3/` -> `out/video_v3.mp4` (60 fps since v3, 300-frame chunks kept on restart).
6. `node thumb.js thumb_v3.jpg`; `python3 finish.py [scratch dir]` -> `film4_v3.mp4` (soft bloom on the lights), `film4_v3.srt`, `contact_v3.jpg` (every 4 s),
   `compare_v3.jpg` (beside films 1-3), `film4_v3_720.mp4` (preview, under 15 MB).

Read in place, never copied or edited: `../../explained2/kit/style.js`, `../../explained2/ep20/spr/` (the v2 cast sprites, `spr.js`),
`../../explained2/ep20/audio/` (the synth kit), `../../explained2/fonts/`, the voice kits (`explained2/characters/sprites`, `sg_pron.py`).
Files: `art.js` (the Station, Gift Shop, quiz cards, captions, end card), `scenes.js` (the nine scenes + the thumbnail), `lib.js` (the
episodes' buddy code, copied), `main.js`, `page.html`, `stills.js` (frames for checking).

v3 (teacher, 24 Nov 2026: "looks lower quality than promo films 1-3 ... showcase some of the legendary customised suit"): 60 fps; the Station
layered with parallax (skyline rows of lit windows, nebula glow, a proper train with windows, doors, roof, headlight and deck reflection,
flowers, motes, foreground grass); the platform with its canopy, light cones, glossy floor and the carriage's reflection; the Gift Shop
inside (shelves of the shop's real things with their tier tags, from `make_avatars.js`); a new scene `legend` (Heart's line h08): the
"Legendary looks" stage with the Winter Wonderland Pack (S Legendary 300) and the Space Explorer Pack (SS Mythical 500), worn by characters
drawn by the app's avatar.js; the Dressing Room's curtains and spotlight; arcade backgrounds for Boss Clash and Versus. The app never names
a festival (tests/shop.test.mjs), so neither does the film: "Winter Wonderland", never "Christmas". v2 files (`film4.mp4`, `thumb.jpg`) are kept.
