/* =================== SCENES (Episode 22: expansion, contraction, change of state — series finale) =================== */
const S = {};
const hex = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
const mix = (h1, h2, k) => { const a = hex(h1), b = hex(h2); return "rgb(" + a.map((v, i) => Math.round(lerp(v, b[i], clamp(k)))).join(",") + ")"; };
const HOT = "#e63946", COLD = "#3a86ff", MET = "#adb5bd";
function road(p, w = 1400) { const g = el("g", {}, p); g.a = el("rect", {y: -40, height: 80, fill: "#495057", stroke: INK, "stroke-width": 5}, g); g.b = el("rect", {y: -40, height: 80, fill: "#495057", stroke: INK, "stroke-width": 5}, g);
  g.d = el("line", {y1: 0, y2: 0, stroke: "#ffd166", "stroke-width": 8, "stroke-dasharray": "40 30"}, g);
  g.set = (gap, W = w) => { const half = (W - gap) / 2; set(g.a, "x", -W / 2); set(g.a, "width", half); set(g.b, "x", -W / 2 + half + gap); set(g.b, "width", half); set(g.d, "x1", -W / 2); set(g.d, "x2", W / 2); }; g.set(40); return g; }
function flask(p) { const g = el("g", {}, p); g.air = el("path", {d: "M-30 -130 V-60 L-110 80 Q-120 110 -90 110 H90 Q120 110 110 80 L30 -60 V-130 Z", fill: "#caf0f8", opacity: .7}, g);
  el("path", {d: "M-30 -130 V-60 L-110 80 Q-120 110 -90 110 H90 Q120 110 110 80 L30 -60 V-130", fill: "none", stroke: INK, "stroke-width": 7}, g);
  g.bal = el("ellipse", {cx: 0, cy: -140, rx: 34, ry: 18, fill: "#ef476f", stroke: INK, "stroke-width": 5}, g); g.blow = k => { set(g.bal, "ry", 18 + 110 * k); set(g.bal, "rx", 34 + 70 * k); set(g.bal, "cy", -140 - 100 * k); }; return g; }
function basin(p, w = 520, col = HOT) { const g = el("g", {}, p); g.w = el("rect", {x: -w / 2, y: 0, width: w, height: 140, fill: col, opacity: .45}, g); el("path", {d: `M${-w / 2 - 10} -40 V140 H${w / 2 + 10} V-40`, fill: "none", stroke: INK, "stroke-width": 7}, g); return g; }

// ---- HOOK
S.hook = (() => { const s = scene("hook", "#90e0ef", "#caf0f8");
  s.r = road(s.stage); s.mag = el("g", {}, s.stage); el("circle", {r: 120, fill: "#ffffff55", stroke: INK, "stroke-width": 10}, s.mag); el("line", {x1: 85, y1: 85, x2: 180, y2: 180, stroke: INK, "stroke-width": 20, "stroke-linecap": "round"}, s.mag);
  s.car = emo(s.stage, 0, 0, 120, "🚗"); s.q = chip(s.stage, "🤔 a MISTAKE?", "#6c757d", {fs: 40}); s.ok = chip(s.stage, "✓ ON PURPOSE: because of HEAT 🔥", HOT, {fs: 40});
  s.run = t => { const a = w => C("hook", w);
    tf(s.r, "translate(760 620)"); op(s.r, 1); s.r.set(40); op(s.car, 1); set(s.car, "x", 100 + ((t * 250) % 1500)); set(s.car, "y", 580);
    op(s.mag, ramp(t, a("gaps") - .2, a("gaps") + .2)); tf(s.mag, "translate(760 600)");
    op(s.q, on(t, a("mistakes"), a("engineers"), .2)); popAt(s.q, 760, 260, t, a("mistakes")); op(s.ok, ramp(t, a("purpose"), a("purpose") + .2)); popAt(s.ok, 760, 260, t, a("purpose")); }; return s; })();

// ---- THREE EFFECTS
S.three = (() => { const s = scene("three", "#ffd166", "#ff9f1c");
  s.t = chip(s.stage, "🔥 gain or lose heat ➜ 3 EFFECTS", "#1b1b3a", {fs: 42});
  s.e = [["🌡️", "temperature CHANGES", "temperature"], ["↔️", "EXPAND or CONTRACT", "expand"], ["🧊💧♨️", "CHANGE OF STATE", "state"]].map(([e, n, w], i) => { const g = el("g", {}, s.stage); el("rect", {x: -200, y: -170, width: 400, height: 340, rx: 30, fill: "#fff", stroke: INK, "stroke-width": 7}, g); emo(g, 0, -40, 120, e);
    tx(g, {x: 0, y: 110, "text-anchor": "middle", "font-size": 32, "font-weight": 700, fill: INK}, n); tx(g, {x: -160, y: -120, "font-size": 44, "font-weight": 700, fill: HOT}, String(i + 1)); return {g, w, i}; });
  s.run = t => { const a = w => C("three", w);
    op(s.t, ramp(t, a("three"), a("three") + .2)); popAt(s.t, 760, 180, t, a("three"));
    s.e.forEach(e => { const tt = a(e.w); op(e.g, ramp(t, tt, tt + .2)); tf(e.g, `translate(${330 + e.i * 430} 560) scale(${pop(t, tt)})`); }); }; return s; })();

// ---- DEFINE (particles spreading)
S.define = (() => { const s = scene("define", "#ffadad", "#a2d2ff");
  s.box = el("rect", {fill: "none", stroke: INK, "stroke-width": 7, rx: 14}, s.stage); s.pts = []; for (let i = 0; i < 25; i++) s.pts.push({u: (i % 5) - 2, v: Math.floor(i / 5) - 2, e: el("circle", {r: 18, fill: "#ffd166", stroke: INK, "stroke-width": 3}, s.stage)});
  s.c1 = chip(s.stage, "GAIN heat ➜ EXPANDS (volume ⬆)", HOT, {fs: 38}); s.c2 = chip(s.stage, "LOSE heat ➜ CONTRACTS (volume ⬇)", COLD, {fs: 38});
  s.run = t => { const a = w => C("define", w); const ex = ramp(t, a("expands") - .3, a("bigger") + .3), co = ramp(t, a("contracts") - .3, a("smaller") + .3), sc = 1 + .45 * ex - .65 * co;
    const half = 160 * sc; set(s.box, "x", 760 - half - 30); set(s.box, "y", 520 - half - 30); set(s.box, "width", 2 * half + 60); set(s.box, "height", 2 * half + 60);
    set(s.box, "stroke", sc > 1.05 ? HOT : sc < .95 ? COLD : INK);
    s.pts.forEach(p => { set(p.e, "cx", 760 + p.u * 64 * sc + Math.sin(t * (6 + 6 * ex) + p.u * 3) * 6 * sc); set(p.e, "cy", 520 + p.v * 64 * sc + Math.cos(t * (6 + 6 * ex) + p.v * 3) * 6 * sc); set(p.e, "fill", mix(mix("#ffd166", HOT, ex), COLD, co)); });
    op(s.c1, on(t, a("expands"), a("contracts") - .3, .2)); popAt(s.c1, 760, 150, t, a("expands")); op(s.c2, ramp(t, a("contracts"), a("contracts") + .2)); popAt(s.c2, 760, 150, t, a("contracts")); }; return s; })();

// ---- BALL AND RING
S.ball = (() => { const s = scene("ball", "#e0fbfc", "#c2dfe3");
  s.ring = el("g", {}, s.stage); el("rect", {x: -6, y: -360, width: 12, height: 240, fill: "#6c757d"}, s.ring); el("circle", {r: 80, fill: "none", stroke: MET, "stroke-width": 22}, s.ring); el("circle", {r: 80, fill: "none", stroke: INK, "stroke-width": 3}, s.ring);
  s.ballG = el("g", {}, s.stage); s.bl = el("circle", {r: 62, fill: MET, stroke: INK, "stroke-width": 5}, s.ballG); el("rect", {x: -5, y: -330, width: 10, height: 270, fill: "#6c757d"}, s.ballG);
  s.flame = emo(s.stage, 0, 0, 140, "🔥"); s.bs = basin(s.stage, 300, COLD);
  s.st = [["cool: ✓ passes through", "#06d6a0"], ["HEATED: expands ✗ doesn't fit!", HOT], ["cooled: contracts ✓ fits again", COLD]].map(([n, c]) => chip(s.stage, n, c, {fs: 34}));
  s.sol = chip(s.stage, "🧱 SOLIDS expand + contract", "#1b1b3a", {fs: 36});
  s.run = t => { const a = w => C("ball", w); const heat = ramp(t, a("heat"), a("expands") + .5), cool = ramp(t, a("cool#2") - .2, a("contracts") + .4), k = heat * (1 - cool);
    tf(s.ring, "translate(1000 520)"); op(s.ring, 1); set(s.bl, "r", 62 + 30 * k); set(s.bl, "fill", mix(MET, "#ff8c42", k));
    const ph = t < a("heat") - .5 ? 0 : t < a("cool#2") - .3 ? 1 : 2; const passX = ph === 0 ? lerp(700, 1000, ramp(t, a("passes") - .3, a("passes") + .5)) : ph === 1 ? lerp(500, 870, ramp(t, a("fits") - .8, a("fits"))) : lerp(500, 1000, ramp(t, a("slips") - .3, a("slips") + .5));
    tf(s.ballG, `translate(${passX} 520)`); op(s.ballG, 1);
    op(s.flame, on(t, a("heat"), a("cool#2") - .3, .2)); set(s.flame, "x", 500); set(s.flame, "y", 640); op(s.bs, on(t, a("cool#2") - .3, a("slips"), .2)); tf(s.bs, "translate(500 600)");
    op(s.st[0], on(t, a("passes"), a("heat"), .2)); popAt(s.st[0], 760, 150, t, a("passes")); op(s.st[1], on(t, a("fits") - .3, a("cool#2"), .2)); popAt(s.st[1], 760, 150, t, a("fits") - .3);
    op(s.st[2], on(t, a("contracts"), a("solids"), .2)); popAt(s.st[2], 760, 150, t, a("contracts")); op(s.sol, ramp(t, a("solids"), a("solids") + .2)); popAt(s.sol, 760, 150, t, a("solids")); }; return s; })();

// ---- LIQUID
S.liquid = (() => { const s = scene("liquid", "#fff3b0", "#ffd6a5");
  s.bs = basin(s.stage, 460); s.tt = el("g", {}, s.stage); el("path", {d: "M-60 -160 V120 Q-60 170 0 170 Q60 170 60 120 V-160", fill: "#ffffff88", stroke: INK, "stroke-width": 6}, s.tt); el("rect", {x: -60, y: -40, width: 120, height: 200, rx: 30, fill: "#7209b7", opacity: .7}, s.tt);
  el("rect", {x: -10, y: -420, width: 20, height: 400, fill: "#ffffffaa", stroke: INK, "stroke-width": 4}, s.tt); s.col = el("rect", {x: -6, width: 12, fill: "#7209b7"}, s.tt); el("rect", {x: -70, y: -180, width: 140, height: 30, rx: 8, fill: "#6c757d", stroke: INK, "stroke-width": 4}, s.tt);
  s.c1 = chip(s.stage, "hot water ➜ coloured water EXPANDS ⬆", HOT, {fs: 34}); s.c2 = chip(s.stage, "taken out ➜ CONTRACTS ⬇", COLD, {fs: 34}); s.lab = chip(s.stage, "💧 LIQUIDS expand + contract", "#1b1b3a", {fs: 34});
  s.run = t => { const a = w => C("liquid", w); const inn = ramp(t, a("into") - .3, a("into") + .5), up = ramp(t, a("rises") - .3, a("expands") + .5), dn = ramp(t, a("falls") - .3, a("contracts") + .4), out = ramp(t, a("take") - .2, a("take") + .4);
    tf(s.bs, "translate(760 640)"); op(s.bs, ramp(t, a("hot") - .3, a("hot"))); tf(s.tt, `translate(760 ${lerp(420, 560, inn) - out * 140})`);
    const h = 60 + 220 * up * (1 - dn); set(s.col, "y", -20 - h); set(s.col, "height", h);
    op(s.c1, on(t, a("rises"), a("take"), .2)); popAt(s.c1, 760, 130, t, a("rises")); op(s.c2, ramp(t, a("falls"), a("falls") + .2)); popAt(s.c2, 760, 130, t, a("falls"));
    op(s.lab, ramp(t, a("liquids"), a("liquids") + .2)); popAt(s.lab, 1250, 860, t, a("liquids")); }; return s; })();

// ---- GAS (flask + balloon)
S.gas = (() => { const s = scene("gas", "#caffbf", "#9bf6ff");
  s.bs = basin(s.stage, 460); s.f = flask(s.stage); s.c0 = chip(s.stage, "💨 GASES expand the MOST", "#06d6a0", {fs: 40});
  s.c1 = chip(s.stage, "air EXPANDS ➜ balloon inflates 🎈", HOT, {fs: 34}); s.c2 = chip(s.stage, "air CONTRACTS ➜ balloon goes flat", COLD, {fs: 34});
  s.run = t => { const a = w => C("gas", w); const up = ramp(t, a("expands") - .3, a("inflates") + .6), dn = ramp(t, a("contracts") - .3, a("flat") + .3), out = ramp(t, a("remove") - .2, a("remove") + .4);
    tf(s.bs, "translate(760 700)"); op(s.bs, ramp(t, a("hot") - .3, a("hot")) * (1 - out)); tf(s.f, `translate(760 ${640 - out * 40})`); op(s.f, ramp(t, a("flask") - .3, a("flask"))); s.f.blow(up * (1 - dn)); set(s.f.air, "fill", mix("#caf0f8", "#ffb4a2", up * (1 - dn)));
    op(s.c0, ramp(t, a("most"), a("most") + .2) * (1 - ramp(t, a("expands") - .2, a("expands")))); popAt(s.c0, 760, 260, t, a("most"));
    op(s.c1, on(t, a("expands"), a("remove"), .2)); popAt(s.c1, 760, 140, t, a("expands")); op(s.c2, ramp(t, a("contracts"), a("contracts") + .2)); popAt(s.c2, 760, 140, t, a("contracts")); }; return s; })();

// ---- USES + ROADS
S.uses = (() => { const s = scene("uses", "#ffe8d6", "#ddbea9");
  s.jar = el("g", {}, s.stage); el("rect", {x: -110, y: -60, width: 220, height: 230, rx: 30, fill: "#caf0f8", stroke: INK, "stroke-width": 7, opacity: .9}, s.jar); s.lid = el("rect", {x: -120, y: -100, width: 240, height: 50, rx: 10, fill: MET, stroke: INK, "stroke-width": 6}, s.jar);
  s.tap = emo(s.stage, 0, 0, 110, "🚰"); s.drops = []; for (let i = 0; i < 6; i++) s.drops.push({ph: i / 6, e: el("circle", {r: 9, fill: HOT, opacity: .7}, s.stage)});
  s.c1 = chip(s.stage, "✓ hot water ➜ metal lid EXPANDS ➜ opens easily", "#06d6a0", {fs: 30});
  s.r = road(s.stage, 1200); s.sun = emo(s.stage, 0, 0, 110, "☀️"); s.moon = emo(s.stage, 0, 0, 100, "🌙"); s.crack = el("path", {d: "M-30 -40 L-10 -10 L-30 10 L-5 40", fill: "none", stroke: "#000", "stroke-width": 6}, s.stage);
  s.c2 = chip(s.stage, "✗ no gaps ➜ roads CRACK", HOT, {fs: 32}); s.c3 = chip(s.stage, "✓ EXPANSION GAPS give room to expand", "#f77f00", {fs: 34});
  s.run = t => { const a = w => C("uses", w); const rd = ramp(t, a("opens") + 1.2, a("opens") + 1.5);
    op(s.jar, 1 - rd); tf(s.jar, "translate(560 560)"); set(s.lid, "fill", mix(MET, "#ff8c42", ramp(t, a("run"), a("expands") + .3))); tf(s.lid, `translate(0 ${-ramp(t, a("opens") - .2, a("opens") + .4) * 60}) rotate(${-ramp(t, a("opens") - .2, a("opens") + .4) * 15})`);
    op(s.tap, on(t, a("run") - .2, a("opens") + 1.2, .2)); set(s.tap, "x", 620); set(s.tap, "y", 300); s.drops.forEach(d => { const k = (t * 1.2 + d.ph) % 1; set(d.e, "cx", 600); set(d.e, "cy", lerp(340, 450, k)); op(d.e, on(t, a("run"), a("opens") + 1.2, .2)); });
    op(s.c1, on(t, a("opens"), a("opens") + 1.4, .2)); popAt(s.c1, 760, 150, t, a("opens"));
    const day = on(t, a("hot#2") - .2, a("cool") - .2, .2), night = on(t, a("cool") - .2, a("gaps") - .3, .2), gp = ramp(t, a("gaps") - .3, a("gaps"));
    op(s.r, rd); tf(s.r, "translate(760 620)"); s.r.set(gp > 0 ? lerp(4, 50, gp) + 14 * Math.sin(t * 2) : 4 + 6 * day);
    op(s.sun, day); set(s.sun, "x", 1250); set(s.sun, "y", 300); op(s.moon, night); set(s.moon, "x", 1250); set(s.moon, "y", 300);
    op(s.crack, ramp(t, a("crack") - .2, a("crack")) * (1 - gp)); tf(s.crack, "translate(760 620)");
    op(s.c2, on(t, a("crack"), a("gaps") - .3, .2)); popAt(s.c2, 760, 150, t, a("crack")); op(s.c3, ramp(t, a("gaps"), a("gaps") + .2)); popAt(s.c3, 760, 150, t, a("gaps")); }; return s; })();

// ---- CHANGE OF STATE (cycle)
S.state = (() => { const s = scene("state", "#bde0fe", "#ffc8dd");
  const P = [[360, 520, "🧊", "ICE"], [760, 520, "💧", "WATER"], [1160, 520, "♨️", "STEAM"]];
  s.n = P.map(([x, y, e, n]) => { const g = el("g", {}, s.stage); el("circle", {r: 120, fill: "#fff", stroke: INK, "stroke-width": 7}, g); emo(g, 0, -10, 110, e); tx(g, {x: 0, y: 170, "text-anchor": "middle", "font-size": 40, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 7}, n); tf(g, `translate(${x} ${y})`); return g; });
  const arc = (x1, x2, up, col) => el("path", {d: `M${x1} ${520 + (up ? -130 : 130)} Q${(x1 + x2) / 2} ${520 + (up ? -300 : 300)} ${x2} ${520 + (up ? -130 : 130)}`, fill: "none", stroke: col, "stroke-width": 12, "stroke-linecap": "round", "marker-end": ""}, s.stage);
  s.a1 = arc(400, 720, true, HOT); s.a2 = arc(800, 1120, true, HOT); s.b1 = arc(1120, 800, false, COLD); s.b2 = arc(720, 400, false, COLD);
  s.l = [["+ heat: MELTS", HOT, 560, 260], ["+ heat: STEAM", HOT, 960, 260], ["− heat: WATER", COLD, 960, 790], ["− heat: FREEZES", COLD, 560, 790]].map(([n, c, x, y]) => ({c: chip(s.stage, n, c, {fs: 28}), x, y}));
  s.run = t => { const a = w => C("state", w); const ts = [a("melts"), a("steam"), a("water#3"), a("freezes")];
    s.n.forEach((g, i) => op(g, ramp(t, SC.state.t0 + i * .2, SC.state.t0 + .3 + i * .2)));
    [s.a1, s.a2, s.b1, s.b2].forEach((p, i) => { set(p, "stroke-dasharray", 600); set(p, "stroke-dashoffset", 600 * (1 - ramp(t, ts[i] - .3, ts[i] + .4))); op(p, t > ts[i] - .3 ? 1 : 0); });
    s.l.forEach((l, i) => { op(l.c, ramp(t, ts[i], ts[i] + .2)); popAt(l.c, l.x, l.y, t, ts[i]); }); }; return s; })();

// ---- QUIZ
S.quiz = (() => { const s = scene("quiz", "#b5179e", "#560bad");
  s.pause = tx(s.stage, {x: 760, y: 150, "text-anchor": "middle", "font-size": 72, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 12}, "⏸ PAUSE & PREDICT!");
  s.car = emo(s.stage, 560, 520, 260, "🚗"); s.sun = emo(s.stage, 1200, 280, 140, "☀️"); s.bal = el("ellipse", {cx: 980, cy: 520, rx: 60, ry: 75, fill: "#ef476f", stroke: INK, "stroke-width": 6}, s.stage);
  s.pop = tx(s.stage, {x: 980, y: 380, "text-anchor": "middle", "font-size": 70, "font-weight": 700, fill: "#ffd166", class: "out", "stroke-width": 8}, "POP?!");
  s.ans = chip(s.stage, "air GAINS heat ➜ EXPANDS ➜ balloon gets BIGGER", "#06d6a0", {fs: 34});
  s.run = t => { const a = w => C("quiz1", w), b = w => C("quiz2", w); const g = ramp(t, b("expands") - .3, b("bigger") + .5);
    op(s.pause, on(t, a("pause"), b("air"), .2)); tf(s.pause, `translate(760 150) scale(${pop(t, a("pause"))}) translate(-760 -150)`);
    op(s.car, ramp(t, a("car"), a("car") + .2)); op(s.sun, ramp(t, a("hot"), a("hot") + .2)); op(s.bal, ramp(t, a("balloon"), a("balloon") + .2)); set(s.bal, "rx", 60 + 50 * g); set(s.bal, "ry", 75 + 60 * g);
    op(s.pop, ramp(t, b("pop"), b("pop") + .2)); op(s.ans, ramp(t, b("expands"), b("expands") + .2)); popAt(s.ans, 760, 820, t, b("expands")); }; return s; })();

// ---- EXAM
S.exam = (() => { const s = scene("exam", "#14213d", "#1d3557");
  const g = el("g", {transform: "translate(760 450)"}, s.stage);
  el("rect", {x: -670, y: -320, width: 1340, height: 640, rx: 34, fill: "#2b9348", stroke: "#8d5524", "stroke-width": 22, filter: "url(#sh)"}, g);
  tx(g, {x: -610, y: -240, "font-size": 50, "font-weight": 700, fill: "#ffe14d"}, "📝 EXAM CORNER · say it like this:");
  const L = [["🔥 When an object GAINS heat, it EXPANDS."], ["❄️ When it LOSES heat, it CONTRACTS."], ["🛣️ Gaps are left in roads and bridges to give them space", "     to expand on hot days, so they do not crack."]];
  let y = -150; s.lines = L.map(ls => { const r = el("g", {opacity: 0}, g); ls.forEach((x, i) => tx(r, {x: -610, y: y + i * 50, "font-size": 40, "font-weight": 600, fill: "#fff"}, x)); y += ls.length * 50 + 50; return r; });
  s.run = t => { const a = w => C("exam", w); const k = [a("gains"), a("loses"), a("gaps")];
    s.lines.forEach((r, i) => { op(r, ramp(t, k[i] - .15, k[i] + .2)); tf(r, `translate(${(1 - ramp(t, k[i] - .15, k[i] + .3)) * -40} 0)`); }); }; return s; })();

// ---- HABIT (big picture review)
S.habit = (() => { const s = scene("habit", "#06d6a0", "#118ab2");
  s.title = tx(s.stage, {x: 760, y: 170, "text-anchor": "middle", "font-size": 72, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 12}, "🗺️ REVIEW THE BIG PICTURE");
  const M = [["⚙️", "SYSTEMS", "#e63946", 380, 400, "systems"], ["🧱", "MATTER", "#7209b7", 1140, 400, "matter"], ["💡", "LIGHT", "#ffbe0b", 380, 760, "light"], ["🔥", "HEAT", "#f77f00", 1140, 760, "heat"]];
  s.m = M.map(([e, n, c, x, y, w]) => { const g = el("g", {}, s.stage); el("rect", {x: -170, y: -100, width: 340, height: 200, rx: 26, fill: "#fff", stroke: c, "stroke-width": 9}, g); emo(g, 0, -20, 90, e); tx(g, {x: 0, y: 70, "text-anchor": "middle", "font-size": 38, "font-weight": 700, fill: c}, n); tf(g, `translate(${x} ${y})`); return {g, w}; });
  s.links = [[380, 400, 1140, 400], [380, 400, 380, 760], [1140, 400, 1140, 760], [380, 760, 1140, 760], [380, 400, 1140, 760]].map(([x1, y1, x2, y2]) => el("line", {x1, y1, x2, y2, stroke: "#fff", "stroke-width": 8, "stroke-dasharray": "18 12"}, s.stage));
  s.c = chip(s.stage, "🌟 one BIG story", "#1b1b3a", {fs: 44});
  s.run = t => { const a = w => C("habit1", w); s.links.forEach(l => s.stage.insertBefore(l, s.stage.firstChild));
    op(s.title, ramp(t, a("picture"), a("picture") + .2)); tf(s.title, `translate(760 170) scale(${pop(t, a("picture")) * .9}) translate(-760 -170)`);
    s.m.forEach((m, i) => op(m.g, ramp(t, a("lay") + i * .2, a("lay") + .2 + i * .2))); s.links.forEach((l, i) => op(l, ramp(t, a("connect") + i * .15, a("connect") + .2 + i * .15)));
    op(s.c, ramp(t, a("story"), a("story") + .2)); popAt(s.c, 760, 580, t, a("story")); }; return s; })();

// ---- MIND MAP
S.mindmap = (() => { const s = scene("mindmap", "#fff3b0", "#ffd6a5");
  for (let i = 0; i < 16; i++) el("line", {x1: 0, y1: 120 + i * 60, x2: 1920, y2: 120 + i * 60, stroke: "#a2d2ff", "stroke-width": 2, opacity: .6}, s.stage);
  const CX = 380, CY2 = 470;
  s.dim = [["🌡️ TEMPERATURE", HOT, 240, 240], ["⚡ HEAT", "#ff7b00", 200, 720], ["➡️ HEAT FLOW", "#ff006e", 560, 230], ["🥄 CONDUCTORS", "#7209b7", 520, 760]].map(([n, c, x, y]) => ({l: el("path", {d: `M${CX} ${CY2} L${x} ${y}`, stroke: c, "stroke-width": 12, opacity: .35}, s.stage), c: chip(s.stage, n, c, {fs: 24}), x, y}));
  s.l1 = el("path", {d: `M${CX} ${CY2} Q600 420 860 420`, stroke: "#06d6a0", "stroke-width": 12, fill: "none", "stroke-linecap": "round", "stroke-dasharray": 600}, s.stage);
  s.center = el("g", {}, s.stage); el("ellipse", {rx: 150, ry: 70, fill: "#f77f00", stroke: INK, "stroke-width": 7}, s.center); tx(s.center, {x: 0, y: 16, "text-anchor": "middle", "font-size": 50, "font-weight": 700, fill: "#fff"}, "🔥 HEAT");
  s.br = chip(s.stage, "✨ EFFECTS OF HEAT", "#06d6a0", {fs: 36});
  s.subs = [["temperature change", "temperature"], ["expansion + contraction", "expansion"], ["change of state", "state"]].map(([n, w], i) => ({c: chip(s.stage, n, "#fff", {fs: 28, ink: INK}), w, i}));
  s.ult = chip(s.stage, "🚀 TheOneApp · the ultimate science app", "#7209b7", {fs: 30});
  s.phone = el("g", {}, s.stage); el("rect", {x: -130, y: -240, width: 260, height: 480, rx: 40, fill: INK}, s.phone); el("rect", {x: -112, y: -205, width: 224, height: 410, rx: 20, fill: "#fff"}, s.phone);
  tx(s.phone, {x: 0, y: -168, "text-anchor": "middle", "font-size": 32, "font-weight": 700, fill: "#7209b7"}, "TheOneApp"); tx(s.phone, {x: 0, y: -138, "text-anchor": "middle", "font-size": 17, "font-weight": 600, fill: "#6c757d"}, "the ultimate science app");
  const cp = el("clipPath", {id: "scr22"}, $("v").querySelector("defs")); el("rect", {x: -112, y: -122, width: 224, height: 327, rx: 4}, cp);
  const IH = 224 * 2000 / 780; s.scr = el("g", {"clip-path": "url(#scr22)"}, s.phone); s.shot = el("image", {href: "oneapp_mind2.png", x: -112, y: -122, width: 224, height: IH, preserveAspectRatio: "xMidYMin slice"}, s.scr);
  s.ring = el("rect", {fill: "none", stroke: "#f72585", "stroke-width": 5, rx: 13}, s.scr);
  s.run = t => { const a = w => C("habit2", w);
    op(s.center, ramp(t, a("heat"), a("heat") + .2)); tf(s.center, `translate(${CX} ${CY2}) scale(${pop(t, a("heat"))})`);
    s.dim.forEach(d => { op(d.l, ramp(t, a("heat") + .3, a("heat") + .5) * .35); op(d.c, ramp(t, a("heat") + .3, a("heat") + .5) * .5); popAt(d.c, d.x, d.y, t, a("heat") + .3); });
    set(s.l1, "stroke-dashoffset", 600 * (1 - ramp(t, a("effects") - .3, a("effects") + .3))); op(s.l1, t > a("effects") - .3 ? 1 : 0);
    op(s.br, ramp(t, a("effects"), a("effects") + .2)); popAt(s.br, 940, 420, t, a("effects"));
    s.subs.forEach(c => { const tt = a(c.w); op(c.c, ramp(t, tt, tt + .2)); popAt(c.c, 960, 510 + c.i * 76, t, tt); });
    op(s.ult, on(t, a("ultimate"), SC.mindmap.t1 + .5, .2)); popAt(s.ult, 640, 150, t, a("ultimate"));
    const ph = ramp(t, a("save"), a("save") + .6); op(s.phone, ph); tf(s.phone, `translate(${lerp(1650, 1400, ph)} 560) rotate(${lerp(12, -4, ph)})`);
    const nx = a("ultimate") + .6; const off = -122 - (IH - 327) * ramp(t, a("save"), nx); set(s.shot, "y", off); const sc = IH / 2000;
    set(s.ring, "x", -112 + 210 * sc); set(s.ring, "y", off + 1722 * sc); set(s.ring, "width", 146 * sc); set(s.ring, "height", 72 * sc);
    op(s.ring, on(t, nx, SC.mindmap.t1 + .5, .15) * (.6 + .4 * Math.sin(t * 8))); }; return s; })();

// ---- CLOSE (series finale)
S.close = (() => { const s = scene("close", "#7209b7", "#f72585");
  s.ans = el("g", {}, s.stage); el("rect", {x: -420, y: -70, width: 840, height: 140, rx: 70, fill: "#06d6a0", stroke: INK, "stroke-width": 7}, s.ans); tx(s.ans, {x: 0, y: 22, "text-anchor": "middle", "font-size": 52, "font-weight": 700, fill: "#fff"}, "🛣️ room to EXPAND!");
  s.done = tx(s.stage, {x: 760, y: 300, "text-anchor": "middle", "font-size": 84, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 12}, "🎓 PRIMARY 4 SCIENCE: COMPLETE!");
  s.icons = ["⚙️", "🌱", "🫀", "🧱", "💡", "👤", "🔥"].map((e, i) => emo(s.stage, 0, 0, 100, e));
  s.spot = chip(s.stage, "👀 spot an expansion gap ➜ explain it to someone", "#1b1b3a", {fs: 34}); s.ty = tx(s.stage, {x: 760, y: 820, "text-anchor": "middle", "font-size": 80, "font-weight": 700, fill: "#ffd166", class: "out", "stroke-width": 10}, "THANK YOU! 💜");
  s.run = t => { const a = w => C("close", w); const fin = ramp(t, a("completes") - .1, a("completes") + .2);
    op(s.ans, ramp(t, a("room"), a("room") + .15) * (1 - fin)); tf(s.ans, `translate(760 420) scale(${pop(t, a("room"))})`);
    op(s.done, fin); tf(s.done, `translate(760 300) scale(${pop(t, a("completes") - .3) * .85}) translate(-760 -300)`);
    s.icons.forEach((e, i) => { const tt = a("journey") + i * .12; op(e, ramp(t, tt, tt + .2)); set(e, "x", 340 + i * 140); set(e, "y", 470 - Math.abs(Math.sin(t * 3 + i)) * 20); });
    op(s.spot, ramp(t, a("spot"), a("spot") + .2)); popAt(s.spot, 760, 640, t, a("spot"));
    op(s.ty, ramp(t, a("thank"), a("thank") + .2)); tf(s.ty, `translate(760 820) scale(${pop(t, a("thank"))}) translate(-760 -820)`); }; return s; })();

// ---- END CARD
S.end = (() => { const s = scene("end", "#3a0ca3", "#7209b7");
  tx(s.stage, {x: 960, y: 360, "text-anchor": "middle", "font-size": 44, "font-weight": 700, fill: "#ffe14d", "letter-spacing": 6}, "P4 SCIENCE, EXPLAINED · 22 EPISODES");
  tx(s.stage, {x: 960, y: 480, "text-anchor": "middle", "font-size": 84, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 10}, "Revise all your mind maps");
  tx(s.stage, {x: 960, y: 580, "text-anchor": "middle", "font-size": 84, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 10}, "in TheOneApp 🚀");
  s.run = () => {}; return s; })();

