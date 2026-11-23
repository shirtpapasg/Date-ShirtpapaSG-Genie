// ep17dare.js: EP17's two dare cards ("Frog and mosquito: the same life cycle?": 1 Yes, the same · 2 No, different), the cards the child saw
// at the end of EP17 (../ep17/p2.js SC.dare: choiceCard3 with lc17.js twoLoops: the frog's loop and the mosquito's loop with a big = / ≠).
// EP18 Part 1 opens with them (cold, lasttime, back, r1, answer). STAGE 2: EP17's own card art, copied unchanged with lc17.js (twoLoops and its
// helpers miniLoop, frogPic, miniLoop4, mPic, signDisc), so the child sees exactly last week's cards. Each picture fills -200..200 x -140..140.
// (lc17.js twoLoops with its two name labels lifted 16 px: at y 120 their letters' tails were cut by choiceCard3's picture box, "froa")
const twoLoops18 = (t, sym, id) => twoLoops(t, sym, id).replace(/<text([^>]*) y="120"/g, '<text$1 y="104"');
PIC.same17 = (t = 0) => twoLoops18(t, "=", "s17");
PIC.diff17 = (t = 0) => twoLoops18(t, "≠", "d17");
const DARE_PICS = ["same17", "diff17"];
const darePic = (i, t = 0) => DARE_PICS[i] && PIC[DARE_PICS[i]] ? PIC[DARE_PICS[i]](t) : "";
// the dare's cards as EP17 drew them: ONE big numbered picture card each (common.js choiceCard3)
const dareCard3 = (i, t, o = {}) => choiceCard3(i + 1, DARE_CARDS[i], darePic(i, t), { w: 400, h: 330, size: 36, id: "dc" + (o.id || ""), ...o });
