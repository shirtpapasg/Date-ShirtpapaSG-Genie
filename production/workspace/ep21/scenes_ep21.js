/* =================== SCENES (Episode 21: good and poor conductors of heat) =================== */
const S = {};
const hex = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
const mix = (h1, h2, k) => { const a = hex(h1), b = hex(h2); return "rgb(" + a.map((v, i) => Math.round(lerp(v, b[i], clamp(k)))).join(",") + ")"; };
const HOT = "#e63946", COLD = "#3a86ff", MET = "#adb5bd", WOOD = "#b5835a", PLAS = "#06d6a0", GLS = "#caf0f8";
function pot(p) { const g = el("g", {}, p); g.body = el("path", {d: "M-200 -120 H200 L180 120 Q0 160 -180 120 Z", fill: MET, stroke: INK, "stroke-width": 8}, g); el("rect", {x: -220, y: -140, width: 440, height: 30, rx: 12, fill: "#6c757d", stroke: INK, "stroke-width": 6}, g);
  g.hl = el("rect", {x: 210, y: -110, width: 230, height: 50, rx: 25, fill: MET, stroke: INK, "stroke-width": 7}, g); return g; }
function hotWater(p, w = 360, h = 160) { const g = el("g", {}, p); el("rect", {x: -w / 2, y: 0, width: w, height: h, fill: HOT, opacity: .45}, g); el("path", {d: `M${-w / 2 - 10} -60 V${h} H${w / 2 + 10} V-60`, fill: "none", stroke: INK, "stroke-width": 7}, g); return g; }
function steam(p, n = 4) { const g = el("g", {}, p); const s = []; for (let i = 0; i < n; i++) s.push(el("path", {d: "M0 0 q-12 -20 0 -40 q12 -20 0 -40", fill: "none", stroke: "#fff", "stroke-width": 6, "stroke-linecap": "round"}, g)); g.run = (x, y, t) => s.forEach((e, i) => { const k = (t * .7 + i / n) % 1; set(e, "transform", `translate(${x - 60 + i * 40} ${y - k * 60})`); op(e, Math.sin(k * Math.PI) * .8); }); return g; }

// ---- HOOK
S.hook = (() => { const s = scene("hook", "#ffd166", "#f77f00");
  s.stove = emo(s.stage, 640, 820, 180, "🔥"); s.p = pot(s.stage); s.st = steam(s.stage); s.hand = emo(s.stage, 0, 0, 130, "✋"); s.ow = tx(s.stage, {x: 1260, y: 330, "text-anchor": "middle", "font-size": 70, "font-weight": 700, fill: HOT, class: "out", "stroke-width": 8}, "OUCH!");
  s.q = chip(s.stage, "🤔 why a PLASTIC handle?", "#1b1b3a", {fs: 44}); s.c = chip(s.stage, "⏩ how FAST heat travels", HOT, {fs: 40});
  s.run = t => { const a = w => C("hook", w); const plast = ramp(t, a("plastic") - .2, a("plastic") + .3), allm = on(t, a("whole"), a("answer") - .3, .2);
    tf(s.p, "translate(640 600)"); op(s.p, 1); set(s.p.hl, "fill", t > a("whole") - .2 && t < a("answer") - .3 ? MET : mix(MET, "#212529", plast)); s.st.run(640, 440, t); op(s.st, 1);
    op(s.hand, allm); set(s.hand, "x", 1100 + Math.sin(t * 20) * 6 * allm); set(s.hand, "y", 460); op(s.ow, allm * ramp(t, a("pick"), a("pick") + .2));
    op(s.q, on(t, a("plastic"), a("whole"), .2)); popAt(s.q, 760, 180, t, a("plastic")); op(s.c, ramp(t, a("fast"), a("fast") + .2)); popAt(s.c, 760, 180, t, a("fast")); }; return s; })();

// ---- SPOONS
S.spoons = (() => { const s = scene("spoons", "#caf0f8", "#ade8f4");
  s.w = hotWater(s.stage); s.ms = el("rect", {x: -14, y: -260, width: 28, height: 380, rx: 14, fill: MET, stroke: INK, "stroke-width": 5}, s.stage); s.ws = el("rect", {x: -14, y: -260, width: 28, height: 380, rx: 14, fill: WOOD, stroke: INK, "stroke-width": 5}, s.stage);
  s.lm = chip(s.stage, "metal", "#fff", {fs: 30, ink: INK}); s.lw = chip(s.stage, "wood", "#fff", {fs: 30, ink: INK}); s.hot = chip(s.stage, "🔥 HOT!", HOT, {fs: 36}); s.cool = chip(s.stage, "😌 still cool", COLD, {fs: 36});
  s.c = chip(s.stage, "heat flowed through METAL much FASTER", "#7209b7", {fs: 36});
  s.run = t => { const a = w => C("spoons", w); const k = ramp(t, a("minute"), a("feels") + .6);
    tf(s.w, "translate(760 560)"); op(s.w, 1); tf(s.ms, "translate(680 560) rotate(-12)"); tf(s.ws, "translate(840 560) rotate(12)"); op(s.ms, ramp(t, a("metal") - .2, a("metal"))); op(s.ws, ramp(t, a("wooden") - .2, a("wooden")));
    set(s.ms, "fill", mix(MET, "#ff6b6b", k));
    op(s.lm, ramp(t, a("metal"), a("metal") + .2)); popAt(s.lm, 560, 280, t, a("metal")); op(s.lw, ramp(t, a("wooden"), a("wooden") + .2)); popAt(s.lw, 960, 280, t, a("wooden"));
    op(s.hot, ramp(t, a("hot#2"), a("hot#2") + .2)); popAt(s.hot, 560, 200, t, a("hot#2")); op(s.cool, ramp(t, a("cool"), a("cool") + .2)); popAt(s.cool, 960, 200, t, a("cool"));
    op(s.c, ramp(t, a("faster"), a("faster") + .2)); popAt(s.c, 760, 860, t, a("faster")); }; return s; })();

// ---- CUPS
S.cups = (() => { const s = scene("cups", "#e0fbfc", "#c2dfe3");
  s.poly = el("g", {}, s.stage); el("path", {d: "M-100 -150 L-80 150 H80 L100 -150 Z", fill: "#fff", stroke: INK, "stroke-width": 7}, s.poly); tx(s.poly, {x: 0, y: 200, "text-anchor": "middle", "font-size": 30, "font-weight": 700, fill: INK}, "polystyrene cup");
  s.met = el("g", {}, s.stage); el("path", {d: "M-100 -150 L-80 150 H80 L100 -150 Z", fill: MET, stroke: INK, "stroke-width": 7}, s.met); tx(s.met, {x: 0, y: 200, "text-anchor": "middle", "font-size": 30, "font-weight": 700, fill: INK}, "metal cup");
  s.s1 = steam(s.stage, 5); s.s2 = steam(s.stage, 5); s.c = chip(s.stage, "the MATERIAL matters!", "#7209b7", {fs: 44});
  s.run = t => { const a = w => C("cups", w); const k = ramp(t, a("longer"), SC.cups.t1);
    tf(s.poly, "translate(500 520)"); op(s.poly, ramp(t, a("polystyrene") - .2, a("polystyrene"))); tf(s.met, "translate(1020 520)"); op(s.met, ramp(t, a("metal") - .2, a("metal")));
    s.s1.run(500, 360, t); op(s.s1, ramp(t, a("polystyrene"), a("polystyrene") + .3)); s.s2.run(1020, 360, t); op(s.s2, ramp(t, a("metal"), a("metal") + .3) * (1 - k * .9));
    op(s.c, ramp(t, a("matters"), a("matters") + .2)); popAt(s.c, 760, 170, t, a("matters")); }; return s; })();

// ---- WAX ROD EXPERIMENT
S.wax = (() => { const s = scene("wax", "#fff3b0", "#ffd6a5");
  s.w = hotWater(s.stage, 900, 150); const M = [["METAL", MET, 1], ["GLASS", GLS, .65], ["PLASTIC", PLAS, .35], ["WOOD", WOOD, .12]];
  s.rods = M.map(([n, c, r], i) => { const g = el("g", {}, s.stage); el("rect", {x: -20, y: -360, width: 40, height: 460, rx: 8, fill: c, stroke: INK, "stroke-width": 5}, g);
    const wax = el("ellipse", {cx: 0, cy: -380, rx: 34, ry: 26, fill: "#fff8e7", stroke: "#d4a373", "stroke-width": 4}, g); const drip = el("ellipse", {cx: 0, cy: 0, rx: 30, ry: 8, fill: "#fff8e7", stroke: "#d4a373", "stroke-width": 3}, g);
    tx(g, {x: 0, y: 160, "text-anchor": "middle", "font-size": 30, "font-weight": 700, fill: INK}, n); const rank = tx(g, {x: 0, y: -430, "text-anchor": "middle", "font-size": 44, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 6}, ["1st", "2nd", "3rd", "4th"][i]); return {g, wax, drip, r, i, rank, n: n.toLowerCase()}; });
  s.c1 = chip(s.stage, "same hot water · faster heat flow = MORE wax melts", "#1b1b3a", {fs: 32}); s.c2 = chip(s.stage, "🔥 FASTEST: metal  ·  🐢 SLOWEST: wood", "#e63946", {fs: 36});
  s.run = t => { const a = w => C("wax1", w), b = w => C("wax2", w); const melt = ramp(t, b("metal") - 1.5, b("least") + .5);
    tf(s.w, "translate(760 640)"); op(s.w, ramp(t, a("water") - .3, a("water")));
    s.rods.forEach(r => { const tt = a(r.n); op(r.g, ramp(t, tt, tt + .2)); tf(r.g, `translate(${430 + r.i * 220} 690)`); const m = clamp(melt * r.r * 1.1);
      set(r.wax, "ry", 26 * (1 - m)); set(r.wax, "rx", 34 * (1 - m * .6)); op(r.wax, 1 - m * .95); set(r.drip, "cy", -320 + m * 330); op(r.drip, m > .05 ? 1 : 0);
      const rt = [b("metal"), b("glass"), b("plastic"), b("wooden")][r.i]; op(r.rank, ramp(t, rt, rt + .2)); });
    op(s.c1, on(t, a("faster"), b("metal"), .2)); popAt(s.c1, 760, 140, t, a("faster")); op(s.c2, ramp(t, b("fastest"), b("fastest") + .2)); popAt(s.c2, 760, 140, t, b("fastest")); }; return s; })();

// ---- CONDUCTORS
S.cond = (() => { const s = scene("cond", "#ffadad", "#bde0fe");
  const box = (x, c, title, sub, items) => { const g = el("g", {}, s.stage); el("rect", {x: -330, y: -260, width: 660, height: 520, rx: 30, fill: "#fff", stroke: c, "stroke-width": 10}, g);
    tx(g, {x: 0, y: -180, "text-anchor": "middle", "font-size": 46, "font-weight": 700, fill: c}, title); tx(g, {x: 0, y: -125, "text-anchor": "middle", "font-size": 30, "font-weight": 600, fill: INK}, sub);
    const it = items.map(([e, n], i) => { const q = el("g", {opacity: 0}, g); emo(q, -120 + (i % 2) * 240, -10 + Math.floor(i / 2) * 150, 90, e); tx(q, {x: -120 + (i % 2) * 240, y: 60 + Math.floor(i / 2) * 150, "text-anchor": "middle", "font-size": 28, "font-weight": 700, fill: INK}, n); return q; });
    tf(g, `translate(${x} 540)`); g.it = it; return g; };
  s.good = box(420, HOT, "🔥 GOOD conductors", "heat flows through QUICKLY", [["🥄", "metals"], ["🍳", "steel"], ["🔩", "iron"], ["🪙", "copper"]]);
  s.poor = box(1100, COLD, "🐢 POOR conductors", "heat flows through SLOWLY", [["🥛", "glass"], ["🧴", "plastic"], ["🪵", "wood"]]);
  s.run = t => { const a = w => C("cond", w);
    op(s.good, ramp(t, a("good") - .3, a("good"))); s.good.it.forEach((q, i) => op(q, ramp(t, a("metals") + i * .15, a("metals") + .2 + i * .15)));
    op(s.poor, ramp(t, a("poor") - .3, a("poor"))); const ts = [a("glass"), a("plastic"), a("wood")]; s.poor.it.forEach((q, i) => op(q, ramp(t, ts[i], ts[i] + .2))); }; return s; })();

// ---- USES
S.uses = (() => { const s = scene("uses", "#fefae0", "#faedcd");
  s.p = pot(s.stage); s.fire = emo(s.stage, 560, 820, 160, "🔥"); s.st = steam(s.stage);
  s.l1 = chip(s.stage, "METAL pot: GOOD conductor ➜ cooks food FAST", HOT, {fs: 30}); s.l2 = chip(s.stage, "PLASTIC handle: POOR conductor ➜ safe to hold ✋", COLD, {fs: 30});
  s.o = [["🫖", "kettles"], ["🍳", "pans"], ["👕", "irons"]].map(([e, w], i) => ({e: emo(s.stage, 0, 0, 120, e), w, i}));
  s.run = t => { const a = w => C("uses", w);
    tf(s.p, "translate(560 600)"); op(s.p, 1); set(s.p.hl, "fill", "#212529"); s.st.run(560, 450, t); op(s.st, ramp(t, a("food") - .3, a("food")));
    set(s.p.body, "fill", mix(MET, "#ff8fab", ramp(t, a("food") - .5, a("food") + .5)));
    op(s.l1, ramp(t, a("metal"), a("metal") + .2)); popAt(s.l1, 760, 170, t, a("metal")); op(s.l2, ramp(t, a("handle"), a("handle") + .2)); popAt(s.l2, 900, 300, t, a("handle"));
    s.o.forEach(o => { op(o.e, ramp(t, a(o.w), a(o.w) + .2)); set(o.e, "x", 1240 + (o.i % 2) * 140); set(o.e, "y", 520 + o.i * 120); }); }; return s; })();

// ---- AIR IS A POOR CONDUCTOR
S.air = (() => { const s = scene("air", "#a2d2ff", "#cdb4db");
  s.t = chip(s.stage, "🌬️ AIR is a POOR conductor of heat", "#0077b6", {fs: 42});
  s.sw = emo(s.stage, 0, 0, 260, "🧶"); seed = 5; s.bub = []; for (let i = 0; i < 16; i++) s.bub.push({x: (rnd() - .5) * 240, y: (rnd() - .5) * 200, e: el("circle", {r: 10 + rnd() * 8, fill: "#fff", stroke: "#48cae4", "stroke-width": 3, opacity: .9}, s.stage)});
  s.kid = emo(s.stage, 0, 0, 140, "😊"); s.l1 = chip(s.stage, "trapped AIR slows heat LEAVING your body ➜ warm", "#7209b7", {fs: 30});
  s.box = el("g", {}, s.stage); el("rect", {x: -190, y: -120, width: 380, height: 240, rx: 20, fill: "#fff", stroke: INK, "stroke-width": 7}, s.box); for (let i = 0; i < 40; i++) el("circle", {cx: -170 + (i % 10) * 38, cy: -100 + Math.floor(i / 10) * 60, r: 9, fill: "#e9ecef"}, s.box);
  emo(s.box, -60, 0, 90, "🥤"); emo(s.box, 70, 0, 90, "🐟"); s.l2 = chip(s.stage, "polystyrene cooler box: full of AIR ➜ stays cold ❄️", "#6c757d", {fs: 30});
  s.run = t => { const a = w => C("air", w); const sw = ramp(t, a("polystyrene") - .4, a("polystyrene"));
    op(s.t, ramp(t, a("air"), a("air") + .2)); popAt(s.t, 760, 140, t, a("air"));
    op(s.sw, ramp(t, a("sweater") - .2, a("sweater")) * (1 - sw)); set(s.sw, "x", 560); set(s.sw, "y", 500);
    s.bub.forEach((b, i) => { set(b.e, "cx", 560 + b.x + Math.sin(t * 2 + i) * 6); set(b.e, "cy", 500 + b.y); op(b.e, ramp(t, a("traps"), a("traps") + .4) * (1 - sw)); });
    op(s.kid, ramp(t, a("warm"), a("warm") + .2) * (1 - sw)); set(s.kid, "x", 1000); set(s.kid, "y", 480); op(s.l1, ramp(t, a("slows"), a("slows") + .2) * (1 - sw)); popAt(s.l1, 760, 800, t, a("slows"));
    op(s.box, sw); tf(s.box, "translate(760 500) scale(1.2)"); op(s.l2, ramp(t, a("cooler"), a("cooler") + .2)); popAt(s.l2, 760, 800, t, a("cooler")); }; return s; })();

// ---- QUIZ
S.quiz = (() => { const s = scene("quiz", "#b5179e", "#560bad");
  s.pause = tx(s.stage, {x: 760, y: 150, "text-anchor": "middle", "font-size": 72, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 12}, "⏸ PAUSE & PREDICT!");
  s.soup = emo(s.stage, 760, 360, 150, "🍲");
  s.o = [["🥄 METAL", "metal", MET], ["🪵 WOOD", "wood", WOOD]].map(([n, w, c], i) => { const g = el("g", {}, s.stage); const f = el("rect", {x: -220, y: -70, width: 440, height: 140, rx: 30, fill: "#fff", stroke: INK, "stroke-width": 6}, g);
    tx(g, {x: 0, y: 18, "text-anchor": "middle", "font-size": 50, "font-weight": 700, fill: INK}, n); return {g, f, w, i}; });
  s.ans = chip(s.stage, "✓ WOOD: a POOR conductor ➜ heat flows SLOWLY", "#06d6a0", {fs: 34});
  s.run = t => { const a = w => C("quiz1", w), b = w => C("quiz2", w);
    op(s.pause, on(t, a("pause"), b("wood"), .2)); tf(s.pause, `translate(760 150) scale(${pop(t, a("pause"))}) translate(-760 -150)`); op(s.soup, ramp(t, a("soup"), a("soup") + .2));
    s.o.forEach(o => { op(o.g, ramp(t, a(o.w), a(o.w) + .2)); tf(o.g, `translate(${480 + o.i * 560} 620) scale(${pop(t, a(o.w))})`); set(o.f, "fill", t > b("wood") ? (o.i ? "#d8f3dc" : "#ffccd5") : "#fff"); });
    op(s.ans, ramp(t, b("poor"), b("poor") + .2)); popAt(s.ans, 760, 820, t, b("poor")); }; return s; })();

// ---- EXAM
S.exam = (() => { const s = scene("exam", "#14213d", "#1d3557");
  const g = el("g", {transform: "translate(760 450)"}, s.stage);
  el("rect", {x: -670, y: -320, width: 1340, height: 640, rx: 34, fill: "#2b9348", stroke: "#8d5524", "stroke-width": 22, filter: "url(#sh)"}, g);
  tx(g, {x: -610, y: -240, "font-size": 50, "font-weight": 700, fill: "#ffe14d"}, "📝 EXAM CORNER · say it like this:");
  const L = [["🥄 Metal is a GOOD conductor of heat, so heat flows", "     through it quickly."], ["🪵 Wood and plastic are POOR conductors of heat, so", "     heat flows through them slowly."], ["🍳 That is why pot handles are made of plastic or wood."]];
  let y = -150; s.lines = L.map(ls => { const r = el("g", {opacity: 0}, g); ls.forEach((x, i) => tx(r, {x: -610, y: y + i * 50, "font-size": 40, "font-weight": 600, fill: "#fff"}, x)); y += ls.length * 50 + 45; return r; });
  s.run = t => { const a = w => C("exam", w); const k = [a("metal"), a("wood"), a("why")];
    s.lines.forEach((r, i) => { op(r, ramp(t, k[i] - .15, k[i] + .2)); tf(r, `translate(${(1 - ramp(t, k[i] - .15, k[i] + .3)) * -40} 0)`); }); }; return s; })();

// ---- HABIT (link to real life)
S.habit = (() => { const s = scene("habit", "#06d6a0", "#118ab2");
  s.title = tx(s.stage, {x: 760, y: 180, "text-anchor": "middle", "font-size": 76, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 12}, "🏠 LINK IT TO REAL LIFE");
  s.k = el("g", {}, s.stage); el("rect", {x: -520, y: -200, width: 1040, height: 400, rx: 30, fill: "#fff8e7", stroke: INK, "stroke-width": 7}, s.k);
  s.it = [["🍳", -380, -60, 1], ["🫖", -190, -60, 1], ["🥄", 0, -60, 1], ["🪵", 190, -60, 0], ["🧤", 380, -60, 0], ["🥛", 0, 100, 0]].map(([e, x, y, g]) => { const q = emo(s.k, x, y, 100, e); const tag = tx(s.k, {x, y: y + 75, "text-anchor": "middle", "font-size": 26, "font-weight": 700, fill: g ? HOT : COLD}, g ? "good" : "poor"); return {q, tag}; });
  s.c = chip(s.stage, "real examples ➜ facts you never forget 🧠", "#1b1b3a", {fs: 36});
  s.run = t => { const a = w => C("habit1", w);
    op(s.title, ramp(t, a("real"), a("real") + .2)); tf(s.title, `translate(760 180) scale(${pop(t, a("real")) * .95}) translate(-760 -180)`);
    op(s.k, ramp(t, a("kitchen") - .3, a("kitchen"))); tf(s.k, "translate(760 540)");
    s.it.forEach((q, i) => { op(q.tag, ramp(t, a("good") + i * .3, a("good") + .2 + i * .3)); });
    op(s.c, ramp(t, a("unforgettable") - .4, a("unforgettable"))); popAt(s.c, 760, 830, t, a("unforgettable") - .4); }; return s; })();

// ---- MIND MAP
S.mindmap = (() => { const s = scene("mindmap", "#fff3b0", "#ffd6a5");
  for (let i = 0; i < 16; i++) el("line", {x1: 0, y1: 120 + i * 60, x2: 1920, y2: 120 + i * 60, stroke: "#a2d2ff", "stroke-width": 2, opacity: .6}, s.stage);
  const CX = 380, CY2 = 470;
  s.dim = [["🌡️ TEMPERATURE", HOT, 240, 240], ["⚡ HEAT", "#ff7b00", 220, 720], ["➡️ HEAT FLOW", "#ff006e", 560, 230]].map(([n, c, x, y]) => ({l: el("path", {d: `M${CX} ${CY2} L${x} ${y}`, stroke: c, "stroke-width": 12, opacity: .35}, s.stage), c: chip(s.stage, n, c, {fs: 24}), x, y}));
  s.l1 = el("path", {d: `M${CX} ${CY2} Q600 600 860 600`, stroke: "#7209b7", "stroke-width": 12, fill: "none", "stroke-linecap": "round", "stroke-dasharray": 600}, s.stage);
  s.center = el("g", {}, s.stage); el("ellipse", {rx: 150, ry: 70, fill: "#f77f00", stroke: INK, "stroke-width": 7}, s.center); tx(s.center, {x: 0, y: 16, "text-anchor": "middle", "font-size": 50, "font-weight": 700, fill: "#fff"}, "🔥 HEAT");
  s.br = chip(s.stage, "🥄 CONDUCTORS", "#7209b7", {fs: 36});
  s.subs = [["GOOD: metals", "good"], ["POOR: glass · plastic · wood · AIR", "poor"]].map(([n, w], i) => ({c: chip(s.stage, n, "#fff", {fs: 28, ink: INK}), w, i}));
  s.ult = chip(s.stage, "🚀 TheOneApp · the ultimate science app", "#7209b7", {fs: 30});
  s.phone = el("g", {}, s.stage); el("rect", {x: -130, y: -240, width: 260, height: 480, rx: 40, fill: INK}, s.phone); el("rect", {x: -112, y: -205, width: 224, height: 410, rx: 20, fill: "#fff"}, s.phone);
  tx(s.phone, {x: 0, y: -168, "text-anchor": "middle", "font-size": 32, "font-weight": 700, fill: "#7209b7"}, "TheOneApp"); tx(s.phone, {x: 0, y: -138, "text-anchor": "middle", "font-size": 17, "font-weight": 600, fill: "#6c757d"}, "the ultimate science app");
  const cp = el("clipPath", {id: "scr21"}, $("v").querySelector("defs")); el("rect", {x: -112, y: -122, width: 224, height: 327, rx: 4}, cp);
  const IH = 224 * 2000 / 780; s.scr = el("g", {"clip-path": "url(#scr21)"}, s.phone); s.shot = el("image", {href: "oneapp_mind2.png", x: -112, y: -122, width: 224, height: IH, preserveAspectRatio: "xMidYMin slice"}, s.scr);
  s.ring = el("rect", {fill: "none", stroke: "#f72585", "stroke-width": 5, rx: 13}, s.scr);
  s.run = t => { const a = w => C("habit2", w);
    op(s.center, ramp(t, a("heat"), a("heat") + .2)); tf(s.center, `translate(${CX} ${CY2}) scale(${pop(t, a("heat"))})`);
    s.dim.forEach(d => { op(d.l, ramp(t, a("heat") + .3, a("heat") + .5) * .35); op(d.c, ramp(t, a("heat") + .3, a("heat") + .5) * .5); popAt(d.c, d.x, d.y, t, a("heat") + .3); });
    set(s.l1, "stroke-dashoffset", 600 * (1 - ramp(t, a("conductors") - .3, a("conductors") + .3))); op(s.l1, t > a("conductors") - .3 ? 1 : 0);
    op(s.br, ramp(t, a("conductors"), a("conductors") + .2)); popAt(s.br, 920, 600, t, a("conductors"));
    s.subs.forEach(c => { const tt = a(c.w); op(c.c, ramp(t, tt, tt + .2)); popAt(c.c, 960, 690 + c.i * 76, t, tt); });
    op(s.ult, on(t, a("ultimate"), SC.mindmap.t1 + .5, .2)); popAt(s.ult, 640, 150, t, a("ultimate"));
    const ph = ramp(t, a("save"), a("save") + .6); op(s.phone, ph); tf(s.phone, `translate(${lerp(1650, 1410, ph)} 520) rotate(${lerp(12, -4, ph)})`);
    const nx = a("ultimate") + .6; const off = -122 - (IH - 327) * ramp(t, a("save"), nx); set(s.shot, "y", off); const sc = IH / 2000;
    set(s.ring, "x", -112 + 210 * sc); set(s.ring, "y", off + 1722 * sc); set(s.ring, "width", 146 * sc); set(s.ring, "height", 72 * sc);
    op(s.ring, on(t, nx, SC.mindmap.t1 + .5, .15) * (.6 + .4 * Math.sin(t * 8))); }; return s; })();

// ---- CLOSE
S.close = (() => { const s = scene("close", "#f15bb5", "#fee440");
  s.ans = el("g", {}, s.stage); el("rect", {x: -470, y: -70, width: 940, height: 140, rx: 70, fill: "#06d6a0", stroke: INK, "stroke-width": 7}, s.ans); tx(s.ans, {x: 0, y: 22, "text-anchor": "middle", "font-size": 50, "font-weight": 700, fill: "#fff"}, "🍳 plastic = a POOR conductor!");
  s.cols = [["🔥 GOOD", HOT, 520], ["🐢 POOR", COLD, 1000]].map(([n, c, x]) => { const g = el("g", {}, s.stage); el("rect", {x: -200, y: -220, width: 400, height: 440, rx: 26, fill: "#fff", stroke: c, "stroke-width": 8}, g); tx(g, {x: 0, y: -160, "text-anchor": "middle", "font-size": 44, "font-weight": 700, fill: c}, n);
    [0, 1, 2].forEach(i => { el("rect", {x: -140, y: -100 + i * 100, width: 280, height: 70, rx: 14, fill: "none", stroke: "#adb5bd", "stroke-width": 4, "stroke-dasharray": "12 8"}, g); tx(g, {x: 0, y: -52 + i * 100, "text-anchor": "middle", "font-size": 40, "font-weight": 700, fill: "#adb5bd"}, (i + 1) + ". ?"); }); tf(g, `translate(${x} 500)`); return g; });
  s.run = t => { const a = w => C("close", w); const tn = ramp(t, a("your") - .2, a("your") + .1);
    op(s.ans, ramp(t, a("plastic#2"), a("plastic#2") + .15) * (1 - tn)); tf(s.ans, `translate(760 420) scale(${pop(t, a("plastic#2"))})`);
    s.cols.forEach((g, i) => { const tt = a("your") + i * .3; op(g, ramp(t, tt, tt + .2)); }); }; return s; })();

// ---- END CARD
S.end = (() => { const s = scene("end", "#3a0ca3", "#7209b7");
  tx(s.stage, {x: 960, y: 360, "text-anchor": "middle", "font-size": 44, "font-weight": 700, fill: "#ffe14d", "letter-spacing": 6}, "NEXT: THE FINAL EPISODE");
  tx(s.stage, {x: 960, y: 480, "text-anchor": "middle", "font-size": 84, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 10}, "Why roads have gaps:");
  tx(s.stage, {x: 960, y: 580, "text-anchor": "middle", "font-size": 84, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 10}, "expansion + contraction 🛣️");
  s.run = () => {}; return s; })();

