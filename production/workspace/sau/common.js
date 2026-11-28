/* TheOneApp, Explored: drawings and scenes every episode shares (from EP01). Load before an episode's scenes.js. */

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
  tx(s.hi, {x: 0, y: 125, "text-anchor": "middle", "font-size": 104, "font-weight": 700, fill: "#ffe14d", class: "out", "stroke-width": 14}, "TheOneApp, Explored!");
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
  const c = chip(s.stage, CFG.endChip || "🌏 TheOneApp, Explored · a new episode every Thursday", "#f72585", {fs: 38});
  s.run = t => { popAt(c, 600, 720, t, TL.END - (CFG.outro || 3.8) + 2.8); }; return s; })();

// ---- QUESTION CARD (Shorts only: the question is in the header, this is the opening beat)
S.qcard = (() => { const s = scene("qcard", "#4361ee", "#7209b7");
  s.e = emo(s.stage, 600, 380, 300, "🤔"); s.c = chip(s.stage, "🌏 TheOneApp, Explored", "#f72585", {fs: 48});
  s.run = t => { tf(s.e, `translate(600 380) scale(${Math.max(0, pop(t, .2)) * (1 + .06 * Math.sin(t * 6))}) translate(-600 -380)`); popAt(s.c, 600, 720, t, .5); }; return s; })();

/* ---- FIRST-PERSON KIT (the teacher, 18 Nov 2026): the camera IS the particle. We fly with it at its size; things rush past and
   loom up. VP is the middle of the whole screen in scene units; FULL covers the whole screen. Mix with outside shots for variety. */
const VP = SHORT ? [600, 450] : [810, 480];
const FULL = SHORT ? {x: -100, y: -700, w: 1400, h: 2300} : {x: -170, y: -80, w: 1960, h: 1120};
function fullRect(p, fill, o = 1) { return el("rect", {x: FULL.x, y: FULL.y, width: FULL.w, height: FULL.h, fill, opacity: o}, p); }
// a soft coloured edge: "this is you" (cyan = the gas, yellow = light or electricity)
function vignette(p, col, a = .55) { const id = "vg" + (vignette.n = (vignette.n || 0) + 1); const g = el("radialGradient", {id, cx: .5, cy: .5, r: .72}, $("v").querySelector("defs"));
  el("stop", {offset: .5, "stop-color": col, "stop-opacity": 0}, g); el("stop", {offset: 1, "stop-color": col, "stop-opacity": a}, g);
  return el("rect", {x: FULL.x, y: FULL.y, width: FULL.w, height: FULL.h, fill: `url(#${id})`}, p); }
// a fly-through field: things spread in depth that rush towards the camera as `off` grows (one unit of off = the whole depth)
function field(p, n, sd, make, clear = 0) { const G = el("g", {}, p); seed = sd; const a = [];
  for (let i = 0; i < n; i++) { let x = rnd() * 2 - 1, y = rnd() * 2 - 1; const z0 = rnd(), u = rnd();
    if (Math.abs(x) < clear && Math.abs(y) < clear) { if (Math.abs(x) > Math.abs(y)) x = Math.sign(x) * clear; else y = (y < 0 ? -1 : 1) * clear; }
    const e = el("g", {}, G); const sv = seed; make(e, i); seed = sv; a.push({x, y, z0, u, i, e}); } a.G = G; return a; }
function flyField(a, off, spread = 900, fn) { a.forEach(o => { const z = ((o.z0 - off) % 1 + 1) % 1, zz = .08 + 2.6 * z; o.z = z;
    let sx = VP[0] + o.x * spread / zz, sy = VP[1] + o.y * spread * .7 / zz; if (fn) [sx, sy] = fn(o, sx, sy, z);
    tf(o.e, `translate(${sx} ${sy}) scale(${.5 / zz}) rotate(${o.u * 360 + off * 60 * (o.u - .5)})`); op(o.e, clamp((1 - z) / .3) * clamp((z - .004) / .05)); });
  a.slice().sort((p, q) => q.z - p.z).forEach(o => a.G.appendChild(o.e)); }      // near things in front
// a tunnel: rings drawn at radius 300 that rush past the camera
function tunnelG(p, n, make) { const G = el("g", {}, p); const a = []; for (let i = 0; i < n; i++) { const e = el("g", {}, G); make(e, i); a.push({z0: i / n, e}); } a.G = G; return a; }
function runTunnel(a, off, R = 380) { a.forEach(o => { const z = ((o.z0 - off) % 1 + 1) % 1, zz = .12 + 8 * z; o.z = z;
    tf(o.e, `translate(${VP[0]} ${VP[1]}) scale(${R / 300 / zz})`); op(o.e, clamp((1 - z) / .3)); });
  a.slice().sort((p, q) => q.z - p.z).forEach(o => a.G.appendChild(o.e)); }
// a short text card at the bottom of a picture-only shot
function povCard(p, text, col = "#1b1b3a") { return chip(p, text, col, {fs: 34}); }
function showCard(c, t, a, b, y = 905) { tf(c, `translate(${VP[0]} ${y}) scale(${Math.max(0, pop(t, a))})`); op(c, on(t, a, b, .3)); }
function blob(p, r, col, sd) { seed = sd; const P = []; for (let k = 0; k < 10; k++) { const an = k / 10 * Math.PI * 2, rr = r * (.72 + .4 * rnd()); P.push([Math.cos(an) * rr, Math.sin(an) * rr]); }
  const d = `M${(P[9][0] + P[0][0]) / 2} ${(P[9][1] + P[0][1]) / 2} ` + P.map((q, k) => { const n = P[(k + 1) % 10]; return `Q${q[0]} ${q[1]} ${(q[0] + n[0]) / 2} ${(q[1] + n[1]) / 2}`; }).join(" ") + " Z";
  return el("path", {d, fill: col, stroke: INK, "stroke-width": 6}, p); }

// ---- ARE YOU READY? 3, 2, 1, GO! (the teacher, 19 Nov 2026): straight after "Today you'll learn", into the first-person journey.
// Heart says "Are you ready? Three, two, one, go!"; each number lands on her word.
S.countdown = (() => { const s = scene("countdown", "#3a0ca3", "#f72585");
  s.rays = el("g", {}, s.stage); for (let i = 0; i < 16; i++) el("path", {d: `M0 0 L${Math.cos(i * Math.PI / 8 - .1) * 900} ${Math.sin(i * Math.PI / 8 - .1) * 900} L${Math.cos(i * Math.PI / 8 + .1) * 900} ${Math.sin(i * Math.PI / 8 + .1) * 900} Z`, fill: "#fff", opacity: .1}, s.rays);
  s.q = tx(s.stage, {x: 0, y: 0, "text-anchor": "middle", "font-size": 120, "font-weight": 700, fill: "#ffe14d", class: "out", "stroke-width": 16}, "Are you ready?");
  s.ring = el("circle", {cx: 810, cy: 520, r: 200, fill: "none", stroke: "#fff", "stroke-width": 22, opacity: 0, "stroke-linecap": "round", transform: "rotate(-90 810 520)"}, s.stage);
  s.nums = ["3", "2", "1", "GO!"].map((n, i) => { const g = el("g", {}, s.stage);
    if (i < 3) el("circle", {r: 170, fill: ["#06d6a0", "#ffbe0b", "#ef476f"][i], stroke: INK, "stroke-width": 12}, g);
    tx(g, {x: 0, y: i < 3 ? 85 : 70, "text-anchor": "middle", "font-size": i < 3 ? 260 : 230, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 18}, n); return g; });
  const C = 2 * Math.PI * 200;
  s.run = t => { const a = (w, f) => cue("countdown", w, f), T = [a("three", .45), a("two", .62), a("one", .78), a("go", .92)];
    tf(s.rays, `translate(810 520) rotate(${t * 20})`);
    const qOn = 1 - ramp(t, T[0] - .2, T[0]); tf(s.q, `translate(810 ${lerp(470, 300, ramp(t, SC.countdown.t0, SC.countdown.t0 + .4))}) scale(${Math.max(0, pop(t, SC.countdown.t0 - .1, .5))})`); op(s.q, qOn);
    s.nums.forEach((g, i) => { const t0 = T[i], t1 = i < 3 ? T[i + 1] : 1e9;
      tf(g, `translate(810 520) scale(${Math.max(0, pop(t, t0 - .05, .35)) * (i === 3 ? 1 + .1 * ramp(t, t0, t0 + .6) : 1)})`); op(g, on(t, t0 - .05, t1 + .02, .08)); });
    const k = clamp((t - T[0]) / Math.max(.3, T[3] - T[0])); set(s.ring, "stroke-dasharray", `${C * (1 - k)} ${C}`); op(s.ring, on(t, T[0] - .05, T[3], .1)); }; return s; })();
