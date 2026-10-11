# Object realism brief: P4 Science episodes

Work dir (`$S`): `/tmp/claude-0/-home-user-Date-ShirtpapaSG-Genie/8764a423-5385-5445-b38a-c2c2633ecdb7/scratchpad`
Snapshot dir (`$W`): `/tmp/claude-0/-home-user/8764a423-5385-5445-b38a-c2c2633ecdb7/scratchpad`
Run node with `NODE_PATH=$(npm root -g)`. Use absolute paths. Work ONLY on your assigned episodes.

## The request (from the teacher who owns the series, a primary science educator)
"Check for object realism in all the video scenes." Earlier comments in the same spirit:
- "The torch is not tilted down, facing where the light is shone." (fixed in EP08/14/16/17 already)
- "The water added to the bottle should be blue instead of dirty brown." (fixed in EP08)
- "Stomach and other organs should appear pinkish or dark maroon, not purple." (fixed in EP01/05/06/07)
Children aged 9-10 learn science from these pictures, so a drawing that shows the science wrong is a real problem.

## What to look for (examples, not a complete list)
- Direction: tools and sources point at what they act on (torch/lamp lens toward its beam, magnifying glass,
  tap/hose/kettle spout toward the water stream, fan toward the wind, arrows of motion vs the way an emoji faces;
  e.g. 🚗🚲🏃🐟 emoji natively face LEFT, so if one moves right it should be mirrored with `scale(-1 1)`).
- Colour: water/liquids blue or clear (never brown unless the script says dirty/muddy/tea), organs pink/red/maroon,
  blood red, bones off-white, leaves green, stems/trunks green or brown, sky/sun plausible, ice pale blue/white, flames orange/yellow.
- Physics and science: shadows fall on the side AWAY from the light and line up with light and object;
  liquid surfaces stay level; a container being filled is open (no cap); heavier pan of a balance goes DOWN;
  objects rest on surfaces instead of floating (unless meant to); heat/arrows flow the right way (hot to cold);
  magnets: unlike poles attract, like poles repel; plants: roots underground, parts connected; life cycles in the
  right order; correct number of legs/body parts for insects (6 legs, 3 body parts), etc.
- Things that are clearly the wrong object for the narration (e.g. narration says "torch" but shows a candle).

## How each episode is built
- `$S/epN/epNb.html` is the current rendered page (1920x1080 SVG; `window.render(t)` draws time t seconds).
  It is generated from `$S/bak_v1/epN/epN.html` (EP02: `$S/bak_v1/ep2/ep2_newplant.html`). NEVER edit these by hand,
  and do NOT run prep_all.py (another process uses it).
- Fixes go in `$S/fixes/epN.json`: JSON list of `[old, new]` or `[old, new, count]` string pairs applied to the source.
  `old` must match EXACTLY ONCE (or exactly `count` times) in the source. Copy `old` from `$S/epN/epNb.html`
  (the current page). APPEND new entries at the end; never edit or remove existing entries. Write the JSON file with
  `json.dump(..., indent=1, ensure_ascii=False)` to a temp file and `os.replace` it in place.
- Preview: `python3 $S/preview.py N` applies the not-yet-applied entries to `$S/epN/epNb.html` and writes
  `$S/epN/preview.html`; every entry must print "applied" or "already in" (never "NOT FOUND").
- Frames: `node $W/snap.js PAGE OUTPREFIX t1 t2 ...` writes OUTPREFIX_t.jpg (1920x1080). Combine frames into grids
  with python PIL (e.g. 12 frames per 3x4 grid, each 640x360) and look with the Read tool. Put images in `$W/snaps/`
  named with your episode prefix (e.g. `r12_...`).
- `$S/epN/tl.json` has `scenes` (list of {scene, t0, t1}) and `cues[segId][word]` (time a word is spoken).
- Helpers in the page: `emo(parent, x, y, size, "🔦")` draws a centred emoji (text-anchor middle, baseline central),
  so `tf(e, "rotate(A x y)")` or `tf(e, "translate(x y) scale(-1 1) translate(-x -y)")` turns or mirrors it in place.
  Note: Noto 🔦 points UP-LEFT; to aim it at angle φ (SVG degrees, 0 = right, 90 = down) rotate by φ + 135.
  If a later `set(e, "x"...)`/`tf(e, ...)` call in the scene's `run` overwrites a transform, put your change there.

## What to do
1. For each episode, grid frames every ~3 s across the whole episode (skip the shared welcome scene and goodbye),
   and read the scene code. List realism problems.
2. Fix the clear ones with small edits in fixes/epN.json (rotate/mirror an emoji, change a fill colour, move a shadow,
   swap a wrong emoji for a right one, open a lid). Keep the style. Do NOT change narration, captions, keyword text,
   cue words, timing, scene order, layout of text, or the shared welcome/goodbye code. Do not touch fixes already in the file.
3. Preview and snap the fixed frames; check that nothing new overlaps text. Repeat until clean.
4. If a problem would need a big redraw, don't attempt it: report it.

## Report back (short)
Per episode: each fix (one line: what, scene, time) and anything left unfixed with the reason. Confirm preview.py
shows every entry "applied" or "already in".
