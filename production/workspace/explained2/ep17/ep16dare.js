// ep16dare.js: EP16's two dare cards ("Is the caterpillar a nymph?": 1 Yes, a nymph · 2 No), the cards the child saw at the end of EP16.
// Copied UNCHANGED from ../ep16/p2.js `nextPic` (EP16 Stage 2, 23 Nov): card 1 a grasshopper nymph with a ? (hopper16), card 2 the lime
// caterpillar on its leaf (caterpillar16); both drawings live in pond16.js (copied from ../ep16). EP17 Part 1 opens with them (cold,
// lasttime, back, r1, answer1). Each picture fills -200..200 x -140..140 (choiceCard3's picture box).
PIC.nymph16 = (t = 0) => `<rect x="-200" y="-140" width="400" height="280" fill="#E8F5DC"/>` + TF(-20, 80, 1.2, hopper16(t, {})) + TF(150, -80, .8, `<g filter="url(#dropS)"><circle r="40" fill="url(#gSun)"/></g>${T(0, 20, "?", 60, P.ink)}`);
PIC.cat16 = (t = 0) => `<rect x="-200" y="-140" width="400" height="280" fill="#E8F5DC"/><path d="M-200 60 Q0 20 200 70 V140 H-200z" fill="#58B56C"/>` + TF(0, 60, 1.25, caterpillar16(t));
const DARE_PICS = ["nymph16", "cat16"];
const darePic = (i, t = 0) => DARE_PICS[i] && PIC[DARE_PICS[i]] ? PIC[DARE_PICS[i]](t) : "";
// the dare's cards as EP16 drew them: ONE big numbered picture card each (common.js choiceCard3, as ../ep16/p2.js SC.dare)
const dareCard3 = (i, t, o = {}) => choiceCard3(i + 1, DARE_CARDS[i], darePic(i, t), { w: 400, h: 330, size: 40, id: "dc" + (o.id || ""), ...o });
