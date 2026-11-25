// art25.js: EP25's own drawings ("Magnets are everywhere: fridges, cranes and floating trains"). Pure functions of t. Builds on EP23 / EP24
// (art23.js yardCrane23, battHolder23; art24.js fridge24, chip24, nail24; art22.js fishP, rod22, pond22, clip21; ep21dare.js bar20).
// Science pictures (SERIES_FORMAT 25 Nov): every bar magnet is ONE piece of metal end to end (red / blue paint only, bar20); the fridge's
// magnetic strip runs ALL the way round the door inside its soft edge; the whiteboard's steel sheet is a thin layer under the whole surface;
// the maglev floats on magnets with a clear gap (like poles facing, push arrows between); the MRI is drawn simply and safely (a large round
// housing with a tunnel, a padded bed, a calm child, a parent's hand, a nurse; nothing inside it, nothing flying).
const ALUC = ["#C9D1D8", "#8C98A4", "#F2F5F8"];
/* ================================================================ PIP'S HDB KITCHEN (Part 1) ================================================================ */
// EP15's baked kitchen (kitchen15.png: cabinets, the window onto the HDB blocks, the calendar, the fruit bowl, the sink) + this episode's
// things: the window's frame re-drawn in shiny aluminium (with a small tag when named), a short café curtain, the little magnetic
// whiteboard on the wall at the left, the tall fridge at the right end (its door swings: o.open), the MAGNET HUNT card on the freezer door
const KIT = { win: [778, 108, 1504, 552], fridge: [1700, 1112, 1.15], wb: [230, 440], curtain: [800, 118] };
const alWindow25 = (t, o = {}) => { const [x0, y0, x1, y1] = KIT.win, f = (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${ALUC[0]}" stroke="${ALUC[1]}" stroke-width="3"/><rect x="${x + 2}" y="${y + 2}" width="${w - 4}" height="${Math.max(2, h * .25)}" fill="${ALUC[2]}" opacity=".7"/>`;
  return f(x0 - 6, y0 - 6, x1 - x0 + 12, 22) + f(x0 - 6, y1 - 16, x1 - x0 + 12, 22) + f(x0 - 6, y0, 22, y1 - y0) + f(x1 - 16, y0, 22, y1 - y0) + f((x0 + x1) / 2 - 10, y0, 20, y1 - y0)
    + `<path d="M${x0 + 30} ${y0 + 30} l60 60 M${x1 - 120} ${y0 + 40} l50 50" stroke="#fff" stroke-width="6" opacity=".5"/>`; };
const curtain25 = (t) => { const [x, y] = KIT.curtain, sw = 6 * Math.sin(t * 1.3); return `<path d="M${x} ${y} H${x + 150} Q${x + 150 + sw} ${y + 160} ${x + 120 + sw} ${y + 300} Q${x + 60} ${y + 320} ${x} ${y + 300}z" fill="#F7C9C0" stroke="#C98A80" stroke-width="4"/>` + [1, 2, 3].map((i) => `<path d="M${x + i * 36} ${y + 6} Q${x + i * 36 + sw * .6} ${y + 150} ${x + i * 32 + sw} ${y + 296}" stroke="#E0A69C" stroke-width="3" fill="none"/>`).join("") + `<rect x="${x - 10}" y="${y - 8}" width="180" height="12" rx="6" fill="#B8C2CC"/>`; };
// the little magnetic whiteboard (a timetable held by a round fridge magnet); origin = its centre
const whiteboard25 = (t, x, y, k = 1, o = {}) => TF(x, y, k, `<g filter="url(#dropS)"><rect x="-160" y="-100" width="320" height="200" rx="10" fill="${ALUC[0]}" stroke="${ALUC[1]}" stroke-width="5"/></g><rect x="-148" y="-88" width="296" height="176" rx="6" fill="#FDFEFF"/>`
  + `<rect x="-120" y="-70" width="130" height="100" fill="#FFF6C8" stroke="#D9C27A" stroke-width="3" transform="rotate(-3)"/>` + [0, 1, 2, 3].map((i) => `<path d="M-108 ${-48 + i * 20} h100" stroke="#B8A060" stroke-width="3"/>`).join("") + `<circle cx="-56" cy="-70" r="16" fill="#E0453A" stroke="#9A2A1E" stroke-width="3"/>`
  + `<path d="M40 -40 q30 -20 60 0 M40 0 q40 -10 80 6" stroke="#3A6FD0" stroke-width="5" fill="none" stroke-linecap="round"/>` + (o.magnet ? `<circle cx="${o.magnet[0]}" cy="${o.magnet[1]}" r="18" fill="#2F6FD6" stroke="#1E3E8A" stroke-width="3"/>` : ""));
// the MAGNET HUNT card (Part 1: Pip's home; Part 2: out and about); o.ticks [[t, label, ok]], o.title
function huntCard25(t, x, y, k = 1, o = {}) { const L = o.items || [], H = 90 + L.length * 44;
  let c = `<g filter="url(#drop)"><rect x="-170" y="0" width="340" height="${H}" rx="14" fill="#FFFDF4" stroke="#C9B88A" stroke-width="4"/></g>` + T(0, 40, o.title || "MAGNET HUNT", 30, "#2E6E9A", { w: 700 }) + T(0, 68, o.sub || "Pip's home", 20, "#5A6A7A", { w: 600 });
  L.forEach(([tt, lab, ok], i) => { const yy = 96 + i * 44, a = o.all ? 1 : (tt === undefined ? 0 : ramp(t, tt, .3)); c += `<rect x="-150" y="${yy}" width="30" height="30" rx="6" fill="#fff" stroke="#9AA6B2" stroke-width="3"/>`;
    if (a > .01) c += OP(a, T(-108, yy + 23, lab, 21, P.ink, { a: "start", w: 600 }) + (ok ? `<path d="M-145 ${yy + 15} l8 9 l15 -18" stroke="#2FA35A" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>` : `<path d="M-145 ${yy + 5} l20 20 M-125 ${yy + 5} l-20 20" stroke="#D84A3A" stroke-width="5" stroke-linecap="round"/>`)); });
  return TF(x, y, k, c + `<circle cx="0" cy="4" r="14" fill="#E0453A" stroke="#9A2A1E" stroke-width="3"/>`); }
const HUNT1 = () => [[MKS("ansglow") + 1.2, "fridge door", true], [MKS("slide") + 1, "window frame: aluminium", false], [MKS("kw_magnetic_whiteboard") + .5, "whiteboard", true], [MKS("kw_magnetic_doorstop") + .5, "doorstop", true]];
function HOME25(t, o = {}, cam) { const sc = (window._S || {}).name, bd = o.bug === undefined ? BEEAT[sc] : o.bug;
  let s = `<rect x="-200" y="-120" width="2320" height="1320" fill="#FFF3DC"/>` + bg("kitchen15") + alWindow25(t) + curtain25(t) + whiteboard25(t, KIT.wb[0], KIT.wb[1], 1, {}) + (o.mid || "");
  s += `<rect x="1480" y="0" width="640" height="1200" fill="#FCEFD6"/><rect x="1480" y="1108" width="640" height="200" fill="#DCCBB0"/>` + TF(KIT.fridge[0], KIT.fridge[1], KIT.fridge[2], fridge24(t, { open: o.open || 0, photos: true }))
    + huntCard25(t, KIT.fridge[0], 330, .62, { items: HUNT1(), sub: "Pip's home" });
  if (bd) s += beeAt(t, bd[0], bd[1], bd[2], bd[3]);
  if (o.front) s += o.front;
  return cam ? CAM(s, cam[0], cam[1], cam[2]) : s; }
/* ================================================================ FAMILY DAY AT THE PARK (Part 2) ================================================================ */
// EP16's pond (pond16.png: the HDB block, the reeds, the tap, the bench, the stepping stone, the big tree) + Family Day: bunting between the
// tree and a pole, a stall with the magnetic fishing game (a shallow tub with fish, each with a steel clip; a rod with a magnet on its string),
// a balloon tied to the stall, the MAGNET HUNT card on the stall's post
const bunting25 = (t) => { let s = `<path d="M-100 230 Q500 330 1100 240 Q1500 190 2100 260" stroke="#8A6A4A" stroke-width="4" fill="none"/>`; for (let i = 0; i < 22; i++) { const u = i / 21, x = lerp(-80, 2080, u), y = (u < .55 ? lerp(232, 280, Math.sin(Math.PI * u / .55)) : lerp(250, 255, (u - .55) / .45)) + 3 * Math.sin(t * 2 + i);
  s += `<path d="M${n2(x - 26)} ${n2(y)} L${n2(x + 26)} ${n2(y)} L${n2(x)} ${n2(y + 50)}z" fill="${["#E0453A", "#FFC83A", "#2FA35A", "#2F6FD6", "#F08CC0"][i % 5]}"/>`; } return s; };
const stall25 = (t, o = {}) => `<path d="M60 1100 V560 M560 1100 V560" stroke="#8A5A36" stroke-width="16"/><path d="M30 560 L310 470 L590 560z" fill="#E0453A" stroke="#9A2A1E" stroke-width="5"/>` + [0, 1, 2, 3, 4].map((i) => `<path d="M${50 + i * 108} 560 q54 40 108 0" fill="${i % 2 ? "#fff" : "#E0453A"}" stroke="#9A2A1E" stroke-width="3"/>`).join("")
  + `<rect x="40" y="820" width="540" height="40" rx="8" fill="#C98A5A" stroke="#7A5230" stroke-width="5"/><rect x="60" y="860" width="500" height="200" fill="#E8C08A" stroke="#7A5230" stroke-width="5"/>` + T(310, 970, "MAGNETIC FISHING", 34, "#7A3A1A", { w: 700 })
  + TF(310, 830, .75, pond22(t, 0, 0, 1, o.pondO || {})) + `<path d="M580 560 Q620 460 600 380" stroke="#888" stroke-width="2"/><ellipse cx="600" cy="350" rx="40" ry="50" fill="#F08CC0"/>`;
const PARK = { stall: [0, 0], strider: [], stone: [1688, 982] };
function PARK25(t, o = {}, cam) { const sc = (window._S || {}).name, bd = o.bug === undefined ? STRAT[sc] : o.bug;
  let s = `<rect x="-200" y="-120" width="2320" height="1320" fill="#8ACB6A"/>` + bg("pond16") + bunting25(t);
  if (bd) s += striderAt(t, bd[0], bd[1], bd[2], bd[3]);
  s += stall25(t, o) + huntCard25(t, 640, 600, .45, { title: "MAGNET HUNT", sub: "out and about", items: o.hunt || HUNT2() }) + (o.front || "");
  return cam ? CAM(s, cam[0], cam[1], cam[2]) : s; }
const HUNT2 = () => [[MKS("ansglow") + 1.2, "fishing game", true], [MKS("v_switch"), "crane", true], [MKS("kw_maglev_train") + .5, "floating train", true], [MKS("kw_mri_scanner") + .5, "MRI scanner", true]];

/* ================================================================ THE HIDDEN ANIMALS ================================================================ */
// FACES: right. A honeybee: golden-brown with dark stripes, fuzzy, two pairs of clear wings (a blur when it hovers), big friendly eyes. It
// hovers on the spot (a small bob; no travel, so it never flies backwards)
function honeybee25(t, o = {}) { const ph = (o.ph || 0) + t, wb = Math.sin(ph * 40) * .5 + .5;
  return `<g transform="translate(0 ${n2(4 * Math.sin(ph * 3))})"><ellipse cx="-6" cy="-26" rx="${n2(18 + 6 * wb)}" ry="12" fill="#E8F6FF" opacity=".75" stroke="#9AC4DA" stroke-width="2" transform="rotate(-24 -6 -26)"/><ellipse cx="8" cy="-28" rx="${n2(16 + 5 * wb)}" ry="10" fill="#E8F6FF" opacity=".7" stroke="#9AC4DA" stroke-width="2" transform="rotate(18 8 -28)"/>`
    + `<ellipse cx="0" cy="0" rx="30" ry="20" fill="#F2B233" stroke="#5A3A10" stroke-width="3.5"/><path d="M-12 -18 q-4 18 0 36 M4 -19 q-4 19 0 38" stroke="#3A2A10" stroke-width="7" fill="none"/><path d="M-30 0 l-10 0" stroke="#3A2A10" stroke-width="4" stroke-linecap="round"/>`
    + `<circle cx="28" cy="-4" r="15" fill="#3A2A10"/><circle cx="32" cy="-8" r="6" fill="#fff"/><circle cx="33" cy="-8" r="3.4" fill="#1A1410"/><circle cx="34.3" cy="-9.3" r="1.4" fill="#fff"/><path d="M36 -16 q8 -14 14 -12 M30 -18 q2 -14 8 -16" stroke="#3A2A10" stroke-width="2.5" fill="none" stroke-linecap="round"/></g>`; }
// FACES: right (it hovers on the spot)
const beeAt = (t, x, y, k = .3, o = {}) => `<g transform="translate(${n2(x)} ${n2(y)}) scale(${n2((o.dir || 1) * k)} ${n2(k)})">${honeybee25(t, o)}</g>`;
// FACES: right. A water strider: a slim dark body, long thin middle and back legs spread on the water with small dimples under the feet,
// short front legs, big friendly eyes. It stands on the spot (tiny skims back and forth would slide it backwards: it never travels)
function strider25(t, o = {}) { const ph = (o.ph || 0) + t, d = 1 + .08 * Math.sin(ph * 2);
  return [[-60, 18], [60, 22], [-70, -16], [70, -12]].map(([x, y]) => `<ellipse cx="${x}" cy="${y + 6}" rx="${n2(16 * d)}" ry="5" fill="none" stroke="#FFFFFF" stroke-width="2.5" opacity=".8"/>`).join("")
    + `<path d="M-8 2 L-60 18 M-8 -2 L-70 -16 M8 2 L60 22 M8 -2 L70 -12 M14 0 L30 6" stroke="#2E2A26" stroke-width="3.5" fill="none" stroke-linecap="round"/><ellipse cx="0" cy="0" rx="26" ry="6" fill="#3A342E" stroke="#1A1614" stroke-width="2"/>`
    + `<circle cx="26" cy="-2" r="7" fill="#3A342E"/><circle cx="29" cy="-4" r="3.2" fill="#fff"/><circle cx="29.6" cy="-4" r="1.8" fill="#1A1410"/>`; }
// FACES: right (it stands on the spot)
const striderAt = (t, x, y, k = .4, o = {}) => `<g transform="translate(${n2(x)} ${n2(y)}) scale(${n2((o.dir || 1) * k)} ${n2(k)})">${strider25(t, o)}</g>`;
// the spots (a new fair spot in every scene, never back at the intro spot)
const BEEAT = { intro: [1290, 446, .34, {}], answer: [560, 380, .3, {}], lc1q: [1188, 610, .3, { dir: -1 }], holdon: [1440, 520, .3, { dir: -1 }], lc2q: [350, 350, .3, {}], cliff: [520, 700, .3, {}], liz: [940, 300, .38, { dir: -1 }] };
['cold', 'back', 'today', 'game'].forEach((k) => { BEEAT[k] = BEEAT.intro; });
const STRAT = { intro: [700, 650, .45, {}], r1ans: [1000, 720, .42, { dir: -1 }], lc1q: [1500, 690, .42, {}], show: [600, 940, .42, {}], fix: [600, 940, .42, {}], lc2q: [1300, 960, .42, { dir: -1 }], liz: [1580, 950, .5, {}], interact: [1150, 640, .4, {}] };
['park', 'game'].forEach((k) => { STRAT[k] = STRAT.intro; });

/* ================================================================ THINGS ================================================================ */
// a doorstop on the floor: a rubber-capped block with a round magnet on top; o.door (0..1) the door's bottom edge with its small steel plate
const doorstop25 = (k = 1) => TF(0, 0, k, `<ellipse cx="0" cy="6" rx="60" ry="10" fill="${P.ink}" opacity=".25"/><path d="M-40 0 L-34 -60 H34 L40 0z" fill="#5A5A66" stroke="#2E2E36" stroke-width="4"/><rect x="-28" y="-80" width="56" height="22" rx="8" fill="#9AA3AB" stroke="#4E565E" stroke-width="4"/>`);
// a toy car with a bar magnet taped on its back (FACES: right; it rolls right, away from the magnet behind it)
// FACES: right
const toyCar25 = (t, o = {}) => `<rect x="-90" y="-60" width="170" height="56" rx="18" fill="#2FA35A" stroke="#1E6A3A" stroke-width="4"/><path d="M-50 -60 L-30 -96 H40 L60 -60z" fill="#7FD1A0" stroke="#1E6A3A" stroke-width="4"/><rect x="-24" y="-90" width="56" height="26" rx="4" fill="#DDF4FF"/>`
  + [-50, 50].map((wx) => `<g transform="translate(${wx} -4) rotate(${n2((o.roll || 0) * 360)})"><circle r="22" fill="#2E2E36"/><circle r="9" fill="#C9D2DA"/><path d="M0 -9 V9" stroke="#2E2E36" stroke-width="3"/></g>`).join("") + TF(-150, -34, .5, bar20(t, { glint: false, flip: !!o.flipMag }));
// the floating train (FACES: right: its nose leads), seen from the side above its T-shaped guideway; o.gap (px)
// FACES: right
const maglev25 = (t, o = {}) => { const g = o.gap === undefined ? 26 : o.gap;
  return `<path d="M-420 ${-g} H300 Q420 ${-g} 460 ${-g - 70} Q440 ${-g - 150} 300 ${-g - 160} H-420z" fill="#F7F9FA" stroke="#5A6A7A" stroke-width="6"/><path d="M-420 ${-g - 60} H420" stroke="#14B8A6" stroke-width="16"/>`
    + [...Array(6)].map((_, i) => `<rect x="${-380 + i * 110}" y="${-g - 140}" width="70" height="44" rx="10" fill="#BFE6FF" stroke="#5A6A7A" stroke-width="3"/>`).join("") + `<path d="M330 ${-g - 140} Q400 ${-g - 136} 430 ${-g - 90} H330z" fill="#3A4A5A"/>`
    + (o.mags ? [...Array(7)].map((_, i) => `<rect x="${-400 + i * 120}" y="${-g - 18}" width="90" height="18" rx="4" fill="#E0453A" stroke="#9A2A1E" stroke-width="2"/>` + T(-355 + i * 120, -g - 4, "N", 14, "#fff", { w: 700 })).join("") : ""); };
const guideway25 = (o = {}) => `<rect x="-900" y="0" width="1800" height="40" rx="6" fill="#B8C2CC" stroke="#6E7882" stroke-width="5"/><rect x="-60" y="40" width="120" height="260" fill="#9AA6B2" stroke="#6E7882" stroke-width="5"/>`
  + (o.mags ? [...Array(15)].map((_, i) => `<rect x="${-880 + i * 120}" y="2" width="90" height="18" rx="4" fill="#E0453A" stroke="#9A2A1E" stroke-width="2"/>` + T(-835 + i * 120, 17, "N", 14, "#fff", { w: 700 })).join("") : "");
// the MRI scanner, drawn simply and safely: a large round white housing with a tunnel in the centre, a padded bed sliding in (o.bed 0..1),
// a calm child with a blanket, a parent's hand on the bed, a nurse; a screen with a simple picture of a knee
const mri25 = (t, o = {}) => { const b = clamp(o.bed || 0);
  return `<rect x="-560" y="180" width="1120" height="40" fill="#C9D2DA"/><circle cx="0" cy="-40" r="300" fill="#F7F9FA" stroke="#9AA6B2" stroke-width="10"/><circle cx="0" cy="-40" r="130" fill="#3A4A5A"/><circle cx="0" cy="-40" r="118" fill="#5A6A7A"/><circle cx="0" cy="-40" r="300" fill="none" stroke="#2F6FD6" stroke-width="16" stroke-dasharray="40 30" opacity=".35"/>`
    + `<g transform="translate(${n2(lerp(-420, -150, b))} 40)"><rect x="-260" y="-20" width="520" height="40" rx="18" fill="#DDE8F0" stroke="#7E8A96" stroke-width="4"/><circle cx="210" cy="-48" r="34" fill="#F5D2B4" stroke="#8A5A3A" stroke-width="3"/><path d="M196 -50 q4 4 8 0 M216 -50 q4 4 8 0" stroke="#3A2A1A" stroke-width="2.5" fill="none"/><path d="M204 -36 q8 6 14 0" stroke="#3A2A1A" stroke-width="2.5" fill="none"/><path d="M180 -76 q30 -26 62 0" fill="#3A2A1A"/>`
    + `<path d="M-200 -50 H170 Q190 -50 190 -26 V-20 H-220z" fill="#9BD3F2" stroke="#5A8AA8" stroke-width="3"/></g><rect x="-200" y="60" width="400" height="120" fill="#B8C2CC"/>`
    + (o.people !== false ? `<g transform="translate(-460 60)"><rect x="-30" y="-170" width="60" height="170" rx="20" fill="#7FD1C8"/><circle cx="0" cy="-200" r="34" fill="#E8C09A" stroke="#8A5A3A" stroke-width="3"/><path d="M-30 -220 q30 -30 60 0" fill="#2E2A26"/><circle cx="-10" cy="-200" r="3" fill="#2E2A26"/><circle cx="10" cy="-200" r="3" fill="#2E2A26"/><path d="M-8 -186 q8 6 16 0" stroke="#2E2A26" stroke-width="2.5" fill="none"/>${T(0, -100, "nurse", 22, "#1E5A54", { w: 700 })}</g>`
      + `<g transform="translate(${n2(lerp(-300, -60, b))} 30)"><path d="M-60 0 q30 -20 60 -6" stroke="#E8C09A" stroke-width="18" stroke-linecap="round" fill="none"/></g>` : "")
    + `<g transform="translate(430 -260)"><rect x="-110" y="-80" width="220" height="160" rx="12" fill="#2E3A46" stroke="#9AA6B2" stroke-width="5"/><path d="M-20 -60 Q-40 -10 -20 10 Q0 30 -10 60 M20 -60 Q40 -10 20 10 Q0 30 10 60" stroke="#DDE8F0" stroke-width="6" fill="none"/><ellipse cx="0" cy="8" rx="26" ry="16" fill="none" stroke="#DDE8F0" stroke-width="5"/></g>`; };
// Momo's toy-design poster (Part 2's Showdown): "Design a magnet toy: the push car"; o.lit, o.strike, o.rewrite
function toyPoster25(t, x, y, k = 1, o = {}) { const W = 600, Hh = 560, L = ["Tape a bar magnet on a toy car.", "Hold another bar magnet behind it.", "To push the car away, face a North pole to a South pole."];
  let c = T(0, 50, "Design a magnet toy: the push car", 30, P.momo, { w: 700 });
  L.forEach((ln, i) => { const ly = 100 + i * 130, lit = o.lit && o.lit[i] !== undefined ? (t >= o.lit[i] ? 1 - .6 * ss(o.lit[i] + 2.6, o.lit[i] + 3, t) : 0) : 0;
    if (lit > .01) c += `<rect x="-280" y="${ly - 6}" width="560" height="112" rx="14" fill="${P.sun}" opacity="${n2(.35 * lit)}"/>`;
    c += numBadge(-250, ly + 40, i + 1, 26) + `<path d="M-215 ${ly + 100} H280" stroke="#D4DCE4" stroke-width="3"/>`;
    const words = ln.split(" "), half = Math.ceil(words.length / 2); c += T(-210, ly + 36, words.slice(0, half).join(" "), 26, P.ink, { a: "start", w: 600 }) + T(-210, ly + 72, words.slice(half).join(" "), 26, P.ink, { a: "start", w: 600 });
    if (i === 0) c += TF(215, ly + 76, .45, toyCar25(t, {}));
    if (i === 1) c += TF(160, ly + 60, .3, bar20(t, { glint: false })) + TF(250, ly + 76, .3, toyCar25(t, {}));
    if (i === 2) c += TF(150, ly + 52, .26, bar20(t, { glint: false })) + TF(240, ly + 52, .26, bar20(t, { glint: false, flip: true })) + `<path d="M190 ${ly + 50} h12 m-6 -6 v12" stroke="${P.ink}" stroke-width="3"/>`; });
  if (o.strike !== undefined && t >= o.strike) { const u = eo(clamp((t - o.strike) / .35)); c += `<path d="M-220 ${100 + 2 * 130 + 32} H${n2(-220 + 470 * u)}" stroke="#D84A3A" stroke-width="7" stroke-linecap="round"/><path d="M-220 ${100 + 2 * 130 + 68} H${n2(-220 + 420 * u)}" stroke="#D84A3A" stroke-width="7" stroke-linecap="round"/>`; }
  if (o.rewrite !== undefined && t >= o.rewrite) c += OP(ramp(t, o.rewrite, .3), T(0, Hh - 26, "Face a North pole to a North pole.", 30, GOODC, { w: 700 }));
  return TF(x, y, k, `<path d="M-200 0 L-150 -${Hh + 60} M200 0 L150 -${Hh + 60} M0 0 L0 -${Hh}" stroke="#7A5230" stroke-width="12" stroke-linecap="round"/><g transform="translate(0 ${-Hh - 90})"><g filter="url(#drop)"><rect x="${-W / 2}" y="0" width="${W}" height="${Hh}" rx="14" fill="#FFFDF4" stroke="#C9B88A" stroke-width="5"/>${c}</g></g>`); }
// Pip's tablet (the cliffhanger): a floating train on its screen
const tablet25 = (t, k = 1) => TF(0, 0, k, `<rect x="-220" y="-150" width="440" height="300" rx="24" fill="#2E2E36"/><rect x="-200" y="-130" width="400" height="260" rx="10" fill="#BFE6FF"/><rect x="-200" y="40" width="400" height="90" fill="#8ACB6A"/>`
  + `<clipPath id="tabC"><rect x="-200" y="-130" width="400" height="260" rx="10"/></clipPath><g clip-path="url(#tabC)">` + TF(0, 40, .3, guideway25()) + TF(n2(((t * 160) % 900) - 450), 40, .3, maglev25(t, { gap: 30 })) + `</g>`);
