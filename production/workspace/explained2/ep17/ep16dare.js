// ep16dare.js: EP16's two dare cards ("Is the caterpillar a nymph?": 1 Yes, a nymph · 2 No), the cards the child saw at the end of EP16.
// EP17 Part 1 opens with them (cold, lasttime, back, r1, answer1). STAGE 1: EP16's dare is not drawn yet (its Stage 2 is in progress in
// ../ep16/), so the cards are plain numbered ansCards (tests.js DARE_CARDS) and DARE_PICS is empty. STAGE 2: copy EP16's two card pictures
// from ../ep16 (its SC.dare art, once drawn) into this file UNCHANGED as PIC.nymph16 / PIC.cat16 and set DARE_PICS = ["nymph16", "cat16"]
// (card 1: a caterpillar beside a grasshopper nymph with a ?; card 2: a caterpillar alone), so the child sees exactly last week's cards.
const DARE_PICS = [];
const darePic = (i, t = 0) => DARE_PICS[i] && PIC[DARE_PICS[i]] ? PIC[DARE_PICS[i]](t) : "";
