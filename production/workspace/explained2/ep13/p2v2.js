// p2v2.js: EP13 PART 2, the teacher's-eye redo (22 Nov 2026), the same rules as p1v2.js (see its header): buddies 1.5x and spread; the
// camera on what is talked about; look-closers with a peeking, reacting buddy face; OUR DESIGN PLAN at ONE home (top right in the
// eco-garden) that only glides; countdowns take the stage; ONE set of big numbered picture cards; the hidden frog pushed into a black-ringed
// circle on the blue stage; the buddies ride along in the journey; a fun fact at the reveal. Every word, mark and sound cue kept.
if (PART === 2) { (() => {
const { L3, nodAt, poses, peek, bigRing, stampHold, clue, circleShot, animalLabel, picCard, popSpark } = V2;
const L1 = "j401", FOOT = "P3 · Diversity · Theme closure", CAM0 = [1, 960, 540], CREAM = "#FFF6D8", TYG = GD.ty;
const HOME = [1380, 600, .5], BIGB = [960, 900, .78];
const brdAt = (t, p, o = {}) => TF(p[0], p[1], p[2], planBoard(t, o));
const weightsRule = (t, t0 = -9) => smallPrint(t, t0, WEIGHTS_RULE);
const qMark = (t, t0, x, y, r = 50) => t < t0 ? "" : TF(x, y, spring(t, t0, .5) * (1 + .05 * Math.sin(t * 4)), `<g filter="url(#dropS)"><circle r="${r}" fill="url(#gSun)"/></g>${T(0, r * .52, "?", r * 1.56, P.ink)}`);
/* the eco-garden: the test stand on the table (left), the row of weights beside it, the board at HOME (top right); the pond and the frog
   (front right) always clear of the buddies */
const SX = 420, CAMS = [1.3, SX, 640], TSTRAP = [SX + 84, TYG - 230];
const things = (t, o = {}) => (o.stand === false ? "" : TF(SX, TYG, .7, stand13({ n: o.n || 0 })) + TF(655, TYG, .7, weightRow(9 - (o.n || 0)))) + (o.board === undefined ? "" : brdAt(t, o.boardP || HOME, o.board));
const V = (t, o = {}, cam) => VG(t, { frog: o.frog, gold: o.gold, items: things(t, o) + (o.items || "") }, cam);
const VD = (t, o = {}, a = .55) => V(t, o) + `<rect width="1920" height="1080" fill="${P.night}" opacity="${a}"/>`;
const SL = { L: [200, 320, false], M: [960, 360, false], C: [1310, 350, true] };
const bud = (who, slot, t, o = {}) => buddy(who, SL[slot][0], 1062, o.h || SL[slot][1], t, { aura: true, flip: SL[slot][2], ...o });
const testCardPic = () => `<g filter="url(#dropS)"><rect x="-100" y="-84" width="200" height="168" rx="20" fill="#FFF8EA" stroke="${P.ink}" stroke-width="5"/></g>${T(0, -22, "THEN:", 38, P.ink, { ls: 2 })}${T(0, 26, "TEST", 46, P.coral, { ls: 2 })}${T(0, 66, "IT", 40, P.coral, { ls: 2 })}`;

/* 1 · "Last time…": three calm pictures (the drawing is colour-coded part by part, as in Part 1) */
SC.lasttime = (t, s) => { const tb = [s.t0, MK("pic2") - .2, MK("pic3") - .2], i = t >= tb[2] ? 2 : t >= tb[1] ? 1 : 0, labs = ["Our design: a school bag", "Fabric straps · a metal zip · a plastic base", "Will the new strap hold?"];
  const z = 1 + .05 * eio((t - tb[i]) / 4), k = ramp(t, tb[i] + .05, .5);
  const pic = i === 0 ? TF(960, 520, 1.06, drawingPic({ cc: true })) : i === 1 ? TF(960, 520, 1.06, drawingPic({ mat: MATALL, tags: { base: 1, zip: 1, straps: 1, body: 1 }, left: true, fs: 40, cc: true }))
    : `<g filter="url(#drop)"><rect x="480" y="200" width="960" height="640" rx="36" fill="url(#gPaper)"/></g>` + TF(820, 790, 1.9, bag13({ strapR: "new", id: "lt" })) + TF(1260, 640, 1.1, testCardPic());
  return bg("stage2") + OP(ramp(t, s.t0, .3), T(960, 110, "Last time…", 60, "#fff", { w: 600 }))
    + OP(k, `<g transform="translate(960 540) scale(${n2(z)}) translate(-960 -540)">${pic}</g>` + (i === 2 ? qMark(t, tb[2] + .3, 1130, 330, 60) : "") + TF(960, 960, spring(t, tb[i] + .3, .4), tpill(0, 0, labs[i], 46, "#fff", P.ink, { w: 700 })))
    + buddy("momo", 1720, 1062, 330, t, { aura: true, flip: true, in: s.t0 + .6, poses: poses([s.t0, "thinking"], [tb[1], "pointing"], [tb[2], "surprised"], [tb[2] + 1.4, "thinking"]) }) + HUD(t); };

/* 2 · the eco-garden (a brief wide shot), the buddies pop in big; the game: ONE push-in onto the frog, the black-ringed circle on the stage */
const allBuds = (t, tin, o = {}) => bud("basil", "L", t, { in: tin, poses: poses([tin, "cheer"], [tin + 1.6, "sit"], o.basil) }) + bud("pip", "M", t, { in: tin + .15, poses: poses([tin + .15, "waving"], [tin + 1.6, "sit"], o.pip), wave: true })
  + bud("momo", "C", t, { in: tin + .3, poses: poses([tin + .3, "waving"], [tin + 1.7, "sit"], o.momo), wave: true });
SC.place = (t, s) => V(t, { board: {} }, [1.02 + .02 * eio((t - s.t0) / 2), 960, 548]) + allBuds(t, s.t0 + .2) + lowerPill(60, 96, "The eco-garden of a primary school,", "Singapore") + weightsRule(t, s.t0 + .3);
const GC = { T: [1450, 400], r: 178, Z: 3.4 };
SC.game = (t, s) => { const L = "j201", tLock = W(L, "lock"), tC = W(L, HIDDEN[0]), tFind = W(L, "spot"), tz = s.t0 + .05, dz = 1.2, u = eio((t - tz) / dz), kc = clamp((t - (tz + dz - .25)) / .6), tP = tz + dz + .3;
  let out = circleShot(V(t, { board: {} }), u, [FROG[0], FROG[1] - 18], GC.T, GC.Z, GC.r, kc, "f");
  const gone = clamp((t - s.t0) / .3); if (gone < 1) out += OP(1 - gone, TF(0, 60 * gone, 1, allBuds(t, -9)));
  const k0 = eio((t - (s.t0 + .1)) / .55); out += scoreboard(t, lerp(1640, 960, k0), lerp(70, 180, k0), lerp(.62, 1.3, k0), { you: 0, bud: 0 });
  const tH = Math.max(tLock - .15, tP), bob = 8 * Math.sin(t * 5);
  out += TF(560, 600 + bob, spring(t, tH, .5), `<g transform="scale(.8)">${ringTimer(0, 0, clamp(1 - (t - tLock) / 3), 5, t)}</g>` + TF(0, 0, .95, `<g filter="url(#dropS)">${countHand(t > tLock + .7 ? 3 : t > tLock + .35 ? 2 : 1)}</g>`)) + popSpark(t, tH, 560, 600, 250)
    + (t >= tH ? TF(560, 920, spring(t, tH + .1, .4), tpill(0, 0, "You lock in first", 44, "#fff", P.ink, { w: 700 })) + youPill(560, 360, 1.2 * spring(t, tH + .05, .4)) : "");
  out += animalLabel(t, tC - .1, GC.T[0], GC.T[1] - GC.r - 62) + (t >= tFind - .1 ? TF(GC.T[0], GC.T[1] + GC.r + 64, spring(t, tFind - .1, .4), tpill(0, 0, "Can you spot it?", 42, P.ink, P.sun, { w: 700 })) : "");
  [["basil", 1150, false], ["momo", 1690, true]].forEach(([w, x, fl], i) => { out += buddy(w, x, 1066, 330, t, { aura: true, in: tP + .15 + i * .12, flip: fl, poses: poses([s.t0, "cheer"], [tP + 1.6, "sit"], [tC - .1, "surprised"], [tFind, "cheer"], [tFind + 1.4, "sit"]), wave: true }); });
  return out + weightsRule(t) + logo(t); };
SC.goals = (t, s) => goals3(t, s, [["Test your design", ""], ["Design a zoo home", ""], ["Keep the great variety", ""]], ["j301", "j302", "j303", "j304"], "momo", { xs: [810, 1230, 1650], sc: .82, bx: 300, bh: 400, y: 600 });

/* 4 · Round 1: the countdown takes the stage. Left: the ring, big (the old strap's picture and the new strap, the two counters), the three clues
   ON its frame; right: ONE set of big numbered cards, each drawing the weights big (fewer than five · five · more than five) */
const wStack = (n, more) => { let s = `<path d="M0 -150 V${-150 + 40}" stroke="#5E6B7C" stroke-width="6"/><rect x="-60" y="-112" width="120" height="10" rx="5" fill="#7C8898" stroke="#4A5564" stroke-width="3"/>`;
  for (let i = 0; i < n; i++) s += TF(0, -96 + i * 22, 1.6, weightDisc()); return TF(0, 20, 1.35, s + (more ? TF(0, -96 + n * 22 + 26, 1, T(0, 20, "…", 60, P.ink)) : "")); };
const WPIC = [wStack(3), wStack(5), wStack(8, true)], WTXT = ["Fewer than five", "Five", "More than five"];
const R1X = 500, R1Y = 520, R1S = 1.2, CX3 = [1080, 1400, 1720], CY3 = 470;
SC.r1 = (t, s) => { const tq = W(L1, "how") - .1, tc = [W(L1, "one", 1), W(L1, "two"), W(L1, "three")], r0 = MK("ring0_r1"), dur = 6, bell = r0 + dur, lockE = LE("j402"), rs = ringState(t, r0, dur);
  const tin2 = bell + .15, zb = ss(bell + .1, bell + .6, t), up = lerp(0, -70, zb), gs = lerp(1, .9, zb);
  const inner = `<circle r="172" fill="url(#mSky)"/>` + TF(-430, -470, 1, `<rect x="300" y="352" width="260" height="14" rx="7" fill="url(#vdSteel)" stroke="#6E7A88" stroke-width="3"/>` + TF(368, 372, 1, oldStrapCard(104, 208, { tag: false })) + newStrap(496, 366, 480, 40) + TF(496, 480, .8, hangerSvg(0, { rod: 60 })) + TF(368, 606, .5, counterPill(5)) + TF(496, 606, .5, counterPill(0)));
  let main = bigRing(t, R1X, R1Y, R1S, r0, dur, inner) + clue(t, tq + .1, R1X - 230, R1Y - 300, "same length", 52) + clue(t, tq + .25, R1X + 160, R1Y - 300, "same width", 52) + clue(t, tq + .4, R1X - 250, R1Y - 190, "old strap: 5", 52);
  [0, 1, 2].forEach((i) => { const k = spring(t, tc[i] - .08, .45); if (k < .02) return; const step = t >= r0 && t < bell ? (Math.floor((t - r0) * 2) % 3 === i ? 1 : 0) : 0;
    main += TF(CX3[i], CY3, k * .92, picCard(i + 1, WPIC[i], WTXT[i], { size: 44, pulse: Math.max(step * (.5 + rs.tick), pulse(t, tc[i], .04, .5)) })); });
  let out = bg("stage") + `<g transform="translate(960 ${n2(540 + up)}) scale(${n2(gs)}) translate(-960 -540)">${main}</g>`;
  out += OP(ramp(t, tq, .3), T(960, 100, "How many weights will the new strap hold?", 50, "#fff", { w: 600 })) + OP(ramp(t, r0 - .15, .2) * (1 - zb) * (t < bell ? .75 + .25 * Math.sin(t * 9) : 1), T(960, 160, "LOCK IT IN!", 42, P.sun, { ls: 8 }));
  out += `<rect y="820" width="1920" height="260" fill="url(#xFloor)"/>`;
  { const nf = t >= tc[2] - .1 ? 3 : t >= tc[1] - .1 ? 2 : 1, cyc = t >= r0 && t < bell ? 1 + (Math.floor((t - r0) * 2) % 3) : nf, a = ramp(t, tc[0] - .15, .25) * (1 - ramp(t, bell + .1, .25));
    out += OP(a, TF(170, 905 - 14 * rs.tick, .82 * (1 + .1 * pulse(t, tc[nf - 1], .03, .3)), `<g filter="url(#dropS)">${countHand(cyc)}</g>`) + youPill(170, 690, 1.15) + tpill(400, 1010, "1, 2 or 3 fingers", 34, P.ink, "#fff")); }
  out += OP(ramp(t, tq + .5, .3) * (1 - ss(r0 - .3, r0, t)), pill(960, 750, 470, 48, "#120E2E", "The buddies lock in after you", 27, "#DDD3FF", { w: 500, ls: 1 }));
  const secJ = []; for (let b = 0; b < dur; b++) secJ.push([r0 + b, 12]);
  const tM = LT("j403"), tB = LT("j404"), tPp = LT("j405");
  const B = { momo: [lerp(1360, 990, ss(bell + .1, bell + .7, t)), s.t0 + .3, poses([s.t0 + .3, "thinking"], [r0 - .1, "thinking"], [bell, "surprised"], [tM - .12, "sit"], [LE("j403") + .1, "cheer"], [tB + .3, "thinking"], [tPp + .1, "surprised"])],
    basil: [360, tin2, poses([tin2, "arms_crossed"], [tB - .12, "sit"], [LE("j404") + .1, "cheer"], [tM + .2, "surprised"])],
    pip: [1660, tin2 + .12, poses([tin2 + .12, "thinking"], [tPp - .12, "sit"], [LE("j405") + .1, "pointing"], [tB + .3, "thinking"])] };
  const picks = { momo: ["j403", "2"], basil: ["j404", "3"], pip: ["j405", "3"] };
  let buds = "", cards = "", bubs = "";
  ["basil", "momo", "pip"].forEach((who) => { const [x, tin, ps] = B[who], hh = 340, look = who === "momo" && t >= r0 && t < bell ? -6 * Math.sin((t - r0) * Math.PI * 2) : 0;
    buds += buddy(who, x, 1066, hh, t, { aura: true, auraO: .9, flip: who === "pip", in: tin, poses: ps, look, jump: who === "momo" ? secJ : [], nohop: who === "momo" && t < bell });
    if (t > tin + .2) cards += pickNum(who, x + hh * .62 * (who === "pip" ? -1 : 1), 1066 - hh * .32, t, LT(picks[who][0]) - .1, picks[who][1]);
    bubs += say(picks[who][0], x + (who === "pip" ? -120 : who === "basil" ? 60 : 0), 1066 - hh - 120, t, { x: who === "momo", tail: who === "pip" ? 120 : who === "basil" ? -60 : 0, maxW: 560, size: 42 }); });
  return out + buds + cards + bubs + weightsRule(t) + stampHold(t, bell, lockE + .15, 960, 470, "LOCKED IN!") + bellIcon(t, r0, 1180, 160) + HUD(t); };

/* 5 · [LOOK CLOSER] the test (the approved frame): Momo's face peeks in (she said "A strap is a strap!") and gasps as the new strap passes five */
SC.lctest = (t, s) => { const tv = MK("v_test");
  return lookCloser(t, s, { tz: s.t0, fx: SX, fy: 800, art: testArt, set: (tt) => V(tt, { board: {}, frog: false }, camL(CAM0, CAMS, eio((tt - s.t0) / 1.0))), verdict: [`TESTED: THE NEW STRAP IS STRONGER`, GOODC, { vx: 1080 }], tv, over: (tt) => weightsRule(tt),
    top: (tt) => peek(tt, "momo", s.t0 + 1.4, s.t1 + 1, poses([s.t0, "thinking"], [MK("w5") + .1, "surprised"], [MK("link5") + .3, "thinking"], [MK("w6") + .05, "surprised"], [MK("w9") + .1, "surprised"], [MK("lens9") + .3, "cheer"], [MK("kw_test"), "pointing"], [tv, "cheer"]), { h: 430, dx: 160, nods: [[MK("side") + .2, 1.2, 6], [tv + .1, 1.6, 6]] }) }); };
/* the answer: ONE set of big numbered cards, card 3 lit; Momo big (she was wrong: surprised, then a good-sport nod); the coin clear of the shelf */
SC.testans = (t, s) => { const L = "j506", tA = W(L, "three") - .1, tOne = W(L, "one") - .1;
  return VD(t, { n: 9, board: {} }, .62) + [0, 1, 2].map((i) => TF(800 + i * 380, 470, 1.0 * spring(t, s.t0 + .05 + i * .08, .4), picCard(i + 1, WPIC[i], WTXT[i], { size: 44, lit: i === 2 && t >= tA ? spring(t, tA, .45) : 0 }))).join("")
    + coin(t, tOne, 1180, 860, "+1", "if you showed three fingers")
    + buddy("momo", 300, 1062, 420, t, { aura: true, in: s.t0 + .1, poses: poses([s.t0, "surprised"], [tA + .1, "oops"], [tA + 1.3, "cheer"]), jump: [[tA + 1.4, 20]], look: nodAt(t, tA + 1.5, 1.2, 5) }) + weightsRule(t) + HUD(t); };

/* 6 · BE THE NEW STRAP: the glide (the buddies come along: shrink.js) */
SC.waitw = (t, s) => { const L = "j601", dive = ei((t - (s.t1 - 1.5)) / 1.5), e = eio((t - s.t0) / 1.2), m = Math.max(e * .5, dive), cam = [1 + .22 * e + 3.8 * dive, lerp(960, TSTRAP[0], m), lerp(540, TSTRAP[1], m)], tP = W(L, "be") - .2;
  return V(t, { n: 9, board: {} }, cam) + OP(1 - dive * 1.6, bud("momo", "M", t, { poses: [[s.t0, "sit"], [tP, "cheer"]] }) + bud("pip", "C", t, { poses: [[s.t0, "sit"], [tP + .15, "surprised"], [tP + 1.1, "cheer"]] })
    + (t >= tP ? TF(760, 250, spring(t, tP, .45), tpill(0, 0, "Be the new strap!", 76, P.sun, P.ink, { w: 700 })) : "") + weightsRule(t) + HUD(t)) + wipe(t, s.t1, CREAM, 960, 540); };

/* 7 · the plan again, for a goat home: the camera goes to OUR DESIGN PLAN (it glides from its home to the middle, big), it is wiped and filled
   again; the goats' picture card stands at the right; then it glides home */
const goatCard = (t) => `<path d="M-90 0 V-60 M90 0 V-60" stroke="#8A5A36" stroke-width="12" stroke-linecap="round"/><g filter="url(#dropS)"><rect x="-170" y="-250" width="340" height="200" rx="18" fill="#FFF8EA" stroke="#E3C9A8" stroke-width="6"/></g><rect x="-156" y="-236" width="312" height="172" rx="10" fill="#E7CFA2"/>` + GOATS.map((g, i) => TF(-96 + i * 96, -70, .42 * (i === 1 ? -1 : 1), goatS(t, g), 0, .42)).join("") + T(0, -268, "goats", 40, P.ink);
SC.zooplan = (t, s) => { const tg = MK("goatcard"), [gx, gd] = slideX(t, tg, .5, 2300, 1690, 950), gi = eio((t - (s.t0 + .9)) / 1.0), go = eio((t - (s.t1 - 1.0)) / .9), p = L3(L3(HOME, BIGB, gi), HOME, go);
  return V(t, { n: 9, items: (t >= tg ? gd + TF(gx, 950, .95, goatCard(t)) : "") }, camL([4.6, TSTRAP[0], TSTRAP[1]], CAM0, eo((t - s.t0) / .7))) + `<rect width="1920" height="1080" fill="${P.night}" opacity="${n2(.4 * gi * (1 - go))}"/>` + brdAt(t, p, {})
    + qMark(t, MK("zglow5"), p[0] + p[2] * 600, p[1] - p[2] * 690, 40)
    + bud("momo", "L", t, { h: 400, poses: poses([s.t0, "back"], [s.t0 + 1.8, "pointing"], [tg + .1, "surprised"], [MK("zfill1") + .1, "cheer"], [MK("zfill4"), "thinking"]), look: nodAt(t, MK("zfill2"), 1.2, 5) }) + wipe(t, s.t0, CREAM) + HUD(t); };
/* [LOOK CLOSER] the goat home (the zoo, unnamed); Basil's face peeks in (it is his "Not glass!" next) */
SC.lcgoat = (t, s) => { const tv = MK("v_goat");
  return lookCloser(t, s, { tz: s.t0, fx: 960, fy: 700, art: goatArt, set: (tt) => VZ(tt), verdict: [`THE FENCE: WOOD · <tspan fill="#fff">STRONG</tspan>`, GOODC, { plain: "THE FENCE: WOOD · STRONG", vx: 1080 }], tv,
    over: (tt) => smallPrint(tt, s.t0 + 1.2, GOAT_RULE) + OP(ramp(tt, s.t0 + 1.4, .4) * (1 - ramp(tt, tv - .35, .3)), TF(1580, 1012, 1, tpill(0, 0, "A zoo in Singapore", 32, "#fff", P.ink, { w: 700 }))),
    top: (tt) => peek(tt, "basil", s.t0 + 1.4, s.t1 + 1, poses([s.t0, "arms_crossed"], [MK("goatwalk") + .3, "sit"], [MK("push1") + .1, "surprised"], [MK("push2") + .1, "surprised"], [MK("strongchip"), "cheer"], [MK("glide") + .4, "sit"], [MK("seegoats"), "cheer"]), { nods: [[MK("strongchip") + .1, 1.2, 6], [tv + .1, 1.6, 6]] }) }); };
const glassPen = (t) => `<g filter="url(#drop)"><rect x="-216" y="-146" width="432" height="292" rx="22" fill="#FFF8EA" stroke="#E3C9A8" stroke-width="6"/></g><clipPath id="gpc2"><rect x="-198" y="-128" width="396" height="256" rx="12"/></clipPath><g clip-path="url(#gpc2)"><rect x="-198" y="-128" width="396" height="256" fill="#BFE6FF"/><rect x="-198" y="-10" width="396" height="140" fill="#E7CFA2"/>${TF(-60, 96, .62, goatS(t, GOATS[0]))}${TF(110, 80, -.5, goatS(t, GOATS[1]), 0, .5)}
  <rect x="-190" y="-40" width="380" height="150" fill="#DDF4FF" opacity=".55" stroke="#7FB4D6" stroke-width="6"/><path d="M-150 -20 L-90 90 M-110 -20 L-70 50 M70 -20 L130 90" stroke="#fff" stroke-width="9" opacity=".7" stroke-linecap="round"/><rect x="-198" y="-48" width="16" height="170" fill="#8E9AA8"/><rect x="182" y="-48" width="16" height="170" fill="#8E9AA8"/><rect x="-8" y="-48" width="16" height="170" fill="#8E9AA8"/></g>`;
SC.notglass = (t, s) => { const tg = MK("glasstag"), hb = HAS("j706");
  return VD(t, { n: 9, board: {} }, .45) + (t >= tg - .4 ? TF(560, 430, 1.05 * spring(t, tg - .4, .45), glassPen(t) + T(0, -176, "a glass wall?", 44, "#fff") + (t >= tg ? TF(0, 150, spring(t, tg, .4), jobTag(t, 1, 30)) : "")) : "")
    + bud("basil", "C", t, { h: 420, in: s.t0 + .05, poses: poses([s.t0, "surprised"], [hb ? LT("j706") + .1 : s.t0 + .5, "sit"], [hb ? LE("j706") + .1 : s.t0 + 2, "arms_crossed"]), jump: hb ? [[LE("j706") + .05, 20]] : [] })
    + bud("pip", "M", t, { h: 330, poses: poses([s.t0, "sit"], [tg + .2, "surprised"], [tg + 1.4, "thinking"]) }) + (hb ? say("j706", 1150, 560, t, { size: 42, tail: 160, maxW: 520 }) : "") + HUD(t); };
SC.mark1 = (t, s) => markScene(t, s, { id: "j802", sayId: "j801", who: "basil", n: "1 of 2", text: "The physical properties of a material allow it to be used in certain ways. It is important to choose a material whose physical property is suitable for the intended use of the object.", keys: ["physical", "properties", "property", "suitable", "intended", "use"], size: 54, y: 200, footer: FOOT,
  under: TF(1180, 992, .8, chapterMap()) });

/* 9 · Showdown: Basil (big, left) reads HIS zoo map; the map big in the middle; the countdown takes the stage: the background clears, the ring BIG
   at the right with your counting hand in it; after the bell Pip and Momo pop in with their picks */
const mapLit = (t) => { const L = "j902", ws = ["one", "two", "three"].map((w) => TL.lines[L].words.some((x) => norm(x.w) === w) ? W(L, w) : 1e9), r0 = MK("ring0_show");
  return [0, 1, 2].map((i) => { const a = ws[i], b = i < 2 ? ws[i + 1] : LE(L); return t >= a - .1 && t < Math.min(b, LE(L) + .2) ? 1 : t >= r0 && t < MK("bell_show") ? .45 : 0; }); };
const EAS = [880, 1030, .78];
SC.show = (t, s) => { const r0 = MK("ring0_show"), bell = MK("bell_show"), tS = LT("j904") - .08, st = ss(LT("j903") - .1, LT("j903") + .6, t), tin2 = bell + .15, rk = spring(t, LT("j903"), .4) * (1 - ss(bell + .5, bell + 1.0, t));
  const picks = [["pip", "j905", "2", 1420], ["momo", "j906", "2", 1730]];
  const inner = `<circle r="172" fill="url(#mSky)"/>` + TF(0, 30, .95, `<g filter="url(#dropS)">${countHand(t >= r0 && t < bell ? 1 + (Math.floor((t - r0) * 2) % 3) : 3)}</g>`);
  return OP(1 - st, VD(t, {}, .5)) + OP(st, bg("stage") + `<rect y="840" width="1920" height="240" fill="url(#xFloor)"/>`) + TF(EAS[0], EAS[1], EAS[2], zooEasel(t, { lit: mapLit(t) }))
    + (rk > .02 ? TF(1560, 400, rk, `<g transform="translate(-1560 -400)">${bigRing(t, 1560, 400, .95, r0, 6, inner)}</g>` + youPill(-200, -200, 1.1)) : "")
    + buddy("basil", 200, 1062, 400, t, { aura: true, in: s.t0 + .1, poses: poses([s.t0, "cheer"], [LT("j902") - .12, "sit"], [LE("j902") + .2, "cheer"], [r0, "arms_crossed"], [bell, "surprised"], [LT("j905") - .1, "oops"], [LE("j906"), "surprised"]), look: t >= r0 && t < bell ? -5 * Math.sin((t - r0) * Math.PI * 2) : 0 })
    + say("j902", 660, 230, t, { size: 38, tail: -300, maxW: 820 })
    + picks.map(([w, id, n, x]) => buddy(w, x, 1062, 330, t, { aura: true, in: tin2 + (w === "momo" ? .12 : 0), poses: [[tin2, "thinking"], [LT(id) - .12, "sit"], [LE(id) + .1, w === "pip" ? "pointing" : "cheer"]], flip: true }) + (t > tin2 + .2 ? pickNum(w, x - 200, 940, t, LT(id) - .1, n) : "") + say(id, x - 120, 600, t, { size: 38, maxW: 520, tail: 120 })).join("")
    + stampHold(t, bell, LE("j904") + .15, 960, 470, "LOCKED IN!") + bellIcon(t, r0, 1180, 160) + HUD(t); };
SC.fix = (t, s) => { const d = MK("dfly"), fix = ss(d, d + .8, t), hb = HAS("j908");
  return VD(t, {}, .5) + TF(EAS[0], EAS[1], EAS[2], zooEasel(t, { fix, lit: [0, fix * .6 * (1 - ss(d + 1.5, d + 2.2, t)), 0] })) + coin(t, W("j907", "two") - .1, 1620, 560, "+2", "line 2")
    + buddy("basil", 200, 1062, 400, t, { aura: true, in: s.t0 + .05, poses: poses([s.t0, "surprised"], [d + .3, "oops"], [hb ? LE("j908") + .2 : s.t0 + 3, "cheer"]) }) + (hb ? say("j908", 560, 330, t, { size: 42, tail: -300, maxW: 600 }) : "")
    + buddy("pip", 1720, 1062, 330, t, { aura: true, flip: true, poses: poses([s.t0, "cheer"], [d, "pointing"], [hb ? LT("j908") : d + 2, "sit"]) }) + HUD(t); };

/* 10 · a great variety: the full zoo map big; Momo (big, right) gasps as the zones pop */
SC.zoomap = (t, s) => { const L = "j1002";
  return VD(t, {}, .55) + TF(860, 960, .74, zooMap(t, { pop: MK("zones") })) + bookCaption(t, L, "Why is it important to maintain diversity?", 220, { size: 50, keys: ["maintain", "diversity?"] })
    + buddy("momo", 1720, 1062, 380, t, { aura: true, flip: true, poses: poses([s.t0, "back"], [MK("zones") + 1.6, "surprised"], [W("j1001", "variety") - .1, "cheer"], [LT(L), "thinking"]) }) + HUD(t); };
SC.mark2 = (t, s) => markScene(t, s, { id: "j1004", sayId: "j1003", who: "momo", n: "2 of 2", text: "Living things that are not able to survive will become extinct. This means that they will all die out.", keys: ["not", "able", "to", "survive", "extinct."], size: 60, y: 220, footer: FOOT,
  under: TF(860, 1034, .3, zooMap(t, { glow: TL.marks.glowall !== undefined ? ss(MK("glowall") - .1, MK("glowall") + .5, t) : 0 })) });

/* 11 · the chant: the board big at the top left, its parts flashing on their lines; the buddies 1.5x along the bottom */
SC.chant = (t, s) => { const L = TL.lines.c1003, beats = chantBeats(L); let fx = "", clap = 0, stomp = 0; for (const [bt, k, soft] of beats) { const g = soft ? .45 : 1; if (k === "c") clap = Math.max(clap, pulse(t, bt, .03, .18) * g); else stomp = Math.max(stomp, pulse(t, bt, .03, .25) * g); }
  const jumps = beats.filter((b) => b[1] === "s" && !b[2]).map((b) => [b[0] - .2, 30]), by = 1066, bh = 380, xs = [300, 960, 1620], tin = s.t0 + .15;
  let buds = ""; ["pip", "basil", "momo"].forEach((w, i) => { const sq = 1 - .05 * clap; buds += `<g transform="translate(${xs[i]} ${by}) scale(${n2(1 / sq)} ${n2(sq)}) translate(${-xs[i]} ${-by})">${buddy(w, xs[i], by, bh, t, { aura: true, flip: i === 2, in: tin + i * .08, jump: t >= L.t ? jumps : [], poses: [[s.t0, "sit"], [L.end - .28, "cheer"]] })}</g>`;
    fx += OP(clap, `<g stroke="${P.sun}" stroke-width="7" stroke-linecap="round"><path d="M${xs[i] - bh * .5} ${by - bh * .8} l-26 -22 M${xs[i] + bh * .5} ${by - bh * .8} l26 -22 M${xs[i]} ${by - bh * 1.08} v-30"/></g>`); });
  return bg("stage2") + TF(440, 560, .45, planBoard(t, { flash: chantFlash(t, L) })) + chantLines(t, L, { x: 1270, y0: 300, dy: 120, size: 50 }) + buds + fx + yourTurn(t, L, 1800, 560, .75) + say("u1002", 960, 600, t, { size: 52, col: P.basil, tail: 0, merge: true }) + HUD(t); };

/* 12 · score hand; the frog's reveal: the push-in into its black-ringed circle, then Pip's fun fact with its picture */
SC.final = (t, s) => { const L = "j1201", thi = W(L, "high") - .05, tips = [[s.t0, null, 1], [W(L, "three") - .1, null, 3]], hi = pulse(t, thi + .25, .12, .6); let nf = 1; for (const [tt, , n] of tips) if (t >= tt && n) nf = n;
  let out = bg("stage") + `<g transform="translate(960 ${n2(lerp(-200, 200, eo((t - s.t0) / .35)))})">${scoreboard(t, 0, 0, 1.6, { you: "?", bud: 1 })}</g>`
    + TF(960, 760 - 60 * hi, 1.85 * spring(t, s.t0 + .25, .5) * (1 + .1 * hi), `<g filter="url(#drop)">${countHand(nf)}</g>`) + youPill(960, 430, 1.3)
    + OP(hi, `<g stroke="${P.sun}" stroke-width="12" stroke-linecap="round">${[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => { const an = -Math.PI * (.05 + i * .1125), r1 = 300 + 60 * (1 - hi), r2 = r1 + 80; return `<path d="M${n2(960 + Math.cos(an) * r1)} ${n2(640 + Math.sin(an) * r1)} L${n2(960 + Math.cos(an) * r2)} ${n2(640 + Math.sin(an) * r2)}"/>`; }).join("")}</g>`)
    + (t >= thi ? TF(1420, 480, spring(t, thi, .4), tpill(0, 0, "HIGH FIVE!", 56, P.sun, P.ink, { w: 700, ls: 4 })) : "");
  [["pip", 300, false, 420], ["basil", 1290, true, 340], ["momo", 1690, true, 390]].forEach(([w, x, fl, h]) => { out += buddy(w, x, 1062, h, t, { aura: true, flip: fl, poses: [[s.t0, "sit"], [W(L, "beat") - .1, "cheer"], [W(L, "beat") + 1.2, "sit"], [thi - .15, "cheer"]], jump: [[thi + .05, 90]] }); });
  return out + logo(t); };
// the fun fact's picture: a frog's sticky toe pads holding on to a smooth glass wall; then a frog's tank with a lid
function frogFact(t, tA, tB, tC, x, y) { const ka = t < tA ? 0 : spring(t, tA, .45); if (ka < .02) return ""; const kb = t < tC ? 0 : spring(t, tC, .45);
  const glass = `<g filter="url(#drop)"><rect x="-190" y="-200" width="380" height="400" rx="26" fill="#fff"/></g><rect x="-172" y="-182" width="344" height="364" rx="16" fill="#DDF4FF"/><path d="M-130 -150 L-60 -40 M-80 -160 L-30 -80 M90 60 L140 150" stroke="#fff" stroke-width="12" opacity=".8" stroke-linecap="round"/>`
    + TF(0, 30 - 30 * Math.sin(t * 1.2), 1.7, frog(t, {}), -90);
  const tank = `<g filter="url(#drop)"><rect x="-190" y="-150" width="380" height="300" rx="22" fill="#fff"/></g><rect x="-170" y="-110" width="340" height="240" rx="10" fill="#CFEFFF" stroke="#7FB4D6" stroke-width="6"/><rect x="-170" y="70" width="340" height="60" fill="#B98A57"/>${TF(30, 60, 1, frog(t, {}))}
    <g transform="translate(0 ${n2(-170 + 50 * (1 - kb))})"><rect x="-186" y="0" width="372" height="34" rx="10" fill="#5E6B7C" stroke="#39435A" stroke-width="5"/>${[-140, -100, -60, -20, 20, 60, 100, 140].map((a) => `<path d="M${a} 6 V28" stroke="#9AA6B4" stroke-width="5"/>`).join("")}</g>`;
  return TF(x, y, ka, glass) + (t >= tA + .3 ? TF(x, y - 250, spring(t, tA + .3, .4), tpill(0, 0, "sticky toe pads", 44, "#fff", P.ink, { w: 700 })) : "") + (t >= tB ? TF(x, y + 250, spring(t, tB, .4), tpill(0, 0, "smooth glass", 44, "#fff", P.ink, { w: 700 })) : "")
    + (kb > .02 ? TF(x + 430, y + 40, kb * .9, tank) + (t >= tC + .4 ? TF(x + 430, y - 200, spring(t, tC + .4, .4), tpill(0, 0, "a lid!", 50, GOODC, "#fff", { w: 700 })) : "") : ""); }
const LZ = { T: [520, 380], r: 230, Z: 3.4 };
SC.liz = (t, s) => { const L = "j1202", F = "j1203", E = "j1204", tq = W(L, "it") - .1, tR = W(L, HIDDEN[0]) + .1, tz = s.t0 + .35, u = eio((t - tz) / 1.3), kc = clamp((t - (tz + 1.05)) / .6), f0 = 1 - clamp((t - s.t0) / .45);
  const th = s.t0 + 2.3, uh = clamp((t - th) / .5), sq = pulse(t, th, .25, .1) * (t < th ? 1 : 0), fxx = lerp(FROG[0], FROG2[0], uh), fyy = lerp(FROG[1], FROG2[1], uh) - 70 * Math.sin(Math.PI * uh);
  const world = V(t, { n: 9, board: {}, frog: { x: fxx, y: fyy, sq, puff: t < th - .3 ? (.5 + .5 * Math.sin(t * 9)) : 0 } });
  const ringK = t < tR ? 0 : spring(t, tR, .5), tF = LT(F), tT = W(E, "tell") - .1, Am = [lerp(FROG[0], FROG2[0], eio((t - th) / .6)), lerp(FROG[1], FROG2[1], eio((t - th) / .6)) - 18];
  let out = circleShot(world, u, Am, LZ.T, LZ.Z, LZ.r, kc, "z") + (ringK > .02 ? `<circle cx="${LZ.T[0]}" cy="${LZ.T[1]}" r="${n2((120 + 8 * Math.sin(t * 6)) * ringK)}" fill="none" stroke="${P.sun}" stroke-width="12"/>` + popSpark(t, tR, LZ.T[0], LZ.T[1], 150) : "");
  out += (t >= tq ? OP(1 - ramp(t, tT - .4, .3), TF(LZ.T[0], 668, spring(t, tq, .45), `<g filter="url(#drop)"><rect x="${n2(-tw("It was on the lily pad in the pond!", 52, 700) / 2 - 56)}" y="-58" width="${n2(tw("It was on the lily pad in the pond!", 52, 700) + 112)}" height="116" rx="58" fill="${P.ink}"/></g>${T(0, 19, "It was on the lily pad in the pond!", 52, "#fff")}`)) : "");
  out += frogFact(t, MK("fftoes") - .1, MK("ffglass"), MK("fflid"), 1080, 400);
  out += bud("pip", "C", t, { h: 400, in: s.t0 + 1.4, poses: poses([s.t0 + 1.4, "thinking"], [tF - .45, "surprised"], [tF + .5, "sit"], [LE(F) + .1, "cheer"], [tT, "pointing"]), jump: [[MK("ffglass") - .1, 24]] }) + say(F, 1000, 870, t, { size: 38, tail: 280, maxW: 620 });
  out += (t >= tT ? TF(LZ.T[0], 668, spring(t, tT, .45), tpill(0, 0, "Tell someone at home!", 60, P.sun, P.ink, { w: 700 })) : "");
  return (f0 > .01 ? out + OP(f0, SC.final(SCN.final.t1 - .04, SCN.final)) : out) + logo(t); };

/* 13 · the dare for Episode 14: ONE set of big numbered picture cards (the dusk boards with their words on them); Basil big at the right */
const DRX = [440, 860, 1280];
SC.dare = (t, s) => { const a = "j1301", tQ = W(a, "why") - .15, tc = [W(a, "one") - .1, W(a, "two") - .1, W(a, "three") - .1], tL = W(a, "lock") - .1, hb = HAS("j1302");
  const cards = NEXT_CARDS.map((txt, i) => { const k = spring(t, tc[i], .45); if (k < .02) return ""; return TF(DRX[i], 640, k, picCard(i + 1, TF(0, 0, .82, PIC[NEXT_PICS[i]](t)), txt, { w: 380, h: 470, size: 40, pulse: Math.max(pulse(t, tc[i], .04, .6), t >= tL ? (Math.floor((t - tL) / .5) % 3 === i ? .8 : 0) : 0) })); }).join("");
  return VD(t, { gold: ramp(t, s.t0, 1.5) }, .5) + cards
    + TF(860, 150, spring(t, s.t0 + .2, .45), tpill(0, 0, "NEXT · Why does the Sun come back?", 52, P.ink, P.sun, { w: 700 }))
    + qMark(t, tQ, 1500, 300, 50) + (t >= tL ? TF(860, 262, spring(t, tL, .45), tpill(0, 0, "Lock in your answer!", 42, P.sun, P.ink, { w: 700 })) : "") + finePrint(t, s.t0 + 1.4, "Never look at the Sun.", 300, 1046)
    + buddy("basil", 1680, 1062, 420, t, { aura: true, flip: true, in: s.t0 + .1, poses: hb ? [[s.t0, "cheer"], [tc[0], "surprised"], [LT("j1302") - .12, "sit"], [LE("j1302") + .1, "cheer"]] : [[s.t0, "sit"], [tL, "cheer"]], nohop: true }) + (hb ? say("j1302", 1560, 560, t, { size: 40, tail: 80, maxW: 440 }) : "") + HUD(t); };

/* the key-word read-along and "Now you know!" (as Part 1) */
SC.kwrecap = (t, s) => { const ids = KWLINE, us = KWLINE.map((k) => "u" + k.slice(1)), tw_ = LT("h864");
  let turn = -1; us.forEach((u, i) => { if (t >= LT(u) - .2 && t < LE(u) + .45) turn = i; });
  let out = bg("stage2") + OP(ramp(t, s.t0 + .2, .3) * (1 - ramp(t, LT(ids[0]) - .3, .3)), T(960, 190, "Let’s read today’s key words together!", 70, "#fff", { w: 600 })) + OP(ramp(t, LT(ids[0]) - .3, .3), T(960, 170, "KEY WORDS", 54, P.sun, { ls: 10 }));
  out += TF(330, 480, 1, youPill(0, 0, 1.3) + `<g transform="translate(0 130) scale(${n2(1 + (turn >= 0 ? .12 + .05 * Math.sin(t * 10) : 0))})" opacity="${turn >= 0 ? 1 : .35}"><g filter="url(#dropS)"><rect x="-110" y="-64" width="220" height="128" rx="50" fill="#fff"/><path d="M-30 60 L-56 108 L16 62z" fill="#fff"/></g>${[-52, 0, 52].map((x, i) => `<circle cx="${x}" cy="${n2(turn >= 0 ? -8 * Math.abs(Math.sin(t * 7 + i)) : 0)}" r="15" fill="${P.ink}"/>`).join("")}</g>` + (turn >= 0 ? TF(0, 300, spring(t, LT(us[turn]) - .2, .3), tpill(0, 0, "Say it!", 44, P.coral, "#fff", { w: 700 })) : ""));
  const hops = us.map((u) => [LT(u) - .15, 22]);
  [["pip", 1610, 570, 250], ["basil", 1700, 1066, 290], ["momo", 290, 1066, 250]].forEach(([w, x, y, h], i) => { out += buddy(w, x, y, h, t, { aura: true, flip: i < 2, in: s.t0 + .15 + i * .08, tag: false, poses: [[s.t0, "sit"], [tw_, "cheer"]], jump: [...hops, [tw_, 40]] }); });
  if (t >= tw_) out += TF(330, 300, spring(t, tw_, .45), `<g transform="rotate(-4)"><g filter="url(#drop)"><rect x="-230" y="-64" width="460" height="128" rx="64" fill="url(#gSun)"/></g>${T(0, 24, "Well done!", 70, P.ink)}</g>`);
  return out + HUD(t); };
SC.nyk = (t, s) => nykScene(t, s, TF(790, 1045, .3, planBoard(t)), { bx: [290, 1640, 1275], hx: 790, bh: 400 });
})(); }
