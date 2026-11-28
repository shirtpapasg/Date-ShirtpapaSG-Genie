# MOTION GUIDE: how "TheOneApp, Explained" moves

Version 1, 19 Nov 2026. Written while making the EP1 Short "It walks. Is it ALIVE?" (`short1/`), the first film made with the
animation-studio plugin and our own buddy rigs. It adds to STYLE_GUIDE.md section 11 (motion rules); where the two differ, the
style guide wins. The helpers named here are in `kit/motion.js`.

## 1. The pipeline (copy this for every episode and Short)

```
short1/
  make_voice.py      every spoken line -> voice/<id>.wav + voice/voice_data.js (real lengths, word times, mouth envelopes)
  score.js           THE timeline: tempo, every voice line, every event. Sound and picture both read it. Nothing is timed twice.
  song.js            music + game sounds + the voices -> out/music.wav (music ducks under every voice line)
  film.js            draws frame t (pure function of t)      film/props.js  our props as SVG      film/ui.js  the recurring screens
  lib/               copies of characters/buddies.js, kit/style.js, kit/motion.js, kit/sprites.js (the renderer only serves this folder)
  engine/            the plugin's engine, vendored (two one-line patches: node ../kit/patch-engine.js)
```

1. `node <skill>/scripts/new-project.js <dir> --format 9:16` (or 16:9), then `node ../kit/patch-engine.js` inside it.
2. Write the lines in `make_voice.py`, run it with `/home/user/heart-tts/venv/bin/python make_voice.py`.
3. `score.js`: place each line after the one before it on the beat grid (`up(t)` = the next grid line), then hang every event on a
   line, a word (`wordT(id, "word")`) or a beat. Give hits a marker with `sync: 'av'`.
4. `node song.js`, then `node engine/render.js board --draft`, `stills`, `qa`, a draft `video 2 --draft`, motion strips
   (`ffmpeg -ss T -t 1.2 -i out/video-draft.mp4 -vf "fps=10,scale=270:-1,tile=12x1" strip.png`), fix, repeat.
5. `node engine/render.js video 2` (2 workers: the machine is shared), `mux`, `verify`, `pacing`, `check`, `qa`.
6. Before the final render, copy the latest rig: `cp ../characters/buddies.js lib/`.

**Our rigs on the plugin's canvas.** The plugin draws on a canvas; our rigs return SVG strings. `kit/sprites.js` bridges them: each
frame first runs a "collect" pass that lists the SVG sprites it needs, decodes the missing ones, then draws. A sprite is keyed by
its own SVG text, so a frame still depends only on t. Text is always drawn on the canvas (an SVG image cannot load our fonts, and
the plugin's `qa` only sees canvas text). Heavy static layers (blurred rooms, the glass box) are sprites with `still: true`.

## 2. The ten rules of our motion

1. **The score is the boss.** A landing, a flip, a stamp, a coin: its time is one number in `score.js`, read by the sound and by
   the picture. Never nudge one side. `verify` must pass.
2. **Land ON the beat, move BEFORE it.** `Motion.hop(t, t0)` lands at `t0`; the crouch and the flight happen before. The frame of
   contact is the frame of the sound. After the hit only the settle is left (squash, ring, wobble).
3. **Anticipation, action, overshoot, settle.** Nothing starts from rest at full speed and nothing stops dead. `anticipate()` for
   slides, `spring()` for pops (6 to 10% overshoot), `kick()` for the wobble afterwards.
4. **Squash and stretch keep the volume** (`squash(k)`: taller means thinner). Up to 20% on a buddy's landing, 8% on the robot's
   steps, none on diagrams, text cards or the Mark Sentence.
5. **Arcs.** Buddies swap places on arcs (`arc()`), one high and one low so they never pass through each other. Coins and tokens
   fly in arcs. Only the robot moves in straight, even steps: it is a machine, and that contrast is part of the lesson.
6. **Overlapping action.** Parts arrive at different times: the body, then the head (60 ms late), then the antenna, ears or card
   (100 ms late). Listeners turn to a speaker late and never together.
7. **Moving holds.** A held pose still breathes and drifts (`hold()`, `breathe()`). Exception, on purpose: a non-living thing that
   has stopped is perfectly still. After the robot stops, not one pixel of it moves while the mealworm does.
8. **Eyes first.** Eye darts (`dart()`) are jumps, not glides: look, hold, look. A buddy looks at the thing before reacting to it.
9. **The whole body speaks.** Lip-sync comes from the real voice envelope (`mouth(env, t, t0)`, one frame early), and the
   loudness also lifts the body a little and tilts the head. One gesture per sentence, changed on a word, hidden in a small pop.
10. **Blur and hits without shaking.** Fast moves (more than about 14 px a frame) get `smear()` (a 4-sample trail); hits get a
    camera `punch()` (a 2 to 4% zoom bump), a glow pulse and a ring. No screen shake, no white flash (style guide section 10/11).

## 3. Camera
- **The 10-second rule (teacher, 2026-11-28):** no still frame and no same shot for more than 10 s: every 10 s at most, a cut to a
  new angle or set, a close-up, a camera move (push-in, pan, tilt, rack) or a full-frame insert. Bubbles changing on a held wide
  shot do not count. Cover dialogue with singles / two-shots / the group (cut just before the first word), a slow push inside every
  shot, no jump cuts. Built with the director camera (`p4ep03/plan_shots.py` -> `director_p1.js`, `main.js` `dirAt`, `DHUD` for screen
  things); checked with `qa/hold_check.py <video>` (longest hold, must be <= 10 s). See SERIES_FORMAT 6y.
- Default: a slow push (1.00 to 1.04 to 1.06 over a shot). Parallax by depth with `Motion.cam(ctx, cam, depth, W, H)`: far 0.2,
  mid 1, near 1.6.
- A push-in means "look closer" (the spring window: 1.3 to 1.7 in half a second). A pull-out means "time passes" (the night).
- 9:16 is re-staged, not cropped: stack things, one idea per frame, text and faces inside `G.SAFE` (x 60..940, y 221..1498);
  the floor or desk fills the bottom 22%.

## 4. Acting notes for the buddies (rig options in `characters/buddies.js`)
- The speaker stands front and centre at about 400 px; the two listeners stand further back at about 236 px, turned to the speaker.
- Pose-to-pose: pick the expression and gesture per SENTENCE, switch on a word (`wordT`), and cover the switch with a small squash
  (`land()`) so the snap reads as energy.
- Personality in rhythm: Basil bounces on every tick (he is sure); Pip thinks with slow eye darts; Momo tilts her head.
- A buddy who was not right is shown `oops` for under a second, then laughs and says the right idea (style guide 7.4).
- The pick card flips exactly on the pop sound; a dot in the buddy's aura colour then flies to the side they chose.

## 5. Sound and sync gimmicks used in the Short (reuse them: viewers learn them once)
- The robot's steps are the percussion: every foot landing is a wood tick. When the spring runs down the ticks slow and stop.
- The ring's ticks are beats, then 8ths, then 16ths; each tick notches the ring; the bell snaps it shut.
- "LOCKED IN!" is a stamp thump one beat after the bell; each buddy's card flip is a pop and a rising marimba note (E, G, C).
- The verdict tag lands on a "ding" and a warm chord; a point is one coin "ting" and the number rolls.
- Heart is the heart in the logo pill: it beats with her voice.

## 6. Checks before a film ships
`verify` (all ✓), `pacing` (movement and sound in the first second, text within 3 s, a big change every 12 s), `qa` (text in the
safe area, 16 px or more, no overlaps), a full-size look at every marker still, motion strips of every fast move, and the lines
read against the script. `qa` contrast warnings on white words over the blue and orange choice cards are the approved look.

## 7. Known limits (ask the rig agent, see characters/RIG_REQUESTS.md)
- Gestures and expressions switch in one frame (the rig has no in-betweens); we hide the switch in a squash. Blendable arm
  targets would let arms move on arcs.
- Eyes cannot look up or down, and lids cannot be set from outside, so "looking up at the ring" is played with head tilt.
- Ears and tails have their own idle sway only; a `drag` input would let them follow jumps.
