// p1.js: PART 1, "We Sealed Bread in a Bag for 10 Days. What GREW?": fungi (how they get food, spores, useful or harmful). Segments 1-15 of
// ../p3_ep07_script.md. One SC.<scene> per timeline scene (tl_p1.json); every time is a line, a word or a mark of the timeline (the sound uses
// the same cues). The set and the props: kitchen.js, things.js; the spore journey: shrink.js; the shared routines: common.js.
if (PART === 1) { (() => {
const TR = KT.tray, L0 = () => MK("lapse0"), DS = window.DAYSTEP || .85;
const sPip = (t, o = {}) => buddy("pip", 120, 1064, 165, t, { aura: true, tag: false, ...o }), sBasil = (t, o = {}) => buddy("basil", 318, 1066, 150, t, { aura: true, tag: false, ...o }), sMomo = (t, o = {}) => buddy("momo", 1838, 1064, 150, t, { aura: true, tag: false, flip: true, ...o });
const boards = (g1 = 0, g2 = 0, at1 = KT.b1, at2 = KT.b2) => TF(at1[0], at1[1], at1[2], dareBoard(0, 1, g1)) + TF(at2[0], at2[1], at2[2], dareBoard(1, 1, g2));
const tagAt = (t, t0, at, txt, cam = [1, 960, 540]) => popTag(t, t0, kx(cam, at[0]), ky(cam, at[1] + 22), txt, 30, "#fff", P.ink);
const D10 = { day: 10, drops: 1 };
const ringClip = (inner) => `<clipPath id="rgc"><circle cx="430" cy="470" r="172"/></clipPath><g clip-path="url(#rgc)">${inner}</g>`;

/* ============ 1 · the silent cold open: a kitchen table in an HDB flat ============ */
// the thumbnail's frame (thumb_still.js "&thumb"): the sealed Day 10 bag large on its tray, the DAY 10 pill, Momo surprised on the left
const THUMB1 = (t) => closeBg() + TF(700, 560, 1.22, tray(D10)) + TF(1010, 1010, 1.25, dayPill(t, 10)) + buddy("momo", 205, 640, 290, t, { aura: true, tag: false, pose: "surprised", still: true }) + logo(t);
SC.cold = (t, s) => { if (location.search.includes("thumb")) return THUMB1(t); const tb = MK("coldBoards"), e = eio(t / 5.6), cam = [lerp(1.16, 1, e), lerp(860, 960, e), lerp(640, 540, e)];
  const [x1, d1] = slideX(t, tb, .7, -260, KT.b1[0], KT.b1[1]), [x2, d2] = slideX(t, tb + .45, .7, 2200, KT.b2[0], KT.b2[1]), tp = tb + 1.4;
  return kitchenView(t, { day: 1, tray: { into: 0, seal: 0 }, boards: d1 + d2 + (t >= tb ? boards(0, 0, [x1, KT.b1[1], KT.b1[2]], [x2, KT.b2[1], KT.b2[2]]) : "") }, cam)
    + tagAt(t, tb + .8, KT.b1, "mould", cam) + tagAt(t, tb + 1.2, KT.b2, "yeast", cam)
    + sPip(t, { in: tp, poses: [[tp, "waving"], [tp + 1.6, "sit"]], wave: true }) + sBasil(t, { in: tp + .12, poses: [[tp + .12, "surprised"]], look: 4 }) + sMomo(t, { in: tp + .24, poses: [[tp + .24, "pointing"], [tp + 1.7, "sit"]] })
    + OP(ramp(t, .3, .4) * (1 - ramp(t, s.t1 - .5, .3)), lowerPill(60, 60, "A kitchen in an HDB flat,", "Singapore")); };

/* ============ 2 · the callback to Episode 6's dare ============ */
SC.callback = (t, s) => { const a = "g201", b = "g202", tM = W(a, "mould") - .1, tY = W(a, "yeast") - .1, tF = W(a, "fungi") - .1, tB = LT(b) - .5, big = eio((t - s.t0) / .6) * (1 - eio((t - tB) / .5));
  const at1 = [lerp(KT.b1[0], 440, big), lerp(KT.b1[1], 800, big), lerp(.5, .78, big)], at2 = [lerp(KT.b2[0], 1470, big), lerp(KT.b2[1], 790, big), lerp(.5, .78, big)];
  const g1 = pulse(t, tM, .06, 1.2), g2 = pulse(t, tY, .06, 1.2), sl = bagPt(TR, 0, 268), bg_ = bagPt(TR, 0, 0);
  const gS = pulse(t, W(b, "slice") - .1, .08, .9), gB = pulse(t, W(b, "bag") - .1, .08, .9), gD = pulse(t, W(b, "days") - .1, .08, 1.1);
  return kitchenView(t, { day: 1, dayGlow: gD, tray: { into: 0, seal: 0 }, boards: boards(g1, g2, at1, at2),
      under: "", front: glowDisc(sl[0], sl[1], 70, gS * .8) + glowDisc(bg_[0], bg_[1], 80, gB * .8) })
    + OP(big, tagAt(t, s.t0, [at1[0], at1[1]], "mould") + tagAt(t, s.t0, [at2[0], at2[1]], "yeast"))
    + (t >= tM && t < tB + .3 ? OP(1 - ramp(t, tB, .25), TF(250, 930, .6 * spring(t, tM, .45), ansCard(1, "Mould", { pulse: g1, size: 54 })) + (t >= tY ? TF(1640, 926, .6 * spring(t, tY, .45), ansCard(2, "Yeast", { pulse: g2, size: 54 })) : "") + popTag(t, tF, 960, 610, "Both are fungi!", 54)) : "")
    + sPip(t, { out: s.t0 + .1 }) + sBasil(t, { poses: [[s.t0, "sit"]], out: s.t0 + .15 }) + sMomo(t, { out: s.t0 + .2 }) + (t > tB + .2 ? sMomo(t, { in: tB + .2 }) : "")
    + buddy("basil", 212, 1060, 300, t, { aura: true, in: tB, poses: [[tB, "cheer"], [LT(b) - .12, "sit"], [LE(b) + .1, "cheer"]], nohop: true }) + say(b, 560, 600, t, { size: 46, tail: -220, maxW: 560 }) + HUD(t); };
SC.title = (t, s) => { const u = t - s.t0, k = slamK(u, .02);
  return kitchenView(t, { day: 1, tray: { into: 0, seal: 0 }, boards: boards() }, [1.12 - .04 * clamp(u / 2), 900, 640]) + `<rect width="1920" height="1080" fill="${P.night}" opacity="${n2(.68 * clamp(u / .15))}"/>`
    + slamLine(390, "BREAD IN A BAG", 170, "#fff", k, 6) + slamLine(600, "10 DAYS. WHAT GREW?", 150, P.sun, k, 4)
    + (u > .9 ? TF(960, 770, spring(t, s.t0 + .9, .45), tpill(0, 0, "Hold on to your answer!", 46, P.ink, "#fff", { w: 600 })) : "") + OP(clamp((u - .2) / .3), logo(t)); };

/* ============ 3-4 · the game, today's goals (Momo reads them), the countdown ============ */
SC.game = (t, s) => gameScene(t, s, "g301", true, TF(26, 66, 1.5, cuteSnail(t)));
const icoFood = (t) => `<g transform="translate(0 6) scale(.36)">${slice()}<g fill="none" stroke="#fff" stroke-width="9" stroke-linecap="round"><path d="M0 0 q-40 -30 -70 -80 M0 0 q50 -20 80 -70 M0 0 q-50 30 -80 80 M0 0 q40 40 70 90 M0 0 q-70 0 -90 -10 M0 0 q60 10 92 20"/></g><circle r="20" fill="#7C9A88" stroke="#56705F" stroke-width="5"/></g>`;
const icoSpread = (t) => `<g transform="translate(0 44) scale(.3)">${bigMushroom()}</g>` + TF(0, -8, .34, sporeDust(1.5 + (t % 3), .5, 36));
const icoTrays = () => TF(-74, 44, .34, sortTray(0, 300, { size: 46 })) + TF(74, 44, .34, sortTray(1, 300, { size: 46 }));
SC.goals = (t, s) => goals3(t, s, [["How fungi get their food", icoFood(t)], ["How fungi spread", icoSpread(t)], ["Useful or harmful fungi", icoTrays()]], "momo", ["g401", "g402", "g403", "g404"]);

/* ============ 5 · Day 1: seal the bag ============ */
const CT = [900, 640, 1.0];     // the tray in the close view
SC.day1 = (t, s) => { const L = "g501", tS = W(L, "slice") - .15, tZ = W(L, "seal") - .05, into = clamp((t - tS) / 1.1), seal = t < tZ ? 0 : eio((t - tZ) / .6), z = bagPt(CT, 150, 144), zoom = lerp(1.06, 1, eo((t - s.t0) / 1.2));
  return CAM(closeBg() + TF(1560, 560, .95, doughBowl(0)) + TF(1740, 572, .72, yeastPacket()) + TF(CT[0], CT[1], CT[2], tray({ into, seal, glow: pulse(t, tZ + .5, .5, .9) }))
      + TF(300, 930, 1.3, dayPill(t, 1, -9, pulse(t, W(L, "one") - .1, .08, .8))), zoom, 900, 600)
    + popTag(t, s.t0 + .6, 1640, 640, "bread dough + yeast", 32, "#fff", P.ink) + lineTag(t, tZ + .6, 1500, 880, z[0], z[1], "sealed", 44, P.sun, P.ink)
    + finePrint(t, s.t0 + .3, "An adult helps. The bag is never opened. Wash your hands.", 470, 150) + HUD(t); };

/* ============ 6 · ten days, and HOLD ON! ============ */
// the time-lapse: DAY d shows from lapse0 + (d - 2) x DAYSTEP; one night between two days; the lizard sits on the fridge during two of the nights
const CAMD = [1.45, 690, 700];
const lizOn = (t) => { const a = (k) => ss(L0() + k * DS, L0() + k * DS + .15, t) * (1 - ss(L0() + (k + 1.7) * DS, L0() + (k + 1.7) * DS + .15, t)); return Math.max(a(2.0), a(6.0)); };
SC.days = (t, s) => { const u = (t - L0()) / DS, d = Math.min(10, 2 + Math.floor(u + 1e-6)), dc = Math.min(10, 2 + u), night = d >= 10 ? 0 : .5 - .5 * Math.cos(2 * Math.PI * u), t4 = L0() + 2 * DS;
  return kitchenView(t, { night, day: d, dayFlip: L0() + (d - 2) * DS, snail: lizOn(t), tray: { day: dc, drops: ss(8.6, 10, dc) } }, CAMD)
    + buddy("pip", 130, 1064, 190, t, { aura: true, tag: false, in: s.t0 + .1, poses: [[s.t0, "sit"], [t4 + .3, "surprised"]], look: 5 }) + buddy("basil", 1590, 1066, 180, t, { aura: true, tag: false, flip: true, in: s.t0 + .2, poses: [[s.t0, "sit"], [t4 + .45, "surprised"]], look: 5 })
    + buddy("momo", 1800, 1064, 190, t, { aura: true, tag: false, flip: true, in: s.t0 + .3, poses: [[s.t0, "sit"], [t4 + .6, "surprised"]], look: 6 }) + speeded(t, s.t0 + .1, s.t1 - .3, 560, 62) + HUD(t); };
const HT = [860, 660, 1.0], RG = [300, 520];
const holdView = (t, o = {}) => closeBg() + TF(1318, 610, 1, dayPill(t, 10)) + TF(HT[0], HT[1], HT[2], tray({ ...D10, glow: o.glow || 0 }));
SC.holdon = (t, s) => { const a = "g602", b = "g603", c = "g604", d = "g605", r0 = MK("ring0_1"), bell = MK("bell_1"), rs = ringState(t, r0, 5), tX = W(b, "cross") - .15, tH = W(b, "hold") - .1, tOne = W(c, "one") - .1, tN = W(c, "never") - .1, tBg = W(c, "bag") - .1, ring = t >= tX && t < bell + .8;
  return holdView(t, { glow: pulse(t, tBg, .1, 1.6) })
    + buddy("momo", 1640, 1060, 360, t, { aura: true, flip: true, in: s.t0 + .1, poses: [[s.t0, "pointing"], [LT(a) - .12, "sit"], [LE(a) + .15, "pointing"], [tH, "surprised"], [tOne, "sit"], [LT(d) - .12, "oops"], [LE(d) + .3, "sit"]], look: t < tH ? 7 : 0, nohop: true })
    + say(a, 1420, 300, t, { size: 44, tail: 200, x: true, maxW: 560 }) + say(d, 1560, 440, t, { size: 50, tail: 60 })
    + (ring ? OP(1 - ss(bell + .5, bell + .8, t), TF(RG[0], RG[1], spring(t, tX, .4), `<g transform="translate(${-RG[0]} ${-RG[1]})">${ringTimer(RG[0], RG[1], t < r0 ? 1 : rs.frac, t < r0 ? 5 : rs.secs, t, { R: 128, sw: 22, tick: rs.tick, shut: pulse(t, bell, .01, .6), inner: TF(RG[0], RG[1] + 6, .5, crossedArms()) })}</g>`) + youPill(RG[0], RG[1] - 178, 1.0) + tpill(RG[0], RG[1] + 220, "cross your arms", 30, P.ink, "#fff")) : "")
    + standCard(t, tN, 300, 960, "Never touch or sniff mould.", "The bag stays shut.", { maxW: 400 })
    + stamp(t, tH, 900, 400, "HOLD ON!") + bellIcon(t, r0) + coin(t, tOne, 300, 330, "+1", "arms crossed") + HUD(t); };
SCORE.push([W("g604", "one") - .1, 1, 0]);

/* ============ 7 · what the fuzzy patches are ============ */
SC.patches = (t, s) => { const a = "g702", b = "g703", c = "g704", tG = W(a, "grew") - .1, t0 = LT(a) + .1, out = ss(LT(c) - .5, LT(c) - .1, t);
  return closeBg() + TF(1560, 610, 1, dayPill(t, 10)) + TF(820, 690, .92, tray(D10))
    + OP(1 - out, [4, 6, 10].map((d, i) => { const k = spring(t, t0 + i * .35, .45); return k < .02 ? "" : TF(480 + i * 300, 190, k * (.74 + i * .1), dayFrame(d)); }).join("") + popTag(t, tG, 1430, 190, "It grew!", 56))
    + strip(t, b, "Bread mould is a fungus that grows on bread.", 1000, { size: 50, t1: LT(c) - .3 })
    + wordBox(t, 960, 190, "one fungus", "many fungi", W(c, "fungus"), W(c, "fungi"), LT(c) - .35) + HUD(t); };

/* ============ 8 · Round 1: how does the mould get its food? ============ */
const bagRing = () => ringClip(`<rect x="250" y="290" width="360" height="360" fill="url(#kTable)"/>` + TF(430, 478, .86, bagAlone(10)));
SC.r1 = (t, s) => { const L = "g801", tN = W(L, "nobody") - .1;
  return lockN(t, { cards: ["It makes its own food", "From the bread", "It needs no food"], q: "How does the mould get its food?", tq: W(L, "how") - .1, tc: [W(L, "one", 1), W(L, "two"), W(L, "three")], ring0: MK("ring0_2"), dur: 5, lock: "g802", obj: bagRing,
    labels: (tt) => popTag(tt, tN, 430, 250, "Nobody fed it!", 40),
    picks: [{ who: "pip", id: "g803", word: "3", x: true }, { who: "basil", id: "g804", word: "2" }, { who: "momo", tf: MK("momoFlip"), word: "2" }],
    react: [[LE("g803") + .1, "pip", "thinking"], [LE("g804") + .1, "basil", "cheer"], [MK("momoFlip") + .2, "momo", "cheer"]] }); };

/* ============ 9 · BE A SPORE: the dive (the journey itself is in shrink.js) ============ */
SC.waitw = (t, s) => { const L = "g901", dive = ei((t - (s.t1 - .7)) / .7), sl = bagPt(TR, 0, 268), cam = [1.12 + 5 * dive, lerp(900, sl[0], dive), lerp(640, sl[1], dive)], tP = W(L, "be") - .2, tf = s.t0 + .35;
  return kitchenView(t, { day: t < tf ? 10 : 1, dayFlip: tf, dayGlow: pulse(t, tf + .1, .05, .7), tray: t < tf ? D10 : { into: 0, seal: 0 }, rise: t < tf ? 1 : 0 }, cam)
    + OP(1 - dive, sPip(t, { poses: [[s.t0, "sit"], [tP, "pointing"]] }) + sMomo(t, { poses: [[s.t0, "sit"], [tP + .2, "cheer"]], nohop: true })
      + (t >= tP ? TF(960, 230, spring(t, tP, .45), tpill(0, 0, "Be a spore!", 74, P.sun, P.ink, { w: 700 })) : "") + HUD(t))
    + wipe(t, s.t1, "#FFF6E0", kx(cam, sl[0]), ky(cam, sl[1])); };

/* ============ 10 · the reveal, and Mark Sentence 1 ============ */
const CAMR = [1.15, 800, 660];
SC.reveal = (t, s) => { const L = "g1001", tA = W(L, "two") - .1, lit = t >= tA ? spring(t, tA, .45) : 0, e = eo((t - s.t0) / 1.1), sp = bagPt(TR, 0, 0), cam = [lerp(3.4, CAMR[0], e), lerp(sp[0], CAMR[1], e), lerp(sp[1], CAMR[2], e)];
  return kitchenView(t, { day: 10, tray: D10, rise: 1, front: TF(486, 960, .66, ansCard(2, "From the bread", { lit, size: 50 })) }, cam)
    + buddy("pip", 150, 1062, 200, t, { aura: true, in: s.t0 + .3, poses: [[s.t0, "sit"], [tA, "surprised"], [tA + 1.3, "sit"]], jump: [[tA + 1.5, 14]] }) + buddy("basil", 1560, 1064, 200, t, { aura: true, flip: true, in: s.t0 + .4, poses: [[s.t0, "sit"], [tA + .1, "cheer"]] })
    + buddy("momo", 1790, 1062, 200, t, { aura: true, flip: true, in: s.t0 + .5, poses: [[s.t0, "sit"], [tA + .2, "cheer"]] }) + wipe(t, s.t0, "#FFF6E0") + HUD(t); };
// three small pictures beside the card: the patch on the bread, the shiny film, the dots flowing in
const miniDisc = (x, y, lit, inner, id) => `<g transform="translate(${x} ${y}) scale(${n2(1 + .1 * lit)})">${lit > .05 ? `<circle r="112" fill="${P.sun}" opacity="${n2(.9 * Math.min(1, lit))}" filter="url(#b10)"/>` : ""}<g filter="url(#dropS)"><circle r="100" fill="${P.paper}"/></g><clipPath id="md${id}"><circle r="90"/></clipPath><g clip-path="url(#md${id})"><rect x="-100" y="-100" width="200" height="200" fill="url(#kCrumb)"/>${inner}</g><circle r="90" fill="none" stroke="#E3C9A8" stroke-width="5"/></g>`;
const thr = `<g fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round"><path d="M-90 30 Q-30 10 0 20 Q40 30 90 0 M0 20 Q10 -30 -20 -80 M0 20 Q20 60 0 96 M-30 12 Q-50 -30 -80 -50 M40 26 Q60 60 84 70"/></g><g fill="none" stroke="#B9A77E" stroke-width="2" opacity=".6"><path d="M-90 34 Q-30 14 0 24 Q40 34 90 4"/></g>`;
const miniFilm = (t) => `<ellipse cx="0" cy="20" rx="84" ry="50" fill="#DDF4FF" opacity=".7" stroke="#fff" stroke-width="4"/>${thr}<path d="M-50 -6 q24 -18 60 -14" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round" opacity="${n2(.6 + .4 * Math.sin(t * 3))}"/>`;
const miniDots = (t) => thr + Array.from({ length: 9 }, (_, i) => { const u = ((t * .5 + i / 9) % 1), an = i * 2.4, r = 78 * (1 - u); return `<circle cx="${n2(Math.cos(an) * r)}" cy="${n2(20 + Math.sin(an) * r * .8)}" r="${n2(7 * (1 - .5 * u))}" fill="#FFF3C4" stroke="#E0BC6A" stroke-width="2.5"/>`; }).join("");
const M1TXT = "Fungi are living things that do not make their own food. Fungi grow on another object. They produce a substance to break down the other object into simpler substances and absorb them as food.";
SC.mark1 = (t, s) => { const L = "g1003", tG = W(L, "grow") - .1, tS = W(L, "substance") - .1, tA = W(L, "absorb") - .1, lt = (q) => t < q ? 0 : .35 + .65 * pulse(t, q, .05, 1.2), tc = W("g1004", "one") - .1;
  const under = miniDisc(1730, 330, lt(tG), `<g transform="scale(.62)">${slice()}${mould(10)}</g>`, "a") + miniDisc(1730, 570, lt(tS), miniFilm(t), "b") + miniDisc(1730, 810, lt(tA), miniDots(t), "c");
  return markScene(t, s, { id: L, sayId: "g1002", who: "basil", n: "1 of 2", text: M1TXT, keys: ["do", "not", "make", "their", "own", "food.", "grow", "on", "another", "object.", "substance", "simpler", "substances", "absorb"], noKey: [M1TXT.split(" ").length - 1, M1TXT.split(" ").lastIndexOf("object")], size: 52, y: 196, x: 590, w: 960, extra: under + coin(t, tc, 1400, 1010, "+1", "if you showed two fingers") }); };
SCORE.push([W("g1004", "one") - .1, 2, 1]);
// the small tag under the big ABSORB key word (drawn over the key-word pop)
window.OVER2 = (t, s) => { const k = MK("kw_absorb"); return t >= k + .25 && t < k + 2.0 ? TF(960, 740, spring(t, k + .25, .4) * (1 - ramp(t, k + 1.85, .15)), tpill(0, 0, "absorb = take in", 46, "#fff", P.ink, { w: 700 })) : ""; };

/* ============ 11 · a mushroom: cap, stalk, gills, spores ============ */
const MB = [800, 990], MW = 720, MH = 600, MC = [MB[0], MB[1] - MH / 2 - 30];   // the board's base; its picture's middle
SC.mushroom = (t, s) => { const a = "g1101", b = "g1102", c = "g1103", tC = W(a, "cap") - .1, tSt = W(a, "stalk") - .1, tU = W(a, "under") - .15, tGi = W(a, "gills") - .1, tD = MK("gillsdust"), tW = W(c, "wind") - .25, tDi = W(c, "dispersed") - .1;
  const [bx, dd, sq] = slideX(t, s.t0 + .1, .65, -500, MB[0], MB[1]), fl = clamp((t - tU) / .4), under = fl > .5, sx = Math.abs(Math.cos(Math.PI * fl)), wind = ss(tW, tW + 1.2, t), lo = 1 - ss(tU - .1, tU + .1, t);
  const pic = under ? TF(0, -40, 1.12, mushroomUnder()) : TF(0, 236, 1.12, bigMushroom());
  let streaks = ""; if (t > tW) for (let i = 0; i < 2; i++) { const u = ((t - tW) * .55 + i * .5) % 1; streaks += `<path d="M${n2(lerp(820, 1700, u))} ${n2(560 + i * 90 - 60 * u)} q90 -50 180 -10 q60 26 110 -20" fill="none" stroke="#fff" stroke-width="12" stroke-linecap="round" opacity="${n2(.85 * Math.sin(Math.PI * u))}"/>`; }
  return closeBg() + dd + TF(bx, MB[1], 1, `<g transform="scale(${n2(Math.max(.04, sx))} ${sq})">${board(pic, MW, MH, "mb", { fill: "#EAF3E4" })}</g>`)
    + (t >= s.t0 + .8 ? OP(lo, lab4(360, 440, "cap", MC[0] - 150, MC[1] - 120, spring(t, tC, .4), 44) + lab4(360, 800, "stalk", MC[0] - 50, MC[1] + 130, spring(t, tSt, .4), 44)) : "")
    + (under && fl >= 1 ? lab4(330, 520, "gills", MC[0] - 150, MC[1] - 60, spring(t, tGi, .4), 44) + popTag(t, tGi + .5, 330, 600, "not a fish’s gills: these hold spores", 28, P.ink, "#fff") : "")
    + (t > tD ? TF(MC[0], MC[1] - 30, 1.12, sporeDust(t - tD, wind)) : "") + streaks
    + buddy("basil", 1600, 1060, 340, t, { aura: true, flip: true, in: s.t0 + .3, poses: [[s.t0, "sit"], [tGi + .3, "cheer"], [LT(b) - .12, "sit"], [LE(b) + .1, "cheer"]], nohop: t < LE(b) })
    + say(b, 1560, 470, t, { size: 46, tail: 60, maxW: 440 })
    + strip(t, c, "Mushrooms have spores that are found in gills under the cap. When the wind blows, the spores are dispersed.", 130, { size: 42, maxW: 1240, x: 900, keys: ["dispersed."] })
    + popTag(t, tDi + .4, 1400, 262, "dispersed = spread far and wide", 34, P.ink, "#fff") + HUD(t); };
SC.mark2 = (t, s) => { const L = "g1105", tR = W(L, "spores") - .1, g = t < tR ? 0 : .35 + .65 * pulse(t, tR, .05, 1.2), u = t - s.t0;
  const under = miniDisc(1730, 400, g, `<rect x="-100" y="-100" width="200" height="200" fill="#EAF3E4"/>` + TF(0, 70, .36, bigMushroom()) + TF(0, 30, .3, sporeDust(1 + (u % 3), .3, 40)), "m") + miniDisc(1730, 700, g, `<g transform="scale(.62)">${slice()}${mould(10)}</g>` + TF(0, -10, .4, sporeDust(1.5 + (u % 3), .3, 40).replace(/#7A4A2E/g, "#4E6E5E")), "p");
  return markScene(t, s, { id: L, sayId: "g1104", who: "momo", n: "2 of 2", text: "Fungi can reproduce very quickly through spores.", keys: ["reproduce", "very", "quickly", "spores."], size: 74, y: 250, x: 600, w: 940, extra: under }); };

/* ============ 12 · Round 2: the dare. Useful or harmful? ============ */
SC.r2card = (t, s) => { const u = t - s.t0, k = lerp(2.3, 1, eo(u / .16)) + .05 * wob(u, .16, .4), b = "YOUR ANSWER FROM LAST TIME", w = Math.max(tw("ROUND 2", 200, 700, "Fredoka", 10), tw(b, 54, 700, "Fredoka", 5)) + 160;
  return bg("stage") + `<circle cx="960" cy="540" r="${n2(360 + 500 * eo(u / .7))}" fill="none" stroke="${P.sun}" stroke-width="${n2(24 * (1 - eo(u / .7)))}"/><g transform="translate(960 540) scale(${n2(k)}) rotate(-4)"><g filter="url(#drop)"><rect x="${n2(-w / 2)}" y="-150" width="${n2(w)}" height="370" rx="60" fill="${P.sun}"/></g>${T(0, 70, "ROUND 2", 200, P.ink, { ls: 10 })}${T(0, 170, b, 54, P.ink, { ls: 5 })}</g>` + HUD(t); };
SC.r2 = (t, s) => { const L = "g1201";
  return lockN(t, { cards: ["Mould", "Yeast"], q: "Which fungus is useful?", tq: W(L, "which") - .1, tc: [W(L, "one"), W(L, "two")], ring0: MK("ring0_3"), dur: 3, lock: "g1202", ans: 2, tAns: W("g1205", "yes") - .05,
    obj: () => ringClip(`<rect x="250" y="290" width="360" height="360" fill="#F4EBDA"/>` + TF(344, 470, .42, mouldBread()) + TF(506, 500, .3, yeastLoaf())) + `<path d="M430 300 V640" stroke="#fff" stroke-width="3" stroke-dasharray="6 10" opacity=".8"/>`,
    labels: (tt) => popTag(tt, W(L, "one") - .1, 300, 690, "1 mould", 32, "#fff", P.ink) + popTag(tt, W(L, "two") - .1, 560, 690, "2 yeast", 32, "#fff", P.ink),
    picks: [{ who: "pip", id: "u1203", word: "2" }, { who: "basil", id: "u1203", word: "2" }, { who: "momo", id: "u1203", word: "2" }], react: [[LE("g1204") + .1, "basil", "cheer"]],
    over: (tt) => say("g1204", 960, 620, tt, { size: 44, tail: 0 }) }); };
// the two trays on the table and the four picture boards that hop onto them
const TY = 970, UX = 690, HX = 1640, SLOT = [300, 690, 1080, 1640], CK = 1.3;
const cardPic = (i, t, rise = 0, glow = 0) => i === 0 ? picCardK(TF(0, 110, .7, punnet()), 270, 300, "t0", "#EAF3E4") : i === 1 ? picCardK(TF(-28, 120, .78, doughBowl(rise, { id: "tb" })) + TF(92, 124, .5, yeastPacket(glow)), 270, 300, "t1")
  : i === 2 ? picCardK(TF(0, 0, .5, tempehPic()), 270, 300, "t2") : picCardK(TF(0, 6, .56, bagAlone(10)), 270, 300, "t3", "#F1F4F9");
SC.trays = (t, s) => { const q = "g1206", tI = MK("traysIn"), mk = ["b_mush", "b_dough", "b_tempeh", "b_mould"].map((k) => MK(k) + .35), tc = W("g1213", "one") - .1;
  const [ux, ud] = slideX(t, tI + .05, .5, -700, UX, TY), [hx, hd] = slideX(t, tI + .4, .5, 2400, HX, TY), rise = ss(mk[1] + .9, W("g1210", "rise") + .4, t), tE = W("g1208", "edible") - .1, tNv = W("g1209", "never") - .1;
  let cards = ""; mk.forEach((tl, i) => { if (t < tl - .8) return; const [x, lift, ds, sq] = hopLow(t, tl, i === 3 ? 2100 : -200, SLOT[i], TY - 60); cards += ds + TF(x, TY - 62 - lift, CK, `<g transform="scale(1 ${n2(sq)})">${cardPic(i, t, rise, i === 1 ? pulse(t, W("g1210", "yeast") - .1, .1, 1.5) : 0)}</g>`); });
  const st = (id, txt, o = {}, next) => strip(t, id, txt, 150, { size: 44, maxW: 1180, x: 860, t1: next ? LT(next) - .32 : LE(id) + .6, ...o });
  return closeBg() + ud + hd + (t >= tI ? TF(ux, TY, 1, sortTray(0, 1190)) + TF(hx, TY, 1, sortTray(1, 420)) : "") + cards
    + buddy("pip", 300, 1060, 360, t, { aura: true, in: s.t0 + .05, out: tI - .05, poses: [[s.t0, "thinking"], [LT(q) - .12, "sit"]] }) + say(q, 760, 470, t, { size: 46, tail: -300, x: true, maxW: 600 })
    + st("g1207", "There are some fungi that are useful, while others are harmful to us.", { keys: ["useful,", "harmful"] }, "g1208") + st("g1208", "Edible mushrooms are useful since they are food for us.", { keys: ["useful"], t1: LE("g1209") + .3 })
    + st("g1210", "Yeast is another useful fungus as it is commonly used in baking bread to make the dough rise.", { keys: ["useful"], t1: MK("kw_yeast") - .1 }) + st("g1211", "Tempeh is made with a useful fungus.", { keys: ["useful"] }, "g1212")
    + st("g1212", "Bread mould is an example of harmful fungi. Eating mouldy bread can cause us to fall sick.", { keys: ["harmful"], t1: LT("g1213") - .2 })
    + popTag(t, tE, SLOT[0], 474, "edible = safe to eat", 32, "#fff", P.ink) + (t >= tNv ? TF(SLOT[0] + 60, 400, spring(t, tNv, .45), safeBadge("Never pick wild mushrooms!", 30)) : "")
    + (t >= mk[1] + .6 ? OP(ramp(t, mk[1] + .6, .25), TF(SLOT[1], 474, 1, `<rect x="-196" y="-27" width="392" height="54" rx="27" fill="${P.ink}" opacity=".9"/><path d="M-170 -11 l14 11 l-14 11z M-154 -11 l14 11 l-14 11z" fill="${P.sun}"/>${T(18, 11, "speeded up: about 1 hour", 28, "#fff", { w: 600 })}`)) : "")
    + popTag(t, mk[2] + .3, SLOT[2], 474, "tempeh", 36, "#fff", P.ink) + (t >= mk[3] + .5 ? TF(SLOT[3] + 130, 500, spring(t, mk[3] + .5, .45), tummy(1.1)) : "")
    + coin(t, tc, 1350, 380, "+1", "if you showed two fingers") + HUD(t); };
SCORE.push([W("g1213", "one") - .1, 3, 2]);

/* ============ 13 · score hand, the lizard ============ */
SC.final = (t, s) => { const L = "g1301"; return finalScene(t, s, L, 2, [[s.t0, null, 1], [W(L, "more") - .1, "More than two? You beat the Buddies!", 3], [W(L, "three") - .1, null, 3]]); };
SC.liz = (t, s) => { const L = "g1302"; return lizReveal(t, s, L, kitchenView(t, { night: 1, day: 5, snail: 1, tray: { day: 5 } }), KT.snail[0] - 14, KT.snail[1] - 30, W(L, "is") - .1, "Is a snail a fungus?", 60, 130); };

/* ============ 14 · the cliffhanger: the bag is binned, still shut; hands are washed. But they look clean! ============ */
const CAMC = [1.1, 1180, 640];
SC.cliff = (t, s) => { const L = "g1401", p = "g1402", h = "g1403", tThen = W(L, "then") - .25;
  if (t < tThen) { const tGo = W(L, "bag") - .5, tBin = W(L, "bin") - .1, st = bagPt(TR, 0, 0), u1 = eio((t - tGo - .5) / 1.25), dr = ei((t - (tBin - .3)) / .3), down = eo((t - (tGo - .5)) / .5), lift = t >= tGo ? 1 : 0;
    const bx = lerp(st[0], KT.bin[0], u1), by = lerp(st[1], KT.bin[1] - 300, u1) - 46 * Math.sin(Math.PI * u1) * 0 + dr * 150, open = ss(tGo + .7, tGo + 1.2, t) * (1 - ss(tBin + .05, tBin + .28, t)), gone = t > tBin + .02;
    const carried = gone ? "" : `<g transform="translate(${n2(bx)} ${n2(by)})"><g transform="translate(0 ${n2(-700 * (1 - down))})"><g transform="translate(40 -66)">${glovedArm()}</g></g>${lift ? `<g transform="scale(.56)">${bagAlone(10, { rot: lerp(30, 8, u1) })}</g>` : ""}</g>`;
    return kitchenView(t, { day: 10, tray: lift ? { noBag: true } : D10, rise: 1, bin: open, front: carried + (gone ? "" : ""), binIn: "" }, CAMC)
      + popTag(t, W(L, "still") - .1, kx(CAMC, KT.bin[0]) - 10, ky(CAMC, KT.bin[1] - 330), "still shut", 46, P.sun, P.ink) + wipe(t, tThen, "#DCE3EA", 1500, 400) + HUD(t); }
  const tW = W(L, "wash") - .3, tQ = LE(p) + .1, tP = W(h, "find") - .1, wat = ss(tW, tW + .3, t) * (1 - ss(LT(p) - .5, LT(p) - .1, t));
  return sinkView(t, { water: wat, shine: .0 }) + bigQ(t, tQ, 960, 440, 1.5)
    + buddy("pip", 250, 1060, 340, t, { aura: true, in: tThen + .3, poses: [[tThen, "sit"], [LE(p) + .1, "pointing"]] }) + say(p, 420, 560, t, { size: 52, tail: -120 })
    + (t >= tP ? TF(1340, 470, lerp(2.2, 1, eo((t - tP) / .16)) + .05 * wob(t, tP + .16, .4), `<text x="0" y="50" font-family="Fredoka" font-weight="700" font-size="170" text-anchor="middle" letter-spacing="6" fill="${P.sun}" stroke="${P.ink}" stroke-width="28" stroke-linejoin="round" paint-order="stroke" filter="url(#drop)">PART 2</text>`) : "")
    + wipe(t, tThen, "#DCE3EA", 1500, 400) + HUD(t); };
// the ending: the two trays stand in the free space between Pip and Momo, each with its picture and its word above (no words in the bottom fifth)
const endTrays = (t) => { const one = (x, kind, pic) => TF(x, 1046, .9, sortTray(kind, 300, { size: 1 }).replace(/<text[^>]*>(USEFUL|HARMFUL)<\/text>/, "") + TF(0, -62, 1, pic) + TF(0, -400, 1.4, tpill(0, 0, kind ? "HARMFUL" : "USEFUL", 36, kind ? "#2F78E8" : "#2FA65A", "#fff", { w: 700, ls: 3 })));
  return one(636, 0, cardPic(1, t, 1)) + one(924, 1, cardPic(3, t)); };
SC.nyk = (t, s) => nykScene(t, s, endTrays(t));
})(); }
