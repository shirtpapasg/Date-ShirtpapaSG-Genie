// artp4.js: P4 EP1 "The Great Bike Breakdown" art (drawn 25 Nov 2026, Opus). Loaded after art27.js (its goggles, badge, clapper, tempTag,
// plabel, fatArrow, camOn / camMix / camPt / pawPt are used), before common.js and p1.js.
// THE PLACES: the VOID DECK of an HDB block on a Saturday morning (pillars with the block number, letterboxes, a round stone table with
// stools, the bicycle bay, a notice board; the buddies and the bike on the grass verge in front of it), the PARK CONNECTOR beside HDB blocks
// (the ride, drawn live so the camera can track the riders), the RAIN TREE at the end of the ride (baked), the SCIENCE HELP DESK (the void
// deck in the afternoon, a folding table, a desk bell, a hand-lettered sign).
// THE SCIENCE IN THE PICTURES (SERIES_FORMAT 6 "Science pictures must never plant a misconception"; script sections 2 and 6): Pip's bike is
// drawn from the drive side with its FRONT at the RIGHT. The FRONT GEAR is fixed to the pedal cranks; the BACK GEAR is fixed to the BACK
// wheel's hub; the chain, when it is on, is one loop on the teeth of both gears (never to the front wheel). Pedalling forward turns the front
// gear clockwise (as seen here); its teeth sit in the gaps of the chain and pull the TOP run forward (to the right); the chain pulls the back
// gear round and the back wheel turns; the bottom run goes back (to the left). Chain pitch = tooth spacing (9.4 px at bike size), so the
// rollers sit between the teeth on both gears and move exactly as the gears turn. Rim brakes (a lever on the handlebar, a cable, a caliper
// with pads at each rim); the bell is a chrome dome on the handlebar. Organs pink / red / maroon, bones off-white (never purple).
// FACES notes (SERIES_FORMAT 6x): bikeP4 FACES right (front wheel leads; it only ever moves to the right), linkYouP4 FACES right (mirrored
// with a negative x scale on the bottom run, where it travels left), kidRiderP4 FACES right, chilliP4 FACES none (a pot seen from the front).

/* ================================================================ defs ================================================================ */
const XDEFSP4 = () => `${lg("vdSky", [[0, "#8FD3FF"], [.75, "#D6F0FF"], [1, "#FFF6DE"]])}${lg("vdWall", [[0, "#F6EFE2"], [1, "#E8DCC7"]])}${lg("vdFloor", [[0, "#E2DACB"], [1, "#CBC1AE"]])}
  ${lg("vdGrass", [[0, "#A6DA74"], [1, "#6DB548"]])}${lg("vdPath", [[0, "#D9D3C7"], [1, "#BDB5A6"]])}${lg("pcPath", [[0, "#C9684C"], [1, "#A9503A"]])}${lg("bkFrame", [[0, "#FF6E4A"], [1, "#D9402A"]])}
  ${lg("chrome", [[0, "#FFFFFF"], [.45, "#C9D2DC"], [1, "#7D8896"]], .3, 1)}${lg("box01", [[0, "#E9C48C"], [1, "#C99A5B"]])}${lg("deskTop", [[0, "#F4EDE0"], [1, "#DCD2BF"]])}
  ${rg("lcWarm", [[0, "#FFE7B8", .9], [1, "#C88A4A", 0]])}${lg("steelW", [[0, "#5E6670"], [.5, "#8C96A2"], [1, "#4A515A"]])}${lg("steelD", [[0, "#3B4149"], [1, "#22262C"]])}
  ${rg("rimLight", [[0, "#FFD9A0", .55], [1, "#FFB060", 0]])}${lg("treeTrunk", [[0, "#8A6447"], [1, "#5E4130"]], 1, 0)}`;

/* ================================================================ the bike ================================================================ */
// geometry at k = 1, origin = the ground point midway between the wheels' contact points; y up is negative
const BK = { R: 118, RA: [-255, -118], FA: [255, -118], BB: [-40, -92], SC: [-100, -330], ST: [-118, -372], HT: [160, -318], HB: [176, -258], r1: 48, r2: 21.5, n1: 32, n2: 14, crank: 64, pitch: 9.425 };
const V2 = { add: (a, b) => [a[0] + b[0], a[1] + b[1]], sc: (a, k) => [a[0] * k, a[1] * k], pol: (r, a) => [r * Math.cos(a), r * Math.sin(a)] };
// the chain's loop round two gears: c2 / r2 the back gear, c1 / r1 the front gear. s from 0 at the top of the back gear: along the TOP run to
// the front gear (moving right), round the front gear (clockwise), back along the BOTTOM run (moving left), round the back gear (clockwise).
function chainLoop(c2, r2, c1, r1) { const d = [c1[0] - c2[0], c1[1] - c2[1]], D = Math.hypot(...d), ph = Math.atan2(d[1], d[0]), be = Math.asin((r1 - r2) / D);
  const at = ph - Math.PI / 2 - be, ab = ph + Math.PI / 2 + be, nt = V2.pol(1, at), nb = V2.pol(1, ab);
  const P2t = V2.add(c2, V2.sc(nt, r2)), P1t = V2.add(c1, V2.sc(nt, r1)), P1b = V2.add(c1, V2.sc(nb, r1)), P2b = V2.add(c2, V2.sc(nb, r2));
  const Lt = Math.hypot(P1t[0] - P2t[0], P1t[1] - P2t[1]), A1 = r1 * (ab - at), Lb = Math.hypot(P2b[0] - P1b[0], P2b[1] - P1b[1]), A2 = r2 * (at + 2 * Math.PI - ab), L = Lt + A1 + Lb + A2;
  const at_ = (s) => { s = ((s % L) + L) % L;
    if (s < Lt) { const u = s / Lt; return { x: lerp(P2t[0], P1t[0], u), y: lerp(P2t[1], P1t[1], u), a: Math.atan2(P1t[1] - P2t[1], P1t[0] - P2t[0]), seg: "top" }; }
    s -= Lt; if (s < A1) { const a = at + s / r1, p = V2.add(c1, V2.pol(r1, a)); return { x: p[0], y: p[1], a: a + Math.PI / 2, seg: "front" }; }
    s -= A1; if (s < Lb) { const u = s / Lb; return { x: lerp(P1b[0], P2b[0], u), y: lerp(P1b[1], P2b[1], u), a: Math.atan2(P2b[1] - P1b[1], P2b[0] - P1b[0]), seg: "bottom" }; }
    s -= Lb; const a = ab + s / r2, p = V2.add(c2, V2.pol(r2, a)); return { x: p[0], y: p[1], a: a + Math.PI / 2, seg: "back" }; };
  const d_ = `M${n2(P2t[0])} ${n2(P2t[1])} L${n2(P1t[0])} ${n2(P1t[1])} A${r1} ${r1} 0 1 1 ${n2(P1b[0])} ${n2(P1b[1])} L${n2(P2b[0])} ${n2(P2b[1])} A${r2} ${r2} 0 0 1 ${n2(P2t[0])} ${n2(P2t[1])}`;
  return { at: at_, L, Lt, A1, Lb, A2, at0: at, ab, d: d_, P1t, P2t, P1b, P2b }; }
const BIKELOOP = chainLoop(BK.RA, BK.r2, BK.BB, BK.r1);
// the gears turn with the chain: crank angle th (clockwise +) moves the chain r1 * th along the loop; teeth sit in the chain's gaps
const G1OFF = BIKELOOP.at0 - (BIKELOOP.Lt / BK.r1) - .5 * BK.pitch / BK.r1, G2OFF = BIKELOOP.ab - ((BIKELOOP.Lt + BIKELOOP.A1 + BIKELOOP.Lb) / BK.r2) - .5 * BK.pitch / BK.r2;
// a toothed gear ring: r = the pitch circle, n teeth, rot (radians), o: fill, holes
function gearP4(r, n, rot, o = {}) { const s = 2 * Math.PI / n, ro = r + (o.th || r * .14 + 2), ri = r - (o.th || r * .14 + 2) * .45; let d = "";
  for (let i = 0; i < n; i++) { const a = rot + i * s, p = [[ri, a - .5 * s], [ri * .99 + ro * .01, a - .3 * s], [ro, a - .16 * s], [ro, a + .16 * s], [ri * .99 + ro * .01, a + .3 * s]];
    p.forEach(([rr, aa], j) => { d += `${i === 0 && j === 0 ? "M" : "L"}${n2(rr * Math.cos(aa))} ${n2(rr * Math.sin(aa))} `; }); }
  d += "Z"; const sw = o.sw === undefined ? Math.max(1.5, r * .05) : o.sw;
  let sp = ""; if (o.spider !== false) for (let i = 0; i < 5; i++) { const a = rot + i * 2 * Math.PI / 5; sp += `<path d="M0 0 L${n2(r * .78 * Math.cos(a))} ${n2(r * .78 * Math.sin(a))}" stroke="${o.dark || "#59616B"}" stroke-width="${n2(r * .16)}" stroke-linecap="round"/>`; }
  return `<path d="${d}" fill="${o.fill || "url(#chrome)"}" stroke="${o.stroke || "#2B2F36"}" stroke-width="${n2(sw)}" stroke-linejoin="round"/>` + (o.hollow === false ? "" : `<circle r="${n2(r * .72)}" fill="${o.hole || "none"}" stroke="#2B2F36" stroke-width="${n2(sw * .8)}"/>`) + sp
    + `<circle r="${n2(r * .2)}" fill="#59616B" stroke="#2B2F36" stroke-width="${n2(sw * .7)}"/>`; }
// the chain on a loop (only the part 0..frac of it, from where it is put on), shifted sh px along it; scale-aware roller size
function chainOn(loop, sh, frac = 1, o = {}) { const p = o.pitch || BK.pitch, n = Math.floor(loop.L / p), m = Math.round(n * clamp(frac)); if (m < 1) return "";
  const w = o.w || 7.5; let s = "", plates = ""; const pts = [];
  for (let k = 0; k < m; k++) { const q = loop.at(k * p + sh); pts.push(q); }
  for (let k = 0; k < m - (frac >= 1 ? 0 : 1); k++) { const a = pts[k], b = pts[(k + 1) % m]; plates += `<path d="M${n2(a.x)} ${n2(a.y)} L${n2(b.x)} ${n2(b.y)}" stroke="${k % 2 ? "#4A5058" : "#2E3238"}" stroke-width="${n2(w)}" stroke-linecap="round"/>`; }
  for (const q of pts) s += `<circle cx="${n2(q.x)}" cy="${n2(q.y)}" r="${n2(w * .34)}" fill="#AEB6C0"/>`;
  return `<g>${plates}${s}</g>`; }
// a wheel: tyre, rim, 18 spokes turning (angle a), hub; blur 0..1 = a spinning blur over the spokes
function wheelP4(R, a, blur = 0) { let sp = ""; for (let i = 0; i < 18; i++) { const an = a + i * Math.PI / 9; sp += `<path d="M0 0 L${n2((R - 14) * Math.cos(an))} ${n2((R - 14) * Math.sin(an))}" stroke="#B9C1CB" stroke-width="2.5"/>`; }
  return `<circle r="${R - 6}" fill="none" stroke="#2E2F33" stroke-width="15"/><circle r="${R - 6}" fill="none" stroke="#45474D" stroke-width="5" stroke-dasharray="6 9"/><circle r="${R - 15}" fill="none" stroke="#C9D1DA" stroke-width="5"/>`
    + OP(1 - .7 * blur, sp) + (blur > .02 ? `<circle r="${R - 38}" fill="none" stroke="#C9D1DA" stroke-width="${n2(44)}" opacity="${n2(.35 * blur)}"/>` + [0, 1, 2].map((i) => `<path d="M${n2((R - 30) * Math.cos(a * 3 + i * 2.1))} ${n2((R - 30) * Math.sin(a * 3 + i * 2.1))} A${R - 30} ${R - 30} 0 0 1 ${n2((R - 30) * Math.cos(a * 3 + i * 2.1 + .9))} ${n2((R - 30) * Math.sin(a * 3 + i * 2.1 + .9))}" stroke="#fff" stroke-width="5" fill="none" opacity="${n2(.6 * blur)}" stroke-linecap="round"/>`).join("") : "")
    + `<circle r="11" fill="#8C96A2" stroke="#2B2F36" stroke-width="3"/>`; }
const tube = (a, b, w = 15, col = "url(#bkFrame)") => `<path d="M${n2(a[0])} ${n2(a[1])} L${n2(b[0])} ${n2(b[1])}" stroke="#7A2214" stroke-width="${w + 5}" stroke-linecap="round"/><path d="M${n2(a[0])} ${n2(a[1])} L${n2(b[0])} ${n2(b[1])}" stroke="${col}" stroke-width="${w}" stroke-linecap="round"/>`;
const caliper = (x, y, rot) => `<g transform="translate(${x} ${y}) rotate(${rot})"><path d="M-16 -6 Q0 -22 16 -6" stroke="#59616B" stroke-width="7" fill="none" stroke-linecap="round"/><rect x="-20" y="-6" width="8" height="18" rx="2" fill="#22252A"/><rect x="12" y="-6" width="8" height="18" rx="2" fill="#22252A"/><circle cx="0" cy="-16" r="5" fill="#8C96A2" stroke="#2B2F36" stroke-width="2"/></g>`;
// the bell: a chrome dome with its little lever; ring 0..1 = the striker swings; o.heart = Heart's hint (the dome reflects the logo-pill heart)
const bellP4 = (ring = 0, heart = 0) => `<path d="M-6 8 L-22 2" stroke="#59616B" stroke-width="4" stroke-linecap="round" transform="rotate(${n2(-30 * ring)} -6 8)"/><rect x="-4" y="6" width="8" height="10" fill="#59616B"/><path d="M-16 8 Q-16 -14 0 -14 Q16 -14 16 8z" fill="url(#chrome)" stroke="#2B2F36" stroke-width="3"/><circle cx="0" cy="-16" r="3" fill="#8C96A2" stroke="#2B2F36" stroke-width="1.5"/><path d="M-9 -2 Q-8 -9 -2 -10" stroke="#fff" stroke-width="2.5" fill="none" stroke-linecap="round"/>`
  + (heart > 0 ? OP(heart, `<g transform="translate(5 -3) scale(.36)"><circle r="19" fill="url(#gSun)"/><path d="M0 10 c-11-8-13-15-8-19 c4-3 7 0 8 3 c1-3 4-6 8-3 c5 4 3 11-8 19z" fill="${P.ink}"/></g>`) : "");
// Pip's bike, drive side to camera, front at the right. o: chain (false | 0..1 how much is on), sh (chain shift px; defaults to r1 * crank),
// crank (radians, + = pedalling forward), rw / fw (wheel angles), blur (spinning back wheel), fblur, brakes (0..1), bell (0..1), ring,
// heart (the hint), rope ({ on: 0..1, slip, off }), stand (kickstand down), saddle (false = the seat is off), lit (0..1 every part glows),
// gapGlow (the empty space between the gears pulses), pedalBlur
/* FACES: right */ function bikeP4(t, o = {}) { const cr = o.crank || 0, sh = o.sh === undefined ? BK.r1 * cr : o.sh, R = BK.R, br = o.brakes === undefined ? 1 : o.brakes, bl = o.bell === undefined ? 1 : o.bell;
  const g1 = cr + G1OFF, g2 = (o.g2 !== undefined ? o.g2 : sh / BK.r2) + G2OFF, rw = o.rw !== undefined ? o.rw : (o.g2 !== undefined ? o.g2 : sh / BK.r2), fw = o.fw || 0;
  const cpt = (a, L) => V2.add(BK.BB, V2.pol(L, a)); let s = "";
  // the kickstand (far side) and the far crank with its pedal
  if (o.stand !== false) s += `<path d="M${BK.BB[0] - 70} ${BK.BB[1] - 8} L${BK.BB[0] - 110} -2" stroke="#59616B" stroke-width="9" stroke-linecap="round"/>`;
  { const p = cpt(cr + Math.PI, BK.crank); s += `<path d="M${BK.BB[0]} ${BK.BB[1]} L${n2(p[0])} ${n2(p[1])}" stroke="#3B4149" stroke-width="12" stroke-linecap="round"/><rect x="${n2(p[0] - 17)}" y="${n2(p[1] - 6)}" width="34" height="12" rx="4" fill="#2B2F36"/>`; }
  s += TF(...BK.RA, 1, wheelP4(R, rw, o.blur || 0)) + TF(...BK.FA, 1, wheelP4(R, fw, o.fblur || 0));
  // the frame: chainstay, seatstay, seat tube, top tube, down tube, head tube, fork
  s += tube(BK.RA, BK.SC, 11) + tube(BK.RA, BK.BB, 12) + tube(BK.BB, BK.SC, 16) + tube(BK.SC, [BK.HT[0] - 4, BK.HT[1] + 10], 15) + tube(BK.BB, [BK.HB[0] - 2, BK.HB[1] - 6], 18) + tube(BK.HT, BK.HB, 19);
  s += `<path d="M${BK.HB[0]} ${BK.HB[1]} Q${BK.HB[0] + 40} ${BK.HB[1] + 66} ${BK.FA[0]} ${BK.FA[1]}" stroke="#7A2214" stroke-width="18" fill="none" stroke-linecap="round"/><path d="M${BK.HB[0]} ${BK.HB[1]} Q${BK.HB[0] + 40} ${BK.HB[1] + 66} ${BK.FA[0]} ${BK.FA[1]}" stroke="url(#bkFrame)" stroke-width="13" fill="none" stroke-linecap="round"/>`;
  // seat post + saddle; stem + handlebar + grip
  if (o.saddle !== false) s += `<path d="M${BK.SC[0]} ${BK.SC[1]} L${BK.ST[0] + 4} ${BK.ST[1] + 10}" stroke="#8C96A2" stroke-width="10"/><path d="M${BK.ST[0] - 46} ${BK.ST[1] + 2} Q${BK.ST[0] - 40} ${BK.ST[1] - 14} ${BK.ST[0]} ${BK.ST[1] - 12} L${BK.ST[0] + 42} ${BK.ST[1] - 4} Q${BK.ST[0] + 44} ${BK.ST[1] + 8} ${BK.ST[0] + 20} ${BK.ST[1] + 10} Q${BK.ST[0] - 10} ${BK.ST[1] + 14} ${BK.ST[0] - 46} ${BK.ST[1] + 2}z" fill="#2B2F36"/>`;
  else s += `<path d="M${BK.SC[0]} ${BK.SC[1]} L${BK.SC[0] - 5} ${BK.SC[1] - 18}" stroke="#8C96A2" stroke-width="10" stroke-linecap="round"/>`;
  s += `<path d="M${BK.HT[0]} ${BK.HT[1]} L${BK.HT[0] - 6} ${BK.HT[1] - 44} Q${BK.HT[0] - 10} ${BK.HT[1] - 56} ${BK.HT[0] - 30} ${BK.HT[1] - 56} L${BK.HT[0] - 66} ${BK.HT[1] - 54}" stroke="#59616B" stroke-width="10" fill="none" stroke-linecap="round"/><rect x="${BK.HT[0] - 92}" y="${BK.HT[1] - 63}" width="34" height="18" rx="8" fill="#2B2F36"/>`;
  // the brakes: levers, cables, calipers with pads at both rims (rear on the seatstay bridge, front on the fork)
  if (br > .01) s += OP(br, `<path d="M${BK.HT[0] - 62} ${BK.HT[1] - 48} q-6 22 -26 30" stroke="#59616B" stroke-width="6" fill="none" stroke-linecap="round"/>`
    + `<path d="M${BK.HT[0] - 66} ${BK.HT[1] - 46} Q${BK.HT[0] - 40} ${BK.HT[1] - 10} ${BK.SC[0] + 60} ${BK.SC[1] + 6} L${BK.SC[0] + 6} ${BK.SC[1] + 6} Q-150 -270 -176 -222" stroke="#2B2F36" stroke-width="3.5" fill="none"/>`
    + `<path d="M${BK.HT[0] - 10} ${BK.HT[1] - 40} Q${BK.HT[0] + 26} ${BK.HT[1] - 20} 200 -232" stroke="#2B2F36" stroke-width="3.5" fill="none"/>` + caliper(-184, -213, -36) + caliper(200, -224, 28));
  if (bl > .01) s += OP(bl, TF(BK.HT[0] - 24, BK.HT[1] - 66, 1, bellP4(o.ring || 0, o.heart || 0)));
  // the drive: back gear, front gear, chain (or rope), the near crank and pedal
  s += TF(...BK.RA, 1, gearP4(BK.r2, BK.n2, g2, { spider: false, hole: "#59616B" })) + TF(...BK.BB, 1, gearP4(BK.r1, BK.n1, g1));
  if (o.gapGlow) s += OP(o.gapGlow, `<path d="M${n2(BIKELOOP.P2t[0])} ${n2(BIKELOOP.P2t[1])} L${n2(BIKELOOP.P1t[0])} ${n2(BIKELOOP.P1t[1])} M${n2(BIKELOOP.P2b[0])} ${n2(BIKELOOP.P2b[1])} L${n2(BIKELOOP.P1b[0])} ${n2(BIKELOOP.P1b[1])}" stroke="${P.sun}" stroke-width="16" stroke-dasharray="4 14" stroke-linecap="round" opacity=".9"/>`);
  if (o.chain) s += chainOn(BIKELOOP, sh, o.chain);
  if (o.rope) s += ropeOn(o.rope, t);
  { const p = cpt(cr, BK.crank); s += `<path d="M${BK.BB[0]} ${BK.BB[1]} L${n2(p[0])} ${n2(p[1])}" stroke="#2B2F36" stroke-width="15" stroke-linecap="round"/><path d="M${BK.BB[0]} ${BK.BB[1]} L${n2(p[0])} ${n2(p[1])}" stroke="#8C96A2" stroke-width="9" stroke-linecap="round"/><circle cx="${BK.BB[0]}" cy="${BK.BB[1]}" r="9" fill="#8C96A2" stroke="#2B2F36" stroke-width="3"/><rect x="${n2(p[0] - 20)}" y="${n2(p[1] - 7)}" width="40" height="14" rx="4" fill="#2B2F36"/><rect x="${n2(p[0] - 14)}" y="${n2(p[1] - 3)}" width="28" height="6" rx="2" fill="#FFC83A"/>`;
    if (o.pedalBlur) s += OP(o.pedalBlur, `<circle cx="${BK.BB[0]}" cy="${BK.BB[1]}" r="${BK.crank}" fill="none" stroke="#fff" stroke-width="18" opacity=".45"/>` + [0, 1, 2].map((i) => { const a = cr - i * .5; return `<path d="M${n2(BK.BB[0] + (BK.crank + 24) * Math.cos(a))} ${n2(BK.BB[1] + (BK.crank + 24) * Math.sin(a))} A${BK.crank + 24} ${BK.crank + 24} 0 0 0 ${n2(BK.BB[0] + (BK.crank + 24) * Math.cos(a - .7))} ${n2(BK.BB[1] + (BK.crank + 24) * Math.sin(a - .7))}" stroke="#fff" stroke-width="7" fill="none" stroke-linecap="round" opacity="${n2(.9 - i * .25)}"/>`; }).join("")); }
  if (o.lit) s = `<g filter="url(#glowS)" opacity="${n2(o.lit)}">${s}</g>` + OP(1 - o.lit, s);
  return s; }
// the skipping rope looped round both gears: a smooth pink cord, tied, its two blue handles hanging from the bottom run. on = 0..1 (looped)
function ropeOn(r, t) { if (!r || !(r.on > 0)) return ""; const L = chainLoop(BK.RA, BK.r2 + 5, BK.BB, BK.r1 + 5), sl = r.slip || 0;
  const k = [L.at(L.Lt + L.A1 + L.Lb * .45 + sl), L.at(L.Lt + L.A1 + L.Lb * .55 + sl)];
  const hang = (q, dx, i) => `<path d="M${n2(q.x)} ${n2(q.y)} q${dx * .4} 30 ${dx} 58" stroke="#F28AB2" stroke-width="5" fill="none"/><g transform="translate(${n2(q.x + dx)} ${n2(q.y + 70 + 3 * Math.sin(t * 3 + i))}) rotate(${n2(8 * Math.sin(t * 2.6 + i))})"><rect x="-9" y="-16" width="18" height="44" rx="8" fill="#3A86FF" stroke="#1B4F9C" stroke-width="3"/></g>`;
  return OP(r.on, `<path d="${L.d}" stroke="#F28AB2" stroke-width="6.5" fill="none"/><path d="${L.d}" stroke="#FFD1E2" stroke-width="2" fill="none" stroke-dasharray="6 10" stroke-dashoffset="${n2(-sl)}"/>` + hang(k[0], -14, 0) + hang(k[1], 12, 1) + `<circle cx="${n2((k[0].x + k[1].x) / 2)}" cy="${n2((k[0].y + k[1].y) / 2)}" r="7" fill="#F28AB2"/>`); }
// the rope, flying off the gears (a loose loop and its two handles), origin = its middle
const ropeLoose = (t, k = 1) => `<path d="M-90 0 C-90 -50 90 -50 90 0 C90 40 -90 40 -90 0z" stroke="#F28AB2" stroke-width="7" fill="none" transform="scale(${n2(k)} 1)"/><path d="M-60 20 q-10 30 -6 60 M60 20 q10 30 6 60" stroke="#F28AB2" stroke-width="5" fill="none"/><rect x="-75" y="78" width="18" height="44" rx="8" fill="#3A86FF" stroke="#1B4F9C" stroke-width="3"/><rect x="57" y="78" width="18" height="44" rx="8" fill="#3A86FF" stroke="#1B4F9C" stroke-width="3"/>`;
// the chain lying loose (a loop draped), origin = its middle
const chainLoose = (w = 260, h = 90, ph = 0) => { const n = 40; let s = "", pts = []; for (let i = 0; i < n; i++) { const a = i / n * Math.PI * 2 + ph; pts.push([w / 2 * Math.cos(a) * (1 + .08 * Math.sin(a * 3)), h / 2 * Math.sin(a) + 10 * Math.sin(a * 2)]); }
  for (let i = 0; i < n; i++) { const a = pts[i], b = pts[(i + 1) % n]; s += `<path d="M${n2(a[0])} ${n2(a[1])} L${n2(b[0])} ${n2(b[1])}" stroke="${i % 2 ? "#4A5058" : "#2E3238"}" stroke-width="11" stroke-linecap="round"/>`; }
  return s + pts.map(([x, y]) => `<circle cx="${n2(x)}" cy="${n2(y)}" r="4" fill="#AEB6C0"/>`).join(""); };
// a spanner, origin = the middle of its handle
const spannerP4 = () => `<path d="M-60 0 H40" stroke="#8C96A2" stroke-width="16" stroke-linecap="round"/><path d="M40 0 m0 -24 a26 26 0 1 1 0 48 l-8 -14 l12 -10 l-12 -10z" fill="#8C96A2" stroke="#2B2F36" stroke-width="4"/><path d="M-60 0 H40" stroke="#2B2F36" stroke-width="2" opacity=".4"/>`;
// the box of "USELESS PARTS" (cardboard, origin = the middle of its bottom edge); open 0..1; o.chain = the chain draped over its edge
function boxP4(t, o = {}) { const w = 230, h = 150, op = o.open || 0; let s = `<ellipse cx="0" cy="4" rx="${w * .58}" ry="14" fill="#2B2147" opacity=".22"/>`;
  s += `<rect x="${-w / 2}" y="${-h}" width="${w}" height="${h}" rx="6" fill="url(#box01)" stroke="#8A6233" stroke-width="5"/><path d="M${-w / 2} ${-h + 22} H${w / 2}" stroke="#B8894F" stroke-width="3"/>`;
  s += `<g transform="rotate(-3)"><rect x="-92" y="${-h + 40}" width="184" height="74" rx="6" fill="#FFF8EA" stroke="#8A6233" stroke-width="3"/>${T(0, -h + 72, "USELESS", 28, "#2B2147")}${T(0, -h + 104, "PARTS", 28, "#2B2147")}</g>`;
  if (op < .5) s += `<path d="M${-w / 2 - 4} ${-h} h${w + 8} v-6 h${-w - 8}z" fill="#C99A5B" stroke="#8A6233" stroke-width="4"/><path d="M0 ${-h - 6} v8" stroke="#8A6233" stroke-width="3"/>`;
  else s += `<path d="M${-w / 2} ${-h} l-34 -46 l${w * .45} 0 l14 46z" fill="#D8AE73" stroke="#8A6233" stroke-width="4"/><path d="M${w / 2} ${-h} l34 -46 l${-w * .45} 0 l-14 46z" fill="#D8AE73" stroke="#8A6233" stroke-width="4"/>`;
  if (o.chain) s += TF(0, -h - 6, 1, `<g transform="scale(.8 .7)">${chainLoose(240, 80, 0)}</g>`);
  return s; }
// the cardboard sign PIP'S SUPER-LIGHT RACER, on a stick pushed into the grass, origin = the stick's foot
const signP4 = () => `<path d="M0 0 V-150" stroke="#8A5A2B" stroke-width="10"/><g transform="translate(0 -190) rotate(-4)"><g filter="url(#dropS)"><rect x="-150" y="-62" width="300" height="124" rx="10" fill="url(#box01)" stroke="#8A6233" stroke-width="5"/></g>${T(0, -16, "PIP'S SUPER-LIGHT", 30, "#2B2147")}${T(0, 34, "RACER", 46, "#D9402A")}</g>`;

/* ================================================================ the ride clock ================================================================ */
function rideClock(t, secs, k = 1, x = 960, y = 62, go = 0) { if (k <= .01) return ""; const s = Math.max(0, Math.ceil(secs)), mm = Math.floor(s / 60), ss_ = s % 60, txt = `${mm}:${String(ss_).padStart(2, "0")}`, low = s < 600;
  const col = go > .5 ? P.leaf : low ? "#FF5A4E" : P.ink, pl = low && go < .5 ? 1 + .04 * Math.max(0, Math.sin(t * 6.3)) : 1 + .08 * pulse(t, go > 0 ? t - (go - .5) : -9);
  const inner = go > .5 ? T(0, 15, "CLASS RIDE: GO!", 44, "#fff") : `<circle cx="-182" cy="0" r="24" fill="#fff"/><circle cx="-182" cy="0" r="18" fill="${P.sun}"/><path d="M-182 0 V-12 M-182 0 L${n2(-182 + 9 * Math.cos(t * 2))} ${n2(9 * Math.sin(t * 2))}" stroke="${P.ink}" stroke-width="4" stroke-linecap="round"/>`
    + T(-140, 13, "RIDE IN", 34, "#fff", { a: "start", w: 600 }) + T(176, 15, txt, 46, P.sun, { a: "end", w: 700 });
  return TF(x, y, k * pl, `<g filter="url(#dropS)"><rect x="-230" y="-40" width="460" height="80" rx="40" fill="${col}"/></g>` + inner); }

/* ================================================================ the fix cards ================================================================ */
const FIXLAB = ["Pedal harder", "Tie on a skipping rope", "Put back the chain"];
function fixPicP4(t, n) { const c2 = [-110, 6], c1 = [70, 30];
  if (n === 1) { const a = t * 9; // the front gear and crank, a blur of pedalling, speed lines; NO chain
    return `<g transform="translate(-10 0)">${TF(...c1, 1.9, gearP4(BK.r1, BK.n1, a + G1OFF))}${TF(-110, 6, 1.9, gearP4(BK.r2, BK.n2, G2OFF, { spider: false, hole: "#59616B" }))}<circle cx="${c1[0]}" cy="${c1[1]}" r="122" fill="none" stroke="#fff" stroke-width="26" opacity=".55"/>`
      + [0, 1].map((i) => { const an = a + i * Math.PI, px = c1[0] + 122 * Math.cos(an), py = c1[1] + 122 * Math.sin(an); return `<path d="M${c1[0]} ${c1[1]} L${n2(px)} ${n2(py)}" stroke="#2B2F36" stroke-width="20" stroke-linecap="round" opacity="${i ? .5 : 1}"/><rect x="${n2(px - 30)}" y="${n2(py - 11)}" width="60" height="22" rx="6" fill="#2B2F36" opacity="${i ? .5 : 1}"/>`; }).join("")
      + [0, 1, 2].map((i) => `<path d="M${-190 + i * 14} ${-100 + i * 40} h${70 - i * 10}" stroke="${P.ink}" stroke-width="9" stroke-linecap="round" opacity=".4"/>`).join("") + T(150, -100, "zoom!", 34, "#D9402A") + `</g>`; }
  if (n === 2) { const L = chainLoop([-110, 6], BK.r2 * 1.9 + 9, [70, 30], BK.r1 * 1.9 + 9);
    return TF(...c1, 1.9, gearP4(BK.r1, BK.n1, G1OFF)) + TF(...c2, 1.9, gearP4(BK.r2, BK.n2, G2OFF, { spider: false, hole: "#59616B" })) + `<path d="${L.d}" stroke="#F28AB2" stroke-width="11" fill="none"/>`
      + [[-10, -1], [20, 1]].map(([dx, sd], i) => { const q = L.at(L.Lt + L.A1 + L.Lb * (.45 + .1 * i)); return `<path d="M${n2(q.x)} ${n2(q.y)} q${sd * 10} 26 ${sd * 22} 50" stroke="#F28AB2" stroke-width="8" fill="none"/><rect x="${n2(q.x + sd * 22 - 12)}" y="${n2(q.y + 50)}" width="24" height="58" rx="10" fill="#3A86FF" stroke="#1B4F9C" stroke-width="4"/>`; }).join(""); }
  return `<g transform="translate(0 120)">${boxP4(t, { open: 1 })}</g><g transform="translate(-10 -60) rotate(-6)">${chainLoose(300, 120, .3)}</g>`; }
function fixCardP4(t, n, o = {}) { const col = ["#FF6A3D", "#3AA6E8", "#8B5CF6"][n - 1], lab = FIXLAB[n - 1], k = o.k === undefined ? 1 : o.k;
  let s = `<g filter="url(#drop)"><rect x="-230" y="-250" width="460" height="500" rx="34" fill="#FFF8EA" stroke="${col}" stroke-width="12"/></g><g transform="translate(0 -30)">${fixPicP4(t, n)}</g>`
    + `<path d="M-230 150 h460 v66 a34 34 0 0 1 -34 34 h-392 a34 34 0 0 1 -34 -34z" fill="${col}"/>` + (lab.length > 14 ? T(0, 194, lab.split(" ").slice(0, 2).join(" "), 40, "#fff") + T(0, 236, lab.split(" ").slice(2).join(" "), 40, "#fff") : T(0, 216, lab, 46, "#fff"))
    + `<g transform="translate(-196 -214)" filter="url(#dropS)"><circle r="54" fill="${P.sun}" stroke="${P.ink}" stroke-width="7"/></g>` + T(-196, -194, String(n), 64, P.ink);
  if (o.glow) s = `<rect x="-252" y="-272" width="504" height="544" rx="44" fill="none" stroke="${P.sun}" stroke-width="${n2(14 * o.glow)}" opacity="${n2(Math.min(1, o.glow))}"/>` + s;
  if (o.stamp) { const [txt, good, ts] = o.stamp; if (t >= ts) s += TF(0, -40, lerp(2, 1, eo((t - ts) / .15)), `<g transform="rotate(-12)"><rect x="${n2(-tw(txt, 54, 700) / 2 - 34)}" y="-50" width="${n2(tw(txt, 54, 700) + 68)}" height="100" rx="18" fill="${good ? P.leaf : "#E5484D"}" stroke="#fff" stroke-width="8"/>${T(0, 18, txt, 54, "#fff")}</g>`); }
  return TF(0, 0, k, s); }

/* ================================================================ the places (baked) ================================================================ */
const blockP4 = (x, y, w, h, c, acc) => hdbBlock27(x, y, w, h, c, acc);
// a small bike parked in the bicycle bay (a real bike: chain on its gears), facing right
const parkedBike = (x, y, k, col) => TF(x, y, k, bikeP4(0, { chain: 1, crank: .6, brakes: 1, bell: 1 }).replace(/url\(#bkFrame\)/g, col));
// THE VOID DECK (world -192..2112 x -108..1188), Saturday morning: the ceiling with its lights; the back wall with pillars (block number 214
// on the pillar plaques), the letterboxes, the notice board, the round stone table with four stools, the bicycle bay with two parked bikes;
// the void deck floor; the footpath and the grass verge in front, where the buddies and Pip's bike stand (ground line about y 1050)
const VD_PLAQUE_X = 1080;   // the one pillar that carries the block number (its plaque: x 1096..1184, y 220..280)
// the bubble layout (kit/bubble_layout.js) keeps speech bubbles off the plaque, on both void deck sets and the ramp (main.js bg() marks)
const RAMP_PLAQUE_X = 900;   // the ramp (artv2.js BG.rampv2): the block number on its middle pillar only (P4 EP1 fix, 28 Nov 2026)
window.BG_OBST = Object.assign(window.BG_OBST || {}, { vdp4: [[VD_PLAQUE_X + 16, 220, 88, 60, "214"]], vdv2: [[VD_PLAQUE_X + 16, 220, 88, 60, "214"]], rampv2: [[RAMP_PLAQUE_X + 16, 220, 88, 60, "214"]] });
BG.vdp4 = () => { let s = `<rect x="-200" y="-120" width="2320" height="1320" fill="url(#vdWall)"/>`;
  s += `<rect x="-200" y="-120" width="2320" height="150" fill="#E6DCCA"/><rect x="-200" y="26" width="2320" height="12" fill="#D4C8B2"/>` + [0, 1, 2, 3, 4].map((i) => `<rect x="${-60 + i * 480}" y="-20" width="230" height="16" rx="8" fill="#fff"/><rect x="${-60 + i * 480}" y="-4" width="230" height="10" fill="#FFF6D8" opacity=".6"/>`).join("");
  // the open side at the back: sky, far blocks and trees, between the pillars at the left
  s += `<rect x="-200" y="120" width="560" height="560" fill="url(#vdSky)"/>` + blockP4(-160, 190, 260, 420, "#EAD9F0", "#E58A6B") + blockP4(140, 240, 210, 380, "#F2E2C4", "#7BB0E0") + `<rect x="-200" y="600" width="560" height="80" fill="url(#vdGrass)"/>` + tree27(40, 640, .5) + tree27(280, 650, .45);
  // pillars; the block number 214 on the MIDDLE pillar only (teacher, 28 Nov 2026, P4 EP2: "one block number 214 will do"; it was on all three)
  for (const x of [360, 1080, 1800]) s += `<rect x="${x}" y="30" width="120" height="740" fill="#EFE6D6" stroke="#CFC3AD" stroke-width="5"/><rect x="${x}" y="730" width="120" height="40" fill="#D9CDB8"/>` + (x === VD_PLAQUE_X ? `<g transform="translate(${x + 60} 250)"><rect x="-44" y="-30" width="88" height="60" rx="8" fill="#2B5F8F"/>${T(0, 14, "214", 38, "#fff")}</g>` : "");
  // the letterboxes (between the first two pillars)
  s += `<g transform="translate(540 300)"><rect x="0" y="0" width="380" height="250" rx="8" fill="#9AA6B6" stroke="#6D788C" stroke-width="5"/>${[...Array(24)].map((_, i) => `<rect x="${12 + (i % 6) * 60}" y="${12 + Math.floor(i / 6) * 58}" width="52" height="48" rx="4" fill="#C7D0DB" stroke="#7D8896" stroke-width="2"/><rect x="${20 + (i % 6) * 60}" y="${22 + Math.floor(i / 6) * 58}" width="36" height="6" rx="3" fill="#59616B"/>`).join("")}</g>`;
  // the notice board
  s += `<g transform="translate(1260 280)"><rect x="0" y="0" width="300" height="220" rx="8" fill="#B88A5E" stroke="#8A5A2B" stroke-width="5"/><rect x="14" y="14" width="272" height="192" fill="#D9B98C"/><rect x="30" y="26" width="110" height="80" fill="#fff" transform="rotate(-3 85 66)"/><rect x="40" y="38" width="80" height="8" fill="#9AA6B6"/><rect x="40" y="54" width="90" height="6" fill="#C7D0DB"/><rect x="160" y="30" width="110" height="140" fill="#FFF3B8" transform="rotate(4 215 100)"/>${T(215, 74, "CLASS", 18, "#D9402A")}${T(215, 98, "BIKE RIDE", 18, "#D9402A")}${T(215, 124, "SAT 10 AM", 16, "#2B2147")}<rect x="40" y="120" width="100" height="70" fill="#CFE9FF"/><circle cx="85" cy="26" r="6" fill="#E5484D"/><circle cx="215" cy="30" r="6" fill="#43BF6C"/></g>`;
  // the floor
  s += `<rect x="-200" y="760" width="2320" height="170" fill="url(#vdFloor)"/>` + [...Array(14)].map((_, i) => `<path d="M${-200 + i * 180} 760 L${-280 + i * 200} 930" stroke="#C2B8A4" stroke-width="3" opacity=".7"/>`).join("") + `<path d="M-200 840 H2120" stroke="#C2B8A4" stroke-width="3" opacity=".7"/>`;
  // the round stone table and four stools (mid-ground)
  s += `<g transform="translate(860 800)"><ellipse cx="0" cy="52" rx="150" ry="20" fill="#2B2147" opacity=".15"/><rect x="-26" y="-30" width="52" height="80" fill="#B9B2A5"/><ellipse cx="0" cy="-34" rx="130" ry="30" fill="#D2CBBE" stroke="#A39B8C" stroke-width="5"/><path d="M-80 -40 l20 -6 M30 -44 l30 6" stroke="#E6E1D7" stroke-width="5" opacity=".7"/>${[[-200, 30], [200, 30], [-110, 60], [110, 60]].map(([x, y]) => `<rect x="${x - 26}" y="${y - 10}" width="52" height="40" fill="#B9B2A5"/><ellipse cx="${x}" cy="${y - 12}" rx="36" ry="12" fill="#D2CBBE" stroke="#A39B8C" stroke-width="4"/>`).join("")}</g>`;
  // the bicycle bay: a rack and two parked bikes (drawn true, chains on)
  s += `<g><rect x="1500" y="660" width="560" height="12" fill="#8C96A2"/>${[0, 1, 2, 3, 4].map((i) => `<path d="M${1520 + i * 120} 790 V690 Q${1520 + i * 120} 668 ${1550 + i * 120} 668 Q${1580 + i * 120} 668 ${1580 + i * 120} 690 V790" stroke="#8C96A2" stroke-width="8" fill="none"/>`).join("")}</g>`
    + parkedBike(1640, 800, .42, "#3AA6E8") + parkedBike(1900, 800, .4, "#43BF6C");
  // the footpath and the grass verge in front
  s += `<rect x="-200" y="900" width="2320" height="60" fill="url(#vdPath)"/><path d="M-200 900 H2120" stroke="#A39B8C" stroke-width="5"/>` + [...Array(16)].map((_, i) => `<path d="M${-200 + i * 160} 900 v60" stroke="#A39B8C" stroke-width="3"/>`).join("");
  s += `<rect x="-200" y="956" width="2320" height="250" fill="url(#vdGrass)"/><path d="M-200 958 H2120" stroke="#5E9E3E" stroke-width="5"/>`;
  for (let i = 0; i < 70; i++) { const x = -180 + hash(i, 3) * 2280, y = 980 + hash(i, 5) * 190; s += `<path d="M${n2(x)} ${n2(y)} l-6 -16 M${n2(x + 4)} ${n2(y)} l2 -20 M${n2(x + 8)} ${n2(y)} l8 -14" stroke="#4E9E3A" stroke-width="3" stroke-linecap="round"/>`; }
  // morning light from the open side at the left
  return s; };
// THE RAIN TREE at the end of the ride (world -192..2112 x -108..1188): a giant rain tree (Samanea saman): a huge umbrella-shaped crown on
// thick spreading branches, a thick woody trunk, roots spreading into the grass; HDB blocks far behind; the park connector curving past
function rainTreeP4(x, y, k = 1) { let s = "";
  // roots spreading at the base, the trunk, the big branches (every leaf mass sits on a branch end)
  s += `<path d="M-160 0 Q-80 -20 -50 -60 M160 0 Q80 -20 50 -60 M-90 4 Q-40 -10 -30 -50 M100 4 Q40 -10 30 -50" stroke="#6B4A33" stroke-width="26" fill="none" stroke-linecap="round"/>`;
  s += `<path d="M-60 0 Q-40 -160 -30 -300 L30 -300 Q40 -160 60 0z" fill="url(#treeTrunk)" stroke="#4A3324" stroke-width="5"/>`;
  const br = [[-30, -290, -520, -470, 34], [-10, -300, -260, -560, 30], [10, -300, 230, -580, 30], [30, -290, 540, -470, 34], [0, -300, 0, -600, 26], [-30, -280, -720, -400, 24], [30, -280, 730, -410, 24]];
  for (const [x0, y0, x1, y1, w] of br) s += `<path d="M${x0} ${y0} Q${(x0 + x1) / 2} ${y1 + 80} ${x1} ${y1}" stroke="#5E4130" stroke-width="${w}" fill="none" stroke-linecap="round"/>`;
  const blobs = [[-720, -430, 170], [-540, -520, 210], [-300, -600, 230], [0, -640, 240], [280, -610, 230], [540, -520, 210], [740, -440, 170], [-420, -470, 150], [420, -470, 150], [-150, -520, 170], [150, -530, 170]];
  for (const [i, [cx, cy, r]] of blobs.entries()) s += `<ellipse cx="${cx}" cy="${cy}" rx="${r * 1.35}" ry="${r * .62}" fill="${["#4E9E44", "#5DAF4D", "#6CBF52", "#468F3D"][i % 4]}"/>`;
  for (let i = 0; i < 60; i++) { const a = hash(i, 4) * Math.PI, rr = 600 + hash(i, 6) * 180; s += `<ellipse cx="${n2(-rr * Math.cos(a))}" cy="${n2(-480 - 150 * Math.sin(a) + hash(i, 8) * 60)}" rx="46" ry="20" fill="${i % 3 ? "#7FCB5B" : "#3F8A37"}" opacity=".8"/>`; }
  return TF(x, y, k, s); }
BG.rtp4 = () => { let s = `<rect x="-200" y="-120" width="2320" height="1320" fill="url(#vdSky)"/>`;
  s += blockP4(-120, 260, 300, 420, "#F2E2C4", "#7BB0E0") + blockP4(1760, 240, 320, 440, "#EAD9F0", "#E58A6B") + blockP4(1500, 330, 220, 350, "#DCEBD9", "#43BF6C");
  s += `<rect x="-200" y="640" width="2320" height="580" fill="url(#vdGrass)"/>`;
  s += `<path d="M-200 930 Q900 860 2120 960 L2120 1050 Q900 950 -200 1030z" fill="url(#pcPath)"/><path d="M-200 930 Q900 860 2120 960" stroke="#fff" stroke-width="5" fill="none" opacity=".7"/>`;
  s += rainTreeP4(960, 780, 1.05);
  for (let i = 0; i < 50; i++) { const x = -180 + hash(i, 13) * 2280, y = 700 + hash(i, 15) * 470; s += `<path d="M${n2(x)} ${n2(y)} l-6 -16 M${n2(x + 4)} ${n2(y)} l2 -20 M${n2(x + 8)} ${n2(y)} l8 -14" stroke="#4E9E3A" stroke-width="3" stroke-linecap="round"/>`; }
  return s; };

/* ================================================================ the park connector (live, for the tracking shot) ================================================================ */
// cx = how far the camera has tracked (px); far things move slower (parallax)
function pcSet(t, cx) { let s = `<rect width="1920" height="1080" fill="url(#vdSky)"/>`; const wrap = (x, w) => ((x % w) + w) % w;
  for (let i = 0; i < 4; i++) { const x = wrap(i * 620 - cx * .2, 2480) - 300; s += blockP4(x, 220 + (i % 2) * 50, 300 - (i % 2) * 40, 420, ["#F2E2C4", "#EAD9F0", "#DCEBD9", "#F6E0D0"][i], ["#7BB0E0", "#E58A6B", "#43BF6C", "#9B6BFF"][i]); }
  s += `<rect x="0" y="640" width="1920" height="440" fill="url(#vdGrass)"/>`;
  for (let i = 0; i < 6; i++) { const x = wrap(i * 420 - cx * .55, 2520) - 300; s += tree27(n2(x), 700, .62); }
  // the park connector: a red path with a white edge line; lamp posts and a railing along it
  s += `<rect x="0" y="800" width="1920" height="200" fill="url(#pcPath)"/><path d="M0 806 H1920 M0 994 H1920" stroke="#fff" stroke-width="5" opacity=".8"/><path d="M0 900 H1920" stroke="#F6D7B0" stroke-width="4" stroke-dasharray="40 30" stroke-dashoffset="${n2(cx)}" opacity=".7"/>`;
  for (let i = 0; i < 5; i++) { const x = wrap(i * 520 - cx, 2600) - 300; s += `<rect x="${n2(x)}" y="560" width="10" height="244" fill="#59616B"/><path d="M${n2(x + 5)} 566 q30 -10 46 6" stroke="#59616B" stroke-width="8" fill="none"/><ellipse cx="${n2(x + 52)}" cy="576" rx="16" ry="8" fill="#FFF6D8"/>`; }
  s += `<rect x="0" y="1000" width="1920" height="80" fill="url(#vdGrass)"/>`;
  return s; }
// another child on the class ride, far off (a simple figure on a small true bike, helmet on), origin = the ground between the wheels
/* FACES: right */ const kidRiderP4 = (t, col, hel) => bikeP4(t, { chain: 1, crank: t * 4, sh: BK.r1 * t * 4, brakes: 1, bell: 1, stand: false }).replace(/url\(#bkFrame\)/g, col)
  + `<g transform="translate(-60 -560)"><rect x="-34" y="60" width="74" height="110" rx="30" fill="${col}"/><path d="M10 160 L-30 250 M10 160 L60 240" stroke="#3A3F47" stroke-width="20" stroke-linecap="round"/><path d="M30 90 L180 150" stroke="${col}" stroke-width="18" stroke-linecap="round"/><circle cx="12" cy="20" r="46" fill="#C98F66"/><path d="M-36 6 Q-30 -46 14 -44 Q60 -46 64 6z" fill="${hel}"/><circle cx="36" cy="18" r="5" fill="#2B2147"/></g>`;

/* ================================================================ LOOK CLOSER: the chain and the gear ================================================================ */
// a big detailed piece of chain on a big gear (origin = the gear's centre; r = pitch radius; th = the gear's turn): the rollers sit in the
// gaps between the teeth and move with them; the chain leaves the gear along the top towards the left
function bigChainGear(r, n, th, o = {}) { const p = 2 * Math.PI * r / n; let s = TF(0, 0, 1, gearP4(r, n, th - .5 * 2 * Math.PI / n - Math.PI / 2, { th: r * .16, sw: 4 }));
  // the chain: wrapped over the top-left quarter of the gear, then straight off to the left along the top tangent
  const pts = []; for (let k = -6; k < 16; k++) { const a = -Math.PI / 2 + th + (k * p) / r; if (a < -Math.PI / 2) { const d = (-Math.PI / 2 - a) * r; pts.push([-d, -r]); } else if (a < .55) pts.push([r * Math.cos(a), r * Math.sin(a)]); }
  // a STRAIGHT run on the left: positions -d
  for (let i = 0; i < pts.length - 1; i++) { const [x1, y1] = pts[i], [x2, y2] = pts[i + 1], an = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI, L = Math.hypot(x2 - x1, y2 - y1);
    s += `<g transform="translate(${n2(x1)} ${n2(y1)}) rotate(${n2(an)})"><rect x="${n2(-p * .22)}" y="${n2(-p * .3)}" width="${n2(L + p * .44)}" height="${n2(p * .6)}" rx="${n2(p * .28)}" fill="${i % 2 ? "url(#steelW)" : "#4A515A"}" stroke="#22262C" stroke-width="3"/></g>`; }
  for (const [x, y] of pts) s += `<circle cx="${n2(x)}" cy="${n2(y)}" r="${n2(p * .2)}" fill="#C9D1DA" stroke="#22262C" stroke-width="3"/>`;
  return s; }

/* ================================================================ the journey: a link of the chain ================================================================ */
// the drive at the micro-world's scale (px): the back gear at the left, the front gear at the right; one loop of huge links
const JW = { c2: [0, 0], r2: 360, c1: [2300, 120], r1: 780, pitch: 200 };
const JLOOP = chainLoop(JW.c2, JW.r2, JW.c1, JW.r1);
const JG1 = JLOOP.at0 - JLOOP.Lt / JW.r1 - .5 * JW.pitch / JW.r1, JG2 = JLOOP.ab - (JLOOP.Lt + JLOOP.A1 + JLOOP.Lb) / JW.r2 - .5 * JW.pitch / JW.r2;
// one huge link plate (origin its middle, along +x), with its two rollers
const linkPlate = (L, w, shade) => `<rect x="${n2(-L / 2 - w * .45)}" y="${n2(-w / 2)}" width="${n2(L + w * .9)}" height="${n2(w)}" rx="${n2(w / 2)}" fill="${shade ? "url(#steelW)" : "#565E68"}" stroke="#1E2227" stroke-width="5"/><rect x="${n2(-L / 2)}" y="${n2(-w * .32)}" width="${n2(L)}" height="${n2(w * .18)}" rx="${n2(w * .09)}" fill="#fff" opacity=".18"/>`;
// YOU: one link of the chain with two round holes for eyes and a small smile (the eyes look the way it travels: drawn facing right)
/* FACES: right */ const linkYouP4 = (t, L, w) => linkPlate(L, w, true) + `<circle cx="${n2(-L * .16)}" cy="-4" r="${n2(w * .17)}" fill="#1E2227"/><circle cx="${n2(L * .2)}" cy="-4" r="${n2(w * .17)}" fill="#1E2227"/><circle cx="${n2(-L * .16 + w * .07)}" cy="${n2(-4 - w * .05)}" r="${n2(w * .055)}" fill="#fff"/><circle cx="${n2(L * .2 + w * .07)}" cy="${n2(-4 - w * .05)}" r="${n2(w * .055)}" fill="#fff"/>`
  + `<path d="M${n2(-L * .04)} ${n2(w * .2)} q${n2(L * .06)} ${n2(w * .12)} ${n2(L * .12)} 0" stroke="#1E2227" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M${n2(-L / 2 - w * .45)} 0 a${n2(w / 2)} ${n2(w / 2)} 0 0 1 ${n2(w / 2)} ${n2(-w / 2)}" stroke="${P.sun}" stroke-width="5" fill="none" opacity=".8"/>`;
// the micro-world: the whole loop of links (shift sh along the loop; you = link index iy), both gears turning with the chain
function jWorld(t, sh, iy, o = {}) { const n = Math.floor(JLOOP.L / JW.pitch); let s = "", you = null;
  s += TF(...JW.c2, 1, gearP4(JW.r2, 12, sh / JW.r2 + JG2, { th: 70, sw: 7, spider: true, hole: "#3B4149" })) + TF(...JW.c1, 1, gearP4(JW.r1, 26, sh / JW.r1 + JG1, { th: 78, sw: 7, hole: "#3B4149" }));
  for (let k = 0; k < n; k++) { const a = JLOOP.at(k * JW.pitch + sh), b = JLOOP.at((k + 1) * JW.pitch + sh), mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2, an = Math.atan2(b.y - a.y, b.x - a.x) * 180 / Math.PI;
    if (k === iy) { you = { x: mx, y: my, an, seg: a.seg }; continue; }
    s += `<g transform="translate(${n2(mx)} ${n2(my)}) rotate(${n2(an)})">${linkPlate(JW.pitch, 120, k % 2)}</g>`; }
  for (let k = 0; k < n; k++) { const a = JLOOP.at(k * JW.pitch + sh); s += `<circle cx="${n2(a.x)}" cy="${n2(a.y)}" r="34" fill="#AEB6C0" stroke="#1E2227" stroke-width="5"/>`; }
  return { s, you }; }
