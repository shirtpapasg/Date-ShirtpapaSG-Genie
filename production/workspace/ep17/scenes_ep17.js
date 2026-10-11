/* =================== SCENES (Episode 17: shadow shapes, the Sun, sundials) =================== */
const S = {};
const hex = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
const mix = (h1, h2, k) => { const a = hex(h1), b = hex(h2); return "rgb(" + a.map((v, i) => Math.round(lerp(v, b[i], clamp(k)))).join(",") + ")"; };
const CONE = "#ff9f1c", SHD = "#1b1b3a";
function coneUp(p, s = 1) { const g = el("g", {transform: `scale(${s})`}, p); el("path", {d: "M0 -150 L-90 90 L90 90 Z", fill: CONE, stroke: INK, "stroke-width": 6, "stroke-linejoin": "round"}, g); el("ellipse", {cx: 0, cy: 90, rx: 90, ry: 22, fill: "#f77f00", stroke: INK, "stroke-width": 6}, g); return g; }
function coneSide(p, tipLeft) { const g = el("g", {}, p); const d = tipLeft ? 1 : -1; el("path", {d: `M${-120 * d} 0 L${120 * d} -90 L${120 * d} 90 Z`, fill: CONE, stroke: INK, "stroke-width": 6, "stroke-linejoin": "round"}, g); el("ellipse", {cx: 120 * d, cy: 0, rx: 22, ry: 90, fill: "#f77f00", stroke: INK, "stroke-width": 6}, g); return g; }
function wallSet(p, wx) { const g = el("g", {}, p); el("path", {d: `M330 480 L${wx} 160 L${wx} 800 Z`, fill: "#fff3b0", opacity: .35}, g); el("rect", {x: wx, y: 140, width: 36, height: 680, fill: "#e9ecef", stroke: INK, "stroke-width": 6}, g); emo(g, 280, 480, 110, "🔦"); return g; }
function blackEmo(p, ch, size) { const e = emo(p, 0, 0, size, ch); e.setAttribute("style", "filter: brightness(0)"); return e; }

// ---- HOOK
S.hook = (() => { const s = scene("hook", "#ffd166", "#f77f00");
  s.c1 = coneUp(s.stage); s.c2 = coneSide(s.stage, true); s.q = tx(s.stage, {x: 1150, y: 360, "text-anchor": "middle", "font-size": 110, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 14}, "= ⚪ ?!");
  s.sh = el("circle", {r: 0, fill: SHD, opacity: .85}, s.stage); s.c = chip(s.stage, "turn it the RIGHT way ↻", "#7209b7", {fs: 40});
  s.run = t => { const a = w => C("hook", w); const tn = ramp(t, a("turn") - .2, a("turn") + .5);
    op(s.c1, ramp(t, a("pointy") - .3, a("pointy")) * (1 - tn)); tf(s.c1, `translate(520 500) rotate(${tn * 90})`); op(s.c2, tn); tf(s.c2, "translate(520 500)");
    op(s.q, ramp(t, a("round"), a("round") + .2)); tf(s.q, `translate(1150 360) scale(${pop(t, a("round"))}) translate(-1150 -360)`);
    set(s.sh, "cx", 1150); set(s.sh, "cy", 620); set(s.sh, "r", 110 * ramp(t, a("does") - .2, a("does") + .3));
    op(s.c, ramp(t, a("turn"), a("turn") + .2)); popAt(s.c, 760, 860, t, a("turn")); }; return s; })();

// ---- SHAPE
S.shape = (() => { const s = scene("shape", "#caffbf", "#9bf6ff");
  s.r = [0, 1].map(i => { const g = el("g", {}, s.stage); el("path", {d: "M380 0 L1150 -150 L1150 150 Z", fill: "#fff3b0", opacity: .4}, g); el("rect", {x: 1150, y: -170, width: 30, height: 340, fill: "#e9ecef", stroke: INK, "stroke-width": 5}, g); emo(g, 330, 0, 90, "🔦"); return g; });
  s.ball = el("circle", {r: 60, fill: "#ef476f", stroke: INK, "stroke-width": 6}, s.stage); s.bs = el("ellipse", {rx: 15, ry: 120, fill: SHD}, s.stage); s.ball2 = el("circle", {r: 0}, s.stage);
  s.card = el("rect", {x: -16, y: -60, width: 32, height: 120, fill: "#3a86ff", stroke: INK, "stroke-width": 5}, s.stage); s.cs = el("rect", {width: 30, height: 240, fill: SHD}, s.stage);
  s.ln = [chip(s.stage, "⚽ round ball ➜ ROUND shadow", "#ef476f", {fs: 30}), chip(s.stage, "🟦 square card ➜ SQUARE shadow", "#3a86ff", {fs: 30})];
  s.big = chip(s.stage, "shadow SHAPE depends on the object's shape", "#7209b7", {fs: 36});
  s.run = t => { const a = w => C("shape", w);
    tf(s.r[0], "translate(0 340)"); tf(s.r[1], "translate(0 720)"); op(s.r[0], ramp(t, a("ball") - .3, a("ball"))); op(s.r[1], ramp(t, a("card") - .3, a("card")));
    op(s.ball, ramp(t, a("ball") - .3, a("ball"))); set(s.ball, "cx", 760); set(s.ball, "cy", 340); op(s.bs, ramp(t, a("round#2") - .2, a("round#2"))); set(s.bs, "cx", 1165); set(s.bs, "cy", 340);
    op(s.card, ramp(t, a("card") - .3, a("card"))); tf(s.card, "translate(760 720)"); op(s.cs, ramp(t, a("square#2") - .2, a("square#2"))); set(s.cs, "x", 1150); set(s.cs, "y", 600);
    op(s.ln[0], ramp(t, a("round#2"), a("round#2") + .2)); popAt(s.ln[0], 760, 200, t, a("round#2")); op(s.ln[1], ramp(t, a("square#2"), a("square#2") + .2)); popAt(s.ln[1], 760, 580, t, a("square#2"));
    op(s.big, ramp(t, a("shape"), a("shape") + .2) * (1 - ramp(t, a("ball") - .3, a("ball")))); popAt(s.big, 760, 480, t, a("shape")); }; return s; })();

// ---- CONE (part facing the light)
S.cone = (() => { const s = scene("cone", "#bde0fe", "#a2d2ff");
  s.ws = wallSet(s.stage, 1200);
  s.up = coneUp(s.stage, .9); s.bl = coneSide(s.stage, false); s.tl = coneSide(s.stage, true);
  s.tri = el("path", {d: "M1200 260 L1236 260 L1236 700 L1200 700 Z", fill: SHD}, s.stage); s.triS = el("path", {d: "M1236 250 L1236 250 L1300 700 L1172 700 Z", fill: SHD}, s.stage);
  s.cir = el("ellipse", {cx: 1218, cy: 480, rx: 60, ry: 200, fill: SHD}, s.stage);
  s.ins = el("g", {}, s.stage); el("rect", {x: -150, y: -170, width: 300, height: 340, rx: 20, fill: "#e9ecef", stroke: INK, "stroke-width": 6}, s.ins); tx(s.ins, {x: 0, y: -125, "text-anchor": "middle", "font-size": 26, "font-weight": 700, fill: "#495057"}, "👀 on the wall:");
  s.iT = el("path", {d: "M-90 90 L0 -90 L90 90 Z", fill: SHD}, s.ins); s.iC = el("circle", {cy: 15, r: 95, fill: SHD}, s.ins);
  s.c0 = chip(s.stage, "depends on which PART faces the light", "#f77f00", {fs: 36});
  s.c1 = chip(s.stage, "side faces the light ➜ TRIANGLE", "#ef476f", {fs: 32}); s.c2 = chip(s.stage, "round base faces the light ➜ CIRCLE", "#06d6a0", {fs: 32}); s.c3 = chip(s.stage, "even tip first ➜ still a CIRCLE (the base blocks the light)", "#3a86ff", {fs: 30});
  s.run = t => { const a = w => C("cone", w); const p1 = on(t, a("side") - .3, a("base") - .3, .2), p2 = on(t, a("base") - .3, a("tip") - .3, .2), p3 = ramp(t, a("tip") - .3, a("tip"));
    op(s.ws, ramp(t, SC.cone.t0, SC.cone.t0 + .3)); op(s.up, p1 + (t < a("side") - .3 ? ramp(t, SC.cone.t0, SC.cone.t0 + .3) : 0)); tf(s.up, "translate(760 480)");
    op(s.bl, p2); tf(s.bl, "translate(760 480)"); op(s.tl, p3); tf(s.tl, "translate(760 480)");
    op(s.tri, 0);
    const cK = Math.max(ramp(t, a("circle") - .3, a("circle")) * p2, p3 * ramp(t, a("still") - .3, a("still"))), tK = ramp(t, a("triangle") - .3, a("triangle")) * p1;
    op(s.cir, 0); set(s.triS, "d", "M1200 300 L1236 300 L1236 660 L1200 660 Z"); op(s.triS, Math.max(tK, cK) * .9);
    op(s.ins, Math.max(tK, cK)); tf(s.ins, "translate(1500 600)"); op(s.iT, tK); op(s.iC, cK);
    op(s.c0, on(t, a("faces"), a("side") - .3, .2)); popAt(s.c0, 760, 160, t, a("faces"));
    op(s.c1, p1 * ramp(t, a("triangle"), a("triangle") + .2)); popAt(s.c1, 760, 160, t, a("triangle")); op(s.c2, p2 * ramp(t, a("circle"), a("circle") + .2)); popAt(s.c2, 760, 160, t, a("circle"));
    op(s.c3, ramp(t, a("still"), a("still") + .2)); popAt(s.c3, 760, 160, t, a("still")); }; return s; })();

// ---- HAND PUPPETS
S.hands = (() => { const s = scene("hands", "#2b2d42", "#3a0ca3");
  s.ws = wallSet(s.stage, 1200); s.hand = emo(s.stage, 0, 0, 160, "🤲"); s.blob = el("ellipse", {cx: 1218, cy: 470, rx: 40, ry: 150, fill: SHD}, s.stage);
  s.bird = blackEmo(s.stage, "🕊️", 260); s.x = tx(s.stage, {x: 1420, y: 400, "text-anchor": "middle", "font-size": 110, "font-weight": 700, fill: "#e63946", class: "out", "stroke-width": 8}, "✗");
  s.c1 = chip(s.stage, "🤲 shadow puppet secret", "#7209b7", {fs: 36}); s.c2 = chip(s.stage, "↻ TURN your hands so the shape FACES the light", "#06d6a0", {fs: 32});
  s.run = t => { const a = w => C("hands", w); const tn = ramp(t, a("turn") - .2, a("turn") + .5);
    op(s.ws, 1); op(s.hand, 1); set(s.hand, "x", 700); set(s.hand, "y", 480); tf(s.hand, `rotate(${lerp(90, 0, tn)} 700 480)`);
    op(s.blob, ramp(t, a("bird"), a("bird") + .2) * (1 - tn)); op(s.x, on(t, a("wall"), a("turn"), .2));
    op(s.bird, tn * .85); set(s.bird, "x", 1260); set(s.bird, "y", 480);
    op(s.c1, ramp(t, a("puppets"), a("puppets") + .2)); popAt(s.c1, 760, 160, t, a("puppets")); op(s.c2, ramp(t, a("turn"), a("turn") + .2)); popAt(s.c2, 760, 880, t, a("turn")); }; return s; })();

// ---- SUN (length + direction)
S.sun = (() => { const s = scene("sun", "#90e0ef", "#caf0f8");
  s.ground = el("rect", {x: 0, y: 800, width: 1920, height: 280, fill: "#95d5b2"}, s.stage);
  s.sunE = emo(s.stage, 0, 0, 140, "☀️"); s.sh = el("path", {fill: "#000", opacity: .45}, s.stage); s.kid = emo(s.stage, 760, 700, 220, "🧍");
  s.E = chip(s.stage, "EAST ⬅", "#f77f00", {fs: 34}); s.W = chip(s.stage, "➡ WEST", "#3a86ff", {fs: 34});
  s.c1 = chip(s.stage, "Sun LOW ➜ LONG shadow", "#ff9f1c", {fs: 34}); s.c2 = chip(s.stage, "Sun HIGH (noon) ➜ SHORTEST", "#06d6a0", {fs: 34});
  s.c3 = chip(s.stage, "morning: shadow points WEST", "#3a86ff", {fs: 34}); s.c4 = chip(s.stage, "evening: shadow points EAST", "#f77f00", {fs: 34});
  s.run = t => { const a = w => C("sun1", w), b = w => C("sun2", w);
    let u = .1; u = lerp(u, .9, ramp(t, a("afternoon") - .2, a("afternoon") + .6)); u = lerp(u, .1, ramp(t, a("low") - .3, a("low") + .3)); u = lerp(u, .5, ramp(t, a("noon") - .4, a("noon") + .4));
    u = lerp(u, .1, ramp(t, b("morning") - .4, b("morning") + .4)); u = lerp(u, .9, ramp(t, b("evening") - .4, b("evening") + .4));
    const sx = 260 + u * 1000, sy = 760 - Math.sin(u * Math.PI) * 560; set(s.sunE, "x", sx); set(s.sunE, "y", sy); op(s.sunE, 1);
    const L = 40 + 460 * (1 - Math.sin(u * Math.PI)) ** 1.2, d = sx < 760 ? 1 : -1; set(s.sh, "d", `M${760 - 30 * d} 805 L${760 + L * d} 795 L${760 + L * d} 825 L${760 - 30 * d} 818 Z`);
    op(s.E, ramp(t, b("east"), b("east") + .2)); popAt(s.E, 150, 900, t, b("east")); op(s.W, ramp(t, b("west"), b("west") + .2)); popAt(s.W, 1370, 900, t, b("west"));
    op(s.c1, on(t, a("long"), a("noon") - .4, .2)); popAt(s.c1, 760, 160, t, a("long")); op(s.c2, on(t, a("shortest"), b("rises"), .2)); popAt(s.c2, 760, 160, t, a("shortest"));
    op(s.c3, on(t, b("west#2"), b("evening"), .2)); popAt(s.c3, 760, 160, t, b("west#2")); op(s.c4, ramp(t, b("east#2"), b("east#2") + .2)); popAt(s.c4, 760, 160, t, b("east#2")); }; return s; })();

// ---- SUNDIAL
S.sundial = (() => { const s = scene("sundial", "#ffe8d6", "#ddbea9");
  s.plate = el("g", {}, s.stage); el("ellipse", {rx: 360, ry: 150, fill: "#e9c46a", stroke: INK, "stroke-width": 7}, s.plate);
  for (let i = 0; i < 9; i++) { const ang = Math.PI + i / 8 * Math.PI; el("line", {x1: Math.cos(ang) * 260, y1: Math.sin(ang) * 108, x2: Math.cos(ang) * 330, y2: Math.sin(ang) * 137, stroke: INK, "stroke-width": 5}, s.plate); }
  s.shd = el("path", {fill: "#000", opacity: .55}, s.stage); s.gn = el("path", {d: "M760 560 L760 400 L840 560 Z", fill: "#adb5bd", stroke: INK, "stroke-width": 6}, s.stage); s.sunE = emo(s.stage, 0, 0, 110, "☀️");
  s.c1 = chip(s.stage, "⏱️ tells the TIME from where the shadow falls", "#e76f51", {fs: 32}); s.q = chip(s.stage, "🤔 a problem?", "#1b1b3a", {fs: 36});
  s.n = chip(s.stage, "✗ 🌙 at night", "#3a0ca3", {fs: 36}); s.cl = chip(s.stage, "✗ ☁️ on a cloudy day", "#6c757d", {fs: 36});
  s.run = t => { const a = w => C("sundial", w); const ang = Math.PI * (.15 + ((t - SC.sundial.t0) * .07) % .7);
    tf(s.plate, "translate(760 560)"); op(s.plate, 1); set(s.sunE, "x", 760 + Math.cos(ang) * 600); set(s.sunE, "y", 560 - Math.sin(ang) * 400); op(s.sunE, 1 - ramp(t, a("night") - .2, a("night")) * .8);
    const sa = ang + Math.PI; set(s.shd, "d", `M760 560 L${760 + Math.cos(sa) * 300} ${560 - Math.sin(sa) * 125 - 10} L${760 + Math.cos(sa) * 300} ${560 - Math.sin(sa) * 125 + 10} Z`); op(s.shd, 1 - ramp(t, a("night") - .2, a("night")));
    op(s.c1, ramp(t, a("time"), a("time") + .2)); popAt(s.c1, 760, 160, t, a("time")); op(s.q, ramp(t, a("problem"), a("problem") + .2)); popAt(s.q, 760, 260, t, a("problem"));
    op(s.n, ramp(t, a("night"), a("night") + .2)); popAt(s.n, 500, 850, t, a("night")); op(s.cl, ramp(t, a("cloudy"), a("cloudy") + .2)); popAt(s.cl, 1020, 850, t, a("cloudy")); }; return s; })();

// ---- SHADOW ART
S.art = (() => { const s = scene("art", "#10002b", "#3c096c");
  s.wall = el("rect", {x: 1050, y: 120, width: 420, height: 700, fill: "#e9ecef", stroke: INK, "stroke-width": 6}, s.stage);
  s.pile = ["🥫", "🧦", "🍾", "🔧", "📦", "🧸"].map((e, i) => emo(s.stage, 480 + (i % 3) * 90 + (i > 2 ? 40 : 0), 720 - Math.floor(i / 3) * 90, 100, e));
  s.lamp = emo(s.stage, 150, 520, 120, "💡"); s.beam = el("path", {d: "M200 520 L1050 160 L1050 800 Z", fill: "#fff3b0", opacity: .25}, s.stage);
  s.sil = blackEmo(s.stage, "🐈", 380); s.c = chip(s.stage, "🎨 science + art", "#f72585", {fs: 40}); s.c0 = chip(s.stage, "a pile of junk… ➜ a CAT!", "#ffbe0b", {fs: 36});
  s.run = t => { const a = w => C("art", w);
    op(s.wall, 1); s.pile.forEach((p, i) => op(p, ramp(t, a("piles") + i * .1, a("piles") + .2 + i * .1))); op(s.lamp, ramp(t, a("lights"), a("lights") + .2)); op(s.beam, ramp(t, a("lights"), a("lights") + .3) * .3);
    op(s.sil, ramp(t, a("surprising") - .3, a("surprising") + .3) * .85); set(s.sil, "x", 1260); set(s.sil, "y", 520);
    op(s.c0, ramp(t, a("surprising"), a("surprising") + .2)); popAt(s.c0, 640, 200, t, a("surprising")); op(s.c, ramp(t, a("together"), a("together") + .2)); popAt(s.c, 640, 300, t, a("together")); }; return s; })();

// ---- QUIZ
S.quiz = (() => { const s = scene("quiz", "#b5179e", "#560bad");
  s.pause = tx(s.stage, {x: 760, y: 150, "text-anchor": "middle", "font-size": 72, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 12}, "⏸ PAUSE & PREDICT!");
  s.floor = el("rect", {x: 360, y: 770, width: 800, height: 30, rx: 8, fill: "#bc6c25", stroke: INK, "stroke-width": 6}, s.stage); s.lamp = emo(s.stage, 760, 260, 110, "💡");
  s.beam = el("path", {d: "M760 300 L420 770 L1100 770 Z", fill: "#fff3b0", opacity: .3}, s.stage); s.cn = coneUp(s.stage, .8); s.sh = el("ellipse", {cx: 760, cy: 785, rx: 150, ry: 18, fill: SHD}, s.stage);
  s.q = tx(s.stage, {x: 760, y: 870, "text-anchor": "middle", "font-size": 60, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 9}, "🔺 ⚪ 🟥 ?");
  s.ans = chip(s.stage, "⚪ a CIRCLE: the round base blocks light from above", "#06d6a0", {fs: 32});
  s.run = t => { const a = w => C("quiz1", w), b = w => C("quiz2", w);
    op(s.pause, on(t, a("pause"), b("circle"), .2)); tf(s.pause, `translate(760 150) scale(${pop(t, a("pause"))}) translate(-760 -150)`);
    op(s.cn, ramp(t, a("cone"), a("cone") + .2)); tf(s.cn, "translate(760 690) scale(.8)"); op(s.floor, 1); op(s.lamp, ramp(t, a("lamp"), a("lamp") + .2)); op(s.beam, ramp(t, a("lamp"), a("lamp") + .3) * .3);
    op(s.sh, ramp(t, b("circle") - .2, b("circle")) * .85); op(s.q, ramp(t, a("shape"), a("shape") + .2) * (1 - ramp(t, b("circle") - .2, b("circle"))));
    op(s.ans, ramp(t, b("circle"), b("circle") + .2)); popAt(s.ans, 760, 900, t, b("circle")); }; return s; })();

// ---- EXAM
S.exam = (() => { const s = scene("exam", "#14213d", "#1d3557");
  const g = el("g", {transform: "translate(760 450)"}, s.stage);
  el("rect", {x: -670, y: -320, width: 1340, height: 640, rx: 34, fill: "#2b9348", stroke: "#8d5524", "stroke-width": 22, filter: "url(#sh)"}, g);
  tx(g, {x: -610, y: -240, "font-size": 50, "font-weight": 700, fill: "#ffe14d"}, "📝 EXAM CORNER · say it like this:");
  const L = [["🔺 The shape of a shadow depends on the shape of the", "     part of the object that faces the light."], ["☀️ Shadows are longest in the early morning and late", "     afternoon, and shortest near noon."]];
  let y = -140; s.lines = L.map(ls => { const r = el("g", {opacity: 0}, g); ls.forEach((x, i) => tx(r, {x: -610, y: y + i * 54, "font-size": 42, "font-weight": 600, fill: "#fff"}, x)); y += ls.length * 54 + 60; return r; });
  s.run = t => { const a = w => C("exam", w); const k = [a("shape"), a("longest")];
    s.lines.forEach((r, i) => { op(r, ramp(t, k[i] - .15, k[i] + .2)); tf(r, `translate(${(1 - ramp(t, k[i] - .15, k[i] + .3)) * -40} 0)`); }); }; return s; })();

// ---- HABIT (test yourself)
S.habit = (() => { const s = scene("habit", "#06d6a0", "#118ab2");
  s.title = tx(s.stage, {x: 760, y: 180, "text-anchor": "middle", "font-size": 76, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 12}, "🧠 TEST YOURSELF");
  s.st = [["📕 close the book", "close"], ["✏️ explain or draw from MEMORY", "memory"], ["✅ then check", "check"]].map(([n, w], i) => ({c: chip(s.stage, n, ["#e63946", "#7209b7", "#06d6a0"][i], {fs: 38}), w, i}));
  s.c = chip(s.stage, "pulling facts OUT of your brain makes them STICK", "#1b1b3a", {fs: 34});
  s.run = t => { const a = w => C("habit1", w);
    op(s.title, ramp(t, a("test"), a("test") + .2)); tf(s.title, `translate(760 180) scale(${pop(t, a("test"))}) translate(-760 -180)`);
    s.st.forEach(c => { op(c.c, ramp(t, a(c.w), a(c.w) + .2)); popAt(c.c, 760, 340 + c.i * 130, t, a(c.w)); });
    op(s.c, ramp(t, a("stick") - .4, a("stick"))); popAt(s.c, 760, 800, t, a("stick") - .4); }; return s; })();

// ---- MIND MAP
S.mindmap = (() => { const s = scene("mindmap", "#fff3b0", "#ffd6a5");
  for (let i = 0; i < 16; i++) el("line", {x1: 0, y1: 120 + i * 60, x2: 1920, y2: 120 + i * 60, stroke: "#a2d2ff", "stroke-width": 2, opacity: .6}, s.stage);
  const CX = 300, CY2 = 470;
  s.dim = [["🌿 NATURAL", "#06d6a0", 180, 250], ["🏭 MAN-MADE", "#3a86ff", 420, 210], ["👁️ HOW WE SEE", "#f77f00", 200, 740]].map(([n, c, x, y]) => ({l: el("path", {d: `M${CX} ${CY2} L${x} ${y}`, stroke: c, "stroke-width": 12, opacity: .35}, s.stage), c: chip(s.stage, n, c, {fs: 24}), x, y}));
  s.l0 = el("path", {d: `M${CX} ${CY2} L620 470`, stroke: SHD, "stroke-width": 12}, s.stage);
  s.center = el("g", {}, s.stage); el("ellipse", {rx: 130, ry: 62, fill: "#ffbe0b", stroke: INK, "stroke-width": 7}, s.center); tx(s.center, {x: 0, y: 15, "text-anchor": "middle", "font-size": 42, "font-weight": 700, fill: INK}, "💡 LIGHT");
  s.sh = chip(s.stage, "👤 SHADOWS", SHD, {fs: 34}); s.sz = chip(s.stage, "📏 size", "#7209b7", {fs: 26});
  s.lA = el("path", {d: "M680 470 Q760 300 900 300", stroke: "#f77f00", "stroke-width": 9, fill: "none", "stroke-dasharray": 400}, s.stage); s.lB = el("path", {d: "M680 470 Q760 650 900 650", stroke: "#3a86ff", "stroke-width": 9, fill: "none", "stroke-dasharray": 400}, s.stage);
  s.shp = chip(s.stage, "🔺 SHADOW SHAPE", "#f77f00", {fs: 32}); s.out = chip(s.stage, "☀️ OUTDOOR SHADOWS", "#3a86ff", {fs: 32});
  s.subs = [["depends on the part FACING the light", "facing", 900, 370], ["LONGEST: morning + evening", "longest", 900, 720], ["SHORTEST: noon", "shortest", 900, 790]].map(([n, w, x, y]) => ({c: chip(s.stage, n, "#fff", {fs: 26, ink: INK}), w, x, y}));
  s.ult = chip(s.stage, "🚀 TheOneApp · the ultimate science app", "#7209b7", {fs: 30});
  s.phone = el("g", {}, s.stage); el("rect", {x: -130, y: -240, width: 260, height: 480, rx: 40, fill: INK}, s.phone); el("rect", {x: -112, y: -205, width: 224, height: 410, rx: 20, fill: "#fff"}, s.phone);
  tx(s.phone, {x: 0, y: -168, "text-anchor": "middle", "font-size": 32, "font-weight": 700, fill: "#7209b7"}, "TheOneApp"); tx(s.phone, {x: 0, y: -138, "text-anchor": "middle", "font-size": 17, "font-weight": 600, fill: "#6c757d"}, "the ultimate science app");
  const cp = el("clipPath", {id: "scr17"}, $("v").querySelector("defs")); el("rect", {x: -112, y: -122, width: 224, height: 327, rx: 4}, cp);
  const IH = 224 * 2000 / 780; s.scr = el("g", {"clip-path": "url(#scr17)"}, s.phone); s.shot = el("image", {href: "oneapp_mind2.png", x: -112, y: -122, width: 224, height: IH, preserveAspectRatio: "xMidYMin slice"}, s.scr);
  s.ring = el("rect", {fill: "none", stroke: "#f72585", "stroke-width": 5, rx: 13}, s.scr);
  s.run = t => { const a = w => C("habit2", w);
    op(s.center, ramp(t, a("light"), a("light") + .2)); tf(s.center, `translate(${CX} ${CY2}) scale(${pop(t, a("light"))})`);
    s.dim.forEach(d => { op(d.l, ramp(t, a("light") + .3, a("light") + .5) * .35); op(d.c, ramp(t, a("light") + .3, a("light") + .5) * .5); popAt(d.c, d.x, d.y, t, a("light") + .3); });
    op(s.l0, ramp(t, a("shadows") - .2, a("shadows"))); op(s.sh, ramp(t, a("shadows"), a("shadows") + .2)); popAt(s.sh, 660, 470, t, a("shadows"));
    op(s.sz, ramp(t, a("shadows") + .3, a("shadows") + .5) * .5); popAt(s.sz, 660, 540, t, a("shadows") + .3);
    set(s.lA, "stroke-dashoffset", 400 * (1 - ramp(t, a("shape") - .2, a("shape") + .3))); op(s.lA, t > a("shape") - .2 ? 1 : 0); op(s.shp, ramp(t, a("shape"), a("shape") + .2)); popAt(s.shp, 960, 300, t, a("shape"));
    set(s.lB, "stroke-dashoffset", 400 * (1 - ramp(t, a("outdoor") - .2, a("outdoor") + .3))); op(s.lB, t > a("outdoor") - .2 ? 1 : 0); op(s.out, ramp(t, a("outdoor"), a("outdoor") + .2)); popAt(s.out, 980, 650, t, a("outdoor"));
    s.subs.forEach(c => { const tt = a(c.w); op(c.c, ramp(t, tt, tt + .2)); popAt(c.c, c.x, c.y, t, tt); });
    op(s.ult, on(t, a("ultimate"), SC.mindmap.t1 + .5, .2)); popAt(s.ult, 640, 130, t, a("ultimate"));
    const ph = ramp(t, a("save"), a("save") + .6); op(s.phone, ph); tf(s.phone, `translate(${lerp(1650, 1400, ph)} 520) rotate(${lerp(12, -4, ph)})`);
    const nx = a("ultimate") + .6; const off = -122 - (IH - 327) * ramp(t, a("save"), nx); set(s.shot, "y", off); const sc = IH / 2000;
    set(s.ring, "x", -112 + 36 * sc); set(s.ring, "y", off + 1722 * sc); set(s.ring, "width", 156 * sc); set(s.ring, "height", 72 * sc);
    op(s.ring, on(t, nx, SC.mindmap.t1 + .5, .15) * (.6 + .4 * Math.sin(t * 8))); }; return s; })();

// ---- CLOSE
S.close = (() => { const s = scene("close", "#ffd166", "#f15bb5");
  s.ans = el("g", {}, s.stage); el("rect", {x: -420, y: -70, width: 840, height: 140, rx: 70, fill: "#06d6a0", stroke: INK, "stroke-width": 7}, s.ans); tx(s.ans, {x: 0, y: 22, "text-anchor": "middle", "font-size": 52, "font-weight": 700, fill: "#fff"}, "✓ YES: with its base to the light!");
  s.p = [["🌅 morning", "morning", .15], ["🕛 noon", "noon", .5], ["🌇 afternoon", "afternoon", .85]].map(([n, w, u], i) => { const g = el("g", {}, s.stage); el("rect", {x: -200, y: -170, width: 400, height: 340, rx: 26, fill: "#fff", stroke: INK, "stroke-width": 6}, g);
    el("rect", {x: -200, y: 80, width: 400, height: 90, rx: 0, fill: "#95d5b2"}, g); emo(g, -150 + u * 300, -110 + (1 - Math.sin(u * Math.PI)) * 120, 60, "☀️"); emo(g, 0, 40, 100, "🧍");
    const L = 30 + 140 * (1 - Math.sin(u * Math.PI)), d = u < .5 ? 1 : -1; el("path", {d: `M${-10 * d} 85 L${L * d} 80 L${L * d} 96 L${-10 * d} 92 Z`, fill: "#000", opacity: .5}, g);
    tx(g, {x: 0, y: 150, "text-anchor": "middle", "font-size": 32, "font-weight": 700, fill: INK}, n); return {g, w, i}; });
  s.c = chip(s.stage, "👩 with an adult", "#1b1b3a", {fs: 34});
  s.run = t => { const a = w => C("close", w); const tn = ramp(t, a("your") - .2, a("your") + .1);
    op(s.ans, ramp(t, a("yes"), a("yes") + .15) * (1 - tn)); tf(s.ans, `translate(760 420) scale(${pop(t, a("yes"))})`);
    s.p.forEach(p => { const tt = a("look") + p.i * .25; op(p.g, ramp(t, tt, tt + .2)); tf(p.g, `translate(${340 + p.i * 440} 460) scale(${pop(t, tt)})`); });
    op(s.c, ramp(t, a("adult"), a("adult") + .2)); popAt(s.c, 760, 790, t, a("adult")); }; return s; })();

// ---- END CARD
S.end = (() => { const s = scene("end", "#3a0ca3", "#7209b7");
  tx(s.stage, {x: 960, y: 360, "text-anchor": "middle", "font-size": 44, "font-weight": 700, fill: "#ffe14d", "letter-spacing": 6}, "NEXT: HEAT 🔥");
  tx(s.stage, {x: 960, y: 480, "text-anchor": "middle", "font-size": 84, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 10}, "Your touch is lying to you:");
  tx(s.stage, {x: 960, y: 580, "text-anchor": "middle", "font-size": 84, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 10}, "temperature 🌡️");
  s.run = () => {}; return s; })();

