/* EP01 scenes the trailer reuses (copied by the kit, do not edit here) */
// ---- TINY: PM2.5 next to a hair
S.tiny = (() => { const s = scene("tiny", "#ffafcc", "#cdb4db");
  s.hair = el("g", {}, s.stage);
  el("path", {d: "M-40 140 C300 80 600 220 1240 150 L1240 440 C600 510 300 370 -40 430 Z", fill: "#8d5524", stroke: INK, "stroke-width": 7}, s.hair);
  for (let i = 0; i < 9; i++) el("path", {d: `M${60 + i * 130} ${200 + (i % 2) * 30} q40 -14 80 0`, fill: "none", stroke: "#a0692f", "stroke-width": 8, "stroke-linecap": "round"}, s.hair);
  s.hl = chip(s.stage, "one strand of hair (zoomed in)", "#8d5524", {fs: 34});
  s.pm = el("g", {}, s.stage); el("circle", {r: 5, fill: "#e63946", stroke: INK, "stroke-width": 1.5}, s.pm);
  s.ring = el("circle", {r: 30, fill: "none", stroke: "#e63946", "stroke-width": 5}, s.stage);
  s.pml = chip(s.stage, "PM2.5 particle", "#e63946", {fs: 34});
  s.bar = el("g", {}, s.stage); el("line", {x1: 0, y1: 0, x2: 0, y2: 300, stroke: INK, "stroke-width": 5}, s.bar); el("line", {x1: -20, y1: 0, x2: 20, y2: 0, stroke: INK, "stroke-width": 5}, s.bar); el("line", {x1: -20, y1: 300, x2: 20, y2: 300, stroke: INK, "stroke-width": 5}, s.bar);
  s.x30 = chip(s.stage, "about 30 times thinner!", "#7209b7", {fs: 46});
  seed = 31; s.fl = particles(s.stage, 40, "#6c757d", 3, 6);
  s.run = t => { const a = (w, f) => cue("tiny", w, f);
    popAt(s.hair, 0, 120, t, a("hair", .5) - 1.2); popAt(s.hl, 600, 720, t, a("hair", .5) - .8); op(s.hl, on(t, a("hair", .5) - .8, a("light", .75) - .2));
    const tp = a("called", .1); popAt(s.pm, 1020, 760, t, tp); set(s.ring, "cx", 1020); set(s.ring, "cy", 760); op(s.ring, on(t, tp, a("light", .75)) * (.5 + .5 * Math.sin(t * 7)));
    popAt(s.pml, 1020, 840, t, tp + .3); op(s.pml, on(t, tp + .3, a("light", .75)));
    popAt(s.bar, 160, 260, t, a("thirty", .6) - .2); op(s.bar, on(t, a("thirty", .6) - .2, a("light", .75)));
    popAt(s.x30, 600, 50, t, a("thirty", .6));
    const fl = ramp(t, a("float", .85) - .4, a("float", .85) + .6);
    s.fl.forEach(d => { set(d.e, "cx", d.u * 1200 + Math.sin(t * .8 + d.w) * 40); set(d.e, "cy", 520 + d.v * 360 + Math.cos(t * .6 + d.w) * 30); op(d.e, fl * .8); }); }; return s; })();

// ---- LUNGS: nose, windpipe, lungs; the nose traps dust but PM2.5 slips through
S.lungs = (() => { const s = scene("lungs", "#ffc8dd", "#ffafcc");
  s.body = el("g", {}, s.stage);
  el("path", {d: "M300 900 Q300 520 420 470 L480 440 Q520 420 520 380 L520 330 Q440 300 440 200 Q440 70 560 60 Q680 50 690 190 Q700 260 660 310 L650 380 Q650 420 700 440 L780 470 Q900 520 900 900 Z", fill: "#ffe8d6", stroke: INK, "stroke-width": 7}, s.body);
  el("path", {d: "M440 190 Q410 215 440 232", fill: "#ffe8d6", stroke: INK, "stroke-width": 7}, s.body);                 // nose
  s.pipe = el("path", {d: "M480 230 Q560 250 580 330 L585 560", fill: "none", stroke: "#ef476f", "stroke-width": 26, "stroke-linecap": "round"}, s.body);
  el("path", {d: "M585 560 Q560 600 520 620 M585 560 Q610 600 650 620", fill: "none", stroke: "#ef476f", "stroke-width": 18, "stroke-linecap": "round"}, s.body);
  s.lungL = el("path", {d: "M510 590 Q420 600 410 720 Q400 840 480 850 Q560 850 565 740 L565 620 Z", fill: "#ff8fab", stroke: INK, "stroke-width": 6}, s.body);
  s.lungR = el("path", {d: "M660 590 Q750 600 760 720 Q770 840 690 850 Q610 850 605 740 L605 620 Z", fill: "#ff8fab", stroke: INK, "stroke-width": 6}, s.body);
  const lab = (x, y, str, col) => { const c = chip(s.stage, str, col, {fs: 30}); c.x = x; c.y = y; return c; };
  s.lNose = lab(250, 200, "nose", "#3a86ff"); s.lPipe = lab(860, 360, "windpipe", "#ef476f"); s.lLung = lab(940, 720, "lungs", "#7209b7");
  seed = 51; s.air = particles(s.stage, 18, "#4cc9f0", 8, 11); s.oxy = particles(s.stage, 22, "#e63946", 6, 9);
  s.lO = chip(s.stage, "oxygen → blood", "#e63946", {fs: 32});
  // nose close-up: hairs catch big dust, PM2.5 slips past
  s.zoom = el("g", {}, s.stage); el("rect", {x: -230, y: -170, width: 460, height: 340, rx: 30, fill: "#fff0f3", stroke: INK, "stroke-width": 7, filter: "url(#sh)"}, s.zoom);
  tx(s.zoom, {x: 0, y: -125, "text-anchor": "middle", "font-size": 32, "font-weight": 700, fill: INK}, "inside your nose 🔍");
  for (let i = 0; i < 9; i++) el("path", {d: `M${-190 + i * 48} 150 q${(i % 2 ? 18 : -18)} -60 ${(i % 2 ? -6 : 6)} -130`, fill: "none", stroke: "#6d4c41", "stroke-width": 7, "stroke-linecap": "round"}, s.zoom);
  el("rect", {x: -230, y: 100, width: 460, height: 70, rx: 0, fill: "#c9f2c7", opacity: .7}, s.zoom);
  s.big = particles(s.zoom, 6, "#8d5524", 16, 20); s.small = particles(s.zoom, 12, "#e63946", 4, 6);
  s.lT = chip(s.stage, "hairs + mucus trap dust", "#2a9d8f", {fs: 30}); s.lS = chip(s.stage, "PM2.5 slips past!", "#e63946", {fs: 30});
  const path = k => { // nose → windpipe → lungs
    if (k < .3) { const q = k / .3; return [lerp(330, 470, q), lerp(210, 228, q)]; }
    if (k < .75) { const q = (k - .3) / .45; return [lerp(480, 585, q), lerp(230, 560, q)]; }
    const q = (k - .75) / .25; return [585, lerp(560, 640, q)]; };
  s.run = t => { const a = (w, f) => cue("lungs", w, f), tB = a("breathe", .08), tO = a("oxygen", .4), tD = has("lungs", "defence") ? a("defence", .5) : a("hairs", .05) - .3;
    popAt(s.body, 0, 0, t, SC.lungs.t0 - .3);
    [[s.lNose, "nose", .15], [s.lPipe, "windpipe", .2], [s.lLung, "lungs", .25]].forEach(([c, w, f]) => { popAt(c, c.x, c.y, t, a(w, f)); op(c, on(t, a(w, f), tD + .2)); });
    const br = 1 + .05 * Math.sin(t * 2.4); [s.lungL, s.lungR].forEach(l => tf(l, `translate(585 720) scale(${br}) translate(-585 -720)`));
    s.air.forEach((d, i) => { const k = ((t * .35 + i / s.air.length) % 1); const [x, y] = path(k); const side = i % 2 ? 1 : -1;
      set(d.e, "cx", x + (k > .75 ? side * (k - .75) * 280 : 0)); set(d.e, "cy", y + (k > .75 ? (k - .75) * 300 : 0)); op(d.e, on(t, tB, tD, .3)); });
    s.oxy.forEach((d, i) => { const k = ((t * .4 + d.u) % 1); set(d.e, "cx", 585 + (d.v - .5) * 360 * (.4 + k)); set(d.e, "cy", 720 + (d.w / 6 - .5) * 220 * (.4 + k)); op(d.e, on(t, tO, tD, .3) * (1 - k)); });
    popAt(s.lO, 600, 50, t, tO); op(s.lO, on(t, tO, tD, .25));
    const zm = Math.max(0, pop(t, tD, .5)); tf(s.zoom, `translate(940 330) scale(${zm})`); op(s.zoom, zm > 0 ? 1 : 0);
    s.big.forEach((d, i) => { const k = clamp(((t - tD) * .35 + d.u * .4)); set(d.e, "cx", -180 + d.v * 360); set(d.e, "cy", lerp(-100, 60 + (i % 3) * 18, k)); });
    s.small.forEach((d, i) => { const k = ((t * .45 + d.u) % 1); set(d.e, "cx", -200 + d.v * 400); set(d.e, "cy", lerp(-110, 180, k)); op(d.e, ramp(t, a("slip", .55) - .3, a("slip", .55))); });
    popAt(s.lT, 940, 560, t, a("hairs", .25)); popAt(s.lS, 940, 640, t, a("slip", .55)); }; return s; })();
