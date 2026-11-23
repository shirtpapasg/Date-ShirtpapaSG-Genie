// p2.js: PART 2, "Which Came First, the Chicken or the EGG?": the hen on her nest, Round 1 (which came first? neither), be an egg (round and
// back to an egg), the loop (REPEATED, NO FIRST OR LAST STAGE; Mark Sentence 5.16), the Showdown (Momo's homework: the mosquito and the
// mealworm beetle both have four stages), the two larvae (PHYSICAL FEATURES; Mark Sentence 5.12), why life cycles matter (the butterfly lays
// an egg; 5.17; the Cycles theme closes), the chant, the honeybee, the dare into EP19 (a magnet, a steel pin and a copper wire).
// Segments 1-15 of ../p3_ep18_script.md section 5 (version 1, 23 Nov 2026).
// STAGE 2 (drawn 2026-11-23): the garden's edge by the void deck (art18.js VGE: the hen on her straw nest under a low bush, the ixora, the lime
// plant with its small white flowers, the bench, the watering can) and our block's void deck with the LIFE CYCLE DAY board (VDK); the buddies
// stand IN the scene, big; the camera drifts or pushes in and never cuts inside a place. Every pose has its reason (SCENES_TODO.md); every
// action is drawn AT its mark (the sound keys on them).
if (PART === 2) { (() => {
const L1 = "d401";
// the scores (script section 3): Round 1 1 : 1 (Pip and Momo right: the Buddies score), Showdown 3 : 1 (built on Momo's mistake: no point)
SCORE.push([MK("coin1") - .1, 1, 1]);
SCORE.push([MK("coin2") - .1, 3, 1]);
const FOOT = "P3 · Life Cycles of Animals · Comparing life cycles";
const bd = (who, x, y, h, t, o = {}) => buddy(who, x, y, h, t, o);
const melt = (t, s, name, d = .4) => { const a = 1 - clamp((t - s.t0) / d); if (a <= .01) return ""; window._noHud = true; let v = ""; try { v = SC[name](SCN[name].t1 - .04, SCN[name]); } finally { window._noHud = false; } return OP(a, v); };
const R1C = ["The egg", "The chicken", "Neither: it goes round"];

/* 1 · "Last time...": three pictures from Part 1, one at a time, centred and large, a gentle push-in, one label each (>= 2.5 s each) */
SC.lasttime = (t, s) => { const tb = [s.t0, MK("pic2") - .2, MK("pic3") - .2], i = t >= tb[2] ? 2 : t >= tb[1] ? 1 : 0, labs = ["Frog and mosquito: same and different", "Three stages and four", "Which came first?"], u = t - tb[i], z = 1 + .05 * eio(u / 4), k = ramp(t, tb[i], .5);
  return bg("stage2") + OP(ramp(t, s.t0, .3), T(960, 110, "Last time…", 60, "#fff", { w: 600 }))
    + OP(k, TF(960, 540, z, `<g filter="url(#drop)"><rect x="-520" y="-300" width="1040" height="600" rx="36" fill="url(#gPaper)"/></g><clipPath id="rcp2"><rect x="-520" y="-300" width="1040" height="600" rx="36"/></clipPath><g clip-path="url(#rcp2)">${recapPic18(i, t)}</g>`))
    + OP(k, TF(960, 930, spring(t, tb[i] + .1, .4), tpill(0, 0, labs[i], 46, P.sun, P.ink, { w: 700 }))) + HUD(t); };
/* 2 · the garden's edge by the void deck, mid-morning: a slow drift from the block to the nest; henIn: the hen stands, turns her eggs with her
   beak and sits again. The honeybee on an ixora flower (the INTRO spot: the game pushes in here; never used again) */
const camPlace = (t) => { const u = eio((t - SCN.place.t0) / 2.6); return [lerp(1.08, 1.22, u), lerp(1200, 820, u), lerp(560, 760, u)]; };
const henAct = (t) => { const tI = MK("henIn"), lift = ss(tI, tI + .5, t) * (1 - ss(tI + 1.5, tI + 2.0, t)), peck = ss(tI + .4, tI + .7, t) * (1 - ss(tI + 1.2, tI + 1.5, t)); return { lift: lift * .75, peck }; };
SC.place = (t, s) => VGE(t, henAct(t), camPlace(t)) + OP(ramp(t, s.t0 + .2, .5), lowerPill(60, 96, "A community garden, Singapore ·", "morning")) + melt(t, s, "lasttime", .5) + HUD(t);
SC.game = (t, s) => { const cE = camPlace(SCN.place.t1), b = BEEAT.game;
  return gameScene(t, s, ["d201a", "d201b", "d201c"], false, { world: (tt) => VGE(tt, {}, cE), A: camPt(cE, [b[0], b[1]]), T: [700, 430], Z: 3.4 }) + smallPrint(t, LT("d201c"), LOOK_RULE); };
SC.goals = (t, s) => goals3(t, s, [["No first or last stage", ""], ["Same stages, still different", ""], ["Why life cycles matter", ""]], ["d301", "d302", "d303", "d304"], "basil");

/* 4 · Round 1: Basil's question. THREE big numbered picture cards (the egg · the chicken · neither: it goes round), the clue labels every egg
   came from a hen · every hen came from an egg ON TOP of the ring; in the ring the hen on her nest, the eggs showing. Basil leads */
SC.r1 = (t, s) => lockN(t, { t0: W(L1, "which") - .35, cards: R1C, clues: [["every egg came from a hen", W(L1, "egg")], ["every hen came from an egg", W(L1, "chicken")]], csize: 34, lead: "basil",
  pics: [0, 1, 2].map((i) => r1Pic18(i, t)), q: "Which came first?", tq: W(L1, "which") - .1,
  tc: [W(L1, "one", 1), W(L1, "two"), W(L1, "three")], ring0: MK("ring0_r1"), dur: 5, lock: "d402", obj: ringHen18,
  picks: [{ who: "basil", id: "d403", word: "1" }, { who: "pip", id: "d404", word: "3" }, { who: "momo", id: "d405", word: "3" }] });

/* 5 · Be an egg! By the nest: the buddies wave the viewer off (goodbye), then each shrinks with a pop; the camera glides down under the hen's
   warm feathers (a soft golden wipe); the journey (art18.js eggJourney18; the buddies ride along tucked in the straw); one pull back out */
const camEgg = (t) => { const s = SCN.waitw, u = ei((t - s.t0 - .8) / (s.t1 - s.t0 - .8)); return [lerp(1.25, 4.2, u), lerp(760, NEST18[0] - 10, u), lerp(900, NEST18[1] - 60, u)]; };
SC.waitw = (t, s) => { const L = "d601", tP = W(L, "be") - .15, sh = W(L, "shrink") - .1;
  const buds = ["momo", "pip", "basil"].map((w, i) => { const x = [260, 1450, 1720][i]; return bd(w, x, 1076, 440, t, { in: s.t0 + .1 + .05 * i, out: sh + .2 * i + .3, flip: x > 960, poses: [[s.t0, "sit"], [tP + .2 + .15 * i, "waving"]], wave: true }); }).join("");
  return VGE(t, { lift: 0 }, camEgg(t)) + OP(1 - ss(s.t1 - 1.4, s.t1 - .8, t), buds + (t >= tP ? TF(960, 250, spring(t, tP, .45), tpill(0, 0, "Be an egg!", 76, P.sun, P.ink, { w: 700 })) : "") + HUD(t)) + wipe(t, s.t1, "#E8A04A", 960, 600); };
SC.shrink = (t, s) => { const m = MK;
  const rp = { momo: [[m("jhatch") + .1, "surprised"], [m("jhatch") + 2.2, "sit"]], pip: [[W("d605", "where") + .3, "thinking"]] };
  return eggJourney18(t, s) + strawTuft(t, 260, 1080) + strawTuft(t, 1660, 1080)
    + riders(t, s, { tin: m("jegg") + .6, h: 200, at: { pip: [200, 1044], basil: [1700, 1050], momo: [400, 1040] }, poses: rp })
    + youTag(t, m("jegg"), "You: an egg") + feelTag(t, m("jchick"), m("jhen") - .1, "a chick", 160) + feelTag(t, m("jhen"), m("jlay") - .1, "an adult hen", 160) + feelTag(t, m("jlay"), m("jagain") + 2.5, "a new egg", 160)
    + speeded(t, m("jhatch"), m("jagain")); };
const strawTuft = (t, x, y) => TF(x, y, 1, [...Array(14)].map((_, i) => `<path d="M${n2(-260 + 40 * i)} ${n2(10 - 20 * hash(i, 3))} q${n2(40 + 20 * hash(i, 5))} ${n2(-50 - 30 * hash(i, 7) + 4 * Math.sin(t + i))} ${n2(90 + 30 * hash(i, 9))} -20" stroke="${i % 3 ? "#D9B86A" : "#B8944A"}" stroke-width="12" fill="none" stroke-linecap="round"/>`).join(""));
SC.pullout = (t, s) => { const u = 1 - eo((t - s.t0) / .6); return VGE(t, {}, [1.1 + 2.4 * u, 900, 760]) + bd("momo", 280, 1076, 470, t, { in: s.t0 + .2 }) + bd("basil", 1450, 1040, 400, t, { in: s.t0 + .25, flip: true }) + bd("pip", 1720, 1076, 470, t, { in: s.t0 + .3, flip: true }) + wipe(t, s.t0, "#FFFFFF") + HUD(t); };

/* 6 · the answer is three: neither. The garden: the hen on her nest; the three numbered cards small along the top (card 3 lit at ansglow, an
   x on card 1 and by Basil); the coin (the Buddies also score: two of three were right). OUTCOMES: Pip and Momo confident, Basil shy. The
   honeybee on the bench's armrest */
const camAns2 = (t) => [1.1, 900, 760];
SC.eggans = (t, s) => { const tA = MK("ansglow");
  return VGE(t, {}, camAns2(t)) + R1C.map((c, i) => TF(700 + i * 260, 180, .4 * spring(t, s.t0 + .2 + i * .08, .4), choiceCard3(i + 1, c, r1Pic18(i, t), { w: 400, h: 330, size: 36, lit: i === 2 && t >= tA ? spring(t, tA, .45) : 0, id: "ea" + i }))).join("") + xChip16(t, tA + .2, 770, 110, .8)
    + coin(t, MK("coin1") - .1, 1560, 400, "+1", "if you showed three fingers")
    + bd("momo", 260, 1076, 500, t, { in: s.t0 + .1, poses: [[s.t0, "sit"], [tA, "arms_crossed"]] }) + (t > s.t0 + .3 ? pickNum("momo", 420, 640, t, s.t0 + .3, "3") : "") + tickChip16(t, tA + .25, 470, 585, .7)
    + bd("basil", 1200, 1010, 380, t, { in: s.t0 + .15, flip: true, poses: [[s.t0, "sit"], [tA, "oops"]] }) + (t > s.t0 + .35 ? pickNum("basil", 1070, 690, t, s.t0 + .35, "1") : "") + xChip16(t, tA + .3, 1120, 635, .7)
    + bd("pip", 1700, 1076, 500, t, { in: s.t0 + .2, flip: true, poses: [[s.t0, "sit"], [tA, "arms_crossed"]] }) + (t > s.t0 + .4 ? pickNum("pip", 1860, 640, t, s.t0 + .4, "3") : "") + tickChip16(t, tA + .35, 1860, 580, .7)
    + melt(t, s, "pullout", .3) + HUD(t); };

/* 7 · [LOOK CLOSER] the chicken's loop (art18.js loopArt: a child's hand follows the arrows round from the chick, then from the hen; the day-
   and-night loop beside it; REPEATED and NO FIRST OR LAST STAGE pop, lib.js o.at). Faces: Momo at the left (she speaks), then Pip (cheer as NO
   FIRST OR LAST STAGE lands; he teaches); Basil at the right (his idea is tested: he listens, a nod as he learns) */
const peekFace = (who, side, t, tin, tout, poses) => { if (t < tin - .05 || (tout !== undefined && t > tout + .3)) return ""; const W_ = LCW, x = side === "l" ? W_.x - W_.w / 2 + 200 : W_.x + W_.w / 2 - 200;
  return bd(who, x, W_.y + W_.h / 2 + 470 * .42 + (1 - eo((t - tin) / .45)) * 350, 470, t, { in: tin, out: tout, poses: [[tin, "sit"], ...(poses || [])], peek: true, tag: false, shadow: false, flip: side === "r", nohop: true }); };
SC.lcloop = (t, s) => { window._BUBAT = { '*': [1080, 220] }; const cE = camAns2(SCN.eggans.t1), p = camPt(cE, [NEST18[0], NEST18[1] - 80]), tm = s.t0 + 1.2, tN = MK("kw_no_first_or_last_stage"), tp = LT("d703") + .2;
  return lookCloser(t, s, { tz: s.t0, fx: p[0], fy: p[1], art: loopArt, bgc: "#FFF8EA", set: (tt) => VGE(tt, {}, cE), verdict: [`NO FIRST OR LAST STAGE`, GOODC], tv: MK("v_loop"), peek: false,
    over: (tt) => peekFace("momo", "l", tt, tm, tp - .2) + peekFace("pip", "l", tt, tp, undefined, [[tN + .1, "cheer"], [tN + 2.3, "sit"]]) + peekFace("basil", "r", tt, tm, undefined, [[tm, "oops"], [MK("kw_repeated"), "sit"]]) }); };
SC.mark1 = (t, s) => markScene(t, s, { id: "d706", sayId: "d705", who: "basil", n: "1 of 2", text: "The stages in a life cycle are repeated. There is no first or last stage.", keys: ["repeated", "no", "first", "last", "stage"], size: 70, y: 250, footer: FOOT,
  under: TF(1300, 900, .9 * spring(t, s.t0 + .4, .5), TF(-160, 0, 1, loopN(t, chickPic, 3, { R: 82, r: 40, id: "m1c", sw: 7, run: s.t0 })) + TF(160, 0, .42, dayNight18(t, s.t0))) });

/* 8 · Showdown: Momo's homework on her easel at the void deck (art18.js momoSheet). The lines light as she reads them (l1, l2, l3). The YOU
   ring (5 s) big and central on the blue stage, the sheet big beside it; only Momo at the side (her thinking face stands in for worried).
   LOCKED IN!; Basil reveals (OUTCOMES at d804b: Basil and Pip confident, Momo shy). The honeybee on top of Momo's easel (not in the countdown) */
const EAS2 = [700, 1078, .66];
const hwLit = (t) => { const ms = [MK("l1"), MK("l2"), MK("l3"), LE("d802m") + .2]; return [0, 1, 2].map((i) => ss(ms[i] - .1, ms[i] + .3, t) * (1 - ss(ms[i + 1] - .2, ms[i + 1] + .2, t))); };
const camShow = (t) => { const e = eio((t - LT("d802m") + .6) / 1.2) * (1 - eio((t - MK("ring0_show") + 1) / .8)); return [lerp(1.05, 1.45, e), lerp(980, 700, e), lerp(560, 620, e)]; };
const showWorld = (t, cam, o = {}) => { const r0 = MK("ring0_show"), bell = MK("bell_show"), bee = !o.noBee && (t < r0 - 1 || t > bell + 1) ? beeAt(t, EAS2[0] + 120 * EAS2[2], EAS2[1] - 936 * EAS2[2], .32, 0) : "";
  return VDK(t, { cicAt: false, front: TF(EAS2[0], EAS2[1], EAS2[2], momoSheet(t, o.sheet || { lit: hwLit(t) })) + (o.can ? TF(900, 1070, .8, canArt17()) + (o.canBee ? beeAt(t, 900 + 130 * .8, 1070 - 132 * .8, .3, -20) : "") : "") + bee }, cam); };
SC.show = (t, s) => { window._BUBAT = { momo: [1320, 250], basil: [1330, 250], pip: [1330, 250] }; const r0 = MK("ring0_show"), bell = MK("bell_show"), rs = ringState(t, r0, 5), tS = LT("d803") - .08, inT = t >= r0 && t < bell, R = [1440, 430], RR = 200;
  const st = ss(r0 - .6, r0 - .1, t) * (1 - ss(bell + .6, bell + 1.1, t)), bob = inT ? 16 * Math.sin((t - r0) * Math.PI * 2) : 0, nf = inT ? (Math.floor(t - r0) % 3) + 1 : 3;
  return showWorld(t, camShow(t)) + `<rect width="1920" height="1080" fill="${P.night}" opacity=".08"/>` + OP(st, bg("stage"))
    + (st > .01 ? OP(st, TF(640, 1100, .86, momoSheet(t, { lit: [0, 0, 0] })) + TF(R[0], R[1], spring(t, r0 - .6, .45) * (1 + .035 * (inT ? rs.tick : 0)), `<g transform="translate(${-R[0]} ${-R[1]})">${ringTimer(R[0], R[1], t < r0 ? 1 : t < bell ? rs.frac : 0, t < r0 ? 5 : t < bell ? rs.secs : 0, t, { R: RR, sw: 32, tick: rs.tick, shut: pulse(t, bell, .01, .6), chg: inT || (t >= bell && t < bell + .5) ? (t >= bell ? bell : rs.chg) : -9, ns: 1.2,
      inner: `<circle cx="${R[0]}" cy="${R[1]}" r="${RR - 24}" fill="#FFF8EA"/>` + TF(R[0], R[1] + 30 + bob * .3, .75, `<g filter="url(#dropS)">${countHand(nf)}</g>`) })}</g>`) + youPill(R[0] - 230, R[1] - 170, 1.1) + TF(R[0], 760, 1, tpill(0, 0, "line 1, 2 or 3?", 48, P.ink, "#fff", { w: 700 }))) : "")
    + bd("momo", 210, 1076, 500, t, { in: s.t0 + .1, rock: inT ? 2 : 0, poses: [[s.t0, "sit"], [LT("d801") + 1, "pointing"], [LT("d801") + 3.4, "sit"], [r0 - .3, "worried"], [bell + .35, "sit"], [LT("d804b"), "oops"]], jump: [[bell + .02, 26]] })
    + bd("pip", 1450, 1020, 380, t, { in: bell + .4, flip: true, poses: [[bell + .4, "sit"], [LT("d804b"), "arms_crossed"]] }) + (t > bell + .6 ? pickNum("pip", 1330, 700, t, bell + .6, "3") : "")
    + bd("basil", 1720, 1076, 500, t, { in: bell + .3, flip: true, poses: [[bell + .3, "sit"], [LT("d804b"), "arms_crossed"]] }) + (t > bell + .5 ? pickNum("basil", 1580, 640, t, LT("d804b") - .1, "3") : "")
    + stamp(t, tS, 960, 460) + bellIcon(t, r0) + melt(t, s, "showcard", .3) + HUD(t); };
/* the fix: line 3 struck (strike) and rewritten in green (rewrite); the beetle's faint pupa tile glows bright; the coin +2 (coin2). Momo nods at
   the green rewrite (listening); the honeybee on the watering can's spout by the easel */
SC.fix = (t, s) => { window._BUBAT = { '*': [1330, 250] }; const st = ss(MK("strike"), MK("strike") + .4, t), fx = ss(MK("rewrite"), MK("rewrite") + .8, t), pu = ss(MK("rewrite") + .6, MK("rewrite") + 1.2, t), e = eio((t - s.t0) / 1);
  return showWorld(t, [lerp(1.2, 1.3, e), lerp(820, 700, e), lerp(700, 900, e)], { noBee: true, can: true, canBee: true, sheet: { strike: st, fix: fx, pupa: pu, lit: [0, 0, 0] } })
    + coin(t, MK("coin2") - .1, 1560, 330, "+2", "line 3")
    + bd("momo", 210, 1076, 500, t, { in: s.t0 + .05, poses: [[s.t0, "oops"]] }) + bd("pip", 1450, 1020, 380, t, { in: s.t0 + .1, flip: true, poses: [[s.t0, "arms_crossed"]] }) + bd("basil", 1720, 1076, 500, t, { in: s.t0 + .1, flip: true, poses: [[s.t0, "arms_crossed"]] }) + HUD(t); };

/* 9 · "So how are they different?" The void deck table: the class mealworm tub (oat bran, mealworms, the lid with air holes) beside a card of a
   jar of still water with a wriggler drawn on it. Momo talks (fixing her own count), then thinks (her real question). The honeybee on the
   rim of the tub's lid */
const TUB = [930, 900], camTub = (t) => { const e = eio((t - SCN.beetle.t0) / 2.5); return [lerp(1.05, 1.5, e), lerp(980, 1000, e), lerp(620, 800, e)]; };
const tubItems = (t, bee) => TF(TUB[0], TUB[1], .8, tub18(t)) + TF(1170, 860, .62, jarCard18(t)) + (bee ? beeAt(t, TUB[0] + 120, TUB[1] - 160, .28, 0) : "");
SC.beetle = (t, s) => { window._BUBAT = { momo: [760, 300] }; return VDK(t, { cicAt: false, front: tubItems(t, true) }, camTub(t))
  + bd("momo", 280, 1076, 500, t, { in: s.t0 + .1, poses: [[s.t0, "sit"], [LE("d901m") + .1, "thinking"]] })
  + bd("pip", 1450, 1020, 380, t, { in: s.t0 + .15, flip: true }) + bd("basil", 1720, 1076, 500, t, { in: s.t0 + .2, flip: true })
  + smallPrint(t, s.t0 + .4, MEAL_RULE) + melt(t, s, "fix", .3) + HUD(t); };
/* [LOOK CLOSER] the two larvae (art18.js larvaeArt: the band of both loops, four tiles each; the wriggler and the mealworm; PHYSICAL FEATURES,
   lib.js o.at). Faces: Basil (auto, left: he teaches); Momo at the right (her question is still open: thinking; cheer at the verdict: her
   mistake is fixed and a term learnt) */
SC.lcbeetle = (t, s) => { window._BUBAT = { '*': [1250, 225] }; const cE = camTub(SCN.beetle.t1), p = camPt(cE, [TUB[0], TUB[1] - 80]), tm = s.t0 + 1.2;
  return lookCloser(t, s, { tz: s.t0, fx: p[0], fy: p[1], art: larvaeArt, bgc: "#FFF8EA", set: (tt) => VDK(tt, { cicAt: false, front: tubItems(tt) }, cE), verdict: [`SAME STAGES, STILL DIFFERENT`, GOODC], tv: MK("v_beetle"), peekH: 470,
    over: (tt) => peekFace("momo", "r", tt, tm, undefined, [[tm + .2, "thinking"], [MK("v_beetle") + .1, "cheer"]]) }); };
SC.mark2 = (t, s) => markScene(t, s, { id: "d906", sayId: "d905", who: "pip", n: "2 of 2", text: "Observable characteristics include the number of stages and the physical features of the animals.", keys: ["observable", "characteristics", "number", "stages", "physical", "features"], size: 60, y: 235, footer: FOOT,
  under: TF(1300, 900, .9 * spring(t, s.t0 + .4, .5), `<g filter="url(#dropS)"><rect x="-330" y="-110" width="660" height="220" rx="24" fill="#FFF8EA"/></g><rect x="-310" y="-90" width="300" height="180" rx="16" fill="#BFE7E0"/><path d="M-310 -60 H-10" stroke="#fff" stroke-width="5"/>` + TF(-160, -60, .6, wrig17(t, { lean: 18, wig: .2 })) + `<rect x="10" y="-90" width="300" height="180" rx="16" fill="#F3E2BC"/>` + TF(160, 10, .55, mealworm18(t, {})) + eqDisc(t, s.t0 + .6, 0, 0, "≠", .55)) });

/* 10 · why life cycles matter: the lime plant (EP17's): the lime butterfly flutters in and lands on a young leaf (butterfly); she leaves ONE tiny
   round egg on the leaf's tip (lay); the book's 5.17 on its cream strip (Heart reads it); Momo's picture model (fewer, plant); the OUR CYCLES
   THEME board slides in at the left (theme). Momo points at the butterfly as she lays; Basil cheers as the loop glows again (plant). The
   honeybee on the rim of the lime plant's pot */
const camClose = (t) => { const a = eio((t - MK("butterfly") + 1.5) / 1.6) * (1 - eio((t - LT("d1003") + .4) / 1.4)), z = lerp(1.05, 2.1, a); return [z, lerp(1000, (2.1 * LT_EGG[0] - 960) / 1.1, a), lerp(560, (2.1 * LT_EGG[1] - 640) / 1.1, a)]; };
const bflyPath = (t) => { const tb = MK("butterfly"), u = clamp((t - tb + 2.4) / 2.4), lx = LT_EGG[0] - 40, ly = LT_EGG[1] - 30; if (u < 1) return { x: lerp(1900, lx, eo(u)), y: lerp(160, ly, eo(u)) + 60 * Math.sin(u * 9) * (1 - u), k: .42, rot: 0 };
  const lv = clamp((t - MK("fewer") + 3) / 2.5); return { x: lx + 700 * lv * lv, y: ly - 300 * lv, k: .42, rot: 0 }; };
SC.closure = (t, s) => { window._BUBAT = { momo: [960, 230] }; const tl = MK("lay"), bp = bflyPath(t), egg = t >= tl + .3, tf = MK("fewer"), tp = MK("plant"), th = MK("theme"), tb = tp + .5;
  const curl = t > tl - .4 && t < tl + 1 ? Math.sin(Math.PI * (t - tl + .4) / 1.4) : 0;
  const fly = bflySide(t, { slow: t > MK("butterfly") && t < tf - 3 });
  const world = VGE(t, { egg: egg ? 1 : false, items: "" }, camClose(t)), bfx = camPt(camClose(t), [bp.x, bp.y]), zk = camClose(t)[0];
  const model = t >= tf - .6 ? OP(1 - ss(tb + .4, tb + .8, t), TF(1000, 560, .95 * spring(t, tf - .6, .45), fewerModel(t, tf, tp))) : "";
  const theme = t >= tb ? TF(lerp(-500, 980, eo((t - tb) / .8)), 1076, .95, themeBoard(t, [0, 1, 2].map((i) => ss(th - .9 + .45 * i, th - .6 + .45 * i, t)))) : "";
  return world + TF(bfx[0], bfx[1], bp.k * zk, `<g transform="rotate(${n2(-20 * curl)})">${fly}</g>`) + (t >= tl && t < tl + 2.5 ? TF(bfx[0] - 60 * zk, bfx[1] + 30 * zk, spring(t, tl, .4), tpill(0, 0, "one tiny egg", 36, "#fff", P.ink, { w: 700 })) : "")
    + (t >= tf - .6 ? `<rect width="1920" height="1080" fill="${P.night}" opacity="${n2(.35 * ss(tf - .6, tf, t))}"/>` : "") + model + theme
    + strip15(t, "d1003", "Life cycles ensure that living things of the same kind can continue to live on Earth.", 150, { keys: ["ensure", "same", "kind", "continue"], maxW: 1150, x: 720, size: 46 })
    + bd("momo", 230, 1076, 500, t, { in: s.t0 + .1, poses: [[s.t0, "sit"], [tl - .3, "pointing"], [tl + 2.2, "sit"]] })
    + bd("basil", 1400, 1000, 380, t, { in: s.t0 + .15, flip: true, poses: [[s.t0, "sit"], [tp + .1, "cheer"], [tp + 2.3, "sit"]] })
    + bd("pip", 1720, 1076, 500, t, { in: s.t0 + .2, flip: true }) + melt(t, s, "mark2", .4) + HUD(t); };
SC.chant = (t, s) => chantScene(t, s, "c1003", { sayId: "u1002", size: 50, x: 620, y0: 260, dy: 110, xs: [230, 560, 890], bh: 360, tx: 1180, ty: 520, sayX: 620, sayY: 600,
  board: (tt, flash) => TF(1440, 650, .82, chantBoard18(tt, flash)) });

/* 12 · score hand, the honeybee (lizReveal onto a white flower of the lime plant: the REVEAL spot, never the intro ixora) and Pip's fun fact: a
   queen honeybee on her comb (ff_queen); the cells filling with eggs past 1000 in one day (ff_eggs). Basil points at the bee as it is ringed;
   Momo surprised on "thousand" */
SC.final = (t, s) => { const L = "d1201"; return finalScene(t, s, L, 1, [[s.t0, null, 1], [W(L, "three") - .1, null, 3]]); };
SC.liz = (t, s) => { const L = "d1202", tq = W(L, "it") - .1, b = BEEAT.liz, tb = W(L, "honeybee"), tt = W("d1203p", "thousand") - .1;
  return lizReveal(t, s, L, VGE(t, { beeAt: b }), b[0], b[1], tq, "It was on a flower of the lime plant!", -120, 160, 80, 3.0, { from: () => SC.final(SCN.final.t1 - .04, SCN.final), qx: 1000, qy: 700, tx: 960, ty: 985, tell: "d1204",
    fact: { id: "d1203p", at: [1270, 400], w: 820, h: 440, items: [["ff_queen", "a queen honeybee", ffQueen18], ["ff_eggs", "more than 1000 eggs in a day!", ffEggs18]], cols: ["#E8A23A", "#2FA35A"], sx: 1300, sy: 860, poses: [[MK("ff_in") - .4, "sit"]] } })
    + bd("basil", 170, 1076, 330, t, { in: s.t0 + .6, poses: [[s.t0 + .6, "sit"], [tb + .1, "pointing"], [LT("d1203p") - .3, "sit"]] })
    + bd("momo", 390, 1076, 330, t, { in: s.t0 + .7, poses: [[s.t0 + .7, "sit"], [tt, "surprised"], [tt + 2.2, "sit"]] }) + smallPrint(t, s.t0 + .5, LOOK_RULE); };
/* 13 · the dare for Episode 19: the void deck: Basil's red-and-blue bar magnet holds a card on the board's metal clip; a steel pin and a short
   copper wire on the table; ONE set of THREE big numbered picture cards slides in low (dareIn); the banner; Momo and Pip think (a question,
   no hints), Basil a proud smile by his magnet */
const MAGP = [640, 250];
SC.dare = (t, s) => { const a = "d1301", tQ = W(a, "which") - .15, tc = [W(a, "one", 1) - .1, W(a, "two") - .1, W(a, "three") - .1], tL = W(a, "lock") - .1, e1 = eio((t - s.t0 - 1) / 1.6), e2 = eio((t - W(a, "pin") + .2) / 1.2), e3 = eio((t - tQ + .5) / 1.4);
  const cam = [lerp(lerp(lerp(1.8, 1.6, e2), 1.04, e3), 1.8, 0), lerp(lerp(MAGP[0] - 120, 1000, e2), 1000, e3), lerp(lerp(MAGP[1] + 120, 860, e2), 600, e3)];
  const items = `<rect x="${MAGP[0] - 10}" y="${MAGP[1] - 70}" width="40" height="260" rx="6" fill="#B9C4D0" stroke="#7A8798" stroke-width="4"/>` + TF(MAGP[0] + 70, MAGP[1] + 70, 1, `<g filter="url(#dropS)"><rect x="-90" y="-60" width="180" height="130" rx="10" fill="#FFFDF6" transform="rotate(${n2(-4 + 2 * Math.sin(t * 3))})"/></g>` + T(0, 0, "NEXT TIME:", 22, P.ink) + T(0, 34, "magnets!", 26, "#C4581E"))
    + TF(MAGP[0] + 10, MAGP[1] + 10, .55, magnet18(), 90);
  const table = TF(TABLE18[0] - 90, TABLE18[1] - 22, .8, pin18()) + TF(TABLE18[0] + 120, TABLE18[1] - 10, .8, wire18());
  return VDK(t, { cicAt: false, items, front: table }, cam) + `<rect width="1920" height="1080" fill="${P.night}" opacity="${n2(.3 * e3)}"/>`
    + NEXT_CARDS.map((c, i) => { const t0 = Math.max(MK("dareIn") + .5, tQ) + i * .25, pl = Math.max(pulse(t, tc[i], .04, .6), t >= tL ? (Math.floor((t - tL) / .5) % 3 === i ? .8 : 0) : 0); if (t < t0) return ""; const [x, d] = slideX(t, t0, .6, 2400, 620 + i * 340, 1020);
      return d + TF(x, 870, .78, choiceCard3(i + 1, c, darePic3(i), { w: 400, h: 330, size: 36, pulse: pl, id: "dr" })); }).join("")
    + (t >= tQ ? TF(1000, 150, spring(t, tQ, .45), tpill(0, 0, "NEXT · Which will the magnet pull?", 48, P.ink, P.sun, { w: 700 })) : "")
    + (t >= tL ? TF(1000, 1030, spring(t, tL, .45), tpill(0, 0, "Lock in your answer!", 44, P.sun, P.ink, { w: 700 })) : "")
    + bd("basil", 230, 1076, 480, t, { in: s.t0 + .1, poses: [[s.t0, "sit"]] })
    + bd("momo", 1560, 1060, 400, t, { flip: true, in: s.t0 + .2, poses: [[s.t0, "sit"], [tQ + .3, "thinking"]] })
    + bd("pip", 1790, 1066, 400, t, { flip: true, in: s.t0 + .3, poses: [[s.t0, "sit"], [tQ + .4, "thinking"]] }) + melt(t, s, "liz", .4) + HUD(t); };
SC.nyk = (t, s) => nykScene(t, s, TF(960, 660, .75, compareFrame(t, { id: "nk2", same: [[0, "eggs in water"], [0, "young unlike the adult"]], diff: [[0, "the number of stages"]], words: true }) + TF(0, 330, 1, loopN(t, chickPic, 3, { R: 70, r: 34, id: "nkc", sw: 7, run: 0 }))), { bx: [230, 1720, 1420], hx: 470 });
})(); }
