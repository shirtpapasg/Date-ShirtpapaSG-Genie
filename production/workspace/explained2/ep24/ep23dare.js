// ep23dare.js: EP23's closing dare into EP24 ("Is his test fair?": 1 Yes · 2 No): the two card pictures, in ONE self-contained helper so
// EP24 (whose Part 1 opens with these two cards) can copy this file UNCHANGED (the ep21dare.js / ep22dare.js pattern). It needs only the
// engine's TF, T, P, n2, tpill at call time; every name ends in 23d so nothing clashes with EP24's own art.
// Realism (script section 3, Block B): two NEW nails side by side, the same size: an IRON nail with a long, thick coil of twenty-five neat
// turns (two layers), and a STEEL nail with a short coil of eight turns; each tag joined to its nail (iron nail · 25 turns, steel nail · 8
// turns); one AA battery in a holder each; no clips shown (no hint). Card 1 "Yes" with a green "fair?" tick, card 2 "No" with a red cross.
// The two nails are told apart only by their tags (iron and steel nails look alike).
const nail23d = (k = 1) => TF(0, -150 * k, k, `<path d="M-128 -9 H96 L150 0 L96 9 H-128z" fill="#8E979F" stroke="#454C54" stroke-width="4.5" stroke-linejoin="round"/><path d="M-126 -5 H94 L136 -1" stroke="#D8DEE3" stroke-width="4" fill="none" stroke-linecap="round"/><ellipse cx="-137" cy="0" rx="13" ry="31" fill="#A7B0B8" stroke="#454C54" stroke-width="4.5"/>`, 90);
// a coil of n neat turns on a vertical nail (tip at 0, 0; head at y -287): one layer up to 20 turns, the rest as a second layer
const coil23d = (n, k = 1) => { let s = ""; const L1 = Math.min(n, 20), L2 = Math.max(0, n - 20), sp = 11;
  const turn = (y, hw, col) => `<path d="M${-hw} ${y} Q0 ${y + 1.5} ${hw} ${y + sp * .5}" stroke="#A8461A" stroke-width="9" fill="none" stroke-linecap="round"/><path d="M${-hw} ${y} Q0 ${y + 1.5} ${hw} ${y + sp * .5}" stroke="${col}" stroke-width="5.6" fill="none" stroke-linecap="round"/>`;
  for (let i = 0; i < L1; i++) s += turn(-252 + i * sp, 16, "#F07A2E");
  for (let i = 0; i < L2; i++) s += turn(-250 + i * sp * 2.2, 23, "#F58A42");   // the second layer, wider, over the first
  const yb = -252 + L1 * sp; s += `<path d="M-16 -252 C-60 -230 -90 -170 -110 -120 M-16 ${yb} C-50 ${yb + 20} -70 ${yb + 40} -96 ${yb + 50}" stroke="#A8461A" stroke-width="8" fill="none" stroke-linecap="round"/>`;
  return TF(0, 0, k, s); };
const batt23d = (x, y, k = 1) => TF(x, y, k, `<rect x="-112" y="-78" width="224" height="78" rx="12" fill="#2E2E36" stroke="#16161C" stroke-width="4"/><rect x="-80" y="-62" width="132" height="46" rx="10" fill="#3A3A44"/><rect x="52" y="-62" width="28" height="46" rx="8" fill="#D9A43A"/>`
  + `<text x="66" y="-31" font-family="Fredoka" font-weight="700" font-size="22" text-anchor="middle" fill="#3A2E16">+</text><text x="-60" y="-31" font-family="Fredoka" font-weight="700" font-size="22" text-anchor="middle" fill="#fff">−</text>`);
// card i (0 Yes, 1 No): the two coiled nails side by side, each tagged, one battery each; "fair?" with a tick or a cross (origin = the middle, about 400 x 280)
const darePic23 = (i, t = 0) => { const K = .62, one = (x, n, lab) => TF(x, 120, 1, nail23d(K) + coil23d(n, K) + batt23d(-40, 18, .38)) + TF(x, -140, 1, `<rect x="-86" y="-20" width="172" height="40" rx="20" fill="#fff" stroke="#3A2E52" stroke-width="3"/>` + T(0, 9, lab, 21, "#3A2E52", { w: 700 })) + `<path d="M${x} -120 V${n2(120 - 287 * K)}" stroke="#3A2E52" stroke-width="3"/>`;
  return `<rect x="-210" y="-150" width="420" height="300" fill="${i ? "#FCE8E6" : "#E8F6EA"}"/>` + one(-95, 25, "iron nail · 25 turns") + one(105, 8, "steel nail · 8 turns")
    + TF(150, 105, 1, `<rect x="-52" y="-22" width="104" height="44" rx="22" fill="#fff" stroke="${i ? "#D84A3A" : "#2FB35A"}" stroke-width="4"/>` + T(-12, 9, "fair?", 22, "#3A2E52", { w: 700 }) + (i ? `<path d="M26 -10 l14 14 M40 -10 l-14 14" stroke="#D84A3A" stroke-width="6" stroke-linecap="round"/>` : `<path d="M24 0 l7 8 l12 -14" stroke="#2FB35A" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`)); };
