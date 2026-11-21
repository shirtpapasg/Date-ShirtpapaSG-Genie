// p1.js: PART 1, "A Metal Spoon SINKS. So How Does a Giant Metal Ship FLOAT?": float or sink, the material matters, trapped air.
// Segments 1-14 of p3_ep10_script.md (version 1, 21 Nov 2026; the teacher's go-ahead in its section 12).
// STAGE 2 (drawn): the sets and props are in water.js (the beach shelter, the tub, the ship, the otter) and rainy.js (the raincoat, the shoe),
// the three look-closers (SC.lcblocks, SC.lcship, SC.lcbowl) in closer.js, the journey (SC.shrink) in shrink.js.
if (PART === 1) { (() => {
const L1 = "e702";
// the scores (script section 3): HOLD ON! 1 : 0, Round 1 2 : 1
SCORE.push([W("e603", "one") - .1, 1, 0]);
SCORE.push([W("e806", "one") - .1, 2, 1]);
const FOOT = "P3 · Diversity of Materials · Float or sink";

const FULL = { wb: 1, mb: 1, ws: 1, ms: 1 }, lc3 = (a, b, e) => [lerp(a[0], b[0], e), lerp(a[1], b[1], e), lerp(a[2], b[2], e)];
/* 1 · silent cold open: a beach shelter at East Coast Park */
const DB = [[688, 794], [1238, 794]];
// EP9's two dare boards slide in low along the table with dust and stand at the back
const dareBoards = (t, tb) => { if (t < tb) return ""; const [x1, d1] = slideX(t, tb, .7, -300, DB[0][0], DB[0][1]), [x2, d2] = slideX(t, tb + .18, .7, 2300, DB[1][0], DB[1][1]);
  return d1 + picBoard("spoonTub", x1, DB[0][1], 1, { sc: .5, lab: "metal · sinks", size: 48, id: "d1" }) + (t >= tb + .18 ? d2 + picBoard("ship", x2, DB[1][1], 1, { sc: .5, lab: "metal · floats", size: 48, id: "d2" }) : ""); };
// the thumbnail's frame (thumb_still.js ... "&thumb"): the giant ship on the sea, the tub with the metal spoon on its bottom, Basil surprised
const THUMB1 = (t) => seaView(t, { x: 600, y: 520, sc: .62 }) + `<rect y="840" width="1920" height="240" fill="#EFE8DC"/><path d="M0 840 H1920" stroke="#fff" stroke-width="6"/>` + TF(980, 1010, 1.5, tubSvg({ t, label: false, inner: TF(10, TUB.fl - 12, 1.5, spoonM(), 3) + bubbles(t + 2, 0, 10, () => -40, TUB.ys, 4, .5, 30, 5) }))
  + buddy("basil", 200, 800, 250, t, { aura: true, tag: false, pose: "surprised", still: true }) + logo(t);
SC.cold = (t, s) => { if (location.search.includes("thumb")) return THUMB1(t); const tb = MK("boardsIn"), tp = MK("budsIn"), z = 1.02 + .02 * eio(t / 7);
  return beachView(t, { tub: {}, bowl: 1, jug: 1, back: dareBoards(t, tb) }, [z, 960, 600])
    + sPip(t, { in: tp, poses: [[tp, "waving"], [tp + 1.4, "sit"]], wave: true }) + sBasil(t, { in: tp + .2, poses: [[tp + .2, "surprised"]] }) + sMomo(t, { in: tp + .4, poses: [[tp + .4, "waving"], [tp + 1.7, "sit"]], wave: true })
    + lowerPill(60, 96, "East Coast Park,", "Singapore") + finePrint(t, .7, "Water play? Always with an adult.", 276, 196); };

/* 2 · "Last time...": EP9's dare, word for word, two calm pictures (each >= 2.5 s, one label each); the three cards light as Heart counts */
SC.lasttime = (t, s) => { const L = "e202", t2 = W(L, "but") - .2, i = t >= t2 ? 1 : 0, tb = [s.t0, t2], labs = ["A metal spoon sinks", "What is inside the ship?"];
  const z = 1 + .05 * eio((t - tb[i]) / 4), k = ramp(t, tb[i] + .05, .5), cards = ["Wood", "Air", "More metal"], tc = [W(L, "one"), W(L, "two"), W(L, "three")];
  return bg("stage2") + OP(ramp(t, s.t0, .3), T(960, 110, "Last time…", 60, "#fff", { w: 600 }))
    + OP(k, `<g transform="translate(960 ${i ? 470 : 540}) scale(${n2(z)}) translate(-960 ${i ? -470 : -540})">${i ? TF(960, 700, 1.32, wboard(PIC.shipQ(), 330, 290, "lt1", { lab: "metal · floats", size: 30 })) : TF(960, 872, 1.72, wboard(PIC.spoonTub(), 330, 290, "lt0", { lab: "metal · sinks", size: 30 }))}</g>`
      + (i ? cards.map((c, j) => TF(600 + j * 360, 850, .6 * spring(t, t2 + .5 + j * .15, .45), ansCard(j + 1, c, { w: 340, pulse: pulse(t, tc[j], .04, .9) })   /* each card glows as Heart counts it (no tick: the answer is not given here) */)).join("") : "")
      + TF(960, i ? 1024 : 968, spring(t, tb[i] + .3, .4), tpill(0, 0, labs[i], 50, P.sun, P.ink, { w: 700 }))) + HUD(t); };
// back at the table: the board OUR 3 WATER TESTS slides in low and stands at the end of the table; row 1 glows
const boardIn = (t, t0, glow) => { const [bx, bd] = slideX(t, t0, .7, 2500, BX.board, TYB + 30); return bd + TF(bx, TYB + 30, .46, board3(t, { glow })); };
const view0 = (t, s0, cam = CAMB) => beachView(t, { tub: {}, bowl: 1, jug: 1, back: dareBoards(t, -9), front: boardIn(t, s0 + .15, 0) }, cam);
SC.tests = (t, s) => { const L = "e203"; return view0(t, s.t0) + sPip(t) + sBasil(t) + sMomo(t, { poses: [[s.t0, "sit"], [s.t0 + .9, "pointing"]] }) + (t >= LT(L) - .1 ? TF(960, 250, spring(t, LT(L) - .1, .45), tpill(0, 0, "Hold on to your answer!", 56, P.ink, "#fff", { w: 700 })) : "") + HUD(t); };
const slamFit = (y, txt, col, k) => slamLine(y, txt, Math.min(150, 150 * 1720 / tw(txt, 150, 700, "Fredoka", 4)), col, k);
SC.title = (t, s) => { const u = t - MK("title"), dim = clamp(u / .2); return view0(t, SCN.tests.t0) + sPip(t) + sBasil(t, { poses: [[s.t0, "arms_crossed"]] }) + sMomo(t, { poses: [[s.t0, "thinking"]] })
  + `<rect width="1920" height="1080" fill="${P.night}" opacity="${n2(.68 * dim)}"/>` + slamFit(400, "A METAL SPOON SINKS", "#fff", slamK(u, .05)) + slamFit(600, "A METAL SHIP FLOATS?!", P.sun, slamK(u, .55)) + HUD(t); };

/* 3 · the game, and the hidden otter; 4 · goals (Basil reads) and the countdown (count is in common.js) */
SC.game = (t, s) => gameScene(t, s, "e301", true);
const icFloat = `<rect x="-78" y="-2" width="156" height="50" rx="10" fill="#9FD8F5"/>${TF(0, -2, 1.15, blockW())}<rect x="-78" y="-2" width="156" height="50" rx="10" fill="#6CBDEC" opacity=".3"/><path d="M-78 -2 q13 -7 26 0 t26 0 t26 0 t26 0 t26 0 t26 0" fill="none" stroke="#fff" stroke-width="4"/>`;
const icTwo = TF(-46, 6, 1.2, blockW()) + TF(46, 6, 1.2, blockM());
const icShip = `<g transform="translate(0 16) scale(.135)">${shipSide()}</g><g transform="translate(0 16) scale(.135)">${shipInside(1)}</g><path d="M-112 18 q14 -7 28 0 t28 0 t28 0 t28 0 t28 0 t28 0 t28 0 t28 0" fill="none" stroke="#fff" stroke-width="4"/>`;
SC.goals = (t, s) => goals3(t, s, [["Float or sink", icFloat], ["The material matters", icTwo], ["Why a metal ship floats", icShip]], ["e401", "e402", "e403", "e404"], "basil");

/* 5 · test one: DROP IT IN. Two blocks held just above the tub; [LOOK CLOSER] the tub (closer.js); the book's strip; tick 1 */
const HB = [tubW(TIN.wb[0], -298 - 22), tubW(TIN.mb[0], -298 - 22)];
SC.blocks = (t, s) => { const a = "e501", e = eio((t - s.t0) / 1.0), cam = lc3(CAMB, CAMT, e), dn = eo((t - s.t0 - .25) / .7), tw_ = W(a, "wood") - .1, tm = W(a, "metal") - .1, tsz = W(a, "same") - .1;
  const arms = [0, 1].map((i) => TF(HB[i][0], HB[i][1] - (1 - dn) * 560, TUBS, holdDown(i ? blockM() : blockW(), 22))).join(""), X = (i) => gx(cam, HB[i][0]), Y = gy(cam, HB[0][1] + 20);
  return beachView(t, { tub: {}, trayS: { wb: 1, mb: 1 }, bowl: 1, jug: 1, board: { glow: 0 }, boardS: .46, front: arms }, cam)
    + (t >= tsz ? TF((X(0) + X(1)) / 2, Y + 118, spring(t, tsz, .4), tpill(0, 0, "same size", 40, P.sun, P.ink, { w: 700 })) : "") + (t >= tw_ ? TF(X(0) - 150, Y, spring(t, tw_, .4), tpill(0, 0, "wood", 42, "#fff", P.ink, { w: 700 })) : "") + (t >= tm ? TF(X(1) + 150, Y, spring(t, tm, .4), tpill(0, 0, "metal", 42, "#fff", P.ink, { w: 700 })) : "")
    + sPip(t) + sBasil(t) + sMomo(t) + HUD(t); };
SC.woodstrip = (t, s) => { const b = "e506", tk = MK("tick1"); return beachView(t, { tub: FULL, tray: false, bowl: 1, jug: 1, board: { glow: ticked(0, t) ? -1 : 0 }, boardS: .46 }, CAMT)
  + bookCaption(t, "e505", "Most types of wood float on water.", 150, { size: 50, keys: ["wood", "float"] }) + bookCaption(t, "e505", "Most metals sink in water.", 250, { size: 50, off: 7, keys: ["metals", "sink"] })
  + (HAS(b) ? buddy("basil", 210, 1060, 250, t, { aura: true, in: s.t0 + .2, poses: [[s.t0, "sit"], [LE(b) + .1, "cheer"]], nohop: true }) + say(b, 470, 520, t, { size: 42, tail: -170, maxW: 520 }) : sBasil(t))
  + (t >= tk ? TF(gx(CAMT, BX.board), gy(CAMT, TYB - 230), spring(t, tk, .4) * (1 - ramp(t, tk + 1.6, .3)), tpill(0, 0, "Test 1: done!", 36, GOODC, "#fff", { w: 700 })) : "") + sMomo(t) + HUD(t); };

/* 6 · HOLD ON! Momo's rule. Momo's bubble with the ✗ chip, the HOLD ON! stamp, the YOU ring with crossed arms (5 s); the two pictures in the
   ring (the giant ship on the sea; the metal spoon on the bottom of the tub) and both clue labels ON TOP of the ring frame stay through the
   countdown and Heart's two facts; the bell, the coin. */
const RG = [1240, 520], RR = 150;
SC.holdon = (t, s) => { const a = "e601", b = "e602", c = "e603", r0 = MK("ring0_hold"), bell = MK("bell_hold"), rs = ringState(t, r0, 5), tX = W(b, "cross") - .15, tH = W(b, "hold") - .1, tOne = W(c, "one") - .1, ring = t >= tX && t < LE(c) + .4;
  const g1 = pulse(t, W(c, "giant") - .1, .1, 1.6), g2 = pulse(t, W(c, "little") - .1, .1, 1.6);
  const pics = `<g transform="translate(${RG[0]} ${RG[1] - 46}) scale(.9)"><circle cx="-70" cy="0" r="${n2(70 + 5 * g1)}" fill="${g1 > .05 ? P.sun : "#fff"}"/><circle cx="70" cy="0" r="${n2(70 + 5 * g2)}" fill="${g2 > .05 ? P.sun : "#fff"}"/><g clip-path="url(#wRingA)"><g transform="translate(-70 0) scale(.46)">${PIC.ship()}</g></g><g clip-path="url(#wRingB)"><g transform="translate(70 4) scale(.5)">${PIC.spoonTub()}</g></g></g>`;
  const labels = TF(RG[0] - 170, RG[1] - RR - 34, spring(t, tX + .2, .4), tpill(0, 0, "very heavy · floats", 28, "#fff", P.ink, { w: 700 })) + TF(RG[0] + 170, RG[1] - RR - 34, spring(t, tX + .35, .4), tpill(0, 0, "light · sinks", 28, "#fff", P.ink, { w: 700 }));
  return beachView(t, { tub: FULL }, CAMB) + `<rect width="1920" height="1080" fill="${P.night}" opacity=".5"/>`
    + buddy("momo", 330, 1060, 300, t, { aura: true, in: s.t0 + .1, poses: [[s.t0, "thinking"], [LE(a) + .15, "sit"], [W(c, "giant") - .12, "surprised"], [LE(c) + .1, "sit"]], nohop: true })
    + say(a, 560, 300, t, { size: 42, tail: -200, x: true, maxW: 640 })
    + (ring ? OP(1 - ss(LE(c) + .1, LE(c) + .4, t), TF(RG[0], RG[1], spring(t, tX, .4), `<g transform="translate(${-RG[0]} ${-RG[1]})">${ringTimer(RG[0], RG[1], t < r0 ? 1 : t < bell ? rs.frac : 0, t < r0 ? 5 : t < bell ? rs.secs : 0, t, { R: RR, sw: 24, tick: rs.tick, shut: pulse(t, bell, .01, .6), inner: pics + (t < bell + .3 ? TF(RG[0], RG[1] + 50, .3, crossedArms()) : "") })}</g>`)
      + labels + youPill(RG[0] - 250, RG[1] + 120, 1.0) + tpill(RG[0], RG[1] + RR + 60, "cross your arms", 30, P.ink, "#fff")) : "")
    + stamp(t, tH, 900, 420, "HOLD ON!") + bellIcon(t, r0) + coin(t, tOne, 1680, 860, "+1", "arms crossed") + HUD(t); };
// under Mark Sentence 1: the tub, the wooden block at the surface and the metal block on the bottom light in turn
SC.mark1 = (t, s) => { const id = "e606", gF = pulse(t, W(id, "float") - .1, .1, 1.3), gS = pulse(t, W(id, "sink") - .1, .1, 1.3), k = spring(t, s.t0 + .35, .5), TX = 1180, TYM = 1062, S = .92;
  return markScene(t, s, { id, sayId: "e605", who: "momo", n: "1 of 2", text: "The material of an object affects the ability of the object to float or sink.", keys: ["material", "float", "or", "sink."], size: 64, y: 210, footer: FOOT,
    extra: TF(TX, TYM, S * k, glowDisc(TIN.wb[0], TIN.wb[1], 70, gF) + glowDisc(TIN.mb[0], TIN.mb[1], 70, gS) + tubSvg({ t, inner: tubThings({ wb: 1, mb: 1 }, t) }))
      + OP(Math.min(1, gF * 3), tpill(TX - 330, TYM - 190, "wood: floats", 36, GOODC, "#fff", { w: 700 })) + OP(Math.min(1, gS * 3), tpill(TX + 340, TYM - 40, "metal: sinks", 36, WEAKC, "#fff", { w: 700 })) }); };

/* 7 · Round 1: the dare from EP9 (a short 3 s ring); clue tag "metal · floats" on top of the ring, kept through the countdown */
SC.puzzle = (t, s) => { const a = "e701", tS = W(a, "ship") - .1, tM = W(a, "metal", 1) - .1, mb = tubW(TIN.mb[0], TIN.mb[1]);
  return beachView(t, { tub: FULL, bowl: 1, jug: 1, tray: false, glowShips: pulse(t, tS, .1, 1.6), back: glowDisc(mb[0], mb[1], 60, pulse(t, tM, .1, 1.6)) }, CAMB)
    + buddy("pip", 230, 1060, 270, t, { aura: true, in: s.t0 + .1, poses: [[s.t0, "thinking"]], nohop: true }) + say(a, 520, 470, t, { size: 44, tail: -190, maxW: 600 }) + sMomo(t) + HUD(t); };
SC.r1card = (t, s) => roundCard(t, s, "ROUND 1", "YOUR ANSWER FROM LAST TIME");
const shipRing = (tt) => `<g clip-path="url(#cRing)"><rect x="250" y="290" width="360" height="200" fill="#BFE6FF"/><circle cx="530" cy="372" r="24" fill="#FFF3B8"/><rect x="250" y="480" width="360" height="170" fill="url(#wSea)"/><g transform="translate(430 ${n2(500 + 2 * Math.sin(tt))}) scale(.235)">${shipSide({ q: 1.9 })}${seaOver(tt, 2400, 700)}</g></g>`;
SC.r1 = (t, s) => lockN(t, { cards: ["Wood", "Air", "More metal"], tag: "metal · floats", q: "What is inside the ship that helps it to float?", tq: W(L1, "what") - .1, tc: [W(L1, "wood"), W(L1, "air"), W(L1, "more")], ring0: MK("ring0_r1"), dur: 3, lock: "e703",
  obj: shipRing, picks: [{ who: "pip", id: "e704", word: "1", x: true }, { who: "basil", id: "e705", word: "2" }, HAS("e706") ? { who: "momo", id: "e706", word: "2" } : { who: "momo", word: "2", fixed: true }],
  react: [[LE("e704") + .1, "pip", "thinking"], [LE("e705") + .1, "basil", "cheer"], ...(HAS("e706") ? [[LE("e706") + .1, "momo", "cheer"]] : [])] });

/* 8 · ([LOOK CLOSER] inside the ship is SC.lcship in closer.js) the answer: two, Air! */
SC.shipans = (t, s) => { const a = "e804", b = "e805", c = "e806", tA = W(a, "two") - .1, lit = t >= tA ? spring(t, tA, .45) : 0, tc = W(c, "one") - .1, hb = HAS(b);
  return bg("stage") + `<rect y="800" width="1920" height="280" fill="url(#xFloor)"/>` + TF(1000, 480, 1.05 * spring(t, s.t0 + .1, .45), ansCard(2, "Air", { lit, w: 330 })) + TF(1420, 470, spring(t, s.t0 + .25, .45), shipCard(t, 520, 280, "sa"))
    + (t >= s.t0 + .6 ? TF(1420, 660, spring(t, s.t0 + .6, .4), tpill(0, 0, "trapped air inside", 38, "#fff", P.ink, { w: 700 })) : "")
    + buddy("pip", 330, 1060, 300, t, { aura: true, in: s.t0 + .1, poses: hb ? [[s.t0, "sit"], [tA, "surprised"], [LT(b) - .12, "sit"], [LE(b) + .1, "cheer"]] : [[s.t0, "sit"], [tA, "surprised"]], nohop: true }) + (hb ? say(b, 560, 620, t, { size: 46, tail: -180, maxW: 560 }) : "")
    + buddy("basil", 1700, 1062, 200, t, { aura: true, flip: true, in: s.t0 + .2, poses: [[s.t0, "sit"], [tA, "cheer"], [tA + 1.8, "sit"]] })
    + coin(t, tc, 1000, 840, "+1", "if you showed two fingers") + HUD(t); };

/* 9 · BE THE AIR: the lift-off (the journey itself is SC.shrink in shrink.js) */
const AIRC = "#EAF6FF", FARX = 1130;
SC.waitw = (t, s) => { const L = "e901", dive = ei((t - (s.t1 - 1.5)) / 1.5), e = eio((t - s.t0) / 1.2), cam = [lerp(1.04, 1.25, e) + 3.4 * dive, lerp(960, FARX, Math.max(e * .5, dive)), lerp(600, HZ - 10, Math.max(e * .6, dive))], tP = W(L, "be") - .2;
  return beachView(t, { tub: FULL, bowl: 1, jug: 1, tray: false, otter: false }, cam)
    + OP(1 - dive * 1.6, buddy("basil", 240, 1056, 220, t, { aura: true, in: s.t0 + .1, poses: [[s.t0, "cheer"], [s.t0 + 1.6, "sit"]], nohop: true }) + buddy("momo", 1680, 1056, 220, t, { aura: true, flip: true, in: s.t0 + .2, poses: [[s.t0, "sit"], [tP, "cheer"]], nohop: true })
      + (t >= tP ? TF(960, 250, spring(t, tP, .45), tpill(0, 0, "Be the air!", 76, P.sun, P.ink, { w: 700 })) : "") + HUD(t))
    + wipe(t, s.t1, AIRC, 960, 470); };

/* 10 · pull back out; Mark Sentence 2 (Basil): TRAPPED AIR pops beside the card as he reads "trapped" (lib.js o.at) */
SC.pullout = (t, s) => { const L = "e1001", e = eo((t - s.t0) / 1.1), cam = [lerp(4.2, 1.04, e), lerp(FARX, 960, e), lerp(HZ - 10, 600, e)];
  return beachView(t, { tub: FULL, bowl: 1, jug: 1, tray: false }, cam) + (HAS(L) && t >= LT(L) - .1 ? TF(960, 250, spring(t, LT(L) - .1, .45), tpill(0, 0, "Why does a metal ship float?", 56, P.ink, "#fff", { w: 700 })) : "")
    + sPip(t, { in: s.t0 + .5 }) + sBasil(t, { in: s.t0 + .6 }) + sMomo(t, { in: s.t0 + .7 }) + wipe(t, s.t0, AIRC) + HUD(t); };
SC.mark2 = (t, s) => markScene(t, s, { id: "e1003", sayId: "e1002", who: "basil", n: "2 of 2", text: "This is because there is a lot of trapped air inside the ship. The trapped air helps the ship to float on water.", keys: ["lot", "trapped", "air", "inside", "helps", "float"], size: 58, x: 570, w: 960, y: 230, footer: FOOT,
  extra: OP(ramp(t, s.t0 + .3, .3), T(1075, 175, "Why does a metal ship float?", 44, "#fff", { w: 600 })) + TF(830, 930, spring(t, s.t0 + .4, .5), shipCard(t, 440, 230, "m2")) });

/* 11 · the metal bowl: an adult's hands set it on the water; ([LOOK CLOSER] is SC.lcbowl in closer.js) */
SC.bowl = (t, s) => { const a = "e1101", e = eio((t - s.t0) / .9), cam = lc3(CAMB, CAMT, e), tin = s.t0 + .2, tRel = W(a, "bowl") + .25, dn = eio((t - tin) / (tRel - tin)), bw = tubW(TIN.bowlF[0], TIN.bowlF[1] - 62), held = t < tRel;
  const arm = held ? TF(bw[0], lerp(bw[1] - 520, bw[1], dn), TUBS, holdDown(bowlSteel(), 62, .62)) : t < tRel + .8 ? TF(bw[0], bw[1] - 500 * ei((t - tRel) / .8), TUBS, `<g transform="scale(.62)">${adultArm()}</g>`) : "";
  return beachView(t, { tub: { mb: 1, bowl: held ? 0 : "float" }, trayS: { mb: 1 }, jug: 1, front: arm }, cam)
    + (t >= W(a, "metal") - .1 ? TF(gx(cam, BX.tub) + 330, gy(cam, TYB - 250), spring(t, W(a, "metal") - .1, .4), tpill(0, 0, "a metal bowl", 42, "#fff", P.ink, { w: 700 })) : "") + sPip(t) + sBasil(t) + sMomo(t) + HUD(t); };

/* 12 · the score hand, the otter, the key words (kwrecap in common.js) */
SC.final = (t, s) => { const L = "e1201"; return finalScene(t, s, L, 1, [[s.t0, null, 1], [W(L, "two") - .1, null, 2]]); };
SC.liz = (t, s) => { const L = "e1202", tq = W(L, "it") - .1; return lizReveal(t, s, L, beachView(t, { tub: FULL, bowl: 1, jug: 1, tray: false, wave: ss(tq - .2, tq + .2, t) }), OTT[0], OTT[1] - 6, tq, "It was swimming by the rocks!", 160, 96, 62, 2.0); };

/* 13 · the cliffhanger: rain */
const CLX = { tub: 600, board: 1010, coat: 1330, shoe: 1590 };
SC.cliff = (t, s) => { const a = "e1301", b = "e1302", c = "e1303", tC = W(b, "plastic") - .5, tS = W(b, "fabric") - .5, tQ = W(b, "which") - .1, tP = W(c, "find") - .1, [cx, cd] = slideX(t, tC, .7, 2300, CLX.coat, TYB + 20), [sx, sd] = slideX(t, tS, .7, 2400, CLX.shoe, TYB + 30);
  const rn = .45 + .55 * ss(s.t0, s.t0 + 4, t);
  return beachView(t, { rain: rn, tub: { wb: 1, mb: 1 }, tubX: CLX.tub, tray: false, back: TF(CLX.board, TYB - 60, .5, board3(t, { glow: 1 })),
      items: (t >= tC ? cd + TF(cx, TYB + 20, .78, coatStand()) : "") + (t >= tS ? sd + TF(sx, TYB + 30, .5, shoeTray()) : "") }, CAMB)
    + (t >= tC + .7 ? TF(gx(CAMB, CLX.coat) - 60, gy(CAMB, TYB - 340), spring(t, W(b, "plastic") - .1, .4), tpill(0, 0, "plastic", 42, "#fff", P.ink, { w: 700 })) : "") + (t >= tS + .7 ? TF(gx(CAMB, CLX.shoe) + 30, gy(CAMB, TYB - 130), spring(t, W(b, "fabric") - .1, .4), tpill(0, 0, "fabric", 42, "#fff", P.ink, { w: 700 })) : "")
    + (t >= tQ ? TF(gx(CAMB, (CLX.coat + CLX.shoe) / 2 + 40), gy(CAMB, TYB - 250), spring(t, tQ, .5) * (1 + .05 * Math.sin(t * 4)), `<g filter="url(#dropS)"><circle r="54" fill="url(#gSun)"/></g>${T(0, 28, "?", 84, P.ink)}`) : "")
    + buddy("basil", 200, 1060, 250, t, { aura: true, in: s.t0 + .15, poses: [[s.t0, "surprised"], [LT(a) - .12, "sit"], [LE(a) + .1, "oops"], [LE(a) + 1.8, "sit"]], nohop: true }) + say(a, 480, 560, t, { size: 44, tail: -180, maxW: 520 }) + sMomo(t, { poses: [[s.t0, "surprised"], [s.t0 + 1.8, "sit"]] })
    + (t >= tP ? TF(620, 430, lerp(2.2, 1, eo((t - tP) / .16)) + .05 * wob(t, tP + .16, .4), `<text x="0" y="50" font-family="Fredoka" font-weight="700" font-size="170" text-anchor="middle" letter-spacing="6" fill="${P.sun}" stroke="${P.ink}" stroke-width="28" stroke-linejoin="round" paint-order="stroke" filter="url(#drop)">PART 2</text>`) : "") + HUD(t); };

/* 14 · "Now you know!": the tub (wooden block floating, metal block on the bottom) centred in the free space between the buddies */
SC.nyk = (t, s) => nykScene(t, s, TF(940, 1048, .98, tubSvg({ t, inner: tubThings({ wb: 1, mb: 1 }, t) })), { bx: [200, 1715, 1375], hx: 470 });
})(); }
