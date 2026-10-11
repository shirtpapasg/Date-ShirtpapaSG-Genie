/* =================== SCENES (Episode 4: plant adaptations) =================== */
const S = {};
const hex = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
const mix = (h1, h2, k) => { const a = hex(h1), b = hex(h2); return "rgb(" + a.map((v, i) => Math.round(lerp(v, b[i], clamp(k)))).join(",") + ")"; };
const leafD = (W, H) => `M0 0 Q${W * .3} ${-H} ${W} 0 Q${W * .3} ${H} 0 0 Z`;
const leaf = (p, x, y, W, H, rot, fill = "#2dc653") => el("path", {d: leafD(W, H), transform: `translate(${x} ${y}) rotate(${rot})`, fill, stroke: INK, "stroke-width": 4}, p);
function cactus(p, sc = 1) { const g = el("g", {transform: `scale(${sc})`}, p), K = {g};
  K.body = el("g", {}, g);
  const part = d => el("path", {d, fill: "#40916c", stroke: INK, "stroke-width": 7, "stroke-linejoin": "round"}, K.body);
  part("M-60 300 L-60 -200 Q0 -280 60 -200 L60 300 Z"); part("M-60 60 L-150 60 Q-190 60 -190 20 L-190 -110 Q-160 -150 -130 -110 L-130 0 L-60 0 Z"); part("M60 120 L150 120 Q190 120 190 80 L190 -40 Q160 -80 130 -40 L130 60 L60 60 Z");
  [-30, 0, 30].forEach(x => el("line", {x1: x, y1: -210, x2: x, y2: 290, stroke: "#2d6a4f", "stroke-width": 5}, K.body));
  K.glow = el("path", {d: "M-60 300 L-60 -200 Q0 -280 60 -200 L60 300 Z", fill: "#80ed99", opacity: 0}, g);
  K.spines = el("g", {stroke: "#fefae0", "stroke-width": 4, "stroke-linecap": "round"}, g); K.sp = [];
  seed = 31; for (let i = 0; i < 46; i++) { const pts = [[-60, -180 + rnd() * 460], [60, -180 + rnd() * 460], [-190, -90 + rnd() * 100], [190, -20 + rnd() * 100], [-20 + rnd() * 40, -230]]; const [x, y] = pts[i % 5]; const sd = x < 0 ? -1 : x > 0 ? 1 : 0;
    const ln = el("g", {}, K.spines); el("line", {x1: x, y1: y, x2: x + sd * 26 + (sd ? 0 : (rnd() - .5) * 30), y2: y - 14 - (sd ? 0 : 14)}, ln); el("line", {x1: x, y1: y, x2: x + sd * 22, y2: y + 12}, ln); K.sp.push(ln); }
  return K; }

// ---- HOOK
S.hook = (() => { const s = scene("hook", "#ffd166", "#f4a261");
  el("rect", {x: 0, y: 700, width: 1920, height: 400, fill: "#e9c46a"}, s.stage);
  s.C = cactus(s.stage, 1);
  s.mag = el("g", {}, s.stage); el("circle", {r: 120, fill: "#fff", "fill-opacity": .25, stroke: INK, "stroke-width": 12}, s.mag); el("path", {d: "M85 85 L170 170", stroke: INK, "stroke-width": 24, "stroke-linecap": "round"}, s.mag);
  s.q = tx(s.stage, {x: 1150, y: 300, "text-anchor": "middle", "font-size": 140, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 12}, "LEAVES?");
  s.mark = chip(s.stage, "✗ −2 marks", "#e63946", {fs: 44});
  s.run = t => { const a = w => C("hook", w);
    tf(s.C.g, `translate(560 420) scale(${.9 * pop(t, .3)})`);
    op(s.q, ramp(t, a("leaves"), a("leaves") + .2)); tf(s.q, `translate(1150 300) scale(${pop(t, a("leaves"))}) translate(-1150 -300)`);
    op(s.mark, on(t, a("lose"), a("so"), .2)); popAt(s.mark, 1150, 520, t, a("lose"));
    op(s.mag, ramp(t, a("where"), a("where") + .2)); tf(s.mag, `translate(${560 - 60 + Math.sin(t * 2) * 40} ${300 + Math.cos(t * 2) * 40})`); }; return s; })();

// ---- TURN (recap + cheat)
S.turn = (() => { const s = scene("turn", "#4cc9f0", "#4361ee");
  s.rec = [["🍃", "make food", "leaves"], ["🌿", "hold up + carry", "stem"], ["🥕", "anchor + absorb", "roots"]].map(([e, j, w], i) => { const g = el("g", {}, s.stage); el("circle", {r: 95, fill: "#fff", stroke: INK, "stroke-width": 7}, g); emo(g, 0, -5, 100, e);
    const c = chip(g, j, "#1b1b3a", {fs: 28}); tf(c, "translate(0 140)"); op(c, 1); return {g, w, x: 360 + i * 400}; });
  s.places = ["🏜️", "🌊", "🌳"].map(e => emo(s.stage, 0, 0, 120, e));
  s.cheat = tx(s.stage, {x: 760, y: 470, "text-anchor": "middle", "font-size": 96, "font-weight": 700, fill: "#ffe14d", class: "out", "stroke-width": 12}, "PLANTS WITH SUPERPOWERS 😎");
  s.run = t => { const a = w => C("turn", w); const pl = a("places") ;
    s.rec.forEach(r => { op(r.g, ramp(t, a(r.w), a(r.w) + .2) * (1 - ramp(t, pl - .2, pl + .2))); popAt(r.g, r.x, 400, t, a(r.w)); });
    s.places.forEach((e, i) => { op(e, on(t, pl + i * .25, a("superpowers") - .1, .2)); set(e, "x", 360 + i * 400); set(e, "y", 400 + Math.sin(t * 3 + i) * 12); });
    op(s.cheat, ramp(t, a("superpowers"), a("superpowers") + .15)); tf(s.cheat, `translate(760 470) scale(${pop(t, a("superpowers"))}) rotate(${-3 + Math.sin(t * 6) * 2}) translate(-760 -470)`); }; return s; })();

// ---- STEMS (woody, non-woody, baobab)
S.stems = (() => { const s = scene("stems", "#caffbf", "#9bf6ff");
  el("rect", {x: 0, y: 690, width: 1920, height: 400, fill: "#a7c957"}, s.stage);
  s.tree = el("g", {}, s.stage); el("path", {d: "M-45 0 L-35 -260 L35 -260 L45 0 Z", fill: "#8b5e34", stroke: INK, "stroke-width": 6}, s.tree); [[0, -330, 170], [-110, -280, 110], [110, -280, 110]].forEach(([x, y, r]) => el("circle", {cx: x, cy: y, r, fill: "#38b000", stroke: INK, "stroke-width": 6}, s.tree));
  s.shrub = el("g", {}, s.stage); [[-40, -60], [0, -80], [40, -60]].forEach(([x, y]) => el("path", {d: `M0 0 L${x} ${y - 40}`, stroke: "#8b5e34", "stroke-width": 10}, s.shrub)); [[-60, -110, 70], [0, -140, 80], [60, -110, 70]].forEach(([x, y, r]) => el("circle", {cx: x, cy: y, r, fill: "#52b788", stroke: INK, "stroke-width": 5}, s.shrub));
  s.wood = chip(s.stage, "WOODY: hard", "#8b5e34", {fs: 36}); s.thick = chip(s.stage, "thick", "#fff", {fs: 28, ink: INK}); s.thin = chip(s.stage, "thinner", "#fff", {fs: 28, ink: INK});
  s.fire = emo(s.stage, 0, 0, 110, "🪵"); s.cabin = emo(s.stage, 0, 0, 110, "🛖");
  s.herb = el("g", {}, s.stage); el("path", {d: "M-90 0 L90 0 L70 120 L-70 120 Z", fill: "#e76f51", stroke: INK, "stroke-width": 6}, s.herb); for (let i = 0; i < 7; i++) { const x = -60 + i * 20; el("path", {d: `M${x} 0 Q${x + (i % 2 ? 20 : -20)} -80 ${x} -150`, stroke: "#74c69d", "stroke-width": 7, fill: "none"}, s.herb); leaf(s.herb, x, -150 + (i % 3) * 30, 50, 22, -90 + (i % 2 ? 40 : -40), "#52b788"); }
  s.soft = chip(s.stage, "NON-WOODY: soft · mint, parsley", "#52b788", {fs: 32});
  s.baobab = el("g", {}, s.stage); const tr = "M-110 0 Q-140 -200 -80 -330 L80 -330 Q140 -200 110 0 Z"; el("path", {d: tr, fill: "#bc8a5f", stroke: INK, "stroke-width": 7}, s.baobab);
  const cp = el("clipPath", {id: "baoclip"}, $("v").querySelector("defs")); el("path", {d: tr}, cp);
  s.water = el("rect", {x: -150, y: 0, width: 300, height: 0, fill: "#4cc9f0", opacity: .6, "clip-path": "url(#baoclip)"}, s.baobab);
  el("path", {d: tr, fill: "none", stroke: INK, "stroke-width": 7}, s.baobab);
  [[-80, -330, -170, -420], [-30, -330, -60, -450], [30, -330, 70, -440], [80, -330, 170, -410]].forEach(([a, b, c, d]) => el("path", {d: `M${a} ${b} L${c} ${d}`, stroke: "#bc8a5f", "stroke-width": 16, "stroke-linecap": "round"}, s.baobab));
  s.dry = emo(s.stage, 0, 0, 120, "☀️"); s.bchip = chip(s.stage, "BAOBAB stores water 💧", "#00b4d8", {fs: 32});
  s.run = t => { const a = w => C("stems1", w), b = w => C("stems2", w); const two = ramp(t, b("other") - .3, b("other") + .2);
    op(s.tree, ramp(t, a("trees"), a("trees") + .2) * (1 - two)); tf(s.tree, `translate(400 690) scale(${pop(t, a("trees"))})`);
    op(s.shrub, ramp(t, a("shrubs"), a("shrubs") + .2) * (1 - two)); tf(s.shrub, `translate(800 690) scale(${pop(t, a("shrubs"))})`);
    op(s.wood, ramp(t, a("woody"), a("woody") + .2) * (1 - two)); popAt(s.wood, 600, 170, t, a("woody"));
    op(s.thick, ramp(t, a("thick"), a("thick") + .2) * (1 - two)); popAt(s.thick, 400, 740, t, a("thick")); op(s.thin, ramp(t, a("thinner"), a("thinner") + .2) * (1 - two)); popAt(s.thin, 800, 740, t, a("thinner"));
    op(s.fire, on(t, a("firewood"), b("other"), .2)); popAt(s.fire, 1120, 420, t, a("firewood")); op(s.cabin, on(t, a("cabins"), b("other"), .2)); popAt(s.cabin, 1300, 560, t, a("cabins"));
    op(s.herb, ramp(t, b("nonwoody") - .2, b("nonwoody")) * (1 - ramp(t, b("baobab") - .3, b("baobab")))); tf(s.herb, `translate(560 600) scale(${pop(t, b("nonwoody") - .2) * 1.3})`);
    op(s.soft, on(t, b("nonwoody"), b("baobab") , .2)); popAt(s.soft, 760, 160, t, b("nonwoody"));
    op(s.baobab, ramp(t, b("baobab"), b("baobab") + .2)); tf(s.baobab, `translate(700 690) scale(${pop(t, b("baobab"))})`);
    const w = ramp(t, b("stores"), b("stores") + 1.5) * .6; set(s.water, "y", -330 * w); set(s.water, "height", 330 * w);
    op(s.dry, ramp(t, b("dry"), b("dry") + .2)); set(s.dry, "x", 1150); set(s.dry, "y", 230 + Math.sin(t * 2) * 8);
    op(s.bchip, ramp(t, b("stores"), b("stores") + .2)); popAt(s.bchip, 1100, 450, t, b("stores")); }; return s; })();

// ---- CACTUS
S.cactus = (() => { const s = scene("cactus", "#ffb703", "#fb8500");
  el("rect", {x: 0, y: 720, width: 1920, height: 400, fill: "#e9c46a"}, s.stage);
  s.C = cactus(s.stage, .95); s.sun = emo(s.stage, 1200, 190, 150, "☀️");
  s.rays = el("g", {opacity: 0}, s.stage); for (let i = 0; i < 5; i++) el("line", {x1: 1120, y1: 240, x2: 620 + i * 30, y2: 260 + i * 70, stroke: "#ffd60a", "stroke-width": 9, "stroke-dasharray": "20 14"}, s.rays);
  s.drops = [0, 1, 2].map(() => emo(s.stage, 0, 0, 60, "💧")); s.dx = [0, 1, 2].map(() => tx(s.stage, {"font-size": 70, "font-weight": 700, fill: "#e63946", class: "out", "stroke-width": 6, "text-anchor": "middle"}, "✗"));
  s.goat = emo(s.stage, 0, 0, 120, "🐐");
  s.lv = chip(s.stage, "SPINES = LEAVES! 🌵", "#2d6a4f", {fs: 40}); s.lw = chip(s.stage, "① lose less water", "#00b4d8", {fs: 32}); s.pr = chip(s.stage, "② protect from animals", "#e63946", {fs: 32});
  s.food = chip(s.stage, "GREEN STEM makes food ✨", "#38b000", {fs: 38});
  s.sparks = []; seed = 4; for (let i = 0; i < 12; i++) s.sparks.push({x: 520 + rnd() * 120, y: 200 + rnd() * 400, ph: rnd() * 6, e: emo(s.stage, 0, 0, 30, "✨")});
  s.run = t => { const a = w => C("cactus1", w), b = w => C("cactus2", w);
    tf(s.C.g, `translate(580 430) scale(.95)`);
    const sg = on(t, a("spines"), b("but"), .2); s.C.sp.forEach((l, i) => set(l, "stroke", sg > 0 ? mix("#fefae0", "#ffe14d", sg * (.5 + .5 * Math.sin(t * 8 + i))) : "#fefae0")); set(s.C.spines, "stroke-width", 4 + 3 * sg);
    op(s.lv, ramp(t, a("leaves"), a("leaves") + .2)); popAt(s.lv, 1180, 380, t, a("leaves"));
    op(s.lw, ramp(t, a("water"), a("water") + .2)); popAt(s.lw, 1180, 470, t, a("water")); op(s.pr, ramp(t, a("animals"), a("animals") + .2)); popAt(s.pr, 1180, 550, t, a("animals"));
    s.drops.forEach((d, i) => { const k = clamp((t - a("water") - i * .3) / 1.2); op(d, on(t, a("water"), a("animals"), .2)); set(d, "x", 640 + k * 160); set(d, "y", 330 + i * 120 - k * 40); });
    s.dx.forEach((d, i) => { op(d, on(t, a("water") + .8, a("animals"), .2)); set(d, "x", 800); set(d, "y", 320 + i * 120); });
    const gk = ramp(t, a("hungry") - .3, a("animals") + .4); op(s.goat, on(t, a("hungry") - .3, b("but"), .2)); set(s.goat, "x", lerp(140, 380, gk < .8 ? gk / .8 : 1) - (gk >= .8 ? (gk - .8) * 600 : 0)); set(s.goat, "y", 640);
    op(s.C.glow, .55 * on(t, b("green"), SC.cactus.t1 + .4, .3) * (.7 + .3 * Math.sin(t * 6)));
    op(s.rays, on(t, b("green"), SC.cactus.t1 + .4, .2)); s.rays.querySelectorAll("line").forEach(l => set(l, "stroke-dashoffset", -t * 70));
    s.sparks.forEach(sp => { set(sp.e, "x", sp.x); set(sp.e, "y", sp.y + Math.sin(t * 3 + sp.ph) * 8); op(sp.e, on(t, b("food#2") - .5, SC.cactus.t1 + .4, .2) * (.5 + .5 * Math.sin(t * 5 + sp.ph))); });
    op(s.food, ramp(t, b("green"), b("green") + .2)); popAt(s.food, 1180, 660, t, b("green")); }; return s; })();

// ---- CLIMBERS & CREEPERS
S.climb = (() => { const s = scene("climb", "#bde0fe", "#a2d2ff");
  el("rect", {x: 0, y: 700, width: 1920, height: 400, fill: "#99d98c"}, s.stage);
  s.sun = emo(s.stage, 1250, 170, 140, "☀️");
  el("rect", {x: 420, y: 160, width: 26, height: 545, rx: 8, fill: "#adb5bd", stroke: INK, "stroke-width": 5}, s.stage);
  let d = "M433 700"; for (let i = 0; i <= 36; i++) { const y = 700 - i * 15; d += ` L${433 + Math.sin(i * .7) * 34} ${y}`; }
  s.vine = el("path", {d, stroke: "#2d6a4f", "stroke-width": 9, fill: "none", "stroke-linecap": "round", "stroke-dasharray": 1100, "stroke-dashoffset": 1100}, s.stage);
  s.vl = []; for (let i = 0; i < 9; i++) { const y = 680 - i * 58; s.vl.push(leaf(s.stage, 433 + (i % 2 ? 30 : -30), y, 70, 28, i % 2 ? -20 : 200, "#52b788")); }
  s.creep = el("path", {d: "M760 690 Q900 700 1040 688 Q1180 676 1340 692", stroke: "#2d6a4f", "stroke-width": 9, fill: "none", "stroke-dasharray": 700, "stroke-dashoffset": 700}, s.stage);
  s.cl = []; for (let i = 0; i < 8; i++) s.cl.push(leaf(s.stage, 800 + i * 70, 690, 80, 32, -110 + (i % 2) * 40, "#40916c"));
  s.weak = chip(s.stage, "weak, soft stem 😩", "#adb5bd", {fs: 34, ink: INK});
  s.c1 = chip(s.stage, "CLIMBER: coils up to the light", "#7b61ff", {fs: 32}); s.c2 = chip(s.stage, "CREEPER: spreads on the ground", "#ff9f1c", {fs: 32});
  s.run = t => { const a = w => C("climb", w);
    op(s.weak, on(t, a("weak"), a("climbers"), .2)); popAt(s.weak, 760, 160, t, a("weak"));
    const g = ramp(t, a("coil"), a("light") + .5); set(s.vine, "stroke-dashoffset", 1100 * (1 - g)); s.vl.forEach((l, i) => op(l, ramp(t, a("coil") + i * (a("light") - a("coil")) / 9, a("coil") + .2 + i * (a("light") - a("coil")) / 9)));
    op(s.c1, ramp(t, a("climbers"), a("climbers") + .2)); popAt(s.c1, 760, 300, t, a("climbers"));
    const c = ramp(t, a("spread"), a("fan") + .5); set(s.creep, "stroke-dashoffset", 700 * (1 - c)); s.cl.forEach((l, i) => { const k = ramp(t, a("fan") + i * .12, a("fan") + .3 + i * .12); op(l, ramp(t, a("spread") + i * .15, a("spread") + .2 + i * .15)); set(l, "transform", `translate(${800 + i * 70} 690) rotate(${lerp(-110 + (i % 2) * 40, -60 - (i % 2) * 60, k)})`); });
    op(s.c2, ramp(t, a("creepers"), a("creepers") + .2)); popAt(s.c2, 1050, 560, t, a("creepers")); }; return s; })();

// ---- ROOTS (water lettuce, rain tree, storage roots)
S.roots = (() => { const s = scene("roots", "#90e0ef", "#caf0f8");
  s.pond = el("g", {}, s.stage); el("rect", {x: 120, y: 330, width: 560, height: 380, rx: 30, fill: "#4cc9f0", opacity: .6}, s.pond);
  for (let i = 0; i < 14; i++) el("path", {d: `M${300 + i * 14} 340 q ${(i % 3 - 1) * 14} 120 ${(i % 2 ? 12 : -12)} 260`, stroke: "#f1dca7", "stroke-width": 4, fill: "none"}, s.pond);
  [0, 60, 120, 180, 240, 300].forEach(r => leaf(s.pond, 400, 330, 120, 50, r - 90, "#95d5b2"));
  s.wl = chip(s.stage, "WATER LETTUCE: hairy roots in water", "#00b4d8", {fs: 28});
  s.tree = el("g", {}, s.stage); el("rect", {x: 950, y: 600, width: 560, height: 200, fill: "#9c6644"}, s.tree);
  el("path", {d: "M1230 600 Q1150 680 1040 740 M1230 600 Q1230 700 1220 790 M1230 600 Q1320 680 1440 740 M1230 600 Q1180 640 1100 650 M1230 600 Q1290 640 1370 650", stroke: "#fbe7c6", "stroke-width": 18, fill: "none", "stroke-linecap": "round"}, s.tree);
  el("path", {d: "M1200 600 L1210 430 L1250 430 L1260 600 Z", fill: "#8b5e34", stroke: INK, "stroke-width": 6}, s.tree);
  el("ellipse", {cx: 1230, cy: 380, rx: 260, ry: 90, fill: "#38b000", stroke: INK, "stroke-width": 6}, s.tree);
  s.rt = chip(s.stage, "RAIN TREE: strong, sturdy roots", "#6f4518", {fs: 28});
  s.store = el("g", {}, s.stage); s.items = [["🥕", "carrots"], ["", "turnips"], ["🍠", "sweet"]].map(([e, w], i) => { const g = el("g", {}, s.store);
    if (e) emo(g, 0, 0, 170, e); else { el("path", {d: "M0 -80 Q90 -60 70 30 Q40 90 0 110 Q-40 90 -70 30 Q-90 -60 0 -80 Z", fill: "#f8f9fa", stroke: INK, "stroke-width": 6}, g); el("path", {d: "M-62 -30 Q0 -70 62 -30 Q60 -70 0 -80 Q-60 -70 -62 -30 Z", fill: "#9d4edd"}, g); [-20, 0, 20].forEach(x => leaf(g, x, -80, 70, 24, -90 + x, "#52b788")); }
    const c = chip(g, ["carrot", "turnip", "sweet potato"][i], "#fff", {fs: 30, ink: INK}); tf(c, "translate(0 140)"); op(c, 1); return {g, w, x: 360 + i * 400}; });
  s.st = chip(s.stage, "STORAGE ROOTS store food made by the leaves 🍃➜🥕", "#e76f51", {fs: 32});
  s.run = t => { const a = w => C("roots1", w), b = w => C("roots2", w); const two = ramp(t, b("and") - .3, b("and") + .1);
    op(s.pond, ramp(t, a("water"), a("water") + .2) * (1 - two)); tf(s.pond, `translate(0 ${Math.sin(t * 2) * 4})`);
    op(s.wl, ramp(t, a("hairylooking") , a("hairylooking") + .2) * (1 - two)); popAt(s.wl, 400, 200, t, a("hairylooking"));
    op(s.tree, ramp(t, a("rain"), a("rain") + .2) * (1 - two)); op(s.rt, ramp(t, a("sturdy"), a("sturdy") + .2) * (1 - two)); popAt(s.rt, 1230, 200, t, a("sturdy"));
    s.items.forEach(it => { const k = b(it.w); op(it.g, ramp(t, k, k + .2)); popAt(it.g, it.x, 430, t, k); });
    op(s.st, ramp(t, b("storage"), b("storage") + .2)); popAt(s.st, 760, 170, t, b("storage")); }; return s; })();

// ---- SWEET POTATO
S.sweet = (() => { const s = scene("sweet", "#ff99c8", "#fcf6bd");
  s.big = emo(s.stage, 0, 0, 300, "🍠"); s.crown = emo(s.stage, 0, 0, 120, "⭐");
  s.ticks = [["🌱 easy to grow", "easy"], ["⏳ keeps longer than leafy vegetables", "keeps"], ["🍚 can replace rice", "replace"]].map(([l, w]) => ({c: chip(s.stage, "✓ " + l, "#06d6a0", {fs: 34}), w}));
  s.sg = chip(s.stage, "🇸🇬 community gardens: grow more of our own food", "#ef233c", {fs: 32});
  s.run = t => { const a = w => C("sweet", w);
    op(s.big, 1); tf(s.big, `translate(380 450) scale(${pop(t, SC.sweet.t0 - .2)}) rotate(${Math.sin(t * 2) * 5})`); set(s.big, "x", 0); set(s.big, "y", 0);
    op(s.crown, ramp(t, a("superstar"), a("superstar") + .2)); tf(s.crown, `translate(380 270) scale(${pop(t, a("superstar"))}) rotate(${t * 40})`); set(s.crown, "x", 0); set(s.crown, "y", 0);
    s.ticks.forEach((k, i) => { const tt = a(k.w); op(k.c, ramp(t, tt, tt + .2)); popAt(k.c, 980, 300 + i * 110, t, tt); });
    op(s.sg, ramp(t, a("community"), a("community") + .2)); popAt(s.sg, 760, 720, t, a("community")); }; return s; })();

// ---- STEM CUTTING
S.cutting = (() => { const s = scene("cutting", "#b8f2e6", "#aed9e0");
  el("rect", {x: 0, y: 700, width: 1920, height: 400, fill: "#ddb892"}, s.stage);
  s.badge = chip(s.stage, "🧑‍🏫 Ask an adult to help!", "#ef476f", {fs: 34});
  s.glass = el("g", {}, s.stage); el("rect", {x: -100, y: -140, width: 200, height: 160, fill: "#bde0fe", opacity: .8}, s.glass); el("path", {d: "M-115 -260 L-100 20 L100 20 L115 -260", fill: "none", stroke: INK, "stroke-width": 7}, s.glass);
  s.stem = el("rect", {x: -10, y: -380, width: 20, height: 380, rx: 9, fill: "#52b788", stroke: INK, "stroke-width": 4}, s.glass);
  [-1, 1].forEach(sd => leaf(s.glass, sd * 6, -360, 90, 34, sd < 0 ? 200 : -20));
  s.rts = []; for (let i = 0; i < 7; i++) s.rts.push(el("path", {d: `M0 0 q ${(i - 3) * 14} 40 ${(i - 3) * 22} 110`, transform: "translate(0 -10)", stroke: "#fbe7c6", "stroke-width": 5, fill: "none", "stroke-dasharray": 140, "stroke-dashoffset": 140}, s.glass));
  s.cal = el("g", {}, s.stage); el("rect", {x: -80, y: -80, width: 160, height: 160, rx: 18, fill: "#fff", stroke: INK, "stroke-width": 6}, s.cal); el("rect", {x: -80, y: -80, width: 160, height: 44, rx: 18, fill: "#e63946"}, s.cal); s.day = tx(s.cal, {x: 0, y: 45, "text-anchor": "middle", "font-size": 46, "font-weight": 700, fill: INK}, "day 1");
  s.pot = el("g", {}, s.stage); el("path", {d: "M-110 0 L110 0 L85 150 L-85 150 Z", fill: "#e76f51", stroke: INK, "stroke-width": 6}, s.pot); el("rect", {x: -10, y: -300, width: 20, height: 300, rx: 9, fill: "#52b788", stroke: INK, "stroke-width": 4}, s.pot);
  for (let i = 0; i < 6; i++) leaf(s.pot, (i % 2 ? 6 : -6), -280 + i * 45, 110, 40, i % 2 ? -20 : 200);
  s.new = chip(s.stage, "a whole NEW plant! 🎉", "#06d6a0", {fs: 38});
  s.run = t => { const a = w => C("cutting", w);
    op(s.badge, ramp(t, a("adult"), a("adult") + .2)); popAt(s.badge, 760, 150, t, a("adult"));
    const toPot = ramp(t, a("plant#2") - .3, a("plant#2") + .3);
    op(s.glass, ramp(t, a("cut"), a("cut") + .2) * (1 - toPot)); tf(s.glass, "translate(560 690)");
    const gr = ramp(t, a("roots") - .4, a("roots") + 1.2); s.rts.forEach((r, i) => set(r, "stroke-dashoffset", 140 * (1 - clamp(gr * 1.4 - i * .06))));
    op(s.cal, on(t, a("days") - .3, a("plant#2"), .2)); tf(s.cal, "translate(1050 380)"); s.day.textContent = "day " + Math.max(1, Math.round(lerp(1, 7, ramp(t, a("days") - .3, a("roots") + .5))));
    op(s.pot, toPot); tf(s.pot, `translate(760 540) scale(${pop(t, a("plant#2") - .2)})`);
    op(s.new, ramp(t, a("whole"), a("whole") + .2)); popAt(s.new, 1150, 420, t, a("whole")); }; return s; })();

// ---- RIDLEY (rubber tapping, perseverance)
S.ridley = (() => { const s = scene("ridley", "#d8f3dc", "#95d5b2");
  s.trunk = el("g", {}, s.stage); el("rect", {x: -90, y: -520, width: 180, height: 600, rx: 30, fill: "#a68a64", stroke: INK, "stroke-width": 7}, s.trunk);
  for (let i = 0; i < 6; i++) el("path", {d: `M-80 ${-460 + i * 70} Q0 ${-430 + i * 70} 80 ${-470 + i * 70}`, stroke: "#7f5539", "stroke-width": 4, fill: "none"}, s.trunk);
  s.cut = el("path", {d: "M-80 -260 L60 -200", stroke: "#fff", "stroke-width": 10, "stroke-linecap": "round", "stroke-dasharray": 160, "stroke-dashoffset": 160}, s.trunk);
  s.latex = el("circle", {r: 10, fill: "#fff", stroke: INK, "stroke-width": 2, opacity: 0}, s.trunk);
  el("path", {d: "M40 -140 L120 -140 L110 -80 L50 -80 Z", fill: "#adb5bd", stroke: INK, "stroke-width": 5}, s.trunk);
  s.name = chip(s.stage, "🌿 Henry Ridley · first director, Singapore Botanic Gardens", "#2d6a4f", {fs: 30});
  s.tries = [0, 1, 2, 3].map(i => tx(s.stage, {"font-size": 90, "font-weight": 700, fill: i < 3 ? "#e63946" : "#06d6a0", class: "out", "stroke-width": 8, "text-anchor": "middle"}, i < 3 ? "✗" : "✓"));
  s.alive = chip(s.stage, "latex collected · tree stays alive 🌳", "#fff", {fs: 30, ink: INK});
  s.region = chip(s.stage, "helped build the region's rubber industry", "#7b61ff", {fs: 30});
  s.run = t => { const a = w => C("ridley", w);
    tf(s.trunk, "translate(420 760)");
    op(s.name, ramp(t, a("henry"), a("henry") + .2)); popAt(s.name, 960, 170, t, a("henry"));
    s.tries.forEach((e, i) => { const tt = a("trying") + i * .45; op(e, ramp(t, tt, tt + .15)); set(e, "x", 860 + i * 130); set(e, "y", 380); tf(e, `translate(${860 + i * 130} 350) scale(${pop(t, tt)}) translate(${-(860 + i * 130)} -350)`); });
    set(s.cut, "stroke-dashoffset", 160 * (1 - ramp(t, a("collect") - .3, a("collect") + .3)));
    const k = ((t * .8) % 1); op(s.latex, t > a("latex") ? 1 : 0); set(s.latex, "cx", 70); set(s.latex, "cy", lerp(-200, -100, k));
    op(s.alive, ramp(t, a("harming"), a("harming") + .2)); popAt(s.alive, 1060, 510, t, a("harming"));
    op(s.region, ramp(t, a("region"), a("region") + .2)); popAt(s.region, 1060, 620, t, a("region")); }; return s; })();

// ---- QUIZ
S.quiz = (() => { const s = scene("quiz", "#b5179e", "#560bad");
  s.pause = tx(s.stage, {x: 760, y: 170, "text-anchor": "middle", "font-size": 72, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 12}, "⏸ PAUSE & PREDICT!");
  s.p = el("g", {}, s.stage); el("rect", {x: -13, y: -470, width: 26, height: 470, rx: 8, fill: "#adb5bd", stroke: INK, "stroke-width": 5}, s.p);
  let d = "M0 0"; for (let i = 0; i <= 30; i++) d += ` L${Math.sin(i * .7) * 32} ${-i * 15}`; el("path", {d, stroke: "#2d6a4f", "stroke-width": 9, fill: "none"}, s.p);
  for (let i = 0; i < 7; i++) leaf(s.p, i % 2 ? 28 : -28, -30 - i * 60, 70, 28, i % 2 ? -20 : 200, "#52b788");
  s.ring = el("g", {}, s.stage); el("circle", {r: 62, fill: "#ffbe0b", stroke: INK, "stroke-width": 6}, s.ring); s.rt = tx(s.ring, {x: 0, y: 22, "text-anchor": "middle", "font-size": 60, "font-weight": 700, fill: INK}, "3");
  s.a1 = chip(s.stage, "weak, NON-WOODY stem", "#7b61ff", {fs: 38}); s.a2 = chip(s.stage, "climbs ➜ more light ➜ more food", "#06d6a0", {fs: 36});
  s.run = t => { const a = w => C("quiz1", w), b = w => C("quiz2", w);
    op(s.pause, on(t, a("pause"), b("its"), .2)); tf(s.pause, `translate(760 170) scale(${pop(t, a("pause"))}) translate(-760 -170)`);
    tf(s.p, "translate(460 760)");
    const ct = clamp((t - a("stem")) / 3); op(s.ring, on(t, a("stem"), b("its"), .2)); tf(s.ring, "translate(1100 330)"); s.rt.textContent = Math.max(1, 3 - Math.floor(ct * 3));
    op(s.a1, ramp(t, b("weak"), b("weak") + .2)); popAt(s.a1, 1000, 420, t, b("weak")); op(s.a2, ramp(t, b("light"), b("light") + .2)); popAt(s.a2, 1000, 560, t, b("light")); }; return s; })();

// ---- EXAM
S.exam = (() => { const s = scene("exam", "#14213d", "#1d3557");
  const g = el("g", {transform: "translate(760 450)"}, s.stage);
  el("rect", {x: -670, y: -320, width: 1340, height: 640, rx: 34, fill: "#2b9348", stroke: "#8d5524", "stroke-width": 22, filter: "url(#sh)"}, g);
  tx(g, {x: -610, y: -240, "font-size": 50, "font-weight": 700, fill: "#ffe14d"}, "📝 EXAM CORNER · say it like this:");
  const L = [["🌵 Cactus: the spines are leaves, which reduce water loss."], ["🌵 The green stem makes food."], ["🌱 A climber has a weak stem. It climbs to get more", "     light to make food."], ["🥕 Storage roots, like carrots, store food."]];
  let y = -150; s.lines = L.map(ls => { const r = el("g", {opacity: 0}, g); ls.forEach((x, i) => tx(r, {x: -610, y: y + i * 48, "font-size": 38, "font-weight": 600, fill: "#fff"}, x)); y += ls.length * 48 + 34; return r; });
  s.run = t => { const a = w => C("exam", w); const k = [a("cactus"), a("green"), a("climbing"), a("storage")];
    s.lines.forEach((r, i) => { op(r, ramp(t, k[i] - .15, k[i] + .2)); tf(r, `translate(${(1 - ramp(t, k[i] - .15, k[i] + .3)) * -40} 0)`); }); }; return s; })();

// ---- HABIT (make it satisfying)
S.habit = (() => { const s = scene("habit", "#06d6a0", "#118ab2");
  s.title = tx(s.stage, {x: 760, y: 180, "text-anchor": "middle", "font-size": 80, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 12}, "😊 MAKE IT SATISFYING");
  s.grid = el("g", {}, s.stage); const days = ["M", "T", "W", "T", "F", "S", "S"]; s.cells = [];
  el("rect", {x: -470, y: -170, width: 940, height: 360, rx: 26, fill: "#fff", stroke: INK, "stroke-width": 6, filter: "url(#sh)"}, s.grid);
  tx(s.grid, {x: -430, y: -115, "font-size": 36, "font-weight": 700, fill: INK}, "🌱 Plant facts learnt");
  days.forEach((d, i) => { tx(s.grid, {x: -390 + i * 125, y: -40, "text-anchor": "middle", "font-size": 30, "font-weight": 700, fill: "#6c757d"}, d); el("rect", {x: -440 + i * 125, y: -10, width: 100, height: 100, rx: 18, fill: "#e9ecef", stroke: INK, "stroke-width": 4}, s.grid);
    s.cells.push(tx(s.grid, {x: -390 + i * 125, y: 70, "text-anchor": "middle", "font-size": 80, "font-weight": 700, fill: "#06d6a0", opacity: 0}, "✓")); });
  s.run = t => { const a = w => C("habit1", w);
    op(s.title, ramp(t, a("satisfying"), a("satisfying") + .2)); tf(s.title, `translate(760 180) scale(${pop(t, a("satisfying"))}) translate(-760 -180)`);
    op(s.grid, ramp(t, a("tick") - .3, a("tick"))); tf(s.grid, "translate(760 520)");
    s.cells.forEach((c, i) => { const tt = a("tick") + .3 + i * .55; op(c, ramp(t, tt, tt + .1)); tf(c, `translate(${-390 + i * 125} 40) scale(${pop(t, tt)}) translate(${390 - i * 125} -40)`); }); }; return s; })();

// ---- MIND MAP
S.mindmap = (() => { const s = scene("mindmap", "#fff3b0", "#ffd6a5");
  for (let i = 0; i < 16; i++) el("line", {x1: 0, y1: 120 + i * 60, x2: 1920, y2: 120 + i * 60, stroke: "#a2d2ff", "stroke-width": 2, opacity: .6}, s.stage);
  s.center = el("g", {}, s.stage); el("ellipse", {rx: 170, ry: 76, fill: "#2dc653", stroke: INK, "stroke-width": 7}, s.center); tx(s.center, {x: 0, y: 16, "text-anchor": "middle", "font-size": 44, "font-weight": 700, fill: "#fff"}, "PLANT PARTS");
  const br = [["leaves", "🍃 LEAVES", "#2dc653", 380, 320, ["spines (cactus)"]], ["stems", "🌿 STEMS", "#8b5e34", 360, 690, ["woody", "non-woody", "climbing"]], ["roots", "🥕 ROOTS", "#e76f51", 1010, 700, ["storage", "in water"]]];
  s.br = br.map(([k, n, col, x, y, subs]) => { const line = el("path", {d: `M720 480 Q${(720 + x) / 2} ${y} ${x} ${y}`, stroke: col, "stroke-width": 12, fill: "none", "stroke-linecap": "round", "stroke-dasharray": 700}, s.stage);
    return {k, line, c: chip(s.stage, n, col, {fs: 34}), x, y, tw: subs.map(sn => chip(s.stage, sn, "#fff", {fs: 24, ink: INK}))}; });
  s.stage.appendChild(s.center);
  s.ult = chip(s.stage, "🚀 TheOneApp · the ultimate science app", "#7209b7", {fs: 30});
  s.phone = el("g", {}, s.stage); el("rect", {x: -130, y: -240, width: 260, height: 480, rx: 40, fill: INK}, s.phone); el("rect", {x: -112, y: -205, width: 224, height: 410, rx: 20, fill: "#fff"}, s.phone);
  tx(s.phone, {x: 0, y: -168, "text-anchor": "middle", "font-size": 32, "font-weight": 700, fill: "#7209b7"}, "TheOneApp"); tx(s.phone, {x: 0, y: -138, "text-anchor": "middle", "font-size": 17, "font-weight": 600, fill: "#6c757d"}, "the ultimate science app");
  const cp = el("clipPath", {id: "scr4"}, $("v").querySelector("defs")); el("rect", {x: -112, y: -122, width: 224, height: 327, rx: 4}, cp);
  s.scr = el("g", {"clip-path": "url(#scr4)"}, s.phone); s.shot = el("image", {href: "oneapp_mind.png", x: -112, y: -122, width: 224, height: 485, preserveAspectRatio: "xMidYMin slice"}, s.scr);
  s.ring = el("rect", {fill: "none", stroke: "#f72585", "stroke-width": 5, rx: 13}, s.scr);
  s.run = t => { const a = w => C("habit2", w);
    op(s.center, ramp(t, a("plant"), a("plant") + .2)); tf(s.center, `translate(720 480) scale(${pop(t, a("plant"))})`);
    s.br.forEach(b => { const k = a(b.k); set(b.line, "stroke-dashoffset", 700 * (1 - ramp(t, k - .1, k + .4))); op(b.line, t > k - .1 ? 1 : 0); op(b.c, ramp(t, k + .15, k + .35)); popAt(b.c, b.x, b.y, t, k + .15);
      const n = b.tw.length; b.tw.forEach((tw, j) => { const tt = k + .6 + j * .3; op(tw, ramp(t, tt, tt + .2)); const ang = (j - (n - 1) / 2) * .6; popAt(tw, b.x + Math.sin(ang) * 240, b.y + (b.y < 480 ? -1 : 1) * (90 + (j % 2) * 50), t, tt); }); });
    op(s.ult, on(t, a("ultimate"), SC.mindmap.t1 + .5, .2)); popAt(s.ult, 760, 140, t, a("ultimate"));
    const ph = ramp(t, a("save"), a("save") + .6); op(s.phone, ph); tf(s.phone, `translate(${lerp(1650, 1340, ph)} 520) rotate(${lerp(12, -4, ph)})`);
    const off = -122 - 270 * ramp(t, a("ultimate"), SC.mindmap.t1); set(s.shot, "y", off);
    set(s.ring, "x", -112 + 224 * (36 / 780)); set(s.ring, "y", off + 485 * (1330 / 1688)); set(s.ring, "width", 224 * (290 / 780)); set(s.ring, "height", 485 * (72 / 1688));
    op(s.ring, on(t, SC.mindmap.t1 - .6, SC.mindmap.t1 + .5, .15) * (.6 + .4 * Math.sin(t * 8))); }; return s; })();

// ---- CLOSE
S.close = (() => { const s = scene("close", "#f15bb5", "#fee440");
  s.C = cactus(s.stage, .7);
  s.ans = chip(s.stage, "The SPINES are the leaves! 🌵", "#2d6a4f", {fs: 42});
  s.bubble = el("g", {}, s.stage); el("path", {d: "M-470 -90 H470 A40 40 0 0 1 510 -50 V50 A40 40 0 0 1 470 90 H-290 L-360 150 L-350 90 H-470 A40 40 0 0 1 -510 50 V-50 A40 40 0 0 1 -470 -90 Z", fill: "#fff", stroke: INK, "stroke-width": 7, filter: "url(#sh)"}, s.bubble);
  tx(s.bubble, {x: 0, y: 16, "text-anchor": "middle", "font-size": 40, "font-weight": 700, fill: INK}, "🔍 Spot a climber, creeper or storage root!");
  s.run = t => { const a = w => C("close", w); const bb = ramp(t, a("your") - .2, a("your") + .2);
    op(s.C.g, 1 - bb); tf(s.C.g, `translate(560 420) scale(${.7 * pop(t, SC.close.t0 - .2)})`);
    s.C.sp.forEach((l, i) => set(l, "stroke", t > a("spines") ? mix("#fefae0", "#ffe14d", .5 + .5 * Math.sin(t * 8 + i)) : "#fefae0"));
    op(s.ans, ramp(t, a("spines"), a("spines") + .2) * (1 - bb)); popAt(s.ans, 1150, 430, t, a("spines"));
    op(s.bubble, bb); tf(s.bubble, `translate(760 470) scale(${pop(t, a("your") - .2)})`); }; return s; })();

// ---- END CARD
S.end = (() => { const s = scene("end", "#3a0ca3", "#7209b7");
  tx(s.stage, {x: 960, y: 360, "text-anchor": "middle", "font-size": 44, "font-weight": 700, fill: "#ffe14d", "letter-spacing": 6}, "NEXT EPISODE");
  tx(s.stage, {x: 960, y: 480, "text-anchor": "middle", "font-size": 84, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 10}, "The 5 systems keeping");
  tx(s.stage, {x: 960, y: 580, "text-anchor": "middle", "font-size": 84, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 10}, "you alive right now ❤️");
  s.run = () => {}; return s; })();

