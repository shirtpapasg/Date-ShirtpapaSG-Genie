// p1.js: PART 1, "This Jar Was Once SAND! What Are Things Made Of?": objects and materials, glass, metal, plastic, ceramic.
// Segments 1-14 of p3_ep08_script.md (Part 1 Segment 2 as updated on 2026-11-20 to open from EP7's dare).
// STAGE 1 (setup): the shared routines are wired (game, goals, countdown, round cards, lock-ins, Mark Sentences, score hand, read-along,
// "Now you know!"); every scene with new art is a phScene placeholder. STAGE 2 (Fable) draws them: see SCENES_TODO.md.
if (PART === 1) { (() => {
const L1 = "g701", L2 = "g1102";
// the scores (script section 3): HOLD ON! 1 : 0, Round 1 2 : 1, Round 2 3 : 2
SCORE.push([W("g603", "one") - .1, 1, 0]);
SCORE.push([W("g903", "one") - .1, 2, 1]);
SCORE.push([W("g1112", "one") - .1, 3, 2]);
// the placeholder object in a lock-in ring (Stage 2: the three containers + the sand pile; the noodle bowl)
const ringPH = (txt) => (tt) => `<circle cx="430" cy="470" r="150" fill="#fff" opacity=".6"/>` + T(430, 482, txt, 34, P.ink);

/* 1 · silent cold open: the school canteen at recess */
SC.cold = (t, s) => phScene(t, s, "1 · Cold open: the school canteen at recess (no voice)", ["Canteen set (long table, wooden benches, noodle stall with stacked bowls, drinks stall, classroom block with glass louvre windows). On the table: clear-lidded plastic snack box (biscuits), stainless-steel snack box, glass biscuit jar with metal lid, a metal spoon.", "Momo in her disc at the table. MK boardIn: THE 7 MATERIALS board slides in low with dust puffs (7 dashed tiles with ?). MK budsIn: Pip and Basil pop in; Basil surprised. Location pill: School canteen, recess time, Singapore."]);
/* 2 · the new chapter, and the question */
SC.callback = (t, s) => phScene(t, s, "2 · Last time (EP7's dare), and a new chapter", ["Containers glow as Heart names them in g201. On g202 \"We have sorted living things\": chips PLANTS · ANIMALS · FUNGI · BACTERIA under 'Living things'; on \"Now, non-living things\" they slide off left and NON-LIVING THINGS pops in. On \"made of\" a soft glow runs over the table."]);
SC.hook = (t, s) => phScene(t, s, "2 · The hook and the title", ["Glow + tag on each container as named (plastic · metal · glass); a small pile of sand pops on the table with a big ?. At MK title: the picture dims, title slams: WHAT IS IT MADE OF? (white) / ONE WAS ONCE SAND! (sun yellow). Pill: Which one? Hold on to your answer!"]);
/* 3 · the game; 4 · goals and the countdown (count is in common.js) */
SC.game = (t, s) => gameScene(t, s, "g301", true);
SC.goals = (t, s) => goals3(t, s, [["Objects and materials", ""], ["Four of the 7 materials", ""], ["Where each one comes from", ""]]);
/* 5 · object and material: the spoon */
SC.spoon = (t, s) => phScene(t, s, "5 · Object and material: the spoon", ["Camera moves in on the metal spoon; Pip points. OBJECT pops (kw_object, lib.js shelf) and a tag stays by the spoon: object: a thing you use.", "A magnifying glass on little feet slides low over the spoon's bowl: round close-up of the shiny surface; on \"Metal!\" tag metal. MATERIAL pops (kw_material). Two tags joined to the spoon by plain lines: OBJECT: spoon · MATERIAL: metal."]);
SC.mark1 = (t, s) => markScene(t, s, { id: "g504", sayId: "g503", who: "pip", n: "1 of 2", text: "Materials are used to make objects. Objects are things you use for different purposes.", keys: ["Materials", "objects."], size: 66, y: 256 });
/* 6 · HOLD ON! Basil's rule (listcard is in common.js) */
SC.rule = (t, s) => phScene(t, s, "6 · HOLD ON! Basil's rule (ring0_hold / bell_hold)", ["Basil's board on an easel on the floor: a window drawing, 'A window is made of glass.' and in teal 'So a window is a MATERIAL!' (his bubble has the ✗ chip). A classroom window glows behind.", "HOLD ON! stamp on 'Hold on'; YOU ring with crossed arms, 5 s. Coin +1 arms crossed. Teal line struck through. Tags: OBJECT: window (whole window) · MATERIAL: glass (one pane). Basil oops, then cheer. Score 1 : 0. Model: ep05/p1.js SC.rule."]);
/* 7 · Round 1 */
SC.r1 = (t, s) => lockN(t, { cards: ["The plastic box", "The metal box", "The glass jar"], q: "Which one was made from sand?", tq: W(L1, "which") - .1, tc: [W(L1, "one", 1), W(L1, "two"), W(L1, "three")], ring0: MK("ring0_r1"), dur: 5, lock: "g702",
  obj: ringPH("3 containers + sand"), picks: [{ who: "momo", id: "g703", word: "2", x: true }, { who: "pip", id: "g704", word: "3" }, { who: "basil", id: "g705", word: "3" }],
  react: [[LE("g703") + .1, "momo", "thinking"], [LE("g704") + .1, "pip", "pointing"], [LE("g705") + .1, "basil", "cheer"]] });
/* 8 · BE A GRAIN OF SAND */
SC.waitw = (t, s) => phScene(t, s, "8 · Be a grain of sand! (the dive)", ["Back at the table: the small sand pile. Pill: Be a grain of sand! The camera dives into the pile; sand-coloured wipe at the scene end. The shelf slides aside."]);
SC.shrink = (t, s) => phScene(t, s, "8 · BE A GRAIN OF SAND (first person)", ["MK pile: one pale grain among boulder-sized grains, factory roof far above; tag You: a grain of sand.", "MK scoop: metal edge slides under, tumble, chute to a glowing orange opening; word strip furnace: a very hot oven (3.5 s); tag Very hot! Only in a factory.", "MK melt: everything orange; edges round, grains join, your edge runs like syrup; tags You melt · speeded up. MK mould: a slow glowing ribbon into a grey jar-shaped mould; tag a mould: the shape of a jar.", "MK cool: orange -> amber -> clear; you are the jar wall, the canteen table seen bent through you, buddies in discs looking in; tags You cool · hard again · clear. MK isglass: a highlight runs along the curve; big tag You are glass."]);
/* 9 · the reveal: glass */
SC.reveal = (t, s) => phScene(t, s, "9 · Pull back out: the answer is 3, the glass jar", ["Pull back to the table; the shelf returns. Answer card 3 The glass jar glows; sand pile and jar joined by one plain line. Pip and Basil cheer, Momo surprised."]);
SC.glass = (t, s) => phScene(t, s, "9 · Glass is made from sand", ["Cream strip (bookCaption) 'Glass is made from sand.' >= 3.5 s. Then GLASS pops (nm_glass, materials.js) and hops to its tile; MK tile_glass: the tile fills ice grey #8FA6B8 with a small jar; source slot: a little pile, sand.", "MK uses_glass (cuttable): three small picture boards behind the jar: window · light bulb · spectacles. Coin +1 'if you showed three fingers'. Score 2 : 1."]);
/* 10 · metal and plastic */
SC.metal = (t, s) => phScene(t, s, "10 · Metal", ["The metal snack box big; a picture board slides in low: a rock face with shiny streaks, a digger at its foot. Two cream strips one after the other (3.5 s each).", "On 'Gold, iron, copper and aluminium' four small boards pop: gold: a ring · iron: a gate · copper: a wire · aluminium: a drink can. METAL pops (nm_metal), hops to its tile; MK tile_metal: slate #5E6B73, a small spoon; source: a rock, dug up from the ground."]);
SC.plastic = (t, s) => phScene(t, s, "10 · Plastic", ["The plastic snack box big; a board slides in low: an oil well, a pipe deep down to a dark pool (tag oil, deep under the ground) and a small factory. Cream strip (3.5 s).", "PLASTIC pops (nm_plastic), hops to its tile; MK tile_plastic: hot pink #E0457B, a small box; source: a dark drop, oil. Basil surprised, then his biscuit joke (g1006)."]);
/* 11 · Round 2: ceramic */
SC.r2 = (t, s) => lockN(t, { cards: ["Sand", "Clay", "Oil"], q: "What is ceramic made from?", tq: W(L2, "what") - .1, tc: [W(L2, "one"), W(L2, "two"), W(L2, "three")], ring0: MK("ring0_r2"), dur: 5, lock: "g1103", tin: W(L2, "what") - .3,
  obj: ringPH("noodle bowl"), picks: [{ who: "pip", id: "g1104", word: "1", x: true }, { who: "momo", id: "g1105", word: "2" }, { who: "basil", id: "g1106", word: "2" }],
  react: [[LE("g1104") + .1, "pip", "thinking"], [LE("g1105") + .1, "momo", "pointing"], [LE("g1106") + .1, "basil", "cheer"]],
  pre: (tt) => tt < LT(L2) ? phScene(tt, SCN.r2, "11 · The noodle stall: the ceramic bowl", ["A white glazed bowl with a blue rim and its soup spoon on the counter. CERAMIC pops (kw_ceramic) and flies to the shelf; a copy hops to the edge of its tile and waits. Lizard on a classroom window for about 3 s during the ring (from ring0_r2 + 1)."]) : "" });
SC.clay = (t, s) => phScene(t, s, "11 · The answer is two: clay", ["Answer card 2 Clay glows. A board slides in low: a spade in soil and a grey-brown lump of clay. Cream strip (3.5 s). CLAY pops (kw_clay) and flies to the shelf."]);
SC.kiln = (t, s) => phScene(t, s, "11 · Shaped, then baked in a kiln", ["Two boards in turn: hands shaping the lump into a bowl; then a brick kiln, door open, glowing orange inside, the bowl on a shelf. Word strip kiln: a very hot oven for baking clay (3.5 s from 'kiln'). Tag Very hot! Only in a factory.", "MK bowlback: the finished glazed bowl hops back to the counter; tag It can break easily."]);
SC.mark2 = (t, s) => markScene(t, s, { id: "g1111", sayId: "g1110", who: "basil", n: "2 of 2", text: "Ceramic is a material made from clay. Glass is made from sand.", keys: ["Ceramic", "clay.", "Glass", "sand."], size: 70, y: 256 });
/* 12 · score hand, the lizard, the key words (kwrecap is in common.js) */
SC.final = (t, s) => { const L = "g1201"; return finalScene(t, s, L, 2, [[s.t0, null, 1], [W(L, "three") - .1, null, 3]]); };
SC.liz = (t, s) => phScene(t, s, "12 · Did you spot the lizard? (lizReveal in common.js)", ["A replay of the classroom window (as in Round 2) with a ring round the little lizard. Question pill: What material is a window made of? · Tell someone at home!"]);
/* 13 · the cliffhanger */
SC.cliff = (t, s) => phScene(t, s, "13 · Cliffhanger: white drops", ["The board: four tiles full, WOOD · RUBBER · FABRIC still dashed; they pulse. Camera drops under the table: a school bag and one white canvas school shoe; its sole glows; tag rubber.", "A round close-up pops beside the shoe: white drops falling one by one on a plain dark background (no tree). Pill: Where do the drops come from? PART 2 slams in on 'Find out in Part Two'."]);
/* 14 · "Now you know!": the glass jar and the board stand between the buddies (Stage 2 passes them as the prop) */
SC.nyk = (t, s) => nykScene(t, s, "");
})(); }
