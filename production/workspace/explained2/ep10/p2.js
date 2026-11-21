// p2.js: PART 2, "Raincoat vs School Shoe: Which One SOAKS UP the Rain?": absorb, waterproof, wax (treatment).
// Segments 1-16 of p3_ep10_script.md (version 1, 21 Nov 2026; the teacher's go-ahead in its section 12: the wax goes on rubber-soled fabric
// BOOTS and is named "shoe wax"; the drop test still compares the plastic raincoat with a fabric school shoe).
// STAGE 1 (setup): the shared routines are wired (the calm recap, game, goals, round card, the lock-in with its clue tag on top of the ring,
// Mark Sentences read by the buddy, the book strips, the LOOK-CLOSER frame, chant, score hand, read-along, "Now you know!"); every scene with new
// art is a phScene placeholder (and each [LOOK CLOSER] an lcPH placeholder inside the real frame). STAGE 2 (Fable) draws them: see SCENES_TODO.md.
if (PART === 2) { (() => {
const L1 = "f401";
// the scores (script section 3): Round 1 1 : 1, Showdown 3 : 1
SCORE.push([W("f508", "one") - .1, 1, 1]);
SCORE.push([W("f1108", "two") - .1, 3, 1]);
const FOOT = "P3 · Diversity of Materials · Waterproof";
const stageNote = (txt, y = 1000) => T(960, y, "(Stage 2: " + txt + ")", 24, "#fff", { w: 500 });

/* 1 · "Last time...": three calm pictures from Part 1, one at a time, each >= 2.5 s, centred and large, a gentle push-in, one label each */
SC.lasttime = (t, s) => { const L = "f101", tb = [s.t0, W(L, "a") - .2, W(L, "now") - .2], i = t >= tb[2] ? 2 : t >= tb[1] ? 1 : 0, labs = ["Wood floats · Metal sinks", "Trapped air inside", "Test 2: drip on it"];
  const what = ["the tub: the wooden block and spoon at the surface, the metal block and spoon on the bottom", "the giant ship with the see-through window open in its hull (big rooms, pale tint, air · air · air)", "the raincoat and the school shoe in the first rain; the board's row 2 DRIP ON IT glowing"];
  const z = 1 + .05 * eio((t - tb[i]) / 4), k = ramp(t, tb[i] + .05, .5);
  return bg("stage2") + OP(ramp(t, s.t0, .3), T(960, 110, "Last time…", 60, "#fff", { w: 600 }))
    + OP(k, `<g transform="translate(960 540) scale(${n2(z)}) translate(-960 -540)"><g filter="url(#drop)"><rect x="410" y="200" width="1100" height="640" rx="36" fill="url(#gPaper)"/></g>${tpill(960, 250, "PICTURE " + (i + 1) + " · STAGE 2: TO DRAW", 26, P.coral, "#fff", { w: 700 })}${wrap(what[i], 40, 960, 600).map((l, j) => T(960, 420 + j * 56, l, 40, P.ink, { w: 600 })).join("")}</g>`
      + (i === 2 ? TF(960, 800, .4, board3(t, { glow: 1 })) : "") + TF(960, 960, spring(t, tb[i] + .3, .4), tpill(0, 0, labs[i], 50, P.sun, P.ink, { w: 700 }))) + HUD(t); };

/* 2 · the new place (the void deck in the rain), the game and the hidden snail; 3 · goals (Momo reads) */
SC.place = (t, s) => phScene(t, s, "2 · The void deck of an HDB block in the rain (no voice)", ["Pillars, a round stone table, the letterboxes (EP9's void deck); at the open edge a row of big flower pots where the rain falls (straight, fine lines, outside only); beyond, a covered walkway with a metal roof and the block opposite. On the table: the raincoat on its stand, a tray with a white fabric school shoe, a pair of fabric boots with rubber soles, a dropper and a small cup of water, a block of SHOE WAX; the board OUR 3 WATER TESTS (row 1 ticked) beside it.",
  "The three buddies in their discs, dry under the block. Location pill: The void deck of an HDB block, Singapore. Small print upper left: Water play? Always with an adult. On the rim of the biggest flower pot, small, the SNAIL glides slowly (every wide void-deck shot)."]);
SC.game = (t, s) => gameScene(t, s, "f201", false);
SC.goals = (t, s) => goals3(t, s, [["What waterproof means", ""], ["Waterproof or not waterproof", ""], ["Wax makes fabric waterproof", ""]], ["f301", "f302", "f303", "f304"], "momo");

/* 4 · Round 1: the raincoat or the shoe? (clue tag "plastic · fabric" on top of the ring, kept through the countdown) */
SC.r1card = (t, s) => roundCard(t, s, "ROUND 1");
SC.r1 = (t, s) => lockN(t, { cards: ["The raincoat", "The shoe", "Both"], tag: "plastic · fabric", q: "Which one does the water soak into?", tq: W(L1, "which") - .1, tc: [W(L1, "one", 1), W(L1, "two"), W(L1, "three")], ring0: MK("ring0_r1"), dur: 5, lock: "f402",
  obj: ringPH("raincoat + school shoe"), picks: [{ who: "momo", id: "f403", word: "3", x: true }, { who: "basil", id: "f404", word: "2" }, { who: "pip", id: "f405", word: "2" }],
  react: [[LE("f403") + .1, "momo", "thinking"], [LE("f404") + .1, "basil", "cheer"], [LE("f405") + .1, "pip", "pointing"]] });

/* 5 · test two: DRIP ON IT. [LOOK CLOSER] the slow drop test (ABSORB pops beside the shoe: lib.js o.at); the answer; tick 2 */
SC.lcdrip = (t, s) => lcPH(t, s, { title: "The slow drop test: the raincoat, then the school shoe", v: "v_absorb", verdict: ["FABRIC ABSORBS WATER", WEAKC], fx: 960, fy: 600,
  setNote: "the void deck table: the raincoat's sleeve on its stand and the white fabric school shoe on its tray, a dropper held above each by an adult's hands",
  notes: ["Tag slow motion. THE RAINCOAT (f501): the sleeve fills the frame; one drop falls and lands: it wobbles and sits on top as a round bead with a highlight; a round magnifier opens: smooth plastic, no gaps. f502: a finger tilts the sleeve, the bead rolls off and falls away; plain label line dry.",
    "MK toshoe (f503): the camera slides to the toe of the school shoe, as large; one drop lands, flattens at once and spreads; a dark wet patch grows; the magnifier on the weave (threads over and under), the water goes in between the threads. Label The water goes in. ABSORB pops beside it (kw_absorb, wired: o.at [1450, 300]).",
    "MK sock (f505): a cut view of the shoe from the side, a sock inside; under the wet patch a small dark spot appears on the sock. Label It passes through. Verdict FABRIC ABSORBS WATER (blue) at v_absorb. Heart says soaks in, never sinks in."] });
SC.dripans = (t, s) => phScene(t, s, "5 · The answer is two: the shoe", ["Answer card 2 The shoe glows. Momo: surprised pose, then a nod (f507, cuttable). Coin +1 if you showed two fingers. Score 1 : 1 (wired). MK tick2: a green tick is stamped on 2 DRIP ON IT (board3 below)."]) + TF(1600, 1040, .42, board3(t, { glow: ticked(1, t) ? -1 : 1 }));

/* 6 · Mark Sentence 1: waterproof (Pip); WATERPROOF pops large after the card; the two trays and the book's fabric sentences (3.18a) */
SC.mark1 = (t, s) => markScene(t, s, { id: "f602", sayId: "f601", who: "pip", n: "1 of 2", text: "Materials that do not absorb water at all are waterproof.", keys: ["not", "absorb", "water", "at", "all", "waterproof."], size: 70, y: 270, footer: FOOT,
  extra: stageNote("under the card, the bead of water sitting on the raincoat", 1010) });
SC.trays = (t, s) => phScene(t, s, "6 · Two trays: WATERPROOF and NOT WATERPROOF (3.18a)", ["Two trays slide in low and stand side by side on the table (placeholder rectangles below): green WATERPROOF, blue NOT WATERPROOF. The raincoat's stand is slid onto the green tray, the wet school shoe onto the blue tray. The book's two sentences on cream strips (wired, >= 3.5 s)."])
  + bookCaption(t, "f603", "Fabric absorbs water and allows water to pass through it.", 120, { size: 48, keys: ["absorbs", "pass", "through"] }) + bookCaption(t, "f603", "It is not a waterproof material.", 215, { size: 48, off: 10, keys: ["not", "waterproof", "material."] }) + traysPH(t, s.t0 + .2, 960, 1050, .85);

/* 7 · BE A RAINDROP (the first-person journey) */
SC.waitw = (t, s) => phScene(t, s, "7 · Be a raindrop! (the rise)", ["Pill Be a raindrop! The camera rises out from under the block into the grey sky; a soft cream wipe at the scene end. The shelf slides aside (SHELF_HIDE)."]);
SC.shrink = (t, s) => phScene(t, s, "7 · BE A RAINDROP (first person, present tense)", ["MK fall: you fall with other drops; the edges of the view rounded and bright (you are a drop); below, the tops of the flats, the walkway's roof, a child's yellow raincoat growing larger. Tags You: a raindrop · falling past the flats. MK coat: you land; the view squashes and springs back; a smooth yellow slope, no gaps. Tag plastic · no way in.",
  "MK roll: the slope tilts; the world turns over and over as you roll, whole, down the sleeve and off its edge. Tag You roll off. MK soak: below, a white field of thick ropes, over and under, dark gaps between: the fabric of a school shoe; you land and do not bounce; the ropes rise past you as you go down between them. Tag fabric · You soak in.",
  "MK through: light below; you come out on the other side, onto a sock. Tags absorbed · passed through. Calm pad, soft rain all round. If \"Splat!\" sounds odd to a listener, re-record f703 without it and keep the sound."]);

/* 8 · pull back out; four waterproof materials (3.18a) on the green tray */
SC.pullout = (t, s) => phScene(t, s, "8 · Pull back out to the void deck", ["Whoosh out to the void deck table in the rain; the two trays on the table."]);
SC.four = (t, s) => phScene(t, s, "8 · Four waterproof materials (3.18a)", ["Four picture tiles hop low onto the green tray WATERPROOF, each in the rain with round drops sitting on it, lighting one by one as Heart names them: rubber (a pair of rubber boots) · plastic (the raincoat) · glass (a window of the block opposite) · metals (the metal roof of the covered walkway). The book's sentences on cream strips (wired, three strips)."])
  + bookCaption(t, "f801", "Rubber, plastic, glass and metals do not absorb water", 110, { size: 40, keys: ["rubber", "plastic", "glass", "metals"] }) + bookCaption(t, "f801", "and do not allow water to pass through them.", 190, { size: 40, off: 9 }) + bookCaption(t, "f801", "They are waterproof materials.", 270, { size: 40, off: 18, keys: ["waterproof"] }) + traysPH(t, -9, 960, 1050, .85);

/* 9 · test three: WAX IT. [LOOK CLOSER] shoe wax on one of two fabric boots (WAX pops beside them: lib.js o.at); tick 3 */
SC.wax = (t, s) => phScene(t, s, "9 · Can a fabric boot keep water out?", ["Row 3 WAX IT glows on the board. On the table two fabric boots with rubber soles stand side by side on one tray, toes towards us (both dry). An adult's hand holds the pale block of shoe wax (label SHOE WAX). Small print upper left, fully inside the frame: An adult rubs on cold shoe wax. No candles. No flame. (finePrint, before the wax touches anything.)"]) + TF(1600, 1040, .42, board3(t, { glow: 2 }));
SC.lcwax = (t, s) => lcPH(t, s, { title: "Shoe wax on one boot; one drop on each", v: "v_wax", verdict: ["WITH WAX: WATERPROOF", GOODC], fx: 960, fy: 600,
  notes: ["The two toes fill the frame; tags plain (left) · with wax (right). f902: the hand rubs the block of shoe wax over the right toe, slowly, back and forth: a thin, slightly shiny layer is left. WAX pops beside them (kw_wax, wired: o.at [1450, 300]). Keep the small print An adult rubs on cold shoe wax. No candles. No flame.",
    "MK drops (f903): one drop on each, slow motion. Left (plain): it flattens, a dark wet patch spreads; label soaks in. f904, right (with wax): it sits on top as a round bead, wobbles and rolls off; the toe is dry; label rolls off.",
    "Verdict WITH WAX: WATERPROOF (green) on the right boot at v_wax. Sound: a soft dry rubbing; a dull pat and a hiss on the left; a clear plip and a roll on the right."] });
SC.waxans = (t, s) => phScene(t, s, "9 · Pip: \"The same fabric. A new property!\"", ["Pull back a little. Pip big in his disc (surprised, then pointing at the two boots) says f905 (cuttable). MK tick3: a green tick is stamped on 3 WAX IT: all three boxes ticked (board3 below)."]) + TF(1600, 1040, .42, board3(t, { glow: ticked(2, t) ? -1 : 2 }));

/* 10 · Mark Sentence 2: wax (Basil); the treatment strip (3.14) */
SC.mark2 = (t, s) => markScene(t, s, { id: "f1002", sayId: "f1001", who: "basil", n: "2 of 2", text: "Fabric absorbs water. However, it can be made waterproof by applying a layer of wax over it.", keys: ["absorbs", "water.", "made", "waterproof", "layer", "wax"], size: 60, y: 240, footer: FOOT,
  extra: stageNote("under the card, the two boots' toes: the wet patch and the bead", 1010) });
SC.treated = (t, s) => phScene(t, s, "10 · How the material is treated (3.14)", ["The waxed boot is slid from the blue tray's side onto the green tray WATERPROOF; the plain, wet boot stays on the blue tray (beside the wet school shoe). The book's sentence on cream strips (wired, >= 3.5 s). A small tag at the strip's end: treated = wax was put on it. Basil, cheer pose, beside the green tray."])
  + bookCaption(t, "f1003", "The physical property of a material can change", 120, { size: 48, keys: ["change"] }) + bookCaption(t, "f1003", "according to how the material is treated.", 215, { size: 48, off: 8, keys: ["how", "treated."] })
  + OP(ramp(t, LE("f1003") - .4, .3), TF(960, 300, 1, tpill(0, 0, "treated = wax was put on it", 32, "#fff", P.ink, { w: 600 }))) + traysPH(t, -9, 960, 1050, .85);

/* 11 · Showdown: Basil's notes (double points) */
SC.show = (t, s) => phScene(t, s, "11 · SHOWDOWN: Basil's notes (ring0_show, 6 s)", ["Basil's notes on an easel standing on the ground in the free space between the discs: three ruled lines, each with a small drawing: 1 Glass is waterproof. (the window with drops on it) 2 My T-shirt dries fast, so it is waterproof. (a T-shirt on a line in the sun) 3 Wax makes fabric waterproof. (the waxed boot with the bead on it). Each line lights as Basil reads it.",
  "The YOU ring with a counting hand, 6 s; the three lines and drawings stay in view through the whole countdown. LOCKED IN! Pip 2 (pointing), Momo 2 (cheer); Basil oops. Model: ep08/p2.js SC.show (easel, ring, stamp, picks)."]);
SC.fix = (t, s) => phScene(t, s, "11 · Waterproof = does not absorb water AT ALL", ["On the easel, line 2 is rubbed out and rewritten in green: My T-shirt absorbs water, so it is not waterproof. A cream tip card: Waterproof = does not absorb water AT ALL. Coin +2. Score 3 : 1 (wired)."]);

/* 12 · the chant: call and response (common.js chantScene); the board OUR 3 WATER TESTS behind the buddies */
SC.chant = (t, s) => chantScene(t, s, "c1003", { sayId: "u1002", size: 54, board: (tt, flash) => TF(232, 1066, .3, board3(tt, { glow: Math.max(...flash) > .05 ? flash.indexOf(Math.max(...flash)) : -1 })) });

/* 13 · score hand, the snail (lizReveal in common.js) */
SC.final = (t, s) => { const L = "f1301"; return finalScene(t, s, L, 1, [[s.t0, null, 1], [W(L, "three") - .1, null, 3]]); };
SC.liz = (t, s) => phScene(t, s, "13 · Did you spot the snail? (lizReveal in common.js)", ["A replay of the wide void deck in the rain with a ring round the little snail on the rim of the big flower pot; it stretches its neck and waves an eye stalk. Pill: Tell someone at home!"]);

/* 14 · the dare for Episode 11 */
SC.dare = (t, s) => phScene(t, s, "14 · The dare for Episode 11: light", ["The rain stops; a beam of sun comes in under the block. Three picture boards slide in low and stand side by side on the table, centred between the discs, each with a small torch standing in front of it, not yet switched on: a clear glass window, a frosted glass window, a wooden door. A big ? pops above them.",
  "Three cards: 1 Clear glass · 2 Frosted glass · 3 A wooden door (ansCard). Banner NEXT · Light! · Lock in your answer! Basil surprised (f1402, cuttable). Model: ep08/p2.js SC.dare. EP11 opens with these same boards, torches and cards."]);

/* 16 · "Now you know!": the two trays WATERPROOF and NOT WATERPROOF centred between the buddies (Stage 2: the drawn trays) */
SC.nyk = (t, s) => nykScene(t, s, traysPH(t, -9, 960, 1010, .8), { bx: [200, 1715, 1375], hx: 470 });
})(); }
