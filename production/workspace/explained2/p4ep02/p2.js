// p2.js: P4 EP2, the middle: FIX 2 tested (the water), FIX 3 tested (the balanced lunch and the pigeons), LOOK CLOSER 1 (every part; the
// soggy soil's rude noise; the window on the pot's lower half), LOOK CLOSER 2 (the twist: roots need air; ABSORB), THE SYSTEM (finishing
// each other's sentence) and THE VILLAIN (GLITCH, won over by the evidence; KNOWLEDGE LOG · ENTRY 1).
const PNL2 = { x: 330, y: 170, w: 1200, h: 760 };
const panelV2 = (k) => OP(k, `<g filter="url(#drop)"><rect x="${PNL2.x}" y="${PNL2.y}" width="${PNL2.w}" height="${PNL2.h}" rx="40" fill="#FFF8EA"/></g>`);
const lcBanner = (k) => OP(k, TF(960, 110, 1, tpill(0, 0, "LOOK CLOSER", 46, P.ink, P.sun, { w: 700 })));
const blurDeck = (inner = "") => `<g filter="url(#b10)">${x2place("vdv2", x2desk(0, { noSign: true }) + inner, [1.1, 960, 600])}</g><rect width="1920" height="1080" fill="${P.night}" opacity=".25"/>`;
const SOILY = (k) => DK.y - 146 * k;   // the soil surface in Chilli's pot (local: the rim top at -150, the soil a little below)
// a magnifier circle joined by a line to a point (screen coords)
const magCircle = (t, t0, t1, x, y, px, py, txt, inner = "", r = 110) => t < t0 - .05 || t > t1 + .35 ? "" : OP(spring(t, t0, .4) * (1 - ramp(t, t1, .3)), `<path d="M${px} ${py} L${n2(x + (px - x) * (r / Math.hypot(px - x, py - y)))} ${n2(y + (py - y) * (r / Math.hypot(px - x, py - y)))}" stroke="${P.ink}" stroke-width="6"/>`
  + `<g filter="url(#dropS)"><circle cx="${x}" cy="${y}" r="${r}" fill="#FFF3DC" stroke="${P.ink}" stroke-width="10"/></g><clipPath id="mc${Math.round(x)}${Math.round(y)}"><circle cx="${x}" cy="${y}" r="${r - 8}"/></clipPath><g clip-path="url(#mc${Math.round(x)}${Math.round(y)})">${inner}</g>` + tpill(x, y + r + 34, txt, 32, "#fff", P.ink, { w: 700 }));

/* ================================================================ WATER · FIX 2, TESTED: WATER IT MORE (slapstick), and Momo's clue ================================================================ */
// the desk; Basil behind it at the left of Chilli pouring with total confidence; Pip at the right edge of the desk, a folded towel over one
// arm; Momo at the desk's front left, peering at the pot's base. The water sits on top (level, rising) and spills over the TOP of the rim;
// the desk under the pot stays dry (Momo's clue). Camera: a push onto the pot's rim; Basil's face close-up as the water reaches his feet.
function x2puddle(t, c, lvl, spill) { const k = CHK, y = SOILY(k) + 4 - 10 * lvl, rx = 92 * k * (1 + .06 * lvl);
  let s = `<ellipse cx="${CHX}" cy="${n2(y)}" rx="${n2(rx)}" ry="${n2(11 * k)}" fill="#5CB8F0" opacity="${n2(.4 + .5 * clamp(lvl * 3))}"/><path d="M${CHX - 40} ${n2(y - 2)} h40" stroke="#E8F6FF" stroke-width="3" opacity=".8"/>`;
  if (spill > 0) { const u = clamp(spill); s += `<path d="M${CHX - rx} ${n2(y)} q-14 30 -10 ${n2(80 * u)} q0 20 -40 ${n2(14 + 10 * u)} L${n2(CHX - rx - 40 - 220 * u)} ${n2(DK.y + 2)}" stroke="#5CB8F0" stroke-width="${n2(10 + 6 * u)}" fill="none" stroke-linecap="round" opacity=".9"/>`
    + `<ellipse cx="${n2(CHX - rx - 120 * u)}" cy="${DK.y + 3}" rx="${n2(110 * u)}" ry="6" fill="#5CB8F0" opacity=".75"/>`
    + (u > .6 ? [0, 1, 2].map((i) => `<circle cx="${n2(CHX - rx - 230 + i * 10)}" cy="${n2(DK.y + 20 + ((t * 300 + i * 40) % 160))}" r="6" fill="#5CB8F0"/>`).join("") : ""); }
  return CAM(s, c[0], c[1], c[2]); }
SC.water = (t, s) => { const tP = MK("pour"), tS = MK("spill"), lvl = clamp((t - tP) / 4.0) * (t < tS ? .85 : 1), spill = t >= tS ? (t - tS) / 1.4 : 0, tM = LT("w305");
  const push = eio(clamp((t - tP + .2) / 1.2)) * (1 - eio(clamp((t - LT("w305") + .3) / 1.0)));
  const c = camMix([1, 960, 540], camOn([CHX - 80, 700], 1.32, 960, 560), push);
  const pouring = t >= tP - .2 && t < tS + 1.0, tilt = pouring ? 38 + 6 * Math.sin(t * 5) : 4;
  const canX = 835, canY = 630, can = CAM(TF(canX, canY, .72, `<!--FACES:right can-->` + canV3(t, { tilt })), c[0], c[1], c[2]);
  const sp = (() => { const a = tilt * Math.PI / 180, x = 156 * Math.cos(a) + 106 * Math.sin(a), y = 156 * Math.sin(a) - 106 * Math.cos(a); return [canX + .72 * x, canY + .72 * y]; })();
  const stream = pouring && t < tS + .8 ? CAM(streamV3(t, n2(sp[0]), n2(sp[1]), CHX - 20, SOILY(CHK), 1, 14), c[0], c[1], c[2]) : "";
  const basilPoses = [[0, "sit"], [LT("w301") + .3, "pointing"], [tS - .05, "surprised"], [tS + 1.9, "sit"], [LT("w306") + .1, "oops"]];
  window._BUBAT = { basil: [520, 330], pip: [1520, 380], momo: [440, 520] };
  const towel = t < MK("flop2") + .3 ? x2held(c, "pip", 1340, 960, 370, true, TF(0, 0, .9, towelV3()), 10, 0) : x2held(c, "basil", 690, 960, 380, false, TF(0, 0, .8, towelV3()), 0, 0);
  return x2place("vdv2", "", c) + x2bc(c, "basil", 690, 960, 380, t, { in: s.t0 - .5, poses: basilPoses, look: 6, jump: [[tS, 22]] })
    + x2bc(c, "pip", 1340, 960, 370, t, { in: s.t0 - .5, flip: true, poses: [[0, "sit"], [LT("w301") + .4, "panic/oops"], [LE("w301") + .3, "sit"], [LT("w302") - .1, "sit"], [LE("w302") + .05, "pointing"], [LT("w303") + .3, "sit"], [MK("flop2") + .1, "sit"], [LT("w307") + .3, "sit"]], look: -6 })
    + CAM(x2desk(t), c[0], c[1], c[2]) + CAM(TF(CHX, DK.y, CHK, chilliV3(t, { body: "wilt", face: "droop", wob: t > tS && t < tS + 1 ? 2 * Math.sin((t - tS) * 18) : 0 })), c[0], c[1], c[2])
    + (t >= tP - .1 ? x2puddle(t, c, lvl, spill) : "") + stream + can + towel
    + x2bc(c, "momo", 400, 1050, 360, t, { in: s.t0 - .5, poses: [[0, "sit"], [LT("w303") + .4, "thinking"], [MK("spill") + .2, "sit"], [LT("w304") + .3, "surprised"], [tM - .1, "sit"], [LT("w305") + .5, "pointing"], [LE("w305") + .2, "sit"]], look: 8, mag: t >= LT("w305") + .5 && t < LE("w305") + .2 })
    + (t >= tP + .1 ? comicWord(t, tP + .15, ...camPt(c, [CHX - 220, 560]), "GLUG-GLUG-GLUG!", { size: 62, d: 1.2, rot: -6 }) : "")
    + x2lab(t, LT("w302") + .6, LT("w303"), c, "not sinking in", 1250, 340, CHX + 20, SOILY(CHK) - 4, 40)
    + (t >= tS ? comicWord(t, tS + .05, ...camPt(c, [CHX + 120, 560]), "SPLOSH!", { size: 100, d: .9 }) : "")
    + faceCam("basil", t, tS + .1, tS + 1.8, 1220, 230, 120, [[0, "shocked/surprised"]])
    + x2gSay("w304", 1150, 440, t, { tail: -60 })
    + magCircle(t, LT("w305") + .7, LE("w305") + .6, 760, 300, ...camPt(c, [CHX, DK.y + 4]), "dry", `<rect x="640" y="180" width="240" height="240" fill="url(#deskTop)"/><path d="M640 300 H880" stroke="#A39B8C" stroke-width="4"/><path d="M700 220 h120 l-14 70 h-92z" fill="#E8743B" stroke="${INKG}" stroke-width="5"/>`, 110)
    + x2lab(t, MK("full") - .2, LE("w306"), c, "soil already full of water", 1250, 260, CHX + 10, SOILY(CHK) - 2, 38)
    + (t >= MK("full") ? TF(1660, 560, spring(t, MK("full"), .45) * (1 - ramp(t, s.t1 - .3, .3)), x2fixCard(t, 2, { k: .44, stamp: ["NOT THIRSTY", false, MK("full") + .5] })) : "")
    + x2HUD(t); };

/* ================================================================ LUNCH · FIX 3, TESTED: FEED IT (Pip's balanced lunch, and the pigeons) ================================================================ */
// Pip behind the desk at the left of the pot with his lunchbox and tweezers; Basil beside him at the right of the pot, leaning on the desk;
// Momo a little back at the left, eyes on HER curry puff (she runs in later). Five pigeons land round the pot; one on the TOP of Pip's helmet.
const PGN = [[CHX - 230, DK.y, 1], [CHX - 150, DK.y, -1], [CHX + 150, DK.y, 1], [CHX + 220, DK.y, -1], [CHX + 90, DK.y - 2, -1]];
function x2pigeons(t, c, tL, tO) { if (t < tL - .5 || t > tO + 1.4) return ""; let s = "";
  PGN.forEach(([x, y, d], i) => { const tl = tL + .08 * i, land = clamp((t - tl + .45) / .45), off = clamp((t - tO - .05 * i) / 1.0);
    const px = x + (1 - land) * -d * 260 + off * d * 420, py = y - (1 - land) * 300 - off * 420, fly = land < 1 || off > 0 ? 1 : 0, pk = !fly && t > tl + .3 ? Math.max(0, Math.sin((t - tl) * 9 + i)) : 0;
    const dir = off > 0 ? d : (land < 1 ? d : (i % 2 ? -1 : 1));
    s += TF(px, py, .9 * (dir < 0 ? -1 : 1), `<!--FACES:right pigeon-->` + pigeonV2(t, { fly, ph: i, peck: pk }), 0, .9); });
  return CAM(s, c[0], c[1], c[2]); }
SC.lunch = (t, s) => { const tL = MK("koo") + .2, tO = MK("liftoff"), tK = MK("kooroo"), tRun = LT("u404") - .3, c = camMix([1, 960, 540], camOn([CHX, 700], 1.18, 960, 560), eio(clamp((t - s.t0 - .2) / 1.2)) * (1 - eio(clamp((t - tL + .4) / .7))));
  const nQ = t < MK("lay") - .9 ? 0 : t < MK("lay") - .3 ? 1 : t < MK("lay") + .2 ? 2 : t < MK("lay") + .7 ? 3 : 4, eaten = t >= tO + .2;
  const quarters = nQ && !eaten ? CAM([[-30, -6], [10, -6], [-30, 8], [10, 8]].slice(0, nQ).map(([dx, dy], i) => puffQ(CHX + dx * .9 + 10, SOILY(CHK) + 4 + dy * .5, .6 * (t > tL + .5 + i * .4 ? .6 : 1))).join(""), c[0], c[1], c[2]) : "";
  const momoX = t < tRun ? 180 : lerp(180, 430, eo(clamp((t - tRun) / .9))), running = t >= tRun && t < tRun + .9;
  // the helmet pigeon: lands on TOP of Pip's helmet; leans over the brim for its KOO-ROO! (beak a little past the brim, never over his eyes)
  const hp = t >= tL + .35 && t < tO + .1 ? (() => { const lean = pulse(t, tK + .1, .05, .9) * 22, land = clamp((t - tL - .35) / .4); const [X, Y] = camPt(c, [700, 590 - (1 - land) * 200]);
    return TF(X, Y, .85 * c[0], `<g transform="rotate(${n2(lean)})"><!--FACES:right pigeon-->${pigeonV2(t, { fly: land < 1 ? 1 : 0, ph: 7 })}</g>`); })() : t >= tO + .1 && t < tO + 1.3 ? CAM(TF(700 + 300 * (t - tO), 590 - 360 * (t - tO), .6, `<!--FACES:right pigeon-->` + pigeonV2(t, { fly: 1, ph: 7 })), c[0], c[1], c[2]) : "";
  const feather = t >= tO + .3 && t < s.t1 ? (() => { const u = clamp((t - tO - .3) / 1.1); return CAM(TF(lerp(860, 742, u), lerp(520, 772, u) + 10 * Math.sin(u * 9), 1, `<g transform="rotate(${n2(60 + 40 * Math.sin(u * 7))})">${featherV2(.8)}</g>`), c[0], c[1], c[2]); })() : "";
  window._BUBAT = { pip: [520, 360], basil: [1440, 380], momo: [600, 470] };
  return x2place("vdv2", "", c)
    + x2bc(c, "pip", 700, 960, 370, t, { in: s.t0 - .5, poses: [[0, "pointing"], [LE("u401") + .1, "sit"], [LT("u403") - .1, "sit"], [LE("u403") + .05, "proud/arms_crossed"], [MK("nothing") + .5, "sit"], [tL, "surprised"], [tO + .2, "embarrassed/oops"], [LT("u406") + .1, "oops"]], look: 6 })
    + x2bc(c, "basil", 1240, 960, 380, t, { in: s.t0 - .5, flip: true, poses: [[0, "sit"], [LT("u402") - .1, "sit"], [LE("u402") + .1, "deadpan"], [MK("nothing"), "sit"], [tL, "surprised"], [LT("u405") - .1, "sit"], [LE("u405") + .1, "deadpan"], [tK + .3, "laughing"], [tO + .4, "sit"]], look: -6 })
    + CAM(x2desk(t), c[0], c[1], c[2]) + CAM(TF(CHX, DK.y, CHK, chilliV3(t, { body: "wilt", face: "droop" })), c[0], c[1], c[2]) + quarters
    + CAM(TF(780, DK.y - 4, .55, lunchboxV3({ empty: eaten, feather: t >= tO + 1.4 })), c[0], c[1], c[2])
    + (t < MK("lay") + 1.2 ? x2held(c, "pip", 700, 960, 370, false, TF(0, 0, .9, tweezersV3()), 0, 10) : "")
    + x2pigeons(t, c, tL, tO) + hp + feather
    + x2bc(c, "momo", momoX, 1060, t < tRun ? 320 : 360, t, { in: s.t0 - .5, run: running ? "right" : undefined, run0: tRun, runEnd: tRun + .9, poses: [[0, "thinking"], [tRun + .9, "horrified/surprised"], [LE("u404") + .2, "sit"], [tO + .2, "facepalm/oops"], [LT("u406") + .2, "sit"]], look: 6, keepPose: running })
    + (t >= MK("nothing") && t < MK("koo") ? CAM(TF(lerp(1500, 300, (t - MK("nothing")) / 1.2), 1052, .8, `<!--FACES:left leaf--><g transform="rotate(${n2(-(t - MK("nothing")) * 400)})"><path d="M-20 0 Q0 -14 20 0 Q0 14 -20 0z" fill="#9C7A3C" stroke="#5E4520" stroke-width="3"/></g>`), c[0], c[1], c[2]) : "")
    + (t >= tL - .05 ? comicWord(t, tL - .05, 1200, 330, "KOO!", { size: 110, d: .9 }) + comicWord(t, tL + .45, 640, 330, "FLAP-FLAP-FLAP!", { size: 70, d: 1.0, rot: 6 }) : "")
    + (t >= tRun + .9 ? comicWord(t, tRun + 1.0, ...camPt(c, [CHX, 545]), "peck-peck-peck", { size: 40, tiny: true, col: "#fff", d: 1.6 }) : "")
    + (t >= tK ? comicWord(t, tK + .1, ...camPt(c, [520, 450]), "KOO-ROO!", { size: 96, d: 1.0, rot: -6 }) : "")
    + (t >= tO ? comicWord(t, tO + .05, 1250, 300, "FLAP-FLAP-FLAP!", { size: 70, d: .9 }) : "")
    + x2fine(t, tO, s.t1 - .2, "Please don't feed the pigeons.", 340, 1032)
    + (t >= MK("leafpic") - .2 ? TF(360, 360, spring(t, MK("leafpic") - .2, .45) * (1 - ramp(t, s.t1 - .3, .3)), `<g filter="url(#dropS)"><rect x="-170" y="-130" width="340" height="250" rx="22" fill="#fff" stroke="${P.leaf}" stroke-width="7"/></g><circle cx="-90" cy="-70" r="40" fill="${P.sun}"/>` + [0, 1, 2].map((i) => `<path d="M${-60 + i * 10} -40 L${-10 + i * 25} 10" stroke="${P.sun}" stroke-width="6" stroke-linecap="round"/>`).join("") + `<path d="M-20 60 Q40 -10 120 20 Q60 90 -20 60z" fill="#4FA23A" stroke="#2F6A1E" stroke-width="5"/>` + tpill(0, 150, "leaves: make food", 30, P.leaf, "#fff", { w: 700 })) : "")
    + (t >= MK("leafpic") + .4 ? TF(1600, 560, spring(t, MK("leafpic") + .4, .45) * (1 - ramp(t, s.t1 - .3, .3)), x2fixCard(t, 3, { k: .44, stamp: ["NOT FOOD FROM THE SOIL", false, MK("leafpic") + .9] }) + (t >= MK("leafpic") + 1.3 ? TF(0, 150, spring(t, MK("leafpic") + 1.3, .4), tpill(0, 0, "✗ plants eat food from the soil", 26, "#E5484D", "#fff", { w: 700 })) : "")) : "")
    + x2HUD(t); };

/* ================================================================ LCPARTS · LOOK CLOSER 1: check every part, like a plant doctor ================================================================ */
// one cream panel over the softly blurred void deck; Chilli BIG in the panel; Momo big at the right (she explains: she picked right) with her
// magnifier and a toy stethoscope; Pip at the left of the pot (he presses the soil); Basil's face peeks in at the lower-left corner (shy)
const LCC = [905, 1000], LCKK = 1.32, LPT = (p) => [LCC[0] + LCKK * p[0], LCC[1] + LCKK * p[1]];
SC.lcparts = (t, s) => { const k = ramp(t, s.t0, .45), tL = MK("leaves"), tS = MK("stem"), tSo = MK("soil"), tPr = MK("press"), tW = MK("win"), tR = MK("roots"), tN = MK("nohole"), frz = t >= tPr + .35 && t < LT("d506") - .05;
  const foc = (p, a, b, z) => { const u = ss(a, a + .7, t) * (1 - ss(b - .6, b, t)); return u > 0 ? [p, z, u] : null; };
  const F = foc(LPT([20, -300]), tL - .2, tS - .1, 1.3) || foc(LPT([0, -200]), tS - .2, tSo + .2, 1.3) || foc(LPT([0, -110]), tW - .3, LE("d510"), 1.45);
  const c = F ? camMix([1, 960, 540], camOn(F[0], F[1], 960, 520), F[2]) : [1, 960, 540];
  const tw_ = frz ? tPr + .35 : t;   // the freeze-frame: the world time stops
  const winK = clamp((t - tW) / .5), alarmed = t >= tPr + .35 && t < LE("d507") + .3;
  const face = alarmed ? "alarmed" : "droop";
  const wob = t > tS + .3 && t < tS + 2.0 ? 3 * Math.sin((t - tS) * 9) * (1 - (t - tS) / 2.0) : 0;
  const plant = TF(...LCC, LCKK, chilliV3(tw_, { body: "wilt", face, win: winK, winSt: "rot", wob }));
  const L = (txt, x, y, p, a, b, col) => t >= a - .05 && t < b + .35 ? OP(spring(t, a, .4) * (1 - ramp(t, b, .3)), plabel(x, y, txt, ...camPt(c, LPT(p)), 36, col)) : "";
  const labs = L("leaves: green, but drooping", 760, 250, [-110, -290], tL, tSo, "#9FE7B0") + L("stem: soft and bending", 520, 420, [-20, -230], tS, tSo + 1, "#FFE08A")
    + (t >= MK("bend") && t < tSo + 1 ? OP(spring(t, MK("bend"), .4) * (1 - ramp(t, tSo + 1, .3)), `<path d="M${camPt(c, LPT([-40, -150]))[0]} ${camPt(c, LPT([-40, -150]))[1]} q30 -20 60 0" stroke="#E5484D" stroke-width="6" fill="none" marker-end="url(#arrowR)"/>` + tpill(...camPt(c, LPT([150, -170])), "wobbly", 28, "#fff", "#E5484D", { w: 700 })) : "")
    + L("soaking wet", 1150, 300, [40, -146], MK("soak") - .1, tW + .3, "#BFE6F7");
  const pip = x2bd("pip", t < tPr - 1.2 ? 610 : lerp(610, 640, eo(clamp((t - tPr + 1.2) / .6))), 1076, 380, t, { in: s.t0 - .5, poses: [[s.t0, "sit"], [LT("d503") + .5, "thinking"], [LE("d503") + .1, "sit"], [MK("soil") + 1.0, "squeamish/oops"], [LT("d505") - .1, "sit"], [LE("d505") + .05, "proud/arms_crossed"], [tPr - .1, "pointing"], [LT("d506") + .1, "surprised"], [LT("d508") - .2, "squeamish/oops"], [MK("win") + .3, "sit"]], look: 8, still: frz });
  const mud = t >= LT("d506") && t < LT("d509") ? x2held([1, 960, 540], "pip", 640, 1076, 380, false, `<circle r="12" fill="#4A3524"/><circle cx="10" cy="6" r="7" fill="#4A3524"/>`, 0, 0) : "";
  window._BUBAT = { pip: [560, 330], momo: [1500, 250], basil: [1120, 290] };
  return blurDeck() + OP(k, panelV2(1) + `<clipPath id="pnV3"><rect x="${PNL2.x}" y="${PNL2.y}" width="${PNL2.w}" height="${PNL2.h}" rx="40"/></clipPath><g clip-path="url(#pnV3)">${CAM(plant, c[0], c[1], c[2])}</g>` + labs)
    + lcBanner(k) + pip + mud
    + magCircle(t, tN + .1, LE("d509") + .3, 1250, 640, ...camPt(c, LPT([0, -6])), "no hole", TF(1250, 640, 4, potWindow(t, 1, "rot")) , 100)
    + magCircle(t, tR + .1, LE("d509") + .3, 560, 360, ...camPt(c, LPT([-20, -32])), "brown, mushy roots", TF(560, 480, 4.4, potWindow(t, 1, "rot")), 100)
    + (t >= MK("clue") - .2 && t < LE("d510") + .5 ? OP(spring(t, MK("clue") - .2, .4) * (1 - ramp(t, LE("d510") + .2, .3)), `<path d="M${camPt(c, LPT([30, -40]))[0]} ${camPt(c, LPT([30, -40]))[1]} q20 -30 0 -60 q-20 -30 0 -60" stroke="#8FAF4A" stroke-width="8" fill="none"/>` + tpill(camPt(c, LPT([30, -40]))[0] + 60, camPt(c, LPT([30, -40]))[1] - 150, "CLUE", 30, "#8FAF4A", "#fff", { w: 700 })) : "")
    + x2bd("momo", 1690, 1076, 460, t, { in: s.t0 - .5, flip: true, poses: [[s.t0, "sit"], [tL - .1, "pointing"], [LE("d503") + .1, "sit"], [frz ? tPr + .35 : 9999, "pointing"], [LT("d506") - .05, "sit"], [LE("d506") + .05, "horrified/surprised"], [LT("d507") + .5, "sit"], [tR - .1, "surprised"], [LE("d509") + .2, "sit"]], look: -6, mag: (t >= tL - .1 && t < LE("d503") + .1) || frz, still: frz })
    + TF(1690, 1076 - 460 * .55, .9, stethV3())
    + x2bd("basil", 250, 1185, 400, t, { in: s.t0 - .5, peek: true, poses: [[s.t0, "oops"], [LT("d504") - .1, "sit"], [LE("d504") + .1, "sit"], [tPr + .35, "surprised"], [LT("d507") + .4, "laughing"], [LE("d508"), "oops"], [LT("d510") - .1, "deadpan"]], look: 8, tag: false, still: frz })
    + x2gSay("d507", 1060, 240, t, { tail: -100 })
    + x2frozen(frz ? 1 : 0) + x2flash(t, tPr + .35, .5, .12)
    + x2HUD(t); };

/* ================================================================ LCROOTS · LOOK CLOSER 2: the twist (wet soil, thirsty plant) ================================================================ */
// the THINK card first (over the softly dimmed panel, never over a face); then the cut-away fills the panel (side by side, never overlapped):
// LEFT, big, Chilli's soil (blue water in EVERY gap, brown roots); RIGHT, smaller, healthy soil (white air pockets, firm white roots);
// x603 the arrows (water round the brown roots, NOT going in) and the verdict pill; x604 ABSORB (the healthy root glows, water and specks
// going in); x605/x606 Basil's sorry, Chilli back in the panel (shy)
SC.lcroots = (t, s) => { const k = 1, tT = MK("think0"), tA = MK("air"), tC = MK("cannot"), tV = MK("verdict"), tB = MK("kw_absorb"), tSo = LT("x605") - .4, cut = t >= tA - .4 && t < tSo;
  const cu = clamp((t - tA + .4) / .5) * (1 - clamp((t - tSo) / .4));
  const panelIn = `<g transform="translate(960 560)">${OP(cu, cutawayV3(t, cu))}</g>`;
  const ch = t >= tSo - .2 ? OP(clamp((t - tSo + .2) / .4), TF(960, 880, 1.05, chilliV3(t, { body: "wilt", face: t >= LT("x606") - .2 ? "shy" : "droop" }))) : "";
  const L = (txt, x, y, px, py, a, b, col) => t >= a - .05 && t < b + .35 ? OP(spring(t, a, .4) * (1 - ramp(t, b, .3)), plabel(x, y, txt, px, py, 34, col)) : "";
  const labs = L("spaces full of water", 560, 230, 640, 420, MK("spaces") - .1, tSo - .3, "#BFE6F7") + L("rotting roots", 830, 880, 590, 700, MK("rot") - .1, tSo - .3, "#FFB3A0")
    + L("air pockets", 1380, 260, 1270, 430, MK("spaces") + .6, tSo - .3, "#fff") + L("healthy roots", 1250, 900, 1310, 700, MK("rot") + .4, tSo - .3, "#9FE7B0");
  const arrows = t >= tC - .1 && t < tSo ? OP(spring(t, tC - .1, .4) * (1 - ramp(t, tSo - .3, .3)), [0, 1, 2].map((i) => { const ph = ((t - tC) * .8 + i / 3) % 1; return `<g transform="translate(${n2(520 + 50 * i)} ${n2(560 + 90 * ph)})"><path d="M0 0 L30 0" stroke="#5CB8F0" stroke-width="10" stroke-linecap="round"/><path d="M38 -14 L54 14 M54 -14 L38 14" stroke="#E5484D" stroke-width="7" stroke-linecap="round"/></g>`; }).join("")) : "";
  const verdict = t >= tV ? TF(960, 900, spring(t, tV, .45) * (1 - ramp(t, tSo - .3, .3)), tpill(0, 0, "TOO MUCH WATER, NO HOLE", 44, "#E5484D", "#fff", { w: 700 })) : "";
  const absorb = t >= tB - .2 && t < tSo ? OP(spring(t, tB - .2, .4) * (1 - ramp(t, tSo - .3, .3)), `<circle cx="1290" cy="640" r="120" fill="#FFF6B0" opacity="${n2(.25 + .15 * Math.sin(t * 6))}"/>` + [0, 1, 2, 3].map((i) => { const ph = ((t - tB) * .7 + i / 4) % 1; return `<path d="M${n2(1180 + 70 * ph)} ${620 + i * 22} l20 0" stroke="#5CB8F0" stroke-width="8" stroke-linecap="round"/><circle cx="${n2(1170 + 80 * ph)}" cy="${600 + i * 26}" r="5" fill="#FFE27A"/>`; }).join("") + (t >= MK("salts") ? tpill(1300, 470, "water + mineral salts: in", 30, "#fff", P.ink, { w: 700 }) : "")) : "";
  const think = t >= tT - .1 && t < tA - .2 ? `<rect width="1920" height="1080" fill="${P.night}" opacity="${n2(.45 * spring(t, tT - .1, .4) * (1 - ramp(t, tA - .5, .3)))}"/>` + TF(960, 470, spring(t, tT - .1, .45) * (1 - ramp(t, tA - .5, .3)), `<g filter="url(#drop)"><rect x="-430" y="-230" width="860" height="440" rx="32" fill="#FFF8EA" stroke="${P.sun}" stroke-width="10"/></g>` + tpill(0, -230, "THINK!", 44, P.sun, P.ink, { w: 700 }) + T(0, -120, "Wet soil, but a droopy plant. Why?", 44, P.ink, { w: 700 })
    + TF(-200, 160, .55, chilliV3(t, { body: "wilt", face: "droop", talk: false }) + `<ellipse cx="0" cy="-146" rx="90" ry="12" fill="#5CB8F0" opacity=".8"/>`) + TF(200, 160, .55, chilliV3(t, { body: "wilt", face: "droop", talk: false }))
    + tpill(-200, 190, "soaking pot", 26, "#fff", P.ink, { w: 700 }) + tpill(200, 190, "drooping leaves", 26, "#fff", P.ink, { w: 700 })) : "";
  window._BUBAT = { basil: [1100, 290], momo: [1500, 250], pip: [380, 420] };
  return blurDeck() + panelV2(1) + `<clipPath id="pnV4"><rect x="${PNL2.x}" y="${PNL2.y}" width="${PNL2.w}" height="${PNL2.h}" rx="40"/></clipPath><g clip-path="url(#pnV4)">${panelIn}${ch}</g>` + labs + arrows + verdict + absorb + lcBanner(1)
    + x2bd("pip", 170, 1076, 330, t, { in: s.t0 - .5, poses: [[s.t0, "sit"], [tT, "thinking"], [tA, "sit"], [tB + .4, "sit"]], look: 8 }) + x2held([1, 960, 540], "pip", 170, 1076, 330, false, TF(0, 0, .7, towelV3()), 0, 0)
    + x2bd("momo", 1690, 1076, 460, t, { in: s.t0 - .5, flip: true, poses: [[s.t0, "sit"], [tT, "thinking"], [tA, "arms_crossed"], [tB - .05, "cheer"], [tB + 2.0, "arms_crossed"], [LT("x605") + .3, "sit"]], look: -6 })
    + x2bd("basil", 480, 1185, 400, t, { in: s.t0 - .5, peek: true, poses: [[s.t0, "thinking"], [LE("x601") + .1, "thinking"], [tC, "oops"], [LT("x605") - .1, "sit"], [LE("x605") + .1, "oops"], [LT("x606") + .3, "sit"]], look: 8, tag: false })
    + think + x2gSay("x606", 700, 330, t, { tail: 160 })
    + x2HUD(t); };

/* ================================================================ SYSTEM · finishing each other's sentence ================================================================ */
// a tight three-shot round Chilli (on the desk, a little bigger), the trio leaning in; roots (the window), stem and leaves light up in turn,
// each with a plain line to its label; arrows join roots -> stem -> leaves; the banner A PLANT IS A SYSTEM joined to all three parts
SC.system = (t, s) => { const c = camOn([960, 700], 1.0 + .06 * eio(clamp((t - s.t0) / 8)), 960, 600), tR = MK("sr"), tS = MK("ss"), tL = MK("sl"), tY = MK("sys"), ck = 1.0;
  const lit = (a) => t >= a - .1 ? .5 + .5 * Math.sin((t - a) * 5) * .4 + .3 : 0;
  const glowAt = (x, y, r, a) => a > 0 ? `<circle cx="${x}" cy="${y}" r="${r}" fill="#FFF6B0" opacity="${n2(.35 * Math.min(1, a))}"/>` : "";
  const P0 = (p) => [CHX + ck * p[0], DK.y + ck * p[1]];
  const glows = CAM(glowAt(...P0([0, -26]), 70, lit(tR)) + glowAt(...P0([-10, -220]), 60, lit(tS)) + glowAt(...P0([40, -300]), 90, lit(tL)), c[0], c[1], c[2]);
  const L = (txt, x, y, p, a, col) => t >= a - .1 ? OP(spring(t, a - .1, .4) * (1 - ramp(t, s.t1 - .4, .3)), plabel(x, y, txt, ...camPt(c, P0(p)), 36, col)) : "";
  const arrows = t >= tL + .3 ? OP(spring(t, tL + .3, .4), `<path d="M${camPt(c, P0([60, -40]))[0] + 60} ${camPt(c, P0([60, -40]))[1]} Q${camPt(c, P0([80, -150]))[0] + 120} ${camPt(c, P0([80, -150]))[1]} ${camPt(c, P0([60, -280]))[0] + 80} ${camPt(c, P0([60, -280]))[1]}" stroke="#5CB8F0" stroke-width="10" fill="none" stroke-dasharray="20 12"/>`) : "";
  const banner = t >= tY ? TF(960, 170, spring(t, tY, .45), tpill(0, 0, "A PLANT IS A SYSTEM", 52, P.leaf, "#fff", { w: 700 })) : "";
  window._BUBAT = { momo: [430, 380], pip: [1480, 380], basil: [1560, 300] };
  return x2place("vdv2", "", c) + x2bc(c, "basil", 1300, 960, 380, t, { in: s.t0 - .5, flip: true, poses: [[0, "sit"], [LE("s652") + .05, "sit"], [tY + .05, "cheer"], [tY + 2.0, "sit"], [MK("alarm"), "surprised"]], look: -8 })
    + CAM(x2desk(t), c[0], c[1], c[2]) + CAM(TF(CHX, DK.y, CHK * ck, chilliV3(t, { body: "wilt", face: "droop", win: t >= tR - .3 ? clamp((t - tR + .3) / .4) : 0, winSt: "rot" })), c[0], c[1], c[2]) + glows + arrows
    + L("roots", 760, 1035, [0, -20], tR, "#FFB3A0") + L("stem", 720, 470, [-6, -200], tS, "#FFE08A") + L("leaves", 1110, 420, [50, -300], tL, "#9FE7B0") + banner
    + x2bc(c, "momo", 470, 1050, 380, t, { in: s.t0 - .5, poses: [[0, "sit"], [LE("s651") + .05, "pointing"], [tY + .05, "cheer"], [tY + 2.0, "sit"], [MK("alarm"), "surprised"]], look: 8 })
    + x2bc(c, "pip", 1680, 1050, 370, t, { in: s.t0 - .5, flip: true, poses: [[0, "sit"], [LE("s652") + .05, "pointing"], [tY + .05, "cheer"], [tY + 2.0, "sit"], [MK("alarm"), "surprised"]], look: -8 })
    + (t >= MK("alarm") ? comicWord(t, MK("alarm") + .05, 1500, 220, "BEEP-BOOP!", { size: 80, d: .9 }) : "") + x2HUD(t); };

/* ================================================================ GLITCH · THE VILLAIN (won over by the evidence) ================================================================ */
// GLITCH rolls in from the right (FACES left: mirrored, the way he rolls; screen to the front) with his watering can, and stops beside the
// desk; Momo steps round to stand between him and Chilli; Basil and Pip a step back at the left (a two-shot). His chest display slides out
// as a second, LOWER screen beside him: the evidence, one picture at a time; then the KNOWLEDGE LOG.
const GX = 1680, GK = .43, GY = 1040;
function x2glitch(t, s) { const tA = s.t0, arrive = clamp((t - tA) / 1.6), x = lerp(2200, GX, eo(arrive)), roll = (x - 2200) * -1 / GK;
  const ev = MK("ev1"), ez = MK("bzzt"), tU = MK("upd"), tSt = MK("stored"), tQ = MK("req");
  let pose = "jug", face = "smug", scr = "";
  if (t >= LT("g453") - .2) pose = "base";
  if (t >= LT("g456") - .2) { pose = "crossed"; face = "smug"; }
  if (t >= MK("scan")) { pose = "down"; face = "surprised"; scr = scrScan((t - MK("scan")) * .9); }
  if (t >= ez) { face = "error"; scr = ""; }
  if (t >= LE("g458") + .1) face = "plain";
  if (t >= LT("g460") - .1) { pose = "crossed"; face = "grumpy"; scr = scrBar(clamp((t - tU) / (tSt - tU + .3))); }
  if (t >= tSt + .2) { pose = "up"; face = "happy"; scr = ""; }
  const chill = MK("req") + .9, narrow = t >= chill && t < chill + 8 / 30;
  if (narrow) face = "narrow";
  if (t < LT("g452")) scr = scrClock("07:00");
  const g = glitchV3(t, { pose, face, roll, scr, mirror: true });
  const sparks = t >= ez && t < ez + 1.6 ? [0, 1].map((i) => { const u = ((t - ez) * 3 + i * .5) % 1; return `<path d="M${-60 + i * 120} ${-860 - 40 * u} l12 -24 l-8 0 l12 -24" stroke="#FFE27A" stroke-width="8" fill="none" opacity="${n2(1 - u)}"/>`; }).join("") : "";
  return TF(x, GY, -GK, `<!--FACES:right glitch-->` + g + sparks, 0, GK); }
SC.glitch = (t, s) => { const tA = s.t0, low = 1 - eio(clamp((t - LT("g451") - 1.0) / 1.6)), c = camMix(camOn([1300, 820], 1.25, 1100, 700), [1, 960, 540], 1 - low);
  const ev = MK("ev1"), ev2 = MK("ev2"), ev3 = MK("ev3"), ez = MK("bzzt"), tU = MK("upd"), tSt = MK("stored"), tSc = MK("scan");
  const pk = t >= tSc - .2 && t < ez ? spring(t, tSc - .2, .45) : t >= tU && t < s.t1 ? spring(t, tU, .45) * (1 - ramp(t, s.t1 - .4, .3)) : t >= ez && t < ez + .3 ? 1 - ramp(t, ez, .3) : 0;
  const pic = t < ev2 - .1 ? evRoots() : t < ev3 - .1 ? evPool() : evNoHole();
  const panel = t < tU ? chestPanel(t, 1, pic + (t < ev ? `<rect x="-210" y="-150" width="420" height="300" fill="#DDF5EC"/>` + T(0, 12, "SCANNING...", 40, INKG) : "")) : chestPanel(t, 1, logCard(t, (t - tSt - .2) / .8, t >= MK("req") + .9 ? 1 : 0));
  const momoX = t < LT("g452") + .4 ? 1360 : lerp(1360, 1420, eo(clamp((t - LT("g452") - .4) / .6)));
  window._BUBAT = { basil: [480, 400], pip: [760, 330], momo: [1180, 330] };
  const pipB = x2bc(c, "pip", 700, 965, 330, t, { in: s.t0 - .5, poses: [[0, "surprised"], [LT("g451") + .5, "sit"], [LE("g454") + .1, "sit"], [LT("g455") - .1, "sit"], [LE("g455") + .1, "thinking"], [LT("g459") + .4, "sit"]], look: 8 });
  return x2place("vdv2", "", c) + pipB + CAM(x2desk(t), c[0], c[1], c[2]) + CAM(TF(CHX, DK.y, CHK, chilliV3(t, { body: "wilt", face: "droop", win: t >= tSc - .3 && t < ez + .5 ? 1 : 0, winSt: "rot" })), c[0], c[1], c[2])
    + x2bc(c, "basil", 300, 1030, 350, t, { in: s.t0 - .5, poses: [[0, "surprised"], [LT("g452") + .3, "pointing"], [LE("g452") + .1, "sit"], [LE("g454") - .2, "deadpan"], [LE("g454") + .6, "sit"], [LT("g458") + .2, "oops"], [LT("g459") + .4, "sit"]], look: 8 })
    + CAM(x2glitch(t, s), c[0], c[1], c[2])
    + x2bc(c, "momo", momoX, 1070, 380, t, { in: s.t0 - .5, flip: false, poses: [[0, "surprised"], [LT("g452") + .4, "sit"], [tSc - .1, "pointing"], [LE("g457") + .2, "sit"], [LT("g459") + .1, "sit"], [LE("g459") + .1, "sit"], [LT("g460") + 1.5, "cheer"], [MK("req") + .6, "sit"]], look: 8, mag: t >= tSc - .1 && t < LE("g457") + .2 })
    + (pk > .01 ? TF(1430, 330, pk * .82, panel) : "")
    + x2gSay("g451", 1240, 260, t, { tail: 80 }) + x2gSay("g453", 1080, 200, t, { tail: 120 }) + x2gSay("g456", 1180, 240, t, { tail: 100 }) + x2gSay("g458", 1120, 560, t, { tail: 140 }) + x2gSay("g460", 960, 160, t, { tail: 200, maxW: 640 })
    + (t >= LT("g451") ? comicWord(t, LT("g451") - .1, 1780, 280, "BEEP-BOOP!", { size: 66, d: .8, rot: 8 }) : "")
    + (t >= MK("tap") ? TF(1720, 600, spring(t, MK("tap"), .4) * (1 - ramp(t, LT("g454"), .3)), tpill(0, 0, "0 LEAKS ✓", 34, "#fff", INKG, { w: 700 })) : "")
    + (t >= ez ? comicWord(t, ez + .02, 1760, 330, "BZZT!", { size: 104, d: .9, rot: 10 }) : "")
    + x2HUD(t); };
