/* =================== SCENES (Episode 16: shadow size — two distances + ray model) =================== */
const S = {};
const hex = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
const mix = (h1, h2, k) => { const a = hex(h1), b = hex(h2); return "rgb(" + a.map((v, i) => Math.round(lerp(v, b[i], clamp(k)))).join(",") + ")"; };
const RAY = "#ffbe0b", CY = 480;
// torch → ball → screen diagram
function tbs(p, r = 60, sh = 700) { const g = el("g", {}, p);
  const beam = el("path", {fill: "#fff3b0", opacity: .45}, g); const scr = el("rect", {width: 34, height: sh, y: CY - sh / 2, fill: "#e9ecef", stroke: INK, "stroke-width": 6}, g);
  const shd = el("rect", {width: 34, fill: "#1b1b3a"}, g); const r1 = el("line", {stroke: RAY, "stroke-width": 5, "stroke-dasharray": "14 8"}, g), r2 = el("line", {stroke: RAY, "stroke-width": 5, "stroke-dasharray": "14 8"}, g);
  const torch = emo(g, 0, 0, 110, "🔦"); const ball = el("circle", {r, fill: "#ef476f", stroke: INK, "stroke-width": 6}, g);
  g.upd = (T, B, Sx, rr = r, k = 1) => { set(ball, "r", rr); set(ball, "cx", B); set(ball, "cy", CY); set(torch, "x", T - 40); set(torch, "y", CY); tf(torch, `rotate(45 ${T - 40} ${CY})`);
    const h = rr * (Sx - T) / (B - T); set(scr, "x", Sx); set(shd, "x", Sx); set(shd, "y", CY - h); set(shd, "height", 2 * h); op(shd, k * .9);
    set(beam, "d", `M${T} ${CY} L${Sx} ${CY - sh / 2} L${Sx} ${CY + sh / 2} Z`); op(beam, .45 * k);
    [[r1, -1], [r2, 1]].forEach(([l, sd]) => { set(l, "x1", T); set(l, "y1", CY); set(l, "x2", Sx); set(l, "y2", CY + sd * h); op(l, k); }); return h; };
  return g; }
function bracket(p, col) { const g = el("g", {}, p); const l = el("path", {fill: "none", stroke: col, "stroke-width": 7}, g); g.set = (x, y1, y2) => set(l, "d", `M${x} ${y1} h20 V${y2} h-20`); return g; }
function dist(p, col) { const g = el("g", {}, p); const l = el("line", {stroke: col, "stroke-width": 6, "marker-end": ""}, g); const t = tx(g, {"text-anchor": "middle", "font-size": 30, "font-weight": 700, fill: col}, ""); g.set = (x1, x2, y, s) => { set(l, "x1", x1); set(l, "x2", x2); set(l, "y1", y); set(l, "y2", y); set(t, "x", (x1 + x2) / 2); set(t, "y", y - 14); t.textContent = s; }; return g; }

// ---- HOOK
S.hook = (() => { const s = scene("hook", "#3a0ca3", "#7209b7");
  s.wall = el("rect", {x: 1000, y: 140, width: 40, height: 760, fill: "#e9ecef", stroke: INK, "stroke-width": 6}, s.stage);
  s.big = tx(s.stage, {x: 760, y: 300, "text-anchor": "middle", "font-size": 130, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 14}, "GIANT 🦖"); s.tiny = tx(s.stage, {x: 760, y: 560, "text-anchor": "middle", "font-size": 60, "font-weight": 700, fill: "#ffe14d", class: "out", "stroke-width": 8}, "…or tiny 🐜");
  s.it = [["🔦", "torch"], ["⚽", "ball"], ["🧱", "wall"]].map(([e, w], i) => ({e: emo(s.stage, 0, 0, 120, e), w, i}));
  s.run = t => { const a = w => C("hook", w); const shrink = ramp(t, a("torch") - .4, a("torch"));
    op(s.big, ramp(t, a("giant"), a("giant") + .2)); tf(s.big, `translate(760 300) scale(${pop(t, a("giant")) * lerp(1, .6, shrink)}) translate(-760 -300)`);
    op(s.tiny, ramp(t, a("tiny"), a("tiny") + .2) * (1 - shrink)); op(s.wall, 0);
    s.it.forEach(i => { op(i.e, ramp(t, a(i.w), a(i.w) + .2)); set(i.e, "x", 480 + i.i * 280); set(i.e, "y", 620 + 20 * (1 - pop(t, a(i.w)))); }); }; return s; })();

// ---- SETUP
S.setup = (() => { const s = scene("setup", "#1d3557", "#14213d");
  s.d = tbs(s.stage); s.lt = chip(s.stage, "torch", "#fff", {fs: 30, ink: INK}); s.lb = chip(s.stage, "ball", "#fff", {fs: 30, ink: INK}); s.ls = chip(s.stage, "screen", "#fff", {fs: 30, ink: INK});
  s.c = chip(s.stage, "SCREEN = the surface where the shadow falls", "#6c757d", {fs: 34});
  s.d1 = dist(s.stage, "#f77f00"); s.d2 = dist(s.stage, "#4cc9f0");
  s.run = t => { const a = w => C("setup", w); op(s.d, ramp(t, a("torch") - .3, a("torch"))); s.d.upd(300, 760, 1250, 60, ramp(t, a("screen"), a("screen") + .5));
    op(s.lt, ramp(t, a("torch"), a("torch") + .2)); popAt(s.lt, 260, 580, t, a("torch")); op(s.lb, ramp(t, a("ball"), a("ball") + .2)); popAt(s.lb, 760, 580, t, a("ball")); op(s.ls, ramp(t, a("screen"), a("screen") + .2)); popAt(s.ls, 1267, 880, t, a("screen"));
    op(s.c, ramp(t, a("surface"), a("surface") + .2)); popAt(s.c, 760, 130, t, a("surface"));
    s.d1.set(300, 700, 700, "distance ①"); s.d2.set(820, 1240, 700, "distance ②"); op(s.d1, ramp(t, a("distances"), a("distances") + .2)); op(s.d2, ramp(t, a("distances") + .3, a("distances") + .5)); }; return s; })();

// ---- RULE 1 (move the torch)
S.rule1 = (() => { const s = scene("rule1", "#14213d", "#3a0ca3");
  s.d = tbs(s.stage); s.t = chip(s.stage, "Rule ①: move the TORCH", "#f77f00", {fs: 40}); s.c1 = chip(s.stage, "torch CLOSER ➜ BIGGER shadow", "#06d6a0", {fs: 34}); s.c2 = chip(s.stage, "torch FURTHER ➜ SMALLER shadow", "#ef476f", {fs: 34});
  s.run = t => { const a = w => C("rule1", w); const T = lerp(lerp(300, 540, ramp(t, a("closer") - .2, a("bigger"))), 140, ramp(t, a("further") - .2, a("smaller")));
    op(s.d, 1); s.d.upd(T, 760, 1250); op(s.t, 1); popAt(s.t, 760, 120, t, SC.rule1.t0);
    op(s.c1, on(t, a("bigger"), a("further"), .2)); popAt(s.c1, 760, 900, t, a("bigger")); op(s.c2, ramp(t, a("smaller"), a("smaller") + .2)); popAt(s.c2, 760, 900, t, a("smaller")); }; return s; })();

// ---- RULE 2 (move the screen)
S.rule2 = (() => { const s = scene("rule2", "#3a0ca3", "#14213d");
  s.d = tbs(s.stage); s.t = chip(s.stage, "Rule ②: move the SCREEN", "#4cc9f0", {fs: 40}); s.c1 = chip(s.stage, "screen FURTHER ➜ BIGGER shadow", "#06d6a0", {fs: 34}); s.c2 = chip(s.stage, "screen CLOSER ➜ SMALLER shadow", "#ef476f", {fs: 34});
  s.run = t => { const a = w => C("rule2", w); const Sx = lerp(lerp(1150, 1420, ramp(t, a("further") - .2, a("bigger"))), 980, ramp(t, a("closer") - .2, a("smaller")));
    op(s.d, 1); s.d.upd(300, 760, Sx); op(s.t, 1); popAt(s.t, 760, 120, t, SC.rule2.t0);
    op(s.c1, on(t, a("bigger"), a("closer"), .2)); popAt(s.c1, 760, 900, t, a("bigger")); op(s.c2, ramp(t, a("smaller"), a("smaller") + .2)); popAt(s.c2, 760, 900, t, a("smaller")); }; return s; })();

// ---- MOVE THE BALL
S.move = (() => { const s = scene("move", "#14213d", "#1d3557");
  s.d = tbs(s.stage, 45, 760); s.lock = chip(s.stage, "🔒 torch + screen stay still", "#6c757d", {fs: 32});
  s.c1 = chip(s.stage, "ball near TORCH (far from screen) ➜ BIG", "#06d6a0", {fs: 32}); s.c2 = chip(s.stage, "ball near SCREEN ➜ small", "#ef476f", {fs: 32}); s.c3 = chip(s.stage, "moving the ball changes BOTH distances", "#ffbe0b", {fs: 36});
  s.run = t => { const a = w => C("move", w); const B = lerp(lerp(760, 420, ramp(t, a("near") - .3, a("near") + .4)), 1150, ramp(t, a("near#2") - .3, a("near#2") + .5));
    op(s.d, 1); s.d.upd(250, B, 1300, 45); op(s.lock, on(t, a("keep"), a("near"), .2)); popAt(s.lock, 760, 110, t, a("keep"));
    op(s.c1, on(t, a("big"), a("near#2"), .2)); popAt(s.c1, 760, 110, t, a("big")); op(s.c2, on(t, a("small"), a("both"), .2)); popAt(s.c2, 760, 110, t, a("small"));
    op(s.c3, ramp(t, a("both"), a("both") + .2)); popAt(s.c3, 760, 110, t, a("both")); }; return s; })();

// ---- RAY MODEL
S.rays = (() => { const s = scene("rays", "#fff3b0", "#ffd6a5");
  const T = 220, SX = 1300, R = 40, BS = [["A", 500, "#ef476f"], ["B", 800, "#7209b7"], ["C", 1100, "#06d6a0"]];
  s.scr = el("rect", {x: SX, y: 100, width: 30, height: 760, fill: "#e9ecef", stroke: INK, "stroke-width": 6}, s.stage); s.torch = emo(s.stage, T - 40, CY, 110, "🔦");
  s.bl = BS.map(([n, x, c], i) => { const g = el("g", {}, s.stage); const h = R * (SX - T) / (x - T);
    el("line", {x1: T, y1: CY, x2: SX, y2: CY - h, stroke: c, "stroke-width": 5}, g); el("line", {x1: T, y1: CY, x2: SX, y2: CY + h, stroke: c, "stroke-width": 5}, g);
    el("circle", {cx: x, cy: CY, r: R, fill: c, stroke: INK, "stroke-width": 5, opacity: .9}, g); tx(g, {x, y: CY + 12, "text-anchor": "middle", "font-size": 34, "font-weight": 700, fill: "#fff"}, n);
    const br = bracket(g, c); br.set(SX + 40 + i * 34, CY - h, CY + h); return {g, i}; });
  s.title = chip(s.stage, "📐 a MODEL: draw straight lines", "#1b1b3a", {fs: 38}); s.c = chip(s.stage, "gap on the screen = shadow SIZE", "#f77f00", {fs: 36});
  s.run = t => { const a = w => C("rays", w);
    op(s.title, ramp(t, a("model"), a("model") + .2)); popAt(s.title, 700, 120, t, a("model")); op(s.scr, 1); op(s.torch, 1); tf(s.torch, `rotate(45 ${T - 40} ${CY})`);
    s.bl.forEach(b => { const tt = a("draw") + b.i * 1.2; op(b.g, ramp(t, tt, tt + .4)); });
    op(s.c, ramp(t, a("gap"), a("gap") + .2)); popAt(s.c, 700, 900, t, a("gap")); }; return s; })();

// ---- STREET LAMP
S.lamp = (() => { const s = scene("lamp", "#03045e", "#10002b");
  s.ground = el("rect", {x: 0, y: 820, width: 1920, height: 260, fill: "#343a40"}, s.stage);
  s.pole = el("g", {}, s.stage); el("rect", {x: 744, y: 300, width: 32, height: 520, fill: "#6c757d", stroke: INK, "stroke-width": 5}, s.pole); el("path", {d: "M700 300 H820 L800 260 H720 Z", fill: "#495057", stroke: INK, "stroke-width": 5}, s.pole);
  s.glow = el("path", {d: "M720 300 L560 820 H960 L800 300 Z", fill: "#fff3b0", opacity: .25}, s.stage); el("circle", {cx: 760, cy: 310, r: 22, fill: "#ffe14d"}, s.pole);
  s.sh = el("path", {fill: "#000", opacity: .7}, s.stage); s.p = emo(s.stage, 0, 0, 200, "🚶");
  s.c1 = chip(s.stage, "walking TOWARDS ➜ shadow SHORTER", "#06d6a0", {fs: 34}); s.c2 = chip(s.stage, "walking AWAY ➜ shadow LONGER", "#ef476f", {fs: 34});
  s.run = t => { const a = w => C("lamp", w); const x = lerp(260, 1260, ramp(t, a("walk"), SC.lamp.t1)); const d = x - 760, len = 40 + Math.abs(d) * .7, dir = d >= 0 ? 1 : -1;
    op(s.p, 1); set(s.p, "x", x); set(s.p, "y", 730); tf(s.p, `scale(${dir < 0 ? 1 : -1} 1)`); s.p.setAttribute("transform-origin", `${x} 730`);
    set(s.sh, "d", `M${x - 20 * dir} 822 L${x + len * dir} 812 L${x + len * dir} 836 L${x - 20 * dir} 832 Z`);
    op(s.c1, on(t, a("shorter") - .2, a("away"), .2)); popAt(s.c1, 760, 150, t, a("shorter") - .2); op(s.c2, ramp(t, a("longer") - .2, a("longer"))); popAt(s.c2, 760, 150, t, a("longer") - .2); }; return s; })();

// ---- QUIZ
S.quiz = (() => { const s = scene("quiz", "#b5179e", "#560bad");
  s.pause = tx(s.stage, {x: 760, y: 150, "text-anchor": "middle", "font-size": 72, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 12}, "⏸ PAUSE & PREDICT!");
  s.q = chip(s.stage, "🎯 you want a BIGGER shadow", "#ff9f1c", {fs: 40});
  s.o = [["⚽ ➜ 🔦  closer to the TORCH", "torch", 1], ["⚽ ➜ 🧱  closer to the SCREEN", "screen", 0]].map(([n, w, ok], i) => { const g = el("g", {}, s.stage); const f = el("rect", {x: -340, y: -60, width: 680, height: 120, rx: 30, fill: "#fff", stroke: INK, "stroke-width": 6}, g);
    tx(g, {x: 0, y: 16, "text-anchor": "middle", "font-size": 42, "font-weight": 700, fill: INK}, n); return {g, f, w, ok, i}; });
  s.d = tbs(s.stage, 34, 420); s.ans = chip(s.stage, "further from the screen + blocks more light ➜ BIGGER", "#06d6a0", {fs: 30});
  s.run = t => { const a = w => C("quiz1", w), b = w => C("quiz2", w); const rv = ramp(t, b("closer"), b("closer") + .3);
    op(s.pause, on(t, a("pause"), b("closer"), .2)); tf(s.pause, `translate(760 150) scale(${pop(t, a("pause"))}) translate(-760 -150)`);
    op(s.q, ramp(t, a("bigger"), a("bigger") + .2) * (1 - rv)); popAt(s.q, 760, 270, t, a("bigger"));
    s.o.forEach(o => { op(o.g, ramp(t, a(o.w), a(o.w) + .2) * (o.ok ? 1 : 1 - rv)); tf(o.g, `translate(760 ${lerp(430 + o.i * 160, 200 + o.i * 900, o.ok ? rv : 0)}) scale(${pop(t, a(o.w))})`); set(o.f, "fill", t > b("closer") && o.ok ? "#d8f3dc" : "#fff"); });
    op(s.d, ramp(t, b("blocks") - .3, b("blocks"))); s.d.upd(lerp(300, 300, 0), lerp(900, 480, ramp(t, b("blocks"), b("bigger"))), 1150, 34);
    op(s.ans, ramp(t, b("bigger"), b("bigger") + .2)); popAt(s.ans, 760, 880, t, b("bigger")); }; return s; })();

// ---- EXAM
S.exam = (() => { const s = scene("exam", "#14213d", "#1d3557");
  const g = el("g", {transform: "translate(760 450)"}, s.stage);
  el("rect", {x: -670, y: -320, width: 1340, height: 640, rx: 34, fill: "#2b9348", stroke: "#8d5524", "stroke-width": 22, filter: "url(#sh)"}, g);
  tx(g, {x: -610, y: -240, "font-size": 50, "font-weight": 700, fill: "#ffe14d"}, "📝 EXAM CORNER · say it like this:");
  const L = [["🔦 The NEARER the object is to the light source,", "     the BIGGER its shadow."], ["🧱 The FURTHER the object is from the screen,", "     the BIGGER its shadow."]];
  let y = -140; s.lines = L.map(ls => { const r = el("g", {opacity: 0}, g); ls.forEach((x, i) => tx(r, {x: -610, y: y + i * 54, "font-size": 44, "font-weight": 600, fill: "#fff"}, x)); y += ls.length * 54 + 60; return r; });
  s.run = t => { const a = w => C("exam", w); const k = [a("nearer"), a("further")];
    s.lines.forEach((r, i) => { op(r, ramp(t, k[i] - .15, k[i] + .2)); tf(r, `translate(${(1 - ramp(t, k[i] - .15, k[i] + .3)) * -40} 0)`); }); }; return s; })();

// ---- HABIT (remove distractions)
S.habit = (() => { const s = scene("habit", "#06d6a0", "#118ab2");
  s.title = tx(s.stage, {x: 760, y: 180, "text-anchor": "middle", "font-size": 76, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 12}, "📵 REMOVE DISTRACTIONS");
  s.door = emo(s.stage, 1200, 480, 220, "🚪"); s.ph = emo(s.stage, 0, 0, 120, "📱"); s.kid = emo(s.stage, 420, 520, 180, "🧒"); s.book = emo(s.stage, 560, 600, 100, "📚");
  s.bar = el("rect", {x: 380, y: 760, height: 50, rx: 25, fill: "#ffbe0b", stroke: INK, "stroke-width": 5}, s.stage); s.bg = el("rect", {x: 380, y: 760, width: 760, height: 50, rx: 25, fill: "none", stroke: "#fff", "stroke-width": 5}, s.stage);
  s.c = chip(s.stage, "🎯 FOCUS gets stronger", "#1b1b3a", {fs: 36}); s.o = chip(s.stage, "out of sight, out of mind", "#7209b7", {fs: 34});
  s.run = t => { const a = w => C("habit1", w); const go = ramp(t, a("another") - .3, a("another") + .7);
    op(s.title, ramp(t, a("distractions"), a("distractions") + .2)); tf(s.title, `translate(760 180) scale(${pop(t, a("distractions")) * .95}) translate(-760 -180)`);
    op(s.door, ramp(t, a("another") - .5, a("another") - .2)); op(s.kid, 1); op(s.book, 1);
    op(s.ph, ramp(t, a("phone"), a("phone") + .2) * (1 - ramp(t, a("another") + .5, a("another") + .8))); set(s.ph, "x", lerp(620, 1200, go)); set(s.ph, "y", lerp(460, 480, go) - Math.sin(go * Math.PI) * 120);
    op(s.o, ramp(t, a("sight"), a("sight") + .2)); popAt(s.o, 760, 330, t, a("sight"));
    set(s.bar, "width", 760 * ramp(t, a("sight"), a("focus") + .6)); op(s.bar, ramp(t, a("sight"), a("sight") + .2)); op(s.bg, ramp(t, a("sight"), a("sight") + .2));
    op(s.c, ramp(t, a("focus"), a("focus") + .2)); popAt(s.c, 760, 880, t, a("focus")); }; return s; })();

// ---- MIND MAP
S.mindmap = (() => { const s = scene("mindmap", "#fff3b0", "#ffd6a5");
  for (let i = 0; i < 16; i++) el("line", {x1: 0, y1: 120 + i * 60, x2: 1920, y2: 120 + i * 60, stroke: "#a2d2ff", "stroke-width": 2, opacity: .6}, s.stage);
  const CX = 360, CY2 = 460;
  s.dim = [["🌿 NATURAL", "#06d6a0", 200, 250], ["🏭 MAN-MADE", "#3a86ff", 520, 230], ["👁️ HOW WE SEE", "#f77f00", 220, 720]].map(([n, c, x, y]) => ({l: el("path", {d: `M${CX} ${CY2} L${x} ${y}`, stroke: c, "stroke-width": 12, opacity: .35}, s.stage), c: chip(s.stage, n, c, {fs: 26}), x, y}));
  s.l0 = el("path", {d: `M${CX} ${CY2} L700 460`, stroke: "#1b1b3a", "stroke-width": 12}, s.stage); s.l1 = el("path", {d: "M700 460 Q760 640 900 640", stroke: "#7209b7", "stroke-width": 10, fill: "none", "stroke-dasharray": 400}, s.stage);
  s.center = el("g", {}, s.stage); el("ellipse", {rx: 140, ry: 66, fill: "#ffbe0b", stroke: INK, "stroke-width": 7}, s.center); tx(s.center, {x: 0, y: 16, "text-anchor": "middle", "font-size": 46, "font-weight": 700, fill: INK}, "💡 LIGHT");
  s.sh = chip(s.stage, "👤 SHADOWS", "#1b1b3a", {fs: 36}); s.sz = chip(s.stage, "📏 SHADOW SIZE", "#7209b7", {fs: 34});
  s.subs = [["object NEARER the light ➜ BIGGER", "nearer"], ["object FURTHER from screen ➜ BIGGER", "further"]].map(([n, w], i) => ({c: chip(s.stage, n, "#fff", {fs: 27, ink: INK}), w, i}));
  s.ult = chip(s.stage, "🚀 TheOneApp · the ultimate science app", "#7209b7", {fs: 30});
  s.phone = el("g", {}, s.stage); el("rect", {x: -130, y: -240, width: 260, height: 480, rx: 40, fill: INK}, s.phone); el("rect", {x: -112, y: -205, width: 224, height: 410, rx: 20, fill: "#fff"}, s.phone);
  tx(s.phone, {x: 0, y: -168, "text-anchor": "middle", "font-size": 32, "font-weight": 700, fill: "#7209b7"}, "TheOneApp"); tx(s.phone, {x: 0, y: -138, "text-anchor": "middle", "font-size": 17, "font-weight": 600, fill: "#6c757d"}, "the ultimate science app");
  const cp = el("clipPath", {id: "scr16"}, $("v").querySelector("defs")); el("rect", {x: -112, y: -122, width: 224, height: 327, rx: 4}, cp);
  const IH = 224 * 2000 / 780; s.scr = el("g", {"clip-path": "url(#scr16)"}, s.phone); s.shot = el("image", {href: "oneapp_mind2.png", x: -112, y: -122, width: 224, height: IH, preserveAspectRatio: "xMidYMin slice"}, s.scr);
  s.ring = el("rect", {fill: "none", stroke: "#f72585", "stroke-width": 5, rx: 13}, s.scr);
  s.run = t => { const a = w => C("habit2", w);
    op(s.center, ramp(t, a("light"), a("light") + .2)); tf(s.center, `translate(${CX} ${CY2}) scale(${pop(t, a("light"))})`);
    s.dim.forEach(d => { op(d.l, ramp(t, a("light") + .3, a("light") + .5) * .35); op(d.c, ramp(t, a("light") + .3, a("light") + .5) * .5); popAt(d.c, d.x, d.y, t, a("light") + .3); });
    op(s.l0, ramp(t, a("shadows") - .2, a("shadows"))); op(s.sh, ramp(t, a("shadows"), a("shadows") + .2)); popAt(s.sh, 760, 460, t, a("shadows"));
    set(s.l1, "stroke-dashoffset", 400 * (1 - ramp(t, a("size") - .2, a("size") + .3))); op(s.l1, t > a("size") - .2 ? 1 : 0); op(s.sz, ramp(t, a("size"), a("size") + .2)); popAt(s.sz, 960, 640, t, a("size"));
    s.subs.forEach(c => { const tt = a(c.w); op(c.c, ramp(t, tt, tt + .2)); popAt(c.c, 960, 730 + c.i * 76, t, tt); });
    op(s.ult, on(t, a("ultimate"), SC.mindmap.t1 + .5, .2)); popAt(s.ult, 640, 130, t, a("ultimate"));
    const ph = ramp(t, a("save"), a("save") + .6); op(s.phone, ph); tf(s.phone, `translate(${lerp(1650, 1390, ph)} 500) rotate(${lerp(12, -4, ph)})`);
    const nx = a("ultimate") + .6; const off = -122 - (IH - 327) * ramp(t, a("save"), nx); set(s.shot, "y", off); const sc = IH / 2000;
    set(s.ring, "x", -112 + 36 * sc); set(s.ring, "y", off + 1722 * sc); set(s.ring, "width", 156 * sc); set(s.ring, "height", 72 * sc);
    op(s.ring, on(t, nx, SC.mindmap.t1 + .5, .15) * (.6 + .4 * Math.sin(t * 8))); }; return s; })();

// ---- CLOSE
S.close = (() => { const s = scene("close", "#3a0ca3", "#f72585");
  s.ans = el("g", {}, s.stage); el("rect", {x: -440, y: -70, width: 880, height: 140, rx: 70, fill: "#06d6a0", stroke: INK, "stroke-width": 7}, s.ans); tx(s.ans, {x: 0, y: 22, "text-anchor": "middle", "font-size": 52, "font-weight": 700, fill: "#fff"}, "🔦 Move it CLOSE to the light!");
  s.wall = el("rect", {x: 1150, y: 140, width: 40, height: 760, fill: "#e9ecef", stroke: INK, "stroke-width": 6}, s.stage); s.torch = emo(s.stage, 260, 500, 120, "🔦");
  s.hand = emo(s.stage, 0, 0, 110, "✋"); s.hs = emo(s.stage, 0, 0, 100, "✋"); s.hs.setAttribute("style", "filter: brightness(0)");
  s.l1 = chip(s.stage, "GIANT", "#06d6a0", {fs: 40}); s.l2 = chip(s.stage, "tiny", "#ef476f", {fs: 34});
  s.run = t => { const a = w => C("close", w); const tn = ramp(t, a("your") - .2, a("your") + .1), k = ramp(t, a("tiny") - .3, a("tiny") + .5);
    op(s.ans, ramp(t, a("light"), a("light") + .15) * (1 - tn)); tf(s.ans, `translate(760 420) scale(${pop(t, a("light"))})`);
    op(s.wall, tn); op(s.torch, tn); const hx = lerp(520, 1000, k); op(s.hand, tn); set(s.hand, "x", hx); set(s.hand, "y", 500);
    const sc = Math.min(4, (1170 - 300) / (hx - 300)); op(s.hs, tn * .8); set(s.hs, "x", 1170); set(s.hs, "y", 500 + 20 * sc); s.hs.setAttribute("font-size", 100 * sc); set(s.hs, "font-size", 100 * sc);
    op(s.l1, on(t, a("giant#2"), a("tiny") - .3, .2)); popAt(s.l1, 900, 170, t, a("giant#2")); op(s.l2, ramp(t, a("tiny"), a("tiny") + .2)); popAt(s.l2, 900, 170, t, a("tiny")); }; return s; })();

// ---- END CARD
S.end = (() => { const s = scene("end", "#3a0ca3", "#7209b7");
  tx(s.stage, {x: 960, y: 360, "text-anchor": "middle", "font-size": 44, "font-weight": 700, fill: "#ffe14d", "letter-spacing": 6}, "NEXT EPISODE");
  tx(s.stage, {x: 960, y: 480, "text-anchor": "middle", "font-size": 84, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 10}, "A cone can cast a CIRCLE");
  tx(s.stage, {x: 960, y: 580, "text-anchor": "middle", "font-size": 84, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 10}, "shadow shapes + sundials ☀️");
  s.run = () => {}; return s; })();

