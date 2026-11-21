// p2.js: PART 2, "One Car, FOUR Materials! Why Not Just One?": one object, different materials; many materials, one object; suitable.
// Segments 1-15 of p3_ep12_script.md (version 1, 21 Nov 2026; the teacher's go-ahead in its section 12).
// STAGE 1 (setup): the shared routines are wired (the calm three-picture recap with its labels, game, goals read by Pip, round card, the lock-in
// with its two clue labels on top of the ring, Mark Sentences read by Basil / Momo (with the tag "function = the job of a part"), the book
// strips, the board MATCH THE JOB as a functional placeholder (rows 3-7, the ticks), the LOOK-CLOSER frame, the Showdown's ring, stamp and picks
// with Momo's notes as a functional placeholder, the tip card, chant, score hand, the EP13 dare cards, read-along, "Now you know!"); every
// scene with new art is a phScene placeholder (and each [LOOK CLOSER] an lcPH placeholder inside the real frame). STAGE 2 (Fable) draws them:
// see SCENES_TODO.md.
if (PART === 2) { (() => {
const L1 = "j401";
// the scores (script section 3): Round 1 1 : 1, Showdown 3 : 1
SCORE.push([W("j507", "one", 2) - .1, 1, 1]);
SCORE.push([W("j1006", "two") - .1, 3, 1]);
const FOOT = "P3 · Diversity of Materials · Choosing materials";
const stageNote = (txt, y = 1000) => T(960, y, "(Stage 2: " + txt + ")", 24, "#fff", { w: 500 });
const qMark = (t, t0, x, y, r = 50) => t < t0 ? "" : TF(x, y, spring(t, t0, .5) * (1 + .05 * Math.sin(t * 4)), `<g filter="url(#dropS)"><circle r="${r}" fill="url(#gSun)"/></g>${T(0, r * .52, "?", r * 1.56, P.ink)}`);

/* 1 · "Last time...": three calm pictures from Part 1, one at a time, each >= 2.5 s, centred and large, a gentle push-in, one label each.
   (PURPOSE and PHYSICAL PROPERTIES are NOT put on Part 2's shelf: it holds only this part's new words.) */
SC.lasttime = (t, s) => { const L = "j101", tb = [s.t0, W(L, "the", 1) - .2, W(L, "now") - .2], i = t >= tb[2] ? 2 : t >= tb[1] ? 1 : 0, labs = ["The trolley: metal, strong", "The fish tank: glass, transparent and waterproof", "Three bottles: which one for school?"];
  const what = ["the loaded metal trolley at the moment of the knock in the trolley bay (Part 1's look-closer)", "the glass fish tank: the fish clear, the shelf under it dry", "the three water bottles in the trolley (plastic, glass, metal) with the big ?"];
  const z = 1 + .05 * eio((t - tb[i]) / 4), k = ramp(t, tb[i] + .05, .5);
  return bg("stage2") + OP(ramp(t, s.t0, .3), T(960, 110, "Last time…", 60, "#fff", { w: 600 }))
    + OP(k, `<g transform="translate(960 540) scale(${n2(z)}) translate(-960 -540)"><g filter="url(#drop)"><rect x="410" y="200" width="1100" height="640" rx="36" fill="url(#gPaper)"/></g>${tpill(960, 250, "PICTURE " + (i + 1) + " · STAGE 2: TO DRAW", 26, P.coral, "#fff", { w: 700 })}${wrap(what[i], 40, 960, 600).map((l, j) => T(960, 420 + j * 56, l, 40, P.ink, { w: 600 })).join("")}</g>`
      + (i === 2 ? qMark(t, tb[2] + .3, 960, 640) : "") + TF(960, 960, spring(t, tb[i] + .3, .4), tpill(0, 0, labs[i], 46, "#fff", P.ink, { w: 700 }))) + HUD(t); };

/* 2 · the new place (the car park beside the HDB block), the game and the hidden squirrel; 3 · goals (Pip reads) */
SC.place = (t, s) => phScene(t, s, "2 · The car park of an HDB block (no voice)", ["The open-air car park beside the block, bright: marked lots, a small plain family car (no badge, no number plate) parked in one, its boot open with two shopping bags in it, the trolley beside it, a covered linkway behind, a grass verge with a rain tree (the little SQUIRREL on a low branch, flicking its tail: every wide shot), the block beyond.",
  "A small folding table in the empty lot next to the car with the three bottles in a row on it; the board MATCH THE JOB beside it, two rows filled. The buddies in their discs on the verge side, away from the road. Pill: The car park of an HDB block, Singapore. Small print upper left in every car-park shot (carRules, wired)."]) + carRules(t, s.t0 + .3);
SC.game = (t, s) => gameScene(t, s, "j201", false) + carRules(t);
SC.goals = (t, s) => goals3(t, s, [["One object, different materials", ""], ["Many materials, one object", ""], ["Choosing a suitable material", ""]], ["j301", "j302", "j303", "j304"], "pip");

/* 4 · Round 1: a bottle for school (clue labels must not break when dropped · see the water inside on top of the ring, kept through the countdown) */
SC.r1card = (t, s) => roundCard(t, s, "ROUND 1");
const r1labels = (t) => [["must not break when dropped", W(L1, "must") - .1], ["see the water inside", W(L1, "see") - .1]].map(([l, tq], i) => t < tq ? "" : TF(430 + (i ? 150 : -120), 470 - RING_R - 14 - (i ? 0 : 50), spring(t, tq, .4), tpill(0, 0, l, 28, "#fff", P.ink, { w: 700 }))).join("");
SC.r1 = (t, s) => lockN(t, { cards: ["Plastic", "Glass", "Metal"], labels: r1labels, q: "Which bottle for school?", tq: W(L1, "water") - .1, tc: [W(L1, "one", 1), W(L1, "two"), W(L1, "three")], ring0: MK("ring0_r1"), dur: 6, lock: "j402",
  obj: ringPH("school bag, empty bottle pocket"), picks: [{ who: "momo", id: "j403", word: "3", x: true }, { who: "basil", id: "j404", word: "1" }, { who: "pip", id: "j405", word: "1" }],
  react: [[LE("j403") + .1, "momo", "thinking"], [LE("j404") + .1, "basil", "cheer"], [LE("j405") + .1, "pip", "pointing"]] });

/* 5 · [LOOK CLOSER] three bottles, one of each material: the tick table (WATERPROOF, SEE THE WATER, DOES NOT BREAK EASILY); the book's strip */
SC.lcbottles = (t, s) => lcPH(t, s, { title: "Three bottles: plastic, glass, metal; a tick table under them", v: "v_bottle", verdict: VSTYLE("FOR SCHOOL: THE PLASTIC BOTTLE", 0), fx: 960, fy: 600,
  setNote: "the folding table in the car park, the three bottles in a row on it, full and closed (the look-closer zooms in from here)",
  strips: [["j506", "Glass is not as strong as plastic or metal.", { keys: ["not", "as", "strong"] }]],
  beats: [["dry", "row 1: the glide under the bottles: dry"], ["ticks1", "three ticks"], ["backlight", "a soft light from behind"], ["see1", "plastic: the water"], ["see2", "glass: the water"], ["see3", "metal: a cross"], ["land", "the plastic bottle lands, bounces, rolls"], ["tick3", "no crack, no leak: tick"], ["rest", "the hand rests on the glass bottle"], ["noglass", "We do not drop glass."], ["xg", "a cross under glass"], ["tm", "a tick under metal"], ["v_bottle", "verdict"]],
  notes: ["The three bottles fill the window (same height and shape, full, closed): clear plastic (water line, a soft highlight), clear glass (water line, a sharper glint, thicker walls), brushed metal (nothing seen inside). Under them a small cream tick table builds a row at a time, the bottles as its columns. Row 1 WATERPROOF: MK dry the camera glides along the table under them: dry under each; MK ticks1 three ticks (.3 s apart).",
    "Row 2 SEE THE WATER: MK backlight a soft light from behind; MK see1, see2 the water line shows in plastic and glass (tick, tick, a soft slosh), MK see3 metal shows nothing (a cross); labels the water · the water · cannot see inside. Row 3 DOES NOT BREAK EASILY: an adult's hand holds the plastic bottle at knee height and lets go .42 s before MK land: it lands on its side, bounces once and rolls (tok-tok); the hand picks it up and turns it: MK tick3 no crack, no leak (tick).",
    "MK rest: the hand rests on the glass bottle and does not lift it; MK noglass: small print beside it We do not drop glass. (GLASS_RULE). The book's strip (wired, top of the window); MK xg a cross under the glass bottle, MK tm a tick under the metal one. Verdict FOR SCHOOL: THE PLASTIC BOTTLE (green) at v_bottle, with a small tag by the glass bottle to the end of the shot: At home, on a table: glass is fine. Handle it carefully."] }) + carRules(t);
/* the answer is one: plastic; Momo's correction; the third row fills on the board (row3). WIRED with the placeholder board */
SC.bottleans = (t, s) => { const L = "j507", tA = W(L, "one") - .1, tOne = W(L, "one", 2) - .1, hm = HAS("j508");
  return bg("stage2") + stageNote("the car park behind; the three bottles on the folding table", 120)
    + ["Plastic", "Glass", "Metal"].map((c, i) => TF(760 + i * 300, 420, .5 * spring(t, s.t0 + .1 + i * .08, .4), ansCard(i + 1, c, { w: 430, h: 290, size: 58, lit: i === 0 && t >= tA ? spring(t, tA, .45) : 0 }))).join("")
    + coin(t, tOne, 1690, 300, "+1", "if you showed one finger") + TF(1360, 1066, .4, matchBoard(t, { row: 2 }))
    + buddy("momo", 330, 1060, 300, t, { aura: true, in: s.t0 + .1, poses: [[s.t0, "surprised"], [hm ? LT("j508") - .12 : tA + 1, "sit"]], jump: [[hm ? LE("j508") + .1 : tA + 1.2, 20]] })
    + (hm ? say("j508", 520, 560, t, { size: 40, tail: -140, maxW: 480 }) : (t >= tA + .8 ? TF(560, 600, spring(t, tA + .8, .4), tpill(0, 0, "Strong, but we cannot see the water", 36, "#fff", P.ink, { w: 700 })) : "")) + carRules(t) + HUD(t); };

/* 6 · Mark Sentence 1 (Basil): 3.26; USE pops right after "use" (lib.js o.at) */
SC.mark1 = (t, s) => markScene(t, s, { id: "j602", sayId: "j601", who: "basil", n: "1 of 2", text: "An object can be made from different materials. The choice of materials depends on the use of the object.", keys: ["different", "materials.", "depends", "on", "use"], size: 62, y: 250, footer: FOOT,
  extra: stageNote("under the card: the three bottles with their finished tick table", 1040) });

/* 7 · the shopping goes into the car (bagin2, bootshut); [LOOK CLOSER] one car, part by part */
SC.boot = (t, s) => phScene(t, s, "7 · The last bag goes into the boot", ["MK bagin2: an adult's hands lift the last shopping bag from the trolley into the car's open boot; MK bootshut: they close the boot gently (a soft thump). The camera turns to the car on \"Now look closer\" (the set the look-closer zooms in from). The car is parked, switched off and empty, its hand brake on."]) + carRules(t);
SC.lccar = (t, s) => lcPH(t, s, { title: "One car, part by part: tyres, seats, windscreen, body", v: "v_car", verdict: VSTYLE("ONE CAR · FOUR MATERIALS", 0), fx: 960, fy: 600,
  beats: [["tyre", "TYRES: a front tyre"], ["palm", "a palm pushes: it does not give"], ["seats", "SEATS through the open door"], ["press", "a hand presses: it dips, comes back"], ["screen", "WINDSCREEN"], ["pour", "the watering can: water runs off"], ["body", "BODY: the door panel"], ["knock", "two knuckle knocks"], ["allfour", "pull back: all four lit"], ["kw_parts", "PARTS pops"], ["v_car", "verdict"], ["carrows", "the car's rows hop onto the board"]],
  notes: ["The car fills the window; the car park dims. Four close-ups, each about 6 s, each with one plain label line and its chip, the part lit while the rest of the car is dimmed. MK tyre: a front tyre from the side, the car's weight on it, its foot flat and firm; MK palm: an adult's palm pushes hard against its side: it does not give (a dull rubber thud); label tyres · rubber; chip STRONG.",
    "MK seats: through the open front door; MK press: a hand presses down on the seat: the fabric dips and comes back when the hand lifts (a soft pff); label seats · fabric; chip FLEXIBLE. MK screen: the windscreen from outside; MK pour: an adult's hands tip a watering can over the glass: the water runs down in beads and streams and off the bottom edge; through the glass the two front seats, sharp and dry; label windscreen · glass; chips WATERPROOF, TRANSPARENT (waterproof first).",
    "MK body; MK knock: a hand knocks twice with its knuckles on the door panel: solid; label body · metal; chip STRONG. MK allfour: pull back: the whole car, all four parts lit with their labels and chips. PARTS pops at the upper right (wired). Verdict ONE CAR · FOUR MATERIALS (green) at v_car; MK carrows: on the board (at the window's edge as it pulls back) the car's picture hops on with its four rows. No accident shown or named."] });

/* 8 · Mark Sentence 2 (Momo): 3.27, the tag "function = the job of a part" for the whole card; Heart's plain re-say (j803): each part pulses (p1..p4) */
SC.mark2 = (t, s) => { const parts = [["tyres", "STRONG"], ["seats", "FLEXIBLE"], ["windscreen", "WATERPROOF"], ["body", "STRONG"]];
  return markScene(t, s, { id: "j802", sayId: "j801", who: "momo", n: "2 of 2", text: "The materials are selected for the different functions of the parts based on their physical properties.", keys: ["different", "functions", "physical", "properties."], size: 62, y: 230, footer: FOOT,
    extra: (t >= s.t0 + .6 ? TF(1150, 800, spring(t, s.t0 + .6, .4), tpill(0, 0, "function = the job of a part", 34, "#FFF8EA", P.ink, { w: 700 })) : "")
      + parts.map(([p, c], i) => { const mk = MK("p" + (i + 1)), g = pulse(t, mk, .05, .6), x = 760 + i * 250; return TF(x, 930, 1 + .25 * g, tpill(0, 0, p, 28, "#fff", P.ink, { w: 700 })) + TF(x, 995, 1 + .25 * g, propChip(c, 22)); }).join("")
      + stageNote("under the card: the car with its four labelled parts; each part pulses once with its chip at MK p1..p4", 1062) }); };

/* 9 · BE A DROP OF WATER (the first-person journey) */
SC.waitw = (t, s) => phScene(t, s, "9 · Be a drop of water! (the glide in)", ["Pill Be a drop of water! The camera glides up to the spout of the watering can, held by an adult's hand above the windscreen; a soft cream wipe at the scene end. The shelf slides aside (SHELF_HIDE)."]);
SC.shrink = (t, s) => phScene(t, s, "9 · BE A DROP OF WATER (first person, present tense)", ["MK jspout: a round opening, bright sky beyond; the view wobbles softly at its edges (you are water). Tag You: a drop of water. Out you tip; MK jglass: the windscreen comes up from below like a huge clear wall, tilted; MK jsplash (\"Splash!\"): a soft splash; the view flattens against the glass and holds; you do not go in. Tag glass · you cannot pass through.",
  "MK jseats: straight ahead, through the glass, large and sharp: the two front seats, their woven cloth, dry. Tag fabric seats · dry inside. MK jslope (\"metal\"): you slide off the bottom edge and run down a wide shiny painted slope, the sky mirrored in it; tag metal body. MK jtyre (\"rubber\"): you drop past a tall black wall with deep grooves; it does not move; tag rubber tyre. MK jground: a small splash; a drain cover a little way off; tag the ground. Calm pad, Heart soft; no game sounds."]);

/* 10 · Showdown: Momo's notes (double points). WIRED: the notes as a functional placeholder (each line lights as Momo reads it, the three
   lines stay through the countdown), the YOU ring with a counting hand (6 s), LOCKED IN!, the picks; Stage 2 draws the easel and the drawings */
const NOTES = ["Rubber tyres, because rubber is strong.", "A glass windscreen, because glass is made from sand.", "Fabric seats, because fabric is flexible."], NOTEFIX = "A glass windscreen, because glass is waterproof and transparent.";
// Momo's notes (placeholder: Stage 2 draws them on an easel standing on the ground between the discs, each line with its small drawing: a tyre;
// the windscreen and a small heap of sand; a seat). o.lit [3]; o.rub 0..1 (line 2 rubbed out), o.fix 0..1 (rewritten in green). origin = the feet
function momoNotes(t, o = {}) { const lit = o.lit || [0, 0, 0]; let s = "";
  NOTES.forEach((ln, i) => { const y = -560 + i * 120; if (lit[i] > .02) s += `<rect x="-560" y="${y - 50}" width="1120" height="96" rx="16" fill="${P.sun}" opacity="${n2(.35 * lit[i])}"/>`;
    s += T(-520, y + 14, (i + 1) + "", 44, P.momo, { a: "start" }) + (i === 1 && o.fix ? OP(1 - (o.rub || 0), T(-470, y + 12, ln, 36, P.ink, { a: "start", w: 600 })) + OP(o.fix, T(-470, y + 12, NOTEFIX, 34, "#1F8A4C", { a: "start", w: 700 })) : T(-470, y + 12, ln, 36, P.ink, { a: "start", w: 600 })); });
  return `<path d="M-260 0 L-130 -300 M260 0 L130 -300" stroke="#8A5A36" stroke-width="16" stroke-linecap="round"/><g filter="url(#drop)"><rect x="-600" y="-740" width="1200" height="560" rx="30" fill="url(#gPaper)" stroke="#E3C9A8" stroke-width="6"/></g>`
    + T(-560, -650, "Momo’s notes · Why this material?", 44, P.momo, { a: "start" }) + s + tpill(0, -205, "STAGE 2: easel + a drawing on each line", 22, P.coral, "#fff"); }
const noteLit = (t) => { const L = "j1001", ws = ["one", "two", "three"].map((w) => TL.lines[L].words.some((x) => norm(x.w) === w) ? W(L, w) : 1e9), r0 = MK("ring0_show");
  return [0, 1, 2].map((i) => { const a = ws[i], b = i < 2 ? ws[i + 1] : LE(L); return t >= a - .1 && t < Math.min(b, LE(L) + .2) ? 1 : t >= r0 && t < MK("bell_show") ? .45 : 0; }); };
SC.show = (t, s) => { const r0 = MK("ring0_show"), bell = MK("bell_show"), rs = ringState(t, r0, 6), tS = LT("j1003") - .08, R = [1600, 330];
  const picks = [["basil", "j1004", "2", 960], ["pip", "j1005", "2", 1320]];
  return bg("stage2") + stageNote("the car park behind, dimmed", 140) + TF(860, 900, .72, momoNotes(t, { lit: noteLit(t) }))
    + (t >= LT("j1002") ? TF(R[0], R[1], spring(t, LT("j1002"), .4), `<g transform="scale(.6)">${ringTimer(0, 0, t < r0 ? 1 : t < bell ? rs.frac : 0, t < r0 ? 6 : t < bell ? rs.secs : 0, t, { tick: rs.tick, shut: pulse(t, bell, .01, .6), inner: TF(0, 0, .85, `<g filter="url(#dropS)">${countHand(3)}</g>`) })}</g>` + youPill(-150, -130, .9)) : "")
    + buddy("momo", 230, 1060, 260, t, { aura: true, in: s.t0 + .1, poses: [[s.t0, "pointing"], [LT("j1001") - .12, "sit"], [LE("j1001") + .2, "pointing"], [LT("j1004") - .1, "oops"]] }) + say("j1001", 520, 330, t, { size: 38, tail: -220, maxW: 760 })
    + picks.map(([w, id, n, x]) => buddy(w, x + 300, 1060, 230, t, { aura: true, in: r0 - .3, poses: [[r0 - .3, w === "basil" ? "arms_crossed" : "thinking"], [LT(id) - .12, "sit"], [LE(id) + .1, w === "basil" ? "cheer" : "pointing"]], flip: true }) + (t > r0 ? pickNum(w, x + 300 - 150, 900, t, LT(id) - .1, n) : "") + say(id, x + 100, 560, t, { size: 38, maxW: 520, tail: 140 })).join("")
    + stamp(t, tS, 960, 460) + bellIcon(t, r0) + carRules(t) + HUD(t); };
/* the fix: line 2 rubbed out and rewritten in green (rub), the tip card (tip), +2 */
SC.fix = (t, s) => { const rb = MK("rub"), rub = ss(rb, rb + .5, t), fix = ss(rb + .4, rb + 1.2, t), tip = MK("tip");
  return bg("stage2") + TF(760, 900, .62, momoNotes(t, { rub, fix, lit: [0, fix * .6, 0] }))
    + (t >= tip ? TF(1500, 560, spring(t, tip, .45), `<g filter="url(#drop)"><rect x="-330" y="-120" width="660" height="240" rx="30" fill="url(#gPaper)"/></g>${T(-280, -28, "1 Name the property.", 46, P.ink, { a: "start" })}${T(-280, 52, "2 Link it to the job.", 46, P.ink, { a: "start" })}` + stageNote("the tip card: plain lines from \"property\" to waterproof, from \"job\" to rain on the windscreen and dry seats", 140)) : "")
    + coin(t, W("j1006", "two") - .1, 1700, 860, "+2", "line 2") + carRules(t) + HUD(t); };
/* the board MATCH THE JOB, all seven rows, a green tick at the end of each (ticks); the book's strip 3.30 item 3; SUITABLE pops (lib.js o.at) */
SC.board = (t, s) => { const L = "j1008";
  return bg("stage2") + stageNote("the car park behind; the board on its low stand, centred between the discs", 1062) + TF(960, 1010, .62, matchBoard(t))
    + bookCaption(t, L, "It is important to choose a material whose physical property", 330, { size: 46, keys: ["physical", "property"] }) + bookCaption(t, L, "is suitable for the intended use of the object.", 420, { size: 46, off: 10, keys: ["suitable", "intended", "use"] }) + carRules(t) + HUD(t); };

/* 11 · the chant: call and response (common.js chantScene); the board MATCH THE JOB behind the buddies, its PURPOSE / PROPERTY / MATERIAL columns
   flashing on their lines (matchBoard({flash}), placeholder at the lower left; Stage 2: the drawn board, centred and big enough to read) */
SC.chant = (t, s) => chantScene(t, s, "c1003", { sayId: "u1002", size: 58, board: (tt, flash) => TF(230, 1066, .28, matchBoard(tt, { flash })) });

/* 12 · score hand, the squirrel (lizReveal in common.js) */
SC.final = (t, s) => { const L = "j1201"; return finalScene(t, s, L, 1, [[s.t0, null, 1], [W(L, "three") - .1, null, 3]]); };
SC.liz = (t, s) => phScene(t, s, "12 · Did you spot the squirrel? (lizReveal in common.js)", ["A replay of the wide car park with a ring round the little squirrel on the low branch of the rain tree; it runs along the branch, sits up and flicks its tail. Pill: Tell someone at home! Use lizReveal(t, s, \"j1202\", view, x, y, tq, \"It was on the tree by the cars!\")."]);

/* 13 · the dare for Episode 13: a school bag with a torn strap (fabric, metal, wood). The three cards are wired (EP13 opens with these same boards and cards) */
const DRX = [560, 960, 1360];
SC.dare = (t, s) => { const a = "j1301", tQ = W(a, "which") - .15, tc = [W(a, "one") - .1, W(a, "two") - .1, W(a, "three") - .1], tL = W(a, "lock") - .1;
  return phScene(t, s, "13 · The dare for Episode 13: a school bag", ["Three picture boards slide in low and stand side by side by the folding table, centred between the discs: the SAME school bag three times, its strap torn off at one end, each with a new strap lying beside it: a fabric strap, a flat metal bar, a wooden stick. A big ? pops above them. Banner NEXT · Design a school bag! · Lock in your answer! Basil cheer (j1302, cuttable last). A zip's zzip."])
    + NEXT_CARDS.map((txt, i) => TF(DRX[i], 690, .5 * spring(t, tc[i], .45), ansCard(i + 1, txt, { w: 430, h: 290, size: 58, pulse: Math.max(pulse(t, tc[i], .04, .6), t >= tL ? (Math.floor((t - tL) / .5) % 3 === i ? .8 : 0) : 0) }))).join("")
    + qMark(t, tQ, 960, 560, 44) + (t >= tL ? TF(960, 470, spring(t, tL, .45), tpill(0, 0, "Lock in your answer!", 40, P.sun, P.ink, { w: 700 })) : "") + carRules(t); };

/* 15 · "Now you know!": the board MATCH THE JOB, complete and ticked, centred in the free space between the buddies */
SC.nyk = (t, s) => nykScene(t, s, TF(920, 1040, .5, matchBoard(t)), { bx: [200, 1715, 1375], hx: 470 });
})(); }
