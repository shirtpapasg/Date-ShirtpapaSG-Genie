// p1.js: PART 1, "A METAL Strap? Design a School Bag Like an ENGINEER": EP12's dare answered, what engineers do, the design steps, design a
// school bag. Segments 1-15 of p3_ep13_script.md (version 1, 21 Nov 2026; the teacher's go-ahead in its section 12).
// STAGE 2 (drawn, 2026-11-22): the classroom, the bag and the props are in school.js, the board OUR DESIGN PLAN in tests.js, the look-closer
// pictures in closer.js, the journey in shrink.js. (Stage 1 notes below.)
// STAGE 1 (setup): the shared routines are wired (the cold open's real boards sliding in, the calm recap of EP12's dare with EP12's own three
// school-bag boards and cards, the title slam, game, goals read by Basil, countdown, Round 1's lock-in with the boards on the cards and the
// clue labels must bend · must not tear on top of the ring, the answer with the real boards and their SUITABLE / NOT FOR THIS JOB tags, Mark
// Sentences read by Basil / Pip (the tag "function = the job of a part"), the board OUR DESIGN PLAN as a functional placeholder (boxes that
// glow and fill on their marks, the four fabric tiles of the HOLD ON!, the card THEN: TEST IT), the HOLD ON! ring with its three clue labels on
// top of the ring, the LOOK-CLOSER frame, score hand, read-along, "Now you know!"); every scene with new art is a phScene placeholder (and each
// [LOOK CLOSER] an lcPH placeholder inside the real frame). STAGE 2 (Fable) draws them: see SCENES_TODO.md.
if (PART === 1) { (() => {
const L1 = "g501";
// the scores (script section 3): Round 1 1 : 0, HOLD ON! 2 : 0 (the buddies score nothing in this part)
SCORE.push([W("g605", "one", 2) - .1, 1, 0]);
SCORE.push([W("g903", "one") - .1, 2, 0]);
const FOOT = "P3 · Diversity of Materials · The design process";
const DARE = ["bagFabric", "bagMetal", "bagWood"];
// EP12's dare board (ep12dare.js, EP12's own art); origin = the board's centre
const dareBoard = (i, x, y, sc, o = {}) => picBoard(DARE[i], x, y, 1, { sc, lab: o.lab === false ? undefined : DARE_CARDS[i].toLowerCase(), size: 44, id: "p1d" + i + (o.id || "") });
// the tags on the three boards (script 1:24: SUITABLE on the fabric strap's board, NOT FOR THIS JOB on the other two), from mark boardtags
const boardTag = (t, i, x, y, size = 26) => { const t0 = MK("boardtags") + i * .2; return t < t0 ? "" : TF(x, y - 60 * (1 - eo((t - t0) / .25)), spring(t, t0, .45), jobTag(t, i === 0 ? 0 : 1, size)); };
const qMark = (t, t0, x, y, r = 50) => t < t0 ? "" : TF(x, y, spring(t, t0, .5) * (1 + .05 * Math.sin(t * 4)), `<g filter="url(#dropS)"><circle r="${r}" fill="url(#gSun)"/></g>${T(0, r * .52, "?", r * 1.56, P.ink)}`);

/* the classroom (school.js VC): the teacher's table with the real bag on it, the chair beside it, the board OUR DESIGN PLAN at the right,
   the three small discs at the lower left. o.bag: "lying" (torn strap, on its side, the five books slid out) | "new" (upright, the new
   fabric strap clipped on, books beside it) | "full" (zipped, the books inside) | false; o.paper (a sheet on the table), o.easel (the
   finished drawing on a small easel), o.board (planBoard options), o.bfly */
const TX = CL.tx, TY = CL.ty, BGX = 520, PX = 800, BRD = [CL.bx, CL.by, CL.bs], CAM0 = [1, 960, 540], CAMR = [1.3, 1020, 740], CAMB = [1.3, BGX, 700], CAMP = [1.3, PX, 740], CREAM = "#FFF6D8";
const bagLying = () => TF(410, TY, .85, `<g transform="rotate(90) translate(-100 0)">${bag13({ strapL: "tornflat", strapR: "none", zip: 1, open: .5, id: "ly" })}</g>`) + TF(700, TY, .72, booksOut());
const bagUp = (o = {}, x = BGX) => TF(x, TY, .85, bag13({ strapR: "new", id: "up", ...o }));
const paperQ = (x) => `<path d="M${x - 110} ${TY} L${x - 84} ${TY - 22} H${x + 124} L${x + 106} ${TY}z" fill="#FFFDF4" stroke="#E3D6B8" stroke-width="4" stroke-linejoin="round"/>`;
const easelOn = (x, o = {}) => TF(x, TY, .5, easelS(TF(0, 0, .52, drawingPic({ mat: MATALL, words: false, ...o })), 420, 300));
const tableStuff = (o) => (o.bag === "lying" ? bagLying() : o.bag === "new" ? bagUp({ zip: 1, open: 1 }) + TF(PX - 60, TY, .8, bookStack()) : o.bag === "full" ? bagUp() : o.bag === "open" ? bagUp({ zip: 1, open: 1 }) : "")
  + (o.paper !== undefined ? paperQ(o.paper) : "") + (o.easel ? easelOn(o.easel === true ? PX : o.easel, o.easelO) : "");
const brd = (t, o, x = BRD[0]) => TF(x, BRD[1], BRD[2], planBoard(t, o));
const V = (t, o = {}, cam) => VC(t, { bfly: o.bfly, items: (o.back || "") + tableStuff(o) + (o.board === undefined ? "" : brd(t, o.board, o.boardX)) + (o.items || "") }, cam);
const VD = (t, o = {}, cam) => V(t, o, cam) + `<rect width="1920" height="1080" fill="${P.night}" opacity=".62"/>`;
const dPip = (t, o = {}) => buddy("pip", 75, 1064, 126, t, { aura: true, tag: false, ...o }), dBasil = (t, o = {}) => buddy("basil", 200, 1064, 116, t, { aura: true, tag: false, ...o }), dMomo = (t, o = {}) => buddy("momo", 325, 1064, 126, t, { aura: true, tag: false, ...o });
const buds = (t, o = {}) => dPip(t, o.pip) + dBasil(t, o.basil) + dMomo(t, o.momo);

/* 1 · silent cold open: a Primary 3 classroom after school. The orange bag lies on the teacher's table, its strap torn off at the top end;
   five exercise books have slid out. EP12's three boards slide in low (boardsIn) and stand beside the table; the buddies pop in (budsIn) */
const CBX = [1200, 1440, 1680];
SC.cold = (t, s) => { const tb = MK("boardsIn"), tp = MK("budsIn");
  const boards = [0, 1, 2].map((i) => { const t0 = tb + i * .3; if (t < t0) return ""; const [x, d] = slideX(t, t0, .7, 2500, CBX[i], 1000); return d + dareBoard(i, x, 910, .5, { lab: false, id: "c" }); }).join("");
  return V(t, { bag: "lying", items: boards }, [1.02 + .02 * eio(t / 6), 960, 548])
    + dPip(t, { in: tp, poses: [[tp, "waving"], [tp + 1.4, "sit"]], wave: true }) + dBasil(t, { in: tp + .2, poses: [[tp + .2, "cheer"]] }) + dMomo(t, { in: tp + .4, poses: [[tp + .4, "waving"], [tp + 1.7, "sit"]], wave: true })
    + lowerPill(60, 96, "A Primary 3 classroom,", "Singapore"); };

/* 2 · "Last time...": EP12's dare, word for word. ONE calm picture: EP12's three boards side by side, centred and large, a gentle push-in,
   the big ? above them, EP12's three cards under them; as Heart says each card its board steps forward and its card lights (>= 2.5 s each). WIRED */
SC.lasttime = (t, s) => { const L = "g203", tc = [W(L, "one"), W(L, "two"), W(L, "three")], z = 1 + .04 * eio((t - s.t0) / 8), k = ramp(t, s.t0 + .05, .5), cur = tc.filter((x) => t >= x - .15).length - 1;
  let boards = ""; [0, 1, 2].forEach((i) => { const fw = cur === i ? ss(tc[i] - .15, tc[i] + .25, t) : (cur > i ? 1 - ss(tc[i + 1] - .15, tc[i + 1] + .25, t) : 0);
    boards += dareBoard(i, 560 + i * 400, 600 + 14 * (1 - spring(t, s.t0 + .2 + i * .15, .45)), .95 * (1 + .1 * fw), { id: "lt" }); });
  return bg("stage2") + OP(ramp(t, s.t0, .3), T(960, 110, "Last time…", 60, "#fff", { w: 600 }))
    + OP(k, `<g transform="translate(960 540) scale(${n2(z)}) translate(-960 -540)">${boards}</g>`
      + qMark(t, W("g202", "which") - .1, 960, 240)
      + DARE_CARDS.map((c, i) => TF(560 + i * 400, 880, .5 * spring(t, tc[i] - .1, .45), ansCard(i + 1, c, { w: 430, h: 290, size: 58, pulse: cur === i ? .9 : pulse(t, tc[i], .04, .9) }))).join("")   /* each card lights as Heart says it (no tick: the answer is Round 1's) */
      + TF(960, 1010, spring(t, W("g202", "which") - .1, .4), tpill(0, 0, DARE_LABEL, 40, P.sun, P.ink, { w: 700 }))) + HUD(t); };
SC.back = (t, s) => V(t, { bag: "lying", items: [0, 1, 2].map((i) => dareBoard(i, CBX[i], 910, .5, { lab: false, id: "bk" })).join("") }) + buds(t)
  + (t >= LT("g204") - .1 ? TF(960, 300, spring(t, LT("g204") - .1, .45), tpill(0, 0, "Hold on to your answer!", 56, P.ink, "#fff", { w: 700 })) : "") + HUD(t);
// the title slam over the dimmed classroom (WIRED; Stage 2's drawn classroom shows through): A METAL STRAP? (white) then DESIGN IT LIKE AN
// ENGINEER! (sun yellow). The second slam is the first thing to cut if Part 1 runs long (script section 6, CUTS "title2": a picture beat only).
const slamFit = (y, txt, col, k) => slamLine(y, txt, Math.min(170, 170 * 1720 / tw(txt, 170, 700, "Fredoka", 4)), col, k);
SC.title = (t, s) => { const u = t - MK("title"), dim = clamp(u / .2); return lcSet(t, s, "back") + `<rect width="1920" height="1080" fill="${P.night}" opacity="${n2(.78 * dim)}"/>`
  + slamFit(400, "A METAL STRAP?", "#fff", slamK(u, .05)) + slamFit(610, "DESIGN IT LIKE AN ENGINEER!", P.sun, slamK(u, .55)) + HUD(t); };

/* 3 · the game, and the hidden butterfly; 4 · goals (Basil reads) and the countdown (count is in common.js) */
SC.game = (t, s) => gameScene(t, s, "g301", true);
SC.goals = (t, s) => goals3(t, s, [["What engineers do", ""], ["The design steps", ""], ["Design a school bag", ""]], ["g401", "g402", "g403", "g404"], "basil");

/* 5 · Round 1: the dare from EP12 (a short 3 s ring). In the ring: the bag with its torn strap (ringPH: Stage 2 draws it); clue labels must bend
   · must not tear on top of the ring frame, kept through the countdown (lockN c.labels); EP12's boards small on the three cards (real art) */
SC.r1card = (t, s) => roundCard(t, s, "ROUND 1", "YOUR ANSWER FROM LAST TIME");
const r1labels = (t) => { const tq = W(L1, "fabric") - .1; return t < tq ? "" : DARE_CLUES.map((l, i) => TF(430 + (i ? 130 : -140), 470 - RING_R - 14 - (i ? 0 : 46), spring(t, tq + i * .15, .4), tpill(0, 0, l, 30, "#fff", P.ink, { w: 700 }))).join(""); };
SC.r1 = (t, s) => lockN(t, { cards: DARE_CARDS, labels: r1labels, q: DARE_LABEL, tq: W(L1, "fabric") - .1, tc: [W(L1, "fabric"), W(L1, "metal"), W(L1, "wood")], ring0: MK("ring0_r1"), dur: 3, lock: "g502",
  icons: [0, 1, 2].map((i) => dareBoard(i, 0, 0, .36, { lab: false, id: "r1i" })),
  obj: (tt) => TF(430, 566, .74, bag13({ strapR: "torn", id: "rg" })), over: (tt) => qMark(tt, W(L1, "fabric") - .1, 1262, 210, 40),
  picks: [{ who: "pip", id: "g505", word: "1" }, { who: "basil", id: "g503", word: "2", x: true }, { who: "momo", id: "g504", word: "3", x: true }],
  react: [[LE("g503") + .1, "basil", "cheer"], [LE("g504") + .1, "momo", "thinking"], [LE("g505") + .1, "pip", "pointing"]] });

/* 6 · [LOOK CLOSER] three straps over the back of a chair; the fabric strap lifts a bag full of books; FABRIC: FLEXIBLE AND STRONG */
SC.lcstraps = (t, s) => lookCloser(t, s, { tz: s.t0, fx: CL.chx, fy: 690, art: strapsArt, set: (tt) => V(tt, { bag: "lying", bfly: false }, camL(CAM0, CAMR, eio((tt - s.t0) / 1.0))),
  verdict: [`FABRIC: <tspan fill="#fff">FLEXIBLE AND STRONG</tspan>`, GOODC, { plain: "FABRIC: FLEXIBLE AND STRONG" }], tv: MK("v_straps"), over: (tt) => smallPrint(tt, s.t0 + 1.2, FORCE_RULE) });
/* the answer is one: fabric. EP12's three boards with their tags (SUITABLE green on fabric, NOT FOR THIS JOB blue on metal and wood: boardtags),
   card 1 glows, coin, Basil's oops (g606, cuttable "ouch"). WIRED with the real boards */
SC.strapans = (t, s) => { const L = "g605", tA = W(L, "one") - .1, tOne = W(L, "one", 2) - .1, hb = HAS("g606");
  return VD(t, { bag: "full" })
    + [0, 1, 2].map((i) => dareBoard(i, 560 + i * 400, 470, .62, { id: "sa" }) + boardTag(t, i, 560 + i * 400, 600, 24)).join("")
    + DARE_CARDS.map((c, i) => TF(560 + i * 400, 830, .42 * spring(t, s.t0 + .1 + i * .08, .4), ansCard(i + 1, c, { w: 430, h: 290, size: 58, lit: i === 0 && t >= tA ? spring(t, tA, .45) : 0 }))).join("")
    + coin(t, tOne, 1680, 300, "+1", "if you showed one finger")
    + buddy("basil", 1700, 1060, 280, t, { aura: true, flip: true, in: s.t0 + .1, poses: [[s.t0, "sit"], [hb ? LT("g606") - .12 : tA + 1, "oops"], [hb ? LE("g606") + .4 : tA + 3, "sit"]], nohop: true })
    + (hb ? say("g606", 1460, 640, t, { size: 40, tail: 120, maxW: 460 }) : "") + HUD(t); };

/* 7 · what engineers do: ENGINEERS pops on Heart's "engineers" (lib.js o.at); Momo: "So we are engineers too!" */
// the table top from above: the three straps in a row, each with its tag; the small card with the hard hat, the pencil and the ruler
const STR3 = [["fabric", 0], ["metal", 1], ["wood", 1]];
SC.engineers = (t, s) => { const rows = [450, 640, 830]; let it = `<rect width="1920" height="1080" fill="#E9CC96"/><rect width="1920" height="150" fill="#B5C4B0"/><rect y="150" width="1920" height="30" fill="url(#sDesk)" stroke="#B98F52" stroke-width="5"/>${wgrain(40, 1880, 300, 10, 2)}${wgrain(40, 1880, 560, 10, 5)}${wgrain(40, 1880, 760, 10, 8)}${wgrain(40, 1880, 980, 10, 11)}`;
  STR3.forEach(([k, j], i) => { const y = rows[i], t0 = s.t0 + .25 + i * .25; it += `<rect x="150" y="${y + 14}" width="860" height="26" rx="13" fill="${P.ink}" opacity=".14" filter="url(#b4)"/>` + TF(580, y, 1, strapBand(k, 860, 50)) + (t >= t0 ? TF(580, y - 66, spring(t, t0, .4), jobTag(t, j, 30)) : ""); });
  return it + TF(1240, 1010, 1.3 * spring(t, s.t0 + .2, .5), hardHatCard())
    + buddy("momo", 1680, 1060, 260, t, { aura: true, flip: true, in: s.t0 + .1, poses: [[s.t0, "sit"], [LT("g702") - .12, "cheer"], [LE("g702") + .3, "sit"]] }) + say("g702", 1450, 600, t, { size: 40, tail: 120, maxW: 440 }) + HUD(t); };
/* Mark Sentence 1 (Basil): 3.29; DESIGN pops after the last word (lib.js o.at); under the card: the three straps with their tags */
SC.mark1 = (t, s) => markScene(t, s, { id: "g705", sayId: "g704", who: "basil", n: "1 of 2", text: "Knowing the physical properties of a material is important when designing and making new products.", keys: ["physical", "properties", "designing", "and", "making", "new", "products."], size: 62, y: 250, footer: FOOT,
  under: STR3.map(([k, j], i) => { const x = 620 + i * 240; return TF(x, 1000, 1, strapBand(k, 220, 26)) + TF(x, 950, 1, jobTag(t, j, 17)) + (i === 0 ? TF(x - 62, 1046, 1, propChip("FLEXIBLE", 16)) + TF(x + 62, 1046, 1, propChip("STRONG", 16)) : ""); }).join("") });

/* 8 · the plan: OUR DESIGN PLAN slides in low (planIn) and stands centred between the discs; the first box glows on "First" (box1) */
SC.plan = (t, s) => { const [bx, bd] = slideX(t, MK("planIn") + .05, .75, 2700, BRD[0], BRD[1]), cam = camL(CAM0, CAMB, eio((t - (s.t1 - 1.2)) / 1.2));
  return V(t, { bag: "new", board: t >= MK("planIn") ? {} : undefined, boardX: bx, items: bd }, cam) + buds(t, { basil: { poses: [[s.t0, "sit"], [MK("planIn") + .8, "cheer"]] } }) + HUD(t); };
SC.lcbag = (t, s) => lookCloser(t, s, { tz: s.t0, fx: BGX, fy: 660, art: bagArt, set: (tt) => V(tt, { bag: "new", board: {}, bfly: false }, CAMB), verdict: VSTYLE("ONE BAG · FOUR PARTS · FOUR USES", "sun"), tv: MK("v_bag"),
  over: (tt) => TF(336, 334, .26, planBoard(tt, { small: true })) });

/* 9 · HOLD ON! Pip: "So I will make every part of fabric!" WIRED (model: EP12 SC.holdon): Pip big in his disc (cheer), the board (small, low
   right) with four fabric tiles hopping to CHOOSE MATERIALS (fabhop) and back (fabback), the HOLD ON! stamp, the YOU ring with crossed arms (5 s),
   the bag in the ring (placeholder), three clue labels ON TOP of the ring frame through the countdown, the bell, the coin. Stage 2 draws the
   classroom behind and the bag with its four label lines in the ring. */
const RG = [1240, 470], RR = 150;
SC.holdon = (t, s) => { const a = "g901", b = "g902", c = "g903", r0 = MK("ring0_hold"), bell = MK("bell_hold"), rs = ringState(t, r0, 5), tX = W(b, "cross") - .15, tH = W(b, "hold") - .1, tOne = W(c, "one") - .1, ring = t >= tX && t < LE(c) + .4;
  const pic = `<circle cx="${RG[0]}" cy="${RG[1]}" r="126" fill="#FFF8EA"/>` + TF(RG[0], RG[1] + 84, .62, bag13({ strapR: "new", tag: false, id: "ho" }) + [[-150, -200, -128, -150], [150, -90, 70, -90], [-150, -150, -70, -166], [150, -20, 96, -22]].map(([a, b, c, d]) => `<path d="M${a} ${b} L${c} ${d}" stroke="${P.ink}" stroke-width="7" stroke-linecap="round"/><circle cx="${a}" cy="${b}" r="12" fill="${P.ink}"/>`).join(""));
  const labels = ["four parts", "four uses", "one material?"].map((l, i) => TF(RG[0] + (i - 1) * 190, RG[1] - RR - 34 - (i === 1 ? 50 : 0), spring(t, tX + .2 + i * .15, .4), tpill(0, 0, l, 26, "#fff", P.ink, { w: 700 }))).join("");
  return VD(t, { bag: "full" }) + TF(1270, 1062, .42, planBoard(t))
    + buddy("pip", 330, 1060, 300, t, { aura: true, in: s.t0 + .1, poses: [[s.t0, "cheer"], [LE(a) + .3, "sit"], [W(c, "each") - .12, "surprised"], [LE(c) + .1, "sit"]], nohop: true })
    + say(a, 560, 300, t, { size: 42, tail: -200, maxW: 640 })
    + (ring ? OP(1 - ss(LE(c) + .1, LE(c) + .4, t), TF(RG[0], RG[1], spring(t, tX, .4), `<g transform="translate(${-RG[0]} ${-RG[1]})">${ringTimer(RG[0], RG[1], t < r0 ? 1 : t < bell ? rs.frac : 0, t < r0 ? 5 : t < bell ? rs.secs : 0, t, { R: RR, sw: 24, tick: rs.tick, shut: pulse(t, bell, .01, .6), inner: pic + (t < bell + .3 ? OP(.85, TF(RG[0], RG[1] + 40, .38, crossedArms())) : "") })}</g>`)
      + labels + youPill(RG[0] - 250, RG[1] + 120, 1.0) + tpill(RG[0], RG[1] + RR + 60, "cross your arms", 30, P.ink, "#fff")) : "")
    + stamp(t, tH, 900, 420, "HOLD ON!") + bellIcon(t, r0) + coin(t, tOne, 1680, 300, "+1", "arms crossed") + HUD(t); };
SC.wetfloor = (t, s) => { const tw_ = MK("wetpic"), [px, pd] = slideX(t, tw_, .55, 2500, 890, 1010);
  return VD(t, { bag: "full" }) + TF(BRD[0], BRD[1], BRD[2], planBoard(t)) + (t >= tw_ ? pd + TF(px, 1010, 1, easelS(TF(0, 0, .96, wetFloorPic(t)), 470, 330)) : "")
    + buddy("basil", 300, 1060, 280, t, { aura: true, in: s.t0 + .1, poses: [[s.t0, "surprised"], [LT("g904") + .6, "sit"]] }) + say("g904", 560, 430, t, { size: 40, tail: -160, maxW: 520 }) + HUD(t); };

/* 10 · draw it, then choose: the paper slides onto the table (paper), DRAW IT glows (glow4); [LOOK CLOSER] the drawing, and a material for each part */
SC.draw = (t, s) => { const u = eo((t - MK("paper")) / .5), cam = camL(CAM0, CAMP, eio((t - (s.t1 - 1.3)) / 1.3));
  return V(t, { bag: "full", paper: lerp(PX + 500, PX, u), board: {} }, cam) + buds(t) + HUD(t); };
SC.lcdraw = (t, s) => lookCloser(t, s, { tz: s.t0, fx: PX, fy: 760, art: drawArt, set: (tt) => V(tt, { bag: "full", paper: PX, board: { small: true }, bfly: false }, CAMP), verdict: [`OUR DESIGN: A SUITABLE MATERIAL FOR EACH PART`, GOODC], tv: MK("v_draw"),
  over: (tt) => TF(336, 334, .26, planBoard(tt, { small: true })) + lcClock(tt, MK("pencil"), MK("fill4"), 1540, 880) });
// pull back: the finished drawing stands on a small easel on the table; Pip: "A fabric base would soak up the water!"
SC.pipfix = (t, s) => V(t, { bag: "full", easel: true, board: {} }, camL(CAMP, CAM0, eo((t - s.t0) / .7)))
  + buddy("pip", 190, 1060, 230, t, { aura: true, in: s.t0 + .1, poses: [[s.t0, "surprised"], [HAS("g1006") ? LE("g1006") + .2 : s.t0 + 1.2, "sit"]], jump: [[HAS("g1006") ? LE("g1006") + .25 : s.t0 + 1.3, 20]] })
  + (HAS("g1006") ? say("g1006", 330, 420, t, { size: 40, tail: -100, maxW: 480 }) : TF(1200, 600, spring(t, s.t0 + .5, .4), tpill(0, 0, "Fabric soaks up water", 40, "#fff", P.ink, { w: 700 }))) + HUD(t);

/* 11 · Mark Sentence 2 (Pip): 3.27; the tag "function = the job of a part" for the whole card (as in EP12); under the card: the finished drawing */
SC.mark2 = (t, s) => markScene(t, s, { id: "g1102", sayId: "g1101", who: "pip", n: "2 of 2", text: "The materials are selected for the different functions of the parts based on their physical properties.", keys: ["different", "functions", "parts", "physical", "properties."], size: 62, y: 230, footer: FOOT,
  extra: (t >= s.t0 + .6 ? TF(1150, 800, spring(t, s.t0 + .6, .4), tpill(0, 0, "function = the job of a part", 34, "#FFF8EA", P.ink, { w: 700 })) : "")
    + TF(800, 968, .36, drawingPic({ mat: MATALL, words: false })) + TF(1020, 968, .7, sampleTile("fabric")) + TF(1140, 968, .7, sampleTile("plastic")) + TF(1300, 968, .6, zipShort(0)) });

/* 12 · BE A BOOK (the first-person journey) */
// the glide: to the real bag on the table and down through its open top, to one exercise book inside (the journey is SC.shrink in shrink.js)
const TBAG = [BGX, TY - 150];
SC.waitw = (t, s) => { const L = "g1201", dive = ei((t - (s.t1 - 1.5)) / 1.5), e = eio((t - s.t0) / 1.2), m = Math.max(e * .5, dive), cam = [1 + .22 * e + 3.8 * dive, lerp(960, TBAG[0], m), lerp(540, TBAG[1], m)], tP = W(L, "be") - .2;
  return V(t, { bag: "open", items: TF(BGX, TY, .85, bag13({ strapR: "new", zip: 1, open: 1, books: 5, id: "wj" })), easel: true, board: {} }, cam) + OP(1 - dive * 1.6, buds(t, { pip: { poses: [[s.t0, "sit"], [tP, "cheer"]] } })
    + (t >= tP ? TF(960, 250, spring(t, tP, .45), tpill(0, 0, "Be a book!", 76, P.sun, P.ink, { w: 700 })) : "") + HUD(t)) + wipe(t, s.t1, CREAM, 960, 540); };

/* 13 · pull back out; the score hand, the butterfly (lizReveal in common.js), the key words (kwrecap in common.js) */
SC.pullout = (t, s) => V(t, { bag: "full", easel: true, board: {} }, camL([4.6, TBAG[0], TBAG[1]], CAM0, eo((t - s.t0) / .6))) + wipe(t, s.t0, CREAM) + HUD(t);
SC.final = (t, s) => { const L = "g1301"; return finalScene(t, s, L, 0, [[s.t0, null, 1], [W(L, "two") - .1, null, 2]]); };
SC.liz = (t, s) => { const L = "g1302", tq = W(L, "it") - .1, u = t - (s.t0 + 1.6), fl = u > 0 && u < 1.6 ? Math.sin(Math.PI * clamp(u / 1.6)) : 0;
  return lizReveal(t, s, L, V(t, { bag: "full", easel: true, board: {}, bfly: { open: u > 0 && u < 1.6 ? .5 + .5 * Math.sin(u * 22) : (u >= 1.6 ? 1 : undefined), up: 60 * fl } }), BFLY[0], BFLY[1] - 4, tq, "It was on the plant by the window!", 120, 200, 66, 2.1); };

/* 14 · the cliffhanger: will the new strap really hold? THEN: TEST IT slides in beside the board on "Not yet" (testcard, wired in planBoard);
   a big ? over the new strap (q, wired); PART 2 slams in on "Find out in Part Two!" (wired) */
SC.cliff = (t, s) => { const tP = W("g1403", "part") - .1;
  return V(t, { items: easelOn(540) + bagUp({}, 800), board: {} }) + qMark(t, MK("q"), 960, 600)
    + buddy("basil", 190, 1060, 230, t, { aura: true, in: s.t0 + .1, poses: [[s.t0, "cheer"], [LT("g1401") - .12, "sit"], [LT("g1402"), "surprised"], [LE("g1402"), "sit"]] }) + say("g1401", 330, 420, t, { size: 40, tail: -100, maxW: 480 })
    + (t >= tP ? slamFit(330, "PART 2", P.sun, slamK(t - tP, 0)) : "") + HUD(t); };

/* 15 · "Now you know!": the board OUR DESIGN PLAN (five ticked boxes, THEN: TEST IT beside it) centred in the free space between the buddies */
SC.nyk = (t, s) => nykScene(t, s, TF(720, 1040, .4, planBoard(t)), { bx: [200, 1715, 1375], hx: 470 });
})(); }
