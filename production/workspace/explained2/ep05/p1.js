// p1.js: PART 1, "Feathers, Scales or Moist Skin?": what an animal is, outer coverings, observable characteristics, amphibians. Segments 1-14 of p3_ep05_script.md.
if (PART === 1) { (() => {
const CARD = [1540, 1062, .5], CAMW = [1.04, 960, 580], CAMF = [2.2, 600, 700];
const wPip = (t, o = {}) => buddy("pip", 120, 1064, 165, t, { aura: true, tag: false, ...o }), wBasil = (t, o = {}) => buddy("basil", 320, 1064, 150, t, { aura: true, tag: false, ...o }), wMomo = (t, o = {}) => buddy("momo", 1800, 1062, 170, t, { aura: true, tag: false, flip: true, ...o });
const tcard = (t, st = {}, o = {}) => TF(CARD[0], CARD[1], CARD[2], trailCard(t, st, o));
const gx = (cam, x) => camX(cam, x), gy = (cam, y) => camY(cam, y);
// a frog part on screen (the frog sits at FROGXY - 30, scale .8)
const fp = (cam, x, y) => [gx(cam, FROGXY[0] - 30 + x * .8), gy(cam, FROGXY[1] + y * .8)];

/* ============ 1 · the silent cold open: the pond at the wetland ============ */
// the thumbnail's frame (thumb_still.js ... "&thumb"): the frog large on its leaf, the kingfisher above it, the bright water on the right
const THUMB1 = (t) => wetView(t, { frog: { wet: 1 }, kf: false, items: `<path d="M430 800 Q424 660 436 548" fill="none" stroke="#4E3A2A" stroke-width="30" stroke-linecap="round"/><path d="M430 800 Q424 660 436 548" fill="none" stroke="#8A6A4C" stroke-width="21" stroke-linecap="round"/><ellipse cx="430" cy="800" rx="44" ry="9" fill="none" stroke="#fff" stroke-width="4" opacity=".6"/>` + TF(436, 540, .62, `<g transform="scale(-1 1)">${kingfisher({})}</g>`) }, [1.75, 300, 640]) + buddy("momo", 190, 800, 250, t, { aura: true, tag: false, pose: "surprised", still: true }) + logo(t);
SC.cold = (t, s) => { if (location.search.includes("thumb")) return THUMB1(t); const tb = MK("coldCard"), z = 1.04 + .05 * eio(t / 7.2);
  const [cx, cd] = slideX(t, tb + .15, .6, 2200, CARD[0], 1062);
  return wetView(t, {}, [z, 960, 580]) + cd + (t >= tb + .15 ? TF(cx, 1062, CARD[2], trailCard(t)) : "")
    + wBasil(t, { poses: [[0, "surprised"], [2.6, "sit"]] }) + wPip(t, { in: tb, poses: [[tb, "pointing"], [tb + 1.5, "sit"]] }) + wMomo(t, { in: tb + 1.2, poses: [[tb + 1.2, "waving"], [tb + 2.8, "sit"]], wave: true })
    + OP(1 - ramp(t, tb - .4, .3), lowerPill(60, 60, "Sungei Buloh Wetland Reserve,", "Singapore")); };

/* ============ 2 · the callback and the dare ============ */
const GROUPS4 = [["PLANTS", "#2FA65A"], ["ANIMALS", "#F08A24"], ["FUNGI", "#9B6BFF"], ["BACTERIA", "#3A8DFF"]];
SC.callback = (t, s) => { const a = "a201", b = "a203", t4 = W(a, "four") - .1, tA = W(a, "animals") - .1, tw_ = [W(b, "frog") - .15, W(b, "bird") - .15, W(b, "fish") - .15], g = (i) => pulse(t, tw_[i], .1, 1.3), tM = LT(b) - .5, fxn = FISHXY[0] + 110 * Math.sin(t * .5);
  const chips = GROUPS4.map(([nm, col], i) => { const k = spring(t, t4 + i * .14, .45), on = t >= tA && i === 1, dim = t >= tA && i !== 1; return k < .02 ? "" : OP((dim ? .35 : 1) * (1 - ramp(t, tM, .3)), TF(390 + i * 380, 190, k * (on ? 1.18 + .05 * Math.sin(t * 6) : 1), `<g filter="url(#${on ? "glowS" : "dropS"})"><rect x="-170" y="-48" width="340" height="96" rx="48" fill="${col}"/><rect x="-162" y="-40" width="324" height="80" rx="40" fill="none" stroke="#fff" stroke-width="4" opacity=".8"/></g>${T(0, 17, nm, 48, "#fff", { ls: 3 })}`)); }).join("");
  return wetView(t, { back: glowDisc(FROGXY[0] - 20, FROGXY[1] - 60, 150, g(0)) + glowDisc(KFXY[0], KFXY[1] - 60, 130, g(1)) + glowDisc(fxn, FISHXY[1], 120, g(2)) }, CAMW)
    + tcard(t) + chips + wPip(t) + wBasil(t)
    + buddy("momo", 1740, 1056, 300, t, { aura: true, flip: true, in: tM, poses: [[tM, "thinking"], [LT(b) - .12, "sit"], [LE(b) + .1, "thinking"]] }) + (t < tM ? wMomo(t, { out: tM - .1 }) : "")
    + say(b, 1360, 520, t, { size: 46, tail: 200, maxW: 600 }); };
SC.title = (t, s) => { const u = t - s.t0, a = (d) => { const k = clamp((u - d) / .16); return k <= 0 ? 0 : lerp(2.4, 1, eo(k)) + .05 * wob(u, d + .16, .4); }, L = "a204", k1 = a(.1), k2 = a(.45), k3 = a(LT(L) - s.t0);
  const ln = (y, txt, size, col, k, ls = 6) => k ? `<g transform="translate(960 ${y}) scale(${n2(k)})"><g transform="translate(0 8)" opacity=".85">${T(0, 0, txt, size, P.ink, { ls })}</g>${T(0, 0, txt, size, col, { ls })}</g>` : "";
  return wetView(t, {}, [1.5 - .08 * clamp(u / 5), 800, 620]) + `<rect width="1920" height="1080" fill="${P.night}" opacity="${n2(.66 * clamp(u / .2))}"/>`
    + ln(250, "FEATHERS, SCALES", 150, "#fff", k1, 4) + ln(420, "OR MOIST SKIN?", 150, "#fff", k2, 4) + ln(630, "ONE GROUP OR THREE?", 150, P.sun, k3, 4)
    + (t >= W(L, "lock") - .1 ? TF(960, 770, spring(t, W(L, "lock") - .1, .45), tpill(0, 0, "Did you lock in your answer? Hold on to it!", 40, P.ink, "#fff", { w: 600 })) : "") + OP(clamp((u - .2) / .3), logo(t)); };
SC.game = (t, s) => gameScene(t, s, "a302", true, "duck", (t) => `<g transform="translate(-8 40) scale(.92)">${duck(t)}</g>`);

/* ============ 4 · Round Zero: a warm-up ============ */
const padObj = (inner) => `<ellipse cx="430" cy="600" rx="150" ry="36" fill="#5FB7C9"/>` + TF(430, 590, .6, lilyPad(190, "#66CC5C")) + inner;
SC.r0 = (t, s) => { const L = "a401", tU = LT("u403"), tcap = LT("a404"), tc = W("a405", "one") - .1;
  return lockN(t, { cards: ["Yes", "No"], q: "Can an animal make its own food?", tq: W(L, "can") - .1, tc: [W(L, "one"), W(L, "two")], ring0: MK("ring0_0"), dur: 5, lock: "a402", ans: 2, tAns: tU + .35,
    obj: (tt) => padObj(TF(410, 586 - 26 * hop(tt % 3.2, 1.2, .4), .62, frog({ ext: .8 * hop(tt % 3.2, 1.2, .4) }))) + (tt >= tcap ? TF(430, 350, spring(tt, tcap + .4, .4), tpill(0, 0, "It must find food", 30, P.sun, P.ink, { w: 700 })) : ""),
    picks: ["pip", "basil", "momo"].map((who) => ({ who, id: "u403", word: "2" })), react: [[tU + .5, "pip", "cheer"], [tU + .5, "momo", "cheer"], [tU + .5, "basil", "cheer"], [tU + 2.0, "pip", "sit"], [tU + 2.0, "momo", "sit"], [tU + 2.0, "basil", "sit"]],
    over: (tt) => bookCap(tt, "a404", "Animals are unable to make their own food. They depend on other living things for food.", 590, { size: 44, maxW: 1150, t1: LT("a405") - .15 }) + coin(tt, tc, 960, 640, "+1", "if you showed two fingers") }); };
SCORE.push([W("a405", "one") - .1, 1, 1]);

/* ============ 5 · today's goals ============ */
SC.goals = (t, s) => goals3(t, s, [["What an animal is", TF(-14, 56, .5, frog())], ["How scientists group animals", TF(-10, -6, .56, magnifier(80))], ["What makes a frog an amphibian", TF(0, 0, .36, swatch("skin"))]], "pip", ["g100", "g101", "g102", "g103"]);

/* ============ 6 · what an animal is ============ */
SC.parts = (t, s) => { const L = "a501", e = eio((t - s.t0) / 1.0), cam = [lerp(CAMW[0], CAMF[0], e), lerp(CAMW[1], CAMF[1], e), lerp(CAMW[2], CAMF[2], e)], tw_ = [W(L, "head") - .1, W(L, "body") - .1, W(L, "limbs") - .1], tQ = LT(L);
  const lab = [["head", fp(CAMF, 70, -120), [1050, 330]], ["body", fp(CAMF, -40, -92), [330, 380]], ["limbs", fp(CAMF, 78, -28), [1090, 800]]], tL2 = W(L, "legs") - .1, h2 = fp(CAMF, -40, -30);
  return wetView(t, { kf: false, fish: false }, cam) + OP(ramp(t, tQ, .3) * (1 - ramp(t, tw_[0] - .3, .3)), T(960, 150, "What is an animal?", 76, "#fff", { x: `stroke="${P.ink}" stroke-width="14" paint-order="stroke" stroke-linejoin="round"` }))
    + lab.map(([nm, p, q], i) => t < tw_[i] ? "" : TF(0, 0, 1, OP(ramp(t, tw_[i], .2), `<path d="M${q[0]} ${q[1]} L${n2(p[0])} ${n2(p[1])}" stroke="#fff" stroke-width="5" stroke-linecap="round"/><circle cx="${n2(p[0])}" cy="${n2(p[1])}" r="8" fill="#fff"/>`) + TF(q[0], q[1], spring(t, tw_[i], .4) * (1 + .1 * pulse(t, tw_[i], .03, .5)), tpill(0, 0, nm, 54, "#fff", P.ink, { w: 700 })))).join("")
    + (t >= tL2 ? OP(ramp(t, tL2, .2), `<path d="M1090 800 L${n2(h2[0])} ${n2(h2[1])}" stroke="#fff" stroke-width="5" stroke-linecap="round"/><circle cx="${n2(h2[0])}" cy="${n2(h2[1])}" r="8" fill="#fff"/>`) + TF(1090, 880, spring(t, tL2, .4), tpill(0, 0, "its four legs", 36, P.ink, "#fff", { w: 600 })) : "")
    + buddy("pip", 1700, 1056, 250, t, { aura: true, flip: true, in: s.t0 + .2, poses: [[s.t0, "thinking"], [tw_[0], "pointing"]] }) + HUD(t); };
SC.mark1 = (t, s) => markScene(t, s, { id: "a503", sayId: "a502", who: "pip", n: "1 of 2", text: "Animals are living things that usually have parts such as a head, a body and limbs.", keys: ["head,", "body", "limbs."], size: 66, y: 256 });

/* ============ 7 · where animals live; outer coverings; observable characteristics ============ */
SC.homes = (t, s) => { const L = "a601", tw_ = [W(L, "land") - .5, W(L, "water") - .5, W(L, "both") - .3], labs = ["only on land", "only in water", "on land and in water"];
  const pics = [landPic + TF(0, 130, .62, hen()), waterPic + TF(0, 10, .7, fishG({ wag: t })), waterPic + `<rect x="-300" y="-300" width="600" height="330" fill="#DDF4FF"/>` + TF(10, 60, .7, lilyPad(190, "#66CC5C")) + TF(-10, 52, .66, frog({ throat: t, blink: frogBlink(t) }))];
  return bg("daystage") + pics.map((p, i) => { const k = spring(t, tw_[i], .45); return k < .02 ? "" : TF(960 + (i - 1) * 520, 900, k * (1 + .04 * pulse(t, tw_[i] + .4, .1, .8)), wboard(p, 400, 360, "hm" + i, { lab: labs[i], size: 38 })); }).join("")
    + bookCap(t, L, "Some animals live only on land, while some live only in water. There are also some animals that can live both on land and in water.", 150, { size: 42, maxW: 1500 })
    + buddy("basil", 150, 1064, 160, t, { aura: true, tag: false, in: s.t0 + .2 }) + buddy("momo", 1780, 1064, 160, t, { aura: true, tag: false, flip: true, in: s.t0 + .3 }) + HUD(t); };
const COVERS = [["feathers", (t) => TF(0, 60, .58, kingfisher({ bob: 1.5 * Math.sin(t * 1.7) })), [-34, -10]], ["scales", (t) => TF(0, 0, .62, fishG({ wag: t })), [-10, 10]], ["moist skin", (t) => TF(-10, 60, .66, frog({ throat: t, blink: frogBlink(t), wet: 1 })), [-30, -20]]];
SC.cover = (t, s) => { const L = "a602", t0 = s.t0 + .15, tl = W(L, "outer") - .1;
  return bg("daystage") + COVERS.map(([nm, pic, pt], i) => { const x = 420 + i * 540, k = spring(t, t0 + i * .15, .45), k2 = spring(t, tl + i * .4, .45); return k < .02 ? "" : TF(x - 130, 520, k, pic(t))
      + (k2 > .02 ? `<path d="M${x - 130 + pt[0]} ${520 + pt[1]} L${x + 70} 740" stroke="#fff" stroke-width="6" stroke-linecap="round" opacity="${n2(Math.min(1, k2))}"/><circle cx="${x - 130 + pt[0]}" cy="${520 + pt[1]}" r="9" fill="#fff" opacity="${n2(Math.min(1, k2))}"/>` + TF(x + 70, 740, .9 * k2, swatch(nm === "moist skin" ? "skin" : nm, t)) + TF(x + 70, 930, k2, tpill(0, 0, nm, 44, "#fff", P.ink, { w: 700 })) : ""); }).join("")
    + bookCap(t, L, "Animals have different outer coverings as they live in different places.", 170, { size: 46, maxW: 1100, x: 740 }) + HUD(t); };
SC.observe = (t, s) => { const a = "a701", b = "a702", tS = W(a, "similarities") - .1, tD = W(a, "differences") - .1, tSee = W(b, "see") - .2, tMe = W(b, "measure") - .2, tk = MK("kw_observe") + 2.0, mx = lerp(2100, 620 + 60 * Math.sin((t - tSee) * 1.4), eo((t - tSee) / .6));
  const row = [TF(520, 800, .78, frog({ throat: t, blink: frogBlink(t) })), TF(960, 800, .66, kingfisher({ bob: 1.5 * Math.sin(t * 1.7) })), TF(1420, 730, .72, fishG({ wag: t }))].join("") + [520, 960, 1420].map((x) => `<ellipse cx="${x}" cy="806" rx="150" ry="14" fill="${P.ink}" opacity=".14"/>`).join("");
  return bg("daystage") + row + bookCap(t, a, "Scientists have grouped the diversity of animals around us according to their similarities and differences.", 150, { size: 42, maxW: 1150, x: 740, t1: LT(b) - .2 })
    + (t >= tS && t < LT(b) ? TF(740, 930, spring(t, tS, .4), tpill(0, 0, "What is the same?", 40, P.leafDeep, "#fff", { w: 700 })) : "") + (t >= tD && t < LT(b) ? TF(1190, 930, spring(t, tD, .4), tpill(0, 0, "What is different?", 40, P.orangeDeep, "#fff", { w: 700 })) : "")
    + (t >= tSee ? TF(mx, 690, 1.25, magnifier(110)) + TF(960, 420, spring(t, tSee + .2, .4), tpill(0, 0, "things we can see", 44, "#fff", P.ink, { w: 700 })) : "") + (t >= tMe ? TF(520, 870, spring(t, tMe, .4), ruler(300)) + TF(960, 510, spring(t, tMe + .1, .4), tpill(0, 0, "or measure", 44, "#fff", P.ink, { w: 700 })) : "")
    + (t >= tk ? OP(ramp(t, tk, .3), `<g filter="url(#dropS)"><rect x="330" y="962" width="1260" height="88" rx="20" fill="url(#gPaper)"/><rect x="330" y="962" width="14" height="88" rx="7" fill="${P.sun}"/></g><rect x="372" y="1010" width="${n2(tw("observable characteristics:", 40, 700, "Atkinson Hyperlegible"))}" height="22" rx="5" fill="#FFD75A"/><text x="372" y="1020" font-family="Atkinson Hyperlegible" font-weight="700" font-size="40" fill="${P.ink}">observable characteristics: things you can see or measure</text>`) : "")
    + buddy("pip", 150, 1064, 160, t, { aura: true, tag: false, in: s.t0 + .2, poses: [[s.t0, "sit"], [tSee, "pointing"]] }) + HUD(t); };

/* ============ 8 · Round 1: where can a frog live? ============ */
SC.r1 = (t, s) => { const L = "a801", tSp = W(L, "splash") - .05, tSw = W(L, "swims") - .1;
  return lockN(t, { cards: ["Only on land", "Only in water", "Both"], q: "Where can a frog live?", tq: W(L, "where") - .1, tc: [W(L, "one", 1), W(L, "two"), W(L, "three")], ring0: MK("ring0_1"), dur: 5, lock: "a802",
    obj: (tt) => { const j = clamp((tt - tSp) / .45), inW = tt >= tSp + .45, sw = inW ? .5 + .5 * Math.sin((tt - tSp) * 4) : 0, fx = lerp(400, 500, eio(j)) + (inW ? 14 * Math.sin((tt - tSp) * 1.1) : 0), fy = lerp(566, 640, j) - 70 * Math.sin(Math.PI * j);
      return `<ellipse cx="430" cy="610" rx="165" ry="44" fill="#5FB7C9"/>` + TF(380, 570, .5, lilyPad(190, "#66CC5C")) + TF(fx, fy, .5, frog({ ext: inW ? .35 + .55 * sw : j > 0 ? 1 : 0, blink: frogBlink(tt), throat: tt }))
        + (inW ? `<ellipse cx="${n2(fx)}" cy="632" rx="${n2(70 + 40 * Math.min(1, tt - tSp - .45))}" ry="12" fill="none" stroke="#fff" stroke-width="5" opacity="${n2(clamp(1.6 - (tt - tSp)))}"/><ellipse cx="${n2(fx)}" cy="642" rx="84" ry="20" fill="#5FB7C9" opacity=".6"/>` : "")
        + OP(pulse(tt, tSp + .45, .02, .6), `<g stroke="#fff" stroke-width="6" stroke-linecap="round"><path d="M${n2(fx - 40)} 610 l-22 -34 M${n2(fx)} 600 v-44 M${n2(fx + 40)} 610 l22 -34"/></g>`); },
    picks: [{ who: "momo", id: "a803", word: "2", x: true }, { who: "pip", id: "a804", word: "3" }, { who: "basil", id: "a805", word: "3" }], react: [[LE("a803") + .1, "momo", "thinking"], [LE("a804") + .1, "pip", "pointing"], [LE("a805") + .1, "basil", "cheer"]] }); };

/* ============ 9 · be the frog ============ */
SC.waitw = (t, s) => { const L = "a901", dive = ei((t - (s.t1 - .55)) / .55), FX = FROGXY[0] - 10, FY = FROGXY[1] - 90, cam = [1.25 + 2.4 * dive, lerp(900, FX, dive), lerp(640, FY, dive)], tP = W(L, "be") - .2;
  return wetView(t, {}, cam)
    + OP(1 - dive, buddy("pip", 300, 1056, 230, t, { aura: true, in: s.t0 + .1, poses: [[s.t0, "pointing"], [s.t0 + 1.6, "sit"]] }) + buddy("momo", 1680, 1056, 240, t, { aura: true, flip: true, in: s.t0 + .2, poses: [[s.t0, "sit"], [tP, "cheer"]], nohop: true })
      + (t >= tP ? TF(960, 250, spring(t, tP, .45), tpill(0, 0, "Be the frog!", 70, P.sun, P.ink, { w: 700 })) : "") + HUD(t))
    + wipe(t, s.t1, "#DFF6E6", gx(cam, FX), gy(cam, FY)); };

/* ============ 10 · the reveal: an amphibian ============ */
SC.reveal = (t, s) => { const a = "a1001", e = eo((t - s.t0) / 1.0), cam = [lerp(2.8, 1.1, e), lerp(FROGXY[0], 960, e), lerp(FROGXY[1] - 90, 580, e)], tA = W(a, "three") - .1, lit = t >= tA ? spring(t, tA, .45) : 0;
  return wetView(t, { frog: { wet: 1 } }, cam) + TF(1330, 990, .5, ansCard(3, "Both", { lit }))
    + buddy("pip", 300, 1056, 230, t, { aura: true, in: s.t0 + .5, poses: [[s.t0, "sit"], [tA, "cheer"], [tA + 1.8, "sit"]] }) + buddy("basil", 110, 1060, 170, t, { aura: true, tag: false, in: s.t0 + .6, poses: [[s.t0, "sit"], [tA, "cheer"], [tA + 1.8, "sit"]], nohop: true })
    + buddy("momo", 1700, 1056, 230, t, { aura: true, flip: true, in: s.t0 + .55, poses: [[s.t0, "sit"], [tA, "surprised"], [tA + 1.8, "sit"]] })
    + (t >= tA + .3 ? TF(700, 250, spring(t, tA + .3, .45), tpill(0, 0, "On land AND in water", 60, P.sun, P.ink, { w: 700 })) : "") + wipe(t, s.t0, "#DFF6E6") + HUD(t); };
SC.mark2 = (t, s) => markScene(t, s, { id: "a1003", sayId: "a1002", who: "momo", n: "2 of 2", text: "Amphibians are animals that can live both on land and in water. Amphibians usually have four legs.", keys: ["Amphibians", "land", "water.", "four", "legs."], size: 62, y: 256 });
SC.skin = (t, s) => { const a = "a1004", b = "a1005", e = eio((t - s.t0) / 1.0), cam = [lerp(1.1, CAMF[0], e), lerp(960, CAMF[1], e), lerp(580, CAMF[2], e)], tS = W(a, "skin") - .1, tLg = W(a, "lungs") - .1, tM = W(b, "moist") - .1, tD = W(b, "drying") - .2;
  const pS = fp(CAMF, -40, -112), pL = fp(CAMF, 40, -52), wet = t >= tM ? .5 + .5 * Math.sin((t - tM) * 4) : 0;
  let sp = ""; if (t >= tM) for (let i = 0; i < 7; i++) { const p = fp(CAMF, -80 + i * 28, -118 - 10 * Math.sin(i * 1.7)), v = ((t - tM) * .9 + i * .37) % 1; sp += `<g transform="translate(${n2(p[0])} ${n2(p[1] - 6)}) scale(${n2(.5 * Math.sin(Math.PI * v))}) rotate(${n2(60 * v)})"><path d="M0-32 Q4-4 32 0 Q4 4 0 32 Q-4 4 -32 0 Q-4-4 0-32z" fill="#fff"/></g>`; }
  return wetView(t, { kf: false, fish: false, frog: { wet } }, cam) + sp
    + (t >= tS && t < LT(b) + 9 ? OP(ramp(t, tS, .2), `<path d="M330 400 L${n2(pS[0])} ${n2(pS[1])}" stroke="#fff" stroke-width="5" stroke-linecap="round"/><circle cx="${n2(pS[0])}" cy="${n2(pS[1])}" r="8" fill="#fff"/>`) + TF(330, 400, spring(t, tS, .4), tpill(0, 0, "skin", 54, "#fff", P.ink, { w: 700 })) : "")
    + (t >= tLg && t < LT(b) - .2 ? OP(ramp(t, tLg, .2), `<path d="M1150 560 L${n2(pL[0])} ${n2(pL[1])}" stroke="#fff" stroke-width="5" stroke-linecap="round"/><circle cx="${n2(pL[0])}" cy="${n2(pL[1])}" r="8" fill="#fff"/>`) + TF(1150, 560, spring(t, tLg, .4), tpill(0, 0, "lungs (inside its body)", 44, "#fff", P.ink, { w: 700 })) : "")
    + (t >= tD ? TF(1400, 420, 2.2 * spring(t, tD, .45), sunHeat()) + TF(1400, 560, spring(t, tD + .2, .4), tpill(0, 0, "It does not dry out", 40, P.sun, P.ink, { w: 700 })) : "")
    + bookCap(t, a, "Amphibians can breathe through their skin as well as their lungs.", 150, { size: 44, maxW: 900, x: 590, t1: LT(b) - .2 }) + bookCap(t, b, "They have protective moist skin to prevent them from drying out when they are on land.", 150, { size: 44, maxW: 900, x: 590 })
    + buddy("basil", 1740, 1060, 210, t, { aura: true, flip: true, in: s.t0 + .2, poses: [[s.t0, "sit"], [tM, "surprised"], [tM + 1.6, "sit"]] }) + HUD(t); };
const EGGXY = [860, 800];
SC.eggs = (t, s) => { const a = "a1006", b = "a1007", c = "a1008", ts = MK("stamp1") + .25, tc = W("a1009", "one") - .1, tb = LT(b) - .4, e = eio((t - tb) / .9), cam = [lerp(2.3, 1.06, e), lerp(EGGXY[0] - 60, 960, e), lerp(EGGXY[1] - 30, 580, e)];
  const tw_ = [W(b, "frogs") - .1, W(b, "toads") - .1, W(b, "salamanders") - .1], pics = [landPic + TF(-6, 110, .66, frog()), landPic + TF(-6, 110, .66, frog({ pal: TOADPAL, warts: true })), landPic + TF(10, 96, .7, salamander())], labs = ["frog", "toad", "salamander"];
  return wetView(t, { items: TF(EGGXY[0], EGGXY[1], .8, frogEggs()) + `<ellipse cx="${EGGXY[0]}" cy="${EGGXY[1]}" rx="110" ry="50" fill="none" stroke="#fff" stroke-width="4" opacity="${n2(.5 + .3 * Math.sin(t * 2))}"/>` }, cam)
    + (t < tb + .3 ? OP(1 - ramp(t, tb, .3), TF(gx(cam, EGGXY[0]) + 330, gy(cam, EGGXY[1]) - 160, spring(t, W(a, "eggs") - .1, .4), tpill(0, 0, "eggs, in water", 46, "#fff", P.ink, { w: 700 }))) : "")
    + pics.map((p, i) => { const k = spring(t, tw_[i], .45); return k < .02 ? "" : TF(600 + i * 320, 1052, .82 * k, wboard(p, 330, 290, "am" + i, { lab: labs[i], size: 40 })); }).join("")
    + (t >= tb ? tcard(t, { 0: ts }) + stampPress(t, ts, CARD[0], CARD[1], CARD[2], 0) : "")
    + wPip(t, { in: tb + .2 }) + wBasil(t, { in: tb + .3 }) + wMomo(t, { in: tb + .2, tag: true, poses: [[tb, "sit"], [LE(c) + .1, "cheer"], [LE(c) + 2.2, "sit"]], nohop: true }) + say(c, 1560, 560, t, { size: 46, tail: 190, maxW: 560 })
    + bookCap(t, a, "Amphibians lay their eggs in water.", 150, { size: 48, x: 590, t1: tb }) + bookCap(t, b, "Frogs, toads and salamanders are amphibians.", 150, { size: 44, x: 590, maxW: 900 }) + coin(t, tc, 1180, 420, "+1", "if you showed three fingers") + HUD(t); };
SCORE.push([W("a1009", "one") - .1, 2, 2]);

/* ============ 11 · HOLD ON! Basil's rule ============ */
const RB = [820, 1046, .9], RG = [1640, 700];
function ruleBoard(t, o = {}) { const pics = [waterPic + TF(-10, 20, .6, frog({ ext: .5 + .4 * Math.sin(t * 4), swim: false })) + `<path d="M-200 -40 q30 -14 60 0 q30 14 60 0 q30 -14 60 0 q30 14 60 0 q30 -14 60 0 q30 14 60 0" fill="none" stroke="#fff" stroke-width="6" opacity=".7"/>`, waterPic + `<rect x="-300" y="-300" width="600" height="330" fill="#DDF4FF"/>` + TF(0, 34, .8, duck(t))]; let s = "";
  pics.forEach((p, i) => { const x = -250 + i * 500, k = (o.pk || [1, 1])[i]; if (k < .02) return; s += TF(x, -150, k, `<clipPath id="rb${i}"><rect x="-190" y="-130" width="380" height="250" rx="20"/></clipPath><rect x="-198" y="-138" width="396" height="266" rx="26" fill="#fff" stroke="#C9D2E8" stroke-width="5"/><g clip-path="url(#rb${i})">${p}</g>`)
      + ((o.fish || 0) > .02 ? TF(x + 110, -276, o.fish, `<g transform="rotate(8)">${tpill(0, 0, "a fish?", 36, P.basil, "#fff", { w: 700, nosh: true })}</g>`) : "") + ((o.cov || 0) > .02 ? TF(x, 30, o.cov, tpill(0, 0, ["moist skin", "feathers"][i], 34, P.leafDeep, "#fff", { w: 700, nosh: true })) : ""); });
  return `<ellipse cx="0" cy="4" rx="330" ry="18" fill="${P.ink}" opacity=".22" filter="url(#b4)"/><path d="M-200 0 L-120 -110 M200 0 L120 -110" stroke="#8A5A36" stroke-width="16" stroke-linecap="round"/><rect x="-250" y="-14" width="500" height="20" rx="10" fill="#8A5A36"/>
  <g filter="url(#drop)"><rect x="-540" y="-640" width="1080" height="570" rx="30" fill="${P.basil}"/><rect x="-520" y="-622" width="1040" height="534" rx="18" fill="url(#gPaper)"/></g>
  ${T(0, -530, "If it swims, it is a fish.", 68, P.ink)}${(o.x || 0) > .02 ? `<path d="M-400 -552 H400" stroke="${P.coral}" stroke-width="10" stroke-linecap="round" stroke-dasharray="${n2(800 * Math.min(1, o.x))} 900"/>` + TF(-462, -552, Math.min(1.1, o.x), xBadge(30)) : ""}
  <g transform="translate(0 -170)">${s}</g>`; }
const lizShow = (t, t0) => 1 - ramp(t, t0, .4);   // the hidden duck pops up behind the rail and stays to the end of the scene
SC.rule = (t, s) => { const a = "a1101", b = "a1102", c = "a1103", d = "a1104", r0 = MK("ring0_2"), bell = MK("bell_2"), rs = ringState(t, r0, 5), tX = W(b, "cross") - .15, tH = W(b, "hold") - .1, tOne = W(c, "one") - .1, ring = t >= tX && t < bell + .8;
  const pk = [spring(t, W(a, "frog") - .15, .4), spring(t, W(a, "duck") - .15, .4)], fish = spring(t, W(a, "so") - .1, .4) * (1 - ramp(t, W(c, "many") - .1, .3)), xk = spring(t, W(c, "many") - .1, .4), cov = spring(t, W(c, "look") - .1, .4), tLk = W(c, "look") - .1;
  return wetView(t, { liz: lizShow(t, LT(a) + 1.0) }, CAMW) + `<rect width="1920" height="1080" fill="${P.night}" opacity=".18"/>` + TF(RB[0], RB[1], RB[2], ruleBoard(t, { pk, fish, x: xk, cov }))
    + buddy("basil", 170, 1060, 230, t, { aura: true, in: s.t0 + .1, poses: [[s.t0, "cheer"], [LT(a) - .1, "sit"], [LE(a) + .15, "arms_crossed"], [W(c, "many") - .1, "surprised"], [LT(d) - .12, "oops"], [LE(d) + .1, "sit"]], nohop: true })
    + say(a, 420, 300, t, { size: 40, tail: -190, x: true, maxW: 620 }) + say(d, 430, 330, t, { size: 44, tail: -190, maxW: 600 })
    + (ring ? OP(1 - ss(bell + .5, bell + .8, t), TF(RG[0], RG[1], spring(t, tX, .4), `<g transform="translate(${-RG[0]} ${-RG[1]})">${ringTimer(RG[0], RG[1], t < r0 ? 1 : rs.frac, t < r0 ? 5 : rs.secs, t, { R: 128, sw: 22, tick: rs.tick, shut: pulse(t, bell, .01, .6), inner: TF(RG[0], RG[1] + 6, .5, crossedArms()) })}</g>`) + youPill(RG[0], RG[1] - 178, 1.0) + tpill(RG[0], RG[1] + 220, "cross your arms", 30, P.ink, "#fff")) : "")
    + (t >= tLk ? TF(1600, 640, spring(t, tLk, .45), `<g transform="translate(0 -120)">${magnifier(70)}</g>` + tpill(0, 40, "Look at the", 40, P.sun, P.ink, { w: 700 }) + tpill(0, 118, "outer covering", 46, P.sun, P.ink, { w: 700 })) : "")
    + stamp(t, tH, 820, 420, "HOLD ON!") + bellIcon(t, r0) + coin(t, tOne, 1600, 420, "+1", "arms crossed") + HUD(t); };
SCORE.push([W("a1103", "one") - .1, 3, 2]);

/* ============ 12 · score hand, the lizard ============ */
SC.final = (t, s) => { const L = "a1201"; return finalScene(t, s, L, 2, [[s.t0, null, 1], [W(L, "more") - .1, "More than two? You beat the Buddies!", 3], [W(L, "three") - .1, null, 3]], TF(1260, 1062, .42, trailCard(t, { 0: 0 }))); };
SC.liz = (t, s) => { const L = "a1202"; return lizReveal(t, s, L, wetView(t, { liz: 0 }, CAMW), gx(CAMW, HIDD[0]), gy(CAMW, HIDD[1]), W(L, "it") - .1, "It was the duck, behind the rail!", 60, 10, 78); };

/* ============ 13 · the cliffhanger: a fish that hops on the mud ============ */
SC.cliff = (t, s) => { const L = "a1301", e = eio((t - s.t0) / 1.2), cam = [lerp(1.04, 1.55, e), lerp(960, 1450, e), lerp(580, 740, e)], tF = W(L, "fins") - .2, tHp = W(L, "hops") - .2, tQ = W(L, "is") - .1, tP = W(L, "find") - .1;
  const hops = [0, 1, 2].map((i) => tHp + i * .42), hx = hops.reduce((x, th) => x + 70 * eio((t - th) / .34), 0), hy = hops.reduce((y, th) => y + hop(t, th, .34, 46), 0), out = eo((t - (LT(L) + .2)) / .7);
  const mud = { x: MUDXY[0] + 210 - hx, y: lerp(MUDXY[1] + 80, MUDXY[1] + 26, out) - hy - (hx / 210) * 26, prop: .4 + .6 * out, fin: ss(tF - .2, tF + .3, t), push: hops.reduce((a, th) => Math.max(a, pulse(t, th + .05, .08, .3)), 0) };
  return wetView(t, { mud }, cam) + OP(pulse(t, tF, .1, 1.2), `<circle cx="${n2(gx(cam, mud.x + 10))}" cy="${n2(gy(cam, mud.y - 60))}" r="150" fill="none" stroke="${P.sun}" stroke-width="8"/>`)
    + ["pip", "basil", "momo"].map((w, i) => buddy(w, 190 + i * 250, 1062, 185, t, { aura: true, tag: false, in: s.t0 + .15 + i * .1, poses: [[s.t0, "sit"], [tHp, "surprised"], [tQ, w === "basil" ? "arms_crossed" : "thinking"]] })).join("")
    + (t >= tQ ? TF(1240, 420, spring(t, tQ, .45), tpill(0, 0, "A fish, or an amphibian?", 56, P.ink, "#fff", { w: 700 })) : "")
    + (t >= tP ? TF(520, 430, lerp(2.2, 1, eo((t - tP) / .16)) + .05 * wob(t, tP + .16, .4), `<text x="0" y="50" font-family="Fredoka" font-weight="700" font-size="170" text-anchor="middle" letter-spacing="6" fill="${P.sun}" stroke="${P.ink}" stroke-width="28" stroke-linejoin="round" paint-order="stroke" filter="url(#drop)">PART 2</text>`) : "") + HUD(t); };
SC.nyk = (t, s) => nykScene(t, s, TF(700, 1030, .8, lilyPad(190, "#66CC5C")) + TF(690, 1020, .9, frog({ throat: t, blink: frogBlink(t) })) + TF(1005, 1040, .4, trailCard(t, { 0: 0 })));
})(); }
