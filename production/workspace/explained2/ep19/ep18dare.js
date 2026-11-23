// ep18dare.js: EP18's three dare cards ("Which will the magnet pull?": 1 The steel pin · 2 The copper wire · 3 Both), the cards the child saw
// at the end of EP18 (../ep18/p2.js SC.dare: choiceCard3 with the pictures below). EP19 Part 1 opens with them (cold, lasttime, back, r1,
// answer). STAGE 1: copied UNCHANGED from ../ep18/art18.js (23 Nov 2026, EP18 Stage 2 in progress): magnet18, pin18, wire18, darePic3. If
// EP18's Stage 2 changes them before it is finished, copy them again (never edit ../ep18). Stage 2 of EP19 may draw its own bigger pin and
// wire for the scenes, but these card pictures stay EP18's own, so the child sees exactly last week's cards.
// the dare (into EP19): Basil's red-and-blue bar magnet, a steel pin, a short piece of copper wire. origin = their middle
const magnet18 = (k = 1) => TF(0, 0, k, `<g filter="url(#dropS)"><rect x="-120" y="-34" width="120" height="68" rx="10" fill="#E0453A" stroke="#9A2A1E" stroke-width="5"/><rect x="0" y="-34" width="120" height="68" rx="10" fill="#3A6ADB" stroke="#1E3E8A" stroke-width="5"/></g>` + T(-60, 16, "N", 44, "#fff") + T(60, 16, "S", 44, "#fff"));
const pin18 = (k = 1) => TF(0, 0, k, `<path d="M-110 0 H96" stroke="#9AA4B4" stroke-width="10" stroke-linecap="round"/><path d="M-110 -3 H90" stroke="#E8EEF6" stroke-width="3"/><path d="M96 -6 L124 0 L96 6z" fill="#9AA4B4"/><circle cx="-116" cy="0" r="14" fill="#C9D2DE" stroke="#7A8798" stroke-width="4"/>`);
const wire18 = (k = 1) => TF(0, 0, k, `<path d="M-110 10 Q-60 -26 -10 4 Q40 34 110 -6" stroke="#C8723A" stroke-width="13" fill="none" stroke-linecap="round"/><path d="M-106 6 Q-60 -24 -12 0 Q40 28 106 -10" stroke="#F2A86A" stroke-width="4" fill="none" stroke-linecap="round"/>`);
const darePic3 = (i) => `<rect x="-200" y="-140" width="400" height="280" fill="#EAF3F7"/>` + (i === 0 ? TF(0, 0, 1.3, pin18()) : i === 1 ? TF(0, 0, 1.3, wire18()) : TF(0, -50, 1.05, pin18()) + TF(0, 60, 1.05, wire18()));
// EP19's use: card i (0..2) exactly as EP18's SC.dare drew it (choiceCard3, its picture), at any size
const darePic = (i) => darePic3(i);
const dareCard3 = (i, o = {}) => choiceCard3(i + 1, DARE_CARDS[i], darePic(i), { w: 400, h: 330, size: 36, ...o });
