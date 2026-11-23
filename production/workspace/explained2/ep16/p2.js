// p2.js: PART 2, "Why Did This Grasshopper Leave Its SKIN Behind?": the young grasshopper (a nymph: looks like the adult, no wings), the empty
// skin and why (a hard outer skin that cannot stretch), be the nymph (moulting from inside), MOULTING, the Showdown (Pip's cockroach homework:
// its young DOES look like the adult; the egg case), the chant, the praying mantis, the dare into EP17 (a caterpillar: is it a nymph?).
// Segments 1-14 of ../p3_ep16_script.md section 5 (version 1, 23 Nov 2026).
// STAGE 2 (drawn 2026-11-23): the garden's grassy corner by the void deck (pond16.js VG16) with life always moving; the buddies stand in the
// grass, big; the look-closers, the journey, Pip's homework, the board of four loops and the mantis are in art16.js. Every pose has its reason
// (SCENES_TODO.md); every action is drawn AT its mark.
if (PART === 2) { (() => {
const L1 = "f401";
// the scores (script section 3): Round 1 1 : 1 (Pip and Momo right: the Buddies score), Showdown 3 : 1 (built on Pip's mistake: no point)
SCORE.push([MK("coin1") - .1, 1, 1]);
SCORE.push([MK("coin2") - .1, 3, 1]);
const FOOT = "P3 · Life Cycles of Animals · Three-stage life cycles";

const bd = (who, x, y, h, t, o = {}) => buddy(who, x, y, h, t, o);
const melt = (t, s, name, d = .4) => { const a = 1 - clamp((t - s.t0) / d); if (a <= .01) return ""; window._noHud = true; let v = ""; try { v = SC[name](SCN[name].t1 - .04, SCN[name]); } finally { window._noHud = false; } return OP(a, v); };
const qMark = (t, t0, x, y, r = 50) => t < t0 ? "" : TF(x, y, spring(t, t0, .5) * (1 + .05 * Math.sin(t * 4)), `<g filter="url(#dropS)"><circle r="${r}" fill="url(#gSun)"/></g>${T(0, r * .52, "?", r * 1.56, P.ink)}`);
const numB = (t, t0, x, y, n, k = 1) => t < t0 ? "" : TF(x, y, spring(t, t0, .45) * k, `<g filter="url(#dropS)"><circle r="46" fill="url(#gSun)" stroke="${P.ink}" stroke-width="6"/></g>${T(0, 22, n, 60, P.ink)}`);

/* 1 · "Last time...": three pictures from Part 1, one at a time, centred and large, a gentle push-in, one label each (>= 2.5 s each) */
SC.lasttime = (t, s) => { const tb = [s.t0, MK("pic2") - .2, MK("pic3") - .2], i = t >= tb[2] ? 2 : t >= tb[1] ? 1 : 0, labs = ["The tadpole grew into a frog", "A chick looks like the adult", "Something strange in the grass"], u = t - tb[i], z = 1 + .05 * eio(u / 4), k = ramp(t, tb[i], .5);
  return bg("stage2") + OP(ramp(t, s.t0, .3), T(960, 110, "Last time…", 60, "#fff", { w: 600 }))
    + OP(k, TF(960, 530, z, `<g filter="url(#drop)"><rect x="-536" y="-316" width="1072" height="632" rx="40" fill="url(#gPaper)"/></g><clipPath id="rcp16"><rect x="-520" y="-300" width="1040" height="600" rx="30"/></clipPath><g clip-path="url(#rcp16)">${recapPic16(i, t)}</g>`))
    + OP(k, TF(960, 930, spring(t, tb[i] + .1, .4), tpill(0, 0, labs[i], 46, P.sun, P.ink, { w: 700 }))) + HUD(t); };
/* 2 · the grassy corner by the void deck, mid-morning (pond16.js VG16): a slow drift along the grass; the little wingless grasshopper hops onto a
   blade (hop); the location pill. The praying mantis on a flower stem in the planter bed (the INTRO spot) */
const HOP2 = { bx: 1360, by: 1010, bh: 300, lean: -12, u: .72, k: .6, rot: -66 };
const hopOn = (t, B, th) => { const u = clamp((t - th + .7) / .7), tip = bladeTip(t, B.bx, B.by, B.bh, B.lean, 4, B.u), bl = blade(t, B.bx, B.by, B.bh, B.lean, "#7CC85A", 18, 4);
  if (u >= 1) return bl + TF(tip[0], tip[1], B.k, hopper16(t, { ph: 1 }), B.rot); const x = lerp(B.bx + 360, tip[0], u), y = lerp(B.by - 60, tip[1], u) - 220 * Math.sin(Math.PI * u); return bl + TF(x, y, B.k, hopper16(t, { ph: 1 }), lerp(-20, B.rot, u)); };
const camPlace = (t) => { const u = eio((t - SCN.place.t0) / (SCN.game.t0 - SCN.place.t0 + 1)); return [1.02 + .06 * u, lerp(1100, 960, u), 600]; };
SC.place = (t, s) => VG16(t, { items: hopOn(t, HOP2, MK("hop")) }, camPlace(t)) + OP(ramp(t, s.t0 + .2, .5), lowerPill(60, 96, "A community garden, Singapore ·", "morning")) + melt(t, s, "lasttime", .5) + HUD(t);
SC.game = (t, s) => { const cE = camPlace(SCN.game.t0), a = MANTISAT.game, tM = W("f201a", "mantis");
  return gameScene(t, s, ["f201a", "f201b", "f201c"], false, { world: (tt) => VG16(tt, { turn: ss(tM, tM + .5, tt) * (1 - ss(tM + 2, tM + 2.5, tt)), items: hopOn(tt, HOP2, MK("hop")) }, cE), A: camPt(cE, [a[0] + 4, a[1] - 60]), T: [700, 430], Z: 2.8, dim0: 0 }) + finePrint(t, LT("f201c"), MANTIS_RULE, 1250, 1040); };
SC.goals = (t, s) => goals3(t, s, [["Young that look alike", ""], ["What moulting is", ""], ["The cockroach's life cycle", ""]], ["f301", "f302", "f303", "f304"], "momo");

/* 4 · Round 1: young or adult? TWO big numbered picture cards (the young: no wings · the adult: long wings folded along its back); the clue
   labels no wings · six legs ON TOP of the ring; in the ring the little wingless grasshopper on its blade of grass */
SC.r1card = (t, s) => roundCard(t, s, "ROUND 1");
SC.r1 = (t, s) => lockN(t, { t0: W(L1, "this") - .35, cards: ["The young", "The adult"], clues: [["no wings", W(L1, "wings")], ["six legs", W(L1, "wings") + .3]], csize: 36, lead: "pip",
  pics: [0, 1].map((i) => hopCard(i, t)), q: "Is it the young or the adult?", tq: W(L1, "is") - .1,
  tc: [W(L1, "one", 1), W(L1, "two")], ring0: MK("ring0_r1"), dur: 5, lock: "f402", obj: ringHop,
  picks: [{ who: "basil", id: "f403", word: "2" }, { who: "pip", id: "f404", word: "1" }, { who: "momo", id: "f405", word: "1" }],
  react: [[LE("f403") + .1, "basil", "pointing"], [LE("f403") + 2.2, "basil", "sit"], [LE("f404") + .1, "pip", "pointing"], [LE("f404") + 2.2, "pip", "sit"], [LE("f405") + .1, "momo", "pointing"]] });

/* 5 · [LOOK CLOSER] the little grasshopper beside an adult (art16.js nymphArt; NYMPH pops, lib.js o.at). Faces: the speaker (auto, left);
   Basil at the right while his pick is tested (thinking; shy when Momo shows the wings) */
const camGr = [1.1, 1000, 760];
SC.lcnymph = (t, s) => { window._BUBAT = { pip: [520, 330], momo: [960, 215] }; const p = camPt(camGr, [1000, 800]), tm = s.t0 + 1.2, tmo = LE("f503m") + 1.6;
  const basFace = t >= tm - .05 && t < tmo + .3 ? bd("basil", LCW.x + LCW.w / 2 - 200, LCW.y + LCW.h / 2 + 470 * .42 + (1 - eo((t - tm) / .45)) * 350, 470, t, { in: tm, out: tmo, poses: [[tm, "thinking"], [W("f503m", "none") + .1, "oops"]], peek: true, tag: false, shadow: false, flip: true, nohop: true }) : "";
  return lookCloser(t, s, { tz: s.t0, fx: p[0], fy: p[1], art: nymphArt, bgc: "#E3F4FF", set: (tt) => VG16(tt, { mantisAt: false }, camGr), verdict: [`THE YOUNG: A NYMPH`, GOODC], tv: MK("v_nymph"), peekH: 470,
    peekEv: [[LE("f503m") + .1, "momo", "pointing"], [MK("kw_nymph") + .1, "momo", "cheer"]], over: (tt) => basFace }); };
/* the answer is one: the young. The two cards small along the top, card 1 glows; x chips on card 2 and by Basil; the coin (two of three were
   right: the Buddies also score). Pip and Momo confident, Basil shy (OUTCOMES). The mantis on a grass stem behind Pip */
SC.nymphans = (t, s) => { const tA = MK("ansglow");
  return VG16(t, { items: hopOn(t, HOP2, -9) }, [1.04 + .03 * eio((t - s.t0) / 5), 1000, 600]) + ["The young", "The adult"].map((c, i) => TF(820 + i * 280, 210, .5 * spring(t, s.t0 + .2 + i * .08, .4), choiceCard3(i + 1, c, hopCard(i, t), { w: 400, h: 330, size: 36, lit: i === 0 && t >= tA ? spring(t, tA, .45) : 0, id: "na" }))).join("") + xChip16(t, tA + .2, 1180, 130)
    + coin(t, MK("coin1") - .1, 960, 450, "+1", "if you showed one finger")
    + bd("basil", 400, 1050, 400, t, { in: s.t0 + .1, poses: [[s.t0, "sit"]] }) + (t > s.t0 + .3 ? pickNum("basil", 560, 830, t, s.t0 + .3, "2") : "") + xChip16(t, tA + .4, 600, 770, .7)
    + bd("momo", 1330, 1046, 390, t, { in: s.t0 + .15, flip: true, poses: [[s.t0, "sit"]] }) + (t > s.t0 + .35 ? pickNum("momo", 1330, 600, t, s.t0 + .35, "1") : "")
    + bd("pip", 1680, 1076, 520, t, { in: s.t0 + .1, flip: true, poses: [[s.t0, "sit"]], jump: [[tA + .05, 30]] }) + (t > s.t0 + .3 ? pickNum("pip", 1690, 490, t, s.t0 + .3, "1") : "") + melt(t, s, "lcnymph", .4) + HUD(t); };
SC.mark1 = (t, s) => markScene(t, s, { id: "f602", sayId: "f601", who: "momo", n: "1 of 2", text: "The life cycle of a grasshopper has three stages. The stages are the egg, the young and the adult. The young of the grasshopper is called a nymph.", keys: ["three", "stages", "egg", "young", "adult", "nymph"], size: 50, y: 220, footer: FOOT,
  under: TF(1200, 1070, .36 * spring(t, s.t0 + .4, .5), loopBoard16(t, { tiles: [0, 0, 0], back: 0, pics: hopPic, names: HOPN, title: "THE GRASSHOPPER", id: "m1g", labels: false })) });

/* 6 · the empty skin on its blade (Part 1's cliffhanger spot): Momo asks (thinking); her idea as HER thought bubble (dried up in the sun: a ?);
   the mantis on the planter wall above the skin */
const SKIN2 = { bx: 1060, by: 1010, bh: 330, lean: 14, u: .64, k: .74, rot: -72 };
const camSkin = (t) => { const s = SCN.skin, u = eio((t - s.t0 - .4) / 2.4); return [1.2 + .3 * u, lerp(800, 1000, u), 760]; };
SC.skin = (t, s) => VG16(t, { skin: SKIN2 }, camSkin(t)) + bd("momo", 330, 1076, 520, t, { in: s.t0 + .05, poses: [[s.t0, "sit"], [LE("f701m") + .1, "thinking"]], look: 4 })
  + bd("basil", 1600, 1060, 400, t, { in: s.t0 + .1, flip: true, poses: [[s.t0, "sit"]] }) + bd("pip", 1800, 1052, 380, t, { in: s.t0 + .15, flip: true, poses: [[s.t0, "sit"], [W("f701m", "wings") + .2, "thinking"]] })
  + ideaBubble16(t, W("f701m", "dry") - .2, s.t1 + .4, 1000, 300, dryIdea(t), P.momo, -1, "ibd") + melt(t, s, "mark1", .45) + HUD(t);
/* [LOOK CLOSER] the empty skin and why it comes off (art16.js skinArt). Faces: the speaker (auto, left); Momo at the right until her guess is
   answered (thinking, then oops: OUTCOMES at Heart's "It is empty inside") */
SC.lcskin = (t, s) => { window._BUBAT = { '*': [620, 300] }; const c = camSkin(SCN.skin.t1), p = camPt(c, bladeTip(SCN.skin.t1, SKIN2.bx, SKIN2.by, SKIN2.bh, SKIN2.lean, 2, SKIN2.u)), tm = s.t0 + 1.2, tmo = LT("f702") + 3.9;
  const moFace = t >= tm - .05 && t < tmo + .3 ? bd("momo", LCW.x + LCW.w / 2 - 200, LCW.y + LCW.h / 2 + 470 * .42 + (1 - eo((t - tm) / .45)) * 350, 470, t, { in: tm, out: tmo, poses: [[tm, "thinking"]], peek: true, tag: false, shadow: false, flip: true, nohop: true }) : "";
  return lookCloser(t, s, { tz: s.t0, fx: p[0], fy: p[1], art: skinArt, bgc: "#FFF1C8", set: (tt) => VG16(tt, { skin: SKIN2, mantisAt: false }, c), verdict: [`THE OLD SKIN IS TOO TIGHT`, GOODC], tv: MK("v_skin"), peekH: 470,
    peekEv: [[LE("f704p") + .1, "pip", "thinking"], [MK("v_skin") + .1, "pip", "cheer"]],
    over: (tt) => moFace + finePrint(tt, s.t0 + 1.0, SKIN_RULE, 1480, 1044) }); };

/* 7 · Be the nymph! The pill, the buddies wave the viewer off, ONE glide down into the grass (a soft green wipe); the journey (art16.js
   nymphJourney; the buddies ride along, shrunk, on the next blade of grass); then one pull back out */
const camDown = (dive, e) => { const m = Math.max(e * .4, dive); return [1.05 + .2 * e + 4 * dive, lerp(1000, 1060, m), lerp(640, 860, m)]; };
SC.waitw = (t, s) => { const L = "f801", dive = ei((t - (s.t1 - 1.5)) / 1.5), e = eio((t - s.t0) / 1.2), tP = W(L, "be") - .15;
  return VG16(t, { skin: SKIN2 }, camDown(dive, e)) + OP(1 - dive * 1.7, bd("momo", 300, 1076, 440, t, { in: s.t0 + .1, poses: [[s.t0, "sit"], [tP + .2, "waving"]], wave: true }) + bd("pip", 620, 1072, 440, t, { in: s.t0 + .15, poses: [[s.t0, "sit"], [tP + .5, "waving"]], wave: true })
      + bd("basil", 1690, 1076, 440, t, { in: s.t0 + .1, flip: true, poses: [[s.t0, "sit"], [tP + .35, "waving"]], wave: true })
      + (t >= tP ? TF(960, 250, spring(t, tP, .45), tpill(0, 0, "Be the nymph!", 76, P.sun, P.ink, { w: 700 })) : "") + HUD(t)) + wipe(t, s.t1, "#7CC85A", 960, 540); };
const riderBlade = (t, x, k, fl) => TF(x, 1110 + 6 * Math.sin(t * 1.3 + x), k * (fl ? -1 : 1), `<path d="M-300 20 Q0 -40 320 -10 L330 60 L-300 60z" fill="#6FBF4E" stroke="#3F8A3A" stroke-width="6"/>`, 0, k);
SC.shrink = (t, s) => { const m = MK;
  const rp = { basil: [[m("jeat") + .2, "sit"], [m("jout") + 1.2, "pointing"], [m("jhard") + .6, "sit"], [m("jwings") + .15, "cheer"]], pip: [[m("jtight") + .2, "worried"], [m("jsplit") + .6, "sit"], [m("jwings") + .1, "cheer"]], momo: [[m("jsplit") + .1, "surprised"], [m("jsplit") + 2, "sit"], [m("jwings") + .2, "cheer"]] };
  return nymphJourney(t, s) + riderBlade(t, 320, 1.1, 0) + riderBlade(t, 1680, .9, 1)
    + riders(t, s, { tin: m("jnymph") + .6, h: 200, at: { pip: [210, 1060], basil: [1690, 1066], momo: [430, 1056] }, poses: rp })
    + youTag(t, m("jnymph"), "You: a grasshopper nymph") + feelTag(t, m("jnymph") + .8, m("jeat") - .2, "your front legs and feelers", 160) + feelTag(t, m("jtight"), m("jsplit") - .1, "too tight!", 160) + feelTag(t, m("jhard"), m("jagain") - .1, "your new skin turns hard", 160) + feelTag(t, m("jwings"), m("jwings") + 3, "an adult", 160)
    + speeded(t, m("jeat"), m("jwings") + 1.5, 1700, 140); };
const ADULT2 = { bx: 1240, by: 1000, bh: 340, lean: -16, u: .78, k: .8, rot: -60 };
const adultOn = (t, B, away = -9) => { const tip = bladeTip(t, B.bx, B.by, B.bh, B.lean, 5, B.u), u = clamp((t - away) / .8); return blade(t, B.bx, B.by, B.bh, B.lean, "#7CC85A", 18, 5) + (u >= 1 ? "" : TF(tip[0] + 600 * u, tip[1] - 300 * Math.sin(Math.PI * u * .7), B.k, hopper16(t, { adult: true, ph: 3 }), B.rot * (1 - u))); };
SC.pullout = (t, s) => { const u = 1 - eo((t - s.t0) / .6); return VG16(t, { skin: SKIN2, items: adultOn(t, ADULT2) }, [1.4 + 2.4 * u, 1140, 760]) + bd("momo", 330, 1076, 520, t, { in: s.t0 + .2 }) + bd("basil", 1690, 1076, 520, t, { in: s.t0 + .25, flip: true }) + wipe(t, s.t0, "#7CC85A") + HUD(t); };

/* 8 · MOULTING: the empty skin on its blade and, beside it, the grasshopper that came out of it (a little bigger, with wings), large between the
   buddies; MOULTING pops (lib.js o.at); Momo fixes her own guess; the grasshopper hops away. The mantis on a hibiscus flower above them */
const SKINM = { ...SKIN2, k: 1.05 }, ADULTM = { bx: 1250, by: 1010, bh: 360, lean: -16, u: .74, k: 1.15, rot: -55 };
const camMoult = (t) => { const e = eio((t - MK("kw_moulting") + 1) / 1.4); return [1.35 + .1 * e, 1150, lerp(780, 760, e)]; };
SC.moult = (t, s) => { const away = LE("f902m") + .3;
  return VG16(t, { skin: SKINM, items: adultOn(t, ADULTM, away), mantisAt: [1488, 470, .32, 0, 0] }, camMoult(t))
    + bd("momo", 320, 1076, 520, t, { in: s.t0 + .05, poses: [[s.t0, "sit"], [LE("f902m") + .1, "cheer"], [LE("f902m") + 2.2, "sit"]], achieved: true, look: 4 })
    + bd("basil", 1690, 1076, 520, t, { in: s.t0 + .1, flip: true, poses: [[s.t0, "sit"], [MK("kw_moulting") - .3, "cheer"], [MK("kw_moulting") + 2, "sit"]], look: -3 }) + melt(t, s, "pullout", .3) + HUD(t); };
SC.mark2 = (t, s) => markScene(t, s, { id: "f1002", sayId: "f1001", who: "basil", n: "2 of 2", text: "As a young insect grows bigger, it sheds its outer skin and grows a new one. This process is called moulting.", keys: ["young", "insect", "sheds", "outer", "skin", "grows", "new", "moulting"], size: 56, y: 230, footer: FOOT,
  under: TF(1180, 900, .95 * spring(t, s.t0 + .4, .5), `<path d="M-260 60 Q-200 -40 -120 -180" stroke="#6FBF4E" stroke-width="30" fill="none" stroke-linecap="round"/>` + TF(-190, -50, 1, hopper16(t, { skin: true }), -64) + TF(170, 40, 1.15, hopper16(t, { adult: true })) + `<path d="M-30 -20 h80" stroke="#fff" stroke-width="10"/><path d="M40 -36 l22 16 l-22 16" fill="none" stroke="#fff" stroke-width="10" stroke-linecap="round"/>` + TF(-200, 110, 1, tpill(0, 0, "the old skin", 40, "#FFF8EA", P.ink, { w: 700 })) + TF(180, 110, 1, tpill(0, 0, "bigger", 40, "#FFF8EA", P.ink, { w: 700 }))) });

/* 9 · Showdown: Pip's homework on the cockroach (art16.js roachSheet) on his easel by the bench; the lines light as he reads them (l1..l3);
   for the countdown the garden gives way to the blue game stage: the sheet (the question) stays big at the left, the ring at the right with the
   counting YOU hand, Pip fidgets (worried); Basil and Momo reveal (confident), Pip shy (OUTCOMES). The mantis on the easel's leg (not in the
   countdown) */
const EAS = [860, 1064, 1];
window.SHELF_AWAY = (t) => { if (PART !== 2) return 0; const a = MK("ring0_show") - .6, b = MK("bell_show") + .5; return ss(a, a + .35, t) * (1 - ss(b, b + .35, t)); };
const hwLit16 = (t) => { const L = "f1102p", bell = MK("bell_show"), ls = [MK("l1"), MK("l2"), MK("l3")]; return [0, 1, 2].map((i) => { if (t >= ls[i] - .1 && t < (i < 2 ? ls[i + 1] - .1 : LE(L) + .3)) return 1; if (t >= LT(L) && t < bell) return .4; return 0; }); };
SC.show = (t, s) => { window._BUBAT = { pip: [1250, 260], basil: [1450, 235], momo: [1450, 235] }; const r0 = MK("ring0_show"), bell = MK("bell_show"), rs = ringState(t, r0, 5), tS = LT("f1104") - .08, inT = t >= r0 && t < bell, R = [1500, 420], RR = 200;
  const st = ss(r0 - .6, r0 - .1, t) * (1 - ss(bell + .6, bell + 1.1, t)), bob = inT ? 16 * Math.sin((t - r0) * Math.PI * 2) : 0, nf = inT ? (Math.floor(t - r0) % 3) + 1 : 3, ez = eio((t - LT("f1102p") + .4) / 1.2) * (1 - eio((t - r0 + 1) / .8)), ez2 = eio((t - r0 + 1) / .8) * (1 - eio((t - bell - .6) / .8));
  const picks = [["basil", "f1105b", "3", 1500], ["momo", "f1106m", "3", 1790]], mant = st < .05 ? mantisAt(t, EAS[0] + 196 * EAS[2], EAS[1] - 130 * EAS[2], .3) : "";
  return VG16(t, { mantisAt: false }, [1.03 + .03 * eio((t - s.t0) / 10), 900, 640]) + `<rect width="1920" height="1080" fill="${P.night}" opacity=".25"/>` + OP(st, bg("stage"))
    + TF(EAS[0] + 40 * ez - 260 * ez2, EAS[1] + 20 * ez, EAS[2] * (1 + .04 * ez + .04 * ez2), roachSheet(t, { lit: hwLit16(t) })) + mant
    + (t >= r0 - .6 ? OP(st, TF(R[0], R[1], spring(t, r0 - .6, .45) * (1 + .035 * (inT ? rs.tick : 0)), `<g transform="translate(${-R[0]} ${-R[1]})">${ringTimer(R[0], R[1], t < r0 ? 1 : t < bell ? rs.frac : 0, t < r0 ? 5 : t < bell ? rs.secs : 0, t, { R: RR, sw: 32, tick: rs.tick, shut: pulse(t, bell, .01, .6), chg: inT || (t >= bell && t < bell + .5) ? (t >= bell ? bell : rs.chg) : -9, ns: 1.2,
      inner: `<circle cx="${R[0]}" cy="${R[1]}" r="${RR - 24}" fill="#FFF8EA"/>` + TF(R[0], R[1] + 30 + bob * .3, .75, `<g filter="url(#dropS)">${countHand(nf)}</g>`) })}</g>`) + youPill(R[0] - 230, R[1] - 170, 1.1) + TF(R[0], 760, 1, tpill(0, 0, "line 1, 2 or 3?", 44, P.ink, "#fff", { w: 700 }))) : "")
    + bd("pip", 220, 1076, 500, t, { in: s.t0 + .1, rock: inT ? 2 : 0, poses: [[s.t0, "waving"], [s.t0 + 2.2, "sit"], [r0 - .3, "worried"], [bell + .35, "sit"]], wave: true, jump: [[bell + .02, 26]] })
    + picks.map(([w, id, n, x]) => bd(w, x, 1076, 360, t, { in: bell + .3, flip: true, poses: [[bell + .3, "sit"], [LE(id) + .1, "arms_crossed"]] }) + (t > bell + .5 ? (w === "basil" ? pickNum(w, x - 200, 960, t, LT(id) - .1, n) : pickNum(w, x + 10, 640, t, LT(id) - .1, n)) : "")).join("")
    + stamp(t, tS, 960, 460) + bellIcon(t, r0) + HUD(t); };
/* the fix: line 3 struck (strike) and rewritten in green (rewrite: ≠ becomes =; Pip's mistake is fixed); the book's strip (Heart reads it); the
   egg case pops out big beside line 2 with a cut-away of its two neat rows of eggs (case), EGG CASE pops; a small cockroach loop slides under
   the sheet; the coin +2 (coin2). The mantis on the easel's top */
const caseBig = (t) => { const tc = MK("case"); if (t < tc - .1) return ""; const k = spring(t, tc - .1, .5), cut = ss(tc + 1.2, tc + 2, t);
  return TF(1480, 520, k, `<g filter="url(#drop)"><circle r="230" fill="#FFF8EA"/></g><circle r="230" fill="none" stroke="#9A5A2A" stroke-width="8"/>` + TF(0, 10, 1.9, eggCase16({ cut })) + TF(0, 170, 1, tpill(0, 0, cut > .5 ? "two neat rows of eggs" : "an egg case", 36, "#9A5A2A", "#fff", { w: 700 }))) + OP(k, `<path d="M1250 520 L${n2(EAS[0] + 380 * EAS[2])} ${n2(EAS[1] - 640 * EAS[2])}" stroke="#9A5A2A" stroke-width="6" stroke-dasharray="12 8"/>`); };
/* teacher, 23 Nov 2026 (SERIES_FORMAT: the corrected buddy stays shy, the right ones stay confident, through the whole fix) */ SC.fix = (t, s) => { window._BUBAT = { basil: [1250, 220] }; const st = ss(MK("strike"), MK("strike") + .4, t), fx = ss(MK("rewrite"), MK("rewrite") + .8, t), ez = 1 - eio((t - s.t0 - .2) / .8), lp = spring(t, LT("f1109b") + 2.2, .5);
  return VG16(t, { mantisAt: false }, [1.03, 900, 640]) + `<rect width="1920" height="1080" fill="${P.night}" opacity=".25"/>` + TF(EAS[0] - 60 * (1 - ez), EAS[1], EAS[2], roachSheet(t, { strike: st, fix: fx, lit: [0, pulse(t, MK("case"), .05, 1.5), fx * .6], case: ss(MK("case"), MK("case") + .5, t) }))
    + mantisAt(t, EAS[0] - 300 * EAS[2], EAS[1] - 920 * EAS[2], .28) + caseBig(t)
    + (lp > .02 ? TF(700, 1062, .42 * lp, loopBoard16(t, { tiles: [0, 0, 0], back: 0, pics: roachPic, names: ["the egg case", "the young: a nymph", "the adult"], title: "THE COCKROACH", id: "fxl" })) : "")
    + coin(t, MK("coin2") - .1, 1640, 300, "+2", "line 3")
    + strip15(t, "f1107", "The young of the cockroach is called a nymph.", 150, { keys: ["young", "cockroach", "nymph"], maxW: 1240, x: 900, t1: LE("f1107") + 1.4 })
    + bd("pip", 200, 1076, 470, t, { in: s.t0 + .05, poses: [[s.t0, "oops"]] })
    + bd("momo", 1800, 1066, 360, t, { flip: true, in: s.t0 + .15, poses: [[s.t0, "arms_crossed"]] })
    + bd("basil", 1530, 1072, 370, t, { flip: true, in: s.t0 + .1, poses: [[s.t0, "arms_crossed"]] }) + HUD(t); };
/* 10 · the chant: call and response; the board of FOUR small loops at the right, each line's part flashing on its call */
SC.chant = (t, s) => chantScene(t, s, "c1003", { sayId: "u1002", size: 50, x: 620, y0: 260, dy: 110, xs: [230, 560, 890], bh: 360, tx: 1180, ty: 520, sayX: 620, sayY: 600,
  board: (tt, f) => TF(1500, 1066, .74, fourLoops(tt, f)) });

/* 11 · score hand, the praying mantis (lizReveal onto the sunflower: the REVEAL spot, never the intro stem) and Basil's fun-fact panel */
SC.final = (t, s) => { const L = "f1301"; return finalScene(t, s, L, 1, [[s.t0, null, 1], [W(L, "three") - .1, null, 3]]); };
SC.liz = (t, s) => { const L = "f1302", tq = W(L, "it") - .1, a = MANTISAT.liz, tm = W(L, "mantis");
  return lizReveal(t, s, L, VG16(t, { mantisAt: a, turn: ss(tm, tm + .5, t) }), a[0] + 4, a[1] - 60, tq, "It was on a sunflower, keeping very still!", -120, 160, 80, 2.6, { from: () => SC.final(SCN.final.t1 - .04, SCN.final), qx: 900, qy: 720, tx: 760, ty: 975, tell: "f1304",
    fact: { id: "f1303b", at: [1250, 440], w: 960, h: 460, sx: 1300, sy: 860, items: [["ff_cousin", "cousins!", ffCousin], ["ff_case", "an egg case", ffMCase], ["ff_babies", "lots of tiny nymphs", ffMBabies]], cols: ["#E36A12", "#5B6BD6", "#2FA35A"], poses: [[MK("ff_in") - .4, "sit"]] } }) + bd("momo", 170, 1076, 340, t, { in: s.t0 + .6, poses: [[s.t0 + .6, "sit"], [tm, "surprised"], [tm + 1.6, "pointing"], [LT("f1303b") - .3, "sit"]] }) + bd("pip", 360, 1068, 320, t, { in: s.t0 + .8, poses: [[s.t0 + .8, "sit"], [LT("f1304"), "waving"]], wave: true }) + smallPrint(t, s.t0 + .5, MANTIS_RULE); };
/* 12 · the dare for Episode 17: the lime plant in its big pot at the garden's edge, a green caterpillar munching a leaf (it chews and wiggles);
   ONE set of TWO big numbered picture cards slides in low (1 Yes, a nymph: a nymph with a ? · 2 No: the caterpillar); the banner. The mantis on
   the rim of the lime plant's pot */
const CAT = [1700, 380];
const nextPic = (i, t) => i === 0 ? `<rect x="-200" y="-140" width="400" height="280" fill="#E8F5DC"/>` + TF(-20, 80, 1.2, hopper16(t, {})) + TF(150, -80, .8, `<g filter="url(#dropS)"><circle r="40" fill="url(#gSun)"/></g>${T(0, 20, "?", 60, P.ink)}`)
  : `<rect x="-200" y="-140" width="400" height="280" fill="#E8F5DC"/><path d="M-200 60 Q0 20 200 70 V140 H-200z" fill="#58B56C"/>` + TF(0, 60, 1.25, caterpillar16(t));
const DRX = [760, 1180];
SC.dare = (t, s) => { const a = "f1401", tQ = W(a, "nymph") - .15, tc = [W(a, "one", 1) - .1, W(a, "two") - .1], tL = W(a, "lock") - .1, e = eio((t - MK("dareIn") - .2) / 1.6), cam = [lerp(2.4, 1.04, e), lerp(CAT[0] - 40, 1000, e), lerp(CAT[1] + 20, 620, e)];
  const cat = TF(CAT[0] - 20, CAT[1] + 34, .55, caterpillar16(t), -12) + `<g transform="translate(${CAT[0] - 70} ${CAT[1] + 20}) rotate(-20)"><path d="M-11 0 L3 0" stroke="#5E7A3A" stroke-width="4" stroke-linecap="round"/>${leaf15(90, 34, "#58B56C", "#2F7A45")}</g>`;   // on its stalk, at the tip of the lime tree's twig B1 (pond16.js LIME16)
  return VG16(t, { items: cat }, cam) + `<rect width="1920" height="1080" fill="${P.night}" opacity="${n2(.28 * e)}"/>` + OP(1 - e, TF(1200, 820, spring(t, s.t0 + .2, .4), tpill(0, 0, "a caterpillar on the lime plant", 44, "#fff", P.ink, { w: 700 })))
    + NEXT_CARDS.map((c, i) => { const t0 = MK("dareIn") + .5 + i * .25, pl = Math.max(pulse(t, tc[i], .04, .6), t >= tL ? (Math.floor((t - tL) / .5) % 2 === i ? .8 : 0) : 0); if (t < t0) return ""; const [x, d] = slideX(t, t0, .6, 2400, DRX[i], 920);
      return d + TF(x, 700, .92, choiceCard3(i + 1, c, nextPic(i, t), { w: 400, h: 330, size: 40, pulse: pl, id: "dr" })); }).join("")
    + TF(1000, 150, spring(t, MK("dareIn") + .2, .45), tpill(0, 0, "NEXT · Is the caterpillar a nymph?", 46, P.ink, P.sun, { w: 700 }))
    + (t >= tL ? TF(970, 1010, spring(t, tL, .45), tpill(0, 0, "Lock in your answer!", 44, P.sun, P.ink, { w: 700 })) : "")
    + bd("basil", 260, 1076, 500, t, { in: s.t0 + .1, poses: [[s.t0, "sit"]], jump: [[tc[1] + .3, 22]] })
    + bd("momo", 1590, 1070, 360, t, { flip: true, in: s.t0 + .2, poses: [[s.t0, "sit"], [tQ + .2, "thinking"]] })
    + bd("pip", 1800, 1066, 340, t, { flip: true, in: s.t0 + .3, poses: [[s.t0, "sit"], [tQ + .3, "thinking"]] }) + HUD(t); };
SC.nyk = (t, s) => nykScene(t, s, TF(840, 1066, .62, fourLoops(t)), { bx: [220, 1720, 1420], hx: 470 });
})(); }
