"""make_todo.py: tl_p1.json + tl_p2.json + the staging below -> SCENES_TODO.md (the artist's list for Stage 2 of EP16).
  python3 make_todo.py      Re-run after any timeline change, so the times in the list are always the timeline's.
Each scene: what to draw, the frame (who stands where, how big, the main prop), the camera, a pose for every line WITH ITS REASON (the
one-job-per-pose table, SERIES_FORMAT 5, 23 Nov: a pose with no reason is replaced by listening), where the hidden animal is (a new spot in
every scene, never the intro spot again), the small life in the background, the light, the place's ambience and foley ON the marks, the
marks (from the timeline) and the lines with their times."""
import json, os
H = os.path.dirname(os.path.abspath(__file__))
fm = lambda t: f"{int(t // 60)}:{t % 60:04.1f}"
POND = "the community garden's pond side (`VP(t, o)`; bake the static parts as `BG.pond16`)"
GRASS = "the garden's grassy corner by the void deck (`VG16(t, o)`; bake as `BG.grass16`)"
CARD = "A card screen (EP1's stage): keep the stage's warm spotlight and the soft bokeh drifting."
LCF = "WIRED: `lcPH` (tests.js) inside the real `lookCloser` frame (closer.js). Stage 2 replaces `lcPH` with `lookCloser(t, s, { tz, fx, fy, art, set, verdict, tv, over })` and draws `art(t)` (centred on 0, 0 inside +-830 x +-395; keep the bottom 80 px for the verdict), keeping the wired `over`. The thing FILLS the panel; each named part gets its own push-in and a big label; the speaking buddy's FACE peeks in from a lower corner (closer.js `lcPeekAuto`, wired) and reacts. Models: ../ep15/garden15.js `adultArt` and ../ep15/home15.js `seedArt`, ep13 straps (`../reference/lookcloser_good_ep13_straps.webp`)."
LISTEN = "listening (smile, blinks, a small nod): nothing in the line asks for a pose"
# name: (title, draw, frame, camera, poses {line id: "pose: who does what (reason: ...)"}, hidden, life, light, sound)
P1 = {
 "cold": ("1 · Silent cold open: the garden pond at dawn (no voice)",
   "EP15's community garden beside the HDB block, dawn just after rain (the void deck behind, planter beds, the bench, the old mango tree at the edge). The little POND fills most of the frame: lily pads, a reed clump, a big elephant-ear leaf leaning over the water. Among the lily pads a CLUMP OF FROG EGGS (clear jelly with dark dots, half under the surface). `wriggle`: three tadpoles (round bodies, long tails, NO legs) wriggle past the clump. `cardsIn`: EP15's three dare cards slide in low along the pond's edge (WIRED, real art from `ep15dare.js`). `budsIn`: the buddies pop in. Location pill *A community garden, Singapore · dawn*.",
   "Basil at the right on a flat stone by the water (h ~470 after SIZE_K .94), nose to the pond; Momo at the left on the bench end (h ~380); Pip centre-left on the grass (h ~340). Same depth = same size; the bench end is further back, so Momo is a little smaller.",
   "One slow push towards the egg clump over 6 s; no cut.",
   {"*": "Basil: sit, a happy wiggle (reason: he arrives at a pond he likes; no strong pose). Momo: thinking, leaning in (reason: a real question: what is in the jelly?). Pip: waving as he pops in (reason: hello)."},
   "Tree frog: on the big elephant-ear leaf leaning over the pond (small, brown with pale stripes, toe pads). This is BEFORE the game: the game's push-in goes here, and after that it is never shown here again.",
   "Frogs calling, fading as the light comes; drips fall from the leaves; ripples as the tadpoles pass; a dragonfly; birds waking.", "Dawn after rain: cool blue light turning gold from the right, wet shine on the leaves and stones, a little mist on the water.",
   "Pond bed (R.garden + a frog chorus that fades over 6 s); drips; a soft ripple ON `wriggle`; three card slides ON `cardsIn` (wired); three pops ON `budsIn` (wired). No music."),
 "lasttime": ("2 · \"Last time...\": EP15's dare (ONE calm picture)", "WIRED with EP15's three real dare cards (fish, frog, lizard) and the numbered cards 1 A fish · 2 A frog · 3 A lizard; each card steps forward while Heart says it (>= 2.5 s each), the ? on \"What\", the label *What will the tadpole grow into?*. Draw nothing new (optional: the fish's tail flicks, the frog blinks, the lizard's tail curls, once each on their word).", "No buddies (the calm recap).", "The wired gentle push-in (x1.04 over 8 s).", {}, "Not in this picture.", "The cards' animals: one small move each on their word.", CARD, "Wired: a soft pop per card; calm bed."),
 "back": ("2 · Back at the pond", "The pond (the cold open's set); a tadpole wriggles past the camera; EP15's three cards by the water's edge (wired); pill *Hold on to your answer!* (wired).", "Basil at the right (h ~470), Momo left (h ~380), Pip left-centre (h ~340).", "A slow drift along the water that continues under the title.",
   {"e204": "Pip: hides three fingers behind his back with a small hop, then sit (reason: keeping his answer secret is the line's own game; no pose needed beyond the hop). Basil, Momo: " + LISTEN + "."},
   "Tree frog: on the big leaf (as `cold`: the same shot continues, still before the game).", "Drips, ripples, a tadpole passing.", "As the cold open, a touch brighter.", "Pond bed continues."),
 "title": ("2 · Title slam", "WIRED: the scene before, dimmed + **FISH, FROG OR LIZARD?** (white) then **WHAT DOES A TADPOLE BECOME?** (sun yellow).", "As `back`, dimmed.", "Holds `back`'s drift.", {}, "As `back`.", "As `back`, dimmed.", "Dimmed to .78.", "Wired: whoosh, two slams."),
 "game": ("3 · The game, and the hidden tree frog (ONE smooth push-in)", "WIRED (`gameScene`): from the dimmed pond the camera pushes straight in (1.1 s) onto the tree frog on the big leaf; the iris closes to the black-ringed circle on the blue-violet stage; then the score pill, the YOU hands, *You lock in first*, the buddies, the label *a little tree frog* and *Can you spot it?* pop out. Pass the drawn pond as `R.world` (now `pondPH`) and the frog's spot as `TREEFROG` (the INTRO spot).",
   "Basil (the finder) big at the right (h ~530 x .94); Pip and Momo smaller as gameScene's POS.", "One push-in, then hold; everything pops OVER this shot.",
   {"e301a": "Momo: surprised (paws up) on \"tree frog\" (reason: a real surprise, the animal is named and shown). Pip, Basil: " + LISTEN + ".",
    "e301b": "Basil talks (talking sprite), then pointing up at the leaves on \"leaves\" (reason: showing a specific place to look). Pip, Momo: " + LISTEN + ".",
    "e301r": "Pip: waving on \"Buddies\" (reason: hello to the viewer, the game starts). Basil, Momo: a nod on \"point\" (no pose: listening)."},
   "Tree frog: inside the circle (the push-in target: THE INTRO SPOT, never used again). It blinks and lifts one sticky front foot (toe pads) on \"sticky toes\".", "The frog's throat pulses; a drip falls past it.", "Soft dawn light on the wet leaf.", "Wired: a whoosh on the push-in, a curious pluck on \"tree frog\"; add a little croak ON the frog's name; the game groove."),
 "goals": ("4 · Today's goals (Basil reads)", "WIRED (`goals3`): Basil reads **The 3-stage life cycle** (he says \"three\") · **Young that look different** · **Why frog eggs have jelly**; each card lifts and glows.", "Basil big at the left (h ~520 x .94).", "Static card screen.",
   {"e401": "Basil talking (reason: he is speaking).", "e402": "Basil: pointing at card 1 after the line (reason: showing the card he read).", "e403": "Basil talking, then sit (reason: speaking; no new pose: one swap per 6 s).", "e404": "Basil: a smile and a nod after the last card, NOT cheer (reason: nothing is learnt yet; the cards are only set)."}, "—", "Bokeh drifting.", CARD, "Wired: a soft pop per card."),
 "count": ("4 · The countdown", "WIRED (common.js `SC.count`).", "As wired.", "Static.", {}, "—", "—", CARD, "Wired: drums on three, two, one; a cymbal on Go."),
 "r1card": ("5 · Round card", "WIRED: ROUND 1 · YOUR ANSWER FROM LAST TIME.", "—", "The wired slam.", {}, "—", "—", CARD, "Wired."),
 "r1": ("5 · Round 1: EP15's dare (a short 3 s ring)", "WIRED (`lockN`): EP15's three cards as the pictures of the ONE set of numbered cards, the clue labels *lives in water* · *has a tail* ON TOP of the ring, the 3 s ring, LOCKED IN!, the picks Pip 1, Basil 3, Momo 2. Draw the ring's picture (replace `ringPH`): one tadpole, big (round body, long tail, no legs), swimming.", "The ring big and central (half the frame height); one buddy at a time big at the side as they pick.", "The wired small zoom-out as the buddies answer.",
   {"e501": "The lead buddy at the side: worried during the ring (reason: a countdown, before the answer; Pip and Momo show thinking, their stand-in).",
    "e502": "All: " + LISTEN + ".",
    "e503": "Pip talking, then pointing at card 1 (reason: showing the card he picked).",
    "e504": "Basil talking (a big hop on \"Three!\", tail wiggle), then pointing at card 3 (reason: showing his pick). NOT laughing: \"handsome lizard\" is his real guess, not a joke.",
    "e505": "Momo talking, then pointing at card 2 (reason: showing her pick); then a calm smile (sit) while she waits."},
   "Not in the ring.", "The ring's tadpole swims in a small loop.", CARD, "Wired: ring ticks speeding up, the bell, LOCKED IN!, a pop per pick."),
 "pond": ("6 · \"But where do the tadpoles come from?\"", "The pond's edge, close: the egg clump among the lily pads, tadpoles darting. Momo's wrong idea as HER thought bubble (wired `thought`: Stage 2 draws a mother frog with a row of tiny tadpoles beside her like kittens, a ? on it: an idea, never a fact); it pops away as the look-closer opens.", "Pip big at the left (h ~500) on a stone; Momo big at the right (h ~500) on the bench end; the egg clump between them.", "A move from Pip to Momo (ease, no cut), then the push into the water (the look-closer's own push-in).",
   {"e601p": "Pip talking, then thinking (reason: he has just asked a real question). Basil, Momo: " + LISTEN + ".",
    "e602m": "Momo talking (sure of herself; her idea is wrong but nobody knows yet), then sit (reason: no reveal yet). Pip: thinking stays (the question is still open). Basil: " + LISTEN + "."},
   "Tree frog: on a reed stem at the far side of the pond (new spot).", "Tadpoles dart; a drip rings the water.", "Early morning, the sun just up.", "Pond trickle, a few frog calls; a soft bubble pop as Momo's thought bubble appears."),
 "lceggs": ("7 · [LOOK CLOSER] The frog eggs in their jelly (JELLY-LIKE COVERING pops)", LCF + " Inside: the pond in a cut-away side view FILLS the panel. `clump` the clump of clear jelly among the lily-pad stems, a few hundred dark dots; `dots` a magnifier circle (joined by a plain line) on ONE egg: a dark round egg inside its own clear ball of jelly, label *an egg*; `kw_jelly_like_covering` the label *jelly-like covering* (purple, the key-word colour) joined to the jelly; JELLY-LIKE COVERING pops (lib.js o.at). The why as a picture model, colour-coded with arrows: `fish` a little fish nudges the clump, its mouth slides off the slippery jelly (curved arrow *slippery*), it swims away; `sun` the sun comes out, the water drops a little at the edge, the top eggs stay wet and shiny (droplets, *stays wet*). The book's strip (wired, cream) during e608. Verdict EGGS KEPT SAFE AND WET (green) at `v_eggs`. Small print *We look, and we leave the eggs in the pond.* (wired).",
   "The panel fills the frame; the speaker's face in a lower corner (Basil, Pip, Basil in turn); Momo's face first.", "The push-in from the pond's edge (1 s), then a slow push to the magnifier; a pan to the fish, then up to the sun.",
   {"e604": "Momo's face: thinking (reason: her guess is still open; the clump is new).",
    "e605b": "Basil's face talking (surprised eyes while he says it); Momo's face: oops (reason: OUTCOMES, her guess (babies like kittens) is wrong: frogs lay eggs).",
    "e607p": "Pip's face talking, then thinking (reason: he has just asked why).",
    "e608": "Pip's face: a slow nod at each sentence (no pose: listening to the answer); cheer on JELLY-LIKE COVERING landing is NOT needed here (Basil's face cheers after his own explanation instead).",
    "e609b": "Basil's face talking (teaching), then cheer when the verdict lands at `v_eggs` (reason: something is learnt)."},
   "Not on screen (a look-closer).", "Light ripples through the water; the eggs' dots wobble; the fish's fins.", "Green-gold underwater light, sunbeams from above.", "LOOK CLOSER bed low; underwater hush; a soft bloop ON `fish`; a warm shimmer ON `sun`; the key-word chime (wired); the stamp and a chime on the verdict (wired); a click per label."),
 "waitw": ("8 · Be a frog egg! (the glide in)", "Pill **Be a frog egg!**; the camera glides down to the water and under the surface; a soft blue-green wipe. The shelf slides aside (SHELF_HIDE).", "The buddies at the edges wave the viewer off, then shrink (a pop each) and follow.", "One glide (no cut).",
   {"e701": "Momo, Pip: waving (reason: goodbye as the viewer shrinks). Basil: waving too, NOT cheer (reason: nothing is learnt yet; cheer is only for learning)."},
   "Tree frog: on a lily pad's rim as the camera passes (new spot).", "Ripples, a tadpole darts away.", "Morning sun on the water.", "Wonder pad; a whoosh and the shrink sound (wired)."),
 "shrink": ("8 · BE A FROG EGG (the journey; first person, present tense)", "`jegg`: YOU are one dark egg inside the clear jelly: the jelly a soft glowing wall all round, the other eggs like dark moons nearby; the *You: a frog egg* tag (wired); `fish` (from e702's words) a fish's huge blurry shape glides past outside and bumps off the jelly. `jhatch`: you wriggle out into the open water; `jtadpole` (tag *a tadpole*, wired): your own long tail sweeps at the bottom edge of the frame, lily-pad stems like tree trunks, light from above. `jback`: two back legs grow (they kick at the lower edge); `jfront`: two front legs; `jtail`: your tail shrinks away (the stub at the edge of the frame goes); `jpad`: you climb up a stem onto a lily pad, out into the air: the garden HUGE around you (the bench like a building, the block beyond); `jfrog` (tag *a frog*, wired). *speeded up* (wired). Nothing about breathing organs.",
   "The three buddies ride along, shrunk (h ~170), on a sunken leaf at the lower left and right edges underwater (`riders`, wired), then sitting on the same lily pad at the end; never covering the middle.", "The camera IS the egg, then the tadpole: gentle swimming sway, a rise to the surface; never a cut.",
   {"e702": "Riders: Pip holds his breath, cheeks puffed (sit; reason: the line's world is underwater, a small acted moment, not a pose); Momo: surprised as the fish passes (reason: a real surprise: a huge fish).",
    "e703": "Riders: all three surprised as you hatch (reason: an unexpected result: an egg becomes a tadpole); Basil then pointing at your tail (reason: showing it).",
    "e704": "Riders: Basil pointing at the back legs (reason: showing them; \"like mine!\" face).",
    "e705": "Riders: all three cheer at `jfrog` (reason: learnt: the tadpole became a frog)."},
   "Not on screen (a journey).", "Bubbles, drifting specks, lily-pad stems swaying; then air, birds, the sun.", "Green-gold underwater, then bright morning air.", "Wonder pad, Heart soft; underwater hush and little bubbles; a soft bloop ON `fish`; a pop ON `jhatch`; tiny kicks ON `jback` / `jfront`; a splash and birds ON `jpad`; a happy rise ON `jfrog`."),
 "pullout": ("8 · Pull back out", "Whoosh up and out to the pond, normal size: a small frog on a lily pad (0.6 s).", "The buddies pop back to full size (a hop each).", "One continuous pull back.", {}, "—", "Ripples.", "Morning.", "Wired: whoosh out."),
 "frogans": ("9 · The answer is two: a frog (TADPOLE pops)", "The pond: a small frog (four legs, webbed back feet, moist shiny skin, NO tail; a common Singapore pond frog, green-brown with a pale stripe along each side) on a lily pad. EP15's three cards small along the top (wired): card 2 the green tick at `ansglow`, small x chips on cards 1 and 3 and by Pip and Basil; the coin at `coin1`. TADPOLE pops on Heart's term (lib.js o.at). Then the book's caption on its cream strip (wired, >= 3.5 s) beside a big tadpole picture (round body, long tail, no legs, in water) with three plain label lines *lives in water* · *a tail* · *does not look like the adult*, the frog small beside it.",
   "Momo big at the left (h ~540) by the water; Basil and Pip mid-ground at the right (h ~350, further back = smaller).", "A slow push to the frog as Heart gives the answer; to the strip and the tadpole picture; ease back.",
   {"e801": "Momo: arms crossed, a confident smile (reason: OUTCOMES, she was right); Pip and Basil: oops (reason: OUTCOMES, they were wrong) on their x chips.",
    "e802": "Momo: cheer when TADPOLE lands (reason: a key word is learnt). Pip, Basil: " + LISTEN + ".",
    "e803m": "Momo talking, a paw out to the frog (pointing after the line: showing the frog). Only Momo explains: she was right.",
    "e805": "Basil: thinking, looking from the tadpole picture to the frog (reason: he is working out why his lizard was wrong; the caption answers it). Pip: " + LISTEN + "."},
   "Tree frog: on the bench's armrest (new spot).", "The little frog's throat pulses, it shifts its feet; tadpoles below.", "Bright morning.", "Pond bed; a sting on the answer, the coin, the key-word chime (wired); a little plop as the frog shifts."),
 "holdon": ("10 · HOLD ON! Pip counts four stages", "Model: ../ep15/p1.js `SC.holdon` (HOLD ON! stamp, the YOU ring 5 s with crossed arms, clue labels ON TOP of the ring, the bell, the coin). `board`: Pip's own board on a low easel by the pond: FOUR pictures in a ROW with straight arrows (an egg in jelly · a tadpole · a tadpole with legs · a frog), numbered by him *1 2 3 4*, titled *4 STAGES!*. Ring picture: Pip's board. Clue labels *a tadpole with legs* · *4 stages?*. After the bell: `bracket`: one curly bracket groups the tadpole AND the tadpole with legs, label *the young* (green); Pip's numbers fly off; `tegg`: the pictures slide round into a LOOP (no numbers).",
   "Pip big at the left (h ~520) with his easel; during the countdown the ring takes the stage (half the frame) and only Pip stays, big, at the side; Basil big at the right for his fix (h ~520 x .94).", "Push in on the board as Pip reads it; the countdown on the blue stage; back to the board for the bracket.",
   {"e901p": "Pip talking, pointing at each picture on his board (reason: showing his row).",
    "e902": "Pip: worried during the ring (reason: a countdown, before the answer; his stand-in is thinking). Basil, Momo: off screen during the countdown.",
    "e903": "Pip: oops (reason: OUTCOMES, he was wrong); Basil and Momo: arms crossed, confident (reason: OUTCOMES, they were right).",
    "e904b": "Basil talking, pointing at the bracket (reason: showing it); Pip: a nod; then Pip cheer at `tegg` when his row turns into a loop (reason: his mistake is fixed)."},
   "Tree frog: on top of the easel's frame (new spot); NOT in the ring.", "A dragonfly over the pond; the easel's paper flutters.", "Late morning / the blue stage for the countdown.", "The HOLD ON! stamp (wired), ring ticks and bell, the coin (wired); paper rustle; a soft whoosh ON `tegg` as the pictures slide into a loop."),
 "ring": ("10 · The board OUR FROG'S LIFE CYCLE (its HOME)", "A cream board on a low stand by the pond, centre-right, about 55% of the frame high (the same in `mark1`, `nyk` and Part 2's recap): curved arrows all running ONE way; three round picture slots: frog eggs in jelly (*the egg*, landed at `tegg`) · `tyoung` a tadpole (*the young: a tadpole*) · `tadult` a frog (*the adult*); `tback` the last arrow lights from the frog back to the eggs, then the arrows run round. NO numbers, no START, no END.", "Basil big at the left (h ~520 x .94) beside the board; Pip and Momo mid-ground at the right (h ~350).", "Push in on the board as the tiles land.",
   {"*": "Basil: pointing at each tile as it lands (reason: showing it). Momo: cheer at `tback` (reason: learnt: the loop closes, three stages). Pip: " + LISTEN + " (he cheered at `tegg`: no second strong pose within a minute)."},
   "Tree frog: on the rim of a flower pot by the pond (new spot).", "The arrows glow round; a leaf drifts onto the water.", "Late morning.", "A tile hop ON `tyoung`, `tadult`; a soft sparkle ON `tback`."),
 "mark1": ("10 · Mark Sentence 1 (Basil): 5.11, first half", "WIRED (`markScene`): Basil says \"Say it with me!\" with an inviting hop, 0.8 s, then reads the card; highlights *three stages*, *egg*, *young*, *adult*. Under the card: the frog loop board, small (its picture: Stage 2).", "Basil big at the left (half the frame), the card large at the right (`../reference/scene_good_ep13_marksentence.webp`).", "Static card screen.",
   {"e1001": "Basil: pointing at the viewer (reason: inviting the viewer to read along).", "e1002": "Basil talking (lip-sync), then cheer after the last word (reason: a book sentence is learnt)."}, "—", "The small loop's arrows glow round.", CARD, "Wired: a soft pop on \"Say it with me!\", the chime after the card."),
 "hen": ("11 · \"Does every young animal look so different?\" A hen and her chicks", "The garden's grassy edge by the void deck, mid-morning: `henIn`: a brown HEN (red comb and wattles, glossy brown feathers, two legs) walks in from the bushes with FOUR chicks (small, pale yellow, fluffy, two legs, little beaks), all pecking at the grass (Singapore's free-roaming chickens near HDB blocks: the brief's anchor). Basil's colour idea as two big colour swatches popping by the birds (*yellow* · *brown*) with a ? (his idea, not a fact). Small print *We watch from a distance. We do not chase them.* (wired).", "Pip big at the left (h ~500); Basil big at the right (h ~520 x .94); the hen and chicks centre, about 30% of the frame.", "A drift from the pond to the grass as the hen walks in; push in on the chicks for Basil's line.",
   {"e1101p": "Pip talking, then thinking (reason: a real question). Basil, Momo: " + LISTEN + ".",
    "e1102": "Momo: surprised, then pointing at the chicks (reason: a real surprise, hens in an HDB garden; showing them).",
    "e1103b": "Basil talking (sure of himself, arms out); after the line sit (reason: his idea is wrong but not yet answered: no pose)."},
   "Tree frog: on the low wall of a planter bed (new spot).", "The hen scratches and pecks; a chick tumbles and gets up; a mynah hops by; leaves stir.", "Bright mid-morning sun, soft shadows of the block.", "Grass bed: the hen's low clucks, the chicks' peeps (ON `henIn`), birds, a far bus; little pecks."),
 "lcchick": ("11 · [LOOK CLOSER] The chick beside the hen (CHICK pops)", LCF + " Inside, two halves both BIG: LEFT a chick, RIGHT the hen, the same pose (both pecking). Colour-coded part labels, each joined to its part on BOTH birds by plain lines: `beak` *a beak* (orange) · `wings` *two wings* (violet) · `legs` *two legs* (teal); `peck` both peck at the same moment (a small dust puff). `kw_chick`: CHICK pops on the chick (lib.js o.at). Then `pairs`: the panel slides into a 2x2: TOP chick + hen with a green pill *looks like the adult*; BOTTOM tadpole + frog with an orange pill *does not look like the adult* (tests.js `LIKEC`, `UNLIKEC`). Verdict LOOKS LIKE THE ADULT (green, on the chick row) at `v_chick`.",
   "The halves fill the panel; the speaker's face in a lower corner (Pip, Momo, Basil); Basil's face first.", "The push-in (1 s), then a push on each part as it is named; ease back for the 2x2.",
   {"e1104": "Basil's face: thinking (reason: he still believes the colour rule; the line challenges it).",
    "e1105p": "Pip's face talking, careful, nodding at each part; Basil's face: oops at `beak` (reason: OUTCOMES, his colour rule was wrong).",
    "e1106m": "Momo's face talking, a happy smile as both birds peck (listening face after: no pose).",
    "e1107": "Momo's face: cheer when CHICK lands (reason: a key word is learnt).",
    "e1108b": "Basil's face talking (he fixes his own mistake), then a grin; Momo's face: laughing on \"kitten\" (reason: the line is meant to be funny)."},
   "Not on screen (a look-closer).", "Fluffy down stirs; both birds peck in time.", "Warm morning light.", "LOOK CLOSER bed; a click per label ON `beak`, `wings`, `legs`; little pecks ON `peck`; the key-word chime; the stamp on the verdict (wired)."),
 "mark2": ("11 · Mark Sentence 2 (Pip): 5.0", "WIRED (`markScene`): Pip, \"Say it with me!\", 0.8 s, reads the card; highlights *three stages*, *look like their parents*, *some do not*. Under the card: the 2x2 (chick + hen, tadpole + frog) small (Stage 2).", "Pip big at the left, the card large at the right.", "Static.",
   {"e1201": "Pip: pointing at the viewer (reason: inviting).", "e1202": "Pip talking; cheer after the last word (reason: a book sentence is learnt)."}, "—", "The small 2x2 glows row by row.", CARD, "Wired."),
 "final": ("12 · Score hand", "WIRED (`finalScene`).", "As wired.", "As wired.", {"e1301": "As wired (the high five: cheer is right here: a game is won)."}, "—", "—", CARD, "Wired: a sting, a high-five slap."),
 "liz": ("12 · The tree frog and its fun fact", "WIRED (`lizReveal`: the score hand melts into the pond, ONE push-in, the iris, the ring on \"tree frog\"; *It was on the garden tap, beside the pond!*; Momo's fun-fact panel (`funFact`) with two pictures on their marks: `ff_foam` a white ball of foam stuck to a leaf over the water, tiny eggs inside (cute, like a ball of bubble bath); `ff_drop` tiny tadpoles dropping from the foam into the pond, a little splash each; *Tell someone at home!*). Draw the pond as the view (now `pondPH(t, TREEFROG_R)`). Small print *We look, and we let the frog hop away.* (wired).",
   "Momo big at the right of the panel (funFact's own buddy).", "The push-in, then hold.",
   {"e1302": "Basil: surprised, pointing at the frog (reason: a real surprise, it was there all along; showing it).",
    "e1303": "Momo: cheer, then talking (wired; reason: an amazing fact, something is learnt).",
    "e1304": "Basil: waving at the viewer (reason: goodbye to this part's game, \"tell someone at home\")."},
   "Tree frog: on the garden TAP on its pipe beside the pond (the REVEAL spot: new; never the intro leaf), blinking, its toe pads on the tap.", "The frog blinks; a drip from the tap.", "Late morning.", "Wired: a whoosh, a sparkle; add a croak ON \"tree frog\"; pops for the fun-fact pictures (wired)."),
 "kwrecap": ("12 · The key words", "WIRED (`SC.kwrecap`): JELLY-LIKE COVERING · TADPOLE · CHICK.", "As wired.", "As wired.", {}, "—", "—", CARD, "Wired: glows, a sparkle."),
 "cliff": ("13 · The cliffhanger: an empty grasshopper on the grass", "The grassy edge of the garden: `hop` a small GREEN grasshopper with NO wings (six legs on the middle of the body, two feelers, big back legs; no wing pads) hops onto a blade of grass; `skin` beside it on another blade, a pale, see-through, EMPTY grasshopper shape (the old skin, hollow legs and feelers), with a ? that pops (wired). PART 2 slams in (wired).",
   "Momo big at the left (h ~520), crouched, nose to the grass; Basil and Pip at the right, leaning in (back views: `poses/basil_back.png`, Pip front), never speaking while in back view.", "A push along the grass from the little grasshopper to the empty skin (one move).",
   {"e1501m": "Momo talking (pointing at the skin after the line: showing it); Pip: surprised at `skin` (reason: a real surprise, an empty grasshopper).",
    "e1502": "All: a hopeful smile and a small hop, NO cheer (reason: nothing is learnt yet)."},
   "Not shown (it was revealed).", "The grass sways; the little grasshopper's feelers twitch.", "Late morning, soft clouds.", "Grass rustle; a grasshopper's click ON `hop`; a low drum (wired); the PART 2 slam (wired)."),
 "nyk": ("14 · \"Now you know!\"", "WIRED (`nykScene`): the frog loop board at its home, between the buddies (Stage 2: draw it in place of the card).", "As wired.", "As wired.", {"h1305": "All: cheer (wired; reason: \"Now you know!\": learnt)."}, "—", "—", "The sunburst.", "Wired."),
}
P2 = {
 "lasttime": ("1 · \"Last time...\": a calm recap", "WIRED frame: three pictures, one at a time, centred, large, a gentle push-in, one label each: `pic1` *The tadpole grew into a frog* (the frog loop board) · `pic2` *A chick looks like the adult* (the chick beside the hen) · `pic3` *Something strange in the grass* (the empty grasshopper skin on its blade, with a ?). Draw them from Part 1's art.", "No buddies.", "Gentle push-in on each (x1.05 over 4 s).", {}, "—", "Each picture: one small move (the arrows run, the birds peck, the skin sways).", CARD, "Wired: a soft pop per picture; calm bed."),
 "place": ("2 · The garden's grassy corner, mid-morning", GRASS[0].upper() + GRASS[1:] + ": long grass, a planter bed of flowers and herbs (a sunflower, a hibiscus, lemongrass), a lime plant in a big pot at the edge, the bench, the void deck and the block behind. `hop`: the little wingless grasshopper hops onto a blade of grass. Location pill *A community garden, Singapore · morning*.", "No buddies yet.", "A slow drift along the grass, ending where the game's push-in starts.", {}, "Praying mantis: on a flower stem in the planter bed (small, green, front legs folded). This is the INTRO spot (the game pushes in here): never used again.", "Grass sways; a butterfly; a bird hops on the planter's edge.", "Bright mid-morning sun.", "Grass bed: rustle, grasshopper clicks ON `hop`, birds, a far bus; the game groove starts at `game`."),
 "game": ("2 · The game, and the hidden praying mantis (ONE smooth push-in)", "WIRED (`gameScene`): from the grass the camera pushes straight in onto the mantis on its stem; the iris; the game's things pop out. Pass the drawn grassy corner as `R.world` (now `grassPH`) and the mantis's spot as `MANTIS` (the INTRO spot). Small print *We look, and we do not touch.* (wired).", "Basil (the finder) big at the right (h ~520 x .94); Pip and Momo smaller.", "One push-in, then hold.",
   {"f201a": "Momo: surprised on \"mantis\" (reason: a real surprise, the animal is named and shown).", "f201b": "Basil talking, then pointing at a stem (reason: showing where to look).", "f201c": "Pip: waving (reason: hello, the game starts); a nod from the others."},
   "Praying mantis: inside the circle (THE INTRO SPOT). It turns its triangle head to look at us and sways like a leaf.", "The mantis sways.", "Sunny.", "Wired: whoosh, curious pluck; a soft rustle ON \"mantis\"."),
 "goals": ("3 · Today's goals (Momo reads)", "WIRED (`goals3`): **Young that look alike** · **What moulting is** · **The cockroach's life cycle**.", "Momo big at the left.", "Static.",
   {"f301": "Momo talking.", "f302": "Momo: pointing at card 1 (reason: showing the card she read).", "f303": "Momo talking, then sit (one swap per 6 s).", "f304": "Momo: a smile and a nod, NOT cheer (reason: nothing learnt yet)."}, "—", "Bokeh.", CARD, "Wired."),
 "r1card": ("4 · Round card", "WIRED: ROUND 1.", "—", "Wired.", {}, "—", "—", CARD, "Wired."),
 "r1": ("4 · Round 1: young or adult?", "WIRED (`lockN`) with TWO big numbered picture cards: 1 *The young* · 2 *The adult* (Stage 2 draws each card's picture: the young WITHOUT wings, the adult WITH long wings folded along its back; make the difference obvious). The ring's picture (replace `ringPH`): the little wingless grasshopper on its blade of grass, big; clue labels *no wings* · *six legs* ON TOP of the ring (wired). Picks Basil 2, Pip 1, Momo 1.", "The ring central; one buddy big at the side per pick.", "The wired zoom-out as the buddies answer.",
   {"f401": "The lead buddy at the side: worried during the ring (reason: a countdown, before the answer).", "f402": "All: " + LISTEN + ".",
    "f403": "Basil talking (a hop on \"Two!\"), then pointing at card 2 (reason: showing his pick).", "f404": "Pip talking, then pointing at card 1 (reason: showing his pick).", "f405": "Momo talking, then pointing at card 1 (reason: showing her pick)."},
   "Not in the ring.", "The ring's grasshopper twitches its feelers.", CARD, "Wired: ticks, bell, LOCKED IN!, a pop per pick."),
 "lcnymph": ("5 · [LOOK CLOSER] The little grasshopper beside an adult (NYMPH pops)", LCF + " Inside, two halves both big: LEFT the little grasshopper (green, no wings), RIGHT an adult of the same kind (bigger, long wings folded along its back), on two blades of grass at the same angle. `pairin` both; colour-coded labels joined to BOTH: `legs` *six legs* (teal) · `feelers` *two feelers* (orange) · `jump` *big back legs* (violet), each leg pair pulsing as named; `wings` push in on the adult's back: *long wings* (green) and on the young's bare back a dashed outline *no wings yet*. `kw_nymph`: NYMPH pops on the young (lib.js o.at). Verdict THE YOUNG: A NYMPH (green) at `v_nymph`.",
   "The halves fill the panel; the speaker's face in a lower corner (Pip, Momo, Pip); Basil's face first.", "The push-in (1 s), then a push on each part.",
   {"f501": "Basil's face: thinking (reason: his pick (the adult) is being tested).", "f502p": "Pip's face talking, counting legs (no pose after: listening).",
    "f503m": "Momo's face talking, then pointing at the wings (reason: showing them); Basil's face: oops (reason: he sees his pick was wrong: no wings).",
    "f504": "Pip's face: cheer when NYMPH lands (reason: a key word is learnt).", "f505p": "Pip's face talking (teaching; he was right, so he explains)."},
   "Not on screen.", "The grass blades sway; the adult's wings shift a little.", "Bright, clear light.", "Grass rustle low; a soft click per label ON `legs`, `feelers`, `jump`, `wings`; the key-word chime; the stamp on the verdict."),
 "nymphans": ("5 · The answer is one: the young", "The grass: the two numbered cards small along the top (wired), card 1 glows at `ansglow`, an x chip on card 2 and by Basil; the coin (`coin1`; the Buddies also score: two of three were right).", "Pip big at the right (h ~520), Momo mid-ground right (h ~380), Basil mid-ground left (h ~380 x .94).", "Gentle push to card 1, back.",
   {"f508": "Pip and Momo: arms crossed, confident smiles (reason: OUTCOMES, right); Basil: oops (reason: OUTCOMES, wrong)."},
   "Praying mantis: on a grass stem behind Pip (new spot).", "Grass stirs.", "Bright.", "Wired: a sting, the coin."),
 "mark1": ("5 · Mark Sentence 1 (Momo): 5.4", "WIRED (`markScene`): Momo, \"Say it with me!\", 0.8 s, reads the card; highlights *three stages*, *egg*, *young*, *adult*, *nymph*. Under the card: a small grasshopper loop (eggs in the soil · the nymph · the adult with wings, curved arrows, no numbers).", "Momo big at the left, the card large at the right.", "Static.",
   {"f601": "Momo: pointing at the viewer (reason: inviting).", "f602": "Momo talking; cheer after the last word (reason: a book sentence is learnt)."}, "—", "The small loop glows round.", CARD, "Wired."),
 "skin": ("6 · \"Did a grasshopper dry up in the sun?\"", "Back to the empty skin on its blade of grass (Part 1's cliffhanger spot). Momo's wrong idea as HER thought bubble (wired `thought`; Stage 2 draws a grasshopper lying in hot sun, drying up, with a ?).", "Momo big at the left (h ~520), crouched by the grass; Basil and Pip at the right (h ~380).", "Push from Momo to the skin.",
   {"f701m": "Momo talking, then thinking (reason: her real question); Basil: " + LISTEN + "; Pip: thinking (reason: the same question)."},
   "Praying mantis: on a twig just above the skin (new spot).", "The skin sways on its blade; a bee passes.", "Hot late-morning sun.", "Grass and birds; a soft bubble pop for the thought."),
 "lcskin": ("6 · [LOOK CLOSER] The empty skin: why it comes off", LCF + " Inside: the empty skin FILLS the panel, pale and see-through, light shining through it. `split` a magnifier (joined by a line) on the long split down its back: *a split down the back*; `hollow` push in on a leg and a feeler: they are empty tubes (*empty legs* · *empty feelers*, colour-coded). Then the why as a picture model on the right half: `tight` a nymph drawn inside an outline of its hard outer skin; the nymph grows (a small time-lapse), little arrows push out from inside, the outline cannot grow and goes tight (a squeeze line, a small *too tight!* tag), a crack starts down the back. Verdict THE OLD SKIN IS TOO TIGHT (green) at `v_skin` (Stage 1 added the mark). Small print *We look, and we leave the skin on the grass.* (wired).",
   "The panel fills the frame; the speaker's face in a lower corner (Basil, Pip); Momo's face first.", "The push-in, a push to the split, a pan along a leg; ease right for the model.",
   {"f702": "Momo's face: oops (reason: OUTCOMES, it did not dry up: it is empty).", "f703b": "Basil's face talking, amazed (surprised eyes; reason: a real surprise, even the legs are empty).",
    "f704p": "Pip's face talking, then thinking (reason: he asked why).", "f705": "Pip's face: a slow nod as the outline goes tight; cheer at `v_skin` (reason: learnt: why the skin comes off)."},
   "Not on screen.", "Light shimmers through the skin; the model's arrows pulse.", "Back-lit, warm.", "LOOK CLOSER bed; a click per label; a soft creak ON `tight`; the stamp on the verdict."),
 "waitw": ("7 · Be the nymph! (the glide in)", "Pill **Be the nymph!**; the camera glides down into the grass; a soft green wipe. Shelf aside.", "The buddies wave, then shrink (a pop each) and follow.", "One glide down.",
   {"f801": "Pip, Basil, Momo: waving (reason: goodbye as the viewer shrinks); NOT cheer (nothing learnt yet)."},
   "Praying mantis: on a tall weed stalk at the grass edge as the camera passes (new spot).", "Grass blades part.", "Sunny.", "Wonder pad; the shrink sound (wired)."),
 "shrink": ("7 · BE THE NYMPH (the journey; first person, present tense)", "`jnymph`: YOU are a nymph on a blade of grass as big as a road (the *You: a grasshopper nymph* tag, wired; your own green front legs and feelers at the edges of the frame). `jeat`: you munch a leaf edge (bites appear); the leaf shrinks as you grow. `jtight`: the view squeezes a little at the edges (*too tight!*, wired); you hang on to a stem, head down. `jsplit`: a crack of light opens above you (the split down your back); `jout`: you wriggle out: the world pale and soft for a moment, a little bigger; `jhard`: colour comes back, firm (*your new skin turns hard*, wired); the old empty skin hangs on the stem below. `jagain`: a small counter of empty skins (three, four...) with *speeded up* (wired); `jwings`: the last time, two long WINGS unfold at the edges of the frame; tag *an adult* (wired).",
   "Riders: the three buddies, shrunk (h ~170), on the next blade of grass at the lower edges, holding on as it sways (`riders`, wired).", "The camera IS the nymph: a gentle sway with the grass; never a cut.",
   {"f802": "Riders: Basil pretends to munch too, a happy face (sit; reason: the line is about munching; a small acted moment, not a pose).",
    "f803": "Riders: Pip pushes at the tight edge, worried (reason: the moment before the result: the skin is tight, what happens?); Momo: surprised at `jsplit` (reason: a real surprise: the skin splits).",
    "f804": "Riders: Momo: surprised at the pale new skin is NOT repeated (she was surprised 6 s ago): a wide-eyed sit; Basil: pointing at the old skin below (reason: showing it).",
    "f805": "Riders: all three cheer at `jwings` (reason: learnt: the last moult gives wings, an adult)."},
   "Not on screen (a journey).", "Grass sways; light flickers through blades; the leaf edge gets nibbled.", "Green-gold light through the grass.", "Wonder pad, Heart soft; munching ON `jeat`; a tight creak ON `jtight`; a soft crack ON `jsplit`; a wriggle rustle ON `jout`; small ticks ON `jagain`; an unfolding rustle ON `jwings`."),
 "pullout": ("7 · Pull back out", "Whoosh back out to the garden (0.6 s): an adult grasshopper with long wings on a stem, its old empty skin below.", "The buddies pop back (a hop each).", "One pull back.", {}, "—", "—", "Sunny.", "Wired."),
 "moult": ("8 · MOULTING, and Momo fixes her guess", "The grass: the empty skin on its blade and, beside it, the grasshopper that came out of it (a little bigger), large between the buddies. MOULTING pops on Heart's term (lib.js o.at).", "Momo big at the left (h ~520), Basil big at the right (h ~520 x .94), the skin and the grasshopper between them, large.", "Push in on the skin and the grasshopper as MOULTING lands.",
   {"f901": "Basil: cheer when MOULTING lands (reason: a key word is learnt). Momo: " + LISTEN + " (her oops comes with her own line).",
    "f902m": "Momo talking (she fixes her own guess: \"Oops!\" in words, the talking sprite), then cheer (reason: her mistake is fixed)."},
   "Praying mantis: on a flower above the skin (new spot).", "The grasshopper cleans a feeler; the skin sways.", "Bright midday.", "Grass bed; the key-word chime (wired); a hop as the grasshopper jumps off after Momo's line."),
 "mark2": ("8 · Mark Sentence 2 (Basil): 5.5", "WIRED (`markScene`): Basil, \"Say it with me!\", 0.8 s, reads the card; highlights *young insect*, *sheds its outer skin*, *grows a new one*, *moulting*. Under the card: the empty skin beside the bigger grasshopper (Stage 2).", "Basil big at the left, the card large at the right.", "Static.",
   {"f1001": "Basil: pointing at the viewer (reason: inviting).", "f1002": "Basil talking; cheer after the last word (reason: a book sentence is learnt)."}, "—", "—", CARD, "Wired."),
 "showcard": ("9 · Showdown card", "WIRED.", "—", "Wired.", {}, "—", "—", CARD, "Wired."),
 "show": ("9 · Showdown: Pip's cockroach homework (double points)", "Model: ../ep15/p2.js `SC.show`. Pip's homework sheet on an easel by the bench, LARGE: three ruled lines, each with a small cute drawing: 1 *It has three stages.* (a small loop) · 2 *Its eggs are found in an egg case.* (a small brown egg case) · 3 *Its young does not look like the adult.* (a cockroach nymph and an adult far apart, with a big ≠). The lines light as Pip reads them (`l1`, `l2`, `l3`). The YOU ring takes the stage (5 s) with the three line numbers as the ONE set of numbered choice cards. LOCKED IN!; Basil and Momo reveal. Cockroaches drawn cute and clean (big friendly eyes, glossy brown, no mess).", "Pip big at the left with his easel; during the countdown the ring is central, only Pip at the side.", "Push in on the easel as he reads; the countdown on the blue stage.",
   {"f1101": "Pip: waving at his homework, proud (reason: hello, showing off his sheet). NOT pointing yet.",
    "f1102p": "Pip talking, pointing at each line as it lights (reason: showing it); during the ring: worried (reason: a countdown, before the answer).",
    "f1104": "Pip covers his eyes (worried; reason: LOCKED IN!, the answer is coming).",
    "f1105b": "Basil talking (he was right, so he explains); Pip: oops (reason: OUTCOMES, his homework was wrong); Momo: arms crossed (reason: OUTCOMES, right).",
    "f1106m": "Momo talking (right, so she explains), then arms crossed (reason: confident: she was right)."},
   "Praying mantis: on the easel's leg (new spot); NOT on screen during the countdown.", "The homework sheet's corner lifts in the breeze.", "Bright / the blue stage.", "Wired: the Showdown card, ticks, bell, LOCKED IN!; paper rustle ON `l1`..`l3`."),
 "fix": ("9 · The fix (the book's strip 5.6); EGG CASE", "`strike`: line 3 struck through; `rewrite`: rewritten in green *Its young looks like the adult. It has no wings yet.*, and its drawing changes to a nymph beside an adult that look alike (the ≠ becomes =). Heart reads the cream strip (wired, >= 3.5 s). `case`: a big picture of the egg case pops in by line 2 (a small brown purse shape; a cut-away shows two neat rows of eggs inside); EGG CASE pops on Heart's term (lib.js o.at). Then a small cockroach loop slides under the sheet: the egg case · a nymph (no wings) · an adult (wings), curved arrows, no numbers. The coin +2 (`coin2`).", "Pip big at the left by his easel; Basil and Momo at the right.", "Push in on line 3, ease to the egg case, back.",
   {"f1107": "Pip: cheer at `rewrite` (reason: his mistake is fixed), then a slow nod during the strip.",
    "f1108": "Momo: surprised at the egg case's rows of eggs (reason: a real surprise: lots of eggs inside a purse).",
    "f1109b": "Basil talking, a paw shaping a little purse; after the line: listening.",
    "f1110": "Basil and Momo: cheer at `coin2` (reason: a game point is achieved), Pip smiles (sit: his oops was 15 s ago; no strong pose)."},
   "Praying mantis: on the easel's top (new spot).", "The rewritten line glows; the little loop's arrows run.", "Bright.", "A strike ON `strike`, a green scribble ON `rewrite`, a pop ON `case`, the key-word chime, the coin (wired)."),
 "chant": ("10 · The chant", "WIRED (`chantScene`): \"Say it with us!\" + 0.8 s; three lines with YOUR TURN!: *Egg, young, adult! Three stages!* · *Chicks look like hens! Tadpoles don't!* · *Skin too tight? Moult and grow!*. Draw the board of FOUR small loops at the right (frog, chicken, grasshopper, cockroach; each egg · young · adult, curved arrows, no numbers) and flash it per line (`flash`: line 1 the three stage slots on every loop; line 2 the chick and the tadpole; line 3 the grasshopper's empty skin).", "The three buddies left to centre (as wired), the board at the right.", "Static, a small bounce on the stomps.",
   {"*": "Clap-clap-stomp poses as wired; cheer on the last line (reason: the chant is the episode's three ideas learnt)."}, "—", "The board's loops run round.", CARD, "Wired: clap-clap-stomp, YOUR TURN! pauses."),
 "final": ("11 · Score hand", "WIRED (`finalScene`).", "As wired.", "As wired.", {"f1301": "As wired (high five: a game won)."}, "—", "—", CARD, "Wired."),
 "liz": ("11 · The praying mantis and its fun fact", "WIRED (`lizReveal` + Basil's `funFact` panel): the score hand melts into the garden, ONE push-in onto the mantis on a SUNFLOWER (the REVEAL spot), the iris, the ring on \"mantis\"; *It was on a sunflower, keeping very still!*; the panel's pictures on their marks: `ff_cousin` a cute mantis and a cute cockroach side by side with a little family-tree line joining them (*cousins!*); `ff_case` a mantis egg case on a twig (pale, foamy-looking); `ff_babies` lots of tiny mantis nymphs hatching out together, each a tiny copy of the adult. *Tell someone at home!*. Draw the grassy corner as the view (now `grassPH(t, MANTIS_R)`). Small print *We look, and we do not touch.* (wired).",
   "Basil big at the right of the panel (funFact's own buddy).", "The push-in, then hold.",
   {"f1302": "Momo: surprised, pointing (reason: a real surprise; showing it).", "f1303b": "Basil: cheer, then talking (wired; an amazing fact learnt).", "f1304": "Pip: waving at the viewer (reason: goodbye to the game)."},
   "Praying mantis: on a SUNFLOWER in the planter bed (the REVEAL spot: new; never the intro stem), swaying gently.", "The sunflower nods; the mantis turns its head.", "Midday.", "Wired: whoosh, sparkle, pops; a soft rustle ON \"mantis\"."),
 "dare": ("12 · The dare for Episode 17", "Model: ../ep15/p2.js `SC.dare`. The lime plant in its big pot at the garden's edge: a green caterpillar (lime butterfly caterpillar: plump, green, a pale band) munches a leaf (cute, alive: it chews and wiggles). `dareIn`: ONE set of TWO big numbered picture cards slides in low (wired placeholders): 1 *Yes, a nymph* (draw a nymph picture with a ?) · 2 *No* (draw the caterpillar); the banner *NEXT · Is the caterpillar a nymph?*, *Lock in your answer!*.", "Basil big at the left (h ~500 x .94), hopeful; Momo and Pip at the right (h ~380).", "A push from the lime plant to the cards.",
   {"f1401": "Momo, Pip: thinking (reason: a question has just been asked; no hints). Basil: a big hopeful smile (sit; no strong pose)."},
   "Praying mantis: on the rim of the lime plant's pot (new spot).", "The caterpillar chews and wiggles; a lime leaf trembles.", "Late morning.", "Grass bed; two slides ON `dareIn` (wired); munching; a sting on \"Lock in your answer!\" (wired)."),
 "kwrecap": ("13 · The key words", "WIRED (`SC.kwrecap`): NYMPH · MOULTING · EGG CASE.", "As wired.", "As wired.", {}, "—", "—", CARD, "Wired."),
 "nyk": ("14 · \"Now you know!\"", "WIRED (`nykScene`): the board of four small loops between the buddies (Stage 2: draw it in place of the card).", "As wired.", "As wired.", {"h1305": "All: cheer (wired)."}, "—", "—", "The sunburst.", "Wired."),
}
HDR = """# EP16 · SCENES TO DRAW (Stage 2) · big buddies in the scene, teaching

Generated by `python3 make_todo.py` from `tl_p1.json` / `tl_p2.json` (the real timeline, voices recorded 23 Nov) and the staging in
`make_todo.py`. Words: `../p3_ep16_script.md` and `script.py` (the source of every line).

## Read first: the standing rules (all from `../SERIES_FORMAT.md`; EP15's `SCENES_TODO.md` rules apply unchanged)

1. **No aura discs; buddies IN the scene, BIG** (1d): contact shadow, the scene's light on them; the speaker 45-55% of the frame height,
   every other buddy on screen at least h 330; balanced layouts (speaker one side, the others the other side, the prop between).
2. **The buddies stay in proportion** (5, 23 Nov): lib.js `SIZE_K` basil .94 (as EP15's v2 cast); same depth = same size, further back =
   smaller, nobody more than ~15% bigger than another at the same depth. The heights below are BEFORE SIZE_K.
3. **The camera frames whoever talks and pushes in on what is named**, then eases back; never a jump cut inside a place.
4. **Talking = a moving mouth**: a speaking buddy is ALWAYS in its talking sprite (lip-sync, blinks) and pops back to its pose after the line.
5. **Every reaction has a reason, or it goes numb** (5, 23 Nov). ONE job per pose; most of the time the buddies just listen. Each pose below
   names its reason; a pose with no reason is replaced by listening. Strong poses (cheer, surprised, laughing, worried) about once a minute
   per buddy at most.

   | Pose | Only when |
   |---|---|
   | talking sprite | the buddy is speaking |
   | smile / nod (sit) | listening; the default |
   | thinking | a question has just been asked, before the answer |
   | worried | during a countdown or a guess, before the answer is revealed (Pip and Momo: their thinking face stands in, lib.js POSE_SUB) |
   | oops (shy) | this buddy just got it wrong |
   | arms crossed (confident) | this buddy just got it right |
   | surprised | a real surprise: a fun fact, an unexpected result |
   | cheer (hands up) | something is learnt or achieved: a key word lands, a mistake is fixed, "Now you know!" (lib.js `learnAt`) |
   | laughing | a line that is meant to be funny (Basil has a painting; Momo / Pip: none yet, use their cheer only if learnt, else sit) |
   | pointing | showing a specific thing on screen |
   | waving | hello and goodbye only |
6. **Reactions follow the answer** (lib.js `OUTCOMES`, set for EP16): Part 1 Round 1 Momo right / Pip, Basil wrong (at `ansglow`); HOLD ON!
   Basil, Momo right / Pip wrong (at e903); the look-closer guesses Momo wrong at e605b (frogs lay eggs), Basil wrong at e1105p (only the
   colour). Part 2 Round 1 Pip, Momo right / Basil wrong (at `ansglow`); the look-closer guess Momo wrong at f702 (it did not dry up);
   Showdown Basil, Momo right / Pip wrong (at f1105b). Only a buddy who got it right explains the right answer (the script already does).
7. **Look-closers**: the thing fills the panel, each named part its own push-in and big label, one buddy FACE in a lower corner reacting;
   one verdict at its `v_*` mark held 2.5 s. **Countdowns take the stage** (ring half the frame, clue labels >= 40 px on top of the ring,
   blue stage, one big buddy). **ONE set of big numbered picture cards** per lock-in (Part 2's Round 1 and the dare have TWO).
8. **The hidden animal moves** (4, 23 Nov): a new fair spot in EVERY scene (listed per scene below), never back at the spot where the game's
   push-in introduced it (Part 1: the big leaf over the pond; Part 2: the flower stem in the planter bed), never twice in one spot; the
   reveal is at a NEW spot (Part 1: the garden tap beside the pond; Part 2: a sunflower; Heart's reveal lines say so: re-recorded at Stage 1).
   Not on screen in a look-closer, a journey or a countdown.
9. **The journeys bring company**: a *You: a ...* tag (wired) and the viewer's own body at the frame's edge (a tail, then legs; feelers and
   front legs, then wings), the three buddies shrunk riding along (`riders`), reacting at each stop, never covering the view.
10. **Real animals, cute AND alive, true shapes** (script section 3, Realism): frog eggs a clump of clear jelly with dark dots; the tadpole a
   round body and a long tail, back legs first, then front legs, the tail shrinks; the frog four legs, webbed back feet, moist skin, no tail;
   the hen brown with a red comb and wattles; chicks pale yellow and fluffy; the grasshopper nymph like the adult but smaller with NO wings
   (no wing pads), six legs on the middle of the body, two feelers, big back legs; the empty skin pale, see-through, hollow; cockroaches only
   in Pip's drawings, cute and clean; the four-lined tree frog; the green praying mantis; the lime butterfly caterpillar. No gills or lungs;
   the tadpole is never called a larva; loops never have numbers, a START or an END (5.16).
11. **Things never float**; the easels and the loop board stand on the ground; the egg clump floats on the pond (as it really does);
   every picture labelled; every tag joined to what it describes; labels inside the frame; nothing in the bottom fifth at the end.
12. **Every place sounds alive** (9): sound_cues.js is a GENERIC Stage 1 plan (rituals and beds); add each place's ambience and the foley ON
   the marks (the Sound line of each scene below). song.js's garden bed says "no hens" (EP15): Part 1's grassy edge HAS the hen.

### The place: ONE real Singapore place, visited from dawn to mid-morning
EP15's community garden beside an HDB block (the void deck behind, planter beds, the bench, the old mango tree), so the story carries on:
- **The pond side** (Part 1: cold, back, pond, frogans, holdon, ring, liz): a little pond with lily pads, reeds, a big elephant-ear leaf
  over the water, the frog-egg clump, tadpoles, a garden tap on its pipe beside it. Dawn after rain, then morning.
- **The grassy edge / corner by the void deck** (Part 1: hen, cliff; Part 2: place, skin, moult, show, fix, dare): long grass, a planter
  bed with a sunflower, a hibiscus and herbs, a lime plant in a big pot, the bench; free-roaming chickens. Mid-morning.
- Borrow from ../ep15/garden15.js (`BG.garden15`, `VG15`: the garden, the pond, the old mango tree) rather than drawing it from zero; put
  EP16's sets in new files (e.g. `pond16.js`, `grass16.js`) loaded after ep15dare.js in page.html; main.js already calls `XDEFS16()` if it exists.

### Homes of recurring props
- **EP15's three dare cards** (`ep15dare.js`, real art: `PIC.fish15`, `frog15`, `liz15`): along the pond's edge (cold, back), the pictures
  of Round 1's cards, small along the top in `frogans`.
- **The loop board OUR FROG'S LIFE CYCLE**: centre-right by the pond, about 55% high (ring, mark1's small picture, nyk; Part 2's recap).
- **Pip's easel**: by the pond in Part 1 (holdon: his row of four pictures); by the bench in Part 2 (show, fix: his cockroach homework).
- **The empty skin on its blade of grass**: the same blade and spot in cliff (P1), lasttime pic3, skin, moult (P2).
- **The board of four small loops** (frog, chicken, grasshopper, cockroach): chant (right side), nyk.

### How the engine is set up
- Copied from `../ep15/` (its live engine, with EP15's v2-cast lib.js: SIZE_K basil .94, POSE_SUB worried -> thinking for Pip and Momo):
  lib.js, common.js (`gameScene`, `lizReveal`, `funFact`, `riders`, `chantScene`, `markScene`, `goals3`, `lockN`, `finalScene`, `nykScene`,
  `thought`), closer.js (`lookCloser`, `lcStrip`), shrink.js (`youTag`, `feelTag`), song.js, render.js, finish.sh, bake.js.
  EP15's scene art (home15.js, garden15.js, its p1/p2, tests.js, ep14dare.js) is NOT copied.
- `ep15dare.js`: EP15's three dare cards (`PIC.fish15/frog15/liz15`, `DARE_PICS`). `tests.js`: EP16 data and placeholders (`HIDDEN`,
  `TREEFROG` / `TREEFROG_R`, `MANTIS` / `MANTIS_R` (intro / reveal spots), `pondPH`, `grassPH`, `lcPH`, `ringPH`, `smallPrint` + the five
  small-print rules, `LIKEC` / `UNLIKEC`, `ffPH` / `FF`).
- lib.js: EP16 `KW` (Part 1 JELLY-LIKE COVERING, TADPOLE, CHICK; Part 2 NYMPH, MOULTING, EGG CASE, all `o.at`), `KWLINE`, `SHELF_HIDE`
  (+ lceggs, lcchick, lcnymph, lcskin), `OUTCOMES`, `learnAt` (kw_*, v_*, tback, bracket, rewrite, jfrog, jwings). common.js: the chant `PHR`.
- Scores (p1.js / p2.js `SCORE`): Part 1 Round 1 1 : 0, HOLD ON! 2 : 0; Part 2 Round 1 1 : 1, Showdown 3 : 1.
- Before rendering: point `finish.sh`'s contact-sheet marks and `compare_ep1.py`'s times at EP16's marks (they still list EP15's).
- Build: `./build_part.sh 1|2` (timeline, cues, song, render in 10 s chunks under the shared lock, finish.sh).
"""
def block(name, sc, S, L, marks):
    title, draw, frame, cam, poses, hid, life, light, snd = sc[name]
    out = [f"### {fm(S['t0'])} – {fm(S['t1'])} · `{name}` · {title} ({S['t1'] - S['t0']:.1f} s)", "",
           f"- **Draw:** {draw}", f"- **Frame (who, where, how big; the main prop):** {frame}", f"- **Camera:** {cam}"]
    ids = [i for i in L["order"] if L["lines"][i].get("scene") == name or (L["lines"][i]["who"] == "chant" and S["t0"] <= L["lines"][i]["t"] < S["t1"])]
    if "*" in poses or ids:
        out.append("- **Poses per line (each with its reason):**")
        if "*" in poses: out.append(f"  - (whole scene): {poses['*']}")
        for i in ids:
            if i in poses: out.append(f"  - `{i}`: {poses[i]}")
            elif L["lines"][i]["who"] in ("pip", "basil", "momo"): out.append(f"  - `{i}`: the speaker talks (talking sprite); listeners: {LISTEN}.")
            else: out.append(f"  - `{i}`: listeners: {LISTEN} (the automatic reaction in lib.js reactPose only where the line asks a question or names a problem).")
    out += [f"- **Hidden animal:** {hid}", f"- **Life:** {life}", f"- **Light:** {light}", f"- **Sound (ambience and foley, on the marks):** {snd}"]
    mk = [f"`{k}` {fm(v)}" for k, v in sorted(marks.items(), key=lambda x: x[1]) if S["t0"] <= v < S["t1"]]
    if mk: out.append("- **Marks:** " + ", ".join(mk))
    if ids:
        out.append("- **Lines:**")
        for i in ids:
            x = L["lines"][i]; out.append(f"  - `{i}` {fm(x['t'])} {x['who'].upper()}: {x['text']}")
    return "\n".join(out) + "\n"
TITLES = {1: "Fish, Frog or Lizard? What Does a TADPOLE Become?", 2: "Why Did This Grasshopper Leave Its SKIN Behind?"}
doc = [HDR]
for part, sc in ((1, P1), (2, P2)):
    L = json.load(open(f"{H}/tl_p{part}.json")); doc.append(f"\n## Part {part} · \"{TITLES[part]}\" · {fm(L['END'])}\n")
    for S in L["scenes"]:
        if S["name"] not in sc: doc.append(f"### {fm(S['t0'])} · `{S['name']}` · (no staging written: add it)\n"); continue
        doc.append(block(S["name"], sc, S, L, L["marks"]))
open(f"{H}/SCENES_TODO.md", "w").write("\n".join(doc)); print("SCENES_TODO.md", sum(len(x) for x in doc), "chars")
