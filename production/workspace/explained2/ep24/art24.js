// art24.js: EP24's own drawings ("Was that test fair? Change only one thing"). Pure functions of t. Builds on EP23's engine (art23.js:
// battHolder23, rig23, watchO, glanceWave; art22.js: clipBunch, trayClips22; ep23dare.js: nail23d, coil23d, batt23d; ep21dare.js: bar20).
// Science pictures (SERIES_FORMAT 25 Nov): the iron nail and the steel nail are drawn the SAME size and shape (the steel one a slightly
// bluer grey), told apart by their tags, so no picture suggests one is "more magnetic" by its looks; every bar magnet is ONE piece of metal
// end to end (red / blue paint only, bar20); coils are neat side-by-side turns (coil23d), the count in the label.
const CHANGEDC = "#E0453A", SAMEC = "#2FA35A", ROWC = ["#06A77D", "#2F6FD6", "#D9A21B"];   // changed (red), the same (green); the plan's rows
const IRONC24 = ["#8E979F", "#454C54", "#D8DEE3", "#A7B0B8"], STEELC24 = ["#86A0BC", "#34465C", "#EAF2FB", "#A9BED4"];
// a vertical nail, tip at (0, 0), head at y -287 k (as nail23d); kind "iron" | "steel"
const nail24 = (kind, k = 1) => { const c = kind === "steel" ? STEELC24 : IRONC24;
  return TF(0, -150 * k, k, `<path d="M-128 -9 H96 L150 0 L96 9 H-128z" fill="${c[0]}" stroke="${c[1]}" stroke-width="4.5" stroke-linejoin="round"/><path d="M-126 -5 H94 L136 -1" stroke="${c[2]}" stroke-width="4" fill="none" stroke-linecap="round"/><ellipse cx="-137" cy="0" rx="13" ry="31" fill="${c[3]}" stroke="${c[1]}" stroke-width="4.5"/>`, 90); };
// a SET-UP: a nail (tip at 0, 0) with a coil of n turns, its two leads to a battery holder (1 or 2 AA) at its left foot, clips at its tip.
// o: kind, n, batt (1 | 2), clips (number hanging), ct0 (clips jump from t), k, tag (text over the head), tagC, holder (false: none), hx, hy
function setup24(t, o = {}) { const k = o.k || 1, n = o.n === undefined ? 20 : o.n, hb = o.batt || 1, hx = o.hx === undefined ? -230 : o.hx, hy = o.hy === undefined ? 40 : o.hy, hk = o.hk || .55;
  let s = nail24(o.kind || "iron", 1) + coil23d(Math.round(n), 1);
  if (o.holder !== false) { const W2 = HOLDW(hb) * hk, cA = [hx - W2, hy - 45 * hk], cB = [hx + W2, hy - 45 * hk], yb = -252 + Math.min(n, 20) * 11;
    s += TF(hx, hy, hk, battHolder23(t, hb)) + `<path d="M-110 -120 C-170 -100 ${n2(cA[0] - 30)} ${n2(cA[1] - 60)} ${n2(cA[0])} ${n2(cA[1])}" stroke="${WIRED}" stroke-width="9" fill="none" stroke-linecap="round"/><path d="M-110 -120 C-170 -100 ${n2(cA[0] - 30)} ${n2(cA[1] - 60)} ${n2(cA[0])} ${n2(cA[1])}" stroke="${WIREC}" stroke-width="5.5" fill="none" stroke-linecap="round"/>`
      + `<path d="M-96 ${yb + 50} C-80 ${yb + 90} ${n2(cB[0] + 40)} ${n2(cB[1] - 50)} ${n2(cB[0])} ${n2(cB[1])}" stroke="${WIRED}" stroke-width="9" fill="none" stroke-linecap="round"/><path d="M-96 ${yb + 50} C-80 ${yb + 90} ${n2(cB[0] + 40)} ${n2(cB[1] - 50)} ${n2(cB[0])} ${n2(cB[1])}" stroke="${WIREC}" stroke-width="5.5" fill="none" stroke-linecap="round"/>`
      + [cA, cB].map((c) => `<rect x="${n2(c[0] - 8)}" y="${n2(c[1] - 10)}" width="16" height="20" rx="4" fill="#C9CED4" stroke="#6E7882" stroke-width="2.5"/>`).join(""); }
  if (o.clips) s += clipBunch(t, 0, 2, o.clips, { k: o.ck || .9, ...(o.ct0 !== undefined ? { t0: o.ct0, from: [0, 120] } : {}) });
  if (o.tag) s += `<path d="M0 -300 V-338" stroke="${o.tagC || P.ink}" stroke-width="4"/>` + TF(0, -366, 1, tpill(0, 0, o.tag, o.tagS || 34, "#fff", o.tagC || P.ink, { w: 700 }));
  return TF(o.x || 0, o.y || 0, k, s); }
// a tag that GLOWS red ("different") or green ("the same") round a part: an outline rect in art coordinates
const glowBox24 = (t, t0, x, y, w, h, col, t1) => { if (t < t0 || (t1 !== undefined && t > t1 + .3)) return ""; const a = ramp(t, t0, .25) * (t1 === undefined ? 1 : 1 - ramp(t, t1, .3));
  return OP(a, `<rect x="${n2(x - w / 2)}" y="${n2(y - h / 2)}" width="${n2(w)}" height="${n2(h)}" rx="18" fill="${col}" opacity=".12"/><rect x="${n2(x - w / 2)}" y="${n2(y - h / 2)}" width="${n2(w)}" height="${n2(h)}" rx="18" fill="none" stroke="${col}" stroke-width="7" opacity="${n2(.7 + .3 * Math.sin(t * 5))}"/>`); };
const chip24 = (txt, col, size = 30) => tpill(0, 0, txt, size, col, "#fff", { w: 700 });
// steel pins (Momo's magnet race): a tray of pins, and a bunch hanging from a magnet's end
const pin24 = (x, y, a, k = 1) => TF(x, y, k, `<path d="M-26 0 H22" stroke="#8C98A4" stroke-width="5" stroke-linecap="round"/><path d="M-24 -1.5 H20" stroke="#E6ECF2" stroke-width="2"/><circle cx="-28" cy="0" r="6" fill="#C9D2DA" stroke="#5C6872" stroke-width="2.5"/>`, a);
function pinTray24(t, x, y, k = 1, o = {}) { const n = o.n === undefined ? 20 : o.n; let c = "";
  for (let i = 0; i < n; i++) c += pin24(-120 + (i * 47) % 240 + 12 * hash(i, 5), -42 + Math.floor(i / 5) * 8 + 4 * hash(i, 6), 180 * hash(i, 7), .9);
  return TF(x, y, k, `<ellipse cx="0" cy="8" rx="180" ry="14" fill="${P.ink}" opacity=".18" filter="url(#b4)"/><path d="M-160 -62 H160 L148 0 H-148z" fill="#EDE3D2" stroke="#8C7A5E" stroke-width="5" stroke-linejoin="round"/><path d="M-142 -52 H142 L136 -8 H-136z" fill="#D9CCB4"/>` + c); }
const pinBunch24 = (t, x, y, n, k = 1) => { let s = ""; for (let j = 0; j < n; j++) { const c = (j % 4) - 1.5, r = Math.floor(j / 4), sw = 4 * Math.sin(t * 2 + j); s += pin24(x + (c * 16 + sw) * k, y + (26 + r * 34) * k, 90 + c * 14 + sw, .9 * k); } return s; };
// a bar magnet held by a paw at a height over its tray (o.flip: N on the right); pins hang from its lower edge
const heldBar24 = (t, x, y, k, pins, o = {}) => TF(x, y, k, bar20(t, { glint: false, flip: o.flip }) + pinBunch24(t, -40, 34, pins, 1.1), o.rot || 0);
// a ruler standing up (the same height), cm marks
const ruler24 = (x, y, h, k = 1) => TF(x, y, k, `<rect x="-22" y="${-h}" width="44" height="${h}" rx="4" fill="#F7D66A" stroke="#A8862A" stroke-width="4"/>` + [...Array(Math.floor(h / 20))].map((_, i) => `<path d="M-22 ${-i * 20 - 10} h${i % 5 === 0 ? 22 : 12}" stroke="#7A5E1A" stroke-width="3"/>`).join(""));

/* ================================================================ THE BOARDS ================================================================ */
// IRON OR STEEL? our fair test (Part 1; the whiteboard on its stand at HSB, EP23's HOW STRONG? home). o.change (t: "the kind of nail"),
// o.same [t1..t4] (20 turns · 1 battery · same wire · same clips), o.fair (t: "Now it's fair: let's test!"), o.all
function fairBoard24(t, x, y, k = 1, o = {}) { const W = 520, Hh = 400, at = (tt) => tt === undefined ? 0 : (o.all ? 1 : ramp(t, tt, .35));
  let c = `<rect x="${-W / 2}" y="0" width="${W}" height="${Hh}" rx="10" fill="#FDFEFF" stroke="#8A949E" stroke-width="8"/>` + T(0, 52, "IRON OR STEEL?", 44, "#2E6E9A", { ls: 2 }) + T(0, 84, "our fair test", 24, "#5A6A7A", { w: 600 });
  c += T(-W / 2 + 30, 136, "Change:", 28, CHANGEDC, { a: "start", w: 700 }) + `<rect x="-90" y="106" width="330" height="44" rx="8" fill="none" stroke="#C9D2DA" stroke-width="3" stroke-dasharray="7 6"/>`;
  if (at(o.change) > .01) c += OP(at(o.change), T(75, 137, "the kind of nail", 27, P.ink, { w: 700 }));
  c += T(-W / 2 + 30, 196, "Keep the same:", 28, SAMEC, { a: "start", w: 700 });
  ["20 turns", "1 battery", "same wire", "same clips"].forEach((lab, i) => { const bx = -W / 2 + 40 + (i % 2) * 240, by = 218 + Math.floor(i / 2) * 56, a = at((o.same || [])[i]);
    c += `<rect x="${bx}" y="${by}" width="34" height="34" rx="6" fill="#fff" stroke="#9AA6B2" stroke-width="3"/>` + T(bx + 48, by + 26, lab, 25, P.ink, { a: "start", w: 600 });
    if (a > .01) c += OP(a, `<path d="M${bx + 6} ${by + 18} l8 9 l15 -18" stroke="${SAMEC}" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`); });
  if (at(o.fair) > .01) c += OP(at(o.fair), TF(0, Hh - 38, 1, `<g transform="rotate(-2)"><rect x="-220" y="-24" width="440" height="48" rx="24" fill="${GOODC}"/>${T(0, 11, "Now it's fair: let's test!", 27, "#fff")}</g>`));
  return TF(x, y, k, `<ellipse cx="0" cy="4" rx="170" ry="10" fill="${P.ink}" opacity=".2" filter="url(#b4)"/><path d="M-120 0 L-80 -110 M120 0 L80 -110" stroke="#6E7882" stroke-width="10" stroke-linecap="round"/><rect x="-14" y="-130" width="28" height="130" fill="#8A949E"/><g transform="translate(0 ${-Hh - 110})"><g filter="url(#drop)">${c}</g></g>`); }
// OUR PLAN (Part 2; the same home): three coloured rows (short), Our counts, READY!. o.rows [t1, t2, t3], o.c2 / o.c1 (count lines), o.ready
function planBoard24(t, x, y, k = 1, o = {}) { const W = 520, Hh = 400, at = (tt) => tt === undefined ? 0 : (o.all ? 1 : ramp(t, tt, .35));
  let c = `<rect x="${-W / 2}" y="0" width="${W}" height="${Hh}" rx="10" fill="#FDFEFF" stroke="#8A949E" stroke-width="8"/>` + T(0, 50, "OUR PLAN", 44, "#2E6E9A", { ls: 2 }) + T(0, 80, "more batteries: stronger?", 23, "#5A6A7A", { w: 600 });
  [["Change:", "the number of batteries"], ["Keep the same:", "batteries, clips, nail, turns"], ["Measure:", "the clips attracted"]].forEach(([h, v], i) => { const ry = 100 + i * 52, a = at((o.rows || [])[i]);
    c += `<rect x="${-W / 2 + 16}" y="${ry}" width="${W - 32}" height="44" rx="10" fill="${ROWC[i]}" opacity=".14"/>` + T(-W / 2 + 28, ry + 30, h, 24, ROWC[i], { a: "start", w: 700 });
    if (a > .01) c += OP(a, T(-W / 2 + (i === 1 ? 200 : 150), ry + 30, v, 23, P.ink, { a: "start", w: 600 })); });
  c += T(-W / 2 + 28, 288, "Our counts:", 25, P.ink, { a: "start", w: 700 });
  if (at(o.c2) > .01) c += OP(at(o.c2), T(-W / 2 + 28, 324, "2 batteries: 9 · 8 · 9", 26, P.ink, { a: "start", w: 600 }));
  if (at(o.c1) > .01) c += OP(at(o.c1), T(-W / 2 + 28, 360, "1 battery: 5 · 6 · 5", 26, P.ink, { a: "start", w: 600 }));
  if (o.ready !== undefined && (t >= o.ready || o.all)) c += TF(150, 312, spring(t, o.ready, .45), `<g transform="rotate(-6)"><rect x="-90" y="-28" width="180" height="56" rx="28" fill="${GOODC}"/>${T(0, 13, "READY!", 32, "#fff", { ls: 2 })}</g>`);
  return TF(x, y, k, `<ellipse cx="0" cy="4" rx="170" ry="10" fill="${P.ink}" opacity=".2" filter="url(#b4)"/><path d="M-120 0 L-80 -110 M120 0 L80 -110" stroke="#6E7882" stroke-width="10" stroke-linecap="round"/><rect x="-14" y="-130" width="28" height="130" fill="#8A949E"/><g transform="translate(0 ${-Hh - 110})"><g filter="url(#drop)">${c}</g></g>`); }
// Pip's plan card (Part 2's Showdown), on Momo's easel: three ruled lines, each with a small drawing; o.lit, o.strike, o.rewrite
function planCard24(t, x, y, k = 1, o = {}) { const W = 600, Hh = 560, L = ["Change only the number of batteries.", "Keep everything else the same.", "Count the clips once, and we are done!"];
  let c = T(0, 50, "Pip's plan: more batteries?", 32, "#6A4FC8", { w: 700 });
  L.forEach((ln, i) => { const ly = 100 + i * 130, lit = o.lit && o.lit[i] !== undefined ? (t >= o.lit[i] ? 1 - .6 * ss(o.lit[i] + 2.6, o.lit[i] + 3, t) : 0) : 0;
    if (lit > .01) c += `<rect x="-280" y="${ly - 6}" width="560" height="112" rx="14" fill="${P.sun}" opacity="${n2(.35 * lit)}"/>`;
    c += numBadge(-250, ly + 40, i + 1, 26) + `<path d="M-215 ${ly + 100} H280" stroke="#D4DCE4" stroke-width="3"/>`;
    const words = ln.split(" "), half = Math.ceil(words.length / 2); c += T(-210, ly + 36, words.slice(0, half).join(" "), 27, P.ink, { a: "start", w: 600 }) + T(-210, ly + 72, words.slice(half).join(" "), 27, P.ink, { a: "start", w: 600 });
    const px = 215, py = ly + 50;
    if (i === 0) c += TF(px - 40, py + 20, .22, battHolder23(t, 1)) + TF(px + 40, py + 20, .18, battHolder23(t, 2));
    if (i === 1) c += [0, 1, 2].map((j) => `<path d="M${px - 50 + j * 36} ${py} l8 9 l15 -18" stroke="${SAMEC}" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`).join("");
    if (i === 2) c += `<path d="M${px - 10} ${py - 26} V${py + 26}" stroke="${P.ink}" stroke-width="6" stroke-linecap="round"/>` + T(px + 40, py + 12, "x1", 28, P.ink, { w: 700 }); });
  if (o.strike !== undefined && t >= o.strike) { const u = eo(clamp((t - o.strike) / .35)); c += `<path d="M-220 ${100 + 2 * 130 + 32} H${n2(-220 + 470 * u)}" stroke="#D84A3A" stroke-width="7" stroke-linecap="round"/><path d="M-220 ${100 + 2 * 130 + 68} H${n2(-220 + 400 * u)}" stroke="#D84A3A" stroke-width="7" stroke-linecap="round"/>`; }
  if (o.rewrite !== undefined && t >= o.rewrite) c += OP(ramp(t, o.rewrite, .3), T(0, Hh - 26, "Count the clips a few times.", 30, GOODC, { w: 700 }));
  return TF(x, y, k, `<path d="M-200 0 L-150 -${Hh + 60} M200 0 L150 -${Hh + 60} M0 0 L0 -${Hh}" stroke="#7A5230" stroke-width="12" stroke-linecap="round"/><g transform="translate(0 ${-Hh - 90})"><g filter="url(#drop)"><rect x="${-W / 2}" y="0" width="${W}" height="${Hh}" rx="14" fill="#FFFDF4" stroke="#C9B88A" stroke-width="5"/>${c}</g></g>`); }

/* ================================================================ THE HIDDEN ANIMALS ================================================================ */
// FACES: right. The woodlouse (pill bug): a grey-brown oval of overlapping plates, seven pairs of short legs rippling, two short feelers, big
// friendly eyes with a highlight; o.ball (0..1) rolls it into a ball; o.walk animates the legs. Mirrored with a negative x-scale only.
// FACES: right
function woodlouse24(t, o = {}) { const b = clamp(o.ball || 0), ph = (o.ph || 0) + t * 7, w = lerp(1, .55, b);
  let legs = ""; if (b < .7) for (let i = 0; i < 7; i++) { const lx = -38 + i * 12, sw = (o.walk === false ? 0 : 4 * Math.sin(ph + i * .9)); legs += `<path d="M${lx} 10 l${n2(-3 + sw)} 12" stroke="#4A3E36" stroke-width="3.5" stroke-linecap="round" opacity="${n2(1 - b)}"/>`; }
  let plates = ""; for (let i = 0; i < 7; i++) plates += `<path d="M${n2((-40 + i * 12) * w)} ${n2(-14 - 8 * Math.sin(Math.PI * (i + .5) / 7))} q${n2(4 * w)} ${n2(16)} 0 ${n2(26)}" stroke="#6E625A" stroke-width="2.5" fill="none" opacity=".8"/>`;
  const body = b < .5 ? `<ellipse cx="0" cy="0" rx="${n2(50 * w)}" ry="${n2(22 + 12 * b)}" fill="#8A7E74" stroke="#4A3E36" stroke-width="4"/>${plates}<ellipse cx="-8" cy="-10" rx="${n2(30 * w)}" ry="6" fill="#B8ACA0" opacity=".5"/>`
    : `<circle cx="0" cy="-6" r="28" fill="#8A7E74" stroke="#4A3E36" stroke-width="4"/>` + [0, 1, 2, 3].map((i) => `<path d="M${-24 + i * 14} -30 q8 24 0 48" stroke="#6E625A" stroke-width="2.5" fill="none"/>`).join("");
  const face = b < .5 ? `<path d="M48 -6 q16 -16 26 -10 M48 2 q18 -4 28 4" stroke="#4A3E36" stroke-width="3" fill="none" stroke-linecap="round"/><circle cx="40" cy="-6" r="7" fill="#fff" stroke="#2A2420" stroke-width="2"/><circle cx="42" cy="-6" r="4" fill="#1A1410"/><circle cx="43.5" cy="-7.5" r="1.6" fill="#fff"/><path d="M38 6 q5 3 9 0" stroke="#2A2420" stroke-width="2" fill="none" stroke-linecap="round"/>` : "";
  return `<g transform="translate(0 ${n2(-1.5 * Math.abs(Math.sin(ph * .5)) * (1 - b))})">${legs}${body}${face}</g>`; }
// FACES: right (it walks on the spot: legs ripple, no travel, so it never slides backwards)
const woodlouseAt = (t, x, y, k = .3, o = {}) => { const dx = 0, dir = o.dir || 1; return `<g transform="translate(${n2(x + dx)} ${n2(y)}) scale(${n2(dir * k)} ${n2(k)}) rotate(${o.rot || 0})">${woodlouse24(t, o)}</g>`; };
// FACES: right. The Eurasian tree sparrow: a chestnut cap, a black cheek spot on a white cheek, a little black bib, a brown streaked back,
// big friendly eyes; it hops (o.hop), pecks (o.peck) and tilts its head. Mirrored with a negative x-scale only.
// FACES: right
function sparrow24(t, o = {}) { const ph = (o.ph || 0) + t, hop = o.hop === false ? 0 : Math.max(0, Math.sin(ph * 2.2)) * 10, peck = o.peck ? Math.max(0, Math.sin(ph * 3)) : 0, tilt = 8 * Math.sin(ph * .9);
  return `<g transform="translate(0 ${n2(-hop)})"><path d="M-8 30 l-6 16 M8 30 l4 16" stroke="#C98A5A" stroke-width="4" stroke-linecap="round"/><path d="M-30 6 L-64 -4 L-60 10z" fill="#5A4030" stroke="#3A2A20" stroke-width="3" stroke-linejoin="round"/>`
    + `<ellipse cx="0" cy="8" rx="34" ry="26" fill="#B8865A" stroke="#4A3424" stroke-width="4"/><path d="M-26 0 q16 -12 34 -6 M-22 12 q14 -6 28 -2" stroke="#5A3E28" stroke-width="3" fill="none"/><ellipse cx="6" cy="20" rx="22" ry="12" fill="#E8DCC8"/>`
    + `<g transform="translate(20 ${n2(-18 + peck * 14)}) rotate(${n2(tilt + peck * 30)})"><circle r="20" fill="#F2EEE6" stroke="#4A3424" stroke-width="4"/><path d="M-18 -6 Q-10 -24 14 -16 Q20 -12 18 -4 Q0 -14 -18 -6z" fill="#8A4A2A"/><circle cx="2" cy="6" r="5" fill="#1A1410"/><path d="M6 14 q4 8 0 10 q-6 -2 -8 -8z" fill="#1A1410"/>`
    + `<circle cx="9" cy="-3" r="5.5" fill="#1A1410"/><circle cx="10.5" cy="-4.5" r="1.8" fill="#fff"/><path d="M18 0 L30 3 L18 7z" fill="#3A3030"/></g></g>`; }
// FACES: right (it hops on the spot, no travel)
const sparrowAt = (t, x, y, k = .3, o = {}) => `<g transform="translate(${n2(x)} ${n2(y)}) scale(${n2((o.dir || 1) * k)} ${n2(k)})">${sparrow24(t, o)}</g>`;
// the hidden animals' spots in the science room (world coordinates of SR23; each scene its own fair spot, never back at the intro spot)
// Part 1: the woodlouse (intro: in the shadow under the sink's edge; revealed under the cupboard door)
const WLAT = { intro: [760, 636, .32, {}], waitw: [1012, 634, .28, { dir: -1 }], answer: [1300, 636, .28, {}], lc1q: [1490, 634, .28, { dir: -1 }], holdon: [262, 636, .3, {}],
  lc2q: [1060, 838, .26, { dir: -1 }], cliff: [1540, 636, .28, {}], liz: [1395, 636, .34, {}] };
['cold', 'lasttime', 'back', 'today', 'game'].forEach((k) => { WLAT[k] = WLAT.intro; });
// Part 2: the sparrow (intro: on the windowsill; revealed on top of the door frame)
const SPAT = { intro: [560, 522, .34, { peck: true }], r1ans: [300, 262, .3, { dir: -1 }], lc1q: [880, 166, .3, {}], show: [470, 150, .3, { dir: -1 }], fix: [470, 150, .3, { dir: -1 }],
  lc2q: [1180, 254, .3, {}], crane: [200, 522, .32, { peck: true }], liz: [1640, 118, .36, {}] };
['lab', 'game'].forEach((k) => { SPAT[k] = SPAT.intro; });
// SR24: EP23's science room (SR23) without its cricket or HOW STRONG?, with this episode's board at its home and the hidden animal
const HSB24 = [1150, 852, .7];
function SR24(t, o = {}, cam) { const sc = (window._S || {}).name, A = PART === 1 ? WLAT : SPAT, bd = o.bug === undefined ? A[sc] : o.bug;
  const ani = bd ? (PART === 1 ? woodlouseAt(t, bd[0], bd[1], bd[2], bd[3]) : sparrowAt(t, bd[0], bd[1], bd[2], bd[3])) : "";
  const board = o.board === false ? "" : (PART === 1 ? fairBoard24(t, HSB24[0], HSB24[1], HSB24[2], o.boardO || {}) : planBoard24(t, HSB24[0], HSB24[1], HSB24[2], o.boardO || {}));
  return SR23(t, { ...o, bug: false, hs: false, bench: ani + board + (o.bench || "") }, cam); }

/* ================================================================ THE DARE INTO EP25 (a quick kitchen picture) ================================================================ */
// FACES: none (the fridge only swings). A tall two-door fridge, its main door hinged on the right; o.open 0..1 (the door's swing), the soft
// white edge (gasket) drawn round the door. origin = its feet, centre
// FACES: none
function fridge24(t, o = {}) { const op = clamp(o.open || 0), W = 300, H = 720, dw = W * Math.cos(op * 1.25);
  return `<ellipse cx="0" cy="6" rx="190" ry="14" fill="${P.ink}" opacity=".22" filter="url(#b4)"/><rect x="${-W / 2}" y="${-H}" width="${W}" height="${H}" rx="22" fill="#E9EEF2" stroke="#8C98A4" stroke-width="6"/>`
    + `<rect x="${-W / 2 + 14}" y="${-H + 250}" width="${W - 28}" height="${H - 270}" rx="10" fill="#CFE6F2"/><path d="M${-W / 2 + 24} ${-H + 330} H${W / 2 - 24} M${-W / 2 + 24} ${-H + 450} H${W / 2 - 24}" stroke="#A9C8DA" stroke-width="6"/>`
    + `<rect x="${-W / 2 + 40}" y="${-H + 470}" width="70" height="60" rx="8" fill="#F2A65A"/><rect x="${-W / 2 + 130}" y="${-H + 480}" width="40" height="50" rx="8" fill="#7CC37A"/><rect x="${-W / 2 + 40}" y="${-H + 360}" width="50" height="80" rx="10" fill="#FFFFFF" stroke="#A9C8DA" stroke-width="3"/>`
    + `<rect x="${-W / 2}" y="${-H}" width="${W}" height="236" rx="22" fill="#F3F6F8" stroke="#8C98A4" stroke-width="6"/><rect x="${W / 2 - 40}" y="${-H + 120}" width="14" height="90" rx="7" fill="#B8C2CC"/>`
    + `<g transform="translate(${W / 2} 0)"><rect x="${n2(-dw)}" y="${-H + 240}" width="${n2(Math.max(8, dw))}" height="${H - 250}" rx="18" fill="#F7F9FA" stroke="#8C98A4" stroke-width="6"/><rect x="${n2(-dw + 6)}" y="${-H + 246}" width="${n2(Math.max(2, dw - 12))}" height="${H - 262}" rx="14" fill="none" stroke="#FFFFFF" stroke-width="8"/>`
    + (dw > 60 ? `<rect x="${n2(-dw + 24)}" y="${-H + 290}" width="14" height="110" rx="7" fill="#B8C2CC"/>` + (o.photos !== false ? `<rect x="${n2(-dw + 70)}" y="${-H + 300}" width="90" height="70" rx="4" fill="#fff" stroke="#C9D2DA" stroke-width="3" transform="rotate(-4 ${n2(-dw + 115)} ${-H + 335})"/><rect x="${n2(-dw + 78)}" y="${-H + 308}" width="74" height="48" fill="#9BD3F2"/><circle cx="${n2(-dw + 120)}" cy="${-H + 302}" r="9" fill="#E0453A"/>` : "") : "") + `</g>`; }
