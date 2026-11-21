// p1.js: PART 1, "Touch This Plant and It Folds Up! Is It SHY?": respond. Segments 1-14 of the approved script (p3_ep03_script.md).
if (PART === 1) { (() => {
const FOLD = { 0: [1, 1] }, CARD = [345, 1062, .52];
const gPip = (t, o = {}) => buddy("pip", 105, 1064, 150, t, { aura: true, tag: false, ...o }), gBasil = (t, o = {}) => buddy("basil", 650, 1000, 200, t, { aura: true, tag: false, ...o }), gMomo = (t, o = {}) => buddy("momo", 1790, 1062, 180, t, { aura: true, tag: false, flip: true, ...o });
const tcard = (t, st = {}, o = {}) => TF(CARD[0], CARD[1], CARD[2], trailCard(t, st, o));
const tools = (x = 1545) => TF(x, 1056, 1, stampTool()) + TF(x - 100, 1058, 1, inkPad());
// a point of the garden on screen, for a camera
const gx = (cam, x) => camX(cam, x), gy = (cam, y) => camY(cam, y);

/* ============ 1 · the silent cold open: the garden under the block ============ */
// the thumbnail's frame (thumb_still.js ... "&thumb"): the mimosa large, left of centre, one leaf folded; Basil far left; the sunny garden on the right
const THUMB1 = (t) => gardenView(t, { f: FOLD, still: true }, [1.5, 1840, 816]) + buddy("basil", 300, 800, 330, t, { aura: true, tag: false, pose: "surprised", still: true }) + logo(t);
SC.cold = (t, s) => { if (location.search.includes("thumb")) return THUMB1(t); const tb = MK("coldCard"), z = 1 + .05 * eio(t / 8);
  const [cx, cd] = slideX(t, tb + .15, .6, -260, CARD[0], 1062), [sx2, sd2] = slideX(t, tb + 1.7, .45, 2150, 1545, 1056);
  return gardenView(t, { f: FOLD }, [z, 1150, 760]) + cd + sd2 + (t >= tb + .15 ? TF(cx, 1062, CARD[2], trailCard(t)) : "") + (t >= tb + 1.7 ? tools(sx2) : "")
    + gBasil(t, { poses: [[0, "surprised"], [2.8, "sit"]] }) + gPip(t, { in: tb, poses: [[tb, "pointing"], [tb + 1.5, "sit"]] }) + gMomo(t, { in: tb + 1.4, poses: [[tb + 1.4, "waving"], [tb + 3.0, "sit"]], wave: true })
    + OP(1 - ramp(t, tb - .4, .3), lowerPill(60, 60, "Community garden, Toa Payoh,", "Singapore")); };

/* ============ 2 · the callback and the dare ============ */
const CAMF = [1.7, 1400, 800];
SC.callback = (t, s) => { const a = "a201", e = eio((t - s.t0) / 1.0), cam = [lerp(1.05, CAMF[0], e), lerp(1150, CAMF[1], e), lerp(760, CAMF[2], e)], tS = W(a, "folded") - .3;
  return gardenView(t, { f: FOLD }, cam) + buddy("basil", 360, 1056, 380, t, { aura: true, in: s.t0 + .1, poses: [[s.t0, "surprised"], [LT("a202") - .12, "sit"]] })
    + thought(t, tS, LT("a202") - .15, 600, 330, "shy?", { dir: -1, col: P.basil }) + say("a202", 700, 500, t, { size: 50, tail: -160, x: true, maxW: 600 }); };
SC.title = (t, s) => { const u = t - s.t0, a = (d) => { const k = clamp((u - d) / .16); return k <= 0 ? 0 : lerp(2.4, 1, eo(k)) + .05 * wob(u, d + .16, .4); }, L = "a203", k1 = a(.1), k2 = a(.45), k3 = a(LT(L) - s.t0);
  const ln = (y, txt, size, col, k, ls = 6) => k ? `<g transform="translate(960 ${y}) scale(${n2(k)})"><g transform="translate(0 8)" opacity=".85">${T(0, 0, txt, size, P.ink, { ls })}</g>${T(0, 0, txt, size, col, { ls })}</g>` : "";
  return gardenView(t, { f: FOLD }, [CAMF[0] - .1 * clamp(u / 5), CAMF[1], CAMF[2]]) + `<rect width="1920" height="1080" fill="${P.night}" opacity="${n2(.66 * clamp(u / .2))}"/>`
    + ln(250, "TOUCH THIS PLANT", 150, "#fff", k1, 4) + ln(420, "AND IT FOLDS UP!", 150, "#fff", k2, 4) + ln(630, "IS IT SHY?", 190, P.sun, k3)
    + (t >= W(L, "did") - .1 ? TF(960, 760, spring(t, W(L, "did") - .1, .45), tpill(0, 0, "Did you lock in your answer? Hold on to it!", 40, P.ink, "#fff", { w: 600 })) : "") + OP(clamp((u - .2) / .3), logo(t)); };

/* ============ 3 · the field trip: the trail card and the map ============ */
SC.trip = (t, s) => { const L = "a301", tT = W(L, "three"), tM = W(L, "field") - .1, dr = eio((t - tM - .3) / 1.4), pl = [0, 1, 2].map((i) => pulse(t, tT + i * .28, .05, .5)), TP = [1090, 318], KJ = [800, 212];
  const map = `<g filter="url(#drop)"><rect x="470" y="110" width="980" height="320" rx="26" fill="url(#gPaper)" transform="rotate(-1.2 960 270)"/></g><g transform="rotate(-1.2 960 270)"><path d="M560 300 Q560 200 720 180 Q860 150 1000 176 Q1180 170 1320 230 Q1400 270 1340 330 Q1200 392 1010 372 Q820 392 680 366 Q570 350 560 300z" fill="#CFEFC6" stroke="#6DBF7E" stroke-width="6" stroke-linejoin="round" stroke-dasharray="14 6"/>
    <path d="M${KJ[0]} ${KJ[1]} Q960 200 ${TP[0]} ${TP[1]}" fill="none" stroke="${P.coral}" stroke-width="9" stroke-linecap="round" stroke-dasharray="${n2(330 * dr)} 400"/>
    ${[[TP, "Toa Payoh", 1], [KJ, "Kranji", -1]].map(([p, nm, sd], i) => { const k = spring(t, tM + i * 1.1, .45); return k < .02 ? "" : `<g transform="translate(${p[0]} ${p[1]}) scale(${n2(k)})"><circle r="19" fill="${P.coral}" stroke="#fff" stroke-width="6"/></g>` + TF(p[0] + sd * 150, p[1] + (sd > 0 ? 40 : -34), k, tpill(0, 0, nm, 36, P.ink, "#fff", { w: 700, nosh: true })); }).join("")}</g>`;
  const [cx, cd] = slideX(t, s.t0 + .1, .5, 2300, 960, 1012);
  return bg("daystage") + OP(ramp(t, tM - .2, .3), map) + cd + TF(cx, 1012, 1.12, trailCard(t, {}, { pulse: pl }))
    + buddy("pip", 190, 1050, 230, t, { aura: true, in: s.t0 + .1, poses: [[s.t0, "waving"], [s.t0 + 1.7, "sit"]], wave: true }) + buddy("basil", 440, 1058, 185, t, { aura: true, in: s.t0 + .2, poses: [[s.t0, "cheer"], [s.t0 + 1.7, "sit"]], nohop: true })
    + buddy("momo", 1630, 1050, 230, t, { aura: true, flip: true, in: s.t0 + .3, poses: [[s.t0, "sit"], [tT - .1, "pointing"]] })
    + TF(310, 1066, .8, backpack("#B592FF", "#7C4DE8")) + TF(545, 1068, .7, backpack("#5FD9C4", "#14A090")) + TF(1800, 1066, .8, backpack("#FF9A86", "#E0553A")) + HUD(t); };
SC.game = (t, s) => gameScene(t, s, "a302", true);

/* ============ 4 · Round Zero: the rematch from Episode 2 ============ */
const mimObj = (t, f = {}) => `<ellipse cx="430" cy="606" rx="150" ry="34" fill="#6FCF72"/>` + TF(430, 600, .4, mimosa(t, f));
SC.r0 = (t, s) => { const L = "a401", tU = LT("u403"), tcap = LT("a404"), tc = W("a405", "one") - .1;
  return lockN(t, { cards: ["We feed it", "It makes its own food", "It needs no food"], q: "How does a plant get its food?", tq: W(L, "so") - .1, tc: [W(L, "one"), W(L, "two"), W(L, "three")], ring0: MK("ring0_0"), dur: 5, lock: "a402", ans: 2, tAns: tU + .35,
    obj: (tt) => mimObj(tt) + (tt >= tcap ? leafSparkles(tt, 430, 500, 150, 80, 8, 3) + TF(430, 350, spring(tt, tcap + .4, .4), tpill(0, 0, "making food", 30, P.sun, P.ink, { w: 700 })) : ""),
    picks: ["pip", "basil", "momo"].map((who) => ({ who, id: "u403", word: "2" })), react: [[tU + .5, "pip", "cheer"], [tU + .5, "momo", "cheer"], [tU + .5, "basil", "cheer"], [tU + 2.0, "pip", "sit"], [tU + 2.0, "momo", "sit"], [tU + 2.0, "basil", "sit"]],
    over: (tt) => bookCap(tt, "a404", "Plants do not eat but they can make their own food when there is light.", 590, { size: 44, maxW: 1150, t1: LT("a405") - .15 }) + coin(tt, tc, 960, 640, "+1", "if you showed two fingers") }); };
SCORE.push([W("a405", "one") - .1, 1, 1]);

/* ============ 5 · today's goals ============ */
SC.goals = (t, s) => goals3(t, s, [["What the folding plant is doing", TF(-10, 66, .23, mimosa(0, FOLD, { still: true }))], ["How living things respond to changes", TF(20, 50, .62, snail(.0))],
  ["Why responding keeps living things safe", `<path d="M0 -58 L50 -40 V4 Q50 44 0 62 Q-50 44 -50 4 V-40z" fill="#fff" stroke="${P.ink}" stroke-width="6" stroke-linejoin="round"/><path d="M-22 2 L-6 20 L26 -18" fill="none" stroke="${P.leafDeep}" stroke-width="11" stroke-linecap="round" stroke-linejoin="round"/>`]]);

/* ============ 6 · Round 1: what happens next? ============ */
SC.r1 = (t, s) => { const L = "a601", tT = W(L, "touched") + .1, tip = leafTip(0), px = 430 + tip[0] * .4, py = 600 + tip[1] * .4, t1 = W(L, "one", 1) - .1;
  return lockN(t, { cards: ["Stays folded", "Opens again", "The leaf drops off"], q: "What happens next?", tq: W(L, "what") - .1, tc: [W(L, "one", 3), W(L, "two"), W(L, "three")], ring0: MK("ring0_1"), dur: 5, lock: "a602",
    obj: (tt) => { const f0 = [ss(tT + .15, tT + 1.1, tt), ss(tT + 1.0, tT + 1.7, tt)], k = spring(tt, tT - .45, .35) * (1 - ss(tT + .5, tT + .8, tt)), dn = eo((tt - tT + .3) / .3);
      return mimObj(tt, { 0: f0 }) + (k > .02 ? TF(px + 4, py - 6 - 30 * (1 - dn), .42 * k, `<g transform="rotate(24)">${pointer()}</g>`) : "") + OP(pulse(tt, tT, .02, .5), `<circle cx="${n2(px)}" cy="${n2(py)}" r="26" fill="none" stroke="${P.sun}" stroke-width="5"/>`)
        + (tt >= t1 ? TF(1400, 742, spring(tt, t1, .4), tpill(0, 0, "One finger, one leaf.", 32, "#fff", P.ink, { w: 700 })) : ""); },
    picks: [{ who: "basil", id: "a603", word: "1", x: true }, { who: "momo", id: "a604", word: "2" }, { who: "pip", id: "a605", word: "2" }], react: [[LE("a603") + .1, "basil", "arms_crossed"], [LE("a604") + .1, "momo", "pointing"], [LE("a605") + .1, "pip", "pointing"]] }); };

/* ============ 7 · we wait ============ */
const SW = [800, 968, .78], LEAF2 = [MXY[0] + leafTip(2)[0], MXY[1] + leafTip(2)[1]];
SC.waitw = (t, s) => { const L = "a701", tC = LT(L) + .3, dive = ei((t - (s.t1 - .55)) / .55), cam = [1.2 + 2.2 * dive, lerp(1050, LEAF2[0], dive), lerp(760, LEAF2[1], dive)], px = gx(cam, LEAF2[0]), py = gy(cam, LEAF2[1]), tP = W(L, "from") - .2;
  return gardenView(t, { f: FOLD, items: TF(SW[0], SW[1], SW[2], stopwatch(Math.max(0, t - tC) * .3)) }, cam)
    + OP(1 - dive, buddy("pip", 330, 1056, 230, t, { aura: true, in: s.t0 + .1, poses: [[s.t0, "pointing"], [tC + .8, "sit"]], jump: [[tC - .2, 22]] }) + buddy("momo", 1700, 1056, 240, t, { aura: true, flip: true, in: s.t0 + .2, poses: [[s.t0, "sit"], [tP, "pointing"]] })
      + speeded(t, tC + .3, s.t1, gx(cam, SW[0]) + 210, gy(cam, SW[1]) - 90) + (t >= tP ? TF(px + 6, py - 30 - 10 * Math.sin(t * 3), spring(t, tP, .4) * .7, `<g transform="rotate(18)">${pointer()}</g>`) : "") + HUD(t))
    + wipe(t, s.t1, "#EAF8E4", px, py); };

/* ============ 8 · the reveal: not shy. Responding! ============ */
SC.reveal = (t, s) => { const a = "a801", b = "a802", e = eo((t - s.t0) / 1.0), cam = [lerp(2.6, 1.12, e), lerp(LEAF2[0], 1150, e), lerp(LEAF2[1], 770, e)], tA = W(a, "two") - .1, lit = t >= tA ? spring(t, tA, .45) : 0;
  return gardenView(t, { items: TF(SW[0], SW[1], SW[2], stopwatch(.92)) + TF(1440, 880, .5, ansCard(2, "Opens again", { lit })) }, cam)
    + (t >= s.t0 + .9 ? TF(gx(cam, SW[0]), gy(cam, SW[1]) - 205, spring(t, s.t0 + .9, .4), tpill(0, 0, "a few minutes later", 32, P.ink, "#fff", { w: 600 })) : "")
    + buddy("pip", 330, 1056, 230, t, { aura: true, in: s.t0 + .5, poses: [[s.t0, "sit"], [tA, "cheer"], [tA + 1.8, "sit"]] }) + buddy("basil", 122, 1060, 170, t, { aura: true, tag: false, in: s.t0 + .6, poses: [[s.t0, "sit"], [tA, "surprised"], [tA + 1.8, "sit"]] })
    + buddy("momo", 1760, 1056, 230, t, { aura: true, flip: true, in: s.t0 + .55, poses: [[s.t0, "sit"], [tA, "cheer"], [tA + 1.8, "sit"]] })
    + bookCap(t, b, "The mimosa plant is commonly called “touch-me-not”.", 170, { size: 50 }) + wipe(t, s.t0, "#EAF8E4") + HUD(t); };
const leafPic = (f, dd, touch) => `<rect x="-200" y="-420" width="400" height="360" fill="#CFEFC6"/><ellipse cx="0" cy="-70" rx="220" ry="50" fill="#8FDB7A"/>` + TF(-150, -220, 1, `<g transform="rotate(${n2(-8 + 30 * dd)})">${mleaf(300, f)}</g>`) + `<path d="M-150 -220 Q-170 -140 -160 -70" stroke="#7A9A5A" stroke-width="8" fill="none" stroke-linecap="round"/>` + (touch ? TF(132, -262, .62, `<g transform="rotate(20)">${pointer()}</g>`) : "");
SC.replay = (t, s) => { const L = "a803", t1 = W(L, "touch") - .25, t2 = W(L, "mimosa") - .25, t3 = W(L, "it") - .2, f2 = ss(t2 + .15, t2 + 1.0, t), cards = [[480, t1, leafPic(0, 0, true), "a change", W(L, "change")], [960, t2, leafPic(f2, ss(t2 + .9, t2 + 1.4, t), false), "it responds", W(L, "responded")], [1440, t3 + .5, leafPic(0, 0, false), "a few minutes later", t3 + .9]];
  return gardenView(t, {}, [1.12, 1150, 770]) + `<rect width="1920" height="1080" fill="${P.night}" opacity=".45"/>`
    + cards.map(([x, t0, pic, lab, tl], i) => { const k = spring(t, t0, .45); return k < .02 ? "" : TF(x, 960, k * (1 + .04 * pulse(t, tl, .04, .5)), picCard(pic, t >= tl - .1 ? lab : "", { w: 420, h: 480, id: "rp" + i, size: 38 }) + (t >= tl - .1 ? OP(pulse(t, tl, .04, .7), `<rect x="-200" y="-112" width="400" height="80" rx="20" fill="${P.sun}" opacity=".5"/>`) : "")); }).join("") + HUD(t); };
SC.mark1 = (t, s) => markScene(t, s, { id: "a805", sayId: "a804", who: "basil", n: "1 of 2", text: "Living things respond to changes in the environment.", keys: ["respond", "to", "changes", "environment."], size: 78, y: 256 });
const CAMN = [.95, 2400, 800];
SC.notshy = (t, s) => { const a = "a806", b = "a807", tb = LT(b) - .1, ts = MK("stamp1") + .25, tc = W("a808", "one") - .1;
  return gardenView(t, {}, CAMN) + TF(600, 1056, .6, trailCard(t, { 1: ts })) + stampPress(t, ts, 600, 1056, .6, 1)
    + buddy("basil", 240, 1056, 280, t, { aura: true, in: s.t0 + .1, poses: [[s.t0, "arms_crossed"], [tb - .05, "sit"], [LE(b) + .2, "cheer"], [LE(b) + 2.2, "sit"]] })
    + buddy("momo", 985, 1062, 190, t, { aura: true, tag: false, in: s.t0 + .2, poses: [[s.t0, "sit"], [ts + .1, "cheer"], [ts + 1.6, "sit"]], jump: [[ts - .25, 30]], nohop: true })
    + thought(t, s.t0 + .4, tb - .2, 430, 600, "shy?", { dir: -1, col: P.basil }) + thought(t, tb + .5, LE(b) + 1.6, 520, 470, "responding", { dir: -1, col: P.basil, size: 58, ink: P.leafDeep }) + say(b, 560, 640, t, { size: 48, tail: -150 })
    + bookCap(t, a, "The mimosa plant folds its leaves to protect itself from harm.", 170, { size: 48, maxW: 1000, x: 800, t1: tb }) + coin(t, tc, 1420, 360, "+1", "if you showed two fingers") + HUD(t); };
SCORE.push([W("a808", "one") - .1, 2, 2]);

/* ============ 9 · you respond too ============ */
SC.eyes = (t, s) => { const L = "a901", tF = W(L, "bright") - .1, tE = W(L, "eyelids") + .25, u = clamp((t - s.t0) / (tF - s.t0 + .2)), x = lerp(300, 1010, eio(u)), walk = u < 1 ? Math.sin((t - s.t0) * 9) : 0, shut = t >= tE, fl = pulse(t, tF + .15, .12, .8);
  return CAM(bg("patch"), 1.25, 420, 640) + `<rect x="0" y="0" width="640" height="1080" fill="${P.ink}" opacity=".34"/><rect x="640" y="0" width="1280" height="1080" fill="#FFF3B8" opacity="${n2(.12 + .3 * fl)}"/>`
    + TF(1530, 250, 2.6 * (1 + .12 * fl), sunHeat()) + TF(x, 1010, 1.75, kid({ legL: 22 * walk, legR: -22 * walk, armL: 14 + 16 * walk, armR: shut ? 150 + 6 * wob(t, tE, .4) : 14 - 16 * walk, eyes: shut ? "shut" : "", mouth: shut ? "flat" : "smile", lean: shut ? -3 : 0 }))
    + `<rect width="1920" height="1080" fill="#fff" opacity="${n2(.6 * fl)}"/>`
    + buddy("momo", 1700, 1056, 230, t, { aura: true, flip: true, in: s.t0 + .2, poses: [[s.t0, "sit"], [tE, "surprised"], [tE + 1.5, "sit"]] }) + HUD(t); };
SC.mark2 = (t, s) => markScene(t, s, { id: "a903", sayId: "a902", who: "pip", n: "2 of 2", text: "The ability to respond to changes in our environment helps to protect us from danger and keeps us safe.", keys: ["respond", "changes", "protect", "danger", "keeps", "safe."], size: 60, y: 256 });
SC.ledge = (t, s) => { const a = "a904", b = "a905", tG = W(b, "grows") - .2, ln = LEDGE_DIR * 30 * eio((t - tG) / 2.2), cam = [lerp(1.5, 1.7, eio((t - s.t0) / 6)), 1150, 720];
  return hotelView(t, { sign: 0, rooms: [0, 0, 0], board: 0, clock: 10, items: `<g opacity=".55" filter="url(#ghostF)">${gPlant({ lean: 0 }, 1000, 1)}</g>` + gPlant({ lean: ln, sway: .3 * Math.sin(t) }, 1000, 1) }, cam)
    + `<circle cx="1800" cy="420" r="380" fill="#FFE9A8" opacity="${n2(.5 + .1 * Math.sin(t * 1.5))}" filter="url(#b60)"/><path d="M1920 300 L1000 1080 H1600 L1920 760z" fill="#FFF3B8" opacity=".25" filter="url(#b30)"/>`
    + bookCap(t, a, "Plants are also able to respond to changes in the environment.", 170, { size: 48, maxW: 1000, x: 800 }) + (t >= tG + .6 ? TF(1500, 700, spring(t, tG + .6, .4), tpill(0, 0, "towards the sunlight", 40, P.sun, P.ink, { w: 700 })) : "") + HUD(t); };

/* ============ 10 · HOLD ON! Pip's list ============ */
const NB = [760, 1040, .86], RG = [1470, 800];
const listView = (t, o = {}) => gardenView(t, { liz: o.liz === undefined ? 1 : o.liz }) + (o.mid || "") + TF(NB[0], NB[1], NB[2], notebook(t, o));
const lizShow = (t, t0) => 1 - ramp(t, t0, .25) * (1 - ramp(t, t0 + 3.0, .2));
SC.list = (t, s) => { const a = "a1001", b = "a1002", c = "a1003", r0 = MK("ring0_2"), bell = MK("bell_2"), rs = ringState(t, r0, 5), tl = [W(a, "snail") - .1, W(a, "ice") - .1, W(a, "door") - .1], tLz = LT(a) + 1.2;
  const lit = [0, 1, 2].map((i) => Math.max(t < LT(b) ? pulse(t, tl[i], .05, 1.1) : 0, t >= r0 && t < bell ? (Math.floor((t - r0) / .55) % 3 === i ? .6 + .4 * rs.tick : 0) : 0)), tX = W(b, "cross") - .15, tH = W(b, "hold") - .1, tOne = W(c, "one") - .1;
  const cause = [0, spring(t, W(c, "sun") - .1, .4), spring(t, W(c, "wind") - .1, .4)], tg = spring(t, W(c, "non-living") - .1, .4), ring = t >= tX && t < bell + .8;
  return listView(t, { lit, cause, tags: [0, tg, tg], liz: lizShow(t, tLz) })
    + buddy("pip", 150, 1060, 205, t, { aura: true, in: s.t0 + .1, poses: [[s.t0, "pointing"], [LT(a) - .1, "sit"], [LE(a) + .15, "cheer"], [LT(b) + .3, "sit"], [W(c, "they") - .2, "oops"], [LE(c) - .5, "sit"]], nohop: true })
    + say(a, 330, 330, t, { size: 40, tail: -150, x: true, maxW: 620 })
    + (ring ? OP(1 - ss(bell + .5, bell + .8, t), TF(RG[0], RG[1], spring(t, tX, .4), `<g transform="translate(${-RG[0]} ${-RG[1]})">${ringTimer(RG[0], RG[1], t < r0 ? 1 : rs.frac, t < r0 ? 5 : rs.secs, t, { R: 128, sw: 22, tick: rs.tick, shut: pulse(t, bell, .01, .6), inner: TF(RG[0], RG[1] + 6, .5, crossedArms()) })}</g>`) + youPill(RG[0], RG[1] - 178, 1.0) + tpill(RG[0], RG[1] + 220, "cross your arms", 30, P.ink, "#fff")) : "")
    + stamp(t, tH, 800, 420, "HOLD ON!") + bellIcon(t, r0) + coin(t, tOne, 1470, 760, "+1", "arms crossed") + HUD(t); };
SCORE.push([W("a1003", "one") - .1, 3, 2]);
SC.snail = (t, s) => { const a = "a1004", b = "a1005", tT = W(a, "touched") - .15, tP = W(a, "pulled") - .1, tO = LE(a) + .2, pull = ss(tP, tP + .45, t) * (1 - ss(tO, tO + 2.4, t)), k = spring(t, tT - .35, .35) * (1 - ss(tT + .45, tT + .75, t)), tR = W(a, "responding") - .2, tm = LT(b) + .2;
  return CAM(bg("patch"), 2.3, 1500, 690) + `<ellipse cx="760" cy="900" rx="620" ry="70" fill="#5A3A28" opacity=".5" filter="url(#b10)"/>` + TF(820, 880, 2.1, snail(pull))
    + (k > .02 ? TF(560, 770 - 30 * (1 - eo((t - tT + .3) / .3)), .8 * k, `<g transform="rotate(-30)">${pointer()}</g>`) : "") + OP(pulse(t, tT, .02, .5), `<circle cx="556" cy="772" r="40" fill="none" stroke="${P.sun}" stroke-width="6"/>`)
    + standTag(640, 1010, "living thing · it responds", spring(t, tR, .45), 36, P.leafDeep, "#fff")
    + TF(1585, 1040, .36, notebook(t, { pull: 1, marks: [["tick", spring(t, tm + .9, .4)], ["x", spring(t, tm, .4)], ["x", spring(t, tm + .45, .4)]] }))
    + buddy("pip", 1200, 1062, 215, t, { aura: true, in: s.t0 + .2, poses: [[s.t0, "thinking"], [LT(b) - .12, "sit"], [LE(b) + .1, "cheer"]], nohop: true }) + say(b, 1230, 700, t, { size: 44, tail: 0, maxW: 560 })
    + finePrint(t, tT, "Look. Do not pick it up. Wash your hands.", 420, 1034) + HUD(t); };

/* ============ 11 · your turn: one finger, one leaf ============ */
SC.tryit = (t, s) => { const L = "a1101", tw_ = [W(L, "one") - .1, W(L, "stem") - .1, W(L, "never") - .1, W(L, "wash") - .1], tB = W(L, "find") - .2, tS = W(L, "mimosa") + .4;
  const pics = [`<g transform="translate(-74 30) rotate(-14)">${mleaf(160, 0)}</g>` + TF(76, -12, .4, `<g transform="rotate(18)">${pointer()}</g>`),
    `<path d="M-70 50 Q0 20 70 -50" stroke="#7A9A5A" stroke-width="22" stroke-linecap="round" fill="none"/>${[[-40, 30], [-6, 8], [30, -20]].map(([x, y]) => `<path d="M${x} ${y} l-8 -30 l22 16z" fill="#A46A4A" stroke="#7A4A2A" stroke-width="3" stroke-linejoin="round"/>`).join("")}`,
    TF(-10, 62, .3, mimosa(0, {}, { still: true })) + `<g transform="translate(40 -30) rotate(120) scale(.5)" fill="${SKIN}" stroke="${SKIN2}" stroke-width="8"><rect x="-70" y="-34" width="92" height="76" rx="30"/><rect x="-10" y="-34" width="80" height="34" rx="17"/></g><path d="M56 -70 l14 -22 M78 -58 l24 -12" stroke="${P.coral}" stroke-width="6" stroke-linecap="round"/>` + TF(-92, -56, 1, xBadge(24)),
    `<rect x="-14" y="-76" width="28" height="40" rx="6" fill="#8D97B2" stroke="#5E6788" stroke-width="4"/><rect x="-44" y="-86" width="88" height="16" rx="8" fill="#3A8DFF" stroke="#1F5FD0" stroke-width="4"/><path d="M0 -34 V26" stroke="#8CC8FF" stroke-width="12" stroke-linecap="round"/><g fill="${SKIN}" stroke="${SKIN2}" stroke-width="4"><rect x="-72" y="18" width="76" height="40" rx="18" transform="rotate(14 -34 38)"/><rect x="-4" y="18" width="76" height="40" rx="18" transform="rotate(-14 34 38)"/></g><circle cx="-40" cy="2" r="7" fill="#fff" stroke="#8CC8FF" stroke-width="3"/><circle cx="44" cy="-4" r="9" fill="#fff" stroke="#8CC8FF" stroke-width="3"/>`];
  let grid = ""; pics.forEach((p, i) => { const k = spring(t, tw_[i], .4), lit = pulse(t, tw_[i], .05, 1.0), x = -150 + (i % 2) * 300, y = -420 + Math.floor(i / 2) * 215; if (k > .02) grid += `<g transform="translate(${x} ${y}) scale(${n2(k * (1 + .05 * lit))})">${lit > .05 ? `<rect x="-140" y="-102" width="280" height="204" rx="26" fill="${P.sun}" opacity="${n2(.85 * lit)}" filter="url(#b10)"/>` : ""}<rect x="-132" y="-94" width="264" height="188" rx="20" fill="#EAF6E0" stroke="#C9D2E8" stroke-width="5"/>${p}</g>`; });
  const board = `<ellipse cx="0" cy="4" rx="300" ry="16" fill="${P.ink}" opacity=".22" filter="url(#b4)"/><path d="M-200 0 V-120 M200 0 V-120" stroke="#8A5A36" stroke-width="18" stroke-linecap="round"/><g filter="url(#drop)"><rect x="-330" y="-640" width="660" height="560" rx="28" fill="url(#gPaper)" stroke="#8A5A36" stroke-width="8"/></g><g filter="url(#dropS)"><rect x="-150" y="-676" width="300" height="76" rx="38" fill="url(#gSun)"/></g>${T(0, -620, "TRY IT", 50, P.ink, { ls: 8 })}` + grid;
  return gardenView(t, { items: TF(1590, 985, .72, stopwatch(Math.max(0, t - tS) * .5)) }) + TF(420, 1050, spring(t, tB, .5), board)
    + (t >= tS ? TF(1590, 800, spring(t, tS, .4), tpill(0, 0, "How many seconds to fold?", 32, P.ink, "#fff", { w: 600 })) : "")
    + buddy("basil", 900, 1064, 180, t, { aura: true, tag: false, in: s.t0 + .2, poses: [[s.t0, "cheer"], [s.t0 + 1.8, "sit"]], nohop: true }) + HUD(t); };

/* ============ 12 · score hand, the lizard ============ */
SC.final = (t, s) => { const L = "a1201"; return finalScene(t, s, L, 2, [[s.t0, null, 1], [W(L, "more") - .1, "More than two? You beat the Buddies!", 3], [W(L, "three") - .1, null, 3]], TF(1260, 1062, .42, trailCard(t, { 1: 0 }))); };
SC.liz = (t, s) => { const L = "a1202", tRun = W(L, "runs") - .1, hide = ramp(t, tRun + .35, .3), mx = lerp(2150, 1830, eo((t - tRun) / .5));
  return lizReveal(t, s, L, listView(t, { liz: hide, mid: buddy("momo", mx, 1062, 200, t, { aura: true, tag: false, flip: true }) }), SIGN[0] + 2, SIGN[1] - 120, W(L, "is") - .1, "Is that responding?", -110); };

/* ============ 13 · the cliffhanger: five eggs in Kranji ============ */
SC.cliff = (t, s) => { const L = "a1301", tH = W(L, "this") - .3, tQ = W(L, "will") - .1, tP = W(L, "find") - .1, tap = MK("eggtap") + .2;
  if (t < tH) { const u = t - s.t0, hills = (sp, y, col, r) => { let h = ""; for (let i = -1; i < 5; i++) h += `<ellipse cx="${n2(i * 620 - (u * sp) % 620 + 300)}" cy="${y}" rx="${r}" ry="${n2(r * .32)}" fill="${col}"/>`; return h; }; let dash = ""; for (let i = -1; i < 9; i++) dash += `<rect x="${n2(i * 260 - (u * 900) % 260)}" y="1010" width="130" height="14" rx="7" fill="#fff" opacity=".7"/>`;
    const disc = (who, lx) => buddy(who, 960 + lx * .9, 908 - 198 * .9, 118, t, { aura: true, tag: false, shadow: false, rim: false });
    return `<rect width="1920" height="1080" fill="url(#mSky)"/>${hills(60, 760, "#8FD38A", 520)}${hills(160, 860, "#6DBF7E", 480)}<rect y="880" width="1920" height="200" fill="#6E6A92"/><rect y="880" width="1920" height="14" fill="#fff" opacity=".4"/>${dash}`
      + TF(960, 990, .9, bus(t)) + disc("pip", -400) + disc("basil", -130) + disc("momo", 140) + TF(960 - 318 * .9, 990 - 196 * .9, .14, trailCard(t, { 1: 0 })) + lowerPill(60, 150, "Next stop:", "a farm in Kranji") + wipe(t, tH, "#FFF3B8") + HUD(t); }
  const cam = [lerp(1.3, 1.4, eio((t - tH) / 6)), 240, 640], tk = pulse(t, tap, .02, .3);
  return farmView(t, { nest: henOnNest(t + 6 * tk), cat: false, items: TF(905, 880, .56, `<ellipse cx="0" cy="4" rx="90" ry="12" fill="${P.ink}" opacity=".25"/><path d="M-50 0 L-30 -30 H30 L50 0z" fill="url(#fWood)" stroke="#8A5E34" stroke-width="4"/><g filter="url(#dropS)"><rect x="-90" y="-250" width="180" height="230" rx="30" fill="url(#gPaper)" stroke="#E3C9A8" stroke-width="7"/></g>${T(0, -84, "?", 170, "#3B2A8C")}`) }, cam)
    + OP(tk, `<g stroke="${P.sun}" stroke-width="6" stroke-linecap="round"><path d="M${gx(cam, 470) - 40} ${gy(cam, 690)} l-18 -22 M${gx(cam, 470)} ${gy(cam, 690) - 10} v-28 M${gx(cam, 470) + 40} ${gy(cam, 690)} l18 -22"/></g>`)
    + ["pip", "basil", "momo"].map((w, i) => buddy(w, 1180 + i * 250, 1062, 185, t, { aura: true, tag: false, in: tH + .15 + i * .1, poses: [[tH, "sit"], [tQ, w === "basil" ? "arms_crossed" : "thinking"], [tap, "surprised"]] })).join("")
    + (t >= tQ ? TF(1400, 520, spring(t, tQ, .45), tpill(0, 0, "Will every egg hatch?", 56, P.ink, "#fff", { w: 700 })) : "")
    + (t >= tP ? TF(1400, 320, lerp(2.2, 1, eo((t - tP) / .16)) + .05 * wob(t, tP + .16, .4), `<text x="0" y="50" font-family="Fredoka" font-weight="700" font-size="170" text-anchor="middle" letter-spacing="6" fill="${P.sun}" stroke="${P.ink}" stroke-width="28" stroke-linejoin="round" paint-order="stroke" filter="url(#drop)">PART 2</text>`) : "") + wipe(t, tH, "#FFF3B8") + HUD(t); };
SC.nyk = (t, s) => nykScene(t, s, TF(690, 1040, .5, mimosa(t)) + TF(1005, 1040, .4, trailCard(t, { 1: 0 })));
})(); }
