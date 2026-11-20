// p2.js: PART 2, "This Fish Walks on LAND! Is It Really a Fish?": birds, fish, the mudskipper. Segments 1-15 of p3_ep05_script.md.
if (PART === 2) { (() => {
const CARD = [1540, 1062, .5], CAMW = [1.04, 960, 580], CAMM = [1.55, 1450, 740], ALL3 = { 0: 0, 1: 0, 2: 0 };
const wPip = (t, o = {}) => buddy("pip", 120, 1064, 165, t, { aura: true, tag: false, ...o }), wBasil = (t, o = {}) => buddy("basil", 320, 1064, 150, t, { aura: true, tag: false, ...o }), wMomo = (t, o = {}) => buddy("momo", 1800, 1062, 170, t, { aura: true, tag: false, flip: true, ...o });
const tcard = (t, st = {}, o = {}) => TF(CARD[0], CARD[1], CARD[2], trailCard(t, st, o));
const gx = (cam, x) => camX(cam, x), gy = (cam, y) => camY(cam, y);
const lineTo = (t, t0, q, p) => OP(ramp(t, t0, .2), `<path d="M${q[0]} ${q[1]} L${n2(p[0])} ${n2(p[1])}" stroke="#fff" stroke-width="5" stroke-linecap="round"/><circle cx="${n2(p[0])}" cy="${n2(p[1])}" r="8" fill="#fff"/>`);
const lab = (t, t0, q, ps, txt, size = 54) => t < t0 ? "" : ps.map((p) => lineTo(t, t0, q, p)).join("") + TF(q[0], q[1], spring(t, t0, .4) * (1 + .1 * pulse(t, t0, .03, .5)), tpill(0, 0, txt, size, "#fff", P.ink, { w: 700 }));
// under the water, seen from the side (the fish scenes)
const uwView = (t) => { let pl = ""; for (let i = 0; i < 16; i++) { const x = -60 + i * 132 + 40 * hash(i, 3), h = 120 + 240 * hash(i, 5), sw = 24 * Math.sin(t * 1.1 + i); pl += `<path d="M${n2(x)} 1100 Q${n2(x + sw)} ${n2(1100 - h * .6)} ${n2(x - sw * .5)} ${n2(1100 - h)}" fill="none" stroke="${i % 3 ? "#2F8A5C" : "#49A86A"}" stroke-width="${n2(12 + 14 * hash(i, 7))}" stroke-linecap="round" opacity=".8"/>`; }
  return `<rect width="1920" height="1080" fill="url(#uwF)"/>${uwRays(t)}<ellipse cx="960" cy="1130" rx="1300" ry="120" fill="#C9B88A" opacity=".8"/>${pl}` + [0, 1, 2, 3, 4, 5, 6, 7].map((i) => { const v = ((t * .12 + hash(i, 3)) % 1); return `<circle cx="${n2(200 + hash(i, 5) * 1500 + 20 * Math.sin(t + i))}" cy="${n2(1000 - 900 * v)}" r="${n2(6 + 8 * hash(i, 7))}" fill="none" stroke="#fff" stroke-width="3" opacity="${n2(.5 * Math.sin(Math.PI * v))}"/>`; }).join(""); };

/* ============ 1 · silent recap montage (four shots, 1 s each) ============ */
const THUMB2 = (t) => wetView(t, { mud: { prop: 1 }, frog: false, kf: false }, [2.3, 1400, 700]) + buddy("basil", 230, 800, 290, t, { aura: true, tag: false, pose: "surprised", still: true }) + logo(t);
SC.recap = (t, s) => { if (location.search.includes("thumb")) return THUMB2(t); const i = Math.min(3, Math.floor((t - s.t0) / 1.0)), u = t - s.t0 - i; let v;
  if (i === 0) v = wetView(t, {}, [1.04 + .04 * u, 960, 580]);
  else if (i === 1) { const j = clamp((u - .3) / .5); v = wetView(t, { kf: false, fish: false, frog: { ext: j > 0 && j < 1 ? 1 : 0, x: FROGXY[0] - 30 + 190 * j, y: FROGXY[1] - 150 * Math.sin(Math.PI * j) + 40 * j, rot: -24 + 60 * j } }, [2.0, 660, 700]); }
  else if (i === 2) v = bg("daystage") + TF(960, 1012, 1.12, trailCard(t, { 0: s.t0 + 2.4 })) + stampPress(t, s.t0 + 2.4, 960, 1012, 1.12, 0);
  else v = wetView(t, { mud: { prop: .5 + .5 * Math.sin(u * 6) } }, CAMM) + TF(1500, 330, spring(t, s.t0 + 3.2, .4), `<g filter="url(#drop)"><circle r="90" fill="url(#gSun)"/></g>${T(0, 44, "?", 130, P.ink)}`);
  return v + `<rect width="1920" height="1080" fill="#fff" opacity="${n2(.5 * (1 - clamp(u / .18)))}"/>` + tpill(960, 60, "Part 1", 34, P.ink, P.sun, { w: 700, ls: 3 }); };

/* ============ 2 · "Last time..." ============ */
SC.lasttime = (t, s) => { const L = "b201", tF = W(L, "frog") - .2, tA = W(L, "amphibian") - .1, tM = W(L, "moist") - .1, tO = W(L, "outer") - .1, tT = W(L, "two") - .2, g = pulse(t, tF + .2, .2, 2.0), g2 = pulse(t, tT + .3, .2, 2.0), fxn = FISHXY[0] + 110 * Math.sin(t * .5);
  return wetView(t, { back: glowDisc(FROGXY[0] - 20, FROGXY[1] - 60, 160, g) + glowDisc(KFXY[0], KFXY[1] - 60, 130, g2) + glowDisc(fxn, FISHXY[1], 120, g2), frog: { wet: t >= tM ? .5 + .5 * Math.sin((t - tM) * 4) : 0 } }, CAMW)
    + (t >= tA ? TF(gx(CAMW, 560), gy(CAMW, 560), spring(t, tA, .45), tpill(0, 0, "amphibian", 44, P.leafDeep, "#fff", { w: 700 })) : "") + (t >= tM ? TF(gx(CAMW, 330), gy(CAMW, 640), spring(t, tM, .45), tpill(0, 0, "moist skin", 40, "#fff", P.ink, { w: 700 })) : "")
    + (t >= tO ? TF(700, 330, spring(t, tO, .45) * (1 - ramp(t, tT - .1, .25)), tpill(0, 0, "outer covering = an observable characteristic", 38, P.sun, P.ink, { w: 700 })) : "")
    + (t >= tT ? [[KFXY[0] + 110, KFXY[1] - 150], [FISHXY[0] + 20, FISHXY[1] - 110]].map(([x, y], i) => TF(gx(CAMW, x), gy(CAMW, y), spring(t, tT + i * .2, .4), `<g filter="url(#dropS)"><circle r="40" fill="url(#gSun)"/></g>${T(0, 20, "?", 58, P.ink)}`)).join("") : "")
    + tcard(t, { 0: 0 }, { pulse: [0, g2, g2] }) + wPip(t, { in: s.t0 + .1 }) + wBasil(t, { in: s.t0 + .2 }) + wMomo(t, { in: s.t0 + .3, poses: [[s.t0, "sit"], [tT, "pointing"]] }) + HUD(t); };

/* ============ 3 · today's goals, the game ============ */
SC.goals = (t, s) => goals3(t, s, [["How to spot a bird", TF(0, 0, .5, feather())], ["What makes a fish a fish", TF(0, 0, .52, fishG())], ["The fish that hops on land", TF(-14, 44, .5, mudskipper())]]);
SC.game = (t, s) => gameScene(t, s, "b301", false);

/* ============ 4 · the kingfisher; Round 1: is a penguin a bird? ============ */
const CAMK = [2.5, 950, 380], kp = (x, y) => [gx(CAMK, KFXY[0] + x * .62), gy(CAMK, KFXY[1] + y * .62)];
SC.bird = (t, s) => { const L = "b401", e = eio((t - s.t0) / 1.0), cam = [lerp(CAMW[0], CAMK[0], e), lerp(CAMW[1], CAMK[1], e), lerp(CAMW[2], CAMK[2], e)], tB = W(L, "beak") - .1, tWg = W(L, "wings") - .1, tO = W(L, "outer") - .2;
  return wetView(t, { kf: { flap: .5 * pulse(t, tWg + .2, .15, .6) } }, cam) + lab(t, tB, [470, 300], [kp(-110, -152)], "beak") + lab(t, tWg, [1420, 620], [kp(34, -66)], "wings")
    + (t >= tO ? TF(1330, 330, spring(t, tO, .45), tpill(0, 0, "outer covering?", 56, P.sun, P.ink, { w: 700 })) : "")
    + buddy("momo", 250, 1056, 250, t, { aura: true, in: s.t0 + .2, poses: [[s.t0, "pointing"], [tO, "thinking"]] }) + HUD(t); };
SC.r1 = (t, s) => { const L = "b402", tNo = W(L, "cannot") - .1;
  return lockN(t, { cards: ["Yes", "No"], q: "Is a penguin a bird?", tq: W(L, "is") - .1, tc: [W(L, "one", 1), W(L, "two")], ring0: MK("ring0_1"), dur: 5, lock: "b403",
    obj: (tt) => `<ellipse cx="430" cy="606" rx="140" ry="30" fill="#DDF4FF"/>` + TF(430, 604, .78, penguin({ flap: tt >= tNo ? Math.abs(Math.sin((tt - tNo) * 7)) * (1 - ss(tNo + 1.2, tNo + 1.6, tt)) : 0 })),
    picks: [{ who: "pip", id: "b404", word: "2", x: true }, { who: "momo", id: "b405", word: "1" }, { who: "basil", id: "b406", word: "1" }], react: [[LE("b404") + .1, "pip", "thinking"], [LE("b405") + .1, "momo", "pointing"], [LE("b406") + .1, "basil", "cheer"]] }); };
const nestEggs = `<ellipse cx="0" cy="70" rx="150" ry="50" fill="#8A5A36"/><g stroke="#B8865A" stroke-width="7" stroke-linecap="round" fill="none"><path d="M-140 60 q140 60 280 0 M-120 80 q120 44 240 0 M-130 50 q60 -20 120 0 M10 50 q60 -20 120 0"/></g>` + [-56, 0, 56].map((x) => TF(x, 28, 1.0, egg())).join("");
SC.birds = (t, s) => { const ids = ["b408", "b409", "b410", "b411"], caps = ["Birds live largely on land. Birds have beaks that enable them to pick up food.", "Birds have wings and can usually fly.", "Some birds such as ostriches and penguins cannot fly.", "Birds lay eggs."];
  const tw_ = [W("b408", "beaks") - .2, W("b409", "wings") - .2, W("b410", "ostriches") - .2, W("b411", "eggs") - .3], labs = ["beak", "wings", "cannot fly", "eggs"], fl = Math.abs(Math.sin(t * 6));
  const pics = [landPic + TF(40, 110, .62, kingfisher({ fish: 1 })), `<rect x="-300" y="-300" width="600" height="600" fill="#BFE6FF"/>` + TF(10, 60 + 10 * Math.sin(t * 6), .6, kingfisher({ flap: fl })), landPic + TF(-70, 130, .46, ostrich()) + TF(84, 130, .5, penguin()), landPic + TF(0, 20, .8, nestEggs)];
  return bg("daystage") + pics.map((p, i) => { const k = spring(t, tw_[i], .45); return k < .02 ? "" : TF(300 + i * 440, 1000, k * (1 + .04 * pulse(t, tw_[i] + .3, .1, .8)), wboard(p, 360, 330, "bd" + i, { lab: labs[i], size: 40 })); }).join("")
    + ids.map((id, i) => bookCap(t, id, caps[i], 170, { size: 46, maxW: 1250, x: 800, t1: ids[i + 1] ? LT(ids[i + 1]) - .25 : 1e9 })).join("")
    + (t >= W("b409", "usually") - .05 && t < LT("b410") - .25 ? TF(740, 330, spring(t, W("b409", "usually") - .05, .4), tpill(0, 0, "usually: not always!", 38, P.sun, P.ink, { w: 700 })) : "") + HUD(t); };
SC.mark1 = (t, s) => markScene(t, s, { id: "b413", sayId: "b412", who: "basil", n: "1 of 2", text: "Birds have an outer covering of feathers.", keys: ["outer", "covering", "feathers."], size: 78, y: 256, extra: TF(1480, 880, spring(t, s.t0 + .5, .5) * .62, swatch("feathers", t)) + TF(1160, 880, spring(t, s.t0 + .6, .5) * .7, feather()) });
SC.birdans = (t, s) => { const a = "b414", b = "b415", tA = W(a, "one") - .1, tF = W(a, "feathers") - .1, tB = W(a, "bird") - .1, ts = MK("stamp2") + .25, tc = W("b416", "one", 1) - .1, lit = t >= tA ? spring(t, tA, .45) : 0;
  return bg("daystage") + `<ellipse cx="760" cy="1000" rx="230" ry="26" fill="${P.ink}" opacity=".16"/>` + TF(760, 1000, 1.7, penguin({ flap: .5 + .5 * Math.sin(t * 3) })) + lab(t, tF, [1120, 560], [[800, 800]], "feathers") + (t >= tB ? TF(760, 380, spring(t, tB, .45), `<g transform="rotate(-4)">${tpill(0, 0, "a BIRD", 70, P.leafDeep, "#fff", { w: 700, ls: 3 })}</g>`) : "")
    + TF(1180, 960, .5, ansCard(1, "Yes", { lit })) + tcard(t, { 0: 0, 1: ts }) + stampPress(t, ts, CARD[0], CARD[1], CARD[2], 1)
    + buddy("pip", 260, 1060, 250, t, { aura: true, in: s.t0 + .1, poses: [[s.t0, "surprised"], [LT(b) - .12, "sit"], [LE(b) + .1, "cheer"], [LE(b) + 2.0, "sit"]], nohop: true }) + say(b, 420, 520, t, { size: 44, tail: -130, maxW: 520 })
    + wMomo(t, { in: s.t0 + .2 }) + coin(t, tc, 1180, 560, "+1", "if you showed one finger") + HUD(t); };
SCORE.push([W("b416", "one", 1) - .1, 1, 1]);

/* ============ 5 · fish: fins, scales, gills ============ */
SC.fish = (t, s) => { const a = "b501", b = "b502", tDn = W(a, "down") - .1, e = eio((t - tDn) / 1.2), cam = [lerp(CAMW[0], 3.0, e), lerp(CAMW[1], FISHXY[0], e), lerp(CAMW[2], FISHXY[1], e)], tU = W(a, "fish") - .35, uw = ramp(t, tU, .35), sx = lerp(-500, 900, eo((t - tU) / 1.4)), FS = 2.2, FY = 580;
  const tFn = W(b, "fins") - .1, pt = (x, y) => [sx + x * FS, FY + 12 * Math.sin(t * 1.3) + y * FS];
  return (uw < 1 ? wetView(t, {}, cam) : "") + OP(uw, uwView(t) + TF(sx, FY + 12 * Math.sin(t * 1.3), FS, fishG({ wag: t }))
    + lab(t, tFn, [1180, 300], [pt(4, -84), pt(26, 36)], "fins") + lab(t, tFn + .5, [330, 820], [pt(-176, 20)], "tail", 46)
    + bookCap(t, b, "Fish are animals that usually live only in water. They have fins to help them swim in water.", 150, { size: 44, maxW: 1150, x: 760 }))
    + buddy("pip", 1730, 1060, 210, t, { aura: true, flip: true, in: s.t0 + .2, poses: [[s.t0, "pointing"], [tU, "sit"]] }) + HUD(t); };
SC.mark2 = (t, s) => markScene(t, s, { id: "b504", sayId: "b503", who: "momo", n: "2 of 2", text: "Fish have an outer covering of scales.", keys: ["outer", "covering", "scales."], size: 78, y: 256, extra: TF(1480, 880, spring(t, s.t0 + .5, .5) * .62, swatch("scales", t)) + TF(1130, 880, spring(t, s.t0 + .6, .5) * .7, fishG({ wag: t })) });
SC.gills = (t, s) => { const a = "b505", b = "b506", tG = W(a, "gills") - .15, tb = LT(b) - .3, e = eio((t - tb) / .8), FS = lerp(3.0, 1.5, e), fx = lerp(640, 420, e), fy = lerp(600, 470, e) + 10 * Math.sin(t * 1.3), gl = t >= tG ? .6 + .4 * Math.sin((t - tG) * 5) : 0;
  const tC = W(b, "cod") - .2, tGp = W(b, "guppy") - .2, gp = [fx + 86 * FS, fy];
  let flow = ""; if (t >= tG && t < tb + .5) for (let i = 0; i < 6; i++) { const v = ((t - tG) * .8 + i / 6) % 1; flow += `<path d="M${n2(gp[0] + 30 + 260 * v)} ${n2(gp[1] - 60 + i * 24)} h-50" stroke="#fff" stroke-width="6" stroke-linecap="round" opacity="${n2(.7 * Math.sin(Math.PI * v))}"/>`; }
  const codP = waterPic + TF(-10, -10, .8, fishG({ pal: CODPAL, spots: 1, barbel: 1, wag: t })) + [[-90, 110], [-50, 124], [-10, 112], [30, 126], [70, 112], [-30, 96], [50, 98]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="11" fill="#FFE9B8" stroke="#C9A86A" stroke-width="3"/>`).join("");
  const gupP = waterPic + TF(-20, -30, .62, fishG({ pal: GUPPAL, bigTail: 1.7, wag: t })) + [[-80, 96, .2], [10, 116, .22], [96, 92, .18]].map(([x, y, k], i) => TF(x + 6 * Math.sin(t * 2 + i), y, k, fishG({ pal: GUPPAL, bigTail: 1.7, wag: t + i, scales: false }))).join("");
  return uwView(t) + flow + TF(fx, fy, FS, fishG({ wag: t * (1 - .6 * (1 - e)), gill: gl }))
    + (t < tb ? lab(t, tG, [1280, 420], [[gp[0] + 6, gp[1] - 50]], "gills") : "")
    + (t >= tC ? TF(1060, 1040, spring(t, tC, .45), wboard(codP, 380, 330, "cd", { lab: "cod: lays eggs", size: 38 })) : "") + (t >= tGp ? TF(1520, 1040, spring(t, tGp, .45), wboard(gupP, 380, 330, "gp", { lab: "guppy: young born alive", size: 34 })) : "")
    + bookCap(t, a, "Fish usually breathe through their gills.", 170, { size: 50, x: 800, t1: tb }) + bookCap(t, b, "Some fish, such as cod, lay eggs. Other fish, such as the guppy and some sharks, give birth to their young alive.", 150, { size: 42, maxW: 1150, x: 760 }) + HUD(t); };

/* ============ 6 · Round 2: the animal on the mud ============ */
SC.r2 = (t, s) => { const L = "b601", tHp = W(L, "hops") - .2, tw_ = [W(L, "fins") - .1, W(L, "scales") - .1, W(L, "gills") - .1];
  return lockN(t, { cards: ["An amphibian", "A bird", "A fish"], q: "What is it?", tq: W(L, "what") - .1, tc: [W(L, "one"), W(L, "two", 1), W(L, "three")], ring0: MK("ring0_2"), dur: 5, lock: "b602",
    obj: (tt) => { const hy = [0, 1, 2].reduce((y, i) => y + hop(tt, tHp + i * .4, .34, 30), 0); return `<ellipse cx="430" cy="610" rx="165" ry="40" fill="#8A7054"/><ellipse cx="430" cy="604" rx="150" ry="30" fill="#A98C6C"/>` + TF(446, 600 - hy, .62, mudskipper({ blink: ((tt + .4) % 2.9) < .12 }))
      + ["fins", "scales", "gills"].map((w, i) => tt >= tw_[i] && tt < MK("ring0_2") - .4 ? TF(430 + (i - 1) * 118, 366 - (i === 1 ? 46 : 0), spring(tt, tw_[i], .4), tpill(0, 0, w, 30, "#fff", P.ink, { w: 700 })) : "").join(""); },
    picks: [{ who: "basil", id: "b603", word: "1", x: true }, { who: "pip", id: "b604", word: "3" }, { who: "momo", id: "b605", word: "3" }], react: [[LE("b603") + .1, "basil", "arms_crossed"], [LE("b604") + .1, "pip", "pointing"], [LE("b605") + .1, "momo", "pointing"]] }); };

/* ============ 7 · be the mudskipper ============ */
SC.waitw = (t, s) => { const L = "b701", dive = ei((t - (s.t1 - .55)) / .55), FX = MUDXY[0] - 50, FY = MUDXY[1] - 50, cam = [1.4 + 2.4 * dive, lerp(1300, FX, dive), lerp(700, FY, dive)], tP = LT(L);
  return wetView(t, { mud: {} }, cam)
    + OP(1 - dive, buddy("pip", 300, 1056, 230, t, { aura: true, in: s.t0 + .1, poses: [[s.t0, "pointing"], [s.t0 + 1.6, "sit"]] }) + buddy("basil", 1680, 1056, 230, t, { aura: true, flip: true, in: s.t0 + .2, poses: [[s.t0, "sit"], [tP, "cheer"]], nohop: true })
      + (t >= tP ? TF(760, 250, spring(t, tP, .45), tpill(0, 0, "Be the mudskipper!", 70, P.sun, P.ink, { w: 700 })) : "") + HUD(t))
    + wipe(t, s.t1, "#E6E9D0", gx(cam, FX), gy(cam, FY)); };

/* ============ 8 · the reveal: a special fish ============ */
SC.reveal = (t, s) => { const a = "b801", b = "b802", e = eo((t - s.t0) / 1.0), CR = [1.35, 1380, 720], cam = [lerp(2.8, CR[0], e), lerp(MUDXY[0] - 50, CR[1], e), lerp(MUDXY[1] - 50, CR[2], e)], tA = W(a, "three") - .1, lit = t >= tA ? spring(t, tA, .45) : 0, ts = MK("stamp3") + .25, tc = W("b803", "one") - .1;
  return wetView(t, { mud: {} }, cam) + TF(1150, 990, .5, ansCard(3, "A fish", { lit })) + tcard(t, { 0: 0, 1: 0, 2: ts }) + stampPress(t, ts, CARD[0], CARD[1], CARD[2], 2)
    + (t >= LT(b) ? TF(gx(CR, MUDXY[0]) - 40, gy(CR, MUDXY[1]) - 190, spring(t, LT(b), .45), tpill(0, 0, "fins · scales · gills", 38, "#fff", P.ink, { w: 700 })) : "")
    + buddy("pip", 300, 1056, 230, t, { aura: true, in: s.t0 + .5, poses: [[s.t0, "sit"], [tA, "cheer"], [tA + 1.8, "sit"]] }) + buddy("basil", 110, 1060, 170, t, { aura: true, tag: false, in: s.t0 + .6, poses: [[s.t0, "sit"], [tA, "surprised"], [tA + 1.8, "sit"]] })
    + buddy("momo", 760, 1060, 200, t, { aura: true, tag: false, in: s.t0 + .55, poses: [[s.t0, "sit"], [tA, "cheer"], [tA + 1.8, "sit"]], nohop: true })
    + bookCap(t, b, "Mudskippers are special fish that can live on land as well as in water.", 150, { size: 46, maxW: 1100, x: 760 }) + coin(t, tc, 1150, 600, "+1", "if you showed three fingers") + wipe(t, s.t0, "#E6E9D0") + HUD(t); };
SCORE.push([W("b803", "one") - .1, 2, 2]);

/* ============ 9 · Showdown: Momo's field notes ============ */
// Momo's field notes on an easel; 960 x 640; origin = the middle of the easel's feet. o: lit, badge, x, fixing, rub, write, tick
function fieldNotes(t, o = {}) { const lit = o.lit || [0, 0, 0], rub = o.rub || 0, wr = o.write === undefined ? 1 : o.write, OLD = "A starfish is a fish.", NEW = "A starfish is not a fish.";
  const rows = [["A frog is an amphibian.", TF(-6, 34, .34, frog())], ["A penguin is a bird.", TF(0, 50, .36, penguin())], [OLD, TF(0, 0, .42, seaStar())]]; let s = "";
  rows.forEach(([txt, pic], i) => { const y = -610 + i * 150, fx = i === 2 && o.fixing; s += `<g transform="translate(0 ${y})">${lit[i] > .05 ? `<rect x="-420" y="-64" width="840" height="128" rx="24" fill="${P.sun}" opacity="${n2(.55 * lit[i])}"/>` : ""}<g transform="translate(-370 0) scale(${n2(1 + .18 * (o.badge || [0, 0, 0])[i])})"><circle r="38" fill="${P.momo}"/>${T(0, 17, i + 1, 50, "#fff")}</g>
    ${fx ? `<text x="-300" y="16" font-family="Fredoka" font-weight="600" font-size="44" fill="${P.ink}" opacity="${n2(1 - rub)}">${OLD}</text><text x="-300" y="16" font-family="Fredoka" font-weight="600" font-size="44" fill="#1F8A4C" style="clip-path:inset(-30px ${n2(100 - 100 * wr)}% -30px 0)">${NEW}</text>` : `<text x="-300" y="16" font-family="Fredoka" font-weight="600" font-size="44" fill="${P.ink}">${txt}</text>`}
    <g transform="translate(400 0)">${pic}</g>${i === 2 && o.x ? TF(-448, 0, o.x, xBadge(26)) : ""}</g><path d="M-410 ${y + 74} H410" stroke="${P.ink2}" stroke-width="2.5" stroke-dasharray="3 9" opacity=".4"/>`; });
  return `<ellipse cx="0" cy="4" rx="330" ry="18" fill="${P.ink}" opacity=".22" filter="url(#b4)"/><path d="M-200 0 L-90 -400 M200 0 L90 -400 M0 0 V-300" stroke="#8A5A36" stroke-width="16" stroke-linecap="round"/><rect x="-330" y="-176" width="660" height="20" rx="10" fill="#8A5A36"/>
  <g filter="url(#drop)"><rect x="-480" y="-810" width="960" height="640" rx="26" fill="url(#gPaper)" stroke="${P.momo}" stroke-width="8"/></g>${T(0, -716, "My field notes", 56, P.ink)}${s}${o.tick ? TF(410, -250, o.tick, tickBadge(40)) : ""}`; }
const NOTE = [980, 1056, .95], lizShow = (t, t0) => 1 - ramp(t, t0, .25) * (1 - ramp(t, t0 + 3.2, .2));
const showView = (t, o = {}) => wetView(t, { mud: {}, lizR: o.liz === undefined ? 1 : o.liz }, CAMW) + `<rect width="1920" height="1080" fill="${P.night}" opacity=".16"/>` + TF(NOTE[0], NOTE[1], NOTE[2], fieldNotes(t, o.notes || {})) + (o.side || "");
SC.show = (t, s) => { const a = "b901", b = "b902", c = "b903", r0 = MK("ring0_3"), bell = MK("bell_3"), rs = ringState(t, r0, 6), tLz = LT(b) + .3;
  const tr = [W(b, "one"), W(b, "two"), W(b, "three")], tcn = [W(c, "one", 1), W(c, "two"), W(c, "three")], tP = LT("b905"), tB = LT("b906"), tO = LT("b907");
  const lit = [0, 1, 2].map((i) => t < LT(c) ? (t >= tr[i] - .1 && t < (tr[i + 1] || LE(b)) - .1 ? 1 : 0) : 0), badge = [0, 1, 2].map((i) => Math.max(pulse(t, tcn[i], .04, .5), t >= r0 && t < bell ? (Math.floor((t - r0) / .5) % 3 === i ? .5 + .5 * rs.tick : 0) : 0));
  const nf = t >= tcn[2] - .1 ? 3 : t >= tcn[1] - .1 ? 2 : 1, ringOn = t >= tcn[0] - .3 && t < bell + .8, RX = 255, RY = 760;
  return showView(t, { liz: lizShow(t, tLz), notes: { lit, badge, x: spring(t, tP + .5, .4) } })
    + buddy("momo", 1720, 1060, 270, t, { aura: true, flip: true, in: s.t0 + .1, poses: [[s.t0, "cheer"], [LT(a) - .12, "sit"], [LE(b) + .2, "thinking"], [tO - .12, "oops"]], nohop: true }) + say(a, 1560, 560, t, { size: 50, tail: 120 }) + say("b907", 1600, 440, t, { size: 56, tail: 100 })
    + (ringOn ? OP(1 - ss(bell + .5, bell + .8, t), TF(RX, RY, spring(t, tcn[0] - .3, .4), `<g transform="translate(${-RX} ${-RY})">${ringTimer(RX, RY, t < r0 ? 1 : rs.frac, t < r0 ? 6 : rs.secs, t, { R: 128, sw: 22, tick: rs.tick, shut: pulse(t, bell, .01, .6), inner: TF(RX, RY + 60, .62, countHand(nf)) })}</g>`) + youPill(RX, RY - 178, 1.0) + tpill(RX, RY + 222, "line 1, 2 or 3?", 30, P.ink, "#fff")) : "")
    + (t >= bell + .9 ? buddy("pip", 150, 1062, 200, t, { aura: true, in: bell + .9, poses: [[bell + .9, "thinking"], [tP - .12, "sit"], [LE("b905") + .1, "pointing"]] }) + pickNum("pip", 290, 990, t, tP - .1, "3") + buddy("basil", 400, 1062, 180, t, { aura: true, in: bell + 1.0, poses: [[bell + 1, "arms_crossed"], [tB - .12, "sit"], [LE("b906") + .1, "cheer"]], nohop: true }) + pickNum("basil", 520, 990, t, tB - .1, "3")
      + say("b905", 270, 730, t, { size: 38, tail: -110, maxW: 400 }) + say("b906", 300, 760, t, { size: 38, tail: 100, maxW: 400 }) : "")
    + stamp(t, LT("b904") - .08, 960, 480) + bellIcon(t, r0) + HUD(t); };
SC.fixed = (t, s) => { const b = "b908", h = "b909", tc = W("b910", "two") - .1, rub = ss(s.t0 + .15, s.t0 + .6, t), wr = ss(s.t0 + .6, LT(b) + .9, t), tS = W(h, "scales") - .1, tG = W(h, "gills") - .1, tH = LT(h) - .2;
  const star = `<rect x="-300" y="-300" width="600" height="600" fill="#BFE6FF"/><rect x="-300" y="60" width="600" height="300" fill="#F1DDB0"/>` + TF(0, 20, 1.1, seaStar());
  return showView(t, { notes: { fixing: true, rub, write: wr, tick: spring(t, LE(b) - .2, .45) } })
    + (t >= tH ? TF(250, 1050, spring(t, tH, .45), wboard(star, 380, 330, "ss", { lab: "also called a sea star", size: 32 })) + (t >= tS ? TF(250, 570, spring(t, tS, .4), tpill(0, 0, "no scales", 40, P.ink, "#fff", { w: 700 })) : "") + (t >= tG ? TF(250, 490, spring(t, tG, .4), tpill(0, 0, "no gills", 40, P.ink, "#fff", { w: 700 })) : "") : "")
    + buddy("momo", 1720, 1060, 270, t, { aura: true, flip: true, poses: [[s.t0, "sit"], [LE(b) + .1, "cheer"], [LE(b) + 2, "sit"]], nohop: true }) + say(b, 1640, 520, t, { size: 46, tail: 80, maxW: 520 })
    + bookCap(t, h, "Starfish are not fish! This is because they do not have scales or gills.", 150, { size: 44, maxW: 1150, x: 760 }) + coin(t, tc, 1500, 380, "+2", "if you showed three fingers") + HUD(t); };
SCORE.push([W("b910", "two") - .1, 4, 2]);

/* ============ 10 · three stamps, the chant ============ */
SC.stamps = (t, s) => { const L = "b1001", t0 = LT(L), fl = [0, 1, 2].map((i) => pulse(t, t0 + .2 + i * .5, .05, 1.0));
  const an = [TF(430, 560, 1.0, frog({ throat: t, blink: frogBlink(t) })), TF(960, 540, .9, kingfisher({ bob: 1.5 * Math.sin(t * 1.7) })), TF(1480, 470, 1.0, fishG({ wag: t }))];
  return bg("daystage") + an.map((a, i) => { const k = spring(t, s.t0 + .1 + i * .12, .45); return k < .02 ? "" : `<g transform="translate(${[430, 960, 1480][i]} ${[560, 540, 470][i]}) scale(${n2(k * (1 + .08 * fl[i]))}) translate(${-[430, 960, 1480][i]} ${-[560, 540, 470][i]})">${a}</g>`; }).join("")
    + TF(960, 1040, .92, trailCard(t, ALL3, { flash: fl })) + buddy("pip", 200, 1056, 250, t, { aura: true, in: s.t0 + .1, poses: [[s.t0, "cheer"], [s.t0 + 1.8, "sit"]] }) + buddy("momo", 1720, 1056, 250, t, { aura: true, flip: true, in: s.t0 + .2, poses: [[s.t0, "cheer"], [s.t0 + 1.8, "sit"]] }) + HUD(t); };
SC.chant = (t, s) => chantScene(t, s, "c1003", { sayId: "u1002" });

/* ============ 12 · score hand, the lizard ============ */
SC.final = (t, s) => { const L = "b1201"; return finalScene(t, s, L, 2, [[s.t0, null, 1], [W(L, "more") - .1, "More than two? You beat the Buddies!", 3], [W(L, "four") - .1, null, 4]], TF(1260, 1062, .42, trailCard(t, ALL3))); };
SC.liz = (t, s) => { const L = "b1202"; return lizReveal(t, s, L, wetView(t, { mud: {}, lizR: 0 }, CAMW), gx(CAMW, 1712), gy(CAMW, 668), W(L, "is") - .1, "Is its skin moist, or dry?", -210); };

/* ============ 13 · the dare for Episode 6 ============ */
const SIX = [["AMPHIBIANS", "#2FA65A"], ["BIRDS", "#F08A24"], ["FISH", "#3A8DFF"], ["INSECTS", "#8A6FD6"], ["REPTILES", "#8A6FD6"], ["MAMMALS", "#8A6FD6"]];
SC.dare = (t, s) => { const L = "b1301", tw_ = [W(L, "insects") - .1, W(L, "reptiles") - .1, W(L, "mammals") - .1], tA = W(L, "ant") - .25, tSp = W(L, "spider") - .25, tO = W(L, "only") - .1, tCt = W(L, "counting") - .2, tN = W(L, "lock") - .1;
  const tiles = SIX.map(([nm, col], i) => { const k = spring(t, s.t0 + .1 + i * .1, .45), done = i < 3, lit = done ? 0 : pulse(t, tw_[i - 3], .05, 1.2); return k < .02 ? "" : TF(190 + i * 262, 300, k * (1 + .08 * lit), `<g filter="url(#${lit > .2 ? "glowS" : "dropS"})"><rect x="-120" y="-64" width="240" height="128" rx="30" fill="${done ? col : "#fff"}" stroke="${col}" stroke-width="6" ${done ? "" : 'stroke-dasharray="14 10"'}/></g>${T(0, 12, nm, 31, done ? "#fff" : P.ink, { ls: 1 })}` + (done ? TF(96, -52, 1, tickBadge(24)) : TF(96, -52, 1, `<circle r="26" fill="url(#gSun)"/>${T(0, 13, "?", 38, P.ink)}`))); }).join("");
  const pic = (inner) => `<rect x="-300" y="-300" width="600" height="600" fill="#F1E9D2"/>` + inner, q = pulse(t, tO, .1, 1.5);
  return bg("daystage") + tiles + OP(ramp(t, s.t0 + .2, .3), T(760, 170, "Six animal groups", 60, P.ink))
    + (t >= tA ? TF(640, 870, .9 * spring(t, tA, .45) * (1 + .03 * q), wboard(pic(TF(0, 0, 1.15, ant())), 420, 330, "an", { lab: "ant", size: 40 })) : "") + (t >= tSp ? TF(1240, 870, .9 * spring(t, tSp, .45) * (1 + .03 * q), wboard(pic(TF(10, 0, 1.15, spider())), 420, 330, "sp", { lab: "spider", size: 40 })) : "")
    + (t >= tCt ? TF(940, 660, spring(t, tCt, .45), `<g transform="translate(0 -20)">${magnifier(56)}</g>`) + TF(940, 440, spring(t, tCt + .1, .45), tpill(0, 0, "Count the legs!", 44, P.sun, P.ink, { w: 700 })) : "")
    + buddy("momo", 1730, 1060, 220, t, { aura: true, flip: true, in: s.t0 + .1, poses: [[s.t0, "pointing"], [tA, "thinking"]] }) + buddy("pip", 190, 1060, 220, t, { aura: true, in: s.t0 + .2, poses: [[s.t0, "sit"], [tO, "surprised"], [tO + 1.6, "thinking"]] })
    + (t >= tN ? TF(960, 1000, lerp(1.6, 1, eo((t - tN) / .16)) + .04 * wob(t, tN + .16, .4), `<g filter="url(#drop)"><rect x="-560" y="-72" width="1120" height="144" rx="50" fill="${P.ink}"/></g>${T(-400, 20, "NEXT", 50, P.sun, { ls: 8 })}${T(110, 20, "Count the legs! Lock in your answer", 46, "#fff")}`) : "") + HUD(t); };
SC.nyk = (t, s) => nykScene(t, s, `<ellipse cx="700" cy="1030" rx="170" ry="22" fill="#8A7054"/>` + TF(710, 1026, .8, mudskipper({ blink: ((t + .4) % 2.9) < .12 })) + TF(1005, 1040, .4, trailCard(t, ALL3)));
})(); }
