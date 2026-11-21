// p1.js: PART 1, "The TORCH Test: Which Glass Lets Only SOME Light Through?": the torch test, transparent, frosted glass, translucent.
// Segments 1-15 of p3_ep11_script.md (version 1, 21 Nov 2026; the teacher's go-ahead in its section 12).
// STAGE 1 (setup): the shared routines are wired (the calm recap of EP10's dare with EP10's own three boards and cards, the title slam, game,
// goals read by Pip, countdown, the HOLD ON! ring with its picture and both clue labels on top of the ring, round card, the Round 1 lock-in with
// EP10's three boards in the ring and their three clue labels on top of it, Mark Sentences read by the buddy, the book strips, the board OUR
// TORCH TEST as a functional placeholder, the LOOK-CLOSER frame, score hand, read-along, "Now you know!"); every scene with new art is a phScene
// placeholder (and each [LOOK CLOSER] an lcPH placeholder inside the real frame). STAGE 2 (Fable) draws them: see SCENES_TODO.md.
if (PART === 1) { (() => {
const L1 = "g901";
// the scores (script section 3): HOLD ON! 1 : 0, Round 1 2 : 1
SCORE.push([W("g803", "one") - .1, 1, 0]);
SCORE.push([W("g1007", "one") - .1, 2, 1]);
const FOOT = "P3 · Diversity of Materials · Transparency";
const stageNote = (txt, y = 1000) => T(960, y, "(Stage 2: " + txt + ")", 24, "#fff", { w: 500 });
const DARE = [["dClear", "clear glass"], ["dFrost", "frosted glass"], ["dDoor", "a wooden door"]];
// EP10's dare board with its small torch in front of it (EP10 p2.js SC.dare, the same art); origin = the board's centre
const dareBoard = (i, x, y, sc, o = {}) => picBoard(DARE[i][0], x, y, 1, { sc, lab: o.lab === false ? undefined : DARE[i][1], size: 44, id: "p1d" + i + (o.id || "") }) + TF(x + 110 * sc, y + 95 * sc, 1.1 * sc, torch());

/* 1 · silent cold open: the living room of an HDB flat at dusk */
SC.cold = (t, s) => phScene(t, s, "1 · Cold open: the living room of an HDB flat at dusk (no voice)", ["Clear glass window with an orange-violet sky; a white wooden bedroom door; the bathroom door ajar, its frosted window glowing softly; sofa; a standing lamp turned low. On a shelf by the window, small: a glass fish tank (plants, lid, bubbles) with the little GOLDFISH (every wide shot of the room). On the dining table: the torch on its stand (off) on the TORCH MARK, the empty holder, the card OUR CARD, the rack of framed sheets, Basil's wind-up robot.",
  "MK boardsIn: EP10's three dare boards slide in low along the table with dust and stand at the back (dareBoard(), ep10dare.js). MK budsIn: Pip, Basil (surprised), Momo pop in. Pill: An HDB flat, Singapore. Small print upper left (torchRule, wired). No title."]) + torchRule(t, .7);

/* 2 · "Last time...": EP10's dare, word for word. ONE calm picture: EP10's three boards side by side, centred and large, a gentle push-in,
   the big ? above them, EP10's three cards under them; as Heart says each card its board steps forward and its card lights (>= 2.5 s each) */
SC.lasttime = (t, s) => { const L = "g202", tc = [W(L, "one", 1), W(L, "two"), W(L, "three")], z = 1 + .04 * eio((t - s.t0) / 8), k = ramp(t, s.t0 + .05, .5), cur = tc.filter((x) => t >= x - .15).length - 1;
  let boards = ""; [0, 1, 2].forEach((i) => { const fw = cur === i ? ss(tc[i] - .15, tc[i] + .25, t) : (cur > i ? 1 - ss(tc[i + 1] - .15, tc[i + 1] + .25, t) : 0);
    boards += dareBoard(i, 560 + i * 400, 640 + 14 * (1 - spring(t, s.t0 + .2 + i * .15, .45)), .95 * (1 + .1 * fw), { id: "lt" }); });
  return bg("stage2") + OP(ramp(t, s.t0, .3), T(960, 110, "Last time…", 60, "#fff", { w: 600 }))
    + OP(k, `<g transform="translate(960 540) scale(${n2(z)}) translate(-960 -540)">${boards}</g>`
      + (t >= W(L, "which") - .1 ? TF(960, 240, spring(t, W(L, "which") - .1, .5) * (1 + .05 * Math.sin(t * 4)), `<g filter="url(#dropS)"><circle r="50" fill="url(#gSun)"/></g>${T(0, 26, "?", 78, P.ink)}`) : "")
      + ["Clear glass", "Frosted glass", "A wooden door"].map((c, i) => TF(560 + i * 400, 880, .5 * spring(t, tc[i] - .1, .45), ansCard(i + 1, c, { w: 430, h: 290, size: 50, pulse: cur === i ? .9 : pulse(t, tc[i], .04, .9) }))).join("")   /* each card lights as Heart says it (no tick: the answer is Round 1's) */
      + TF(960, 1010, spring(t, W(L, "which") - .1, .4), tpill(0, 0, "Which one lets only some light pass through?", 40, P.sun, P.ink, { w: 700 }))) + HUD(t); };
SC.tests = (t, s) => phScene(t, s, "2 · Back at the table: the board OUR TORCH TEST", ["Back in the living room. The board OUR TORCH TEST slides in low and stands at the end of the table, centred between the discs: MOST LIGHT · ONLY SOME LIGHT · NO LIGHT, three empty rows. Pill: Hold on to your answer!",
  "Placeholder board below: torchBoard() in tests.js (functional rows, tiles, stamped words; redraw it)."]) + TF(1500, 1060, .5, torchBoard(t)) + torchRule(t);
// the title slam over the dimmed table (WIRED; Stage 2's drawn room shows through): SEE-THROUGH? BLURRY? (white) then OR BLOCKED?! (sun yellow).
// The second slam is the first thing to cut if Part 1 runs long (script section 6: a picture beat only).
const slamFit = (y, txt, col, k) => slamLine(y, txt, Math.min(150, 150 * 1720 / tw(txt, 150, 700, "Fredoka", 4)), col, k);
SC.title = (t, s) => { const u = t - MK("title"), dim = clamp(u / .2); return lcSet(t, s, "tests") + `<rect width="1920" height="1080" fill="${P.night}" opacity="${n2(.78 * dim)}"/>`
  + slamFit(400, "SEE-THROUGH? BLURRY?", "#fff", slamK(u, .05)) + slamFit(600, "OR BLOCKED?!", P.sun, slamK(u, .55)) + HUD(t); };

/* 3 · the game, and the hidden goldfish; 4 · goals (Pip reads) and the countdown (count is in common.js) */
SC.game = (t, s) => gameScene(t, s, "g301", true);
SC.goals = (t, s) => goals3(t, s, [["The torch test", ""], ["Transparent", ""], ["Translucent", ""]], ["g401", "g402", "g403", "g404"], "pip");

/* 5 · the torch test is set up: three things, the safety rule (the small print grows to the middle for Heart's sentence: WIRED); Basil's robot */
SC.setup = (t, s) => { const b = "g502", g = ss(LT(b) - .3, LT(b) + .2, t) * (1 - ss(LE(b) + .2, LE(b) + .7, t));
  return phScene(t, s, "5 · The torch test is set up", ["The test table from the side, large and clear, on the dining table. As Heart names each thing it lifts a little and its label shows: the torch on its stand (torch, on \"torch\"), the holder with its slot (sheet goes here, on \"sheet\"), the white card (card, on \"card\"). A plain line on the table joins the three.",
    "g502: the small print grows to the middle (wired below) with a small picture of the torch pointing at the card and a green tick, then goes back to its corner."])
    + (g > .01 ? `<rect width="1920" height="1080" fill="${P.night}" opacity="${n2(.45 * g)}"/>` + TF(lerp(300, 960, g), lerp(196, 520, g), lerp(1, 2, g), finePrint(t, -9, TORCH_RULE, 0, 0)) + OP(g, TF(1180, 640, 1, tickBadge(40)) + stageNote("beside it: the torch pointing at the card", 620)) : torchRule(t)); };
SC.robot = (t, s) => phScene(t, s, "5 · Basil: \"So my robot will hide for me!\"", ["Basil big in his disc (cheer pose). EP1's wind-up robot (props.js robotRig / robotWalk) is slid low along the table to stand by the rack, with dust puffs (it never floats). Tag: Basil's robot. A boing, a small wind-up tick-tick."]) + torchRule(t);

/* 6 · sheet one: clear glass; [LOOK CLOSER] the torch on clear glass */
SC.sheet1 = (t, s) => phScene(t, s, "6 · Sheet one: clear glass", ["An adult's hands lift the framed sheet of clear glass from the rack and set it upright in the holder (a soft wooden tok). Tag: clear glass. Small print beside the frame for 3 s: An adult holds the glass. The camera starts to move in on \"Look closer\" (the set the look-closer zooms in from)."]) + torchRule(t);
SC.lcclear = (t, s) => lcPH(t, s, { title: "The torch on clear glass; the robot behind it", v: "v_clear", verdict: VSTYLE("MOST LIGHT PASSES THROUGH", 0), fx: 960, fy: 600,
  beats: [["on1", "torch on: the beam"], ["spot1", "the bright spot lands"], ["off1", "torch off, room light up"], ["robot1", "the robot is set behind; the camera swings round"], ["v_clear", "verdict"]],
  notes: ["Torch, sheet and card fill the window from the side; the room dims. MK on1: an adult's finger presses the switch (click); a soft pale cone from the lens to the glass and on past it, just as bright; a faint glint shows the glass. Labels: the light goes in · the light comes out.",
    "MK spot1: a bright round spot with a clean edge lands on the card (a small ting); label a bright spot. MK off1: torch off, the room light comes up a little. MK robot1: a hand sets the robot behind the glass; the camera swings round to look straight through: the robot is SHARP (eyes, red button, two yellow buttons, key). Label We see it clearly.",
    "No shadow anywhere (the torch is off while the robot is behind the glass). Verdict MOST LIGHT PASSES THROUGH (green) at v_clear."] });
SC.clearans = (t, s) => phScene(t, s, "6 · Momo: \"I can see every button!\"", ["Pull back a little. Momo big in her disc (surprised pose) beside the table; the robot seen through the clear glass (g605, cuttable: she is surprised in silence)."]) + torchRule(t);

/* 7 · Mark Sentence 1 (Momo): TRANSPARENT pops beside the card after its last word (lib.js o.at); row 1 of the board; the book's strip */
SC.mark1 = (t, s) => markScene(t, s, { id: "g703", sayId: "g702", who: "momo", n: "1 of 2", text: "Some materials allow most light to pass through them. These materials are transparent.", keys: ["most", "light", "pass", "through", "transparent."], size: 62, y: 250, footer: FOOT,
  extra: (HAS("g701") ? OP(ramp(t, LT("g701") - .1, .3) * (1 - ramp(t, LT("g702") - .2, .3)), T(1150, 175, "Here are the book's words.", 44, "#fff", { w: 600 })) : "") + stageNote("under the card: the clear glass with its beam and the bright spot", 1040) });
SC.row1 = (t, s) => phScene(t, s, "7 · Row 1: MOST LIGHT · TRANSPARENT", ["Back at the table. MK row1: the clear glass's tile hops low onto the board's first row and TRANSPARENT is stamped beside it in green (torchBoard below, functional). The book's sentence on a cream strip (wired, >= 3.5 s); beside it, the robot seen through the glass."])
  + bookCaption(t, "g704", "You can clearly see objects placed behind transparent materials.", 120, { size: 46, keys: ["clearly", "see", "placed", "behind"] }) + TF(1500, 1060, .5, torchBoard(t, { glow: 0 })) + torchRule(t);

/* 8 · HOLD ON! Basil moves the torch. WIRED (model: EP10 SC.holdon): the HOLD ON! stamp, the YOU ring with crossed arms (5 s), the picture in
   the ring with its two clue labels ON TOP of the ring frame, kept through the countdown and Heart's rule, the bell, the coin. Stage 2 draws the
   table behind (the hands change the sheets at swap1; the torch slides off the TORCH MARK at push) and the picture in the ring. */
const RG = [1240, 520], RR = 150;
SC.holdon = (t, s) => { const a = "g801", b = "g802", c = "g803", r0 = MK("ring0_hold"), bell = MK("bell_hold"), rs = ringState(t, r0, 5), tX = W(b, "cross") - .15, tH = W(b, "hold") - .1, tOne = W(c, "one") - .1, ring = t >= tX && t < LE(c) + .4;
  const pic = `<rect x="${RG[0] - 120}" y="${RG[1] - 50}" width="240" height="100" rx="16" fill="#fff" opacity=".85"/>${T(RG[0], RG[1] - 6, "torch far off its mark,", 22, P.ink)}${T(RG[0], RG[1] + 24, "up close to the sheet", 22, P.ink)}`;
  const labels = TF(RG[0] - 150, RG[1] - RR - 34, spring(t, tX + .2, .4), tpill(0, 0, "the sheet: changed", 28, "#fff", P.ink, { w: 700 })) + TF(RG[0] + 160, RG[1] - RR - 34, spring(t, tX + .35, .4), tpill(0, 0, "the torch: moved", 28, "#fff", P.ink, { w: 700 }));
  return bg("stage2") + stageNote("the table behind, dimmed: swap1 frosted glass in; push the torch slides off its mark", 160)
    + buddy("basil", 330, 1060, 300, t, { aura: true, in: s.t0 + .1, poses: [[s.t0, "sit"], [LT(a) - .12, "cheer"], [LE(a) + .3, "sit"], [W(c, "torch") - .12, "surprised"], [LE(c) + .1, "sit"]], nohop: true })
    + say(a, 560, 300, t, { size: 42, tail: -200, maxW: 640 })
    + (ring ? OP(1 - ss(LE(c) + .1, LE(c) + .4, t), TF(RG[0], RG[1], spring(t, tX, .4), `<g transform="translate(${-RG[0]} ${-RG[1]})">${ringTimer(RG[0], RG[1], t < r0 ? 1 : t < bell ? rs.frac : 0, t < r0 ? 5 : t < bell ? rs.secs : 0, t, { R: RR, sw: 24, tick: rs.tick, shut: pulse(t, bell, .01, .6), inner: pic + (t < bell + .3 ? OP(.85, TF(RG[0], RG[1] + 40, .38, crossedArms())) : "") })}</g>`)
      + labels + youPill(RG[0] - 250, RG[1] + 120, 1.0) + tpill(RG[0], RG[1] + RR + 60, "cross your arms", 30, P.ink, "#fff")) : "")
    + (t >= W(c, "good") - .1 ? TF(960, 960, spring(t, W(c, "good") - .1, .4), tpill(0, 0, "In a good test, we change one thing only: the sheet.", 38, P.sun, P.ink, { w: 700 })) : "")
    + stamp(t, tH, 900, 420, "HOLD ON!") + bellIcon(t, r0) + coin(t, tOne, 1680, 860, "+1", "arms crossed") + torchRule(t) + HUD(t); };
SC.fixtorch = (t, s) => phScene(t, s, "8 · Basil: \"Oops! Same torch. Same place.\"", ["Basil: oops pose, then sit. MK back: the torch slides back along the table to the TORCH MARK; the line glows (a soft tok). Tags over the table, one by one: same torch · same place · only the sheet changes (they stay if g804 is cut)."]) + torchRule(t);

/* 9 · Round 1: the dare from EP10 (a short 3 s ring). EP10's three boards in the ring (real art); clue labels clear glass · frosted glass · wood
   on top of the ring frame, kept through the countdown (lockN c.labels) */
SC.r1card = (t, s) => roundCard(t, s, "ROUND 1", "YOUR ANSWER FROM LAST TIME");
const r1labels = (t) => { const tq = W(L1, "which") - .1; return t < tq ? "" : ["clear glass", "frosted glass", "wood"].map((l, i) => TF(430 + (i - 1) * 205, 470 - RING_R - 14 - (i === 1 ? 46 : 0), spring(t, tq + i * .12, .4), tpill(0, 0, l, 30, "#fff", P.ink, { w: 700 }))).join(""); };
SC.r1 = (t, s) => lockN(t, { cards: ["Clear glass", "Frosted glass", "A wooden door"], labels: r1labels, q: "Which one lets only some light pass through?", tq: W(L1, "which") - .1, tc: [W(L1, "clear"), W(L1, "frosted"), W(L1, "wooden") - .2], ring0: MK("ring0_r1"), dur: 3, lock: "g902",
  obj: (tt) => [0, 1, 2].map((i) => dareBoard(i, 430 + (i - 1) * 108, 530, .3, { lab: false, id: "r1" })).join(""),
  picks: [{ who: "pip", id: "g903", word: "3", x: true }, { who: "momo", id: "g904", word: "2" }, { who: "basil", id: "g905", word: "2" }],
  react: [[LE("g903") + .1, "pip", "thinking"], [LE("g904") + .1, "momo", "pointing"], [LE("g905") + .1, "basil", "cheer"]] });

/* 10 · [LOOK CLOSER] the torch on frosted glass (FROSTED GLASS pops inside it: lib.js o.at); before and after; the blurry robot; the answer */
SC.lcfrost = (t, s) => lcPH(t, s, { title: "The torch on frosted glass, beside the clear glass; the blurry robot", v: "v_frost", verdict: VSTYLE("ONLY SOME LIGHT PASSES THROUGH", 1), fx: 960, fy: 600,
  setNote: "the test table from the side, the frosted glass in the holder, the torch back on its TORCH MARK (the look-closer zooms in from here)",
  beats: [["kw_frosted_glass", "FROSTED GLASS pops"], ["on2", "torch on"], ["glow2", "the soft glow on the card"], ["split", "before / after split"], ["off2", "torch off"], ["robot2", "robot behind; camera swings round"], ["v_frost", "verdict"]],
  notes: ["Torch, frosted sheet and card fill the window; the room dims. FROSTED GLASS pops at the upper right (wired). MK on2: click; the beam reaches the sheet; the SHEET ITSELF glows softly; behind it no clean beam, only a wide, faint, soft-edged glow on the card (MK glow2; label a soft, dim glow). Label the light goes in.",
    "MK split: the frame splits. Left: a held picture of the clear glass with its bright spot (tag clear glass · a bright spot). Right: the frosted glass, live (tag frosted glass · a soft glow). MK off2: torch off, room light up. MK robot2: a hand sets the robot behind the frosted glass; the camera swings round: a soft blur of its colours, no edges, no buttons (the kit's soft blur). Label a blurry shape.",
    "Verdict ONLY SOME LIGHT PASSES THROUGH (blue) at v_frost. No shadow; nothing about why frosted glass is frosted."] });
SC.frostans = (t, s) => phScene(t, s, "10 · The answer is two: frosted glass!", ["Back to the round's cards: answer card 2 Frosted glass glows. Pip: surprised pose, then a nod (g1006, cuttable: he nods in silence). Coin +1 if you showed two fingers. Score 2 : 1 (SCORE, wired)."]);

/* 11 · Mark Sentence 2 (Basil): TRANSLUCENT pops beside the card; row 2 of the board; the book's strip */
SC.mark2 = (t, s) => markScene(t, s, { id: "g1102", sayId: "g1101", who: "basil", n: "2 of 2", text: "Some materials allow only some light to pass through them. These materials are translucent.", keys: ["only", "some", "light", "pass", "through", "translucent."], size: 60, y: 250, footer: FOOT,
  extra: stageNote("under the card: the frosted glass with its soft glow", 1040) });
SC.row2 = (t, s) => phScene(t, s, "11 · Row 2: ONLY SOME LIGHT · TRANSLUCENT", ["MK row2: the frosted glass's tile hops low onto the second row and TRANSLUCENT is stamped beside it in blue (torchBoard below). The book's sentence on a cream strip (wired, >= 3.5 s); beside it, the blurred robot behind the frosted glass. Two rows filled; row 3 NO LIGHT empty."])
  + bookCaption(t, "g1103", "You cannot clearly see the objects placed behind translucent materials.", 120, { size: 44, keys: ["cannot", "clearly", "see", "placed", "behind"] }) + TF(1500, 1060, .5, torchBoard(t, { glow: 1 })) + torchRule(t);

/* 12 · BE THE LIGHT (the first-person journey) */
SC.waitw = (t, s) => phScene(t, s, "12 · Be the light! (the glide in)", ["Pill Be the light! The camera glides down the table to the back of the torch; a soft cream wipe at the scene end. The shelf slides aside (SHELF_HIDE)."]);
SC.shrink = (t, s) => phScene(t, s, "12 · BE THE LIGHT (first person, present tense)", ["MK torch: inside the torch, a small dark room, a tiny bulb, a shiny cup all round it; the edges of the view glow softly (you are light). Tags You: light · inside the torch. A click (the word Click!): the view rushes forward out of the lens; the table top stretches away like a wide plain. Tag out you fly.",
  "MK glass: ahead only a faint glint and the wooden frame; it slides past, nothing slows you. Tag clear glass · straight through. MK card: a white wall rushes up; a bright ring spreads where you land. Tag a bright spot. MK again: a soft cream blink, back in the torch; tag again!",
  "MK frost: a pale cloudy wall fills the view; part of the view goes on through, dimmer; the wall glows. Tag frosted glass · only some pass through. The card comes up slowly: a faint wide glow (tag a soft glow). Calm pad; no shadows, no P4 ideas."]);

/* 13 · pull back out; the score hand, the goldfish (lizReveal in common.js), the key words (kwrecap in common.js) */
SC.pullout = (t, s) => phScene(t, s, "13 · Pull back out to the table", ["Whoosh out of the light's world to the living room table (0.8 s)."]);
SC.final = (t, s) => { const L = "g1301"; return finalScene(t, s, L, 1, [[s.t0, null, 1], [W(L, "two") - .1, null, 2]]); };
SC.liz = (t, s) => phScene(t, s, "13 · Did you spot the goldfish? (lizReveal in common.js)", ["A replay of the wide living room with a ring round the little goldfish in the glass tank on the shelf; it swims to the front, blows a bubble and waves its tail. Pill: Tell someone at home! Use lizReveal(t, s, \"g1302\", view, x, y, tq, \"It was in the glass tank, on the shelf!\")."]);

/* 14 · the cliffhanger: the white door */
SC.cliff = (t, s) => phScene(t, s, "14 · Cliffhanger: a wooden door, painted white", ["The table from the torch's side. MK doorIn: an adult's hands set the piece of a white wooden door in the holder (white front, bare wood on its edges, a small round knob; tags wood · painted white); the robot is slid low behind it, out of sight. The torch is still OFF. Basil big in his disc (cheer).",
  "A big ? pops on the door on \"How much light\". PART 2 slams in on \"Find out in Part Two!\" (model: ep10/p1.js SC.cliff). The board (below) centred between the discs: rows 1-2 filled, row 3 NO LIGHT glows empty."]) + TF(1500, 1060, .5, torchBoard(t, { glow: 2 })) + torchRule(t);

/* 15 · "Now you know!": the board OUR TORCH TEST (two rows filled) centred in the free space between the buddies */
SC.nyk = (t, s) => nykScene(t, s, TF(920, 1040, .62, torchBoard(t)), { bx: [200, 1715, 1375], hx: 470 });
})(); }
