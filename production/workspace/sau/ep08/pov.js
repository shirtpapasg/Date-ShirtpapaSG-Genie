/* TheOneApp, Explored EP08 "What did the crocodile eat?": the picture-only shots. Load after common.js and ep08/scenes.js.
   crocDawn (the silent cold open) · the REWIND hero sequence in first person: povCroc -> povMudskipper -> povCrab -> povLeaf ->
   povSunlight, then chainForward (outside): the whole chain in a row, fast-forward.
   Each switch is a "rewind": the picture spins back, rings ripple inwards, tape bars flicker, the edges go warm sepia, and a tape
   squeal plays (ep08_rewind). Every frame depends only on t; "u" = seconds after the scene's t0 (u runs from about -0.6). */
(() => {
const CX = VP[0], CY = VP[1];
const T0 = n => (SC[n] ? SC[n].t0 : 0), DUR = n => (SC[n] ? SC[n].t1 - SC[n].t0 : 1);
const card = (p, text, col = INK, fs = 44) => chip(p, text, col, {fs});
const showC = (c, t, a, b, y = 905, x = CX) => { tf(c, `translate(${x} ${y}) scale(${Math.max(0, pop(t, a))})`); op(c, on(t, a, b, .25)); };
const expo = (a, b, k) => a * Math.pow(b / a, clamp(k));
const hash = (a, b) => { const x = Math.sin(a * 127.1 + b * 311.7) * 43758.5453; return x - Math.floor(x); };
const big = (p, text, fs = 220, fill = "#ffe14d") => tx(p, {x: 0, y: 0, "text-anchor": "middle", "font-size": fs, "font-weight": 700, fill, class: "out", "stroke-width": fs * .14}, text);

/* ---- the rewind kit. rw(s) lays the effect over a scene; rwRun turns s.cam and drives the overlay.
   A scene fades in from u = -0.6 to -0.2 and out from D - 0.45 to D - 0.05, so the spin runs across the join. */
function rw(s, word = "⏪ REWIND") { const o = el("g", {}, s.stage);
  o.tint = fullRect(o, "#d9a25e", 0); set(o.tint, "style", "mix-blend-mode:multiply");
  o.edge = fullRect(o, e8grad("radialGradient", {cx: .5, cy: .5, r: .72}, [[.5, "#7a4a1c", 0], [1, "#5a3210", .9]]));
  o.rings = []; for (let i = 0; i < 7; i++) o.rings.push(el("circle", {cx: CX, cy: CY, fill: "none", stroke: "#ffe9c4"}, o));
  o.bars = [0, 1, 2, 3].map(() => el("rect", {x: FULL.x, width: FULL.w, fill: "#fff"}, o));
  o.stamp = el("g", {}, o); tx(o.stamp, {x: -90, y: 150, "font-size": 86, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 14}, word);
  return o; }
function rwRun(s, o, t, N, first, last) { const u = t - T0(N), D = DUR(N), kin = first ? 1 : ramp(u, -.6, .55), kout = last ? 0 : ramp(u, D - .78, D - .05), tr = Math.max(1 - kin, kout);
  const ang = 170 * (1 - kin) - 170 * kout * kout, sc = (1 + .55 * (1 - kin)) * (1 - .32 * kout);
  tf(s.cam, `translate(${CX} ${CY}) rotate(${ang}) scale(${sc}) translate(${-CX} ${-CY})`);
  op(o.tint, .12 + .7 * tr); op(o.edge, .5 + .5 * tr);
  o.rings.forEach((r, i) => { const ph = ((i / 7 - t * 1.1) % 1 + 1) % 1; set(r, "r", 40 + ph * 1150); set(r, "stroke-width", 6 + 16 * ph); op(r, .5 * tr * Math.sin(Math.PI * ph)); });
  o.bars.forEach((b, j) => { const f = Math.floor(t * 20); set(b, "y", -80 + hash(f, j) * 1100); set(b, "height", 6 + hash(f, j + 9) * 44); op(b, tr > .04 ? .16 + .3 * hash(f, j + 5) : 0); });
  op(o.stamp, tr > .12 ? (Math.floor(t * 8) % 4 ? 1 : .35) : 0); return {u, D, tr}; }

/* ---- jaws closing over the camera: the dark of the mouth, a gum line and a row of teeth, from above and from below */
function jaws(p, gum, tw, th, n) { const g = el("g", {}, p);
  g.d = [-1, 1].map(dir => el("rect", {x: FULL.x, y: dir < 0 ? -900 : -th, width: FULL.w, height: 900 + th, fill: "#2a0f1a"}, g));
  g.j = [-1, 1].map(dir => { const j = el("g", {}, g);
    el("rect", {x: FULL.x - 10, y: dir < 0 ? -64 : 0, width: FULL.w + 20, height: 64, fill: gum, stroke: INK, "stroke-width": 7}, j);
    for (let i = -1; i <= n; i++) { const x = FULL.x + (i + (dir < 0 ? .5 : 1)) * FULL.w / n, h = th * (.75 + .25 * hash(i, dir + 3));
      el("path", {d: `M${x - tw / 2} 0 Q${x - tw * .1} ${-dir * h * .7} ${x} ${-dir * h} Q${x + tw * .1} ${-dir * h * .7} ${x + tw / 2} 0 Z`, fill: "#fffdf0", stroke: INK, "stroke-width": 6, "stroke-linejoin": "round"}, j); } return j; });
  g.run = k => { const y = [lerp(-140 - th, CY - th * .42, k), lerp(1100 + th, CY + th * .42, k)]; [0, 1].forEach(i => { tf(g.d[i], `translate(0 ${y[i]})`); tf(g.j[i], `translate(0 ${y[i]})`); }); op(g, k > 0 ? 1 : 0); }; return g; }

/* =====================================================================================================================
   CROC DAWN (cold open, 5.5 s, outside): dawn mist over the Sungei Buloh boardwalk. A huge crocodile lies still on a mudbank.
   The camera drifts in... and its eye opens. */
S.crocDawn = (() => { const s = scene("crocDawn", "#4b5a94", "#55667c"), N = "crocDawn"; s.cam = el("g", {}, s.stage);
  s.sw = e8Swamp(s.cam, {dawn: true, board: true}); s.mist1 = e8Mist(s.cam, 4, 3);
  s.croc = e8Croc(s.cam); tf(s.croc, "translate(880 800)"); op(s.croc.lid, 1);
  s.shade = fullRect(s.cam, "#2b2f5a", .22); set(s.shade, "style", "mix-blend-mode:multiply");
  s.mist2 = e8Mist(s.cam, 3, 8); s.mist2.m.forEach(m => { m.y += 330; set(m.e, "opacity", .32); });
  s.vg = fullRect(s.stage, e8grad("radialGradient", {cx: .5, cy: .5, r: .75}, [[.55, "#101433", 0], [1, "#101433", .7]]));
  s.c = card(s.stage, "📍 Sungei Buloh Wetland Reserve, Singapore · dawn", INK, 40);
  s.run = t => { const u = t - T0(N), k = .25 * ramp(u, -.6, 3) + .75 * ramp(u, 2.4, 4.3), z = lerp(1.04, 3.1, k), open = ramp(u, 4.45, 4.6);
    tf(s.cam, `translate(${CX} ${CY}) scale(${z}) translate(${-lerp(830, 1084, Math.pow(k, .6))} ${-lerp(500, 668, Math.pow(k, .6))})`);
    s.mist1.run(u); s.mist2.run(u * 1.6); op(s.croc.lid, 1 - open); op(s.shade, .22 * (1 - .5 * open));
    showC(s.c, t, T0(N) + .5, T0(N) + 3.3, 905); };
  return s; })();

/* =====================================================================================================================
   POV CROC (6 s): YOU are the crocodile, gliding low through murky water towards the mudbank. A mudskipper hops... SNAP. */
S.povCroc = (() => { const s = scene("povCroc", "#3b2a1a", "#3b2a1a"), N = "povCroc"; s.cam = el("g", {}, s.stage); const c = s.cam;
  e8Swamp(c, {bank: false});
  el("rect", {x: FULL.x, y: 430, width: FULL.w, height: 620, fill: e8grad("linearGradient", {x1: 0, y1: 0, x2: 0, y2: 1}, [[0, "#6f7f4a", .1], [1, "#4a5530", .85]])}, c);
  s.bank = el("g", {}, c); tf(e8Mangrove(s.bank, 5), "translate(470 -10) scale(.72)"); tf(e8Mangrove(s.bank, 11), "translate(-520 0) scale(.6)");
  el("path", {d: "M-1500 112 Q-700 150 0 156 Q700 150 1500 112 Z", fill: "#3f4a2c", opacity: .45}, s.bank);
  el("path", e8A({d: "M-1500 112 Q-760 -20 0 -46 Q760 -20 1500 112 Q0 128 -1500 112 Z", fill: "#8b6f58"}), s.bank);
  el("path", {d: "M-520 20 Q-200 -24 120 -30", fill: "none", stroke: "#a98b70", "stroke-width": 9, "stroke-linecap": "round"}, s.bank);
  seed = 21; for (let i = 0; i < 12; i++) { const x = -640 + rnd() * 1280, y = 10 + rnd() * 50, h = 26 + rnd() * 30; if (Math.abs(x + 30) < 190) continue; el("path", {d: `M${x - 6} ${y} L${x - 2} ${y - h} L${x + 3} ${y - h} L${x + 7} ${y} Z`, fill: "#5b4636", stroke: INK, "stroke-width": 3, "stroke-linejoin": "round"}, s.bank); }
  s.skG = el("g", {}, s.bank); s.sk = e8Skipper(s.skG);
  s.rip = []; seed = 44; for (let i = 0; i < 30; i++) s.rip.push({e: el("line", {stroke: "#e9f5d8", "stroke-linecap": "round"}, c), p: rnd(), x: rnd() * 2 - 1});
  s.wake = el("path", {d: "M300 1040 Q420 860 560 790 M1320 1040 Q1200 860 1060 790", fill: "none", stroke: "#e9f5d8", "stroke-width": 10, "stroke-linecap": "round", opacity: .5}, c);
  // our own snout, low in the water in front of us
  s.snout = el("g", {}, c); const SN = "M520 1080 Q560 900 650 740 Q720 628 810 616 Q900 628 970 740 Q1060 900 1100 1080 Z";
  for (let i = 0; i < 7; i++) [-1, 1].forEach(k => { const q = e8q([650, 740], [565, 900], [524, 1070], i / 7), x = 810 + k * (810 - q[0]); el("path", {d: `M${x} ${q[1] - 16} L${x + k * 34} ${q[1] + 6} L${x} ${q[1] + 22} Z`, fill: "#fffdf0", stroke: INK, "stroke-width": 5, "stroke-linejoin": "round"}, s.snout); });
  el("path", e8A({d: SN, fill: "#6f8f45", "stroke-width": 8}), s.snout);
  for (let r = 0; r < 6; r++) for (let i = 0; i < 2 + r; i++) { const y = 742 + r * 58, w = 60 + r * 46, x = 810 - w + (i + .5) * 2 * w / (2 + r); el("ellipse", {cx: x, cy: y, rx: 30, ry: 16, fill: "#55723a", stroke: INK, "stroke-width": 4}, s.snout); }
  el("ellipse", e8A({cx: 810, cy: 664, rx: 62, ry: 34, fill: "#7fa052", "stroke-width": 7}), s.snout);
  [-20, 20].forEach(dx => el("ellipse", {cx: 810 + dx, cy: 660, rx: 10, ry: 7, fill: INK}, s.snout));
  [-1, 1].forEach(k => { el("path", e8A({d: `M${810 + k * 330} 1080 Q${810 + k * 320} 930 ${810 + k * 430} 912 Q${810 + k * 560} 930 ${810 + k * 560} 1080 Z`, fill: "#6f8f45", "stroke-width": 8}), s.snout);       // our own eye bumps
    el("path", {d: `M${810 + k * 372} 1010 Q${810 + k * 440} 950 ${810 + k * 520} 1000`, fill: "none", stroke: "#55723a", "stroke-width": 12, "stroke-linecap": "round"}, s.snout); });
  s.jaw = jaws(s.stage, "#e9a3a0", 150, 190, 9);
  s.snap = el("g", {}, s.stage); big(s.snap, "SNAP!");
  s.fl = fullRect(s.stage, "#fff", 0); s.o = rw(s); s.c = card(s.stage, "🐊 You are the crocodile", "#2a7d4f", 48);
  s.run = t => { const {u} = rwRun(s, s.o, t, N, true, false), t0 = T0(N), k = ramp(u, -.6, 4.5) * .5 + clamp((u + .6) / 5.1) * .5, lun = ramp(u, 4.5, 4.78), z = expo(.4, 1.5, k) * (1 + 1.6 * lun);
    tf(s.bank, `translate(810 ${lerp(452, 560, k) + 260 * lun}) scale(${z})`);
    const hp = Math.sin(Math.PI * clamp((u - 3.5) / .45)); tf(s.skG, `translate(${-30 + 50 * ramp(u, 3.5, 3.95)} ${-40 - 46 * hp}) scale(-.85 .85) rotate(${-10 * hp})`);
    s.rip.forEach(r => { const d = ((r.p + u * .22) % 1 + 1) % 1, y = 440 + 620 * d * d; set(r.e, "x1", 810 + r.x * (200 + 1500 * d) - 20 - 90 * d); set(r.e, "x2", 810 + r.x * (200 + 1500 * d) + 20 + 90 * d); set(r.e, "y1", y); set(r.e, "y2", y); set(r.e, "stroke-width", 2 + 7 * d); op(r.e, .5 * Math.sin(Math.PI * d)); });
    tf(s.snout, `translate(0 ${9 * Math.sin(u * 2.1) - 150 * lun})`); op(s.wake, .35 + .15 * Math.sin(u * 3));
    s.jaw.run(ramp(u, 4.56, 4.8)); tf(s.snap, `translate(810 300) scale(${Math.max(0, pop(t, t0 + 4.8, .3))}) rotate(-5)`); op(s.snap, ramp(u, 4.78, 4.85));
    op(s.fl, .8 * on(u, 4.76, 4.98, .1)); showC(s.c, t, t0 + .35, t0 + 4.3); };
  return s; })();

/* =====================================================================================================================
   POV MUDSKIPPER (6 s): rewind. YOU are the mudskipper, hopping over the mud on your fins. A crab ahead... SNAP. */
S.povMudskipper = (() => { const s = scene("povMudskipper", "#3b2a1a", "#3b2a1a"), N = "povMudskipper", HY = 430, G = 230; s.cam = el("g", {}, s.stage); const c = el("g", {}, s.cam); s.w = c;
  e8Swamp(c, {bank: false});
  el("rect", {x: FULL.x, y: HY, width: FULL.w, height: 900, fill: e8grad("linearGradient", {x1: 0, y1: 0, x2: 0, y2: 1}, [[0, "#b39a7c"], [.3, "#96795d"], [1, "#6a5240"]])}, c);
  el("line", {x1: FULL.x, y1: HY, x2: FULL.x + FULL.w, y2: HY, stroke: INK, "stroke-width": 5}, c);
  s.trees = [[250, 1.05, 5], [1420, 1.25, 11]].map(([x, sc, sd]) => { const g = e8Mangrove(c, sd); g.x = x; g.sc = sc; return g; });
  seed = 63; s.things = []; for (let i = 0; i < 34; i++) { const g = el("g", {}, c), pud = i % 4 === 0;
    if (pud) el("ellipse", {rx: 120, ry: 16, fill: "#cfe6e0", stroke: INK, "stroke-width": 3, opacity: .8}, g);
    else { const h = 70 + rnd() * 50; el("path", {d: `M-9 0 L-3 ${-h} L3 ${-h} L9 0 Z`, fill: "#5b4636", stroke: INK, "stroke-width": 3.5, "stroke-linejoin": "round"}, g); }
    let X = (rnd() * 2 - 1) * 5; if (!pud && Math.abs(X) < .7) X = Math.sign(X || 1) * (.7 + rnd()); s.things.push({g, X, d0: rnd() * 6.5}); }
  s.crabG = el("g", {}, c); s.crab = e8Crab(s.crabG);
  // our own body: the snout below, and the two pectoral fins we hop on
  s.me = el("g", {}, s.cam); const F = "#c2955a";
  s.fin = [-1, 1].map(k => { const f = el("g", {}, s.me), a = el("g", {}, f);
    el("path", e8A({d: "M-150 190 Q-120 -10 -10 -80 Q90 -120 170 -60 Q200 -10 140 30 Q60 70 40 190 Z", fill: F, "stroke-width": 8}), a);
    [[20, -40, 150, -40], [10, -20, 150, -6], [0, 0, 124, 26], [40, -62, 130, -70]].forEach(([x1, y1, x2, y2]) => el("line", {x1, y1, x2, y2, stroke: INK, "stroke-width": 5, "stroke-linecap": "round", opacity: .7}, a));
    [[-60, 60], [-30, 10], [-80, 120]].forEach(([x, y]) => el("circle", {cx: x, cy: y, r: 9, fill: "#8fd3e8"}, a)); f.a = a; f.k = k; return f; });
  el("path", e8A({d: "M520 1070 Q570 968 810 952 Q1050 968 1100 1070 Z", fill: "#9c8660", "stroke-width": 8}), s.me);
  [[700, 1000], [780, 985], [860, 990], [930, 1004]].forEach(([x, y]) => el("circle", {cx: x, cy: y, r: 7, fill: "#8fd3e8"}, s.me));
  s.jaw = jaws(s.stage, "#c98f86", 70, 60, 18);
  s.snap = el("g", {}, s.stage); big(s.snap, "SNAP!");
  s.fl = fullRect(s.stage, "#fff", 0); s.o = rw(s); s.c = card(s.stage, "⏪ Rewind… you are the mudskipper", "#8a6240", 46);
  const HOP = [[.75, 1.4], [1.85, 1.2], [2.95, 1.0]];
  s.run = t => { const {u} = rwRun(s, s.o, t, N, false, false), t0 = T0(N); let dist = 0, by = 0; HOP.forEach(([a, m]) => { dist += m * ease((u - a) / .5); by += Math.sin(Math.PI * clamp((u - a) / .5)); });
    const lun = ramp(u, 4.25, 4.55); dist += .72 * lun; by += .5 * Math.sin(Math.PI * lun);
    tf(s.w, `translate(0 ${70 * by})`);
    s.trees.forEach(g => { const z = 1 + .1 * dist; tf(g, `translate(${810 + (g.x - 810) * z} ${HY + 26 * z}) scale(${g.sc * z})`); });
    s.things.forEach(o => { const d = ((o.d0 - dist - .3) % 6.5 + 6.5) % 6.5 + .3, k = 1.9 / d; tf(o.g, `translate(${810 + o.X * G / d} ${HY + G / d}) scale(${k})`); op(o.g, clamp((6.6 - d) / 1.2) * clamp((d - .3) / .15)); o.d = d; });
    s.things.slice().sort((p, q) => q.d - p.d).forEach(o => c.insertBefore(o.g, s.crabG));
    const d = 5 - dist, kc = 1.9 / d; tf(s.crabG, `translate(810 ${HY + G / d}) scale(${kc})`); s.crab.claws(55 * ramp(u, 3.3, 3.7));
    s.fin.forEach(f => { tf(f, `translate(${810 + f.k * 520} ${905 + 46 * by}) scale(${f.k} 1)`); tf(f.a, `rotate(${-16 * by})`); });
    s.jaw.run(ramp(u, 4.42, 4.62)); tf(s.snap, `translate(810 300) scale(${Math.max(0, pop(t, t0 + 4.62, .3))}) rotate(-5)`); op(s.snap, ramp(u, 4.6, 4.67));
    op(s.fl, .8 * on(u, 4.58, 4.8, .1)); showC(s.c, t, t0 + .6, t0 + 4.2); };
  return s; })();

/* =====================================================================================================================
   POV CRAB (5.5 s): rewind. YOU are a mangrove crab, scuttling sideways through the prop roots. A fallen leaf: nibble, nibble. */
S.povCrab = (() => { const s = scene("povCrab", "#3b2a1a", "#3b2a1a"), N = "povCrab"; s.cam = el("g", {}, s.stage); const c = s.cam;
  fullRect(c, e8grad("linearGradient", {x1: 0, y1: 0, x2: 0, y2: 1}, [[0, "#9fd18b"], [.35, "#5c9a62"], [.62, "#2f5a3c"]]));
  [[200, 150], [760, 220], [1300, 130]].forEach(([x, w]) => el("path", {d: `M${x} -80 L${x + w} -80 L${x + w - 260} 700 L${x - 320} 700 Z`, fill: "#fff7c2", opacity: .16}, c));
  const layer = (n, w, col, x0, x1, sp, sd) => { const g = el("g", {}, c); seed = sd; for (let i = 0; i < n; i++) { const x = lerp(x0, x1, (i + rnd() * .6) / n), dx = (rnd() - .5) * 420, d = `M${x} -120 Q${x + dx * .15} 330 ${x + dx} ${700 + w}`;
      el("path", {d, fill: "none", stroke: INK, "stroke-width": w + 14, "stroke-linecap": "round"}, g); el("path", {d, fill: "none", stroke: col, "stroke-width": w, "stroke-linecap": "round"}, g);
      el("path", {d, fill: "none", stroke: "#fff", "stroke-width": w * .14, "stroke-linecap": "round", opacity: .16, transform: `translate(${-w * .22} 0)`}, g); } g.sp = sp; return g; };
  s.L = [layer(11, 26, "#6d5a45", -200, 2500, .35, 3), layer(8, 60, "#86664a", -100, 3100, .7, 8)];
  s.gr = el("g", {}, c); el("path", e8A({d: "M-400 700 Q600 640 1500 668 Q2600 700 3800 650 L3800 1100 H-400 Z", fill: "#6f5641", "stroke-width": 7}), s.gr);
  seed = 5; for (let i = 0; i < 26; i++) { const x = -300 + rnd() * 3700, y = 730 + rnd() * 280; el("ellipse", {cx: x, cy: y, rx: 30 + rnd() * 60, ry: 8 + rnd() * 10, fill: i % 3 ? "#5d4735" : "#8a6f55", opacity: .8}, s.gr); }
  for (let i = 0; i < 7; i++) tf(e8Leaf(s.gr, i % 2 ? "#b98a3c" : "#a9763a", "#7a5420"), `translate(${200 + i * 300 + rnd() * 100} ${800 + rnd() * 180}) rotate(${rnd() * 360}) scale(${.8 + rnd() * .5})`);
  // the fallen leaf (with bites taken out of it as we eat)
  const mk = el("mask", {id: "e8bite", maskUnits: "userSpaceOnUse", x: -200, y: -200, width: 400, height: 400}, e8defs()); el("rect", {x: -200, y: -200, width: 400, height: 400, fill: "#fff"}, mk);
  s.bite = [[-46, 34, 27], [52, 30, 26], [2, 42, 25]].map(([x, y, r]) => { const b = el("g", {}, mk); [[0, 0, r], [r * .9, -r * .2, r * .6], [-r * .8, -r * .3, r * .55]].forEach(([dx, dy, rr]) => el("circle", {cx: x + dx, cy: y + dy, r: rr, fill: "#000"}, b)); return b; });
  s.leafG = el("g", {}, s.gr); s.leafSh = el("ellipse", {cx: 0, cy: 150, rx: 330, ry: 34, fill: INK, opacity: .3}, s.leafG);
  const lm = el("g", {mask: "url(#e8bite)"}, el("g", {transform: "rotate(-6) scale(4.3)"}, s.leafG)); e8Leaf(lm, "#e0aa3e", "#a06a1c"); [[-30, -14, 9], [20, 12, 7], [44, -8, 5]].forEach(([x, y, r]) => el("circle", {cx: x, cy: y, r, fill: "#b9802c", opacity: .7}, lm));
  s.L.push(layer(4, 170, "#4a3828", 900, 4300, 1.55, 14));
  // our own claws
  s.cl = [-1, 1].map(k => { const g = el("g", {}, s.cam), a = el("g", {transform: "rotate(-62) scale(5.6)"}, g);
    el("path", e8A({d: "M-40 -12 L30 -4 L30 16 L-40 14 Z", fill: "#b8432f", "stroke-width": 1.8}), a); el("path", e8A({d: "M22 -24 Q62 -38 88 -10 L56 0 L88 12 Q62 36 22 22 Z", fill: "#e2553a", "stroke-width": 1.8}), a);
    el("path", {d: "M70 -22 Q82 -18 86 -11 L72 -7 Z M70 22 Q82 18 86 12 L72 8 Z", fill: "#ffd9c2"}, a); g.k = k; return g; });
  s.nib = el("g", {}, s.stage); big(s.nib, "nibble, nibble!", 100, "#fff");
  s.o = rw(s); s.c = card(s.stage, "⏪ Rewind… you are a crab", "#c2452f", 46);
  const NB = [3.05, 3.65, 4.25];
  s.run = t => { const {u} = rwRun(s, s.o, t, N, false, false), t0 = T0(N), mv = ramp(u, -.3, 2.7), X = 1500 * (.6 * mv + .4 * clamp((u + .3) / 3)), go = 1 - ramp(u, 2.5, 2.8), bob = 6 * Math.sin(u * 34) * go;
    s.L.forEach(g => tf(g, `translate(${-X * g.sp} ${bob * g.sp})`)); tf(s.gr, `translate(${-X} ${bob})`); tf(s.leafG, `translate(${810 + 1500} 640)`);
    s.bite.forEach((b, i) => { const k = ramp(u, NB[i] + .2, NB[i] + .3); tf(b, `scale(${k})`); op(b, k > 0 ? 1 : 0); });
    s.cl.forEach((g, j) => { let r = 0; NB.forEach((a, i) => { if ((i % 2 ? 1 : -1) === g.k || i === 2) r = Math.max(r, Math.sin(Math.PI * clamp((u - a) / .5))); });
      tf(g, `translate(${810 + g.k * (520 - 230 * r)} ${1040 - 170 * r + bob * 2}) scale(${g.k} 1) rotate(${-14 * r})`); });
    tf(s.nib, `translate(810 300) scale(${Math.max(0, pop(t, t0 + 3.25, .35))}) rotate(-3)`); op(s.nib, on(u, 3.25, 4.7, .15));
    showC(s.c, t, t0 + .6, t0 + 4.75); };
  return s; })();

/* =====================================================================================================================
   POV LEAF (5 s): rewind. YOU are the mangrove leaf, still on the tree. Sunlight pours onto you; you make food from it. */
S.povLeaf = (() => { const s = scene("povLeaf", "#3b2a1a", "#3b2a1a"), N = "povLeaf", SUN = [1210, 150]; s.cam = el("g", {}, s.stage); const c = s.cam;
  fullRect(c, e8grad("linearGradient", {x1: 0, y1: 0, x2: 0, y2: 1}, [[0, "#3fa7ee"], [.6, "#c9ecff"]]));
  [[180, 520, 150], [520, 470, 110], [1500, 560, 140]].forEach(([x, y, r]) => { el("ellipse", {cx: x, cy: y, rx: r * 1.5, ry: r * .5, fill: "#fff", opacity: .85}, c); el("ellipse", {cx: x + r * .4, cy: y - r * .3, rx: r * .8, ry: r * .45, fill: "#fff", opacity: .85}, c); });
  s.glow = el("circle", {cx: SUN[0], cy: SUN[1], r: 260, fill: "#fff3a0", filter: "url(#blur)", opacity: .8}, c); s.sun = e8Sun(c, 92); tf(s.sun, `translate(${SUN[0]} ${SUN[1]})`);
  // the branch we hang on, with our neighbours
  el("path", {d: "M-200 120 Q200 150 520 300 Q660 370 810 470", fill: "none", stroke: INK, "stroke-width": 46, "stroke-linecap": "round"}, c); el("path", {d: "M-200 120 Q200 150 520 300 Q660 370 810 470", fill: "none", stroke: "#8a6548", "stroke-width": 32, "stroke-linecap": "round"}, c);
  [[60, 60, -150, 2.6], [250, 250, 120, 2.3], [330, 120, -60, 2.4], [560, 250, -110, 2.1], [-60, 300, 150, 2.6], [1700, 330, 160, 2.6], [1560, 420, 210, 2.2]].forEach(([x, y, a, k], i) => tf(e8Leaf(c, ["#2f7d4f", "#3f9a5f", "#27693f"][i % 3]), `translate(${x} ${y}) rotate(${a}) scale(${k}) translate(96 0)`));
  // us: our own blade, stretching away from the camera
  s.rays = el("g", {}, c); const LAND = [[520, 760], [760, 640], [1010, 700], [1240, 830], [840, 880]];
  s.blade = el("g", {}, c); el("path", e8A({d: "M-260 1080 Q120 560 810 430 Q1500 560 1880 1080 Z", fill: e8grad("linearGradient", {x1: 0, y1: 0, x2: 0, y2: 1}, [[0, "#57b874"], [1, "#2f8a52"]]), "stroke-width": 9}), s.blade);
  el("path", {d: "M810 440 V1080", stroke: "#bfe8a8", "stroke-width": 26, "stroke-linecap": "round"}, s.blade);
  const V = []; for (let i = 0; i < 5; i++) { const y = 540 + i * 110, w = 170 + i * 190; [-1, 1].forEach(k => { el("path", {d: `M810 ${y} Q${810 + k * w * .5} ${y + 10} ${810 + k * w} ${y + 90 + i * 14}`, fill: "none", stroke: "#bfe8a8", "stroke-width": 9 + i * 2, "stroke-linecap": "round", opacity: .9}, s.blade); V.push([810 + k * w * .7, y + 50 + i * 8, y]); }); }
  el("path", {d: "M330 900 Q560 620 800 520", fill: "none", stroke: "#fff", "stroke-width": 22, "stroke-linecap": "round", opacity: .22}, s.blade);
  s.beam = LAND.map(([x, y]) => el("path", {d: `M${SUN[0] - 20} ${SUN[1]} L${SUN[0] + 20} ${SUN[1]} L${x + 90} ${y} L${x - 90} ${y} Z`, fill: "#ffe14d", opacity: 0}, s.rays));
  s.spot = LAND.map(([x, y]) => el("ellipse", {cx: x, cy: y, rx: 110, ry: 44, fill: "#fff9c4", opacity: 0}, c));
  s.star = LAND.map(([x, y]) => { const g = el("g", {}, c); el("path", {d: "M0 -46 Q6 -6 46 0 Q6 6 0 46 Q-6 6 -46 0 Q-6 -6 0 -46 Z", fill: "#fff", stroke: "#ffbe0b", "stroke-width": 5, "stroke-linejoin": "round"}, g); g.x = x; g.y = y; return g; });
  s.food = V.concat(V).map(([x, y, y0], i) => ({e: el("circle", {r: 15, fill: "#fff3a0", stroke: "#f77f00", "stroke-width": 5}, c), x, y, y0, p: (i * .37) % 1}));
  s.lab = card(s.stage, "✨ Light in… food made!", "#f77f00", 50);
  s.o = rw(s); s.c = card(s.stage, "⏪ Rewind… you are a mangrove leaf", "#2a7d4f", 46);
  s.run = t => { const {u} = rwRun(s, s.o, t, N, false, false), t0 = T0(N);
    tf(s.sun.rays, `rotate(${u * 14}) scale(${1 + .12 * ramp(u, .6, 1.6)})`); op(s.glow, .6 + .3 * ramp(u, .6, 1.6));
    s.beam.forEach((b, i) => op(b, .6 * ramp(u, .7 + i * .22, 1.1 + i * .22) * (.85 + .15 * Math.sin(u * 6 + i))));
    s.spot.forEach((e, i) => op(e, .55 * ramp(u, 1.0 + i * .22, 1.3 + i * .22)));
    s.star.forEach((g, i) => { const a = 1.15 + i * .22, k = Math.max(0, pop(t, t0 + a, .3)) * (.75 + .35 * Math.sin(u * 9 + i * 2)); tf(g, `translate(${g.x} ${g.y - 20}) scale(${k}) rotate(${u * 60})`); op(g, on(u, a, 4.9, .15)); });
    s.food.forEach(f => { const k = ((u - 2.2) * .45 + f.p) % 1, a = clamp(k / .45), b = clamp((k - .45) / .55); set(f.e, "cx", lerp(f.x, 810, ease(a))); set(f.e, "cy", lerp(lerp(f.y, f.y0, ease(a)), 1060, b)); op(f.e, u > 2.2 + f.p * 1.2 ? Math.sin(Math.PI * clamp(k * 1.02)) : 0); });
    showC(s.lab, t, t0 + 2.2, t0 + 4.6, 330); showC(s.c, t, t0 + .6, t0 + 4.3); };
  return s; })();

/* =====================================================================================================================
   POV SUNLIGHT (3.5 s): rewind. YOU are sunlight: out of the Sun's glare, across space to the small blue Earth, down through
   the sky and into one mangrove leaf. (The Earth is far away and drawn as a plain blue dot: no made-up coastlines.) */
S.povSunlight = (() => { const s = scene("povSunlight", "#3b2a1a", "#3b2a1a"), N = "povSunlight"; s.cam = el("g", {}, s.stage); const c = s.cam;
  fullRect(c, "#0b1030"); seed = 17; s.st = []; for (let i = 0; i < 90; i++) s.st.push({e: el("line", {stroke: i % 5 ? "#fff" : "#ffe14d", "stroke-linecap": "round"}, c), a: rnd() * Math.PI * 2, p: rnd()});
  s.eg = el("circle", {cx: CX, cy: CY, fill: "#8fd3ff", filter: "url(#blur)", opacity: .7}, c); s.earth = el("circle", {cx: CX, cy: CY, fill: "#4ea8ff", stroke: "#dff4ff", "stroke-width": 4}, c);
  s.sky = fullRect(c, e8grad("linearGradient", {x1: 0, y1: 0, x2: 0, y2: 1}, [[0, "#3fa7ee"], [1, "#c9ecff"]]), 0);
  s.gnd = fullRect(c, "#7fa98a", 0); seed = 40; s.for = el("g", {}, c); for (let i = 0; i < 9; i++) { const a = i / 9 * Math.PI * 2 + rnd(), r = 520 + rnd() * 500; el("ellipse", e8A({cx: Math.cos(a) * r, cy: Math.sin(a) * r * .7, rx: 200 + rnd() * 120, ry: 150 + rnd() * 80, fill: ["#2f7d4f", "#27693f", "#3f8a5a"][i % 3]}), s.for); }
  s.cl = field(c, 16, 23, e => { el("ellipse", {rx: 260, ry: 80, fill: "#fff", opacity: .92}, e); el("ellipse", {cx: 90, cy: -50, rx: 150, ry: 70, fill: "#fff", opacity: .92}, e); }, .25);
  s.can = el("g", {}, c); el("ellipse", e8A({rx: 330, ry: 235, fill: "#27693f"}), s.can); seed = 4; for (let i = 0; i < 46; i++) { const a = rnd() * Math.PI * 2, r = Math.sqrt(rnd()) * 300; tf(e8Leaf(s.can, ["#2f7d4f", "#3f9a5f", "#27693f"][i % 3]), `translate(${Math.cos(a) * r} ${Math.sin(a) * r * .7}) rotate(${rnd() * 360}) scale(1.1)`); }
  s.leaf = el("g", {}, c); e8Leaf(s.leaf, "#4fb06c");
  s.sunB = fullRect(c, "#fff3a0", 0); s.fl = fullRect(s.stage, "#eaffd0", 0);
  s.me = fullRect(s.stage, e8grad("radialGradient", {cx: .5, cy: .5, r: .75}, [[.6, "#ffe14d", 0], [1, "#ffd000", .75]]));
  s.o = rw(s); s.c = card(s.stage, "☀️ …and it all started as sunlight!", "#f77f00", 50);
  s.run = t => { const {u} = rwRun(s, s.o, t, N, false, true), t0 = T0(N), D = DUR(N);
    s.st.forEach(o => { const k = ((o.p + u * 1.5) % 1 + 1) % 1, r = 30 + k * k * 1150, ca = Math.cos(o.a), sa = Math.sin(o.a); set(o.e, "x1", CX + ca * r); set(o.e, "y1", CY + sa * r * .62); set(o.e, "x2", CX + ca * r * 1.22); set(o.e, "y2", CY + sa * r * 1.22 * .62); set(o.e, "stroke-width", 2 + 7 * k); op(o.e, k); });
    const re = expo(7, 130, u / 1.55); set(s.earth, "r", re); set(s.eg, "r", re * 2.2);
    op(s.sunB, 1 - ramp(u, -.2, .7)); const sk = ramp(u, 1.4, 1.62); op(s.sky, sk); op(s.cl.G, sk * (1 - ramp(u, 2.7, 3.0))); flyField(s.cl, u * .55, 800);
    const kc = clamp((u - 1.75) / 1.2); tf(s.can, `translate(${CX} ${CY + 40}) scale(${expo(.08, 7, kc)})`); op(s.can, ramp(u, 1.75, 1.95)); op(s.gnd, ramp(u, 1.8, 2.1)); tf(s.for, `translate(${CX} ${CY + 40}) scale(${expo(.08, 7, kc)})`); op(s.for, ramp(u, 1.8, 2.0));
    const kl = clamp((u - 2.5) / .6); tf(s.leaf, `translate(${CX - 20} ${CY}) rotate(-20) scale(${expo(.05, 15, kl)})`); op(s.leaf, ramp(u, 2.5, 2.62));
    op(s.fl, on(u, 2.98, D + 1, .12)); showC(s.c, t, t0 + .45, t0 + D + .2); };
  return s; })();

/* =====================================================================================================================
   CHAIN FORWARD (5.5 s, outside): FAST-FORWARD. The whole chain snaps into a row, Sun -> leaf -> crab -> mudskipper ->
   crocodile; each arrow lights as the energy runs along it. One row of labels: the names. */
S.chainForward = (() => { const s = scene("chainForward", "#fff3b0", "#ffc971"), N = "chainForward", K = ["sun", "leaf", "crab", "skipper", "croc"], X = i => CX + (i - 2) * 352, Y = 440;
  s.cam = el("g", {}, s.stage); fullRect(s.cam, e8grad("linearGradient", {x1: 0, y1: 0, x2: .2, y2: 1}, [[0, "#fff3b0"], [1, "#ffc971"]]));
  s.streak = K.map((k, i) => el("rect", {x: -200, y: Y - 60, width: 10, height: 120, rx: 60, fill: "#fff", opacity: 0}, s.cam));
  s.arr = [0, 1, 2, 3].map(i => { const g = e8Arrow(s.cam, .5); g.x = X(i) + 176; return g; });
  s.items = K.map((k, i) => { const g = e8Item(s.cam, k, ["#ffbe0b", "#2a9d8f", "#f77f00", "#3a86ff", "#e63946"][i]); return g; });
  s.names = K.map((k, i) => tx(s.cam, {x: X(i), y: Y + 190, "text-anchor": "middle", "font-size": 42, "font-weight": 700, fill: INK}, E8NAME[k]));
  s.dot = el("g", {}, s.cam); el("circle", {r: 50, fill: "#ffe14d", filter: "url(#blur)"}, s.dot); el("circle", {r: 20, fill: "#fff", stroke: "#f77f00", "stroke-width": 6}, s.dot);
  s.title = card(s.stage, "🔗 A FOOD CHAIN", "#3a0ca3", 60);
  s.bars = [0, 1, 2, 3].map(() => el("rect", {x: FULL.x, width: FULL.w, fill: "#fff"}, s.stage));
  s.ff = el("g", {}, s.stage); tx(s.ff, {x: -90, y: 150, "font-size": 86, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 14}, "⏩ FAST-FORWARD");
  s.c = card(s.stage, "The arrows show where the energy goes: from the food to the eater", "#e63946", 40);
  const TI = i => .25 + i * .3, TA = j => 2.2 + j * .55;
  s.run = t => { const u = t - T0(N), t0 = T0(N), fx = 1 - ramp(u, 1.3, 1.8);
    s.items.forEach((g, i) => { const k = ramp(u, TI(i), TI(i) + .28), lit = on(u, i ? TA(i - 1) + .4 : TA(0) - .25, i ? TA(i - 1) + 1 : TA(0) + .3, .15); tf(g, `translate(${lerp(-400, X(i), k)} ${Y}) scale(${1.06 * (1 + .14 * lit)})`); op(g, k > 0 ? 1 : 0);
      set(s.streak[i], "x", lerp(-400, X(i), k) - 420 * (1 - k)); set(s.streak[i], "width", 420 * (1 - k) + 1); op(s.streak[i], .6 * (k > 0 && k < 1 ? 1 : 0)); op(s.names[i], ramp(u, TI(i) + .25, TI(i) + .5)); });
    s.arr.forEach((g, j) => { const k = ramp(u, TA(j), TA(j) + .4); op(g, ramp(u, 1.5 + j * .08, 1.8 + j * .08)); set(g.a, "fill", mix("#cfd3dc", "#ffbe0b", k)); tf(g, `translate(${g.x} ${Y}) scale(${1 + .4 * on(u, TA(j), TA(j) + .7, .2)})`); });
    const p = clamp((u - TA(0)) / .55, 0, 4), j = Math.min(3, Math.floor(p)), f = ease(p - j); tf(s.dot, `translate(${lerp(X(j), X(j + 1), f)} ${Y - 190 - 30 * Math.sin(Math.PI * f)})`); op(s.dot, on(u, TA(0) - .2, TA(3) + .9, .15));
    showC(s.title, t, t0 + 1.5, 1e9, 130); showC(s.c, t, t0 + 2.4, 1e9, 880);
    s.bars.forEach((b, j) => { const fr = Math.floor(t * 20); set(b, "y", -80 + hash(fr, j) * 1100); set(b, "height", 6 + hash(fr, j + 9) * 40); op(b, fx > .04 ? fx * (.2 + .4 * hash(fr, j + 5)) : 0); });
    op(s.ff, fx > .1 ? (Math.floor(t * 8) % 4 ? 1 : .35) : 0); };
  return s; })();
})();
