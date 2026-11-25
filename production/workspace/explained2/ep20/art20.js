// art20.js: EP20's own art, part A (Stage 2, drawn 2026-11-23): small helpers, the two hidden animals, the magnets and the props.
// Loaded after tests.js / ep19dare.js, before sets20.js, lc20.js, common.js, p1.js / p2.js.
// Helpers copied UNCHANGED from EP15 / EP16 / EP19 (home15.js hand15, bird15, farBlocks, camPt; pond16.js eye16, blink16; art16.js
// xChip16, tickChip16; art19.js camOn, camMix, holdHand): EP15 to EP19 are finished and live, so they are copied here, never edited there.
// THE ANIMALS (true shapes from the script's section 3 Realism, drawn in the buddies' warm, rounded, big-eyed style; every one moves):
//   the JUMPING SPIDER (Part 1: fuzzy, black with small white marks, two big round glossy front eyes, eight short stout legs; tiny hops; it
//   hangs from a thin visible silk line or stands on a surface, never in mid-air), the HOUSE LIZARD (Part 2: slim, pale pinkish grey-brown,
//   slightly see-through, big round dark eyes, wide toe pads with five toes on all four feet, a long tapering tail; seen from above because
//   it is ON the wall or the ceiling; quick little dashes).
// THE MAGNETS: every bar magnet red North half with a white N, blue South half with a white S (bar20); the dark grey ring magnets (ring20,
//   rings20: the pencil in its lump of plasticine, the top ring floating with a clear gap). The colours of the topic: PULL / ATTRACT green
//   (PULLC), PUSH / REPEL magenta (PUSHC): arrows, chips, boxes. Blue is only ever a South pole's paint.

/* ================================================================ helpers (copied) ================================================================ */
const SKN = "#F2C29B", SKL = "#C98F66";
function hand15(o = {}) { const c = o.curl || 0, sl = o.sleeve || "#5B7BD6", sd = o.sleeveD || "#3A56A8", F = [[-29, 70], [-9, 80], [11, 74], [29, 58]];
  const fing = F.map(([y, L], i) => { const cc = o.point && i === 0 ? 0 : (o.point ? .75 : c), l = L * (1 - .6 * cc) + 10; return `<rect x="-10" y="${y - 10}" width="${n2(l)}" height="20" rx="10" transform="rotate(${n2((i - 1.5) * 4)} 0 ${y})"/>`; }).join("");
  return `<rect x="-330" y="-54" width="230" height="108" rx="20" fill="${sl}" stroke="${sd}" stroke-width="5"/><g fill="${SKN}" stroke="${SKL}" stroke-width="4" stroke-linejoin="round"><rect x="-118" y="-44" width="128" height="88" rx="34"/>${fing}<rect x="-70" y="-60" width="70" height="24" rx="12" transform="rotate(-26 -70 -48)"/></g>`
    + `<path d="M-6 -30 q6 2 0 6 M-6 -10 q6 2 0 6 M-6 10 q6 2 0 6" fill="none" stroke="${SKL}" stroke-width="2.5" opacity=".7"/>`; }
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
const XDEFS20 = () => `${lg("srWall", [[0, "#EAF3EC"], [1, "#DCEADF"]])}${lg("srFloor", [[0, "#C9D3DA"], [1, "#AEBBC6"]])}${lg("srTop", [[0, "#5A6070"], [1, "#3E4350"]])}${lg("srSky", [[0, "#9FD8FF"], [1, "#E8F7FF"]])}${lg("srGrass", [[0, "#9ED77E"], [1, "#6DBB58"]])}
  ${lg("ktWall", [[0, "#FFF1DA"], [1, "#F8E2C0"]])}${lg("ktFloor", [[0, "#E6DCCB"], [1, "#CFC2AC"]])}${lg("ktDusk", [[0, "#1E2A6E"], [.55, "#3D3F8F"], [1, "#C77A9A"]])}${lg("ktLiving", [[0, "#F6D29C"], [1, "#E8B878"]])}${lg("ktWood", [[0, "#D9A56A"], [1, "#B07A42"]])}
  ${lg("ktFridge", [[0, "#FFFFFF"], [1, "#E4E8EE"]], 1, 0)}${rg("ktLamp", [[0, "#FFF6D0", .9], [1, "#FFE0A0", 0]])}${rg("srSunP", [[0, "#FFF4C8", .55], [1, "#FFF4C8", 0]])}${lg("gRingTop", [[0, "#7A8090"], [1, "#5A6070"]])}`;

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

/* ================================================================ THE ANIMALS ================================================================ */
// the JUMPING SPIDER, front view (facing us), origin = where its feet stand. o.wave: a front leg waves; o.hop (a time): a tiny hop; o.look: turn
function spider20(t, o = {}) { const br = 1 + .03 * Math.sin(t * 3.1), sh = blink16(t, .6), hp = o.hop !== undefined ? hop(t, o.hop, .32, 1) * 26 : 0, wv = o.wave ? Math.sin(t * 6) : 0, lk = o.look || 0;
  let legs = ""; const LG = [[-1, -42, -78, -34, .2], [-1, -48, -96, -6, .5], [-1, -44, -92, 18, .8], [-1, -34, -74, 30, 1.1], [1, -42, -78, -34, .4], [1, -48, -96, -6, .7], [1, -44, -92, 18, 1.0], [1, -34, -74, 30, 1.3]];
  LG.forEach(([sd, y0, kx, ky, ph], i) => { const up = i === 4 && o.wave ? -30 + 14 * wv : 0, tw = 3 * Math.sin(t * 4 + ph);
    legs += `<path d="M${sd * 26} ${y0} Q${n2(sd * -kx * .62)} ${n2(y0 - 30 + up)} ${n2(sd * -kx)} ${n2(ky + up + tw)}" fill="none" stroke="#1E1A24" stroke-width="13" stroke-linecap="round"/><path d="M${sd * 26} ${y0} Q${n2(sd * -kx * .62)} ${n2(y0 - 30 + up)} ${n2(sd * -kx)} ${n2(ky + up + tw)}" fill="none" stroke="#4A4458" stroke-width="5" stroke-linecap="round" opacity=".6"/>`; });
  const fz = [...Array(14)].map((_, i) => { const a = i / 14 * Math.PI * 2; return `<path d="M${n2(Math.cos(a) * 40)} ${n2(-52 + Math.sin(a) * 34)} l${n2(Math.cos(a) * 9)} ${n2(Math.sin(a) * 8)}" stroke="#2A2430" stroke-width="5" stroke-linecap="round"/>`; }).join("");
  return `<ellipse cx="0" cy="2" rx="${n2(60 - hp)}" ry="8" fill="${P.ink}" opacity=".18"/><g transform="translate(0 ${n2(-hp)}) rotate(${n2(lk)} 0 -50)">` + legs
    + `<ellipse cx="0" cy="-84" rx="${n2(44 * br)}" ry="${n2(36 * br)}" fill="#2A2430"/><path d="M-18 -98 q18 -10 36 0 M-12 -84 q12 -6 24 0" stroke="#E8E4EE" stroke-width="5" fill="none" stroke-linecap="round"/>`
    + fz + `<ellipse cx="0" cy="-50" rx="${n2(42 * br)}" ry="${n2(36 * br)}" fill="#2E2836" stroke="#141018" stroke-width="4"/><path d="M-30 -72 q30 -14 60 0" stroke="#F4F0F6" stroke-width="5" fill="none" stroke-linecap="round" opacity=".9"/>`
    + `<circle cx="-15" cy="-50" r="15" fill="#0E0C12" stroke="#141018" stroke-width="3"/><circle cx="15" cy="-50" r="15" fill="#0E0C12" stroke="#141018" stroke-width="3"/>`
    + (sh ? `<path d="M-26 -50 q11 7 22 0 M4 -50 q11 7 22 0" stroke="#4A4458" stroke-width="4" fill="none" stroke-linecap="round"/>` : `<circle cx="-20" cy="-56" r="5.5" fill="#fff"/><circle cx="10" cy="-56" r="5.5" fill="#fff"/><circle cx="-11" cy="-44" r="2.4" fill="#fff" opacity=".8"/><circle cx="19" cy="-44" r="2.4" fill="#fff" opacity=".8"/>`)
    + `<circle cx="-34" cy="-62" r="5" fill="#0E0C12"/><circle cx="34" cy="-62" r="5" fill="#0E0C12"/><path d="M-8 -28 q8 6 16 0" stroke="#E8E4EE" stroke-width="3" fill="none" stroke-linecap="round"/><circle cx="-24" cy="-32" r="5" fill="#FF9AB0" opacity=".55"/><circle cx="24" cy="-32" r="5" fill="#FF9AB0" opacity=".55"/></g>`; }
// the spider at (x, y) (its feet), k its size; o.silk: a hanging thread this long ABOVE it (it hangs and turns slowly); o.line: a silk line to a
// point [x, y] (it sits on a surface with its safety line, as jumping spiders do)
const spiderAt = (t, x, y, k = .3, o = {}) => { let s = "";
  if (o.silk) { const sw = 4 * Math.sin(t * 1.3); s += `<path d="M${x} ${n2(y - o.silk - 40 * k)} Q${n2(x + sw)} ${n2(y - o.silk / 2)} ${n2(x + sw * 1.6)} ${n2(y - 96 * k)}" stroke="#fff" stroke-width="2.2" fill="none" opacity=".85"/>`
    + `<g transform="translate(${n2(x + sw * 1.6)} ${y}) scale(${n2(k * Math.cos(t * .7) * .25 + k * .75)} ${k})">${spider20(t, o)}</g>`; return s; }
  if (o.line) s += `<path d="M${n2(x)} ${n2(y - 60 * k)} L${o.line[0]} ${o.line[1]}" stroke="#fff" stroke-width="2" opacity=".8"/>`;
  return s + TF(x, y, k, spider20(t, o), o.rot || 0); };

// the HOUSE LIZARD seen from above (it is ON the wall or the ceiling), head up, origin = the middle of its body. o.dash (a time): a quick little
// dash; o.flick: the tail curls; o.lift: one toe pad lifts
function lizard20(t, o = {}) { const sh = blink16(t, 1.4), tl = 18 * Math.sin(t * 1.6) + (o.flick ? 22 * Math.sin(t * 5) : 0), br = 1 + .03 * Math.sin(t * 2.7), hd = 6 * Math.sin(t * .9);
  const body = "#D9B8A2", bodyL = "#7E6050", dark = "#7A5C4C";
  const foot = (x, y, a, lift) => { let s = `<g transform="translate(${x} ${y}) rotate(${a})${lift ? " scale(1.08)" : ""}">`;
    for (let i = 0; i < 5; i++) { const fa = (-50 + i * 25) * Math.PI / 180, L = 26 + (i === 2 ? 4 : 0); s += `<path d="M0 0 L${n2(Math.sin(fa) * L)} ${n2(-Math.cos(fa) * L)}" stroke="${bodyL}" stroke-width="5" stroke-linecap="round"/><ellipse cx="${n2(Math.sin(fa) * (L + 3))}" cy="${n2(-Math.cos(fa) * (L + 3))}" rx="6" ry="5" fill="${body}" stroke="${bodyL}" stroke-width="2.5"/>`; }
    return s + `</g>`; };
  const legs = [[-1, -54, -40, -30], [1, -54, 40, 30], [-1, 44, -150, -24], [1, 44, 150, 24]].map(([sd, y, a, b], i) => { const lift = o.lift && i === 1 ? 12 * Math.max(0, Math.sin(t * 3)) : 0, kx = sd * 46, ky = y + (i < 2 ? -6 : 10);
    return `<path d="M${sd * 16} ${y} Q${n2(sd * 40)} ${n2(y - 18)} ${kx} ${ky}" fill="none" stroke="${bodyL}" stroke-width="17" stroke-linecap="round"/><path d="M${sd * 16} ${y} Q${n2(sd * 40)} ${n2(y - 18)} ${kx} ${ky}" fill="none" stroke="${body}" stroke-width="11" stroke-linecap="round"/>` + foot(kx, ky - lift, i < 2 ? sd * 40 : sd * 150 - sd * 10, lift); }).join("");
  const tail = `M-12 80 Q${n2(-8 + tl * .3)} 150 ${n2(tl * .8)} 210 Q${n2(tl * 1.6)} 262 ${n2(tl * 2.4)} 300 Q${n2(tl * 1.3)} 256 ${n2(tl * .4 + 2)} 206 Q${n2(10 + tl * .2)} 148 12 80z`;
  return `<g transform="scale(${n2(br)} 1)">` + `<path d="${tail}" fill="${body}" stroke="${bodyL}" stroke-width="4" fill-opacity=".92"/>` + legs
    + `<path d="M-24 -60 Q-34 10 -16 86 Q0 96 16 86 Q34 10 24 -60 Q0 -76 -24 -60z" fill="${body}" stroke="${bodyL}" stroke-width="5" fill-opacity=".92"/>`
    + [-30, -6, 18, 42, 64].map((y, i) => `<path d="M${-14 + i % 2 * 2} ${y} q14 -6 28 0" stroke="${dark}" stroke-width="3" fill="none" opacity=".45"/>`).join("")
    + `<g transform="rotate(${n2(hd)} 0 -70)"><path d="M-30 -70 Q-38 -112 0 -136 Q38 -112 30 -70 Q0 -60 -30 -70z" fill="${body}" stroke="${bodyL}" stroke-width="5"/>`
    + eye16(-26, -104, 13, { shut: sh, white: "#4A3A32", line: "#5E4A3E" }) + eye16(26, -104, 13, { shut: sh, white: "#4A3A32", line: "#5E4A3E" })
    + `<path d="M-10 -128 q10 6 20 0" stroke="${dark}" stroke-width="3" fill="none" stroke-linecap="round"/><circle cx="-16" cy="-88" r="4" fill="#FFAFA0" opacity=".6"/><circle cx="16" cy="-88" r="4" fill="#FFAFA0" opacity=".6"/></g></g>`; }
// the lizard at (x, y), k its size, rot (0 = head up; 180 = upside down on the ceiling), o passed on; o.dash (a time): it darts a little
const lizardAt = (t, x, y, k = .26, rot = 0, o = {}) => { const d = o.dash !== undefined ? 26 * eo(clamp((t - o.dash) / .25)) : 0, a = rot * Math.PI / 180;
  return `<g transform="translate(${n2(x - Math.sin(a) * d * -1)} ${n2(y - Math.cos(a) * d)})${o.squash ? ` scale(1 ${o.squash})` : ""} rotate(${rot}) scale(${k})">${lizard20(t, o)}</g>`; };

/* ================================================================ THE MAGNETS ================================================================ */
// a BAR MAGNET (origin = its middle; 300 x 84 at k 1): red North half with a white N, blue South half with a white S. o.flip: North on the
// RIGHT (it has been turned round). o.glint. o.hl: highlight one end ("N" / "S") with a glow
function bar20(t, o = {}) { const fl = o.flip ? -1 : 1, nX = -75 * fl, sX = 75 * fl;
  let s = `<g filter="url(#dropS)"><rect x="${fl > 0 ? -150 : 0}" y="-42" width="150" height="84" rx="12" fill="${NORTHC}" stroke="#9A2A1E" stroke-width="6"/><rect x="${fl > 0 ? 0 : -150}" y="-42" width="150" height="84" rx="12" fill="${SOUTHC}" stroke="#1E3E8A" stroke-width="6"/></g>`
    + `<rect x="-140" y="-34" width="130" height="16" rx="8" fill="#fff" opacity=".26"/><rect x="10" y="-34" width="130" height="16" rx="8" fill="#fff" opacity=".24"/>` + T(nX, 20, "N", 56, "#fff") + T(sX, 20, "S", 56, "#fff");
  if (o.hl) { const hx = o.hl === "N" ? nX * 2 : sX * 2; s += `<circle cx="${hx * .98}" cy="0" r="${n2(58 + 6 * Math.sin(t * 6))}" fill="none" stroke="${P.sun}" stroke-width="8" opacity=".85"/>`; }
  if (o.glint !== false) s += lcGlint(-110 * fl, -26, 16, t, 1.3);
  return s; }
// a round pencil seen end-on under a magnet (so it can roll): o.r turns it
const pencilEnd = (x, y, k = 1, r = 0) => TF(x, y, k, `<polygon points="${[...Array(6)].map((_, i) => { const a = (i * 60 + r) * Math.PI / 180; return `${n2(Math.cos(a) * 20)},${n2(Math.sin(a) * 20)}`; }).join(" ")}" fill="#FFC83A" stroke="#B8861C" stroke-width="4"/><circle r="7" fill="#F2D6A8" stroke="#B8861C" stroke-width="2"/><circle r="3" fill="#3A3A4A"/>`);
// a bar magnet lying across two round pencils (side view), origin = the middle of the magnet; rollX: how far it has rolled (the pencils turn)
const barOnPencils = (t, x, y, k = 1, o = {}) => { const rx = o.roll || 0, r = -rx * 2.4; return TF(x, y, k, pencilEnd(-90, 62, 1, r) + pencilEnd(90, 62, 1, r) + bar20(t, o)); };
// a steel PAPER CLIP: silver loops (EP19's clip19, copied). origin = its middle, ~130 x 44
const clip20 = (k = 1, rot = 0) => TF(0, 0, k, `<path d="M-50 14 H52 A16 16 0 0 0 52 -18 H-58 A20 20 0 0 0 -58 22 H40 A10 10 0 0 0 40 2 H-36" fill="none" stroke="#7A8494" stroke-width="9" stroke-linecap="round"/><path d="M-50 14 H52 A16 16 0 0 0 52 -18 H-58 A20 20 0 0 0 -58 22 H40 A10 10 0 0 0 40 2 H-36" fill="none" stroke="#DCE2EA" stroke-width="3.5" stroke-linecap="round"/>`, rot);
// a dark grey RING MAGNET seen a little from above (origin = its middle; rx 90). o.top / o.bot: label its faces (e.g. "N", "S"); o.glowTop /
// o.glowBot: the face that meets the other ring glows (its colour: PUSHC / PULLC)
const ring20 = (o = {}) => { let s = `<path d="M-90 0 A90 30 0 0 0 90 0 V22 A90 30 0 0 1 -90 22z" fill="#3A3E4A" stroke="#22252E" stroke-width="5"/><ellipse cx="0" cy="0" rx="90" ry="30" fill="url(#gRingTop)" stroke="#22252E" stroke-width="5"/><ellipse cx="0" cy="0" rx="34" ry="11" fill="#2A2D36"/><path d="M-70 -8 Q-20 -22 40 -18" stroke="#A8B0C0" stroke-width="5" fill="none" stroke-linecap="round"/>`;
  if (o.glowTop) s += `<ellipse cx="0" cy="0" rx="96" ry="34" fill="none" stroke="${o.glowTop}" stroke-width="9" opacity=".9"/>`;
  if (o.glowBot) s += `<path d="M-94 22 A94 32 0 0 0 94 22" fill="none" stroke="${o.glowBot}" stroke-width="9" opacity=".9"/>`;
  return s; };
// Pip's pencil in its lump of plasticine with two ring magnets (EP20's bigger version of EP19's pencilRings; the same look). origin = the
// plasticine's base. o.gap: 0..1 of the floating gap (1 = floating; 0 = touching, as when it is flipped and snaps down); o.bob; o.press: a
// finger (four fingers and a thumb) presses the top ring down by that much (0..1); o.n: rings on (2); o.labels: [topUnder, botTop] face labels
// The pencil passes THROUGH each ring's hole (teacher, 24 Nov: it looked as if it stood behind the rings): after each ring is drawn, the
// pencil's piece over the ring's back half is drawn again on top (pencilThrough), from the top face's back edge down to the hole's front lip,
// so the pencil disappears into the hole. Not while the top ring is tilted or half-way through a turn-over (then it is off the pencil).
const RG_BOT = -84, RG_TOP = -250;
const PENCIL20 = `<rect x="-16" y="-520" width="32" height="470" fill="#FFC83A" stroke="#B8861C" stroke-width="5"/><path d="M-16 -520 L0 -570 L16 -520z" fill="#F2D6A8" stroke="#B8861C" stroke-width="4"/><path d="M-6 -552 L0 -570 L6 -552z" fill="#3A3A4A"/><rect x="-10" y="-510" width="8" height="450" fill="#FFE08A"/>`;
// the pencil's piece inside a ring centred at y = yR (pencil coordinates; ring hole rx 34 ry 11, top face ry 30): the shape
// M-16 -30 V9.7 A34 11 0 0 0 16 9.7 V-30z in the ring's coordinates, cut from the pencil itself (the same yellow, outline, stripe, tip).
// sg = -1 for a ring turned over (drawn mirrored: the piece is mirrored too). pen = the pencil's svg (default PENCIL20).
let _pcN = 0;
const pencilThrough = (yR, sg = 1, pen = PENCIL20) => { const id = "pcT" + (_pcN = (_pcN + 1) % 1e6), a = yR - 39 * sg;   // from 9 px above the back edge: the face's outline and glow pass BEHIND the pencil
  return `<clipPath id="${id}"><path d="M-34 ${n2(a)} V${n2(yR)} A34 11 0 0 ${sg > 0 ? 0 : 1} 34 ${n2(yR)} V${n2(a)}z"/></clipPath><g clip-path="url(#${id})">${pen}</g>`; };
function rings20(t, o = {}) { const n = o.n === undefined ? 2 : o.n, gap = o.gap === undefined ? 1 : o.gap, pr = o.press || 0, bob = (o.bob === undefined ? 6 : o.bob) * Math.sin(t * 2.4) * gap * (1 - pr);
  const yTop = o.topY !== undefined ? o.topY : lerp(RG_BOT - 24, RG_TOP + 70 * pr, gap) + bob, sy = o.topSy === undefined ? 1 : o.topSy;
  let s = `<ellipse cx="0" cy="6" rx="150" ry="22" fill="${P.ink}" opacity=".2" filter="url(#b4)"/><path d="M-120 0 Q-110 -60 0 -66 Q110 -60 120 0z" fill="#E86A8A" stroke="#A8405E" stroke-width="5"/><path d="M-80 -30 q30 -16 70 -10" stroke="#FF9AB4" stroke-width="7" fill="none" stroke-linecap="round" opacity=".8"/>`
    + PENCIL20;
  if (n > 0) s += TF(0, RG_BOT, 1, ring20({ glowTop: o.glowBot })) + pencilThrough(RG_BOT);
  if (n > 1) s += `<g transform="translate(0 ${n2(yTop)}) rotate(${o.tilt || 0}) scale(1 ${n2(Math.abs(sy) < .04 ? .04 : sy)})">${ring20({ glowBot: o.glowTop })}</g>`
    + (!o.tilt && Math.abs(Math.abs(sy) - 1) < .001 ? pencilThrough(yTop, Math.sign(sy)) : "");
  if (o.finger) s += TF(-4, yTop - 24 - 160 * (1 - o.finger), .9, holdHand(1, 0));   // a hand (four fingers and a thumb) comes down onto the top ring
  return s; }
// where the gap is (for labels and arrows), in rings20's own coordinates
const ringGapY = (gap = 1) => (lerp(RG_BOT - 24, RG_TOP, gap) + 22 + RG_BOT) / 2;

/* ================================================================ PROPS ================================================================ */
// the class STATIONERY TRAY (clear plastic, compartments; one full of silver steel paper clips, labelled "Paper clips"). origin = its base
// centre; o.taken: 0..1 how many clips have been lifted out (the pile shrinks)
function tray20(t, o = {}) { const tk = o.taken || 0; let clips = "";
  for (let i = 0; i < 18 * (1 - tk * .6); i++) clips += TF(-150 + (i % 6) * 34 + 8 * hash(i, 2), -52 + Math.floor(i / 6) * 14 + 4 * hash(i, 3), .42, clip20(1, 30 * hash(i, 4) - 15 + (i % 2) * 40));
  return `<ellipse cx="0" cy="4" rx="260" ry="16" fill="${P.ink}" opacity=".18" filter="url(#b4)"/><path d="M-250 -80 H250 L240 0 H-240z" fill="#DCEAF2" fill-opacity=".7" stroke="#8EA6B8" stroke-width="5"/>`
    + `<path d="M-30 -80 L-30 0 M90 -80 L90 0" stroke="#8EA6B8" stroke-width="4"/>` + clips
    + TF(150, -40, .5, `<rect x="-90" y="-30" width="180" height="16" rx="5" fill="#E8B04A"/><rect x="-96" y="-10" width="190" height="16" rx="5" fill="#5B9FD0"/><rect x="-80" y="10" width="150" height="16" rx="5" fill="#F06A5E"/>`)
    + `<path d="M-246 -78 H246" stroke="#fff" stroke-width="4" opacity=".7"/>` + TF(-90, -100, 1, `<rect x="-70" y="-18" width="140" height="36" rx="6" fill="#FFFDF4" stroke="#8EA6B8" stroke-width="3"/>` + T(0, 9, "Paper clips", 22, P.ink, { w: 600 })); }
// the class PLANT in a pot (every leaf joins a stem with a short leaf stalk). origin = the pot's base; o.sw: the fan's breeze
function plant20(t, o = {}) { const sw = (o.sw === undefined ? 1 : o.sw); let s = `<ellipse cx="0" cy="2" rx="52" ry="8" fill="${P.ink}" opacity=".2"/><path d="M-44 -62 H44 L34 0 H-34z" fill="#C8693E" stroke="#8A4224" stroke-width="5"/><rect x="-50" y="-74" width="100" height="16" rx="5" fill="#D87A4E" stroke="#8A4224" stroke-width="4"/><ellipse cx="0" cy="-74" rx="44" ry="6" fill="#6A4630"/>`;
  const ST = [[-26, -200, -.3], [4, -240, .1], [28, -190, .4]];
  ST.forEach(([ex, ey, ph], j) => { const b = 6 * Math.sin(t * 1.1 + ph * 3) * sw, tx = ex + b, ty = ey;
    s += `<path d="M${j * 8 - 8} -74 Q${n2(ex * .4)} ${n2(ey * .5)} ${n2(tx)} ${ty}" stroke="#3E8A4A" stroke-width="6" fill="none" stroke-linecap="round"/>`;
    for (let i = 0; i < 4; i++) { const u = .3 + i * .2, px = lerp(j * 8 - 8, tx, u) + (ex * .4 - ex) * .3 * Math.sin(Math.PI * u) * 0, py = lerp(-74, ty, u), sd = i % 2 ? 1 : -1, a = sd * (50 + 10 * Math.sin(t * 1.3 + i + j)) - 10, L = 34 - i * 3;
      s += `<g transform="translate(${n2(px)} ${n2(py)}) rotate(${n2(a)})"><path d="M0 0 L0 -10" stroke="#3E8A4A" stroke-width="4"/><path d="M0 -8 Q${n2(-L * .45)} ${n2(-L * .6)} 0 ${-L - 8} Q${n2(L * .45)} ${n2(-L * .6)} 0 -8z" fill="${(i + j) % 2 ? "#58B56C" : "#4BA862"}" stroke="#2F7A45" stroke-width="3"/><path d="M0 -10 V${-L - 2}" stroke="#2F7A45" stroke-width="1.5" opacity=".6"/></g>`; }
    s += `<g transform="translate(${n2(tx)} ${ty}) rotate(${n2(b * 2)})"><path d="M0 0 Q-16 -18 0 -40 Q16 -18 0 0z" fill="#6CC97E" stroke="#2F7A45" stroke-width="3"/></g>`; });
  return s; }
// Pip's note card on a small easel (HOLD ON!): origin = the easel's feet
const smallEasel = (inner, w = 520, h = 600) => `<ellipse cx="0" cy="6" rx="${w * .55}" ry="16" fill="${P.ink}" opacity=".2" filter="url(#b4)"/><path d="M${-w * .38} 0 L${-w * .3} ${-h - 80} M${w * .38} 0 L${w * .3} ${-h - 80} M0 -30 L0 ${-h - 40}" stroke="#8A5A36" stroke-width="16" stroke-linecap="round"/><rect x="${-w * .5 - 10}" y="-200" width="${w + 20}" height="20" rx="8" fill="#7A4A26"/>`
  + `<g filter="url(#drop)"><rect x="${-w / 2}" y="${-h - 160}" width="${w}" height="${h - 30}" rx="16" fill="#FFFDF6" stroke="#D9C9A8" stroke-width="6"/></g><g transform="translate(0 ${-h / 2 - 175})">${inner}</g>`;
const pipNote = (t) => smallEasel(T(0, -150, "Pip's rings", 40, P.pip) + TF(-110, 40, .32, rings20(t, { bob: 0 })) + T(90, -40, "It will not", 34, P.ink) + T(90, 0, "come down.", 34, P.ink) + T(90, 80, "BROKEN!", 50, "#C4402E")
  + `<g transform="translate(-110 -48)"><circle cx="-10" cy="-6" r="4" fill="${P.ink}"/><circle cx="10" cy="-6" r="4" fill="${P.ink}"/><path d="M-12 10 q12 -10 24 0" stroke="${P.ink}" stroke-width="4" fill="none" stroke-linecap="round"/></g>`, 520, 520);

/* ================================================================ Part 2 props ================================================================ */
// the wooden TOY TRAIN: the engine (red, a chimney, wheels) and a carriage (blue-green, wood), each with a small round magnet at its ends.
// origin = the base of the piece; dir 1 = facing right. o.mag: [back colour, front colour] of the magnet discs
const wheel20 = (x, y, r, t, sp = 0) => `<g transform="translate(${x} ${y}) rotate(${n2(sp * 57)})"><circle r="${r}" fill="#3A3A4A" stroke="#1E1E28" stroke-width="4"/><circle r="${r * .45}" fill="#C9A06A"/><path d="M${-r * .7} 0 H${r * .7}" stroke="#1E1E28" stroke-width="3"/></g>`;
const engine20 = (t, o = {}) => { const sp = o.spin || 0, mb = o.magBack || NORTHC;
  return `<ellipse cx="0" cy="4" rx="170" ry="14" fill="${P.ink}" opacity=".2" filter="url(#b4)"/><rect x="-150" y="-110" width="250" height="80" rx="12" fill="#E0453A" stroke="#8A2418" stroke-width="5"/><rect x="40" y="-200" width="100" height="170" rx="12" fill="#E0453A" stroke="#8A2418" stroke-width="5"/>`
    + `<rect x="58" y="-180" width="64" height="50" rx="8" fill="#BFE6FF" stroke="#8A2418" stroke-width="4"/><rect x="-120" y="-170" width="40" height="64" rx="6" fill="#3A3A4A" stroke="#1E1E28" stroke-width="4"/><rect x="-130" y="-180" width="60" height="16" rx="6" fill="#4A4A5A"/>`
    + `<path d="M-150 -40 H140" stroke="#C9A06A" stroke-width="10"/>` + wheel20(-100, -24, 26, t, sp) + wheel20(-20, -24, 26, t, sp) + wheel20(90, -24, 30, t, sp)
    + `<circle cx="-158" cy="-70" r="16" fill="${mb}" stroke="${P.ink}" stroke-width="4"/>`; };
const carriage20 = (t, o = {}) => { const sp = o.spin || 0, [mb, mf] = o.mag || [SOUTHC, NORTHC];
  return `<ellipse cx="0" cy="4" rx="150" ry="14" fill="${P.ink}" opacity=".2" filter="url(#b4)"/><rect x="-130" y="-130" width="260" height="100" rx="14" fill="#2EB5A6" stroke="#1E7A70" stroke-width="5"/><rect x="-140" y="-140" width="280" height="22" rx="8" fill="#C9A06A" stroke="#8A6A3A" stroke-width="4"/>`
    + [-80, -20, 40].map((x) => `<rect x="${x}" y="-112" width="44" height="40" rx="6" fill="#BFE6FF" stroke="#1E7A70" stroke-width="3"/>`).join("") + wheel20(-80, -24, 24, t, sp) + wheel20(80, -24, 24, t, sp)
    + `<circle cx="-142" cy="-76" r="15" fill="${mb}" stroke="${P.ink}" stroke-width="4"/><circle cx="142" cy="-76" r="15" fill="${mf}" stroke="${P.ink}" stroke-width="4"/>`; };
const trainToy = (t, k = 1, joined = true) => TF(0, 0, k, TF(-150, 0, .8, carriage20(t)) + TF(150, 0, .8, engine20(t, { magBack: SOUTHC })));
// Dad's two plain unpainted grey BARS (iron A, magnet B: the same look) with paper tags; origin = the bar's middle (vertical = false: lying)
const greyBar = (tag, k = 1) => TF(0, 0, k, `<g filter="url(#dropS)"><rect x="-150" y="-28" width="300" height="56" rx="8" fill="${BARC}" stroke="#4E535C" stroke-width="5"/></g><rect x="-140" y="-22" width="280" height="12" rx="6" fill="#C4C8D0" opacity=".6"/><path d="M-120 14 H120" stroke="#6E737C" stroke-width="3" opacity=".5"/>`
  + `<g transform="translate(0 -6) rotate(-6)"><path d="M0 -34 L0 -50" stroke="#B8A890" stroke-width="3"/><rect x="-30" y="-34" width="60" height="44" rx="6" fill="#FFFDF4" stroke="#B8A890" stroke-width="3"/>${T(0, 0, tag, 34, P.ink)}</g>`);
// Dad's red TOOLBOX (open). origin = its base
const toolbox20 = (k = 1) => TF(0, 0, k, `<ellipse cx="0" cy="4" rx="170" ry="14" fill="${P.ink}" opacity=".2" filter="url(#b4)"/><path d="M-150 -130 H150 V0 H-150z" fill="#D6402E" stroke="#8A2418" stroke-width="6"/><path d="M-150 -130 L-170 -200 H170 L150 -130" fill="#E85A44" stroke="#8A2418" stroke-width="6" stroke-linejoin="round"/>`
  + `<rect x="-110" y="-190" width="40" height="70" rx="6" fill="#8E96A4" stroke="#4E5462" stroke-width="4" transform="rotate(-12 -90 -150)"/><rect x="-20" y="-200" width="18" height="90" rx="6" fill="#E8B04A" stroke="#8A6A2A" stroke-width="4" transform="rotate(8 -10 -150)"/><path d="M40 -200 L90 -140" stroke="#5A6070" stroke-width="12" stroke-linecap="round"/>`
  + `<rect x="-40" y="-90" width="80" height="20" rx="6" fill="#8A2418"/><path d="M-150 -70 H150" stroke="#8A2418" stroke-width="4" opacity=".6"/>`);
// an iron NAIL (dark grey, a flat head, a point). origin = its middle
const nail20 = (k = 1, rot = 0) => TF(0, 0, k, `<path d="M-96 -8 H88 L112 0 L88 8 H-96z" fill="#6A707C" stroke="#2E323C" stroke-width="4" stroke-linejoin="round"/><path d="M-92 -4 H80" stroke="#A8B0BC" stroke-width="3"/><rect x="-110" y="-24" width="16" height="48" rx="5" fill="#4A5060" stroke="#2E323C" stroke-width="4"/>`, rot);
// a whiteboard magnet (round, coloured). origin = its middle
const wbMag = (x, y, col = "#5A7BD8", r = 20) => `<circle cx="${x}" cy="${y + 3}" r="${r}" fill="${P.ink}" opacity=".25"/><circle cx="${x}" cy="${y}" r="${r}" fill="${col}" stroke="${P.ink}" stroke-width="3"/><circle cx="${x - r * .3}" cy="${y - r * .3}" r="${r * .3}" fill="#fff" opacity=".5"/>`;
