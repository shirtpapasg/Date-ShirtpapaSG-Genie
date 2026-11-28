// ep21dare.js: EP21's own dare into EP22 ("What happens?": 1 Nothing happens · 2 The nail attracts the clips). SECTION A of
// ../ep22/ep21dare.js (EP22 drew these two pictures on 24 Nov from EP21's script), copied UNCHANGED, so the cards the child locks in at the
// end of EP21 are exactly the cards EP22 opens with. Used by p2.js SC.dare (choiceCard3 w 420 h 330) and the dare scene's nail and clips.

/* ================================ SECTION A: EP21's dare pictures (self-contained; copy into EP21 unchanged) ================================ */
// an IRON NAIL lying level (origin = its middle; 300 long at k 1): a flat round head at the LEFT (a thin disc seen edge-on, its face a
// little turned to us), a smooth grey shaft, a sharp point at the RIGHT. o.rot: its angle. The same grey before and after it is magnetised.
const nail21 = (x, y, k = 1, rot = 0) => TF(x, y, k, `<ellipse cx="0" cy="22" rx="150" ry="9" fill="#2B2147" opacity=".12"/>`
  + `<path d="M-128 -9 H96 L150 0 L96 9 H-128z" fill="#8E979F" stroke="#454C54" stroke-width="4.5" stroke-linejoin="round"/>`
  + `<path d="M-126 -5 H94 L136 -1" stroke="#D8DEE3" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M-126 5 H96" stroke="#6A727A" stroke-width="3" opacity=".7"/>`
  + `<path d="M-118 -9 V9 M-110 -9 V9 M-102 -9 V9" stroke="#6A727A" stroke-width="2" opacity=".55"/>`
  + `<ellipse cx="-137" cy="0" rx="13" ry="31" fill="#A7B0B8" stroke="#454C54" stroke-width="4.5"/><ellipse cx="-139" cy="-2" rx="6" ry="22" fill="#D8DEE3" opacity=".8"/>`, rot);
// one plain silver STEEL PAPER CLIP (origin = its middle, about 64 long at k 1; a = its angle): the bent wire, dark edge, bright face
const CLIPD21 = "M12 -2 H-14 A5 5 0 0 0 -14 8 H22 A9 9 0 0 0 22 -10 H-24 A11.5 11.5 0 0 0 -24 13 H8";
const clip21 = (x, y, a = 0, k = 1) => TF(x, y, k, `<path d="${CLIPD21}" fill="none" stroke="#4E5862" stroke-width="6.5" stroke-linecap="round" stroke-linejoin="round"/><path d="${CLIPD21}" fill="none" stroke="#D3DAE0" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/><path d="M-20 -10 H18" stroke="#fff" stroke-width="1.6" opacity=".8"/>`, a);
// a little pile of clips lying still (origin = the pile's middle on the ground)
const clipPile21 = (x, y, k = 1) => TF(x, y, k, `<ellipse cx="0" cy="16" rx="120" ry="14" fill="#2B2147" opacity=".12"/>` + [[-80, 6, 10], [-40, 12, -20], [0, 4, 32], [40, 12, -8], [80, 6, 64], [-58, -8, 70], [-14, -10, -40], [24, -8, 84], [62, -6, 18], [-30, 0, 120], [12, 14, 150]].map(([dx, dy, a]) => clip21(dx, dy, a)).join(""));
// a HAND holding the nail by its head (four fingers and a thumb; a plain sleeve): origin = the nail's head
const hand21 = () => `<g><rect x="-150" y="-36" width="110" height="72" rx="16" fill="#8B5CF6" stroke="#5B3AB0" stroke-width="4"/>`
  + `<g fill="#F2C29B" stroke="#C98F66" stroke-width="3.5" stroke-linejoin="round"><rect x="-56" y="-34" width="64" height="62" rx="24"/>`
  + `<rect x="-6" y="-30" width="34" height="15" rx="7.5"/><rect x="-4" y="-15" width="38" height="15" rx="7.5"/><rect x="-6" y="0" width="34" height="15" rx="7.5"/><rect x="-10" y="14" width="28" height="14" rx="7"/>`
  + `<rect x="-26" y="-46" width="40" height="16" rx="8" transform="rotate(20 -6 -38)"/></g></g>`;
// the two pictures (origin = the picture's middle; it fills about 400 x 280): a sunny wooden bench top, a tray with a pile of steel clips,
// the nail held level by its head above them. i = 0: the clips lie still (a clear gap under the tip, a soft "?"); i = 1: clips hang from
// the nail's tip, one below another (and the pile a little smaller)
const darePic21 = (i, t = 0) => { let s = `<rect x="-210" y="-150" width="420" height="300" fill="${i ? "#E6F6E8" : "#FFF0D6"}"/>`
    + [0, 1, 2].map((j) => `<rect x="-210" y="${52 + j * 34}" width="420" height="32" fill="${["#D9A86C", "#CF9C60", "#D4A266"][j]}"/><path d="M-210 ${52 + j * 34} H210" stroke="#A8743E" stroke-width="3"/>`).join("")
    + `<path d="M-150 74 H150 L136 118 H-136z" fill="#E7ECEF" stroke="#8A96A0" stroke-width="4"/>` + clipPile21(0, 86, .78);
  s += nail21(-6, -52, .9) + TF(-6 - 137 * .9, -52, .9, hand21());
  if (i) { const tx = -6 + 150 * .9, ty = -52; let cy = ty + 30, cx = tx - 2;
    for (let j = 0; j < 3; j++) { const sw = 6 * Math.sin(t * 2 + j * .9) * (j + 1) / 3; s += clip21(cx + sw * .6, cy, 92 + sw, .82); cx += sw * .25; cy += 44; }
    s += clip21(tx + 22, ty + 26, 58 + 4 * Math.sin(t * 2.3), .82); }
  else s += `<path d="M${-6 + 150 * .9} -36 V58" stroke="#8A96A0" stroke-width="3" stroke-dasharray="6 8" opacity=".7"/>` + `<text x="${-6 + 150 * .9 + 34}" y="22" font-family="Fredoka" font-weight="700" font-size="40" text-anchor="middle" fill="#8A949E">?</text>`;
  return s; };

