/* =================== SCENES (Episode 14: how we see — directly or by reflection; the Moon) =================== */
const S = {};
const hex = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
const mix = (h1, h2, k) => { const a = hex(h1), b = hex(h2); return "rgb(" + a.map((v, i) => Math.round(lerp(v, b[i], clamp(k)))).join(",") + ")"; };
const RAY = "#ffbe0b";
// light ray with arrowhead, drawn to fraction k
function ray(p, col = RAY, w = 10) { const g = el("g", {}, p); const ln = el("line", {stroke: col, "stroke-width": w, "stroke-linecap": "round"}, g); const hd = el("path", {d: "M0 0 L-34 -18 L-34 18 Z", fill: col, stroke: INK, "stroke-width": 3}, g);
  g.to = (x1, y1, x2, y2, k) => { const x = lerp(x1, x2, k), y = lerp(y1, y2, k); set(ln, "x1", x1); set(ln, "y1", y1); set(ln, "x2", x); set(ln, "y2", y); tf(hd, `translate(${x} ${y}) rotate(${Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI})`); op(g, k > 0 ? 1 : 0); }; return g; }
function moonDisc(p, r = 150) { const g = el("g", {}, p); el("circle", {r, fill: "#f1f3f5", stroke: INK, "stroke-width": 6}, g); [[-.35, -.25, .2], [.3, .1, .14], [-.1, .4, .1], [.35, -.4, .08]].forEach(([x, y, s]) => el("circle", {cx: x * r, cy: y * r, r: s * r, fill: "#ced4da"}, g)); return g; }
function eye(p, s = 1) { const g = el("g", {transform: `scale(${s})`}, p); el("path", {d: "M-80 0 Q0 -70 80 0 Q0 70 -80 0 Z", fill: "#fff", stroke: INK, "stroke-width": 6}, g); el("circle", {r: 30, fill: "#3a86ff", stroke: INK, "stroke-width": 4}, g); el("circle", {r: 13, fill: INK}, g); el("circle", {cx: -8, cy: -9, r: 6, fill: "#fff"}, g); return g; }
function firefly(p) { const g = el("g", {}, p); el("circle", {cx: 0, cy: 14, r: 30, fill: "#fff3b0", opacity: .7}, g); el("circle", {cx: 0, cy: 14, r: 15, fill: "#ffe14d"}, g); el("ellipse", {cx: 0, cy: -10, rx: 12, ry: 20, fill: "#3d2c1e", stroke: INK, "stroke-width": 3}, g); return g; }

// ---- HOOK
S.hook = (() => { const s = scene("hook", "#03045e", "#10002b");
  seed = 5; s.st = []; for (let i = 0; i < 30; i++) s.st.push({x: rnd() * 1500, y: rnd() * 900, e: el("circle", {r: 2 + rnd() * 4, fill: "#fff"}, s.stage)});
  s.m = moonDisc(s.stage, 200); s.glow = el("circle", {r: 260, fill: "#fff3b0", opacity: .15}, s.stage); s.stage.appendChild(s.m);
  s.x = chip(s.stage, "✗ its OWN light: never!", "#e63946", {fs: 44}); s.once = tx(s.stage, {x: 1150, y: 520, "text-anchor": "middle", "font-size": 90, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 12}, "NOT ONCE.");
  s.q = chip(s.stage, "🤔 so how can we SEE it?", "#7209b7", {fs: 46});
  s.run = t => { const a = w => C("hook", w);
    s.st.forEach((q, i) => { set(q.e, "cx", q.x); set(q.e, "cy", q.y); op(q.e, .3 + .6 * Math.abs(Math.sin(t * 1.5 + i))); });
    op(s.m, ramp(t, .2, .6)); tf(s.m, "translate(560 470)"); op(s.glow, ramp(t, a("lights"), a("lights") + .4) * .3); set(s.glow, "cx", 560); set(s.glow, "cy", 470);
    op(s.x, ramp(t, a("never"), a("never") + .2)); popAt(s.x, 1150, 380, t, a("never"));
    op(s.once, ramp(t, a("once"), a("once") + .2)); tf(s.once, `translate(1150 520) scale(${pop(t, a("once"))}) translate(-1150 -520)`);
    op(s.q, ramp(t, a("see"), a("see") + .2)); popAt(s.q, 760, 820, t, a("see")); }; return s; })();

// ---- BLINDFOLD
S.blind = (() => { const s = scene("blind", "#90e0ef", "#caffbf");
  s.sun = emo(s.stage, 1300, 220, 180, "☀️"); s.kid = emo(s.stage, 0, 0, 260, "🧒"); s.band = el("rect", {x: -95, y: -50, width: 190, height: 40, rx: 14, fill: "#1b1b3a"}, s.stage);
  s.x = chip(s.stage, "✗ can't see, even in bright sunshine", "#e63946", {fs: 36});
  s.rays = [0, 1, 2].map(() => ray(s.stage)); s.e = eye(s.stage, 1.3);
  s.c = chip(s.stage, "To SEE: light must ENTER our eyes", "#ffbe0b", {fs: 44});
  s.run = t => { const a = w => C("blind", w); const en = ramp(t, a("see#2") - .5, a("see#2") + .2);
    op(s.kid, ramp(t, SC.blind.t0, SC.blind.t0 + .3) * (1 - en)); set(s.kid, "x", 560 + Math.sin(t * 3) * 20); set(s.kid, "y", 500);
    op(s.band, ramp(t, a("blindfold"), a("blindfold") + .2) * (1 - en)); tf(s.band, `translate(${560 + Math.sin(t * 3) * 20} 470)`);
    op(s.x, on(t, a("cannot"), a("see#2") - .5, .2)); popAt(s.x, 760, 780, t, a("cannot"));
    op(s.e, en); tf(s.e, "translate(560 560) scale(1.3)");
    s.rays.forEach((r, i) => r.to(1240, 260 + i * 30, 680, 520 + i * 30, ramp(t, a("see#2") + i * .15, a("see#2") + .8 + i * .15)));
    op(s.c, ramp(t, a("see#2"), a("see#2") + .2)); popAt(s.c, 760, 830, t, a("see#2")); }; return s; })();

// ---- DIRECT
S.direct = (() => { const s = scene("direct", "#1d3557", "#14213d");
  const ys = [230, 420, 610, 800];
  s.src = [["⭐", "star"], ["🕯️", "candle"], [null, "firefly"], ["💡", "bulb"]].map(([e, w], i) => { const g = el("g", {}, s.stage); if (e) emo(g, 0, 0, 120, e); else firefly(g); return {g, w, i}; });
  s.e = eye(s.stage, 1.4); s.rays = ys.map(() => ray(s.stage));
  s.c = chip(s.stage, "light goes STRAIGHT into our eyes ➜ seen DIRECTLY", "#f77f00", {fs: 34});
  s.run = t => { const a = w => C("direct", w);
    s.src.forEach(q => { op(q.g, ramp(t, a(q.w), a(q.w) + .2)); tf(q.g, `translate(380 ${ys[q.i]}) scale(${pop(t, a(q.w))})`); });
    op(s.e, ramp(t, a("straight") - .4, a("straight"))); tf(s.e, "translate(1250 520) scale(1.4)");
    s.rays.forEach((r, i) => r.to(470, ys[i], 1130, 520, ramp(t, a("straight") + i * .1, a("straight") + .7 + i * .1)));
    op(s.c, ramp(t, a("directly"), a("directly") + .2)); popAt(s.c, 760, 930, t, a("directly")); }; return s; })();

// ---- REFLECTION (2 steps)
S.reflect = (() => { const s = scene("reflect", "#fff3b0", "#ffd6a5");
  s.objs = [["✏️", "pencil"], ["🛋️", "sofa"], ["🛝", "swing"]].map(([e, w], i) => ({e: emo(s.stage, 0, 0, 150, e), w, i}));
  s.no = chip(s.stage, "these do NOT give off light", "#6c757d", {fs: 38}); s.two = tx(s.stage, {x: 760, y: 820, "text-anchor": "middle", "font-size": 90, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 12}, "2 STEPS");
  s.lamp = emo(s.stage, 0, 0, 150, "💡"); s.sofa = emo(s.stage, 0, 0, 170, "🛋️"); s.e = eye(s.stage, 1.2); s.r1 = ray(s.stage); s.r2 = ray(s.stage);
  s.l1 = chip(s.stage, "① light FALLS ON the object", "#06d6a0", {fs: 32}); s.l2 = chip(s.stage, "② it BOUNCES OFF into our eyes", "#3a86ff", {fs: 32});
  s.refl = chip(s.stage, "bouncing off = REFLECTION", "#7209b7", {fs: 40}); s.ok = chip(s.stage, "✓ we SEE the object", "#06d6a0", {fs: 40});
  s.run = t => { const a = w => C("reflect1", w), b = w => C("reflect2", w); const dia = ramp(t, b("one") - .4, b("one"));
    s.objs.forEach(o => { op(o.e, ramp(t, a(o.w), a(o.w) + .2) * (1 - dia)); set(o.e, "x", 400 + o.i * 360); set(o.e, "y", 440); });
    op(s.no, on(t, a("not"), b("one") - .3, .2)); popAt(s.no, 760, 650, t, a("not")); op(s.two, on(t, a("two"), b("one") - .3, .2)); tf(s.two, `translate(760 820) scale(${pop(t, a("two"))}) translate(-760 -820)`);
    op(s.lamp, dia); set(s.lamp, "x", 300); set(s.lamp, "y", 260); op(s.sofa, dia); set(s.sofa, "x", 760); set(s.sofa, "y", 660); op(s.e, dia); tf(s.e, "translate(1250 380) scale(1.2)");
    s.r1.to(350, 320, 700, 600, ramp(t, b("falls") - .2, b("falls") + .6)); s.r2.to(820, 600, 1150, 420, ramp(t, b("bounces") - .1, b("enters") + .2));
    op(s.l1, ramp(t, b("falls"), b("falls") + .2)); popAt(s.l1, 380, 520, t, b("falls")); op(s.l2, ramp(t, b("bounces"), b("bounces") + .2)); popAt(s.l2, 1150, 600, t, b("bounces"));
    op(s.refl, ramp(t, b("reflection"), b("reflection") + .2)); popAt(s.refl, 760, 150, t, b("reflection")); op(s.ok, ramp(t, b("see"), b("see") + .2)); popAt(s.ok, 1150, 230, t, b("see")); }; return s; })();

// ---- BLACKOUT
S.blackout = (() => { const s = scene("blackout", "#2b2d42", "#1b1b3a");
  s.table = el("rect", {x: 500, y: 640, width: 520, height: 30, rx: 8, fill: "#8d5524", stroke: INK, "stroke-width": 6}, s.stage); s.pen = emo(s.stage, 760, 600, 110, "✏️");
  s.dark = el("rect", {x: 0, y: 0, width: 1920, height: 1080, fill: "#000"}, s.stage); s.q = tx(s.stage, {x: 760, y: 560, "text-anchor": "middle", "font-size": 120, "font-weight": 700, fill: "#adb5bd"}, "?");
  s.torch = emo(s.stage, 0, 0, 120, "🔦"); s.beam = el("path", {d: "M0 0 L420 230 L380 330 Z", fill: "#fff3b0", opacity: .5}, s.stage);
  s.e = eye(s.stage, 1); s.r1 = ray(s.stage); s.r2 = ray(s.stage); s.ok = chip(s.stage, "✓ Now you can see it!", "#06d6a0", {fs: 44});
  s.l1 = chip(s.stage, "① falls on the pencil", "#06d6a0", {fs: 30}); s.l2 = chip(s.stage, "② reflected into your eyes", "#3a86ff", {fs: 30});
  s.run = t => { const a = w => C("blackout", w); const on1 = ramp(t, a("switch") - .1, a("switch") + .2);
    op(s.dark, .92 * (1 - on1 * .55)); op(s.q, on(t, a("pencil"), a("switch"), .2)); op(s.pen, 1);
    op(s.torch, ramp(t, a("switch") - .3, a("switch"))); set(s.torch, "x", 330); set(s.torch, "y", 360); op(s.beam, on1 * .5); tf(s.beam, "translate(370 380)");
    op(s.e, ramp(t, a("pencil") - .3, a("pencil"))); tf(s.e, "translate(1280 360)");
    s.r1.to(400, 400, 720, 570, ramp(t, a("falls") - .2, a("falls") + .5)); s.r2.to(800, 570, 1190, 390, ramp(t, a("reflected") - .1, a("enters") + .2));
    op(s.l1, ramp(t, a("falls"), a("falls") + .2)); popAt(s.l1, 520, 760, t, a("falls")); op(s.l2, ramp(t, a("reflected"), a("reflected") + .2)); popAt(s.l2, 1100, 560, t, a("reflected"));
    op(s.ok, ramp(t, a("now"), a("now") + .2)); popAt(s.ok, 760, 160, t, a("now")); }; return s; })();

// ---- MOON
S.moon = (() => { const s = scene("moon", "#03045e", "#10002b");
  seed = 8; s.st = []; for (let i = 0; i < 24; i++) s.st.push({x: rnd() * 1500, y: rnd() * 900, e: el("circle", {r: 2 + rnd() * 3, fill: "#fff"}, s.stage)});
  s.sun = emo(s.stage, 0, 0, 220, "☀️"); s.m = moonDisc(s.stage, 110); s.earth = el("g", {}, s.stage); el("circle", {r: 130, fill: "#0077b6", stroke: INK, "stroke-width": 6}, s.earth); el("path", {d: "M-70 -50 q40 -30 80 0 q20 40 -20 60 q-50 10 -60 -60 Z M30 40 q40 -10 60 20 q-20 40 -60 20 Z", fill: "#38b000", stroke: INK, "stroke-width": 4}, s.earth);
  s.kid = emo(s.stage, 0, 0, 90, "👀"); s.r1 = ray(s.stage); s.r2 = ray(s.stage);
  s.not = chip(s.stage, "✗ the Moon is NOT a source of light", "#e63946", {fs: 36}); s.lab = chip(s.stage, "sunlight falls on the Moon ➜ reflected to Earth", "#3a86ff", {fs: 32});
  s.bor = chip(s.stage, "🌕 = BORROWED sunlight ☀️", "#ffbe0b", {fs: 44});
  s.run = t => { const a = w => C("moon", w);
    s.st.forEach((q, i) => { set(q.e, "cx", q.x); set(q.e, "cy", q.y); op(q.e, .3 + .5 * Math.abs(Math.sin(t + i))); });
    op(s.sun, ramp(t, a("sunlight") - .4, a("sunlight"))); set(s.sun, "x", 220); set(s.sun, "y", 640);
    op(s.m, 1); tf(s.m, `translate(800 300) scale(${1 + .04 * Math.sin(t * 2) * ramp(t, a("shines"), a("shines") + .3)})`);
    op(s.earth, ramp(t, a("earth") - .4, a("earth"))); tf(s.earth, "translate(1300 760)"); op(s.kid, ramp(t, a("earth") - .2, a("earth"))); set(s.kid, "x", 1250); set(s.kid, "y", 650);
    s.r1.to(320, 600, 690, 360, ramp(t, a("falls") - .3, a("falls") + .5)); s.r2.to(900, 380, 1220, 630, ramp(t, a("reflected") - .1, a("reflected") + .6));
    op(s.not, on(t, a("not"), a("borrowed") - .3, .2)); popAt(s.not, 760, 120, t, a("not")); op(s.lab, on(t, a("reflected"), a("borrowed") - .3, .2)); popAt(s.lab, 640, 930, t, a("reflected"));
    op(s.bor, ramp(t, a("borrowed"), a("borrowed") + .2)); popAt(s.bor, 760, 120, t, a("borrowed")); }; return s; })();

// ---- MYTH
S.myth = (() => { const s = scene("myth", "#ffadad", "#ffd6a5");
  s.trap = chip(s.stage, "💡 EXAM TIP", "#e63946", {fs: 50}); s.e = eye(s.stage, 1.8);
  s.out = [0, 1, 2].map(() => ray(s.stage, "#e63946")); s.inn = [0, 1, 2].map(() => ray(s.stage, "#06d6a0"));
  s.c1 = chip(s.stage, "✗ eyes SEND OUT light", "#e63946", {fs: 40}); s.c2 = chip(s.stage, "✓ light travels INTO the eyes", "#06d6a0", {fs: 40}); s.x = tx(s.stage, {x: 1100, y: 520, "text-anchor": "middle", "font-size": 200, "font-weight": 700, fill: "#e63946", class: "out", "stroke-width": 12}, "✗");
  s.run = t => { const a = w => C("myth", w); const sw = ramp(t, a("into") - .5, a("into"));
    op(s.trap, ramp(t, a("tip"), a("tip") + .2)); popAt(s.trap, 760, 160, t, a("tip")); op(s.e, 1); tf(s.e, "translate(560 520) scale(1.8)");
    s.out.forEach((r, i) => { r.to(700, 520, 1250, 340 + i * 180, ramp(t, a("send"), a("send") + .6) * 1); op(r, ramp(t, a("send"), a("send") + .2) * (1 - sw)); });
    op(s.x, on(t, a("send") + .6, a("into") - .4, .2));
    s.inn.forEach((r, i) => r.to(1250, 340 + i * 180, 720, 520, ramp(t, a("into") + i * .1, a("into") + .7 + i * .1)));
    op(s.c1, ramp(t, a("send"), a("send") + .2) * (1 - sw)); popAt(s.c1, 760, 860, t, a("send")); op(s.c2, sw); popAt(s.c2, 760, 860, t, a("into") - .5); }; return s; })();

// ---- QUIZ
S.quiz = (() => { const s = scene("quiz", "#b5179e", "#560bad");
  s.pause = tx(s.stage, {x: 760, y: 150, "text-anchor": "middle", "font-size": 72, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 12}, "⏸ PAUSE & PREDICT!");
  s.p1 = el("g", {}, s.stage); el("rect", {x: -260, y: -230, width: 520, height: 460, rx: 30, fill: "#fff", stroke: INK, "stroke-width": 7}, s.p1); tf(moonDisc(s.p1, 90), "translate(0 -60)"); tx(s.p1, {x: 0, y: 110, "text-anchor": "middle", "font-size": 38, "font-weight": 700, fill: INK}, "Source of light?");
  s.a1 = chip(s.p1, "✗ NO: it REFLECTS sunlight", "#e63946", {fs: 30});
  s.p2 = el("g", {}, s.stage); el("rect", {x: -260, y: -230, width: 520, height: 460, rx: 30, fill: "#fff", stroke: INK, "stroke-width": 7}, s.p2); emo(s.p2, 0, -60, 130, "📖"); tx(s.p2, {x: 0, y: 110, "text-anchor": "middle", "font-size": 38, "font-weight": 700, fill: INK}, "How do we see it?");
  s.a2 = chip(s.p2, "☀️ ➜ 📖 ➜ 👁️ reflected into eyes", "#06d6a0", {fs: 30});
  s.run = t => { const a = w => C("quiz1", w), b = w => C("quiz2", w);
    op(s.pause, on(t, a("pause"), b("reflects") - .5, .2)); tf(s.pause, `translate(760 150) scale(${pop(t, a("pause"))}) translate(-760 -150)`);
    op(s.p1, ramp(t, a("moon"), a("moon") + .2)); tf(s.p1, `translate(460 530) scale(${pop(t, a("moon"))})`); op(s.p2, ramp(t, a("book"), a("book") + .2)); tf(s.p2, `translate(1060 530) scale(${pop(t, a("book"))})`);
    op(s.a1, ramp(t, b("reflects"), b("reflects") + .2)); popAt(s.a1, 0, 180, t, b("reflects")); op(s.a2, ramp(t, b("sunlight#2"), b("sunlight#2") + .2)); popAt(s.a2, 0, 180, t, b("sunlight#2")); }; return s; })();

// ---- EXAM
S.exam = (() => { const s = scene("exam", "#14213d", "#1d3557");
  const g = el("g", {transform: "translate(760 450)"}, s.stage);
  el("rect", {x: -670, y: -320, width: 1340, height: 640, rx: 34, fill: "#2b9348", stroke: "#8d5524", "stroke-width": 22, filter: "url(#sh)"}, g);
  tx(g, {x: -610, y: -240, "font-size": 50, "font-weight": 700, fill: "#ffe14d"}, "📝 EXAM CORNER · say it like this:");
  const L = [["☀️ Light from the Sun falls on the Moon."], ["🌕 The light is reflected from the Moon and enters our eyes."], ["👁️ So we can see the Moon."], ["✗ The Moon is NOT a source of light."]];
  let y = -150; s.lines = L.map(ls => { const r = el("g", {opacity: 0}, g); ls.forEach((x, i) => tx(r, {x: -610, y: y + i * 50, "font-size": 40, "font-weight": 600, fill: "#fff"}, x)); y += ls.length * 50 + 50; return r; });
  s.run = t => { const a = w => C("exam", w); const k = [a("light"), a("reflected"), a("so"), a("not")];
    s.lines.forEach((r, i) => { op(r, ramp(t, k[i] - .15, k[i] + .2)); tf(r, `translate(${(1 - ramp(t, k[i] - .15, k[i] + .3)) * -40} 0)`); }); }; return s; })();

// ---- HABIT (teach it)
S.habit = (() => { const s = scene("habit", "#06d6a0", "#118ab2");
  s.title = tx(s.stage, {x: 760, y: 180, "text-anchor": "middle", "font-size": 76, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 12}, "🧑‍🏫 TEACH IT TO SOMEONE");
  s.kid = emo(s.stage, 0, 0, 180, "🧒"); s.fam = emo(s.stage, 0, 0, 180, "👵");
  s.bub = el("g", {}, s.stage); el("rect", {x: -230, y: -70, width: 460, height: 140, rx: 40, fill: "#fff", stroke: INK, "stroke-width": 6}, s.bub); el("path", {d: "M-120 66 L-160 120 L-70 66 Z", fill: "#fff", stroke: INK, "stroke-width": 6}, s.bub); tx(s.bub, {x: 0, y: 22, "text-anchor": "middle", "font-size": 54}, "☀️ ➜ 🌕 ➜ 👁️");
  s.c1 = chip(s.stage, "in your OWN words", "#7209b7", {fs: 38}); s.c2 = chip(s.stage, "can teach it = truly UNDERSTAND it ✓", "#1b1b3a", {fs: 38});
  s.run = t => { const a = w => C("habit1", w);
    op(s.title, ramp(t, a("teach"), a("teach") + .2)); tf(s.title, `translate(760 180) scale(${pop(t, a("teach")) * .95}) translate(-760 -180)`);
    op(s.kid, ramp(t, a("explain") - .3, a("explain"))); set(s.kid, "x", 480); set(s.kid, "y", 620); op(s.fam, ramp(t, a("family"), a("family") + .2)); set(s.fam, "x", 1080); set(s.fam, "y", 620);
    op(s.bub, ramp(t, a("explain"), a("explain") + .2)); tf(s.bub, `translate(700 400) scale(${pop(t, a("explain"))})`);
    op(s.c1, ramp(t, a("own"), a("own") + .2)); popAt(s.c1, 760, 800, t, a("own")); op(s.c2, ramp(t, a("truly"), a("truly") + .2)); popAt(s.c2, 760, 890, t, a("truly")); }; return s; })();

// ---- MIND MAP
S.mindmap = (() => { const s = scene("mindmap", "#fff3b0", "#ffd6a5");
  for (let i = 0; i < 16; i++) el("line", {x1: 0, y1: 120 + i * 60, x2: 1920, y2: 120 + i * 60, stroke: "#a2d2ff", "stroke-width": 2, opacity: .6}, s.stage);
  const CX = 480, CY = 430;
  s.dim = [["🌿 NATURAL SOURCES", "#06d6a0", 300, 230], ["🏭 MAN-MADE SOURCES", "#3a86ff", 760, 230]].map(([n, c, x, y]) => ({l: el("path", {d: `M${CX} ${CY} L${x} ${y}`, stroke: c, "stroke-width": 12, opacity: .35}, s.stage), c: chip(s.stage, n, c, {fs: 28}), x, y}));
  s.l1 = el("path", {d: `M${CX} ${CY} Q560 640 860 640`, stroke: "#f77f00", "stroke-width": 12, fill: "none", "stroke-linecap": "round", "stroke-dasharray": 600}, s.stage);
  s.center = el("g", {}, s.stage); el("ellipse", {rx: 160, ry: 74, fill: "#ffbe0b", stroke: INK, "stroke-width": 7}, s.center); tx(s.center, {x: 0, y: 16, "text-anchor": "middle", "font-size": 50, "font-weight": 700, fill: INK}, "💡 LIGHT");
  s.br = chip(s.stage, "👁️ HOW WE SEE", "#f77f00", {fs: 36});
  s.subs = [["light must ENTER the eyes", "see"], ["directly from a source", "directly"], ["reflected from objects", "reflected"], ["the Moon reflects sunlight", "reflected"]].map(([n, w], i) => ({c: chip(s.stage, n, "#fff", {fs: 27, ink: INK}), w, i}));
  s.ult = chip(s.stage, "🚀 TheOneApp · the ultimate science app", "#7209b7", {fs: 30});
  s.phone = el("g", {}, s.stage); el("rect", {x: -130, y: -240, width: 260, height: 480, rx: 40, fill: INK}, s.phone); el("rect", {x: -112, y: -205, width: 224, height: 410, rx: 20, fill: "#fff"}, s.phone);
  tx(s.phone, {x: 0, y: -168, "text-anchor": "middle", "font-size": 32, "font-weight": 700, fill: "#7209b7"}, "TheOneApp"); tx(s.phone, {x: 0, y: -138, "text-anchor": "middle", "font-size": 17, "font-weight": 600, fill: "#6c757d"}, "the ultimate science app");
  const cp = el("clipPath", {id: "scr14"}, $("v").querySelector("defs")); el("rect", {x: -112, y: -122, width: 224, height: 327, rx: 4}, cp);
  const IH = 224 * 2000 / 780; s.scr = el("g", {"clip-path": "url(#scr14)"}, s.phone); s.shot = el("image", {href: "oneapp_mind2.png", x: -112, y: -122, width: 224, height: IH, preserveAspectRatio: "xMidYMin slice"}, s.scr);
  s.ring = el("rect", {fill: "none", stroke: "#f72585", "stroke-width": 5, rx: 13}, s.scr);
  s.run = t => { const a = w => C("habit2", w);
    op(s.center, ramp(t, a("light"), a("light") + .2)); tf(s.center, `translate(${CX} ${CY}) scale(${pop(t, a("light"))})`);
    s.dim.forEach(d => { op(d.l, ramp(t, a("light") + .3, a("light") + .5) * .35); op(d.c, ramp(t, a("light") + .3, a("light") + .5) * .5); popAt(d.c, d.x, d.y, t, a("light") + .3); });
    set(s.l1, "stroke-dashoffset", 600 * (1 - ramp(t, a("branch") - .1, a("branch") + .4))); op(s.l1, t > a("branch") - .1 ? 1 : 0);
    op(s.br, ramp(t, a("see"), a("see") + .2)); popAt(s.br, 920, 640, t, a("see"));
    s.subs.forEach(c => { const tt = a(c.w) + (c.i === 3 ? .5 : 0); op(c.c, ramp(t, tt, tt + .2)); popAt(c.c, 920, 720 + c.i * 64, t, tt); });
    op(s.ult, on(t, a("ultimate"), SC.mindmap.t1 + .5, .2)); popAt(s.ult, 640, 130, t, a("ultimate"));
    const ph = ramp(t, a("save"), a("save") + .6); op(s.phone, ph); tf(s.phone, `translate(${lerp(1650, 1380, ph)} 520) rotate(${lerp(12, -4, ph)})`);
    const nx = a("ultimate") + .6; const off = -122 - (IH - 327) * ramp(t, a("save"), nx); set(s.shot, "y", off); const sc = IH / 2000;
    set(s.ring, "x", -112 + 36 * sc); set(s.ring, "y", off + 1722 * sc); set(s.ring, "width", 156 * sc); set(s.ring, "height", 72 * sc);
    op(s.ring, on(t, nx, SC.mindmap.t1 + .5, .15) * (.6 + .4 * Math.sin(t * 8))); }; return s; })();

// ---- CLOSE
S.close = (() => { const s = scene("close", "#3a0ca3", "#10002b");
  s.ans = el("g", {}, s.stage); el("rect", {x: -380, y: -70, width: 760, height: 140, rx: 70, fill: "#06d6a0", stroke: INK, "stroke-width": 7}, s.ans); tx(s.ans, {x: 0, y: 22, "text-anchor": "middle", "font-size": 56, "font-weight": 700, fill: "#fff"}, "🌕 Never by itself!");
  s.m = moonDisc(s.stage, 110); s.fam = emo(s.stage, 0, 0, 160, "👵");
  s.bub = el("g", {}, s.stage); el("rect", {x: -230, y: -70, width: 460, height: 140, rx: 40, fill: "#fff", stroke: INK, "stroke-width": 6}, s.bub); tx(s.bub, {x: 0, y: 22, "text-anchor": "middle", "font-size": 54}, "☀️ ➜ 🌕 ➜ 👀");
  s.run = t => { const a = w => C("close", w); const tn = ramp(t, a("tonight") - .2, a("tonight") + .1);
    op(s.ans, ramp(t, a("never"), a("never") + .15) * (1 - tn)); tf(s.ans, `translate(760 420) scale(${pop(t, a("never"))})`);
    op(s.m, ramp(t, a("tonight"), a("tonight") + .2)); tf(s.m, "translate(1200 260)");
    op(s.fam, ramp(t, a("explain"), a("explain") + .2)); set(s.fam, "x", 480); set(s.fam, "y", 640);
    op(s.bub, ramp(t, a("explain"), a("explain") + .2)); tf(s.bub, `translate(820 520) scale(${pop(t, a("explain"))})`); }; return s; })();

// ---- END CARD
S.end = (() => { const s = scene("end", "#3a0ca3", "#7209b7");
  tx(s.stage, {x: 960, y: 360, "text-anchor": "middle", "font-size": 44, "font-weight": 700, fill: "#ffe14d", "letter-spacing": 6}, "NEXT EPISODE");
  tx(s.stage, {x: 960, y: 480, "text-anchor": "middle", "font-size": 84, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 10}, "Why shadows exist");
  tx(s.stage, {x: 960, y: 580, "text-anchor": "middle", "font-size": 84, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 10}, "(and why glass casts them too) 👤");
  s.run = () => {}; return s; })();

