// lc17.js: EP17's look-closers, journeys and picture cards (Stage 2, drawn 2026-11-23). Uses art17.js (the animals, loop4) and sets17.js.
// PART 1: legsArt (the caterpillar's legs: six true legs, the prolegs and their tiny hooks, the walk), pupaArt (inside the pupa: the window,
//   the shapes forming, the case darkening, the butterfly coming out, its wings pumping flat, flying off), bflyJourney (BE A BUTTERFLY EGG:
//   the leaf field, hatching, munching, the tight skin and the moult, bigger, hanging upside down, the last split, the hard case closing),
//   the ring picture (ringCat), Momo's worm idea, the larva card, the fun-fact pictures (a silk cocoon, silk).
// PART 2: wrigArt (the wrigglers hanging under the surface, the little tube, the dive and back up), plateArt (the flower-pot plate: still
//   water, wrigglers in it, the adult's hand tipping it out, the loop's tiles going dim, the three life pictures), mosqJourney (BE A MOSQUITO
//   EGG), the recap pictures, Round 1's three cards, Pip's plate idea, the dengue picture (calm, cared for), the fun-fact pictures (the
//   dragonfly nymph; it gobbles up a wriggler), the dare's two cards (= / ≠), the chant board.

/* ================================================================ PART 1 ================================================================ */
// the ring's picture (lockN obj, drawn around (430, 470)): the caterpillar, big, munching its lime leaf
const ringCat = (tt) => `<circle cx="430" cy="470" r="188" fill="#DFF3D2"/><path d="M336 586 Q328 574 330 558" stroke="#5E7A3A" stroke-width="10" fill="none" stroke-linecap="round"/><g transform="translate(330 560) rotate(-12)">${leaf15(240, 80, "#58B56C", "#2F7A45")}</g><path d="M240 600 Q430 560 640 590" stroke="#7A5230" stroke-width="14" fill="none" stroke-linecap="round"/>` + TF(430, 584, .62, cat17(tt, {}), -4);
// Momo's idea (a worm?): a pink earthworm wriggling in soil, with a ? (an idea, never a fact)
const wormIdea = (t) => { let s = `<rect x="-300" y="-200" width="600" height="400" fill="#E9D3B4"/><rect x="-300" y="40" width="600" height="160" fill="#8A5A3A"/>`;
  const pts = [...Array(9)].map((_, i) => [-130 + i * 32, 30 + 14 * Math.sin(i * .9 + t * 4)]); s += `<path d="M${pts.map(([x, y]) => `${x} ${n2(y)}`).join(" L")}" stroke="#E98A9A" stroke-width="34" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M${pts.map(([x, y]) => `${x} ${n2(y - 6)}`).join(" L")}" stroke="#F6B6C0" stroke-width="10" fill="none" stroke-linecap="round" opacity=".7"/>`
    + `<path d="M${pts[5][0] - 6} ${n2(pts[5][1] - 16)} v32" stroke="#C96A7A" stroke-width="6"/>${eye16(pts[8][0] + 4, n2(pts[8][1] - 4), 6)}` + TF(-40, 150, 1, tpill(0, 0, "a worm?", 40, "#fff", P.ink, { w: 700 })); return s; };

/* ---------- [LOOK CLOSER] the caterpillar's legs (lclegs). Art coordinates: the panel's middle is (0, 0), +-830 x +-395 ---------- */
const LGK = 2.5, LGY = 170, LGX = -20;   // the caterpillar's scale, its twig line, its middle
const legX = (x) => LGX + LGK * x;
function legsArt(t) { const m = MK, s0 = SCN.lclegs.t0 + 1, P3 = "a703p", tF = m("front"), tS = m("stumps"), tK = m("kw_prolegs"), tH = m("hooks"), tG = m("grip"), tV = m("v_legs");
  const w1 = W(P3, "one"), w2 = W(P3, "two"), w3 = W(P3, "three"), t5 = LT("a705"), tB = LT("a706b");
  const cam = camSeq(t, [s0, tF, tS, w1 - .2, t5 + 1.2, tH, tG + .6, tV], [[0, 40, 1], [300, 80, 1.5], [-300, 90, 1.45], [300, 80, 1.5], [-290, 90, 1.45], [-90, 10, 1.12], [0, 40, 1.02], [0, 30, 1]]);
  const lit = [w1, w2, w3].map((w, i) => Math.max(t >= w - .1 ? .85 + .15 * pulse(t, w, .05, .5) : 0, pulse(t, tF + .1 + i * .35, .05, .4) * (t < w1 ? .9 : 0), t >= LT("a704") && t < t5 + .3 ? 1 : 0));
  const pro = [0, 1, 2, 3, 4].map((i) => Math.max(t >= tS && t < w1 - .3 ? pulse(t, tS + .2 + i * .3, .05, .9) * .9 + .1 : 0, t >= W("a705", "stumps") - .1 ? Math.min(1, .25 + pulse(t, W("a705", "prolegs") + i * .12, .05, .6) + (t >= tK ? .6 : 0)) : 0));
  const walk = t >= tG - .2; let w = `<path d="M-900 ${LGY + 18} Q-300 ${LGY - 10} 200 ${LGY + 6} T900 ${LGY + 12}" stroke="#7A5230" stroke-width="44" fill="none" stroke-linecap="round"/><path d="M-900 ${LGY + 6} Q-300 ${LGY - 22} 200 ${LGY - 6} T900 ${LGY}" stroke="#9A7048" stroke-width="10" fill="none" opacity=".6"/>`
    + `<g transform="translate(-640 ${LGY + 6}) rotate(150)">${leaf15(200, 70, "#58B56C", "#2F7A45")}</g><g transform="translate(700 ${LGY + 10}) rotate(-30)">${leaf15(220, 74, "#3E9E5A", "#2A6E3E")}</g>`;
  const cx = walk ? LGX + 40 * ((t - tG) * .6 % 1) * 0 + 30 * Math.min(1, (t - tG) * .4) : LGX;
  w += TF(cx, LGY, LGK, cat17(t, { legs: lit, pro, walk, hook: t >= tH - .2, chew: false }));
  let out = inCam(cam, w); const cp = (x, y) => [(x - cam[0]) * cam[2], (y - cam[1]) * cam[2]], lx = (x) => clamp(x, -640, 640);
  // the labels (drawn over the picture, always inside the panel), joined to the parts and colour-coded: six legs (teal), prolegs (orange)
  const legLab = t >= w3 - .1 && t < tV, proLab = t >= W("a705", "prolegs") - .1 && t < tV;
  if (legLab) { const L0 = [lx(cp(legX(116), 0)[0] + 60), 290]; out += OP(ramp(t, w3 - .1, .25) * (1 - ramp(t, tV - .4, .3)), CATLEG.map((x) => { const p = cp(legX(x) + 10, LGY - 4); return pline(L0[0], L0[1] - 40, p[0], p[1], 1, LEGC); }).join("") + TF(L0[0], L0[1], spring(t, w3 - .1, .4), tpill(0, 0, "six legs", 52, LEGC, "#fff", { w: 700 }))); }
  if (proLab) { const L0 = [lx(cp(legX(-80), 0)[0]), 290]; out += OP(1 - ramp(t, tV - .4, .3), CATPRO.map((x) => { const p = cp(legX(x), LGY - 6); return pline(L0[0], L0[1] - 40, p[0], p[1], 1, PROLEGC); }).join("") + TF(L0[0], L0[1], spring(t, W("a705", "prolegs") - .1, .4), tpill(0, 0, "prolegs", 52, PROLEGC, "#fff", { w: 700 }))); }
  // early hint labels at the marks (before Pip counts): the front, the little stumps
  if (t >= tF && t < w1 - .3) out += OP(1 - ramp(t, w1 - .6, .3), TF(lx(cp(legX(116), 0)[0]), 290, spring(t, tF, .4), tpill(0, 0, "the front", 44, "#fff", P.ink, { w: 700 })));
  if (t >= tS && t < w1 - .3) out += OP(1 - ramp(t, w1 - .6, .3), TF(lx(cp(legX(-80), 0)[0]), 290, spring(t, tS, .4), tpill(0, 0, "little stumps", 44, "#fff", P.ink, { w: 700 })));

  // the magnifier on one proleg's flat sole: a ring of tiny hooks (violet), they grip the twig
  if (t >= tH - .1 && t < tV + .2) { const k = spring(t, tH - .1, .45) * (1 - ramp(t, tV - .2, .3)); const pr = [ (legX(-63) - cam[0]) * cam[2], (LGY - cam[1]) * cam[2] ], g = ss(tG - .2, tG + .5, t);
    let lens = `<circle r="168" fill="#F4EFD8"/><path d="M-200 ${n2(70 - 12 * g)} Q0 ${n2(50 - 12 * g)} 200 ${n2(70 - 12 * g)} V200 H-200z" fill="#7A5230"/><path d="M-200 ${n2(66 - 12 * g)} Q0 ${n2(46 - 12 * g)} 200 ${n2(66 - 12 * g)}" stroke="#9A7048" stroke-width="8" fill="none"/>`
      + `<path d="M-110 -168 L-96 0 Q0 ${n2(44)} 96 0 L110 -168z" fill="${mixC("#8FCB4E", "#F28A3A", .5)}" stroke="#B4531A" stroke-width="6"/><path d="M-96 0 Q0 44 96 0" stroke="#B4531A" stroke-width="10" fill="none"/>`
      + [...Array(9)].map((_, i) => { const x = -84 + i * 20, c = 1 - Math.abs(i - 4) / 6; return `<path d="M${n2(x)} ${n2(24 + 18 * c)} q${n2(2 + 4 * g)} ${n2(22 + 8 * g)} ${n2(14 + 2 * g)} ${n2(8 + 6 * g)}" stroke="${HOOKC}" stroke-width="7" fill="none" stroke-linecap="round"/>`; }).join("");
    out += `<g transform="translate(${n2(pr[0])} ${n2(pr[1])})">${OP(k, `<circle r="40" fill="none" stroke="${HOOKC}" stroke-width="6"/>`)}</g>`
      + OP(k, `<path d="M${n2(pr[0])} ${n2(pr[1] - 40)} L360 -120" stroke="${HOOKC}" stroke-width="6" stroke-dasharray="14 8"/>`) + TF(470, -150, k, `<clipPath id="lgm"><circle r="168"/></clipPath><g clip-path="url(#lgm)">${lens}</g><circle r="168" fill="none" stroke="${HOOKC}" stroke-width="12"/><circle r="182" fill="none" stroke="#fff" stroke-width="5" opacity=".7"/><path d="M118 118 L190 190" stroke="${HOOKC}" stroke-width="22" stroke-linecap="round"/>`)
      + TF(470, 72, k, tpill(0, 0, "tiny hooks", 48, HOOKC, "#fff", { w: 700 })) + (g > .05 ? TF(470, 140, k * g, tpill(0, 0, "they grip the twig", 34, "#fff", HOOKC, { w: 700 })) : ""); }
  return out; }

/* ---------- [LOOK CLOSER] inside the pupa (lcpupa) ---------- */
const PPX = -150, PPY = 330, PPK = 2;
const pupaPt = (x, y) => { const a = PUPA_ROT * Math.PI / 180; return [PPX + PPK * (x * Math.cos(a) - y * Math.sin(a) - 6), PPY + PPK * (x * Math.sin(a) + y * Math.cos(a))]; };
function pupaArt(t) { const m = MK, s0 = SCN.lcpupa.t0 + 1, tW = m("window"), tC = m("case"), tF = m("form"), tD = m("dark"), tSp = m("split"), tO = m("out"), tWi = m("wings"), tFl = m("fly"), tV = m("v_pupa");
  const win = ss(tW - .3, tW + .6, t) * (1 - ss(tD - .9, tD - .2, t)), form = ss(tF, tF + 6, t), dark = ss(tD - .2, tD + 2.2, t), split = ss(tSp, tSp + .8, t), empty = t >= tO;
  const WC = pupaPt(4, -150), cam = camSeq(t, [s0, tW, tD - .4, tO, tFl], [[-60, 0, 1], [WC[0] + 60, WC[1], 1.55], [-80, -20, 1.12], [pupaPt(-14, -300)[0] + 80, pupaPt(-14, -300)[1] - 110, 1.3], [60, -60, 1]], 1.1);
  const cp = (p) => [(p[0] - cam[0]) * cam[2], (p[1] - cam[1]) * cam[2]]; let lab = "";
  const lit = { wings: pulse(t, W("a1102", "develop") + .2, .05, 1.6), feelers: pulse(t, W("a1102", "develop") + 1.1, .05, 1.6), legs: pulse(t, W("a1102", "adult") + .1, .05, 1.6) };
  let w = `<path d="M-900 300 Q-400 260 0 320 T900 300 V500 H-900z" fill="#BFE3A8" opacity=".5"/>`
    + leafyTwig17([920, 330, 680, 300, 440, 262], { n: 2, len: 170, wid: 60, w: 22, u0: .25, u1: .6, spread: 40, stalk: 22, cols: ["#58B56C", "#3E9E5A"], line: "#2F7A45" })
    + leafyTwig17([-920, -330, -760, -330, -640, -272], { n: 1, len: 200, wid: 70, w: 20, u0: .45, spread: 50, stalk: 22, cols: ["#3E9E5A", "#58B56C"], line: "#2A6E3E" });
  // the pupa (or, once the butterfly is out, the empty case), held to its stem
  w += TF(PPX, PPY, PPK, pupa17(t, { dark, win, form, split, empty, lit, id: "lp" }));
  // the labels, colour-coded and joined: pupal case (purple), wings / feelers / legs inside the window
  if (t >= tC - .1 && t < tF + 1.6) { const a = 1 - ramp(t, tF + 1, .3), sh = cp(pupaPt(36, -210)); lab += OP(a, pline(420, -150, sh[0], sh[1], ramp(t, tC - .1, .2), CASEC) + TF(420, -170, spring(t, tC - .1, .4), tpill(0, 0, "pupal case", 46, CASEC, "#fff", { w: 700 }))); }
  if (form > .2 && t < tD - .4) { const a = (1 - ramp(t, tD - .9, .3)), L = [["wings", "#A86BEA", cp(pupaPt(8, -165)), -20, W("a1102", "develop") + .2], ["feelers", "#E36A12", cp(pupaPt(3, -215)), -150, W("a1102", "develop") + 1.1], ["legs", LEGC, cp(pupaPt(4, -132)), 110, W("a1102", "adult") + .1]];
    for (const [nm, c, [px, py], ly, t0] of L) if (t >= t0 - .1) lab += OP(a, pline(360, ly, px + 6, py, ramp(t, t0 - .1, .2), c) + TF(400, ly, spring(t, t0 - .1, .4) * .8, tpill(0, 0, nm, 44, c, "#fff", { w: 700 })));
    // small arrows round the window: changing
    if (form > .4) { const wc = cp(WC); lab += OP(a * (form - .4) / .6, TF(wc[0] - 210, wc[1] + 10, .8, `<path d="M0 -60 A60 60 0 1 1 -50 30" stroke="${P.leaf}" stroke-width="10" fill="none"/><path d="M-66 18 L-48 44 L-30 20z" fill="${P.leaf}"/>`) + TF(wc[0] - 210, wc[1] + 100, 1, tpill(0, 0, "changing", 34, P.leaf, "#fff", { w: 700 }))); } }
  // the case darkens: the wing colours show through
  if (dark > .3 && !empty) lab += OP((dark - .3) * 1.5 * (1 - ramp(t, tSp + .6, .3)), TF(380, 160, 1, tpill(0, 0, "the wing colours show through", 36, "#2A221E", "#F4DE86", { w: 700 })));
  // the butterfly crawls out and hangs on the empty case; its crumpled wings pump out flat; it flies off over the garden
  if (t >= tO - .1) { const st = pupaPt(-14, -300), crump = 1 - ss(tWi, tWi + 4.6, t), e = eio((t - tFl) / 2.2), fx = lerp(st[0] - 10, 900, e), fy = lerp(st[1] - 30, -520, e) - 120 * Math.sin(Math.PI * e);
    if (t < tFl) { const cr = ss(tO - .1, tO + .7, t); w += TF(st[0] + 18, st[1] + 40 - 70 * cr, 1.25 * (.6 + .4 * cr), bflySide(t, { crump, slow: 1 }), -8) + (t > tWi - .2 && crump > .05 ? TF(st[0] + 230, st[1] - 120, spring(t, tWi - .2, .4) * (crump > .1 ? 1 : 1 - ramp(t, tWi + 4.4, .3)), tpill(0, 0, crump > .5 ? "crumpled wings" : "spreading out flat", 38, "#fff", P.ink, { w: 700 })) : ""); }
    else w += TF(fx, fy, .7 + .2 * e, bfly17(t, { flap: .5 + .5 * Math.sin(t * 12) }), 20); }
  let out = inCam(cam, w) + lab;
  // speeded up + a day counter WITHOUT numbers (dots filling), fixed in the panel's top left
  if (t >= tF - .2 && t < tD + .5) { const a = ramp(t, tF - .2, .3) * (1 - ramp(t, tD, .4)); out += OP(a, lcClock(t, tF - .2, tD, -560, -120) + [...Array(8)].map((_, i) => `<circle cx="${-720 + i * 42}" cy="-40" r="14" fill="${t >= tF + i * .9 ? P.sun : "#fff"}" stroke="${P.ink}" stroke-width="4"/>`).join("") + `<g transform="translate(-388 -40)"><circle r="16" fill="#FFD75A"/>${[...Array(8)].map((_, i) => `<path d="M0 -22 v-8" stroke="#FFB01E" stroke-width="4" transform="rotate(${i * 45})"/>`).join("")}</g>`); }
  // Momo's "cake in the oven" picture (a small picture beside her line)
  { const tc = W("a1103m", "cake") - .1; if (t >= tc && t < LE("a1103m") + .6) out += TF(520, 260, spring(t, tc, .4) * (1 - ramp(t, LE("a1103m") + .3, .3)), `<g filter="url(#dropS)"><rect x="-110" y="-90" width="220" height="180" rx="22" fill="#D9DEE6" stroke="#6E7A8A" stroke-width="6"/></g><rect x="-80" y="-56" width="160" height="110" rx="12" fill="#3A3448"/><rect x="-80" y="-56" width="160" height="110" rx="12" fill="#FFB36B" opacity="${n2(.35 + .2 * Math.sin(t * 4))}"/><path d="M-50 30 h100 v-30 q-50 -30 -100 0z" fill="#E9C46A" stroke="#B48A2A" stroke-width="4"/><circle cx="-70" cy="-74" r="7" fill="#E0453A"/><circle cx="-46" cy="-74" r="7" fill="#6E7A8A"/>`); }
  return out; }

/* ---------- BE A BUTTERFLY EGG (the journey, first person, present tense) ---------- */
// the leaf seen from very close: a huge green field with veins like roads, converging to the far leaf tip. k = how big you are (1 = an egg)
function leafField(t, k = 1, rot = 0, bites = 0) { const vx = 960, vy = 330; let s = `<rect width="1920" height="1080" fill="url(#e17LeafSky)"/>`;
  s += `<g transform="translate(960 600) rotate(${n2(rot)}) scale(${n2(k)}) translate(-960 -600)">`;
  // far leaves and a branch, out of focus
  { const FB = [-200, 60, 700, 140, 2100, 40]; s += `<g opacity=".55" filter="url(#b6)"><path d="M-200 60 Q700 140 2100 40" stroke="#7A5230" stroke-width="40" fill="none" opacity=".75"/>` + [[.2, 40, 380, 140], [.5, 150, 300, 100], [.78, 30, 420, 150]].map(([u, a, l, wd], i) => { const [x, y] = qpt(FB, u); return stalkLeaf17(x, y, a, l, wd, 0, { stalk: 40, cols: ["#58B56C"], line: "#3E9E5A", stalkC: "#6E8A44" }); }).join("") + `</g>`; }
  // the leaf: a wide plane with its midrib and veins
  s += `<path d="M-700 1300 Q-560 420 ${vx} ${vy} Q2480 420 2620 1300z" fill="#5FB860" stroke="#3E9E5A" stroke-width="14"/><path d="M-700 1300 Q-560 420 ${vx} ${vy} Q2480 420 2620 1300z" fill="url(#e17LeafShine)"/>`
    + `<path d="M960 1300 L${vx} ${vy}" stroke="#A8E39A" stroke-width="34"/>` + [...Array(9)].map((_, i) => { const u = (i + 1) / 10, y = vy + (1300 - vy) * u * u, x0 = 960; return `<path d="M${x0} ${n2(y)} Q${n2(x0 - 600 * u)} ${n2(y - 60 * u)} ${n2(x0 - 1700 * u)} ${n2(y - 200 * u)} M${x0} ${n2(y)} Q${n2(x0 + 600 * u)} ${n2(y - 60 * u)} ${n2(x0 + 1700 * u)} ${n2(y - 200 * u)}" stroke="#8FD486" stroke-width="${n2(4 + 14 * u)}" fill="none"/>`; }).join("");
  if (bites > 0) s += [...Array(Math.ceil(bites))].map((_, i) => { const r = 120 + 70 * i * Math.min(1, bites - i); return `<circle cx="${960 + (i % 2 ? 160 : -120)}" cy="${n2(560 - 40 * i)}" r="${n2(r * Math.min(1, bites - i))}" fill="url(#e17LeafSky)"/>`; }).join("");
  s += `</g>`;
  // dappled light flickering through the leaves above
  s += [...Array(7)].map((_, i) => `<circle cx="${n2(200 + i * 260 + 40 * Math.sin(t * .7 + i))}" cy="${n2(300 + 260 * hash(i, 4))}" r="${n2(70 + 40 * hash(i, 6))}" fill="#FFF9C8" opacity="${n2(.12 + .1 * Math.sin(t * 1.3 + i * 2))}"/>`).join("");
  return s; }
// your own front: the egg's pale shell round the view (an egg), then your little front legs and your green chin (a caterpillar)
const eggRim = (a, crack = 0) => a <= .01 ? "" : OP(a, `<path d="M0 0 H1920 V1080 H0z M960 140 C1500 140 1760 420 1760 640 C1760 900 1500 1080 960 1080 C420 1080 160 900 160 640 C160 420 420 140 960 140z" fill="#F6E58A" fill-rule="evenodd" opacity=".92"/><path d="M960 160 C1480 160 1740 420 1740 640" stroke="#fff" stroke-width="20" fill="none" opacity=".5"/>`
  + (crack > .02 ? `<path d="M960 140 L${n2(960 - 40 * crack)} ${n2(140 + 160 * crack)} L${n2(960 + 30 * crack)} ${n2(140 + 300 * crack)} M1760 640 L${n2(1760 - 180 * crack)} ${n2(640 - 50 * crack)} M160 640 L${n2(160 + 200 * crack)} ${n2(640 + 60 * crack)} M1300 1040 L${n2(1300 - 60 * crack)} ${n2(1040 - 200 * crack)}" stroke="#A8903A" stroke-width="10" fill="none" stroke-linecap="round"/>` : ""));
const myFront = (t, k = 1, munch = 0) => { const ch = munch ? Math.sin(t * 10) : 0; return TF(960, 1080, k, `<path d="M-300 120 Q-260 -60 -120 -120 Q0 -150 120 -120 Q260 -60 300 120z" fill="#A9D96A" stroke="#3E7A2A" stroke-width="8"/><path d="M-200 0 Q0 -80 200 0" stroke="#C9EC8A" stroke-width="18" fill="none" opacity=".7"/>`
  + `<path d="M-120 -110 L${n2(-150 - 10 * ch)} -190 M120 -110 L${n2(150 + 10 * ch)} -190" stroke="#5E5A3A" stroke-width="18" stroke-linecap="round"/>` + [[-250, 1], [-190, .9], [190, .9], [250, 1]].map(([x, k2], i) => `<path d="M${x} 30 L${n2(x * 1.1 + 6 * Math.sin(t * 6 + i))} -70 L${n2(x * 1.2)} -100" stroke="#3E5A2A" stroke-width="${n2(22 * k2)}" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`).join("")); };
function bflyJourney(t, s) { const m = MK, tE = m("jegg"), tH = m("jhatch"), tM = m("jmunch"), tT = m("jtight"), tB = m("jbig"), tHg = m("jhang"), tSp = m("jsplit"), tP = m("jpupa");
  const grow = 1 - .42 * ss(tB - .3, tB + 1.6, t), rot = 180 * ss(tHg, tHg + 2.2, t), bites = t < tM ? 0 : Math.min(4, (t - tM) * 1.3) * (1 - ss(tB - .5, tB, t)), dz = 1 + .06 * Math.sin(t * .8);
  let out = `<g transform="translate(960 540) scale(${n2(dz * (t < tH ? 1.1 : 1))}) translate(-960 -540)">${leafField(t, grow * (t < tH ? 1.2 : 1), rot, bites)}</g>`;
  // days go by before you hatch: the light dims and brightens (speeded up)
  if (t < tH) out += `<rect width="1920" height="1080" fill="#1E2A5A" opacity="${n2(.35 * Math.max(0, Math.sin((t - tE) * 1.6)) * ss(tE + .8, tE + 1.5, t))}"/>`;
  // a raindrop rolls past on the leaf
  { const u = clamp((t - tE - 3) / 2.2); if (u > 0 && u < 1) out += TF(lerp(1500, 300, u), lerp(760, 900, u), 1, `<ellipse rx="70" ry="56" fill="#DFF6FF" opacity=".75" stroke="#fff" stroke-width="5"/><ellipse cx="-20" cy="-18" rx="18" ry="12" fill="#fff"/>`); }
  // the egg's shell round the view; it cracks at jhatch and the light pours in
  out += eggRim(1 - ss(tH + .5, tH + 1, t), ss(tH - .2, tH + .4, t)) + (t >= tH && t < tH + 1.2 ? `<rect width="1920" height="1080" fill="#FFFDE8" opacity="${n2(.85 * (1 - (t - tH) / 1.2))}"/>` : "");
  // shards fly out
  if (t >= tH + .4 && t < tH + 1.6) { const u = (t - tH - .4) / 1.2; out += [...Array(8)].map((_, i) => { const a = i / 8 * Math.PI * 2; return TF(960 + Math.cos(a) * 700 * (.6 + u), 600 + Math.sin(a) * 450 * (.6 + u), 1 - u, `<path d="M-60 -30 L50 -50 L40 40 L-40 30z" fill="#F6E58A" stroke="#C9A93A" stroke-width="5"/>`, 40 * i + 200 * u); }).join(""); }
  // tight: the edges squeeze in, then your old skin slides away below
  { const sq = ss(tT - .2, tT + .4, t) * (1 - ss(tT + 1.4, tT + 2, t)); if (sq > .01) out += `<path d="M0 0 H1920 V1080 H0z M${n2(60 + 260 * sq)} ${n2(40 + 200 * sq)} H${n2(1860 - 260 * sq)} V${n2(1040 - 160 * sq)} H${n2(60 + 260 * sq)}z" fill="#86C64A" fill-rule="evenodd" opacity="${n2(.85 * sq)}"/>` + [...Array(6)].map((_, i) => `<path d="M${n2(60 + 260 * sq + i * 280)} ${n2(40 + 200 * sq)} q20 ${n2(30 * sq)} 0 ${n2(60 * sq)}" stroke="#5E9E36" stroke-width="8" fill="none" opacity="${n2(sq)}"/>`).join("");
    const u = clamp((t - tT - 1.3) / 1.6); if (u > 0 && u < 1) out += TF(960, 900 + 400 * u, 1 - .3 * u, `<path d="M-400 -60 Q-200 -120 0 -80 Q200 -120 400 -60 Q300 40 0 20 Q-300 40 -400 -60z" fill="#E8F2C8" stroke="#B8C98A" stroke-width="6" opacity=".9"/>${[...Array(6)].map((_, i) => `<path d="M${-300 + i * 120} -70 q10 40 0 70" stroke="#C9D6A0" stroke-width="5" fill="none"/>`).join("")}`); }
  // you: your front at the bottom edge (from the hatch until you stop eating)
  if (t >= tH + .3 && t < tHg + 1) out += OP(ramp(t, tH + .3, .4) * (1 - ramp(t, tHg + .3, .5)), myFront(t, 1 / Math.max(.6, grow) * 1.15, t >= tM && t < tT ? 1 : 0));
  // hanging: the silk pad and the thin girdle (true for a swallowtail) at the frame's edges
  if (t >= tHg + 1) { const a = ramp(t, tHg + 1, .6) * (1 - ramp(t, tP - .4, .5)); out += OP(a, `<path d="M-20 160 Q600 260 1940 120" stroke="#FFFDF2" stroke-width="10" fill="none" opacity=".9"/><path d="M-20 180 Q600 280 1940 140" stroke="#E8E2C8" stroke-width="4" fill="none"/><ellipse cx="960" cy="1060" rx="220" ry="60" fill="#FFFDF2" opacity=".9"/>`) + TF(1460, 230, a * spring(t, tHg + 1.2, .4), tpill(0, 0, "a silk girdle", 34, "#fff", P.ink, { w: 700 })) + TF(960, 960, a * spring(t, tHg + 1.6, .4), tpill(0, 0, "a silk pad", 34, "#fff", P.ink, { w: 700 })); }
  // the last split: your skin opens from the head down, the smooth case underneath
  { const sp = ss(tSp, tSp + 2.4, t); if (t >= tSp - .1) { const g = 1 - ss(tP + .2, tP + 1, t); out += OP(g, `<path d="M0 0 H${n2(960 - 900 * sp)} Q${n2(1000 - 900 * sp)} 540 ${n2(960 - 900 * sp)} 1080 H0z" fill="#86C64A" stroke="#3E7A2A" stroke-width="10"/><path d="M1920 0 H${n2(960 + 900 * sp)} Q${n2(920 + 900 * sp)} 540 ${n2(960 + 900 * sp)} 1080 H1920z" fill="#86C64A" stroke="#3E7A2A" stroke-width="10"/>`
      + `<path d="M${n2(300 - 600 * sp)} 300 q60 200 -20 400 M${n2(1620 + 600 * sp)} 300 q-60 200 20 400" stroke="#F4F1DA" stroke-width="40" fill="none" opacity=".7"/>`); } }
  // the hard, smooth, green case closes round the view: soft green and quiet
  { const c = ss(tP - .6, tP + 1.2, t); if (c > .01) out += `<path d="M0 0 H1920 V1080 H0z M960 ${n2(540 - 520 * (1 - .45 * c))} C${n2(960 + 760 * (1 - .4 * c))} ${n2(540 - 520 * (1 - .45 * c))} ${n2(960 + 760 * (1 - .4 * c))} ${n2(540 + 520 * (1 - .45 * c))} 960 ${n2(540 + 520 * (1 - .45 * c))} C${n2(960 - 760 * (1 - .4 * c))} ${n2(540 + 520 * (1 - .45 * c))} ${n2(960 - 760 * (1 - .4 * c))} ${n2(540 - 520 * (1 - .45 * c))} 960 ${n2(540 - 520 * (1 - .45 * c))}z" fill="#8FCB5A" fill-rule="evenodd" opacity="${n2(Math.min(1, c * 1.3))}"/><rect width="1920" height="1080" fill="#B5E06A" opacity="${n2(.3 * c)}"/><path d="M500 220 Q700 120 960 110" stroke="#E8F6B0" stroke-width="30" fill="none" opacity="${n2(.6 * c)}" stroke-linecap="round"/>`; }
  return out; }
// the larva card (scene larva): the caterpillar big with three plain label lines, the butterfly small beside it (the adult)
const larvaCard = (t, k) => { if (k < .01) return ""; const c = `<g filter="url(#drop)"><rect x="-470" y="-250" width="940" height="500" rx="34" fill="url(#gPaper)" stroke="#E3C9A8" stroke-width="7"/></g><rect x="-450" y="-230" width="590" height="460" rx="24" fill="#E3F4D8"/><path d="M-450 120 Q-150 90 140 120 V230 H-450z" fill="#7A5230" opacity=".9"/>`
    + TF(-160, 122, 1.15, cat17(t, {})) + `<rect x="160" y="-230" width="290" height="460" rx="24" fill="#DCEFFB"/>` + TF(305, 0, .55, bfly17(t, { flap: .3 + .3 * Math.sin(t * 3) })) + TF(305, 170, 1, tpill(0, 0, "the adult", 30, "#fff", P.ink, { w: 700 })) + TF(-160, -190, 1, tpill(0, 0, "the larva", 40, P.ink, "#fff", { w: 700 }))
    + lcLab(t, W("a903", "eats") - .1, -330, -100, "eats a lot", -40, 40, { size: 36 }) + lcLab(t, W("a903", "moults") - .1, -40, -100, "moults many times", -140, 20, { size: 34, fill: "#FFE2C0", ink: "#B4531A" }) + lcLab(t, W("a902m", "nothing") - .1, 20, 200, "looks nothing like the adult", 220, 100, { size: 30, fill: "#D7F5EE", ink: "#0F766E" });
  return TF(1080, 560, k * .86, c); };
// the fun-fact pictures (Part 1): a moth caterpillar's silk cocoon on a twig (cut away: a pupa inside), the silk from a silkworm moth's cocoon
const ffCocoon = (t, w, h) => `<rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" fill="#E8F5DC"/>` + TF(0, 30, 1.25, cocoon17(t, { cut: ss(MK("ff_cocoon") + .8, MK("ff_cocoon") + 1.6, t), id: "ff" })) + TF(0, 130, 1, tpill(0, 0, "a pupa inside", 28, "#fff", P.ink, { w: 700 }));
const ffSilk = (t, w, h) => `<rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" fill="#FFF3DC"/>` + TF(-110, 20, .9, `<ellipse rx="70" ry="44" fill="#FBF8EE" stroke="#D9D1B8" stroke-width="4"/>${[...Array(6)].map((_, i) => `<path d="M${-56 + i * 22} -30 Q${-50 + i * 22} 0 ${-56 + i * 22} 30" stroke="#E6DFCC" stroke-width="3" fill="none"/>`).join("")}<path d="M70 0 Q120 -20 160 10" stroke="#F4F1E8" stroke-width="4" fill="none"/>`)
  + `<path d="M10 -90 Q90 -120 170 -80 Q200 0 160 90 Q100 120 40 100 Q60 40 10 -90z" fill="#F49BC4" stroke="#C9608E" stroke-width="5"/><path d="M30 -60 Q100 -80 150 -50 M40 10 Q100 -6 160 20" stroke="#FFD9EA" stroke-width="6" fill="none" opacity=".8"/>` + TF(90, 140, 1, tpill(0, 0, "a silk scarf", 28, "#fff", P.ink, { w: 700 }));

/* ================================================================ PART 2 ================================================================ */
// the recap pictures (Part 2's "Last time...": 1040 x 600 each, one at a time): the caterpillar on its leaf (a larva), the empty pupal case
// and the butterfly beside it, the pail of rainwater with a ?
const recapPic17 = (i, t) => { let s = `<rect x="-520" y="-300" width="1040" height="600" fill="${["#E3F4D8", "#EAF6E2", "#DCEFFB"][i]}"/>`;
  if (i === 0) s += `<path d="M-520 120 Q0 60 520 110" stroke="#7A5230" stroke-width="40" fill="none"/><path d="M-464 112 Q-466 132 -460 152" stroke="#5E7A3A" stroke-width="14" fill="none" stroke-linecap="round"/><g transform="translate(-460 150) rotate(-20)">${leaf15(300, 100, "#58B56C", "#2F7A45")}</g>` + TF(30, 100, 1.5, cat17(t, {}));
  if (i === 1) s += TF(-180, 240, 1.25, pupa17(t, { empty: true })) + TF(200, -30, .85, bfly17(t, { flap: .3 + .3 * Math.sin(t * 2.5) }));
  if (i === 2) s += `<rect x="-520" y="120" width="1040" height="180" fill="#9FD08A"/>` + TF(0, 260, 1.5, pailArt17(t, { rings: [[MK("pic3") + .4, 0]], wrig: 1, id: "rc" }));
  return s; };
// Round 1's ring (lockN obj, round (430, 470)): the pail's still surface from the side, three wrigglers hanging from it
// 24 Nov: the water line and the wrigglers moved up (and a little smaller) so their heads are not hidden behind the countdown's number badge
const ringPail = (tt) => `<clipPath id="rpl"><circle cx="430" cy="470" r="188"/></clipPath><g clip-path="url(#rpl)"><circle cx="430" cy="470" r="188" fill="#BFE7E0"/><rect x="230" y="230" width="400" height="110" fill="#DDF3FF"/><path d="M230 340 H630" stroke="#fff" stroke-width="8"/>` + [[340, 0], [440, 1.4], [530, 2.4]].map(([x, ph]) => TF(x, 340, .8, wrig17(tt, { wig: .15, ph, lean: 16 + 6 * Math.sin(ph) }))).join("") + `</g>`;
// Pip's idea (too little water?): a tiny plate of water with a crossed-out mosquito and a ? (an idea, never a fact)
const plateIdea = (t) => `<rect x="-300" y="-200" width="600" height="400" fill="#F4E9D8"/><ellipse cx="-20" cy="90" rx="200" ry="44" fill="#C8643E" stroke="#8A3E22" stroke-width="6"/><ellipse cx="-20" cy="84" rx="170" ry="28" fill="#9FD0DE"/>`
  + TF(-30, 0, 1.3, mosq17(t, { wing: .3 })) + `<path d="M-130 -110 L90 60 M90 -110 L-130 60" stroke="#E0453A" stroke-width="14" stroke-linecap="round" opacity=".85"/>` + TF(0, 160, 1, tpill(0, 0, "too little water?", 36, "#fff", P.ink, { w: 700 }));

/* ---------- [LOOK CLOSER] the wrigglers (lcwriggler): a cut-away side view of the pail's water ---------- */
const WSURF = -200, WRX = [-380, -20, 340];
function wrigArt(t) { const m = MK, s0 = SCN.lcwriggler.t0 + 1, tH = m("hang"), tT = m("tube"), tU = m("up"), tD = tU - 2.4, tK = m("kw_wriggler"), tV = m("v_wriggler"), tL = W("b506b", "like") - .1;
  const dv = ss(tD, tD + .5, t) * (1 - ss(tU, tU + 1.4, t)), fun = t >= tL && t < tL + 2.4 ? 1 : 0, cam = camSeq(t, [s0, tH, tT, tD - .3, tU + 1.4], [[0, 0, 1], [0, -40, 1.04], [WRX[2] - 60, WSURF + 60, 1.35], [0, 0, 1], [0, -20, 1.02]]);
  let w = `<rect x="-900" y="-500" width="1800" height="${500 + WSURF}" fill="#EAF6FF"/><rect x="-900" y="${WSURF}" width="1800" height="${700 - WSURF}" fill="url(#e17WaterUW)"/>` + uwRays(t, "#fff", .09).replace(/<path /g, `<path transform="translate(-960 ${WSURF}) " `)
    + `<path d="M-900 ${WSURF} ${[...Array(24)].map((_, i) => `Q${-860 + i * 75} ${n2(WSURF - 4 + 3 * Math.sin(t * 2 + i))} ${-825 + i * 75} ${WSURF}`).join(" ")}" stroke="#fff" stroke-width="10" fill="none"/>`
    + `<g transform="translate(-660 ${WSURF - 2}) rotate(-8)">${leaf15(120, 40, "#C9A84A", "#8A6A2A")}</g>` + [...Array(14)].map((_, i) => `<circle cx="${n2(-800 + 1600 * hash(i, 31) + 20 * Math.sin(t * .6 + i))}" cy="${n2(-100 + 420 * hash(i, 33) + 15 * Math.sin(t * .4 + i))}" r="${n2(3 + 4 * hash(i, 35))}" fill="#E8F6F2" opacity=".7"/>`).join("");
  // a soft shadow passes over the water: they jerk down in S-shaped wriggles, then wriggle back up and hang again
  if (t >= tD - .8 && t < tD + 1.4) { const u = (t - tD + .8) / 2.2; w += `<ellipse cx="${n2(lerp(-1100, 1100, u))}" cy="${WSURF - 80}" rx="420" ry="160" fill="#2B2147" opacity=".22" filter="url(#b16)"/>`; }
  WRX.forEach((x, i) => { const wig = Math.max(.12, dv, fun * .9), y = WSURF + 2 + 260 * dv * (1 + .2 * i); w += TF(x + 30 * Math.sin(t * .7 + i) * dv, y, 1.5, wrig17(t, { wig, ph: i * 1.3, lean: 18 - 6 * i, tube: i === 2 ? (t >= tT - .2 && t < tD ? 1 : 0) : 0 })); });
  // the tiny air bubble above the tube
  let out = inCam(cam, w); const cp = (p) => [(p[0] - cam[0]) * cam[2], (p[1] - cam[1]) * cam[2]];
  if (t >= tH - .1 && t < tD) { const a = 1 - ramp(t, tD - .4, .3), p = cp([-300, WSURF]); out += OP(a, pline(-120, -290, p[0], p[1], ramp(t, tH - .1, .2), "#2E7AB8") + TF(-120, -300, spring(t, tH - .1, .4), tpill(0, 0, "the water's surface", 44, "#2E7AB8", "#fff", { w: 700 }))); }
  if (t >= tT - .1 && t < tD + .2) { const k = spring(t, tT - .1, .45) * (1 - ramp(t, tD - .2, .3)), p = cp([WRX[2], WSURF]);
    const lens = `<rect x="-170" y="-170" width="340" height="150" fill="#EAF6FF"/><rect x="-170" y="-20" width="340" height="190" fill="url(#e17WaterUW)"/><path d="M-170 -20 H170" stroke="#fff" stroke-width="10"/><path d="M-6 -24 L-24 160" stroke="#E36A12" stroke-width="26" stroke-linecap="round"/><path d="M-26 150 L-34 200" stroke="#5A5468" stroke-width="30"/><ellipse cx="-4" cy="-26" rx="16" ry="8" fill="#E36A12"/><circle cx="${n2(4 + 3 * Math.sin(t * 5))}" cy="${n2(-60 - 30 * ((t * .8) % 1))}" r="12" fill="#fff" stroke="#9AC0DA" stroke-width="3" opacity="${n2(1 - (t * .8) % 1)}"/>`;
    out += OP(k, `<circle cx="${n2(p[0])}" cy="${n2(p[1])}" r="44" fill="none" stroke="#E36A12" stroke-width="7"/>`) + OP(k, pline(p[0] + 40, p[1] - 30, 380, -170, 1, "#E36A12")) + TF(520, -150, k, `<clipPath id="wtm"><circle r="160"/></clipPath><g clip-path="url(#wtm)">${lens}</g><circle r="160" fill="none" stroke="#E36A12" stroke-width="12"/><path d="M112 112 L180 180" stroke="#E36A12" stroke-width="22" stroke-linecap="round"/>`) + TF(520, 60, k, tpill(0, 0, "a little tube", 46, "#E36A12", "#fff", { w: 700 })); }
  if (t >= tK - .2 && t < tV) out += OP(1 - ramp(t, tV - .4, .3), [0, 1, 2].map((i) => { const p = cp([WRX[i] + 20, WSURF + 120]); return pline(220, 300, p[0], p[1], ramp(t, tK, .2), "#5A5468"); }).join("") + TF(220, 300, spring(t, tK, .4), tpill(0, 0, "wrigglers: the mosquito's larvae", 40, "#5A5468", "#fff", { w: 700 })));
  return out; }

/* ---------- BE A MOSQUITO EGG (the journey). Redrawn 2026-11-25 (teacher, on the old first-person view: "I don't get what this scene is.
   Improve on it, please"); the model is EP20's ring journey (ep20/lc20.js ringJourney). A SIDE VIEW of the still water in the pail: the
   surface line across the frame, the pail's blue back wall and rim, the garden beyond; the three buddies watch from the rim, facing the
   middle. YOU are marked all the way (a sun-yellow glow round you, eyes, a "You: ..." tag joined to you) and every stage is drawn and
   labelled ON the thing: the eggs float on the surface in a little raft; you hatch into a wriggler, hang head-down from the surface by your
   breathing tube, wriggle down to eat tiny bits and back up, moult (the old skin drifts off) and grow bigger; you curl into a comma-shaped
   pupa at the surface (bits drift past: it does not eat; a glow inside: it changes); the case splits at the surface, the adult climbs out
   onto it, dries its wings and flies off. A stage strip at the top (egg, wriggler, pupa, adult) lights up as you go. "speeded up" small.
   Same lines and marks as before (b602-b605; jegg jhatch jeat jbig jpupa jsplit jfly). ---------- */
const MJ = { S: 470, L: 150, R: 1770, F: 1050, X: 1000 };   // the surface's y, the pail's inside left and right, its floor, where you hang
const mjRim = (x) => 318 + 40 * Math.pow((x - 960) / 840, 2);   // the back rim's top edge
// a glow the shape of an svg string (every fill and stroke sun-yellow, strokes fatter, blurred)
const mjGlow = (svg, w = 10, a = .9) => `<g filter="url(#b10)" opacity="${n2(a)}">${svg.replace(/(fill|stroke)="#[0-9A-Fa-f]{3,6}"/g, `$1="${P.sun}"`).replace(/stroke-width="([\d.]+)"/g, (q, v) => `stroke-width="${n2(+v + w)}"`)}</g>`;
// one egg, standing on end in the raft (origin = its middle); o.empty: the shell after hatching (its bottom open)
const mjEgg = (x, y, o = {}) => o.empty ? `<g transform="translate(${n2(x)} ${n2(y)})"><path d="M-16 34 Q-18 -50 0 -50 Q18 -50 16 34" fill="#D6D0E2" stroke="#9A94B0" stroke-width="3" opacity=".85"/><ellipse cx="0" cy="34" rx="16" ry="5" fill="#6E8FA0" opacity=".6"/></g>`
  : `<g transform="translate(${n2(x)} ${n2(y)})"><ellipse rx="16" ry="50" fill="#3A3448" stroke="#211C2E" stroke-width="3"/><ellipse cx="-6" cy="-22" rx="4" ry="15" fill="#8A84A0" opacity=".7"/></g>`;
// the pupa, comma-shaped (art17 mpupa17's shape), with your two eyes; o.empty: the case after the adult is out; o.inside (0..1) a glow and
// the new body's shapes forming inside; o.crack (0..1) the split along its back. Origin = the two breathing trumpets' tips (at the surface)
const mjPupa = (t, o = {}) => { const c = o.empty ? "#D6D0E2" : "#5E5870", g = o.inside || 0, cr = o.crack || 0;
  return `<path d="M-10 0 L-8 18 M10 0 L8 18" stroke="#5A5468" stroke-width="5" stroke-linecap="round"/><circle cx="0" cy="48" r="36" fill="${c}" stroke="#3A3448" stroke-width="3"/><path d="M30 60 Q46 100 20 128 Q-6 146 -16 120" stroke="${c}" stroke-width="16" fill="none" stroke-linecap="round"/><path d="M-16 120 l-18 6 M-16 120 l-8 16" stroke="#7A7490" stroke-width="5" stroke-linecap="round"/><path d="M-20 32 Q0 22 20 32" stroke="#8A84A0" stroke-width="3" fill="none"/>`
    + (g > .02 ? `<ellipse cx="2" cy="50" rx="${n2(30 * g)}" ry="${n2(28 * g)}" fill="url(#e17Glow)"/><g opacity="${n2(g)}" stroke="#F4F8FF" stroke-width="2.5" fill="none" stroke-linecap="round"><path d="M-4 40 Q18 30 26 50"/><path d="M-6 46 Q14 44 22 62"/><path d="M-12 60 L-22 76 M-4 62 L-8 80 M4 62 L8 80"/></g>` : "")
    + (o.empty ? "" : eye16(-20, 52, 7, { shut: o.shut }) + eye16(-2, 50, 7, { shut: o.shut }))
    + (cr > .02 ? `<path d="M-22 ${n2(16 - 4 * cr)} L-10 ${n2(10 - 6 * cr)} L0 ${n2(16 - 4 * cr)} L10 ${n2(10 - 6 * cr)} L22 ${n2(16 - 4 * cr)}" stroke="#FFF6C8" stroke-width="${n2(3 + 5 * cr)}" fill="none" stroke-linejoin="round" stroke-linecap="round"/>` : ""); };
// the adult mosquito (art17 mosq17's shape) with your big eye and its wings: o.wk 0..1 (crumpled, wet -> dry and open), o.wing (buzz).
// Origin = its feet line
const mjAdult = (t, o = {}) => { const wb = (o.wing || 0) * Math.sin(t * 80), wk = o.wk === undefined ? 1 : o.wk, wet = wk < .85 ? ' stroke-dasharray="7 4"' : "";
  const wing = (dx, rot, rx, ry, fo) => `<g transform="translate(${dx} -44) rotate(${n2(rot + 14 * wb)}) scale(${n2(.3 + .7 * wk)} ${n2(.5 + .5 * wk)})"><ellipse cx="${-rx + 2}" cy="-8" rx="${rx}" ry="${ry}" fill="#E6F4FF" fill-opacity="${fo}" stroke="#9AB8D0" stroke-width="2.5"${wet}/></g>`;
  return `<path d="M-10 -34 L-40 0 M-2 -34 L-14 0 M6 -34 L22 0 M10 -34 L54 2 M-14 -34 L-62 -6 M14 -34 L70 -8" stroke="#4A4458" stroke-width="3" stroke-linecap="round" fill="none"/>`
    + wing(0, -22 - 30 * (1 - wk), 52, 12, .75) + wing(4, -12 - 30 * (1 - wk), 48, 11, .6)
    + `<path d="M-10 -40 Q-60 -36 -96 -22" stroke="#4A4458" stroke-width="11" stroke-linecap="round" fill="none"/>${[-36, -56, -76].map((x) => `<path d="M${x} -42 v12" stroke="#E8E4F0" stroke-width="3"/>`).join("")}<ellipse cx="4" cy="-42" rx="16" ry="12" fill="#4A4458"/>`
    + `<circle cx="24" cy="-44" r="12" fill="#5A5468"/>${eye16(28, -46, 7.5, { shut: o.shut })}<path d="M32 -36 Q42 -28 44 -18" stroke="#4A4458" stroke-width="2.5" fill="none" stroke-linecap="round"/><path d="M28 -54 q8 -12 18 -14 M26 -54 q4 -14 12 -18" stroke="#4A4458" stroke-width="2" fill="none"/>`; };
// the stage strip: four small tiles (art17 mPic) with arrows, egg -> wriggler (larva) -> pupa -> adult. The stage you are in lights (a sun disc),
// the ones you have been get a tick, the ones to come wait faded
function mjStrip(t, lit) { const Y0 = 76, xs = [615, 845, 1075, 1305], nm = ["egg", "wriggler (larva)", "pupa", "adult"]; let cur = -1; lit.forEach((t0, i) => { if (t >= t0) cur = i; });
  let s = `<g filter="url(#dropS)"><rect x="470" y="10" width="980" height="174" rx="30" fill="#FFF8EA" stroke="#C9A974" stroke-width="5"/></g>`;
  for (let i = 0; i < 3; i++) { const col = cur > i ? P.leaf : "#D9C9A8", x1 = xs[i] + 60, x2 = xs[i + 1] - 62; s += `<path d="M${x1} ${Y0} H${x2 - 12}" stroke="${col}" stroke-width="9" stroke-linecap="round"/><path d="M${x2 - 16} ${Y0 - 15} L${x2 + 4} ${Y0} L${x2 - 16} ${Y0 + 15}z" fill="${col}"/>`; }
  xs.forEach((x, i) => { const on = i === cur, fut = i > cur, a = on ? spring(t, lit[i], .45) : 0, k = on ? 1.1 + .03 * Math.sin(t * 4) : .9;
    s += `<g transform="translate(${x} ${Y0})">${on ? `<circle r="${n2(60 * a)}" fill="${P.sun}" opacity=".9"/>` : ""}<g opacity="${fut ? .4 : 1}">${TF(0, 0, 46 / 92 * k, tile16(mPic(i, t), 92, "mjs" + i, on ? P.ink : P.leaf))}</g>${i < cur ? TF(36, -34, 1, tickBadge(17)) : ""}</g>`
      + OP(fut ? .55 : 1, tpill(x, Y0 + 74, nm[i], 25, on ? P.ink : "#fff", on ? "#fff" : P.ink, { w: 700 })); });
  return s; }
function mosqJourney(t, s, o = {}) { const m = MK, S = MJ.S, X = MJ.X, tE = m("jegg"), tH = m("jhatch"), tEa = m("jeat"), tB = m("jbig"), tP = m("jpupa"), tSp = m("jsplit"), tF = m("jfly");
  const tDy = W("b602", "days"), tSu = W("b603", "surface"), tMo = W("b603", "moult"), tGr = W("b603", "grow"), tCu = W("b604", "curl"), tNo = W("b604", "not"), tCh = W("b604", "changing"), tCl = W("b605", "climb"), tDr = W("b605", "dry"), tEnd = s.t1;
  const sh = blink16(t, .7); let out = "";
  // the garden beyond the pail (soft, far), the pail's inside back wall and its rim, the water, the floor
  out += `<rect width="1920" height="1080" fill="url(#e17Sky)"/><g filter="url(#b10)" opacity=".85">${[[120, 300, 260, 90], [480, 280, 220, 80], [880, 300, 300, 70], [1320, 285, 260, 85], [1760, 300, 240, 90]].map(([x, y, rx, ry], i) => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${i % 2 ? "#7FC27A" : "#66B06A"}"/>`).join("")}<rect x="0" y="330" width="1920" height="760" fill="#8CCB76"/></g>`;
  const rim = (y0) => [...Array(25)].map((_, i) => { const x = MJ.L - 50 + i * (MJ.R - MJ.L + 100) / 24; return `${i ? "L" : "M"}${n2(x)} ${n2(mjRim(x) + y0)}`; }).join(" ");
  out += `<path d="${rim(0)} L${MJ.R + 50} ${S} L${MJ.L - 50} ${S}z" fill="#3F8ED6"/><path d="${rim(0)} L${MJ.R + 50} ${S} L${MJ.L - 50} ${S}z" fill="#1E4E88" opacity=".18"/><path d="${rim(0)}" stroke="#2E6FB8" stroke-width="26" fill="none" stroke-linejoin="round"/><path d="${rim(-8)}" stroke="#7FC0F2" stroke-width="7" fill="none" opacity=".8"/>`;
  out += `<clipPath id="mjW"><rect x="${MJ.L}" y="${S}" width="${MJ.R - MJ.L}" height="${MJ.F - S}"/></clipPath><rect x="${MJ.L}" y="${S}" width="${MJ.R - MJ.L}" height="${MJ.F - S}" fill="url(#e17WaterUW)"/><g clip-path="url(#mjW)">${uwRays(t, "#fff", .08)}</g><rect x="${MJ.L}" y="${MJ.F}" width="${MJ.R - MJ.L}" height="40" fill="#2E6FB8"/>`;
  // the buddies, shrunk, watching from the back rim: Momo and Pip at the left, Basil at the right, each facing the middle (riders flips x > 960)
  const rp = o.poses || {}; out += riders(t, s, { tin: s.t0 + .5, h: 150, at: { momo: [250, mjRim(250) + 4], pip: [415, mjRim(415) + 4], basil: [1680, mjRim(1680) + 4] }, poses: rp });
  // tiny bits of food drifting in the water (from just before "You eat" until the pupa has let them drift past); four are eaten at the dive's bottom
  const bitsA = ss(tSu, tSu + 1, t) * (1 - ss(tCh, tCh + 1, t));
  if (bitsA > .01) out += OP(bitsA, [...Array(15)].map((_, i) => { const x = 260 + 1400 * hash(i, 41) + 30 * Math.sin(t * .4 + i), y = S + 90 + 440 * hash(i, 43) + 14 * Math.sin(t * .5 + i * 2); if (Math.abs(x - X) < 120) return ""; return `<circle cx="${n2(x)}" cy="${n2(y)}" r="${n2(7 + 6 * hash(i, 47))}" fill="${i % 2 ? "#8FAE5A" : "#C9B88A"}" stroke="#6E7A4A" stroke-width="2"/>`; }).join(""));
  const FB = [720 + 16 * Math.sin(t * .5), S + 300 + 10 * Math.sin(t * .7)];
  if (bitsA > .01) out += OP(bitsA, `<circle cx="${n2(FB[0])}" cy="${n2(FB[1])}" r="12" fill="#8FAE5A" stroke="#6E7A4A" stroke-width="2"/>`);
  const eatT = [0, 1, 2, 3].map((i) => tEa + .55 + i * .16), BITS = [[-84, 500], [-30, 512], [-110, 470], [0, 478]];
  if (t >= tSu && t < eatT[3] + .2) out += BITS.map(([dx, dy], i) => { const g = 1 - ss(eatT[i] - .08, eatT[i] + .06, t); return g > .02 ? `<circle cx="${X + dx}" cy="${S + dy}" r="${n2(9 * g)}" fill="${i % 2 ? "#8FAE5A" : "#C9B88A"}" stroke="#6E7A4A" stroke-width="2"/>` : ""; }).join("");
  // --- EGG: the raft of eggs floating on the surface; yours in the middle, glowing, with eyes. It hatches from its bottom into the water;
  //     the empty raft then drifts aside
  const EK = 1.45, RX = lerp(960, 470, ss(tH + .4, tH + 2.4, t)), egY = S + 8 * EK, rA = 1 - ss(tP - .6, tP + .4, t); let raft = "";
  for (let i = 0; i < 9; i++) { const x = RX + (i - 4) * 33 * EK, y = egY + 1.5 * Math.sin(t * .9 + i);
    if (i !== 4) raft += TF(x, y, EK, mjEgg(0, 0, { empty: t >= tH + .2 + .25 * Math.abs(i - 4) }));
    else if (t >= tH) raft += TF(x, y, EK, mjEgg(0, 0, { empty: true })); }
  if (t < tH) { const x = RX, y = egY - 6, e = TF(x, y, EK, mjEgg(0, 0));   // yours: drawn on top, a little higher, outlined and glowing, with eyes
    raft += mjGlow(e, 16, .8 + .2 * Math.sin(t * 3)) + e + TF(x, y, EK, `<ellipse rx="17" ry="51" fill="none" stroke="${P.sun}" stroke-width="4.5"/>` + eye16(-7, -24, 7, { shut: sh }) + eye16(8, -24, 7, { shut: sh })); }
  if (rA > .01) out += OP(rA, raft);
  // the water over everything below the surface (a light veil: those parts are IN the water) and the surface line itself
  const veil = `<rect x="${MJ.L}" y="${S}" width="${MJ.R - MJ.L}" height="${MJ.F - S}" fill="#BFE7F0" opacity=".16"/><rect x="${MJ.L}" y="${S - 3}" width="${MJ.R - MJ.L}" height="10" fill="#fff" opacity=".9"/><rect x="${MJ.L}" y="${S + 7}" width="${MJ.R - MJ.L}" height="10" fill="#fff" opacity=".25"/>`;
  // --- WRIGGLER: out of the egg's bottom, then up to hang head-down from the surface by the tail's breathing tube; down to eat and back up;
  //     the old skin drifts away; bigger
  const dive = 110 * ss(tEa - .1, tEa + .55, t) * (1 - ss(tMo - .55, tMo + .05, t)), moving = Math.max(ss(tH, tH + .3, t) * (1 - ss(tH + 2.2, tH + 2.6, t)), ss(tEa - .2, tEa, t) * (1 - ss(tMo, tMo + .3, t)));
  const wk = lerp(1.5, 1.9, ss(tGr - .1, tGr + .5, t)) * (1 + .06 * Math.sin(Math.PI * clamp((t - tGr + .1) / .6))), curl = ss(tCu + .1, tCu + .6, t);
  const emg = ss(tH, tH + .7, t), up = ss(tH + .9, tH + 2.4, t), wx = lerp(960, X, up), wy = lerp(S + 70 + 110 * emg, S, up) + dive, wa = (t < tH ? 0 : ramp(t, tH, .3)) * (1 - curl);
  const wrigPos = [wx, wy];
  if (t >= tH && t < tP + .3) { const w = wrig17(t, { wig: .12 + .9 * moving, lean: 8 + 4 * Math.sin(t * .8), eye: 6, k: wk }), sq = 1 - .45 * curl;
    out += OP(wa, TF(wx, wy, 1, mjGlow(w, 12, .75 + .15 * Math.sin(t * 3)) + w, 0, sq)); }
  // the old skin (pale, empty) drifts off down to the left after the moult
  { const v = clamp((t - tMo) / 2.6); if (t >= tMo && v < 1) out += OP(1 - ss(.7, 1, v), TF(X - 300 * v, S + 60 + 260 * v, 1, wrig17(t, { lean: 8 + 50 * v, k: 1.5 }).replace(/(fill|stroke)="#[0-9A-Fa-f]{3,6}"/g, `$1="#E4E0F0"`), 0)); }
  // --- PUPA: comma-shaped, at the surface by its two trumpets; it tumbles a little; bits drift past (it does not eat); a glow inside (it is
  //     changing); it rises so its back meets the surface, and the case splits there
  const pa = ss(tCu + .25, tCu + .75, t), rise = ss(tSp - .7, tSp - .1, t), PK = 2.5, crack = ss(tSp, tSp + 1.4, t), outA = ss(tCl, tCl + .9, t);
  if (pa > .01) { const roll = (1 - rise) * 5 * Math.sin(t * 1.4), py = S - 22 * PK * rise, inside = ss(tCh - .2, tCh + 1.2, t) * (1 - ss(tCl, tCl + .6, t)), pu = mjPupa(t, { inside, crack, shut: sh || t >= tCl, empty: outA > .6 });
    out += OP(pa, TF(X, py, PK, (outA < .6 ? mjGlow(pu, 8, (.7 + .15 * Math.sin(t * 3)) * (1 - outA)) : "") + pu, roll + 8 * rise)); }
  out += veil;
  // --- ADULT: it climbs out of the split onto the surface (only the part above the water shows while it comes up), dries its wings (they open
  //     out, the dashes go), and flies off up and to the right
  const fly = ss(tF + .5, tEnd - .05, t), AK = lerp(2.6, 1.8, fly), ax = lerp(X + 20, 1420, fly), ay = lerp(S - 4, 300, fly) - 60 * Math.sin(Math.PI * fly), wkA = ss(tDr - .1, tDr + 1.6, t);
  if (t >= tCl - .1) { const climb = 1 - ss(tCl - .1, tCl + .9, t), ad = mjAdult(t, { wk: .15 + .85 * wkA, wing: t > tF + .3 ? 1 : 0, shut: sh });
    out += `<clipPath id="mjA"><rect x="0" y="0" width="1920" height="${S + 2}"/></clipPath><g clip-path="url(#mjA)">${TF(ax, ay + 70 * AK * climb, AK, mjGlow(ad, 7, .75 + .15 * Math.sin(t * 3)) + ad, -6 * fly)}</g>`; }
  // the cut front edges of the pail (left and right), standing on the grass
  out += [MJ.L, MJ.R].map((x) => `<rect x="${x - (x < 960 ? 46 : 0)}" y="${n2(mjRim(x) - 12)}" width="46" height="${n2(1080 - mjRim(x) + 12)}" fill="#2E6FB8" stroke="#1E4E88" stroke-width="4"/>`).join("");
  // "Days go by": the light dims twice (two nights), speeded up
  if (t > tDy && t < tDy + 2.2) { const u = (t - tDy) / 1.1; out += `<rect width="1920" height="1080" fill="#1B2350" opacity="${n2(.42 * Math.pow(Math.sin(Math.PI * u), 2))}"/>`; }
  // --- the labels, every one joined to what it names
  out += lcLab(t, s.t0 + .6, 1460, 395, "the water's surface", 1460, S - 4, { size: 36, t1: tE - .3 });
  out += t >= tE + 1.8 && t < tEa ? OP(ramp(t, tE + 1.8, .4) * (1 - ramp(t, tEa - .4, .3)), TF(470, 960, 1, tpill(0, 0, "still water", 40, "#2E7AB8", "#fff", { w: 700 }))) : "";
  out += lcLab(t, W("b602", "egg") - .1, 520, 395, "eggs, in a little raft", RX - 150 * EK, egY - 30 * EK, { size: 36, t1: tH + .2 });
  out += lcLab(t, tH + .7, 520, 395, "the empty egg cases", RX - 150 * EK, egY - 30 * EK, { size: 36, t1: tH + 3.4 });
  const tagC = { size: 40, fill: P.sun, ink: P.ink };
  out += lcLab(t, tE, 1400, 395, "You: a mosquito egg", 968 + 10 * EK, egY - 44 * EK, { ...tagC, t1: tH - .05 });
  const mid = [wrigPos[0] - 14 * wk, wrigPos[1] + 120 * wk];
  out += lcLab(t, tH + .1, 1420, clamp(mid[1] + 40, 600, 900), "You: a wriggler", mid[0] + 22, mid[1], { ...tagC, t1: tCu + .3 });
  out += lcLab(t, tSu - .3, 1400, 395, "your breathing tube, at the surface", X + 4, S + 14, { size: 34, t1: tEa - .3 });
  out += lcLab(t, tEa + .1, 470, 880, "tiny bits of food", FB[0] - 8, FB[1] + 8, { size: 36, t1: tMo - .2 });
  { const v = clamp((t - tMo) / 2.6); out += lcLab(t, tMo + .15, 430, 960, "your old skin", X - 300 * v - 80, S + 60 + 260 * v + 170, { size: 36, t1: tMo + 2.2 }); }
  out += lcLab(t, tGr + .25, 470, 640, "you grow bigger", X - 30, S + 210, { size: 38, t1: tCu - .1 });
  const pc = [X - 8, S + 48 * PK - 22 * PK * rise];
  out += lcLab(t, tP, 1420, 700, "You: a pupa", pc[0] + 30, pc[1] + 10, { ...tagC, t1: tCl - .1 });
  out += lcLab(t, tP + .5, 470, 700, "comma-shaped", X + 40, S + 310, { size: 38, t1: tNo - .3 });
  out += lcLab(t, tNo - .1, 470, 760, "a pupa does not eat", pc[0] - 40, pc[1] + 20, { size: 38, t1: tCh - .3 });
  out += lcLab(t, tCh, 470, 700, "changing inside", pc[0], pc[1], { size: 40, fill: "#FFF3C4", t1: tSp - .3 });
  out += lcLab(t, tSp + .1, 1440, 390, "the case splits", X + 10, S - 8, { size: 38, t1: tCl + .2 });
  out += lcLab(t, tCl + 1.2, 470, 760, "the empty case", X - 40, S + 140, { size: 36, t1: tEnd - .3 });
  out += lcLab(t, tDr, 470, 390, "you dry your wings", ax - 70 * AK, ay - 54 * AK, { size: 38, t1: tF - .2 });
  out += lcLab(t, tCl + .4, lerp(1480, ax - 560, fly), lerp(clamp(ay - 110, 260, 900), ay + 150, fly), t >= tF ? "You: an adult mosquito" : "You: climbing out", ax + 10 * AK, ay - 44 * AK, { ...tagC });
  // the stage strip and the small "speeded up" tag
  out += mjStrip(t, [tE, tH, tP, tF]);
  out += TF(1690, 1028, .8, speeded(t, tDy - .1, tF + 1.2, 0, 0));
  return out; }

/* ---------- [LOOK CLOSER] the flower-pot plate in the corridor (lcplate) ---------- */
const PLX = -380, PLY = 60;
function plateArt(t) { const m = MK, s0 = SCN.lcplate.t0 + 1, tW = m("water"), tWr = m("wrigglers"), tK = m("kw_stagnant_water"), tT = m("tip"), tD = m("dim"), tP2 = m("pail2"), tVa = m("vase"), tV = m("v_plate"), tP1 = W("b907m", "plates") - .2;
  const tip = ss(tT, tT + 1.2, t) * (1 - ss(tT + 3.4, tT + 4.4, t)), drain = ss(tT + .6, tT + 2.2, t), tL = Math.min(W("b907m", "plates") - .2, MK("pail2")) - .6, mv = ss(tL, tL + .8, t);
  let s = `<rect x="-900" y="-500" width="1800" height="1000" fill="#F4E9D8"/><rect x="-900" y="180" width="1800" height="400" fill="url(#e17Tile)"/>`;
  // the drain at the floor's edge (the water goes there when the plate is tipped)
  s += `<rect x="-820" y="300" width="300" height="40" rx="8" fill="#6E6A60"/>${[...Array(8)].map((_, i) => `<rect x="${-806 + i * 36}" y="306" width="20" height="28" rx="4" fill="#3A3630"/>`).join("")}`;
  // the plate: thin, still water, a few fallen leaves; tipped by an ADULT's hand (four fingers and a thumb) at tip
  const plate = `<ellipse cx="0" cy="14" rx="330" ry="80" fill="${P.ink}" opacity=".18" filter="url(#b6)"/><ellipse cx="0" cy="0" rx="320" ry="74" fill="#C8643E" stroke="#8A3E22" stroke-width="8"/><ellipse cx="0" cy="-8" rx="${n2(280)}" ry="${n2(52)}" fill="#9FD0DE" opacity="${n2(1 - drain)}"/>`
    + (drain < 1 ? `<ellipse cx="-80" cy="-14" rx="70" ry="8" fill="#fff" opacity="${n2(.6 * (1 - drain))}"/><g transform="translate(60 -12) rotate(-10)" opacity="${n2(1 - drain)}">${leaf15(90, 30, "#C9A84A", "#8A6A2A")}</g><g transform="translate(-150 -4) rotate(170)" opacity="${n2(1 - drain)}">${leaf15(70, 24, "#8FAE5A", "#5E7A2A")}</g>` : "");
  const pk = 1.2 - .5 * mv, px = lerp(PLX, -560, mv), py = lerp(PLY, 260, mv), ang = -28 * tip, ar = ang * Math.PI / 180, hx = px + pk * (-320 + 650 * Math.cos(ar)), hy = py + pk * (650 * Math.sin(ar));
  s += `<g transform="translate(${n2(px)} ${n2(py)}) scale(${n2(pk)}) rotate(${n2(ang)} -320 0)">${plate}</g>`;
  if (t >= tT - .4 && t < tT + 4.8) s += OP(ramp(t, tT - .4, .3) * (1 - ramp(t, tT + 4.4, .3)), TF(hx + 20, hy + 6, .9, hand15({ curl: .75, sleeve: "#E9A23A", sleeveD: "#B4741E" }), 180 + ang))
    + (drain > .01 && drain < 1 ? `<path d="M${PLX - 320} ${PLY - 10} Q${PLX - 380} ${PLY + 120} ${-680} 300" stroke="#9FD0DE" stroke-width="${n2(30 * (1 - drain) + 6)}" fill="none" stroke-linecap="round" opacity=".9"/>${[...Array(6)].map((_, i) => `<circle cx="${-700 + 40 * Math.sin(i * 2)}" cy="${n2(290 - 40 * Math.abs(Math.sin(t * 6 + i)))}" r="9" fill="#BFE7F0"/>`).join("")}` : "");
  // the magnifier into the water: tiny wrigglers hanging at the surface
  if (t >= tWr - .1 && t < tT) { const k = spring(t, tWr - .1, .45) * (1 - ramp(t, tT - .3, .3)); s += OP(k, pline(PLX + 40, PLY - 10, -400, -160, 1, "#2E7AB8")) + TF(-400, -250, k, `<clipPath id="plm"><circle r="150"/></clipPath><g clip-path="url(#plm)"><rect x="-160" y="-160" width="320" height="90" fill="#EAF6FF"/><rect x="-160" y="-70" width="320" height="240" fill="url(#e17WaterUW)"/><path d="M-160 -70 H160" stroke="#fff" stroke-width="8"/>${[-70, 20, 90].map((x, i) => TF(x, -70, .75, wrig17(t, { wig: .15, ph: i, lean: 14 + 6 * i }))).join("")}</g><circle r="150" fill="none" stroke="#2E7AB8" stroke-width="12"/><path d="M106 106 L170 170" stroke="#2E7AB8" stroke-width="20" stroke-linecap="round"/>`) + TF(-170, -330, k, tpill(0, 0, "tiny wrigglers!", 40, "#fff", "#2E7AB8", { w: 700 })); }
  if (t >= tW - .1 && t < tT - .2) s += OP(1 - ramp(t, tT - .5, .3), pline(-160, 260, PLX + 100, PLY - 6, ramp(t, tW - .1, .2), "#2E7AB8") + TF(-160, 270, spring(t, tW - .1, .4), tpill(0, 0, "still water", 46, "#2E7AB8", "#fff", { w: 700 })));
  // the why, as a picture model on the right half: the mosquito loop (no numbers), a water drop by the egg tile (needs still water); its tiles
  // go dim one by one once the water is tipped out (no eggs, no wrigglers, no pupae, no adults)
  const lk = spring(t, tK + 1.6, .5); if (lk > .02) { const dm = [0, 1, 2, 3].map((i) => ss(tD + i * .9, tD + i * .9 + .4, t));
    s += TF(470, 440, .74 * lk, loop4(t, { tiles: [0, 0, 0, 0], back: 0, pics: mPic, title: "THE MOSQUITO'S LIFE CYCLE", drop: tK + 2.2, dim: dm, noTags: ["no eggs", "no wrigglers", "no pupae", "no adults"], id: "pl", stand: false })); }
  // three small life pictures along the bottom: a plate tipped out, a pail turned over, a vase with fresh water
  const life = [[tP1, "tip out the plates", (tt) => `<ellipse cx="0" cy="20" rx="90" ry="22" fill="#C8643E" stroke="#8A3E22" stroke-width="5" transform="rotate(-24)"/><path d="M-80 40 q-20 30 -40 50" stroke="#9FD0DE" stroke-width="10" fill="none" stroke-linecap="round"/>`], [tP2, "turn the pails over", () => TF(0, 70, .55, pailOver17())], [tVa, "change the vase water", (tt) => TF(0, 90, .45, vaseArt17(tt))]];
  life.forEach(([t0, lab, pic], i) => { if (t < t0 - .1) return; const k = spring(t, t0 - .1, .45); s += TF(-640 + i * 300, -170, k * .85, `<g filter="url(#dropS)"><rect x="-150" y="-110" width="300" height="200" rx="20" fill="#FFF8EA" stroke="${P.leaf}" stroke-width="6"/></g><g transform="translate(0 -20)">${pic(t)}</g>` + TF(0, 70, 1, tpill(0, 0, lab, 26, P.leaf, "#fff", { w: 700 })) + TF(130, -96, 1, tickBadge(22))); });
  return s; }

// the dengue picture beside Momo (calm: a child resting in bed, cared for, a thermometer; a mosquito with a ? on its badge: only some carry it)
const denguePic = (t) => `<g filter="url(#drop)"><rect x="-260" y="-190" width="520" height="380" rx="28" fill="url(#gPaper)" stroke="#E3C9A8" stroke-width="6"/></g><rect x="-244" y="-174" width="488" height="250" rx="18" fill="#FCE7CF"/>`
  + `<rect x="-200" y="0" width="360" height="60" rx="14" fill="#8FD3C8" stroke="#4E9A8C" stroke-width="5"/><rect x="-210" y="-60" width="30" height="130" rx="10" fill="#B98A5A"/><ellipse cx="-130" cy="-14" rx="56" ry="26" fill="#fff" stroke="#D9C9A8" stroke-width="4"/>`
  + `<circle cx="-120" cy="-46" r="40" fill="#F2C29B" stroke="#C98F66" stroke-width="4"/><path d="M-152 -70 Q-120 -100 -88 -70" fill="#5A3A22"/><path d="M-134 -46 q6 4 10 0 M-114 -46 q6 4 10 0" stroke="#5A3A22" stroke-width="3" fill="none"/><path d="M-126 -30 q6 4 12 0" stroke="#C98F66" stroke-width="3" fill="none"/><rect x="-110" y="-38" width="44" height="8" rx="4" fill="#fff" stroke="#8C98A8" stroke-width="2" transform="rotate(-20 -110 -38)"/><circle cx="-68" cy="-52" r="5" fill="#E0453A"/>`
  + `<path d="M-90 4 Q20 -30 150 4" fill="#F49BC4" stroke="#C9608E" stroke-width="4"/><g transform="translate(150 -60)"><path d="M0 0 h50 v40 h-50z" fill="#fff" stroke="#8C98A8" stroke-width="3"/><path d="M14 -10 v12" stroke="#8C98A8" stroke-width="3"/></g>`
  + TF(140, 140, .9, mosq17(t, { wing: .2 })) + `<g transform="translate(176 96)"><circle r="16" fill="#E0453A" stroke="#fff" stroke-width="3"/>${T(0, 7, "?", 22, "#fff")}</g>` + TF(-110, 136, 1, tpill(0, 0, "only some carry it", 28, P.ink, "#fff", { w: 700 }));
// the fun-fact pictures (Part 2): a dragonfly nymph underwater among pond weeds; it gobbles up a wriggler
const ffNymph = (t, w, h) => `<rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" fill="url(#e17WaterUW)"/>` + [...Array(5)].map((_, i) => `<path d="M${-w / 2 + 40 + i * 90} ${h / 2} Q${-w / 2 + 70 + i * 90 + 10 * Math.sin(t + i)} 0 ${-w / 2 + 40 + i * 90} ${-h / 2 + 60}" stroke="#4E9A44" stroke-width="10" fill="none"/>`).join("") + TF(0, 30, 1.15, dnymph17(t, {})) + TF(0, 130, 1, tpill(0, 0, "six legs, no wings", 26, "#fff", P.ink, { w: 700 }));
const ffGobble = (t, w, h) => { const tg = MK("ff_gobble") + .4, g = ss(tg, tg + .25, t) * (1 - ss(tg + .45, tg + .7, t)), gone = t >= tg + .45; return `<rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" fill="url(#e17WaterUW)"/><rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="40" fill="#EAF6FF"/>` + TF(-60, 40, 1.05, dnymph17(t, { gulp: g })) + (gone ? TF(40, -10, 1, tpill(0, 0, "gulp!", 30, "#fff", P.ink, { w: 700 })) : TF(110, -h / 2 + 40, .7, wrig17(t, { wig: .3, lean: 30 }))); };
// the dare's two cards (into EP18): the frog's loop and the mosquito's loop with a big = (card 1) or ≠ (card 2)
const twoLoops = (t, sym, id) => `<rect x="-200" y="-140" width="400" height="280" fill="#FFF8EA"/>` + TF(-100, -6, .48, miniLoop(t, frogPic, id + "f", null)) + TF(100, -6, .38, miniLoop4(t, mPic, id + "m", [0, 0, 0, 0], 70)) + signDisc(t, -1, 0, -6, sym, .55) + T(-100, 120, "frog", 26, P.ink) + T(100, 120, "mosquito", 26, P.ink);
// the chant's board: the butterfly loop and the mosquito loop (four tiles each, curved arrows, no numbers) and a tipped plate; each line flashes
const chantBoard = (t, f) => { const p1 = [f[0], f[0] + f[1] * 0, f[0] + f[1], f[0]].map((x) => Math.min(1, x)); let s = `<g filter="url(#drop)"><rect x="-340" y="-420" width="680" height="800" rx="30" fill="url(#gPaper)" stroke="#C9A974" stroke-width="7"/></g>`;
  s += T(-160, -360, "butterfly", 30, P.ink) + T(160, -360, "mosquito", 30, P.ink) + TF(-160, -160, .78, miniLoop4(t, bPic, "cb", [f[0], f[0], Math.max(f[0], f[1]), f[0]], 64)) + TF(160, -160, .78, miniLoop4(t, mPic, "cm", [f[0], f[0], Math.max(f[0], f[1]), f[0]], 64));
  s += TF(0, 250, 1 + .12 * f[2], (f[2] > .05 ? `<circle r="${n2(130 + 20 * f[2])}" fill="${P.sun}" opacity="${n2(.6 * f[2])}"/>` : "") + `<ellipse cx="0" cy="20" rx="140" ry="34" fill="#C8643E" stroke="#8A3E22" stroke-width="6" transform="rotate(-20)"/><path d="M-120 50 q-30 40 -60 60" stroke="#9FD0DE" stroke-width="14" fill="none" stroke-linecap="round"/>` + TF(0, 110, 1, tpill(0, 0, "tip it out", 30, P.leaf, "#fff", { w: 700 })));
  return s; };
