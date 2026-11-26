// p1.js: PART 1, "Is a Caterpillar a NYMPH? The Butterfly's Secret Stage": EP16's dare answered (no, not a nymph), a worm? (the caterpillar's
// legs: six legs and PROLEGS), be a butterfly egg, the LARVA, HOLD ON! (the pupa is just resting? no: PUPA), inside the pupa (the butterfly
// comes out), OUR BUTTERFLY'S LIFE CYCLE (four stages), the moth, the cliffhanger (something wriggling in a pail of rainwater).
// Segments 1-15 of ../p3_ep17_script.md section 4 (version 1, 23 Nov 2026).
// STAGE 2 (drawn 2026-11-23): one real place, EP15 / EP16's community garden (sets17.js VL: the lime-plant side at dawn, then morning; VCR:
// the far corner by the tap for the cliffhanger), with small life always moving (the caterpillar munching, leaves swaying, a bulbul, a bee,
// dew); the buddies stand IN the scene, big, with a contact shadow; the camera drifts or pushes in and never cuts inside a place. Every pose
// has its reason (SCENES_TODO.md); every action is drawn AT its mark (the sound keys on them).
if (PART === 1) { (() => {
const L1 = "a501";
// the scores (script section 3): Round 1 1 : 1 (Pip and Momo right: the Buddies score too), HOLD ON! 2 : 1
SCORE.push([MK("coin1") - .1, 1, 1]);
SCORE.push([W("a1003", "one") - .1, 2, 1]);
const FOOT = "P3 · Life Cycles of Animals · Four-stage life cycles";
const bd = (who, x, y, h, t, o = {}) => buddy(who, x, y, h, t, o);
// the picture of the scene before melts away over the new one (no hard cut from a card screen into a place)
const melt = (t, s, name, d = .4) => meltScene(t, s, name, d);   // lib.js (teacher, 25 Nov 2026): the old frame melts, its buddies glide or pop out, never fade
const qMark = (t, t0, x, y, r = 50) => t < t0 ? "" : TF(x, y, spring(t, t0, .5) * (1 + .05 * Math.sin(t * 4)), `<g filter="url(#dropS)"><circle r="${r}" fill="url(#gSun)"/></g>${T(0, r * .52, "?", r * 1.56, P.ink)}`);
const slamFit = (y, txt, col, k) => slamLine(y, txt, Math.min(170, 170 * 1720 / tw(txt, 170, 700, "Fredoka", 4)), col, k);
const bitesAt = (t) => t < MK("munch") ? 0 : Math.min(3, (t - MK("munch")) * .5);

/* 1 · the cold open, SPEAKING from 0.825 s (SERIES_FORMAT 11 item 1; EP22's approach): the lime plant at dawn while Heart says "Last time, we
   asked: A caterpillar! One day, it will become a butterfly." The place card from 0.2 s (about 5.4 s on screen). ONE slow push towards the
   caterpillar over the whole scene; it munches the leaf edge (munch: bites appear); the tiny
   pale egg on a young leaf's tip; EP16's two dare cards slide in low along the pot (cardsIn); the buddies pop in (budsIn): Pip on the path,
   leaning in to the caterpillar; Basil on the path behind; Momo at the right, waving hello. The moth on the void deck's pillar (before the game) */
const CBX = [930, 1390], CBY = 930;
const cards2 = (t, id, t0, k = .42) => [0, 1].map((i) => { if (t0 === undefined) return TF(CBX[i], CBY, k, dareCard3(i, t, { id: id + i })); const tt = t0 + i * .3; if (t < tt) return ""; const [x, d] = slideX(t, tt, .7, 2400, CBX[i], CBY + 70); return d + TF(x, CBY, k, dareCard3(i, t, { id: id + i })); }).join("");
const camCold = (t) => [1.2 + .25 * eio(t / SCN.cold.t1), 1280, 560];
const catLive = (t) => ({ o: { chew: true }, k: .6 });
const budsCold = (t, tp, o = {}) => bd("basil", 650, 1006, 400, t, { in: tp, poses: [[tp, "sit"]], look: 3, jump: o.jb || [] })
  + bd("momo", 1730, 1066, 460, t, { in: tp + .2, flip: true, poses: o.momo || [[tp + .2, "waving"], [tp + 2.2, "sit"]], wave: true })
  + bd("pip", 300, 1076, 500, t, { in: tp + .35, poses: [[tp, "sit"]], look: 5, jump: o.jp || [] });
SC.cold = (t, s) => { const tp = MK("budsIn");
  return VL(t, { dawn: 1 - .4 * ss(0, 6, t), cat: catLive(t), bites: bitesAt(t) }, camCold(t)) + cards2(t, "c", MK("cardsIn")) + budsCold(t, tp)
    + OP(ramp(t, .2, .4), lowerPill(60, 96, "A community garden, Singapore ·", "dawn")); };

/* popfix 2 (teacher, 25 Nov 2026: "pet buddies popping out and gone ... starting pet buddies scene"): the cold open's buddies pop in on
   the three wired pop sounds (budsIn) only about 2 s before the melt into "Last time". The sound stays; the picture changes: the buddies
   no longer pop out at the melt. They stay, opaque and on top, while the place melts away, and pop out in turn (the order they came, the
   usual .2 s shrink) 2.65 s after each arrived, a moment into "Last time" (never on screen under 2.5 s; never faded: SERIES_FORMAT 6) */
const coldHold = (t, s, d = .5) => { if (_BCAP) return ""; const a = 1 - clamp((t - s.t0) / d), F = meltFrame("cold"); let r = a > .01 ? OP(a, F.svg) : "";
  for (const [who, c] of Object.entries(F.bud)) { const to = c.o.in !== undefined ? c.o.in + 2.65 : s.t0, k = t < to ? 1 : 1 - eo((t - to) / .2); if (k >= .02) r += buddy0(who, c.x, c.y, c.h, t, { ...c.o, k: (c.o.k || 1) * k }); }
  return r; };
/* 2 · "Last time...": EP16's dare, word for word. ONE calm picture: EP16's two dare cards side by side, a gentle push-in, the big ?; each card
   steps forward and lights while Heart says it (>= 2.5 s each) */
SC.lasttime = (t, s) => { const L = "a203", tc = [W(L, "one"), W(L, "two")], z = 1 + .04 * eio((t - s.t0) / 8), k = ramp(t, s.t0 + .05, .5), cur = tc.filter((x) => t >= x - .15).length - 1;
  let cards = ""; [0, 1].forEach((i) => { const fw = cur === i ? ss(tc[i] - .15, tc[i] + .25, t) : (cur > i ? 1 - ss(tc[i + 1] - .15, tc[i + 1] + .25, t) : 0);
    cards += TF(700 + i * 520, 560 + 14 * (1 - spring(t, s.t0 + .2 + i * .15, .45)), 1.15 * (1 + .1 * fw), dareCard3(i, t, { id: "lt" + i, pulse: cur === i ? .9 : pulse(t, tc[i], .04, .9) })); });
  return bg("stage2") + OP(ramp(t, s.t0, .3), T(960, 110, "Last time…", 60, "#fff", { w: 600 }))
    + OP(k, `<g transform="translate(960 540) scale(${n2(z)}) translate(-960 -540)">${cards}</g>` + qMark(t, W("a202", "is") - .1, 960, 250)
      + TF(960, 1000, spring(t, W("a202", "is") - .1, .4), tpill(0, 0, DARE_LABEL, 44, P.sun, P.ink, { w: 700 }))) + coldHold(t, s, .5) + HUD(t); };
/* back at the lime plant: the camera drifts on along the pot (it carries on under the title and into the game: no cut). Pip keeps his answer
   to himself (a small hop: an acted moment, no pose); the caterpillar takes another bite */
const camBack = (t) => { const u = clamp((t - SCN.back.t0) / (SCN.title.t1 - SCN.back.t0)); return [1.45 - .15 * eio(u), lerp(1280, 1180, eio(u)), lerp(560, 540, eio(u))]; };
const backWorld = (t) => VL(t, { dawn: .5, cat: catLive(t), bites: bitesAt(t) }, camBack(t)) + cards2(t, "bk") + budsCold(t, SCN.back.t0 - 3, { momo: [[0, "sit"]], jp: [[LT("a204") + .3, 26]], jb: [[LT("a204") + .5, 18]] });
SC.back = (t, s) => backWorld(t) + (t >= LT("a204") - .1 ? TF(1000, 300, spring(t, LT("a204") - .1, .4), tpill(0, 0, "Hold on to your answer!", 56, P.sun, P.ink, { w: 700 })) : "") + melt(t, s, "lasttime", .5) + HUD(t);
// the title slam over the dimmed lime plant: IS IT A NYMPH? (white) then THE CATERPILLAR'S SECRET (sun yellow)
const TITLE = (k1, k2) => slamFit(400, "IS IT A NYMPH?", "#fff", k1) + slamFit(610, "THE CATERPILLAR'S SECRET", P.sun, k2);
SC.title = (t, s) => { const u = t - MK("title"), dim = clamp(u / .2); return backWorld(t) + `<rect width="1920" height="1080" fill="${P.night}" opacity="${n2(.78 * dim)}"/>` + TITLE(slamK(u, .05), slamK(u, .55)) + HUD(t); };

/* 3 · the game, and the hidden moth: ONE smooth push-in from the (dimmed) garden straight onto the moth on the void deck's pillar (the INTRO
   spot, never used again). It twitches its feathery feelers and shuffles its wings on its name */
SC.game = (t, s) => { const cE = camBack(SCN.title.t1), a = MOTHAT.game, tM = W("a301a", "moth"), op = ss(tM, tM + .3, t) * (1 - ss(tM + .8, tM + 1.2, t));
  return gameScene(t, s, ["a301a", "a301b", "a301r"], false, { world: (tt) => VL(tt, { dawn: .5, cat: catLive(tt), bites: 3, mothAt: a, mothOpen: op }) + cards2(tt, "gm"), A: [a[0], a[1]], T: [700, 430], Z: 3.4, dim0: .78, pre: () => TITLE(1, 1) }); };
SC.goals = (t, s) => goals3(t, s, [["The 4-stage life cycle", ""], ["Larva and pupa", ""], ["What prolegs are", ""]], ["a401", "a402", "a403", "a404"], "pip");

/* 5 · Round 1: EP16's dare (a short 3 s ring). EP16's two cards as the ONE set of numbered picture cards; the clue labels long, soft body ·
   chews leaves ON TOP of the ring; in the ring the green caterpillar, big, munching its lime leaf. Basil leads (thinking, then worried) */
SC.r1 = (t, s) => lockN(t, { cards: DARE_CARDS, clues: DARE_CLUES.map((c, i) => [c, W(L1, "caterpillar") + .15 * i]), lead: "basil", csize: 40, q: DARE_LABEL, tq: W(L1, "is") - .1,
  tc: [W(L1, "caterpillar"), W(L1, "nymph")], ring0: MK("ring0_r1"), dur: 3, lock: "a502", pics: [0, 1].map((i) => darePic(i, t)), obj: ringCat,
  picks: [{ who: "basil", id: "a503", word: "1" }, { who: "pip", id: "a504", word: "2" }, { who: "momo", id: "a505", word: "2" }],
  react: [[LE("a503") + .1, "basil", "pointing"], [LE("a503") + 2.4, "basil", "sit"], [LE("a504") + .1, "pip", "pointing"], [LE("a504") + 2.4, "pip", "sit"], [LE("a505") + .1, "momo", "pointing"], [LE("a505") + 2.2, "momo", "sit"]] });

/* 6 · the answer is two: no, not a nymph. The real caterpillar and, beside it, a picture card of the lime butterfly it will become (pair), a big
   orange ≠ between them; EP16's two cards small along the top: card 2 the green tick at ansglow, x chips on card 1 and by Basil; the coin (two
   of three were right: the Buddies score too). Pip and Momo confident, Basil shy (OUTCOMES). The moth on the bench's backrest */
const camAns = (t) => { const e = eio((t - MK("ansglow") + .2) / 1.6); return [1.1 + .35 * e, lerp(1140, 1240, e), lerp(560, 500, e)]; };
const bflyCard = (t, k) => k < .02 ? "" : TF(0, 0, k, `<g filter="url(#drop)"><rect x="-150" y="-130" width="300" height="260" rx="22" fill="url(#gPaper)" stroke="#E3C9A8" stroke-width="6"/></g><rect x="-136" y="-116" width="272" height="190" rx="16" fill="#DCEFFB"/>` + TF(0, -20, .5, bfly17(t, { flap: .2 + .2 * Math.sin(t * 2.4) })) + T(0, 112, "the butterfly", 34, P.ink));
SC.answer1 = (t, s) => { const tA = MK("ansglow"), tP = MK("pair"), [px, d] = t >= tP ? slideX(t, tP, .7, 2200, 1020, 620) : [2400, ""];
  const items = `<path d="M${LT_CAT[0] - 120} ${LT_CAT[1] + 8} Q${LT_CAT[0]} ${LT_CAT[1] - 6} ${LT_CAT[0] + 130} ${LT_CAT[1]}" stroke="#7A5230" stroke-width="12" fill="none" stroke-linecap="round"/>`;
  return VL(t, { cat: catLive(t), bites: 3, over: (t >= tP ? d + TF(px, 440, 1, bflyCard(t, 1)) + signDisc(t, tP + .5, 1135, 470, "≠", .8) : "") + TF(LT_CAT[0] - 70, LT_CAT[1] + 110, spring(t, tP + .3, .4), tpill(0, 0, "the caterpillar", 30, "#fff", P.ink, { w: 700 })) }, camAns(t))
    + [0, 1].map((i) => TF(1300 + i * 260, 200, .44 * spring(t, s.t0 + .2 + i * .08, .4), dareCard3(i, t, { id: "an" + i, lit: i === 1 && t >= tA ? spring(t, tA, .45) : 0 }))).join("") + xChip16(t, tA + .2, 1380, 130)
    + coin(t, MK("coin1") - .1, 1560, 430, "+1", "if you showed two fingers")
    + bd("basil", 620, 1010, 390, t, { in: s.t0 + .1, poses: [[s.t0, "sit"]] }) + (t > s.t0 + .3 ? pickNum("basil", 760, 820, t, s.t0 + .3, "1") : "") + xChip16(t, tA + .4, 800, 760, .7)
    + bd("pip", 300, 1076, 510, t, { in: s.t0 + .1, poses: [[s.t0, "sit"]] }) + (t > s.t0 + .3 ? pickNum("pip", 500, 790, t, s.t0 + .3, "2") : "") + tickChip16(t, tA + .3, 540, 720, .7)
    + bd("momo", 1700, 1076, 500, t, { in: s.t0 + .15, flip: true, poses: [[s.t0, "sit"]], jump: [[tA + .05, 26]] }) + (t > s.t0 + .35 ? pickNum("momo", 1870, 800, t, s.t0 + .35, "2") : "") + tickChip16(t, tA + .35, 1890, 730, .7)
    + melt(t, s, "r1", .45) + HUD(t); };

/* 7 · a worm? Close on the lime plant: the caterpillar crawls along its twig (a ripple of its body). Momo asks (then thinking: a real question);
   her idea as HER thought bubble (a pink earthworm with a ?); it pops away as the look-closer opens. The moth under a lime leaf at the top */
const camLime = (t) => { const s = SCN.lime; return [1.45 + .08 * eio((t - s.t0) / 5), 1290, 470]; };
const catCrawl = (t) => ({ o: { walk: true, chew: false }, k: .75, x: LT_CAT[0] - 20 + 10 * Math.sin(t * .5) });
SC.lime = (t, s) => VL(t, { cat: catCrawl(t), bites: 3 }, camLime(t))
  + bd("momo", 300, 1076, 520, t, { in: s.t0 + .05, poses: [[s.t0, "sit"], [LE("a701m") + .1, "thinking"]], look: 4 })
  + bd("basil", 1680, 1076, 500, t, { in: s.t0 + .1, flip: true, poses: [[s.t0, "sit"]], look: -3 })
  + ideaBubble16(t, W("a701m", "worm") - .2, s.t1 + .4, 760, 300, wormIdea(t), P.momo, -1, "ibw") + melt(t, s, "answer1", .45) + HUD(t);
/* [LOOK CLOSER] the caterpillar's legs (lc17.js legsArt; PROLEGS pops, lib.js o.at); the book's strip on the six legs (Heart reads it). Faces:
   the speaker (auto, left: Pip, then Basil); Momo at the right until her worm guess is answered (thinking, then oops: OUTCOMES at a703p) */
SC.lclegs = (t, s) => { window._BUBAT = { '*': [620, 300] }; const c = camLime(SCN.lime.t1), p = camPt(c, [LT_CAT[0], LT_CAT[1] - 30]), tm = s.t0 + 2.3, tmo = LT("a703p") + 3.6;
  const moFace = t >= tm - .05 && t < tmo + .3 ? bd("momo", LCW.x + LCW.w / 2 - 200, LCW.y + LCW.h / 2 + 470 * .42 + (1 - eo((t - tm) / .45)) * 350, 470, t, { in: tm, out: tmo, poses: [[tm, "thinking"]], peek: true, tag: false, shadow: false, flip: true, nohop: true }) : "";
  return lookCloser(t, s, { tz: s.t0, fx: p[0], fy: p[1], art: legsArt, bgc: "#E6F5DA", set: (tt) => VL(tt, { cat: catCrawl(tt), bites: 3, mothAt: false }, c), verdict: [`AN INSECT, NOT A WORM`, GOODC], tv: MK("v_legs"), peekH: 470,
    peekEv: [[MK("v_legs") + .2, "basil", "sit"]],
    over: (tt) => moFace + lcStrip(tt, "a704", "Like all insects, caterpillars have six legs.", { t1: LT("a705") - .2 }) + smallPrint(tt, s.t0 + 1.0, CAT_RULE) }); };
SC.mark1 = (t, s) => markScene(t, s, { id: "a708", sayId: "a707", who: "basil", n: "1 of 2", text: "Prolegs are false legs that help the caterpillars to move.", keys: ["prolegs", "false", "legs", "move"], size: 66, y: 240, footer: FOOT,
  under: TF(1240, 1000, .95 * spring(t, s.t0 + .4, .5), `<path d="M-520 22 Q0 -6 520 18" stroke="#7A5230" stroke-width="30" fill="none" stroke-linecap="round"/>` + TF(0, 6, 1.2, cat17(t, { pro: [1, 1, 1, 1, 1], walk: true, hook: true, chew: false })) + TF(-120, -150, 1, tpill(0, 0, "prolegs", 38, PROLEGC, "#fff", { w: 700 }))) });

/* 8 · Be a butterfly egg! The pill; the buddies wave the viewer off (goodbye); ONE glide in to the young leaf's tip with the egg (a soft green
   wipe); the journey (lc17.js bflyJourney; the buddies ride along, shrunk, on the next lime leaf); one pull back out. The moth on the fence post */
const camGlide = (dive, e) => { const m = Math.max(e * .4, dive); return [1.05 + .3 * e + 5 * dive, lerp(1100, LT_EGG[0] - 82, m), lerp(560, LT_EGG[1] - 26, m)]; };
SC.waitw = (t, s) => { /* teacher, 25 Nov 2026: the buddies pop out in turn as the camera dives (never fade with it) */ const L = "a801", dive = ei((t - (s.t1 - 1.5)) / 1.5), e = eio((t - s.t0) / 1.2), tP = W(L, "be") - .15;
  return VL(t, { cat: catLive(t), bites: 3, eggK: 1.2 }, camGlide(dive, e)) + OP(1 - dive * 1.7, bd("momo", 300, 1076, 460, t, { in: s.t0 + .1, out: s.t1 - 1.5, poses: [[s.t0, "sit"], [tP + .2, "waving"]], wave: true }) + bd("pip", 620, 1066, 440, t, { in: s.t0 + .15, out: s.t1 - 1.34, poses: [[s.t0, "sit"], [tP + .5, "waving"]], wave: true })
      + bd("basil", 1690, 1076, 460, t, { in: s.t0 + .1, out: s.t1 - 1.42, flip: true, poses: [[s.t0, "sit"], [tP + .35, "waving"]], wave: true })
      + (t >= tP ? TF(960, 250, spring(t, tP, .45), tpill(0, 0, "Be a butterfly egg!", 76, P.sun, P.ink, { w: 700 })) : "") + HUD(t)) + wipe(t, s.t1, "#86C64A", 960, 540); };
const riderLeaf = (t, x, k, fl) => TF(x, 1110 + 6 * Math.sin(t * 1.3 + x), k * (fl ? -1 : 1), `<path d="M-320 40 Q-160 -60 80 -50 Q260 -30 300 30 Q140 90 -320 40z" fill="#58B56C" stroke="#2F7A45" stroke-width="6"/><path d="M-300 36 Q0 0 290 28" stroke="#2F7A45" stroke-width="4" fill="none" opacity=".6"/>`, 0, k);
SC.shrink = (t, s) => { const m = MK;
  const rp = { momo: [[m("jhatch") + .2, "surprised"], [m("jhatch") + 2.2, "sit"]], basil: [[m("jegg") + 1, "sit"]], pip: [[m("jhang") + .3, "thinking"], [m("jhang") + 2.6, "sit"], [m("jpupa") + .1, "surprised"], [m("jpupa") + 1.9, "sit"]] };
  return bflyJourney(t, s) + riderLeaf(t, 330, 1.1, 0) + riderLeaf(t, 1650, .95, 1)
    + riders(t, s, { tin: m("jegg") + .6, h: 200, at: { pip: [230, 1060], basil: [1680, 1066], momo: [440, 1056] }, poses: rp })
    + youTag(t, m("jegg"), "You: a butterfly egg") + feelTag(t, m("jhatch") + .4, m("jtight") - .1, "a caterpillar", 160) + feelTag(t, m("jtight"), m("jbig") - .1, "too tight!", 160) + feelTag(t, m("jbig") + .2, m("jhang") - .2, "you moult a few times", 160) + feelTag(t, m("jpupa"), m("jpupa") + 3, "a pupa", 160)
    + speeded(t, m("jhatch"), m("jpupa") + 1.2, 1700, 140); };
SC.pullout = (t, s) => { const u = 1 - eo((t - s.t0) / .6); return VL(t, { cat: false, pupa: { o: { stem: false } }, bites: 3 }, [1.1 + 2.6 * u, LT_PUPA[0], LT_PUPA[1] - 60]) + bd("momo", 290, 1076, 520, t, { in: s.t0 + .2 }) + bd("basil", 1500, 1046, 390, t, { in: s.t0 + .25, flip: true }) + bd("pip", 1800, 1052, 390, t, { in: s.t0 + .3, flip: true }) + wipe(t, s.t0, "#FFFFFF") + HUD(t); };

/* 9 · LARVA: the lime plant, the pupa hanging from its stem (left); the larva card at the right with three plain label lines (lc17.js larvaCard);
   LARVA pops (lib.js o.at); Momo cheers as it lands (a key word learnt), then teaches it, pointing at the card; the book's strip. The moth on
   the watering can by the pot */
const camLarva = (t) => { const e = eio((t - MK("kw_larva") + .4) / 1.4); return [1.1 + .06 * e, 1100, 600]; };
SC.larva = (t, s) => { const k = spring(t, MK("kw_larva") - .2, .5);
  return VL(t, { cat: false, pupa: { o: { stem: false } }, bites: 3 }, camLarva(t)) + `<rect width="1920" height="1080" fill="${P.night}" opacity="${n2(.18 * k)}"/>` + larvaCard(t, k)
    + bd("momo", 290, 1076, 520, t, { in: s.t0 + .05, poses: [[s.t0, "sit"], [MK("kw_larva") - .1, "cheer"], [MK("kw_larva") + 2.1, "sit"], [LE("a902m") + .1, "pointing"], [LE("a902m") + 2.4, "sit"]], look: 3 })
    + bd("basil", 1500, 1046, 390, t, { in: s.t0 + .1, flip: true, poses: [[s.t0, "sit"]] }) + bd("pip", 1800, 1052, 390, t, { in: s.t0 + .15, flip: true, poses: [[s.t0, "sit"]] })
    + lcStrip(t, "a903", "The larva eats a lot and moults many times as it grows.") + melt(t, s, "pullout", .3) + HUD(t); };

/* 10 · HOLD ON! Pip's own board on a low easel by the pot (art17.js restBoard: the pupa with a sleepy zzz, JUST RESTING!), pupastill. Pip big at
   the left reads it, pointing; the HOLD ON! stamp; the countdown takes the stage (the blue game stage, the ring big and central with his
   board's pupa in it, the clue labels does not move · does not eat ON TOP of the ring, YOU cross your arms; only Pip at the side, worried).
   After the bell: Pip shy, Basil and Momo confident (OUTCOMES); the zzz pops away and a small glow appears inside the pupa drawing; Basil's
   fix (pointing at the glow); PUPA pops (Basil cheers: a key word learnt). The moth on top of the easel's frame (not in the ring) */
const EASEL = [700, 1066, .82], RG = [960, 420], RR = 215;
window.SHELF_AWAY = (t) => { if (PART !== 1) return 0; const a = W("a1002", "cross") - .3, b = LE("a1003") + .4; return ss(a, a + .35, t) * (1 - ss(b, b + .35, t)); };
SC.holdon = (t, s) => { window._BUBAT = { basil: [1330, 250], pip: [430, 250] }; const b = "a1002", c = "a1003", d = "a1004b", r0 = MK("ring0_hold"), bell = MK("bell_hold"), rs = ringState(t, r0, 5), tX = W(b, "cross") - .15, tH = W(b, "hold") - .1, tOne = W(c, "one") - .1, inT = t >= r0 && t < bell;
  const st = ss(tX - .1, tX + .4, t) * (1 - ss(LE(c) + .1, LE(c) + .6, t)), ring = st > .01, zz = 1 - ss(bell + .4, bell + .9, t), gl = ss(W(d, "inside") - .2, W(d, "inside") + .6, t), tp = MK("pupastill");
  const eA = eio((t - tp + .3) / 1.4), eB = eio((t - LT(d) + .3) / 1.2), cam = [1.02 + .2 * eA - .14 * eB, lerp(1000, 900, eA), lerp(600, 560, eA)];
  const brd = t >= tp - .3 ? TF(EASEL[0], EASEL[1] + 40 * (1 - spring(t, tp - .3, .45)), EASEL[2], restBoard(t, { zzz: zz, glow: gl })) : "";
  const moth = !ring ? mothAt(t, EASEL[0] + 200 * EASEL[2], EASEL[1] - 868 * EASEL[2], .28, { tw: 1 }) : "";
  const room = VL(t, { cat: false, pupa: { o: { stem: false } }, bites: 3, mothAt: false, can: false, over: brd + moth }, cam) + `<rect width="1920" height="1080" fill="${P.night}" opacity=".08"/>`;
  const inner = `<circle cx="${RG[0]}" cy="${RG[1]}" r="${RR - 24}" fill="#FFFDF6"/>` + T(RG[0], RG[1] - 110, "JUST RESTING!", 34, P.pip) + TF(RG[0] - 12, RG[1] + 120, .55, pupa17(t, { id: "rg" })) + [0, 1, 2].map((i) => T(RG[0] + 70 + 22 * i, RG[1] - 40 - 30 * i, "z", 34 + 8 * i, P.pip)).join("");
  const labels = [["does not move", 410, 250, -1], ["does not eat", 1510, 250, 1]].map(([l, x, y, sd], i) => { const t0 = tX + .2 + i * .15; return t < t0 ? "" : pline(x - sd * 190, y + 40, RG[0] + sd * RR * .8, RG[1] - RR * .6, ramp(t, t0, .2)) + clue3(x, y, l, spring(t, t0, .4), 54, 520); }).join("");
  const bob = inT ? 16 * Math.sin((t - r0) * Math.PI * 2) : 6 * Math.sin(t * 3);
  return room + (ring ? OP(st, bg("stage")) : "")
    + (ring ? OP(st, TF(RG[0], RG[1], spring(t, tX, .45) * (1 + .035 * (inT ? rs.tick : 0)), `<g transform="translate(${-RG[0]} ${-RG[1]})">${ringTimer(RG[0], RG[1], t < r0 ? 1 : t < bell ? rs.frac : 0, t < r0 ? 5 : t < bell ? rs.secs : 0, t, { R: RR, sw: 34, tick: rs.tick, shut: pulse(t, bell, .01, .6), chg: inT || (t >= bell && t < bell + .5) ? (t >= bell ? bell : rs.chg) : -9, ns: 1.25, inner })}</g>`)
      + labels + TF(1700, 640 + bob, .9 * spring(t, tX + .1, .4), `<g filter="url(#dropS)">${crossedArms()}</g>`) + youPill(1700, 470 + bob * .6, 1.2) + TF(1700, 860, spring(t, tX + .2, .4), tpill(0, 0, "cross your arms", 38, P.ink, "#fff", { w: 700 }))) : "")
    + bd("basil", 1720, 1076, 510, t, { in: LT(c) + .3, flip: true, poses: [[LT(c) + .3, "sit"], [LE(d) + .05, "pointing"], [MK("kw_pupa") - .3, "sit"], [MK("kw_pupa") - .1, "cheer"], [MK("kw_pupa") + 2.1, "sit"]], look: -3 })
    + bd("momo", 1330, 1030, 370, t, { in: LT(c) + .45, flip: true, poses: [[LT(c) + .45, "sit"]] })
    + bd("pip", 300, 1076, 510, t, { in: s.t0 + .1, rock: inT ? 2.2 : 0, look: inT ? 6 : 0, poses: [[s.t0, "sit"], [LE("a1001p") + .1, "pointing"], [tX - .5, "thinking"], [r0 - .2, "worried"], [bell + .35, "sit"]], jump: [[bell + .02, 30]], nohop: true })
    + stamp(t, tH, 960, 560, "HOLD ON!") + bellIcon(t, r0) + coin(t, tOne, 1420, 470, "+1", "arms crossed") + melt(t, s, "larva", .4) + HUD(t); };

/* 11 · [LOOK CLOSER] inside the pupa (lc17.js pupaArt): the window, the shapes forming, the case darkening, the butterfly coming out, flying
   off. The book's strip (one sentence at a time). Faces: the speaker (auto, left: Momo, then Basil); Pip at the right first (thinking: his own
   question, is anything happening in there?); Momo surprised as the case splits */
SC.lcpupa = (t, s) => { window._BUBAT = { '*': [620, 300] }; const c = [1.08, 900, 560], p = camPt(c, [LT_PUPA[0], LT_PUPA[1] - 60]), tm = s.t0 + 2.3, tpo = LT("a1103m") - .4;
  const pipFace = t >= tm - .05 && t < tpo + .3 ? bd("pip", LCW.x + LCW.w / 2 - 200, LCW.y + LCW.h / 2 + 470 * .42 + (1 - eo((t - tm) / .45)) * 350, 470, t, { in: tm, out: tpo, poses: [[tm, "thinking"], [LT("a1102"), "sit"]], peek: true, tag: false, shadow: false, flip: true, nohop: true }) : "";
  return lookCloser(t, s, { tz: s.t0, fx: p[0], fy: p[1], art: pupaArt, bgc: "#EAF6E2", set: (tt) => VL(tt, { cat: false, pupa: { o: { stem: false } }, bites: 3, mothAt: false, can: false, over: TF(EASEL[0], EASEL[1], EASEL[2], restBoard(tt, { zzz: 0, glow: 1 })) }, c), verdict: [`THE PUPA IS BUSY CHANGING`, GOODC], tv: MK("v_pupa"), peekH: 470,
    peekEv: [[MK("split") + .1, "momo", "surprised"], [MK("split") + 2, "momo", "sit"]],
    over: (tt) => pipFace + lcStrips(tt, "a1102", "It does not eat. It continues to develop into an adult in the pupal case.", { t1: LE("a1102") + 1.6 }) }); };

/* 12 · the board OUR BUTTERFLY'S LIFE CYCLE at its HOME (centre-right beside the lime plant's pot, about 55% of the frame high): the tiles land
   (ltegg, ltlarva, ltpupa, ltadult), the last arrow lights from the butterfly back to the egg (ltback) and the arrows run round. Basil points
   at the tiles as they land; the book's 5.8 on a cream strip (one sentence at a time). The moth on the board stand's leg */
const BHOME = [1400, 1070, .66];
const lifeBoard = (t, k = BHOME[2], o = {}) => TF(BHOME[0], BHOME[1], k, loop4(t, { tiles: [MK("ltegg") + .3, MK("ltlarva"), MK("ltpupa"), MK("ltadult")], back: MK("ltback"), ...o }));
SC.ring = (t, s) => { const e = eio((t - s.t0 - .3) / 1.6) * (1 - eio((t - MK("ltback") - .2) / 1.4));
  return VL(t, { cat: false, pupa: { o: { stem: false } }, bites: 3, can: false, over: lifeBoard(t) + mothAt(t, BHOME[0] - 420 * BHOME[2], BHOME[1] - 840 * BHOME[2], .26, { rot: -30 }) }, [1.02 + .16 * e, lerp(1000, 1400, e), lerp(600, 560, e)]) + `<rect width="1920" height="1080" fill="${P.night}" opacity=".08"/>`
    + bd("basil", 320, 1076, 500, t, { in: s.t0 + .05, poses: [[s.t0 + .3, "pointing"]], look: 3 }) + bd("momo", 780, 1026, 370, t, { in: s.t0 + .1, poses: [[s.t0, "sit"]] }) + bd("pip", 1870, 1040, 360, t, { in: s.t0 + .15, flip: true, poses: [[s.t0, "sit"]] })
    + lcStrips(t, "a1201", "The butterfly has four stages in its life cycle. The stages are the egg, the larva, the pupa and the adult.") + melt(t, s, "lcpupa", .35) + HUD(t); };
SC.mark2 = (t, s) => markScene(t, s, { id: "a1203", sayId: "a1202", who: "momo", n: "2 of 2", text: "Some animals have four stages in their life cycles. The young of these animals do not look like the adult.", keys: ["four", "stages", "young", "not", "look", "like", "adult"], size: 56, y: 225, footer: FOOT,
  under: TF(1200, 1070, .4 * spring(t, s.t0 + .4, .5), loop4(t, { tiles: [0, 0, 0, 0], back: 0, id: "m2", labels: false })) });

/* 13 · score hand, the moth (lizReveal: the score hand melts into the garden, ONE push-in onto the moth on the side of the lime plant's pot: the
   REVEAL spot, never the intro pillar), Pip's fun-fact panel (a silk cocoon with a pupa inside; silk), the read-along */
SC.final = (t, s) => { const L = "a1301"; return finalScene(t, s, L, 1, [[s.t0, null, 1], [W(L, "two") - .1, null, 2]]); };
SC.liz = (t, s) => { const L = "a1302", tq = W(L, "it") - .1, a = MOTHAT.liz, tm = W(L, "moth");
  return lizReveal(t, s, L, VL(t, { cat: false, pupa: { o: { stem: false } }, bites: 3, mothAt: a, mothOpen: ss(tm + .2, tm + .6, t) * (1 - ss(tm + 1.2, tm + 1.6, t)) }), a[0], a[1], tq, "It was on the side of the lime plant's pot!", -120, 160, 80, 3.2, { from: () => SC.final(SCN.final.t1 - .04, SCN.final), qx: 780, qy: 690, tx: 760, ty: 975, tell: "a1304",
    fact: { id: "a1303", at: [1300, 395], w: 880, h: 460, items: [["ff_cocoon", "a silk cocoon", ffCocoon], ["ff_silk", "silk", ffSilk]], cols: ["#5B6BD6", "#E36A12"], sx: 1300, sy: 905, poses: [[MK("ff_in") - .4, "sit"]] } })
    + bd("basil", 180, 1076, 340, t, { in: s.t0 + 2.4, poses: [[s.t0 + .6, "sit"], [tm + .1, "pointing"], [LT("a1303") - .3, "sit"], [LT("a1304"), "waving"]], wave: true }) + smallPrint(t, s.t0 + .5, MOTH_RULE); };

/* 14 · the cliffhanger: the garden's far corner by the tap (VCR): an old pail of rainwater, flat and still, a few leaves floating; a drop falls
   (pail: rings); tiny thin dark things wriggle down and up in it (wrig), a ?; the camera pushes from Basil to the still surface; PART 2 */
const camCliff = (t) => { const s = SCN.cliff, u = eio((t - MK("pail") + .4) / 2.4); return [1.2 + .55 * u, lerp(760, PAILC[0] + 40, u), lerp(760, PAILC[1] - PAILH, u)]; };
SC.cliff = (t, s) => { const tP = W("a1402", "part") - .1, tw_ = MK("wrig"), pp = camPt(camCliff(t), [PAILC[0], PAILC[1] - PAILH]);
  return VCR(t, { dflyAt: false, rings: [[MK("pail"), 30], [MK("pail") + 2.8, -50]], wrig: t >= tw_ - .2 ? 2 : 0 }, camCliff(t)) + qMark(t, tw_ + .3, pp[0] + 200, pp[1] - 170)
    + (t >= MK("pail") ? OP(1 - ramp(t, tw_ + 1.2, .3), pline(pp[0] + 260, pp[1] + 260, pp[0] + 120, pp[1] + 60, ramp(t, MK("pail"), .2)) + TF(pp[0] + 300, pp[1] + 290, spring(t, MK("pail"), .4), tpill(0, 0, "an old pail of rainwater", 40, "#fff", P.ink, { w: 700 }))) : "")
    + bd("basil", 330, 1076, 520, t, { in: s.t0 + .1, poses: [[s.t0, "sit"], [LE("a1401b") + .1, "thinking"]], look: 7 })
    + bd("momo", 1520, 1056, 420, t, { in: s.t0 + .15, flip: true, poses: [[s.t0, "sit"]], look: -6, jump: [[LT("a1402") + .1, 18]] }) + bd("pip", 1780, 1066, 440, t, { in: s.t0 + .2, flip: true, poses: [[s.t0, "sit"]], look: -5, jump: [[LT("a1402") + .2, 18]] })
    + smallPrint(t, MK("pail"), PAIL_RULE) + (t >= tP ? slamFit(330, "PART 2", P.sun, slamK(t - tP, 0)) : "") + melt(t, s, "kwrecap", .4) + HUD(t); };
/* 15 · "Now you know!": the butterfly loop board at its home, between the buddies */
SC.nyk = (t, s) => nykScene(t, s, TF(960, 1066, .58, loop4(t, { tiles: [0, 0, 0, 0], back: 0, id: "nk" })), { bx: [250, 1720, 1460], hx: 470 });
})(); }
