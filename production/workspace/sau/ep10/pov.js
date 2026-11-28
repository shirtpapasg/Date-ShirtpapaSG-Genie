/* TheOneApp, Explored EP10 "Dead things… become your food?!": the picture-only shots. Load after common.js and ep10/scenes.js.
   gardenFind (the silent cold open) · the hero sequence, in first person: YOU are a tiny bit of nutrient, a small green glowing
   speck with a face. povGrasshopper -> povDecompose -> povCompost -> povSpread -> povRoot -> povEaten -> circle (outside).
   "This is you": a soft green edge round the picture, and the speck with a face that the camera rides with.
   Science (rule 9): decomposers = bacteria and fungi; the earthworm is never labelled; only leaves, soil and plant scraps go in
   the bin; the nutrient goes into the root dissolved in water.
   Every frame depends only on t; "u" = seconds after the scene's t0 (u runs from about -0.6). */
(() => {
const CX = VP[0], CY = VP[1];
const T0 = n => (SC[n] ? SC[n].t0 : 0), DUR = n => (SC[n] ? SC[n].t1 - SC[n].t0 : 1);
const card = (p, text, col = INK, fs = 44) => chip(p, text, col, {fs});
const showC = (c, t, a, b, y = 905, x = CX) => { tf(c, `translate(${x} ${y}) scale(${Math.max(0, pop(t, a))})`); op(c, on(t, a, b, .25)); };
const lab = (p, text, col = INK, fs = 34) => chip(p, text, col, {fs});
const zoom = (c, z, fx, fy) => tf(c, `translate(${CX} ${CY}) scale(${z}) translate(${-fx} ${-fy})`);
const meEdge = p => vignette(p, "#52ffa8", .5);
const INSIDE = () => qGrad([[0, "#ead98a"], [1, "#9c8636"]], "radialGradient", {cx: .5, cy: .5, r: .75});
const cell = (e, i, r = 150) => { const b = blob(e, r, i % 2 ? "#f0e29c" : "#e2cf78", 20 + i); set(b, "stroke", "#8f7a2e"); el("circle", {cx: r * .12, cy: -r * .08, r: r * .2, fill: "#c9b458", opacity: .8}, e); return b; };

/* =====================================================================================================================
   GARDENFIND (5 s, the silent cold open): the school garden. The pupil walks in, spots a dead grasshopper on the soil
   and pokes it with a twig: "eww!" */
S.gardenFind = (() => { const s = scene("gardenFind", "#58b4ee", "#dff4ff"), N = "gardenFind"; s.cam = el("g", {}, s.stage); const c = s.cam, GX = 905, GY = 892;
  s.G = qGarden(c);
  s.dg = el("g", {}, c); tf(qDead(s.dg), "scale(.38)");
  s.kidG = el("g", {}, c); const K = s.kid = qKid(s.kidG);
  el("path", {d: "M0 112 L3 420 M2 300 L-22 262", fill: "none", stroke: INK, "stroke-width": 15, "stroke-linecap": "round"}, K.armN); el("path", {d: "M0 112 L3 420 M2 300 L-22 262", fill: "none", stroke: "#9c6b3f", "stroke-width": 8, "stroke-linecap": "round"}, K.armN);
  s.oh = el("ellipse", {cx: 52, cy: -364, rx: 11, ry: 13, fill: "#7a1c1c", stroke: INK, "stroke-width": 4, opacity: 0}, K.head);
  s.ex = qT(c, 0, 0, "!", 110, "#ffe14d"); s.eww = qT(s.stage, 0, 0, "eww!", 190, "#fff"); s.poke = [0, 1].map(() => { const g = el("g", {}, c); for (let i = 0; i < 5; i++) el("line", {x1: 14 * Math.cos(i * 1.2 - 2.6), y1: 14 * Math.sin(i * 1.2 - 2.6), x2: 34 * Math.cos(i * 1.2 - 2.6), y2: 34 * Math.sin(i * 1.2 - 2.6), stroke: "#fff", "stroke-width": 6, "stroke-linecap": "round"}, g); return g; });
  const P1 = 3.25, P2 = 3.75;
  s.run = t => { const u = t - T0(N), kw = clamp((u + .5) / 2.5), walking = kw < 1 ? 1 : 0, kx = lerp(-160, 715, kw), ph = u * 7.2;
    const kz = ramp(u, 1.7, 3.1); zoom(c, lerp(1, 2.05, kz), lerp(CX, 850, kz), lerp(CY, 735, kz));
    const pk = Math.max(on(u, P1 - .16, P1 + .2, .14), on(u, P2 - .16, P2 + .2, .14)), reach = ramp(u, 2.5, 3.0), back = ramp(u, 4.0, 4.3);
    tf(s.kidG, `translate(${kx} 880) scale(.6)`); qPose(K, walking * 26 * Math.sin(ph), lerp(-72, lerp(-52, -38, pk), reach) - 14 * back); tf(K.body, `translate(0 ${-8 * walking * Math.abs(Math.cos(ph))}) rotate(${5 * reach - 9 * back} 0 0)`);
    const sur = ramp(u, 2.0, 2.2), ew = ramp(u, 3.9, 4.05); tf(K.brow, `translate(0 ${-8 * sur - 4 * ew})`); op(K.m0, 1 - ew); op(s.oh, ew); tf(K.head, `rotate(${9 * reach * (1 - ew) - 7 * ew} 2 -330)`);
    tf(s.dg, `translate(${GX} ${GY}) rotate(${7 * Math.sin((u - P1) * 22) * on(u, P1, P1 + .4, .1) + 7 * Math.sin((u - P2) * 22) * on(u, P2, P2 + .4, .1)})`);
    tf(s.ex, `translate(${kx + 30} 548) scale(${Math.max(0, pop(u, 2.05, .3))})`); op(s.ex, on(u, 2.05, 2.8, .12));
    s.poke.forEach((g, i) => { const tt = i ? P2 : P1; tf(g, `translate(${GX - 28} ${GY - 40}) scale(${.6 + ramp(u, tt, tt + .25)})`); op(g, on(u, tt, tt + .3, .08)); });
    tf(s.eww, `translate(${CX + 420} 300) rotate(${-8 + 3 * Math.sin(u * 30) * (1 - ramp(u, 3.95, 4.4))}) scale(${Math.max(0, pop(u, 3.95, .3))})`); op(s.eww, ramp(u, 3.9, 4.0)); };
  return s; })();

/* =====================================================================================================================
   POVGRASSHOPPER (5 s): the dead grasshopper on the soil; we dive into it. Inside: YOU, a tiny bit of nutrient. */
S.povGrasshopper = (() => { const s = scene("povGrasshopper", "#b7e4a3", "#74c365"), N = "povGrasshopper";
  s.A = el("g", {}, s.stage); s.camA = el("g", {}, s.A); qClose(s.camA, 700); tf(qDead(s.camA), "translate(720 706) scale(2.15)");
  s.B = el("g", {}, s.stage); fullRect(s.B, INSIDE());
  s.cells = field(s.B, 24, 11, (e, i) => cell(e, i), .3); s.nf = field(s.B, 12, 5, e => qNut(e, 30, false), .34);
  s.meG = el("g", {}, s.B); s.me = qNut(s.meG, 84);
  s.you = el("g", {}, s.B); qT(s.you, 0, 0, "YOU", 76, "#ffe14d"); el("path", qA({d: "M-16 22 H16 V56 H36 L0 96 L-36 56 H-16 Z", fill: "#ffe14d", "stroke-width": 6}), s.you);
  s.vg = meEdge(s.stage); s.c = card(s.stage, "You are a tiny bit of nutrient, inside a dead grasshopper", "#2a9d8f", 40);
  s.run = t => { const u = t - T0(N), D = DUR(N), kd = ease((u - .35) / 1.15), kB = ramp(u, 1.15, 1.55);
    zoom(s.camA, 1 + 8 * kd * kd, lerp(CX, 620, kd), lerp(CY, 540, kd)); op(s.A, 1 - kB); op(s.B, kB); op(s.vg, kB);
    const off = .3 * ease((u - 1.1) / 1.2) + .035 * u; flyField(s.cells, off, 1000); flyField(s.nf, off * 1.3 + .2, 800);
    tf(s.meG, `translate(${CX} ${CY + 40 + 9 * Math.sin(u * 2.2)}) scale(${Math.max(0, pop(u, 1.5, .5))})`); s.me.blink(t);
    tf(s.you, `translate(${CX} ${CY - 250 + 8 * Math.sin(u * 6)}) scale(${Math.max(0, pop(u, 2.3, .35))})`); op(s.you, on(u, 2.3, 4.3, .2));
    showC(s.c, u, 1.9, D + .25); };
  return s; })();

/* =====================================================================================================================
   POVDECOMPOSE (6 s): the decomposers at work: rod and round bacteria and white fungus threads. The grasshopper breaks
   down, we drop free into the soil, and a small mushroom (the part of the fungus we can see) pops up. */
S.povDecompose = (() => { const s = scene("povDecompose", "#9c8636", "#9c8636"), N = "povDecompose";
  // B: the soil cut open (drawn first, shown second)
  s.B = el("g", {}, s.stage); const c = s.cam = el("g", {}, s.B);
  el("rect", {x: -900, y: -700, width: 3600, height: 1000, fill: qGrad([[0, "#58b4ee"], [1, "#dff4ff"]])}, c); const so = qSoil(c, 300, 6); set(so.r, "x", -900); set(so.r, "width", 3600); el("line", {x1: -900, y1: 300, x2: 2700, y2: 300, stroke: INK, "stroke-width": 6}, c);
  seed = 4; for (let i = 0; i < 30; i++) { const x = -160 + i * 66 + rnd() * 20; el("path", {d: `M${x} 302 l-8 -30 l10 18 l4 -34 l6 34 l10 -22 l-6 34 Z`, fill: "#5fb05a", stroke: INK, "stroke-width": 3, "stroke-linejoin": "round"}, c); }
  s.th = [["M700 318 Q660 420 560 470 Q480 520 420 640", 9], ["M560 470 Q520 440 440 450", 7], ["M700 318 Q760 400 860 440 Q960 480 1010 600", 9], ["M860 440 Q940 400 1000 380 Q1060 350 1092 306", 9], ["M1010 600 Q1100 640 1200 610", 7], ["M420 640 Q380 720 300 740", 7], ["M1092 306 Q1160 380 1260 400", 7]].map(([d, w]) => qThread(c, d, w));
  s.bac = []; for (let i = 0; i < 22; i++) { const g = qBact(c, i % 3 === 0, 1.15); g.x = 560 + rnd() * 330; g.y = 328 + rnd() * 130; g.r = rnd() * 180; g.ph = rnd() * 6; s.bac.push(g); }
  s.husk = el("g", {}, c); tf(qDead(s.husk), "scale(1.25)"); s.bits = []; for (let i = 0; i < 9; i++) { const g = el("path", qA({d: "M-14 -8 L10 -12 L14 6 L-8 12 Z", fill: i % 2 ? "#b9b277" : "#8f8a55", "stroke-width": 4}), c); g.x = 600 + i * 28; g.r = rnd() * 360; s.bits.push(g); }
  s.mush = el("g", {}, c); qMush(s.mush);
  s.nuts = []; for (let i = 0; i < 9; i++) { const n = qNut(c, 16, false); n.x = 560 + rnd() * 420; n.y = 420 + rnd() * 330; n.d = rnd() * .7; s.nuts.push(n); }
  s.meG = el("g", {}, c); s.me = qNut(s.meG, 46);
  s.l1 = lab(s.B, "bacteria", "#178a80"); s.l2 = lab(s.B, "fungus threads", "#7f5539"); s.l3 = lab(s.B, "mushroom (a fungus)", "#bc6c25");
  // A: inside the grasshopper
  s.A = el("g", {}, s.stage); fullRect(s.A, INSIDE()); seed = 19;
  s.cells = []; for (let i = 0; i < 15; i++) { const g = el("g", {}, s.A); g.x = -60 + (i % 5) * 430 + rnd() * 120; g.y = 80 + Math.floor(i / 5) * 380 + rnd() * 120; g.k = .9 + rnd() * .8; g.a = .7 + rnd() * 1.3; cell(g, i, 170); s.cells.push(g); }
  s.thA = ["M-170 -60 Q200 120 420 330 Q560 470 720 440", "M420 330 Q380 520 200 640", "M1790 60 Q1400 180 1220 380 Q1120 500 960 520", "M1220 380 Q1320 560 1500 660", "M-170 1000 Q300 880 560 700 Q640 640 700 560", "M1790 940 Q1400 900 1160 720 Q1040 640 960 620"].map(d => qThread(s.A, d, 14));
  s.bacA = []; for (let i = 0; i < 30; i++) { const g = qBact(s.A, i % 3 === 0, 2.1), an = rnd() * 6.28; g.x = 120 + rnd() * 1380; g.y = 60 + rnd() * 800; g.sx = CX + Math.cos(an) * 1400; g.sy = CY + Math.sin(an) * 900; g.d = rnd() * 1.0; g.r = rnd() * 180; g.ph = rnd() * 6; s.bacA.push(g); }
  s.meA = el("g", {}, s.A); s.me2 = qNut(s.meA, 84);
  s.la = lab(s.A, "bacteria", "#178a80", 44); s.lb = lab(s.A, "fungus threads", "#7f5539", 44);
  s.vg = meEdge(s.stage); s.c = card(s.stage, "Decomposers break it down… you're back in the soil!", "#7f5539", 42);
  s.run = t => { const u = t - T0(N), D = DUR(N), kB = ramp(u, 2.15, 2.6);
    op(s.A, 1 - kB); op(s.B, kB > 0 ? 1 : 0);
    if (kB < 1) { s.cells.forEach(g => { const k = 1 - ramp(u, g.a, g.a + .8); tf(g, `translate(${g.x} ${g.y}) scale(${g.k * k})`); op(g, k); });
      s.thA.forEach((T, i) => T.grow(ramp(u, .2 + i * .15, 1.5 + i * .15)));
      s.bacA.forEach(g => { const k = ease((u + .2 - g.d) / .9); tf(g, `translate(${lerp(g.sx, g.x, k) + 8 * Math.sin(u * 5 + g.ph)} ${lerp(g.sy, g.y, k) + 8 * Math.cos(u * 4 + g.ph)}) rotate(${g.r + 20 * Math.sin(u * 3 + g.ph)})`); });
      tf(s.meA, `translate(${CX} ${CY + 40 + 9 * Math.sin(u * 2.2) + 500 * ramp(u, 2.0, 2.6)})`); s.me2.blink(t);
      qPop(s.la, 400, 200, u, .9); qPop(s.lb, 1230, 250, u, 1.4); }
    // B
    const kz = ramp(u, 2.7, 3.9); zoom(c, lerp(2.3, 1, kz), lerp(700, CX, kz), lerp(350, CY, kz));
    const hk = ramp(u, 2.3, 4.0); tf(s.husk, `translate(700 300) scale(${1 - .25 * hk})`); op(s.husk, 1 - hk);
    s.bits.forEach((g, i) => { const k = ramp(u, 2.6 + i * .12, 3.6 + i * .12); tf(g, `translate(${g.x} ${lerp(286, 300 + 20 + i * 4, k)}) rotate(${g.r}) scale(${1 - .7 * k})`); op(g, on(u, 2.5 + i * .12, 4.6 + i * .1, .3)); });
    s.th.forEach(T => T.grow(1)); s.bac.forEach(g => tf(g, `translate(${g.x + 5 * Math.sin(u * 5 + g.ph)} ${g.y + 5 * Math.cos(u * 4 + g.ph)}) rotate(${g.r + 20 * Math.sin(u * 3 + g.ph)})`));
    s.nuts.forEach(n => { const k = clamp((u - 2.6 - n.d) / .9); tf(n, `translate(${lerp(700, n.x, k)} ${lerp(290, n.y, k * k)})`); op(n, k > 0 ? 1 : 0); });
    const kf = clamp((u - 2.55) / .95), bn = 26 * Math.sin(Math.PI * clamp((u - 3.5) / .4)) ; tf(s.meG, `translate(${lerp(700, 800, kf)} ${lerp(280, 640, kf * kf) - bn + 4 * Math.sin(u * 2.4)})`); s.me.blink(t);
    tf(s.mush, `translate(1092 302) scale(${1.5 * Math.max(0, pop(u, 4.2, .5))})`);
    qPop(s.l1, 520, 250, u, 3.9); qPop(s.l2, 330, 560, u, 4.1); qPop(s.l3, 1300, 180, u, 4.5);
    showC(s.c, u, 2.9, D + .25); };
  return s; })();

/* ---- inside the compost bin, cut open (full screen): the walls, the open top, a heap of soil and dead leaves with fruit and
   vegetable peels on it. g.fresh = the new heap (g.peels and g.leaves are its things: e, x, y, r); g.done = the dark, crumbly
   compost it turns into; g.glow = the warm middle; g.front = a layer in front of the heap. */
const heapY = x => 610 + 110 * Math.pow((x - 810) / 660, 2);
function binIn(p) { const g = el("g", {}, p); fullRect(g, "#1a130d");
  el("rect", {x: 150, y: -80, width: 1320, height: 1120, fill: qGrad([[0, "#2f5d47"], [1, "#12241b"]])}, g); for (let x = 370; x < 1470; x += 220) el("line", {x1: x, y1: -80, x2: x, y2: 1040, stroke: INK, "stroke-width": 5, opacity: .3}, g);
  el("rect", {x: 150, y: -80, width: 1320, height: 150, fill: qGrad([[0, "#dff4ff"], [1, "#dff4ff", 0]])}, g);
  g.back = el("g", {}, g);
  g.fresh = el("g", {}, g); el("path", qA({d: "M150 1040 V720 Q480 580 810 610 Q1140 580 1470 720 V1040 Z", fill: "#5c3d2e"}), g.fresh);
  seed = 61; for (let i = 0; i < 50; i++) { const x = 190 + rnd() * 1240; el("ellipse", {cx: x, cy: heapY(x) + 40 + rnd() * 300, rx: 8 + rnd() * 20, ry: 5 + rnd() * 10, fill: ["#4a2f20", "#7a5234", "#3b2416"][i % 3], opacity: .85}, g.fresh); }
  g.leaves = []; for (let i = 0; i < 12; i++) { const x = 250 + i * 104 + rnd() * 40, e = qDry(g.fresh, ["#b07a3c", "#96652e", "#c99a4f"][i % 3]); g.leaves.push({e, x, y: heapY(x) + 16 + rnd() * 60, r: rnd() * 80 - 40, k: 1.5}); }
  g.peels = []; [["banana", 420], ["apple", 600], ["leaf", 1010], ["orange", 1200], ["carrot", 760], ["banana", 1330], ["leaf", 300], ["apple", 900]].forEach(([k, x], i) => { const e = qPeel(g.fresh, k); g.peels.push({e, x, y: heapY(x) - 12 + (i % 2) * 14, r: rnd() * 60 - 30, k: 1.35}); });
  g.place = () => g.leaves.concat(g.peels).forEach(o => tf(o.e, `translate(${o.x} ${o.y}) rotate(${o.r}) scale(${o.k})`)); g.place();
  g.done = el("g", {opacity: 0}, g); el("path", qA({d: "M150 1040 V770 Q480 670 810 690 Q1140 670 1470 770 V1040 Z", fill: "#2a170d"}), g.done);
  for (let i = 0; i < 130; i++) { const x = 180 + rnd() * 1260; el("circle", {cx: x, cy: 700 + 80 * Math.pow((x - 810) / 660, 2) + 14 + rnd() * 320, r: 5 + rnd() * 12, fill: ["#4a2f20", "#120a06", "#5c3d2e", "#3b2416"][i % 4]}, g.done); }
  g.glow = el("circle", {cx: 810, cy: 800, r: 240, fill: "#ff922b", filter: "url(#blur)", opacity: 0, style: "mix-blend-mode:screen"}, g);
  g.front = el("g", {}, g);
  el("rect", qA({x: -190, y: -100, width: 340, height: 1160, fill: "#2d6a4f"}), g); el("rect", qA({x: 1470, y: -100, width: 340, height: 1160, fill: "#2d6a4f"}), g); [[-60, 1], [1600, 1]].forEach(([x]) => el("line", {x1: x, y1: -80, x2: x, y2: 1040, stroke: INK, "stroke-width": 5, opacity: .25}, g));
  return g; }

/* =====================================================================================================================
   POVCOMPOST (6 s): a rake scoops us up with dead leaves and into the school compost bin. Canteen fruit and vegetable peels
   tumble in. It gets warm (a gentle steam), the decomposers are busy and an earthworm passes. */
S.povCompost = (() => { const s = scene("povCompost", "#1a130d", "#1a130d"), N = "povCompost";
  s.B = el("g", {}, s.stage); s.bin = binIn(s.B); const bn = s.bin;
  s.bac = []; seed = 71; for (let i = 0; i < 16; i++) { const x = 300 + rnd() * 1020, g = qBact(bn.front, i % 3 === 0, 1.5); g.x = x; g.y = heapY(x) + 40 + rnd() * 150; g.r = rnd() * 180; g.ph = rnd() * 6; s.bac.push(g); }
  s.thr = [["M560 1040 Q600 860 720 800 Q800 760 860 690", 8], ["M720 800 Q640 760 560 770", 6], ["M1100 1040 Q1080 900 980 840 Q920 800 900 720", 8], ["M980 840 Q1080 800 1160 810", 6]].map(([d, w]) => qThread(bn.front, d, w));
  s.steam = [0, 1, 2, 3, 4].map(() => el("path", {fill: "none", stroke: "#fff", "stroke-width": 16, "stroke-linecap": "round", opacity: 0}, bn.front));
  s.worm = qWorm(bn.front, 1.25);
  s.meG = el("g", {}, bn.front); s.me = qNut(s.meG, 56);
  s.warm = lab(s.B, "🌡️ warm inside!", "#f76707", 42); s.lp = lab(s.B, "fruit and vegetable peels", INK, 34); s.ll = lab(s.B, "dead leaves", INK, 34);
  // A: on the ground, the rake arrives
  s.A = el("g", {}, s.stage); qClose(s.A, 640);
  s.lv = []; seed = 33; for (let i = 0; i < 11; i++) { const e = qDry(s.A, ["#b07a3c", "#96652e", "#c99a4f"][i % 3]); s.lv.push({e, x: 420 + i * 70 + rnd() * 30, y: 690 + rnd() * 110, r: rnd() * 90 - 45}); }
  s.clump = el("g", {}, s.A); blob(s.clump, 96, "#5c3d2e", 9); s.meA = qNut(s.clump, 50);
  s.rake = el("g", {}, s.A); el("path", {d: "M0 -70 L760 -900", stroke: INK, "stroke-width": 40, "stroke-linecap": "round"}, s.rake); el("path", {d: "M0 -70 L760 -900", stroke: "#d9a066", "stroke-width": 28, "stroke-linecap": "round"}, s.rake);
  for (let i = 0; i < 9; i++) { const x = -160 + i * 40; el("path", {d: `M${x} -70 Q${x - 6} 10 ${x - 34} 70`, fill: "none", stroke: INK, "stroke-width": 20, "stroke-linecap": "round"}, s.rake); el("path", {d: `M${x} -70 Q${x - 6} 10 ${x - 34} 70`, fill: "none", stroke: "#adb5bd", "stroke-width": 11, "stroke-linecap": "round"}, s.rake); }
  el("rect", qA({x: -184, y: -92, width: 368, height: 40, rx: 14, fill: "#868e96"}), s.rake);
  s.streak = el("g", {}, s.stage); for (let i = 0; i < 14; i++) el("rect", {x: -170, y: -40 + i * 80 + (i % 3) * 20, width: 1960, height: 10 + (i % 4) * 8, fill: "#fff", opacity: .5}, s.streak);
  s.vg = meEdge(s.stage); s.c = card(s.stage, "Into the compost bin, with leaves and food scraps", "#2d6a4f", 42);
  s.run = t => { const u = t - T0(N), D = DUR(N), kw = ease((u - 1.75) / .5);
    // A: the rake sweeps left, pushing leaves and our clump of soil
    const rx = lerp(2050, 560, ease((u - .1) / 1.6)), lift = ramp(u, 1.3, 1.9);
    tf(s.A, `translate(${2200 * kw} 0)`); op(s.A, kw < 1 ? 1 : 0); tf(s.rake, `translate(${rx} ${640 - 150 * lift}) rotate(${-6 * lift})`);
    s.lv.forEach(o => { const x = Math.min(o.x, rx - 150 + (o.x % 90)); tf(o.e, `translate(${x} ${o.y - (x < o.x ? 150 * lift + 20 : 0)}) rotate(${o.r + (o.x - x) * .6}) scale(1.5)`); });
    const cx0 = Math.min(760, rx - 250); tf(s.clump, `translate(${cx0} ${700 - (cx0 < 760 ? 150 * lift + 10 : 0)}) rotate(${(760 - cx0) * .2})`); s.meA.blink(t);
    op(s.streak, on(u, 1.7, 2.3, .2) * .5); tf(s.streak, `translate(${((u * 3000) % 300)} 0)`);
    // B: inside the bin
    tf(s.B, `translate(${-2200 * (1 - kw)} 0)`);
    bn.leaves.forEach((o, i) => { const k = clamp((u - 2.15 - i * .04) / .6); tf(o.e, `translate(${o.x - 300 * (1 - k)} ${lerp(-200, o.y, k * k)}) rotate(${o.r + 300 * (1 - k)}) scale(${o.k})`); });
    bn.peels.forEach((o, i) => { const k = clamp((u - 2.9 - i * .2) / .7), bnc = 22 * Math.sin(Math.PI * clamp((u - 3.6 - i * .2) / .3)); tf(o.e, `translate(${o.x + 120 * (1 - k)} ${lerp(-240, o.y, k * k) - bnc}) rotate(${o.r + 420 * (1 - k)}) scale(${o.k})`); });
    const km = clamp((u - 2.2) / .65), mb = 30 * Math.sin(Math.PI * clamp((u - 2.85) / .35)); tf(s.meG, `translate(${lerp(500, 810, km)} ${lerp(-200, 660, km * km) - mb + 4 * Math.sin(u * 2.4)})`); s.me.blink(t);
    const kwm = ramp(u, 3.6, 5.4); op(bn.glow, .75 * kwm * (.88 + .12 * Math.sin(u * 3)));
    s.steam.forEach((p, i) => { const f = ((u * .4 + i / 5) % 1), x = 480 + i * 165, y = heapY(x) - 30 - f * 330; set(p, "d", `M${x} ${y} q26 -34 0 -68 q-26 -34 0 -68`); op(p, kwm * .85 * Math.sin(Math.PI * f)); });
    s.bac.forEach((g, i) => { tf(g, `translate(${g.x + 5 * Math.sin(u * 5 + g.ph)} ${g.y + 5 * Math.cos(u * 4 + g.ph)}) rotate(${g.r + 20 * Math.sin(u * 3 + g.ph)}) scale(${Math.max(0, pop(u, 3.9 + i * .08, .3))})`); });
    s.thr.forEach((T, i) => T.grow(ramp(u, 3.8 + i * .2, 5.2 + i * .2)));
    s.worm.run(u * 9); tf(s.worm, `translate(${lerp(-80, 1500, clamp((u - 3.4) / 3.2))} 850)`);
    qPop(s.ll, 330, 520, u, 2.9); qPop(s.lp, 1160, 470, u, 3.9); [s.ll, s.lp].forEach(e => op(e, +e.getAttribute("opacity") * (1 - ramp(u, 4.6, 4.9)))); qPop(s.warm, 1150, 380, u, 5.0);
    op(s.vg, .6 + .4 * kw); showC(s.c, u, 2.6, D + .25); };
  return s; })();

/* =====================================================================================================================
   POVSPREAD (5 s): weeks pass in the bin (the calendar flips, days and nights flicker): the heap turns into dark, crumbly
   compost. Then it is spread on a vegetable bed of chye sim, and we land beside a plant. */
S.povSpread = (() => { const s = scene("povSpread", "#1a130d", "#1a130d"), N = "povSpread";
  s.A = el("g", {}, s.stage); s.bin = binIn(s.A); const bn = s.bin; op(bn.glow, .6);
  s.night = fullRect(s.A, "#0b1030", 0); s.meA = el("g", {}, s.A); s.me1 = qNut(s.meA, 56);
  s.cal = el("g", {}, s.A); el("rect", qA({x: -150, y: -110, width: 300, height: 230, rx: 26, fill: "#fff", "stroke-width": 7, filter: "url(#sh)"}), s.cal); el("rect", {x: -150, y: -110, width: 300, height: 74, rx: 26, fill: "#e63946"}, s.cal); el("rect", {x: -150, y: -70, width: 300, height: 34, fill: "#e63946"}, s.cal); el("rect", qA({x: -150, y: -110, width: 300, height: 230, rx: 26, fill: "none", "stroke-width": 7}), s.cal);
  [-80, 80].forEach(x => el("rect", qA({x: x - 10, y: -136, width: 20, height: 50, rx: 8, fill: "#ced4da", "stroke-width": 5}), s.cal)); tx(s.cal, {x: 0, y: -52, "text-anchor": "middle", "font-size": 40, "font-weight": 700, fill: "#fff"}, "WEEK"); s.wk = tx(s.cal, {x: 0, y: 90, "text-anchor": "middle", "font-size": 130, "font-weight": 700, fill: INK}, "1");
  // B: the vegetable bed
  s.B = el("g", {}, s.stage); fullRect(s.B, qGrad([[0, "#58b4ee"], [.6, "#dff4ff"]])); el("rect", {x: -170, y: 430, width: 1960, height: 220, fill: "#8fce7e"}, s.B); el("rect", {x: -170, y: 380, width: 1960, height: 60, fill: "#6ab36a", opacity: .7}, s.B);
  qSoil(s.B, 640, 12); el("line", {x1: -170, y1: 640, x2: 1790, y2: 640, stroke: INK, "stroke-width": 6}, s.B);
  s.comp = el("g", {}, s.B); el("path", qA({d: "M240 644 Q300 596 500 600 Q810 586 1120 600 Q1330 598 1390 644 Z", fill: "#2a170d", "stroke-width": 5}), s.comp); seed = 15; for (let i = 0; i < 40; i++) { const x = 300 + rnd() * 1040; el("circle", {cx: x, cy: 612 + rnd() * 24, r: 4 + rnd() * 7, fill: i % 2 ? "#4a2f20" : "#120a06"}, s.comp); }
  [150, 640, 1130, 1620].forEach((x, i) => tf(qVeg(s.B), `translate(${x} 640) scale(${2.2 + .15 * (i % 2)})`));
  s.cr = []; for (let i = 0; i < 46; i++) s.cr.push({e: el("circle", {r: 6 + rnd() * 9, fill: ["#4a2f20", "#2a170d", "#5c3d2e"][i % 3], stroke: INK, "stroke-width": 3}, s.B), x: 330 + rnd() * 980, d: rnd() * 1.5});
  s.tr = el("g", {}, s.B); el("rect", qA({x: 150, y: -34, width: 250, height: 54, rx: 24, fill: "#d9a066"}), s.tr); el("rect", qA({x: 90, y: -16, width: 80, height: 20, fill: "#868e96", "stroke-width": 5}), s.tr); el("path", qA({d: "M100 -50 Q-60 -70 -200 0 Q-60 66 100 44 Z", fill: "#ced4da"}), s.tr); el("path", {d: "M70 -24 Q-40 -34 -130 0", fill: "none", stroke: "#fff", "stroke-width": 8, "stroke-linecap": "round", opacity: .7}, s.tr);
  s.meB = el("g", {}, s.B); s.me2 = qNut(s.meB, 50);
  s.l1 = lab(s.B, "compost", "#3b2416", 40); s.l2 = lab(s.B, "chye sim", "#2d6a4f", 40);
  s.vg = meEdge(s.stage); s.c = card(s.stage, "Compost: food for plants!", "#6a994e", 50);
  s.run = t => { const u = t - T0(N), D = DUR(N), kB = ramp(u, 1.95, 2.3), kt = clamp((u - .15) / 1.6), wk = Math.min(8, 1 + Math.floor(kt * 8)), kd = ramp(u, .35, 1.6);
    op(s.A, 1 - kB); op(s.B, kB);
    op(bn.fresh, 1 - kd); op(bn.done, kd); op(bn.glow, .6 * (1 - kd)); op(s.night, kt > 0 && kt < 1 ? .5 * Math.pow(Math.max(0, Math.sin(kt * 8 * 2 * Math.PI)), .7) : 0);
    s.wk.textContent = String(wk); tf(s.cal, `translate(360 250) rotate(-5) scale(${Math.max(0, pop(u, -.2)) * (1 + .1 * (1 - clamp(((kt * 8) % 1) * 4)) * (kt > 0 && kt < 1 ? 1 : 0))})`);
    tf(s.meA, `translate(810 ${lerp(660, 720, kd) + 4 * Math.sin(u * 2.4)})`); s.me1.blink(t);
    // B
    const TX = 1330, TY = 230, pour = ramp(u, 2.25, 2.6); tf(s.tr, `translate(${TX + 160} ${TY - 60}) rotate(${-8 - 26 * pour + 5 * Math.sin(u * 9) * pour})`);
    s.cr.forEach(o => { const k = clamp((u - 2.45 - o.d) / .75); set(o.e, "cx", lerp(TX - 40, o.x, k)); set(o.e, "cy", lerp(TY + 10, 626, k * k) - 60 * Math.sin(Math.PI * k) * (1 - k)); op(o.e, k > 0 ? (k < 1 ? 1 : 1 - ramp(u, 4.0, 4.4) * .0) : 0); });
    op(s.comp, ramp(u, 2.9, 4.1)); tf(s.comp, `translate(0 ${12 * (1 - ramp(u, 2.9, 4.1))})`);
    const km = clamp((u - 2.6) / .8), mb = 26 * Math.sin(Math.PI * clamp((u - 3.4) / .35)); tf(s.meB, `translate(${lerp(TX - 40, 880, km)} ${lerp(TY, 580, km * km) - 80 * Math.sin(Math.PI * km) * (1 - km) - mb + 3 * Math.sin(u * 2.4)})`); op(s.meB, km > 0 ? 1 : 0); s.me2.blink(t);
    qPop(s.l1, 1130, 720, u, 3.7); qPop(s.l2, 640, 150, u, 3.3);
    showC(s.c, u, 3.0, D + .25); };
  return s; })();

/* =====================================================================================================================
   POVROOT (6 s): under the vegetable bed. Water trickles down; we dissolve in it; a root hair takes the water (and us) in;
   we shoot up the stem and arrive in a leaf. */
S.povRoot = (() => { const s = scene("povRoot", "#3b2416", "#3b2416"), N = "povRoot";
  s.A = el("g", {}, s.stage); const c = s.cam = el("g", {}, s.A); { const so = qSoil(c, -400, 9); set(so.r, "x", -900); set(so.r, "width", 3600); set(so.r, "height", 1900); }
  el("rect", {x: -900, y: -400, width: 3600, height: 380, fill: "#2a170d"}, c);
  s.wat = [["M300 -80 Q340 100 280 260 Q240 380 330 480 Q380 540 400 560", 30], ["M520 -80 Q480 120 540 300 Q580 420 470 520", 24], ["M90 -80 Q140 200 80 420 Q60 560 260 620 Q340 640 380 600", 22]].map(([d, w]) => { const p = el("path", {d, fill: "none", stroke: "#4dabf7", "stroke-width": w, "stroke-linecap": "round", pathLength: 100, opacity: .85}, c); return p; });
  s.pool = el("ellipse", {cx: 420, cy: 580, rx: 190, ry: 130, fill: "#74c0fc", opacity: 0, stroke: "#d0ebff", "stroke-width": 6}, c);
  // the root with its root hairs
  seed = 27; s.hairs = el("g", {}, c); for (let i = 0; i < 22; i++) { const y = -40 + i * 50, sd = i % 2 ? 1 : -1, x0 = 1140 - y * .09 + sd * 40, L = 90 + rnd() * 150; const d = `M${x0} ${y} q${sd * L * .5} ${rnd() * 30 - 15} ${sd * L} ${rnd() * 60 - 20}`; el("path", {d, fill: "none", stroke: INK, "stroke-width": 15, "stroke-linecap": "round"}, s.hairs); el("path", {d, fill: "none", stroke: "#f6ead0", "stroke-width": 8, "stroke-linecap": "round"}, s.hairs); }
  const HD = "M1090 540 Q900 500 640 566"; el("path", {d: HD, fill: "none", stroke: INK, "stroke-width": 52, "stroke-linecap": "round"}, c); el("path", {d: HD, fill: "none", stroke: "#f6ead0", "stroke-width": 40, "stroke-linecap": "round"}, c); s.hw = el("path", {d: "M640 566 Q900 500 1090 540", fill: "none", stroke: "#74c0fc", "stroke-width": 22, "stroke-linecap": "round", pathLength: 100, opacity: .9}, c);
  el("path", qA({d: "M1090 -400 Q1130 300 1040 1100 H1180 Q1230 300 1250 -400 Z", fill: "#f1e3c6", "stroke-width": 7}), c); s.rw = el("path", {d: "M1120 560 Q1160 200 1170 -400", fill: "none", stroke: "#74c0fc", "stroke-width": 34, "stroke-linecap": "round", pathLength: 100, opacity: .85}, c);
  el("path", {d: "M1150 -380 Q1180 300 1110 1080", fill: "none", stroke: "#fff", "stroke-width": 10, "stroke-linecap": "round", opacity: .35}, c);
  s.meG = el("g", {}, c); s.drop = el("circle", {r: 92, fill: "#74c0fc", opacity: 0, stroke: "#e7f5ff", "stroke-width": 6}, s.meG); s.me = qNut(s.meG, 54);
  s.l1 = lab(s.A, "water", "#1c7ed6", 40); s.l2 = lab(s.A, "root hair", "#8a6548", 40); s.l3 = lab(s.A, "nutrients dissolve in the water", "#2a9d8f", 38);
  // B: up the stem
  s.B = el("g", {}, s.stage); fullRect(s.B, qGrad([[0, "#eaffd0"], [1, "#74c365"]], "radialGradient", {cx: .5, cy: .5, r: .7}));
  s.tun = tunnelG(s.B, 12, (e, i) => { el("circle", {r: 300, fill: "none", stroke: INK, "stroke-width": 40}, e); el("circle", {r: 300, fill: "none", stroke: i % 2 ? "#57b85a" : "#8fd67a", "stroke-width": 30}, e); });
  s.dr = field(s.B, 16, 4, e => { el("circle", {r: 60, fill: "#74c0fc", stroke: "#e7f5ff", "stroke-width": 8, opacity: .9}, e); el("circle", {cx: -20, cy: -22, r: 14, fill: "#fff", opacity: .8}, e); }, .3);
  s.meB = el("g", {}, s.B); el("circle", {r: 120, fill: "#74c0fc", opacity: .6, stroke: "#e7f5ff", "stroke-width": 7}, s.meB); s.me2 = qNut(s.meB, 72); s.l4 = lab(s.B, "up the stem!", "#2d6a4f", 46);
  // C: in the leaf
  s.C = el("g", {}, s.stage); fullRect(s.C, qGrad([[0, "#c8f7a0"], [1, "#4caf50"]])); seed = 51;
  for (let r = 0; r < 7; r++) for (let q = 0; q < 11; q++) { const x = -150 + q * 180 + (r % 2) * 90, y = -40 + r * 160; el("rect", {x, y, width: 164, height: 144, rx: 44, fill: "#8fe07a", stroke: "#3b8f3e", "stroke-width": 5, opacity: .9}, s.C); for (let k = 0; k < 4; k++) el("ellipse", {cx: x + 36 + rnd() * 92, cy: y + 34 + rnd() * 76, rx: 15, ry: 10, fill: "#2f9e44", opacity: .85}, s.C); }
  el("path", {d: "M-170 760 Q700 560 1790 240", fill: "none", stroke: "#3b8f3e", "stroke-width": 64, "stroke-linecap": "round"}, s.C); el("path", {d: "M-170 760 Q700 560 1790 240", fill: "none", stroke: "#d9f7b0", "stroke-width": 44, "stroke-linecap": "round"}, s.C);
  ["M420 640 Q500 380 760 180", "M900 520 Q1000 300 1300 120", "M620 600 Q820 800 1100 900", "M1180 440 Q1380 620 1700 660"].forEach(d => { el("path", {d, fill: "none", stroke: "#3b8f3e", "stroke-width": 34, "stroke-linecap": "round"}, s.C); el("path", {d, fill: "none", stroke: "#d9f7b0", "stroke-width": 20, "stroke-linecap": "round"}, s.C); });
  s.sun = el("circle", {cx: 1520, cy: 60, r: 330, fill: "#fff7ae", filter: "url(#blur)", opacity: .85}, s.C); s.meC = el("g", {}, s.C); s.me3 = qNut(s.meC, 90); s.l5 = lab(s.C, "…up the stem, and into a leaf!", "#2d6a4f", 46);
  s.flash = fullRect(s.stage, "#fff", 0); s.vg = meEdge(s.stage); s.c = card(s.stage, "Taken in by the roots", "#2a9d8f", 52);
  const hp = k => { const a = [640, 566], q = [900, 500], b = [1090, 540], v = 1 - k; return [v * v * a[0] + 2 * v * k * q[0] + k * k * b[0], v * v * a[1] + 2 * v * k * q[1] + k * k * b[1]]; };
  s.run = t => { const u = t - T0(N), D = DUR(N), kB = ramp(u, 2.75, 3.0), kC = ramp(u, 3.95, 4.15);
    op(s.A, 1 - kB); op(s.B, kB * (1 - kC)); op(s.C, kC);
    const kz = ramp(u, 1.2, 2.8); zoom(c, lerp(1, 1.7, kz), lerp(CX, 980, kz), lerp(CY, 500, kz));
    s.wat.forEach((p, i) => set(p, "stroke-dasharray", `${100 * ramp(u, -.4 + i * .15, .7 + i * .15)} 200`)); op(s.pool, .55 * ramp(u, .5, .9)); op(s.drop, .6 * ramp(u, .6, 1.0));
    const k1 = ease((u - 1.5) / .5), k2 = clamp((u - 2.0) / .55), k3 = clamp((u - 2.55) / .3); let x = lerp(420, 640, k1), y = lerp(580, 566, k1); if (k2 > 0) [x, y] = hp(k2); if (k3 > 0) { x = lerp(1090, 1140, k3); y = lerp(540, 540 - 420 * k3, k3); }
    tf(s.meG, `translate(${x} ${y + 4 * Math.sin(u * 2.4) * (1 - k1)}) scale(${1 - .45 * ramp(u, 1.6, 2.1)})`); s.me.blink(t);
    set(s.hw, "stroke-dasharray", `${100 * ramp(u, 1.3, 2.4)} 200`); set(s.rw, "stroke-dasharray", `${100 * ramp(u, 2.2, 3.0)} 200`);
    qPop(s.l1, 200, 200, u, .5); qPop(s.l3, 430, 400, u, .95); qPop(s.l2, 880, 380, u, 1.5); [s.l1, s.l2, s.l3].forEach((e, i) => op(e, +e.getAttribute("opacity") * (1 - ramp(u, [1.5, 2.6, 1.9][i], [1.8, 2.8, 2.2][i]))));
    runTunnel(s.tun, (u - 2.7) * 1.1); flyField(s.dr, (u - 2.7) * .9, 700); tf(s.meB, `translate(${CX + 14 * Math.sin(u * 9)} ${CY + 30 + 10 * Math.cos(u * 7)})`); s.me2.blink(t); qPop(s.l4, CX, 170, u, 3.1);
    op(s.flash, on(u, 3.85, 4.2, .15) * .9);
    tf(s.meC, `translate(${CX - 60} ${CY + 60 + 6 * Math.sin(u * 2.4)}) scale(${Math.max(0, pop(u, 4.1, .5))})`); s.me3.blink(t); qPop(s.l5, CX, 170, u, 4.4);
    op(s.vg, 1); showC(s.c, u, 1.6, D + .25); };
  return s; })();

/* =====================================================================================================================
   POVEATEN (5 s): we are in the leaf. A grasshopper munches along it, bite by bite, towards us… and we become part of it. */
S.povEaten = (() => { const s = scene("povEaten", "#a8dcf5", "#dff4ff"), N = "povEaten"; const c = s.cam = el("g", {}, s.stage), FY = 762, K = 2.4;
  el("rect", {x: -900, y: -700, width: 3600, height: 2500, fill: qGrad([[0, "#8fd3f4"], [.6, "#dff4ff"], [1, "#b7e4a3"]])}, c); seed = 23; for (let i = 0; i < 14; i++) el("circle", {cx: -300 + rnd() * 2300, cy: 300 + rnd() * 800, r: 80 + rnd() * 160, fill: i % 2 ? "#95d58a" : "#c8efb8", opacity: .4}, c);
  el("path", qA({d: "M-900 700 Q200 620 300 600", fill: "none", stroke: INK, "stroke-width": 46}), c); el("path", {d: "M-900 700 Q200 620 300 600", fill: "none", stroke: "#b5e48c", "stroke-width": 32, "stroke-linecap": "round"}, c);
  el("path", qA({d: "M260 838 Q1000 690 2300 800 Q1000 930 260 838 Z", fill: "#3fa34d", "stroke-width": 7}), c); el("path", {d: "M300 834 Q1000 770 2200 804", fill: "none", stroke: "#d9f0b0", "stroke-width": 8, "stroke-linecap": "round", opacity: .7}, c);
  const BT = []; for (let i = 0; i < 8; i++) BT.push([1130 - i * 100, i % 2 ? 590 : 500, .7 + i * .3]);
  const mk = el("mask", {id: "qbite", maskUnits: "userSpaceOnUse", x: -900, y: -700, width: 3600, height: 2500}, qDefs()); el("rect", {x: -900, y: -700, width: 3600, height: 2500, fill: "#fff"}, mk); s.bt = BT.map(([x, y]) => el("circle", {cx: x, cy: y, r: 0, fill: "#000"}, mk));
  s.leaf = el("g", {mask: "url(#qbite)"}, c); el("path", qA({d: "M-200 430 Q500 250 1190 530 Q500 810 -200 690 Z", fill: "#57b85a", "stroke-width": 8}), s.leaf); el("path", {d: "M-200 560 Q500 520 1170 530", fill: "none", stroke: "#d9f0b0", "stroke-width": 14, "stroke-linecap": "round"}, s.leaf);
  [[120, -1], [330, 1], [540, -1], [750, 1], [940, -1]].forEach(([x, d]) => el("path", {d: `M${x} 548 q80 ${d * 60} 170 ${d * 120}`, fill: "none", stroke: "#d9f0b0", "stroke-width": 8, "stroke-linecap": "round", opacity: .8}, s.leaf));
  s.meG = el("g", {}, c); s.me = qNut(s.meG, 54);
  s.hg = el("g", {}, c); s.h = qHopper(s.hg); s.meH = el("g", {}, c); s.me2 = qNut(s.meH, 30);
  s.mu = [0, 1].map(() => qT(c, 0, 0, "munch!", 64, "#fff")); s.l1 = lab(s.stage, "You are part of the grasshopper now!", "#2d6a4f", 44);
  s.vg = meEdge(s.stage); s.c = card(s.stage, "A grasshopper eats the leaf…", "#57b85a", 50); set(s.c.querySelector("text"), "fill", INK);
  s.run = t => { const u = t - T0(N), D = DUR(N), p = clamp((u - .45) / .3, 0, 7.15), hop = 46 * Math.sin(Math.PI * clamp((u - 4.1) / .45)), hx = 1562 - 100 * p, hy = FY - hop;
    const k1 = ramp(u, .3, 2.7), k2 = ramp(u, 3.0, 3.9); zoom(c, lerp(lerp(1, 1.42, k1), 1.05, k2), lerp(lerp(CX, 520, k1), hx - 60, k2), lerp(lerp(CY, 545, k1), 540, k2));
    s.bt.forEach((b, i) => set(b, "r", 96 * Math.max(0, pop(u, BT[i][2], .18))));
    const eating = u > .5 && u < 3.0 ? 1 : 0; tf(s.hg, `translate(${hx} ${hy}) scale(${-K} ${K})`); tf(s.h.head, `rotate(${eating * 9 * Math.sin((u - .7) / .3 * 2 * Math.PI)} 96 -70)`);
    const ke = clamp((u - 2.86) / .2); op(s.meG, ke < 1 ? 1 : 0); tf(s.meG, `translate(${lerp(430, hx - 372, ke)} ${lerp(545, hy - 139, ke)}) scale(${1 - .45 * ke})`); s.me.blink(t);
    const ki = ease((u - 3.06) / .7), lx = lerp(150, -70, ki), ly = lerp(-64, -72, ki); tf(s.meH, `translate(${hx - lx * K} ${hy + ly * K}) scale(${1 + .3 * Math.sin(u * 5) * .2})`); op(s.meH, ke >= 1 ? 1 : 0);
    s.mu.forEach((m, j) => { const i = Math.floor(clamp((u - .7) / .3, 0, 7)), on2 = i % 2 === j && u > .7 && u < 3.05, f = ((u - .7) / .3) % 1; set(m, "x", 0); tf(m, `translate(${hx - 372 + 40} ${hy - 330 - j * 40}) rotate(${j ? 8 : -8}) scale(${on2 ? .7 + .5 * Math.sin(Math.PI * Math.min(1, f * 1.4)) : 0})`); op(m, on2 ? 1 : 0); });
    qPop(s.l1, CX, 150, u, 3.7); showC(s.c, u, .5, D + .25); };
  return s; })();

/* =====================================================================================================================
   CIRCLE (6 s, outside): the whole cycle, with arrows that light up in turn: dead grasshopper -> decomposers -> soil and
   compost -> plant -> grasshopper -> back to the start. */
S.circle = (() => { const s = scene("circle", "#0b6e6e", "#073b4c"), N = "circle", st = s.stage, OX = CX, OY = 400, RX = 620, RY = 285, M = 5;
  const P = []; for (let i = 0; i < M; i++) { const an = -Math.PI / 2 + i * 2 * Math.PI / M; P.push([OX + RX * Math.cos(an), OY + RY * Math.sin(an) + (i === 0 ? 20 : 0)]); }
  s.mid = el("g", {}, st); qT(s.mid, OX, OY + 30, "the cycle", 62, "#7dffb0"); qT(s.mid, OX, OY + 100, "of nutrients", 62, "#7dffb0");
  s.arr = qRing(st, P, OX, OY, 150, .16);
  const KD = ["dead", "decomp", "compost", "plant", "hopper"], NM = ["dead grasshopper", "decomposers", "soil and compost", "plant", "grasshopper"];
  s.it = KD.map((k, i) => { const g = el("g", {}, st); tf(qDisc(g, k, "#fff"), "scale(1.12)"); qT(g, 0, 186, NM[i], 46); return g; });
  s.me = qNut(st, 34); s.c = card(st, "…and one day, back to the soil. Round and round!", "#2a9d8f", 42);
  s.run = t => { const u = t - T0(N), D = DUR(N), T = i => .55 + i * .8;
    op(s.mid, ramp(u, .2, .6));
    s.it.forEach((g, i) => { const now = on(u, T(i) - .1, T(i) + .8, .2) + (i === 0 ? on(u, T(5) - .1, T(5) + .8, .2) : 0); tf(g, `translate(${P[i][0]} ${P[i][1]}) scale(${Math.max(0, pop(u, -.3 + i * .1)) * (1 + .1 * now)})`); });
    s.arr.forEach((g, i) => { g.lit(ramp(u, T(i + 1) - .6, T(i + 1) - .1)); op(g, ramp(u, .1 + i * .1, .4 + i * .1)); });
    const q = clamp((u - T(0)) / .8, 0, 5) + Math.max(0, (u - T(5)) / .45), i = Math.floor(q) % M, f = ease(q - Math.floor(q)), a = P[i], b = P[(i + 1) % M], hopk = Math.sin(Math.PI * f);
    const mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2; tf(s.me, `translate(${lerp(a[0], b[0], f) + 100 + (mx - OX) * .1 * hopk} ${lerp(a[1], b[1], f) - 100 + (my - OY) * .1 * hopk - 30 * hopk}) scale(${Math.max(0, pop(u, .3))})`); s.me.blink(t);
    showC(s.c, u, 1.0, D + .3); };
  return s; })();
})();
