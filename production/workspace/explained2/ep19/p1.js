// p1.js: PART 1, "Will a Magnet Pull a COPPER Wire? What a Magnet Really Is": EP18's dare answered (one, the steel pin), a brand-new theme
// (INTERACTIONS), what a magnet is (the lodestone 6.1; the cut-away: usually iron or steel; MAGNET; the six shapes; Mark Sentence 6.2), be a
// steel pin (the tug, the click, the copper wire that never moved), the answer, HOLD ON! (Momo: not lifted, so not attracted: Mum's iron wok;
// the fridge door), is a magnet sticky? (slow motion: ATTRACT, MAGNETIC MATERIALS; Mark Sentence 6.3), the pigeon, the cliffhanger (copper is
// a metal: why does the magnet ignore it?). Segments 1-13 of ../p3_ep19_script.md section 4 (version 1, 23 Nov 2026).
// STAGE 1 (setup): the shared routines are WIRED (the calm recap of EP18's dare with its THREE cards, the title slam, the game as ONE smooth
// push-in onto the pigeon (common.js gameScene), the goals read by Pip, the countdown, Round 1's lock-in with the dare's three cards and the
// clue labels on top of the ring, the two Mark Sentences (Basil, Momo), the LOOK-CLOSER frames (lcPH inside the real lookCloser) with the
// book strip 6.1, the journey's tags and riders, the MAGNET TEST TABLE's tray placeholder (tests.js trayPH: the halves fill on their marks),
// the score hand, the pigeon's smooth reveal with its fun-fact panel, the read-along, "Now you know!"). Every scene with new art is a phScene
// placeholder. STAGE 2 (Fable) draws them: SCENES_TODO.md has the full staging per scene and line.
if (PART === 1) { (() => {
const L1 = "m501";
// the scores (script section 3): Round 1 1 : 0 (only Momo right: the Buddies score nothing), HOLD ON! 2 : 0
SCORE.push([MK("coin1") - .1, 1, 0]);
SCORE.push([W("m903", "one") - .1, 2, 0]);
const FOOT = "P3 · Interactions · Properties of Magnets";
const ph = (title, ...notes) => (t, s) => phScene(t, s, title, notes.concat(["Full staging: SCENES_TODO.md."])) + HUD(t);
const qMark = (t, t0, x, y, r = 50) => t < t0 ? "" : TF(x, y, spring(t, t0, .5) * (1 + .05 * Math.sin(t * 4)), `<g filter="url(#dropS)"><circle r="${r}" fill="url(#gSun)"/></g>${T(0, r * .52, "?", r * 1.56, P.ink)}`);
const slamFit = (y, txt, col, k) => slamLine(y, txt, Math.min(170, 170 * 1720 / tw(txt, 170, 700, "Fredoka", 4)), col, k);
const CBX = [560, 960, 1360];
const dareRow = (t, t0, y = 900, k = .62) => [0, 1, 2].map((i) => { const a = t0 + i * .3; if (t < a) return ""; const [x, d] = slideX(t, a, .7, 2500, CBX[i], y + 120); return d + TF(x, y, k, dareCard3(i)); }).join("");

/* 1 · silent cold open: the void deck, Saturday afternoon (EP18's); the INTERACTIONS banner on EP18's easels; the MAGNET TEST TABLE with its two
   empty halves (trayPH); Basil lifts his magnet off the banner's metal frame (magOff); the pin and the wire set down (pinIn); EP18's three
   dare cards slide in low (cardsIn, WIRED); the buddies pop in (budsIn) */
SC.cold = (t, s) => phScene(t, s, "1 · Cold open: the MAGNET TEST TABLE at the void deck (no voice)", ["Our block's VOID DECK on Saturday afternoon (EP18's): stone tables and stools, letterboxes, a ceiling fan turning, the lift lobby at the back, a bicycle rack and the playground outside. EP18's easels and metal frame carry the new banner OUR NEW THEME: INTERACTIONS (I1, I2 printed small). The MAGNET TEST TABLE: a big shallow tray, ATTRACTED (green) and NOT ATTRACTED (blue), both empty; a basket of the book's objects.",
  "MK magOff: Basil lifts his red-and-blue BAR MAGNET off the banner's metal frame and sets it by the tray. MK pinIn: a STEEL PIN and a short orange COPPER WIRE are set down side by side. MK cardsIn: EP18's three dare cards slide in low (wired). MK budsIn: Momo (waving hello), Basil, Pip pop in. Pill: A void deck, Singapore · Saturday afternoon. The pigeon on the grey pipe under the ceiling (before the game). Full staging: SCENES_TODO.md."])
  + trayPH(t, 960, 640, .5) + (t >= MK("pinIn") ? TF(960, 760, spring(t, MK("pinIn"), .4) * .5, TF(-120, 0, 1, pin18()) + TF(140, 0, 1, wire18())) : "") + dareRow(t, MK("cardsIn"));

/* 2 · "Last time...": EP18's dare, word for word. ONE calm picture: the three dare cards side by side, a gentle push-in, the big ?, each card
   steps forward and lights while Heart says it (>= 2.5 s each). WIRED */
SC.lasttime = (t, s) => { const L = "m203", tc = [W(L, "one"), W(L, "two"), W(L, "three")], z = 1 + .04 * eio((t - s.t0) / 8), k = ramp(t, s.t0 + .05, .5), cur = tc.filter((x) => t >= x - .15).length - 1;
  let cards = ""; [0, 1, 2].forEach((i) => { const fw = cur === i ? ss(tc[i] - .15, tc[i] + .25, t) : (cur > i && i < 2 ? 1 - ss(tc[i + 1] - .15, tc[i + 1] + .25, t) : 0);
    cards += TF(560 + i * 400, 600 + 14 * (1 - spring(t, s.t0 + .2 + i * .15, .45)), .95 * (1 + .1 * fw), dareCard3(i, { pulse: cur === i ? .9 : pulse(t, tc[i], .04, .9) })); });
  return bg("stage2") + OP(ramp(t, s.t0, .3), T(960, 110, "Last time…", 60, "#fff", { w: 600 }))
    + OP(k, `<g transform="translate(960 540) scale(${n2(z)}) translate(-960 -540)">${cards}</g>`
      + qMark(t, W("m202", "which") - .1, 960, 260)
      + TF(960, 1000, spring(t, W("m202", "which") - .1, .4), tpill(0, 0, DARE_LABEL, 40, P.sun, P.ink, { w: 700 }))) + HUD(t); };
SC.back = (t, s) => phScene(t, s, "2 · Back at the void deck: the MAGNET TEST TABLE", ["The void deck (the cold open's set): a slow drift along the test table; the pin and the wire in front of the tray; EP18's three cards along the table (wired); the buddies big: Pip hides one hand behind his back, Basil a secret fist, Momo a sure little smile (no pose sprites: listening). Pill: Hold on to your answer! (wired). The pigeon still on the ceiling pipe (before the game). Full staging: SCENES_TODO.md."])
  + trayPH(t, 960, 640, .5) + TF(960, 760, .5, TF(-120, 0, 1, pin18()) + TF(140, 0, 1, wire18())) + dareRow(t, -9)
  + (t >= LT("m204") - .1 ? TF(960, 470, spring(t, LT("m204") - .1, .4), tpill(0, 0, "Hold on to your answer!", 40, P.sun, P.ink, { w: 700 })) : "");
// the title slam over the dimmed void deck: WHICH ONE WILL IT PULL? (white) then MAGNET VS COPPER WIRE (sun yellow). WIRED
const TITLE = (k1, k2) => slamFit(400, "WHICH ONE WILL IT PULL?", "#fff", k1) + slamFit(610, "MAGNET VS COPPER WIRE", P.sun, k2);
SC.title = (t, s) => { const u = t - MK("title"), dim = clamp(u / .2); return lcSet(t, s, "back") + `<rect width="1920" height="1080" fill="${P.night}" opacity="${n2(.78 * dim)}"/>` + TITLE(slamK(u, .05), slamK(u, .55)) + HUD(t); };

/* 3 · a new theme: the camera glides up to the INTERACTIONS banner (its two questions readable about 3 s; a small magnet icon spins once), then
   the game: ONE smooth push-in from the void deck straight onto the pigeon on the ceiling pipe (common.js gameScene). Stage 2: R.world = the
   drawn void deck, A = the pigeon's spot in it (the INTRO spot: never used again). WIRED */
SC.theme = (t, s) => phScene(t, s, "3 · A brand-new theme: OUR NEW THEME: INTERACTIONS", ["The void deck: the camera glides up to the hand-painted banner on EP18's easels, OUR NEW THEME: INTERACTIONS, and its two printed questions in the book's words, readable and held about 3 s: I1. How do magnets interact with different things? · I2. How do the interactions of magnets affect us in our daily life? MK theme: a small magnet icon spins once beside the title (a bright two-note sting).",
  "Pip big at the right by the easel (h ~500), looking up at the banner; Basil and Momo at the left. Basil holds up his magnet, proud (a smile; no pose swap). Then the camera glides down towards the ceiling pipe (the game's push-in starts there). The pigeon on the ceiling pipe (still before the game). Interact is NOT spoken in Part 1 (script: rules bent 3). Full staging: SCENES_TODO.md."]) + HUD(t);
SC.game = (t, s) => gameScene(t, s, ["m302", "m303b", "m304"], false, { world: (tt) => deckPH(tt), A: PIGEON, T: [1400, 470], Z: 2.4, dim0: 0, ly: -150, qx: 1730, qy: 430 }) + smallPrint(t, LT("m304"), PIGEON_RULE);
SC.goals = (t, s) => goals3(t, s, [["What a magnet is", ""], ["What attract means", ""], ["Magnetic materials", ""]], ["m401", "m402", "m403", "m404"], "pip");

/* 5 · Round 1: EP18's dare (a short 3 s ring). EP18's three cards as the ONE set of numbered picture cards; the clue labels both are metal ·
   a bar magnet ON TOP of the ring; the ring's picture: the bar magnet above the pin and the wire, big (ringPH: Stage 2 draws it). Basil leads
   (thinking after the question, worried through the countdown: lockN) */
SC.r1 = (t, s) => lockN(t, { cards: DARE_CARDS, clues: DARE_CLUES.map((c, i) => [c, W(L1, "which") + .15 * i]), lead: "basil", csize: 36, q: DARE_LABEL, tq: W(L1, "which") - .1,
  tc: [W(L1, "which"), W(L1, "pull"), W(L1, "show")], ring0: MK("ring0_r1"), dur: 3, lock: "m502",
  pics: [0, 1, 2].map((i) => darePic(i)),
  obj: ringPH("the red-and-blue bar magnet above a steel pin and a curl of copper wire, big"),
  picks: [{ who: "momo", id: "m503m", word: "1" }, { who: "pip", id: "m504p", word: "2" }, { who: "basil", id: "m505b", word: "3" }] });

/* 6 · Momo's question at the test table (is it plastic?), then [LOOK CLOSER] what is a magnet: the lodestone story (6.1 on a cream strip,
   WIRED), the cut-away window into Basil's magnet (grey metal under the paint), MAGNET pops (lib.js o.at), the six shapes in the book's order;
   Mark Sentence 1 (Basil, 6.2) */
SC.table = (t, s) => ph("6 · \"Is it made of plastic?\" (Momo at the test table)", "The void deck: the MAGNET TEST TABLE at its HOME (the stone table, centre, about half the frame high: the same in answer, holdon, sticky, cliff, nyk and Part 2). Basil holds up his bar magnet; the camera pushes in on it (the red and blue paint shiny and smooth, like a toy). Momo big at the left (h ~500; talking, then thinking: her real question); Basil big at the right holding the magnet; Pip mid-ground. The pigeon on the ledge above the letterboxes (new spot).")(t, s) + trayPH(t, 960, 700, .45);
SC.lcmagnet = (t, s) => lcPH(t, s, { title: "What is a magnet? The lodestone, the cut-away, the six shapes", v: "v_magnet", verdict: [`A MAGNET: USUALLY IRON OR STEEL`, GOODC], fx: 1240, fy: 380,
  beats: [["rock", "LEFT, a storybook frame: long ago, a person with an iron-tipped stick on a grassy hillside; the tip is tugged down onto a dark rough ROCK (small pull arrows)"], ["lodestone", "a magnifier on the rock: small iron nails cling to it; label a lodestone joined by a line"], ["inside", "RIGHT: Basil's bar magnet BIG; the paint curls back like a sticker: smooth GREY METAL inside; label metal inside: usually iron or steel; an x over a faded plastic-toy icon"], ["kw_magnet", "MAGNET pops (sun yellow)"], ["shapes", "the six shapes pop in a row along the bottom, each named: bar · U-shaped · button · rod · ring · horseshoe"], ["v_magnet", "verdict"]],
  notes: ["Two beats, each filling the panel: the lodestone story (warm, old, a storybook frame) and the cut-away into Basil's own magnet; then the six shapes in the book's order (U-shaped and horseshoe with their two tips coloured; the button a flat disc; the ring a flat ring; the rod a short round bar). The bar magnet's N and S are drawn, never spoken (EP20).",
    "A buddy's FACE peeks in from a lower corner: Momo first (thinking: her guess is tested), Pip (teaching the lodestone, a little surprised smile on \"Nobody made it\"), Momo again (surprised at the grey metal, then a sheepish smile: her guess was wrong), Basil (teaching the shapes; cheer at the verdict: a key word learnt)."],
  over: (tt) => lcStrip(tt, "m603", "A natural magnet is also called a lodestone.", { t1: LT("m604p") + 1.5 }) });
SC.mark1 = (t, s) => markScene(t, s, { id: "m609", sayId: "m608", who: "basil", n: "1 of 2", text: "A magnet is an object that is usually made of iron or steel.", keys: ["object", "usually", "made", "iron", "steel"], size: 70, y: 250, footer: FOOT });

/* 7 · BE A STEEL PIN (the journey; the buddies ride along, shrunk, on top of the eraser: common.js riders). Tags WIRED */
SC.waitw = ph("7 · Be a steel pin! (the glide down to the test table)", "Pill Be a steel pin! The camera glides down to the test table, towards the steel pin beside the copper wire. The buddies wave the viewer off (goodbye), then shrink (a pop each) and follow. The shelf slides aside. The pigeon on the lamp post just outside the void deck as the camera passes (new spot).");
SC.shrink = (t, s) => phScene(t, s, "7 · BE A STEEL PIN (first person, present tense)", ["MK jtable: YOU are a steel pin lying on the test table (your own shiny tip at the bottom of the frame). At this size the copper wire beside you is a big shiny orange pipe (MK jpipe), the rubber eraser a pink hill, the wooden ruler a long road. MK jfar: the bar magnet at the far end of the table like a giant red-and-blue tower, sliding slowly closer; nothing moves (tag to scale: a pin). MK jtug: closer: you tremble; small pull arrows from you to the magnet; a soft glow on the gap. MK jslide / jclick: whoosh! you slide across the gap and CLICK onto the END of the magnet. MK jlift / jlook: the magnet lifts you; you hang from its end and look down: the copper wire, the eraser and the ruler lie exactly where they were (a green tick by you: pulled; a blue tag by the wire: not pulled).",
  "The three buddies ride along, shrunk (h ~170), on top of the eraser at the lower edges (riders). Calm pad, Heart soft. The camera IS the pin: a tremble, a slide, a click, a lift; never a cut. Full staging: SCENES_TODO.md."])
  + youTag(t, MK("jtable"), "You: a steel pin") + feelTag(t, MK("jfar") + .3, MK("jtug") - .2, "to scale: a pin", 160) + feelTag(t, MK("jclick"), MK("jlift") - .1, "click!", 160)
  + matChip(t, MK("jlook") + .3, 760, 640, 0, "pulled") + matChip(t, MK("jlook") + .6, 1220, 900, 1, "not pulled")
  + riders(t, s, { tin: MK("jtable") + .6, h: 200, at: { pip: [200, 1044], basil: [1720, 1050], momo: [380, 1040] } });
SC.pullout = ph("7 · Pull back out to the void deck", "Whoosh out to the void deck, normal size (0.6 s): the pin hanging from the end of Basil's magnet; the copper wire still on the table. The buddies pop back (a hop each).");

/* 8 · the answer: one, the steel pin. Only Momo (right) explains; Heart tells Pip why light is not the reason; the pin drops into the green
   half (trayPin), the wire is slid into the blue half (trayWire). WIRED: EP18's three cards small, the tick, the tray */
SC.answer = (t, s) => ph("8 · The answer is one: the steel pin", "The void deck: the MAGNET TEST TABLE at its home; the pin hangs from the magnet over the green ATTRACTED half and drops into it (MK trayPin); the copper wire is slid into the blue NOT ATTRACTED half (MK trayWire). EP18's three cards small along the top (wired): card 1 the green tick at ansglow; x chips on cards 2 and 3; the coin at coin1 (only YOU). Momo big at the right (h ~500): arms crossed (right); Basil big at the left (h ~480 x .94) and Pip mid-ground: oops (wrong). A push to the tray as Momo explains; ease back. The pigeon on top of the void deck's notice board (new spot).")(t, s)
  + [0, 1, 2].map((i) => TF(660 + i * 300, 175, .42, dareCard3(i, { lit: i === 0 && t >= MK("ansglow") ? 1 : 0 }))).join("")
  + [1, 2].map((i) => tagAt(t, MK("ansglow") + .3 + .15 * i, 660 + i * 300, 280, 1, "not pulled", 26)).join("")
  + trayPH(t, 960, 700, .55);

/* 9 · HOLD ON! Momo: "the magnet could not lift the wok, so the wok is not attracted" (Stage 2: model ../ep16/p1.js SC.holdon: the HOLD ON!
   stamp, the YOU ring 5 s with crossed arms, the clue labels too heavy to lift · not attracted? ON TOP of the ring, the bell, the coin; then
   Pip lets go: it holds on (letgo); the fridge inset (fridge)) */
SC.holdon = ph("9 · HOLD ON! Momo: \"the wok is not attracted\"", "MK wok: Momo brings MUM'S IRON WOK (dark grey, black-seasoned, cold and clean) to the test table on a folded towel; she holds the magnet on top and tries to lift: the wok does not rise (a strain wobble). Her note card on a small easel: The magnet could not lift it. NOT ATTRACTED! The HOLD ON! stamp; the YOU ring (5 s, crossed arms) big and central with the magnet on the wok as its picture and the clue labels too heavy to lift · not attracted? on top; only Momo at the side (thinking: Heart's line is a question to her; Momo has no worried painting). After the bell: MK letgo: Pip holds the magnet against the side of the wok and lets go: it HOLDS ON (a soft clack; a green chip attracted!). MK fridge: a small inset of an HDB kitchen: a fridge magnet holds a child's drawing on the fridge door (an arrow: holds on). Small print: Ask an adult before you borrow things from the kitchen (wired). The pigeon on top of the INTERACTIONS banner's easel (new spot; not in the ring).")
  ;
const holdon0 = SC.holdon; SC.holdon = (t, s) => holdon0(t, s) + smallPrint(t, MK("wok"), KITCHEN_RULE) + matChip(t, MKS("letgo") + .6, 1300, 620, 0, "attracted!") + trayPH(t, 960, 760, .45);

/* 10 · Basil's question (is my magnet sticky?), then [LOOK CLOSER] slow motion: the pin moves BEFORE it touches; ATTRACT and MAGNETIC
   MATERIALS pop inside (lib.js o.at); Basil and Pip teach; Mark Sentence 2 (Momo, 6.3) */
SC.sticky = ph("10 · \"Is my magnet sticky?\" (Basil at the wok)", "The void deck: the test table at its home; the magnet still holding on to the side of the wok. Basil big at the left (h ~480 x .94), leaning close to the magnet (talking, then thinking: his real question); Momo and Pip at the right. Push in on the magnet on the wok. The pigeon on the rim of a big flower pot by the pillar (new spot).");
SC.lcattract = (t, s) => lcPH(t, s, { title: "Is a magnet sticky? Slow motion on the gap", v: "v_attract", verdict: [`ATTRACT MEANS PULL`, GOODC], fx: 960, fy: 620,
  beats: [["slow", "the bar magnet comes down towards a steel pin and an iron nail, in SLOW MOTION (tag slowed down)"], ["gap", "a magnifier on the gap: the pin starts to move BEFORE it touches, across a clear gap (dotted motion lines, pull arrows); click onto the END"], ["kw_attract", "ATTRACT pops (sun yellow) with = pull beside it"], ["steel", "label steel on the pin (green, joined)"], ["iron", "label iron on the nail (green, joined)"], ["kw_magnetic_materials", "MAGNETIC MATERIALS pops"], ["v_attract", "verdict"]],
  notes: ["The panel fills with ONE big beat: the magnet, the pin and the nail on the table, slowed down; a magnifier circle on the gap shows the pin lifting across a clear gap BEFORE it touches (nothing sticky is holding it); the pin and the nail click onto the magnet's END, never its middle.",
    "A buddy's FACE peeks in from a lower corner: Basil first (thinking: his idea is tested; then surprised: it moved before touching), Basil teaching (fixing his own idea), Pip (teaching magnetic materials, pointing at the two labels; cheer at the verdict: a key word learnt)."],
  over: (tt) => tt >= MKS("slow") ? TF(1660, 230, spring(tt, MKS("slow"), .4), tpill(0, 0, "slowed down", 30, P.ink, "#fff", { w: 600 })) : "" });
SC.mark2 = (t, s) => markScene(t, s, { id: "m1009", sayId: "m1008", who: "momo", n: "2 of 2", text: "Magnets attract objects made of magnetic materials. Magnetic materials include iron and steel.", keys: ["attract", "magnetic", "materials", "iron", "steel"], size: 60, y: 235, footer: FOOT, achieved: true, poses: [[LE("m1009") + .2, "cheer"], [LE("m1009") + 2.0, "sit"]] });

/* 11 · score hand, the pigeon (lizReveal: the score hand melts into the void deck, ONE push-in onto the pigeon on top of the BICYCLE RACK (the
   REVEAL spot, never the intro pipe); Momo's fun-fact panel: a pigeon flying high far from its home loft (ff_fly), faint curved lines round a
   small Earth, the Earth's magnetism (ff_sense), the pigeon landing at its loft (ff_home)) */
SC.final = (t, s) => { const L = "m1101"; return finalScene(t, s, L, 0, [[s.t0, null, 1], [W(L, "two") - .1, null, 2]]); };
SC.liz = (t, s) => { const L = "m1102", tq = W(L, "it") - .1;
  return lizReveal(t, s, L, deckPH(t, PIGEON_R), PIGEON_R[0], PIGEON_R[1], tq, "It was on top of the bicycle rack!", -120, 160, 80, 1.9, { from: () => SC.final(SCN.final.t1 - .04, SCN.final), tell: "m1104",
    fact: { id: "m1103m", at: [1300, 560], w: 960, h: 420, items: FF([["ff_fly", "far from home", "DRAW: a cute pigeon flying high over a simple map, far from its home (a little loft with a heart)"], ["ff_sense", "the Earth's magnetism", "DRAW: faint curved lines round a small Earth, and a dotted path that bends towards home"], ["ff_home", "home again!", "DRAW: the pigeon landing at its loft, bobbing its head"]]) } }) + smallPrint(t, s.t0 + .5, PIGEON_RULE); };

/* 12 · the cliffhanger: Basil holds his magnet right over the copper wire in the blue half and wiggles it (wire); the wire does not move; a ?;
   a chip copper: a metal by the wire, next to the green half's iron and steel (metal); PART 2 */
SC.cliff = (t, s) => { const tP = W("m1202", "part") - .1; return phScene(t, s, "12 · The cliffhanger: copper is a metal too", ["The void deck: the test table at its home. MK wire: Basil holds his magnet right over the copper wire in the blue half and wiggles it: the wire does not move at all; a ? pops. MK metal: a small chip copper: a metal by the wire, next to the green half's iron and steel. Basil big at the left (h ~480 x .94) with the magnet (pointing at the wire before his line, thinking after it: his own tricky question); Momo and Pip at the right in BACK VIEWS watching the wire (Momo's back view exists; Pip has none yet: front view turned in, as EP18). One push from Basil to the wire. Full staging: SCENES_TODO.md."])
  + trayPH(t, 960, 700, .5) + qMark(t, MK("wire") + .6, 1200, 520) + matChip(t, MK("metal"), 1200, 830, 1, "copper: a metal") + (t >= tP ? slamFit(330, "PART 2", P.sun, slamK(t - tP, 0)) : "") + HUD(t); };
/* 13 · "Now you know!": the MAGNET TEST TABLE between the buddies (Stage 2: draw it; the tray placeholder now) */
SC.nyk = (t, s) => nykScene(t, s, trayPH(t, 960, 900, .5), { bx: [200, 1715, 1375], hx: 470 });
})(); }
