// ep18dare.js: EP18's three dare cards ("Which will the magnet pull?": 1 The steel pin · 2 The copper wire · 3 Both), the cards the child saw
// at the end of EP18 (../ep18/p2.js SC.dare: choiceCard3 with the pictures below). EP19 Part 1 opens with them (cold, lasttime, back, r1,
// answer). STAGE 1: copied UNCHANGED from ../ep18/art18.js (23 Nov 2026, EP18 Stage 2 in progress): magnet18, pin18, wire18, darePic3. If
// EP18's Stage 2 changes them before it is finished, copy them again (never edit ../ep18). Stage 2 of EP19 may draw its own bigger pin and
// wire for the scenes, but these card pictures stay EP18's own, so the child sees exactly last week's cards.
// the dare (into EP19): Basil's red-and-blue bar magnet, a steel pin, a short piece of copper wire. origin = their middle
// Stage 2: magnet18, pin18, wire18 and darePic3 now come from art18.js (copied unchanged from ../ep18, loaded before this file): the same art.
// EP19's use: card i (0..2) exactly as EP18's SC.dare drew it (choiceCard3, its picture), at any size
const darePic = (i) => darePic3(i);
const dareCard3 = (i, o = {}) => choiceCard3(i + 1, DARE_CARDS[i], darePic(i), { w: 400, h: 330, size: 36, ...o });
