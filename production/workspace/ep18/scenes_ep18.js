/* =================== SCENES (Episode 18: temperature + thermometers) =================== */
const S = {};
const hex = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
const mix = (h1, h2, k) => { const a = hex(h1), b = hex(h2); return "rgb(" + a.map((v, i) => Math.round(lerp(v, b[i], clamp(k)))).join(",") + ")"; };
const HOT = "#e63946", COLD = "#3a86ff", WARM = "#ffb703";
function bowl(p, col) { const g = el("g", {}, p); const w = el("path", {d: "M-150 -10 Q0 10 150 -10 L120 90 Q0 120 -120 90 Z", fill: col, opacity: .85}, g); el("path", {d: "M-170 -30 L-130 100 Q0 140 130 100 L170 -30 Z", fill: "none", stroke: INK, "stroke-width": 7, "stroke-linejoin": "round"}, g); g.w = w; return g; }
// lab thermometer: origin at bulb centre; level 0..1
function labTherm(p, h = 420) { const g = el("g", {}, p); el("rect", {x: -16, y: -h, width: 32, height: h, rx: 16, fill: "#fff", stroke: INK, "stroke-width": 5}, g);
  const liq = el("rect", {x: -6, width: 12, fill: "#e63946"}, g); el("circle", {r: 26, fill: "#e63946", stroke: INK, "stroke-width": 5}, g);
  for (let i = 1; i < 10; i++) el("line", {x1: 6, y1: -40 - i * (h - 60) / 10, x2: 16, y2: -40 - i * (h - 60) / 10, stroke: INK, "stroke-width": 3}, g);
  g.level = k => { const hh = 30 + k * (h - 70); set(liq, "y", -hh); set(liq, "height", hh); }; g.level(.3); g.H = h; return g; }
function cup(p, col, label) { const g = el("g", {}, p); el("path", {d: "M-80 -100 L-65 80 H65 L80 -100", fill: "#ffffffcc", stroke: INK, "stroke-width": 6}, g); el("rect", {x: -72, y: -60, width: 144, height: 136, fill: col, opacity: .8}, g);
  tx(g, {x: 0, y: 150, "text-anchor": "middle", "font-size": 44, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 8}, label); return g; }

// ---- HOOK (three bowls)
S.hook = (() => { const s = scene("hook", "#caf0f8", "#ffd6a5");
  s.b1 = bowl(s.stage, COLD); s.b2 = bowl(s.stage, "#9bf6ff"); s.b3 = bowl(s.stage, "#ff8fab");
  s.l1 = chip(s.stage, "🧊 cold", COLD, {fs: 30}); s.l2 = chip(s.stage, "lukewarm", "#00b4d8", {fs: 30}); s.l3 = chip(s.stage, "♨️ warm", HOT, {fs: 30});
  s.hL = emo(s.stage, 0, 0, 120, "🤚"); s.hR = emo(s.stage, 0, 0, 120, "✋");
  s.bL = chip(s.stage, "\"WARM!\"", HOT, {fs: 34}); s.bR = chip(s.stage, "\"COLD!\"", COLD, {fs: 34});
  s.ly = tx(s.stage, {x: 760, y: 180, "text-anchor": "middle", "font-size": 84, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 12}, "🤔 Your touch got MIXED UP!");
  s.run = t => { const a = w => C("hook", w); const both = ramp(t, a("both") - .2, a("both") + .6);
    tf(s.b1, "translate(360 700)"); tf(s.b2, "translate(760 700)"); tf(s.b3, "translate(1160 700)"); [s.b1, s.b2, s.b3].forEach(b => op(b, ramp(t, .2, .5)));
    op(s.l1, ramp(t, a("cold"), a("cold") + .2)); popAt(s.l1, 360, 860, t, a("cold")); op(s.l3, ramp(t, a("warm"), a("warm") + .2)); popAt(s.l3, 1160, 860, t, a("warm")); op(s.l2, ramp(t, a("lukewarm"), a("lukewarm") + .2)); popAt(s.l2, 760, 860, t, a("lukewarm"));
    op(s.hL, ramp(t, a("one"), a("one") + .2)); set(s.hL, "x", lerp(360, 720, both)); set(s.hL, "y", lerp(580, 600, both) - Math.sin(both * Math.PI) * 140);
    op(s.hR, ramp(t, a("other"), a("other") + .2)); set(s.hR, "x", lerp(1160, 800, both)); set(s.hR, "y", lerp(580, 600, both) - Math.sin(both * Math.PI) * 140);
    op(s.bL, ramp(t, a("warm#2"), a("warm#2") + .2)); popAt(s.bL, 560, 430, t, a("warm#2")); op(s.bR, ramp(t, a("cold#2"), a("cold#2") + .2)); popAt(s.bR, 960, 430, t, a("cold#2"));
    op(s.ly, ramp(t, a("mixed"), a("mixed") + .2)); tf(s.ly, `translate(760 180) scale(${pop(t, a("mixed")) * .9}) translate(-760 -180)`); }; return s; })();

// ---- NEED NUMBERS
S.need = (() => { const s = scene("need", "#fff3b0", "#ffd166");
  s.doc = emo(s.stage, 0, 0, 170, "🧑‍⚕️"); s.fev = emo(s.stage, 0, 0, 130, "🤒"); s.bak = emo(s.stage, 0, 0, 170, "🧑‍🍳"); s.cake = emo(s.stage, 0, 0, 120, "🎂");
  s.w = [["hot?", HOT], ["warm?", WARM], ["cold?", COLD]].map(([n, c]) => tx(s.stage, {"text-anchor": "middle", "font-size": 60, "font-weight": 700, fill: c, class: "out", "stroke-width": 8}, n));
  s.x = chip(s.stage, "✗ words are not good enough", "#6c757d", {fs: 36}); s.n = chip(s.stage, "✓ we need NUMBERS 🔢", "#06d6a0", {fs: 44});
  s.run = t => { const a = w => C("need", w);
    op(s.doc, ramp(t, a("doctors"), a("doctors") + .2)); set(s.doc, "x", 340); set(s.doc, "y", 420); op(s.fev, ramp(t, a("fever"), a("fever") + .2)); set(s.fev, "x", 520); set(s.fev, "y", 440);
    op(s.bak, ramp(t, a("bakers"), a("bakers") + .2)); set(s.bak, "x", 1000); set(s.bak, "y", 420); op(s.cake, ramp(t, a("oven"), a("oven") + .2)); set(s.cake, "x", 1180); set(s.cake, "y", 450);
    s.w.forEach((e, i) => { const tt = a("words") + i * .3; op(e, ramp(t, tt, tt + .2) * (1 - ramp(t, a("numbers") - .3, a("numbers")) * .7)); set(e, "x", 460 + i * 300); set(e, "y", 680); });
    op(s.x, on(t, a("enough"), a("numbers"), .2)); popAt(s.x, 760, 800, t, a("enough")); op(s.n, ramp(t, a("numbers"), a("numbers") + .2)); popAt(s.n, 760, 800, t, a("numbers")); }; return s; })();

// ---- TEMPERATURE
S.temp = (() => { const s = scene("temp", "#ffadad", "#ffd6a5");
  s.card = el("g", {}, s.stage); el("rect", {x: -560, y: -80, width: 1120, height: 160, rx: 26, fill: "#fff", stroke: INK, "stroke-width": 7}, s.card);
  tx(s.card, {x: 0, y: -10, "text-anchor": "middle", "font-size": 44, "font-weight": 700, fill: HOT}, "🌡️ TEMPERATURE = how hot or cold"); tx(s.card, {x: 0, y: 50, "text-anchor": "middle", "font-size": 40, "font-weight": 700, fill: INK}, "measured in degrees Celsius (°C)");
  s.cups = [[50, "#e63946"], [40, "#f77f00"], [28, "#ffb703"], [10, "#3a86ff"]].map(([v, c], i) => ({g: cup(s.stage, c, v + " °C"), v, i}));
  s.c = chip(s.stage, "BIGGER number = HIGHER temperature", "#7209b7", {fs: 36});
  s.run = t => { const a = w => C("temp", w);
    op(s.card, ramp(t, a("temperature"), a("temperature") + .2)); tf(s.card, `translate(760 200) scale(${pop(t, a("temperature")) * .9})`);
    s.cups.forEach(c => { const tt = a("bigger") + c.i * .2; op(c.g, ramp(t, tt, tt + .2)); tf(c.g, `translate(${360 + c.i * 270} 560) scale(${pop(t, tt)})`); });
    op(s.c, ramp(t, a("higher"), a("higher") + .2)); popAt(s.c, 760, 820, t, a("higher")); }; return s; })();

// ---- THERMAL CAMERA
S.camera = (() => { const s = scene("camera", "#10002b", "#240046");
  s.cam = emo(s.stage, 300, 480, 160, "📹"); s.scr = el("g", {}, s.stage); el("rect", {x: -330, y: -240, width: 660, height: 480, rx: 24, fill: "#14213d", stroke: "#adb5bd", "stroke-width": 10}, s.scr);
  const grad = el("radialGradient", {id: "tc18"}, $("v").querySelector("defs")); [[0, "#fff3b0"], [.35, "#ffbe0b"], [.7, "#e63946"], [1, "#3a0ca3"]].forEach(([o, c]) => el("stop", {offset: o, "stop-color": c}, grad));
  s.ppl = [-180, 0, 180].map(x => { const g = el("g", {}, s.scr); el("circle", {cx: x, cy: -80, r: 55, fill: "url(#tc18)"}, g); el("ellipse", {cx: x, cy: 90, rx: 80, ry: 120, fill: "url(#tc18)"}, g); return g; });
  s.fev = el("circle", {cx: 180, cy: -80, r: 70, fill: "none", stroke: "#fff", "stroke-width": 6, "stroke-dasharray": "12 8"}, s.scr);
  s.c1 = chip(s.stage, "colours show temperature 🔴🟡🔵", "#ff006e", {fs: 34}); s.c2 = chip(s.stage, "✈️🏥 spot a fever without touching", "#06d6a0", {fs: 34});
  s.run = t => { const a = w => C("camera", w);
    op(s.cam, ramp(t, SC.camera.t0 - .6, SC.camera.t0 - .3)); op(s.scr, ramp(t, SC.camera.t0 - .4, SC.camera.t0)); tf(s.scr, "translate(900 480)");
    op(s.fev, ramp(t, a("fever"), a("fever") + .2) * (.5 + .5 * Math.sin(t * 6)));
    op(s.c1, ramp(t, a("colours"), a("colours") + .2)); popAt(s.c1, 760, 120, t, a("colours")); op(s.c2, ramp(t, a("airports"), a("airports") + .2)); popAt(s.c2, 760, 840, t, a("airports")); }; return s; })();

// ---- THERMOMETER TYPES
S.types = (() => { const s = scene("types", "#caffbf", "#9bf6ff");
  s.t = [["🌡️", "DIGITAL", "body temperature", "digital", "#06d6a0"], ["🔫", "INFRARED", "surfaces, from far away", "infrared", "#7209b7"], [null, "LABORATORY", "liquids + gases", "laboratory", "#d00000"]].map(([e, n, u, w, c], i) => {
    const g = el("g", {}, s.stage); el("rect", {x: -200, y: -230, width: 400, height: 460, rx: 30, fill: "#fff", stroke: c, "stroke-width": 9}, g);
    if (e) emo(g, 0, -60, 150, e); else { const th = labTherm(g, 260); tf(th, "translate(0 40) rotate(0)"); }
    tx(g, {x: 0, y: 120, "text-anchor": "middle", "font-size": 40, "font-weight": 700, fill: c}, n); tx(g, {x: 0, y: 170, "text-anchor": "middle", "font-size": 30, "font-weight": 600, fill: INK}, u); return {g, w, i}; });
  s.c = chip(s.stage, "🌡️ THERMOMETER: measures temperature accurately", "#3a86ff", {fs: 34});
  s.run = t => { const a = w => C("types", w);
    op(s.c, ramp(t, a("thermometer"), a("thermometer") + .2)); popAt(s.c, 760, 140, t, a("thermometer"));
    s.t.forEach(q => { op(q.g, ramp(t, a(q.w), a(q.w) + .2)); tf(q.g, `translate(${330 + q.i * 430} 560) scale(${pop(t, a(q.w)) * .95})`); }); }; return s; })();

// ---- LAB THERMOMETER (3 steps)
S.lab = (() => { const s = scene("lab", "#e0fbfc", "#c2dfe3");
  s.bk = el("g", {}, s.stage); el("rect", {x: -150, y: -200, width: 300, height: 200, fill: "#ff8fab", opacity: .7}, s.bk); el("path", {d: "M-160 -300 V10 H160 V-300", fill: "none", stroke: INK, "stroke-width": 8}, s.bk);
  s.th = labTherm(s.stage, 520); s.eye = emo(s.stage, 0, 0, 90, "👁️"); s.sight = el("line", {stroke: HOT, "stroke-width": 5, "stroke-dasharray": "14 8"}, s.stage);
  s.st = [["① bulb FULLY in the liquid", "one"], ["② wait until the red liquid STOPS moving", "two"], ["③ read at EYE LEVEL, bottom of the curve", "three"]].map(([n, w], i) => ({c: chip(s.stage, n, ["#00b4d8", "#f77f00", "#7209b7"][i], {fs: 30}), w, i}));
  s.no = chip(s.stage, "✗ cannot measure a SOLID: bulb must be surrounded", "#e63946", {fs: 30});
  s.run = t => { const a = w => C("lab", w); const dip = ramp(t, a("bulb") - .3, a("bulb") + .5), rise = ramp(t, a("wait") - .2, a("stops") + .3);
    tf(s.bk, "translate(500 820)"); op(s.bk, 1); tf(s.th, `translate(500 ${lerp(500, 760, dip)})`); s.th.level(.2 + .45 * rise + .02 * Math.sin(t * 9) * (rise > 0 && rise < 1 ? 1 : 0));
    const ey = lerp(500, 760, dip) - (30 + .65 * (520 - 70)); op(s.eye, ramp(t, a("eye") - .3, a("eye"))); set(s.eye, "x", 320); set(s.eye, "y", ey); set(s.sight, "x1", 360); set(s.sight, "y1", ey); set(s.sight, "x2", 540); set(s.sight, "y2", ey); op(s.sight, ramp(t, a("eye"), a("eye") + .2));
    s.st.forEach(c => { op(c.c, ramp(t, a(c.w), a(c.w) + .2)); popAt(c.c, 1100, 300 + c.i * 110, t, a(c.w)); });
    op(s.no, ramp(t, a("solid"), a("solid") + .2)); popAt(s.no, 1080, 680, t, a("solid")); }; return s; })();

// ---- DATA LOGGER
S.logger = (() => { const s = scene("logger", "#1d3557", "#14213d");
  s.dev = el("g", {}, s.stage); el("rect", {x: -230, y: -160, width: 460, height: 320, rx: 24, fill: "#495057", stroke: INK, "stroke-width": 7}, s.dev); el("rect", {x: -200, y: -130, width: 400, height: 220, rx: 10, fill: "#0b132b"}, s.dev);
  s.line = el("polyline", {fill: "none", stroke: "#80ffdb", "stroke-width": 6}, s.dev); s.rd = tx(s.dev, {x: 0, y: 135, "text-anchor": "middle", "font-size": 32, "font-weight": 700, fill: "#80ffdb"}, "");
  s.cable = el("path", {d: "M990 520 Q1100 700 1250 640", fill: "none", stroke: INK, "stroke-width": 8}, s.stage); s.sen = el("rect", {x: 1240, y: 600, width: 120, height: 26, rx: 13, fill: "#adb5bd", stroke: INK, "stroke-width": 5}, s.stage);
  s.c1 = chip(s.stage, "temperature SENSOR", "#6c757d", {fs: 30}); s.c2 = chip(s.stage, "records again + again ➜ draws a GRAPH 📈", "#06d6a0", {fs: 32});
  s.run = t => { const a = w => C("logger", w); const k = ramp(t, a("records"), a("graph") + .6);
    op(s.dev, ramp(t, a("logger"), a("logger") + .2)); tf(s.dev, "translate(760 480)"); op(s.cable, ramp(t, a("sensor"), a("sensor") + .2)); op(s.sen, ramp(t, a("sensor"), a("sensor") + .2));
    const pts = []; const n = Math.floor(2 + k * 30); for (let i = 0; i < n; i++) { const x = -190 + i * 12.5, y = 60 - 140 * (1 - Math.exp(-i / 9)); pts.push(`${x},${y}`); } set(s.line, "points", pts.join(" ")); op(s.line, k > 0 ? 1 : 0);
    s.rd.textContent = k > 0 ? (28 + 32 * (1 - Math.exp(-(n - 1) / 9))).toFixed(1) + " °C" : "";
    op(s.c1, ramp(t, a("sensor"), a("sensor") + .2)); popAt(s.c1, 1300, 720, t, a("sensor")); op(s.c2, ramp(t, a("graph"), a("graph") + .2)); popAt(s.c2, 760, 150, t, a("graph")); }; return s; })();

// ---- QUIZ
S.quiz = (() => { const s = scene("quiz", "#b5179e", "#560bad");
  s.pause = tx(s.stage, {x: 760, y: 150, "text-anchor": "middle", "font-size": 72, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 12}, "⏸ PAUSE & PREDICT!");
  s.tea = emo(s.stage, 760, 320, 130, "🍵");
  s.o = [["🌡️ DIGITAL", "digital"], ["🔫 INFRARED", "infrared"], ["🧪 LABORATORY", "laboratory"]].map(([n, w], i) => { const g = el("g", {}, s.stage); const f = el("rect", {x: -200, y: -60, width: 400, height: 120, rx: 30, fill: "#fff", stroke: INK, "stroke-width": 6}, g);
    tx(g, {x: 0, y: 16, "text-anchor": "middle", "font-size": 40, "font-weight": 700, fill: INK}, n); return {g, f, w, i}; });
  s.a1 = chip(s.stage, "✓ BEST: tea is a liquid, the bulb dips in fully", "#06d6a0", {fs: 30}); s.a2 = chip(s.stage, "also OK for its surface", "#7209b7", {fs: 28});
  s.run = t => { const a = w => C("quiz1", w), b = w => C("quiz2", w);
    op(s.pause, on(t, a("pause"), b("laboratory"), .2)); tf(s.pause, `translate(760 150) scale(${pop(t, a("pause"))}) translate(-760 -150)`); op(s.tea, ramp(t, a("tea"), a("tea") + .2));
    s.o.forEach(o => { op(o.g, ramp(t, a(o.w), a(o.w) + .2)); tf(o.g, `translate(${330 + o.i * 430} 560) scale(${pop(t, a(o.w))})`); set(o.f, "fill", t > b("laboratory") && o.i === 2 ? "#d8f3dc" : t > b("infrared") && o.i === 1 ? "#ede0fb" : "#fff"); });
    op(s.a1, ramp(t, b("liquid"), b("liquid") + .2)); popAt(s.a1, 1000, 720, t, b("liquid")); op(s.a2, ramp(t, b("infrared"), b("infrared") + .2)); popAt(s.a2, 760, 820, t, b("infrared")); }; return s; })();

// ---- EXAM
S.exam = (() => { const s = scene("exam", "#14213d", "#1d3557");
  const g = el("g", {transform: "translate(760 450)"}, s.stage);
  el("rect", {x: -670, y: -320, width: 1340, height: 640, rx: 34, fill: "#2b9348", stroke: "#8d5524", "stroke-width": 22, filter: "url(#sh)"}, g);
  tx(g, {x: -610, y: -240, "font-size": 50, "font-weight": 700, fill: "#ffe14d"}, "📝 EXAM CORNER · say it like this:");
  const L = [["🌡️ Temperature is a measure of how hot or cold", "     something is."], ["📏 It is measured in degrees Celsius (°C) using", "     a thermometer."], ["🤚 Our sense of touch cannot measure temperature", "     accurately."]];
  let y = -150; s.lines = L.map(ls => { const r = el("g", {opacity: 0}, g); ls.forEach((x, i) => tx(r, {x: -610, y: y + i * 50, "font-size": 40, "font-weight": 600, fill: "#fff"}, x)); y += ls.length * 50 + 45; return r; });
  s.run = t => { const a = w => C("exam", w); const k = [a("temperature"), a("measured"), a("touch")];
    s.lines.forEach((r, i) => { op(r, ramp(t, k[i] - .15, k[i] + .2)); tf(r, `translate(${(1 - ramp(t, k[i] - .15, k[i] + .3)) * -40} 0)`); }); }; return s; })();

// ---- HABIT (measure progress)
S.habit = (() => { const s = scene("habit", "#06d6a0", "#118ab2");
  s.title = tx(s.stage, {x: 760, y: 180, "text-anchor": "middle", "font-size": 76, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 12}, "📈 MEASURE YOUR PROGRESS");
  s.q = chip(s.stage, "📝 a quick 5-question quiz after each topic", "#1b1b3a", {fs: 34});
  s.bars = [2, 3, 3, 4, 5].map((v, i) => { const g = el("g", {}, s.stage); const r = el("rect", {x: -45, width: 90, fill: "#ffbe0b", stroke: INK, "stroke-width": 5}, g); const l = tx(g, {x: 0, "text-anchor": "middle", "font-size": 36, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 6}, v + "/5"); return {g, r, l, v, i}; });
  s.c = chip(s.stage, "🎉 watching the numbers go UP", "#f72585", {fs: 36});
  s.run = t => { const a = w => C("habit1", w);
    op(s.title, ramp(t, a("measure"), a("measure") + .2)); tf(s.title, `translate(760 180) scale(${pop(t, a("measure")) * .9}) translate(-760 -180)`);
    op(s.q, ramp(t, a("quiz"), a("quiz") + .2)); popAt(s.q, 760, 300, t, a("quiz"));
    s.bars.forEach(b => { const tt = a("score") + b.i * .3, h = 70 * b.v * ramp(t, tt, tt + .4); tf(b.g, `translate(${500 + b.i * 130} 790)`); set(b.r, "y", -h); set(b.r, "height", h); set(b.l, "y", -h - 14); op(b.g, t > tt ? 1 : 0); });
    op(s.c, ramp(t, a("numbers"), a("numbers") + .2)); popAt(s.c, 760, 880, t, a("numbers")); }; return s; })();

// ---- MIND MAP
S.mindmap = (() => { const s = scene("mindmap", "#fff3b0", "#ffd6a5");
  for (let i = 0; i < 16; i++) el("line", {x1: 0, y1: 120 + i * 60, x2: 1920, y2: 120 + i * 60, stroke: "#a2d2ff", "stroke-width": 2, opacity: .6}, s.stage);
  const CX = 400, CY2 = 470;
  s.l1 = el("path", {d: `M${CX} ${CY2} Q600 320 820 320`, stroke: HOT, "stroke-width": 12, fill: "none", "stroke-linecap": "round", "stroke-dasharray": 600}, s.stage);
  s.center = el("g", {}, s.stage); el("ellipse", {rx: 150, ry: 70, fill: "#f77f00", stroke: INK, "stroke-width": 7}, s.center); tx(s.center, {x: 0, y: 16, "text-anchor": "middle", "font-size": 50, "font-weight": 700, fill: "#fff"}, "🔥 HEAT");
  s.br = chip(s.stage, "🌡️ TEMPERATURE", HOT, {fs: 36});
  s.subs = [["measured in °C", "celsius"], ["with a THERMOMETER", "thermometer"], ["digital · infrared · laboratory", "three"]].map(([n, w], i) => ({c: chip(s.stage, n, "#fff", {fs: 28, ink: INK}), w, i}));
  s.ult = chip(s.stage, "🚀 TheOneApp · the ultimate science app", "#7209b7", {fs: 30});
  s.phone = el("g", {}, s.stage); el("rect", {x: -130, y: -240, width: 260, height: 480, rx: 40, fill: INK}, s.phone); el("rect", {x: -112, y: -205, width: 224, height: 410, rx: 20, fill: "#fff"}, s.phone);
  tx(s.phone, {x: 0, y: -168, "text-anchor": "middle", "font-size": 32, "font-weight": 700, fill: "#7209b7"}, "TheOneApp"); tx(s.phone, {x: 0, y: -138, "text-anchor": "middle", "font-size": 17, "font-weight": 600, fill: "#6c757d"}, "the ultimate science app");
  const cp = el("clipPath", {id: "scr18"}, $("v").querySelector("defs")); el("rect", {x: -112, y: -122, width: 224, height: 327, rx: 4}, cp);
  const IH = 224 * 2000 / 780; s.scr = el("g", {"clip-path": "url(#scr18)"}, s.phone); s.shot = el("image", {href: "oneapp_mind2.png", x: -112, y: -122, width: 224, height: IH, preserveAspectRatio: "xMidYMin slice"}, s.scr);
  s.ring = el("rect", {fill: "none", stroke: "#f72585", "stroke-width": 5, rx: 13}, s.scr);
  s.run = t => { const a = w => C("habit2", w);
    op(s.center, ramp(t, a("heat"), a("heat") + .2)); tf(s.center, `translate(${CX} ${CY2}) scale(${pop(t, a("heat"))})`);
    set(s.l1, "stroke-dashoffset", 600 * (1 - ramp(t, a("temperature") - .3, a("temperature") + .3))); op(s.l1, t > a("temperature") - .3 ? 1 : 0);
    op(s.br, ramp(t, a("temperature"), a("temperature") + .2)); popAt(s.br, 880, 320, t, a("temperature"));
    s.subs.forEach(c => { const tt = a(c.w); op(c.c, ramp(t, tt, tt + .2)); popAt(c.c, 900, 410 + c.i * 76, t, tt); });
    op(s.ult, on(t, a("ultimate"), SC.mindmap.t1 + .5, .2)); popAt(s.ult, 640, 150, t, a("ultimate"));
    const ph = ramp(t, a("save"), a("save") + .6); op(s.phone, ph); tf(s.phone, `translate(${lerp(1650, 1390, ph)} 540) rotate(${lerp(12, -4, ph)})`);
    const nx = a("ultimate") + .6; const off = -122 - (IH - 327) * ramp(t, a("save"), nx); set(s.shot, "y", off); const sc = IH / 2000;
    set(s.ring, "x", -112 + 210 * sc); set(s.ring, "y", off + 1722 * sc); set(s.ring, "width", 146 * sc); set(s.ring, "height", 72 * sc);
    op(s.ring, on(t, nx, SC.mindmap.t1 + .5, .15) * (.6 + .4 * Math.sin(t * 8))); }; return s; })();

// ---- CLOSE
S.close = (() => { const s = scene("close", "#f15bb5", "#fee440");
  s.ans = el("g", {}, s.stage); el("rect", {x: -420, y: -70, width: 840, height: 140, rx: 70, fill: "#06d6a0", stroke: INK, "stroke-width": 7}, s.ans); tx(s.ans, {x: 0, y: 22, "text-anchor": "middle", "font-size": 52, "font-weight": 700, fill: "#fff"}, "✓ YES: so use a thermometer!");
  s.bw = [COLD, "#9bf6ff", "#ff8fab"].map(c => bowl(s.stage, c)); s.adult = emo(s.stage, 1300, 440, 150, "🧑");
  s.c = chip(s.stage, "⚠️ only SLIGHTLY warm water, never hot", HOT, {fs: 36});
  s.run = t => { const a = w => C("close", w); const tn = ramp(t, a("your") - .2, a("your") + .1);
    op(s.ans, ramp(t, a("yes"), a("yes") + .15) * (1 - tn)); tf(s.ans, `translate(760 420) scale(${pop(t, a("yes"))})`);
    s.bw.forEach((b, i) => { const tt = a("threebowl") + i * .2; op(b, ramp(t, tt, tt + .2)); tf(b, `translate(${420 + i * 300} 520) scale(${pop(t, tt) * .8})`); });
    op(s.adult, ramp(t, a("adult"), a("adult") + .2)); op(s.c, ramp(t, a("slightly"), a("slightly") + .2)); popAt(s.c, 760, 780, t, a("slightly")); }; return s; })();

// ---- END CARD
S.end = (() => { const s = scene("end", "#3a0ca3", "#7209b7");
  tx(s.stage, {x: 960, y: 360, "text-anchor": "middle", "font-size": 44, "font-weight": 700, fill: "#ffe14d", "letter-spacing": 6}, "NEXT EPISODE");
  tx(s.stage, {x: 960, y: 480, "text-anchor": "middle", "font-size": 84, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 10}, "Heat is NOT temperature");
  tx(s.stage, {x: 960, y: 580, "text-anchor": "middle", "font-size": 84, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 10}, "(here's the difference) 🔥🌡️");
  s.run = () => {}; return s; })();

