// p1.js: EP26 PART 1, "Why Did Basil LOSE Marks? Meet the CECL Genie": the quiz papers come back (Basil 1/3), the Genie's lamp, Round 1 (which
// answer gets full marks?), be an answer being built, the answer and the CECL Genie, Basil's answer under the lamp (look closer: OPEN-ENDED
// QUESTION, Basil; EVIDENCE, Momo; Mark Sentence 1, Momo), HOLD ON! (Pip copies the question's words as his Concept), Momo's answer built part
// by part (look closer: CONCEPT, Pip; Mark Sentence 2, Basil), the dragonfly, the Part 2 tease. ../p3_ep26_script.md section 4. One place:
// the SCHOOL SCIENCE ROOM, Thursday after school (art26.js SR26). Buddies big, watching the lamp and the cards; one wave at most a scene.
if (PART === 1) { (() => {
SCORE.push([MK("coin1") - .1, 1, 0]);
SCORE.push([W("m803", "one") - .1, 2, 0]);
const FOOT = "Exam skills · Answering open-ended questions · CECL";
const bd = (who, x, y, h, t, o = {}) => buddy(who, x, y, h, t, o);
const W0 = [1, 960, 540];
const slamFit = (y, txt, col, k) => slamLine(y, txt, Math.min(170, 170 * 1720 / tw(txt, 170, 700, "Fredoka", 4)), col, k);
window.SHELF_AWAY = (t) => { const a = W("m802", "cross") - .3, b = LE("m803") + .4, w = SCN.waitw; return Math.max(ss(a, a + .35, t) * (1 - ss(b, b + .35, t)), ss(w.t0 + .3, w.t0 + .8, t) * (1 - ss(SCN.pullout.t1, SCN.pullout.t1 + .4, t))); };
const sr = (t, cam, o = {}) => SR26(t, o, cam);
const BL = [330, 1076, 480], MR = [1760, 1076, 480], PM = [1530, 1010, 400];
const camRoom = camOn([960, 620], 1.06, 960, 600), camLamp = camOn([1250, 760], 1.5, 1100, 600);
const paper = (t, x, y, k, mark) => TF(x, y, k, `<g filter="url(#dropS)"><rect x="-150" y="-200" width="300" height="400" rx="10" fill="#FFFFFF" stroke="#C9D2DA" stroke-width="4"/></g>` + [...Array(7)].map((_, i) => `<path d="M-120 ${-130 + i * 40} H${i % 3 === 2 ? 40 : 120}" stroke="#9AA6B2" stroke-width="6"/>`).join("") + `<circle cx="80" cy="-150" r="44" fill="#fff" stroke="#D84A3A" stroke-width="6"/>` + T(80, -136, mark, 34, "#D84A3A", { w: 700 }));
const pill1 = (t, t0, t1) => OP(ramp(t, t0, .4) * (1 - ramp(t, t1, .4)), lowerPill(60, 96, "A school science room, Singapore ·", "Thursday after school"));
/* 1 · cold open: Basil holds his quiz paper (1/3) up, stunned; the others watch; the lamp on the bench */
SC.cold = (t, s) => { const [px, py] = pawPt("basil", BL[0], BL[1], BL[2], false), tm = MK("mark13");
  return sr(t, camMix(camRoom, camOn([800, 700], 1.15, 900, 600), eio(clamp(t / 8))), {}) + bd("pip", PM[0], PM[1], PM[2], t, { in: -1, flip: true, ...watchO(PM[0], px), poses: [[0, "sit"], ...glanceWave(.9)] }) + bd("momo", MR[0], MR[1], MR[2], t, { in: -1, flip: true, ...watchO(MR[0], px) })
    + bd("basil", BL[0], BL[1], BL[2], t, { in: -1, poses: [[0, "sit"], [tm - .2, "surprised"], [tm + 2.2, "sit"]] }) + TF(px + 120, py - 140 - 20 * spring(t, .5, .4), .9, paper(t, 0, 0, 1, "1/3")) + pill1(t, .2, 6.5) + HUD(t); };
const TITLE = (k1, k2) => slamFit(400, "ONE MARK?!", "#fff", k1) + slamFit(610, "MEET THE CECL GENIE", P.sun, k2);
SC.title = (t, s) => { const u = t - MK("title"), dim = clamp(u / .2); return lcSet(t, s, "cold") + `<rect width="1920" height="1080" fill="${P.night}" opacity="${n2(.78 * dim)}"/>` + TITLE(slamK(u, .05), slamK(u, .55)) + HUD(t); };
/* 2 · today: Momo slides the gold lamp forward on the bench (lamp); it glows; the camera glides to it, then on to the window (the game) */
const camWin = camOn([DFAT.intro[0], DFAT.intro[1]], 1.6, 760, 480);
const camToday = (t) => { const s = SCN.today, a = eio((t - s.t0) / 1.8), c = eio((t - (s.t1 - 1.5)) / 1.5); return c > 0 ? camMix(camLamp, camWin, c) : camMix(camRoom, camLamp, a); };
SC.today = (t, s) => { const out = s.t1 - 1.4; return sr(t, camToday(t), { rise: t >= MK("lamp") ? .25 * spring(t, MK("lamp"), .5) : 0 }) + bd("basil", BL[0], BL[1], BL[2], t, { in: s.t0 + .1, out, ...watchO(BL[0], 1250) }) + bd("pip", PM[0], PM[1], PM[2], t, { in: s.t0 + .15, out: out + .1, flip: true, ...watchO(PM[0], 1250) })
  + bd("momo", MR[0], MR[1], MR[2], t, { in: s.t0 + .05, out: out + .2, flip: true, poses: [[s.t0, "sit"], [MK("lamp") - .1, "pointing"], [MK("lamp") + 1.8, "sit"]] }) + meltScene(t, s, "title", .5, true) + HUD(t); };   // popfix 25 Nov 2026: still a hard cut from the title (another framing), but the buddies glide from their title spots (they used to pop in again)
SC.game = (t, s) => { const cE = camToday(SCN.today.t1), p = DFAT.intro;
  return gameScene(t, s, ["m202", "m203p", "m204"], false, { world: (tt) => sr(tt, cE, {}), A: camPt(cE, [p[0], p[1]]), T: [680, 440], Z: 2.6, dim0: 0, finder: "pip",
    poses: { momo: [[W("m202", "dragonfly") + .1, "surprised"], [W("m202", "dragonfly") + 1.8, "sit"]], basil: [[W("m204", "buddies") - .1, "waving"], [W("m204", "buddies") + 1.0, "sit"]] } }) + smallPrint(t, LT("m204"), LOOK_RULE); };
SC.goals = (t, s) => goals3(t, s, [["The four parts of a full answer", ""], ["Evidence from the question", ""], ["The concept you remember", ""]], ["m301p", "m302p", "m303p", "m304p"], "pip");
/* 4 · the question, read slowly: the card at the left, the picture of the two bars at the right (X swings away at qaway, Y towards at qtowards) */
SC.question = (t, s) => { const sw = t < MK("qaway") ? 0 : eio(clamp((t - MK("qaway")) / .8));
  return bg("stage2") + OP(ramp(t, s.t0, .3), qCard26(t, "m401", barsPic26(t, { swing: sw, arrows: t >= MK("qtowards") + .6 }))) + bd("basil", 1780, 1076, 300, t, { in: s.t0 + .3, flip: true, watch: 1300 }) + HUD(t); };
SC.r1card = (t, s) => roundCard(t, s, "ROUND 1");
SC.r1 = (t, s) => { const L1 = "m402"; return lockN(t, { t0: LT(L1) - .1, cards: ["Basil's", "Pip's", "Momo's"], clues: [["X moves away", LT(L1)], ["Y moves towards", LT(L1) + .2], ["Which bar is a magnet?", LT(L1) + .4]], lead: "basil", csize: 34, q: "Which answer gets full marks?", tq: W(L1, "which") - .1,
  tc: [W(L1, "one"), W(L1, "two"), W(L1, "three")], ring0: MK("ring0_r1"), dur: 5, lock: "m403", pics: [0, 1, 2].map((i) => ansCard26(i, t)), obj: ringP1_26,
  react: [[LE("m406m") + .1, "momo", "pointing"]], picks: [{ who: "basil", id: "m404b", word: "1" }, { who: "pip", id: "m405p", word: "2" }, { who: "momo", id: "m406m", word: "3" }] }); };
/* 5 · Be an answer! A glide into Basil's quiz paper on the bench */
const camWait = (t) => { const s = SCN.waitw, u = eio((t - s.t0) / (s.t1 - s.t0)); return camMix(camRoom, camOn([800, 840], 5.0, 960, 560), u * u); };
SC.waitw = (t, s) => { const L = "m501", tP = W(L, "be") - .15, sh = W(L, "shrink") - .1;
  const buds = ["basil", "pip", "momo"].map((w, i) => { const X = [BL, PM, MR][i]; return bd(w, X[0], X[1], X[2], t, { in: s.t0 + .1 + .05 * i, out: sh + .2 * i + .3, flip: X[0] > 960, poses: [[s.t0, "sit"], [tP + .2 + .15 * i, "waving"]], wave: true }); }).join("");
  return sr(t, camWait(t), { bench: TF(800, 846, .5, `<rect x="-150" y="-30" width="300" height="40" fill="#fff" stroke="#C9D2DA" stroke-width="4"/>`) }) + OP(1 - ss(s.t1 - 1.0, s.t1 - .5, t), buds + (t >= tP ? TF(960, 250, spring(t, tP, .45), tpill(0, 0, "Be an answer!", 76, P.sun, P.ink, { w: 700 })) : "") + HUD(t)) + wipe(t, s.t1, "#FFFDF6", 960, 600); };
const riders26 = (t, s, o) => { let out = ""; for (const who of ["momo", "pip", "basil"]) { const [x, y] = o.at[who]; out += buddy(who, x, y, o.h || 190, t, { in: o.tin + ({ pip: 0, basil: .15, momo: .3 })[who], poses: (o.poses || {})[who] || [], tag: false, rim: "rimB", ...watchO(x, o.look || 960) }); } return out; };
SC.shrink = (t, s) => { const m = MK, rp = { basil: [[m("jfull") + .1, "surprised"], [m("jfull") + 1.8, "sit"]], pip: glanceWave(m("jline") + 2.0) };
  return answerJourney(t, s) + riders26(t, s, { tin: m("jline") + .6, at: { pip: [200, 1044], basil: [1760, 1050], momo: [420, 1040] }, poses: rp, look: 960 }) + youTag(t, MK("jline"), "You: an answer, being built"); };
SC.pullout = (t, s) => { const u = 1 - eo((t - s.t0) / .6); return sr(t, camMix(camRoom, camOn([800, 840], 5, 960, 560), u), {}) + bd("basil", BL[0], BL[1], BL[2], t, { in: s.t0 + .2 }) + bd("pip", PM[0], PM[1], PM[2], t, { in: s.t0 + .25, flip: true }) + bd("momo", MR[0], MR[1], MR[2], t, { in: s.t0 + .3, flip: true }) + wipe(t, s.t0, "#FFFFFF") + HUD(t); };
/* 6 · the answer is three; the Genie rises from the lamp (genie) and the four tiles appear (tiles). Momo confident; Basil and Pip shy */
SC.answer = (t, s) => { const tA = MK("ansglow"), rise = t >= MK("genie") ? eio(clamp((t - MK("genie")) / 1.4)) : 0;
  return sr(t, camMix(camRoom, camLamp, eio(clamp((t - MK("genie") + .4) / 1.4))), { rise }) + `<g filter="url(#drop)"><rect x="30" y="110" width="660" height="200" rx="24" fill="#FFF8EA" opacity=".92"/></g>` + [0, 1, 2].map((i) => TF(140 + i * 205, 205, .42, choiceCard3(i + 1, ["Basil's", "Pip's", "Momo's"][i], ansCard26(i, t), { w: 400, h: 330, size: 34, id: "an" + i, lit: i === 2 && t >= tA ? spring(t, tA, .45) : 0 }))).join("")
    + coin(t, MK("coin1") - .1, 860, 400, "+1", "if you showed three fingers") + (t >= MK("tiles") ? TF(960, 230, .62 * spring(t, MK("tiles"), .45), ceclTiles26(t, {})) : "")
    + bd("basil", BL[0], BL[1], BL[2], t, { in: s.t0 + .1 }) + bd("pip", PM[0], PM[1], PM[2], t, { in: s.t0 + .15, flip: true }) + bd("momo", MR[0], MR[1], MR[2], t, { in: s.t0 + .2, flip: true }) + melt(t, s, "pullout", .3) + HUD(t); };
/* 7 · Basil asks; [LOOK CLOSER] his answer under the lamp; faces: Basil lower left (shy), then Momo lower right (EVIDENCE; cheer) */
SC.lc1q = (t, s) => sr(t, camLamp, { rise: 1 }) + bd("pip", PM[0], PM[1], PM[2], t, { in: s.t0 + .15, flip: true, ...watchO(PM[0], 1250) }) + bd("momo", MR[0], MR[1], MR[2], t, { in: s.t0 + .1, flip: true, ...watchO(MR[0], 1250) }) + bd("basil", BL[0], BL[1], BL[2], t, { in: s.t0 + .05, ...watchO(BL[0], 1250) }) + HUD(t);
const peek26 = (who, side, t, tin, tout, poses, o = {}) => { if (t < tin - .05 || (tout !== undefined && t > tout + .3)) return ""; const W_ = LCW, x = side === "l" ? W_.x - W_.w / 2 + 200 : W_.x + W_.w / 2 - 200;
  return bd(who, x, W_.y + W_.h / 2 + 470 * .42 + (1 - eo((t - tin) / .45)) * 350, 470, t, { in: tin, out: tout, poses: [[tin, "sit"], ...(poses || [])], peek: true, tag: false, shadow: false, flip: side === "r", nohop: true, achieved: o.achieved, watch: W_.x }); };
SC.lcbasil = (t, s) => { window._BUBAT = { '*': [960, 905] }; const p = camPt(camLamp, [1250, 760]);
  return lookCloser(t, s, { tz: s.t0, fx: p[0], fy: p[1], art: lcBasilArt, bgc: GNAVY, set: (tt) => sr(tt, camLamp, { rise: 1 }), verdict: ["CHOICE ✓ · EVIDENCE? CONCEPT? LINK?", "#4a90e2"], tv: MK("v_basil"), peek: false,
    over: (tt) => peek26("basil", "l", tt, s.t0 + 1.2, undefined, [[LE("m704b") + .1, "cheer"], [LE("m704b") + 2.0, "sit"]], { achieved: true }) + peek26("momo", "r", tt, LT("m706m") - .5, undefined, [[LE("m706m") + .1, "cheer"], [LE("m706m") + 2.2, "sit"]], { achieved: true }) + tryRing26(tt, MK("try1"), 960, 560, 1.2) }); };
SC.mark1 = (t, s) => markScene(t, s, { id: "m708", sayId: "m707", who: "momo", n: "1 of 2", tab: "A full answer", text: TL.lines.m708.text, keys: ["four", "parts:", "Choice,", "Evidence,", "Concept", "Link."], size: 60, y: 250, footer: FOOT, poses: [[LE("m708") + .2, "sit"]], under: markTiles26(t, 1250, 930, .7 * spring(t, s.t0 + .4, .5)), extra: bd("basil", 1790, 1076, 300, t, { in: s.t0 + .3, flip: true }) });
/* 8 · HOLD ON! Pip holds up his card "Concept: Bar X moves away from the magnet." (the question's own words); the ring; Basil's fix */
const RG = [960, 420], RR = 215;
SC.holdon = (t, s) => { window._BUBAT = { pip: [960, 230], basil: [960, 230], momo: [960, 230] }; const b = "m802", c = "m803", r0 = MK("ring0_hold"), bell = MK("bell_hold"), rs = ringState(t, r0, 5), tX = W(b, "cross") - .15, tH = W(b, "hold") - .1, tOne = W(c, "one") - .1, inT = t >= r0 && t < bell;
  const st = ss(tX - .1, tX + .4, t) * (1 - ss(LE(c) + .1, LE(c) + .6, t)), ring = st > .01, [px, py] = pawPt("pip", 420, 1060, 470, false);
  const card = TF(px + 300, py - 260, .8, ringHold26(t).replace(/^<g transform="translate\(430 470\) scale\(1\)">/, "<g>")), fixed = t >= MK("rule") ? TF(1300, 260, spring(t, MK("rule"), .4), tpill(0, 0, "Concept: like poles repel.", 44, "#ffb627", "#fff", { w: 700 })) + (t >= MK("own") ? TF(1300, 360, spring(t, MK("own"), .4), tpill(0, 0, "That is Evidence!", 40, "#4a90e2", "#fff", { w: 700 })) : "") : "";
  const inner = `<clipPath id="hoC"><circle cx="${RG[0]}" cy="${RG[1]}" r="${RR - 24}"/></clipPath><circle cx="${RG[0]}" cy="${RG[1]}" r="${RR - 24}" fill="#FFFDF6"/><g clip-path="url(#hoC)"><g transform="translate(${RG[0]} ${RG[1] + 5}) scale(.7) translate(-430 -470)">${ringHold26(t)}</g></g>`;
  const labels = [["a Concept?", 420, 250, -1], ["the question's words", 1500, 250, 1], ["Bar X moves away", 420, 560, -1]].map(([l, x, y, sd], i) => { const t0 = tX + .2 + i * .15; return t < t0 ? "" : pline(x - sd * 190, y + 40, RG[0] + sd * RR * .8, RG[1] + (i === 2 ? RR * .4 : -RR * .6), ramp(t, t0, .2)) + clue3(x, y, l, spring(t, t0, .4), 50, 520); }).join("");
  const bob = inT ? 16 * Math.sin((t - r0) * Math.PI * 2) : 6 * Math.sin(t * 3);
  return sr(t, camRoom, { rise: 1, bug: t < r0 - 1 || t > bell + 1 ? DFAT.holdon : false }) + (ring && st > .99 ? "" : OP(1 - st, card)) + fixed
    + (ring ? OP(st, bg("stage")) + OP(st, TF(RG[0], RG[1], spring(t, tX, .45) * (1 + .035 * (inT ? rs.tick : 0)), `<g transform="translate(${-RG[0]} ${-RG[1]})">${ringTimer(RG[0], RG[1], t < r0 ? 1 : t < bell ? rs.frac : 0, t < r0 ? 5 : t < bell ? rs.secs : 0, t, { R: RR, sw: 34, tick: rs.tick, shut: pulse(t, bell, .01, .6), chg: inT || (t >= bell && t < bell + .5) ? (t >= bell ? bell : rs.chg) : -9, ns: 1.25, inner })}</g>`)
      + labels + TF(1700, 800 + bob, .9 * spring(t, tX + .1, .4), `<g filter="url(#dropS)">${crossedArms()}</g>`) + youPill(1700, 640 + bob * .6, 1.2) + TF(1700, 990, spring(t, tX + .2, .4), tpill(0, 0, "cross your arms", 38, P.ink, "#fff", { w: 700 }))) : "")
    + bd("basil", MR[0], MR[1], MR[2], t, { in: LT(c) + .3, flip: true }) + bd("momo", PM[0] - 300, PM[1], PM[2], t, { in: LT(c) + .4, flip: true })
    + bd("pip", 420, 1060, 470, t, { in: s.t0 + .1, rock: inT ? 2.2 : 0, poses: [[s.t0, "sit"], [W(b, "something") + .2, "thinking"], [bell + .35, "sit"]], jump: [[bell + .02, 30]], nohop: true })
    + stamp(t, tH, 960, 560, "HOLD ON!") + bellIcon(t, r0) + coin(t, tOne, 960, 330, "+1", "arms crossed") + HUD(t); };
/* 9 · Pip asks; [LOOK CLOSER] Momo's answer built part by part; faces: Pip lower left (CONCEPT; cheer), Momo lower right */
SC.lc2q = (t, s) => sr(t, camLamp, { rise: 1 }) + bd("basil", PM[0], PM[1], PM[2], t, { in: s.t0 + .15, flip: true, ...watchO(PM[0], 1250) }) + bd("momo", MR[0], MR[1], MR[2], t, { in: s.t0 + .1, flip: true, ...watchO(MR[0], 1250) })
  + bd("pip", BL[0], BL[1], BL[2], t, { in: s.t0 + .05, poses: [[s.t0, "sit"], [LE("m901p") + .05, "thinking"]] }) + HUD(t);
SC.lcbuild = (t, s) => { window._BUBAT = { '*': [960, 905] }; const p = camPt(camLamp, [1250, 760]);
  return lookCloser(t, s, { tz: s.t0, fx: p[0], fy: p[1], art: lcBuildArt, bgc: GNAVY, set: (tt) => sr(tt, camLamp, { rise: 1 }), verdict: ["C · E · C · L: FULL MARKS", GOODC], tv: MK("v_full"), peek: false,
    over: (tt) => peek26("pip", "l", tt, LT("m906p") - .5, undefined, [[LE("m906p") + .1, "cheer"], [LE("m906p") + 2.2, "sit"]], { achieved: true }) + peek26("momo", "r", tt, LT("m907m") - .5, undefined, []) }); };
SC.mark2 = (t, s) => markScene(t, s, { id: "m909", sayId: "m908", who: "basil", n: "2 of 2", tab: "Evidence and Concept", text: TL.lines.m909.text, keys: ["Evidence", "shows", "Concept", "rule", "remember."], size: 56, y: 240, footer: FOOT, poses: [[LE("m909") + .2, "sit"]], under: markEC26(t, 1250, 930, .7 * spring(t, s.t0 + .4, .5)), extra: bd("pip", 1790, 1076, 300, t, { in: s.t0 + .3, flip: true }) });
/* 10 · score, the dragonfly (the REVEAL spot: a twig of the tree outside), Basil's fun fact */
SC.final = (t, s) => { const L = "m1001"; return finalScene(t, s, L, 0, [[s.t0, null, 1], [W(L, "two") - .1, null, 2]]); };
SC.liz = (t, s) => { const L = "m1002", tq = W(L, "it") - .1, c = DFAT.liz, tc = W(L, "dragonfly");
  return lizReveal(t, s, L, sr(t, W0, { bug: c, rise: 0 }), c[0], c[1], tq, "It was on a twig of the tree outside!", -120, 160, 80, 2.8, { from: () => SC.final(SCN.final.t1 - .04, SCN.final), qx: 1000, qy: 724, tx: 960, ty: 985, tell: "m1004",
    fact: { id: "m1003b", at: [1250, 400], w: 760, h: 440, items: [["ff_eyes", "huge eyes", ffEyes26], ["ff_side", "evidence from every side", ffSide26]], cols: ["#2F6FD6", "#4a90e2"], sx: 1300, sy: 860, poses: [[MK("ff_in") - .4, "surprised"], [MK("ff_in") + .3, "sit"]] } })
    + bd("momo", 170, 1076, 330, t, { in: s.t0 + .6, poses: [[s.t0 + .6, "sit"], [tc + .4, "pointing"], [LT("m1003b") - .3, "sit"]] })
    + bd("pip", 390, 1076, 330, t, { in: s.t0 + .7, poses: [[s.t0 + .7, "sit"], [MK("ff_side") + .2, "surprised"], [MK("ff_side") + 1.6, "sit"], [LT("m1004") - .1, "waving"], [s.t1, "sit"]], wave: true }) + smallPrint(t, s.t0 + .5, LOOK_RULE); };
SC.cliff = (t, s) => sr(t, camLamp, { rise: 1 }) + bd("pip", PM[0], PM[1], PM[2], t, { in: s.t0 + .1, flip: true, ...watchO(PM[0], 1250) }) + bd("momo", MR[0], MR[1], MR[2], t, { in: s.t0 + .15, flip: true, ...watchO(MR[0], 1250) })
  + bd("basil", BL[0], BL[1], BL[2], t, { in: s.t0, poses: [[s.t0, "sit"], [LT("m1101b") + .2, "pointing"], [LE("m1101b") + .2, "sit"]] }) + (t >= W("m1102", "full") - .1 ? TF(800, 300, spring(t, W("m1102", "full") - .1, .45), tpill(0, 0, "Your turn!", 70, P.sun, P.ink, { w: 700 })) : "") + HUD(t);
SC.nyk = (t, s) => nykScene(t, s, TF(960, 820, .7, ceclTiles26(t, {})), { bx: [230, 1730, 1500], hx: 470 });
})(); }
