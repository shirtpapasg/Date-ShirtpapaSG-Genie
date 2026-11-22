# EP13 Part 1: the teacher's-eye review and redo (22 Nov 2026)

The teacher, after watching EP12/EP13: "ALL these are important and you did not make these mistakes when creating episode 1." Then, on Part 1:
"Pip is basically not doing anything here", "the '+1' arms crossed is covered by the keyword 'Intended use'", "the countdown timer rhythm is off!",
"I no longer see the animation on the countdown, nor the interactive pet buddies' reactions", "human has 4 fingers and a thumb", "'plastic' on the
darker material and 'fabric' for the orange material", "Which is flexible, strong and waterproof? Where's the arrows, or ... colour coding",
"Can we bring the 3 pet buddies along? Or even include the audience", "there's raining sound during episode 1 ... no sound effects", and "It must
be a fun fact which most children are shocked to find out!" ("Basic"). This file records how each still was judged against EP1
(`ep01/sheet_part1.png`, `ep01/ep01_part1.mp4`) and the old live EP13 (`out/ep13_part1_OLD.mp4`, YouTube FO1Y_KSZU-c), what was changed, and what is
still weaker than EP1. **Not uploaded: the teacher sees the preview first.**

Preview for the teacher: `qa/preview_p1_before_after.jpg` (12 pairs, old left / new right, with times), `qa/preview_p1_countdown_vs_ep1.jpg`
(EP1's robot countdown next to the new Round 1 and HOLD ON!), `qa/preview_p1_clips.mp4` (76 s, 720p). Full new part: `ep13_part1.mp4` (not in git).

## What was wrong (old) and what is done (new), rule by rule

| # | Rule (22 Nov) | Old EP13 Part 1 (live) | New |
|---|---|---|---|
| 1 | Buddies 1.5x, spread, nothing in a corner, nothing behind a disc | three discs ~120 px tall bunched at the lower left of every classroom shot; Pip 300 px in HOLD ON! | every classroom shot has the buddies 1.4-1.5x (speaker 400-450 px) spread across the frame (slots left / right of centre / right); the board top left, the bag at the right end of the table between them; game, goals, countdown, Round 1, answer, engineers, wet floor, draw, pipfix, waitw, score hand, read-along, ending all enlarged |
| 2 | The camera goes to what is talked about | OUR DESIGN PLAN slid in small at the bottom right; the plan scene stayed wide | "plan": OUR DESIGN PLAN is introduced BIG (0.8 scale, centre right) with Basil big beside it (he watches it from behind - his back view - then turns and cheers); the cliffhanger pushes in to THEN: TEST IT, then to the new strap and its ?; the draw scene pushes in to the paper; look-closers push in on each part |
| 3 | Look-closers use the whole panel; plan large; each part its own moment; a buddy face reacts; no ghost overlap | the bag look-closer had a thumbnail board top left, the bag on one side and empty cream; the lit part was shown with the rest of the bag 28 % see-through (the chair showing through: the "ghost") | `bagArt2`: OUR DESIGN PLAN large at its home (top left, about half the panel); the bag acts on the right; each part (straps, body, zip, base) and each use gets a smooth push-in (1.45x / 1.3x), the part lit, its name BIG (76 px, in the part's own colour) with one line to it; the other parts are greyed but OPAQUE (filter `dimF`, no see-through); Basil's face peeks in at the lower left and reacts (arms crossed, surprised at the hang, cheer on each part, nods). Straps (approved look kept): Pip's face peeks in (thinking -> pointing -> gasp at the lift -> nod at "no tear"). Drawing: Pip's face at the lower right, ducking away while the samples are on that side |
| 4 | Board keeps ONE home; glides, never jumps | top left (thumbnail) in the look-closer, bottom right in the next scene | HOME = top left (in front of the whiteboard, `HOME = [560, 540, .52]`) in every classroom scene and inside the look-closers; it glides from the push-in (plan) to HOME as the bag look-closer opens, and in the drawing look-closer it glides into the corner while the pencil draws and glides back home before the cut (no jump at any cut) |
| 5 | Countdowns take the stage | HOLD ON!: a 150 px ring on the dimmed classroom with the board and 26 px labels; Round 1: the ring at the side, scaled to 0.74 | Round 1 and HOLD ON!: the blue starry stage, the ring 1.2-1.25x (about half the frame height), the picture in it, clue labels Fredoka 60 (cap height about 42 px) ON the frame, only the question, the cards (Round 1) and ONE big reacting buddy (Basil / Pip); the background dissolves to the stage and back (no cut) |
| 6 | One set of big numbered picture cards | EP12's small pink-bag boards + a second row of 1/2/3 cards ("lockin_cards_duplicated") | `strapCard`: ONE card per choice, the strap itself drawn big (woven fabric / steel bar / wooden stick), the number badge on its corner, the word under it; used in "Last time", Round 1 and the answer, with SUITABLE / NOT FOR THIS JOB on the same cards |
| 7 | Hidden butterfly: push-in -> black-ringed circle on the blue stage -> game pops; the reveal the same | a hard cut to a separate game screen | `circleShot` (EP12 v2's `pushCam` + the 22 Nov circle): from the dimmed title classroom ONE push-in (1.2 s) onto the butterfly; the stage closes round it into a circle with a 22 px black ring; then the label, the score pill, the YOU hands and the buddies pop. The reveal: the score hand melts into the classroom, the same push-in and circle, the yellow ring on its name, then Momo's fun fact |

## The teacher's later notes (all fixed in Part 1)

- **Pip alive in HOLD ON!** (and every buddy on every beat): Pip cheers as he says it, points at the board, cheers hopefully and leans in on every
  beat of the countdown (a small hop on each whole second), goes "oops" exactly at 0 when the class crosses its arms, then surprised at "Each part
  has its own use" and a good-sport wave and nod. Every other scene's buddies swap poses on their beats (thinking / surprised / cheer / nod),
  none stands frozen; Round 1's Basil fidgets (rocks and hops on the beat) through the countdown, then each buddy reacts to the others' picks.
- **+1 coin never over the shelf:** the coins sit low and away from the key-word shelf (HOLD ON! at (1660, 470), the answer at (820, 850)).
- **Countdown rhythm (measured in the rendered file, `measure_ring.py`, `qa/ring_check_p1.txt`, `qa/ring_badges_p1.png`):** the cause was the
  game bed (104 bpm kicks and claps) playing on under the 1 s ticks in both rings, and Round 1's 3 s ring ticking twice a second from its first
  second. Now the bed rests from 0.25 s before each ring to after "Locked in!" / "One finger up!", every ring's first second is one plain tick
  (`ringTicks`), the ticks are heard within 5 ms of their plan, the number changes ON each whole-second tick (frames 40 ms either side checked:
  3 -> 2 -> 1 -> 0; 5 -> 4 -> 3 -> 2 -> 1 -> 0), "0" only shows when the ring is empty, and LOCKED IN! / ARMS CROSSED! slam in ON the bell (the stamp
  sound moved to the bell too).
- **The countdown animation and the reactions (vs EP1):** EP1's `lockScene` and EP13's `lockN` share the same engine (`ringTimer`, `buddy`,
  `stamp` are byte-identical), so nothing was lost in code; it was lost in the use: EP1 put the ring in the centre with the moving robot inside
  it and pulsed BOTH choice cards on every tick, the YOU hand swung between the choices, the buddies sat in a row reacting; EP13 pushed the ring to
  the side and shrank it, kept the picture still, cycled the card glow every 0.5 s regardless of the ticks, let the groove fight the ticks, sat
  HOLD ON!'s Pip still and landed the stamp 0.7 s after the bell. Restored in `bigRing` (p1v2.js / v2common.js): the ring pulses on every tick and
  the number pops on each whole second with a white flash ring; the card highlight steps ON the ticks; the YOU hand bobs on every tick; one big
  buddy fidgets on the beat; the stamp lands on 0. Side by side: `qa/preview_p1_countdown_vs_ep1.jpg`.
- **Four fingers and a thumb:** `trail.js adultHand` (every adult hand: the pencil hand, the hands that lift / zip / hang / set down, the dropper
  hand) now has four fingers and a thumb; the YOU hands (`countHand`) already had them. (EP12/EP14 have their own copies: not touched.)
- **Samples named:** "plastic", "fabric", "metal zip", "fabric" under each sample in the drawing look-closer (Fredoka 46, as the drawing's labels),
  and "fabric", "plastic", "metal zip" under the samples in Mark Sentence 2's recap.
- **Colour coding:** `PARTC` (straps violet, zip pink, body amber-brown, base slate; never the answer green / blue or the YOU yellow): each part of
  the drawing is outlined in its colour as its label appears, the label's part word in the same colour; every property chip sits in its part's
  row, outlined in the part's colour, with a line to the part (`partChip`). No free-floating chips left: the strap look-closer's chips stay next to
  "no tear" / the fabric strap they name; Mark Sentence 1's recap chips sit under the fabric strap.
- **Journey with the buddies and the viewer:** "You: a book" (as before) plus your own red bookmark ribbon hanging from your cover; the three
  buddies, small, ride on your book's top edge (Momo from behind, looking up with you): they hold on as the zip closes, wobble as the bag lifts,
  cheer when the straps go tight; in the cut-away they peek over the books, your book is labelled "you", they gasp at the water and cheer at
  WATERPROOF.
- **Fun fact at the reveal (the one word change):** Momo, after "It was on the plant by the window!": "Wow! Butterfly wings are covered in tiny
  scales, like little tiles. Water rolls off, so the wings stay dry!" (true: Lepidoptera = "scale wings"; the scales make the wing water-repellent),
  with a magnifier of the tile-like scales and a drop rolling off ("tiny scales", "water rolls off"); then Heart: "Tell someone at home!".
  script.py and `p3_ep13_script.md` section 12 updated. **Part 1 is now 5:22.2 (was 5:14.8).**
- **Back views:** Basil watches OUR DESIGN PLAN slide in from behind (then turns and cheers); Momo watches the butterfly's circle from behind
  before she turns to say her fact; Momo rides in the bag from behind. Never while speaking.
- **Living soundscape (both parts):** a classroom bed under every classroom scene (the ceiling fans' whirr `hum.wav`, children far down the
  corridor `ep05_kids.wav`, birds beyond the louvres, a laugh now and then `ep05_laugh.wav`, a far school bell), ducked under every voice; the
  existing foley (books' thups, the zip, the clip, the pencil's scribble, plip / pff drops, the hop of each tile) kept. Mix -16.0 LUFS.

## Still weaker than EP1 (honest list)

- The score-hand and Round 1 reveal still have two discs touching (Basil and Momo at the right): spread, but not as airy as EP1's lock-in row.
- Round 1's speech bubbles sit over the bottom of the cards for the 2-3 s each buddy speaks.
- The read-along's buddies are 1.25-1.45x (250-290 px), not a full 1.5x, so the three words stay the biggest thing.
- The journey's buddies are small on purpose (the view must still read).
- The game scene's three buddies overlap a little at the lower right (the circle, the score and the YOU hands need the rest of the frame).
- The cold open's Basil overlaps the right end of the teacher's table (not the bag).

## Checks done
Stills of every scene (old live frames vs new, `make_preview.py`), the whole part scanned every 1.5 s for page errors (none), captions 143 cues
with no overlaps, -16.0 LUFS, the two rings measured in the rendered file (above).
