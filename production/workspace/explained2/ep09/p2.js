// p2.js: PART 2, "Rubber Band vs Ice-Cream Stick: Which One SNAPS?": flexibility, flexible and rigid, the three tubes, strong is not flexible.
// Segments 1-15 of p3_ep09_script.md (version 1, 21 Nov 2026; the teacher's answers in its section 12).
// STAGE 1 (setup): the shared routines are wired (game, goals, round card, the lock-in with its clue tag on top of the ring, Mark Sentences read
// by the buddy, the LOOK-CLOSER frame, chant, score hand, read-along, "Now you know!"); every scene with new art is a phScene placeholder (and
// each [LOOK CLOSER] an lcPH placeholder inside the real frame). STAGE 2 (Fable) draws them: see SCENES_TODO.md.
if (PART === 2) { (() => {
const L1 = "j401";
// the scores (script section 3): Round 1 1 : 1, Showdown 3 : 1
SCORE.push([W("j505", "one", 1) - .1, 1, 1]);
SCORE.push([W("j1008", "two") - .1, 3, 1]);
const FOOT = "P3 · Diversity of Materials · Physical properties";
const ringPH = (txt) => (tt) => `<circle cx="430" cy="470" r="150" fill="#fff" opacity=".6"/>` + T(430, 482, txt, 34, P.ink);

/* 1 · "Last time...": three calm pictures from Part 1, one at a time, each >= 2.5 s, centred and large, a gentle push-in, one label each */
SC.lasttime = (t, s) => { const L = "j101", tb = [s.t0, W(L, "a") - .2, W(L, "now") - .2], i = t >= tb[2] ? 2 : t >= tb[1] ? 1 : 0, labs = ["Fabric: stronger than paper", "Glass: fragile", "Test 3: bend"];
  const what = ["the two strips on the stand: the paper strip torn at 3, the fabric strip whole at 8", "the drop box: the broken glass cup (big pieces, inside the box) and the whole metal cup", "the board OUR 3 TESTS with two green ticks; row 3 BEND glowing"];
  const z = 1 + .05 * eio((t - tb[i]) / 4), k = ramp(t, tb[i] + .05, .5);
  return bg("stage2") + OP(ramp(t, s.t0, .3), T(960, 110, "Last time…", 60, "#fff", { w: 600 }))
    + OP(k, `<g transform="translate(960 540) scale(${n2(z)}) translate(-960 -540)"><g filter="url(#drop)"><rect x="410" y="200" width="1100" height="640" rx="36" fill="url(#gPaper)"/></g>${tpill(960, 250, "PICTURE " + (i + 1) + " · STAGE 2: TO DRAW", 26, P.coral, "#fff", { w: 700 })}${wrap(what[i], 40, 960, 600).map((l, j) => T(960, 480 + j * 56, l, 40, P.ink, { w: 600 })).join("")}</g>`
      + (i === 2 ? TF(960, 800, .42, board3(t, { glow: 2 })) : "") + TF(960, 960, spring(t, tb[i] + .3, .4), tpill(0, 0, labs[i], 50, P.sun, P.ink, { w: 700 }))) + HUD(t); };

/* 2 · the new place, the game and the hidden caterpillar; 3 · goals (Pip reads) */
SC.place = (t, s) => phScene(t, s, "2 · The playground beside the block (no voice)", ["Late afternoon: a rubber floor, a slide with a handrail, a swing, the HDB block behind; a bench with OUR TEST STAND on it and the board OUR 3 TESTS (two ticks) beside it. The three buddies in their discs. Location pill: The playground beside the block, Singapore.", "On the slide's handrail, small, the CATERPILLAR inches along (it stays there in every wide playground shot)."]);
SC.game = (t, s) => gameScene(t, s, "j201", false);
SC.goals = (t, s) => goals3(t, s, [["What flexibility means", ""], ["Flexible or rigid", ""], ["Strong is not the same as flexible", ""]], ["j301", "j302", "j303", "j304"], "pip");

/* 4 · Round 1: the dare from EP8 (a short 3 s ring); clue tag "rubber · wood" on top of the ring, kept through the countdown */
SC.r1card = (t, s) => roundCard(t, s, "ROUND 1", "YOUR ANSWER FROM LAST TIME");
SC.r1 = (t, s) => lockN(t, { cards: ["The rubber band", "The ice-cream stick"], tag: "rubber · wood", q: "Which one can bend without breaking?", tq: W(L1, "which") - .1, tc: [W(L1, "one", 2), W(L1, "two")], ring0: MK("ring0_r1"), dur: 3, lock: "j402",
  obj: ringPH("the tray: band + stick"), picks: [{ who: "pip", id: "j403", word: "2", x: true }, { who: "basil", id: "j404", word: "1" }, { who: "momo", id: "j405", word: "1" }],
  react: [[LE("j403") + .1, "pip", "thinking"], [LE("j404") + .1, "basil", "cheer"], [LE("j405") + .1, "momo", "pointing"]] });

/* 5 · test three: BEND. [LOOK CLOSER] the slow bend test; the answer; tick 3 BEND */
SC.lcbend = (t, s) => lcPH(t, s, { title: "The slow bend test: the rubber band bends, the stick snaps", v: "v_bend", verdict: ["IT BENDS WITHOUT BREAKING", GOODC], fx: 960, fy: 600,
  setNote: "the bench with the small tray: a rubber band and a wooden ice-cream stick; an adult's two gloved hands pick up the band",
  notes: ["Small print upper left: An adult does the test. Just watch! Tag slow motion. THE RUBBER BAND (j501): the fingers bend it in half, then into a twist, then let go: it returns to its loop. A round magnifier rides on the tightest bend: smooth and whole. Label line no crack.",
    "THE ICE-CREAM STICK (j502): the hands put the band down and pick up the stick, as large. They bend it slowly: it bows a little; the magnifier rides on the OUTSIDE of the bend, where a pale crack opens; it snaps into two pieces with splintered ends; both pieces laid on the tray. Label It breaks.",
    "Verdict IT BENDS WITHOUT BREAKING lands on the rubber band at v_bend. Sound: a soft rubbery creak, a twang as it springs back; a dry wooden creak that rises, a clean snap, two light taps."] });
SC.bendans = (t, s) => phScene(t, s, "5 · The answer is one: the rubber band", ["Answer card 1 The rubber band glows. Pip: surprised, then a nod (g j504, cuttable). Coin +1 if you showed one finger. Score 1 : 1 (wired). MK tick3: a green tick is stamped on 3 BEND: all three boxes ticked (board3 below)."]) + TF(1600, 1040, .5, board3(t, { glow: 2 }));

/* 6 · Mark Sentence 1: flexibility (Basil); 7 · Mark Sentence 2: flexible or rigid (Momo, the two trays) */
SC.mark1 = (t, s) => markScene(t, s, { id: "j602", sayId: "j601", who: "basil", n: "1 of 2", text: "The flexibility of a material is its ability to bend without breaking.", keys: ["flexibility", "bend", "without", "breaking."], size: 66, y: 256, footer: FOOT,
  extra: T(1150, 1000, "(Stage 2: under the card, the rubber band bent in half, whole)", 24, "#fff", { w: 500 }) });
const trays = (t, t0) => TF(1180, 1060, spring(t, t0 + .2, .45), `<rect x="-330" y="-60" width="300" height="60" rx="14" fill="${GOODC}"/>${T(-180, -18, "FLEXIBLE", 30, "#fff")}<rect x="30" y="-60" width="300" height="60" rx="14" fill="${WEAKC}"/>${T(180, -18, "RIGID", 30, "#fff")}`)
  + T(1180, 950, "(Stage 2: two trays slide in low on the bench; the band hops onto green, the two stick pieces slide onto blue)", 22, "#fff", { w: 500 });
SC.mark2 = (t, s) => markScene(t, s, { id: "j702", sayId: "j701", who: "momo", n: "2 of 2", text: "Materials that bend easily without breaking are flexible. Materials that break easily when bent are rigid.", keys: ["bend", "easily", "without", "breaking", "flexible.", "break", "when", "bent", "rigid."], size: 58, y: 200, footer: FOOT,
  extra: trays(t, s.t0) });
SC.tiles = (t, s) => phScene(t, s, "7 · A rubber tile and a ceramic tile (the book's pair, p. 55)", ["Two picture boards hop low, one onto each tray: a rubber tile bending in two hands (green FLEXIBLE tray), a ceramic tile broken straight across (blue RIGID tray). Each with its tag."]) + trays(t, s.t0 - 9);

/* 8 · BE A RUBBER BAND (the first-person journey) */
SC.waitw = (t, s) => phScene(t, s, "8 · Be a rubber band! (the dive)", ["Pill Be a rubber band! The camera dives towards the rubber band on the green tray; a soft cream wipe at the scene end. The shelf slides aside (SHELF_HIDE)."]);
SC.shrink = (t, s) => phScene(t, s, "8 · BE A RUBBER BAND (first person, present tense)", ["MK hook: you hang with other rubber bands on a hook; your own loop frames the bottom of the view (a rounded tan edge); beyond it, far away and huge, a chicken rice stall at a hawker centre: counter, a stack of brown paper, a chopping board, a signboard with a plate of rice. Tags You: a rubber band · at the chicken rice stall.",
  "MK picked: two giant fingers close on you; the world folds: your far side swings round to meet your near side. Tag bent in half. MK packet: a brown-paper packet of rice rises like a hill; you are looped round it; your loop bends sharply at each of its four corners, each bend glows softly. Tag You bend at every corner.",
  "MK ride: a short dark ride (the inside of a plastic bag, swaying). MK home: a kitchen table; fingers hook under you and pull you off. MK flexible: you spring back into a round loop on the table, whole. Tags no crack · no snap · flexible. Say bend, never stretch. Calm pad, far hawker sounds."]);
SC.pullout = (t, s) => phScene(t, s, "8 · Pull back out to the playground bench", ["Whoosh out to the bench. Basil, cheer pose: Now I am hungry! (j807, cuttable)."]);

/* 9 · [LOOK CLOSER] three tubes: most and least flexible; the book's sentences (3.16a) on the strip; the verdict */
SC.lctubes = (t, s) => lcPH(t, s, { title: "Three tubes under the same weight", v: "v_tubes", verdict: ["Rubber: the most flexible · Metal: the least flexible", "#3B2A8C"], fx: 960, fy: 600,
  setNote: "the bench: three tubes clamped side by side at their left ends, level; tags rubber · plastic · metal and same length · same thickness",
  strips: [["j902", "Rubber tubes can bend more than plastic tubes without breaking.", { size: 42, y: 230 }], ["j902", "Plastic tubes can bend more than metal tubes without breaking.", { size: 42, y: 310, off: 10 }]],
  notes: ["A gloved hand hangs the same small weight on the free end of each, one after another (j901). The rubber tube droops in a deep curve; the plastic tube in a shallow curve; the metal tube hardly moves. A faint level line behind them shows how far each end has dropped; plain label lines bends the most (rubber) · bends the least (metal).",
    "The book's two sentences on the cream strip (j902, >= 3.5 s; drawn here by lcStrip as two strips, one per sentence). The verdict tag (small under it: among the three tubes) lands at v_tubes; the verdict is long: draw it as two lines or a wider tag."] });

/* 10 · Showdown: Momo's notes (double points) */
SC.show = (t, s) => phScene(t, s, "10 · SHOWDOWN: Momo's notes (ring0_show, 6 s)", ["Momo's notes on an easel standing on the ground in the free space between the discs: three ruled lines, each with a small drawing: 1 Rubber bends the most, so it is the most flexible. (the drooping rubber tube) 2 Paper bends easily, so paper is strong. (the paper strip curving under a finger, from Part 1) 3 Metal bends the least, so it is the least flexible. (the level metal tube). Each line lights as Momo reads it.",
  "The YOU ring with a counting hand, 6 s; the three lines and drawings stay in view through the whole countdown. LOCKED IN! Basil 2 (cheer), Pip 2 (pointing); Momo oops. Model: ep08/p2.js SC.show (easel, ring, stamp, picks)."]);
SC.fix = (t, s) => phScene(t, s, "10 · Bends easily, tears easily: two different properties", ["A small replay strip above the easel, two pictures side by side: the paper strip curving under a finger (tag bends easily) and the paper strip torn at 3 (tag tears easily). On the easel, line 2 is rubbed out and rewritten in green: Paper bends easily, so paper is flexible.", "A cream tip card: Strong and flexible are two different properties. Coin +2. Score 3 : 1 (wired)."]);

/* 11 · the chant: call and response (common.js chantScene); the board OUR 3 TESTS behind the buddies */
SC.chant = (t, s) => chantScene(t, s, "c1003", { sayId: "u1002", size: 54, board: (tt, flash) => TF(232, 1066, .3, board3(tt, { glow: flash.indexOf(Math.max(...flash)) })) });

/* 12 · score hand, the caterpillar (lizReveal in common.js) */
SC.final = (t, s) => { const L = "j1201"; return finalScene(t, s, L, 1, [[s.t0, null, 1], [W(L, "three") - .1, null, 3]]); };
SC.liz = (t, s) => phScene(t, s, "12 · Did you spot the caterpillar? (lizReveal in common.js)", ["A replay of the wide playground with a ring round the little caterpillar on the slide's handrail; it arches up, stretches out and smiles. Pill: Tell someone at home!"]);

/* 13 · the dare for Episode 10 */
SC.dare = (t, s) => phScene(t, s, "13 · The dare for Episode 10", ["Two picture boards slide in low and stand side by side on the bench, centred between the discs: a clear tub of water with a metal spoon lying on the bottom (tags metal · sinks), and a giant metal ship on the sea, its hull partly below the waterline (tags metal · floats). A big ? pops on the ship's hull.",
  "Three cards: 1 Wood · 2 Air · 3 More metal (ansCard). Banner NEXT · Float or sink? · Lock in your answer! Basil surprised (j1302, cuttable). Model: ep08/p2.js SC.dare."]);

/* 15 · "Now you know!": the two trays FLEXIBLE and RIGID stand centred between the buddies (Stage 2: the drawn trays) */
SC.nyk = (t, s) => nykScene(t, s, TF(960, 1010, 1, `<rect x="-330" y="-60" width="300" height="60" rx="14" fill="${GOODC}"/>${T(-180, -18, "FLEXIBLE", 30, "#fff")}<rect x="30" y="-60" width="300" height="60" rx="14" fill="${WEAKC}"/>${T(180, -18, "RIGID", 30, "#fff")}`), { bx: [200, 1715, 1375], hx: 470 });
})(); }
