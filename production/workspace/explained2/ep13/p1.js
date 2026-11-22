// p1.js: PART 1, "A METAL Strap? Design a School Bag Like an ENGINEER": EP12's dare answered, what engineers do, the design steps, design a
// school bag. Segments 1-15 of p3_ep13_script.md (version 1, 21 Nov 2026; the teacher's go-ahead in its section 12).
// STAGE 1 (setup): the shared routines are wired (the cold open's real boards sliding in, the calm recap of EP12's dare with EP12's own three
// school-bag boards and cards, the title slam, game, goals read by Basil, countdown, Round 1's lock-in with the boards on the cards and the
// clue labels must bend · must not tear on top of the ring, the answer with the real boards and their SUITABLE / NOT FOR THIS JOB tags, Mark
// Sentences read by Basil / Pip (the tag "function = the job of a part"), the board OUR DESIGN PLAN as a functional placeholder (boxes that
// glow and fill on their marks, the four fabric tiles of the HOLD ON!, the card THEN: TEST IT), the HOLD ON! ring with its three clue labels on
// top of the ring, the LOOK-CLOSER frame, score hand, read-along, "Now you know!"); every scene with new art is a phScene placeholder (and each
// [LOOK CLOSER] an lcPH placeholder inside the real frame). STAGE 2 (Fable) draws them: see SCENES_TODO.md.
if (PART === 1) { (() => {
const L1 = "g501";
// the scores (script section 3): Round 1 1 : 0, HOLD ON! 2 : 0 (the buddies score nothing in this part)
SCORE.push([W("g605", "one", 2) - .1, 1, 0]);
SCORE.push([W("g903", "one") - .1, 2, 0]);
const FOOT = "P3 · Diversity of Materials · The design process";
const stageNote = (txt, y = 1000) => T(960, y, "(Stage 2: " + txt + ")", 24, "#fff", { w: 500 });
const DARE = ["bagFabric", "bagMetal", "bagWood"];
// EP12's dare board (ep12dare.js, EP12's own art); origin = the board's centre
const dareBoard = (i, x, y, sc, o = {}) => picBoard(DARE[i], x, y, 1, { sc, lab: o.lab === false ? undefined : DARE_CARDS[i].toLowerCase(), size: 44, id: "p1d" + i + (o.id || "") });
// the tags on the three boards (script 1:24: SUITABLE on the fabric strap's board, NOT FOR THIS JOB on the other two), from mark boardtags
const boardTag = (t, i, x, y, size = 26) => { const t0 = MK("boardtags") + i * .2; return t < t0 ? "" : TF(x, y - 60 * (1 - eo((t - t0) / .25)), spring(t, t0, .45), jobTag(t, i === 0 ? 0 : 1, size)); };
const qMark = (t, t0, x, y, r = 50) => t < t0 ? "" : TF(x, y, spring(t, t0, .5) * (1 + .05 * Math.sin(t * 4)), `<g filter="url(#dropS)"><circle r="${r}" fill="url(#gSun)"/></g>${T(0, r * .52, "?", r * 1.56, P.ink)}`);
// the board OUR DESIGN PLAN (tests.js planBoard, functional placeholder) sliding in low at planIn
const boardIn = (t, x, y, sc, o = {}) => { const t0 = MK("planIn"); if (t < t0) return ""; const [bx, d] = slideX(t, t0, .7, 2600, x, y); return d + TF(bx, y, sc, planBoard(t, o)); };

/* 1 · silent cold open: a Primary 3 classroom after school (the boards slide in low: EP12's real art, WIRED) */
const CBX = [620, 960, 1300];
SC.cold = (t, s) => phScene(t, s, "1 · Cold open: a Primary 3 classroom after school (no voice)", ["Mid-afternoon, bright: rows of desks with bag hooks and chairs with rounded top rails, a whiteboard, ceiling fans turning slowly, glass louvre windows along one side, the corridor's potted plants beyond (the little BUTTERFLY on the nearest plant, seen through the open louvres: every wide shot of the classroom). On the teacher's table at the front: the orange school bag lying on its side, its left strap torn off at the top end and hanging down; five exercise books have slid out of it.",
  "MK boardsIn: EP12's three dare boards slide in low with dust puffs and stand in front of the table (wired below with the real boards; Stage 2 places them in the drawn classroom). MK budsIn: Pip, Basil (cheer), Momo pop in. Pill: A Primary 3 classroom, Singapore. No title."])
  + [0, 1, 2].map((i) => { const t0 = MK("boardsIn") + i * .3; if (t < t0) return ""; const [x, d] = slideX(t, t0, .7, 2500, CBX[i], 990); return d + dareBoard(i, x, 900, .5, { lab: false, id: "c" }); }).join("");

/* 2 · "Last time...": EP12's dare, word for word. ONE calm picture: EP12's three boards side by side, centred and large, a gentle push-in,
   the big ? above them, EP12's three cards under them; as Heart says each card its board steps forward and its card lights (>= 2.5 s each). WIRED */
SC.lasttime = (t, s) => { const L = "g203", tc = [W(L, "one"), W(L, "two"), W(L, "three")], z = 1 + .04 * eio((t - s.t0) / 8), k = ramp(t, s.t0 + .05, .5), cur = tc.filter((x) => t >= x - .15).length - 1;
  let boards = ""; [0, 1, 2].forEach((i) => { const fw = cur === i ? ss(tc[i] - .15, tc[i] + .25, t) : (cur > i ? 1 - ss(tc[i + 1] - .15, tc[i + 1] + .25, t) : 0);
    boards += dareBoard(i, 560 + i * 400, 600 + 14 * (1 - spring(t, s.t0 + .2 + i * .15, .45)), .95 * (1 + .1 * fw), { id: "lt" }); });
  return bg("stage2") + OP(ramp(t, s.t0, .3), T(960, 110, "Last time…", 60, "#fff", { w: 600 }))
    + OP(k, `<g transform="translate(960 540) scale(${n2(z)}) translate(-960 -540)">${boards}</g>`
      + qMark(t, W("g202", "which") - .1, 960, 240)
      + DARE_CARDS.map((c, i) => TF(560 + i * 400, 880, .5 * spring(t, tc[i] - .1, .45), ansCard(i + 1, c, { w: 430, h: 290, size: 58, pulse: cur === i ? .9 : pulse(t, tc[i], .04, .9) }))).join("")   /* each card lights as Heart says it (no tick: the answer is Round 1's) */
      + TF(960, 1010, spring(t, W("g202", "which") - .1, .4), tpill(0, 0, DARE_LABEL, 40, P.sun, P.ink, { w: 700 }))) + HUD(t); };
SC.back = (t, s) => phScene(t, s, "2 · Back in the classroom", ["The classroom (the set of the cold open): the bag with its torn strap on the teacher's table, EP12's three boards in front of it, the buddies in their discs. Pill: Hold on to your answer! (wired)."])
  + [0, 1, 2].map((i) => dareBoard(i, CBX[i], 900, .5, { lab: false, id: "bk" })).join("")
  + (t >= LT("g204") - .1 ? TF(960, 700, spring(t, LT("g204") - .1, .4), tpill(0, 0, "Hold on to your answer!", 40, P.sun, P.ink, { w: 700 })) : "");
// the title slam over the dimmed classroom (WIRED; Stage 2's drawn classroom shows through): A METAL STRAP? (white) then DESIGN IT LIKE AN
// ENGINEER! (sun yellow). The second slam is the first thing to cut if Part 1 runs long (script section 6, CUTS "title2": a picture beat only).
const slamFit = (y, txt, col, k) => slamLine(y, txt, Math.min(170, 170 * 1720 / tw(txt, 170, 700, "Fredoka", 4)), col, k);
SC.title = (t, s) => { const u = t - MK("title"), dim = clamp(u / .2); return lcSet(t, s, "back") + `<rect width="1920" height="1080" fill="${P.night}" opacity="${n2(.78 * dim)}"/>`
  + slamFit(400, "A METAL STRAP?", "#fff", slamK(u, .05)) + slamFit(610, "DESIGN IT LIKE AN ENGINEER!", P.sun, slamK(u, .55)) + HUD(t); };

/* 3 · the game, and the hidden butterfly; 4 · goals (Basil reads) and the countdown (count is in common.js) */
SC.game = (t, s) => gameScene(t, s, "g301", true);
SC.goals = (t, s) => goals3(t, s, [["What engineers do", ""], ["The design steps", ""], ["Design a school bag", ""]], ["g401", "g402", "g403", "g404"], "basil");

/* 5 · Round 1: the dare from EP12 (a short 3 s ring). In the ring: the bag with its torn strap (ringPH: Stage 2 draws it); clue labels must bend
   · must not tear on top of the ring frame, kept through the countdown (lockN c.labels); EP12's boards small on the three cards (real art) */
SC.r1card = (t, s) => roundCard(t, s, "ROUND 1", "YOUR ANSWER FROM LAST TIME");
const r1labels = (t) => { const tq = W(L1, "fabric") - .1; return t < tq ? "" : DARE_CLUES.map((l, i) => TF(430 + (i ? 130 : -140), 470 - RING_R - 14 - (i ? 0 : 46), spring(t, tq + i * .15, .4), tpill(0, 0, l, 30, "#fff", P.ink, { w: 700 }))).join(""); };
SC.r1 = (t, s) => lockN(t, { cards: DARE_CARDS, labels: r1labels, q: DARE_LABEL, tq: W(L1, "fabric") - .1, tc: [W(L1, "fabric"), W(L1, "metal"), W(L1, "wood")], ring0: MK("ring0_r1"), dur: 3, lock: "g502",
  icons: [0, 1, 2].map((i) => dareBoard(i, 0, 0, .36, { lab: false, id: "r1i" })),
  obj: ringPH("the bag, torn strap"), over: (tt) => qMark(tt, W(L1, "fabric") - .1, 1262, 210, 40),
  picks: [{ who: "pip", id: "g505", word: "1" }, { who: "basil", id: "g503", word: "2", x: true }, { who: "momo", id: "g504", word: "3", x: true }],
  react: [[LE("g503") + .1, "basil", "cheer"], [LE("g504") + .1, "momo", "thinking"], [LE("g505") + .1, "pip", "pointing"]] });

/* 6 · [LOOK CLOSER] three straps over the back of a chair; the fabric strap lifts a bag full of books; FABRIC: FLEXIBLE AND STRONG */
SC.lcstraps = (t, s) => lcPH(t, s, { title: "Three straps over the back of a chair; then the fabric strap lifts the bag", v: "v_straps", verdict: [`FABRIC: <tspan fill="#fff">FLEXIBLE AND STRONG</tspan>`, GOODC, { plain: "FABRIC: FLEXIBLE AND STRONG" }], fx: 1100, fy: 640,
  setNote: "the classroom: a classroom chair turned side-on beside the teacher's table (rounded top rail), the bag with its torn strap on the table (the look-closer zooms in from here)",
  beats: [["lay1", "the fabric strap drapes over the rail"], ["flexchip", "chip FLEXIBLE"], ["lay2", "the metal bar rests across: tink, rocks once"], ["lay3", "the wooden stick: tok, rocks once"], ["clear", "bar and stick lifted away"], ["clip", "the fabric strap clipped to the bag"], ["books", "five books in, one by one"], ["lift", "the bag lifted by the new strap"], ["notear", "magnifier: weave and stitches whole"], ["strongchip", "chip STRONG"], ["v_straps", "verdict"]],
  notes: ["The chair's rounded top rail fills most of the window; the classroom dims and blurs; buddies and cards step back. Small print for the whole moment: We do not force it. (wired). An adult's hands lay the three straps over the rail, one by one, left to right, each AT its mark: MK lay1 the woven fabric strap drapes over the rail and hangs down on both sides, following the curve (label bends round it; MK flexchip: EP9's chip FLEXIBLE lands by it).",
    "MK lay2 the flat metal bar rests across the rail like a see-saw, straight, touching it at one point, rocking once (a light tink); MK lay3 the wooden stick the same (a wooden tok); labels stays straight · stays straight. Nothing is bent by force. MK clear: the hands lift the bar and the stick away; MK clip: they clip the fabric strap to the bag in place of the torn one.",
    "MK books: five exercise books go into the bag, one by one (.35 s apart: soft thups). MK lift (\"lifts\"): the hands lift the bag off the table by the new strap alone: the strap goes tight and straight, the bag swings once and hangs still (a creak). MK notear: a magnifier ring on the strap where it meets the bag: the weave and the stitches, whole; labels a bag full of books · no tear; MK strongchip: chip STRONG. Verdict at v_straps (green, with the chips FLEXIBLE and STRONG)."],
  over: (tt) => smallPrint(tt, s.t0 + 1.2, FORCE_RULE) });
/* the answer is one: fabric. EP12's three boards with their tags (SUITABLE green on fabric, NOT FOR THIS JOB blue on metal and wood: boardtags),
   card 1 glows, coin, Basil's oops (g606, cuttable "ouch"). WIRED with the real boards */
SC.strapans = (t, s) => { const L = "g605", tA = W(L, "one") - .1, tOne = W(L, "one", 2) - .1, hb = HAS("g606");
  return bg("stage2") + stageNote("the classroom behind; the bag on the table, the new fabric strap clipped on", 120)
    + [0, 1, 2].map((i) => dareBoard(i, 560 + i * 400, 470, .62, { id: "sa" }) + boardTag(t, i, 560 + i * 400, 600, 24)).join("")
    + DARE_CARDS.map((c, i) => TF(560 + i * 400, 830, .42 * spring(t, s.t0 + .1 + i * .08, .4), ansCard(i + 1, c, { w: 430, h: 290, size: 58, lit: i === 0 && t >= tA ? spring(t, tA, .45) : 0 }))).join("")
    + coin(t, tOne, 1680, 300, "+1", "if you showed one finger")
    + buddy("basil", 1700, 1060, 280, t, { aura: true, flip: true, in: s.t0 + .1, poses: [[s.t0, "sit"], [hb ? LT("g606") - .12 : tA + 1, "oops"], [hb ? LE("g606") + .4 : tA + 3, "sit"]], nohop: true })
    + (hb ? say("g606", 1460, 640, t, { size: 40, tail: 120, maxW: 460 }) : "") + HUD(t); };

/* 7 · what engineers do: ENGINEERS pops on Heart's "engineers" (lib.js o.at); Momo: "So we are engineers too!" */
SC.engineers = (t, s) => phScene(t, s, "7 · That is what engineers do!", ["The three straps lie in a row on the teacher's table, each with its tag (green SUITABLE on the fabric strap, blue NOT FOR THIS JOB on the bar and the stick). A small cream card stands by them: an engineer's hard hat, a pencil and a ruler, drawn simply. ENGINEERS pops large at the upper right on Heart's \"engineers\" (wired, 2.0 s) and flies to the shelf. Momo cheer (her bubble, wired)."])
  + buddy("momo", 1680, 1060, 260, t, { aura: true, flip: true, in: s.t0 + .1, poses: [[s.t0, "sit"], [LT("g702") - .12, "cheer"], [LE("g702") + .3, "sit"]] }) + say("g702", 1450, 620, t, { size: 40, tail: 120, maxW: 440 });
/* Mark Sentence 1 (Basil): 3.29; DESIGN pops after the last word (lib.js o.at); under the card: the three straps with their tags */
SC.mark1 = (t, s) => markScene(t, s, { id: "g705", sayId: "g704", who: "basil", n: "1 of 2", text: "Knowing the physical properties of a material is important when designing and making new products.", keys: ["physical", "properties", "designing", "and", "making", "new", "products."], size: 62, y: 250, footer: FOOT,
  under: [0, 1, 2].map((i) => { const x = 760 + i * 230; return dareBoard(i, x, 985, .38, { lab: false, id: "m1" }) + TF(x, 892, 1, jobTag(t, i === 0 ? 0 : 1, 16)) + (i === 0 ? TF(x, 1040, 1, propChip("FLEXIBLE", 16)) : ""); }).join("") + stageNote("under the card: the three real straps with their tags and chips", 1062) });

/* 8 · the plan: OUR DESIGN PLAN slides in low (planIn) and stands centred between the discs; the first box glows on "First" (box1) */
SC.plan = (t, s) => phScene(t, s, "8 · Engineers follow a plan", ["The classroom. MK planIn: the board OUR DESIGN PLAN slides in low and stands centred between the discs: five empty boxes joined by plain lines, NO NUMBERS: WHAT IS IT FOR? · PARTS · USE OF EACH PART · DRAW IT · CHOOSE MATERIALS (planBoard below, functional; redraw it on its low stand). MK box1 (\"First\"): the first box glows. The camera starts to move in on the bag (the set lcbag zooms in from)."])
  + boardIn(t, 960, 1060, .55);
SC.lcbag = (t, s) => lcPH(t, s, { title: "A school bag doing its job, then part by part", v: "v_bag", verdict: VSTYLE("ONE BAG · FOUR PARTS · FOUR USES", "sun"), fx: 960, fy: 620,
  beats: [["booksin", "five books slide in"], ["zip1", "the zip closed"], ["hang", "lifted, hung on the chair"], ["fill1", "box 1 filled"], ["glow23", "boxes 2 and 3 glow"], ["p_straps", "STRAPS lit"], ["p_body", "BODY lit"], ["p_zip", "ZIP lit"], ["p_base", "BASE lit"], ["kw_intended_use", "INTENDED USE pops"], ["u_straps", "straps · carry the bag"], ["u_body", "body · holds the books (top opened)"], ["u_zip", "zip · opens and closes (run closed)"], ["u_base", "base · sits on the floor (set down)"], ["v_bag", "verdict"], ["fill23", "boxes 2 and 3 filled"]],
  notes: ["The bag on the table fills most of the window; the classroom dims; the buddies step back. MK booksin: an adult's hands slide the five exercise books in; MK zip1: they close the zip; MK hang: they lift the bag and hang it on the back of the chair. Label to carry books to school. MK fill1: on the board (small, top left, wired) the first box is filled.",
    "Then four close-ups, each part lit while the rest of the bag is dimmed: Heart names them (MK p_straps, p_body, p_zip, p_base: each part lights with its name), then each does its job with its label: MK u_straps the bag hanging by them from the chair (straps · carry the bag); MK u_body the hands open the top: five books stand inside (body · holds the books); MK u_zip one hand runs the zip closed (zip · opens and closes, a zzip);",
    "MK u_base the hands set the bag down on the floor: it stands on its base (base · sits on the floor, a soft thump). INTENDED USE pops at the upper right on \"intended\" (wired). Verdict ONE BAG · FOUR PARTS · FOUR USES (sun-yellow letters on cream, not an answer colour) at v_bag; MK fill23: boxes 2 and 3 filled on the small board."],
  over: (tt) => TF(330, 330, .2, planBoard(tt, { small: true })) });

/* 9 · HOLD ON! Pip: "So I will make every part of fabric!" WIRED (model: EP12 SC.holdon): Pip big in his disc (cheer), the board (small, low
   right) with four fabric tiles hopping to CHOOSE MATERIALS (fabhop) and back (fabback), the HOLD ON! stamp, the YOU ring with crossed arms (5 s),
   the bag in the ring (placeholder), three clue labels ON TOP of the ring frame through the countdown, the bell, the coin. Stage 2 draws the
   classroom behind and the bag with its four label lines in the ring. */
const RG = [1240, 470], RR = 150;
SC.holdon = (t, s) => { const a = "g901", b = "g902", c = "g903", r0 = MK("ring0_hold"), bell = MK("bell_hold"), rs = ringState(t, r0, 5), tX = W(b, "cross") - .15, tH = W(b, "hold") - .1, tOne = W(c, "one") - .1, ring = t >= tX && t < LE(c) + .4;
  const pic = `<circle cx="${RG[0]}" cy="${RG[1]}" r="120" fill="#fff" opacity=".6"/>` + T(RG[0], RG[1] + 10, "the bag, 4 labels", 26, P.ink);
  const labels = ["four parts", "four uses", "one material?"].map((l, i) => TF(RG[0] + (i - 1) * 190, RG[1] - RR - 34 - (i === 1 ? 50 : 0), spring(t, tX + .2 + i * .15, .4), tpill(0, 0, l, 26, "#fff", P.ink, { w: 700 }))).join("");
  return bg("stage2") + stageNote("the classroom behind, dimmed; the board OUR DESIGN PLAN on its stand", 160) + TF(1250, 1066, .42, planBoard(t))
    + buddy("pip", 330, 1060, 300, t, { aura: true, in: s.t0 + .1, poses: [[s.t0, "cheer"], [LE(a) + .3, "sit"], [W(c, "each") - .12, "surprised"], [LE(c) + .1, "sit"]], nohop: true })
    + say(a, 560, 300, t, { size: 42, tail: -200, maxW: 640 })
    + (ring ? OP(1 - ss(LE(c) + .1, LE(c) + .4, t), TF(RG[0], RG[1], spring(t, tX, .4), `<g transform="translate(${-RG[0]} ${-RG[1]})">${ringTimer(RG[0], RG[1], t < r0 ? 1 : t < bell ? rs.frac : 0, t < r0 ? 5 : t < bell ? rs.secs : 0, t, { R: RR, sw: 24, tick: rs.tick, shut: pulse(t, bell, .01, .6), inner: pic + (t < bell + .3 ? OP(.85, TF(RG[0], RG[1] + 40, .38, crossedArms())) : "") })}</g>`)
      + labels + youPill(RG[0] - 250, RG[1] + 120, 1.0) + tpill(RG[0], RG[1] + RR + 60, "cross your arms", 30, P.ink, "#fff")) : "")
    + stamp(t, tH, 900, 420, "HOLD ON!") + bellIcon(t, r0) + coin(t, tOne, 1680, 300, "+1", "arms crossed") + HUD(t); };
SC.wetfloor = (t, s) => phScene(t, s, "9 · Basil: \"My bag sits on a wet canteen floor!\"", ["Basil big in his disc (surprised pose, then sit; wired with his bubble). MK wetpic (\"wet\"): beside him a small picture in a plain frame slides in: a school bag standing on a wet canteen floor, a yellow *wet floor* sign behind it (one drip)."])
  + (t >= MK("wetpic") ? TF(1300, 560, spring(t, MK("wetpic"), .45), `<rect x="-230" y="-160" width="460" height="320" rx="20" fill="#FFF8EA" stroke="#E3C9A8" stroke-width="6"/>` + T(0, 0, "bag on a wet canteen floor", 28, P.ink) + T(0, 40, "+ a wet floor sign", 24, P.ink, { w: 500 })) : "")
  + buddy("basil", 300, 1060, 280, t, { aura: true, in: s.t0 + .1, poses: [[s.t0, "surprised"], [LT("g904") + .6, "sit"]] }) + say("g904", 520, 600, t, { size: 40, tail: -120, maxW: 520 });

/* 10 · draw it, then choose: the paper (paper), DRAW IT glows (glow4); [LOOK CLOSER] the drawing, and a material for each part */
SC.draw = (t, s) => phScene(t, s, "10 · Now we draw the design", ["MK paper: a sheet of cream paper slides onto the table. MK glow4 (\"draw\"): the fourth box of the board, DRAW IT, glows (planBoard below, functional). The camera starts to move in on the paper (the set lcdraw zooms in from)."])
  + TF(1250, 1066, .42, planBoard(t));
SC.lcdraw = (t, s) => lcPH(t, s, { title: "The drawing, then a material for each part", v: "v_draw", verdict: [`OUR DESIGN: A SUITABLE MATERIAL FOR EACH PART`, GOODC], fx: 960, fy: 640,
  beats: [["pencil", "the pencil draws (speeded up)"], ["fill4", "box 4 filled; four labels"], ["glow5", "CHOOSE MATERIALS glows"], ["drop1", "a drop on plastic: a bead"], ["drop2", "a drop on fabric: it sinks in"], ["plastichop", "plastic tile onto the base"], ["wpchip", "chip WATERPROOF"], ["zo1", "zip: open"], ["zc1", "close"], ["zo2", "open"], ["zc2", "close"], ["ziphop", "zip onto the drawing"], ["zipchip", "chip STRONG"], ["fabhop2", "fabric onto straps and body"], ["flexchip2", "FLEXIBLE"], ["strongchip2", "STRONG"], ["v_draw", "verdict"], ["fill5", "box 5 filled: five ticks"]],
  notes: ["The cream paper fills the window; the classroom dims. MK pencil: an adult's hand with a pencil draws the bag, part by part (speeded up: the clock tag is wired, bottom right): the body, the two straps, the zip, the base; four plain label lines write themselves: straps · body · zip · base. MK fill4: on the small board (top left, wired) the fourth box is filled; MK glow5: the last box glows.",
    "Three samples are tried right beside the part they are for. BASE: a plastic tile and a fabric tile side by side; MK drop1 a dropper lets one drop fall on the plastic: a round bead stays on top (plip); MK drop2 one on the fabric: it sinks in, a dark wet patch (pff); MK plastichop the plastic tile hops onto the drawing's base (base · plastic); MK wpchip chip WATERPROOF. ZIP: one hand runs a short metal zip open and closed AT MK zo1, zc1, zo2, zc2 (its teeth meet cleanly each time);",
    "MK ziphop it hops onto the drawing's zip (zip · metal); MK zipchip chip STRONG. STRAPS AND BODY: MK fabhop2 the fabric tile's dry twin and the strap from before hop onto the drawing (straps · fabric · body · fabric); chips FLEXIBLE (flexchip2) and STRONG (strongchip2). Verdict at v_draw (green); MK fill5: the last box filled, five ticks."],
  over: (tt) => TF(330, 330, .2, planBoard(tt, { small: true })) + lcClock(tt, MK("pencil"), MK("fill4"), 1540, 880) });
SC.pipfix = (t, s) => phScene(t, s, "10 · Pip: \"A fabric base would soak up the water!\"", ["Pull back to the classroom: the finished drawing with its sample tiles on the table. Pip big in his disc: surprised pose, then a nod (wired with his bubble). (g1006 is cut last of all: then the tag Fabric soaks up water shows beside the wet fabric tile instead, wired.)"])
  + buddy("pip", 300, 1060, 280, t, { aura: true, in: s.t0 + .1, poses: [[s.t0, "surprised"], [HAS("g1006") ? LE("g1006") + .2 : s.t0 + 1.2, "sit"]], jump: [[HAS("g1006") ? LE("g1006") + .25 : s.t0 + 1.3, 20]] })
  + (HAS("g1006") ? say("g1006", 520, 600, t, { size: 40, tail: -120, maxW: 520 }) : TF(1200, 600, spring(t, s.t0 + .5, .4), tpill(0, 0, "Fabric soaks up water", 40, "#fff", P.ink, { w: 700 })));

/* 11 · Mark Sentence 2 (Pip): 3.27; the tag "function = the job of a part" for the whole card (as in EP12); under the card: the finished drawing */
SC.mark2 = (t, s) => markScene(t, s, { id: "g1102", sayId: "g1101", who: "pip", n: "2 of 2", text: "The materials are selected for the different functions of the parts based on their physical properties.", keys: ["different", "functions", "parts", "physical", "properties."], size: 62, y: 230, footer: FOOT,
  extra: (t >= s.t0 + .6 ? TF(1150, 800, spring(t, s.t0 + .6, .4), tpill(0, 0, "function = the job of a part", 34, "#FFF8EA", P.ink, { w: 700 })) : "")
    + stageNote("under the card: the finished drawing, its four labelled parts and their sample tiles", 1040) });

/* 12 · BE A BOOK (the first-person journey) */
SC.waitw = (t, s) => phScene(t, s, "12 · Be a book! (the glide in)", ["Pill Be a book! The camera glides to the real bag on the table and down through its open top, to one exercise book inside; a soft cream wipe at the scene end. The shelf slides aside (SHELF_HIDE)."]);
SC.shrink = (t, s) => phScene(t, s, "12 · BE A BOOK (first person, present tense)", ["MK jin: inside: you look up from your own cover; the other books stand beside you like tall walls; above, the bag's open top, bright, the ceiling fan far away. Tags You: a book · inside the bag. MK jzip / jzipclose (\"Zip!\"): two rows of metal teeth close overhead from one end to the other like a bright track (a long soft zzzip, close); the light turns soft and orange through the fabric. Tag metal zip · closes.",
  "MK jstraps / jtight (\"tight\"): the walls sway; through the top seam the two straps go tight; MK jup (\"Up\"): everything rises (a creak and a sway). Tag fabric straps · no tear. MK jbase / jbump (\"Bump!\"): a drop, a soft bump; the view settles; MK jwater: low at the edge, outside, a thin shining line of water; inside, by you, the floor of the bag is dry. Tag plastic base · water stays out. MK wpglow (\"dry\"): the chip WATERPROOF glows over the view. Calm pad; no game sounds."]);

/* 13 · pull back out; the score hand, the butterfly (lizReveal in common.js), the key words (kwrecap in common.js) */
SC.pullout = (t, s) => phScene(t, s, "13 · Pull back out to the classroom", ["Whoosh out of the bag to the classroom (0.8 s)."]);
SC.final = (t, s) => { const L = "g1301"; return finalScene(t, s, L, 0, [[s.t0, null, 1], [W(L, "two") - .1, null, 2]]); };
SC.liz = (t, s) => phScene(t, s, "13 · Did you spot the butterfly? (lizReveal in common.js)", ["A replay of the wide classroom with a ring round the little butterfly on the potted plant outside the louvre window; it opens its wings wide, flutters up a little and settles again. Pill: Tell someone at home! Use lizReveal(t, s, \"g1302\", view, x, y, tq, \"It was on the plant by the window!\")."]);

/* 14 · the cliffhanger: will the new strap really hold? THEN: TEST IT slides in beside the board on "Not yet" (testcard, wired in planBoard);
   a big ? over the new strap (q, wired); PART 2 slams in on "Find out in Part Two!" (wired) */
SC.cliff = (t, s) => { const tP = W("g1403", "part") - .1;
  return phScene(t, s, "14 · Cliffhanger: will the new strap really hold?", ["The finished drawing stands on a small easel on the table, the bag with its new strap beside it. Basil big in his disc (cheer; wired with his bubble). MK testcard (\"Not yet\"): the small card THEN: TEST IT slides in low and stands beside the board, joined to it by one plain curved line (wired on the placeholder board). MK q: a big ? pops over the new strap (wired). PART 2 slams in (wired)."])
    + TF(1100, 1066, .36, planBoard(t)) + qMark(t, MK("q"), 1500, 520)
    + buddy("basil", 260, 1060, 260, t, { aura: true, in: s.t0 + .1, poses: [[s.t0, "cheer"], [LT("g1401") - .12, "sit"], [LT("g1402"), "surprised"], [LE("g1402"), "sit"]] }) + say("g1401", 470, 600, t, { size: 40, tail: -120, maxW: 520 })
    + (t >= tP ? slamFit(330, "PART 2", P.sun, slamK(t - tP, 0)) : ""); };

/* 15 · "Now you know!": the board OUR DESIGN PLAN (five ticked boxes, THEN: TEST IT beside it) centred in the free space between the buddies */
SC.nyk = (t, s) => nykScene(t, s, TF(860, 1040, .4, planBoard(t)), { bx: [200, 1715, 1375], hx: 470 });
})(); }
