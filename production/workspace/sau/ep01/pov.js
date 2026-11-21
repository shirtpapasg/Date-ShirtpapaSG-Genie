/* TheOneApp, Explored EP01: the haze journey in FIRST PERSON (the teacher, 18 Nov 2026). Load after common.js, geo_map.js and ep01/scenes.js.
   The camera IS one tiny bit of smoke (a PM2.5 particle). Picture-only shots (sound effects, no voice), in this order:
     peat (outside) > povFire > povRise > drift (outside, real map) > povArrive > povNose > povLung   ...later: povRain ... clear (outside)
   Science kept true: peat smoulders under the ground (no bonfire flames); hot air rises; south-west winds blow from June to September;
   the nose's hairs and sticky mucus trap BIG dust, but PM2.5 (30 times thinner than a hair) slips through, down the windpipe, along airways
   that branch again and again, to the air sacs, where oxygen passes into the blood; raindrops (round, not tear-shaped) wash particles out of the air.
   The edge colour says what "we" are: smoky tan = a smoke particle in air, blue = inside a raindrop.
   Every frame depends only on t. All names here start with hz, so this file never clashes with ep02/pov.js.
   This file replaces the old S.peat, S.drift and S.clear from ep01/scenes.js (their drawings are removed below); S.rise, S.arrive, S.breath
   and S.rainfall there are no longer used. */
["peat", "drift", "clear"].forEach(n => { if (S[n] && S[n].g) S[n].g.remove(); });

/* ---- helpers (EP02's first-person helpers under new names) ---- */
const hzT = n => SC[n] ? SC[n].t0 : -1e6, hzD = n => SC[n] ? SC[n].t1 - SC[n].t0 : 1;
const HZ = "#b59a78", X0 = VP[0], Y0 = VP[1];
function hzGradR(stops, a = {}) { const id = "hzr" + (hzGradR.n = (hzGradR.n || 0) + 1), g = el("radialGradient", Object.assign({id, cx: .5, cy: .5, r: .5}, a), $("v").querySelector("defs"));
  stops.forEach(([o, c, al]) => el("stop", {offset: o, "stop-color": c, "stop-opacity": al === undefined ? 1 : al}, g)); return `url(#${id})`; }
function hzGradL(stops, a = {}) { const id = "hzl" + (hzGradL.n = (hzGradL.n || 0) + 1), g = el("linearGradient", Object.assign({id, x1: 0, y1: 0, x2: 0, y2: 1}, a), $("v").querySelector("defs"));
  stops.forEach(([o, c, al]) => el("stop", {offset: o, "stop-color": c, "stop-opacity": al === undefined ? 1 : al}, g)); return `url(#${id})`; }
function hzGlow(p, col, r, a = 1, core = 0) { return el("circle", {r, fill: hzGradR([[0, col, a], [core, col, a], [1, col, 0]])}, p); }
function hzRound(p, stops, r = .78) { return el("rect", {x: FULL.x - 700, y: FULL.y - 700, width: FULL.w + 1400, height: FULL.h + 1400, fill: hzGradR(stops, {r: r * FULL.w / (FULL.w + 1400)})}, p); }
function hzLab(p, text, fs = 44, fill = "#fff") { return tx(p, {x: 0, y: 0, "text-anchor": "middle", "font-size": fs, "font-weight": 700, fill, class: "out", "stroke-width": fs * .22}, text); }
function hzBig(p, text, col = INK) { return chip(p, text, col, {fs: 50}); }
function hzShow(c, t, a, b, y = 884) { showCard(c, t, a, b, y); }
function hzAt(e, x, y, t, a, b, sc = 1) { tf(e, `translate(${x} ${y}) scale(${sc * Math.max(0, pop(t, a))})`); op(e, on(t, a, b, .25)); }
// where a thing at (x, y) across and z deep lands on the screen: [screen x, screen y, scale]
function hzP(x, y, z, o = {}) { const zz = .08 + (o.k || 2.6) * z, sp = o.spread || 900; return [X0 + (o.cx || 0) + x * sp / zz, Y0 + (o.cy || 0) + y * sp * .7 / zz, .5 / zz]; }
// flyField with choices: o.spread, o.fog, o.rot = 0 (upright), o.k (depth), o.cx/o.cy (move the vanishing point), o.fn(o, x, y, z, scale) -> [x, y, scale, rot]
function hzFly(a, off, o = {}) { const fog = o.fog || .3;
  a.forEach(ob => { const z = ((ob.z0 - off) % 1 + 1) % 1; ob.z = z; let [sx, sy, sc] = hzP(ob.x, ob.y, z, o), r = o.rot === 0 ? 0 : ob.u * 360 + off * 60 * (ob.u - .5);
    if (o.fn) { const q = o.fn(ob, sx, sy, z, sc); if (q) { sx = q[0]; sy = q[1]; if (q[2] !== undefined) sc = q[2]; if (q[3] !== undefined) r = q[3]; } }
    tf(ob.e, `translate(${sx} ${sy}) scale(${sc}) rotate(${r})`); op(ob.e, clamp((1 - z) / fog) * clamp((z - .004) / (o.nf || .05)) * (o.a === undefined ? 1 : o.a) * (ob.al === undefined ? 1 : ob.al)); });
  a.slice().sort((p, q) => q.z - p.z).forEach(ob => a.G.appendChild(ob.e)); }
function hzStreaks(p, n, sd, col, w = 6) { const G = el("g", {}, p); seed = sd; const a = [];
  for (let i = 0; i < n; i++) a.push({an: rnd() * Math.PI * 2, u: rnd(), v: .6 + rnd() * .8, e: el("line", {stroke: col, "stroke-width": w, "stroke-linecap": "round"}, G)}); a.G = G; return a; }
function hzRunStreaks(a, ph, o = {}) { const cx = X0 + (o.x || 0), cy = Y0 + (o.y || 0);
  a.forEach(s => { const k = ((s.u + ph * s.v) % 1 + 1) % 1, r1 = (o.r0 || 90) + (o.r1 || 1150) * k * k, r2 = r1 * (1 + (o.len || .22)), c = Math.cos(s.an), sn = Math.sin(s.an);
    set(s.e, "x1", cx + c * r1); set(s.e, "y1", cy + sn * r1); set(s.e, "x2", cx + c * r2); set(s.e, "y2", cy + sn * r2); op(s.e, Math.sin(k * Math.PI) * (o.a === undefined ? .7 : o.a)); }); }
function hzTube(a, off, R = 380, bx = 0, by = 0, K = 8, al = 1) { a.forEach(o => { const z = ((o.z0 - off) % 1 + 1) % 1, zz = .12 + K * z, q = 1 - .12 / zz; o.z = z;
    tf(o.e, `translate(${X0 + bx * q} ${Y0 + by * q}) scale(${R / 300 / zz})`); op(o.e, clamp((1 - z) / .3) * clamp(z / .02) * al); });
  a.slice().sort((p, q) => q.z - p.z).forEach(o => a.G.appendChild(o.e)); }
// another tiny bit of smoke (a friend): a lumpy soot-brown blob with a face; r = 24 is about the size of meDust
const HZC = ["#7d6f5a", "#8a7866", "#6f6150", "#94836c"];
function hzMote(p, r = 24, sd = 1, col) { const sv = seed, g = el("g", {}, p), k = r / 24, b = blob(g, r * 1.12, col || HZC[sd % 4], 900 + sd * 13); set(b, "stroke-width", 4 * k); seed = sv;
  el("ellipse", {cx: -9 * k, cy: -14 * k, rx: 7 * k, ry: 4 * k, fill: "#fff", opacity: .35, transform: `rotate(-30 ${-9 * k} ${-14 * k})`}, g);
  [-8, 8].forEach(x => { el("circle", {cx: x * k, cy: -3 * k, r: 5.6 * k, fill: "#fff"}, g); el("circle", {cx: (x + 1) * k, cy: -2 * k, r: 2.8 * k, fill: INK}, g); });
  el("path", {d: `M${-6 * k} ${9 * k} Q0 ${13 * k} ${6 * k} ${9 * k}`, fill: "none", stroke: INK, "stroke-width": 2.6 * k, "stroke-linecap": "round"}, g); return g; }
// a soft puff of smoke or haze (no blur filter)
function hzPuff(p, r, col = "#b9ae9f", a = .6) { return hzGlow(p, col, r, a, .25); }
// a "YOU" tag pointing down at something
function hzYou(p) { const g = el("g", {}, p); el("path", {d: "M-62 -92 H62 Q74 -92 74 -80 V-44 Q74 -32 62 -32 H16 L0 -8 L-16 -32 H-62 Q-74 -32 -74 -44 V-80 Q-74 -92 -62 -92 Z", fill: "#ffe14d", stroke: INK, "stroke-width": 5, "stroke-linejoin": "round"}, g);
  tx(g, {x: 0, y: -46, "text-anchor": "middle", "font-size": 42, "font-weight": 700, fill: INK}, "YOU"); return g; }

// ---- 1. peat (outside): peat land in Riau. The fire is UNDER the ground: the peat glows and smokes, with no big flames. One bit of smoke is born: us
S.peat = (() => { const s = scene("peat", "#2b2d42", "#3d405b"), st = s.stage, c = s.cam = el("g", {}, st), GY = 520, MX = 700;
  el("rect", {x: -1600, y: -1700, width: 4800, height: 1700 + GY, fill: hzGradL([[0, "#39445c"], [.6, "#76808f"], [.88, "#c7a58b"], [1, "#eab98a"]])}, c);
  const sun = el("g", {transform: "translate(300 150)"}, c); hzGlow(sun, "#ff9e58", 210, .55, .2); el("circle", {r: 58, fill: "#ff7b3a", opacity: .92}, sun);
  // far forest edge, then the land: living trees on the left, burnt stumps where the fire has been
  seed = 201; let fd = `M-1600 ${GY}`; for (let x = -1600; x < 3200; x += 60) fd += ` L${x} ${GY - 60 - rnd() * 50} L${x + 30} ${GY - 96 - rnd() * 60}`; el("path", {d: fd + ` L3200 ${GY} Z`, fill: "#5d7366", opacity: .8}, c);
  const tree = (x, h, k) => { const g = el("g", {transform: `translate(${x} ${GY})`}, c); el("rect", {x: -11, y: -h, width: 22, height: h, fill: "#6b4a35", stroke: INK, "stroke-width": 5}, g);
    [[0, -h - 30, 74], [-52, -h + 14, 52], [54, -h + 6, 56]].forEach(([dx, dy, r], i) => el("circle", {cx: dx, cy: dy, r: r * k, fill: i ? "#40916c" : "#52b788", stroke: INK, "stroke-width": 5}, g)); };
  [[-560, 230, 1.1], [-330, 180, .9], [-120, 250, 1.15], [90, 170, .85], [1560, 200, 1], [1780, 240, 1.1], [2050, 190, .9]].forEach(a => tree(...a));
  [[330, 70], [520, 46], [980, 84], [1180, 52], [1330, 66]].forEach(([x, h]) => { el("path", {d: `M${x - 13} ${GY} L${x - 9} ${GY - h} L${x - 2} ${GY - h - 16} L${x + 5} ${GY - h + 4} L${x + 12} ${GY - h - 8} L${x + 13} ${GY} Z`, fill: "#2f2622", stroke: INK, "stroke-width": 5, "stroke-linejoin": "round"}, c); });
  // the ground in cross-section: dry peat on top (it burns), wet peat below
  el("rect", {x: -1600, y: GY, width: 4800, height: 1400, fill: hzGradL([[0, "#5a3d2b"], [.25, "#3f2a1d"], [1, "#22150d"]])}, c);
  seed = 203; for (let k = 0; k < 150; k++) { const x = -700 + rnd() * 3000, y = GY + 24 + rnd() * 600; el("path", {d: `M${x} ${y} q${10 + rnd() * 18} ${-10 + rnd() * 20} ${26 + rnd() * 30} ${-4 + rnd() * 8}`, fill: "none", stroke: k % 3 ? "#7a573d" : "#8f6a48", "stroke-width": 4, "stroke-linecap": "round", opacity: .7}, c); }
  el("path", {d: `M-1600 ${GY} H220 L250 ${GY + 8} H1420 L1450 ${GY} H3200`, fill: "none", stroke: INK, "stroke-width": 8}, c);
  el("rect", {x: -1600, y: GY - 12, width: 1830, height: 16, rx: 6, fill: "#8a9a4f", stroke: INK, "stroke-width": 4}, c); el("rect", {x: 1440, y: GY - 12, width: 1800, height: 16, rx: 6, fill: "#8a9a4f", stroke: INK, "stroke-width": 4}, c);
  el("rect", {x: 240, y: GY - 2, width: 1190, height: 22, rx: 8, fill: "#262019", stroke: INK, "stroke-width": 4}, c);                 // ash where it has burnt
  // the smouldering peat: glowing pockets under the ground, with cracks up to the surface
  const seam = el("g", {transform: `translate(830 ${GY + 128})`}, c); el("ellipse", {rx: 780, ry: 230, fill: hzGradR([[0, "#ff6a00", .85], [.5, "#ff6a00", .5], [1, "#ff6a00", 0]])}, seam);
  const sb = blob(seam, 100, "#9d2a0a", 301); set(sb, "stroke", "#4a1204"); set(sb, "stroke-width", 2); tf(sb, "scale(6 1)"); const sb2 = blob(seam, 74, "#e85d04", 302); set(sb2, "stroke", "none"); tf(sb2, "scale(6.6 1)");
  seed = 205; s.hot = []; for (let k = 0; k < 12; k++) { const x = 290 + k * 98 + rnd() * 40, y = GY + 96 + rnd() * 70, g = el("g", {transform: `translate(${x} ${y})`}, c);
    hzGlow(g, "#ffb703", 80, .9, .2); const y2 = blob(g, 20 + rnd() * 16, "#ffe08a", 320 + k); set(y2, "stroke", "none");
    if (k % 2) el("path", {d: `M0 -40 q${-14 + rnd() * 28} ${-(y - GY) / 2 + 20} ${-8 + rnd() * 16} ${-(y - GY) + 44}`, fill: "none", stroke: "#ff9e00", "stroke-width": 7, "stroke-linecap": "round", opacity: .85}, c.appendChild(el("g", {transform: `translate(${x} ${y})`}))); s.hot.push({g, ph: rnd() * 6, x, y}); }
  s.puffs = []; seed = 207; for (let k = 0; k < 46; k++) s.puffs.push({e: hzPuff(c, 70 + rnd() * 70, k % 3 ? "#ece6dc" : "#b3aa9d", .85), x: 280 + rnd() * 1120, u: rnd(), v: .7 + rnd() * .6, w: rnd()});
  s.me = meDust(c); s.you = hzYou(c);
  vignette(st, HZ, .35); s.l1 = hzLab(st, "peat: soil made of old, dead plants", 46); s.l2 = hzLab(st, "it smoulders under the ground", 46, "#ffe14d"); s.l3 = hzLab(st, "smoke", 54); s.flood = fullRect(st, "#7d6f5a", 0);
  s.top = hzLab(st, "You are a tiny bit of smoke…", 64); s.card = hzBig(st, "Peat land · Riau, Sumatra · August 2026");
  s.run = t => { const t0 = hzT("peat"), u = t - t0, D = hzD("peat"), dv = clamp((u - (D - 2.5)) / 1.9);
    const born = ramp(u, 1.3, 1.8), my = lerp(GY + 96, GY - 170, ease((u - 1.5) / 2.2)), mx = MX + 26 * Math.sin((u - 1.5) * 1.6) * ramp(u, 1.5, 2.5);
    const z = lerp(1, 1.22, ease(u / (D - 2.5))) * Math.exp(4.3 * dv * dv * dv + .5 * dv), k = ease((u - .6) / 2.2);
    tf(c, `translate(${X0} ${Y0}) scale(${z}) translate(${-lerp(810, mx, k)} ${-lerp(470, my - 3, k)})`);
    s.hot.forEach(h => op(h.g, .72 + .28 * Math.sin(t * 5 + h.ph) * Math.sin(t * 1.7 + h.ph * 2)));
    s.puffs.forEach(p => { const q = (p.u + t * .11 * p.v) % 1; tf(p.e, `translate(${p.x + q * q * 520 + Math.sin(q * 7 + p.w * 6) * 24} ${GY - 10 - q * 640}) scale(${.35 + 1.5 * q})`); op(p.e, Math.sin(Math.min(1, q * 1.3) * Math.PI) * .85 * (1 - .5 * dv)); });
    tf(s.me, `translate(${mx} ${my}) scale(${born * 1.5})`); tf(s.you, `translate(${mx} ${my - 34}) scale(${Math.max(0, pop(u, 1.9)) * (1 - ramp(u, D - 2.4, D - 2.0))})`);
    const la = on(u, .5, D - 2.5, .3); tf(s.l1, `translate(330 835)`); op(s.l1, la); tf(s.l2, `translate(1290 835)`); op(s.l2, on(u, .9, D - 2.5, .3)); tf(s.l3, `translate(1330 240)`); op(s.l3, la);
    op(s.flood, ramp(u, D - .78, D - .55)); tf(s.top, `translate(${X0} 52)`); op(s.top, on(u, .35, D - 1.7, .3)); hzShow(s.card, t, t0 + .5, t0 + D - 1.7, 930); }; return s; })();

// ---- 2. povFire: born in the smouldering peat. Dark peat all round us, embers glowing below, other bits of smoke; the hot smoke pushes us up to a gap of sky
S.povFire = (() => { const s = scene("povFire", "#120a06", "#120a06"), st = s.stage; s.w = el("g", {}, st);
  hzRound(s.w, [[0, "#4a2c18"], [.5, "#24140b"], [1, "#0c0704"]]);
  s.hole = el("g", {}, s.w); hzGlow(s.hole, "#fff1d6", 520, .8, .2); const hb = blob(s.hole, 150, "#e6dccb", 71); set(hb, "stroke-width", 9); const hb2 = blob(s.hole, 104, "#f7f0e2", 72); set(hb2, "stroke", "none");
  el("rect", {x: FULL.x, y: FULL.y, width: FULL.w, height: FULL.h, fill: hzGradL([[0, "#ff7b00", 0], [.42, "#ff7b00", 0], [.78, "#ff6a00", .5], [1, "#ffc94d", .95]])}, s.w);
  const cols = ["#3a271b", "#2c1d14", "#4a3323", "#33221a"];
  s.clods = field(s.w, 64, 411, (e, i) => { const rim = blob(e, 352, i % 3 ? "#ff7b00" : "#ffb703", 1000 + i * 7); set(rim, "stroke", "none"); blob(e, 322, cols[i % 4], 1000 + i * 7);
    seed = 600 + i; for (let k = 0; k < 6; k++) { const x = (rnd() - .5) * 380, y = (rnd() - .5) * 340; el("path", {d: `M${x} ${y} q${20 + rnd() * 30} ${-20 + rnd() * 40} ${50 + rnd() * 40} ${rnd() * 16}`, fill: "none", stroke: "#8f6a48", "stroke-width": 9, "stroke-linecap": "round", opacity: .7}, e); }
    e.em = []; for (let k = 0; k < 3; k++) { const d = el("g", {transform: `translate(${(rnd() - .5) * 360} ${90 + rnd() * 170})`}, e); hzGlow(d, "#ff9e00", 90, .9, .2); el("circle", {r: 20, fill: "#ffe08a"}, d); e.em.push(d); } }, .24);
  s.puffs = field(s.w, 18, 55, (e, i) => hzPuff(e, 300, i % 2 ? "#cfc6b8" : "#9c9286", .5), .1);
  seed = 61; s.sparks = []; for (let k = 0; k < 30; k++) { const g = el("g", {}, s.w); hzGlow(g, "#ffb703", 26, .8, .2); el("circle", {r: 6, fill: "#fff3b0"}, g); s.sparks.push({g, x: rnd(), u: rnd(), v: .5 + rnd(), w: rnd() * 6}); }
  s.mates = field(s.w, 13, 77, (e, i) => hzMote(e, 96, i + 1), .13);
  s.vg = vignette(st, HZ, .6); s.blink = fullRect(st, "#7d6f5a", 0); s.flood = fullRect(st, "#e3d9c8", 0);
  s.card = hzBig(st, "Born in smouldering peat, under the ground"); s.card2 = hzBig(st, "Hot smoke rushes up… and out!", "#b3541e");
  s.run = t => { const t0 = hzT("povFire"), u = t - t0, D = hzD("povFire"), ua = Math.max(0, u), esc = clamp((u - D * .45) / (D * .43)), e3 = esc * esc * esc;
    const off = .05 * u + .5 * esc * esc, cy = lerp(-250, 0, ease(esc / .8)), hs = .5 * Math.exp(4.2 * e3 + .9 * esc);
    tf(s.hole, `translate(${X0} ${Y0 + cy}) scale(${hs})`);
    const clr = (o, x, y, z, sc) => { o.al = clamp((Math.hypot(x - X0, y - Y0 - cy) - 120 * hs - 250 * sc) / 120 + 1 - ramp(esc, .1, .4)); (o.e.em || []).forEach((d, k) => op(d, .6 + .4 * Math.sin(t * 6 + o.i + k * 2))); };
    hzFly(s.clods, off, {fog: .16, k: 1.9, nf: .02, cy, fn: clr});
    hzFly(s.puffs, off * 1.6 + .05 * u, {fog: .6, cy, rot: 0, a: .8});
    s.sparks.forEach(p => { const q = ((p.u + ua * .4 * p.v) % 1); tf(p.g, `translate(${FULL.x + p.x * FULL.w + Math.sin(q * 9 + p.w) * 40} ${1040 - q * 1150}) scale(${.6 + p.v})`); op(p.g, Math.sin(q * Math.PI)); });
    hzFly(s.mates, off * .45, {rot: 0, fog: .7, k: 1.9, cy, fn: (o, x, y, z, sc) => [x + Math.sin(t * 9 + o.u * 40) * 7 * sc, y + Math.cos(t * 11 + o.u * 70) * 7 * sc - 60 * esc * sc, sc, Math.sin(t * 7 + o.u * 30) * 8]});
    op(s.blink, 1 - ramp(u, -.35, .15)); op(s.flood, ramp(u, D - .82, D - .55));
    hzShow(s.card, t, t0 + .4, t0 + D * .46); hzShow(s.card2, t, t0 + D * .5, t0 + D); }; return s; })();

// ---- 3. povRise: hot air lifts us. First we look UP: tree trunks all round, the gap in the leaves opens and rushes past. Then we look DOWN: the land shrinks below
S.povRise = (() => { const s = scene("povRise", "#cfc5b4", "#cfc5b4"), st = s.stage;
  // looking up
  s.up = el("g", {}, st); hzRound(s.up, [[0, "#f3ead9"], [.5, "#ddd2bf"], [1, "#b9ad9a"]]);
  s.for = el("g", {}, s.up); let ring = "M-5000 -5000 H5000 V5000 H-5000 Z M250 0"; for (let k = 1; k <= 72; k++) { const a = -k / 72 * 6.2832, r = 250 + 40 * Math.sin(a * 3 + 1) + 22 * Math.sin(a * 7); ring += ` L${r * Math.cos(a)} ${r * Math.sin(a)}`; }
  el("path", {d: ring + " Z", fill: hzGradR([[0, "#3f6b4f"], [.12, "#2d4a38"], [1, "#16261d"]]), "fill-rule": "evenodd"}, s.for);
  seed = 221; for (let k = 0; k < 9; k++) { const a = k / 9 * 6.2832 + rnd() * .3, r0 = 250 + rnd() * 120, w1 = 190 + rnd() * 90, ch = k % 4 === 1, g = el("g", {transform: `rotate(${a * 57.2958})`}, s.for);
    el("path", {d: `M${r0} -12 L2600 ${-w1} L2600 ${w1} L${r0} 12 Z`, fill: ch ? "#3a2d27" : "#7a5236", stroke: INK, "stroke-width": 8, "stroke-linejoin": "round"}, g);
    el("path", {d: `M${r0 + 30} -3 L2600 ${-w1 * .45} L2600 ${-w1 * .15} Z`, fill: ch ? "#54443c" : "#9a6c48", opacity: .8}, g); }
  seed = 223; for (let k = 0; k < 44; k++) { const a = k / 44 * 6.2832 + rnd() * .2, r = 270 + (k % 3) * 150 + rnd() * 60, g = el("g", {transform: `translate(${r * Math.cos(a)} ${r * Math.sin(a)}) rotate(${rnd() * 360})`}, s.for);
    blob(g, 70 + rnd() * 60, ["#40916c", "#52b788", "#2d6a4f", "#74c69d"][k % 4], 700 + k); }
  s.str = hzStreaks(s.up, 30, 5, "#fff8e8", 6);
  // looking down
  s.dn = el("g", {}, st); s.land = el("g", {}, s.dn); const L = s.land;
  el("rect", {x: -3200, y: -2400, width: 6400, height: 4800, fill: "#4c8a5f"}, L);
  seed = 225; for (let k = 0; k < 230; k++) { const x = (rnd() - .5) * 6200, y = (rnd() - .5) * 4600; if (Math.hypot(x, y * 1.2) < 700) continue; el("circle", {cx: x, cy: y, r: 50 + rnd() * 60, fill: ["#3f7d55", "#5a9a6b", "#366f4b"][k % 3], stroke: "#2c5a3e", "stroke-width": 5}, L); }
  el("path", {d: "M1500 -2400 C1300 -1500 1900 -900 1700 -200 C1560 300 2300 800 2500 2400 H3200 V-2400 Z", fill: "#3a9ad9", stroke: INK, "stroke-width": 10}, L);                 // the sea, to the east
  el("path", {d: "M1700 -200 C1100 -420 760 -820 200 -900 C-400 -980 -900 -700 -1500 -1100 C-2000 -1400 -2600 -1300 -3200 -1500", fill: "none", stroke: INK, "stroke-width": 64, "stroke-linecap": "round"}, L);
  el("path", {d: "M1700 -200 C1100 -420 760 -820 200 -900 C-400 -980 -900 -700 -1500 -1100 C-2000 -1400 -2600 -1300 -3200 -1500", fill: "none", stroke: "#4ea8de", "stroke-width": 48, "stroke-linecap": "round"}, L);
  const pb = blob(L, 760, "#7a5a40", 81); set(pb, "stroke-width", 12); tf(pb, "scale(1.25 1)");
  [-420, -140, 140, 420].forEach(y => el("line", {x1: -760, y1: y, x2: 760, y2: y + 40, stroke: "#5fa8d3", "stroke-width": 14, opacity: .8}, L));               // drainage canals
  const scar = blob(L, 380, "#2a211c", 83); set(scar, "stroke-width", 10);
  seed = 227; s.spots = []; for (let k = 0; k < 9; k++) { const g = el("g", {transform: `translate(${(rnd() - .5) * 460} ${(rnd() - .5) * 400})`}, L); hzGlow(g, "#ff7b00", 120, .9, .2); el("circle", {r: 26, fill: "#ffd166"}, g); s.spots.push(g); }
  [[-1900, 900, .5], [-1500, -300, .4], [900, 1500, .45]].forEach(([x, y, k], i) => { const g = el("g", {transform: `translate(${x} ${y}) scale(${k})`}, L); const b = blob(g, 620, "#7a5a40", 85 + i); set(b, "stroke-width", 14); const b2 = blob(g, 300, "#2a211c", 88 + i); set(b2, "stroke", "none"); hzPuff(g, 700, "#d6cdbf", .85); });
  s.plume = []; seed = 229; for (let k = 0; k < 16; k++) s.plume.push({e: hzPuff(s.dn, 170, k % 2 ? "#eee7dc" : "#c4baab", .7), u: rnd(), an: rnd() * 6.2832, v: .6 + rnd() * .8});
  s.wisps = field(s.dn, 12, 91, e => hzPuff(e, 520, "#e9e1d3", .55), .2);
  s.str2 = hzStreaks(s.dn, 26, 7, "#fff8e8", 6);
  s.lab = hzLab(s.dn, "the peat land", 58, "#ffe14d");
  s.haze = fullRect(st, "#cfc5b4", 0);
  seed = 231; s.mates = []; for (let k = 0; k < 8; k++) s.mates.push({e: hzMote(st, 44, k + 3), an: k / 8 * 6.2832 + rnd() * .5, r: 300 + rnd() * 230, u: rnd()});
  vignette(st, HZ, .6); s.blink = fullRect(st, "#e3d9c8", 0);
  s.card = hzBig(st, "Hot air rises… and it carries us up!", "#b3541e"); s.card2 = hzBig(st, "Up above the trees. The land shrinks below us");
  s.run = t => { const t0 = hzT("povRise"), u = t - t0, D = hzD("povRise"), ua = Math.max(0, u), CUT = D * .43, up = u < CUT;
    op(s.up, up ? 1 : 0); op(s.dn, up ? 0 : 1);
    if (up) { tf(s.for, `translate(${X0} ${Y0}) scale(${.45 * Math.exp(1.03 * (u + .3))}) rotate(${-12 * u})`); hzRunStreaks(s.str, .9 * ua + .3 * ua * ua, {r0: 80, a: .6}); }
    else { const v = u - CUT, zl = .36 + 1.7 * Math.exp(-1.15 * v); tf(L, `translate(${X0} ${Y0 + 40}) scale(${zl}) rotate(${-8 + 5 * v})`);
      s.spots.forEach((g, k) => op(g, .65 + .35 * Math.sin(t * 5 + k * 2)));
      s.plume.forEach(p => { const q = (p.u + v * .22 * p.v) % 1, r = 520 * q * zl * 1.6; tf(p.e, `translate(${X0 + Math.cos(p.an) * r * .6 + q * 200} ${Y0 + 40 + Math.sin(p.an) * r * .5 - q * 120}) scale(${(.25 + 1.2 * q) * Math.max(.5, zl)})`); op(p.e, Math.sin(q * Math.PI) * .8); });
      hzFly(s.wisps, -.16 * v, {fog: .5, rot: 0, a: .8}); hzRunStreaks(s.str2, -.8 * v, {r0: 120, a: .45});
      tf(s.lab, `translate(${X0} ${Math.min(Y0 + 40 + 330 * zl + 60, 765)})`); op(s.lab, on(v, .45, 2.0, .25)); }
    s.mates.forEach(m => { const rr = m.r + 30 * Math.sin(ua * 2.2 + m.u * 9), an = m.an + .25 * Math.sin(ua * 1.3 + m.u * 5);
      tf(m.e, `translate(${X0 + Math.cos(an) * rr * 1.5} ${Y0 + Math.sin(an) * rr * .85}) scale(${.8 + .7 * m.u}) rotate(${Math.sin(t * 6 + m.u * 20) * 8})`); });
    op(s.haze, Math.max(on(u, CUT - .28, CUT + .3, .25), .85 * ramp(u, D * .7, D - .5)));
    op(s.blink, 1 - ramp(u, -.3, .2));
    hzShow(s.card, t, t0 + .2, t0 + CUT - .15); hzShow(s.card2, t, t0 + CUT + .35, t0 + D); }; return s; })();

// ---- 4. drift (outside, the real map): south-west winds, June to September, carry the smoke from the peat fires in Riau across the sea to Singapore
S.drift = (() => { const s = scene("drift", "#023e8a", "#0077b6"), st = s.stage; s.cam = el("g", {}, st); s.map = regionMap(s.cam);
  const F = GEO.fires[0], SG = GEO.sg, C = [F[0] + 62, F[1] + 34], B = (k, q) => (1 - q) * (1 - q) * F[k] + 2 * (1 - q) * q * C[k] + q * q * SG[k];
  // the wind: thin white lines that all blow from the south-west
  seed = 241; s.wind = []; for (let k = 0; k < 46; k++) s.wind.push({e: el("line", {stroke: "#fff", "stroke-width": 2.2, "stroke-linecap": "round"}, s.cam), x: 250 + rnd() * 700, y: 250 + rnd() * 500, u: rnd(), v: .7 + rnd() * .6});
  s.plume = []; seed = 243; for (let k = 0; k < 26; k++) s.plume.push({e: hzPuff(s.cam, 16 + rnd() * 12, k % 2 ? "#8d8478" : "#a59b8d", .85), u: .04 + rnd() * .96, v: rnd() - .5, w: rnd()});
  s.trail = el("path", {fill: "none", stroke: "#fff", "stroke-width": 2.6, "stroke-linecap": "round", "stroke-dasharray": "1 6"}, s.cam);
  s.fire = el("g", {transform: `translate(${F[0]} ${F[1]})`}, s.cam); s.fe = emo(s.fire, 0, -4, 26, "🔥");
  s.fl = tx(s.fire, {x: -14, y: 4, "text-anchor": "end", "font-size": 17, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 4.4}, "peat fires in Riau");
  s.sea = tx(s.cam, {x: 548, y: 392, "text-anchor": "middle", "font-size": 9.5, "font-weight": 700, fill: "#0b5c85", "font-style": "italic", transform: "rotate(38 548 392)"}, "Strait of Malacca");
  s.me = el("g", {}, s.cam); el("circle", {r: 34, fill: "none", stroke: "#ffe14d", "stroke-width": 5}, s.me); meDust(s.me); tf(hzYou(s.me), "translate(0 -30) scale(.8)");
  // a compass, the wind's name and the distance: fixed on the screen
  s.comp = el("g", {transform: "translate(70 200)"}, st); el("circle", {r: 96, fill: "#fff", stroke: INK, "stroke-width": 7, filter: "url(#sh)"}, s.comp);
  el("path", {d: "M0 -74 L20 0 L-20 0 Z", fill: "#e63946", stroke: INK, "stroke-width": 4, "stroke-linejoin": "round"}, s.comp); el("path", {d: "M0 74 L20 0 L-20 0 Z", fill: "#ced4da", stroke: INK, "stroke-width": 4, "stroke-linejoin": "round"}, s.comp);
  tx(s.comp, {x: 0, y: -100, "text-anchor": "middle", "font-size": 46, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 9}, "N");
  s.arrow = el("g", {transform: "translate(70 200)"}, st); const ag = arrowG(s.arrow, "#ffd166"); tf(ag, "translate(30 300) rotate(-45) scale(1.3)");
  s.wl = hzLab(st, "south-west wind", 46, "#ffd166");
  s.km = tx(st, {x: X0, y: 96, "text-anchor": "middle", "font-size": 96, "font-weight": 700, fill: "#ffe14d", class: "out", "stroke-width": 18}, "0 km");
  s.card = hzBig(st, "June to September: south-west winds carry the smoke to Singapore");
  s.run = t => { const t0 = hzT("drift"), u = t - t0, D = hzD("drift"), f = clamp(u / D), q = ease((u - 1.1) / (D - 2.6)), x = B(0, q), y = B(1, q);
    const z = lerp(1.8, 2.9, ease(u / (D * .5))), hw = 960 / z, hh = 540 / z, k = ease(u / 2.2);
    const cx = clamp(lerp(600, lerp(F[0], SG[0], .5) + 10, k), hw + 4, 1196 - hw), cy = clamp(lerp(440, lerp(F[1], SG[1], .5) + 8, k), hh + 4, 896 - hh);
    tf(s.cam, `translate(${X0} ${Y0}) scale(${z}) translate(${-cx} ${-cy})`);
    s.wind.forEach(w => { const p = (w.u + t * .28 * w.v) % 1, L = 46, x1 = w.x - 60 + p * 150, y1 = w.y + 60 - p * 150; set(w.e, "x1", x1); set(w.e, "y1", y1); set(w.e, "x2", x1 + L * .7 * Math.sin(p * Math.PI)); set(w.e, "y2", y1 - L * .7 * Math.sin(p * Math.PI)); op(w.e, .55 * Math.sin(p * Math.PI) * ramp(u, .2, .9)); });
    s.plume.forEach(p => { const g = Math.min(q * 1.08, p.u), a = ramp(q * 1.08, p.u - .06, p.u), wd = 8 + 26 * g; tf(p.e, `translate(${B(0, g) + p.v * wd + Math.sin(t * .8 + p.w * 6) * 1.5} ${B(1, g) + (p.w - .5) * wd}) scale(${.7 + 1.2 * g})`); op(p.e, a * .8); });
    const m = [lerp(F[0], C[0], q), lerp(F[1], C[1], q)]; set(s.trail, "d", `M${F[0]} ${F[1]} Q${m[0]} ${m[1]} ${x} ${y}`); op(s.trail, q > .002 ? .9 : 0);
    tf(s.fe, `translate(0 -4) scale(${1 + .08 * Math.sin(t * 9)}) translate(0 4)`);
    tf(s.me, `translate(${x} ${y}) scale(${1.9 / z})`);
    const ar = clamp((q - .93) / .07) * (1 - ramp(u, D - .9, D - .5)); set(s.map.sgRing, "r", 16 + 30 * ((t * 1.4) % 1)); op(s.map.sgRing, ar * (1 - (t * 1.4) % 1));
    s.km.textContent = (q > .97 ? "about " : "") + Math.round(280 * q / 10) * 10 + " km"; op(s.km, ramp(u, .9, 1.2));
    tf(s.wl, `translate(170 395)`); op(s.wl, ramp(u, .3, .7)); op(s.arrow, ramp(u, .3, .7)); op(s.comp, ramp(u, .1, .5));
    hzShow(s.card, t, t0 + .4, t0 + D + 1); }; return s; })();

// ---- 5. povArrive: riding the wind over the sea with lots of other smoke particles; Singapore's skyline comes out of the grey haze ahead
function hzCity(p, col, col2) { const g = el("g", {}, p); const b = skyline(g, -470, 0, col2); tf(b, "translate(0 0) scale(.92 .8)"); el("circle", {cx: -420, cy: -120, r: 96, fill: "none", stroke: col2, "stroke-width": 12}, g);
  for (let k = 0; k < 8; k++) el("line", {x1: -420, y1: -120, x2: -420 + 96 * Math.cos(k * .785), y2: -120 + 96 * Math.sin(k * .785), stroke: col2, "stroke-width": 5}, g); el("path", {d: "M-420 -120 L-450 0 H-390 Z", fill: col2}, g);
  skyline(g, -510, 0, col); return g; }
S.povArrive = (() => { const s = scene("povArrive", "#a8a094", "#a8a094"), st = s.stage, HY = 470;
  el("rect", {x: FULL.x, y: FULL.y, width: FULL.w, height: HY - FULL.y, fill: hzGradL([[0, "#8f8a86"], [.6, "#b9ae9d"], [1, "#dccbb0"]])}, st);
  s.sun = el("g", {transform: "translate(1330 170)"}, st); hzGlow(s.sun, "#ff9e58", 260, .6, .18); el("circle", {r: 66, fill: "#ff7b3a", opacity: .95}, s.sun);
  s.city = el("g", {}, st); s.cg = hzCity(s.city, "#5f6670", "#858a8f");
  s.sea = el("rect", {x: FULL.x, y: HY, width: FULL.w, height: FULL.y + FULL.h - HY, fill: hzGradL([[0, "#aab3ac"], [.25, "#7c979c"], [1, "#3d6d80"]])}, st);
  el("rect", {x: FULL.x, y: HY - 70, width: FULL.w, height: 140, fill: hzGradL([[0, "#d9cdb8", 0], [.5, "#d9cdb8", .75], [1, "#d9cdb8", 0]])}, st);            // haze lying on the horizon
  seed = 251; s.waves = []; for (let k = 0; k < 56; k++) s.waves.push({e: el("path", {d: "M-120 0 q30 -22 60 0 t60 0 t60 0 t60 0", fill: "none", stroke: k % 3 ? "#d7e6e4" : "#2f5868", "stroke-width": 9, "stroke-linecap": "round"}, st), x: rnd() * 2 - 1, z0: rnd()});
  s.ships = [[-.34, .62, "#c1121f"], [.42, .95, "#1d3557"]].map(([x, z, col]) => { const g = el("g", {}, st);
    el("path", {d: "M-170 -40 H170 L140 22 H-140 Z", fill: col, stroke: INK, "stroke-width": 7, "stroke-linejoin": "round"}, g); [["#f4a261", -120], ["#2a9d8f", -52], ["#e9c46a", 16]].forEach(([c, bx]) => el("rect", {x: bx, y: -82, width: 62, height: 42, fill: c, stroke: INK, "stroke-width": 6}, g));
    el("rect", {x: 96, y: -112, width: 46, height: 72, fill: "#f1faee", stroke: INK, "stroke-width": 6}, g); return {g, x, z}; });
  s.puffs = field(st, 16, 57, (e, i) => hzPuff(e, 330, i % 2 ? "#cfc6b8" : "#aaa092", .55), .08);
  s.mates = field(st, 16, 79, (e, i) => hzMote(e, 80, i + 2), .16);
  s.str = hzStreaks(st, 26, 9, "#fff8e8", 5);
  seed = 253; s.near = []; for (let k = 0; k < 8; k++) { const an = k / 8 * 6.2832 + rnd() * .5, r = 330 + rnd() * 250, uu = rnd(); s.near.push({e: hzMote(st, 46, k + 12), an, r, u: uu}); }
  vignette(st, HZ, .6); s.blink = fullRect(st, "#cfc5b4", 0); s.flood = fullRect(st, "#a89f91", 0);
  s.card = hzBig(st, "Riding the wind, with lots of other bits of smoke"); s.loc = hzBig(st, "Singapore · September 2026", "#5c677d");
  s.run = t => { const t0 = hzT("povArrive"), u = t - t0, D = hzD("povArrive"), ua = u + .6, g = ua / (D + .2);
    const cs = .3 * Math.exp(1.9 * g * g + .5 * g); tf(s.city, `translate(${X0} ${HY + 4}) scale(${cs})`); op(s.city, ramp(u, .2, 1.8) * .95);
    s.waves.forEach(w => { const z = ((w.z0 - .3 * ua) % 1 + 1) % 1, zz = .05 + z; tf(w.e, `translate(${X0 + w.x * 420 / zz} ${HY + 27 / zz - 20}) scale(${.14 / zz})`); op(w.e, clamp((1 - z) / .4) * clamp(z / .04) * .8); });
    s.ships.forEach(h => { const z = h.z - .16 * ua, zz = .05 + Math.max(0, z); tf(h.g, `translate(${X0 + h.x * 420 / zz} ${HY + 27 / zz - 20}) scale(${.1 / zz})`); op(h.g, z > .01 ? clamp((1.1 - z) / .3) : 0); });
    hzFly(s.puffs, .12 * ua, {fog: .6, rot: 0, a: .75, cy: -40});
    hzFly(s.mates, .03 * ua, {rot: 0, fog: .7, k: 1.3, cy: -40, fn: (o, x, y, z, sc) => [x + Math.sin(t * 5 + o.u * 40) * 9 * sc, y + Math.cos(t * 6 + o.u * 70) * 9 * sc, sc, Math.sin(t * 5 + o.u * 30) * 8]});
    hzRunStreaks(s.str, .7 * ua, {r0: 160, a: .35, y: -10});
    s.near.forEach(m => { const rr = m.r + 30 * Math.sin(ua * 2.2 + m.u * 9), an = m.an + .25 * Math.sin(ua * 1.3 + m.u * 5); tf(m.e, `translate(${X0 + Math.cos(an) * rr * 1.5} ${Y0 + Math.sin(an) * rr * .85}) scale(${.8 + .8 * m.u}) rotate(${Math.sin(t * 6 + m.u * 20) * 8})`); });
    op(s.blink, 1 - ramp(u, -.3, .2)); op(s.flood, ramp(u, D - 1.0, D - .5) * .96);
    hzShow(s.card, t, t0 + .3, t0 + 2.2); hzShow(s.loc, t, t0 + 2.4, t0 + D); }; return s; })();

// ---- 6. povNose: someone breathes in. A giant nose; inside, a forest of hairs covered in sticky mucus. BIG dust gets stuck. We are far smaller: we slip through
function hzHair(p, sd) { const sv = seed; seed = sd; const g = el("g", {}, p), b = 44 + rnd() * 14, c = -70 + rnd() * 140;
  el("ellipse", {rx: 60, ry: 52, fill: "#c9566e", stroke: INK, "stroke-width": 7}, g);
  el("path", {d: `M-6 ${-b} Q300 ${c - b * .7} 640 ${c * .5 - 4} L640 ${c * .5 + 4} Q300 ${c + b * .7} -6 ${b} Z`, fill: "#5b3a29", stroke: INK, "stroke-width": 8, "stroke-linejoin": "round"}, g);
  el("path", {d: `M20 ${-b * .45} Q300 ${c - b * .3} 600 ${c * .5 - 1}`, fill: "none", stroke: "#8a5e44", "stroke-width": 6, "stroke-linecap": "round"}, g);
  [[200 + rnd() * 260, .8 + rnd() * .5]].forEach(([x, k]) => { const y = c * (x / 640) * .9, m = el("g", {transform: `translate(${x} ${y + 16 * k})`}, g);            // beads of sticky mucus
    el("ellipse", {rx: 46 * k, ry: 34 * k, fill: "#d6f08f", stroke: "#6f9a2d", "stroke-width": 5, opacity: .9}, m); el("ellipse", {cx: -14 * k, cy: -12 * k, rx: 13 * k, ry: 7 * k, fill: "#fff", opacity: .8}, m); });
  seed = sv; return g; }
function hzDust(p, r, sd) { const sv = seed, g = el("g", {}, p), b = blob(g, r, ["#c9a66b", "#b8925a", "#d4b483"][sd % 3], 500 + sd * 7); set(b, "stroke-width", 9);
  const h = blob(g, r * .5, "#fff", 520 + sd); set(h, "stroke", "none"); set(h, "opacity", .22); tf(h, `translate(${-r * .25} ${-r * .3})`);
  seed = 540 + sd; for (let k = 0; k < 6; k++) el("circle", {cx: (rnd() - .5) * r, cy: (rnd() - .3) * r, r: r * (.05 + rnd() * .07), fill: INK, opacity: .3}, g); seed = sv; return g; }
S.povNose = (() => { const s = scene("povNose", "#f2c6a6", "#f2c6a6"), st = s.stage, T1 = 1.15;
  // outside: a giant nose, seen from in front and below; we are pulled to one nostril
  s.out = el("g", {}, st); el("rect", {x: FULL.x, y: FULL.y, width: FULL.w, height: FULL.h, fill: hzGradR([[0, "#f7d3b5"], [1, "#e5ad88"]])}, s.out);
  s.nz = el("g", {}, s.out); const N = s.nz;
  el("path", {d: "M-1500 420 Q-700 300 -420 330 Q0 380 420 330 Q700 300 1500 420 V2000 H-1500 Z", fill: "#eebb98"}, N);
  el("path", {d: "M-190 -900 C-200 -500 -300 -260 -420 -90 C-560 110 -420 300 -230 270 C-150 330 150 330 230 270 C420 300 560 110 420 -90 C300 -260 200 -500 190 -900 Z", fill: "#f9d9bf", stroke: INK, "stroke-width": 12, "stroke-linejoin": "round"}, N);
  el("path", {d: "M-250 -330 C-300 -200 -370 -120 -400 -30", fill: "none", stroke: "#e2a988", "stroke-width": 26, "stroke-linecap": "round"}, N); el("ellipse", {cx: -60, cy: -40, rx: 90, ry: 130, fill: "#fff", opacity: .25}, N);
  [-1, 1].forEach(k => { el("path", {d: `M${k * 60} 150 C${k * 80} 90 ${k * 250} 70 ${k * 300} 150 C${k * 320} 220 ${k * 120} 250 ${k * 60} 150 Z`, fill: hzGradR([[0, "#1c0710"], [.7, "#4a1525"], [1, "#7a2a3d"]]), stroke: INK, "stroke-width": 11, "stroke-linejoin": "round"}, N);
    for (let h = 0; h < 5; h++) el("path", {d: `M${k * (110 + h * 36)} ${205 - Math.abs(h - 2) * 6} q${k * 6} -34 ${k * (-10 + h * 5)} -62`, fill: "none", stroke: "#5b3a29", "stroke-width": 7, "stroke-linecap": "round"}, N); });
  s.strO = hzStreaks(s.out, 34, 13, "#ffffff", 7);
  // inside
  s.inn = el("g", {}, st); hzRound(s.inn, [[0, "#22060e"], [.16, "#5c1a2b"], [.5, "#b5475f"], [1, "#f08ea4"]]);
  s.exit = el("g", {}, s.inn); hzGlow(s.exit, "#12030a", 330, 1, .55);
  s.hairs = field(s.inn, 38, 431, (e, i) => { e.h = hzHair(e, 800 + i); if (i % 5 === 0) { const d = el("g", {transform: `translate(${430} ${-10})`}, e.h); const sp = blob(d, 150, "#d6f08f", 640 + i); set(sp, "stroke", "#6f9a2d"); set(sp, "opacity", .9); hzDust(d, 120, i); } }, .34);
  s.heroH = [[.36, -.2, 0], [-.34, .24, 1]].map(([x, y, i]) => { const e = el("g", {}, s.inn); hzHair(e, 870 + i); return {e, x, y}; });
  s.heroD = s.heroH.map((h, i) => { const e = el("g", {}, s.inn); e.sp = blob(e, 215, "#d6f08f", 660 + i); set(e.sp, "stroke", "#6f9a2d"); set(e.sp, "stroke-width", 8); hzDust(e, 165, i + 4); return {e, x: h.x, y: h.y, zf: [.24, .3][i], ts: [2.0, 2.9][i]}; });
  s.mates = field(s.inn, 9, 83, (e, i) => hzMote(e, 54, i + 5), .1);
  s.str = hzStreaks(s.inn, 30, 15, "#ffe3ea", 6);
  s.L = [hzLab(s.inn, "nose hairs", 54), hzLab(s.inn, "sticky mucus", 54, "#e4f7a8"), hzLab(s.inn, "big dust: stuck!", 54, "#ffe14d")];
  s.vg = vignette(st, HZ, .6); s.blink = fullRect(st, "#a89f91", 0); s.dark = fullRect(st, "#22060e", 0);
  s.card0 = hzBig(st, "Someone breathes in…", "#5c677d"); s.card = hzBig(st, "Big dust gets caught in the nose…", "#9d174d");
  s.run = t => { const t0 = hzT("povNose"), u = t - t0, D = hzD("povNose"), outp = u < T1, v = u - T1;
    op(s.out, outp ? 1 : 0); op(s.inn, outp ? 0 : 1);
    if (outp) { const z = .42 * Math.exp(2.25 * (u + .4)); tf(N, `translate(${X0} ${Y0}) scale(${z}) translate(${-180 * ramp(u, -.2, .7)} ${-80 - 80 * ramp(u, -.2, .7)})`); hzRunStreaks(s.strO, -1.3 * (u + .5), {r0: 60, a: .7, len: .3}); }
    else { const off = .13 * v + .012 * v * v, ang = (o, x, y) => Math.atan2(Y0 - y, X0 - x) * 57.2958;
      hzFly(s.hairs, off, {fog: .55, k: 2.2, nf: .03, rot: 0, fn: (o, x, y, z, sc) => [x, y, sc, ang(o, x, y) + (o.u - .5) * 30]});
      s.heroD.forEach((d, i) => { const os = .13 * (d.ts - T1) + .012 * (d.ts - T1) * (d.ts - T1), zw = os + d.zf, z = Math.min(off + d.zf, zw) - off, h = s.heroH[i];
        const [hx, hy, hs] = hzP(h.x * 1.0, h.y, zw - off, {k: 2.2}), vis = zw - off > .004 ? clamp((zw - off) / .03) * clamp((1 - (zw - off)) / .5) : 0;
        const a = Math.atan2(Y0 - hy, X0 - hx), tipx = hx + Math.cos(a) * 470 * hs, tipy = hy + Math.sin(a) * 470 * hs;
        tf(h.e, `translate(${hx} ${hy}) scale(${hs}) rotate(${a * 57.2958})`); op(h.e, vis);
        const fl = clamp((d.ts - u) / 1.1), sc = .5 / (.08 + 2.2 * z), stuck = u >= d.ts, jx = stuck ? 0 : Math.sin(t * 8 + i * 2) * 10;
        const fx = lerp(tipx, X0 + d.x * 1500, fl * fl), fy = lerp(tipy, Y0 + 330 - i * 500, fl * fl);
        tf(d.e, `translate(${fx + jx} ${fy}) scale(${hs * (1 + 1.6 * fl)}) rotate(${stuck ? 20 * i : (d.ts - u) * 90})`); op(d.e, (zw - off > .004 ? 1 : 0) * ramp(v, .1 + i * .5, .3 + i * .5)); op(d.e.sp, stuck ? .9 : 0); d.px = fx; d.py = fy; d.ps = hs; });
      [s.heroH[1], s.heroD[1], s.heroH[0], s.heroD[0]].forEach(o => s.inn.insertBefore(o.e, s.mates.G));
      hzFly(s.mates, off * .4, {rot: 0, fog: .6, k: 2.2, fn: (o, x, y, z, sc) => [x + Math.sin(t * 8 + o.u * 40) * 10 * sc, y + Math.cos(t * 9 + o.u * 70) * 10 * sc, sc, Math.sin(t * 7 + o.u * 30) * 9]});
      hzRunStreaks(s.str, .8 * v, {r0: 110, a: .4});
      const ex = Math.exp(3.4 * clamp((u - (D - 1.5)) / 1.0)); tf(s.exit, `translate(${X0} ${Y0}) scale(${.55 * ex})`);
      hzAt(s.L[0], 330, 120, u, T1 + .3, T1 + 1.7); hzAt(s.L[1], 1290, 120, u, T1 + .6, T1 + 2.0);
      const d0 = s.heroD[0]; hzAt(s.L[2], clamp(d0.px, 300, 1320), clamp(d0.py - 190 * d0.ps - 50, 220, 760), u, d0.ts + .05, D - .9); }
    op(s.blink, 1 - ramp(u, -.3, .15)); op(s.dark, Math.max(on(u, T1 - .16, T1 + .2, .14), ramp(u, D - .8, D - .52)));
    hzShow(s.card0, t, t0 + .05, t0 + T1 - .1); hzShow(s.card, t, t0 + T1 + .5, t0 + D); }; return s; })();

// ---- 7. povLung: down the windpipe (rings of cartilage), the airways branch and branch again, and we end deep in the lungs, in a tiny air sac
function hzFork(p, wall, ring) { const g = el("g", {}, p); el("circle", {r: 330, fill: wall, stroke: INK, "stroke-width": 10}, g);
  [-1, 1].forEach(k => { el("circle", {cx: k * 150, cy: 0, r: 128, fill: ring, stroke: INK, "stroke-width": 9}, g); el("circle", {cx: k * 150, cy: 0, r: 104, fill: hzGradR([[0, "#16040a"], [.6, "#3d0f1c"], [1, "#7a2338"]]), stroke: INK, "stroke-width": 7}, g); });
  el("path", {d: "M0 -150 Q-20 0 0 150 Q20 0 0 -150 Z", fill: "#f7b7c3", opacity: .55}, g); return g; }
S.povLung = (() => { const s = scene("povLung", "#2a0812", "#2a0812"), st = s.stage, TS = 3.05;
  s.tube = el("g", {}, st); hzRound(s.tube, [[0, "#1c050c"], [.1, "#4a1020"], [.42, "#a83a52"], [1, "#f4a3b3"]]);
  const C = 2 * Math.PI * 300;
  s.rings = tunnelG(s.tube, 11, e => { el("circle", {r: 300, fill: "none", stroke: INK, "stroke-width": 20}, e); el("circle", {r: 300, fill: "none", stroke: "#d9667f", "stroke-width": 11}, e);
    const a = {r: 292, fill: "none", "stroke-dasharray": `${C * .8} ${C * .2}`, transform: "rotate(126)", "stroke-linecap": "round"};
    el("circle", Object.assign({stroke: INK, "stroke-width": 50}, a), e); el("circle", Object.assign({stroke: "#f6efe2", "stroke-width": 36}, a), e); el("circle", Object.assign({stroke: "#fff", "stroke-width": 8, opacity: .8}, a, {r: 302}), e); });
  s.fk = [hzFork(s.tube, "#b5475f", "#f6efe2"), hzFork(s.tube, "#c25a70", "#f3c9d1")];
  s.str = hzStreaks(s.tube, 34, 17, "#ffe3ea", 6);
  s.mates = field(s.tube, 8, 87, (e, i) => hzMote(e, 90, i + 9), .16);
  s.L = [hzLab(s.tube, "windpipe", 56), hzLab(s.tube, "the airways branch…", 56), hzLab(s.tube, "…and branch again", 56)];
  // the air sacs
  s.sac = el("g", {}, st); el("rect", {x: FULL.x, y: FULL.y, width: FULL.w, height: FULL.h, fill: hzGradR([[0, "#8f2740"], [1, "#4a1020"]])}, s.sac);
  s.cl = el("g", {}, s.sac); const SAC = (x, y, r, sd) => { const g = el("g", {transform: `translate(${x} ${y})`}, s.cl); el("circle", {r, fill: hzGradR([[0, "#ffe9ec"], [.75, "#ffc2cd"], [1, "#f58fa6"]]), stroke: INK, "stroke-width": 9}, g);
    seed = sd; for (let k = 0; k < 3; k++) { const a = rnd() * 6.28, b = a + 1.6 + rnd(); el("path", {d: `M${r * Math.cos(a)} ${r * Math.sin(a)} Q${r * .2 * Math.cos((a + b) / 2)} ${r * .2 * Math.sin((a + b) / 2)} ${r * Math.cos(b)} ${r * Math.sin(b)}`, fill: "none", stroke: "#e63946", "stroke-width": 13, "stroke-linecap": "round", opacity: .75}, g); }
    el("ellipse", {cx: -r * .35, cy: -r * .4, rx: r * .22, ry: r * .12, fill: "#fff", opacity: .6, transform: `rotate(-35 ${-r * .35} ${-r * .4})`}, g); return g; };
  [[-760, -330, 300, 1], [-110, -560, 260, 2], [600, -470, 330, 3], [960, 110, 300, 4], [-930, 250, 280, 5], [-560, 640, 250, 6], [640, 640, 270, 7], [70, 760, 220, 8]].forEach(a => SAC(...a));
  // the sac we end up in: its thin wall, and a blood vessel wrapped round it
  s.big = el("g", {}, s.cl); const VR = 548, arc = (r, a0, a1) => `M${r * Math.cos(a0)} ${r * Math.sin(a0)} A${r} ${r} 0 0 1 ${r * Math.cos(a1)} ${r * Math.sin(a1)}`, A0 = .12 * Math.PI, A1 = .88 * Math.PI;
  el("path", {d: arc(VR, A0, A1), fill: "none", stroke: INK, "stroke-width": 150, "stroke-linecap": "round"}, s.big); el("path", {d: arc(VR, A0, A1), fill: "none", stroke: "#e63946", "stroke-width": 132, "stroke-linecap": "round"}, s.big);
  el("path", {d: arc(VR + 40, A0, A1), fill: "none", stroke: "#ff7b89", "stroke-width": 16, "stroke-linecap": "round", opacity: .7}, s.big);
  s.rbc = []; for (let k = 0; k < 11; k++) { const g = el("g", {}, s.big); el("ellipse", {rx: 46, ry: 34, fill: "#b5121f", stroke: INK, "stroke-width": 6}, g); el("ellipse", {rx: 22, ry: 13, fill: "#8e0d18"}, g); s.rbc.push({g, u: k / 11}); }
  el("circle", {r: 470, fill: hzGradR([[0, "#fff4f5"], [.8, "#ffd3da"], [1, "#f9a8b9"]]), stroke: INK, "stroke-width": 10}, s.big); el("circle", {r: 452, fill: "none", stroke: "#fff", "stroke-width": 10, opacity: .55, "stroke-dasharray": "300 2600", transform: "rotate(200)"}, s.big);
  seed = 261; s.ox = []; for (let k = 0; k < 12; k++) { const g = el("g", {}, s.big); el("circle", {r: 31, fill: "#4cc9f0", stroke: INK, "stroke-width": 5}, g); tx(g, {x: 0, y: 10, "text-anchor": "middle", "font-size": 29, "font-weight": 700, fill: INK}, "O₂"); s.ox.push({g, u: rnd(), a: A0 + .25 + rnd() * (A1 - A0 - .5), r: 120 + rnd() * 200}); }
  s.sm = [[-250, 250, 21], [300, 190, 22], [-40, 330, 23]].map(([x, y, sd]) => { const g = hzMote(s.big, 46, sd); return {g, x, y}; });
  s.SL = [hzLab(s.sac, "an air sac", 56), hzLab(s.sac, "oxygen", 50, "#bdf0ff"), hzLab(s.sac, "blood", 56)];
  s.vg = vignette(st, HZ, .6); s.blink = fullRect(st, "#22060e", 0); s.flash = fullRect(st, "#ffd9df", 0);
  s.card = hzBig(st, "…but PM2.5 slips through, deep into the lungs", "#9d174d"); s.card2 = hzBig(st, "Air sacs: here, oxygen passes into the blood", "#9d174d");
  s.run = t => { const t0 = hzT("povLung"), u = t - t0, D = hzD("povLung"), ua = u + .5, tube = u < TS;
    op(s.tube, tube ? 1 : 0); op(s.sac, tube ? 0 : 1);
    if (tube) { const bx = 300 * Math.sin(ua * 1.5 + .4) * (1 - ramp(u, .6, 1.3)), by = 120 * Math.sin(ua * 2.3 + 1) * (1 - ramp(u, .6, 1.3));
      const f1 = Math.exp(3.5 * (u - 1.62)), f2 = Math.exp(3.9 * (u - 2.62)), e1 = ease((u - 1.15) / .7), e2 = ease((u - 2.25) / .6);
      hzTube(s.rings, .42 * ua + .05 * ua * ua, 420, bx, by, 8, 1 - ramp(f1, .8, 2.2)); hzRunStreaks(s.str, 1.3 * ua, {r0: 80, a: .5});
      tf(s.fk[0], `translate(${X0 + bx + 150 * f1 * e1} ${Y0 + by}) scale(${f1})`); op(s.fk[0], ramp(u, .55, .9) * (f2 < 2.4 ? 1 : 0));
      tf(s.fk[1], `translate(${X0 - 150 * f2 * e2} ${Y0}) scale(${f2}) rotate(28)`); op(s.fk[1], u > 1.75 ? ramp(f1, 1.5, 3) : 0); if (f1 < 3) s.tube.insertBefore(s.fk[1], s.fk[0]); else s.tube.insertBefore(s.fk[0], s.fk[1]);
      hzFly(s.mates, .05 * ua, {rot: 0, fog: .6, k: 1.5, fn: (o, x, y, z, sc) => [x + Math.sin(t * 8 + o.u * 40) * 10 * sc, y + Math.cos(t * 9 + o.u * 70) * 10 * sc, sc, Math.sin(t * 7 + o.u * 30) * 9]});
      hzAt(s.L[0], X0, 130, u, .15, 1.05); hzAt(s.L[1], X0, 130, u, 1.15, 2.1); hzAt(s.L[2], X0, 130, u, 2.2, TS - .1); }
    else { const v = u - TS, k = 1 - Math.exp(-2.6 * v), z = lerp(.2, 1, k);
      tf(s.cl, `translate(${X0} ${Y0 - 30}) scale(${z}) rotate(${-10 * (1 - k)})`);
      s.rbc.forEach(c => { const q = (c.u + t * .09) % 1, a = lerp(A1 + .08, A0 - .08, q); tf(c.g, `translate(${VR * Math.cos(a)} ${VR * Math.sin(a)}) rotate(${a * 57.2958 + 90})`); });
      s.ox.forEach(o => { const q = (o.u + t * .3) % 1, r = lerp(o.r, VR, ease(q / .7)), a = o.a - (q > .7 ? (q - .7) * .8 : 0); tf(o.g, `translate(${r * Math.cos(a)} ${r * Math.sin(a)})`); op(o.g, clamp(q / .1) * clamp((1 - q) / .12)); });
      s.sm.forEach((m, i) => { const q = ease((v - .2 - i * .15) / 1.0); tf(m.g, `translate(${lerp(m.x * .3, m.x, q)} ${lerp(-200, m.y, q)}) rotate(${10 * Math.sin(t * 5 + i) * (1 - q)})`); });
      hzAt(s.SL[0], X0, 150, u, TS + .7, D + 1); hzAt(s.SL[1], X0 - 20, Y0 + 60, u, TS + 1.0, D + 1); hzAt(s.SL[2], X0 + 560, Y0 + 290, u, TS + 1.0, D + 1); }
    op(s.blink, 1 - ramp(u, -.3, .1)); op(s.flash, on(u, TS - .16, TS + .3, .15));
    hzShow(s.card, t, t0 + .2, t0 + TS - .2); hzShow(s.card2, t, t0 + TS + .6, t0 + D + 1); }; return s; })();

// ---- 8. povRain (October): the rain returns. Raindrops fall past and swallow bits of smoke; a giant drop swallows us, and we fall with it to the ground
function hzDrop(p, r, mote) { const g = el("g", {}, p); el("circle", {r, fill: hzGradR([[0, "#d6f4ff", .55], [.7, "#8fd3f4", .75], [1, "#3a9ad9", .95]]), stroke: INK, "stroke-width": Math.max(4, r * .06)}, g);
  if (mote) tf(hzMote(g, r * .32, mote), `translate(${r * .1} ${r * .2})`);
  el("ellipse", {cx: -r * .38, cy: -r * .42, rx: r * .24, ry: r * .13, fill: "#fff", opacity: .85, transform: `rotate(-38 ${-r * .38} ${-r * .42})`}, g); el("path", {d: `M${r * .5} ${r * .62} A${r * .8} ${r * .8} 0 0 0 ${r * .76} ${r * .22}`, fill: "none", stroke: "#fff", "stroke-width": r * .06, "stroke-linecap": "round", opacity: .7}, g); return g; }
S.povRain = (() => { const s = scene("povRain", "#7d8590", "#7d8590"), st = s.stage, TG = 2.25;
  // in the air: grey haze, dark rain clouds above
  s.air = el("g", {}, st); el("rect", {x: FULL.x, y: FULL.y, width: FULL.w, height: FULL.h, fill: hzGradL([[0, "#4f5866"], [.45, "#8b8f93"], [1, "#b7ad9d"]])}, s.air);
  seed = 271; for (let k = 0; k < 9; k++) { const g = el("g", {transform: `translate(${-150 + k * 240 + rnd() * 80} ${-10 + rnd() * 70})`}, s.air); [[0, 0, 150], [-130, 30, 110], [130, 34, 120], [40, 60, 120]].forEach(([x, y, r]) => el("circle", {cx: x, cy: y, r, fill: "#3d4654"}, g)); }
  s.rain = []; for (let k = 0; k < 60; k++) s.rain.push({e: el("line", {stroke: "#d6f4ff", "stroke-width": 4 + rnd() * 4, "stroke-linecap": "round", opacity: .6}, s.air), x: rnd(), u: rnd(), v: .8 + rnd() * .8});
  s.mates = []; for (let k = 0; k < 12; k++) s.mates.push({e: hzMote(s.air, 34 + rnd() * 30, k + 30), x: 80 + rnd() * 1460, y: 220 + rnd() * 600, u: rnd(), td: .5 + rnd() * 1.5});
  s.drops = s.mates.map((m, k) => ({e: hzDrop(s.air, 86 + m.u * 50, 0), m}));
  s.giant = hzDrop(s.air, 300, 0);
  // inside the drop, falling: the ground rushes up
  s.fall = el("g", {}, st); fullRect(s.fall, "#6fae6b"); s.gr = el("g", {}, s.fall); const G = s.gr;
  el("rect", {x: -4000, y: -3000, width: 8000, height: 6000, fill: "#6fae6b"}, G);
  seed = 273; for (let k = 0; k < 60; k++) { const x = (rnd() - .5) * 7000, y = (rnd() - .5) * 5000; if (Math.abs(x) < 900 && Math.abs(y) < 700) continue; if (k % 2) el("rect", {x, y, width: 300 + rnd() * 400, height: 260 + rnd() * 300, rx: 16, fill: ["#e9c9a8", "#d7dde3", "#f2e2c4", "#c9d3dc"][k % 4], stroke: INK, "stroke-width": 9}, G); else el("circle", {cx: x, cy: y, r: 130 + rnd() * 110, fill: "#3f8f58", stroke: INK, "stroke-width": 9}, G); }
  el("rect", {x: -4000, y: 760, width: 8000, height: 260, fill: "#5c636b", stroke: INK, "stroke-width": 9}, G); for (let k = -20; k < 20; k++) el("rect", {x: k * 200, y: 880, width: 110, height: 16, fill: "#f1f3f5"}, G);
  [[-560, -330], [500, -420], [640, 300], [-640, 380]].forEach(([x, y], i) => { el("circle", {cx: x, cy: y, r: 170, fill: "#3f8f58", stroke: INK, "stroke-width": 9}, G); el("circle", {cx: x - 30, cy: y - 40, r: 80, fill: "#58a56f"}, G); });
  const pud = blob(G, 400, "#8fd3f4", 97); set(pud, "stroke-width", 9); tf(pud, "scale(1.4 1)"); s.wash = [[-170, 60, 51], [150, -70, 52], [40, 150, 53]].map(([x, y, sd]) => { const g = hzMote(G, 60, sd); tf(g, `translate(${x} ${y})`); return g; }); s.rip = [0, 1, 2].map(() => el("ellipse", {fill: "none", stroke: "#fff", "stroke-width": 12}, G));
  s.side = [[-520, -210, 120, 41], [560, -150, 150, 42], [-430, 300, 100, 43], [470, 310, 90, 0], [-760, 60, 80, 44]].map(([x, y, r, m]) => ({e: hzDrop(s.fall, r, m), x, y}));
  s.strF = hzStreaks(s.fall, 30, 21, "#eaf9ff", 6);
  s.lens = el("rect", {x: FULL.x, y: FULL.y, width: FULL.w, height: FULL.h, fill: hzGradR([[0, "#8fd3f4", .1], [.6, "#8fd3f4", .25], [.86, "#3a9ad9", .7], [1, "#1f6fb0", .95]], {r: .62})}, s.fall);
  s.hl = el("ellipse", {cx: 300, cy: 150, rx: 190, ry: 70, fill: "#fff", opacity: .55, transform: "rotate(-30 300 150)"}, s.fall);
  s.vg = vignette(s.air, HZ, .55); s.gulp = fullRect(st, "#bfeaff", 0); s.splash = fullRect(st, "#ffffff", 0);
  s.L = hzLab(st, "a raindrop!", 60, "#bfeaff"); s.L2 = hzLab(st, "Now we are inside a raindrop", 56);
  s.card = hzBig(st, "October: rain washes the haze out of the air", "#0077b6");
  s.run = t => { const t0 = hzT("povRain"), u = t - t0, D = hzD("povRain"), ua = u + .6, air = u < TG, TSPL = D - 1.15;
    op(s.air, air ? 1 : 0); op(s.fall, air ? 0 : 1);
    if (air) { s.rain.forEach(r => { const q = (r.u + ua * 1.5 * r.v) % 1, x = FULL.x + r.x * FULL.w, y = -100 + q * 1200; set(r.e, "x1", x); set(r.e, "x2", x - 6); set(r.e, "y1", y); set(r.e, "y2", y + 70 * r.v); });
      s.drops.forEach(d => { const m = d.m, dy = (u - m.td) * 1500, caught = u > m.td, my = caught ? m.y + dy : m.y + Math.sin(ua * 2 + m.u * 9) * 10, mx = m.x + Math.sin(ua * 1.4 + m.u * 20) * 12 * (caught ? 0 : 1);
        tf(m.e, `translate(${mx} ${my})`); tf(d.e, `translate(${m.x} ${m.y + dy - 20})`); });
      const g = clamp((u - .9) / (TG - .9)), gs = .12 + 6.5 * g * g * g; tf(s.giant, `translate(${X0 + 40 * (1 - g)} ${lerp(-140, Y0, ease(g))}) scale(${gs})`); op(s.giant, u > .9 ? 1 : 0);
      hzAt(s.L, X0 + 330, 250, u, 1.15, TG - .25); op(s.L2, 0); }
    else { const v = u - TG, hit = clamp(v / (TSPL - TG)), z = .24 * Math.exp(1.05 * hit * hit + .4 * hit), w = 1 + .025 * Math.sin(t * 9);
      tf(G, `translate(${X0} ${Y0}) scale(${z}) rotate(${12 * (1 - hit)})`);
      s.side.forEach((d, i) => { tf(d.e, `translate(${X0 + d.x + Math.sin(t * 2 + i) * 8} ${Y0 + d.y + Math.cos(t * 2.6 + i * 2) * 8}) scale(${1 - .25 * hit})`); op(d.e, 1 - ramp(u, TSPL - .15, TSPL)); });
      hzRunStreaks(s.strF, 1.4 * v, {r0: 200, a: .5 * (1 - ramp(u, TSPL - .1, TSPL))});
      tf(s.lens, `translate(${X0} ${Y0}) scale(${w} ${2 - w}) translate(${-X0} ${-Y0})`); op(s.lens, 1 - ramp(u, TSPL, TSPL + .3)); op(s.hl, .55 * (1 - ramp(u, TSPL, TSPL + .2)));
      s.rip.forEach((r, i) => { const q = clamp((u - TSPL - i * .22) / .9); set(r, "rx", 80 + 520 * q); set(r, "ry", 60 + 360 * q); op(r, q > 0 ? (1 - q) * .9 : 0); }); s.wash.forEach(g => op(g, ramp(u, TSPL + .1, TSPL + .3)));
      tf(s.L2, `translate(${X0} 150)`); op(s.L2, on(v, .25, TSPL - TG - .2, .2)); op(s.L, 0); }
    op(s.gulp, on(u, TG - .14, TG + .28, .13)); op(s.splash, on(u, TSPL - .08, TSPL + .3, .1) * .9);
    hzShow(s.card, t, t0 + .3, t0 + D + 1); }; return s; })();

// ---- 9. clear (outside): the same view of Singapore as when we arrived, now with clean air and a blue sky
S.clear = (() => { const s = scene("clear", "#8ecae6", "#219ebc"), st = s.stage, HY = 560;
  el("rect", {x: FULL.x, y: FULL.y, width: FULL.w, height: HY - FULL.y, fill: hzGradL([[0, "#2f9be0"], [.7, "#8fd3f4"], [1, "#d6f4ff"]])}, st);
  s.sun = el("g", {transform: "translate(1665 150)"}, st); hzGlow(s.sun, "#fff3b0", 300, .8, .2); el("circle", {r: 70, fill: "#ffd60a", stroke: INK, "stroke-width": 7}, s.sun);
  [[160, 230, 1], [760, 250, .7], [1380, 300, .8]].forEach(([x, y, k]) => { const g = el("g", {transform: `translate(${x} ${y}) scale(${k})`}, st); el("path", {d: "M-170 40 Q-210 40 -205 0 Q-200 -44 -150 -40 Q-130 -100 -60 -92 Q-20 -150 50 -116 Q120 -130 130 -62 Q200 -60 196 -4 Q194 40 150 40 Z", fill: "#fff", stroke: INK, "stroke-width": 7, "stroke-linejoin": "round"}, g); });
  s.city = el("g", {transform: `translate(${X0} ${HY + 4}) scale(1.5)`}, st); hzCity(s.city, "#264653", "#4a8fa8");
  seed = 281; for (let k = 0; k < 15; k++) { const x = -640 + k * 92 + rnd() * 30; el("circle", {cx: x, cy: -14, r: 30 + rnd() * 16, fill: k % 2 ? "#40916c" : "#52b788", stroke: INK, "stroke-width": 4}, s.city); }
  el("rect", {x: FULL.x, y: HY, width: FULL.w, height: FULL.y + FULL.h - HY, fill: hzGradL([[0, "#48cae4"], [1, "#0077b6"]])}, st); el("line", {x1: FULL.x, y1: HY, x2: FULL.x + FULL.w, y2: HY, stroke: INK, "stroke-width": 7}, st);
  seed = 283; for (let k = 0; k < 26; k++) { const z = rnd(), y = HY + 30 + z * 400; el("path", {d: "M-60 0 q15 -11 30 0 t30 0 t30 0 t30 0", fill: "none", stroke: "#fff", "stroke-width": 7, "stroke-linecap": "round", opacity: .6, transform: `translate(${FULL.x + rnd() * FULL.w} ${y}) scale(${.6 + z * 1.6})`}, st); }
  s.loc = hzBig(st, "Singapore · November 2026", "#0077b6"); s.top = hzLab(st, "The haze is gone. Clean air again!", 64);
  s.run = t => { const t0 = hzT("clear"), u = t - t0; hzShow(s.loc, t, t0 + .3, t0 + 99); tf(s.top, `translate(${X0} 70)`); op(s.top, ramp(u, .9, 1.3)); }; return s; })();
