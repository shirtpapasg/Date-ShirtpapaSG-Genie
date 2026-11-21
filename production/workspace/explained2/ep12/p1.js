// p1.js: PART 1, "A GLASS Trolley? Why Supermarket Trolleys Are Made of METAL": objects and purposes, properties decide uses, EP11's dare answered.
// Segments 1-15 of p3_ep12_script.md (version 1, 21 Nov 2026; the teacher's go-ahead in its section 12).
// STAGE 1 (setup): the shared routines are wired (the calm recap of EP11's dare with EP11's own three trolley boards and cards, the title slam,
// game, goals read by Momo, countdown, Mark Sentences read by Pip / Basil, Round 1's lock-in with its two clue labels on top of the ring and the
// trolley boards on the cards, the book's strip with EP9's real drop-box picture, the boards' job tags, the HOLD ON! ring with its picture and
// three clue labels on top of the ring, the board MATCH THE JOB as a functional placeholder, the LOOK-CLOSER frame, score hand, read-along,
// "Now you know!"); every scene with new art is a phScene placeholder (and each [LOOK CLOSER] an lcPH placeholder inside the real frame).
// STAGE 2 (Fable) draws them: see SCENES_TODO.md.
if (PART === 1) { (() => {
const L1 = "g701";
// the scores (script section 3): Round 1 1 : 0, HOLD ON! 2 : 0 (the buddies score nothing in this part)
SCORE.push([W("g809", "one") - .1, 1, 0]);
SCORE.push([W("g1003", "one") - .1, 2, 0]);
const FOOT = "P3 · Diversity of Materials · Choosing materials";
const stageNote = (txt, y = 1000) => T(960, y, "(Stage 2: " + txt + ")", 24, "#fff", { w: 500 });
const DARE = [["trGlass", "glass"], ["trMetal", "metal"], ["trFabric", "fabric"]];
// EP11's dare board (ep11dare.js, EP11's own art); origin = the board's centre
const dareBoard = (i, x, y, sc, o = {}) => picBoard(DARE[i][0], x, y, 1, { sc, lab: o.lab === false ? undefined : DARE[i][1], size: 44, id: "p1d" + i + (o.id || "") });
// the job tags that land on the three boards in segment 8 (blue on glass at badglass, green on metal at goodtag, blue on fabric at badfabric)
const boardTag = (t, i, x, y, size = 26) => { const t0 = MK(["badglass", "goodtag", "badfabric"][i]); return t < t0 ? "" : TF(x, y - 60 * (1 - eo((t - t0) / .25)), spring(t, t0, .45), jobTag(t, i === 1 ? 0 : 1, size)); };
const boardChip = (t, i, x, y, size = 24) => { const t0 = MK(["ep9", "goodtag", "fold"][i]) + (i === 0 ? 1.2 : .2); return chipAt(t, t0, x, y, ["FRAGILE", "STRONG", "FLEXIBLE"][i], size); };
const qMark = (t, t0, x, y, r = 50) => t < t0 ? "" : TF(x, y, spring(t, t0, .5) * (1 + .05 * Math.sin(t * 4)), `<g filter="url(#dropS)"><circle r="${r}" fill="url(#gSun)"/></g>${T(0, r * .52, "?", r * 1.56, P.ink)}`);

/* 1 · silent cold open: the covered walkway in front of a neighbourhood supermarket (the boards slide in low: EP11's real art, WIRED) */
const CBX = [620, 960, 1300];
SC.cold = (t, s) => phScene(t, s, "1 · Cold open: a neighbourhood supermarket, mid-morning (no voice)", ["The covered walkway at the foot of an HDB block, bright: the open front of the supermarket (plain sign SUPERMARKET), sacks of rice and crates of drinks by the door, the trolley bay with its sign TROLLEYS on a post (the little MYNAH on top of the sign: every wide shot of the walkway), the aquarium shop next door with its tanks; pillars, floor tiles, a letterbox row, greenery. One empty trolley out in front, on its own.",
  "MK boardsIn: EP11's three dare boards slide in low with dust puffs and stand behind the trolley (wired below with the real boards; Stage 2 places them in the drawn walkway). MK budsIn: Pip, Basil (cheer), Momo pop in. Pill: A neighbourhood supermarket, Singapore. Small print upper left (trolleyRule, wired). No title."])
  + [0, 1, 2].map((i) => { const t0 = MK("boardsIn") + i * .3; if (t < t0) return ""; const [x, d] = slideX(t, t0, .7, 2500, CBX[i], 990); return d + dareBoard(i, x, 900, .5, { lab: false, id: "c" }); }).join("") + trolleyRule(t, .7);

/* 2 · "Last time...": EP11's dare, word for word. ONE calm picture: EP11's three boards side by side, centred and large, a gentle push-in,
   the big ? above them, EP11's three cards under them; as Heart says each card its board steps forward and its card lights (>= 2.5 s each). WIRED */
SC.lasttime = (t, s) => { const L = "g202", tc = [W(L, "one"), W(L, "two"), W(L, "three")], z = 1 + .04 * eio((t - s.t0) / 8), k = ramp(t, s.t0 + .05, .5), cur = tc.filter((x) => t >= x - .15).length - 1;
  let boards = ""; [0, 1, 2].forEach((i) => { const fw = cur === i ? ss(tc[i] - .15, tc[i] + .25, t) : (cur > i ? 1 - ss(tc[i + 1] - .15, tc[i + 1] + .25, t) : 0);
    boards += dareBoard(i, 560 + i * 400, 600 + 14 * (1 - spring(t, s.t0 + .2 + i * .15, .45)), .95 * (1 + .1 * fw), { id: "lt" }); });
  return bg("stage2") + OP(ramp(t, s.t0, .3), T(960, 110, "Last time…", 60, "#fff", { w: 600 }))
    + OP(k, `<g transform="translate(960 540) scale(${n2(z)}) translate(-960 -540)">${boards}</g>`
      + qMark(t, W(L, "which") - .1, 960, 240)
      + DARE_CARDS.map((c, i) => TF(560 + i * 400, 880, .5 * spring(t, tc[i] - .1, .45), ansCard(i + 1, c, { w: 430, h: 290, size: 58, pulse: cur === i ? .9 : pulse(t, tc[i], .04, .9) }))).join("")   /* each card lights as Heart says it (no tick: the answer is Round 1's) */
      + TF(960, 1010, spring(t, W(L, "which") - .1, .4), tpill(0, 0, DARE_LABEL, 40, P.sun, P.ink, { w: 700 }))) + HUD(t); };
SC.board = (t, s) => phScene(t, s, "2 · Back on the walkway: the board MATCH THE JOB", ["MK boardIn: the board MATCH THE JOB slides in low and stands centred between the discs: OBJECT · PURPOSE · MATERIAL · PROPERTY, all rows empty (placeholder below: matchBoard() in tests.js, functional; redraw it on its low stand). Pill: Hold on to your answer!"])
  + TF(1500, 1060, .42, matchBoard(t)) + (t >= LT("g203") - .1 ? TF(560, 980, spring(t, LT("g203") - .1, .4), tpill(0, 0, "Hold on to your answer!", 40, P.sun, P.ink, { w: 700 })) : "") + trolleyRule(t);
// the title slam over the dimmed walkway (WIRED; Stage 2's drawn walkway shows through): A TROLLEY (white) then MADE OF GLASS?! (sun yellow).
// The second slam is the first thing to cut if Part 1 runs long (script section 6, CUTS "title2": a picture beat only).
const slamFit = (y, txt, col, k) => slamLine(y, txt, Math.min(170, 170 * 1720 / tw(txt, 170, 700, "Fredoka", 4)), col, k);
SC.title = (t, s) => { const u = t - MK("title"), dim = clamp(u / .2); return lcSet(t, s, "board") + `<rect width="1920" height="1080" fill="${P.night}" opacity="${n2(.78 * dim)}"/>`
  + slamFit(400, "A TROLLEY", "#fff", slamK(u, .05)) + slamFit(610, "MADE OF GLASS?!", P.sun, slamK(u, .55)) + HUD(t); };

/* 3 · the game, and the hidden mynah; 4 · goals (Momo reads) and the countdown (count is in common.js) */
SC.game = (t, s) => gameScene(t, s, "g301", true);
SC.goals = (t, s) => goals3(t, s, [["Objects have purposes", ""], ["Properties decide uses", ""], ["Why a trolley is metal", ""]], ["g401", "g402", "g403", "g404"], "momo");

/* 5 · what is a trolley for? The OBJECT column glows, the trolley's tile hops low onto the first row (row1o); [LOOK CLOSER] a trolley doing its job */
SC.trolley = (t, s) => phScene(t, s, "5 · What is a trolley for?", ["The real trolley out in front on the walkway, empty (a metal wire basket on a metal frame, four small wheels, a push handle with a plain plastic grip, the fold-down flap). The board's OBJECT column glows and a small tile of the trolley hops low onto its first row (MK row1o; matchBoard below, functional). The camera starts to move in on \"Look closer\" (the set the look-closer zooms in from)."])
  + TF(1500, 1060, .42, matchBoard(t, { col: 0 })) + trolleyRule(t);
SC.lcjob = (t, s) => lcPH(t, s, { title: "A trolley doing its job: loaded, then pushed", v: "v_job", verdict: VSTYLE("ITS PURPOSE: TO CARRY HEAVY GROCERIES", "sun"), fx: 960, fy: 600,
  beats: [["rice", "the sack of rice goes in"], ["bottles", "four big bottles"], ["tins", "tins, one by one"], ["push", "a hand pushes: it rolls"], ["stop", "it stops"], ["kw_purpose", "PURPOSE pops"], ["v_job", "verdict"]],
  notes: ["The trolley fills most of the window; the walkway dims and blurs. MK rice: an adult's hands lower the sack RICE 10 kg into the basket; the trolley dips a little on its wheels and settles (a soft heavy whump). MK bottles: four big bottles (clinks). MK tins: tins, one by one (taps).",
    "Plain label lines: basket: holds the groceries · handle: to push · wheels: roll. Hold. MK push: one hand takes the handle and pushes: the wheels turn, the whole load rolls smoothly across the frame; MK stop: it stops (the wheels' rattle between).",
    "PURPOSE pops large at the upper right on Heart's \"purpose\" (wired, lib.js KW) and flies to the shelf. Verdict ITS PURPOSE: TO CARRY HEAVY GROCERIES (sun-yellow letters on cream, not an answer colour) at v_job. No buddy, no score, no mynah in the window."] });

/* 6 · Mark Sentence 1 (Pip): 3.24; the trolley's row gets its purpose (row1p); the towel, the scissors, the raincoat (things: cuttable line) */
SC.mark1 = (t, s) => markScene(t, s, { id: "g602", sayId: "g601", who: "pip", n: "1 of 2", text: "Materials are used to make objects. Objects are things you use for different purposes.", keys: ["materials", "objects", "purposes."], size: 62, y: 250, footer: FOOT,
  extra: TF(1690, 1066, .28, matchBoard(t, { row: t >= MK("row1p") - .2 ? 0 : -1 })) + stageNote("under the card: the loaded trolley", 1040) });
const THINGS = [["towel", "a bath towel", "absorbs water", "fabric"], ["scissors", "scissors (closed, in their pack)", "cut", "metal"], ["raincoat", "a folded raincoat", "keeps you dry in the rain", "plastic"]];
SC.things = (t, s) => phScene(t, s, "6 · Each has its own purpose", ["A shopping basket slides in low beside the trolley; an adult's hands lift three things out of it and stand them in a row on the ground, each lifting a little with its two tags as Heart names it (tags wired below at MK towel / scissors / raincoat): a bath towel, a pair of scissors (closed, in its card pack; only an adult's hands touch them), a folded raincoat. (g603 cuttable: then the three things and their tags show in silence.)"])
  + THINGS.map(([mk, what, job, mat], i) => { const t0 = MK(mk); if (t < t0) return ""; const x = 480 + i * 480, k = spring(t, t0, .45);
    return TF(x, 700, k, `<rect x="-120" y="-60" width="240" height="120" rx="20" fill="#fff" opacity=".85"/>${T(0, 10, what.split(" (")[0], 30, P.ink)}`) + TF(x, 610, spring(t, t0 + .2, .4), tpill(0, 0, job, 28, "#fff", P.ink, { w: 700 })) + TF(x, 790, spring(t, t0 + .35, .4), tpill(0, 0, mat, 28, P.ink, "#fff", { w: 700 })); }).join("") + trolleyRule(t);

/* 7 · Round 1: the dare from EP11 (a short 3 s ring). In the ring: the loaded trolley (ringPH: Stage 2 draws it); clue labels for heavy groceries
   · gets knocked on top of the ring frame, kept through the countdown (lockN c.labels); EP11's boards small on the three cards (real art) */
SC.r1card = (t, s) => roundCard(t, s, "ROUND 1", "YOUR ANSWER FROM LAST TIME");
const r1labels = (t) => { const tq = W(L1, "glass") - .1; return t < tq ? "" : ["for heavy groceries", "gets knocked"].map((l, i) => TF(430 + (i ? 130 : -140), 470 - RING_R - 14 - (i ? 0 : 46), spring(t, tq + i * .15, .4), tpill(0, 0, l, 30, "#fff", P.ink, { w: 700 }))).join(""); };
SC.r1 = (t, s) => lockN(t, { cards: DARE_CARDS, labels: r1labels, q: DARE_LABEL, tq: W(L1, "glass") - .1, tc: [W(L1, "glass"), W(L1, "metal"), W(L1, "fabric")], ring0: MK("ring0_r1"), dur: 3, lock: "g702",
  icons: [0, 1, 2].map((i) => dareBoard(i, 0, 0, .36, { lab: false, id: "r1i" })),
  obj: ringPH("the loaded trolley"), over: (tt) => qMark(tt, W(L1, "glass") - .1, 1262, 210, 40),
  picks: [{ who: "pip", id: "g704", word: "3", x: true }, { who: "basil", id: "g703", word: "1", x: true }, { who: "momo", id: "g705", word: "2" }],
  react: [[LE("g703") + .1, "basil", "cheer"], [LE("g704") + .1, "pip", "thinking"], [LE("g705") + .1, "momo", "pointing"]] });

/* 8 · [LOOK CLOSER] the loaded metal trolley: the bottom bars stay straight (a guide line, before / after); the knock in the trolley bay; METAL: STRONG */
SC.lcmetal = (t, s) => lcPH(t, s, { title: "The loaded metal trolley: straight bars; a hard knock, no crack", v: "v_metal", verdict: [`METAL: <tspan fill="#fff">STRONG</tspan>`, GOODC, { plain: "METAL: STRONG" }], fx: 960, fy: 620,
  setNote: "the walkway: the loaded metal trolley out in front, the trolley bay beyond (the look-closer zooms in from here)",
  beats: [["bars", "before / after: the bottom bars"], ["line", "the guide line: still straight"], ["pullbk", "pull back: the trolley and the bay"], ["clang", "CLANG: the knock"], ["slowmo", "slow motion"], ["closeup", "close-up: smooth, whole"], ["v_metal", "verdict"], ["goodtag", "RIGHT FOR THE JOB on the metal board"]],
  notes: ["The camera pushes in down through the side of the basket to the bottom bars under the sack; the walkway dims. MK bars: before and after side by side: left a held picture of the same bars with the basket empty, right the bars now with the sack on them. MK line: a plain straight guide line beside the bars in both: they lie along it both times. Labels metal bars · still straight. The word \"rigid\" is never used.",
    "MK pullbk: the camera pulls back to hold the whole trolley and the trolley bay. MK clang (on Heart's \"Clang!\"): an adult's hand has pushed it at walking pace into the back of the last trolley in the bay: a clang, a small bounce back, the bottles rattle. MK slowmo: tag slow motion (slowTag, closer.js): the knock once more, slowly. MK closeup: where metal met metal: smooth, whole; labels a hard knock · no crack · no break.",
    "Verdict METAL: STRONG (green, with EP9's chip STRONG) at v_metal; MK goodtag: the green tag RIGHT FOR THE JOB lands on EP11's metal dare board (jobTag, tests.js). No dent, no crack, no sparks; no buddy in or on the trolley."] });

/* 8b · glass: EP9's drop box (a held picture, REAL art: ep09drop.js), the book's strip 3.13a, FRAGILE / STRONG; the blue tag on the glass board. WIRED */
SC.glass = (t, s) => { const L = "g805", t0 = MK("ep9"), fw = ss(t0, t0 + .5, t), tb = MK("badglass"), hb = HAS("g806");
  return bg("stage2") + stageNote("the walkway behind, dimmed (the drawn set from lcmetal)", 1060)
    + dareBoard(0, 330, 640 - 30 * fw, .8 * (1 + .12 * fw), { id: "gl" }) + boardTag(t, 0, 330, 830, 28) + chipAt(t, W(L, "fragile") + .1, 330, 420, "FRAGILE", 30)
    + OP(ramp(t, t0 + .2, .4), TF(1000, 690, 1, `<g filter="url(#drop)"><rect x="-330" y="-250" width="660" height="430" rx="24" fill="#FFF8EA" stroke="#E3C9A8" stroke-width="6"/></g><clipPath id="g9c"><rect x="-310" y="-230" width="620" height="390" rx="16"/></clipPath><g clip-path="url(#g9c)"><rect x="-310" y="-230" width="620" height="390" fill="#F4EDE1"/>${TF(0, 120, .9, ep9DropPic({ lab: false }))}</g>`)
      + TF(1000, 418, 1, tpill(0, 0, "from Episode 9", 28, P.ink, "#fff", { w: 600 })) + chipAt(t, W(L, "fragile") + .1, 1150, 520, "FRAGILE", 28) + chipAt(t, W(L, "strong") + .1, 850, 520, "STRONG", 28))
    + bookCaption(t, L, "Glass is fragile, but metal is strong.", 268, { size: 50, keys: ["fragile,", "strong."] }) + bookCaption(t, L, "A glass cup breaks easily when it is dropped, but a metal cup does not.", 358, { size: 46, off: 7, keys: ["breaks", "easily"] })
    + buddy("basil", 1660, 1060, 300, t, { aura: true, flip: true, in: s.t0 + .1, poses: [[s.t0, "sit"], [hb ? LT("g806") - .12 : tb, "oops"], [hb ? LE("g806") + .4 : tb + 2, "sit"]], nohop: true })
    + (hb ? say("g806", 1500, 640, t, { size: 42, tail: 120, maxW: 440 }) : "") + trolleyRule(t) + HUD(t); };
/* 8c · fabric: Pip's own bag holds the rice, but folds flat ({CARD3_SHOT}); FLEXIBLE; the blue tag on the fabric board */
SC.fabric = (t, s) => phScene(t, s, "8 · And fabric? Pip's own shopping bag", ["Pip's plain cotton shopping bag (two handles) stands on the ground by the trolley. MK bagin: an adult's hands lower a small bag of rice into it; MK baglift: they lift the bag by its handles: it holds, no tear (tag holds the rice, wired). MK bagdown: they set it down and let go; MK fold: its sides fold over and it lies flat on the rice (tag bends and folds, wired). EP9's chip FLEXIBLE lands by the bag (wired).",
  "MK badfabric: the blue tag NOT FOR THIS JOB lands on EP11's fabric dare board (wired, right). Pip big in his disc: surprised pose, then a nod (g808)."])
  + (t >= MK("baglift") ? TF(560, 700, spring(t, MK("baglift"), .4), tpill(0, 0, "holds the rice", 32, "#fff", P.ink, { w: 700 })) : "") + (t >= MK("fold") ? TF(960, 700, spring(t, MK("fold"), .4), tpill(0, 0, "bends and folds", 32, "#fff", P.ink, { w: 700 })) : "")
  + chipAt(t, MK("fold") + .3, 960, 620, "FLEXIBLE", 32) + dareBoard(2, 1460, 640, .55, { lab: false, id: "fb" }) + boardTag(t, 2, 1460, 760, 24)
  + buddy("pip", 260, 1060, 260, t, { aura: true, in: s.t0 + .1, poses: [[s.t0, "sit"], [MK("fold") + .2, "surprised"], [LT("g808") - .12, "sit"]], jump: [[LE("g808") + .1, 20]] }) + say("g808", 420, 560, t, { size: 40, tail: -120, maxW: 440 });
/* 8d · the answer is two: metal. EP11's boards with their tags; card 2 glows; coin; the board's first row is completed (row1m). WIRED */
SC.metalans = (t, s) => { const L = "g809", tA = W(L, "two") - .1, tOne = W(L, "one") - .1;
  return bg("stage2") + [0, 1, 2].map((i) => dareBoard(i, 560 + i * 400, 470, .62, { id: "ma" }) + boardTag(t, i, 560 + i * 400, 600, 24)).join("")
    + DARE_CARDS.map((c, i) => TF(560 + i * 400, 830, .42 * spring(t, s.t0 + .1 + i * .08, .4), ansCard(i + 1, c, { w: 430, h: 290, size: 58, lit: i === 1 && t >= tA ? spring(t, tA, .45) : 0 }))).join("")
    + coin(t, tOne, 1680, 300, "+1", "if you showed two fingers") + TF(1720, 1066, .26, matchBoard(t)) + HUD(t); };

/* 9 · Mark Sentence 2 (Basil): 3.25; PHYSICAL PROPERTIES pops after the first sentence (lib.js o.at); under the card: the three boards with tags and chips */
SC.mark2 = (t, s) => markScene(t, s, { id: "g902", sayId: "g901", who: "basil", n: "2 of 2", text: "Every material has physical properties. The physical properties of a material allow it to be used in certain ways.", keys: ["physical", "properties.", "properties", "allow", "it", "to", "be", "used", "in", "certain", "ways."], size: 60, y: 230, footer: FOOT,
  under: [0, 1, 2].map((i) => { const x = 760 + i * 230; return dareBoard(i, x, 985, .38, { lab: false, id: "m2" }) + TF(x, 892, 1, jobTag(t, i === 1 ? 0 : 1, 16)) + TF(x, 1040, 1, propChip(["FRAGILE", "STRONG", "FLEXIBLE"][i], 18)); }).join("") });

/* 10 · HOLD ON! Momo: "So glass is a bad material!" WIRED (model: EP11 SC.holdon): the glass card slides away (slideout), the HOLD ON! stamp, the
   YOU ring with crossed arms (5 s), the glass card in the ring, three clue labels ON TOP of the ring frame through the countdown and Heart's rule,
   the bell, the coin. Stage 2 draws the walkway behind (dimmed). */
const RG = [1240, 520], RR = 150;
SC.holdon = (t, s) => { const a = "g1001", b = "g1002", c = "g1003", r0 = MK("ring0_hold"), bell = MK("bell_hold"), rs = ringState(t, r0, 5), tX = W(b, "cross") - .15, tH = W(b, "hold") - .1, tOne = W(c, "one") - .1, ring = t >= tX && t < LE(c) + .4;
  const out = eio((t - MK("slideout") - .3) / 1.2), pic = TF(RG[0], RG[1] + 6, .36, ansCard(1, "Glass", { w: 286, h: 380, size: 52 }));
  const labels = ["glass: fragile", "bad for a trolley", "bad for everything?"].map((l, i) => TF(RG[0] + (i - 1) * 190, RG[1] - RR - 34 - (i === 1 ? 50 : 0), spring(t, tX + .2 + i * .15, .4), tpill(0, 0, l, 26, "#fff", P.ink, { w: 700 }))).join("");
  return bg("stage2") + stageNote("the walkway behind, dimmed; the three cards on the ground, 1 Glass sliding away low to the edge", 160)
    + (ring ? "" : TF(lerp(760, 1700, out), 900, .42, ansCard(1, "Glass", { w: 286, h: 380, size: 52 })))
    + buddy("momo", 330, 1060, 300, t, { aura: true, in: s.t0 + .1, poses: [[s.t0, "cheer"], [LE(a) + .3, "sit"], [W(c, "glass") - .12, "surprised"], [LE(c) + .1, "sit"]], nohop: true })
    + say(a, 560, 300, t, { size: 42, tail: -200, maxW: 640 })
    + (ring ? OP(1 - ss(LE(c) + .1, LE(c) + .4, t), TF(RG[0], RG[1], spring(t, tX, .4), `<g transform="translate(${-RG[0]} ${-RG[1]})">${ringTimer(RG[0], RG[1], t < r0 ? 1 : t < bell ? rs.frac : 0, t < r0 ? 5 : t < bell ? rs.secs : 0, t, { R: RR, sw: 24, tick: rs.tick, shut: pulse(t, bell, .01, .6), inner: pic + (t < bell + .3 ? OP(.85, TF(RG[0], RG[1] + 40, .38, crossedArms())) : "") })}</g>`)
      + labels + youPill(RG[0] - 250, RG[1] + 120, 1.0) + tpill(RG[0], RG[1] + RR + 60, "cross your arms", 30, P.ink, "#fff")) : "")
    + (t >= W(c, "glass") - .1 ? TF(960, 960, spring(t, W(c, "glass") - .1, .4), tpill(0, 0, "Glass is not a bad material. It depends on the use.", 38, P.sun, P.ink, { w: 700 })) : "")
    + stamp(t, tH, 900, 420, "HOLD ON!") + bellIcon(t, r0) + coin(t, tOne, 1680, 860, "+1", "arms crossed") + trolleyRule(t) + HUD(t); };
SC.fishnext = (t, s) => phScene(t, s, "10 · Basil: \"The fish tank next door is glass!\"", ["Basil big in his disc (surprised pose, then sit). MK turn: the camera turns a little towards the aquarium shop next door (its tanks on stands in the open front). MK slideback: the glass card slides back low to its place with the other two (a slide back, a boing)."])
  + buddy("basil", 1660, 1060, 280, t, { aura: true, flip: true, in: s.t0 + .1, poses: [[s.t0, "surprised"], [LT("g1004") + .6, "sit"]] }) + say("g1004", 1450, 600, t, { size: 40, tail: 120, maxW: 480 }) + trolleyRule(t);

/* 11 · [LOOK CLOSER] a glass fish tank: every fish seen clearly (TRANSPARENT), the shelf under it dry (WATERPROOF) */
SC.lctank = (t, s) => lcPH(t, s, { title: "A glass fish tank: every fish seen clearly; the shelf under it dry", v: "v_tank", verdict: [`GLASS: TRANSPARENT AND WATERPROOF`, GOODC], fx: 1300, fy: 560,
  setNote: "the open front of the aquarium shop next door: the planted tank on its wooden stand (the look-closer zooms in from here)",
  strips: [], beats: [["lens", "a magnifier on one fish"], ["glide", "the camera glides down to the shelf"], ["dry", "the shelf: dry"], ["v_tank", "verdict"]],
  notes: ["The tank fills most of the window; the shop and the walkway dim. Clear water with a level surface, water plants, a line of small bubbles from an air stone, a lid, six small bright guppies with fan tails swimming in a slow loop, a faint glint on the glass. Small print by the tank for the whole shot: We do not tap the glass. (TANK_RULE, tests.js).",
    "MK lens: a magnifier ring holds on one fish: its fan tail, its eye, each fin, sharp; labels glass · We see every fish clearly; chip TRANSPARENT (EP11's). MK glide: the camera glides slowly down the glass to the bottom edge and the stand's shelf; MK dry: dry wood, no drip, no wet mark; labels full of water · the shelf: dry; chip WATERPROOF (EP10's).",
    "Verdict GLASS: TRANSPARENT AND WATERPROOF (green, with the two chips) at v_tank. The fish are cared for: plants, bubbles, a lid; nobody taps. The tank's soft bubbling and the pump's faint hum."] })
  + OP(ramp(t, s.t0 + 1.2, .4), smallPrint(t, s.t0 + 1.2, TANK_RULE));
SC.tankrow = (t, s) => phScene(t, s, "11 · Momo: \"The same glass. A different use!\"", ["Pull back to the walkway. MK row2: a second row fills on the board, four quick low hops: fish tank · to hold water and show the fish · glass · TRANSPARENT, WATERPROOF (matchBoard below, functional). Momo: surprised pose, then a nod (g1105; cut last of all: then the tag The same glass. A different use. shows instead)."])
  + TF(1500, 1060, .42, matchBoard(t, { row: 1 })) + buddy("momo", 300, 1060, 260, t, { aura: true, in: s.t0 + .1, poses: [[s.t0, "surprised"], [HAS("g1105") ? LT("g1105") - .12 : s.t0 + 2, "sit"]] })
  + (HAS("g1105") ? say("g1105", 470, 560, t, { size: 40, tail: -120, maxW: 480 }) : TF(560, 560, spring(t, s.t0 + .6, .4), tpill(0, 0, "The same glass. A different use.", 40, "#fff", P.ink, { w: 700 }))) + trolleyRule(t);

/* 12 · BE THE METAL (the first-person journey) */
SC.waitw = (t, s) => phScene(t, s, "12 · Be the metal! (the glide in)", ["Pill Be the metal! The camera glides back to the trolley and down into the empty basket, to one bar at the bottom; a soft cream wipe at the scene end. The shelf slides aside (SHELF_HIDE)."]);
SC.shrink = (t, s) => phScene(t, s, "12 · BE THE METAL (first person, present tense)", ["MK jbar: you look up from on top of one metal bar; the grid of bars runs away on both sides like long shining rails; the walkway's ceiling far above. Tags You: a metal bar · the bottom of the trolley. MK jrice: the underside of the sack comes down, huge; MK jthump (\"lands\"): it settles on you with a soft thump; the view dips a tiny bit and stays level; the rails beside you still straight. Tags a heavy bag of rice · you do not bend.",
  "MK jroll: between the bars the floor tiles rush past below, near and fast; the pillars slide by, far and slow. Tag rolling. MK jknock: ahead, the back of the next trolley rushes up and fills the view; MK jclang (\"Clang!\"): a flash of white; the view shakes once and is whole again. Tags a hard knock · you do not break. MK strongchip: the chip STRONG glows over the view. Calm pad; no game sounds; nothing said about why."]);

/* 13 · pull back out; the score hand, the mynah (lizReveal in common.js), the key words (kwrecap in common.js) */
SC.pullout = (t, s) => phScene(t, s, "13 · Pull back out to the walkway", ["Whoosh out of the metal's world to the walkway (0.8 s)."]);
SC.final = (t, s) => { const L = "g1301"; return finalScene(t, s, L, 0, [[s.t0, null, 1], [W(L, "two") - .1, null, 2]]); };
SC.liz = (t, s) => phScene(t, s, "13 · Did you spot the mynah? (lizReveal in common.js)", ["A replay of the wide walkway with a ring round the little mynah on top of the TROLLEYS sign; it hops, flaps once and bobs its head. Pill: Tell someone at home! Use lizReveal(t, s, \"g1302\", view, x, y, tq, \"It was on the trolley bay sign!\")."]);

/* 14 · the cliffhanger: three water bottles in the trolley (the bottles' tags WIRED on Heart's words) */
SC.cliff = (t, s) => phScene(t, s, "14 · Cliffhanger: three water bottles in our trolley", ["The trolley from above. Among the shopping, standing in a row in the fold-down flap: three water bottles of the same size and shape: clear plastic, clear glass, metal. Basil big in his disc (surprised). Each bottle lifts a little with its tag as Heart names it (MK b1, b2, b3; tags wired below). A big ? pops over the three (MK q, wired). PART 2 slams in on \"Find out in Part Two!\" (model: ep11/p1.js SC.cliff).",
  "The board (below) centred between the discs: rows 1-2 filled."])
  + ["plastic", "glass", "metal"].map((w, i) => t < MK("b" + (i + 1)) ? "" : TF(700 + i * 260, 640, spring(t, MK("b" + (i + 1)), .4), tpill(0, 0, w, 34, "#fff", P.ink, { w: 700 }))).join("") + qMark(t, MK("q"), 960, 560)
  + TF(1500, 1060, .3, matchBoard(t)) + trolleyRule(t);

/* 15 · "Now you know!": the board MATCH THE JOB (two full rows) centred in the free space between the buddies */
SC.nyk = (t, s) => nykScene(t, s, TF(920, 1040, .5, matchBoard(t)), { bx: [200, 1715, 1375], hx: 470 });
})(); }
