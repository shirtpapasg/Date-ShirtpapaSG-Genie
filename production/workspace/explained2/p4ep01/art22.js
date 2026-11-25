// art22.js: EP22's own art, part A (Stage 2, drawn 2026-11-24): small helpers, the two hidden animals, the stroke, the clips and the props.
// Loaded after tests.js / ep21dare.js / ep22dare.js, before sets22.js, lc22.js, common.js, p1.js / p2.js.
// Helpers copied UNCHANGED from EP15 / EP16 / EP19 / EP20 (art20.js: hand15, camPt, eye16, blink16, xChip16, tickChip16, camOn, camMix,
// holdHand, melt, qMark20, fatArrow): EP15 to EP20 are finished, so they are copied here, never edited there.
// THE ANIMALS (true shapes from the script's section 3 Realism, drawn in the buddies' warm, rounded, big-eyed style; every one moves):
//   Part 1 a SUNDA PYGMY WOODPECKER (about a sparrow's length: a brown back and wings with neat white bars, a pale buff face stripe and
//   throat, a darker cap, a pale streaky belly, a short straight pointed beak, two toes forward and two back, a stiff tail propped on the
//   wood, big glossy eyes; it clings upright, taps with quick nods, hops up the wood in little jerks), Part 2 a small black HOUSE ANT
//   (three body parts, six legs, two elbowed feelers, big friendly eyes; it waves its feelers, taps the crumb, trots in little zigzags).
// THE STROKE (script section 3): the bar magnet's red North end touches the nail's flat head and slides along the WHOLE nail to its sharp
//   tip, then lifts up and away in a curve, well clear, and comes down on the head again; the same end every stroke; never sliding back.
//   The stroke arrow GREEN (STROKEC), the lift a dotted GOLD arc (LIFTC). Magnetised nails are the SAME grey as new ones (only clips show it).

/* ================================================================ helpers (copied) ================================================================ */
const SKN = "#F2C29B", SKL = "#C98F66";
function hand15(o = {}) { const c = o.curl || 0, sl = o.sleeve || "#5B7BD6", sd = o.sleeveD || "#3A56A8", F = [[-29, 70], [-9, 80], [11, 74], [29, 58]];
  const fing = F.map(([y, L], i) => { const cc = o.point && i === 0 ? 0 : (o.point ? .75 : c), l = L * (1 - .6 * cc) + 10; return `<rect x="-10" y="${y - 10}" width="${n2(l)}" height="20" rx="10" transform="rotate(${n2((i - 1.5) * 4)} 0 ${y})"/>`; }).join("");
  return `<rect x="-330" y="-54" width="230" height="108" rx="20" fill="${sl}" stroke="${sd}" stroke-width="5"/><g fill="${SKN}" stroke="${SKL}" stroke-width="4" stroke-linejoin="round"><rect x="-118" y="-44" width="128" height="88" rx="34"/>${fing}<rect x="-70" y="-60" width="70" height="24" rx="12" transform="rotate(-26 -70 -48)"/></g>`
    + `<path d="M-6 -30 q6 2 0 6 M-6 -10 q6 2 0 6 M-6 10 q6 2 0 6" fill="none" stroke="${SKL}" stroke-width="2.5" opacity=".7"/>`; }
const camPt = (c, p) => [c[0] * p[0] - (c[0] - 1) * c[1], c[0] * p[1] - (c[0] - 1) * c[2]];
const INK16 = "#3A2E52";
const eye16 = (x, y, r, o = {}) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${o.white || "#fff"}" stroke="${o.line || INK16}" stroke-width="${n2(r * .18)}"/>` + (o.shut ? `<path d="M${n2(x - r * .7)} ${y} Q${x} ${n2(y + r * .5)} ${n2(x + r * .7)} ${y}" stroke="${INK16}" stroke-width="${n2(r * .22)}" fill="none" stroke-linecap="round"/>`
  : `<circle cx="${n2(x + (o.lx || 0) * r * .25)}" cy="${n2(y + r * .05)}" r="${n2(r * .58)}" fill="${INK16}"/><circle cx="${n2(x + (o.lx || 0) * r * .25 - r * .2)}" cy="${n2(y - r * .2)}" r="${n2(r * .2)}" fill="#fff"/>`);
const blink16 = (t, ph = 0) => ((t + ph) % 3.7) < .12;
const xChip16 = (t, t0, x, y, s = 1) => t < t0 ? "" : TF(x, y, spring(t, t0, .4) * s, `<g filter="url(#dropS)"><circle r="30" fill="#fff" stroke="${P.ink}" stroke-width="4"/></g><path d="M-12 -12 L12 12 M12 -12 L-12 12" stroke="${P.ink}" stroke-width="7" stroke-linecap="round"/>`);
const tickChip16 = (t, t0, x, y, s = 1) => t < t0 ? "" : TF(x, y, spring(t, t0, .4) * s, tickBadge(30));
const camOn = (p, z, sx = 960, sy = 540) => Math.abs(z - 1) < .001 ? [1, 960, 540] : [z, (z * p[0] - sx) / (z - 1), (z * p[1] - sy) / (z - 1)];
const camMix = (a, b, u) => { const z = lerp(a[0], b[0], u); const pa = [(960 - a[1]) * (a[0] - 1), (540 - a[2]) * (a[0] - 1)], pb = [(960 - b[1]) * (b[0] - 1), (540 - b[2]) * (b[0] - 1)];
  const ox = lerp(pa[0], pb[0], u), oy = lerp(pa[1], pb[1], u); return Math.abs(z - 1) < .001 ? [1, 960, 540] : [z, 960 - ox / (z - 1), 540 - oy / (z - 1)]; };
const holdHand = (k = 1, rot = 0) => TF(0, 0, k, TF(0, -84, 1, hand15({ curl: .62 }), 90), rot);
const melt = (t, s, name, d = .4) => meltScene(t, s, name, d);   // lib.js (teacher, 25 Nov 2026): the old frame melts, its buddies glide or pop out, never fade
const qMark20 = (t, t0, x, y, r = 50) => t < t0 ? "" : TF(x, y, spring(t, t0, .5) * (1 + .05 * Math.sin(t * 4)), `<g filter="url(#dropS)"><circle r="${r}" fill="url(#gSun)"/></g>${T(0, r * .52, "?", r * 1.56, P.ink)}`);
const fatArrow = (x1, y1, x2, y2, col, w = 22) => { const a = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI, d = Math.hypot(x2 - x1, y2 - y1), hw = w * 1.4, hl = w * 1.6;
  const body = `M0 ${-w / 2} H${n2(d - hl)} V${n2(-hw)} L${n2(d)} 0 L${n2(d - hl)} ${n2(hw)} V${w / 2} H0z`;
  return `<g transform="translate(${n2(x1)} ${n2(y1)}) rotate(${n2(a)})"><path d="${body}" fill="#fff" stroke="#fff" stroke-width="10" stroke-linejoin="round"/><path d="${body}" fill="${col}" stroke="${P.ink}" stroke-width="3" stroke-linejoin="round"/></g>`; };
// a chip joined to the thing it describes by a short line (SERIES_FORMAT 6): col = its colour
const linkChip = (t, t0, x, y, px, py, col, txt, size = 32, t1, ink = "#fff") => { if (t < t0) return ""; const a = t1 === undefined ? 1 : 1 - ramp(t, t1, .25); if (a <= .01) return "";
  return OP(a, pline(x, y, px, py, ramp(t, t0, .2)) + TF(x, y, spring(t, t0, .45), tpill(0, 0, txt, size, col, ink, { w: 700 }))); };
const XDEFS22 = () => `${lg("hsSky", [[0, "#8FD3FF"], [1, "#E6F6FF"]])}${lg("hsWalk", [[0, "#D9CDBA"], [1, "#BBAE98"]])}${lg("hsShade", [[0, "#5A4C44", .55], [1, "#5A4C44", 0]])}${lg("hsWood", [[0, "#D8A465"], [1, "#B47E42"]])}${lg("hsTop", [[0, "#E2B378"], [1, "#C99158"]])}
  ${lg("hsBlock", [[0, "#F2EDE4"], [1, "#DCD3C4"]])}${lg("hsPave", [[0, "#D8D3C6"], [1, "#C3BCAC"]])}${lg("hsInside", [[0, "#6E5A48"], [1, "#4E3E32"]])}
  ${lg("msWall", [[0, "#F4EFE6"], [1, "#E6DDCF"]])}${lg("msFloor", [[0, "#C9C1B4"], [1, "#ABA294"]])}${lg("msBench", [[0, "#DDB27A"], [1, "#B98A52"]])}${lg("msSky", [[0, "#9ED7FF"], [1, "#E8F7FF"]])}${lg("msGrass", [[0, "#9ED77E"], [1, "#6DBB58"]])}
  ${lg("gNail", [[0, "#C9D0D6"], [.5, "#8E979F"], [1, "#6A727A"]])}${lg("gPond", [[0, "#5FA8E8"], [1, "#2F6FC0"]])}${rg("hsSunP", [[0, "#FFF4C8", .55], [1, "#FFF4C8", 0]])}${rg("spot22", [[0, "#FFF6D0", .55], [1, "#FFF6D0", 0]])}`;

/* ================================================================ held props ================================================================ */
// where a buddy's paws are (the sit painting's paws, in front of the chest), for a prop "held" by that buddy: buddy(who, x, y, h, flip)
const pawPt = (who, x, y, h, flip) => { const H = h * (SIZE_K[who] || 1); return [x + (flip ? -1 : 1) * H * ({ pip: .1, basil: .06, momo: .12 })[who], y - H * ({ pip: .36, basil: .35, momo: .42 })[who]]; };

/* ================================================================ THE ANIMALS ================================================================ */
// the WOODPECKER in profile, clinging upright to wood: origin = its feet on the wood, the wood's face to its RIGHT (x > 0); the stiff tail
// propped on the wood below. o.flip: the wood to its LEFT. o.peck (default true): three quick taps, then a rest; o.hop: a little jerk up the
// wood now and then; o.ph: phase; o.chips: bits of bark flick off as it taps
function woodpecker22(t, o = {}) { const ph = o.ph || 0, cyc = (t + ph) % 2.6, pk = o.peck === false ? 0 : (cyc < .55 ? Math.max(0, Math.sin(cyc / .55 * Math.PI * 3)) : 0), sh = blink16(t, ph + .4), br = 1 + .025 * Math.sin(t * 3 + ph);
  const tilt = o.peck === false || cyc > .9 ? 9 * Math.sin(t * .8 + ph) * ss(.9, 1.3, cyc) : 0;
  let s = `<path d="M-15 4 L3 56 L-5 57 L-27 8z" fill="#5A3A22" stroke="#2E1E14" stroke-width="3" stroke-linejoin="round"/><path d="M-12 18 L-1 50" stroke="#8A6A4A" stroke-width="2"/>`;
  s += `<g transform="translate(-20 -18) scale(1 ${n2(br)}) translate(20 18)"><ellipse cx="-20" cy="-20" rx="24" ry="34" fill="#8A5A36" stroke="#3A2618" stroke-width="3.5"/><ellipse cx="-7" cy="-15" rx="12" ry="27" fill="#EFE3CC"/>`
    + [-30, -18, -6, 6].map((y, i) => `<path d="M${-10 + i % 2 * 2} ${y} l5 6" stroke="#B49A78" stroke-width="2.4" stroke-linecap="round"/>`).join("")
    + `<path d="M-42 -42 Q-50 -6 -30 20 Q-18 -2 -20 -38z" fill="#6E4628" stroke="#3A2618" stroke-width="3"/>` + [-30, -18, -6, 6].map((y) => `<path d="M-43 ${y} q7 -3 15 0" stroke="#fff" stroke-width="3.6" stroke-linecap="round" fill="none"/>`).join("") + `</g>`;
  s += `<path d="M-6 -6 L3 -13 M-6 -6 L4 -4 M-8 -1 L0 5 M-8 -1 L-3 9" stroke="#7A7068" stroke-width="3.2" stroke-linecap="round"/>`;
  s += `<g transform="rotate(${n2(pk * 17 + tilt)} -14 -46)"><circle cx="-14" cy="-62" r="20" fill="#8A5A36" stroke="#3A2618" stroke-width="3.5"/><path d="M-33 -65 Q-24 -88 1 -75 Q-12 -71 -33 -61z" fill="#4A2E1A"/>`
    + `<path d="M3 -61 Q-13 -70 -33 -59 Q-31 -53 -25 -53 Q-12 -59 4 -55z" fill="#F4EAD6"/><path d="M-1 -51 Q-8 -43 -21 -44 Q-11 -39 1 -46z" fill="#F4EAD6"/>` + eye16(-8, -65, 7.6, { shut: sh, lx: 1, line: "#2E1E14" })
    + `<path d="M3 -63 L25 -60 L3 -55z" fill="#5E5A56" stroke="#2E2A28" stroke-width="2.5" stroke-linejoin="round"/><path d="M2 -53 q-4 4 -9 2" stroke="#3A2618" stroke-width="2" fill="none" stroke-linecap="round"/><ellipse cx="-3" cy="-53" rx="4" ry="2.4" fill="#F29C8A" opacity=".55"/></g>`;
  if (o.chips && pk > .5) s += [0, 1, 2].map((i) => { const u = ((t * 3 + i * .33) % 1); return `<rect x="${n2(26 + 18 * u + i * 3)}" y="${n2(-62 - 20 * u + 30 * u * u + i * 4)}" width="5" height="3" rx="1" fill="#7A5A3A" opacity="${n2(1 - u)}"/>`; }).join("");
  return s; }
// the woodpecker at a spot in a scene (x, y = its feet), scale k. o.flip: the wood is to its left. o.hop: a jerk up now and then
const woodpeckerAt = (t, x, y, k = .38, o = {}) => { const ph = o.ph || 0, c = (t + ph) % 3.3, hp = o.hop ? 14 * (c < .3 ? Math.sin(c / .3 * Math.PI) : 0) : 0;
  return TF(x, y - hp * k, (o.flip ? -1 : 1) * k, woodpecker22(t, { ...o, chips: o.chips !== false }), o.rot || 0, k); };

// the ANT, side view: origin = between its feet on the ground, facing RIGHT (o.flip: left). o.walk: legs trot; o.wave: feelers wave more
// FACES: right (head / front to the +x side; checked on a still, 2026-11-25)
function ant22(t, o = {}) { const ph = o.ph || 0, wk = o.walk ? t * 11 + ph : ph, fw = Math.sin(t * 3.2 + ph) * (o.wave ? 1 : .4), sh = blink16(t, ph + 1.1), bob = o.walk ? 1.2 * Math.sin(wk * 2) : .6 * Math.sin(t * 2 + ph);
  const leg = (bx, kx, fx, i, side) => { const sw = 5 * Math.sin(wk + i * 2.1 + side * Math.PI); return `<path d="M${bx} -15 L${kx + sw * .4} -27 L${fx + sw} 0" stroke="${side ? "#2A2434" : "#141018"}" stroke-width="${side ? 3.4 : 3}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`; };
  const L = [[8, 16, 24], [3, 4, 4], [-3, -8, -20]];
  let s = L.map(([b, k, f], i) => leg(b, k + 3, f + 3, i, 0)).join("");
  s += `<g transform="translate(0 ${n2(bob)})"><ellipse cx="-34" cy="-16" rx="23" ry="16" fill="#1E1A26" stroke="#0E0B12" stroke-width="2.5"/><ellipse cx="-38" cy="-23" rx="9" ry="4" fill="#5A5266" opacity=".8"/>`
    + `<circle cx="-11" cy="-15" r="5" fill="#1E1A26"/><ellipse cx="5" cy="-17" rx="13" ry="8" fill="#1E1A26" stroke="#0E0B12" stroke-width="2.5" transform="rotate(-10 5 -17)"/>`
    + `<circle cx="27" cy="-22" r="14" fill="#1E1A26" stroke="#0E0B12" stroke-width="2.5"/>` + eye16(31, -25, 6.4, { shut: sh, lx: 1, white: "#fff", line: "#0E0B12" })
    + `<path d="M34 -14 q4 2 7 -1" stroke="#FFB3A8" stroke-width="2" fill="none" stroke-linecap="round"/>`
    + `<path d="M25 -34 L27 ${n2(-50 + fw)} L${n2(44 + 2 * fw)} ${n2(-56 + 3 * fw)}" stroke="#1E1A26" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M31 -33 L34 ${n2(-48 - fw)} L${n2(50 - 2 * fw)} ${n2(-50 - 2 * fw)}" stroke="#2A2434" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>`;
  s += L.map(([b, k, f], i) => leg(b, k, f, i, 1)).join("");
  return s; }
const antAt = (t, x, y, k = .36, o = {}) => { const zz = o.zig ? 6 * Math.sin(t * 2.2 + (o.ph || 0)) : 0; return TF(x + zz * k * 3, y, (o.flip ? -1 : 1) * k, ant22(t, o), o.rot || 0, k); };
// a little line of ants walking (the reveal): the leader at (x, y), n followers behind it along dir (-1: behind to the left)
const antLine = (t, x, y, k, n, dir = -1, o = {}) => { let s = ""; for (let i = n; i >= 0; i--) { const d = i * 62 * k + 6 * Math.sin(t * 2 + i), yy = y + (o.dy || 0) * i; s += antAt(t, x + dir * d, yy, k * (i ? .92 : 1), { walk: true, ph: i * 1.3, flip: dir > 0, wave: !i }); } return s; };

/* ================================================================ the magnet and the stroke ================================================================ */
// the bar magnet placed by its RED (North) end: that end's face centre at (px, py), the bar at angle rot (deg; -90 = the red end straight
// down, the blue end up; -115 = leaning back while it slides to the right). k = its scale (300 x 84 at k 1)
const magAt = (t, px, py, k, rot, o = {}) => { const a = rot * Math.PI / 180, cx = px + Math.cos(a) * 150 * k, cy = py + Math.sin(a) * 150 * k; return TF(cx, cy, k, bar20(t, { glint: false, ...o }), rot); };
// one stroke along a nail from its head (hx, hy) to its tip (tx, ty), p in 0..1: slide (red end on the nail, 0..sl), lift up and away in a
// big curve back over the head (sl..1); H = how high the curve rises. Returns the red end's point and the bar's angle
const strokeAt = (p, hx, hy, tx, ty, H, sl = .5) => { if (p < sl) { const u = eio(p / sl); return { x: lerp(hx, tx, u), y: lerp(hy, ty, u), rot: -118, on: 1 }; }
  const u = eio((p - sl) / (1 - sl)); return { x: lerp(tx, hx, u), y: lerp(ty, hy, u) - H * Math.sin(Math.PI * u), rot: lerp(-118, -62, Math.sin(Math.PI * u * .5)) * (u < .5 ? 1 : 1) + (u > .5 ? lerp(0, -56, (u - .5) * 2) : 0), on: 0 }; };
// Basil's wrong way: rubbing back and forth along the nail without lifting (p = time), with the red end, or flipped (blue end)
const rubAt = (t, hx, hy, tx, ty, sp = 9) => { const u = .5 + .5 * Math.sin(t * sp); return { x: lerp(hx + (tx - hx) * .08, tx - (tx - hx) * .08, u), y: lerp(hy, ty, u), rot: -90 + 16 * Math.cos(t * sp) }; };
// motion lines behind something moving (x, y) in direction ang (deg)
const motion22 = (x, y, ang, k = 1, col = "#fff") => { const a = ang * Math.PI / 180; let s = ""; for (let i = -1; i <= 1; i++) { const ox = -Math.cos(a) * (40 + 14 * Math.abs(i)) * k - Math.sin(a) * i * 16 * k, oy = -Math.sin(a) * (40 + 14 * Math.abs(i)) * k + Math.cos(a) * i * 16 * k;
  s += `<path d="M${n2(x + ox)} ${n2(y + oy)} l${n2(-Math.cos(a) * 46 * k)} ${n2(-Math.sin(a) * 46 * k)}" stroke="${col}" stroke-width="${n2(6 * k)}" stroke-linecap="round" opacity=".75"/>`; } return s; };

/* ================================================================ the clips ================================================================ */
// a bunch of plain steel clips hanging from a point (x, y) (a nail's tip, a magnet's end): n clips, one below another and side by side,
// swaying a little. o.k: scale; o.t0 + o.from [x, y]: the clips JUMP up from there to their places (one after another, 0.07 s apart);
// o.drop + o.to [x, y]: they fall back down there (seen falling) and then lie still in the tray; o.ang: the hang direction (deg, 90 = down)
function clipBunch(t, x, y, n, o = {}) { const k = o.k || 1; let s = "";
  for (let j = 0; j < n; j++) { const col = [0, 1, -1][j % 3], row = Math.floor(j / 3), sw = 5 * Math.sin(t * 2 + j * .9) * (row + 1) / 2;
    let px = x + (col * 19 * (1 + row * .3) + sw) * k, py = y + (24 + row * 40 + Math.abs(col) * 4) * k, a = 90 + col * 22 + sw * 1.5;
    if (o.t0 !== undefined) { const ts = o.t0 + j * .07, u = clamp((t - ts) / .28); if (t < ts) continue; if (u < 1) { const fx = (o.from || [x, y + 200])[0] + (j % 5 - 2) * 14 * k, fy = (o.from || [x, y + 200])[1]; const e = eo(u); px = lerp(fx, px, e); py = lerp(fy, py, e) - 30 * k * Math.sin(Math.PI * u); a = lerp(20 * (j % 3), a, e); } }
    if (o.drop !== undefined && t >= o.drop + j * .04) { const u = clamp((t - o.drop - j * .04) / .35), tx = (o.to || [x, y + 200])[0] + (j % 5 - 2) * 18 * k, ty = (o.to || [x, y + 200])[1] + (j % 2) * 6 * k; px = lerp(px, tx, u * u); py = lerp(py, ty, u * u); a = lerp(a, 15 * ((j * 7) % 5 - 2), u); }
    s += clip21(px, py, a, .9 * k); }
  return s; }
// a shallow TRAY of plain steel clips (origin = the tray's front middle, 360 wide at k 1). o.n: how many lie in it (default 22); o.label
function trayClips22(t, x, y, k = 1, o = {}) { const n = o.n === undefined ? 22 : o.n; let c = "";
  for (let i = 0; i < n; i++) c += clip21(-130 + (i * 53) % 260 + 14 * hash(i, 2), -50 + Math.floor(i / 5) * 9 + 5 * hash(i, 3), 160 * hash(i, 4) - 80, .78);
  return TF(x, y, k, `<ellipse cx="0" cy="8" rx="200" ry="16" fill="${P.ink}" opacity=".18" filter="url(#b4)"/><path d="M-180 -70 H180 L166 0 H-166z" fill="#DDE3E8" stroke="#7E8A94" stroke-width="5" stroke-linejoin="round"/><path d="M-176 -66 H176" stroke="#fff" stroke-width="4" opacity=".7"/>`
    + `<path d="M-160 -58 H160 L152 -8 H-152z" fill="#C8D0D6"/>` + c + (o.label ? TF(0, 38, 1, tpill(0, 0, "steel paper clips", 26, "#fff", P.ink, { w: 700 })) : "")); }

/* ================================================================ the props ================================================================ */
// the magnet's small cardboard BOX (origin = its bottom middle; 340 x 120 at k 1). o.lid 0 open .. 1 shut; o.mag: the magnet lies inside
// (seen only while the lid is open); "away" = in the box, lid shut (the magnet is then gone from the shot: never a ghost)
const magBox22 = (t, x, y, k = 1, o = {}) => { const lid = o.lid === undefined ? 1 : o.lid;
  return TF(x, y, k, `<ellipse cx="0" cy="4" rx="190" ry="14" fill="${P.ink}" opacity=".2" filter="url(#b4)"/><path d="M-170 -100 H170 L156 0 H-156z" fill="#7A5230"/>`
    + (o.mag && lid < .95 ? TF(0, -84, .9, bar20(t, { glint: false })) : "")
    + `<path d="M-156 -60 H156 V0 H-156z" fill="#C99A62" stroke="#7A5230" stroke-width="5"/><path d="M-170 -100 L-156 -60 H156 L170 -100" fill="#B68650" stroke="#7A5230" stroke-width="5" stroke-linejoin="round"/>`
    + T(0, -20, "magnet box", 26, "#5A3A1E", { w: 600 })
    + `<g transform="translate(0 -100) scale(1 ${n2(Math.cos(Math.PI * .5 * (1 - lid)) * (lid > .5 ? 1 : 1))})"><path d="M-174 ${n2(-56 * (1 - lid))} H174 L170 0 H-170z" fill="#D8AE76" stroke="#7A5230" stroke-width="5" stroke-linejoin="round"/></g>`
    + (lid < .5 ? `<path d="M-172 -100 L-176 ${n2(-100 - 120 * (1 - lid * 2))} H176 L172 -100z" fill="#D8AE76" stroke="#7A5230" stroke-width="5" stroke-linejoin="round" opacity=".95"/>` : "")); };
// a small brown PAPER BAG of iron nails (origin = its bottom middle), a few heads peeking out
const paperBag22 = (x, y, k = 1) => TF(x, y, k, `<ellipse cx="0" cy="4" rx="110" ry="12" fill="${P.ink}" opacity=".2" filter="url(#b4)"/><path d="M-90 0 L-80 -190 H80 L90 0z" fill="#C9A06E" stroke="#8A6438" stroke-width="5" stroke-linejoin="round"/>`
  + `<path d="M-80 -190 L-72 -214 H72 L80 -190" fill="#B8905E" stroke="#8A6438" stroke-width="5" stroke-linejoin="round"/><path d="M-40 -170 L-36 -10 M38 -170 L34 -10" stroke="#A8804E" stroke-width="3" opacity=".6"/>`
  + [[-30, -214, -14], [4, -220, 8], [34, -212, 20]].map(([dx, dy, a]) => `<g transform="translate(${dx} ${dy}) rotate(${a})"><rect x="-4" y="-30" width="8" height="34" fill="#8E979F" stroke="#454C54" stroke-width="2.5"/><ellipse cx="0" cy="-31" rx="11" ry="4" fill="#A7B0B8" stroke="#454C54" stroke-width="2.5"/></g>`).join("")
  + TF(0, -96, 1, `<rect x="-64" y="-26" width="128" height="52" rx="6" fill="#FFF8EA" stroke="#8A6438" stroke-width="3"/>` + T(0, -2, "iron", 22, P.ink) + T(0, 20, "nails", 22, P.ink)));
// a new STEEL SCREWDRIVER lying level (origin = its middle, 320 long at k 1): a plastic handle at the LEFT, a plain steel shaft, the flat
// tip at the RIGHT (at local x 160)
const screwdriver22 = (x, y, k = 1, rot = 0) => TF(x, y, k, `<path d="M-160 -22 Q-170 0 -160 22 H-50 Q-40 0 -50 -22z" fill="#E8533A" stroke="#8A2A1E" stroke-width="4.5"/><path d="M-150 -12 H-60 M-150 0 H-60 M-150 12 H-60" stroke="#B8402C" stroke-width="3"/><path d="M-154 -15 H-58" stroke="#FFB2A0" stroke-width="3" opacity=".7"/>`
  + `<rect x="-52" y="-12" width="22" height="24" rx="4" fill="#9AA3AB" stroke="#454C54" stroke-width="3.5"/><rect x="-32" y="-7" width="178" height="14" rx="3" fill="url(#gNail)" stroke="#454C54" stroke-width="3.5"/><path d="M146 -7 L162 -3 V3 L146 7z" fill="#9AA3AB" stroke="#454C54" stroke-width="3.5" stroke-linejoin="round"/><path d="M-28 -3 H142" stroke="#fff" stroke-width="2.4" opacity=".8"/>`, rot);
// a coil of thin bare COPPER WIRE (origin = its middle, about 300 wide): loops and one straight end (the "tip" at local x 150)
const copper22 = (x, y, k = 1, rot = 0) => { let s = `<path d="M40 0 H150" stroke="#8A4A1E" stroke-width="7" stroke-linecap="round"/><path d="M40 0 H150" stroke="#D97A3A" stroke-width="3.6" stroke-linecap="round"/>`;
  for (let i = 0; i < 6; i++) { const cx = -100 + i * 26; s += `<ellipse cx="${cx}" cy="0" rx="22" ry="40" fill="none" stroke="#8A4A1E" stroke-width="7"/><ellipse cx="${cx}" cy="0" rx="22" ry="40" fill="none" stroke="#D97A3A" stroke-width="3.6"/><path d="M${cx - 14} -26 q6 -8 14 -10" stroke="#FFD2A8" stroke-width="2" fill="none"/>`; }
  return TF(x, y, k, s, rot); };
// a folded strip of ALUMINIUM FOIL (origin = its middle, 300 long): silver, crinkled; the "tip" at local x 150
const foil22 = (x, y, k = 1, rot = 0) => TF(x, y, k, `<path d="M-150 -16 L-110 -20 L-70 -14 L-30 -21 L10 -15 L50 -20 L90 -14 L130 -19 L150 -12 L150 14 L120 19 L80 13 L40 20 L0 14 L-40 19 L-80 13 L-120 18 L-150 14z" fill="#D6DCE2" stroke="#6E7882" stroke-width="3.5" stroke-linejoin="round"/>`
  + `<path d="M-120 -12 L-110 12 M-70 -10 L-80 10 M-30 -15 L-40 12 M10 -10 L0 12 M50 -14 L40 14 M90 -10 L80 10 M130 -12 L120 14" stroke="#9AA4AE" stroke-width="2.2"/><path d="M-140 -8 L140 -10" stroke="#fff" stroke-width="3" opacity=".8"/>`, rot);
// a plain WOODEN CHOPSTICK (origin = its middle, 300 long): thick end at the LEFT, the thin end (the "tip") at local x 150
const chopstick22 = (x, y, k = 1, rot = 0) => TF(x, y, k, `<path d="M-150 -9 L150 -4 L150 4 L-150 9z" fill="#D9A86A" stroke="#8A5A2A" stroke-width="3.5" stroke-linejoin="round"/><path d="M-140 -4 L140 -1.5" stroke="#F2D2A0" stroke-width="2.4"/><path d="M-100 3 L-40 2 M10 1 L80 1" stroke="#B47E42" stroke-width="1.6"/>`, rot);
// a name tag on a little stand / string (origin = the tag's middle)
const nameTag22 = (x, y, txt, col = "#fff", ink = P.ink, size = 30) => TF(x, y, 1, tpill(0, 0, txt, size, col, ink, { w: 700 }));

/* ---------- Part 1's build: OUR FISHING GAME (a clipboard on a little wooden easel; origin = the easel's feet on the table; about 430 tall
   at k 1). It fills on its marks (rod1, try, chipfar, list); once filled, a box stays filled. o.all: everything filled (nyk) ---------- */
const LIST22 = [["iron nail", 1], ["steel screwdriver", 1], ["copper wire", 0], ["aluminium foil", 0], ["wooden chopstick", 0]];
// FACES: left (head / front to the -x side; checked on a still, 2026-11-25)
const fishP = (x, y, k, col, big) => TF(x, y, k, `<path d="M-54 0 Q-10 -40 40 -6 L66 -26 L60 0 L66 26 L40 6 Q-10 40 -54 0z" fill="${col}" stroke="${P.ink}" stroke-width="4" stroke-linejoin="round"/><path d="M-10 -28 Q-4 0 -10 28" stroke="${P.ink}" stroke-width="3" fill="none" opacity=".4"/>`
  + `<circle cx="-30" cy="-8" r="7" fill="#fff" stroke="${P.ink}" stroke-width="2.5"/><circle cx="-31" cy="-8" r="3.6" fill="${P.ink}"/><path d="M-44 6 q6 5 12 1" stroke="${P.ink}" stroke-width="2.5" fill="none" stroke-linecap="round"/>`)
  + clip21(x - 58 * k, y + 2 * k, 0, .62 * k) + (big ? clip21(x - 58 * k, y + 16 * k, 8, .62 * k) : "");
function fishBoard22(t, x, y, k = 1, o = {}) { const on = (m) => o.all || t >= MKS(m), f = (m) => o.all ? 1 : ss(MKS(m) - .1, MKS(m) + .4, t);
  let s = `<ellipse cx="0" cy="6" rx="190" ry="14" fill="${P.ink}" opacity=".2" filter="url(#b4)"/><path d="M-150 0 L-120 -440 M150 0 L120 -440 M0 -10 L0 -420" stroke="#8A5A36" stroke-width="13" stroke-linecap="round"/><rect x="-200" y="-96" width="400" height="16" rx="6" fill="#7A4A26"/>`
    + `<g filter="url(#drop)"><rect x="-210" y="-560" width="420" height="470" rx="18" fill="#B98A58" stroke="#7A5230" stroke-width="6"/></g><rect x="-192" y="-540" width="384" height="432" rx="6" fill="#FBFBF7"/>`
    + `<rect x="-52" y="-578" width="104" height="38" rx="9" fill="#AEB6BE" stroke="#4E565E" stroke-width="4"/>` + T(0, -500, "OUR FISHING GAME", 30, P.ink) + T(-30, -472, "Friday's class party", 20, P.ink, { w: 500 });
  s += fishP(-130, -440, .5, "#FFB347") + `<path d="M-182 -492 L-112 -470" stroke="#B47E42" stroke-width="5" stroke-linecap="round"/>` + T(70, -436, "3 rods · 1 magnet!", 22, "#D84A3A");
  ["Rod 1", "Rod 2", "Rod 3"].forEach((r, i) => { const bx = -124 + i * 124; s += `<rect x="${bx - 56}" y="-408" width="112" height="118" rx="9" fill="#fff" stroke="${P.ink}" stroke-width="3.5"/>` + T(bx, -386, r, 20, P.ink); });
  if (on("rod1")) s += OP(f("rod1"), nail21(-124, -348, .26) + clipBunch(t, -124 + 39, -348, 3, { k: .42 }) + T(-124, -298, "attracts clips ✓", 13, GOODC, { w: 700 }));
  if (on("try")) s += TF(0, -346, o.all ? 1 : spring(t, MKS("try") + .3, .4), `<rect x="-52" y="-34" width="104" height="66" rx="5" fill="#FFF3A8" stroke="#C9A800" stroke-width="3"/>` + T(0, -6, "1 stroke:", 17, P.ink, { w: 700 }) + T(0, 16, "done!", 17, P.ink, { w: 700 }), -5);
  if (o.all) s += OP(1, nail21(124, -348, .26) + clipBunch(t, 124 + 39, -348, 4, { k: .42 }) + T(124, -298, "30 strokes ✓", 13, GOODC, { w: 700 }));
  if (on("chipfar")) s += TF(0, -262, o.all ? 1 : spring(t, MKS("chipfar") + .2, .4), tpill(0, 0, "Test it with the magnet far away!", 17, GOODC, "#fff", { w: 700 }));
  s += T(0, -222, "Which can be magnetised?", 22, P.ink);
  LIST22.forEach(([n_, ok], i) => { const ly = -196 + i * 19, sh = on("list") && (o.all || t >= MKS("list") + .25 * i); s += `<rect x="-150" y="${ly - 7}" width="14" height="14" rx="3" fill="#fff" stroke="${P.ink}" stroke-width="2.4"/>` + `<text x="-128" y="${ly + 6}" font-family="Fredoka" font-weight="500" font-size="16" fill="${P.ink}">${n_}</text>`
    + (sh ? T(-143, ly + 6, ok ? "✓" : "✗", 19, ok ? GOODC : "#D84A3A") : ""); });
  return TF(x, y, k, s); }

/* ---------- Part 2's build: THE FISHING POND (a big shallow cardboard box painted blue; origin = its bottom middle; 700 x 190 at k 1),
   paper fish each with ONE plain steel clip on its nose, the BIG gold fish with TWO clips (o.big: it lies in the pond; false when lifted).
   Rods (wooden chopsticks with string) lean on the rim: o.rods = [[n, hookKind], ...] ---------- */
const FISHC = ["#FF8A5B", "#7FE58F", "#F08CC0", "#9FD0FF", "#C9A6FF"];
function pond22(t, x, y, k = 1, o = {}) { let s = `<ellipse cx="0" cy="8" rx="380" ry="20" fill="${P.ink}" opacity=".2" filter="url(#b4)"/><path d="M-340 -150 H340 L360 -110 H-360z" fill="#3A74C4" stroke="#1E4E92" stroke-width="5" stroke-linejoin="round"/>`
    + `<path d="M-330 -146 H330 L346 -116 H-346z" fill="url(#gPond)"/>` + [0, 1, 2].map((i) => `<path d="M${-260 + i * 210 + 20 * Math.sin(t + i)} -130 q20 -6 40 0" stroke="#fff" stroke-width="3" fill="none" opacity=".5"/>`).join("");
  [[-90, -132, 0], [40, -126, 1], [160, -134, 2], [280, -126, 3]].forEach(([fx, fy, c]) => { s += fishP(fx + 4 * Math.sin(t * 1.4 + c), fy, .62, FISHC[c]); });
  if (o.big !== false) s += fishP(-250, -130, 1.0, "#FFC83A", true);
  s += `<path d="M-360 -110 H360 L340 0 H-340z" fill="#4A86D6" stroke="#1E4E92" stroke-width="5" stroke-linejoin="round"/><path d="M-352 -100 H352" stroke="#B9D6F6" stroke-width="4" opacity=".7"/><path d="M-340 -110 L-330 0 M340 -110 L330 0" stroke="#8A6438" stroke-width="4" opacity=".6"/>`
    + TF(-150, -54, 1, `<rect x="-150" y="-26" width="300" height="52" rx="8" fill="#FFF8EA" stroke="#8A6438" stroke-width="3" transform="rotate(-2)"/>` + T(0, 11, "THE FISHING POND", 28, "#2F6FC0"));
  for (const [n_, kind, a, fish] of o.rods || []) { const bx = 20 + (n_ - 1) * 140, ang = a || -58; s += rod22(t, bx, -100, ang, 320, { hook: kind, label: "Rod " + n_, fish }); }
  return TF(x, y, k, s); }
// a ROD: a wooden chopstick from its handle end (x, y) at angle ang (deg), length L; a string from its tip down; the hook at the string's
// end: "nail" (the magnetised nail, tied by its head, point down), "none"; o.str: the string's length; o.fish: the fish hanging on the hook
// (a colour, or "big"); o.label
function rod22(t, x, y, ang, L, o = {}) { const a = ang * Math.PI / 180, tx = x + Math.cos(a) * L, ty = y + Math.sin(a) * L, sl = o.str || 120, sw = 4 * Math.sin(t * 1.7 + x * .01);
  let s = `<path d="M${n2(x)} ${n2(y)} L${n2(tx)} ${n2(ty)}" stroke="#8A5A2A" stroke-width="13" stroke-linecap="round"/><path d="M${n2(x)} ${n2(y)} L${n2(tx)} ${n2(ty)}" stroke="#D9A86A" stroke-width="8" stroke-linecap="round"/>`;
  const hx = tx + sw, hy = ty + sl;
  s += `<path d="M${n2(tx)} ${n2(ty)} Q${n2(tx + sw * 2)} ${n2(ty + sl / 2)} ${n2(hx)} ${n2(hy)}" stroke="${P.ink}" stroke-width="3" fill="none"/>`;
  if (o.hook === "nail") { s += nail21(hx, hy + 48, .32, 90); const tip = [hx, hy + 48 + 48];
    if (o.fish) s += `<g transform="translate(${n2(tip[0] + 6)} ${n2(tip[1] + 30)}) rotate(-80)">${fishP(0, 0, o.fish === "big" ? 1 : .62, o.fish === "big" ? "#FFC83A" : o.fish, o.fish === "big")}</g>`;
    if (o.clips) s += clipBunch(t, tip[0], tip[1], o.clips, { k: .5 }); }
  if (o.label) s += TF(x + Math.cos(a) * 40, y + Math.sin(a) * 40 - 30, 1, tpill(0, 0, o.label, 20, "#fff", P.ink, { w: 700 }));
  return s; }
// the FISH CAUGHT whiteboard on a small stand (origin = the stand's feet; about 300 x 260): rows Rod 1 · Rod 2 · Rod 3, a column "strokes";
// `chart` fills Rod 3's row; Part 1's three Rod boxes drawn small in its corner, all filled. o.all
function wb22(t, x, y, k = 1, o = {}) { const on = o.all || t >= MKS("chart"), f = o.all ? 1 : ss(MKS("chart") - .1, MKS("chart") + .5, t);
  let s = `<ellipse cx="0" cy="4" rx="150" ry="12" fill="${P.ink}" opacity=".2" filter="url(#b4)"/><path d="M-110 0 L-90 -130 M110 0 L90 -130" stroke="#8A949E" stroke-width="10" stroke-linecap="round"/>`
    + `<g filter="url(#dropS)"><rect x="-170" y="-380" width="340" height="260" rx="10" fill="#FBFBF7" stroke="#8A949E" stroke-width="8"/></g>` + T(-20, -340, "FISH CAUGHT", 30, P.ink) + T(108, -306, "strokes", 18, P.ink, { w: 500 })
    + `<path d="M-150 -296 H150 M48 -320 V-136" stroke="#C9D0D8" stroke-width="3"/>` + ["Rod 1", "Rod 2", "Rod 3"].map((r, i) => T(-104, -262 + i * 46, r, 22, P.ink)).join("")
    + T(100, -262, "10", 22, "#5A6070", { w: 600 }) + T(100, -216, "20", 22, "#5A6070", { w: 600 });
  if (on) s += OP(f, T(100, -170, "30", 26, GOODC) + TF(-10, -170, 1, fishP(0, 0, .3, "#FFC83A", true)) + T(-2, -134, "the big fish!", 17, GOODC, { w: 700 }));
  if (on) s += OP(f, [0, 1, 2].map((i) => `<rect x="${-160 + i * 28}" y="-378" width="24" height="24" rx="3" fill="#fff" stroke="${P.ink}" stroke-width="2"/>` + T(-148 + i * 28, -360, "✓", 16, GOODC)).join(""));
  return TF(x, y, k, s); }

/* ---------- Pip's POSTER for the class party (the Showdown): on a small easel (origin = the easel's feet; about 620 tall at k 1); three
   ruled lines each with a small drawing; lit on l1 / l2 / l3; line 3 struck through (KEPT) at `strike`, the green rewrite below it at
   `rewrite`. o.lit [a, b, c]; o.strike 0..1; o.fix 0..1 ---------- */
const POSTER22 = ["1  Stroke from the head to the tip, with the red end.", "2  Lift the magnet away, back to the head.", "3  Halfway, turn the magnet round and use the blue end too, for more strength."];
function poster22(t, x, y, k = 1, o = {}) { const lit = o.lit || [1, 1, 1], st = o.strike || 0, fx = o.fix || 0, Y = [-500, -360, -220];
  let s = `<ellipse cx="0" cy="6" rx="280" ry="16" fill="${P.ink}" opacity=".2" filter="url(#b4)"/><path d="M-220 0 L-190 -660 M220 0 L190 -660 M0 -20 L0 -640" stroke="#8A5A36" stroke-width="15" stroke-linecap="round"/><rect x="-290" y="-70" width="580" height="18" rx="7" fill="#7A4A26"/>`
    + `<g filter="url(#drop)"><rect x="-380" y="-670" width="760" height="600" rx="14" fill="#FFFDF6" stroke="#D9C9A8" stroke-width="6"/></g>` + T(0, -612, "How to make a fishing hook", 40, P.pip) + `<path d="M-330 -590 H330" stroke="${P.pip}" stroke-width="3"/>`;
  POSTER22.forEach((ln, i) => { const y0 = Y[i], col = lit[i] > .5 ? P.ink : "#8A939C", ws = wrap(ln, 30, 470, 600);
    if (lit[i] > .02) s += `<rect x="-366" y="${y0 - 40}" width="732" height="${ws.length * 36 + 22}" rx="10" fill="${P.sun}" opacity="${n2(.3 * lit[i])}"/>`;
    ws.forEach((w, j) => { s += `<text x="-350" y="${y0 + j * 36}" font-family="Fredoka" font-weight="600" font-size="30" fill="${col}">${esc(w)}</text>`; });
    s += `<path d="M-360 ${y0 + ws.length * 36 - 6} H360" stroke="#E6DCC6" stroke-width="2"/>`;
    const px = 270, py = y0 - 4;
    if (i === 0) s += nail21(px, py + 10, .38) + magAt(t, px - 50, py, .23, -115) + `<path d="M${px - 42} ${py + 30} H${px + 46}" stroke="${STROKEC}" stroke-width="6" stroke-linecap="round"/><path d="M${px + 36} ${py + 22} L${px + 48} ${py + 30} L${px + 36} ${py + 38}" stroke="${STROKEC}" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
    if (i === 1) s += nail21(px, py + 20, .38) + `<path d="M${px + 52} ${py + 6} C${px + 52} ${py - 44} ${px - 52} ${py - 44} ${px - 52} ${py + 6}" stroke="${LIFTC}" stroke-width="5" stroke-dasharray="8 7" fill="none" stroke-linecap="round"/>`;
    if (i === 2) s += nail21(px, py + 22, .38) + magAt(t, px + 10, py + 10, .23, -65, { flip: true }) + T(px + 74, py - 24, "↻", 34, P.ink); });
  if (st > .01) s += `<path d="M-360 ${Y[2] - 12} L${n2(-360 + 720 * st)} ${Y[2] + 56}" stroke="#D84A3A" stroke-width="8" stroke-linecap="round"/><path d="M-360 ${Y[2] + 50} L${n2(-360 + 720 * st)} ${Y[2] - 6}" stroke="#D84A3A" stroke-width="8" stroke-linecap="round" opacity="${n2(clamp(st * 2 - 1))}"/>`;
  if (fx > .01) s += OP(fx, `<rect x="-366" y="-170" width="732" height="86" rx="12" fill="#E6F6E8" stroke="${GOODC}" stroke-width="4"/>` + `<text x="-350" y="-136" font-family="Fredoka" font-weight="700" font-size="28" fill="${GOODC}">Keep stroking with the red</text><text x="-350" y="-100" font-family="Fredoka" font-weight="700" font-size="28" fill="${GOODC}">end, every time.</text>`
    + nail21(270, -112, .38) + magAt(t, 220, -122, .23, -112) + [0, 1].map((j) => `<path d="M228 ${-150 + j * 12} H314" stroke="${STROKEC}" stroke-width="5" stroke-linecap="round"/><path d="M306 ${-156 + j * 12} L316 ${-150 + j * 12} L306 ${-144 + j * 12}" stroke="${STROKEC}" stroke-width="5" fill="none" stroke-linecap="round"/>`).join(""));
  return TF(x, y, k, s); }
// the small rewrite picture beside the poster (the red end on the head, three one-way arrows)
const rewritePic = (t, x, y, k = 1) => TF(x, y, k, `<g filter="url(#dropS)"><rect x="-200" y="-110" width="400" height="220" rx="24" fill="#E6F6E8" stroke="${GOODC}" stroke-width="6"/></g>` + nail21(10, 40, .9) + magAt(t, -118, 24, .42, -112)
  + [0, 1, 2].map((i) => `<path d="M-110 ${-30 - i * 22} H110" stroke="${STROKEC}" stroke-width="9" stroke-linecap="round"/><path d="M96 ${-40 - i * 22} L114 ${-30 - i * 22} L96 ${-20 - i * 22}" stroke="${STROKEC}" stroke-width="9" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`).join("") + T(0, 96, "red end, every time", 26, GOODC));
