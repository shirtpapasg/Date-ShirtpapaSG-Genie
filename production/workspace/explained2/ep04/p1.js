// p1.js: PART 1, "Millions of Living Things. Only 4 Groups?": why scientists classify, the four main groups. Segments 1-13 of p3_ep04_script.md.
if (PART === 1) { (() => {
const bP = (t, o = {}) => buddy("pip", 105, 1062, 170, t, { aura: true, tag: false, ...o }), bB = (t, o = {}) => buddy("basil", 312, 1062, 180, t, { aura: true, tag: false, ...o }), bM = (t, o = {}) => buddy("momo", 1775, 1062, 190, t, { aura: true, tag: false, flip: true, ...o });
const fly = (t) => TF(1500 + 30 * Math.sin(t * 1.3), 500 + 16 * Math.sin(t * 2.1), .62, `<g transform="scale(${n2(.6 + .4 * Math.abs(Math.sin(t * 9)))} 1)">${GT.butterfly()}</g>`);
const OPEN3 = { 0: -9, 1: -9, 2: -9 }, IN3 = { 0: FULL[0], 1: FULL[1], 2: FULL[2] };
const lens = (t, k = 1) => TF(1700, 1052, .8 * k, lensStand([0, 1, 2, 3, 4].map((i) => TF(-60 + hash(i, 3) * 120 + 5 * Math.sin(t * .9 + i), -50 + hash(i, 5) * 110 + 4 * Math.cos(t * .7 + i), .5, `<g transform="rotate(${n2(hash(i, 7) * 180 + 8 * Math.sin(t * .5 + i))})">${[bRod, bRound, bSpiral][i % 3]()}</g>`)).join("")));

/* ============ 1 · the silent cold open: the farm in Kranji; four crates slide in ============ */
const THUMB1 = (t) => fview(t, { nocr: true, front: [0, 1, 2, 3].map((i) => TF(560 + i * 230, 1010, .78, crate4(i, 0))).join("") + fly(t) }, [1.32, 420, 1000]) + buddy("basil", 250, 640, 300, t, { aura: true, tag: false, pose: "surprised", still: true }) + logo(t);
SC.cold = (t, s) => { if (location.search.includes("thumb")) return THUMB1(t); const tb = MK("coldCard"), z = 1 + .05 * eio(t / 7); let cr = "";
  CRX.forEach((x, i) => { const t0 = .6 + i * .4; if (t < t0) return; const [cx, d] = slideX(t, t0, .5, 2250 + i * 60, x, CRY); cr += d + TF(cx, CRY, 1, crate4(i, 0)); });
  return fview(t, { nocr: true, front: fly(t) + cr }, [z, 960, 760])
    + bB(t, { in: tb, poses: [[tb, "surprised"], [tb + 1.8, "sit"]] }) + bP(t, { in: tb + .5, poses: [[tb + .5, "pointing"], [tb + 2, "sit"]] }) + bM(t, { in: tb + 1.0, poses: [[tb + 1, "waving"], [tb + 2.6, "sit"]], wave: true })
    + OP(1 - ramp(t, tb - .4, .3), lowerPill(60, 60, "A farm in Kranji,", "Singapore")); };

/* ============ 2 · the callback to the dare, the title ============ */
const GUESS = ["BIG?", "SMALL?", "GREEN?", "SCARY?"];
SC.callback = (t, s) => { const a = "c201", b = "c202", tF = W(a, "four") - .1, gl = {}, tw_ = [W(b, "big"), W(b, "small"), W(b, "green"), W(b, "scary")]; CRX.forEach((x, i) => { gl[i] = pulse(t, tF + i * .22, .05, .7); });
  return fview(t, { glow: gl, front: fly(t) }) + GUESS.map((g, i) => thought(t, tw_[i] - .1, LE(b) + .9, CRX[i] - 10, 720, g, { dir: 1, col: P.basil, size: 44 })).join("")
    + bP(t) + bB(t, { poses: [[s.t0, "sit"], [LT(b) - .5, "cheer"], [LT(b) - .12, "sit"]], nohop: true }) + bM(t) + say(b, 470, 440, t, { size: 46, tail: -150, x: true, maxW: 560 })
    + OP(ramp(t, W(a, "millions") - .1, .3) * (1 - ramp(t, tF - .3, .3)), TF(960, 300, 1, tpill(0, 0, "Millions of kinds of living things", 54, P.ink, "#fff", { w: 700 }))) + (t >= tF ? OP(1 - ramp(t, LT(b) - .2, .3), TF(960, 300, spring(t, tF, .4), tpill(0, 0, "Only 4 groups?", 64, P.sun, P.ink, { w: 700 }))) : ""); };
SC.title = (t, s) => { const u = t - s.t0, a = (d) => { const k = clamp((u - d) / .16); return k <= 0 ? 0 : lerp(2.4, 1, eo(k)) + .05 * wob(u, d + .16, .4); }, L = "c203", k1 = a(.1), k2 = a(.45), k3 = a(W(L, "is") - s.t0);
  const ln = (y, txt, size, col, k, ls = 6) => k ? `<g transform="translate(960 ${y}) scale(${n2(k)})"><g transform="translate(0 8)" opacity=".85">${T(0, 0, txt, size, P.ink, { ls })}</g>${T(0, 0, txt, size, col, { ls })}</g>` : "";
  return fview(t, {}, [1.05 + .04 * clamp(u / 6), 960, 800]) + `<rect width="1920" height="1080" fill="${P.night}" opacity="${n2(.66 * clamp(u / .2))}"/>`
    + ln(250, "MILLIONS OF", 150, "#fff", k1, 4) + ln(420, "LIVING THINGS.", 150, "#fff", k2, 4) + ln(630, "ONLY 4 GROUPS?", 180, P.sun, k3)
    + (t >= W(L, "did") - .1 ? TF(960, 780, spring(t, W(L, "did") - .1, .45), tpill(0, 0, "Did you lock in your four?", 44, P.ink, "#fff", { w: 600 })) : "") + OP(clamp((u - .2) / .3), logo(t)); };
SC.game = (t, s) => gameScene(t, s, "c301", true);

/* ============ 4 · why scientists classify ============ */
const stack = () => [0, 1, 2, 3].map((i) => TF(1640 + (i % 2) * 160, i < 2 ? 1052 : 1052 - 108, .58, crate4(i, 0))).join("");
const BIGC = ["hen", "cat", "tomato", "fern", "mushroom"], X0 = [440, 690, 940, 1190, 1440], X1 = [900, 1090, 430, 620, 1400], REAL = [[FARM.nest[0], FARM.nest[1] - 110, 230], [FARM.cat[0], FARM.cat[1] - 50, 170], [FARM.bed[0], FARM.bed[1] - 90, 230], [FARM.fern[0] + 60, FARM.fern[1] - 110, 200], [900, 870, 130]];
SC.why = (t, s) => { const a = "c401", b = "c402", c = "c403", tw_ = [W(a, "hen"), W(a, "cat"), W(a, "tomato"), W(a, "fern"), W(a, "mushroom")].map((x) => x - .15), tS = W(c, "look") - .2, tG = W(c, "different") + .5; let cards = "", gl = "";
  BIGC.forEach((n, i) => { if (t < tw_[i]) return; gl += glowDisc(REAL[i][0], REAL[i][1], REAL[i][2], pulse(t, tw_[i], .1, 1.1)); const [x, d] = slideX(t, tS + i * .12, .7, X0[i], X1[i], 1050), k = spring(t, tw_[i], .45);
    cards += d + TF(x, 1050, 1.55 * k, `<ellipse cx="0" cy="3" rx="56" ry="8" fill="${P.ink}" opacity=".25"/><g transform="rotate(${n2((t < tS ? [-5, 4, -3, 6, -4][i] : 0) + 3 * wob(t, tw_[i], .5))})">${pcard(ICON[n]())}</g>`); });
  const under = (x0, x1, k) => k < .02 ? "" : `<path d="M${x0} 1066 H${n2(lerp(x0, x1, Math.min(1, k)))}" stroke="${P.sun}" stroke-width="12" stroke-linecap="round"/>`, kg = ramp(t, tG, .4);
  return fview(t, { nocr: true, wall: gl, front: stack() + cards }) + under(350, 700, kg) + under(820, 1170, kg) + under(1320, 1480, kg)
    + (t >= tG ? TF(1400, 800, spring(t, tG + .3, .4), `<circle r="34" fill="url(#gSun)" stroke="#fff" stroke-width="4"/>${T(0, 16, "?", 48, P.ink)}`) : "")
    + (t >= W(c, "same") - .2 ? TF(700, 300, spring(t, W(c, "same") - .2, .4) * (1 - ramp(t, s.t1 - .3, .2)), tpill(0, 0, "What is the same?", 46, P.ink, "#fff", { w: 700 })) + TF(1220, 300, spring(t, W(c, "different") - .2, .4) * (1 - ramp(t, s.t1 - .3, .2)), tpill(0, 0, "What is different?", 46, P.ink, P.sun, { w: 700 })) : "")
    + bP(t, { in: s.t0 + .1, poses: [[s.t0, "thinking"], [LT(b) - .12, "sit"], [LE(b) + .1, "pointing"], [tS + 1.5, "sit"]] }) + say(b, 330, 640, t, { size: 44, tail: -170, maxW: 520 }) + HUD(t); };
SC.mark1 = (t, s) => markScene(t, s, { id: "c405", sayId: "c404", who: "momo", n: "1 of 2", text: "The grouping of living things based on their similarities and differences is called classification.", keys: ["grouping", "similarities", "differences", "classification."], size: 64, y: 256, footer: "P3 · Diversity · Classification of living things" });

/* ============ 5 · today's goals ============ */
SC.goals = (t, s) => goals3(t, s, [["Why scientists classify living things", TF(-52, 62, .78, `<g transform="rotate(-6)">${pcard(ICON.hen())}</g>`) + TF(52, 62, .78, `<g transform="rotate(6)">${pcard(ICON.fern())}</g>`)],
  ["The four main groups of living things", TF(0, 70, .6, crate4(3, 0)).replace(/<g transform="translate\(-104 -170\)">.*?<\/g>/, "")], ["What makes a plant a plant", TF(0, 62, .4, tomatoPlant(1, { fruit: true }))]]);

/* ============ 6 · Round 1: where does a mushroom go? ============ */
SC.r1 = (t, s) => { const L = "c601";
  return lockN(t, { cards: ["With the plants", "With the animals", "In a group of its own"], q: "Where does a mushroom go?", tq: W(L, "so") - .1, tc: [W(L, "one", 2), W(L, "two", 1), W(L, "three")], ring0: MK("ring0_1"), dur: 5, lock: "c602",
    obj: (tt) => `<ellipse cx="430" cy="600" rx="150" ry="34" fill="#6FCF72"/>` + TF(430, 596, 1.35, mushroom()),
    picks: [{ who: "momo", id: "c603", word: "1", x: true }, { who: "basil", id: "c604", word: "2", x: true }, { who: "pip", id: "c605", word: "3" }], react: [[LE("c603") + .1, "momo", "pointing"], [LE("c604") + .1, "basil", "arms_crossed"], [LE("c605") + .1, "pip", "pointing"]] }); };
SC.open3 = (t, s) => { const a = "c606", tA = W(a, "three") - .1, tN = W(a, "not") - .1, tF = W(a, "fungi") - .2, tc = W("c607", "one") - .1, hopT = tA + .5, u = clamp((t - hopT) / .45), inn = u >= 1;
  const card = inn ? "" : TF(CRX[2] - 150 + 150 * eio(u), CRY - (220 * Math.sin(Math.PI * u) + 150 * u), lerp(1.3, .92, u), pcard(ICON.mushroom()));
  return fview(t, { st: { 0: -9, 1: -9, 2: tA }, inner: { 0: FULL[0], 1: FULL[1], 2: inn ? FULL[2] : "" }, glow: { 2: pulse(t, tA, .05, 1.2) + .5 * pulse(t, tF, .1, 1.5) }, front: card })
    + (t >= tN && t < tF + .3 ? TF(1140, 620, spring(t, tN, .4) * (1 - ramp(t, tF, .25)), tpill(0, 0, "does not make its own food", 40, "#fff", P.ink, { w: 700 })) : "")
    + bP(t, { poses: [[s.t0, "sit"], [tA, "cheer"], [tA + 1.8, "sit"]] }) + bB(t, { poses: [[s.t0, "sit"], [tA, "surprised"], [tA + 1.8, "sit"]] }) + bM(t, { poses: [[s.t0, "sit"], [tA, "oops"], [tA + 1.8, "sit"]] })
    + coin(t, tc, 960, 420, "+1", "if you showed three fingers") + (t >= tc + .7 ? TF(1560, 160, spring(t, tc + .7, .4), tpill(0, 0, "Buddies: Pip scores", 28, P.ink, "#DDD3FF", { w: 600 })) : "") + HUD(t); };
SCORE.push([W("c607", "one") - .1, 1, 1]);

/* ============ 7 · crate four ============ */
SC.crate4 = (t, s) => { const a = "c701", b = "c702", c = "c703", tw_ = [W(a, "plants"), W(a, "animals"), W(a, "fungi")].map((x) => x - .1), t4 = W(a, "four") - .2, dive = ei((t - (s.t1 - .55)) / .55), cam = [1 + 3.2 * dive, lerp(960, CRX[3], dive), lerp(540, CRY - 190, dive)];
  return fview(t, { st: OPEN3, inner: { ...IN3, 3: t >= t4 ? OP(ramp(t, t4, .3), soilHeap()) : "" }, glow: { 0: pulse(t, tw_[0], .05, .6), 1: pulse(t, tw_[1], .05, .6), 2: pulse(t, tw_[2], .05, .6), 3: pulse(t, t4, .05, 1.2) } }, cam)
    + OP(1 - dive, bP(t) + buddy("momo", 312, 1062, 180, t, { aura: true, tag: false })
      + buddy("basil", 1745, 1062, 240, t, { aura: true, flip: true, in: s.t0 + .1, poses: [[s.t0, "sit"], [t4, "surprised"], [LT(b) - .12, "sit"], [LE(b) + .1, "arms_crossed"], [W(c, "shrink") - .1, "surprised"]] }) + say(b, 1500, 600, t, { size: 46, tail: 150, x: true, maxW: 520 })
      + (t >= W(c, "much") - .1 ? TF(CRX[3] + 6, CRY - 250 - 10 * Math.sin(t * 3), spring(t, W(c, "much") - .1, .4) * .7, `<g transform="rotate(8)">${pointer()}</g>`) : "") + HUD(t))
    + wipe(t, s.t1, "#4A3220", camX(cam, CRX[3]), camY(cam, CRY - 190)); };

/* ============ 8 · the reveal: bacteria; four main groups ============ */
SC.reveal = (t, s) => { const a = "c801", b = "c802", e = eo((t - s.t0) / 1.0), cam = [lerp(3.2, 1, e), lerp(CRX[3], 960, e), lerp(CRY - 190, 540, e)], tB = W(a, "bacteria") - .15;
  return fview(t, { st: { ...OPEN3, 3: tB }, inner: FULL, glow: { 3: pulse(t, tB, .05, 1.4) } }, cam) + (t >= s.t0 + .8 ? lens(t, spring(t, s.t0 + .8, .5)) : "")
    + bP(t, { in: s.t0 + .5, poses: [[s.t0, "sit"], [tB, "cheer"], [tB + 1.8, "sit"]] }) + bB(t, { in: s.t0 + .6, poses: [[s.t0, "sit"], [tB, "surprised"], [tB + 1.8, "sit"]] })
    + bookCap(t, b, "Bacteria are tiny living things and they come in different shapes and sizes.", 170, { size: 46, maxW: 1000, x: 800 }) + wipe(t, s.t0, "#4A3220") + HUD(t); };
SC.mark2 = (t, s) => { const id = "c805", wi = [9, 10, 11, 13];
  const row = GROUPS.map(([nm, col], i) => { const tw0 = TL.lines[id].words[wi[i]].a, on = t >= tw0 - .05, k = 1 + .18 * pulse(t, tw0, .04, .5); return `<g transform="translate(${790 + i * 240} 940) scale(${n2(k)})" opacity="${on ? 1 : .3}"><g filter="url(#dropS)"><rect x="-108" y="-36" width="216" height="72" rx="18" fill="${col}" stroke="#fff" stroke-width="5"/></g>${T(0, 13, nm, nm.length > 7 ? 33 : 38, "#fff", { ls: 1 })}</g>`; }).join("");
  return markScene(t, s, { id, sayId: "c804", who: "pip", n: "2 of 2", text: "Living things can be classified into four main groups: plants, animals, fungi and bacteria.", keys: ["four", "main", "groups:", "plants,", "animals,", "fungi", "bacteria."], size: 66, y: 300, footer: "P3 · Diversity · Classification of living things", extra: row }); };
SC.notsize = (t, s) => { const b = "c806", c = "c807", tS = W(c, "size") - .1;
  return fview(t, { st: ALLC, inner: FULL }) + lens(t) + bP(t) + bB(t, { poses: [[s.t0, "thinking"], [LT(b) - .12, "sit"], [LE(b) + .1, "thinking"], [tS + .6, "oops"], [tS + 2.2, "sit"]] }) + say(b, 470, 620, t, { size: 46, tail: -150, maxW: 560 })
    + (t >= tS ? TF(960, 300, spring(t, tS, .4), tpill(0, 0, "Size and colour do not decide the group.", 46, P.ink, "#fff", { w: 700 })) : "") + HUD(t); };

/* ============ 9 · what makes a plant a plant; animals ============ */
SC.plant = (t, s) => { const b = "c902", PX = 520, PY = 800, K = 1.3, X = (d) => PX + d * K, Y = (d) => PY + d * K, tl = [s.t0 + .5, s.t0 + .75, W(b, "leaves") - .1, W(b, "stems") - .1, W(b, "roots") - .1], tLt = W(b, "light") - .5, sun = spring(t, tLt, .5), tFd = W(b, "make") - .1;
  return bg("daystage") + (sun > .02 ? OP(Math.min(1, sun) * .55, `<path d="M1500 180 L360 420 L640 760z" fill="#FFE9A8" filter="url(#b30)"/>`) + TF(1600, 760, 2.6 * sun, sunHeat()) : "") + TF(PX, PY, K, plantFull())
    + (t >= tFd ? leafSparkles(t, PX, PY - 300, 170, 190, 9, 3) : "")
    + lab4(200, 300, "flower", X(-52), Y(-372), spring(t, tl[0], .4), 40) + lab4(170, 600, "fruit", X(-62), Y(-176), spring(t, tl[1], .4), 40) + lab4(900, 470, "leaf", X(76), Y(-290), spring(t, tl[2], .4), 40) + lab4(900, 700, "stem", X(2), Y(-110), spring(t, tl[3], .4), 40) + lab4(150, 1010, "root", X(-84), Y(96), spring(t, tl[4], .4), 40)
    + TF(1300, 340, spring(t, s.t0 + .15, .4), tpill(0, 0, "What makes a plant a plant?", 48, P.ink, "#fff", { w: 700 }))
    + bookCap(t, b, "Plants are living things that usually have leaves, stems and roots. They are able to make their own food when there is light.", 470, { size: 42, maxW: 720, x: 1360 })
    + buddy("pip", 1250, 1056, 230, t, { aura: true, in: s.t0 + .2, poses: [[s.t0, "pointing"], [tl[2] + 3, "sit"]] }) + HUD(t); };
SC.animal = (t, s) => { const a = "c903", pk = Math.max(0, Math.sin(t * 4)), tD = W(a, "depend") - .2; let grain = ""; for (let i = 0; i < 14; i++) grain += `<ellipse cx="${n2(640 + hash(i, 3) * 150)}" cy="${n2(944 + hash(i, 5) * 22)}" rx="7" ry="4.5" fill="#E8C060" stroke="#B88A2E" stroke-width="2"/>`;
  return bg("daystage") + grain + TF(430, 950, 1.5, hen({ bob: pk })) + TF(1010, 950, 1.25, cat()) + `<g transform="translate(1210 950)"><ellipse cx="0" cy="2" rx="70" ry="9" fill="${P.ink}" opacity=".2"/><path d="M-58 -34 H58 L46 0 H-46z" fill="#8CC4FF" stroke="#1F5FD0" stroke-width="5" stroke-linejoin="round"/><ellipse cx="0" cy="-34" rx="58" ry="12" fill="#C98A4E" stroke="#1F5FD0" stroke-width="5"/></g>`
    + (t >= tD ? TF(540, 620, spring(t, tD, .4), tpill(0, 0, "eats grain", 36, "#fff", P.ink, { w: 700 })) + TF(1120, 700, spring(t, tD + .25, .4), tpill(0, 0, "eats cat food", 36, "#fff", P.ink, { w: 700 })) : "")
    + bookCap(t, a, "Animals are unable to make their own food. They depend on other living things for food.", 170, { size: 46, maxW: 1000, x: 780 })
    + buddy("momo", 1610, 1056, 300, t, { aura: true, flip: true, in: s.t0 + .2, poses: [[s.t0, "sit"], [tD, "pointing"]] }) + HUD(t); };

/* ============ 10 · HOLD ON! Pip's rule ============ */
const NB = [760, 1040, .86], RG = [1470, 800], lizShow = (t, t0) => 1 - ramp(t, t0, .25) * (1 - ramp(t, t0 + 3.0, .2));
const PICS = [TF(0, 130, .78, tomatoPlant(1, { fruit: true })), TF(0, 120, .5, fernClump(1)), TF(-6, 70, 1.3, grasshopper())];
const listView = (t, o = {}) => fview(t, { nocr: true, liz: o.liz === undefined ? 1 : o.liz }) + TF(NB[0], NB[1], NB[2], noteBoard(t, { title: "IF IT IS GREEN, IT IS A PLANT", pics: PICS, ...o }));
SC.list = (t, s) => { const a = "c1001", b = "c1002", c = "c1003", d = "c1004", r0 = MK("ring0_2"), bell = MK("bell_2"), rs = ringState(t, r0, 5), tl = [W(a, "tomato") - .1, W(a, "fern") - .1, W(a, "grasshopper") - .1], tk = [W(a, "green", 1), W(a, "green", 2), W(a, "green", 3)], tLz = LT(a) + 1.2;
  const lit = [0, 1, 2].map((i) => Math.max(t < LT(b) ? pulse(t, tl[i], .05, 1.1) : 0, t >= r0 && t < bell ? (Math.floor((t - r0) / .55) % 3 === i ? .6 + .4 * rs.tick : 0) : 0, i === 2 ? pulse(t, W(c, "grasshopper") - .1, .05, 1.2) : 0)), tX = W(b, "cross") - .15, tH = W(b, "hold") - .1, tOne = W(c, "one") - .1, tAn = W(c, "animal") - .15, ring = t >= tX && t < bell + .8;
  const marks = [0, 1, 2].map((i) => t >= tk[i] ? (i === 2 && t >= tAn ? ["x", spring(t, tAn, .4)] : ["tick", spring(t, tk[i], .4)]) : null);
  return listView(t, { lit, marks, tags: [null, null, ["an animal", GROUPS[1][2], spring(t, tAn, .4), 36]], liz: lizShow(t, tLz) })
    + buddy("pip", 150, 1060, 205, t, { aura: true, in: s.t0 + .1, poses: [[s.t0, "pointing"], [LT(a) - .1, "sit"], [LE(a) + .15, "cheer"], [LT(b) + .3, "sit"], [tAn, "oops"], [LT(d) - .12, "sit"], [LE(d) + .1, "cheer"]], nohop: true })
    + say(a, 330, 330, t, { size: 40, tail: -150, x: true, maxW: 620 }) + say(d, 330, 330, t, { size: 40, tail: -150, maxW: 620 })
    + (t >= W(c, "eats") - .1 && t < LT(d) ? TF(1110, 960, spring(t, W(c, "eats") - .1, .4), tpill(0, 0, "It eats leaves.", 36, "#fff", P.ink, { w: 700 })) : "")
    + (ring ? OP(1 - ss(bell + .5, bell + .8, t), TF(RG[0], RG[1], spring(t, tX, .4), `<g transform="translate(${-RG[0]} ${-RG[1]})">${ringTimer(RG[0], RG[1], t < r0 ? 1 : rs.frac, t < r0 ? 5 : rs.secs, t, { R: 128, sw: 22, tick: rs.tick, shut: pulse(t, bell, .01, .6), inner: TF(RG[0], RG[1] + 6, .5, crossedArms()) })}</g>`) + youPill(RG[0], RG[1] - 178, 1.0) + tpill(RG[0], RG[1] + 220, "cross your arms", 30, P.ink, "#fff")) : "")
    + stamp(t, tH, 800, 420, "HOLD ON!") + bellIcon(t, r0) + coin(t, tOne, 1470, 760, "+1", "arms crossed") + HUD(t); };
SCORE.push([W("c1003", "one") - .1, 2, 1]);

/* ============ 11 · score hand, the lizard ============ */
SC.final = (t, s) => { const L = "c1201"; return finalScene(t, s, L, 1, [[s.t0, null, 1], [W(L, "more") - .1, "More than one? You beat the Buddies!", 2], [W(L, "two") - .1, null, 2]], TF(1270, 1062, .6, crate4(2, 1, FULL[2]))); };
SC.liz = (t, s) => { const L = "c1202"; return lizReveal(t, s, L, fview(t, { st: ALLC, inner: FULL, liz: 0 }), PIPE[0] + 2, PIPE[1], W(L, "which") - .1, "Which crate does a lizard go in?", -150); };

/* ============ 12 · the Part 2 tease: the chilli plant ============ */
SC.cliff = (t, s) => { const a = "c1301", b = "c1302", c = "c1303", tT = W(a, "two") - .2, tP = LT(b) - .6, tQ = W(c, "so") - .1, tF = W(c, "find") - .1, [px, pd] = slideX(t, tP, .55, 2250, 1250, 1040);
  return bg("daystage") + TF(480, 1040, 1.5, crate4(0, 1, inCards(["tomato", "fern", "chilli"]), { glow: pulse(t, LT(a) + .3, .1, 1.2) }))
    + [0, 1].map((i) => t >= tT + i * .2 ? TF(820 + i * 150, 1040, .8 * spring(t, tT + i * .2, .45), `<ellipse cx="0" cy="3" rx="60" ry="9" fill="${P.ink}" opacity=".22"/><rect x="-56" y="-120" width="112" height="120" rx="14" fill="url(#fWood)" stroke="#7A5226" stroke-width="5"/><circle cx="0" cy="-60" r="36" fill="${P.ink}"/>${T(0, -40, "?", 54, P.sun)}`) : "").join("")
    + (t >= tP ? pd + TF(px, 1040, 1.3, bigPot(chilliPlant(t))) : "")
    + buddy("momo", 1680, 1056, 270, t, { aura: true, flip: true, in: tP + .2, poses: [[tP, "pointing"], [LT(b) - .12, "sit"], [LE(b) + .1, "thinking"]] }) + say(b, 1560, 470, t, { size: 46, tail: 100, maxW: 560 })
    + (t >= tQ ? TF(560, 300, spring(t, tQ, .45), tpill(0, 0, "A flowering plant?", 56, P.ink, "#fff", { w: 700 })) : "")
    + (t >= tF ? TF(560, 520, lerp(2.2, 1, eo((t - tF) / .16)) + .05 * wob(t, tF + .16, .4), `<text x="0" y="50" font-family="Fredoka" font-weight="700" font-size="170" text-anchor="middle" letter-spacing="6" fill="${P.sun}" stroke="${P.ink}" stroke-width="28" stroke-linejoin="round" paint-order="stroke" filter="url(#drop)">PART 2</text>`) : "") + HUD(t); };
SC.nyk = (t, s) => nykScene(t, s, [0, 1, 2, 3].map((i) => TF(610 + i * 158, 1040, .56, crate4(i, 1, FULL[i]))).join(""));
})(); }
