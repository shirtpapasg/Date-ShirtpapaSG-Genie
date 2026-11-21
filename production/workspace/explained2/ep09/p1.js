// p1.js: PART 1, "Paper vs Fabric: We Hung Weights Until One TORE!": physical property, strength, strong and fragile.
// Segments 1-14 of p3_ep09_script.md (version 1, 21 Nov 2026; the teacher's answers in its section 12).
// STAGE 1 (setup): the shared routines are wired (the calm recap with EP8's board and dare boards, game, goals, countdown, round card, the lock-in
// with its clue tag on top of the ring, Mark Sentences read by the buddy, the LOOK-CLOSER frame, score hand, read-along, "Now you know!");
// every scene with new art is a phScene placeholder (and each [LOOK CLOSER] an lcPH placeholder inside the real frame). STAGE 2 (Fable)
// draws them: see SCENES_TODO.md.
if (PART === 1) { (() => {
const L1 = "g601";
// the scores (script section 3): Round 1 1 : 1, HOLD ON! 2 : 1
SCORE.push([W("g707", "one") - .1, 1, 1]);
SCORE.push([W("g1003", "one") - .1, 2, 1]);
const FOOT = "P3 · Diversity of Materials · Physical properties";
// the placeholder object in a lock-in ring (Stage 2: the two strips on the stand, the same height, counters at WEIGHTS: 0)
const ringPH = (txt) => (tt) => `<circle cx="430" cy="470" r="150" fill="#fff" opacity=".6"/>` + T(430, 482, txt, 34, P.ink);

/* 1 · silent cold open: the void deck of an HDB block */
SC.cold = (t, s) => phScene(t, s, "1 · Cold open: the void deck of an HDB block (no voice)", ["Bright afternoon after school: pillars, a round stone table with stone stools, a row of metal letterboxes at the left, a bicycle rack, the playground in sunlight beyond. On the table, spaced out: OUR TEST STAND (empty clamp), a paper strip and a fabric strip lying flat, a small tray of flat round weights, a fabric school bag.", "MK boardsIn: EP8's two picture boards slide in low along the table with dust (rubber band · wooden ice-cream stick; corner tags rubber · wood; reuse picBoard band1 / stick). MK budsIn: Pip, Basil (surprised) and Momo pop in beside the table. The little SPIDER hangs on its thread by the letterboxes and bobs (every wide void-deck shot). Location pill: The void deck of an HDB block, Singapore. No title."]);

/* 2 · "Last time...": two calm pictures (EP8's art, reused), each held >= 2.5 s, one label each; then OUR 3 TESTS; then the title */
SC.lasttime = (t, s) => { const L = "g201", t2 = W(L, "and") - .2, pic = (k, inner, lab) => k < .02 ? "" : OP(k, inner + TF(960, 990, spring(t, s.t0 + .3, .4), tpill(0, 0, lab, 46, P.sun, P.ink, { w: 700 })));
  const k1 = ramp(t, s.t0 + .1, .5) * (1 - ramp(t, t2, .4)), k2 = ramp(t, t2 + .2, .5), z1 = 1 + .04 * eio((t - s.t0) / 6), z2 = 1 + .04 * eio((t - t2) / 6);
  return bg("stage2") + OP(ramp(t, s.t0, .3), T(960, 110, "Last time…", 60, "#fff", { w: 600 }))
    + pic(k1, `<g transform="translate(960 560) scale(${n2(z1)}) translate(-960 -560)">${TF(960, 930, .9, board7(t, { full: () => 1 }))}</g>`, "The 7 materials")
    + pic(k2, `<g transform="translate(960 560) scale(${n2(z2)}) translate(-960 -560)">${picBoard("band1", 700, 640, 1, { sc: 1.05, lab: "a rubber band", size: 40, id: "r1" })}${picBoard("stick", 1220, 640, 1, { sc: 1.05, lab: "a wooden ice-cream stick", size: 40, id: "r2" })}`
      + [["The rubber band", 0], ["The ice-cream stick", 1]].map(([txt, i]) => TF([700, 1220][i], 830, .5 * spring(t, t2 + .5 + i * .2, .45), ansCard(i + 1, txt, { w: 360 }))).join("") + `</g>`, "Which one can bend without breaking?")
    + HUD(t); };
SC.tests = (t, s) => phScene(t, s, "2 · Back at the table: OUR 3 TESTS", ["Basil big in his disc (cheer pose) says the title line. Then the board OUR 3 TESTS slides in low and stands at the end of the table, centred between the discs: 1 PULL · 2 DROP · 3 BEND, three empty tick boxes; row 1 glows on \"Test one: pull!\". Pill: Hold on to your answer!", "Placeholder board below: board3() in tests.js (functional rows and ticks; redraw it)."]) + TF(1500, 1040, .62, board3(t, { glow: t >= W("g203", "pull") - .1 ? 0 : -1 }));
SC.title = (t, s) => phScene(t, s, "2 · Title slam", ["The picture dims. Title slams in: PAPER vs FABRIC (white) then WHICH ONE TEARS? (sun yellow). Reuse slamLine / slamK (canteen.js)."]);

/* 3 · the game, and the hidden spider; 4 · goals (Momo reads) and the countdown (count is in common.js) */
SC.game = (t, s) => gameScene(t, s, "g301", true);
SC.goals = (t, s) => goals3(t, s, [["What a physical property is", ""], ["What strength means", ""], ["Strong or fragile", ""]], ["g401", "g402", "g403", "g404"], "momo");

/* 5 · what is a physical property? the paper strip; [LOOK CLOSER]; Mark Sentence 1 (Pip); the five properties */
SC.strip = (t, s) => phScene(t, s, "5 · Here is a strip of paper", ["A gloved hand clamps the paper strip (white, blue exercise-book lines) to OUR TEST STAND; it hangs straight down. Tag: a strip of paper. Camera begins to move in on \"Look closer\"."]);
SC.lcpaper = (t, s) => lcPH(t, s, { title: "The paper strip: observe, then measure", v: "v_property", verdict: ["A PHYSICAL PROPERTY: measure or observe", "#3B2A8C"], fx: 960, fy: 520,
  notes: ["OBSERVE (g503): a small eye icon + the word observe lights at the left. One gloved finger pushes the middle of the strip slowly: it curves, then springs back straight when the finger lifts. Plain label line to the curve: It bends.",
    "MEASURE (g504): a small counter icon + measure lights at the right. The hanger is clipped to the strip's lower end; one flat weight slides on; the strip draws straight and holds; counter pill WEIGHTS: 1. Label: It holds 1 weight.",
    "Sound: paper rustle, a tiny tok as the weight slides on, a counter click. Buddies, score and shelf away (SHELF_HIDE)."] });
SC.mark1 = (t, s) => markScene(t, s, { id: "g506", sayId: "g505", who: "pip", n: "1 of 2", text: "The physical property of a material is something that you can measure or observe.", keys: ["physical", "property", "measure", "observe."], size: 66, y: 256, footer: FOOT });
SC.five = (t, s) => phScene(t, s, "5 · The physical properties you will learn (3.11)", ["Five small tiles drop in a row on a cream strip, lighting one by one as Heart names them: strength (the strip and a weight) · flexibility (a bent tube) · float or sink (a block in water) · waterproof (a drop on a sheet) · transparency (a torch and a window). On \"Today\" (g508, cuttable) the first two glow and the other three dim. PHYSICAL PROPERTY is already on the shelf."]);

/* 6 · Round 1: paper or fabric? (the clue tag sits on top of the ring and stays through the countdown) */
SC.r1 = (t, s) => lockN(t, { cards: ["Paper", "Fabric", "The same"], tag: "same length · same thickness", q: "Which strip holds more weights?", tq: W(L1, "which") - .1, tc: [W(L1, "one", 1), W(L1, "two", 1), W(L1, "three")], ring0: MK("ring0_r1"), dur: 5, lock: "g602",
  obj: ringPH("2 strips on the stand"), picks: [{ who: "momo", id: "g603", word: "3", x: true }, { who: "basil", id: "g604", word: "2" }, HAS("g605") ? { who: "pip", id: "g605", word: "2" } : { who: "pip", word: "2", fixed: true }],
  react: [[LE("g603") + .1, "momo", "thinking"], [LE("g604") + .1, "basil", "cheer"], ...(HAS("g605") ? [[LE("g605") + .1, "pip", "pointing"]] : [])] });

/* 7 · test one: PULL. [LOOK CLOSER] the slow pull test, then the two bars and the verdict; the answer */
SC.lcpull = (t, s) => lcPH(t, s, { title: "The slow pull test: paper tears at 3, fabric holds 8", v: "v_stronger", verdict: ["FABRIC: STRONGER THAN PAPER", GOODC], fx: 960, fy: 520,
  setNote: "the stand with the two strips side by side (paper · fabric), counters WEIGHTS: 0",
  notes: ["Tag slow motion. Paper strip fills the frame. A gloved hand slides weights onto the hanger one by one; counter clicks 1, 2, 3 on Heart's words (g701). At 3 a round magnifier opens on the strip's left edge: a tiny tear opens, runs straight across; the strip parts; hanger and weights drop a short way onto the soft mat. Counter stays at 3, tag It tears (g702).",
    "The camera slides across to the fabric strip, as large. Weights 3, 4, 5, 6, 7, 8 on Heart's words (g703); the magnifier on its edge: the threads draw tight and straight and stay whole. Counter holds at 8, tag It holds (g704).",
    "MK bars: pull back a little; the two counters slide together and grow into two bars on a small cream chart: paper 3, fabric 8; axis label number of weights; small print our strips, our test (g705). Verdict at v_stronger."] });
SC.pullans = (t, s) => phScene(t, s, "7 · The answer: 2 Fabric", ["The two strips still in view. Answer card 2 Fabric glows. Momo big in her disc (surprised, then a nod) says g706 (cuttable). Coin +1 if you showed two fingers. Score 1 : 1 (SCORE, already wired)."]);

/* 8 · BE A THREAD (the first-person journey) */
SC.waitw = (t, s) => phScene(t, s, "8 · Be a thread! (the dive)", ["Back at the table: the fabric school bag beside the stand. Pill Be a thread! The camera dives towards the side of the bag; a soft cream wipe at the scene end. The shelf slides aside (SHELF_HIDE)."]);
SC.shrink = (t, s) => phScene(t, s, "8 · BE A THREAD (first person, second person, present tense)", ["MK weave: you look along your own length, a pale rounded thread running away from the camera; other threads cross over and under you (plain weave, never knitted loops), near ones huge and soft, far ones tiny; light through the gaps like a lattice window. Tags You: one thread · in a fabric bag.",
  "MK books: from above, five books come down one after another, each as big as a block of flats; the weave dips a little with each. Tag 5 heavy books. MK lift: far above, the two handles rise; the whole weave is drawn upward and straight; you and every thread beside you go taut, in step. Tag pulled!",
  "MK hold: the camera stays on your thread and its crossings: tight, straight, whole; no gap opens. Tag no break · no tear. MK home: through the gaps the void deck pillars slide past, then a lift door. Tag all the way home. Calm pad; no game sounds."]);

/* 9 · pull back out; Mark Sentence 2 (Basil); tick 1 PULL */
SC.pullout = (t, s) => phScene(t, s, "9 · Pull back out: the bag holds", ["Pull back out to the table (wipe, whoosh out); the fabric bag stands there, full of books, whole. Heart: Pulled, without breaking or tearing. That is strength!"]);
const pushPull = (t, t0) => tpill(760, 1000, "pulled", 34, "#fff", P.ink) + tpill(1200, 1000, "pushed", 34, "#fff", P.ink) + T(980, 940, "(Stage 2: two small pictures: the fabric strip pulled by its weights · a hand pushing down on a stone stool)", 22, "#fff", { w: 500 });
SC.mark2 = (t, s) => markScene(t, s, { id: "g903", sayId: "g902", who: "basil", n: "2 of 2", text: "The strength of a material is its ability to be pulled or pushed without breaking or tearing.", keys: ["strength", "pulled", "or", "pushed", "without", "breaking", "tearing."], size: 62, y: 230, footer: FOOT,
  extra: pushPull(t, s.t0) + TF(1700, 1050, .4, board3(t, { glow: t >= MK("tick1") - .5 ? 0 : -1 })) });

/* 10 · test two: DROP, and HOLD ON! (model: ep08/p1.js SC.rule, the ring with crossed arms, the stamp, the coin) */
SC.drop = (t, s) => phScene(t, s, "10 · Test two: DROP, and HOLD ON! (ring0_hold / bell_hold)", ["Row 2 DROP glows on the board. Two cups stand on the table: a stainless-steel cup (tag metal) and a glass cup (tag glass). Basil big in his disc (cheer), leaning towards the glass cup; his bubble has the ✗ chip. He never touches the cup.",
  "HOLD ON! stamp on \"Hold on\"; the YOU ring with crossed arms, 5 s; the two cups and their tags stay in view through the countdown. Coin +1 arms crossed. A cream safety card stands on the table: Never break things to test them. · Broken glass is sharp. Basil oops (g1004, cuttable). Score 2 : 1 (wired)."]);

/* 11 · the drop box; [LOOK CLOSER] strong and fragile; the book's pair (FRAGILE and STRONG pop beside the strip: lib.js o.at); tick 2 DROP */
SC.dropbox = (t, s) => phScene(t, s, "11 · An adult tests it safely, in a box", ["A deep clear plastic tub slides in low and stands on the ground by the table: label DROP BOX. An adult's two gloved hands hold the cups above it at table height. Small print, fully inside the frame, upper left: An adult does this test. Never try it. (finePrint in common.js)"]);
SC.lcdrop = (t, s) => lcPH(t, s, { title: "The drop box: the metal cup bounces, the glass cup breaks", v: "v_fragile", verdict: ["GLASS: FRAGILE", WEAKC], fx: 960, fy: 640,
  notes: ["Tag slow motion. The box fills the frame; the rest dims; the buddies step back. THE METAL CUP (g1102): the hand lets go; it falls, hits the bottom, bounces once, rings and rolls to rest, whole (no dent). Plain label line not broken; a green tag STRONG.",
    "THE GLASS CUP (g1103): the other hand lets go; where it lands a crack runs up its side; it breaks into four or five big pieces that stay inside the box (no flying bits, no sharp close-up). Label line broken. Verdict GLASS: FRAGILE (blue) at v_fragile.",
    "Keep the small print An adult does this test. Never try it. Sound: a long metal clang and a ringing roll; a soft glass crack and a few low clinks (not harsh)."] });
SC.fragile = (t, s) => phScene(t, s, "11 · Glass is fragile, but metal is strong (3.13a)", ["The book's two sentences on a cream strip (bookCaption, >= 3.5 s); fragile and strong highlighted. FRAGILE pops on \"fragile\" (left, under the strip) and STRONG on \"strong\" (right): both already drawn by lib.js (o.at, no dimming, 2.0 s, then to the shelf). Keep the two cups (the broken glass in the box, the whole metal cup) visible between them.",
  "A small tag at the side: A ceramic plate is fragile too. MK tick2: a green tick is stamped on 2 DROP (board3 below)."]) + bookCaption(t, "g1104", "Glass is fragile, but metal is strong.", 130, { size: 50, keys: ["fragile", "strong"] }) + bookCaption(t, "g1104", "A glass cup breaks easily when it is dropped, but a metal cup does not.", 230, { size: 44, off: 7 }) + TF(1700, 1050, .4, board3(t, { glow: 1 }));

/* 12 · the score hand, the spider (lizReveal in common.js), the key words (kwrecap in common.js) */
SC.final = (t, s) => { const L = "g1201"; return finalScene(t, s, L, 1, [[s.t0, null, 1], [W(L, "two") - .1, null, 2]]); };
SC.liz = (t, s) => phScene(t, s, "12 · Did you spot the spider? (lizReveal in common.js)", ["A replay of the wide void deck with a ring round the little spider on its thread by the letterboxes; it bobs and waves one leg. Pill: Tell someone at home! Use lizReveal(t, s, \"g1202\", view, x, y, ...) with the void deck view and the spider's position."]);

/* 13 · the cliffhanger: test three */
SC.cliff = (t, s) => phScene(t, s, "13 · Cliffhanger: test three (bend)", ["The void deck in long afternoon light. The board OUR 3 TESTS centred between the discs: 1 PULL ✓ · 2 DROP ✓ · 3 BEND with its box empty and glowing. EP8's two picture boards (picBoard band1 / stick) hop low to the front of the table with their two cards (ansCard).",
  "Basil big in his disc (surprised) says g1302. A big ? pops between the boards. PART 2 slams in on \"Find out in Part Two!\" (EP8 p1.js SC.cliff: the PART 2 slam)."]) + TF(1600, 1040, .5, board3(t, { glow: 2 }));

/* 14 · "Now you know!": the board OUR 3 TESTS stands centred in the free space between the buddies (Stage 2: the drawn board) */
SC.nyk = (t, s) => nykScene(t, s, TF(960, 1046, .5, board3(t, { glow: -1 })), { bx: [200, 1715, 1375], hx: 470 });
})(); }
