# EP17 · Teacher's-eye review (Stage 2.5, 23 Nov 2026)

A fresh pass over the FIRST full renders of both parts (5:19.5 and 5:27.4), the way the teacher judged EP1: stills at every scene
(`sheet_part1.png`, `sheet_part2.png`), at every buddy line (`qa/lines_p1.jpg`, `qa/lines_p2.jpg`: 22 lines each, taken at 60% of the
line), every pose moment on screen (`node pose_audit.js 1|2`: 42 and 41 moments) and the four countdowns measured in the rendered files.
Checked one by one against SERIES_FORMAT 1b, 1c, 1d, 4, 5 (v2 cast, proportions, one job per pose), 6, 9 and the rules before "6. Motion".
Every note below was fixed in the files and both parts were re-rendered whole (the fixes touched the lime-plant set used by most of Part 1).

## What was already right
- **Countdowns** (measured in the rendered video and mix, `measure_countdowns.py`): P1 Round 1 3 s, numbers step at 54.87 / 55.87 / 56.87 /
  57.87 (1.00 s each), ticks and bell on the same frames; P1 HOLD ON! 5 s, steps 1.00 s (picture 1 frame after the tick, 33 ms); P2 Round 1
  5 s, steps 1.00 s exactly; P2 Showdown 5 s, steps 1.00 s (1 frame late). No music under any countdown; no ambience one-shot inside them.
- **Sound:** both parts -16.0 LUFS integrated; ambience per place (the garden with birds and far children, drips after rain, the corridor's
  hum and a lift ding, the void deck), foley on the marks (the munch, a tick per leg pair, the hooks' clicks, the hatch's crack, the moult's
  creak, the pupa's soft pulse, the case's crackle, the wings' rustle and flutter, plips on the pail, the plate's splash, a soft tone per
  dimming tile, the dragonfly's buzz, the nymph's gulp).
- **Look-closers** (4): the thing fills the panel, each part its own push-in and a colour-coded label joined to it (six legs teal, prolegs
  orange, tiny hooks violet; pupal case purple; wings / feelers / legs; the water's surface blue, the little tube orange; still water blue),
  a buddy face peeking in and reacting with a reason (Momo thinking then shy at the legs, Pip thinking at the pupa and at the plate, Basil
  surprised at wrigglers in so little water), one verdict each, held. The why is shown: the hooks grip the twig and it walks; a cut-away
  window in the pupa with the wings, feelers and legs forming, the case darkening, the butterfly out with crumpled wings that spread flat;
  the wrigglers dive when a shadow passes and come back up to breathe; the plate tipped out and the loop's tiles going dim one by one.
- **Journeys** (2): first person with the You tag, the buddies shrunk riding along on a leaf / a floating leaf, reacting at each stop.
- **Realism:** caterpillar with three pairs of pointed true legs and five pairs of prolegs (4 + the tail pair); a green pupa held by a
  silk pad and a thin girdle, no cocoon; the lime butterfly black with cream-yellow patches and a red-and-blue eyespot, no tails; the
  wriggler hangs head-down with its tube at the surface; the comma-shaped pupa with two breathing tubes; mosquitoes small and never biting;
  the moth with feathery feelers; the dragonfly red with four clear wings held flat; its nymph with six legs and no wings. Loops have no
  numbers, no START, no END. No "metamorphosis", no "cells".
- **Dengue** is calm: a child resting in bed, cared for, a thermometer; "only some carry it". The homework's line 3 is struck and rewritten
  in green; four of the five little mosquitoes lose their warning badge.
- **Hands:** the adult's hand tipping the plate (hand15), the YOU hands and the crossed arms all have four fingers and a thumb.
- **Every book strip is read aloud** (a704, a903, a1102, a1201, b806: Heart); every Mark Sentence by its buddy.

## Notes and fixes
1. **The hidden moth was not visible in three scenes** (answer1: the bench was off-screen after the push-in; larva: the watering can stood
   behind Basil; ring: the board's leg left the frame during the push). New fair spots, each seen in its scene: a lime leaf at the plant's
   left (answer1), the watering can now on the pot's LEFT side, visible under the larva card (larva), the board's top-left corner (ring).
   **The dragonfly in `fix`** sat behind the dengue picture: now on top of the HDB letterboxes. Never the intro spots; never twice in one spot.
2. **The game's push-in showed the moth on the notice board**, not the pillar (the notice board overlapped the pillar): the notice board
   moved off the pillar (BG.lime17 re-baked); the moth now sits on the plain pillar.
3. **Answer (P1 1:19):** "the butterfly" label hidden by Basil's head, the ≠ sign over the caterpillar's tail, "the caterpillar" label under
   Momo's pick number, the small dare cards above the butterfly card: the butterfly card moved up and left, the sign between the two, the
   dare cards and the coin to the right top, Basil and the pick numbers moved clear.
4. **Ring (P1 4:04):** the life-cycle board was drawn BEHIND the lime plant and half hidden: now in front, centre-right, the camera pushing
   in on it; Momo moved apart from Basil.
5. **HOLD ON! (P1 2:59):** Pip's JUST RESTING! board was behind the plant's leaves: now in front of the plant; Pip's bubble moved clear of
   its title. Basil's "pointing at the glow" lasted 0.4 s (he speaks through it): now he points after his line until PUPA lands, then cheers.
6. **Inside the pupa:** the labels (pupal case, wings, feelers, legs) were inside the camera's zoom and left the panel at the top; now drawn
   on the panel, joined by lines to the exact parts. "pupal case" and "feelers" overlapped: the case label goes when the shapes start to
   form. The "speeded up" clock and the day dots sat under the book strip: moved lower. The butterfly coming out was cut by the panel's top:
   the camera now follows it.
7. **The legs look-closer:** the "six legs" and "prolegs" labels were cut off at the bottom when the camera pushed in: now fixed on the
   panel, lines to every leg; the lens's hooks are bigger.
8. **Fun facts (both parts):** "surprised" showed AFTER the buddy's line (an ordering bug): the fun-fact buddy now just talks (no pose
   without its moment). The reveal pill "It was on ..." was half covered by the buddy's bubble and by the buddy at the left: pill, panel
   and bubble moved apart.
9. **Cliffhanger:** Basil's "surprised" fell inside his own line (talking sprite): dropped; he thinks after his question. The pail now has
   its label ("an old pail of rainwater": every sample named).
10. **Wrigglers look-closer:** Pip's bubble covered "the water's surface": the bubble moved to the lower middle; the label to the panel's top.
    The Round 1 ring's picture spilled outside the ring (the water's surface rectangle): clipped to the ring.
11. **The plate look-closer** used only half the panel and the tipped plate became a long orange plank: the panel is filled (the plate big
    at the left, the loop big at the right), the adult's hand grips the rim and tips it, the plate comes back flat and empty and moves aside,
    the three life pictures come along the top left; STAGNANT WATER no longer lands on "tiny wrigglers!".
12. **Showdown:** Pip's reveal bubble covered line 3 of the homework (the very line being discussed): moved to the top right. In `fix` the
    sheet sat under the book strip: smaller and lower.
13. **Mosquito journey:** the new wings unfolded off-screen (a mirroring bug): fixed; the dark egg rim, the grey squeeze and the black comma
    softened; the pupa's two breathing tubes shown with a label.
14. **Dare (P2):** the frog and mosquito boards on the stone table were tiny and hidden by the cards: bigger, higher, the cards lower.
15. **The answer's x / tick chips and pick numbers** in `mosqans` overlapped Momo and Pip: spread out.

## Still to watch (not fixed; for the teacher)
- Momo does not cheer when DENGUE lands (SCENES_TODO asked for it): cheering at the name of a sickness felt wrong; she smiles and listens,
  then explains it. Change back if the teacher wants the cheer.
- Pip's "waving hello" in the game (a301r) and Basil's "munching along" in the journey are not staged (the routines have no hook for them).
- The P1 journey's "upside down" hang is a slow 180° turn of the leaf world; it reads, but it is the weakest beat of that journey.
- The flower-pot plate's water is drawn as a thin flat layer; a real plate holds little water, which is the point, but at phone size the
  magnifier carries the message.
