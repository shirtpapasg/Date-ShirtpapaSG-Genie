// p1.js: PART 1, "Is a Spider an Insect? COUNT the Legs!": insects (count the legs), wings are not the clue, reptiles (Basil is one),
// be a scale, cold-blooded. Segments 1-15 of p3_ep06_script.md, section 4.
if (PART === 1) { (() => {
const CARD = [1590, 1062, .5], CAMW = [1.02, 960, 560];
const wPip = (t, o = {}) => buddy("pip", 1355, 1064, 165, t, { aura: true, tag: false, ...o }), wBasil = (t, o = {}) => buddy("basil", 640, 1064, 160, t, { aura: true, tag: false, ...o }), wMomo = (t, o = {}) => buddy("momo", 1835, 1062, 160, t, { aura: true, tag: false, flip: true, ...o });
const board = (t, st = {}, o = {}, at = CARD) => TF(at[0], at[1], at[2], sixBoard(t, st, o));
const gx = (cam, x) => camX(cam, x), gy = (cam, y) => camY(cam, y);
const ST = () => ({ 3: MK("stampIns") + .02, 4: MK("stampRep") + .02 });   // when the INSECTS and REPTILES tiles get their stamps
const ringClip = (inner) => `<clipPath id="rgc"><circle cx="430" cy="470" r="172"/></clipPath><g clip-path="url(#rgc)">${inner}</g>`;

/* ============ 1 · the silent cold open: the lake at the Singapore Botanic Gardens ============ */
// the thumbnail's frame: the garden spider large in its web with its eight legs glowing; the ant in its ring beside it (thumb_still.js "&thumb")
const THUMB1 = (t) => macroBg(1, { ground: false, sky: "#D8F0D0" }) + TF(1260, 700, .8, spiderWeb(330, 0, { op: .9, w: 3.5 }) + spiderBig({ id: "th", glow: [.8, .8, .8, .8, .8, .8, .8, .8] }))
  + TF(660, 560, 1, `<g filter="url(#drop)"><circle r="200" fill="${P.paper}"/></g><circle r="184" fill="#EAF6E8"/>` + TF(10, 64, .42, antBig({})) + TF(0, 240, 1, tpill(0, 0, "6 legs", 46, P.sun, P.ink, { w: 700 })))
  + TF(1620, 990, 1, tpill(0, 0, "8 legs", 54, P.sun, P.ink, { w: 700 })) + buddy("pip", 200, 790, 280, t, { aura: true, tag: false, pose: "surprised", still: true }) + logo(t);
SC.cold = (t, s) => { if (location.search.includes("thumb")) return THUMB1(t); const tb = MK("coldCard"), e = eio(t / 6.0), cam = [lerp(1.32, 1.03, e), lerp(520, 960, e), lerp(730, 565, e)];
  const [cx, cd] = slideX(t, tb, .75, 2300, CARD[0], 1062);
  return lakeView(t, {}, cam) + motes(t, 26, 4) + `<g transform="translate(${n2(-80 * (1 - e))} ${n2(-40 * (1 - e))})">${nearLeaves(t, 80, 40, 1.6)}${nearLeaves(t + 1, 1900, -20, 1.4, -1)}</g>`
    + cd + (t >= tb ? TF(cx, 1062, CARD[2], sixBoard(t)) : "")
    + wBasil(t, { in: .6, poses: [[.6, "surprised"], [5.8, "sit"]], look: 4 }) + wPip(t, { in: tb + .7, poses: [[tb + .7, "pointing"], [tb + 2.3, "sit"]] }) + wMomo(t, { in: tb + 1.1, poses: [[tb + 1.1, "waving"], [tb + 2.8, "sit"]], wave: true })
    + OP(ramp(t, .3, .4) * (1 - ramp(t, s.t1 - .5, .3)), lowerPill(60, 60, "Singapore Botanic Gardens", "")); };

/* ============ 2 · the callback to Episode 5's dare ============ */
SC.callback = (t, s) => { const a = "e201", b = "e202", tw_ = [W(a, "amphibians"), W(a, "birds"), W(a, "fish")], t3 = W(a, "three", 1), tM = LT(b) - .5, big = eio((t - s.t0) / .6) * (1 - eio((t - tM) / .6));
  const at = [lerp(CARD[0], 1260, big), lerp(CARD[1], 1040, big), lerp(CARD[2], .9, big)], fl = [0, 1, 2].map((i) => pulse(t, tw_[i] - .05, .05, .9)).concat([0, 0, 0]), pl = [0, 0, 0].concat([0, 1, 2].map((i) => pulse(t, t3 + i * .35, .05, .8) + (t > t3 + 1.4 && t < tM ? .4 + .3 * Math.sin(t * 5 + i) : 0)));
  const gA = pulse(t, W(b, "ant") - .15, .1, 1.6), gS = pulse(t, W(b, "spider") - .15, .1, 1.6), look = t < W(b, "spider") - .1 ? -6 : 6;
  return lakeView(t, {}, CAMW) + glowDisc(gx(CAMW, 990), gy(CAMW, 890), 110, gA) + glowDisc(gx(CAMW, GD.web[0]), gy(CAMW, GD.web[1]), 120, gS) + motes(t, 18, 5)
    + wBasil(t, { poses: [[s.t0, "sit"]] }) + (big < .05 ? wPip(t) : "") + board(t, {}, { flash: fl, pulse: pl }, at) + (t < tM ? wMomo(t, { out: tM - .1 }) : "")
    + buddy("momo", 1700, 1056, 300, t, { aura: true, flip: true, in: tM, poses: [[tM, "thinking"], [LT(b) - .12, "sit"], [LE(b) + .1, "thinking"]], look })
    + say(b, 1300, 520, t, { size: 46, tail: 260, maxW: 620 }) + HUD(t); };
SC.title = (t, s) => { const u = t - s.t0, a = (d) => { const k = clamp((u - d) / .16); return k <= 0 ? 0 : lerp(2.4, 1, eo(k)) + .05 * wob(u, d + .16, .4); }, k1 = a(.1), k2 = a(.5);
  const ln = (y, txt, size, col, k, ls = 6) => k ? `<g transform="translate(960 ${y}) scale(${n2(k)})"><g transform="translate(0 9)" opacity=".85">${T(0, 0, txt, size, P.ink, { ls })}</g>${T(0, 0, txt, size, col, { ls })}</g>` : "";
  return lakeView(t, {}, [1.5 - .08 * clamp(u / 3), 700, 760]) + `<rect width="1920" height="1080" fill="${P.night}" opacity="${n2(.66 * clamp(u / .2))}"/>`
    + ln(370, "SPIDER OR INSECT?", 160, "#fff", k1, 4) + ln(590, "COUNT THE LEGS!", 170, P.sun, k2, 6)
    + (u > 1.0 ? TF(960, 760, spring(t, s.t0 + 1.0, .45), tpill(0, 0, "Lock in your answer!", 46, P.ink, "#fff", { w: 600 })) : "") + OP(clamp((u - .2) / .3), logo(t)); };
SC.game = (t, s) => gameScene(t, s, "e301", true, "grasshopper", (t) => `<g transform="translate(-14 64) scale(.95)">${hopperF(t)}</g>`);

/* ============ 4 · Round 1: which one is an insect? ============ */
const antSpiderRing = (tt) => ringClip(`<rect x="250" y="290" width="360" height="360" fill="#EAF6E8"/><path d="M250 560 Q430 540 610 560 V660 H250z" fill="#E6D8BC"/>` + TF(530, 440, .2, spiderWeb(330, tt, { op: .9, w: 4 }) + spiderBig({ id: "r1" })) + TF(350, 568, .17, antBig({ walk: tt * 7 }))) + `<path d="M430 300 V640" stroke="#fff" stroke-width="3" stroke-dasharray="6 10" opacity=".7"/>`;
SC.r1 = (t, s) => { const L = "e401";
  return lockN(t, { cards: ["The ant", "The spider"], q: "Which one is an insect?", tq: W(L, "which") - .1, tc: [W(L, "one", 2), W(L, "two")], ring0: MK("ring0_1"), dur: 5, lock: "e402", obj: antSpiderRing,
    picks: [{ who: "pip", id: "e403", word: "2", x: true }, { who: "basil", id: "e404", word: "1" }, { who: "momo", id: "e405", word: "1" }],
    over: (tt) => popTag(tt, LE("e405") + .1, 1560, 330, "Let’s check!", 56) }); };

/* ============ 5 · today's goals ============ */
SC.goals = (t, s) => goals3(t, s, [["How to spot an insect", TF(0, 34, .17, antBig({ walk: t * 6 }))], ["How to spot a reptile", TF(-24, 40, .17, monitor({ t, tongue: tongueAt(t, 0, 3) }))], ["What cold-blooded means", TF(0, 46, .34, thermo(.35 + .3 * Math.sin(t * 1.5), 300))]]);

/* ============ 6 · count the legs: the ant, the spider ============ */
const AX = 900, AY = 846, AK = 1.15;
const ants = (o) => TF(AX, AY, AK, antBig(o));
SC.ant = (t, s) => { const L = "e601", L2 = "e602", tIn = MK("antIn"), tc = ["one", "two", "three", "four", "five", "six"].map((w) => W(L, w) - .04), t6 = W(L, "six", 1), tF = W(L2, "feelers") - .1, tH = W(L2, "head") - .1, tB = W(L2, "three") - .05;
  if (t < tIn - .1) { const z = 1 + 4.5 * ei((t - s.t0) / (tIn - .1 - s.t0)); return lakeView(t, { ants: true }, [z, 990, 896]) + motes(t, 18, 6) + HUD(t); }
  const clean = 1 - ss(LT(L) - .6, LT(L) - .1, t), z = lerp(1.18, 1, eo((t - tIn) / 1.2)), glow = tc.map((c, i) => t < c ? 0 : (t < tF - .2 ? .45 + .55 * pulse(t, c, .03, .6) : .25 * (1 - ramp(t, tF - .2, .4))));
  const parts = [0, 1, 2].map((i) => t < tB + i * .5 ? 0 : .5 + .5 * pulse(t, tB + i * .5, .03, .7)), feel = t < tF ? 0 : (t < tB ? .6 + .4 * pulse(t, tF, .03, .8) : .3);
  const o = { clean, cleanAnt: clean * .7, glow, parts, feel, t };
  let nums = ""; tc.forEach((c, i) => { const f = antLegTip(i, o); nums += numPop(t, c, AX + f[0] * AK, AY + 80 + (i % 2) * 86, i + 1, .95); });
  const ft = antFeeler(false), tip = [AX + 366 * AK, AY - 280 * AK];
  return CAM(macroBg(t, { gy: AY - 10 }) + ants(o), z, AX, AY - 200) + nums + (t >= t6 ? popTag(t, t6, 520, 300, "6 legs!", 64) : "")
    + lineTag(t, tF, 1560, 240, tip[0] - 6, tip[1] + 8, "feelers", 44) + (t >= tH && t < tB ? OP(pulse(t, tH, .05, 1.2), `<circle cx="${n2(AX + 186 * AK)}" cy="${n2(AY - 168 * AK)}" r="105" fill="none" stroke="${P.sun}" stroke-width="7"/>`) : "")
    + finePrint(t, tIn + .2, "Look. Do not touch.", 250, 1030) + wipe(t, tIn - .1, "#DFF0D8", 990, 896) + HUD(t); };
const SX = 960, SY = 470, SK = 1.0;
SC.spider = (t, s) => { const L = "e603", t8 = W(L, "eight") - .05, tq = LT(L) + .15, tc = Array.from({ length: 8 }, (_, i) => lerp(tq, t8 - .1, i / 7)), tNo = W(L, "no") - .1, tTwo = W(L, "two") - .05;
  const glow = tc.map((c) => t < c ? 0 : .5 + .5 * pulse(t, c, .03, .4)), parts = [t < tTwo ? 0 : .6 + .4 * pulse(t, tTwo, .03, .6), t < tTwo + .45 ? 0 : .6 + .4 * pulse(t, tTwo + .45, .03, .6)];
  let nums = ""; tc.forEach((c, i) => { const f = spiderLegTip(i), d = Math.hypot(f[0], f[1] - 20), ox = f[0] / d * 56, oy = (f[1] - 20) / d * 56; nums += numPop(t, c, SX + (f[0] + ox) * SK, SY + (f[1] + oy) * SK, i + 1, .82); });
  return macroBg(t, { ground: false, sky: "#D8F0D0" }) + TF(SX, SY, SK, spiderWeb(330, t, { op: .9, w: 3 }) + `<g transform="rotate(${n2(1.2 * Math.sin(t))})">${spiderBig({ id: "big", glow, parts })}</g>`) + nums
    + popTag(t, t8, 1540, 260, "8 legs", 60) + lineTag(t, tNo, 1380, 420, SX + 30, SY - 110, "no feelers", 40) + (t >= tTwo + .5 ? popTag(t, tTwo + .5, 1540, 840, "2 body parts", 52) : "") + wipe(t, s.t0, "#DFF0D8") + HUD(t); };
SC.antans = (t, s) => { const a = "e604", tI = W(a, "insect") - .1, tN = W(a, "not") - .1, tD = W(a, "different") - .1, tc = W("e605", "one", 1) - .1, tP = LT("e606") - .12, tS = MK("stampIns");
  const rings = TF(560, 430, 1, `<g filter="url(#drop)"><circle r="230" fill="${P.paper}"/></g><circle r="212" fill="#EAF6E8"/>` + TF(10, 70, .48, antBig({ walk: t * 5 })) + (t >= tI ? `<circle r="${n2(222 + 6 * pulse(t, tI, .05, .6))}" fill="none" stroke="${P.sun}" stroke-width="12"/>` + TF(170, -170, spring(t, tI, .4), tickBadge(40)) : ""))
    + TF(1170, 430, 1, OP(t >= tN ? .62 : 1, `<g filter="url(#drop)"><circle r="230" fill="${P.paper}"/></g><circle r="212" fill="#EAF6E8"/>` + TF(0, 0, .5, spiderWeb(330, t, { op: .9, w: 4 }) + spiderBig({ id: "aa" }))) + greyX(t, tN, 170, -170, 44));
  return bg("daystage") + rings + TF(560, 760, .5, ansCard(1, "The ant", { lit: t >= tI ? spring(t, tI, .45) : 0 })) + TF(1170, 760, .5, OP(t >= tN ? .5 : 1, ansCard(2, "The spider")))
    + popTag(t, tD, 1170, 150, "a different group", 44, P.ink, "#fff") + board(t, ST(), {}, [1660, 1062, .44]) + sixPress(t, tS, 1660, 1062, .44, 3)
    + buddy("pip", 200, 1060, 230, t, { aura: true, in: s.t0 + .2, poses: [[s.t0, "thinking"], [tP, "oops"], [LE("e606") + .1, "cheer"]] }) + say("e606", 420, 660, t, { size: 46, tail: -150 })
    + coin(t, tc, 870, 250, "+1", "if you showed one finger") + HUD(t); };
SCORE.push([W("e605", "one", 1) - .1, 1, 1]);
const MKAX = 1650, MKAY = 900, MKK = .5, ap = (x, y) => [MKAX + x * MKK, MKAY + y * MKK];
SC.mark1 = (t, s) => { const L = "e608", th = W(L, "head") - .1, tt = W(L, "thorax") - .1, ta = W(L, "abdomen") - .1;
  const parts = [th, tt, ta].map((q) => t < q ? 0 : .3 + .7 * pulse(t, q, .03, .8));
  const under = `<g filter="url(#dropS)"><circle cx="1690" cy="830" r="200" fill="${P.paper}" opacity=".95"/></g>` + TF(MKAX, MKAY, MKK, antBig({ parts })) + lineTag(t, th, 1820, 590, ...ap(190, -170), "head", 36) + lineTag(t, tt, 1620, 590, ...ap(40, -160), "thorax", 36) + lineTag(t, ta, 1590, 1040, ...ap(-200, -120), "abdomen", 36);
  return markScene(t, s, { id: L, sayId: "e607", who: "momo", n: "1 of 2", text: "Insects have six legs and a pair of feelers. The body of insects is divided into the head, thorax and abdomen.", keys: ["six", "legs", "a", "pair", "of", "feelers", "head", "thorax", "abdomen"], size: 60, y: 214, x: 600, w: 880, extra: under }); };
SC.shell = (t, s) => { const L = "e609", tH = W(L, "hard") - .1, sh = clamp(((t - s.t0 - .4) % 2.6) / 1.6);
  return CAM(macroBg(t, { gy: 870 }) + TF(1000, 880, 1.55, antBig({ shine: sh, t })), lerp(1.08, 1, eo((t - s.t0) / 1)), 1000, 640) + bookCap(t, L, "Insects have an outer covering that is usually hard and shell-like.", 150, { size: 48, maxW: 1120, x: 760 })
    + popTag(t, tH, 1500, 340, "hard, like a shell", 48) + wipe(t, s.t0, "#DFF0D8") + HUD(t); };

/* ============ 7 · wings are not the clue ============ */
SC.wings = (t, s) => { const L = "e701", tb = [W(L, "many") - .2, W(L, "some") - .2, W(L, "some", 1) - .2], labs = ["2 pairs of wings", "1 pair of wings", "no wings"];
  const pics = [TF(0, 30, .52, grasshopper({ flap: t * 3 })), TF(0, 20, .56, mosquito({ flap: t })), TF(20, 120, .46, antBig({ walk: t * 5 }))];
  return lakeView(t, { mon: { k: .3 } }, [1.12, 960, 640]) + `<rect width="1920" height="1080" fill="${P.night}" opacity=".12"/>`
    + pics.map((p, i) => { const k = spring(t, tb[i], .45); if (k < .02) return ""; const x = 420 + i * 540; return TF(x, 1040, k, pboard(p, 420, 340, "wg" + i, labs[i], 38)) + TF(x + 150, 610, k, tpill(0, 0, "6 legs", 32, P.sun, P.ink, { w: 700 })); }).join("")
    + bookCap(t, L, "Many adult insects have two pairs of wings. Some adult insects have only one pair of wings. Some do not have wings at all.", 150, { size: 42, maxW: 1120, x: 760 }) + HUD(t); };

/* ============ 8 · HOLD ON! Basil's rule ============ */
const RB = [760, 1046, .78], RG = [1640, 680];
function ruleBoard(t, o = {}) { const pics = [TF(0, 20, .5, butterfly({ flap: t * .7 })), TF(-10, 110, .78, pigeon({ bob: 3 * Math.sin(t * 3) }))]; let s = "";
  pics.forEach((p, i) => { const x = -250 + i * 500, k = (o.pk || [1, 1])[i]; if (k < .02) return; s += TF(x, -150, k, `<clipPath id="rb${i}"><rect x="-190" y="-130" width="380" height="250" rx="20"/></clipPath><rect x="-198" y="-138" width="396" height="266" rx="26" fill="#fff" stroke="#C9D2E8" stroke-width="5"/><g clip-path="url(#rb${i})"><rect x="-200" y="-140" width="400" height="280" fill="#EAF6E8"/>${p}</g>`)
      + ((o.q || 0) > .02 && (i === 0 || (o.bird || 0) < .5) ? TF(x + 110, -276, o.q, `<g transform="rotate(8)">${tpill(0, 0, "an insect?", 36, P.basil, "#fff", { w: 700, nosh: true })}</g>`) : "")
      + (i === 1 && (o.bird || 0) > .02 ? TF(x + 110, -276, o.bird, `<g transform="rotate(-4)">${tpill(0, 0, "a bird", 40, P.leafDeep, "#fff", { w: 700, nosh: true })}</g>`) : "")
      + (i === 0 && (o.ins || 0) > .02 ? TF(x, 30, o.ins, tpill(-60, 0, "insect", 32, P.leafDeep, "#fff", { w: 700, nosh: true }) + tpill(100, 0, "6 legs", 32, P.sun, P.ink, { w: 700, nosh: true })) : "")
      + (i === 1 && (o.lab || 0) > .02 ? TF(x, 30, o.lab, tpill(-80, 0, "feathers", 32, "#fff", P.ink, { w: 700, nosh: true }) + tpill(90, 0, "2 legs", 32, "#fff", P.ink, { w: 700, nosh: true })) : ""); });
  return `<ellipse cx="0" cy="4" rx="330" ry="18" fill="${P.ink}" opacity=".22" filter="url(#b4)"/><path d="M-200 0 L-120 -110 M200 0 L120 -110" stroke="#8A5A36" stroke-width="16" stroke-linecap="round"/><rect x="-250" y="-14" width="500" height="20" rx="10" fill="#8A5A36"/>
  <g filter="url(#drop)"><rect x="-540" y="-640" width="1080" height="570" rx="30" fill="${P.basil}"/><rect x="-520" y="-622" width="1040" height="534" rx="18" fill="url(#gPaper)"/></g>
  ${T(0, -530, "If it has wings, it is an insect.", 60, P.ink)}${(o.x || 0) > .02 ? `<path d="M-430 -552 H430" stroke="${P.coral}" stroke-width="10" stroke-linecap="round" stroke-dasharray="${n2(860 * Math.min(1, o.x))} 900"/>` + TF(-490, -552, Math.min(1.1, o.x), xBadge(30)) : ""}
  <g transform="translate(0 -170)">${s}</g>`; }
const lizShow = (t, t0) => 1 - ramp(t, t0, .25) * (1 - ramp(t, t0 + 3.2, .2));
SC.rule = (t, s) => { const a = "e801", b = "e802", c = "e803", d = "e804", r0 = MK("ring0_2"), bell = MK("bell_2"), rs = ringState(t, r0, 5), tX = W(b, "cross") - .15, tH = W(b, "hold") - .1, tOne = W(c, "one") - .1, ring = t >= tX && t < bell + .8;
  const pk = [spring(t, W(a, "butterfly") - .15, .4), spring(t, W(a, "pigeon") - .15, .4)], q = spring(t, W(a, "both") - .1, .4), tP = W(c, "pigeon") - .1, bird = spring(t, W(c, "bird") - .1, .4), lab = spring(t, W(c, "feathers") - .1, .4), tCL = W(c, "count") - .1, xk = spring(t, tCL, .4), ins = spring(t, W(c, "legs") - .1, .4);
  return lakeView(t, { liz: lizShow(t, LT(a) + 1.0) }, [1, 960, 540]) + `<rect width="1920" height="1080" fill="${P.night}" opacity=".16"/>` + TF(RB[0], RB[1], RB[2], ruleBoard(t, { pk, q, x: xk, bird, lab, ins }))
    + buddy("basil", 170, 1060, 230, t, { aura: true, in: s.t0 + .1, poses: [[s.t0, "cheer"], [LT(a) - .1, "sit"], [LE(a) + .15, "arms_crossed"], [tP, "surprised"], [LT(d) - .12, "oops"], [LE(d) + .1, "sit"]], nohop: true })
    + say(a, 470, 250, t, { size: 40, tail: -230, x: true, maxW: 640 }) + say(d, 470, 300, t, { size: 44, tail: -230, maxW: 600 })
    + (ring ? OP(1 - ss(bell + .5, bell + .8, t), TF(RG[0], RG[1], spring(t, tX, .4), `<g transform="translate(${-RG[0]} ${-RG[1]})">${ringTimer(RG[0], RG[1], t < r0 ? 1 : rs.frac, t < r0 ? 5 : rs.secs, t, { R: 128, sw: 22, tick: rs.tick, shut: pulse(t, bell, .01, .6), inner: TF(RG[0], RG[1] + 6, .5, crossedArms()) })}</g>`) + youPill(RG[0], RG[1] - 178, 1.0) + tpill(RG[0], RG[1] + 220, "cross your arms", 30, P.ink, "#fff")) : "")
    + (t >= tCL ? TF(1560, 480, spring(t, tCL, .45), tpill(0, 0, "Count the legs,", 46, P.sun, P.ink, { w: 700 }) + tpill(0, 86, "not the wings!", 46, P.sun, P.ink, { w: 700 })) : "")
    + stamp(t, tH, 760, 380, "HOLD ON!") + bellIcon(t, r0) + coin(t, tOne, 1600, 300, "+1", "arms crossed") + HUD(t); };
SCORE.push([W("e803", "one") - .1, 2, 1]);

/* ============ 9 · Round 2: the monitor lizard ============ */
SC.r2 = (t, s) => { const L = "e901", tM = W(L, "monitor") - .1, tS = W(L, "skin") - .15;
  return lockN(t, { cards: ["Amphibians", "Reptiles", "Mammals"], q: "Which group?", tq: W(L, "which") - .1, tc: [W(L, "one"), W(L, "two", 1), W(L, "three")], ring0: MK("ring0_3"), dur: 5, lock: "e902",
    obj: (tt) => ringClip(`<rect x="250" y="290" width="360" height="360" fill="#9FD6DE"/><path d="M250 520 Q430 500 610 520 V660 H250z" fill="#B59A70"/><path d="M250 560 Q430 548 610 560 V660 H250z" fill="#7CC85A"/>` + TF(380, 575, .4, monitor({ t: tt, tongue: tongueAt(tt, 0, 3.3) + (tt > tM && tt < tM + .5 ? Math.sin(Math.PI * (tt - tM) / .5) : 0) }))),
    clue: (tt) => (tt >= tS ? TF(150, 300, spring(tt, tS, .45), skinDisc("scaly", 86, tt)) + TF(150, 172, spring(tt, tS + .2, .4), tpill(0, 0, "dry and scaly", 34, "#fff", P.ink, { w: 700 })) : ""),
    picks: [{ who: "pip", id: "e904", word: "2" }, { who: "basil", id: "e905", word: "2" }, { who: "momo", id: "e903", word: "1", x: true }], react: [[LT("e905") + .1, "basil", "cheer"]] }); };

/* ============ 10 · the reveal: reptiles, and Basil is one ============ */
SC.r2ans = (t, s) => { const a = "e1001", tA = W(a, "two") - .1, lit = t >= tA ? spring(t, tA, .45) : 0, tc = W("e1002", "one", 1) - .1, tB = LT("e1003") - .12, tS = MK("stampRep");
  return lakeView(t, { mon: { k: .44, x: 760, y: 750 } }, [1.18, 760, 640]) + TF(1150, 820, .5, ansCard(2, "Reptiles", { lit })) + board(t, ST(), {}, [1640, 1062, .44]) + sixPress(t, tS, 1640, 1062, .44, 4)
    + buddy("basil", 380, 1060, 360, t, { aura: true, in: s.t0 + .2, poses: [[s.t0, "sit"], [tA, "surprised"], [tB, "cheer"]] }) + say("e1003", 720, 440, t, { size: 48, tail: -200 })
    + popTag(t, LE("e1003") - .2, 380, 600, "Basil: a lizard = a reptile", 40, P.basil, "#fff") + coin(t, tc, 1150, 520, "+1", "if you showed two fingers")
    + (t > tB && t < tB + 1.6 ? leafSparkles(t, 380, 820, 220, 200, 9, 3) : "") + HUD(t); };
SCORE.push([W("e1002", "one", 1) - .1, 3, 2]);
SC.rep4 = (t, s) => { const L = "e1004", t4 = W(L, "four") - .1, tSn = W(L, "snakes") - .1;
  const pics = [["snake", snakeArt(t), 1.0], ["turtle", turtleArt(t), .95], ["crocodile", crocArt(t), .9], ["lizard", TF(30, 30, .44, monitor({ t })), 1]];
  return bg("daystage") + pics.map(([nm, art, k], i) => { const kk = spring(t, s.t0 + .1 + i * .14, .45); if (kk < .02) return ""; const x = 255 + i * 470, g = i && t >= t4 ? pulse(t, t4 + (i - 1) * .25, .03, .8) : 0;
      return TF(x, 1000, kk, pboard(TF(0, 20, k * .66, art) + (g > .05 ? `<ellipse cx="0" cy="${n2(70)}" rx="200" ry="40" fill="${P.sun}" opacity="${n2(.5 * g)}" filter="url(#b10)"/>` : ""), 400, 330, "r4" + i, nm, 38))
        + (i ? popTag(t, t4 + (i - 1) * .25, x, 560, "4 legs", 40) : popTag(t, tSn, x, 560, "no legs", 40, P.ink, "#fff")); }).join("")
    + bookCap(t, L, "Most reptiles, except snakes, have four legs.", 170, { size: 48, maxW: 1120, x: 760 }) + HUD(t); };
SC.repskin = (t, s) => { const L = "e1005", tD = W(L, "dry") - .1, tL = W(L, "breathe") - .15, mv = eio((t - tL) / .6), br = t > tL ? .5 + .5 * Math.sin((t - tL) * 2.6) : 0;
  return bg("daystage") + TF(lerp(700, 460, mv), lerp(560, 470, mv), lerp(1, .62, mv), skinDisc("scaly", 210, t)) + popTag(t, tD, lerp(700, 460, mv), lerp(820, 640, mv), "dry and scaly", lerp(48, 36, mv))
    + TF(lerp(1300, 1460, mv), lerp(560, 470, mv), lerp(.95, .58, mv), `<g filter="url(#drop)"><circle r="160" fill="#fff"/></g><clipPath id="fsk"><circle r="150"/></clipPath><g clip-path="url(#fsk)">${swatch("skin", t)}</g>`)
    + (t >= tD + .6 ? TF(lerp(1300, 1460, mv), lerp(780, 620, mv), spring(t, tD + .6, .4), tpill(0, 0, "moist", 40, "#fff", P.ink, { w: 700 }) + TF(-96, 0, 1, xBadge(26))) : "")
    + (t >= tL - .2 ? OP(ramp(t, tL - .2, .4), TF(960, 940, .62, monitor({ t, breath: br })) + `<ellipse cx="${n2(960 + 60 * .62)}" cy="${n2(940 - 70 * .62)}" rx="${n2(60 + 18 * br)}" ry="${n2(34 + 10 * br)}" fill="${P.sun}" opacity="${n2(.25 + .3 * br)}" filter="url(#b10)"/>`) + lineTag(t, tL + .3, 1420, 760, 960 + 60 * .62, 940 - 64 * .62, "lungs (inside its body)", 36) : "")
    + bookCap(t, L, "Reptiles usually have dry and scaly skin. They breathe through their lungs.", 160, { size: 48, maxW: 1120, x: 760 }) + HUD(t); };
SC.repegg = (t, s) => { const L = "e1006", tE = W(L, "eggs") - .1, u = clamp((t - tE) / 2.2), tB = LT("e1007") - .12;
  return bg("daystage") + TF(820, 800, 1.05, pboard(TF(0, 60, 1.35, eggClutch(u, t)), 700, 470, "egg", "", 36, "#E8DCC4")) + bookCap(t, L, "Most reptiles reproduce by laying eggs.", 170, { size: 48, maxW: 1120, x: 760 })
    + buddy("basil", 1520, 1060, 340, t, { aura: true, in: s.t0 + .2, poses: [[s.t0, "sit"], [tB, "cheer"]] }) + say("e1007", 1520, 560, t, { size: 48, tail: 0 }) + HUD(t); };

/* ============ 11 · BE A SCALE: the dive (the journey itself is in shrink.js) ============ */
const MON = [760, 750, .44], BACK = [MON[0] - 20 * MON[2], MON[1] - 128 * MON[2]];   // a spot on the lizard's back
SC.waitw = (t, s) => { const L = "e1101", dive = ei((t - (s.t1 - .6)) / .6), cam = [1.2 + 4.2 * dive, lerp(900, BACK[0], dive), lerp(640, BACK[1], dive)], tP = W(L, "be") - .2;
  return lakeView(t, { mon: { k: MON[2], x: MON[0], y: MON[1] } }, cam) + motes(t, 16, 8)
    + OP(1 - dive, buddy("pip", 1500, 1056, 220, t, { aura: true, flip: true, in: s.t0 + .1, poses: [[s.t0, "pointing"], [s.t0 + 1.6, "sit"]] }) + buddy("basil", 1760, 1060, 230, t, { aura: true, flip: true, in: s.t0 + .2, poses: [[s.t0, "sit"], [tP, "cheer"]], nohop: true })
      + (t >= tP ? TF(960, 230, spring(t, tP, .45), tpill(0, 0, "Be a scale!", 74, P.sun, P.ink, { w: 700 })) : "") + HUD(t))
    + wipe(t, s.t1, "#E8D9B0", gx(cam, BACK[0]), gy(cam, BACK[1])); };
// back to normal size: the monitor swims in the lake, head up, tail sweeping
SC.pullout = (t, s) => { const e = eo((t - s.t0) / 1.2), cam = [lerp(3.2, 1.25, e), lerp(980, 900, e), lerp(640, 620, e)];
  const sw = `<g>${TF(980, 640, .5, monitor({ pose: "swim", t }))}<rect x="0" y="${640}" width="1920" height="300" fill="#4FA3B5" opacity=".55"/><path d="M${n2(980 - 330)} 642 Q980 630 ${n2(980 + 230)} 642" fill="none" stroke="#fff" stroke-width="5" opacity=".7"/>${[0, 1, 2].map((i) => { const u = ((t - s.t0) * .8 + i / 3) % 1; return `<ellipse cx="${n2(980 - 300 - 120 * u)}" cy="644" rx="${n2(40 + 160 * u)}" ry="${n2(8 + 14 * u)}" fill="none" stroke="#fff" stroke-width="4" opacity="${n2(.7 * (1 - u))}"/>`; }).join("")}</g>`;
  return lakeView(t, { mon: false, items: sw }, cam) + popTag(t, s.t0 + 1.0, 560, 260, "in the sun: warm", 46, "#FFE27A", P.ink) + popTag(t, s.t0 + 1.5, 1340, 260, "in the water: cool", 46, "#BFE6FF", P.ink) + wipe(t, s.t0, "#BFE6FF") + HUD(t); };

/* ============ 12 · cold-blooded ============ */
SC.mark2 = (t, s) => { const L = "e1202", u = (t - s.t0) * .7, sunL = .78 + .04 * Math.sin(t * 2), shadeL = .28 + .03 * Math.sin(t * 2 + 1);
  const under = TF(1600, 760, .62, thermo(sunL, 300)) + TF(1800, 760, .62, thermo(shadeL, 300)) + TF(1600, 470, .8, sunHeat()) + TF(1800, 470, .9, `<g fill="#B8C4D8"><ellipse cx="0" cy="0" rx="40" ry="24"/><ellipse cx="-24" cy="6" rx="26" ry="18"/><ellipse cx="26" cy="8" rx="24" ry="16"/></g>`)
    + T(1600, 830, "in the sun", 30, "#fff", { w: 700 }) + T(1800, 830, "in the shade", 30, "#fff", { w: 700 }) + TF(1700, 1010, .24, monitor({ t, tongue: tongueAt(t, 1, 4) }));
  return markScene(t, s, { id: L, sayId: "e1201", who: "basil", n: "2 of 2", text: "Reptiles are cold-blooded animals. This means that they do not have a constant body temperature like humans. Their body temperature changes with the environment that they are in.", keys: ["cold-blooded", "constant", "body", "temperature", "changes", "environment"], size: 54, y: 200, x: 600, w: 900, extra: under }); };
SC.basilsun = (t, s) => { const L = "e1203", tC = W(L, "always") - .1, tS = W(L, "sun") - .2, sun = spring(t, tS, .5);
  return bg("daystage") + `<rect width="1920" height="1080" fill="#FFE9A8" opacity="${n2(.35 * sun)}"/>` + (sun > .02 ? `<g style="mix-blend-mode:screen"><path d="M1500 -100 L1900 -100 L1000 1100 L500 1100z" fill="#FFF0B8" opacity="${n2(.35 * sun)}" filter="url(#b30)"/></g>` : "")
    + buddy("basil", 760, 1050, 470, t, { aura: true, in: s.t0 + .15, poses: [[s.t0, "sit"], [tS, "cheer"]], rim: "rimB" }) + say(L, 1290, 470, t, { size: 46, tail: -260, maxW: 620 })
    + (t >= tC ? TF(1520, 800, spring(t, tC, .4) * (1 - ramp(t, tS, .3)), `<g fill="#B8C4D8"><ellipse cx="0" cy="0" rx="70" ry="42"/><ellipse cx="-44" cy="10" rx="46" ry="30"/><ellipse cx="46" cy="14" rx="42" ry="28"/></g>`) : "") + (sun > .02 ? TF(1560, 230, sun * (1 + .04 * Math.sin(t * 4)), `<g transform="rotate(${n2(t * 20)})">${sunHeat()}</g>`, 0) : "")
    + popTag(t, s.t0 + .3, 760, 230, "cold-blooded ≠ always cold", 48, P.basil, "#fff") + HUD(t); };

/* ============ 13 · score hand, the lizard ============ */
SC.final = (t, s) => { const L = "e1301"; return finalScene(t, s, L, 2, [[s.t0, null, 1], [W(L, "more") - .1, "More than two? You beat the Buddies!", 3], [W(L, "three") - .1, null, 3]], TF(1290, 1062, .36, sixBoard(t, ST()))); };
SC.liz = (t, s) => { const L = "e1302"; return lizReveal(t, s, L, lakeView(t, { liz: 0 }, [1, 960, 540]), GD.lamp[0] - 2, GD.lamp[1] - LAMPH - 116, W(L, "is", 1) - .1, "Is it an insect?", 0, 180)
  + buddy("basil", 1760, 1060, 200, t, { aura: true, flip: true, in: s.t0 + .4, poses: [[s.t0, "sit"], [W(L, "insect") - .1, "cheer"]] }); };

/* ============ 14 · the cliffhanger: wings, at night ============ */
SC.cliff = (t, s) => { const L = "e1401", dk = ss(s.t0, s.t0 + 3.2, t), tW = W(L, "wings") - .2, tQ = W(L, "bird") - .2, tP = W(L, "find") - .1, e = eio((t - s.t0) / 3), cam = [lerp(1.02, 1.12, e), lerp(960, 1300, e), lerp(560, 420, e)];
  let bats = ""; for (let i = 0; i < 4; i++) { const t0 = tW - .6 + i * .45, u = (t - t0) / 4.2; if (u <= 0 || u > 1) continue; const x = lerp(1780 + 90 * (i % 2), 760 - 140 * i, u), y = lerp(250 + 40 * i, 170 + 50 * (i % 2), u) + 26 * Math.sin(u * 9 + i), k = lerp(.12, .22, u);
    bats += TF(x, y, k, `<g filter="url(#silF)">${fruitBat({ wings: 1, flap: t * 9 + i })}</g>`); }
  return lakeView(t, { dusk: dk, lampLit: ss(s.t0 + 1.5, s.t0 + 2.5, t), items: bats }, cam) + speeded(t, s.t0 + .1, s.t0 + 3.4)
    + ["pip", "basil", "momo"].map((w, i) => buddy(w, 190 + i * 250, 1062, 185, t, { aura: true, tag: false, in: s.t0 + .15 + i * .1, poses: [[s.t0, "sit"], [tW + .4, "surprised"], [tQ, w === "basil" ? "arms_crossed" : "thinking"]] })).join("")
    + popTag(t, tQ, 760, 520, "A bird?", 70, P.ink, "#fff")
    + (t >= tP ? TF(1380, 300, lerp(2.2, 1, eo((t - tP) / .16)) + .05 * wob(t, tP + .16, .4), `<text x="0" y="50" font-family="Fredoka" font-weight="700" font-size="170" text-anchor="middle" letter-spacing="6" fill="${P.sun}" stroke="${P.ink}" stroke-width="28" stroke-linejoin="round" paint-order="stroke" filter="url(#drop)">PART 2</text>`) : "") + HUD(t); };
SC.nyk = (t, s) => nykScene(t, s, TF(1000, 1046, .36, sixBoard(t, ST())));
})(); }
