// s2.js: P4 EP3, the middle: CLUE 1 tested (match the colour: all green; GLITCH's maths), CLUE 2 tested (measure the size; the pandan flop
// and its slow-motion replay), the LOOK CLOSER (the mystery leaf lit from behind: blade, edge, stalk, main vein, smaller veins), BE THE THING
// (a drop of water in a leaf: stalk, main vein, smaller veins, the net) and NET VEINS.
const PNL2 = { x: 330, y: 170, w: 1200, h: 760 };
const panelV2 = (k) => OP(k, `<g filter="url(#drop)"><rect x="${PNL2.x}" y="${PNL2.y}" width="${PNL2.w}" height="${PNL2.h}" rx="40" fill="#FFF8EA"/></g>`);
const lcBanner = (k) => OP(k, TF(960, 110, 1, tpill(0, 0, "LOOK CLOSER", 46, P.ink, P.sun, { w: 700 })));
const blurDeck = (inner = "") => `<g filter="url(#b10)">${x2place("vd3", "", [1.1, 960, 600])}${CAM(x2desk(0) + deskLeaf(0) + inner, 1.1, 960, 600)}</g><rect width="1920" height="1080" fill="${P.night}" opacity=".25"/>`;
// a swatch chip: a colour square joined by a plain line to the part it was matched on (screen coords)
const swatchChip = (t, t0, x, y, px, py, name, col = "#4FA23A") => t < t0 ? "" : OP(1, `<path d="M${n2(px)} ${n2(py)} L${n2(x)} ${n2(y)}" stroke="#fff" stroke-width="5"/><circle cx="${n2(px)}" cy="${n2(py)}" r="7" fill="#fff"/>` + TF(x, y, spring(t, t0, .4), `<g filter="url(#dropS)"><rect x="-70" y="-62" width="140" height="124" rx="16" fill="#fff" stroke="${P.ink}" stroke-width="5"/></g><rect x="-56" y="-50" width="112" height="70" rx="8" fill="${col}"/>` + T(0, 50, name, 22, P.ink)));

/* ================================================================ COLOUR · CLUE 1, TESTED: MATCH THE COLOUR (Momo), and GLITCH's maths ================================================================ */
// the camera pans along the three suspects (the pandan and the mango tree at the left, the hibiscus at the right) while Momo holds the leaf
// up to each and a swatch pops beside it: the same green three times; then the three swatches side by side (show, then tell)
SC.colour = (t, s) => { const t0 = MK("swatch"), pan = clamp((t - t0) / 2.2), back = eio(clamp((t - LT("o402") + .2) / .8));
  const cL = camOn([300, 600], 1.25, 700, 520), cR = camOn([1780, 700], 1.25, 1400, 560), c = t < t0 + 2.2 ? camMix(cL, cR, eio(pan)) : camMix(cR, [1, 960, 540], back);
  const sw = [[t0 + .2, [250, 520], [470, 320], "pandan"], [t0 + .7, [200, 330], [470, 180], "mango tree"], [t0 + 1.6, [1800, 700], [1560, 430], "hibiscus"]];
  const chips = t < LT("o402") - .2 ? sw.map(([a, p, q, nm]) => { const [px, py] = camPt(c, p), x = clamp(px + (q[0] - p[0]) * .5, 130, 1790), y = clamp(py - 230, 120, 900); return swatchChip(t, a, x, y, px, py, nm); }).join("") : "";
  const row = t >= LT("o402") - .2 && t < MK("flop2") + .9 ? OP(1 - ramp(t, MK("flop2") + .6, .3), [0, 1, 2].map((i) => TF(700 + i * 260, 300, spring(t, W("o402", "green", i) - .05, .4), `<g filter="url(#dropS)"><rect x="-110" y="-100" width="220" height="200" rx="20" fill="#fff" stroke="${P.ink}" stroke-width="6"/></g><rect x="-90" y="-82" width="180" height="120" rx="10" fill="#4FA23A"/>` + T(0, 78, ["pandan", "mango tree", "hibiscus"][i], 30, P.ink))).join("")) : "";
  const strips = t >= MK("three3") - .3 && t < LE("o403") + .6;
  const gScr = t >= LT("o403") ? scrBox(.7, .24) + scrTxt(.8, "OWNER: PANDAN +", .055) + scrTxt(.88, "MANGO + HIBISCUS", .055) : scrLRS();
  const glitch = x2glitchAt(t, c, 1840, { left: true, tape: true, face: t >= LT("o403") && t < LE("o404") ? "happy" : "smug", scr: gScr, strip: strips ? clamp((t - MK("three3") + .3) / .4) : 0 });
  const mx = 760, momoLeaf = t < LE("o402") + .2;
  return x2place("vd3", tapedLeaves(t) + TF(...SNAIL.colour, snail3(t)), c) + x2pigeonTree(t, c, -9) + x2limFar(t, c) + CAM(x2desk(t), c[0], c[1], c[2])
    + x2bc(c, "basil", 1180, 1060, 360, t, { in: s.t0 - .5, flip: true, poses: [[0, "sit"], [LE("o402") + .1, "worried/oops"], [LT("o403") + .2, "sit"], [LE("o406") + .05, "deadpan"]], look: -4 })
    + x2bc(c, "pip", 1470, 1062, 350, t, { in: s.t0 - .5, flip: true, poses: [[0, "sit"], [LT("o404") - .1, "sit"], [LE("o404") + .1, "pointing"], [LT("o405") + .3, "sit"], [LE("o406") + .05, "laughing/oops"]], look: -6 })
    + glitch
    + x2bc(c, "momo", mx, 1060, 380, t, { in: s.t0 - .5, poses: [[0, "pointing"], [LT("o402") - .1, "sit"], [LE("o402") + .05, "surprised"], [MK("flop2") + .1, "oops"]], look: 6 })
    + (momoLeaf ? x2held(c, "momo", mx, 1060, 380, false, heldLeaf(.42, -60), -40, 30) : "")
    + chips + row
    + (strips ? [0, 1, 2].map((i) => comicWord(t, MK("three3") + i * .25, 1080 + i * 170, 250 + (i % 2) * 60, "SKRITCH!", { size: 58, d: .6, rot: i % 2 ? 8 : -6 })).join("") : "")
    + (t >= LT("o405") - .1 ? DHUD(TF(1650, 330, spring(t, LT("o405") - .1, .45) * (1 - ramp(t, s.t1 - .3, .3)), x2fixCard(t, 1, { k: .62, stamp: ["NOT|ENOUGH", false, MK("notenough") + .3] }))) : "")
    + inset3(t, MK("notenough") + .4, LE("o405") + .5, 420, 330, "some leaves are red or purple", picRedLeaves(), "#C9643E", 380, 280)
    + x2gSay("o403", 1500, 300, t) + x2HUD(t); };

/* ================================================================ SIZE · CLUE 2, TESTED: MEASURE THE SIZE (Pip), with the slow-motion replay ================================================================ */
// by the pandan pot and the mango tree (the left of the set); Pip leads with his ruler; Momo beside him; Basil a step back; GLITCH at the
// side. The comparison is side by side (never overlapped): the mystery leaf beside a big old mango leaf, then a small young one (plain words
// "bigger", "smaller", no invented numbers). Then Pip steps back into the pandan: a long leaf flops over the top of his helmet and down his
// back (still on the plant; his face stays clear): FLOP!; the replay at a quarter speed with the ruler
const SZC = () => camOn([560, 760], 1.2, 900, 640);
const PIPX = (t) => { const f = MK("flop3"); return t < f ? 560 : lerp(560, 455, eo(clamp((t - f) / .45))); };
// the flopped pandan leaf: from the plant over the top of Pip's head (v2: no helmet) and down his back; u = 0..1 the flop (o.part: "back" | "top")
function flopLeaf(t, c, u, part) { const px = PIPX(9e9), hx = px - 6, hy = 1060 - 336,   /* v2: no helmet, so the leaf lies on his bare crown, between his ears */ A = [PANDAN_AT[0] + 10, PANDAN_AT[1] - 330];
  const top = [lerp(A[0] + 80, hx + 4, u), lerp(A[1] - 160, hy + 24, u)], end = [lerp(A[0] + 170, hx + 96, u), lerp(A[1] - 220, hy + 260 * u, u)];
  const d = `M${A[0]} ${A[1]} Q${n2(top[0] - 60)} ${n2(top[1] - 60)} ${n2(top[0])} ${n2(top[1])} Q${n2(top[0] + 70)} ${n2(top[1] + 10)} ${n2(end[0])} ${n2(end[1])}`;
  const strap = (w, col) => `<path d="${d}" stroke="${col}" stroke-width="${w}" fill="none" stroke-linecap="round"/>`;
  const all = strap(48, INK3) + strap(38, "#3E9B3A") + strap(4, "#2A7428");
  if (part === "back") return CAM(all, c[0], c[1], c[2]);
  return CAM(`<clipPath id="flopTop"><rect x="${hx - 140}" y="${hy - 200}" width="300" height="${n2(236)}"/></clipPath><g clip-path="url(#flopTop)">${all}</g>`, c[0], c[1], c[2]); }
// one comparison pair (side by side, never overlapped): leaf a (left) and leaf b (right) on a card, each labelled with a plain line
const pairCard = (t, t0, t1, x, y, a, la, b, lb) => t < t0 - .05 || t > t1 + .35 ? "" : DHUD(TF(x, y, spring(t, t0, .4) * (1 - ramp(t, t1, .3)), `<g filter="url(#drop)"><rect x="-330" y="-190" width="660" height="380" rx="26" fill="#FFF8EA" stroke="${P.ink}" stroke-width="6"/></g>` + a + b + tpill(-170, 140, la, 34, "#fff", P.ink, { w: 700 }) + tpill(170, 140, lb, 34, "#fff", P.ink, { w: 700 })));
SC.size = (t, s) => { const c = SZC(), tM = MK("measure"), tF = MK("flop3"), tR = MK("slow0"), rp = LT("s506");
  const replay = t >= rp + .3 && t < LT("s507") - .1, tw_ = replay ? tF - .35 + (t - rp - .3) / 4 : t;   // the replay: the flop again at a quarter speed
  const fu = clamp((tw_ - tF - .1) / .5), flopped = tw_ >= tF + .1, px = PIPX(tw_);
  const lifted = t >= LT("s507") + 1.5;   // (the leaf comes off his helmet in the look-closer: he lifts it there)
  const pipPose = [[0, "pointing"], [LE("s501") + .1, "sit"], [LT("s503") - .1, "sit"], [LE("s503") + .05, "panic/thinking"], [tM, "sit"], [LE("s504") + .05, "thinking"], [tF + .1, "surprised"], [tF + .6, "embarrassed/oops"]];
  const gScr = t >= LT("s502") && t < LE("s503") + .5 ? scrLRS() + scrThumb() : scrLRS();
  const world = x2place("vd3", tapedLeaves(t) + TF(...SNAIL.size, snail3(t)), c) + x2pigeonTree(t, c, -9) + CAM(x2desk(t), c[0], c[1], c[2]);
  const pip = x2bc(c, "pip", px, 1060, 370, tw_, { in: s.t0 - .5, poses: pipPose, look: 6, still: replay });
  const ruler = t < tF ? x2held(c, "pip", px, 1060, 370, false, TF(0, 0, .5, rulerV3(260), -30), -20, 30) : "";
  const film = replay || (t >= rp && t < LT("s507")) ? OP(ramp(t, rp, .2) * (1 - ramp(t, LT("s507") - .3, .3)), `<rect x="0" y="0" width="1920" height="70" fill="#120E2E"/><rect x="0" y="1010" width="1920" height="70" fill="#120E2E"/>` + [...Array(24)].map((_, i) => `<rect x="${i * 82 + 20}" y="18" width="44" height="34" rx="6" fill="#FFF8EA" opacity=".6"/><rect x="${i * 82 + 20}" y="1028" width="44" height="34" rx="6" fill="#FFF8EA" opacity=".6"/>`).join("") + `<rect width="1920" height="1080" fill="#D9C7A0" opacity=".14"/>` + TF(960, 130, 1, tpill(0, 0, "INSTANT REPLAY · SLOW MOTION ×¼", 40, P.sun, P.ink, { w: 700 }))) : "";
  const rulerPop = replay && t >= tR + .3 ? TF(1300, 420, spring(t, tR + .3, .4), `<g filter="url(#drop)"><rect x="-380" y="-230" width="760" height="420" rx="26" fill="#FFF8EA" stroke="${P.ink}" stroke-width="6"/></g>`
    + TF(-330, -120, .9, pandanLeaf(640, { w: 22 })) + T(0, -150, "pandan leaf", 30, P.ink) + TF(-330, 0, .9, mangoLeaf({ id: "rpm" })) + T(110, 10, "old mango leaf", 28, P.ink) + TF(-330, 110, .9, mangoLeaf({ young: true, id: "rpy" })) + T(10, 120, "young mango leaf", 28, P.ink)) : "";
  return world + (flopped && !lifted ? flopLeaf(tw_, c, eo(fu), "back") : "") + pip + (flopped && !lifted ? flopLeaf(tw_, c, eo(fu), "top") : "") + ruler
    + x2bc(c, "momo", 820, 1062, 370, t, { in: s.t0 - .5, flip: true, poses: [[0, "sit"], [LE("s503") + .05, "laugh/cheer"], [tM - .1, "sit"], [tF + .3, "surprised"], [LT("s505") + 1.0, "laugh/cheer"], [LE("s505") + .5, "sit"]], look: -6, still: replay })
    + x2bc(c, "basil", 1050, 1050, 350, t, { in: s.t0 - .5, flip: true, poses: [[0, "arms_crossed"], [tF + .3, "surprised"], [LE("s505") + .3, "arms_crossed"]], look: -4, still: replay })
    + x2glitchAt(t, c, 1395, { left: true, tape: true, face: t >= LT("s502") && t < LE("s503") + .5 ? "happy" : "smug", scr: gScr })
    + pairCard(t, tM, tM + 1.1, 1240, 330, TF(-280, -10, .62, `<g transform="rotate(-8)">${mangoLeaf({ id: "pc1" })}</g>`), "bigger", TF(60, -10, .62, hibLeaf({ id: "pc2" })), "smaller")
    + pairCard(t, tM + 1.15, LE("s504") + .4, 1240, 330, TF(-280, 0, .8, `<g transform="rotate(-8)">${mangoLeaf({ young: true, id: "pc3" })}</g>`), "smaller", TF(60, -10, .62, hibLeaf({ id: "pc4" })), "bigger")
    + (t >= tF + .1 && t < tF + 1.2 ? comicWord(t, tF + .15, ...camPt(c, [560, 560]), "FLOP!", { size: 110, d: 1.0 }) : "")
    + DHUD(film + rulerPop)
    + (t >= LT("s507") - .1 ? DHUD(TF(1660, 360, spring(t, LT("s507") - .1, .45) * (1 - ramp(t, s.t1 - .3, .3)), x2fixCard(t, 2, { k: .62, stamp: ["WEAK|CLUE", false, MK("weak") + .1] }))) : "")
    + x2gSay("s502", 1300, 330, t) + x2HUD(t); };

/* ================================================================ LCLEAF · [LOOK CLOSER] read the leaf like a scientist (Basil leads) ================================================================ */
// one cream panel over the softly blurred void deck; the mystery leaf HUGE, lit from behind so its veins glow; each part its own push-in
// (blade, edge, stalk, main vein, smaller veins), each with a plain line to its label; Basil big at the right (he picked right), Pip at the
// left (he lifts the pandan leaf off his helmet), Momo's face peeking in at the lower-left corner (shy, then curious)
const LCL = { x: 900, y: 600, k: 1.7, rot: -12 };
const lcPt = (lx, ly) => { const a = LCL.rot * Math.PI / 180, x = (lx - 130) * LCL.k, y = ly * LCL.k; return [LCL.x + x * Math.cos(a) - y * Math.sin(a), LCL.y + x * Math.sin(a) + y * Math.cos(a)]; };
SC.lcleaf = (t, s) => { const k = ramp(t, s.t0, .45), tB = MK("kw_leaf_blade"), tE = MK("edge"), tS = MK("kw_leaf_stalk"), tMv = MK("mainv"), tSv = MK("smallv"), tQ = MK("magv");
  const foc = (p, a, b, z) => { const u = ss(a, a + .7, t) * (1 - ss(b - .6, b, t)); return u > 0 ? [p, z, u] : null; };
  const F = foc(lcPt(150, -30), tB - .3, tE - .2, 1.25) || foc(lcPt(220, -90), tE - .2, LE("l602") + .3, 1.35) || foc(lcPt(-40, 10), tS - .3, LE("l603") + .3, 1.45) || foc(lcPt(140, 0), tMv - .3, tSv, 1.2) || foc(lcPt(200, 40), tSv, LE("l604") + .4, 1.4);
  const c = F ? camMix([1, 960, 540], camOn(F[0], F[1], 930, 560), F[2]) : [1, 960, 540];
  const hi = { blade: t >= tB - .1 && t < tE ? .5 + .3 * Math.sin((t - tB) * 5) : 0, edge: t >= tE - .1 && t < LE("l602") + .6 ? clamp((t - tE + .1) / 1.8) : 0, stalk: t >= tS - .1 && t < LE("l603") + .3 ? 1 : 0,
    main: t >= tMv - .1 && t < LE("l604") + .4 ? clamp((t - tMv + .1) / 1.2) : 0, small: t >= tSv - .1 && t < s.t1 ? clamp((t - tSv + .1) / 1.2) : 0 };
  const leaf = TF(LCL.x, LCL.y, LCL.k, `<g transform="rotate(${LCL.rot}) translate(-130 0)"><circle cx="150" cy="0" r="260" fill="#FFF6B0" opacity=".35" filter="url(#b10)"/>${hibLeaf({ id: "lcl", glow: 1, hi })}</g>`);
  const L = (txt, x, y, p, a, b, col) => t >= a - .05 && t < b + .35 ? OP(spring(t, a, .4) * (1 - ramp(t, b, .3)), plabel(x, y, txt, ...camPt(c, p), 36, col)) : "";
  const labs = L("leaf blade", 1250, 300, lcPt(160, -60), tB, s.t1 - .4, "#9FE7B0") + L("edge", 1300, 820, lcPt(250, 60), tE, s.t1 - .4, "#FFE08A") + L("leaf stalk", 470, 560, lcPt(-50, 12), tS, s.t1 - .4, "#fff")
    + L("main vein", 700, 280, lcPt(60, -2), tMv, s.t1 - .4, "#FFE08A") + L("smaller veins", 760, 880, lcPt(120, 50), tSv, s.t1 - .4, "#9FE7B0");
  const mag = t >= tQ - .1 && t < s.t1 ? OP(spring(t, tQ - .1, .4), (() => { const [px, py] = camPt(c, lcPt(205, -30)), x = 1310, y = 520, r = 110; return `<path d="M${n2(px)} ${n2(py)} L${x - r + 8} ${y}" stroke="${P.ink}" stroke-width="6"/><g filter="url(#dropS)"><circle cx="${x}" cy="${y}" r="${r}" fill="#EAF7D6" stroke="${P.ink}" stroke-width="10"/></g><clipPath id="lcm"><circle cx="${x}" cy="${y}" r="${r - 8}"/></clipPath><g clip-path="url(#lcm)">${TF(x - 260, y + 60, 3.2, `<g transform="translate(-200 0)">${hibLeaf({ id: "lcm2", glow: 1, hi: { small: 1 }, noMark: true })}</g>`)}</g>`; })()) : "";
  return blurDeck(TF(1290, 980, .3, snail3(t))) + OP(k, panelV2(1) + `<clipPath id="pnL3"><rect x="${PNL2.x}" y="${PNL2.y}" width="${PNL2.w}" height="${PNL2.h}" rx="40"/></clipPath><g clip-path="url(#pnL3)">${CAM(leaf, c[0], c[1], c[2])}</g>` + labs + mag)
    + lcBanner(k)
    + inset3(t, MK("attach") - .2, LE("l603") + .4, 600, 360, "the leaf stalk joins the stem", picTwig(), P.leaf, 360, 260)
    + x2bd("pip", 170, 1076, 360, t, { in: s.t0 - .5, poses: [[s.t0, "oops"], [s.t0 + 1.4, "sit"], [LT("l603") - .1, "sit"], [LE("l603") + .05, "pointing"], [tS + .05, "cheer"], [tS + 2.0, "sit"]], look: 8 })
    + (t < s.t0 + 1.4 ? x2held([1, 960, 540], "pip", 170, 1076, 360, false, `<g transform="rotate(-30)">${pandanLeaf(300, { w: 20 })}</g>`, -60, 0) : "")
    + x2bd("basil", 1700, 1076, 470, t, { in: s.t0 - .5, flip: true, poses: [[s.t0, "arms_crossed"], [LT("l602") - .1, "sit"], [LE("l602") + .05, "pointing"], [tB + .05, "cheer"], [tB + 2.0, "pointing"], [LT("l603"), "arms_crossed"], [LT("l605") + .3, "sit"], [LE("l605") + .05, "pointing"]], look: -6 })
    + x2bd("momo", 420, 1185, 400, t, { in: s.t0 - .5, peek: true, poses: [[s.t0, "oops"], [LT("l604"), "thinking"], [LT("l605") - .1, "sit"], [LE("l605") + .1, "surprised"]], look: 8, tag: false, mag: t >= LT("l605") })
    + x2HUD(t); };
const picTwig = () => `<rect x="-170" y="-130" width="340" height="210" fill="#EAF6FF"/><path d="M-170 40 Q0 20 170 -10" stroke="#6E4A2A" stroke-width="16" fill="none" stroke-linecap="round"/>` + TF(-20, 26, .38, `<g transform="rotate(-40)">${hibLeaf({ id: "tw1", noMark: true, hi: { stalk: 1 } })}</g>`);

/* ================================================================ DIVE + JOURNEY + PULLOUT · BE THE THING: a drop of water in a leaf (quiet) ================================================================ */
// dive: the camera pushes into a living hibiscus leaf, still on its twig at the hedge; the buddies pop out in turn before the dive (no fading)
SC.dive = (t, s) => { const tS = MK("shrinkw"), z = 1 + 7 * ei(clamp((t - tS) / Math.max(.6, s.t1 - tS))), c = camMix([1, 960, 540], camOn([1500, 520], z, 960, 540), eio(clamp((t - s.t0) / 1.2)) * .3 + .7 * eio(clamp((t - tS) / .8)));
  const twig = `<path d="M1300 640 Q1420 600 1500 560" stroke="#6E4A2A" stroke-width="14" fill="none" stroke-linecap="round"/>` + TF(1500, 556, .7, `<g transform="rotate(-20)">${hibLeaf({ id: "dvl", noMark: true })}</g>`);
  return CAM(bg("vd3") + CAM(x2desk(t), 1, 960, 540) + twig, c[0], c[1], c[2])
    + x2bd("momo", 430, 1076, 380, t, { in: s.t0 - .5, poses: [[0, "sit"]], out: MK("be") + 2.0, look: 6 }) + x2bd("pip", 760, 1076, 370, t, { in: s.t0 - .5, poses: [[0, "sit"]], out: MK("be") + 2.2, look: 6 })
    + x2bd("basil", 1060, 1076, 380, t, { in: s.t0 - .5, poses: [[0, "sit"]], out: MK("be") + 2.4, look: 6 })
    + `<rect width="1920" height="1080" fill="#fff" opacity="${n2(.6 * ss(s.t1 - .5, s.t1, t))}"/>` + logo(t); };
// the drop (YOU), seen side-on as it travels RIGHT: round front, its tail trailing behind (it faces its travel), eyes looking ahead
/* FACES: right */ const dropSide = (t) => `<path d="M-90 0 Q-30 -48 20 -52 Q66 -52 70 0 Q66 52 20 52 Q-30 48 -90 0z" fill="#9FD8F5" stroke="#2C7FB8" stroke-width="6" opacity=".93"/><path d="M-10 -34 q30 -8 50 6" stroke="#fff" stroke-width="7" fill="none" opacity=".7" stroke-linecap="round"/><circle cx="22" cy="-6" r="7" fill="${INKG}"/><circle cx="48" cy="-6" r="7" fill="${INKG}"/><path d="M26 18 q10 8 20 0" stroke="${INKG}" stroke-width="4" fill="none" stroke-linecap="round"/>`;
// the leaf world by phase: 0 the leaf stalk (a narrow green tunnel), 1 the main vein (a wide bright path, the blade like a green sky on both
// sides), 2 the side paths (narrower and narrower), 3 above the blade: the whole web of veins glowing, joined up like a net (no P5 names)
SC.journey = (t, s) => { const a = LT("j702"), m = MK("jmain"), br = MK("jbranch"), nt = MK("jnet");
  const ph = t < m - .3 ? 0 : t < br - .3 ? 1 : t < nt - .4 ? 2 : 3, scr = (t - s.t0) * 180;
  let w = "", dx = 760, dy = 560;
  if (ph === 0) { w += `<rect width="1920" height="1080" fill="#2E6B2E"/><rect x="-10" y="380" width="1940" height="360" rx="0" fill="#7CC05A"/>` + [...Array(14)].map((_, i) => `<path d="M${n2(((i * 170 - scr) % 2380 + 2380) % 2380 - 200)} 380 q40 180 0 360" stroke="#5DA544" stroke-width="10" fill="none" opacity=".7"/>`).join("") + `<rect x="-10" y="350" width="1940" height="40" fill="#1F4F1F"/><rect x="-10" y="730" width="1940" height="40" fill="#1F4F1F"/>`; }
  else if (ph === 1) { w += `<rect width="1920" height="1080" fill="#9BDA6B"/><rect width="1920" height="1080" fill="#FFF6B0" opacity=".25"/>` + [...Array(9)].map((_, i) => `<path d="M${n2(((i * 300 - scr * 1.4) % 2700 + 2700) % 2700 - 300)} 560 L${n2(((i * 300 - scr * 1.4) % 2700 + 2700) % 2700 + 200)} ${i % 2 ? 60 : 1060}" stroke="#7CC05A" stroke-width="40" opacity=".8"/>`).join("") + `<rect x="-10" y="470" width="1940" height="180" fill="#D8F59A" stroke="#5DA544" stroke-width="10"/>`; }
  else if (ph === 2) { const u = clamp((t - br + .3) / 4); w += `<rect width="1920" height="1080" fill="#8FD060"/>` + [0, 1, 2].map((k) => { const y0 = 560 - k * 150, wd = 120 - 34 * k; return `<path d="M${-100 + k * 600} ${y0 + 150} Q${400 + k * 600} ${y0} ${1100 + k * 500} ${y0 - 200}" stroke="#D8F59A" stroke-width="${wd}" fill="none" stroke-linecap="round"/>`; }).join("") + [...Array(10)].map((_, i) => `<path d="M${200 + i * 180} 1080 L${260 + i * 180} 700" stroke="#C6EB86" stroke-width="16" opacity=".7"/>`).join("");
    dx = lerp(420, 1300, u); dy = lerp(660, 360, u); }
  else { const u = clamp((t - nt + .4) / 1.6); w += `<rect width="1920" height="1080" fill="#3F8F2E"/>` + TF(960, 560, lerp(5, 3.2, eio(u)), `<g transform="translate(-150 0)">${hibLeaf({ id: "jnt", glow: 1, hi: { small: clamp(u * 1.4) }, noMark: true })}</g>`); dx = 1320; dy = 420; }
  const bob = 8 * Math.sin(t * 3), you = TF(dx, dy + bob, ph === 3 ? .7 : 1.1, `<!--FACES:right drop-->${dropSide(t)}`);
  // the buddies ride along behind YOU in back views on a little raft of leaf, never covering a vein; Pip's one glance-and-wave (not on a key line)
  const rOn = t >= s.t0 + .6 && t < s.t1 - .2, wv = t >= MK("jwave") && t < MK("jwave") + 1.0, raft = ph === 3 ? null : [430, 830];   /* one place for the whole ride (QA: no jump between phases); YOU travels ahead of them */
  const rid = (who, x, y, h, o = {}) => buddy(who, x, y, h, t, { in: s.t0 + .6, out: s.t1 - .2, pose: "back", poses: [[0, "back"]], tag: false, shadow: false, noreact: true, ...o });
  const riders = rOn && raft ? TF(raft[0], raft[1] + 10, .5, `<g transform="rotate(-6)"><path d="M-260 0 Q0 -40 260 0 Q0 40 -260 0Z" fill="#6FB548" stroke="${INK3}" stroke-width="6"/></g>`) + rid("momo", raft[0] - 90, raft[1], 150) + rid("basil", raft[0] + 80, raft[1], 150) + (wv ? rid("pip", raft[0], raft[1] - 4, 150, { pose: undefined, poses: [[0, "waving"]] }) : rid("pip", raft[0], raft[1] - 4, 150)) : "";
  const tags = (ph === 0 ? tpill(960, 230, "the leaf stalk: a narrow green tunnel", 40, "#fff", P.ink, { w: 700 }) : "") + (ph === 1 ? tpill(960, 230, "the main vein", 44, "#fff", P.ink, { w: 700 }) : "")
    + (ph === 2 ? tpill(960, 200, "smaller veins", 44, "#fff", P.ink, { w: 700 }) : "") + (ph === 3 ? tpill(960, 160, "split and join, like a net", 44, P.sun, P.ink, { w: 700 }) : "");
  return OP(ramp(t, s.t0, .8), w + riders + you + tags + youTag(t, s.t0 + .5, "You: a drop of water") + (ph < 3 ? TF(dx, dy - 100, spring(t, s.t0 + .7, .45) * .8, youPill(0, -20, 1)) : ""))
    + `<rect width="1920" height="1080" fill="#fff" opacity="${n2(1 - ramp(t, s.t0, .6))}"/>`; };
// the pull-out: from the glowing net back to the void deck, ending on NET VEINS' layout (the mystery leaf big at the right)
const NVL = { x: 1200, y: 520, k: 1.25 };
const nvLeaf = (t, hi = 1) => TF(NVL.x, NVL.y, NVL.k, `<g transform="rotate(-10) translate(-140 0)"><circle cx="150" cy="0" r="250" fill="#FFF6B0" opacity=".3" filter="url(#b10)"/>${hibLeaf({ id: "nvl", glow: 1, hi: { small: hi } })}</g>`);
SC.pullout = (t, s) => { const u = eio((t - s.t0) / (s.t1 - s.t0));
  return blurDeck() + `<g transform="translate(${n2(lerp(-300, 0, u))} ${n2(lerp(60, 0, u))}) scale(${n2(lerp(2.6, 1, u))}) translate(${n2(-(1 - u) * 300)} 0)">${nvLeaf(t)}</g>` + `<rect width="1920" height="1080" fill="#fff" opacity="${n2(.7 * (1 - ramp(t, s.t0, .5)))}"/>` + logo(t); };
SC.netveins = (t, s) => {
  return blurDeck() + nvLeaf(t) + (t >= MK("kw_net_veins") - .2 ? plabel(1420, 900, "net veins", 1290, 560, 40, "#9FE7B0") : "")
    + x2bd("basil", 440, 1076, 500, t, { in: s.t0 - .5, poses: [[s.t0, "pointing"], [LT("j706") - .1, "sit"], [MK("kw_net_veins") + .05, "cheer"], [MK("kw_net_veins") + 2.0, "pointing"]], look: 6 })
    + x2bd("momo", 820, 1076, 330, t, { in: s.t0 - .5, poses: [[0, "sit"]], look: 6 }) + x2bd("pip", 1740, 1076, 330, t, { in: s.t0 - .5, flip: true, poses: [[0, "sit"]], look: -6 }) + x2HUD(t); };
