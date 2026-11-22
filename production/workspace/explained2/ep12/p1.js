// p1.js: PART 1, "A GLASS Trolley? Why Supermarket Trolleys Are Made of METAL": objects and purposes, properties decide uses, EP11's dare answered.
// Segments 1-15 of p3_ep12_script.md (version 1, 21 Nov 2026; the teacher's go-ahead in its section 12).
// STAGE 2 (drawn, 2026-11-22): the sets and props are in walk.js, the look-closer pictures in closer.js, the journey in shrink.js. (Stage 1 notes below.)
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
const DARE = [["trGlass", "glass"], ["trMetal", "metal"], ["trFabric", "fabric"]];
// EP11's dare board (ep11dare.js, EP11's own art); origin = the board's centre
const dareBoard = (i, x, y, sc, o = {}) => picBoard(DARE[i][0], x, y, 1, { sc, lab: o.lab === false ? undefined : DARE[i][1], size: 44, id: "p1d" + i + (o.id || "") });
// the job tags that land on the three boards in segment 8 (blue on glass at badglass, green on metal at goodtag, blue on fabric at badfabric)
const boardTag = (t, i, x, y, size = 26) => { const t0 = MK(["badglass", "goodtag", "badfabric"][i]); return t < t0 ? "" : TF(x, y - 60 * (1 - eo((t - t0) / .25)), spring(t, t0, .45), jobTag(t, i === 1 ? 0 : 1, size)); };
const boardChip = (t, i, x, y, size = 24) => { const t0 = MK(["ep9", "goodtag", "fold"][i]) + (i === 0 ? 1.2 : .2); return chipAt(t, t0, x, y, ["FRAGILE", "STRONG", "FLEXIBLE"][i], size); };
const qMark = (t, t0, x, y, r = 50) => t < t0 ? "" : TF(x, y, spring(t, t0, .5) * (1 + .05 * Math.sin(t * 4)), `<g filter="url(#dropS)"><circle r="${r}" fill="url(#gSun)"/></g>${T(0, r * .52, "?", r * 1.56, P.ink)}`);

/* the walkway (walk.js VW): the free trolley out in front, the board MATCH THE JOB, the three small discs */
const TRX = 620, TRY = 1000, BDX = 1220, BDY = 1034, BDS = .45, CAM0 = [1, 960, 540], CAMT = [1.22, 1420, 610], CREAM = "#FFF6D8";
const trol = (o = {}, x = TRX, sc = 1.2) => `<ellipse cx="${x}" cy="${TRY + 4}" rx="${n2(180 * sc)}" ry="14" fill="${P.ink}" opacity=".16" filter="url(#b4)"/>` + TF(x, TRY, sc, trolleyS(o));
const brd = (t, o, x = BDX) => TF(x, BDY, BDS, matchBoard(t, o));
const buds = (t, o = {}) => sPip(t, o.pip) + sBasil(t, o.basil) + sMomo(t, o.momo);
const V = (t, o = {}, cam) => VW(t, { ...o, items: (o.back || "") + (o.trol === false ? "" : trol(o.trol || {})) + (o.board === undefined ? "" : brd(t, o.board, o.boardX)) + (o.items || "") }, cam);

/* 1 · silent cold open: the covered walkway in front of a neighbourhood supermarket; one empty trolley; EP11's three boards slide in low */
const CBX = [960, 1200, 1440];
SC.cold = (t, s) => { const tb = MK("boardsIn"), tp = MK("budsIn");
  const boards = [0, 1, 2].map((i) => { const t0 = tb + i * .3; if (t < t0) return ""; const [x, d] = slideX(t, t0, .7, 2500, CBX[i], WFLOOR + 60); return d + dareBoard(i, x, WFLOOR - 40, .58, { lab: false, id: "c" }); }).join("");
  return V(t, { back: boards }, [1.02 + .02 * eio(t / 6), 960, 548])
    + sPip(t, { in: tp, poses: [[tp, "waving"], [tp + 1.4, "sit"]], wave: true }) + sBasil(t, { in: tp + .2, poses: [[tp + .2, "cheer"]] }) + sMomo(t, { in: tp + .4, poses: [[tp + .4, "waving"], [tp + 1.7, "sit"]], wave: true })
    + lowerPill(60, 96, "A neighbourhood supermarket,", "Singapore") + finePrint(t, .7, TROLLEY_RULE, 1180, 1010); };   // Stage 3: on the floor, bottom middle (it sat on top of the place label)

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
// back on the walkway: the board MATCH THE JOB slides in low and stands between the discs (all rows empty)
SC.board = (t, s) => { const s0 = SCN.board.t0, [bx, bd] = slideX(t, MK("boardIn") + .05, .75, 2500, BDX, BDY); return V(t, { board: {}, boardX: bx, items: bd }) + buds(t, { momo: { poses: [[s0, "sit"], [s0 + .9, "pointing"]] } })
  + (t >= LT("g203") - .1 ? TF(960, 300, spring(t, LT("g203") - .1, .45), tpill(0, 0, "Hold on to your answer!", 56, P.ink, "#fff", { w: 700 })) : "") + trolleyRule(t) + HUD(t); };
// the title slam over the dimmed walkway: A TROLLEY (white) then MADE OF GLASS?! (sun yellow).
// The second slam is the first thing to cut if Part 1 runs long (script section 6, CUTS "title2": a picture beat only).
const slamFit = (y, txt, col, k) => slamLine(y, txt, Math.min(170, 170 * 1720 / tw(txt, 170, 700, "Fredoka", 4)), col, k);
SC.title = (t, s) => { const u = t - MK("title"), dim = clamp(u / .2); return lcSet(t, s, "board") + `<rect width="1920" height="1080" fill="${P.night}" opacity="${n2(.78 * dim)}"/>`
  + slamFit(400, "A TROLLEY", "#fff", slamK(u, .05)) + slamFit(610, "MADE OF GLASS?!", P.sun, slamK(u, .55)) + HUD(t); };

/* 3 · the game, and the hidden mynah; 4 · goals (Momo reads) and the countdown (count is in common.js) */
// teacher, 22 Nov: no cut to the purple stage: the dimmed walkway of the title stays, the camera pushes straight in on the mynah on its sign
SC.game = (t, s) => gameScene(t, s, "g301", true, { world: (tt) => V(tt, { board: {} }), A: [MYNAH[0] + 4, MYNAH[1] - 28], T: [1400, 470], Z: 3, dim0: .78, ly: -150, qx: 1730, qy: 430,
  pre: (tt) => OP(.5, buds(tt) + trolleyRule(tt)) + slamFit(400, "A TROLLEY", "#fff", 1) + slamFit(610, "MADE OF GLASS?!", P.sun, 1) });
SC.goals = (t, s) => goals3(t, s, [["Objects have purposes", ""], ["Properties decide uses", ""], ["Why a trolley is metal", ""]], ["g401", "g402", "g403", "g404"], "momo");

/* 5 · what is a trolley for? The OBJECT column glows, the trolley's tile hops low onto the first row (row1o); [LOOK CLOSER] a trolley doing its job */
const CAMJ = [1.12, 800, 700];
SC.trolley = (t, s) => { const a = "g501", cam = camL(CAM0, CAMJ, eio((t - (W(a, "look") - .3)) / 1.0)); return V(t, { board: { col: t < s.t0 + 2.6 ? 0 : -1 } }, cam) + buds(t) + trolleyRule(t) + HUD(t); };
SC.lcjob = (t, s) => lookCloser(t, s, { tz: s.t0, fx: 760, fy: 800, art: jobArt, set: (tt) => V(tt, { board: {}, mynah: false }, CAMJ), verdict: VSTYLE("ITS PURPOSE: TO CARRY HEAVY GROCERIES", "sun"), tv: MK("v_job") });

/* 6 · Mark Sentence 1 (Pip): 3.24; the trolley's row gets its purpose (row1p); the towel, the scissors, the raincoat (things: cuttable line) */
SC.mark1 = (t, s) => markScene(t, s, { id: "g602", sayId: "g601", who: "pip", n: "1 of 2", text: "Materials are used to make objects. Objects are things you use for different purposes.", keys: ["materials", "objects", "purposes."], size: 62, y: 250, footer: FOOT,
  extra: TF(840, 1046, spring(t, s.t0 + .4, .5) * .6, trolleyS({ load: LOADED })) + TF(1440, 1062, .42, matchBoard(t, { row: t >= MK("row1p") - .2 ? 0 : -1 })) });
const THINGS = [["towel", towelS, "absorbs water", "fabric"], ["scissors", scissorsS, "cut", "metal"], ["raincoat", raincoatS, "keeps you dry in the rain", "plastic"]];
SC.things = (t, s) => { const [bx, bd] = slideX(t, s.t0 + .1, .6, 2300, 930, TRY), BX = 930; let it = "", tags = "";
  THINGS.forEach(([mk, art, job, mat], i) => { const t0 = MK(mk), x1 = 1130 + i * 190, u = eio((t - (t0 - .45)) / .45), sc = 1.15; if (t < t0 - .45) return;
    const x = lerp(BX, x1, u), y = lerp(TRY - 110, TRY, u) - 150 * Math.sin(Math.PI * u) - 18 * pulse(t, t0 + .05, .08, .5);
    it += TF(x, y, sc * (.7 + .3 * u), art()) + OP(1 - ramp(t, t0 + .15, .3), aHand(x - 70, y - 60 - 40 * ramp(t, t0 + .1, .3), 25, .9));
    const ty = [660, 590, 436][i];   /* Stage 3: the raincoat's tags higher (they hid the scissors' "metal") */ tags += (t >= t0 ? pline(x1, ty + 30, x1, TRY - (i === 1 ? 180 : 96), ramp(t, t0, .2)) + TF(x1 + (i === 2 ? -40 : 0), ty, spring(t, t0, .4), tpill(0, 0, job, 30, "#fff", P.ink, { w: 700 })) + TF(x1 + (i === 2 ? -40 : 0), ty - 58, spring(t, t0 + .2, .4), tpill(0, 0, mat, 30, P.ink, "#fff", { w: 700 })) : ""); });
  return V(t, { trol: { load: LOADED }, items: bd + TF(bx, TRY, 1.15, basketS()) + it }) + tags + buds(t) + trolleyRule(t) + HUD(t); };

/* 7 · Round 1: the dare from EP11 (a short 3 s ring). In the ring: the loaded trolley; clue labels for heavy groceries · gets knocked on top
   of the ring frame, kept through the countdown (lockN c.labels); EP11's boards small on the three cards (real art) */
SC.r1card = (t, s) => roundCard(t, s, "ROUND 1", "YOUR ANSWER FROM LAST TIME");
const r1labels = (t) => { const tq = W(L1, "glass") - .1; return t < tq ? "" : ["for heavy groceries", "gets knocked"].map((l, i) => TF(430 + (i ? 130 : -140), 470 - RING_R - 14 - (i ? 0 : 46), spring(t, tq + i * .15, .4), tpill(0, 0, l, 30, "#fff", P.ink, { w: 700 }))).join(""); };
SC.r1 = (t, s) => lockN(t, { cards: DARE_CARDS, labels: r1labels, q: DARE_LABEL, tq: W(L1, "glass") - .1, tc: [W(L1, "glass"), W(L1, "metal"), W(L1, "fabric")], ring0: MK("ring0_r1"), dur: 3, lock: "g702",
  icons: [0, 1, 2].map((i) => dareBoard(i, 0, 0, .36, { lab: false, id: "r1i" })),
  obj: (tt) => TF(440, 580, .74, trolleyS({ load: LOADED })), over: (tt) => qMark(tt, W(L1, "glass") - .1, 1262, 210, 40),
  picks: [{ who: "pip", id: "g704", word: "3", x: true }, { who: "basil", id: "g703", word: "1", x: true }, { who: "momo", id: "g705", word: "2" }],
  react: [[LE("g703") + .1, "basil", "cheer"], [LE("g704") + .1, "pip", "thinking"], [LE("g705") + .1, "momo", "pointing"]] });

/* 8 · [LOOK CLOSER] the loaded metal trolley: the bottom bars stay straight (a guide line, before / after); the knock in the trolley bay; METAL: STRONG */
SC.lcmetal = (t, s) => lookCloser(t, s, { tz: s.t0, fx: 700, fy: 830, art: metalArt, set: (tt) => V(tt, { trol: { load: LOADED }, board: {}, mynah: false }, CAMJ), verdict: [`METAL: <tspan fill="#fff">STRONG</tspan>`, GOODC, { plain: "METAL: STRONG" }], tv: MK("v_metal") });

/* 8b · glass: EP9's drop box (a held picture, REAL art: ep09drop.js), the book's strip 3.13a, FRAGILE / STRONG; the blue tag on the glass board. WIRED */
SC.glass = (t, s) => { const L = "g805", t0 = MK("ep9"), fw = ss(t0, t0 + .5, t), tb = MK("badglass"), hb = HAS("g806");
  return VW(t, { dim: 1 })
    + dareBoard(0, 330, 640 - 30 * fw, .8 * (1 + .12 * fw), { id: "gl" }) + boardTag(t, 0, 330, 830, 28) + chipAt(t, W(L, "fragile") + .1, 330, 420, "FRAGILE", 30)
    + OP(ramp(t, t0 + .2, .4), TF(1000, 690, 1, `<g filter="url(#drop)"><rect x="-330" y="-250" width="660" height="430" rx="24" fill="#FFF8EA" stroke="#E3C9A8" stroke-width="6"/></g><clipPath id="g9c"><rect x="-310" y="-230" width="620" height="390" rx="16"/></clipPath><g clip-path="url(#g9c)"><rect x="-310" y="-230" width="620" height="390" fill="#F4EDE1"/>${TF(0, 120, .9, ep9DropPic({ lab: false }))}</g>`)
      + TF(1000, 418, 1, tpill(0, 0, "from Episode 9", 28, P.ink, "#fff", { w: 600 })) + chipAt(t, W(L, "fragile") + .1, 1150, 520, "FRAGILE", 28) + chipAt(t, W(L, "strong") + .1, 850, 520, "STRONG", 28))
    + bookCaption(t, L, "Glass is fragile, but metal is strong.", 268, { size: 50, keys: ["fragile,", "strong."] }) + bookCaption(t, L, "A glass cup breaks easily when it is dropped, but a metal cup does not.", 358, { size: 46, off: 7, keys: ["breaks", "easily"] })
    + buddy("basil", 1660, 1060, 300, t, { aura: true, flip: true, in: s.t0 + .1, poses: [[s.t0, "sit"], [hb ? LT("g806") - .12 : tb, "oops"], [hb ? LE("g806") + .4 : tb + 2, "sit"]], nohop: true })
    + (hb ? say("g806", 1500, 640, t, { size: 42, tail: 120, maxW: 440 }) : "") + trolleyRule(t) + HUD(t); };
/* 8c · fabric: Pip's own bag holds the rice, but folds flat; FLEXIBLE; the blue tag on the fabric board */
SC.fabric = (t, s) => { const tI = MK("bagin"), tU = MK("baglift"), tD = MK("bagdown"), tF = MK("fold"), BX = 1060, S = 1.5;
  const lift = 90 * eio((t - tU) / .4) * (1 - ei((t - (tD - .35)) / .35)), fold = eio((t - tF) / .7), ry = dropDy(t, tI, 300, .28), inBag = t >= tI;
  const hands = t < tI + .1 ? (ry === undefined ? "" : aHand(BX, TRY - 262 + ry, 90, .9)) : t >= tU - .5 && t < tF + .1 ? OP(ramp(t, tU - .5, .25) * (1 - ramp(t, tD, .15)), aHand(BX - 40, TRY - 190 * S - 96 - lift, 90, .8) + aHand(BX + 40, TRY - 190 * S - 96 - lift, 90, .8)) : "";
  const bag = (inBag ? "" : (ry === undefined ? "" : TF(BX, TRY - 200 + ry, 1.2, riceSmall()))) + TF(BX, TRY, S, clothBag({ rice: inBag ? 1 : 0, fold, lift: lift / S }));
  return V(t, { trol: { load: LOADED }, items: dareBoard(2, 1490, WFLOOR - 50, .6, { lab: false, id: "fb" }) + bag + hands })
    + (t >= tU ? TF(830, 560, spring(t, tU, .4), tpill(0, 0, "holds the rice", 36, "#fff", P.ink, { w: 700 })) : "") + (t >= tF ? TF(1180, 630, spring(t, tF, .4), tpill(0, 0, "bends and folds", 36, "#fff", P.ink, { w: 700 })) : "")
    + chipAt(t, tF + .3, 1180, 700, "FLEXIBLE", 34) + boardTag(t, 2, 1490, 600, 24) + (t < tU ? TF(BX, TRY - 400, spring(t, s.t0 + .15, .4) * (1 - ramp(t, tU - .2, .2)), tpill(0, 0, "Pip’s bag: fabric", 34, P.ink, "#fff", { w: 700 })) : "")
    + buddy("pip", 240, 1060, 250, t, { aura: true, in: s.t0 + .1, poses: [[s.t0, "sit"], [tF + .2, "surprised"], [LT("g808") - .12, "sit"]], jump: [[LE("g808") + .1, 20]] }) + say("g808", 430, 520, t, { size: 40, tail: -120, maxW: 440 }) + trolleyRule(t) + HUD(t); };
/* 8d · the answer is two: metal. EP11's boards with their tags; card 2 glows; coin; the board's first row is completed (row1m) */
SC.metalans = (t, s) => { const L = "g809", tA = W(L, "two") - .1, tOne = W(L, "one") - .1;
  return VW(t, { dim: 1 }) + [0, 1, 2].map((i) => dareBoard(i, 330 + i * 290, 400, .56, { id: "ma" }) + boardTag(t, i, 330 + i * 290, 520, 21)).join("")
    + DARE_CARDS.map((c, i) => TF(330 + i * 290, 800, .42 * spring(t, s.t0 + .1 + i * .08, .4), ansCard(i + 1, c, { w: 430, h: 290, size: 58, lit: i === 1 && t >= tA ? spring(t, tA, .45) : 0 }))).join("")
    + TF(1490, 1010, .5, matchBoard(t, { row: t >= MK("row1m") - .2 ? 0 : -1 })) + coin(t, tOne, 1490, 400, "+1", "if you showed two fingers") + trolleyRule(t) + HUD(t); };

/* 9 · Mark Sentence 2 (Basil): 3.25; PHYSICAL PROPERTIES pops after the first sentence (lib.js o.at); under the card: the three boards with tags and chips */
SC.mark2 = (t, s) => markScene(t, s, { id: "g902", sayId: "g901", who: "basil", n: "2 of 2", text: "Every material has physical properties. The physical properties of a material allow it to be used in certain ways.", keys: ["physical", "properties.", "properties", "allow", "it", "to", "be", "used", "in", "certain", "ways."], size: 60, y: 230, footer: FOOT,
  under: [0, 1, 2].map((i) => { const x = 760 + i * 230; return dareBoard(i, x, 985, .38, { lab: false, id: "m2" }) + TF(x, 892, 1, jobTag(t, i === 1 ? 0 : 1, 16)) + TF(x, 1040, 1, propChip(["FRAGILE", "STRONG", "FLEXIBLE"][i], 18)); }).join("") });

/* 10 · HOLD ON! Momo: "So glass is a bad material!" (model: EP11 SC.holdon): the glass card slides away (slideout), the HOLD ON! stamp, the
   YOU ring with crossed arms (5 s), the glass card in the ring, three clue labels ON TOP of the ring frame through the countdown and Heart's rule,
   the bell, the coin; the dimmed walkway behind */
const RG = [1240, 520], RR = 150;
SC.holdon = (t, s) => { const a = "g1001", b = "g1002", c = "g1003", r0 = MK("ring0_hold"), bell = MK("bell_hold"), rs = ringState(t, r0, 5), tX = W(b, "cross") - .15, tH = W(b, "hold") - .1, tOne = W(c, "one") - .1, ring = t >= tX && t < LE(c) + .4;
  const out = eio((t - MK("slideout") - .3) / 1.2), pic = TF(RG[0], RG[1] + 6, .36, ansCard(1, "Glass", { w: 286, h: 380, size: 52 }));
  const labels = ["glass: fragile", "bad for a trolley", "bad for everything?"].map((l, i) => TF(RG[0] + (i - 1) * 190, RG[1] - RR - 34 - (i === 1 ? 50 : 0), spring(t, tX + .2 + i * .15, .4), tpill(0, 0, l, 26, "#fff", P.ink, { w: 700 }))).join("");
  return VW(t, { dim: 1 })
    + (ring ? "" : TF(lerp(760, 1700, out), 900, .42, ansCard(1, "Glass", { w: 286, h: 380, size: 52 })) + dust(lerp(760, 1700, out) - 70, 985, out > 0 && out < 1 ? ((t * 3) % 1) : 0, .8))
    + buddy("momo", 330, 1060, 300, t, { aura: true, in: s.t0 + .1, poses: [[s.t0, "cheer"], [LE(a) + .3, "sit"], [W(c, "glass") - .12, "surprised"], [LE(c) + .1, "sit"]], nohop: true })
    + say(a, 560, 300, t, { size: 42, tail: -200, maxW: 640 })
    + (ring ? OP(1 - ss(LE(c) + .1, LE(c) + .4, t), TF(RG[0], RG[1], spring(t, tX, .4), `<g transform="translate(${-RG[0]} ${-RG[1]})">${ringTimer(RG[0], RG[1], t < r0 ? 1 : t < bell ? rs.frac : 0, t < r0 ? 5 : t < bell ? rs.secs : 0, t, { R: RR, sw: 24, tick: rs.tick, shut: pulse(t, bell, .01, .6), inner: pic + (t < bell + .3 ? OP(.85, TF(RG[0], RG[1] + 40, .38, crossedArms())) : "") })}</g>`)
      + labels + youPill(RG[0] - 250, RG[1] + 120, 1.0) + tpill(RG[0], RG[1] + RR + 60, "cross your arms", 30, P.ink, "#fff")) : "")
    + (t >= W(c, "glass") - .1 ? TF(960, 960, spring(t, W(c, "glass") - .1, .4), tpill(0, 0, "Glass is not a bad material. It depends on the use.", 38, P.sun, P.ink, { w: 700 })) : "")
    + stamp(t, tH, 900, 420, "HOLD ON!") + bellIcon(t, r0) + coin(t, tOne, 1680, 860, "+1", "arms crossed") + trolleyRule(t) + HUD(t); };
// Basil: the camera turns towards the aquarium shop next door (turn); the glass card slides back low to its place (slideback)
SC.fishnext = (t, s) => { const cam = camL(CAM0, CAMT, eio((t - MK("turn") - .1) / 1.2)), [cx, cd] = slideX(t, MK("slideback"), .6, 2300, 1010, 1040);
  return V(t, { trol: { load: LOADED } }, cam) + (t >= MK("slideback") ? cd + TF(cx, 950, .4, ansCard(1, "Glass", { w: 286, h: 380, size: 52 })) : "")
    + buddy("basil", 1260, 1060, 250, t, { aura: true, in: s.t0 + .1, poses: [[s.t0, "surprised"], [LT("g1004") + .6, "sit"]] }) + say("g1004", 980, 640, t, { size: 40, tail: 160, maxW: 480 }) + trolleyRule(t) + HUD(t); };

/* 11 · [LOOK CLOSER] a glass fish tank: every fish seen clearly (TRANSPARENT), the shelf under it dry (WATERPROOF) */
SC.lctank = (t, s) => lookCloser(t, s, { tz: s.t0, fx: 1240, fy: 590, bgc: "#E6F6FF", art: tankArt, set: (tt) => V(tt, { trol: { load: LOADED }, mynah: false }, CAMT), verdict: [`GLASS: TRANSPARENT AND WATERPROOF`, GOODC], tv: MK("v_tank") })
  + OP(ramp(t, s.t0 + 1.2, .4), TF(1290, 44, 1, smallPrint(t, s.t0 + 1.2, TANK_RULE)));
SC.tankrow = (t, s) => V(t, { trol: { load: LOADED }, board: { row: 1 } }, camL(CAMT, CAM0, eo((t - s.t0) / .7)))
  + buddy("momo", 1700, 1060, 250, t, { aura: true, flip: true, in: s.t0 + .1, poses: [[s.t0, "surprised"], [HAS("g1105") ? LT("g1105") - .12 : s.t0 + 2, "sit"]] })
  + (HAS("g1105") ? say("g1105", 1500, 560, t, { size: 40, tail: 120, maxW: 480 }) : TF(960, 300, spring(t, s.t0 + .6, .4), tpill(0, 0, "The same glass. A different use.", 44, "#fff", P.ink, { w: 700 }))) + trolleyRule(t) + HUD(t);

/* 12 · BE THE METAL: the glide back to the trolley and down into the empty basket, to one bar at the bottom (the journey is SC.shrink in shrink.js) */
const TBAR = [TRX, TRY - 120];
SC.waitw = (t, s) => { const L = "g1201", dive = ei((t - (s.t1 - 1.5)) / 1.5), e = eio((t - s.t0) / 1.2), m = Math.max(e * .5, dive), cam = [1 + .22 * e + 3.8 * dive, lerp(960, TBAR[0], m), lerp(540, TBAR[1], m)], tP = W(L, "be") - .2;
  return V(t, { board: {} }, cam) + OP(1 - dive * 1.6, buds(t, { momo: { poses: [[s.t0, "sit"], [tP, "cheer"]] } })
    + (t >= tP ? TF(960, 250, spring(t, tP, .45), tpill(0, 0, "Be the metal!", 76, P.sun, P.ink, { w: 700 })) : "") + trolleyRule(t) + HUD(t)) + wipe(t, s.t1, CREAM, 960, 540); };

/* 13 · pull back out; the score hand, the mynah (lizReveal in common.js), the key words (kwrecap in common.js) */
SC.pullout = (t, s) => V(t, { trol: { load: LOADED }, board: {} }, camL([4.6, TBAR[0], TBAR[1]], CAM0, eo((t - s.t0) / .75))) + wipe(t, s.t0, CREAM) + HUD(t);
SC.final = (t, s) => { const L = "g1301"; return finalScene(t, s, L, 0, [[s.t0, null, 1], [W(L, "two") - .1, null, 2]]); };
SC.liz = (t, s) => { const L = "g1302", tq = W(L, "it") - .1, u = t - (s.t0 + 1.6);
  const act = { hop: u > 0 ? 26 * Math.abs(Math.sin(Math.PI * clamp(u / .45))) + 14 * Math.abs(Math.sin(Math.PI * clamp((u - .6) / .4))) : 0, flap: pulse(t, s.t0 + 2.3, .12, .5), tilt: u > 1.4 ? 16 * Math.sin((u - 1.4) * 7) : undefined };
  return lizReveal(t, s, L, V(t, { trol: { load: LOADED }, mynah: act }), MYNAH[0] + 6, MYNAH[1] - 30, tq, "It was on the trolley bay sign!", 200, 150, 70, 1.9, { from: () => SC.final(SCN.final.t1 - .04, SCN.final) }); };

/* 14 · the cliffhanger: the trolley from above; three water bottles stand in a row in its fold-down flap (plastic, glass, metal) */
SC.cliff = (t, s) => { const a = "g1401", c = "g1403", TX = 900, TY = 580, S = 1.45, tP = W(c, "find") - .1, tb = [MK("b1"), MK("b2"), MK("b3")], bx = (i) => TX + S * (-266 + i * 62), by = TY + S * 104;
  let fl = ""; for (let i = -2; i < 22; i++) fl += `<path d="M${i * 110} 0 V1080" stroke="#B9A684" stroke-width="3" opacity=".5"/>`; for (let j = 0; j < 11; j++) fl += `<path d="M0 ${j * 110 + 30} H1920" stroke="#B9A684" stroke-width="3" opacity=".5"/>`;
  const bots = BKINDS.map((k, i) => TF(bx(i), by - 16 * pulse(t, tb[i], .08, .6), .78 * S, bottleSvg(k, { id: "cf" + i }))).join("");
  const tags = BKINDS.map((k, i) => t < tb[i] ? "" : pline(bx(i) + (i - 1) * 170, 300, bx(i), by - 168 * S, ramp(t, tb[i], .2)) + TF(bx(i) + (i - 1) * 170, 300, spring(t, tb[i], .4), tpill(0, 0, k, 40, "#fff", P.ink, { w: 700 }))).join("");
  return `<rect width="1920" height="1080" fill="#DCCBAA"/>${fl}<ellipse cx="${TX + 10}" cy="${TY + 30}" rx="600" ry="320" fill="${P.ink}" opacity=".14" filter="url(#b10)"/>` + TF(TX, TY, S, trolleyTop()) + bots + tags + qMark(t, MK("q"), bx(1), 190, 54)
    + TF(1590, 1056, .38, matchBoard(t))
    + buddy("basil", 250, 1060, 250, t, { aura: true, in: s.t0 + .1, poses: [[s.t0, "surprised"], [LT(a) - .12, "sit"], [LE(a) + .3, "surprised"]], nohop: true }) + say(a, 470, 800, t, { size: 40, tail: -160, maxW: 520 })
    + (t >= tP ? TF(880, 905, lerp(2.2, 1, eo((t - tP) / .16)) + .05 * wob(t, tP + .16, .4), `<text x="0" y="50" font-family="Fredoka" font-weight="700" font-size="170" text-anchor="middle" letter-spacing="6" fill="${P.sun}" stroke="${P.ink}" stroke-width="28" stroke-linejoin="round" paint-order="stroke" filter="url(#drop)">PART 2</text>`) : "") + trolleyRule(t) + HUD(t); }; /* Stage 3: PART 2 slams in below the trolley (it covered the glass / metal tags) */

/* 15 · "Now you know!": the board MATCH THE JOB (two full rows) centred in the free space between the buddies */
SC.nyk = (t, s) => nykScene(t, s, TF(862, 1040, .8, matchBoard(t)), { bx: [125, 1800, 1578], bh: 220, hx: 125, sayY: 400 });   // teacher, 22 Nov: the trolley board, big; the discs smaller and at the sides, YOU above Pip
})(); }
