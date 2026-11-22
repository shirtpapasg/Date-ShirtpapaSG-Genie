// p1.js: PART 1, "Why Does the Sun Come BACK Every Morning?": EP13's dare answered (the Earth turns), day and night, what a cycle is, cycle
// or not. Segments 1-16 of p3_ep14_script.md (version 1, 22 Nov 2026; the teacher's go-ahead and the 22 Nov full-sentence change in section 12).
// STAGE 1 (setup): the shared routines are wired (the cold open's real boards sliding in (EP13's three dusk boards, ep13dare.js), the calm
// recap of EP13's dare with its boards stepping forward and its cards lighting, the title slam, the game as ONE smooth push-in from the living
// room onto the owl (common.js gameScene, EP12 v2), goals read by Pip, countdown, Round 1's lock-in with the boards on the cards and the clue
// labels every evening: it goes · every morning: it comes back on top of the ring, the answer with the tick and the x chips on the real
// boards, Mark Sentences read by Basil / Momo, the board CYCLE CHECK as a functional placeholder (tiles, ticks and tags on their marks), the
// HOLD ON! ring with its two clue labels on top of the ring, the LOOK-CLOSER frame, score hand, the owl's smooth reveal, read-along, "Now you
// know!"); every scene with new art is a phScene placeholder (and each [LOOK CLOSER] an lcPH placeholder inside the real frame). STAGE 2
// (Fable) draws them: see SCENES_TODO.md (what each buddy does, how the camera moves, the small life in the background and the light).
if (PART === 1) { (() => {
const L1 = "g501";
// the scores (script section 3): Round 1 1 : 0, HOLD ON! 2 : 0 (the buddies score nothing in this part)
SCORE.push([MK("coin1") - .1, 1, 0]);
SCORE.push([W("g1203", "one") - .1, 2, 0]);
const FOOT = "P3 · Cycles · Day and night";
const stageNote = (txt, y = 1000) => T(960, y, "(Stage 2: " + txt + ")", 24, "#fff", { w: 500 });
// EP13's dare board (ep13dare.js, EP13's own art); origin = the board's centre
const dareBoard = (i, x, y, sc, o = {}) => picBoard(DARE_PICS[i], x, y, 1, { sc, lab: o.lab === false ? undefined : DARE_CARDS[i].toLowerCase(), size: 30, id: "p1d" + i + (o.id || "") });
const sunRule = (t, t0 = -9) => smallPrint(t, t0, SUN_RULE);   // "Never look at the Sun." whenever the Sun is drawn (script section 1, Safety)
const qMark = (t, t0, x, y, r = 50) => t < t0 ? "" : TF(x, y, spring(t, t0, .5) * (1 + .05 * Math.sin(t * 4)), `<g filter="url(#dropS)"><circle r="${r}" fill="url(#gSun)"/></g>${T(0, r * .52, "?", r * 1.56, P.ink)}`);
const xChip = (t, t0, x, y, s = 1) => t < t0 ? "" : TF(x, y, spring(t, t0, .4) * s, `<g filter="url(#dropS)"><circle r="30" fill="#fff" stroke="${P.ink}" stroke-width="4"/></g><path d="M-12 -12 L12 12 M12 -12 L-12 12" stroke="${P.ink}" stroke-width="7" stroke-linecap="round"/>`);
const tickChip = (t, t0, x, y, s = 1) => t < t0 ? "" : TF(x, y, spring(t, t0, .4) * s, tickBadge(30));
// the board CYCLE CHECK (tests.js cycleBoard, functional placeholder) sliding in low at boardIn
const boardIn = (t, x, y, sc, o = {}) => { const t0 = MK("boardIn"); if (t < t0) return ""; const [bx, d] = slideX(t, t0, .7, 2600, x, y); return d + TF(bx, y, sc, cycleBoard(t, o)); };
const slamFit = (y, txt, col, k) => slamLine(y, txt, Math.min(170, 170 * 1720 / tw(txt, 170, 700, "Fredoka", 4)), col, k);

/* 1 · silent cold open: an HDB flat before sunrise (the boards slide in low: EP13's real art, WIRED) */
const CBX = [620, 960, 1300];
SC.cold = (t, s) => phScene(t, s, "1 · Cold open: an HDB flat before sunrise (no voice)", ["The living room in soft grey-blue light; through the window (grille, curtains drawn back) the far blocks are dark shapes with a few lit windows, the sky turning from deep blue to pale orange; a clock on the wall at five to seven; on a branch of the rain tree at the side of the window, small, the little OWL asleep (every wide shot of the room). On the low table: a globe, a torch, four books.",
  "MK boardsIn: EP13's three dare boards slide in low with dust puffs and stand in front of the window wall (wired below with the real boards). MK budsIn: Pip, Basil (a big yawn, sit), Momo pop in; MK sunedge: the first edge of the Sun shows between two far blocks. Pill: An HDB flat, Singapore · early morning. No title."])
  + [0, 1, 2].map((i) => { const t0 = MK("boardsIn") + i * .3; if (t < t0) return ""; const [x, d] = slideX(t, t0, .7, 2500, CBX[i], 990); return d + dareBoard(i, x, 900, .5, { lab: false, id: "c" }); }).join("")
  + sunRule(t, MK("sunedge"));

/* 2 · "Last time...": EP13's dare, word for word. ONE calm picture: EP13's three boards side by side, centred and large, a gentle push-in,
   the big ? above them, EP13's three cards under them; as Heart says each card its board steps forward and its card lights (>= 2.5 s each). WIRED */
SC.lasttime = (t, s) => { const L = "g203", tc = [W(L, "one"), W(L, "two"), W(L, "three")], z = 1 + .04 * eio((t - s.t0) / 8), k = ramp(t, s.t0 + .05, .5), cur = tc.filter((x) => t >= x - .15).length - 1;
  let boards = ""; [0, 1, 2].forEach((i) => { const fw = cur === i ? ss(tc[i] - .15, tc[i] + .25, t) : (cur > i ? 1 - ss(tc[i + 1] - .15, tc[i + 1] + .25, t) : 0);
    boards += dareBoard(i, 560 + i * 400, 600 + 14 * (1 - spring(t, s.t0 + .2 + i * .15, .45)), .95 * (1 + .1 * fw), { id: "lt" }); });
  return bg("stage2") + OP(ramp(t, s.t0, .3), T(960, 110, "Last time…", 60, "#fff", { w: 600 }))
    + OP(k, `<g transform="translate(960 540) scale(${n2(z)}) translate(-960 -540)">${boards}</g>`
      + qMark(t, W("g202", "why") - .1, 960, 240)
      + DARE_CARDS.map((c, i) => TF(560 + i * 400, 880, .5 * spring(t, tc[i] - .1, .45), ansCard(i + 1, c, { w: 430, h: 290, size: 50, pulse: cur === i ? .9 : pulse(t, tc[i], .04, .9) }))).join("")
      + TF(960, 1010, spring(t, W("g202", "why") - .1, .4), tpill(0, 0, DARE_LABEL, 40, P.sun, P.ink, { w: 700 }))) + sunRule(t, s.t0 + .3) + HUD(t); };
SC.back = (t, s) => phScene(t, s, "2 · Back in the living room", ["The living room (the cold open's set), a little lighter: EP13's three boards by the window wall (wired), the buddies in their discs (Basil still sleepy). Pill: Hold on to your answer! (wired)."])
  + [0, 1, 2].map((i) => dareBoard(i, CBX[i], 900, .5, { lab: false, id: "bk" })).join("")
  + (t >= LT("g204") - .1 ? TF(960, 700, spring(t, LT("g204") - .1, .4), tpill(0, 0, "Hold on to your answer!", 40, P.sun, P.ink, { w: 700 })) : "") + sunRule(t);
// the title slam over the dimmed room (WIRED; Stage 2's drawn room shows through): WHY DOES THE SUN (white) then COME BACK? (sun yellow).
// The second slam is the first thing to cut if Part 1 runs long (script section 6, CUTS "title2": a picture beat only).
const TITLE = (k1, k2) => slamFit(400, "WHY DOES THE SUN", "#fff", k1) + slamFit(610, "COME BACK?", P.sun, k2);
SC.title = (t, s) => { const u = t - MK("title"), dim = clamp(u / .2); return lcSet(t, s, "back") + `<rect width="1920" height="1080" fill="${P.night}" opacity="${n2(.78 * dim)}"/>` + TITLE(slamK(u, .05), slamK(u, .55)) + HUD(t); };

/* 3 · the game, and the hidden owl: ONE smooth push-in from the (dimmed) living room straight onto the owl on its branch, the title words
   slipping away; then the game's things pop out over it (common.js gameScene; teacher, 22 Nov). Stage 2: R.world = the drawn room (VF). */
SC.game = (t, s) => gameScene(t, s, "g301", true, { world: (tt) => flatPH(tt), A: OWL, T: [1400, 470], Z: 2.4, dim0: .78, ly: -150, qx: 1730, qy: 430, pre: () => TITLE(1, 1) });
SC.goals = (t, s) => goals3(t, s, [["Day and night", ""], ["What a cycle is", ""], ["Cycle or not?", ""]], ["g401", "g402", "g403", "g404"], "pip");

/* 5 · Round 1: the dare from EP13 (a short 3 s ring). In the ring: the far blocks with the Sun's edge between them (ringPH: Stage 2 draws it);
   clue labels on top of the ring frame, kept through the countdown (lockN c.labels); EP13's boards small on the three cards (real art).
   No x chip yet: the two look-closers decide (the chips land in globeans) */
SC.r1card = (t, s) => roundCard(t, s, "ROUND 1", "YOUR ANSWER FROM LAST TIME");
const r1labels = (t) => { const tq = W(L1, "why") - .1; return t < tq ? "" : DARE_CLUES.map((l, i) => TF(430 + (i ? 150 : -150), 470 - RING_R - 14 - (i ? 0 : 50), spring(t, tq + i * .15, .4), tpill(0, 0, l, 28, "#fff", P.ink, { w: 700 }))).join(""); };
SC.r1 = (t, s) => lockN(t, { cards: DARE_CARDS, labels: r1labels, q: DARE_LABEL, tq: W(L1, "why") - .1, tc: [W(L1, "why"), W(L1, "come"), W(L1, "show")], ring0: MK("ring0_r1"), dur: 3, lock: "g502",
  icons: [0, 1, 2].map((i) => dareBoard(i, 0, 0, .34, { lab: false, id: "r1i" })),
  obj: ringPH("the far blocks, the Sun's edge"), over: (tt) => qMark(tt, W(L1, "why") - .1, 1262, 210, 40) + finePrint(tt, -9, SUN_RULE, 1640, 250),   // the small print clear of the clue labels
  picks: [{ who: "momo", id: "g503", word: "1" }, { who: "pip", id: "g504", word: "3" }, { who: "basil", id: "g505", word: "2" }],
  react: [[LE("g503") + .1, "momo", "pointing"], [LE("g504") + .1, "pip", "thinking"], [LE("g505") + .1, "basil", "cheer"]] });

/* 6 · [LOOK CLOSER] the sky from our window, two days, speeded up. Wired over the placeholder: the clock pill (CLOCK, on its marks), the
   speeded-up tag, the small print, the cream day time / nighttime tags, the row of four small skies (row1..row4), Pip small at the edge */
const ROWX = [520, 760, 1000, 1240];
SC.lcsky = (t, s) => lcPH(t, s, { title: "The sky from our window: two days, speeded up", v: "v_sky", verdict: VSTYLE("DAY AND NIGHT: A REPEATED PATTERN", "sun"), fx: 1150, fy: 420,
  beats: [["clk0", "Monday 7:00 am: the Sun comes up behind the far blocks"], ["sunup", "the sky goes bright blue; the light on the blocks moves"], ["dusk", "Monday 7:30 pm: warm light, orange, deep blue"], ["lampson", "dark; the flats' windows and street lamps come on"], ["stars", "stars in a CLEAR sky"], ["noclouds", "labels a clear sky · no clouds"], ["nosun", "label no Sun"], ["tue7", "Tuesday 7:00 am: bright"], ["tue730", "Tuesday 7:30 pm: dark"], ["wed7", "Wednesday 7:00 am: bright"], ["row1", "the row of four skies builds"], ["v_sky", "verdict"]],
  notes: ["The camera pushes in on the window until its view fills the frame: the far blocks and the sky (the room dims; the buddies and the cards step back; the owl is NOT in this frame). The window faces EAST: the Sun comes up behind the far blocks at about 7 am, climbs and leaves the top of the window; it never sets in this window (it sets behind the block).",
    "Afternoon: the light on the blocks turns warm and long; dusk: the sky goes orange, then deep blue, then dark at about 7:30 pm; the flats' windows and the street lamps come on one by one; stars, NO cloud at all on the first night (hold about 5 s); then the same place brightens again. Life: birds cross at dawn, a far bus, a plane's light blinks at night.",
    "Wired: the clock pill (lower left), speeded up, Never look at the Sun., the cream tags, the row of four small skies under the view (bright, dark, bright, dark: draw each as a tiny sky), Pip small at the lower left (surprised, then a nod)."],
  over: (tt) => sunRule(tt, s.t0 + 1.2) + stepPill(tt, CLOCK, 390, 905) + speeded(tt, MK("clk0"), MK("v_sky"), 1660, 905)
    + dnTag(tt, MK("tagday"), 1300, 300, false, "day time", { t1: MK("dusk") }) + dnTag(tt, MK("tagnight"), 1300, 300, true, "nighttime", { t1: MK("tue7") })
    + ROWX.map((x, i) => { const t0 = MK("row" + (i + 1)); return tt < t0 ? "" : TF(x, 800, spring(tt, t0, .4), `<rect x="-90" y="-50" width="180" height="100" rx="12" fill="${i % 2 ? "#1B1640" : "#8FD3FF"}" stroke="#fff" stroke-width="4"/>` + T(0, 10, i % 2 ? "dark" : "bright", 24, i % 2 ? "#fff" : P.ink)); }).join("")
    + buddy("pip", 150, 1062, 170, tt, { aura: true, in: s.t0 + 1.4, poses: [[s.t0, "sit"], [MK("noclouds"), "surprised"], [HAS("g605") ? LE("g605") + .2 : MK("tue7"), "sit"]], jump: [[HAS("g605") ? LE("g605") + .25 : MK("tue7"), 16]] })
    + (HAS("g605") ? say("g605", 470, 620, tt, { size: 36, tail: -160, maxW: 520 }) : "") });

/* 7 · the curtains are drawn, a red sticker on Singapore; [LOOK CLOSER] the globe and the torch; the answer (two) on EP13's real boards */
SC.curtains = (t, s) => phScene(t, s, "7 · So why does it repeat?", ["The living room. MK curtains: an adult's hands draw the curtains (curtain rings); the room goes dim. On the low table: the globe (a school globe on its stand, about 30 cm, tilted) and the torch (EP11's) lying on its pile of four books, pointing at the globe, about a metre away. MK sticker (\"Look\"): a hand presses a small round red sticker onto the globe, on Singapore, at the tip of the Malay Peninsula, just above the Equator (a small pat).",
  "Buddies: they lean in towards the table in their discs (Momo curious, Pip thinking, Basil proud of \"his\" globe). Camera: a slow push towards the table, the start of the look-closer."]);
SC.lcglobe = (t, s) => lcPH(t, s, { title: "The globe and the torch (a model)", v: "v_globe", verdict: [`THE EARTH TURNS`, GOODC], fx: 960, fy: 640,
  beats: [["torchon", "a hand switches the torch on: the half facing it is lit"], ["lab_earth", "label our Earth"], ["lab_sun", "label our Sun"], ["lab_sg", "label Singapore (to the red dot)"], ["pin", "the torch stays still (a pin mark by it)"], ["turn", "the globe turns (a curved line); the hand turns it towards the east"], ["dday", "the dot in the middle of the light"], ["ddark", "the dot crosses into the shadow"], ["dnight", "tag nighttime"], ["dlight", "round, into the light again"], ["v_globe", "verdict"]],
  notes: ["The camera pushes in until the globe fills most of the window, the torch at the edge; the rest of the room is dark; the buddies step back. EXACTLY half of the globe is lit (the half facing the torch), the edge between light and dark soft. Plain label lines (no arrowheads): our Earth · our Sun · Singapore (to the red dot); the torch stays still (a small pin mark on the table beside it, still there at the end) · the globe turns (a curved line round the globe).",
    "An adult's hand turns the globe slowly TOWARDS THE EAST (anticlockwise seen from above), without a stop from MK turn: the red dot is in the middle of the lit half (MK dday: cream tag the side that faces the Sun: day time, wired); it reaches the edge of the light and crosses into the shadow (MK ddark; MK dnight: tag the side that faces away from the Sun: nighttime, wired); it comes round the far side and into the light again at the other edge (MK dlight). The torch never moves.",
    "Sound: a torch click at torchon, the globe's soft slow rumble without a stop. Small print for the whole model (wired): A model. Never shine a torch at anyone's eyes."],
  over: (tt) => smallPrint(tt, s.t0 + 1.0, TORCH_RULE) + dnTag(tt, MK("dday"), 1180, 300, false, "the side that faces the Sun: day time", { size: 34, t1: MK("ddark") }) + dnTag(tt, MK("dnight"), 1180, 300, true, "the side that faces away from the Sun: nighttime", { size: 34, t1: MK("dlight") }) });
/* the answer is two: the Earth turns. EP13's three boards: the green tick on board 2, small x chips on boards 1 and 3 and by Momo and Pip
   (ticks); card 2 glows (ansglow); coin (coin1); ROTATION pops on "rotation" (lib.js o.at); Basil's {NAP_BACK} (cheer). WIRED with the real boards */
SC.globeans = (t, s) => { const tA = MK("ansglow") - .1, tT = MK("ticks"), hb = HAS("g709");
  return bg("stage2") + stageNote("the living room behind, the curtains opening again (curtainsopen): morning light floods in", 120)
    + [0, 1, 2].map((i) => dareBoard(i, 560 + i * 400, 470, .62, { id: "ga" }) + (i === 1 ? tickChip(t, tT, 560 + i * 400 + 110, 300) : xChip(t, tT + .15 * i, 560 + i * 400 + 110, 300))).join("")
    + DARE_CARDS.map((c, i) => TF(560 + i * 400, 830, .42 * spring(t, s.t0 + .1 + i * .08, .4), ansCard(i + 1, c, { w: 430, h: 290, size: 50, lit: i === 1 && t >= tA ? spring(t, tA, .45) : 0 }))).join("")
    + coin(t, MK("coin1") - .1, 1680, 300, "+1", "if you showed two fingers")
    + buddy("momo", 250, 1060, 200, t, { aura: true, in: s.t0 + .1, poses: [[s.t0, "sit"], [tT + .2, "surprised"], [tT + 1.4, "sit"]] }) + xChip(t, tT + .4, 330, 860, .8)
    + buddy("pip", 470, 1060, 190, t, { aura: true, in: s.t0 + .15, poses: [[s.t0, "sit"], [tT + .3, "oops"], [tT + 1.5, "sit"]] }) + xChip(t, tT + .5, 540, 870, .8)
    + buddy("basil", 1700, 1060, 280, t, { aura: true, flip: true, in: s.t0 + .1, poses: [[s.t0, "sit"], [tT, "cheer"], [tT + 1.6, "sit"], ...(hb ? [[LT("g709") - .12, "cheer"]] : [])], jump: [[tT + .05, 40]] })
    + (hb ? say("g709", 1440, 640, t, { size: 38, tail: 120, maxW: 520 }) : "") + sunRule(t) + HUD(t); };

/* 8 · "It only looks as if it moves!": Momo big (surprised, then cheer); beside her a small framed picture: the window's view with a faint
   dotted line where the Sun climbed, the small globe with its turning line under it */
SC.momo = (t, s) => { const hm = HAS("g801");
  return phScene(t, s, "8 · Momo: \"So the Sun only looks as if it moves!\"", ["The living room, full morning light. Momo big in her disc: surprised pose on her first word, then cheer (a hop) on Heart's \"Yes, Momo!\". Beside her, in a plain frame standing on the table: the window's view with a faint dotted line where the Sun climbed, and under it the small globe with its curved turning line. Basil nods; Pip claps once. Life: the fan, a bird on the grille."])
    + buddy("momo", 330, 1060, 300, t, { aura: true, in: s.t0 + .1, poses: [[s.t0, "surprised"], [LT("g802"), "cheer"]], jump: [[LT("g802") + .05, 30]] }) + (hm ? say("g801", 560, 560, t, { size: 40, tail: -120, maxW: 560 }) : "") + sunRule(t); };

/* 9 · BE THE LITTLE RED DOT (the first-person journey). The tags are wired (shrink.js feelTag) on their marks */
SC.waitw = (t, s) => phScene(t, s, "9 · Be the little red dot! (the glide in)", ["Pill Be the little red dot! The camera glides to the globe on the table and into the red sticker; a soft cream wipe at the scene end. The shelf slides aside (SHELF_HIDE)."]);
SC.shrink = (t, s) => { const e = MK("jmorning") + 2;
  return phScene(t, s, "9 · BE THE LITTLE RED DOT (first person, present tense)", ["MK jdot: the real Earth now, seen from just above it: its surface curves away under you, sea, land and cloud, and a tiny warm glow marks where you are. MK jday: far to one side the Sun, large and steady; your side is bright. MK jturn / jaway: the whole view swings slowly; the Sun slides to the curved edge of the Earth and is gone behind it; MK jnight: the sky is black; MK jstars: stars; below you the small lights of a city.",
    "MK jback / jlight: the view keeps swinging the same way; a thin bright line grows along the other edge; the Sun is there again, in the same far place as before; MK jmorning: one bird. EXACTLY half of the Earth is lit. Calm pad, a low slow hum that never stops (the turn), a soft shimmer at night. No game sounds. Nothing about why the Earth turns, the Moon or seasons."])
    + smallPrint(t, MK("jdot"), SUN_DRAW_RULE) + feelTag(t, MK("jdot") + .3, MK("jday") - .1, "You: the little red dot · Singapore, on the Earth", 160)
    + feelTag(t, MK("jday") + .3, MK("jaway") - .1, "your side faces the Sun · day time", 160) + feelTag(t, MK("jnight") - .1, MK("jlight") - .1, "your side faces away · nighttime", 160)
    + feelTag(t, MK("jlight"), e, "one full turn · 24 hours", 160); };

/* 10 · pull back out to the living room in full morning light; Mark Sentence 1 (Basil): C0.3, both sentences; under the card, small and silent:
   the globe with its turning line and a clock whose hand goes round twice (24 hours) */
SC.pullout = (t, s) => phScene(t, s, "10 · Pull back out to the living room", ["Whoosh out of the red dot, back to the living room in full morning light (0.6 s)."]);
SC.mark1 = (t, s) => markScene(t, s, { id: "g1002", sayId: "g1001", who: "basil", n: "1 of 2", text: "The repeated change between day and night is caused by the rotation of the Earth. This rotation takes 24 hours.", keys: ["day", "night", "rotation", "earth", "24", "hours"], size: 60, y: 230, footer: FOOT,
  under: stageNote("under the card, small and silent: the globe with its turning line, and a clock whose hand goes round twice, 24 hours under it", 1040) });

/* 11 · what a cycle is: the board CYCLE CHECK slides in (boardIn) and stands centred between the discs; the tiles day time / nighttime hop
   onto its ring, the arrows light round and round, two ticks, A CYCLE; CYCLE pops (lib.js o.at). WIRED with the placeholder board */
SC.cyclecheck = (t, s) => bg("stage2") + stageNote("the living room behind (morning); the board on its low stand on the floor", 120) + boardIn(t, 960, 1060, .78)
  + buddy("pip", 230, 1060, 240, t, { aura: true, in: s.t0 + .1, poses: [[s.t0, "sit"], [MK("tick2"), "pointing"]] }) + buddy("basil", 1690, 1060, 240, t, { aura: true, flip: true, in: s.t0 + .15, poses: [[s.t0, "sit"], [MK("tagcycle"), "cheer"]], jump: [[MK("tagcycle"), 30]] })
  + buddy("momo", 1450, 1060, 200, t, { aura: true, flip: true, in: s.t0 + .2, poses: [[s.t0, "thinking"], [MK("kw_cycle"), "cheer"]] }) + HUD(t);
/* Mark Sentence 2 (Momo): C0.1, both sentences; REPEATED PATTERN pops after the last word (lib.js o.at); under the card: the board with its closed ring */
SC.mark2 = (t, s) => markScene(t, s, { id: "g1103", sayId: "g1102", who: "momo", n: "2 of 2", text: "Cycles are repeated patterns of change. They happen in living and non-living things.", keys: ["repeated", "patterns", "change", "living", "non-living"], size: 64, y: 240, footer: FOOT,
  under: TF(1180, 1060, .32, cycleBoard(t, { show: "daynight", small: true })) });

/* 12 · HOLD ON! Basil: "My pencil ... is a cycle!" WIRED (model: EP13 SC.holdon): Basil big in his disc (cheer, then oops), the board at the
   right (the day-and-night tiles hop off at tilesoff; three pencil tiles hop towards the ring at pen1..pen3 and settle in a ROW at penrow; one
   tick at penchg; NOT A CYCLE at pentag), the HOLD ON! stamp, the YOU ring with crossed arms (5 s), the three pencils in the ring (placeholder),
   the clue labels IT CHANGES ✓ · IT REPEATS ? ON TOP of the ring frame through the countdown, the bell, the coin. */
const RG = [1080, 430], RR = 150;
SC.holdon = (t, s) => { const a = "g1201", b = "g1202", c = "g1203", r0 = MK("ring0_hold"), bell = MK("bell_hold"), rs = ringState(t, r0, 5), tX = W(b, "cross") - .15, tH = W(b, "hold") - .1, tOne = W(c, "one") - .1, ring = t >= tX && t < LE(c) + .4, hb = HAS("g1204");
  const pic = `<circle cx="${RG[0]}" cy="${RG[1]}" r="120" fill="#fff" opacity=".6"/>` + T(RG[0], RG[1] + 10, "3 pencils in a row", 24, P.ink);
  const labels = ["IT CHANGES ✓", "IT REPEATS ?"].map((l, i) => TF(RG[0] + (i ? 130 : -130), RG[1] - RR - 34 - (i ? 0 : 46), spring(t, tX + .2 + i * .15, .4), tpill(0, 0, l, 26, "#fff", P.ink, { w: 700 }))).join("");
  return bg("stage2") + stageNote("the living room behind, dimmed; the board CYCLE CHECK on its stand at the right", 160) + TF(1560, 1066, .5, cycleBoard(t))
    + buddy("basil", 300, 1060, 300, t, { aura: true, in: s.t0 + .1, poses: [[s.t0, "cheer"], [LE(a) + .3, "sit"], [W(c, "not") - .12, "surprised"], [hb ? LT("g1204") - .12 : LE(c) + .1, "oops"], [hb ? LE("g1204") + .3 : LE(c) + 1.4, "sit"]], nohop: true })
    + say(a, 560, 300, t, { size: 40, tail: -200, maxW: 640 }) + (hb ? say("g1204", 560, 300, t, { size: 40, tail: -200, maxW: 640 }) : "")
    + (ring ? OP(1 - ss(LE(c) + .1, LE(c) + .4, t), TF(RG[0], RG[1], spring(t, tX, .4), `<g transform="translate(${-RG[0]} ${-RG[1]})">${ringTimer(RG[0], RG[1], t < r0 ? 1 : t < bell ? rs.frac : 0, t < r0 ? 5 : t < bell ? rs.secs : 0, t, { R: RR, sw: 24, tick: rs.tick, shut: pulse(t, bell, .01, .6), inner: pic + (t < bell + .3 ? OP(.85, TF(RG[0], RG[1] + 40, .38, crossedArms())) : "") })}</g>`)
      + labels + youPill(RG[0] - 250, RG[1] + 120, 1.0) + tpill(RG[0], RG[1] + RR + 60, "cross your arms", 30, P.ink, "#fff")) : "")
    + stamp(t, tH, 900, 420, "HOLD ON!") + bellIcon(t, r0) + coin(t, tOne, 1680, 300, "+1", "arms crossed") + HUD(t); };

/* 13 · Pip finds one: "Then look down there, at the traffic light!"; [LOOK CLOSER] the traffic light at the junction below */
SC.pipdown = (t, s) => phScene(t, s, "13 · Pip: \"Then look down there, at the traffic light!\"", ["The living room by the window. Pip big in his disc: pointing pose, towards the window and down (a hop on \"down\"); Basil and Momo turn to look. Through the window, far below and small: the road junction and its traffic light (it is the set the look-closer glides into). Life: a bus passes below, a bird on the grille."])
  + buddy("pip", 330, 1060, 300, t, { aura: true, in: s.t0 + .1, poses: [[s.t0, "pointing"], [LE("g1301") + .2, "sit"]], jump: [[W("g1301", "down") - .15, 24]] }) + say("g1301", 560, 560, t, { size: 40, tail: -120, maxW: 600 });
SC.lclight = (t, s) => lcPH(t, s, { title: "The traffic light at the junction below", v: "v_light", verdict: [`A CYCLE`, GOODC], fx: 1300, fy: 760,
  beats: [["glide", "the camera glides through the window and down"], ["lampG", "GREEN lights"], ["lampA", "AMBER"], ["lampR", "RED"], ["lampG2", "GREEN again (hold)"], ["lighttiles", "on the small board: three tiles on the ring, two ticks"], ["v_light", "verdict"]],
  notes: ["The camera glides through the window and down (MK glide) and pushes in slowly until the traffic light fills most of the window; the road and the flat dim and blur. A real Singapore traffic light: three round lamps in a column, red on top, amber, green at the bottom, on a black board with a white edge. Each lamp lights ON Heart's word, each held about 2 s: MK lampG green, MK lampA amber, MK lampR red, MK lampG2 green again (no red with amber).",
    "A plain label line by each as it lights: green · amber · red · green again. Hold on the second green. Sound: the soft tock of a signal changing ON each lamp mark, far traffic. Nobody is on the road; we look from upstairs. On the small board at the window's top left (wired), MK lighttiles: the three tiles sit on the ring, both boxes ticked."],
  over: (tt) => TF(300, 330, .2, cycleBoard(tt, { small: true })) });

/* 14 · the score hand, the owl (lizReveal in common.js: the score hand melts into the real room, ONE push-in onto the owl, the ring pops on
   its name), the key words (kwrecap in common.js) */
SC.final = (t, s) => { const L = "g1401"; return finalScene(t, s, L, 0, [[s.t0, null, 1], [W(L, "two") - .1, null, 2]]); };
SC.liz = (t, s) => { const L = "g1402", tq = W(L, "it") - .1;
  return lizReveal(t, s, L, flatPH(t), OWL[0], OWL[1], tq, "It was on the tree outside the window!", -120, 160, 80, 1.9, { from: () => SC.final(SCN.final.t1 - .04, SCN.final), px: 860 }); };

/* 15 · the cliffhanger: do living things have cycles too? Momo big (thinking); a small cream card living and non-living things with "living"
   glowing and a big ? over it (q); three small picture cards slide in low (card1..card3: a hen, a chick, a teddy bear); PART 2 slams in. WIRED */
SC.cliff = (t, s) => { const tP = W("g1503", "part") - .1, tq = MK("q");
  return bg("stage2") + stageNote("the living room behind, bright morning; the three picture cards stand on the floor", 1062)
    + TF(1180, 300, spring(t, s.t0 + .2, .45), `<g filter="url(#dropS)"><rect x="-330" y="-60" width="660" height="120" rx="24" fill="url(#gPaper)"/></g>${t >= tq ? `<rect x="-300" y="-34" width="${n2(150 * eo((t - tq) / .35))}" height="34" rx="6" fill="#FFD75A"/>` : ""}${T(0, 14, "living and non-living things", 40, P.ink)}`) + qMark(t, tq, 980, 200, 44)
    + ["a hen", "a chick", "a teddy bear"].map((c, i) => { const t0 = MK("card" + (i + 1)); if (t < t0) return ""; const [x, d] = slideX(t, t0, .5, 2300, 860 + i * 330, 900); return d + TF(x, 760, 1, `<g filter="url(#drop)"><rect x="-140" y="-120" width="280" height="240" rx="20" fill="#FFF8EA" stroke="#E3C9A8" stroke-width="6"/></g>` + T(0, 12, c, 34, P.ink)); }).join("")
    + buddy("momo", 280, 1060, 280, t, { aura: true, in: s.t0 + .1, poses: [[s.t0, "thinking"], [LE("g1501") + .2, "sit"]] }) + say("g1501", 520, 560, t, { size: 40, tail: -120, maxW: 560 })
    + (t >= tP ? slamFit(330, "PART 2", P.sun, slamK(t - tP, 0)) : "") + HUD(t); };

/* 16 · "Now you know!": the board CYCLE CHECK (the day-and-night ring closed, both boxes ticked, its arrows going round) centred in the free
   space between the buddies */
SC.nyk = (t, s) => nykScene(t, s, TF(860, 1040, .5, cycleBoard(t, { show: "daynight" })), { bx: [200, 1715, 1375], hx: 470 });
})(); }
