// ep19dare.js: EP19's two dare cards ("What holds it up?": 1 A pull · 2 A push), the cards the child saw at the end of EP19 (../ep19/p2.js
// SC.dare: choiceCard3 with nextPic below). EP20 Part 1 opens with them (lasttime, r1, answer). STAGE 1: the three helpers below are copied
// UNCHANGED from ../ep19/art19.js (EP19 is finished and live; never edit ../ep19): ringMag19 (a dark grey ring magnet, seen from the side),
// pencilRings (the pencil in its lump of plasticine with the two rings, the top one floating), nextPic (the two card pictures). Note: EP19's
// card pictures have INK arrows (towards each other / apart), not the green / magenta arrows the EP20 script describes: the child sees
// exactly last week's cards here; EP20's own pictures (Stage 2) use green for a pull and magenta for a push.
const ringMag19 = (k = 1) => TF(0, 0, k, `<path d="M-90 0 A90 30 0 0 0 90 0 V22 A90 30 0 0 1 -90 22z" fill="#3A3E4A" stroke="#22252E" stroke-width="5"/><ellipse cx="0" cy="0" rx="90" ry="30" fill="#6A7080" stroke="#22252E" stroke-width="5"/><ellipse cx="0" cy="0" rx="34" ry="11" fill="#2A2D36"/><path d="M-70 -8 Q-20 -22 40 -18" stroke="#A8B0C0" stroke-width="5" fill="none" stroke-linecap="round"/>`);
// the dare (into EP20): a pencil upright in a lump of plasticine; two ring magnets on it, the top one floating (a clear gap). o.n (how many
// rings are on: 0..2, may be fractional while one slides on), o.t1 (the second's landing)
const pencilRings = (t, o = {}) => { const n = o.n === undefined ? 2 : o.n, bob = 6 * Math.sin(t * 2.4);
  let s = `<ellipse cx="0" cy="6" rx="150" ry="22" fill="${P.ink}" opacity=".2" filter="url(#b4)"/><path d="M-120 0 Q-110 -60 0 -66 Q110 -60 120 0z" fill="#E86A8A" stroke="#A8405E" stroke-width="5"/>`
    + `<rect x="-16" y="-520" width="32" height="470" fill="#FFC83A" stroke="#B8861C" stroke-width="5"/><path d="M-16 -520 L0 -570 L16 -520z" fill="#F2D6A8" stroke="#B8861C" stroke-width="4"/><path d="M-6 -552 L0 -570 L6 -552z" fill="#3A3A4A"/><rect x="-10" y="-510" width="8" height="450" fill="#FFE08A"/>`;
  if (n > 0) s += TF(0, -84, 1, ringMag19(1));
  if (n > 1) s += TF(0, lerp(-560, -250 + bob, clamp(n - 1)), 1, ringMag19(1)) + (n >= 2 ? `<path d="M-120 -112 V-226 M120 -112 V-226" stroke="${P.ink}" stroke-width="4" stroke-dasharray="8 8" opacity=".5"/>` + tpill(-230, -170, "a gap!", 30, "#fff", P.ink, { w: 700 }) : "");
  return s; };
// the dare's two card pictures: 1 a pull (arrows towards each other), 2 a push (arrows apart)
const nextPic = (i) => `<rect x="-200" y="-140" width="400" height="280" fill="${i ? "#FFF0D6" : "#EAF3F7"}"/>` + TF(0, -50, .9, ringMag19()) + TF(0, 60, .9, ringMag19())
  + (i ? `<path d="M0 -20 V-110 M-16 -92 L0 -112 L16 -92 M0 30 V120 M-16 102 L0 122 L16 102" stroke="${P.ink}" stroke-width="9" stroke-linecap="round" fill="none"/>` : `<path d="M150 -100 V-20 M134 -38 L150 -18 L166 -38 M150 130 V40 M134 58 L150 38 L166 58" stroke="${P.ink}" stroke-width="9" stroke-linecap="round" fill="none"/>`);
// EP20's use: card i (0..1) exactly as EP19's SC.dare drew it (choiceCard3, its picture), at any size
const darePic = (i) => nextPic(i);
const dareCard2 = (i, o = {}) => choiceCard3(i + 1, DARE_CARDS[i], darePic(i), { w: 400, h: 330, size: 40, ...o });
