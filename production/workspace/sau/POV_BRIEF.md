# First-person ("POV") hero shots: brief for the build agents

## Who this is for
TheOneApp, Explored is a YouTube series for Singapore Primary 3 to 6 pupils (ages 9 to 12). Each episode links a real news story
to the science textbook. The teacher who runs it wants the hero sequences in **first person**: the camera IS the particle.
We fly with it at its size, see the world at its scale, and things rush past and loom up, like the parasite's-eye shots in AI-animated
dramas. Mix in a few outside shots only where they explain something you cannot see from inside (a real map, for example).

The teacher's words: "impress me", "MrBeast-level", "stunning visuals", "good sound effects", "simple enough to understand",
"interesting, informative". Read the pacing and storytelling guide in `production/THEONEAPP_EXPLORED.md` (the long section in the
teacher's own words, plus rules 1 to 10). The rules that bite hardest here:
- **Rule 9:** drawn, not real, but true to the world and the science. Nothing may teach a wrong idea.
- **Rule 10:** one kind of label per row; every line on a map starts and ends somewhere named.
- Only the science moves. Nothing decorative wiggles for the sake of it.
- Picture-only beats: no narration, only sound effects. Short text cards are allowed (one line, plain words a 9-year-old reads fast).
- A change every 10 to 15 seconds at most (here every 3 to 6 seconds, as these are fast shots).

## The kit (all in `production/workspace/sau/`)
- `engine.html`: one SVG page that draws any frame; `window.render(t)`. Helpers: `el, tx, emo, chip, clamp, lerp, ease, ramp, on, pop, popAt,
  set, op, tf, rnd/seed, INK, mix`. `scene(name, c1, c2)` makes a scene with a full-screen gradient and a `stage` group. Each scene
  draws in a 1200 x 900 box placed at screen (150, 60) on a 1920 x 1080 frame, but you may draw outside the box: in scene units the whole
  screen is x -150..1770, y -60..1020.
- `common.js` ends with the **first-person kit**: `VP` (the middle of the screen in scene units), `FULL`, `fullRect`, `vignette` (a soft
  coloured edge that says "this is you"), `field` + `flyField` (things spread in depth that rush at the camera), `tunnelG` + `runTunnel`
  (rings that rush past), `povCard` + `showCard`, `blob` (an irregular rounded shape). Improve the kit if you need to, but keep every
  existing function working (other scenes use them) and say what you changed.
- `ep02/scenes.js`: EP02's scenes. Use `FR(name)(t)` for 0..1 progress through a picture-only scene, and `SC[name].t0/.t1`.
  Look at `S.seabed`, `S.well`, `S.clean`, `S.route`, `S.chimney`, `S.ceiling`, `meGas` for the current third-person versions.
- Everything must be **deterministic**: a frame depends only on `t` (frames are rendered out of order in 4 browsers). If you keep state
  between frames (like an angle), integrate it from `t` instead, e.g. `angle = 60 * (t - t0) + 900 * f * f`.
- `build_tl.py` turns a segments JSON into a timeline plus a voice track and a sound-effects track. A segment with `"silent": seconds`
  needs no voice. `"sfx": [["name", secondsIntoSegment], ...]`. Sound names live in the `src` dict near the end of `build_tl.py`
  (a sound agent is upgrading these right now; use any existing name).
- `build_page.py` builds the HTML page. `stills.js` saves PNG frames. `render.js` renders frames to mp4.

## How to test (one CPU-friendly loop)
Use a test segments file of your own, never the episode's own files (other agents are working beside you).
```
cd production/workspace/sau
PY=/home/user/heart-tts/venv/bin/python
# a test file with only silent segments, e.g. ep02/povA_segments.json: {"episode":"test","title":"t","tag":"🌏 test","segments":[{"id":"h1","scene":"povRock","silent":4.2,"sfx":[["rumble",0]]}, ...],"outro":1}
$PY build_tl.py ep02/povA_segments.json ep02/aud ep02/povA            # writes povA_tl.json, povA_voice.wav, povA_sfx.wav
python3 build_page.py ep02/povA_segments.json ep02/povA_tl.json common.js,ep02/scenes.js,ep02/pov.js ep02/povA_page.html 1920x1080
node stills.js ep02/povA_page.html /tmp/povA/s 1920 1080 1.0 2.5 4.0 ...     # then look at the PNGs (combine with ffmpeg tile to save looks)
# a clip with sound, one browser only (the machine has 4 CPUs shared with other agents):
F=$(python3 -c "import json,math;print(math.ceil(json.load(open('ep02/povA_tl.json'))['END']*30))")
node render.js ep02/povA_page.html /tmp/povA/v.mp4 0 $F 30 1920 1080 && ffmpeg -y -loglevel error -i /tmp/povA/v.mp4 -i ep02/povA_sfx.wav -c:v copy -c:a aac -shortest /tmp/povA/clip.mp4
```
Check stills at several moments of every shot, and check motion by sampling frames close together (e.g. t, t+0.1, t+0.2).

## How to work
"Spam till a good template is out": build a first version of every shot, look at the stills with a harsh editor's eye (would a
10-year-old stop scrolling? Is it clear what we are and where we are? Is the science right?), then rebuild. At least three rounds.
Where you are unsure between two ideas, build both and keep the better one. Keep each shot readable: one clear idea, a strong
focal point, depth (near things big and fast, far things small and slow), bold colours from the series palette, thick INK outlines.
Finish with a short report: what each shot shows, its length, its sound-effect cues, and anything in the kit you changed.
Do not commit, push, upload or touch YouTube or the review board.
