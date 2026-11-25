// p1.js: PART 1, "Frog vs Mosquito: SAME or DIFFERENT? Count the Stages!": EP17's dare answered (no, they are different), how to compare
// (SIMILARITIES and DIFFERENCES: Momo's two similarities are real), be a raindrop (count the stages: the frog three, the mosquito four), the
// answer (OBSERVABLE CHARACTERISTICS; Mark Sentence 5.14), HOLD ON! (Pip: frog and grasshopper "exactly the same"), the young beside their
// parents (Mark Sentence 5.12), the cicada, the cliffhanger (the hen on her eggs: which came first?).
// Segments 1-13 of ../p3_ep18_script.md section 4 (version 1, 23 Nov 2026).
// STAGE 2 (drawn 2026-11-23): one real place, our block's VOID DECK on LIFE CYCLE DAY (art18.js VDK: the LIFE CYCLE DAY board with its
// COMPARE FRAME, the rain tree just outside, the fan, a pigeon, a child cycling past), the garden pond in the rain (EP16's VP16) and the
// garden's edge with the hen on her nest (VGE); the buddies stand IN the scene, big, with a contact shadow; the camera drifts or pushes in
// and never cuts inside a place. Every pose has its reason (SCENES_TODO.md); every action is drawn AT its mark (the sound keys on them).
if (PART === 1) { (() => {
const L1 = "k501";
// the scores (script section 3): Round 1 1 : 0 (only Pip is right for the right reason: Basil's right card for the wrong reason scores
// nothing, so the Buddies do not score), HOLD ON! 2 : 0
SCORE.push([MK("coin1") - .1, 1, 0]);
SCORE.push([W("k1003", "one") - .1, 2, 0]);
const FOOT = "P3 · Life Cycles of Animals · Comparing life cycles";
const qMark = (t, t0, x, y, r = 50) => t < t0 ? "" : TF(x, y, spring(t, t0, .5) * (1 + .05 * Math.sin(t * 4)), `<g filter="url(#dropS)"><circle r="${r}" fill="url(#gSun)"/></g>${T(0, r * .52, "?", r * 1.56, P.ink)}`);
const slamFit = (y, txt, col, k) => slamLine(y, txt, Math.min(170, 170 * 1720 / tw(txt, 170, 700, "Fredoka", 4)), col, k);
const bd = (who, x, y, h, t, o = {}) => buddy(who, x, y, h, t, o);
// the picture of the scene before melts away over the new one (no hard cut from a card screen into a place)
const melt = (t, s, name, d = .4) => meltScene(t, s, name, d);   // lib.js (teacher, 25 Nov 2026): the old frame melts, its buddies glide or pop out, never fade
// EP17's two dare cards (ep17dare.js: EP17's own art, twoLoops with = / ≠)
const DCX = [880, 1120], DCY = 838;
const dcards = (t, t0, id) => [0, 1].map((i) => { if (t0 === undefined) return TF(DCX[i], DCY, .36, dareCard3(i, t, { id: id + i })); const tt = t0 + i * .3; if (t < tt) return ""; const [x, d] = slideX(t, tt, .7, i ? 2300 : -400, DCX[i], DCY + 70); return d + TF(x, DCY, .36, dareCard3(i, t, { id: id + i })); }).join("");
const CHIPS_SAME = [[0, "eggs in water"], [0, "young unlike the adult"]], CHIPS_DIFF = [[0, "the number of stages"]];

/* 1 · the cold open, SPEAKING from 0.825 s (SERIES_FORMAT 11 item 1; EP22's approach): the void deck on LIFE CYCLE DAY while Heart says "Last
   time, we asked: A frog and a mosquito! Both lay their eggs in water, and both have young that look nothing like the adult." The place card
   from 0.2 s (about 8.5 s on screen). ONE slow push towards the COMPARE FRAME over the whole scene; the frog loop and the mosquito loop slide into
   its two windows (loopsIn); EP17's two dare cards slide in low along the stone table (cardsIn); the buddies pop in (budsIn): Basil on the left
   by his stool, Pip at the table's end, Momo on the right waving hello. The cicada on the rain tree's trunk outside (before the game) */
const camCold = (t) => { const u = eio(t / SCN.cold.t1); return [1 + .1 * u, lerp(960, 1000, u), lerp(540, 520, u)]; };
const loopsK = (t) => [ss(MK("loopsIn"), MK("loopsIn") + .8, t), ss(MK("loopsIn") + .3, MK("loopsIn") + 1.1, t)];
const budsDeck = (t, tp, o = {}) => bd("basil", 250, 1076, 480, t, { in: tp, poses: [[tp, "sit"]], look: 3, jump: o.jb || [] })
  + bd("pip", 1395, 1020, 380, t, { in: tp + .2, flip: true, poses: [[tp, "sit"]], jump: o.jp || [] })
  + bd("momo", 1720, 1076, 480, t, { in: tp + .4, flip: true, poses: o.momo || [[tp + .4, "waving"], [tp + 2.3, "sit"]], wave: true });
SC.cold = (t, s) => { const tp = MK("budsIn");
  return VDK(t, { loops: loopsK(t), child: .6, front: dcards(t, MK("cardsIn"), "c") }, camCold(t)) + budsDeck(t, tp)
    + OP(ramp(t, .2, .4), lowerPill(60, 96, "A void deck, Singapore ·", "Saturday morning")); };

/* 2 · "Last time...": EP17's dare, word for word. ONE calm picture: EP17's two cards side by side, a gentle push-in, the big ?, each card steps
   forward and lights while Heart says it (>= 2.5 s each) */
SC.lasttime = (t, s) => { const L = "k203", tc = [W(L, "one"), W(L, "two")], z = 1 + .04 * eio((t - s.t0) / 8), k = ramp(t, s.t0 + .05, .5), cur = tc.filter((x) => t >= x - .15).length - 1;
  let cards = ""; [0, 1].forEach((i) => { const fw = cur === i ? ss(tc[i] - .15, tc[i] + .25, t) : (cur > i ? 1 - ss(tc[i + 1] - .15, tc[i + 1] + .25, t) : 0);
    cards += TF(700 + i * 520, 590 + 14 * (1 - spring(t, s.t0 + .2 + i * .15, .45)), 1.15 * (1 + .1 * fw), dareCard3(i, t, { id: "lt" + i, pulse: cur === i ? .9 : pulse(t, tc[i], .04, .9) })); });
  return bg("stage2") + OP(ramp(t, s.t0, .3), T(960, 110, "Last time…", 60, "#fff", { w: 600 }))
    + OP(k, `<g transform="translate(960 540) scale(${n2(z)}) translate(-960 -540)">${cards}</g>`
      + qMark(t, W("k202", "are") - .1, 960, 300)
      + TF(960, 1000, spring(t, W("k202", "are") - .1, .4), tpill(0, 0, DARE_LABEL, 44, P.sun, P.ink, { w: 700 }))) + melt(t, s, "cold", .5) + HUD(t); };
/* back at the void deck: the camera drifts on along the board (it carries on under the title and into the game: no cut). Pip keeps his answer
   to himself (a small hop), Basil a secret fist, Momo a big sure smile: no pose sprites */
const camBack = (t) => { const u = clamp((t - SCN.back.t0) / (SCN.title.t1 - SCN.back.t0)); return [1.1 + .04 * eio(u), lerp(1000, 1060, eio(u)), lerp(520, 500, eio(u))]; };
const backWorld = (t) => VDK(t, { front: dcards(t) }, camBack(t)) + budsDeck(t, SCN.back.t0 - 3, { momo: [[0, "sit"]], jp: [[LT("k204") + .3, 26]], jb: [[LT("k204") + .5, 14]] });
SC.back = (t, s) => backWorld(t) + (t >= LT("k204") - .1 ? TF(1000, 330, spring(t, LT("k204") - .1, .4), tpill(0, 0, "Hold on to your answer!", 56, P.sun, P.ink, { w: 700 })) : "") + melt(t, s, "lasttime", .5) + HUD(t);
// the title slam over the dimmed void deck: SAME OR DIFFERENT? (white) then FROG VS MOSQUITO (sun yellow)
const TITLE = (k1, k2) => slamFit(400, "SAME OR DIFFERENT?", "#fff", k1) + slamFit(610, "FROG VS MOSQUITO", P.sun, k2);
SC.title = (t, s) => { const u = t - MK("title"), dim = clamp(u / .2); return backWorld(t) + `<rect width="1920" height="1080" fill="${P.night}" opacity="${n2(.78 * dim)}"/>` + TITLE(slamK(u, .05), slamK(u, .55)) + HUD(t); };

/* 3 · the game, and the hidden cicada: ONE smooth push-in from the (dimmed) void deck straight onto the cicada on the rain tree's trunk (common.js
   gameScene; the INTRO spot, never used again) */
SC.game = (t, s) => { const cE = camBack(SCN.title.t1), c = CICAT.game;
  return gameScene(t, s, ["k301a", "k301b", "k301r"], false, { world: (tt) => VDK(tt, { front: dcards(tt) }, cE), A: camPt(cE, [c[0], c[1]]), T: [700, 430], Z: 3.4, dim0: .78, pre: () => TITLE(1, 1) }) + smallPrint(t, LT("k301r"), LOOK_RULE); };
SC.goals = (t, s) => goals3(t, s, [["How to compare", ""], ["Count the stages", ""], ["Look at the young", ""]], ["k401", "k402", "k403", "k404"], "momo");
SC.r1card = (t, s) => roundCard(t, s, "ROUND 1", "YOUR ANSWER FROM LAST TIME");

/* 5 · Round 1: EP17's dare (a short 3 s ring). EP17's two cards as the ONE set of numbered picture cards; the clue labels eggs in water ·
   young unlike the adult ON TOP of the ring; in the ring the frog's loop and the mosquito's loop side by side. Basil leads */
SC.r1 = (t, s) => lockN(t, { cards: DARE_CARDS, clues: DARE_CLUES.map((c, i) => [c, W(L1, "same") + .15 * i]), lead: "basil", csize: 44, q: DARE_LABEL, tq: W(L1, "are") - .1,
  tc: [W(L1, "are"), W(L1, "show")], ring0: MK("ring0_r1"), dur: 3, lock: "k502",
  pics: [0, 1].map((i) => darePic(i, t)), obj: ringLoops18,
  picks: [{ who: "momo", id: "k503", word: "1" }, { who: "basil", id: "k504", word: "2" }, { who: "pip", id: "k505", word: "2" }] });

/* 6 · Momo at the board: "But I found two things that are the same!" The COMPARE FRAME at its home; the camera pushes in on it as she speaks
   (straight into the look-closer: no cut). Momo talks, then thinks (her real question). The cicada low on the pillar by the letterboxes */
const camBoard = (t) => { const s = SCN.board, u = eio((t - s.t0) / (s.t1 - s.t0)); return [lerp(1.06, 1.3, u), lerp(1000, 1000, u), lerp(520, 470, u)]; };
SC.board = (t, s) => VDK(t, { front: dcards(t) }, camBoard(t))
  + bd("momo", 300, 1076, 520, t, { in: s.t0 + .1, poses: [[s.t0, "sit"], [LE("k601m") + .1, "thinking"]], look: 3 })
  + bd("pip", 1560, 1060, 420, t, { in: s.t0 + .2, flip: true, poses: [[s.t0, "sit"]] }) + bd("basil", 1790, 1076, 420, t, { in: s.t0 + .25, flip: true, poses: [[s.t0, "sit"]] })
  + melt(t, s, "r1", .45) + HUD(t);
/* [LOOK CLOSER] the COMPARE FRAME (art18.js compareArt): SIMILARITIES and DIFFERENCES pop (lib.js o.at) and the strips say them; Momo's two
   similarities land on the SAME strip (same1, same2); the count waits. Faces: Basil (auto, left: he teaches the two words; cheer when
   DIFFERENCES lands); Momo at the right (her pick is tested: listening, surprised at same1 (her two similarities are real), then thinking at
   Heart's "But is there a difference?") */
SC.lccompare = (t, s) => { window._BUBAT = { '*': [960, 600] }; const cE = camBoard(SCN.board.t1), p = camPt(cE, [1000, 470]), tm = s.t0 + 1.2, tq = W("k606", "is") - .1;
  const momoFace = t >= tm - .05 ? bd("momo", LCW.x + LCW.w / 2 - 200, LCW.y + LCW.h / 2 + 470 * .42 + (1 - eo((t - tm) / .45)) * 350, 470, t, { in: tm, poses: [[tm, "sit"], [MK("same1") + .1, "surprised"], [MK("same1") + 2.2, "sit"], [tq, "thinking"]], peek: true, tag: false, shadow: false, flip: true, nohop: true }) : "";
  return lookCloser(t, s, { tz: s.t0, fx: p[0], fy: p[1], art: compareArt, bgc: "#FFF8EA", set: (tt) => VDK(tt, { front: dcards(tt) }, cE), verdict: [`SAME AND DIFFERENT: LOOK FOR BOTH`, GOODC], tv: MK("v_compare"), peekH: 470,
    peekEv: [[MK("kw_differences") + .1, "basil", "cheer"], [MK("kw_differences") + 2.3, "basil", "sit"]], over: () => momoFace }); };

/* 7 · Be a raindrop! The garden pond: a soft shower starts (the light greys); the buddies wave the viewer off (goodbye), then each shrinks with
   a pop; the camera glides UP into the grey sky (one glide, no cut); the journey; one pull back out (the frog on its lily pad, the plate) */
const camRain = (t) => { const s = SCN.waitw, u = eio((t - s.t0) / (s.t1 - s.t0)); return [lerp(1.04, 1.5, u), 960, lerp(600, -80, u)]; };
SC.waitw = (t, s) => { const L = "k701", tP = W(L, "be") - .15, rk = ss(s.t0, s.t0 + 1.5, t), sh = W(L, "shrink") - .1;
  const buds = ["momo", "pip", "basil"].map((w, i) => { const x = [300, 620, 1650][i]; return bd(w, x, 1076, 430, t, { in: s.t0 + .1 + .05 * i, out: sh + .2 * i + .3, flip: x > 960, poses: [[s.t0, "sit"], [tP + .2 + .15 * i, "waving"]], wave: true }); }).join("");
  return VP16(t, { frogAt: false, items: plate18(t) === "" ? "" : TF(180, 1010, .9, plate18(t)) + cicadaAt(t, 1586, 470, .3, 0), dawn: 0 }, camRain(t)) + rain18(t, rk)
    + OP(1 - ss(s.t1 - 1.2, s.t1 - .6, t), buds + (t >= tP ? TF(960, 250, spring(t, tP, .45), tpill(0, 0, "Be a raindrop!", 76, P.sun, P.ink, { w: 700 })) : "") + HUD(t)) + wipe(t, s.t1, "#9EB0C8", 960, 300); };
SC.shrink = (t, s) => { const m = MK;
  const rp = { basil: [[m("jpupa") + .1, "surprised"], [m("jpupa") + 2.2, "sit"]] };
  return rainJourney(t, s) + riderLeaf(t, 300, 1066, 1.05, 0) + riderLeaf(t, 1650, 1070, .95, 1)
    + riders(t, s, { tin: m("jpond") + .6, h: 200, at: { pip: [210, 1044], basil: [1690, 1050], momo: [400, 1040] }, poses: rp })
    + youTag(t, m("jpond"), "You: a raindrop") + speeded(t, m("jtadpole"), m("jmosq") + 2)
    + (t >= m("jpond") && t < m("jsplash") + .4 ? TF(1650, 230, spring(t, m("jpond"), .4), tpill(0, -70, "the frog", 32, P.ink, "#fff", { w: 700 }) + dots(0, 0, 3, dotN(t, ["jpond", "jtadpole", "jfrog"]))) : "")
    + (t >= m("jsplash") ? TF(1650, 230, spring(t, m("jsplash"), .4), tpill(0, -70, "the mosquito", 32, P.ink, "#fff", { w: 700 }) + dots(0, 0, 4, dotN(t, ["jsplash", "jwrig", "jpupa", "jmosq"]), t >= m("jpupa") && t < m("jmosq") ? 2 : -1)) : "")
    + feelTag(t, m("jfrog"), m("jsplash") - .1, "three stages", 160) + feelTag(t, m("jpupa"), m("jmosq") - .1, "one more stage!", 160) + feelTag(t, m("jmosq") + .3, m("jmosq") + 3.5, "four stages", 160); };
const dotN = (t, marks) => marks.filter((m) => t >= MKS(m)).length;
SC.pullout = (t, s) => { const u = 1 - eo((t - s.t0) / .6); return VP16(t, { frogAt: false, frog: { x: 1120, y: 884, k: .7 }, items: TF(180, 1010, .9, plate18(t)) }, [1 + 2.4 * u, 1120, 860])
  + bd("basil", 270, 1076, 500, t, { in: s.t0 + .2 }) + bd("momo", 1420, 1000, 360, t, { in: s.t0 + .25, flip: true }) + bd("pip", 1690, 1076, 500, t, { in: s.t0 + .3, flip: true }) + wipe(t, s.t0, "#FFFFFF") + HUD(t); };

/* 8 · the answer is two: they are different. The void deck: the COMPARE FRAME at its home, the dot counters fill (three, four: the pupa's dot
   glows); EP17's two cards small along the top (card 2 the tick at ansglow; an x by Momo's pick; a ? by Basil's: right card, wrong reason);
   the chip "the number of stages" lands on the DIFFERENT strip; OBSERVABLE CHARACTERISTICS pops (lib.js o.at) with an eye (see it) and 1-2-3
   (count it). Pip (right for the right reason) explains; OUTCOMES: Pip confident, Momo shy at ansglow, Basil shy at k804. The cicada on the
   side of the letterboxes, half behind a flyer */
const camAns = (t) => { const e = eio((t - MK("three") + .5) / 1.2) * (1 - eio((t - LT("k804") + .4) / 1.2)); return [lerp(1.08, 1.6, e), lerp(1000, 1000, e), lerp(500, 400, e)]; };
const qChip = (t, t0, x, y, s = 1) => t < t0 ? "" : TF(x, y, spring(t, t0, .4) * s, `<g filter="url(#dropS)"><circle r="30" fill="#fff" stroke="${P.ink}" stroke-width="4"/></g>` + T(0, 13, "?", 40, P.ink));
const flyer = `<g transform="translate(468 352) rotate(6)"><rect x="-38" y="-60" width="76" height="110" rx="4" fill="#FFF6C8" stroke="#D9C56A" stroke-width="3"/><path d="M-26 -36 H26 M-26 -18 H20 M-26 0 H26 M-26 18 H14" stroke="#C9A93A" stroke-width="5"/></g>`;
SC.answer = (t, s) => { window._BUBAT = { pip: [1480, 330] }; const tA = MK("ansglow"), tK = MK("kw_observable_characteristics"), tc = W("k807p", "count") - .1, k807 = LT("k807p");
  const icons = (t >= tK + .3 && t < LE("k807p") + .6) ? OP(1 - ramp(t, LE("k807p") + .2, .4), TF(700, 440, spring(t, tK + .3, .45) * (1 + .15 * pulse(t, W("k807p", "see") - .1, .05, .6)), `<g filter="url(#dropS)"><circle r="62" fill="#fff"/></g><ellipse rx="42" ry="24" fill="#fff" stroke="${P.ink}" stroke-width="6"/><circle r="15" fill="${P.ink}"/><circle cx="5" cy="-5" r="5" fill="#fff"/>` + T(0, 104, "see it", 32, "#fff"))
    + TF(1300, 440, spring(t, tK + .5, .45) * (1 + .15 * pulse(t, tc, .05, .6)), `<g filter="url(#dropS)"><circle r="62" fill="#fff"/></g>` + T(0, 16, "1-2-3", 40, P.ink) + T(0, 104, "count it", 32, "#fff"))) : "";
  return VDK(t, { cicAt: CICAT.answer, items0: flyer, dots: [MK("three"), MK("four")], glowPupa: t >= MK("four") && t < MK("four") + 3, diff: [[MK("four") + .6, "the number of stages"]] }, camAns(t))
    + [0, 1].map((i) => TF(140 + i * 210, 112, .27, dareCard3(i, t, { id: "an" + i, lit: i === 1 && t >= tA ? spring(t, tA, .45) : 0 }))).join("") + xChip16(t, tA + .15, 200, 72, .7) + tickChip16(t, tA, 410, 72, .7)
    + coin(t, MK("coin1") - .1, 1560, 330, "+1", "if you showed two fingers") + icons
    + bd("basil", 270, 1076, 500, t, { in: s.t0 + .1, poses: [[s.t0, "sit"], [LT("k804") + .05, "oops"]] }) + (t > s.t0 + .3 ? pickNum("basil", 410, 640, t, s.t0 + .3, "2") : "") + qChip(t, tA + .3, 470, 585, .8)
    + bd("momo", 1420, 1000, 360, t, { in: s.t0 + .15, flip: true, poses: [[s.t0, "sit"], [tA, "oops"]] }) + (t > s.t0 + .35 ? pickNum("momo", 1300, 720, t, s.t0 + .35, "1") : "") + xChip16(t, tA + .2, 1350, 665, .7)
    + bd("pip", 1690, 1076, 500, t, { in: s.t0 + .2, flip: true, poses: [[s.t0, "sit"], [tA, "arms_crossed"], [tK - .1, "cheer"], [tK + 2.2, "arms_crossed"]] }) + (t > s.t0 + .4 ? pickNum("pip", 1880, 640, t, s.t0 + .4, "2") : "") + tickChip16(t, tA + .25, 1860, 580, .7)
    + melt(t, s, "pullout", .3) + HUD(t); };
SC.mark1 = (t, s) => markScene(t, s, { id: "k902", sayId: "k901", who: "pip", n: "1 of 2", text: "The life cycles of the frog and the mosquito are similar because the young do not look like the adults. However, the life cycles are different because the frog has three stages in its life cycle, while the mosquito has four stages in its life cycle.", keys: ["similar", "young", "look", "adults", "different", "three", "four", "stages"], size: 44, y: 215, footer: FOOT,
  under: TF(1560, 905, .62 * spring(t, s.t0 + .4, .5), compareFrame(t, { id: "m1", same: CHIPS_SAME, diff: CHIPS_DIFF, words: true, dots: [0, 0] })) });

/* 9 · HOLD ON! Pip's own sheet on a low easel at the void deck (art18.js pipSheet: the frog's loop = the grasshopper's loop, THE SAME!, 3
   stages). Pip big at the left reads it and points at it; the HOLD ON! stamp; the countdown takes the stage (the blue game stage, the ring big
   and central with his sheet's two loops in it, the clue labels 3 stages and 3 stages · the same? ON TOP of the ring, YOU cross your arms;
   only Pip at the side, his thinking face standing in for worried). After the bell: Basil fixes it (the young?) and the empty orange chip
   pops on the sheet. The cicada on top of the easel's frame (not in the ring) */
const EAS1 = [720, 1078, .62], RG = [960, 420], RR = 215;
window.SHELF_AWAY = (t) => { if (PART !== 1) return 0; const a = W("k1002", "cross") - .3, b = LE("k1003") + .4, w = SCN.waitw; return Math.max(ss(a, a + .35, t) * (1 - ss(b, b + .35, t)), ss(w.t0 + .3, w.t0 + .8, t) * (1 - ss(SCN.pullout.t1, SCN.pullout.t1 + .4, t))); };
const holdWorld = (t, cam) => { const r0 = MK("ring0_hold"), bell = MK("bell_hold"), cic = t < r0 - 1 || t > bell + 1 ? cicadaAt(t, EAS1[0] + 200 * EAS1[2], EAS1[1] - 942 * EAS1[2], .3, 0) : "";
  return VDK(t, { cicAt: false, front: dcards(t) + TF(EAS1[0], EAS1[1], EAS1[2], pipSheet(t, { young: W("k1004b", "young") - .2, lit: pulse(t, W("k1001p", "exactly") - .1, .05, .8) })) + cic }, cam); };
const camHold = (t) => { const e = eio((t - MK("pipboard") + .4) / 1.4) * (1 - eio((t - LT("k1004b") + .3) / 1.2) * .6); return [lerp(1.0, 1.35, e), lerp(980, 720, e), lerp(560, 640, e)]; };
SC.holdon = (t, s) => { window._BUBAT = { basil: [1330, 250], pip: [700, 280] }; const b = "k1002", c = "k1003", d = "k1004b", r0 = MK("ring0_hold"), bell = MK("bell_hold"), rs = ringState(t, r0, 5), tX = W(b, "cross") - .15, tH = W(b, "hold") - .1, tOne = W(c, "one") - .1, inT = t >= r0 && t < bell;
  const st = ss(tX - .1, tX + .4, t) * (1 - ss(LE(c) + .1, LE(c) + .6, t)), ring = st > .01;
  const inner = `<circle cx="${RG[0]}" cy="${RG[1]}" r="${RR - 24}" fill="#FFFDF6"/>` + T(RG[0], RG[1] - 112, "THE SAME!", 36, P.pip) + TF(RG[0] - 86, RG[1] + 6, 1, loopN(t, frogPic, 3, { R: 62, r: 32, id: "hrf", sw: 6 })) + TF(RG[0] + 86, RG[1] + 6, 1, loopN(t, hopPic, 3, { R: 62, r: 32, id: "hrh", sw: 6 }))
    + TF(RG[0], RG[1] + 6, 1, `<circle r="28" fill="${SAMEC}"/>` + T(0, 15, "=", 44, "#fff")) + T(RG[0] - 86, RG[1] + 104, "frog", 22, P.ink) + T(RG[0] + 86, RG[1] + 104, "grasshopper", 22, P.ink);
  const labels = [["3 stages and 3 stages", 420, 250, -1], ["the same?", 1500, 250, 1]].map(([l, x, y, sd], i) => { const t0 = tX + .2 + i * .15; return t < t0 ? "" : pline(x - sd * 190, y + 40, RG[0] + sd * RR * .8, RG[1] - RR * .6, ramp(t, t0, .2)) + clue3(x, y, l, spring(t, t0, .4), 54, 520); }).join("");
  const bob = inT ? 16 * Math.sin((t - r0) * Math.PI * 2) : 6 * Math.sin(t * 3);
  return holdWorld(t, camHold(t)) + `<rect width="1920" height="1080" fill="${P.night}" opacity=".08"/>` + (ring ? OP(st, bg("stage")) : "")
    + (ring ? OP(st, TF(RG[0], RG[1], spring(t, tX, .45) * (1 + .035 * (inT ? rs.tick : 0)), `<g transform="translate(${-RG[0]} ${-RG[1]})">${ringTimer(RG[0], RG[1], t < r0 ? 1 : t < bell ? rs.frac : 0, t < r0 ? 5 : t < bell ? rs.secs : 0, t, { R: RR, sw: 34, tick: rs.tick, shut: pulse(t, bell, .01, .6), chg: inT || (t >= bell && t < bell + .5) ? (t >= bell ? bell : rs.chg) : -9, ns: 1.25, inner })}</g>`)
      + labels + TF(1700, 640 + bob, .9 * spring(t, tX + .1, .4), `<g filter="url(#dropS)">${crossedArms()}</g>`) + youPill(1700, 470 + bob * .6, 1.2) + TF(1700, 860, spring(t, tX + .2, .4), tpill(0, 0, "cross your arms", 38, P.ink, "#fff", { w: 700 }))) : "")
    + bd("basil", 1740, 1076, 500, t, { in: LT(c) + .3, flip: true, poses: [[LT(c) + .3, "arms_crossed"]], look: -3 })
    + bd("momo", 1480, 1030, 380, t, { in: LT(c) + .45, flip: true, poses: [[LT(c) + .45, "arms_crossed"]] })
    + bd("pip", 200, 1076, 520, t, { in: s.t0 + .1, rock: inT ? 2.2 : 0, look: inT ? 6 : 0, poses: [[s.t0, "sit"], [LE("k1001p") + .1, "pointing"], [LE("k1001p") + 2.2, "sit"], [LE(b) - .2, "thinking"], [r0 - .2, "worried"], [bell + .35, "sit"], [LT(c), "oops"]], jump: [[bell + .02, 30]], nohop: true })
    + stamp(t, tH, 960, 560, "HOLD ON!") + bellIcon(t, r0) + coin(t, tOne, 1420, 470, "+1", "arms crossed") + melt(t, s, "mark1", .4) + HUD(t); };

/* 10 · [LOOK CLOSER] the young beside their parents (art18.js youngArt). Faces: the speakers (auto, left: Momo, then Basil); Pip at the right
   (his rule is tested: he listens; a slow nod at the end, no second oops) */
SC.lcyoung = (t, s) => { window._BUBAT = { '*': [960, 205] }; const cE = camHold(SCN.holdon.t1), p = camPt(cE, [EAS1[0], EAS1[1] - 560 * EAS1[2]]), tm = s.t0 + 1.2;
  const pipFace = t >= tm - .05 ? bd("pip", LCW.x + LCW.w / 2 - 200, LCW.y + LCW.h / 2 + 470 * .42 + (1 - eo((t - tm) / .45)) * 350, 470, t, { in: tm, poses: [[tm, "oops"], [LT("k1104") + .2, "sit"]], peek: true, tag: false, shadow: false, flip: true, nohop: true }) : "";
  return lookCloser(t, s, { tz: s.t0, fx: p[0], fy: p[1], art: youngArt, bgc: "#FFF8EA", set: (tt) => holdWorld(tt, cE), verdict: [`ONE SAME, ONE DIFFERENT`, GOODC], tv: MK("v_young"), peekH: 470, over: () => pipFace }); };
SC.mark2 = (t, s) => markScene(t, s, { id: "k1107", sayId: "k1106", who: "momo", n: "2 of 2", text: "When we compare, we can use observable characteristics to identify similarities and differences between the life cycles of the animals.", keys: ["compare", "observable", "characteristics", "similarities", "differences"], size: 54, y: 225, footer: FOOT,
  under: TF(1560, 905, .62 * spring(t, s.t0 + .4, .5), compareFrame(t, { id: "m2", same: CHIPS_SAME, diff: CHIPS_DIFF, words: true })) });

/* 11 · score hand, the cicada (lizReveal: the score hand melts into the void deck, ONE push-in onto the cicada on the leg of the LIFE CYCLE DAY
   board's easel: the REVEAL spot, never the intro trunk); Basil's fun fact: three stages like a grasshopper (ff_three), a nymph underground
   among tree roots (ff_under), seventeen years (ff_17). Pip points at the cicada as it is ringed; Momo surprised on "seventeen" */
SC.final = (t, s) => { const L = "k1201"; return finalScene(t, s, L, 0, [[s.t0, null, 1], [W(L, "two") - .1, null, 2]]); };
SC.liz = (t, s) => { const L = "k1202", tq = W(L, "it") - .1, c = CICAT.liz, tc = W(L, "cicada"), t17 = W("k1203b", "seventeen") - .1;
  return lizReveal(t, s, L, VDK(t, { cicAt: c, front: dcards(t) }), c[0], c[1], tq, "It was on the leg of our board's easel!", -120, 160, 80, 3.0, { from: () => SC.final(SCN.final.t1 - .04, SCN.final), qx: 1000, qy: 700, tx: 960, ty: 985, tell: "k1204",
    fact: { id: "k1203b", at: [1270, 400], w: 900, h: 440, items: [["ff_three", "three stages, like a grasshopper", ffThree18], ["ff_under", "a nymph underground", ffUnder18], ["ff_17", "seventeen years!", ff17_18]], cols: ["#2FA35A", "#9A5A2A", "#E8A23A"], sx: 1300, sy: 860, poses: [[MK("ff_in") - .4, "sit"]] } })
    + bd("pip", 170, 1076, 330, t, { in: s.t0 + .6, poses: [[s.t0 + .6, "sit"], [tc + .1, "pointing"], [LT("k1203b") - .3, "sit"]] })
    + bd("momo", 390, 1076, 330, t, { in: s.t0 + .7, poses: [[s.t0 + .7, "sit"], [t17, "surprised"], [t17 + 2.2, "sit"]] }) + smallPrint(t, s.t0 + .5, LOOK_RULE); };

/* 12 · the cliffhanger: the garden's edge by the void deck: EP16's brown hen sits on her straw nest under a low bush (hen: she turns her head);
   she shifts and three pale eggs show under her (nest); a ? pops. Basil big at the left looks at her and asks; Momo and Pip at the right watch
   the nest (front views turned towards it: Pip has no back-view painting, so no back views here). One push from Basil to the nest */
const camCliff = (t) => { const s = SCN.cliff, u = eio((t - s.t0) / 3); return [lerp(1.2, 1.32, u), lerp(640, 720, u), lerp(1000, 1100, u)]; };
SC.cliff = (t, s) => { const tP = W("k1302", "part") - .1, tN = MK("nest"), lift = ss(tN, tN + .6, t) * .6, pk = .3 * Math.max(0, Math.sin((t - MK("hen")) * 3)) * (t > MK("hen") && t < tN ? 1 : 0), cam = camCliff(t), q = camPt(cam, [NEST18[0], NEST18[1] - 300]);
  return VGE(t, { beeAt: false, lift, peck: pk }, cam) + qMark(t, tN + .2, q[0] + 40, q[1] - 40)
    + bd("basil", 300, 1076, 480, t, { in: s.t0 + .1, poses: [[s.t0, "sit"], [LE("k1301b") + .1, "thinking"]], look: 4 })
    + bd("momo", 1480, 1076, 440, t, { in: s.t0 + .15, flip: true, poses: [[s.t0, "sit"]], look: -6, jump: [[LT("k1302") + .2, 20]] })
    + bd("pip", 1760, 1070, 440, t, { in: s.t0 + .2, flip: true, poses: [[s.t0, "sit"]], look: -6, jump: [[LT("k1302") + .35, 20]] })
    + smallPrint(t, MK("hen"), HEN_RULE) + (t >= tP ? slamFit(330, "PART 2", P.sun, slamK(t - tP, 0)) : "") + melt(t, s, "kwrecap", .4) + HUD(t); };
/* 13 · "Now you know!": the COMPARE FRAME (both strips filled), centred between the buddies */
SC.nyk = (t, s) => nykScene(t, s, TF(960, 640, .82, compareFrame(t, { id: "nk", same: CHIPS_SAME, diff: CHIPS_DIFF, words: true, dots: [0, 0] })), { bx: [230, 1720, 1420], hx: 470 });
})(); }
