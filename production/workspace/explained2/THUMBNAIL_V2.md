# Thumbnail style v2 (click-rate pilot, 21 Nov 2026)

Why: the channel's thumbnail click-through rate was 1.3% (typical is 2-10%). The old style (`epNN/thumb.js`) had 5-8 words that often
gave the answer away, a tiny buddy in a corner disc, a small object in a wide empty scene, pale backgrounds that all looked alike, and a
big red PART badge as the boldest thing. The pilot redraws three thumbnails; compare them in `qa/thumb_pilot.jpg` (old vs new, full size
and at 320 px). Nothing is uploaded by these tools: swapping a thumbnail on YouTube is a separate, deliberate step.

| Thumbnail | File | Words | Buddy | Background |
|---|---|---|---|---|
| EP10 Part 1 | `ep10/thumb_v2_part1.jpg` | HOW?! | Basil, surprised | orange-yellow burst over a deep blue sea |
| EP9 Part 2 | `ep09/thumb_v2_part2.jpg` | WHICH SNAPS? | Momo, surprised | green burst |
| EP11 Part 1 | `ep11/thumb_v2_part1.jpg` | WHY BLURRY? | Pip, surprised | violet burst |

## The rules
1. **0-3 words**, very large (110-165 px on the 1280x720 frame), white `#FFFFFF` or yellow `#FFD60A`, Nunito Black with a thick dark
   outline. The words open a question and never give the answer; the video title carries the full question.
2. **One buddy, big**: about a third of the frame (600 px tall), a strong expression (the `*_surprised` or `*_cheer` poses read best
   small), beside the object. Only the teacher's art from `characters/sprites/poses/` (or `characters/sprites/*_sit_*.png`): scaled or
   flipped, with a white sticker outline and a soft dark glow. Never redrawn in code.
3. **One subject, close up**, filling the rest of the frame, drawn by that episode's own drawing functions, with a white outline or a glow.
4. **A saturated background**, a radial burst, a different colour for each episode (do not reuse the colour of the episode before).
5. **Brand tag** "TheOneApp, Explained" small at the top left (the engine's own `logo()`); **no PART badge**, only a tiny number chip
   beside the tag (`chip: false` for none). Keep the bottom right corner free: YouTube puts the video length there.
6. **Readable at 320 px wide**: always look at the 320 px copy on the sheet before using a thumbnail.
7. **Kid-safe and honest**: only things that are in the video, no arrows or circles pointing at things that are not there, no scary faces.

## How to make one
1. Add an entry to `THUMBS` in `thumb_v2.js` (the fields are described above the table in that file): the episode folder and part, the
   burst colours, the `cuts` (JavaScript expressions that return SVG, run inside `epNN/page.html`, so every drawing function of that
   episode is available; find them in the episode's `STATE.md` and in its old `THUMB1` / `THUMB2` in `p1.js` / `p2.js`), the `layers`
   back to front, and the `words`.
2. `export NODE_PATH=$(npm root -g)` then `node thumb_v2.js ep13_1` (or `all`). It writes `epNN/thumb_v2_partN.jpg` (1280x720, JPG, far
   under 2 MB).
3. `node thumb_v2.js sheet` rebuilds `qa/thumb_pilot.jpg`. Look at the 320 px copies; move things until nothing covers the buddy's face,
   the words or the subject, then commit the JPG.

Layout that worked for all three: buddy at the left (x about -30, y 150, h 600), words along the top right, subject in the right two
thirds below the words.

Not in the pilot: the torch itself is not on EP11's thumbnail (the two panes with the sharp and the blurry robot filled the space; a
torch and beam made it crowded at 320 px).
