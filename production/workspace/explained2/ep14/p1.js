// p1.js: PART 1, "Why Does the Sun Come BACK Every Morning?": EP13's dare answered (the Earth turns), day and night, what a cycle is, cycle
// or not. Segments 1-16 of p3_ep14_script.md (version 1, 22 Nov 2026; the teacher's go-ahead and the 22 Nov full-sentence change in section 12).
// STAGE 2 (drawn 2026-11-22, the first episode under the teacher's 22 Nov quality standard): every scene is in the HDB living room by its east
// window (flat14.js VF) in the light of its moment (pre-dawn, dawn, the curtained dim room, full morning), with small life always moving (the
// fan, curtains, birds, clouds, the bus, the owl breathing); the buddies have a fresh pose or reaction on every line (pose swaps pop: lib.js
// buddy()), lean towards the action and react to what we see; the camera pushes or drifts in every scene and never cuts inside the room.
// The words, marks and timing are Stage 1's: every action is drawn AT its mark.
if (PART === 1) { (() => {
const L1 = "g501";
// the scores (script section 3): Round 1 1 : 0, HOLD ON! 2 : 0 (the buddies score nothing in this part)
SCORE.push([MK("coin1") - .1, 1, 0]);
SCORE.push([W("g1203", "one") - .1, 2, 0]);
const FOOT = "P3 · Cycles · Day and night";
// EP13's dare board (ep13dare.js, EP13's own art); origin = the board's centre
const dareBoard = (i, x, y, sc, o = {}) => picBoard(DARE_PICS[i], x, y, 1, { sc, lab: o.lab === false ? undefined : DARE_CARDS[i].toLowerCase(), size: 30, id: "p1d" + i + (o.id || "") });
const sunRule = (t, t0 = -9) => smallPrint(t, t0, SUN_RULE);   // "Never look at the Sun." whenever the Sun is drawn (script section 1, Safety)
const qMark = (t, t0, x, y, r = 50) => t < t0 ? "" : TF(x, y, spring(t, t0, .5) * (1 + .05 * Math.sin(t * 4)), `<g filter="url(#dropS)"><circle r="${r}" fill="url(#gSun)"/></g>${T(0, r * .52, "?", r * 1.56, P.ink)}`);
const xChip = (t, t0, x, y, s = 1) => t < t0 ? "" : TF(x, y, spring(t, t0, .4) * s, `<g filter="url(#dropS)"><circle r="30" fill="#fff" stroke="${P.ink}" stroke-width="4"/></g><path d="M-12 -12 L12 12 M12 -12 L-12 12" stroke="${P.ink}" stroke-width="7" stroke-linecap="round"/>`);
const tickChip = (t, t0, x, y, s = 1) => t < t0 ? "" : TF(x, y, spring(t, t0, .4) * s, tickBadge(30));
const slamFit = (y, txt, col, k) => slamLine(y, txt, Math.min(170, 170 * 1720 / tw(txt, 170, 700, "Fredoka", 4)), col, k);
// the picture of the scene before melts away over the new one (no hard cut from a card screen into the room)
const melt = (t, s, name, d = .4) => { const a = 1 - clamp((t - s.t0) / d); if (a <= .01) return ""; window._noHud = true; let v = ""; try { v = SC[name](SCN[name].t1 - .04, SCN[name]); } finally { window._noHud = false; } return OP(a, v); };

/* ---------- the living room (flat14.js VF) in the light of each moment; the buddies in their discs (sprites only) ---------- */
const CBX = [150, 350, 550], CBY = 916;
const DOT_LON = SGLL[0] + 28;                                       // how the globe stands on the table: South-East Asia towards us
// the owl hides somewhere new in each scene (teacher, 22 Nov): the branch tip, the trunk's fork, in the leaves' shade (sky-view coordinates)
const OWLAT = { globeans: [1440, 398], momo: [1440, 398], waitw: [1205, 536], pullout: [1205, 536], cyclecheck: [1205, 536], pipdown: [1440, 398], cliff: [1530, 606] };
const V = (t, o = {}, cam) => { const sn = (window._S || {}).name, ow = o.owl === undefined && OWLAT[sn] ? { owl: { at: OWLAT[sn] } } : {}; return VF(t, { globe: { lon: DOT_LON }, ...o, ...ow }, cam); };
const DAY = (o = {}) => ({ h: 9.5, clk: 9.5, sun: .85, globe: { lon: DOT_LON, dot: true }, ...o });   // full morning, after the look-closer
const camPt = (c, p) => [c[0] * p[0] - (c[0] - 1) * c[1], c[0] * p[1] - (c[0] - 1) * c[2]];
const dotW = () => { const [x, y] = globeDot(GLR, DOT_LON); return [GLB[0] + x, GLB[1] + y]; };
const bd = (who, x, h, t, o = {}) => buddy(who, x, o.y || 1062, h * (o.big || 1.6), t, o);   // EP14 trial: no disc, 1.6x EP12-13 size, standing in the room with a contact shadow
const boards3 = (t, id, t0) => [0, 1, 2].map((i) => { if (t0 === undefined) return dareBoard(i, CBX[i], CBY, .5, { lab: false, id }); const tt = t0 + i * .3; if (t < tt) return ""; const [x, d] = slideX(t, tt, .7, -400, CBX[i], 1004); return d + dareBoard(i, x, CBY, .5, { lab: false, id }); }).join("");
// a slow yawn for Basil (his sit picture, eyes shut, mouth opening wide), k = 0..1
const yawnK = (t, t0, d = 1.6) => Math.sin(Math.PI * clamp((t - t0) / d));

/* 1 · silent cold open: an HDB flat before sunrise. ONE slow push towards the east window; the boards slide in low at the foot of the frame
   (boardsIn), the buddies pop in sleepy (budsIn), the first edge of the Sun shows between two far blocks (sunedge) */
const camCold = (t) => [1.0 + .07 * eio(t / 6.4), 1250, 420];
SC.cold = (t, s) => { const tb = MK("boardsIn"), tp = MK("budsIn"), h = lerp(6.4, 6.95, eio(t / 6)), yk = yawnK(t, tp + .5, 1.5);
  return V(t, { h, clk: 6.917, dark: lerp(.8, .58, eio(t / 6)), fan: .9, items: boards3(t, "c", tb), owl: { at: [1205, 536] } }, camCold(t))
    + bd("pip", 240, 205, t, { y: 748, in: tp, poses: [[tp, "sit"], [tp + 1.2, "waving"]], eyes: t < tp + .9 ? "shut" : undefined, jump: [[tp + 1.15, 18]], wave: true })
    + bd("basil", 1000, 220, t, { big: 1.8, y: 1076, in: tp + .2, mouth: yk > .75 ? 2 : yk > .3 ? 1 : 0, eyes: yk > .2 ? "shut" : undefined, k: 1 + .05 * yk, look: -4 * yk })
    + bd("momo", 1720, 205, t, { y: 1030, in: tp + .4, poses: [[tp + .4, "thinking"], [tp + 1.5, "surprised"]], flip: true, look: -3 })
    + OP(ramp(t, .5, .5), lowerPill(60, 96, "An HDB flat, Singapore ·", "early morning")) + sunRule(t, MK("sunedge")); };

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
/* back in the living room at dawn: the camera drifts on towards the window (it carries on into the title and the game: no cut). Basil is
   still dozing and jerks awake on "answer"; Pip keeps his answer to himself (thinking); Momo, a paw at her mouth, looks at the window */
const camBack = (t) => { const u = clamp((t - SCN.back.t0) / (SCN.title.t1 - SCN.back.t0)); return [1.07 + .04 * eio(u), 1250 + 50 * eio(u), 420]; };
const roomBack = (t, o = {}) => V(t, { h: 7.12 + .02 * (t - SCN.back.t0), clk: 7.05, dark: .4, sun: .14, fan: 1.4, items: boards3(t, "bk"), ...o }, camBack(t));
const budsBack = (t) => { const s = SCN.back, ta = W("g204", "answer") - .1, doze = t < ta;
  return bd("pip", 1240, 205, t, { y: 1040, in: s.t0, poses: [[s.t0, "thinking"]] })
    + bd("basil", 420, 220, t, { big: 1.9, y: 1076, in: s.t0, poses: [[s.t0, "sit"], [ta, "surprised"], [ta + 1.2, "sit"]], eyes: doze ? "shut" : undefined, look: doze ? 5 + 4 * Math.sin((t - s.t0) * 3.2) : 0, jump: [[ta + .02, 34]] })
    + bd("momo", 1720, 205, t, { y: 1030, in: s.t0, poses: [[s.t0, "thinking"], [ta + .3, "surprised"], [ta + 1.4, "sit"]], flip: true, look: -3 }); };
SC.back = (t, s) => (t < s.t0 + .5 ? `<rect width="1920" height="1080" fill="${P.night}"/>` : "") + roomBack(t) + budsBack(t)
  + (t >= LT("g204") - .1 ? TF(620, 330, spring(t, LT("g204") - .1, .4), tpill(0, 0, "Hold on to your answer!", 52, P.sun, P.ink, { w: 700 })) : "") + sunRule(t) + melt(t, s, "lasttime", .5) + HUD(t);
// the title slam over the dimmed room (the same shot goes on): WHY DOES THE SUN (white) then COME BACK? (sun yellow).
// The second slam is the first thing to cut if Part 1 runs long (script section 6, CUTS "title2": a picture beat only).
const TITLE = (k1, k2) => slamFit(400, "WHY DOES THE SUN", "#fff", k1) + slamFit(610, "COME BACK?", P.sun, k2);
SC.title = (t, s) => { const u = t - MK("title"), dim = clamp(u / .2); return roomBack(t) + budsBack(t) + `<rect width="1920" height="1080" fill="${P.night}" opacity="${n2(.78 * dim)}"/>` + TITLE(slamK(u, .05), slamK(u, .55)) + HUD(t); };

/* 3 · the game, and the hidden owl: ONE smooth push-in from the (dimmed) living room straight onto the owl asleep on its branch, the title
   words and the buddies of the shot before slipping away; then the game's things pop out over it (common.js gameScene; teacher, 22 Nov).
   The owl opens its eyes for a moment on its name (so it reads as an owl), looks at us, and goes back to sleep; a small bird lands above it. */
const owlOpen = (t, t0) => ss(t0 - .15, t0 + .2, t) * (1 - ss(t0 + 1.25, t0 + 1.7, t));
SC.game = (t, s) => { const tO = W("g301a", "owl"), cE = camBack(SCN.title.t1), A = camPt(cE, OWL);
  return gameScene(t, s, ["g301a", "g301m", "g301c", "g301p", "g301t", "g301b"], true, { world: (tt) => V(tt, { h: 7.2 + .02 * (tt - s.t0), clk: 7.1, dark: .4, sun: .16, fan: 1.4, items: boards3(tt, "gm"), owl: { open: owlOpen(tt, tO), look: 3 * Math.sin(tt * 2) }, bird: (tt - s.t0 - 2.2) / 1.5 }, cE),
    A, T: [700, 440], Z: 3.1, dim0: .78, ly: -168, r0: 210, qx: 1420, qy: 640, pre: (tt) => budsBack(tt) + TITLE(1, 1) }); };
SC.goals = (t, s) => goals3(t, s, [["Day and night", ""], ["What a cycle is", ""], ["Cycle or not?", ""]], ["g401", "g402", "g403", "g404"], "pip");

/* 5 · Round 1: the dare from EP13 (a short 3 s ring). In the ring: our window's far blocks at dawn, the Sun's first edge between two of them;
   clue labels on top of the ring frame, kept through the countdown (lockN c.labels); EP13's boards small on the three cards (real art).
   No x chip yet: the two look-closers decide (the chips land in globeans) */
SC.r1card = (t, s) => roundCard(t, s, "ROUND 1", "YOUR ANSWER FROM LAST TIME");
const r1labels = (t) => { const tq = W(L1, "why") - .1; return t < tq ? "" : DARE_CLUES.map((l, i) => TF(430 + (i ? 150 : -150), 470 - RING_R - 14 - (i ? 0 : 50), spring(t, tq + i * .15, .4), tpill(0, 0, l, 28, "#fff", P.ink, { w: 700 }))).join(""); };
const ringDawn = (tt) => `<clipPath id="r1c"><circle cx="430" cy="470" r="170"/></clipPath><g clip-path="url(#r1c)"><g transform="translate(${n2(430 - 436 * .62)} ${n2(470 - 640 * .62)}) scale(.62)">${skyView(6.97, tt, { id: "r1s" })}</g></g>`;
SC.r1 = (t, s) => lockN(t, { cards: DARE_CARDS, clues: DARE_CLUES.map((c, i) => [c, W(L1, "why") + .15 * i]), lead: "momo", csize: 34, q: DARE_LABEL, tq: W(L1, "why") - .1, tc: [W(L1, "why"), W(L1, "come"), W(L1, "show")], ring0: MK("ring0_r1"), dur: 3, lock: "g502",
  pics: [0, 1, 2].map((i) => dareBoard(i, 0, 0, .62, { lab: false, id: "r1i" })),
  obj: ringDawn, over: (tt) => finePrint(tt, -9, SUN_RULE, 1640, 1040),   // the small print clear of the clue labels
  picks: [{ who: "momo", id: "g503", word: "1" }, { who: "pip", id: "g504", word: "3" }, { who: "basil", id: "g505", word: "2" }],
  react: [[LE("g503") + .1, "momo", "pointing"], [LE("g504") + .1, "pip", "thinking"], [LE("g505") + .1, "basil", "cheer"]] });

/* 6 · [LOOK CLOSER] the sky from our window, two days, speeded up (flat14.js skyArt: the view is a function of the clock). The camera pushes
   in from the room onto the window; the day passes in ONE shot. Over the picture: the clock pill on its marks, speeded up, the small print,
   the cream day time / nighttime tags on the sky, the row of four tiny skies (row1..row4), Pip small at the edge (he gasps at the clear night) */
const ROWX = [600, 840, 1080, 1320];
const roomMorn = (t, o = {}) => V(t, { h: 7.6, clk: 7.5, dark: .22, sun: .4, items: boards3(t, "ls"), ...o });
SC.lcsky = (t, s) => lookCloser(t, s, { tz: s.t0, fx: 1160, fy: 370, art: skyArt, bgc: "#0E1438", set: (tt) => roomMorn(tt) + melt(tt, s, "r1", .45), verdict: VSTYLE("DAY AND NIGHT: A REPEATED PATTERN", "sun"), tv: MK("v_sky"),
  over: (tt) => sunRule(tt, s.t0 + 1.2) + stepPill(tt, CLOCK, 1500, 250, 36) + speeded(tt, MK("clk0"), MK("v_sky"), 1660, 905)
    + dnTag(tt, MK("tagday"), 930, 250, false, "day time", { t1: MK("dusk") }) + dnTag(tt, MK("tagnight"), 930, 250, true, "nighttime", { t1: MK("tue7") - .6 })
    + ROWX.map((x, i) => { const t0 = MK("row" + (i + 1)); return tt < t0 ? "" : TF(x, 790, spring(tt, t0, .4), `<g filter="url(#dropS)">${tinySky(i % 2, 190, 108, "rw" + i)}</g>` + tpill(0, 78, i % 2 ? "night" : "day", 30, "#FFF8EA", P.ink, { w: 700 })); }).join("")
 });

/* 7 · the curtains are drawn (an adult's hand pulls the cord: the rings slide), the room goes dim; the camera pushes on to the low table;
   a hand presses a small round red sticker onto the globe, on Singapore (sticker). The buddies lean in: Momo points, Pip thinks, Basil is
   proud of "his" globe; all three hop as the sticker lands */
const CAMT = [1.5, 930, 690];
SC.curtains = (t, s) => { const u = t - s.t0, c = eio(u / 1.0), tS = MK("sticker"), cam = camL14(CAM0F, CAMT, eio((u - .45) / 1.5)), cord = Math.sin(Math.PI * clamp(u / 1.1)), dw = dotW();
  const hin = eo((t - (tS - .5)) / .45), hout = ei((t - (tS + .35)) / .5), hx = dw[0] + 150 * (1 - hin) + 220 * hout, hy = dw[1] - 240 * (1 - hin) - 330 * hout;
  return V(t, { h: 8.6, clk: 8.6, dark: .12 + .5 * c, sun: .7 * (1 - c), curt: c, cord, swayK: 1.6 * (1 - clamp((u - 1) / 1.5)), items: boards3(t, "cu"), globe: { lon: DOT_LON, dot: t >= tS - .02, dotK: spring(t, tS - .02, .35) },
      over: (u < 1.5 ? arm14(1752, 444 + 90 * cord, 180, 400, .8) : "") + (t > tS - .55 && hout < 1 ? arm14(hx + 2, hy - 2, 118, 600, .5) : "") }, cam)
    + bd("momo", 250, 225, t, { big: 2.2, y: 1076, in: s.t0 + .1, poses: [[s.t0, "surprised"], [s.t0 + 1.1, "pointing"]], jump: [[tS + .02, 22]], look: 4 })
    + bd("pip", 1420, 200, t, { y: 1060, in: s.t0 + .15, poses: [[s.t0, "sit"], [s.t0 + 1.3, "thinking"]], jump: [[tS + .1, 16]], look: 4 })
    + bd("basil", 1750, 235, t, { y: 1076, in: s.t0 + .1, flip: true, poses: [[s.t0, "sit"], [tS - .2, "cheer"]], jump: [[tS + .05, 26]], look: -4 }) + melt(t, s, "lcsky", .35) + HUD(t); };
SC.lcglobe = (t, s) => lookCloser(t, s, { tz: s.t0, fx: camPt(CAMT, GLB)[0], fy: camPt(CAMT, GLB)[1], art: globeArt, bgc: "#161C48", verdict: [`THE EARTH TURNS`, GOODC], tv: MK("v_globe"),
  over: (tt) => smallPrint(tt, s.t0 + 1.0, TORCH_RULE) + dnTag(tt, MK("dday"), 1010, 236, false, "the side that faces the Sun: day time", { size: 34, t1: MK("ddark") }) + dnTag(tt, MK("dnight"), 1010, 236, true, "the side that faces away from the Sun: nighttime", { size: 34, t1: MK("dlight") }) });
/* the answer is two: the Earth turns. The curtains open again (curtainsopen): morning light floods in, the camera eases back. EP13's three
   boards stand in front of the sofa: the green tick on board 2, small x chips on boards 1 and 3 and by Momo and Pip (ticks); card 2 glows
   (ansglow); coin (coin1); ROTATION pops on "rotation" (lib.js o.at); Basil's {NAP_BACK} (cheer, a proud hop: he was right) */
const ABX = [300, 570, 840];
SC.globeans = (t, s) => { const tA = MK("ansglow") - .1, tT = MK("ticks"), hb = HAS("g709r"), u = t - s.t0, c = 1 - eio(u / 1.1), cam = camL14(CAMT, CAM0F, eio(u / 1.4));
  return V(t, { ...DAY({ h: 8.9, clk: 8.9 }), dark: .6 * c, sun: .9 * (1 - c), curt: c, swayK: 2 * (1 - clamp((u - 1) / 2)), bird: (u - 5) / 1.6 }, cam)
    + [0, 1, 2].map((i) => `<ellipse cx="${ABX[i]}" cy="902" rx="100" ry="10" fill="${P.ink}" opacity=".2"/>` + dareBoard(i, ABX[i], 790, .68 * (.74 + .26 * spring(t, s.t0 + .1 + i * .1, .5)), { id: "ga" }) + (i === 1 ? tickChip(t, tT, ABX[i] + 96, 690) : xChip(t, tT + .15 * i, ABX[i] + 96, 690))).join("")
    + DARE_CARDS.map((c2, i) => TF(ABX[i], 985, .38 * spring(t, s.t0 + .3 + i * .08, .4), ansCard(i + 1, c2, { w: 430, h: 290, size: 50, lit: i === 1 && t >= tA ? spring(t, tA, .45) : 0 }))).join("")
    + coin(t, MK("coin1") - .1, 600, 330, "+1", "if you showed two fingers")
    + bd("momo", 1060, 190, t, { y: 1066, in: s.t0 + .1, poses: [[s.t0, "sit"], [tT + .2, "surprised"], [tT + 1.4, "oops"], [tT + 2.6, "sit"], [MK("kw_rotation"), "cheer"]], look: -3 }) + xChip(t, tT + .4, 1180, 760, .8)
    + bd("pip", 1360, 185, t, { y: 1066, in: s.t0 + .15, poses: [[s.t0, "sit"], [tT + .3, "oops"], [tT + 1.7, "sit"], [MK("kw_rotation") + .15, "pointing"]], jump: [[tT + 1.8, 12]] }) + xChip(t, tT + .5, 1480, 770, .8)
    + bd("basil", 1720, 250, t, { big: 2.05, y: 1076, in: s.t0 + .1, flip: true, poses: [[s.t0, "sit"], [tT, "cheer"], [tT + 1.8, "arms_crossed"], [MK("kw_rotation") - .1, "sit"], ...(hb ? [[LT("g709r") - .12, "cheer"]] : [])], jump: [[tT + .05, 44], ...(hb ? [[W("g709r", "spins") - .1, 26]] : [])] })
    + (hb ? say("g709r", 1320, 330, t, { size: 38, tail: 300, maxW: 560 }) : "") + sunRule(t) + HUD(t); };

/* 8 · "It only looks as if it moves!": Momo big (she gasps, then cheers with a hop on "Yes, Momo!"); a plain frame stands on the floor
   beside the table: our window's view with a faint dotted line where the Sun climbed, and under it the small globe with its turning line.
   Basil nods along and hops; Pip claps (cheer). A slow push on Momo and the picture */
const framePic = (t, k = 1) => { const pts = [...Array(9)].map((_, i) => sunXY(6.95 + i * .32)); return `<path d="M-150 196 L-190 262 M150 196 L190 262" stroke="#8A5A36" stroke-width="14" stroke-linecap="round"/><g filter="url(#drop)"><rect x="-212" y="-232" width="424" height="436" rx="18" fill="url(#f14Wood)"/></g><rect x="-194" y="-214" width="388" height="400" rx="8" fill="#FFF8EA"/>
  <clipPath id="fpc"><rect x="-186" y="-206" width="372" height="224" rx="6"/></clipPath><g clip-path="url(#fpc)"><g transform="translate(-186 -206) scale(.224)">${skyView(9.2, 0, { id: "fps", noBirds: true, sun: false })}${pts.map(([x, y], i) => `<circle cx="${n2(x)}" cy="${n2(y)}" r="${i === 8 ? 46 : 20}" fill="#FFD75A" opacity="${n2(i === 8 ? 1 : .5)}"/>`).join("")}</g></g>
  <path d="M-92 -44 Q-40 -150 30 -200" fill="none" stroke="#fff" stroke-width="5" stroke-dasharray="3 12" stroke-linecap="round"/>` + T(0, 52, "It LOOKS as if the Sun moves…", 24, P.ink, { w: 600 })
  + TF(-90, 116, 1, globe14(44, DOT_LON - t * 14, { stand: false, dot: true, id: "fpg", dotR: 6 }) + `<g transform="rotate(16)"><path d="M-58 6 A58 16 0 0 0 58 6" fill="none" stroke="${P.ink}" stroke-width="5" stroke-linecap="round" stroke-dasharray="10 8" stroke-dashoffset="${n2(-t * 20)}"/></g>`) + T(70, 112, "…but WE", 26, P.ink, { w: 700 }) + T(70, 142, "are turning!", 26, P.ink, { w: 700 }); };
SC.momo = (t, s) => { const hm = HAS("g801"), ty = LT("g802"), cam = [1 + .05 * eio((t - s.t0) / 6), 900, 620];
  return V(t, DAY({ bird: (t - s.t0 - 2.4) / 1.6 }), cam)
    + TF(1430, 800, spring(t, s.t0 + .15, .5), framePic(t))
    + bd("pip", 880, 178, t, { in: s.t0 + .2, poses: [[s.t0, "sit"], [ty + .25, "cheer"]], look: 4 })
    + bd("basil", 1790, 195, t, { in: s.t0 + .25, flip: true, poses: [[s.t0, "sit"], [ty + .5, "cheer"]], jump: [[ty + .5, 20]], look: -3 })
    + bd("momo", 300, 310, t, { in: s.t0 + .1, poses: [[s.t0, "surprised"], [(hm ? LE("g801") : s.t0) + .15, "pointing"], [ty, "cheer"]], jump: [[s.t0 + .2, 20], [ty + .05, 34]] }) + (hm ? say("g801", 640, 470, t, { size: 42, tail: -190, maxW: 560 }) : "") + sunRule(t) + HUD(t); };

/* 9 · BE THE LITTLE RED DOT: the pill, the buddies wave us off, and ONE glide to the globe on the table and into the red sticker (a soft
   cream wipe); then the first-person journey (flat14.js dotJourney; the tags are wired on their marks); then one pull back out */
const camDive = (dive, e) => { const d = dotW(), m = Math.max(e * .5, dive); return [1 + .25 * e + 5.2 * dive, lerp(960, d[0], m), lerp(540, d[1], m)]; };
SC.waitw = (t, s) => { const L = "g901", dive = ei((t - (s.t1 - 1.5)) / 1.5), e = eio((t - s.t0) / 1.2), tP = W(L, "be") - .15;
  return V(t, DAY(), camDive(dive, e)) + OP(1 - dive * 1.7, bd("pip", 250, 220, t, { in: s.t0 + .1, poses: [[s.t0, "sit"], [tP + .2, "waving"]], wave: true }) + bd("momo", 650, 205, t, { in: s.t0 + .15, poses: [[s.t0, "cheer"], [tP + .5, "waving"]], wave: true })
      + bd("basil", 1720, 235, t, { in: s.t0 + .1, flip: true, poses: [[s.t0, "sit"], [tP + .35, "cheer"]], wave: true })
      + (t >= tP ? TF(960, 250, spring(t, tP, .45), tpill(0, 0, "Be the little red dot!", 76, P.sun, P.ink, { w: 700 })) : "") + HUD(t)) + wipe(t, s.t1, CREAM14, 960, 540); };
SC.shrink = (t, s) => { const e = MK("jmorning") + 2;
  const rp = (w) => [[MK("jday") + .2, "cheer"], [MK("jaway") + .3, w === "pip" ? "thinking" : "surprised"], [MK("jnight") + .2, "surprised"], [MK("jnight") + 1.6, "sit"], [MK("jlight") + .1, "cheer"]];
  return dotJourney(t, s) + riders(t, s, { tin: MK("jdot") - .2, h: 170, at: { pip: [200, 1044], basil: [1720, 1050], momo: [380, 1040] }, poses: { pip: rp("pip"), basil: rp("basil"), momo: rp("momo") } }) + smallPrint(t, MK("jdot"), SUN_DRAW_RULE) + feelTag(t, MK("jdot") + .3, MK("jday") - .1, "You: the little red dot · Singapore, on the Earth", 160)
    + feelTag(t, MK("jday") + .3, MK("jaway") - .1, "your side faces the Sun · day time", 160) + feelTag(t, MK("jnight") - .1, MK("jlight") - .1, "your side faces away · nighttime", 160)
    + feelTag(t, MK("jlight"), e, "one full turn · 24 hours", 160); };

/* 10 · pull back out to the living room in full morning light (the buddies pop back with a hop); Mark Sentence 1 (Basil): C0.3, both
   sentences; under the card, small and silent: the globe with its turning line and a clock whose hand goes round twice (24 hours) */
SC.pullout = (t, s) => V(t, DAY(), camDive(1 - eo((t - s.t0) / .6), 1 - eo((t - s.t0) / .6))) + bd("pip", 210, 220, t, { in: s.t0 + .2, poses: [[s.t0 + .2, "cheer"]] }) + bd("basil", 1720, 235, t, { in: s.t0 + .25, flip: true, poses: [[s.t0 + .25, "cheer"]] }) + wipe(t, s.t0, CREAM14) + HUD(t);
const under24 = (t, s) => { const L = TL.lines.g1002, u = clamp((t - L.t) / (L.end - L.t)), a = u * 4 * Math.PI, k = spring(t, s.t0 + .5, .5);
  return TF(1010, 930, k, `<g filter="url(#dropS)"><circle r="92" fill="#221A57"/></g>` + globe14(62, DOT_LON - (t - s.t0) * 22, { stand: false, dot: true, id: "u24", dotR: 7 }) + `<g transform="rotate(16)"><path d="M-80 8 A80 22 0 0 0 80 8" fill="none" stroke="#FFF3B8" stroke-width="6" stroke-linecap="round" stroke-dasharray="12 9" stroke-dashoffset="${n2(-(t - s.t0) * 30)}"/></g>`)
    + TF(1250, 930, k, `<g filter="url(#dropS)"><circle r="84" fill="#5B7BD6"/><circle r="70" fill="#FFF8EA"/></g>${[...Array(12)].map((_, i) => { const b = i * Math.PI / 6; return `<path d="M${n2(56 * Math.sin(b))} ${n2(-56 * Math.cos(b))} L${n2(64 * Math.sin(b))} ${n2(-64 * Math.cos(b))}" stroke="${P.ink}" stroke-width="${i % 3 ? 3 : 6}" stroke-linecap="round"/>`; }).join("")}<path d="M0 0 L${n2(44 * Math.sin(a))} ${n2(-44 * Math.cos(a))}" stroke="${P.coral}" stroke-width="9" stroke-linecap="round"/><circle r="8" fill="${P.ink}"/>`)
    + TF(1500, 930, k, tpill(0, 0, u < .5 ? "12 hours…" : "24 hours", 44, "#FFF8EA", P.ink, { w: 700 })); };
SC.mark1 = (t, s) => markScene(t, s, { id: "g1002", sayId: "g1001", who: "basil", n: "1 of 2", text: "The repeated change between day and night is caused by the rotation of the Earth. This rotation takes 24 hours.", keys: ["day", "night", "rotation", "earth", "24", "hours"], size: 60, y: 230, footer: FOOT,
  under: under24(t, s) });

/* 11 · what a cycle is: the board CYCLE CHECK slides in low (boardIn) and stands on the floor between the discs; the tiles day time /
   nighttime hop onto its ring, the arrows light round and round, two ticks, A CYCLE; CYCLE pops (lib.js o.at). A gentle push on the board */
const boardIn = (t, x, y, sc, o = {}) => { const t0 = MK("boardIn"); if (t < t0) return ""; const [bx, d] = slideX(t, t0, .7, 2600, x, y); return d + TF(bx, y, sc, cycleBoard(t, o)); };
SC.cyclecheck = (t, s) => V(t, DAY({ h: 9.8, clk: 9.8 }), [1 + .04 * eio((t - s.t0) / 6), 960, 620]) + boardIn(t, 900, 1066, .84)
  + bd("pip", 250, 240, t, { big: 2.0, y: 1076, in: s.t0 + .1, poses: [[s.t0, "sit"], [MK("tileday") + .2, "surprised"], [MK("tick1") - .1, "pointing"], [MK("tagcycle") + .1, "cheer"]], look: 4 })
  + bd("basil", 1720, 240, t, { in: s.t0 + .15, flip: true, poses: [[s.t0, "sit"], [MK("ringrun") + .3, "arms_crossed"], [MK("tagcycle"), "cheer"]], jump: [[MK("tagcycle"), 34]], look: -3 })
  + bd("momo", 1440, 200, t, { y: 1050, in: s.t0 + .2, flip: true, poses: [[s.t0, "thinking"], [MK("tick2") + .1, "surprised"], [MK("kw_cycle"), "cheer"]], look: -4 }) + HUD(t);
/* Mark Sentence 2 (Momo): C0.1, both sentences; REPEATED PATTERN pops after the last word (lib.js o.at); under the card: the board with its closed ring */
SC.mark2 = (t, s) => markScene(t, s, { id: "g1103", sayId: "g1102", who: "momo", n: "2 of 2", text: "Cycles are repeated patterns of change. They happen in living and non-living things.", keys: ["repeated", "patterns", "change", "living", "non-living"], size: 64, y: 240, footer: FOOT,
  under: TF(1000, 1070, .36, cycleBoard(t, { show: "daynight", small: true, id: "m2" })) });

/* 12 · HOLD ON! Basil: "My pencil ... is a cycle!" Basil big in his disc (proud, then surprised, then oops and a sheepish grin); the board
   at the right (the day-and-night tiles hop off at tilesoff; three pencil tiles hop towards the ring at pen1..pen3 and settle in a ROW at
   penrow; one tick at penchg; NOT A CYCLE at pentag); the HOLD ON! stamp; the YOU ring with crossed arms (5 s), the three pencils in it; the
   clue labels IT CHANGES ✓ · IT REPEATS ? ON TOP of the ring frame through the countdown; Pip and Momo cross their arms with the viewer */
const RG = [960, 420], RR = 215;
window.SHELF_AWAY = (t) => { const a = W("g1202", "cross") - .3, b = LE("g1203") + .4; return ss(a, a + .35, t) * (1 - ss(b, b + .35, t)); };   // the shelf slides aside for the HOLD ON! countdown
SC.holdon = (t, s) => { const a = "g1201", b = "g1202", c = "g1203", r0 = MK("ring0_hold"), bell = MK("bell_hold"), rs = ringState(t, r0, 5), tX = W(b, "cross") - .15, tH = W(b, "hold") - .1, tOne = W(c, "one") - .1, hb = HAS("g1204"), inT = t >= r0 && t < bell;
  // the countdown takes the stage (teacher, 22 Nov): from "cross your arms" to Heart's "One finger up!" the room gives way to the blue game stage;
  // the ring is big and central with the three pencils in it, the two clue labels large on top of its frame, the YOU arms crossed at the right,
  // ONE buddy (Basil, big, at the left) fidgeting; the board glides off to the right and back after
  const st = ss(tX - .1, tX + .4, t) * (1 - ss(LE(c) + .1, LE(c) + .6, t)), ring = st > .01;
  const pic = `<circle cx="${RG[0]}" cy="${RG[1]}" r="${RR - 24}" fill="#FFF8EA"/>` + TF(RG[0] - 2, RG[1] - 80, 1.4, pencil14(150)) + TF(RG[0] - 40, RG[1] - 16, 1.4, pencil14(96)) + TF(RG[0] - 80, RG[1] + 48, 1.4, pencil14(40)) + TF(RG[0] + 60, RG[1] + 56, 1.35, shavings14(t));
  const labels = [["IT CHANGES ✓", 420, 250, -1], ["IT REPEATS ?", 1500, 250, 1]].map(([l, x, y, sd], i) => { const t0 = tX + .2 + i * .15; return t < t0 ? "" : pline(x - sd * 190, y + 20, RG[0] + sd * RR * .8, RG[1] - RR * .6, ramp(t, t0, .2)) + clue3(x, y, l, spring(t, t0, .4), 58, 600); }).join("");
  const push = 1 + .05 * eio((t - s.t0) / 4) * (1 - eio((t - tX) / 1)), bx = lerp(1560, 2400, ss(tX - .2, tX + .5, t) * (1 - ss(LE(c) + .2, LE(c) + .9, t)));
  const room = V(t, DAY({ h: 10, clk: 10, owl: { at: [1530, 606] } }), [push, 700, 600]) + `<rect width="1920" height="1080" fill="${P.night}" opacity=".3"/>` + TF(bx, 1066, .52, cycleBoard(t, { id: "ho" }));
  const fid = inT ? 1 : 0, bob = inT ? 16 * Math.sin((t - r0) * Math.PI * 2) : 6 * Math.sin(t * 3);
  return room + (ring ? OP(st, bg("stage")) : "")
    + (ring ? OP(st, TF(RG[0], RG[1], spring(t, tX, .45) * (1 + .035 * (inT ? rs.tick : 0)), `<g transform="translate(${-RG[0]} ${-RG[1]})">${ringTimer(RG[0], RG[1], t < r0 ? 1 : t < bell ? rs.frac : 0, t < r0 ? 5 : t < bell ? rs.secs : 0, t, { R: RR, sw: 34, tick: rs.tick, shut: pulse(t, bell, .01, .6), chg: inT || (t >= bell && t < bell + .5) ? (t >= bell ? bell : rs.chg) : -9, ns: 1.25, inner: pic })}</g>`)
      + labels + TF(1700, 640 + bob, .9 * spring(t, tX + .1, .4), `<g filter="url(#dropS)">${crossedArms()}</g>`) + youPill(1700, 470 + bob * .6, 1.2) + TF(1700, 860, spring(t, tX + .2, .4), tpill(0, 0, "cross your arms", 38, P.ink, "#fff", { w: 700 }))) : "")
    + bd("pip", 1340, 170, t, { y: 1066, in: LT("g1205p") - .5, poses: [[LT("g1205p") - .5, "thinking"], [LT("g1205p") - .12, "sit"], [LE("g1205p") + .2, "pointing"]], look: -3 })
    + bd("momo", 1700, 170, t, { y: 1066, in: LT("g1205p") - .3, flip: true, poses: [[LT("g1205p") - .3, "surprised"], [MK("pentag") + .1, "cheer"]] })
    + bd("basil", 280, 310, t, { y: 1076, in: s.t0 + .1, rock: fid * 2.2, look: inT ? 6 : 0, poses: [[s.t0, "cheer"], [LE(a) + .3, "arms_crossed"], [W(b, "not") - .1, "surprised"], [tH + .5, "sit"], [r0 - .2, "thinking"], [bell - 1.6, "oops"], [bell, "surprised"], [W("g1205p", "not") - .12, "surprised"], [hb ? LT("g1204") - .12 : W("g1205p", "repeat") - .1, "oops"], [hb ? LE("g1204") + .3 : LE("g1205p") + .6, "sit"]], jump: [[W(a, "cycle") - .1, 30], [bell + .02, 30], [hb ? LE("g1204") + .35 : LE("g1205p") + .65, 14]], nohop: true })
    + say(a, 680, 260, t, { size: 40, tail: -240, maxW: 640 }) + (hb ? say("g1204", 680, 260, t, { size: 40, tail: -240, maxW: 640 }) : "")
    + stamp(t, tH, 960, 560, "HOLD ON!") + bellIcon(t, r0) + coin(t, tOne, 1300, 700, "+1", "arms crossed") + HUD(t); };

/* 13 · Pip finds one: "Then look down there, at the traffic light!" Pip big (pointing, a hop on "down"); Basil and Momo turn to the window.
   The camera starts to glide towards the window and the junction below; it carries straight on into the look-closer (no cut) */
const camDown = (t) => { const u = eio((t - SCN.pipdown.t0) / (SCN.pipdown.t1 - SCN.pipdown.t0 + .6)); return [1 + .3 * u, 1280, 520]; };
const TLW = [WIN.x + 800 * WIN.s, WIN.y + 800 * WIN.s];
SC.pipdown = (t, s) => { const L = "g1301", td = W(L, "down") - .15;
  return V(t, DAY({ h: 10.4, clk: 10.4, sun: .75 }), camDown(t))
    + bd("basil", 1500, 200, t, { in: s.t0 + .2, flip: true, poses: [[s.t0, "sit"], [td + .3, "surprised"], [LE(L) - .3, "arms_crossed"]], look: -6 }) + bd("momo", 1740, 195, t, { in: s.t0 + .25, flip: true, poses: [[s.t0, "sit"], [td + .45, "thinking"]], look: -6 })
    + bd("pip", 330, 310, t, { in: s.t0 + .1, poses: [[s.t0, "cheer"], [LT(L) + .5, "pointing"], [W(L, "think") - .1, "thinking"]], jump: [[td, 30]] }) + say(L, 640, 520, t, { size: 40, tail: -190, maxW: 600 }) + HUD(t); };
SC.lclight = (t, s) => lookCloser(t, s, { tz: s.t0, fx: camPt(camDown(s.t0), TLW)[0], fy: camPt(camDown(s.t0), TLW)[1], art: lightArt, bgc: "#A9DDB0", verdict: [`A CYCLE`, GOODC], tv: MK("v_light"),
  over: (tt) => tt < s.t0 + 1.6 ? "" : TF(1500, 600, .36 * spring(tt, s.t0 + 1.6, .5), cycleBoard(tt, { small: true, id: "ll" })) });

/* 14 · the score hand, the owl (lizReveal in common.js: the score hand melts into the real room, ONE push-in onto the owl, the ring pops on
   its name: it opens one eye, looks at us, and closes it again), the key words (kwrecap in common.js) */
SC.final = (t, s) => { const L = "g1401"; return finalScene(t, s, L, 0, [[s.t0, null, 1], [W(L, "two") - .1, null, 2]]); };
SC.liz = (t, s) => { const L = "g1402", tq = W(L, "it") - .1, tR = W(L, "owl") + .1, wk = ss(tR + .45, tR + .75, t) * (1 - ss(tR + 2.3, tR + 2.7, t));
  return lizReveal(t, s, L, V(t, DAY({ h: 10.6, clk: 10.6, sun: .7, owl: { wink: wk, look: 2 }, bird: (t - s.t0 - 2.6) / 1.5 })), OWL[0], OWL[1], tq, "It was on the tree outside the window!", -150, 66, 44, 2.7, { from: () => SC.final(SCN.final.t1 - .04, SCN.final), qx: 560, qy: 770, tx: 560, ty: 900, tell: "g1404",
    fact: { id: "g1403", items: [["ff_day", "day: asleep", ffOwlDay], ["ff_night", "night: awake", ffOwlNight]], cols: ["#E8A23A", "#5B6BD6"] } }); };

/* 15 · the cliffhanger: do living things have cycles too? Momo big (thinking, then a hop as the cards come); a small cream card living and
   non-living things with "living" glowing and a big ? over it (q); three picture cards slide in low and stand on the floor (card1..card3: a
   hen, a chick, a teddy bear); Pip and Basil look at the teddy bear card (surprised); PART 2 slams in */
SC.cliff = (t, s) => { const tP = W("g1503", "part") - .1, tq = MK("q"), CX = [800, 1100, 1400];
  return V(t, DAY({ h: 10.8, clk: 10.8, sun: .7 }), [1 + .04 * eio((t - s.t0) / 9), 900, 640]) + `<rect width="1920" height="1080" fill="${P.night}" opacity=".16"/>`
    + TF(1100, 330, spring(t, s.t0 + .2, .45), `<g filter="url(#dropS)"><rect x="-350" y="-64" width="700" height="128" rx="26" fill="url(#gPaper)"/></g>${t >= tq ? `<rect x="-318" y="-34" width="${n2(160 * eo((t - tq) / .35))}" height="36" rx="6" fill="#FFD75A"/>` : ""}${T(0, 15, "living and non-living things", 44, P.ink)}`) + qMark(t, tq, 780, 250, 46)
    + ["hen", "chick", "teddy"].map((c, i) => { const t0 = MK("card" + (i + 1)); if (t < t0) return ""; const [x, d] = slideX(t, t0, .5, 2300, CX[i], 940); return d + TF(x, 770, 1, picCard14(c, t)); }).join("")
    + bd("pip", 1560, 172, t, { in: s.t0 + .2, flip: true, poses: [[s.t0, "sit"], [MK("card1") + .2, "pointing"], [MK("card3") + .25, "surprised"]], look: -4 }) + bd("basil", 1790, 176, t, { in: s.t0 + .25, flip: true, poses: [[s.t0, "sit"], [MK("card3") + .35, "surprised"], [tP + .1, "cheer"]], look: -4 })
    + bd("momo", 280, 290, t, { big: 1.75, y: 1076, in: s.t0 + .1, poses: [[s.t0, "thinking"], [LE("g1501") + .2, "sit"], [MK("card1") + .1, "surprised"], [MK("card3") + .5, "pointing"], [tP, "cheer"]], jump: [[MK("card1") + .12, 26]] }) + say("g1501", 720, 420, t, { size: 40, tail: -260, maxW: 560 })
    + (t >= tP ? slamFit(330, "PART 2", P.sun, slamK(t - tP, 0)) : "") + HUD(t); };

/* 16 · "Now you know!": the board CYCLE CHECK (the day-and-night ring closed, both boxes ticked, its arrows going round) centred in the free
   space between the buddies */
SC.nyk = (t, s) => nykScene(t, s, TF(860, 1040, .5, cycleBoard(t, { show: "daynight", id: "ny" })), { bx: [200, 1715, 1375], hx: 470 });
})(); }
