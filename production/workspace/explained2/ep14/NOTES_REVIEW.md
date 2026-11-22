# EP14 — teacher's-eye review (Stage 3, 2026-11-22)

Fresh reviewer (did not draw EP14). Looked at stills of every scene and every buddy line of the Stage 2 render
(`ep14_part1.mp4` 5:34.5, `ep14_part2.mp4` 5:28.3: 76 + 72 stills), full-size frames of every doubtful spot, both
countdowns frame by frame, and `qa/ep1_compare_p1.jpg` / `_p2.jpg`. Benchmark: EP1. Times are the Stage 2 render's.
Worst first. **FIXED** = changed in the code and checked in a new still and in the Stage 3 render.

## Problems

1. **P1 1:09–1:15 Round 1: the three picture cards show only rooftops.** The pictures sit too high in the cards, so
   the Sun, the globe and the cloud (the only thing that tells the cards apart) are cut off; all three cards look the
   same to a child. **FIXED** (p1.js r1 pics: the whole board in each card).
2. **P1 1:09–1:15 "Never look at the Sun." sits on card 3's label** ("Clouds h[Never look…]"). **FIXED** (small print at
   the top left, clear of the clue labels).
3. **Both parts, every lock-in reveal (P1 1:16–1:26, P2 0:57–1:06): the buddies' bubbles cover the answer cards** they
   are talking about (Momo's covers card 3, Basil's covers cards 2–3). **FIXED** (lockN: the stage shrinks a little
   more and rises; each pick's bubble sits under the cards).
4. **Countdown ring empty during the last second** while the number still shows 1 (all four countdowns). **FIXED**
   (lib.js ringState: the arc shows the number, 3/3 → 2/3 → 1/3, one step on each tick, empty only on the bell).
   EP1-style pulse, number pop, YOU hand bob and fidgeting buddy were already there.
5. **Lock-in: the ring's number badge touches card 2's badge; the lead buddy's "?" pick card touches card 1; "1, 2 or
   3 fingers" is half under card 3 and the hand.** **FIXED** (ring 20 px up, cards 5 px down; lead pick card closer to
   her; the fingers pill above the YOU pill).
6. **P1 1:46 look-closer sky: the "nighttime" tag sits on the "no clouds" label, and Pip's bubble covers "no Sun".**
   **FIXED** (flat14.js skyArt: "no clouds" to the right sky, "no Sun" up in the dark sky; the row of four skies 90 px
   right, clear of the speaker's face).
7. **P1 2:08–2:22 globe and torch: the speaker's bubble covers the torch** for the whole look-closer (we are told "the
   torch stays still" and cannot see it). **FIXED** (bubble in the free sky at the top left: lib.js autoSay accepts a
   scene's free spot, `window._BUBAT`).
8. **P2 3:43–3:52 three chickens: the bubbles cover the chick** (the label "a chick" points into the bubble); the
   label "a grandmother hen" was under the small print (known, fixed in Stage 2 code). **FIXED** (bubble top right;
   the small print at the bottom).
9. **P2 4:37–4:41 fun fact: the panel is empty for 4 s** while Pip says "A baby ladybird looks nothing like its
   parent." **FIXED** (the ladybird picture lands on "ladybird", then larva and pupa fill in as they are named; the
   arrows only appear once both ends are there).
10. **P2 1:07–1:10 look-closer THEN/NOW: the panel is an empty cream box for 3 s** while Heart says "Look closer. Here
    is the same place, then and now." **FIXED** (the THEN photo is in as soon as the panel opens; NOW still lands on
    "now").
11. **P2 1:24–1:34 the LIVING tag covers "the same size", and the GROW pop covers "taller".** **FIXED** (the height
    labels bow out when LIVING / NON-LIVING land; the dotted lines stay).
12. **P1 3:26–3:29 Cycle check: Pip's bubbles cover CYCLE CHECK and the IT CHANGES box** while he ticks it. **FIXED**
    (his bubble over the wall, above the board).
13. **P1 4:12–4:17 HOLD ON! answer: Pip explains why the pencil is not a cycle but he is small (a quarter of the frame)
    and his bubble covers the board.** **FIXED** (Pip big beside the board, Momo on the other side of Basil).
14. **P1 4:21–4:38 traffic light: the CYCLE CHECK board is tiny (about a sixth of the panel) and still shows the
    pencils' NOT A CYCLE** next to the traffic light until 4:33. **FIXED** (board 1.45× bigger at the right; it starts
    clean and fills with green / amber / red).
15. **Both parts, game scene (P1 0:30–0:53, P2 0:12–0:24): Pip is half behind the finder, the third buddy is cut by
    the frame edge, all three bunched at the right.** **FIXED** (spread across the right half; Pip clear of the score
    hand).
16. **Both parts, key words (P1 5:00–5:11, P2 5:04–5:16): the three buddies small and bunched in the bottom-right
    corner, Momo cut off.** **FIXED** (Pip at the left under YOU, Basil and Momo at the right).
17. **P1 5:20 "PART 2" slams on top of the "living and non-living things" strip; Momo's bubble overlaps the strip;
    Pip's ear covers "a teddy bear".** **FIXED** (PART 2 in the free space under the strip, cards left, bubble lower).
18. **P1 2:26–2:31 answer: two loose ⊗ chips float in the air beside Momo and Pip** (a child cannot tell what they
    mean). **FIXED** (Momo's "1" and Pip's "3" pick cards, each with its x).
19. **P1 2:46–3:08 journey "Be the little red dot": no "you are here"** (only the You: tag at the top). **FIXED** (a
    bobbing YOU pill with an arrow on the red dot, EP1's YOU).
20. **P2 2:30–2:38 Be a chick: the wing tips read like two leaves; the riders cover "Week 1" and "speeded up".**
    **FIXED** as far as drawing in code allows (round fluffy wings with feather lines and YOU between them; the week
    and speeded-up pills at the top left). A painted pair of chick wings would be better: see "needs a painting".
21. **P2 4:50–5:04 the mango dare has Basil and Pip but no Momo; Pip is cut by the frame edge.** **FIXED** (Momo beside
    Pip, reacting; the three boards a little smaller and left).
22. **P1 0:06–0:22 "Last time…": the three pictures are small in a big empty stage.** **FIXED** (1.2× bigger, spread).
23. **Hen wings (P1 cliffhanger card, P2 garden, look-closers): a pale oval in the middle of the wing reads like an
    egg in a hole.** **FIXED** (no oval; the feather lines stay).
24. **P1 2:40 "It LOOKS as if the Sun moves" frame stands in front of Basil.** **FIXED** (frame 70 px left).
25. P1 2:00 the adult's arm that presses the sticker on the globe is a plain blue sleeve from the top of the frame (on
    screen about 1 s). Not changed: acceptable as "a grown-up's hand", but a painted hand would look better.
26. P2 3:19–3:25 Showdown: Pip's pointing paw touches line 3's first letter for a moment; the pick buddies pop over
    "line 1, 2 or 3?" after the bell. Not changed (brief, nothing hidden that is being read).
27. Thumbnail 1: the torch beam comes from the left. Checked against the video: the look-closer has the torch on the
    left too, so the thumbnail matches what the child will see. Not changed.
28. The one off-frame console error (P2 2:34, chickJourney grass): fixed in garden14.js in Stage 2; the Stage 3 stills
    and render show no page errors.

## Listen-proxy (measured on the stems, `STEMS=1 node song.js P`)
- The place beds (living room, garden) are at least 22 dB under every speech line (P2), so ambience never masks
  speech; median speech is 7.5 dB over everything else together.
- Lowest margins are by design: "One! two!" under the Now-you-know music (the class counts with it), and Heart's first
  game line over the game sting (+1.7 dB). Captions (`.srt`) follow the aligned words; no cue overlaps.

## Needs the teacher's eye or a new painting
- Chick wings for the Be-a-chick journey (first person): a painted pair would read better than code shapes.
- A grown-up's hand / arm (sticker on the globe, P1 2:00).
- Momo's "sit" talking sprite is her arms-crossed painting (as decided), so all her talking looks arms-crossed.
- Lengths stay over target (5:34 / 5:28) as accepted for the trial.
