/* =================== SCENES (Episode 3: parts of a leaf) =================== */
const S = {};
const hex = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
const mix = (h1, h2, k) => { const a = hex(h1), b = hex(h2); return "rgb(" + a.map((v, i) => Math.round(lerp(v, b[i], clamp(k)))).join(",") + ")"; };
const leafD = (W, H) => `M0 0 Q${W * .3} ${-H} ${W} 0 Q${W * .3} ${H} 0 0 Z`;
function bigLeaf(p, W, H, opt = {}) {
  const g = el("g", {}, p), K = {g};
  K.stalk = el("path", {d: `M${-(opt.stalk || 140)} 0 L4 0`, stroke: "#6a994e", "stroke-width": 18, "stroke-linecap": "round"}, g);
  K.edgeGlow = el("path", {d: leafD(W, H), fill: "none", stroke: "#ffe14d", "stroke-width": 26, opacity: 0, "stroke-linejoin": "round"}, g);
  K.blade = el("path", {d: leafD(W, H), fill: opt.fill || "#2dc653", stroke: INK, "stroke-width": 7}, g);
  K.small = el("g", {stroke: opt.vein || "#b7efc5", "stroke-width": 6, fill: "none", "stroke-linecap": "round"}, g); K.smallL = [];
  for (let i = 1; i <= 6; i++) { const x = W * i / 7.5, h = H * Math.sin(Math.PI * x / W) * .62;
    [-1, 1].forEach(sd => { const l = el("path", {d: `M${x} 0 Q${x + 40} ${sd * h * .5} ${x + 85} ${sd * h}`, "stroke-dasharray": 200, "stroke-dashoffset": 200}, K.small); K.smallL.push(l); }); }
  K.mainGlow = el("path", {d: `M4 0 L${W * .96} 0`, stroke: "#ffe14d", "stroke-width": 24, opacity: 0, "stroke-linecap": "round"}, g);
  K.main = el("path", {d: `M4 0 L${W * .96} 0`, stroke: opt.vein || "#d8f3dc", "stroke-width": 11, "stroke-linecap": "round"}, g);
  K.stalkGlow = el("path", {d: `M${-(opt.stalk || 140)} 0 L4 0`, stroke: "#ffe14d", "stroke-width": 36, opacity: 0, "stroke-linecap": "round"}, g);
  g.insertBefore(K.stalkGlow, K.stalk);
  return K;
}
function parallelLeaf(p, L, Wd, col = "#52b788") { const g = el("g", {}, p);
  el("path", {d: `M0 0 Q${Wd} ${-L * .5} 0 ${-L} Q${-Wd} ${-L * .5} 0 0 Z`, fill: col, stroke: INK, "stroke-width": 6}, g);
  const lines = [-.6, -.3, 0, .3, .6].map(k => el("path", {d: `M${k * Wd * .3} -6 Q${k * Wd * .75} ${-L * .5} 0 ${-L + 10}`, stroke: "#d8f3dc", "stroke-width": 5, fill: "none", "stroke-dasharray": L * 1.2, "stroke-dashoffset": L * 1.2}, g));
  return {g, lines}; }
let NETID = 0;
function netLeaf(p, R, col = "#2dc653") { const g = el("g", {}, p);
  const shape = `M0 ${R} Q${R * 1.1} ${R * .3} ${R * .2} ${-R} Q0 ${-R * 1.1} ${-R * .2} ${-R} Q${-R * 1.1} ${R * .3} 0 ${R} Z`;
  el("path", {d: shape, fill: col}, g);
  const id = "netclip" + (NETID++); const cp = el("clipPath", {id}, $("v").querySelector("defs")); el("path", {d: shape}, cp);
  const vg = el("g", {"clip-path": `url(#${id})`}, g);
  el("path", {d: shape, fill: "none", stroke: INK, "stroke-width": 6}, g);
  const lines = []; const add = d => lines.push(el("path", {d, stroke: "#d8f3dc", "stroke-width": 5, fill: "none", "stroke-dasharray": 400, "stroke-dashoffset": 400}, vg));
  add(`M0 ${R} L0 ${-R * .9}`); for (let i = 0; i < 4; i++) { const y = R * .6 - i * R * .45; add(`M0 ${y} Q${R * .3} ${y - 30} ${R * .6} ${y - 70}`); add(`M0 ${y} Q${-R * .3} ${y - 30} ${-R * .6} ${y - 70}`);
    add(`M${R * .3} ${y - 22} l${R * .15} ${30}`); add(`M${-R * .3} ${y - 22} l${-R * .15} ${30}`); }
  return {g, lines}; }
const drawOn = (lines, k) => lines.forEach((l, i) => { const L = +l.getAttribute("stroke-dasharray"); const kk = clamp(k * lines.length - i * .6); set(l, "stroke-dashoffset", L * (1 - kk)); });

// ---- HOOK
S.hook = (() => { const s = scene("hook", "#80ed99", "#38a3a5");
  s.L = bigLeaf(s.stage, 640, 230); s.qs = [[0, -20], [280, 0], [-90, 0], [380, -110]].map(() => tx(s.stage, {"font-size": 80, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 9, "text-anchor": "middle"}, "?"));
  s.four = el("g", {}, s.stage); el("circle", {r: 88, fill: "#ffbe0b", stroke: INK, "stroke-width": 7}, s.four); tx(s.four, {x: 0, y: 44, "text-anchor": "middle", "font-size": 124, "font-weight": 700, fill: INK}, "4");
  s.mark = chip(s.stage, "✗ −1 mark", "#e63946", {fs: 44});
  s.run = t => { const a = w => C("hook", w);
    tf(s.L.g, `translate(${480} 470) rotate(${-8 + Math.sin(t * 1.5) * 2}) scale(${pop(t, .3)})`);
    const pos = [[640, 470], [960, 420], [380, 500], [1060, 330]];
    s.qs.forEach((q, i) => { set(q, "x", pos[i][0]); set(q, "y", pos[i][1] + Math.sin(t * 5 + i) * 14); op(q, ramp(t, a("four") + i * .15, a("four") + .2 + i * .15)); });
    popAt(s.four, 1250, 230, t, a("four")); op(s.four, ramp(t, a("four"), a("four") + .2));
    op(s.mark, on(t, a("lose"), a("grab"), .2)); popAt(s.mark, 760, 720, t, a("lose")); }; return s; })();

// ---- LEAF PARTS
S.leaf = (() => { const s = scene("leaf", "#caffbf", "#9bf6ff");
  s.L = bigLeaf(s.stage, 900, 300, {stalk: 160});
  s.lines = el("g", {stroke: INK, "stroke-width": 4, "stroke-dasharray": "8 6"}, s.stage); s.ln = {}; ["blade", "stalk", "main", "small"].forEach(k => s.ln[k] = el("line", {opacity: 0}, s.lines));
  s.lab = {blade: chip(s.stage, "LEAF BLADE", "#2dc653", {fs: 38}), stalk: chip(s.stage, "LEAF STALK", "#a0522d", {fs: 38}), main: chip(s.stage, "MAIN VEIN", "#3a86ff", {fs: 38}), small: chip(s.stage, "SMALLER VEINS", "#00b4d8", {fs: 38})};
  s.shape = chip(s.stage, "edge = leaf's shape ✏️", "#ffbe0b", {fs: 32, ink: INK});
  s.mini = [160, 30].map((st, i) => { const g = el("g", {}, s.stage); const k = bigLeaf(g, 200, 70, {stalk: st}); return {g, i, lbl: tx(g, {x: 80, y: 110, "text-anchor": "middle", "font-size": 30, "font-weight": 700, fill: INK}, i ? "short stalk" : "long stalk")}; });
  s.join = el("circle", {r: 30, fill: "none", stroke: "#e63946", "stroke-width": 7, opacity: 0}, s.stage);
  s.badge = el("g", {}, s.stage); el("circle", {r: 70, fill: "#ffbe0b", stroke: INK, "stroke-width": 6}, s.badge); tx(s.badge, {x: 0, y: 34, "text-anchor": "middle", "font-size": 96, "font-weight": 700, fill: INK}, "4");
  s.run = t => { const a = w => C("parts1", w), b = w => C("parts2", w), c = w => C("parts3", w);
    const X = 330, Y = 430; const sm = on(t, b("some"), b("now"), .3);
    tf(s.L.g, `translate(${X} ${Y - sm * 90}) scale(${1 - sm * .25})`);
    op(s.L.edgeGlow, .9 * on(t, a("edge"), a("shape") + 1.2, .2)); set(s.L.edgeGlow, "stroke-dasharray", "2600"); set(s.L.edgeGlow, "stroke-dashoffset", 2600 * (1 - ramp(t, a("edge"), a("shape"))));
    op(s.L.stalkGlow, .9 * on(t, b("stalk"), b("some"), .2)); op(s.L.mainGlow, .9 * on(t, b("main"), b("joined") + 1, .2));
    drawOn(s.L.smallL, ramp(t, c("smaller") - .3, c("veins") + 1));
    const P = {blade: [X + 420, Y - 80, 1150, 230, a("blade")], stalk: [X - 90, Y, 300, 680, b("stalk")], main: [X + 600, Y, 1150, 650, b("main")], small: [X + 380, Y + 90, 760, 760, c("smaller")]};
    for (const k in P) { const [ax, ay, cx, cy, tt] = P[k]; op(s.lab[k], ramp(t, tt, tt + .2) * (1 - sm)); popAt(s.lab[k], cx, cy, t, tt);
      set(s.ln[k], "x1", cx); set(s.ln[k], "y1", cy); set(s.ln[k], "x2", ax); set(s.ln[k], "y2", ay - sm * 90); op(s.ln[k], ramp(t, tt + .1, tt + .3) * (1 - sm)); }
    op(s.shape, on(t, a("shape"), b("stalk"), .2)); popAt(s.shape, 760, 160, t, a("shape"));
    s.mini.forEach(m => { const tt = m.i ? b("short") : b("long"); op(m.g, on(t, tt, b("now"), .2)); tf(m.g, `translate(${m.i ? 950 : 360} ${560}) scale(${1.7 * pop(t, tt)})`); });
    set(s.join, "cx", X); set(s.join, "cy", Y); op(s.join, on(t, b("joined"), b("joined") + 1.5, .2));
    const f = c("four"); op(s.badge, on(t, f, SC.leaf.t1 + .5, .2)); popAt(s.badge, 1300, 420, t, f);
    if (t > f) Object.values(s.lab).forEach((e, i) => tf(e, e.getAttribute("transform") + ` scale(${1 + .06 * Math.sin(t * 8 + i)})`)); }; return s; })();

// ---- VEINS
S.veins = (() => { const s = scene("veins", "#a2d2ff", "#cdb4db");
  s.par = parallelLeaf(s.stage, 520, 120); s.net = netLeaf(s.stage, 250);
  s.t1 = tx(s.stage, {x: 420, y: 790 - 60, "text-anchor": "middle", "font-size": 56, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 10}, "PARALLEL");
  s.t2 = tx(s.stage, {x: 1110, y: 790 - 60, "text-anchor": "middle", "font-size": 56, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 10}, "NET");
  s.c = {grass: chip(s.stage, "🌾 grass", "#6a994e", {fs: 30}), pandan: chip(s.stage, "🇸🇬 pandan", "#2d6a4f", {fs: 30}), hibiscus: chip(s.stage, "🌺 hibiscus", "#e63946", {fs: 30}), maple: chip(s.stage, "🍁 maple 🇺🇸", "#ff7b00", {fs: 30})};
  s.netIcon = emo(s.stage, 1110, 160, 110, "🥅");
  s.run = t => { const a = w => C("veins1", w), b = w => C("veins2", w);
    op(s.par.g, ramp(t, SC.veins.t0 - .3, SC.veins.t0)); tf(s.par.g, `translate(420 640) rotate(${Math.sin(t) * 3})`);
    drawOn(s.par.lines, ramp(t, a("straight") - .4, a("parallel") + .3)); op(s.t1, ramp(t, a("parallel"), a("parallel") + .2));
    op(s.net.g, ramp(t, b("other") - .2, b("other") + .1)); tf(s.net.g, `translate(1110 400) scale(${pop(t, b("other") - .2)}) rotate(${Math.sin(t * 1.2) * 3})`);
    drawOn(s.net.lines, ramp(t, b("branch"), b("net") + .3)); op(s.t2, ramp(t, b("net"), b("net") + .2));
    op(s.netIcon, on(t, b("fishing"), b("call") + .5, .2)); popAt(s.netIcon, 1110, 140, t, b("fishing"));
    [["grass", a("grass"), 240, 200], ["pandan", a("pandan"), 600, 200], ["hibiscus", b("hibiscus"), 840, 760 - 60], ["maple", b("maple"), 1370, 760 - 60]].forEach(([k, tt, x, y]) => { op(s.c[k], ramp(t, tt, tt + .2)); popAt(s.c[k], x, y, t, tt); }); }; return s; })();

// ---- QUIZ
S.quiz = (() => { const s = scene("quiz", "#b5179e", "#560bad");
  s.pause = tx(s.stage, {x: 760, y: 190, "text-anchor": "middle", "font-size": 72, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 12}, "⏸ PAUSE & PREDICT!");
  s.cards = [0, 1, 2].map(i => { const g = el("g", {}, s.stage); el("rect", {x: -170, y: -220, width: 340, height: 440, rx: 30, fill: "#fff", stroke: INK, "stroke-width": 7, filter: "url(#sh)"}, g);
    el("circle", {cx: -120, cy: -170, r: 30, fill: "#7209b7"}, g); tx(g, {x: -120, y: -159, "text-anchor": "middle", "font-size": 34, "font-weight": 700, fill: "#fff"}, "ABC"[i]);
    let lf; if (i === 0) { lf = parallelLeaf(g, 330, 70, "#74c69d"); tf(lf.g, "translate(0 170)"); drawOn(lf.lines, 1); } else { lf = netLeaf(g, i === 1 ? 140 : 120, i === 1 ? "#2dc653" : "#40916c"); tf(lf.g, i === 2 ? "translate(0 -10) scale(1.1 .95)" : "translate(0 0)"); drawOn(lf.lines, 1); }
    const ans = chip(g, i === 0 ? "PARALLEL" : "NET", i === 0 ? "#ff9f1c" : "#7b61ff", {fs: 36}); tf(ans, "translate(0 260)"); return {g, ans, i}; });
  s.ring = el("g", {}, s.stage); el("circle", {r: 62, fill: "#ffbe0b", stroke: INK, "stroke-width": 6}, s.ring); s.rt = tx(s.ring, {x: 0, y: 22, "text-anchor": "middle", "font-size": 60, "font-weight": 700, fill: INK}, "3");
  s.run = t => { const a = w => C("quiz1", w), b = w => C("quiz2", w);
    op(s.pause, on(t, a("pause"), b("leaf"), .2)); tf(s.pause, `translate(760 190) scale(${pop(t, a("pause"))}) translate(-760 -190)`);
    s.cards.forEach(c => { const tt = a("look") + c.i * .2; op(c.g, ramp(t, tt, tt + .2)); tf(c.g, `translate(${330 + c.i * 430} 470) scale(${pop(t, tt)})`);
      const rv = c.i === 0 ? b("parallel") : b("net"); op(c.ans, ramp(t, rv, rv + .2)); });
    const ct = clamp((t - a("veins")) / 3); op(s.ring, on(t, a("veins"), b("leaf"), .2)); tf(s.ring, "translate(1320 190)"); s.rt.textContent = Math.max(1, 3 - Math.floor(ct * 3)); }; return s; })();

// ---- DIVERSITY
S.diverse = (() => { const s = scene("diverse", "#ffd166", "#ff9f1c");
  const card = (title, col) => { const g = el("g", {}, s.stage); el("rect", {x: -310, y: -160, width: 620, height: 320, rx: 30, fill: "#fff", stroke: INK, "stroke-width": 6, filter: "url(#sh)"}, g);
    el("rect", {x: -310, y: -160, width: 620, height: 64, rx: 30, fill: col}, g); el("rect", {x: -310, y: -126, width: 620, height: 30, fill: col}, g);
    tx(g, {x: 0, y: -114, "text-anchor": "middle", "font-size": 38, "font-weight": 700, fill: "#fff"}, title); return g; };
  s.edge = card("EDGE", "#2dc653"); { const l = el("g", {transform: "translate(-150 40)"}, s.edge); el("path", {d: leafD(220, 80), fill: "#52b788", stroke: INK, "stroke-width": 5, transform: "translate(-110 0)"}, l); tx(l, {x: 0, y: 110, "text-anchor": "middle", "font-size": 28, "font-weight": 600, fill: INK}, "smooth");
    let d = "M-110 0"; for (let i = 0; i <= 12; i++) { const x = -110 + i * 220 / 12, y = -Math.sin(Math.PI * i / 12) * 80; d += ` L${x} ${y + (i % 2 ? -14 : 0)}`; } for (let i = 12; i >= 0; i--) { const x = -110 + i * 220 / 12, y = Math.sin(Math.PI * i / 12) * 80; d += ` L${x} ${y + (i % 2 ? 14 : 0)}`; }
    const r = el("g", {transform: "translate(150 40)"}, s.edge); el("path", {d: d + " Z", fill: "#52b788", stroke: INK, "stroke-width": 5}, r); tx(r, {x: 0, y: 110, "text-anchor": "middle", "font-size": 28, "font-weight": 600, fill: INK}, "jagged"); }
  s.shape = card("SHAPE", "#3a86ff"); { el("ellipse", {cx: -150, cy: 30, rx: 120, ry: 70, fill: "#52b788", stroke: INK, "stroke-width": 5}, s.shape); tx(s.shape, {x: -150, y: 150, "text-anchor": "middle", "font-size": 28, "font-weight": 600, fill: INK}, "oval");
    el("circle", {cx: 150, cy: 30, r: 85, fill: "#52b788", stroke: INK, "stroke-width": 5}, s.shape); tx(s.shape, {x: 150, y: 150, "text-anchor": "middle", "font-size": 28, "font-weight": 600, fill: INK}, "round"); }
  s.colour = card("COLOUR", "#9d4edd"); [["#2dc653", "green"], ["#7b2cbf", "purple"], ["#d00000", "red"]].forEach(([c, n], i) => { el("path", {d: leafD(150, 60), fill: c, stroke: INK, "stroke-width": 5, transform: `translate(${-260 + i * 190} 30)`}, s.colour); tx(s.colour, {x: -185 + i * 190, y: 140, "text-anchor": "middle", "font-size": 28, "font-weight": 600, fill: INK}, n); });
  s.tex = card("TEXTURE", "#ef476f"); { el("path", {d: leafD(220, 80), fill: "#2d6a4f", stroke: INK, "stroke-width": 5, transform: "translate(-260 30)"}, s.tex); el("path", {d: "M-230 10 Q-170 -30 -100 0", stroke: "#fff", "stroke-width": 10, fill: "none", opacity: .8, "stroke-linecap": "round"}, s.tex); emo(s.tex, -60, -40, 50, "✨");
    tx(s.tex, {x: -150, y: 150, "text-anchor": "middle", "font-size": 28, "font-weight": 600, fill: INK}, "waxy & shiny");
    el("path", {d: leafD(220, 80), fill: "#95d5b2", stroke: INK, "stroke-width": 5, transform: "translate(40 30)"}, s.tex); for (let i = 0; i < 40; i++) { const x = 40 + (i % 20) * 11, sd = i < 20 ? -1 : 1, y = sd * Math.sin(Math.PI * (x - 40) / 220) * 80 * .6 + 30; el("line", {x1: x, y1: y, x2: x + 4, y2: y + sd * 16, stroke: "#1b4332", "stroke-width": 3}, s.tex); }
    tx(s.tex, {x: 150, y: 150, "text-anchor": "middle", "font-size": 28, "font-weight": 600, fill: INK}, "soft & hairy"); }
  s.surv = chip(s.stage, "🌍 differences help each plant SURVIVE", "#06d6a0", {fs: 36});
  s.run = t => { const a = w => C("diverse1", w), b = w => C("diverse2", w);
    const G = [[s.edge, 420, 300, a("edge")], [s.shape, 1080, 300, a("shape")], [s.colour, 420, 650, b("green")], [s.tex, 1080, 650, b("texture")]];
    const sv = on(t, b("survive"), SC.diverse.t1 + .5, .2);
    G.forEach(([g, x, y, tt], i) => { op(g, ramp(t, tt, tt + .2)); tf(g, `translate(${x} ${y}) scale(${pop(t, tt) * (1 + .03 * sv * Math.sin(t * 6 + i))})`); });
    op(s.surv, sv); popAt(s.surv, 760, 140, t, b("survive")); }; return s; })();

// ---- ASK QUESTIONS
S.ask = (() => { const s = scene("ask", "#4361ee", "#4cc9f0");
  s.chain = [["👀", "OBSERVE", "observe"], ["❓", "ASK", "ask"], ["🔬", "INVESTIGATE", "investigation"]].map(([e, n, w], i) => { const g = el("g", {}, s.stage); el("circle", {r: 105, fill: "#fff", stroke: INK, "stroke-width": 7, filter: "url(#sh)"}, g); emo(g, 0, -10, 100, e);
    tx(g, {x: 0, y: 150, "text-anchor": "middle", "font-size": 40, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 8}, n); return {g, w, x: 330 + i * 430}; });
  s.arrows = [0, 1].map(i => tx(s.stage, {x: 545 + i * 430, y: 300, "text-anchor": "middle", "font-size": 90, "font-weight": 700, fill: "#ffe14d", class: "out", "stroke-width": 8}, "➜"));
  s.q1 = chip(s.stage, "Why is this leaf hairy? 🤔", "#ef476f", {fs: 36}); s.q2 = chip(s.stage, "Why do these veins run in straight lines? 🤔", "#ff9f1c", {fs: 34});
  s.run = t => { const a = w => C("ask", w);
    s.chain.forEach((c, i) => { const tt = a(c.w); op(c.g, ramp(t, tt, tt + .2)); popAt(c.g, c.x, 280, t, tt); });
    s.arrows.forEach((ar, i) => op(ar, ramp(t, a(["questions", "investigation"][i]) - .2, a(["questions", "investigation"][i]))));
    op(s.q1, ramp(t, a("hairy") - .5, a("hairy"))); popAt(s.q1, 600, 600, t, a("hairy") - .5);
    op(s.q2, ramp(t, a("straight") - .6, a("straight") - .1)); popAt(s.q2, 820, 700, t, a("straight") - .6); }; return s; })();

// ---- EXAM
S.exam = (() => { const s = scene("exam", "#14213d", "#1d3557");
  const g = el("g", {transform: "translate(760 450)"}, s.stage);
  el("rect", {x: -670, y: -320, width: 1340, height: 640, rx: 34, fill: "#2b9348", stroke: "#8d5524", "stroke-width": 22, filter: "url(#sh)"}, g);
  tx(g, {x: -610, y: -240, "font-size": 50, "font-weight": 700, fill: "#ffe14d"}, "📝 EXAM CORNER · label it like this:");
  const lf = bigLeaf(g, 420, 140, {stalk: 90, fill: "#40916c"}); tf(lf.g, "translate(-560 30)"); drawOn(lf.smallL, 1);
  s.lbl = ["① Leaf blade", "② Leaf stalk", "③ Main vein", "④ Smaller veins"].map((L, i) => tx(g, {x: 30, y: -130 + i * 70, "font-size": 44, "font-weight": 700, fill: "#fff", opacity: 0}, L));
  s.vein = tx(g, {x: -610, y: 260, "font-size": 40, "font-weight": 600, fill: "#ffe14d", opacity: 0}, "Veins can be PARALLEL or arranged like a NET.");
  s.run = t => { const a = w => C("exam", w); const k = [a("blade"), a("stalk"), a("main"), a("smaller")];
    s.lbl.forEach((l, i) => op(l, ramp(t, k[i] - .1, k[i] + .2))); op(s.vein, ramp(t, a("remember"), a("remember") + .3)); }; return s; })();

// ---- HABIT (two-minute rule)
S.habit = (() => { const s = scene("habit", "#06d6a0", "#118ab2");
  s.title = tx(s.stage, {x: 760, y: 180, "text-anchor": "middle", "font-size": 80, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 12}, "⏱ THE TWO-MINUTE RULE");
  s.timer = el("g", {}, s.stage); el("circle", {r: 110, fill: "#fff", stroke: INK, "stroke-width": 8}, s.timer); s.tt = tx(s.timer, {x: 0, y: 26, "text-anchor": "middle", "font-size": 72, "font-weight": 700, fill: INK}, "2:00");
  s.arc = el("circle", {r: 92, fill: "none", stroke: "#ef476f", "stroke-width": 16, "stroke-dasharray": "578 578", transform: "rotate(-90)"}, s.timer);
  s.paper = el("g", {}, s.stage); el("rect", {x: -330, y: -220, width: 660, height: 440, rx: 12, fill: "#fff", stroke: INK, "stroke-width": 6, filter: "url(#sh)"}, s.paper);
  s.sketch = el("path", {d: leafD(380, 130), transform: "translate(-200 0)", fill: "none", stroke: "#2d6a4f", "stroke-width": 6, "stroke-dasharray": 1400, "stroke-dashoffset": 1400}, s.paper);
  s.sk2 = el("path", {d: "M-280 0 L-200 0 M-200 0 L160 0", stroke: "#2d6a4f", "stroke-width": 6, "stroke-dasharray": 500, "stroke-dashoffset": 500}, s.paper);
  s.sl = ["blade", "stalk", "main vein", "smaller veins"].map((n, i) => tx(s.paper, {x: [40, -300, 80, -120][i], y: [-120, 50, 40, 150][i], "font-size": 28, "font-weight": 700, fill: "#ef476f", opacity: 0}, n));
  s.leaf = emo(s.stage, 0, 0, 120, "🍂");
  s.run = t => { const a = w => C("habit1", w);
    op(s.title, ramp(t, SC.habit.t0 - .2, SC.habit.t0 + .1)); tf(s.title, `translate(760 180) scale(${pop(t, SC.habit.t0 - .2)}) translate(-760 -180)`);
    const fl = ramp(t, a("fallen") - .5, a("fallen") + .6); op(s.leaf, on(t, a("pick") - .3, a("drawing") , .2)); set(s.leaf, "x", 760 + Math.sin(t * 3) * 60); set(s.leaf, "y", lerp(260, 520, fl));
    op(s.paper, ramp(t, a("drawing") - .3, a("drawing"))); tf(s.paper, "translate(640 540)");
    const dr = ramp(t, a("drawing"), a("labelling")); set(s.sketch, "stroke-dashoffset", 1400 * (1 - dr)); set(s.sk2, "stroke-dashoffset", 500 * (1 - dr));
    s.sl.forEach((l, i) => op(l, ramp(t, a("labelling") + i * .3, a("labelling") + .2 + i * .3)));
    op(s.timer, ramp(t, a("spend") - .2, a("spend"))); tf(s.timer, `translate(1220 470) scale(${pop(t, a("spend") - .2)})`);
    const k = ramp(t, a("spend"), SC.habit.t1 + .3); set(s.arc, "stroke-dashoffset", 578 * k); const sec = Math.round(120 * (1 - k)); s.tt.textContent = `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, "0")}`; }; return s; })();

// ---- MIND MAP
S.mindmap = (() => { const s = scene("mindmap", "#fff3b0", "#ffd6a5");
  for (let i = 0; i < 16; i++) el("line", {x1: 0, y1: 120 + i * 60, x2: 1920, y2: 120 + i * 60, stroke: "#a2d2ff", "stroke-width": 2, opacity: .6}, s.stage);
  s.center = el("g", {}, s.stage); el("ellipse", {rx: 130, ry: 76, fill: "#2dc653", stroke: INK, "stroke-width": 7}, s.center); tx(s.center, {x: 0, y: 18, "text-anchor": "middle", "font-size": 52, "font-weight": 700, fill: "#fff"}, "🍃 LEAF");
  const br = [["parts", "4 PARTS", "#3a86ff", 430, 330, ["blade", "stalk", "main vein", "smaller veins"]], ["vein", "2 VEIN PATTERNS", "#ff9f1c", 330, 700, ["parallel", "net"]], ["different", "DIFFERENCES", "#ef476f", 1010, 700, ["edge", "shape", "colour", "texture"]]];
  s.br = br.map(([k, n, col, x, y, subs]) => { const line = el("path", {d: `M720 480 Q${(720 + x) / 2} ${y} ${x} ${y}`, stroke: col, "stroke-width": 12, fill: "none", "stroke-linecap": "round", "stroke-dasharray": 700}, s.stage);
    return {k, line, c: chip(s.stage, n, col, {fs: 34}), x, y, tw: subs.map(sn => chip(s.stage, sn, "#fff", {fs: 24, ink: INK}))}; });
  s.stage.appendChild(s.center);
  s.ult = chip(s.stage, "🚀 TheOneApp · the ultimate science app", "#7209b7", {fs: 30});
  s.phone = el("g", {}, s.stage); el("rect", {x: -130, y: -240, width: 260, height: 480, rx: 40, fill: INK}, s.phone); el("rect", {x: -112, y: -205, width: 224, height: 410, rx: 20, fill: "#fff"}, s.phone);
  tx(s.phone, {x: 0, y: -168, "text-anchor": "middle", "font-size": 32, "font-weight": 700, fill: "#7209b7"}, "TheOneApp"); tx(s.phone, {x: 0, y: -138, "text-anchor": "middle", "font-size": 17, "font-weight": 600, fill: "#6c757d"}, "the ultimate science app");
  const cp = el("clipPath", {id: "scr3"}, $("v").querySelector("defs")); el("rect", {x: -112, y: -122, width: 224, height: 327, rx: 4}, cp);
  s.scr = el("g", {"clip-path": "url(#scr3)"}, s.phone); s.shot = el("image", {href: "oneapp_mind.png", x: -112, y: -122, width: 224, height: 485, preserveAspectRatio: "xMidYMin slice"}, s.scr);
  s.ring = el("rect", {fill: "none", stroke: "#f72585", "stroke-width": 5, rx: 13}, s.scr);
  s.run = t => { const a = w => C("habit2", w);
    op(s.center, ramp(t, a("leaf"), a("leaf") + .2)); tf(s.center, `translate(720 480) scale(${pop(t, a("leaf"))})`);
    const bt = {parts: a("four"), vein: a("vein"), different: a("different")};
    s.br.forEach(b => { const k = bt[b.k]; set(b.line, "stroke-dashoffset", 700 * (1 - ramp(t, k - .1, k + .4))); op(b.line, t > k - .1 ? 1 : 0); op(b.c, ramp(t, k + .15, k + .35)); popAt(b.c, b.x, b.y, t, k + .15);
      const n = b.tw.length; b.tw.forEach((tw, j) => { const tt = k + .5 + j * .25; op(tw, ramp(t, tt, tt + .2)); const ang = (j - (n - 1) / 2) * .55; popAt(tw, b.x + Math.sin(ang) * 260, b.y + (b.y < 480 ? -1 : 1) * (90 + (j % 2) * 55), t, tt); }); });
    op(s.ult, on(t, a("ultimate"), SC.mindmap.t1 + .5, .2)); popAt(s.ult, 760, 140, t, a("ultimate"));
    const ph = ramp(t, a("save"), a("save") + .6); op(s.phone, ph); tf(s.phone, `translate(${lerp(1650, 1340, ph)} 520) rotate(${lerp(12, -4, ph)})`);
    const off = -122 - 270 * ramp(t, a("ultimate") + .4, a("grows")); set(s.shot, "y", off);
    set(s.ring, "x", -112 + 224 * (36 / 780)); set(s.ring, "y", off + 485 * (1330 / 1688)); set(s.ring, "width", 224 * (290 / 780)); set(s.ring, "height", 485 * (72 / 1688));
    op(s.ring, on(t, a("grows"), SC.mindmap.t1 + .5, .15) * (.6 + .4 * Math.sin(t * 8))); }; return s; })();

// ---- CLOSE
S.close = (() => { const s = scene("close", "#f15bb5", "#fee440");
  s.L = bigLeaf(s.stage, 600, 200, {stalk: 110}); drawOn(s.L.smallL, 1);
  s.lab = ["blade", "stalk", "main", "smaller"].map((w, i) => ({w, c: chip(s.stage, ["LEAF BLADE", "LEAF STALK", "MAIN VEIN", "SMALLER VEINS"][i], ["#2dc653", "#a0522d", "#3a86ff", "#00b4d8"][i], {fs: 30}), x: [880, 330, 1180, 640][i], y: [220, 600, 560, 640][i]}));
  s.bubble = el("g", {}, s.stage); el("path", {d: "M-470 -90 H470 A40 40 0 0 1 510 -50 V50 A40 40 0 0 1 470 90 H-290 L-360 150 L-350 90 H-470 A40 40 0 0 1 -510 50 V-50 A40 40 0 0 1 -470 -90 Z", fill: "#fff", stroke: INK, "stroke-width": 7, filter: "url(#sh)"}, s.bubble);
  tx(s.bubble, {x: 0, y: 16, "text-anchor": "middle", "font-size": 44, "font-weight": 700, fill: INK}, "🔍 Find a leaf: PARALLEL or NET?");
  s.run = t => { const a = w => C("close", w); const bb = ramp(t, a("find") - .4, a("find"));
    tf(s.L.g, `translate(${480} ${420 - bb * 60}) scale(${pop(t, SC.close.t0 - .2) * (1 - bb * .3)})`);
    s.lab.forEach(L => { op(L.c, ramp(t, a(L.w), a(L.w) + .2) * (1 - bb)); popAt(L.c, L.x, L.y, t, a(L.w)); });
    op(s.bubble, bb); tf(s.bubble, `translate(760 560) scale(${pop(t, a("find") - .4)})`); }; return s; })();

// ---- END CARD
S.end = (() => { const s = scene("end", "#3a0ca3", "#7209b7");
  tx(s.stage, {x: 960, y: 360, "text-anchor": "middle", "font-size": 44, "font-weight": 700, fill: "#ffe14d", "letter-spacing": 6}, "NEXT EPISODE");
  tx(s.stage, {x: 960, y: 480, "text-anchor": "middle", "font-size": 84, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 10}, "Plants with superpowers:");
  tx(s.stage, {x: 960, y: 580, "text-anchor": "middle", "font-size": 84, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 10}, "cactus, climbers & carrots 🌵");
  s.run = () => {}; return s; })();

