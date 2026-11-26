// p2.js: PART 2, "What's WRIGGLING in This Pail of Rainwater?": the wrigglers (Round 1: what comes next? a pupa), the wrigglers up close
// (WRIGGLER), be a mosquito egg, the answer (four stages), the Showdown (Basil's homework: not all mosquitoes spread dengue; DENGUE), the
// flower-pot plate in the HDB corridor (STAGNANT WATER; tip it out), the chant, the dragonfly, the dare into EP18 (a frog and a mosquito:
// the same life cycle?). Segments 1-14 of ../p3_ep17_script.md section 5 (version 1, 23 Nov 2026).
// STAGE 2 (drawn 2026-11-23): the garden's far corner by the tap after rain (sets17.js VCR: the old pail of rainwater, the tap, the plate, the
// bamboo stakes), an HDB corridor of the same block (VH) and the void deck (VD), with life always moving (drips, rings on the water, a bird,
// a fan, a pigeon); the buddies stand IN the scene, big; the look-closers, the journey, Basil's homework and the boards are in lc17.js /
// art17.js. Every pose has its reason (SCENES_TODO.md); every action is drawn AT its mark. Mosquitoes are small, simple and never scary.
if (PART === 2) { (() => {
const L1 = "b401";
// the scores (script section 3): Round 1 1 : 1 (Basil and Pip right: the Buddies score), Showdown 3 : 1 (built on Basil's mistake: no point)
SCORE.push([MK("coin1") - .1, 1, 1]);
SCORE.push([MK("coin2") - .1, 3, 1]);
const FOOT = "P3 · Life Cycles of Animals · Four-stage life cycles";
const R1 = ["An egg", "A pupa", "An adult"], R1P = [0, 2, 3];
const bd = (who, x, y, h, t, o = {}) => buddy(who, x, y, h, t, o);
const melt = (t, s, name, d = .4) => meltScene(t, s, name, d);   // lib.js (teacher, 25 Nov 2026): the old frame melts, its buddies glide or pop out, never fade
const qMark = (t, t0, x, y, r = 50) => t < t0 ? "" : TF(x, y, spring(t, t0, .5) * (1 + .05 * Math.sin(t * 4)), `<g filter="url(#dropS)"><circle r="${r}" fill="url(#gSun)"/></g>${T(0, r * .52, "?", r * 1.56, P.ink)}`);
const r1Pic = (i, t) => TF(0, 0, 1.08, mPic(R1P[i], t));

/* 1 · "Last time...": three pictures from Part 1, one at a time, centred and large, a gentle push-in, one label each (>= 2.5 s each) */
SC.lasttime = (t, s) => { const tb = [s.t0, MK("pic2") - .2, MK("pic3") - .2], i = t >= tb[2] ? 2 : t >= tb[1] ? 1 : 0, labs = ["The caterpillar is a larva", "The pupa became a butterfly", "Something wriggling in a pail"], u = t - tb[i], z = 1 + .05 * eio(u / 4), k = ramp(t, tb[i], .5);
  return bg("stage2") + OP(ramp(t, s.t0, .3), T(960, 110, "Last time…", 60, "#fff", { w: 600 }))
    + OP(k, TF(960, 530, z, `<g filter="url(#drop)"><rect x="-536" y="-316" width="1072" height="632" rx="40" fill="url(#gPaper)"/></g><clipPath id="rcp17"><rect x="-520" y="-300" width="1040" height="600" rx="30"/></clipPath><g clip-path="url(#rcp17)">${recapPic17(i, t)}</g>` + (i === 2 ? qMark(t, MK("pic3") + .6, 380, -180, 56) : "")))
    + OP(k, TF(960, 930, spring(t, tb[i] + .1, .4), tpill(0, 0, labs[i], 46, P.sun, P.ink, { w: 700 }))) + HUD(t); };
/* 2 · the garden's far corner after rain (sets17.js VCR): a slow drift along the planter bed to the pail; a last drip falls into the pail (rain:
   a ring spreads). The dragonfly on the tip of a bamboo stake (the INTRO spot) */
const camPlace = (t) => { const u = eio((t - SCN.place.t0) / (SCN.game.t0 - SCN.place.t0 + 1)); return [1.04 + .06 * u, lerp(1100, 960, u), 600]; };
const RAIN = (t) => [[MK("rain"), 20], [MK("rain") + 5.5, -40], [MK("rain") + 9.3, 50]];
SC.place = (t, s) => VCR(t, { rings: RAIN(t) }, camPlace(t)) + OP(ramp(t, s.t0 + .2, .5), lowerPill(60, 96, "A community garden, Singapore ·", "after rain")) + melt(t, s, "lasttime", .5) + HUD(t);
SC.game = (t, s) => { const cE = camPlace(SCN.game.t0), a = DFLYAT.game, tD = W("b201a", "dragonfly");
  return gameScene(t, s, ["b201a", "b201b", "b201c"], false, { world: (tt) => VCR(tt, { rings: RAIN(tt), turn: ss(tD, tD + .5, tt) * (1 - ss(tD + 2, tD + 2.5, tt)) }, cE), A: camPt(cE, [a[0], a[1]]), T: [700, 430], Z: 3.2, dim0: 0 }) + finePrint(t, LT("b201c"), DRAGON_RULE, 1250, 1040); };
SC.goals = (t, s) => goals3(t, s, [["The mosquito's life cycle", ""], ["Mosquitoes and dengue", ""], ["Why we tip out still water", ""]], ["b301", "b302", "b303", "b304"], "basil");

/* 4 · Round 1: what comes after the wriggler? THREE big numbered picture cards (an egg · a pupa, comma-shaped · an adult mosquito, small and
   not scary); the clue labels young mosquitoes · in still water ON TOP of the ring; in the ring the pail's surface with three wrigglers */
SC.r1 = (t, s) => lockN(t, { t0: W(L1, "these") - .35, cards: R1, clues: [["young mosquitoes", W(L1, "young")], ["in still water", W(L1, "young") + .3]], csize: 40, lead: "basil",
  pics: [0, 1, 2].map((i) => r1Pic(i, t)), q: "What comes next?", tq: W(L1, "what") - .1,
  tc: [W(L1, "one", 1), W(L1, "two"), W(L1, "three")], ring0: MK("ring0_r1"), dur: 5, lock: "b402", obj: ringPail,
  picks: [{ who: "momo", id: "b403", word: "3" }, { who: "basil", id: "b404", word: "2" }, { who: "pip", id: "b405", word: "2" }],
  react: [[LE("b403") + .1, "momo", "pointing"], [LE("b403") + 2.2, "momo", "sit"], [LE("b404") + .1, "basil", "pointing"], [LE("b404") + 2.2, "basil", "sit"], [LE("b405") + .1, "pip", "pointing"], [LE("b405") + 2.2, "pip", "sit"]] });

/* 5 · [LOOK CLOSER] the wrigglers (lc17.js wrigArt; WRIGGLER pops, lib.js o.at). Faces: the speaker (auto, left: Pip, then Basil); Momo at the
   right while her pick (straight to the adult) is tested (thinking) */
const camPail = [1.5, PAILC[0] + 40, PAILC[1] - PAILH];
SC.lcwriggler = (t, s) => { window._BUBAT = { '*': [700, 880] }; const p = camPt(camPail, [PAILC[0], PAILC[1] - PAILH]), tm = s.t0 + 2.3, tmo = LT("b502p") + 1.5;
  const moFace = t >= tm - .05 && t < tmo + .3 ? bd("momo", LCW.x + LCW.w / 2 - 200, LCW.y + LCW.h / 2 + 470 * .42 + (1 - eo((t - tm) / .45)) * 350, 470, t, { in: tm, out: tmo, poses: [[tm, "thinking"]], peek: true, tag: false, shadow: false, flip: true, nohop: true }) : "";
  return lookCloser(t, s, { tz: s.t0, fx: p[0], fy: p[1], art: wrigArt, bgc: "#DDF3FF", set: (tt) => VCR(tt, { dflyAt: false, wrig: 1 }, camPail), verdict: [`THE LARVA: A WRIGGLER`, GOODC], tv: MK("v_wriggler"), peekH: 470,
    peekEv: [[LE("b502p") + .1, "pip", "pointing"], [LE("b502p") + 2.2, "pip", "sit"]],
    over: (tt) => moFace + smallPrint(tt, s.t0 + 1.0, PAIL_RULE) }); };

/* 6 · Be a mosquito egg! The pill; the buddies wave the viewer off (goodbye); ONE glide down to the pail's still surface (a soft blue wipe); the
   journey (lc17.js mosqJourney, redrawn 25 Nov: a side view of the pail, the buddies watching from its rim); one pull back out. The dragonfly on the pail's rim */
const camGlide = (dive, e) => { const m = Math.max(e * .4, dive); return [1.05 + .25 * e + 5 * dive, lerp(1000, PAILC[0] + 20, m), lerp(640, PAILC[1] - PAILH, m)]; };
SC.waitw = (t, s) => { /* teacher, 25 Nov 2026: the buddies pop out in turn as the camera dives (never fade with it) */ const L = "b601", dive = ei((t - (s.t1 - 1.5)) / 1.5), e = eio((t - s.t0) / 1.2), tP = W(L, "be") - .15;
  return VCR(t, { wrig: 1 }, camGlide(dive, e)) + OP(1 - dive * 1.7, bd("momo", 1250, 1056, 420, t, { in: s.t0 + .1, out: s.t1 - 1.8,   /* popfix 2: out .3 s sooner, so they are gone 2 s before the shrunken riders pop in */ flip: true, poses: [[s.t0, "sit"], [tP + .2, "waving"]], wave: true }) + bd("pip", 1520, 1066, 440, t, { in: s.t0 + .15, out: s.t1 - 1.68, flip: true, poses: [[s.t0, "sit"], [tP + .5, "waving"]], wave: true })
      + bd("basil", 1780, 1076, 460, t, { in: s.t0 + .1, out: s.t1 - 1.74, flip: true, poses: [[s.t0, "sit"], [tP + .35, "waving"]], wave: true })
      + (t >= tP ? TF(960, 250, spring(t, tP, .45), tpill(0, 0, "Be a mosquito egg!", 76, P.sun, P.ink, { w: 700 })) : "") + HUD(t)) + wipe(t, s.t1, "#7FC6D8", 960, 540); };
SC.shrink = (t, s) => { const m = MK;   // 25 Nov redraw (teacher: "I don't get what this scene is"): a side view of the pail's still water, YOU marked, every stage labelled on the thing, a stage strip; the buddies watch from the rim (lc17.js mosqJourney)
  const rp = { momo: [[m("jhatch") + .2, "surprised"], [m("jhatch") + 2.2, "sit"], [m("jpupa") + .2, "thinking"], [m("jpupa") + 2.4, "sit"], [m("jfly") + .2, "surprised"], [m("jfly") + 2, "sit"]],
    pip: [[W("b603", "moult") + .3, "pointing"], [W("b603", "moult") + 2.2, "sit"], [m("jfly") + .2, "surprised"], [m("jfly") + 2, "sit"]], basil: [[m("jfly") + .2, "surprised"], [m("jfly") + 2, "sit"]] };
  return mosqJourney(t, s, { poses: rp }); };
SC.pullout = (t, s) => { const u = 1 - eo((t - s.t0) / .6); return VCR(t, { wrig: 1, pupae: 1, dflyAt: false }, [1.4 + 2.6 * u, PAILC[0] + 20, PAILC[1] - PAILH]) + bd("basil", 250, 1076, 500, t, { in: s.t0 + .2 }) + bd("pip", 1720, 1076, 510, t, { in: s.t0 + .25, flip: true }) + bd("momo", 1210, 1030, 370, t, { in: s.t0 + .3, flip: true }) + wipe(t, s.t0, "#FFFFFF") + HUD(t); };

/* 7 · the answer is two: the pupa. The pail at its spot, the wrigglers and two comma-shaped pupae at the surface; the three numbered cards small
   along the top, card 2 glows (ansglow), x chips on card 3 and by Momo; the coin (two of three were right: the Buddies also score). Basil and
   Pip confident, Momo shy (OUTCOMES). The dragonfly on the garden tap */
const camAns = (t) => { const e = eio((t - MK("ansglow") + .2) / 1.6); return [1.4 + .2 * e, PAILC[0] + 20, PAILC[1] - PAILH - 20 * e]; };
SC.mosqans = (t, s) => { const tA = MK("ansglow");
  return VCR(t, { wrig: 1, pupae: 1 }, camAns(t)) + R1.map((c, i) => TF(700 + i * 260, 210, .44 * spring(t, s.t0 + .2 + i * .08, .4), choiceCard3(i + 1, c, r1Pic(i, t), { w: 370, h: 330, size: 40, lit: i === 1 && t >= tA ? spring(t, tA, .45) : 0, id: "ma" + i }))).join("") + xChip16(t, tA + .2, 1300, 140)
    + coin(t, MK("coin1") - .1, 960, 470, "+1", "if you showed two fingers")
    + bd("basil", 250, 1076, 500, t, { in: s.t0 + .1, poses: [[s.t0, "sit"]] }) + (t > s.t0 + .3 ? pickNum("basil", 450, 790, t, s.t0 + .3, "2") : "") + tickChip16(t, tA + .3, 540, 720, .7)
    + bd("momo", 1210, 1030, 370, t, { in: s.t0 + .15, flip: true, poses: [[s.t0, "sit"]] }) + (t > s.t0 + .35 ? pickNum("momo", 1050, 830, t, s.t0 + .35, "3") : "") + xChip16(t, tA + .4, 1090, 760, .7)
    + bd("pip", 1720, 1076, 510, t, { in: s.t0 + .1, flip: true, poses: [[s.t0, "sit"]], jump: [[tA + .05, 26]] }) + (t > s.t0 + .3 ? pickNum("pip", 1530, 800, t, s.t0 + .3, "2") : "") + tickChip16(t, tA + .35, 1540, 730, .7)
    + melt(t, s, "pullout", .3) + HUD(t); };
SC.mark1 = (t, s) => markScene(t, s, { id: "b706", sayId: "b705", who: "pip", n: "1 of 2", text: "A life cycle with four stages includes the egg, the larva, the pupa and the adult.", keys: ["four", "stages", "egg", "larva", "pupa", "adult"], size: 60, y: 235, footer: FOOT,
  under: TF(1000, 900, spring(t, s.t0 + .4, .5), TF(-220, 0, .62, miniLoop4(t, bPic, "m1b", [0, 0, 0, 0], 64)) + TF(220, 0, .62, miniLoop4(t, mPic, "m1m", [0, 0, 0, 0], 64)) + T(-220, 150, "butterfly", 32, "#fff") + T(220, 150, "mosquito", 32, "#fff")) });

/* 8 · Showdown: Basil's homework on the mosquito (art17.js mosqSheet) on his easel by the bench; the lines light as he reads them (l1..l3); for
   the countdown the garden gives way to the blue game stage: the sheet stays big at the left, the ring at the right with the counting YOU
   hand; Basil fidgets (worried); Pip reveals (talking, then confident), Momo confident, Basil shy (OUTCOMES). The dragonfly on the easel's top
   (not in the countdown) */
const EAS = [860, 1064, 1];
window.SHELF_AWAY = (t) => { if (PART !== 2) return 0; const a = MK("ring0_show") - .6, b = MK("bell_show") + .5; return ss(a, a + .35, t) * (1 - ss(b, b + .35, t)); };
const hwLit = (t) => { const L = "b802b", bell = MK("bell_show"), ls = [MK("l1"), MK("l2"), MK("l3")]; return [0, 1, 2].map((i) => { if (t >= ls[i] - .1 && t < (i < 2 ? ls[i + 1] - .1 : LE(L) + .3)) return 1; if (t >= LT(L) && t < bell) return .4; return 0; }); };
const camShow = [1.03, 900, 640];
SC.show = (t, s) => { window._BUBAT = { basil: [1250, 260], pip: [1560, 300] }; const r0 = MK("ring0_show"), bell = MK("bell_show"), rs = ringState(t, r0, 5), tS = LT("b803") - .08, inT = t >= r0 && t < bell, R = [1500, 420], RR = 200;
  const st = ss(r0 - .6, r0 - .1, t) * (1 - ss(bell + .6, bell + 1.1, t)), bob = inT ? 16 * Math.sin((t - r0) * Math.PI * 2) : 0, nf = inT ? (Math.floor(t - r0) % 3) + 1 : 3, ez = eio((t - LT("b802b") + .4) / 1.2) * (1 - eio((t - r0 + 1) / .8)), ez2 = eio((t - r0 + 1) / .8) * (1 - eio((t - bell - .6) / .8));
  const dfly = st < .05 ? dflyAt(t, EAS[0] + 120 * EAS[2], EAS[1] - 905 * EAS[2], .3) : "";
  return VCR(t, { dflyAt: false }, camShow) + `<rect width="1920" height="1080" fill="${P.night}" opacity=".25"/>` + OP(st, bg("stage"))
    + TF(EAS[0] + 40 * ez - 260 * ez2, EAS[1] + 20 * ez, EAS[2] * (1 + .04 * ez + .04 * ez2), mosqSheet(t, { lit: hwLit(t) })) + dfly
    + (t >= r0 - .6 ? OP(st, TF(R[0], R[1], spring(t, r0 - .6, .45) * (1 + .035 * (inT ? rs.tick : 0)), `<g transform="translate(${-R[0]} ${-R[1]})">${ringTimer(R[0], R[1], t < r0 ? 1 : t < bell ? rs.frac : 0, t < r0 ? 5 : t < bell ? rs.secs : 0, t, { R: RR, sw: 32, tick: rs.tick, shut: pulse(t, bell, .01, .6), chg: inT || (t >= bell && t < bell + .5) ? (t >= bell ? bell : rs.chg) : -9, ns: 1.2,
      inner: `<circle cx="${R[0]}" cy="${R[1]}" r="${RR - 24}" fill="#FFF8EA"/>` + TF(R[0], R[1] + 30 + bob * .3, .75, `<g filter="url(#dropS)">${countHand(nf)}</g>`) })}</g>`) + youPill(R[0] - 230, R[1] - 170, 1.1) + TF(R[0], 760, 1, tpill(0, 0, "line 1, 2 or 3?", 44, P.ink, "#fff", { w: 700 }))) : "")
    + bd("basil", 220, 1076, 500, t, { in: s.t0 + .1, rock: inT ? 2 : 0, poses: [[s.t0, "sit"], [LE("b801") - 1, "pointing"], [LT("b802b") - .2, "sit"], [r0 - .3, "worried"], [bell + .35, "sit"]], jump: [[bell + .02, 26]] })
    + bd("pip", 1500, 1076, 380, t, { in: bell + .3, flip: true, poses: [[bell + .3, "sit"], [LE("b804p") + .1, "arms_crossed"]] }) + (t > bell + .5 ? pickNum("pip", 1330, 900, t, LT("b804p") - .1, "3") : "")
    + bd("momo", 1790, 1076, 380, t, { in: bell + .4, flip: true, poses: [[bell + .4, "sit"]] }) + (t > bell + .6 ? pickNum("momo", 1620, 900, t, LT("b804p") + .2, "3") : "")
    + stamp(t, tS, 960, 460) + bellIcon(t, r0) + HUD(t); };
/* the fix: line 3 struck (strike) and rewritten in green (rewrite: only one of the five mosquitoes keeps a small badge; Basil's mistake is
   fixed: a smile and a nod); the book's strip (Heart reads it, one sentence at a time); DENGUE pops; Momo explains it beside a calm picture (a
   child resting in bed, cared for; only some mosquitoes carry it); the coin +2 (coin2). The dragonfly on the bench's armrest */
/* teacher, 23 Nov 2026 (SERIES_FORMAT: the corrected buddy stays shy, the right ones stay confident, through the whole fix) */ SC.fix = (t, s) => { window._BUBAT = { momo: [1300, 230] }; const st = ss(MK("strike"), MK("strike") + .4, t), fx = ss(MK("rewrite"), MK("rewrite") + .8, t), tm = LT("b807m"), dk = spring(t, tm - .3, .5) * (1 - ss(s.t1 - .4, s.t1, t));
  return VCR(t, {}, camShow) + `<rect width="1920" height="1080" fill="${P.night}" opacity=".25"/>` + TF(EAS[0] - 150, EAS[1] + 70, .9, mosqSheet(t, { strike: st, fix: fx, lit: [0, 0, Math.max(fx * .6, pulse(t, MK("strike"), .05, .8))] }))
    + (dk > .02 ? TF(1300, 560, dk * .95, denguePic(t)) : "") + coin(t, MK("coin2") - .1, 1640, 300, "+2", "line 3")
    + lcStrips(t, "b806", "Most of the mosquitoes do not spread diseases, but some do. For example, Aedes albopictus and Aedes aegypti spread dengue.", { t1: LE("b806") + 1.2 })
    + bd("basil", 220, 1076, 480, t, { in: s.t0 + .05, poses: [[s.t0, "oops"]] })
    + bd("momo", 1760, 1076, 480, t, { flip: true, in: s.t0 + .15, poses: [[s.t0, "arms_crossed"], [LE("b807m") + .1, "pointing"], [LE("b807m") + 2.2, "arms_crossed"]] })
    + bd("pip", 1530, 1040, 370, t, { flip: true, in: s.t0 + .1, poses: [[s.t0, "arms_crossed"]] }) + HUD(t); };

/* 9 · the HDB corridor (sets17.js VH): Momo asks how the life cycle keeps us safe (then thinking); the camera eases to Pip by the potted plants,
   sure of himself (his idea as HIS thought bubble: too little water?); the push into the plate. The dragonfly on the corridor railing */
const camPlate = (t) => { const s = SCN.plate, u = eio((t - LT("b902p") + .4) / 1.4); return [1.02 + .1 * u, lerp(900, 1100, u), 620]; };
SC.plate = (t, s) => VH(t, {}, camPlate(t)) + OP(ramp(t, s.t0 + .2, .5), lowerPill(60, 96, "An HDB corridor, Singapore ·", "late morning"))
  + bd("momo", 300, 1076, 500, t, { in: s.t0 + .05, poses: [[s.t0, "sit"], [LE("b901m") + .1, "thinking"]], look: 3 })
  + bd("basil", 820, 1026, 380, t, { in: s.t0 + .1, poses: [[s.t0, "sit"]] })
  + bd("pip", 1690, 1076, 500, t, { in: s.t0 + .15, flip: true, poses: [[s.t0, "sit"], [LE("b902p") + .1, "pointing"]] })
  + ideaBubble16(t, W("b902p", "surely") - .2, s.t1 + .4, 1100, 300, plateIdea(t), P.pip, 1, "ibp") + melt(t, s, "fix", .45) + HUD(t);
/* [LOOK CLOSER] the flower-pot plate (lc17.js plateArt; STAGNANT WATER pops, lib.js o.at). Faces: the speaker (auto, left: Basil, then Momo);
   Pip at the right while his guess is tested (thinking, then oops at the wrigglers: OUTCOMES) */
SC.lcplate = (t, s) => { window._BUBAT = { '*': [820, 870] }; const c = camPlate(SCN.plate.t1), p = camPt(c, [PLATEH[0], PLATEH[1] - 20]), tm = s.t0 + 2.3, tpo = MK("wrigglers") + 3.6;
  const pipFace = t >= tm - .05 && t < tpo + .3 ? bd("pip", LCW.x + LCW.w / 2 - 200, LCW.y + LCW.h / 2 + 470 * .42 + (1 - eo((t - tm) / .45)) * 350, 470, t, { in: tm, out: tpo, poses: [[tm, "thinking"]], peek: true, tag: false, shadow: false, flip: true, nohop: true }) : "";
  return lookCloser(t, s, { tz: s.t0, fx: p[0], fy: p[1], art: plateArt, bgc: "#F4E9D8", set: (tt) => VH(tt, { dflyAt: false }, c), verdict: [`NO STILL WATER, NO NEW MOSQUITOES`, GOODC], tv: MK("v_plate"), peekH: 470,
    peekEv: [[MK("wrigglers") + .5, "basil", "surprised"], [MK("wrigglers") + 2.4, "basil", "sit"], [W("b907m", "plates") - .1, "momo", "pointing"]],
    over: (tt) => pipFace + smallPrint(tt, s.t0 + 1.0, ADULT_RULE) }); };
SC.mark2 = (t, s) => markScene(t, s, { id: "b909", sayId: "b908", who: "basil", n: "2 of 2", text: "We can reduce the number of mosquitoes breeding by removing their breeding spots in our schools and homes.", keys: ["reduce", "removing", "breeding", "spots", "schools", "homes"], size: 54, y: 225, footer: FOOT,
  under: TF(1240, 930, .8 * spring(t, s.t0 + .4, .5), [0, 1, 2].map((i) => TF(-330 + i * 330, 0, 1, `<g filter="url(#dropS)"><rect x="-150" y="-110" width="300" height="200" rx="20" fill="#FFF8EA" stroke="${P.leaf}" stroke-width="6"/></g><g transform="translate(0 -20)">${[(tt) => `<ellipse cx="0" cy="20" rx="90" ry="22" fill="#C8643E" stroke="#8A3E22" stroke-width="5" transform="rotate(-24)"/><path d="M-80 40 q-20 30 -40 50" stroke="#9FD0DE" stroke-width="10" fill="none" stroke-linecap="round"/>`, () => TF(0, 70, .55, pailOver17()), (tt) => TF(0, 90, .45, vaseArt17(tt))][i](t)}</g>` + TF(0, 70, 1, tpill(0, 0, ["tip out the plates", "turn the pails over", "change the vase water"][i], 26, P.leaf, "#fff", { w: 700 })))).join("")) });

/* 10 · the chant: call and response; the board at the right (the butterfly loop, the mosquito loop and a tipped plate), each line's part flashing */
SC.chant = (t, s) => chantScene(t, s, "c1003", { sayId: "u1002", size: 50, x: 620, y0: 260, dy: 110, xs: [230, 560, 890], bh: 360, tx: 1180, ty: 520, sayX: 620, sayY: 600,
  board: (tt, flash) => TF(1560, 560, .72, chantBoard(tt, flash)) });

/* 11 · score hand, the dragonfly (lizReveal onto the watering can's handle: the REVEAL spot, never the intro stake) and Momo's fun-fact panel */
SC.final = (t, s) => { const L = "b1101"; return finalScene(t, s, L, 1, [[s.t0, null, 1], [W(L, "three") - .1, null, 3]]); };
SC.liz = (t, s) => { const L = "b1102", tq = W(L, "it") - .1, a = DFLYAT.liz, td = W(L, "dragonfly");
  return lizReveal(t, s, L, VCR(t, { dflyAt: a, turn: ss(td, td + .5, t) }), a[0], a[1], tq, "It was on the handle of the watering can!", -120, 160, 80, 3.2, { from: () => SC.final(SCN.final.t1 - .04, SCN.final), qx: 780, qy: 690, tx: 760, ty: 975, tell: "b1104",
    fact: { id: "b1103m", at: [1300, 395], w: 880, h: 460, items: [["ff_nymph", "a dragonfly nymph", ffNymph], ["ff_gobble", "it gobbles up wrigglers", ffGobble]], cols: ["#2E7AB8", "#2FA35A"], sx: 1300, sy: 905, poses: [[MK("ff_in") - .4, "sit"]] } })
    + bd("pip", 180, 1076, 340, t, { in: s.t0 + 2.4, poses: [[s.t0 + .6, "sit"], [td + .1, "pointing"], [LT("b1103m") - .3, "sit"], [LT("b1104"), "waving"]], wave: true }) + smallPrint(t, s.t0 + .5, DRAGON_RULE); };
/* 12 · the dare for Episode 18: the void deck beside the garden (sets17.js VD); the frog's loop (EP16) and the mosquito's loop on two small boards
   on the stone table; ONE set of TWO big numbered picture cards slides in low (1 Yes, the same: =, 2 No, different: ≠); the banner; Momo and
   Pip thinking (a question, no hints), Basil a hopeful smile */
const smallBoard = (inner, title) => `<g filter="url(#dropS)"><rect x="-170" y="-200" width="340" height="300" rx="20" fill="url(#gPaper)" stroke="#C9A974" stroke-width="6"/></g>` + T(0, -160, title, 28, P.ink) + inner + `<path d="M-120 100 l-20 60 M120 100 l20 60" stroke="#8A5A36" stroke-width="10" stroke-linecap="round"/>`;
const DRX = [760, 1180];
SC.dare = (t, s) => { const a = "b1401", tQ = W(a, "same") - .15, tc = [W(a, "one") - .1, W(a, "two") - .1], tL = W(a, "lock") - .1, e = eio((t - MK("dareIn") - .2) / 1.6), cam = [lerp(1.5, 1.04, e), lerp(TABLEV[0], 1000, e), lerp(TABLEV[1] - 120, 620, e)];
  const boards = TF(TABLEV[0] - 175, TABLEV[1] - 160, 1.1, smallBoard(TF(0, -24, .95, miniLoop(t, frogPic, "dfr", null)), "frog")) + TF(TABLEV[0] + 185, TABLEV[1] - 160, 1.1, smallBoard(TF(0, -24, .72, miniLoop4(t, mPic, "dmq", [0, 0, 0, 0], 70)), "mosquito"));
  return VD(t, { items: boards }, cam) + `<rect width="1920" height="1080" fill="${P.night}" opacity="${n2(.28 * e)}"/>`
    + NEXT_CARDS.map((c, i) => { const t0 = MK("dareIn") + .5 + i * .25, pl = Math.max(pulse(t, tc[i], .04, .6), t >= tL ? (Math.floor((t - tL) / .5) % 2 === i ? .8 : 0) : 0); if (t < t0) return ""; const [x, d] = slideX(t, t0, .6, 2400, DRX[i], 1020);
      return d + TF(x, 880, .8, choiceCard3(i + 1, c, twoLoops(t, i ? "≠" : "=", "dr" + i), { w: 400, h: 330, size: 36, pulse: pl, id: "dr" })); }).join("")
    + TF(1000, 150, spring(t, MK("dareIn") + .2, .45), tpill(0, 0, "NEXT · Frog and mosquito: the same life cycle?", 44, P.ink, P.sun, { w: 700 }))
    + (t >= tL ? TF(970, 1010, spring(t, tL, .45), tpill(0, 0, "Lock in your answer!", 44, P.sun, P.ink, { w: 700 })) : "")
    + bd("basil", 260, 1076, 500, t, { in: s.t0 + .1, poses: [[s.t0, "sit"]] })
    + bd("momo", 1540, 1070, 380, t, { flip: true, in: s.t0 + .2, poses: [[s.t0, "sit"], [tQ + .2, "thinking"]] })
    + bd("pip", 1830, 1066, 380, t, { flip: true, in: s.t0 + .3, poses: [[s.t0, "sit"], [tQ + .3, "thinking"]] }) + melt(t, s, "liz", .4) + HUD(t); };
SC.nyk = (t, s) => nykScene(t, s, TF(960, 860, 1, TF(-200, 0, .9, miniLoop4(t, bPic, "nkb", [0, 0, 0, 0], 64)) + TF(200, 0, .9, miniLoop4(t, mPic, "nkm", [0, 0, 0, 0], 64))), { bx: [230, 1720, 1440], hx: 470 });
})(); }
