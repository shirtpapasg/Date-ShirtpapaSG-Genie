// p2.js: PART 2, "The Mango or the Seed: Which Came FIRST?": the adult plant (flowers and fruits), where new seeds come from, the three
// stages round a loop (no first or last stage), why Singapore keeps a seed bank. Segments 1-14 of ../p3_ep15_script.md (version 1).
// STAGE 1 (setup): shared routines WIRED (the calm 3-picture recap frame, the game as ONE smooth push-in onto the weaver ant, Pip's goal cards,
// Round 1's lock-in, the look-closer frames (lcPH), the strips, both Mark Sentences, the Showdown card, the chant, the score hand, the ant's
// reveal with its fun-fact panel, the read-along, "Now you know!"); every scene with new art is a phScene placeholder. STAGE 2 draws them
// (SCENES_TODO.md: the full staging per scene and per line).
if (PART === 2) { (() => {
const L1 = "j401";
// the scores (script section 3): Round 1 1 : 1 (Basil and Momo right: the Buddies score), Showdown 3 : 1 (built on Momo's mistake: no point)
SCORE.push([MK("coin1") - .1, 1, 1]);
SCORE.push([MK("coin2") - .1, 3, 1]);
const FOOT = "P3 · Life Cycles · The life cycle of a plant";
const ph = (title, ...notes) => (t, s) => phScene(t, s, title, notes.concat(["Full staging: SCENES_TODO.md."])) + HUD(t);
const slamFit = (y, txt, col, k) => slamLine(y, txt, Math.min(170, 170 * 1720 / tw(txt, 170, 700, "Fredoka", 4)), col, k);
const knife = (t, t0) => smallPrint(t, t0, KNIFE_RULE);

/* 1 · "Last time...": three pictures from Part 1, one at a time, centred and large, a gentle push-in, one label each (>= 2.5 s each). WIRED frame */
SC.lasttime = (t, s) => { const tb = [s.t0, MK("pic2") - .2, MK("pic3") - .2], i = t >= tb[2] ? 2 : t >= tb[1] ? 1 : 0, labs = ["We planted a mango seed", "We observed it like a scientist", "It grew into a young plant"],
    draws = ["the big flat seed going into the pot", "the journal page Day 1 with the eye, hand and nose", "the young plant in its pot, red leaves turning green"], u = t - tb[i], z = 1 + .05 * eio(u / 4), k = ramp(t, tb[i], .5);
  return bg("stage2") + OP(ramp(t, s.t0, .3), T(960, 110, "Last time…", 60, "#fff", { w: 600 }))
    + OP(k, TF(960, 540, z, `<g filter="url(#drop)"><rect x="-520" y="-300" width="1040" height="600" rx="36" fill="url(#gPaper)"/></g>` + T(0, 0, "(Stage 2: " + draws[i] + ")", 32, P.ink, { w: 500 })))
    + OP(k, TF(960, 930, spring(t, tb[i] + .1, .4), tpill(0, 0, labs[i], 46, P.sun, P.ink, { w: 700 }))) + HUD(t); };
SC.place = ph("2 · The community garden beside the block", "Wide, bright morning: the void deck, planter beds, a bench, a little pond with lily pads, and the big OLD MANGO TREE covered in sprays of tiny cream flowers, a few green mangoes, red new leaves at the tips. MK potdown: an adult carries our young plant in its pot out of the lift lobby and sets it on the bench beside the tree. Location pill: A community garden, Singapore · morning.");
SC.game = (t, s) => gameScene(t, s, ["j201a", "j201b", "j201c"], false, { world: (tt) => gardenPH(tt), A: ANT, T: [1400, 470], Z: 2.6, ly: -150, qx: 1730, qy: 430 });
SC.goals = (t, s) => goals3(t, s, [["The 3 plant stages", ""], ["No first or last stage", ""], ["Why seeds are saved", ""]], ["j301", "j302", "j303", "j304"], "pip");

/* 4 · Round 1: the old tree in flower. Which stage? Three picture cards (the seed · the young plant · the adult plant), the clue labels
   grew from a seed · tiny flowers ON TOP of the ring, the ring's picture: a spray of tiny mango flowers on the old tree (ringPH) */
SC.r1card = (t, s) => roundCard(t, s, "ROUND 1");
SC.r1 = (t, s) => lockN(t, { t0: W(L1, "This") - .35, cards: ["The seed", "The young plant", "The adult plant"], clues: [["grew from a seed", W(L1, "grew")], ["tiny flowers", W(L1, "flowers")]], csize: 34, lead: "pip",
  pics: ["the seed", "the young plant", "the adult plant"].map((x) => T(0, 108, "(" + x + ")", 26, P.ink, { w: 500 })), q: "Which stage is it in?", tq: W(L1, "which") - .1,
  tc: [W(L1, "one"), W(L1, "two"), W(L1, "three")], ring0: MK("ring0_r1"), dur: 5, lock: "j402", obj: ringPH("a spray of tiny mango flowers"),
  picks: [{ who: "pip", id: "j403", word: "2" }, { who: "basil", id: "j404", word: "3" }, { who: "momo", id: "j405", word: "3" }],
  react: [[LE("j403") + .1, "pip", "thinking"], [LE("j404") + .1, "basil", "cheer"], [LE("j405") + .1, "momo", "pointing"]] });

/* 5 · [LOOK CLOSER] our young plant beside the old tree; the book's strip (4.4 captions 2 and 3, Heart reads it) inside; ADULT PLANT pops */
SC.lcadult = (t, s) => lcPH(t, s, { title: "Our young plant beside the old tree", v: "v_adult", verdict: [`FLOWERS AND FRUITS: AN ADULT PLANT`, GOODC], fx: 960, fy: 600,
  beats: [["pairin", "the pot on the bench, the old tree behind: side by side"], ["stem", "label a thin stem · a few leaves"], ["trunk", "label a thick trunk"], ["flowers", "push in: tiny flowers (and a few green mangoes)"], ["tips", "push in on a branch tip: new RED leaves"], ["tagadult", "the only-the-adult tag: flowers and fruits"], ["kw_adult_plant", "ADULT PLANT pops; the strip"], ["v_adult", "verdict"]],
  notes: ["Two halves, both big: LEFT our young plant in its pot (thin stem, a few leaves, a label line to each); RIGHT the old tree, its trunk and a branch with a spray of tiny cream flowers and two small green mangoes. Each part named gets its own push-in and a big label. Colour-code: young plant labels teal-green, adult plant labels mango-orange.",
    "On Pip's 'tips': push in on the old tree's branch tip: a bunch of new RED leaves (the tree still grows). Heart's strip (cream, dark text) across the top for >= 3.5 s. A buddy's FACE peeks in at a lower corner: Momo, Basil, Pip in turn (thinking at the tips, nod at the strip)."],
  over: (tt) => lcStrip(tt, "j506", "The young plant grew into an adult plant. The adult plant started to have flowers and fruits.") });
SC.adultans = ph("5 · The answer is three: the adult plant", "The garden: the three picture cards small at the top, card 3 glows (ansglow), x chip on card 2 and by Pip; the coin (coin1). Basil and Momo confident smiles (they were right); Pip shy (oops pose) and his line, then a nod.");
/* 6 · where do new seeds come from? Momo asks (thinking), Basil guesses (the roots: a thought bubble of seeds under the ground, then a ? ) */
SC.seeds = ph("6 · \"Where do new mango seeds come from?\"", "Under the old tree. Momo big at the left (thinking); Basil big at the right, proud: a thought bubble shows seeds popping out of the roots under the ground (drawn as his IDEA, with a ? on it, never as a fact).");
SC.waitw = ph("6 · Be a mango flower! (the glide in)", "Pill Be a mango flower! The camera glides up the trunk into one spray of tiny flowers; a soft cream wipe. The buddies wave, then shrink and come along. The shelf slides aside.");
SC.shrink = (t, s) => phScene(t, s, "6 · BE A MANGO FLOWER (first person, present tense)", ["MK jflower: YOU are one tiny cream flower in a spray of hundreds (a You: a tiny mango flower tag; the viewer's own petals at the frame's lower edge); MK jbreeze: the branch sways in a warm breeze. MK jpetals: your petals fall away; MK jgreen: you swell into a tiny green mango. MK jbig: week after week (week pill, speeded up) you grow bigger and heavier, the branch bends; MK jseed: a see-through view: inside you a seed grows, big and flat. MK jripe: you turn yellow and sweet; MK jnew: you are a ripe mango with a new seed inside (tag).",
  "The three buddies ride along, shrunk, on the branch beside you (riders): Momo surprised at the petals, Basil cheer at the green mango, Pip pointing at the seed inside. Calm pad, warm light. Nothing about pollination. Full staging: SCENES_TODO.md."])
  + youTag(t, MK("jflower"), "You: a tiny mango flower") + feelTag(t, MK("jgreen"), MK("jbig") - .1, "a tiny green mango", 160) + feelTag(t, MK("jseed"), MK("jripe") - .1, "a seed grows inside", 160) + feelTag(t, MK("jnew"), MK("jnew") + 3, "a ripe mango, with a new seed inside", 160)
  + riders(t, s, { tin: MK("jflower") + .6 });
SC.pullout = ph("7 · Pull back out to the garden", "Whoosh back out of the mango to the garden (0.6 s); the buddies pop back to full size.");
SC.fruitcut = (t, s) => ph("7 · The seed inside the fruit", "MK cutfruit: on the bench, an adult's hands cut a ripe mango (picked from the tree) in half: the big flat seed inside, a plain label line: a new seed. Basil big (oops: shy, paw on head) and his line; Momo pointing, then her line, a loop arrow drawn from the seed to a tiny young plant.")(t, s) + knife(t, s.t0);
SC.ring = ph("7 · The board OUR MANGO'S LIFE CYCLE (THREE STAGES pops)", "A cream board on a low stand by the bench: a loop of plain curved arrows all running ONE way, three round slots, NO numbers, no Stage 1, no START, no END. Pip places the tiles ON his words: tseed the seed · tyoung the young plant · tadult the adult plant (flowers and fruits); tback the last arrow lights from the fruit back to the seed. THREE STAGES pops (lib.js o.at). Basil's bus-loop picture (a tiny bus going round the loop) on his line.");
SC.mark1 = (t, s) => markScene(t, s, { id: "j807", sayId: "j806", who: "basil", n: "1 of 2", text: "There are three stages in the life cycle of a plant. The stages are the seed, the young plant and the adult plant.", keys: ["three", "stages", "seed", "young", "plant", "adult"], size: 58, y: 230, footer: FOOT });

/* 8 · Showdown: Momo's homework (Stage 2: model ep14/p2.js SC.show / SC.fix: the ring big and central, the three lines lit as she reads them
   (l1..l3), line 3 struck (strike) and rewritten in green (bend: its little drawing bends from a row into a loop)) */
SC.show = ph("8 · Showdown: Momo's homework", "Momo's homework sheet on an easel, LARGE (about half the frame): three ruled lines, each with a tiny drawing; they light as she reads them (l1, l2, l3). Line 3: The adult plant is the last stage, and the cycle ends. (a row of three pictures ending in a STOP sign). The YOU ring (6 s) big and central with the three line numbers as the choice cards. LOCKED IN!, Basil and Pip reveal (confident), Momo shy.");
SC.fix = (t, s) => ph("8 · The fix (the book's strip 5.16)", "MK strike: line 3 struck through; MK bend: rewritten in green: The adult plant has fruits with new seeds, so round it goes again. Its drawing bends from a row into a loop. Heart's strip (cream, dark text, >= 3.5 s).")(t, s)
  + lcStrip(t, "j906", "The stages in a life cycle are repeated. There is no first or last stage.");
SC.nomore = ph("9 · \"What if a plant had no more seeds at all?\"", "The garden. Momo big (thinking), Basil big (proud, a thought bubble: a shop shelf of seed packets, with a ? on it); Heart's line: the loop board in the corner fades one stage at a time (no seeds: no young plants: no adult plants: an empty loop, a soft sad note), then comes back.");
SC.lcbank = (t, s) => lcPH(t, s, { title: "Singapore's seed bank (the Botanic Gardens, 2019)", v: "v_bank", verdict: [`SEEDS KEPT SAFE`, GOODC], fx: 960, fy: 560, setNote: "the garden (the camera pushes into a small picture of the seed bank on a card Pip holds up)",
  beats: [["bankin", "the seed bank: a clean room, a scientist's gloved hands"], ["kw_seed_bank", "SEED BANK pops"], ["dry", "seeds dried on a tray"], ["jars", "jars with labels"], ["cold", "the jars go into a very cold room (frost, a thermometer)"], ["again", "one jar, a seed, a young plant growing from it"], ["v_bank", "verdict"]],
  notes: ["The room fills the panel: trays of small seeds drying; glass jars with hand-written labels (plant names, dates); a big steel cold room door with frost at the edges. Show SMALL seeds (beans, grains, little round seeds), NOT mango seeds (mango seeds cannot be dried and frozen). Gloved hands with four fingers and a thumb.",
    "On Momo's last line: one jar opens years later and a seed grows into a young plant (a quick before/after). A buddy's FACE peeks in: Pip (nod), Basil (surprised at the cold, shivering), Momo (relieved smile). Small print: A real place: the Seed Bank at the Singapore Botanic Gardens."] });
SC.mark2 = (t, s) => markScene(t, s, { id: "j1102", sayId: "j1101", who: "momo", n: "2 of 2", text: "A seed bank stores seeds safely until they are needed.", keys: ["seed", "bank", "stores", "safely", "needed"], size: 70, y: 250, footer: FOOT });
SC.chant = (t, s) => chantScene(t, s, "c1003", { sayId: "u1002", size: 52, x: 620, y0: 260, dy: 110, xs: [230, 560, 890], bh: 360, tx: 1180, ty: 520, sayX: 620, sayY: 600,
  board: (tt, flash) => TF(1460, 900, 1, `<rect x="-260" y="-220" width="520" height="400" rx="30" fill="#FFF8EA" stroke="${P.ink}" stroke-width="4"/>` + T(0, -10, "our mango's life cycle", 36, P.ink) + T(0, 40, "(Stage 2: the loop board; flash " + flash.map((f) => (f > .3 ? 1 : 0)).join("") + ")", 24, P.ink, { w: 500 })) });
/* 11 · score hand, the weaver ant (lizReveal) and Basil's fun fact panel: a leaf nest sewn with silk (ff_nest), a worker holding a larva
   like a glue stick (ff_baby), an ant on guard on a mango (ff_guard) */
SC.final = (t, s) => { const L = "j1201"; return finalScene(t, s, L, 1, [[s.t0, null, 1], [W(L, "three") - .1, null, 3]]); };
SC.liz = (t, s) => { const L = "j1202", tq = W(L, "it") - .1;
  return lizReveal(t, s, L, gardenPH(t), ANT[0], ANT[1], tq, "It was on a leaf of the old mango tree!", -120, 160, 80, 2.0, { from: () => SC.final(SCN.final.t1 - .04, SCN.final), tell: "j1204",
    fact: { id: "j1203", at: [1300, 560], w: 960, h: 420, items: FF([["ff_nest", "a nest of leaves, sewn together", "DRAW: a leaf nest high in the mango tree, the leaves joined by fine white silk"], ["ff_baby", "the thread comes from their babies", "DRAW: a worker ant holding a larva to the leaf edge, a silk thread"], ["ff_tree", "they live in mango trees", "DRAW: the leaf nest high in a mango tree, mangoes hanging below"]]) } }) + smallPrint(t, s.t0 + .5, ANT_RULE); };
/* 12 · the dare for Episode 16 (the little pond: tadpoles). Stage 2: model ep14/p2.js SC.dare: ONE set of three big numbered picture cards */
SC.dare = (t, s) => phScene(t, s, "12 · The dare for Episode 16", ["MK pond: Momo points at the little pond: tiny tadpoles wriggle among the lily pads (cute, alive, free). MK dareIn: three big numbered picture cards slide in low: 1 a fish · 2 a frog · 3 a lizard (each drawn big, the difference obvious), the banner NEXT · What will the tadpole grow into?, the ?, Lock in your answer!. Basil big at the left, hopeful, on his joke. Full staging: SCENES_TODO.md."])
  + NEXT_CARDS.map((c, i) => { const t0 = MK("dareIn") + .5 + i * .25; return t < t0 ? "" : TF(640 + i * 350, 860, .45 * spring(t, t0, .45), ansCard(i + 1, c, { w: 430, h: 290, size: 50 })); }).join("") + HUD(t);
SC.nyk = (t, s) => nykScene(t, s, TF(960, 900, 1, `<rect x="-220" y="-180" width="440" height="300" rx="30" fill="#FFF8EA" opacity=".9"/>` + T(0, -20, "the loop board", 40, P.ink) + T(0, 30, "(Stage 2)", 26, P.ink, { w: 500 })), { bx: [220, 1720, 1400], hx: 470 });
})(); }
