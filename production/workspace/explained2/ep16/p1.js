// p1.js: PART 1, "Fish, Frog or Lizard? What Does a TADPOLE Become?": EP15's dare answered (a frog), where tadpoles come from (frog eggs in
// a jelly-like covering), be a frog egg, the tadpole (does not look like the adult), HOLD ON! (four stages? no: three), the chick (looks like
// the adult), the cliffhanger (an empty grasshopper). Segments 1-14 of ../p3_ep16_script.md (version 1, 23 Nov 2026).
// STAGE 1 (setup): the shared routines are WIRED (the calm recap of EP15's dare with its three real cards, the title slam, the game as ONE
// smooth push-in onto the tree frog (common.js gameScene), the goals read by Basil, the countdown, Round 1's lock-in with the dare's cards and
// the clue labels on top of the ring, the two Mark Sentences (Basil, Pip), the book strips, the LOOK-CLOSER frames (lcPH inside the real
// lookCloser), the journey's tags and riders, the score hand, the tree frog's smooth reveal with its fun-fact panel, the read-along, "Now you
// know!"). Every scene with new art is a phScene placeholder. STAGE 2 (Fable) draws them: SCENES_TODO.md has the full staging per scene and line.
if (PART === 1) { (() => {
const L1 = "e501";
// the scores (script section 3): Round 1 1 : 0 (only Momo is right), HOLD ON! 2 : 0
SCORE.push([MK("coin1") - .1, 1, 0]);
SCORE.push([W("e903", "one") - .1, 2, 0]);
const FOOT = "P3 · Life Cycles of Animals · Three-stage life cycles";
const ph = (title, ...notes) => (t, s) => phScene(t, s, title, notes.concat(["Full staging: SCENES_TODO.md."])) + HUD(t);
const dareBoard = (i, x, y, sc, o = {}) => picBoard(DARE_PICS[i], x, y, 1, { sc, lab: o.lab === false ? undefined : DARE_CARDS[i].toLowerCase(), size: 30, id: "p1d" + i + (o.id || ""), t: o.t || 0 });
const qMark = (t, t0, x, y, r = 50) => t < t0 ? "" : TF(x, y, spring(t, t0, .5) * (1 + .05 * Math.sin(t * 4)), `<g filter="url(#dropS)"><circle r="${r}" fill="url(#gSun)"/></g>${T(0, r * .52, "?", r * 1.56, P.ink)}`);
const slamFit = (y, txt, col, k) => slamLine(y, txt, Math.min(170, 170 * 1720 / tw(txt, 170, 700, "Fredoka", 4)), col, k);

/* 1 · silent cold open: the garden pond at dawn (EP15's three dare cards slide in low along the pond's edge: real art, WIRED) */
const CBX = [620, 960, 1300];
SC.cold = (t, s) => phScene(t, s, "1 · Cold open: the garden pond at dawn (no voice)", ["EP15's community garden just after rain, dawn: the little pond fills most of the frame (lily pads, reeds, a big leaf leaning over the water), a CLUMP OF FROG EGGS (clear jelly, dark dots) among the lily pads. MK wriggle: three tadpoles (round bodies, long tails, NO legs) wriggle past the clump. The tree frog on the big leaf over the pond.",
  "MK cardsIn: EP15's three dare cards slide in low along the pond's edge (wired). MK budsIn: Basil (on a flat stone, nose to the water), Momo (bench end), Pip (grass) pop in, big. Location pill: A community garden, Singapore · dawn. No title. Full staging: SCENES_TODO.md."])
  + [0, 1, 2].map((i) => { const t0 = MK("cardsIn") + i * .3; if (t < t0) return ""; const [x, d] = slideX(t, t0, .7, 2500, CBX[i], 990); return d + dareBoard(i, x, 900, .5, { lab: false, id: "c" }); }).join("");

/* 2 · "Last time...": EP15's dare, word for word. ONE calm picture: the three dare cards side by side, a gentle push-in, the big ?, the three
   numbered cards; each steps forward and its card lights while Heart says it (>= 2.5 s each). WIRED */
SC.lasttime = (t, s) => { const L = "e203", tc = [W(L, "one"), W(L, "two"), W(L, "three")], z = 1 + .04 * eio((t - s.t0) / 8), k = ramp(t, s.t0 + .05, .5), cur = tc.filter((x) => t >= x - .15).length - 1;
  let boards = ""; [0, 1, 2].forEach((i) => { const fw = cur === i ? ss(tc[i] - .15, tc[i] + .25, t) : (cur > i ? 1 - ss(tc[i + 1] - .15, tc[i + 1] + .25, t) : 0);
    boards += dareBoard(i, 560 + i * 400, 600 + 14 * (1 - spring(t, s.t0 + .2 + i * .15, .45)), .95 * (1 + .1 * fw), { id: "lt", t }); });
  return bg("stage2") + OP(ramp(t, s.t0, .3), T(960, 110, "Last time…", 60, "#fff", { w: 600 }))
    + OP(k, `<g transform="translate(960 540) scale(${n2(z)}) translate(-960 -540)">${boards}</g>`
      + qMark(t, W("e202", "what") - .1, 960, 240)
      + DARE_CARDS.map((c, i) => TF(560 + i * 400, 880, .5 * spring(t, tc[i] - .1, .45), ansCard(i + 1, c, { w: 430, h: 290, size: 50, pulse: cur === i ? .9 : pulse(t, tc[i], .04, .9) }))).join("")
      + TF(960, 1010, spring(t, W("e202", "what") - .1, .4), tpill(0, 0, DARE_LABEL, 40, P.sun, P.ink, { w: 700 }))) + HUD(t); };
SC.back = (t, s) => phScene(t, s, "2 · Back at the pond", ["The pond (the cold open's set): a tadpole wriggles past the camera; EP15's three cards along the edge (wired), the buddies big. Pill: Hold on to your answer! (wired). Full staging: SCENES_TODO.md."])
  + [0, 1, 2].map((i) => dareBoard(i, CBX[i], 900, .5, { lab: false, id: "bk" })).join("")
  + (t >= LT("e204") - .1 ? TF(960, 700, spring(t, LT("e204") - .1, .4), tpill(0, 0, "Hold on to your answer!", 40, P.sun, P.ink, { w: 700 })) : "");
// the title slam over the dimmed pond: FISH, FROG OR LIZARD? (white) then WHAT DOES A TADPOLE BECOME? (sun yellow). WIRED
const TITLE = (k1, k2) => slamFit(400, "FISH, FROG OR LIZARD?", "#fff", k1) + slamFit(610, "WHAT DOES A TADPOLE BECOME?", P.sun, k2);
SC.title = (t, s) => { const u = t - MK("title"), dim = clamp(u / .2); return lcSet(t, s, "back") + `<rect width="1920" height="1080" fill="${P.night}" opacity="${n2(.78 * dim)}"/>` + TITLE(slamK(u, .05), slamK(u, .55)) + HUD(t); };

/* 3 · the game, and the hidden tree frog: ONE smooth push-in from the (dimmed) pond straight onto the tree frog on the big leaf over the water
   (common.js gameScene). Stage 2: R.world = the drawn pond, A = the frog's spot in it (the INTRO spot: never used again). WIRED */
SC.game = (t, s) => gameScene(t, s, ["e301a", "e301b", "e301r"], false, { world: (tt) => pondPH(tt), A: TREEFROG, T: [1400, 470], Z: 2.4, dim0: .78, ly: -150, qx: 1730, qy: 430, pre: () => TITLE(1, 1) });
SC.goals = (t, s) => goals3(t, s, [["The 3-stage life cycle", ""], ["Young that look different", ""], ["Why frog eggs have jelly", ""]], ["e401", "e402", "e403", "e404"], "basil");

/* 5 · Round 1: EP15's dare (a short 3 s ring). EP15's three cards as the ONE set of numbered picture cards; the clue labels lives in water ·
   has a tail ON TOP of the ring; the ring's picture: one tadpole, big (ringPH: Stage 2 draws it). No x chip yet: the journey decides */
SC.r1card = (t, s) => roundCard(t, s, "ROUND 1", "YOUR ANSWER FROM LAST TIME");
SC.r1 = (t, s) => lockN(t, { cards: DARE_CARDS, clues: DARE_CLUES.map((c, i) => [c, W(L1, "tadpole") + .15 * i]), lead: "momo", csize: 34, q: DARE_LABEL, tq: W(L1, "what") - .1,
  tc: [W(L1, "what"), W(L1, "tadpole"), W(L1, "show")], ring0: MK("ring0_r1"), dur: 3, lock: "e502",
  pics: [0, 1, 2].map((i) => dareBoard(i, 0, 108, .6, { lab: false, id: "r1i" })),
  obj: ringPH("one tadpole, big: a round body, a long tail, no legs, swimming"),
  picks: [{ who: "pip", id: "e503", word: "1" }, { who: "basil", id: "e504", word: "3" }, { who: "momo", id: "e505", word: "2" }],
  react: [[LE("e503") + .1, "pip", "pointing"], [LE("e504") + .1, "basil", "pointing"], [LE("e505") + .1, "momo", "pointing"]] });

/* 6 · where do the tadpoles come from? Pip asks; Momo's idea (a mother frog with babies like kittens) as HER thought bubble, with a ? */
SC.pond = (t, s) => ph("6 · \"But where do the tadpoles come from?\" (the pond's edge, close)", "The pond's edge, close: the egg clump among the lily pads, tadpoles darting. Pip big at the left on a stone (asks: thinking); Momo big at the right on the bench end. Momo's wrong idea as HER thought bubble (a mother frog with a row of tiny tadpoles like kittens, a ? on it: an idea, never a fact); it pops away as the look-closer opens. The tree frog on a reed stem at the far side (new spot).")(t, s)
  + thought(t, W("e602m", "mother") - .2, s.t1 - .1, 1380, 360, "a mother frog with baby tadpoles, like kittens?", { size: 30 });

/* 7 · [LOOK CLOSER] the frog eggs in their jelly (JELLY-LIKE COVERING pops inside, lib.js o.at); the book's strip 5.3 (Heart reads it) */
SC.lceggs = (t, s) => lcPH(t, s, { title: "The frog eggs in their jelly-like covering", v: "v_eggs", verdict: [`EGGS KEPT SAFE AND WET`, GOODC], fx: 960, fy: 640,
  beats: [["clump", "the clump of clear jelly among the lily-pad stems, a few hundred dark dots"], ["dots", "a magnifier on ONE egg: an egg in its own ball of jelly"], ["kw_jelly_like_covering", "JELLY-LIKE COVERING pops; label joined to the jelly"], ["fish", "a little fish nudges the clump; its mouth slides off: slippery"], ["sun", "the sun; the water drops a little; the top eggs stay wet and shiny"], ["v_eggs", "verdict"]],
  notes: ["The pond in a cut-away side view FILLS the panel: the clump of clear jelly among the lily-pad stems, a few hundred dark dots. On 'egg' a magnifier circle (joined by a plain line) on ONE egg: a dark round egg inside its own clear ball of jelly; labels an egg and jelly-like covering (purple, joined to the jelly).",
    "The why as a picture model, colour-coded, with arrows: a little fish nudges the clump, its mouth slides off (a curved arrow, slippery) and it swims away; the sun comes out, the water level drops at the edge, the jelly round the top eggs stays wet and shiny (droplets, stays wet). A buddy's FACE peeks in: Momo (oops: her guess was wrong), Basil, Pip, Basil in turn."],
  over: (tt) => lcStrip(tt, "e608", "Frog eggs have a jelly-like covering. The covering protects the eggs from being eaten by other animals. It also keeps the eggs from drying out.") + smallPrint(tt, s.t0 + 1.0, EGG_RULE) });

/* 8 · BE A FROG EGG (the journey; the buddies ride along, shrunk: common.js riders) */
SC.waitw = ph("8 · Be a frog egg! (the glide in)", "Pill Be a frog egg! The camera glides down to the water and under the surface; a soft blue-green wipe. The buddies wave the viewer off, then shrink (a pop each) and come along. The shelf slides aside. The tree frog on a lily pad's rim as the camera passes (new spot).");
SC.shrink = (t, s) => phScene(t, s, "8 · BE A FROG EGG (first person, present tense)", ["MK jegg: YOU are one dark egg inside the clear jelly: a soft glowing wall all round, the other eggs like dark moons; a fish's huge blurry shape glides past and bumps off the jelly. MK jhatch: you wriggle out; MK jtadpole: your own long tail sweeps at the bottom edge of the frame, lily-pad stems like tree trunks. MK jback: two back legs (they kick at the lower edge); MK jfront: two front legs; MK jtail: your tail shrinks away; MK jpad: you climb a stem onto a lily pad, out into the air (the garden HUGE); MK jfrog: a frog.",
  "The three buddies ride along, shrunk, on a sunken leaf at the lower edges underwater, then on the same lily pad (riders): Pip holds his breath, Momo surprised at the fish, Basil points at the back legs, all three cheer at the frog. Calm pad, Heart soft. Nothing about breathing organs. Full staging: SCENES_TODO.md."])
  + youTag(t, MK("jegg"), "You: a frog egg") + feelTag(t, MK("jtadpole"), MK("jback") - .1, "a tadpole", 160) + feelTag(t, MK("jfrog"), MK("jfrog") + 3, "a frog", 160)
  + speeded(t, MK("jhatch"), MK("jfrog")) + riders(t, s, { tin: MK("jegg") + .6 });
SC.pullout = ph("8 · Pull back out to the pond", "Whoosh up and out to the pond, normal size: a small frog on a lily pad (0.6 s). The buddies pop back to full size (a hop each).");

/* 9 · the answer: a frog. TADPOLE pops (lib.js o.at); the book's caption on a cream strip (Heart reads it, >= 3.5 s). EP15's cards small along
   the top: card 2 the green tick at ansglow, x chips on cards 1 and 3 (Stage 2). WIRED: the cards small, the strip */
SC.frogans = (t, s) => ph("9 · The answer is two: a frog (TADPOLE pops)", "The pond: a small frog (four legs, webbed back feet, moist shiny skin, NO tail) on a lily pad. EP15's three cards small along the top (wired): card 2 the green tick at ansglow, small x chips on cards 1 and 3 and by Pip and Basil; the coin at coin1. Momo big at the left (confident, then explains); Pip and Basil shy (oops). Then the caption strip beside a big tadpole picture (round body, long tail, no legs, in water) with label lines lives in water · a tail · does not look like the adult, the frog small beside it. The tree frog on the bench's armrest (new spot).")(t, s)
  + [0, 1, 2].map((i) => dareBoard(i, 760 + i * 200, 190, .32, { lab: false, id: "fa" })).join("")
  + (t >= MK("ansglow") ? TF(960, 120, spring(t, MK("ansglow"), .45), tickBadge(30)) : "")
  + lcStrip(t, "e805", "It lives in water. It has a tail and does not look like the adult.");

/* 10 · HOLD ON! Pip counts four stages (Stage 2: model ../ep15/p1.js SC.holdon: the HOLD ON! stamp, the YOU ring 5 s with crossed arms, the
   clue labels a tadpole with legs · 4 stages? ON TOP of the ring, the bell, the coin; then the bracket and the row sliding into a loop) */
SC.holdon = ph("10 · HOLD ON! Pip counts four stages", "Pip's board on a low easel by the pond: FOUR pictures in a ROW with straight arrows (an egg in jelly · a tadpole · a tadpole with legs · a frog), numbered 1 2 3 4, titled 4 STAGES!. MK board: Pip points along it. The HOLD ON! stamp; the YOU ring (5 s, crossed arms) big and central with Pip's board as its picture and the clue labels a tadpole with legs · 4 stages? on top; only Pip at the side (fidgeting: worried). After the bell: MK bracket: one curly bracket groups the tadpole AND the tadpole with legs, label the young (green); Pip's numbers fly off; MK tegg: the pictures slide round into a LOOP (no numbers). Basil big at the right for his fix. The tree frog on top of the easel's frame (new spot); not in the ring.");
/* 10 · the loop board OUR FROG'S LIFE CYCLE at its HOME (centre-right by the pond, about 55% of the frame high) */
SC.ring = ph("10 · The board OUR FROG'S LIFE CYCLE", "A cream board on a low stand by the pond, centre-right, about 55% of the frame high: curved arrows all running ONE way, three round picture slots: frog eggs in jelly (the egg, landed at tegg) · MK tyoung a tadpole (the young: a tadpole) · MK tadult a frog (the adult); MK tback the last arrow lights from the frog back to the eggs, then the arrows run round. NO numbers, no START, no END. Basil big at the left beside the board, Pip and Momo mid-ground at the right. The tree frog on the rim of a flower pot by the pond (new spot).");
SC.mark1 = (t, s) => markScene(t, s, { id: "e1002", sayId: "e1001", who: "basil", n: "1 of 2", text: "A life cycle with three stages includes the egg, the young and the adult.", keys: ["three", "stages", "egg", "young", "adult"], size: 64, y: 240, footer: FOOT });

/* 11 · a hen and her chicks walk in (Basil's colour idea as two colour swatches with a ?), then [LOOK CLOSER] the chick beside the hen (CHICK
   pops inside); Mark Sentence 2 (Pip) */
SC.hen = (t, s) => ph("11 · \"Does every young animal look so different?\" A hen and her chicks", "The garden's grassy edge by the void deck, mid-morning. MK henIn: a brown HEN (red comb and wattles, two legs) walks in from the bushes with FOUR chicks (small, pale yellow, fluffy, two legs), all pecking. Basil's colour idea as two big swatches by the birds (yellow · brown) with a ? (his idea, not a fact). Pip big at the left (asks: thinking); Basil big at the right (sure of himself); the birds centre, about 30% of the frame. The tree frog on the low wall of a planter bed (new spot).")(t, s)
  + smallPrint(t, MK("henIn"), HEN_RULE);
SC.lcchick = (t, s) => lcPH(t, s, { title: "The chick beside the hen: look at the body parts", v: "v_chick", verdict: [`LOOKS LIKE THE ADULT`, LIKEC], fx: 960, fy: 700,
  beats: [["beak", "a beak (orange), joined to BOTH birds"], ["wings", "two wings (violet)"], ["legs", "two legs (teal)"], ["peck", "both peck at the same moment (a dust puff)"], ["kw_chick", "CHICK pops (on the chick)"], ["pairs", "the 2x2: chick + hen looks like the adult (green) · tadpole + frog does not look like the adult (orange)"], ["v_chick", "verdict (on the chick row)"]],
  notes: ["Two halves, both BIG: LEFT a chick, RIGHT the hen, the same pose (both pecking). Colour-coded part labels, each joined to its part on BOTH birds by plain lines: a beak (orange) · two wings (violet) · two legs (teal); each part pulses as it is named.",
    "Then the panel slides into a 2x2: TOP chick + hen with a green pill looks like the adult; BOTTOM tadpole + frog with an orange pill does not look like the adult. A buddy's FACE peeks in: Basil first (thinking: he still believes the colour rule, then oops at Pip's line), Pip, Momo, Basil (oops, a grin on kitten)."] });
SC.mark2 = (t, s) => markScene(t, s, { id: "e1202", sayId: "e1201", who: "pip", n: "2 of 2", text: "Some animals have three stages in their life cycles. Some of the young animals look like their parents, while some do not.", keys: ["three", "stages", "look", "like", "parents", "some", "not"], size: 54, y: 225, footer: FOOT });

/* 12 · score hand, the tree frog (lizReveal: the score hand melts into the pond, ONE push-in onto the frog on the garden tap (the REVEAL spot,
   never the intro leaf); Momo's fun-fact panel: a ball of foam on a leaf over the water (ff_foam), tadpoles dropping into the pond (ff_drop)) */
SC.final = (t, s) => { const L = "e1301"; return finalScene(t, s, L, 0, [[s.t0, null, 1], [W(L, "two") - .1, null, 2]]); };
SC.liz = (t, s) => { const L = "e1302", tq = W(L, "it") - .1;
  return lizReveal(t, s, L, pondPH(t, TREEFROG_R), TREEFROG_R[0], TREEFROG_R[1], tq, "It was on the garden tap, beside the pond!", -120, 160, 80, 1.9, { from: () => SC.final(SCN.final.t1 - .04, SCN.final), tell: "e1304",
    fact: { id: "e1303", at: [1300, 560], w: 900, h: 420, items: FF([["ff_foam", "a ball of foam on a leaf", "DRAW: a white ball of foam stuck to a leaf over the water, tiny eggs inside (cute, like bubble bath)"], ["ff_drop", "the tadpoles drop into the pond", "DRAW: tiny tadpoles dropping from the foam into the pond, a little splash each"]]) } }) + smallPrint(t, s.t0 + .5, FROG_RULE); };

/* 13 · the cliffhanger: a little grasshopper with no wings (hop) and an empty grasshopper on the grass (skin), a ?; PART 2 slams in */
SC.cliff = (t, s) => { const tP = W("e1502", "part") - .1; return phScene(t, s, "13 · The cliffhanger: an empty grasshopper on the grass", ["The grassy edge of the garden: MK hop: a small GREEN grasshopper with NO wings (six legs, two feelers, big back legs) hops onto a blade of grass; MK skin: beside it on another blade, a pale, see-through EMPTY grasshopper shape (the old skin) and a ? that pops. Momo big at the left (h ~520), crouched, nose to the grass; Basil and Pip at the right, leaning in (back views). Camera: a push along the grass from the grasshopper to the empty skin. Full staging: SCENES_TODO.md."])
  + qMark(t, MK("skin") + .2, 1300, 520) + (t >= tP ? slamFit(330, "PART 2", P.sun, slamK(t - tP, 0)) : "") + HUD(t); };
/* 14 · "Now you know!": the frog loop board at its home, centred between the buddies (Stage 2: draw it; a placeholder card now) */
SC.nyk = (t, s) => nykScene(t, s, TF(960, 900, 1, `<rect x="-220" y="-180" width="440" height="300" rx="30" fill="#FFF8EA" opacity=".9"/>` + T(0, -20, "our frog's life cycle", 38, P.ink) + T(0, 30, "(Stage 2: the loop board)", 26, P.ink, { w: 500 })), { bx: [200, 1715, 1375], hx: 470 });
})(); }
