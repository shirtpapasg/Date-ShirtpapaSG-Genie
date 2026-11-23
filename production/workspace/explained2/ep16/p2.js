// p2.js: PART 2, "Why Did This Grasshopper Leave Its SKIN Behind?": the young grasshopper (a nymph: looks like the adult, no wings), the empty
// skin and why (a hard outer skin that cannot stretch), be the nymph (moulting from inside), MOULTING, the Showdown (Pip's cockroach homework:
// its young DOES look like the adult; the egg case), the chant, the praying mantis, the dare into EP17 (a caterpillar: is it a nymph?).
// Segments 1-14 of ../p3_ep16_script.md section 5 (version 1, 23 Nov 2026).
// STAGE 1 (setup): shared routines WIRED (the calm 3-picture recap frame, the game as ONE smooth push-in onto the praying mantis, Momo's goal
// cards, Round 1's lock-in with TWO numbered cards, the look-closer frames (lcPH), the strips, both Mark Sentences, the Showdown card, the
// chant, the score hand, the mantis's reveal with its fun-fact panel, the dare's two cards, the read-along, "Now you know!"); every scene with
// new art is a phScene placeholder. STAGE 2 draws them (SCENES_TODO.md: the full staging per scene and per line).
if (PART === 2) { (() => {
const L1 = "f401";
// the scores (script section 3): Round 1 1 : 1 (Pip and Momo right: the Buddies score), Showdown 3 : 1 (built on Pip's mistake: no point)
SCORE.push([MK("coin1") - .1, 1, 1]);
SCORE.push([MK("coin2") - .1, 3, 1]);
const FOOT = "P3 · Life Cycles of Animals · Three-stage life cycles";
const ph = (title, ...notes) => (t, s) => phScene(t, s, title, notes.concat(["Full staging: SCENES_TODO.md."])) + HUD(t);

/* 1 · "Last time...": three pictures from Part 1, one at a time, centred and large, a gentle push-in, one label each (>= 2.5 s each). WIRED frame */
SC.lasttime = (t, s) => { const tb = [s.t0, MK("pic2") - .2, MK("pic3") - .2], i = t >= tb[2] ? 2 : t >= tb[1] ? 1 : 0, labs = ["The tadpole grew into a frog", "A chick looks like the adult", "Something strange in the grass"],
    draws = ["the frog loop board OUR FROG'S LIFE CYCLE", "the chick beside the hen, both pecking", "the empty grasshopper skin on its blade of grass, with a ?"], u = t - tb[i], z = 1 + .05 * eio(u / 4), k = ramp(t, tb[i], .5);
  return bg("stage2") + OP(ramp(t, s.t0, .3), T(960, 110, "Last time…", 60, "#fff", { w: 600 }))
    + OP(k, TF(960, 540, z, `<g filter="url(#drop)"><rect x="-520" y="-300" width="1040" height="600" rx="36" fill="url(#gPaper)"/></g>` + T(0, 0, "(Stage 2: " + draws[i] + ")", 32, P.ink, { w: 500 })))
    + OP(k, TF(960, 930, spring(t, tb[i] + .1, .4), tpill(0, 0, labs[i], 46, P.sun, P.ink, { w: 700 }))) + HUD(t); };
SC.place = ph("2 · The garden's grassy corner, mid-morning", "Long grass, a planter bed of flowers and herbs (a sunflower, a hibiscus), a lime plant in a big pot at the edge, the void deck and the block behind. MK hop: the little wingless grasshopper hops onto a blade of grass. Location pill: A community garden, Singapore · morning. No buddies yet. The praying mantis on a flower stem in the planter bed (the intro spot: the game pushes in here; never used again).");
SC.game = (t, s) => gameScene(t, s, ["f201a", "f201b", "f201c"], false, { world: (tt) => grassPH(tt), A: MANTIS, T: [1400, 470], Z: 2.6, ly: -150, qx: 1730, qy: 430 }) + smallPrint(t, LT("f201c"), MANTIS_RULE);
SC.goals = (t, s) => goals3(t, s, [["Young that look alike", ""], ["What moulting is", ""], ["The cockroach's life cycle", ""]], ["f301", "f302", "f303", "f304"], "momo");

/* 4 · Round 1: young or adult? TWO big numbered picture cards (the young without wings · the adult with long wings), the clue labels no wings ·
   six legs ON TOP of the ring, the ring's picture: the little wingless grasshopper on its blade of grass (ringPH) */
SC.r1card = (t, s) => roundCard(t, s, "ROUND 1");
SC.r1 = (t, s) => lockN(t, { t0: W(L1, "this") - .35, cards: ["The young", "The adult"], clues: [["no wings", W(L1, "wings")], ["six legs", W(L1, "wings") + .3]], csize: 36, lead: "pip",
  pics: ["the young: no wings", "the adult: long wings"].map((x) => T(0, 108, "(" + x + ")", 26, P.ink, { w: 500 })), q: "Is it the young or the adult?", tq: W(L1, "is") - .1,
  tc: [W(L1, "one", 1), W(L1, "two")], ring0: MK("ring0_r1"), dur: 5, lock: "f402", obj: ringPH("the little green grasshopper with NO wings on its blade of grass"),
  picks: [{ who: "basil", id: "f403", word: "2" }, { who: "pip", id: "f404", word: "1" }, { who: "momo", id: "f405", word: "1" }],
  react: [[LE("f403") + .1, "basil", "pointing"], [LE("f404") + .1, "pip", "pointing"], [LE("f405") + .1, "momo", "pointing"]] });

/* 5 · [LOOK CLOSER] the little grasshopper beside an adult (NYMPH pops inside, lib.js o.at), then the answer (nymphans), Mark Sentence 1 */
SC.lcnymph = (t, s) => lcPH(t, s, { title: "The little grasshopper beside an adult", v: "v_nymph", verdict: [`THE YOUNG: A NYMPH`, GOODC], fx: 960, fy: 620,
  beats: [["pairin", "both on two blades of grass at the same angle"], ["legs", "six legs (teal), joined to BOTH"], ["feelers", "two feelers (orange)"], ["jump", "big back legs (violet)"], ["wings", "the adult's long wings (green); a dashed outline on the young's bare back: no wings yet"], ["kw_nymph", "NYMPH pops (on the young)"], ["v_nymph", "verdict"]],
  notes: ["Two halves, both big: LEFT the little grasshopper (green, no wings), RIGHT an adult of the same kind (bigger, long wings folded along its back), on two blades of grass at the same angle. Colour-coded labels joined to BOTH: six legs (teal) · two feelers (orange) · big back legs (violet), each leg pair pulsing as named.",
    "On 'wings': push in on the adult's back: long wings (green); on the young's bare back a dashed outline no wings yet. A buddy's FACE peeks in: Basil first (thinking, then oops at 'no wings': he picked the adult), Pip (counting legs), Momo (pointing at the wings), Pip (cheer when NYMPH lands, then teaching)."] });
SC.nymphans = (t, s) => ph("5 · The answer is one: the young", "The grass: the two numbered cards small along the top, card 1 glows (ansglow), an x chip on card 2 and by Basil; the coin (coin1: the Buddies also score, two of three were right). Pip big at the right (confident), Momo mid-ground right (confident), Basil mid-ground left (shy: oops). The praying mantis on a grass stem behind Pip (new spot).")(t, s)
  + ["The young", "The adult"].map((c, i) => TF(800 + i * 320, 170, .3, ansCard(i + 1, c, { w: 430, h: 290, size: 50, lit: i === 0 && t >= MK("ansglow") ? 1 : 0 }))).join("");
SC.mark1 = (t, s) => markScene(t, s, { id: "f602", sayId: "f601", who: "momo", n: "1 of 2", text: "The life cycle of a grasshopper has three stages. The stages are the egg, the young and the adult. The young of the grasshopper is called a nymph.", keys: ["three", "stages", "egg", "young", "adult", "nymph"], size: 50, y: 220, footer: FOOT });

/* 6 · the empty skin: Momo's idea (it dried up in the sun) as HER thought bubble with a ?; [LOOK CLOSER] the empty skin and why */
SC.skin = (t, s) => ph("6 · \"Did a grasshopper dry up in the sun?\"", "Back to the empty skin on its blade of grass (Part 1's cliffhanger spot). Momo big at the left (h ~520), crouched by the grass (asks: thinking); Basil and Pip at the right. Her wrong idea as HER thought bubble: a grasshopper lying in hot sun, drying up, with a ? on it. The praying mantis on a twig just above the skin (new spot).")(t, s)
  + thought(t, W("f701m", "dry") - .2, s.t1 - .1, 1300, 360, "it dried up in the sun?", { size: 34 });
SC.lcskin = (t, s) => lcPH(t, s, { title: "The empty skin: why the skin comes off", v: "v_skin", verdict: [`THE OLD SKIN IS TOO TIGHT`, GOODC], fx: 1000, fy: 640,
  beats: [["split", "a magnifier on the long split down its back"], ["hollow", "push in on a leg and a feeler: empty tubes"], ["tight", "the picture model: the nymph grows inside its hard outer skin; it goes tight; a crack starts"], ["v_skin", "verdict"]],
  notes: ["The empty skin FILLS the panel, pale and see-through, light shining through it. On 'split' a magnifier (joined by a line) on the long split down its back: a split down the back. On 'empty' push in on a leg and a feeler: they are empty tubes (empty legs · empty feelers, colour-coded).",
    "The why as a picture model on the right half: a nymph drawn inside an outline of its hard outer skin; the nymph grows (a small time-lapse), little arrows push out from inside, the outline cannot grow and goes tight (a squeeze line, a small too tight! tag), a crack starts down the back. A buddy's FACE peeks in: Momo first (oops: it did not dry up), Basil (surprised), Pip (thinking, then a slow nod)."],
  over: (tt) => smallPrint(tt, s.t0 + 1.0, SKIN_RULE) });

/* 7 · BE THE NYMPH (the journey; the buddies ride along on the next blade of grass: common.js riders) */
SC.waitw = ph("7 · Be the nymph! (the glide in)", "Pill Be the nymph! The camera glides down into the grass; a soft green wipe. The buddies wave the viewer off, then shrink (a pop each) and follow. The shelf slides aside. The praying mantis on a tall weed stalk at the grass edge as the camera passes (new spot).");
SC.shrink = (t, s) => phScene(t, s, "7 · BE THE NYMPH (first person, present tense)", ["MK jnymph: YOU are a nymph on a blade of grass as big as a road (your own green front legs and feelers at the edges of the frame). MK jeat: you munch a leaf edge, bites appear. MK jtight: the view squeezes a little at the edges (too tight!); you hang on to a stem, head down. MK jsplit: a crack of light opens above you. MK jout: you wriggle out: the world pale and soft, a little bigger. MK jhard: colour comes back, firm; the old empty skin hangs on the stem below. MK jagain: a small counter of empty skins (three, four...). MK jwings: the last time, two long WINGS unfold at the edges of the frame: an adult.",
  "The three buddies ride along, shrunk, on the next blade of grass at the lower edges, holding on as it sways (riders): Basil pretends to munch, Pip pushes at the tight edge, Momo surprised at the split and at the pale new skin, all three cheer at the wings. Calm pad, Heart soft. Full staging: SCENES_TODO.md."])
  + youTag(t, MK("jnymph"), "You: a grasshopper nymph") + feelTag(t, MK("jtight"), MK("jsplit") - .1, "too tight!", 160) + feelTag(t, MK("jhard"), MK("jagain") - .1, "your new skin turns hard", 160) + feelTag(t, MK("jwings"), MK("jwings") + 3, "an adult", 160)
  + speeded(t, MK("jeat"), MK("jwings")) + riders(t, s, { tin: MK("jnymph") + .6 });
SC.pullout = ph("7 · Pull back out to the grass", "Whoosh back out to the garden (0.6 s): an adult grasshopper with long wings on a stem, its old empty skin below. The buddies pop back (a hop each).");

/* 8 · MOULTING pops (lib.js o.at); Momo fixes her own guess; Mark Sentence 2 (Basil) */
SC.moult = ph("8 · \"It is called moulting\"", "The grass: the empty skin on its blade and, beside it, the grasshopper that came out of it (a little bigger), large between the buddies. MOULTING pops on Heart's term (lib.js o.at). Momo big at the left (h ~520): she fixes her own guess (oops, then a nod and a smile); Basil big at the right (h ~500). The praying mantis on a flower above the skin (new spot).");
SC.mark2 = (t, s) => markScene(t, s, { id: "f1002", sayId: "f1001", who: "basil", n: "2 of 2", text: "As a young insect grows bigger, it sheds its outer skin and grows a new one. This process is called moulting.", keys: ["young", "insect", "sheds", "outer", "skin", "grows", "new", "moulting"], size: 56, y: 230, footer: FOOT });

/* 9 · Showdown: Pip's cockroach homework (Stage 2: model ../ep15/p2.js SC.show / SC.fix: the ring big and central with the three line numbers
   as the choice cards, the lines lit as he reads them (l1..l3), line 3 struck (strike) and rewritten in green (rewrite); the egg case (case)) */
SC.show = ph("9 · Showdown: Pip's homework on the cockroach", "Pip's homework sheet on an easel by the bench, LARGE: three ruled lines, each with a small cute drawing: 1 It has three stages. (a small loop) · 2 Its eggs are found in an egg case. (a small brown egg case) · 3 Its young does not look like the adult. (a nymph and an adult far apart, a big ≠). The lines light as Pip reads them (MK l1, l2, l3). The YOU ring (5 s) big and central with the three line numbers as the ONE set of numbered cards; only Pip at the side (worried: fidgeting). LOCKED IN!; Basil and Momo reveal (confident), Pip shy. Cockroaches drawn cute and clean. The praying mantis on the easel's leg (new spot); not in the ring.");
SC.fix = (t, s) => ph("9 · The fix (the book's strip 5.6); EGG CASE", "MK strike: line 3 struck through; MK rewrite: rewritten in green Its young looks like the adult. It has no wings yet. Its drawing changes to a nymph beside an adult that look alike (the ≠ becomes =). Heart reads the cream strip (wired). MK case: a big egg case pops in by line 2 (a small brown purse shape; a cut-away shows two neat rows of eggs); EGG CASE pops on Heart's term. Then a small cockroach loop slides under the sheet (the egg case · a nymph · an adult, curved arrows, no numbers). The coin +2 (coin2). Pip big at the left; Basil and Momo at the right. The praying mantis on the easel's top (new spot).")(t, s)
  + lcStrip(t, "f1107", "The young of the cockroach is called a nymph.");
SC.chant = (t, s) => chantScene(t, s, "c1003", { sayId: "u1002", size: 50, x: 620, y0: 260, dy: 110, xs: [230, 560, 890], bh: 360, tx: 1180, ty: 520, sayX: 620, sayY: 600,
  board: (tt, flash) => TF(1460, 900, 1, `<rect x="-280" y="-230" width="560" height="420" rx="30" fill="#FFF8EA" stroke="${P.ink}" stroke-width="4"/>` + T(0, -20, "four three-stage loops", 34, P.ink) + T(0, 26, "frog · chicken · grasshopper · cockroach", 24, P.ink, { w: 500 }) + T(0, 66, "(Stage 2; flash " + flash.map((f) => (f > .3 ? 1 : 0)).join("") + ")", 24, P.ink, { w: 500 })) });

/* 11 · score hand, the praying mantis (lizReveal onto the sunflower: the REVEAL spot, never the intro stem) and Basil's fun-fact panel */
SC.final = (t, s) => { const L = "f1301"; return finalScene(t, s, L, 1, [[s.t0, null, 1], [W(L, "three") - .1, null, 3]]); };
SC.liz = (t, s) => { const L = "f1302", tq = W(L, "it") - .1;
  return lizReveal(t, s, L, grassPH(t, MANTIS_R), MANTIS_R[0], MANTIS_R[1], tq, "It was on a sunflower, keeping very still!", -120, 160, 80, 2.0, { from: () => SC.final(SCN.final.t1 - .04, SCN.final), tell: "f1304",
    fact: { id: "f1303b", at: [1300, 560], w: 960, h: 420, items: FF([["ff_cousin", "cousins!", "DRAW: a cute mantis and a cute cockroach side by side, a little family-tree line joining them"], ["ff_case", "an egg case on a twig", "DRAW: a mantis egg case on a twig (pale, foamy-looking)"], ["ff_babies", "lots of tiny nymphs", "DRAW: lots of tiny mantis nymphs hatching out together, each a tiny copy of the adult"]]) } }) + smallPrint(t, s.t0 + .5, MANTIS_RULE); };
/* 12 · the dare for Episode 17 (the lime plant at the garden's edge: a caterpillar). Stage 2: model ../ep15/p2.js SC.dare: ONE set of TWO big
   numbered picture cards slides in low (1 Yes, a nymph · 2 No) */
SC.dare = (t, s) => phScene(t, s, "12 · The dare for Episode 17", ["The lime plant in its big pot at the garden's edge: a green caterpillar (lime butterfly larva: plump, green, a pale band) munches a leaf (it chews and wiggles). MK dareIn: TWO big numbered picture cards slide in low: 1 Yes, a nymph (a nymph picture with a ?) · 2 No; the banner NEXT · Is the caterpillar a nymph?, Lock in your answer!. Basil big at the left (a hopeful smile); Momo and Pip at the right (listening: no hints). The praying mantis on the rim of the lime plant's pot (new spot). Full staging: SCENES_TODO.md."])
  + NEXT_CARDS.map((c, i) => { const t0 = MK("dareIn") + .5 + i * .25; return t < t0 ? "" : TF(780 + i * 380, 860, .45 * spring(t, t0, .45), ansCard(i + 1, c, { w: 430, h: 290, size: 50 })); }).join("") + HUD(t);
SC.nyk = (t, s) => nykScene(t, s, TF(960, 900, 1, `<rect x="-240" y="-180" width="480" height="300" rx="30" fill="#FFF8EA" opacity=".9"/>` + T(0, -20, "four three-stage loops", 36, P.ink) + T(0, 30, "(Stage 2)", 26, P.ink, { w: 500 })), { bx: [220, 1720, 1400], hx: 470 });
})(); }
