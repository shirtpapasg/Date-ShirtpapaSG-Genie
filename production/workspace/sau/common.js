/* Science Around Us: drawings and scenes every episode shares (from EP01). Load before an episode's scenes.js. */

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
    emo(g, -320, y, 88, icon); tx(g, {x: -240, y: y + 21, "font-size": Math.min(56, 770 / (label.length * .53)), "font-weight": 700, fill: INK}, label); return {g, cw}; });
  s.run = t => { const tB = cue("welcome", "today", .25) - .35, go = cue("welcome", "started", .95);
    const a = 1 - ramp(t, tB - .3, tB + .1);
    tf(s.wave, `translate(600 ${200 - 40 * (1 - a)}) scale(${Math.max(0, pop(t, SC.welcome.t0 - .1)) * a}) rotate(${Math.sin(t * 3) * 10})`);
    tf(s.hi, `translate(600 ${470 - 60 * (1 - a)}) scale(${Math.max(0, pop(t, cue("welcome", "welcome", 0) - .15)) * a})`); op(s.hi, a);
    const b = Math.max(0, pop(t, tB, .55)), bump = 1 + .04 * on(t, go, go + .5, .2);
    tf(s.board, `translate(600 ${450 + Math.sin(t * 1.5) * 6}) scale(${b * bump})`); op(s.board, b > 0 ? 1 : 0);
    s.rows.forEach(r => { const k = Math.max(0, pop(t, cue("welcome", r.cw, .5) - .1)); tf(r.g, `translate(${-60 * (1 - Math.min(1, k))} 0)`); op(r.g, clamp(k)); }); };
  return s; })();

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
