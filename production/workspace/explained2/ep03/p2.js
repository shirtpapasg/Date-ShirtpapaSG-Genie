// p2.js: PART 2, "5 Eggs, 21 Days. Will EVERY Egg Hatch?": reproduce and grow. Segments 1-13 of the approved script (p3_ep03_script.md),
// with the section-6 trims 3, 4 and 5 (no mosquito counter, the short rules line, both sentences of 1.21 on one Mark Sentence card).
if (PART === 2) { (() => {
// a photo board standing on the ground: origin = the middle of its base; inner is drawn about the middle of its window
function board(inner, w, h, id, o = {}) { return `<ellipse cx="0" cy="4" rx="${w * .5}" ry="13" fill="${P.ink}" opacity=".22" filter="url(#b4)"/><path d="M-70 0 L-46 -44 H46 L70 0z" fill="url(#fWood)" stroke="#8A5E34" stroke-width="4" stroke-linejoin="round"/>
  <g filter="url(#drop)"><rect x="${-w / 2}" y="${-h - 30}" width="${w}" height="${h}" rx="24" fill="url(#gPaper)"/></g><defs><clipPath id="${id}"><rect x="${-w / 2 + 16}" y="${-h - 14}" width="${w - 32}" height="${h - 32 - (o.lab ? 60 : 0)}" rx="14"/></clipPath></defs>
  <g clip-path="url(#${id})"><rect x="${-w / 2}" y="${-h - 30}" width="${w}" height="${h}" fill="${o.fill || "#DDF1D2"}"/><g transform="translate(0 ${n2(-h / 2 - 30 - (o.lab ? 30 : 0))})">${inner}</g></g>${o.lab ? T(0, -52, o.lab, o.size || 38, P.ink) : ""}`; }
// a label joined to its part by one plain line (dark, for light pictures)
const lab = (x, y, txt, px, py, k = 1, size = 32) => k < .02 ? "" : OP(Math.min(1, k), `<path d="M${x} ${y} L${px} ${py}" stroke="${P.ink}" stroke-width="4" stroke-linecap="round"/><circle cx="${px}" cy="${py}" r="6" fill="${P.ink}"/>`) + TF(x, y, Math.min(1.06, k), tpill(0, 0, txt, size, "#fff", P.ink, { w: 700 }));
const eggsIn = (f) => EGGX.map((x, i) => TF(x, -112, 1, f(i))).join("");
const fBud = (t, o = {}) => ["pip", "basil", "momo"].map((w, i) => buddy(w, 1200 + i * 250, 1062, 185, t, { aura: true, tag: false, ...(o[w] || {}) })).join("");
const henChicks = (t, n = 4) => TF(0, 0, 1, hen({ bob: .3 * Math.sin(t * 1.3) })) + [[150, 0], [205, 8], [-150, 6], [262, 0]].slice(0, n).map(([x, y], i) => TF(x, y, .62, `<g transform="translate(0 ${n2(-5 * Math.abs(Math.sin(t * 5 + i * 1.3)))})">${chick()}</g>`)).join("");
const ALL3 = { 0: 0, 1: 0, 2: 0 };

/* ============ 1 · the silent recap montage: five shots from Part 1 ============ */
// the thumbnail's frame: the nest large, left of centre, five eggs, one with a crack and a tiny beak; the DAY 21 card above; Momo far left
const THUMB2 = (t) => farmView(t, { day: false, wire: false, cat: false, tags: true, nest: eggsIn((i) => egg(i === 0 ? { crack: 1, beak: true } : {})) }, [1.45, -86, 867]) + TF(720, 330, 1.5, dayCard(21)) + buddy("momo", 235, 800, 300, t, { aura: true, tag: false, pose: "surprised", still: true }) + logo(t);
SC.recap = (t, s) => { if (location.search.includes("thumb")) return THUMB2(t); const i = Math.min(4, Math.floor((t - s.t0) / 1.0)), u = t - s.t0 - i, tip = leafTip(0), cam = [1.7, 1400, 800]; let v;
  if (i === 0) v = gardenView(t, { f: { 0: [ss(.2, .75, u), ss(.65, .98, u)] } }, cam) + TF(camX(cam, MXY[0] + tip[0]) + 6, camY(cam, MXY[1] + tip[1]) - 8 - 60 * (1 - eo(u / .2)), .8, `<g transform="rotate(24)">${pointer()}</g>`);
  else if (i === 1) v = gardenView(t, { items: TF(800, 968, .78, stopwatch(.6 + u * .3)) }, [1.12, 1150, 770]);
  else if (i === 2) v = bg("daystage") + TF(960, 1012, 1.12, trailCard(t, { 1: s.t0 + 2.4 })) + stampPress(t, s.t0 + 2.4, 960, 1012, 1.12, 1);
  else if (i === 3) v = bg("daystage") + TF(960, 1010, .9, notebook(t, { pull: ss(.15, .55, u), lit: [.7, 0, 0] }));
  else v = farmView(t, { nest: henOnNest(t), cat: false }, [1.35, 240, 640]);
  return v + `<rect width="1920" height="1080" fill="#fff" opacity="${n2(.5 * (1 - clamp(u / .18)))}"/>` + tpill(960, 60, "Part 1", 34, P.ink, P.sun, { w: 700, ls: 3 }); };

/* ============ 2 · "Last time..." ============ */
SC.lasttime = (t, s) => { const L = "b201", tM = W(L, "mimosa") - .2, tF = W(L, "farm") - .3, gm = pulse(t, tM + .2, .2, 2.2), gh = pulse(t, tF + .2, .2, 2.0);
  return farmView(t, { nest: henOnNest(t), wall: glowDisc(FARM.nest[0], FARM.nest[1] - 110, 240, gh) }) + glowDisc(330, 880, 260, gm)
    + TF(250, 1058, .6, trailCard(t, { 1: 0 })) + TF(560, 1058, .9, board(`<rect x="-200" y="-200" width="400" height="400" fill="#CFEFC6"/>` + TF(0, 96, .36, mimosa(t, { 0: [ss(tM + .2, tM + 1.0, t), ss(tM + .9, tM + 1.5, t)] })), 250, 250, "ltm"))
    + fBud(t, { pip: { in: s.t0 + .1 }, basil: { in: s.t0 + .2, poses: [[s.t0, "sit"], [tM, "cheer"], [tM + 1.8, "sit"]], nohop: true }, momo: { in: s.t0 + .3 } })
    + (t >= tF ? TF(960, 220, spring(t, tF, .45), lowerPill(-190, -31, "A farm in", "Kranji")) : "") + HUD(t); };

/* ============ 3 · today's goals, the game ============ */
SC.goals = (t, s) => goals3(t, s, [["Why living things reproduce", TF(-46, 6, 1.1, egg({ crack: 1 })) + TF(40, 46, 1.0, chick())], ["How living things grow", TF(-60, 56, .5, chick()) + TF(40, 62, .42, hen())],
  ["Three things living things can do", [0, 1, 2].map((i) => `<g transform="translate(${-110 + i * 110} 0) scale(.8)"><circle r="54" fill="${STAMPS[i][1]}" stroke="#fff" stroke-width="5"/>${stampIcon(i)}</g>`).join("")]]);
SC.game = (t, s) => gameScene(t, s, "b301", false);

/* ============ 4 · Round 1: will every egg hatch? ============ */
SC.r1 = (t, s) => { const a = "b401", L = "b402", tQ = LT(L) - .15;
  return lockN(t, { cards: ["YES, every egg", "NO, not every egg"], q: "Does every egg hatch?", tq: W(L, "does") - .1, tc: [W(L, "one", 1), W(L, "two")], ring0: MK("ring0_1"), dur: 5, lock: "b403",
    obj: (tt) => TF(430, 566, .5, nestBox(eggsIn(() => egg()), { tags: true })) + TF(430, 352, .62, dayCard(21)),
    pre: (tt) => buddy("momo", 1380, 1056, 400, tt, { aura: true, flip: true, in: s.t0 + .1, out: tQ, poses: [[s.t0, "pointing"], [LT(a) - .12, "sit"]] }) + (tt < tQ ? say(a, 1300, 470, tt, { size: 48, tail: 120, x: true, maxW: 640 }) : ""),
    picks: [{ who: "momo", fixed: true, word: "1" }, { who: "pip", id: "b404", word: "1", x: true }, { who: "basil", id: "b405", word: "2" }], react: [[LE("b404") + .1, "pip", "pointing"], [LE("b405") + .1, "basil", "cheer"]] }); };
const CAMH = [2.1, 25, 877], hx = (x) => camX(CAMH, FARM.nest[0] + x * .78), hy = (y) => camY(CAMH, FARM.nest[1] + y * .78);
SC.hatch = (t, s) => { const L = "b407", c1 = MK("crack1"), T = [W(L, "one") - .1, W(L, "two") - .1, W(L, "three") - .1, null, W(L, "four") - .1], tS = MK("still"), tA = W("b408", "two") - .1, lit = t >= tA ? spring(t, tA, .45) : 0;
  const eggs = eggsIn((i) => i === 3 ? egg() : i === 0 && t < T[0] ? egg({ crack: clamp((t - c1 - .15) / .8), beak: t >= W(L, "beak") - .15 }) : hatching(t - T[i]));
  const st = ss(tS - .1, tS + .4, t) * (1 - ss(tA + 1.5, tA + 2, t));
  return farmView(t, { nest: eggs, tags: true, cat: false, wire: false, items: TF(820, 806, .8, hen({ bob: .4 * Math.sin(t * 1.5) })) }, CAMH)
    + OP(st, `<ellipse cx="${n2(hx(EGGX[3]))}" cy="${n2(hy(-112))}" rx="92" ry="108" fill="none" stroke="#fff" stroke-width="7" stroke-dasharray="14 12"/>`)
    + TF(190, 250, 1.15, wallClock(9 + Math.max(0, t - c1) * .55)) + speeded(t, c1, s.t1 + 1, 190, 400)
    + (t >= tA ? TF(215, 880, .58 * spring(t, tA, .4), ansCard(2, "NO, not every egg", { lit, w: 340 })) : "")
    + buddy("momo", 1760, 1062, 190, t, { aura: true, tag: false, flip: true, in: s.t0 + .2, poses: [[s.t0, "sit"], [T[0], "cheer"], [T[0] + 1.6, "sit"], [tS + .2, "surprised"], [tA + .3, "oops"]], nohop: true }) + HUD(t); };
const settled = (t) => TF(EGGX[3] * 1.3 + 60, -104, .9, egg()) + TF(-40, -62, 1.5, hen({ sit: 1, bob: .3 * Math.sin(t * 1.3) })) + [[-250, -84], [118, -80], [176, -84], [-200, -80]].map(([x, y], i) => TF(x, y + 3 * Math.sin(t * 4 + i), .7, chick())).join("");
SC.after = (t, s) => { const tc = W("b411", "one") - .1, cam = [1.4, 250, 880];
  return farmView(t, { nest: settled(t), cat: false }, cam)
    + buddy("momo", 1480, 1056, 330, t, { aura: true, flip: true, in: s.t0 + .1, poses: [[s.t0, "oops"], [LT("b409") - .12, "sit"], [LE("b409") + .3, "thinking"], [tc, "sit"]] }) + say("b409", 1400, 560, t, { size: 52, tail: 80 })
    + finePrint(t, s.t0 + .6, "We look. We do not touch. The chicks stay with the hen.", 560, 1034) + coin(t, tc, 1100, 360, "+1", "if you showed two fingers")
    + (t >= tc + .7 ? TF(1560, 160, spring(t, tc + .7, .4), tpill(0, 0, "Buddies: needs two good answers", 28, P.ink, "#DDD3FF", { w: 600 })) : "") + HUD(t); };
SCORE.push([W("b411", "one") - .1, 1, 0]);

/* ============ 5 · reproduce: more of them ============ */
const farmDim = (t, o = .4) => farmView(t, { nest: settled(t) }) + `<rect width="1920" height="1080" fill="${P.night}" opacity="${o}"/>`;
const grassPic = `<rect x="-400" y="-400" width="800" height="800" fill="#CFEBFF"/><rect x="-400" y="60" width="800" height="400" fill="#8FDB7A"/>`;
SC.boards = (t, s) => { const L = "b501", t1 = W(L, "yesterday") - .25, t2 = W(L, "today") - .25;
  return farmDim(t) + TF(540, 960, spring(t, t1, .45), board(grassPic + TF(-20, 150, 1.15, hen()), 640, 600, "bd1", { lab: "YESTERDAY", size: 44 }))
    + TF(1380, 960, spring(t, t2, .45), board(grassPic + TF(-120, 150, 1.15, henChicks(t)), 640, 600, "bd2", { lab: "TODAY", size: 44 })) + HUD(t); };
SC.mark1 = (t, s) => markScene(t, s, { id: "b503", sayId: "b502", who: "pip", n: "1 of 3", text: "When living things reproduce, there will be more of them. The ability to reproduce is important to ensure the survival of all living things.", keys: ["reproduce,", "more", "them.", "reproduce", "ensure", "survival"], size: 56, y: 256 });
SC.animals = (t, s) => { const a = "b504", b = "b505", c = "b506", tR = LT(c) - .35;
  return farmDim(t) + TF(500, 850, spring(t, s.t0 + .15, .45), board(`<rect x="-400" y="-400" width="800" height="800" fill="#EADCC6"/><rect x="-400" y="110" width="800" height="300" fill="#C9B08A"/>` + TF(0, 170, 1.25, catBasket(t)), 760, 560, "an1"))
    + TF(1420, 850, spring(t, tR, .45), board(grassPic + TF(-150, 150, 1.1, henChicks(t, 3)) + TF(250, 150, .9, `<g transform="rotate(20)">${shellHalf(false)}</g>`) + TF(170, 164, .8, `<g transform="rotate(-70)">${shellHalf(true)}</g>`), 760, 560, "an2"))
    + bookCap(t, a, "Some animals reproduce by giving birth to their young alive.", 925, { size: 38, maxW: 580, x: 440 }) + bookCap(t, c, "Other animals lay eggs and their young hatch out of the eggs.", 925, { size: 38, maxW: 580, x: 1480 })
    + buddy("momo", 960, 1066, 200, t, { aura: true, in: s.t0 + .3, poses: [[s.t0, "sit"], [LT(b) - .5, "cheer"], [LT(b) - .12, "sit"], [LE(b) + .1, "pointing"]], nohop: true }) + say(b, 960, 760, t, { size: 46, tail: 0, maxW: 560 }) + HUD(t); };
SC.plants = (t, s) => { const a = "b507", b = "b508", c = "b509", d = "b510", e = "b511", tL = LT(b) - .3, tR = LT(d) - .35, tFl = W(e, "look") - .1, fl = eio((t - tFl) / .7), sy = Math.cos(Math.PI * fl), tSeed = LT(c) + .1, tSp = tFl + .8;
  const tom = `<rect x="-400" y="-400" width="800" height="800" fill="#F4E6CF"/><rect x="-300" y="60" width="600" height="150" rx="24" fill="url(#fWood)" stroke="#8A5E34" stroke-width="6"/>` + TF(-70, 60, 1.25 * (1 + .06 * pulse(t, tSeed, .05, .6)), tomatoHalf()) + TF(190, 104, .9, `<g transform="rotate(-8)">${tomato()}</g>`) + TF(-330, 190, 1.05, `<g transform="rotate(-8)">${adultHand()}</g>`)
    + `<g transform="translate(120 200) rotate(-6)"><rect x="-150" y="-10" width="210" height="26" rx="5" fill="#E6ECF5" stroke="#8D97B2" stroke-width="4"/><rect x="56" y="-14" width="120" height="34" rx="12" fill="#4A3F6B"/></g>` + lab(180, -140, "seeds", -36, 46, spring(t, tSeed, .4), 40);
  const fern = `<rect x="-400" y="-400" width="800" height="800" fill="#B9B4C9"/><rect x="-400" y="-400" width="800" height="800" fill="${P.ink}" opacity=".18"/><rect x="-400" y="120" width="800" height="300" fill="#6DBF7E"/>` + TF(-250, 150, 1.2, fernClump(.8))
    + `<g transform="translate(-250 -10) rotate(-6) scale(1.35 ${n2(1.35 * (Math.abs(sy) < .08 ? .08 : sy))})">${fernLeaf(fl > .5)}</g>` + TF(330, -4 - 30 * Math.sin(Math.PI * fl), .95, `<g transform="scale(-1 1)">${adultHand()}</g>`) + lab(170, -200, "spores", 30, -48, spring(t, tSp, .4), 40);
  return farmDim(t) + TF(500, 850, spring(t, tL, .45), board(tom, 760, 560, "pl1")) + TF(1420, 850, spring(t, tR, .45), board(fern, 760, 560, "pl2"))
    + bookCap(t, b, "Some plants reproduce by producing seeds.", 925, { size: 38, maxW: 580, x: 440 }) + bookCap(t, d, "Other plants can reproduce through spores.", 925, { size: 38, maxW: 580, x: 1480 })
    + buddy("basil", 960, 1068, 195, t, { aura: true, in: s.t0 + .1, poses: [[s.t0, "arms_crossed"], [LT(a) - .12, "sit"], [LE(a) + .2, "surprised"], [tL + 1.5, "sit"]] }) + say(a, 960, 700, t, { size: 50, tail: 0, maxW: 620 })
    + finePrint(t, tL + .5, "An adult cuts.", 500, 300) + HUD(t); };

/* ============ 6 · why reproducing matters ============ */
const DEFX = "Living things that are not able to survive will become extinct. This means that they will all die out.";
SC.extinct = (t, s) => { const L = "b601", tW = W(L, "without") - .2, t0 = s.t0 + .2; let row1 = "", row2 = "";
  const mini = (k, x, y, in1, i) => TF(x, y, k, board(grassPic + in1, 210, 200, "ex" + i));
  for (let i = 0; i < 7; i++) { const k = spring(t, t0 + i * .22, .4); if (k > .02) row1 += mini(k, 230 + i * 245, 560, i % 2 ? TF(-52, 72, .62, chick()) + TF(0, 78, .62, chick()) + TF(52, 72, .62, chick()) : TF(-6, 78, .52, hen()), i) + (i < 6 ? OP(Math.min(1, k), `<path d="M${330 + i * 245} 430 h36 m-14 -12 l14 12 l-14 12" stroke="${P.ink}" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`) : ""); }
  for (let i = 0; i < 7; i++) { const k = spring(t, tW + i * .16, .4); if (k < .02) continue; row2 += i === 0 ? mini(k, 230, 930, TF(-6, 78, .52, hen()), 9) : TF(230 + i * 245, 930, k, `<rect x="-105" y="-230" width="210" height="200" rx="24" fill="#fff" opacity=".35" stroke="${P.ink2}" stroke-width="5" stroke-dasharray="14 12"/>`); }
  return bg("daystage") + row1 + row2 + (t >= t0 + 1.6 ? T(1880, 440, "…", 90, P.ink, { a: "end" }) : "") + HUD(t); };
// the book's definition, on a light cream strip with dark text, above the key-word dim (3.4 s)
window.OVER2 = (t, s) => { if (s.name !== "extinct") return ""; const t0 = MK("kw_extinct") + .3, a = ramp(t, t0, .3); if (a <= 0) return ""; const fam = "Atkinson Hyperlegible", ls = wrap(DEFX, 44, 1380, 700, fam);
  return OP(a, `<g filter="url(#drop)"><rect x="170" y="800" width="1580" height="210" rx="26" fill="#FFF8EA"/><rect x="170" y="800" width="16" height="210" rx="8" fill="${P.sun}"/></g><rect x="214" y="826" width="${n2(tw("extinct:", 44, 700, "Fredoka") + 36)}" height="62" rx="14" fill="#FFD75A"/>${T(232, 872, "extinct:", 44, P.ink, { a: "start" })}`
    + ls.map((l, i) => `<text x="${i === 0 ? 232 + tw("extinct:", 44, 700, "Fredoka") + 44 : 232}" y="${872 + i * 62}" font-family="${fam}" font-weight="700" font-size="${i === 0 ? 40 : 44}" fill="${P.ink}">${esc(l)}</text>`).join("")); };
const CARD2 = [960, 1012, 1.12];
SC.stamp2 = (t, s) => { const ts = s.t0 + .6; return bg("daystage") + TF(CARD2[0], CARD2[1], CARD2[2], trailCard(t, { 1: 0, 2: ts })) + stampPress(t, ts, CARD2[0], CARD2[1], CARD2[2], 2)
  + buddy("momo", 1560, 1056, 270, t, { aura: true, flip: true, in: s.t0 + .05, poses: [[s.t0, "pointing"], [ts + .1, "cheer"]], jump: [[ts - .25, 36]], nohop: true }) + TF(1330, 1058, 1, inkPad()) + HUD(t); };

/* ============ 7 · grow: bigger AND more complex ============ */
SC.grow = (t, s) => { const a = "b701", b = "b702", c = "b703", tG = W(b, "giant") - .3, tC = LT(c) + .1, k2 = ss(tC, tC + .5, t), tl = [W(c, "wing") - .1, W(c, "red") - .1, W(c, "tail") - .1];
  const cloud = t >= tG - .4 && t < tC + .2 ? TF(1330, 330, spring(t, tG - .4, .45) * (1 - ss(tC - .1, tC + .2, t)), `<g filter="url(#dropS)"><rect x="-250" y="-200" width="500" height="400" rx="130" fill="#FFF8EA" stroke="${P.momo}" stroke-width="8"/><circle cx="150" cy="232" r="22" fill="#FFF8EA" stroke="${P.momo}" stroke-width="7"/><circle cx="190" cy="284" r="13" fill="#FFF8EA" stroke="${P.momo}" stroke-width="6"/></g>
    <g transform="translate(-150 150) scale(.42)"><rect x="-130" y="-170" width="260" height="170" fill="url(#fWall)" stroke="#B9A27E" stroke-width="8"/><path d="M-160 -160 L0 -260 L160 -160z" fill="url(#fRoof)" stroke="#8E3A2E" stroke-width="8"/></g>${TF(30, 160, 3.0 * (1 + .03 * Math.sin(t * 6)), chick())}<g transform="translate(190 -130) rotate(10)"><circle r="40" fill="url(#gSun)"/>${T(0, 20, "?", 56, P.ink)}</g>`) : "";
  const side = k2 > .02 ? `<rect width="1920" height="1080" fill="#FFF8EA" opacity="${n2(.82 * k2)}"/><ellipse cx="800" cy="930" rx="640" ry="40" fill="${P.ink}" opacity="${n2(.12 * k2)}"/>` + OP(k2, TF(640, 920, 2.1, hen()) + TF(1180, 920, 2.1, chick()))
    + lab(310, 470, "tail", 360, 640, spring(t, tl[2], .4), 44) + lab(1060, 400, "red comb", 800, 458, spring(t, tl[1], .4), 44) + lab(470, 1010, "wing feathers", 600, 790, spring(t, tl[0], .4), 44) : "";
  return farmView(t, { nest: settled(t), cat: false }, [1.4, 250, 880]) + side
    + buddy("momo", 1600, 1056, 300, t, { aura: true, flip: true, in: s.t0 + .1, poses: [[s.t0, "thinking"], [LT(b) - .12, "sit"], [LE(b) + .15, "thinking"], [tl[0], "pointing"]] }) + (t < tC ? say(b, 1240, 640, t, { size: 46, tail: 200, maxW: 560 }) : "") + cloud + HUD(t); };
SC.mark3 = (t, s) => markScene(t, s, { id: "b705", sayId: "b704", who: "momo", n: "2 of 3", text: "When living things grow, they increase in size. They also become more complex.", keys: ["grow,", "increase", "size.", "more", "complex."], size: 64, y: 256, w: 890 });
SC.growline = (t, s) => { const L = "b706", PX = [520, 800, 1090, 1400], K = 1.45, tl = [W(L, "hair") - .25, W(L, "longer") - .1, W(L, "teeth") - .25]; let ppl = "", rul = "";
  for (let i = 0; i <= 12; i++) rul += `<path d="M-30 ${-i * 46} h${i % 5 ? 26 : 44}" stroke="${P.ink}" stroke-width="${i % 5 ? 4 : 6}" stroke-linecap="round"/>`;
  PX.forEach((x, a) => { const k = spring(t, s.t0 + .25 + a * .32, .45); if (k > .02) ppl += TF(x, 960, K * k, person(a)); });
  const hY = (a) => 960 - (PERSON_H[a] - [40, 44, 46, 48][a] * .86) * K;   // the middle of person a's head
  return bg("daystage") + TF(290, 962, 1, `<rect x="-36" y="-600" width="72" height="600" rx="10" fill="#FFE27A" stroke="#C98200" stroke-width="5"/>${rul}`) + ppl
    + lab(1400, 350, "more hair", 1400, hY(3) - 78, spring(t, tl[0], .4), 40) + lab(960, 430, "longer arms and legs", 1040, 960 - (150 + 98 - 70) * K, spring(t, tl[1], .4), 40) + lab(640, 480, "new teeth", 782, hY(1) + 24, spring(t, tl[2], .4), 40) + HUD(t); };
const pot3 = (x, inner, k) => k < .02 ? "" : TF(x, 900, k, `<ellipse cx="0" cy="62" rx="110" ry="14" fill="${P.ink}" opacity=".2" filter="url(#b4)"/>${inner}<path d="M-62-62 H62 L48 56 Q0 70 -48 56z" fill="url(#gPot)" stroke="#9C4423" stroke-width="5" stroke-linejoin="round"/><rect x="-72" y="-78" width="144" height="30" rx="12" fill="url(#gPot)" stroke="#9C4423" stroke-width="5"/><ellipse cx="0" cy="-76" rx="60" ry="11" fill="#5A3A28"/>`);
SC.pots = (t, s) => { const a = "b707", b = "b708", tp = [W(b, "seed") - .25, W(b, "small") - .25, W(b, "bigger") - .25], ts = MK("stamp3") + .2, C3 = [1560, 1056, .6];
  const small = `<path d="M0 -76 V-150" stroke="#2C9A55" stroke-width="8" stroke-linecap="round"/>${[-1, 1].map((sg) => `<g transform="translate(0 -150) rotate(${sg * 55 - 90})"><path d="M0 0 Q24 -22 62 0 Q24 22 0 0z" fill="url(#mLeafA)" stroke="#2C8F4B" stroke-width="4" stroke-linejoin="round"/></g>`).join("")}`;
  return bg("daystage") + `<rect x="250" y="950" width="1100" height="34" rx="12" fill="url(#fWood)" stroke="#8A5E34" stroke-width="5"/>` + OP(.5 * ramp(t, tp[2], .6), `<path d="M1500 60 L1260 60 L1000 900 L1350 900z" fill="#FFE9A8" filter="url(#b30)"/>`)
    + pot3(420, `<ellipse cx="0" cy="-84" rx="13" ry="9" fill="#F4E3B8" stroke="#B9A27E" stroke-width="3"/>`, spring(t, tp[0], .45)) + pot3(800, small, spring(t, tp[1], .45)) + pot3(1180, TF(0, -76, 1.25, tomatoPlant(1, { flowers: true })), spring(t, tp[2], .45))
    + TF(C3[0], C3[1], C3[2], trailCard(t, { 0: ts, 1: 0, 2: 0 })) + stampPress(t, ts, C3[0], C3[1], C3[2], 0)
    + buddy("momo", 1830, 1064, 165, t, { aura: true, tag: false, flip: true, in: s.t0 + .2, poses: [[s.t0, "sit"], [ts + .1, "cheer"]], jump: [[ts - .25, 30]], nohop: true })
    + bookCap(t, a, "Like animals, plants also increase in size and become more complex as they grow.", 170, { size: 46, maxW: 1000, x: 780, t1: LT(b) + 2.2 }) + HUD(t); };

/* ============ 8 · Showdown: Basil's trail notes ============ */
const NT = [1000, 1052, .95];
// o: notes (trailNotes options), liz (0 shown .. 1 hidden), side (svg)
const showView = (t, o = {}) => farmView(t, { nest: settled(t), wall: lizOnWall(t, o.liz === undefined ? 1 : o.liz) }) + `<rect x="400" width="1520" height="1080" fill="${P.night}" opacity=".3"/>` + (o.side || "") + TF(NT[0], NT[1], NT[2], trailNotes(t, o.notes || {}));
const fernCard = (k) => TF(1700, 720, k, board(`<rect x="-200" y="-200" width="400" height="400" fill="#CFE6C6"/><g transform="translate(-112 0) scale(.58)">${fernLeaf(true)}</g>`, 300, 230, "fc"));
SC.show = (t, s) => { const a = "b801", b = "b802", c = "b803", r0 = MK("ring0_2"), bell = MK("bell_2"), rs = ringState(t, r0, 6), tLz = LT(b) + .3, liz = 1 - ramp(t, tLz, .25) * (1 - ramp(t, tLz + 3.0, .2));
  const tr = [W(b, "one"), W(b, "two"), W(b, "three")], tcn = [W(c, "one", 1), W(c, "two"), W(c, "three")], tP = LT("b805"), tM = LT("b806"), tO = LT("b807");
  const lit = [0, 1, 2].map((i) => t < LT(c) ? (t >= tr[i] - .1 && t < (tr[i + 1] || LE(b)) - .1 ? 1 : 0) : 0), badge = [0, 1, 2].map((i) => Math.max(pulse(t, tcn[i], .04, .5), t >= r0 && t < bell ? (Math.floor((t - r0) / .5) % 3 === i ? .5 + .5 * rs.tick : 0) : 0));
  const nf = t >= tcn[2] - .1 ? 3 : t >= tcn[1] - .1 ? 2 : 1, ringOn = t >= tcn[0] - .3 && t < bell + .8, RX = 255, RY = 760;
  return showView(t, { liz, notes: { lit, badge, x: spring(t, tP + .5, .4) }, side: t >= tP + 1.0 ? fernCard(spring(t, tP + 1.0, .45)) : "" })
    + buddy("basil", 1720, 1060, 270, t, { aura: true, flip: true, in: s.t0 + .1, poses: [[s.t0, "cheer"], [LT(a) - .12, "sit"], [LE(b) + .2, "arms_crossed"], [tO - .12, "oops"]], nohop: true }) + say(a, 1560, 560, t, { size: 50, tail: 120 }) + say("b807", 1600, 400, t, { size: 56, tail: 100 })
    + (ringOn ? OP(1 - ss(bell + .5, bell + .8, t), TF(RX, RY, spring(t, tcn[0] - .3, .4), `<g transform="translate(${-RX} ${-RY})">${ringTimer(RX, RY, t < r0 ? 1 : rs.frac, t < r0 ? 6 : rs.secs, t, { R: 128, sw: 22, tick: rs.tick, shut: pulse(t, bell, .01, .6), inner: TF(RX, RY + 60, .62, countHand(nf)) })}</g>`) + youPill(RX, RY - 178, 1.0) + tpill(RX, RY + 222, "line 1, 2 or 3?", 30, P.ink, "#fff")) : "")
    + (t >= bell + .9 ? buddy("pip", 150, 1062, 200, t, { aura: true, in: bell + .9, poses: [[bell + .9, "thinking"], [tP - .12, "sit"], [LE("b805") + .1, "pointing"]] }) + pickNum("pip", 290, 990, t, tP - .1, "3") + buddy("momo", 420, 1062, 200, t, { aura: true, in: bell + 1.0, poses: [[bell + 1, "thinking"], [tM - .12, "sit"], [LE("b806") + .1, "cheer"]], nohop: true }) + pickNum("momo", 560, 990, t, tM - .1, "3")
      + say("b805", 270, 730, t, { size: 38, tail: -110, maxW: 400 }) + say("b806", 280, 730, t, { size: 38, tail: 130, maxW: 400 }) : "")
    + stamp(t, LT("b804") - .08, 960, 480) + bellIcon(t, r0) + HUD(t); };
SC.fixed = (t, s) => { const b = "b808", tc = W("b809", "two") - .1, rub = ss(s.t0 + .15, s.t0 + .6, t), wr = ss(s.t0 + .6, LT(b) + .7, t);
  return showView(t, { notes: { fixing: true, rub, write: wr, tick: spring(t, LE(b) - .2, .45) }, side: fernCard(1) })
    + buddy("basil", 1720, 1060, 270, t, { aura: true, flip: true, poses: [[s.t0, "sit"], [LE(b) + .1, "cheer"], [LE(b) + 2, "sit"]], nohop: true }) + say(b, 1500, 430, t, { size: 46, tail: 160, maxW: 560 })
    + buddy("pip", 150, 1062, 200, t, { aura: true, tag: false, poses: [[s.t0, "sit"], [LE(b), "cheer"]] }) + buddy("momo", 420, 1062, 200, t, { aura: true, tag: false, poses: [[s.t0, "sit"], [LE(b), "cheer"]] })
    + coin(t, tc, 300, 600, "+2", "if you showed three fingers") + HUD(t); };
SCORE.push([W("b809", "two") - .1, 3, 2]);

/* ============ 9 · three stamps, the chant ============ */
SC.stamps = (t, s) => { const L = "b901", tw_ = [W(L, "grow") - .1, W(L, "respond") - .1, W(L, "reproduce") - .1], fl = tw_.map((x) => pulse(t, x, .05, 1.2));
  const pics = [grassPic + TF(-60, 96, .62, henChicks(t, 2)), `<rect x="-200" y="-200" width="400" height="400" fill="#CFEFC6"/>` + TF(0, 100, .34, mimosa(t)), grassPic + TF(0, 110, .6, nestBox(eggsIn(() => egg()))) + TF(-10, 70, .62, hen({ sit: 1 }))];
  return bg("daystage") + pics.map((p, i) => { const k = spring(t, tw_[i], .45); return k < .02 ? "" : TF(960 + (i - 1) * 420, 420, k * (1 + .05 * fl[i]), board(p, 330, 290, "st" + i)); }).join("")
    + TF(CARD2[0], CARD2[1], CARD2[2], trailCard(t, ALL3, { flash: fl })) + buddy("pip", 200, 1056, 250, t, { aura: true, in: s.t0 + .1, poses: [[s.t0, "cheer"], [s.t0 + 1.8, "sit"]] }) + buddy("momo", 1720, 1056, 250, t, { aura: true, flip: true, in: s.t0 + .2, poses: [[s.t0, "cheer"], [s.t0 + 1.8, "sit"]] }) + HUD(t); };
SC.mark4 = (t, s) => { const id = "b903", w3 = [TL.lines[id].words[2].a, TL.lines[id].words[3].a, TL.lines[id].words[7].a];
  const row = [0, 1, 2].map((i) => { const on = t >= w3[i] - .05, k = 1 + .2 * pulse(t, w3[i], .04, .5); return `<g transform="translate(${960 + i * 230} 905) scale(${n2(k)})" opacity="${on ? 1 : .35}"><circle r="62" fill="${STAMPS[i][1]}" stroke="#fff" stroke-width="6"/>${stampIcon(i)}</g>`; }).join("");
  return markScene(t, s, { id, sayId: "b902", who: "pip", n: "3 of 3", text: "Living things grow, respond to changes and reproduce.", keys: ["grow,", "respond", "to", "changes", "reproduce."], size: 72, y: 256, w: 890,
    extra: row + buddy("basil", 1660, 1062, 170, t, { aura: true, tag: false, flip: true, in: s.t0 + .3 }) + buddy("momo", 1830, 1062, 150, t, { aura: true, tag: false, flip: true, in: s.t0 + .4 }) }); };
SC.chant = (t, s) => chantScene(t, s, "c1003", { sayId: "u1002" });

/* ============ 10 · score hand, the lizard ============ */
SC.final = (t, s) => { const L = "b1001"; return finalScene(t, s, L, 2, [[s.t0, null, 1], [W(L, "more") - .1, "More than two? You beat the Buddies!", 3], [W(L, "three") - .1, null, 3]], TF(1260, 1062, .42, trailCard(t, ALL3))); };
SC.liz = (t, s) => { const L = "b1002"; return lizReveal(t, s, L, showView(t, { liz: 0 }), FARM.day[0] + 4, FARM.day[1] + 132, W(L, "does") - .1, "Eggs, or young born alive?", 215); };

/* ============ 11 · the dare for Episode 4 ============ */
SC.dare = (t, s) => { const L = "b1101", tw_ = [W(L, "hen") - .15, W(L, "cat") - .15, W(L, "tomato") - .15, W(L, "fern") - .15], tX = WE(L, "fern") + .35, tF = W(L, "four") - .2, tN = W(L, "can") - .1, g = (i) => pulse(t, i < 4 ? tw_[i] : tX + (i - 4) * .45, .1, 1.1);
  const wash = TF(270, 1050, 1.0 * (1 - ss(tF - .3, tF, t)), board(`<rect x="-300" y="-300" width="600" height="600" fill="#DDF1FF"/><rect x="-22" y="-150" width="44" height="60" rx="8" fill="#8D97B2" stroke="#5E6788" stroke-width="5"/><rect x="-70" y="-166" width="140" height="24" rx="12" fill="#3A8DFF" stroke="#1F5FD0" stroke-width="5"/><path d="M0 -88 V10" stroke="#8CC8FF" stroke-width="18" stroke-linecap="round"/><g fill="${SKIN}" stroke="${SKIN2}" stroke-width="5"><rect x="-116" y="0" width="120" height="60" rx="26" transform="rotate(14 -56 30)"/><rect x="-4" y="0" width="120" height="60" rx="26" transform="rotate(-14 56 30)"/></g><circle cx="-64" cy="-26" r="11" fill="#fff" stroke="#8CC8FF" stroke-width="4"/><circle cx="70" cy="-36" r="14" fill="#fff" stroke="#8CC8FF" stroke-width="4"/>`, 480, 430, "wh", { lab: "Wash your hands after the farm.", size: 30 }));
  const crates = [0, 1, 2, 3].map((i) => { const [x, d] = slideX(t, tF + i * .16, .4, 2200 + i * 80, 470 + i * 330, 1050); return t >= tF + i * .16 ? d + TF(x, 1050, 1.15, crate()) : ""; }).join("");
  return farmView(t, { nest: settled(t), wall: glowDisc(FARM.nest[0], FARM.nest[1] - 110, 230, g(0)) + glowDisc(FARM.cat[0], FARM.cat[1] - 50, 170, g(1)) + glowDisc(FARM.bed[0], FARM.bed[1] - 90, 230, g(2)) + glowDisc(FARM.fern[0] + 60, FARM.fern[1] - 110, 200, g(3)) + glowDisc(900, 870, 130, g(4)) + glowDisc(1500, 500, 90, g(5)),
      items: TF(900, 902, .72, mushroomLog()) + TF(1500 + 30 * Math.sin(t * 1.3), 500 + 16 * Math.sin(t * 2.1), .62, `<g transform="scale(${n2(.6 + .4 * Math.abs(Math.sin(t * 9)))} 1)">${GT.butterfly()}</g>`) })
    + (t < tF ? wash : "") + crates
    + buddy("momo", 1740, 1060, 230, t, { aura: true, flip: true, in: s.t0 + .1, out: tF + .2, poses: [[s.t0, "thinking"], [tw_[0], "pointing"]] }) + buddy("basil", 170, 1060, 230, t, { aura: true, in: tF + .5, poses: [[tF + .5, "surprised"]] })
    + (t >= tN ? TF(790, 250, lerp(1.6, 1, eo((t - tN) / .16)) + .04 * wob(t, tN + .16, .4), `<g filter="url(#drop)"><rect x="-590" y="-120" width="1180" height="240" rx="50" fill="${P.ink}"/></g>${T(0, -30, "NEXT", 54, P.sun, { ls: 12 })}${T(0, 62, "Millions of living things, only 4 groups", 54, "#fff")}`) : "") + HUD(t); };
SC.nyk = (t, s) => nykScene(t, s, TF(700, 1040, .92, henChicks(t, 4)) + TF(1040, 1040, .4, trailCard(t, ALL3)));
})(); }
