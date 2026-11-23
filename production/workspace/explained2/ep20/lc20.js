// lc20.js: EP20's look-closers, journeys and pictures (Stage 2, drawn 2026-11-23). Every look-closer art(t) is centred on (0, 0) inside
// +-830 x +-395 (closer.js): the thing FILLS the panel, each named part has its own big label joined by a line, the lower corners are kept for
// the peeking faces (|x| > 470 and y > 140 stay clear) and the bottom 80 px for the verdict. Every beat is drawn AT its mark (the sound keys on it).
// Part 1: lcPolesArt (the class's clips bunch at the two ends: POLES; ATTRACTION; every shape has two poles), lcPushPullArt (two bar magnets
// on round pencils: pull, then push: REPEL), ringJourney (be the top ring magnet). Part 2: lcLikeArt, lcTestArt, trainJourney (below).

/* ================================================================ Part 1 ================================================================ */
// a clip chain hanging from (x, y): n clips, swinging a little (each clip stands on end, joined to the one above)
const clipChain = (t, x, y, n, ph = 0, k = .5) => { let s = "", cx = x, cy = y; for (let i = 0; i < n; i++) { const a = 8 * Math.sin(t * 1.6 + ph + i * .7) * (i + 1) / n;
    s += `<g transform="translate(${n2(cx)} ${n2(cy)}) rotate(${n2(a)})">${TF(0, 30 * k * 2, k, clip20(1, 90))}</g>`; cx += Math.sin(a * Math.PI / 180) * 60 * k * 2; cy += 58 * k * 2; } return s; };
// the magnifier circle (a close look at (px, py) drawn by inner(), shown at (x, y) radius r), joined by a line
const magni20 = (t, t0, x, y, r, px, py, inner, lab, t1) => { if (t < t0) return ""; const a = t1 === undefined ? 1 : 1 - ramp(t, t1, .3); if (a <= .01) return ""; const k = spring(t, t0, .45), id = "mg" + Math.round(x) + Math.round(y);
  return OP(a, pline(px, py, x, y + r * .7 * Math.sign(py - y || 1), ramp(t, t0, .25), P.ink) + TF(x, y, k, `<clipPath id="${id}"><circle r="${r}"/></clipPath><circle r="${r}" fill="#F7FAFD"/><g clip-path="url(#${id})">${inner}</g><circle r="${r}" fill="none" stroke="${P.ink}" stroke-width="12"/><circle r="${r}" fill="none" stroke="#fff" stroke-width="4" opacity=".8"/>`)
    + (lab ? TF(x, y + r + 40, spring(t, t0 + .2, .4), tpill(0, 0, lab, 34, "#fff", P.ink, { w: 700 })) : "")); };
const star20 = (k = 1) => TF(0, 0, k, `<path d="M0 -30 L9 -9 L31 -9 L13 5 L20 27 L0 14 L-20 27 L-13 5 L-31 -9 L-9 -9z" fill="#F5B700" stroke="#9A6A00" stroke-width="3" stroke-linejoin="round"/><path d="M-4 -16 L-12 -4" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".7"/>`);
// the six shapes in EP19's book order, each with its two poles coloured red (North) and blue (South) and a small star on each pole
const SHAPES20 = ["bar", "U-shaped", "button", "rod", "ring", "horseshoe"];
const shape20 = (i, t) => { const R = NORTHC, B = SOUTHC, G = "#8E96A4", Rd = "#9A2A1E", Bd = "#1E3E8A", st = (x, y) => TF(x, y, .5, star20());
  return [`<rect x="-80" y="-24" width="80" height="48" rx="8" fill="${R}" stroke="${Rd}" stroke-width="5"/><rect x="0" y="-24" width="80" height="48" rx="8" fill="${B}" stroke="${Bd}" stroke-width="5"/>${T(-40, 12, "N", 30, "#fff")}${T(40, 12, "S", 30, "#fff")}` + st(-84, -34) + st(84, -34),
    `<path d="M-50 60 V-10 A50 50 0 0 1 50 -10 V60 H22 V-10 A22 22 0 0 0 -22 -10 V60z" fill="${G}" stroke="#4E5462" stroke-width="5"/><rect x="-50" y="24" width="28" height="36" fill="${R}" stroke="${Rd}" stroke-width="4"/><rect x="22" y="24" width="28" height="36" fill="${B}" stroke="${Bd}" stroke-width="4"/>` + st(-36, 82) + st(36, 82),
    `<ellipse cx="0" cy="12" rx="54" ry="22" fill="${B}" stroke="${Bd}" stroke-width="5"/><rect x="-54" y="-2" width="108" height="14" fill="${B}"/><ellipse cx="0" cy="-2" rx="54" ry="22" fill="${R}" stroke="${Rd}" stroke-width="5"/>${T(0, 8, "N", 26, "#fff")}` + st(0, -38) + st(0, 50),
    `<rect x="-90" y="-14" width="180" height="28" rx="14" fill="${G}" stroke="#4E5462" stroke-width="5"/><rect x="-90" y="-14" width="30" height="28" rx="12" fill="${R}" stroke="${Rd}" stroke-width="4"/><rect x="60" y="-14" width="30" height="28" rx="12" fill="${B}" stroke="${Bd}" stroke-width="4"/>` + st(-76, -38) + st(76, -38),
    `<path d="M-60 2 A60 22 0 1 0 60 2 V18 A60 22 0 1 1 -60 18z" fill="${B}" stroke="${Bd}" stroke-width="4"/><ellipse cx="0" cy="2" rx="60" ry="22" fill="${R}" stroke="${Rd}" stroke-width="5"/><ellipse cx="0" cy="2" rx="22" ry="8" fill="#FFF8EA" stroke="${Rd}" stroke-width="4"/>` + st(-38, -34) + st(38, 52),
    `<path d="M-54 56 Q-66 -50 0 -54 Q66 -50 54 56 L30 56 Q40 -26 0 -28 Q-40 -26 -30 56z" fill="${G}" stroke="#4E5462" stroke-width="5" stroke-linejoin="round"/><path d="M-57 22 L-58 56 H-30 L-31 22z" fill="${R}" stroke="${Rd}" stroke-width="4"/><path d="M57 22 L58 56 H30 L31 22z" fill="${B}" stroke="${Bd}" stroke-width="4"/>` + st(-44, 80) + st(44, 80)][i]; };
// [LOOK CLOSER] where is a magnet strongest? (P1 lcpoles)
function lcPolesArt(t) { const m = MKS, tD = m("dip"), tL = m("lift"), tB = m("bunch"), tM = m("middle"), tP = m("kw_poles"), tN = m("north"), tR = m("red"), tBl = m("blue"), tA = m("kw_attraction"), tS = m("stars"), tSh = m("shapes"), tRp = m("ringpoles");
  const out = ss(tSh - 1.1, tSh - .3, t), drop = ss(tSh - 1.6, tSh - 1.0, t);   // the clips drop back, then the whole picture goes (no ghost)
  let s = "";
  if (out < .999) { const my = t < tL ? lerp(-560, 175, eio((t - tD) / 1.1)) : lerp(175, -60, eio((t - tL) / 1.4)), MK2 = 1.85, half = 150 * MK2;
    const lifted = t >= tL + .35, ay = my + 42 * MK2 * .5;
    let a = TF(-60, 395 + 360 * eio((t - tL - .9) / 1.2), 1.7, tray20(t, { taken: t >= tL ? clamp((t - tL) / .6) : 0 }));
    // the clips leap UP to the two ends (towards the magnet) as it lifts, and hang in chains; one or two near the middle at most
    if (lifted) { const u = eo((t - tL - .35) / .5), dy = (1 - u) * 160 + drop * 420, op = 1 - drop;
      a += OP(op, [[-half + 26, 3, 0], [-half + 74, 2, 1], [-half + 120, 2, 2], [half - 26, 3, 3], [half - 74, 2, 4], [half - 120, 2, 5], [40, 1, 6]].map(([x, n, ph]) => clipChain(t, x, ay + dy, n, ph, .6)).join("")); }
    a += TF(0, my, MK2, bar20(t, { glint: !lifted }));
    // the magnifiers: one on each end (bunches), then one on the bare middle; they go when POLES lands
    const zoomEnd = (sd) => TF(-sd * 60, -10, 1.6, `<rect x="-120" y="-90" width="240" height="40" fill="${sd < 0 ? NORTHC : SOUTHC}"/>` + clipChain(t, -sd * 30, -50, 3, sd, .75) + clipChain(t, sd * 20, -50, 2, sd + 1, .75));
    a += magni20(t, tB + .2, -560, -150, 140, -half + 40, my, zoomEnd(-1), "bunches here", tP - .2) + magni20(t, tB + .5, 560, -150, 140, half - 40, my, zoomEnd(1), "bunches here", tP - .2)
      + magni20(t, tM, 0, 200, 105, 0, my + 44, `<rect x="-140" y="-120" width="280" height="44" fill="${NORTHC}"/><rect x="0" y="-120" width="140" height="44" fill="${SOUTHC}"/>` + TF(46, -66, .6, clip20(1, 80)), "hardly any here", tP - .2);
    // POLES: two lines from the key word to the two ends; the names of the ends; ATTRACTION = the pull; the gold stars
    if (t >= tP) { const k = ramp(t, tP + .1, .4) * (1 - ramp(t, tP + 2.4, .3)); a += pline(377, -240, -half + 30, my - 40, k, P.sun) + pline(377, -240, half - 30, my - 40, k, P.sun); }
    if (t >= tN) a += lcLab(t, tR - .1, -half + 40, -190, "N · North pole", -half + 60, my - 44, { fill: NORTHC, ink: "#fff", size: 40 });
    if (t >= tN) a += lcLab(t, tBl - .1, half - 40, -190, "S · South pole", half - 60, my - 44, { fill: SOUTHC, ink: "#fff", size: 40 });
    if (t >= tN && t < tR - .1) a += TF(0, -190, spring(t, tN, .4), tpill(0, 0, "two poles: North and South", 40, "#fff", P.ink, { w: 700 }));
    if (t >= tA) a += pline(-560, -150, -half + 40, my + 70, ramp(t, tA + .4, .3), PULLC) + TF(-560, -150, spring(t, tA + .3, .45), tpill(0, 0, "attraction = the pull", 38, PULLC, "#fff", { w: 700 }));
    if (t >= tS) a += [-1, 1].map((sd, i) => TF(sd * (half + 70), my - 10, spring(t, tS + .15 * i, .5) * (1 + .06 * Math.sin(t * 4 + i)), star20(2)) + TF(sd * (half + 70), my + 90, spring(t, tS + .3 + .15 * i, .45), tpill(0, 0, "strongest pull", 32, "#F5B700", P.ink, { w: 700 }))).join("");
    s += OP(1 - out, a); }
  // every shape has two poles (in EP19's book order), then the ring's poles on its two flat sides
  if (t >= tSh - .3) { const big = ss(tRp - .1, tRp + .8, t);
    SHAPES20.forEach((nm, i) => { const a0 = tSh + i * .35; if (t < a0) return; const isR = i === 4, x = lerp(-650 + i * 260, isR ? -260 : -650 + i * 260, isR ? big : 0), y = lerp(-60, isR ? -40 : 300, big), k0 = spring(t, a0, .45), kk = isR ? lerp(1, 2.4, big) : lerp(1, .55, big);
      if (!isR && big > .98) return; s += OP(isR ? 1 : 1 - big, TF(x, y, k0 * kk, `<g filter="url(#dropS)"><rect x="-118" y="-120" width="236" height="250" rx="24" fill="#fff" stroke="#E3C9A8" stroke-width="5"/></g>` + TF(0, -10, i === 1 || i === 5 ? .95 : 1.05, shape20(i, t)) + T(0, 104, nm, 32, P.ink))); });
    if (big > .05) s += OP(big, lcLab(t, tRp + .6, 60, -230, "N on top", -200, -110, { fill: NORTHC, ink: "#fff", size: 38 }) + lcLab(t, tRp + 1.0, 60, 120, "S underneath", -200, 20, { fill: SOUTHC, ink: "#fff", size: 38 })
      + TF(470, 40, spring(t, tRp + 1.4, .45) * .62, rings20(t, { glowTop: PUSHC, glowBot: PUSHC })) + TF(470, 140, spring(t, tRp + 1.6, .4), tpill(0, 0, "Pip's rings", 30, P.pip, "#fff", { w: 700 }))); }
  return s; }

// [LOOK CLOSER] pull or push? two bar magnets on round pencils (P1 lcpushpull). Top row: a red end and a blue end roll together and click
// (they start to roll BEFORE they touch). Bottom row: one is turned round; two red ends: one rolls away; the gap never closes.
function lcPushPullArt(t) { const m = MKS, tR = m("roll"), tPl = m("pull"), tC = m("click2"), tPs = m("push"), tA = m("away"), tK = m("kw_repel"), tB = m("board2");
  const K = 1.2, HL = 150 * K, Y1 = -140, Y2 = 110, XL = -390, XR = 200;
  let s = `<rect x="-800" y="${Y1 + 70}" width="1600" height="16" rx="8" fill="#E6D3B4"/>` + (t >= tPs - .3 ? `<rect x="-800" y="${Y2 + 70}" width="1600" height="16" rx="8" fill="#E6D3B4" opacity="${n2(ramp(t, tPs - .3, .3))}"/>` : "");
  // TOP: left [N|S]; right [N|S] starts apart and rolls left (slowly at first, BEFORE they touch), clicks at click2
  { const uR = clamp((t - tPl - .4) / (tC - tPl - .4)), xr = lerp(XR, XL + 2 * HL, uR * uR), roll = xr - XR;
    s += barOnPencils(t, XL, Y1, K, { glint: false }) + barOnPencils(t, xr, Y1, K, { roll });
    if (t >= tPl && t < tC) s += ppArrows(t, (XL + HL + xr - HL) / 2, Y1, "pull", ramp(t, tPl, .3), { gap: 8, len: 50, w: 16 }) + chevrons(t, xr - HL + 60, Y1 - 70, xr - HL - 10, Y1 - 70, 1, PULLC, 2, .8);
    if (t >= tPl + .6 && t < tC) s += `<path d="M${n2(xr + HL + 20)} ${Y1 - 20} h50 M${n2(xr + HL + 30)} ${Y1 + 10} h70 M${n2(xr + HL + 20)} ${Y1 + 40} h40" stroke="${P.ink}" stroke-width="5" stroke-linecap="round" opacity=".35"/>`;
    if (t >= tC) s += impactFX(t, tC, XL + HL, Y1, "CLICK!", { s: .5, flash: false, size: 64, col: PULLC, d: .7 });
    s += lcLab(t, tPl + .2, XL + HL - 40, Y1 - 150, "a red end and a blue end", XL + HL - 20, Y1 - 50, { size: 36, t1: tB - .3 });
    s += linkChip(t, tC + .2, 330, Y1 - 150, XL + HL + 10, Y1 - 30, 0, "pull", 40); }
  // BOTTOM: left [S|N] (its red end on the right); the right one [S|N] is turned round to [N|S] (a red end faces the red end), then, as the
  // left one is slid closer, the right one rolls AWAY, never touched; the gap never closes
  if (t >= tPs - .3) { const k = ramp(t, tPs - .3, .3), fl = clamp((t - tPs - .2) / .8), sx = Math.max(.03, Math.abs(Math.cos(Math.PI * fl))), xl = lerp(XL, XL + 110, eio((t - tA) / 1.4)), push = clamp((t - tA - .2) / 2.2), xr = XR + 170 * eo(push);
    s += OP(k, barOnPencils(t, xl, Y2, K, { flip: true, glint: false }) + `<g transform="translate(${n2(xr)} ${Y2}) scale(${n2(sx)} 1) translate(${n2(-xr)} ${-Y2})">` + barOnPencils(t, xr, Y2, K, { flip: fl < .5, roll: xr - XR }) + `</g>`);
    if (fl > 0 && t < tPs + 1.4) s += OP(1 - ramp(t, tPs + 1.1, .3), `<path d="M${xr - 150} ${Y2 - 90} Q${xr} ${Y2 - 190} ${xr + 150} ${Y2 - 90}" fill="none" stroke="${P.ink}" stroke-width="10" stroke-linecap="round"/><path d="M${xr + 120} ${Y2 - 122} L${xr + 152} ${Y2 - 88} L${xr + 108} ${Y2 - 80}" fill="none" stroke="${P.ink}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>` + TF(xr, Y2 - 200, 1, tpill(0, 0, "turned round", 32, "#fff", P.ink, { w: 700 })));
    if (t >= tA) { const gx = (xl + HL + xr - HL) / 2; s += ppArrows(t, gx, Y2, "push", ramp(t, tA, .3), { gap: 16, len: 46, w: 16 }) + chevrons(t, xr - HL + 10, Y2 - 70, xr - HL + 90, Y2 - 70, 1, PUSHC, 2, .8)
      + lcLab(t, tA + .3, gx - 60, Y2 - 140, "two red ends: the gap never closes", gx, Y2 - 46, { size: 34, t1: tB - .3 }) + linkChip(t, tA + .8, 560, Y2 - 150, gx + 10, Y2 - 30, 1, "push", 40); } }
  // the board's two pairs: it depends which poles face
  if (t >= tB) s += TF(-40, -330, spring(t, tB, .45), `<g filter="url(#dropS)"><rect x="-420" y="-46" width="840" height="92" rx="46" fill="#fff" stroke="${P.ink}" stroke-width="4"/></g>` + T(0, 14, "it depends which poles face", 42, P.ink));
  return s; }

// BE THE TOP RING MAGNET (P1 shrink): the camera IS the top ring, looking DOWN along the pencil (your own dark grey rim round the bottom
// of the frame, the pencil's yellow paint going down from your hole). d(t): how far above the bottom ring you are (900 far; 120 floating;
// 58 pressed). The bottom ring is a wide grey platform below you that grows as you come closer; the push (magenta) comes UP at you from it.
function ringJourney(t, s) { const m = MK, tS = m("jslide"), tBl = m("jbelow"), tSl = m("jslow"), tPu = m("jpush"), tSt = m("jstop"), tPr = m("jpress"), tH = m("jharder"), tSp = m("jspring"), tG = m("jgap");
  let d; if (t < tSt) { const u = clamp((t - tS + .4) / (tSt - tS + .4)); d = lerp(1100, 120, 1 - Math.pow(1 - u, 2.4)); }
  else if (t < tPr) d = 120 + 9 * Math.sin((t - tSt) * 2.6) * Math.exp(-(t - tSt) * .4);
  else if (t < tSp) d = lerp(120, 62, eio((t - tPr) / (tH - tPr + 1)));
  else { const u = t - tSp; d = 120 + 40 * Math.exp(-u * 2.2) * Math.cos(u * 6) + 4 * Math.sin(t * 2.6); }
  const F = 1500, V = [960, 380], look = ss(tG - .2, tG + 1.4, t), rx = F * 90 / d, ry = rx * (.55 + .2 * look), hx = F * 34 / d, pf = F * 9 / (d + 120), jl = t >= tPr && t < tPr + .4 ? 8 * Math.sin((t - tPr) * 60) * (1 - (t - tPr) / .4) : 0;
  let o = `<rect width="1920" height="1080" fill="#3E4350"/><rect width="1920" height="1080" fill="#FFF4C8" opacity=".08"/>`;
  // far below: the bench top, the pink plasticine round the pencil's foot (seen when the bottom ring is still small)
  o += `<ellipse cx="${V[0]}" cy="${n2(V[1] + 30)}" rx="${n2(F * 140 / (d + 60))}" ry="${n2(F * 80 / (d + 60))}" fill="#E86A8A" stroke="#A8405E" stroke-width="5"/>`;
  // the bottom ring: its top face, a wide grey platform, the pencil through its hole
  o += `<g transform="translate(0 ${n2(jl)})"><ellipse cx="${V[0]}" cy="${V[1]}" rx="${n2(rx)}" ry="${n2(ry)}" fill="url(#gRingTop)" stroke="#22252E" stroke-width="8"/><ellipse cx="${V[0]}" cy="${V[1]}" rx="${n2(rx * .82)}" ry="${n2(ry * .82)}" fill="none" stroke="#6A7080" stroke-width="${n2(Math.max(2, rx * .02))}"/>`
    + `<path d="M${n2(V[0] - rx * .7)} ${n2(V[1] - ry * .35)} Q${n2(V[0] - rx * .2)} ${n2(V[1] - ry * .85)} ${n2(V[0] + rx * .45)} ${n2(V[1] - ry * .72)}" stroke="#A8B0C0" stroke-width="${n2(Math.max(3, 14 * 120 / d))}" fill="none" stroke-linecap="round" opacity=".7"/>`
    + `<ellipse cx="${V[0]}" cy="${V[1]}" rx="${n2(hx)}" ry="${n2(hx * .55)}" fill="#22252E"/><ellipse cx="${V[0]}" cy="${n2(V[1] + hx * .08)}" rx="${n2(hx * .9)}" ry="${n2(hx * .45)}" fill="#8A3A54"/><ellipse cx="${V[0]}" cy="${n2(V[1] + hx * .12)}" rx="${n2(hx * .6)}" ry="${n2(hx * .3)}" fill="#C25878"/></g>`;
  if (t >= tBl && t < tSt + 1) o += TF(V[0] + Math.min(rx, 700) * .62, V[1] - Math.min(ry, 300) * .2 + 60, spring(t, tBl + .3, .45) * (1 - ramp(t, tSt + .6, .3)), tpill(0, 0, "the bottom ring magnet", 36, "#fff", P.ink, { w: 700 }));
  // the pencil: from your own hole (near, wide) down into the bottom ring's hole (far); its grain slides past as you slide down
  const pn = 92, sc = (t - s.t0) * 30 + (1100 - Math.max(d, 120)) * 1.4;
  o += `<path d="M${V[0] - pn} 1100 L${n2(V[0] - pf)} ${V[1]} L${n2(V[0] + pf)} ${V[1]} L${V[0] + pn} 1100z" fill="#FFC83A" stroke="#B8861C" stroke-width="5"/><path d="M${V[0] - pn + 26} 1100 L${n2(V[0] - pf * .5)} ${V[1]} L${n2(V[0] - pf * .1)} ${V[1]} L${V[0] - pn + 70} 1100z" fill="#FFE08A"/>`;
  for (let i = 0; i < 7; i++) { const u = (((i / 7) + sc / 900) % 1), e = u * u, y = lerp(V[1], 1100, e), w = lerp(pf, pn, e); o += `<path d="M${n2(V[0] - w * .6)} ${n2(y)} q${n2(w * .3)} ${n2(-4 * e)} ${n2(w * .6)} 0" stroke="#D89A1E" stroke-width="${n2(2 + 4 * e)}" fill="none" stroke-linecap="round" opacity=".75"/>`; }
  if (t > tS && t < tSl) o += [0, 1, 2, 3].map((i) => { const a = (i * 90 + 45) * Math.PI / 180, r0 = 380 + ((t * 900 + i * 200) % 500); return `<path d="M${n2(V[0] + Math.cos(a) * r0)} ${n2(V[1] + Math.sin(a) * r0 * .7)} l${n2(Math.cos(a) * 90)} ${n2(Math.sin(a) * 60)}" stroke="#fff" stroke-width="8" stroke-linecap="round" opacity=".5"/>`; }).join("");
  // the push: MAGENTA arrows rising from the bottom ring UP at you (towards your rim), bigger and thicker as the gap shrinks
  const pa = t < tPu ? 0 : ramp(t, tPu, .6), hard = clamp((120 - d) / 55), aw = 20 * (1 + 1.3 * hard);
  if (pa > .02) { for (const x of [-640, -330, 330, 640]) { const y1 = 600 + Math.abs(x) * .05, y2 = 860 - Math.abs(x) * .06; o += OP(pa, fatArrow(V[0] + x, y1, V[0] + x * 1.04, y2, PUSHC, aw)); }
    o += chevrons(t, V[0] - 480, 560, V[0] - 490, 860, pa, PUSHC, 3, 1.3 + .6 * hard) + chevrons(t, V[0] + 480, 560, V[0] + 490, 860, pa, PUSHC, 3, 1.3 + .6 * hard)
      + (t >= tPu + .8 && t < tPr ? TF(1450, 560, spring(t, tPu + .8, .45), tpill(0, 0, "pushing up on you", 38, PUSHC, "#fff", { w: 700 })) : ""); }
  // the gap: looking down into it: empty, a soft light shining through; chips joined to it
  if (look > .02) o += OP(look, `<ellipse cx="960" cy="880" rx="820" ry="90" fill="#FFF8D8" opacity=".5" filter="url(#b30)"/>`)
    + linkChip(t, tG + 1.0, 400, 690, 560, 905, 1, "a push", 46) + linkChip(t, tG + 1.4, 960, 600, 760, 915, 1, "no glue", 46) + linkChip(t, tG + 1.8, 1520, 690, 1360, 905, 1, "no string", 46);
  // the giant finger (Pip's, a big soft shape: four fingers and a thumb) presses on you from above: a shadow, the fingertips at the top edge
  const fin = t < tPr - .6 || t > tSp + .9 ? 0 : t < tPr ? eo((t - tPr + .6) / .6) : t < tSp ? 1 : 1 - eo((t - tSp) / .8);
  if (fin > .01) o += `<rect width="1920" height="1080" fill="${P.ink}" opacity="${n2(.22 * fin)}"/>` + `<g transform="translate(960 ${n2(-760 + 640 * fin)}) scale(3.4)"><g transform="rotate(90)">${hand15({ curl: .05, sleeve: "#B9A6FF", sleeveD: "#8B5CF6" })}</g></g>`
    + (fin > .5 && t < tSp ? TF(960, 300, spring(t, tPr + .3, .4), tpill(0, 0, "Pip's finger", 36, "#fff", P.ink, { w: 700 })) : "");
  // YOU: your own dark grey rim at the bottom of the frame, round the pencil (first person)
  const br = 6 * Math.sin(t * 2);
  o += `<path d="M-80 1100 L-80 ${n2(900 + br)} Q960 ${n2(800 + br)} 2000 ${n2(900 + br)} L2000 1100z" fill="#5A6070" stroke="#22252E" stroke-width="8"/><path d="M20 ${n2(930 + br)} Q960 ${n2(842 + br)} 1900 ${n2(930 + br)}" fill="none" stroke="#9AA2B2" stroke-width="12" opacity=".65"/>`
    + `<ellipse cx="960" cy="${n2(1010 + br)}" rx="${pn + 40}" ry="44" fill="#2A2D36"/><path d="M${960 - pn} ${n2(990 + br)} V1100 H${960 + pn} V${n2(990 + br)}z" fill="#FFC83A" stroke="#B8861C" stroke-width="5"/><rect x="${960 - pn + 26}" y="${n2(990 + br)}" width="44" height="120" fill="#FFE08A"/>`;
  return o; }

// Part 1 pictures. The ring's picture in Round 1 (lockN obj, drawn round (430, 470)): the floating ring, big; a finger presses it down on
// `press` and it springs back up when it lifts
const ringP1 = (t) => { const tp = MKS("press"), fin = t < tp - .5 ? 0 : t < tp ? eo((t - tp + .5) / .5) : t < tp + 1.6 ? 1 : 1 - eo((t - tp - 1.6) / .5), pr = t < tp ? 0 : t < tp + 1.6 ? .55 * eo((t - tp) / .4) : .55 * (1 - eo((t - tp - 1.6) / .3));
  return `<circle cx="430" cy="470" r="190" fill="#FFF8EA"/>` + TF(430, 665, .64, rings20(t, { press: pr, finger: fin })); };
// the HOLD ON! ring's picture: the floating ring with a sad face drawn on Pip's card beside it
const ringHold = (t) => `<circle cx="430" cy="470" r="190" fill="#FFF8EA"/>` + TF(430, 665, .64, rings20(t, {}));
// the fun fact (the spider): baby spiders fly with no wings ("ballooning")
const babySp = (x, y, k, t, ph = 0) => TF(x, y, k, spider20(t + ph, {}));
const ffGrass20 = (t, w, h) => { let s = `<rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" fill="#CFEAF8"/><rect x="${-w / 2}" y="${h / 2 - 50}" width="${w}" height="50" fill="#7FBF5E"/>`;
  [[-90, 150], [-20, 190], [60, 165], [110, 120]].forEach(([x, hh], i) => { const sw = 5 * Math.sin(t * 1.5 + i), tx = x + sw, ty = h / 2 - 40 - hh; s += `<path d="M${x} ${h / 2 - 40} Q${x + sw * .4} ${h / 2 - 40 - hh / 2} ${n2(tx)} ${n2(ty)}" stroke="#4BA862" stroke-width="7" fill="none" stroke-linecap="round"/>`
    + `<path d="M${x} ${h / 2 - 50} q-16 -30 -6 -60" stroke="#58B56C" stroke-width="5" fill="none"/>` + babySp(tx, ty, .2, t, i) + `<path d="M${n2(tx)} ${n2(ty - 14)} Q${n2(tx + 40)} ${n2(ty - 70)} ${n2(tx + 70 + 10 * Math.sin(t * 2 + i))} ${n2(ty - 150)}" stroke="#fff" stroke-width="2.5" fill="none" opacity=".95"/>`; });
  return s; };
const ffUp20 = (t, w, h) => { const u = (t - MKS("ff_up")) * 18; let s = `<rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" fill="#8FD0F6"/><circle cx="${w * .3}" cy="${-h * .32}" r="30" fill="#FFD75A"/>` + [-80, 0, 70].map((y, i) => `<path d="M${-w / 2 + 10} ${y} q40 -16 80 0 t80 0" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round" opacity=".8" transform="translate(${n2(((u * (1 + i * .3)) % 120))} 0)"/>`).join("");
  [[-70, 60], [10, -10], [80, 40]].forEach(([x, y], i) => { const yy = y - ((u * .6 + i * 20) % 60); s += `<path d="M${x} ${n2(yy - 14)} Q${x + 30} ${n2(yy - 80)} ${x + 60} ${n2(yy - 150)}" stroke="#fff" stroke-width="2.5" fill="none"/>` + babySp(x, yy, .2, t, i); });
  return s; };
const ffFar20 = (t, w, h) => { const u = clamp((t - MKS("ff_far")) / 1.4); let s = `<rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" fill="#BFE3F6"/><path d="M${-w / 2} 40 Q0 20 ${w / 2} 50 V${h / 2} H${-w / 2}z" fill="#5BB0E0"/><path d="M${w / 2 - 110} 60 Q${w / 2 - 60} 0 ${w / 2} 30 V${h / 2} H${w / 2 - 130}z" fill="#E9D7A6" stroke="#C9A974" stroke-width="3"/>`
    + `<path d="M${-w / 2 + 30} -100 Q0 -150 ${w / 2 - 70} 20" stroke="${P.ink}" stroke-width="4" fill="none" stroke-dasharray="10 10"/>`;
  const x = lerp(-w / 2 + 30, w / 2 - 70, u), y = lerp(-100, 20, u) - 40 * Math.sin(Math.PI * u); s += `<path d="M${n2(x)} ${n2(y - 14)} L${n2(x - 30)} ${n2(y - 120)}" stroke="#fff" stroke-width="2.5"/>` + babySp(x, y, .22, t);
  return s + TF(-30, -40, 1, tpill(0, 0, "far away", 28, "#fff", P.ink, { w: 700 })); };
// Mark Sentence pictures (o.under): the bar magnet with its clip bunches and the two stars; the two pairs with their arrows
const markPoles = (t, x, y, k) => TF(x, y, k, `<g filter="url(#dropS)"><rect x="-430" y="-150" width="860" height="300" rx="30" fill="#FFF8EA"/></g>` + TF(0, -30, 1.6, bar20(t, { glint: false })) + [-1, 1].map((sd) => clipChain(t, sd * 200, 4, 2, sd, .45) + clipChain(t, sd * 160, 4, 2, sd + 2, .45) + TF(sd * 330, -40, 1.2, star20())).join(""));
const markPairs = (t, x, y, k) => TF(x, y, k, `<g filter="url(#dropS)"><rect x="-560" y="-130" width="1120" height="260" rx="30" fill="#FFF8EA"/></g>` + TF(-430, -10, .62, bar20(t, { glint: false })) + TF(-230, -10, .62, bar20(t, { glint: false })) + ppArrows(t, -330, -70, "pull", 1, { gap: 12, len: 40, w: 14 }) + T(-330, 100, "attract (pull)", 34, PULLC)
  + TF(220, -10, .62, bar20(t, { glint: false, flip: true })) + TF(440, -10, .62, bar20(t, { glint: false })) + ppArrows(t, 330, -70, "push", 1, { gap: 12, len: 40, w: 14 }) + T(330, 100, "repel (push)", 34, PUSHC));
