// p1.js: PART 1, "Fish, Frog or Lizard? What Does a TADPOLE Become?": EP15's dare answered (a frog), where tadpoles come from (frog eggs in
// a jelly-like covering), be a frog egg, the tadpole (does not look like the adult), HOLD ON! (four stages? no: three), the chick (looks like
// the adult), the cliffhanger (an empty grasshopper). Segments 1-14 of ../p3_ep16_script.md (version 1, 23 Nov 2026).
// STAGE 2 (drawn 2026-11-23): every scene is in ONE real place, EP15's community garden (pond16.js: the pond side at dawn after rain, then
// morning; the grassy corner by the void deck), with small life always moving (ripples, tadpoles, drips, a dragonfly, the hen and her chicks,
// a butterfly, a bird); the buddies stand IN the scene, big, with a contact shadow; the camera drifts or pushes in and never cuts inside a
// place. Every pose has its reason (SCENES_TODO.md); every action is drawn AT its mark (the sound keys on them).
if (PART === 1) { (() => {
const L1 = "e501";
// the scores (script section 3): Round 1 1 : 0 (only Momo is right), HOLD ON! 2 : 0
SCORE.push([MK("coin1") - .1, 1, 0]);
SCORE.push([W("e903", "one") - .1, 2, 0]);
const FOOT = "P3 · Life Cycles of Animals · Three-stage life cycles";
const dareBoard = (i, x, y, sc, o = {}) => picBoard(DARE_PICS[i], x, y, 1, { sc, lab: o.lab === false ? undefined : DARE_CARDS[i].toLowerCase(), size: 30, id: "p1d" + i + (o.id || ""), t: o.t || 0 });
const qMark = (t, t0, x, y, r = 50) => t < t0 ? "" : TF(x, y, spring(t, t0, .5) * (1 + .05 * Math.sin(t * 4)), `<g filter="url(#dropS)"><circle r="${r}" fill="url(#gSun)"/></g>${T(0, r * .52, "?", r * 1.56, P.ink)}`);
const slamFit = (y, txt, col, k) => slamLine(y, txt, Math.min(170, 170 * 1720 / tw(txt, 170, 700, "Fredoka", 4)), col, k);

const bd = (who, x, y, h, t, o = {}) => buddy(who, x, y, h, t, o);
// the picture of the scene before melts away over the new one (no hard cut from a card screen into a place)
const melt = (t, s, name, d = .4) => { const a = 1 - clamp((t - s.t0) / d); if (a <= .01) return ""; window._noHud = true; let v = ""; try { v = SC[name](SCN[name].t1 - .04, SCN[name]); } finally { window._noHud = false; } return OP(a, v); };

/* 1 · silent cold open: the garden pond at dawn after rain (pond16.js VP16). ONE slow push towards the egg clump; three tadpoles wriggle past
   it (wriggle); EP15's three dare cards slide in low along the pond's front edge (cardsIn); the buddies pop in (budsIn): Basil on his flat
   stone, nose to the water; Momo on the bench end, thinking (what is in the jelly?); Pip on the grass, waving hello */
const CBX = [770, 960, 1150], CBY = 1050;
const cards3 = (t, id, t0) => [0, 1, 2].map((i) => { if (t0 === undefined) return dareBoard(i, CBX[i], CBY, .4, { lab: false, id }); const tt = t0 + i * .3; if (t < tt) return ""; const [x, d] = slideX(t, tt, .7, 2400, CBX[i], CBY + 4); return d + dareBoard(i, x, CBY, .4, { lab: false, id }); }).join("");
const wriggle = (t) => { const t0 = MK("wriggle"); if (t < t0 - .5) return ""; return [0, 1, 2].map((i) => { const u = clamp((t - t0 - i * .35) / 4.2); return u <= 0 ? "" : `<g opacity=".85">${TF(lerp(620, 1420, u), 790 + 26 * i + 10 * Math.sin(t * 3 + i), .75, tadpole16(t, 0, { ph: i }), 4 * Math.sin(t * 5 + i))}</g>`; }).join(""); };
const camCold = (t) => [1 + .1 * eio(t / 6), 1000, 740];
const budsCold = (t, tp, o = {}) => bd("basil", 1690, 992, 440, t, { in: tp, flip: true, look: -6, poses: [[tp, "sit"]], jump: o.jb || [] })
  + bd("momo", 230, 800, 360, t, { in: tp + .2, poses: [[tp + .2, o.momo || "thinking"]], look: 4 }) + bd("pip", 470, 1072, 440, t, { in: tp + .4, poses: o.pip || [[tp + .4, "waving"], [tp + 2.2, "sit"]], wave: true, jump: o.jp || [] });
SC.cold = (t, s) => { const tp = MK("budsIn");
  return VP16(t, { dawn: 1 - .35 * ss(0, 6, t), tad: 0, items: wriggle(t) }, camCold(t)) + cards3(t, "c", MK("cardsIn")) + budsCold(t, tp)
    + OP(ramp(t, .5, .5), lowerPill(60, 96, "A community garden, Singapore ·", "dawn")); };

/* 2 · "Last time...": EP15's dare, word for word. ONE calm picture: the three dare cards side by side, a gentle push-in, the big ?, the three
   numbered cards; each steps forward and its card lights while Heart says it (>= 2.5 s each). WIRED */
SC.lasttime = (t, s) => { const L = "e203", tc = [W(L, "one"), W(L, "two"), W(L, "three")], z = 1 + .04 * eio((t - s.t0) / 8), k = ramp(t, s.t0 + .05, .5), cur = tc.filter((x) => t >= x - .15).length - 1;
  let boards = ""; [0, 1, 2].forEach((i) => { const fw = cur === i ? ss(tc[i] - .15, tc[i] + .25, t) : (cur > i ? 1 - ss(tc[i + 1] - .15, tc[i + 1] + .25, t) : 0);
    boards += dareBoard(i, 560 + i * 400, 600 + 14 * (1 - spring(t, s.t0 + .2 + i * .15, .45)), .95 * (1 + .1 * fw), { id: "lt", t }); });
  return bg("stage2") + OP(ramp(t, s.t0, .3), T(960, 110, "Last time…", 60, "#fff", { w: 600 }))
    + OP(k, `<g transform="translate(960 540) scale(${n2(z)}) translate(-960 -540)">${boards}</g>`
      + qMark(t, W("e202", "what") - .1, 960, 240)
      + DARE_CARDS.map((c, i) => TF(560 + i * 400, 880, .5 * spring(t, tc[i] - .1, .45), ansCard(i + 1, c, { w: 430, h: 290, size: 50, pulse: cur === i ? .9 : pulse(t, tc[i], .04, .9) }))).join("")
      + TF(960, 1010, spring(t, W("e202", "what") - .1, .4), tpill(0, 0, DARE_LABEL, 40, P.sun, P.ink, { w: 700 }))) + melt(t, s, "cold", .5) + HUD(t); };
/* back at the pond: the camera drifts on along the water (it carries on under the title and into the game: no cut). Pip keeps his answer to
   himself (three fingers hidden behind his back: a small hop) */
const camBack = (t) => { const u = clamp((t - SCN.back.t0) / (SCN.title.t1 - SCN.back.t0)); return [1.08 + .05 * eio(u), lerp(1000, 1120, eio(u)), lerp(740, 700, eio(u))]; };
const backWorld = (t) => VP16(t, { dawn: .55 }, camBack(t)) + cards3(t, "bk") + budsCold(t, SCN.back.t0 - 3, { momo: "sit", pip: [[0, "sit"]], jp: [[LT("e204") + .3, 26]] });
SC.back = (t, s) => backWorld(t) + (t >= LT("e204") - .1 ? TF(1000, 330, spring(t, LT("e204") - .1, .4), tpill(0, 0, "Hold on to your answer!", 56, P.sun, P.ink, { w: 700 })) : "") + melt(t, s, "lasttime", .5) + HUD(t);
// the title slam over the dimmed pond: FISH, FROG OR LIZARD? (white) then WHAT DOES A TADPOLE BECOME? (sun yellow)
const TITLE = (k1, k2) => slamFit(400, "FISH, FROG OR LIZARD?", "#fff", k1) + slamFit(610, "WHAT DOES A TADPOLE BECOME?", P.sun, k2);
SC.title = (t, s) => { const u = t - MK("title"), dim = clamp(u / .2); return backWorld(t) + `<rect width="1920" height="1080" fill="${P.night}" opacity="${n2(.78 * dim)}"/>` + TITLE(slamK(u, .05), slamK(u, .55)) + HUD(t); };

/* 3 · the game, and the hidden tree frog: ONE smooth push-in from the (dimmed) pond straight onto the tree frog on the big leaf over the water
   (common.js gameScene; the INTRO spot, never used again). It lifts one sticky front foot on "sticky toes" */
SC.game = (t, s) => { const cE = camBack(SCN.title.t1), f = FROGAT.game, tS = W("e301b", "sticky") - .1, lift = ss(tS, tS + .4, t) * (1 - ss(tS + 2.2, tS + 2.6, t));
  return gameScene(t, s, ["e301a", "e301b", "e301r"], false, { world: (tt) => VP16(tt, { dawn: .55, lift }, cE) + cards3(tt, "gm"), A: camPt(cE, [f[0] + 4, f[1] - 18]), T: [700, 430], Z: 3.0, dim0: .78, pre: (tt) => TITLE(1, 1) }); };
SC.goals = (t, s) => goals3(t, s, [["The 3-stage life cycle", ""], ["Young that look different", ""], ["Why frog eggs have jelly", ""]], ["e401", "e402", "e403", "e404"], "basil");

/* 5 · Round 1: EP15's dare (a short 3 s ring). EP15's three cards as the ONE set of numbered picture cards; the clue labels lives in water ·
   has a tail ON TOP of the ring; in the ring one big tadpole swims (art16.js ringTad). No x chip yet: the journey decides */
SC.r1card = (t, s) => roundCard(t, s, "ROUND 1", "YOUR ANSWER FROM LAST TIME");
SC.r1 = (t, s) => lockN(t, { cards: DARE_CARDS, clues: DARE_CLUES.map((c, i) => [c, W(L1, "tadpole") + .15 * i]), lead: "momo", csize: 34, q: DARE_LABEL, tq: W(L1, "what") - .1,
  tc: [W(L1, "what"), W(L1, "tadpole"), W(L1, "show")], ring0: MK("ring0_r1"), dur: 3, lock: "e502",
  pics: [0, 1, 2].map((i) => dareBoard(i, 0, 108, .6, { lab: false, id: "r1i" })), obj: ringTad,
  picks: [{ who: "pip", id: "e503", word: "1" }, { who: "basil", id: "e504", word: "3" }, { who: "momo", id: "e505", word: "2" }],
  react: [[LE("e503") + .1, "pip", "pointing"], [LE("e503") + 2.4, "pip", "sit"], [LE("e504") + .1, "basil", "pointing"], [LE("e504") + 2.4, "basil", "sit"], [LE("e505") + .1, "momo", "pointing"], [LE("e505") + 2.4, "momo", "sit"]] });

/* 6 · where do the tadpoles come from? The pond's edge, close (the egg clump between them): Pip asks (then thinking); the camera eases to
   Momo, sure of herself; her idea as HER thought bubble (a mother frog with babies beside her, like kittens: a ?) */
const camPond = (t) => { const s = SCN.pond, u = eio((t - LT("e602m") + .6) / 1.6); return [1.42 + .04 * eio((t - s.t0) / 6), lerp(900, 1060, u), 700]; };
SC.pond = (t, s) => VP16(t, {}, camPond(t)) + bd("pip", 330, 1076, 500, t, { in: s.t0 + .1, poses: [[s.t0, "sit"], [LE("e601p") + .1, "thinking"]], look: 3 })
  + bd("momo", 1620, 1076, 500, t, { in: s.t0 + .25, flip: true, poses: [[s.t0, "sit"]], look: -3 }) + ideaBubble16(t, W("e602m", "mother") - .2, s.t1 + .4, 1000, 300, momIdea(t), P.momo, 1, "ibm") + melt(t, s, "r1", .45) + HUD(t);

/* 7 · [LOOK CLOSER] the frog eggs in their jelly (art16.js eggsArt; JELLY-LIKE COVERING pops, lib.js o.at); the book's strip (Heart reads it).
   Two faces peek in: Basil (the speaker, auto) at the left; Momo at the right until her guess is answered (thinking, then oops: OUTCOMES) */
SC.lceggs = (t, s) => { window._BUBAT = { '*': [620, 300] }; const p = camPt(camPond(SCN.pond.t1), [980, 740]), tm = s.t0 + 1.2, tmo = LT("e605b") + 3.9;
  const momoFace = t >= tm - .05 && t < tmo + .3 ? bd("momo", LCW.x + LCW.w / 2 - 200, LCW.y + LCW.h / 2 + 470 * .42 + (1 - eo((t - tm) / .45)) * 350, 470, t, { in: tm, out: tmo, poses: [[tm, "thinking"]], peek: true, tag: false, shadow: false, flip: true, nohop: true }) : "";
  return lookCloser(t, s, { tz: s.t0, fx: p[0], fy: p[1], art: eggsArt, bgc: "#DDF2E8", set: (tt) => VP16(tt, {}, camPond(SCN.pond.t1)), verdict: [`EGGS KEPT SAFE AND WET`, GOODC], tv: MK("v_eggs"), peekH: 470,
    peekEv: [[LE("e607p") + .1, "pip", "thinking"], [W("e608", "protects") - .1, "pip", "sit"], [MK("v_eggs") + .1, "basil", "cheer"]],
    over: (tt) => momoFace + strip15(tt, "e608", "Frog eggs have a jelly-like covering. The covering protects the eggs from being eaten by other animals. It also keeps the eggs from drying out.", 150, { keys: ["jelly-like", "covering", "protects", "eaten", "drying"], maxW: 1500, size: 46, t1: LE("e608") + .8 }) + finePrint(tt, s.t0 + 1.0, EGG_RULE, 1480, 1044) }); };

/* 8 · Be a frog egg! The pill; the buddies wave the viewer off; ONE glide down to the water and under the surface (a soft blue-green wipe);
   the journey (art16.js eggJourney; the buddies ride along, shrunk, on a sunken leaf, then on the lily pad); one pull back out */
const camDive = (dive, e) => { const m = Math.max(e * .4, dive); return [1 + .25 * e + 5 * dive, lerp(1000, 980, m), lerp(720, 760, m)]; };
SC.waitw = (t, s) => { const L = "e701", dive = ei((t - (s.t1 - 1.5)) / 1.5), e = eio((t - s.t0) / 1.2), tP = W(L, "be") - .15;
  return VP16(t, {}, camDive(dive, e)) + OP(1 - dive * 1.7, bd("momo", 300, 1076, 440, t, { in: s.t0 + .1, poses: [[s.t0, "sit"], [tP + .2, "waving"]], wave: true }) + bd("pip", 620, 1072, 440, t, { in: s.t0 + .15, poses: [[s.t0, "sit"], [tP + .5, "waving"]], wave: true })
      + bd("basil", 1690, 1076, 440, t, { in: s.t0 + .1, flip: true, poses: [[s.t0, "sit"], [tP + .35, "waving"]], wave: true })
      + (t >= tP ? TF(960, 250, spring(t, tP, .45), tpill(0, 0, "Be a frog egg!", 76, P.sun, P.ink, { w: 700 })) : "") + HUD(t)) + wipe(t, s.t1, "#5FA79A", 960, 540); };
const sunkLeaf = (t, x, y, k, fl) => TF(x, y + 6 * Math.sin(t * 1.3 + x), k * (fl ? -1 : 1), `<path d="M-230 30 Q-120 -50 60 -40 Q220 -20 250 30 Q120 80 -230 30z" fill="#3E8E4A" stroke="#245E30" stroke-width="6"/><path d="M-220 28 Q0 0 240 28" stroke="#245E30" stroke-width="4" fill="none" opacity=".6"/>`, 0, k);
SC.shrink = (t, s) => { const m = MK, tF = W("e702", "fish"), tP = m("jpad"), leaf = 1 - ss(tP - .3, tP + .4, t);
  const rp = { pip: [[m("jhatch") + .1, "surprised"], [m("jhatch") + 2.2, "sit"], [m("jfrog") + .1, "cheer"]], momo: [[tF + .9, "surprised"], [tF + 3, "sit"], [m("jfrog") + .2, "cheer"]], basil: [[m("jhatch") + .2, "surprised"], [m("jtadpole") + .3, "pointing"], [m("jback") - .4, "sit"], [m("jback") + .3, "pointing"], [m("jfront") + 1.6, "sit"], [m("jfrog") + .15, "cheer"]] };
  return eggJourney(t, s) + OP(leaf, sunkLeaf(t, 330, 1060, 1.1, 0) + sunkLeaf(t, 1680, 1066, .9, 1))
    + riders(t, s, { tin: m("jegg") + .6, h: 200, at: { pip: [210, 1040], basil: [1690, 1046], momo: [420, 1036] }, poses: rp })
    + youTag(t, m("jegg"), "You: a frog egg") + feelTag(t, m("jtadpole"), m("jback") - .1, "a tadpole", 160) + feelTag(t, m("jback") + .2, m("jtail") - .1, "back legs, then front legs", 160) + feelTag(t, m("jfrog"), m("jfrog") + 3, "a frog", 160)
    + speeded(t, m("jhatch"), m("jfrog") + 1.2, 1700, 140); };
SC.pullout = (t, s) => { const u = 1 - eo((t - s.t0) / .6); return VP16(t, { frog: { x: 1380, y: 780, k: .7 } }, [1 + 2.4 * u, 1380, 760]) + bd("momo", 380, 1076, 540, t, { in: s.t0 + .2 }) + bd("basil", 1500, 1052, 380, t, { in: s.t0 + .25, flip: true }) + bd("pip", 1760, 1048, 380, t, { in: s.t0 + .3, flip: true }) + wipe(t, s.t0, "#FFFFFF") + HUD(t); };

/* 9 · the answer is two: a frog. A small pond frog on a lily pad (four legs, webbed back feet, moist skin, no tail); EP15's three cards small
   along the top: card 2 the green tick at ansglow, x chips on cards 1 and 3 and by Pip and Basil; the coin; TADPOLE pops (lib.js o.at); then
   the book's caption on its cream strip beside a big tadpole picture with three label lines (lives in water · a tail · does not look like the
   adult), the frog small beside it. Momo (right) explains; Pip and Basil were wrong (shy). The tree frog on the bench's back rail */
const FROGA = [1380, 780];
const tadCard = (t, k) => { if (k < .01) return ""; const c = `<g filter="url(#drop)"><rect x="-470" y="-250" width="940" height="500" rx="34" fill="url(#gPaper)" stroke="#E3C9A8" stroke-width="7"/></g><rect x="-450" y="-230" width="560" height="460" rx="24" fill="#8FD3E0"/>${uwRays(t, "#fff", .0)}`
    + TF(-120, -10, 3.2, tadpole16(t, 0)) + `<rect x="150" y="-230" width="300" height="460" rx="24" fill="#DFF3D2"/>` + TF(300, 120, .9, frog16(t)) + TF(300, 170, 1, tpill(0, 0, "the adult", 30, "#fff", P.ink, { w: 700 }))
    + lcLab(t, LT("e805") - .1, -250, -170, "lives in water", -280, -100, { size: 38 }) + lcLab(t, W("e805", "tail") - .1, -360, 120, "a tail", -300, 0, { size: 38 }) + lcLab(t, W("e805", "does") - .1, -110, 196, "does not look like the adult", -40, 50, { size: 32, fill: "#FFE2C0", ink: "#B4531A" });
  return TF(1000, 570, k * .84, c); };
SC.frogans = (t, s) => { const tA = MK("ansglow"), tK = MK("kw_tadpole"), e = eio((t - tA + .4) / 1.4) * (1 - eio((t - LT("e805") + .8) / 1.2)), cam = [1.05 + .3 * e, lerp(1000, FROGA[0], e), lerp(700, FROGA[1] - 40, e)], tc = ss(LT("e805") - .6, LT("e805") - .1, t);
  return VP16(t, { frog: { x: FROGA[0], y: FROGA[1], k: .7, hop: hop(t, W("e803m", "hops"), .4) }, frogAt: [70, 712, .4, 0, 0] }, cam) + `<rect width="1920" height="1080" fill="${P.night}" opacity="${n2(.35 * tc)}"/>`
    + OP(1 - tc, [0, 1, 2].map((i) => dareBoard(i, 760 + i * 200, 250, .32, { lab: false, id: "fa" }) + (i === 1 ? tickChip16(t, tA, 760 + i * 200 + 60, 120) : xChip16(t, tA + .15 * i, 760 + i * 200 + 60, 120, .8))).join(""))
    + coin(t, MK("coin1") - .1, 1420, 470, "+1", "if you showed two fingers") + tadCard(t, spring(t, LT("e805") - .5, .5) * (1 - ss(s.t1 - .3, s.t1, t)))
    + strip15(t, "e805", "It lives in water. It has a tail and does not look like the adult.", 150, { keys: ["water", "tail", "adult"], maxW: 1500, size: 48 })
    + bd("momo", 380, 1076, 540, t, { in: s.t0 + .1, poses: [[s.t0, "sit"], [LE("e803m") + .1, "pointing"], [LE("e803m") + 2.2, "sit"], [tK - .3, "cheer"]], achieved: false })
    + bd("basil", 1560, 1052, 380, t, { in: s.t0 + .15, flip: true, poses: [[s.t0, "sit"], [LT("e805") - .2, "thinking"]] }) + (t > s.t0 + .35 ? pickNum("basil", 1410, 830, t, s.t0 + .35, "3") : "") + xChip16(t, tA + .4, 1450, 760, .7)
    + bd("pip", 1800, 1048, 380, t, { in: s.t0 + .2, flip: true, poses: [[s.t0, "sit"]] }) + (t > s.t0 + .4 ? pickNum("pip", 1650, 830, t, s.t0 + .4, "1") : "") + xChip16(t, tA + .5, 1690, 760, .7)
    + (t > s.t0 + .3 ? pickNum("momo", 560, 790, t, s.t0 + .3, "2") : "") + tickChip16(t, tA + .3, 600, 720, .7) + melt(t, s, "pullout", .3) + HUD(t); };

/* 10 · HOLD ON! Pip's board of four on his low easel by the pond (art16.js fourBoard). Pip big at the left reads it, pointing; the HOLD ON!
   stamp; the countdown takes the stage (the blue game stage, the ring big and central with his row in it, the clue labels a tadpole with legs ·
   4 stages? ON TOP of the ring, YOU cross your arms; only Pip at the side, worried). After the bell: Basil fixes it (the bracket: the young),
   the row slides round into a loop (tegg; Pip's mistake is fixed: cheer). The tree frog on top of the easel's frame (not in the ring) */
const EASEL = [1000, 1070, .82], RG = [960, 420], RR = 215;
window.SHELF_AWAY = (t) => { if (PART !== 1) return 0; const a = W("e902", "cross") - .3, b = LE("e903") + .4; return ss(a, a + .35, t) * (1 - ss(b, b + .35, t)); };
const holdLit = (t) => { const L = "e901p", ws = [W(L, "egg"), W(L, "tadpole"), W(L, "tadpole", 1), W(L, "frog")]; return ws.map((w, i) => pulse(t, w, .05, .7) * (t < LE(L) + .3 ? 1 : 0)); };
SC.holdon = (t, s) => { window._BUBAT = { basil: [1330, 250], pip: [700, 300] }; const b = "e902", c = "e903", d = "e904b", r0 = MK("ring0_hold"), bell = MK("bell_hold"), rs = ringState(t, r0, 5), tX = W(b, "cross") - .15, tH = W(b, "hold") - .1, tOne = W(c, "one") - .1, inT = t >= r0 && t < bell;
  const st = ss(tX - .1, tX + .4, t) * (1 - ss(LE(c) + .1, LE(c) + .6, t)), ring = st > .01, br = ss(MK("bracket"), MK("bracket") + 1, t), lp = ss(MK("tegg") - .4, MK("tegg") + .8, t);
  const eA = eio((t - MK("board") + .6) / 1.4), eB = eio((t - LT(d) + .3) / 1.2), cam = [1.02 + .2 * eA - .1 * eB, lerp(1000, 1120, eA), lerp(620, 560, eA)];
  const fr = t < r0 - 1 || t > bell + 1 ? treeFrogAt(t, EASEL[0] - 330 * EASEL[2], EASEL[1] - 790 * EASEL[2], .34) : "";
  const room = VP16(t, { frogAt: false, items: TF(EASEL[0], EASEL[1], EASEL[2], fourBoard(t, { lit: holdLit(t), bracket: br, loop: lp })) + fr }, cam) + `<rect width="1920" height="1080" fill="${P.night}" opacity=".1"/>`;
  const inner = `<circle cx="${RG[0]}" cy="${RG[1]}" r="${RR - 24}" fill="#FFFDF6"/>` + T(RG[0], RG[1] - 96, "4 STAGES!", 40, P.pip) + [0, 1, 2, 3].map((i) => TF(RG[0] - 126 + i * 84, RG[1] + 10, .36, tile16(ROWP(i, t), 104, "hr" + i, P.leaf)) + TF(RG[0] - 150 + i * 84, RG[1] - 34, .9, `<circle r="18" fill="${P.pip}"/>${T(0, 8, String(i + 1), 24, "#fff")}`)).join("");
  const labels = [["a tadpole with legs", 420, 250, -1], ["4 stages?", 1500, 250, 1]].map(([l, x, y, sd], i) => { const t0 = tX + .2 + i * .15; return t < t0 ? "" : pline(x - sd * 190, y + 40, RG[0] + sd * RR * .8, RG[1] - RR * .6, ramp(t, t0, .2)) + clue3(x, y, l, spring(t, t0, .4), 54, 520); }).join("");
  const bob = inT ? 16 * Math.sin((t - r0) * Math.PI * 2) : 6 * Math.sin(t * 3);
  return room + (ring ? OP(st, bg("stage")) : "")
    + (ring ? OP(st, TF(RG[0], RG[1], spring(t, tX, .45) * (1 + .035 * (inT ? rs.tick : 0)), `<g transform="translate(${-RG[0]} ${-RG[1]})">${ringTimer(RG[0], RG[1], t < r0 ? 1 : t < bell ? rs.frac : 0, t < r0 ? 5 : t < bell ? rs.secs : 0, t, { R: RR, sw: 34, tick: rs.tick, shut: pulse(t, bell, .01, .6), chg: inT || (t >= bell && t < bell + .5) ? (t >= bell ? bell : rs.chg) : -9, ns: 1.25, inner })}</g>`)
      + labels + TF(1700, 640 + bob, .9 * spring(t, tX + .1, .4), `<g filter="url(#dropS)">${crossedArms()}</g>`) + youPill(1700, 470 + bob * .6, 1.2) + TF(1700, 860, spring(t, tX + .2, .4), tpill(0, 0, "cross your arms", 38, P.ink, "#fff", { w: 700 }))) : "")
    + bd("basil", 1740, 1076, 520, t, { in: LT(c) + .3, flip: true, poses: [[LT(c) + .3, "sit"], [LE(d) + .1, "pointing"]], look: -3 })
    + bd("momo", 1500, 1046, 380, t, { in: LT(c) + .45, flip: true, poses: [[LT(c) + .45, "sit"]] })
    + bd("pip", 320, 1076, 520, t, { in: s.t0 + .1, rock: inT ? 2.2 : 0, look: inT ? 6 : 0, poses: [[s.t0, "sit"], [LE("e901p") + .1, "pointing"], [tX - .3, "sit"], [r0 - .2, "worried"], [bell + .35, "sit"], [MK("tegg") + .1, "cheer"], [MK("tegg") + 2.2, "sit"]], achieved: t >= MK("tegg"), jump: [[bell + .02, 30]], nohop: true })
    + stamp(t, tH, 960, 560, "HOLD ON!") + bellIcon(t, r0) + coin(t, tOne, 1420, 470, "+1", "arms crossed") + melt(t, s, "frogans", .4) + HUD(t); };
/* 10 · the board OUR FROG'S LIFE CYCLE at its HOME (centre-right by the pond, about 55% of the frame high): the tiles land (tyoung, tadult),
   the last arrow lights from the frog back to the eggs (tback). Basil points at each; Momo cheers as the loop closes. The tree frog on the rim
   of the flower pot by the pond */
const BHOME = [1150, 1072, .78];
const frogBoard = (t, k = BHOME[2], o = {}) => TF(BHOME[0], BHOME[1], k, loopBoard16(t, { tiles: [MK("tegg") + .2, MK("tyoung"), MK("tadult")], back: MK("tback"), ...o }));
SC.ring = (t, s) => VP16(t, {}, [1.04 + .02 * eio((t - s.t0) / 3), 1000, 640]) + `<rect width="1920" height="1080" fill="${P.night}" opacity=".12"/>` + frogBoard(t)
  + bd("basil", 330, 1076, 520, t, { in: s.t0 + .05, poses: [[s.t0, "pointing"]], look: 3 }) + bd("momo", 1640, 1052, 350, t, { in: s.t0 + .1, flip: true, poses: [[s.t0, "sit"], [MK("tback") + .1, "cheer"]] }) + bd("pip", 1810, 1046, 340, t, { in: s.t0 + .15, flip: true, poses: [[s.t0, "sit"]] }) + melt(t, s, "holdon", .35) + HUD(t);
SC.mark1 = (t, s) => markScene(t, s, { id: "e1002", sayId: "e1001", who: "basil", n: "1 of 2", text: "A life cycle with three stages includes the egg, the young and the adult.", keys: ["three", "stages", "egg", "young", "adult"], size: 64, y: 240, footer: FOOT,
  under: TF(1180, 1070, .36 * spring(t, s.t0 + .4, .5), loopBoard16(t, { tiles: [0, 0, 0], back: 0, id: "m1", labels: false })) });

/* 11 · the grassy corner by the void deck: a brown hen walks in from the bushes with four chicks (henIn), all pecking; Pip asks (thinking);
   Momo is surprised (hens near the HDB block!), points; Basil is sure: his idea as two colour swatches with a ? */
const HENS = (t) => { const tI = MK("henIn"), u = eio((t - tI + .6) / 3); return [[lerp(2100, 1000, u), 940, 1.2, 1, 0, 0], [lerp(2300, 1250, u), 975, .85, 1, 1, .3], [lerp(2350, 820, u), 990, .85, 0, 1, .9], [lerp(2420, 1400, u), 1010, .85, 1, 1, 1.5], [lerp(2480, 1120, u), 1030, .85, 0, 1, 2.1]]; };
const camHen = (t) => { const e = eio((t - LT("e1103b") + .4) / 1.4); return [1 + .04 * eio((t - SCN.hen.t0) / 5) + .14 * e, lerp(980, 980, e), lerp(600, 760, e)]; };
SC.hen = (t, s) => VG16(t, { hens: HENS(t), walk: t < MK("henIn") + 2.4, mantisAt: false, items: treeFrogAt(t, 1540, 634, .4) }, camHen(t))
  + bd("pip", 300, 1076, 500, t, { in: s.t0 + .1, poses: [[s.t0, "sit"], [LE("e1101p") + .1, "thinking"]] })
  + bd("momo", 640, 1030, 380, t, { in: s.t0 + .2, poses: [[s.t0, "sit"], [MK("henIn") + .3, "surprised"], [MK("henIn") + 2, "pointing"], [MK("henIn") + 4.2, "sit"]] })
  + bd("basil", 1680, 1076, 520, t, { in: s.t0 + .15, flip: true, poses: [[s.t0, "sit"]] }) + ideaBubble16(t, W("e1103b", "yellow") - .3, s.t1 + .4, 1150, 300, swatchIdea(t), P.basil, 1, "ibs")
  + smallPrint(t, MK("henIn"), HEN_RULE) + melt(t, s, "mark1", .45) + HUD(t);
/* [LOOK CLOSER] the chick beside the hen (art16.js chickArt): the parts on BOTH birds, both peck, CHICK pops; the 2x2. Faces: the speaker
   (auto, left); Basil at the right until his colour rule is answered (thinking, then oops: OUTCOMES at Pip's line) */
SC.lcchick = (t, s) => { window._BUBAT = { '*': [1360, 250] }; const p = camPt(camHen(SCN.hen.t1), [980, 860]), tm = s.t0 + 1.2, tmo = LT("e1105p") + 3.9;
  const basFace = t >= tm - .05 && t < tmo + .3 ? bd("basil", LCW.x + LCW.w / 2 - 200, LCW.y + LCW.h / 2 + 470 * .42 + (1 - eo((t - tm) / .45)) * 350, 470, t, { in: tm, out: tmo, poses: [[tm, "thinking"]], peek: true, tag: false, shadow: false, flip: true, nohop: true }) : "";
  return lookCloser(t, s, { tz: s.t0, fx: p[0], fy: p[1], art: chickArt, bgc: "#FFF3DC", set: (tt) => VG16(tt, { hens: HENS(SCN.hen.t1), mantisAt: false }, camHen(SCN.hen.t1)), verdict: [`LOOKS LIKE THE ADULT`, LIKEC], tv: MK("v_chick"), peekH: 470,
    peekEv: [[MK("kw_chick") + .1, "momo", "cheer"]], over: (tt) => basFace }); };
SC.mark2 = (t, s) => markScene(t, s, { id: "e1202", sayId: "e1201", who: "pip", n: "2 of 2", text: "Some animals have three stages in their life cycles. Some of the young animals look like their parents, while some do not.", keys: ["three", "stages", "look", "like", "parents", "some", "not"], size: 54, y: 225, footer: FOOT,
  under: TF(1200, 935, .82 * spring(t, s.t0 + .4, .5), mini2x2(t)) });

/* 12 · score hand, the tree frog (lizReveal: the score hand melts into the pond, ONE push-in onto the frog on the garden tap (the REVEAL spot,
   never the intro leaf); Momo's fun fact: the foam nest on a leaf over the water (ff_foam), the tadpoles dropping into the pond (ff_drop)) */
SC.final = (t, s) => { const L = "e1301"; return finalScene(t, s, L, 0, [[s.t0, null, 1], [W(L, "two") - .1, null, 2]]); };
SC.liz = (t, s) => { const L = "e1302", tq = W(L, "it") - .1, f = FROGAT.liz, tf = W(L, "frog");
  return lizReveal(t, s, L, VP16(t, { frogAt: f }), f[0] + 4, f[1] - 18, tq, "It was on the garden tap, beside the pond!", -120, 160, 80, 3.0, { from: () => SC.final(SCN.final.t1 - .04, SCN.final), qx: 900, qy: 720, tx: 760, ty: 975, tell: "e1304",
    fact: { id: "e1303", at: [1270, 440], w: 860, h: 460, items: [["ff_foam", "a ball of foam", ffFoam], ["ff_drop", "tadpoles drop in", ffDrop]], cols: ["#5B6BD6", "#2FA35A"], sx: 1300, sy: 860, poses: [[MK("ff_in") - .4, "sit"]] } })
    + bd("basil", 180, 1076, 340, t, { in: s.t0 + .6, poses: [[s.t0 + .6, "sit"], [tf, "surprised"], [tf + 1.6, "pointing"], [LT("e1303") - .3, "sit"], [LT("e1304"), "waving"]], wave: true }) + smallPrint(t, s.t0 + .5, FROG_RULE); };

/* 13 · the cliffhanger: on the grassy edge a little green grasshopper with NO wings hops onto a blade of grass (hop); beside it on another blade,
   a pale, see-through, EMPTY grasshopper (skin), a ? pops; the camera pushes along the grass from one to the other; PART 2 slams in */
const SKINB = { bx: 1060, by: 1010, bh: 330, lean: 14, u: .64, k: .74, rot: -72 }, HOPB = { bx: 820, by: 1000, bh: 290, lean: -12, u: .72, k: .74, rot: -66 };
const hopIn = (t) => { const th = MK("hop"), u = clamp((t - th + .7) / .7), tip = bladeTip(t, HOPB.bx, HOPB.by, HOPB.bh, HOPB.lean, 4, HOPB.u);
  if (u >= 1) return blade(t, HOPB.bx, HOPB.by, HOPB.bh, HOPB.lean, "#7CC85A", 18, 4) + TF(tip[0], tip[1], HOPB.k, hopper16(t, { ph: 1 }), HOPB.rot);
  const x = lerp(1300, tip[0], u), y = lerp(900, tip[1], u) - 220 * Math.sin(Math.PI * u); return blade(t, HOPB.bx, HOPB.by, HOPB.bh, HOPB.lean, "#7CC85A", 18, 4) + TF(x, y, HOPB.k, hopper16(t, { ph: 1 }), lerp(-20, HOPB.rot, u)); };
const camCliff = (t) => { const s = SCN.cliff, u = eio((t - MK("skin") + 1) / 1.6); return [1.5 + .05 * eio((t - s.t0) / 6), lerp(860, 1000, u), 760]; };
SC.cliff = (t, s) => { const tP = W("e1502", "part") - .1, sk = camPt(camCliff(t), bladeTip(t, SKINB.bx, SKINB.by, SKINB.bh, SKINB.lean, 2, SKINB.u));
  return VG16(t, { mantisAt: false, skin: SKINB, items: hopIn(t) }, camCliff(t)) + qMark(t, MK("skin") + .2, sk[0] + 70, sk[1] - 230)
    + bd("momo", 330, 1076, 520, t, { in: s.t0 + .1, poses: [[s.t0, "sit"], [LE("e1501m") + .1, "pointing"]], look: 4 })
    + bd("basil", 1600, 1060, 420, t, { in: s.t0 + .15, flip: true, poses: [[s.t0, "sit"]], look: -5 }) + bd("pip", 1810, 1052, 400, t, { in: s.t0 + .2, flip: true, poses: [[s.t0, "sit"], [MK("skin") + .1, "surprised"], [MK("skin") + 2, "sit"]], jump: [[LT("e1502") + .1, 20]] })
    + (t >= tP ? slamFit(330, "PART 2", P.sun, slamK(t - tP, 0)) : "") + melt(t, s, "kwrecap", .4) + HUD(t); };
/* 14 · "Now you know!": the frog loop board at its home, between the buddies */
SC.nyk = (t, s) => nykScene(t, s, TF(840, 1066, .6, loopBoard16(t, { tiles: [0, 0, 0], back: 0, id: "nk" })), { bx: [230, 1720, 1420], hx: 470 });
})(); }
