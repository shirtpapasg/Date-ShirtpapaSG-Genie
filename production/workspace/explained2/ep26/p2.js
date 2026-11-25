// p2.js: EP26 PART 2, "Your Turn! Fix the Answer, Part by Part": the recap, Pip's kitchen on Saturday (homework with the Genie's lamp), question
// one (the fair test) and Round 1 (does it need a Choice?), the answer and CHOICE (Basil), question one part by part with YOUR TURN rings
// (look closer; Mark Sentence 1, Pip), the Showdown (Basil's answer to the life-cycle question: no Link), be the Link, the most common mistake
// (look closer: the fridge question; LINK, Momo; "help with the Link"; Mark Sentence 2, Momo), the chant, the ant, where to find the CECL Genie
// in TheOneApp (members) and CECL (Basil), the key words, "Now you know!". ../p3_ep26_script.md section 5. One place: PIP'S HDB KITCHEN (HOME26).
if (PART === 2) { (() => {
SCORE.push([MK("coin1") - .1, 1, 1]);
SCORE.push([MK("coin2") - .1, 3, 1]);
const FOOT = "Exam skills · Answering open-ended questions · CECL";
const bd = (who, x, y, h, t, o = {}) => buddy(who, x, y, h, t, o);
const W0 = [1, 960, 540];
window.SHELF_AWAY = (t) => { const w = SCN.waitw; return ss(w.t0 + .3, w.t0 + .8, t) * (1 - ss(SCN.pullout.t1, SCN.pullout.t1 + .4, t)); };
const home = (t, cam, o = {}) => HOME26(t, o, cam);
const BL = [300, 1076, 470], MO = [800, 1076, 470], PI = [1330, 1066, 450];
const camRoom = camOn([960, 640], 1.0, 960, 560), camLamp = camOn([1250, 700], 1.4, 1100, 560);
const pill2 = (t, t0, t1) => OP(ramp(t, t0, .4) * (1 - ramp(t, t1, .4)), lowerPill(60, 96, "An HDB flat, Singapore ·", "Saturday morning: homework"));
SC.lasttime = (t, s) => { const tb = [s.t0, MK("pic2") - .2, MK("pic3") - .2], i = t >= tb[2] ? 2 : t >= tb[1] ? 1 : 0, labs = ["Choice · Evidence · Concept · Link", "Basil: one part, one mark", "Momo: all four parts, full marks"], u = t - tb[i], z = 1 + .05 * eio(u / 4), k = ramp(t, tb[i], .5);
  return bg("stage2") + OP(ramp(t, s.t0, .3), T(960, 110, "Last time…", 60, "#fff", { w: 600 })) + OP(k, TF(960, 520, z, `<g filter="url(#drop)"><rect x="-534" y="-314" width="1068" height="628" rx="40" fill="#FFF8EA"/></g><clipPath id="rcP"><rect x="-520" y="-300" width="1040" height="600" rx="30"/></clipPath><g clip-path="url(#rcP)">${recapP2_26(i, t)}</g>`))
    + OP(k, TF(960, 930, spring(t, tb[i] + .1, .4), tpill(0, 0, labs[i], 46, P.sun, P.ink, { w: 700 }))) + HUD(t); };
const camFruit = camOn([ANTAT.intro[0], ANTAT.intro[1] - 10], 1.6, 760, 480);
const camHome = (t) => { const s = SCN.home, a = eio((t - s.t0) / 1.6), c = eio((t - (s.t1 - 1.2)) / 1.2); return c > 0 ? camMix(camLamp, camFruit, c) : camMix(camRoom, camLamp, a); };
SC.home = (t, s) => home(t, camHome(t), { rise: .25 }) + bd("momo", MO[0], MO[1], MO[2], t, { in: s.t0 + .9, out: s.t1 - .6, ...watchO(MO[0], 1250) }) + bd("pip", PI[0], PI[1], PI[2], t, { in: s.t0 + 1.0, out: s.t1 - .5, ...watchO(PI[0], 1250) })
  + bd("basil", BL[0], BL[1], BL[2], t, { in: s.t0 + .3, out: s.t1 - .4, poses: [[s.t0, "sit"], [LT("n201b") + .3, "pointing"], [LE("n201b") + .6, "sit"]] }) + pill2(t, s.t0, s.t1 + 1.4) + HUD(t);
SC.game = (t, s) => { const cE = camHome(SCN.home.t1), p = ANTAT.intro;
  return gameScene(t, s, ["n202", HAS("n203m") ? "n203m" : "n202", "n204"], false, { world: (tt) => home(tt, cE, { rise: .25 }), A: camPt(cE, [p[0], p[1] - 4]), T: [680, 440], Z: 2.6, dim0: 0, finder: "momo",
    poses: { pip: [[W("n202", "ant") + .1, "surprised"], [W("n202", "ant") + 1.8, "sit"]], basil: [[LT("n204") - .1, "waving"], [LT("n204") + 1.0, "sit"]] } }) + pill2(t, SCN.home.t0, s.t0 + .9) + smallPrint(t, LT("n204"), LOOK_RULE); };
SC.goals = (t, s) => goals3(t, s, [["Choice: only when you must pick", ""], ["The Link: answer what was asked", ""], ["Try it yourself", ""]], ["n301b", "n302b", "n303b", "n304b"], "basil");
const setupsPic = (t) => TF(0, 0, 1, `<g filter="url(#dropS)"><rect x="-300" y="-260" width="600" height="440" rx="26" fill="#FFF8EA"/></g>` + trayClips22(t, -130, 90, .5, { n: 12 }) + setup24(t, { x: -130, y: 30, k: .55, kind: "iron", n: 10, batt: 1, hx: -220, hk: .6, tag: "A", tagS: 40 }) + trayClips22(t, 120, 90, .5, { n: 12 }) + setup24(t, { x: 120, y: 30, k: .55, kind: "steel", n: 20, batt: 2, hx: 260, hk: .45, tag: "B", tagS: 40 }) + T(0, 150, "A: iron · 10 turns · 1 battery    B: steel · 20 turns · 2 batteries", 20, P.ink, { w: 600 }));
SC.question = (t, s) => bg("stage2") + OP(ramp(t, s.t0, .3), qCard26(t, "n401", setupsPic(t))) + bd("pip", 1780, 1076, 300, t, { in: s.t0 + .3, flip: true, watch: 1300 }) + HUD(t);
SC.r1card = (t, s) => roundCard(t, s, "ROUND 1");
SC.r1 = (t, s) => { const L1 = "n402"; return lockN(t, { t0: LT(L1) - .1, cards: ["Yes", "No"], clues: [["Explain why ...", LT(L1)], ["nothing to pick?", LT(L1) + .2], ["a Choice?", LT(L1) + .4]], lead: "pip", csize: 40, q: "Does it need a Choice?", tq: W(L1, "does") - .1,
  tc: [W(L1, "one"), W(L1, "two")], ring0: MK("ring0_r1"), dur: 5, lock: "n403", pics: [0, 1].map((i) => cardP2_26(i, t)), obj: ringP2_26,
  react: [[LE("n406m") + .1, "momo", "pointing"]], picks: [{ who: "pip", id: "n404p", word: "1" }, { who: "basil", id: "n405b", word: "2" }, { who: "momo", id: "n406m", word: "2" }] }); };
SC.r1ans = (t, s) => { const tA = MK("ansglow");
  return home(t, camRoom, { rise: 1 }) + `<g filter="url(#drop)"><rect x="30" y="110" width="470" height="200" rx="24" fill="#FFF8EA" opacity=".92"/></g>` + [0, 1].map((i) => TF(150 + i * 230, 205, .42, choiceCard3(i + 1, ["Yes", "No"][i], cardP2_26(i, t), { w: 420, h: 330, size: 40, id: "ra" + i, lit: i === 1 && t >= tA ? spring(t, tA, .45) : 0 }))).join("")
    + coin(t, MK("coin1") - .1, 860, 400, "+1", "if you showed two fingers") + coin(t, MK("coin1") + .2, 1640, 200, "+1", "Buddies")
    + bd("basil", BL[0], BL[1], BL[2], t, { in: s.t0 + .1, poses: [[s.t0, "sit"], [LE("n502b") + .05, "cheer"]], achieved: true }) + bd("momo", MO[0], MO[1], MO[2], t, { in: s.t0 + .15 }) + bd("pip", PI[0], PI[1], PI[2], t, { in: s.t0 + .2 }) + melt(t, s, "r1", .3) + HUD(t); };
SC.lc1q = (t, s) => home(t, camLamp, { rise: 1 }) + bd("basil", BL[0], BL[1], BL[2], t, { in: s.t0 + .15, ...watchO(BL[0], 1250) }) + bd("momo", MO[0], MO[1], MO[2], t, { in: s.t0 + .1, ...watchO(MO[0], 1250) }) + bd("pip", PI[0], PI[1], PI[2], t, { in: s.t0 + .05, poses: [[s.t0, "sit"], [LE("n601p") + .05, "thinking"]] }) + HUD(t);
const peek26 = (who, side, t, tin, tout, poses, o = {}) => { if (t < tin - .05 || (tout !== undefined && t > tout + .3)) return ""; const W_ = LCW, x = side === "l" ? W_.x - W_.w / 2 + 200 : W_.x + W_.w / 2 - 200;
  return bd(who, x, W_.y + W_.h / 2 + 470 * .42 + (1 - eo((t - tin) / .45)) * 350, 470, t, { in: tin, out: tout, poses: [[tin, "sit"], ...(poses || [])], peek: true, tag: false, shadow: false, flip: side === "r", nohop: true, achieved: o.achieved, watch: W_.x }); };
SC.lcfair = (t, s) => { window._BUBAT = { '*': [960, 905] }; const p = camPt(camLamp, [1250, 700]);
  return lookCloser(t, s, { tz: s.t0, fx: p[0], fy: p[1], art: lcFairArt26, bgc: GNAVY, set: (tt) => home(tt, camLamp, { rise: 1 }), verdict: ["E · C · L: FULL MARKS", GOODC], tv: MK("v_fair"), peek: false, over: (tt) => peek26("pip", "l", tt, s.t0 + 1.2, undefined, []) }); };
SC.mark1 = (t, s) => markScene(t, s, { id: "n609", sayId: "n608", who: "pip", n: "1 of 2", tab: "Choice", text: TL.lines.n609.text, keys: ["Choice", "only", "pick."], size: 60, y: 250, footer: FOOT, poses: [[LE("n609") + .2, "sit"]], under: markChoice26(t, 1250, 930, .7 * spring(t, s.t0 + .4, .5)), extra: bd("basil", 1790, 1076, 300, t, { in: s.t0 + .3, flip: true }) });
/* 7 · Showdown: Basil's answer card to question two (the life-cycle question), on an easel: four CECL lines, line 4 empty; the 6 s ring;
   Momo reveals: four; the fix: the green Link written in (rewrite). Basil shy through the fix; Pip and Momo confident */
const EAS = [700, 1080, .95];
const camShow = (t) => camMix(camRoom, camOn([EAS[0], EAS[1] - 360], 1.3, 760, 560), eio(clamp((t - SCN.show.t0) / 1.2)));
const showWorld = (t, cam) => home(t, cam, { rise: 1, front: basilCard26(t, EAS[0], EAS[1], EAS[2], { lit: [MK("l1s"), MK("l2s"), MK("l3s"), MK("l4s")], rewrite: MKS("rewrite") }) });
SC.show = (t, s) => { window._BUBAT = { basil: [1150, 175], momo: [1150, 175], pip: [1250, 300] }; const r0 = MK("ring0_show"), bell = MK("bell_show"), rs = ringState(t, r0, 6), tS = LT("n703") - .08, inT = t >= r0 && t < bell, R = [1440, 430], RR = 200;
  const st = ss(r0 - .6, r0 - .1, t) * (1 - ss(bell + .6, bell + 1.1, t)), bob = inT ? 16 * Math.sin((t - r0) * Math.PI * 2) : 0, nf = inT ? (Math.floor(t - r0) % 4) + 1 : 4, tB = LT("n704m");
  return showWorld(t, camShow(t)) + OP(st, bg("stage")) + (t < LT("n702") ? TF(1300, 300, ramp(t, s.t0 + .3, .4), lifeRow26(t, "roach")) + TF(1300, 640, ramp(t, s.t0 + .6, .4) * .85, lifeRow26(t, "butterfly")) : "")
    + (st > .01 ? OP(st, TF(680, 1100, .82, basilCard26(t, 0, 0, 1, {})) + TF(R[0], R[1], spring(t, r0 - .6, .45) * (1 + .035 * (inT ? rs.tick : 0)), `<g transform="translate(${-R[0]} ${-R[1]})">${ringTimer(R[0], R[1], t < r0 ? 1 : t < bell ? rs.frac : 0, t < r0 ? 6 : t < bell ? rs.secs : 0, t, { R: RR, sw: 32, tick: rs.tick, shut: pulse(t, bell, .01, .6), chg: inT || (t >= bell && t < bell + .5) ? (t >= bell ? bell : rs.chg) : -9, ns: 1.2,
      inner: `<circle cx="${R[0]}" cy="${R[1]}" r="${RR - 24}" fill="#FFF8EA"/><clipPath id="shC"><circle cx="${R[0]}" cy="${R[1]}" r="${RR - 30}"/></clipPath><g clip-path="url(#shC)"><g transform="translate(${R[0]} ${R[1]}) scale(.8) translate(-430 -440)">${ringShow26(t)}</g></g>` })}</g>`) + youPill(R[0] - 230, R[1] - 170, 1.1) + TF(R[0], 760, 1, tpill(0, 0, "part 1, 2, 3 or 4?", 48, P.ink, "#fff", { w: 700 })) + TF(R[0] + 260, 640 + bob * .3, .7, `<g filter="url(#dropS)">${countHand(nf)}</g>`)) : "")
    + bd("basil", 230, 1076, 480, t, { in: s.t0 + .1, rock: inT ? 2 : 0, poses: [[s.t0, "sit"], [r0 - .3, "worried"], [bell + .35, "sit"]], jump: [[bell + .02, 26]] })
    + bd("pip", 1360, 1020, 380, t, { in: bell + 1.1, flip: true, poses: [[bell + 1.1, "sit"]] }) + (t > bell + 1.3 ? pickNum("pip", 1240, 700, t, tB - .1, "4") : "")
    + bd("momo", 1720, 1076, 470, t, { in: bell + 1.0, flip: true, poses: [[bell + 1.0, "sit"]] }) + (t > bell + 1.2 ? pickNum("momo", 1580, 640, t, tB - .1, "4") : "")
    + stamp(t, tS, 960, 460) + bellIcon(t, r0) + melt(t, s, "showcard", .3) + HUD(t); };
SC.showcard = (t, s) => roundCard(t, s, "SHOWDOWN", "DOUBLE POINTS", P.sun);
SC.fix = (t, s) => { window._BUBAT = { '*': [1250, 250] }; const cam = camMix(camOn([EAS[0], EAS[1] - 360], 1.3, 760, 560), camOn([960, 600], 1.06, 960, 580), eio(clamp((t - MK("coin2") + .4) / 1.2)));
  return showWorld(t, cam) + bd("basil", 230, 1076, 480, t, { in: s.t0 + .1 }) + bd("pip", 1360, 1020, 380, t, { in: s.t0 + .15, flip: true }) + bd("momo", 1720, 1076, 470, t, { in: s.t0 + .1, flip: true }) + coin(t, MK("coin2") - .1, 1700, 470, "+2", "Showdown: double points") + HUD(t); };
/* 8 · Be the Link! (journey) */
const camWait = (t) => { const s = SCN.waitw, u = eio((t - s.t0) / (s.t1 - s.t0)); return camMix(camRoom, camOn([1250, 640], 5.0, 960, 560), u * u); };
SC.waitw = (t, s) => { const L = "n801", tP = W(L, "be") - .15, sh = W(L, "shrink") - .1;
  const buds = ["basil", "momo", "pip"].map((w, i) => { const X = [BL, MO, PI][i]; return bd(w, X[0], X[1], X[2], t, { in: s.t0 + .1 + .05 * i, out: sh + .2 * i + .3, flip: X[0] > 960, poses: [[s.t0, "sit"], [tP + .2 + .15 * i, "waving"]], wave: true }); }).join("");
  return home(t, camWait(t), { rise: 1 }) + OP(1 - ss(s.t1 - 1.0, s.t1 - .5, t), buds + (t >= tP ? TF(960, 250, spring(t, tP, .45), tpill(0, 0, "Be the Link!", 76, P.sun, P.ink, { w: 700 })) : "") + HUD(t)) + wipe(t, s.t1, GNAVY, 960, 600); };
const riders26 = (t, s, o) => { let out = ""; for (const who of ["momo", "pip", "basil"]) { const [x, y] = o.at[who]; out += buddy(who, x, y, o.h || 180, t, { in: o.tin + ({ pip: 0, basil: .15, momo: .3 })[who], poses: (o.poses || {})[who] || [], tag: false, rim: "rimB", ...watchO(x, o.look || 960) }); } return out; };
SC.shrink = (t, s) => { const m = MK, rp = { pip: [[m("jclick") + .1, "surprised"], [m("jclick") + 1.8, "sit"]], momo: glanceWave(m("jgreen") + 2.0) };
  return linkJourney(t, s) + riders26(t, s, { tin: m("jgreen") + .6, at: { pip: [200, 1044], basil: [1760, 1050], momo: [420, 1040] }, poses: rp }) + youTag(t, MK("jgreen"), "You: the Link"); };
SC.pullout = (t, s) => { const u = 1 - eo((t - s.t0) / .6); return home(t, camMix(camRoom, camOn([1250, 640], 5, 960, 560), u), { rise: 1 }) + bd("basil", BL[0], BL[1], BL[2], t, { in: s.t0 + .2 }) + bd("momo", MO[0], MO[1], MO[2], t, { in: s.t0 + .25 }) + bd("pip", PI[0], PI[1], PI[2], t, { in: s.t0 + .3 }) + wipe(t, s.t0, "#FFFFFF") + HUD(t); };
/* 9 · Pip reads his fridge answer; [LOOK CLOSER] the most common mistake; faces: Pip lower left, Momo lower right (LINK; cheer) */
SC.lc2q = (t, s) => home(t, camOn([1700, 700], 1.2, 1250, 560), { rise: 1 }) + bd("basil", BL[0], BL[1], BL[2], t, { in: s.t0 + .15, ...watchO(BL[0], 1700) }) + bd("momo", MO[0], MO[1], MO[2], t, { in: s.t0 + .1, ...watchO(MO[0], 1700) }) + bd("pip", PI[0], PI[1], PI[2], t, { in: s.t0 + .05 }) + HUD(t);
SC.lcfridge = (t, s) => { window._BUBAT = { '*': [960, 905] }; const c = camOn([1700, 700], 1.2, 1250, 560), p = camPt(c, [1700, 700]);
  return lookCloser(t, s, { tz: s.t0, fx: p[0], fy: p[1], art: lcFridgeArt26, bgc: GNAVY, set: (tt) => home(tt, c, { rise: 1 }), verdict: ["NO LINK? ADD THUS", "#3fc35f"], tv: MK("v_link"), peek: false,
    over: (tt) => peek26("pip", "l", tt, s.t0 + 1.2, undefined, []) + peek26("momo", "r", tt, LT("n905m") - .5, undefined, [[LE("n905m") + .1, "cheer"], [LE("n905m") + 2.2, "sit"]], { achieved: true }) }); };
SC.mark2 = (t, s) => markScene(t, s, { id: "n908", sayId: "n907", who: "momo", n: "2 of 2", tab: "The Link", text: TL.lines.n908.text, keys: ["Link", "joins", "rule", "asks.", "Thus."], size: 56, y: 240, footer: FOOT, poses: [[LE("n908") + .2, "sit"]], under: markLink26(t, 1250, 930, .7 * spring(t, s.t0 + .4, .5)) });
SC.chant = (t, s) => chantScene(t, s, "c1003", { sayId: "u1002", size: 36, x: 620, y0: 230, dy: 100, xs: [230, 560, 890], bh: 360, tx: 1240, ty: 600, sayX: 640, sayY: 620, board: (tt, flash) => chantBoard26(tt, flash) });
SC.final = (t, s) => { const L = "n1101"; return finalScene(t, s, L, 1, [[s.t0, null, 1], [W(L, "two") - .1, null, 2], [W(L, "three") - .1, null, 3]]); };
SC.liz = (t, s) => { const L = "n1102", tq = W(L, "it") - .1, c = ANTAT.liz, tc = W(L, "ant");
  return lizReveal(t, s, L, home(t, W0, { bug: c, rise: 1 }), c[0], c[1] - 8, tq, "It was on the window ledge!", -120, 160, 80, 2.8, { from: () => SC.final(SCN.final.t1 - .04, SCN.final), qx: 1000, qy: 724, tx: 960, ty: 985, tell: "n1104",
    fact: { id: "n1103p", at: [1250, 400], w: 760, h: 440, items: [["ff_trail", "a smell trail", ffTrail26], ["ff_link", "a link!", ffLink26]], cols: ["#D9A21B", "#3fc35f"], sx: 1300, sy: 860, poses: [[MK("ff_in") - .4, "surprised"], [MK("ff_in") + .3, "sit"]] } })
    + bd("basil", 170, 1076, 330, t, { in: s.t0 + .6, poses: [[s.t0 + .6, "sit"], [tc + .4, "pointing"], [LT("n1103p") - .3, "sit"]] })
    + bd("momo", 390, 1076, 330, t, { in: s.t0 + .7, poses: [[s.t0 + .7, "sit"], [MK("ff_link") + .2, "surprised"], [MK("ff_link") + 1.6, "sit"], [LT("n1104") - .1, "waving"], [s.t1, "sit"]], wave: true }) + smallPrint(t, s.t0 + .5, LOOK_RULE); };
/* 12 · where to find the CECL Genie: TheOneApp on a phone: the Questions tab (tapq), the CECL Genie chip (tapg), the Genie card, Members */
SC.genie = (t, s) => { const tq = MK("tapq"), tg = MK("tapg"), st = t < tq ? 0 : t < tg ? 1 : t < tg + 1.2 ? 2 : 3, tap = t >= tq && t < tq + .5 ? 1 - (t - tq) / .5 : t >= tg && t < tg + .5 ? 1 - (t - tg) / .5 : 0, ty = t < tg ? 380 : 78;
  return bg("stage2") + TF(760, 540, .95 * spring(t, s.t0 + .2, .45), phone26(t, { step: st, tap: tap > 0 ? tap : undefined, tx: t < tg ? 0 : 0, ty })) + (t >= MK("members") ? TF(1300, 300, spring(t, MK("members"), .4), tpill(0, 0, "Members", 48, "#ffc53d", GNAVY, { w: 700 })) : "")
    + bd("basil", 1600, 1076, 440, t, { in: s.t0 + .3, flip: true, watch: 760, look: -5, poses: [[s.t0, "sit"], [LE("n1202b") + .05, "cheer"]], achieved: true }) + HUD(t); };
SC.nyk = (t, s) => nykScene(t, s, TF(960, 820, .7, ceclTiles26(t, {})), { bx: [230, 1730, 1500], hx: 470 });
})(); }
