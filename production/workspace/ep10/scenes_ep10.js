/* =================== SCENES (Episode 10: how to weigh air — mass, balances, subtraction) =================== */
const S = {};
const hex = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
const mix = (h1, h2, k) => { const a = hex(h1), b = hex(h2); return "rgb(" + a.map((v, i) => Math.round(lerp(v, b[i], clamp(k)))).join(",") + ")"; };
function ebal(p) { const g = el("g", {}, p);
  el("path", {d: "M-240 100 L-210 0 H210 L240 100 Z", fill: "#dee2e6", stroke: INK, "stroke-width": 7, "stroke-linejoin": "round"}, g);
  el("rect", {x: -190, y: -30, width: 380, height: 26, rx: 10, fill: "#adb5bd", stroke: INK, "stroke-width": 6}, g);
  el("rect", {x: -170, y: 20, width: 200, height: 62, rx: 10, fill: "#1b1b3a", stroke: INK, "stroke-width": 5}, g);
  const txt = tx(g, {x: -70, y: 65, "text-anchor": "middle", "font-size": 44, "font-weight": 700, fill: "#80ffdb"}, "");
  const on = el("circle", {cx: 80, cy: 50, r: 24, fill: "#06d6a0", stroke: INK, "stroke-width": 5}, g); tx(g, {x: 80, y: 58, "text-anchor": "middle", "font-size": 20, "font-weight": 700, fill: INK}, "ON");
  g.tare = el("circle", {cx: 160, cy: 50, r: 30, fill: "#ffd166", stroke: INK, "stroke-width": 5}, g); tx(g, {x: 160, y: 57, "text-anchor": "middle", "font-size": 18, "font-weight": 700, fill: INK}, "TARE");
  g.show = (s, col = "#80ffdb") => { txt.textContent = s; set(txt, "fill", col); }; g.show(""); return g; }
function beam(p) { const g = el("g", {}, p); el("path", {d: "M-90 260 L90 260 L16 0 L-16 0 Z", fill: "#adb5bd", stroke: INK, "stroke-width": 6}, g);
  const bm = el("rect", {x: -280, y: -10, width: 560, height: 20, rx: 10, fill: "#6c757d", stroke: INK, "stroke-width": 5}, g); el("circle", {r: 18, fill: "#ffd166", stroke: INK, "stroke-width": 5}, g);
  const pans = [-1, 1].map(() => { const pg = el("g", {}, g); el("line", {x1: -60, y1: 120, x2: 0, y2: 0, stroke: INK, "stroke-width": 4}, pg); el("line", {x1: 60, y1: 120, x2: 0, y2: 0, stroke: INK, "stroke-width": 4}, pg);
    el("path", {d: "M-90 120 H90 Q70 150 0 150 Q-70 150 -90 120 Z", fill: "#ced4da", stroke: INK, "stroke-width": 5}, pg); return pg; });
  g.tilt = th => { tf(bm, `rotate(${th * 180 / Math.PI})`); pans.forEach((pg, i) => { const sd = i ? 1 : -1; tf(pg, `translate(${sd * 270 * Math.cos(th)} ${sd * 270 * Math.sin(th)})`); }); };
  g.pan = (i, th) => { const sd = i ? 1 : -1; return [sd * 270 * Math.cos(th), sd * 270 * Math.sin(th) + 120]; }; g.tilt(0); return g; }
function beaker(p, w = 150, h = 190) { const g = el("g", {}, p); const liq = el("rect", {x: -w / 2 + 6, width: w - 12, fill: "#4cc9f0"}, g);
  el("path", {d: `M${-w / 2} ${-h} V0 H${w / 2} V${-h} M${-w / 2} ${-h} l-14 -12`, fill: "none", stroke: INK, "stroke-width": 7, "stroke-linejoin": "round"}, g);
  for (let i = 1; i < 5; i++) el("line", {x1: w / 2 - 30, y1: -i * h / 5, x2: w / 2 - 6, y2: -i * h / 5, stroke: INK, "stroke-width": 3}, g);
  g.fill = (k, col = "#4cc9f0") => { set(liq, "y", -(h - 10) * k); set(liq, "height", Math.max(0, (h - 10) * k - 3)); set(liq, "fill", col); }; g.fill(0); return g; }
function sumPanel(p, rows) { const g = el("g", {}, p); el("rect", {x: -260, y: -150, width: 520, height: 300, rx: 26, fill: "#fff", stroke: INK, "stroke-width": 6, filter: "url(#sh)"}, g);
  g.rows = rows.map(([lab, val, col], i) => { const r = el("g", {opacity: 0}, g); const y = -80 + i * 80 + (i === 2 ? 20 : 0);
    tx(r, {x: -220, y, "font-size": 38, "font-weight": 700, fill: col}, lab); tx(r, {x: 220, y, "text-anchor": "end", "font-size": 42, "font-weight": 700, fill: col}, val); return r; });
  g.line = el("line", {x1: -220, y1: 40, x2: 220, y2: 40, stroke: INK, "stroke-width": 5, opacity: 0}, g); return g; }

// ---- HOOK
S.hook = (() => { const s = scene("hook", "#a2d2ff", "#bde0fe");
  s.bal = ebal(s.stage); s.cloud = emo(s.stage, 0, 0, 170, "💨");
  seed = 3; s.puffs = []; for (let i = 0; i < 18; i++) s.puffs.push({a: rnd() * 6.28, r: 120 + rnd() * 380, e: el("circle", {r: 16 + rnd() * 14, fill: "#fff", opacity: .8}, s.stage)});
  s.q = tx(s.stage, {x: 760, y: 200, "text-anchor": "middle", "font-size": 100, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 14}, "Weigh AIR?!");
  s.trick = chip(s.stage, "💡 the SUBTRACTION trick", "#7209b7", {fs: 44}); s.ball = emo(s.stage, 0, 0, 150, "🏀");
  s.run = t => { const a = w => C("hook", w); const sp = ramp(t, a("spreads") - .2, a("spreads") + 1);
    op(s.bal, 1); tf(s.bal, "translate(760 640)"); s.bal.show(t < a("trick") ? "???" : t < a("ball") ? "" : "0.0 g", t < a("trick") ? "#ff9f1c" : "#80ffdb");
    op(s.q, ramp(t, a("weigh"), a("weigh") + .2) * (1 - ramp(t, a("trick") - .3, a("trick")))); tf(s.q, `translate(760 200) scale(${pop(t, a("weigh"))}) translate(-760 -200)`);
    const drop = ramp(t, a("pour") - .3, a("pour") + .6); op(s.cloud, ramp(t, .2, .5) * (1 - sp)); set(s.cloud, "x", 760); set(s.cloud, "y", lerp(380, 520, drop));
    s.puffs.forEach(p => { set(p.e, "cx", 760 + Math.cos(p.a) * p.r * sp); set(p.e, "cy", 520 + Math.sin(p.a) * p.r * .5 * sp); op(p.e, sp * (1 - ramp(t, a("trick") - .5, a("trick"))) * .8); });
    op(s.trick, ramp(t, a("trick"), a("trick") + .2)); popAt(s.trick, 760, 200, t, a("trick"));
    op(s.ball, ramp(t, a("ball") - .2, a("ball"))); set(s.ball, "x", 760); set(s.ball, "y", 540); }; return s; })();

// ---- UNITS
S.units = (() => { const s = scene("units", "#ffd6a5", "#fdffb6");
  s.kg = chip(s.stage, "kilograms  kg", "#ef476f", {fs: 52}); s.gm = chip(s.stage, "grams  g", "#ff9f1c", {fs: 52});
  s.rice = el("g", {}, s.stage); el("path", {d: "M-120 -150 Q0 -190 120 -150 L150 140 Q0 170 -150 140 Z", fill: "#fefae0", stroke: INK, "stroke-width": 7}, s.rice);
  tx(s.rice, {x: 0, y: -40, "text-anchor": "middle", "font-size": 52, "font-weight": 700, fill: "#bc6c25"}, "RICE"); s.r5 = tx(s.rice, {x: 0, y: 50, "text-anchor": "middle", "font-size": 64, "font-weight": 700, fill: "#e63946"}, "5 kg");
  s.bot = el("g", {}, s.stage); el("path", {d: "M-60 -110 H60 V140 Q60 160 40 160 H-40 Q-60 160 -60 140 Z", fill: "#4cc9f0", stroke: INK, "stroke-width": 6}, s.bot); el("rect", {x: -22, y: -160, width: 44, height: 50, rx: 6, fill: "#3a86ff", stroke: INK, "stroke-width": 5}, s.bot);
  tx(s.bot, {x: 0, y: 40, "text-anchor": "middle", "font-size": 44, "font-weight": 700, fill: "#fff"}, "1 L");
  s.c1 = chip(s.stage, "1 litre of water ≈ 1 kg", "#3a86ff", {fs: 36}); s.eq = chip(s.stage, "1 kg = 1000 g", "#7209b7", {fs: 56});
  s.run = t => { const a = w => C("units", w);
    op(s.kg, ramp(t, a("kilograms"), a("kilograms") + .2)); popAt(s.kg, 540, 170, t, a("kilograms")); op(s.gm, ramp(t, a("grams"), a("grams") + .2)); popAt(s.gm, 980, 170, t, a("grams"));
    op(s.rice, ramp(t, a("rice"), a("rice") + .2)); tf(s.rice, `translate(480 520) scale(${pop(t, a("rice"))})`); op(s.r5, ramp(t, a("five"), a("five") + .2));
    op(s.bot, ramp(t, a("litre"), a("litre") + .2)); tf(s.bot, `translate(1040 500) scale(${pop(t, a("litre"))})`);
    op(s.c1, ramp(t, a("kilogram"), a("kilogram") + .2)); popAt(s.c1, 1040, 720, t, a("kilogram"));
    op(s.eq, ramp(t, a("thousand"), a("thousand") + .2)); popAt(s.eq, 760, 850, t, a("thousand")); }; return s; })();

// ---- BALANCES
S.balances = (() => { const s = scene("balances", "#caffbf", "#9bf6ff");
  s.beam = beam(s.stage); s.veg = emo(s.stage, 0, 0, 110, "🥕"); s.wts = [0, 1, 2].map(() => { const g = el("g", {}, s.stage); el("rect", {x: -32, y: -50, width: 64, height: 50, rx: 8, fill: "#6c757d", stroke: INK, "stroke-width": 4}, g); tx(g, {x: 0, y: -16, "text-anchor": "middle", "font-size": 20, "font-weight": 700, fill: "#fff"}, "50 g"); return g; });
  s.l1 = chip(s.stage, "simple balance", "#6c757d", {fs: 32}); s.lev = chip(s.stage, "LEVEL ✓", "#06d6a0", {fs: 30});
  s.eb = ebal(s.stage); s.veg2 = emo(s.stage, 0, 0, 110, "🥕"); s.l2 = chip(s.stage, "electronic balance", "#3a86ff", {fs: 32});
  s.f1 = chip(s.stage, "⚡ faster", "#ff9f1c", {fs: 34}); s.f2 = chip(s.stage, "🎯 more accurate", "#e63946", {fs: 34});
  s.run = t => { const a = w => C("balances", w); const nW = t < a("known") ? 0 : Math.min(3, 1 + Math.floor((t - a("known")) / .7));
    const th = nW === 0 ? .22 : nW === 1 ? .12 : nW === 2 ? .05 : 0; const thS = th * (t > a("object") ? 1 : 0);
    op(s.beam, ramp(t, a("simple"), a("simple") + .2)); tf(s.beam, "translate(480 360)"); s.beam.tilt(-thS);
    const p1 = s.beam.pan(0, -thS), p2 = s.beam.pan(1, -thS);
    op(s.veg, ramp(t, a("object"), a("object") + .2)); set(s.veg, "x", 480 + p1[0]); set(s.veg, "y", 360 + p1[1] - 40);
    s.wts.forEach((w, i) => { op(w, i < nW ? 1 : 0); tf(w, `translate(${480 + p2[0] + (i - 1) * 56} ${360 + p2[1]})`); });
    op(s.l1, ramp(t, a("simple"), a("simple") + .2)); popAt(s.l1, 480, 700, t, a("simple")); op(s.lev, on(t, a("level"), a("electronic") + 3, .2)); popAt(s.lev, 480, 220, t, a("level"));
    op(s.eb, ramp(t, a("electronic"), a("electronic") + .2)); tf(s.eb, `translate(1150 520) scale(${pop(t, a("electronic")) * .85})`); s.eb.show(t > a("electronic") + .6 ? "150.0 g" : "0.0 g");
    op(s.veg2, ramp(t, a("electronic") + .4, a("electronic") + .6)); set(s.veg2, "x", 1150); set(s.veg2, "y", 455);
    op(s.l2, ramp(t, a("electronic"), a("electronic") + .2)); popAt(s.l2, 1150, 700, t, a("electronic"));
    op(s.f1, ramp(t, a("faster"), a("faster") + .2)); popAt(s.f1, 1020, 220, t, a("faster")); op(s.f2, ramp(t, a("accurate"), a("accurate") + .2)); popAt(s.f2, 1260, 300, t, a("accurate")); }; return s; })();

// ---- RULES
S.rules = (() => { const s = scene("rules", "#e0aaff", "#c77dff");
  s.title = chip(s.stage, "📋 3 BALANCE RULES", "#1b1b3a", {fs: 44});
  s.r = [["1️⃣ flat, steady, no wind", "#06d6a0"], ["2️⃣ switch ON with the pan EMPTY", "#3a86ff"], ["3️⃣ check it reads 0.0 g (TARE if not)", "#f77f00"]].map(([n, c]) => chip(s.stage, n, c, {fs: 32}));
  s.eb = ebal(s.stage); s.fan = emo(s.stage, 0, 0, 120, "🌀"); s.wind = el("g", {stroke: "#fff", "stroke-width": 8, "stroke-linecap": "round"}, s.stage); [0, 1, 2].forEach(i => el("line", {x1: 0, y1: i * 40, x2: 120, y2: i * 40}, s.wind));
  s.bad = tx(s.stage, {x: 1100, y: 330, "text-anchor": "middle", "font-size": 140, "font-weight": 700, fill: "#e63946", class: "out", "stroke-width": 10}, "✗");
  s.err = chip(s.stage, "ZERO ERROR!", "#e63946", {fs: 34}); s.finger = emo(s.stage, 0, 0, 100, "👆"); s.ok = chip(s.stage, "✓ back to zero", "#06d6a0", {fs: 34});
  s.run = t => { const a = w => C("rules1", w), b = w => C("rules2", w);
    op(s.title, ramp(t, a("three"), a("three") + .2)); popAt(s.title, 460, 180, t, a("three"));
    [a("one"), b("two"), b("three")].forEach((tt, i) => { op(s.r[i], ramp(t, tt, tt + .2)); popAt(s.r[i], 460, 330 + i * 120, t, tt); });
    const shake = on(t, a("shaky"), a("wrong") + .8, .2); tf(s.eb, `translate(${1100 + Math.sin(t * 40) * 10 * shake} 600) rotate(${Math.sin(t * 25) * 3 * shake})`); op(s.eb, ramp(t, a("one"), a("one") + .3));
    const fl = shake > 0 ? (Math.floor(t * 8) % 3 === 0 ? "12.3 g" : Math.floor(t * 8) % 3 === 1 ? "7.9 g" : "15.1 g") : null;
    const on1 = t > b("switch") + .3; const err = on(t, b("five") - .2, b("tare") + .3, .01) > .5;
    s.eb.show(fl ? fl : !on1 && t > b("two") - .2 ? "" : err ? "0.5 g" : "0.0 g", fl || err ? "#ff595e" : "#80ffdb");
    op(s.fan, on(t, a("fan"), a("wrong") + .8, .2)); set(s.fan, "x", 1400); set(s.fan, "y", 470); tf(s.fan, `rotate(${t * 400} 1400 470)`); op(s.wind, on(t, a("fan"), a("wrong") + .8, .2) * (.5 + .5 * Math.sin(t * 12))); tf(s.wind, "translate(1250 440)");
    op(s.bad, on(t, a("wrong"), a("wrong") + 1.2, .2));
    op(s.err, on(t, b("error"), b("back") + .8, .2)); popAt(s.err, 1100, 420, t, b("error"));
    const pr = ramp(t, b("tare") - .4, b("tare")); op(s.finger, on(t, b("tare") - .4, b("back") + .8, .2)); set(s.finger, "x", 1100 + 160); set(s.finger, "y", lerp(560, 690, pr) - (t > b("tare") + .2 ? 40 : 0));
    op(s.ok, ramp(t, b("back"), b("back") + .2)); popAt(s.ok, 1100, 420, t, b("back")); }; return s; })();

// ---- SOLID
S.solid = (() => { const s = scene("solid", "#ffe5ec", "#ffc2d1");
  s.eb = ebal(s.stage); s.obj = emo(s.stage, 0, 0, 150, "🍎"); s.c = chip(s.stage, "SOLID: put it straight on the pan ✓", "#06d6a0", {fs: 36});
  s.run = t => { const a = w => C("solid", w); const k = ramp(t, a("straight") - .3, a("straight") + .3);
    op(s.eb, 1); tf(s.eb, "translate(760 600)"); s.eb.show(t > a("read") - .2 ? "152.0 g" : "0.0 g");
    op(s.obj, 1); set(s.obj, "x", 760); set(s.obj, "y", lerp(240, 500, k));
    op(s.c, ramp(t, a("solid"), a("solid") + .2)); popAt(s.c, 760, 180, t, a("solid")); }; return s; })();

// ---- LIQUID (mass by subtraction)
S.liquid = (() => { const s = scene("liquid", "#caf0f8", "#ade8f4");
  s.eb = ebal(s.stage); s.bk = beaker(s.stage); s.c0 = chip(s.stage, "a LIQUID needs a container", "#00b4d8", {fs: 36});
  s.jug = emo(s.stage, 0, 0, 120, "🫗");
  s.p = sumPanel(s.stage, [["beaker + water", "138.0 g", INK], ["− empty beaker", "64.1 g", "#6c757d"], ["= WATER", "73.9 g", "#d00000"]]);
  s.run = t => { const a = w => C("liquid", w); const put = ramp(t, a("empty") - .3, a("empty") + .3), fill = ramp(t, a("pour"), a("pour") + 1);
    op(s.eb, 1); tf(s.eb, "translate(560 640)"); s.eb.show(t > a("hundred") - .3 ? "138.0 g" : t > a("sixtyfour") - .3 ? "64.1 g" : "0.0 g");
    op(s.bk, put > 0 ? 1 : 0); tf(s.bk, `translate(560 ${lerp(380, 610, put)})`); s.bk.fill(.7 * fill);
    op(s.jug, on(t, a("pour") - .2, a("pour") + 1.1, .2)); set(s.jug, "x", 700); set(s.jug, "y", 340);
    op(s.c0, ramp(t, a("container"), a("container") + .2)); popAt(s.c0, 560, 180, t, a("container"));
    op(s.p, ramp(t, a("sixtyfour"), a("sixtyfour") + .3)); tf(s.p, "translate(1180 480)");
    op(s.p.rows[1], ramp(t, a("sixtyfour"), a("sixtyfour") + .2)); op(s.p.rows[0], ramp(t, a("hundred"), a("hundred") + .2)); op(s.p.line, ramp(t, a("subtract"), a("subtract") + .2)); op(s.p.rows[2], ramp(t, a("seventythree"), a("seventythree") + .2)); }; return s; })();

// ---- AIR (mass by subtraction)
S.air = (() => { const s = scene("air", "#ffd166", "#f77f00");
  s.eb = ebal(s.stage); s.ball = el("g", {}, s.stage); s.bb = el("ellipse", {rx: 120, ry: 40, fill: "#e76f51", stroke: INK, "stroke-width": 7}, s.ball); s.seam = el("path", {fill: "none", stroke: INK, "stroke-width": 5}, s.ball);
  s.pump = emo(s.stage, 0, 0, 120, "💨"); s.c0 = chip(s.stage, "💡 the trick for AIR", "#7209b7", {fs: 40});
  s.p = sumPanel(s.stage, [["pumped-up ball", "597 g", INK], ["− flat ball", "586 g", "#6c757d"], ["= AIR", "11 g", "#d00000"]]);
  s.yay = chip(s.stage, "🎉 You just weighed air!", "#06d6a0", {fs: 44});
  s.run = t => { const a = w => C("air", w); const inf = ramp(t, a("pump"), a("pump") + 1.4);
    op(s.eb, 1); tf(s.eb, "translate(560 640)"); s.eb.show(t > a("ninetyseven") - .3 ? "597 g" : t > a("eightysix") - .3 ? "586 g" : "0.0 g");
    const ry = lerp(40, 120, inf); set(s.bb, "ry", ry); set(s.bb, "rx", lerp(130, 120, inf)); set(s.seam, "d", `M-120 0 H120 M0 ${-ry} V${ry}`);
    op(s.ball, ramp(t, a("flat") - .3, a("flat"))); tf(s.ball, `translate(560 ${600 - ry})`);
    op(s.pump, on(t, a("pump"), a("pump") + 1.4, .2)); set(s.pump, "x", 760 + Math.sin(t * 8) * 10); set(s.pump, "y", 420);
    op(s.c0, ramp(t, a("trick"), a("trick") + .2)); popAt(s.c0, 560, 180, t, a("trick"));
    op(s.p, ramp(t, a("eightysix"), a("eightysix") + .3)); tf(s.p, "translate(1180 480)");
    op(s.p.rows[1], ramp(t, a("eightysix"), a("eightysix") + .2)); op(s.p.rows[0], ramp(t, a("ninetyseven"), a("ninetyseven") + .2)); op(s.p.line, ramp(t, a("subtract"), a("subtract") + .2)); op(s.p.rows[2], ramp(t, a("eleven"), a("eleven") + .2));
    op(s.yay, ramp(t, a("weighed"), a("weighed") + .2)); popAt(s.yay, 1180, 760, t, a("weighed")); }; return s; })();

// ---- QUIZ
S.quiz = (() => { const s = scene("quiz", "#b5179e", "#560bad");
  s.pause = tx(s.stage, {x: 760, y: 150, "text-anchor": "middle", "font-size": 72, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 12}, "⏸ PAUSE & PREDICT!");
  s.e1 = ebal(s.stage); s.e2 = ebal(s.stage); s.k1 = beaker(s.stage, 120, 140); s.k2 = beaker(s.stage, 120, 140);
  s.l1 = chip(s.stage, "empty cup", "#fff", {fs: 30, ink: INK}); s.l2 = chip(s.stage, "cup + juice", "#fff", {fs: 30, ink: INK});
  s.q = chip(s.stage, "juice = ? g", "#ff9f1c", {fs: 46}); s.ans = chip(s.stage, "120 g − 50 g = 70 g ✓", "#06d6a0", {fs: 50});
  s.run = t => { const a = w => C("quiz1", w), b = w => C("quiz2", w);
    op(s.pause, on(t, a("pause"), b("seventy"), .2)); tf(s.pause, `translate(760 150) scale(${pop(t, a("pause"))}) translate(-760 -150)`);
    op(s.e1, ramp(t, a("empty"), a("empty") + .2)); tf(s.e1, "translate(420 600) scale(.8)"); s.e1.show(t > a("fifty") - .2 ? "50 g" : "0.0 g");
    op(s.k1, ramp(t, a("empty"), a("empty") + .2)); tf(s.k1, "translate(420 573)");
    op(s.e2, ramp(t, a("juice"), a("juice") + .2)); tf(s.e2, "translate(1100 600) scale(.8)"); s.e2.show(t > a("hundred") - .2 ? "120 g" : "0.0 g");
    op(s.k2, ramp(t, a("juice"), a("juice") + .2)); tf(s.k2, "translate(1100 573)"); s.k2.fill(.6, "#ff9f1c");
    op(s.l1, ramp(t, a("empty"), a("empty") + .2)); popAt(s.l1, 420, 760, t, a("empty")); op(s.l2, ramp(t, a("juice"), a("juice") + .2)); popAt(s.l2, 1100, 760, t, a("juice"));
    op(s.q, ramp(t, a("juice#2"), a("juice#2") + .2) * (1 - ramp(t, b("seventy") - .2, b("seventy")))); popAt(s.q, 760, 300, t, a("juice#2"));
    op(s.ans, ramp(t, b("seventy"), b("seventy") + .2)); popAt(s.ans, 760, 300, t, b("seventy")); }; return s; })();

// ---- EXAM
S.exam = (() => { const s = scene("exam", "#14213d", "#1d3557");
  const g = el("g", {transform: "translate(760 450)"}, s.stage);
  el("rect", {x: -670, y: -320, width: 1340, height: 640, rx: 34, fill: "#2b9348", stroke: "#8d5524", "stroke-width": 22, filter: "url(#sh)"}, g);
  tx(g, {x: -610, y: -240, "font-size": 50, "font-weight": 700, fill: "#ffe14d"}, "📝 EXAM CORNER · say it like this:");
  const L = [["⚖️ First, measure the mass of the empty container."], ["🥛 Then measure the container with the liquid or gas inside."], ["➖ Subtract to find the difference."], ["0️⃣ Always check the balance reads zero before weighing."]];
  let y = -150; s.lines = L.map(ls => { const r = el("g", {opacity: 0}, g); ls.forEach((x, i) => tx(r, {x: -610, y: y + i * 50, "font-size": 40, "font-weight": 600, fill: "#fff"}, x)); y += ls.length * 50 + 50; return r; });
  s.run = t => { const a = w => C("exam", w); const k = [a("first"), a("then"), a("subtract"), a("always")];
    s.lines.forEach((r, i) => { op(r, ramp(t, k[i] - .15, k[i] + .2)); tf(r, `translate(${(1 - ramp(t, k[i] - .15, k[i] + .3)) * -40} 0)`); }); }; return s; })();

// ---- HABIT (make it attractive)
S.habit = (() => { const s = scene("habit", "#06d6a0", "#118ab2");
  s.title = tx(s.stage, {x: 760, y: 180, "text-anchor": "middle", "font-size": 76, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 12}, "✨ MAKE IT ATTRACTIVE");
  s.book = emo(s.stage, 0, 0, 150, "📚"); s.plus = tx(s.stage, {x: 700, y: 490, "text-anchor": "middle", "font-size": 110, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 10}, "+");
  s.joy = ["❤️", "🎵", "🍪"].map(e => emo(s.stage, 0, 0, 150, e)); s.lab = chip(s.stage, "something you ENJOY", "#f72585", {fs: 34});
  s.face = emo(s.stage, 0, 0, 150, "😊"); s.c = chip(s.stage, "you'll LOOK FORWARD to revising!", "#1b1b3a", {fs: 36});
  s.run = t => { const a = w => C("habit1", w);
    op(s.title, ramp(t, a("attractive"), a("attractive") + .2)); tf(s.title, `translate(760 180) scale(${pop(t, a("attractive"))}) translate(-760 -180)`);
    op(s.book, ramp(t, a("pair"), a("pair") + .2)); set(s.book, "x", 480); set(s.book, "y", 460); op(s.plus, ramp(t, a("pair"), a("pair") + .2));
    const ts = [a("enjoy"), a("music"), a("snack")]; s.joy.forEach((j, i) => { const end = i < 2 ? ts[i + 1] : 1e9; op(j, on(t, ts[i], end, .15)); set(j, "x", 920); set(j, "y", 460); });
    op(s.lab, ramp(t, a("enjoy"), a("enjoy") + .2)); popAt(s.lab, 920, 620, t, a("enjoy"));
    op(s.face, ramp(t, a("forward") - .3, a("forward"))); set(s.face, "x", 1240); set(s.face, "y", 460);
    op(s.c, ramp(t, a("forward") - .3, a("forward"))); popAt(s.c, 760, 780, t, a("forward") - .3); }; return s; })();

// ---- MIND MAP
S.mindmap = (() => { const s = scene("mindmap", "#fff3b0", "#ffd6a5");
  for (let i = 0; i < 16; i++) el("line", {x1: 0, y1: 120 + i * 60, x2: 1920, y2: 120 + i * 60, stroke: "#a2d2ff", "stroke-width": 2, opacity: .6}, s.stage);
  const CX = 400, CY = 480;
  s.l2 = el("path", {d: `M${CX} ${CY} Q${CX} 760 ${CX} 760`, stroke: "#3a86ff", "stroke-width": 12, fill: "none", "stroke-linecap": "round", opacity: .35}, s.stage); s.sp = chip(s.stage, "📦 TAKES UP SPACE", "#3a86ff", {fs: 30});
  s.l1 = el("path", {d: `M${CX} ${CY} Q600 330 780 330`, stroke: "#ef476f", "stroke-width": 12, fill: "none", "stroke-linecap": "round", "stroke-dasharray": 600}, s.stage);
  s.center = el("g", {}, s.stage); el("ellipse", {rx: 170, ry: 76, fill: "#7209b7", stroke: INK, "stroke-width": 7}, s.center); tx(s.center, {x: 0, y: 16, "text-anchor": "middle", "font-size": 50, "font-weight": 700, fill: "#fff"}, "MATTER");
  s.mass = chip(s.stage, "⚖️ HAS MASS", "#ef476f", {fs: 38});
  s.subs = [["kg and g", "kilograms"], ["electronic balance", "electronic"], ["3 rules: flat · ON when empty · zero/tare", "rules"]].map(([n, w], i) => ({c: chip(s.stage, n, "#fff", {fs: 28, ink: INK}), w, i}));
  s.ult = chip(s.stage, "🚀 TheOneApp · the ultimate science app", "#7209b7", {fs: 30});
  s.phone = el("g", {}, s.stage); el("rect", {x: -130, y: -240, width: 260, height: 480, rx: 40, fill: INK}, s.phone); el("rect", {x: -112, y: -205, width: 224, height: 410, rx: 20, fill: "#fff"}, s.phone);
  tx(s.phone, {x: 0, y: -168, "text-anchor": "middle", "font-size": 32, "font-weight": 700, fill: "#7209b7"}, "TheOneApp"); tx(s.phone, {x: 0, y: -138, "text-anchor": "middle", "font-size": 17, "font-weight": 600, fill: "#6c757d"}, "the ultimate science app");
  const cp = el("clipPath", {id: "scr10"}, $("v").querySelector("defs")); el("rect", {x: -112, y: -122, width: 224, height: 327, rx: 4}, cp);
  s.scr = el("g", {"clip-path": "url(#scr10)"}, s.phone); s.shot = el("image", {href: "oneapp_mind.png", x: -112, y: -122, width: 224, height: 485, preserveAspectRatio: "xMidYMin slice"}, s.scr);
  s.ring = el("rect", {fill: "none", stroke: "#f72585", "stroke-width": 5, rx: 13}, s.scr);
  s.run = t => { const a = w => C("habit2", w);
    op(s.center, ramp(t, a("matter"), a("matter") + .2)); tf(s.center, `translate(${CX} ${CY}) scale(${pop(t, a("matter"))})`);
    op(s.sp, ramp(t, a("matter") + .3, a("matter") + .5) * .5); popAt(s.sp, CX, 760, t, a("matter") + .3); op(s.l2, ramp(t, a("matter") + .3, a("matter") + .5) * .35);
    set(s.l1, "stroke-dashoffset", 600 * (1 - ramp(t, a("mass") - .1, a("mass") + .4))); op(s.l1, t > a("mass") - .1 ? 1 : 0);
    op(s.mass, ramp(t, a("mass"), a("mass") + .2)); popAt(s.mass, 820, 330, t, a("mass"));
    s.subs.forEach(c => { const tt = a(c.w); op(c.c, ramp(t, tt, tt + .2)); popAt(c.c, 860, 430 + c.i * 80, t, tt); });
    op(s.ult, on(t, a("ultimate"), SC.mindmap.t1 + .5, .2)); popAt(s.ult, 640, 150, t, a("ultimate"));
    const ph = ramp(t, a("save"), a("save") + .6); op(s.phone, ph); tf(s.phone, `translate(${lerp(1650, 1360, ph)} 540) rotate(${lerp(12, -4, ph)})`);
    const nx = a("ultimate") + .6; const off = -122 - 190 * ramp(t, a("save"), nx); set(s.shot, "y", off);
    set(s.ring, "x", -112 + 224 * (36 / 780)); set(s.ring, "y", off + 485 * (1083 / 1688)); set(s.ring, "width", 224 * (176 / 780)); set(s.ring, "height", 485 * (72 / 1688));
    op(s.ring, on(t, nx, SC.mindmap.t1 + .5, .15) * (.6 + .4 * Math.sin(t * 8))); }; return s; })();

// ---- CLOSE
S.close = (() => { const s = scene("close", "#f15bb5", "#fee440");
  s.ans = el("g", {}, s.stage); el("rect", {x: -390, y: -70, width: 780, height: 140, rx: 70, fill: "#06d6a0", stroke: INK, "stroke-width": 7}, s.ans); tx(s.ans, {x: 0, y: 22, "text-anchor": "middle", "font-size": 56, "font-weight": 700, fill: "#fff"}, "✓ YES, by subtracting!");
  s.eb = ebal(s.stage); s.gl = beaker(s.stage, 120, 170); s.c = chip(s.stage, "⚠️ weigh the EMPTY glass first", "#e63946", {fs: 38});
  s.run = t => { const a = w => C("close", w); const tn = ramp(t, a("your") - .2, a("your") + .1);
    op(s.ans, ramp(t, a("yes"), a("yes") + .15) * (1 - tn)); tf(s.ans, `translate(760 420) scale(${pop(t, a("yes"))})`);
    op(s.eb, ramp(t, a("scale") - .2, a("scale"))); tf(s.eb, "translate(760 640)"); s.eb.show(t > a("glass") ? "?" : "0.0 g", "#ffd166");
    op(s.gl, ramp(t, a("glass"), a("glass") + .2)); tf(s.gl, "translate(760 610)"); s.gl.fill(.6);
    op(s.c, ramp(t, a("empty"), a("empty") + .2)); popAt(s.c, 760, 260, t, a("empty")); }; return s; })();

// ---- END CARD
S.end = (() => { const s = scene("end", "#3a0ca3", "#7209b7");
  tx(s.stage, {x: 960, y: 360, "text-anchor": "middle", "font-size": 44, "font-weight": 700, fill: "#ffe14d", "letter-spacing": 6}, "NEXT EPISODE");
  tx(s.stage, {x: 960, y: 480, "text-anchor": "middle", "font-size": 84, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 10}, "Measure a rock's volume");
  tx(s.stage, {x: 960, y: 580, "text-anchor": "middle", "font-size": 84, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 10}, "with just water 🪨💧");
  s.run = () => {}; return s; })();

