// p2.js: PART 2, "What's WRIGGLING in This Pail of Rainwater?": the wrigglers (Round 1: what comes next? a pupa), the wrigglers up close
// (WRIGGLER), be a mosquito egg, the answer (four stages), the Showdown (Basil's homework: not all mosquitoes spread dengue; DENGUE), the
// flower-pot plate in the HDB corridor (STAGNANT WATER; tip it out), the chant, the dragonfly, the dare into EP18 (a frog and a mosquito:
// the same life cycle?). Segments 1-14 of ../p3_ep17_script.md section 5 (version 1, 23 Nov 2026).
// STAGE 1 (setup): shared routines WIRED (the calm 3-picture recap frame, the game as ONE smooth push-in onto the dragonfly, Basil's goal
// cards, Round 1's lock-in with THREE numbered cards, the look-closer frames (lcPH), the strips, both Mark Sentences, the Showdown card, the
// chant, the score hand, the dragonfly's reveal with its fun-fact panel, the dare's two cards, the read-along, "Now you know!"); every scene
// with new art is a phScene placeholder. STAGE 2 draws them (SCENES_TODO.md: the full staging per scene and per line).
if (PART === 2) { (() => {
const L1 = "b401";
// the scores (script section 3): Round 1 1 : 1 (Basil and Pip right: the Buddies score), Showdown 3 : 1 (built on Basil's mistake: no point)
SCORE.push([MK("coin1") - .1, 1, 1]);
SCORE.push([MK("coin2") - .1, 3, 1]);
const FOOT = "P3 · Life Cycles of Animals · Four-stage life cycles";
const ph = (title, ...notes) => (t, s) => phScene(t, s, title, notes.concat(["Full staging: SCENES_TODO.md."])) + HUD(t);
const R1 = ["An egg", "A pupa", "An adult"];

/* 1 · "Last time...": three pictures from Part 1, one at a time, centred and large, a gentle push-in, one label each (>= 2.5 s each). WIRED frame */
SC.lasttime = (t, s) => { const tb = [s.t0, MK("pic2") - .2, MK("pic3") - .2], i = t >= tb[2] ? 2 : t >= tb[1] ? 1 : 0, labs = ["The caterpillar is a larva", "The pupa became a butterfly", "Something wriggling in a pail"],
    draws = ["the caterpillar on its lime leaf", "the empty pupal case and the butterfly beside it", "the pail of rainwater, with a ?"], u = t - tb[i], z = 1 + .05 * eio(u / 4), k = ramp(t, tb[i], .5);
  return bg("stage2") + OP(ramp(t, s.t0, .3), T(960, 110, "Last time…", 60, "#fff", { w: 600 }))
    + OP(k, TF(960, 540, z, `<g filter="url(#drop)"><rect x="-520" y="-300" width="1040" height="600" rx="36" fill="url(#gPaper)"/></g>` + T(0, 0, "(Stage 2: " + draws[i] + ")", 32, P.ink, { w: 500 })))
    + OP(k, TF(960, 930, spring(t, tb[i] + .1, .4), tpill(0, 0, labs[i], 46, P.sun, P.ink, { w: 700 }))) + HUD(t); };
SC.place = ph("2 · The garden's far corner after rain, mid-morning", "Wet leaves, a puddle drying on the path, the old PAIL of rainwater by the tap, a flower pot on a little plate holding water, a watering can, a planter bed with bamboo stakes, the bench, the block behind. MK rain: a last drip falls into the pail (a ring spreads). Location pill: A community garden, Singapore · after rain. No buddies yet. The dragonfly on the tip of a bamboo stake in the planter bed (the intro spot: the game pushes in here; never used again).");
SC.game = (t, s) => gameScene(t, s, ["b201a", "b201b", "b201c"], false, { world: (tt) => cornerPH(tt), A: DRAGONFLY, T: [1400, 470], Z: 2.6, ly: -150, qx: 1730, qy: 430 }) + smallPrint(t, LT("b201c"), DRAGON_RULE);
SC.goals = (t, s) => goals3(t, s, [["The mosquito's life cycle", ""], ["Mosquitoes and dengue", ""], ["Why we tip out still water", ""]], ["b301", "b302", "b303", "b304"], "basil");

/* 4 · Round 1: what comes after the wriggler? THREE big numbered picture cards (an egg · a pupa (comma-shaped) · an adult mosquito, small and
   not scary), the clue labels young mosquitoes · in still water ON TOP of the ring, the ring's picture: the pail's surface with three wrigglers */
SC.r1 = (t, s) => lockN(t, { t0: W(L1, "these") - .35, cards: R1, clues: [["young mosquitoes", W(L1, "young")], ["in still water", W(L1, "young") + .3]], csize: 40, lead: "basil",
  pics: ["a tiny egg", "a comma-shaped pupa", "a mosquito (small, not scary)"].map((x) => T(0, 108, "(" + x + ")", 24, P.ink, { w: 500 })), q: "What comes next?", tq: W(L1, "what") - .1,
  tc: [W(L1, "one", 1), W(L1, "two"), W(L1, "three")], ring0: MK("ring0_r1"), dur: 5, lock: "b402", obj: ringPH("the pail's still surface with three wrigglers hanging from it"),
  picks: [{ who: "momo", id: "b403", word: "3" }, { who: "basil", id: "b404", word: "2" }, { who: "pip", id: "b405", word: "2" }],
  react: [[LE("b403") + .1, "momo", "pointing"], [LE("b404") + .1, "basil", "pointing"], [LE("b405") + .1, "pip", "pointing"]] });

/* 5 · [LOOK CLOSER] the wrigglers (WRIGGLER pops inside, lib.js o.at) */
SC.lcwriggler = (t, s) => lcPH(t, s, { title: "The wrigglers: hanging under the water's surface", v: "v_wriggler", verdict: ["THE LARVA: A WRIGGLER", GOODC], fx: 960, fy: 520,
  beats: [["hang", "three wrigglers hang head-down from just under the surface (label the water's surface)"], ["tube", "a magnifier on one tail end: a little tube poking up through the surface"], ["dive", "a soft shadow passes: they wriggle down in S-shapes"], ["up", "they wriggle back up and hang again"], ["kw_wriggler", "WRIGGLER pops"], ["v_wriggler", "verdict"]],
  notes: ["A cut-away side view of the pail's water FILLS the panel (the surface a bright line near the top). On 'hangs' three WRIGGLERS hang head-down from just under the surface (thin, segmented, a bigger head end, little bristles; the tail end touching the surface); label the water's surface. On 'tube' a magnifier (joined by a line) on one tail end: a little TUBE poking up through the surface (a tiny air bubble above it).",
    "MK dive: a soft shadow passes over the water: the wrigglers jerk down in S-shaped wriggles; MK up: they wriggle back up and hang again. FACES: Momo first (thinking: her pick is being tested), Pip (pointing at the tube), Basil (eyes wide as WRIGGLER lands, then laughing as he wriggles)."],
  over: (tt) => smallPrint(tt, s.t0 + 1.0, PAIL_RULE) });

/* 6 · BE A MOSQUITO EGG (the journey; the buddies ride along on a floating leaf: common.js riders) */
SC.waitw = ph("6 · Be a mosquito egg! (the glide in)", "Pill Be a mosquito egg! The camera glides down to the pail's still surface; a soft blue wipe. The buddies wave the viewer off (goodbye), then shrink (a pop each) and follow. The shelf slides aside. The dragonfly on the pail's rim as the camera passes (new spot).");
SC.shrink = (t, s) => phScene(t, s, "6 · BE A MOSQUITO EGG (first person, present tense)", ["MK jegg: YOU are a tiny dark egg on the flat, still surface (a huge shining floor, the pail's wall a cliff). MK jhatch: you slip out underneath: a wriggler hanging head-down under the surface (your tail end poking up at the top edge). MK jeat: tiny bits drift past and you eat them. MK jbig: a tight squeeze, a moult (an old skin drifts away below), you are bigger. MK jpupa: you curl up, the view rounds like a comma: a pupa; you tumble gently. MK jsplit: at the surface your case splits along the back; light pours in. MK jfly: you climb out onto the surface; your new wings dry and unfold at the frame's edges: an adult.",
  "The three buddies ride along, shrunk, on a floating leaf at the lower edges (riders), bobbing: Momo surprised as you hatch; Pip pointing at the drifting old skin; Momo thinking as you curl up; Pip and Basil surprised at the wings. Calm pad, Heart soft; the mosquito never scary. Full staging: SCENES_TODO.md."])
  + youTag(t, MK("jegg"), "You: a mosquito egg") + feelTag(t, MK("jhatch") + .4, MK("jeat") - .1, "a wriggler", 160) + feelTag(t, MK("jpupa"), MK("jsplit") - .1, "a pupa", 160) + feelTag(t, MK("jfly"), MK("jfly") + 3, "an adult", 160)
  + speeded(t, MK("jhatch"), MK("jfly")) + riders(t, s, { tin: MK("jegg") + .6 });
SC.pullout = ph("6 · Pull back out to the pail", "Whoosh back out to the garden's corner, normal size (0.6 s): the pail, wrigglers and two comma-shaped pupae at its surface. The buddies pop back (a hop each).");

/* 7 · the answer: the pupa. The three numbered cards small along the top, card 2 glows (ansglow); Mark Sentence 1 (Pip) */
SC.mosqans = (t, s) => ph("7 · The answer is two: the pupa", "The pail at its spot, the wrigglers and two comma-shaped pupae at the surface. The three numbered cards small along the top (wired): card 2 glows (ansglow), an x chip on card 3 and by Momo; the coin (coin1: the Buddies also score, two of three were right). Basil (left) and Pip (right) big, arms crossed (right); Momo mid-ground right, oops (wrong). The dragonfly on the garden tap (new spot).")(t, s)
  + R1.map((c, i) => TF(720 + i * 240, 170, .3, ansCard(i + 1, c, { w: 430, h: 290, size: 50, lit: i === 1 && t >= MK("ansglow") ? 1 : 0 }))).join("");
SC.mark1 = (t, s) => markScene(t, s, { id: "b706", sayId: "b705", who: "pip", n: "1 of 2", text: "A life cycle with four stages includes the egg, the larva, the pupa and the adult.", keys: ["four", "stages", "egg", "larva", "pupa", "adult"], size: 60, y: 235, footer: FOOT });

/* 8 · Showdown: Basil's mosquito homework (Stage 2: model ../ep16/p2.js SC.show / SC.fix (or ../ep15/p2.js): the ring big and central with the
   three line numbers as the choice cards, the lines lit as he reads them (l1..l3), line 3 struck (strike) and rewritten in green (rewrite)) */
SC.show = ph("8 · Showdown: Basil's homework on the mosquito", "Basil's homework sheet on an easel by the bench, LARGE: three ruled lines, each with a small cute drawing: 1 It has four stages. (a small four-tile loop) · 2 Its larva is a wriggler. (a wriggler) · 3 All mosquitoes spread dengue. (five small mosquitoes, each with a red warning badge). The lines light as Basil reads them (MK l1, l2, l3; Basil pointing at each). The YOU ring (5 s) big and central with the three line numbers as the ONE set of numbered cards; only Basil at the side (worried). LOCKED IN!; Pip reveals (talking, then arms crossed), Momo arms crossed, Basil oops. Mosquitoes small, simple, never scary. The dragonfly on the easel's top (new spot); not in the ring.");
SC.fix = (t, s) => ph("8 · The fix (the book's 5.10a on a strip); DENGUE", "MK strike: line 3 struck through; MK rewrite: rewritten in green Most mosquitoes do not spread diseases, but some do.; its drawing changes: only one of the five mosquitoes keeps a small badge. Heart reads the cream strip (wired; the two names in italics). DENGUE pops on Heart's term (Momo cheer). Momo's line: a calm picture beside her, a child in bed with a thermometer (cared for), and a mosquito with a ? on its badge (only some carry it). The coin +2 (coin2). Basil big at the left by his easel (a nod and a smile at the rewrite: his mistake fixed); Pip and Momo at the right. The dragonfly on the bench's armrest (new spot).")(t, s)
  + lcStrip(t, "b806", "Most of the mosquitoes do not spread diseases, but some do. For example, Aedes albopictus and Aedes aegypti spread dengue.");

/* 9 · the flower-pot plate in the HDB corridor: Momo's question, Pip's guess (too little water: HIS thought bubble); [LOOK CLOSER] the plate
   (STAGNANT WATER pops inside, lib.js o.at); Mark Sentence 2 (Basil) */
SC.plate = (t, s) => ph("9 · \"How does the life cycle keep us safe?\" (an HDB corridor)", "The HDB corridor outside a flat on a high floor, late morning: potted plants along the railing, each on a little plate; a vase of flowers by the door; a pail upside down; the estate and sky beyond the railing; a neighbour's shoes at the next door. Location pill: An HDB corridor, Singapore. Momo big at the left (asks: thinking); Pip big at the right by the plants (pointing at the plate); Basil mid-ground centre. Pip's wrong idea as HIS thought bubble: a tiny plate with a crossed-out mosquito and a ?. The dragonfly on the corridor railing (new spot).")(t, s)
  + thought(t, W("b902p", "surely") - .2, s.t1 - .1, 1300, 360, "too little water for mosquitoes?", { size: 34 });
SC.lcplate = (t, s) => lcPH(t, s, { title: "The flower-pot plate: a tiny bit of still water", v: "v_plate", verdict: ["NO STILL WATER, NO NEW MOSQUITOES", GOODC], fx: 1000, fy: 640,
  beats: [["water", "the plate fills the panel: a thin layer of still water, fallen leaves (label still water, blue)"], ["wrigglers", "a magnifier into the water: tiny wrigglers at the surface"], ["kw_stagnant_water", "STAGNANT WATER pops"], ["tip", "an adult's hand (four fingers and a thumb) tips the plate into the drain"], ["dim", "the mosquito loop's tiles go dim one by one (no eggs · no wrigglers · no pupae · no adults)"], ["pail2", "life pictures: a pail turned over"], ["vase", "a vase with fresh water"], ["v_plate", "verdict"]],
  notes: ["The flower-pot PLATE fills the panel, close: a thin layer of still water with a few fallen leaves; label still water (blue). On 'days' a magnifier (joined by a line) into the water: tiny wrigglers hanging at the surface (Pip's face: oops). Then the why as a picture model on the right half: the mosquito loop (four tiles, no numbers) with a small water-drop icon by the egg tile (needs still water).",
    "MK tip: an ADULT's hand tips the plate out into the drain (a splash); MK dim: the loop's tiles go dim one by one, each with a small no ... tag. Then three small life pictures pop along the bottom: a plate tipped out, a pail turned over (pail2), a vase with fresh water (vase). FACES: Pip first (thinking, then oops), Basil (surprised, then teaching), Momo (pointing at each life picture)."],
  over: (tt) => smallPrint(tt, s.t0 + 1.0, ADULT_RULE) });
SC.mark2 = (t, s) => markScene(t, s, { id: "b909", sayId: "b908", who: "basil", n: "2 of 2", text: "We can reduce the number of mosquitoes breeding by removing their breeding spots in our schools and homes.", keys: ["reduce", "removing", "breeding", "spots", "schools", "homes"], size: 54, y: 225, footer: FOOT });

/* 10 · the chant: the board at the right (the butterfly loop and the mosquito loop, four tiles each, and a tipped plate; flash per line) */
SC.chant = (t, s) => chantScene(t, s, "c1003", { sayId: "u1002", size: 50, x: 620, y0: 260, dy: 110, xs: [230, 560, 890], bh: 360, tx: 1180, ty: 520, sayX: 620, sayY: 600,
  board: (tt, flash) => TF(1460, 900, 1, `<rect x="-280" y="-230" width="560" height="420" rx="30" fill="#FFF8EA" stroke="${P.ink}" stroke-width="4"/>` + T(0, -20, "two four-stage loops", 34, P.ink) + T(0, 26, "butterfly · mosquito · a tipped plate", 24, P.ink, { w: 500 }) + T(0, 66, "(Stage 2; flash " + flash.map((f) => (f > .3 ? 1 : 0)).join("") + ")", 24, P.ink, { w: 500 })) });

/* 11 · score hand, the dragonfly (lizReveal onto the watering can's handle: the REVEAL spot, never the intro stake) and Momo's fun-fact panel */
SC.final = (t, s) => { const L = "b1101"; return finalScene(t, s, L, 1, [[s.t0, null, 1], [W(L, "three") - .1, null, 3]]); };
SC.liz = (t, s) => { const L = "b1102", tq = W(L, "it") - .1;
  return lizReveal(t, s, L, cornerPH(t, DRAGONFLY_R), DRAGONFLY_R[0], DRAGONFLY_R[1], tq, "It was on the handle of the watering can!", -120, 160, 80, 2.0, { from: () => SC.final(SCN.final.t1 - .04, SCN.final), tell: "b1104",
    fact: { id: "b1103m", at: [1300, 560], w: 960, h: 420, items: FF([["ff_nymph", "a dragonfly nymph", "DRAW: a cute dragonfly nymph underwater among pond weeds (big eyes, six legs, no wings)"], ["ff_gobble", "it gobbles up wrigglers", "DRAW: the nymph snapping up a wriggler (a quick cartoon gulp, not scary)"]]) } }) + smallPrint(t, s.t0 + .5, DRAGON_RULE); };
/* 12 · the dare for Episode 18 (the void deck: the frog loop (EP16) and a mosquito loop on two small boards). Stage 2: model ../ep16/p2.js
   SC.dare: ONE set of TWO big numbered picture cards slides in low (1 Yes, the same · 2 No, different) */
SC.dare = (t, s) => phScene(t, s, "12 · The dare for Episode 18", ["The void deck beside the garden: the frog loop (EP16) and a mosquito loop on two small boards side by side on a table. MK dareIn: TWO big numbered picture cards slide in low: 1 Yes, the same (the two loops with a big =) · 2 No, different (the two loops with a big ≠); the banner NEXT · Frog and mosquito: the same life cycle?, Lock in your answer!. Basil big at the left (a hopeful smile); Momo and Pip at the right (thinking: a question has just been asked; no hints). The dragonfly is not shown (revealed). Full staging: SCENES_TODO.md."])
  + NEXT_CARDS.map((c, i) => { const t0 = MK("dareIn") + .5 + i * .25; return t < t0 ? "" : TF(780 + i * 380, 860, .45 * spring(t, t0, .45), ansCard(i + 1, c, { w: 430, h: 290, size: 50 })); }).join("") + HUD(t);
SC.nyk = (t, s) => nykScene(t, s, TF(960, 900, 1, `<rect x="-240" y="-180" width="480" height="300" rx="30" fill="#FFF8EA" opacity=".9"/>` + T(0, -20, "butterfly + mosquito loops", 34, P.ink) + T(0, 30, "(Stage 2)", 26, P.ink, { w: 500 })), { bx: [220, 1720, 1400], hx: 470 });
})(); }
