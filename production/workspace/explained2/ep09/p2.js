// p2.js: PART 2, "Rubber Band vs Ice-Cream Stick: Which One SNAPS?": flexibility, flexible and rigid, the three tubes, strong is not flexible.
// Segments 1-15 of p3_ep09_script.md (version 1, 21 Nov 2026; the teacher's answers in its section 12).
// STAGE 2 (drawn): the set and props are in voiddeck.js, the look-closer pictures in closer.js, the journey (SC.shrink) in shrink.js.
if (PART === 2) { (() => {
const L1 = "j401";
// the scores (script section 3): Round 1 1 : 1, Showdown 3 : 1
SCORE.push([W("j505", "one", 1) - .1, 1, 1]);
SCORE.push([W("j1008", "two") - .1, 3, 1]);
const FOOT = "P3 · Diversity of Materials · Physical properties";
const DONE = { paper: { n: 3, tear: 1, gap: 32 }, fabric: { n: 8, taut: 1 } };

/* ============ 1 · "Last time...": three calm pictures from Part 1, one at a time, each >= 2.5 s, centred and large, a gentle push-in, one label each ============ */
// the thumbnail's frame: the gloved hands bending the ice-cream stick, the crack just opening; the rubber band in a twist beside it; Basil surprised
const THUMB2 = (t) => bg("playground") + `<rect width="1920" height="1080" fill="#FFF8EA" opacity=".3"/>` + TF(1090, 610, 1.3, stickSvg({ bend: 24, crack: .9 })) + TF(1090 + 330, 646, 1.3, glovePinch(0), 12) + `<g transform="translate(${1090 - 330} 646) rotate(-12) scale(-1.3 1.3)">${glovePinch(0)}</g>`
  + TF(1150, 900, .7, bandSvg(0, 1)) + buddy("basil", 215, 800, 250, t, { aura: true, tag: false, pose: "surprised", still: true }) + logo(t);
const recapPic = (inner) => `<g filter="url(#drop)"><rect x="410" y="200" width="1100" height="640" rx="36" fill="url(#gPaper)"/></g><clipPath id="rcp"><rect x="410" y="200" width="1100" height="640" rx="36"/></clipPath><g clip-path="url(#rcp)">${inner}</g>`;
SC.lasttime = (t, s) => { if (location.search.includes("thumb")) return THUMB2(t); const L = "j101", tb = [s.t0, W(L, "a") - .2, W(L, "now") - .2], i = t >= tb[2] ? 2 : t >= tb[1] ? 1 : 0, labs = ["Fabric: stronger than paper", "Glass: fragile", "Test 3: bend"];
  const pics = [() => `<rect x="410" y="700" width="1100" height="140" fill="url(#vdStone)"/>` + TF(960, 790, 1.12, testStand(DONE)),
    () => `<rect x="410" y="700" width="1100" height="140" fill="url(#vdStone)"/>` + TF(960, 790, 1.25, dropBox(`<g transform="translate(-70 -64) rotate(-90)">${metalCup()}</g><g transform="translate(140 -10)">${glassPieces(1)}</g>`)) + TF(790, 300, 1, tpill(0, 0, "not broken", 36, "#fff", P.ink, { w: 700 })) + TF(1150, 300, 1, tpill(0, 0, "broken", 36, "#fff", P.ink, { w: 700 })),
    () => TF(960, 812, 1.22, board3(t, { glow: 2 }))];
  const z = 1 + .05 * eio((t - tb[i]) / 4), k = ramp(t, tb[i] + .05, .5);
  return bg("stage2") + OP(ramp(t, s.t0, .3), T(960, 110, "Last time…", 60, "#fff", { w: 600 }) + tpill(1210, 96, "Part 1", 32, P.coral, "#fff", { w: 700 }))
    + OP(k, `<g transform="translate(960 540) scale(${n2(z)}) translate(-960 -540)">${recapPic(pics[i]())}</g>` + TF(960, 960, spring(t, tb[i] + .3, .4), tpill(0, 0, labs[i], 50, P.sun, P.ink, { w: 700 }))) + HUD(t); };

/* ============ 2 · the new place, the game and the hidden caterpillar; 3 · goals (Pip reads) ============ */
const benchView = (t, o = {}, cam = CAMD) => playView(t, { stand: DONE, items: TF(PK.tray, TYP + 8, 1.0, bandTray(o.tray || {})), board: { glow: 2 }, ...o }, cam);
SC.place = (t, s) => { const z = 1.02 + .02 * eio((t - s.t0) / 4), tp = s.t0 + .5;
  return benchView(t, {}, [z, 960, 600]) + sPip(t, { in: tp, poses: [[tp, "waving"], [tp + 1.2, "sit"]], wave: true }) + sBasil(t, { in: tp + .15, poses: [[tp + .15, "cheer"]] }) + sMomo(t, { in: tp + .3 })
    + lowerPill(60, 60, "The playground beside the block,", "Singapore"); };
SC.game = (t, s) => gameScene(t, s, "j201", false);
SC.goals = (t, s) => goals3(t, s, [["What flexibility means", icoBand()], ["Flexible or rigid", icoTrays()], ["Strong is not the same as flexible", icoNotSame()]], ["j301", "j302", "j303", "j304"], "pip");

/* ============ 4 · Round 1: the dare from EP8 (a short 3 s ring); clue tag "rubber · wood" on top of the ring, kept through the countdown ============ */
SC.r1card = (t, s) => roundCard(t, s, "ROUND 1", "YOUR ANSWER FROM LAST TIME");
const ringTray = (tt) => `<g clip-path="url(#cRing)"><rect x="240" y="510" width="380" height="160" fill="url(#cWood)"/><path d="M240 510 H620" stroke="#fff" stroke-width="4" opacity=".6"/>${TF(430, 530, .8, bandTray())}</g>`;
SC.r1 = (t, s) => lockN(t, { cards: ["The rubber band", "The ice-cream stick"], tag: "rubber · wood", q: "Which one can bend without breaking?", tq: W(L1, "which") - .1, tc: [W(L1, "one", 2), W(L1, "two")], ring0: MK("ring0_r1"), dur: 3, lock: "j402",
  obj: ringTray, picks: [{ who: "pip", id: "j403", word: "2", x: true }, { who: "basil", id: "j404", word: "1" }, { who: "momo", id: "j405", word: "1" }],
  react: [[LE("j403") + .1, "pip", "thinking"], [LE("j404") + .1, "basil", "cheer"], [LE("j405") + .1, "momo", "pointing"]] });

/* ============ 5 · test three: BEND. [LOOK CLOSER] the slow bend test; the answer; tick 3 BEND ============ */
const CAMT = [1.5, 620, 900], TRAYXY = [gx(CAMT, PK.tray), gy(CAMT, TYP - 30)];
SC.lcbend = (t, s) => lookCloser(t, s, { tz: s.t0, fx: TRAYXY[0], fy: TRAYXY[1], art: bendArt, bgc: "#FFF3DC", set: (tt) => benchView(tt, {}, CAMT), verdict: [["IT BENDS", "WITHOUT BREAKING"], GOODC, { x: -330 }], tv: MK("v_bend") });
SC.bendans = (t, s) => { const a = "j503", p = "j504", h = "j505", tA = W(a, "one") - .1, lit = t >= tA ? spring(t, tA, .45) : 0, tOne = W(h, "one", 1) - .1, hp = HAS(p), tk = MK("tick3");
  return benchView(t, { tray: { snapped: true }, board: { glow: t < tk + 1.2 ? 2 : -1 } }) + TF(1290, 350, .66 * spring(t, s.t0 + .15, .45), ansCard(1, "The rubber band", { lit, w: 340 }))
    + buddy("pip", 180, 1062, 220, t, { aura: true, in: s.t0 + .1, poses: hp ? [[s.t0, "sit"], [tA, "surprised"], [LT(p) - .12, "sit"], [LE(p) + .15, "cheer"]] : [[s.t0, "sit"], [tA, "surprised"], [tA + 1.6, "cheer"]], nohop: true }) + (hp ? say(p, 400, 640, t, { size: 44, tail: -170, maxW: 500 }) : "")
    + sMomo(t, { in: s.t0 + .2, poses: [[s.t0, "sit"], [tk, "cheer"]] }) + coin(t, tOne, 1290, 150, "+1", "if you showed one finger") + HUD(t); };

/* ============ 6 · Mark Sentence 1: flexibility (Basil); 7 · Mark Sentence 2: flexible or rigid (Momo, the two trays) ============ */
const bentBand = (t) => { const R = "j602", tb = W(R, "bend") - .05, f = t >= tb ? eio((t - tb) / .9) : 0, tw_ = W(R, "breaking") - .05; return TF(1150, 950, .46, bandSvg(f, 0, { sw: 40 })) + (t >= tw_ ? TF(1330, 930, spring(t, tw_, .4), tickBadge(34)) : ""); };
SC.mark1 = (t, s) => markScene(t, s, { id: "j602", sayId: "j601", who: "basil", n: "1 of 2", text: "The flexibility of a material is its ability to bend without breaking.", keys: ["flexibility", "bend", "without", "breaking."], size: 66, y: 220, footer: FOOT, extra: bentBand(t) });
const onFlex = () => `<g transform="translate(0 -92) scale(.42 .2)">${bandSvg(0, 0, { sw: 40 })}</g>`, onRigid = () => `<g transform="translate(0 -98) scale(.38 .3)">${stickSvg({ snap: .5 })}</g>`;
// the two trays stand side by side (x1, x2, y = their feet; sc); they slide in low at t0; the band hops onto the green one, the two pieces of the stick are slid onto the blue one
const trays2 = (t, t0, x1, x2, y, sc = 1, o = {}) => { const [a, da] = slideX(t, t0, .6, -500, x1, y), [b, db] = slideX(t, t0 + .2, .6, 2400, x2, y), tb = t0 + .9, ts = t0 + 1.3, hb = hop(t, tb, .4), bk = t >= tb ? Math.min(1, spring(t, tb, .4)) : 0, sk = eio((t - ts) / .5);
  return (t >= t0 ? da + TF(a, y, sc, ansTray("FLEXIBLE", (o.backA || "") + (bk > 0 ? `<g transform="translate(0 ${n2(-80 * hb)}) scale(${n2(bk)})">${onFlex()}</g>` : ""))) : "") + (t >= t0 + .2 ? db + TF(b, y, sc, ansTray("RIGID", (o.backB || "") + (sk > 0 ? `<g transform="translate(${n2(260 * (1 - sk))} 0)" opacity="${n2(Math.min(1, sk * 3))}">${onRigid()}</g>` : ""))) : ""); };
SC.mark2 = (t, s) => markScene(t, s, { id: "j702", sayId: "j701", who: "momo", n: "2 of 2", text: "Materials that bend easily without breaking are flexible. Materials that break easily when bent are rigid.", keys: ["bend", "easily", "without", "breaking", "flexible.", "break", "when", "bent", "rigid."], size: 54, y: 150, w: 900, footer: FOOT,
  extra: trays2(t, s.t0 + .5, 940, 1400, 1058, .92) });
const TRX = [430, 800], RIGX = 1180;
const trayBench = (t, o = {}, cam = CAMD) => playView(t, { items: (o.under || "") + trays2(t, o.t0 === undefined ? -9 : o.t0, TRX[0], TRX[1], TYP + 14, .74) + (o.rig ? TF(RIGX, TYP + 4, .74, tubeRig(o.rig)) : "") + (o.more || ""), board: { glow: -1 }, boardX: 1600, boardS: .44, ...o }, cam);
SC.tiles = (t, s) => { const L = "j703", h = HAS(L), t1 = h ? W(L, "rubber") - .2 : s.t0 + .2, t2 = h ? W(L, "ceramic") - .2 : s.t0 + .8, tf = h ? W(L, "flexible") - .1 : 1e9, tr = h ? W(L, "rigid") - .1 : 1e9, BY = TYP - 62;
  const brd = (nm, i, t0, lab) => { if (t < t0) return ""; const [bx, ds] = slideX(t, t0, .55, i ? 2300 : -400, TRX[i], BY); return ds + picBoard(nm, bx, BY - 30 * hop(t, t0 + .55, .3), 1, { sc: .6, lab, size: 34, id: "t" + i }) + (t >= [tf, tr][i] ? TF(bx + 40, BY - 236, spring(t, [tf, tr][i], .45), `<g transform="rotate(-5)">${tpill(0, 0, ["bends", "breaks when bent"][i], 30, [GOODC, WEAKC][i], "#fff", { w: 700 })}</g>`) : ""); };
  return trayBench(t, { under: brd("rtile", 0, t1, "a rubber tile") + brd("ctile", 1, t2, "a ceramic tile") })
    + sPip(t) + sBasil(t) + sMomo(t, { poses: [[s.t0, "sit"], [t1, "pointing"], [t2 + 1.5, "sit"]] }) + HUD(t); };

/* ============ 8 · be a rubber band: the dive (the journey itself is SC.shrink in shrink.js); the pull-out ============ */
SC.waitw = (t, s) => { const L = "j801", dive = ei((t - (s.t1 - .6)) / .6), e = eio((t - s.t0) / .9), FX = TRX[0], FY = TYP - 60, cam = [lerp(CAMD[0], 1.8, e) + 5 * dive, lerp(960, FX, Math.max(e * .8, dive)), lerp(600, FY, Math.max(e, dive))], tP = W(L, "be") - .2;
  return trayBench(t, { under: picBoard("rtile", TRX[0], TYP - 62, 1 - ramp(t, s.t0, .3), { sc: .6, lab: "a rubber tile", size: 34, id: "t0" }) + picBoard("ctile", TRX[1], TYP - 62, 1 - ramp(t, s.t0, .3), { sc: .6, lab: "a ceramic tile", size: 34, id: "t1" }) }, cam)
    + OP(1 - dive, buddy("pip", 1600, 1064, 160, t, { aura: true, flip: true, tag: false, in: s.t0 + .1, poses: [[s.t0, "pointing"], [s.t0 + 1.6, "sit"]] }) + buddy("basil", 1800, 1064, 160, t, { aura: true, flip: true, tag: false, in: s.t0 + .2, poses: [[s.t0, "sit"], [tP, "cheer"]], nohop: true })
      + (t >= tP ? TF(1180, 250, spring(t, tP, .45), tpill(0, 0, "Be a rubber band!", 70, P.sun, P.ink, { w: 700 })) : "") + HUD(t))
    + wipe(t, s.t1, "#F0C89A", gx(cam, FX), gy(cam, FY - 20)); };
const CAMR = [1.5, RIGX, 900], RIGXY = [gx(CAMR, RIGX), gy(CAMR, TYP - 150)];
SC.pullout = (t, s) => { const j = "j807", e = eo((t - s.t0) / 1.0), cam = [lerp(3.0, CAMD[0], e), lerp(TRX[0], 960, e), lerp(TYP - 60, 600, e)], hj = HAS(j);
  return trayBench(t, { rig: [0, 0, 0] }, cam) + buddy("basil", 180, 1062, 220, t, { aura: true, in: s.t0 + .4, poses: hj ? [[s.t0, "sit"], [LE(j) + .1, "cheer"]] : [[s.t0, "cheer"]], nohop: true }) + (hj ? say(j, 420, 660, t, { size: 46, tail: -170, maxW: 520 }) : "")
    + sMomo(t, { in: s.t0 + .5 }) + wipe(t, s.t0, "#F0C89A") + HUD(t); };

/* ============ 9 · [LOOK CLOSER] three tubes: most and least flexible; the book's sentences (3.16a) on the strips; the verdict ============ */
SC.lctubes = (t, s) => lookCloser(t, s, { tz: s.t0, fx: gx(CAMD, RIGX), fy: gy(CAMD, TYP - 150), art: tubesArt, bgc: "#FFF3DC", set: (tt) => trayBench(tt, { rig: [0, 0, 0] }),
  verdict: [["Rubber: the most flexible", "Metal: the least flexible"], "#3B2A8C", { sub: "among the three tubes" }], tv: MK("v_tubes"),
  over: (tt) => lcStrip(tt, "j902", "Rubber tubes can bend more than plastic tubes without breaking.", { size: 40, y: 228 }) + lcStrip(tt, "j902", "Plastic tubes can bend more than metal tubes without breaking.", { size: 40, y: 306, off: 10 }) });

/* ============ 10 · Showdown: Momo's notes (double points) ============ */
const NOTES = [1010, 1066, .8], RX = 235, RY = 520;
const showView = (t, o = {}) => bg("playground") + swingSeat(t) + catOnRail(t) + `<rect width="1920" height="1080" fill="${P.night}" opacity=".3"/>` + TF(NOTES[0], NOTES[1], NOTES[2], momoNotes(t, o));
SC.show = (t, s) => { const a = "j1001", b = "j1002", r0 = MK("ring0_show"), bell = MK("bell_show"), rs = ringState(t, r0, 6);
  const tr = [W(a, "one"), W(a, "two"), W(a, "three")], tcn = [W(b, "one", 1), W(b, "two"), W(b, "three")], tB = LT("j1004"), tPi = LT("j1005"), hO = HAS("j1006"), tO = hO ? LT("j1006") - .1 : LE("j1005") + .1;
  const lit = [0, 1, 2].map((i) => t < LT(b) ? (t >= tr[i] - .1 && t < (tr[i + 1] || LE(a)) - .1 ? 1 : 0) : 0), badge = [0, 1, 2].map((i) => Math.max(pulse(t, tcn[i], .04, .5), t >= r0 && t < bell ? (Math.floor((t - r0) / .5) % 3 === i ? .5 + .5 * rs.tick : 0) : 0));
  const nf = t >= tcn[2] - .1 ? 3 : t >= tcn[1] - .1 ? 2 : 1, ringOn = t >= tcn[0] - .3 && t < bell + .8;
  return showView(t, { lit, badge, x: spring(t, tB + .6, .4) })
    + buddy("momo", 1740, 1060, 230, t, { aura: true, flip: true, in: s.t0 + .1, poses: [[s.t0, "cheer"], [LT(a) - .12, "sit"], [LE(a) + .2, "thinking"], [tO, "oops"]], nohop: true }) + (t < LT(b) - .2 ? say(a, 1660, 590, t, { size: 32, tail: 60, maxW: 380 }) : "") + (hO ? say("j1006", 1620, 700, t, { size: 46, tail: 100 }) : "")
    + (ringOn ? OP(1 - ss(bell + .5, bell + .8, t), TF(RX, RY, spring(t, tcn[0] - .3, .4), `<g transform="translate(${-RX} ${-RY})">${ringTimer(RX, RY, t < r0 ? 1 : rs.frac, t < r0 ? 6 : rs.secs, t, { R: 128, sw: 22, tick: rs.tick, shut: pulse(t, bell, .01, .6), inner: TF(RX, RY + 60, .62, countHand(nf)) })}</g>`) + youPill(RX, RY - 178, 1.0) + tpill(RX, RY + 222, "line 1, 2 or 3?", 30, P.ink, "#fff")) : "")
    + (t >= bell + .9 ? buddy("basil", 150, 1062, 200, t, { aura: true, in: bell + .9, poses: [[bell + .9, "arms_crossed"], [tB - .12, "sit"], [LE("j1004") + .1, "cheer"]], nohop: true }) + pickNum("basil", 290, 990, t, tB - .1, "2") + buddy("pip", 150, 760, 170, t, { aura: true, in: bell + 1.0, poses: [[bell + 1, "thinking"], [tPi - .12, "sit"], [LE("j1005") + .1, "pointing"]] }) + pickNum("pip", 270, 700, t, tPi - .1, "2")
      + say("j1004", 330, 860, t, { size: 38, tail: -150, maxW: 470 }) + say("j1005", 330, 520, t, { size: 38, tail: -150, maxW: 470 }) : "")
    + stamp(t, LT("j1003") - .08, 700, 420) + bellIcon(t, r0) + HUD(t); };
const replay = (x, y, k, inner, lab, col) => k < .02 ? "" : TF(x, y, k, `<g filter="url(#dropS)"><circle r="118" fill="#FFF8EA" stroke="${col}" stroke-width="8"/></g>${inner}` + tpill(0, 140, lab, 38, col, "#fff", { w: 700 }));
SC.fix = (t, s) => { const a = "j1007", b = "j1008", tBe = W(a, "bends") - .2, tTe = W(a, "tears") - .2, tFl = W(a, "flexible") - .1, tS = W(a, "strong", 1) - .2, tTwo = W(b, "two") - .1;
  const bend = 20 + 6 * Math.sin(t * 2.5);
  return showView(t, { fixing: true, rub: ramp(t, tFl - .5, .4), write: clamp((t - tFl) / .9), tick: t >= tFl + 1 ? spring(t, tFl + 1, .4) : 0 })
    + replay(235, 330, spring(t, tBe, .45), `<g transform="translate(-14 0)">${stripSvg("paper", { x: 0, y0: -84, y1: 84, w: 54, bend })}</g><g transform="translate(${n2(30 - bend * .6)} 0) scale(.34)">${gloveFinger()}</g>`, "bends easily", GOODC)
    + replay(235, 690, spring(t, tTe, .45), `<g transform="translate(0 -6)">${stripSvg("paper", { x: 0, y0: -84, y1: 60, w: 54, tear: 1, gap: 12 })}</g><g transform="translate(0 66) scale(.7)">${hangerSvg(3, { rod: 30 })}</g>`, "tears easily", WEAKC)
    + (t >= tS ? TF(930, 180, spring(t, tS, .45), `<g filter="url(#drop)"><rect x="-560" y="-52" width="1120" height="104" rx="24" fill="url(#gPaper)"/><rect x="-560" y="-52" width="16" height="104" rx="8" fill="${P.sun}"/></g>${T(8, 17, "Strong and flexible are two different properties.", 46, P.ink)}`) : "")
    + buddy("momo", 1740, 1060, 230, t, { aura: true, flip: true, poses: [[s.t0, "oops"], [tFl + 1, "cheer"]], nohop: true }) + coin(t, tTwo, 1560, 420, "+2", "if you showed two fingers") + HUD(t); };

/* ============ 11 · the chant: call and response (common.js chantScene); the board OUR 3 TESTS behind the buddies, each line's picture flashes ============ */
const chantPics = (flash) => [TF(-52, 0, .8, eyeIcon(1)) + TF(52, 0, .8, counterIcon(1, 1)), `<g transform="scale(.8)">${PROP5[0][1]()}</g>`, `<g transform="scale(.34)">${bandSvg(1, 0, { sw: 44 })}</g>`].map((pic, i) => flash[i] > .03 ? TF(1560, 330 + i * 150, .6 + .5 * flash[i], OP(Math.min(1, flash[i] * 2), `<g filter="url(#dropS)"><circle r="92" fill="#FFF8EA" stroke="${P.sun}" stroke-width="8"/></g>${pic}`)) : "").join("");
SC.chant = (t, s) => chantScene(t, s, "c1003", { sayId: "u1002", size: 52, x: 800, board: (tt, flash) => TF(240, 1060, .44, board3(tt, { glow: -1 })) + chantPics(flash) });

/* ============ 12 · score hand, the caterpillar ============ */
SC.final = (t, s) => { const L = "j1201"; return finalScene(t, s, L, 1, [[s.t0, null, 1], [W(L, "three") - .1, null, 3]]); };
SC.liz = (t, s) => { const L = "j1202", tN = W(L, "handrail") - .3, c = catXY(t);
  return lizReveal(t, s, L, trayBench(t, {}, CAMD), gx(CAMD, c[0]), gy(CAMD, c[1]), 1e9, "", 160, 130, 70, 1.9)
    + (t >= tN ? TF(1120, 190, spring(t, tN, .45), tpill(0, 0, "On the handrail of the slide!", 50, P.sun, P.ink, { w: 700 })) : ""); };

/* ============ 13 · the dare for Episode 10 ============ */
SC.dare = (t, s) => { const a = "j1301", b = "j1302", tSp = W(a, "spoon") - .3, tSk = W(a, "sinks") - .1, tSh = W(a, "ship") - .5, tFo = W(a, "floats") - .1, tQ = W(a, "what") - .15, tc = [W(a, "one") - .1, W(a, "two") - .1, W(a, "three") - .1], tL = W(a, "lock") - .1, DX = [870, 1400], hb = HAS(b);
  const brd = (name, i, t0, tag2, t2, col) => { if (t < t0) return ""; const [bx, ds] = slideX(t, t0, .6, 2500, DX[i], 640); return ds + picBoard(name, bx, 640, 1, { sc: .95, id: "d" + i })
    + TF(bx - 110, 318, spring(t, t0 + .7, .4), `<g transform="rotate(-8)">${tpill(0, 0, "metal", 36, "#5E6B7C", "#fff", { w: 700 })}</g>`) + (t >= t2 ? TF(bx + 96, 318, spring(t, t2, .4), `<g transform="rotate(6)">${tpill(0, 0, tag2, 36, col, "#fff", { w: 700 })}</g>`) : ""); };
  return bg("playground") + swingSeat(t) + `<rect width="1920" height="1080" fill="#FFF8EA" opacity=".4"/>` + brd("spoonTub", 0, tSp, "sinks", tSk, WEAKC) + brd("ship", 1, tSh, "floats", tFo, GOODC)
    + (t >= tQ ? TF(DX[1] + 20, 560, spring(t, tQ, .5) * (1 + .06 * Math.sin(t * 5)), `<g filter="url(#dropS)"><circle r="46" fill="url(#gSun)"/></g>${T(0, 24, "?", 70, P.ink)}`) : "")
    + ["Wood", "Air", "More metal"].map((txt, i) => TF(790 + i * 250, 880, .58 * spring(t, tc[i], .45), ansCard(i + 1, txt, { w: 300, pulse: t >= tL ? (Math.floor((t - tL) / .5) % 3 === i ? .8 : 0) : pulse(t, tc[i], .04, .5) }))).join("")
    + TF(1140, 96, slamK(t - s.t0, .15), `<g transform="rotate(-2)"><g filter="url(#drop)"><rect x="-130" y="-38" width="260" height="76" rx="38" fill="${P.coral}"/><rect x="-122" y="-30" width="244" height="60" rx="30" fill="none" stroke="#fff" stroke-width="5"/></g>${T(0, 17, "NEXT", 46, "#fff", { ls: 8 })}</g>`)
    + TF(1140, 186, spring(t, s.t0 + .5, .45), tpill(0, 0, "Float or sink?", 58, P.ink, "#fff", { w: 700 })) + (t >= tL ? TF(1140, 1040, spring(t, tL, .45) * (1 + .03 * Math.sin(t * 8)), tpill(0, 0, "Lock in your answer!", 38, P.sun, P.ink, { w: 700 })) : "")
    + buddy("basil", 270, 1056, 330, t, { aura: true, in: s.t0 + .1, poses: hb ? [[s.t0, "sit"], [tFo, "surprised"], [LT(b) - .1, "sit"], [LE(b) + .1, "surprised"]] : [[s.t0, "sit"], [tFo, "surprised"]], nohop: true }) + (hb ? say(b, 360, 500, t, { size: 44, tail: -60, maxW: 520 }) : "") + HUD(t); };

/* ============ 15 · "Now you know!": the two trays FLEXIBLE and RIGID stand centred between the buddies ============ */
SC.nyk = (t, s) => nykScene(t, s, TF(690, 1046, .9, ansTray("FLEXIBLE", onFlex())) + TF(1050, 1046, .9, ansTray("RIGID", onRigid())), { bx: [200, 1715, 1375], hx: 470 });
})(); }
