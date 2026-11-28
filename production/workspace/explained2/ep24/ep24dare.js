// ep24dare.js: EP24's closing dare into EP25 ("What keeps it closed?": 1 The cold air inside · 2 A strip of magnet · 3 Sticky glue): the
// three card pictures, in ONE self-contained helper so EP25 (whose Part 1 opens with these three cards) can copy this file UNCHANGED (the
// ep22dare.js / ep23dare.js pattern). It needs only the engine's TF, T, P, n2, tpill at call time; every name ends in 24d.
// Realism (script section 3, Block B): the SAME fridge on all three cards (a tall white fridge, its door shut, a soft white edge round the
// door); card 1: blue cold puffs inside the door's edge; card 2: the door's edge cut open a little, a thin dark strip inside it (small,
// running along the edge, not one spot) and a "?"; card 3: a glue bottle by the door's edge. No answer is shown.
const fridge24d = (k = 1) => TF(0, 0, k, `<rect x="-80" y="-130" width="160" height="260" rx="14" fill="#EEF2F5" stroke="#7E8A96" stroke-width="5"/><path d="M-80 -50 H80" stroke="#7E8A96" stroke-width="5"/>`
  + `<rect x="-74" y="-44" width="148" height="168" rx="10" fill="none" stroke="#FFFFFF" stroke-width="7"/><rect x="52" y="-110" width="10" height="44" rx="5" fill="#B8C2CC"/><rect x="52" y="-28" width="10" height="60" rx="5" fill="#B8C2CC"/>`);
function darePic24(i, t = 0) { let s = `<rect x="-210" y="-150" width="420" height="300" fill="${["#E6F3FB", "#FFF3E6", "#F3EEFA"][i]}"/>` + TF(-40, 4, .95, fridge24d(1));
  if (i === 0) s += [0, 1, 2].map((j) => `<g transform="translate(${n2(70 + j * 30)} ${n2(-20 + j * 34 + 4 * Math.sin(t * 2 + j))})"><circle r="16" fill="#BFE3FA" opacity=".85"/><circle cx="14" cy="-6" r="12" fill="#D8EFFC" opacity=".85"/></g>`).join("") + TF(120, 110, 1, tpill(0, 0, "cold air", 22, "#fff", "#2E6E9A", { w: 700 }));
  if (i === 1) s += `<rect x="-118" y="-42" width="12" height="168" rx="5" fill="#fff" stroke="#7E8A96" stroke-width="3"/><rect x="-115" y="-36" width="6" height="156" rx="3" fill="#4A4F58"/>`
    + `<path d="M-112 30 C-60 30 40 -10 100 -60" stroke="#3A2E52" stroke-width="3" fill="none"/>` + TF(120, -80, 1, tpill(0, 0, "a strip?", 22, "#fff", "#3A2E52", { w: 700 })) + T(150, 40, "?", 70, "#E0453A", { w: 700 });
  if (i === 2) s += TF(120, 40, 1, `<rect x="-26" y="-40" width="52" height="86" rx="12" fill="#F7F7F2" stroke="#8A8A80" stroke-width="4"/><path d="M-12 -40 L0 -70 L12 -40z" fill="#F2A65A" stroke="#B87430" stroke-width="3"/><rect x="-22" y="-8" width="44" height="26" rx="6" fill="#7CC3E6"/>`) + TF(120, 110, 1, tpill(0, 0, "glue", 22, "#fff", "#8A5A1A", { w: 700 }));
  return s; }
