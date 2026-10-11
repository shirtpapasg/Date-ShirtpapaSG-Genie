/* =================== SCENES (Episode 20: cold doesn't flow — heat flow, equal temperature, sources) =================== */
const S = {};
const hex = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
const mix = (h1, h2, k) => { const a = hex(h1), b = hex(h2); return "rgb(" + a.map((v, i) => Math.round(lerp(v, b[i], clamp(k)))).join(",") + ")"; };
const HOT = "#e63946", COLD = "#3a86ff", HEATC = "#ff7b00";
const tcol = v => mix(COLD, HOT, clamp((v - 5) / 60));
function readout(p) { const g = el("g", {}, p); el("rect", {x: -90, y: -36, width: 180, height: 72, rx: 18, fill: "#fff", stroke: INK, "stroke-width": 5}, g); g.t = tx(g, {x: 0, y: 16, "text-anchor": "middle", "font-size": 42, "font-weight": 700}, ""); g.v = v => { g.t.textContent = Math.round(v) + " °C"; set(g.t, "fill", tcol(v)); }; return g; }
function flames(p) { const g = el("g", {}, p); const d = []; for (let i = 0; i < 6; i++) { const e = el("text", {"text-anchor": "middle", "font-size": 44}, g); e.textContent = "🔥"; d.push(e); }
  g.run = (x1, y1, x2, y2, t, k) => d.forEach((e, i) => { const q = ((t * .6 + i / 6) % 1); set(e, "x", lerp(x1, x2, q)); set(e, "y", lerp(y1, y2, q)); op(e, k * Math.sin(q * Math.PI)); }); return g; }
function bigArrow(p, col) { const g = el("g", {}, p); el("path", {d: "M-160 -30 H80 V-70 L170 0 L80 70 V30 H-160 Z", fill: col, stroke: INK, "stroke-width": 6}, g); return g; }

// ---- HOOK
S.hook = (() => { const s = scene("hook", "#caf0f8", "#90e0ef");
  s.hand = emo(s.stage, 0, 0, 200, "✋"); s.ice = emo(s.stage, 0, 0, 170, "🧊");
  s.cold = tx(s.stage, {x: 0, y: 0, "text-anchor": "middle", "font-size": 64, "font-weight": 700, fill: COLD, class: "out", "stroke-width": 8}, "❄️ cold ➜");
  s.x = tx(s.stage, {x: 0, y: 0, "text-anchor": "middle", "font-size": 180, "font-weight": 700, fill: HOT, class: "out", "stroke-width": 10}, "✗");
  s.t = tx(s.stage, {x: 760, y: 180, "text-anchor": "middle", "font-size": 90, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 12}, "COLD doesn't flow!");
  s.run = t => { const a = w => C("hook", w);
    op(s.hand, 1); set(s.hand, "x", 1040); set(s.hand, "y", 520); op(s.ice, ramp(t, a("ice") - .3, a("ice"))); set(s.ice, "x", 480); set(s.ice, "y", 520);
    const k = ((t - .4) * .5) % 1; op(s.cold, on(t, a("cold") - .2, a("move") + .4, .2)); set(s.cold, "x", lerp(600, 880, k)); set(s.cold, "y", 400);
    op(s.x, ramp(t, a("not"), a("not") + .2)); set(s.x, "x", 760); set(s.x, "y", 480);
    op(s.t, ramp(t, a("cold") - .2, a("cold"))); tf(s.t, `translate(760 180) scale(${pop(t, a("cold") - .2) * .9}) translate(-760 -180)`); }; return s; })();

// ---- THE RULE (hand + ice)
S.rule = (() => { const s = scene("rule", "#ffd6a5", "#caf0f8");
  s.r = el("g", {}, s.stage); el("rect", {x: -620, y: -90, width: 1240, height: 180, rx: 30, fill: "#fff", stroke: INK, "stroke-width": 7}, s.r);
  tx(s.r, {x: 0, y: -18, "text-anchor": "middle", "font-size": 44, "font-weight": 700, fill: HEATC}, "🔥 Heat ALWAYS flows from"); tx(s.r, {x: 0, y: 46, "text-anchor": "middle", "font-size": 44, "font-weight": 700, fill: INK}, "HIGHER temperature ➜ LOWER temperature");
  s.hand = emo(s.stage, 0, 0, 180, "✋"); s.ice = emo(s.stage, 0, 0, 150, "🧊"); s.fl = flames(s.stage); s.pud = el("ellipse", {rx: 0, ry: 0, fill: "#90e0ef", opacity: .8}, s.stage);
  s.l1 = chip(s.stage, "hand LOSES heat ➜ feels COLD", COLD, {fs: 32}); s.l2 = chip(s.stage, "ice GAINS heat ➜ MELTS", HOT, {fs: 32});
  s.run = t => { const a = w => C("rule", w); const melt = ramp(t, a("melts") - .3, a("melts") + 1);
    op(s.r, ramp(t, a("rule") - .2, a("rule"))); tf(s.r, `translate(760 200) scale(${pop(t, a("rule") - .2) * .95})`);
    op(s.hand, ramp(t, a("hold") - .3, a("hold"))); set(s.hand, "x", 1050); set(s.hand, "y", 560); op(s.ice, ramp(t, a("hold") - .3, a("hold"))); set(s.ice, "x", 470); set(s.ice, "y", 560 + melt * 20); tf(s.ice, `scale(${1 - melt * .3})`); s.ice.setAttribute("transform-origin", "470 600");
    set(s.pud, "cx", 470); set(s.pud, "cy", 640); set(s.pud, "rx", 110 * melt); set(s.pud, "ry", 20 * melt);
    s.fl.run(960, 560, 560, 560, t, on(t, a("out"), SC.rule.t1 + .3, .3));
    op(s.l1, ramp(t, a("loses"), a("loses") + .2)); popAt(s.l1, 1050, 760, t, a("loses")); op(s.l2, ramp(t, a("gains"), a("gains") + .2)); popAt(s.l2, 470, 760, t, a("gains")); }; return s; })();

// ---- THE FRIDGE DOOR
S.door = (() => { const s = scene("door", "#e0fbfc", "#c2dfe3");
  s.fr = el("g", {}, s.stage); el("rect", {x: -170, y: -300, width: 340, height: 600, rx: 26, fill: "#dee2e6", stroke: INK, "stroke-width": 8}, s.fr); el("rect", {x: -150, y: -280, width: 300, height: 560, rx: 12, fill: "#caf0f8"}, s.fr);
  emo(s.fr, 0, -150, 90, "🥛"); emo(s.fr, 0, 30, 90, "🍉"); emo(s.fr, 0, 180, 90, "🥚");
  s.door = el("rect", {x: 0, y: -300, width: 340, height: 600, rx: 26, fill: "#f8f9fa", stroke: INK, "stroke-width": 8}, s.stage);
  s.bub = el("g", {}, s.stage); el("rect", {x: -380, y: -70, width: 760, height: 140, rx: 40, fill: "#fff", stroke: INK, "stroke-width": 6}, s.bub); tx(s.bub, {x: 0, y: 14, "text-anchor": "middle", "font-size": 36, "font-weight": 700, fill: INK}, "\"Close the door! You're letting the cold out!\"");
  s.x = tx(s.stage, {x: 1340, y: 230, "text-anchor": "middle", "font-size": 120, "font-weight": 700, fill: HOT, class: "out", "stroke-width": 8}, "✗");
  s.fl = flames(s.stage); s.c = chip(s.stage, "✓ HEAT flows from the warm air INTO the fridge", HEATC, {fs: 34});
  s.run = t => { const a = w => C("door", w); const open = ramp(t, SC.door.t0, SC.door.t0 + .6);
    tf(s.fr, "translate(500 560)"); op(s.fr, 1); set(s.door, "x", 330); set(s.door, "y", 260); set(s.door, "width", 340 * (1 - open * .85)); op(s.door, 1);
    op(s.bub, ramp(t, a("close") - .3, a("close"))); tf(s.bub, `translate(1000 240) scale(${pop(t, a("close") - .3) * .85})`);
    op(s.x, ramp(t, a("backwards"), a("backwards") + .2)); s.fl.run(1200, 560, 560, 560, t, ramp(t, a("heat"), a("heat") + .3));
    op(s.c, ramp(t, a("heat"), a("heat") + .2)); popAt(s.c, 1000, 880, t, a("heat")); }; return s; })();

// ---- THREE EXAMPLES
S.examples = (() => { const s = scene("examples", "#fff3b0", "#ffd166");
  const xs = [330, 760, 1190];
  s.p = [["🍳", "🔥", "flame ➜ pot + water", "stove"], ["☕", "🥄", "coffee ➜ spoon", "spoon"], ["🍵", "💨", "tea ➜ the air around it", "tea"]].map(([e1, e2, lab, w], i) => { const g = el("g", {}, s.stage);
    el("rect", {x: -200, y: -230, width: 400, height: 460, rx: 30, fill: "#fff", stroke: INK, "stroke-width": 6}, g); emo(g, -50, -60, 140, e1); emo(g, 70, 30, 100, e2);
    const ar = bigArrow(g, HEATC); tf(ar, "translate(0 130) scale(.6)"); tx(g, {x: 0, y: 200, "text-anchor": "middle", "font-size": 28, "font-weight": 700, fill: INK}, lab); return {g, ar, w, i}; });
  s.run = t => { const a = w => C("examples", w);
    s.p.forEach(p => { const tt = a(p.w) - .4; op(p.g, ramp(t, tt, tt + .2)); tf(p.g, `translate(${xs[p.i]} 520) scale(${pop(t, tt)})`); op(p.ar, .6 + .4 * Math.sin(t * 5)); }); }; return s; })();

// ---- WHEN DOES IT STOP (cup in box)
S.stop = (() => { const s = scene("stop", "#bde0fe", "#a2d2ff");
  s.box = el("g", {}, s.stage); s.bw = el("rect", {x: -330, y: -170, width: 660, height: 300, fill: COLD, opacity: .55}, s.box); el("path", {d: "M-350 -230 V150 H350 V-230", fill: "none", stroke: INK, "stroke-width": 8}, s.box);
  s.cup = el("g", {}, s.stage); s.cw = el("rect", {x: -110, y: -150, width: 220, height: 200, fill: HOT, opacity: .7}, s.cup); el("path", {d: "M-120 -200 V60 H120 V-200", fill: "none", stroke: "#495057", "stroke-width": 10}, s.cup);
  s.r1 = readout(s.stage); s.r2 = readout(s.stage); s.fl = flames(s.stage);
  s.eq = chip(s.stage, "SAME temperature ➜ heat flow STOPS ⏹", "#06d6a0", {fs: 40});
  s.run = t => { const a = w => C("stop", w); const k = ramp(t, a("hot") - .2, a("thirtyfive") + .2);
    tf(s.box, "translate(760 600)"); op(s.box, 1); tf(s.cup, "translate(760 600)"); op(s.cup, ramp(t, a("cup") - .3, a("cup")));
    const v1 = lerp(50, 35, k), v2 = lerp(20, 35, k); set(s.cw, "fill", tcol(v1)); set(s.bw, "fill", tcol(v2));
    op(s.r1, ramp(t, a("fifty") - .2, a("fifty"))); tf(s.r1, "translate(760 270)"); s.r1.v(v1); op(s.r2, ramp(t, a("twenty") - .2, a("twenty"))); tf(s.r2, "translate(1240 480)"); s.r2.v(v2);
    s.fl.run(860, 560, 1050, 620, t, on(t, a("flows"), a("same") - .2, .3)); op(s.eq, ramp(t, a("same"), a("same") + .2)); popAt(s.eq, 760, 150, t, a("same")); }; return s; })();

// ---- LINE GRAPH
S.graph = (() => { const s = scene("graph", "#fff3b0", "#ffd6a5");
  const X0 = 400, Y0 = 820, W = 760, H = 540; const yv = v => Y0 - H * (v - 10) / 50, xv = m => X0 + W * m / 30;
  s.ax = el("path", {d: `M${X0} ${Y0 - H - 20} V${Y0} H${X0 + W + 20}`, fill: "none", stroke: INK, "stroke-width": 7}, s.stage);
  s.ty = tx(s.stage, {x: X0 - 20, y: Y0 - H - 30, "text-anchor": "end", "font-size": 30, "font-weight": 700, fill: "#7209b7"}, "temperature (°C) ⬆"); s.tx2 = tx(s.stage, {x: X0 + W, y: Y0 + 60, "text-anchor": "end", "font-size": 30, "font-weight": 700, fill: "#6c757d"}, "time (min) ➜");
  [10, 20, 35, 50].forEach(v => tx(s.stage, {x: X0 - 14, y: yv(v) + 10, "text-anchor": "end", "font-size": 26, "font-weight": 700, fill: INK}, v));
  const d1 = [], d2 = []; for (let m = 0; m <= 30; m += 2.5) { const f = m < 15 ? 1 - Math.exp(-m / 4) : 1; const ff = Math.min(1, f / (1 - Math.exp(-15 / 4))); d1.push([m, 50 - 15 * ff]); d2.push([m, 20 + 15 * ff]); }
  s.l1 = el("polyline", {fill: "none", stroke: HOT, "stroke-width": 7}, s.stage); s.l2 = el("polyline", {fill: "none", stroke: COLD, "stroke-width": 7}, s.stage);
  s.dots = [...d1.map(p => [p, HOT]), ...d2.map(p => [p, COLD])].map(([p, c]) => ({p, e: el("circle", {cx: xv(p[0]), cy: yv(p[1]), r: 9, fill: c, stroke: INK, "stroke-width": 3}, s.stage)}));
  s.dp = chip(s.stage, "● DATA POINT", "#f77f00", {fs: 30}); s.flat = chip(s.stage, "lines MEET ➜ go FLAT", "#06d6a0", {fs: 34});
  s.run = t => { const a = w => C("graph", w); const k = ramp(t, a("line") - .2, a("meet") + .4);
    op(s.ax, ramp(t, a("graph") - .3, a("graph"))); op(s.tx2, ramp(t, a("horizontal"), a("horizontal") + .2)); op(s.ty, ramp(t, a("vertical"), a("vertical") + .2));
    const n = Math.max(1, Math.round(k * d1.length)); s.dots.forEach((d, i) => op(d.e, (i % d1.length) < n && t > a("data") ? 1 : 0));
    set(s.l1, "points", d1.slice(0, n).map(p => `${xv(p[0])},${yv(p[1])}`).join(" ")); set(s.l2, "points", d2.slice(0, n).map(p => `${xv(p[0])},${yv(p[1])}`).join(" ")); op(s.l1, t > a("line") ? 1 : 0); op(s.l2, t > a("line") ? 1 : 0);
    op(s.dp, ramp(t, a("data"), a("data") + .2)); popAt(s.dp, xv(5) + 100, yv(44), t, a("data")); op(s.flat, ramp(t, a("flat"), a("flat") + .2)); popAt(s.flat, xv(22), yv(42), t, a("flat")); }; return s; })();

// ---- ROD IN A FIRE
S.rod = (() => { const s = scene("rod", "#2b2d42", "#3c1518");
  s.fire = emo(s.stage, 420, 620, 220, "🔥"); const g = el("linearGradient", {id: "rod20", x1: 0, x2: 1}, $("v").querySelector("defs")); s.st = [0, 1].map(o => el("stop", {offset: o, "stop-color": "#adb5bd"}, g));
  s.rod = el("rect", {x: 380, y: 540, width: 820, height: 40, rx: 14, fill: "url(#rod20)", stroke: INK, "stroke-width": 5}, s.stage);
  s.ar = bigArrow(s.stage, HEATC); s.hand = emo(s.stage, 0, 0, 130, "✋"); s.no = el("g", {}, s.stage); el("circle", {r: 90, fill: "none", stroke: HOT, "stroke-width": 14}, s.no); el("line", {x1: -64, y1: -64, x2: 64, y2: 64, stroke: HOT, "stroke-width": 14}, s.no);
  s.c = chip(s.stage, "heat flows ALONG the rod ➜ to the cooler end", HEATC, {fs: 34});
  s.run = t => { const a = w => C("rod", w); const k = ramp(t, a("travels") - .3, a("travels") + 3);
    op(s.fire, 1); set(s.st[0], "stop-color", mix("#adb5bd", HOT, ramp(t, a("fire") - .3, a("fire") + .5))); set(s.st[1], "stop-color", mix("#adb5bd", "#ff9f1c", k)); set(s.st[1], "offset", 1);
    op(s.ar, ramp(t, a("travels") - .2, a("travels"))); tf(s.ar, `translate(${lerp(600, 980, ((t * .4) % 1))} 470) scale(.6)`);
    op(s.hand, ramp(t, a("never") - .3, a("never"))); set(s.hand, "x", 1240); set(s.hand, "y", 470); op(s.no, ramp(t, a("never"), a("never") + .2)); tf(s.no, "translate(1240 470)");
    op(s.c, ramp(t, a("travels"), a("travels") + .2)); popAt(s.c, 760, 200, t, a("travels")); }; return s; })();

// ---- SOURCES OF HEAT
S.source = (() => { const s = scene("source", "#ffbe0b", "#fb5607");
  s.def = chip(s.stage, "SOURCE OF HEAT: hotter than its surroundings", "#1b1b3a", {fs: 36});
  s.ex = [["🔥", "flame", "flame"], ["☕", "hot coffee", "coffee"], ["🍵", "hot tea", "tea"]].map(([e, n, w], i) => { const g = el("g", {}, s.stage); el("circle", {r: 90, fill: "#fff", stroke: INK, "stroke-width": 6}, g); emo(g, 0, -5, 100, e);
    tx(g, {x: 0, y: 130, "text-anchor": "middle", "font-size": 30, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 6}, n); return {g, w, i}; });
  s.sun = emo(s.stage, 0, 0, 200, "☀️"); s.sunL = chip(s.stage, "☀️ the SUN: our biggest natural source", HEATC, {fs: 32});
  s.earth = el("g", {}, s.stage); el("rect", {x: -260, y: -40, width: 520, height: 260, fill: "#8d6e63", stroke: INK, "stroke-width": 6}, s.earth); el("rect", {x: -260, y: 130, width: 520, height: 90, fill: HOT, opacity: .8}, s.earth);
  el("path", {d: "M-40 -40 Q-60 -110 0 -140 Q60 -110 40 -40 Z", fill: "#90e0ef", stroke: INK, "stroke-width": 5}, s.earth); s.steam = emo(s.earth, 0, -190, 80, "♨️"); s.egg = emo(s.earth, 120, -90, 70, "🥚");
  s.eL = chip(s.stage, "🌍 the EARTH: heats water ➜ hot springs", "#8d6e63", {fs: 32});
  s.run = t => { const a = w => C("source", w); const nat = ramp(t, a("sun") - .3, a("sun"));
    op(s.def, ramp(t, a("source"), a("source") + .2)); popAt(s.def, 760, 150, t, a("source"));
    s.ex.forEach(e => { op(e.g, ramp(t, a(e.w), a(e.w) + .2) * (1 - nat)); tf(e.g, `translate(${420 + e.i * 340} 470) scale(${pop(t, a(e.w))})`); });
    op(s.sun, nat); set(s.sun, "x", 420); set(s.sun, "y", 440); tf(s.sun, `rotate(${t * 10} 420 440)`); op(s.sunL, nat); popAt(s.sunL, 420, 640, t, a("sun"));
    op(s.earth, ramp(t, a("earth") - .2, a("earth"))); tf(s.earth, "translate(1100 640) scale(.85)"); op(s.eL, ramp(t, a("springs") - .3, a("springs"))); popAt(s.eL, 1100, 880, t, a("springs") - .3); }; return s; })();

// ---- QUIZ
S.quiz = (() => { const s = scene("quiz", "#b5179e", "#560bad");
  s.pause = tx(s.stage, {x: 760, y: 150, "text-anchor": "middle", "font-size": 72, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 12}, "⏸ PAUSE & PREDICT!");
  s.hand = emo(s.stage, 500, 500, 180, "✋"); s.sp = emo(s.stage, 1000, 500, 160, "🥄");
  s.o1 = chip(s.stage, "❄️ cold: spoon ➜ hand ?", COLD, {fs: 34}); s.o2 = chip(s.stage, "🔥 heat: hand ➜ spoon ?", HEATC, {fs: 34});
  s.ar = bigArrow(s.stage, HEATC); s.x = tx(s.stage, {x: 0, y: 0, "text-anchor": "middle", "font-size": 80, "font-weight": 700, fill: HOT, class: "out", "stroke-width": 8}, "✗");
  s.ans = chip(s.stage, "hand LOST heat ➜ felt cold · NO cold moved", "#06d6a0", {fs: 34});
  s.run = t => { const a = w => C("quiz1", w), b = w => C("quiz2", w); const rv = ramp(t, b("hand") - .2, b("hand"));
    op(s.pause, on(t, a("pause"), b("hand"), .2)); tf(s.pause, `translate(760 150) scale(${pop(t, a("pause"))}) translate(-760 -150)`);
    op(s.hand, 1); op(s.sp, ramp(t, a("spoon"), a("spoon") + .2));
    op(s.o1, ramp(t, a("way") - .3, a("way"))); popAt(s.o1, 760, 720, t, a("way") - .3); op(s.o2, ramp(t, a("way"), a("way") + .2)); popAt(s.o2, 760, 820, t, a("way"));
    op(s.x, rv); set(s.x, "x", 1060); set(s.x, "y", 740); op(s.ar, rv); tf(s.ar, "translate(760 500) scale(.9)");
    op(s.ans, ramp(t, b("cold"), b("cold") + .2)); popAt(s.ans, 760, 300, t, b("cold")); }; return s; })();

// ---- EXAM
S.exam = (() => { const s = scene("exam", "#14213d", "#1d3557");
  const g = el("g", {transform: "translate(760 450)"}, s.stage);
  el("rect", {x: -670, y: -320, width: 1340, height: 640, rx: 34, fill: "#2b9348", stroke: "#8d5524", "stroke-width": 22, filter: "url(#sh)"}, g);
  tx(g, {x: -610, y: -240, "font-size": 50, "font-weight": 700, fill: "#ffe14d"}, "📝 EXAM CORNER · say it like this:");
  const L = [["🔥 Heat flows from a place of higher temperature to a", "     place of lower temperature,"], ["🟰 until both are at the same temperature."], ["✗ Never say that \"cold flows\"."]];
  let y = -150; s.lines = L.map(ls => { const r = el("g", {opacity: 0}, g); ls.forEach((x, i) => tx(r, {x: -610, y: y + i * 50, "font-size": 40, "font-weight": 600, fill: "#fff"}, x)); y += ls.length * 50 + 50; return r; });
  s.run = t => { const a = w => C("exam", w); const k = [a("heat"), a("until"), a("never")];
    s.lines.forEach((r, i) => { op(r, ramp(t, k[i] - .15, k[i] + .2)); tf(r, `translate(${(1 - ramp(t, k[i] - .15, k[i] + .3)) * -40} 0)`); }); }; return s; })();

// ---- HABIT (name the direction)
S.habit = (() => { const s = scene("habit", "#06d6a0", "#118ab2");
  s.title = tx(s.stage, {x: 760, y: 180, "text-anchor": "middle", "font-size": 76, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 12}, "🧭 NAME THE DIRECTION");
  s.st = [["➕ what GAINS heat", "gains", HOT], ["➖ what LOSES heat", "loses", COLD], ["➡️ where the heat FLOWS", "flows", HEATC]].map(([n, w, c], i) => ({c: chip(s.stage, n, c, {fs: 40}), w, i}));
  s.c = chip(s.stage, "a guess ➜ FULL MARKS ⭐", "#1b1b3a", {fs: 40});
  s.run = t => { const a = w => C("habit1", w);
    op(s.title, ramp(t, a("direction"), a("direction") + .2)); tf(s.title, `translate(760 180) scale(${pop(t, a("direction")) * .95}) translate(-760 -180)`);
    s.st.forEach(c => { op(c.c, ramp(t, a(c.w), a(c.w) + .2)); popAt(c.c, 760, 340 + c.i * 120, t, a(c.w)); });
    op(s.c, ramp(t, a("marks") - .4, a("marks"))); popAt(s.c, 760, 800, t, a("marks") - .4); }; return s; })();

// ---- MIND MAP
S.mindmap = (() => { const s = scene("mindmap", "#fff3b0", "#ffd6a5");
  for (let i = 0; i < 16; i++) el("line", {x1: 0, y1: 120 + i * 60, x2: 1920, y2: 120 + i * 60, stroke: "#a2d2ff", "stroke-width": 2, opacity: .6}, s.stage);
  const CX = 380, CY2 = 470;
  s.dim = [["🌡️ TEMPERATURE", HOT, 260, 240], ["⚡ HEAT (energy)", HEATC, 300, 740]].map(([n, c, x, y]) => ({l: el("path", {d: `M${CX} ${CY2} L${x} ${y}`, stroke: c, "stroke-width": 12, opacity: .35}, s.stage), c: chip(s.stage, n, c, {fs: 26}), x, y}));
  s.l1 = el("path", {d: `M${CX} ${CY2} Q600 380 860 380`, stroke: "#ff006e", "stroke-width": 12, fill: "none", "stroke-linecap": "round", "stroke-dasharray": 600}, s.stage);
  s.center = el("g", {}, s.stage); el("ellipse", {rx: 150, ry: 70, fill: "#f77f00", stroke: INK, "stroke-width": 7}, s.center); tx(s.center, {x: 0, y: 16, "text-anchor": "middle", "font-size": 50, "font-weight": 700, fill: "#fff"}, "🔥 HEAT");
  s.br = chip(s.stage, "➡️ HEAT FLOW", "#ff006e", {fs: 36});
  s.subs = [["HOT ➜ COLD", "hot"], ["stops when temperatures are EQUAL", "stops"], ["sources: ☀️ Sun · 🌍 Earth", "sources"]].map(([n, w], i) => ({c: chip(s.stage, n, "#fff", {fs: 28, ink: INK}), w, i}));
  s.ult = chip(s.stage, "🚀 TheOneApp · the ultimate science app", "#7209b7", {fs: 30});
  s.phone = el("g", {}, s.stage); el("rect", {x: -130, y: -240, width: 260, height: 480, rx: 40, fill: INK}, s.phone); el("rect", {x: -112, y: -205, width: 224, height: 410, rx: 20, fill: "#fff"}, s.phone);
  tx(s.phone, {x: 0, y: -168, "text-anchor": "middle", "font-size": 32, "font-weight": 700, fill: "#7209b7"}, "TheOneApp"); tx(s.phone, {x: 0, y: -138, "text-anchor": "middle", "font-size": 17, "font-weight": 600, fill: "#6c757d"}, "the ultimate science app");
  const cp = el("clipPath", {id: "scr20"}, $("v").querySelector("defs")); el("rect", {x: -112, y: -122, width: 224, height: 327, rx: 4}, cp);
  const IH = 224 * 2000 / 780; s.scr = el("g", {"clip-path": "url(#scr20)"}, s.phone); s.shot = el("image", {href: "oneapp_mind2.png", x: -112, y: -122, width: 224, height: IH, preserveAspectRatio: "xMidYMin slice"}, s.scr);
  s.ring = el("rect", {fill: "none", stroke: "#f72585", "stroke-width": 5, rx: 13}, s.scr);
  s.run = t => { const a = w => C("habit2", w);
    op(s.center, ramp(t, a("heat"), a("heat") + .2)); tf(s.center, `translate(${CX} ${CY2}) scale(${pop(t, a("heat"))})`);
    s.dim.forEach(d => { op(d.l, ramp(t, a("heat") + .3, a("heat") + .5) * .35); op(d.c, ramp(t, a("heat") + .3, a("heat") + .5) * .5); popAt(d.c, d.x, d.y, t, a("heat") + .3); });
    set(s.l1, "stroke-dashoffset", 600 * (1 - ramp(t, a("flow") - .3, a("flow") + .3))); op(s.l1, t > a("flow") - .3 ? 1 : 0);
    op(s.br, ramp(t, a("flow"), a("flow") + .2)); popAt(s.br, 920, 380, t, a("flow"));
    s.subs.forEach(c => { const tt = a(c.w); op(c.c, ramp(t, tt, tt + .2)); popAt(c.c, 940, 470 + c.i * 76, t, tt); });
    op(s.ult, on(t, a("ultimate"), SC.mindmap.t1 + .5, .2)); popAt(s.ult, 640, 150, t, a("ultimate"));
    const ph = ramp(t, a("save"), a("save") + .6); op(s.phone, ph); tf(s.phone, `translate(${lerp(1650, 1400, ph)} 560) rotate(${lerp(12, -4, ph)})`);
    const nx = a("ultimate") + .6; const off = -122 - (IH - 327) * ramp(t, a("save"), nx); set(s.shot, "y", off); const sc = IH / 2000;
    set(s.ring, "x", -112 + 210 * sc); set(s.ring, "y", off + 1722 * sc); set(s.ring, "width", 146 * sc); set(s.ring, "height", 72 * sc);
    op(s.ring, on(t, nx, SC.mindmap.t1 + .5, .15) * (.6 + .4 * Math.sin(t * 8))); }; return s; })();

// ---- CLOSE
S.close = (() => { const s = scene("close", "#f15bb5", "#fee440");
  s.ans = el("g", {}, s.stage); el("rect", {x: -420, y: -70, width: 840, height: 140, rx: 70, fill: "#06d6a0", stroke: INK, "stroke-width": 7}, s.ans); tx(s.ans, {x: 0, y: 22, "text-anchor": "middle", "font-size": 52, "font-weight": 700, fill: "#fff"}, "✗ NEVER! Heat flows OUT 🔥➡️");
  s.fam = emo(s.stage, 420, 470, 170, "🧑"); s.fr = emo(s.stage, 1100, 470, 200, "🧊"); s.bub = chip(s.stage, "\"Heat is flowing IN, not cold flowing out!\"", "#7209b7", {fs: 34});
  s.run = t => { const a = w => C("close", w); const tn = ramp(t, a("someone") - .3, a("someone"));
    op(s.ans, ramp(t, a("never"), a("never") + .15) * (1 - tn)); tf(s.ans, `translate(760 420) scale(${pop(t, a("never"))})`);
    op(s.fam, ramp(t, a("someone"), a("someone") + .2)); op(s.fr, ramp(t, a("door"), a("door") + .2));
    op(s.bub, ramp(t, a("explain"), a("explain") + .2)); popAt(s.bub, 760, 760, t, a("explain")); }; return s; })();

// ---- END CARD
S.end = (() => { const s = scene("end", "#3a0ca3", "#7209b7");
  tx(s.stage, {x: 960, y: 360, "text-anchor": "middle", "font-size": 44, "font-weight": 700, fill: "#ffe14d", "letter-spacing": 6}, "NEXT EPISODE");
  tx(s.stage, {x: 960, y: 480, "text-anchor": "middle", "font-size": 84, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 10}, "Why your pot has");
  tx(s.stage, {x: 960, y: 580, "text-anchor": "middle", "font-size": 84, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 10}, "a plastic handle 🍳");
  s.run = () => {}; return s; })();

