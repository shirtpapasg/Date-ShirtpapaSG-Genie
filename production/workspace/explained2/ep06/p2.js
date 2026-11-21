// p2.js: PART 2, "Is a Bat a BIRD? How to Spot a Mammal": be a hair, mammals (hair or fur, milk, warm-blooded), same and different with a
// reason, the odd one out, the mystery creature (a sea turtle), six tiles, the chant, the Exam corner, the dare for EP7. Script section 5.
if (PART === 2) { (() => {
const ST = () => ({ 3: -1, 4: -1, 5: MK("stampMam") + .02 }), STP = { 3: -1, 4: -1 };
const board = (t, st, o = {}, at = [1590, 1062, .5]) => TF(at[0], at[1], at[2], sixBoard(t, st, o));
const ringClip = (inner) => `<clipPath id="rgc2"><circle cx="430" cy="470" r="172"/></clipPath><g clip-path="url(#rgc2)">${inner}</g>`;
// Palm Valley at dusk: the roost (bats under the big fan-palm leaves), the path lamp (lit), the palm trunk where the new lizard hides, a moth by the lamp
const ROOST = [[400, 262], [560, 276], [720, 250]];
function palmView(t, o = {}, cam = [1, 960, 540]) { let s = bg("palmvalley") + dusks(t, 20, 5);
  ROOST.forEach(([x, y], i) => { if (o.hide && o.hide.includes(i)) return; s += TF(x, y, .4, `<g transform="rotate(${n2(2 * Math.sin(t * .9 + i))})">${hangBat({ blink: ((t + i) % 3.3) < .12, baby: i === 1 ? (o.baby || 0) : 0 })}</g>`); });
  s += TF(PV.lamp[0], PV.lamp[1], 1, lampPost(1, 420)) + TF(PV.lamp[0] + 70, PV.lamp[1] - 360, .42, moth(t));
  if (o.liz !== undefined && o.liz < 1) s += `<g transform="translate(${PV.trunk[0] + 8} ${PV.trunk[1] - 330}) rotate(6) scale(${n2(.42 * (1 - o.liz))})">${squirrelF(t)}</g>`;   // the hidden animal: a plantain squirrel on the palm trunk
  s += o.items || "";
  return CAM(s, cam[0], cam[1], cam[2]); }

/* ============ 1 · the silent recap montage ============ */
// the thumbnail's frame: the bright Round 1 lock-in, the fruit bat large in the ring, wings wide (thumb_still.js ... "&thumb")
const batSky = (tt, k = .44) => `<rect x="250" y="290" width="360" height="360" fill="url(#gdSkyN)"/>${dusks(tt, 10, 7)}` + TF(430, 470, k, fruitBat({ wings: 1, flap: tt * 7 }));
SC.recap = (t, s) => { if (location.search.includes("thumb")) return THUMB2(t); const i = Math.min(3, Math.floor((t - s.t0) / 1.0)), u = t - s.t0 - i;
  let v = "";
  if (i === 0) v = macroBg(t, { gy: 836 }) + TF(900, 846, 1.15, antBig({ glow: [.6, .6, .6, .6, .6, .6] })) + [0, 1, 2, 3, 4, 5].map((k) => { const f = antLegTip(k); return numPop(t, s.t0 - 1, 900 + f[0] * 1.15, 926 + (k % 2) * 86, k + 1, .9); }).join("");
  else if (i === 1) v = macroBg(t, { ground: false, sky: "#D8F0D0" }) + TF(960, 470, 1, spiderWeb(330, t, { op: .9, w: 3 }) + spiderBig({ id: "rc", glow: [.6, .6, .6, .6, .6, .6, .6, .6] })) + TF(1540, 260, 1, tpill(0, 0, "8 legs", 60, P.sun, P.ink, { w: 700 })) + TF(1300, 380, 1.4, greyX(t, -9, 0, 0, 40));
  else if (i === 2) v = `<rect width="1920" height="1080" fill="#F4D8A0"/>` + `<g transform="translate(0 ${n2(-40 * u)})">${backView(t, { base: "#3E3B31", spot: "#3E3B31", haze: "#F0DCA8", lit: "#E8A040", warm: .8, zl: 99, br: 0, wet: 0 })}${myScale({ base: "#3E3B31", lit: "#E8A040", warm: .8, wet: 0, br: 0, zl: 99 }, .8)}</g>` + `<rect width="1920" height="1080" fill="#FFD27A" opacity=".2"/>` + TF(1790, 1050, .84, thermo(lerp(.3, .75, u), 300));
  else v = bg("lakedusk") + [0, 1, 2].map((k) => TF(lerp(1800, 900 - 200 * k, u), 260 + 50 * k, .18, `<g filter="url(#silF)">${fruitBat({ wings: 1, flap: t * 9 + k })}</g>`)).join("") + TF(1300, 520, spring(t, s.t0 + 3.2, .4), `<circle r="80" fill="url(#gSun)"/>${T(0, 36, "?", 110, P.ink)}`);
  return v + TF(150, 70, 1, tpill(0, 0, "Part 1", 36, P.ink, P.sun, { w: 700 })) + (u < .12 ? `<rect width="1920" height="1080" fill="#fff" opacity="${n2(.6 * (1 - u / .12))}"/>` : ""); };
const THUMB2 = (t) => bg("stage") + ringTimer(800, 560, .72, null, t, { R: 300, sw: 40, inner: `<clipPath id="thc"><circle cx="800" cy="560" r="272"/></clipPath><g clip-path="url(#thc)"><rect x="480" y="240" width="640" height="640" fill="url(#gdSkyN)"/>${dusks(1, 16, 3)}${TF(800, 600, .58, fruitBat({ wings: 1, flap: 1.2 }))}</g>` })
  + TF(1430, 790, .5, ansCard(1, "Yes")) + TF(1700, 790, .5, ansCard(2, "No")) + buddy("basil", 210, 780, 290, t, { aura: true, tag: false, pose: "surprised", still: true }) + logo(t);
/* ============ 2 · "Last time..." ============ */
SC.lasttime = (t, s) => { const a = "f201", b = "f202", tI = W(a, "six") - .2, tR = W(a, "reptiles") - .1, tS = W(a, "dry") - .1, tB = W(a, "basil") - .1, tM = LE(b) - .3;
  const gl = [0, 0, 0, pulse(t, tI, .05, 1.2) + (t > tI && t < tR ? .3 : 0), pulse(t, tR, .05, 1.2) + (t > tR && t < tM ? .3 : 0), 0], pl = [0, 0, 0, 0, 0, t > tM - .4 ? .5 + .5 * Math.sin((t - tM) * 6) : 0];
  return lakeView(t, { dusk: 1, lampLit: 1 }, [1.02, 960, 560]) + board(t, STP, { glow: gl, pulse: pl }, [900, 1050, .9])
    + popTag(t, tI, 560, 430, "6 legs", 48) + popTag(t, tS, 1250, 340, "dry, scaly skin", 48)
    + buddy("basil", 1580, 1060, 300, t, { aura: true, flip: true, in: s.t0 + .2, poses: [[s.t0, "sit"], [tB, "cheer"], [LE(b) + .2, "sit"]] }) + say(b, 1500, 560, t, { size: 48, tail: 60 }) + HUD(t); };

/* ============ 3 · goals and the game ============ */
SC.goals = (t, s) => goals3(t, s, [["How to spot a mammal", TF(0, -40, .2, hangBat({ blink: ((t + .3) % 3) < .12 }))], ["Which one does not belong", TF(-70, 56, .16, catSit(t)) + TF(10, 56, .14, macaque(t)) + TF(110, 46, .06, monitor({ t }))], ["Same and different, with a reason", TF(-60, 40, .1, fruitBat({ wings: 1, flap: t * 4 })) + TF(70, 50, .2, kingfisher({ bob: 0 }))]]);
SC.game = (t, s) => gameScene(t, s, "f301", false);

/* ============ 4 · Palm Valley at dusk; Round 1: is a bat a bird? ============ */
SC.palms = (t, s) => { const u = (t - s.t0 - .8) / 1.6, fb = u > 0 && u < 1 ? TF(lerp(540, 1500, eio(u)), 262 + 140 * Math.sin(Math.PI * u) - 40 * u, lerp(.3, .36, u), fruitBat({ wings: lerp(.2, 1, ss(0, .25, u)), flap: t * 8 })) : "";
  return palmView(t, { hide: u > 0 ? [2] : [], items: fb }, [lerp(1.12, 1.04, eo((t - s.t0) / 2.4)), 900, 500]) + lowerPill(60, 110, "Palm Valley,", "Singapore Botanic Gardens") + logo(t); };
SC.r1 = (t, s) => { const L = "f401";
  return lockN(t, { cards: ["Yes", "No"], q: "Is a bat a bird?", tq: W(L, "is") - .1, tc: [W(L, "one", 1), W(L, "two")], ring0: MK("ring0_1"), dur: 5, lock: "f402", obj: (tt) => ringClip(batSky(tt)),
    picks: [{ who: "pip", id: "f405", word: "2" }, { who: "basil", id: "f403", word: "1", x: true }, { who: "momo", id: "f404", word: "2" }] }); };

/* ============ 5 · BE A HAIR: the dive (the journey is in shrink.js) ============ */
const HB = [560, 276, .4];   // the bat in the middle of the roost
SC.waitw = (t, s) => { const L = "f501", dive = ei((t - (s.t1 - .6)) / .6), bx = HB[0] + 10, by = HB[1] + 140, cam = [1.15 + 4.6 * dive, lerp(900, bx, dive), lerp(560, by, dive)], tP = W(L, "be") - .2;
  return palmView(t, {}, cam) + OP(1 - dive, buddy("pip", 1500, 1056, 220, t, { aura: true, flip: true, in: s.t0 + .1, poses: [[s.t0, "pointing"], [s.t0 + 1.6, "sit"]] }) + buddy("momo", 1760, 1056, 230, t, { aura: true, flip: true, in: s.t0 + .2, poses: [[s.t0, "sit"], [tP, "cheer"]], nohop: true })
    + (t >= tP ? TF(1100, 640, spring(t, tP, .45), tpill(0, 0, "Be a hair!", 74, P.sun, P.ink, { w: 700 })) : "") + HUD(t)) + wipe(t, s.t1, "#8A5A36", camX(cam, bx), camY(cam, by)); };

/* ============ 6 · the reveal: a mammal ============ */
SC.reveal = (t, s) => { const a = "f601", e = eo((t - s.t0) / 1.4), cam = [lerp(3.4, 1.1, e), lerp(HB[0], 900, e), lerp(HB[1] + 80, 520, e)], tA = W(a, "two") - .1, lit = t >= tA ? spring(t, tA, .45) : 0, tc = W("f602", "one", 1) - .1, tB = LT("f603") - .12, tS = MK("stampMam");
  return palmView(t, { baby: 1 }, cam) + TF(1080, 860, .5, ansCard(2, "No", { lit })) + popTag(t, W(a, "mammal") - .1, 1000, 560, "Not a bird: a MAMMAL", 56, P.sun, P.ink) + board(t, ST(), {}, [1640, 1062, .44]) + sixPress(t, tS, 1640, 1062, .44, 5)
    + buddy("basil", 300, 1060, 300, t, { aura: true, in: s.t0 + .5, poses: [[s.t0, "sit"], [tA, "oops"], [tB, "cheer"]] }) + say("f603", 560, 600, t, { size: 48, tail: -150 }) + coin(t, tc, 1080, 400, "+1", "if you showed two fingers") + wipe(t, s.t0, "#3B2A8C") + HUD(t); };
SCORE.push([W("f602", "one", 1) - .1, 1, 1]);
SC.mark1 = (t, s) => markScene(t, s, { id: "f605", sayId: "f604", who: "pip", n: "1 of 2", text: "Mammals are animals that have hair or fur as their outer covering.", keys: ["hair", "or", "fur", "outer", "covering."], size: 66, y: 250, x: 600, w: 920,
  extra: TF(1700, 560, .9, skinDisc("fur", 150, t)) + TF(1700, 780, 1, tpill(0, 0, "a bat’s fur", 36, "#fff", P.ink, { w: 700 })) });

/* ============ 7 · milk, and warm-blooded ============ */
SC.fur4 = (t, s) => { const L = "f701", tw_ = [W(L, "monkeys") - .2, W(L, "cats") - .2, W(L, "bats") - .2, W(L, "you") - .2], tH = W(L, "hair") - .1, tM = LT("f702") - .12, tB = LT("f702b") - .12;
  const you = TF(-60, 180, .9, `<g transform="rotate(${n2(-12 + 10 * Math.sin(t * 6))})">${countHand(5)}</g>`) + TF(90, 180, .9, `<g transform="scale(-1 1) rotate(${n2(-12 + 10 * Math.sin(t * 6 + 1))})">${countHand(5)}</g>`) + youPill(0, -150, 1.3);
  const pics = [TF(0, 160, .62, macaque(t)), TF(0, 170, .7, catSit(t)), TF(0, -170, .5, `<path d="M-300 0 Q0 30 300 0" stroke="#3E6E52" stroke-width="24" fill="none"/>` + hangBat({ blink: ((t + .2) % 3) < .12 })), you], labs = ["monkey", "cat", "bat", "you!"];
  return bg("daystage") + pics.map((p, i) => { const k = spring(t, tw_[i], .45); if (k < .02) return ""; const x = 260 + i * 466; return TF(x, 900, k, pboard(p, 400, 340, "f4" + i, labs[i], 40, i === 2 ? "#4B2E8C" : "#EAF6E8")) + popTag(t, tH + i * .12, x, 470, "hair or fur", 36); }).join("")
    + buddy("momo", 1150, 1070, 150, t, { aura: true, tag: false, in: tM - .3, poses: [[tM - .3, "cheer"]] }) + buddy("pip", 940, 1070, 140, t, { aura: true, tag: false, in: tM - .2, poses: [[tM - .2, "waving"]], wave: true }) + buddy("basil", 1720, 1070, 150, t, { aura: true, tag: false, flip: true, in: tM - .1, poses: [[tM - .1, "arms_crossed"], [tB, "cheer"]] })
    + say("f702", 1050, 300, t, { size: 46, tail: 0 }) + say("f702b", 1500, 300, t, { size: 46, tail: 180 }) + HUD(t); };
SC.milk = (t, s) => { const L = "f703", tMo = W(L, "most") - .1, tMk = W(L, "milk") - .1;
  return bg("daystage") + `<rect width="1920" height="1080" fill="#FFE3C0" opacity=".35"/>` + TF(960, 1000, 1.05, pboard(TF(0, 120, .8, catNursing(t)), 760, 470, "nurse", "", 36, "#FFF0DC"))
    + popTag(t, tMo, 1520, 520, "most: not all!", 44, P.ink, "#fff") + lineTag(t, tMk, 1500, 700, 960, 900, "milk", 46) + bookCap(t, L, "Most mammals give birth to their young alive. The females have mammary glands that can produce milk for their young.", 160, { size: 44, maxW: 1120, x: 760 }) + HUD(t); };
SC.warm = (t, s) => { const L = "f704", t0 = s.t0 + .2, sunP = ss(t0, t0 + 1.4, t) * (1 - ss(t0 + 3.6, t0 + 4.6, t)), cloud = ss(t0 + 3.8, t0 + 4.8, t), liz = .3 + .45 * ss(t0 + .6, t0 + 3.0, t) - .5 * ss(t0 + 4.6, t0 + 7, t), cat = .58 + .01 * Math.sin(t * 3);
  const sx = lerp(300, 960, ss(t0, t0 + 3.4, t));
  return bg("daystage") + `<rect width="1920" height="1080" fill="#FFF0B8" opacity="${n2(.3 * sunP)}"/>` + TF(sx, 300, sunP > .02 ? 1.2 : 0, `<g transform="rotate(${n2(t * 20)})">${sunHeat()}</g>`) + OP(cloud, TF(960, 300, 1.4, `<g fill="#B8C4D8"><ellipse cx="0" cy="0" rx="70" ry="42"/><ellipse cx="-44" cy="10" rx="46" ry="30"/><ellipse cx="46" cy="14" rx="42" ry="28"/></g>`))
    + TF(560, 960, .9, pboard(TF(0, 160, .7, catSit(t)), 420, 340, "wc", "cat", 38)) + TF(860, 980, 1.0, thermo(cat, 300)) + TF(1160, 960, .9, pboard(TF(-10, 80, .38, monitor({ t, tongue: tongueAt(t, .5, 4) })), 420, 340, "wl", "lizard", 38)) + TF(1460, 980, 1.0, thermo(liz, 300))
    + popTag(t, t0 + 4.8, 860, 600, "stays the same", 40, "#fff", P.ink) + popTag(t, t0 + 4.8, 1460, 600, "changes", 40, "#fff", P.ink)
    + bookCap(t, L, "Mammals are warm-blooded, which means that they can maintain a constant body temperature.", 160, { size: 44, maxW: 1120, x: 760 }) + HUD(t); };

/* ============ 8 · exam tip: same and different, with a reason (a MODEL ANSWER card; these are our words) ============ */
SC.tip = (t, s) => { const a = "f801", b = "f802", tS = W(b, "similar") - .1, tD = W(b, "different") - .1, tWi = W(b, "wings") - .1, tFu = W(b, "fur") - .1, tFe = W(b, "feathers") - .1, k = spring(t, s.t0 + .1, .5);
  const l1 = "A bat and a bird are similar because both have wings.", l2 = "They are different because a bat has fur, but a bird has feathers.";
  const line = (txt, y, t0, hi) => { if (t < t0 - .2) return ""; const a2 = ramp(t, t0 - .2, .3), ls = wrap(txt, 46, 1000, 700, "Atkinson Hyperlegible"); let o = ""; ls.forEach((l, j) => { const hix = l.indexOf(hi); if (hix >= 0) { const x0 = tw(l.slice(0, hix), 46, 700, "Atkinson Hyperlegible"), w = tw(hi, 46, 700, "Atkinson Hyperlegible"); o += `<rect x="${n2(-520 + x0 - 4)}" y="${y + j * 62 - 34}" width="${n2((w + 8) * eo((t - t0) / .4))}" height="26" rx="5" fill="#FFD75A"/>`; } o += `<text x="-520" y="${y + j * 62}" font-family="Atkinson Hyperlegible" font-weight="700" font-size="46" fill="${P.ink}">${esc(l)}</text>`; }); return OP(a2, o); };
  const card = `<g filter="url(#drop)"><rect x="-580" y="-200" width="1160" height="400" rx="30" fill="url(#gPaper)"/></g><rect x="-580" y="-200" width="20" height="400" rx="10" fill="${P.purple}"/><g transform="translate(-540 -232)" filter="url(#dropS)"><rect width="330" height="62" rx="31" fill="${P.purple}"/></g>${T(-375, -190, "MODEL ANSWER", 32, "#fff", { ls: 3 })}`
    + line(l1, -90, tS, "similar because") + line(l2, 40, tD, "different because");
  const wg = pulse(t, tWi, .05, 1.2), fu = t >= tFu ? 1 : 0, fe = t >= tFe ? 1 : 0;
  return bg("stage2") + TF(960, 770, k, card) + TF(520, 300, .95, `<circle r="200" fill="#4B2E8C"/>${dusks(t, 8, 3)}` + (wg > .05 ? `<circle r="210" fill="${P.sun}" opacity="${n2(.5 * wg)}" filter="url(#b10)"/>` : "") + TF(0, 60, .38, fruitBat({ wings: 1, flap: t * 3 })))
    + TF(1400, 300, .95, `<circle r="200" fill="#BFE6FF"/>` + (wg > .05 ? `<circle r="210" fill="${P.sun}" opacity="${n2(.5 * wg)}" filter="url(#b10)"/>` : "") + TF(0, 120, .8, kingfisher({ flap: .6 + .4 * Math.sin(t * 6) })))
    + (fu ? TF(760, 170, spring(t, tFu, .4), skinDisc("fur", 70, t) + tpill(0, 106, "fur", 32, "#fff", P.ink, { w: 700 })) : "") + (fe ? TF(1640, 170, spring(t, tFe, .4), `<g filter="url(#drop)"><circle r="80" fill="#fff"/></g><clipPath id="fec"><circle r="70"/></clipPath><g clip-path="url(#fec)">${TF(0, 0, .5, swatch("feathers", t))}</g>` + tpill(0, 106, "feathers", 32, "#fff", P.ink, { w: 700 })) : "")
    + popTag(t, s.t0 + .2, 960, 120, "Exam tip!", 56, P.sun, P.ink, LT(b) - .2) + HUD(t); };

/* ============ 9 · Round 2: which one does not belong? ============ */
const trio = (tt) => TF(320, 590, .36, catSit(tt)) + TF(450, 600, .34, macaque(tt)) + TF(540, 600, .13, monitor({ t: tt }));
SC.r2 = (t, s) => { const L = "f901";
  return lockN(t, { cards: ["A cat", "A monkey", "A lizard"], q: "Which one does not belong?", tq: W(L, "which") - .1, tc: [W(L, "one"), W(L, "two", 1), W(L, "three")], ring0: MK("ring0_2"), dur: 5, lock: "f902",
    obj: (tt) => ringClip(`<rect x="250" y="290" width="360" height="360" fill="#EAF6E8"/><rect x="250" y="560" width="360" height="100" fill="#CDE8B8"/>` + trio(tt)),
    picks: [{ who: "pip", id: "f903", word: "2", x: true }, { who: "basil", id: "f905", word: "3" }, { who: "momo", id: "f904", word: "3" }], react: [[LT("f905") + .1, "basil", "cheer"]] }); };
SC.r2ans = (t, s) => { const L = "f906", tSh = W(L, "share") - .2, tF = W(L, "fur") - .1, tS = W(L, "dry") - .1, tA = W(L, "three") - .1, tc = W("f907", "one", 1) - .1, tP = LT("f908") - .12, tB = LT("f908b") - .12;
  const glow = pulse(t, tSh, .1, 1.4) + (t > tF ? .4 : 0), slide = eio((t - tS + .3) / .6);
  const [lx, ld] = slideX(t, tS - .3, .6, 1260, 1460, 760);
  return bg("daystage") + (glow > .05 ? `<ellipse cx="560" cy="640" rx="380" ry="230" fill="${P.sun}" opacity="${n2(.35 * Math.min(1, glow))}" filter="url(#b30)"/>` : "")
    + TF(400, 760, .9, catSit(t)) + TF(720, 760, .82, macaque(t)) + TF(lx, 760, .42, monitor({ t, tongue: tongueAt(t, 1, 3.5) })) + ld
    + (t >= tF ? OP(ramp(t, tF, .3), `<path d="M300 460 V430 H820 V460" fill="none" stroke="${P.leafDeep}" stroke-width="8" stroke-linecap="round"/>`) + TF(560, 380, spring(t, tF, .4), tpill(0, 0, "fur: mammals", 44, P.leafDeep, "#fff", { w: 700 })) : "")
    + popTag(t, tS, 1460, 560, "dry, scaly skin: a reptile", 40, P.ink, "#fff") + TF(1180, 330, .44, ansCard(3, "A lizard", { lit: t >= tA ? spring(t, tA, .45) : 0 }))
    + (t >= tP ? TF(250, 520, spring(t, tP, .45), pboard(`<path d="M60 300 V-300" stroke="#7A5E44" stroke-width="80"/><path d="M60 -100 Q-80 -160 -200 -120" stroke="#7A5E44" stroke-width="30" fill="none"/>` + TF(10, 40, .6, `<g transform="rotate(-70)">${catSit(t)}</g>`), 280, 240, "cc", "", 30)) : "")
    + buddy("pip", 160, 1060, 220, t, { aura: true, in: s.t0 + .2, poses: [[s.t0, "thinking"], [tP, "oops"], [LE("f908") + .1, "sit"]] }) + say("f908", 420, 660, t, { size: 44, tail: -150 })
    + buddy("basil", 1780, 1060, 220, t, { aura: true, flip: true, in: s.t0 + .3, poses: [[s.t0, "sit"], [tA, "cheer"], [tB, "cheer"]], nohop: false }) + say("f908b", 1450, 860, t, { size: 44, tail: 220, maxW: 560 })
    + bookCap(t, L, "The answer is three. Find what the others share.", 160, { size: 46, maxW: 1120, x: 760, t1: tF - .3 }) + coin(t, tc, 1060, 300, "+1", "if you showed three fingers") + HUD(t); };
SCORE.push([W("f907", "one", 1) - .1, 2, 2]);

/* ============ 10 · Showdown: Momo's mystery creature ============ */
function mysteryCard(t, o = {}) { const lit = o.lit || [0, 0, 0], rub = o.rub || 0, wr = o.write === undefined ? 1 : o.write, OLD = "It swims in the sea, so it is a fish!", NEW = "It is a reptile!", sil = o.reveal || 0;
  const rows = ["It has scaly skin.", "It breathes air with its lungs.", OLD]; let s = "";
  rows.forEach((txt, i) => { const y = -560 + i * 120, fx = i === 2 && o.fixing; s += `<g transform="translate(0 ${y})">${lit[i] > .05 ? `<rect x="-440" y="-52" width="880" height="104" rx="24" fill="${P.sun}" opacity="${n2(.55 * lit[i])}"/>` : ""}<g transform="translate(-390 0) scale(${n2(1 + .18 * (o.badge || [0, 0, 0])[i])})"><circle r="36" fill="${P.momo}"/>${T(0, 16, i + 1, 46, "#fff")}</g>
    ${fx ? `<text x="-330" y="15" font-family="Fredoka" font-weight="600" font-size="42" fill="${P.ink}" opacity="${n2(1 - rub)}">${esc(OLD)}</text><text x="-330" y="15" font-family="Fredoka" font-weight="600" font-size="46" fill="#1F8A4C" style="clip-path:inset(-30px ${n2(100 - 100 * wr)}% -30px 0)">${NEW}</text>` : `<text x="-330" y="15" font-family="Fredoka" font-weight="600" font-size="42" fill="${P.ink}">${esc(txt)}</text>`}${i === 2 && o.x ? TF(-470, 0, o.x, xBadge(26)) : ""}</g>`; });
  const pic = `<clipPath id="mcp"><rect x="-300" y="-170" width="600" height="300" rx="20"/></clipPath><g clip-path="url(#mcp)"><rect x="-300" y="-170" width="600" height="300" fill="${hexL("#1E4A6A", "#3A8AB0", sil)}"/>${uwRays(t, "#BFF0FF", .12).replace(/1100/g, "200")}
    ${TF(30 + 20 * Math.sin(t), -10, .62, `<g transform="rotate(-8)">${seaTurtle({ dark: sil < .5, stroke: t * 2 })}</g>`)}<g fill="none" stroke="#fff" stroke-width="4" opacity=".4">${[0, 1, 2].map((i) => `<path d="M${-300 + ((t * 40 + i * 200) % 600)} ${-150 + i * 8} q30 -8 60 0"/>`).join("")}</g></g>`;
  return `<ellipse cx="0" cy="4" rx="330" ry="18" fill="${P.ink}" opacity=".22" filter="url(#b4)"/><path d="M-200 0 L-90 -400 M200 0 L90 -400 M0 0 V-300" stroke="#8A5A36" stroke-width="16" stroke-linecap="round"/><rect x="-330" y="-176" width="660" height="20" rx="10" fill="#8A5A36"/>
  <g filter="url(#drop)"><rect x="-500" y="-1150" width="1000" height="980" rx="26" fill="url(#gPaper)" stroke="${P.momo}" stroke-width="8"/></g>${T(0, -1070, "THE MYSTERY CREATURE", 54, P.ink, { ls: 2 })}<g transform="translate(0 -850)">${pic}</g>${s}${o.tick ? TF(430, -320, o.tick, tickBadge(40)) : ""}`; }
const NOTE = [900, 1084, .78], lizShow = (t, t0) => 1 - ramp(t, t0, .25) * (1 - ramp(t, t0 + 3.2, .2));
const showView = (t, o = {}) => palmView(t, { liz: o.liz === undefined ? 1 : o.liz }, [1, 960, 540]) + `<rect width="1920" height="1080" fill="${P.night}" opacity=".2"/>` + TF(NOTE[0], NOTE[1], NOTE[2], mysteryCard(t, o.notes || {}));
SC.show = (t, s) => { const a = "f1001", c = "f1002", r0 = MK("ring0_4"), bell = MK("bell_4"), rs = ringState(t, r0, 6), tLz = LT(a) + .3;
  const tr = [W(a, "one"), W(a, "two"), W(a, "three")], tcn = [W(c, "one", 1), W(c, "two"), W(c, "three")], tP = LT("f1004"), tB = LT("f1005"), tO = LT("f1006");
  const lit = [0, 1, 2].map((i) => t < LT(c) ? (t >= tr[i] - .1 && t < (tr[i + 1] || LE(a)) - .1 ? 1 : 0) : 0), badge = [0, 1, 2].map((i) => Math.max(pulse(t, tcn[i], .04, .5), t >= r0 && t < bell ? (Math.floor((t - r0) / .5) % 3 === i ? .5 + .5 * rs.tick : 0) : 0));
  const nf = t >= tcn[2] - .1 ? 3 : t >= tcn[1] - .1 ? 2 : 1, ringOn = t >= tcn[0] - .3 && t < bell + .8, RX = 1660, RY = 640;
  return showView(t, { liz: lizShow(t, tLz), notes: { lit, badge, x: spring(t, tP + .5, .4) } })
    + buddy("momo", 1720, 1060, 250, t, { aura: true, flip: true, in: s.t0 + .1, poses: [[s.t0, "cheer"], [LT(a) - .12, "sit"], [LE(a) + .2, "thinking"], [tO - .12, "oops"]], nohop: true }) + say(a, 1500, 300, t, { size: 46, tail: 160, maxW: 520 }) + say("f1006", 1640, 600, t, { size: 56, tail: 60 })
    + (ringOn ? OP(1 - ss(bell + .5, bell + .8, t), TF(RX, RY, spring(t, tcn[0] - .3, .4), `<g transform="translate(${-RX} ${-RY})">${ringTimer(RX, RY, t < r0 ? 1 : rs.frac, t < r0 ? 6 : rs.secs, t, { R: 128, sw: 22, tick: rs.tick, shut: pulse(t, bell, .01, .6), inner: TF(RX, RY + 60, .62, countHand(nf)) })}</g>`) + youPill(RX, RY - 178, 1.0) + tpill(RX, RY + 222, "line 1, 2 or 3?", 30, P.ink, "#fff")) : "")
    + (t >= bell + .9 ? buddy("pip", 150, 1062, 200, t, { aura: true, in: bell + .9, poses: [[bell + .9, "thinking"], [tP - .12, "sit"], [LE("f1004") + .1, "pointing"]] }) + pickNum("pip", 290, 990, t, tP - .1, "3") + buddy("basil", 400, 1062, 180, t, { aura: true, in: bell + 1.0, poses: [[bell + 1, "arms_crossed"], [tB - .12, "sit"], [LE("f1005") + .1, "cheer"]] }) + pickNum("basil", 520, 990, t, tB - .1, "3")
      + say("f1004", 330, 730, t, { size: 38, tail: -110, maxW: 460 }) + say("f1005", 380, 760, t, { size: 40, tail: 0, maxW: 420 }) : "")
    + stamp(t, LT("f1003") - .08, 960, 480) + bellIcon(t, r0) + HUD(t); };
SC.fixed = (t, s) => { const h = "f1007", tc = W("f1008", "two") - .1, rub = ss(s.t0 + .15, s.t0 + .6, t), wr = ss(s.t0 + .6, s.t0 + 1.6, t), tR = W(h, "sea") - .3, rv = ss(tR, tR + .6, t), tF = LT("f1009") - .12;
  return showView(t, { notes: { fixing: true, rub, write: wr, reveal: rv, tick: spring(t, W(h, "reptile") - .1, .45) } })
    + (t >= tR + .4 ? TF(300, 640, spring(t, tR + .4, .45), pboard(turtleNest(t), 420, 340, "tn", "", 30)) : "")
    + buddy("momo", 1720, 1060, 250, t, { aura: true, flip: true, poses: [[s.t0, "sit"], [tF, "cheer"]], nohop: true }) + say("f1009", 1500, 820, t, { size: 52, tail: 160 })
    + bookCap(t, h, "Read all the clues. Scaly skin and lungs: a reptile. It is a sea turtle!", 96, { size: 44, maxW: 1120, x: 880, t1: LT("f1008") }) + coin(t, tc, 1520, 520, "+2", "if you showed three fingers") + HUD(t); };
SCORE.push([W("f1008", "two") - .1, 4, 2]);

/* ============ 11 · six tiles, and the chant ============ */
const ALL6 = { 3: -1, 4: -1, 5: -1 };
SC.six = (t, s) => { const fl = [0, 1, 2, 3, 4, 5].map((i) => pulse(t, s.t0 + .2 + i * .22, .05, .9));
  return bg("stage2") + TF(960, 1000, 1.25, sixBoard(t, ALL6, { flash: fl })) + buddy("pip", 1520, 1056, 230, t, { aura: true, flip: true, in: s.t0 + .1, poses: [[s.t0, "cheer"]] }) + buddy("momo", 1760, 1056, 230, t, { aura: true, flip: true, in: s.t0 + .2, poses: [[s.t0, "cheer"]] }) + buddy("basil", 300, 1060, 230, t, { aura: true, in: s.t0 + .3, poses: [[s.t0, "cheer"]] }) + HUD(t); };
// the chant: "Six legs? Insect!" / "Dry, scaly skin? Reptile!" / "Hair or fur? Mammal!": each line a question and its answer; the matching tile flashes
const PHR6 = ["Six legs? Insect!", "Dry, scaly skin? Reptile!", "Hair or fur? Mammal!"], ANS6 = { "Insect!": "#C07A50", "Reptile!": "#8A98A2", "Mammal!": "#E07A9A" };
function chantLines6(t, L, o = {}) { const st = chantState(L, t); let lines = ""; const y0 = o.y0 || 330, dy = o.dy || 150, size = o.size || 80, done = new Set(); L.slots.forEach(([p], i) => { if (i <= st.k) done.add(p); });
  PHR6.forEach((ph, i) => { const ws = ph.split(" "), total = ws.reduce((a, w) => a + tw(w, size, 700, "Fredoka", 2) + size * .3, -size * .3), active = st.ph === i && (st.inSlot || st.turn), slotW = L.words.filter((w) => w.slot === st.k);
    const sc = 1 + .08 * pulse(t, st.ph === i ? st.t0 : -9, .04, .5) + (active && st.turn ? .04 + .03 * Math.sin((t - L.t) / L.bar * Math.PI * 4) : 0); let cx = -total / 2, tx = "";
    ws.forEach((w, j) => { const wt = st.ph === i && slotW[j] ? slotW[j].a : -9, lit = done.has(i) && (st.ph !== i || !st.inSlot || t >= wt - .03), ww = tw(w, size, 700, "Fredoka", 2), col = ANS6[w] || (lit ? "#fff" : "#fff");
      tx += `<text x="${n2(cx)}" y="0" font-family="Fredoka" font-weight="700" font-size="${size}" letter-spacing="2" fill="${ANS6[w] && lit ? col : "#fff"}" opacity="${lit ? (active || st.k < 0 ? 1 : .85) : .28}" transform="translate(${n2(cx + ww / 2)} 0) scale(${n2(1 + .14 * pulse(t, wt, .03, .35))}) translate(${n2(-cx - ww / 2)} 0)">${esc(w)}</text>`; cx += ww + size * .3; });
    lines += `<g transform="translate(${o.x || 960} ${y0 + i * dy}) scale(${n2(sc)})">${active && st.turn ? `<rect x="${n2(-total / 2 - 30)}" y="${n2(-size * .82)}" width="${n2(total + 60)}" height="${n2(size * 1.12)}" rx="${n2(size * .3)}" fill="${P.sun}" opacity=".16"/>` : ""}${tx}</g>`; });
  return lines + (st.together && st.tb < L.nbars ? TF(o.x || 960, y0 - 120, spring(t, L.t + L.slots[L.ncall][1] * L.bar, .4), tpill(0, 0, "All together!", 40, P.sun, P.ink, { w: 700 })) : ""); }
SC.chant = (t, s) => { const L = TL.lines.c1103, beats = chantBeats(L); let fx = "", clap = 0, stomp = 0; for (const [bt, k, soft] of beats) { const g = soft ? .45 : 1; if (k === "c") clap = Math.max(clap, pulse(t, bt, .03, .18) * g); else stomp = Math.max(stomp, pulse(t, bt, .03, .25) * g); }
  const jumps = beats.filter((b) => b[1] === "s" && !b[2]).map((b) => [b[0] - .2, 30]), by = 1066, bh = 250, xs = [640, 990, 1340], tin = s.t0 + .15;
  let buds = ""; ["pip", "basil", "momo"].forEach((w, i) => { const sq = 1 - .05 * clap; buds += `<g transform="translate(${xs[i]} ${by}) scale(${n2(1 / sq)} ${n2(sq)}) translate(${-xs[i]} ${-by})">${buddy(w, xs[i], by, bh, t, { aura: true, in: tin + i * .08, jump: t >= L.t ? jumps : [], poses: [[s.t0, "sit"], [L.end - .28, "cheer"]] })}</g>`;
    fx += OP(clap, `<g stroke="${P.sun}" stroke-width="7" stroke-linecap="round"><path d="M${xs[i] - bh * .5} ${by - bh * .8} l-26 -22 M${xs[i] + bh * .5} ${by - bh * .8} l26 -22 M${xs[i]} ${by - bh * 1.08} v-30"/></g>`) + OP(stomp, `<ellipse cx="${xs[i]}" cy="${by}" rx="${n2(bh * (.5 + .4 * (1 - stomp)))}" ry="${n2(22 + 16 * (1 - stomp))}" fill="none" stroke="#fff" stroke-width="6"/>`); });
  const fl = [0, 0, 0, 0, 0, 0]; for (const w of L.words) { const i = ["Insect!", "Reptile!", "Mammal!"].indexOf(w.w); if (i >= 0) fl[3 + i] = Math.max(fl[3 + i], pulse(t, w.a, .03, .45)); }
  return bg("stage2") + TF(200, 1040, .52, sixBoard(t, ALL6, { flash: fl })) + chantLines6(t, L, { x: 960, y0: 300, dy: 150, size: 80 }) + buds + fx + yourTurn(t, L, 1730, 700, .95) + say("u1002", 960, 640, t, { size: 52, col: P.basil, tail: 0, merge: true }) + HUD(t); };

/* ============ 12 · Exam corner ============ */
const examBanner = (t, t0, x = 960, y = 120, k0 = 1) => t < t0 ? "" : TF(x, y, k0 * (lerp(1.8, 1, eo((t - t0) / .16)) + .04 * wob(t, t0 + .16, .4)), `<g transform="rotate(-3)"><g filter="url(#drop)"><rect x="-300" y="-58" width="600" height="116" rx="58" fill="${P.ink}"/></g><rect x="-290" y="-48" width="580" height="96" rx="48" fill="none" stroke="${P.sun}" stroke-width="5"/><g transform="translate(-230 0)"><circle r="30" fill="url(#gSun)"/><path d="M-12 -2 L-3 8 L13 -10" stroke="${P.ink}" stroke-width="6" fill="none" stroke-linecap="round"/></g>${T(30, 20, "EXAM CORNER", 56, P.sun, { ls: 4 })}</g>`);
SC.exambanner = (t, s) => bg("stage") + examBanner(t, s.t0 + .05, 960, 520, 1.6) + HUD(t);
SC.mark2 = (t, s) => { const under = TF(1690, 640, .5, sixBoard(t, ALL6)) + TF(1600, 860, 1, tpill(0, 0, "flowering", 30, "#2FA65A", "#fff", { w: 700 })) + TF(1790, 940, 1, tpill(0, 0, "non-flowering", 30, "#1F8A4C", "#fff", { w: 700 }));
  return markScene(t, s, { id: "f1203", sayId: "f1202", who: "momo", n: "2 of 2", text: "Living things such as plants and animals can be classified based on common observable characteristics. There are different types of plants and animals.", keys: ["classified", "common", "observable", "characteristics."], size: 56, y: 230, x: 600, w: 900, extra: under + examBanner(t, s.t0, 1060, 130, .62) }); };

/* ============ 13-14 · score hand, the lizard, the dare for Episode 7 ============ */
SC.final = (t, s) => { const L = "f1301"; return finalScene(t, s, L, 2, [[s.t0, null, 1], [W(L, "more") - .1, "More than two? You beat the Buddies!", 4], [W(L, "four") - .1, null, 4]], TF(1290, 1062, .36, sixBoard(t, ALL6))); };
SC.liz = (t, s) => { const L = "f1302"; return lizReveal(t, s, L, palmView(t, { liz: 0 }, [1, 960, 540]), PV.trunk[0] + 8, PV.trunk[1] - 330, W(L, "is") - .1, "Cold-blooded or warm-blooded?", 0, 80); };
SC.dare = (t, s) => { const L = "f1401", tMo = W(L, "mould") - .2, tYe = W(L, "yeast") - .2, tU = W(L, "useful") - .2, tN = W(L, "lock") - .1;
  return bg("daystage") + (t >= tMo ? TF(560, 820, spring(t, tMo, .45), pboard(TF(0, 20, .95, mouldBread()), 440, 380, "md", "mould", 40, "#F4EBDA")) : "") + (t >= tYe ? TF(1300, 820, spring(t, tYe, .45), pboard(TF(-60, 40, .75, yeastLoaf()), 440, 380, "ye", "yeast", 40, "#F4EBDA")) : "")
    + (t >= tU ? TF(560, 260, spring(t, tU, .45), ansCardS(1, "Mould")) + TF(1300, 260, spring(t, tU + .15, .45), ansCardS(2, "Yeast")) + TF(930, 260, spring(t, tU, .45), tpill(0, 0, "Which one is useful?", 40, P.ink, "#fff", { w: 700 })) : "")
    + buddy("basil", 1760, 1060, 220, t, { aura: true, flip: true, in: s.t0 + .2, poses: [[s.t0, "thinking"], [tU, "surprised"], [tU + 1.4, "arms_crossed"]] })
    + (t >= tN ? TF(930, 1010, lerp(1.6, 1, eo((t - tN) / .16)) + .04 * wob(t, tN + .16, .4), `<g filter="url(#drop)"><rect x="-720" y="-60" width="1440" height="120" rx="50" fill="${P.ink}"/></g>${T(-580, 18, "NEXT", 44, P.sun, { ls: 8 })}${T(80, 18, "Fungi and bacteria · Lock in your answer!", 42, "#fff")}`) : "") + HUD(t); };
const ansCardS = (n, txt) => `<g filter="url(#dropS)"><rect x="-150" y="-60" width="300" height="120" rx="30" fill="url(#gPaper)"/></g><circle cx="-90" cy="0" r="40" fill="#EDE4FF"/>${T(-90, 22, n, 60, "#3B2A8C")}${T(40, 16, txt, 46, P.ink)}`;
SC.nyk = (t, s) => nykScene(t, s, TF(1000, 1046, .36, sixBoard(t, ALL6)) + TF(1000 - 352 * .36 - 16, 1046 - 596 * .36 + 6, .24, `<g transform="rotate(${n2(3 * Math.sin(t * 2))})">${hangBat({ blink: ((t + .4) % 2.9) < .12 })}</g>`));
})(); }
