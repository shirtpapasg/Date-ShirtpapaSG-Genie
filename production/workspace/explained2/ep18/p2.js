// p2.js: PART 2, "Which Came First, the Chicken or the EGG?": the hen on her nest, Round 1 (which came first? neither), be an egg (round and
// back to an egg), the loop (REPEATED, NO FIRST OR LAST STAGE; Mark Sentence 5.16), the Showdown (Momo's homework: the mosquito and the
// mealworm beetle both have four stages), the two larvae (PHYSICAL FEATURES; Mark Sentence 5.12), why life cycles matter (the butterfly lays
// an egg; 5.17; the Cycles theme closes), the chant, the honeybee, the dare into EP19 (a magnet, a steel pin and a copper wire).
// Segments 1-15 of ../p3_ep18_script.md section 5 (version 1, 23 Nov 2026).
// STAGE 1 (setup): shared routines WIRED (the calm 3-picture recap frame, the game as ONE smooth push-in onto the honeybee, Basil's goal
// cards, Round 1's lock-in with THREE numbered cards, the look-closer frames (lcPH), the book strip 5.17, both Mark Sentences, the Showdown
// card, the chant, the score hand, the honeybee's reveal with its fun-fact panel, the dare's three cards, the read-along, "Now you know!");
// every scene with new art is a phScene placeholder. STAGE 2 draws them (SCENES_TODO.md: the full staging per scene and per line).
if (PART === 2) { (() => {
const L1 = "d401";
// the scores (script section 3): Round 1 1 : 1 (Pip and Momo right: the Buddies score), Showdown 3 : 1 (built on Momo's mistake: no point)
SCORE.push([MK("coin1") - .1, 1, 1]);
SCORE.push([MK("coin2") - .1, 3, 1]);
const FOOT = "P3 · Life Cycles of Animals · Comparing life cycles";
const ph = (title, ...notes) => (t, s) => phScene(t, s, title, notes.concat(["Full staging: SCENES_TODO.md."])) + HUD(t);

/* 1 · "Last time...": three pictures from Part 1, one at a time, centred and large, a gentle push-in, one label each (>= 2.5 s each). WIRED frame */
SC.lasttime = (t, s) => { const tb = [s.t0, MK("pic2") - .2, MK("pic3") - .2], i = t >= tb[2] ? 2 : t >= tb[1] ? 1 : 0, labs = ["Frog and mosquito: same and different", "Three stages and four", "Which came first?"],
    draws = ["the COMPARE FRAME with both strips filled", "the two dot counters ●●● and ●●●● beside the frog and mosquito loops", "the hen on her nest with a ?"], u = t - tb[i], z = 1 + .05 * eio(u / 4), k = ramp(t, tb[i], .5);
  return bg("stage2") + OP(ramp(t, s.t0, .3), T(960, 110, "Last time…", 60, "#fff", { w: 600 }))
    + OP(k, TF(960, 540, z, `<g filter="url(#drop)"><rect x="-520" y="-300" width="1040" height="600" rx="36" fill="url(#gPaper)"/></g>` + T(0, 0, "(Stage 2: " + draws[i] + ")", 32, P.ink, { w: 500 })))
    + OP(k, TF(960, 930, spring(t, tb[i] + .1, .4), tpill(0, 0, labs[i], 46, P.sun, P.ink, { w: 700 }))) + HUD(t); };
SC.place = ph("2 · The garden's edge by the void deck, mid-morning", "MK henIn: the hen stands, turns her eggs with her beak, and sits again, on her straw nest under a low bush. A planter bed of IXORA (red and orange clusters), the lime plant in its big pot, the void deck and the LIFE CYCLE DAY board behind. Location pill: A community garden, Singapore · morning. No buddies yet. The honeybee on an ixora flower (the intro spot: the game pushes in here; never used again).");
SC.game = (t, s) => gameScene(t, s, ["d201a", "d201b", "d201c"], false, { world: (tt) => gardenPH(tt), A: BEE, T: [1400, 470], Z: 2.6, ly: -150, qx: 1730, qy: 430 }) + smallPrint(t, LT("d201c"), LOOK_RULE);
SC.goals = (t, s) => goals3(t, s, [["No first or last stage", ""], ["Same stages, still different", ""], ["Why life cycles matter", ""]], ["d301", "d302", "d303", "d304"], "basil");

/* 4 · Round 1: Basil's question. THREE big numbered picture cards (the egg · the chicken · neither: it goes round), the clue labels every egg
   came from a hen · every hen came from an egg ON TOP of the ring; the ring's picture: the hen on her nest, the eggs showing (ringPH). Basil
   leads (thinking, then worried through the countdown) */
SC.r1 = (t, s) => lockN(t, { t0: W(L1, "which") - .35, cards: ["The egg", "The chicken", "Neither: it goes round"], clues: [["every egg came from a hen", W(L1, "egg")], ["every hen came from an egg", W(L1, "chicken")]], csize: 34, lead: "basil",
  pics: ["a big egg", "a hen", "a small loop: egg, chick, hen"].map((x) => T(0, 108, "(" + x + ")", 24, P.ink, { w: 500 })), q: "Which came first?", tq: W(L1, "which") - .1,
  tc: [W(L1, "one", 1), W(L1, "two"), W(L1, "three")], ring0: MK("ring0_r1"), dur: 5, lock: "d402", obj: ringPH("the hen on her straw nest, the pale eggs showing under her"),
  picks: [{ who: "basil", id: "d403", word: "1" }, { who: "pip", id: "d404", word: "3" }, { who: "momo", id: "d405", word: "3" }] });

/* 5 · BE AN EGG (the journey; the buddies ride along, tucked in the nest's straw: common.js riders) */
SC.waitw = ph("5 · Be an egg! (the glide in under the hen)", "Pill Be an egg! The camera glides down under the hen's warm feathers; a soft golden wipe. The buddies wave the viewer off (goodbye), then shrink (a pop each) and follow. The shelf slides aside. The honeybee on a flower of the bush over the nest as the camera passes (new spot).");
SC.shrink = (t, s) => phScene(t, s, "5 · BE AN EGG (first person, present tense)", ["MK jegg: YOU are an egg in the nest: warm golden light through the hen's feathers above, straw all round, two other eggs like hills beside you. MK jhatch: crack! light pours in. MK jchick: you are a fluffy chick (your own little yellow wings at the frame's edges), the hen's big friendly face above. MK jhen: speeded up: you peck and grow, fluffy wings turn to feathers, the world gets smaller round you. MK jlay: one morning, in the nest, a new egg lies under you. MK jagain: the view glides down to the new egg; a soft golden circle of arrows draws itself round the frame and keeps turning (no number, no start).",
  "The three buddies ride along, shrunk, tucked in the nest's straw at the lower edges (riders), peeping out. Calm pad, Heart soft. Full staging: SCENES_TODO.md."])
  + youTag(t, MK("jegg"), "You: an egg") + feelTag(t, MK("jchick"), MK("jhen") - .1, "a chick", 160) + feelTag(t, MK("jhen"), MK("jlay") - .1, "an adult hen", 160) + feelTag(t, MK("jlay"), MK("jagain") + 2.5, "a new egg", 160)
  + speeded(t, MK("jhatch"), MK("jagain")) + riders(t, s, { tin: MK("jegg") + .6, h: 200, at: { pip: [200, 1044], basil: [1720, 1050], momo: [380, 1040] } });
SC.pullout = ph("5 · Pull back out to the garden", "Whoosh back out to the garden (0.6 s): the hen on her nest. The buddies pop back (a hop each).");

/* 6 · the answer: three, neither. The three cards small along the top: card 3 glows at ansglow (WIRED), an x chip on card 1 and by Basil */
SC.eggans = (t, s) => ph("6 · The answer is three: neither", "The garden: the hen on her nest. The three numbered cards small along the top (wired): card 3 glows (ansglow), an x chip on card 1 and by Basil; the coin (coin1: the Buddies also score, two of three were right). Pip big at the right (h ~520), Momo big at the left (h ~500): arms crossed (right); Basil mid-ground centre (h ~380 x .94): oops (wrong). The honeybee on the bench's armrest, resting (new spot).")(t, s)
  + ["The egg", "The chicken", "Neither: it goes round"].map((c, i) => TF(640 + i * 320, 170, .3, ansCard(i + 1, c, { w: 430, h: 290, size: 46, lit: i === 2 && t >= MK("ansglow") ? 1 : 0 }))).join("");

/* 7 · [LOOK CLOSER] the loop: a finger can start anywhere; the day-and-night loop (EP14's art) beside it; REPEATED and NO FIRST OR LAST
   STAGE pop inside (lib.js o.at); Pip teaches; Mark Sentence 1 (Basil, 5.16) */
SC.lcloop = (t, s) => lcPH(t, s, { title: "The loop: put your finger anywhere", v: "v_loop", verdict: [`NO FIRST OR LAST STAGE`, GOODC], fx: 960, fy: 560,
  beats: [["finger", "a child's hand (four fingers and a thumb) touches the loop at the chick and follows the arrows round, back to the chick; then at the hen, round again"], ["daynight", "the day-and-night loop (EP14's sun and moon on a turning circle) turns at the right third"], ["kw_repeated", "REPEATED pops (a small ↻ by it)"], ["kw_no_first_or_last_stage", "NO FIRST OR LAST STAGE pops; a grey Stage 1 tag pops and is crossed out"], ["v_loop", "verdict"]],
  notes: ["The CHICKEN'S LOOP from the LIFE CYCLE DAY board FILLS the left two thirds: an egg · a chick · a hen, curved arrows all one way, NO numbers. A child's hand (four fingers and a thumb) touches it anywhere and follows the arrows round, leaving a soft glowing trail. The right third: EP14's day-and-night loop turning (reuse its art from ../ep14/).",
    "A buddy's FACE peeks in from a lower corner: Basil first (thinking: his idea is tested), Momo (talking, a happy smile as day and night turn), Pip (teaching: repeated means again and again)."] });
SC.mark1 = (t, s) => markScene(t, s, { id: "d706", sayId: "d705", who: "basil", n: "1 of 2", text: "The stages in a life cycle are repeated. There is no first or last stage.", keys: ["repeated", "no", "first", "last", "stage"], size: 70, y: 250, footer: FOOT });

/* 8 · Showdown: Momo's homework, the mosquito and the mealworm beetle (Stage 2: model ../ep16/p2.js SC.show / SC.fix: the ring big and
   central with the three line numbers as the choice cards, the lines lit as she reads them (l1..l3), line 3 struck (strike) and rewritten in
   green (rewrite); the beetle's faint pupa tile glows) */
SC.show = ph("8 · Showdown: Momo's homework, the mosquito and the mealworm beetle", "Momo's homework sheet on an easel by the void deck, LARGE, titled The mosquito and the mealworm beetle, the two loops small at the top (the mosquito's four tiles; the beetle's loop with its PUPA tile faint and easy to miss). Three ruled lines, each with a small drawing: 1 In both, the young do not look like the adult. (a wriggler ≠ a mosquito; a mealworm ≠ a beetle) · 2 The mosquito larva lives near the water surface, but the beetle larva lives on land. (a wriggler at a water line; a mealworm on bran) · 3 The mosquito has four stages, but the beetle has three. (●●●● and ●●●). The lines light as Momo reads them (MK l1, l2, l3). The YOU ring (5 s) big and central with the three line numbers as the ONE set of numbered cards; only Momo at the side (thinking: her face stands in for worried). LOCKED IN!; Basil reveals. The honeybee on top of Momo's easel (new spot; not in the countdown).");
SC.fix = (t, s) => ph("8 · The fix", "MK strike: line 3 struck through; MK rewrite: rewritten in green Both have four stages: the egg, the larva, the pupa and the adult. The beetle's faint pupa tile glows bright (●●●●). The coin +2 (coin2). Momo big at the left by her easel (a nod and a smile at the green rewrite); Basil and Pip at the right. The honeybee on the watering can's spout by the easel (new spot).");

/* 9 · Momo's own fix and her real question at the mealworm tub; [LOOK CLOSER] the two larvae: PHYSICAL FEATURES pops inside (lib.js o.at);
   Basil teaches; Mark Sentence 2 (Pip, 5.12 second sentence) */
SC.beetle = (t, s) => ph("9 · \"So how are they different?\" (the class mealworm tub)", "The void deck table: a small clear tub of oat bran with MEALWORMS in it (the lid with air holes), beside a card of a jar of still water with a wriggler drawn on it (no real mosquito water at the void deck). Momo big at the left (h ~500) by the tub (oops while she fixes her own count, then thinking: her real question); Basil big at the right (h ~480 x .94). Push in on the tub. The honeybee on the rim of the tub's lid (new spot).")(t, s)
  + smallPrint(t, s.t0 + .4, MEAL_RULE);
SC.lcbeetle = (t, s) => lcPH(t, s, { title: "Same stages, still different: the two larvae", v: "v_beetle", verdict: [`SAME STAGES, STILL DIFFERENT`, GOODC], fx: 960, fy: 600,
  beats: [["pupa", "across the top: both loops, four tiles each (●●●● and ●●●●), green chip same number of stages"], ["kw_physical_features", "PHYSICAL FEATURES pops"], ["wrig", "the wriggler: thin · hangs at the water surface (blue labels, joined)"], ["meal", "the mealworm: golden and hard · crawls on land (brown labels, joined); orange ≠ between them"], ["v_beetle", "verdict"]],
  notes: ["Two halves, both BIG: LEFT the mosquito's young, a wriggler hanging at the water surface (a cut-away of still water); RIGHT the beetle's young, a MEALWORM crawling on bran (golden-brown, shiny, hard, segmented, six tiny legs at the front). A band across the top first: both loops with four tiles each.",
    "A buddy's FACE peeks in from a lower corner: Momo first (thinking: her question), Basil (teaching, pointing at each larva), Momo again (cheer at the verdict: her mistake is fixed and a term learnt)."],
  over: (tt) => cmpChip(tt, MKS("pupa"), 960, 230, 0, "same number of stages") });
SC.mark2 = (t, s) => markScene(t, s, { id: "d906", sayId: "d905", who: "pip", n: "2 of 2", text: "Observable characteristics include the number of stages and the physical features of the animals.", keys: ["observable", "characteristics", "number", "stages", "physical", "features"], size: 60, y: 235, footer: FOOT });

/* 10 · why life cycles matter: EP17's butterfly lays an egg on the lime plant; the book's 5.17 on a cream strip (Heart reads it, >= 3.5 s:
   WIRED); the picture model (too few plants, the loop dims; new plants, it glows); the OUR CYCLES THEME board (C1 to C3) */
SC.closure = (t, s) => ph("10 · Why life cycles matter: the butterfly lays an egg (the Cycles theme closes)", "The lime plant in its big pot (EP17's): MK butterfly: the LIME BUTTERFLY (black with cream-yellow patches, red-and-blue eyespots) flutters in and lands on a young leaf; MK lay: she curls her body and leaves ONE tiny round egg on the leaf's tip. MK fewer: a small picture model: the butterfly loop beside a row of lime plants; plants fade away one by one and the loop's tiles dim; MK plant: new lime plants pop up in pots and the loop glows and turns again. MK theme: the OUR CYCLES THEME board slides in at the left: C1. What makes up a cycle? → a repeated pattern of change · C2. How does a cycle help us predict events and processes? → we know what comes next · C3. Why are cycles important to life? → living things of the same kind can continue. Momo big at the left (pointing at the butterfly as it lays), Pip big at the right, Basil mid-ground. The honeybee on the rim of the lime plant's big pot (new spot).")(t, s)
  + lcStrip(t, "d1003", "Life cycles ensure that living things of the same kind can continue to live on Earth.");
SC.chant = (t, s) => chantScene(t, s, "c1003", { sayId: "u1002", size: 50, x: 620, y0: 260, dy: 110, xs: [230, 560, 890], bh: 360, tx: 1180, ty: 520, sayX: 620, sayY: 600,
  board: (tt, flash) => TF(1460, 900, 1, `<rect x="-280" y="-230" width="560" height="420" rx="30" fill="#FFF8EA" stroke="${P.ink}" stroke-width="4"/>` + T(0, -20, "the COMPARE FRAME", 34, P.ink) + T(0, 26, "above; the chicken's loop below", 24, P.ink, { w: 500 }) + T(0, 66, "(Stage 2; flash " + flash.map((f) => (f > .3 ? 1 : 0)).join("") + ")", 24, P.ink, { w: 500 })) });

/* 12 · score hand, the honeybee (lizReveal onto a white flower of the lime plant: the REVEAL spot, never the intro ixora) and Pip's fun-fact
   panel: a queen on a honeycomb (ff_queen), the comb filling with eggs past 1000 (ff_eggs) */
SC.final = (t, s) => { const L = "d1201"; return finalScene(t, s, L, 1, [[s.t0, null, 1], [W(L, "three") - .1, null, 3]]); };
SC.liz = (t, s) => { const L = "d1202", tq = W(L, "it") - .1;
  return lizReveal(t, s, L, gardenPH(t, BEE_R), BEE_R[0], BEE_R[1], tq, "It was on a flower of the lime plant!", -120, 160, 80, 2.0, { from: () => SC.final(SCN.final.t1 - .04, SCN.final), tell: "d1204",
    fact: { id: "d1203p", at: [1300, 560], w: 960, h: 420, items: FF([["ff_queen", "a queen honeybee", "DRAW: a queen honeybee (a longer body, a tiny crown sticker for fun) on a honeycomb"], ["ff_eggs", "more than 1000 eggs in one day!", "DRAW: the comb's cells filling with tiny eggs one after another, a counter rising past 1000, a little sun icon (in one day)"]]) } }) + smallPrint(t, s.t0 + .5, LOOK_RULE); };
/* 13 · the dare for Episode 19 (the void deck: Basil's bar magnet holds a card on the LIFE CYCLE DAY board's metal frame; a steel pin and a
   copper wire on the table). Stage 2: model ../ep17/p2.js SC.dare: ONE set of THREE big numbered picture cards slides in low */
SC.dare = (t, s) => phScene(t, s, "13 · The dare for Episode 19", ["The void deck: the LIFE CYCLE DAY board's metal frame; Basil's red-and-blue BAR MAGNET holds a card on it. On the table: a STEEL PIN and a short piece of shiny orange COPPER WIRE. MK dareIn: THREE big numbered picture cards slide in low (wired): 1 The steel pin · 2 The copper wire · 3 Both; the banner NEXT · Which will the magnet pull?, Lock in your answer!. Basil big at the left (a proud smile by his magnet); Momo and Pip at the right (thinking: a question has just been asked; no hints). The honeybee is not shown (revealed). Full staging: SCENES_TODO.md."])
  + NEXT_CARDS.map((c, i) => { const t0 = MK("dareIn") + .5 + i * .25; return t < t0 ? "" : TF(620 + i * 340, 860, .42 * spring(t, t0, .45), ansCard(i + 1, c, { w: 430, h: 290, size: 50 })); }).join("") + HUD(t);
SC.nyk = (t, s) => nykScene(t, s, TF(960, 900, 1, `<rect x="-240" y="-180" width="480" height="300" rx="30" fill="#FFF8EA" opacity=".9"/>` + T(0, -20, "the LIFE CYCLE DAY board", 34, P.ink) + T(0, 30, "(Stage 2: complete)", 26, P.ink, { w: 500 })), { bx: [220, 1720, 1400], hx: 470 });
})(); }
