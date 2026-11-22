// p2.js: PART 2, "The Boy GREW. The Tree GREW. Why Not the TEDDY BEAR?": cycles in living things, what a life cycle is, why life cycles
// matter. Segments 1-15 of p3_ep14_script.md (version 1, 22 Nov 2026; the teacher's go-ahead and the 22 Nov full-sentence change in section 12).
// STAGE 1 (setup): the shared routines are wired (the calm three-picture recap with its labels, the game as ONE smooth push-in from the garden
// onto the ladybird (common.js gameScene, EP12 v2), goals read by Basil, round card, the lock-in with its four clue labels on top of the ring,
// the answer, the book's strip C0.2, the board CYCLE CHECK as a functional placeholder (the chicken's three tiles, the last arrow back to the
// egg, two ticks, A CYCLE, A LIFE CYCLE; two closed rings side by side for the chant and the ending), Mark Sentences read by Basil / Momo (the
// tag ensure = make sure), the Showdown's ring, stamp and picks with Pip's notes as a functional placeholder (lines light as he reads; line 2
// struck through and rewritten in green), chant, score hand, the ladybird's smooth reveal, the EP15 dare cards and banner, read-along, "Now you
// know!"); every scene with new art is a phScene placeholder (and each [LOOK CLOSER] an lcPH placeholder inside the real frame). STAGE 2
// (Fable) draws them: see SCENES_TODO.md (what each buddy does, how the camera moves, the small life in the background and the light).
if (PART === 2) { (() => {
const L1 = "j401";
// the scores (script section 3): Round 1 1 : 1, Showdown 3 : 1
SCORE.push([MK("coin1") - .1, 1, 1]);
SCORE.push([W("j906", "two") - .1, 3, 1]);
const FOOT = "P3 · Cycles · Life cycles of plants and animals";
const stageNote = (txt, y = 1000) => T(960, y, "(Stage 2: " + txt + ")", 24, "#fff", { w: 500 });
const qMark = (t, t0, x, y, r = 50) => t < t0 ? "" : TF(x, y, spring(t, t0, .5) * (1 + .05 * Math.sin(t * 4)), `<g filter="url(#dropS)"><circle r="${r}" fill="url(#gSun)"/></g>${T(0, r * .52, "?", r * 1.56, P.ink)}`);
const henRule = (t, t0 = -9) => smallPrint(t, t0, HEN_RULE);   // "We look. We do not chase or touch the chickens." whenever the chickens are in the picture
const card = (x, y, txt, k = 1) => TF(x, y, k, `<g filter="url(#drop)"><rect x="-140" y="-120" width="280" height="240" rx="20" fill="#FFF8EA" stroke="#E3C9A8" stroke-width="6"/></g>` + T(0, 12, txt, 34, P.ink));

/* 1 · "Last time...": three calm pictures from Part 1, one at a time, each >= 2.5 s, centred and large, a gentle push-in, one label each
   (switch on "and" and "But": pic2, pic3). ROTATION, CYCLE and REPEATED PATTERN are NOT put on Part 2's shelf: it holds only this part's words. */
SC.lasttime = (t, s) => { const tb = [s.t0, MK("pic2") - .2, MK("pic3") - .2], i = t >= tb[2] ? 2 : t >= tb[1] ? 1 : 0, labs = ["Day and night: a cycle", "It repeats because the Earth turns", "Do living things have cycles too?"];
  const what = ["(the board's closed ring with the row of four small skies: bright, dark, bright, dark; wired: the functional board)", "the globe and the torch, the red dot in the light (Part 1's look-closer)", "the three picture cards: a hen, a chick, a teddy bear, with the big ?"];
  const z = 1 + .05 * eio((t - tb[i]) / 4), k = ramp(t, tb[i] + .05, .5);
  const pic = i === 0 ? TF(960, 860, .78, cycleBoard(t, { show: "daynight" })) : i === 2 ? ["a hen", "a chick", "a teddy bear"].map((c, j) => card(640 + j * 320, 560, c, .95)).join("") + qMark(t, tb[2] + .3, 960, 340)
    : `<g filter="url(#drop)"><rect x="410" y="200" width="1100" height="640" rx="36" fill="url(#gPaper)"/></g>${tpill(960, 250, "PICTURE 2 · STAGE 2: TO DRAW", 26, P.coral, "#fff", { w: 700 })}${wrap(what[1], 40, 960, 600).map((l, j) => T(960, 460 + j * 56, l, 40, P.ink, { w: 600 })).join("")}`;
  return bg("stage2") + OP(ramp(t, s.t0, .3), T(960, 110, "Last time…", 60, "#fff", { w: 600 }))
    + OP(k, `<g transform="translate(960 540) scale(${n2(z)}) translate(-960 -540)">${pic}</g>` + TF(960, 960, spring(t, tb[i] + .3, .4), tpill(0, 0, labs[i], 46, "#fff", P.ink, { w: 700 }))) + HUD(t); };

/* 2 · the new place (a community garden beside an HDB block), the game and the hidden ladybird (ONE smooth push-in from the garden onto the
   ladybird on its leaf, the place pill slipping away; common.js gameScene); 3 · goals (Basil reads) */
const placePill = () => TF(960, 1010, 1, tpill(0, 0, "A community garden, Singapore", 40, P.ink, "#fff", { w: 700 }));
SC.place = (t, s) => gardenPH(t) + OP(ramp(t, s.t0 + .3, .4), placePill()) + henRule(t, s.t0 + .3) + HUD(t);
SC.game = (t, s) => gameScene(t, s, "j201", false, { world: (tt) => gardenPH(tt), A: LADY, T: [1360, 500], Z: 2.6, ly: -190, pre: () => placePill() }) + henRule(t);
SC.goals = (t, s) => goals3(t, s, [["Cycles in living things", ""], ["What a life cycle is", ""], ["Why life cycles matter", ""]], ["j301", "j302", "j303", "j304"], "basil");

/* 4 · Round 1: which ones are bigger today? (four clue labels a boy · a young tree · a teddy bear · long ago on top of the ring, kept through
   the countdown); an adult's hand holds up the old photo (photo: Stage 2 draws it in the ring) */
SC.r1card = (t, s) => roundCard(t, s, "ROUND 1");
const r1labels = (t) => { const tq = W(L1, "today") - .1; return t < tq ? "" : ["a boy", "a young tree", "a teddy bear", "long ago"].map((l, i) => TF(430 + (i - 1.5) * 150, 470 - RING_R - 14 - (i % 2 ? 48 : 0), spring(t, tq + i * .12, .4), tpill(0, 0, l, 24, "#fff", P.ink, { w: 700 }))).join(""); };
SC.r1 = (t, s) => lockN(t, { cards: ["The boy and the tree", "All three", "Only the tree"], labels: r1labels, q: "Today, which ones are bigger?", tq: W(L1, "today") - .1, tc: [W(L1, "one", 1), W(L1, "two"), W(L1, "three", 1)], ring0: MK("ring0_r1"), dur: 6, lock: "j402",
  obj: ringPH("the old photo: Tree Planting Day (a hand holds it up)"),
  picks: [{ who: "momo", id: "j403", word: "2", x: true }, { who: "basil", id: "j404", word: "1" }, { who: "pip", id: "j405", word: "1" }],
  react: [[LE("j403") + .1, "momo", "cheer"], [LE("j404") + .1, "basil", "cheer"], [LE("j405") + .1, "pip", "pointing"]] });

/* 5 · [LOOK CLOSER] then and now: the old photo (THEN) and the same place today (NOW), side by side; three pairs light one after another, each
   with a faint height line; the two tags (wired at placeholder places: Stage 2 moves them onto the man, the tree, the teddy bear); GROW pops */
SC.lcthen = (t, s) => lcPH(t, s, { title: "Then and now: the same place, the same framing", v: "v_then", verdict: [`LIVING THINGS GROW OVER TIME`, GOODC], fx: 960, fy: 560,
  beats: [["thenpic", "THEN: the old photo (Tree Planting Day)"], ["nowpic", "NOW: the place today"], ["pair1", "the boy and the man light"], ["line1", "the height line rises: taller"], ["pair2", "the young tree and the tall tree"], ["line2", "the line rises steeply"], ["fruits", "label fruits"], ["pair3", "the teddy bear and the teddy bear"], ["line3", "the line is FLAT: the same size"], ["tagliving", "LIVING on the man and the tree"], ["kw_grow", "GROW pops"], ["tagnon", "NON-LIVING on the teddy bear"], ["v_then", "verdict"]],
  notes: ["The camera pushes in until two pictures fill the window, side by side, the same spot in the same framing (the garden dims and blurs; the buddies and the cards step back). Left, headed THEN: the old photo (a colour print, a little faded, a white border, the hand-written words Tree Planting Day): a boy of about nine seen from the side, a young tree as tall as he is, tied to a stake, a brown teddy bear sitting at its foot.",
    "Right, headed NOW: the same spot today: a man seen from the side, his hand on the trunk; the tree three storeys tall with a thick trunk and red fruits among the leaves (a rambutan tree; NOT named); the same teddy bear, a little worn, sitting on the garden bench. Three pairs light one after another (MK pair1, pair2, pair3), each with a faint height line from left to right: it rises (line1: taller), rises steeply (line2: taller · fruits), is flat (line3: the same size).",
    "Tags (EP1's, in EP1's colours; wired here at placeholder places): green LIVING on the man and on the tree (tagliving), blue NON-LIVING on the teddy bear (tagnon). Life: leaves move in the NOW picture; the photo is still (it is a photo). Sound: a soft rising note under the first two lines, a flat bup under the third (wired)."],
  over: (tt) => tagAt(tt, MK("tagliving"), 1220, 330, 0, "LIVING", 30) + tagAt(tt, MK("tagliving") + .2, 1520, 330, 0, "LIVING", 30) + tagAt(tt, MK("tagnon"), 1450, 760, 1, "NON-LIVING", 30) });
/* the answer is one: the boy and the tree; Momo surprised, then a nod; coin. WIRED with the cards */
SC.thenans = (t, s) => { const tA = MK("ansglow") - .1;
  return bg("stage2") + stageNote("the garden behind; the old photo and the place today, small, on a picture board", 120)
    + ["The boy and the tree", "All three", "Only the tree"].map((c, i) => TF(760 + i * 300, 420, .5 * spring(t, s.t0 + .1 + i * .08, .4), ansCard(i + 1, c, { w: 430, h: 290, size: 48, lit: i === 0 && t >= tA ? spring(t, tA, .45) : 0 }))).join("")
    + coin(t, MK("coin1") - .1, 1690, 300, "+1", "if you showed one finger")
    + buddy("momo", 330, 1060, 300, t, { aura: true, in: s.t0 + .1, poses: [[s.t0, "surprised"], [tA + 1, "sit"]], jump: [[tA + 1.2, 20]] }) + henRule(t) + HUD(t); };

/* 6 · [LOOK CLOSER] one chick, week after week (the week pill on its marks, wired); then chicks of its own; REPRODUCE pops; then the strip C0.2 */
SC.lcchick = (t, s) => lcPH(t, s, { title: "One chick, week after week: it grows, then it has young", v: "v_chick", verdict: [`IT GROWS · THEN IT HAS YOUNG`, GOODC], fx: 900, fy: 760,
  beats: [["wk1", "Week 1: small and downy; it pecks"], ["labsame", "label the same chick (the pale patch on its wing)"], ["wk6", "Week 6: feathers coming, long legs; it scratches"], ["wk12", "Week 12: a young bird; it stretches a wing"], ["wk24", "Week 24: an adult chicken; it shakes its feathers"], ["nestwalk", "she walks to the bush: a nest with four eggs"], ["settle", "she settles on the nest"], ["later3", "a soft dissolve: 3 weeks later"], ["chicksout", "she walks out, three chicks behind her"], ["labyoung", "labels the adult · its young"], ["kw_reproduce", "REPRODUCE pops"], ["v_chick", "verdict"]],
  notes: ["The camera glides low across the grass and pushes in slowly on ONE chick, the one with a pale patch on its wing, until it fills most of the window (the garden dims; the buddies step back). Four held pictures of the same chick in the same place, each a SOFT DISSOLVE from the one before (never a flicker), each AT its mark: wk1 small and downy, pecking; wk6 feathers coming, long legs, scratching the ground; wk12 a young bird stretching a wing (the pale patch); wk24 an adult chicken shaking its feathers. Labels the same chick · bigger · an adult chicken.",
    "Then the same adult walks to the bush (nestwalk): under it, a nest of dry leaves with four eggs; she settles (settle). Soft dissolve, the week pill 3 weeks later (later3): she walks out across the grass with three small chicks in a line behind her (chicksout); they peck where she pecks. Labels the adult · its young (labyoung). Nobody touches the nest. The free chickens of many estates (red junglefowl kind): the hen brown and plain, the chicks small, yellow-brown and striped.",
    "Wired: the week pill (lower left), speeded up, the small print We look. We do not chase or touch the chickens. Sound: cheeps that turn into low clucks, scratching on dry leaves, three thin cheeps."],
  over: (tt) => henRule(tt, s.t0 + 1.2) + stepPill(tt, WEEKS, 390, 905) + speeded(tt, MK("wk1") + .5, MK("chicksout") + 1, 1660, 905) });
SC.strip = (t, s) => { const L = "j605", txt = "Cycles in living things happen when living things grow and have young. Their life cycles follow a repeated pattern of change.";
  return bg("stage2") + stageNote("the garden behind; under the strip, small: the NOW picture and the hen with her chicks", 1040)
    + (HAS(L) ? [txt.split(". ")[0] + ".", txt.split(". ")[1]].map((p, i) => bookCaption(t, L, p, 330 + i * 120, { size: 44, off: i ? txt.split(". ")[0].split(" ").length : 0, keys: ["grow", "have", "young", "repeated", "pattern", "change"] })).join("")
      : OP(ramp(t, s.t0, .3), T(960, 360, txt, 36, "#fff", { w: 600 }))) + henRule(t) + HUD(t); };

/* 7 · BE A CHICK (the first-person journey). The tags are wired (shrink.js feelTag) on their marks */
SC.waitw = (t, s) => phScene(t, s, "7 · Be a chick! (the glide in)", ["Pill Be a chick! The camera glides to the nest under the bush and into one egg; a soft cream wipe at the scene end. The shelf slides aside (SHELF_HIDE)."]);
SC.shrink = (t, s) => { const e = S2 => MK(S2);
  return phScene(t, s, "7 · BE A CHICK (first person, present tense)", ["MK jegg: inside the egg: a warm orange-pink glow all round you; the curved shell very close (a soft slow heartbeat, the hen's clucks muffled). MK jhatch / jcrack (\"Crack!\"): a crack of white light, then another (a crisp crack each); MK jlight: the shell opens; MK jout: the garden, huge: grass blades like trees, the hen's feet, large and gentle, beside you.",
    "MK jgrow / jpeck (\"eat\"): you peck at the ground; MK jrise (\"grow\"): the view rises a little, then a little more, as the weeks go by (a small week pill 1, 6, 12, 24; speeded up): the grass is low now; you can see over the planter bed. MK jadult / jnest: your own nest of dry leaves, seen from above; you settle; MK jlay (\"egg\"): when you stand, there is an egg in it. MK jagain: the egg rocks; jtap1..jtap3: three small taps from inside; MK jnew: a crack: a new chick. Calm pad; no game sounds; nothing about how an egg comes to hold a chick."])
    + feelTag(t, e("jegg") + .3, e("jhatch") - .1, "You: a chick · inside an egg", 160) + feelTag(t, e("jout"), e("jgrow") - .1, "you hatch", 160) + feelTag(t, e("jrise"), e("jadult") - .1, "you grow", 160)
    + feelTag(t, e("jlay") - .1, e("jagain") - .1, "an adult chicken · an egg", 160) + feelTag(t, e("jnew"), e("jnew") + 2.4, "a new chick · again", 160); };

/* 8 · pull back out; the ring closes on the board CYCLE CHECK (tegg, tchick, tadult, tback, two ticks, A CYCLE + A LIFE CYCLE); LIFE CYCLE pops.
   WIRED with the placeholder board */
SC.pullout = (t, s) => phScene(t, s, "8 · Pull back out to the garden", ["Whoosh out of the egg, back to the garden (0.6 s)."]);
SC.ring = (t, s) => bg("stage2") + stageNote("the garden behind; the board on its low stand by the bench; the hen and her chicks far behind", 120) + TF(960, 1060, .78, cycleBoard(t))
  + buddy("pip", 230, 1060, 240, t, { aura: true, in: s.t0 + .1, poses: [[s.t0, "sit"], [MK("tback"), "surprised"], [MK("tagcycle"), "cheer"]] }) + buddy("basil", 1690, 1060, 240, t, { aura: true, flip: true, in: s.t0 + .15, poses: [[s.t0, "sit"], [MK("tagcycle"), "cheer"]], jump: [[MK("tagcycle"), 30]] })
  + buddy("momo", 1450, 1060, 200, t, { aura: true, flip: true, in: s.t0 + .2, poses: [[s.t0, "pointing"], [MK("tagcycle"), "cheer"]] }) + HUD(t);
/* Mark Sentence 1 (Basil): 4.2; under the card: the ring with its three tiles, the arrows going round */
SC.mark1 = (t, s) => markScene(t, s, { id: "j803", sayId: "j802", who: "basil", n: "1 of 2", text: "A life cycle is a repeated pattern of change as a living thing grows over time and reproduces.", keys: ["repeated", "pattern", "change", "grows", "over", "time", "reproduces"], size: 62, y: 240, footer: FOOT,
  under: TF(1180, 1060, .32, cycleBoard(t, { small: true })) });

/* 9 · Showdown: Pip's notes (double points). WIRED: the easel MY NOTES as a functional placeholder (each line lights as Pip reads it (line 2
   only when "notes13" is cut: lines one and three are then lit without being read); the three lines stay through the countdown), the YOU ring
   with a counting hand (6 s), LOCKED IN!, the picks Basil 2, Momo 2; Pip oops */
const noteLit = (t) => { const r0 = MK("ring0_show"), bell = MK("bell_show"), L = "j902", ks = ["l1", "l2", "l3"], has = ks.map((k) => TL.marks[k] !== undefined), ends = [MKS("l2"), MKS("l3") < 1e8 ? MKS("l3") : LE(L) + .2, LE(L) + .2];
  return [0, 1, 2].map((i) => { if (has[i] && t >= MK(ks[i]) - .1 && t < ends[i]) return 1; if (!has[i] && t >= LT(L) && t < bell) return .45; return t >= r0 && t < bell ? .45 : 0; }); };
SC.show = (t, s) => { const r0 = MK("ring0_show"), bell = MK("bell_show"), rs = ringState(t, r0, 6), tS = LT("j903") - .08, R = [1600, 330];
  const picks = [["basil", "j904", "2", 960], ["momo", "j905", "2", 1320]];
  return bg("stage2") + stageNote("the garden behind, dimmed; Pip's easel stands on the ground between the discs", 140) + TF(860, 900, .72, notesEasel(t, { lit: noteLit(t) }))
    + (t >= LT("j901") ? TF(R[0], R[1], spring(t, LT("j901"), .4), `<g transform="scale(.6)">${ringTimer(0, 0, t < r0 ? 1 : t < bell ? rs.frac : 0, t < r0 ? 6 : t < bell ? rs.secs : 0, t, { tick: rs.tick, shut: pulse(t, bell, .01, .6), inner: TF(0, 0, .85, `<g filter="url(#dropS)">${countHand(3)}</g>`) })}</g>` + youPill(-150, -130, .9)) : "")
    + buddy("pip", 230, 1060, 260, t, { aura: true, in: s.t0 + .1, poses: [[s.t0, "pointing"], [LT("j902") - .12, "sit"], [LE("j902") + .2, "thinking"], [LT("j904") - .1, "oops"]] }) + say("j902", 520, 330, t, { size: 36, tail: -220, maxW: 780 })
    + picks.map(([w, id, n, x]) => buddy(w, x + 300, 1060, 230, t, { aura: true, in: r0 - .3, poses: [[r0 - .3, w === "basil" ? "arms_crossed" : "thinking"], [LT(id) - .12, "sit"], [LE(id) + .1, "cheer"]], flip: true }) + (t > r0 ? pickNum(w, x + 300 - 150, 900, t, LT(id) - .1, n) : "") + say(id, x + 100, 560, t, { size: 38, maxW: 520, tail: 140 })).join("")
    + stamp(t, tS, 960, 460) + bellIcon(t, r0) + HUD(t); };
/* the fix: line 2 struck through once (strike), rewritten under it in green; its drawing bends from a row into a ring (bend); +2; Pip surprised,
   then cheer (j907, cut "forgotegg": the oops pose in silence) */
SC.fix = (t, s) => { const st = ss(MK("strike"), MK("strike") + .4, t), fx = ss(MK("bend"), MK("bend") + .8, t), hb = HAS("j907");
  return bg("stage2") + TF(860, 900, .72, notesEasel(t, { strike: st, fix: fx, lit: [0, fx * .6, 0] })) + coin(t, MK("coin2") - .1, 1700, 860, "+2", "line 2")
    + buddy("pip", 230, 1060, 260, t, { aura: true, in: s.t0 + .05, poses: [[s.t0, "oops"], [MK("bend"), "surprised"], [hb ? LE("j907") + .2 : MK("bend") + 1.6, "cheer"]] }) + (hb ? say("j907", 520, 330, t, { size: 40, tail: -220, maxW: 600 }) : "") + HUD(t); };

/* 10 · [LOOK CLOSER] three chickens together at the water dish; Mark Sentence 2 (Momo): 4.1, third sentence ("live" = "leev"), with the tag
   ensure = make sure for the whole card; under the card: the three chickens */
SC.lchens = (t, s) => lcPH(t, s, { title: "Three chickens together: a grandmother hen, a mother hen, a chick", v: "v_hens", verdict: [`THE SAME KIND, AGAIN AND AGAIN`, GOODC], fx: 1200, fy: 820,
  beats: [["h_gm", "label a grandmother hen"], ["h_m", "label a mother hen"], ["h_c", "label a chick"], ["heads", "all three lift their heads together"], ["v_hens", "verdict"]],
  notes: ["The camera glides low to the water dish and pushes in slowly until three chickens fill most of the window, side by side (the garden dims and blurs; the buddies step back). An old hen with paler feathers drinks; beside her the adult with the pale patch on her wing (the chick we followed); beside her one of her chicks, which dips its beak as they do. A plain label line to each AT its mark: a grandmother hen (h_gm) · a mother hen (h_m) · a chick (h_c).",
    "MK heads: all three lift their heads together. Three turns of the ring standing side by side, all of the same kind. Sound: three small sips, low clucks, one cheep (wired). Small print (wired): We look. We do not chase or touch the chickens."],
  over: (tt) => henRule(tt, s.t0 + 1.2) });
SC.mark2 = (t, s) => markScene(t, s, { id: "j1003", sayId: "j1002", who: "momo", n: "2 of 2", text: "Life cycles ensure that living things of the same kind can continue to live on Earth.", keys: ["same", "kind", "continue", "to", "live", "on", "earth"], size: 64, y: 240, footer: FOOT,
  extra: (t >= s.t0 + .6 ? TF(1180, 820, spring(t, s.t0 + .6, .4), tpill(0, 0, "ensure = make sure", 36, "#FFF8EA", P.ink, { w: 700 })) : "") + stageNote("under the card: the three chickens, small", 1040) });

/* 11 · the chant: call and response (common.js chantScene); the board CYCLE CHECK with its TWO closed rings behind the buddies, each line's part
   flashing on its call (cycleBoard({two, flash}); Stage 2: the drawn board, centred and big enough to read) */
SC.chant = (t, s) => chantScene(t, s, "c1003", { sayId: "u1002", size: 52, x: 560, y0: 260, dy: 120, xs: [230, 500, 770], bh: 200, tx: 1480, ty: 540, sayX: 520, sayY: 640,
  board: (tt, flash) => TF(1290, 1066, .5, cycleBoard(tt, { two: true, flash, small: true })) });

/* 12 · score hand, the ladybird (lizReveal in common.js: the score hand melts into the real garden, ONE push-in onto the ladybird, the ring
   pops on its name) */
SC.final = (t, s) => { const L = "j1201"; return finalScene(t, s, L, 1, [[s.t0, null, 1], [W(L, "three") - .1, null, 3]]); };
SC.liz = (t, s) => { const L = "j1202", tq = W(L, "it") - .1;
  return lizReveal(t, s, L, gardenPH(t), LADY[0], LADY[1], tq, "It was on a leaf of the young tree!", 0, 170, 76, 2.0, { from: () => SC.final(SCN.final.t1 - .04, SCN.final) }); };

/* 13 · the dare for Episode 15: a mango, one big seed. The three cards, the ?, the banner and "Lock in your answer!" are wired; Stage 2 draws the three boards */
const DRX = [560, 960, 1360];
SC.dare = (t, s) => { const a = "j1301", tQ = W(a, "what") - .15, tc = [W(a, "one") - .1, W(a, "two") - .1, W(a, "three") - .1], tL = W(a, "lock") - .1, hb = HAS("j1302");
  return phScene(t, s, "13 · The dare for Episode 15: what will the seed grow into first?", ["MK dareIn: three picture boards slide in low and stand side by side, centred between the discs: a mango cut open with its one big flat seed, three times; beside the seed, on the first board a small mango, on the second a flower, on the third a young plant with two leaves. A big ? pops above them (wired). Banner (wired). Basil cheer, then sit, rubbing his tummy (a small hop) (j1302, cut \"nextjoke\" if needed). The garden's light is bright; a juicy squish on \"mango\"."])
    + NEXT_CARDS.map((txt, i) => TF(DRX[i], 690, .5 * spring(t, tc[i], .45), ansCard(i + 1, txt, { w: 430, h: 290, size: 50, pulse: Math.max(pulse(t, tc[i], .04, .6), t >= tL ? (Math.floor((t - tL) / .5) % 3 === i ? .8 : 0) : 0) }))).join("")
    + TF(960, 150, spring(t, s.t0 + .2, .45), tpill(0, 0, "NEXT · What will the seed grow into first?", 46, P.ink, P.sun, { w: 700 }))
    + qMark(t, tQ, 960, 560, 44) + (t >= tL ? TF(1250, 470, spring(t, tL, .45), tpill(0, 0, "Lock in your answer!", 40, P.sun, P.ink, { w: 700 })) : "")
    + buddy("basil", 200, 1060, 230, t, { aura: true, in: s.t0 + .1, poses: hb ? [[s.t0, "cheer"], [LT("j1302") - .12, "sit"]] : [[s.t0, "sit"], [tL, "cheer"]], jump: hb ? [[LT("j1302") + .3, 18]] : [], nohop: true }) + (hb ? say("j1302", 520, 950, t, { size: 36, tail: -160, maxW: 520 }) : ""); };

/* 15 · "Now you know!": the board CYCLE CHECK with its two closed rings, their arrows going round, centred between the buddies */
SC.nyk = (t, s) => nykScene(t, s, TF(860, 1040, .5, cycleBoard(t, { two: true })), { bx: [200, 1715, 1375], hx: 470 });
})(); }
