/* =================== SCENES (Episode 2: plant system) =================== */
const S = {};
const hex = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
const mix = (h1, h2, k) => { const a = hex(h1), b = hex(h2); return "rgb(" + a.map((v, i) => Math.round(lerp(v, b[i], clamp(k)))).join(",") + ")"; };
const camAt = (keys, t) => { let c = {...keys[0]}; for (let i = 1; i < keys.length; i++) { const k = keys[i]; if (t < k.t) break; const q = ease((t - k.t) / (k.d || .7)); ["x", "y", "s"].forEach(f => c[f] = lerp(c[f], k[f], q)); } return c; };
function leafPath(len, w) { return `M0 0 Q${len * .35} ${-w} ${len} 0 Q${len * .35} ${w} 0 0 Z`; }
function drawPlant(p, opts = {}) {
  const K = {}; const g = el("g", {}, p); K.g = g;
  K.rootsGlow = el("path", {stroke: "#ffe14d", "stroke-width": 34, fill: "none", "stroke-linecap": "round", opacity: 0}, g);
  K.roots = el("path", {d: "M760 600 Q740 680 690 760 Q660 820 600 860 M760 600 Q770 700 760 880 M760 600 Q800 690 860 770 Q900 820 950 850 M720 690 Q660 700 610 690 M800 700 Q860 700 920 680 M690 760 Q650 760 620 780 M860 770 Q880 820 870 870", stroke: "#fbe7c6", "stroke-width": 13, fill: "none", "stroke-linecap": "round"}, g);
  set(K.rootsGlow, "d", K.roots.getAttribute("d"));
  K.top = el("g", {}, g);
  K.stemGlow = el("path", {d: "M760 600 Q750 400 760 190", stroke: "#ffe14d", "stroke-width": 48, fill: "none", "stroke-linecap": "round", opacity: 0}, K.top);
  K.stem = el("path", {d: "M760 600 Q750 400 760 190", stroke: "#52b788", "stroke-width": 26, fill: "none", "stroke-linecap": "round"}, K.top);
  el("path", {d: "M760 600 Q750 400 760 190", stroke: INK, "stroke-width": 4, fill: "none", opacity: .25}, K.top);
  K.leaves = []; K.leafGlow = [];
  [[470, -1, 210, 70, -20], [470, 1, 210, 70, 20], [370, -1, 190, 64, -30], [370, 1, 190, 64, 30], [270, -1, 160, 56, -40], [270, 1, 160, 56, 40], [190, -1, 120, 44, -70], [190, 1, 120, 44, 70]].forEach(([y, side, len, w, ang]) => {
    const lg = el("g", {transform: `translate(${757 + side * 6} ${y}) rotate(${side < 0 ? 180 - ang : ang})`}, K.top);
    const glow = el("path", {d: leafPath(len, w + 10), fill: "#ffe14d", opacity: 0, transform: "scale(1.08)"}, lg);
    el("path", {d: leafPath(len, w), fill: "#2dc653", stroke: INK, "stroke-width": 5}, lg);
    el("path", {d: `M4 0 L${len - 10} 0`, stroke: "#b7efc5", "stroke-width": 4}, lg);
    for (let i = 1; i < 4; i++) el("path", {d: `M${len * i / 4} 0 L${len * i / 4 + 26} ${-w * .45} M${len * i / 4} 0 L${len * i / 4 + 26} ${w * .45}`, stroke: "#b7efc5", "stroke-width": 3}, lg);
    K.leaves.push(lg); K.leafGlow.push(glow); });
  return K;
}

// ---- HOOK
S.hook = (() => { const s = scene("hook", "#80ed99", "#2a9d8f");
  s.plate = el("g", {}, s.stage); el("circle", {r: 300, fill: "#fff", stroke: INK, "stroke-width": 8, filter: "url(#sh)"}, s.plate); el("circle", {r: 230, fill: "none", stroke: "#e9ecef", "stroke-width": 10}, s.plate);
  s.food = [["🥬", -120, -60], ["🥕", 120, -40]].map(([e, x, y]) => ({e: emo(s.plate, x, y, 150, e), x, y}));
  const cel = el("g", {transform: "translate(0 120) rotate(-70)"}, s.plate); for (let i = 0; i < 3; i++) el("rect", {x: -90, y: -40 + i * 26, width: 180, height: 26, rx: 12, fill: "#95d5b2", stroke: INK, "stroke-width": 4}, cel); s.food.push({e: cel, x: 0, y: 120});
  s.q = [0, 1, 2].map(i => tx(s.stage, {"font-size": 110, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 10, "text-anchor": "middle"}, "?"));
  s.three = el("g", {}, s.stage); el("circle", {r: 90, fill: "#ffbe0b", stroke: INK, "stroke-width": 7}, s.three); tx(s.three, {x: 0, y: 44, "text-anchor": "middle", "font-size": 124, "font-weight": 700, fill: INK}, "3");
  s.marks = el("g", {}, s.stage); el("rect", {x: -260, y: -50, width: 520, height: 100, rx: 50, fill: "#e63946", stroke: INK, "stroke-width": 6, filter: "url(#sh)"}, s.marks); tx(s.marks, {x: 0, y: 18, "text-anchor": "middle", "font-size": 46, "font-weight": 700, fill: "#fff"}, "✗ −2 marks");
  s.run = t => { const a = w => C("hook", w);
    op(s.plate, 1); tf(s.plate, `translate(760 470) scale(${pop(t, .3)}) rotate(${Math.sin(t) * 2})`);
    s.food.forEach((f, i) => op(f.e, ramp(t, .5 + i * .2, .7 + i * .2)));
    popAt(s.three, 1180, 230, t, a("three")); op(s.three, on(t, a("three"), a("let's"), .2));
    op(s.marks, on(t, a("lose"), a("which") + .2, .2)); popAt(s.marks, 760, 820 - 120, t, a("lose"));
    s.q.forEach((q, i) => { set(q, "x", 420 + i * 340); set(q, "y", 200 + Math.sin(t * 6 + i) * 18); op(q, on(t, a("which"), SC.hook.t1 + .3, .2)); }); }; return s; })();

// ---- PLANT (turn, leaves, stem, roots) with camera
S.plant = (() => { const s = scene("plant", "#a2d2ff", "#cdb4db");
  s.world = el("g", {}, s.stage);
  s.sun = emo(s.world, 260, 120, 150, "☀️");
  s.rays = el("g", {opacity: 0}, s.world); for (let i = 0; i < 6; i++) el("line", {x1: 320, y1: 170, x2: 640 + i * 40, y2: 230 + i * 50, stroke: "#ffd60a", "stroke-width": 9, "stroke-dasharray": "20 14", "stroke-linecap": "round"}, s.rays);
  el("rect", {x: -1400, y: 600, width: 4400, height: 1400, fill: "#9c6644"}, s.world); el("rect", {x: -1400, y: 588, width: 4400, height: 24, fill: "#57cc99"}, s.world);
  seed = 9; for (let i = 0; i < 40; i++) el("ellipse", {cx: -300 + rnd() * 2200, cy: 640 + rnd() * 500, rx: 8 + rnd() * 16, ry: 6 + rnd() * 10, fill: "#7f5539", opacity: .7}, s.world);
  s.P = drawPlant(s.world);
  s.sparks = []; for (let i = 0; i < 14; i++) s.sparks.push({x: 560 + rnd() * 400, y: 170 + rnd() * 320, ph: rnd() * 6, e: emo(s.world, 0, 0, 30, "✨")});
  s.up = []; for (let i = 0; i < 9; i++) s.up.push({ph: i / 9, e: el("circle", {r: 9, fill: "#4cc9f0", stroke: INK, "stroke-width": 3}, s.world)});
  s.down = []; for (let i = 0; i < 7; i++) s.down.push({ph: i / 7, e: el("circle", {r: 8, fill: "#ffb703", stroke: INK, "stroke-width": 3}, s.world)});
  s.soilIn = []; for (let i = 0; i < 16; i++) s.soilIn.push({ph: rnd(), tip: [[600, 860], [760, 880], [950, 850], [610, 690], [920, 680], [870, 870]][i % 6], mineral: i % 3 === 0, e: i % 3 === 0 ? el("rect", {width: 14, height: 14, fill: "#c77dff", stroke: INK, "stroke-width": 2, transform: "rotate(45)"}, s.world) : el("circle", {r: 8, fill: "#4cc9f0", stroke: INK, "stroke-width": 2}, s.world)});
  s.wind = el("g", {opacity: 0}, s.world); for (let i = 0; i < 5; i++) el("path", {d: `M${200 + (i % 2) * 60} ${220 + i * 70} q 120 -30 240 0 q 60 15 100 -10`, stroke: "#fff", "stroke-width": 9, fill: "none", "stroke-linecap": "round"}, s.wind);
  // job cards (screen space)
  const card = (title, col, lines) => { const g = el("g", {}, s.stage); el("rect", {x: 0, y: 0, width: 560, height: 70 + lines.length * 52, rx: 26, fill: "#fff", stroke: INK, "stroke-width": 6, filter: "url(#sh)"}, g);
    el("rect", {x: 0, y: 0, width: 560, height: 64, rx: 26, fill: col}, g); el("rect", {x: 0, y: 38, width: 560, height: 26, fill: col}, g);
    tx(g, {x: 280, y: 45, "text-anchor": "middle", "font-size": 36, "font-weight": 700, fill: "#fff"}, title);
    const ls = lines.map((L, i) => tx(g, {x: 26, y: 112 + i * 52, "font-size": 33, "font-weight": 600, fill: INK, opacity: 0}, L)); return {g, ls}; };
  s.cLeaf = card("🍃 LEAVES", "#2dc653", ["① make food", "② take in & give out gases"]);
  s.cStem = card("🌿 STEM", "#a0522d", ["① holds plant upright", "② transports water, mineral", "    salts and food"]);
  s.cRoot = card("🥕 ROOTS", "#6f4518", ["① hold plant firmly in ground", "② absorb water + mineral salts"]);
  s.factory = chip(s.stage, "🏭 FOOD FACTORY", "#2dc653", {fs: 40});
  // magnifier (screen space)
  s.mag = el("g", {}, s.stage); const cpId = "magc"; const cp = el("clipPath", {id: cpId}, $("v").querySelector("defs")); el("circle", {r: 220}, cp);
  const inner = el("g", {"clip-path": `url(#${cpId})`}, s.mag); el("rect", {x: -230, y: -230, width: 460, height: 460, fill: "#74c69d"}, inner);
  for (let i = 0; i < 30; i++) el("ellipse", {cx: -200 + (i % 6) * 80 + (Math.floor(i / 6) % 2) * 40, cy: -200 + Math.floor(i / 6) * 90, rx: 38, ry: 30, fill: "#95d5b2", stroke: "#52b788", "stroke-width": 3}, inner);
  s.stoma = [[-90, -60], [90, 20], [-30, 120]].map(([x, y]) => { const sg = el("g", {transform: `translate(${x} ${y})`}, inner);
    el("path", {d: "M0 -34 Q-30 -30 -26 0 Q-30 30 0 34 Q-12 0 0 -34 Z", fill: "#2d6a4f", stroke: INK, "stroke-width": 3}, sg);
    el("path", {d: "M0 -34 Q30 -30 26 0 Q30 30 0 34 Q12 0 0 -34 Z", fill: "#2d6a4f", stroke: INK, "stroke-width": 3}, sg);
    el("ellipse", {rx: 7, ry: 26, fill: "#081c15"}, sg); return sg; });
  s.gasIn = []; s.gasOut = []; for (let i = 0; i < 6; i++) { s.gasIn.push(el("circle", {r: 12, fill: "#bde0fe", stroke: INK, "stroke-width": 2}, inner)); s.gasOut.push(el("circle", {r: 12, fill: "#fff", stroke: INK, "stroke-width": 2}, inner)); }
  el("circle", {r: 220, fill: "none", stroke: INK, "stroke-width": 14}, s.mag); el("path", {d: "M150 160 L250 270", stroke: INK, "stroke-width": 30, "stroke-linecap": "round"}, s.mag);
  s.gasLbl = [chip(s.stage, "gases IN ↘", "#3a86ff", {fs: 30}), chip(s.stage, "gases OUT ↗", "#6c757d", {fs: 30})];
  s.run = t => { const T = w => C("turn", w), L1 = w => C("leaves1", w), L2 = w => C("leaves2", w), St = w => C("stem1", w), R = w => C("roots1", w);
    const K = [{t: 0, x: 760, y: 520, s: .92}, {t: L1("start") - .4, x: 760, y: 330, s: 1.45}, {t: L2("tiny"), x: 860, y: 380, s: 2.2}, {t: L2("so") , x: 760, y: 330, s: 1.45}, {t: St("next") - .2, x: 700, y: 420, s: 1.05}, {t: R("now") - .2, x: 760, y: 740, s: 1.35}];
    const c = camAt(K, t); tf(s.world, `translate(960 520) scale(${c.s}) translate(${-c.x} ${-c.y})`);
    const P = s.P;
    P.leafGlow.forEach(g => op(g, .8 * Math.max(on(t, T("leaves"), T("stem"), .15), on(t, L1("food"), L1("light"), .2))));
    op(P.stemGlow, .8 * Math.max(on(t, T("stem"), T("roots"), .15), on(t, St("stem"), St("transport"), .2)));
    op(P.rootsGlow, .8 * Math.max(on(t, T("roots"), T("each") , .15), on(t, R("roots"), R("firmly"), .2)));
    // upright: droop then straighten
    const droop = (1 - ramp(t, St("upright") - .2, St("upright") + .6)) * on(t, St("next") - .3, St("upright") + 1, .3);
    tf(P.top, `rotate(${droop * 16 + Math.sin(t * 1.5) * 1.2 + 6 * on(t, R("wind"), R("rain") + 1.2, .3) * Math.sin(t * 9)} 760 600)`);
    op(s.wind, on(t, R("wind"), R("over") + .6, .2)); tf(s.wind, `translate(${((t * 300) % 500) - 250} 0)`);
    op(s.rays, on(t, L1("light"), L2("tiny"), .3)); s.rays.querySelectorAll("line").forEach(l => set(l, "stroke-dashoffset", -t * 70));
    s.sparks.forEach(sp => { set(sp.e, "x", sp.x); set(sp.e, "y", sp.y + Math.sin(t * 3 + sp.ph) * 8); op(sp.e, on(t, L1("own"), L2("tiny"), .2) * (.5 + .5 * Math.sin(t * 5 + sp.ph))); });
    op(s.factory, on(t, L1("factory"), L1("most") + 2, .2)); popAt(s.factory, 1150, 200, t, L1("factory"));
    // magnifier
    const mg = on(t, L2("tiny"), L2("so"), .3); op(s.mag, mg); tf(s.mag, `translate(1150 430) scale(${pop(t, L2("tiny"))})`);
    const gasOn = ramp(t, L2("gases"), L2("gases") + .3);
    s.gasIn.forEach((e, i) => { const k = ((t * .6 + i / 6) % 1); const st = s.stoma[i % 3].getAttribute("transform").match(/-?\d+/g).map(Number);
      set(e, "cx", st[0] - 140 + 140 * k); set(e, "cy", st[1] - 100 + 100 * k); op(e, gasOn * Math.sin(k * Math.PI)); });
    s.gasOut.forEach((e, i) => { const k = ((t * .6 + i / 6 + .5) % 1); const st = s.stoma[(i + 1) % 3].getAttribute("transform").match(/-?\d+/g).map(Number);
      set(e, "cx", st[0] + 140 * k); set(e, "cy", st[1] - 100 * k); op(e, gasOn * Math.sin(k * Math.PI)); });
    s.gasLbl.forEach((g, i) => { op(g, gasOn * mg); popAt(g, 1150 + (i ? 150 : -150), i ? 170 : 700, t, L2("gases")); });
    // stem transport
    const upOn = on(t, St("water"), R("now") - .2, .3), dnOn = on(t, St("food"), R("now") - .2, .3);
    s.up.forEach(d => { const k = ((t * .45 + d.ph) % 1); set(d.e, "cx", 760 + Math.sin(k * 12) * 3); set(d.e, "cy", lerp(600, 200, k)); op(d.e, upOn); });
    s.down.forEach(d => { const k = ((t * .4 + d.ph) % 1); set(d.e, "cx", lerp(900, 768, Math.min(1, k * 3))); set(d.e, "cy", lerp(380, 580, k)); op(d.e, dnOn); });
    // roots absorb
    const ab = on(t, R("absorb"), SC.plant.t1 + .5, .3);
    s.soilIn.forEach(d => { const k = ((t * .5 + d.ph) % 1); const x = d.tip[0] + (1 - k) * (d.mineral ? -60 : 60), y = d.tip[1] + (1 - k) * 70;
      if (d.mineral) set(d.e, "transform", `translate(${x} ${y}) rotate(45)`); else { set(d.e, "cx", x); set(d.e, "cy", y); } op(d.e, ab * Math.min(1, (1 - k) * 3)); });
    // job cards
    const cards = [[s.cLeaf, L1("start"), St("next") - .3, [L1("food"), L2("gases#2")]], [s.cStem, St("stem"), R("now") - .3, [St("upright"), St("transport"), St("transport") + .01]], [s.cRoot, R("roots"), SC.plant.t1 + .6, [R("firmly"), R("absorb")]]];
    cards.forEach(([cd, a, b, ks]) => { op(cd.g, on(t, a, b, .25)); tf(cd.g, `translate(${70 - (1 - pop(t, a)) * 300} 120)`); cd.ls.forEach((l, i) => op(l, ramp(t, ks[i], ks[i] + .25))); });
  }; return s; })();

// ---- TRAP
S.trap = (() => { const s = scene("trap", "#ff595e", "#ff924c");
  s.title = tx(s.stage, {x: 760, y: 200, "text-anchor": "middle", "font-size": 84, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 12}, "⚠ EXAM TRAP!");
  s.roots = el("path", {d: "M760 520 Q700 600 620 680 M760 520 Q760 620 750 720 M760 520 Q830 600 900 670", stroke: "#6f4518", "stroke-width": 18, fill: "none", "stroke-linecap": "round"}, s.stage);
  el("rect", {x: 700, y: 430, width: 120, height: 100, rx: 20, fill: "#52b788", stroke: INK, "stroke-width": 6}, s.stage);
  s.burger = emo(s.stage, 0, 0, 120, "🍔");
  s.x = tx(s.stage, {x: 0, y: 0, "text-anchor": "middle", "font-size": 200, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 12}, "✗");
  s.no = chip(s.stage, "Roots do NOT take in food", "#1b1b3a", {fs: 40});
  s.leaf = chip(s.stage, "🍃 Food is made in the LEAVES", "#2dc653", {fs: 38});
  s.yes = chip(s.stage, "✓ Roots absorb water + mineral salts", "#3a86ff", {fs: 38});
  s.run = t => { const a = w => C("roots2", w);
    op(s.title, 1); tf(s.title, `translate(760 200) scale(${pop(t, SC.trap.t0) * (1 + .04 * Math.sin(t * 8))}) translate(-760 -200)`);
    const fall = ramp(t, a("do"), a("do") + .6), bounce = ramp(t, a("do") + .6, a("do") + 1.4);
    set(s.burger, "x", lerp(760, 1150, bounce)); set(s.burger, "y", lerp(300, 560, fall) - Math.sin(bounce * Math.PI) * 220); op(s.burger, on(t, a("roots"), a("plant") , .2));
    set(s.x, "x", 760); set(s.x, "y", 640); op(s.x, on(t, a("not"), a("plant"), .15));
    op(s.no, ramp(t, a("food"), a("food") + .2)); popAt(s.no, 760, 330, t, a("food"));
    op(s.leaf, ramp(t, a("leaves"), a("leaves") + .2)); popAt(s.leaf, 1180, 520, t, a("leaves"));
    op(s.yes, ramp(t, a("only"), a("only") + .2)); popAt(s.yes, 760, 760, t, a("only")); }; return s; })();

// ---- TRY IT
S.tryit = (() => { const s = scene("tryit", "#90e0ef", "#caf0f8");
  el("rect", {x: 0, y: 690, width: 1920, height: 400, fill: "#ddb892"}, s.stage);
  s.badge = chip(s.stage, "🧑‍🏫 Ask an adult to help!", "#ef476f", {fs: 36});
  const gl = el("g", {transform: "translate(760 0)"}, s.stage);
  s.water = el("rect", {x: -110, y: 520, width: 220, height: 170, fill: "#bde0fe", opacity: .9}, gl);
  s.celery = el("g", {}, gl);
  s.stalk = el("rect", {x: -26, y: 180, width: 52, height: 490, rx: 22, fill: "#95d5b2", stroke: INK, "stroke-width": 5}, s.celery);
  s.dye = el("rect", {x: -18, y: 660, width: 36, height: 0, rx: 14, fill: "#e63946", opacity: .8}, s.celery);
  for (let i = 0; i < 3; i++) el("line", {x1: -10 + i * 10, y1: 200, x2: -10 + i * 10, y2: 660, stroke: "#74c69d", "stroke-width": 3}, s.celery);
  s.cLeaves = [[-60, 150, -30], [0, 120, 0], [60, 150, 30]].map(([x, y, r]) => el("path", {d: leafPath(110, 45), transform: `translate(${x} ${y + 40}) rotate(${r - 90})`, fill: "#52b788", stroke: INK, "stroke-width": 4}, s.celery));
  el("path", {d: "M-130 400 L-110 700 L110 700 L130 400", fill: "none", stroke: INK, "stroke-width": 7, opacity: .8}, gl);
  el("path", {d: "M-125 410 L-108 690", stroke: "#fff", "stroke-width": 8, opacity: .6}, gl);
  s.drop = emo(s.stage, 0, 0, 70, "💧");
  s.clock = emo(s.stage, 1200, 300, 130, "🕐"); s.day = tx(s.stage, {x: 1200, y: 440, "text-anchor": "middle", "font-size": 46, "font-weight": 700, fill: INK}, "1 day later…");
  s.arrow = el("path", {d: "M900 640 L900 260", stroke: "#e63946", "stroke-width": 12, "stroke-linecap": "round", "marker-end": ""}, s.stage); s.arrowHead = el("path", {d: "M876 290 L900 240 L924 290 Z", fill: "#e63946"}, s.stage);
  s.lbl = chip(s.stage, "colour travels UP the stem ⬆", "#e63946", {fs: 32});
  s.run = t => { const a = w => C("tryit", w);
    op(s.badge, ramp(t, a("adult"), a("adult") + .2)); popAt(s.badge, 1160, 160, t, a("adult"));
    const dr = ramp(t, a("colouring") - .4, a("colouring") + .3); op(s.drop, on(t, a("drops") - .2, a("colouring") + .5, .15)); set(s.drop, "x", 790); set(s.drop, "y", lerp(330, 520, dr));
    set(s.water, "fill", t > a("colouring") ? mix("#bde0fe", "#ff8fa3", ramp(t, a("colouring"), a("colouring") + .8)) : "#bde0fe");
    op(s.clock, on(t, a("wait"), a("colour") + .5, .2)); tf(s.clock, `rotate(${t * 360} 1200 300)`); op(s.day, on(t, a("day"), a("colour") + .5, .2));
    const rise = ramp(t, a("travels"), a("leaves") + .3); set(s.dye, "y", 660 - 470 * rise); set(s.dye, "height", 470 * rise);
    s.cLeaves.forEach(l => set(l, "fill", mix("#52b788", "#ef6f8a", ramp(t, a("leaves"), a("leaves") + .6))));
    op(s.arrow, on(t, a("travels"), SC.tryit.t1 + .5, .2)); op(s.arrowHead, on(t, a("travels"), SC.tryit.t1 + .5, .2));
    op(s.lbl, ramp(t, a("stem"), a("stem") + .2)); popAt(s.lbl, 1240, 560, t, a("stem")); }; return s; })();

// ---- QUIZ
S.quiz = (() => { const s = scene("quiz", "#b5179e", "#560bad");
  const pot = (x, label, leaves) => { const g = el("g", {transform: `translate(${x} 0)`}, s.stage);
    const stem = el("rect", {x: -10, y: 300, width: 20, height: 330, rx: 9, fill: "#52b788", stroke: INK, "stroke-width": 4}, g);
    const top = el("g", {}, g); const lv = [];
    for (let i = 0; i < 6; i++) { const y = 360 + i * 45, side = i % 2 ? 1 : -1; lv.push(el("path", {d: leafPath(110, 38), transform: `translate(${side * 6} ${y}) rotate(${side < 0 ? 200 : -20})`, fill: "#2dc653", stroke: INK, "stroke-width": 4}, top)); }
    el("path", {d: "M-110 620 L110 620 L85 760 L-85 760 Z", fill: "#e76f51", stroke: INK, "stroke-width": 6}, g);
    tx(g, {x: 0, y: 715, "text-anchor": "middle", "font-size": 64, "font-weight": 700, fill: "#fff"}, label);
    return {g, stem, top, lv}; };
  s.A = pot(480, "A"); s.B = pot(1040, "B");
  s.pause = tx(s.stage, {x: 760, y: 180, "text-anchor": "middle", "font-size": 72, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 12}, "⏸ PAUSE & PREDICT!");
  s.cal = el("g", {}, s.stage); el("rect", {x: -90, y: -90, width: 180, height: 180, rx: 20, fill: "#fff", stroke: INK, "stroke-width": 6}, s.cal); el("rect", {x: -90, y: -90, width: 180, height: 50, rx: 20, fill: "#e63946"}, s.cal);
  s.calT = tx(s.cal, {x: 0, y: 50, "text-anchor": "middle", "font-size": 56, "font-weight": 700, fill: INK}, "wk 0");
  s.crown = emo(s.stage, 0, 0, 100, "👑");
  s.less = chip(s.stage, "fewer leaves → less food → grows less", "#ffbe0b", {fs: 28, ink: INK});
  s.run = t => { const a = w => C("quiz1", w), b = w => C("quiz2", w);
    op(s.pause, on(t, a("pause"), a("two#2") , .2)); tf(s.pause, `translate(760 180) scale(${pop(t, a("pause"))}) translate(-760 -180)`);
    const rem = ramp(t, a("remove"), a("remove") + .8);
    s.B.lv.forEach((l, i) => { if (i < 4) set(l, "transform", `translate(${(i % 2 ? 1 : -1) * (6 + rem * 200)} ${360 + i * 45 - rem * 150}) rotate(${(i % 2 ? -20 : 200) + rem * 90})`); op(l, 1 - rem); });
    op(s.cal, on(t, a("weeks"), b("plant") + .5, .2)); popAt(s.cal, 760, 420, t, a("weeks"));
    const g = ramp(t, a("weeks") + .3, b("taller") + .3); s.calT.textContent = g > .5 ? "wk 2" : "wk 0";
    const hA = 1 + .35 * ramp(t, b("plant"), b("taller") + .5), hB = 1 + .1 * ramp(t, b("plant"), b("taller") + .5);
    [[s.A, hA], [s.B, hB]].forEach(([P, h]) => { set(P.stem, "y", 630 - 330 * h); set(P.stem, "height", 330 * h); tf(P.top, `translate(0 ${-330 * (h - 1)})`); });
    op(s.crown, ramp(t, b("taller"), b("taller") + .2)); set(s.crown, "x", 480); set(s.crown, "y", 630 - 330 * hA - 60);
    op(s.less, ramp(t, b("fewer"), b("fewer") + .2)); popAt(s.less, 1110, 140, t, b("fewer")); }; return s; })();

// ---- DINNER
S.dinner = (() => { const s = scene("dinner", "#ffd166", "#f4a261");
  s.plate = el("g", {transform: "translate(760 470)"}, s.stage); el("ellipse", {rx: 520, ry: 300, fill: "#fff", stroke: INK, "stroke-width": 8, filter: "url(#sh)"}, s.plate);
  s.greens = el("g", {}, s.plate); for (let i = 0; i < 6; i++) el("path", {d: leafPath(150, 60), transform: `translate(-300 ${-60 + i * 18}) rotate(${-60 + i * 22})`, fill: i % 2 ? "#2d6a4f" : "#40916c", stroke: INK, "stroke-width": 4}, s.greens);
  s.roots = el("g", {}, s.plate); emo(s.roots, 20, -40, 140, "🥕"); emo(s.roots, 60, 110, 130, "🍠");
  s.cel = el("g", {transform: "translate(300 0) rotate(20)"}, s.plate); for (let i = 0; i < 3; i++) el("rect", {x: -22 + i * 28, y: -170, width: 30, height: 330, rx: 14, fill: "#95d5b2", stroke: INK, "stroke-width": 4}, s.cel);
  s.lab = [["LEAVES 🍃", "#2d6a4f", 460, 160, "leaves"], ["ROOTS 🥕", "#e76f51", 800, 140, "root"], ["STEM 🌿", "#52b788", 1130, 180, "stem"]].map(([n, col, x, y, w]) => ({c: chip(s.stage, n, col, {fs: 40}), x, y, w}));
  s.sg = chip(s.stage, "🇸🇬 kai lan · nai bai", "#ef233c", {fs: 32}); s.us = chip(s.stage, "🇺🇸 lettuce", "#3a86ff", {fs: 32});
  s.store = chip(s.stage, "stores food", "#fff", {fs: 28, ink: INK});
  s.run = t => { const a = w => C("dinner", w);
    s.lab.forEach(L => { op(L.c, ramp(t, a(L.w), a(L.w) + .2)); popAt(L.c, L.x, L.y, t, a(L.w)); });
    op(s.sg, ramp(t, a("kai"), a("kai") + .2)); popAt(s.sg, 380, 790 - 70, t, a("kai"));
    op(s.us, ramp(t, a("lettuce"), a("lettuce") + .2)); popAt(s.us, 640, 790 - 70, t, a("lettuce"));
    op(s.store, ramp(t, a("stores"), a("stores") + .2)); popAt(s.store, 830, 230, t, a("stores"));
    tf(s.greens, `scale(${1 + .08 * on(t, a("leaves") , a("carrot"), .2)})`); tf(s.roots, `scale(${1 + .08 * on(t, a("carrot"), a("celery"), .2)})`);
  }; return s; })();

// ---- EXAM
S.exam = (() => { const s = scene("exam", "#14213d", "#1d3557");
  const g = el("g", {transform: "translate(760 450)"}, s.stage);
  el("rect", {x: -670, y: -320, width: 1340, height: 640, rx: 34, fill: "#2b9348", stroke: "#8d5524", "stroke-width": 22, filter: "url(#sh)"}, g);
  tx(g, {x: -610, y: -240, "font-size": 50, "font-weight": 700, fill: "#ffe14d"}, "📝 EXAM CORNER · say it like this:");
  const L = [["🍃 Leaves make food, and take in and give out gases."], ["🌿 The stem holds the plant upright, and transports", "     water, mineral salts and food."], ["🥕 Roots hold the plant firmly in the ground, and", "     absorb water and mineral salts."]];
  let y = -150; s.lines = L.map(ls => { const r = el("g", {opacity: 0}, g); ls.forEach((x, i) => tx(r, {x: -610, y: y + i * 50, "font-size": 38, "font-weight": 600, fill: "#fff"}, x)); y += ls.length * 50 + 40; return r; });
  s.run = t => { const a = w => C("exam", w); const k = [a("leaves"), a("stem"), a("roots")];
    s.lines.forEach((r, i) => { op(r, ramp(t, k[i] - .15, k[i] + .2)); tf(r, `translate(${(1 - ramp(t, k[i] - .15, k[i] + .3)) * -40} 0)`); }); }; return s; })();

// ---- HABIT (make it obvious)
S.habit = (() => { const s = scene("habit", "#06d6a0", "#118ab2");
  s.title = tx(s.stage, {x: 760, y: 200, "text-anchor": "middle", "font-size": 84, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 12}, "👀 MAKE IT OBVIOUS");
  s.bottle = el("g", {}, s.stage); el("rect", {x: -90, y: -230, width: 180, height: 460, rx: 60, fill: "#4cc9f0", stroke: INK, "stroke-width": 7, opacity: .95}, s.bottle);
  el("rect", {x: -50, y: -290, width: 100, height: 70, rx: 18, fill: "#ef476f", stroke: INK, "stroke-width": 6}, s.bottle);
  el("rect", {x: -70, y: -40, width: 140, height: 220, rx: 40, fill: "#90e0ef", opacity: .7}, s.bottle);
  s.note = el("g", {}, s.stage); el("rect", {x: -150, y: -130, width: 300, height: 260, fill: "#ffe14d", stroke: INK, "stroke-width": 5, filter: "url(#sh)"}, s.note);
  [["🍃 make food + gases"], ["🌿 holds up + carries"], ["🥕 anchors + absorbs"]].forEach(([l], i) => tx(s.note, {x: -130, y: -60 + i * 70, "font-size": 27, "font-weight": 700, fill: INK}, l));
  s.drops = [0, 1, 2, 3].map(i => el("circle", {r: 12, fill: "#4cc9f0", stroke: INK, "stroke-width": 3}, s.stage));
  s.facts = chip(s.stage, "💡 drink → read → remember", "#ff9f1c", {fs: 34});
  s.run = t => { const a = w => C("habit1", w);
    op(s.title, ramp(t, a("obvious"), a("obvious") + .2)); tf(s.title, `translate(760 200) scale(${pop(t, a("obvious"))}) translate(-760 -200)`);
    const tilt = on(t, a("drink") - .2, a("drink") + 1.2, .3); op(s.bottle, ramp(t, SC.habit.t0 - .2, SC.habit.t0 + .1)); tf(s.bottle, `translate(760 560) rotate(${-25 * tilt})`);
    const st = ramp(t, a("stick") - .2, a("stick") + .4); op(s.note, ramp(t, a("write"), a("write") + .2)); tf(s.note, `translate(${lerp(1250, 760, st)} ${lerp(420, 560, st)}) rotate(${lerp(8, -4, st)}) scale(${lerp(1, .55, st)})`);
    s.drops.forEach((d, i) => { const k = ((t * .8 + i / 4) % 1); set(d, "cx", 1150); set(d, "cy", lerp(400, 700, k)); op(d, on(t, a("roots"), SC.habit.t1 + .5, .2) * Math.sin(k * Math.PI)); });
    op(s.facts, ramp(t, a("facts"), a("facts") + .2)); popAt(s.facts, 760, 820 - 60, t, a("facts")); }; return s; })();

// ---- MIND MAP
S.mindmap = (() => { const s = scene("mindmap", "#fff3b0", "#ffd6a5");
  for (let i = 0; i < 16; i++) el("line", {x1: 0, y1: 120 + i * 60, x2: 1920, y2: 120 + i * 60, stroke: "#a2d2ff", "stroke-width": 2, opacity: .6}, s.stage);
  s.center = el("g", {}, s.stage); el("ellipse", {rx: 190, ry: 80, fill: "#2dc653", stroke: INK, "stroke-width": 7}, s.center); tx(s.center, {x: 0, y: 16, "text-anchor": "middle", "font-size": 46, "font-weight": 700, fill: "#fff"}, "PLANT SYSTEM");
  const br = [["leaves", "🍃 LEAVES", "#2dc653", 330, 340, ["make food", "gases in & out"]], ["stem", "🌿 STEM", "#a0522d", 330, 680, ["holds upright", "transports"]], ["roots", "🥕 ROOTS", "#6f4518", 1010, 690, ["anchor", "absorb"]]];
  s.br = br.map(([k, n, col, x, y, subs]) => { const line = el("path", {d: `M720 480 Q${(720 + x) / 2} ${y} ${x} ${y}`, stroke: col, "stroke-width": 12, fill: "none", "stroke-linecap": "round", "stroke-dasharray": 700}, s.stage);
    return {k, line, c: chip(s.stage, n, col, {fs: 38}), x, y, tw: subs.map(sn => chip(s.stage, sn, "#fff", {fs: 26, ink: INK}))}; });
  s.stage.appendChild(s.center);
  s.ult = chip(s.stage, "🚀 TheOneApp · the ultimate science app", "#7209b7", {fs: 30});
  s.phone = el("g", {}, s.stage); el("rect", {x: -130, y: -240, width: 260, height: 480, rx: 40, fill: INK}, s.phone); el("rect", {x: -112, y: -205, width: 224, height: 410, rx: 20, fill: "#fff"}, s.phone);
  tx(s.phone, {x: 0, y: -168, "text-anchor": "middle", "font-size": 32, "font-weight": 700, fill: "#7209b7"}, "TheOneApp"); tx(s.phone, {x: 0, y: -138, "text-anchor": "middle", "font-size": 17, "font-weight": 600, fill: "#6c757d"}, "the ultimate science app");
  const cp = el("clipPath", {id: "scr2"}, $("v").querySelector("defs")); el("rect", {x: -112, y: -122, width: 224, height: 327, rx: 4}, cp);
  s.scr = el("g", {"clip-path": "url(#scr2)"}, s.phone);
  s.shot = el("image", {href: "oneapp_mind.png", x: -112, y: -122, width: 224, height: 485, preserveAspectRatio: "xMidYMin slice"}, s.scr);
  s.ring = el("rect", {x: -103, y: 0, width: 98, height: 26, rx: 13, fill: "none", stroke: "#f72585", "stroke-width": 5}, s.scr);
  s.run = t => { const a = w => C("habit2", w);
    op(s.center, ramp(t, a("plant"), a("plant") + .2)); tf(s.center, `translate(720 480) scale(${pop(t, a("plant"))})`);
    s.br.forEach(b => { const k = a(b.k); set(b.line, "stroke-dashoffset", 700 * (1 - ramp(t, k - .1, k + .4))); op(b.line, t > k - .1 ? 1 : 0);
      op(b.c, ramp(t, k + .15, k + .35)); popAt(b.c, b.x, b.y, t, k + .15);
      b.tw.forEach((tw, j) => { const tt = a("two") + j * .3 + b.k.length * .05; op(tw, ramp(t, tt, tt + .2)); popAt(tw, b.x + (j ? 120 : -120), b.y + (b.y < 480 ? -80 : 80), t, tt); }); });
    op(s.ult, on(t, a("ultimate"), SC.mindmap.t1 + .5, .2)); popAt(s.ult, 760, 160, t, a("ultimate"));
    const ph = ramp(t, a("save"), a("save") + .6); op(s.phone, ph); tf(s.phone, `translate(${lerp(1650, 1340, ph)} 520) rotate(${lerp(12, -4, ph)})`);
    const scroll = ramp(t, a("ultimate") + .4, a("waiting")); const off = -122 - 270 * scroll; set(s.shot, "y", off);
    set(s.ring, "x", -112 + 224 * (36 / 780)); set(s.ring, "y", off + 485 * (1330 / 1688)); set(s.ring, "width", 224 * (290 / 780)); set(s.ring, "height", 485 * (72 / 1688));
    op(s.ring, on(t, a("waiting") - .1, SC.mindmap.t1 + .5, .15) * (.6 + .4 * Math.sin(t * 8))); }; return s; })();

// ---- CLOSE
S.close = (() => { const s = scene("close", "#f15bb5", "#fee440");
  s.icons = [["🍃", "leaf", "make food"], ["🌿", "stem", "holds up + carries"], ["🥕", "root", "anchor + absorb"]].map(([e, w, j], i) => ({e: emo(s.stage, 0, 0, 140, e), w, x: 420 + i * 340, j: chip(s.stage, j, "#fff", {fs: 28, ink: INK})}));
  s.bubble = el("g", {}, s.stage); el("path", {d: "M-460 -90 H460 A40 40 0 0 1 500 -50 V50 A40 40 0 0 1 460 90 H-280 L-350 150 L-340 90 H-460 A40 40 0 0 1 -500 50 V-50 A40 40 0 0 1 -460 -90 Z", fill: "#fff", stroke: INK, "stroke-width": 7, filter: "url(#sh)"}, s.bubble);
  tx(s.bubble, {x: 0, y: 16, "text-anchor": "middle", "font-size": 44, "font-weight": 700, fill: INK}, "💬 Which plant part did YOU eat today?");
  s.run = t => { const a = w => C("close", w); const jt = [a("food"), a("carries"), a("absorb")];
    s.icons.forEach((ic, i) => { const k = a(ic.w); op(ic.e, ramp(t, k, k + .2) * (1 - ramp(t, a("comments") - .5, a("comments")))); set(ic.e, "x", ic.x); set(ic.e, "y", 330); tf(ic.e, `translate(${ic.x} 330) scale(${pop(t, k)}) translate(${-ic.x} -330)`);
      op(ic.j, ramp(t, jt[i], jt[i] + .2) * (1 - ramp(t, a("comments") - .5, a("comments")))); popAt(ic.j, ic.x, 480, t, jt[i]); });
    op(s.bubble, ramp(t, a("comments") - .3, a("comments"))); tf(s.bubble, `translate(760 450) scale(${pop(t, a("comments") - .3)})`); }; return s; })();

// ---- END CARD
S.end = (() => { const s = scene("end", "#3a0ca3", "#7209b7");
  tx(s.stage, {x: 960, y: 360, "text-anchor": "middle", "font-size": 44, "font-weight": 700, fill: "#ffe14d", "letter-spacing": 6}, "NEXT EPISODE");
  tx(s.stage, {x: 960, y: 480, "text-anchor": "middle", "font-size": 84, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 10}, "Read a leaf");
  tx(s.stage, {x: 960, y: 580, "text-anchor": "middle", "font-size": 84, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 10}, "like a scientist 🍃");
  s.run = () => {}; return s; })();

