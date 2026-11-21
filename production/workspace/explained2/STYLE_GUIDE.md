# STYLE GUIDE: "TheOneApp, Explained" (the revamp, P3 to P6)

> **Approved by the teacher on 19 Nov 2026** ("this looks amazing", on the round-2 style frames). This is the look for the revamped series.

Version 1, 19 Nov 2026. Pilot: P3 EP1 "Living and non-living things". For every agent who draws, animates, scores or packages an
episode. The look lives in code: `kit/style.js` (palette `P`, shared defs, props) and `frames/frames.js` (the seven style frames;
render with `node ../kit/stills.js styleframes.html out 1920 1080 1 2 3 4 5 6 7` from `frames/`). Contact sheet: `frames/sheet.png`.
Why each rule exists: `research.md`. This guide covers art and direction; the P3 script rules (exact definitions, positive language,
plain label lines, no numbered markers) in `01_style_guide_p3.md` and the teacher's rules 9 and 10 still apply in full.

## 0. The look in one line
Soft, round, glowing vector worlds in a violet, sun-yellow and leaf-green palette: a bright GAME world you play in and a quiet,
backlit MICRO-WORLD you shrink into, both lit warmly, both Singapore, with three soft chibi buddies looking straight at you.

The polish bar: pause on any frame and it should work as a poster. Before a scene ships, check: one clear subject, three depth
planes, one key light, nothing touching the frame edge by accident, no text overlapping a face or a prop, palette colours only.

## 1. Palette (hex; names as in `kit/style.js`)

| Role | Name | Hex | Use |
|---|---|---|---|
| Ink | ink / ink2 | `#2B2147` / `#4A3F6B` | All dark text, pills, shadows. This replaces black. Pure `#000` is never used. |
| Paper | paper / cream | `#FFF8EA` / `#FFF3DC` | Cards, tables, speech bubbles, light text on dark. Pure white only for small highlights and bubbles. |
| Signal | sun / sunDeep | `#FFC83A` / `#F59E0B` | THE signal colour: YOU, the timer ring, highlights on key words, "+1". Nothing decorative is sun-yellow. |
| Choice A | blue / blueDeep | `#3A8DFF` / `#1F5FD0` | Left choice, "Living" column, choice 1. |
| Choice B | orange / orangeDeep | `#FF9838` / `#E36A12` | Right choice, "Non-living" column, choice 2. |
| Choice C | purple | `#9B6BFF` | Third choice when there are three. |
| Life | leaf / leafDeep | `#43BF6C` / `#1F8A4C` | Plants, "correct" ticks. |
| Warm accent | coral, pink | `#FF6F61`, `#FF8FB1` | Small props, cheeks. Coral is NOT used for "wrong" (see 7.4). |
| Cool accent | aqua | `#2EC4B6` | Props, water, lids. |
| Game night | night / indigo / violet | `#120E2E` / `#221A57` / `#3B2A8C` | Dark game stages (lock-in, Mark Sentence, 30-day box). |
| Day sky | sky, mint, lilac, peach | `#BFE6FF`, `#C4F1DC`, `#DDD3FF`, `#FFD3AE` | Bright game stages and Singapore scenes. |
| Buddy auras | pip / basil / momo | `#B9A6FF` / `#7FE3C4` / `#FFB38A` | One colour per buddy, for their disc, pick card and name tag. Never swapped, never used for anything else in a game screen. |

Blue vs orange was chosen so the two choices stay different for colour-blind viewers; a choice is also always marked by position
(left/right) and by its word, never by colour alone.

### The two modes
| | GAME mode (bright) | MICRO-WORLD mode (soft, glowing) |
|---|---|---|
| When | Cold open, dare, lock-ins, sorting, scoreboard, Mark Sentences, class trip, payoff | The first-person shrink journey (about 60 s) and any "inside it" moment |
| Background | Day: sky `#BFE6FF` to cream. Stage: radial `#4A36B0` to `#120E2E` | One hue family per world, lit from one side: leaf `#FFFDE0` → `#D4F27E` → `#2FA060` → `#0B5C4C` → `#062F33`. Water worlds use `#0D3547` teal; soil worlds `#6B4630` → `#2E1C1F` |
| Saturation, contrast | High; solid shapes; crisp shadows | Translucent layers (fills at 15 to 50% opacity), soft edges, glow |
| UI on screen | Logo pill, scoreboard, labels, buddies | Only the YOU tag and hands, one scale pill ("You: too small to see"), one caption. No scoreboard, no logo. Part labels only at the level that teaches them (see 7.9) |
| Motion | Snappy, bouncy | Slow drift; shots of 6 to 10 s; let it breathe |
| Sound | Music and game sounds | Ambient pad, soft water and air sounds, no ticking |
The switch between modes is always an event (section 10: the Shrink).

## 2. Shape language
- Everything is built from circles, ellipses and rounded rectangles. Corner radius is at least 1/8 of the short side; pills are
  fully round. No sharp spikes, no jagged edges, nothing frightening.
- Props are chunky and slightly "toy-like": big head-to-body ratio, 2 to 4 details each (see `teddy()`, `hamster()`, `robot()`).
- Real proportions where they teach (rule 9): a hamster is smaller than a teddy bear; a money plant leaf is heart-shaped with a
  pointed tip and yellow streaks; plant cells are box-like with a wall, round-cornered, packed side by side.
- Game objects (cards, gates, table) are tilted 1 to 3 degrees so the screen feels hand-placed; science diagrams are never tilted.

## 3. Outlines
- No black outlines. Each shape has a self-coloured line: a darker shade of its own fill (teddy fill `#DDA06C`, line `#7A4A2B`).
- Weight at 1920x1080: 5 px on hero props, 3 to 4 px on small props, none on background shapes (far plane has no lines at all).
- UI (pills, cards, bubbles) has no outline; depth comes from a soft shadow (`#drop`, `#dropS`) and a top highlight at 18 to 35% white.
- The buddies follow their rig (`characters/buddies.js`): soft grey-lavender line, as in the app.

## 4. Depth and parallax
Every scene has three planes, drawn back to front:
1. **Far**: hazy, low contrast, no outlines, blur 2 to 4 px (HDB blocks through the window, the tree line, the cells behind).
2. **Mid**: the subject, sharp, with ground shadows and a rim light.
3. **Near**: 1 or 2 dark, blurred shapes at the frame edge (school bag, chair, a leaf, a cell by the camera), blur 10 px, ink or the
   scene's deepest colour at 85 to 95%.
Parallax on any camera move: far 0.2x, mid 1x, near 1.6x. A slow push-in (scale 1.00 to 1.04 over the shot) is the default "alive"
camera; otherwise the camera is still (the teacher's guide: stable unless movement means something).

## 5. Lighting, glow and texture
- **One key light per scene**, and you can point to it: the window (bedroom), the sun (farm), the top skin of the leaf, the box's
  own light (30-day box), a stage spotlight (lock-in). Shadows fall away from it. Late-afternoon warmth is the home look.
- **Rim light** on mid-plane subjects: `#rim` (warm, `#FFE9A8`) in warm scenes, `#rimC` (cool, `#BFE6FF`) when lit by a screen or box.
- **Ground shadows**: soft ink ellipse at 20 to 30% (`groundShadow()`); long cast shadows only from the key light.
- **Glow means "this matters"**: the object in question, the timer, chloroplasts, the answer. Made with a blurred copy (10 to 30 px)
  under the shape, 50 to 95% opacity. Never more than two glowing things in a game frame.
- **Light shafts and dust** in beams: screen-blended warm polygons at 40 to 70% and 20 to 35 small cream dots.
- **Texture**: a fine film grain over everything (`grain()`, 12 to 16%, soft-light) and a gentle vignette (`vignette()`), so flat
  vector never looks like clip art. No paper or brush textures.
- One grade for the whole episode: the same grain, vignette and warm bias in every scene.

## 6. Typography
- **Display: Fredoka** (700 for titles and buttons, 600 for bubbles and labels, 500 for small notes). Round, friendly, matches
  the buddies. ALL CAPS only for one or two words (LIVING, LOCK IT IN!, DAY), always with wide letter-spacing (at 100 px use 14 px;
  without it Fredoka's capital I and V close up and "LIVING" is hard to read).
- **Reading: Atkinson Hyperlegible** (700) for every sentence a pupil must be able to copy: Mark Sentences, definitions, word boxes.
  It keeps I, l and 1 apart and is easy for early and dyslexic readers.
- Sizes at 1080p: Mark Sentence 96 px; question 62 px; choice word 72 to 104 px; bubble 36 to 46 px; label 32 px; nothing under 27 px.
- At most 12 words on screen at once outside a Mark Sentence card. Sentence case for sentences. British spelling.
- Key words in a sentence: a sun-yellow highlighter stroke behind the word (`.mark b`), never a colour change alone.
- Both fonts are open-licensed and bundled in `fonts/`.

## 7. Recurring screens (learn once, see every episode)

### 7.1 The lock-in (frame c)
- Dark stage, spotlight from above. Left card = choice 1 (blue), right card = choice 2 (orange); with three choices, three cards in
  a row (blue, orange, purple) with finger icons 1, 2, 3 instead of pointing hands.
- Each card: the answer word, big; a hand icon; a small "point LEFT" / "point RIGHT" (or "1 finger") pill.
- Centre: the thing in question inside the **ring timer**. Ring radius about 196 px, 30 px stroke, sun-yellow, drains
  anticlockwise from 12 o'clock over 5 to 6 s, with a soft glow; the seconds left in a sun disc at 6 o'clock. Track: white at 16%.
- Top: the question in 12 words or fewer, then "LOCK IT IN!" in sun-yellow.
- Bottom: the three buddies on their aura discs, each holding a face-down "?" pick card in their colour, and the line "The buddies
  lock in after you". Their cards flip only after the bell.
- At 0: a bell, the ring snaps shut, a sun-yellow stamp "LOCKED IN!" (Fredoka 700, tilted 6 degrees, one bounce), 10 frames of
  stillness, then the buddies' cards flip one at a time with their one-line reasons.
- The reveal lights the right card (glow, tick in leaf green) and dims the other to 45%. The other card is never crossed out.

### 7.2 Sort it: gates and the two-group table (frame d)
- Two arch gates in the choice colours with the group word on the arch; a soft chute from each gate to its column.
- Below: a paper table with two ruled columns, headers in the book's words ("Living things", "Non-living things"), each object with
  its name under it (one kind of label per row: the thing's name).
- An object drops through its gate with two fading ghosts and a dotted path, lands with a small squash, then its name fades in.
- A "+1" sun coin pops beside the gate and flies to the scoreboard.

### 7.3 The scoreboard: You vs the Buddies
- A dark ink pill, top right, always in the same place in game mode: `YOU [n]` on sun-yellow, "vs", `[n] BUDDIES` on lilac.
- A point: the number rolls up, the pill bumps (scale 1.0 to 1.12 to 1.0 in 8 frames), one coin sound. No point: nothing moves.
- Hidden in micro-world mode and during the silent cold open. Full-size (centre, 2.5x) only at the dare and the final score.

### 7.4 Right and wrong
- Right: leaf-green tick, glow, a small burst. Wrong idea: a ✗ at the START of the statement only, in ink on a paper chip; never a
  strike-through, never red flashing, never a sad buddy for more than a second. The buddy who was wrong says the right idea.

### 7.5 The Mark Sentence card (frame e)
- A cream paper card, tilted about 1 degree, sun-yellow spine on the left, a "✓ MARK SENTENCE" tab, "1 of 4" counter, the
  sentence in Atkinson 700 with highlighter on the key words, and a footer "Primary 3 Science · Diversity · Living and non-living
  things". Dark violet stage behind. One buddy on their disc: "Say it with me!"
- The sentence is the textbook's exact wording, word for word, and belongs to THIS episode (frame e uses EP1's 2.33: "Classification
  is the grouping of things based on their similarities and differences."; "Living things need water, food and air" is EP2's).
- Long sentences drop to 70 px; never below 64 px; never shortened to fit.
- Words appear as Heart says them; highlights sweep in on the key word; then 1 s of stillness. The cards return as a strip at the end.

### 7.6 The day counter and the 30-day box (frame f)
- A clear box on a desk in a dim room (bokeh behind), lit from inside; a teal lid with air holes (labelled with a plain line).
- **Day counter**, top left, always the same place: a flip-calendar tile, sun-yellow header "DAY", huge white number on ink, and
  under it 30 dots in three rows of ten (done = sun, today = larger, to come = white 22%) with "of 30".
- Day changes: the tile flips (6 frames), one soft "tock", the room light shifts (morning cool to evening warm).
- Time-lapse ghosts: where a living thing was on earlier days shows at 22% and 38% opacity (the seedling's height, the snail's
  path). Non-living things have no ghosts: that IS the lesson.
- Any animal in a box is shown cared for (air holes, food, water, returned at the end) and the script says so.

### 7.7 YOU (first-person)
- Two cream-peach hands at the bottom edge and a sun-yellow "YOU" pill; a faint sun-yellow edge glow marks "this is your view".
- A scale pill, top left, in Singapore-sized words ("You: the size of an ant", "You: too small to see").

### 7.8 Labels and diagrams
- A white pill with the part's name, joined to the part by one plain line that touches it. No arrowheads, no numbers.
- One kind of label per row (rule 10). Arrows only for motion, flow or direction.
- At most three labels on screen at once; each appears as it is named.

### 7.9 Level gate for the micro-world (nothing ahead of the syllabus)
- The micro-world may SHOW more than the level teaches (it is drawn true), but it only NAMES what the episode's level teaches.
- P3: the inside of a leaf is a beautiful place with no part labels and no "cell", "chloroplast", "nucleus" or "cell wall" on
  screen or in the voice; the caption is a wondering question ("Inside the money plant leaf. Is it alive?"). It also does not say
  the leaf is "making food" in EP1 (that belongs to a later episode).
- P5/P6: the same world with up to three part labels (`SHOW_P5_LABELS = true` in `frames/frames.js`).
- A caption never gives away the next lock-in or the next episode's Mark Sentence.

## 8. The buddies
- Pip (chinchilla, lilac aura), Basil (lizard, mint aura), Momo (cat, peach aura): soft chibi, as in the app. Use the SVG rigs in
  `characters/buddies.js` once approved; the style frames use the app paintings as placeholders. Never redraw or recolour them here.
- In game mode a buddy sits on their aura disc (radius 0.62 of their height) with a rim light; in a location (farm, void deck) no
  disc, a ground shadow instead.
- They look at the camera when they speak to you. Size: never smaller than 220 px tall at 1080p; never covering the science.
- Speech: white pill bubbles, Fredoka 600, 7 words or fewer.
- Heart, the host, is a voice; on screen she is the heart in the logo pill, which pulses gently when she speaks.

## 9. Singapore settings (drawn, but true)
| Setting | Must-have details | Light |
|---|---|---|
| HDB bedroom (frame a) | Window with grilles and a view of point blocks with coloured stripes; a ledge with a money plant; single bed; study desk; school bag by the door; wall clock | Late-afternoon sun through the window, dust in the beam |
| HDB corridor | Long common corridor, parapet wall, a row of doors with metal gates, shoe racks, potted plants, bamboo-pole laundry holders, bicycles | Side light from the open side; rain makes a good cold open |
| Void deck | Pillars with block numbers, round stone table with stools, letterboxes, a notice board, bicycles, a cat-safe corner; green field beyond | Cool shade inside, bright outside (frame it as a silhouette foreground) |
| School canteen | Stalls with signboards, long tables with attached round stools, tray-return rack, drinks stall, ceiling fans | Even, bright; steam and fans for motion |
| Kranji farm (frame g) | Vegetable beds in rows, a shed with a zinc roof, water tank, pump and hose, goats in a pen, hens, a tractor, coconut palms, a hazy tree line | Open sun, top right; blue sky with soft clouds |
Location pills ("Tampines, Singapore · 4.10 pm", "Class trip: Kranji countryside") name the place: ink pill, sun dot, white then
sun text. Use general place names; do not draw a real business's sign or logo. Check real details (plants, animals, buildings)
against photos before drawing.

## 10. Transitions
- **The Shrink** (game to micro-world): "Three! Two! One! Go!", then a 1.2 s push-in on the object while everything else blurs and
  the palette slides to the micro-world hue; the YOU hands rise into frame. The reverse (a pull-out with a soft pop) returns.
- **Colour wipe**: a round blob in the next scene's main colour grows from the point of interest (10 frames). The default.
- **Match cut** on a shape (clock face to timer ring, leaf to gate) once per episode at most.
- **Hard cut** for the silent cold open's end and the final "Now you know!".
- No spins, no page curls, no flashes.

## 11. Motion rules
- 30 fps. Every frame is a pure function of time (`render(t)`), no randomness without a fixed seed.
- Easing: ease-out for arrivals (0.3 to 0.4 s), a 6 to 10% overshoot and settle for game objects; micro-world motion is linear drift.
- Squash and stretch up to 15% on props; none on diagrams.
- Idle life: buddies breathe (2% scale, 3 s loop) and blink every 3 to 5 s; plants sway 1 to 2 degrees; dust and specks drift.
- **Nothing new moves while a teaching sentence is spoken** except the thing the sentence is about.
- Change something every 10 to 15 s; body shots 3 to 5 s; one or two long, quiet shots per episode (the micro-world).
- No flashing faster than 3 times a second; no shaking camera.

## 12. Sound palette
- **Theme and stings**: an original, short (under 4 s) marimba, ukulele and hand-clap motif in a major key; never anyone else's tune.
- **Game bed**: light, bouncy, about 100 to 110 bpm; drops out under teaching sentences and Mark Sentences.
- **Lock-in**: music ducks to a wood-block tick that speeds up over the last 3 s; a small bell at 0; a rubber-stamp thump for
  "Locked in!". The tick is soft (the P3 rule: soft ticks).
- **Points**: one coin "ting" for +1; a warm chord for a right answer; a gentle low "boop" (never a buzzer) for a wrong idea.
- **Micro-world**: a slow ambient pad with soft bell tones, close water and air sounds, no rhythm. One breath of silence before the reveal.
- **Places**: real Singapore ambience under scenes (koel and mynah calls, distant traffic, a ceiling fan, rain on a corridor, hens).
- **Voices**: Heart (host), Pip, Basil and Momo from the Character Voice Kit; voices are always the loudest thing.
- Day flip: one soft wooden "tock". Silence after a big line is allowed and encouraged.

## 13. The thumbnail system (1280x720)
One system, four types. Always: a saturated two-colour background from the palette, one buddy face (about a quarter of the height)
looking at the object, the logo pill small in a corner, at most three words in Fredoka 700 with an ink shadow, and nothing important
in the bottom-right corner (YouTube's time stamp). Check every thumbnail at 320 px wide.

| Type | Layout | Example (P3 EP1 and others) |
|---|---|---|
| **X vs Y** | Split down the middle, blue left and orange right, the two things in the same pose and size, a sun "VS" coin on the seam | Teddy bear vs hamster: "ALIVE?" |
| **Day 1 vs Day 30** | Split; the same box twice; the day-counter tile on each half ("DAY 1", "DAY 30"); the change is hidden or half-shown | The 30-day box: "DAY 30?" |
| **Big reveal object** | One object, huge, glowing, centre; a buddy at the edge, amazed | The sorting machine; the inside of a leaf |
| **Buddies' faces** | The three buddies, each holding a different pick card | "WHO'S RIGHT?" |
Words on thumbnails follow the positive-language rule and never state a wrong idea as a fact. Titles: the dare first, the topic
last ("Is Your Teddy Bear Alive? | Living and Non-living Things").

## 14. Channel identity
- **Logo pill**: ink pill, a sun disc with an ink heart, "TheOneApp" in white and ", Explained" in sun (`logoPill()`), top left in
  game mode at 86%; hidden in the cold open and the micro-world.
- **The signature things** a viewer should recognise in one second: violet and sun-yellow; the ring timer; the three aura discs;
  the hands with the YOU pill; the cream Mark Sentence card.
- **Opening**: no logo first. The silent cold open comes first (hook in 0 to 20 s); the logo pill slides in with the dare.
- **End**: Heart's "Now you know!" on a sun-yellow burst, then the end card on the violet stage.
- Banner and avatar: the sun-and-heart disc on violet; the three buddies on their discs.
- Running gag: a tiny cicak hidden in one scene per episode (drawn in ink2 at low contrast, never in the micro-world).

## 15. Do and don't
| Do | Don't |
|---|---|
| Use `P` colours and the kit's props and filters | Pick new hex values per scene |
| One subject, one key light, three planes | Fill every corner with detail |
| Exact textbook wording on cards | Shorten or reword a definition to fit |
| Label with one plain line touching the part | Arrowheads, numbers, floating labels |
| Keep buddies warm and good sports | Make one buddy "the one who is always wrong" |
| Learn principles from big channels | Copy any channel's characters, layouts, colours as a set, or music |

## 16. What changed from round 1 to round 2 (the self-critique)
1. (b) was a view up at the plant from the soil; it is now truly inside the leaf: tall cells with cell walls, one nucleus each and
   glowing chloroplasts, light from the top skin of the leaf. For P3 it carries no part labels and no "making food" caption
   (coordinator's accuracy note; see 7.9); the labelled P5/P6 version is one switch away.
2. (c) and (d): "LIVING" read as "LMNG" in tight Fredoka capitals; fixed with wide letter-spacing (now a typography rule). The
   buddies' note no longer overlaps their heads.
3. (d): the robot fell outside its gate and over the header; it now comes through the NON-LIVING gate and lands in its own slot,
   with a "+1" coin. Pip gives the reason ("It can't grow!") instead of a filler line.
4. (e): the card said "...air, food and water to stay alive", which is not the book's wording and is EP2's idea; it now shows EP1's
   classification sentence, word for word. The tab icon no longer covers the text.
5. (f): "air holes" was a floating label; it is now joined by a plain line.
6. (g): the scarecrow's cross eyes became dots (nothing that looks hurt); the speech bubble no longer covers it.
Still to do before production: swap the placeholder buddies for the approved rigs; a second polish pass on (b) (less haze, more
depth between the cell rows); thumbnail samples for the four types.
