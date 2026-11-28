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

// BE THE TOP RING MAGNET (P1 shrink), REDRAWN 24 Nov 2026 as a SIDE VIEW (teacher, on the first-person view down the pencil: "I cannot
// visualise how it actually is. It looks more like they are at the bottom of the magnet with one above them"). The camera stands beside the
// rings, a little above them, at the size of a ring magnet, in ONE continuous shot: Pip's pencil upright in its pink plasticine on the front
// bench, passing through the holes of BOTH rings; the bottom ring resting on the plasticine; YOU = the top ring (a sun-yellow glow outline,
// big eyes on your rim, the "You: the top ring magnet" tag joined to you). The buddies, shrunk, stand on the bench at the pencil's foot.
// Beats on the same marks: jslide you slide down the pencil from near its tip (the camera follows you); jbelow the camera eases back to
// show the bottom ring (its label); jslow you slow down; jpush magenta arrows in the gap push UP on you and DOWN on the bottom ring; jstop
// you stop in mid-air with a clear gap, bobbing ("you float"); jpress Pip's finger (four fingers and a thumb) presses you down: the gap
// shrinks, the arrows grow; jharder harder; jspring the finger lifts and you spring back up; jgap the camera pushes in to the empty gap
// (a soft light through it; "a push", "no glue", "no string" joined to it). World coordinates are rings20's (origin = the plasticine's
// base; the rings' faces rx 90 ry 30; the holes rx 34 ry 11); this pencil is taller (its tip at -820: a real pencil is about five ring
// magnets long). Nothing floats but you.
const RJ = { y0: -700, ys: -330, yf: -250, press: 60, tip: -820 };
const PENCIL_J = `<rect x="-16" y="-760" width="32" height="710" fill="#FFC83A" stroke="#B8861C" stroke-width="5"/><path d="M-16 -760 L0 -820 L16 -760z" fill="#F2D6A8" stroke="#B8861C" stroke-width="4"/><path d="M-6 -798 L0 -820 L6 -798z" fill="#3A3A4A"/><rect x="-10" y="-750" width="8" height="690" fill="#FFE08A"/>`
  + [-640, -520, -400, -280, -160].map((y) => `<path d="M-9 ${y} q9 -5 18 0" stroke="#D89A1E" stroke-width="3" fill="none" stroke-linecap="round" opacity=".6"/>`).join("");
// where you are (the top ring's centre, y) and how hard Pip presses (0..1) and how far his finger is down (0..1)
function ringJState(t, s) { const m = MK, tSl = m("jslow"), tSt = m("jstop"), tPr = m("jpress"), tH = m("jharder"), tSp = m("jspring");
  let y, pr = 0;
  if (t < tSl) { const u = clamp((t - s.t0) / (tSl - s.t0)); y = lerp(RJ.y0, RJ.ys, -1.1 * u * u * u + 2.1 * u * u); }
  else if (t < tSt) { const T = tSt - tSl, u = clamp((t - tSl) / T), v0 = (RJ.ys - RJ.y0) * .9 / (tSl - s.t0);   // you slow down and stop (no overshoot)
    y = (2 * u ** 3 - 3 * u * u + 1) * RJ.ys + (u ** 3 - 2 * u * u + u) * T * v0 + (-2 * u ** 3 + 3 * u * u) * RJ.yf; }
  else if (t < tSp) { pr = t < tPr ? 0 : .55 * eio((t - tPr) / .9) + .45 * eio((t - tH) / .9); y = RJ.yf + RJ.press * pr; }
  else { const u = t - tSp; y = RJ.yf + RJ.press * Math.exp(-u * 2.2) * Math.cos(u * 6); }
  const bob = t < tSt ? 0 : 6 * Math.sin((t - tSt) * 2.4) * ramp(t, tSt, .6) * (1 - pr);
  const fin = t < tPr - .6 || t > tSp + .9 ? 0 : t < tPr ? eo((t - tPr + .6) / .6) : t < tSp ? 1 : 1 - eo((t - tSp) / .8);
  return { y: y + bob, pr, fin }; }
// the camera [K, cx, cy]: following you down near the top, easing back to show both rings and the bench (jbelow), pushing in on the two
// rings as you stop, then on the empty gap (jgap). Scale is eased in log space, so the push-ins feel even.
function ringJCam(t, s, yY) { const m = MK, tBl = m("jbelow"), tSl = m("jslow"), tSt = m("jstop"), tG = m("jgap");
  const mix = (a, b, u) => [Math.exp(lerp(Math.log(a[0]), Math.log(b[0]), u)), lerp(a[1], b[1], u), lerp(a[2], b[2], u)];
  let c = [2.1, 0, yY + 120];
  c = mix(c, [1.42, 0, -335], eio((t - tBl + 1.2) / 2.8));
  c = mix(c, [2.8, 0, -172], eio((t - tSl - .3) / (tSt - tSl + .6)));
  c = mix(c, [3.15, 0, -160], eio((t - tG + .2) / 1.8));
  return [c[0], c[1] + 14 * Math.sin(t * .23), c[2]]; }
function ringJourney(t, s, o = {}) { const m = MK, tS = m("jslide"), tBl = m("jbelow"), tSl = m("jslow"), tPu = m("jpush"), tSt = m("jstop"), tPr = m("jpress"), tH = m("jharder"), tSp = m("jspring"), tG = m("jgap");
  const st = ringJState(t, s), yY = st.y, [K, cx, cy] = ringJCam(t, s, yY), jl = t >= tPr && t < tPr + .4 ? 6 * Math.sin((t - tPr) * 60) * (1 - (t - tPr) / .4) : 0;
  const X = (x) => 960 + K * (x - cx), Y = (y) => 540 + K * (y - cy) + jl;
  let o2 = "";
  // the science room far behind, big and soft (it moves less than the bench: parallax): the pale wall, the window onto the field, the poster
  const py = -(cy + 330) * K * .12, px = -cx * K * .1;
  o2 += `<rect width="1920" height="1080" fill="url(#srWall)"/><g transform="translate(${n2(px)} ${n2(py)})" filter="url(#b4)" opacity=".9"><rect x="-120" y="-260" width="760" height="760" rx="20" fill="url(#srSky)" stroke="#C9D6CC" stroke-width="30"/><path d="M-120 300 Q260 250 640 300 V500 H-120z" fill="url(#srGrass)"/><path d="M260 -260 V500 M-120 120 H640" stroke="#C9D6CC" stroke-width="22"/>`
    + `<rect x="1380" y="-120" width="420" height="540" rx="16" fill="#FFF4DC" stroke="#E3C9A8" stroke-width="12"/><rect x="1430" y="-60" width="320" height="40" rx="10" fill="#9AC4E8"/><rect x="1430" y="20" width="240" height="26" rx="8" fill="#E0B07A"/><rect x="1430" y="70" width="280" height="26" rx="8" fill="#E0B07A"/></g>`
    + `<rect width="1920" height="1080" fill="#FFF4C8" opacity=".12"/>`;
  const gTop = yY + 44, gBot = RG_BOT - 24, gMid = (gTop + gBot) / 2, lk = ss(tG - .2, tG + 1.4, t);
  // the world (rings20's coordinates), through the camera
  let w = `<rect x="-3000" y="-40" width="6000" height="900" fill="url(#srTop)"/><path d="M-3000 -40 H3000" stroke="#7A8090" stroke-width="5"/>`
    + [-900, -560, 420, 760].map((x, i) => `<path d="M${x} ${10 + i * 22} q60 -6 140 0" stroke="#6A7080" stroke-width="4" fill="none" stroke-linecap="round" opacity=".5"/>`).join("");
  w += `<ellipse cx="0" cy="6" rx="150" ry="22" fill="${P.ink}" opacity=".3" filter="url(#b4)"/><path d="M-120 0 Q-110 -60 0 -66 Q110 -60 120 0z" fill="#E86A8A" stroke="#A8405E" stroke-width="5"/><path d="M-80 -30 q30 -16 70 -10" stroke="#FF9AB4" stroke-width="7" fill="none" stroke-linecap="round" opacity=".8"/>`
    + (lk > .02 ? OP(lk, `<ellipse cx="0" cy="${n2(gMid)}" rx="130" ry="${n2(Math.max(14, (gBot - gTop) * .4))}" fill="#FFF6C8" opacity=".9" filter="url(#b10)"/>`) : "")   // the empty gap: a soft light through it (behind the pencil)
    + PENCIL_J;
  // the bottom ring magnet, resting on the plasticine, the pencil through its hole
  w += TF(0, RG_BOT, 1, ring20({})) + pencilThrough(RG_BOT, 1, PENCIL_J);
  // YOU: the top ring, with a sun-yellow glow, an outline, and big eyes on your rim (they squeeze shut while Pip presses)
  const SIL = `M-90 0 A90 30 0 0 1 90 0 V22 A90 30 0 0 1 -90 22z`, shut = st.pr > .2 || blink16(t, .4), look = t < tSt ? 1 : 0;
  w += `<g transform="translate(0 ${n2(yY)})"><path d="${SIL}" fill="none" stroke="${P.sun}" stroke-width="${n2(16 + 4 * Math.sin(t * 3))}" opacity=".75" filter="url(#b10)"/>${ring20({})}<path d="${SIL}" fill="none" stroke="${P.sun}" stroke-width="5" stroke-linejoin="round"/>`
    + eye16(-32, 40, 9.5, { shut, lx: look ? 0 : .3 }) + eye16(32, 40, 9.5, { shut, lx: look ? 0 : .3 }) + `<path d="M-6 47 q6 5 12 0" stroke="#fff" stroke-width="2.5" fill="none" stroke-linecap="round" opacity=".85"/></g>` + pencilThrough(yY, 1, PENCIL_J);
  // Pip's finger: a hand (four fingers and a thumb) comes down from above onto your top face
  if (st.fin > .01) w += TF(-4, yY - 26 - 330 * (1 - st.fin), .9, TF(0, -84, 1, hand15({ curl: .62, sleeve: "#B9A6FF", sleeveD: "#8B5CF6" }), 90));
  o2 += `<g transform="translate(${n2(960 - K * cx)} ${n2(540 - K * cy + jl)}) scale(${n2(K)})">${w}</g>`;
  // the push in the gap: magenta arrows at both sides of the pencil, UP on you and DOWN on the bottom ring; thicker as the gap shrinks
  const pa = t < tPu ? 0 : ramp(t, tPu, .6), hard = clamp((st.pr - .1) / .9), aw = (20 + 12 * hard) * (1 + .05 * Math.sin(t * 7)), ex = 30 * hard;   // pressed: the arrows grow and reach onto the two rings
  if (pa > .02) o2 += OP(pa * (.35 + .65 * hard), `<ellipse cx="${n2(X(0))}" cy="${n2(Y(gMid))}" rx="${n2(K * 95)}" ry="${n2(K * Math.max(8, (gBot - gTop) * .45))}" fill="${PUSHC}" opacity=".35" filter="url(#b10)"/>`)
    + OP(pa, [-56, 56].map((x) => fatArrow(X(x), Y(gMid - 3), X(x), Y(gTop + 3 - ex), PUSHC, aw * K / 2.8) + fatArrow(X(x), Y(gMid + 3), X(x), Y(gBot - 3 + ex), PUSHC, aw * K / 2.8)).join(""));
  // speed lines beside you as you slide
  const sp = ss(tS, tS + 1, t) * (1 - ss(tSl - 1, tSl + .5, t));
  if (sp > .02) o2 += [...Array(8)].map((_, i) => { const x = X((i % 2 ? 1 : -1) * (110 + 30 * hash(i, 3))), u = ((t * 1.6 + hash(i, 5)) % 1), y0 = Y(yY) + 260 - 520 * u; return `<path d="M${n2(x)} ${n2(y0)} v${n2(-70 - 50 * hash(i, 7))}" stroke="#fff" stroke-width="7" stroke-linecap="round" opacity="${n2(.6 * sp * Math.sin(Math.PI * u))}"/>`; }).join("");
  // the three buddies, shrunk, standing on the bench at the pencil's foot (in the world: they move and scale with the camera)
  const RW = o.at || { pip: [-244, 16], momo: [-168, 26], basil: [252, 18] }, at = {};
  for (const k in RW) at[k] = [X(RW[k][0]), Y(RW[k][1])];
  o2 += riders(t, s, { tin: o.tin, h: 80 * K, at, poses: o.poses || {} });
  // labels, each joined to what it names
  const rx = X(92), lx = X(-92), yu = Y(yY + 8), ub = 1 - ramp(t, s.t1 - .5, .3);
  o2 += OP(ub, lcLab(t, tS - .2, 1450, clamp(yu - 150, 90, 300), "You: the top ring magnet", rx, yu, { size: 38, fill: P.sun, ink: P.ink }));
  o2 += lcLab(t, tBl + .2, 1490, Y(RG_BOT) - 150, "the bottom ring magnet", X(92), Y(RG_BOT + 8), { size: 38, t1: tPr - .4 });
  o2 += t >= tBl && t < tSl + .3 ? TF(60 + tw("to scale: a ring magnet", 30, 600) / 2 + 26, 76, spring(t, tBl, .45) * (1 - ramp(t, tSl, .25)), tpill(0, 0, "to scale: a ring magnet", 30, P.ink, "#fff", { w: 600 })) : "";
  o2 += lcLab(t, tPu + .8, 470, Y(gMid) - 20, "pushing up on you", X(-56), Y(gMid - 14), { size: 38, fill: PUSHC, ink: "#fff", t1: tH - .2 });
  o2 += lcLab(t, tSt, 470, Y(yY) - 150, "you float", lx, yu - 6, { size: 42, t1: tPr - .5 });
  o2 += lcLab(t, tPr + .3, 520, 120, "Pip's finger", X(-30), Y(yY - 170 - 330 * (1 - st.fin)), { size: 36, t1: tSp + .2 });
  o2 += lcLab(t, tH, 470, Y(gMid) - 20, "closer = stronger push", X(-56), Y(gMid - 6), { size: 38, fill: PUSHC, ink: "#fff", t1: tSp - .1 });
  if (t >= tG) o2 += linkChip(t, tG + 1.0, 420, Y(gMid) + 10, X(-62), Y(gMid), 1, "a push", 46) + linkChip(t, tG + 1.4, 1480, Y(gMid) - 110, X(50), Y(gMid - 6), 2, "no glue", 46) + linkChip(t, tG + 1.8, 1480, Y(gMid) + 110, X(50), Y(gMid + 6), 2, "no string", 46);
  return o2; }

// Part 1 pictures. The ring's picture in Round 1 (lockN obj, drawn round (430, 470)): the floating ring, big; a finger presses it down on
// `press` and it springs back up when it lifts
const ringP1 = (t) => { const tp = MKS("press"), fin = t < tp - .5 ? 0 : t < tp ? eo((t - tp + .5) / .5) : t < tp + 1.6 ? 1 : 1 - eo((t - tp - 1.6) / .5), pr = t < tp ? 0 : t < tp + 1.6 ? .55 * eo((t - tp) / .4) : .55 * (1 - eo((t - tp - 1.6) / .3));
  return `<circle cx="430" cy="470" r="190" fill="#FFF8EA"/>` + TF(430, 595, .5, rings20(t, { press: pr, finger: fin })); };   // 24 Nov: smaller and higher, so the plasticine and the bottom ring sit above the number badge (lockN clips the picture to the circle)
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

/* ================================================================ Part 2 ================================================================ */
// the Part 2 recap's three pictures (1040 x 600, centred): the bar magnet lifted from the clips (bunches at both ends, two gold stars); the
// floating ring (magenta arrows in the gap); the ring turned over and snapped down (a green chip)
const recapP2 = (i, t) => { let s = `<rect x="-520" y="-300" width="1040" height="600" fill="${["#F2E8D6", "#FFF3DC", "#E6F6E8"][i]}"/>`;
  if (i === 0) s += TF(0, -70, 2.2, bar20(t, { glint: false })) + [-1, 1].map((sd, j) => clipChain(t, sd * 260, -24, 3, j, .7) + clipChain(t, sd * 200, -24, 2, j + 2, .7) + TF(sd * 400, -90, 2, star20())).join("") + clipChain(t, 30, -24, 1, 3, .7);
  else if (i === 1) s += TF(0, 290, .9, rings20(t, { glowTop: PUSHC, glowBot: PUSHC })) + ppArrows(t, 0, 290 + .9 * ringGapY(1), "push", 1, { dir: "v", gap: 12, len: 40, w: 16 }) + TF(260, 290 + .9 * ringGapY(1), 1, tpill(0, 0, "a push", 40, PUSHC, "#fff", { w: 700 }));
  else s += TF(0, 290, .9, rings20(t, { gap: 0, topY: RG_BOT - 24, topSy: -1 })) + linkChip(t, -9, 300, 40, 90, 290 + .9 * (RG_BOT - 12), 0, "a pull: it snaps down", 40);
  return s; };
// Round 1's three card pictures (400 x 280) and the ring's picture: two bar magnets on round pencils, pushed apart; a curved turn arrow over the right one
const r1Pic = (i, t) => { let s = `<rect x="-200" y="-140" width="400" height="280" fill="${["#FBE6F0", "#E6F6E8", "#EEF1F5"][i]}"/>`, K = .48, H = 150 * K;
  if (i === 0) s += barOnPencils(t, -110, 0, K, { glint: false, flip: true }) + barOnPencils(t, 110, 0, K, { glint: false }) + ppArrows(t, 0, -20, "push", 1, { gap: 8, len: 30, w: 12 });
  else if (i === 1) s += barOnPencils(t, -H, 0, K, { glint: false, flip: true }) + barOnPencils(t, H, 0, K, { glint: false, flip: true }) + ppArrows(t, 0, -56, "pull", 1, { gap: 8, len: 30, w: 12 });
  else s += barOnPencils(t, -110, 0, K, { glint: false, flip: true }) + barOnPencils(t, 110, 0, K, { glint: false, flip: true }) + T(0, -60, "z z z", 40, "#8A949E");
  return s; };
const ringP2 = (t) => { const K = .62; return `<circle cx="430" cy="470" r="190" fill="#FFF8EA"/>` + barOnPencils(t, 330, 500, K, { glint: false, flip: true }) + barOnPencils(t, 530, 500, K, { glint: false })
  + ppArrows(t, 430, 470, "push", 1, { gap: 6, len: 22, w: 10 }) + `<path d="M450 380 Q530 320 610 380" fill="none" stroke="${P.ink}" stroke-width="9" stroke-linecap="round"/><path d="M585 352 L612 382 L576 392" fill="none" stroke="${P.ink}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>`; };

// BE A TOY TRAIN CARRIAGE (P2 shrink): the camera IS the carriage, looking down the wooden track (a wide road). z: the engine's distance (in
// carriage lengths; the ground at distance z is at y 430 + 650 / z). First the end of you with a RED (North) magnet faces the engine's red
// (North) back magnet: a push, it rolls away untouched. Basil turns you round: your other end, with a BLUE (South) magnet, faces it: a pull, CLICK.
function trainJourney(t, s) { const m = MK, tT = m("jtrack"), tE = m("jengine"), tR = m("jroll"), tA = m("jaway"), tN = m("jnever"), tTu = m("jturn"), tC = m("jclick"), tS = m("jsame");
  const HZ = 430, gy = (z) => HZ + 650 / z;
  let z; if (t < tR) z = 6; else if (t < tA) z = lerp(6, 2.3, eio((t - tR) / (tA - tR))); else if (t < tTu) z = lerp(2.3, 4.2, eo((t - tA) / 2.2)); else if (t < tC - 2.4) z = 4.2; else z = lerp(4.2, 1.45, ei(clamp((t - tC + 2.4) / 2.4)));
  const turn = clamp((t - tTu) / 2.6), lift = Math.sin(Math.PI * turn), spinA = 360 * eio(turn), back = turn >= .5, roll = (t - s.t0) * 60 + (t > tA && t < tTu ? 0 : 0);
  const myMag = back || t >= tTu + 1.3 ? SOUTHC : NORTHC, myL = myMag === NORTHC ? "N" : "S";
  let w = `<rect width="1920" height="1080" fill="#F6D29C"/><rect x="0" y="0" width="1920" height="${HZ}" fill="#F2C88A"/>`
    + `<rect x="120" y="${HZ - 300}" width="560" height="300" rx="20" fill="#8A5A30" opacity=".7" filter="url(#b10)"/><rect x="200" y="${HZ - 520}" width="400" height="230" rx="14" fill="#1E2030" opacity=".7" filter="url(#b10)"/>`
    + `<rect x="1300" y="${HZ - 260}" width="420" height="260" rx="20" fill="#FF9838" opacity=".75" filter="url(#b10)"/><circle cx="960" cy="${HZ - 300}" r="90" fill="#FFFDF6" stroke="#8A5A30" stroke-width="12" opacity=".7" filter="url(#b4)"/>`
    + `<rect x="0" y="${HZ}" width="1920" height="${1080 - HZ}" fill="#C08A54"/>` + [...Array(9)].map((_, i) => { const y = gy(8 / (i + 1)); return `<path d="M0 ${n2(y)} H1920" stroke="#A8743E" stroke-width="${n2(1 + i * .6)}"/>`; }).join("");
  // the wooden track: a wide road with two grooves, converging to the horizon; its planks slide under you
  const tw0 = 820; w += `<path d="M${960 - tw0} 1080 L${960 - 40} ${HZ} L${960 + 40} ${HZ} L${960 + tw0} 1080z" fill="#E2BA82" stroke="#A8743E" stroke-width="6"/>`
    + [-.42, .42].map((f) => `<path d="M${n2(960 + f * tw0)} 1080 L${n2(960 + f * 40)} ${HZ}" stroke="#A8743E" stroke-width="14"/><path d="M${n2(960 + f * tw0 - 18)} 1080 L${n2(960 + f * 40 - 1)} ${HZ}" stroke="#8A5A30" stroke-width="5"/>`).join("");
  for (let i = 0; i < 10; i++) { const zz = ((((i + 1) * .9 - roll / 120) % 9) + 9) % 9 + .9, y = gy(zz), hw = 40 + (tw0 - 40) * (y - HZ) / (1080 - HZ); w += `<path d="M${n2(960 - hw)} ${n2(y)} H${n2(960 + hw)}" stroke="#C99A5E" stroke-width="${n2(2 + 4 * (y - HZ) / 650)}" opacity=".7"/>`; }
  // the engine ahead (its back, with its RED North magnet), at distance z
  if (t >= tE - .2) { const k = 2.4 / z, y = gy(z), a = ramp(t, tE - .2, .4); w += OP(a, TF(960, y, k, `<ellipse cx="0" cy="6" rx="200" ry="20" fill="${P.ink}" opacity=".22"/><rect x="-180" y="-300" width="360" height="270" rx="26" fill="#E0453A" stroke="#8A2418" stroke-width="8"/><rect x="-120" y="-420" width="240" height="140" rx="20" fill="#E0453A" stroke="#8A2418" stroke-width="8"/><rect x="-80" y="-400" width="160" height="90" rx="12" fill="#BFE6FF" stroke="#8A2418" stroke-width="6"/>`
      + wheel20(-120, -30, 50, t, t * 3) + wheel20(120, -30, 50, t, t * 3) + `<path d="M-180 -120 H180" stroke="#C9A06A" stroke-width="16"/><circle cx="0" cy="-170" r="54" fill="${NORTHC}" stroke="${P.ink}" stroke-width="8"/>` + T(0, -150, "N", 60, "#fff")));
    if (t >= tE + .3 && t < tR + .8) w += TF(960 + 220 * k + 140, y - 260 * k, spring(t, tE + .3, .45), tpill(0, 0, "the engine", 40, "#fff", P.ink, { w: 700 })); }
  // the push (magenta) between your front and the engine's back; then the pull (green) after you are turned round
  const gTop = gy(z) - 170 * 2.4 / z, gBot = 920;
  if (t >= tR && t < tTu) { const k = ramp(t, tR, .5) * (1 - ramp(t, tTu - .5, .4)); w += OP(k, fatArrow(960, gBot - 40, 960, Math.min(gBot - 140, gTop + 120), PUSHC, 26) + fatArrow(960, gTop + 40, 960, gTop - 70, PUSHC, 26 * 2.4 / z + 8)) + chevrons(t, 760, gBot - 60, 760, gTop + 40, k, PUSHC, 3, 1.4) + chevrons(t, 1160, gBot - 60, 1160, gTop + 40, k, PUSHC, 3, 1.4); }
  if (t >= tC - 2.4 && t < tC + .2) { const k = ramp(t, tC - 2.4, .5); w += OP(k, fatArrow(960, gTop - 80, 960, gTop + 30, PULLC, 22) + fatArrow(960, gBot + 20, 960, gBot - 90, PULLC, 26)) + chevrons(t, 760, gTop + 20, 760, gBot - 40, k, PULLC, 3, 1.4) + chevrons(t, 1160, gTop + 20, 1160, gBot - 40, k, PULLC, 3, 1.4); }
  if (t >= tC) w += impactFX(t, tC, 960, 820, "CLICK!", { s: .9 });
  // the turn: Basil's paw lifts you (a big soft shadow), the world swings round, you are set back down: your OTHER end faces the engine now
  let out = turn > 0 && turn < 1 ? `<g transform="translate(960 ${n2(540 + 160 * lift)}) rotate(${n2(spinA * .12 * Math.sin(Math.PI * turn))}) scale(${n2(1 + .25 * lift)} ${n2(1 + .1 * lift)}) translate(-960 -540)" filter="${lift > .3 ? "url(#b4)" : "none"}">${w}</g>` : w;
  if (turn > 0 && turn < 1) out += `<rect width="1920" height="1080" fill="#14B8A6" opacity="${n2(.18 * lift)}"/><path d="M${n2(960 - 900 * Math.cos(Math.PI * turn))} 300 Q960 ${n2(180 - 60 * lift)} ${n2(960 + 900 * Math.cos(Math.PI * turn))} 300" fill="none" stroke="#fff" stroke-width="16" stroke-linecap="round" opacity="${n2(lift)}"/>`
    + TF(960, 170, spring(t, tTu + .1, .45) * (1 - ramp(t, tTu + 2.4, .3)), tpill(0, 0, "Basil turns you round", 44, P.basil, "#fff", { w: 700 }));
  // YOU: your own front edge at the bottom of the frame, with its small round magnet (red N first; after the turn, the other end: blue S)
  out += `<g transform="translate(0 ${n2(-120 * lift)})"><path d="M120 1080 L200 930 H1720 L1800 1080z" fill="#2EB5A6" stroke="#1E7A70" stroke-width="8"/><rect x="190" y="914" width="1540" height="30" rx="12" fill="#C9A06A" stroke="#8A6A3A" stroke-width="5"/>`
    + `<circle cx="960" cy="1010" r="62" fill="${myMag}" stroke="${P.ink}" stroke-width="8"/>` + T(960, 1034, myL, 64, "#fff") + `</g>`;
  if (t >= tT + .6 && t < tE) out += TF(960, 830, spring(t, tT + .6, .45), tpill(0, 0, "your magnet", 36, "#fff", P.ink, { w: 700 }));
  if (t >= tTu + 1.6 && t < tC - .8) out += TF(1260, 960, spring(t, tTu + 1.6, .45), tpill(0, 0, "your other end", 36, "#fff", P.ink, { w: 700 }));
  return out; }

// [LOOK CLOSER] like and unlike poles (P2 lclike): WHICH POLES FACE? big at the right, filling box by box (the same marks as the real card),
// each box's own pair of bar magnets meeting at the left (pull: they click; push: the gap stays); then Pip's rings, big: the two faces that
// meet are both North poles (in our picture): like poles repel, so it floats; turned over, a South pole meets a North pole: it snaps down.
const LK_PAIRS = { ns: [true, true, 0], sn: [false, false, 0], nn: [true, false, 1], ss: [false, true, 1] };   // [left flip, right flip, push]: flip true = [S|N]
const LC_UP = -650;   // 24 Nov: Pip's ring is lifted right off the pencil (its tip at -570) before it is turned over
function lcLikeArt(t) { const m = MKS, tRg = m("rings"), tFl = m("floats"), tFr = m("flipr"), tSn = m("snap"), tU = m("kw_unlike_poles"), tL = m("kw_like_poles");
  const ring = ss(tRg - .8, tRg, t), cx = lerp(200, 430, ring), cy = lerp(-30, -70, ring), ck = lerp(1.35, 1.0, ring);
  let s = "", lines = "";
  // the pairs, two rows at a time (ns and sn together, then nn and ss): each pair slides in low from the left, then meets (a pull: click) or
  // stays apart (a push) ON its own mark; a line joins its gap to its box on the card; they slide out before the next two come
  const box0 = (i) => [cx - 200 * ck + ((i % 2 ? 210 : 14) + 88) * ck, cy - 215 * ck + (74 + (i < 2 ? 0 : 132) + 59) * ck];
  const NAMES = { ns: "North + South", sn: "South + North", nn: "North + North", ss: "South + South" };
  [["ns", 0, -200], ["sn", 1, 20], ["nn", 2, -200], ["ss", 3, 20]].forEach(([key, i, Y]) => { const t0 = m(key), first = i < 2 ? m("ns") : m("nn"), end = i < 2 ? m("nn") - 1.0 : tRg - .8;
    if (t < first - 1.4 || t > end + .4) return; const [lf, rf, push] = LK_PAIRS[key], K = .85, H = 150 * K, inn = eio(clamp((t - first + 1.4) / .9)), gone = ss(end - .2, end + .3, t), u = clamp((t - t0) / .5);
    const xl = push ? -620 : lerp(-640, -470 - H, eio(u)), xr = push ? lerp(-300, -250, eo(u)) : lerp(-300, -470 + H, eio(u));
    const L = lerp(-1050, xl, inn) - 700 * gone, R = lerp(-700, xr, inn) - 700 * gone, a = Math.min(inn, 1 - gone), gx = (L + H + R - H) / 2, col = push ? PUSHC : PULLC, done = t >= t0;
    s += OP(a, barOnPencils(t, L, Y, K, { flip: lf, glint: false }) + barOnPencils(t, R, Y, K, { flip: rf, glint: false })
      + TF(-470, Y - 92, 1, tpill(0, 0, NAMES[key] + (done ? (push ? ": REPEL" : ": ATTRACT") : ""), 32, done ? col : "#fff", done ? "#fff" : P.ink, { w: 700 })));
    if (done) { const [bx, by] = box0(i); s += OP(1 - gone, ppArrows(t, gx, Y, push ? "push" : "pull", ramp(t, t0, .3), { gap: push ? 18 : 8, len: 36, w: 14 }) + (push ? "" : impactFX(t, t0 + .15, gx, Y, "CLICK!", { s: .42, flash: false, size: 58, col: PULLC, d: .6 })) + ""); lines += OP(1 - gone, pline(gx, Y, bx, by, ramp(t, t0, .3), col)); } });
  if (t >= m("sstoo") && t < tRg - .4) s += OP(1 - ss(tRg - 1.0, tRg - .5, t), TF(-280, 200, spring(t, m("sstoo"), .45), tpill(0, 0, "South and South push apart too!", 32, "#fff", PUSHC, { w: 700 })));
  s = lines + fridgeCard20(t, [cx - 200 * ck, cy - 215 * ck, cx + 200 * ck, cy + 215 * ck], { id: "lk" }) + s;
  // UNLIKE POLES -> the two green boxes; LIKE POLES -> the two magenta boxes (lines from the key word while it is big)
  const boxC = (i) => [cx - 200 * ck + ((i % 2 ? 210 : 14) + 88) * ck, cy - 215 * ck + (74 + (i < 2 ? 0 : 132) + 59) * ck];
  if (t >= tU && t < tU + 2.6) { const k = ramp(t, tU + .1, .4) * (1 - ramp(t, tU + 2.3, .3)); [0, 1].forEach((i) => { const [x, y] = boxC(i); s += pline(-377, -230, x, y, k, PULLC); }); }
  if (t >= tL && t < tL + 2.6) { const k = ramp(t, tL + .1, .4) * (1 - ramp(t, tL + 2.3, .3)); [2, 3].forEach((i) => { const [x, y] = boxC(i); s += pline(377, -230, x, y, k, PUSHC); }); }
  // Pip's rings, BIG, their facing faces named (in our picture: North and North: like poles repel, it floats; turned over: South over North:
  // unlike poles attract, it snaps down). The old labels go COMPLETELY when the picture changes.
  if (ring > .02) { const RK = .92, RX = -330, RY = 330, f0 = clamp((t - tFr) / 1.0), snapped = t >= tSn, gapK = snapped ? 0 : 1;
    let top; if (t < tFr) top = {}; else if (t < tFr + .5) top = { topY: lerp(RG_TOP, LC_UP, eio((t - tFr) / .5)) }; else if (t < tFr + 1.1) top = { topY: LC_UP, topSy: Math.cos(Math.PI * eio((t - tFr - .5) / .6)) };
    else if (t < tSn - .25) top = { topY: lerp(LC_UP, RG_TOP + 20, eio((t - tFr - 1.1) / 1.2)), topSy: -1 }; else if (t < tSn) top = { topY: lerp(RG_TOP + 20, RG_BOT - 24, ei((t - tSn + .25) / .25)), topSy: -1 }; else top = { topY: RG_BOT - 24, topSy: -1 };
    const flipped = t >= tFr + .8, gcol = flipped ? PULLC : PUSHC;
    s += OP(ring, TF(RX, RY, RK, rings20(t, { ...top, glowTop: t < tFr ? PUSHC : flipped ? PULLC : undefined, glowBot: t < tFr || flipped ? gcol : undefined })));
    const gy0 = RY + RK * ringGapY(1), botF = RY + RK * (RG_BOT - 8), topU = RY + RK * (RG_TOP + 26);
    if (t < tFr) s += OP(ring, lcLab(t, tRg + .4, RX + 330, topU - 60, "N", RX + 80, topU, { fill: NORTHC, ink: "#fff", size: 44, t1: tFr - .2 }) + lcLab(t, tRg + .8, RX + 330, botF + 20, "N", RX + 80, botF, { fill: NORTHC, ink: "#fff", size: 44, t1: tFr - .2 })
      + (t >= tRg + 1.2 ? OP(1 - ramp(t, tFr - .2, .25), ppArrows(t, RX, gy0, "push", ramp(t, tRg + 1.2, .3), { dir: "v", gap: 10, len: 30, w: 14 })) : "")
      + (t >= tRg + 2.2 ? OP(1 - ramp(t, tFr - .2, .25), TF(RX + 380, gy0 - 10, spring(t, tRg + 2.2, .45), tpill(0, 0, "like poles: repel", 40, PUSHC, "#fff", { w: 700 }))) : "")
      + (t >= tRg + 1.6 ? OP(1 - ramp(t, tFr - .2, .25), TF(RX, RY - 640 * RK + 60, spring(t, tRg + 1.6, .4), tpill(0, 0, "in our picture", 28, "#fff", P.ink, { w: 600 }))) : "")
      + (t >= tFl ? OP(1 - ramp(t, tFr - .2, .25), TF(RX + 380, gy0 + 70, spring(t, tFl, .45), tpill(0, 0, "it floats", 34, "#fff", P.ink, { w: 700 }))) : ""));
    if (t >= tFr && t < tFr + 1.3) s += OP(1 - ramp(t, tFr + 1.0, .3), `<path d="M${RX - 130} ${RY - 700 * RK} Q${RX} ${RY - 800 * RK} ${RX + 130} ${RY - 700 * RK}" fill="none" stroke="${P.ink}" stroke-width="10" stroke-linecap="round"/><path d="M${RX + 102} ${RY - 736 * RK} L${RX + 132} ${RY - 698 * RK} L${RX + 88} ${RY - 690 * RK}" fill="none" stroke="${P.ink}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>`);
    if (flipped) { const tf = tFr + .8, uy = snapped ? RY + RK * (RG_BOT - 30) : RY + RK * (top.topY + 26);
      s += lcLab(t, tf + .3, RX + 330, uy - 70, "S", RX + 80, uy, { fill: SOUTHC, ink: "#fff", size: 44 }) + lcLab(t, tf + .5, RX + 330, botF + 50, "N", RX + 80, botF + 6, { fill: NORTHC, ink: "#fff", size: 44 })
        + (t >= tSn - 2.4 && !snapped ? ppArrows(t, RX, (uy + botF) / 2, "pull", ramp(t, tSn - 2.4, .3), { dir: "v", gap: 8, len: 30, w: 14 }) : "")
        + (t >= tSn - 1.2 ? TF(RX + 380, uy - 160, spring(t, tSn - 1.2, .45), tpill(0, 0, "unlike poles: attract", 40, PULLC, "#fff", { w: 700 })) : "")
        + (snapped ? impactFX(t, tSn, RX + 60, botF - 20, "CLICK!", { s: .7 }) : ""); } }
  return s; }

// [LOOK CLOSER] is it a magnet? THE REPEL TEST (P2 lctest): Dad's two grey bars, BIG (A on top, B below), and Basil's red-and-blue magnet on
// its pencils, moved LOW along the table to each end in turn. Every end pulls it in (the end of the magnet that faces each bar end is the one
// that attracts it); then the magnet is turned round: one end of bar B PUSHES it away (it rolls back, the gap stays); bar A only ever pulls.
// (True to the physics: a magnet's turned-round end meets the same pole of B, so B pushes; iron A pulls either end.)
function lcTestArt(t) { const m = MKS, tB = m("bars"), tP = m("pullall"), tT = m("turn"), tPu = m("push"), tN = m("never"), tM = m("bmagnet"), tK = m("kw_the_repel_test"), tNo = m("note");
  const YA = -150, YB = 40, BL = 170, K = .8, H = 150 * K, GP = 18;
  // [time, bar row, side (-1 left / 1 right), magnet flipped?, result "pull" | "push"]
  const seq = [[tP, YA, -1, true, "pull"], [tP + 1.6, YA, 1, false, "pull"], [tP + 3.2, YB, -1, true, "pull"], [tP + 4.8, YB, 1, true, "pull"],
    [tT + .2, YB, 1, false, "turn"], [tPu, YB, 1, false, "push"], [tN + .2, YA, 1, false, "pull"], [tN + 1.6, YA, -1, true, "pull"]];
  let cur = -1; for (let i = 0; i < seq.length; i++) if (t >= seq[i][0] - .6) cur = i;
  let s = `<rect x="-800" y="-360" width="1600" height="720" rx="20" fill="#F2E2C4" opacity=".5"/>`;
  s += TF(0, YA, 1.13, greyBar("A")) + TF(0, YB, 1.13, greyBar("B"));
  if (t >= tB) s += TF(-560, YA, spring(t, tB + .3, .45), tpill(0, 0, "bar A", 34, "#fff", P.ink, { w: 700 })) + TF(-560, YB, spring(t, tB + .6, .45), tpill(0, 0, "bar B", 34, "#fff", P.ink, { w: 700 })) + (t < tP ? TF(0, YB + 150, spring(t, tB + 1, .45), tpill(0, 0, "they look exactly the same", 34, "#fff", P.ink, { w: 700 })) : "");
  // the pulled tags stay at each end once tested
  for (let i = 0; i <= cur; i++) { const [t0, y, sd, , r] = seq[i]; if (r !== "pull" || t < t0 + .2 || i >= 6) continue; const x = sd * (BL + 6); s += TF(x, y - 74, spring(t, t0 + .2, .4), tpill(0, 0, "pulled", 26, PULLC, "#fff", { w: 700 })); }
  // the magnet: it glides low between the stops (never flying), turned to face each end; at a "pull" it is drawn in to touch; at the "push" it rolls back
  if (cur >= 0 && t >= tP - .8) { const [t0, y, sd, fl, r] = seq[cur], prev = cur > 0 ? seq[cur - 1] : [t0 - 1, YB + 200, -1, true, ""];
    const stopX = (q) => q[2] * (BL + GP + H + 70), touchX = (q) => q[2] * (BL + H + 2);
    const u = eio(clamp((t - t0 + .6) / .6)), px = lerp(prev[4] === "push" ? stopX(prev) + prev[2] * 120 : touchX(prev), stopX(seq[cur]), u), py = lerp(prev[1], y, u) + (prev[1] === y && prev[2] !== sd ? 110 * Math.sin(Math.PI * u) : 0);
    let x = px, rollb = 0; if (r === "pull" && t >= t0) x = lerp(stopX(seq[cur]), touchX(seq[cur]), ei(clamp((t - t0) / .3))); if (r === "push" && t >= t0) { rollb = 120 * eo(clamp((t - t0 - .1) / .8)); x = stopX(seq[cur]) + sd * rollb; }
    const tsx = r === "turn" ? Math.max(.03, Math.abs(Math.cos(Math.PI * clamp((t - t0) / .9)))) : 1;
    s += `<g transform="translate(${n2(x)} ${n2(py)}) scale(${n2(tsx)} 1)">` + barOnPencils(t, 0, 0, K, { flip: r === "turn" ? (t - t0 < .45 ? true : false) : seq[cur][3], glint: false, roll: x - px }) + `</g>`;
    if (r === "turn" && t < t0 + 1.4) s += OP(1 - ramp(t, t0 + 1.1, .3), `<path d="M${x - 130} ${py - 80} Q${x} ${py - 170} ${x + 130} ${py - 80}" fill="none" stroke="${P.ink}" stroke-width="10" stroke-linecap="round"/><path d="M${x + 102} ${py - 112} L${x + 132} ${py - 78} L${x + 88} ${py - 70}" fill="none" stroke="${P.ink}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>` + TF(x, py - 190, 1, tpill(0, 0, "turned round", 30, "#fff", P.ink, { w: 700 })));
    if (r === "pull" && t >= t0 - .3 && t < t0 + .9) s += ppArrows(t, sd * (BL + 2), y, "pull", ramp(t, t0 - .3, .2) * (1 - ramp(t, t0 + .6, .3)), { gap: 6, len: 30, w: 12 });
    if (r === "push" && t >= t0) { const gx = sd * (BL + (GP + rollb) / 2 + 6); s += ppArrows(t, gx, y, "push", ramp(t, t0, .3), { gap: 10 + rollb * .3, len: 34, w: 14 }) + chevrons(t, sd * (BL + 20), y - 60, sd * (BL + 140), y - 60, 1, PUSHC, 2, .8)
      + TF(sd * (BL + 150), y + 110, spring(t, t0 + .3, .45), tpill(0, 0, "pushed away!", 36, PUSHC, "#fff", { w: 700 })); } }
  if (t >= tP + 6.4 && t < tT) s += TF(0, YB + 150, spring(t, tP + 6.4, .45), tpill(0, 0, "both are attracted", 38, PULLC, "#fff", { w: 700 }));
  if (t >= tN + .4) s += TF(470, YA, spring(t, tN + .4, .45), tpill(0, 0, "bar A only ever pulls", 32, "#fff", P.ink, { w: 700 }));
  if (t >= tM) s += TF(0, YB + 150, spring(t, tM, .5), `<g filter="url(#dropS)"><rect x="-190" y="-40" width="380" height="80" rx="40" fill="${GOODC}"/></g>` + TF(-140, 0, 1, tickBadge(26)) + T(30, 14, "B: a MAGNET", 38, "#fff"))
    + TF(-560, YA + 74, spring(t, tM + .4, .45), tpill(0, 0, "not a magnet", 28, WEAKC, "#fff", { w: 700 }));
  if (t >= tNo) s += TF(560, -300, spring(t, tNo, .45), `<g filter="url(#dropS)"><rect x="-200" y="-44" width="400" height="88" rx="10" fill="#FFFDF4" stroke="#C9B48A" stroke-width="4"/></g>` + T(0, -6, "Is it a magnet?", 30, P.ink) + T(0, 30, "Test: does it repel?", 30, PUSHC) + wbMag(0, -44, "#9B6BFF", 16));
  return s; }

// Pip's homework (the Showdown): My magnet test, drawn to match what Pip SAYS; o.lit [3], o.strike, o.fix (the green rewrite), o.q (the ? by the nail)
const HW20 = ["1  A North pole attracted a South pole.", "2  Two South poles pushed apart.", "3  My magnet attracted the iron nail, so the nail is a magnet."];
const pipSheet = (t, o = {}) => { const lit = o.lit || [0, 0, 0], st = o.strike || 0, fx = o.fix || 0, Y = [-180, -30, 120];
  let s = T(-40, -270, "My magnet test", 48, P.pip) + T(250, -270, "Pip", 30, "#8A949E");
  HW20.forEach((txt, i) => { const y = Y[i], ls = wrap(txt, 33, 420, 600), g = lit[i];
    s += (g > .02 ? `<rect x="-340" y="${y - 40}" width="680" height="${ls.length * 42 + 36}" rx="12" fill="${P.sun}" opacity="${n2(.45 * g)}"/>` : "") + `<path d="M-330 ${y + ls.length * 42 - 4} H330" stroke="#B9C4D0" stroke-width="3"/>`
      + ls.map((l, j) => `<text x="-330" y="${y + j * 42}" font-family="Fredoka" font-weight="600" font-size="33" fill="${P.ink}">${esc(l)}</text>`).join(""); });
  s += TF(215, Y[0] + 18, .22, bar20(t, { glint: false, flip: true })) + TF(282, Y[0] + 18, .22, bar20(t, { glint: false, flip: true })) + ppArrows(t, 248, Y[0] - 15, "pull", 1, { gap: 4, len: 14, w: 6 })
    + TF(200, Y[1] + 18, .22, bar20(t, { glint: false })) + TF(292, Y[1] + 18, .22, bar20(t, { glint: false, flip: true })) + ppArrows(t, 246, Y[1] - 15, "push", 1, { gap: 6, len: 14, w: 6 })
    + TF(200, Y[2] + 70, .26, bar20(t, { glint: false })) + TF(260, Y[2] + 70, .3, nail20(1, 0));
  if (st > .01) s += [0, 1, 2].map((j) => `<path d="M-330 ${Y[2] - 12 + j * 42} L${n2(-330 + (j < 2 ? 440 : 300) * st)} ${Y[2] - 12 + j * 42}" stroke="${WEAKC}" stroke-width="7" stroke-linecap="round"/>`).join("");
  if (fx > .01) { const ls = wrap("My magnet attracted the iron nail. That does not prove that it is a magnet.", 31, 650, 600); s += OP(fx, `<rect x="-344" y="${Y[2] + 118}" width="688" height="${ls.length * 40 + 20}" rx="12" fill="#E2F6E6"/>` + ls.map((l, j) => `<text x="-330" y="${Y[2] + 148 + j * 40}" font-family="Fredoka" font-weight="600" font-size="31" fill="#1F8A4C">${esc(l)}</text>`).join("")); }
  if (o.q) s += TF(300, Y[2] - 20, o.q, `<g filter="url(#dropS)"><circle r="40" fill="url(#gSun)"/></g>${T(0, 21, "?", 62, P.ink)}`);
  return smallEasel(s, 720, 700); };
// the chant's board: WHICH POLES FACE? (complete); each line flashes its part: line 1 the two green boxes, line 2 the two magenta boxes,
// line 3 bar B pushing the magnet away (a small picture under the card)
const chantBoard20 = (t, f) => { let s = fridgeCard20(t, [-230, -420, 230, 75], { all: true, id: "ch" });
  const box = (i) => [-230 + ((i % 2 ? 210 : 14)) * 1.15, -420 + (74 + (i < 2 ? 0 : 132)) * 1.15];
  [[0, 1, 0, PULLC], [2, 3, 1, PUSHC]].forEach(([a, b, k, c]) => { if (f[k] > .05) [a, b].forEach((i) => { const [x, y] = box(i); s += `<rect x="${n2(x - 6)}" y="${n2(y - 6)}" width="${n2(176 * 1.15 + 12)}" height="${n2(118 * 1.15 + 12)}" rx="14" fill="none" stroke="${c}" stroke-width="${n2(4 + 10 * f[k])}" opacity="${n2(f[k])}"/>`; }); });
  s += `<rect x="-230" y="110" width="460" height="170" rx="20" fill="#FFF8EA" stroke="${P.ink}" stroke-width="${n2(3 + 9 * f[2])}"/>` + TF(-60, 200, .5, greyBar("B")) + barOnPencils(t, 140 + 20 * f[2], 190, .36, { glint: false }) + ppArrows(t, 50 + 10 * f[2], 190, "push", 1, { gap: 8, len: 20, w: 9 });
  return s; };
// the fun fact (the lizard): tiny hairs on a toe pad, walking upside down on a ceiling, no glue and no magnet
const ffToe20 = (t, w, h) => { let s = `<rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" fill="#F3E9DC"/>` + TF(-60, 70, .9, `<g transform="rotate(-20)">${lizard20(t, {})}</g>`, 0);
  s += `<clipPath id="ffToeC"><circle cx="40" cy="-40" r="96"/></clipPath><circle cx="40" cy="-40" r="96" fill="#FFF1E6"/><g clip-path="url(#ffToeC)">` + [...Array(9)].map((_, r) => [...Array(12)].map((_, c) => `<path d="M${-50 + c * 16} ${-110 + r * 16} q4 -8 8 0" stroke="#A98A78" stroke-width="3" fill="none"/>`).join("")).join("") + `</g><circle cx="40" cy="-40" r="96" fill="none" stroke="${P.ink}" stroke-width="9"/><path d="M-30 30 L-60 70" stroke="${P.ink}" stroke-width="5"/>`;
  return s; };
const ffCeil20 = (t, w, h) => `<rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" fill="#FBEBD2"/><rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="70" fill="#F7F2EA"/><path d="M${-w / 2} ${-h / 2 + 70} H${w / 2}" stroke="#E2D6C2" stroke-width="5"/>` + lizardAt(t, 20 * Math.sin(t * .8), -h / 2 + 50, .42, 90, { flick: true }) + `<path d="M-40 60 Q0 20 40 60" fill="none" stroke="${P.ink}" stroke-width="5" stroke-dasharray="8 8"/>` + T(0, 110, "upside down!", 28, P.ink);
const ffNo20 = (t, w, h) => { const x = (cx, cy) => `<path d="M${cx - 70} ${cy - 70} L${cx + 70} ${cy + 70} M${cx + 70} ${cy - 70} L${cx - 70} ${cy + 70}" stroke="#D6402E" stroke-width="14" stroke-linecap="round"/>`;
  return `<rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" fill="#FFF8EA"/>` + TF(-60, -50, .9, `<rect x="-30" y="-70" width="60" height="120" rx="12" fill="#F2F2F2" stroke="#8A949E" stroke-width="5"/><rect x="-14" y="-96" width="28" height="30" rx="6" fill="#E8B04A"/><rect x="-30" y="-20" width="60" height="30" fill="#5B9FD0"/>`) + x(-60, -50)
    + TF(60, 80, .32, bar20(t, { glint: false })) + x(60, 80); };
// the dare's two card pictures: three small magnets hanging on strings: pointing three different ways / all pointing the same way
const hangMag = (x, y, a, t) => `<path d="M${x} ${y - 70} V${y - 8}" stroke="${P.ink}" stroke-width="3"/><g transform="translate(${x} ${y}) scale(${n2(Math.max(.06, Math.abs(Math.cos(a * Math.PI / 180))))} 1)">${TF(0, 0, .3, bar20(t, { glint: false, flip: Math.cos(a * Math.PI / 180) < 0 }))}</g>`;
const darePic20 = (i, t) => `<rect x="-200" y="-140" width="400" height="280" fill="${i ? "#E6F6E8" : "#FFF0D6"}"/><path d="M-170 -90 H170" stroke="#8A5A30" stroke-width="10" stroke-linecap="round"/>`
  + [-110, 0, 110].map((x, j) => hangMag(x, 0, i ? 0 : [0, 70, 150][j], t)).join("") + (i ? "" : T(0, 100, "?", 40, "#8A949E"));
// a bar magnet hanging level from a string (the dare): spin = its turn about the string (degrees); origin = where the string is tied above
const hangingMagnet = (t, spin, k = 1) => TF(0, 0, k, `<path d="M0 0 V200" stroke="${P.ink}" stroke-width="4"/><path d="M-10 236 q10 -16 20 0" stroke="${P.ink}" stroke-width="5" fill="none"/>` + `<g transform="translate(0 240) scale(${n2(Math.max(.05, Math.abs(Math.cos(spin * Math.PI / 180))))} 1)">${bar20(t, { glint: false, flip: Math.cos(spin * Math.PI / 180) < 0 })}</g>`);
