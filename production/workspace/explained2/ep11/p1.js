// p1.js: PART 1, "The TORCH Test: Which Glass Lets Only SOME Light Through?": the torch test, transparent, frosted glass, translucent.
// Segments 1-15 of p3_ep11_script.md (version 1, 21 Nov 2026; the teacher's go-ahead in its section 12).
// STAGE 2 (drawn): the sets, the test table and the props are in flat.js, the look-closer pictures in closer.js, the journey in shrink.js.
// (Stage 1's notes:) the shared routines are wired (the calm recap of EP10's dare with EP10's own three boards and cards, the title slam, game,
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
const DARE = [["dClear", "clear glass"], ["dFrost", "frosted glass"], ["dDoor", "a wooden door"]];
// EP10's dare board with its small torch in front of it (EP10 p2.js SC.dare, the same art); origin = the board's centre
const dareBoard = (i, x, y, sc, o = {}) => picBoard(DARE[i][0], x, y, 1, { sc, lab: o.lab === false ? undefined : DARE[i][1], size: 44, id: "p1d" + i + (o.id || "") }) + TF(x + 110 * sc, y + 95 * sc, 1.1 * sc, torch());

/* the living room and its table (flat.js tableView). RK = the sheets waiting in the rack; the robot's places on the table (rig x) */
const RK0 = ["clear", "frost", "door"], BOT_FAR = -960, BOT_HOME = -640, CAM0 = [1, 960, 540], CAMLC = [1.1, 880, 740], CAMH = [1.25, 528, 610], CREAM = "#FFF6D8";
const V = (t, o = {}, cam) => tableView(t, { rack: ["frost", "door"], bot: { x: BOT_HOME }, dim: 1, ...o }, cam);
const buds = (t, o = {}) => sPip(t, o.pip) + sBasil(t, o.basil) + sMomo(t, o.momo);
// a label over the table view with a plain line to its thing (world coordinates through the camera)
const wlab = (t, t0, cam, x, y, txt, wx, wy, o = {}) => { if (t < t0) return ""; const a = o.t1 === undefined ? 1 : 1 - ramp(t, o.t1, .25); return a <= .01 ? "" : OP(a, pline(x, y, fgx(cam, wx), fgy(cam, wy), ramp(t, t0, .2)) + TF(x, y, spring(t, t0, .4), tpill(0, 0, txt, o.size || 40, o.fill || "#fff", o.ink || P.ink, { w: 700 }))); };
// the robot seen straight through a sheet, in a small cream frame (beside the book's strip)
const frontCard = (t, kind, id) => `<clipPath id="${id}"><rect x="-150" y="-160" width="300" height="320" rx="22"/></clipPath><g filter="url(#dropS)"><rect x="-159" y="-169" width="318" height="338" rx="28" fill="#FFF8EA"/></g><g clip-path="url(#${id})">${roomBack(300, 320, .45)}${TF(0, 136, .6, frontView(kind, t, { id: id + "f" }))}</g>`;
// the thumbnail's frame (thumb_still.js ... "&thumb"): the split of the frosted-glass look-closer, bright; Basil surprised at the left
const thumbBack = (night) => `<rect width="1920" height="1080" fill="${hx2(night ? "#CFC8DA" : "#EBCDBB", night ? "#35315F" : "#3F3768", .45)}"/><rect y="792" width="1920" height="288" fill="${hx2(night ? "#F2EFE8" : "#D9A871", night ? "#77719A" : "#6E5478", .45)}"/><path d="M0 792 H1920" stroke="#fff" stroke-width="5" opacity=".4"/>`;
const THUMB1 = (t) => thumbBack() + TF(660, 806, .72, rig(t, { sheet: "clear", on: 1, dim: .45, id: "tha" })) + TF(1530, 806, .72, rig(t, { sheet: "frost", on: 1, dim: .45, id: "thb" })) + buddy("basil", 200, 480, 250, t, { aura: true, tag: false, pose: "surprised", still: true }) + logo(t);

/* 1 · silent cold open: the living room of an HDB flat at dusk; EP10's three dare boards slide in low at the back of the table */
const DBX = [1320, 1505, 1690];   // Stage 3: right of OUR CARD (it hid "clear glass")
SC.cold = (t, s) => { if (location.search.includes("thumb")) return THUMB1(t); const tb = MK("boardsIn"), tp = MK("budsIn");
  const boards = [0, 1, 2].map((i) => { const t0 = tb + i * .16, [x, d] = slideX(t, t0, .7, 2400, DBX[i], TBY - 22); return t < t0 ? "" : d + dareBoard(i, x, TBY - 110, .46, { id: "c" }); }).join("");
  return tableView(t, { rack: RK0, rig: {}, bot: { x: BOT_FAR }, board: false, back: boards }, [1.02 + .02 * eio(t / 7), 960, 548])
    + sPip(t, { in: tp, poses: [[tp, "waving"], [tp + 1.4, "sit"]], wave: true }) + sBasil(t, { in: tp + .2, poses: [[tp + .2, "surprised"]] }) + sMomo(t, { in: tp + .4, poses: [[tp + .4, "waving"], [tp + 1.7, "sit"]], wave: true })
    + lowerPill(60, 96, "An HDB flat,", "Singapore") + torchRule(t, .7); };

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
// back at the table: the board OUR TORCH TEST slides in low and stands at the end of the table
const view0 = (t, s0) => { const [bx, bd] = slideX(t, s0 + .15, .7, 2500, BDX, TBY + 8); return tableView(t, { rack: RK0, rig: {}, bot: { x: BOT_FAR }, boardX: bx, items: bd, board: {} }); };
SC.tests = (t, s) => { const L = "g203"; return view0(t, SCN.tests.t0) + buds(t, { momo: { poses: [[SCN.tests.t0, "sit"], [SCN.tests.t0 + .9, "pointing"]] } }) + (t >= LT(L) - .1 ? TF(960, 250, spring(t, LT(L) - .1, .45), tpill(0, 0, "Hold on to your answer!", 56, P.ink, "#fff", { w: 700 })) : "") + torchRule(t) + HUD(t); };
// the title slam over the dimmed table (WIRED; Stage 2's drawn room shows through): SEE-THROUGH? BLURRY? (white) then OR BLOCKED?! (sun yellow).
// The second slam is the first thing to cut if Part 1 runs long (script section 6: a picture beat only).
const slamFit = (y, txt, col, k) => slamLine(y, txt, Math.min(150, 150 * 1720 / tw(txt, 150, 700, "Fredoka", 4)), col, k);
SC.title = (t, s) => { const u = t - MK("title"), dim = clamp(u / .2); return lcSet(t, s, "tests") + `<rect width="1920" height="1080" fill="${P.night}" opacity="${n2(.78 * dim)}"/>`
  + slamFit(400, "SEE-THROUGH? BLURRY?", "#fff", slamK(u, .05)) + slamFit(600, "OR BLOCKED?!", P.sun, slamK(u, .55)) + HUD(t); };

/* 3 · the game, and the hidden goldfish; 4 · goals (Pip reads) and the countdown (count is in common.js) */
SC.game = (t, s) => gameScene(t, s, "g301", true);
SC.goals = (t, s) => goals3(t, s, [["The torch test", ""], ["Transparent", ""], ["Translucent", ""]], ["g401", "g402", "g403", "g404"], "pip");

/* 5 · the torch test is set up: three things, the safety rule (the small print grows to the middle for Heart's sentence); Basil's robot */
const CAMS = [1.12, 900, 720];
SC.setup = (t, s) => { const a = "g501", b = "g502", g = ss(LT(b) - .3, LT(b) + .2, t) * (1 - ss(LE(b) + .2, LE(b) + .7, t)), cam = camL(CAM0, CAMS, eio((t - s.t0) / 1.0)), tT = W(a, "torch", 1) - .1, tS = W(a, "sheet") - .1, tC = W(a, "card") - .1, hop = (t0) => 22 * pulse(t, t0, .08, .5);
  const tw_ = rw(TORX, AX - 40), hw = rw(0, -24), cw = rw(CARDX, -310);
  return tableView(t, { rack: RK0, bot: { x: BOT_FAR }, board: {}, rig: { lift: { torch: hop(tT), holder: hop(tS), card: hop(tC) }, line: ramp(t, tC + .5, .7) } }, cam)
    + OP(1 - g, wlab(t, tT, cam, 520, 400, "torch", tw_[0], tw_[1], { size: 48 }) + wlab(t, tS, cam, 930, 520, "sheet goes here", hw[0], hw[1], { size: 44 }) + wlab(t, tC, cam, 1330, 400, "card", cw[0], cw[1] + 40, { size: 48 })) + buds(t)
    + (g > .01 ? `<rect width="1920" height="1080" fill="${P.night}" opacity="${n2(.5 * g)}"/>` + TF(lerp(300, 960, g), lerp(196, 430, g), lerp(1, 2, g), finePrint(t, -9, TORCH_RULE, 0, 0)) + OP(g, TF(900, 700, 1, rigCard(t, { on: 1, dim: .7 }, 520, 250, "su")) + TF(1230, 700, 1, tickBadge(44))) : torchRule(t)) + HUD(t); };
SC.robot = (t, s) => { const a = "g503", cam = camL(CAMS, [1.35, 520, 690], eio((t - s.t0) / .7)), [x, d] = slideX(t, s.t0 + .1, 1.0, BOT_FAR, BOT_HOME, 0), bw = rw(x, -175);
  return tableView(t, { rack: RK0, rig: {}, bot: { x, dust: d }, board: {} }, cam) + (t >= s.t0 + 1.2 ? TF(fgx(cam, bw[0]) + 10, fgy(cam, bw[1]) - 44, spring(t, s.t0 + 1.2, .4), tpill(0, 0, "Basil’s robot", 44, "#fff", P.ink, { w: 700 })) : "")
    + buddy("basil", 230, 1060, 270, t, { aura: true, in: s.t0 + .1, poses: [[s.t0, "cheer"], [LE(a) + .3, "sit"]], nohop: true }) + say(a, 620, 330, t, { size: 44, tail: -260, maxW: 620 }) + torchRule(t) + HUD(t); };

/* 6 · sheet one: clear glass (an adult's hands set it in the holder; the room dims); [LOOK CLOSER] the torch on clear glass (closer.js clearArt) */
SC.sheet1 = (t, s) => { const a = "g601", cam = camL(CAM0, CAMLC, eio((t - (W(a, "look") - .3)) / 1.0)), hw = rw(0, -300), tT = W(a, "clear") - .1;
  return V(t, { dim: ss(s.t0 + .3, s.t0 + 2.0, t), rig: swapSheet(t, s.t0, null, "clear", 0, .55), board: {} }, cam) + wlab(t, tT, cam, 600, 420, "clear glass", hw[0] - 30, hw[1] + 60, { size: 46 })
    + OP(ramp(t, s.t0 + .5, .3) * (1 - ramp(t, s.t0 + 3.5, .3)), TF(600, 330, 1, finePrint(t, -9, "An adult holds the glass.", 0, 0))) + buds(t) + torchRule(t) + HUD(t); };
const lcSetV = (o) => (tt) => V(tt, { board: {}, ...o }, CAMLC);
SC.lcclear = (t, s) => lookCloser(t, s, { tz: s.t0, fx: 960, fy: 555, bgc: LCBG, art: clearArt, set: lcSetV({ rig: { sheet: "clear" } }), verdict: VSTYLE("MOST LIGHT PASSES THROUGH", 0), tv: MK("v_clear") });
SC.clearans = (t, s) => { const b = "g605"; return V(t, { rig: { sheet: "clear", robot: 1 }, bot: false, board: false }, camL([1.3, 900, 770], [1.9, 960, 770], eo((t - s.t0) / .6)))
  + buddy("momo", 1700, 1060, 280, t, { aura: true, flip: true, in: s.t0 + .1, poses: [[s.t0, "surprised"]], nohop: true }) + (HAS(b) ? say(b, 1560, 610, t, { size: 46, tail: 120, maxW: 420 }) : "") + torchRule(t) + HUD(t); };

/* 7 · Mark Sentence 1 (Momo): TRANSPARENT pops beside the card after its last word (lib.js o.at); row 1 of the board; the book's strip */
SC.mark1 = (t, s) => markScene(t, s, { id: "g703", sayId: "g702", who: "momo", n: "1 of 2", text: "Some materials allow most light to pass through them. These materials are transparent.", keys: ["most", "light", "pass", "through", "transparent."], size: 62, y: 250, footer: FOOT,
  extra: (HAS("g701") ? OP(ramp(t, LT("g701") - .1, .3) * (1 - ramp(t, LT("g702") - .2, .3)), T(1150, 175, "Here are the book's words.", 44, "#fff", { w: 600 })) : "") + TF(830, 930, spring(t, s.t0 + .4, .5), rigCard(t, { sheet: "clear", on: 1 }, 440, 230, "m1")) });
SC.row1 = (t, s) => V(t, { rig: { sheet: "clear", robot: 1 }, bot: false, board: { glow: t < stampT(0) ? 0 : -1 } }) + TF(620, 440, spring(t, s.t0 + .3, .45), frontCard(t, "clear", "fc1"))
  + bookCaption(t, "g704", "You can clearly see objects placed behind transparent materials.", 120, { size: 42, x: 850, keys: ["clearly", "see", "placed", "behind"] }) + buds(t) + torchRule(t) + HUD(t);

/* 8 · HOLD ON! Basil moves the torch. WIRED (model: EP10 SC.holdon): the HOLD ON! stamp, the YOU ring with crossed arms (5 s), the picture in
   the ring with its two clue labels ON TOP of the ring frame, kept through the countdown and Heart's rule, the bell, the coin. Stage 2 draws the
   table behind (the hands change the sheets at swap1; the torch slides off the TORCH MARK at push) and the picture in the ring. */
const RG = [1240, 400], RR = 150;
// the table behind the ring: the hands change the sheets (swap1), the robot goes back to its place, Basil's torch slides off the TORCH MARK (push)
const holdTable = (t, back) => { const m = MK("swap1"), [rx, rd] = slideX(t, m + .05, .8, 0, BOT_HOME, 0), [dx, pd] = back === undefined ? slideX(t, MK("push"), .9, 0, 230, 0) : slideX(t, back, .55, 230, 0, 0);
  return V(t, { rack: ["clear", "door"], bot: back !== undefined || t >= m + .85 ? { x: BOT_HOME } : false, board: {}, rig: { ...(back === undefined ? swapSheet(t, m, "clear", "frost", .28, .6) : { sheet: "frost" }), robot: back === undefined && t < m + .85 ? { x: rx, dust: rd } : 0, dx, dust: TF(TORX, 0, 1, pd), markGlow: back === undefined ? 0 : pulse(t, back + .55, .1, 1.6) } }, CAMH); };
SC.holdon = (t, s) => { const a = "g801", b = "g802", c = "g803", r0 = MK("ring0_hold"), bell = MK("bell_hold"), rs = ringState(t, r0, 5), tX = W(b, "cross") - .15, tH = W(b, "hold") - .1, tOne = W(c, "one") - .1, ring = t >= tX && t < LE(c) + .4;
  const pic = `<circle cx="${RG[0]}" cy="${RG[1]}" r="127" fill="${LCBG}"/>` + TF(RG[0] + 8, RG[1] + 22, .26, rig(t, { sheet: "frost", dx: 230, dim: .8, id: "hr" }));
  const labels = TF(RG[0] - 150, RG[1] - RR - 34, spring(t, tX + .2, .4), tpill(0, 0, "the sheet: changed", 28, "#fff", P.ink, { w: 700 })) + TF(RG[0] + 160, RG[1] - RR - 34, spring(t, tX + .35, .4), tpill(0, 0, "the torch: moved", 28, "#fff", P.ink, { w: 700 }));
  return holdTable(t) + `<rect width="1920" height="1080" fill="${P.night}" opacity=".3"/>`
    + buddy("basil", 330, 1060, 300, t, { aura: true, in: s.t0 + .1, poses: [[s.t0, "sit"], [LT(a) - .12, "cheer"], [LE(a) + .3, "sit"], [W(c, "torch") - .12, "surprised"], [LE(c) + .1, "sit"]], nohop: true })
    + say(a, 560, 300, t, { size: 42, tail: -200, maxW: 640 })
    + (ring ? OP(1 - ss(LE(c) + .1, LE(c) + .4, t), TF(RG[0], RG[1], spring(t, tX, .4), `<g transform="translate(${-RG[0]} ${-RG[1]})">${ringTimer(RG[0], RG[1], t < r0 ? 1 : t < bell ? rs.frac : 0, t < r0 ? 5 : t < bell ? rs.secs : 0, t, { R: RR, sw: 24, tick: rs.tick, shut: pulse(t, bell, .01, .6), inner: pic + (t < bell + .3 ? TF(RG[0], RG[1] + 76, .26, crossedArms()) : "") })}</g>`)
      + labels + youPill(RG[0] - 250, RG[1] + 120, 1.0) + tpill(RG[0], RG[1] + RR + 60, "cross your arms", 30, P.ink, "#fff")) : "")
    + (t >= W(c, "good") - .1 ? TF(960, 960, spring(t, W(c, "good") - .1, .4), tpill(0, 0, "In a good test, we change one thing only: the sheet.", 38, P.sun, P.ink, { w: 700 })) : "")
    + stamp(t, tH, 900, 420, "HOLD ON!") + bellIcon(t, r0) + coin(t, tOne, 1640, 560, "+1", "arms crossed") + torchRule(t) + HUD(t); };
SC.fixtorch = (t, s) => { const b = "g804", hb = HAS(b), tg = hb ? [W(b, "same") - .1, W(b, "same", 1) - .1, LE(b) - .1] : [s.t0 + .5, s.t0 + 1.3, s.t0 + 2.1];
  return holdTable(t, MK("back")) + ["same torch", "same place", "only the sheet changes"].map((x, i) => t >= tg[i] ? TF(1330, 300 + i * 84, spring(t, tg[i], .4), tpill(0, 0, x, 44, i === 2 ? P.sun : "#fff", P.ink, { w: 700 })) : "").join("")
    + buddy("basil", 330, 1060, 300, t, { aura: true, poses: [[s.t0, "oops"], [(hb ? LE(b) : s.t0 + 2.4) + .2, "sit"]], nohop: true }) + (hb ? say(b, 600, 300, t, { size: 44, tail: -220, maxW: 560 }) : "") + torchRule(t) + HUD(t); };

/* 9 · Round 1: the dare from EP10 (a short 3 s ring). EP10's three boards in the ring (real art); clue labels clear glass · frosted glass · wood
   on top of the ring frame, kept through the countdown (lockN c.labels) */
SC.r1card = (t, s) => roundCard(t, s, "ROUND 1", "YOUR ANSWER FROM LAST TIME");
const r1labels = (t) => { const tq = W(L1, "which") - .1; return t < tq ? "" : ["clear glass", "frosted glass", "wood"].map((l, i) => TF(430 + (i - 1) * 205, 470 - RING_R - 14 - (i === 1 ? 46 : 0), spring(t, tq + i * .12, .4), tpill(0, 0, l, 30, "#fff", P.ink, { w: 700 }))).join(""); };
SC.r1 = (t, s) => lockN(t, { cards: ["Clear glass", "Frosted glass", "A wooden door"], labels: r1labels, q: "Which one lets only some light pass through?", tq: W(L1, "which") - .1, tc: [W(L1, "clear"), W(L1, "frosted"), W(L1, "wooden") - .2], ring0: MK("ring0_r1"), dur: 3, lock: "g902",
  obj: (tt) => [0, 1, 2].map((i) => dareBoard(i, 430 + (i - 1) * 108, 530, .3, { lab: false, id: "r1" })).join(""),
  picks: [{ who: "pip", id: "g903", word: "3", x: true }, { who: "momo", id: "g904", word: "2" }, { who: "basil", id: "g905", word: "2" }],
  react: [[LE("g903") + .1, "pip", "thinking"], [LE("g904") + .1, "momo", "pointing"], [LE("g905") + .1, "basil", "cheer"]] });

/* 10 · [LOOK CLOSER] the torch on frosted glass (closer.js frostArt; FROSTED GLASS pops inside it: lib.js o.at); the answer */
const RK2 = ["clear", "door"];
SC.lcfrost = (t, s) => lookCloser(t, s, { tz: s.t0, fx: 960, fy: 555, bgc: LCBG, art: frostArt, set: lcSetV({ rack: RK2, rig: { sheet: "frost" } }), verdict: VSTYLE("ONLY SOME LIGHT PASSES THROUGH", 1), tv: MK("v_frost") });
SC.frostans = (t, s) => { const a = "g1005", b = "g1006", c = "g1007", tA = W(a, "two") - .1, lit = t >= tA ? spring(t, tA, .45) : 0, tc = W(c, "one") - .1, hb = HAS(b);
  return bg("stage2") + TF(1000, 470, 1.05 * spring(t, s.t0 + .1, .45), ansCard(2, "Frosted glass", { lit, w: 330 })) + TF(1450, 440, spring(t, s.t0 + .25, .45), rigCard(t, { sheet: "frost", on: 1 }, 520, 290, "fa"))
    + (t >= s.t0 + .6 ? TF(1450, 640, spring(t, s.t0 + .6, .4), ansTag("only some light", 1, 38)) : "")
    + buddy("pip", 330, 1060, 300, t, { aura: true, in: s.t0 + .1, poses: hb ? [[s.t0, "sit"], [tA, "surprised"], [LT(b) - .12, "sit"], [LE(b) + .1, "cheer"]] : [[s.t0, "sit"], [tA, "surprised"], [tA + 1.6, "sit"]], jump: [[tA + 1.7, 14]], nohop: true }) + (hb ? say(b, 600, 640, t, { size: 44, tail: -200, maxW: 520 }) : "")
    + buddy("basil", 1720, 1062, 190, t, { aura: true, flip: true, in: s.t0 + .2, poses: [[s.t0, "sit"], [tA, "cheer"], [tA + 1.8, "sit"]] }) + coin(t, tc, 1000, 850, "+1", "if you showed two fingers") + HUD(t); };

/* 11 · Mark Sentence 2 (Basil): TRANSLUCENT pops beside the card; row 2 of the board; the book's strip */
SC.mark2 = (t, s) => markScene(t, s, { id: "g1102", sayId: "g1101", who: "basil", n: "2 of 2", text: "Some materials allow only some light to pass through them. These materials are translucent.", keys: ["only", "some", "light", "pass", "through", "translucent."], size: 60, y: 250, footer: FOOT,
  extra: TF(830, 930, spring(t, s.t0 + .4, .5), rigCard(t, { sheet: "frost", on: 1 }, 440, 230, "m2")) });
SC.row2 = (t, s) => V(t, { rack: RK2, rig: { sheet: "frost", robot: 1 }, bot: false, board: { glow: t < stampT(1) ? 1 : -1 } }) + TF(620, 440, spring(t, s.t0 + .3, .45), frontCard(t, "frost", "fc2"))
  + bookCaption(t, "g1103", "You cannot clearly see the objects placed behind translucent materials.", 120, { size: 37, x: 830, keys: ["cannot", "clearly", "see", "placed", "behind"] }) + buds(t) + torchRule(t) + HUD(t);

/* 12 · BE THE LIGHT: the glide down the table to the back of the torch (the journey itself is SC.shrink in shrink.js); 13 · pull back out */
const TBK = [485, 752];
SC.waitw = (t, s) => { const L = "g1201", dive = ei((t - (s.t1 - 1.5)) / 1.5), e = eio((t - s.t0) / 1.2), m = Math.max(e * .5, dive), cam = [1 + .22 * e + 3.6 * dive, lerp(960, TBK[0], m), lerp(540, TBK[1], m)], tP = W(L, "be") - .2;
  return V(t, { rack: RK2, rig: { sheet: "frost" }, board: {} }, cam)
    + OP(1 - dive * 1.6, buds(t, { momo: { poses: [[s.t0, "sit"], [tP, "cheer"]] } })
      + (t >= tP ? TF(960, 250, spring(t, tP, .45), tpill(0, 0, "Be the light!", 76, P.sun, P.ink, { w: 700 })) : "") + HUD(t)) + wipe(t, s.t1, CREAM, 960, 540); };
SC.pullout = (t, s) => V(t, { rack: RK2, rig: { sheet: "frost" }, board: {} }, camL([4.4, TBK[0], TBK[1]], CAM0, eo((t - s.t0) / .75))) + wipe(t, s.t0, CREAM) + HUD(t);
SC.final = (t, s) => { const L = "g1301"; return finalScene(t, s, L, 1, [[s.t0, null, 1], [W(L, "two") - .1, null, 2]]); };
SC.liz = (t, s) => { const L = "g1302", tq = W(L, "it") - .1; return lizReveal(t, s, L, V(t, { dim: 0, rack: RK2, rig: { sheet: "frost" }, board: false, wave: ss(tq - .2, tq + .3, t) }), GF[0], GF[1], tq, "It was in the glass tank, on the shelf!", 0, 110, 86, 2.0); };

/* 14 · the cliffhanger: an adult's hands set the piece of a white wooden door in the holder; the robot is slid low behind it, out of sight */
const CAMK = [1.08, 900, 600];
SC.cliff = (t, s) => { const a = "g1401", b = "g1402", c = "g1403", dI = MK("doorIn"), [rx, rd] = slideX(t, dI + .9, .8, BOT_HOME, 0, 0), tQ = W(b, "how") - .1, tP = W(c, "find") - .1, dw = rw(0, -170), tW = W(b, "wooden") - .1, tH = W(b, "white") - .1;
  return V(t, { dim: 0, rack: ["clear", "frost"], bot: false, board: { glow: 2 }, rig: { ...swapSheet(t, dI, null, "door", 0, .5), robot: { x: rx, dust: rd } } }, CAMK)
    + wlab(t, tW, CAMK, 800, 470, "wood", dw[0] - 30, dw[1] - 40, { size: 44 }) + wlab(t, tH, CAMK, 1190, 470, "painted white", dw[0] + 30, dw[1] - 40, { size: 44 })
    + (t >= tQ ? TF(fgx(CAMK, dw[0]), fgy(CAMK, dw[1]), spring(t, tQ, .5) * (1 + .05 * Math.sin(t * 4)), `<g filter="url(#dropS)"><circle r="46" fill="url(#gSun)"/></g>${T(0, 24, "?", 72, P.ink)}`) : "")
    + buddy("basil", 200, 1060, 200, t, { aura: true, in: s.t0 + .1, poses: [[s.t0, "sit"], [LT(a) - .12, "cheer"], [LE(a) + .4, "sit"], [tQ, "arms_crossed"]], nohop: true }) + say(a, 500, 500, t, { size: 44, tail: -220, maxW: 520 })
    + (t >= tP ? TF(960, 330, lerp(2.2, 1, eo((t - tP) / .16)) + .05 * wob(t, tP + .16, .4), `<text x="0" y="50" font-family="Fredoka" font-weight="700" font-size="170" text-anchor="middle" letter-spacing="6" fill="${P.sun}" stroke="${P.ink}" stroke-width="28" stroke-linejoin="round" paint-order="stroke" filter="url(#drop)">PART 2</text>`) : "") + torchRule(t) + HUD(t); };

/* 15 · "Now you know!": the board OUR TORCH TEST (two rows filled) centred in the free space between the buddies */
SC.nyk = (t, s) => nykScene(t, s, TF(920, 1046, .62, torchBoard(t)), { bx: [200, 1715, 1375], hx: 470 });
})(); }
