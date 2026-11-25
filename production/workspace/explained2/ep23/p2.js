// p2.js: PART 2, "Ten Turns or Twenty? Make the STRONGEST Electromagnet": the recap, the school science room and its old electric bell,
// Round 1 (ten turns or twenty, one battery each), be a steel bolt, the answer and TURNS OF WIRE (Basil), why do more turns help? (the same
// nails, wire and battery; each turn adds a little pull: STRENGTH, Momo; the school bell cut away; Mark Sentence 7.6, Basil), the Showdown
// (Momo's poster: "a light wooden chopstick works too"; the strip 7.8), no more wire? (one battery or two: NUMBER OF BATTERIES, Pip; the crane
// carries the bolt to the lorry; Mark Sentence 7.7, Pip), the chant, the cricket, the dare into EP24. Segments 1-14 of ../p3_ep23_script.md
// section 5. One real place: the SCHOOL SCIENCE ROOM on Monday after school (sets23.js SR23). As Part 1: big buddies in the scene, things held
// at the paws, the camera never cuts inside the place, every pose with its reason, the buddies WATCH every close-up demonstration.
if (PART === 2) { (() => {
SCORE.push([MK("coin1") - .1, 1, 1]);
SCORE.push([MK("coin2") - .1, 3, 1]);
const FOOT = "P3 · Making and Using Magnets · The electrical method";
const bd = (who, x, y, h, t, o = {}) => buddy(who, x, y, h, t, o);
const W0 = [1, 960, 540];
window.SHELF_AWAY = (t) => { const w = SCN.waitw; return ss(w.t0 + .3, w.t0 + .8, t) * (1 - ss(SCN.pullout.t1, SCN.pullout.t1 + .4, t)); };
// HOW STRONG?'s rows (rows 1 and 2 at the answer, row 3 at `chart`, READY FOR RECYCLING WEEK! in the ending)
const HSO = (o = {}) => ({ r1: MK("rows"), r2: MK("rows") + .6, r3: MK("chart"), ...o });
const sr = (t, cam, o = {}) => SR23(t, { hsO: HSO(), ...o }, cam);
// the bench's props: the mini crane (its hook: o.hook turns, o.hb batteries), its scrap tray, the paper lorry
const CR = [740, 852, .5], SCRAP = [615, 866, .42], LORRY = [866, 862, .32];
const benchTop = (t, o = {}) => (o.crane === false ? "" : miniCrane23(t, CR[0], CR[1], CR[2], { rig: { n: o.hook || 10 }, batt: o.hb || 1, ...(o.craneO || {}) })) + scrapTray23(t, SCRAP[0], SCRAP[1], SCRAP[2], o.scrapO || {}) + paperLorry23(t, LORRY[0], LORRY[1], LORRY[2], o.lorryO || {});
const BL = [330, 1076, 480], MR = [1700, 1076, 480], PM = [1450, 1010, 400];

/* 1 · "Last time...": a calm recap, three pictures from Part 1, one at a time, centred and large, a gentle push-in, one label each */
SC.lasttime = (t, s) => { const tb = [s.t0, MK("pic2") - .2, MK("pic3") - .2], i = t >= tb[2] ? 2 : t >= tb[1] ? 1 : 0, labs = ["Battery joined: an electromagnet", "Battery away: the clips drop", "Batteries only"], u = t - tb[i], z = 1 + .05 * eio(u / 4), k = ramp(t, tb[i], .5);
  return bg("stage2") + OP(ramp(t, s.t0, .3), T(960, 110, "Last time…", 60, "#fff", { w: 600 }))
    + OP(k, TF(960, 520, z, `<g filter="url(#drop)"><rect x="-534" y="-314" width="1068" height="628" rx="40" fill="#FFF8EA"/></g><clipPath id="rcP"><rect x="-520" y="-300" width="1040" height="600" rx="30"/></clipPath><g clip-path="url(#rcP)">${recapP2(i, t)}</g>`))
    + OP(k, TF(960, 930, spring(t, tb[i] + .1, .4), tpill(0, 0, labs[i], 46, P.sun, P.ink, { w: 700 }))) + HUD(t); };
/* 2 · the school science room on Monday after school: the camera starts on the OLD ELECTRIC BELL above the door, ringing for dismissal (ring:
   the hammer a blur), then glides back into the room (one move) and on towards the windowsill, where the game's push-in starts. The place
   card from the start (it stays into the game's first second: >= 2.5 s) */
const camBell = camOn([SR.bell[0], SR.bell[1] + 30], 2.6, 960, 420), camRoom = camOn([960, 620], 1.06, 960, 600), camSill = camOn([CKAT.intro[0], CKAT.intro[1] - 20], 1.7, 760, 480);
const camLab = (t) => { const s = SCN.lab, a = eio((t - MK("ring") - .9) / 1.3); return camMix(camBell, camRoom, a); };
const pill2 = (t, t0, t1) => OP(ramp(t, t0, .4) * (1 - ramp(t, t1, .4)), lowerPill(60, 96, "A school science room, Singapore ·", "Monday after school"));
SC.lab = (t, s) => { const rg = t >= MK("ring") && t < MK("ring") + 1.9 ? 1 : 0;
  return sr(t, camLab(t), { bell: rg, bench: benchTop(t) }) + bd("basil", BL[0], BL[1], BL[2], t, { in: s.t0 + .9, ...watchO(BL[0], 1600) }) + bd("pip", PM[0], PM[1], PM[2], t, { in: s.t0 + 1.0, flip: true, ...watchO(PM[0], 1600) })
    + bd("momo", MR[0], MR[1], MR[2], t, { in: s.t0 + 1.1, flip: true, ...watchO(MR[0], 1600) }) + pill2(t, s.t0, s.t1 + 1.4) + smallPrint(t, s.t0 + .4, ADULT_RULE) + HUD(t); };
SC.game = (t, s) => { const cE = camRoom, p = CKAT.intro;
  return gameScene(t, s, ["n202", "n202", "n204"], false, { world: (tt) => sr(tt, cE, { bench: benchTop(tt) }), A: camPt(cE, [p[0], p[1] - 10]), T: [680, 440], Z: 2.8, dim0: 0, finder: "momo",
    poses: { pip: [[W("n202", "cricket") + .1, "surprised"], [W("n202", "cricket") + 1.8, "sit"]], momo: [[LT("n204") - .1, "waving"], [LT("n204") + 1.0, "sit"]] } }) + pill2(t, SCN.lab.t0, s.t0 + .9) + smallPrint(t, LT("n204"), LOOK_RULE); };
SC.goals = (t, s) => goals3(t, s, [["More turns of wire", ""], ["More batteries", ""], ["Iron and steel, not wood", ""]], ["n301p", "n302p", "n303p", "n304p"], "pip");
SC.r1card = (t, s) => roundCard(t, s, "ROUND 1");

/* 4 · Round 1: ten turns or twenty? THREE big numbered picture cards (ten turns · twenty turns · both the same); the ring's picture: the two
   coiled nails over the tray, each with its holder; the clue labels ten turns · twenty turns · one battery each ON TOP. Basil leads (worried
   in the ring). Picks Pip 3, Basil 2, Momo 2; Pip points at the two identical holders after his line; Momo along the long coil */
const R1 = ["ten turns", "twenty turns", "both the same"], L1 = "n401";
SC.r1 = (t, s) => lockN(t, { t0: LT(L1) - .1, cards: R1, clues: [["ten turns", W(L1, "ten")], ["twenty turns", W(L1, "twenty")], ["one battery each", W(L1, "each")]], csize: 34, lead: "basil", q: "Which nail attracts more steel clips?", tq: W(L1, "which") - .1,
  tc: [W(L1, "one", 1), W(L1, "two"), W(L1, "three")], ring0: MK("ring0_r1"), dur: 5, lock: "n402", pics: [0, 1, 2].map((i) => cardP2(i, t)), obj: ringP2_23,
  react: [[LE("n403p") + .1, "pip", "pointing"], [LE("n405m") + .1, "momo", "pointing"]],
  picks: [{ who: "pip", id: "n403p", word: "3" }, { who: "basil", id: "n404b", word: "2" }, { who: "momo", id: "n405m", word: "2" }] });

/* 5 · Be a steel bolt! One glide down into the mini crane's scrap tray (no cut); the buddies wave the viewer off, then shrink with a pop.
   The cricket on the rim of the sink, as the camera passes */
const camWait = (t) => { const s = SCN.waitw, u = eio((t - s.t0) / (s.t1 - s.t0)); return camMix(camRoom, camOn([SCRAP[0], SCRAP[1] - 16], 5.4, 960, 600), u * u); };
SC.waitw = (t, s) => { const L = "n501", tP = W(L, "be") - .15, sh = W(L, "shrink") - .1;
  const buds = ["basil", "pip", "momo"].map((w, i) => { const X = [BL, PM, MR][i]; return bd(w, X[0], X[1], X[2], t, { in: s.t0 + .1 + .05 * i, out: sh + .2 * i + .3, flip: X[0] > 960, poses: [[s.t0, "sit"], [tP + .2 + .15 * i, "waving"]], wave: true }); }).join("");
  return sr(t, camWait(t), { bench: benchTop(t) }) + OP(1 - ss(s.t1 - 1.0, s.t1 - .5, t), buds + (t >= tP ? TF(960, 250, spring(t, tP, .45), tpill(0, 0, "Be a steel bolt!", 76, P.sun, P.ink, { w: 700 })) : "") + HUD(t)) + wipe(t, s.t1, "#C49A62", 960, 600); };
const riders23 = (t, s, o) => { let out = ""; for (const who of ["momo", "pip", "basil"]) { const [x, y] = o.at[who]; out += buddy(who, x, y, o.h || 200, t, { in: o.tin + ({ pip: 0, basil: .15, momo: .3 })[who], poses: (o.poses || {})[who] || [], tag: false, rim: "rimB", jump: (o.jolts || []).map((tj) => [tj, 34]), ...watchO(x, o.look || 960) }); } return out; };
SC.shrink = (t, s) => { const m = MK, rp = { momo: [[m("jjump") + .15, "surprised"], [m("jjump") + 2.0, "sit"]], basil: glanceWave(m("jrings") + 2.4) };
  return boltJourney(t, s) + riders23(t, s, { tin: m("jtray") + .6, h: 200, at: { pip: [210, 1044], basil: [1720, 1050], momo: [400, 1040] }, poses: rp, jolts: [m("jslip") + .05, m("jjump") + .3] })
    + youTag(t, MK("jtray"), "You: a steel bolt") + feelTag(t, MK("jtray") + .8, MK("jrings") - .2, "to scale: a steel bolt", 160); };
// the pull back out: the bench at normal size; Basil holds the twenty-turn nail (a bigger bunch), Momo the ten-turn nail (a small bunch),
// each joined to its battery for a moment
const heldCoil = (t, who, X, n, nb, o = {}) => { const fl = X[0] > 960, [px, py] = pawPt(who, X[0], X[1], X[2], fl); return rigW(t, { head: [px, py - 40], ang: fl ? 120 : 60, k: .48, n, hold: [fl ? X[0] - 330 : X[0] + 330, 852], hk: .36, flow: o.flow === undefined ? .7 : o.flow, clips: o.clips === false ? null : [nb, {}], ...o }); };
SC.pullout = (t, s) => { const u = 1 - eo((t - s.t0) / .6);
  return sr(t, camMix(camRoom, camOn([SCRAP[0], SCRAP[1] - 16], 5, 960, 600), u), { bench: benchTop(t) + trayClips22(t, 560, 900, .4, { n: 12 }) + trayClips22(t, 1360, 900, .4, { n: 12 }) + heldCoil(t, "basil", BL, 20, 6) + heldCoil(t, "momo", MR, 10, 3) })
    + bd("basil", BL[0], BL[1], BL[2], t, { in: s.t0 + .2 }) + bd("pip", 960, 1010, 400, t, { in: s.t0 + .25 }) + bd("momo", MR[0], MR[1], MR[2], t, { in: s.t0 + .3, flip: true }) + wipe(t, s.t0, "#FFFFFF") + HUD(t); };

/* 6 · the answer is two: Basil's twenty turns. HOW STRONG?'s rows 1 and 2 fill with a drawn bunch each (no numbers; the second bigger);
   the three cards small at the top (card 2 lit; "not this one" on 1 and 3); the coins YOU +1 and BUDDIES +1. Basil and Momo confident, Pip
   shy (OUTCOMES). Basil teaches TURNS OF WIRE (a line to his turns) and cheers after his line. The cricket on the rung of a tall stool */
const camAns = (t) => { const a = eio((t - MK("rows") + .3) / 1.0) * (1 - eio((t - MK("coin1") - .4) / 1.2)); return camMix(camRoom, camOn([1150, 640], 1.4, 1160, 560), a); };
SC.r1ans = (t, s) => { const tA = MK("ansglow"), tK = MK("kw_turns_of_wire"), cam = camAns(t), [px, py] = pawPt("basil", BL[0], BL[1], BL[2], false), tp = camPt(cam, [px + 60, py - 20]);
  return sr(t, cam, { bench: benchTop(t) + trayClips22(t, 560, 900, .4, { n: 12 }) + trayClips22(t, 1360, 900, .4, { n: 12 }) + heldCoil(t, "basil", BL, 20, 6) + heldCoil(t, "momo", MR, 10, 3) })
    + `<g filter="url(#drop)"><rect x="30" y="40" width="640" height="200" rx="24" fill="#FFF8EA" opacity=".92"/></g>` + [0, 1, 2].map((i) => TF(140 + i * 205, 135, .42, choiceCard3(i + 1, R1[i], cardP2(i, t), { w: 400, h: 330, size: 34, id: "ra" + i, lit: i === 1 && t >= tA ? spring(t, tA, .45) : 0 }))).join("")
    + tagAt(t, tA + .3, 140, 222, 1, "not this one", 20) + tagAt(t, tA + .4, 550, 222, 1, "not this one", 20) + coin(t, MK("coin1") - .1, 860, 330, "+1", "if you showed two fingers") + coin(t, MK("coin1") + .2, 1640, 200, "+1", "Buddies")
    + bd("basil", BL[0], BL[1], BL[2], t, { in: s.t0 + .1, poses: [[s.t0, "sit"], [LE("n602b") + .05, "cheer"]], achieved: true })
    + bd("pip", 960, 1010, 400, t, { in: s.t0 + .15 }) + bd("momo", MR[0], MR[1], MR[2], t, { in: s.t0 + .2, flip: true })
    + (t >= tK + .2 && t < tK + 2.4 ? pline(900, 360, tp[0], tp[1], ramp(t, tK + .2, .3), P.sun) : "") + melt(t, s, "pullout", .3) + HUD(t); };

/* 7 · Pip (big at the left, still shy) holds the two identical battery holders side by side: "But it is the same battery. How can more
   turns make it stronger?" Thinking (his own question) is shown only as the outcome allows (shy). Momo big at the right, Basil in the
   mid-ground. A push in on the two batteries. The cricket on the leg of Momo's folded easel by the wall */
const camQ1 = (t) => { const s = SCN.lc1q, u = eio((t - s.t0) / (s.t1 - s.t0)); return camMix(camRoom, camOn([460, 820], 1.45, 720, 600), u); };
SC.lc1q = (t, s) => { const [px, py] = pawPt("pip", BL[0], BL[1], BL[2], false);
  return sr(t, camQ1(t), { bench: benchTop(t) }) + bd("basil", 960, 1010, 400, t, { in: s.t0 + .15, ...watchO(960, px) }) + bd("momo", MR[0], MR[1], MR[2], t, { in: s.t0 + .1, flip: true, ...watchO(MR[0], px) })
    + bd("pip", BL[0], BL[1], BL[2], t, { in: s.t0 + .05 }) + TF(px + 20, py - 20, .34, battHolder23(t, 1)) + TF(px + 120, py + 10, .34, battHolder23(t, 1)) + HUD(t); };
const peek23 = (who, side, t, tin, tout, poses, o = {}) => { if (t < tin - .05 || (tout !== undefined && t > tout + .3)) return ""; const W_ = LCW, x = side === "l" ? W_.x - W_.w / 2 + 200 : W_.x + W_.w / 2 - 200;
  return bd(who, x, W_.y + W_.h / 2 + 470 * .42 + (1 - eo((t - tin) / .45)) * 350, 470, t, { in: tin, out: tout, poses: [[tin, "sit"], ...(poses || [])], peek: true, tag: false, shadow: false, flip: side === "r", nohop: true, achieved: o.achieved, watch: W_.x }); };
/* [LOOK CLOSER] why do more turns help? (lc23.js lcTurnsArt). Faces: Pip at the lower left (shy: his pick is being corrected), Momo at the
   lower right (teaching STRENGTH; cheer after her line: a key word learnt), then Basil for a moment at the bell (surprised: the bell he hears
   every day, opened up). All WATCH the panel */
SC.lcturns = (t, s) => { window._BUBAT = { '*': [960, 905] }; const cE = camQ1(SCN.lc1q.t1), [px, py] = pawPt("pip", BL[0], BL[1], BL[2], false), p = camPt(cE, [px + 70, py - 20]), tm = s.t0 + 1.2, tM = LT("n704m") - .5, tB = MK("bell");
  return lookCloser(t, s, { tz: s.t0, fx: p[0], fy: p[1], art: lcTurnsArt, bgc: "#FFF6E6", set: (tt) => SC.lc1q(Math.min(tt, SCN.lc1q.t1 - .04), SCN.lc1q), verdict: ["MORE TURNS: A STRONGER ELECTROMAGNET", GOODC], tv: MK("v_turns"), peek: false,
    over: (tt) => peek23("pip", "l", tt, tm, undefined, []) + peek23("momo", "r", tt, tM, tB + .3, [[LE("n704m") + .1, "cheer"], [LE("n704m") + 2.2, "sit"]], { achieved: true })
      + peek23("basil", "r", tt, tB + .6, MK("v_turns") + 2, [[MK("bell") + 1.9, "surprised"], [MK("bell") + 3.6, "sit"]]) + smallPrint(tt, s.t0 + 1.4, MOMENT_RULE, 0, MK("bell") - .3) }); };
SC.mark1 = (t, s) => markScene(t, s, { id: "n707", sayId: "n706", who: "basil", n: "1 of 2", text: TL.lines.n707.text, keys: ["increase", "strength", "electromagnet", "number", "turns", "wire"], size: 56, y: 240, footer: FOOT, poses: [[LE("n707") + .2, "sit"]],
  under: markTurns(t, 1250, 930, .7 * spring(t, s.t0 + .4, .5)), extra: bd("pip", 1790, 1076, 300, t, { in: s.t0 + .3, flip: true }) });

/* 8 · Showdown: Momo's poster (on her easel by the board, LARGE): three lines, each with a small drawing; the lines light as she reads them;
   the YOU ring takes the stage (5 s) with the line numbers; only Momo at the side. Then Basil (big at the right) reveals: line 3; Pip confident,
   Momo shy (OUTCOMES). The cricket on the spine of a book on the shelf (not in the countdown) */
const EAS = [700, 1050, .95];
const camShow = (t) => { const s = SCN.show, a = eio((t - s.t0) / 1.2); return camMix(camRoom, camOn([EAS[0], EAS[1] - 330], 1.35, 760, 560), a); };
const showWorld = (t, cam, o = {}) => sr(t, cam, { bench: benchTop(t), easel: false, bug: o.bug, front: poster23(t, EAS[0], EAS[1], EAS[2], { lit: [MK("l1"), MK("l2"), MK("l3")], strike: MKS("strike"), rewrite: MKS("rewrite") }) });
SC.show = (t, s) => { window._BUBAT = { basil: [1450, 230], momo: [1150, 250], pip: [1250, 300] }; const r0 = MK("ring0_show"), bell = MK("bell_show"), rs = ringState(t, r0, 5), tS = LT("n803") - .08, inT = t >= r0 && t < bell, R = [1440, 430], RR = 200;
  const st = ss(r0 - .6, r0 - .1, t) * (1 - ss(bell + .6, bell + 1.1, t)), bob = inT ? 16 * Math.sin((t - r0) * Math.PI * 2) : 0, nf = inT ? (Math.floor(t - r0) % 3) + 1 : 3, tB = LT("n804b");
  return showWorld(t, camShow(t), { bug: t < r0 - 1 || t > bell + 1 ? CKAT.show : false }) + OP(st, bg("stage"))
    + (st > .01 ? OP(st, TF(680, 1100, .82, poster23(t, 0, 0, 1, { lit: [0, 0, 0] })) + TF(R[0], R[1], spring(t, r0 - .6, .45) * (1 + .035 * (inT ? rs.tick : 0)), `<g transform="translate(${-R[0]} ${-R[1]})">${ringTimer(R[0], R[1], t < r0 ? 1 : t < bell ? rs.frac : 0, t < r0 ? 5 : t < bell ? rs.secs : 0, t, { R: RR, sw: 32, tick: rs.tick, shut: pulse(t, bell, .01, .6), chg: inT || (t >= bell && t < bell + .5) ? (t >= bell ? bell : rs.chg) : -9, ns: 1.2,
      inner: `<circle cx="${R[0]}" cy="${R[1]}" r="${RR - 24}" fill="#FFF8EA"/><clipPath id="shC"><circle cx="${R[0]}" cy="${R[1]}" r="${RR - 30}"/></clipPath><g clip-path="url(#shC)"><g transform="translate(${R[0]} ${R[1]}) scale(.8) translate(-430 -440)">${ringShow23(t)}</g></g>` })}</g>`) + youPill(R[0] - 230, R[1] - 170, 1.1) + TF(R[0], 760, 1, tpill(0, 0, "line 1, 2 or 3?", 48, P.ink, "#fff", { w: 700 })) + TF(R[0] + 260, 640 + bob * .3, .7, `<g filter="url(#dropS)">${countHand(nf)}</g>`)) : "")
    + bd("momo", 230, 1076, 480, t, { in: s.t0 + .1, rock: inT ? 2 : 0, poses: [[s.t0, "sit"], [W("n801", "momos") + .2, "pointing"], [LT("n802m") - .3, "sit"], [r0 - .3, "thinking"], [bell + .35, "sit"]], jump: [[bell + .02, 26]] })
    + bd("pip", 1360, 1020, 380, t, { in: bell + .4, flip: true, poses: [[bell + .4, "sit"]] }) + (t > bell + .6 ? pickNum("pip", 1240, 700, t, tB - .1, "3") : "")
    + bd("basil", MR[0], MR[1], MR[2], t, { in: bell + .3, flip: true, poses: [[bell + .3, "sit"]] }) + (t > bell + .5 ? pickNum("basil", 1580, 640, t, tB - .1, "3") : "")
    + stamp(t, tS, 960, 460) + bellIcon(t, r0) + melt(t, s, "showcard", .3) + HUD(t); };
SC.showcard = (t, s) => roundCard(t, s, "SHOWDOWN", "DOUBLE POINTS", P.sun);
/* the fix: line 3 struck through (strike, kept) and the green rewrite (rewrite: Use an iron nail. Wood cannot become a magnet.); the coin +2
   (coin2); the book's takeaway 7.8 on a cream strip, with two small pictures joined to it: the stroked nail (stroke method) and Momo's coil
   (electrical method). Momo shy through the WHOLE fix; Basil and Pip confident */
SC.fix = (t, s) => { window._BUBAT = { basil: [1250, 250], '*': [1250, 250] }; const cam = camMix(camOn([EAS[0], EAS[1] - 330], 1.35, 760, 560), camOn([960, 600], 1.06, 960, 580), eio(clamp((t - MK("coin2") + .4) / 1.2))), tS = MK("strip");
  return showWorld(t, cam, {}) + bd("momo", 230, 1076, 480, t, { in: s.t0 + .1 }) + bd("pip", 1360, 1020, 380, t, { in: s.t0 + .15, flip: true }) + bd("basil", MR[0], MR[1], MR[2], t, { in: s.t0 + .1, flip: true })
    + coin(t, MK("coin2") - .1, 960, 330, "+2", "Showdown: double points")
    + (t >= tS ? bookCaption(t, "n806s", TL.lines.n806s.text, 330, { size: 32, keys: ["iron", "steel", "stroke", "electrical"] })
      + TF(300, 500, spring(t, tS + .3, .4), `<g filter="url(#dropS)"><rect x="-130" y="-80" width="260" height="150" rx="20" fill="#FFF8EA"/></g>` + TF(-30, -20, .5, nail22d(0, 0, 1, 0)) + clipBunch(t, 45, -20, 3, { k: .55 }) + T(0, 52, "stroke method", 26, P.ink)) + pline(300, 420, 420, 364, ramp(t, tS + .3, .3), P.ink)
      + TF(1640, 500, spring(t, tS + .6, .4), `<g filter="url(#dropS)"><rect x="-130" y="-80" width="260" height="150" rx="20" fill="#FFF8EA"/></g>` + TF(20, 40, .32, rig23(t, { n: 10, hold: [-230, -40], clips: [3, {}] })) + T(0, 52, "electrical method", 26, P.ink)) + pline(1640, 420, 1520, 364, ramp(t, tS + .6, .3), P.ink) : "")
    + HUD(t); };

/* 9 · no more wire? Basil (big at the left) works the mini crane: the twenty-turn hook lifts the steel bolt (swing); the arm swings towards
   the paper lorry; halfway the bolt slips off and drops back into the scrap tray (slip: a clink). He holds up the empty wire reel (no more
   wire). Pip big at the right by the cupboard of AA batteries, Momo in the mid-ground; both watch the crane. The cricket on the window frame */
const camQ2 = (t) => { const s = SCN.lc2q, u = eio((t - s.t0) / (s.t1 - s.t0)); return camMix(camRoom, camOn([700, 720], 1.35, 760, 600), u); };
const craneBolt = (t, sw, a, lift, o = {}) => { const [cx, cy] = craneTip(CR[0], CR[1], CR[2], { a, drop: lift }); return bolt23(cx + 8, cy + 18, 70, .26); };
SC.lc2q = (t, s) => { const tw = MK("swing"), tsl = MK("slip"), a = .5 * eio(clamp((t - tw - .3) / 1.4)), lift = 150 - 40 * eio(clamp((t - tw) / .4)), fall = t >= tsl ? eio(clamp((t - tsl) / .4)) : 0, [cx, cy] = craneTip(CR[0], CR[1], CR[2], { a, drop: lift });
  const bolt = t < tsl ? bolt23(cx + 8, cy + 18, 70, .26) : bolt23(lerp(cx + 8, SCRAP[0] - 8, fall), lerp(cy + 18, SCRAP[1] - 14, fall * fall), lerp(70, -8, fall), .26);
  const [px, py] = pawPt("basil", BL[0], BL[1], BL[2], false);
  return sr(t, camQ2(t), { bench: miniCrane23(t, CR[0], CR[1], CR[2], { a, drop: lift, rig: { n: 20, flow: t < tsl ? .6 : 0 }, on: t < tsl }) + scrapTray23(t, SCRAP[0], SCRAP[1], SCRAP[2], { bolt: false }) + paperLorry23(t, LORRY[0], LORRY[1], LORRY[2]) + bolt })
    + bd("momo", 1080, 1010, 380, t, { in: s.t0 + .15, flip: true, ...watchO(1080, cx) }) + bd("pip", MR[0], MR[1], MR[2], t, { in: s.t0 + .1, flip: true, ...watchO(MR[0], cx) })
    + bd("basil", BL[0], BL[1], BL[2], t, { in: s.t0 + .05, poses: [[s.t0, "sit"], [LE("n901b") + .05, "thinking"]], ...watchO(BL[0], cx) })
    + (t >= LE("n901b") - 1.5 ? TF(px + 40, py, spring(t, LE("n901b") - 1.5, .4) * .55, `<ellipse cx="0" cy="0" rx="46" ry="46" fill="#C9A06E" stroke="#8A6438" stroke-width="6"/><ellipse cx="0" cy="0" rx="16" ry="16" fill="#8A6438"/><rect x="-60" y="-8" width="120" height="16" rx="6" fill="#D8B27E" stroke="#8A6438" stroke-width="4"/>`) + linkChip(t, LE("n901b") - 1.3, px + 300, py - 160, px + 60, py - 20, "#fff", "no more wire", 36, undefined, P.ink) : "")
    + smallPrint(t, s.t0 + .3, MOMENT_RULE) + HUD(t); };
/* [LOOK CLOSER] one battery or two? (lc23.js lcBattArt). Faces: Basil at the lower left (his question is being answered; listening), Pip at
   the lower right (teaching NUMBER OF BATTERIES; cheer after his line: a key word learnt, achieved). Both WATCH the panel */
SC.lcbatt = (t, s) => { window._BUBAT = { '*': [960, 905] }; const cE = camQ2(SCN.lc2q.t1), p = camPt(cE, [CR[0], CR[1] - 150]), tm = s.t0 + 1.2, tp = LT("n904p") - .5;
  return lookCloser(t, s, { tz: s.t0, fx: p[0], fy: p[1], art: lcBattArt, bgc: "#FFF6E6", set: (tt) => SC.lc2q(Math.min(tt, SCN.lc2q.t1 - .04), SCN.lc2q), verdict: ["MORE BATTERIES: A STRONGER ELECTROMAGNET", GOODC], tv: MK("v_batt"), peek: false,
    over: (tt) => peek23("basil", "l", tt, tm, undefined, []) + peek23("pip", "r", tt, tp, undefined, [[LE("n904p") + .1, "cheer"], [LE("n904p") + 2.2, "sit"]], { achieved: true })
      + smallPrint(tt, s.t0 + 1.4, HOT_RULE, 0, MK("v_batt")) + smallPrint(tt, s.t0 + 2.0, MOMENT_RULE, 1, MK("v_batt")) }); };
/* the bench: HOW STRONG?'s third row fills (chart); the two-battery, twenty-turn hook on the crane comes down: the steel bolt and two steel
   caps jump up (the ring-pulls and plastic caps stay); the arm swings over the paper lorry (carry); OFF: the bolt and the caps drop into the
   lorry (drop: a clang). Basil and Momo cheer as it lands (achieved: the build works); Pip a big smile and a hop (he cheered a moment ago) */
SC.crane = (t, s) => { const tc = MK("carry"), td = MK("drop"), down = t < tc - .6 ? eio(clamp((t - s.t0) / .8)) : 1 - eio(clamp((t - tc + .6) / .6)), lift = lerp(110, 190, down), a = t < tc ? 0 : eio(clamp((t - tc) / (td - tc - .2))), on = t < td, [cx, cy] = craneTip(CR[0], CR[1], CR[2], { a, drop: lift });
  const pick = t >= s.t0 + .9, fall = t >= td ? eio(clamp((t - td) / .45)) : 0, inL = [LORRY[0] - 20, LORRY[1] - 50];
  const load = pick && !fall ? bolt23(cx + 8, cy + 18, 70, .26) + steelCap23(cx - 10, cy + 40, 0, .3) + steelCap23(cx + 18, cy + 46, 0, .3) : "";
  const landed = fall ? bolt23(lerp(cx + 8, inL[0], fall), lerp(cy + 18, inL[1], fall * fall), lerp(70, 0, fall), .26) + steelCap23(lerp(cx - 10, inL[0] - 20, fall), lerp(cy + 40, inL[1] + 6, fall * fall), 0, .3) + steelCap23(lerp(cx + 18, inL[0] + 22, fall), lerp(cy + 46, inL[1] + 4, fall * fall), 0, .3) : "";
  const cam = camMix(camOn([960, 640], 1.06, 960, 600), camOn([760, 720], 1.4, 800, 600), eio(clamp((t - s.t0) / 1.2)));
  return sr(t, cam, { bench: miniCrane23(t, CR[0], CR[1], CR[2], { a, drop: lift, batt: 2, rig: { n: 20, flow: on && pick ? .8 : 0 }, on }) + scrapTray23(t, SCRAP[0], SCRAP[1], SCRAP[2], { bolt: !pick, steel: !pick }) + paperLorry23(t, LORRY[0], LORRY[1], LORRY[2]) + load + landed })
    + bd("basil", BL[0], BL[1], BL[2], t, { in: s.t0 + .05, poses: [[s.t0, "sit"], [td + .1, "cheer"]], ...watchO(BL[0], cx) })
    + bd("momo", MR[0], MR[1], MR[2], t, { in: s.t0 + .1, flip: true, poses: [[s.t0, "sit"], [td + .15, "cheer"]], ...watchO(MR[0], cx) })
    + bd("pip", 1080, 1010, 380, t, { in: s.t0 + .15, flip: true, ...watchO(1080, cx), jump: [[td + .2, 30]] }) + smallPrint(t, s.t0 + .3, HOT_RULE) + HUD(t); };
SC.mark2 = (t, s) => markScene(t, s, { id: "n907", sayId: "n906", who: "pip", n: "2 of 2", text: TL.lines.n907.text, keys: ["also", "increase", "strength", "electromagnet", "number", "batteries"], size: 56, y: 240, footer: FOOT, poses: [[LE("n907") + .2, "sit"]],
  under: markBatt(t, 1250, 930, .66 * spring(t, s.t0 + .4, .5)) });

/* 10 · the chant: call and response with YOUR TURN!; the three lines flash their pictures on the board at the right */
SC.chant = (t, s) => chantScene(t, s, "c1003", { sayId: "u1002", size: 42, x: 700, y0: 250, dy: 110, xs: [230, 560, 890], bh: 360, tx: 1180, ty: 560, sayX: 640, sayY: 620, board: (tt, flash) => chantBoard23(tt, flash) });

/* 11 · score hand, the cricket (lizReveal: the score hand melts into the science room, ONE push-in onto the cricket on the ledge right under
   the school bell: the REVEAL spot, never the intro windowsill); Momo's fun fact: its ears are on its front legs (ff_ear); it hears the bell
   with its legs (ff_bell). Basil points at the cricket once it is ringed; Pip surprised on "legs"; Pip waves goodbye on "Tell someone at home!" */
SC.final = (t, s) => { const L = "n1101"; return finalScene(t, s, L, 1, [[s.t0, null, 1], [W(L, "two") - .1, null, 2], [W(L, "three") - .1, null, 3]]); };
SC.liz = (t, s) => { const L = "n1102", tq = W(L, "it") - .1, c = CKAT.liz, tc = W(L, "cricket"), tl = W("n1103m", "legs", 1);
  return lizReveal(t, s, L, sr(t, W0, { bench: benchTop(t), bug: c }), c[0], c[1] - 10, tq, "It was under the school bell!", -120, 160, 80, 2.8, { from: () => SC.final(SCN.final.t1 - .04, SCN.final), qx: 1000, qy: 724, tx: 960, ty: 985, tell: "n1104",
    fact: { id: "n1103m", at: [1250, 400], w: 760, h: 440, items: [["ff_ear", "its ear!", ffEar23], ["ff_bell", "it hears with its legs", ffBell23]], cols: ["#7A5228", "#2E6E9A"], sx: 1300, sy: 860, poses: [[MK("ff_in") - .4, "surprised"], [MK("ff_in") + .3, "sit"]] } })
    + bd("basil", 170, 1076, 330, t, { in: s.t0 + .6, poses: [[s.t0 + .6, "sit"], [tc + .4, "pointing"], [LT("n1103m") - .3, "sit"]] })
    + bd("pip", 390, 1076, 330, t, { in: s.t0 + .7, poses: [[s.t0 + .7, "sit"], [tl + .1, "surprised"], [tl + 1.5, "sit"], [LT("n1104") - .1, "waving"], [s.t1, "sit"]], wave: true }) + smallPrint(t, s.t0 + .5, LOOK_RULE); };

/* 12 · the dare for Episode 24: Basil, beside HOW STRONG?, with two NEW nails side by side: an iron nail with a long coil of twenty-five neat
   turns and a steel nail with a short coil of eight turns, each tag joined to its nail, one battery holder each (coil). The ONE set of two
   big cards (1 Yes · 2 No; ep23dare.js) slides in BEFORE any clips are seen; NEXT · Is it fair?; Lock in your answer! Pip and Momo thinking */
const slideX23 = (t, t0, d, x0, x1) => { const u = eo(clamp((t - t0) / d)); return [lerp(x0, x1, u), u < 1 ? motion22(lerp(x0, x1, u) + 220, 830, 0, .8, "#fff") : ""]; };
SC.dare = (t, s) => { const a = "n1201", tc = [W(a, "one", 1) - .1, W(a, "two") - .1], tL = W(a, "lock") - .1, tQ = W(a, "is") - .15, tIn = tc[0] - 1.0, e2 = eio(clamp((t - tIn) / 1.2)), cs0 = MK("coil");
  const [px, py] = pawPt("basil", 560, 1076, 480, false), pair = TF(820, 720, 1.25, darePic23(0, t).replace(/<rect x="-210" y="-150" width="420" height="300" fill="#E8F6EA"\/>/, "").replace(/<g transform="translate\(150 105\)[\s\S]*$/, ""));
  return sr(t, camMix(camRoom, camOn([900, 640], 1.1, 960, 520), e2), { bench: benchTop(t, {}) }) + `<rect width="1920" height="1080" fill="${P.night}" opacity="${n2(.35 * e2)}"/>`
    + bd("momo", 1480, 1010, 380, t, { in: s.t0 + .2, flip: true, poses: [[s.t0, "sit"], [tQ + .3, "thinking"]] }) + bd("pip", MR[0], MR[1], MR[2], t, { in: s.t0 + .3, flip: true, poses: [[s.t0, "sit"], [tQ + .45, "thinking"]] })
    + bd("basil", 380, 1076, 480, t, { in: s.t0 + .1, noreact: true }) + OP(1 - e2 * .7, pair)
    + NEXT_CARDS.map((c, i) => { const t0 = tIn + .3 + i * .25, pl = Math.max(pulse(t, tc[i], .04, .6), t >= tL ? (Math.floor((t - tL) / .5) % 2 === i ? .8 : 0) : 0); if (t < t0) return ""; const [x, d] = slideX23(t, t0, .6, 2400, 760 + i * 440);
      return d + TF(x, 830, 1, choiceCard3(i + 1, c, darePic23(i, t), { w: 420, h: 330, size: 40, pulse: pl, id: "dr" })); }).join("")
    + (t >= tQ ? TF(1000, 150, spring(t, tQ, .45), tpill(0, 0, "NEXT · Is it fair?", 52, P.ink, P.sun, { w: 700 })) : "")
    + (t >= tL ? TF(1000, 1030, spring(t, tL, .45), tpill(0, 0, "Lock in your answer!", 44, P.sun, P.ink, { w: 700 })) : "")
    + smallPrint(t, cs0 + .2, "With an adult. Batteries only. Join it only for a moment.") + melt(t, s, "liz", .4) + HUD(t); };
/* 14 · "Now you know!": HOW STRONG? (all three rows) and the mini crane with the steel bolt in the paper lorry; READY FOR RECYCLING WEEK! */
SC.nyk = (t, s) => nykScene(t, s, TF(960, 1010, 1.0, howStrong23(t, 0, 0, 1, { all: true, ready: s.t0 + .6 })) + TF(560, 1000, .5, miniCrane23(t, 0, 0, 1, { a: 1, rig: { n: 20 }, batt: 2 }) + paperLorry23(t, 250, -10, .7, { load: bolt23(-50, -120, 0, .7) })), { bx: [220, 1720, 1430], hx: 470 });
})(); }
