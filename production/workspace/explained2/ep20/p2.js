// p2.js: PART 2, "Flip It and It SNAPS! Like Poles, Unlike Poles, and Is It a Magnet?": Pip's HDB kitchen (the fridge card WHICH POLES
// FACE?, Basil's toy train), Round 1 (two magnets push apart; turn one round: two, they pull together), be a toy train carriage (pushed away
// without touching; turned round; click), like and unlike poles (each pair of poles meets, the fridge card fills box by box: UNLIKE POLES,
// LIKE POLES; the rings' payoff: two North poles face each other; the rule across the card; Mark Sentence 6.14), the Showdown (Pip's
// homework: attracted, so a magnet?), is it a magnet? (Dad's two grey bars: THE REPEL TEST; Mark Sentence 6.13), the chant, the lizard, the
// dare into EP21 (a bar magnet hanging on a string, spun: where does it stop?).
// Segments 1-14 of ../p3_ep20_script.md section 5 (version 1, 23 Nov 2026).
// STAGE 2 (drawn 2026-11-23): Pip's HDB flat that evening (sets20.js KT20: the kitchen with the dusk window, the laundry poles, the curtain
// rail, the plant, the sink, the ceiling light, the fridge with WHICH POLES FACE? (it fills on ns, sn, nn, ss; the rule at `rule`; the note
// at `note`), the small table; through the doorway the living room: the clock, the TV cabinet, the toy box, the wooden track). The buddies
// stand IN the scene, big; the camera drifts or pushes in and never cuts inside the flat; the wrong buddy stays shy and the right ones
// confident through every fix (lib.js OUTCOMES `to`). Every action is drawn AT its mark.
if (PART === 2) { (() => {
const L1 = "n401";
// the scores (script section 3): Round 1 1 : 1 (Momo and Pip right: the Buddies score), Showdown 3 : 1 (built on Pip's mistake: no point)
SCORE.push([MK("coin1") - .1, 1, 1]);
SCORE.push([MK("coin2") - .1, 3, 1]);
const FOOT = "P3 · Interactions · Properties of Magnets";
const R1 = ["They still push apart", "They pull together", "Nothing happens"];
const bd = (who, x, y, h, t, o = {}) => buddy(who, x, y, h, t, o);
// the table's props (world): Pip's pencil with the rings (PEN2), Basil's toy train (TRAIN), two bar magnets (MAGS), Dad's bars (BARS)
const PEN2 = [360, 846], TRAIN = [700, 840], MAGS = [[640, 826], [840, 826]], BARS = [[600, 822], [800, 822]];
const ringsT = (t, o = {}) => TF(PEN2[0], PEN2[1], .42, rings20(t, o));
const trainOn = (t, x = TRAIN[0], y = TRAIN[1], k = .5) => TF(x, y, k, trainToy(t));
const camKit = camOn([960, 520], 1.06, 960, 540);
window.SHELF_AWAY = (t) => { if (PART !== 2) return 0; const w = SCN.waitw; return ss(w.t0 + .3, w.t0 + .8, t) * (1 - ss(SCN.pullout.t1, SCN.pullout.t1 + .4, t)); };

/* 1 · "Last time...": three pictures from Part 1, one at a time, centred and large, a gentle push-in, one label each (>= 2.5 s each) */
SC.lasttime = (t, s) => { const tb = [s.t0, MK("pic2") - .2, MK("pic3") - .2], i = t >= tb[2] ? 2 : t >= tb[1] ? 1 : 0, labs = ["Two poles: the strongest pull", "The top ring floats on a push", "Turn it over, and it pulls"], u = t - tb[i], z = 1 + .05 * eio(u / 4), k = ramp(t, tb[i], .5);
  return bg("stage2") + OP(ramp(t, s.t0, .3), T(960, 110, "Last time…", 60, "#fff", { w: 600 }))
    + OP(k, TF(960, 520, z, `<g filter="url(#drop)"><rect x="-534" y="-314" width="1068" height="628" rx="40" fill="#FFF8EA"/></g><clipPath id="rcP"><rect x="-520" y="-300" width="1040" height="600" rx="30"/></clipPath><g clip-path="url(#rcP)">${recapP2(i, t)}</g>`))
    + OP(k, TF(960, 930, spring(t, tb[i] + .1, .4), tpill(0, 0, labs[i], 46, P.sun, P.ink, { w: 700 }))) + HUD(t); };
/* 2 · Pip's HDB kitchen, that evening: the fridge card at its HOME on the fridge door; Basil's wooden toy train (an engine and a carriage,
   joined) slides in low along the table on `train`. The lizard on the kitchen wall beside the ceiling light (the intro spot) */
const trainIn = (t) => { const a = MK("train"), u = eio(clamp((t - a + .5) / .6)); return trainOn(t, lerp(TRAIN[0] - 520, TRAIN[0], u)) + (u > 0 && u < 1 ? dust(lerp(TRAIN[0] - 520, TRAIN[0], u) - 140, TRAIN[1], (t * 3) % 1, .6) : ""); };
const kitBuds = (t, t0, o = {}) => bd("basil", 250, 1076, 480, t, { in: t0, poses: [[t0, "sit"]], look: 3, out: o.out }) + bd("momo", 1110, 1010, 400, t, { in: t0 + .1, flip: true, poses: [[t0, "sit"]], out: o.out })
  + bd("pip", 1710, 1076, 500, t, { in: t0 + .05, flip: true, poses: [[t0, "sit"]], out: o.out });
SC.kitchen = (t, s) => KT20(t, { tableTop: ringsT(t) + trainIn(t) }, camKit) + kitBuds(t, s.t0 - .5, { out: s.t1 - .25 }) + OP(ramp(t, s.t0 + .1, .3), lowerPill(60, 96, "Pip's home, an HDB flat, Singapore ·", "evening")) + melt(t, s, "lasttime", .45) + HUD(t);
SC.game = (t, s) => { const p = LZAT.intro;
  return gameScene(t, s, ["n202", "n203m", "n204"], false, { world: (tt) => KT20(tt, { tableTop: ringsT(tt) + trainOn(tt) }, camKit), A: camPt(camKit, [p[0], p[1]]), T: [680, 440], Z: 2.6, dim0: 0 }) + smallPrint(t, LT("n204"), LOOK_RULE); };
SC.goals = (t, s) => goals3(t, s, [["Unlike and like poles", ""], ["Why the ring floats", ""], ["Is it a magnet?", ""]], ["n301", "n302", "n303", "n304"], "pip");

/* 4 · Round 1: two magnets push apart; Basil turns one round. THREE big numbered picture cards (they still push apart · they pull together ·
   nothing happens); the clue labels they push apart · turn one round ON TOP of the ring; in the ring two bar magnets on round pencils pushed
   apart, a curved turn arrow over the right one. Basil leads (thinking, then worried); Pip's line is cut: his number card is shown fixed */
SC.r1 = (t, s) => lockN(t, { t0: W(L1, "what") - .35, cards: R1, clues: [["they push apart", W(L1, "push")], ["turn one round", W(L1, "turns")]], csize: 36, lead: "basil",
  pics: [0, 1, 2].map((i) => r1Pic(i, t)), q: "What happens?", tq: W(L1, "what") - .1,
  tc: [W(L1, "one"), W(L1, "two"), W(L1, "three")], ring0: MK("ring0_r1"), dur: 5, lock: "n402", obj: ringP2,
  picks: [{ who: "momo", id: "n403m", word: "2" }, (HAS("n404p") ? { who: "pip", id: "n404p", word: "2" } : { who: "pip", fixed: true, word: "2" }), { who: "basil", id: "n405b", word: "1" }] });

/* 5 · Be a toy train carriage! One glide from the kitchen through the doorway to the wooden track on the living-room floor; the buddies wave
   the viewer off (goodbye) and shrink (a pop each). The lizard on the living room's wall clock as the camera passes */
const camWait = (t) => { const s = SCN.waitw, u = eio((t - s.t0) / (s.t1 - s.t0)); return camMix(camKit, camOn([900, 728], 6, 960, 640), u * u); };
SC.waitw = (t, s) => { const L = "n501", tP = W(L, "be") - .15, sh = W(L, "shrink") - .1;
  const buds = ["basil", "momo", "pip"].map((w, i) => { const x = [250, 1110, 1710][i]; return bd(w, x, [1076, 1010, 1076][i], [470, 390, 490][i], t, { in: s.t0 + .1 + .05 * i, out: sh + .2 * i + .3, flip: x > 960, poses: [[s.t0, "sit"], [tP + .2 + .15 * i, "waving"]], wave: true }); }).join("");
  return KT20(t, { tableTop: ringsT(t) + trainOn(t), items: TF(900, 724, .16, trainToy(t)) }, camWait(t)) + OP(1 - ss(s.t1 - 1.0, s.t1 - .5, t), buds + (t >= tP ? TF(960, 250, spring(t, tP, .45), tpill(0, 0, "Be a toy train carriage!", 72, P.sun, P.ink, { w: 700 })) : "") + HUD(t)) + wipe(t, s.t1, "#C08A54", 960, 600); };
SC.shrink = (t, s) => { const m = MK, rp = { momo: [[m("jaway") + .1, "surprised"], [m("jaway") + 2.3, "sit"]] };
  return trainJourney(t, s) + riders(t, s, { tin: m("jtrack") + .6, h: 190, at: { pip: [200, 1044], basil: [1720, 1050], momo: [390, 1040] }, poses: rp })
    + youTag(t, MK("jtrack"), "You: a toy train carriage") + feelTag(t, MK("jengine"), MK("jroll") - .2, "to scale: a toy carriage", 160) + feelTag(t, MK("jnever"), MK("jturn") - .2, "no touching", 160)
    + (t >= MK("jaway") + .3 && t < MK("jturn") ? TF(1420, 520, spring(t, MK("jaway") + .3, .45), tpill(0, 0, "push", 44, PUSHC, "#fff", { w: 700 })) : "") + (t >= MK("jclick") + .3 ? TF(1420, 520, spring(t, MK("jclick") + .3, .45), tpill(0, 0, "pull", 44, PULLC, "#fff", { w: 700 })) : "")
    + (t >= MK("jsame") ? [["same carriage", 520], ["same engine", 960], ["only the end facing it changed", 1400]].map(([w, x], i) => TF(x, 800, spring(t, MK("jsame") + .3 * i, .45), tpill(0, 0, w, 32, "#fff", P.ink, { w: 700 }))).join("") : ""); };
// the pull back out: the kitchen; through the doorway, the carriage joined to the engine on the track
SC.pullout = (t, s) => { const u = 1 - eo((t - s.t0) / .6);
  return KT20(t, { tableTop: ringsT(t), items: TF(900, 724, .16, trainToy(t)) }, camMix(camOn([960, 600], 1.12, 960, 580), camOn([900, 728], 5, 960, 640), u))
    + bd("momo", 250, 1076, 500, t, { in: s.t0 + .2 }) + bd("basil", 1110, 1010, 420, t, { in: s.t0 + .25, flip: true }) + bd("pip", 1710, 1076, 500, t, { in: s.t0 + .3, flip: true }) + wipe(t, s.t0, "#FFFFFF") + HUD(t); };

/* 6 · the answer is two: they pull together. The three cards small at the top left (card 2 lit at ansglow; "not this one" on card 1); the
   coins YOU +1 and BUDDIES +1. Momo and Pip (right) confident, Basil (wrong) shy to the END of the scene (OUTCOMES `to`). The lizard on the
   kitchen window frame, by the laundry poles */
const camAns2 = camOn([960, 600], 1.12, 960, 580);
SC.r1ans = (t, s) => { const tA = MK("ansglow");
  return KT20(t, { tableTop: ringsT(t), items: TF(900, 724, .16, trainToy(t)) }, camAns2)
    + `<g filter="url(#drop)"><rect x="30" y="40" width="640" height="200" rx="24" fill="#FFF8EA" opacity=".92"/></g>` + R1.map((c, i) => TF(150 + i * 200, 135, .42, choiceCard3(i + 1, c, r1Pic(i, t), { w: 400, h: 330, size: 34, lit: i === 1 && t >= tA ? spring(t, tA, .45) : 0, id: "ra" + i }))).join("")
    + tagAt(t, tA + .3, 150, 222, 1, "not this one", 22)
    + coin(t, MK("coin1") - .1, 960, 330, "+1", "if you showed two fingers")
    + bd("momo", 250, 1076, 500, t, { in: s.t0 + .1, poses: [[s.t0, "sit"]] }) + (t > s.t0 + .3 ? pickNum("momo", 420, 640, t, s.t0 + .3, "2") : "") + tickChip16(t, tA + .2, 470, 585, .7)
    + bd("basil", 1110, 1010, 420, t, { in: s.t0 + .15, flip: true, poses: [[s.t0, "sit"]] }) + (t > s.t0 + .35 ? pickNum("basil", 980, 700, t, s.t0 + .35, "1") : "") + xChip16(t, tA + .25, 1030, 645, .7)
    + bd("pip", 1710, 1076, 500, t, { in: s.t0 + .2, flip: true, poses: [[s.t0, "sit"]] }) + (t > s.t0 + .4 ? pickNum("pip", 1870, 640, t, s.t0 + .4, "2") : "") + tickChip16(t, tA + .3, 1850, 580, .7)
    + melt(t, s, "pullout", .3) + HUD(t); };

/* 7 · Momo at the table: "When two magnets push apart, they must both be North poles. Right?" Two red-and-blue bar magnets on the table,
   Pip's rings beside them; the camera pushes in on the card's four empty boxes (straight into the look-closer). Momo talks, then thinks (a real
   question). The lizard on top of the fridge's side */
const camFr = (t) => { const s = SCN.fridge, u = eio((t - s.t0 - .6) / (s.t1 - s.t0 - .6)); return camMix(camAns2, camOn([1440, 455], 1.75, 1120, 520), u); };
const frWorld = (t, cam) => KT20(t, { tableTop: ringsT(t) + MAGS.map(([x, y]) => TF(x, y - 20, .4, bar20(t))).join("") }, cam);
SC.fridge = (t, s) => frWorld(t, camFr(t))
  + bd("momo", 250, 1076, 500, t, { in: s.t0 + .1, poses: [[s.t0, "sit"], [LE("n701m") + .1, "thinking"]], look: 3 })
  + bd("pip", 560, 1010, 370, t, { in: s.t0 + .15 }) + bd("basil", 1720, 1076, 480, t, { in: s.t0 + .2, flip: true }) + HUD(t);
/* [LOOK CLOSER] like and unlike poles (lc20.js lcLikeArt). Faces: Momo at the right the whole time (her idea, two North poles, is tested:
   thinking; oops ON `sstoo`, and she stays shy to the end, also through the snap's close-up: the 23 Nov rule); at the left Pip (teaching
   UNLIKE POLES; cheer after his line: achieved), then Basil (teaching LIKE POLES; cheer after his line: achieved; pointing at the gap ON
   `rings`) */
const peekFace = (who, side, t, tin, tout, poses, o = {}) => { if (t < tin - .05 || (tout !== undefined && t > tout + .3)) return ""; const W_ = LCW, x = side === "l" ? W_.x - W_.w / 2 + 200 : W_.x + W_.w / 2 - 200;
  return bd(who, x, W_.y + W_.h / 2 + 470 * .42 + (1 - eo((t - tin) / .45)) * 350, 470, t, { in: tin, out: tout, poses: [[tin, "sit"], ...(poses || [])], peek: true, tag: false, shadow: false, flip: side === "r", nohop: true, achieved: o.achieved }); };
SC.lclike = (t, s) => { window._BUBAT = { '*': [960, 905] }; const cE = camFr(SCN.fridge.t1), p = camPt(cE, [1440, 455]), tm = s.t0 + 1.2, tp = LT("n703p") - .5, tb = LT("n707b") - .5, tRg = MK("rings"), tSn = MK("snap");
  return JOLT(t, [tSn], lookCloser(t, s, { tz: s.t0, fx: p[0], fy: p[1], art: lcLikeArt, bgc: "#FFF8EA", set: (tt) => frWorld(tt, cE), verdict: [`UNLIKE ATTRACT · LIKE REPEL`, GOODC], tv: MK("v_like"), peek: false,
    over: (tt) => peekFace("momo", "r", tt, tm, undefined, [[tm + .2, "thinking"], [MK("sstoo") + .1, "oops"]])
      + peekFace("pip", "l", tt, tp, tb - .4, [[LE("n703p") + .1, "cheer"], [LE("n703p") + 2.1, "sit"]], { achieved: true })
      + peekFace("basil", "l", tt, tb, undefined, [[LE("n707b") + .1, "cheer"], [LE("n707b") + 2.1, "sit"], [tRg + .1, "pointing"], [tRg + 2.6, "sit"]], { achieved: true }) }), 20)
    + faceCam("momo", t, tSn + .05, tSn + 1.9, 1600, 330, 150, [[tSn, "oops"]], { noreact: true }); };
SC.mark1 = (t, s) => markScene(t, s, { id: "n712", sayId: "n711", who: "pip", n: "1 of 2", text: "Unlike poles attract and like poles repel.", keys: ["Unlike", "attract", "like", "repel"], size: 76, y: 260, footer: FOOT, achieved: true,
  under: fridgeCardAt(t, 1460, 800, .72 * spring(t, s.t0 + .4, .5), { id: "mk" }) });

/* 8 · Showdown: Pip's homework on a small easel by the fridge (lc20.js pipSheet, drawn to match what he SAYS). The lines light as he reads
   them (l1, l2, l3). The YOU ring (5 s) big on the blue stage, the sheet big beside it; only Pip at the side (worried). LOCKED IN!; Basil
   reveals (OUTCOMES at n804b: Basil and Momo confident, Pip shy, through the whole fix). The lizard on the curtain rail above the window */
const EAS = [1060, 1090, .55];
const hwLit = (t) => { const ms = [MK("l1"), MK("l2"), MK("l3"), LE("n802p") + .2]; return [0, 1, 2].map((i) => ss(ms[i] - .1, ms[i] + .3, t) * (1 - ss(ms[i + 1] - .2, ms[i + 1] + .2, t))); };
const camShow = (t) => { const e = eio((t - LT("n802p") + .6) / 1.2) * (1 - eio((t - MK("ring0_show") + 1) / .8)); return camMix(camOn([960, 560], 1.06, 960, 540), camOn([EAS[0], EAS[1] - 270], 1.75, 1000, 560), e); };
const showWorld = (t, cam, o = {}) => { const r0 = MK("ring0_show"), bell = MK("bell_show"), lz = o.lizard !== undefined ? o.lizard : (t < r0 - 1 || t > bell + 1 ? LZAT.show : false);
  return KT20(t, { lizard: lz, tableTop: ringsT(t) + MAGS.map(([x, y]) => TF(x, y - 20, .4, bar20(t))).join(""), front: TF(EAS[0], EAS[1], EAS[2], pipSheet(t, o.sheet || { lit: hwLit(t) })) }, cam); };
SC.show = (t, s) => { window._BUBAT = { basil: [1500, 230], momo: [1330, 250], pip: [700, 300] }; const r0 = MK("ring0_show"), bell = MK("bell_show"), rs = ringState(t, r0, 5), tS = LT("n803") - .08, inT = t >= r0 && t < bell, R = [1440, 430], RR = 200;
  const st = ss(r0 - .6, r0 - .1, t) * (1 - ss(bell + .6, bell + 1.1, t)), bob = inT ? 16 * Math.sin((t - r0) * Math.PI * 2) : 0, nf = inT ? (Math.floor(t - r0) % 3) + 1 : 3, tB = LT("n804b");
  return showWorld(t, camShow(t)) + `<rect width="1920" height="1080" fill="${P.night}" opacity=".06"/>` + OP(st, bg("stage"))
    + (st > .01 ? OP(st, TF(620, 1110, .9, pipSheet(t, { lit: [0, 0, 0] })) + TF(R[0], R[1], spring(t, r0 - .6, .45) * (1 + .035 * (inT ? rs.tick : 0)), `<g transform="translate(${-R[0]} ${-R[1]})">${ringTimer(R[0], R[1], t < r0 ? 1 : t < bell ? rs.frac : 0, t < r0 ? 5 : t < bell ? rs.secs : 0, t, { R: RR, sw: 32, tick: rs.tick, shut: pulse(t, bell, .01, .6), chg: inT || (t >= bell && t < bell + .5) ? (t >= bell ? bell : rs.chg) : -9, ns: 1.2,
      inner: `<circle cx="${R[0]}" cy="${R[1]}" r="${RR - 24}" fill="#FFF8EA"/>` + TF(R[0], R[1] + 30 + bob * .3, .75, `<g filter="url(#dropS)">${countHand(nf)}</g>`) })}</g>`) + youPill(R[0] - 230, R[1] - 170, 1.1) + TF(R[0], 760, 1, tpill(0, 0, "line 1, 2 or 3?", 48, P.ink, "#fff", { w: 700 }))) : "")
    + bd("pip", 210, 1076, 480, t, { in: s.t0 + .1, rock: inT ? 2 : 0, poses: [[s.t0, "sit"], [W("n801", "pips") + .2, "pointing"], [LT("n802p") - .3, "sit"], [r0 - .3, "worried"], [bell + .35, "sit"]], jump: [[bell + .02, 26]] })
    + bd("momo", 1450, 1020, 380, t, { in: bell + .4, flip: true, poses: [[bell + .4, "sit"]] }) + (t > bell + .6 ? pickNum("momo", 1330, 700, t, tB - .1, "3") : "")
    + bd("basil", 1720, 1076, 480, t, { in: bell + .3, flip: true, poses: [[bell + .3, "sit"]] }) + (t > bell + .5 ? pickNum("basil", 1580, 640, t, tB - .1, "3") : "")
    + stamp(t, tS, 960, 460) + bellIcon(t, r0) + melt(t, s, "showcard", .3) + HUD(t); };
/* the fix: line 3 struck (strike) and rewritten in green (rewrite); a big ? by the nail (qnail: the question for the next look-closer); the coin
   +2 (coin2). Pip shy through the whole fix; Basil and Momo confident. The lizard on top of the TV cabinet, through the doorway */
SC.fix = (t, s) => { window._BUBAT = { '*': [1330, 250] }; const st = ss(MK("strike"), MK("strike") + .4, t), fx = ss(MK("rewrite"), MK("rewrite") + .8, t), q = t >= MK("qnail") ? spring(t, MK("qnail"), .45) : 0;
  const cam = camMix(camOn([EAS[0], EAS[1] - 250], 1.6, 960, 560), camOn([1000, 600], 1.12, 960, 580), eio(clamp((t - MK("coin2") + .4) / 1.2)));
  return showWorld(t, cam, { lizard: LZAT.fix, sheet: { strike: st, fix: fx, lit: [0, 0, 0], q } })
    + coin(t, MK("coin2") - .1, 1560, 330, "+2", "line 3")
    + bd("pip", 210, 1076, 480, t, { in: s.t0 + .05, poses: [[s.t0, "oops"]] }) + bd("momo", 1450, 1020, 380, t, { in: s.t0 + .1, flip: true, poses: [[s.t0, "arms_crossed"]] }) + bd("basil", 1720, 1076, 480, t, { in: s.t0 + .1, flip: true, poses: [[s.t0, "arms_crossed"]] }) + HUD(t); };

/* 9 · Pip: "Then how can I prove that something is a magnet?" Dad's red toolbox open on a chair; two plain grey bars (tags A and B) on the
   table; Basil's red-and-blue magnet on its round pencils. Pip talks (still a little shy), then thinks (his own real question). The camera
   pushes in on the bars (into the look-closer). The lizard on the side of the toy box, through the doorway */
const chair20 = (x, y) => `<path d="M${x - 90} ${y} V${y - 150} M${x + 90} ${y} V${y - 150} M${x - 90} ${y - 150} V${y - 380}" stroke="#8A5A30" stroke-width="14" stroke-linecap="round"/><rect x="${x - 110}" y="${y - 170}" width="220" height="30" rx="8" fill="#B07A42" stroke="#7A5226" stroke-width="5"/><rect x="${x - 100}" y="${y - 380}" width="20" height="200" rx="6" fill="#B07A42"/>`;
const barsWorld = (t, cam) => KT20(t, { items: chair20(120, 1000) + TF(120, 830, .7, toolbox20()), tableTop: ringsT(t) + BARS.map(([x, y], i) => TF(x, y, .5, greyBar(i ? "B" : "A"))).join("") + barOnPencils(t, 920, 800, .32, { glint: false }) }, cam);
const camBars = (t) => { const s = SCN.bars, u = eio((t - s.t0 - .4) / (s.t1 - s.t0 - .4)); return camMix(camOn([900, 640], 1.15, 960, 580), camOn([720, 800], 1.9, 960, 620), u); };
SC.bars = (t, s) => barsWorld(t, camBars(t))
  + bd("pip", 250, 1076, 500, t, { in: s.t0 + .1, poses: [[s.t0, "sit"], [LE("n901p") + .1, "thinking"]], look: 3 })
  + bd("basil", 1430, 1010, 400, t, { in: s.t0 + .15, flip: true }) + bd("momo", 1720, 1076, 500, t, { in: s.t0 + .2, flip: true }) + smallPrint(t, s.t0 + .4, TOOLBOX_RULE) + HUD(t);
/* [LOOK CLOSER] is it a magnet? (lc20.js lcTestArt). Faces: Pip at the right the whole time (his question is answered: thinking; then
   listening: his mistake was fixed in the Showdown, no cheer); at the left Basil (pointing at bar B ON `push`; then teaching "bar B is the
   magnet"), then Momo (teaching THE REPEL TEST; cheer after her line: a key word learnt, achieved) */
SC.lctest = (t, s) => { window._BUBAT = { '*': [960, 905] }; const cE = camBars(SCN.bars.t1), p = camPt(cE, [720, 800]), tm = s.t0 + 1.2, tPu = MK("push"), tmo = LT("n906m") - .5;
  return lookCloser(t, s, { tz: s.t0, fx: p[0], fy: p[1], art: lcTestArt, bgc: "#FFF8EA", set: (tt) => barsWorld(tt, cE), verdict: [`IT REPELS, SO IT IS A MAGNET`, GOODC], tv: MK("v_test"), peek: false,
    over: (tt) => peekFace("pip", "r", tt, tm, undefined, [[tm + .2, "thinking"], [W("n903", "basils") - .2, "sit"]])
      + peekFace("basil", "l", tt, tPu - 1.2, tmo - .3, [[tPu + .1, "pointing"], [tPu + 2.4, "sit"]]) + peekFace("momo", "l", tt, tmo, undefined, [[LE("n906m") + .1, "cheer"], [LE("n906m") + 2.1, "sit"]], { achieved: true }) }); };
SC.mark2 = (t, s) => markScene(t, s, { id: "n908", sayId: "n907", who: "basil", n: "2 of 2", text: "A magnet can attract or repel another magnet. You can confirm that an object is a magnet if it repels another magnet.", keys: ["attract", "repel", "confirm", "repels"], size: 56, y: 240, footer: FOOT, achieved: true, poses: [[LE("n908") + .2, "cheer"], [LE("n908") + 2.0, "sit"]],
  under: TF(1300, 930, .8 * spring(t, s.t0 + .4, .5), `<g filter="url(#dropS)"><rect x="-420" y="-120" width="840" height="240" rx="30" fill="#FFF8EA"/></g>` + TF(-120, 10, .9, greyBar("B")) + barOnPencils(t, 230, -10, .6, { glint: false }) + ppArrows(t, 75, -10, "push", 1, { gap: 10, len: 34, w: 14 }) + T(80, 96, "it repels: a magnet", 34, PUSHC)) });
SC.chant = (t, s) => chantScene(t, s, "c1003", { sayId: "u1002", size: 46, x: 600, y0: 260, dy: 110, xs: [230, 560, 890], bh: 360, tx: 1290, ty: 560, sayX: 620, sayY: 600,
  board: (tt, flash) => TF(1700, 660, .7, chantBoard20(tt, flash)) });

/* 11 · score hand, the lizard (lizReveal onto the lizard upside down on the ceiling above the fridge: the REVEAL spot, never the intro wall
   by the light) and Momo's fun fact: tiny hairs on a toe pad (ff_toe), walking upside down (ff_ceiling), no glue and no magnet (ff_no). Pip
   points at the lizard as it is ringed, then is surprised ON ff_ceiling (a fun fact); Basil listens */
SC.final = (t, s) => { const L = "n1101"; return finalScene(t, s, L, 1, [[s.t0, null, 1], [W(L, "three") - .1, null, 3]]); };
SC.liz = (t, s) => { const L = "n1102", tq = W(L, "it") - .1, c = LZAT.liz, tc = W(L, "lizard");
  return lizReveal(t, s, L, KT20(t, { lizard: c, tableTop: ringsT(t) }), c[0], c[1] + 10, tq, "It was upside down on the ceiling!", -120, 160, 80, 3.2, { from: () => SC.final(SCN.final.t1 - .04, SCN.final), qx: 1000, qy: 724, tx: 960, ty: 985, tell: "n1104",
    fact: { id: "n1103m", at: [1270, 400], w: 900, h: 440, items: [["ff_toe", "tiny hairs", ffToe20], ["ff_ceiling", "upside down!", ffCeil20], ["ff_no", "no glue · no magnet", ffNo20]], cols: ["#E8A23A", "#5B6BD6", "#D6402E"], sx: 1300, sy: 860, poses: [[MK("ff_in") - .4, "sit"]] } })
    + bd("pip", 170, 1076, 330, t, { in: s.t0 + .6, poses: [[s.t0 + .6, "sit"], [tc + .1, "pointing"], [LT("n1103m") - .3, "sit"], [MK("ff_ceiling") + .1, "surprised"], [MK("ff_ceiling") + 2.2, "sit"]] })
    + bd("basil", 390, 1076, 330, t, { in: s.t0 + .7, poses: [[s.t0 + .7, "sit"]] }) + smallPrint(t, s.t0 + .5, LOOK_RULE); };

/* 12 · the dare for Episode 21: the kitchen table, the fridge card complete. Basil has hung his bar magnet on a string (tied round its middle,
   to a ruler laid across two piles of books): it hangs LEVEL (string). Pip gives it a gentle spin (spin): it turns, slows... and the cards slide
   in BEFORE it stops (no answer shown). ONE set of TWO big numbered cards (dareIn); NEXT · Where does it stop?; Lock in your answer! No compass,
   no N-S line, no North or South written anywhere. Basil a proud smile; Pip and Momo think on "Where does it stop?" (a question; no hints) */
const HANG = [700, 560];
const books = (x, y) => TF(x, y, 1, [["#E0453A", 0], ["#3A8DFF", 1], ["#43BF6C", 2], ["#FFC83A", 3]].map(([c, i]) => `<rect x="-60" y="${-26 - i * 26}" width="120" height="24" rx="4" fill="${c}" stroke="${P.ink}" stroke-width="3"/>`).join(""));
const spinAng = (t) => { const a = MK("spin"); if (t < a) return 4 * Math.sin(t * 1.3); const u = t - a; return 400 * (1 - Math.exp(-u * .45)) + 16 * u; };   // it slows but never settles in this scene
const dareWorld = (t, cam) => KT20(t, { tableTop: books(HANG[0] - 220, 836) + books(HANG[0] + 220, 836) + `<rect x="${HANG[0] - 290}" y="${836 - 116}" width="580" height="18" rx="6" fill="#E2B477" stroke="#9A6A34" stroke-width="4"/>`
  + TF(HANG[0], 836 - 100, .55, hangingMagnet(t, spinAng(t))) + ringsT(t) }, cam);
SC.dare = (t, s) => { const a = "n1201", tQ = MK("spinq") - .15, tc = [W(a, "one") - .1, W(a, "two") - .1], tL = W(a, "lock") - .1, e2 = eio(clamp((t - MK("dareIn") - .2) / 1.4));
  const cam = camMix(camOn([HANG[0], 760], 1.75, 960, 520), camOn([900, 640], 1.15, 960, 520), e2);
  return dareWorld(t, cam) + `<rect width="1920" height="1080" fill="${P.night}" opacity="${n2(.3 * e2)}"/>`
    + NEXT_CARDS.map((c, i) => { const t0 = MK("dareIn") + .5 + i * .25, pl = Math.max(pulse(t, tc[i], .04, .6), t >= tL ? (Math.floor((t - tL) / .5) % 2 === i ? .8 : 0) : 0); if (t < t0) return ""; const [x, d] = slideX(t, t0, .6, 2400, 600 + i * 400, 1020);
      return d + TF(x, 850, 1, choiceCard3(i + 1, c, darePic20(i, t), { w: 420, h: 330, size: 32, pulse: pl, id: "dr" })); }).join("")
    + (t >= tQ ? TF(1000, 150, spring(t, tQ, .45), tpill(0, 0, "NEXT · Where does it stop?", 52, P.ink, P.sun, { w: 700 })) : "")
    + (t >= tL ? TF(1000, 1030, spring(t, tL, .45), tpill(0, 0, "Lock in your answer!", 44, P.sun, P.ink, { w: 700 })) : "")
    + bd("basil", 230, 1076, 480, t, { in: s.t0 + .1, poses: [[s.t0, "sit"]] })
    + bd("pip", 1560, 1060, 400, t, { flip: true, in: s.t0 + .2, poses: [[s.t0, "sit"], [MK("spinq") + .2, "thinking"]], jump: [[MK("spin") - .2, 16]] })
    + bd("momo", 1790, 1066, 400, t, { flip: true, in: s.t0 + .3, poses: [[s.t0, "sit"], [MK("spinq") + .35, "thinking"]] }) + melt(t, s, "liz", .4) + HUD(t); };
SC.nyk = (t, s) => nykScene(t, s, fridgeCardAt(t, 930, 690, .98, { id: "ny" }) + TF(1290, 1030, .3, rings20(t)), { bx: [230, 1730, 1500], hx: 430 });
})(); }
