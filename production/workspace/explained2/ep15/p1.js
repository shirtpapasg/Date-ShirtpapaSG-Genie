// p1.js: PART 1, "We Planted a Mango SEED. What Grows FIRST?": EP14's dare answered (a young plant comes first), observing like a scientist,
// the seed growing (root first, then the shoot), measuring a plant. Segments 1-16 of ../p3_ep15_script.md (version 1, 22 Nov 2026).
// STAGE 1 (setup): the shared routines are WIRED (the calm recap of EP14's dare with its three real mango boards, the title slam, the game as
// ONE smooth push-in onto the snail (common.js gameScene), the goals read by Momo, the countdown, Round 1's lock-in with the mango boards on
// the cards and the clue labels on top of the ring, the two Mark Sentences (Basil, Momo), the book strip, the LOOK-CLOSER frame (lcPH inside
// the real lookCloser), the score hand, the snail's smooth reveal with its fun-fact panel, the read-along, "Now you know!"). Every scene with
// new art is a phScene placeholder. STAGE 2 (Fable) draws them: SCENES_TODO.md has the full staging per scene and per line.
if (PART === 1) { (() => {
const L1 = "g501";
// the scores (script section 3): Round 1 1 : 0 (only Basil is right), HOLD ON! 2 : 0
SCORE.push([MK("coin1") - .1, 1, 0]);
SCORE.push([W("g1203", "one") - .1, 2, 0]);
const FOOT = "P3 · Life Cycles · The life cycle of a plant";
const ph = (title, ...notes) => (t, s) => phScene(t, s, title, notes.concat(["Full staging: SCENES_TODO.md."])) + HUD(t);
const dareBoard = (i, x, y, sc, o = {}) => picBoard(DARE_PICS[i], x, y, 1, { sc, lab: o.lab === false ? undefined : DARE_CARDS[i].toLowerCase(), size: 30, id: "p1d" + i + (o.id || ""), t: o.t || 0 });
const qMark = (t, t0, x, y, r = 50) => t < t0 ? "" : TF(x, y, spring(t, t0, .5) * (1 + .05 * Math.sin(t * 4)), `<g filter="url(#dropS)"><circle r="${r}" fill="url(#gSun)"/></g>${T(0, r * .52, "?", r * 1.56, P.ink)}`);
const slamFit = (y, txt, col, k) => slamLine(y, txt, Math.min(170, 170 * 1720 / tw(txt, 170, 700, "Fredoka", 4)), col, k);
const knife = (t, t0) => smallPrint(t, t0, KNIFE_RULE);

/* 1 · silent cold open: the HDB kitchen, morning (EP14's mango boards slide in low: real art, WIRED) */
const CBX = [620, 960, 1300];
SC.cold = (t, s) => phScene(t, s, "1 · Cold open: an HDB kitchen, morning (no voice)", ["A bright kitchen after rain: the window over the sink, a grille, the far blocks; a ripe yellow mango on the chopping board. MK cutmango: an adult's hands slice the mango and lift out the ONE big flat seed (husk), set it on a saucer. The snail on the OUTSIDE window ledge by a pot of herbs.",
  "MK boardsIn: EP14's three mango dare boards slide in low with dust puffs (wired). MK budsIn: Basil (sniffing the mango), Momo, Pip pop in, standing on the counter top and the floor, big. Location pill: An HDB flat, Singapore · morning. No title. Full staging: SCENES_TODO.md."])
  + [0, 1, 2].map((i) => { const t0 = MK("boardsIn") + i * .3; if (t < t0) return ""; const [x, d] = slideX(t, t0, .7, 2500, CBX[i], 990); return d + dareBoard(i, x, 900, .5, { lab: false, id: "c" }); }).join("")
  + knife(t, MK("cutmango") - .4);

/* 2 · "Last time...": EP14's dare, word for word. ONE calm picture: the three mango boards side by side, a gentle push-in, the big ?, the
   three cards; each board steps forward and its card lights while Heart says it (>= 2.5 s each). WIRED */
SC.lasttime = (t, s) => { const L = "g203", tc = [W(L, "one"), W(L, "two"), W(L, "three")], z = 1 + .04 * eio((t - s.t0) / 8), k = ramp(t, s.t0 + .05, .5), cur = tc.filter((x) => t >= x - .15).length - 1;
  let boards = ""; [0, 1, 2].forEach((i) => { const fw = cur === i ? ss(tc[i] - .15, tc[i] + .25, t) : (cur > i ? 1 - ss(tc[i + 1] - .15, tc[i + 1] + .25, t) : 0);
    boards += dareBoard(i, 560 + i * 400, 600 + 14 * (1 - spring(t, s.t0 + .2 + i * .15, .45)), .95 * (1 + .1 * fw), { id: "lt", t }); });
  return bg("stage2") + OP(ramp(t, s.t0, .3), T(960, 110, "Last time…", 60, "#fff", { w: 600 }))
    + OP(k, `<g transform="translate(960 540) scale(${n2(z)}) translate(-960 -540)">${boards}</g>`
      + qMark(t, W("g202", "what") - .1, 960, 240)
      + DARE_CARDS.map((c, i) => TF(560 + i * 400, 880, .5 * spring(t, tc[i] - .1, .45), ansCard(i + 1, c, { w: 430, h: 290, size: 50, pulse: cur === i ? .9 : pulse(t, tc[i], .04, .9) }))).join("")
      + TF(960, 1010, spring(t, W("g202", "what") - .1, .4), tpill(0, 0, DARE_LABEL, 40, P.sun, P.ink, { w: 700 }))) + HUD(t); };
SC.back = (t, s) => phScene(t, s, "2 · Back in the kitchen", ["The kitchen (the cold open's set): the seed on its saucer, EP14's three boards by the wall (wired), the buddies big. Pill: Hold on to your answer! (wired). Full staging: SCENES_TODO.md."])
  + [0, 1, 2].map((i) => dareBoard(i, CBX[i], 900, .5, { lab: false, id: "bk" })).join("")
  + (t >= LT("g204") - .1 ? TF(960, 700, spring(t, LT("g204") - .1, .4), tpill(0, 0, "Hold on to your answer!", 40, P.sun, P.ink, { w: 700 })) : "");
// the title slam over the dimmed kitchen: WE PLANTED A MANGO SEED (white) then WHAT GROWS FIRST? (sun yellow). WIRED
const TITLE = (k1, k2) => slamFit(400, "WE PLANTED A MANGO SEED", "#fff", k1) + slamFit(610, "WHAT GROWS FIRST?", P.sun, k2);
SC.title = (t, s) => { const u = t - MK("title"), dim = clamp(u / .2); return lcSet(t, s, "back") + `<rect width="1920" height="1080" fill="${P.night}" opacity="${n2(.78 * dim)}"/>` + TITLE(slamK(u, .05), slamK(u, .55)) + HUD(t); };

/* 3 · the game, and the hidden snail: ONE smooth push-in from the (dimmed) kitchen straight onto the snail on the window ledge (common.js
   gameScene). Stage 2: R.world = the drawn kitchen, A = the snail's spot in it. WIRED */
SC.game = (t, s) => gameScene(t, s, ["g301a", "g301b", "g301r"], true, { world: (tt) => kitchenPH(tt), A: SNAIL, T: [1400, 470], Z: 2.4, dim0: .78, ly: -150, qx: 1730, qy: 430, pre: () => TITLE(1, 1) });
SC.goals = (t, s) => goals3(t, s, [["Observing like a scientist", ""], ["What grows from a seed", ""], ["Measuring a plant", ""]], ["g401", "g402", "g403", "g404"], "momo");

/* 5 · Round 1: EP14's dare (a short 3 s ring). The three mango boards on the cards; the clue labels one big seed · we plant it ON TOP of the
   ring through the countdown; the ring's picture: the big flat seed on a saucer (ringPH: Stage 2 draws it). No x chip yet: the look-closer decides */
SC.r1card = (t, s) => roundCard(t, s, "ROUND 1", "YOUR ANSWER FROM LAST TIME");
SC.r1 = (t, s) => lockN(t, { cards: DARE_CARDS, clues: DARE_CLUES.map((c, i) => [c, W(L1, "mango") + .15 * i]), lead: "basil", csize: 34, q: DARE_LABEL, tq: W(L1, "what") - .1,
  tc: [W(L1, "what"), W(L1, "seed"), W(L1, "show")], ring0: MK("ring0_r1"), dur: 3, lock: "g502",
  pics: [0, 1, 2].map((i) => dareBoard(i, 0, 108, .6, { lab: false, id: "r1i" })),
  obj: ringPH("the big flat mango seed on a saucer"),
  picks: [{ who: "momo", id: "g503", word: "1" }, { who: "pip", id: "g504", word: "2" }, { who: "basil", id: "g505", word: "3" }],
  react: [[LE("g503") + .1, "momo", "pointing"], [LE("g504") + .1, "pip", "thinking"], [LE("g505") + .1, "basil", "cheer"]] });

/* 6 · how will we know? the corridor; an adult's hands plant the seed in a pot of soil on the ledge (potin, soilpat), a little water (water) */
SC.plant = ph("6 · \"How will we ever know?\": we plant the seed (the corridor)", "The HDB corridor outside the flat, morning sun on the ledge of potted plants. Momo big at the left asks (thinking); MK potin: an adult's hands press the seed into a pot of soil; MK soilpat: they pat the soil; MK water: a little water from a small can. Basil and Pip lean in at the right. The snail on a neighbour's pot (new spot).");

/* 7 · [LOOK CLOSER] observing like a scientist (OBSERVING pops inside, lib.js o.at). Wired: the day pill, the small print */
SC.lcobserve = (t, s) => lcPH(t, s, { title: "Observing like a scientist: Day 1 in our journal", v: "v_observe", verdict: [`OBSERVE AGAIN AND AGAIN`, GOODC], fx: 1100, fy: 620,
  beats: [["journal", "the journal opens at Day 1"], ["look", "LOOK lights (an eye): brown, big and flat"], ["touch", "TOUCH lights (a hand): hard, a little hairy"], ["smell", "SMELL lights (a nose): mango!"], ["write", "the pencil writes Day 1's line"], ["kw_observing", "OBSERVING pops"], ["v_observe", "verdict"]],
  notes: ["The panel: LEFT half the real seed big on its saucer beside the pot, a buddy's paw / an adult's hand doing each sense; RIGHT half the journal page, LARGE (about half the panel): Day 1, a small drawing of the seed, three lines that fill as each sense is used (look: brown, big and flat · touch: hard, a little hairy · smell: like mango). The sense icons (eye, hand, nose) light ON their marks, each joined to its journal line by a plain line.",
    "Momo's wrong idea first (look once now, once when it is a tree): a quick picture of only two pages, Day 1 and 'a big tree', with a big gap between them and a ? in the gap; Pip's line fills the gap with many small pages. The speaking buddy's FACE peeks in from a lower corner."],
  over: (tt) => smallPrint(tt, s.t0 + 1.0, TASTE_RULE) + stepPill(tt, [["journal", "Day 1"]], 390, 905) });
SC.mark1 = (t, s) => markScene(t, s, { id: "g702", sayId: "g701", who: "basil", n: "1 of 2", text: "We can use our five senses to gather information about the life cycles of plants.", keys: ["five", "senses", "gather", "information", "life", "cycles", "plants"], size: 62, y: 240, footer: FOOT });

/* 9 · [LOOK CLOSER] the seed, day after day, through a window in the pot (speeded up). SEED pops inside. Wired: the day pill, speeded up */
SC.lcseed = (t, s) => lcPH(t, s, { title: "The seed, day after day (a window in the pot · speeded up)", v: "v_seed", verdict: [`A YOUNG PLANT COMES FIRST`, GOODC], fx: 900, fy: 700,
  beats: [["d1", "Day 1: the seed in the soil, seen through the window"], ["kw_seed", "SEED pops"], ["d10", "Day 10"], ["root", "the root pokes out FIRST and grows DOWN"], ["d20", "Day 20"], ["shoot", "a hooked shoot pushes UP to the light"], ["d30", "Day 30"], ["leaves", "two RED leaves open above the soil"], ["d45", "Day 45"], ["green", "the leaves turn green"], ["oldseed", "label: the old seed, still at the bottom of the stem"], ["v_seed", "verdict"]],
  notes: ["The pot fills the panel: a clear window in its side shows the soil in section (crumbs, a stone, a worm-free clean soil), the big flat seed lying in it. Above the soil line: the corridor's morning light. A plain label line to each part as it is named (seed · root · shoot · leaves · the old seed).",
    "Time-lapse, ONE continuous shot, the day pill on its marks, tag speeded up: the root first and down (roots grow DOWN), then the shoot bent like a hook, straightening into the light; two soft RED leaves open and droop a little (true of mango), then turn green; a few leaves, a thin stem, NO flower, NO fruit. The buddy's face peeks in (Basil, Pip, Momo in turn: surprised at the root, pointing at the shoot, worried at the red leaves, relieved at green)."],
  over: (tt) => stepPill(tt, DAYS, 390, 905) + slowTag(tt, MK("d1"), 1660, 905) });
SC.seedans = ph("9 · The answer is three: a young plant (YOUNG PLANT pops)", "The corridor, the pot on the ledge with its young plant (Day 45: thin stem, a few green leaves). EP14's three mango boards small at the top: board 3 gets the green tick at ansglow, small x chips on boards 1 and 2 and by Momo and Pip; the coin at coin1. YOUNG PLANT pops on Heart's term (lib.js o.at). Basil big at the right (confident, then explains); Momo oops (shy) and her line; Pip shy then nods.");
/* 10 · BE THE MANGO SEED (the journey; the buddies ride along, shrunk: common.js riders) */
SC.waitw = ph("10 · Be the mango seed! (the glide in)", "Pill Be the mango seed! The camera glides to the pot and down into the soil; a soft dark wipe at the end. The buddies wave the viewer off, then shrink and come along. The shelf slides aside.");
SC.shrink = (t, s) => phScene(t, s, "10 · BE THE MANGO SEED (first person, present tense)", ["MK jseed: dark, cool soil all round, crumbs big as rocks; YOU are the seed (a You: a mango seed tag top left, the viewer's own curved seed-coat edge at the bottom of the frame). MK jswell: you swell; MK jroot: a tiny root pushes out of you and grows DOWN. MK jshoot: a shoot pushes up, up, up through the soil; MK jlight: into the light (the corridor's morning, huge). MK jleaves: your first leaves open, soft and red; MK jyoung: you are a young plant (tag).",
  "The three buddies ride along, shrunk, on a soil crumb at the bottom edge (riders): Momo surprised at the root, Basil cheer at the light, Pip pointing at the leaves; never covering the view. Calm pad, Heart soft. Full staging: SCENES_TODO.md."])
  + youTag(t, MK("jseed"), "You: a mango seed") + feelTag(t, MK("jroot"), MK("jshoot") - .1, "the root grows down", 160) + feelTag(t, MK("jshoot") + .2, MK("jleaves") - .1, "the shoot grows up", 160) + feelTag(t, MK("jyoung"), MK("jyoung") + 3, "a young plant", 160)
  + riders(t, s, { tin: MK("jseed") + .6 });
SC.pullout = ph("11 · Pull back out to the corridor", "Whoosh up out of the soil, back to the corridor: the young plant in its pot (0.6 s). The buddies pop back to full size.");
SC.mark2 = (t, s) => markScene(t, s, { id: "g1002", sayId: "g1001", who: "momo", n: "2 of 2", text: "The seed grew into a young plant.", keys: ["seed", "young", "plant"], size: 76, y: 260, footer: FOOT });

/* 12 · measuring: Pip's ruler; the book's strip (4.3, second sentence: Heart reads it; cream, dark text, >= 3.5 s). WIRED strip */
SC.measure = ph("12 · \"Let's measure it with a ruler!\" (the corridor, weeks later)", "The young plant a little taller (a week pill Week 4). MK rulerin: Pip carries in a 30 cm ruler (school ruler, clear, black marks), big at the left. Basil and Momo lean in.");
SC.strip = (t, s) => bg("stage2") + lcStrip(t, "g1102", "We can use simple tools, such as a ruler, to help us measure the height of plants.") + T(960, 700, "(Stage 2: the young plant in its pot with the ruler standing beside it, zero on the soil, under the strip)", 26, "#fff", { w: 500 }) + HUD(t);
/* 13 · HOLD ON! Basil measures from the table (Stage 2: model ep14/p1.js SC.holdon: the HOLD ON! stamp, the YOU ring with crossed arms (5 s),
   the clue labels from the table · 20 cm ON TOP of the ring, the bell, the coin; then the fix: zero on the soil, 12 cm) */
SC.holdon = ph("13 · HOLD ON! Basil measures from the table", "The pot on the corridor's small table. MK rtable: Basil stands the ruler on the TABLE under the pot; MK r20: its top reads 20 cm at the leaf tip (label 20 cm?). The HOLD ON! stamp; the YOU ring (5 s, crossed arms) with the clue labels the ruler starts at the table · 20 cm? on top of the ring. MK rzero / rsoil: Pip slides the ruler down into the pot so its ZERO sits on the soil where the stem comes out; MK r12: 12 cm (a green tick). Basil oops (shy), then a proud pose on 'handsome'.");
/* 14 · score hand, the snail (lizReveal: the score hand melts into the corridor, ONE push-in onto the snail on the rim of our pot; Pip's fun
   fact panel: a snail's tongue with rows of tiny teeth (ff_teeth), a soft young leaf with a scraped edge (ff_leaf)) */
SC.final = (t, s) => { const L = "g1301"; return finalScene(t, s, L, 0, [[s.t0, null, 1], [W(L, "two") - .1, null, 2]]); };
SC.liz = (t, s) => { const L = "g1302", tq = W(L, "it") - .1;
  return lizReveal(t, s, L, corridorPH(t), SNAIL[0], SNAIL[1], tq, "It was on the rim of our plant pot!", -120, 160, 80, 1.9, { from: () => SC.final(SCN.final.t1 - .04, SCN.final), tell: "g1304",
    fact: { id: "g1303", at: [1300, 560], w: 900, h: 420, items: [["ff_teeth", "thousands of tiny teeth", "DRAW: a snail's tongue, close up, rows of tiny teeth"], ["ff_leaf", "it scrapes soft young leaves", "DRAW: a young leaf with a scraped edge, the snail beside it"]] } }) + smallPrint(t, s.t0 + .5, SNAIL_RULE); };
/* 15 · the cliffhanger: Momo big (thinking); our young plant (no flowers, no mangoes) and a big ?; the old mango tree downstairs slides in
   small through the corridor parapet (treein); PART 2 slams in */
SC.cliff = (t, s) => { const tP = W("g1503", "part") - .1; return phScene(t, s, "15 · Will it ever grow mangoes?", ["The corridor: Momo big at the left (thinking) beside our young plant (thin stem, a few leaves, NO flowers, NO mangoes; a ? pops at q). MK treein: the camera tilts over the parapet to the old mango tree in the garden below, full of tiny flowers and a few mangoes. Full staging: SCENES_TODO.md."])
  + (t >= tP ? slamFit(330, "PART 2", P.sun, slamK(t - tP, 0)) : "") + HUD(t); };
/* 16 · "Now you know!": the young plant in its pot, centred between the buddies (Stage 2: draw it; a placeholder card now) */
SC.nyk = (t, s) => nykScene(t, s, TF(960, 900, 1, `<rect x="-200" y="-180" width="400" height="300" rx="30" fill="#FFF8EA" opacity=".9"/>` + T(0, -20, "our young plant", 40, P.ink) + T(0, 30, "(Stage 2)", 26, P.ink, { w: 500 })), { bx: [200, 1715, 1375], hx: 470 });
})(); }
