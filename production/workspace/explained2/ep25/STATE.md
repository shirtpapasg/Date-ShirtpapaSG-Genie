# EP25 build state (for a resume after a restart)
P3 EP25 "Magnets are everywhere: fridges, cranes and floating trains" (Ch 7, pp. 119-126; the last Magnets episode and the LAST P3 episode).
The script: `../p3_ep25_script.md` (version 1, Opus, 25 Nov 2026; teacher's go-ahead 25 Nov; pre-approved; the main session reviews first).
The source of every spoken word: `script.py`. EP24's closing dare opens Part 1 word for word (asserted against ../ep24/script.py).
- **Part 1** "Why Does the Fridge Door STAY Shut? Magnets Hiding at Home" **5:13.0** (313.04 s): Pip's HDB kitchen (EP15's baked kitchen
  + art25.js HOME25: the fridge, the aluminium window frame, the café curtain, the little magnetic whiteboard, the MAGNET HUNT card);
  EP24's dare (two, a strip of magnet); be the magnetic strip; MAGNETIC STRIP (Pip); where is the magnet? (the fridge with a magnifier on its
  door's soft edge: the dark strip inside, the steel body; 7.12a fridge, Pip); HOLD ON! Basil on the counter holds a magnet to the shiny
  aluminium window frame (Momo's fix); a whiteboard and a doorstop (the steel sheet under the surface, 7.12a strip; MAGNETIC WHITEBOARD,
  Momo; the doorstop and the door's steel plate against a gust; MAGNETIC DOORSTOP, Basil; 7.12a doorstop, Basil); the honeybee; the
  cliffhanger (Pip's tablet: a floating train).
- **Part 2** "A Train That FLOATS? Cranes, Trains and a Magnet Toy" **5:37.6** (337.62 s): Family Day at the park by the pond (EP16's baked
  pond + bunting, the magnetic fishing stall); Round 1 aluminium clips (two: no fish can be caught); the scrapyard crane (EP23's yardCrane23:
  iron and steel lifted, wood and plastic left behind; ON / OFF; a normal magnet never lets go; 7.12a crane, Momo); the Showdown (Momo's
  magnet-car poster: like poles push); be a floating train; the maglev cut away (like poles facing, push arrows, the gap; MAGLEV TRAIN, Pip)
  and the MRI scanner (drawn simply: the round housing and tunnel, a padded bed, a calm child, a parent's hand, a nurse, a knee picture; 7.13a
  strip; MRI SCANNER, Momo; 7.12a maglev, Pip); interacting (7.14 strip, three pictures; INTERACTING, Basil); the chant; the water strider;
  THE P3 GOODBYE (the MAGNETS EVERYWHERE! map, the 7.13 takeaway, the four P3 topic badges, "Thank you for playing with Pip, Basil and Momo
  all year", "Count the magnets in your home today"; no dare, no promised topic); the key words; "Now you know!".
- Scores: Part 1 1 : 1, 2 : 1; Part 2 1 : 1, 3 : 1.

## Status (25 Nov 2026): BUILT AFTER EP24 (see the end), NOT UPLOADED
## Engine
EP24's engine (itself EP23's), plus art24.js / lc24.js / ep24dare.js as libraries (fridge24, setup24, chip24, darePic24). **New:** art25.js
(HOME25, PARK25, huntCard25, the aluminium window, curtain, whiteboard, doorstop, toy car, maglev and guideway, MRI scanner, toy poster,
tablet, the honeybee and the water strider with FACES notes and their spots BEEAT / STRAT), lc25.js (the four look-closers, the two journeys,
cards / ring / recap / fun-fact / Mark Sentence / chant / goodbye map pictures; fridgeStrip25), p1.js, p2.js, upload.json (after
explained-p3-ep24-part2; replaces zAUE_ZuxcDs with EP24, retire_old true, {EP24_P1} to fill by hand), app_moments.json.

## Rhythm and music
Original series music (no Kampong Walk), quiet journeys; 5 s rings, 6 s Showdown. Measured: Part 1 125 wpm, a voice 77%; Part 2 125 wpm, 77%
(EP1-10 105-117 wpm, 68-75%; EP22-23 125-136, 79-81%).

## Checks done
- Voices: not aligned (spread by word length): m303b, m503, m703. Sweeps: 0 bad both parts. Ghost scan: Part 1 none; Part 2 one ghost found
  (Momo at the end of the train look-closer: its blurred set had the buddies in it) and fixed (the set is the park only): none now.
  Facing scan: no backwards movers (the bee, the strider stay on the spot; the tablet's train and the toy car travel nose first).
- Render / decode / countdowns / loudness: see the end of this file.

## Changed from the script (and why)
1. The whiteboard is drawn on Pip's kitchen wall (one room for Part 1); the recorded lines keep "Momo's magnet" and "the board in my study corner".
2. Part 2: `usbridge` and `stridertip` cut (Round 1's question and Pip's answer keep their first, recorded wording).
3. The HOLD ON!: Basil stands on the kitchen counter to reach the window frame (the magnet at his raised paw touches the frame's corner).
