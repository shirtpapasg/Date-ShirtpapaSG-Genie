// p2.js: PART 2, "Plan It, Test It, Count It AGAIN! Why Scientists Repeat": the recap, the science room on Wednesday, Round 1 (Momo's plan
// X and Y: fair?), the answer and PREDICTION (Basil), our plan (look closer: the book's table, row by row; VARIABLE TO BE MEASURED, Momo; Mark
// Sentence: the book's prediction, Pip), the Showdown (Pip's plan card: "count once"), be a steel paper clip counted again and again, count it
// again (look closer: nine, eight, nine; RELIABLE, Pip; the crane gets the two-battery hook; Mark Sentence 7.11, Basil), the chant, the
// sparrow, the dare into EP25 (the fridge door). Segments 1-14 of ../p3_ep24_script.md section 5. One real place: the science room (SR24).
if (PART === 2) { (() => {
SCORE.push([MK("coin1") - .1, 1, 0]);
SCORE.push([MK("coin2") - .1, 3, 0]);
const FOOT = "P3 · Making and Using Magnets · A fair test";
const bd = (who, x, y, h, t, o = {}) => buddy(who, x, y, h, t, o);
const W0 = [1, 960, 540];
window.SHELF_AWAY = (t) => { const w = SCN.waitw; return ss(w.t0 + .3, w.t0 + .8, t) * (1 - ss(SCN.pullout.t1, SCN.pullout.t1 + .4, t)); };
// OUR PLAN's fills: the rows in look-closer 1, the counts in journey 2 / look-closer 2, READY! at the crane
const BOARD = () => ({ rows: [MK("row1"), MK("row2"), MK("row3")], c2: MK("counts2"), c1: MK("counts1"), ready: MK("drop") + .3 });
const sr = (t, cam, o = {}) => SR24(t, { boardO: BOARD(), ...o }, cam);
// the bench: Momo's two set-ups X (one battery, ten turns) and Y (two batteries, twenty turns), each hanging over its tray; after the answer
// Y's coil unwinds to ten turns (unwind); the mini crane at the right end (its hook gets the two-battery nail at `crane`)
const TRX = [600, 840], TRY = 902, BENCHY = 872, NK = .5, CR = [1430, 852, .45];
const xy = (t, o = {}) => { const tipY = 858 - (o.lift || 0), u = o.u === undefined ? 0 : o.u, nY = Math.round(lerp(20, 10, u)), cl = o.clips || [0, 0];
  let s = `<path d="M${TRX[0] - 90} ${BENCHY} V${tipY - 168} M${TRX[1] + 90} ${BENCHY} V${tipY - 168}" stroke="#8A6438" stroke-width="12" stroke-linecap="round"/><path d="M${TRX[0] - 110} ${tipY - 166} H${TRX[1] + 110}" stroke="#A87C4A" stroke-width="14" stroke-linecap="round"/>`;
  s += TRX.map((x) => trayClips22(t, x, TRY, .4, { n: 18 })).join("");
  [[10, 1, "X"], [nY, 2, "Y"]].forEach(([n, b, lab], i) => { const x = TRX[i];
    s += `<path d="M${x} ${tipY - 166} V${tipY - 143}" stroke="#5A4A3A" stroke-width="4"/>` + setup24(t, { x, y: tipY, k: NK, kind: "iron", n, batt: b, clips: cl[i], hx: i ? 270 : -250, hy: (BENCHY + 6 - tipY) / NK, hk: i ? .45 : .6 })
      + TF(x + (i ? 60 : -60), tipY - 196, .62, tpill(0, 0, `${lab}: ${b} batter${b > 1 ? "ies" : "y"} · ${n} turns`, 30, "#fff", P.ink, { w: 700 })); });
  return s; };
const UNW = (t) => eio(clamp((t - (MK("ansglow") + 1.6)) / 1.6));
const benchTop = (t, o = {}) => miniCrane23(t, CR[0], CR[1], CR[2], o.craneO || {}) + (o.xy === false ? "" : xy(t, { u: UNW(t), ...(o.xyO || {}) }));
const BL = [330, 1076, 480], MR = [1700, 1076, 480], PM = [1450, 1010, 400];
const camRoom = camOn([960, 620], 1.06, 960, 600);
const pill2 = (t, t0, t1) => OP(ramp(t, t0, .4) * (1 - ramp(t, t1, .4)), lowerPill(60, 96, "A school science room, Singapore ·", "Wednesday after school"));

/* 1 · "Last time...": three pictures from Part 1, one at a time, centred and large, a gentle push-in, one label each */
SC.lasttime = (t, s) => { const tb = [s.t0, MK("pic2") - .2, MK("pic3") - .2], i = t >= tb[2] ? 2 : t >= tb[1] ? 1 : 0, labs = ["Two things changed: not fair", "Change only one thing: fair", "The same height: fair"], u = t - tb[i], z = 1 + .05 * eio(u / 4), k = ramp(t, tb[i], .5);
  return bg("stage2") + OP(ramp(t, s.t0, .3), T(960, 110, "Last time…", 60, "#fff", { w: 600 }))
    + OP(k, TF(960, 520, z, `<g filter="url(#drop)"><rect x="-534" y="-314" width="1068" height="628" rx="40" fill="#FFF8EA"/></g><clipPath id="rcP"><rect x="-520" y="-300" width="1040" height="600" rx="30"/></clipPath><g clip-path="url(#rcP)">${recapP2_24(i, t)}</g>`))
    + OP(k, TF(960, 930, spring(t, tb[i] + .1, .4), tpill(0, 0, labs[i], 46, P.sun, P.ink, { w: 700 }))) + HUD(t); };
/* 2 · the science room on Wednesday after school: the camera glides in to Momo's two set-ups X and Y; she points at them (xy); then on to the
   windowsill, where the game's push-in starts. The place card from the start */
const camXY = camOn([720, 780], 1.4, 860, 560), camSill = camOn([SPAT.intro[0], SPAT.intro[1] - 20], 1.7, 760, 480);
const camLab = (t) => { const s = SCN.lab, a = eio((t - s.t0) / 1.6), c = eio((t - (s.t1 - 1.2)) / 1.2); return c > 0 ? camMix(camXY, camSill, c) : camMix(camRoom, camXY, a); };
SC.lab = (t, s) => sr(t, camLab(t), { bench: benchTop(t) }) + bd("basil", BL[0], BL[1], BL[2], t, { in: s.t0 + .9, out: s.t1 - .6, ...watchO(BL[0], 720) }) + bd("pip", PM[0], PM[1], PM[2], t, { in: s.t0 + 1.0, out: s.t1 - .5, flip: true, ...watchO(PM[0], 720) })
  + bd("momo", MR[0], MR[1], MR[2], t, { in: s.t0 + .3, out: s.t1 - .4, flip: true, poses: [[s.t0, "sit"], [MK("xy") - .1, "pointing"], [MK("xy") + 1.8, "sit"]] }) + pill2(t, s.t0, s.t1 + 1.4) + smallPrint(t, s.t0 + .4, ADULT_RULE) + HUD(t);
SC.game = (t, s) => { const cE = camLab(SCN.lab.t1), p = SPAT.intro;
  return gameScene(t, s, ["n202", HAS("n203p") ? "n203p" : "n202", "n204"], false, { world: (tt) => sr(tt, cE, { bench: benchTop(tt) }), A: camPt(cE, [p[0], p[1] - 10]), T: [680, 440], Z: 2.6, dim0: 0, finder: "pip",
    poses: { momo: [[W("n202", "sparrow") + .1, "surprised"], [W("n202", "sparrow") + 1.8, "sit"]], basil: [[LT("n204") - .1, "waving"], [LT("n204") + 1.0, "sit"]] } }) + pill2(t, SCN.lab.t0, s.t0 + .9) + smallPrint(t, LT("n204"), LOOK_RULE); };
SC.goals = (t, s) => goals3(t, s, [["Plan a fair test", ""], ["Measure one thing", ""], ["Why we repeat", ""]], ["n301p", "n302p", "n303p", "n304p"], "pip");
SC.r1card = (t, s) => roundCard(t, s, "ROUND 1");

/* 4 · Round 1: Momo's plan, X and Y: fair? THREE big numbered picture cards; the ring's picture: X and Y side by side; the clue labels ON TOP.
   Momo leads (worried in the ring). Picks Momo 1, Pip 3, Basil 2 (laughing after his line: a funny line about himself) */
const R1 = ["Yes, it is fair", "No, two things changed", "No, use a steel nail"], L1 = "n401";
SC.r1 = (t, s) => lockN(t, { t0: LT(L1) - .1, cards: R1, clues: [["X: 1 battery · 10 turns", W(L1, "x")], ["Y: 2 batteries · 20 turns", W(L1, "y")], ["the same iron nails", W(L1, "fair") - .2]], csize: 30, lead: "momo", q: "Is Momo's test fair?", tq: W(L1, "is") - .1,
  tc: [W(L1, "one"), W(L1, "two", 1), W(L1, "three")], ring0: MK("ring0_r1"), dur: 5, lock: "n402", pics: [0, 1, 2].map((i) => cardP2_24(i, t)), obj: ringP2_24,
  react: [[LE("n404p") + .1, "pip", "pointing"], [LE("n405b") + .1, "basil", "laughing"]],
  picks: [{ who: "momo", id: "n403m", word: "1" }, { who: "pip", id: "n404p", word: "3" }, { who: "basil", id: "n405b", word: "2" }] });

/* 5 · the answer is two; only Basil was right (no Buddy point); Y's long coil unwinds to ten turns (Only the batteries are different);
   Basil teaches PREDICTION (a thought cloud: two batteries, stronger?) and cheers after his line */
const camAns = (t) => { const a = eio((t - MK("ansglow") + .2) / 1.0); return camMix(camRoom, camOn([720, 780], 1.3, 860, 600), a); };
SC.r1ans = (t, s) => { const tA = MK("ansglow"), tK = MK("kw_prediction"), cam = camAns(t), u = UNW(t);
  return sr(t, cam, { bench: benchTop(t) })
    + `<g filter="url(#drop)"><rect x="30" y="110" width="640" height="200" rx="24" fill="#FFF8EA" opacity=".92"/></g>` + [0, 1, 2].map((i) => TF(140 + i * 205, 205, .42, choiceCard3(i + 1, R1[i], cardP2_24(i, t), { w: 400, h: 330, size: 30, id: "ra" + i, lit: i === 1 && t >= tA ? spring(t, tA, .45) : 0 }))).join("")
    + tagAt(t, tA + .3, 140, 292, 1, "not this one", 20) + tagAt(t, tA + .4, 550, 292, 1, "not this one", 20) + coin(t, MK("coin1") - .1, 860, 400, "+1", "if you showed two fingers")
    + (u > .05 && t < LT("n503b") - .2 ? OP(1 - ramp(t, LT("n503b") - .5, .3), TF(760, 400, spring(t, tA + 1.6, .4), tpill(0, 0, "Only the batteries are different", 44, SAMEC, "#fff", { w: 700 }))) : "")
    + (t >= tK - .2 ? thought(t, tK - .2, LE("n503b") + 1.2, 1180, 260, "2 batteries: stronger?", { size: 44, col: P.basil, dir: -1 }) : "")
    + bd("basil", BL[0], BL[1], BL[2], t, { in: s.t0 + .1, poses: [[s.t0, "sit"], [LE("n503b") + .05, "cheer"]], achieved: true }) + (t > s.t0 + .3 ? pickNum("basil", 520, 640, t, s.t0 + .3, "2") : "") + tickChip16(t, tA + .2, 575, 585, .7)
    + bd("pip", 1060, 1010, 400, t, { in: s.t0 + .15, flip: true }) + (t > s.t0 + .35 ? pickNum("pip", 1130, 700, t, s.t0 + .35, "3") : "") + xChip16(t, tA + .25, 1180, 650, .7)
    + bd("momo", MR[0], MR[1], MR[2], t, { in: s.t0 + .2, flip: true }) + (t > s.t0 + .4 ? pickNum("momo", 1880, 640, t, s.t0 + .4, "1") : "") + xChip16(t, tA + .3, 1840, 585, .7)
    + melt(t, s, "r1", .3) + HUD(t); };

/* 6 · Pip (big at the left): "There are so many things on the bench. How do we keep track of them all?" (thinking after: his own question).
   The bench: the battery tray, the clip trays, the nail bag, the wire's reel */
const camQ1 = (t) => { const s = SCN.lc1q, u = eio((t - s.t0) / (s.t1 - s.t0)); return camMix(camRoom, camOn([800, 800], 1.3, 900, 620), u); };
const things = (t) => paperBag22(1000, 868, .3) + TF(1080, 872, .3, battHolder23(t, 1)) + TF(1160, 872, .26, battHolder23(t, 2));
SC.lc1q = (t, s) => sr(t, camQ1(t), { bench: benchTop(t) + things(t) }) + bd("basil", 1060, 1010, 400, t, { in: s.t0 + .15, flip: true, ...watchO(1060, 800) }) + bd("momo", MR[0], MR[1], MR[2], t, { in: s.t0 + .1, flip: true, ...watchO(MR[0], 800) })
  + bd("pip", BL[0], BL[1], BL[2], t, { in: s.t0 + .05, poses: [[s.t0, "sit"], [LE("n601p") + .05, "thinking"]] }) + HUD(t);
const peek24 = (who, side, t, tin, tout, poses, o = {}) => { if (t < tin - .05 || (tout !== undefined && t > tout + .3)) return ""; const W_ = LCW, x = side === "l" ? W_.x - W_.w / 2 + 200 : W_.x + W_.w / 2 - 200;
  return bd(who, x, W_.y + W_.h / 2 + 470 * .42 + (1 - eo((t - tin) / .45)) * 350, 470, t, { in: tin, out: tout, poses: [[tin, "sit"], ...(poses || [])], peek: true, tag: false, shadow: false, flip: side === "r", nohop: true, achieved: o.achieved, watch: W_.x }); };
/* [LOOK CLOSER] our plan (lc24.js lcTableArt): the book's table fills row by row. Faces: Pip lower left (listening), Momo lower right
   (teaching VARIABLE TO BE MEASURED; cheer after her line) */
SC.lctable = (t, s) => { window._BUBAT = { '*': [960, 905] }; const cE = camQ1(SCN.lc1q.t1), p = camPt(cE, [1150, 640]), tm = s.t0 + 1.2;
  return lookCloser(t, s, { tz: s.t0, fx: p[0], fy: p[1], art: lcTableArt, bgc: "#FFFDF6", set: (tt) => sr(tt, cE, { bench: benchTop(tt) + things(tt) }), verdict: ["CHANGE ONE · KEEP THE REST THE SAME · MEASURE ONE", GOODC], tv: MK("v_plan"), peek: false,
    over: (tt) => peek24("pip", "l", tt, tm, undefined, []) + peek24("momo", "r", tt, LT("n605m") - .5, undefined, [[LE("n605m") + .1, "cheer"], [LE("n605m") + 2.2, "sit"]], { achieved: true }) }); };
SC.mark1 = (t, s) => markScene(t, s, { id: "n607", sayId: "n606", who: "pip", n: "1 of 2", tab: "Our prediction", text: TL.lines.n607.text, keys: ["increase", "number", "batteries,", "strength"], size: 56, y: 240, footer: FOOT, poses: [[LE("n607") + .2, "sit"]],
  under: markPred24(t, 1250, 930, .66 * spring(t, s.t0 + .4, .5)), extra: bd("basil", 1790, 1076, 300, t, { in: s.t0 + .3, flip: true }) });

/* 7 · Showdown: Pip's plan card (on Momo's easel by the bench, LARGE); the lines light as he reads them; the ring takes the stage (6 s, as
   EP1-10's Showdowns); only Pip at the side. Then Basil (big at the right) reveals line 3; Momo confident, Pip shy (OUTCOMES) */
const EAS = [700, 1050, .95];
const camShow = (t) => { const s = SCN.show, a = eio((t - s.t0) / 1.2); return camMix(camRoom, camOn([EAS[0], EAS[1] - 330], 1.35, 760, 560), a); };
const showWorld = (t, cam, o = {}) => sr(t, cam, { bench: benchTop(t), easel: false, bug: o.bug, front: planCard24(t, EAS[0], EAS[1], EAS[2], { lit: [MK("l1"), MK("l2"), MK("l3")], strike: MKS("strike"), rewrite: MKS("rewrite") }) });
SC.show = (t, s) => { window._BUBAT = { basil: [1150, 175], momo: [1150, 175], pip: [1250, 300] }; const r0 = MK("ring0_show"), bell = MK("bell_show"), rs = ringState(t, r0, 6), tS = LT("n703") - .08, inT = t >= r0 && t < bell, R = [1440, 430], RR = 200;
  const st = ss(r0 - .6, r0 - .1, t) * (1 - ss(bell + .6, bell + 1.1, t)), bob = inT ? 16 * Math.sin((t - r0) * Math.PI * 2) : 0, nf = inT ? (Math.floor(t - r0) % 3) + 1 : 3, tB = LT("n704b");
  return showWorld(t, camShow(t), { bug: t < r0 - 1 || t > bell + 1 ? SPAT.show : false }) + OP(st, bg("stage"))
    + (st > .01 ? OP(st, TF(680, 1100, .82, planCard24(t, 0, 0, 1, { lit: [0, 0, 0] })) + TF(R[0], R[1], spring(t, r0 - .6, .45) * (1 + .035 * (inT ? rs.tick : 0)), `<g transform="translate(${-R[0]} ${-R[1]})">${ringTimer(R[0], R[1], t < r0 ? 1 : t < bell ? rs.frac : 0, t < r0 ? 6 : t < bell ? rs.secs : 0, t, { R: RR, sw: 32, tick: rs.tick, shut: pulse(t, bell, .01, .6), chg: inT || (t >= bell && t < bell + .5) ? (t >= bell ? bell : rs.chg) : -9, ns: 1.2,
      inner: `<circle cx="${R[0]}" cy="${R[1]}" r="${RR - 24}" fill="#FFF8EA"/><clipPath id="shC"><circle cx="${R[0]}" cy="${R[1]}" r="${RR - 30}"/></clipPath><g clip-path="url(#shC)"><g transform="translate(${R[0]} ${R[1]}) scale(.8) translate(-430 -440)">${ringShow24(t)}</g></g>` })}</g>`) + youPill(R[0] - 230, R[1] - 170, 1.1) + TF(R[0], 760, 1, tpill(0, 0, "line 1, 2 or 3?", 48, P.ink, "#fff", { w: 700 })) + TF(R[0] + 260, 640 + bob * .3, .7, `<g filter="url(#dropS)">${countHand(nf)}</g>`)) : "")
    + bd("pip", 230, 1076, 480, t, { in: s.t0 + .1, rock: inT ? 2 : 0, poses: [[s.t0, "sit"], [LT("n702p") - .3, "pointing"], [LE("n702p") + .1, "sit"], [r0 - .3, "thinking"], [bell + .35, "sit"]], jump: [[bell + .02, 26]] })
    + bd("momo", 1360, 1020, 380, t, { in: bell + 1.1, flip: true, poses: [[bell + 1.1, "sit"]] }) + (t > bell + 1.3 ? pickNum("momo", 1240, 700, t, tB - .1, "3") : "")
    + bd("basil", MR[0], MR[1], MR[2], t, { in: bell + 1.0, flip: true, poses: [[bell + 1.0, "sit"]] }) + (t > bell + 1.2 ? pickNum("basil", 1580, 640, t, tB - .1, "3") : "")
    + stamp(t, tS, 960, 460) + bellIcon(t, r0) + melt(t, s, "showcard", .3) + HUD(t); };
SC.showcard = (t, s) => roundCard(t, s, "SHOWDOWN", "DOUBLE POINTS", P.sun);
/* the fix: line 3 struck through (kept) and the green rewrite (Count the clips a few times.); the coin +2. Pip shy through the WHOLE fix */
SC.fix = (t, s) => { window._BUBAT = { basil: [1250, 250], '*': [1250, 250] }; const cam = camMix(camOn([EAS[0], EAS[1] - 330], 1.35, 760, 560), camOn([960, 600], 1.06, 960, 580), eio(clamp((t - MK("coin2") + .4) / 1.2)));
  return showWorld(t, cam, {}) + bd("pip", 230, 1076, 480, t, { in: s.t0 + .1 }) + bd("momo", 1360, 1020, 380, t, { in: s.t0 + .15, flip: true }) + bd("basil", MR[0], MR[1], MR[2], t, { in: s.t0 + .1, flip: true })
    + coin(t, MK("coin2") - .1, 1700, 470, "+2", "Showdown: double points") + HUD(t); };

/* 8 · Be a steel paper clip! A glide down to Y's tray (no cut); the buddies wave the viewer off, then shrink */
const camWait = (t) => { const s = SCN.waitw, u = eio((t - s.t0) / (s.t1 - s.t0)); return camMix(camRoom, camOn([TRX[1], TRY - 30], 5.4, 960, 600), u * u); };
SC.waitw = (t, s) => { const L = "n801", tP = W(L, "be") - .15, sh = W(L, "shrink") - .1;
  const buds = ["basil", "pip", "momo"].map((w, i) => { const X = [BL, PM, MR][i]; return bd(w, X[0], X[1], X[2], t, { in: s.t0 + .1 + .05 * i, out: sh + .2 * i + .3, flip: X[0] > 960, poses: [[s.t0, "sit"], [tP + .2 + .15 * i, "waving"]], wave: true }); }).join("");
  return sr(t, camWait(t), { bench: benchTop(t, { xyO: { lift: 60 } }) }) + OP(1 - ss(s.t1 - 1.0, s.t1 - .5, t), buds + (t >= tP ? TF(960, 250, spring(t, tP, .45), tpill(0, 0, "Be a steel paper clip!", 76, P.sun, P.ink, { w: 700 })) : "") + HUD(t)) + wipe(t, s.t1, "#F4EFE6", 960, 600); };
const riders24 = (t, s, o) => { let out = ""; for (const who of ["momo", "pip", "basil"]) { const [x, y] = o.at[who]; out += buddy(who, x, y, o.h || 200, t, { in: o.tin + ({ pip: 0, basil: .15, momo: .3 })[who], poses: (o.poses || {})[who] || [], tag: false, rim: "rimB", jump: (o.jolts || []).map((tj) => [tj, 34]), ...watchO(x, o.look || 960) }); } return out; };
SC.shrink = (t, s) => { const m = MK, rp = { momo: glanceWave(m("jback") + .1), pip: [[m("c2") + .1, "surprised"], [m("c2") + 1.8, "sit"]] };
  return clipJourney2(t, s) + riders24(t, s, { tin: m("jtray") + .6, h: 190, at: { pip: [210, 1044], basil: [1720, 1050], momo: [420, 1040] }, poses: rp, look: 960, jolts: [m("jup") + .1] })
    + youTag(t, MK("jtray"), "You: a steel paper clip, counted") + feelTag(t, MK("jtray") + .8, MK("jdown") - .2, "to scale: a paper clip", 160) + feelTag(t, MK("jcount") + .2, MK("jback") - .2, "counted!", 160); };
SC.pullout = (t, s) => { const u = 1 - eo((t - s.t0) / .6);
  return sr(t, camMix(camRoom, camOn([TRX[1], TRY - 30], 5, 960, 600), u), { bench: benchTop(t) })
    + bd("momo", BL[0], BL[1], BL[2], t, { in: s.t0 + .2 }) + bd("basil", 1060, 1010, 400, t, { in: s.t0 + .25, flip: true }) + bd("pip", MR[0], MR[1], MR[2], t, { in: s.t0 + .3, flip: true }) + wipe(t, s.t0, "#FFFFFF") + HUD(t); };

/* 9 · Momo (big at the left): "But Pip counted only once, and got seven. Which count is right?" (a question); the board's counts */
const camQ2 = (t) => { const s = SCN.lc2q, u = eio((t - s.t0) / (s.t1 - s.t0)); return camMix(camRoom, camOn([1150, 640], 1.4, 1160, 540), u); };
SC.lc2q = (t, s) => sr(t, camQ2(t), { bench: benchTop(t) }) + bd("basil", 1060, 1010, 400, t, { in: s.t0 + .15, flip: true, ...watchO(1060, 1150) }) + bd("pip", MR[0], MR[1], MR[2], t, { in: s.t0 + .1, flip: true, ...watchO(MR[0], 1150) })
  + bd("momo", BL[0], BL[1], BL[2], t, { in: s.t0 + .05, poses: [[s.t0, "sit"], [LE("n901m") + .05, "thinking"]] }) + HUD(t);
/* [LOOK CLOSER] count it again (lc24.js lcCountArt). Faces: Momo lower left (listening), Pip lower right (teaching RELIABLE; cheer after) */
SC.lccount = (t, s) => { window._BUBAT = { '*': [960, 905] }; const cE = camQ2(SCN.lc2q.t1), p = camPt(cE, [1150, 640]), tm = s.t0 + 1.2;
  return lookCloser(t, s, { tz: s.t0, fx: p[0], fy: p[1], art: lcCountArt, bgc: "#FFF6E6", set: (tt) => sr(tt, cE, { bench: benchTop(tt) }), verdict: ["COUNT A FEW TIMES: RELIABLE", GOODC], tv: MK("v_rel"), peek: false,
    over: (tt) => peek24("momo", "l", tt, tm, undefined, []) + peek24("pip", "r", tt, LT("n904p") - .5, undefined, [[LE("n904p") + .1, "cheer"], [LE("n904p") + 2.2, "sit"]], { achieved: true }) }); };
/* the crane gets the two-battery hook (Y): it lifts the steel bolt and drops it into the paper lorry; READY! on the board (drop). Basil and
   Momo cheer as it lands (achieved); Pip a hop (he cheered a moment ago) */
SC.crane = (t, s) => { const tc = MK("carry"), td = MK("drop"), down = t < tc - .6 ? eio(clamp((t - s.t0) / .8)) : 1 - eio(clamp((t - tc + .6) / .6)), lift = lerp(110, 190, down), a = t < tc ? 0 : eio(clamp((t - tc) / (td - tc - .2))), on = t < td, [cx, cy] = craneTip(CR[0], CR[1], CR[2], { a, drop: lift });
  const pick = t >= s.t0 + .9, fall = t >= td ? eio(clamp((t - td) / .45)) : 0, LORRY = [CR[0] + 150, CR[1] + 8, .3], inL = [LORRY[0] - 20, LORRY[1] - 50];
  const load = pick && !fall ? bolt23(cx + 8, cy + 18, 70, .24) : "", landed = fall ? bolt23(lerp(cx + 8, inL[0], fall), lerp(cy + 18, inL[1], fall * fall), lerp(70, 0, fall), .24) : "";
  const cam = camMix(camRoom, camOn([CR[0], 720], 1.4, 1100, 600), eio(clamp((t - s.t0) / 1.2)));
  return sr(t, cam, { bench: miniCrane23(t, CR[0], CR[1], CR[2], { a, drop: lift, batt: 2, rig: { n: 10, flow: on && pick ? .8 : 0 }, on }) + paperLorry23(t, LORRY[0], LORRY[1], LORRY[2]) + (pick ? "" : bolt23(CR[0] - 10, CR[1] + 4, -8, .24)) + load + landed + xy(t, { u: 1 }) })
    + bd("basil", BL[0], BL[1], BL[2], t, { in: s.t0 + .05, poses: [[s.t0, "sit"], [td + .1, "cheer"]], ...watchO(BL[0], cx) })
    + bd("momo", 1060, 1010, 400, t, { in: s.t0 + .1, flip: true, poses: [[s.t0, "sit"], [td + .15, "cheer"]], ...watchO(1060, cx) })
    + bd("pip", MR[0], MR[1], MR[2], t, { in: s.t0 + .15, flip: true, ...watchO(MR[0], cx), jump: [[td + .2, 30]] }) + smallPrint(t, s.t0 + .3, MOMENT_RULE) + HUD(t); };
SC.mark2 = (t, s) => markScene(t, s, { id: "n907", sayId: "n906", who: "basil", n: "2 of 2", tab: "Repeat it", text: TL.lines.n907.text, keys: ["repeat", "few", "times", "reliable."], size: 54, y: 240, footer: FOOT, poses: [[LE("n907") + .2, "sit"]],
  under: markRep24(t, 1250, 930, .66 * spring(t, s.t0 + .4, .5)) });

/* 10 · the chant: call and response with YOUR TURN!; the three lines flash their pictures on the board at the right */
SC.chant = (t, s) => chantScene(t, s, "c1003", { sayId: "u1002", size: 38, x: 620, y0: 250, dy: 110, xs: [230, 560, 890], bh: 360, tx: 1240, ty: 600, sayX: 640, sayY: 620, board: (tt, flash) => chantBoard24(tt, flash) });

/* 11 · score hand, the sparrow (ONE push-in onto the sparrow on top of the door frame: the REVEAL spot); Pip's fun fact */
SC.final = (t, s) => { const L = "n1101"; return finalScene(t, s, L, 0, [[s.t0, null, 1], [W(L, "two") - .1, null, 2], [W(L, "three") - .1, null, 3]]); };
SC.liz = (t, s) => { const L = "n1102", tq = W(L, "it") - .1, c = SPAT.liz, tc = W(L, "sparrow");
  return lizReveal(t, s, L, sr(t, W0, { bench: railing24 + benchTop(t, { xyO: {} }), bug: c }), c[0], c[1] - 10, tq, "It was on the railing, just outside the door!", -120, 160, 80, 2.8, { from: () => SC.final(SCN.final.t1 - .04, SCN.final), qx: 1000, qy: 724, tx: 960, ty: 985, tell: "n1104",
    fact: { id: "n1103p", at: [1250, 400], w: 760, h: 440, items: [["ff_heart", "hundreds of beats a minute", ffHeart24], ["ff_count", "counted again and again", ffCount24]], cols: ["#E0453A", "#2FA35A"], sx: 1300, sy: 860, poses: [[MK("ff_in") - .4, "surprised"], [MK("ff_in") + .3, "sit"]] } })
    + bd("basil", 170, 1076, 330, t, { in: s.t0 + .6, poses: [[s.t0 + .6, "sit"], [tc + .4, "pointing"], [LT("n1103p") - .3, "sit"]] })
    + bd("momo", 390, 1076, 330, t, { in: s.t0 + .7, poses: [[s.t0 + .7, "sit"], [MK("ff_heart") + .2, "surprised"], [MK("ff_heart") + 1.6, "sit"], [LT("n1104") - .1, "waving"], [s.t1, "sit"]], wave: true }) + smallPrint(t, s.t0 + .5, LOOK_RULE); };

/* 12 · the dare for Episode 25: Pip's HDB kitchen (EP15's kitchen, kitchen15.png), the fridge at the end of the counter: Pip gives the door a
   gentle push (push) and it swings shut by itself (shut) and stays. The THREE big cards (ep24dare.js) slide in BEFORE any answer is shown */
const slideX = (t, t0, d, x0, x1) => { const u = eo(clamp((t - t0) / d)); return [lerp(x0, x1, u), u < 1 ? motion22(lerp(x0, x1, u) + 220, 830, 0, .8, "#fff") : ""]; };
SC.dare = (t, s) => { const a = "n1201", tc = [W(a, "one") - .1, W(a, "two") - .1, W(a, "three") - .1], tL = W(a, "lock") - .1, tQ = W(a, "what") - .15, tIn = tc[0] - 1.0, e2 = eio(clamp((t - tIn) / 1.2));
  const tp = MK("push"), tsh = MK("shut"), op = t < tp ? .55 : t < tsh ? .55 + .05 * Math.sin(Math.PI * clamp((t - tp) / .4)) : .55 * (1 - eio(clamp((t - tsh) / 1.0)));
  const room = `<rect x="-200" y="-120" width="2320" height="1320" fill="#FFF3DC"/>` + bg("kitchen15") + `<rect x="1380" y="0" width="640" height="1200" fill="#FCEFD6"/><rect x="1380" y="1080" width="640" height="200" fill="#DCCBB0"/>` + TF(1660, 1100, 1.15, fridge24(t, { open: op }));
  return CAM(room, ...camMix(camOn([1400, 700], 1.0, 960, 560), camOn([1500, 700], 1.15, 1100, 520), e2)) + `<rect width="1920" height="1080" fill="${P.night}" opacity="${n2(.35 * e2)}"/>`
    + bd("pip", 1330, 1076, 440, t, { in: s.t0 + .1, flip: false, ...watchO(1330, 1660), noreact: true }) + bd("momo", 330, 1076, 400, t, { in: s.t0 + .2, poses: [[s.t0, "sit"], [tQ + .3, "thinking"]] }) + bd("basil", 640, 1076, 380, t, { in: s.t0 + .3, poses: [[s.t0, "sit"], [tQ + .45, "thinking"]] })
    + NEXT_CARDS.map((c, i) => { const t0 = tIn + .3 + i * .25, pl = Math.max(pulse(t, tc[i], .04, .6), t >= tL ? (Math.floor((t - tL) / .5) % 3 === i ? .8 : 0) : 0); if (t < t0) return ""; const [x, d] = slideX(t, t0, .6, 2400, 560 + i * 400);
      return d + TF(x, 820, 1, choiceCard3(i + 1, c, darePic24(i, t), { w: 380, h: 330, size: 30, pulse: pl, id: "dr" })); }).join("")
    + (t >= tQ ? TF(960, 150, spring(t, tQ, .45), tpill(0, 0, "NEXT · What keeps it closed?", 52, P.ink, P.sun, { w: 700 })) : "")
    + (t >= tL ? TF(960, 1030, spring(t, tL, .45), tpill(0, 0, "Lock in your answer!", 44, P.sun, P.ink, { w: 700 })) : "")
    + melt(t, s, "liz", .4) + HUD(t); };
/* 14 · "Now you know!": OUR PLAN, filled, with READY! */
SC.nyk = (t, s) => nykScene(t, s, TF(960, 1060, 1.08, planBoard24(t, 0, 0, 1, { all: true, rows: [0, 0, 0], c2: 0, c1: 0, ready: s.t0 + .6 })), { bx: [230, 1730, 1500], hx: 470 });
})(); }
