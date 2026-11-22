# EP12 teacher's-eye review (22 Nov 2026, Opus; not the drawing agent)

What was reviewed: the teacher's two fixes drawn by Fable in commit 3cfc1dd (the MATCH THE JOB board is now a supermarket trolley;
the hidden-animal intro and reveal are one push-in from the real place). Looked at full-resolution stills of every changed scene
(`node stills.js`), `qa/trolley_board/` (67 before/after pairs, `check_320px.jpg`, the four strips) and dense frames around every
transition, judged against SERIES_FORMAT section 4 (hidden-animal smooth push-in), sections 5-7, section 10 rule 6 and EP01_vs_EP04_NOTES.
No timeline mark, word or sound cue was moved by the fixes below (picture only: `common.js`, `p1.js`, `p2.js`).

## 1. The trolley board
| # | Where | Note | Done |
|---|---|---|---|
| 1 | P1 `nyk` (303-315 s) | Reads clearly as a trolley: red grip on its handle, wire basket, two wheels standing on the floor, the chart clipped to the basket's side; centred between Pip and Momo / Basil, behind no disc; words 27-29 px. Good. | OK |
| 2 | P1 walkway shots (`board`, `metalans`, `tankrow`, `cliff`) | Set dressing at .45: a trolley on its wheels on the tiles, not floating; never behind a disc. | OK |
| 3 | P2 car park (`place`, `game` start, `boot`, `waitw`, `liz`) | **Momo's disc touched the trolley's right wheel**, and the trolley's red grip poked into the metal bottle on the folding table (it read as a red band on the bottle). | **Fixed:** the car-park trolley a little smaller and further back (`BDS` .32 -> .30, `BDX` 1640 -> 1660, `BDY` PGROUND + 24 -> PGROUND - 12): grip 15 px clear of the bottle, wheels about 30 px above Momo's disc. |
| 4 | P2 `chant` (240.6-262.4 s) | Chart words about 18 px: not readable on a phone. | **Fixed:** chart .68 -> .88 (words about 23-24 px, the seven rows read at 1080p); discs smaller in the bottom-left corner (bh 200 -> 165, x 100 / 305 / 510); chant lines a little higher (y 185, 92 apart) so the trolley's grip clears line 3's highlight; YOU hands and YOUR TURN! above the chart (1100, 300, scale .8; `chantScene` takes `o.ts`); "Say it with us!" bubble over the discs. The PURPOSE / PROPERTY / MATERIAL flashes and the green SUITABLE tag still show on their lines. |
| 5 | P2 `nyk` (303.1-314.8 s) | Chart words about 21 px. | **Fixed:** trolley .78 -> .90 (words about 24-25 px), centred at 880; Pip 110, Momo 1625, Basil 1820 (bh 200; the basket clears Momo's disc by about 20 px); YOU hands at 110 clear of the basket; "Say it with us!" at y 330 above the trolley. "Ready?", "2" and "Now you know!" sit above the basket. |
| 6 | P2 `board` (230.9-240.6 s) | Words 23-25 px under the two book lines: readable at 1080p; the squirrel's tail peeks over the chart top (it lives on that branch: fine). | OK, unchanged |
| 7 | P1 `waitw` (238-240 s), P2 `boot` / `waitw` | During the camera's push towards the trolley bar / the watering can, the board is cut by the frame's right edge and Momo's disc sits over its right rim corner for about 2 s (camera framing; the old whiteboard did the same). | Noted, not changed (minor, background; the discs fade on the dive) |

## 2. The hidden-animal moments (push-in, reveal)
| # | Where | Note | Done |
|---|---|---|---|
| 8 | P1 `game` (27.3 s) | One smooth push-in from the walkway (title words slip away in .3 s), lands on the mynah; score pill glides to the middle; YOU hands, buddy discs, "a little mynah" label, "Can you spot it?" pop in one after another. No cut. Good. | OK |
| 9 | P1 `game` | The small lock-in ring timer (on "lock in") sat on top of the TROLLEYS sign's first letters; the score hand covered the "T" of TROLLEYS; "+1" sat on the sign's corner; "Can you spot it?" touched the mynah's beak. | **Fixed:** the mynah lands at x 1400 (was 1330) so the whole sign clears the score hand; the lock ring sits left of the answer hand (200, 470); "+1" in the clear above the score hand (880, 470); "Can you spot it?" at (1730, 430). |
| 10 | P2 `game` (11.6 s) | Smooth push-in on the squirrel; ring timer with the hand, "You lock in first", Basil and Momo discs, "a little squirrel", "Can you spot it?" all clear of each other. | OK |
| 11 | Both reveals (`liz`) | The score-hand picture melts into the real place (.45 s), the camera pushes in, the ring pops on the animal's name with a sparkle; "It was on ..." and "Tell someone at home!" readable. P2's `dare` pulls back from the branch with no jump (checked frame by frame 275.5-276.1 s: same squirrel position, same zoom on the first frame). | OK |
| 12 | Cuts that stay | game -> goals (both parts), P1 reveal -> key-word recap: card screens, not the real place (as the rule allows). | OK |

## 3. General
- No orphan labels found (every YOU tag stands with its hands; every pill with its thing). No 2-3 word spoken fragments were added (no words changed).
- `check_320px.jpg`: P1 `nyk` reads at phone size; P2's seven-row chart is still small at 320 px in any layout (it is a summary table), but the
  P2 `board` scene reads it aloud row by row at 1080p and the chant / ending charts are now about 24 px instead of 18-21 px.
- Left for the teacher (unchanged from Stage 3): listen to Pip's read-along "Use." and Heart's "fragile" once.
