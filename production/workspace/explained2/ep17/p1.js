// p1.js: PART 1, "Is a Caterpillar a NYMPH? The Butterfly's Secret Stage": EP16's dare answered (no, not a nymph), a worm? (the caterpillar's
// legs: six legs and PROLEGS), be a butterfly egg, the LARVA, HOLD ON! (the pupa is just resting? no: PUPA), inside the pupa (the butterfly
// comes out), OUR BUTTERFLY'S LIFE CYCLE (four stages), the moth, the cliffhanger (something wriggling in a pail of rainwater).
// Segments 1-15 of ../p3_ep17_script.md section 4 (version 1, 23 Nov 2026).
// STAGE 1 (setup): the shared routines are WIRED (the calm recap of EP16's dare with its two cards, the title slam, the game as ONE smooth
// push-in onto the moth (common.js gameScene), the goals read by Pip, the countdown, Round 1's lock-in with the dare's TWO cards and the clue
// labels on top of the ring, the two Mark Sentences (Basil, Momo), the book strips, the LOOK-CLOSER frames (lcPH inside the real lookCloser),
// the journey's tags and riders, the score hand, the moth's smooth reveal with its fun-fact panel, the read-along, "Now you know!"). Every
// scene with new art is a phScene placeholder. STAGE 2 (Fable) draws them: SCENES_TODO.md has the full staging per scene and line.
if (PART === 1) { (() => {
const L1 = "a501";
// the scores (script section 3): Round 1 1 : 1 (Pip and Momo right: the Buddies score too), HOLD ON! 2 : 1
SCORE.push([MK("coin1") - .1, 1, 1]);
SCORE.push([W("a1003", "one") - .1, 2, 1]);
const FOOT = "P3 · Life Cycles of Animals · Four-stage life cycles";
const ph = (title, ...notes) => (t, s) => phScene(t, s, title, notes.concat(["Full staging: SCENES_TODO.md."])) + HUD(t);
// EP16's two dare cards (ep16dare.js: plain numbered cards until EP16's card art is copied in at Stage 2)
const dareCard = (i, o = {}) => ansCard(i + 1, DARE_CARDS[i], { w: 430, h: 290, size: 50, icon: darePic(i, o.t || 0) || undefined, ...o });
const qMark = (t, t0, x, y, r = 50) => t < t0 ? "" : TF(x, y, spring(t, t0, .5) * (1 + .05 * Math.sin(t * 4)), `<g filter="url(#dropS)"><circle r="${r}" fill="url(#gSun)"/></g>${T(0, r * .52, "?", r * 1.56, P.ink)}`);
const slamFit = (y, txt, col, k) => slamLine(y, txt, Math.min(170, 170 * 1720 / tw(txt, 170, 700, "Fredoka", 4)), col, k);

/* 1 · silent cold open: the lime plant at dawn (EP16's two dare cards slide in low along the pot's rim: WIRED) */
const CBX = [760, 1160];
SC.cold = (t, s) => phScene(t, s, "1 · Cold open: the lime plant at dawn (no voice)", ["EP15 / EP16's community garden beside the HDB block at dawn (the void deck behind, planter beds, the bench). The LIME PLANT in its big pot fills most of the frame: glossy leaves, one leaf edge chewed. MK munch: the plump GREEN caterpillar munches the leaf edge (bites appear); a tiny pale round egg on a younger leaf's tip.",
  "MK cardsIn: EP16's two dare cards slide in low along the pot's rim (wired). MK budsIn: Pip (garden path, left), Momo (bench end, right, waving hello), Basil (planter wall) pop in, big. Location pill: A community garden, Singapore · dawn. The moth on the void deck's pillar (before the game). No title. Full staging: SCENES_TODO.md."])
  + [0, 1].map((i) => { const t0 = MK("cardsIn") + i * .3; if (t < t0) return ""; const [x, d] = slideX(t, t0, .7, 2500, CBX[i], 990); return d + TF(x, 900, .5, dareCard(i, { t })); }).join("");

/* 2 · "Last time...": EP16's dare, word for word. ONE calm picture: the two dare cards side by side, a gentle push-in, the big ?, each card
   steps forward and lights while Heart says it (>= 2.5 s each). WIRED */
SC.lasttime = (t, s) => { const L = "a203", tc = [W(L, "one"), W(L, "two")], z = 1 + .04 * eio((t - s.t0) / 8), k = ramp(t, s.t0 + .05, .5), cur = tc.filter((x) => t >= x - .15).length - 1;
  let cards = ""; [0, 1].forEach((i) => { const fw = cur === i ? ss(tc[i] - .15, tc[i] + .25, t) : (cur > i ? 1 - ss(tc[i + 1] - .15, tc[i + 1] + .25, t) : 0);
    cards += TF(700 + i * 520, 600 + 14 * (1 - spring(t, s.t0 + .2 + i * .15, .45)), 1.15 * (1 + .1 * fw), dareCard(i, { t, pulse: cur === i ? .9 : pulse(t, tc[i], .04, .9) })); });
  return bg("stage2") + OP(ramp(t, s.t0, .3), T(960, 110, "Last time…", 60, "#fff", { w: 600 }))
    + OP(k, `<g transform="translate(960 540) scale(${n2(z)}) translate(-960 -540)">${cards}</g>`
      + qMark(t, W("a202", "is") - .1, 960, 260)
      + TF(960, 1000, spring(t, W("a202", "is") - .1, .4), tpill(0, 0, DARE_LABEL, 40, P.sun, P.ink, { w: 700 }))) + HUD(t); };
SC.back = (t, s) => phScene(t, s, "2 · Back at the lime plant", ["The lime plant (the cold open's set): the caterpillar takes another bite; EP16's two cards along the pot's rim (wired), the buddies big. Pill: Hold on to your answer! (wired). The moth still on the void deck's pillar (before the game). Full staging: SCENES_TODO.md."])
  + [0, 1].map((i) => TF(CBX[i], 900, .5, dareCard(i, { t }))).join("")
  + (t >= LT("a204") - .1 ? TF(960, 700, spring(t, LT("a204") - .1, .4), tpill(0, 0, "Hold on to your answer!", 40, P.sun, P.ink, { w: 700 })) : "");
// the title slam over the dimmed lime plant: IS IT A NYMPH? (white) then THE CATERPILLAR'S SECRET (sun yellow). WIRED
const TITLE = (k1, k2) => slamFit(400, "IS IT A NYMPH?", "#fff", k1) + slamFit(610, "THE CATERPILLAR'S SECRET", P.sun, k2);
SC.title = (t, s) => { const u = t - MK("title"), dim = clamp(u / .2); return lcSet(t, s, "back") + `<rect width="1920" height="1080" fill="${P.night}" opacity="${n2(.78 * dim)}"/>` + TITLE(slamK(u, .05), slamK(u, .55)) + HUD(t); };

/* 3 · the game, and the hidden moth: ONE smooth push-in from the (dimmed) garden straight onto the moth on the void deck's pillar (common.js
   gameScene). Stage 2: R.world = the drawn garden (the lime-plant side, the void deck behind), A = the moth's spot in it (the INTRO spot:
   never used again). WIRED */
SC.game = (t, s) => gameScene(t, s, ["a301a", "a301b", "a301r"], false, { world: (tt) => limePH(tt), A: MOTH, T: [1400, 470], Z: 2.4, dim0: .78, ly: -150, qx: 1730, qy: 430, pre: () => TITLE(1, 1) });
SC.goals = (t, s) => goals3(t, s, [["The 4-stage life cycle", ""], ["Larva and pupa", ""], ["What prolegs are", ""]], ["a401", "a402", "a403", "a404"], "pip");

/* 5 · Round 1: EP16's dare (a short 3 s ring). EP16's two cards as the ONE set of numbered picture cards; the clue labels long, soft body ·
   chews leaves ON TOP of the ring; the ring's picture: the caterpillar, big, on its leaf (ringPH: Stage 2 draws it). Basil leads (worried) */
SC.r1 = (t, s) => lockN(t, { cards: DARE_CARDS, clues: DARE_CLUES.map((c, i) => [c, W(L1, "caterpillar") + .15 * i]), lead: "basil", csize: 44, q: DARE_LABEL, tq: W(L1, "is") - .1,
  tc: [W(L1, "caterpillar"), W(L1, "nymph")], ring0: MK("ring0_r1"), dur: 3, lock: "a502",
  pics: [0, 1].map((i) => darePic(i)),
  obj: ringPH("the green caterpillar, big, munching its lime leaf"),
  picks: [{ who: "basil", id: "a503", word: "1" }, { who: "pip", id: "a504", word: "2" }, { who: "momo", id: "a505", word: "2" }],
  react: [[LE("a503") + .1, "basil", "pointing"], [LE("a504") + .1, "pip", "pointing"], [LE("a505") + .1, "momo", "pointing"]] });

/* 6 · the answer: no (the caterpillar beside the butterfly picture it will become, a big orange ≠). EP16's cards small along the top: card 2
   the green tick at ansglow (WIRED: the cards small, the tick) */
SC.answer1 = (t, s) => ph("6 · The answer is two: no, it is not a nymph", "The lime plant: MK pair: a picture card of a lime BUTTERFLY (black with cream-yellow patches, a red-and-blue eyespot near each tail end, no tails) slides in low beside the real caterpillar, a big orange ≠ between them. EP16's two cards small along the top (wired): card 2 the green tick at ansglow, an x chip on card 1 and by Basil; the coin at coin1. Pip and Momo arms crossed (right), Basil oops (wrong). The moth on the bench's backrest (new spot).")(t, s)
  + [0, 1].map((i) => TF(840 + i * 240, 190, .36, dareCard(i, { t, lit: i === 1 && t >= MK("ansglow") ? 1 : 0 }))).join("")
  + (t >= MK("ansglow") ? TF(1080, 120, spring(t, MK("ansglow"), .45), tickBadge(30)) : "");

/* 7 · a worm? Momo asks (her idea as HER thought bubble, a ?); [LOOK CLOSER] the caterpillar's legs (PROLEGS pops inside, lib.js o.at); the
   book's strip (six legs); Mark Sentence 1 (Basil) */
SC.lime = (t, s) => ph("7 · \"Is it a worm?\" (close on the lime plant)", "Close on the lime plant: the caterpillar crawls slowly along a twig. Momo big at the left (asks: thinking); Basil big at the right. Momo's wrong idea as HER thought bubble (wired `thought`; Stage 2 draws a pink earthworm with a ? on it: an idea, never a fact); it pops away as the look-closer opens. The moth under a lime leaf at the top of the plant (new spot).")(t, s)
  + thought(t, W("a701m", "worm") - .2, s.t1 - .1, 1300, 360, "a worm?", { size: 40 });
SC.lclegs = (t, s) => lcPH(t, s, { title: "The caterpillar's legs: six legs and prolegs", v: "v_legs", verdict: ["AN INSECT, NOT A WORM", GOODC], fx: 960, fy: 620,
  beats: [["front", "the front end: three pairs of small pointed legs light, one pair at a time (six legs, teal)"], ["stumps", "the back half: the chubby prolegs (four middle pairs + one tail pair, orange)"], ["kw_prolegs", "PROLEGS pops"], ["hooks", "a magnifier on one proleg's flat bottom: a ring of tiny hooks (violet)"], ["grip", "the hooks grip the twig; a wave of prolegs, back to front: it walks"], ["v_legs", "verdict"]],
  notes: ["The caterpillar FILLS the panel, side view, crawling along a lime twig. On 'front' push in on the front end: three pairs of small, pointed, jointed legs light one pair at a time; label six legs (teal, joined to all six). On 'stumps' a pan to the back half: the chubby PROLEGS (four pairs in the middle, one pair at the tail end); label prolegs (orange).",
    "On 'hooks' a magnifier (joined by a plain line) on one proleg's flat bottom: a ring of TINY HOOKS (label tiny hooks, violet); on 'grip' the hooks grip the twig and the caterpillar walks along it. The speaker's FACE peeks in: Momo first (thinking, then oops at Pip's line: a worm has no legs), Pip (counting), Basil (surprised at the stumps, then teaching)."],
  over: (tt) => lcStrip(tt, "a704", "Like all insects, caterpillars have six legs.") + smallPrint(tt, s.t0 + 1.0, CAT_RULE) });
SC.mark1 = (t, s) => markScene(t, s, { id: "a708", sayId: "a707", who: "basil", n: "1 of 2", text: "Prolegs are false legs that help the caterpillars to move.", keys: ["prolegs", "false", "legs", "move"], size: 66, y: 240, footer: FOOT });

/* 8 · BE A BUTTERFLY EGG (the journey; the buddies ride along, shrunk, on the next lime leaf: common.js riders) */
SC.waitw = ph("8 · Be a butterfly egg! (the glide in)", "Pill Be a butterfly egg! The camera glides in to a young lime leaf's tip; a soft green wipe. The buddies wave the viewer off (goodbye), then shrink (a pop each) and come along. The shelf slides aside. The moth on the garden's fence post as the camera passes (new spot).");
SC.shrink = (t, s) => phScene(t, s, "8 · BE A BUTTERFLY EGG (first person, present tense)", ["MK jegg: YOU are a tiny round pale egg stuck on a lime leaf (a huge green field, veins like roads). MK jhatch: the shell cracks open, light pours in: you are a tiny caterpillar (your little front legs at the bottom edge). MK jmunch: you bite the leaf's edge (bites appear). MK jtight: the frame's edges squeeze in (too tight!); you wriggle out of your old skin. MK jbig: the leaf looks smaller: you are bigger. MK jhang: the world turns upside down as you hang from a stem by your tail end (a small silk pad and girdle). MK jsplit: your skin splits one last time; MK jpupa: a hard smooth green case closes round the view: a pupa.",
  "The three buddies ride along, shrunk, on the next lime leaf at the lower edges (riders): Momo surprised at the hatch; Basil munches along (acted, no pose); Pip thinking when you stop eating; Pip and Basil surprised at the hard case. Calm pad, Heart soft. NO silk cocoon for the butterfly. Full staging: SCENES_TODO.md."])
  + youTag(t, MK("jegg"), "You: a butterfly egg") + feelTag(t, MK("jhatch") + .4, MK("jtight") - .1, "a caterpillar", 160) + feelTag(t, MK("jtight"), MK("jbig") - .1, "too tight!", 160) + feelTag(t, MK("jpupa"), MK("jpupa") + 3, "a pupa", 160)
  + speeded(t, MK("jhatch"), MK("jpupa")) + riders(t, s, { tin: MK("jegg") + .6 });
SC.pullout = ph("8 · Pull back out to the lime plant", "Whoosh out to the lime plant, normal size: a green pupa hangs from a stem where the caterpillar was (0.6 s). The buddies pop back to full size (a hop each).");

/* 9 · LARVA pops (lib.js o.at); Momo teaches it; the larva's job (the book's words on a cream strip, Heart reads it) */
SC.larva = (t, s) => ph("9 · LARVA: the young that looks nothing like the adult", "The lime plant: the pupa hanging from its stem at the left; at the right a picture card of the caterpillar (the larva) with three plain label lines eats a lot · moults many times · looks nothing like the adult. LARVA pops on Heart's term (lib.js o.at). Momo big at the left beside the card (cheer when LARVA lands: a key word learnt; then teaching); Pip and Basil mid-ground right, listening. The moth on the watering can by the pot (new spot).")(t, s)
  + lcStrip(t, "a903", "The larva eats a lot and moults many times as it grows.");

/* 10 · HOLD ON! Pip's rule (Stage 2: model ../ep16/p1.js SC.holdon (or ../ep15/p1.js): the HOLD ON! stamp, the YOU ring 5 s with crossed
   arms, the clue labels does not move · does not eat ON TOP of the ring, the bell, the coin); PUPA pops after Basil's fix */
SC.holdon = ph("10 · HOLD ON! Pip: the pupa is just resting", "MK pupastill: Pip's own board on a low easel by the pot: the pupa drawn with a sleepy zzz, titled JUST RESTING!. The HOLD ON! stamp; the YOU ring (5 s, crossed arms) big and central with Pip's board as its picture and the clue labels does not move · does not eat on top; only Pip at the side (worried: his thinking face stands in). After the bell: Pip oops, Basil and Momo arms crossed (OUTCOMES); the zzz pops away and a small glow appears inside the pupa drawing; Basil's fix (pointing at the glow); PUPA pops on Heart's term (Basil cheer). The moth on top of Pip's easel's frame (new spot); not in the ring.");

/* 11 · [LOOK CLOSER] inside the pupa: the cut-away window, the shapes forming, the case darkening, the butterfly coming out */
SC.lcpupa = (t, s) => lcPH(t, s, { title: "Inside the pupa: changing into a butterfly", v: "v_pupa", verdict: ["THE PUPA IS BUSY CHANGING", GOODC], fx: 960, fy: 560,
  beats: [["case", "label pupal case (purple) joined to the hard shell"], ["window", "a cut-away window opens in the case: a soft glow inside"], ["form", "folded wings, long feelers, thin legs take shape (labels; speeded up; dots fill, no numbers)"], ["dark", "the case darkens; black and yellow wing colours show through"], ["split", "the case splits at the top"], ["out", "the butterfly crawls out, wings crumpled"], ["wings", "the wings pump out flat"], ["fly", "it flaps and flies off over the garden"], ["v_pupa", "verdict"]],
  notes: ["The pupa FILLS the panel, hanging from its stem (a silk pad at its tail end, a thin silk girdle: no cocoon). On 'pupal' the label pupal case (purple). On 'inside' a cut-away window opens in the case (a cream frame, like EP1's robot window): inside, a soft glow; on 'develop' the shapes of folded WINGS, long FEELERS and thin LEGS slowly take shape, each with its own label, a speeded up tag and a day counter of dots (no numbers).",
    "MK dark: the case darkens and the lime butterfly's black and cream-yellow wing colours show through. MK split / out: the case splits and the butterfly crawls out, wings crumpled; MK wings: they pump out flat; MK fly: it flies off. FACES: Pip first (thinking: his question), Momo (talking, the cake; surprised at the split), Basil (laughing on bedsheet)."],
  over: (tt) => lcStrip(tt, "a1102", "It does not eat. It continues to develop into an adult in the pupal case.") });

/* 12 · the loop board OUR BUTTERFLY'S LIFE CYCLE at its HOME (centre-right beside the lime plant's pot, about 55% of the frame high); the book's
   5.8 on a cream strip; Mark Sentence 2 (Momo) */
SC.ring = (t, s) => ph("12 · The board OUR BUTTERFLY'S LIFE CYCLE", "A cream board on a low stand beside the lime plant's pot, centre-right, about 55% of the frame high: curved arrows all running ONE way, four round picture slots: MK ltegg a tiny egg on a lime leaf (the egg) · ltlarva the caterpillar (the larva) · ltpupa the green pupa (the pupa) · ltadult the butterfly (the adult); MK ltback the last arrow lights from the butterfly back to the egg, then the arrows run round. NO numbers, no START, no END. Basil big at the left (pointing at each tile as it lands), Pip and Momo mid-ground right. The moth on the board stand's leg (new spot).")(t, s)
  // the book's 5.8 on a cream strip (Heart reads it, >= 3.5 s): WIRED
  + lcStrip(t, "a1201", "The butterfly has four stages in its life cycle. The stages are the egg, the larva, the pupa and the adult.");
SC.mark2 = (t, s) => markScene(t, s, { id: "a1203", sayId: "a1202", who: "momo", n: "2 of 2", text: "Some animals have four stages in their life cycles. The young of these animals do not look like the adult.", keys: ["four", "stages", "young", "not", "look", "like", "adult"], size: 56, y: 225, footer: FOOT });

/* 13 · score hand, the moth (lizReveal: the score hand melts into the garden, ONE push-in onto the moth on the side of the lime plant's pot (the
   REVEAL spot, never the intro pillar); Pip's fun-fact panel: a moth caterpillar's silk cocoon (ff_cocoon), the silk (ff_silk)) */
SC.final = (t, s) => { const L = "a1301"; return finalScene(t, s, L, 1, [[s.t0, null, 1], [W(L, "two") - .1, null, 2]]); };
SC.liz = (t, s) => { const L = "a1302", tq = W(L, "it") - .1;
  return lizReveal(t, s, L, limePH(t, MOTH_R), MOTH_R[0], MOTH_R[1], tq, "It was on the side of the lime plant's pot!", -120, 160, 80, 1.9, { from: () => SC.final(SCN.final.t1 - .04, SCN.final), tell: "a1304",
    fact: { id: "a1303", at: [1300, 560], w: 960, h: 420, items: FF([["ff_cocoon", "a silk cocoon", "DRAW: a moth caterpillar's soft white silk cocoon on a twig (cute, cosy), a small cut-away: a pupa inside"], ["ff_silk", "silk", "DRAW: a silkworm moth's cocoon beside a silk scarf"]]) } }) + smallPrint(t, s.t0 + .5, MOTH_RULE); };

/* 14 · the cliffhanger: an old pail of rainwater at the garden's far corner (pail); tiny things wriggle up and down in it (wrig), a ?; PART 2 */
SC.cliff = (t, s) => { const tP = W("a1402", "part") - .1; return phScene(t, s, "14 · The cliffhanger: something wriggling in a pail of rainwater", ["The garden's far corner by the tap: MK pail: an old plastic PAIL full of rainwater (a few leaves floating, the surface flat and still); MK wrig: tiny thin dark things wriggle down and up in it (drawn simply, not scary); a ? pops. Basil big at the left, leaning over the pail (surprised at wrig, then thinking after his question); Momo and Pip at the right, leaning in (back views). The moth is not shown (revealed). Full staging: SCENES_TODO.md."])
  + qMark(t, MK("wrig") + .2, 1300, 520) + smallPrint(t, MK("pail"), PAIL_RULE) + (t >= tP ? slamFit(330, "PART 2", P.sun, slamK(t - tP, 0)) : "") + HUD(t); };
/* 15 · "Now you know!": the butterfly loop board at its home, centred between the buddies (Stage 2: draw it; a placeholder card now) */
SC.nyk = (t, s) => nykScene(t, s, TF(960, 900, 1, `<rect x="-240" y="-180" width="480" height="300" rx="30" fill="#FFF8EA" opacity=".9"/>` + T(0, -20, "our butterfly's life cycle", 36, P.ink) + T(0, 30, "(Stage 2: the loop board)", 26, P.ink, { w: 500 })), { bx: [200, 1715, 1375], hx: 470 });
})(); }
