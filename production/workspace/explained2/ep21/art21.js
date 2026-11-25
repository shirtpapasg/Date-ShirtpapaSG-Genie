// art21.js: EP21's own art, part A (Stage 2, drawn 2026-11-24): small helpers, the two hidden animals, the magnets, the compass and the props.
// Loaded after tests.js / ep20dare.js, before sets21.js, lc21.js, common.js, p1.js / p2.js.
// Helpers copied UNCHANGED from ../ep20/art20.js (EP20 is finished and LIVE; copied here, never edited there): hand15, bird15, camPt, eye16,
// blink16, xChip16, tickChip16, camOn, camMix, holdHand, linkChip, melt, qMark20, fatArrow, ppArrows, chevrons.

/* ================================================================ helpers (copied) ================================================================ */
const SKN = "#F2C29B", SKL = "#C98F66";
function hand15(o = {}) { const c = o.curl || 0, sl = o.sleeve || "#5B7BD6", sd = o.sleeveD || "#3A56A8", F = [[-29, 70], [-9, 80], [11, 74], [29, 58]];
  const fing = F.map(([y, L], i) => { const cc = o.point && i === 0 ? 0 : (o.point ? .75 : c), l = L * (1 - .6 * cc) + 10; return `<rect x="-10" y="${y - 10}" width="${n2(l)}" height="20" rx="10" transform="rotate(${n2((i - 1.5) * 4)} 0 ${y})"/>`; }).join("");
  return `<rect x="-330" y="-54" width="230" height="108" rx="20" fill="${sl}" stroke="${sd}" stroke-width="5"/><g fill="${SKN}" stroke="${SKL}" stroke-width="4" stroke-linejoin="round"><rect x="-118" y="-44" width="128" height="88" rx="34"/>${fing}<rect x="-70" y="-60" width="70" height="24" rx="12" transform="rotate(-26 -70 -48)"/></g>`
    + `<path d="M-6 -30 q6 2 0 6 M-6 -10 q6 2 0 6 M-6 10 q6 2 0 6" fill="none" stroke="${SKL}" stroke-width="2.5" opacity=".7"/>`; }
// FACES: right (head / front to the +x side; checked on a still, 2026-11-25)
const bird15 = (t, k = 1, ph = 0) => { const hp = Math.max(0, Math.sin(t * 2.3 + ph)) > .85 ? 8 : 0, pk = Math.max(0, Math.sin(t * 1.7 + ph)) > .9 ? 12 : 0;
  return TF(0, -hp, k, `<path d="M-4 0 l-4 -14 M6 0 l2 -14" stroke="#8A5A36" stroke-width="3"/><ellipse cx="0" cy="-22" rx="20" ry="14" fill="#B98A5A"/><path d="M-14 -24 Q-36 -30 -40 -18 Q-26 -16 -14 -18z" fill="#7E5A3A"/><g transform="rotate(${pk} 14 -30)"><circle cx="14" cy="-32" r="11" fill="#9A6E44"/><path d="M24 -33 l9 3 l-9 3z" fill="#F2C14E"/><circle cx="17" cy="-35" r="2.6" fill="#2B2147"/></g><ellipse cx="2" cy="-18" rx="11" ry="7" fill="#E9D7BC"/>`); };
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
// a chip joined to the thing it describes by a short line (SERIES_FORMAT 6). k: 0 pull (green), 1 push (magenta), 2 ink, 3 "not this" blue
const linkChip = (t, t0, x, y, px, py, k, txt, size = 32, t1) => { if (t < t0) return ""; const a = t1 === undefined ? 1 : 1 - ramp(t, t1, .25); if (a <= .01) return "";
  return OP(a, pline(x, y, px, py, ramp(t, t0, .2)) + TF(x, y, spring(t, t0, .45), tpill(0, 0, txt, size, [PULLC, PUSHC, P.ink, WEAKC, GOODC][k], "#fff", { w: 700 }))); };
const melt = (t, s, name, d = .4) => meltScene(t, s, name, d);   // lib.js (teacher, 25 Nov 2026): the old frame melts, its buddies glide or pop out, never fade
const qMark20 = (t, t0, x, y, r = 50) => t < t0 ? "" : TF(x, y, spring(t, t0, .5) * (1 + .05 * Math.sin(t * 4)), `<g filter="url(#dropS)"><circle r="${r}" fill="url(#gSun)"/></g>${T(0, r * .52, "?", r * 1.56, P.ink)}`);
/* ================================================================ arrows: the PULL (green, towards each other) and the PUSH (magenta, apart) ================================================================ */
// one thick arrow from (x1, y1) to (x2, y2): white rim, coloured body, an arrowhead at (x2, y2)
const fatArrow = (x1, y1, x2, y2, col, w = 22) => { const a = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI, d = Math.hypot(x2 - x1, y2 - y1), hw = w * 1.4, hl = w * 1.6;
  const body = `M0 ${-w / 2} H${n2(d - hl)} V${n2(-hw)} L${n2(d)} 0 L${n2(d - hl)} ${n2(hw)} V${w / 2} H0z`;
  return `<g transform="translate(${n2(x1)} ${n2(y1)}) rotate(${n2(a)})"><path d="${body}" fill="#fff" stroke="#fff" stroke-width="10" stroke-linejoin="round"/><path d="${body}" fill="${col}" stroke="${P.ink}" stroke-width="3" stroke-linejoin="round"/></g>`; };
// a PULL pair: two arrows on either side of the gap at (cx, cy), pointing IN; a PUSH pair: two arrows from the gap pointing OUT. dir: "h" / "v"
function ppArrows(t, cx, cy, kind, k = 1, o = {}) { if (k < .02) return ""; const g = o.gap || 30, L = o.len || 90, w = o.w || 22, pl = 1 + .06 * Math.sin(t * 7), v = o.dir === "v";
  const P_ = (a, b) => v ? [cx, cy + a, cx, cy + b] : [cx + a, cy, cx + b, cy];
  const arr = kind === "push" ? [P_(-g, -g - L), P_(g, g + L)] : [P_(-g - L, -g), P_(g + L, g)];
  return OP(Math.min(1, k), `<g transform="translate(${cx} ${cy}) scale(${n2(Math.min(1, k) * pl)}) translate(${-cx} ${-cy})">` + arr.map(([a, b, c, d]) => fatArrow(a, b, c, d, kind === "push" ? PUSHC : PULLC, w)).join("") + `</g>`); }
// running chevrons (the push or the pull moving through the air), from (x1, y1) to (x2, y2)
const chevrons = (t, x1, y1, x2, y2, k = 1, col = PUSHC, n = 3, sz = 1) => { if (k < .02) return ""; const a = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI; let s = "";
  for (let i = 0; i < n; i++) { const u = ((i / n) + t * .9) % 1, x = lerp(x1, x2, u), y = lerp(y1, y2, u), o = Math.sin(Math.PI * u);
    s += `<g transform="translate(${n2(x)} ${n2(y)}) rotate(${n2(a)}) scale(${sz})" opacity="${n2(o * k)}"><path d="M-14 -16 L6 0 L-14 16" fill="none" stroke="#fff" stroke-width="13" stroke-linecap="round" stroke-linejoin="round"/><path d="M-14 -16 L6 0 L-14 16" fill="none" stroke="${col}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/></g>`; }
  return s; };


/* ================================================================ EP21's gradients ================================================================ */
const XDEFS21 = () => `${lg("fdSky", [[0, "#86C3EC"], [.62, "#CFE6F0"], [1, "#FCE6C2"]])}${lg("fdGrass", [[0, "#8CC867"], [1, "#5FA947"]])}${lg("fdTrack", [[0, "#C9573E"], [1, "#B24A34"]])}
  ${lg("ubSky", [[0, "#6FB8F0"], [.7, "#BFE3FA"], [1, "#EAF7FF"]])}${lg("ubSea", [[0, "#5FA9C9"], [.5, "#3E8FB4"], [1, "#2E7AA0"]])}${lg("ubDeck", [[0, "#C79A66"], [1, "#A77A48"]])}${lg("ubShallow", [[0, "#7CC4C8"], [1, "#4FA3AA"]])}
  ${lg("ngSky", [[0, "#0B1033"], [1, "#1E2A5E"]])}${lg("ngSea", [[0, "#13204A"], [1, "#0A1230"]])}${lg("fogSky", [[0, "#DCE4E6"], [1, "#F4F6F4"]])}${rg("sunGlow", [[0, "#FFF3C4", .9], [.4, "#FFE7A8", .35], [1, "#FFE7A8", 0]])}
  ${rg("earthSea", [[0, "#5BA6E6"], [.75, "#2F6FC2"], [1, "#204E9A"]], .38, .34, .75)}${rg("earthRim", [[.82, "#9FD6FF", 0], [1, "#9FD6FF", .55]])}${rg("glassG", [[0, "#FFFFFF", .05], [.85, "#DDF4FF", .12], [1, "#BFE6FF", .35]])}
  ${lg("chairG", [[0, "#C7CED8"], [1, "#9AA5B4"]])}${lg("woodG", [[0, "#C9925A"], [1, "#9E6A38"]])}${lg("fogG", [[0, "#FFFFFF", 0], [.5, "#FFFFFF", .85], [1, "#FFFFFF", 0]], 1, 0)}`;

/* ================================================================ THE ANIMALS ================================================================ */
// THE BARN SWALLOW (Part 1): glossy dark blue back and wings, a rust-red forehead and throat, a creamy belly, a deeply forked tail with long
// streamers, big round dark glossy eyes with a highlight, a tiny beak; tiny feet that grip a wire or an edge. Perched, facing right; origin =
// its feet. o.look -1 faces left. It breathes, blinks, tilts its head, twitters (the beak opens), preens now and then and flicks its tail.
const SWB = "#1F2D6B", SWB2 = "#3D58B0", SWR = "#C9542C", SWC = "#F7EBD6";
function swallow21(t, o = {}) { const ph = o.ph || 0, br = 1 + .03 * Math.sin(t * 3.3 + ph), sh = blink16(t, .8 + ph), tilt = 9 * Math.sin(t * .9 + ph) + (o.tilt || 0),
    tw = (Math.sin(t * 2.1 + ph) > .78) || o.sing, fl = Math.max(0, Math.sin(t * 1.3 + ph * 2)) > .9 ? 12 * Math.sin(t * 22) : 0, pr = Math.max(0, Math.sin(t * .55 + ph)) > .94;
  const tail = `<g transform="rotate(${n2(fl)} -30 -30)"><path d="M-30 -36 L-150 -14 L-120 -26 L-160 2 L-28 -24z" fill="${SWB}" stroke="#121A44" stroke-width="3" stroke-linejoin="round"/></g>`;
  const head = `<g transform="rotate(${n2(pr ? 30 : tilt)} 30 -66)"><circle cx="38" cy="-80" r="27" fill="${SWB}" stroke="#121A44" stroke-width="3"/><path d="M50 -104 Q64 -98 63 -84 Q54 -92 44 -100z" fill="${SWR}"/>`
    + `<path d="M46 -66 Q60 -64 62 -76 Q54 -58 40 -58z" fill="${SWR}"/><path d="M62 -84 L${tw ? 80 : 78} ${tw ? -86 : -80} L62 -76z" fill="#2A2420"/>` + (tw ? `<path d="M62 -76 L78 -70 L62 -74z" fill="#2A2420"/>` : "")
    + (sh ? `<path d="M40 -84 q8 5 16 0" stroke="#fff" stroke-width="3" fill="none"/>` : `<circle cx="48" cy="-84" r="10" fill="#120E2E"/><circle cx="44" cy="-88" r="3.8" fill="#fff"/><circle cx="51" cy="-80" r="1.6" fill="#fff"/>`) + `</g>`;
  return `<g transform="scale(${o.look === -1 ? -1 : 1} 1)">` + tail + `<g transform="translate(0 -40) scale(${n2(br)}) translate(0 40)"><ellipse cx="6" cy="-42" rx="50" ry="32" fill="${SWB}" stroke="#121A44" stroke-width="3" transform="rotate(-14 6 -42)"/>`
    + `<path d="M-14 -22 Q10 -6 40 -30 Q34 -52 14 -50 Q-6 -44 -14 -22z" fill="${SWC}"/><path d="M-32 -46 Q8 -66 40 -54 Q8 -42 -40 -30z" fill="${SWB2}" opacity=".9"/><path d="M-36 -40 Q-4 -54 30 -48" stroke="#8FA8F0" stroke-width="3" fill="none" opacity=".6"/></g>`
    + head + `<path d="M-4 -12 V0 M-10 0 H4 M8 -12 V0 M2 0 H16" stroke="#2A2420" stroke-width="3" stroke-linecap="round"/></g>`; }
// a swallow in flight (side view, wings up / down with the beat), origin = its body; o.look -1 flies left
// FACES: right (head / front to the +x side; checked on a still, 2026-11-25)
function swallowFly(t, o = {}) { const ph = o.ph || 0, w = Math.sin(t * 14 + ph);
  return `<g transform="scale(${o.look === -1 ? -1 : 1} 1)"><path d="M-30 0 L-120 14 L-92 2 L-128 28 L-26 10z" fill="${SWB}" stroke="#121A44" stroke-width="3" stroke-linejoin="round"/>`
    + `<path d="M-6 -6 Q-30 ${n2(-70 * w)} -90 ${n2(-80 * w - 10)} Q-40 ${n2(-30 * w)} 10 2z" fill="${SWB}" stroke="#121A44" stroke-width="3"/>`
    + `<ellipse cx="0" cy="0" rx="44" ry="20" fill="${SWB}" stroke="#121A44" stroke-width="3"/><path d="M-20 8 Q10 22 40 4" fill="${SWC}"/><circle cx="34" cy="-6" r="17" fill="${SWB}"/><path d="M44 0 Q54 4 48 10 Q40 8 38 2z" fill="${SWR}"/>`
    + `<circle cx="42" cy="-9" r="6" fill="#120E2E"/><circle cx="40" cy="-11" r="2.2" fill="#fff"/><path d="M50 -8 L62 -6 L50 -2z" fill="#2A2420"/>`
    + `<path d="M6 -2 Q-6 ${n2(40 * w)} -60 ${n2(60 * w + 6)} Q-20 ${n2(20 * w)} 20 4z" fill="${SWB2}" stroke="#121A44" stroke-width="3"/></g>`; }
// the swallow at a spot in a drawn place (world coordinates): its feet at (x, y), size k. o.look -1: faces left
const swallowAt = (t, x, y, k = .3, o = {}) => TF(x, y, k, swallow21(t, o));

// THE SEA TURTLE (Part 2): a young green turtle with only its head and the top of its shell above the water: a smooth olive-brown shell
// with a pattern of plates, a rounded head with big gentle dark eyes and a short beak; it bobs, blinks, takes a breath (a tiny puff) and
// lifts its head; a ripple ring round it. Origin = the water line at the shell's middle; it faces right (o.look -1 left).
const TSH = "#7A6A3C", TSH2 = "#9C8A52", TSK = "#8FA25E", TSKD = "#5E6E36";
// FACES: right (head / front to the +x side; checked on a still, 2026-11-25)
function turtle21(t, o = {}) { const ph = o.ph || 0, bob = 4 * Math.sin(t * 1.6 + ph), sh = blink16(t, 1.7 + ph), lift = 6 * Math.max(0, Math.sin(t * .7 + ph)), puff = ((t + ph) % 4.2) / 4.2;
  let s = `<ellipse cx="0" cy="4" rx="${n2(110 + 30 * ((t * .5 + ph) % 1))}" ry="${n2(18 + 5 * ((t * .5 + ph) % 1))}" fill="none" stroke="#fff" stroke-width="4" opacity="${n2(.5 * (1 - ((t * .5 + ph) % 1)))}"/>`
    + `<ellipse cx="0" cy="4" rx="96" ry="14" fill="#fff" opacity=".25"/>`;
  s += `<g transform="translate(0 ${n2(bob)})"><path d="M-80 0 Q-70 -56 0 -60 Q66 -58 80 0z" fill="${TSH}" stroke="#4A3E1E" stroke-width="5"/>`
    + `<path d="M-30 -2 L-24 -40 L22 -42 L30 -2 M-24 -40 L-58 -24 M22 -42 L56 -24 M0 -58 L-4 -42" fill="none" stroke="#4A3E1E" stroke-width="3.5" opacity=".7"/><path d="M-22 -36 L18 -38 L24 -8 L-24 -8z" fill="${TSH2}" opacity=".7"/><path d="M-50 -40 Q-10 -60 40 -52" stroke="#C8B878" stroke-width="5" fill="none" opacity=".5"/>`
    + `<g transform="translate(0 ${n2(-lift)})"><path d="M60 -6 Q66 -44 100 -46 Q130 -44 132 -20 Q130 -2 104 2 Q76 4 60 -6z" fill="${TSK}" stroke="${TSKD}" stroke-width="4"/>`
    + `<path d="M84 -36 l8 6 l-6 6 M104 -14 l8 4" stroke="${TSKD}" stroke-width="2.5" fill="none" opacity=".6"/><path d="M126 -18 Q132 -12 126 -6" stroke="${TSKD}" stroke-width="3" fill="none"/><path d="M112 -10 Q120 -4 128 -10" stroke="#3E4A22" stroke-width="3" fill="none"/>`
    + (sh ? `<path d="M104 -30 q8 5 16 0" stroke="#2A2E1A" stroke-width="3.5" fill="none"/>` : `<circle cx="112" cy="-30" r="9" fill="#1E1A14"/><circle cx="109" cy="-33" r="3.4" fill="#fff"/><circle cx="115" cy="-26" r="1.6" fill="#fff"/>`) + `</g></g>`;
  if (puff < .2) s += `<circle cx="${n2(138 + 30 * puff)}" cy="${n2(-30 - 60 * puff)}" r="${n2(6 + 30 * puff)}" fill="#fff" opacity="${n2(.7 * (1 - puff / .2))}"/>`;
  return `<g transform="scale(${o.look === -1 ? -1 : 1} 1)">${s}</g>`; }
const turtleAt = (t, x, y, k = .3, o = {}) => TF(x, y, k, turtle21(t, o));
// a whole turtle swimming (seen from above), for the fun fact: shell, head, four flippers that paddle; origin = the shell's middle, heading right
// FACES: right (head / front to the +x side; checked on a still, 2026-11-25)
function turtleSwim(t, o = {}) { const p = Math.sin(t * 4 + (o.ph || 0)), b = o.baby ? 1 : 0;
  const fl = (x, y, r, a) => `<path d="M0 0 Q${n2(40 * r)} ${n2(-14 * r)} ${n2(80 * r)} ${n2(-6 * r)} Q${n2(44 * r)} ${n2(10 * r)} 0 ${n2(12 * r)}z" fill="${TSK}" stroke="${TSKD}" stroke-width="4" transform="translate(${x} ${y}) rotate(${n2(a)})"/>`;
  return fl(30, -40, 1, -120 + 25 * p) + fl(30, 40, 1, 120 - 25 * p) + fl(-50, -34, .6, -150 - 15 * p) + fl(-50, 34, .6, 150 + 15 * p)
    + `<ellipse cx="0" cy="0" rx="78" ry="58" fill="${b ? "#5E5A44" : TSH}" stroke="#4A3E1E" stroke-width="5"/><path d="M-40 -20 H40 M-40 20 H40 M-20 -48 V48 M20 -48 V48" stroke="#4A3E1E" stroke-width="3" opacity=".6"/>`
    + `<ellipse cx="96" cy="0" rx="30" ry="24" fill="${TSK}" stroke="${TSKD}" stroke-width="4"/><circle cx="104" cy="-10" r="6" fill="#1E1A14"/><circle cx="102" cy="-12" r="2" fill="#fff"/><circle cx="104" cy="10" r="6" fill="#1E1A14"/><circle cx="102" cy="8" r="2" fill="#fff"/>`; }

/* ================================================================ THE MAGNETS ================================================================ */
// a bar magnet hanging LEVEL on a thin string tied round its middle (seen from the side, turning about the string): a = its turn in degrees
// (0 = the red North end to the LEFT of the frame, the way the field's rain tree is). It shows its end face as it turns side-on. Origin =
// the knot on the broom handle; L = the string's length; k = the magnet's size (1: 300 x 84)
function hangMag21(t, a, L = 160, k = .8) { const c = Math.cos(a * Math.PI / 180), sn = Math.sin(a * Math.PI / 180), sx = Math.max(.04, Math.abs(c)), endW = 64 * Math.abs(sn);
  let m = `<g transform="scale(${n2(sx)} 1)">${bar20(t, { glint: false, flip: c < 0 })}</g>`;
  // the end nearer to us shows its end face (red if the North end comes towards us, blue if the South end does)
  if (endW > 4) { const near = sn > 0 ? -150 * c : 150 * c; m += `<rect x="${n2(near - endW / 2)}" y="-42" width="${n2(endW)}" height="84" rx="8" fill="${sn > 0 ? NORTHC : SOUTHC}" stroke="${P.ink}" stroke-width="5"/>`; }
  return `<path d="M0 0 V${n2(L - 30 * k)}" stroke="#F4F2EC" stroke-width="5"/><path d="M0 0 V${n2(L - 30 * k)}" stroke="#7A7060" stroke-width="2.4"/><circle r="7" fill="#F4F2EC" stroke="#7A7060" stroke-width="2"/>`
    + TF(0, L, k, m + `<path d="M-6 -44 q6 -10 12 0" stroke="#F4F2EC" stroke-width="5" fill="none"/><path d="M-6 -44 q6 -10 12 0" stroke="#7A7060" stroke-width="2.4" fill="none"/>`); }
// the spin (degrees) of a hanging magnet spun at t0: it turns, slows, swings past its line and back (each swing smaller) and stops at 0 (the
// red end to the rain tree), every time. turns = whole turns before it settles
const spinAng = (t, t0, turns = 2, d = 4.2) => { const u = t - t0; if (u < 0) return 0; const main = 360 * turns * (1 - Math.pow(Math.max(0, 1 - u / d), 3)), osc = u < d * .55 ? 0 : 38 * Math.exp(-(u - d * .55) / 1.1) * Math.sin((u - d * .55) * 4.2);
  return u > d + 3.5 ? 0 : (main + osc) % 360; };
// a little magnet on a string (the Earth's, the chart's): a small red-and-blue bar hanging level, a = its turn (0 = red to the left);
// origin = the bar's middle; the string goes up `L`
const miniMag = (a, L = 26, k = 1) => { const c = Math.cos(a * Math.PI / 180), sx = Math.max(.08, Math.abs(c)), fl = c < 0;
  return TF(0, 0, k, `<path d="M0 0 V${-L}" stroke="${P.ink}" stroke-width="2.5"/><g transform="scale(${n2(sx)} 1)"><rect x="-30" y="-8" width="30" height="16" rx="3" fill="${fl ? SOUTHC : NORTHC}" stroke="${P.ink}" stroke-width="2.5"/><rect x="0" y="-8" width="30" height="16" rx="3" fill="${fl ? NORTHC : SOUTHC}" stroke="${P.ink}" stroke-width="2.5"/></g>`); };

/* ================================================================ MOMO'S COMPASS ================================================================ */
// Momo's clear plastic hiking compass on a flat base, seen from ABOVE (sy < 1 tilts it away, as when held flat in front of you): the clear
// baseplate (a ruler edge, the direction arrow), the round capsule with its bezel, the dial lettered N, E, S, W (N red) turned by caseDeg,
// the thin needle on its pin, red at the North end and white at the South end, at needleDeg (0 = pointing up the frame). Origin = the pin.
function compass21(t, needleDeg = 0, caseDeg = 0, o = {}) { const R = 130, sy = o.sy || 1;
  let s = `<g transform="scale(1 ${n2(sy)})">`;
  if (o.base !== false) s += `<g transform="rotate(${n2(caseDeg)})"><g filter="url(#dropS)"><rect x="-160" y="-190" width="320" height="420" rx="30" fill="#E6F4FA" opacity=".88" stroke="#7FA2B0" stroke-width="5"/></g>`
    + [...Array(13)].map((_, i) => `<path d="M-160 ${-150 + i * 28} h${i % 2 ? 14 : 24}" stroke="#5E7E8A" stroke-width="3"/>`).join("") + `<path d="M0 -180 L16 -150 H-16z" fill="${NEEDLEC}" opacity=".7"/>`
    + `<rect x="-60" y="170" width="120" height="16" rx="8" fill="#8FB4C2" opacity=".6"/><circle cx="0" cy="200" r="10" fill="none" stroke="#7FA2B0" stroke-width="4"/></g>`;
  s += `<circle r="${R + 18}" fill="#3E4652" stroke="${P.ink}" stroke-width="5"/>` + `<g transform="rotate(${n2(caseDeg)})">` + [...Array(36)].map((_, i) => { const a = i * 10 * Math.PI / 180; return `<path d="M${n2(Math.sin(a) * (R + 4))} ${n2(-Math.cos(a) * (R + 4))} L${n2(Math.sin(a) * (R + 14))} ${n2(-Math.cos(a) * (R + 14))}" stroke="#fff" stroke-width="${i % 9 ? 2 : 4}"/>`; }).join("") + `</g>`
    + `<circle r="${R}" fill="#FBFBF7"/>` + `<g transform="rotate(${n2(caseDeg)})">` + [["N", 0], ["E", 90], ["S", 180], ["W", 270]].map(([l, d]) => { const a = d * Math.PI / 180, x = Math.sin(a) * R * .74, y = -Math.cos(a) * R * .74;
      return `<g transform="translate(${n2(x)} ${n2(y)}) rotate(${d})">${T(0, 16, l, 46, l === "N" ? NEEDLEC : P.ink)}</g>`; }).join("") + [...Array(8)].map((_, i) => `<path d="M0 ${-R * .5} V${-R * .58}" stroke="${P.ink}" stroke-width="3" transform="rotate(${i * 45 + 22.5})"/>`).join("") + `</g>`;
  s += `<g transform="rotate(${n2(needleDeg)})"><path d="M0 ${-R * .86} L15 0 L-15 0z" fill="${NEEDLEC}" stroke="${P.ink}" stroke-width="3.5" stroke-linejoin="round"/><path d="M0 ${R * .86} L15 0 L-15 0z" fill="${NEEDLEW}" stroke="${P.ink}" stroke-width="3.5" stroke-linejoin="round"/></g>`
    + `<circle r="11" fill="#B8C0C8" stroke="${P.ink}" stroke-width="3.5"/><circle cx="-3" cy="-3" r="3" fill="#fff"/>`
    + `<circle r="${R}" fill="url(#glassG)"/><path d="M${-R * .7} ${-R * .5} A${R * .86} ${R * .86} 0 0 1 ${-R * .1} ${-R * .84}" stroke="#fff" stroke-width="10" fill="none" opacity=".55" stroke-linecap="round"/>`;
  return s + `</g>`; }
// the needle settling: a damped swing from a0 to `to` starting at t0 (degrees)
const settle21 = (t, t0, a0 = 90, tau = 1.1, w = 5, to = 0) => t < t0 ? a0 : to + (a0 - to) * Math.exp(-(t - t0) / tau) * Math.cos((t - t0) * w);

/* ================================================================ PROPS ================================================================ */
// an orange PE cone (origin = its base centre on the ground)
const cone21 = (k = 1) => TF(0, 0, k, `<ellipse cx="0" cy="4" rx="58" ry="12" fill="${P.ink}" opacity=".22" filter="url(#b4)"/><path d="M-50 0 H50 L46 -12 H-46z" fill="#D9701C" stroke="#9A4A10" stroke-width="4"/><path d="M-36 -12 L-10 -96 Q0 -104 10 -96 L36 -12z" fill="${CONEC}" stroke="#9A4A10" stroke-width="4" stroke-linejoin="round"/><path d="M-26 -44 H26 L22 -58 H-22z" fill="#fff" opacity=".9"/><path d="M-6 -90 L-24 -20" stroke="#fff" stroke-width="5" opacity=".35"/>`);
// a grey plastic school chair seen from the side; side 1: its back on the RIGHT, -1 on the LEFT (back to back with the other). Origin = the
// floor below its middle; the back's top at (back, -330)
const chair21 = (side = 1) => { const sd = side, bx = 78 * sd;   // the back rises from the seat's back edge (bx); the seat runs from -96 to +84 (times side)
  return `<ellipse cx="0" cy="4" rx="120" ry="14" fill="${P.ink}" opacity=".18" filter="url(#b4)"/><path d="M${-84 * sd} 0 L${-78 * sd} -172 M${70 * sd} 0 L${66 * sd} -172 M${-50 * sd} -6 L${-48 * sd} -166 M${40 * sd} -6 L${40 * sd} -166" stroke="#6E7884" stroke-width="10" stroke-linecap="round"/>`
  + `<path d="M${-98 * sd} -172 H${88 * sd} L${92 * sd} -194 H${-92 * sd}z" fill="url(#chairG)" stroke="#6A7480" stroke-width="5" stroke-linejoin="round"/>`
  + `<path d="M${bx - 8 * sd} -192 L${bx + 2 * sd} -246 M${bx + 14 * sd} -192 L${bx + 24 * sd} -246" stroke="#6E7884" stroke-width="8" stroke-linecap="round"/>`
  + `<path d="M${bx - 14 * sd} -240 Q${bx + 4 * sd} -252 ${bx + 34 * sd} -244 L${bx + 40 * sd} -330 Q${bx + 12 * sd} -342 ${bx - 8 * sd} -330z" fill="url(#chairG)" stroke="#6A7480" stroke-width="5" stroke-linejoin="round"/>`; };
// the wooden broom handle laid across the two chair backs (x0..x1 at height y), with a soft shadow
const broom21 = (x0, x1, y) => `<path d="M${x0} ${y} H${x1}" stroke="#7A4A22" stroke-width="22" stroke-linecap="round"/><path d="M${x0} ${y} H${x1}" stroke="#B67A42" stroke-width="15" stroke-linecap="round"/><path d="M${x0 + 10} ${y - 4} H${x1 - 10}" stroke="#E2B07A" stroke-width="4" stroke-linecap="round" opacity=".7"/>`;
// a wooden park bench (origin = the middle of its front legs on the ground; seat top at -100, 520 wide)
const bench21 = (w = 520) => `<ellipse cx="0" cy="6" rx="${w * .55}" ry="16" fill="${P.ink}" opacity=".18" filter="url(#b4)"/><path d="M${-w * .42} 0 V-96 M${w * .42} 0 V-96 M${-w * .38} -60 V-96 M${w * .38} -60 V-96" stroke="#4A4E5A" stroke-width="14" stroke-linecap="round"/>`
  + `<path d="M${-w / 2} -96 H${w / 2} L${w / 2 - 20} -128 H${-w / 2 + 20}z" fill="url(#woodG)" stroke="#7A4A22" stroke-width="4"/><path d="M${-w / 2 + 30} -106 H${w / 2 - 30} M${-w / 2 + 26} -118 H${w / 2 - 26}" stroke="#7A4A22" stroke-width="3" opacity=".6"/>`
  + `<rect x="${-w / 2 + 10}" y="-230" width="${w - 20}" height="34" rx="8" fill="url(#woodG)" stroke="#7A4A22" stroke-width="4"/><rect x="${-w / 2 + 10}" y="-186" width="${w - 20}" height="30" rx="8" fill="url(#woodG)" stroke="#7A4A22" stroke-width="4"/><path d="M${-w * .42} -128 V-236 M${w * .42} -128 V-236" stroke="#4A4E5A" stroke-width="12" stroke-linecap="round"/>`;
// a giant finger (an adult's hand: four fingers and a thumb, the index finger out), coming in from the right; origin = the fingertip
const giantFinger = (k = 1, rot = 0) => TF(0, 0, k, `<g transform="translate(330 30) scale(-1 1)">${hand15({ point: true, sleeve: "#6E8AC8", sleeveD: "#4A64A0" })}</g>`, rot);
// an IRON NAIL and the clips (EP22 drew EP21's dare pictures: SECTION A of ../ep22/ep21dare.js is copied UNCHANGED into ep21dare.js)
// the ship's binnacle (its compass in a stand on the bridge): a pedestal, a brass bowl with a glass top, the compass card with a big red N
// turned by cardDeg (0 = N to the top); origin = the card's centre; seen a little from above
const binnacle21 = (t, cardDeg = 0) => `<path d="M-60 120 L-40 380 H40 L60 120z" fill="#4C5C6E" stroke="#1E2A38" stroke-width="5"/><path d="M-90 380 H90 V400 H-90z" fill="#3A4656" stroke="#1E2A38" stroke-width="4"/>`
  + `<ellipse cx="0" cy="40" rx="150" ry="90" fill="#B8923A" stroke="#6E5418" stroke-width="6"/><ellipse cx="0" cy="20" rx="136" ry="76" fill="#14203A"/>`
  + `<g transform="scale(1 .55)"><circle r="122" fill="#F6F0DC" stroke="#6E5418" stroke-width="4"/><g transform="rotate(${n2(cardDeg)})">` + [...Array(32)].map((_, i) => `<path d="M0 -122 V${i % 8 ? -108 : -96}" stroke="#2B2147" stroke-width="${i % 8 ? 2 : 4}" transform="rotate(${i * 11.25})"/>`).join("")
  + `<path d="M0 -92 L14 0 L0 92 L-14 0z" fill="#2B2147" opacity=".25"/><path d="M0 -94 L16 -20 H-16z" fill="${NEEDLEC}"/>` + [["N", 0, NEEDLEC], ["E", 90, P.ink], ["S", 180, P.ink], ["W", 270, P.ink]].map(([l, d, c]) => `<g transform="rotate(${d}) translate(0 -62) rotate(${-d})">${T(0, 14, l, 40, c)}</g>`).join("") + `</g></g>`
  + `<ellipse cx="0" cy="0" rx="136" ry="76" fill="url(#glassG)"/><path d="M-90 -30 Q-40 -60 30 -60" stroke="#fff" stroke-width="8" fill="none" opacity=".4" stroke-linecap="round"/>`
  + `<circle cx="-200" cy="40" r="34" fill="#C9302A" stroke="#6E1814" stroke-width="5"/><circle cx="200" cy="40" r="34" fill="#2A8A3A" stroke="#14501E" stroke-width="5"/><path d="M-170 40 H-150 M150 40 H170" stroke="#B8923A" stroke-width="10"/>`
  + `<circle cx="0" cy="-70" r="8" fill="#FFE7A0"/><circle cx="0" cy="-70" r="28" fill="#FFE7A0" opacity=".25"/>`;
// a small easel (copied UNCHANGED from EP20's art20.js): origin = the easel's feet
const smallEasel = (inner, w = 520, h = 600) => `<ellipse cx="0" cy="6" rx="${w * .55}" ry="16" fill="${P.ink}" opacity=".2" filter="url(#b4)"/><path d="M${-w * .38} 0 L${-w * .3} ${-h - 80} M${w * .38} 0 L${w * .3} ${-h - 80} M0 -30 L0 ${-h - 40}" stroke="#8A5A36" stroke-width="16" stroke-linecap="round"/><rect x="${-w * .5 - 10}" y="-200" width="${w + 20}" height="20" rx="8" fill="#7A4A26"/>`
  + `<g filter="url(#drop)"><rect x="${-w / 2}" y="${-h - 160}" width="${w}" height="${h - 30}" rx="16" fill="#FFFDF6" stroke="#D9C9A8" stroke-width="6"/></g><g transform="translate(0 ${-h / 2 - 175})">${inner}</g>`;
