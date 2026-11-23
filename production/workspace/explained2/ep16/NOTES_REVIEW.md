# EP16 · teacher's-eye review (Stage 2 self-check, 23 Nov 2026)

How: stills at the middle of EVERY spoken line of both parts (qa/rv1a, rv1b, rv2a, rv2b: 57 + 51 frames from the page, which is what the
renderer draws), contact sheets of every scene (qa/p1a-p1e, p2a-p2d), the pose audit (pose_audit.js: every buddy pose on screen, 60 + 49
moments, each checked against SERIES_FORMAT 5's one-job-per-pose table; reasons in pose_reasons.json), then the rendered files themselves
(sheet_part1/2.png, the countdown measurements, qa/ep1_compare_p1/2.jpg). Judged the way the teacher judged EP1 and EP13-EP15: would a
9-year-old on a phone see what matters?

## Round 1 (on the drawn scenes, before the render): found and fixed

| # | Where | Found | Fix |
|---|---|---|---|
| 1 | P1 lceggs | The book strip (Heart's three sentences) was ONE line 3,700 px wide (lcStrip), running off both sides; the small print sat on top of its first words | Two-line strip15 (maxW 1500); the small print moved to the bottom right, under the panel |
| 2 | P1 lceggs | JELLY-LIKE COVERING popped at the top right, over the strip | lib.js KW o.at moved to (960, 470), under the strip |
| 3 | P1 lceggs | "stays wet" label cut off at the panel's left edge and under Basil's bubble | moved to the right of the clump, pointing at the top eggs |
| 4 | P1 lceggs / lcchick, P2 lcskin | The guessing buddy's face (Momo / Basil / Momo) went back to "thinking" after its OOPS (OUTCOMES lasts 4 s) | the extra face leaves 3.9 s after the reveal line |
| 5 | P1 lceggs | Pip thinking for 11 s, through Heart's whole answer | thinking only until "protects" (the answer has come) |
| 6 | P1 pond | Momo's idea bubble showed baby FROGS beside the mother frog | baby TADPOLES in a little puddle beside her (her idea: babies, like kittens) |
| 7 | P1 frogans | The tadpole caption card hid behind Basil and Pip; the frog panel looked empty; "does not look like the adult" ran past the card | smaller card at (1000, 570); Basil and Pip moved right; labels inside the card; the three dare cards fade under the strip |
| 8 | P1 holdon / ring | Momo and Basil stood in front of Pip's easel; Pip cut off at the right edge in `ring` | easel moved left (1000); the loop board's home moved to x 1150; Momo / Pip at 1640 / 1810 |
| 9 | P1 holdon | "+1 arms crossed" coin covered Momo's head as she came in | coin moved up (1420, 470) |
| 10 | P1 lcchick | Part labels cut at the top during the CHICK push-in; the 2x2's pills ran past the panel's right edge; Basil's face covered the tadpole | labels leave before the push-in; the 2x2 shifted right, pills above each arrow |
| 11 | P1 / P2 liz | The reveal's question pill and the fun-fact bubble overlapped; the extra buddy (Basil / Momo + Pip) at the left was drawn UNDER the iris stage (invisible) and popped in after its own surprise | the buddies drawn after lizReveal, popping in .6 s after the scene starts; question pill at (900, 720), bubble at (1300, 860), panel shorter |
| 12 | P1 / P2 liz | The fun-fact buddy showed "surprised" AFTER its own line (a pose with no reason) | listens (sit) |
| 13 | P1 cliff | The grasshopper and its empty skin were hidden behind Basil and Pip; the skin barely visible | blades moved to the middle (x 820 / 1060), bigger (k .74), the skin less transparent (.82), the ? on the skin |
| 14 | P1 journey | The tail and back legs read as brown sticks; out of the water the frog's feet were hidden by the back legs | olive tail with a see-through fin and "your tail"; legs with webbed feet; out of the water only two green frog feet on a giant lily pad ("your frog feet"); a real bench as a building |
| 15 | P2 lasttime | Stage 1's marks gave the frog board only 1.2 s ("pic2" at "tadpole") | script.py: pic2 at "It", pic3 at "Then" (3.5 s / 3.3 s / 3.2 s); picture 2 is the 2x2 (chick looks like the hen, the tadpole does not look like the frog) |
| 16 | P2 show | l3 (the third line lighting) was on the FIRST "three" (before line 2) | script.py kw ["l3", "three", 1] |
| 17 | P2 show | Pip pointing through the whole countdown (his pointing after his line overrode "worried"); waving for 8 s | waving 2.2 s (hello), worried through the ring, listens after the bell |
| 18 | P2 show / fix | Basil and Momo overlapped each other; the egg-case circle sat on the sheet | sheet at x 860; Basil 1500 / 1530, Momo 1790 / 1800, both h 360; the circle at (1480, 520) |
| 19 | P2 lcnymph | "six legs" label under the LOOK CLOSER tag; bubble over the "two feelers" label | labels lower, the camera beat for "legs" level; bubbles at the upper left |
| 20 | P2 lcskin | The skin was too big and cropped; "empty feelers" off the top; the split's magnifier label under Momo's face | skin k 2.4, labels placed from its real geometry (the split on its back, the feeler tips, a foot) |
| 21 | P2 journey | The blade of grass read as a green mountain; your legs hardly visible | the blade has raised darker edges and veins running to its tip; thicker front legs; a "your front legs and feelers" tag |
| 22 | P2 moult | The skin and the grasshopper small between the buddies | both bigger (k 1.05 / 1.15), camera 1.35-1.45 |
| 23 | Engine (from EP15's redo) | count, Mark Sentence, score hand and "Now you know!" used EP15's older poses / sizes | EP15's fixes ported: one size at one depth (420 / 430), the reader points at the card only in the pause before reading, no waving at the start of "Now you know!" |

## Round 2 (on the rendered files: sheet_part1/2.png, buddy_faces_p1/p2.jpg, the countdown measurements): found and fixed

| # | Where | Found | Fix (re-rendered: only the 10 s chunks that changed, rejoined frame-exactly by render.js, same mix) |
|---|---|---|---|
| 24 | P1 frogans | The pick cards (3, 1) sat over Basil's and Pip's faces; the little frog Heart talks about hid behind Basil | pick cards and their x / tick chips above the heads; the frog on a lily pad in the middle (1120, 884), the camera pushes to it |
| 25 | P1 lceggs, lcchick, liz, holdon | The first render was taken before round 1's pose fixes (4, 5, 11, 12) and the moved "+1" coin | those spans re-rendered |
| 26 | P2 nymphans | Pip's pick card over Momo's cheek; Momo's card on her own edge | both above the heads |
| 27 | P2 show | Basil's and Momo's pick cards between their faces; their bubbles over line 3 of the sheet | Basil's card at his left, Momo's above her head; the reveal bubbles above the sheet |
| 28 | Both | Countdowns measured in the rendered files: every number steps 1.000 s, with the ticks; the bell lands on 0 (P1 Round 1 61.134, HOLD ON! 193.895; P2 Round 1 49.329, Showdown 219.412) | nothing to fix |

## Checked and fine
- Every speaking buddy is in its talking sprite; listeners mostly listen; strong poses (cheer, surprised) at most about once a minute per
  buddy, each with its reason (pose_reasons.json); OOPS / ARMS CROSSED only from OUTCOMES at the reveals.
- Buddies in proportion: Basil x .94 everywhere; same depth = same size (count, score hand, Now you know 420-440; mid-ground 350-400, front
  500-540); nobody cropped by the frame edge except the peeking faces (by design).
- Countdowns take the stage (blue stage, ring 430 px, clue labels 54 px on top of the ring, one big buddy worried); only ticks and the bell
  under them (the beds and one-shots pause).
- Look-closers fill the panel, a buddy face peeks in and reacts, one verdict each, small print in the frame.
- Hidden animals never back at their intro spot: tree frog intro on the big leaf (cold, back, title, game), then a reed (pond), a lily pad
  (waitw), the bench's back rail (frogans), the easel's top (holdon), the flower pot (ring), the planter wall (hen), the TAP (reveal).
  Mantis intro on the cosmos stem (place, game), then a grass stem behind Pip (nymphans), the planter's lemongrass (skin), a weed at the
  edge (waitw), a hibiscus flower (moult), the easel's leg (show), the easel's top (fix), the lime pot's rim (dare), the SUNFLOWER (reveal).
  Neither is on screen in a look-closer, a journey or a countdown.
- Every book strip is read aloud by Heart (e608, e805, f1107); every picture card is labelled; tags joined to what they describe; hands
  four fingers and a thumb (the engine's YOU hands).

## Still weak (for the teacher)
- The nymph journey's blade of grass is simple (a green road to a point); the riders are small on the bottom edge.
- The hen and chicks in the wide grass shot are smallish (the hen ~25% of the frame, chicks ~9%); the look-closer shows them big.
- The cockroach drawings are deliberately simple (Pip's homework).
