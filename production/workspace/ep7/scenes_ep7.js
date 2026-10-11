/* =================== SCENES (Episode 7: digestion part 2 — small + large intestine) =================== */
const S = {};
const hex = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
const mix = (h1, h2, k) => { const a = hex(h1), b = hex(h2); return "rgb(" + a.map((v, i) => Math.round(lerp(v, b[i], clamp(k)))).join(",") + ")"; };
const PINK = "#ffafcc", BROWN = "#a0522d";
function coilD(x0, y0, w, rows, gap) { let d = `M${x0} ${y0}`; for (let r = 0; r < rows; r++) { const y = y0 + r * gap, xe = r % 2 ? x0 : x0 + w; d += ` L${xe} ${y}`; if (r < rows - 1) d += ` A${gap / 2} ${gap / 2} 0 0 ${r % 2 ? 0 : 1} ${xe} ${y + gap}`; } return d; }
function tubePath(p, d, w, col) { const g = el("g", {}, p); const o = el("path", {d, fill: "none", stroke: INK, "stroke-width": w + 12, "stroke-linecap": "round", "stroke-linejoin": "round"}, g); const i = el("path", {d, fill: "none", stroke: col, "stroke-width": w, "stroke-linecap": "round", "stroke-linejoin": "round"}, g); return {g, o, i}; }
function miniSmall(p) { const g = el("g", {}, p); tubePath(g, coilD(-50, -50, 100, 5, 25), 12, PINK); return g; }
function miniLarge(p) { const g = el("g", {}, p); tubePath(g, "M-55 55 V-45 H55 V55", 28, "#f4a261"); return g; }

// ---- HOOK
S.hook = (() => { const s = scene("hook", "#ffd166", "#f77f00");
  s.tube = el("rect", {x: 0, y: -28, height: 56, rx: 28, fill: PINK, stroke: INK, "stroke-width": 7}, s.stage);
  s.ruler = el("g", {}, s.stage); el("line", {x1: 0, y1: 0, x2: 1300, y2: 0, stroke: "#fff", "stroke-width": 6}, s.ruler); [0, 1300].forEach(x => el("line", {x1: x, y1: -20, x2: x, y2: 20, stroke: "#fff", "stroke-width": 6}, s.ruler));
  s.len = tx(s.stage, {x: 760, y: 700, "text-anchor": "middle", "font-size": 96, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 12}, "about 6.5 metres!");
  s.gir = emo(s.stage, 0, 0, 300, "🦒"); s.vs = chip(s.stage, "longer than a giraffe is tall!", "#e63946", {fs: 40});
  s.kid = emo(s.stage, 0, 0, 260, "🧒"); s.q = tx(s.stage, {x: 0, y: 0, "text-anchor": "middle", "font-size": 160, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 12}, "?"); s.lunch = emo(s.stage, 0, 0, 120, "🍱");
  s.run = t => { const a = w => C("hook", w); const g = ramp(t, a("tube") - .3, a("long") + .3), fit = ramp(t, a("fit") - .2, a("fit") + .5);
    set(s.tube, "width", 1300 * g); tf(s.tube, `translate(${lerp(110, 700, fit)} ${lerp(470, 470, fit)}) scale(${1 - fit * .9} 1)`); op(s.tube, 1 - fit);
    op(s.ruler, ramp(t, a("six"), a("six") + .2) * (1 - fit)); tf(s.ruler, "translate(110 560)");
    op(s.len, on(t, a("six"), a("fit") - .2, .2)); tf(s.len, `translate(760 700) scale(${pop(t, a("six"))}) translate(-760 -700)`);
    op(s.gir, on(t, a("giraffe") - .3, a("fit") - .2, .2)); set(s.gir, "x", 1280); set(s.gir, "y", 250);
    op(s.vs, on(t, a("giraffe"), a("fit") - .2, .2)); popAt(s.vs, 760, 200, t, a("giraffe"));
    op(s.kid, fit); set(s.kid, "x", 700); set(s.kid, "y", 470); op(s.q, fit); set(s.q, "x", 900); set(s.q, "y", 420 + Math.sin(t * 5) * 8);
    op(s.lunch, ramp(t, a("lunch"), a("lunch") + .2)); set(s.lunch, "x", 520); set(s.lunch, "y", 380); }; return s; })();

// ---- RECAP
S.recap = (() => { const s = scene("recap", "#90e0ef", "#00b4d8");
  const xs = [260, 480, 700, 920, 1140];
  s.line = el("line", {x1: 260, y1: 460, x2: 1140, y2: 460, stroke: "#fff", "stroke-width": 10, "stroke-dasharray": "18 16"}, s.stage);
  s.nodes = xs.map((x, i) => { const g = el("g", {}, s.stage); el("circle", {r: 90, fill: "#fff", stroke: INK, "stroke-width": 7}, g);
    if (i < 3) emo(g, 0, 0, 100, ["👄", "⬇️", "🫃"][i]); else tx(g, {x: 0, y: 30, "text-anchor": "middle", "font-size": 100, "font-weight": 700, fill: "#adb5bd"}, "?");
    tx(g, {x: 0, y: 140, "text-anchor": "middle", "font-size": 32, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 7}, ["mouth", "gullet", "stomach", "stop 4", "stop 5"][i]); return g; });
  s.soup = emo(s.stage, 0, 0, 110, "🥣"); s.part = chip(s.stage, "PART 2: the second half of the journey ➜", "#7209b7", {fs: 36});
  s.run = t => { const a = w => C("recap", w); const k = [a("mouth"), a("gullet"), a("stomach"), a("second"), a("second") + .3];
    s.nodes.forEach((n, i) => { op(n, ramp(t, k[i], k[i] + .2)); tf(n, `translate(${xs[i]} 460) scale(${pop(t, k[i])})`); });
    op(s.soup, ramp(t, a("soupy"), a("soupy") + .2)); set(s.soup, "x", 700); set(s.soup, "y", 260 + Math.sin(t * 4) * 6);
    op(s.part, ramp(t, a("second"), a("second") + .2)); popAt(s.part, 760, 760, t, a("second")); }; return s; })();

// ---- SMALL INTESTINE
S.small = (() => { const s = scene("small", "#ffc8dd", "#ffafcc");
  s.straight = el("rect", {x: 100, y: 432, width: 1300, height: 36, rx: 18, fill: PINK, stroke: INK, "stroke-width": 6}, s.stage);
  s.belly = el("ellipse", {cx: 640, cy: 470, rx: 330, ry: 300, fill: "#fff0f3", stroke: INK, "stroke-width": 6, "stroke-dasharray": "20 14"}, s.stage);
  s.coil = tubePath(s.stage, coilD(470, 250, 340, 9, 55), 30, PINK); s.coilLen = 9 * 340 + 8 * Math.PI * 27.5;
  [s.coil.o, s.coil.i].forEach(p => set(p, "stroke-dasharray", s.coilLen));
  s.food = []; seed = 4; for (let i = 0; i < 14; i++) s.food.push({ph: rnd(), e: el("circle", {r: 9, fill: "#f3d5b5", stroke: "#d4a373", "stroke-width": 3}, s.stage)});
  s.drops = []; for (let i = 0; i < 8; i++) s.drops.push({ph: i / 8, e: emo(s.stage, 0, 0, 40, "🧪")});
  s.c1 = chip(s.stage, "SMALL INTESTINE: long + narrow", "#ef476f", {fs: 34}); s.c2 = chip(s.stage, "folded + coiled up 🌀 so it fits", "#1b1b3a", {fs: 32});
  s.c3 = chip(s.stage, "walls make MORE digestive juices", "#06d6a0", {fs: 32}); s.c4 = chip(s.stage, "➜ simple substances the body can use", "#3a86ff", {fs: 30});
  s.stamp = el("g", {}, s.stage); el("rect", {x: -300, y: -60, width: 600, height: 120, rx: 18, fill: "#fff", stroke: "#e63946", "stroke-width": 10}, s.stamp); tx(s.stamp, {x: 0, y: 22, "text-anchor": "middle", "font-size": 56, "font-weight": 700, fill: "#e63946"}, "🏁 DIGESTION ENDS!");
  s.run = t => { const a = w => C("small1", w), b = w => C("small2", w); const coil = ramp(t, a("folded") - .2, a("coiled") + .6);
    op(s.straight, ramp(t, a("long") - .3, a("long")) * (1 - ramp(t, a("folded") - .3, a("folded")))); tf(s.straight, `scale(${ramp(t, a("long") - .3, a("long") + .4)} 1)`);
    op(s.belly, ramp(t, a("folded") - .3, a("folded"))); [s.coil.o, s.coil.i].forEach(p => set(p, "stroke-dashoffset", s.coilLen * (1 - coil))); op(s.coil.g, coil > 0 ? 1 : 0);
    const dig = ramp(t, b("digest"), b("ends")); s.food.forEach((f, i) => { const k = (t * .05 + f.ph) % 1; const row = Math.floor(k * 9), fr = (k * 9) % 1;
      set(f.e, "cx", 470 + (row % 2 ? 1 - fr : fr) * 340); set(f.e, "cy", 250 + row * 55); set(f.e, "r", 9 * (1 - dig * .55)); op(f.e, ramp(t, SC.small.t0 + 1, SC.small.t0 + 1.5) * coil); });
    s.drops.forEach((d, i) => { const k = ((t * .7 + d.ph) % 1); set(d.e, "x", 470 + i * 48); set(d.e, "y", lerp(200, 700, k)); op(d.e, on(t, b("juices"), b("ends"), .3) * Math.sin(k * Math.PI)); });
    op(s.c1, ramp(t, a("intestine"), a("intestine") + .2) * (1 - ramp(t, b("walls") - .3, b("walls")))); popAt(s.c1, 1220, 300, t, a("intestine"));
    op(s.c2, ramp(t, a("coiled"), a("coiled") + .2) * (1 - ramp(t, b("walls") - .3, b("walls")))); popAt(s.c2, 1220, 420, t, a("coiled"));
    op(s.c3, ramp(t, b("walls"), b("walls") + .2)); popAt(s.c3, 1220, 300, t, b("walls"));
    op(s.c4, ramp(t, b("simple"), b("simple") + .2)); popAt(s.c4, 1220, 420, t, b("simple"));
    op(s.stamp, ramp(t, b("ends"), b("ends") + .15)); tf(s.stamp, `translate(640 840) rotate(-4) scale(${1.4 - .4 * ramp(t, b("ends"), b("ends") + .25)})`); }; return s; })();

// ---- ABSORPTION
S.absorb = (() => { const s = scene("absorb", "#ffe5ec", "#ffc2d1");
  el("rect", {x: 120, y: 170, width: 1040, height: 150, fill: "#fff0f3", stroke: "none"}, s.stage);
  s.wall = el("g", {}, s.stage); el("rect", {x: 120, y: 320, width: 1040, height: 60, fill: PINK, stroke: INK, "stroke-width": 5}, s.wall); for (let i = 0; i < 14; i++) el("path", {d: `M${150 + i * 74} 320 q20 -50 40 0`, fill: PINK, stroke: INK, "stroke-width": 4}, s.wall);
  s.ves = el("rect", {x: 120, y: 470, width: 1040, height: 110, rx: 55, fill: "#e63946", stroke: INK, "stroke-width": 6}, s.stage);
  s.l1 = tx(s.stage, {x: 140, y: 220, "font-size": 32, "font-weight": 700, fill: "#9d0208"}, "inside the small intestine"); s.l2 = tx(s.stage, {x: 140, y: 630, "font-size": 32, "font-weight": 700, fill: "#9d0208"}, "blood vessel 🩸");
  s.dots = []; seed = 9; for (let i = 0; i < 22; i++) s.dots.push({x: 160 + rnd() * 940, dl: rnd() * 1.6, e: el("circle", {r: 11, fill: "#ffd166", stroke: INK, "stroke-width": 3}, s.stage)});
  s.c1 = chip(s.stage, "digested food ➜ absorbed INTO THE BLOOD", "#d00000", {fs: 34});
  s.kid = emo(s.stage, 0, 0, 150, "🧒"); s.icons = ["🏃", "🧠", "🌱"].map(e => emo(s.stage, 0, 0, 100, e));
  s.run = t => { const a = w => C("absorb", w); const ab = t - a("absorbed"), fl = Math.max(0, t - a("carries"));
    s.dots.forEach(d => { const k = clamp((ab - d.dl) / 1.2); let x = d.x + fl * 160; x = 160 + ((x - 160) % 960 + 960) % 960;
      set(d.e, "cx", x); set(d.e, "cy", lerp(250 + Math.sin(t * 2 + d.x) * 20, 525 + Math.sin(d.x) * 25, k)); op(d.e, ramp(t, SC.absorb.t0, SC.absorb.t0 + .5)); });
    op(s.c1, ramp(t, a("blood"), a("blood") + .2)); popAt(s.c1, 640, 110, t, a("blood"));
    op(s.kid, ramp(t, a("energy"), a("energy") + .2)); set(s.kid, "x", 400); set(s.kid, "y", 760);
    [a("run"), a("think"), a("grow")].forEach((tt, i) => { op(s.icons[i], ramp(t, tt, tt + .2)); set(s.icons[i], "x", 620 + i * 190); set(s.icons[i], "y", 770 - 20 * pop(t, tt) + 20); }); }; return s; })();

// ---- LARGE INTESTINE
S.large = (() => { const s = scene("large", "#ffe8d6", "#ffd8be");
  s.sm = el("rect", {x: 160, y: 200, width: 840, height: 40, rx: 20, fill: PINK, stroke: INK, "stroke-width": 6}, s.stage); s.smL = tx(s.stage, {x: 160, y: 170, "font-size": 30, "font-weight": 700, fill: "#9d0208"}, "small intestine: narrow + long");
  s.lg = el("rect", {x: 160, y: 380, width: 520, height: 170, rx: 85, fill: "#f4a261", stroke: INK, "stroke-width": 7}, s.stage); s.lgL = tx(s.stage, {x: 160, y: 350, "font-size": 30, "font-weight": 700, fill: "#9c4a00"}, "LARGE intestine");
  s.wide = chip(s.stage, "↕ WIDER", "#f77f00", {fs: 34}); s.short = chip(s.stage, "↔ SHORTER", "#1b1b3a", {fs: 34});
  s.blobs = []; for (let i = 0; i < 6; i++) s.blobs.push({ph: i / 6, e: el("ellipse", {rx: 34, ry: 26, fill: BROWN, stroke: INK, "stroke-width": 4}, s.stage)});
  s.drops = []; for (let i = 0; i < 8; i++) s.drops.push({ph: i / 8, e: emo(s.stage, 0, 0, 46, "💧")});
  s.c1 = chip(s.stage, "receives UNDIGESTED food", "#6c757d", {fs: 32}); s.c2 = chip(s.stage, "absorbs WATER 💧", "#00b4d8", {fs: 34}); s.c3 = chip(s.stage, "waste becomes more SOLID", "#8d6e63", {fs: 32});
  s.run = t => { const a = w => C("large", w); const dry = ramp(t, a("water"), a("solid") + .3);
    op(s.sm, 1); op(s.smL, 1); op(s.lg, ramp(t, a("intestine") - .2, a("intestine"))); op(s.lgL, ramp(t, a("intestine") - .2, a("intestine")));
    op(s.wide, on(t, a("wider"), a("undigested"), .2)); popAt(s.wide, 800, 430, t, a("wider")); op(s.short, on(t, a("shorter"), a("undigested"), .2)); popAt(s.short, 800, 510, t, a("shorter"));
    s.blobs.forEach(b => { const k = (t * .12 + b.ph) % 1; set(b.e, "cx", 220 + k * 400); set(b.e, "cy", 465); set(b.e, "rx", 34 - dry * 8); set(b.e, "ry", 26 - dry * 6);
      set(b.e, "fill", mix("#d4a373", "#6f3b1f", dry)); op(b.e, ramp(t, a("undigested"), a("undigested") + .3)); });
    s.drops.forEach((d, i) => { const k = ((t * .6 + d.ph) % 1); set(d.e, "x", 240 + i * 52); set(d.e, "y", lerp(460, 640, k)); op(d.e, ramp(t, a("water"), a("water") + .3) * Math.sin(k * Math.PI)); });
    [[s.c1, a("undigested"), 640], [s.c2, a("absorbs"), 740], [s.c3, a("solid"), 840]].forEach(([c, tt, y]) => { op(c, ramp(t, tt, tt + .2)); popAt(c, 1180, y - 200, t, tt); }); }; return s; })();

// ---- EXIT (rectum + anus)
S.exit = (() => { const s = scene("exit", "#d8f3dc", "#b7e4c7");
  s.tube = el("path", {d: "M-200 -260 H0 V140", fill: "none", stroke: INK, "stroke-width": 112, "stroke-linejoin": "round"}, s.stage); s.tubeI = el("path", {d: "M-200 -260 H0 V140", fill: "none", stroke: "#f4a261", "stroke-width": 100, "stroke-linejoin": "round"}, s.stage);
  s.rect = el("rect", {x: -50, y: -40, width: 100, height: 180, rx: 20, fill: "#e76f51", stroke: INK, "stroke-width": 6}, s.stage);
  s.blob = el("ellipse", {rx: 30, ry: 24, fill: "#6f3b1f", stroke: INK, "stroke-width": 4}, s.stage); s.toilet = emo(s.stage, 0, 0, 150, "🚽");
  s.c1 = chip(s.stage, "RECTUM: stores the waste", "#e76f51", {fs: 34}); s.c2 = chip(s.stage, "ANUS: waste leaves the body", "#8d6e63", {fs: 34}); s.c3 = chip(s.stage, "😄 yes, that's science too!", "#06d6a0", {fs: 36});
  s.run = t => { const a = w => C("exit", w); const X = 560, Y = 400;
    [s.tube, s.tubeI, s.rect].forEach(e => tf(e, `translate(${X} ${Y})`)); op(s.rect, ramp(t, a("rectum"), a("rectum") + .2));
    const k1 = ramp(t, SC.exit.t0 + .3, a("rectum")), k2 = ramp(t, a("leaves"), a("anus") + .8);
    set(s.blob, "cx", X + (k1 < .5 ? lerp(-200, 0, k1 * 2) : 0)); set(s.blob, "cy", Y + (k1 < .5 ? -260 : lerp(-260, 50, (k1 - .5) * 2)) + k2 * 330); op(s.blob, 1 - ramp(t, a("toilet"), a("toilet") + .3));
    op(s.toilet, ramp(t, a("toilet") - .4, a("toilet"))); set(s.toilet, "x", X); set(s.toilet, "y", Y + 420);
    op(s.c1, ramp(t, a("rectum"), a("rectum") + .2)); popAt(s.c1, 1150, 360, t, a("rectum"));
    op(s.c2, ramp(t, a("anus"), a("anus") + .2)); popAt(s.c2, 1150, 480, t, a("anus"));
    op(s.c3, ramp(t, a("science"), a("science") + .2)); popAt(s.c3, 1150, 640, t, a("science")); }; return s; })();

// ---- FIBRE
S.fibre = (() => { const s = scene("fibre", "#caffbf", "#80ed99");
  s.fr = ["🍎", "🍌", "🍊"].map(e => emo(s.stage, 0, 0, 100, e)); s.vg = ["🥦", "🥕", "🥬"].map(e => emo(s.stage, 0, 0, 100, e));
  s.t1 = el("rect", {x: 160, y: 470, width: 760, height: 90, rx: 45, fill: "#f4a261", stroke: INK, "stroke-width": 6}, s.stage); s.t2 = el("rect", {x: 160, y: 700, width: 760, height: 90, rx: 45, fill: "#f4a261", stroke: INK, "stroke-width": 6}, s.stage);
  s.b1 = []; s.b2 = []; for (let i = 0; i < 5; i++) { s.b1.push(el("ellipse", {rx: 30, ry: 22, fill: "#8d5524", stroke: INK, "stroke-width": 3}, s.stage)); s.b2.push(el("ellipse", {rx: 30, ry: 22, fill: "#5c3317", stroke: INK, "stroke-width": 3}, s.stage)); }
  s.ok = chip(s.stage, "✓ with fibre: moves SMOOTHLY", "#38b000", {fs: 30}); s.bad = chip(s.stage, "✗ too little fibre: hard + uncomfortable 😣", "#e63946", {fs: 30});
  s.plate = el("g", {}, s.stage); el("ellipse", {rx: 200, ry: 130, fill: "#fff", stroke: INK, "stroke-width": 7, filter: "url(#sh)"}, s.plate); el("ellipse", {cx: -50, rx: 80, ry: 55, fill: "#fff8e7", stroke: "#e9d8a6", "stroke-width": 4}, s.plate);
  s.kk = emo(s.stage, 0, 0, 90, "🥬"); s.br = emo(s.stage, 0, 0, 90, "🥦"); s.kl = chip(s.stage, "kangkong", "#fff", {fs: 26, ink: INK}); s.bl = chip(s.stage, "broccoli", "#fff", {fs: 26, ink: INK});
  s.run = t => { const a = w => C("fibre", w);
    s.fr.forEach((e, i) => { op(e, ramp(t, a("fruits") + i * .15, a("fruits") + i * .15 + .2)); set(e, "x", 220 + i * 130); set(e, "y", 260); });
    s.vg.forEach((e, i) => { op(e, ramp(t, a("vegetables") + i * .15, a("vegetables") + i * .15 + .2)); set(e, "x", 640 + i * 130); set(e, "y", 260); });
    op(s.t1, ramp(t, a("smoothly") - .5, a("smoothly"))); s.b1.forEach((b, i) => { const k = (t * .35 + i / 5) % 1; set(b, "cx", 200 + k * 680); set(b, "cy", 515); op(b, ramp(t, a("smoothly") - .5, a("smoothly")) * Math.min(1, Math.sin(k * Math.PI) * 4)); });
    op(s.ok, ramp(t, a("smoothly"), a("smoothly") + .2)); popAt(s.ok, 540, 420, t, a("smoothly"));
    op(s.t2, ramp(t, a("little") - .3, a("little"))); s.b2.forEach((b, i) => { set(b, "cx", 240 + i * 66 + Math.sin(t * 20 + i) * 2); set(b, "cy", 745); op(b, ramp(t, a("little") - .3, a("little"))); });
    op(s.bad, ramp(t, a("uncomfortable") - .4, a("uncomfortable"))); popAt(s.bad, 540, 650, t, a("uncomfortable") - .4);
    op(s.plate, ramp(t, a("greens") - .3, a("greens"))); tf(s.plate, `translate(1230 560) scale(${pop(t, a("greens") - .3)})`);
    op(s.kk, ramp(t, a("kangkong"), a("kangkong") + .2)); set(s.kk, "x", 1290); set(s.kk, "y", 520); op(s.kl, ramp(t, a("kangkong"), a("kangkong") + .2)); popAt(s.kl, 1290, 400, t, a("kangkong"));
    op(s.br, ramp(t, a("broccoli"), a("broccoli") + .2)); set(s.br, "x", 1190); set(s.br, "y", 600); op(s.bl, ramp(t, a("broccoli"), a("broccoli") + .2)); popAt(s.bl, 1190, 730, t, a("broccoli")); }; return s; })();

// ---- TEAMWORK
S.team = (() => { const s = scene("team", "#bde0fe", "#a2d2ff");
  const xs = [220, 440, 660, 880, 1100];
  s.links = xs.slice(1).map((x, i) => el("line", {x1: xs[i], y1: 380, x2: x, y2: 380, stroke: INK, "stroke-width": 10}, s.stage));
  s.nodes = xs.map((x, i) => { const g = el("g", {}, s.stage); const c = el("circle", {r: 85, fill: "#fff", stroke: INK, "stroke-width": 7}, g);
    if (i < 3) emo(g, 0, 0, 90, ["👄", "⬇️", "🫃"][i]); else (i === 3 ? miniSmall : miniLarge)(g); return {g, c}; });
  s.x = tx(s.stage, {x: 880, y: 430, "text-anchor": "middle", "font-size": 180, "font-weight": 700, fill: "#e63946", class: "out", "stroke-width": 10}, "✗");
  s.c0 = chip(s.stage, "every part must work well ✓", "#06d6a0", {fs: 34});
  s.kid = emo(s.stage, 0, 0, 150, "😩"); s.food = emo(s.stage, 0, 0, 100, "🍱"); s.c1 = chip(s.stage, "MALNOURISHED: eats, but can't absorb enough", "#6c757d", {fs: 32});
  s.run = t => { const a = w => C("team", w); const rm = ramp(t, a("removed"), a("removed") + .3);
    s.nodes.forEach((n, i) => { const tt = SC.team.t0 + .2 + i * .25; op(n.g, ramp(t, tt, tt + .2) * (i === 3 ? 1 - rm * .6 : 1)); tf(n.g, `translate(${xs[i]} 380) scale(${pop(t, tt)})`); });
    s.links.forEach((l, i) => { op(l, ramp(t, a("whole") - .3, a("whole")) * ((i === 2 || i === 3) ? 1 - rm : 1)); });
    op(s.c0, on(t, a("whole"), a("removed"), .2)); popAt(s.c0, 660, 180, t, a("whole"));
    op(s.x, rm); tf(s.x, `translate(880 430) scale(${pop(t, a("removed"))}) translate(-880 -430)`);
    op(s.kid, ramp(t, a("malnourished") - .3, a("malnourished"))); set(s.kid, "x", 420); set(s.kid, "y", 680);
    op(s.food, ramp(t, a("eat"), a("eat") + .2)); set(s.food, "x", 580); set(s.food, "y", 700);
    op(s.c1, ramp(t, a("malnourished"), a("malnourished") + .2)); popAt(s.c1, 960, 690, t, a("malnourished")); }; return s; })();

// ---- QUIZ
S.quiz = (() => { const s = scene("quiz", "#b5179e", "#560bad");
  s.pause = tx(s.stage, {x: 760, y: 150, "text-anchor": "middle", "font-size": 72, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 12}, "⏸ PAUSE & PREDICT!");
  s.q1 = chip(s.stage, "Q1: where does digestion END?", "#ef476f", {fs: 32}); s.q2 = chip(s.stage, "Q2: which part absorbs WATER?", "#00b4d8", {fs: 32});
  s.cards = [["STOMACH", ""], ["SMALL", "INTESTINE"], ["LARGE", "INTESTINE"]].map(([n1, n2], i) => { const g = el("g", {}, s.stage);
    const face = el("rect", {x: -160, y: -170, width: 320, height: 340, rx: 30, fill: "#fff", stroke: INK, "stroke-width": 7, filter: "url(#sh)"}, g);
    const ic = el("g", {transform: "translate(0 -55)"}, g); if (i === 0) emo(ic, 0, 0, 110, "🫃"); else (i === 1 ? miniSmall : miniLarge)(ic);
    tx(g, {x: 0, y: 70, "text-anchor": "middle", "font-size": 40, "font-weight": 700, fill: INK}, n1); tx(g, {x: 0, y: 115, "text-anchor": "middle", "font-size": 34, "font-weight": 700, fill: INK}, n2);
    const tag = chip(g, i === 1 ? "Q1 ✓" : "Q2 ✓", i === 1 ? "#ef476f" : "#00b4d8", {fs: 34}); return {g, face, tag, i}; });
  s.run = t => { const a = w => C("quiz1", w), b = w => C("quiz2", w);
    op(s.pause, on(t, a("pause"), b("digestion"), .2)); tf(s.pause, `translate(760 150) scale(${pop(t, a("pause"))}) translate(-760 -150)`);
    op(s.q1, ramp(t, a("end"), a("end") + .2)); popAt(s.q1, 460, 260, t, a("end")); op(s.q2, ramp(t, a("water"), a("water") + .2)); popAt(s.q2, 1060, 260, t, a("water"));
    const rv = [Infinity, b("small"), b("large")];
    s.cards.forEach(c => { const tt = a("pause") + .3 + c.i * .25; op(c.g, ramp(t, tt, tt + .2)); tf(c.g, `translate(${360 + c.i * 400} 560) scale(${pop(t, tt)})`);
      set(c.face, "fill", t > rv[c.i] ? "#d8f3dc" : (c.i === 0 && t > b("small") ? "#ffccd5" : "#fff")); op(c.tag, c.i ? ramp(t, rv[c.i], rv[c.i] + .2) : 0); if (c.i) popAt(c.tag, 0, -200, t, rv[c.i]); }); }; return s; })();

// ---- EXAM
S.exam = (() => { const s = scene("exam", "#14213d", "#1d3557");
  const g = el("g", {transform: "translate(760 450)"}, s.stage);
  el("rect", {x: -670, y: -320, width: 1340, height: 640, rx: 34, fill: "#2b9348", stroke: "#8d5524", "stroke-width": 22, filter: "url(#sh)"}, g);
  tx(g, {x: -610, y: -240, "font-size": 50, "font-weight": 700, fill: "#ffe14d"}, "📝 EXAM CORNER · say it like this:");
  const L = [["🌀 In the small intestine, food is mixed with more", "     digestive juices and digested further."], ["🏁 Digestion ends there, and digested food is", "     absorbed into the blood."], ["💧 The large intestine absorbs water from the", "     undigested food."]];
  let y = -150; s.lines = L.map(ls => { const r = el("g", {opacity: 0}, g); ls.forEach((x, i) => tx(r, {x: -610, y: y + i * 50, "font-size": 40, "font-weight": 600, fill: "#fff"}, x)); y += ls.length * 50 + 40; return r; });
  s.run = t => { const a = w => C("exam", w); const k = [a("small"), a("ends"), a("large")];
    s.lines.forEach((r, i) => { op(r, ramp(t, k[i] - .15, k[i] + .2)); tf(r, `translate(${(1 - ramp(t, k[i] - .15, k[i] + .3)) * -40} 0)`); }); }; return s; })();

// ---- HABIT (make it easy)
S.habit = (() => { const s = scene("habit", "#06d6a0", "#118ab2");
  s.title = tx(s.stage, {x: 760, y: 180, "text-anchor": "middle", "font-size": 76, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 12}, "🧩 MAKE IT EASY");
  s.desk = el("g", {}, s.stage); el("rect", {x: -380, y: -20, width: 760, height: 40, rx: 12, fill: "#bc6c25", stroke: INK, "stroke-width": 6}, s.desk); [-330, 330].forEach(x => el("rect", {x: x - 15, y: 20, width: 30, height: 200, fill: "#bc6c25", stroke: INK, "stroke-width": 6}, s.desk));
  s.notes = emo(s.stage, 0, 0, 130, "📒"); s.pen = emo(s.stage, 0, 0, 110, "🖊️"); s.moon = emo(s.stage, 0, 0, 110, "🌙"); s.sun = emo(s.stage, 0, 0, 110, "☀️");
  s.likely = chip(s.stage, "nothing to set up ➜ easy to start ✓", "#1b1b3a", {fs: 34});
  s.run = t => { const a = w => C("habit1", w);
    op(s.title, ramp(t, a("easy"), a("easy") + .2)); tf(s.title, `translate(760 180) scale(${pop(t, a("easy"))}) translate(-760 -180)`);
    op(s.desk, ramp(t, a("tonight") - .3, a("tonight"))); tf(s.desk, "translate(640 560)");
    const n = ramp(t, a("notes"), a("notes") + .5), p = ramp(t, a("pen"), a("pen") + .5);
    op(s.notes, n > 0 ? 1 : 0); set(s.notes, "x", 560); set(s.notes, "y", lerp(260, 490, n)); op(s.pen, p > 0 ? 1 : 0); set(s.pen, "x", 740); set(s.pen, "y", lerp(260, 500, p));
    const day = ramp(t, a("tomorrow"), a("tomorrow") + .4); op(s.moon, ramp(t, a("tonight"), a("tonight") + .2) * (1 - day)); set(s.moon, "x", 1120); set(s.moon, "y", 360);
    op(s.sun, day); set(s.sun, "x", 1120); set(s.sun, "y", 360); tf(s.sun, `rotate(${t * 20} 1120 360)`);
    op(s.likely, ramp(t, a("nothing"), a("nothing") + .2)); popAt(s.likely, 760, 860, t, a("nothing")); }; return s; })();

// ---- MIND MAP
S.mindmap = (() => { const s = scene("mindmap", "#fff3b0", "#ffd6a5");
  for (let i = 0; i < 16; i++) el("line", {x1: 0, y1: 120 + i * 60, x2: 1920, y2: 120 + i * 60, stroke: "#a2d2ff", "stroke-width": 2, opacity: .6}, s.stage);
  const CX = 640, CY = 480;
  s.center = el("g", {}, s.stage); el("ellipse", {rx: 200, ry: 80, fill: "#9d4edd", stroke: INK, "stroke-width": 7}, s.center); tx(s.center, {x: 0, y: -4, "text-anchor": "middle", "font-size": 40, "font-weight": 700, fill: "#fff"}, "DIGESTIVE"); tx(s.center, {x: 0, y: 38, "text-anchor": "middle", "font-size": 40, "font-weight": 700, fill: "#fff"}, "SYSTEM");
  const br = [["mouth", "👄 MOUTH", "#e63946", 300, 240, "digestion begins"], ["gullet", "⬇️ GULLET", "#ef476f", 250, 700, "pushes food down"], ["stomach", "🫃 STOMACH", "#7b2cbf", 980, 240, "mixes with juices"],
    ["small", "🌀 SMALL INTESTINE", "#d00000", 660, 780, "digestion ends + into blood"], ["large", "LARGE INTESTINE", "#f77f00", 1010, 640, "absorbs water"]];
  s.br = br.map(([k, n, col, x, y, sub]) => { const line = el("path", {d: `M${CX} ${CY} Q${(CX + x) / 2} ${y} ${x} ${y}`, stroke: col, "stroke-width": 12, fill: "none", "stroke-linecap": "round", "stroke-dasharray": 800}, s.stage);
    return {k, line, c: chip(s.stage, n, col, {fs: 32}), x, y, tw: chip(s.stage, sub, "#fff", {fs: 26, ink: INK})}; });
  s.stage.appendChild(s.center);
  s.ult = chip(s.stage, "🚀 TheOneApp · the ultimate science app", "#7209b7", {fs: 30});
  s.phone = el("g", {}, s.stage); el("rect", {x: -130, y: -240, width: 260, height: 480, rx: 40, fill: INK}, s.phone); el("rect", {x: -112, y: -205, width: 224, height: 410, rx: 20, fill: "#fff"}, s.phone);
  tx(s.phone, {x: 0, y: -168, "text-anchor": "middle", "font-size": 32, "font-weight": 700, fill: "#7209b7"}, "TheOneApp"); tx(s.phone, {x: 0, y: -138, "text-anchor": "middle", "font-size": 17, "font-weight": 600, fill: "#6c757d"}, "the ultimate science app");
  const cp = el("clipPath", {id: "scr7"}, $("v").querySelector("defs")); el("rect", {x: -112, y: -122, width: 224, height: 327, rx: 4}, cp);
  s.scr = el("g", {"clip-path": "url(#scr7)"}, s.phone); s.shot = el("image", {href: "oneapp_mind.png", x: -112, y: -122, width: 224, height: 485, preserveAspectRatio: "xMidYMin slice"}, s.scr);
  s.ring = el("rect", {fill: "none", stroke: "#f72585", "stroke-width": 5, rx: 13}, s.scr);
  s.run = t => { const a = w => C("habit2", w);
    op(s.center, ramp(t, a("digestive"), a("digestive") + .2)); tf(s.center, `translate(${CX} ${CY}) scale(${pop(t, a("digestive"))})`);
    s.br.forEach((b, j) => { const k = a(b.k); set(b.line, "stroke-dashoffset", 800 * (1 - ramp(t, k - .1, k + .4))); op(b.line, t > k - .1 ? 1 : 0); op(b.c, ramp(t, k + .1, k + .3)); popAt(b.c, b.x, b.y, t, k + .1);
      const tt = a("add") + j * .3; op(b.tw, ramp(t, tt, tt + .2)); popAt(b.tw, b.x, b.y + 66, t, tt); });
    op(s.ult, on(t, a("ultimate"), SC.mindmap.t1 + .5, .2)); popAt(s.ult, 640, 130, t, a("ultimate"));
    const ph = ramp(t, a("save"), a("save") + .6); op(s.phone, ph); tf(s.phone, `translate(${lerp(1650, 1360, ph)} 540) rotate(${lerp(12, -4, ph)})`);
    const nx = a("ultimate") + .8; const off = -122 - 260 * ramp(t, a("save"), nx); set(s.shot, "y", off);
    set(s.ring, "x", -112 + 224 * (36 / 780)); set(s.ring, "y", off + 485 * (1235 / 1688)); set(s.ring, "width", 224 * (304 / 780)); set(s.ring, "height", 485 * (72 / 1688));
    op(s.ring, on(t, nx, SC.mindmap.t1 + .5, .15) * (.6 + .4 * Math.sin(t * 8))); }; return s; })();

// ---- CLOSE
S.close = (() => { const s = scene("close", "#f15bb5", "#fee440");
  s.ans = el("g", {}, s.stage); el("rect", {x: -380, y: -70, width: 760, height: 140, rx: 70, fill: "#06d6a0", stroke: INK, "stroke-width": 7}, s.ans); tx(s.ans, {x: 0, y: 22, "text-anchor": "middle", "font-size": 56, "font-weight": 700, fill: "#fff"}, "🌀 the SMALL INTESTINE!");
  const names = ["mouth", "gullet", "stomach", "small int.", "large int."];
  s.stops = names.map((n, i) => { const g = el("g", {}, s.stage); el("circle", {r: 70, fill: "#fff", stroke: INK, "stroke-width": 7}, g); tx(g, {x: 0, y: 22, "text-anchor": "middle", "font-size": 64, "font-weight": 700, fill: "#7209b7"}, String(i + 1));
    tx(g, {x: 0, y: 120, "text-anchor": "middle", "font-size": 32, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 7}, n); return g; });
  s.q = chip(s.stage, "🗣️ Say all 5 stops in order!", "#1b1b3a", {fs: 40});
  s.run = t => { const a = w => C("close", w); const tn = ramp(t, a("five") - .2, a("five") + .1);
    op(s.ans, ramp(t, a("small"), a("small") + .15) * (1 - tn)); tf(s.ans, `translate(760 420) scale(${pop(t, a("small"))})`);
    s.stops.forEach((g, i) => { const tt = a("five") + i * .3; op(g, ramp(t, tt, tt + .2)); tf(g, `translate(${280 + i * 240} 420) scale(${pop(t, tt)})`); });
    op(s.q, ramp(t, a("order") - .3, a("order"))); popAt(s.q, 760, 720, t, a("order") - .3); }; return s; })();

// ---- END CARD
S.end = (() => { const s = scene("end", "#3a0ca3", "#7209b7");
  tx(s.stage, {x: 960, y: 360, "text-anchor": "middle", "font-size": 44, "font-weight": 700, fill: "#ffe14d", "letter-spacing": 6}, "NEXT EPISODE");
  tx(s.stage, {x: 960, y: 480, "text-anchor": "middle", "font-size": 84, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 10}, "Is air nothing?");
  tx(s.stage, {x: 960, y: 580, "text-anchor": "middle", "font-size": 84, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 10}, "The matter test 🎈");
  s.run = () => {}; return s; })();

