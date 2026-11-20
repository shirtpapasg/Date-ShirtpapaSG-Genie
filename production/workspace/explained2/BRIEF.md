# TheOneApp, Explained: the revamp (from 19 Nov 2026)

The teacher wants the "TheOneApp, Explained" YouTube channel revamped in art style and direction, aiming for very high views and for
teachers worldwide to praise it and go to it. "Take note and utilise the information what makes an amazing animated science video, with
high view rates. These are success examples for us to not reinvent the wheels."

Read first:
- `production/brainstorm/PROPOSAL.md`: the new format (lock-in game, first-person journey, Mark Sentences, growth plan) and the update:
  the cast is TheOneApp's pet buddies Pip (chinchilla), Basil (lizard), Momo (cat), with Heart as host.
- `production/THEONEAPP_EXPLORED.md`, especially "Storytelling and pacing guide (the teacher's, 18 Nov 2026)" (pacing, editing,
  visual craft, common mistakes) and rules 1-10 (rule 9: drawn but true; rule 10: one kind of label per row; map lines start and end at
  named places). These are the teacher's own success principles; follow them.
- The render kit in `production/workspace/sau/` (engine.html, common.js, build_tl.py, build_page.py, render.js, stills.js, voice.py,
  sfx_lib.py, POV_BRIEF.md). Reuse it by COPYING what you need into `production/workspace/explained2/`; never edit files in sau/.
- The buddies as they look in the app: `git -C /home/user/theoneapp show origin/main:pets/<name>.png` for chin-, liz-, cat- x
  sit/stand/happy/cheer (152 px painted chibi images: soft grey-lavender chinchilla with big round ears and a white belly; pale grey-white
  lizard with big dark eyes and a curled striped tail; grey-white tabby kitten with pink inner ears and big sparkly eyes).

Hard rules: original work only (learn principles from successful channels, never copy any show's characters, names, look or music);
Singapore settings and MOE-exact science; nothing may teach a wrong idea; deterministic frames (a frame depends only on t).
Do not commit, push, upload or touch YouTube, the review boards or TheOneApp.

## Updates (19 Nov, later)
- The PILOT is P3 EPISODE 1 "Living and non-living things" (P3 plan row 1: "Is your teddy bear alive? The two-group sort"), not P5
  evaporation. P3 plan: `git -C /home/user/Date-ShirtpapaSG-Genie show origin/claude/cool-hypatia-v13e6t:production/workspace/P3/plan/<file>`
  (00_series_plan.md, 01_style_guide_p3.md, briefs/ep01.md; list with git ls-tree).
- The teacher's success examples (principles only, never copy): `success_examples.md` in this folder (7 videos: Sesame Street,
  Dr. Plants x2, Aquarium Info, Journey to the Microcosmos, Kurzgesagt x2). Read it all.
- PROGRESS: the teacher watches a progress indicator. Each time you finish a step, overwrite `progress/<your-id>.json` with
  {"pct": <0-100 honest estimate of your whole job>, "step": "<what you just finished, 6-10 plain words>", "next": "<what's next>",
  "updated": "<UTC ISO time>"}. Write it first thing, then after every step. One quick write; don't let it slow you down.
- SAVE AS YOU GO: the machine can restart. Write each deliverable to disk as soon as a usable draft exists, then improve it in place.
- DECISIONS (20 Nov): NO 3D route (the teacher). The flat SVG redraws of the buddies "lack the cuteness"; the teacher's own painted
  poses are cuter. Plan: animate the teacher's own buddy art directly as cut-out sprites (squash/stretch, bounce, sway, head tilt,
  blinks, pose swaps, mouth swaps for lip-sync), from full-size originals the teacher will send.
- APPROVED (20 Nov): the pose-switching test characters/sprites/pose_test_robot_round.mp4 is "amazing, exactly what I want" (the teacher).
  It is the reference for how the buddies move in every episode: the teacher's painted poses as cut-outs, swaps with squash,
  stretch, overshoot, a hop, sparkles and dust (never cross-fades), same scale and foot line across poses, breathing/sway/leaning
  idle life, sitting talking sprites for lip-sync, small drawn mouths on one-face poses, speech bubbles with the pick word coloured.
- THUMBNAILS (20 Nov, the teacher approved): use a bright frame from the episode itself; put the words on the BRIGHT side (here the
  right), right-aligned, white first line(s) and sun-yellow last line(s), thick dark-violet stroke; keep the other side clear (no dark
  gradient, no extra logo pill; the frame's own small logo stays). Reference: ep01/thumb_ep01.jpg. Two-part episodes: a tilted raspberry "PART 1" / "PART 2" badge with a white rim on the LEFT side, bottom-left (ep01/thumb_part_badge_preview.jpg).
- EP2 (20 Nov): script p3_ep02_script.md approved ("Let's go") with these decisions: Part 1 water+air, Part 2 food (needs always said
  in book order); pills P1 WATER/WILTING/OXYGEN, P2 FOOD/ENERGY/LIGHT; 5 Mark Sentence cards; needs colours WATER blue, FOOD orange,
  AIR pale sky-white (not green); drawn times with "speeded up" tags; each part starts at Round one; toy boat and Basil's unfair test
  only on the teacher sheet. Built in ep02/.
