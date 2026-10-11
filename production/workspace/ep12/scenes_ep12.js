/* =================== SCENES (Episode 12: the plasticine trick — hypothesis + fair test) =================== */
const S = {};
const hex = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
const mix = (h1, h2, k) => { const a = hex(h1), b = hex(h2); return "rgb(" + a.map((v, i) => Math.round(lerp(v, b[i], clamp(k)))).join(",") + ")"; };
const PLAY = "#f15bb5";
function ebal(p) { const g = el("g", {}, p);
  el("path", {d: "M-240 100 L-210 0 H210 L240 100 Z", fill: "#dee2e6", stroke: INK, "stroke-width": 7, "stroke-linejoin": "round"}, g);
  el("rect", {x: -190, y: -30, width: 380, height: 26, rx: 10, fill: "#adb5bd", stroke: INK, "stroke-width": 6}, g);
  el("rect", {x: -170, y: 20, width: 220, height: 62, rx: 10, fill: "#1b1b3a", stroke: INK, "stroke-width": 5}, g);
  const txt = tx(g, {x: -60, y: 65, "text-anchor": "middle", "font-size": 44, "font-weight": 700, fill: "#80ffdb"}, "");
  el("circle", {cx: 100, cy: 50, r: 24, fill: "#06d6a0", stroke: INK, "stroke-width": 5}, g); el("circle", {cx: 170, cy: 50, r: 24, fill: "#ffd166", stroke: INK, "stroke-width": 5}, g);
  g.show = (s, col = "#80ffdb") => { txt.textContent = s; set(txt, "fill", col); }; g.show("0.0 g"); return g; }
// plasticine piece: shapes keyed 0 block, 1 flat, 2 ball, 3 log; origin at the bottom centre
function clay(p) { const g = el("g", {}, p); const sh = [
    el("rect", {x: -70, y: -100, width: 140, height: 100, rx: 14, fill: PLAY, stroke: INK, "stroke-width": 6}, g),
    el("ellipse", {cx: 0, cy: -22, rx: 150, ry: 22, fill: PLAY, stroke: INK, "stroke-width": 6}, g),
    el("circle", {cx: 0, cy: -70, r: 70, fill: PLAY, stroke: INK, "stroke-width": 6}, g),
    el("rect", {x: -180, y: -46, width: 360, height: 46, rx: 23, fill: PLAY, stroke: INK, "stroke-width": 6}, g)];
  g.shape = (i, k) => sh.forEach((e, j) => op(e, j === i ? k : j === i - 1 ? 1 - k : 0)); g.shape(0, 1); return g; }

// ---- HOOK
S.hook = (() => { const s = scene("hook", "#ffafcc", "#cdb4db");
  s.c = clay(s.stage); s.hand = emo(s.stage, 0, 0, 150, "✋");
  s.q = tx(s.stage, {x: 1150, y: 360, "text-anchor": "middle", "font-size": 110, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 14}, "LIGHTER?");
  s.t = chip(s.stage, "🔬 test it like a scientist", "#7209b7", {fs: 44});
  s.run = t => { const a = w => C("hook", w); const f = ramp(t, a("flattening") - .2, a("flattening") + .5);
    op(s.c, ramp(t, .2, .5)); tf(s.c, "translate(600 640) scale(1.4)"); s.c.shape(f > 0 ? 1 : 0, f > 0 ? f : 1);
    op(s.hand, on(t, a("flattening") - .6, a("flattening") + 1, .2)); set(s.hand, "x", 600); set(s.hand, "y", lerp(380, 560, f));
    op(s.q, ramp(t, a("lighter"), a("lighter") + .2)); tf(s.q, `translate(1150 360) scale(${pop(t, a("lighter"))}) translate(-1150 -360)`);
    op(s.t, ramp(t, a("test"), a("test") + .2)); popAt(s.t, 760, 820, t, a("test")); }; return s; })();

// ---- STORY (toppling tower)
S.story = (() => { const s = scene("story", "#bde0fe", "#a2d2ff");
  s.tower = el("g", {}, s.stage); [[-90, 0, 180], [-70, -100, 140], [-60, -200, 120]].forEach(([x, y, w], i) => el("rect", {x, y: y - 100, width: w, height: 100, rx: 12, fill: ["#4cc9f0", "#ffd166", PLAY][i], stroke: INK, "stroke-width": 6}, s.tower));
  s.kid = emo(s.stage, 0, 0, 160, "🧒");
  s.bub = el("g", {}, s.stage); el("path", {d: "M-300 -80 H300 A40 40 0 0 1 340 -40 V40 A40 40 0 0 1 300 80 H-120 L-190 140 L-180 80 H-300 A40 40 0 0 1 -340 40 V-40 A40 40 0 0 1 -300 -80 Z", fill: "#fff", stroke: INK, "stroke-width": 7}, s.bub);
  tx(s.bub, {x: 0, y: -8, "text-anchor": "middle", "font-size": 40, "font-weight": 700, fill: INK}, "Flatten the heavy piece…"); s.l2 = tx(s.bub, {x: 0, y: 46, "text-anchor": "middle", "font-size": 40, "font-weight": 700, fill: "#e63946"}, "it'll be LIGHTER!");
  s.q = chip(s.stage, "🤔 Is your friend right?", "#1b1b3a", {fs: 44});
  s.run = t => { const a = w => C("story", w); const wob = ramp(t, a("tower"), a("toppling")), fall = ramp(t, a("toppling"), a("toppling") + .8) * (1 - ramp(t, a("friend") - .2, a("friend")));
    op(s.tower, ramp(t, a("tower") - .3, a("tower"))); tf(s.tower, `translate(460 760) rotate(${Math.sin(t * 5) * 4 * wob + fall * 25} 0 0)`);
    op(s.kid, ramp(t, a("friend"), a("friend") + .2)); set(s.kid, "x", 1120); set(s.kid, "y", 700);
    op(s.bub, ramp(t, a("flatten"), a("flatten") + .2)); tf(s.bub, `translate(1050 420) scale(${pop(t, a("flatten")) * .9})`); op(s.l2, ramp(t, a("lighter"), a("lighter") + .2));
    op(s.q, ramp(t, a("right"), a("right") + .2)); popAt(s.q, 760, 160, t, a("right")); }; return s; })();

// ---- HYPOTHESIS
S.hyp = (() => { const s = scene("hyp", "#e0aaff", "#c77dff");
  s.title = tx(s.stage, {x: 760, y: 170, "text-anchor": "middle", "font-size": 90, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 14}, "🔮 HYPOTHESIS");
  s.x = chip(s.stage, "✗ a wild guess 🎲", "#6c757d", {fs: 38}); s.ok = chip(s.stage, "✓ a prediction based on what you KNOW 🧠", "#7209b7", {fs: 38});
  s.f1 = chip(s.stage, "we know: mass = the amount of matter", "#fff", {fs: 32, ink: INK}); s.f2 = chip(s.stage, "flattening adds or removes NOTHING", "#fff", {fs: 32, ink: INK});
  s.card = el("g", {}, s.stage); el("rect", {x: -560, y: -90, width: 1120, height: 180, rx: 26, fill: "#fff", stroke: "#7209b7", "stroke-width": 9, filter: "url(#sh)"}, s.card);
  tx(s.card, {x: 0, y: -22, "text-anchor": "middle", "font-size": 40, "font-weight": 700, fill: "#7209b7"}, "Our hypothesis:"); tx(s.card, {x: 0, y: 40, "text-anchor": "middle", "font-size": 42, "font-weight": 700, fill: INK}, "changing the SHAPE does not change the MASS");
  s.run = t => { const a = w => C("hyp", w); const fin = ramp(t, a("so") - .2, a("so") + .2);
    op(s.title, ramp(t, a("hypothesis"), a("hypothesis") + .2)); tf(s.title, `translate(760 170) scale(${pop(t, a("hypothesis"))}) translate(-760 -170)`);
    op(s.x, ramp(t, a("wild"), a("wild") + .2) * (1 - fin)); popAt(s.x, 760, 320, t, a("wild")); op(s.ok, ramp(t, a("prediction"), a("prediction") + .2) * (1 - fin)); popAt(s.ok, 760, 420, t, a("prediction"));
    op(s.f1, ramp(t, a("amount"), a("amount") + .2)); popAt(s.f1, 760, lerp(560, 330, fin), t, a("amount")); op(s.f2, ramp(t, a("remove"), a("remove") + .2)); popAt(s.f2, 760, lerp(650, 420, fin), t, a("remove"));
    op(s.card, fin); tf(s.card, `translate(760 640) scale(${pop(t, a("so") - .2)})`); }; return s; })();

// ---- FAIR TEST (variables table)
S.fair = (() => { const s = scene("fair", "#caffbf", "#9bf6ff");
  s.title = chip(s.stage, "⚖️ FAIR TEST = change only ONE thing", "#06d6a0", {fs: 46});
  s.rows = [["🔄 CHANGE", "the shape", "#ef476f"], ["🔒 KEEP THE SAME", "amount + type of plasticine", "#6c757d"], ["📏 MEASURE", "the mass (electronic balance)", "#3a86ff"]].map(([h, v, c], i) => { const g = el("g", {}, s.stage);
    el("rect", {x: -560, y: -60, width: 1120, height: 120, rx: 20, fill: "#fff", stroke: INK, "stroke-width": 6}, g); el("rect", {x: -560, y: -60, width: 420, height: 120, rx: 20, fill: c, stroke: INK, "stroke-width": 6}, g);
    tx(g, {x: -350, y: 14, "text-anchor": "middle", "font-size": 38, "font-weight": 700, fill: "#fff"}, h); tx(g, {x: 210, y: 14, "text-anchor": "middle", "font-size": 38, "font-weight": 700, fill: INK}, v); return g; });
  s.shapes = clay(s.stage); s.bal = ebal(s.stage);
  s.run = t => { const a = w => C("fair", w);
    op(s.title, ramp(t, a("fair"), a("fair") + .2)); popAt(s.title, 760, 160, t, a("fair"));
    [a("change#2"), a("keep#2"), a("measure")].forEach((tt, i) => { op(s.rows[i], ramp(t, tt, tt + .2)); tf(s.rows[i], `translate(${760 - (1 - ramp(t, tt, tt + .3)) * 60} ${330 + i * 150})`); });
    const cyc = Math.floor(t * 1.2) % 4; op(s.shapes, on(t, a("change#2"), a("keep#2"), .2)); tf(s.shapes, "translate(1500 800) scale(.6)"); s.shapes.shape(cyc, 1);
    op(s.bal, ramp(t, a("balance"), a("balance") + .2)); tf(s.bal, "translate(760 850) scale(.6)"); }; return s; })();

// ---- METHOD
S.method = (() => { const s = scene("method", "#fff3b0", "#ffd6a5");
  s.bal = ebal(s.stage); s.c = clay(s.stage); s.hand = emo(s.stage, 0, 0, 130, "✋");
  s.tab = el("g", {}, s.stage); el("rect", {x: -230, y: -40, width: 460, height: 400, rx: 22, fill: "#fff", stroke: INK, "stroke-width": 6, filter: "url(#sh)"}, s.tab);
  tx(s.tab, {x: -190, y: 10, "font-size": 34, "font-weight": 700, fill: "#7209b7"}, "SHAPE"); tx(s.tab, {x: 190, y: 10, "text-anchor": "end", "font-size": 34, "font-weight": 700, fill: "#7209b7"}, "MASS");
  s.tr = ["block", "flat", "ball", "log"].map((n, i) => { const r = el("g", {opacity: 0}, s.tab); tx(r, {x: -190, y: 90 + i * 70, "font-size": 34, "font-weight": 700, fill: INK}, n); tx(r, {x: 190, y: 90 + i * 70, "text-anchor": "end", "font-size": 34, "font-weight": 700, fill: "#06d6a0"}, "20.0 g"); return r; });
  s.same = chip(s.stage, "ALWAYS 20.0 g!", "#d00000", {fs: 46});
  s.run = t => { const a = w => C("method", w); const ts = [a("block"), a("flatten"), a("ball"), a("log")], rd = [a("twenty"), a("twenty#2"), a("twenty#3"), a("twenty#4")];
    let i = 0; for (let j = 0; j < 4; j++) if (t >= ts[j] - .3) i = j; const k = ramp(t, ts[i] - .3, ts[i] + .3);
    op(s.bal, 1); tf(s.bal, "translate(560 680)"); const reading = rd.some((r, j) => j === i && t >= r - .2); s.bal.show(t < rd[0] - .2 ? "0.0 g" : (reading || i === 0) ? "20.0 g" : "…", reading ? "#80ffdb" : "#ffd166");
    op(s.c, ramp(t, ts[0] - .4, ts[0])); tf(s.c, "translate(560 650)"); s.c.shape(i, i === 0 ? 1 : k);
    op(s.hand, i > 0 ? on(t, ts[i] - .5, ts[i] + .6, .2) : 0); set(s.hand, "x", 560 + Math.sin(t * 10) * 20 * (i > 1 ? 1 : 0)); set(s.hand, "y", lerp(420, 540, k));
    op(s.tab, ramp(t, rd[0], rd[0] + .3)); tf(s.tab, "translate(1180 300)"); s.tr.forEach((r, j) => op(r, ramp(t, rd[j], rd[j] + .2)));
    op(s.same, ramp(t, a("still"), a("still") + .2)); popAt(s.same, 1180, 790, t, a("still")); }; return s; })();

// ---- RESULT
S.result = (() => { const s = scene("result", "#06d6a0", "#118ab2");
  s.stamp = el("g", {}, s.stage); el("rect", {x: -520, y: -75, width: 1040, height: 150, rx: 24, fill: "#fff", stroke: "#38b000", "stroke-width": 12}, s.stamp); tx(s.stamp, {x: 0, y: 22, "text-anchor": "middle", "font-size": 56, "font-weight": 700, fill: "#38b000"}, "✓ RESULTS SUPPORT THE HYPOTHESIS");
  s.c1 = chip(s.stage, "SHAPE does not affect MASS", "#d00000", {fs: 46});
  s.kid = emo(s.stage, 0, 0, 160, "😅"); s.c2 = chip(s.stage, "the friend's idea was wrong… and that's OK", "#1b1b3a", {fs: 34}); s.c3 = chip(s.stage, "🧠 now we know MORE", "#7209b7", {fs: 40});
  s.run = t => { const a = w => C("result", w);
    op(s.stamp, ramp(t, a("support"), a("support") + .15)); tf(s.stamp, `translate(760 220) rotate(-3) scale(${1.3 - .3 * ramp(t, a("support"), a("support") + .25)})`);
    op(s.c1, ramp(t, a("affect"), a("affect") + .2)); popAt(s.c1, 760, 380, t, a("affect"));
    op(s.kid, ramp(t, a("wrong"), a("wrong") + .2)); set(s.kid, "x", 760); set(s.kid, "y", 560);
    op(s.c2, ramp(t, a("okay"), a("okay") + .2)); popAt(s.c2, 760, 700, t, a("okay")); op(s.c3, ramp(t, a("know"), a("know") + .2)); popAt(s.c3, 760, 800, t, a("know")); }; return s; })();

// ---- WRONG (results don't support: loop)
S.wrong = (() => { const s = scene("wrong", "#ffd166", "#f77f00");
  s.title = chip(s.stage, "results DON'T support it? that's OK too 👍", "#1b1b3a", {fs: 40});
  const P = [[760, 330], [1040, 700], [480, 700]];
  s.ar = el("circle", {cx: 760, cy: 580, r: 240, fill: "none", stroke: "#fff", "stroke-width": 10, "stroke-dasharray": "30 22"}, s.stage);
  s.n = [["🔍 check the method", "check"], ["📚 gather more info", "gather"], ["🔁 try again", "try"]].map(([n, w], i) => ({c: chip(s.stage, n, ["#3a86ff", "#7209b7", "#06d6a0"][i], {fs: 36}), w, p: P[i]}));
  s.run = t => { const a = w => C("wrong", w);
    op(s.title, ramp(t, a("support"), a("support") + .2)); popAt(s.title, 760, 160, t, a("support"));
    op(s.ar, ramp(t, a("check") - .3, a("check"))); tf(s.ar, `rotate(${t * 30} 760 580)`);
    s.n.forEach(n => { op(n.c, ramp(t, a(n.w), a(n.w) + .2)); popAt(n.c, n.p[0], n.p[1], t, a(n.w)); }); }; return s; })();

// ---- QUIZ
S.quiz = (() => { const s = scene("quiz", "#b5179e", "#560bad");
  s.pause = tx(s.stage, {x: 760, y: 150, "text-anchor": "middle", "font-size": 72, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 12}, "⏸ PAUSE & PREDICT!");
  s.whole = emo(s.stage, 0, 0, 200, "🍎"); s.sl = []; for (let i = 0; i < 8; i++) { const a0 = i / 8 * 6.283, a1 = (i + 1) / 8 * 6.283;
    s.sl.push({a: (a0 + a1) / 2, e: el("path", {d: `M0 0 L${Math.cos(a0) * 90} ${Math.sin(a0) * 90} A90 90 0 0 1 ${Math.cos(a1) * 90} ${Math.sin(a1) * 90} Z`, fill: "#fff1e6", stroke: "#e63946", "stroke-width": 8}, s.stage)}); }
  s.o = [["MORE", "more"], ["LESS", "less"], ["SAME", "same"]].map(([n, w], i) => { const g = el("g", {}, s.stage); const f = el("rect", {x: -130, y: -60, width: 260, height: 120, rx: 26, fill: "#fff", stroke: INK, "stroke-width": 6}, g);
    tx(g, {x: 0, y: 16, "text-anchor": "middle", "font-size": 46, "font-weight": 700, fill: INK}, n); return {g, f, w, i}; });
  s.ans = chip(s.stage, "no apple added or removed ➜ SAME amount of matter", "#06d6a0", {fs: 34});
  s.run = t => { const a = w => C("quiz1", w), b = w => C("quiz2", w); const cut = ramp(t, a("eight"), a("eight") + .8);
    op(s.pause, on(t, a("pause"), b("same"), .2)); tf(s.pause, `translate(760 150) scale(${pop(t, a("pause"))}) translate(-760 -150)`);
    op(s.whole, ramp(t, a("apple"), a("apple") + .2) * (1 - cut)); set(s.whole, "x", 760); set(s.whole, "y", 400);
    s.sl.forEach(q => { set(q.e, "transform", `translate(${760 + Math.cos(q.a) * 60 * cut} ${400 + Math.sin(q.a) * 60 * cut})`); op(q.e, cut); });
    s.o.forEach(o => { const tt = a(o.w); op(o.g, ramp(t, tt, tt + .2)); tf(o.g, `translate(${420 + o.i * 340} 700) scale(${pop(t, tt)})`); set(o.f, "fill", t > b("same") ? (o.i === 2 ? "#d8f3dc" : "#ffccd5") : "#fff"); });
    op(s.ans, ramp(t, b("matter"), b("matter") + .2)); popAt(s.ans, 760, 860, t, b("matter")); }; return s; })();

// ---- EXAM
S.exam = (() => { const s = scene("exam", "#14213d", "#1d3557");
  const g = el("g", {transform: "translate(760 450)"}, s.stage);
  el("rect", {x: -670, y: -320, width: 1340, height: 640, rx: 34, fill: "#2b9348", stroke: "#8d5524", "stroke-width": 22, filter: "url(#sh)"}, g);
  tx(g, {x: -610, y: -240, "font-size": 50, "font-weight": 700, fill: "#ffe14d"}, "📝 EXAM CORNER · say it like this:");
  const L = [["🔮 A hypothesis is a prediction based on what we know."], ["⚖️ In a fair test, change only ONE variable, and keep", "     all the other variables the same."], ["✅ The results support the hypothesis that shape", "     does not affect mass."]];
  let y = -150; s.lines = L.map(ls => { const r = el("g", {opacity: 0}, g); ls.forEach((x, i) => tx(r, {x: -610, y: y + i * 50, "font-size": 40, "font-weight": 600, fill: "#fff"}, x)); y += ls.length * 50 + 50; return r; });
  s.run = t => { const a = w => C("exam", w); const k = [a("hypothesis"), a("fair"), a("results")];
    s.lines.forEach((r, i) => { op(r, ramp(t, k[i] - .15, k[i] + .2)); tf(r, `translate(${(1 - ramp(t, k[i] - .15, k[i] + .3)) * -40} 0)`); }); }; return s; })();

// ---- HABIT (treat it like an experiment)
S.habit = (() => { const s = scene("habit", "#06d6a0", "#118ab2");
  s.title = tx(s.stage, {x: 760, y: 170, "text-anchor": "middle", "font-size": 66, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 12}, "🧪 TREAT IT LIKE AN EXPERIMENT");
  s.steps = [["📋 plan didn't work", "#6c757d", "work"], ["🚫 don't give up", "#e63946", "give"], ["❓ ask WHY", "#7209b7", "why"], ["🔧 change ONE thing", "#f77f00", "change"], ["🔁 test again next week", "#06d6a0", "test"]].map(([n, c, w], i) => ({c: chip(s.stage, n, c, {fs: 36}), w, i}));
  s.run = t => { const a = w => C("habit1", w);
    op(s.title, ramp(t, a("experiment"), a("experiment") + .2)); tf(s.title, `translate(760 170) scale(${pop(t, a("experiment"))}) translate(-760 -170)`);
    s.steps.forEach(st => { const tt = a(st.w); op(st.c, ramp(t, tt, tt + .2)); popAt(st.c, 760 + (st.i % 2 ? 140 : -140), 300 + st.i * 120, t, tt); }); }; return s; })();

// ---- MIND MAP
S.mindmap = (() => { const s = scene("mindmap", "#fff3b0", "#ffd6a5");
  for (let i = 0; i < 16; i++) el("line", {x1: 0, y1: 120 + i * 60, x2: 1920, y2: 120 + i * 60, stroke: "#a2d2ff", "stroke-width": 2, opacity: .6}, s.stage);
  const CX = 380, CY = 500;
  s.dim = [["⚖️ HAS MASS", "#ef476f", 300, 250], ["📦 TAKES UP SPACE", "#3a86ff", 380, 800]].map(([n, c, x, y]) => ({l: el("path", {d: `M${CX} ${CY} L${x} ${y}`, stroke: c, "stroke-width": 12, opacity: .35}, s.stage), c: chip(s.stage, n, c, {fs: 28}), x, y}));
  s.l1 = el("path", {d: `M${CX} ${CY} Q600 360 830 360`, stroke: "#06d6a0", "stroke-width": 12, fill: "none", "stroke-linecap": "round", "stroke-dasharray": 600}, s.stage);
  s.center = el("g", {}, s.stage); el("ellipse", {rx: 170, ry: 76, fill: "#7209b7", stroke: INK, "stroke-width": 7}, s.center); tx(s.center, {x: 0, y: 16, "text-anchor": "middle", "font-size": 50, "font-weight": 700, fill: "#fff"}, "MATTER");
  s.br = chip(s.stage, "🔬 HOW SCIENTISTS INVESTIGATE", "#06d6a0", {fs: 34});
  s.subs = [["hypothesis", "hypothesis"], ["fair test", "fair"], ["change 1 variable, keep the rest", "variable"], ["measure (e.g. mass)", "measure"]].map(([n, w], i) => ({c: chip(s.stage, n, "#fff", {fs: 28, ink: INK}), w, i}));
  s.ult = chip(s.stage, "🚀 TheOneApp · the ultimate science app", "#7209b7", {fs: 30});
  s.phone = el("g", {}, s.stage); el("rect", {x: -130, y: -240, width: 260, height: 480, rx: 40, fill: INK}, s.phone); el("rect", {x: -112, y: -205, width: 224, height: 410, rx: 20, fill: "#fff"}, s.phone);
  tx(s.phone, {x: 0, y: -168, "text-anchor": "middle", "font-size": 32, "font-weight": 700, fill: "#7209b7"}, "TheOneApp"); tx(s.phone, {x: 0, y: -138, "text-anchor": "middle", "font-size": 17, "font-weight": 600, fill: "#6c757d"}, "the ultimate science app");
  const cp = el("clipPath", {id: "scr12"}, $("v").querySelector("defs")); el("rect", {x: -112, y: -122, width: 224, height: 327, rx: 4}, cp);
  s.scr = el("g", {"clip-path": "url(#scr12)"}, s.phone); s.shot = el("image", {href: "oneapp_mind.png", x: -112, y: -122, width: 224, height: 485, preserveAspectRatio: "xMidYMin slice"}, s.scr);
  s.ring = el("rect", {fill: "none", stroke: "#f72585", "stroke-width": 5, rx: 13}, s.scr);
  s.run = t => { const a = w => C("habit2", w);
    op(s.center, ramp(t, a("matter"), a("matter") + .2)); tf(s.center, `translate(${CX} ${CY}) scale(${pop(t, a("matter"))})`);
    s.dim.forEach(d => { op(d.l, ramp(t, a("matter") + .3, a("matter") + .5) * .35); op(d.c, ramp(t, a("matter") + .3, a("matter") + .5) * .5); popAt(d.c, d.x, d.y, t, a("matter") + .3); });
    set(s.l1, "stroke-dashoffset", 600 * (1 - ramp(t, a("branch") - .1, a("branch") + .4))); op(s.l1, t > a("branch") - .1 ? 1 : 0);
    op(s.br, ramp(t, a("investigate"), a("investigate") + .2)); popAt(s.br, 900, 360, t, a("investigate"));
    s.subs.forEach(c => { const tt = a(c.w); op(c.c, ramp(t, tt, tt + .2)); popAt(c.c, 900, 450 + c.i * 76, t, tt); });
    op(s.ult, on(t, a("ultimate"), SC.mindmap.t1 + .5, .2)); popAt(s.ult, 640, 150, t, a("ultimate"));
    const ph = ramp(t, a("save"), a("save") + .6); op(s.phone, ph); tf(s.phone, `translate(${lerp(1650, 1380, ph)} 560) rotate(${lerp(12, -4, ph)})`);
    const nx = a("ultimate") + .6; const off = -122 - 190 * ramp(t, a("save"), nx); set(s.shot, "y", off);
    set(s.ring, "x", -112 + 224 * (36 / 780)); set(s.ring, "y", off + 485 * (1083 / 1688)); set(s.ring, "width", 224 * (176 / 780)); set(s.ring, "height", 485 * (72 / 1688));
    op(s.ring, on(t, nx, SC.mindmap.t1 + .5, .15) * (.6 + .4 * Math.sin(t * 8))); }; return s; })();

// ---- CLOSE
S.close = (() => { const s = scene("close", "#f15bb5", "#fee440");
  s.ans = el("g", {}, s.stage); el("rect", {x: -470, y: -70, width: 940, height: 140, rx: 70, fill: "#06d6a0", stroke: INK, "stroke-width": 7}, s.ans); tx(s.ans, {x: 0, y: 20, "text-anchor": "middle", "font-size": 50, "font-weight": 700, fill: "#fff"}, "✗ NO! Shape does not change mass");
  s.note = el("g", {}, s.stage); el("rect", {x: -420, y: -230, width: 840, height: 460, rx: 20, fill: "#fffdf0", stroke: INK, "stroke-width": 7, filter: "url(#sh)"}, s.note);
  for (let i = 0; i < 7; i++) el("line", {x1: -390, y1: -150 + i * 60, x2: 390, y2: -150 + i * 60, stroke: "#a2d2ff", "stroke-width": 3}, s.note);
  s.n1 = tx(s.note, {x: -380, y: -170, "font-size": 40, "font-weight": 700, fill: "#7209b7"}, "🔮 My hypothesis: ________");
  s.n2 = el("g", {}, s.note); tx(s.n2, {x: -380, y: -50, "font-size": 38, "font-weight": 700, fill: "#06d6a0"}, "⚖️ Fair test:"); [["🔄 change:", 10], ["🔒 keep the same:", 70], ["📏 measure:", 130]].forEach(([n, y]) => tx(s.n2, {x: -340, y, "font-size": 34, "font-weight": 600, fill: INK}, n + " ______"));
  s.pen = emo(s.stage, 0, 0, 100, "✏️");
  s.run = t => { const a = w => C("close", w); const tn = ramp(t, a("your") - .2, a("your") + .1);
    op(s.ans, ramp(t, a("no"), a("no") + .15) * (1 - tn)); tf(s.ans, `translate(760 420) scale(${pop(t, a("no"))})`);
    op(s.note, tn); tf(s.note, "translate(760 500)"); op(s.n1, ramp(t, a("write"), a("write") + .2)); op(s.n2, ramp(t, a("plan"), a("plan") + .2));
    op(s.pen, ramp(t, a("write"), a("write") + .2)); set(s.pen, "x", 1220 + Math.sin(t * 9) * 12); set(s.pen, "y", 360 + Math.cos(t * 9) * 8); }; return s; })();

// ---- END CARD
S.end = (() => { const s = scene("end", "#3a0ca3", "#7209b7");
  tx(s.stage, {x: 960, y: 360, "text-anchor": "middle", "font-size": 44, "font-weight": 700, fill: "#ffe14d", "letter-spacing": 6}, "NEXT: A NEW THEME · ENERGY");
  tx(s.stage, {x: 960, y: 480, "text-anchor": "middle", "font-size": 84, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 10}, "Every light in the universe");
  tx(s.stage, {x: 960, y: 580, "text-anchor": "middle", "font-size": 84, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 10}, "comes from one of these 💡");
  s.run = () => {}; return s; })();

