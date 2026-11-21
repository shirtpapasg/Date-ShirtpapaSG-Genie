// p2.js: PART 2, "Raincoat vs School Shoe: Which One SOAKS UP the Rain?": absorb, waterproof, wax (treatment).
// Segments 1-16 of p3_ep10_script.md (version 1, 21 Nov 2026; the teacher's go-ahead in its section 12: the wax goes on rubber-soled fabric
// BOOTS and is named "shoe wax"; the drop test still compares the plastic raincoat with a fabric school shoe).
// STAGE 2 (drawn): the set and props are in rainy.js (the void deck in the rain, the raincoat, the shoe, the boots, the trays, the tiles,
// Basil's notes, EP11's dare boards) and water.js; the two look-closers (SC.lcdrip, SC.lcwax) in closer.js, the journey (SC.shrink) in shrink.js.
if (PART === 2) { (() => {
const L1 = "f401";
// the scores (script section 3): Round 1 1 : 1, Showdown 3 : 1
SCORE.push([W("f508", "one") - .1, 1, 1]);
SCORE.push([W("f1108", "two") - .1, 3, 1]);
const FOOT = "P3 · Diversity of Materials · Waterproof";

const lc3 = (a, b, e) => [lerp(a[0], b[0], e), lerp(a[1], b[1], e), lerp(a[2], b[2], e)];
const picFrame = (inner, w, h, id) => `<clipPath id="${id}"><rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="22"/></clipPath><g filter="url(#dropS)"><rect x="${-w / 2 - 9}" y="${-h / 2 - 9}" width="${w + 18}" height="${h + 18}" rx="28" fill="#FFF8EA"/></g><g clip-path="url(#${id})">${inner}</g>`;
// the thumbnail's frame (thumb_still.js ... "&thumb"): the two boots large (the plain one soaked, the waxed one dry with a bead on it), Pip surprised
const THUMB2 = (t) => deckView(t, { coat: false, shoe: false, boots: false, kit: false, board: false, snail: false, back: `<rect x="1378" y="180" width="94" height="140" fill="#F6F2E8"/>` }, [1.2, 700, 560]) + `<ellipse cx="930" cy="1046" rx="420" ry="24" fill="${P.ink}" opacity=".16"/>`
  + TF(770, 1040, 1.5, bootFront({ wet: 1, id: "th1" })) + TF(1090, 1040, 1.5, bootFront({ wax: 1, id: "th2" })) + TF(1090, 1040 - 104 * 1.5 - 24, 1, bead(32)) + buddy("pip", 180, 760, 240, t, { aura: true, tag: false, pose: "surprised", still: true }) + logo(t);

/* 1 · "Last time...": three calm pictures from Part 1, one at a time, each >= 2.5 s, centred and large, a gentle push-in, one label each */
SC.lasttime = (t, s) => { if (location.search.includes("thumb")) return THUMB2(t); const L = "f101", tb = [s.t0, W(L, "a") - .2, W(L, "now") - .2], i = t >= tb[2] ? 2 : t >= tb[1] ? 1 : 0, labs = ["Wood floats · Metal sinks", "Trapped air inside", "Test 2: drip on it"];
  const z = 1 + .05 * eio((t - tb[i]) / 4), k = ramp(t, tb[i] + .05, .5);
  const pic = i === 0 ? picFrame(lcTable(196) + TF(0, 196, 1.5, tubSvg({ t, inner: tubThings({ wb: 1, mb: 1, ws: 1, ms: 1 }, t) })), 1040, 580, "lt0") : i === 1 ? shipCard(t, 1040, 580, "lt1")
    : picFrame(`<rect x="-600" y="-300" width="1200" height="600" fill="url(#wSkyG)"/>` + `<g transform="translate(-960 -540)">${rainIn(t, 430, 240, 1490, 760, 46, 1, "rnL", 5)}</g><rect x="-600" y="190" width="1200" height="120" fill="#EFE8DC"/><path d="M-600 190 H600" stroke="#fff" stroke-width="5"/>` + TF(-300, 240, .98, coatStand()) + TF(40, 246, .56, shoeTray()) + TF(350, 252, .36, board3(t, { glow: 1 })), 1040, 580, "lt2");
  return bg("stage2") + OP(ramp(t, s.t0, .3), T(960, 110, "Last time…", 60, "#fff", { w: 600 }))
    + OP(k, `<g transform="translate(960 520) scale(${n2(z)})">${pic}</g>` + TF(960, 960, spring(t, tb[i] + .3, .4), tpill(0, 0, labs[i], 50, P.sun, P.ink, { w: 700 }))) + HUD(t); };

/* 2 · the new place (the void deck in the rain), the game and the hidden snail; 3 · goals (Momo reads) */
SC.place = (t, s) => deckView(t, { board: {} }, [1.02 + .02 * eio((t - s.t0) / 3), 960, 600]) + sPip(t, { in: s.t0 + .3 }) + sBasil(t, { in: s.t0 + .45 }) + sMomo(t, { in: s.t0 + .6 })
  + lowerPill(60, 96, "The void deck of an HDB block,", "Singapore") + finePrint(t, s.t0 + .3, "Water play? Always with an adult.", 276, 196);
SC.game = (t, s) => gameScene(t, s, "f201", false);
const icBead = `<rect x="-84" y="2" width="168" height="44" rx="12" fill="url(#wCoat)" stroke="#C98A0A" stroke-width="4"/><g transform="translate(0 -12)">${bead(22)}</g>`;
const icTrays = `<rect x="-96" y="-18" width="92" height="48" rx="12" fill="${GOODC}" stroke="#fff" stroke-width="4"/><path d="M-66 6 l12 12 l22 -24" fill="none" stroke="#fff" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/><rect x="4" y="-18" width="92" height="48" rx="12" fill="${WEAKC}" stroke="#fff" stroke-width="4"/><path d="M34 -6 l28 24 M62 -6 l-28 24" stroke="#fff" stroke-width="8" stroke-linecap="round"/>`;
const icWax = `<g transform="translate(0 58) scale(.4)">${bootFront({ wax: 1, id: "ic" })}</g><g transform="translate(0 4)">${bead(13)}</g>`;
SC.goals = (t, s) => goals3(t, s, [["What waterproof means", icBead], ["Waterproof or not waterproof", icTrays], ["Wax makes fabric waterproof", icWax]], ["f301", "f302", "f303", "f304"], "momo");

/* 4 · Round 1: the raincoat or the shoe? (clue tag "plastic · fabric" on top of the ring, kept through the countdown) */
SC.r1card = (t, s) => roundCard(t, s, "ROUND 1");
const dripRing = (tt) => `<g clip-path="url(#cRing)"><rect x="250" y="290" width="360" height="360" fill="#DCE3EA"/><rect x="250" y="572" width="360" height="90" fill="#EFE8DC"/><path d="M250 572 H610" stroke="#fff" stroke-width="4"/>${TF(350, 596, .52, coatStand())}${TF(512, 600, .3, shoeTray())}
  ${TF(428, 440 + 3 * Math.sin(tt * 2), .5, dropper())}${TF(537, 532 + 3 * Math.sin(tt * 2 + 1), .5, dropper())}</g>`;
SC.r1 = (t, s) => lockN(t, { cards: ["The raincoat", "The shoe", "Both"], tag: "plastic · fabric", q: "Which one does the water soak into?", tq: W(L1, "which") - .1, tc: [W(L1, "one", 1), W(L1, "two"), W(L1, "three")], ring0: MK("ring0_r1"), dur: 5, lock: "f402",
  obj: dripRing, picks: [{ who: "momo", id: "f403", word: "3", x: true }, { who: "basil", id: "f404", word: "2" }, { who: "pip", id: "f405", word: "2" }],
  react: [[LE("f403") + .1, "momo", "thinking"], [LE("f404") + .1, "basil", "cheer"], [LE("f405") + .1, "pip", "pointing"]] });

/* 5 · ([LOOK CLOSER] the slow drop test is SC.lcdrip in closer.js) the answer: two, the shoe; tick 2 */
SC.dripans = (t, s) => { const a = "f506", b = "f507", c = "f508", tA = W(a, "two") - .1, lit = t >= tA ? spring(t, tA, .45) : 0, tc = W(c, "one") - .1, hb = HAS(b), tk = MK("tick2");
  return bg("stage") + `<rect y="800" width="1920" height="280" fill="url(#xFloor)"/>` + TF(880, 470, 1.05 * spring(t, s.t0 + .1, .45), ansCard(2, "The shoe", { lit, w: 330 })) + TF(1390, 760, .62 * spring(t, s.t0 + .25, .45), board3(t, { glow: ticked(1, t) ? -1 : 1 }))
    + (t >= tk ? TF(1390, 420, spring(t, tk, .4), tpill(0, 0, "Test 2: done!", 38, GOODC, "#fff", { w: 700 })) : "")
    + buddy("momo", 330, 1060, 300, t, { aura: true, in: s.t0 + .1, poses: hb ? [[s.t0, "sit"], [tA, "surprised"], [LT(b) - .12, "sit"], [LE(b) + .1, "cheer"]] : [[s.t0, "sit"], [tA, "surprised"]], nohop: true }) + (hb ? say(b, 520, 640, t, { size: 44, tail: -150, maxW: 520 }) : "")
    + coin(t, tc, 880, 840, "+1", "if you showed two fingers") + HUD(t); };

/* 6 · Mark Sentence 1: waterproof (Pip); WATERPROOF pops large after the card; the two trays and the book's fabric sentences (3.18a) */
const beadCard = (t) => `<g filter="url(#dropS)"><rect x="-230" y="-96" width="460" height="192" rx="26" fill="#FFF8EA"/></g><rect x="-216" y="-82" width="432" height="164" rx="18" fill="#DCE3EA"/><path d="M-216 20 Q0 -14 216 20 V64 Q216 82 198 82 H-198 Q-216 82 -216 64z" fill="url(#wCoat)" stroke="#C98A0A" stroke-width="4"/><path d="M-170 26 Q-40 4 60 8" fill="none" stroke="#FFF3B0" stroke-width="8" stroke-linecap="round" opacity=".9"/><g transform="translate(20 -28)">${bead(34, .5 * Math.sin(t * 3))}</g>`;
SC.mark1 = (t, s) => markScene(t, s, { id: "f602", sayId: "f601", who: "pip", n: "1 of 2", text: "Materials that do not absorb water at all are waterproof.", keys: ["not", "absorb", "water", "at", "all", "waterproof."], size: 70, y: 250, footer: FOOT,
  extra: TF(1150, 930, spring(t, s.t0 + .4, .5), beadCard(t)) });
const TRC = [424, TRX.y - 30], TRS = [TRX.b - 40, TRX.y - 30];          // where the raincoat and the wet shoe stand on their trays
const trayView = (t, o = {}, cam = CAMD) => deckView(t, { coat: TRC, shoe: [...TRS, 1, 1], back: traysOn(t, o), ...o }, cam);
SC.trays = (t, s) => { const [gx_, gd] = slideX(t, s.t0 + .15, .7, -700, TRX.g, TRX.y + 36), [bx_, bd] = slideX(t, s.t0 + .35, .7, 2500, TRX.b, TRX.y + 36), e1 = eio((t - s.t0 - 1.1) / .7), e2 = eio((t - s.t0 - 1.7) / .7);
  const c = [lerp(DKX.coat[0], TRC[0], e1), lerp(DKX.coat[1], TRC[1], e1)], sh = [lerp(DKX.shoe[0], TRS[0], e2), lerp(DKX.shoe[1], TRS[1], e2)];
  return deckView(t, { coat: c, shoe: [...sh, 1, e2 > .02], back: gd + bd + traysOn(t, { gx: gx_, bx: t >= s.t0 + .35 ? bx_ : 2500 }) + (e1 > 0 && e1 < 1 ? dust(c[0], c[1], e1, .8) : "") + (e2 > 0 && e2 < 1 ? dust(sh[0], sh[1], e2, .8) : "") }, CAMD)
    + bookCaption(t, "f603", "Fabric absorbs water and allows water to pass through it.", 150, { size: 48, keys: ["absorbs", "pass", "through"] }) + bookCaption(t, "f603", "It is not a waterproof material.", 245, { size: 48, off: 10, keys: ["not", "waterproof", "material."] })
    + sPip(t) + sBasil(t) + sMomo(t) + HUD(t); };

/* 7 · BE A RAINDROP: the rise (the journey itself is SC.shrink in shrink.js) */
const RAINC = "#DCE4EC";
SC.waitw = (t, s) => { const L = "f701", dive = ei((t - (s.t1 - 1.4)) / 1.4), e = eio((t - s.t0) / 1.2), cam = [lerp(1.04, 1.2, e) + 4 * dive, 960, lerp(600, 300, Math.max(e * .5, dive))], tP = W(L, "be") - .2;
  return trayView(t, {}, cam) + OP(1 - dive * 1.6, buddy("pip", 240, 1056, 220, t, { aura: true, in: s.t0 + .1, poses: [[s.t0, "pointing"], [s.t0 + 1.6, "sit"]] }) + buddy("momo", 1680, 1056, 220, t, { aura: true, flip: true, in: s.t0 + .2, poses: [[s.t0, "sit"], [tP, "cheer"]], nohop: true })
      + (t >= tP ? TF(960, 250, spring(t, tP, .45), tpill(0, 0, "Be a raindrop!", 76, P.sun, P.ink, { w: 700 })) : "") + HUD(t)) + wipe(t, s.t1, RAINC, 960, 300); };

/* 8 · pull back out; four waterproof materials (3.18a) on the green tray */
SC.pullout = (t, s) => { const e = eo((t - s.t0) / .8), cam = [lerp(2.2, 1.04, e), 960, lerp(760, 600, e)]; return trayView(t, {}, cam) + wipe(t, s.t0, "#F4F7FB") + HUD(t); };
SC.four = (t, s) => { const L = "f801", tw_ = ["rubber", "plastic", "glass", "metals"].map((w) => W(L, w) - .25), ks = tw_.map((x) => spring(t, x, .45)), hop_ = tw_.map((x) => 46 * hop(t, x, .4)), lit = tw_.map((x) => pulse(t, x + .2, .1, 1.2));
  return trayView(t, { tiles: ks, hop: hop_, lit }, CAMD) + tw_.map((x, i) => dust(gx(CAMD, TILEX(TRX.g, i)), gy(CAMD, TRX.y - 28), (t - x - .4) / .35, 1)).join("")
    + bookCaption(t, L, "Rubber, plastic, glass and metals do not absorb water", 130, { size: 40, keys: ["rubber,", "plastic,", "glass", "metals"] }) + bookCaption(t, L, "and do not allow water to pass through them.", 210, { size: 40, off: 9 }) + bookCaption(t, L, "They are waterproof materials.", 290, { size: 40, off: 18, keys: ["waterproof"] })
    + sPip(t) + sBasil(t) + sMomo(t) + HUD(t); };

/* 9 · test three: WAX IT. Two fabric boots on one tray; an adult's hand holds the block of SHOE WAX; ([LOOK CLOSER] is SC.lcwax in closer.js); tick 3 */
const WAXP = "An adult rubs on cold shoe wax. No candles. No flame.", BRX = DKX.boots[0] + 116 * .56, BRY = DKX.boots[1] - 274 * .56;
SC.wax = (t, s) => { const e = eio((t - s.t0) / 1.0), cam = lc3(CAMD, CAMX, e), dn = eo((t - s.t0 - .3) / .8);
  return trayView(t, { board: { glow: 2 }, kit: { nowax: 1 }, front: TF(BRX, BRY - 34 - (1 - dn) * 560, .62, holdDown(waxBlock(), 62, .7)) }, cam)
    + finePrint(t, s.t0 + .15, WAXP, 440, 196) + sPip(t) + sBasil(t) + sMomo(t) + HUD(t); };
SC.waxans = (t, s) => { const b = "f905", tk = MK("tick3"), hb = HAS(b);
  return trayView(t, { board: { glow: ticked(2, t) ? -1 : 2 }, boots: { l: { wet: 1 }, r: { wax: 1 } }, front: TF(BRX, BRY + 152 * .56, .5, bead(22)) }, CAMX)
    + (hb ? buddy("pip", 104, 1064, 160, t, { aura: true, in: s.t0 + .1, poses: [[s.t0, "surprised"], [LT(b) - .12, "sit"], [LE(b) + .1, "pointing"]], nohop: true }) + say(b, 330, 800, t, { size: 44, tail: -150, maxW: 520 }) : sPip(t))
    + (t >= tk ? TF(gx(CAMX, DKX.board[0]), gy(CAMX, DKX.board[1] - 250), spring(t, tk, .4), tpill(0, 0, "All 3 tests: done!", 38, GOODC, "#fff", { w: 700 })) : "") + sMomo(t) + HUD(t); };

/* 10 · Mark Sentence 2: wax (Basil); the treatment strip (3.14) */
SC.mark2 = (t, s) => { const k = spring(t, s.t0 + .4, .5); return markScene(t, s, { id: "f1002", sayId: "f1001", who: "basil", n: "2 of 2", text: "Fabric absorbs water. However, it can be made waterproof by applying a layer of wax over it.", keys: ["absorbs", "water.", "made", "waterproof", "layer", "wax"], size: 60, x: 580, w: 980, y: 210, footer: FOOT,
  extra: TF(940, 1070, .66 * k, bootFront({ wet: 1, id: "m1" })) + TF(1280, 1070, .66 * k, bootFront({ wax: 1, id: "m2" }) + TF(0, -128, 1, bead(26, .5 * Math.sin(t * 3))))
    + OP(k, tpill(760, 1000, "plain: soaks in", 34, WEAKC, "#fff", { w: 700 }) + tpill(1500, 1000, "with wax: rolls off", 34, GOODC, "#fff", { w: 700 })) }); };
SC.treated = (t, s) => { const L = "f1003", e1 = eio((t - s.t0 - .4) / .8), e2 = eio((t - s.t0 - 1.1) / .8), b0 = [DKX.boots[0] - 116 * .56, DKX.boots[1] - 7], b1 = [BRX, DKX.boots[1] - 7], g = [TRX.g - 60, TRX.y - 30], bb = [TRX.b + 122, TRX.y - 30];
  const pw = [lerp(b1[0], g[0], e1), lerp(b1[1], g[1], e1)], pp = [lerp(b0[0], bb[0], e2), lerp(b0[1], bb[1], e2)];
  return trayView(t, { boots: { l: null, r: null }, shoe: [TRS[0] - 26, TRS[1], 1, 1], items: (e1 > 0 && e1 < 1 ? dust(pw[0], pw[1], e1, .8) : "") + (e2 > 0 && e2 < 1 ? dust(pp[0], pp[1], e2, .8) : "") + TF(pp[0], pp[1], .6, bootFront({ wet: 1, id: "t1" })) + TF(pw[0], pw[1], .6, bootFront({ wax: 1, id: "t2" })) + (e1 >= 1 ? TF(g[0], g[1] - 68, spring(t, s.t0 + 1.3, .4), bead(13)) : "") }, CAMD)
    + bookCaption(t, L, "The physical property of a material can change", 140, { size: 48, keys: ["change"] }) + bookCaption(t, L, "according to how the material is treated.", 235, { size: 48, off: 8, keys: ["how", "treated."] })
    + OP(ramp(t, LE(L) - .4, .3), TF(960, 330, 1, tpill(0, 0, "treated = wax was put on it", 34, "#fff", P.ink, { w: 600 })))
    + buddy("basil", 150, 1062, 190, t, { aura: true, in: s.t0 + .2, poses: [[s.t0, "sit"], [s.t0 + 1.3, "cheer"]] }) + sMomo(t) + HUD(t); };

/* 11 · Showdown: Basil's notes (double points) */
const NOTES = [1090, 1068, .9];
const showBack = (t) => deckView(t, { coat: false, shoe: false, boots: false, kit: false, board: false }, CAMD) + `<rect width="1920" height="1080" fill="${P.night}" opacity=".3"/>`;
SC.show = (t, s) => { const a = "f1101", b = "f1102", r0 = MK("ring0_show"), bell = MK("bell_show"), rs = ringState(t, r0, 6);
  const tr = [W(a, "one"), W(a, "two"), W(a, "three")], tcn = [W(b, "one", 1), W(b, "two"), W(b, "three")], tP = LT("f1104"), tM = LT("f1105"), tO = LT("f1106") - .1;
  const lit = [0, 1, 2].map((i) => t < LT(b) ? (t >= tr[i] - .1 && t < (tr[i + 1] || LE(a)) - .1 ? 1 : 0) : 0), badge = [0, 1, 2].map((i) => Math.max(pulse(t, tcn[i], .04, .5), t >= r0 && t < bell ? (Math.floor((t - r0) / .5) % 3 === i ? .5 + .5 * rs.tick : 0) : 0));
  const nf = t >= tcn[2] - .1 ? 3 : t >= tcn[1] - .1 ? 2 : 1, ringOn = t >= tcn[0] - .3 && t < bell + .8, RX = 235, RY = 560;
  return showBack(t) + TF(NOTES[0], NOTES[1], NOTES[2], basilNotes(t, { lit, badge, x: spring(t, tP + .5, .4) }))
    + buddy("basil", 1750, 1060, 230, t, { aura: true, flip: true, in: s.t0 + .1, poses: [[s.t0, "cheer"], [LT(a) - .12, "sit"], [LE(a) + .2, "arms_crossed"], [tO, "oops"]], nohop: true }) + say("f1106", 1640, 700, t, { size: 46, tail: 100, maxW: 300 })
    + (ringOn ? OP(1 - ss(bell + .5, bell + .8, t), TF(RX, RY, spring(t, tcn[0] - .3, .4), `<g transform="translate(${-RX} ${-RY})">${ringTimer(RX, RY, t < r0 ? 1 : rs.frac, t < r0 ? 6 : rs.secs, t, { R: 128, sw: 22, tick: rs.tick, shut: pulse(t, bell, .01, .6), inner: TF(RX, RY + 60, .62, countHand(nf)) })}</g>`) + youPill(RX, RY - 178, 1.0) + tpill(RX, RY + 222, "line 1, 2 or 3?", 30, P.ink, "#fff")) : "")
    + (t >= bell + .9 ? buddy("pip", 150, 1062, 200, t, { aura: true, in: bell + .9, poses: [[bell + .9, "thinking"], [tP - .12, "sit"], [LE("f1104") + .1, "pointing"]] }) + pickNum("pip", 290, 990, t, tP - .1, "2") + buddy("momo", 470, 1062, 180, t, { aura: true, in: bell + 1.0, poses: [[bell + 1, "thinking"], [tM - .12, "sit"], [LE("f1105") + .1, "cheer"]], nohop: true }) + pickNum("momo", 590, 990, t, tM - .1, "2")
      + say("f1104", 330, 700, t, { size: 40, tail: -130, maxW: 500 }) + say("f1105", 500, 740, t, { size: 46, tail: -20, maxW: 300 }) : "")
    + stamp(t, LT("f1103") - .08, 700, 420) + bellIcon(t, r0) + HUD(t); };
SC.fix = (t, s) => { const a = "f1107", c = "f1108", rub = ss(s.t0 + .2, s.t0 + .7, t), wr = ss(s.t0 + .7, s.t0 + 2.0, t), tT = W(a, "waterproof") - .1, tc = W(c, "two") - .1, tAll = W(a, "all") - .1;
  return showBack(t) + TF(NOTES[0] + 190, NOTES[1], NOTES[2], basilNotes(t, { fixing: 1, rub, write: wr, x: 1 - rub, tick: spring(t, s.t0 + 2.1, .45) }))
    + (t >= tT ? TF(480, 300, spring(t, tT, .45), `<g transform="rotate(-2) scale(.92)"><g filter="url(#drop)"><rect x="-430" y="-110" width="860" height="220" rx="30" fill="url(#gPaper)" stroke="${P.sun}" stroke-width="8"/></g>${T(0, -22, "Waterproof =", 60, P.ink)}${T(0, 62, `does not absorb water <tspan fill="#1F8A4C" font-size="${n2(60 * (1 + .12 * pulse(t, tAll, .05, .6)))}">AT ALL</tspan>`, 54, P.ink)}</g>`) : "")
    + buddy("basil", 200, 1060, 250, t, { aura: true, poses: [[s.t0, "oops"], [s.t0 + 2.2, "sit"], [tc, "cheer"]], nohop: true }) + coin(t, tc, 480, 600, "+2", "if you showed two fingers") + HUD(t); };

/* 12 · the chant: call and response (common.js chantScene); the board OUR 3 WATER TESTS stands beside the buddies; each line's picture flashes */
const chIcon = [(t) => TF(-34, 4, .9, blockW()) + TF(34, 4, .9, blockM()), (t) => `<g transform="scale(.3)">${shipCard(t, 400, 300, "ch")}</g>`, (t) => `<rect x="-52" y="6" width="104" height="30" rx="10" fill="url(#wCoat)" stroke="#C98A0A" stroke-width="4"/><g transform="translate(0 -6)">${bead(18)}</g>`];
SC.chant = (t, s) => chantScene(t, s, "c1003", { sayId: "u1002", size: 54, x: 930, board: (tt, flash) => TF(206, 1066, .4, board3(tt, { glow: -1 }))
  + flash.map((f, i) => TF(150, 312 + i * 150, 1.05 + .35 * f, `<g opacity="${n2(.5 + .5 * Math.min(1, f * 2))}"><circle r="66" fill="${f > .1 ? P.sun : "#FFF8EA"}"/><circle r="58" fill="#FFF8EA"/>${chIcon[i](tt)}</g>`)).join("") });

/* 13 · score hand, the snail */
SC.final = (t, s) => { const L = "f1301"; return finalScene(t, s, L, 1, [[s.t0, null, 1], [W(L, "three") - .1, null, 3]]); };
SC.liz = (t, s) => { const L = "f1302", tq = W(L, "it") - .1; return lizReveal(t, s, L, trayView(t, { wave: ss(tq - .2, tq + .2, t), boots: { l: { wet: 1 }, r: { wax: 1 } } }), SNL[0], SNL[1] - 22, tq, "It was on the big flower pot!", 20, 150, 52, 2.0); };

/* 14 · the dare for Episode 11: light. The rain stops; three picture boards slide in low, each with a small torch standing in front of it */
const DRX = [760, 1080, 1400];
SC.dare = (t, s) => { const a = "f1401", b = "f1402", tQ = W(a, "which") - .15, tc = [W(a, "one") - .1, W(a, "two") - .1, W(a, "three") - .1], tL = W(a, "lock") - .1, rn = 1 - ss(s.t0, s.t0 + 1.6, t), sun = ss(s.t0 + .8, s.t0 + 2.6, t), hb = HAS(b);
  const brd = [["dClear", "clear glass"], ["dFrost", "frosted glass"], ["dDoor", "a wooden door"]].map(([p, lab], i) => { const t0 = s.t0 + .5 + i * .3, [x, d] = slideX(t, t0, .7, 2500, DRX[i], 800); return t < t0 ? "" : d + picBoard(p, x, 800, 1, { sc: .72, lab, size: 44, id: "dr" + i }) + TF(x + 96, 846, .8, torch()); }).join("");
  return deckView(t, { rain: rn, sun, coat: false, shoe: false, boots: false, kit: false, board: false, items: brd }, CAMD) + `<rect width="1920" height="1080" fill="#FFF8EA" opacity=".18"/>`
    + (t >= tQ ? TF(1090, 404, spring(t, tQ, .5) * (1 + .05 * Math.sin(t * 4)), `<g filter="url(#dropS)"><circle r="50" fill="url(#gSun)"/></g>${T(0, 26, "?", 78, P.ink)}`) : "")
    + ["Clear glass", "Frosted glass", "A wooden door"].map((txt, i) => TF(gx(CAMD, DRX[i]), 968, .6 * spring(t, tc[i], .45), ansCard(i + 1, txt, { w: 430, h: 290, size: 50, pulse: Math.max(pulse(t, tc[i], .04, .6), t >= tL ? (Math.floor((t - tL) / .5) % 3 === i ? .8 : 0) : 0) }))).join("")
    + TF(1080, 100, slamK(t - s.t0, .15), `<g transform="rotate(-2)"><g filter="url(#drop)"><rect x="-150" y="-44" width="300" height="88" rx="44" fill="${P.coral}"/><rect x="-142" y="-36" width="284" height="72" rx="36" fill="none" stroke="#fff" stroke-width="5"/></g>${T(0, 20, "NEXT", 54, "#fff", { ls: 8 })}</g>`)
    + (t >= W(a, "light") - .1 ? TF(1080, 194, spring(t, W(a, "light") - .1, .45), tpill(0, 0, "Light!", 68, P.ink, "#fff", { w: 700 })) : "") + (t >= tL ? TF(1080, 276, spring(t, tL, .45) * (1 + .03 * Math.sin(t * 8)), tpill(0, 0, "Lock in your answer!", 40, P.sun, P.ink, { w: 700 })) : "")
    + buddy("basil", 290, 1056, 300, t, { aura: true, in: s.t0 + .1, poses: hb ? [[s.t0, "sit"], [tQ, "arms_crossed"], [LT(b) - .12, "surprised"], [LE(b) + .3, "sit"]] : [[s.t0, "sit"], [tQ, "surprised"]], nohop: true }) + (hb ? say(b, 320, 600, t, { size: 42, tail: -40, maxW: 440 }) : "") + HUD(t); };

/* 16 · "Now you know!": the two trays WATERPROOF and NOT WATERPROOF (the raincoat on one, the wet shoe on the other) between the buddies */
SC.nyk = (t, s) => nykScene(t, s, TF(800, 1046, .8, TF(-215, -40, 1, trayG(400)) + TF(215, -40, 1, trayB(400)) + TF(-215, -70, .56, coatStand()) + TF(215, -70, .5, shoeWet(1))), { bx: [200, 1715, 1375], hx: 470 });
})(); }
