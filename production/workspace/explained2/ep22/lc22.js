// lc22.js: EP22's look-closers, journeys and pictures (Stage 2, drawn 2026-11-24). Every look-closer art(t) is centred on (0, 0) inside
// +-830 x +-395 (closer.js): the thing FILLS the panel, each named part has its own big label joined by a line, the lower corners are kept
// for the peeking faces (|x| > 415 and y > 175 stay clear) and the bottom 80 px for the verdict. Every beat is drawn AT its mark (the sound
// keys on it). Nothing that goes away stays as a ghost: the magnet put away fades out COMPLETELY into its box (the box stays).
// Part 1: lcNailArt (was it a magnet already? MAGNETISED), lcThingsArt (what can be magnetised? MAGNETIC OBJECT), nailJourney (be the iron
// nail). Part 2: lcWayArt (lift up and away: SAME DIRECTION), lcMoreArt (more strokes: STRONGER MAGNET), clipJourney (be a steel paper clip).
// Then the pictures: the rings' pictures, the card pictures, the recap, the fun facts, the pictures under the Mark Sentences, the chant board.

// the magnifier circle (a close look at (px, py) drawn by inner(), shown at (x, y) radius r), joined by a line (EP20's magni20)
const magni22 = (t, t0, x, y, r, px, py, inner, lab, t1) => { if (t < t0) return ""; const a = t1 === undefined ? 1 : 1 - ramp(t, t1, .3); if (a <= .01) return ""; const k = spring(t, t0, .45), id = "mg" + Math.round(x) + Math.round(y);
  return OP(a, pline(px, py, x, y + r * .7 * Math.sign(py - y || 1), ramp(t, t0, .25), P.ink) + TF(x, y, k, `<clipPath id="${id}"><circle r="${r}"/></clipPath><circle r="${r}" fill="#F7FAFD"/><g clip-path="url(#${id})">${inner}</g><circle r="${r}" fill="none" stroke="${P.ink}" stroke-width="12"/><circle r="${r}" fill="none" stroke="#fff" stroke-width="4" opacity=".8"/>`)
    + (lab ? TF(x, y + r + 40, spring(t, t0 + .2, .4), tpill(0, 0, lab, 34, "#fff", P.ink, { w: 700 })) : "")); };
// the table top as the look-closer's background (warm wood, grain, a soft spotlight on the tray)
const woodPanel = (spot = [0, 180]) => `<rect x="-900" y="-460" width="1800" height="920" fill="#E2B378"/>` + [...Array(14)].map((_, i) => `<path d="M-900 ${-430 + i * 66} Q0 ${-420 + i * 66 + 18 * Math.sin(i)} 900 ${-430 + i * 66}" stroke="#C99158" stroke-width="3" fill="none" opacity=".55"/>`).join("")
  + `<ellipse cx="${spot[0]}" cy="${spot[1]}" rx="700" ry="300" fill="url(#spot22)"/>`;
// a hanging rig (a wooden rail across the top with strings): the things tied by their top ends hang straight down
const rail22 = (x0, x1, y) => `<rect x="${x0}" y="${y - 12}" width="${x1 - x0}" height="24" rx="10" fill="#B47E42" stroke="#7A5230" stroke-width="5"/><path d="M${x0 + 20} ${y - 4} H${x1 - 20}" stroke="#D9A86A" stroke-width="5"/>`;
// one stroke DOWN a hanging thing (top (x, y0) to tip (x, y1)), p in 0..1: the red end slides down its right side, then lifts away to the
// right in a curve, back up to the top. Returns the red end's point and the bar's angle (the bar trails up and to the right)
const strokeV = (p, x, y0, y1, H, sl = .55) => { if (p < sl) { const u = eio(p / sl); return { x, y: lerp(y0, y1, u), rot: -28 }; }
  const u = eio((p - sl) / (1 - sl)); return { x: x + H * Math.sin(Math.PI * u), y: lerp(y1, y0, u), rot: lerp(-28, 20, Math.sin(Math.PI * u)) }; };
// the stroke counter: a small pill "stroke n" / "n strokes"
const counter22 = (x, y, txt, k = 1, col = "#fff", ink = P.ink) => TF(x, y, k, tpill(0, 0, txt, 34, col, ink, { w: 700 }));

/* ================================================================ Part 1 ================================================================ */
// [LOOK CLOSER] was it a magnet already? (P1 lcnail). The table top; a big tray of steel clips across the middle; A NEW NAIL from the paper bag
// held by its head over the clips (new): nothing moves, a long still hold, the magnifier shows the gap (still); Basil's magnet comes close and
// the new nail clicks onto its red end (pull: a magnetic material); taken off, held over the clips again: still nothing (notmag: but not a
// magnet); the magnet goes into its box at the far end of the table, the lid shuts (boxed: gone from the shot, the box stays); Pip's stroked
// nail comes down over the tray: the clips JUMP and cling to its tip (pipjump: clips!); MAGNETISED (kw); the two nails look the same
function lcNailArt(t) { const m = MKS, tN = m("new"), tS = m("still"), tP = m("pull"), tNm = m("notmag"), tB = m("boxed"), tJ = m("pipjump"), tK = m("kw_magnetised");
  let s = woodPanel([0, 160]);
  const TY = 230, TK = 1.9;   // the big tray of clips
  s += trayClips22(t, 0, TY, TK, { n: 30 });
  // the magnet's box at the far end of the table (top right, smaller: further away). The lid shuts at boxed + .3
  const lid = t < tB ? 0 : eo(clamp((t - tB - .15) / .3));
  s += magBox22(t, 600, -250, .55, { lid, mag: t >= tB - .05 && lid < .95 });
  // the new nail: out of the bag (new), over the clips; shifts left when Pip's nail comes (pipjump - 1.2)
  s += paperBag22(-620, -40, .9);
  const outU = eio(clamp((t - tN + .2) / .9)), shift = eio(clamp((t - tJ + 1.4) / .9)), nx = lerp(-610, lerp(40, -330, shift), outU), ny = lerp(-200, lerp(-40, -170, shift), outU) + 3 * Math.sin(t * 1.6);
  // the pull: the magnet comes in from the right (tP - 1 .. tP), the new nail's tip clicks onto its red end (tP + .3), held there to tNm,
  // then pulled off; the magnet slides away up to its box (tNm + .6 .. tB) and drops in
  const mIn = eio(clamp((t - tP + 1.1) / 1)), mOff = eio(clamp((t - tNm + .2) / .5)), click = t >= tP + .25 && t < tNm - .1 ? 1 : (t >= tP && t < tP + .25 ? (t - tP) / .25 : t >= tNm - .1 && t < tNm + .2 ? 1 - (t - tNm + .1) / .3 : 0);
  const NK = 1.15, tipX = nx + 150 * NK, tipY = ny;
  const nailA = 0;
  s += magni22(t, tS, -400, -270, 110, tipX - 30, tipY + 90, `<rect x="-200" y="20" width="400" height="200" fill="#C8D0D6"/>` + clip21(-30, 70, 20, 1.6) + clip21(60, 92, -30, 1.6) + nail21(-140, -40, 1.6), "no clips", tP - .9);
  s += nail21(nx, ny, NK, nailA) + TF(nx - 137 * NK, ny, NK, hand21(), nailA);
  if (t >= tN && t < tJ + 6) s += lcLab(t, tN + .4, nx - 20, ny - 110, "a new nail: not stroked", nx, ny - 20, { size: 34, t1: tK + 3.9 });
  if (t > tP - 1.2 && t < tB + .1) { const ux = eio(clamp((t - tB + 1.6) / 1.4)), rx = lerp(980, tipX + 44, mIn) - 40 * click + 260 * mOff, mx = lerp(rx, 525, ux), my = lerp(tipY, -300, ux), mk = lerp(1, .5, ux);
    s += TF(mx + 150 * mk, my, mk, bar20(t, { glint: false }), 0); }
  s += linkChip(t, tP + .4, 260, -230, tipX + 30, tipY - 20, GOODC, "a magnetic material: attracted to a magnet", 32, tNm - .2)
    + linkChip(t, tNm + .3, nx + 80, ny - 150, nx + 60, ny - 14, WEAKC, "but not a magnet", 36, tJ - 1.6)
    + linkChip(t, tB + .4, 330, -330, 560, -280, P.ink, "the magnet is away", 30, tK - .3);
  // Pip's stroked nail comes down over the right half of the tray (tJ - 1.2 .. tJ): the clips jump and cling to its tip
  if (t >= tJ - 1.3) { const u = eio(clamp((t - tJ + 1.3) / 1.2)), px = 70, py = lerp(-420, -10, u), ptx = px + 150 * NK;
    s += nail21(px, py, NK) + TF(px - 137 * NK, py, NK, `<g>${hand21().replace("#8B5CF6", "#B9A6FF").replace("#5B3AB0", "#8B5CF6")}</g>`)
      + clipBunch(t, ptx, py, 8, { k: 1.25, t0: tJ, from: [ptx, TY - 60] })
      + lcLab(t, tJ - .6, px + 40, py - 120, "Pip's nail: stroked", px + 20, py - 20, { size: 36, fill: "#B9A6FF", t1: tK + 1.9 })
      + magni22(t, tJ + .6, 560, -60, 130, ptx + 20, py + 80, `<rect x="-200" y="-200" width="400" height="400" fill="#E8EEF2"/>` + nail21(-170, -90, 1.5) + clipBunch(t, 55, -90, 6, { k: 1.6 }), "clips!", tK + 3.6);
    // magnetised: a small gold tag on Pip's nail; they look the same (the same grey)
    s += linkChip(t, tK + 2.2, ptx + 60, py - 150, ptx - 40, py - 12, MAGC, "magnetised", 36) + linkChip(t, tK + 4.2, -120, -330, nx + 40, ny - 14, "#fff", "the same grey: only the clips show it", 30, undefined, P.ink); }
  return s; }

// [LOOK CLOSER] what can be magnetised? (P1 lcthings): the four things hang from a wooden rail by their top ends, one column each, their
// names big at the top; a long tray of steel clips below. check: each lowered over the clips in turn: nothing. stroke: the magnet's red end
// strokes each one from the top to the tip, lifting away, the same way, the same number of times. away2: into the box. test: lowered again:
// copper x, foil x, chopstick x; the steel screwdriver: the clips jump up and cling. steel: iron and steel: magnetic materials
const THX = [-360, -120, 120, 360], THN = ["copper wire", "aluminium foil", "wooden chopstick", "steel screwdriver"];
const thingArt = (i, x, y, k) => [copper22, foil22, chopstick22, screwdriver22][i](x, y, k, 90);
function lcThingsArt(t) { const m = MKS, tT = m("things"), tC = m("check"), tS = m("stroke"), tA = m("away2"), tE = m("test"), tSt = m("steel"), tK = m("kw_magnetic_object");
  let s = woodPanel([0, 200]) + rail22(-640, 760, -250);
  s += trayClips22(t, 0, 185, 2.1, { n: 34 });
  s += magBox22(t, 690, -300, .42, { lid: t < tA ? 0 : eo(clamp((t - tA - .15) / .3)), mag: t >= tA - .05 });
  THX.forEach((x, i) => { const ap = tT + i * .25; if (t < ap) return; const k = spring(t, ap, .45);
    // lowered: in `check` (each in turn, .6 s apart, down and up) and in `test` (all four go down and stay)
    const ck = tC + i * .6, dn = (t >= ck && t < ck + .55 ? Math.sin(Math.PI * (t - ck) / .55) : 0) + (t >= tE ? eio(clamp((t - tE) / .4)) : 0), y = -70 + 60 * Math.min(1, dn);
    const L = 300, top = y - L / 2 * .95, tip = y + L / 2 * .95;
    s += `<path d="M${x} -250 V${n2(top - 6)}" stroke="${P.ink}" stroke-width="3"/>` + TF(x, 0, k, thingArt(i, 0, y, .95));
    s += pline(x, -290 + (i % 2) * 40 + 20, x, -262, k) + TF(x, -310 + (i % 2) * 40, k, tpill(0, 0, THN[i], 30, "#fff", P.ink, { w: 700 }));
    if (t >= ck + .3 && t < tS) s += TF(x, 150, spring(t, ck + .3, .4), tpill(0, 0, "no clips", 24, "#E4E8EC", "#5A6070", { w: 700 }));
    if (t >= tE + .5) s += i < 3 ? TF(x, tip + 60, spring(t, tE + .5 + i * .2, .4), `<g filter="url(#dropS)"><circle r="30" fill="#fff" stroke="#D84A3A" stroke-width="4"/></g><path d="M-12 -12 L12 12 M12 -12 L-12 12" stroke="#D84A3A" stroke-width="7" stroke-linecap="round"/>`) : TF(x - 80, tip - 30, spring(t, tE + 1.1, .4), tickBadge(32));
    if (i === 3 && t >= tE + .3) s += clipBunch(t, x, tip + 6, 7, { k: 1.05, t0: tE + .35, from: [x, 200] }); });
  // the strokes: the magnet's red end runs down each column from the top to the tip, then lifts away (one stroke each, the same way)
  if (t >= tS - .2 && t < tA) { const i = Math.min(3, Math.floor((t - tS) / .62)), p = clamp(((t - tS) - i * .62) / .62), x = THX[Math.max(0, i)];
    const sv = strokeV(p, x + 16, -200, 80, 170); s += magAt(t, sv.x, sv.y, .65, sv.rot, {});
    s += TF(0, 300, spring(t, tS, .4), tpill(0, 0, "the same number of strokes", 36, STROKEC, "#fff", { w: 700 })); }
  if (t >= tS) THX.forEach((x, i) => { if (t >= tS + i * .62 + .3) s += `<path d="M${x - 46} -200 V-40" stroke="${STROKEC}" stroke-width="8" stroke-linecap="round" opacity=".85"/><path d="M${x - 58} -56 L${x - 46} -36 L${x - 34} -56" stroke="${STROKEC}" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity=".85"/>`; });
  s += linkChip(t, tA + .3, 520, -170, 680, -320, P.ink, "the magnet is away", 30, tK - .3);
  if (t >= tE + .9) s += magni22(t, tE + 1.0, 690, -60, 110, THX[3] + 10, 130, `<rect x="-200" y="-200" width="400" height="400" fill="#E8EEF2"/>` + screwdriver22(20, -120, 1.5, 90) + clipBunch(t, 20, 120, 4, { k: 1.6 }), "clips!", tK - .3);
  if (t >= tSt) s += linkChip(t, tSt + .2, 150, -150, THX[3] - 20, -40, P.ink, "steel: a magnetic material", 32, tK - .2);
  if (t >= tK + .2) { const k = ramp(t, tK + .2, .4) * (1 - ramp(t, tK + 2.6, .3)); s += pline(0, -250, THX[3] - 20, -80, k, P.sun); }
  if (t >= tK + 2.8) s += TF(-160, 30, spring(t, tK + 2.8, .45), `<g filter="url(#dropS)"><rect x="-150" y="-60" width="300" height="120" rx="24" fill="#FFF8EA" stroke="${P.sun}" stroke-width="6"/></g>` + nail21(0, -6, .7) + clipBunch(t, 105, -6, 3, { k: .7 }) + T(0, 46, "Pip's iron nail", 24, P.ink));
  return s; }

// BE THE IRON NAIL (P1 shrink): first person, the camera IS the nail: your long grey body stretches away along the table to your sharp tip
// far ahead (the vanishing point), your flat head just under the frame. The giant magnet (its red North half, held at its other end by a
// giant ADULT's hand) comes down onto your head (jhead), slides all the way along you to your tip (jslide, jtip), lifts up and away in a big
// curve back over you (jlift) and down on your head again (jback); again and again (jagain); the hand puts the magnet away (it fades out
// completely) and carries you low over the tray (jcarry); the clips shiver and JUMP, clinging to your tip (jclips)
function nailJourney(t, s) { const m = MK, tSt = m("jstroke"), tH = m("jhead"), tSl = m("jslide"), tTp = m("jtip"), tL = m("jlift"), tB = m("jback"), tAg = m("jagain"), tC = m("jcarry"), tJ = m("jclips");
  const car = eio(clamp((t - tC - .8) / 2)), V = [960, lerp(470, 430, car)], Y0 = 640, depth = (z) => [V[0], V[1] + Y0 / z];
  let o = `<rect width="1920" height="1080" fill="#BFE0F6"/>`;
  // beyond the table, far off and soft: the shop front and the square seen from down here (blurred shapes)
  o += `<g filter="url(#b4)" opacity=".9"><rect x="-20" y="${n2(V[1] - 300)}" width="900" height="300" fill="#9ED86E"/><rect x="160" y="${n2(V[1] - 520)}" width="70" height="260" fill="#6E5644"/><circle cx="200" cy="${n2(V[1] - 560)}" r="240" fill="#6CBF52"/><rect x="1060" y="${n2(V[1] - 460)}" width="900" height="460" fill="#EFE4D2"/><rect x="1200" y="${n2(V[1] - 420)}" width="560" height="70" fill="#2F5FA8"/><rect x="1460" y="${n2(V[1] - 330)}" width="180" height="330" fill="#5E4C3E"/></g>`;
  // the table top: a wide brown field of wood grain running to the vanishing point
  o += `<path d="M-200 ${n2(V[1])} H2120 V1200 H-200z" fill="#D8A465"/>` + [...Array(13)].map((_, i) => `<path d="M${n2(V[0] + (i - 6) * 30)} ${n2(V[1])} L${n2(V[0] + (i - 6) * 520)} 1200" stroke="#B47E42" stroke-width="${2 + Math.abs(i - 6) * .5}" opacity=".6"/>`).join("")
    + [1.4, 2, 3, 5, 8].map((z) => `<path d="M-200 ${n2(V[1] + Y0 / z * 1.2)} H2120" stroke="#C99158" stroke-width="2" opacity=".35"/>`).join("");
  // the tray of steel clips: far off to the right, a range of silver loops; it comes under your tip as the hand carries you (jcarry)
  { const tz = lerp(9, 3.2, car), tx = lerp(1450, 960, car), ty = V[1] + Y0 / tz * .8, tk = lerp(.55, 2.1, car);
    o += trayClips22(t, tx, ty + 40 * tk, tk, { n: t >= tJ ? 16 : 26 }); }
  // dust motes in the light
  o += [...Array(12)].map((_, i) => { const u = ((t * .05 + hash(i, 3)) % 1); return `<circle cx="${n2(200 + 1500 * hash(i, 5) + 40 * Math.sin(t + i))}" cy="${n2(120 + 300 * u)}" r="${n2(2 + 3 * hash(i, 7))}" fill="#fff" opacity=".6"/>`; }).join("");
  // YOU: your long grey body from your head (under the frame) to your sharp tip at the vanishing point; a gold streak where the magnet slid
  const hw = (z) => 170 / z, P1 = depth(1.15), P2 = depth(11), carryTilt = 0;
  o += `<path d="M${n2(V[0] - hw(1.15))} 1100 L${n2(P2[0] - hw(11))} ${n2(P2[1])} L${n2(V[0])} ${n2(P2[1] - 6)} L${n2(P2[0] + hw(11))} ${n2(P2[1])} L${n2(V[0] + hw(1.15))} 1100z" fill="#8E979F" stroke="#454C54" stroke-width="5"/>`
    + `<path d="M${n2(V[0] - hw(1.15) * .45)} 1100 L${n2(V[0] - hw(11) * .4)} ${n2(P2[1])}" stroke="#D8DEE3" stroke-width="16" opacity=".8"/><path d="M${n2(V[0] + hw(1.15) * .6)} 1100 L${n2(V[0] + hw(11) * .55)} ${n2(P2[1])}" stroke="#6A727A" stroke-width="10" opacity=".7"/>`;
  // where is the magnet? z = its distance along you (1.2 = your head, 11 = your tip); h = how high above you (0 = touching)
  let mz = null, mh = 0, mA = 1, mx = 0;
  const strokeTimes = [[tH, tTp - tH + .1, tL, tB], ...[0, 1, 2].map((i) => [tAg + i * 1.2 - .05, .5, tAg + i * 1.2 + .55, tAg + i * 1.2 + 1.15])];
  if (t >= tSt - .2 && t < tH) { mz = 1.2; mh = lerp(1400, 0, eio(clamp((t - tSt + .2) / (tH - tSt + .2)))); }
  for (const [a, dSl, lA, lB] of strokeTimes) { if (t >= a && t < lB) { if (t < a + dSl) { mz = lerp(1.2, 11, eio((t - a) / dSl)); mh = 0; } else if (t < lA) { mz = 11; mh = 0; } else { const u = eio((t - lA) / (lB - lA)); mz = lerp(11, 1.2, u); mh = 2200 * Math.pow(Math.sin(Math.PI * u), .7); mx = 700 * Math.sin(Math.PI * u); } } }
  if (t >= tB && t < tAg - .05) { mz = 1.2; mh = 0; }
  if (t >= tAg + 3.5 && t < tC + .8) { const u = eio(clamp((t - tAg - 3.5) / (tC + .8 - tAg - 3.5))); mz = 1.2; mh = lerp(0, 1800, u); mA = 1 - clamp((t - tC) / .7); }
  // the gold streak along you (where the magnet slid), and the dotted gold arc of the lift
  if (t >= tSl && t < tC + .6) { const zz = mz !== null && mh === 0 && t < tTp ? mz : 11, a = depth(1.25), b = depth(zz); o += OP(1 - clamp((t - tC) / .6), `<path d="M${n2(a[0])} ${n2(a[1])} L${n2(b[0])} ${n2(b[1])}" stroke="#FFD76A" stroke-width="${n2(28)}" stroke-linecap="round" opacity=".55"/><path d="M${n2(a[0])} ${n2(a[1])} L${n2(b[0])} ${n2(b[1])}" stroke="#FFF3B0" stroke-width="8" stroke-linecap="round"/>`); }
  if (t >= tL && t < tC + .6) { let d = ""; for (let i = 0; i <= 24; i++) { const u = i / 24, z = lerp(11, 1.2, eio(u)), h = 2200 * Math.pow(Math.sin(Math.PI * u), .7), p = depth(z); d += (i ? "L" : "M") + n2(p[0] + 700 * Math.sin(Math.PI * u)) + " " + n2(p[1] - h / z - 300 / z); } o += OP(.9 * (1 - clamp((t - tC) / .6)), `<path d="${d}" stroke="${LIFTC}" stroke-width="12" stroke-dasharray="22 18" fill="none" stroke-linecap="round"/>`); }
  // the magnet: the red North half (white N) resting on you, the blue half above it, the giant hand at the top
  if (mz !== null && mA > .01) { const p0 = depth(mz), p = [p0[0] + mx, p0[1]], sc = 1 / mz, w = 1250 * sc, H = 1000 * sc, by = p[1] - 24 * sc - mh * sc, lean = mh === 0 && t >= tSl ? -6 : 0;
    o += OP(mA, `<g transform="translate(${n2(p[0])} ${n2(by)}) rotate(${lean})"><ellipse cx="0" cy="${n2(24 * sc + mh * sc)}" rx="${n2(w * .6)}" ry="${n2(40 * sc)}" fill="${P.ink}" opacity="${n2(.25 * (1 - Math.min(1, mh / 1200)))}"/>`
      + `<rect x="${n2(-w / 2)}" y="${n2(-H)}" width="${n2(w)}" height="${n2(H)}" rx="${n2(30 * sc)}" fill="${NORTHC}" stroke="#9A2A1E" stroke-width="${n2(12 * sc)}"/><rect x="${n2(-w / 2)}" y="${n2(-2 * H)}" width="${n2(w)}" height="${n2(H)}" rx="${n2(30 * sc)}" fill="${SOUTHC}" stroke="#1E3E8A" stroke-width="${n2(12 * sc)}"/>`
      + `<rect x="${n2(-w / 2 + 30 * sc)}" y="${n2(-H + 30 * sc)}" width="${n2(w * .2)}" height="${n2(H - 60 * sc)}" rx="${n2(12 * sc)}" fill="#fff" opacity=".25"/>` + T(0, n2(-H * .38), "N", n2(260 * sc), "#fff") + T(0, n2(-H * 1.4), "S", n2(260 * sc), "#fff")
      + `<g transform="translate(0 ${n2(-2 * H + 40 * sc)}) scale(${n2(sc * 3.2)})"><g transform="rotate(90)">${hand15({ curl: .5, sleeve: "#8A949E", sleeveD: "#5A6470" })}</g></g></g>`);
    if (mh === 0 && t >= tSl) o += `<g opacity=".7">${motion22(p[0] - w * .6, by - H * .5, 0, sc * 3)}</g>`; }
  // the hand carries you: a giant soft shadow over you, the view rises and drifts towards the tray
  if (t >= tC + .5 && t < tJ + 1) o += `<rect width="1920" height="1080" fill="${P.ink}" opacity="${n2(.12 * clamp((t - tC - .5) / .5) * (1 - clamp((t - tJ) / .8)))}"/>`;
  // the clips shiver, tip up and JUMP to your tip (the vanishing point), one hanging from another
  if (t >= tJ - .6) { const sh = t < tJ ? 3 * Math.sin(t * 60) : 0; o += clipBunch(t, P2[0] + sh, P2[1] + 4, 9, { k: 2.1, t0: tJ, from: [P2[0] + 40, P2[1] + 260] }); }
  // your flat round head, just under the bottom of the frame (its rim), and the jolts
  o += `<path d="M560 1080 Q960 ${n2(1040 + 4 * Math.sin(t * 2))} 1360 1080z" fill="#A7B0B8" stroke="#454C54" stroke-width="6"/>`;
  return JOLT(t, [tH + .02, tB + .02, tAg + 1.15, tAg + 2.35, tJ + .2], o, 14); }

/* ================================================================ Part 2 ================================================================ */
// [LOOK CLOSER] how do you get back to the head? (P2 lcway): the nail FILLS the panel from side to side (head at the left, tip at the
// right), the bar magnet's red end above the head. pole1: in slow motion, the red end touches the head (one pole); slide: it slides along the
// whole nail to the tip (a green arrow grows: head to tip); lift: it lifts up and away in a big curve (a dotted gold arc) and lands on the
// head again (back to the head); never: a grey arrow sliding back is crossed out; again: three more strokes, faster, the green arrows
// stacking, all the same way (1 · 2 · 3 · 4); compare: Basil's way in a small strip (back and forth: undone)
const NWY = { hx: -640, tx: 600, y: 60, k: 4.1 };
function lcWayArt(t) { const m = MKS, tP = m("pole1"), tS = m("slide"), tL = m("lift"), tN = m("never"), tA = m("again"), tC = m("compare"), tK = m("kw_same_direction");
  const { hx, tx, y } = NWY, K = (tx - hx) / 300, cx = (hx + tx) / 2, top = y - 9 * K, nH = cx - 137 * K + 34, nT = cx + 150 * K - 70;
  let s = woodPanel([0, 150]) + nail21(cx, y, K);
  // the magnet's moves: down onto the head (pole1 - 1.2 .. pole1), the slow slide (slide .. lift), the lift (lift .. lift + 2.2: up and
  // away and back down on the head), then three quick strokes (again .. again + 2.4)
  let st = null;
  if (t < tP) st = { x: nH, y: top - 240 * (1 - eio(clamp((t - tP + 1.2) / 1.2))), rot: -100 };
  else if (t < tS) st = { x: nH, y: top, rot: -100 };
  else if (t < tL) st = { x: lerp(nH, nT, eio(clamp((t - tS) / (tL - tS - .1)))), y: top, rot: -118 };
  else if (t < tL + 2.4) { const u = eio(clamp((t - tL) / 2.4)); st = { x: lerp(nT, nH, u), y: top - 420 * Math.sin(Math.PI * u), rot: lerp(-118, -62, Math.sin(Math.PI * u)) }; }
  else if (t < tA) st = { x: nH, y: top, rot: -100 };
  else if (t < tA + 2.4) { const i = Math.floor((t - tA) / .8), p = ((t - tA) - i * .8) / .8, q = strokeAt(p, nH, top, nT, top, 380, .5); st = q; }
  else st = { x: nH, y: top - 300 * eio(clamp((t - tA - 2.4) / .6)), rot: -90, a: 1 - clamp((t - tA - 2.4) / .6) };
  // the dotted gold lift arc, the green stroke arrow along the nail, the stacked arrows (one per stroke), the crossed-out slide back
  if (t >= tS + .2 && t < tA - .3) s += strokeArrow(t, tS + .2, nH + 10, y + 90, nT, y + 90, 16);
  if (t >= tL) s += liftArc(t, tL + .2, nT, top - 30, nH, top - 30, 360, 10);
  if (t >= tN) { const k = ramp(t, tN, .3); s += OP(k, `<path d="M${nT - 40} ${y - 120} H${nH + 120}" stroke="#8A949E" stroke-width="14" stroke-linecap="round"/><path d="M${nH + 150} ${y - 140} L${nH + 116} ${y - 120} L${nH + 150} ${y - 100}" stroke="#8A949E" stroke-width="14" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`)
      + TF((nH + nT) / 2, y - 120, spring(t, tN + .4, .4), `<path d="M-50 -50 L50 50 M50 -50 L-50 50" stroke="#D84A3A" stroke-width="18" stroke-linecap="round"/>`)
      + lcLab(t, tN + .6, (nH + nT) / 2 + 300, y - 230, "never slide back", (nH + nT) / 2 + 60, y - 130, { size: 38, t1: tA - .2 }); }
  if (t >= tA - .3) for (let i = 0; i < 4; i++) { const a = i === 0 ? tA - .3 : tA + (i - 1) * .8 + .45; if (t < a) continue;
    s += strokeArrow(t, a, -380, y + 80 + i * 46, 380, y + 80 + i * 46, 12); }
  if (t >= tA) s += TF(-430, -330, spring(t, tA, .4), tpill(0, 0, "stroke " + [1, 2, 3, 4].slice(0, Math.min(4, 1 + Math.max(0, Math.floor((t - tA + .35) / .8)))).join(" · "), 34, "#fff", P.ink, { w: 700 }));
  if (st && st.a !== 0) s += OP(st.a === undefined ? 1 : st.a, magAt(t, st.x, st.y, 1.05, st.rot, { hl: t >= tP - .2 && t < tS ? "N" : undefined }));
  s += lcLab(t, tP + .3, nH + 360, top - 300, "one pole: the red end", nH + 40, top - 120, { size: 38, fill: NORTHC, ink: "#fff", t1: tS + .2 })
    + lcLab(t, tS + .5, nT - 300, -220, "head to tip", nT - 100, y + 90, { size: 38, fill: STROKEC, ink: "#fff", t1: tL + .2 })
    + lcLab(t, tL + .4, 0, -340, "lift up and away", 0, top - 380, { size: 38, fill: LIFTC, ink: "#fff", t1: tN - .1 })
    + lcLab(t, tL + 2.1, nH + 330, top - 220, "back to the head", nH + 20, top - 40, { size: 36, t1: tN - .1 });
  if (t >= tA + .2) s += t < tA + 1 ? slowTag(t, tA - 3, 560, -350) : "";
  if (t < tA && t >= tS) s += slowTag(t, tS, 600, -350);
  // compare: Basil's way, in a small strip at the top right: back and forth, crossed out
  if (t >= tC) s += TF(520, -250, spring(t, tC, .45), `<g filter="url(#dropS)"><rect x="-230" y="-80" width="460" height="160" rx="22" fill="#FFF8EA" stroke="${P.basil}" stroke-width="6"/></g>` + nail21(0, 20, .9) + backForth(t, tC, 0, -24, 260, tC + .6) + T(0, 66, "back and forth: undone", 26, "#D84A3A"));
  if (t >= tK + .1) { const k = ramp(t, tK + .1, .4) * (1 - ramp(t, tK + 2.5, .3)); s += pline(0, -240, 0, y + 30, k, P.sun); }
  return s; }

// [LOOK CLOSER] more strokes? (P2 lcmore): three new nails, all the same, hang from a wooden rail, a stroke counter above each; the fair
// test's chips (same); the magnet strokes all three (count: speeded up), the counters stop at ten, twenty and thirty; away: into the box;
// dip: each dips into the clips and lifts with a bunch (a few, more, the most: drawn, never counted); bunch: a bar for each, growing
const MRX = [-360, 0, 360], MRN = [10, 20, 30], MRB = [2, 5, 12];
function lcMoreArt(t) { const m = MKS, tSa = m("same"), tC = m("count"), tA = m("away"), tD = m("dip"), tB = m("bunch"), tK = m("kw_stronger_magnet");
  let s = woodPanel([0, 200]) + rail22(-560, 560, -230) + trayClips22(t, 0, 345, 2.2, { n: 30 });
  s += magBox22(t, -690, -280, .42, { lid: t < tA ? 0 : eo(clamp((t - tA - .15) / .3)), mag: t >= tA - .05 });
  if (t >= tSa) s += ["the same nails", "the same magnet", "the same pole", "the same way"].map((w, i) => TF(-450 + i * 300, -360, spring(t, tSa + i * .15, .4), tpill(0, 0, w, 26, "#E4E8EC", "#4A4E5A", { w: 700 }))).join("");
  const cu = clamp((t - tC) / (tA - tC - .3));   // the counters run (speeded up)
  MRX.forEach((x, i) => { const di = tD + i * 1.15, dn = t >= di && t < di + 1.05 ? Math.sin(Math.PI * clamp((t - di) / 1.05)) : 0, yy = -80 + 170 * dn, tip = yy + 150;
    const n = t < tC ? 0 : Math.min(MRN[i], Math.floor(cu * 30 + .001));
    s += `<path d="M${x} -230 V${n2(yy - 150)}" stroke="${P.ink}" stroke-width="3"/>` + nail21(x, yy, 1, 90);
    s += counter22(x, -290, (t < tC ? 0 : n) + " strokes", 1, n >= MRN[i] && t > tC ? "#E6F6E8" : "#fff");
    if (t >= di + .5) s += clipBunch(t, x, tip, MRB[i], { k: 1.1, t0: di + .5, from: [x, 260] }); });
  if (t >= tC && t < tA) { const i = Math.floor((t - tC) * 6) % 3, p = ((t - tC) * 6) % 1, x = MRX[i], sv = strokeV(p, x + 16, -200, 70, 130, .5); s += magAt(t, sv.x, sv.y, .45, sv.rot, {}) + lcClock(t, tC, tA - .1, 0, 330); }
  s += linkChip(t, tA + .3, -420, -140, -650, -300, P.ink, "the magnet is away", 28, tD + 3);
  // the bars: a simple bar for each, growing from left to right, labelled only "more clips"
  if (t >= tB) { const k = spring(t, tB, .45); s += TF(610, -100, k, `<g filter="url(#dropS)"><rect x="-140" y="-170" width="280" height="200" rx="20" fill="#FFF8EA"/></g>` + [0, 1, 2].map((i) => { const h = 40 + i * 55; return `<rect x="${-100 + i * 70}" y="${n2(10 - h)}" width="50" height="${h}" rx="6" fill="${STROKEC}" stroke="${P.ink}" stroke-width="3"/>`; }).join("")
    + `<path d="M-120 14 H120" stroke="${P.ink}" stroke-width="4"/>` + tpill(0, 68, "more clips →", 28, STROKEC, "#fff", { w: 700 })); }
  if (t >= tK + .1) { const k = ramp(t, tK + .1, .4) * (1 - ramp(t, tK + 2.5, .3)); s += pline(0, -250, MRX[2], 40, k, P.sun); }
  return s; }

// BE A STEEL PAPER CLIP (P2 shrink): first person, the camera IS a clip lying in a shining heap of giant clips in the tray, looking up; far
// above, the maker space's ceiling and its fans. jnail1: a giant grey nail tip comes down; jbasil: Basil's nail; jwobble: you wobble and slide
// a tiny way (a faint, short ripple); jstill: you lie still; jgone: it goes up and FADES OUT COMPLETELY; jpip: Pip's nail comes down (a
// stronger gold ripple); jjump: you slide, tip up and JUMP, clinging to its tip; jfriend: a friend clip swings up and clings to you; you rise
const CLIPW = "M60 -10 H-60 A26 26 0 0 0 -60 42 H90 A42 42 0 0 0 90 -42 H-110 A56 56 0 0 0 -110 70 H40";
const bigClip = (x, y, k, a, op = 1) => `<g transform="translate(${n2(x)} ${n2(y)}) rotate(${n2(a)}) scale(${n2(k)})" opacity="${op}"><path d="${CLIPW}" fill="none" stroke="#4E5862" stroke-width="22" stroke-linecap="round" stroke-linejoin="round"/><path d="${CLIPW}" fill="none" stroke="#D3DAE0" stroke-width="13" stroke-linecap="round" stroke-linejoin="round"/><path d="M-50 -16 H60" stroke="#fff" stroke-width="5" opacity=".8"/></g>`;
function clipJourney(t, s) { const m = MK, tT = m("jtray"), tN1 = m("jnail1"), tB = m("jbasil"), tW = m("jwobble"), tS = m("jstill"), tG = m("jgone"), tP = m("jpip"), tJ = m("jjump"), tF = m("jfriend");
  const rise = eio(clamp((t - tJ) / .7)) * 1 + eio(clamp((t - tF - .4) / 1.6)) * .6, wob = t >= tW && t < tS ? 10 * Math.sin((t - tW) * 18) * (1 - (t - tW) / (tS - tW)) : 0, slide = t >= tW ? 20 * eio(clamp((t - tW) / .6)) : 0;
  let o = `<rect width="1920" height="1080" fill="#F4EFE6"/>`;
  // far above: the ceiling and its two fans, turning slowly (it slides down out of view as you rise)
  o += `<g transform="translate(0 ${n2(rise * 160)})"><rect x="-100" y="-100" width="2120" height="420" fill="#FBF8F2"/><path d="M-100 320 H2020" stroke="#DDD2BE" stroke-width="8"/>` + TF(560, 150, .9, fan22(t * .5, 0, 0)) + TF(1400, 120, .7, fan22(t * .5 + 1, 0, 0)) + `<rect x="700" y="20" width="520" height="40" rx="10" fill="#FFFDF0" opacity=".9"/></g>`;
  // below and around: the heap of giant shining clips (it drops away as you rise; the bench and the tray far below after jfriend)
  const hy = rise * 700;
  if (rise > .9) o += OP(clamp((rise - .9) / .6), `<rect x="-100" y="${n2(1080 - (rise - .9) * 500)}" width="2120" height="700" fill="#DDB27A"/>` + trayClips22(t, 960, 1080 - (rise - .9) * 300, .9));
  o += `<g transform="translate(0 ${n2(hy)})"><rect x="-100" y="560" width="2120" height="700" fill="#C8D0D6"/>`;
  for (let i = 0; i < 16; i++) { const x = (i * 197) % 2000 - 40, y = 560 + 50 * (i % 4) + 30 * hash(i, 3), k = .9 + .9 * hash(i, 5), a = 180 * hash(i, 7) - 90; o += bigClip(x, y, k, a); }
  o += `</g>`;
  // the giant nails: Basil's (jnail1 .. jgone, then up and away, fading out completely), Pip's (jpip ..)
  const nailDown = (t0, t1) => t < t0 ? -1 : t < t1 ? eio(clamp((t - t0) / 1.4)) : 1;
  { const d = nailDown(tN1, tG), up = t >= tG ? eio(clamp((t - tG) / 1.2)) : 0, a = 1 - clamp((t - tG - .3) / .8);
    if (d >= 0 && a > .01) o += OP(a, TF(960, lerp(-700, 70, d) - 900 * up, 3.4, nail21(0, 0, 1, 90))); }
  { const d = nailDown(tP, 1e9); if (d >= 0) { const ny = lerp(-700, 70, d) + rise * 240; o += TF(960, ny, 3.4, nail21(0, 0, 1, 90)); } }
  // the ripples: Basil's faint and short; Pip's stronger and gold
  if (t >= tW - .2 && t < tS + .3) for (let i = 0; i < 2; i++) { const u = ((t - tW + i * .4) % .9) / .9; o += `<ellipse cx="960" cy="${n2(640 + slide)}" rx="${n2(120 + 260 * u)}" ry="${n2(40 + 80 * u)}" fill="none" stroke="#C9D0D8" stroke-width="5" opacity="${n2(.5 * (1 - u))}"/>`; }
  if (t >= tP + 1.2 && t < tJ + .2) for (let i = 0; i < 3; i++) { const u = ((t - tP + i * .3) % .9) / .9; o += `<ellipse cx="960" cy="640" rx="${n2(140 + 420 * u)}" ry="${n2(50 + 140 * u)}" fill="none" stroke="#FFD34A" stroke-width="10" opacity="${n2(.8 * (1 - u))}"/>`; }
  // YOU: your own silver wire loops at the bottom of the frame (you tip up on your end as you jump, then hang from the tip)
  { const tip = eio(clamp((t - tJ + .5) / .5)), yy = lerp(1010 + slide * .2, 820, rise > 1 ? 1 : rise) + wob * .3, a = lerp(0, -70, tip), k = lerp(2.4, 2.0, tip);
    o += `<g transform="translate(${n2(960 + wob)} ${n2(yy)}) rotate(${n2(a)})">${bigClip(0, 0, k / 1.3, 0)}</g>`;
    if (t >= tF - .4) { const u = eio(clamp((t - tF + .4) / .6)); o += bigClip(lerp(1300, 1010, u), lerp(1300, 1080 + 40 * Math.sin(t * 2), u), 1.3, lerp(40, -80, u)); } }
  // your tip, clinging: a little gold glow where you touch the nail
  if (t >= tJ) o += `<circle cx="960" cy="${n2(lerp(820, 690, clamp(rise)))}" r="${n2(30 + 6 * Math.sin(t * 8))}" fill="#FFF3B0" opacity=".5"/>`;
  return JOLT(t, [tJ + .35, tF + .2], o, 12); }

/* ================================================================ the pictures ================================================================ */
// Part 1 Round 1's ring picture (lockN obj, drawn round (430, 470)): the nail held by its head over the tray, the strokes shown (a green
// one-way arrow, the dotted gold lift arc)
const ringP1_22 = (t) => `<circle cx="430" cy="470" r="190" fill="#FFF8EA"/>` + trayClips22(t, 430, 600, .7, { n: 18 }) + nail21(440, 440, .78) + TF(440 - 137 * .78, 440, .78, hand21())
  + `<path d="M330 400 H540" stroke="${STROKEC}" stroke-width="10" stroke-linecap="round"/><path d="M520 386 L546 400 L520 414" stroke="${STROKEC}" stroke-width="10" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M550 380 C550 300 330 300 330 380" stroke="${LIFTC}" stroke-width="7" stroke-dasharray="12 10" fill="none" stroke-linecap="round"/>`;
// HOLD ON!'s ring picture: Basil's two things over the tray: the nail in one hand, the magnet in the other, the clips hanging from the MAGNET
const ringHold22 = (t) => `<circle cx="430" cy="470" r="190" fill="#FFF8EA"/>` + trayClips22(t, 430, 630, .85, { n: 16 }) + nail21(360, 410, .7, 0) + TF(360 - 137 * .7, 410, .7, hand21().replace("#8B5CF6", "#14B8A6").replace("#5B3AB0", "#0E7C70"))
  + magAt(t, 530, 470, .45, -90) + TF(530, 470 - 270 * .45 - 30, .45, `<g transform="rotate(90)">${hand21().replace("#8B5CF6", "#14B8A6").replace("#5B3AB0", "#0E7C70")}</g>`) + clipBunch(t, 530, 476, 6, { k: .8 });
// Momo's pick (away): a small card: a bar magnet sliding away from a nail ("the magnet has gone away")
const awayPic = (t, t0) => { const u = eio(clamp((t - t0) / 1.2)); return `<g filter="url(#dropS)"><rect x="-190" y="-110" width="380" height="220" rx="24" fill="#FFF8EA" stroke="${P.momo}" stroke-width="6"/></g>` + nail21(-70, 40, .6) + TF(60 + 150 * u, -30, .42, bar20(t, { glint: false })) + motion22(-10 + 150 * u, -30, 0, .6, "#8A949E") + T(0, 92, "the magnet goes away", 24, P.ink); };
// Basil's pick (uncle): the cash counter through the shop's door: a steel screwdriver with a tiny screw hanging from its tip
const unclePic = (t) => `<g filter="url(#dropS)"><rect x="-210" y="-130" width="420" height="260" rx="24" fill="#FFF8EA" stroke="${P.basil}" stroke-width="6"/></g><rect x="-190" y="10" width="380" height="100" fill="#8A6A4A"/><rect x="-196" y="0" width="392" height="18" rx="4" fill="#B08A5E"/>`
  + screwdriver22(-10, -40, .78, 0) + `<g transform="translate(118 -36) rotate(${n2(8 * Math.sin(t * 2))})"><path d="M0 0 V34" stroke="#9AA3AB" stroke-width="7"/><ellipse cx="0" cy="2" rx="12" ry="5" fill="#C9D0D6" stroke="#454C54" stroke-width="2.5"/><path d="M-5 10 L5 14 M-5 20 L5 24" stroke="#454C54" stroke-width="2"/><path d="M-3 34 L0 42 L3 34z" fill="#9AA3AB"/></g>` + T(0, 92, "the uncle's screwdriver", 28, "#fff");
// Part 2 Round 1's card pictures (370 x 240) and the ring's picture
const r1Pic22 = (i, t) => { let s = `<rect x="-200" y="-140" width="400" height="280" fill="${["#FFF0D6", "#E6F6E8", "#EEF0F6"][i]}"/>`;
  if (i === 0) s += nail21(0, 40, .9) + backForth(t, 0, 0, -10, 250) + TF(-110, -70, .26, bar20(t, { glint: false })) + TF(110, -70, .26, bar20(t, { glint: false, flip: true })) + T(0, -66, "⇄", 40, P.ink);
  else if (i === 1) s += nail21(0, 40, .9) + strokeArrow(t, -9, -120, 0, 110, 0, 10) + liftArc(t, -9, 120, -20, -120, -20, 70, 6) + magAt(t, -130, 22, .26, -110);
  else s += nail21(0, -40, .62) + nail21(0, 50, .62) + T(160, 30, "=", 70, P.ink);
  return s; };
const ringP2_22 = (t) => `<circle cx="430" cy="470" r="190" fill="#FFF8EA"/>` + rail22(290, 570, 320) + trayClips22(t, 430, 610, .72, { n: 18 })
  + [[370, "#FFF0D6"], [490, "#E6F6E8"]].map(([x], j) => `<path d="M${x} 320 V352" stroke="${P.ink}" stroke-width="3"/>` + nail21(x, 410, .42, 90) + TF(x, 520, 1, tpill(0, 0, j ? "one way" : "back and forth", 18, "#fff", P.ink, { w: 700 }))).join("")
  + TF(430, 556, 1, tpill(0, 0, "the same number of strokes", 16, STROKEC, "#fff", { w: 700 }));
// Part 2's recap (three pictures from Part 1, 1040 x 600)
const recapP2_22 = (i, t) => { let s = `<rect x="-520" y="-300" width="1040" height="600" fill="${["#E6F6E8", "#FFF3DC", "#EEF0F6"][i]}"/>`;
  if (i === 0) s += trayClips22(t, 0, 250, 2.0, { n: 24 }) + nail21(-60, -90, 1.7) + TF(-60 - 137 * 1.7, -90, 1.7, hand21()) + clipBunch(t, -60 + 255, -90, 8, { k: 1.8 });
  else if (i === 1) s += trayClips22(t, -250, 230, 1.2) + trayClips22(t, 250, 230, 1.2) + nail21(-260, -60, 1) + TF(-260 - 137, -60, 1, hand21()) + nail21(240, -60, 1) + TF(240 - 137, -60, 1, hand21().replace("#8B5CF6", "#B9A6FF")) + clipBunch(t, 240 + 150, -60, 6, { k: 1.2 })
    + T(-260, -190, "a new nail", 40, P.ink) + T(240, -190, "Pip's nail", 40, P.ink) + TF(-260 + 150, 60, 1, tpill(0, 0, "no clips", 30, "#E4E8EC", "#5A6070", { w: 700 }));
  else { const P_ = [[-390, "copper wire", 0], [-130, "aluminium foil", 1], [130, "wooden chopstick", 2], [390, "steel screwdriver", 3]]; s += rail22(-500, 500, -200);
    P_.forEach(([x, w, j]) => { s += `<path d="M${x} -200 V-160" stroke="${P.ink}" stroke-width="3"/>` + thingArt(j, x, 0, .9) + TF(x, -250, 1, tpill(0, 0, w, 28, "#fff", P.ink, { w: 700 })) + (j === 3 ? clipBunch(t, x, 140, 5, { k: 1 }) + TF(x + 90, 60, 1, tickBadge(34)) : TF(x, 200, 1, `<circle r="30" fill="#fff" stroke="#D84A3A" stroke-width="4"/><path d="M-12 -12 L12 12 M12 -12 L-12 12" stroke="#D84A3A" stroke-width="7" stroke-linecap="round"/>`)); }); }
  return s; };
// the fun facts. Part 1 (the woodpecker): pecking again and again, very fast (ff_peck); Pip's strokes, again and again (ff_nail); its long
// tongue wraps round the back of its head (ff_tongue: a simple cut-away, a thin pink band; no gore)
const ffPeck22 = (t, w, h) => `<rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" fill="#DFF0D8"/><rect x="-20" y="${-h / 2}" width="90" height="${h}" fill="#8A6A4E"/><path d="M-10 ${-h / 2} V${h / 2} M30 ${-h / 2} Q24 0 34 ${h / 2}" stroke="#6E5644" stroke-width="4" fill="none"/>`
  + woodpeckerAt(t * 2.2, -24, 40, 1.15, { flip: false, ph: 0 }) + [0, 1, 2].map((i) => `<path d="M-6 ${-50 + i * 14} q14 -6 26 0" stroke="#fff" stroke-width="4" fill="none" opacity="${n2(.4 + .6 * Math.abs(Math.sin(t * 9 + i)))}"/>`).join("")
  + T(0, -122, "tap tap tap tap", 24, P.ink, { w: 700 });
const ffNail22 = (t, w, h) => { const n = 1 + Math.floor(((t * 1.6) % 3)); return `<rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" fill="#FFF3DC"/>` + nail21(0, 40, .75) + [0, 1, 2].map((i) => i < n ? `<path d="M-90 ${-10 - i * 26} H90" stroke="${STROKEC}" stroke-width="8" stroke-linecap="round"/><path d="M78 ${-20 - i * 26} L94 ${-10 - i * 26} L78 ${-i * 26}" stroke="${STROKEC}" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>` : "").join("")
  + TF(0, -110, 1, tpill(0, 0, "stroke " + [1, 2, 3].slice(0, n).join(" · "), 26, "#fff", P.ink, { w: 700 })) + clipBunch(t, 112, 40, 3, { k: .7 }); };
const ffTongue22 = (t, w, h) => `<rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" fill="#F3E9DC"/><g transform="translate(-10 30) scale(2.6)"><circle cx="-14" cy="-26" r="34" fill="#C9A27A" stroke="#3A2618" stroke-width="2.5"/><circle cx="-14" cy="-26" r="27" fill="#F4E6D2" opacity=".85"/>`
  + `<path d="M22 -30 L48 -26 L22 -20z" fill="#5E5A56" stroke="#2E2A28" stroke-width="1.6"/><path d="M24 -25 C4 -24 -30 -2 -38 -24 C-44 -44 -20 -62 2 -52" stroke="#F29CB0" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M24 -25 C4 -24 -30 -2 -38 -24 C-44 -44 -20 -62 2 -52" stroke="#FFC6D2" stroke-width="2" fill="none" stroke-linecap="round"/>`
  + eye16(4, -34, 6, { lx: 1 }) + `</g>` + T(0, -120, "its tongue", 24, "#C2577A", { w: 700 });
// Part 2 (the ant): a smell path home (ff_food), more ants follow it, brighter (ff_follow), a wide, bright path and a busy line (ff_strong)
const smellPath = (w, k) => `<path d="M${-w / 2 + 20} 70 Q-20 -10 ${w / 2 - 30} 40" stroke="#FFB0D8" stroke-width="${n2(6 + 22 * k)}" fill="none" stroke-linecap="round" opacity="${n2(.3 + .5 * k)}" ${k < .3 ? 'stroke-dasharray="6 14"' : ""}/>`;
const ffFood22 = (t, w, h) => `<rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" fill="#F6EEDC"/>` + smellPath(w, .1) + `<path d="M${w / 2 - 60} 10 l18 -16 l16 6 l2 14z" fill="#E2B06A" stroke="#A8743E" stroke-width="3"/><rect x="${-w / 2 + 10}" y="40" width="40" height="50" fill="#8A6A4E"/>` + T(-w / 2 + 30, 110, "home", 20, P.ink, { w: 600 })
  + antAt(t, lerp(w / 2 - 70, -w / 2 + 70, ((t * .15) % 1)), lerp(30, 70, ((t * .15) % 1)), .7, { walk: true, flip: true });
const ffFollow22 = (t, w, h) => `<rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" fill="#F6EEDC"/>` + smellPath(w, .5) + [0, 1, 2].map((i) => { const u = ((t * .15 + i * .3) % 1); return antAt(t, lerp(-w / 2 + 70, w / 2 - 70, u), lerp(70, 30, u) - 20 * Math.sin(Math.PI * u), .6, { walk: true, ph: i }); }).join("");
const ffStrong22 = (t, w, h) => `<rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" fill="#F6EEDC"/>` + smellPath(w, 1) + [0, 1, 2, 3, 4, 5].map((i) => { const u = ((t * .2 + i * .17) % 1); return antAt(t, lerp(-w / 2 + 60, w / 2 - 60, u), lerp(70, 30, u) - 20 * Math.sin(Math.PI * u), .5, { walk: true, ph: i }); }).join("");   // teacher 25 Nov 2026: every ant walks to the right, so none is mirrored (was flip on every other one: they walked backwards) (SERIES_FORMAT 6x)
// the pictures under the Mark Sentence cards (on the right, under the card): origin = the picture's middle
const underBox = (w, h, inner) => `<g filter="url(#dropS)"><rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="30" fill="#FFF8EA"/></g>` + inner;
const markNails = (t, x, y, k) => TF(x, y, k, underBox(880, 300, nail21(-230, -40, .9) + trayClips22(t, -230, 110, .9, { n: 14 }) + T(-230, -100, "not stroked", 34, "#5A6070") + nail21(200, -40, .9) + trayClips22(t, 200, 110, .9, { n: 10 }) + clipBunch(t, 200 + 135, -40, 5, { k: .9 }) + TF(170, -110, 1, tpill(0, 0, "magnetised", 32, MAGC, "#fff", { w: 700 }))));
const markThings = (t, x, y, k) => TF(x, y, k, underBox(1000, 300, [[-400, 0, 1], [-200, 3, 1], [0, 0, 0], [180, 1, 0], [360, 2, 0]].map(([px, j, ok], i) => (i === 0 ? nail21(px, -20, .6, 90) : thingArt(j, px, -20, .6)) + (ok ? clipBunch(t, px, 80, 3, { k: .7 }) + TF(px + 60, -100, 1, tickBadge(26)) : TF(px, 110, .8, `<circle r="30" fill="#fff" stroke="#D84A3A" stroke-width="4"/><path d="M-12 -12 L12 12 M12 -12 L-12 12" stroke="#D84A3A" stroke-width="7" stroke-linecap="round"/>`))).join("")));
const markWay = (t, x, y, k) => TF(x, y, k, underBox(880, 300, nail21(0, 80, 1.6) + [0, 1, 2].map((i) => `<path d="M-200 ${20 - i * 36} H200" stroke="${STROKEC}" stroke-width="12" stroke-linecap="round"/><path d="M180 ${8 - i * 36} L204 ${20 - i * 36} L180 ${32 - i * 36}" stroke="${STROKEC}" stroke-width="12" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`).join("")
  + `<path d="M220 -100 C220 -150 -220 -150 -220 -100" stroke="${LIFTC}" stroke-width="9" stroke-dasharray="16 12" fill="none" stroke-linecap="round"/>` + magAt(t, -232, 52, .42, -100)));
const markMore = (t, x, y, k) => TF(x, y, k, underBox(980, 320, MRX.map((px, i) => nail21(px * .6 - 120, -40, .55, 90) + clipBunch(t, px * .6 - 120, 42, MRB[i], { k: .55 }) + T(px * .6 - 120, -140, MRN[i] + " strokes", 22, P.ink, { w: 700 })).join("")
  + TF(340, 30, .62, fishP(0, 0, 1, "#FFC83A", true)) + nail21(312, -60, .26, 90) + `<path d="M312 -180 V-100" stroke="${P.ink}" stroke-width="3"/>` + T(330, 130, "Rod 3", 24, P.ink)));
// the chant's board: THE FISHING POND small, with a flash per line: 1 the stacked one-way arrows, 2 the red end on the nail's head, 3 the
// three nails with growing bunches (flash = [a, b, c] 0..1)
const chantBoard22 = (t, f) => { let s = `<g filter="url(#drop)"><rect x="-300" y="-300" width="600" height="560" rx="30" fill="#FFF8EA"/></g>` + TF(0, 230, .6, pond22(t, 0, 0, 1, {})) + T(0, -250, "THE FISHING POND", 32, P.ink);
  s += OP(.35 + .65 * f[0], TF(-150, -150, 1, nail21(0, 30, .55) + [0, 1].map((i) => `<path d="M-70 ${-i * 22} H70" stroke="${STROKEC}" stroke-width="8" stroke-linecap="round"/><path d="M58 ${-8 - i * 22} L72 ${-i * 22} L58 ${8 - i * 22}" stroke="${STROKEC}" stroke-width="8" fill="none" stroke-linecap="round"/>`).join("")));
  s += OP(.35 + .65 * f[1], TF(150, -150, 1, nail21(30, 30, .55) + magAt(t, -45, 22, .2, -100)));
  s += OP(.35 + .65 * f[2], TF(0, -20, 1, [-120, 0, 120].map((x, i) => nail21(x, -10, .3, 90) + clipBunch(t, x, 36, [2, 4, 6][i], { k: .45 })).join("")));
  return s; };
