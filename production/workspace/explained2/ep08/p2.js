// p2.js: PART 2, "Your School Shoe Came from a TREE? The 7 Materials": wood, rubber, fabric; count the parts; all seven.
// Segments 1-14 of p3_ep08_script.md.
// STAGE 1 (setup): the shared routines are wired; every scene with new art is a phScene placeholder. STAGE 2 (Fable): see SCENES_TODO.md.
if (PART === 2) { (() => {
const L1 = "j502", L2 = "j803";
// the scores (script section 3): Round 1 1 : 1, Round 2 2 : 2, Showdown 4 : 2
SCORE.push([W("j704", "one") - .1, 1, 1]);
SCORE.push([W("j809", "one") - .1, 2, 2]);
SCORE.push([W("j909", "two") - .1, 4, 2]);
const ringPH = (txt) => (tt) => `<circle cx="430" cy="470" r="150" fill="#fff" opacity=".6"/>` + T(430, 482, txt, 34, P.ink);

/* 1 · silent recap montage; 2 · "Last time..." */
if (SCN.recap) SC.recap = (t, s) => phScene(t, s, "1 · Silent recap montage (3 shots, 1 s each, tagged Part 1)", ["The spoon with its two tags (OBJECT: spoon · MATERIAL: metal); the sand pile joined to the glass jar; the white drops with a big ?."]);
SC.lasttime = (t, s) => phScene(t, s, "2 · Last time...", ["The canteen table and the board. METAL, CERAMIC, GLASS, PLASTIC glow in turn; on 'sand' the GLASS source slot pulses, on 'clay' the CERAMIC one. Then WOOD · RUBBER · FABRIC (dashed) pulse."]);
/* 3 · goals and the game */
SC.goals = (t, s) => goals3(t, s, [["Wood, rubber and fabric", ""], ["Where each one comes from", ""], ["Count the parts", ""]]);
SC.game = (t, s) => gameScene(t, s, "j301", false);
/* 4 · wood */
SC.wood = (t, s) => phScene(t, s, "4 · Wood: the bench and the pencil", ["The canteen bench close: grain lines along it; Momo points. A pencil on the table glows on 'your pencil'. WOOD pops (nm_wood, materials.js) and waits by its tile."]);
SC.trees = (t, s) => phScene(t, s, "4 · Wood comes from trees", ["A board slides in low: tall trees. Cream strip (3.5 s). Then a second board: a trunk lying down, cut lengthwise into long flat planks (grain showing) (cuttable line j403); a third, small: an exercise book, tag paper.", "MK tile_wood: the tile fills chestnut #8B4A2B with a small plank; source slot: a tree, trees."]);
/* 5 · Round 1: where do the white drops come from? */
SC.r1 = (t, s) => lockN(t, { cards: ["A cow", "A tree", "A rock"], q: "Where do the white drops come from?", tq: W(L1, "where") - .1, tc: [W(L1, "one"), W(L1, "two"), W(L1, "three")], ring0: MK("ring0_r1"), dur: 5, lock: "j503", tin: W(L1, "where") - .3,
  obj: ringPH("white drops"), picks: [{ who: "momo", id: "j504", word: "1", x: true }, { who: "pip", id: "j505", word: "2" }, { who: "basil", id: "j506", word: "2" }],
  react: [[LE("j504") + .1, "momo", "thinking"], [LE("j505") + .1, "pip", "pointing"], [LE("j506") + .1, "basil", "cheer"]],
  pre: (tt) => tt < LT(L1) ? phScene(tt, SCN.r1, "5 · The white canvas school shoe on the table, side on; its sole glows", ["RUBBER pops (kw_rubber) and flies to the shelf; a copy waits by its tile. The round close-up of white drops pops beside the shoe. Card drawings: a cow, a tree, a rock."]) : "" });
/* 6 · BE A DROP OF SAP */
SC.waitw = (t, s) => phScene(t, s, "6 · Be a drop of sap! (the dive)", ["Pill: Be a drop of sap! The camera dives into the round close-up of white drops; a white wipe. The shelf slides aside."]);
SC.shrink = (t, s) => phScene(t, s, "6 · BE A DROP OF SAP (first person)", ["MK intree: dim warm brown-gold space under the bark; round white drops in thin channels; light through the bark; tags You: a drop of sap · inside a rubber tree.", "MK cut: a thin bright diagonal line opens across the bark (down to the right); you slide out: grey-brown trunk, leaves, morning sun, plantation row; tags a thin cut in the bark · The tree keeps growing.", "MK cup: down the slanting cut with other drops, hang, fall into a small cup tied to the trunk; tag the cup. MK factory: dip to white; a thick pale sheet between two big rollers turns creamy and springy; tags a factory · speeded up · made into rubber.", "MK sole: a zigzag metal shape presses down; you ARE the zigzag; camera turns: under a white canvas shoe, the canteen floor; tag the sole of a school shoe. MK steps: two steps, the zigzag bends and springs; tag You bend with every step."]);
/* 7 · the reveal: rubber */
SC.reveal = (t, s) => phScene(t, s, "7 · Pull back out: the answer is 2, a tree", ["Pull back to the table and the shoe; the shelf returns. Answer card 2 A tree glows; a board slides in low: a rubber tree with the diagonal cut and the cup. Momo surprised, then cheers."]);
SC.mark1 = (t, s) => markScene(t, s, { id: "j703", sayId: "j702", who: "basil", n: "1 of 2", text: "Rubber can come from the sap of a rubber tree. It can also be made by man using oil from the ground.", keys: ["rubber", "sap", "tree.", "oil", "ground."], size: 62, y: 256 });
/* 8 · fabric; Round 2 */
SC.fabric = (t, s) => phScene(t, s, "8 · Fabric: the school T-shirt", ["A white school T-shirt folded on the table; a round close-up shows its weave. FABRIC pops (kw_fabric) and flies to the shelf; a copy waits by its tile. Cream strip (3.5 s); animals and plants highlighted."]);
SC.r2 = (t, s) => lockN(t, { cards: ["An animal", "A plant"], q: "Where does cotton come from?", tq: W(L2, "where") - .1, tc: [W(L2, "one"), W(L2, "two", 1)], ring0: MK("ring0_r2"), dur: 5, lock: "j804",
  obj: ringPH("label: 100% cotton"), picks: [{ who: "basil", id: "j805", word: "1", x: true }, { who: "momo", id: "j806", word: "2" }, { who: "pip", id: "j807", word: "2" }],
  react: [[LE("j805") + .1, "basil", "surprised"], [LE("j806") + .1, "momo", "pointing"], [LE("j807") + .1, "pip", "cheer"]] });
SC.r2ans = (t, s) => phScene(t, s, "8 · Cotton, wool, silk", ["Answer card 2 A plant glows. Three boards pop as named, each a source joined to an object by one plain line: cotton plant with white bolls + T-shirt (cotton: a plant); fluffy sheep + sweater (wool: sheep); pale oval cocoon + scarf (silk: a kind of caterpillar).", "Coin +1; score 2 : 2. MK tile_fabric: dark mustard #A07A1A, a small T-shirt; source: a sheep and a plant, animals or plants. Basil oops, then cheer (j810)."]);
/* 9 · Showdown */
SC.show = (t, s) => phScene(t, s, "9 · SHOWDOWN: Pip's notes (ring0_show, 6 s)", ["Pip's notes on an easel on the floor, three lines with small drawings: 1 Wood comes from trees. 2 Glass is made from sand. 3 A school shoe is made of one material. The shoe on the table beside it.", "The new lizard under the wooden bench for about 3 s. YOU ring with a counting hand, 6 s. LOCKED IN! Momo 3, Basil 3; Pip oops. Model: ep05/p2.js SC.show."]);
SC.count4 = (t, s) => phScene(t, s, "9 · Count the parts (School Lab 3.1, Part a)", ["The shoe big, side on. Four parts light up in turn with plain label lines and a counter 1, 2, 3, 4: sole (rubber), canvas top (fabric), lace rings (metal), lace tips (plastic); the matching board tiles flash.", "Big tag 1 object · 4 materials. Line 3 rubbed out and rewritten in green: A school shoe is made of four materials. Coin +2, score 4 : 2."]);
/* 10 · seven tiles, and the chant (the board comes to the centre, full) */
SC.seven = (t, s) => markScene(t, s, { id: "j1002", sayId: "j1001", who: "momo", n: "2 of 2", text: "Wood, metal, ceramic, rubber, glass, plastic and fabric are some of the materials we use to make the things we need.", keys: ["wood,", "metal,", "ceramic,", "rubber,", "glass,", "plastic", "fabric"], size: 58, y: 220 });
SC.chant = (t, s) => chantScene(t, s, "c1003", { sayId: "u1002" });
/* 11 · score hand and the lizard */
SC.final = (t, s) => { const L = "j1101"; return finalScene(t, s, L, 2, [[s.t0, null, 1], [W(L, "four") - .1, null, 4]]); };
SC.liz = (t, s) => phScene(t, s, "11 · Did you spot the lizard? (lizReveal in common.js)", ["A replay of the bench with a ring round the little lizard under it. Question pill: Where does wood come from? · Tell someone at home!"]);
/* 12 · the dare for Episode 9 */
SC.dare = (t, s) => phScene(t, s, "12 · The dare for Episode 9", ["Two boards on the table: a rubber band and a wooden ice-cream stick, each with a small tile-colour corner tag (rubber · wood). Cards 1 The rubber band · 2 The ice-cream stick.", "Basil big in his disc asks 'Snap it, or bend it?'; banner NEXT · Snap it or bend it? · Lock in your answer! Small tag: Just think. Do not break things!"]);
/* 14 · "Now you know!": the full board and the school shoe stand between the buddies */
SC.nyk = (t, s) => nykScene(t, s, "");
})(); }
