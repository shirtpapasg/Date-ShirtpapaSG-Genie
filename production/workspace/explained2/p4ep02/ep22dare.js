// ep22dare.js: EP22's closing dare into EP23 ("What happens to the clips?": 1 They stay on the nail · 2 They drop off): the two card
// pictures and the coiled nail, in ONE self-contained helper so EP23 (whose Part 1 opens with these two cards) can copy this file
// UNCHANGED (the ep20dare.js / ep21dare.js pattern). It needs only the engine's TF, T, P, n2, clamp at call time; every name ends in 22d so
// nothing clashes with EP23's own art.
// Realism (script section 3): a NEW iron nail (never stroked), a long PLASTIC-COVERED wire coiled neatly round it (about ten turns), its two
// bare copper ends sticking out; ONE AA battery in a battery holder (never a wall socket, never a car battery). The cards show the battery
// taken away and nothing else that gives the answer away: card 1 the clips still hanging from the tip, card 2 the clips falling into the tray.
// Never "electromagnet", "electrical method" or "magnet" about the coiled nail.

// an iron nail lying level (origin = its middle, 300 long at k 1; head at the LEFT, point at the RIGHT, the tip at local x 150)
const nail22d = (x, y, k = 1, rot = 0) => TF(x, y, k, `<path d="M-128 -9 H96 L150 0 L96 9 H-128z" fill="#8E979F" stroke="#454C54" stroke-width="4.5" stroke-linejoin="round"/>`
  + `<path d="M-126 -5 H94 L136 -1" stroke="#D8DEE3" stroke-width="4" fill="none" stroke-linecap="round"/><ellipse cx="-137" cy="0" rx="13" ry="31" fill="#A7B0B8" stroke="#454C54" stroke-width="4.5"/><ellipse cx="-139" cy="-2" rx="6" ry="22" fill="#D8DEE3" opacity=".8"/>`, rot);
const CLIPD22d = "M12 -2 H-14 A5 5 0 0 0 -14 8 H22 A9 9 0 0 0 22 -10 H-24 A11.5 11.5 0 0 0 -24 13 H8";
const clip22d = (x, y, a = 0, k = 1) => TF(x, y, k, `<path d="${CLIPD22d}" fill="none" stroke="#4E5862" stroke-width="6.5" stroke-linecap="round" stroke-linejoin="round"/><path d="${CLIPD22d}" fill="none" stroke="#D3DAE0" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/>`, a);
// the plastic-covered wire coiled round the nail (about ten neat turns between local x -100 and 90), its two ends out: o.ends = where the two
// bare ends go ([[x, y], [x, y]] in local coords; default: hanging loose below the nail)
const coil22d = (o = {}) => { let s = ""; for (let i = 0; i < 10; i++) { const x = -96 + i * 19; s += `<path d="M${x} -16 Q${x + 10} 0 ${x} 16" stroke="#B85C1E" stroke-width="11" fill="none" stroke-linecap="round"/><path d="M${x} -16 Q${x + 10} 0 ${x} 16" stroke="#F29A3A" stroke-width="7" fill="none" stroke-linecap="round"/><path d="M${x - 1} -12 q4 4 4 8" stroke="#FFD2A0" stroke-width="2" fill="none"/>`; }
  const E = o.ends || [[-150, 110], [130, 110]];
  s += `<path d="M-100 14 C-120 40 ${E[0][0] + 20} ${E[0][1] - 60} ${E[0][0]} ${E[0][1]}" stroke="#B85C1E" stroke-width="10" fill="none" stroke-linecap="round"/><path d="M-100 14 C-120 40 ${E[0][0] + 20} ${E[0][1] - 60} ${E[0][0]} ${E[0][1]}" stroke="#F29A3A" stroke-width="6" fill="none" stroke-linecap="round"/>`
    + `<path d="M92 14 C110 40 ${E[1][0] - 20} ${E[1][1] - 60} ${E[1][0]} ${E[1][1]}" stroke="#B85C1E" stroke-width="10" fill="none" stroke-linecap="round"/><path d="M92 14 C110 40 ${E[1][0] - 20} ${E[1][1] - 60} ${E[1][0]} ${E[1][1]}" stroke="#F29A3A" stroke-width="6" fill="none" stroke-linecap="round"/>`
    + E.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="6" fill="#D97A3A" stroke="#8A4A1E" stroke-width="2.5"/>`).join("");
  return s; };
// the COILED NAIL (origin = the nail's middle): the nail + its coil. k, rot as nail22d
const coilNail22d = (x, y, k = 1, rot = 0, o = {}) => TF(x, y, k, nail22d(0, 0, 1) + coil22d(o), rot);
// ONE AA BATTERY in its holder (origin = the holder's bottom middle, about 220 x 80 at k 1): a black plastic holder with a metal clip at
// each end, the battery inside (copper-gold top, black body), + and - marks
const battery22d = (x, y, k = 1) => TF(x, y, k, `<rect x="-112" y="-78" width="224" height="78" rx="12" fill="#2E2E36" stroke="#16161C" stroke-width="4"/><rect x="-86" y="-64" width="168" height="50" rx="22" fill="#2B2B33"/>`
  + `<rect x="-80" y="-62" width="132" height="46" rx="10" fill="#3A3A44"/><rect x="52" y="-62" width="28" height="46" rx="8" fill="#D9A43A"/><rect x="80" y="-48" width="10" height="18" rx="3" fill="#C9C9C9"/><path d="M-70 -54 H40" stroke="#6A6A76" stroke-width="4" opacity=".7"/>`
  + `<text x="66" y="-31" font-family="Fredoka" font-weight="700" font-size="22" text-anchor="middle" fill="#3A2E16">+</text><text x="-60" y="-31" font-family="Fredoka" font-weight="700" font-size="22" text-anchor="middle" fill="#fff">−</text>`
  + `<rect x="-118" y="-60" width="10" height="30" rx="3" fill="#C9CED4" stroke="#6E7882" stroke-width="2"/><rect x="108" y="-60" width="10" height="30" rx="3" fill="#C9CED4" stroke="#6E7882" stroke-width="2"/>`
  + `<text x="0" y="-84" font-family="Fredoka" font-weight="700" font-size="20" text-anchor="middle" fill="#5A5A66">AA</text>`);
// a hand holding the nail by its head (four fingers and a thumb; origin = the nail's head)
const hand22d = () => `<rect x="-150" y="-36" width="110" height="72" rx="16" fill="#FB7158" stroke="#B84A38" stroke-width="4"/><g fill="#F2C29B" stroke="#C98F66" stroke-width="3.5" stroke-linejoin="round"><rect x="-56" y="-34" width="64" height="62" rx="24"/>`
  + `<rect x="-6" y="-30" width="34" height="15" rx="7.5"/><rect x="-4" y="-15" width="38" height="15" rx="7.5"/><rect x="-6" y="0" width="34" height="15" rx="7.5"/><rect x="-10" y="14" width="28" height="14" rx="7"/><rect x="-26" y="-46" width="40" height="16" rx="8" transform="rotate(20 -6 -38)"/></g>`;
// the two card pictures (origin = the picture's middle; it fills about 400 x 280): the maker space's wooden bench, a tray of steel clips,
// the coiled nail held level by its head above it, the battery gone (its two bare wire ends hanging loose). i = 0: clips still hang from
// the tip. i = 1: the clips fall off, down into the tray (motion lines)
const darePic22 = (i, t = 0) => { const K = .78, hx = -10 - 137 * K, tx = -10 + 150 * K, ty = -60;
  let s = `<rect x="-210" y="-150" width="420" height="300" fill="${i ? "#E6F0FA" : "#FFF0D6"}"/>` + [0, 1, 2].map((j) => `<rect x="-210" y="${56 + j * 32}" width="420" height="30" fill="${["#DDB27A", "#D3A86E", "#D8AE74"][j]}"/>`).join("")
    + `<path d="M-150 78 H150 L136 122 H-136z" fill="#E7ECEF" stroke="#8A96A0" stroke-width="4"/>` + [[-90, 96, 10], [-50, 104, -20], [-10, 94, 40], [30, 104, -10], [70, 96, 70], [-30, 90, 120], [10, 106, 160]].map(([x, y, a]) => clip22d(x, y, a, .72)).join("");
  s += coilNail22d(-10, ty, K, 0, { ends: [[-150, 70], [140, 70]] }) + TF(hx, ty, K, hand22d());
  if (!i) { let cy = ty + 28, cx = tx; for (let j = 0; j < 3; j++) { const sw = 6 * Math.sin(t * 2 + j * .9) * (j + 1) / 3; s += clip22d(cx + sw * .6, cy, 92 + sw, .76); cy += 40; } s += clip22d(tx + 20, ty + 24, 60, .76); }
  else { const u = ((t * .7) % 1); [[0, 30, 80], [16, 70, 40], [-12, 104, 130]].forEach(([dx, dy, a], j) => { const yy = ty + dy + 20 * (u + j * .1); s += clip22d(tx + dx, Math.min(yy, 86), a + 40 * u, .76) + `<path d="M${n2(tx + dx - 18)} ${n2(Math.min(yy, 86) - 34)} v-22 M${n2(tx + dx + 18)} ${n2(Math.min(yy, 86) - 30)} v-22" stroke="#6E7882" stroke-width="4" stroke-linecap="round" opacity=".6"/>`; }); }
  return s; };
