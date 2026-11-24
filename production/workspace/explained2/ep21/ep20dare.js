// ep20dare.js: EP20's two dare cards ("Where does it stop?": 1 A different way every time · 2 The same way every time), the cards the child
// saw at the end of EP20 (../ep20/p2.js SC.dare: choiceCard3 with darePic20). EP21 Part 1 opens with them (lasttime, r1, answer). STAGE 1:
// the helpers below are copied UNCHANGED from ../ep20/art20.js and ../ep20/lc20.js (EP20 is finished; never edit ../ep20): bar20 (a
// red-and-blue bar magnet), hangMag (a small magnet hanging on a string), darePic20 (the two card pictures), hangingMagnet (a bar magnet
// hanging level from a string, turning). bar20 needs NORTHC / SOUTHC (tests.js) and lcGlint (closer.js) at call time.
// a BAR MAGNET (origin = its middle; 300 x 84 at k 1): red North half with a white N, blue South half with a white S. o.flip: North on the
// RIGHT (it has been turned round). o.glint. o.hl: highlight one end ("N" / "S") with a glow
function bar20(t, o = {}) { const fl = o.flip ? -1 : 1, nX = -75 * fl, sX = 75 * fl;
  let s = `<g filter="url(#dropS)"><rect x="${fl > 0 ? -150 : 0}" y="-42" width="150" height="84" rx="12" fill="${NORTHC}" stroke="#9A2A1E" stroke-width="6"/><rect x="${fl > 0 ? 0 : -150}" y="-42" width="150" height="84" rx="12" fill="${SOUTHC}" stroke="#1E3E8A" stroke-width="6"/></g>`
    + `<rect x="-140" y="-34" width="130" height="16" rx="8" fill="#fff" opacity=".26"/><rect x="10" y="-34" width="130" height="16" rx="8" fill="#fff" opacity=".24"/>` + T(nX, 20, "N", 56, "#fff") + T(sX, 20, "S", 56, "#fff");
  if (o.hl) { const hx = o.hl === "N" ? nX * 2 : sX * 2; s += `<circle cx="${hx * .98}" cy="0" r="${n2(58 + 6 * Math.sin(t * 6))}" fill="none" stroke="${P.sun}" stroke-width="8" opacity=".85"/>`; }
  if (o.glint !== false) s += lcGlint(-110 * fl, -26, 16, t, 1.3);
  return s; }
// the dare's two card pictures: three small magnets hanging on strings: pointing three different ways / all pointing the same way
const hangMag = (x, y, a, t) => `<path d="M${x} ${y - 70} V${y - 8}" stroke="${P.ink}" stroke-width="3"/><g transform="translate(${x} ${y}) scale(${n2(Math.max(.06, Math.abs(Math.cos(a * Math.PI / 180))))} 1)">${TF(0, 0, .3, bar20(t, { glint: false, flip: Math.cos(a * Math.PI / 180) < 0 }))}</g>`;
const darePic20 = (i, t) => `<rect x="-200" y="-140" width="400" height="280" fill="${i ? "#E6F6E8" : "#FFF0D6"}"/><path d="M-170 -90 H170" stroke="#8A5A30" stroke-width="10" stroke-linecap="round"/>`
  + [-110, 0, 110].map((x, j) => hangMag(x, 0, i ? 0 : [0, 70, 150][j], t)).join("") + (i ? "" : T(0, 100, "?", 40, "#8A949E"));
// a bar magnet hanging level from a string (the dare): spin = its turn about the string (degrees); origin = where the string is tied above
const hangingMagnet = (t, spin, k = 1) => TF(0, 0, k, `<path d="M0 0 V200" stroke="${P.ink}" stroke-width="4"/><path d="M-10 236 q10 -16 20 0" stroke="${P.ink}" stroke-width="5" fill="none"/>` + `<g transform="translate(0 240) scale(${n2(Math.max(.05, Math.abs(Math.cos(spin * Math.PI / 180))))} 1)">${bar20(t, { glint: false, flip: Math.cos(spin * Math.PI / 180) < 0 })}</g>`);
// EP21's use: card i (0..1) exactly as EP20's SC.dare drew it (choiceCard3 w 420 h 330 size 32, its picture), at any size
const darePic = (i, t = 0) => darePic20(i, t);
const dareCard2 = (i, o = {}, t = 0) => choiceCard3(i + 1, DARE_CARDS[i], darePic20(i, t), { w: 420, h: 330, size: 32, ...o });
