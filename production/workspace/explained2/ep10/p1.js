// p1.js: PART 1, "A Metal Spoon SINKS. So How Does a Giant Metal Ship FLOAT?": float or sink, the material matters, trapped air.
// Segments 1-14 of p3_ep10_script.md (version 1, 21 Nov 2026; the teacher's go-ahead in its section 12).
// STAGE 1 (setup): the shared routines are wired (the calm recap of EP9's dare with its three cards, game, goals, countdown, the HOLD ON! ring
// with its two pictures and clue labels on top of the ring, round card, the lock-in with its clue tag on top of the ring, Mark Sentences read
// by the buddy, the book strips, the LOOK-CLOSER frame, score hand, read-along, "Now you know!"); every scene with new art is a phScene
// placeholder (and each [LOOK CLOSER] an lcPH placeholder inside the real frame). STAGE 2 (Fable) draws them: see SCENES_TODO.md.
if (PART === 1) { (() => {
const L1 = "e702";
// the scores (script section 3): HOLD ON! 1 : 0, Round 1 2 : 1
SCORE.push([W("e603", "one") - .1, 1, 0]);
SCORE.push([W("e806", "one") - .1, 2, 1]);
const FOOT = "P3 · Diversity of Materials · Float or sink";
const stageNote = (txt, y = 1000) => T(960, y, "(Stage 2: " + txt + ")", 24, "#fff", { w: 500 });

/* 1 · silent cold open: a beach shelter at East Coast Park */
SC.cold = (t, s) => phScene(t, s, "1 · Cold open: a beach shelter at East Coast Park (no voice)", ["Bright morning: a shelter roof on pillars, a round stone table with stone stools, sand, coconut palms, the sea; on the horizon a row of giant ships at anchor, each with a clear waterline; breakwater rocks at the left. On the table, spaced out: the clear tub OUR TUB (three-quarters full); a small tray with a wooden block, a metal block, a wooden spoon and a metal spoon; a stainless-steel bowl and a jug. Small print upper left: Water play? Always with an adult.",
  "MK boardsIn: EP9's two dare boards slide in low along the table with dust and stand at the back (the metal spoon on the bottom of a tub, tags metal · sinks; the giant metal ship on the sea, tags metal · floats; reuse ep09/p2.js SC.dare's boards once drawn). MK budsIn: Pip, Basil (surprised) and Momo pop in beside the table. The little OTTER swims on the spot by the rocks (every wide beach shot). Location pill: East Coast Park, Singapore. No title."]);

/* 2 · "Last time...": EP9's dare, word for word, two calm pictures (each >= 2.5 s, one label each); the three cards light as Heart counts */
SC.lasttime = (t, s) => { const L = "e202", t2 = W(L, "but") - .2, i = t >= t2 ? 1 : 0, tb = [s.t0, t2], labs = ["A metal spoon sinks", "What is inside the ship?"];
  const what = ["EP9's dare board: a clear tub of water, a metal spoon lying on the bottom (tags metal · sinks)", "EP9's dare board: the giant metal ship on the sea, its hull partly below the waterline, a big ? on its hull (tags metal · floats)"];
  const z = 1 + .05 * eio((t - tb[i]) / 4), k = ramp(t, tb[i] + .05, .5), cards = ["Wood", "Air", "More metal"], tc = [W(L, "one"), W(L, "two"), W(L, "three")];
  return bg("stage2") + OP(ramp(t, s.t0, .3), T(960, 110, "Last time…", 60, "#fff", { w: 600 }))
    + OP(k, `<g transform="translate(960 ${i ? 470 : 540}) scale(${n2(z)}) translate(-960 -540)"><g filter="url(#drop)"><rect x="460" y="230" width="1000" height="560" rx="36" fill="url(#gPaper)"/></g>${tpill(960, 280, "PICTURE " + (i + 1) + " · STAGE 2: TO DRAW", 26, P.coral, "#fff", { w: 700 })}${wrap(what[i], 40, 900, 600).map((l, j) => T(960, 420 + j * 56, l, 40, P.ink, { w: 600 })).join("")}</g>`
      + (i ? cards.map((c, j) => TF(600 + j * 360, 830, .6 * spring(t, t2 + .5 + j * .15, .45), ansCard(j + 1, c, { w: 340, pulse: pulse(t, tc[j], .04, .9) })   /* each card glows as Heart counts it (no tick: the answer is not given here) */)).join("") : "")
      + TF(960, i ? 1010 : 960, spring(t, tb[i] + .3, .4), tpill(0, 0, labs[i], 50, P.sun, P.ink, { w: 700 }))) + HUD(t); };
SC.tests = (t, s) => phScene(t, s, "2 · Back at the table: OUR 3 WATER TESTS", ["Back at the beach table. The board OUR 3 WATER TESTS slides in low and stands at the end of the table, centred between the discs: 1 DROP IT IN · 2 DRIP ON IT · 3 WAX IT, three empty tick boxes; row 1 glows. Pill: Hold on to your answer!",
  "Placeholder board below: board3() in tests.js (functional rows and ticks; redraw it)."]) + TF(1500, 1040, .55, board3(t, { glow: 0 }));
SC.title = (t, s) => phScene(t, s, "2 · Title slam", ["The picture dims. Title slams in: A METAL SPOON SINKS (white) then A METAL SHIP FLOATS?! (sun yellow). Reuse slamLine / slamK (canteen.js). The second slam is the first thing to cut if Part 1 runs long."]);

/* 3 · the game, and the hidden otter; 4 · goals (Basil reads) and the countdown (count is in common.js) */
SC.game = (t, s) => gameScene(t, s, "e301", true);
SC.goals = (t, s) => goals3(t, s, [["Float or sink", ""], ["The material matters", ""], ["Why a metal ship floats", ""]], ["e401", "e402", "e403", "e404"], "basil");

/* 5 · test one: DROP IT IN. Two blocks; [LOOK CLOSER] the tub (FLOAT and SINK pop beside the blocks: lib.js o.at); the book's strip; tick 1 */
SC.blocks = (t, s) => phScene(t, s, "5 · Two blocks, the same size", ["At the beach table, row 1 DROP IT IN glowing on the board. An adult's two hands hold the two blocks just above the tub, side by side (exactly the same size and shape). Tags: wood · metal; a shared tag same size. The camera starts to move in on \"Look closer\" (the set the look-closer zooms in from)."]);
SC.lcblocks = (t, s) => lcPH(t, s, { title: "The tub: two blocks, then two spoons (slow motion)", v: "v_wood", verdict: ["WOOD FLOATS · METAL SINKS", "#3B2A8C"], fx: 960, fy: 600,
  notes: ["Tag slow motion. The tub's side fills the frame (clear plastic, a level water surface with a bright line, the label OUR TUB). The hands lower both blocks and let go. THE WOODEN BLOCK (e502) dips, bobs up and settles about half under the water; plain label line It floats; FLOAT pops beside it (kw_float, wired: lib.js o.at [600, 300]).",
    "THE METAL BLOCK (e503) goes straight down with a few small bubbles and rests on the bottom with a soft tok; label It sinks; SINK pops beside it (kw_sink, [1320, 300]). MK spoons: the hands lower the two spoons (tags wood · metal, same shape): the wooden spoon lies low and level at the surface; the metal spoon goes down and rests beside the metal block (e504).",
    "Verdict WOOD FLOATS · METAL SINKS at v_wood (two lines or two colours: the words FLOATS green, SINKS blue, on cream). The metal block STAYS on the bottom of the tub: segment 8 and the bowl need it."] });
SC.woodstrip = (t, s) => phScene(t, s, "5 · Most types of wood float; most metals sink (3.17)", ["Pull back to the table: the tub with the wooden block and spoon at the surface, the metal block and spoon on the bottom. The book's two sentences on cream strips (wired: bookCaption, one strip per sentence; wood float and metals sink highlighted, >= 3.5 s).",
  "Basil big in his disc (cheer) says e506 (cuttable, last). MK tick1: a green tick is stamped on 1 DROP IT IN (board3 below)."]) + bookCaption(t, "e505", "Most types of wood float on water.", 130, { size: 50, keys: ["wood", "float"] }) + bookCaption(t, "e505", "Most metals sink in water.", 230, { size: 50, off: 7, keys: ["metals", "sink"] }) + TF(1600, 1040, .42, board3(t, { glow: ticked(0, t) ? -1 : 0 }));

/* 6 · HOLD ON! Momo's rule. WIRED (model: ep08/p1.js SC.rule): Momo's bubble with the ✗ chip, the HOLD ON! stamp, the YOU ring with crossed
   arms (5 s), the two pictures in the ring with their clue labels ON TOP of the ring frame, kept through the countdown and Heart's two facts,
   the bell, the coin. Stage 2 draws the beach behind and the two small pictures (the giant ship on the sea; the metal spoon on the tub's bottom). */
const RG = [1240, 520], RR = 150;
SC.holdon = (t, s) => { const a = "e601", b = "e602", c = "e603", r0 = MK("ring0_hold"), bell = MK("bell_hold"), rs = ringState(t, r0, 5), tX = W(b, "cross") - .15, tH = W(b, "hold") - .1, tOne = W(c, "one") - .1, ring = t >= tX && t < LE(c) + .4;
  const pics = `<circle cx="${RG[0] - 64}" cy="${RG[1]}" r="62" fill="#fff" opacity=".85"/>${T(RG[0] - 64, RG[1] + 10, "ship", 28, P.ink)}<circle cx="${RG[0] + 64}" cy="${RG[1]}" r="62" fill="#fff" opacity=".85"/>${T(RG[0] + 64, RG[1] + 10, "spoon", 28, P.ink)}`;
  const labels = TF(RG[0] - 170, RG[1] - RR - 34, spring(t, tX + .2, .4), tpill(0, 0, "very heavy · floats", 28, "#fff", P.ink, { w: 700 })) + TF(RG[0] + 170, RG[1] - RR - 34, spring(t, tX + .35, .4), tpill(0, 0, "light · sinks", 28, "#fff", P.ink, { w: 700 }));
  return bg("stage2") + stageNote("the beach shelter behind, dimmed a little; in the ring the giant ship on the sea and the metal spoon on the bottom of the tub", 160)
    + buddy("momo", 330, 1060, 300, t, { aura: true, in: s.t0 + .1, poses: [[s.t0, "thinking"], [LE(a) + .15, "sit"], [W(c, "giant") - .12, "surprised"], [LE(c) + .1, "sit"]], nohop: true })
    + say(a, 560, 300, t, { size: 42, tail: -200, x: true, maxW: 640 })
    + (ring ? OP(1 - ss(LE(c) + .1, LE(c) + .4, t), TF(RG[0], RG[1], spring(t, tX, .4), `<g transform="translate(${-RG[0]} ${-RG[1]})">${ringTimer(RG[0], RG[1], t < r0 ? 1 : t < bell ? rs.frac : 0, t < r0 ? 5 : t < bell ? rs.secs : 0, t, { R: RR, sw: 24, tick: rs.tick, shut: pulse(t, bell, .01, .6), inner: pics + (t < bell + .3 ? OP(.85, TF(RG[0], RG[1] + 40, .38, crossedArms())) : "") })}</g>`)
      + labels + youPill(RG[0] - 250, RG[1] + 120, 1.0) + tpill(RG[0], RG[1] + RR + 60, "cross your arms", 30, P.ink, "#fff")) : "")
    + stamp(t, tH, 900, 420, "HOLD ON!") + bellIcon(t, r0) + coin(t, tOne, 1680, 860, "+1", "arms crossed") + HUD(t); };
SC.mark1 = (t, s) => markScene(t, s, { id: "e606", sayId: "e605", who: "momo", n: "1 of 2", text: "The material of an object affects the ability of the object to float or sink.", keys: ["material", "float", "or", "sink."], size: 64, y: 250, footer: FOOT,
  extra: stageNote("under the card the wooden block at the surface and the metal block on the bottom light in turn", 1010) });

/* 7 · Round 1: the dare from EP9 (a short 3 s ring); clue tag "metal · floats" on top of the ring, kept through the countdown */
SC.puzzle = (t, s) => phScene(t, s, "7 · Pip: \"But a ship is metal. And metal sinks!\"", ["Pip big in his disc (thinking pose), looking from the metal block on the bottom of the tub to the ships on the horizon. A curious note."]);
SC.r1card = (t, s) => roundCard(t, s, "ROUND 1", "YOUR ANSWER FROM LAST TIME");
SC.r1 = (t, s) => lockN(t, { cards: ["Wood", "Air", "More metal"], tag: "metal · floats", q: "What is inside the ship that helps it to float?", tq: W(L1, "what") - .1, tc: [W(L1, "wood"), W(L1, "air"), W(L1, "more")], ring0: MK("ring0_r1"), dur: 3, lock: "e703",
  obj: ringPH("the ship, a big ? on its hull"), picks: [{ who: "pip", id: "e704", word: "1", x: true }, { who: "basil", id: "e705", word: "2" }, HAS("e706") ? { who: "momo", id: "e706", word: "2" } : { who: "momo", word: "2", fixed: true }],
  react: [[LE("e704") + .1, "pip", "thinking"], [LE("e705") + .1, "basil", "cheer"], ...(HAS("e706") ? [[LE("e706") + .1, "momo", "cheer"]] : [])] });

/* 8 · [LOOK CLOSER] inside the ship: the cut-away window, then the solid metal block beside it; the answer */
SC.lcship = (t, s) => lcPH(t, s, { title: "Inside the ship: the cut-away, beside the solid metal block", v: "v_air", verdict: ["TRAPPED AIR INSIDE", "#3B2A8C"], fx: 960, fy: 560,
  setNote: "the picture board grows into a full scene: the giant metal ship on the sea, side on (a long dark hull, a red band below the waterline, a white bridge tower at the back, stacked containers)",
  notes: ["The hull fills the frame; sky and buddies dim. Plain label line on the waterline: part of it is under the water (e801). MK hullwin (on \"opens\", e802): a large see-through window opens in the hull, as the robot's back opened in EP1: inside, big rooms and tall empty spaces with metal walls, ladders and small doors for scale, a soft pale tint; plain label lines to three spaces: air · air · air.",
    "MK split (e803): the frame splits. Left, the ship with its window open (tag lots of air inside). Right, the tub's side in close-up: the solid metal block on the bottom, a small see-through window on it showing metal all the way through (tag solid metal · no air inside). Verdict TRAPPED AIR INSIDE at v_air.",
    "Sound: slow water against metal, a deep hollow boom as the window opens, a soft echo inside; a soft tok for the block. The air is a pale tint with label lines, never clouds."] });
SC.shipans = (t, s) => phScene(t, s, "8 · The answer is two: Air!", ["Back to the round's cards: answer card 2 Air glows. Pip: surprised pose, then a nod (e805, cuttable). Coin +1 if you showed two fingers. Score 2 : 1 (SCORE, wired)."]);

/* 9 · BE THE AIR (the first-person journey) */
SC.waitw = (t, s) => phScene(t, s, "9 · Be the air! (the lift-off)", ["Pill Be the air! The camera lifts off the table and glides out over the sea towards the ships; a soft cream wipe at the scene end. The shelf slides aside (SHELF_HIDE)."]);
SC.shrink = (t, s) => phScene(t, s, "9 · BE THE AIR (first person, second person, present tense)", ["MK sea: you glide just above the waves; the edges of the view shimmer softly (you are air); ahead the ship's side rises like a cliff. Tags You: air · over the sea. MK door: a doorway in the ship's side, as tall as a block of flats, slides towards you; you drift through. Tag into the ship.",
  "MK room: a huge empty room, metal walls on every side, far and tall; a ladder as small as a toy. Tag metal walls all around. MK shut: behind you the heavy door swings shut; the light narrows to a line and is gone; a soft lamp comes on. Tag trapped air.",
  "MK wall: you drift to a round window low in the wall: outside, deep blue water and a fish going by. Tags outside: water · inside: air. MK floaton: the room rocks very gently; through the window the water slides past. Tag The ship floats on. Calm pad, no game sounds."]);

/* 10 · pull back out; Mark Sentence 2 (Basil): TRAPPED AIR pops beside the card as he reads "trapped" (lib.js o.at) */
SC.pullout = (t, s) => phScene(t, s, "10 · Pull back out: the table and the ships", ["Whoosh out to the beach table and the ships on the horizon. Heart: Why does a metal ship float? (e1001, cuttable)."]);
SC.mark2 = (t, s) => markScene(t, s, { id: "e1003", sayId: "e1002", who: "basil", n: "2 of 2", text: "This is because there is a lot of trapped air inside the ship. The trapped air helps the ship to float on water.", keys: ["lot", "trapped", "air", "inside", "helps", "float"], size: 58, y: 230, footer: FOOT,
  extra: OP(ramp(t, s.t0 + .3, .3), T(1150, 175, "Why does a metal ship float?", 44, "#fff", { w: 600 })) + stageNote("under the card, the ship with its window open", 1040) });

/* 11 · the metal bowl; [LOOK CLOSER] it floats, water pours in, it sinks */
SC.bowl = (t, s) => phScene(t, s, "11 · Now, a metal bowl", ["An adult's hands set the stainless-steel bowl on the water in the tub; it floats, its rim above the water. Tag a metal bowl. The jug stands ready. (The set the look-closer zooms in from.)"]);
SC.lcbowl = (t, s) => lcPH(t, s, { title: "The metal bowl: it floats, water pours in, it sinks", v: "v_bowl", verdict: ["THE AIR IS GONE: IT SINKS", WEAKC], fx: 960, fy: 600,
  notes: ["The bowl, seen through the tub's side, fills the frame; the rest dims. Plain label line into the bowl: air inside (e1102).",
    "MK pour (e1103): a hand tips the jug; a thin stream of water runs into the bowl. The water inside rises; the bowl sits lower, and lower; water runs over the rim; the label changes to water inside (e1104); the bowl goes down, level, and rests on the bottom beside the metal block. Verdict THE AIR IS GONE: IT SINKS at v_bowl.",
    "Sound: a thin pour that rises in pitch, a glug, small bubbles, a soft tok on the bottom."] });

/* 12 · the score hand, the otter (lizReveal in common.js), the key words (kwrecap in common.js) */
SC.final = (t, s) => { const L = "e1201"; return finalScene(t, s, L, 1, [[s.t0, null, 1], [W(L, "two") - .1, null, 2]]); };
SC.liz = (t, s) => phScene(t, s, "12 · Did you spot the otter? (lizReveal in common.js)", ["A replay of the wide beach with a ring round the little otter by the rocks; it paddles, lifts its head and waves a paw. Pill: Tell someone at home! Use lizReveal(t, s, \"e1202\", view, x, y, ...) with the beach view and the otter's position."]);

/* 13 · the cliffhanger: rain */
SC.cliff = (t, s) => phScene(t, s, "13 · Cliffhanger: rain", ["The beach under grey clouds; the first fine rain falls outside the shelter (straight fine lines). The board OUR 3 WATER TESTS centred between the discs: 1 DROP IT IN ✓, row 2 DRIP ON IT glowing. An adult's hands slide two things onto the table: a plastic raincoat on a small stand (tag plastic) and a white fabric school shoe on a tray (tag fabric).",
  "Basil big in his disc (surprised) says e1301. A big ? pops between the raincoat and the shoe. PART 2 slams in on \"Find out in Part Two!\" (model: ep08/p1.js SC.cliff)."]) + TF(1600, 1040, .42, board3(t, { glow: 1 }));

/* 14 · "Now you know!": the tub (wooden block floating, metal block on the bottom) centred in the free space between the buddies */
const tubPH = `<g filter="url(#drop)"><rect x="-260" y="-250" width="520" height="250" rx="26" fill="#DDF4FF" stroke="${P.ink}" stroke-width="5" opacity=".9"/></g><rect x="-250" y="-190" width="500" height="186" rx="20" fill="#9FD8F5" opacity=".7"/>${T(0, -110, "OUR TUB (Stage 2)", 40, P.ink)}`;
SC.nyk = (t, s) => nykScene(t, s, TF(960, 1046, 1, tubPH), { bx: [200, 1715, 1375], hx: 470 });
})(); }
