// p1.js: PART 1, "Paper vs Fabric: We Hung Weights Until One TORE!": physical property, strength, strong and fragile.
// Segments 1-14 of p3_ep09_script.md (version 1, 21 Nov 2026; the teacher's answers in its section 12).
// STAGE 2 (drawn): the set and props are in voiddeck.js, the look-closer pictures in closer.js, the journey (SC.shrink) in shrink.js.
if (PART === 1) { (() => {
const L1 = "g601";
// the scores (script section 3): Round 1 1 : 1, HOLD ON! 2 : 1
SCORE.push([W("g707", "one") - .1, 1, 1]);
SCORE.push([W("g1003", "one") - .1, 2, 1]);
const FOOT = "P3 · Diversity of Materials · Physical properties";
const pipR = (t, o = {}) => buddy("pip", 1668, 1064, 150, t, { aura: true, tag: false, flip: true, ...o });   // Pip beside Momo when Basil is big at the left

/* ============ 1 · the silent cold open: the void deck of an HDB block ============ */
const PBX = [1420, 1650], PBY = TYD - 62;                // EP8's two picture boards at the back of the table
const dareBoards = (t, tb, o = {}) => [["band1", "rubber", MATK.rubber.col], ["stick", "wood", MATK.wood.col]].map(([nm, tg, col], i) => { const t0 = tb + i * .45; if (t < t0) return ""; const [bx, ds] = slideX(t, t0, .7, 2400, PBX[i], PBY);
  return ds + picBoard(nm, bx, PBY, 1, { sc: .56, id: "c" + i }) + (t >= t0 + .8 ? TF(bx - 70, PBY - 196, spring(t, t0 + .8, .4), `<g transform="rotate(-8)">${tpill(0, 0, tg, 30, col, "#fff", { w: 700 })}</g>`) : ""); }).join("");
// the thumbnail's frame (thumb_still.js ... "&thumb"): the two strips on the stand, the paper strip's tear opening at 3, the fabric strip whole; Momo surprised
const THUMB1 = (t) => { const cam = [1.72, 1180, 760]; return deckView(t, { spider: false, stand: { paper: { n: 3, tear: .62, count: false }, fabric: { n: 3, taut: 1, count: false } } }, cam) + TF(gx(cam, DK.stand - 250), gy(cam, TYD - 270), 1.5, counterPill(3, 0, 1))
  + buddy("momo", 215, 800, 250, t, { aura: true, tag: false, pose: "surprised", still: true }) + logo(t); };
SC.cold = (t, s) => { if (location.search.includes("thumb")) return THUMB1(t); const tb = MK("boardsIn"), tp = MK("budsIn"), z = 1.02 + .02 * eio(t / 7);
  return deckView(t, { bag: true, tray: true, stand: {}, flat: true, back: dareBoards(t, tb) }, [z, 960, 600])
    + sPip(t, { in: tp, poses: [[tp, "waving"], [tp + 1.4, "sit"]], wave: true }) + sBasil(t, { in: tp + .25, poses: [[tp + .25, "surprised"]] }) + sMomo(t, { in: tp + .45, poses: [[tp + .45, "cheer"], [tp + 1.6, "sit"]] })
    + OP(1 - ramp(t, tb + 1.6, .3), lowerPill(60, 60, "The void deck of an HDB block,", "Singapore")); };

/* ============ 2 · "Last time...": two calm pictures (EP8's art, reused), each held >= 2.5 s, one label each; then OUR 3 TESTS; then the title ============ */
SC.lasttime = (t, s) => { const L = "g201", t2 = W(L, "and") - .2, pic = (k, inner, lab) => k < .02 ? "" : OP(k, inner + TF(960, 990, spring(t, t2 > t ? s.t0 + .3 : t2 + .5, .4), tpill(0, 0, lab, 46, P.sun, P.ink, { w: 700 })));
  const k1 = ramp(t, s.t0 + .1, .5) * (1 - ramp(t, t2, .4)), k2 = ramp(t, t2 + .2, .5), z1 = 1 + .04 * eio((t - s.t0) / 6), z2 = 1 + .04 * eio((t - t2) / 6);
  return bg("stage2") + OP(ramp(t, s.t0, .3), T(960, 110, "Last time…", 60, "#fff", { w: 600 }))
    + pic(k1, `<g transform="translate(960 560) scale(${n2(z1)}) translate(-960 -560)">${TF(960, 930, .9, board7(t, { full: () => 1 }))}</g>`, "The 7 materials")
    + pic(k2, `<g transform="translate(960 560) scale(${n2(z2)}) translate(-960 -560)">${picBoard("band1", 700, 640, 1, { sc: 1.05, lab: "a rubber band", size: 40, id: "r1" })}${picBoard("stick", 1220, 640, 1, { sc: 1.05, lab: "a wooden ice-cream stick", size: 28, id: "r2" })}`
      + [["The rubber band", 0], ["The ice-cream stick", 1]].map(([txt, i]) => TF([700, 1220][i], 830, .5 * spring(t, t2 + .5 + i * .2, .45), ansCard(i + 1, txt, { w: 360 }))).join("") + `</g>`, "Which one can bend without breaking?")
    + HUD(t); };
// the table as it stands for the tests: the bag, the tray of weights, the stand, the two strips lying flat; the board OUR 3 TESTS slides in low
const testsView = (t, tB, glow, o = {}) => { const [bx, ds] = slideX(t, tB, .7, 2400, DK.board, TYD + 20);
  return deckView(t, { bag: true, tray: true, stand: {}, flat: true, items: t >= tB ? ds + TF(bx, TYD + 20, .5, board3(t, { glow })) : "", ...o }, CAMD); };
SC.tests = (t, s) => { const a = "g202", b = "g203", tB = W(b, "we") - .1, tG = W(b, "pull") - .1;
  return testsView(t, tB, t >= tG ? 0 : -1) + buddy("basil", 140, 1062, 200, t, { aura: true, in: s.t0 + .1, poses: [[s.t0, "cheer"], [LT(a) - .12, "sit"], [LE(a) + .15, "cheer"], [LE(a) + 2.2, "sit"]], nohop: true }) + say(a, 470, 600, t, { size: 46, tail: -250, maxW: 600 })
    + pipR(t, { in: s.t0 + .2 }) + sMomo(t, { in: s.t0 + .3 }) + (t >= LT(b) ? TF(960, 190, spring(t, LT(b), .45), tpill(0, 0, "Hold on to your answer!", 54, P.ink, "#fff", { w: 700 })) : "") + HUD(t); };
SC.title = (t, s) => { const u = t - MK("title"), dim = clamp(u / .2);
  return testsView(t, -9, 0) + buddy("basil", 140, 1062, 200, t, { aura: true, pose: "arms_crossed" }) + pipR(t) + sMomo(t)
    + `<rect width="1920" height="1080" fill="${P.night}" opacity="${n2(.68 * dim)}"/>` + slamLine(400, "PAPER vs FABRIC", 170, "#fff", slamK(u, .05)) + slamLine(600, "WHICH ONE TEARS?", 150, P.sun, slamK(u, .45)) + HUD(t); };

/* ============ 3 · the game, and the hidden spider; 4 · goals (Momo reads) and the countdown (count is in common.js) ============ */
SC.game = (t, s) => gameScene(t, s, "g301", true);
SC.goals = (t, s) => goals3(t, s, [["What a physical property is", icoProperty()], ["What strength means", TF(0, 4, .92, icoStrength())], ["Strong or fragile", icoCups()]], ["g401", "g402", "g403", "g404"], "momo");

/* ============ 5 · what is a physical property? the paper strip; [LOOK CLOSER]; Mark Sentence 1 (Pip); the five properties ============ */
const CAMS = [1.5, 960, 760], CAMS2 = [1.58, 960, 760], STRIPXY = [gx(CAMS2, DK.stand - 120 * .82), gy(CAMS2, TYD - 310 * .82)];
SC.strip = (t, s) => { const L = "g501", tIn = s.t0 + .1, u = eio((t - tIn) / .8), tGo = tIn + 1.05, tT = W(L, "strip") - .1, zin = eio((t - W(L, "look")) / 1.6), cam = [lerp(CAMS[0], CAMS2[0], zin), 960, 760];
  const hx = DK.stand - 120 * .82 - 760 * (1 - u) - 800 * ei((t - tGo) / .6), hand = t < tGo + .7 ? `<g transform="translate(${n2(hx - 30)} ${TYD - 440 * .82}) scale(-.62 .62)">${glovePinch(t > tGo ? 1 : 0)}</g>` : "";
  return deckView(t, { tray: true, stand: { paper: u >= 1 ? { count: false } : false }, items: (u < 1 ? TF(DK.stand - 760 * (1 - u), TYD, .82, stripSvg("paper", { x: -120, y0: STD.y0, y1: STD.y1, w: STD.w })) : "") + hand }, cam)
    + (t >= tT ? ltag(t, tT, 520, 400, "a strip of paper", gx(cam, DK.stand - 150 * .82), gy(cam, TYD - 330 * .82), { size: 44 }) : "") + sMomo(t, { poses: [[s.t0, "sit"], [tT, "pointing"]] }) + HUD(t); };
SC.lcpaper = (t, s) => lookCloser(t, s, { tz: s.t0, fx: STRIPXY[0], fy: STRIPXY[1], art: paperArt, verdict: [["A PHYSICAL PROPERTY:", "measure or observe"], "#3B2A8C"], tv: MK("v_property") });
const mark1x = (t) => { const R = "g506", tm = W(R, "measure") - .05, to = W(R, "observe") - .05; return wordChip(1010, 900, counterIcon(t >= tm ? 1 : 0, 1), "measure", t >= tm ? .3 + .7 * pulse(t, tm, .05, 1) : 0, t) + wordChip(1330, 900, eyeIcon(t >= to ? 1 : 0), "observe", t >= to ? .3 + .7 * pulse(t, to, .05, 1) : 0, t); };
SC.mark1 = (t, s) => markScene(t, s, { id: "g506", sayId: "g505", who: "pip", n: "1 of 2", text: "The physical property of a material is something that you can measure or observe.", keys: ["physical", "property", "measure", "observe."], size: 66, y: 220, footer: FOOT, extra: mark1x(t) });
SC.five = (t, s) => { const L = "g507", ws = ["strength", "flexibility", "float", "waterproof", "transparency"].map((w) => W(L, w) - .1), tT = HAS("g508") ? LT("g508") - .05 : 1e9; let tiles = "";
  for (let i = 0; i < 5; i++) { const tin = s.t0 + .15 + i * .1, k = spring(t, tin, .5), on = t >= ws[i], lit = on ? .25 + .75 * pulse(t, ws[i], .05, .9) : 0, today = t >= tT ? ss(tT, tT + .3, t) : 0;
    tiles += TF(330 + i * 315, 560 - 200 * (1 - eo((t - tin) / .3)), k * (1 + .06 * (on ? pulse(t, ws[i], .05, .6) : 0) + (i < 2 ? .06 * today : 0)), propTile(i, i < 2 ? Math.max(lit, today * (.7 + .2 * Math.sin(t * 5))) : lit * (1 - today), on ? (i >= 2 ? today : 0) : .75)); }
  return bg("stage2") + `<g filter="url(#drop)"><rect x="130" y="360" width="1660" height="400" rx="44" fill="url(#gPaper)"/><rect x="130" y="360" width="16" height="400" rx="8" fill="${P.sun}"/></g>` + tiles
    + (t >= tT ? TF(645 - 157, 300, spring(t, tT, .45), tpill(0, 0, "Today: the first two!", 46, P.sun, P.ink, { w: 700 })) : "") + buddy("pip", 200, 1062, 210, t, { aura: true, in: s.t0 + .2, poses: [[s.t0, "pointing"], [s.t0 + 1.8, "sit"], [tT, "cheer"]], nohop: true }) + HUD(t); };

/* ============ 6 · Round 1: paper or fabric? (the clue tag sits on top of the ring and stays through the countdown) ============ */
const ring2 = (tt) => `<g clip-path="url(#cRing)"><rect x="240" y="596" width="380" height="80" fill="url(#vdStone)"/><path d="M240 596 H620" stroke="#fff" stroke-width="4" opacity=".8"/>${TF(430, 612, .56, testStand({ paper: { count: false }, fabric: { count: false } }))}<path d="M322 371 H538 M322 506 H538" stroke="${P.ink}" stroke-width="3" stroke-dasharray="8 6" opacity=".6"/></g>`;
SC.r1 = (t, s) => lockN(t, { cards: ["Paper", "Fabric", "The same"], tag: "same length · same thickness", q: "Which strip holds more weights?", tq: W(L1, "which") - .1, tc: [W(L1, "one", 1), W(L1, "two", 1), W(L1, "three")], ring0: MK("ring0_r1"), dur: 5, lock: "g602",
  obj: ring2, picks: [{ who: "momo", id: "g603", word: "3", x: true }, { who: "basil", id: "g604", word: "2" }, HAS("g605") ? { who: "pip", id: "g605", word: "2" } : { who: "pip", word: "2", fixed: true }],
  react: [[LE("g603") + .1, "momo", "thinking"], [LE("g604") + .1, "basil", "cheer"], ...(HAS("g605") ? [[LE("g605") + .1, "pip", "pointing"]] : [])] });

/* ============ 7 · test one: PULL. [LOOK CLOSER] the slow pull test, then the two bars and the verdict; the answer ============ */
const CAMP = [1.25, 960, 820], PULLXY = [gx(CAMP, DK.stand - 120 * .82), gy(CAMP, TYD - 310 * .82)];
const pullView = (t, st, o = {}, cam = CAMP) => deckView(t, { bag: true, stand: st, ...o }, cam);
SC.lcpull = (t, s) => lookCloser(t, s, { tz: s.t0, fx: PULLXY[0], fy: PULLXY[1], art: pullArt, set: (tt) => pullView(tt, { paper: { tag: true }, fabric: { tag: true } }), verdict: ["FABRIC: STRONGER THAN PAPER", GOODC], tv: MK("v_stronger") });
const DONE = { paper: { n: 3, tear: 1, gap: 32 }, fabric: { n: 8, taut: 1 } };
SC.pullans = (t, s) => { const m = "g706", h = "g707", tOne = W(h, "one") - .1, lit = spring(t, s.t0 + .5, .45), hm = HAS(m);
  return pullView(t, DONE) + TF(1560, 430, .68 * spring(t, s.t0 + .15, .45), ansCard(2, "Fabric", { lit }))
    + buddy("momo", 1640, 1062, 250, t, { aura: true, flip: true, in: s.t0 + .1, poses: hm ? [[s.t0, "surprised"], [LT(m) - .12, "sit"], [LE(m) + .15, "cheer"]] : [[s.t0, "surprised"], [s.t0 + 1.6, "cheer"]], nohop: true }) + (hm ? say(m, 1530, 700, t, { size: 40, tail: 110, maxW: 440 }) : "")
    + sPip(t, { in: s.t0 + .2 }) + coin(t, tOne, 1560, 220, "+1", "if you showed two fingers") + HUD(t); };

/* ============ 8 · be a thread: the dive (the journey itself is SC.shrink in shrink.js) ============ */
const THREADC = "#F3E4C0";
SC.waitw = (t, s) => { const L = "g801", dive = ei((t - (s.t1 - .6)) / .6), e = eio((t - s.t0) / .9), FX = DK.bag, FY = TYD - 100, cam = [lerp(CAMP[0], 1.9, e) + 5 * dive, lerp(960, FX, Math.max(e * .8, dive)), lerp(820, FY, Math.max(e, dive))], tP = W(L, "be") - .2;
  return deckView(t, { bag: true, stand: DONE }, cam)
    + OP(1 - dive, buddy("basil", 1600, 1064, 160, t, { aura: true, flip: true, tag: false, in: s.t0 + .1, poses: [[s.t0, "sit"], [tP, "cheer"]], nohop: true }) + buddy("momo", 1800, 1064, 160, t, { aura: true, flip: true, tag: false, in: s.t0 + .2, poses: [[s.t0, "pointing"], [s.t0 + 1.6, "sit"]] })
      + (t >= tP ? TF(1180, 250, spring(t, tP, .45), tpill(0, 0, "Be a thread!", 76, P.sun, P.ink, { w: 700 })) : "") + HUD(t))
    + wipe(t, s.t1, THREADC, gx(cam, FX), gy(cam, FY)); };

/* ============ 9 · pull back out; Mark Sentence 2 (Basil); tick 1 PULL ============ */
SC.pullout = (t, s) => { const L = "g901", e = eo((t - s.t0) / 1.0), cam = [lerp(3.0, 1.3, e), lerp(DK.bag, 760, e), lerp(TYD - 110, 800, e)], tS = W(L, "strength") - .1;
  return deckView(t, { bag: 1, stand: DONE, back: glowDisc(DK.bag, TYD - 110, 190, .5 + .2 * Math.sin(t * 3)) }, cam)
    + buddy("basil", 1500, 1060, 220, t, { aura: true, flip: true, in: s.t0 + .5, poses: [[s.t0, "sit"], [tS, "cheer"]], nohop: true }) + buddy("momo", 1740, 1060, 220, t, { aura: true, flip: true, in: s.t0 + .6, poses: [[s.t0, "sit"], [tS, "cheer"]] })
    + wipe(t, s.t0, THREADC) + HUD(t); };
const pushPull = (t) => { const R = "g903", t1 = W(R, "pulled") - .05, t2 = W(R, "pushed") - .05, one = (x, t0, pic, lab) => { const on = t >= t0, l = on ? pulse(t, t0, .05, 1.0) : 0; return TF(x, 930, (1 + .1 * l), OP(on ? 1 : .5, (l > .05 ? `<circle r="112" fill="${P.sun}" opacity="${n2(.7 * l)}" filter="url(#b10)"/>` : "") + pic + tpill(0, 118, lab, 40, on ? P.ink : "#fff", on ? "#fff" : P.ink, { w: 700 }))); };
  return one(900, t1, pullPic(), "pulled") + one(1180, t2, pushPic(t >= t2 ? pulse(t, t2, .05, .6) : 0), "pushed"); };
SC.mark2 = (t, s) => markScene(t, s, { id: "g903", sayId: "g902", who: "basil", n: "2 of 2", text: "The strength of a material is its ability to be pulled or pushed without breaking or tearing.", keys: ["strength", "pulled", "or", "pushed", "without", "breaking", "tearing."], size: 60, y: 190, w: 940, footer: FOOT,
  extra: pushPull(t) + TF(1620, 1056, .5, board3(t, { glow: t >= MK("tick1") - .6 && t < MK("tick1") + 1.2 ? 0 : -1 })) });

/* ============ 10 · test two: DROP, and HOLD ON! ============ */
const CUPX = [900, 1060], CARDX = 560, RG = [1330, 372];
const dropTable = (t, o = {}) => deckView(t, { stand: false, board: { glow: 1 }, ...o }, CAMD);
const cupTags = (t, t0) => ["metal", "glass"].map((nm, i) => TF(gx(CAMD, CUPX[i]), gy(CAMD, TYD - 150), spring(t, t0 + i * .15, .4), tpill(0, 0, nm, 38, "#fff", P.ink, { w: 700 }))).join("");
SC.drop = (t, s) => { const a = "g1001", b = "g1002", c = "g1003", d = "g1004", r0 = MK("ring0_hold"), bell = MK("bell_hold"), rs = ringState(t, r0, 5), tX = W(b, "cross") - .15, tH = W(b, "hold") - .1, tOne = W(c, "one") - .1, tNv = W(c, "never") - .15, tBg = W(c, "broken") - .1, ring = t >= tX && t < bell + .8, hd = HAS(d);
  const cups = TF(CUPX[0], TYD + 12, .9, metalCup()) + glowDisc(CUPX[1], TYD - 40, 110, pulse(t, W(a, "glass") - .1, .1, 1.6)) + TF(CUPX[1], TYD + 12, .9, glassCup(0));
  return dropTable(t, { items: cups + (t >= tNv ? TF(CARDX, TYD + 24, .5 * spring(t, tNv, .45), safetyCard(t >= tBg ? ramp(t, tBg, .3) : 0)) : "") }) + cupTags(t, s.t0 + .3)
    + buddy("basil", 190, 1060, 250, t, { aura: true, in: s.t0 + .1, look: 4, poses: [[s.t0, "cheer"], [LT(a) - .1, "sit"], [LE(a) + .15, "arms_crossed"], [tNv, "surprised"], ...(hd ? [[LT(d) - .12, "oops"], [LT(d) + 1.2, "sit"]] : [[tBg + 1, "oops"]])], nohop: true })
    + say(a, 520, 470, t, { size: 42, tail: -250, x: true, maxW: 600 }) + (hd ? say(d, 500, 520, t, { size: 46, tail: -230, maxW: 600 }) : "") + sMomo(t, { in: s.t0 + .3, poses: [[s.t0, "sit"], [LE(a), "surprised"], [tOne, "sit"]] })
    + (ring ? OP(1 - ss(bell + .5, bell + .8, t), TF(RG[0], RG[1], spring(t, tX, .4), `<g transform="translate(${-RG[0]} ${-RG[1]})">${ringTimer(RG[0], RG[1], t < r0 ? 1 : rs.frac, t < r0 ? 5 : rs.secs, t, { R: 128, sw: 22, tick: rs.tick, shut: pulse(t, bell, .01, .6), inner: TF(RG[0], RG[1] + 6, .5, crossedArms()) })}</g>`) + youPill(RG[0], RG[1] - 178, 1.0) + tpill(RG[0], RG[1] + 222, "cross your arms", 30, P.ink, "#fff")) : "")
    + stamp(t, tH, 800, 400, "HOLD ON!") + bellIcon(t, r0) + coin(t, tOne, 1330, 330, "+1", "arms crossed") + HUD(t); };

/* ============ 11 · the drop box; [LOOK CLOSER] strong and fragile; the book's pair; tick 2 DROP ============ */
const BOXX = 980, BOXS = .78, CAMB = [1.12, 980, 1500], BOXXY = [gx(CAMB, BOXX), gy(CAMB, TYD - 110)];
// the drop box on the table with the two cups in the adult's gloved hands above it (st 0) or after the test (st 1: the metal cup whole on its side, the glass cup in big pieces)
const boxItems = (t, bx, st, hands = 1, lift = 1) => { const hy = TYD + 12 - 330 * lift, inner = st ? `<g transform="translate(-150 -12) rotate(-90) translate(0 -52)">${metalCup()}</g><g transform="translate(140 -10)">${glassPieces(1)}</g>` : "";
  return TF(bx, TYD + 14, BOXS, dropBox(inner)) + (st ? "" : TF(CUPX[0], hy, .82, metalCup()) + TF(CUPX[1], hy, .82, glassCup(0)))
    + (hands ? [0, 1].map((i) => `<g transform="translate(${CUPX[i] + 30} ${n2((st ? TYD - 318 : hy) - 124 * .82 + 12)}) rotate(-90) scale(.62)">${glovePinch(st ? 1 : 0)}</g>`).join("") : ""); };
SC.dropbox = (t, s) => { const L = "g1101", [bx, ds] = slideX(t, s.t0 + .15, .8, 2400, BOXX, TYD + 14), lift = eio((t - s.t0 - .1) / .9), e = eio((t - s.t0) / 1.2), cam = [lerp(CAMD[0], CAMB[0], e), lerp(CAMD[1], CAMB[1], e), lerp(CAMD[2], CAMB[2], e)], tF = W(L, "safely") - .2;
  return deckView(t, { stand: false, board: { glow: 1 }, items: TF(CARDX, TYD + 24, .5, safetyCard(1)) + ds + boxItems(t, bx, 0, 1, lift) }, cam)
    + finePrint(t, tF, "An adult does this test. Never try it.", 330, 210) + sMomo(t) + HUD(t); };
SC.lcdrop = (t, s) => lookCloser(t, s, { tz: s.t0, fx: BOXXY[0], fy: BOXXY[1], art: dropArt, bgc: "#F4EDE1", verdict: ["GLASS: FRAGILE", WEAKC], tv: MK("v_fragile") });
SC.fragile = (t, s) => { const L = "g1104", tk = MK("tick2"), tCe = LE(L) - 2.6;
  return deckView(t, { stand: false, board: { glow: t < tk + 1.2 ? 1 : -1 }, items: boxItems(t, BOXX, 1, 0) }, CAMB)
    + [["not broken", -150, GOODC], ["broken", 140, WEAKC]].map(([lab, dx, col], i) => TF(gx(CAMB, BOXX + dx * BOXS), gy(CAMB, TYD - 190), spring(t, s.t0 + .2 + i * .15, .4), tpill(0, 0, lab, 34, "#fff", P.ink, { w: 700 }))).join("")
    + bookCaption(t, L, "Glass is fragile, but metal is strong.", 150, { size: 52, x: 800, keys: ["fragile", "strong"] }) + bookCaption(t, L, "A glass cup breaks easily when it is dropped, but a metal cup does not.", 250, { size: 37, x: 800, off: 7 })
    + (t >= tCe ? TF(330, 560, spring(t, tCe, .45), tpill(0, 0, "A ceramic plate is fragile too.", 34, P.ink, "#fff", { w: 600 })) : "") + sMomo(t, { poses: [[s.t0, "sit"], [tk, "cheer"]] }) + HUD(t); };

/* ============ 12 · the score hand, the spider (kwrecap is in common.js) ============ */
SC.final = (t, s) => { const L = "g1201"; return finalScene(t, s, L, 1, [[s.t0, null, 1], [W(L, "two") - .1, null, 2]]); };
SC.liz = (t, s) => { const L = "g1202", tN = W(L, "thread") - .3, tw_ = W(L, "spot");
  return lizReveal(t, s, L, deckView(t, { bag: 1, stand: false, board: { glow: -1 }, wave: t >= tw_ ? 1 : 0 }, CAMD), gx(CAMD, SPIDER[0]), gy(CAMD, SPIDER[1]) - 4, 1e9, "", 150, 110, 74, 1.9)
    + (t >= tN ? TF(1090, 190, spring(t, tN, .45), tpill(0, 0, "On its thread, by the letterboxes!", 50, P.sun, P.ink, { w: 700 })) : ""); };

/* ============ 13 · the cliffhanger: test three ============ */
SC.cliff = (t, s) => { const a = "g1301", b = "g1302", c = "g1303", tB = W(a, "bend") - .3, tR = W(a, "rubber") - .25, tS = W(a, "ice-cream") - .25, tQ = HAS(b) ? LT(b) - .1 : LE(a), tP = W(c, "find") - .1, BX = [760, 1150], hb = HAS(b);
  const brd = (nm, i, t0, lab) => { if (t < t0) return ""; const [bx, ds] = slideX(t, t0, .6, i ? 2300 : -400, BX[i], TYD + 56); return ds + picBoard(nm, bx, TYD + 56 - 40 * hop(t, t0 + .6, .3), 1, { sc: .7, lab, size: i ? 28 : 36, id: "f" + i }) + TF(bx - 118, TYD - 224, spring(t, t0 + .7, .4), `<g filter="url(#dropS)"><rect x="-34" y="-40" width="68" height="80" rx="16" fill="#FFF8EA" stroke="#E3C9A8" stroke-width="5"/></g>${T(0, 20, i + 1, 56, "#3B2A8C")}`); };
  return deckView(t, { long: true, stand: false, board: { glow: t >= tB ? 2 : -1 }, boardS: .56, boardX: 1560, front: brd("band1", 0, tR, "a rubber band") + brd("stick", 1, tS, "a wooden ice-cream stick") }, CAMD)
    + (t >= s.t0 + .2 ? TF(960, 190, spring(t, s.t0 + .2, .45) * (1 - ramp(t, tR - .2, .25)), tpill(0, 0, "Two tests done!", 60, P.sun, P.ink, { w: 700 })) : "")
    + (t >= tQ ? TF(gx(CAMD, 955), gy(CAMD, TYD - 100), spring(t, tQ, .5) * (1 + .06 * Math.sin(t * 5)), `<g filter="url(#dropS)"><circle r="62" fill="url(#gSun)"/></g>${T(0, 32, "?", 96, P.ink)}`) : "")
    + buddy("basil", 190, 1060, 250, t, { aura: true, in: s.t0 + .1, poses: hb ? [[s.t0, "sit"], [tR, "surprised"], [LT(b) - .12, "sit"], [LE(b) + .1, "surprised"]] : [[s.t0, "sit"], [tR, "surprised"]] }) + (hb ? say(b, 430, 470, t, { size: 46, tail: -220, maxW: 520 }) : "") + sMomo(t, { poses: [[s.t0, "sit"], [tQ, "thinking"]] })
    + (t >= tP ? TF(960, 400, lerp(2.2, 1, eo((t - tP) / .16)) + .05 * wob(t, tP + .16, .4), `<text x="0" y="50" font-family="Fredoka" font-weight="700" font-size="190" text-anchor="middle" letter-spacing="6" fill="${P.sun}" stroke="${P.ink}" stroke-width="30" stroke-linejoin="round" paint-order="stroke" filter="url(#drop)">PART 2</text>`) : "") + HUD(t); };

/* ============ 14 · "Now you know!": the board OUR 3 TESTS stands centred in the free space between the buddies ============ */
SC.nyk = (t, s) => nykScene(t, s, TF(900, 1046, .56, board3(t, { glow: -1 })), { bx: [200, 1715, 1375], hx: 470 });
})(); }
