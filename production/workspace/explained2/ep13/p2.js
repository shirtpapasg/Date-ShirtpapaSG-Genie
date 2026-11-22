// p2.js: PART 2, "We TESTED Our New Strap. Then We Designed a ZOO Home!": test your design, design a zoo home, keep the great variety.
// Segments 1-15 of p3_ep13_script.md (version 1, 21 Nov 2026; the teacher's go-ahead in its section 12).
// STAGE 1 (setup): the shared routines are wired (the calm three-picture recap with its labels, game, goals read by Momo, round card, the
// lock-in with its three clue labels on top of the ring, the test's two counters (WEIGHTS: 5 held, WEIGHTS: n counting ON each weight's mark),
// Mark Sentences read by Basil / Momo, the book's strip D3, the board OUR DESIGN PLAN as a functional placeholder (wiped and filled again for
// the goat home), the Showdown's ring, stamp and picks with Basil's zoo map as a functional placeholder (lines light as he reads; the dragonfly
// moves to a green line 4), the full zoo map (functional), chant, score hand, the EP14 dare cards, read-along, "Now you know!"); every scene
// with new art is a phScene placeholder (and each [LOOK CLOSER] an lcPH placeholder inside the real frame). STAGE 2 (Fable) draws them: see
// SCENES_TODO.md.
if (PART === 2) { (() => {
const L1 = "j401";
// the scores (script section 3): Round 1 1 : 1, Showdown 3 : 1
SCORE.push([W("j506", "one") - .1, 1, 1]);
SCORE.push([W("j907", "two") - .1, 3, 1]);
const FOOT = "P3 · Diversity · Theme closure";
const stageNote = (txt, y = 1000) => T(960, y, "(Stage 2: " + txt + ")", 24, "#fff", { w: 500 });
const qMark = (t, t0, x, y, r = 50) => t < t0 ? "" : TF(x, y, spring(t, t0, .5) * (1 + .05 * Math.sin(t * 4)), `<g filter="url(#dropS)"><circle r="${r}" fill="url(#gSun)"/></g>${T(0, r * .52, "?", r * 1.56, P.ink)}`);
const weightsRule = (t, t0 = -9) => smallPrint(t, t0, WEIGHTS_RULE);   // "An adult adds the weights." for the whole test (script segment 2)
// how many weights hang on the new strap now (each slides on AT its mark w1..w9; the counter clicks up there)
const nW = (t) => { let n = 0; for (let i = 1; i <= 9; i++) if (TL.marks["w" + i] !== undefined && t >= TL.marks["w" + i]) n = i; return n; };

/* 1 · "Last time...": three calm pictures from Part 1, one at a time, each >= 2.5 s, centred and large, a gentle push-in, one label each
   (switch on "Fabric" and "But": pic2, pic3). ENGINEERS, DESIGN and INTENDED USE are NOT put on Part 2's shelf: it holds only this part's words. */
SC.lasttime = (t, s) => { const tb = [s.t0, MK("pic2") - .2, MK("pic3") - .2], i = t >= tb[2] ? 2 : t >= tb[1] ? 1 : 0, labs = ["Our design: a school bag", "Fabric straps · a metal zip · a plastic base", "Will the new strap hold?"];
  const what = ["the finished drawing of the bag with its four label lines (Part 1's)", "the drawing with its sample tiles in place (fabric, metal zip, plastic base)", "the new strap with the big ? and the card THEN: TEST IT"];
  const z = 1 + .05 * eio((t - tb[i]) / 4), k = ramp(t, tb[i] + .05, .5);
  return bg("stage2") + OP(ramp(t, s.t0, .3), T(960, 110, "Last time…", 60, "#fff", { w: 600 }))
    + OP(k, `<g transform="translate(960 540) scale(${n2(z)}) translate(-960 -540)"><g filter="url(#drop)"><rect x="410" y="200" width="1100" height="640" rx="36" fill="url(#gPaper)"/></g>${tpill(960, 250, "PICTURE " + (i + 1) + " · STAGE 2: TO DRAW", 26, P.coral, "#fff", { w: 700 })}${wrap(what[i], 40, 960, 600).map((l, j) => T(960, 420 + j * 56, l, 40, P.ink, { w: 600 })).join("")}</g>`
      + (i === 2 ? qMark(t, tb[2] + .3, 960, 640) : "") + TF(960, 960, spring(t, tb[i] + .3, .4), tpill(0, 0, labs[i], 46, "#fff", P.ink, { w: 700 }))) + HUD(t); };

/* 2 · the new place (the school's eco-garden), the game and the hidden frog; 3 · goals (Momo reads) */
SC.place = (t, s) => phScene(t, s, "2 · The eco-garden of a primary school (no voice, 2 s)", ["Wide, bright: a shelter with a table and benches, planter boxes, a small pond with lily pads and water plants, the classroom block behind (the little FROG on a lily pad in the pond, blinking: every wide shot of the garden). On the table: EP9's stand with two straps hanging from it, a padded tray under them, a row of flat weights; the bag with its new strap; the board OUR DESIGN PLAN beside the table, five boxes ticked, with the card THEN: TEST IT.",
  "The buddies in their discs. Pill: The eco-garden of a primary school, Singapore. Small print upper left for the whole test: An adult adds the weights. (wired)."]) + weightsRule(t, s.t0 + .3);
SC.game = (t, s) => gameScene(t, s, "j201", false) + weightsRule(t);
SC.goals = (t, s) => goals3(t, s, [["Test your design", ""], ["Design a zoo home", ""], ["Keep the great variety", ""]], ["j301", "j302", "j303", "j304"], "momo");

/* 4 · Round 1: how many weights? (clue labels same length · same width · old strap: 5 on top of the ring, kept through the countdown) */
SC.r1card = (t, s) => roundCard(t, s, "ROUND 1");
const r1labels = (t) => { const tq = W(L1, "how") - .1; return t < tq ? "" : ["same length", "same width", "old strap: 5"].map((l, i) => TF(430 + (i - 1) * 175, 470 - RING_R - 14 - (i === 1 ? 50 : 0), spring(t, tq + i * .15, .4), tpill(0, 0, l, 26, "#fff", P.ink, { w: 700 }))).join(""); };
SC.r1 = (t, s) => lockN(t, { cards: ["Fewer than five", "Five", "More than five"], labels: r1labels, q: "How many weights will the new strap hold?", tq: W(L1, "how") - .1, tc: [W(L1, "one", 1), W(L1, "two"), W(L1, "three")], ring0: MK("ring0_r1"), dur: 6, lock: "j402",
  obj: ringPH("old strap (torn, 5) · new strap (0)"), pre: (tt) => weightsRule(tt),
  picks: [{ who: "momo", id: "j403", word: "2", x: true }, { who: "basil", id: "j404", word: "3" }, { who: "pip", id: "j405", word: "3" }],
  react: [[LE("j403") + .1, "momo", "thinking"], [LE("j404") + .1, "basil", "cheer"], [LE("j405") + .1, "pip", "pointing"]] });

/* 5 · [LOOK CLOSER] the test: the old strap's held picture (torn, WEIGHTS: 5) and the new strap, live: a gloved hand slides a weight on AT each
   number (w1..w9); the counters are wired (lower left inside the window); TEST pops on "test" (lib.js o.at); the verdict; testtick */
SC.lctest = (t, s) => { const n = nW(t), ck = n ? pulse(t, MK("w" + n), .02, .3) : 0, lk = pulse(t, MK("link5") - .2, .05, 1.2);
  return lcPH(t, s, { title: "The test: the old strap (5, a held picture) and the new strap (live: 1 to 9)", v: "v_test", verdict: [`TESTED: THE NEW STRAP IS STRONGER`, GOODC], fx: 960, fy: 560,
    setNote: "the eco-garden table: EP9's stand with the two straps, the padded tray, the row of flat weights (the look-closer zooms in from here)",
    beats: [["rulerL", "ruler line: same length"], ["rulerW", "second mark: same width"], ["w1", "weight 1"], ["w2", "2"], ["w3", "3"], ["w4", "4"], ["w5", "5"], ["link5", "a line to the old strap's 5: both pulse"], ["w6", "6"], ["w7", "7"], ["w8", "8"], ["w9", "9"], ["lens9", "magnifier: the weave whole"], ["side", "old strap: 5 · new strap: 9"], ["kw_test", "TEST pops"], ["v_test", "verdict"], ["testtick", "a tick on THEN: TEST IT"]],
    notes: ["The two straps fill the window side by side; the garden dims. Left: the held picture of the old strap (tag before the video): thin and worn, torn across just under the clamp, its counter WEIGHTS: 5. Right: the new strap (Part 1's woven fabric strap), live, hanging straight, its hanger empty. MK rulerL a faint ruler line across the tops and bottoms (same length); MK rulerW a second mark (same width).",
      "An adult's gloved hand slides flat weights onto the new strap's hanger, one at a time, low over the padded tray, each AT its mark w1..w9 (a tok and a counter click; the counter is wired). MK link5: a plain line runs across to the old strap's counter and both pills pulse. The new strap tight and straight; MK lens9 a magnifier ring on its weave: whole; the hand stops and opens, empty. Labels 9 weights · no tear. NOTHING tears on screen.",
      "MK side: before and after side by side: old strap: 5 · new strap: 9. TEST pops (wired). Verdict TESTED: THE NEW STRAP IS STRONGER (green) at v_test; MK testtick: a tick lands on the card THEN: TEST IT (beside the window, or on a small board). Small print for the whole test: An adult adds the weights. (wired)."],
    over: (tt) => weightsRule(tt) + TF(330, 750, 1, weightsPill(5, lk)) + T(330, 712, "old strap (held picture)", 22, P.ink, { w: 600 }) + TF(330, 840, 1, weightsPill(n, Math.max(ck, lk))) + T(330, 802, "new strap", 22, P.ink, { w: 600 }) }); };
/* the answer is three: more than five; Momo surprised, then a nod; coin. WIRED with the cards */
SC.testans = (t, s) => { const L = "j506", tA = W(L, "three") - .1, tOne = W(L, "one") - .1;
  return bg("stage2") + stageNote("the eco-garden behind; the stand with the new strap and its nine weights", 120)
    + ["Fewer than five", "Five", "More than five"].map((c, i) => TF(760 + i * 300, 420, .5 * spring(t, s.t0 + .1 + i * .08, .4), ansCard(i + 1, c, { w: 430, h: 290, size: 52, lit: i === 2 && t >= tA ? spring(t, tA, .45) : 0 }))).join("")
    + coin(t, tOne, 1690, 300, "+1", "if you showed three fingers")
    + buddy("momo", 330, 1060, 300, t, { aura: true, in: s.t0 + .1, poses: [[s.t0, "surprised"], [tA + 1, "sit"]], jump: [[tA + 1.2, 20]] }) + weightsRule(t) + HUD(t); };

/* 6 · BE THE NEW STRAP (the first-person journey) */
SC.waitw = (t, s) => phScene(t, s, "6 · Be the new strap! (the glide in)", ["Pill Be the new strap! The camera glides up the stand to the clamp and into the weave of the strap; a soft cream wipe at the scene end. The shelf slides aside (SHELF_HIDE)."]) + weightsRule(t);
SC.shrink = (t, s) => phScene(t, s, "6 · BE THE NEW STRAP (first person, present tense)", ["MK jhang: you look down your own woven length, like a long orange road going straight down, to the hanger far below; the garden small and far; the pond glints. Tags You: the new strap · hanging from the stand. MK jpull / jw1 (\"weight\"): a weight slides onto the hanger, large and round (a soft deep tok); the view dips a tiny bit and the weave beside you draws tight; MK jw2 (\"another\"): another. MK jtight: tag pulled tight.",
  "MK jcount: four more, one after another, each AT its mark jw6, jw7, jw8, jw9 (\"Six. Seven. Eight. Nine!\"), each number rising past you: 6 · 7 · 8 · 9. The view holds, steady. Tags 9 weights · you do not tear. MK strongchip (\"strong\"): the chip STRONG glows over the view. Calm pad; Heart soft; no game sounds."]);

/* 7 · the plan again: a goat home. The board OUR DESIGN PLAN is wiped (the bag's five tiles hop off: wipe) and filled again (zfill1..zfill4,
   zglow5; functional placeholder); a small picture card of three goats stands by the board (goatcard) */
SC.zooplan = (t, s) => phScene(t, s, "7 · The same plan, for a zoo!", ["Pull back out to the garden. MK wipe: on the board OUR DESIGN PLAN the five tiles of the school bag hop off; the boxes are empty again (wired below). MK goatcard (\"goats\"): a small picture card of three goats stands by the board (a goat's small meh). MK zfill1 (\"keep\"): the first box fills: keep the goats safe; visitors can see them. MK zfill2, zfill3, zfill4: the next three fill quickly, without a word: fence · shelter · gate · water trough / fence: must not break; we can see through / a small drawing of the pen.",
  "MK zglow5: the last box, CHOOSE MATERIALS, glows, and a big ? sits on the drawing's fence."])
  + TF(1080, 1066, .42, planBoard(t)) + (t >= MK("goatcard") ? TF(330, 640, spring(t, MK("goatcard"), .45), `<rect x="-170" y="-120" width="340" height="240" rx="20" fill="#FFF8EA" stroke="#E3C9A8" stroke-width="6"/>` + T(0, 10, "three goats", 30, P.ink)) : "");
/* [LOOK CLOSER] a goat home at a zoo in Singapore (a new place, unnamed): the goat pushes the wooden rail: no break; the goats seen between the rails */
SC.lcgoat = (t, s) => lcPH(t, s, { title: "A goat home at the zoo: the wooden fence", v: "v_goat", verdict: [`THE FENCE: WOOD · <tspan fill="#fff">STRONG</tspan>`, GOODC, { plain: "THE FENCE: WOOD · STRONG" }], fx: 960, fy: 600,
  setNote: "a NEW place, held for the whole moment: a goat pen at a zoo, bright morning (location pill A zoo in Singapore, wired; no zoo name); the buddies are not here",
  beats: [["goatwalk", "a small goat walks up"], ["push1", "it pushes its side against the rail"], ["push2", "then its forehead: the rail does not move"], ["strongchip", "chip STRONG"], ["glide", "glide to the gap between two rails"], ["seegoats", "the three goats, hay, trough, shelter"], ["v_goat", "verdict"]],
  notes: ["A real petting-farm pen: a fence of smooth, rounded wooden rails on wooden posts with gaps between them, a small shelter with a roof, a heap of hay, a water trough, a gate with a latch, three small goats (true shapes: short coats, small horns, a beard on one, ears that flick). The camera pushes in on the fence until three rails fill most of the window; the rest dims. Small print for the whole moment: We look. We do not feed the goats. (wired).",
    "MK goatwalk: one small goat walks up (hooves on packed earth); MK push1 (\"pushes\"): it pushes its side against the middle rail, gently, the way goats rub (a soft wooden thunk); MK push2 (\"No\"): then its forehead: the rail does not move. Labels a wooden fence · the goat pushes · no break; MK strongchip: chip STRONG.",
    "MK glide: the camera glides to the gap between two rails and looks through; MK seegoats (\"see\"): the three goats, sharp and clear, their hay, their water trough, their shelter (a meh; hay rustling). Label we can see the goats. Verdict THE FENCE: WOOD · STRONG (green, with the chip STRONG) at v_goat. Nobody touches or feeds the goats."],
  over: (tt) => smallPrint(tt, s.t0 + 1.2, GOAT_RULE) + OP(ramp(tt, s.t0 + 1.4, .4), TF(1620, 1010, 1, tpill(0, 0, "A zoo in Singapore", 32, "#fff", P.ink, { w: 700 }))) });
/* back in the garden: the wood tile hops onto the last box (woodtile: five ticks); Basil: "Not glass!" with the picture card of the pen with a
   glass wall and the blue tag NOT FOR THIS JOB on it (glasstag). WIRED with the placeholder board and card */
SC.notglass = (t, s) => { const tg = MK("glasstag"), hb = HAS("j706");
  return bg("stage2") + stageNote("the eco-garden behind; the board OUR DESIGN PLAN on its stand", 120) + TF(1180, 1066, .42, planBoard(t))
    + (t >= tg - .4 ? TF(1300, 330, spring(t, tg - .4, .45), `<rect x="-200" y="-130" width="400" height="260" rx="20" fill="#FFF8EA" stroke="#E3C9A8" stroke-width="6"/>` + T(0, 0, "the pen with a glass wall", 26, P.ink) + (t >= tg ? TF(0, 100, spring(t, tg, .4), jobTag(t, 1, 22)) : "")) : "")
    + buddy("basil", 300, 1060, 280, t, { aura: true, in: s.t0 + .1, poses: [[s.t0, "sit"]], jump: hb ? [[LE("j706") + .05, 20]] : [] }) + (hb ? say("j706", 520, 600, t, { size: 40, tail: -120, maxW: 520 }) : "") + HUD(t); };

/* 8 · Mark Sentence 1 (Basil): 3.30 item 3, both sentences; under the card, small and silent: the chapter's map of p. 70 (chapterMap, placeholder) */
SC.mark1 = (t, s) => markScene(t, s, { id: "j802", sayId: "j801", who: "basil", n: "1 of 2", text: "The physical properties of a material allow it to be used in certain ways. It is important to choose a material whose physical property is suitable for the intended use of the object.", keys: ["physical", "properties", "property", "suitable", "intended", "use"], size: 54, y: 200, footer: FOOT,
  under: TF(1190, 1000, .82, chapterMap()) });

/* 9 · Showdown: Basil's zoo map (double points). WIRED: the easel MY ZOO as a functional placeholder (each line lights as Basil reads it; the
   three lines stay through the countdown), the YOU ring with a counting hand (6 s), LOCKED IN!, the picks Pip 2, Momo 2; Basil oops */
const mapLit = (t) => { const L = "j902", ws = ["one", "two", "three"].map((w) => TL.lines[L].words.some((x) => norm(x.w) === w) ? W(L, w) : 1e9), r0 = MK("ring0_show");
  return [0, 1, 2].map((i) => { const a = ws[i], b = i < 2 ? ws[i + 1] : LE(L); return t >= a - .1 && t < Math.min(b, LE(L) + .2) ? 1 : t >= r0 && t < MK("bell_show") ? .45 : 0; }); };
SC.show = (t, s) => { const r0 = MK("ring0_show"), bell = MK("bell_show"), rs = ringState(t, r0, 6), tS = LT("j904") - .08, R = [1600, 330];
  const picks = [["pip", "j905", "2", 960], ["momo", "j906", "2", 1320]];
  return bg("stage2") + stageNote("the eco-garden behind, dimmed; Basil's easel stands on the ground between the discs", 140) + TF(860, 900, .72, zooEasel(t, { lit: mapLit(t) }))
    + (t >= LT("j903") ? TF(R[0], R[1], spring(t, LT("j903"), .4), `<g transform="scale(.6)">${ringTimer(0, 0, t < r0 ? 1 : t < bell ? rs.frac : 0, t < r0 ? 6 : t < bell ? rs.secs : 0, t, { tick: rs.tick, shut: pulse(t, bell, .01, .6), inner: TF(0, 0, .85, `<g filter="url(#dropS)">${countHand(3)}</g>`) })}</g>` + youPill(-150, -130, .9)) : "")
    + buddy("basil", 230, 1060, 260, t, { aura: true, in: s.t0 + .1, poses: [[s.t0, "cheer"], [LT("j902") - .12, "sit"], [LE("j902") + .2, "cheer"], [LT("j905") - .1, "oops"]] }) + say("j902", 520, 330, t, { size: 36, tail: -220, maxW: 780 })
    + picks.map(([w, id, n, x]) => buddy(w, x + 300, 1060, 230, t, { aura: true, in: r0 - .3, poses: [[r0 - .3, "thinking"], [LT(id) - .12, "sit"], [LE(id) + .1, w === "pip" ? "pointing" : "cheer"]], flip: true }) + (t > r0 ? pickNum(w, x + 300 - 150, 900, t, LT(id) - .1, n) : "") + say(id, x + 100, 560, t, { size: 38, maxW: 520, tail: 140 })).join("")
    + stamp(t, tS, 960, 460) + bellIcon(t, r0) + HUD(t); };
/* the fix: the dragonfly's drawing hops down off line 2 onto a new fourth line written in green (dfly); +2; Basil surprised, then cheer (j908, cuttable "wings") */
SC.fix = (t, s) => { const d = MK("dfly"), fix = ss(d, d + .8, t), hb = HAS("j908");
  return bg("stage2") + TF(860, 900, .72, zooEasel(t, { fix, lit: [0, fix * .6, 0] })) + coin(t, W("j907", "two") - .1, 1700, 860, "+2", "line 2")
    + buddy("basil", 230, 1060, 260, t, { aura: true, in: s.t0 + .05, poses: [[s.t0, "surprised"], [hb ? LE("j908") + .2 : s.t0 + 3, "cheer"]] }) + (hb ? say("j908", 520, 330, t, { size: 40, tail: -220, maxW: 600 }) : "") + HUD(t); };

/* 10 · a great variety: the full zoo map (zones: six zones pop, functional placeholder); the question D3 on a cream strip; DIVERSITY pops (lib.js o.at) */
SC.zoomap = (t, s) => { const L = "j1002";
  return bg("stage2") + stageNote("the eco-garden behind; the full zoo map comes to the centre: six zones, two animals each, each with a small idle loop", 1062) + TF(960, 960, .72, zooMap(t, { pop: MK("zones") }))
    + bookCaption(t, L, "Why is it important to maintain diversity?", 220, { size: 50, keys: ["maintain", "diversity?"] }) + HUD(t); };
/* Mark Sentence 2 (Momo): 1.22; EXTINCT pops after the last word (lib.js o.at); under the card the zoo map (nothing disappears); on Heart's
   "So we take care of every kind." (j1005) a soft glow runs round all twelve animals (glowall) */
SC.mark2 = (t, s) => markScene(t, s, { id: "j1004", sayId: "j1003", who: "momo", n: "2 of 2", text: "Living things that are not able to survive will become extinct. This means that they will all die out.", keys: ["not", "able", "to", "survive", "extinct."], size: 60, y: 220, footer: FOOT,
  under: TF(1180, 1050, .3, zooMap(t, { glow: TL.marks.glowall !== undefined ? ss(MK("glowall") - .1, MK("glowall") + .5, t) : 0 })) });

/* 11 · the chant: call and response (common.js chantScene); the board OUR DESIGN PLAN behind the buddies, its parts flashing on their lines
   (planBoard({flash}), placeholder at the lower left; Stage 2: the drawn board, centred and big enough to read) */
SC.chant = (t, s) => chantScene(t, s, "c1003", { sayId: "u1002", size: 58, board: (tt, flash) => TF(250, 1066, .26, planBoard(tt, { flash, small: true })) });

/* 12 · score hand, the frog (lizReveal in common.js) */
SC.final = (t, s) => { const L = "j1201"; return finalScene(t, s, L, 1, [[s.t0, null, 1], [W(L, "three") - .1, null, 3]]); };
SC.liz = (t, s) => phScene(t, s, "12 · Did you spot the frog? (lizReveal in common.js)", ["A replay of the wide garden with a ring round the little frog on its lily pad; it blinks, puffs its throat and hops to the next lily pad. Pill: Tell someone at home! Use lizReveal(t, s, \"j1202\", view, x, y, tq, \"It was on the lily pad in the pond!\")."]);

/* 13 · the dare for Episode 14: the Sun. The three cards, the ?, the banner and "Lock in your answer!" are wired; Stage 2 draws the three boards */
const DRX = [560, 960, 1360];
SC.dare = (t, s) => { const a = "j1301", tQ = W(a, "why") - .15, tc = [W(a, "one") - .1, W(a, "two") - .1, W(a, "three") - .1], tL = W(a, "lock") - .1, hb = HAS("j1302");
  return phScene(t, s, "13 · The dare for Episode 14: why does the Sun come back?", ["The garden's light turns a little golden. Three picture boards slide in low and stand side by side, centred between the discs: the same HDB skyline three times at dusk, the Sun low: on the first the Sun slides away to one side; on the second a small Earth with a turning line round it; on the third a big cloud in front of the Sun. A big ? pops above them (wired). Banner (wired). Basil cheer, then a big yawn (sit) (j1302, cuttable last). An evening bird."])
    + NEXT_CARDS.map((txt, i) => TF(DRX[i], 690, .5 * spring(t, tc[i], .45), ansCard(i + 1, txt, { w: 430, h: 290, size: 50, pulse: Math.max(pulse(t, tc[i], .04, .6), t >= tL ? (Math.floor((t - tL) / .5) % 3 === i ? .8 : 0) : 0) }))).join("")
    + TF(960, 150, spring(t, s.t0 + .2, .45), tpill(0, 0, "NEXT · Why does the Sun come back?", 50, P.ink, P.sun, { w: 700 }))
    + qMark(t, tQ, 960, 560, 44) + (t >= tL ? TF(1250, 470, spring(t, tL, .45), tpill(0, 0, "Lock in your answer!", 40, P.sun, P.ink, { w: 700 })) : "")
    + buddy("basil", 200, 1060, 230, t, { aura: true, in: s.t0 + .1, poses: hb ? [[s.t0, "cheer"], [LT("j1302") - .12, "sit"]] : [[s.t0, "sit"], [tL, "cheer"]], nohop: true }) + (hb ? say("j1302", 520, 950, t, { size: 38, tail: -160, maxW: 480 }) : ""); };

/* 15 · "Now you know!": the board OUR DESIGN PLAN, complete and ticked, with the ticked card THEN: TEST IT, centred between the buddies */
SC.nyk = (t, s) => nykScene(t, s, TF(860, 1040, .4, planBoard(t)), { bx: [200, 1715, 1375], hx: 470 });
})(); }
