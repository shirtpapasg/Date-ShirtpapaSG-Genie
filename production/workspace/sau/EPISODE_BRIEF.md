# Building a whole TheOneApp, Explored episode: brief for an animator agent

You are building one whole episode of "TheOneApp, Explored", a science YouTube series for Singapore Primary 3 to 6 pupils (ages 9 to 12),
in `/home/user/Date-ShirtpapaSG-Genie/production/workspace/sau/`. The teacher wants speed: be quick and decisive, and keep the bar high.

## Read first
- `POV_BRIEF.md`: the kit, determinism, and the test loop. Python for `build_tl.py` is `/home/user/heart-tts/venv/bin/python`.
- `production/THEONEAPP_EXPLORED.md` (two levels up): the teacher's storytelling and pacing guide, and rules 1 to 10. Rule 9: drawn, but
  true to the world and the science; nothing may teach a wrong idea. Rule 10: one kind of label per row; every map line starts and ends
  somewhere named. Also: first person, a silent cold open, a change every 10 to 15 seconds, good sound effects.
- `common.js`, `engine.html`, `geo_map.js` (`regionMap`: real coastlines with Singapore at 612,418), and the header of `sfx_lib.py`
  (about 55 layered sounds plus the music beds `pad_wonder` and `pad_tension`).
- Finished work to reuse and to beat. Copy helpers into your own files under your own names; never edit another folder:
  - `ep02/scenes.js`: `S.answer`, `S.news`, `S.try`, `S.think`, `S.close` driven by `CFG.close`, and `makeRecap`.
  - `ep02/pov.js`, `ep01/pov.js` (smoke particle, nose, lungs, air sac, raindrop), `ep02b/pov.js` (sunlight from the Sun).
  - `ep02/coldopen.js`: the series' pupil character. Keep the student consistent: blue school shirt, navy shorts, red bag, dark hair.
  - Contact sheets: `/tmp/povA/sheet.png`, `/tmp/povB/sheet.png`, `/tmp/povC/sheet.png`, `/tmp/povK/sheet.png`.

## Real life, always (the teacher, 18 Nov 2026)
Every episode links the science to real-life examples Singapore pupils know, so they make the connection. Use everyday places and
things in the pictures and cards: the school canteen, an HDB flat and its void deck, a hawker centre, PE lessons, the playground, the MRT,
a school trip to Sungei Buloh, a blue recycling bin, the kitchen. When a scene teaches an idea, show it happening in a real
Singapore moment as well as in a diagram.

## What to build
The episode's segments file `epNN/epNN_segments.json` has the approved script. Heart's narration is already recorded in `epNN/aud`, and the
timeline `epNN/epNN_tl.json` is built. Build every scene the file names, in `epNN/scenes.js` (narrated scenes) and `epNN/pov.js`
(picture-only shots). The page is built with `common.js,geo_map.js,epNN/scenes.js,epNN/pov.js`; `common.js` provides `welcome`, `nyk`,
`end` and `qcard`.
- Narrated scenes move in step with Heart's words through `cue(scene, word, fallbackFraction)`.
- The recap scene is a board that lights up step by step as she names each step.
- The think scene's chip says "Answer next time!".
- The close scene uses `CFG.close`; copy it from ep02.
- Picture-only shots: first person wherever it can be. Add one-line cards a 9-year-old reads fast, layered sound effects timed to the
  picture, and a music bed for the sequence.

You own `epNN/` except the narrated `text` fields of the segments file. You may change the silent segments' lengths and `sfx`, add
`"shots"` (camera moves on long narrated segments) and set `"hold"`, then rebuild with
`$PY build_tl.py epNN/epNN_segments.json epNN/aud epNN/epNN`. Never re-record voice. Do not edit `common.js`, `engine.html`,
`build_tl.py`, `sfx_lib.py` or other folders; other animators are working beside you and the machine is shared, so keep test renders short.

Do at least two rounds of build, stills, hard critique and rebuild. Then render the episode once with `./render_all.sh epNN epNN`, and
make a contact sheet of about 30 stills across the whole episode at `/tmp/epNN/sheet.png`. Report briefly: what each scene shows, and
anything you could not do. Do not commit, push or upload.
