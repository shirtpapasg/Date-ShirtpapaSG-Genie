// p2.js: PART 2, "The Mango or the Seed: Which Came FIRST?": the adult plant (flowers and fruits), where new seeds come from, the three
// stages round a loop (no first or last stage), why Singapore keeps a seed bank. Segments 1-14 of ../p3_ep15_script.md (version 1).
// STAGE 2 (drawn 2026-11-23): the community garden beside the block with the big old mango tree (garden15.js), our young plant on the bench,
// life always moving (leaves, flowers, a butterfly, a bird, the pond); the buddies stand in the garden, big, reacting to every line; the board
// OUR MANGO'S LIFE CYCLE keeps one home; the camera pushes or drifts and never cuts inside the garden. Every action is drawn AT its mark.
if (PART === 2) { (() => {
const L1 = "j401";
// the scores (script section 3): Round 1 1 : 1 (Basil and Momo right: the Buddies score), Showdown 3 : 1 (built on Momo's mistake: no point)
SCORE.push([MK("coin1") - .1, 1, 1]);
SCORE.push([MK("coin2") - .1, 3, 1]);
const FOOT = "P3 · Life Cycles · The life cycle of a plant";
const slamFit = (y, txt, col, k) => slamLine(y, txt, Math.min(170, 170 * 1720 / tw(txt, 170, 700, "Fredoka", 4)), col, k);
const knife = (t, t0) => smallPrint(t, t0, KNIFE_RULE);
const qMark = (t, t0, x, y, r = 50) => t < t0 ? "" : TF(x, y, spring(t, t0, .5) * (1 + .05 * Math.sin(t * 4)), `<g filter="url(#dropS)"><circle r="${r}" fill="url(#gSun)"/></g>${T(0, r * .52, "?", r * 1.56, P.ink)}`);
const xChip = (t, t0, x, y, s = 1) => t < t0 ? "" : TF(x, y, spring(t, t0, .4) * s, `<g filter="url(#dropS)"><circle r="30" fill="#fff" stroke="${P.ink}" stroke-width="4"/></g><path d="M-12 -12 L12 12 M12 -12 L-12 12" stroke="${P.ink}" stroke-width="7" stroke-linecap="round"/>`);
const bd = (who, x, y, h, t, o = {}) => buddy(who, x, y, h, t, o);
const melt = (t, s, name, d = .4) => { const a = 1 - clamp((t - s.t0) / d); if (a <= .01) return ""; window._noHud = true; let v = ""; try { v = SC[name](SCN[name].t1 - .04, SCN[name]); } finally { window._noHud = false; } return OP(a, v); };
const antOn = (t, x, y, o = {}) => `<g transform="translate(${x - 26} ${y + 2}) rotate(${o.lr || 0})">${leaf15(70, 18, "#7CC97A", "#2F7A45")}</g>` + antAt(t, x, y, .3, o);
// a thought bubble with a picture inside (a buddy's IDEA, never a fact: it carries a ?). origin = the bubble's centre; dir = where its tail goes
const ideaBubble = (t, t0, t1, x, y, pic, col, dir = 1) => { if (t < t0 || t > t1 + .25) return ""; const k = spring(t, t0, .4) * (1 - eo((t - t1) / .2));
  return TF(x, y, k, `<g filter="url(#dropS)"><ellipse rx="300" ry="190" fill="#FFF8EA" stroke="${col}" stroke-width="8"/><circle cx="${dir * 220}" cy="210" r="30" fill="#FFF8EA" stroke="${col}" stroke-width="6"/><circle cx="${dir * 280}" cy="270" r="16" fill="#FFF8EA" stroke="${col}" stroke-width="5"/></g><clipPath id="ib${n2(x)}"><ellipse rx="280" ry="172"/></clipPath><g clip-path="url(#ib${n2(x)})">${pic}</g>` + TF(250, -150, 1 + .06 * Math.sin(t * 4), `<g filter="url(#dropS)"><circle r="44" fill="url(#gSun)"/></g>${T(0, 22, "?", 66, P.ink)}`)); };

/* 1 · "Last time...": three pictures from Part 1, one at a time, centred and large, a gentle push-in, one label each (>= 2.5 s each) */
SC.lasttime = (t, s) => { const tb = [s.t0, MK("pic2") - .2, MK("pic3") - .2], i = t >= tb[2] ? 2 : t >= tb[1] ? 1 : 0, labs = ["We planted a mango seed", "We observed it like a scientist", "It grew into a young plant"], u = t - tb[i], z = 1 + .05 * eio(u / 4), k = ramp(t, tb[i], .5);
  return bg("stage2") + OP(ramp(t, s.t0, .3), T(960, 110, "Last time…", 60, "#fff", { w: 600 }))
    + OP(k, TF(960, 530, z, `<g filter="url(#drop)"><rect x="-536" y="-316" width="1072" height="632" rx="40" fill="url(#gPaper)"/></g><clipPath id="rcp"><rect x="-520" y="-300" width="1040" height="600" rx="30"/></clipPath><g clip-path="url(#rcp)">${recapPic(i, t)}</g>`))
    + OP(k, TF(960, 930, spring(t, tb[i] + .1, .4), tpill(0, 0, labs[i], 46, P.sun, P.ink, { w: 700 }))) + HUD(t); };
/* 2 · the community garden beside the block: a slow drift across to the old mango tree; an adult sets our young plant in its pot on the bench
   (potdown); the location pill */
const camPlace = (t) => { const u = eio((t - SCN.place.t0) / (SCN.game.t0 - SCN.place.t0 + 1)); return [1 + .06 * u, lerp(820, 1060, u), 560]; };
SC.place = (t, s) => { const tp = MK("potdown"), d = ss(tp, tp + .9, t), hk = 1 - ss(tp + 1, tp + 1.6, t);
  return VG15(t, { pot: false, items: TF(POT2[0], POT2[1] - 90 * (1 - d), .6, pot15({}) + TF(0, POTS, 1, youngPlant15(t, { h: 250, n: 8, red: 0, k: 1.1 }))) + (hk > .01 ? TF(POT2[0] + 60, POT2[1] - 130 - 90 * (1 - d) - 200 * (1 - hk), .5, hand15({ curl: .4 }), 120) + TF(POT2[0] - 80, POT2[1] - 130 - 90 * (1 - d) - 200 * (1 - hk), .5, hand15({ curl: .4 }), 60, -.5) : "") }, camPlace(t))
    + OP(ramp(t, s.t0 + .2, .5), lowerPill(60, 96, "A community garden, Singapore ·", "morning")) + melt(t, s, "lasttime", .5) + HUD(t); };
SC.game = (t, s) => { const cE = camPlace(SCN.game.t0), a = ANTAT.game, tA = W("j201a", "ant");
  return gameScene(t, s, ["j201a", "j201b", "j201c"], false, { world: (tt) => VG15(tt, { ant: false, items: antOn(tt, a[0], a[1], { wave: ss(tA, tA + .4, tt) * (1 - ss(tA + 1.8, tA + 2.2, tt)) }) }, cE), A: camPt(cE, [a[0], a[1] - 14]), T: [640, 440], Z: 3.4, dim0: 0 }) + finePrint(t, s.t0 + 2, ANT_RULE, 1250, 1040); };
SC.goals = (t, s) => goals3(t, s, [["The 3 plant stages", ""], ["No first or last stage", ""], ["Why seeds are saved", ""]], ["j301", "j302", "j303", "j304"], "pip");

/* 4 · Round 1: the old tree in flower. Which stage? ONE set of three big numbered picture cards (the seed · the young plant · the adult plant),
   the clue labels ON TOP of the ring; in the ring a spray of tiny mango flowers on its branch, swaying */
SC.r1card = (t, s) => roundCard(t, s, "ROUND 1");
const cardPic = (i, t) => `<rect x="-200" y="-140" width="400" height="280" fill="${["#FFF0D6", "#DFF3D2", "#DCEFFB"][i]}"/>` + TF(0, i === 0 ? 0 : 6, i === 0 ? 1.5 : 1.25, tilePic(i, t));
const ringFlowers = (tt) => `<path d="M250 620 Q400 560 620 540" stroke="#7A5230" stroke-width="22" fill="none" stroke-linecap="round"/>` + [[300, 600, -150], [520, 560, -40], [580, 548, 20]].map(([x, y, a]) => `<g transform="translate(${x} ${y}) rotate(${a})">${leaf15(90, 20, "#4FA866", "#2A6E3E")}</g>`).join("") + flowerSpray(tt, 420, 590, 2.1, 0, { big: true });
SC.r1 = (t, s) => lockN(t, { t0: W(L1, "this") - .35, cards: ["The seed", "The young plant", "The adult plant"], clues: [["tiny flowers", W(L1, "flowers")]], csize: 34, lead: "pip",
  pics: [0, 1, 2].map((i) => cardPic(i, 0)), q: "Which stage is it in?", tq: W(L1, "which") - .1,
  tc: [W(L1, "one"), W(L1, "two"), W(L1, "three")], ring0: MK("ring0_r1"), dur: 5, lock: "j402", obj: ringFlowers,
  picks: [{ who: "pip", id: "j403", word: "2" }, { who: "basil", id: "j404", word: "3" }, { who: "momo", id: "j405", word: "3" }],
  react: [[LE("j403") + .1, "pip", "thinking"], [LE("j404") + .1, "basil", "cheer"], [LE("j405") + .1, "momo", "pointing"]] });

/* 5 · [LOOK CLOSER] our young plant beside the old tree (garden15.js adultArt), the book's strip (Heart reads it), ADULT PLANT pops */
const camG = [1.08, 1040, 560];
SC.lcadult = (t, s) => { const p = camPt(camG, [1060, 560]);
  return lookCloser(t, s, { tz: s.t0, fx: p[0], fy: p[1], art: adultArt, bgc: "#DCEFFB", set: (tt) => VG15(tt, {}, camG), verdict: [`FLOWERS AND FRUITS: AN ADULT PLANT`, GOODC], tv: MK("v_adult"), peekSide: "c", peekH: 430,
    over: (tt) => strip15(tt, "j506", "The young plant grew into an adult plant. The adult plant started to have flowers and fruits.", 150, { keys: ["young", "adult", "plant", "flowers", "fruits"], t1: LE("j506") + 1.2 }) }); };
/* the answer is three: the adult plant. The three picture cards along the foot of the frame, card 3 glows; x chips on card 2 and by Pip; the
   coin (the Buddies also score); Basil and Momo confident, Pip shy (lib.js OUTCOMES). The ant: on a low mango */
const ACX = [690, 920, 1150];
SC.adultans = (t, s) => { const tA = MK("ansglow");
  return VG15(t, {}, [1.04 + .03 * eio((t - s.t0) / 5), 1060, 560]) + ["The seed", "The young plant", "The adult plant"].map((c, i) => TF(ACX[i], 940, .56 * spring(t, s.t0 + .2 + i * .08, .4), choiceCard3(i + 1, c, cardPic(i, t), { w: 370, h: 330, size: 34, lit: i === 2 && t >= tA ? spring(t, tA, .45) : 0, id: "aa" }))).join("") + xChip(t, tA + .2, ACX[1] + 80, 850)
    + coin(t, MK("coin1") - .1, 960, 330, "+1", "if you showed three fingers")
    + bd("pip", 300, 1076, 380, t, { in: s.t0 + .1, poses: [[s.t0, "sit"]] }) + (t > s.t0 + .3 ? pickNum("pip", 430, 830, t, s.t0 + .3, "2") : "") + xChip(t, tA + .4, 470, 780, .7)
    + bd("momo", 1420, 1070, 380, t, { in: s.t0 + .15, flip: true, poses: [[s.t0, "sit"]] }) + (t > s.t0 + .35 ? pickNum("momo", 1290, 840, t, s.t0 + .35, "3") : "")
    + bd("basil", 1720, 1076, 520, t, { in: s.t0 + .1, flip: true, poses: [[s.t0, "sit"]], jump: [[tA + .05, 30]] }) + (t > s.t0 + .3 ? pickNum("basil", 1540, 780, t, s.t0 + .3, "3") : "") + HUD(t); };

/* 6 · "Where do new mango seeds come from?" Under the old tree: Momo big at the left asks; Basil big at the right is sure: his IDEA (a thought
   bubble with a ?) shows seeds popping out of the roots under the ground. The camera moves from Momo to Basil */
const rootIdea = (t) => `<rect x="-300" y="-200" width="600" height="400" fill="#CFEAF8"/><rect x="-300" y="-40" width="600" height="240" fill="#7A5434"/><rect x="-300" y="-52" width="600" height="16" fill="#7FC566"/><path d="M-20 -200 V-40" stroke="#7A5230" stroke-width="40"/><path d="M-20 -40 Q-80 40 -180 90 M-20 -40 Q30 60 140 110 M-20 -40 V140" stroke="#A9774A" stroke-width="12" fill="none" stroke-linecap="round"/>`
  + [[-170, 110, 0], [150, 130, .5], [-10, 160, 1]].map(([x, y, p]) => TF(x, y - 18 * Math.abs(Math.sin(t * 3 + p * 3)), .36, mangoSeed(1, 20))).join("");
SC.seeds = (t, s) => { const u = eio((t - LT("j602b") + .5) / 1.4), cam = [1.1, lerp(800, 1260, u), 600];
  return VG15(t, {}, cam) + bd("momo", 330, 1076, 520, t, { in: s.t0 + .05, poses: [[s.t0, "sit"], [LE("j601m") + .1, "thinking"]], look: 3 })
    + bd("basil", 1620, 1076, 520, t, { in: s.t0 + .1, flip: true, poses: [[s.t0, "sit"], [LE("j602b") + .1, "cheer"]], look: -3, nohop: true }) + ideaBubble(t, W("j602b", "roots") - .2, s.t1 + .3, 1040, 330, rootIdea(t), P.basil, 1) + HUD(t); };

/* 6 · Be a mango flower! The pill, the buddies wave us off, ONE glide up the trunk into a spray of tiny flowers (a soft cream wipe); the journey
   (garden15.js flowerJourney; the buddies ride along on the branch); then one pull back out */
const SPR = [1060, 300];
const camUp = (dive, e) => { const m = Math.max(e * .4, dive); return [1.1 + .2 * e + 5.4 * dive, lerp(1000, SPR[0], m), lerp(560, SPR[1] - 40, m)]; };
SC.waitw = (t, s) => { const L = "j603", dive = ei((t - (s.t1 - 1.6)) / 1.6), e = eio((t - s.t0) / 1.4), tP = W(L, "be") - .15;
  return VG15(t, {}, camUp(dive, e)) + OP(1 - dive * 1.7, bd("momo", 300, 1076, 430, t, { in: s.t0 + .1, poses: [[s.t0, "sit"], [tP + .2, "cheer"]], wave: true }) + bd("pip", 620, 1070, 360, t, { in: s.t0 + .15, poses: [[s.t0, "sit"], [tP + .5, "waving"]], wave: true })
      + bd("basil", 1700, 1076, 450, t, { in: s.t0 + .1, flip: true, poses: [[s.t0, "sit"], [tP + .35, "waving"]], wave: true })
      + (t >= tP ? TF(960, 250, spring(t, tP, .45), tpill(0, 0, "Be a mango flower!", 76, P.sun, P.ink, { w: 700 })) : "") + HUD(t)) + wipe(t, s.t1, "#FFF6DA", 960, 540); };
SC.shrink = (t, s) => { const m = MK, rp = (w) => w === "momo" ? [[m("jpetals") + .2, "surprised"], [m("jgreen") + 1, "sit"], [m("jnew") + .2, "cheer"]] : w === "basil" ? [[m("jbig") + .3, "oops"], [m("jseed") + 1.2, "sit"], [m("jnew") + .3, "cheer"]] : [[m("jseed") + .3, "pointing"], [m("jripe"), "sit"], [m("jnew") + .1, "cheer"]];
  return flowerJourney(t, s) + riders(t, s, { tin: m("jflower") + .6, h: 170, at: { pip: [200, 1044], basil: [1720, 1050], momo: [380, 1040] }, poses: { pip: rp("pip"), basil: rp("basil"), momo: rp("momo") } })
    + youTag(t, m("jflower"), "You: a tiny mango flower") + feelTag(t, m("jgreen"), m("jbig") - .1, "a tiny green mango", 160) + feelTag(t, m("jseed"), m("jripe") - .1, "a seed grows inside", 160) + feelTag(t, m("jnew"), m("jnew") + 3, "a ripe mango, with a new seed inside", 160); };
SC.pullout = (t, s) => { const u = 1 - eo((t - s.t0) / .6); return VG15(t, {}, camUp(u, u)) + bd("momo", 300, 1076, 430, t, { in: s.t0 + .2, poses: [[s.t0 + .2, "cheer"]] }) + bd("basil", 1700, 1076, 450, t, { in: s.t0 + .25, flip: true, poses: [[s.t0 + .25, "cheer"]] }) + wipe(t, s.t0, "#FFF6DA") + HUD(t); };

/* 7 · the seed inside the fruit: on the bench, an adult's hands cut a ripe mango in half (cutfruit): the big flat seed inside (a new seed); Basil
   fixes his own idea (oops); a loop arrow from the seed to a tiny young plant */
const camCut = [2.0, 1060, 680], CUTB = [1090, 724];
const cutScene = (t) => { const tc = MK("cutfruit"), cu = ss(tc + .25, tc + .6, t), kin = eio((t - tc + .5) / .4) * (1 - eio((t - tc - .8) / .4));
  let s = `<g transform="translate(${CUTB[0]} ${CUTB[1]}) scale(.5)"><ellipse cx="0" cy="10" rx="200" ry="16" fill="${P.ink}" opacity=".2"/><rect x="-190" y="-14" width="380" height="26" rx="12" fill="url(#f14Wood)" stroke="#7E4F27" stroke-width="4"/>`
    + (cu < .5 ? TF(0, -70, 1, mangoHang(1.2, "y").replace('<path d="M0 0 Q4 20 0 40"', '<path d="M0 30 Q2 36 0 40"'), 90) : TF(0, -60, 1.05, mangoCutOpen(1, true))) + `</g>`;
  if (kin > .01) s += TF(CUTB[0] + 30 + 260 * (1 - kin), CUTB[1] - 60 + 40 * ss(tc, tc + .5, t), .5, `<path d="M-10 0 L-190 -6 Q-210 0 -190 10 L-10 12z" fill="url(#g15Steel)" stroke="#8A97A8" stroke-width="3"/><rect x="-10" y="-8" width="90" height="26" rx="8" fill="#5E3F28"/>` + TF(40, 4, .8, hand15({ curl: .8 }), 180, -.8));
  return s; };
SC.fruitcut = (t, s) => { const tc = MK("cutfruit"), tl = W("j801b", "fruits"), sd = camPt(camCut, CUTB);
  return VG15(t, { items: cutScene(t) }, [camCut[0] + .05 * eio((t - s.t0) / 4), camCut[1], camCut[2]])
    + (t >= tc + .7 ? pline(sd[0] - 300, sd[1] - 300, sd[0] - 8, sd[1] - 60, ramp(t, tc + .7, .25)) + TF(sd[0] - 300, sd[1] - 300, spring(t, tc + .7, .4), tpill(0, 0, "a new seed", 46, "#fff", P.ink, { w: 700 })) : "")
    + (t >= tl ? `<path d="M${sd[0] + 60} ${sd[1] - 80} Q${sd[0] + 200} ${sd[1] - 320} ${sd[0] + 330} ${sd[1] - 150}" fill="none" stroke="${P.leaf}" stroke-width="12" stroke-linecap="round" stroke-dasharray="${n2(500 * ss(tl, tl + .6, t))} 600"/>` + TF(sd[0] + 370, sd[1] - 60, spring(t, tl + .5, .45), `<ellipse cx="0" cy="4" rx="60" ry="14" fill="url(#g14Soil)"/>` + youngPlant15(t, { h: 90, n: 4, red: 0, k: .8 })) : "")
    + bd("basil", 300, 1076, 520, t, { in: s.t0 + .05, poses: [[s.t0, "surprised"], [LE("j801b") + .1, "sit"]], jump: [[tc + .7, 20]] })
    + bd("momo", 1660, 1076, 480, t, { in: s.t0 + .1, flip: true, poses: [[s.t0, "sit"], [tc + .8, "surprised"], [LE("j801b") + .2, "pointing"]], look: -4 }) + knife(t, s.t0) + HUD(t); };

/* 7 · the board OUR MANGO'S LIFE CYCLE at its home (centre right, on its low stand by the bench): Pip big at the left places the tiles on his
   words (tseed, tyoung, tadult); the last arrow lights from the adult plant back to the seed (tback); the arrows run round; THREE STAGES pops */
const BH = [1200, 1072];
const boardHome = (t, k, o = {}) => TF(BH[0], BH[1], k, loopBoard(t, { tiles: [MK("tseed"), MK("tyoung"), MK("tadult")], back: MK("tback"), ...o }));
SC.ring = (t, s) => { const k = lerp(.7, .86, eio((t - MK("tseed") + .3) / 2)) + .04 * eio((t - MK("kw_three_stages") + .5) / 1);
  return VG15(t, { ant: false }, [1.04 + .03 * eio((t - s.t0) / 8), 1000, 600]) + `<rect width="1920" height="1080" fill="${P.night}" opacity=".12"/>` + boardHome(t, k) + antAt(t, BH[0] + 300 * k, BH[1] - 790 * k, .28)
    + bd("pip", 330, 1076, 520, t, { in: s.t0 + .1, poses: [[s.t0, "sit"], [LE("j803p") + .15, "pointing"]], look: 3 })
    + bd("basil", 1700, 1070, 360, t, { in: s.t0 + .15, flip: true, poses: [[s.t0, "sit"]], look: -3 }) + bd("momo", 1840, 1066, 330, t, { in: s.t0 + .2, flip: true, poses: [[s.t0, "thinking"], [MK("kw_three_stages"), "cheer"]] }) + HUD(t); };
SC.mark1 = (t, s) => markScene(t, s, { id: "j807", sayId: "j806", who: "basil", n: "1 of 2", text: "There are three stages in the life cycle of a plant. The stages are the seed, the young plant and the adult plant.", keys: ["three", "stages", "seed", "young", "plant", "adult"], size: 58, y: 230, footer: FOOT,
  under: TF(1180, 1068, .34 * spring(t, s.t0 + .4, .5), loopBoard(t, { back: -9, id: "m1" })) });

/* 8 · Showdown: Momo's homework on her easel (double points). Momo big at the left reads it; for the countdown the garden gives way to the blue
   game stage: the easel (the question) stays, the ring is big at the right with the counting YOU hand, Momo fidgets; Basil and Pip reveal */
const EAS = [900, 1064, .74];
window.SHELF_AWAY = (t) => { if (PART !== 2) return 0; const a = MK("ring0_show") - .6, b = MK("bell_show") + .5; return ss(a, a + .35, t) * (1 - ss(b, b + .35, t)); };
const hwLit = (t) => { const r0 = MK("ring0_show"), bell = MK("bell_show"), L = "j902", l3 = MKS("l3"); return [0, 1, 2].map((i) => { if (i === 2 && t >= l3 - .1 && t < LE(L) + .3) return 1; if (t >= LT("j901") && t < bell) return .45; return 0; }); };
SC.show = (t, s) => { window._BUBAT = { momo: [560, 230] }; const r0 = MK("ring0_show"), bell = MK("bell_show"), rs = ringState(t, r0, 5), tS = LT("j903") - .08, inT = t >= r0 && t < bell, R = [1520, 420], RR = 200;
  const st = ss(r0 - .6, r0 - .1, t) * (1 - ss(bell + .6, bell + 1.1, t)), bob = inT ? 16 * Math.sin((t - r0) * Math.PI * 2) : 0, nf = inT ? (Math.floor(t - r0) % 3) + 1 : 3, ez = eio((t - LT("j902") + .4) / 1.2) * (1 - eio((t - r0 + 1) / .8));
  const picks = [["basil", "j904", "3", 1420], ["pip", "j905p", "3", 1760]];
  return VG15(t, { ant: false }, [1.03 + .03 * eio((t - s.t0) / 10), 900, 700]) + `<rect width="1920" height="1080" fill="${P.night}" opacity=".3"/>` + OP(st, bg("stage"))
    + TF(EAS[0] + 80 * ez, EAS[1] + 60 * ez, EAS[2] * (1 + .14 * ez), hwEasel(t, { lit: hwLit(t) }))
    + (t >= r0 - .6 ? OP(st, TF(R[0], R[1], spring(t, r0 - .6, .45) * (1 + .035 * (inT ? rs.tick : 0)), `<g transform="translate(${-R[0]} ${-R[1]})">${ringTimer(R[0], R[1], t < r0 ? 1 : t < bell ? rs.frac : 0, t < r0 ? 5 : t < bell ? rs.secs : 0, t, { R: RR, sw: 32, tick: rs.tick, shut: pulse(t, bell, .01, .6), chg: inT || (t >= bell && t < bell + .5) ? (t >= bell ? bell : rs.chg) : -9, ns: 1.2,
      inner: `<circle cx="${R[0]}" cy="${R[1]}" r="${RR - 24}" fill="#FFF8EA"/>` + TF(R[0], R[1] + 30 + bob * .3, .75, `<g filter="url(#dropS)">${countHand(nf)}</g>`) })}</g>`) + youPill(R[0] - 230, R[1] - 170, 1.1) + TF(R[0], 760, 1, tpill(0, 0, "line 1, 2 or 3?", 44, P.ink, "#fff", { w: 700 }))) : "")
    + bd("momo", 250, 1076, 500, t, { in: s.t0 + .1, rock: inT ? 2 : 0, poses: [[s.t0, "waving"], [LT("j902") - .12, "sit"], [LE("j902") + .2, "pointing"], [r0 - .3, "thinking"], [bell - 1.6, "oops"], [bell, "surprised"], [LT("j904") - .1, "oops"]], jump: [[bell + .02, 26]], wave: true })
    + picks.map(([w, id, n, x]) => bd(w, x, 1076, 380, t, { in: bell + .3, flip: true, poses: [[bell + .3, w === "basil" ? "thinking" : "arms_crossed"], [LT(id) - .12, "sit"], [LE(id) + .1, w === "pip" ? "arms_crossed" : "sit"]] }) + (t > bell + .5 ? pickNum(w, x - 170, 900, t, LT(id) - .1, n) : "")).join("")
    + stamp(t, tS, 960, 460) + bellIcon(t, r0) + HUD(t); };
/* the fix: line 3 struck through (strike), rewritten in green; its pictures bend from a row ending in STOP into a loop (bend); the strip; +2 */
SC.fix = (t, s) => { const st = ss(MK("strike"), MK("strike") + .4, t), fx = ss(MK("bend"), MK("bend") + .8, t), ez = 1 - eio((t - LT("j906") + .6) / .8);
  return VG15(t, { ant: false }, [1.03, 900, 700]) + `<rect width="1920" height="1080" fill="${P.night}" opacity=".3"/>` + TF(EAS[0] + 120 * ez, EAS[1], EAS[2] * (1 + .3 * ez), hwEasel(t, { strike: st, fix: fx, lit: [0, 0, fx * .6] })) + antAt(t, EAS[0] - 230 * EAS[2], EAS[1] - 900 * EAS[2], .26) + coin(t, MK("coin2") - .1, 1560, 520, "+2", "line 3")
    + strip15(t, "j906", "The stages in a life cycle are repeated. There is no first or last stage.", 150, { keys: ["repeated", "first", "last"], maxW: 1240, x: 900 })
    + bd("momo", 250, 1076, 500, t, { in: s.t0 + .05, poses: [[s.t0, "oops"], [MK("bend"), "surprised"], [MK("bend") + 1.4, "cheer"], [LT("j906") + .4, "sit"]] })
    + bd("basil", 1500, 1070, 380, t, { flip: true, in: s.t0 + .1, poses: [[s.t0, "sit"], [MK("bend") + .2, "cheer"]] }) + bd("pip", 1780, 1066, 360, t, { flip: true, in: s.t0 + .15, poses: [[s.t0, "arms_crossed"], [MK("bend") + .35, "cheer"]] }) + HUD(t); };

/* 9 · "What if a plant had no more seeds at all?" Momo big at the left (worried), Basil big at the right (his easy idea: a shop shelf of seed
   packets, with a ?); the loop board small between them; on Heart's line its slots empty one by one (no seeds, no young plants, no adult
   plants); a cloud's shadow passes; the slots come back as the camera goes into the seed bank */
const shopIdea = (t) => `<rect x="-300" y="-200" width="600" height="400" fill="#FFF0D6"/><rect x="-260" y="-150" width="520" height="16" fill="#B98A5A"/><rect x="-260" y="10" width="520" height="16" fill="#B98A5A"/><rect x="-260" y="170" width="520" height="16" fill="#B98A5A"/>`
  + [...Array(10)].map((_, i) => { const x = -220 + (i % 5) * 110, y = i < 5 ? -150 : 10; return `<rect x="${x - 36}" y="${y - 120}" width="72" height="116" rx="6" fill="${["#F6A38F", "#8FD3C8", "#B9A6FF", "#FFC38A", "#8FC0F2"][i % 5]}" stroke="${P.ink}" stroke-width="3"/><rect x="${x - 26}" y="${y - 100}" width="52" height="40" rx="5" fill="#fff"/>${seedDot(x - 8, y - 82, i % 3, 1.2)}${seedDot(x + 8, y - 76, i % 3, 1.2)}`; }).join("") + T(0, 120, "SEEDS", 44, P.ink, { ls: 4 });
const NBH = [960, 1066];
const nomoreFade = (t) => { const L = "j1004", tn = W(L, "no") - .1, s = SCN.nomore, back = ss(s.t1 - 1.2, s.t1 + .4, t); return [0, 1, 2].map((i) => ss(tn + i * .9, tn + i * .9 + .6, t) * (1 - back)); };
SC.nomore = (t, s) => { const tH = LT("j1004"), u = eio((t - LT("j1002b") + .4) / 1.4), ez = eio((t - tH) / 1.6), cam = [1.06 + .04 * ez, lerp(lerp(820, 1200, u), 960, ez), 620], cl = Math.sin(Math.PI * clamp((t - tH - 1) / 5));
  return VG15(t, {}, cam) + `<rect width="1920" height="1080" fill="${P.night}" opacity="${n2(.16 * cl)}"/>` + TF(NBH[0], NBH[1], .5 + .08 * ez, loopBoard(t, { back: -9, fade: nomoreFade(t), tag: false, id: "nm" }))
    + bd("momo", 300, 1076, 520, t, { in: s.t0 + .05, poses: [[s.t0, "sit"], [LE("j1001m") + .1, "thinking"]], look: 3 })
    + bd("basil", 1640, 1076, 520, t, { in: s.t0 + .1, flip: true, poses: [[s.t0, "sit"], [LE("j1002b") + .1, "cheer"], [W("j1004", "no") + .4, "surprised"], [W("j1004", "disappear") - .3, "oops"]], nohop: true })
    + ideaBubble(t, W("j1002b", "buy") - .2, tH - .2, 1000, 330, shopIdea(t), P.basil, 1) + HUD(t); };
/* 9 · [LOOK CLOSER] Singapore's seed bank (garden15.js bankArt): the camera pushes in from the little loop board; SEED BANK pops */
SC.lcbank = (t, s) => (window._BUBAT = { '*': [920, 880] }, "") + lookCloser(t, s, { tz: s.t0, fx: NBH[0], fy: NBH[1] - 260, art: bankArt, bgc: "#EEF4F8", verdict: [`SEEDS KEPT SAFE`, GOODC], tv: MK("v_bank"),
  over: (tt) => finePrint(tt, s.t0 + 1.2, "A real place: the Seed Bank at the Singapore Botanic Gardens.", 1420, 196) });
SC.mark2 = (t, s) => markScene(t, s, { id: "j1102", sayId: "j1101", who: "momo", n: "2 of 2", text: "A seed bank stores seeds safely until they are needed.", keys: ["seed", "bank", "stores", "safely", "needed"], size: 70, y: 250, footer: FOOT,
  under: JARN.map((n, i) => TF(820 + i * 190, 1060, .8 * spring(t, s.t0 + .4 + i * .1, .45), jar15(i, n))).join("") });
/* 10 · the chant: call and response; the loop board at its home on the right, each line's part flashing on its call */
SC.chant = (t, s) => chantScene(t, s, "c1003", { sayId: "u1002", size: 52, x: 620, y0: 260, dy: 110, xs: [230, 560, 890], bh: 360, tx: 1180, ty: 520, sayX: 620, sayY: 600,
  board: (tt, f) => TF(1500, 1066, .62, loopBoard(tt, { back: -9, flash: [f[0], f[0], Math.max(f[0], f[1])], id: "ch" })) });

/* 11 · score hand, the weaver ant (lizReveal: the score hand melts into the garden, ONE push-in onto the ant on a leaf of the old tree, the iris,
   the ring on "ant"; Basil's fun fact: a leaf nest sewn with silk (ff_nest), a worker holding its baby like a tube of glue (ff_baby), their nests
   in mango trees (ff_tree)) */
SC.final = (t, s) => { const L = "j1201"; return finalScene(t, s, L, 1, [[s.t0, null, 1], [W(L, "three") - .1, null, 3]]); };
SC.liz = (t, s) => { const L = "j1202", tq = W(L, "it") - .1, a = ANTAT.liz, tR = W(L, "ant") + .1;
  return lizReveal(t, s, L, VG15(t, { ant: false, items: antOn(t, a[0], a[1], { wave: ss(tR + .2, tR + .5, t) * (1 - ss(tR + 2, tR + 2.4, t)) }) }), a[0], a[1] - 14, tq, "On a leaf of the old mango tree!", -120, 160, 80, 3.4, { from: () => SC.final(SCN.final.t1 - .04, SCN.final), ix: 400, iy: 400, qx: 560, qy: 770, tx: 560, ty: 920, tell: "j1204",
    fact: { id: "j1203", at: [1100, 440], w: 960, h: 500, sx: 1420, sy: 860, items: [["ff_nest", "a leaf nest", ffNest], ["ff_baby", "silk from babies", ffBaby], ["ff_tree", "in mango trees", ffTree]], cols: ["#2FA35A", "#E8862E", "#3A8DFF"] } }) + finePrint(t, s.t0 + .5, ANT_RULE, 1200, 1040); };

/* 12 · the dare for Episode 16: the little pond (tiny tadpoles wriggle among the lily pads); ONE set of three big numbered picture boards slides in
   low (a fish · a frog · a lizard), the ?, the banner; Basil big at the left, hopeful (a big smile on "lizard"); Pip and Momo think */
const DRX = [640, 990, 1340];
SC.dare = (t, s) => { const a = "j1301", tQ = W(a, "what") - .15, tc = [W(a, "one") - .1, W(a, "two") - .1, W(a, "three") - .1], tL = W(a, "lock") - .1, e = eio((t - MK("dareIn") - .2) / 1.6), cam = [lerp(2.2, 1.04, e), lerp(POND[0], 1000, e), lerp(POND[1], 640, e)];
  return VG15(t, { tad: 1.1 }, cam) + `<rect width="1920" height="1080" fill="${P.night}" opacity="${n2(.28 * e)}"/>` + OP(1 - e, TF(960, 820, spring(t, s.t0 + .2, .4), tpill(0, 0, "tiny tadpoles in the pond", 44, "#fff", P.ink, { w: 700 })))
    + ["fish15", "frog15", "liz15"].map((nm, i) => { const t0 = MK("dareIn") + .5 + i * .25, pl = Math.max(pulse(t, tc[i], .04, .6), t >= tL ? (Math.floor((t - tL) / .5) % 3 === i ? .8 : 0) : 0); if (t < t0) return ""; const [x, d] = slideX(t, t0, .6, 2400, DRX[i], 860);
      return d + TF(x, 680, .9 * (1 + .05 * pl), picBoard(nm, 0, 0, 1, { sc: 1.0, lab: NEXT_CARDS[i].toLowerCase(), size: 34, id: "dr" + i, t })) + numBadge(t, tc[i] - .05, x - 135, 554, i + 1, .9); }).join("")
    + TF(1080, 150, spring(t, MK("dareIn") + .2, .45), tpill(0, 0, "NEXT · What will the tadpole grow into?", 46, P.ink, P.sun, { w: 700 }))
    + (t < tQ + .6 ? TF(1700, 470, spring(t, s.t0 + .5, .45) * (1 - ei((t - tQ) / .5)), `<g filter="url(#drop)"><circle r="146" fill="#fff"/></g><clipPath id="tadc"><circle r="134"/></clipPath><g clip-path="url(#tadc)"><rect x="-150" y="-150" width="300" height="300" fill="#6FC3D9"/><path d="M-150 90 q80 -30 150 0 t150 0 V150 H-150z" fill="#58B56C"/>${[0, 1, 2].map((i) => TF(-60 + i * 60 + 14 * Math.sin(t * 1.5 + i), -30 + 40 * (i % 2) + 8 * Math.sin(t + i), 1.6, tadpole(t, i), 10 * Math.sin(t + i))).join("")}</g>` + tpill(0, 175, "a tadpole", 36, P.ink, "#fff", { w: 700 })) : "")
    + qMark(t, tQ, 990, 330, 44) + (t >= tL ? TF(990, 1010, spring(t, tL, .45), tpill(0, 0, "Lock in your answer!", 44, P.sun, P.ink, { w: 700 })) : "")
    + bd("basil", 260, 1076, 500, t, { in: s.t0 + .1, poses: [[s.t0, "sit"], [tc[2] + .3, "waving"], [tL, "sit"]], jump: [[tc[2] + .3, 22]], wave: true })
    + bd("momo", 1590, 1070, 340, t, { flip: true, in: s.t0 + .2, poses: [[s.t0, "pointing"], [tQ, "thinking"]] })
    + bd("pip", 1800, 1066, 320, t, { flip: true, in: s.t0 + .3, poses: [[s.t0, "surprised"], [tQ + .3, "thinking"]] }) + HUD(t); };
/* 14 · "Now you know!": the loop board (its tiles in place, its arrows running round) centred between the buddies */
SC.nyk = (t, s) => nykScene(t, s, TF(880, 1050, .6, loopBoard(t, { back: -9, id: "ny" })), { bx: [220, 1720, 1400], hx: 470 });
})(); }
