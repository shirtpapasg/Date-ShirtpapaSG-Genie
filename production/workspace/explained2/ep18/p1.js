// p1.js: PART 1, "Frog vs Mosquito: SAME or DIFFERENT? Count the Stages!": EP17's dare answered (no, they are different), how to compare
// (SIMILARITIES and DIFFERENCES: Momo's two similarities are real), be a raindrop (count the stages: the frog three, the mosquito four), the
// answer (OBSERVABLE CHARACTERISTICS; Mark Sentence 5.14), HOLD ON! (Pip: frog and grasshopper "exactly the same"), the young beside their
// parents (Mark Sentence 5.12), the cicada, the cliffhanger (the hen on her eggs: which came first?).
// Segments 1-13 of ../p3_ep18_script.md section 4 (version 1, 23 Nov 2026).
// STAGE 1 (setup): the shared routines are WIRED (the calm recap of EP17's dare with its two cards, the title slam, the game as ONE smooth
// push-in onto the cicada (common.js gameScene), the goals read by Momo, the countdown, Round 1's lock-in with the dare's TWO cards and the
// clue labels on top of the ring, the two Mark Sentences (Pip, Momo), the LOOK-CLOSER frames (lcPH inside the real lookCloser), the journey's
// tags, dot counters and riders, the score hand, the cicada's smooth reveal with its fun-fact panel, the read-along, "Now you know!"). Every
// scene with new art is a phScene placeholder. STAGE 2 (Fable) draws them: SCENES_TODO.md has the full staging per scene and line.
if (PART === 1) { (() => {
const L1 = "k501";
// the scores (script section 3): Round 1 1 : 0 (only Pip is right for the right reason: Basil's right card for the wrong reason scores
// nothing, so the Buddies do not score), HOLD ON! 2 : 0
SCORE.push([MK("coin1") - .1, 1, 0]);
SCORE.push([W("k1003", "one") - .1, 2, 0]);
const FOOT = "P3 · Life Cycles of Animals · Comparing life cycles";
const ph = (title, ...notes) => (t, s) => phScene(t, s, title, notes.concat(["Full staging: SCENES_TODO.md."])) + HUD(t);
// EP17's two dare cards (ep17dare.js: plain numbered cards until EP17's card art is copied in at Stage 2)
const dareCard = (i, o = {}) => ansCard(i + 1, DARE_CARDS[i], { w: 430, h: 290, size: 50, icon: darePic(i, o.t || 0) || undefined, ...o });
const qMark = (t, t0, x, y, r = 50) => t < t0 ? "" : TF(x, y, spring(t, t0, .5) * (1 + .05 * Math.sin(t * 4)), `<g filter="url(#dropS)"><circle r="${r}" fill="url(#gSun)"/></g>${T(0, r * .52, "?", r * 1.56, P.ink)}`);
const slamFit = (y, txt, col, k) => slamLine(y, txt, Math.min(170, 170 * 1720 / tw(txt, 170, 700, "Fredoka", 4)), col, k);

/* 1 · silent cold open: the void deck on LIFE CYCLE DAY (the frog loop and the mosquito loop slide into the COMPARE FRAME; EP17's two dare
   cards slide in low along the stone table: WIRED) */
const CBX = [760, 1160];
SC.cold = (t, s) => phScene(t, s, "1 · Cold open: LIFE CYCLE DAY at the void deck (no voice)", ["Our block's VOID DECK on a Saturday morning beside the community garden: stone tables, letterboxes, a fan turning, the RAIN TREE just outside. The LIFE CYCLE DAY board fills most of the frame: a big cork board on two easels, a hand-made banner, every loop card from EP14 to EP17 (mango, frog, chicken, grasshopper, cockroach, butterfly, mosquito; curved arrows, no numbers), the COMPARE FRAME in the middle (two windows; a green SAME strip and an orange DIFFERENT strip, empty).",
  "MK loopsIn: the frog loop and the mosquito loop slide into the two windows. MK cardsIn: EP17's two dare cards slide in low along the table (wired). MK budsIn: Momo (waving hello), Basil, Pip pop in, big. Location pill: A void deck, Singapore · Saturday morning. The cicada on the rain tree's trunk (before the game). Full staging: SCENES_TODO.md."])
  + [0, 1].map((i) => { const t0 = MK("cardsIn") + i * .3; if (t < t0) return ""; const [x, d] = slideX(t, t0, .7, 2500, CBX[i], 990); return d + TF(x, 900, .5, dareCard(i, { t })); }).join("");

/* 2 · "Last time...": EP17's dare, word for word. ONE calm picture: the two dare cards side by side, a gentle push-in, the big ?, each card
   steps forward and lights while Heart says it (>= 2.5 s each). WIRED */
SC.lasttime = (t, s) => { const L = "k203", tc = [W(L, "one"), W(L, "two")], z = 1 + .04 * eio((t - s.t0) / 8), k = ramp(t, s.t0 + .05, .5), cur = tc.filter((x) => t >= x - .15).length - 1;
  let cards = ""; [0, 1].forEach((i) => { const fw = cur === i ? ss(tc[i] - .15, tc[i] + .25, t) : (cur > i ? 1 - ss(tc[i + 1] - .15, tc[i + 1] + .25, t) : 0);
    cards += TF(700 + i * 520, 600 + 14 * (1 - spring(t, s.t0 + .2 + i * .15, .45)), 1.15 * (1 + .1 * fw), dareCard(i, { t, pulse: cur === i ? .9 : pulse(t, tc[i], .04, .9) })); });
  return bg("stage2") + OP(ramp(t, s.t0, .3), T(960, 110, "Last time…", 60, "#fff", { w: 600 }))
    + OP(k, `<g transform="translate(960 540) scale(${n2(z)}) translate(-960 -540)">${cards}</g>`
      + qMark(t, W("k202", "are") - .1, 960, 260)
      + TF(960, 1000, spring(t, W("k202", "are") - .1, .4), tpill(0, 0, DARE_LABEL, 40, P.sun, P.ink, { w: 700 }))) + HUD(t); };
SC.back = (t, s) => phScene(t, s, "2 · Back at the void deck: the COMPARE FRAME", ["The void deck (the cold open's set): a slow drift along the LIFE CYCLE DAY board to the COMPARE FRAME; EP17's two cards along the table (wired), the buddies big: Pip hides two fingers behind his back, Basil a secret fist, Momo a big sure smile. Pill: Hold on to your answer! (wired). The cicada still on the rain tree's trunk (before the game). Full staging: SCENES_TODO.md."])
  + [0, 1].map((i) => TF(CBX[i], 900, .5, dareCard(i, { t }))).join("")
  + (t >= LT("k204") - .1 ? TF(960, 700, spring(t, LT("k204") - .1, .4), tpill(0, 0, "Hold on to your answer!", 40, P.sun, P.ink, { w: 700 })) : "");
// the title slam over the dimmed void deck: SAME OR DIFFERENT? (white) then FROG VS MOSQUITO (sun yellow). WIRED
const TITLE = (k1, k2) => slamFit(400, "SAME OR DIFFERENT?", "#fff", k1) + slamFit(610, "FROG VS MOSQUITO", P.sun, k2);
SC.title = (t, s) => { const u = t - MK("title"), dim = clamp(u / .2); return lcSet(t, s, "back") + `<rect width="1920" height="1080" fill="${P.night}" opacity="${n2(.78 * dim)}"/>` + TITLE(slamK(u, .05), slamK(u, .55)) + HUD(t); };

/* 3 · the game, and the hidden cicada: ONE smooth push-in from the (dimmed) void deck straight onto the cicada on the rain tree's trunk
   (common.js gameScene). Stage 2: R.world = the drawn void deck, A = the cicada's spot in it (the INTRO spot: never used again). WIRED */
SC.game = (t, s) => gameScene(t, s, ["k301a", "k301b", "k301r"], false, { world: (tt) => deckPH(tt), A: CICADA, T: [1400, 470], Z: 2.4, dim0: .78, ly: -150, qx: 1730, qy: 430, pre: () => TITLE(1, 1) }) + smallPrint(t, LT("k301r"), LOOK_RULE);
SC.goals = (t, s) => goals3(t, s, [["How to compare", ""], ["Count the stages", ""], ["Look at the young", ""]], ["k401", "k402", "k403", "k404"], "momo");

/* 5 · Round 1: EP17's dare (a short 3 s ring). EP17's two cards as the ONE set of numbered picture cards; the clue labels eggs in water ·
   young unlike the adult ON TOP of the ring; the ring's picture: the frog loop and the mosquito loop side by side (ringPH: Stage 2 draws
   it). Basil leads (thinking after the question, worried through the countdown: lockN) */
SC.r1 = (t, s) => lockN(t, { cards: DARE_CARDS, clues: DARE_CLUES.map((c, i) => [c, W(L1, "same") + .15 * i]), lead: "basil", csize: 44, q: DARE_LABEL, tq: W(L1, "are") - .1,
  tc: [W(L1, "are"), W(L1, "show")], ring0: MK("ring0_r1"), dur: 3, lock: "k502",
  pics: [0, 1].map((i) => darePic(i)),
  obj: ringPH("the frog loop and the mosquito loop side by side, big (three tiles, four tiles; curved arrows, no numbers)"),
  picks: [{ who: "momo", id: "k503", word: "1" }, { who: "basil", id: "k504", word: "2" }, { who: "pip", id: "k505", word: "2" }] });

/* 6 · Momo's question at the board (she found two things the same), then [LOOK CLOSER] the COMPARE FRAME: SIMILARITIES and DIFFERENCES pop
   inside (lib.js o.at); Basil teaches them; Momo's two similarities tick onto the SAME strip; the count begins */
SC.board = ph("6 · \"But I found two things that are the same!\" (Momo at the board)", "The void deck: the COMPARE FRAME at its HOME (the centre of the LIFE CYCLE DAY board, about 55% of the frame high: the same in lccompare, answer, mark1, nyk and Part 2's recap). Momo big at the left (h ~520) by the board (talking, then thinking: her real question); Pip and Basil at the right (listening). Push in on the frame as Momo speaks. The cicada on a void deck pillar (new spot).");
SC.lccompare = (t, s) => lcPH(t, s, { title: "The COMPARE FRAME: what is the same, what is different", v: "v_compare", verdict: [`SAME AND DIFFERENT: LOOK FOR BOTH`, GOODC], fx: 960, fy: 560,
  beats: [["frame", "push in: the two loops fill the panel"], ["kw_similarities", "SIMILARITIES pops (green, on the SAME strip's label)"], ["kw_differences", "DIFFERENCES pops (orange, on the DIFFERENT strip's label)"], ["same1", "a water drop joins the two egg tiles: chip eggs in water lands on SAME"], ["same2", "tadpole and wriggler light beside their adults (orange ≠): chip young unlike the adult lands on SAME"], ["count", "a pointer stands ready at the frog's first tile"], ["v_compare", "verdict"]],
  notes: ["The COMPARE FRAME FILLS the panel: LEFT the frog loop (eggs in jelly · a tadpole · a frog), RIGHT the mosquito loop (eggs on still water · a wriggler · a pupa · a mosquito), both big, drawn in the same style, curved arrows all one way, NO numbers; under them the green SAME strip and the orange DIFFERENT strip.",
    "Each named part gets its own push-in and a big label. A buddy's FACE peeks in from a lower corner: Momo (thinking: her pick is tested; later surprised, then a happy smile: her two similarities are real), Basil (teaching the two words, pointing at the strips)."],
  over: (tt) => cmpChip(tt, MKS("same1"), 520, 980, 0, "eggs in water") + cmpChip(tt, MKS("same2"), 900, 980, 0, "young unlike the adult") });

/* 7 · BE A RAINDROP (the journey; the buddies ride along on a floating leaf: common.js riders). Two dot counters (three, four), never
   stage numbers on a loop */
SC.waitw = ph("7 · Be a raindrop! (the glide up into the rain)", "Pill Be a raindrop! A soft rain shower starts over the garden; the camera glides up into the grey sky and falls with the rain. The buddies wave the viewer off (goodbye), then shrink (a pop each) and follow. The shelf slides aside. The cicada on the low wall of a planter bed as the camera passes (new spot).");
const dotN = (t, marks) => marks.filter((m) => t >= MKS(m)).length;
SC.shrink = (t, s) => phScene(t, s, "7 · BE A RAINDROP (first person, present tense)", ["MK jpond: YOU are a raindrop falling into the garden pond, right beside a clump of FROG EGGS in jelly (ripples spread). MK jtadpole: tadpoles wriggle out (speeded up). The tadpole grows legs, the tail shrinks; MK jfrog: a frog climbs onto a lily pad. MK jsplash: a splash lifts you out across the path into a FLOWER-POT PLATE of still water: tiny mosquito eggs on the surface. MK jwrig: wrigglers hang from the surface. MK jpupa: each curls into a comma-shaped pupa (one more stage!). MK jmosq: a mosquito climbs out and flies (small, not scary).",
  "The three buddies ride along, shrunk, on a floating leaf at the lower edges (riders): Pip counts on his fingers. Calm pad, Heart soft. The dot counters are WIRED (frog: three; mosquito: four, the third dot glows). Full staging: SCENES_TODO.md."])
  + youTag(t, MK("jpond"), "You: a raindrop") + speeded(t, MK("jtadpole"), MK("jmosq") + 2)
  + (t >= MK("jpond") && t < MK("jsplash") + .4 ? TF(1650, 230, spring(t, MK("jpond"), .4), tpill(0, -70, "the frog", 32, P.ink, "#fff", { w: 700 }) + dots(0, 0, 3, dotN(t, ["jpond", "jtadpole", "jfrog"]))) : "")
  + (t >= MK("jsplash") ? TF(1650, 230, spring(t, MK("jsplash"), .4), tpill(0, -70, "the mosquito", 32, P.ink, "#fff", { w: 700 }) + dots(0, 0, 4, dotN(t, ["jsplash", "jwrig", "jpupa", "jmosq"]), t >= MK("jpupa") && t < MK("jmosq") ? 2 : -1)) : "")
  + feelTag(t, MK("jfrog"), MK("jsplash") - .1, "three stages", 160) + feelTag(t, MK("jpupa"), MK("jmosq") - .1, "one more stage!", 160) + feelTag(t, MK("jmosq") + .3, MK("jmosq") + 3.5, "four stages", 160)
  + riders(t, s, { tin: MK("jpond") + .6, h: 200, at: { pip: [200, 1044], basil: [1720, 1050], momo: [380, 1040] } });
SC.pullout = ph("7 · Pull back out to the garden", "Whoosh out to the garden, normal size (0.6 s): the frog on its lily pad; the plate on the path. The buddies pop back (a hop each).");

/* 8 · the answer: two, different. Only Pip (right for the right reason) explains; Basil's right card for the wrong reason scores nothing;
   OBSERVABLE CHARACTERISTICS pops (lib.js o.at); Pip teaches it; Mark Sentence 1 (Pip, 5.14). WIRED: the cards small, the tick, the dots */
SC.answer = (t, s) => ph("8 · The answer is two: they are different (OBSERVABLE CHARACTERISTICS)", "The void deck: the COMPARE FRAME at its home, the two dot counters beside the loops (MK three ●●● under the frog, MK four ●●●● under the mosquito, the pupa tile glows); EP17's two cards small along the top (wired): card 2 the green tick at ansglow; an x chip on card 1 by Momo; a small ? chip by Basil (right card, wrong reason); the coin at coin1 (only YOU score). A chip the number of stages lands on the DIFFERENT strip. OBSERVABLE CHARACTERISTICS pops on Heart's term with two small icons: an eye (see it) and 1-2-3 (count it). Pip big at the right (h ~520) by the counters; Basil big at the left; Momo mid-ground. The cicada on the side of the letterboxes (new spot).")(t, s)
  + [0, 1].map((i) => TF(800 + i * 320, 170, .3, dareCard(i, { t, lit: i === 1 && t >= MK("ansglow") ? 1 : 0 }))).join("")
  + (t >= MK("three") ? TF(700, 760, spring(t, MK("three"), .4), dots(0, 0, 3, 3)) : "") + (t >= MK("four") ? TF(1220, 760, spring(t, MK("four"), .4), dots(0, 0, 4, 4, 2)) : "")
  + cmpChip(t, MKS("four") + .6, 960, 860, 1, "the number of stages");
SC.mark1 = (t, s) => markScene(t, s, { id: "k902", sayId: "k901", who: "pip", n: "1 of 2", text: "The life cycles of the frog and the mosquito are similar because the young do not look like the adults. However, the life cycles are different because the frog has three stages in its life cycle, while the mosquito has four stages in its life cycle.", keys: ["similar", "young", "look", "adults", "different", "three", "four", "stages"], size: 44, y: 215, footer: FOOT });

/* 9 · HOLD ON! Pip: "the frog and the grasshopper are exactly the same" (Stage 2: model ../ep16/p1.js SC.holdon: the HOLD ON! stamp, the
   YOU ring 5 s with crossed arms, the clue labels 3 stages and 3 stages · the same? ON TOP of the ring, the bell, the coin; then the empty
   orange chip the young? on Pip's sheet) */
SC.holdon = ph("9 · HOLD ON! Pip: \"exactly the same!\"", "MK pipboard: Pip's own sheet on a low easel: the frog loop and the grasshopper loop side by side, a big = between them and his title THE SAME!; under it one green chip 3 stages. The HOLD ON! stamp; the YOU ring (5 s, crossed arms) big and central with Pip's sheet as its picture and the clue labels 3 stages and 3 stages · the same? on top; only Pip at the side (thinking: Heart's line is a question to him; Pip has no worried painting). After the bell: an empty orange chip the young? pops on his sheet beside the =. Basil big at the right for his fix (pointing at the empty chip). The cicada on top of Pip's easel (new spot); not in the ring.");

/* 10 · [LOOK CLOSER] the young beside their parents: the tadpole and the frog; the nymph and the grasshopper; Mark Sentence 2 (Momo, 5.12) */
SC.lcyoung = (t, s) => lcPH(t, s, { title: "The young beside their parents", v: "v_young", verdict: [`ONE SAME, ONE DIFFERENT`, GOODC], fx: 960, fy: 600,
  beats: [["tad", "LEFT: a tadpole beside a frog: a tail · no legs · in water; orange ≠ looks nothing like the adult"], ["nymph", "RIGHT: a nymph beside a grasshopper: six legs · two feelers (joined to BOTH), green =, dashed no wings yet"], ["same3", "across the top: green chip both: 3 stages"], ["diff3", "across the bottom: orange chip the young: different"], ["v_young", "verdict"]],
  notes: ["Two halves, both BIG, the same layout: LEFT the frog's young beside its parent (a tadpole: round body, long tail, no legs, in water; a frog), labels a tail · no legs · in water, an orange ≠ between them (looks nothing like the adult). RIGHT a grasshopper nymph (six legs, two feelers, big back legs, NO wings) beside an adult with long wings, labels six legs · two feelers joined to BOTH, a green = (looks like the adult) and a dashed outline no wings yet.",
    "A buddy's FACE peeks in from a lower corner: Pip first (thinking: his rule is tested), Momo (talking, pointing at the tadpole's tail), Basil (talking, pointing at the nymph's legs), Pip again (a slow nod: he sees what he missed)."],
  over: (tt) => cmpChip(tt, MKS("same3"), 960, 230, 0, "both: 3 stages") + cmpChip(tt, MKS("diff3"), 960, 980, 1, "the young: different") });
SC.mark2 = (t, s) => markScene(t, s, { id: "k1107", sayId: "k1106", who: "momo", n: "2 of 2", text: "When we compare, we can use observable characteristics to identify similarities and differences between the life cycles of the animals.", keys: ["compare", "observable", "characteristics", "similarities", "differences"], size: 54, y: 225, footer: FOOT });

/* 11 · score hand, the cicada (lizReveal: the score hand melts into the void deck, ONE push-in onto the cicada on the leg of the LIFE CYCLE
   DAY board's easel (the REVEAL spot, never the intro trunk); Basil's fun-fact panel: three stages like a grasshopper (ff_three), a nymph
   underground among tree roots (ff_under), seventeen years (ff_17)) */
SC.final = (t, s) => { const L = "k1201"; return finalScene(t, s, L, 0, [[s.t0, null, 1], [W(L, "two") - .1, null, 2]]); };
SC.liz = (t, s) => { const L = "k1202", tq = W(L, "it") - .1;
  return lizReveal(t, s, L, deckPH(t, CICADA_R), CICADA_R[0], CICADA_R[1], tq, "It was on the leg of our board's easel!", -120, 160, 80, 1.9, { from: () => SC.final(SCN.final.t1 - .04, SCN.final), tell: "k1204",
    fact: { id: "k1203b", at: [1300, 560], w: 960, h: 420, items: FF([["ff_three", "three stages, like a grasshopper", "DRAW: a small cicada loop (eggs on a twig · a nymph · an adult; curved arrows, no numbers) beside the grasshopper's loop"], ["ff_under", "a nymph underground", "DRAW: a cute cicada nymph underground among tree roots, big digging front legs"], ["ff_17", "seventeen years!", "DRAW: a calendar of seventeen little suns flipping, and a small map outline labelled America"]]) } }) + smallPrint(t, s.t0 + .5, LOOK_RULE); };

/* 12 · the cliffhanger: EP16's hen on her nest under a low bush by the garden (hen), three pale eggs show under her (nest), a ?; PART 2 */
SC.cliff = (t, s) => { const tP = W("k1302", "part") - .1; return phScene(t, s, "12 · The cliffhanger: the hen on her eggs", ["The garden's edge by the void deck: MK hen: EP16's brown HEN (red comb and wattles) sits on a nest of straw under a low bush; MK nest: she shifts and three pale EGGS show under her; a ? pops. Basil big at the left (h ~480 x .94), crouched, pointing at the nest; Momo and Pip at the right (back views: watching the nest). Camera: one push from Basil to the nest. Small print We watch from a distance (wired). Full staging: SCENES_TODO.md."])
  + qMark(t, MK("nest") + .2, 1300, 520) + smallPrint(t, MK("hen"), HEN_RULE) + (t >= tP ? slamFit(330, "PART 2", P.sun, slamK(t - tP, 0)) : "") + HUD(t); };
/* 13 · "Now you know!": the LIFE CYCLE DAY board with the COMPARE FRAME, centred between the buddies (Stage 2: draw it; a placeholder card now) */
SC.nyk = (t, s) => nykScene(t, s, TF(960, 900, 1, `<rect x="-240" y="-180" width="480" height="300" rx="30" fill="#FFF8EA" opacity=".9"/>` + T(0, -20, "LIFE CYCLE DAY board", 36, P.ink) + T(0, 30, "(Stage 2: the COMPARE FRAME)", 26, P.ink, { w: 500 })), { bx: [200, 1715, 1375], hx: 470 });
})(); }
