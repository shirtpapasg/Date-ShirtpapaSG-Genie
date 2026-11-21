// p2.js: PART 2, "It Is WHITE. So Can Light Pass Through a Wooden Door?": opaque, transparency, "some plastics".
// Segments 1-16 of p3_ep11_script.md (version 1, 21 Nov 2026; the teacher's go-ahead in its section 12).
// STAGE 2 (drawn): the sets, the test table and the props are in flat.js, the look-closer pictures in closer.js, the journey in shrink.js.
// (Stage 1's notes:) the shared routines are wired (the calm three-picture recap with its labels, game, goals read by Basil, round card, the
// lock-in with its two clue labels on top of the ring, Mark Sentences read by the buddy, the book strips, the board OUR TORCH TEST as a
// functional placeholder (row 3, the two boxes, the heading TRANSPARENCY), the LOOK-CLOSER frame, the tip card, chant, score hand, read-along,
// "Now you know!"); every scene with new art is a phScene placeholder (and each [LOOK CLOSER] an lcPH placeholder inside the real frame).
// STAGE 2 (Fable) draws them: see SCENES_TODO.md.
if (PART === 2) { (() => {
const L1 = "j401";
// the scores (script section 3): Round 1 1 : 1, Showdown 3 : 1
SCORE.push([W("j506", "one") - .1, 1, 1]);
SCORE.push([W("j1106", "two") - .1, 3, 1]);
const FOOT = "P3 · Diversity of Materials · Transparency";

/* the corridor and its folding table (flat.js tableView). The robot hides behind the door (rig robot) until row 3 is done. */
const RK = ["clear", "frost", "mat", "tray"], RKB = ["clear", "frost", "door"], BOT_FAR = -960, CAM0 = [1, 960, 540], CAMLC = [1.1, 880, 740], CAMR3 = [1.1, 1000, 640], WARM = "#FFF3C9";
const C = (t, o = {}, cam) => tableView(t, { set: "corr", rack: RK, board: {}, ...o }, cam);
const buds = (t, o = {}) => sPip(t, o.pip) + sBasil(t, o.basil) + sMomo(t, o.momo);
const wlab = (t, t0, cam, x, y, txt, wx, wy, o = {}) => { if (t < t0) return ""; const a = o.t1 === undefined ? 1 : 1 - ramp(t, o.t1, .25); return a <= .01 ? "" : OP(a, pline(x, y, fgx(cam, wx), fgy(cam, wy), ramp(t, t0, .2)) + TF(x, y, spring(t, t0, .4), tpill(0, 0, txt, o.size || 40, o.fill || "#fff", o.ink || P.ink, { w: 700 }))); };
// the thumbnail's frame: the white door's look-closer, bright (the beam ends on the lit door, the card behind with no spot); Momo surprised
const THUMB2 = (t) => `<rect width="1920" height="1080" fill="${hx2("#CFC8DA", "#35315F", .45)}"/><rect y="792" width="1920" height="288" fill="${hx2("#F2EFE8", "#77719A", .45)}"/><path d="M0 792 H1920" stroke="#fff" stroke-width="5" opacity=".4"/>` + TF(1160, 806, 1.05, rig(t, { sheet: "door", on: 1, dim: .45, night: true, id: "th" })) + buddy("momo", 200, 480, 250, t, { aura: true, tag: false, pose: "surprised", still: true }) + logo(t);

/* 1 · "Last time...": three calm pictures from Part 1, one at a time, each >= 2.5 s, centred and large, a gentle push-in, one label each.
   (TRANSPARENT and TRANSLUCENT are NOT put on Part 2's shelf: it holds only this part's new words.) */
SC.lasttime = (t, s) => { if (location.search.includes("thumb")) return THUMB2(t); const L = "j101", tb = [s.t0, W(L, "frosted") - .2, W(L, "now") - .2], i = t >= tb[2] ? 2 : t >= tb[1] ? 1 : 0, labs = ["Transparent: most light", "Translucent: only some light", "The white door: how much light?"];
  const z = 1 + .05 * eio((t - tb[i]) / 4), k = ramp(t, tb[i] + .05, .5), ro = [{ sheet: "clear", on: 1 }, { sheet: "frost", on: 1 }, { sheet: "door", dim: .35 }][i], cx = i === 2 ? 800 : 960;
  return bg("stage2") + OP(ramp(t, s.t0, .3), T(960, 110, "Last time…", 60, "#fff", { w: 600 }))
    + OP(k, `<g transform="translate(960 540) scale(${n2(z)}) translate(-960 -540)">${TF(cx, 520, 1, rigCard(t, ro, 1000, 560, "lt" + i))}`
      + (i === 2 ? TF(cx + 35, 520 + 168 - 160, spring(t, tb[2] + .6, .5) * (1 + .05 * Math.sin(t * 4)), `<g filter="url(#dropS)"><circle r="50" fill="url(#gSun)"/></g>${T(0, 26, "?", 78, P.ink)}`) + TF(1590, 800, .38, torchBoard(t, { glow: 2 })) : "") + `</g>`
      + TF(960, 960, spring(t, tb[i] + .3, .4), i < 2 ? ansTag(labs[i], i, 50) : tpill(0, 0, labs[i], 50, P.sun, P.ink, { w: 700 }))) + HUD(t); };

/* 2 · the new place (the corridor of an HDB block at night), the game and the hidden moth; 3 · goals (Basil reads) */
SC.place = (t, s) => C(t, { rig: { sheet: "door", robot: 1 } }, [1.02 + .02 * eio((t - s.t0) / 3), 960, 548]) + buds(t, { pip: { in: s.t0 + .2 }, basil: { in: s.t0 + .35 }, momo: { in: s.t0 + .5 } }) + lowerPill(60, 96, "The corridor of an HDB block,", "Singapore") + torchRule(t, s.t0 + .3) + HUD(t, { logo: false });
SC.game = (t, s) => gameScene(t, s, "j201", false);
SC.goals = (t, s) => goals3(t, s, [["Opaque", ""], ["What transparency is", ""], ["Transparent, translucent, opaque", ""]], ["j301", "j302", "j303", "j304"], "basil");

/* 4 · Round 1: the white wooden door (clue labels wood · painted white on top of the ring, kept through the countdown) */
SC.r1card = (t, s) => roundCard(t, s, "ROUND 1");
const r1labels = (t) => { const tq = W(L1, "wooden") - .1; return t < tq ? "" : ["wood", "painted white"].map((l, i) => TF(430 + (i ? 110 : -120), 470 - RING_R - 14, spring(t, tq + i * .2, .4), tpill(0, 0, l, 32, "#fff", P.ink, { w: 700 }))).join(""); };
SC.r1 = (t, s) => lockN(t, { cards: ["Most", "Only some", "None"], labels: r1labels, q: "How much light will pass through?", tq: W(L1, "how") - .1, tc: [W(L1, "one", 1), W(L1, "two"), W(L1, "three")], ring0: MK("ring0_r1"), dur: 5, lock: "j402",
  obj: (tt) => `<circle cx="430" cy="470" r="172" fill="#8D86B4"/>` + TF(525, 545, .42, rig(tt, { sheet: "door", dim: .3, night: true, card: false, id: "r1p" })), picks: [{ who: "momo", id: "j403", word: "2", x: true }, { who: "basil", id: "j404", word: "3" }, { who: "pip", id: "j405", word: "3" }],
  react: [[LE("j403") + .1, "momo", "thinking"], [LE("j404") + .1, "basil", "cheer"], [LE("j405") + .1, "pip", "pointing"]] });

/* 5 · [LOOK CLOSER] the torch on the white wooden door (closer.js doorArt); the answer */
SC.lcdoor = (t, s) => lookCloser(t, s, { tz: s.t0, fx: 960, fy: 555, bgc: LCBGN, art: doorArt, set: (tt) => C(tt, { rig: { sheet: "door", robot: 1 } }, CAMLC), verdict: VSTYLE("NO LIGHT PASSES THROUGH", 2), tv: MK("v_door") });
SC.doorans = (t, s) => { const a = "j504", b = "j505", c = "j506", tA = W(a, "three") - .1, lit = t >= tA ? spring(t, tA, .45) : 0, tc = W(c, "one") - .1, hb = HAS(b);
  return bg("stage2") + TF(1000, 470, 1.05 * spring(t, s.t0 + .1, .45), ansCard(3, "None", { lit, w: 330 })) + TF(1450, 440, spring(t, s.t0 + .25, .45), rigCard(t, { sheet: "door", on: 1, night: true }, 520, 290, "da"))
    + (t >= s.t0 + .6 ? TF(1450, 640, spring(t, s.t0 + .6, .4), ansTag(hb ? "no light" : "White is only its colour", 2, 38)) : "")
    + buddy("momo", 330, 1060, 300, t, { aura: true, in: s.t0 + .1, poses: hb ? [[s.t0, "sit"], [tA, "surprised"], [LT(b) - .12, "sit"], [LE(b) + .1, "cheer"]] : [[s.t0, "sit"], [tA, "surprised"], [tA + 1.6, "sit"]], jump: [[tA + 1.7, 14]], nohop: true }) + (hb ? say(b, 600, 640, t, { size: 44, tail: -200, maxW: 520 }) : "")
    + buddy("basil", 1720, 1062, 190, t, { aura: true, flip: true, in: s.t0 + .2, poses: [[s.t0, "sit"], [tA, "cheer"], [tA + 1.8, "sit"]] }) + coin(t, tc, 1000, 850, "+1", "if you showed three fingers") + HUD(t); };

/* 6 · Mark Sentence 1 (Pip): OPAQUE pops beside the card; row 3 (the door, the doormat, the metal tray); the book's strips */
SC.mark1 = (t, s) => markScene(t, s, { id: "j602", sayId: "j601", who: "pip", n: "1 of 2", text: "Some materials do not allow any light to pass through them. These materials are opaque.", keys: ["do", "not", "allow", "any", "light", "pass", "through", "opaque."], size: 60, y: 250, footer: FOOT,
  extra: TF(830, 930, spring(t, s.t0 + .4, .5), rigCard(t, { sheet: "door", on: 1, night: true }, 440, 230, "m1")) });
// row 3: the hands change the door for the doormat (in by mat - .35), the torch goes on (mat + .15) and stays on, then the metal tray (in by tray - .35)
const row3Rig = (t) => { const m = MK("mat"), y = MK("tray"), a = swapSheet(t, m - .95, "door", "mat", .3, .6), b = swapSheet(t, y - .85, "mat", "tray", .25, .5); return { ...(t < y - .85 ? a : b), on: t >= m + .15, finger: pressAny(t, m + .15), robot: 1 }; };
SC.row3 = (t, s) => { const L = "j604", m = MK("mat"), y = MK("tray"), hw = rw(0, -300), cw = rw(CARDX, AX), tg = { doormat: pulse(t, W(L, "rubber") - .05, .08, .7), "white door": pulse(t, W(L, "wood") - .05, .08, .7), "metal tray": pulse(t, W(L, "metal") - .05, .08, .7) };
  return C(t, { rack: t < m - .95 ? RK : t < y - .85 ? ["clear", "frost", "door", "tray"] : ["clear", "frost", "door", "mat"], rig: row3Rig(t), board: { glow: t < stampT(2) ? 2 : -1, tg } }, CAMR3)
    + wlab(t, m - .1, CAMR3, 700, 470, "rubber", hw[0] - 20, hw[1] + 40, { size: 44, t1: y - .9 }) + wlab(t, y - .1, CAMR3, 700, 470, "metal", hw[0] - 20, hw[1] + 40, { size: 44, t1: LT(L) + .3 })
    + wlab(t, MK("on5") + .2, CAMR3, 1170, 450, "no spot · no glow", cw[0], cw[1] - 30, { size: 40, t1: LT(L) + .3 })
    + bookCaption(t, L, "Rubber, wood and metal are opaque materials.", 120, { size: 46, keys: ["rubber,", "wood", "metal"] }) + bookCaption(t, L, "You cannot see objects placed behind opaque materials.", 215, { size: 42, x: 1175, off: 7, keys: ["cannot", "see", "placed", "behind"] }) + buds(t) + torchRule(t) + HUD(t); };

/* 7 · [LOOK CLOSER] three sheets, three cards (closer.js threeArt; watched, not scored). The verdict lands in three parts, each in its answer style */
SC.lcthree = (t, s) => lookCloser(t, s, { tz: s.t0, fx: 960, fy: 555, bgc: LCBGN, art: threeArt, set: (tt) => C(tt, { rack: ["clear", "frost", "door", "mat"], rig: { sheet: "tray", on: 1, robot: 1 } }, CAMR3), verdict: ["", P.ink], tv: undefined,
  over: (tt) => verdictPills(tt, MK("v_three"), [["MOST", 0], ["ONLY SOME", 1], ["NONE", 2]], 66) });

/* 8 · Mark Sentence 2 (Basil): TRANSPARENCY pops beside the card on "transparency"; the heading is stamped on the board */
SC.mark2 = (t, s) => markScene(t, s, { id: "j802", sayId: "j801", who: "basil", n: "2 of 2", text: "The transparency of a material refers to how much light can pass through it.", keys: ["transparency", "how", "much", "light", "can", "pass", "through"], size: 64, y: 250, footer: FOOT,
  extra: TF(830, 930, spring(t, s.t0 + .4, .5), threeCards("m3")) });
const RK4 = ["clear", "frost", "door", "mat"];
SC.heading = (t, s) => C(t, { rack: RK4, rig: { sheet: "tray", robot: 1 } }, camL(CAMR3, [1.8, 1525, 700], eo((t - s.t0) / .5))) + buds(t) + HUD(t);

/* 9 · BE THE LIGHT OF THE LAMP: the glide to the clear window and through it (the journey itself is SC.shrink in shrink.js) */
SC.waitw = (t, s) => { const L = "j901", dive = ei((t - (s.t1 - 1.5)) / 1.5), e = eio((t - s.t0) / 1.2), m = Math.max(e * .5, dive), cam = [1 + .22 * e + 3.6 * dive, lerp(960, 1280, m), lerp(540, 390, m)], tP = W(L, "be") - .2;
  return C(t, { rack: RK4, rig: { sheet: "tray", robot: 1 }, moth: dive < .2 }, cam)
    + OP(1 - dive * 1.6, buds(t, { momo: { poses: [[s.t0, "sit"], [tP, "cheer"]] } })
      + (t >= tP ? TF(960, 250, spring(t, tP, .45), tpill(0, 0, "Be the light!", 76, P.sun, P.ink, { w: 700 })) : "") + HUD(t)) + wipe(t, s.t1, WARM, 960, 540); };

/* 10 · Showdown: Pip's notes (double points). The set is dimmed and cleared; an adult's hands set the two lunch boxes on the table */
const NOTES = [900, 1052, .8], BXS = [[1390, false], [1530, true]];
const boxDown = (t, t0, x, cl) => { const u = clamp((t - t0) / .5), y = TBY - (1 - eo(u)) * 900, v = clamp((t - t0 - .5) / .5); return t < t0 ? "" : TF(x, y, RGS, (u < 1 ? TF(0, -100, 1, armHold()) : "") + lunchBox(cl) + (u < 1 ? TF(0, -100, 1, armFingers()) : "")) + (u >= 1 && v < 1 ? TF(x, TBY - 62 - ei(v) * 900, RGS, armHold()) : ""); };
const showBack = (t, s0) => C(t, { rig: false, rack: false, board: false }) + `<rect width="1920" height="1080" fill="${P.night}" opacity=".42"/>` + BXS.map(([x, cl], i) => boxDown(t, s0 === undefined ? -9 : s0 + .3 + i * .45, x, cl)).join("");
SC.show = (t, s) => { const a = "j1001", b = "j1002", r0 = MK("ring0_show"), bell = MK("bell_show"), rs = ringState(t, r0, 6);
  const tr = [W(a, "one"), W(a, "two"), W(a, "three")], tcn = [W(b, "one", 1), W(b, "two"), W(b, "three")], tM = LT("j1004"), tB = LT("j1005"), tO = LT("j1006") - .1;
  const lit = [0, 1, 2].map((i) => t < LT(b) ? (t >= tr[i] - .1 && t < (tr[i + 1] || LE(a)) - .1 ? 1 : 0) : 0), badge = [0, 1, 2].map((i) => Math.max(pulse(t, tcn[i], .04, .5), t >= r0 && t < bell ? (Math.floor((t - r0) / .5) % 3 === i ? .5 + .5 * rs.tick : 0) : 0));
  const nf = t >= tcn[2] - .1 ? 3 : t >= tcn[1] - .1 ? 2 : 1, ringOn = t >= tcn[0] - .3 && t < bell + .8, RX = 235, RY = 560;
  return showBack(t, s.t0) + TF(NOTES[0], NOTES[1], NOTES[2], pipNotes(t, { lit, badge, x: spring(t, tM + .5, .4) }))
    + buddy("pip", 1764, 1060, 220, t, { aura: true, flip: true, in: s.t0 + .1, poses: [[s.t0, "cheer"], [LT(a) - .12, "sit"], [LE(a) + .2, "arms_crossed"], [tO, "oops"]], nohop: true }) + say("j1006", 1650, 720, t, { size: 46, tail: 100, maxW: 300 })
    + (ringOn ? OP(1 - ss(bell + .5, bell + .8, t), TF(RX, RY, spring(t, tcn[0] - .3, .4), `<g transform="translate(${-RX} ${-RY})">${ringTimer(RX, RY, t < r0 ? 1 : rs.frac, t < r0 ? 6 : rs.secs, t, { R: 128, sw: 22, tick: rs.tick, shut: pulse(t, bell, .01, .6), inner: TF(RX, RY + 60, .62, countHand(nf)) })}</g>`) + youPill(RX, RY - 178, 1.0) + tpill(RX, RY + 222, "line 1, 2 or 3?", 30, P.ink, "#fff")) : "")
    + (t >= bell + .9 ? buddy("momo", 150, 1062, 200, t, { aura: true, in: bell + .9, poses: [[bell + .9, "thinking"], [tM - .12, "sit"], [LE("j1004") + .1, "pointing"]] }) + pickNum("momo", 290, 990, t, tM - .1, "2") + buddy("basil", 440, 1062, 170, t, { aura: true, in: bell + 1.0, poses: [[bell + 1, "sit"], [LE("j1005") + .1, "cheer"]], nohop: true }) + pickNum("basil", 548, 1000, t, tB - .1, "2")
      + say("j1004", 290, 740, t, { size: 40, tail: -100, maxW: 380 }) + say("j1005", 300, 740, t, { size: 42, tail: 100, maxW: 380 }) : "")
    + stamp(t, LT("j1003") - .08, 700, 420) + bellIcon(t, r0) + HUD(t); };

/* 11 · [LOOK CLOSER] a clear plastic box and a cloudy plastic box (closer.js boxArt); the two tiles, the strips, the fix, +2 */
const boxWait = (t, on) => on ? TF(RGX - 620 * RGS, TBY, RGS, lunchBox(false)) : "";
SC.lcbox = (t, s) => lookCloser(t, s, { tz: s.t0, fx: 960, fy: 555, bgc: LCBGN, art: boxArt, set: (tt) => C(tt, { rack: RKB, rig: { sheet: "boxC", hand: setHand(tt, s.t0 - .05, .55) }, bot: { x: BOT_FAR }, items: boxWait(tt, true) }, CAMLC), verdict: ["", P.ink], tv: undefined,
  over: (tt) => verdictPills(tt, MK("v_box"), [["BOTH PLASTIC", -1], ["ONE TRANSPARENT", 0], ["ONE TRANSLUCENT", 1]], 50) });
SC.fix = (t, s) => { const L = "j1105", tTip = LE(L) - .8, rub = ss(LE(L) - 1.9, LE(L) - 1.4, t), wr = ss(LE(L) - 1.4, LE(L) - .2, t), tc = W("j1106", "two") - .1;
  return C(t, { rack: RKB, rig: { sheet: "boxF" }, bot: { x: BOT_FAR }, board: false }) + `<rect width="1920" height="1080" fill="${P.night}" opacity=".42"/>`
    + TF(1470, 1050, .5, torchBoard(t)) + TF(650, 1052, .58, pipNotes(t, { fixing: 1, rub, write: wr, x: 1 - rub, tick: spring(t, LE(L) - .1, .45) }))
    + bookCaption(t, L, "Glass and some plastics are transparent.", 120, { size: 48, keys: ["some", "plastics"] }) + bookCaption(t, L, "Frosted glass and some plastics are translucent.", 215, { size: 44, x: 900, off: 6, keys: ["some", "plastics"] })
    + (t >= tTip ? TF(650, 420, spring(t, tTip, .45), `<g filter="url(#drop)"><rect x="-330" y="-80" width="660" height="160" rx="30" fill="url(#gPaper)" stroke="${P.sun}" stroke-width="7"/></g>${T(0, -14, "Do not go by the name.", 44, P.ink)}${T(0, 44, "How much light passes through?", 40, P.ink, { w: 600 })}`) : "")
    + buddy("pip", 150, 1062, 200, t, { aura: true, poses: [[s.t0, "oops"], [s.t0 + 2.2, "sit"], [tc, "cheer"]], nohop: true }) + coin(t, tc, 1470, 560, "+2", "if you showed two fingers") + HUD(t); };

/* 12 · the chant: call and response (common.js chantScene); the board OUR TORCH TEST behind the buddies, each row flashing on its call */
SC.chant = (t, s) => chantScene(t, s, "c1003", { sayId: "u1002", size: 58, board: (tt, flash) => TF(232, 1066, .43, torchBoard(tt, { flash })) });

/* 13 · score hand, the moth (lizReveal in common.js) */
SC.final = (t, s) => { const L = "j1301"; return finalScene(t, s, L, 1, [[s.t0, null, 1], [W(L, "three") - .1, null, 3]]); };
SC.liz = (t, s) => { const L = "j1302", tq = W(L, "it") - .1, land = ss(s.t0 + .9, s.t0 + 2.2, t), [mx, my] = mothAt(t, land);
  return lizReveal(t, s, L, C(t, { rack: RKB, rig: { sheet: "boxF" }, bot: { x: BOT_FAR }, board: false, land, wave: ss(tq - .2, tq + .3, t) }), mx, my, tq, "It was by the corridor lamp!", 0, 120, 62, 2.0); };

/* 14 · the dare for Episode 12: the SAME supermarket trolley three times (glass, metal, fabric), each whole, each with a big bag of rice.
   The three boards slide in low along the cleared table (EP12 opens with these same boards and cards) */
const DRX = [720, 1070, 1420];
SC.dare = (t, s) => { const a = "j1401", b = "j1402", tQ = W(a, "which") - .15, tc = [W(a, "one") - .1, W(a, "two") - .1, W(a, "three") - .1], tL = W(a, "lock") - .1, hb = HAS(b);
  const brd = [["trGlass", "glass"], ["trMetal", "metal"], ["trFabric", "fabric"]].map(([p_, lab], i) => { const t0 = s.t0 + .4 + i * .3, [x, d] = slideX(t, t0, .7, 2500, DRX[i], TBY - 4); return t < t0 ? "" : d + picBoard(p_, x, TBY - 150, 1, { sc: .78, lab, size: 44, id: "dr" + i }); }).join("");
  return C(t, { rig: false, rack: false, board: false, items: brd }) + `<rect width="1920" height="1080" fill="#FFF8EA" opacity=".1"/>`
    + (t >= tQ ? TF(1070, 430, spring(t, tQ, .5) * (1 + .05 * Math.sin(t * 4)), `<g filter="url(#dropS)"><circle r="50" fill="url(#gSun)"/></g>${T(0, 26, "?", 78, P.ink)}`) : "")
    + ["Glass", "Metal", "Fabric"].map((txt, i) => TF(DRX[i], 985, .5 * spring(t, tc[i], .45), ansCard(i + 1, txt, { w: 430, h: 290, size: 60, pulse: Math.max(pulse(t, tc[i], .04, .6), t >= tL ? (Math.floor((t - tL) / .5) % 3 === i ? .8 : 0) : 0) }))).join("")
    + TF(1070, 100, slamK(t - s.t0, .15), `<g transform="rotate(-2)"><g filter="url(#drop)"><rect x="-150" y="-44" width="300" height="88" rx="44" fill="${P.coral}"/><rect x="-142" y="-36" width="284" height="72" rx="36" fill="none" stroke="#fff" stroke-width="5"/></g>${T(0, 20, "NEXT", 54, "#fff", { ls: 8 })}</g>`)
    + (t >= W(a, "supermarket") - .1 ? TF(1070, 196, spring(t, W(a, "supermarket") - .1, .45), tpill(0, 0, "Choosing materials!", 60, P.ink, "#fff", { w: 700 })) : "") + (t >= tL ? TF(1070, 282, spring(t, tL, .45) * (1 + .03 * Math.sin(t * 8)), tpill(0, 0, "Lock in your answer!", 40, P.sun, P.ink, { w: 700 })) : "")
    + buddy("basil", 250, 1056, 290, t, { aura: true, in: s.t0 + .1, poses: hb ? [[s.t0, "sit"], [tQ, "arms_crossed"], [LT(b) - .12, "cheer"], [LE(b) + .3, "sit"]] : [[s.t0, "sit"], [tQ, "surprised"]], nohop: true }) + (hb ? say(b, 330, 600, t, { size: 42, tail: -40, maxW: 440 }) : "") + HUD(t); };

/* 16 · "Now you know!": the board OUR TORCH TEST, complete (heading and three rows), centred in the free space between the buddies */
SC.nyk = (t, s) => nykScene(t, s, TF(920, 1046, .62, torchBoard(t)), { bx: [200, 1715, 1375], hx: 470 });
})(); }
