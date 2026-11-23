// p1.js: PART 1, "Why Does This Magnet FLOAT? Two Poles, a Pull and a Push": EP19's dare answered (two, a push), be the top ring magnet
// (the slide, the slow stop in mid-air, the press, the spring back, the empty gap), the answer, where is a magnet strongest? (the class's
// steel paper clips bunch at the two ends: POLES; the strip 6.7 and ATTRACTION; every shape has two poles, a ring's on its flat sides; Mark
// Sentence 6.6 + 6.8), HOLD ON! (Pip: "the ring must be broken": turned over, it snaps down), pull or push? (two bar magnets on round
// pencils: REPEL; it depends which poles face; Mark Sentence 6.9), the spider, the cliffhanger (two blue ends: is there a rule?).
// Segments 1-13 of ../p3_ep20_script.md section 4 (version 1, 23 Nov 2026).
// STAGE 1 (setup): the shared routines are WIRED (the calm recap of EP19's dare with its TWO cards, the title slam, the game as ONE smooth
// push-in onto the spider (common.js gameScene), the goals read by Basil, the countdown, Round 1's lock-in with the dare's two cards and the
// clue labels on top of the ring, the two Mark Sentences (Momo, Basil), the LOOK-CLOSER frames (lcPH inside the real lookCloser) with the
// book strip 6.7, the journey's tags and riders, THE POLES BOARD's placeholder (tests.js polesBoardPH: it fills on its marks), the score
// hand, the spider's smooth reveal with its fun-fact panel, the read-along, "Now you know!"). Every scene with new art is a phScene
// placeholder. STAGE 2 (Fable) draws them: SCENES_TODO.md has the full staging per scene and line.
if (PART === 1) { (() => {
const L1 = "m501";
// the scores (script section 3): Round 1 1 : 1 (Pip and Basil right: the Buddies score too), HOLD ON! 2 : 1 (nothing for the Buddies)
SCORE.push([MK("coin1") - .1, 1, 1]);
SCORE.push([W("m903", "one") - .1, 2, 1]);
const FOOT = "P3 · Interactions · Properties of Magnets";
const ph = (title, ...notes) => (t, s) => phScene(t, s, title, notes.concat(["Full staging: SCENES_TODO.md."])) + HUD(t);
const qMark = (t, t0, x, y, r = 50) => t < t0 ? "" : TF(x, y, spring(t, t0, .5) * (1 + .05 * Math.sin(t * 4)), `<g filter="url(#dropS)"><circle r="${r}" fill="url(#gSun)"/></g>${T(0, r * .52, "?", r * 1.56, P.ink)}`);
const slamFit = (y, txt, col, k) => slamLine(y, txt, Math.min(170, 170 * 1720 / tw(txt, 170, 700, "Fredoka", 4)), col, k);
const CBX = [760, 1160];
const dareRow = (t, t0, y = 900, k = .62) => [0, 1].map((i) => { const a = t0 + i * .3; if (t < a) return ""; const [x, d] = slideX(t, a, .7, 2500, CBX[i], y + 120); return d + TF(x, y, k, dareCard2(i)); }).join("");
// the floating ring on the front bench (EP19's own pencilRings, ep19dare.js): the same pencil all part long
const rings = (t, x = 960, y = 760, k = .55) => TF(x, y, k, pencilRings(t));

/* 1 · silent cold open: the school science room, Monday after school; THE POLES BOARD on the whiteboard (empty); Pip sets his pencil down
   (ringsIn): the top ring floats; Momo and Basil lean in (budsIn, back views); Basil's paw swishes through the gap (paw) */
SC.cold = (t, s) => phScene(t, s, "1 · Cold open: the floating ring in the science room (no voice)", ["A SCHOOL SCIENCE ROOM on Monday after school: lab benches with stools tucked under, the whiteboard with THE POLES BOARD drawn on it (empty), a science poster, a ceiling fan turning, a sink, the class plant on the window sill (every leaf on a stem), sunlight, the school field and a corridor outside. On the front bench: the class STATIONERY TRAY (Paper clips), Basil's red-and-blue BAR MAGNET, two round pencils.",
  "MK ringsIn: Pip carries in his pencil standing in a lump of plasticine and sets it down: two dark grey RING MAGNETS on it, the top one FLOATING with a clear gap; it bobs, then settles. MK budsIn: Momo and Basil lean in (back views), staring at the gap. MK paw: Basil waves a paw through the gap (nothing there). Pill: A school science room, Singapore · Monday after school. The spider in the window frame's top corner, on a thin silk line (before the game). Full staging: SCENES_TODO.md."])
  + (t >= MK("ringsIn") ? TF(960, 900, spring(t, MK("ringsIn"), .4) * .55, pencilRings(t)) : "");

/* 2 · "Last time...": EP19's dare, word for word. ONE calm picture: the two dare cards side by side, a gentle push-in, the big ?, each card
   steps forward and lights while Heart says it (>= 2.5 s each). WIRED */
SC.lasttime = (t, s) => { const L = "m203", tc = [W(L, "one"), W(L, "two")], z = 1 + .04 * eio((t - s.t0) / 8), k = ramp(t, s.t0 + .05, .5), cur = tc.filter((x) => t >= x - .15).length - 1;
  let cards = ""; [0, 1].forEach((i) => { const fw = cur === i ? ss(tc[i] - .15, tc[i] + .25, t) : (cur > i && i < 1 ? 1 - ss(tc[i + 1] - .15, tc[i + 1] + .25, t) : 0);
    cards += TF(760 + i * 400, 600 + 14 * (1 - spring(t, s.t0 + .2 + i * .15, .45)), .95 * (1 + .1 * fw), dareCard2(i, { pulse: cur === i ? .9 : pulse(t, tc[i], .04, .9) })); });
  return bg("stage2") + OP(ramp(t, s.t0, .3), T(960, 110, "Last time…", 60, "#fff", { w: 600 }))
    + OP(k, `<g transform="translate(960 540) scale(${n2(z)}) translate(-960 -540)">${cards}</g>`
      + qMark(t, W("m202", "what") - .1, 960, 260)
      + TF(960, 1000, spring(t, W("m202", "what") - .1, .4), tpill(0, 0, DARE_LABEL, 40, P.sun, P.ink, { w: 700 }))) + HUD(t); };
SC.back = (t, s) => phScene(t, s, "2 · Back in the science room: the floating ring", ["The science room (the cold open's set): a slow drift round the pencil on the front bench, the top ring floating; the buddies big: Pip hides one hand behind his back, Basil a secret fist, Momo a sure little smile (no pose sprites: listening). Pill: Hold on to your answer! (wired). The spider still in the window frame's corner (before the game). Full staging: SCENES_TODO.md."])
  + rings(t, 960, 900) + (t >= LT("m204") - .1 ? TF(960, 470, spring(t, LT("m204") - .1, .4), tpill(0, 0, "Hold on to your answer!", 40, P.sun, P.ink, { w: 700 })) : "");
// the title slam over the dimmed science room: WHY DOES IT FLOAT? (white) then A PULL OR A PUSH? (sun yellow). WIRED
const TITLE = (k1, k2) => slamFit(400, "WHY DOES IT FLOAT?", "#fff", k1) + slamFit(610, "A PULL OR A PUSH?", P.sun, k2);
SC.title = (t, s) => { const u = t - MK("title"), dim = clamp(u / .2); return lcSet(t, s, "back") + `<rect width="1920" height="1080" fill="${P.night}" opacity="${n2(.78 * dim)}"/>` + TITLE(slamK(u, .05), slamK(u, .55)) + HUD(t); };

/* 3 · today: the camera glides from the floating ring up to THE POLES BOARD (empty, held about 2 s), then across to the window; the game: ONE
   smooth push-in from the science room straight onto the spider in the window frame's top corner (common.js gameScene). Stage 2: R.world =
   the drawn science room, A = the spider's spot in it (the INTRO spot: never used again). WIRED */
SC.today = (t, s) => phScene(t, s, "3 · Today: THE POLES BOARD on the whiteboard", ["The science room: the camera glides from the floating ring up to THE POLES BOARD (the big empty bar-magnet outline, its label boxes empty, held about 2 s; MK board: a bright two-note sting), then across to the window frame (the game's push-in starts there).",
  "Basil big at the left (h ~480) holding up his bar magnet (showing it: a smile, no pose swap); Momo at the right; Pip mid-ground by his rings. The spider in the window frame's corner (the intro spot; still before the game). Full staging: SCENES_TODO.md."])
  + (t >= MK("board") ? polesBoardPH(t, 960, 640, .55) : "") + HUD(t);
SC.game = (t, s) => gameScene(t, s, ["m302", "m303b", "m304"], false, { world: (tt) => roomPH(tt), A: SPIDER, T: [680, 440], Z: 2.4, dim0: 0, ly: -150, qx: 1730, qy: 430 }) + smallPrint(t, LT("m304"), LOOK_RULE);
SC.goals = (t, s) => goals3(t, s, [["Two poles", ""], ["Where the pull is strongest", ""], ["Attract and repel", ""]], ["m401", "m402", "m403", "m404"], "basil");

/* 5 · Round 1: EP19's dare (a short 3 s ring). EP19's two cards as the ONE set of numbered picture cards; the clue labels no glue · no string
   · a gap ON TOP of the ring; the ring's picture: the pencil with the floating ring, big (EP19's pencilRings). Basil leads (worried through
   the countdown: lockN) */
SC.r1 = (t, s) => lockN(t, { cards: DARE_CARDS, clues: DARE_CLUES.map((c, i) => [c, W(L1, "what") + .15 * i]), lead: "basil", csize: 40, q: DARE_LABEL, tq: W(L1, "what") - .1,
  tc: [W(L1, "what"), W(L1, "top"), W(L1, "show")], ring0: MK("ring0_r1"), dur: 3, lock: "m502",
  pics: [0, 1].map((i) => darePic(i)),
  obj: (tt) => TF(430, 600, .42, pencilRings(tt)),
  picks: [{ who: "momo", id: "m503m", word: "1" }, { who: "pip", id: "m504p", word: "2" }, { who: "basil", id: "m505b", word: "2" }] });

/* 6 · BE THE TOP RING MAGNET (the journey; the buddies ride along, shrunk, on the plasticine at the pencil's foot: common.js riders). Tags WIRED */
SC.waitw = ph("6 · Be the top ring magnet! (the glide down to the pencil)", "Pill Be the top ring magnet! The camera glides down to the pencil and the floating ring. The buddies wave the viewer off (goodbye), then shrink (a pop each) and follow. The shelf slides aside. The spider on the whiteboard's pen tray as the camera passes (new spot).");
SC.shrink = (t, s) => phScene(t, s, "6 · BE THE TOP RING MAGNET (first person, present tense)", ["MK jslide: YOU are the top ring magnet (your own dark grey rim at the bottom of the frame, the pencil's yellow paint rising through your hole). You slide down the pencil, a tall yellow pole; MK jbelow: below you the bottom ring, a wide grey platform on the plasticine. MK jslow / jpush / jstop: closer, you slow down; soft MAGENTA push arrows rise from the bottom ring towards you; you stop in mid-air and bob gently (tag you float). MK jpress: a giant finger (Pip's, four fingers and a thumb) presses on you from above; you sink, the gap shrinks; MK jharder: the push arrows grow bigger and thicker (tag closer = stronger push). MK jspring: the finger lifts: up you spring, bob, and settle. MK jgap: you look down into the gap: empty, a soft light through it; tags no glue · no string · a push.",
  "The three buddies ride along, shrunk (h ~170), sitting on the plasticine at the pencil's foot at the lower edges (riders). Calm pad, Heart soft. The camera IS the ring: a slide, a slow stop, a bob, a squash, a spring; never a cut. Full staging: SCENES_TODO.md."])
  + youTag(t, MK("jslide"), "You: the top ring magnet") + feelTag(t, MK("jbelow"), MK("jslow") - .2, "to scale: a ring magnet", 160) + feelTag(t, MK("jstop"), MK("jpress") - .2, "you float", 160)
  + feelTag(t, MK("jharder"), MK("jspring") - .1, "closer = stronger push", 160)
  + ppChip(t, MK("jgap") + .3, 560, 640, 1, "a push") + ppChip(t, MK("jgap") + .6, 960, 640, 1, "no glue") + ppChip(t, MK("jgap") + .9, 1360, 640, 1, "no string")
  + riders(t, s, { tin: MK("jslide") + .6, h: 200, at: { pip: [200, 1044], basil: [1720, 1050], momo: [380, 1040] } });
SC.pullout = ph("6 · Pull back out to the science room", "Whoosh out to the science room, normal size (0.6 s): the ring floating, Pip's finger lifting from it. The buddies pop back (a hop each).");

/* 7 · the answer: two, a push. Pip (right) explains. WIRED: EP19's two cards small, the tick, the floating ring in front of THE POLES BOARD */
SC.answer = (t, s) => ph("7 · The answer is two: a push", "The science room: the front bench in front of THE POLES BOARD (its HOME, about 45% of the frame high: the same in bench, holdon, pushpull, cliff). The floating ring on the bench. EP19's two cards small along the top (wired): card 2 the green tick at ansglow; an x chip on card 1; the coins YOU +1 and BUDDIES +1 (two of three were right). Pip big at the right (h ~500) by his rings and Basil big at the left (h ~480): arms crossed (right, OUTCOMES, through the whole scene); Momo mid-ground (h ~380): oops (wrong), shy until the scene ends. A push to the gap as Pip explains; ease back. The spider on the leg of a lab stool (new spot).")(t, s)
  + [0, 1].map((i) => TF(810 + i * 300, 175, .42, dareCard2(i, { lit: i === 1 && t >= MK("ansglow") ? 1 : 0 }))).join("")
  + tagAt(t, MK("ansglow") + .3, 810, 280, 1, "not a pull", 26) + polesBoardPH(t, 960, 560, .5) + rings(t, 960, 1000, .45);

/* 8 · Basil's question (the middle pulls most?), then [LOOK CLOSER] where is a magnet strongest? the clips bunch at the ends (dip, lift,
   bunch, middle), POLES pops (lib.js o.at), Pip teaches (north, red, blue), the strip 6.7 (WIRED) and ATTRACTION, Momo teaches (stars), every
   shape has two poles (shapes), the ring's on its flat sides (ringpoles); Mark Sentence 1 (Momo, 6.6 + 6.8) */
SC.bench = (t, s) => ph("8 · \"Which part pulls the most?\" (Basil at the stationery tray)", "The science room: the front bench in front of THE POLES BOARD (HOME); Basil holds his bar magnet over the class stationery tray of steel paper clips. Basil big at the left (h ~480) with the magnet (talking, then thinking AFTER his line: a real question); Momo big at the right (h ~500); Pip mid-ground. Push in on the magnet and the tray. The spider on the top edge of the science poster (new spot).")(t, s) + polesBoardPH(t, 960, 520, .45);
SC.lcpoles = (t, s) => lcPH(t, s, { title: "Where is a magnet strongest? The clips, the poles, the shapes", v: "v_poles", verdict: [`TWO POLES: STRONGEST AT THE ENDS`, GOODC], fx: 960, fy: 640,
  beats: [["dip", "the bar magnet, BIG, lowered into the tray of steel paper clips (label steel paper clips from our class tray)"], ["lift", "lifted out slowly"], ["bunch", "clips hang in bunches (chains of two or three) at BOTH ends; a magnifier on each end"], ["middle", "a third magnifier on the bare middle: hardly any here"], ["kw_poles", "POLES pops (sun yellow), lines to the two ends"], ["north", "the red end N · North pole, the blue end S · South pole"], ["kw_attraction", "ATTRACTION pops with = the pull"], ["stars", "gold stars on both ends: strongest pull"], ["shapes", "six magnets in a row (bar, U-shaped, button, rod, ring, horseshoe), each with its two poles red and blue and a star on each"], ["ringpoles", "the ring tilted: its top face red N, its underside blue S; then Pip's two rings on the pencil, their facing faces glowing"], ["v_poles", "verdict"]],
  notes: ["Three beats, each filling the panel: dip (the class's own clips; the clips bunch at BOTH ends, the middle bare or one or two clips at most, never a bunch), poles (the two ends named and starred), shapes (every shape has two poles; the button and the ring on their two flat faces). All clips are dropped back in the tray before `shapes` and fade out COMPLETELY (no ghosts).",
    "A buddy's FACE peeks in from a lower corner: Basil first (thinking: his idea is tested; oops as the clips bunch at the ends and SHY to the verdict, no cheer: the 23 Nov rule), Pip (teaching POLES, pointing at each end; cheer at the end of his line: his first this part), Momo (teaching ATTRACTION; a big smile and a nod; surprised at the ring's two flat sides)."],
  over: (tt) => lcStrip(tt, "m805s", "The bar magnet has the strongest pull or attraction at the two poles.", { t1: LT("m807m") + 1.5 }) });
SC.mark1 = (t, s) => markScene(t, s, { id: "m810", sayId: "m809", who: "momo", n: "1 of 2", text: "A magnet has two poles. It has a North pole and a South pole. A magnet has two poles where attraction is the strongest.", keys: ["two", "poles", "North", "South", "attraction", "strongest"], size: 58, y: 235, footer: FOOT, achieved: true, poses: [[LE("m810") + .2, "cheer"], [LE("m810") + 2.0, "sit"]] });

/* 9 · HOLD ON! Pip: "the top ring will not come down, so it must be broken" (Stage 2: model ../ep16/p1.js SC.holdon and ../ep19/p1.js's wok
   HOLD ON!: the HOLD ON! stamp, the YOU ring 5 s with crossed arms, the clue labels it floats · broken? ON TOP of the ring, the bell, the
   coin; then Basil turns the ring over: CLICK, it snaps down (flip, click); turned back, it floats again (flipback)) */
SC.holdon = ph("9 · HOLD ON! Pip: \"the ring must be broken\"", "MK try: Pip presses the floating ring down and lets go; it springs back up; again; it will not come down to touch. His note card on a small easel: It will not come down. BROKEN! (a sad face drawn on the ring). The HOLD ON! stamp; the YOU ring (5 s, crossed arms) big and central with the floating ring as its picture and the clue labels it floats · broken? on top; only Pip at the side (thinking: Heart's line is a question to him). After the bell, Pip OOPS (shy) through the WHOLE fix; Basil and Momo arms crossed through it. MK flip: Basil lifts the top ring off, turns it over (a big curved arrow), slides it back on and lets go; MK click: it SNAPS down onto the bottom ring, CLICK (a camera jolt, an impact flash; a big close-up of Momo's face, surprised), and stays (no gap; green chip pulled together!). MK flipback: he turns it back over: it floats again (magenta chip pushed up). Small print: Keep magnets away from phones and cards (wired). The spider on the rim of the class plant's pot on the window sill (new spot; not in the ring).");
const holdon0 = SC.holdon; SC.holdon = (t, s) => holdon0(t, s) + smallPrint(t, MK("try"), PHONE_RULE) + ppChip(t, MKS("click") + .3, 1300, 620, 0, "pulled together!") + ppChip(t, MKS("flipback") + .3, 1300, 700, 1, "pushed up") + rings(t, 960, 980, .45);

/* 10 · Momo's question (push AND pull? how?), then [LOOK CLOSER] two bar magnets on round pencils: a red end and a blue end roll together and
   click (pull, click2); turned round, two red ends: one rolls away (push, away); REPEL pops (lib.js o.at); Basil and Pip teach; the POLES BOARD
   gets its pull and push pairs (board2); Mark Sentence 2 (Basil, 6.9) */
SC.pushpull = ph("10 · \"Push AND pull? How?\" (Momo at the two magnets)", "The science room: the front bench in front of THE POLES BOARD (HOME); two bar magnets and two pairs of round pencils on the bench. Momo big at the left (h ~500) by the magnets (talking, then thinking AFTER her line: a real question); Basil big at the right (h ~480); Pip mid-ground. Push in on the two magnets. The spider on top of the bookshelf by the door (new spot).")
  ; const pushpull0 = SC.pushpull; SC.pushpull = (t, s) => pushpull0(t, s) + polesBoardPH(t, 960, 520, .45);
SC.lcpushpull = (t, s) => lcPH(t, s, { title: "Pull or push? Two bar magnets on round pencils", v: "v_pushpull", verdict: [`PULL OR PUSH: IT DEPENDS WHICH POLES FACE`, GOODC], fx: 960, fy: 640,
  beats: [["roll", "two bar magnets, BIG, each lying across two round pencils, a gap between"], ["pull", "the blue end of the left faces the red end of the right: the right one starts to roll BEFORE they touch (green arrows towards each other); label a red end and a blue end"], ["click2", "they meet: click"], ["push", "Basil's paw turns the right magnet round (a curved arrow); now a red end faces a red end"], ["away", "as the left is slid closer, the right rolls AWAY, never touched; the gap never closes (magenta arrows apart); label two red ends"], ["kw_repel", "REPEL pops (sun yellow) with = push"], ["board2", "ease back: THE POLES BOARD gets a green pull pair and a magenta push pair, it depends which poles face"], ["v_pushpull", "verdict"]],
  notes: ["Two beats, top half and bottom half of the panel: pull (they roll together and click, starting before they touch) and push (turned round, one rolls away; the gap never closes). Name the colours (a red end and a blue end; two red ends), never the pole rule (Part 2).",
    "A buddy's FACE peeks in from a lower corner: Momo first (thinking: her question is answered; surprised as the right magnet rolls away untouched; cheer when REPEL lands, over a minute after her last), Basil (teaching REPEL, pointing at the gap; a big smile after), Pip (pointing at the two pairs; a nod at the verdict, no cheer: his HOLD ON! is over)."],
  over: (tt) => ppChip(tt, MKS("click2") + .2, 1640, 230, 0, "pull") + ppChip(tt, MKS("away") + .2, 1640, 300, 1, "push") });
SC.mark2 = (t, s) => markScene(t, s, { id: "m1010", sayId: "m1009", who: "basil", n: "2 of 2", text: "Magnets can attract (pull) or repel (push) one another. This depends on which poles are facing each other.", keys: ["attract", "(pull)", "repel", "(push)", "poles", "facing"], size: 58, y: 240, footer: FOOT, achieved: true, poses: [[LE("m1010") + .2, "cheer"], [LE("m1010") + 2.0, "sit"]] });

/* 11 · score hand, the spider (lizReveal: the score hand melts into the science room, ONE push-in onto the spider hanging on its silk thread
   under the edge of the front bench (the REVEAL spot, never the intro window frame); Basil's fun-fact panel: baby spiders on the tips of tall
   grass stems letting out silk (ff_grass), floating up into a blue sky (ff_up), landing far away by the sea (ff_far)) */
SC.final = (t, s) => { const L = "m1101"; return finalScene(t, s, L, 1, [[s.t0, null, 1], [W(L, "two") - .1, null, 2]]); };
SC.liz = (t, s) => { const L = "m1102", tq = W(L, "it") - .1;
  return lizReveal(t, s, L, roomPH(t, SPIDER_R), SPIDER_R[0], SPIDER_R[1], tq, "It was hanging under the bench!", -120, 160, 80, 1.9, { from: () => SC.final(SCN.final.t1 - .04, SCN.final), tell: "m1104",
    fact: { id: "m1103b", at: [1300, 560], w: 960, h: 420, items: FF([["ff_grass", "many baby spiders", "DRAW: tiny baby spiders on the tips of tall grass stems (the stems rooted in the ground), each letting out long silk threads"], ["ff_up", "the wind lifts them", "DRAW: the baby spiders floating up into a blue sky on their threads, wind lines"], ["ff_far", "far away!", "DRAW: a tiny spider landing far away by the sea (a small map line)"]]) } }) + smallPrint(t, s.t0 + .5, LOOK_RULE); };

/* 12 · the cliffhanger: Basil with two bar magnets: a red end to a blue end, click (pairs1, green chip pull); a red end to a red end, they
   push apart in his paws (pairs2, magenta chip push); then two BLUE ends, slowly, stopping just before they meet (blueends): a big ?; PART 2 */
SC.cliff = (t, s) => { const tP = W("m1202", "part") - .1; return phScene(t, s, "12 · The cliffhanger: two blue ends? Is there a rule?", ["The science room: the front bench in front of THE POLES BOARD (HOME). Basil holds two bar magnets: MK pairs1: a red end to a blue end: click (green chip pull); MK pairs2: a red end to a red end: they push apart in his paws (magenta chip push); MK blueends: he slowly brings the two BLUE ends towards each other and stops just before they meet: a big ? pops between them. Basil big at the left (h ~480) with the magnets (pointing with his chin at each pair before his line, thinking after it: his own tricky question); Momo and Pip at the right in BACK VIEWS watching the blue ends (Momo's back view exists; Pip has none: front view turned in, as EP18 and EP19). One push from Basil to the gap between the blue ends. Full staging: SCENES_TODO.md."])
  + ppChip(t, MK("pairs1") + .4, 760, 700, 0, "pull") + ppChip(t, MK("pairs2") + .4, 1160, 700, 1, "push") + qMark(t, MK("blueends") + .3, 960, 560) + (t >= tP ? slamFit(330, "PART 2", P.sun, slamK(t - tP, 0)) : "") + HUD(t); };
/* 13 · "Now you know!": THE POLES BOARD and the floating ring between the buddies (Stage 2: draw them; the placeholders now) */
SC.nyk = (t, s) => nykScene(t, s, polesBoardPH(t, 960, 820, .55) + rings(t, 960, 1040, .35), { bx: [230, 1720, 1420], hx: 470 });
})(); }
