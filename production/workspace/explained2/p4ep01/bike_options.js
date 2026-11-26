// bike_options.js: P4 EP1 bike fixes and "Pip with his bike" OPTIONS (teacher, 26 Nov 2026: "The chain is also off-centered"; Pip sits on
// the top tube, his feet nowhere near the pedals; his name tag sits on the bike frame). NOT loaded by page.html: the live build is unchanged.
// To try it: load after p1.js and set window.P4FIX = true (the four pictures get their centred icons) and window.PIPBIKE = 1 | 2 | 3.
// items_sheet.js draws bike_fix.jpg and pip_on_bike_options.jpg from it.
// WHAT WAS FOUND (26 Nov):
// - The bike drawing itself is concentric in every state: the back gear (sprocket) is drawn at BK.RA, the back wheel's hub, the chain loop is
//   computed round BK.RA and BK.BB (chainLoop: outer tangents of the two pitch circles), and the lifted bike (bikeAt) rotates the WHOLE bike
//   round the front wheel's contact point, so the wheel, the dropouts, the sprocket and the chain move together. bike_fix.jpg proves it: a
//   red cross at the computed hub and a dashed circle of the wheel's radius on every state, plus close-ups.
// - What IS off-centre is the CHAIN picture in the four pictures row (p1.js fourPics, chainfix 3:22-3:30, RIDE IN 24:49-24:42): the chain
//   piece is drawn at (-60, 18) inside its 70 px circle, so only a scrap of it shows at the left edge; the PEDALS picture is also pushed to the
//   right. fourPicsFix: both centred (a straight run of chain, rollers and plates like the real chain; the crank and pedal round the middle).
(function () {
// p1.js keeps its helpers inside its own closure: this file reads them from window.__P1, which items_sheet.js sets by running p1.js once more
// with one export line (for the live build: add that line to p1.js, or move these functions into it)
const X = () => window.__P1;
// the four pictures' icons, each centred on (0, 0) inside the r 70 circle
const pedalIcon = () => `<g transform="translate(0 4) scale(1.25)"><circle cx="-22" cy="16" r="10" fill="#8C96A2" stroke="#2B2F36" stroke-width="4"/><path d="M-22 16 L16 -12" stroke="#2B2F36" stroke-width="13" stroke-linecap="round"/><path d="M-22 16 L16 -12" stroke="#8C96A2" stroke-width="7" stroke-linecap="round"/><rect x="-6" y="-21" width="44" height="17" rx="5" fill="#2B2F36"/><rect x="0" y="-17" width="32" height="8" rx="3" fill="#FFC83A"/></g>`;
const chainIcon = (t) => { const n = 7, sp = 19, off = ((t * 14) % (2 * sp)), x0 = -(n - 1) * sp / 2; let pl = "", ro = "";
  for (let i = -1; i <= n; i++) { const a = x0 + i * sp + off - sp, b = a + sp; pl += `<path d="M${n2(a)} 0 L${n2(b)} 0" stroke="${i % 2 ? "#4A5058" : "#2E3238"}" stroke-width="17" stroke-linecap="round"/>`; ro += `<circle cx="${n2(a)}" cy="0" r="5.5" fill="#AEB6C0"/>`; }
  return `<g transform="rotate(-10)"><clipPath id="ciC"><rect x="-62" y="-20" width="124" height="40"/></clipPath><g clip-path="url(#ciC)">${pl}${ro}</g></g>`; };
// p1.js fourPics with the two icons centred (everything else as it is)
window.fourPicsFix = (t) => { const ids = ["p1", "p2", "p3", "p4"], lab = ["PEDALS", "FRONT GEAR", "CHAIN", "BACK WHEEL"], xs = [420, 780, 1140, 1500];
  const pic = [() => pedalIcon(), (tt) => TF(0, 0, 1.45, gearP4(BK.r1, BK.n1, tt * 2)), (tt) => chainIcon(tt), (tt) => TF(0, 0, .5, wheelP4(BK.R, tt * 3))];
  if (t < MK("p1") - .3 || t > MK("kw_interact") + 2.2) return ""; const k0 = ramp(t, MK("p1") - .3, .3) * (1 - ramp(t, MK("kw_interact") + 1.75, .3));
  return OP(k0, xs.map((x, i) => { const lit = t >= MK(ids[i]) - .05, g = lit ? pulse(t, MK(ids[i]), .03, .8) : 0;
    return TF(x, 200, 1 + .12 * g, `<g filter="url(#dropS)"><circle r="78" fill="#FFF8EA" stroke="${lit ? P.leaf : "#C9BFAE"}" stroke-width="${lit ? 10 : 6}"/></g><clipPath id="fp${i}"><circle r="70"/></clipPath><g clip-path="url(#fp${i})" opacity="${lit ? 1 : .45}">${pic[i](t)}</g>` + tpill(0, 126, lab[i], 30, lit ? P.leaf : P.ink, "#fff", { w: 700 }))
      + (i < 3 ? OP(lit ? 1 : .3, fatArrow(x + 96, 200, x + 264, 200, lit ? P.sun : "#fff", 16)) : ""); }).join("")); };
// behind the flag: the chainfix scene with the fixed row (the old row's exact SVG is swapped for the new one; nothing else changes)
const _cf = SC.chainfix; SC.chainfix = (t, s) => { const r = _cf(t, s); if (!window.P4FIX) return r; const a = X().fourPics(t); return a ? r.replace(a, fourPicsFix(t)) : r; };

// a buddy's name tag moved to (x, y) (screen): "name tags never on top of props". buddy0 draws the tag as TF(x, y, k, nameTag(who, size));
// this moves that group. (For the live build this becomes a 2-line o.tagAt in lib.js buddy0.)
window.retag = (svg, who, x, y) => { const i = svg.indexOf(`fill="${P[who]}"/><rect`); if (i < 0) return svg; const j = svg.lastIndexOf(`<g transform="translate(`, svg.lastIndexOf(`<g filter="url(#dropS)">`, i)); if (j < 0) return svg;
  return svg.slice(0, j) + svg.slice(j).replace(/^<g transform="translate\([-\d.]+ [-\d.]+\)/, `<g transform="translate(${n2(x)} ${n2(y)})`); };

/* ---------------------------------------------------------------- Pip with his bike: the cold open's first beat (t = 4 s) ---------------------------------------------------------------- */
// 0 = now: Pip's feet at SAD() = 74 px BELOW the saddle's top, in front of the bike: he sits on the TOP TUBE; his tag lands on the frame.
// 1 = ON THE SADDLE: his seat on the saddle's top (the saddle hidden under him), drawn in front of the bike; tag on the grass at his left.
// 2 = BEHIND THE BIKE, holding it up: standing on the grass on the far side (the bike drawn in front: top tube across his tummy), between
//     the saddle and the handlebar; tag on the grass in front of the back wheel's left.
// 3 = BESIDE IT: standing on the grass left of the back wheel (no overlap; Momo moves left), the bike on its stand; tag under his feet.
window.pipBikeFrame = (t, opt) => { const c = X().coldCam(t), bike = bikeP4(t, { chain: false, brakes: 0, bell: 0, crank: .4, sh: 0, g2: 0 });
  const props = TF(...X().BOXC, 1, boxP4(t)) + (t >= MK("sign") - .1 ? TF(X().SIGN[0], X().SIGN[1], .72, signP4()) : "");
  const o = { poses: [[0, "sit"]], look: 3, noreact: true, shadow: opt === 0 }; if (opt === 2 || opt === 3) o.shadow = true; let back = "", front = "", tagXY = null;
  if (opt === 0) { const [x, y] = X().SAD(...X().CB, 1), k = window.ITEM_OPT.pip; window.ITEM_OPT.pip = "live"; front = X().bcam(c, "pip", x, y, 330, t, o); window.ITEM_OPT.pip = k; }
  if (opt === 1) { const x = X().CB[0] + BK.ST[0] + 8, y = X().CB[1] + BK.ST[1] - 2; front = X().bcam(c, "pip", x, y, 330, t, o); tagXY = camPt(c, [X().CB[0] - 455, 1046]); }
  if (opt === 2) { back = X().bcamRaw(c, "pip", X().CB[0] + 10, X().GY - 12, 360, t, o); tagXY = camPt(c, [X().CB[0] - 455, 1046]); }
  if (opt === 3) { front = X().bcam(c, "pip", X().CB[0] - 535, 1062, 340, t, o); }
  let pip = back ? "" : front; if (tagXY) pip = retag(pip, "pip", tagXY[0], tagXY[1]);
  let set = back + TF(...X().CB, 1, bike) + props; if (back && tagXY) set = retag(set, "pip", ...camPt([1, 960, 540], [X().CB[0] - 455, 1046]));
  return X().place("vdp4", set, c) + pip + X().bcam(c, "momo", opt === 3 ? 100 : 215, 1062, 420, t, { poses: [[0, "sit"]], look: 4, noreact: true })
    + X().bcam(c, "basil", 1712, 1062, 400, t, { flip: true, poses: [[0, "sit"]], look: -4, noreact: true }); };

/* ---------------------------------------------------------------- the sheets ---------------------------------------------------------------- */
const hubMark = (x, y, R, k = 1) => `<circle cx="${n2(x)}" cy="${n2(y)}" r="${n2(R * k)}" fill="none" stroke="#E5484D" stroke-width="3" stroke-dasharray="10 8"/><path d="M${n2(x - 26)} ${n2(y)} H${n2(x + 26)} M${n2(x)} ${n2(y - 26)} V${n2(y + 26)}" stroke="#E5484D" stroke-width="3"/>`;
const rot = (p, c, a) => { a *= Math.PI / 180; const dx = p[0] - c[0], dy = p[1] - c[1]; return [c[0] + dx * Math.cos(a) - dy * Math.sin(a), c[1] + dx * Math.sin(a) + dy * Math.cos(a)]; };
const zoomBox = (inner, cx, cy, half, x, y, size) => { const id = `zb${Math.round(x)}_${Math.round(y)}`, k = size / (2 * half);
  return `<g transform="translate(${x} ${y})"><clipPath id="${id}"><rect width="${size}" height="${size}" rx="18"/></clipPath><rect width="${size}" height="${size}" rx="18" fill="#FFF8EA"/><g clip-path="url(#${id})"><g transform="scale(${n2(k)}) translate(${n2(-cx + half)} ${n2(-cy + half)})">${inner}</g></g><rect width="${size}" height="${size}" rx="18" fill="none" stroke="${P.ink}" stroke-width="4"/></g>`; };
window.bikeFixSheet = () => { let s = `<rect width="1920" height="1500" fill="#F4EFE6"/>`;
  s += T(40, 60, "1. The four pictures (chainfix, 3:22 to 3:30): NOW vs FIXED", 40, P.ink, { a: "start" });
  const tt = MK("p4") + 1.2, row = (f, y) => `<g transform="translate(-150 ${y - 200})">${f(tt)}</g>`;
  s += T(40, 130, "NOW", 30, "#E5484D", { a: "start" }) + `<g transform="translate(0 0)">${row(X().fourPics, 230)}</g>` + T(40, 430, "FIXED", 30, P.leaf, { a: "start" }) + row(fourPicsFix, 520);
  s += T(1690, 190, "CHAIN: was a scrap", 24, P.ink2, { a: "start", w: 600 }) + T(1690, 222, "at the circle's left", 24, P.ink2, { a: "start", w: 600 }) + T(1690, 254, "edge; PEDALS sat", 24, P.ink2, { a: "start", w: 600 }) + T(1690, 286, "to the right", 24, P.ink2, { a: "start", w: 600 });
  s += T(1690, 480, "both centred; the", 24, P.ink2, { a: "start", w: 600 }) + T(1690, 512, "chain = a straight", 24, P.ink2, { a: "start", w: 600 }) + T(1690, 544, "run of real links", 24, P.ink2, { a: "start", w: 600 });
  s += T(40, 760, "2. The bike in every state: red cross = the computed back hub, dashed = the wheel's radius (the sprocket, wheel and chain share one centre)", 30, P.ink, { a: "start" });
  const k = .62, Y = 1080, xs = [250, 720, 1190, 1660], R = BK.RA;
  const st = [["whole bike, chain on", bikeP4(0, { chain: 1, crank: .6, brakes: 1, bell: 1 }), 0],
    ["lifted (chainfix, 3:20)", bikeP4(0, { chain: 1, crank: 2.2, sh: BK.r1 * 1.6, rw: 3, g2: BK.r1 * 1.6 / BK.r2, brakes: 0, bell: 0, blur: .4, stand: false }), -4.2],
    ["chain off (fixes 1, 2)", bikeP4(0, { chain: false, brakes: 0, bell: 0, crank: .4, sh: 0, g2: 0 }), 0],
    ["look closer (drive)", X().drivePic(0, 1.3), 0]];
  st.forEach(([lab, b, a], i) => { const x0 = xs[i], piv = [BK.FA[0], 0], hub = rot(R, piv, a), inner = `<g transform="translate(${n2(piv[0])} 0) rotate(${a}) translate(${n2(-piv[0])} 0)">${b}</g>` + hubMark(hub[0], hub[1], BK.R);
    s += TF(x0, Y, k, inner) + T(x0, 1140, lab, 26, P.ink);
    s += zoomBox(inner, hub[0], hub[1], 70, x0 - 105, 1180, 210); });
  s += T(40, 1440, "Close-ups (3x): the sprocket's centre, the wheel's hub and the dashed wheel circle coincide in all four, so nothing to change in the bike drawing.", 26, P.ink2, { a: "start", w: 600 });
  return s; };
window.pipBikeSheet = (pipOpt) => { const t = 4, keep = window.ITEM_OPT.pip; if (pipOpt) window.ITEM_OPT.pip = pipOpt; let s = `<rect width="1920" height="1640" fill="#F4EFE6"/>`;
  const cap = [["NOW: on the top tube", "feet 74 px below the saddle's top; tag on the frame"], ["1  ON THE SADDLE", "seat on the saddle (hidden under him); tag on the grass"], ["2  BEHIND IT, holding it up", "far side, top tube across his tummy; tag on the grass"], ["3  BESIDE IT", "on the grass left of the back wheel; tag under his feet"]];
  const X0 = 190, Y0 = 330, W = 940, H = 680, Z = .82;   // Z: the 1146 x 829 crop shown at 940 x 680   // the crop of the 1920 x 1080 frame (the bike, Pip, Momo's edge)
  [0, 1, 2, 3].forEach((o, i) => { const x = (i % 2) * 960 + 10, y = Math.floor(i / 2) * 790 + 10, id = `pbC${i}`;
    s += T(x + 14, y + 40, cap[i][0], 34, i ? P.ink : "#E5484D", { a: "start" }) + T(x + 14, y + 76, cap[i][1], 25, P.ink2, { a: "start", w: 600 });
    s += `<g transform="translate(${x} ${y + 96})"><clipPath id="${id}"><rect width="${W}" height="${H}" rx="16"/></clipPath><g clip-path="url(#${id})"><g transform="scale(${Z}) translate(${-X0} ${-Y0})">${pipBikeFrame(t, o)}</g></g><rect width="${W}" height="${H}" rx="16" fill="none" stroke="${P.ink}" stroke-width="3"/></g>`; });
  s += T(20, 1625, "Pip's paintings all SIT (no legs that reach down), so no option can put his feet on the pedals; for real pedalling (the ride) a new 'Pip riding' painting is needed.", 25, P.ink2, { a: "start", w: 600 });
  window.ITEM_OPT.pip = keep; return s; };
})();
