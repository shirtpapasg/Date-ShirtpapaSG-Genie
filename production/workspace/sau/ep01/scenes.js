/* Science Around Us EP01: Why did the haze go away? Scenes draw in a 1200 x 900 box (centre 600, 450).
   Times come from cue(scene, word, fallback fraction), so the Shorts reuse the same scenes with their own words. */

/* ---- shared drawings ---- */
function skyline(p, x0, y0, col) { const g = el("g", {fill: col}, p);
  [[0, 170, 70], [80, 230, 60], [150, 140, 90], [250, 300, 55], [315, 210, 80], [405, 260, 60], [475, 160, 70], [560, 120, 120], [690, 220, 70], [770, 150, 90], [870, 270, 60], [940, 190, 80]]
    .forEach(([x, h, w]) => el("rect", {x: x0 + x, y: y0 - h, width: w, height: h, rx: 4}, g));
  [0, 60, 120].forEach(dx => el("rect", {x: x0 + 600 + dx, y: y0 - 250, width: 38, height: 250}, g));      // three towers with a deck on top
  el("path", {d: `M${x0 + 585} ${y0 - 262} H${x0 + 775} Q${x0 + 790} ${y0 - 262} ${x0 + 795} ${y0 - 252} H${x0 + 585} Z`}, g);
  return g; }
/* regionMap: see geo_map.js (accurate coastlines) */
function arrowG(p, col) { const g = el("g", {}, p); el("path", {d: "M-70 -14 H30 V-36 L80 0 L30 36 V14 H-70 Z", fill: col, stroke: INK, "stroke-width": 5, "stroke-linejoin": "round"}, g); return g; }
function particles(p, n, col, r0, r1) { const a = []; for (let i = 0; i < n; i++) a.push({e: el("circle", {r: r0 + rnd() * (r1 - r0), fill: col}, p), u: rnd(), v: rnd(), w: rnd() * 6}); return a; }

// ---- HOOK: the sky turns grey, then clears
S.hook = (() => { const s = scene("hook", "#8ecae6", "#219ebc");
  s.win = el("g", {}, s.stage); s.sky = el("rect", {x: 50, y: 40, width: 1100, height: 640, rx: 36, fill: "#8ecae6", stroke: INK, "stroke-width": 8}, s.win);
  s.sun = emo(s.win, 960, 170, 130, "☀️"); skyline(s.win, 110, 680, "#264653");
  s.haze = el("rect", {x: 50, y: 40, width: 1100, height: 640, rx: 36, fill: "#a89f91", opacity: 0}, s.win);
  seed = 11; s.blobs = []; for (let i = 0; i < 9; i++) s.blobs.push({e: el("ellipse", {rx: 160 + rnd() * 120, ry: 50 + rnd() * 40, fill: "#cfc6b8", filter: "url(#blur)"}, s.win), x: 80 + rnd() * 1000, y: 120 + rnd() * 480, v: 10 + rnd() * 25});
  s.sep = chip(s.stage, "SEPTEMBER", "#6c757d", {fs: 44}); s.nov = chip(s.stage, "NOVEMBER", "#06d6a0", {fs: 44});
  s.q = tx(s.stage, {x: 600, y: 830, "text-anchor": "middle", "font-size": 84, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 12}, "Where did the haze go? 🤔");
  s.run = t => { const a = (w, f) => cue("hook", w, f);
    const hz = ramp(t, a("grey", .2) - .3, a("smoky", .3) + .6) * (1 - ramp(t, a("gone", .55) - .6, a("gone", .55) + .5));
    set(s.sky, "fill", mix("#8ecae6", "#9a9184", hz)); op(s.haze, .55 * hz); op(s.sun, 1 - .75 * hz);
    s.blobs.forEach(b => { set(b.e, "cx", b.x + Math.sin(t * .3) * 40 + b.v * t * .3); set(b.e, "cy", b.y); op(b.e, .9 * hz); });
    popAt(s.sep, 600, 110, t, a("september", .05)); op(s.sep, on(t, a("september", .05), a("november", .5), .2));
    popAt(s.nov, 600, 110, t, a("november", .5));
    popAt(s.q, 0, 0, t, a("where", .7)); }; return s; })();

// ---- WELCOME: series title, then today's three things
S.welcome = (() => { const s = scene("welcome", "#ffd166", "#ef476f"), I = CFG.intro || {goals: []};
  s.wave = emo(s.stage, 0, 0, 170, "🌏");
  s.hi = el("g", {}, s.stage);
  tx(s.hi, {x: 0, y: 0, "text-anchor": "middle", "font-size": 72, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 10}, "Welcome to");
  tx(s.hi, {x: 0, y: 125, "text-anchor": "middle", "font-size": 118, "font-weight": 700, fill: "#ffe14d", class: "out", "stroke-width": 14}, "Science Around Us!");
  s.board = el("g", {}, s.stage);
  el("rect", {x: -560, y: -380, width: 1120, height: 720, rx: 46, fill: "#fffaf0", stroke: INK, "stroke-width": 8, filter: "url(#sh)"}, s.board);
  el("rect", {x: -560, y: -380, width: 1120, height: 130, rx: 46, fill: INK}, s.board); el("rect", {x: -560, y: -290, width: 1120, height: 40, fill: INK}, s.board);
  tx(s.board, {x: 0, y: -293, "text-anchor": "middle", "font-size": 62, "font-weight": 700, fill: "#ffe14d", "letter-spacing": 3}, "🎯 TODAY YOU'LL LEARN");
  const cols = ["#ff5d73", "#3a86ff", "#06d6a0"];
  s.rows = I.goals.map(([icon, label, cw], i) => { const g = el("g", {}, s.board), y = -120 + i * 175;
    el("circle", {cx: -450, cy: y, r: 56, fill: cols[i], stroke: INK, "stroke-width": 6}, g);
    tx(g, {x: -450, y: y + 25, "text-anchor": "middle", "font-size": 70, "font-weight": 700, fill: "#fff"}, String(i + 1));
    emo(g, -320, y, 88, icon); tx(g, {x: -240, y: y + 21, "font-size": 56, "font-weight": 700, fill: INK}, label); return {g, cw}; });
  s.run = t => { const tB = cue("welcome", "today", .25) - .35, go = cue("welcome", "started", .95);
    const a = 1 - ramp(t, tB - .3, tB + .1);
    tf(s.wave, `translate(600 ${200 - 40 * (1 - a)}) scale(${Math.max(0, pop(t, SC.welcome.t0 - .1)) * a}) rotate(${Math.sin(t * 3) * 10})`);
    tf(s.hi, `translate(600 ${470 - 60 * (1 - a)}) scale(${Math.max(0, pop(t, cue("welcome", "welcome", 0) - .15)) * a})`); op(s.hi, a);
    const b = Math.max(0, pop(t, tB, .55)), bump = 1 + .04 * on(t, go, go + .5, .2);
    tf(s.board, `translate(600 ${450 + Math.sin(t * 1.5) * 6}) scale(${b * bump})`); op(s.board, b > 0 ? 1 : 0);
    s.rows.forEach(r => { const k = Math.max(0, pop(t, cue("welcome", r.cw, .5) - .1)); tf(r.g, `translate(${-60 * (1 - Math.min(1, k))} 0)`); op(r.g, clamp(k)); }); };
  return s; })();

// ---- NEWS: the headline and the PSI gauge
S.news = (() => { const s = scene("news", "#e9ecef", "#adb5bd");
  s.paper = el("g", {}, s.stage); el("rect", {x: -520, y: -150, width: 1040, height: 300, rx: 24, fill: "#fff", stroke: INK, "stroke-width": 7, filter: "url(#sh)"}, s.paper);
  el("rect", {x: -520, y: -150, width: 1040, height: 70, rx: 24, fill: INK}, s.paper); el("rect", {x: -520, y: -100, width: 1040, height: 20, fill: INK}, s.paper);
  tx(s.paper, {x: 0, y: -100, "text-anchor": "middle", "font-size": 40, "font-weight": 700, fill: "#fff", "letter-spacing": 6}, "📰 SCIENCE NEWS");
  s.h1 = tx(s.paper, {x: 0, y: 0, "text-anchor": "middle", "font-size": 52, "font-weight": 700, fill: "#e63946"}, "4 Sep 2026: Air turns UNHEALTHY");
  s.h1b = tx(s.paper, {x: 0, y: 70, "text-anchor": "middle", "font-size": 36, "font-weight": 600, fill: "#5b6782"}, "First time since 2023");
  s.h2 = tx(s.paper, {x: 0, y: 0, "text-anchor": "middle", "font-size": 52, "font-weight": 700, fill: "#2a9d8f"}, "7 Nov 2026: Haze measures end ✓");
  s.h2b = tx(s.paper, {x: 0, y: 70, "text-anchor": "middle", "font-size": 36, "font-weight": 600, fill: "#5b6782"}, "National Environment Agency (NEA)");
  s.gauge = el("g", {}, s.stage); const R = 230, band = [[0, 50, "#06d6a0", "Good"], [50, 100, "#ffd166", "Moderate"], [100, 200, "#f77f00", "Unhealthy"], [200, 300, "#e63946", "V. unhealthy"]];
  const ang = v => Math.PI * (1 - v / 300);
  band.forEach(([a, b, col]) => { const a0 = ang(a), a1 = ang(b);
    el("path", {d: `M${R * Math.cos(a0)} ${-R * Math.sin(a0)} A${R} ${R} 0 0 1 ${R * Math.cos(a1)} ${-R * Math.sin(a1)}`, fill: "none", stroke: col, "stroke-width": 60}, s.gauge); });
  tx(s.gauge, {x: 0, y: 70, "text-anchor": "middle", "font-size": 40, "font-weight": 700, fill: INK}, "PSI");
  s.needle = el("path", {d: "M0 -12 L200 0 L0 12 Z", fill: INK}, s.gauge); el("circle", {r: 22, fill: INK}, s.gauge);
  s.val = tx(s.gauge, {x: 0, y: -60, "text-anchor": "middle", "font-size": 54, "font-weight": 700, fill: INK}, "");
  s.ang = ang;
  s.run = t => { const a = (w, f) => cue("news", w, f), sw = a("seventh", .6);
    popAt(s.paper, 600, 200, t, a("headline", .02));
    op(s.h1, ramp(t, a("fourth", .15), a("fourth", .15) + .2) * (1 - ramp(t, sw - .3, sw))); op(s.h1b, ramp(t, a("since", .45), a("since", .45) + .2) * (1 - ramp(t, sw - .3, sw)));
    op(s.h2, ramp(t, sw, sw + .2)); op(s.h2b, ramp(t, a("national", .7), a("national", .7) + .2));
    popAt(s.gauge, 600, 690, t, a("air", .25) - .3);
    const val = lerp(lerp(30, 130, ramp(t, a("unhealthy", .35) - .4, a("unhealthy", .35) + .5)), 40, ramp(t, sw, sw + 1.2));
    tf(s.needle, `rotate(${-s.ang(val) * 180 / Math.PI})`); s.val.textContent = Math.round(val); set(s.val, "fill", val > 100 ? "#e63946" : "#2a9d8f"); }; return s; })();

// ---- SMOKE: fires in Sumatra and Kalimantan, smoke rising
S.smoke = (() => { const s = scene("smoke", "#023e8a", "#0077b6");
  s.map = regionMap(s.stage); seed = 21;
  s.fires = s.map.fires.map(([x, y]) => ({x, y, e: emo(s.stage, x, y, 64, "🔥")}));
  s.puffs = []; s.fires.forEach(f => { for (let i = 0; i < 5; i++) s.puffs.push({f, k: i / 5, e: el("circle", {fill: "#6c757d", opacity: 0}, s.stage)}); });
  s.mag = el("g", {}, s.stage); el("circle", {r: 150, fill: "#f8f9fa", stroke: INK, "stroke-width": 10}, s.mag); el("line", {x1: 105, y1: 105, x2: 190, y2: 190, stroke: INK, "stroke-width": 22, "stroke-linecap": "round"}, s.mag);
  s.dots = particles(s.mag, 26, "#495057", 5, 13);
  s.c1 = chip(s.stage, "smoke = tiny solid particles", "#495057", {fs: 40});
  s.run = t => { const a = (w, f) => cue("smoke", w, f), tb = a("burning", .45);
    s.fires.forEach((f, i) => { const k = Math.max(0, pop(t, tb + i * .12)); tf(f.e, `translate(${f.x} ${f.y}) scale(${k * (1 + .08 * Math.sin(t * 9 + i))}) translate(${-f.x} ${-f.y})`); op(f.e, clamp(k)); });
    const sm = ramp(t, a("smoke#2", .65) - .8, a("smoke#2", .65) + .4);
    s.puffs.forEach(p => { const k = ((t * .25 + p.k) % 1); set(p.e, "cx", p.f.x + k * 70); set(p.e, "cy", p.f.y - 40 - k * 160); set(p.e, "r", 18 + k * 34); op(p.e, sm * .7 * (1 - k)); });
    const mg = a("tiny", .8) - .3; popAt(s.mag, 920, 230, t, mg);
    s.dots.forEach(d => { set(d.e, "cx", -110 + d.u * 220 + Math.sin(t * 1.3 + d.w) * 12); set(d.e, "cy", -110 + d.v * 220 + Math.cos(t * 1.1 + d.w) * 12); });
    popAt(s.c1, 600, 830, t, a("particles", .85)); }; return s; })();

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

// ---- WIND: south-west winds bring the smoke; rain and the north-east monsoon take it away
S.wind = (() => { const s = scene("wind", "#023e8a", "#0077b6");
  s.map = regionMap(s.stage); seed = 41;
  s.fires = s.map.fires.map(([x, y]) => emo(s.stage, x, y, 54, "🔥"));
  s.sw = [[150, 840], [380, 860], [610, 860], [840, 860]].map(([x, y]) => ({x, y, g: arrowG(s.stage, "#ffd166")}));
  s.ne = [[1110, 90], [1000, 260], [880, 60]].map(([x, y]) => ({x, y, g: arrowG(s.stage, "#90e0ef")}));
  s.smk = particles(s.stage, 70, "#6c757d", 7, 13);
  s.haze = el("circle", {cx: 612, cy: 418, r: 120, fill: "#8d8478", filter: "url(#blur)", opacity: 0}, s.stage);
  s.cloud = el("g", {}, s.stage); emo(s.cloud, 0, 0, 170, "🌧️"); s.drops = []; for (let i = 0; i < 16; i++) s.drops.push({e: el("line", {stroke: "#caf0f8", "stroke-width": 6, "stroke-linecap": "round"}, s.cloud), u: rnd(), w: rnd()});
  s.l1 = chip(s.stage, "June–September: winds from the SOUTH-WEST", "#f77f00", {fs: 34});
  s.l2 = chip(s.stage, "October–November: winds change, rain returns", "#00b4d8", {fs: 34});
  s.l3 = chip(s.stage, "North-east monsoon: wind from the NORTH-EAST", "#3a86ff", {fs: 34});
  s.run = t => { const a = (w, f) => cue("wind", w, f), tSW = a("june", .1), tCh = a("change", .55), tRain = a("rain", .62), tNE = a("north-east", .78);
    s.fires.forEach((f, i) => op(f, 1 - ramp(t, tRain + .5, tNE)));
    const swOn = on(t, tSW - .2, tCh + .4, .3);
    s.sw.forEach((r, i) => { const k = ((t * .5 + i * .25) % 1); tf(r.g, `translate(${r.x + k * 60} ${r.y - k * 60}) rotate(-45) scale(.9)`); op(r.g, swOn); });
    const neOn = ramp(t, tNE - .2, tNE + .3);
    s.ne.forEach((r, i) => { const k = ((t * .5 + i * .3) % 1); tf(r.g, `translate(${r.x - k * 60} ${r.y + k * 60}) rotate(135) scale(.9)`); op(r.g, neOn); });
    // smoke: drifts from the fires to Singapore, then falls with the rain, then blows away south-west
    const fall = ramp(t, tRain, tRain + 2.2), away = ramp(t, tNE, tNE + 2.5);
    s.smk.forEach((d, i) => { const [fx, fy] = s.map.fires[i % 6]; const k = ((t * .12 + d.u) % 1) * ramp(t, tSW - .5, tSW + 1.5);
      let x = lerp(fx, 612 + (d.v - .5) * 160, k), y = lerp(fy, 418 + (d.w / 6 - .5) * 160, k);
      y += fall * 120 * d.v; x -= away * 500 * d.u; y += away * 300 * d.u;
      set(d.e, "cx", x); set(d.e, "cy", y); op(d.e, (has("wind", "june") ? ramp(t, tSW, tSW + 1) : ramp(t, SC.wind.t0, SC.wind.t0 + 1)) * (1 - fall * .55) * (1 - away) * .85); });
    op(s.haze, .75 * ramp(t, tSW + 2, tSW + 5) * (1 - fall * .6) * (1 - away));
    const rn = on(t, tCh, tNE + 1.2, .4); op(s.cloud, rn); tf(s.cloud, "translate(612 280)");
    s.drops.forEach(d => { const k = (t * 1.6 + d.u) % 1; set(d.e, "x1", -70 + d.w * 140); set(d.e, "x2", -76 + d.w * 140); set(d.e, "y1", 60 + k * 170); set(d.e, "y2", 84 + k * 170); });
    set(s.map.sgRing, "r", 16 + ((t * 1.2) % 1) * 40); op(s.map.sgRing, 1 - ((t * 1.2) % 1));
    popAt(s.l1, 600, 50, t, tSW); op(s.l1, on(t, tSW, tCh, .25));
    popAt(s.l2, 600, 50, t, tCh); op(s.l2, on(t, tCh, tNE, .25));
    popAt(s.l3, 600, 50, t, tNE); }; return s; })();

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

// ---- IMPACT: burning forest, animals leave, satellites spot hotspots
S.impact = (() => { const s = scene("impact", "#90be6d", "#43aa8b");
  seed = 61; s.trees = []; for (let i = 0; i < 9; i++) s.trees.push({x: 90 + i * 128, e: emo(s.stage, 90 + i * 128, 700, 130, "🌳"), f: emo(s.stage, 90 + i * 128, 690, 110, "🔥"), burn: [1, 2, 4, 5, 7].includes(i)});
  s.smk = particles(s.stage, 30, "#6c757d", 18, 40);
  s.ani = [["🦧", 300], ["🐘", 760]].map(([e, x]) => ({x, e: emo(s.stage, x, 800, 100, e)}));
  s.home = chip(s.stage, "animals lose their homes", "#bc6c25", {fs: 34}); s.pol = chip(s.stage, "smoke pollutes the air", "#495057", {fs: 34});
  s.sat = emo(s.stage, 0, 0, 120, "🛰️"); s.beam = el("path", {d: "M0 0 L-260 520 L260 520 Z", fill: "#ffe14d", opacity: .25}, s.stage);
  s.hs = s.trees.filter(r => r.burn).map(r => el("circle", {cx: r.x, cy: 690, r: 50, fill: "none", stroke: "#e63946", "stroke-width": 8}, s.stage));
  s.run = t => { const a = (w, f) => cue("impact", w, f), tb = a("burned", .25), tsat = a("satellites", .7);
    s.trees.forEach((r, i) => { const b = r.burn ? ramp(t, tb + i * .1, tb + i * .1 + .4) : 0; op(r.e, 1 - b * .85); op(r.f, b); set(r.f, "font-size", 110 * (1 + .06 * Math.sin(t * 9 + i))); });
    s.smk.forEach((d, i) => { const k = ((t * .15 + d.u) % 1); set(d.e, "cx", 200 + d.v * 800 + k * 300); set(d.e, "cy", 640 - k * 450); op(d.e, ramp(t, tb + .5, tb + 1.5) * .55 * (1 - k)); });
    const ta = a("animals", .45); s.ani.forEach((n, i) => { const k = ramp(t, ta, ta + 3); set(n.e, "x", n.x + (i ? 1 : -1) * 700 * k); op(n.e, ramp(t, ta - .6, ta - .3) * (1 - ramp(t, ta + 2, ta + 3))); });
    popAt(s.home, 600, 120, t, ta); op(s.home, on(t, ta, a("pollutes", .6), .2)); popAt(s.pol, 600, 120, t, a("pollutes", .6)); op(s.pol, on(t, a("pollutes", .6), tsat, .2));
    const sx = lerp(-150, 600, ramp(t, tsat - .4, tsat + 1.2)); tf(s.sat, `translate(${sx} 110) rotate(${Math.sin(t * 2) * 6})`); op(s.sat, ramp(t, tsat - .4, tsat));
    tf(s.beam, `translate(${sx} 150)`); op(s.beam, .28 * ramp(t, tsat + .8, tsat + 1.3));
    const th = a("hotspots", .85); s.hs.forEach((c, i) => { op(c, ramp(t, th + i * .15, th + i * .15 + .2) * (.55 + .45 * Math.sin(t * 8))); set(c, "r", 46 + 8 * Math.sin(t * 6)); }); }; return s; })();

// ---- TRY THIS: a haze score from the window, checked against the PSI
S.try = (() => { const s = scene("try", "#caffbf", "#9bf6ff");
  s.win = el("g", {}, s.stage); el("rect", {x: 0, y: 0, width: 620, height: 520, rx: 26, fill: "#a2d2ff", stroke: INK, "stroke-width": 10}, s.win);
  tf(skyline(s.win, 0, 0, "#457b9d"), "translate(20 470) scale(.57)"); s.wh = el("rect", {x: 0, y: 0, width: 620, height: 520, rx: 26, fill: "#b8b0a2", opacity: .3}, s.win);
  el("line", {x1: 310, y1: 0, x2: 310, y2: 520, stroke: INK, "stroke-width": 10}, s.win); el("line", {x1: 0, y1: 260, x2: 620, y2: 260, stroke: INK, "stroke-width": 10}, s.win);
  s.score = el("g", {}, s.stage); tx(s.score, {x: 0, y: -70, "text-anchor": "middle", "font-size": 38, "font-weight": 700, fill: INK}, "How clearly can you see it?");
  s.dots = [1, 2, 3, 4, 5].map(i => { const g = el("g", {}, s.score); const c = el("circle", {cx: (i - 3) * 100, cy: 0, r: 40, fill: "#fff", stroke: INK, "stroke-width": 5}, g);
    tx(g, {x: (i - 3) * 100, y: 15, "text-anchor": "middle", "font-size": 42, "font-weight": 700, fill: INK}, String(i)); return c; });
  s.ph = el("g", {}, s.stage); el("rect", {x: -130, y: -230, width: 260, height: 460, rx: 36, fill: INK}, s.ph); el("rect", {x: -112, y: -200, width: 224, height: 400, rx: 18, fill: "#f8f9fa"}, s.ph);
  tx(s.ph, {x: 0, y: -140, "text-anchor": "middle", "font-size": 30, "font-weight": 700, fill: "#2a9d8f"}, "myENV app");
  tx(s.ph, {x: 0, y: -40, "text-anchor": "middle", "font-size": 40, "font-weight": 700, fill: INK}, "PSI");
  s.psi = tx(s.ph, {x: 0, y: 50, "text-anchor": "middle", "font-size": 92, "font-weight": 700, fill: "#06d6a0"}, "42");
  tx(s.ph, {x: 0, y: 120, "text-anchor": "middle", "font-size": 36, "font-weight": 700, fill: "#06d6a0"}, "Good");
  s.m = chip(s.stage, "Do they match? ✓", "#7209b7", {fs: 44});
  s.run = t => { const a = (w, f) => cue("try", w, f);
    popAt(s.win, 30, 120, t, a("window", .2) - .3);
    popAt(s.score, 340, 790, t, a("score", .45)); const n = Math.min(5, Math.max(0, Math.floor((t - a("score", .45)) / .35)));
    s.dots.forEach((c, i) => set(c, "fill", i < n ? (i === 3 ? "#ffd166" : "#e9ecef") : "#fff")); if (n >= 5) set(s.dots[3], "fill", "#ffd166");
    popAt(s.ph, 950, 380, t, a("reading", .7)); popAt(s.m, 950, 770, t, a("match", .9)); }; return s; })();

// ---- THINK ABOUT IT: cloth mask vs N95
S.think = (() => { const s = scene("think", "#3a0ca3", "#7209b7");
  s.title = tx(s.stage, {x: 600, y: 90, "text-anchor": "middle", "font-size": 76, "font-weight": 700, fill: "#ffe14d", class: "out", "stroke-width": 10}, "🤔 Think about it!");
  const mask = (x, col, lab, n95) => { const g = el("g", {}, s.stage);
    el("path", n95 ? {d: "M-150 -40 Q0 -170 150 -40 Q170 120 0 150 Q-170 120 -150 -40 Z", fill: "#f8f9fa", stroke: INK, "stroke-width": 7} : {d: "M-170 -90 Q0 -130 170 -90 Q190 60 0 110 Q-190 60 -170 -90 Z", fill: col, stroke: INK, "stroke-width": 7}, g);
    if (!n95) for (let i = -3; i <= 3; i++) el("line", {x1: -160, y1: i * 25, x2: 160, y2: i * 25, stroke: "#fff", "stroke-width": 3, opacity: .5}, g);
    else el("circle", {cx: 70, cy: 30, r: 26, fill: "#adb5bd", stroke: INK, "stroke-width": 4}, g);
    el("path", {d: n95 ? "M-150 -40 Q-230 -20 -210 60 M150 -40 Q230 -20 210 60" : "M-170 -60 Q-250 -30 -230 50 M170 -60 Q250 -30 230 50", fill: "none", stroke: INK, "stroke-width": 6}, g);
    tx(g, {x: 0, y: 230, "text-anchor": "middle", "font-size": 52, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 8}, lab); g.x = x; return g; };
  s.cloth = mask(330, "#4895ef", "cloth mask", false); s.n95 = mask(870, "#fff", "N95 mask", true);
  s.vs = tx(s.stage, {x: 600, y: 470, "text-anchor": "middle", "font-size": 80, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 10}, "vs");
  s.q = emo(s.stage, 600, 300, 150, "❓");
  s.ans = chip(s.stage, has("think", "next") ? "Answer next week!" : "▶ Full episode: Science Around Us", "#f72585", {fs: 44});
  s.run = t => { const a = (w, f) => cue("think", w, f);
    popAt(s.title, 0, 0, t, SC.think.t0 - .2);
    popAt(s.cloth, s.cloth.x, 430, t, a("cloth", .3)); popAt(s.n95, s.n95.x, 430, t, a("n", .2)); op(s.vs, ramp(t, a("cloth", .3), a("cloth", .3) + .3));
    tf(s.q, `translate(600 300) scale(${Math.max(0, pop(t, a("why", .55))) * (1 + .08 * Math.sin(t * 5))}) translate(-600 -300)`); op(s.q, ramp(t, a("why", .55) - .05, a("why", .55) + .1));
    popAt(s.ans, 600, 820, t, has("think", "next") ? a("next", .9) : a("watch", .6)); }; return s; })();

// ---- CLOSE: the four things to remember
S.close = (() => { const s = scene("close", "#f15bb5", "#fee440");
  const rows = [["💨", "Haze is tiny smoke particles", "tiny", .15, "#495057"], ["🌬️", "The wind carries it here", "wind", .4, "#3a86ff"], ["🌧️", "Rain washes it out", "rain", .55, "#00b4d8"], ["👃", "Your nose and lungs protect you", "nose", .85, "#ef476f"]];
  s.rows = rows.map(([e, lab, w, f, col], i) => { const c = chip(s.stage, e + "  " + lab, col, {fs: 48}); return {c, w, f, y: 170 + i * 175}; });
  s.tease = chip(s.stage, "💡 Next week: how does Singapore keep the lights on?", "#3a0ca3", {fs: 40});
  s.run = t => { const tn = has("close", "next") ? cue("close", "next", .8) : 1e9;
    s.rows.forEach(r => { popAt(r.c, 600, r.y, t, cue("close", r.w, r.f)); op(r.c, ramp(t, cue("close", r.w, r.f) - .05, cue("close", r.w, r.f) + .1) * (1 - .6 * ramp(t, tn - .2, tn + .3))); });
    popAt(s.tease, 600, 850, t, tn); }; return s; })();

// ---- NOW YOU KNOW!
S.nyk = (() => { const s = scene("nyk", "#ffbe0b", "#fb5607");
  s.rays = el("g", {}, s.stage); for (let i = 0; i < 16; i++) el("path", {d: `M0 0 L${Math.cos(i * Math.PI / 8 - .1) * 900} ${Math.sin(i * Math.PI / 8 - .1) * 900} L${Math.cos(i * Math.PI / 8 + .1) * 900} ${Math.sin(i * Math.PI / 8 + .1) * 900} Z`, fill: "#fff", opacity: .18}, s.rays);
  s.t = el("g", {}, s.stage);
  tx(s.t, {x: 0, y: 0, "text-anchor": "middle", "font-size": 170, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 22}, "Now You");
  tx(s.t, {x: 0, y: 180, "text-anchor": "middle", "font-size": 190, "font-weight": 700, fill: "#ffe14d", class: "out", "stroke-width": 24}, "Know!");
  s.run = t => { const t0 = SC.nyk.t0; tf(s.rays, `translate(600 420) rotate(${t * 25})`);
    tf(s.t, `translate(600 380) scale(${Math.max(0, pop(t, t0 - .1, .5)) * (1 + .04 * Math.sin(t * 7))}) rotate(${Math.sin(t * 5) * 2})`); }; return s; })();

// ---- END CARD (episode only)
S.end = (() => { const s = scene("end", "#3a0ca3", "#7209b7"), N = CFG.next || [];
  N.forEach((ln, i) => tx(s.stage, {x: 600, y: 230 + i * 120, "text-anchor": "middle", "font-size": i ? 84 : 46, "font-weight": 700, fill: i ? "#fff" : "#ffe14d", class: i ? "out" : "", "stroke-width": 10, "letter-spacing": i ? 0 : 6}, ln));
  const c = chip(s.stage, "🌏 Science Around Us · a new episode every Thursday", "#f72585", {fs: 38});
  s.run = t => { popAt(c, 600, 720, t, TL.END - (CFG.outro || 3.8) + 2.8); }; return s; })();

// ---- QUESTION CARD (Shorts only: the question is in the header, this is the opening beat)
S.qcard = (() => { const s = scene("qcard", "#4361ee", "#7209b7");
  s.e = emo(s.stage, 600, 380, 300, "🤔"); s.c = chip(s.stage, "🌏 Science Around Us", "#f72585", {fs: 48});
  s.run = t => { tf(s.e, `translate(600 380) scale(${Math.max(0, pop(t, .2)) * (1 + .06 * Math.sin(t * 6))}) translate(-600 -380)`); popAt(s.c, 600, 720, t, .5); }; return s; })();
