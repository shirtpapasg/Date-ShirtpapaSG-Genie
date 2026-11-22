# EP12 v3: teacher's-eye review (22 Nov 2026, Opus) — awaiting the teacher's OK; NOT uploaded

Why: the teacher on the live v2 (vqSehdxTCg8 / D2U_Zom1Wzs): "Quality really dropped quite extensively" and "ALL these are important and you
did not make these mistakes when creating episode 1." Read before drawing: SERIES_FORMAT 1b, 1d, 4, 5, 6, 10 rule 6; EXPLAINED_PLAYBOOK;
EP01_vs_EP04_NOTES; ep01/NOTES_ROUND3; every image in `reference/`; EP1's contact sheets. Picture, layout, animation and sound only: every
word, timeline mark and sound cue is kept, except the ONE word change the teacher asked for (the hidden animal's fun fact, below).

Evidence (all in `qa/`): `teachers_eye_p1_old_new_ep1.jpg`, `teachers_eye_p2_old_new_ep1.jpg` (for each key scene: the OLD live still, the
NEW still and EP1's matching kind of scene side by side); `preview_p1_before_after.jpg`, `preview_p2_before_after.jpg` (labelled OLD/NEW
pairs); `preview_p1_clips.mp4`, `preview_p2_clips.mp4` (highlights, 720p); `countdown_p1.jpg`, `countdown_p2.jpg` (the ring's number in the
rendered video just before / just after every whole second).

## The 22 Nov rules, one by one (what was wrong in v2 -> what v3 does)

| # | Rule | v2 (live) | v3 |
|---|---|---|---|
| 1 | Buddies 1.5x, spread, balanced | Set buddies h 150/136/150 bunched in the bottom corners (Pip + Basil left), discs over the board | Set buddies h 225/205/225 (`canteen.js` `BUDL`), Pip left, Basil + Momo right with the props between; speakers in scenes 340-400 (Pip in `fabric`, Basil in `glass`/`fishnext`/`cliff`, Momo in `tankrow`/`metalans`/`bottleans`/`holdon`/`show`); goals reader 380, countdown buddies 400, score hand 330-390, read-along 280, chant 250 (two left, Momo right, board between), ending 280-290. The board's home moved (P1 x 1133) so no disc covers it; P2's small board is no longer set dressing in the wide car-park shots and the trolley moved right (x 330) clear of Pip's disc |
| 2 | No buddy ever frozen | Buddies sat in one pose for whole scenes while Heart spoke | `lib.js` `reactAt`: every buddy on screen reacts to every sentence anyone else says (pose swap with squash / hard cut / overshoot / hop, chosen from the sentence: question -> thinking, "not / break / knock" -> oops or surprised, "!" -> cheer or surprised, else pointing / arms crossed or a nod-hop), staggered .12 / .27 / .42 s so they never pop on the same frame, back to the talking sprite .3 s before their own line; breathing, sway and blinks always; lip-sync on every line |
| 3 | Camera pushes in on what a line names | Mostly static wide walkway / car park | `board` eases in on MATCH THE JOB as it arrives; `things` pushes in on the basket and the three things; `tankrow` glides onto the board as the fish tank's row hops on; `trolley`, `boot`, `waitw` keep their push-ins; look-closers push in; the hidden animal pushes in |
| 4 | Look-closers use the panel; a buddy's face peeks in and reacts | No buddy in any look-closer; trolley small in `lcjob` | A buddy's face peeks up from a lower corner of every look-closer (`v3.js` `lcPeek`): Momo in `lcjob` (gasps at the THUMP, points at the push, cheers on PURPOSE), Basil in `lcmetal` (shocked at CLANG!, rubs his head, cheers "No crack"), Momo in `lctank` in her back view watching the tank with us, turning round to gasp and to point at the dry shelf, Momo in `lcbottles` (gasps at the drop, cheers at the verdict), Basil in `lccar` (reacts to the palm, the press, the water, the knock). `lcjob` trolley 2.15 -> 2.4 and centred. No ghost overlaps |
| 5 | Boards keep one home, glide never jump | MATCH THE JOB jumped between (1220, .45), (1490, .5), (1440, .42) across consecutive walkway scenes | One walkway home (1133, 1034, .45) in `board`, `trolley`, `metalans`, `tankrow`, `waitw`, `pullout`; it slides in once (`boardIn`). Part 2: one home in `bottleans`; the board scenes (`board`, `chant`, `nyk`) are their own full-screen shots |
| 6 | Countdowns take the stage, animated as EP1 | Ring 196 px at the side over the dimmed set (HOLD ON! 150 px), clue labels 26-30 px, three discs + note pill + boards on screen | `lockN` (common.js), `holdon` (p1.js), `show` (p2.js): the blue starry stage only; ring R 215 (P2 Showdown 200) central, about half the frame height; clue labels 58 px (cap height about 41 px), on top of the frame with lines into it; ONE big buddy (h 390-400) leaning in, fidgeting (rock), hand-to-head in the last 1.5 s, gasping at the bell; the YOU hand bobs and counts 1-2-3 in step with the ticks; the ring pulses on every tick, drains one step a second ON the tick, the number pops as it changes, bell on 0, LOCKED IN! / HOLD ON! slams; the shelf slides aside. Then the stage makes room and the other two buddies pop in, flip their picks and swap pose on their reveal. Measured in the render: see "Countdowns measured" |
| 7 | One set of big numbered choice cards | Picture boards AND a separate "1 Glass / 2 Metal / 3 Fabric" card row (P1 `lasttime`, `metalans`; P2 `bottleans`, `dare`); P2 Round 1 cards had no pictures | `choiceCard3`: one big picture card per choice with its number badge on the corner (trolleys of glass / metal / fabric; the three bottles drawn big); verdict tags on the same cards (P2 `bottleans`: FOR SCHOOL / BREAKS EASILY / CANNOT SEE IN); on the picture boards (`lasttime`, `metalans`, `dare`) the badge sits ON the board and the card row is gone |
| 8 | Hidden animal: circle with a thick black ring, stage outside | Push-in onto a dimmed grey scene | `iris()` (common.js): after the smooth push-in lands, the iris closes in .5 s: the animal in a circle with a thick black ring, everything outside turns into the blue starry game stage; then the game objects pop. The reveal pushes in the same way, irises, and the yellow ring pops on its name |
| 9 | Nothing overlaps the shelf | "+1" coins and labels near the shelf | The shelf slides aside for every countdown (`SHELF_WIN`); coins moved clear (P1 `metalans` 1420, 300; HOLD ON! 1740, 330; P2 fix 1640, 360) |
| 10 | Four fingers and a thumb | The adult hand (trail.js `adultHand`) had three fingers and no thumb; the knocking fist had none | `adultHand`: four fingers (middle longest) and a thumb, used by every adult hand; the knocking fist shows four curled fingers and a thumb |
| 11 | Every sample named; tags point to their part; colour-coded | The bottles in the look-closer had no names; the car's chips floated free; Mark Sentence 2's part labels were not joined to the car | Each bottle carries its name (plastic / glass / metal); the car's four parts are colour-coded (tyres orange, seats violet, windscreen blue, body red): the part glows in its colour, its label, line and chip share it, in `lccar` (each close-up and the whole car) and under Mark Sentence 2 |
| 12 | Journeys: "You: ..." + the three buddies riding along | "You: a metal bar" small; no viewer presence; no buddies | "You: a metal bar" / "You: a drop of water" big in sun yellow; YOUR bar glows under you with a YOU tag (the drop's clear front edge in Part 2); Pip, Momo (back view, turning to react) and Basil ride along small at the edges (never over what is shown) and react at each stop |
| + | Feel the big moments (teacher, on the journey's "a hard knock") | A white pill "a hard knock" only | Every impact is felt: a camera jolt, a flash, a cartoon burst at the contact point timed to the sound (THUMP! rice, CLANG! / CLAAANG! the bay and its slow replay, BONK! the bottle, PUSH! / KNOCK! the car, SPLASH! the windscreen, THUMP! and CLANG! in the journey) and a buddy's face reacting big: in the journey Basil's face pops in shocked, rubs his head, then cheers with "No crack!"; Pip's face at the SPLASH |
| + | Back views (Momo, Basil) | — | Momo's back view where she looks into the scene with us: the tank look-closer, the bottles, riding in both journeys; she turns to a front pose (with the pop) to react; she never speaks in it |
| + | Fun fact at the reveal (the only word change) | "Tell someone at home." (about what?) | Basil: "Here's a fun fact! Mynahs build their nests from dry grass, twigs, string, and even bits of plastic!" / "Fun fact! A squirrel's nest has strong twigs outside and soft leaves inside. Different materials for different jobs!", each with a FUN FACT card of the nest, its materials labelled in colour as he names them; then Heart: "Tell someone at home!" |
| + | A living soundscape (teacher: "no sound effects of shoppers, laughter, bells") | Birds only | `song.js`: a place bed under every real-place scene, ducked under speech, crossfading: the walkway (shoppers murmuring, a child's laugh now and then, a trolley rattling past with footsteps, the checkout scanner's beep, the door chime), the aquarium shop (the filter bubbling and humming), the car park (wind in the rain tree, a car passing far off, children on the linkway; the birds as before); new foley: the boot's lid, the watering can's stream, the bag's bottles clinking; the impacts' thuds |

## Scene by scene (Part 1)
| Scene | Old -> new | EP1 match | 9-year-old on a phone |
|---|---|---|---|
| `lasttime` | three boards + a duplicate card row -> three boards bigger, number badge ON each, the board steps forward and glows as Heart says it | EP1 cold-open recap | clear |
| `board`, `game` | small corner discs -> 1.5x spread; the camera eases onto the board; push-in -> black-ringed circle on the stage | EP1 rules scene | the mynah is unmissable in its circle |
| `goals` | reader 250 -> 380, cards moved right | EP1 goals | clear |
| `count` | -> big buddies at the sides, each reacting to 3-2-1 | EP1 count | clear |
| `lcjob` | small trolley, no buddy -> bigger trolley, THUMP! with a jolt, Momo peeking and reacting | EP1 robot look-closer | the heavy load is felt |
| `mark1`, `mark2` | as approved (reader big left, card right) | EP13 approved Mark Sentence | clear |
| `r1` | small side ring, tiny labels -> the stage, ring central, 58 px labels, one big Basil, YOU counting | EP1 lock-in | clear |
| `lcmetal` | a label "a hard knock" only -> CLANG! burst + jolt, Basil shocked then rubbing his head; CLAAANG! in slow motion | EP1 robot spring | the knock is felt |
| `metalans` | duplicate card row -> badges on the boards, Momo cheers, board at home | EP1 answer | clear |
| `holdon` | 150 px ring over the walkway -> the stage, ring R 215, three 58 px labels, Momo big and reacting | EP1 Showdown ring | clear |
| `lctank` | no buddy -> Momo watching with us (back view), turning to gasp | EP1 bean time-lapse | clear |
| `shrink` | no viewer, no buddies, a pill for the knock -> YOU on your bar, riders, THUMP!, CLANG! + Basil's face + "No crack!" | EP1 "You: smaller than an ant" | felt and fun |
| `liz` | ring on a dimmed replay -> black-ringed circle on the stage + FUN FACT card with the nest | EP1 lizard reveal | something worth telling |
| `nyk` | discs 220 -> 290 | EP1 ending | clear |

## Scene by scene (Part 2)
| Scene | Old -> new | EP1 match | 9-year-old on a phone |
|---|---|---|---|
| `game` | push-in on a dimmed scene -> black-ringed circle on the stage; Basil and Momo 310 | EP1 rules | clear |
| `r1` | "1 Plastic / 2 Glass / 3 Metal" cards without pictures -> one set of big picture cards (the three bottles), badges, big ring, 58 px clues, Momo leaning in | EP1 lock-in | clear |
| `lcbottles` | unnamed bottles, no buddy -> each bottle named, BONK! on the drop, Momo peeking (gasp, cheer) | EP1 look-closer | clear |
| `bottleans` | duplicate card row -> the same picture cards with verdict tags, Momo 380 | EP1 answer | clear |
| `lccar` | white labels, chips floating -> colour-coded part + label + line + chip, PUSH! / KNOCK! felt, Basil peeking | — | each part is linked |
| `mark2` | part labels not joined -> colour-coded tags joined to the car's parts | — | clear |
| `shrink` | no viewer, no buddies -> YOU in the drop, riders, SPLASH! + Pip's face | EP1 journey | clear |
| `show` | small ring over the car park, Basil + Pip waiting -> the stage, the notes big, ring R 200, Momo fidgeting; Basil and Pip join after the bell | EP1 Showdown | clear |
| `chant` | discs 165 in a corner -> 250, two left and Momo right, the board between | EP1 chant | clear |
| `liz`, `dare` | dimmed replay; duplicate card row -> circle + FUN FACT (squirrel's nest); badges on the bag boards | EP1 reveal / dare | clear |

## Countdowns measured (in the rendered video)
(filled in after the render: see below)

## Not done / left for the teacher
- Pip's back view is not used (not yet delivered); Basil's back view arrived late and is not used in EP12 (Momo's is).
- A human should listen to the new place beds (levels were measured, not heard) and to Basil's two fun-fact lines.
