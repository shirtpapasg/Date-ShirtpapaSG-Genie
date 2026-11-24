// ep21dare.js: EP21's two dare cards ("What happens?": 1 Nothing happens · 2 The nail attracts the clips), the cards the child saw at the
// end of EP21 (../ep21/p2.js SC.dare). EP22 Part 1 opens with them (lasttime, r1, answer). The ep20dare.js pattern (EP21 Stage 1): the
// helpers are copied from EP21, never edited there.
// STAGE 1: EP21 is not drawn yet (its Stage 2 is still to come), so its SC.dare shows the two cards as plain numbered cards (ansCard) with
// "wired placeholders: draw 1 the nail above the clips, the clips still · 2 the same nail with clips hanging from its tip". darePic21 below
// is that description drawn simply (a grey iron nail, plain silver steel paper clips). WHEN EP21's Stage 2 has drawn its dare pictures
// (../ep21/p2.js SC.dare, or an ep21 art file), Stage 2 of EP22 replaces darePic21 with a copy of them UNCHANGED, so the child sees exactly
// the cards they locked in. bar20 (Basil's red-and-blue bar magnet) is copied UNCHANGED from ../ep21/ep20dare.js (originally ../ep20/art20.js):
// EP22 strokes every nail with it. bar20 needs NORTHC / SOUTHC (tests.js) and lcGlint (closer.js) at call time.
// a BAR MAGNET (origin = its middle; 300 x 84 at k 1): red North half with a white N, blue South half with a white S. o.flip: North on the
// RIGHT (it has been turned round). o.glint. o.hl: highlight one end ("N" / "S") with a glow
function bar20(t, o = {}) { const fl = o.flip ? -1 : 1, nX = -75 * fl, sX = 75 * fl;
  let s = `<g filter="url(#dropS)"><rect x="${fl > 0 ? -150 : 0}" y="-42" width="150" height="84" rx="12" fill="${NORTHC}" stroke="#9A2A1E" stroke-width="6"/><rect x="${fl > 0 ? 0 : -150}" y="-42" width="150" height="84" rx="12" fill="${SOUTHC}" stroke="#1E3E8A" stroke-width="6"/></g>`
    + `<rect x="-140" y="-34" width="130" height="16" rx="8" fill="#fff" opacity=".26"/><rect x="10" y="-34" width="130" height="16" rx="8" fill="#fff" opacity=".24"/>` + T(nX, 20, "N", 56, "#fff") + T(sX, 20, "S", 56, "#fff");
  if (o.hl) { const hx = o.hl === "N" ? nX * 2 : sX * 2; s += `<circle cx="${hx * .98}" cy="0" r="${n2(58 + 6 * Math.sin(t * 6))}" fill="none" stroke="${P.sun}" stroke-width="8" opacity=".85"/>`; }
  if (o.glint !== false) s += lcGlint(-110 * fl, -26, 16, t, 1.3);
  return s; }
// EP21's dare pictures (Stage 1 stand-ins, see above): a grey iron nail (flat round head at the left, sharp point at the right) held level
// over a small pile of plain silver steel paper clips; card 1 the clips lie still (a gap under the tip), card 2 three clips hang from the tip
const nail21 = (x, y, k = 1) => TF(x, y, k, `<g filter="url(#dropS)"><rect x="-130" y="-9" width="230" height="18" rx="5" fill="#8E979F" stroke="#4E565E" stroke-width="4"/><rect x="-146" y="-30" width="18" height="60" rx="6" fill="#9AA3AB" stroke="#4E565E" stroke-width="4"/><path d="M100 -9 L150 0 L100 9z" fill="#8E979F" stroke="#4E565E" stroke-width="4" stroke-linejoin="round"/></g><rect x="-120" y="-6" width="200" height="4" rx="2" fill="#fff" opacity=".35"/>`);
const clip21 = (x, y, a = 0, k = 1) => TF(x, y, k, `<path d="M-22 -8 H18 A8 8 0 0 1 18 8 H-16 A5 5 0 0 1 -16 -2 H12" fill="none" stroke="#BFC8D0" stroke-width="5" stroke-linecap="round"/><path d="M-22 -8 H18 A8 8 0 0 1 18 8 H-16 A5 5 0 0 1 -16 -2 H12" fill="none" stroke="#6E7882" stroke-width="1.6" stroke-linecap="round"/>`, a);
const clipPile21 = (x, y) => [[-60, 8, 10], [-20, 14, -20], [20, 6, 30], [58, 14, -8], [-38, -4, 60], [10, -6, -40], [44, -2, 80]].map(([dx, dy, a]) => clip21(x + dx, y + dy, a)).join("");
const darePic21 = (i, t) => `<rect x="-200" y="-140" width="400" height="280" fill="${i ? "#E6F6E8" : "#FFF0D6"}"/>` + clipPile21(0, 100)
  + nail21(-10, i ? -40 : -60, .95) + (i ? [0, 1, 2].map((j) => clip21(132 + 6 * Math.sin(t * 2 + j), -20 + j * 26, 90 + 8 * Math.sin(t * 1.6 + j), .9)).join("") : T(0, 40, "?", 40, "#8A949E"));
// EP22's use: card i (0..1) as a numbered picture card (choiceCard3 w 420 h 330 size 32, as ep20dare.js's dareCard2), at any size
const darePic = (i, t = 0) => darePic21(i, t);
const dareCard2 = (i, o = {}, t = 0) => choiceCard3(i + 1, DARE_CARDS[i], darePic21(i, t), { w: 420, h: 330, size: 32, ...o });
