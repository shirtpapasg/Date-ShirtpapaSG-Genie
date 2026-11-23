// ep17dare.js: EP17's two dare cards ("Frog and mosquito: the same life cycle?": 1 Yes, the same · 2 No, different), the cards the child saw
// at the end of EP17. EP18 Part 1 opens with them (cold, lasttime, back, r1, answer). STAGE 1: EP17's dare is not drawn yet (its Stage 2 is in
// progress in ../ep17/), so the cards are plain numbered ansCards (tests.js DARE_CARDS) and DARE_PICS is empty. STAGE 2: copy EP17's two card
// pictures from ../ep17 (its SC.dare art, once drawn) into this file UNCHANGED as PIC.same17 / PIC.diff17 and set DARE_PICS = ["same17",
// "diff17"] (card 1: the frog loop and the mosquito loop with a big =; card 2: the same two loops with a big ≠), so the child sees exactly
// last week's cards.
const DARE_PICS = [];
const darePic = (i, t = 0) => DARE_PICS[i] && PIC[DARE_PICS[i]] ? PIC[DARE_PICS[i]](t) : "";
