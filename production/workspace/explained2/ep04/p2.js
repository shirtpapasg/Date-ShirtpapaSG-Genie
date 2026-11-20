// p2.js: PART 2, "No Flowers Today. Is It a FLOWERING Plant?": flowering and non-flowering plants. Segments 1-13 of p3_ep04_script.md.
if (PART === 2) { (() => {
const gP = (t, o = {}) => buddy("pip", 100, 1064, 160, t, { aura: true, tag: false, ...o }), gB = (t, o = {}) => buddy("basil", 590, 1064, 160, t, { aura: true, tag: false, ...o }), gM = (t, o = {}) => buddy("momo", 1790, 1064, 185, t, { aura: true, tag: false, flip: true, ...o });
const lizShow = (t, t0) => 1 - ramp(t, t0, .25) * (1 - ramp(t, t0 + 3.4, .2));
const gDim = (t, o = .4, g = {}) => gview(t, g) + `<rect width="1920" height="1080" fill="${P.night}" opacity="${o}"/>`;
const sunRay = (k, x = 1560, y = 210) => k < .02 ? "" : OP(Math.min(1, k) * .5, `<path d="M${x - 60} ${y - 30} L${FERN[0] - 240} ${FERN[1] - 60} L${FERN[0] + 180} ${FERN[1] + 120}z" fill="#FFE9A8" filter="url(#b30)"/>`) + TF(x, y, 2.6 * k, sunHeat());

/* ============ 1 · the silent recap montage: five shots from Part 1 ============ */
// the thumbnail's frame: the chilli plant large, left of centre, green chillies and no flowers; Momo far left; the sunny garden on the right
const THUMB2 = (t) => gview(t, { noCrate: true }, [1.75, 1010, 880]) + buddy("momo", 235, 620, 300, t, { aura: true, tag: false, pose: "thinking", still: true }) + logo(t);
SC.recap = (t, s) => { if (location.search.includes("thumb")) return THUMB2(t); const i = Math.min(4, Math.floor((t - s.t0) / 1.0)), u = t - s.t0 - i; let v;
  if (i === 0) v = fview(t, {});
  else if (i === 1) v = fview(t, { st: { 0: -9, 1: -9, 2: s.t0 + 1.25 }, inner: { 0: FULL[0], 1: FULL[1], 2: FULL[2] }, glow: { 2: pulse(t, s.t0 + 1.25, .05, .7) } }, [1.5, 1000, 1000]);
  else if (i === 2) { let b = ""; for (let k = 0; k < 16; k++) b += `<g transform="translate(${n2(120 + hash(k, 3) * 1700 + 30 * u)} ${n2(120 + hash(k, 5) * 860)}) rotate(${n2(hash(k, 7) * 360)}) scale(${n2(.7 + hash(k, 2) * 1.1)})">${[bRod, bRound, bSpiral][k % 3]()}</g>`; v = `<rect width="1920" height="1080" fill="#D9C8A4"/><rect width="1920" height="1080" fill="#8CC8E0" opacity=".45"/>${b}`; }
  else if (i === 3) v = fview(t, { st: ALLC, inner: FULL }, [1.3, 1000, 1000]);
  else v = bg("daystage") + TF(480, 1040, 1.5, crate4(0, 1, inCards(["tomato", "fern", "chilli"]))) + TF(1250, 1040, 1.3, bigPot(chilliPlant(t)));
  return v + `<rect width="1920" height="1080" fill="#fff" opacity="${n2(.5 * (1 - clamp(u / .18)))}"/>` + tpill(960, 60, "Part 1", 34, P.ink, P.sun, { w: 700, ls: 3 }); };

/* ============ 2 · "Last time..." ============ */
SC.lasttime = (t, s) => { const L = "d201", tN = W(L, "now") - .2, tP = W(L, "plants", 1) - .2, wi = ["plants", "animals", "fungi", "bacteria"].map((w) => W(L, w) - .1), k = spring(t, s.t0 + .3, .45) * (1 - eo((t - tN) / .25));
  const four = k < .02 ? "" : TF(1180, 1056, k, board(`<rect x="-400" y="-300" width="800" height="600" fill="#EAD9B8"/>` + [0, 1, 2, 3].map((i) => TF(-225 + i * 150, 100, .52 * (1 + .1 * pulse(t, wi[i], .05, .6)), crate4(i, 1, FULL[i], { glow: pulse(t, wi[i], .05, .6) }))).join(""), 700, 330, "lt4"));
  return gview(t, { items: glowDisc(PCR[0], PCR[1] - 110, 220, pulse(t, tP + .2, .2, 2)) }) + four + gP(t, { in: s.t0 + .1 }) + gB(t, { in: s.t0 + .2, poses: [[s.t0, "sit"], [tN, "cheer"], [tN + 1.8, "sit"]], nohop: true }) + gM(t, { in: s.t0 + .3 })
    + (t >= tN ? TF(960, 220, spring(t, tN, .45), lowerPill(-330, -31, "Community garden,", "Toa Payoh")) : "") + HUD(t); };

/* ============ 3 · today's goals, the game ============ */
SC.goals = (t, s) => goals3(t, s, [["What a flowering plant is", TF(0, 6, .62, hibiscus())], ["What a non-flowering plant is", TF(0, 62, .44, nestFern())], ["How each group makes new plants", TF(0, 4, .42, chilliCut())]]);
SC.game = (t, s) => gameScene(t, s, "d301", false);

/* ============ 4 · two groups of plants; Round 1: the chilli plant ============ */
SC.two = (t, s) => { const L = "d401", t1 = W(L, "flowering") - .2, t2 = W(L, "non-flowering") - .2;
  return gview(t, { noChilli: true, items: glowDisc(PCR[0], PCR[1] - 110, 220, pulse(t, LT(L) + .2, .2, 1.5)) }) + (t >= t1 ? TF(700, 1056, 1.35 * spring(t, t1, .45), groupSign("FLOWERING PLANTS", "gGreen")) : "") + (t >= t2 ? TF(1340, 1056, 1.35 * spring(t, t2, .45), groupSign("NON-FLOWERING PLANTS", "gBlue")) : "")
    + bookCap(t, L, "Plants can be classified into two groups: flowering plants and non-flowering plants.", 170, { size: 46, maxW: 1150 }) + gP(t) + gM(t) + HUD(t); };
SC.r1 = (t, s) => { const a = "d402", L = "d403", tQ = LT(L) - .15;
  return lockN(t, { cards: ["A flowering plant", "A non-flowering plant"], q: "Which group is the chilli plant in?", tq: W(L, "is") - .1, tc: [W(L, "one", 1), W(L, "two")], ring0: MK("ring0_1"), dur: 5, lock: "d404",
    obj: (tt) => `<ellipse cx="430" cy="624" rx="150" ry="26" fill="#6FCF72"/>` + TF(430, 622, .6, bigPot(chilliPlant(tt))),
    pre: (tt) => buddy("momo", 1380, 1056, 400, tt, { aura: true, flip: true, in: s.t0 + .1, out: tQ, poses: [[s.t0, "pointing"], [LT(a) - .12, "sit"]] }) + (tt < tQ ? say(a, 1300, 470, tt, { size: 46, tail: 120, x: true, maxW: 640 }) : ""),
    picks: [{ who: "momo", fixed: true, word: "2" }, { who: "basil", id: "d405", word: "1" }, { who: "pip", id: "d406", word: "1" }], react: [[LE("d405") + .1, "basil", "cheer"], [LE("d406") + .1, "pip", "pointing"]] }); };
const CAMG = [2.35, 905, 742];
SC.grow = (t, s) => { const a = "d407", b = "d408", c = "d409", t1 = MK("fl1"), tPet = W(b, "petals") - .1, tTiny = W(b, "tiny") - .1, tA = W(c, "one") - .1, tIn = W(c, "inside") - .2, lit = t >= tA ? spring(t, tA, .45) : 0;
  const fl = ss(t1, t1 + 1.2, t), dr = ss(tPet, tPet + 1.1, t), fr = ss(tTiny, tTiny + 2.4, t), day = t < t1 ? 1 : Math.round(lerp(1, 4, fl) + 3 * dr + 23 * fr), sx = camX(CAMG, CHP[0] + CSITE[0] + 4), sy = camY(CAMG, CHP[1] - 146 + CSITE[1] + 10);
  return gview(t, { chilli: { flower: fl, drop: dr, fruit: fr }, noCrate: true }, CAMG)
    + OP(pulse(t, t1 + .3, .3, 1.6) + pulse(t, tTiny + .4, .3, 1.6), `<circle cx="${n2(sx)}" cy="${n2(sy + 40)}" r="130" fill="none" stroke="${P.sun}" stroke-width="8" stroke-dasharray="16 12"/>`)
    + TF(190, 230, 1.15, dayCard(day)) + speeded(t, LT(a) + 1.2, tA - .3, 190, 370)
    + lab4(sx + 330, sy - 60, "a flower", sx + 40, sy + 8, spring(t, W(b, "small") - .1, .4) * (1 - ramp(t, tPet, .25)), 40) + lab4(sx + 330, sy + 130, "a fruit", sx + 24, sy + 110, spring(t, tTiny + 1.2, .4) * (1 - ramp(t, tIn - .2, .25)), 40)
    + (t >= tA ? TF(215, 880, .58 * spring(t, tA, .4), ansCard(1, "A flowering plant", { lit, w: 340 })) : "")
    + (t >= tIn ? TF(1430, 1050, spring(t, tIn, .45), board(`<rect x="-300" y="-300" width="600" height="600" fill="#F4E6CF"/>` + TF(10, 10, 1.25, chilliCut()), 500, 300, "cc")) + lab4(1560, 610, "seeds", 1400, 868, spring(t, tIn + .5, .4), 40) + finePrint(t, tIn + .3, "An adult cuts.", 1430, 1034) : "") + HUD(t); };
SC.lucky = (t, s) => { const b = "d411", tN = W(b, "no") - .1, tc = W("d412", "one", 1) - .1;
  return gview(t, { chilli: { fruit: 1 } }) + buddy("basil", 1330, 1060, 300, t, { aura: true, in: s.t0 + .1, poses: [[s.t0, "cheer"], [tN, "oops"], [tN + 2, "sit"]] }) + thought(t, s.t0 + .3, tN + .4, 1500, 560, "lucky 1!", { dir: -1, col: P.basil, size: 50 })
    + (t >= tN ? TF(1330, 640, spring(t, tN, .4), tpill(0, 0, "A lucky number is not a reason: no point", 34, P.ink, "#DDD3FF", { w: 600 })) : "") + gP(t, { poses: [[s.t0, "sit"], [tN + .3, "cheer"], [tN + 2, "sit"]] })
    + coin(t, tc, 960, 380, "+1", "if you showed one finger") + HUD(t); };
SCORE.push([W("d412", "one", 1) - .1, 1, 1]);

/* ============ 5 · flowering plants ============ */
const exRow = (t, t0, items, lab, col) => OP(ramp(t, t0, .4), items.map(([nm, pic], i) => `<g transform="translate(${880 + i * 330} 962)"><g filter="url(#dropS)"><rect x="-150" y="-62" width="300" height="124" rx="22" fill="#FFF8EA" stroke="${col}" stroke-width="5"/></g><g transform="translate(-96 0)">${pic}</g>${wrap(nm, 30, 170, 700).map((l, j, A) => T(48, 10 + (j - (A.length - 1) / 2) * 34, l, 30, P.ink)).join("")}</g>`).join("") + TF(1540, 962, 1, tpill(0, 0, lab, 30, col, "#fff", { w: 700 })));
SC.mark1 = (t, s) => markScene(t, s, { id: "d502", sayId: "d501", who: "pip", n: "1 of 2", text: "Flowering plants bear flowers. They reproduce from seeds. The flowers in flowering plants develop into fruits. The seeds are found in the fruits.", keys: ["flowers.", "seeds.", "seeds", "develop", "fruits."], size: 50, y: 176, w: 800, footer: "P3 · Diversity · Classification of living things",
  extra: exRow(t, LE("d502") + .2, [["hibiscus", TF(0, 6, .34, hibiscus())], ["water hyacinth", TF(0, 46, .3, hyacinth())]], "also flowering plants", GROUPS[0][2]) });

/* ============ 6 · the fern ============ */
const CAMF = [1.25, 1300, 700];
SC.fern = (t, s) => { const a = "d601", b = "d602", tB = W(b, "birds") - .2, tLk = W(b, "look") - .2, dive = ei((t - (s.t1 - .55)) / .55), lf = [FERN[0] + 120, FERN[1] - 120], cam = [CAMF[0] + 2.8 * dive, lerp(CAMF[1], lf[0], dive), lerp(CAMF[2], lf[1], dive)];
  return gview(t, { liz: lizShow(t, LT(a) + .2) }, cam)
    + OP(1 - dive, buddy("momo", 1650, 1056, 290, t, { aura: true, flip: true, in: s.t0 + .1, poses: [[s.t0, "thinking"], [LT(a) - .12, "sit"], [LE(a) + .1, "thinking"], [tLk, "pointing"]] }) + say(a, 1560, 300, t, { size: 46, tail: 60, maxW: 560 })
      + lab4(700, 300, "bird's nest fern", camX(cam, FERN[0] - 90), camY(cam, FERN[1] - 110), spring(t, tB, .4) * (1 - ramp(t, tLk + 1.2, .3)), 44)
      + (t >= tLk ? TF(camX(cam, lf[0]) + 8, camY(cam, lf[1]) - 20 - 10 * Math.sin(t * 3), spring(t, tLk, .4) * .7, `<g transform="rotate(18)">${pointer()}</g>`) : "") + HUD(t))
    + wipe(t, s.t1, "#DDF1D2", camX(cam, lf[0]), camY(cam, lf[1])); };

/* ============ 7 · the reveal: non-flowering plants ============ */
const underBoard = (k, lb = 1) => TF(480, 1050, k, board(`<rect x="-400" y="-300" width="800" height="600" fill="#CFE6C6"/><g transform="translate(-290 20) rotate(90) scale(2.3)">${nfUnder(250, 40)}</g>`, 700, 320, "ub")) + (lb ? lab4(640, 600, "spore bags", 500, 852, lb, 40) : "");
SC.reveal = (t, s) => { const a = "d701", e = eo((t - s.t0) / 1.0), cam = [lerp(4.0, CAMF[0], e), lerp(FERN[0] + 120, CAMF[1], e), lerp(FERN[1] - 120, CAMF[2], e)], tS = W(a, "spores") - .2, tx = [W(a, "no") - .1, W(a, "no", 1) - .1];
  return gview(t, { noCrate: true, noChilli: true }, cam) + (t >= tS ? underBoard(spring(t, tS, .45), spring(t, W(a, "spore") - .1, .4)) : "")
    + ["flowers", "seeds"].map((w, i) => t >= tx[i] && t < tS + .2 ? TF(520 + i * 330, 330, spring(t, tx[i], .4) * (1 - ramp(t, tS - .1, .25)), tpill(34, 0, "no " + w, 44, "#fff", P.ink, { w: 700 }) + TF(-tw("no " + w, 44, 600) / 2 - 20, 0, 1, xBadge(30))) : "").join("")
    + buddy("momo", 1650, 1056, 290, t, { aura: true, flip: true, in: s.t0 + .5, poses: [[s.t0, "sit"], [tS, "surprised"], [tS + 1.8, "sit"]] }) + wipe(t, s.t0, "#DDF1D2") + HUD(t); };
SC.mark2 = (t, s) => markScene(t, s, { id: "d703", sayId: "d702", who: "momo", n: "2 of 2", text: "Non-flowering plants do not bear flowers. They reproduce from spores that may be found in spore bags.", keys: ["not", "flowers.", "spores", "spore", "bags."], size: 56, y: 206, w: 800, footer: "P3 · Diversity · Classification of living things",
  extra: exRow(t, LE("d703") + .2, [["bird’s nest fern", TF(0, 40, .22, nestFern())], ["water clover", TF(10, 44, .36, waterClover())]], "non-flowering plants", GROUPS[3][2]) });
SC.fungus = (t, s) => { const a = "d704", b = "d705", tM = W(a, "mushrooms") - .2, tF = W(b, "makes") - .2, tPl = W(b, "plant") - .1;
  return gview(t, { noChilli: true }, [1.08, 1100, 800]) + sunRay(spring(t, tF, .5), 760, 180) + (t >= tF ? leafSparkles(t, camX([1.08, 1100, 800], FERN[0]), camY([1.08, 1100, 800], FERN[1] - 120), 200, 110, 9, 3) : "")
    + buddy("basil", 420, 1060, 300, t, { aura: true, in: s.t0 + .1, poses: [[s.t0, "thinking"], [LT(a) - .12, "sit"], [LE(a) + .1, "thinking"], [tPl, "cheer"]], nohop: true }) + say(a, 640, 420, t, { size: 46, tail: -200, x: true, maxW: 600 })
    + (t >= tM && t < tF ? TF(760, 900, spring(t, tM, .45) * (1 - ramp(t, tF - .3, .25)), board(grassPic + TF(0, 120, 1.3, mushroom()), 300, 280, "fm", { lab: "a fungus", size: 34 })) : "")
    + (t >= tF + .5 ? TF(800, 360, spring(t, tF + .5, .4), tpill(0, 0, "makes its own food", 42, P.sun, P.ink, { w: 700 })) : "") + (t >= tPl ? TF(800, 470, spring(t, tPl, .45), tpill(0, 0, "a plant", 50, GROUPS[0][1], "#fff", { w: 700, ls: 2 })) : "") + HUD(t); };

/* ============ 8 · Showdown: Pip's plant notes ============ */
const NT = [1040, 1052, .8], GRN = GROUPS[0][2], BLU = GROUPS[3][2];
const NPICS = (g) => [TF(-10, 50, .92, hibiscus()), TF(0, 120, .56, nestFern()), TF(0, 140, 1.7, grassTuft(g, { n: 18, h: 64 }))];
const showView = (t, o = {}) => gDim(t, .3, { noChilli: true, noCrate: true }) + TF(NT[0], NT[1], NT[2], noteBoard(t, { title: "PIP’S PLANT NOTES", ...o }));
SC.show = (t, s) => { const a = "d801", b = "d802", c = "d803", r0 = MK("ring0_2"), bell = MK("bell_2"), rs = ringState(t, r0, 6);
  const tr = [W(b, "one"), W(b, "two"), W(b, "three")], tcn = [W(c, "one", 1), W(c, "two"), W(c, "three")], tP = LT("d805"), tM = LT("d806"), tO = LT("d807"), tg = [W(b, "flowering"), W(b, "non-flowering"), W(b, "non-flowering", 1)].map((x) => x - .1);
  const lit = [0, 1, 2].map((i) => Math.max(t < LT(c) ? (t >= tr[i] - .1 && t < (tr[i + 1] || LE(b)) - .1 ? 1 : 0) : 0, pulse(t, tcn[i], .04, .5), t >= r0 && t < bell ? (Math.floor((t - r0) / .5) % 3 === i ? .5 + .5 * rs.tick : 0) : 0));
  const nf = t >= tcn[2] - .1 ? 3 : t >= tcn[1] - .1 ? 2 : 1, ringOn = t >= tcn[0] - .3 && t < bell + .8, RX = 255, RY = 760;
  return showView(t, { pics: NPICS(0), lit, marks: [null, null, t >= tP + .5 ? ["x", spring(t, tP + .5, .4)] : null], tags: [["flowering plant", GRN, spring(t, tg[0], .4)], ["non-flowering plant", BLU, spring(t, tg[1], .4)], ["non-flowering plant", BLU, spring(t, tg[2], .4)]] })
    + buddy("pip", 1745, 1060, 250, t, { aura: true, flip: true, in: s.t0 + .1, poses: [[s.t0, "cheer"], [LT(a) - .12, "sit"], [LE(b) + .2, "arms_crossed"], [tO - .12, "oops"]], nohop: true }) + say(a, 1600, 600, t, { size: 46, tail: 110 }) + say("d807", 1640, 620, t, { size: 56, tail: 100 })
    + (ringOn ? OP(1 - ss(bell + .5, bell + .8, t), TF(RX, RY, spring(t, tcn[0] - .3, .4), `<g transform="translate(${-RX} ${-RY})">${ringTimer(RX, RY, t < r0 ? 1 : rs.frac, t < r0 ? 6 : rs.secs, t, { R: 128, sw: 22, tick: rs.tick, shut: pulse(t, bell, .01, .6), inner: TF(RX, RY + 60, .62, countHand(nf)) })}</g>`) + youPill(RX, RY - 178, 1.0) + tpill(RX, RY + 222, "line 1, 2 or 3?", 30, P.ink, "#fff")) : "")
    + (t >= bell + .9 ? buddy("basil", 150, 1062, 200, t, { aura: true, in: bell + .9, poses: [[bell + .9, "arms_crossed"], [tP - .12, "sit"], [LE("d805") + .1, "cheer"]], nohop: true }) + pickNum("basil", 290, 990, t, tP - .1, "3") + buddy("momo", 420, 1062, 200, t, { aura: true, in: bell + 1.0, poses: [[bell + 1, "thinking"], [tM - .12, "sit"], [LE("d806") + .1, "cheer"]], nohop: true }) + pickNum("momo", 560, 990, t, tM - .1, "3")
      + say("d805", 290, 720, t, { size: 38, tail: -110, maxW: 440 }) + say("d806", 300, 760, t, { size: 40, tail: 130, maxW: 400 }) : "")
    + stamp(t, LT("d804") - .08, 960, 480) + bellIcon(t, r0) + HUD(t); };
SC.fixed = (t, s) => { const a = "d808", b = "d809", tc = W("d810", "two") - .1, tT = W(a, "tiny") - .2, tCut = W(a, "cuts") - .2, tFx = LT(b) + .1, g = ss(tT, tT + 1.2, t) * (1 - ss(tCut, tCut + .5, t)), cutX = lerp(-260, 260, clamp((t - tCut) / .6));
  const strip = `<rect x="-400" y="-300" width="800" height="600" fill="#CFEBFF"/><rect x="-400" y="110" width="800" height="300" fill="#8FDB7A"/>` + [-150, 0, 150].map((x, i) => TF(x, 120, 1.25, grassTuft(g, { seed: 3 + i, n: 14, h: 60 }))).join("")
    + (t >= tCut && t < tCut + .7 ? `<g transform="translate(${n2(cutX)} 40)"><circle r="46" fill="none" stroke="#5E6788" stroke-width="7" stroke-dasharray="12 10" transform="rotate(${n2(t * 900)})"/><rect x="-8" y="-200" width="16" height="200" rx="7" fill="#F08A24" stroke="#C0620C" stroke-width="4"/></g>` : "");
  return showView(t, { pics: NPICS(t >= tFx ? ss(tFx, tFx + .8, t) : 0), marks: [null, null, t >= tFx + .6 ? ["tick", spring(t, tFx + .6, .4)] : ["x", 1]], tags: [["flowering plant", GRN, 1], ["non-flowering plant", BLU, 1], t >= tFx ? ["flowering plant", GRN, spring(t, tFx, .4)] : ["non-flowering plant", BLU, 1 - .15 * ramp(t, tFx - .5, .4)]] })
    + TF(250, 1052, spring(t, s.t0 + .2, .45), board(strip, 440, 420, "gs", { lab: t >= tCut + .5 ? "cut before we see them" : t >= tT ? "tiny flowers" : "grass", size: 32 }))
    + buddy("pip", 1745, 1060, 250, t, { aura: true, flip: true, poses: [[s.t0, "sit"], [LE(b) + .1, "cheer"], [LE(b) + 2, "sit"]], nohop: true }) + say(b, 1560, 600, t, { size: 46, tail: 160, maxW: 520 })
    + coin(t, tc, 620, 420, "+2", "if you showed three fingers") + HUD(t); };
SCORE.push([W("d810", "two") - .1, 3, 2]);

/* ============ 9 · the chant ============ */
SC.chant = (t, s) => chantScene(t, s, "ch01", { sayId: "u1002" });

/* ============ 10 · score hand, the lizard ============ */
SC.final = (t, s) => { const L = "d1001"; return finalScene(t, s, L, 2, [[s.t0, null, 1], [W(L, "more") - .1, "More than two? You beat the Buddies!", 3], [W(L, "three") - .1, null, 3]], TF(1270, 1062, .6, crate4(0, 1, FULL[0]))); };
SC.liz = (t, s) => { const L = "d1002"; return lizReveal(t, s, L, gview(t, { liz: 0, noChilli: true }), TREE[0] - 4, TREE[1] - 170, W(L, "does") - .1, "A seed, a spore or an egg?", -230); };

/* ============ 11 · your turn; the dare for Episode 5 ============ */
SC.tryit = (t, s) => { const L = "d1101", tw_ = [W(L, "flowering") - .1, W(L, "non-flowering") - .1, W(L, "look") - .1, W(L, "pick") - .3], tB = W(L, "find") - .2;
  const pics = [TF(0, 4, .5, hibiscus()), TF(0, 60, .36, nestFern()), `<ellipse cx="0" cy="0" rx="74" ry="46" fill="#fff" stroke="${P.ink}" stroke-width="7"/><circle r="28" fill="#5B7BD6"/><circle r="13" fill="${P.ink}"/><circle cx="8" cy="-8" r="5" fill="#fff"/>`,
    TF(-20, 50, .34, hibiscus()) + `<g transform="translate(46 -24) rotate(120) scale(.5)" fill="${SKIN}" stroke="${SKIN2}" stroke-width="8"><rect x="-70" y="-34" width="92" height="76" rx="30"/><rect x="-10" y="-34" width="80" height="34" rx="17"/></g>` + TF(-92, -56, 1, xBadge(24))], caps = ["flowering", "non-flowering", "Look.", "Do not pick."];
  let grid = ""; pics.forEach((p, i) => { const k = spring(t, tw_[i], .4), lit = pulse(t, tw_[i], .05, 1.0), x = -150 + (i % 2) * 300, y = -440 + Math.floor(i / 2) * 225; if (k > .02) grid += `<g transform="translate(${x} ${y}) scale(${n2(k * (1 + .05 * lit))})">${lit > .05 ? `<rect x="-140" y="-102" width="280" height="204" rx="26" fill="${P.sun}" opacity="${n2(.85 * lit)}" filter="url(#b10)"/>` : ""}<rect x="-132" y="-94" width="264" height="188" rx="20" fill="#EAF6E0" stroke="#C9D2E8" stroke-width="5"/>${p}${T(0, 84, caps[i], 28, P.ink, { w: 600 })}</g>`; });
  const brd = `<ellipse cx="0" cy="4" rx="300" ry="16" fill="${P.ink}" opacity=".22" filter="url(#b4)"/><path d="M-200 0 V-120 M200 0 V-120" stroke="#8A5A36" stroke-width="18" stroke-linecap="round"/><g filter="url(#drop)"><rect x="-330" y="-660" width="660" height="580" rx="28" fill="url(#gPaper)" stroke="#8A5A36" stroke-width="8"/></g><g filter="url(#dropS)"><rect x="-150" y="-696" width="300" height="76" rx="38" fill="url(#gSun)"/></g>${T(0, -640, "TRY IT", 50, P.ink, { ls: 8 })}` + grid;
  return gview(t, { noCrate: true, noChilli: true }) + TF(440, 1050, spring(t, tB, .5), brd) + gM(t, { poses: [[s.t0, "cheer"], [s.t0 + 1.8, "sit"]], nohop: true }) + buddy("basil", 900, 1064, 180, t, { aura: true, tag: false, in: s.t0 + .2 }) + HUD(t); };
SC.dare = (t, s) => { const L = "d1102", tw_ = [W(L, "frog") - .2, W(L, "bird") - .2, W(L, "fish") - .2], tc = [W(L, "feathers") - .1, W(L, "scales") - .1, W(L, "moist") - .1], tN = W(L, "lock") - .1;
  const pics = [`<rect x="-300" y="-300" width="600" height="600" fill="#CFEBFF"/><rect x="-300" y="60" width="600" height="300" fill="#8FDB7A"/>` + TF(0, 110, 1.25, frog()), `<rect x="-300" y="-300" width="600" height="600" fill="#CFEBFF"/><rect x="-300" y="90" width="600" height="300" fill="#8FDB7A"/>` + TF(0, 40, 1.7, GT.mynah()), `<rect x="-300" y="-300" width="600" height="600" fill="#8CC8F0"/><circle cx="-90" cy="-70" r="12" fill="#fff" opacity=".6"/><circle cx="-60" cy="-110" r="8" fill="#fff" opacity=".6"/>` + TF(10, 10, 1.35, fish())];
  return bg("daystage") + pics.map((p, i) => { const k = spring(t, tw_[i], .45); return k < .02 ? "" : TF(430 + i * 530, 960, k, board(p, 440, 400, "da" + i)); }).join("")
    + (t < tN ? ["FEATHERS?", "SCALES?", "MOIST SKIN?"].map((w, i) => t >= tc[i] ? TF([650, 950, 1270][i], 330, spring(t, tc[i], .45), tpill(0, 0, w, 48, P.sun, P.ink, { w: 700, ls: 2 })) : "").join("") : "")
    + (t >= tN ? TF(960, 300, lerp(1.6, 1, eo((t - tN) / .16)) + .04 * wob(t, tN + .16, .4), `<g filter="url(#drop)"><rect x="-560" y="-110" width="1120" height="220" rx="50" fill="${P.ink}"/></g>${T(0, -28, "NEXT", 50, P.sun, { ls: 12 })}${T(0, 58, "Feathers, scales or moist skin?", 56, "#fff")}`) : "")
    + buddy("basil", 150, 1062, 190, t, { aura: true, tag: false, in: s.t0 + .1, poses: [[s.t0, "sit"], [tc[1], "cheer"], [tc[1] + 1.8, "sit"]], nohop: true }) + buddy("momo", 1780, 1062, 190, t, { aura: true, tag: false, flip: true, in: s.t0 + .2, poses: [[s.t0, "sit"], [tN, "thinking"]] }) + HUD(t); };
SC.nyk = (t, s) => nykScene(t, s, TF(700, 1040, .7, bigPot(chilliPlant(t, { fruit: 1 }))) + TF(940, 1040, .62, crate4(0, 1, FULL[0])));
})(); }
