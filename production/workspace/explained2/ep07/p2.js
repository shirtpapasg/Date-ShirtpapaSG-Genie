// p2.js: PART 2, "Your Hands LOOK Clean. What Is Living on Them?": bacteria, the table of clues, the chapter map. Segments 1-15 of
// ../p3_ep07_script.md, with the teacher's rules of 21 Nov (a calm recap under "Last time...", Basil reads the goal cards, the buddies read
// the Mark Sentences, the hidden animal is an ant by the soap pump). One SC.<scene> per timeline scene (tl_p2.json).
if (PART === 2) { (() => {
const D10 = { day: 10, drops: 1 };
const ringClip = (inner) => `<clipPath id="rgc"><circle cx="430" cy="470" r="172"/></clipPath><g clip-path="url(#rgc)">${inner}</g>`;
const handsCard = (id) => picCardK(`<rect x="-150" y="-160" width="300" height="320" fill="#DCE3EA"/>` + TF(-58, 30, .34, kidHand(-1)) + TF(58, 30, .34, kidHand(1)) + TF(84, -98, .62, tummy()), 270, 300, id);
const yogCard = (id) => picCardK(TF(-46, 104, 1.05, yoghurtCup()) + TF(66, 108, 1.05, yoghurtDrink()), 270, 300, id, "#EAF6FF");
const doughCard = (id) => picCardK(TF(-28, 120, .78, doughBowl(1, { id })) + TF(92, 124, .5, yeastPacket()), 270, 300, id);
const mouldCard = (id) => picCardK(TF(0, 6, .56, bagAlone(10)), 270, 300, id, "#F1F4F9");
const trayWith = (kind, card, k = 1, fl = 0) => `<g transform="scale(${k})">${sortTray(kind, 330, { flash: fl })}${TF(0, -62, 1, card)}</g>`;

/* ============ 1-2 · the calm recap under "Last time...": three pictures of Part 1, one at a time, large, each with its label ============ */
// the thumbnail's frame (thumb_still.js "&thumb"): the two clean hands at the sink with the big "?", the round view with the three shapes, Basil surprised
const THUMB2 = (t) => `<g transform="translate(-250 -60) scale(1.14)">${sinkView(t, {})}</g>` + bigQ(t, -9, 845, 500, 1.5) + TF(1500, 790, 1, roundView(bactField(t, { k: 1.25 }), 236, "th")) + buddy("basil", 190, 610, 290, t, { aura: true, tag: false, pose: "surprised", still: true }) + logo(t);
const recapLabel = (t, t0, t1, txt) => t < t0 ? "" : TF(960, 960, spring(t, t0, .5) * (1 - ramp(t, t1, .3)), `<g filter="url(#drop)"><rect x="${n2(-tw(txt, 58, 700) / 2 - 56)}" y="-58" width="${n2(tw(txt, 58, 700) + 112)}" height="116" rx="58" fill="${P.ink}"/></g>${T(0, 20, txt, 58, "#fff")}`);
SC.lasttime = (t, s) => { if (location.search.includes("thumb")) return THUMB2(t); const L = "j201", t2 = W(L, "yeast") - .4, t3 = W(L, "then") - .35, tW = W(L, "why") - .1, push = (a, b) => 1 + .05 * clamp((t - a) / (b - a));
  const p1 = () => CAM(closeBg() + TF(900, 540, 1.12, tray(D10)) + TF(1500, 700, 1.2, dayPill(t, 10)), push(s.t0, t2 + .5), 900, 540) + (pulse(t, W(L, "harmful") - .1, .1, 1.2) > .05 ? "" : "");
  const p2 = () => CAM(closeBg() + TF(880, 800, 2.3, doughBowl(1, { id: "rc" })) + TF(1330, 800, 1.5, yeastPacket(pulse(t, W(L, "yeast"), .1, 1.2))), push(t2, t3 + .5), 960, 560);
  const p3 = () => CAM(sinkView(t, { water: ss(t3 + .2, t3 + .6, t) * (1 - ss(tW - .5, tW - .1, t)) }), push(t3, s.t1 + 3), 960, 600) + bigQ(t, tW, 960, 440, 1.5);
  const a2 = ss(t2, t2 + .55, t), a3 = ss(t3, t3 + .55, t);
  return (a2 < 1 ? p1() : "") + (a2 > 0 && a3 < 1 ? OP(a2, p2()) : "") + (a3 > 0 ? OP(a3, p3()) : "")
    + recapLabel(t, s.t0 + .35, t2 - .1, "Bread mould: a harmful fungus") + recapLabel(t, t2 + .4, t3 - .1, "Yeast: a useful fungus") + recapLabel(t, t3 + .4, 1e9, "We washed our hands. Why?")
    + OP(ramp(t, s.t0 + .2, .4), lowerPill(60, 110, "Last time,", "in Part 1")) + logo(t); };
SC.pipclean = (t, s) => { const a = "j202", b = "j203", tC = W(b, "closer") - .15, k = spring(t, tC, .5), tip = SINK.tip;
  return sinkView(t, { prints: 1, glowTip: t >= tC ? .6 + .4 * Math.sin(t * 5) : 0 })
    + OP(1 - ramp(t, s.t0 + .1, .5), bigQ(t, -9, 960, 440, 1.5) + recapLabel(t, -9, 1e9, "We washed our hands. Why?"))
    + (k > .02 ? TF(lerp(200, tip[0] - 112, eo((t - tC) / .5)), tip[1] + 20, 1, `<g filter="url(#dropS)">${pointHand().split(SKIN).join("#FFFFFF").split(SKIN2).join("#C9D2E8")}</g>`) : "")
    + buddy("pip", 1640, 1060, 340, t, { aura: true, flip: true, in: s.t0 + .1, poses: [[s.t0, "thinking"], [LT(a) - .12, "sit"], [LE(a) + .1, "thinking"], [tC + .5, "surprised"]] }) + say(a, 1420, 500, t, { size: 46, tail: 200, x: true, maxW: 520 }) + HUD(t); };

/* ============ 3 · today's goals (Basil reads them), the game ============ */
const icoMap = () => `<g transform="translate(0 10)"><rect x="-90" y="-52" width="180" height="110" rx="14" fill="#FFF8EA" stroke="#5B4AA8" stroke-width="6"/><rect x="-34" y="-40" width="68" height="18" rx="9" fill="${P.ink}"/>${GROUPS.map((g, i) => `<path d="M0 -22 L${-60 + i * 40} 6" stroke="${g[1]}" stroke-width="5"/><rect x="${-76 + i * 40}" y="6" width="32" height="16" rx="8" fill="${g[1]}"/><rect x="${-72 + i * 40}" y="28" width="24" height="20" rx="5" fill="${g[1]}" opacity=".45"/>`).join("")}</g>`;
SC.goals = (t, s) => goals3(t, s, [["How we see bacteria", TF(10, 60, .24, microscope())], ["Harmful or useful bacteria", TF(-74, 44, .34, sortTray(1, 300, { size: 46 })) + TF(74, 44, .34, sortTray(0, 300, { size: 46 }))], ["The whole chapter on one map", icoMap()]], "basil", ["j251", "j252", "j253", "j254"]);
SC.game = (t, s) => gameScene(t, s, "j301", false, TF(20, 70, 2.3, cuteAnt(t)));

/* ============ 4 · the microscope, and bacteria ============ */
const MSB = [720, 1010];
SC.microscope = (t, s) => { const L = "j401", [bx, dd, sq] = slideX(t, s.t0 + .1, .6, -500, MSB[0], MSB[1]), by = MSB[1] - 60, pt = (p) => [MSB[0] + p[0], by + p[1]], t1 = s.t0 + .9;
  return closeBg() + dd + TF(bx, MSB[1], 1, `<g transform="scale(1 ${sq})">${board(TF(0, 290, 1, microscope()), 660, 680, "msb", { fill: "#EAF2FF" })}</g>`)
    + lab4(300, 400, "eyepiece", ...pt(MSC.eye).map((v, i) => v + (i ? 8 : -4)), spring(t, t1, .4), 44) + lab4(280, 640, "lens", ...pt(MSC.lens), spring(t, t1 + .4, .4), 44) + lab4(290, 860, "stage", ...pt(MSC.stage), spring(t, t1 + .8, .4), 44)
    + strip(t, L, "A microscope allows us to see very small things.", 150, { size: 46, x: 860, t1: MK("kw_microscope") - .1 })
    + buddy("pip", 1560, 1060, 320, t, { aura: true, flip: true, in: s.t0 + .2, poses: [[s.t0, "pointing"], [s.t0 + 2.4, "sit"]] }) + HUD(t); };
const fade = (inner, a) => OP(a, inner);
SC.scopes = (t, s) => { const L = "j402", tV = W(L, "discover") - .2, tS = W(L, "smaller") - .3, z = eio((t - tS) / 1.4), tin = (i) => s.t0 + .3 + i * .55;
  const row = [[-320, .95, scopeOld], [-70, .95, scopeMid], [270, .82, microscope]].map(([x, k, f], i) => { const kk = spring(t, tin(i), .45); return kk < .02 ? "" : TF(x, 280, k * kk, f()); }).join("");
  const view = `<g transform="scale(${n2(1 + 5 * z)})" opacity="${n2(1 - ss(.45, .9, z))}">${mouldMicro(t, .8)}</g>` + fade(`<g transform="scale(${n2(.4 + .6 * z)})">${bactField(t)}</g>`, ss(.4, .9, z));
  return closeBg() + TF(620, 1010, 1, board(row, 1000, 640, "scb", { fill: "#EAF2FF" }))
    + (t >= tV ? TF(1500, 640, spring(t, tV, .5), roundView(view, 250, "sc")) + OP(1 - ss(tS, tS + .4, t), popTag(t, tV + .5, 1500, 950, "fungi", 44, "#A05A2C", "#fff")) : "")
    + strip(t, L, "As scientists developed more powerful microscopes, they were able to discover living things that are even smaller than fungi.", 130, { size: 42, maxW: 1180, x: 860, keys: ["even", "smaller", "than", "fungi."] }) + HUD(t); };
const SH = [[-150, -84, bRod, 0, "rod-shaped", 330, 420], [150, -10, bRound, 1, "sphere-shaped (round)", 1590, 520], [-20, 160, bSpiral, 2, "spiral-shaped", 340, 800]];
SC.shapes = (t, s) => { const a = "j403", b = "j404", c = "j405", tw_ = ["rod-shaped", "sphere-shaped", "spiral-shaped"].map((w) => W(a, w) - .1), VX = 960, VY = 590; let big = "", labs = "";
  SH.forEach(([x, y, f, i, nm, lx, ly]) => { const k = spring(t, tw_[i], .5); if (k < .02) return; big += `<g transform="translate(${n2(x + 5 * Math.sin(t * 1.3 + i))} ${n2(y + 5 * Math.cos(t * 1.1 + i))}) rotate(${n2(i === 1 ? 0 : -14 + 5 * Math.sin(t * .9 + i))}) scale(${n2(2.3 * k)})"><circle r="52" fill="#fff" opacity=".7"/>${f(BCOL[i])}</g>`; labs += lineTag(t, tw_[i] + .15, lx, ly, VX + x + (lx < VX ? -90 : 70), VY + y, nm, 42); });
  return bg("stage2") + TF(VX, VY, 1, roundView(bactField(t, { dim: t >= tw_[0] }) + big, 340, "sh")) + labs
    + OP(1 - ramp(t, LT(c) - .4, .3), wordBox(t, 960, 1010, "one bacterium", "many bacteria", W(b, "bacterium"), W(b, "bacteria"), LT(b) - .3))
    + strip(t, c, "Bacteria are tiny living things and they come in different shapes and sizes.", 130, { size: 42, maxW: 1180, x: 860 }) + HUD(t); };

/* ============ 5 · BE A BACTERIUM: the dive (the journey itself is in shrink.js) ============ */
SC.waitw = (t, s) => { const L = "j501", tP = W(L, "be") - .2, dive = ei((t - (s.t1 - .7)) / .7), HX = 1240, HY = 700, tip = [HX - 60, HY - 250], e = eo((t - s.t0) / .7);
  return CAM(bg("stage2") + TF(lerp(960, 520, e), lerp(590, 560, e), lerp(1, .62, e), roundView(bactField(t), 340, "ww")) + (e > .5 ? `<path d="M${n2(520 + 220)} 500 L${tip[0] - 30} ${tip[1] + 6}" stroke="#fff" stroke-width="6" stroke-dasharray="4 14" stroke-linecap="round" opacity="${n2(spring(t, s.t0 + .6, .4))}"/>` : "")
      + TF(HX, HY + 500 * (1 - eo((t - s.t0 - .2) / .6)), 1.15, kidHand(-1, { prints: 1, glowTip: .7 + .3 * Math.sin(t * 5) })), 1 + 7 * dive, tip[0], tip[1])
    + OP(1 - dive, (t >= tP ? TF(960, 150, spring(t, tP, .45), tpill(0, 0, "Be a bacterium!", 70, P.sun, P.ink, { w: 700 })) : "") + HUD(t)) + wipe(t, s.t1, "#FFDCC2", 960, 540); };
SC.pullout = (t, s) => { const b = "j508", e = eo((t - s.t0) / 1.0);
  return CAM(sinkView(t, { shine: 1 }), lerp(1.5, 1, e), 960, 620) + buddy("basil", 1640, 1060, 340, t, { aura: true, flip: true, in: s.t0 + .2, poses: [[s.t0, "cheer"], [LT(b) - .12, "sit"], [LE(b) + .1, "cheer"]], nohop: t < LE(b) })
    + say(b, 1400, 520, t, { size: 48, tail: 200, maxW: 520 }) + wipe(t, s.t0, "#EAF6FF") + HUD(t); };

/* ============ 6 · harmful bacteria: wash your hands (the hidden ant walks along the sink's edge by the soap pump) ============ */
const antX = (t, t0) => lerp(1790, 1330, clamp((t - t0) / 3.4)), antOn = (t, t0) => ss(t0, t0 + .15, t) * (1 - ss(t0 + 3.25, t0 + 3.4, t));
SC.harmful = (t, s) => { const a = "j601", b = "j602", tA = LT(a) + .3;
  return sinkView(t, { soap: .9, water: 1 - ss(LT(a) + 2.2, LT(a) + 2.7, t), ant: antOn(t, tA) > .02 ? [antX(t, tA), antOn(t, tA)] : null })
    + strip(t, a, "Bacteria can be harmful when they cause you to fall sick.", 150, { size: 46, x: 760, maxW: 1100, keys: ["harmful"], t1: MK("kw_harmful") - .1 }) + (t >= W(a, "sick") - .1 ? TF(1330, 270, spring(t, W(a, "sick") - .1, .45) * (1 - ramp(t, MK("kw_harmful") - .1, .2)), tummy(1.2)) : "")
    + standCard(t, LT(b) - .1, 330, 1010, "Wash your hands with soap before you eat.", "", { maxW: 430, size: 48 }) + HUD(t); };

/* ============ 7 · Round 1: are all bacteria harmful? ============ */
SC.r1 = (t, s) => { const L = "j701";
  return lockN(t, { cards: ["Yes", "No"], q: "Are all bacteria harmful?", tq: W(L, "are") - .1, tc: [W(L, "one", 1), W(L, "two")], ring0: MK("ring0_1"), dur: 5, lock: "j702",
    obj: (tt) => ringClip(`<rect x="250" y="290" width="360" height="360" fill="#EAF7F2"/>` + TF(430, 470, .62, bactField(tt, { k: 1.5 }))),
    labels: (tt) => popTag(tt, W(L, "bacteria") - .1, 430, 250, "bacteria", 40, "#3A8DFF", "#fff"),
    picks: [{ who: "pip", id: "j705", word: "2" }, { who: "basil", id: "j703", word: "1", x: true }, { who: "momo", id: "j704", word: "2" }], react: [[LE("j703") + .1, "basil", "arms_crossed"]] }); };
const CAMY = [1.2, 640, 640];
SC.yoghurt = (t, s) => { const L = "j706", tA = W(L, "two") - .1, lit = t >= tA ? spring(t, tA, .45) : 0, op = ss(s.t0 + .05, s.t0 + .4, t), [x1, l1, d1] = hopLow(t, s.t0 + 1.25, 330, 640, 900, 3, .22), [x2, l2, d2] = hopLow(t, s.t0 + 1.5, 330, 800, 910, 3, .22);
  return kitchenView(t, { tray: false, bowl: false, under: fridgeOpen(op), front: d1 + d2 + (t > s.t0 + .55 ? TF(x1, 900 - l1, 1.0, yoghurtCup()) : "") + (t > s.t0 + .8 ? TF(x2, 910 - l2, 1.0, yoghurtDrink()) : "") + TF(1040, 880, .66, ansCard(2, "No", { lit, size: 70 })) }, CAMY)
    + buddy("pip", 1800, 1062, 200, t, { aura: true, flip: true, in: s.t0 + .2, poses: [[s.t0, "pointing"], [tA, "cheer"]] }) + HUD(t); };
SC.mark1 = (t, s) => { const L = "j708", tH = W(L, "harmful") - .1, tU = W(L, "useful") - .1, g = (q) => t < q ? 0 : pulse(t, q, .05, 1.2);
  const under = TF(1700, 560, .74, trayWith(1, handsCard("mh"), 1, g(tH))) + TF(1700, 960, .74, trayWith(0, yogCard("my"), 1, g(tU)));
  return markScene(t, s, { id: L, sayId: "j707", who: "basil", n: "1 of 2", text: "Some bacteria are harmful, while others are useful to us.", keys: ["harmful,", "useful"], size: 72, y: 250, x: 600, w: 900, extra: under }); };
SC.body = (t, s) => { const a = "j709", b = "j710", c = "j711", tY = W(b, "yoghurt") - .1, tc = W(c, "one") - .1, mv = eio((t - LT(b) + .4) / .6);
  return bg("daystage") + TF(lerp(960, 520, mv), 640, .95, bodyOutline(t, ss(s.t0 + .3, s.t0 + .9, t))) + strip(t, a, "Useful bacteria in our body help us to break down food.", 150, { size: 46, x: 860, maxW: 1150, keys: ["useful"], t1: LT(b) + 1.2 })
    + (t >= tY ? TF(1180, 900, 2.0 * spring(t, tY, .45), yoghurtCup()) + TF(1440, 900, 2.0 * spring(t, tY + .2, .45), yoghurtDrink()) + popTag(t, W(b, "useful") - .1, 1300, 500, "useful bacteria inside", 46, "#2FA65A", "#fff") : "")
    + coin(t, tc, 1300, 330, "+1", "if you showed two fingers") + HUD(t); };
SCORE.push([W("j711", "one") - .1, 1, 1]);

/* ============ 8 · Showdown: Pip's table of clues ============ */
const NOTE = [800, 1080, .92];
SC.show = (t, s) => { const a = "j801", b = "j802", c = "j803", r0 = MK("ring0_2"), bell = MK("bell_2"), rs = ringState(t, r0, 6), RX = 1660, RY = 560;
  const cues = [["A0", W(a, "spores")], ["A1", W(a, "food")], ["B0", W(a, "spores", 1)], ["B1", W(a, "food", 1)], ["C2", W(a, "feathers")], ["C1", W(a, "food", 2)]], lit = {};
  { const on = cues.filter(([, q]) => t >= q - .1), cur = on[on.length - 1]; if (cur && t < LT(b) - .2) on.forEach(([k, q]) => { if (k[0] === cur[0][0]) lit[k] = .55 + .45 * pulse(t, q, .04, .5); }); }
  const rows = ["one", "two", "three"].map((w) => spring(t, W(b, w) - .1, .4)), tcn = [W(c, "one", 1), W(c, "two"), W(c, "three")], badge = [0, 1, 2].map((i) => Math.max(pulse(t, tcn[i], .04, .5), t >= r0 && t < bell ? (Math.floor((t - r0) / .5) % 3 === i ? .5 + .5 * rs.tick : 0) : 0));
  const nf = t >= tcn[2] - .1 ? 3 : t >= tcn[1] - .1 ? 2 : 1, ringOn = t >= tcn[0] - .3 && t < bell + .8, tB = LT("j805"), tM = LT("j806"), tO = LT("j807");
  return bg("stage2") + TF(NOTE[0], NOTE[1], NOTE[2], clueTable(t, { lit, rows, badge }))
    + buddy("pip", 1700, 1060, 260, t, { aura: true, flip: true, in: s.t0 + .1, poses: [[s.t0, "waving"], [LT(b) - .12, "sit"], [LE(b) + .2, "thinking"], [tO - .12, "oops"]], wave: true }) + say(b, 1560, 300, t, { size: 42, tail: 120, maxW: 480 }) + say("j807", 1560, 800, t, { size: 56, tail: 100 })
    + (ringOn ? OP(1 - ss(bell + .5, bell + .8, t), TF(RX, RY, spring(t, tcn[0] - .3, .4), `<g transform="translate(${-RX} ${-RY})">${ringTimer(RX, RY, t < r0 ? 1 : rs.frac, t < r0 ? 6 : rs.secs, t, { R: 128, sw: 22, tick: rs.tick, shut: pulse(t, bell, .01, .6), inner: TF(RX, RY + 60, .62, countHand(nf)) })}</g>`) + youPill(RX, RY - 178, 1.0) + tpill(RX, RY + 222, "line 1, 2 or 3?", 30, P.ink, "#fff")) : "")
    + (t >= bell + .9 ? buddy("basil", 1500, 720, 190, t, { aura: true, flip: true, in: bell + .9, poses: [[bell + .9, "arms_crossed"], [tB - .12, "sit"], [LE("j805") + .1, "cheer"]] }) + pickNum("basil", 1400, 670, t, tB - .1, "1") + buddy("momo", 1780, 720, 190, t, { aura: true, flip: true, in: bell + 1.0, poses: [[bell + 1, "thinking"], [tM - .12, "sit"], [LE("j806") + .1, "pointing"]] }) + pickNum("momo", 1880, 670, t, tM - .1, "1")
      + say("j805", 1600, 400, t, { size: 38, tail: -100, maxW: 480 }) + say("j806", 1640, 410, t, { size: 40, tail: 140, maxW: 460 }) : "")
    + stamp(t, LT("j804") - .08, 860, 480) + bellIcon(t, r0) + HUD(t); };
SC.fixed = (t, s) => { const h = "j808", tc = W("j809", "two") - .1, rub = ss(s.t0 + .15, s.t0 + .6, t), wr = ss(s.t0 + .65, s.t0 + 1.5, t), tR = W(h, "read") - .1;
  const pics = [TF(0, 12, .12, nestFern()), TF(0, 30, .44, mushroom()), TF(6, 30, .26, kingfisher({ bob: 3 * Math.sin(t * 3) }))], pk = [0, 1, 2].map((i) => spring(t, s.t0 + 1.4 + i * .3, .4));
  return bg("stage2") + TF(NOTE[0], NOTE[1], NOTE[2], clueTable(t, { rub, write: wr, pics, pk }))
    + buddy("pip", 1700, 1060, 260, t, { aura: true, flip: true, poses: [[s.t0, "oops"], [s.t0 + 1.6, "sit"], [tc, "cheer"]], nohop: true })
    + standCard(t, tR, 1650, 660, "Read every column.", "spores + cannot make its own food = a fungus", { maxW: 400, size: 44, size2: 30 }) + coin(t, tc, 1640, 250, "+2", "if you showed one finger") + HUD(t); };
SCORE.push([W("j809", "two") - .1, 3, 1]);

/* ============ 9 · the whole chapter on one map ============ */
const mapTimes = () => { const s = {}; [["flowering", "j902", "flowering"], ["non-flowering", "j902", "non-flowering"], ["amphibians", "j903", "amphibians"], ["birds", "j903", "birds"], ["fish", "j903", "fish"], ["insects", "j903", "insects"], ["reptiles", "j903", "reptiles"], ["mammals", "j903", "mammals"]].forEach(([k, id, w]) => { s[k] = W(id, w) - .1; });
  s.mushroom = W("j904", "fungi") + .15; s["bread mould"] = W("j904", "fungi") + .35; s.bact = W("j904", "bacteria") + .15;
  return { root: W("j901", "living") - .1, b: [W("j902", "plants") - .1, W("j903", "animals") - .1, W("j904", "fungi") - .1, W("j904", "bacteria") - .1], s }; };
SC.map = (t, s) => { const [bx, dd] = slideX(t, s.t0 + .1, .7, 2900, 960, 1040), L = "j905";
  return bg("kitchen") + `<rect width="1920" height="1080" fill="${P.night}" opacity=".3"/>` + dd + TF(bx, 1040, 1.06, mapBoard(t, mapTimes()))
    + strip(t, L, "Fungi and bacteria are also living things.", 1010, { size: 46 }) + HUD(t); };

/* ============ 10 · the chant ============ */
SC.chant = (t, s) => chantScene(t, s, "c1003", { x: 1000, size: 70, board: (fl) => TF(226, 1040, .26, mapBoard(t, {}, { flash: [0, 0, fl[0], fl[1]] })) + TF(1630, 1044, .5, sortTray(0, 300, { flash: fl[2] })) + TF(1806, 1044, .5, sortTray(1, 300, { flash: fl[2] })) });

/* ============ 11 · Exam corner ============ */
SC.exambanner = (t, s) => bg("stage") + examBanner(t, s.t0 + .05, 960, 520, 1.6) + HUD(t);
SC.mark2 = (t, s) => { const L = "j1103", ws = ["plants,", "animals,", "fungi", "bacteria."].map((w) => W(L, norm(w)) - .1);
  const under = GROUPS.map(([nm, c], i) => { const lit = t < ws[i] ? 0 : .3 + .7 * pulse(t, ws[i], .05, 1.0), w = tw(nm, 40, 700, "Fredoka", 3) + 60; return TF(1710, 390 + i * 150, 1 + .12 * lit, (lit > .05 ? `<rect x="${-w / 2 - 12}" y="-48" width="${w + 24}" height="96" rx="48" fill="${P.sun}" opacity="${n2(lit)}" filter="url(#b10)"/>` : "") + `<g opacity="${t < ws[i] ? .45 : 1}"><g filter="url(#dropS)"><rect x="${-w / 2}" y="-36" width="${w}" height="72" rx="36" fill="${c}"/></g>${T(0, 15, nm, 40, "#fff", { ls: 3 })}</g>`); }).join("");
  return markScene(t, s, { id: L, sayId: "j1102", who: "pip", n: "2 of 2", text: "Living things can be classified based on common observable characteristics. Scientists have classified different living things into groups such as plants, animals, fungi and bacteria.", keys: ["classified", "common", "observable", "characteristics.", "plants,", "animals,", "fungi", "bacteria."], size: 52, y: 230, x: 590, w: 940, extra: under + examBanner(t, s.t0, 1060, 130, .62) }); };

/* ============ 12-13 · score hand, the hidden ant, the dare for Episode 8 ============ */
SC.final = (t, s) => { const L = "j1201"; return finalScene(t, s, L, 1, [[s.t0, null, 1], [W(L, "more") - .1, "More than one? You beat the Buddies!", 3], [W(L, "three") - .1, null, 3]]); };
SC.liz = (t, s) => { const L = "j1202"; return lizReveal(t, s, L, sinkView(t, { soap: .9, ant: [1420, 1] }), 1420, 300, W(L, "can") - .1, "Can you see it without a microscope?", -260, 170); };
SC.dare = (t, s) => { const L = "j1301", ws = ["plastic", "metal", "glass"].map((w) => W(L, w) - .15), tS = W(L, "sand") - .1, tN = W(L, "lock") - .1, xs = [330, 760, 1190], nm = ["The plastic box", "The metal box", "The glass jar"], tg = ["plastic", "metal", "glass"], tC = W(L, "which") - .2;
  return closeBg() + xs.map((x, i) => { const [bx, dd] = slideX(t, ws[i] - .25, .45, i < 2 ? -400 : 2400, x, 700); return t < ws[i] - .25 ? "" : dd + TF(bx, 620, .92, dare8(i)) + popTag(t, ws[i] + .25, x, 642, tg[i], 36, "#fff", P.ink) + (t >= tC + i * .12 ? TF(x, 826, .6 * spring(t, tC + i * .12, .45), ansCard(i + 1, nm[i], { size: 48 })) : ""); }).join("")
    + (t >= tS ? TF(1600, 620, 1.5 * spring(t, tS, .5), sandPile()) + bigQ(t, tS + .3, 1600, 400, .9) : "")
    + buddy("basil", 1700, 1050, 230, t, { aura: true, flip: true, in: s.t0 + .2, poses: [[s.t0, "sit"], [tS + .2, "surprised"], [LT("j1302") - .12, "sit"], [LE("j1302") + .1, "surprised"]] }) + say("j1302", 1500, 180, t, { size: 44, tail: 160, maxW: 520 })
    + (t >= tN ? TF(800, 1030, lerp(1.6, 1, eo((t - tN) / .16)) + .04 * wob(t, tN + .16, .4), `<g filter="url(#drop)"><rect x="-640" y="-50" width="1280" height="100" rx="50" fill="${P.ink}"/></g>${T(-520, 16, "NEXT", 42, P.sun, { ls: 8 })}${T(70, 16, "Materials · Lock in your answer!", 42, "#fff")}`) : "") + HUD(t); };
SC.nyk = (t, s) => nykScene(t, s, TF(790, 1046, .34, mapBoard(t, {}, { flash: [0, 0, 0, 0] })));
})(); }
