// p2.js: PART 2, "We TESTED Our New Strap. Then We Designed a ZOO Home!": test your design, design a zoo home, keep the great variety.
// Segments 1-15 of p3_ep13_script.md (version 1, 21 Nov 2026; the teacher's go-ahead in its section 12).
// STAGE 2 (drawn, 2026-11-22): the eco-garden, the stand, the goat home, the zoo animals and the dusk boards are in garden13.js, the boards and
// maps in tests.js, the look-closer pictures in closer.js, the journey in shrink.js. (Stage 1 notes below.)
// STAGE 1 (setup): the shared routines are wired (the calm three-picture recap with its labels, game, goals read by Momo, round card, the
// lock-in with its three clue labels on top of the ring, the test's two counters (WEIGHTS: 5 held, WEIGHTS: n counting ON each weight's mark),
// Mark Sentences read by Basil / Momo, the book's strip D3, the board OUR DESIGN PLAN as a functional placeholder (wiped and filled again for
// the goat home), the Showdown's ring, stamp and picks with Basil's zoo map as a functional placeholder (lines light as he reads; the dragonfly
// moves to a green line 4), the full zoo map (functional), chant, score hand, the EP14 dare cards, read-along, "Now you know!"); every scene
// with new art is a phScene placeholder (and each [LOOK CLOSER] an lcPH placeholder inside the real frame). STAGE 2 (Fable) draws them: see
// SCENES_TODO.md.
if (PART === 2) { (() => {
const L1 = "j401";
// the scores (script section 3): Round 1 1 : 1, Showdown 3 : 1
SCORE.push([W("j506", "one") - .1, 1, 1]);
SCORE.push([W("j907", "two") - .1, 3, 1]);
const FOOT = "P3 · Diversity · Theme closure";
const qMark = (t, t0, x, y, r = 50) => t < t0 ? "" : TF(x, y, spring(t, t0, .5) * (1 + .05 * Math.sin(t * 4)), `<g filter="url(#dropS)"><circle r="${r}" fill="url(#gSun)"/></g>${T(0, r * .52, "?", r * 1.56, P.ink)}`);
const weightsRule = (t, t0 = -9) => smallPrint(t, t0, WEIGHTS_RULE);   // "An adult adds the weights." for the whole test (script segment 2)
// how many weights hang on the new strap now (each slides on AT its mark w1..w9; the counter clicks up there)
const nW_unused = (t) => { let n = 0; for (let i = 1; i <= 9; i++) if (TL.marks["w" + i] !== undefined && t >= TL.marks["w" + i]) n = i; return n; };

/* the eco-garden (garden13.js VG): the table with the test stand and the row of weights, the bag with its new strap beside it, the board OUR
   DESIGN PLAN with the card THEN: TEST IT, the three small discs at the lower left. o.n = weights on the new strap; o.stand: false; o.board */
const SX = 470, TYG = GD.ty, BRD = [GD.bx, GD.by, GD.bs], CAM0 = [1, 960, 540], CAMS = [1.3, SX, 640], TSTRAP = [SX + 84, TYG - 230], CREAM = "#FFF6D8";
const things = (t, o = {}) => (o.stand === false ? "" : TF(SX, TYG, .7, stand13({ n: o.n || 0 })) + TF(700, TYG, .8, weightRow(9 - (o.n || 0)))) + (o.bag === false ? "" : `<ellipse cx="960" cy="1014" rx="120" ry="12" fill="${P.ink}" opacity=".18" filter="url(#b4)"/>` + TF(960, 1010, .8, bag13({ strapR: "new", id: "gb" })))
  + (o.board === undefined ? "" : TF(BRD[0], BRD[1], BRD[2], planBoard(t, o.board)));
const V = (t, o = {}, cam) => VG(t, { frog: o.frog, gold: o.gold, items: things(t, o) + (o.items || "") }, cam);
const VD = (t, o = {}) => VG(t, { dim: 1, frog: o.frog, gold: o.gold, items: o.items || "" });
const dPip = (t, o = {}) => buddy("pip", 75, 1064, 126, t, { aura: true, tag: false, ...o }), dBasil = (t, o = {}) => buddy("basil", 200, 1064, 116, t, { aura: true, tag: false, ...o }), dMomo = (t, o = {}) => buddy("momo", 325, 1064, 126, t, { aura: true, tag: false, ...o });
const buds = (t, o = {}) => dPip(t, o.pip) + dBasil(t, o.basil) + dMomo(t, o.momo);
const testCardPic = () => `<g filter="url(#dropS)"><rect x="-100" y="-84" width="200" height="168" rx="20" fill="#FFF8EA" stroke="${P.ink}" stroke-width="5"/></g>${T(0, -22, "THEN:", 38, P.ink, { ls: 2 })}${T(0, 26, "TEST", 46, P.coral, { ls: 2 })}${T(0, 66, "IT", 40, P.coral, { ls: 2 })}`;

/* 1 · "Last time...": three calm pictures from Part 1, one at a time, each >= 2.5 s, centred and large, a gentle push-in, one label each
   (switch on "Fabric" and "But": pic2, pic3). ENGINEERS, DESIGN and INTENDED USE are NOT put on Part 2's shelf: it holds only this part's words. */
SC.lasttime = (t, s) => { const tb = [s.t0, MK("pic2") - .2, MK("pic3") - .2], i = t >= tb[2] ? 2 : t >= tb[1] ? 1 : 0, labs = ["Our design: a school bag", "Fabric straps · a metal zip · a plastic base", "Will the new strap hold?"];
  const z = 1 + .05 * eio((t - tb[i]) / 4), k = ramp(t, tb[i] + .05, .5);
  const pic = i === 0 ? TF(960, 520, 1.06, drawingPic({})) : i === 1 ? TF(960, 520, 1.06, drawingPic({ mat: MATALL, tags: { base: 1, zip: 1, straps: 1, body: 1 }, left: true, fs: 40 }))
    : `<g filter="url(#drop)"><rect x="480" y="200" width="960" height="640" rx="36" fill="url(#gPaper)"/></g>` + TF(820, 790, 1.9, bag13({ strapR: "new", id: "lt" })) + TF(1260, 640, 1.1, testCardPic());
  return bg("stage2") + OP(ramp(t, s.t0, .3), T(960, 110, "Last time…", 60, "#fff", { w: 600 }))
    + OP(k, `<g transform="translate(960 540) scale(${n2(z)}) translate(-960 -540)">${pic}</g>`
      + (i === 2 ? qMark(t, tb[2] + .3, 1130, 330, 60) : "") + TF(960, 960, spring(t, tb[i] + .3, .4), tpill(0, 0, labs[i], 46, "#fff", P.ink, { w: 700 }))) + HUD(t); };

/* 2 · the new place (the school's eco-garden), the game and the hidden frog; 3 · goals (Momo reads) */
SC.place = (t, s) => V(t, { board: {} }, [1.02 + .02 * eio((t - s.t0) / 2), 960, 548]) + buds(t, { pip: { in: s.t0 + .2 }, basil: { in: s.t0 + .35 }, momo: { in: s.t0 + .5 } })
  + lowerPill(60, 96, "The eco-garden of a primary school,", "Singapore") + weightsRule(t, s.t0 + .3);
SC.game = (t, s) => gameScene(t, s, "j201", false) + weightsRule(t);
SC.goals = (t, s) => goals3(t, s, [["Test your design", ""], ["Design a zoo home", ""], ["Keep the great variety", ""]], ["j301", "j302", "j303", "j304"], "momo");

/* 4 · Round 1: how many weights? (clue labels same length · same width · old strap: 5 on top of the ring, kept through the countdown) */
SC.r1card = (t, s) => roundCard(t, s, "ROUND 1");
const r1labels = (t) => { const tq = W(L1, "how") - .1; return t < tq ? "" : ["same length", "same width", "old strap: 5"].map((l, i) => TF(430 + (i - 1) * 175, 470 - RING_R - 14 - (i === 1 ? 50 : 0), spring(t, tq + i * .15, .4), tpill(0, 0, l, 26, "#fff", P.ink, { w: 700 }))).join(""); };
SC.r1 = (t, s) => lockN(t, { cards: ["Fewer than five", "Five", "More than five"], labels: r1labels, q: "How many weights will the new strap hold?", tq: W(L1, "how") - .1, tc: [W(L1, "one", 1), W(L1, "two"), W(L1, "three")], ring0: MK("ring0_r1"), dur: 6, lock: "j402",
  obj: (tt) => `<rect x="300" y="352" width="260" height="14" rx="7" fill="url(#vdSteel)" stroke="#6E7A88" stroke-width="3"/>` + TF(368, 372, 1, oldStrapCard(104, 208, { tag: false })) + newStrap(496, 366, 480, 40) + TF(496, 480, .8, hangerSvg(0, { rod: 60 })) + TF(368, 606, .5, counterPill(5)) + TF(496, 606, .5, counterPill(0)), pre: (tt) => weightsRule(tt),
  picks: [{ who: "momo", id: "j403", word: "2", x: true }, { who: "basil", id: "j404", word: "3" }, { who: "pip", id: "j405", word: "3" }],
  react: [[LE("j403") + .1, "momo", "thinking"], [LE("j404") + .1, "basil", "cheer"], [LE("j405") + .1, "pip", "pointing"]] });

/* 5 · [LOOK CLOSER] the test: the old strap's held picture (torn, WEIGHTS: 5) and the new strap, live: a gloved hand slides a weight on AT each
   number (w1..w9); the counters are wired (lower left inside the window); TEST pops on "test" (lib.js o.at); the verdict; testtick */
SC.lctest = (t, s) => lookCloser(t, s, { tz: s.t0, fx: SX, fy: 800, art: testArt, set: (tt) => V(tt, { board: {}, frog: false }, camL(CAM0, CAMS, eio((tt - s.t0) / 1.0))), verdict: [`TESTED: THE NEW STRAP IS STRONGER`, GOODC], tv: MK("v_test"), over: (tt) => weightsRule(tt) });
/* the answer is three: more than five; Momo surprised, then a nod; coin. WIRED with the cards */
SC.testans = (t, s) => { const L = "j506", tA = W(L, "three") - .1, tOne = W(L, "one") - .1;
  return V(t, { n: 9, board: { } }) + `<rect width="1920" height="1080" fill="${P.night}" opacity=".62"/>`
    + ["Fewer than five", "Five", "More than five"].map((c, i) => TF(760 + i * 300, 420, .5 * spring(t, s.t0 + .1 + i * .08, .4), ansCard(i + 1, c, { w: 430, h: 290, size: 52, lit: i === 2 && t >= tA ? spring(t, tA, .45) : 0 }))).join("")
    + coin(t, tOne, 1690, 300, "+1", "if you showed three fingers")
    + buddy("momo", 330, 1060, 300, t, { aura: true, in: s.t0 + .1, poses: [[s.t0, "surprised"], [tA + 1, "sit"]], jump: [[tA + 1.2, 20]] }) + weightsRule(t) + HUD(t); };

/* 6 · BE THE NEW STRAP (the first-person journey) */
SC.waitw = (t, s) => { const L = "j601", dive = ei((t - (s.t1 - 1.5)) / 1.5), e = eio((t - s.t0) / 1.2), m = Math.max(e * .5, dive), cam = [1 + .22 * e + 3.8 * dive, lerp(960, TSTRAP[0], m), lerp(540, TSTRAP[1], m)], tP = W(L, "be") - .2;
  return V(t, { n: 9, board: {} }, cam) + OP(1 - dive * 1.6, buds(t, { momo: { poses: [[s.t0, "sit"], [tP, "cheer"]] } })
    + (t >= tP ? TF(960, 250, spring(t, tP, .45), tpill(0, 0, "Be the new strap!", 76, P.sun, P.ink, { w: 700 })) : "") + weightsRule(t) + HUD(t)) + wipe(t, s.t1, CREAM, 960, 540); };

/* 7 · the plan again: a goat home. The board OUR DESIGN PLAN is wiped (the bag's five tiles hop off: wipe) and filled again (zfill1..zfill4,
   zglow5; functional placeholder); a small picture card of three goats stands by the board (goatcard) */
const goatCard = (t) => `<path d="M-90 0 V-60 M90 0 V-60" stroke="#8A5A36" stroke-width="12" stroke-linecap="round"/><g filter="url(#dropS)"><rect x="-170" y="-250" width="340" height="200" rx="18" fill="#FFF8EA" stroke="#E3C9A8" stroke-width="6"/></g><rect x="-156" y="-236" width="312" height="172" rx="10" fill="#E7CFA2"/>` + GOATS.map((g, i) => TF(-96 + i * 96, -70, .42 * (i === 1 ? -1 : 1), goatS(t, g), 0, .42)).join("");
SC.zooplan = (t, s) => { const tg = MK("goatcard"), [gx, gd] = slideX(t, tg, .5, -400, 1010, 1010);
  return V(t, { n: 9, bag: false, board: {}, items: (t >= tg ? gd + TF(gx, 1010, 1, goatCard(t)) : "") }, camL([4.6, TSTRAP[0], TSTRAP[1]], CAM0, eo((t - s.t0) / .7))) + qMark(t, MK("zglow5"), BRD[0] + BRD[2] * 300, BRD[1] - BRD[2] * 250, 30)
    + buds(t) + wipe(t, s.t0, CREAM) + HUD(t); };
/* [LOOK CLOSER] a goat home at a zoo in Singapore (a new place, unnamed): the goat pushes the wooden rail: no break; the goats seen between the rails */
SC.lcgoat = (t, s) => lookCloser(t, s, { tz: s.t0, fx: 960, fy: 700, art: goatArt, set: (tt) => VZ(tt), verdict: [`THE FENCE: WOOD · <tspan fill="#fff">STRONG</tspan>`, GOODC, { plain: "THE FENCE: WOOD · STRONG" }], tv: MK("v_goat"),
  over: (tt) => smallPrint(tt, s.t0 + 1.2, GOAT_RULE) + OP(ramp(tt, s.t0 + 1.4, .4), TF(300, 1012, 1, tpill(0, 0, "A zoo in Singapore", 32, "#fff", P.ink, { w: 700 }))) });
/* back in the garden: the wood tile hops onto the last box (woodtile: five ticks); Basil: "Not glass!" with the picture card of the pen with a
   glass wall and the blue tag NOT FOR THIS JOB on it (glasstag). WIRED with the placeholder board and card */
const glassPen = (t) => `<g filter="url(#drop)"><rect x="-216" y="-146" width="432" height="292" rx="22" fill="#FFF8EA" stroke="#E3C9A8" stroke-width="6"/></g><clipPath id="gpc"><rect x="-198" y="-128" width="396" height="256" rx="12"/></clipPath><g clip-path="url(#gpc)"><rect x="-198" y="-128" width="396" height="256" fill="#BFE6FF"/><rect x="-198" y="-10" width="396" height="140" fill="#E7CFA2"/>${TF(-60, 96, .62, goatS(t, GOATS[0]))}${TF(110, 80, -.5, goatS(t, GOATS[1]), 0, .5)}
  <rect x="-190" y="-40" width="380" height="150" fill="#DDF4FF" opacity=".55" stroke="#7FB4D6" stroke-width="6"/><path d="M-150 -20 L-90 90 M-110 -20 L-70 50 M70 -20 L130 90" stroke="#fff" stroke-width="9" opacity=".7" stroke-linecap="round"/><rect x="-198" y="-48" width="16" height="170" fill="#8E9AA8"/><rect x="182" y="-48" width="16" height="170" fill="#8E9AA8"/><rect x="-8" y="-48" width="16" height="170" fill="#8E9AA8"/></g>`;
SC.notglass = (t, s) => { const tg = MK("glasstag"), hb = HAS("j706");
  return V(t, { n: 9, bag: false, board: {} }) + `<rect width="1920" height="1080" fill="${P.night}" opacity=".5"/>` + TF(BRD[0], BRD[1], BRD[2], planBoard(t))
    + (t >= tg - .4 ? TF(960, 420, spring(t, tg - .4, .45), glassPen(t) + T(0, -176, "a glass wall?", 40, "#fff") + (t >= tg ? TF(0, 150, spring(t, tg, .4), jobTag(t, 1, 28)) : "")) : "")
    + buddy("basil", 300, 1060, 280, t, { aura: true, in: s.t0 + .1, poses: [[s.t0, "sit"]], jump: hb ? [[LE("j706") + .05, 20]] : [] }) + (hb ? say("j706", 400, 640, t, { size: 40, tail: -60, maxW: 480 }) : "") + HUD(t); };

/* 8 · Mark Sentence 1 (Basil): 3.30 item 3, both sentences; under the card, small and silent: the chapter's map of p. 70 (chapterMap, placeholder) */
SC.mark1 = (t, s) => markScene(t, s, { id: "j802", sayId: "j801", who: "basil", n: "1 of 2", text: "The physical properties of a material allow it to be used in certain ways. It is important to choose a material whose physical property is suitable for the intended use of the object.", keys: ["physical", "properties", "property", "suitable", "intended", "use"], size: 54, y: 200, footer: FOOT,
  under: TF(1180, 992, .8, chapterMap()) });

/* 9 · Showdown: Basil's zoo map (double points). WIRED: the easel MY ZOO as a functional placeholder (each line lights as Basil reads it; the
   three lines stay through the countdown), the YOU ring with a counting hand (6 s), LOCKED IN!, the picks Pip 2, Momo 2; Basil oops */
const mapLit = (t) => { const L = "j902", ws = ["one", "two", "three"].map((w) => TL.lines[L].words.some((x) => norm(x.w) === w) ? W(L, w) : 1e9), r0 = MK("ring0_show");
  return [0, 1, 2].map((i) => { const a = ws[i], b = i < 2 ? ws[i + 1] : LE(L); return t >= a - .1 && t < Math.min(b, LE(L) + .2) ? 1 : t >= r0 && t < MK("bell_show") ? .45 : 0; }); };
const EAS = [800, 1020, .78];
SC.show = (t, s) => { const r0 = MK("ring0_show"), bell = MK("bell_show"), rs = ringState(t, r0, 6), tS = LT("j904") - .08, R = [1600, 330];
  const picks = [["pip", "j905", "2", 1450], ["momo", "j906", "2", 1740]];
  return VD(t) + TF(EAS[0], EAS[1], EAS[2], zooEasel(t, { lit: mapLit(t) }))
    + (t >= LT("j903") ? TF(R[0], R[1], spring(t, LT("j903"), .4), `<g transform="scale(.6)">${ringTimer(0, 0, t < r0 ? 1 : t < bell ? rs.frac : 0, t < r0 ? 6 : t < bell ? rs.secs : 0, t, { tick: rs.tick, shut: pulse(t, bell, .01, .6), inner: TF(0, 0, .85, `<g filter="url(#dropS)">${countHand(3)}</g>`) })}</g>` + youPill(-150, -130, .9)) : "")
    + buddy("basil", 160, 1060, 220, t, { aura: true, in: s.t0 + .1, poses: [[s.t0, "cheer"], [LT("j902") - .12, "sit"], [LE("j902") + .2, "cheer"], [LT("j905") - .1, "oops"]] }) + say("j902", 560, 330, t, { size: 36, tail: -300, maxW: 780 })
    + picks.map(([w, id, n, x]) => buddy(w, x, 1060, 210, t, { aura: true, in: r0 - .3, poses: [[r0 - .3, "thinking"], [LT(id) - .12, "sit"], [LE(id) + .1, w === "pip" ? "pointing" : "cheer"]], flip: true }) + (t > r0 ? pickNum(w, x - 120, 900, t, LT(id) - .1, n) : "") + say(id, 1560, 640, t, { size: 36, maxW: 520, tail: x - 1560 })).join("")
    + stamp(t, tS, 960, 300) + bellIcon(t, r0) + HUD(t); };
/* the fix: the dragonfly's drawing hops down off line 2 onto a new fourth line written in green (dfly); +2; Basil surprised, then cheer (j908, cuttable "wings") */
SC.fix = (t, s) => { const d = MK("dfly"), fix = ss(d, d + .8, t), hb = HAS("j908");
  return VD(t) + TF(EAS[0], EAS[1], EAS[2], zooEasel(t, { fix, lit: [0, fix * .6 * (1 - ss(d + 1.5, d + 2.2, t)), 0] })) + coin(t, W("j907", "two") - .1, 1560, 520, "+2", "line 2")
    + buddy("basil", 160, 1060, 220, t, { aura: true, in: s.t0 + .05, poses: [[s.t0, "surprised"], [hb ? LE("j908") + .2 : s.t0 + 3, "cheer"]] }) + (hb ? say("j908", 520, 330, t, { size: 40, tail: -300, maxW: 600 }) : "") + HUD(t); };

/* 10 · a great variety: the full zoo map (zones: six zones pop, functional placeholder); the question D3 on a cream strip; DIVERSITY pops (lib.js o.at) */
SC.zoomap = (t, s) => { const L = "j1002";
  return VD(t) + TF(960, 940, .7, zooMap(t, { pop: MK("zones") }))
    + bookCaption(t, L, "Why is it important to maintain diversity?", 220, { size: 50, keys: ["maintain", "diversity?"] }) + HUD(t); };
/* Mark Sentence 2 (Momo): 1.22; EXTINCT pops after the last word (lib.js o.at); under the card the zoo map (nothing disappears); on Heart's
   "So we take care of every kind." (j1005) a soft glow runs round all twelve animals (glowall) */
SC.mark2 = (t, s) => markScene(t, s, { id: "j1004", sayId: "j1003", who: "momo", n: "2 of 2", text: "Living things that are not able to survive will become extinct. This means that they will all die out.", keys: ["not", "able", "to", "survive", "extinct."], size: 60, y: 220, footer: FOOT,
  under: TF(860, 1034, .3, zooMap(t, { glow: TL.marks.glowall !== undefined ? ss(MK("glowall") - .1, MK("glowall") + .5, t) : 0 })) });

/* 11 · the chant: call and response (common.js chantScene); the board OUR DESIGN PLAN behind the buddies, its parts flashing on their lines
   (planBoard({flash}), placeholder at the lower left; Stage 2: the drawn board, centred and big enough to read) */
SC.chant = (t, s) => chantScene(t, s, "c1003", { sayId: "u1002", x: 1210, size: 50, board: (tt, flash) => TF(410, 650, .4, planBoard(tt, { flash })) });

/* 12 · score hand, the frog (lizReveal in common.js) */
SC.final = (t, s) => { const L = "j1201"; return finalScene(t, s, L, 1, [[s.t0, null, 1], [W(L, "three") - .1, null, 3]]); };
SC.liz = (t, s) => { const L = "j1202", tq = W(L, "it") - .1, th = s.t0 + 2.3, u = clamp((t - th) / .5), sq = pulse(t, th, .25, .1) * (t < th ? 1 : 0) + (u >= 1 ? .6 * pulse(t, th + .5, .01, .3) : 0);
  const fx = lerp(FROG[0], FROG2[0], u), fy = lerp(FROG[1], FROG2[1], u) - 70 * Math.sin(Math.PI * u);
  return lizReveal(t, s, L, V(t, { n: 9, bag: false, board: {}, frog: { x: fx, y: fy, sq, puff: t < th - .3 ? (.5 + .5 * Math.sin(t * 9)) : 0 } }) + (u >= 1 ? `<ellipse cx="${FROG2[0]}" cy="${FROG2[1] + 6}" rx="${n2(30 + 90 * clamp((t - th - .5) / .6))}" ry="${n2(6 + 16 * clamp((t - th - .5) / .6))}" fill="none" stroke="#fff" stroke-width="4" opacity="${n2(1 - clamp((t - th - .5) / .6))}"/>` : ""), lerp(FROG[0], FROG2[0], u), lerp(FROG[1], FROG2[1], u) - 26, tq, "It was on the lily pad in the pond!", -150, -190, 62, 1.9); };

/* 13 · the dare for Episode 14: the Sun. The three cards, the ?, the banner and "Lock in your answer!" are wired; Stage 2 draws the three boards */
const DRX = [700, 1080, 1460];
SC.dare = (t, s) => { const a = "j1301", tQ = W(a, "why") - .15, tc = [W(a, "one") - .1, W(a, "two") - .1, W(a, "three") - .1], tL = W(a, "lock") - .1, hb = HAS("j1302");
  const boards = [0, 1, 2].map((i) => { const t0 = s.t0 + .5 + i * .3; if (t < t0) return ""; const [x, d] = slideX(t, t0, .7, 2500, DRX[i], 1016); return d + picBoard(NEXT_PICS[i], x, 1016, 1, { sc: 1, id: "nx" + i }); }).join("");
  return VD(t, { gold: ramp(t, s.t0, 1.5) }) + boards
    + NEXT_CARDS.map((txt, i) => TF(DRX[i], 560, .5 * spring(t, tc[i], .45), ansCard(i + 1, txt, { w: 430, h: 290, size: 50, pulse: Math.max(pulse(t, tc[i], .04, .6), t >= tL ? (Math.floor((t - tL) / .5) % 3 === i ? .8 : 0) : 0) }))).join("")
    + TF(960, 150, spring(t, s.t0 + .2, .45), tpill(0, 0, "NEXT · Why does the Sun come back?", 50, P.ink, P.sun, { w: 700 }))
    + qMark(t, tQ, 1080, 380, 46) + (t >= tL ? TF(1080, 262, spring(t, tL, .45), tpill(0, 0, "Lock in your answer!", 40, P.sun, P.ink, { w: 700 })) : "") + finePrint(t, s.t0 + 1.4, "Never look at the Sun.", 1700, 1046)
    + buddy("basil", 200, 1060, 230, t, { aura: true, in: s.t0 + .1, poses: hb ? [[s.t0, "cheer"], [LT("j1302") - .12, "sit"]] : [[s.t0, "sit"], [tL, "cheer"]], nohop: true }) + (hb ? say("j1302", 300, 660, t, { size: 38, tail: -80, maxW: 400 }) : "") + HUD(t); };

/* 15 · "Now you know!": the board OUR DESIGN PLAN, complete and ticked, with the ticked card THEN: TEST IT, centred between the buddies */
SC.nyk = (t, s) => nykScene(t, s, TF(720, 1040, .4, planBoard(t)), { bx: [200, 1715, 1375], hx: 470 });
})(); }
