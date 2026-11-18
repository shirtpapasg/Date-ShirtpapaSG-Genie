/* TheOneApp, Explored EP07: the picture-only shots. Load after common.js, geo_map.js and ep07/scenes.js.
   S.peRun     the silent cold open: a PE lesson on the school field. Our pupil sprints, stops, hands on knees, panting, heart thumping.
   The hero sequence, FIRST PERSON: you are an oxygen molecule (two red atoms).
   S.airOut (outside) -> S.povNose -> S.povWindpipe -> S.povAirSac -> S.povRBC -> S.povHeart -> S.povArtery -> S.povMuscle
   -> (the camera hands over to a carbon dioxide molecule made in the muscle cell) -> S.povReturn -> S.povExhale.
   Rule 9: the oxygen is never shown turning into carbon dioxide. In the muscle cell the carbon dioxide comes out of the sugar (the food),
   and the oxygen is shown ending up in water. Blood in the first-person shots is always red (bright with oxygen, dark with less).
   Every frame depends only on t. Times u are seconds into the shot. */
function o7Round(p, stops, r = .78) { return el("rect", {x: FULL.x - 700, y: FULL.y - 700, width: FULL.w + 1400, height: FULL.h + 1400, fill: o7GR(stops, {r: r * FULL.w / (FULL.w + 1400)})}, p); }
function o7Fly(a, off, o = {}) { const sp = o.spread || 900, fog = o.fog || .3, K = o.k || 2.6;
  a.forEach(ob => { const z = ((ob.z0 - off) % 1 + 1) % 1, zz = .08 + K * z; ob.z = z;
    let sx = O7X + ob.x * sp / zz, sy = O7Y + ob.y * sp * .7 / zz, sc = .5 / zz, r = o.rot === 0 ? 0 : ob.u * 360 + off * 60 * (ob.u - .5);
    if (o.fn) { const q = o.fn(ob, sx, sy, z, sc); if (q) { sx = q[0]; sy = q[1]; if (q[2] !== undefined) sc = q[2]; if (q[3] !== undefined) r = q[3]; } }
    tf(ob.e, `translate(${sx} ${sy}) scale(${sc}) rotate(${r})`); op(ob.e, clamp((1 - z) / fog) * clamp((z - .004) / (o.nf || .05)) * (o.a === undefined ? 1 : o.a)); });
  a.slice().sort((p, q) => q.z - p.z).forEach(ob => a.G.appendChild(ob.e)); }
function o7Streaks(p, n, sd, col, w = 6) { const G = el("g", {}, p); seed = sd; const a = [];
  for (let i = 0; i < n; i++) a.push({an: rnd() * Math.PI * 2, u: rnd(), v: .6 + rnd() * .8, e: el("line", {stroke: col, "stroke-width": w, "stroke-linecap": "round"}, G)}); a.G = G; return a; }
function o7RunStreaks(a, ph, o = {}) { const cx = O7X + (o.x || 0), cy = O7Y + (o.y || 0);
  a.forEach(s => { const k = ((s.u + ph * s.v) % 1 + 1) % 1, r1 = (o.r0 || 90) + (o.r1 || 1150) * k * k, r2 = r1 * (1 + (o.len || .22)), c = Math.cos(s.an), sn = Math.sin(s.an);
    set(s.e, "x1", cx + c * r1); set(s.e, "y1", cy + sn * r1); set(s.e, "x2", cx + c * r2); set(s.e, "y2", cy + sn * r2); op(s.e, Math.sin(k * Math.PI) * (o.a === undefined ? .7 : o.a)); }); }
function o7Tube(a, off, R = 380, bx = 0, by = 0, K = 8, al = 1) { a.forEach(o => { const z = ((o.z0 - off) % 1 + 1) % 1, zz = .12 + K * z, q = 1 - .12 / zz; o.z = z;
    tf(o.e, `translate(${O7X + bx * q} ${O7Y + by * q}) scale(${R / 300 / zz})`); op(o.e, clamp((1 - z) / .3) * clamp(z / .02) * al); });
  a.slice().sort((p, q) => q.z - p.z).forEach(o => a.G.appendChild(o.e)); }
const o7Hit = (u, a, i, o) => ramp(u, a, a + i) * (1 - ramp(u, a + i, a + i + o));          // a quick rise and a slower fall
const O7CIRC = 2 * Math.PI * 300;
// one ring of the windpipe: the wall, and a C-shaped ring of cartilage (the gap is at the back)
function o7RingC(e) { el("circle", {r: 300, fill: "none", stroke: INK, "stroke-width": 20}, e); el("circle", {r: 300, fill: "none", stroke: "#d9667f", "stroke-width": 11}, e);
  const a = {r: 291, fill: "none", "stroke-dasharray": `${O7CIRC * .78} ${O7CIRC * .22}`, transform: "rotate(130)", "stroke-linecap": "round"};
  el("circle", Object.assign({stroke: INK, "stroke-width": 52}, a), e); el("circle", Object.assign({stroke: "#f6efe2", "stroke-width": 38}, a), e); el("circle", Object.assign({stroke: "#fff", "stroke-width": 8, opacity: .8}, a, {r: 303}), e); }
function o7RingV(e, col) { el("circle", {r: 300, fill: "none", stroke: INK, "stroke-width": 22}, e); el("circle", {r: 300, fill: "none", stroke: col, "stroke-width": 13}, e); }
function o7Fork(p, wall, rim, hole) { const g = el("g", {}, p); el("circle", {r: 330, fill: wall, stroke: INK, "stroke-width": 10}, g);
  [-1, 1].forEach(k => { el("circle", {cx: k * 150, cy: 0, r: 128, fill: rim, stroke: INK, "stroke-width": 9}, g); el("circle", {cx: k * 150, cy: 0, r: 104, fill: hole, stroke: INK, "stroke-width": 7}, g); });
  el("path", {d: "M0 -150 Q-20 0 0 150 Q20 0 0 -150 Z", fill: "#fff", opacity: .3}, g); return g; }
// a fork that grows as we rush at it, and we dive into one of its two openings (side = -1 left, 1 right). Returns its size
function o7RunFork(g, u, t0, rate, side, rot = 0) { const f = Math.min(14, Math.exp(rate * (u - t0))), e = ease((u - t0 + .45) / .6);
  const c = Math.cos(rot * Math.PI / 180), sn = Math.sin(rot * Math.PI / 180); tf(g, `translate(${O7X - side * 150 * f * e * c} ${O7Y - side * 150 * f * e * sn}) scale(${f}) rotate(${rot})`); op(g, clamp((f - .03) / .05)); return f; }
// the red blood cell we ride on, seen from just above it (it fills the bottom of the screen), with two more oxygen molecules on board
function o7Seat(p) { const g = el("g", {}, p); el("ellipse", o7A({rx: 660, ry: 210, fill: o7GL([[0, "#f4505d"], [1, "#c9182b"]]), "stroke-width": 10}), g);
  el("ellipse", {cx: 0, cy: -6, rx: 380, ry: 100, fill: "#a50f1d", opacity: .7}, g); el("path", {d: "M-560 -60 Q-300 -190 80 -196", fill: "none", stroke: "#fff", "stroke-width": 14, "stroke-linecap": "round", opacity: .4}, g);
  g.m = [[-470, -150, -12], [480, -140, 10]].map(([x, y, r]) => { const q = o7O2(g, 40); tf(q, `translate(${x} ${y}) rotate(${r})`); return q; }); return g; }
// inside the heart: thick muscle walls all round, and a valve ahead (three flaps). sq = how hard the walls squeeze, open = how far the valve is open
function o7Chamber(p) { const g = el("g", {}, p); el("circle", {r: 1500, fill: o7GR([[0, "#5c0b17"], [.5, "#3a0710"], [1, "#22040a"]])}, g); g.l = [];
  for (let i = 0; i < 10; i++) { const a = i / 10 * Math.PI * 2, q = el("g", {}, g), b = blob(q, 330, i % 2 ? "#8f1626" : "#a51c2e", 300 + i * 7); set(b, "stroke-width", 10);
    el("path", {d: "M-170 -50 Q0 -130 170 -50 M-130 70 Q0 0 130 70", fill: "none", stroke: "#6b0d1a", "stroke-width": 14, "stroke-linecap": "round", opacity: .6}, q); g.l.push({q, a}); }
  g.valve = el("g", {}, g); el("circle", {r: 198, fill: o7GR([[0, "#ffe3e6"], [.6, "#ff8f9b"], [1, "#e63946"]])}, g.valve);
  g.cusp = [0, 1, 2].map(i => { const q = el("g", {transform: `rotate(${i * 120 + 30})`}, g.valve), c = el("g", {}, q); el("path", o7A({d: "M0 0 L98 -170 A196 196 0 0 1 98 170 Z", fill: "#ffd9de", "stroke-width": 8}), c);
    el("path", {d: "M60 -70 Q110 0 60 70", fill: "none", stroke: "#f29aa6", "stroke-width": 8, "stroke-linecap": "round"}, c); return c; });
  el("circle", {r: 204, fill: "none", stroke: INK, "stroke-width": 40}, g.valve); el("circle", {r: 204, fill: "none", stroke: "#ffb3bd", "stroke-width": 26}, g.valve);
  g.set = (sq, vz, open) => { g.l.forEach(({q, a}) => { const R = 720 * (1 - .32 * sq); tf(q, `translate(${Math.cos(a) * R} ${Math.sin(a) * R * .72}) rotate(${a * 57.2958 + 90}) scale(${1 + .3 * sq})`); });
    tf(g.valve, `scale(${vz})`); g.cusp.forEach(c => tf(c, `translate(196 0) scale(${1 - .88 * open}) translate(-196 0)`)); }; return g; }
// the pupil with the heart, lungs, a leg muscle and the blood vessels between them drawn on (an outside shot that shows where we are going)
function o7BodyMap(p) { const g = el("g", {}, p); g.kidG = el("g", {}, g); g.kid = o7Kid(g.kidG); const o = el("g", {}, g.kidG), ln = (d, col, w) => { el("path", {d, fill: "none", stroke: "#fff", "stroke-width": w + 9, "stroke-linecap": "round", "stroke-linejoin": "round"}, o); el("path", {d, fill: "none", stroke: INK, "stroke-width": w + 5, "stroke-linecap": "round", "stroke-linejoin": "round"}, o); return el("path", {d, fill: "none", stroke: col, "stroke-width": w, "stroke-linecap": "round", "stroke-linejoin": "round"}, o); };
  el("ellipse", o7A({cx: -6, cy: -272, rx: 38, ry: 46, fill: "#ffb3c1", "stroke-width": 4}), o);
  ln("M2 -250 Q-22 -200 -2 -150 L4 -88", "#4895ef", 8); ln("M22 -250 Q40 -200 22 -150 L26 -88", "#e63946", 8);
  el("ellipse", o7A({cx: 15, cy: -84, rx: 15, ry: 32, fill: "#e5677a", "stroke-width": 4}), o); [-96, -84, -72].forEach(y => el("line", {x1: 6, y1: y, x2: 24, y2: y + 4, stroke: "#b23a4e", "stroke-width": 3}, o));
  tf(o7Heart(el("g", {transform: "translate(12 -254) scale(.26)"}, o)), ""); g.dot = el("g", {}, g.kidG); el("circle", {r: 13, fill: "#ffe14d", stroke: INK, "stroke-width": 3.5}, g.dot);
  g.AR = [[22, -250], [34, -200], [22, -150], [26, -88], [16, -84]]; g.VE = [[14, -84], [4, -88], [-2, -150], [-14, -200], [2, -250], [10, -256], [-8, -276]]; return g; }

// ---- 0. peRun: the silent cold open. A PE lesson: the pupil sprints across the field, stops, hands on knees, panting; the heart thumps
S.peRun = (() => { const s = scene("peRun", "#4fb6f5", "#d8f1ff"), st = s.stage; s.cam = el("g", {}, st); o7Field(s.cam);
  s.kidG = el("g", {}, s.cam); s.kid = o7Kid(s.kidG); o7ChestHeart(s.kid);
  s.puff = [0, 1, 2].map(() => { const g = el("g", {}, s.cam); el("circle", {r: 16, fill: "#fff", stroke: INK, "stroke-width": 3.5}, g); el("circle", {cx: 16, cy: -6, r: 11, fill: "#fff", stroke: INK, "stroke-width": 3.5}, g); return g; });
  s.lines = el("g", {}, s.cam); [[-150, -330], [-190, -250], [-160, -170]].forEach(([x, y]) => el("line", {x1: x, y1: y, x2: x - 110, y2: y, stroke: "#fff", "stroke-width": 9, "stroke-linecap": "round"}, s.lines));
  s.run = t => { const u = o7U("peRun", t), ta = Math.min(Math.max(u - 1.7, 0), .8), x = u < 1.7 ? -108 + 480 * u : 708 + 480 * (ta - ta * ta / 1.6);
    const ph = 2 * Math.PI * (x + 108) / 205, runK = 1 - ramp(u, 2.25, 2.7), bent = ramp(u, 2.7, 3.3), br = (u - 3.1) * 2 * Math.PI * 1.5;
    o7Pose(s.kid, runK > 0 ? o7Mix(O7STAND, o7Run(ph), runK) : o7Mix(O7STAND, o7Pant(br), bent)); tf(s.kidG, `translate(${x} 800) scale(1.1)`);
    op(s.kid.sweat, ramp(u, 2.6, 3.1)); o7Thump(s.kid, (u - 3.0) * 2.5, ramp(u, 2.9, 3.1));
    tf(s.lines, `translate(${x} 800)`); op(s.lines, .8 * (1 - ramp(u, 1.7, 2.3)));
    s.puff.forEach((g, i) => { const q = (((u - 3.1) * 1.5 + .5 + i * .12) % 1 + 1) % 1; tf(g, `translate(${x + 305 + q * 120} ${552 + i * 16 - q * 30}) scale(${.5 + q})`); op(g, Math.sin(q * Math.PI) * .9 * bent); });
    const push = ramp(u, 2.5, 4.7), z = 1 + .62 * push; tf(s.cam, `translate(${O7X} ${O7Y}) scale(${z}) translate(${-lerp(O7X, x + 130, push)} ${-lerp(O7Y, 580, push)})`); }; return s; })();

// ---- 1. airOut (outside): the air around the panting pupil. Air is mostly nitrogen, with some oxygen. One oxygen molecule is us: the camera dives in
S.airOut = (() => { const s = scene("airOut", "#4fb6f5", "#d8f1ff"), st = s.stage, ME = [1040, 190]; s.cam = el("g", {}, st); o7Field(s.cam);
  s.kidG = el("g", {transform: "translate(330 800) scale(1.1)"}, s.cam); s.kid = o7Kid(s.kidG); op(s.kid.sweat, 1);
  seed = 311; s.mol = []; for (let i = 0; i < 46; i++) { const x = 560 + rnd() * 1150, y = 90 + rnd() * 620, g = el("g", {}, s.cam), m = i % 5 === 0 ? o7O2(g, 15, false) : o7N2(g, 15); tf(m, `rotate(${rnd() * 180})`);
    if (Math.hypot(x - ME[0], y - ME[1]) < 110) op(g, 0); s.mol.push({g, x, y, a: rnd() * 6.28, b: rnd() * 6.28}); }
  s.me = el("g", {}, s.cam); o7Glow(s.me, "#fff", 46, .55, .3); o7O2(s.me, 15); s.you = el("g", {}, s.cam); tf(o7You(s.you), "scale(.62)");
  s.key = el("g", {}, st); el("rect", o7A({x: -330, y: -44, width: 660, height: 88, rx: 44, fill: "#fff", "stroke-width": 5, filter: "url(#sh)"}), s.key);
  tx(s.key, {x: -306, y: 12, "font-size": 34, "font-weight": 700, fill: INK}, "The air:"); tf(o7N2(s.key, 15), "translate(-128 0)"); tx(s.key, {x: -96, y: 12, "font-size": 34, "font-weight": 700, fill: "#5c7c9c"}, "nitrogen");
  tf(o7O2(s.key, 15, false), "translate(110 0)"); tx(s.key, {x: 142, y: 12, "font-size": 34, "font-weight": 700, fill: "#e63946"}, "oxygen");
  s.vg = vignette(st, O7.ME, .5); s.card = o7Card(st, "You are an oxygen molecule in the air", "#c1121f");
  s.run = t => { const u = o7U("airOut", t), br = t * 2 * Math.PI * 1.5; o7Pose(s.kid, o7Pant(br));
    s.mol.forEach(m => tf(m.g, `translate(${m.x + 16 * Math.sin(t * 1.9 + m.a)} ${m.y + 16 * Math.cos(t * 1.6 + m.b)})`));
    const mx = ME[0] + 10 * Math.sin(t * 2.1), my = ME[1] + 10 * Math.cos(t * 1.7); tf(s.me, `translate(${mx} ${my})`);
    tf(s.you, `translate(${mx} ${my - 20}) scale(${Math.max(0, pop(u, .5))})`); op(s.you, on(u, .5, 2.1, .25));
    const k = ramp(u, 1.3, 2.4), z = u < 1.6 ? 1 + .04 * (u + .5) : 1.084 * Math.exp(1.22 * (u - 1.6)); tf(s.cam, `translate(${O7X} ${O7Y}) scale(${z}) translate(${-lerp(O7X, mx, k)} ${-lerp(O7Y, my, k)})`);
    o7At(s.key, O7X, 70, u, .15, 2.0); op(s.vg, ramp(u, 2.2, 3.4)); o7Show(s.card, u, .9, 4.4); }; return s; })();

// ---- 2. povNose: the pupil breathes in. A giant nose; we are pulled into a nostril, through a forest of nose hairs (the idea of EP01's nose)
function o7Hair(p, sd) { const sv = seed; seed = sd; const g = el("g", {}, p), b = 40 + rnd() * 14, c = -70 + rnd() * 140;
  el("ellipse", {rx: 58, ry: 50, fill: "#d9667f", stroke: INK, "stroke-width": 7}, g);
  el("path", {d: `M-6 ${-b} Q300 ${c - b * .7} 640 ${c * .5 - 4} L640 ${c * .5 + 4} Q300 ${c + b * .7} -6 ${b} Z`, fill: "#4a3024", stroke: INK, "stroke-width": 8, "stroke-linejoin": "round"}, g);
  el("path", {d: `M20 ${-b * .45} Q300 ${c - b * .3} 600 ${c * .5 - 1}`, fill: "none", stroke: "#80583f", "stroke-width": 6, "stroke-linecap": "round"}, g);
  if (sd % 2) { const x = 200 + rnd() * 260, k = .8 + rnd() * .5, y = c * (x / 640) * .9, m = el("g", {transform: `translate(${x} ${y + 16 * k})`}, g);
    el("ellipse", {rx: 46 * k, ry: 34 * k, fill: "#d6f08f", stroke: "#6f9a2d", "stroke-width": 5, opacity: .9}, m); el("ellipse", {cx: -14 * k, cy: -12 * k, rx: 13 * k, ry: 7 * k, fill: "#fff", opacity: .8}, m); }
  seed = sv; return g; }
S.povNose = (() => { const s = scene("povNose", "#f1c27d", "#f1c27d"), st = s.stage, T1 = 1.15;
  s.out = el("g", {}, st); el("rect", {x: FULL.x, y: FULL.y, width: FULL.w, height: FULL.h, fill: o7GR([[0, "#f6d199"], [1, "#e3ac62"]])}, s.out);
  const N = s.nz = el("g", {}, s.out);
  [-1, 1].forEach(k => el("circle", {cx: k * 760, cy: 60, r: 230, fill: "#ff8fa3", opacity: .5}, N));
  el("path", o7A({d: "M-200 -900 C-210 -480 -300 -250 -430 -80 C-560 120 -420 300 -230 272 C-150 334 150 334 230 272 C420 300 560 120 430 -80 C300 -250 210 -480 200 -900 Z", fill: "#f7cf94", "stroke-width": 12}), N);
  el("path", {d: "M-250 -330 C-300 -200 -370 -120 -404 -30", fill: "none", stroke: "#dfa560", "stroke-width": 26, "stroke-linecap": "round"}, N); el("ellipse", {cx: -60, cy: -40, rx: 90, ry: 130, fill: "#fff", opacity: .25}, N);
  [-1, 1].forEach(k => { el("path", o7A({d: `M${k * 60} 150 C${k * 80} 90 ${k * 250} 70 ${k * 300} 150 C${k * 320} 220 ${k * 120} 250 ${k * 60} 150 Z`, fill: o7GR([[0, "#1c0710"], [.7, "#4a1525"], [1, "#7a2a3d"]]), "stroke-width": 11}), N);
    for (let h = 0; h < 5; h++) el("path", {d: `M${k * (110 + h * 36)} ${205 - Math.abs(h - 2) * 6} q${k * 6} -34 ${k * (-10 + h * 5)} -62`, fill: "none", stroke: "#4a3024", "stroke-width": 7, "stroke-linecap": "round"}, N); });
  el("path", o7A({d: "M-250 520 Q0 470 250 520 Q200 760 0 770 Q-200 760 -250 520 Z", fill: "#7a1c1c", "stroke-width": 12}), N); el("path", {d: "M-200 526 Q0 492 200 526 L190 566 Q0 540 -190 566 Z", fill: "#fff"}, N);     // the mouth, open: panting
  s.strO = o7Streaks(s.out, 34, 13, "#ffffff", 7);
  s.mO = [[-560, -260, 0], [520, -330, 1], [-300, 330, 1], [620, 240, 0], [60, -420, 1], [-700, 120, 1]].map(([x, y, n], i) => { const g = el("g", {}, s.out); n ? o7N2(g, 34) : o7O2(g, 34); return {g, x, y, r: i * 50}; });
  s.inn = el("g", {}, st); o7Round(s.inn, [[0, "#22060e"], [.16, "#5c1a2b"], [.5, "#b5475f"], [1, "#f08ea4"]]);
  s.exit = el("g", {}, s.inn); o7Glow(s.exit, "#12030a", 330, 1, .55);
  s.hairs = field(s.inn, 40, 431, (e, i) => o7Hair(e, 800 + i), .3);
  s.mates = field(s.inn, 10, 83, (e, i) => { i % 3 === 0 ? o7O2(e, 44) : o7N2(e, 44); }, .12);
  s.str = o7Streaks(s.inn, 30, 15, "#ffe3ea", 6);
  s.L = [o7Lab(s.inn, "nose hairs", 54), o7Lab(s.inn, "sticky mucus", 54, "#e4f7a8")];
  s.vg = vignette(st, O7.ME, .5); s.dark = fullRect(st, "#22060e", 0);
  s.card = o7Card(st, "Breathed in through the nose!", "#c1121f");
  s.run = t => { const u = o7U("povNose", t), D = o7D("povNose"), outp = u < T1, v = u - T1; op(s.out, outp ? 1 : 0); op(s.inn, outp ? 0 : 1);
    if (outp) { const z = .4 * Math.exp(2.25 * (u + .45)); tf(N, `translate(${O7X} ${O7Y}) scale(${z}) translate(${-180 * ramp(u, -.3, .7)} ${-80 - 80 * ramp(u, -.3, .7)})`); o7RunStreaks(s.strO, -1.3 * (u + .5), {r0: 60, a: .7, len: .3});
      s.mO.forEach(m => { const q = clamp((u + .45) / 1.6), k = 1 - q * q; tf(m.g, `translate(${O7X + m.x * k} ${O7Y + m.y * k}) scale(${.4 + .8 * k}) rotate(${m.r + u * 60})`); op(m.g, clamp(k * 3)); }); }
    else { const off = .15 * v + .012 * v * v; o7Fly(s.hairs, off, {fog: .55, k: 2.2, nf: .03, rot: 0, fn: (o, x, y, z, sc) => [x, y, sc, Math.atan2(O7Y - y, O7X - x) * 57.2958 + (o.u - .5) * 30]});
      o7Fly(s.mates, off * .35, {fog: .6, k: 2.2, fn: (o, x, y, z, sc) => [x + Math.sin(t * 8 + o.u * 40) * 10 * sc, y + Math.cos(t * 9 + o.u * 70) * 10 * sc, sc]});
      o7RunStreaks(s.str, .8 * v, {r0: 110, a: .4}); tf(s.exit, `translate(${O7X} ${O7Y}) scale(${.55 * Math.exp(3.4 * clamp((u - (D - 1.4)) / 1.0))})`);
      o7At(s.L[0], 360, 150, u, T1 + .25, D - .9); o7At(s.L[1], 1270, 150, u, T1 + .7, D - .9); }
    op(s.dark, Math.max(on(u, T1 - .16, T1 + .2, .14), ramp(u, D - .7, D - .4))); o7Show(s.card, u, .15, D + .2); }; return s; })();

// ---- 3. povWindpipe: down the windpipe (C-shaped rings hold it open); the airways branch, and branch again
S.povWindpipe = (() => { const s = scene("povWindpipe", "#2a0812", "#2a0812"), st = s.stage; s.tube = el("g", {}, st);
  o7Round(s.tube, [[0, "#1c050c"], [.1, "#4a1020"], [.42, "#a83a52"], [1, "#f4a3b3"]]);
  s.rings = tunnelG(s.tube, 11, e => o7RingC(e)); const hole = o7GR([[0, "#16040a"], [.6, "#3d0f1c"], [1, "#7a2338"]]);
  s.fk = [o7Fork(s.tube, "#b5475f", "#f6efe2", hole), o7Fork(s.tube, "#c25a70", "#f3c9d1", hole), o7Fork(s.tube, "#cf6c81", "#f7d6dc", o7GR([[0, "#ffd9df"], [.6, "#ff9db0"], [1, "#e5677f"]]))];
  s.str = o7Streaks(s.tube, 34, 17, "#ffe3ea", 6);
  s.mates = field(s.tube, 9, 87, (e, i) => { i % 3 === 0 ? o7O2(e, 80) : o7N2(e, 80); }, .16);
  s.L = [o7Lab(st, "windpipe", 60), o7Lab(st, "C-shaped rings keep it open", 44, "#fff3d6"), o7Lab(st, "the airways branch…", 58), o7Lab(st, "…again and again", 58)];
  s.vg = vignette(st, O7.ME, .5); s.blink = fullRect(st, "#22060e", 0); s.flash = fullRect(st, "#ffd9df", 0);
  s.card = o7Card(st, "Down the windpipe, into the lungs", "#c1121f");
  s.run = t => { const u = o7U("povWindpipe", t), D = o7D("povWindpipe"), ua = u + .5, st1 = 1 - ramp(u, .7, 1.4), bx = 300 * Math.sin(ua * 1.5 + .4) * st1, by = 120 * Math.sin(ua * 2.3 + 1) * st1;
    o7Tube(s.rings, .42 * ua + .05 * ua * ua, 420, bx, by, 8); o7RunStreaks(s.str, 1.3 * ua, {r0: 80, a: .5});
    o7RunFork(s.fk[0], u, 1.75, 3.4, 1); o7RunFork(s.fk[1], u, 2.7, 3.4, -1, 28); o7RunFork(s.fk[2], u, 3.6, 3.4, 1, -20);
    o7Fly(s.mates, .05 * ua, {fog: .6, k: 1.5, fn: (o, x, y, z, sc) => [x + Math.sin(t * 8 + o.u * 40) * 10 * sc, y + Math.cos(t * 9 + o.u * 70) * 10 * sc, sc]});
    o7At(s.L[0], O7X, 130, u, .1, 1.25); o7At(s.L[1], O7X, 196, u, .35, 1.25); o7At(s.L[2], O7X, 140, u, 1.4, 2.7); o7At(s.L[3], O7X, 140, u, 2.85, D - .2);
    op(s.blink, 1 - ramp(u, -.3, .1)); op(s.flash, ramp(u, D - .35, D - .05)); o7Show(s.card, u, .2, D + .2); }; return s; })();

// ---- 4. povAirSac: into a tiny air sac. Its wall is very thin; a blood capillary wraps round it. Oxygen passes through the wall into the blood, and so do we
S.povAirSac = (() => { const s = scene("povAirSac", "#4a1020", "#4a1020"), st = s.stage, VR = 542, A0 = .1 * Math.PI, A1 = .9 * Math.PI;
  el("rect", {x: FULL.x, y: FULL.y, width: FULL.w, height: FULL.h, fill: o7GR([[0, "#8f2740"], [1, "#4a1020"]])}, st); s.cl = el("g", {}, st);
  const sacFill = o7GR([[0, "#ffe9ec"], [.75, "#ffc2cd"], [1, "#f58fa6"]]);
  [[-860, -330, 300, 1], [-110, -700, 250, 2], [700, -520, 330, 3], [1060, 110, 300, 4], [-1030, 290, 280, 5], [-700, 760, 250, 6], [760, 760, 270, 7]].forEach(([x, y, r, sd]) => { const g = el("g", {transform: `translate(${x} ${y})`}, s.cl); el("circle", {r, fill: sacFill, stroke: INK, "stroke-width": 9}, g);
    seed = sd; for (let k = 0; k < 3; k++) { const a = rnd() * 6.28, b = a + 1.6 + rnd(); el("path", {d: `M${r * Math.cos(a)} ${r * Math.sin(a)} Q${r * .2 * Math.cos((a + b) / 2)} ${r * .2 * Math.sin((a + b) / 2)} ${r * Math.cos(b)} ${r * Math.sin(b)}`, fill: "none", stroke: "#e63946", "stroke-width": 13, "stroke-linecap": "round", opacity: .7}, g); } });
  const arc = (r, a0, a1) => `M${r * Math.cos(a1)} ${r * Math.sin(a1)} A${r} ${r} 0 0 0 ${r * Math.cos(a0)} ${r * Math.sin(a0)}`;
  el("path", {d: arc(VR, A0, A1), fill: "none", stroke: INK, "stroke-width": 138, "stroke-linecap": "round"}, s.cl); el("path", {d: arc(VR, A0, A1), fill: "none", stroke: o7GL([[0, "#8a1622"], [1, "#e63946"]], {x1: 0, y1: 0, x2: 1, y2: 0}), "stroke-width": 122, "stroke-linecap": "round"}, s.cl);
  s.rbc = []; for (let k = 0; k < 10; k++) { const g = o7RBC(s.cl, 44, true); s.rbc.push({g, u: k / 10}); }
  el("circle", {r: 470, fill: sacFill, stroke: INK, "stroke-width": 16}, s.cl); el("circle", {r: 470, fill: "none", stroke: "#ff8fa3", "stroke-width": 8}, s.cl);
  el("circle", {r: 448, fill: "none", stroke: "#fff", "stroke-width": 10, opacity: .55, "stroke-dasharray": "300 2600", transform: "rotate(200)"}, s.cl);
  seed = 261; s.n2 = [[-250, -200], [230, -260], [-60, -330], [300, 20], [-330, 40]].map(([x, y], i) => { const g = o7N2(s.cl, 26); return {g, x, y, a: i * 1.7}; });
  s.ox = []; for (let k = 0; k < 9; k++) { const g = o7O2(s.cl, 26); s.ox.push({g, u: k / 9 + rnd() * .05, a: A0 + .35 + rnd() * (A1 - A0 - .7), r: 80 + rnd() * 220, sp: rnd() * 6}); }
  s.L = [o7Lab(st, "air sac", 58), o7Lab(st, "very thin wall", 46, "#ffe14d"), o7Lab(st, "blood capillary", 46, "#ffb3b3")];
  s.ptr = el("path", {d: "M530 690 L598 655 M1150 715 L1066 690", stroke: "#fff", "stroke-width": 6, "stroke-linecap": "round", fill: "none"}, st);
  s.vg = vignette(st, O7.ME, .5); s.flash = fullRect(st, "#ffd9df", 0); s.red = fullRect(st, "#c9182b", 0);
  s.card = o7Card(st, "Air sac: you pass into the blood", "#c1121f");
  s.run = t => { const u = o7U("povAirSac", t), D = o7D("povAirSac"), arr = 1 - Math.exp(-3 * (u + .4)), dive = Math.max(0, u - 2.7), z = lerp(.22, .62, arr) * Math.exp(1.45 * dive), k = ramp(u, 2.5, 3.7);
    tf(s.cl, `translate(${O7X} ${O7Y}) scale(${z}) translate(${-lerp(0, 0, k)} ${-lerp(60, 508, k)}) rotate(${-10 * (1 - arr)})`);
    s.rbc.forEach(c => { const q = ((c.u + t * .08) % 1 + 1) % 1, a = lerp(A1 + .1, A0 - .1, q); tf(c.g, `translate(${VR * Math.cos(a)} ${VR * Math.sin(a)}) rotate(${a * 57.2958 + 90})`); op(c.g.br, ramp(q, .3, .7)); });
    s.n2.forEach(m => tf(m.g, `translate(${m.x + 12 * Math.sin(t * 3 + m.a)} ${m.y + 12 * Math.cos(t * 2.6 + m.a)}) rotate(${m.a * 40 + t * 20})`));
    s.ox.forEach(o => { const q = ((o.u + t * .22) % 1 + 1) % 1, r = lerp(o.r, VR, ease(q / .7)), a = o.a - (q > .7 ? (q - .7) * 1.2 : 0), sq = 1 - .35 * on(q, .52, .7, .08);
      tf(o.g, `translate(${r * Math.cos(a) + 6 * Math.sin(t * 5 + o.sp)} ${r * Math.sin(a)}) rotate(${a * 57.2958 - 90}) scale(1 ${sq})`); op(o.g, clamp(q / .1) * clamp((1 - q) / .1)); });
    o7At(s.L[0], O7X, 300, u, .5, 2.6); o7At(s.L[1], 400, 716, u, .9, 2.6); o7At(s.L[2], 1290, 740, u, 1.2, 2.6); op(s.ptr, on(u, 1.0, 2.5, .25));
    op(s.flash, 1 - ramp(u, -.4, .25)); op(s.red, ramp(u, D - .75, D - .2)); o7Show(s.card, u, .7, D + .2); }; return s; })();

// ---- 5. povRBC: in the blood. Red blood cells drift past; one swoops under us, picks us up and carries us. Loaded with oxygen, the cells turn bright red
S.povRBC = (() => { const s = scene("povRBC", "#7c101c", "#7c101c"), st = s.stage; s.w = el("g", {}, st);
  o7Round(s.w, [[0, "#ffb7a3"], [.2, "#f2606a"], [.55, "#b3121f"], [1, "#5e0a14"]]);
  s.rings = tunnelG(s.w, 9, e => o7RingV(e, "#ff8fa3")); s.str = o7Streaks(s.w, 30, 23, "#ffd6d6", 6);
  s.cells = field(s.w, 20, 57, (e, i) => { e.c = o7RBC(e, 150, true); }, .34);
  s.mates = field(s.w, 6, 91, (e, i) => o7O2(e, 60), .2);
  s.hero = el("g", {}, st); s.hc = o7RBC(s.hero, 300, true); s.seat = o7Seat(st);
  s.L = o7Lab(st, "red blood cell", 56);
  s.vg = vignette(st, O7.ME, .5); s.blink = fullRect(st, "#c9182b", 0); s.card = o7Card(st, "A red blood cell carries you", "#c1121f");
  s.run = t => { const u = o7U("povRBC", t), D = o7D("povRBC"), ua = u + .5, go = Math.max(0, u - 2.2), br = ramp(u, 1.8, 2.8);
    o7Tube(s.rings, .22 * ua + .1 * go * go, 440); o7RunStreaks(s.str, .5 * ua + .5 * go * go, {r0: 100, a: .25 + .4 * ramp(u, 2.2, 3)});
    o7Fly(s.cells, .07 * ua + .03 * go * go, {fog: .5, k: 2.2, fn: (o, x, y, z, sc) => [x, y + Math.sin(t * 2 + o.u * 30) * 20 * sc, sc]}); s.cells.forEach(o => op(o.e.c.br, br));
    o7Fly(s.mates, .05 * ua, {fog: .6, k: 1.8, a: 1 - ramp(u, 1.8, 2.6), fn: (o, x, y, z, sc) => [x + Math.sin(t * 8 + o.u * 40) * 10 * sc, y + Math.cos(t * 9 + o.u * 70) * 10 * sc, sc]});
    const a = ease((u - .5) / 1.5), hx = lerp(O7X - 1150, O7X, a), hy = lerp(O7Y - 520, 1030, a) - 260 * Math.sin(a * Math.PI), hs = lerp(.5, 2.1, a), fl = ramp(u, 1.75, 2.25);
    tf(s.hero, `translate(${hx} ${hy}) scale(${hs} ${hs * lerp(1, .36, fl)}) rotate(${-40 * (1 - a)})`); op(s.hero, on(u, .4, 2.5, .25)); op(s.hc.br, ramp(u, 1.6, 2.2));
    tf(s.seat, `translate(${O7X} ${1050 + 8 * Math.sin(t * 5)})`); op(s.seat, ramp(u, 2.0, 2.4)); s.seat.m.forEach((m, i) => op(m, ramp(u, 2.5 + i * .3, 2.7 + i * .3)));
    o7At(s.L, clamp(hx, 320, 1300), clamp(hy - 330 * hs * .8, 150, 640), u, .7, 2.3);
    op(s.blink, 1 - ramp(u, -.3, .25)); o7Show(s.card, u, 1.7, D + .2); }; return s; })();

// ---- 6. povHeart: the blood flows into the heart. The thick muscle walls squeeze, ba-dum, the valve opens and we are pumped out to the body
S.povHeart = (() => { const s = scene("povHeart", "#7c101c", "#7c101c"), st = s.stage; s.w = el("g", {}, st);
  o7Round(s.w, [[0, "#3a0710"], [.2, "#8a1622"], [.55, "#c9182b"], [1, "#f0414f"]]);
  s.rings = tunnelG(s.w, 9, e => o7RingV(e, "#ff8fa3")); s.chG = el("g", {}, st); s.ch = o7Chamber(s.chG);
  s.out = el("g", {}, st); o7Round(s.out, [[0, "#ffd0c2"], [.2, "#f76a74"], [.55, "#d62839"], [1, "#8a1622"]]); s.rings2 = tunnelG(s.out, 10, e => o7RingV(e, "#ffb3bd"));
  s.str = o7Streaks(st, 40, 29, "#ffe3e3", 7); s.seat = o7Seat(st);
  s.L = [o7Lab(st, "into the heart", 58), o7Lab(st, "a valve: a one-way door", 46, "#ffe5ea"), o7Lab(st, "pumped out to the body!", 58)];
  s.bd = [o7Lab(st, "ba-dum!", 110, "#ffe14d"), o7Lab(st, "BA-DUM!", 150, "#ffe14d")];
  s.pulse = fullRect(st, "#ff2e4d", 0); s.vg = vignette(st, O7.ME, .5); s.card = o7Card(st, "The heart pumps the blood", "#c1121f");
  s.run = t => { const u = o7U("povHeart", t), D = o7D("povHeart"), ua = u + .5, B1 = 1.5, B2 = 2.7, sq = .45 * o7Hit(u, B1, .12, .5) + .75 * ramp(u, B2, B2 + .16) * (1 - ramp(u, 3.4, 3.9));
    const inn = ramp(u, .5, 1.2), open = ramp(u, B2 + .1, B2 + .4), thru = Math.max(0, u - (B2 + .3)), vz = lerp(.3, .85, ramp(u, .6, 2.6)) * Math.exp(4.2 * thru), outK = ramp(u, B2 + .75, B2 + 1.0);
    o7Tube(s.rings, .3 * ua, 440); tf(s.chG, `translate(${O7X} ${O7Y}) scale(${lerp(.25, 1, ease(inn))})`); op(s.chG, clamp(inn * 3) * (1 - outK)); s.ch.set(sq, Math.min(vz, 30), open);
    op(s.out, outK); o7Tube(s.rings2, .5 * thru + .25 * thru * thru, 440); o7RunStreaks(s.str, .4 * ua + 1.2 * thru + .5 * thru * thru, {r0: 110, a: .2 + .6 * ramp(u, B2 + .2, B2 + .8)});
    tf(s.seat, `translate(${O7X} ${1050 + 8 * Math.sin(t * 5) - 40 * sq})`);
    o7At(s.L[0], O7X, 130, u, .2, 1.35); o7At(s.L[1], O7X, 130, u, 1.9, B2 + .1); o7At(s.L[2], O7X, 140, u, B2 + .8, D + .3);
    o7At(s.bd[0], O7X, 330, u, B1 - .05, B1 + .75, 1 + .2 * o7Hit(u, B1, .1, .3)); o7At(s.bd[1], O7X, 400, u, B2 - .05, B2 + .9, 1 + .2 * o7Hit(u, B2, .1, .3));
    op(s.pulse, .22 * Math.max(o7Hit(u, B1, .08, .4), o7Hit(u, B2, .08, .5))); o7Show(s.card, u, .9, D + .2); }; return s; })();

// ---- 7. povArtery: an outside look (heart -> blood vessel -> leg muscle), then first person again: racing down a blood vessel that branches into tiny capillaries
S.povArtery = (() => { const s = scene("povArtery", "#fdf0d5", "#ffe5b4"), st = s.stage, TM = 1.7, KX = 780, KY = 1075, KS = 2.05;
  s.map = el("g", {}, st); fullRect(s.map, o7GR([[0, "#fff6e0"], [1, "#f6d9a8"]])); s.mc = el("g", {}, s.map); s.bm = o7BodyMap(s.mc); tf(s.bm.kidG, `translate(${KX} ${KY}) scale(${KS})`);
  s.ML = [o7Lab(s.map, "heart", 50, "#ffe14d"), o7Lab(s.map, "blood vessel", 50, "#ffe14d"), o7Lab(s.map, "leg muscle", 50, "#ffe14d")]; s.you = el("g", {}, s.map); tf(o7You(s.you), "scale(.8)");
  s.pov = el("g", {}, st); o7Round(s.pov, [[0, "#ffd0c2"], [.2, "#f76a74"], [.55, "#d62839"], [1, "#8a1622"]]);
  s.rings = tunnelG(s.pov, 10, e => o7RingV(e, "#ffb3bd")); const hole = o7GR([[0, "#ffc4b5"], [.5, "#f2606a"], [1, "#b3121f"]]);
  s.fk = [o7Fork(s.pov, "#c9182b", "#ffb3bd", hole), o7Fork(s.pov, "#d62839", "#ffc2ca", hole), o7Fork(s.pov, "#e0414f", "#ffd0d6", hole)];
  s.capG = el("g", {}, s.pov); s.cap = tunnelG(s.capG, 12, e => o7RingV(e, "#ffc2ca")); s.file = [0, 1, 2].map(i => o7RBC(s.capG, 150));
  s.str = o7Streaks(s.pov, 40, 31, "#ffe3e3", 7); s.seat = o7Seat(s.pov);
  s.L = [o7Lab(s.pov, "a big blood vessel", 56), o7Lab(s.pov, "it branches…", 58), o7Lab(s.pov, "tiny capillaries: one cell at a time", 50)];
  s.vg = vignette(st, O7.ME, .5); s.dip = fullRect(st, "#d62839", 0); s.card = o7Card(st, "Racing down to a leg muscle!", "#c1121f");
  s.run = t => { const u = o7U("povArtery", t), D = o7D("povArtery"), mp = u < TM; op(s.map, mp ? 1 : 0); op(s.pov, mp ? 0 : 1);
    if (mp) { const q = ease((u - .15) / 1.3), p = o7Poly(s.bm.AR, q), z = 1 + .5 * ramp(u, .7, TM), dx = KX + p[0] * KS, dy = KY + p[1] * KS;
      tf(s.bm.dot, `translate(${p[0]} ${p[1]}) scale(${1 + .25 * Math.sin(t * 14)})`); tf(s.mc, `translate(${O7X} ${O7Y}) scale(${z}) translate(${-lerp(O7X, KX + 20, ramp(u, .7, TM))} ${-lerp(O7Y, 760, ramp(u, .7, TM))})`);
      const P = (x, y) => [O7X + (x - lerp(O7X, KX + 20, ramp(u, .7, TM))) * z, O7Y + (y - lerp(O7Y, 760, ramp(u, .7, TM))) * z], yp = P(dx, dy);
      tf(s.you, `translate(${yp[0] + 46} ${yp[1] + 34}) rotate(-90) scale(${Math.max(0, pop(u, .1))})`); const a = P(KX + 20, KY - 256 * KS), b = P(KX + 40, KY - 170 * KS), c = P(KX + 26, KY - 84 * KS);
      o7At(s.ML[0], a[0] - 250, a[1] + 10, u, .05, 9); o7At(s.ML[1], b[0] + 300, b[1], u, .45, 9); o7At(s.ML[2], c[0] - 290, c[1] + 16, u, .85, 9); }
    else { const v = u - TM, va = v + .3, cp = ramp(v, 1.95, 2.3);
      o7Tube(s.rings, .5 * va + .1 * va * va, 440); o7RunFork(s.fk[0], v, .75, 3.6, -1); o7RunFork(s.fk[1], v, 1.5, 3.6, 1, 24); o7RunFork(s.fk[2], v, 2.15, 3.6, -1, -16);
      op(s.capG, cp); o7Tube(s.cap, .6 * v, 250, 0, 0, 5); s.file.forEach((c, i) => { const zz = .25 + i * .3 + .05 * Math.sin(t * 3 + i); tf(c, `translate(${O7X + 10 * Math.sin(t * 4 + i)} ${O7Y}) scale(${.42 / zz})`); op(c, clamp(1.3 - zz)); s.capG.insertBefore(c, s.capG.children[1]); });
      o7RunStreaks(s.str, 1.4 * va, {r0: 110, a: .55}); tf(s.seat, `translate(${O7X} ${1050 + 8 * Math.sin(t * 6)}) scale(${lerp(1, .8, cp)})`);
      o7At(s.L[0], O7X, 140, v, .05, .8); o7At(s.L[1], O7X, 140, v, .9, 1.95); o7At(s.L[2], O7X, 140, v, 2.1, D); }
    op(s.dip, on(u, TM - .18, TM + .22, .16)); op(s.vg, mp ? 0 : 1); o7Show(s.card, u, .2, D + .2); }; return s; })();

// ---- 8. povMuscle: inside a muscle cell. Sugar from food is waiting. FLASH: energy is released and the muscle twitches. Carbon dioxide comes out of the
//         sugar (it is made from the food); the oxygen ends up in water. Then the camera hands over to the carbon dioxide molecule
S.povMuscle = (() => { const s = scene("povMuscle", "#8f2740", "#8f2740"), st = s.stage, TF = 1.95, TS = 4.3, SX = O7X + 250, SY = O7Y - 10;
  s.fib = el("g", {}, st); el("rect", {x: FULL.x - 300, y: FULL.y, width: FULL.w + 600, height: FULL.h, fill: "#b8405a"}, s.fib);
  for (let r = 0; r < 8; r++) { const y = FULL.y - 20 + r * 142, g = el("g", {}, s.fib); el("rect", {x: FULL.x - 300, y, width: FULL.w + 600, height: 128, rx: 30, fill: r % 2 ? "#e5677a" : "#dc5a70", stroke: INK, "stroke-width": 7}, g);
    for (let x = FULL.x - 280; x < FULL.x + FULL.w + 300; x += 62) el("rect", {x, y: y + 10, width: 16, height: 108, rx: 6, fill: "#a8324a", opacity: .75}, g); }
  s.soft = el("g", {transform: `translate(${O7X} ${O7Y})`}, st); o7Glow(s.soft, "#ffe5ea", 900, .78, .35);
  s.rays = el("g", {}, st); for (let i = 0; i < 16; i++) el("path", {d: `M0 0 L${Math.cos(i * Math.PI / 8 - .08) * 1300} ${Math.sin(i * Math.PI / 8 - .08) * 1300} L${Math.cos(i * Math.PI / 8 + .08) * 1300} ${Math.sin(i * Math.PI / 8 + .08) * 1300} Z`, fill: "#ffe14d", opacity: .7}, s.rays);
  s.mates = [[-420, -250], [-520, 180], [-160, 300]].map(([x, y], i) => { const g = o7O2(st, 40); return {g, x, y, i}; });
  s.sugG = el("g", {}, st); s.sug = o7Sugar(s.sugG, 120); s.sl = o7Lab(st, "sugar from food", 50, "#ffe14d");
  s.h2o = el("g", {}, st); o7H2O(s.h2o, 92, false); s.hl = [o7Lab(st, "water", 50, "#bfe9ff"), o7Lab(st, "the oxygen ends up in here", 36)];
  s.coG = el("g", {}, st); s.co = o7CO2(s.coG, 84); s.cl = [o7Lab(st, "carbon dioxide", 50, "#e9ecef"), o7Lab(st, "made from the food", 36)];
  s.en = o7Lab(st, "ENERGY!", 150, "#ffe14d"); s.top = o7Lab(st, "inside a leg muscle cell", 54);
  s.flash = fullRect(st, "#fff7c2", 0); s.vg = vignette(st, O7.ME, .5); s.vg2 = vignette(st, O7.CO, .62); s.blink = fullRect(st, "#d62839", 0);
  s.c1 = o7Card(st, "Job done! Energy released from food", "#f77f00"); s.c2 = o7Card(st, "Now ride back with carbon dioxide", "#495057");
  s.run = t => { const u = o7U("povMuscle", t), D = o7D("povMuscle"), tw = o7Hit(u, TF, .1, .4) + o7Hit(u, TF + .6, .1, .4), sw = ease((u - TS) / .9);
    tf(s.fib, `translate(${O7X} 0) scale(${1 - .09 * tw} 1) translate(${-O7X + 6 * Math.sin(t * 60) * tw} 0)`);
    const ap = ease((u + .3) / 1.9), sx = lerp(SX + 120, O7X + 40, ap), sc = lerp(.3, 1.5, ap);
    tf(s.sugG, `translate(${sx} ${SY + 8 * Math.sin(t * 3)}) scale(${sc}) rotate(${6 * Math.sin(t * 2.4)})`); op(s.sugG, u < TF + .06 ? ramp(u, -.3, .1) : 0); o7At(s.sl, sx, SY + 150 * sc + 50, u, .25, TF - .15);
    s.mates.forEach(m => { const q = ease((u + .2) / 1.6), g = u < TF; tf(m.g, `translate(${O7X + m.x * (1.6 - .6 * q) + 8 * Math.sin(t * 6 + m.i)} ${O7Y + m.y * (1.6 - .6 * q) + 8 * Math.cos(t * 5 + m.i)}) rotate(${m.i * 40 - 20})`); op(m.g, g ? ramp(u, -.2, .2) : 0); });
    tf(s.rays, `translate(${O7X + 40} ${SY}) rotate(${t * 30}) scale(${ramp(u, TF - .05, TF + .3)})`); op(s.rays, on(u, TF - .05, TF + 1.5, .3) * .8);
    o7At(s.en, O7X, 250, u, TF + .05, TF + 1.9, 1 + .08 * Math.sin(t * 12)); o7At(s.top, O7X, 110, u, .05, TF - .2);
    // what is left: carbon dioxide (from the sugar) and water (where the oxygen went)
    const cx = lerp(O7X + 290, O7X, sw), cy = lerp(O7Y + 60, O7Y - 10, sw), cs = lerp(1, 4.3, sw) * (1 + .03 * ramp(u, TS + .9, D + .4));
    tf(s.coG, `translate(${cx} ${cy + 8 * Math.sin(t * 3)}) scale(${cs * Math.max(0, pop(u, TF + .25))}) rotate(${-8 + 4 * Math.sin(t * 2)})`); op(s.coG, u > TF + .2 ? 1 : 0);
    o7At(s.cl[0], O7X + 290, O7Y + 230, u, TF + .45, TS - .1); o7At(s.cl[1], O7X + 290, O7Y + 282, u, TF + .6, TS - .1);
    tf(s.h2o, `translate(${O7X - 330} ${O7Y + 50 + 8 * Math.cos(t * 3)}) scale(${Math.max(0, pop(u, TF + .4)) * (1 - sw)}) rotate(6)`); op(s.h2o, u > TF + .35 ? 1 - sw : 0);
    o7At(s.hl[0], O7X - 330, O7Y + 230, u, TF + .55, TS - .1); o7At(s.hl[1], O7X - 330, O7Y + 282, u, TF + .7, TS - .1);
    op(s.flash, on(u, TF - .06, TF + .5, .1) * .95); op(s.vg, 1 - ramp(u, TS, TS + .5)); op(s.vg2, ramp(u, TS + .1, TS + .7)); op(s.blink, 1 - ramp(u, -.4, .2));
    o7Show(s.c1, u, TF + .15, TS - .05); o7Show(s.c2, u, TS + .25, D + .2); }; return s; })();

// ---- 9. povReturn: we are carbon dioxide now. An outside look (leg -> heart -> lungs), then first person: back through the heart, ba-dum, and on to the lungs
S.povReturn = (() => { const s = scene("povReturn", "#fdf0d5", "#ffe5b4"), st = s.stage, TM = 1.6, KX = 780, KY = 1075, KS = 2.05;
  s.map = el("g", {}, st); fullRect(s.map, o7GR([[0, "#fff6e0"], [1, "#f6d9a8"]])); s.mc = el("g", {}, s.map); s.bm = o7BodyMap(s.mc); tf(s.bm.kidG, `translate(${KX} ${KY}) scale(${KS})`); set(s.bm.dot.firstChild, "fill", "#ced4da");
  s.ML = [o7Lab(s.map, "leg muscle", 50, "#ffe14d"), o7Lab(s.map, "heart", 50, "#ffe14d"), o7Lab(s.map, "lungs", 50, "#ffe14d")]; s.you = el("g", {}, s.map); tf(o7You(s.you), "scale(.8)");
  s.pov = el("g", {}, st); o7Round(s.pov, [[0, "#c9505a"], [.2, "#8a1622"], [.55, "#5e0a14"], [1, "#2e050b"]]);
  s.rings = tunnelG(s.pov, 9, e => o7RingV(e, "#c9566a")); s.cells = field(s.pov, 16, 61, (e, i) => { e.c = o7RBC(e, 150, true); op(e.c.br, 0); }, .34);
  s.chG = el("g", {}, s.pov); s.ch = o7Chamber(s.chG);
  s.out = el("g", {}, s.pov); o7Round(s.out, [[0, "#ffc2cd"], [.22, "#c9505a"], [.55, "#7c101c"], [1, "#3a0710"]]); s.rings2 = tunnelG(s.out, 10, e => o7RingV(e, "#d9667f")); s.glow = el("g", {}, s.out); o7Glow(s.glow, "#ffe9ec", 300, 1, .5);
  s.mates = field(s.pov, 7, 93, (e, i) => o7CO2(e, 40), .2); s.str = o7Streaks(s.pov, 40, 37, "#ffe3e3", 7);
  s.L = [o7Lab(s.pov, "in the blood, back to the heart", 52), o7Lab(s.pov, "to the lungs!", 60)]; s.bd = o7Lab(s.pov, "BA-DUM!", 150, "#ffe14d");
  s.pulse = fullRect(st, "#ff2e4d", 0); s.vg = vignette(st, O7.CO, .62); s.dip = fullRect(st, "#5e0a14", 0); s.flash = fullRect(st, "#ffd9df", 0);
  s.card = o7Card(st, "Back through the heart, to the lungs", "#495057");
  s.run = t => { const u = o7U("povReturn", t), D = o7D("povReturn"), mp = u < TM; op(s.map, mp ? 1 : 0); op(s.pov, mp ? 0 : 1);
    if (mp) { const q = ease((u - .1) / 1.3), p = o7Poly(s.bm.VE, q), dx = KX + p[0] * KS, dy = KY + p[1] * KS; tf(s.bm.dot, `translate(${p[0]} ${p[1]}) scale(${1 + .25 * Math.sin(t * 14)})`);
      tf(s.you, `translate(${dx - 46} ${dy + 34}) rotate(90) scale(${Math.max(0, pop(u, .05))})`);
      o7At(s.ML[0], KX + 26 * KS + 250, KY - 84 * KS + 16, u, .05, 9); o7At(s.ML[1], KX + 12 * KS + 250, KY - 244 * KS, u, .5, 9); o7At(s.ML[2], KX - 6 * KS - 240, KY - 290 * KS, u, .9, 9); }
    else { const v = u - TM, va = v + .3, B = 1.25, sq = .75 * ramp(v, B, B + .16) * (1 - ramp(v, B + .7, B + 1.2)), inn = ramp(v, .25, .9), open = ramp(v, B + .1, B + .4), thru = Math.max(0, v - (B + .3));
      const vz = lerp(.3, .85, ramp(v, .3, B)) * Math.exp(4.2 * thru), outK = ramp(v, B + .75, B + 1.0);
      o7Tube(s.rings, .3 * va, 440); o7Fly(s.cells, .08 * va, {fog: .5, k: 2.2, a: 1 - inn}); tf(s.chG, `translate(${O7X} ${O7Y}) scale(${lerp(.25, 1, ease(inn))})`); op(s.chG, clamp(inn * 3) * (1 - outK)); s.ch.set(sq, Math.min(vz, 30), open);
      op(s.out, outK); o7Tube(s.rings2, .5 * thru + .2 * thru * thru, 440); tf(s.glow, `translate(${O7X} ${O7Y}) scale(${.25 * Math.exp(1.9 * Math.max(0, thru - .3))})`);
      o7Fly(s.mates, .06 * va + .1 * thru, {fog: .6, k: 1.8, fn: (o, x, y, z, sc) => [x + Math.sin(t * 8 + o.u * 40) * 10 * sc, y + Math.cos(t * 9 + o.u * 70) * 10 * sc, sc]});
      o7RunStreaks(s.str, .4 * va + 1.2 * thru + .4 * thru * thru, {r0: 110, a: .2 + .5 * ramp(v, B + .2, B + .8)});
      o7At(s.L[0], O7X, 140, v, .05, B - .1); o7At(s.L[1], O7X, 140, v, B + .8, D); o7At(s.bd, O7X, 400, v, B - .05, B + .85, 1 + .2 * o7Hit(v, B, .1, .3)); op(s.pulse, .22 * o7Hit(v, B, .08, .5)); }
    if (mp) op(s.pulse, 0); op(s.dip, on(u, TM - .18, TM + .22, .16)); op(s.vg, mp ? 0 : 1); op(s.flash, ramp(u, D - .3, D - .02)); o7Show(s.card, u, .2, D + .2); }; return s; })();

// ---- 10. povExhale: out of the blood into an air sac, up the windpipe towards the light, and WHOOSH: out of the nose, back into the playground air
S.povExhale = (() => { const s = scene("povExhale", "#ffd9df", "#ffd9df"), st = s.stage, TA = 1.15, TW = 3.0, NX = 586, NY = 362;
  // a: the air sac
  s.sac = el("g", {}, st); el("rect", {x: FULL.x, y: FULL.y, width: FULL.w, height: FULL.h, fill: o7GR([[0, "#fff4f5"], [.8, "#ffd3da"], [1, "#f9a8b9"]])}, s.sac); s.band = el("g", {}, s.sac);
  el("circle", {r: 2000, fill: "none", stroke: INK, "stroke-width": 330}, s.band); el("circle", {r: 2000, fill: "none", stroke: "#8a1622", "stroke-width": 310}, s.band); el("circle", {r: 1838, fill: "none", stroke: "#ff8fa3", "stroke-width": 10}, s.band);
  s.rb = [0, 1, 2, 3, 4, 5, 6].map(i => { const g = o7RBC(s.band, 86, true); op(g.br, 0); return {g, i}; });
  s.up = [[-420, 0], [-160, .25], [130, .1], [400, .35], [640, .2], [-640, .4]].map(([x, d], i) => { const g = o7CO2(st, 34); return {g, x, d, i}; });
  s.La = [o7Lab(st, "out of the blood, into an air sac", 56, "#fff")];
  // b: the windpipe
  s.tube = el("g", {}, st); o7Round(s.tube, [[0, "#ffe9ec"], [.12, "#e58fa1"], [.45, "#a83a52"], [1, "#f4a3b3"]]); s.rings = tunnelG(s.tube, 11, e => o7RingC(e));
  s.light = el("g", {}, s.tube); o7Glow(s.light, "#ffffff", 300, 1, .45); s.mates = field(s.tube, 9, 97, (e, i) => { i % 3 === 0 ? o7CO2(e, 60) : i % 3 === 1 ? o7N2(e, 70) : o7O2(e, 70, false); }, .16);
  s.str = o7Streaks(s.tube, 36, 41, "#ffffff", 7); s.Lb = o7Lab(s.tube, "up the windpipe…", 58);
  // c: outside again
  s.outG = el("g", {}, st); s.cam = el("g", {}, s.outG); o7Field(s.cam); s.kidG = el("g", {transform: "translate(480 800) scale(1.1)"}, s.cam); s.kid = o7Kid(s.kidG);
  seed = 517; s.air = []; for (let i = 0; i < 26; i++) { const g = el("g", {}, s.cam), kind = i % 4; kind === 0 ? o7CO2(g, 18, true) : kind === 3 ? o7O2(g, 17, false) : o7N2(g, 17); s.air.push({g, an: -.9 + rnd() * 1.6, d: 150 + rnd() * 900, r: rnd() * 360, a: rnd() * 6}); }
  s.Lc = o7Lab(s.outG, "carbon dioxide", 52, "#e9ecef");
  s.vg = vignette(st, O7.CO, .62); s.blink = fullRect(st, "#ffd9df", 0); s.white = fullRect(st, "#fff", 0);
  s.card = o7Card(st, "Breathed out! Back into the playground air", "#495057");
  s.run = t => { const u = o7U("povExhale", t), D = o7D("povExhale"), ph = u < TA ? 0 : u < TW ? 1 : 2; op(s.sac, ph === 0 ? 1 : 0); op(s.tube, ph === 1 ? 1 : 0); op(s.outG, ph === 2 ? 1 : 0);
    s.up.forEach(m => op(m.g, ph === 0 ? 1 : 0)); s.La.forEach(l => op(l, 0));
    if (ph === 0) { const rise = 520 * ease((u + .1) / 1.1); tf(s.band, `translate(${O7X} ${2560 + rise})`);
      s.rb.forEach(c => { const a = -Math.PI / 2 + (((c.i / 7 + t * .012) % 1) - .5) * .9; tf(c.g, `translate(${2000 * Math.cos(a)} ${2000 * Math.sin(a)}) rotate(${a * 57.2958 + 90})`); });
      s.up.forEach(m => { const q = ease((u + .35 - m.d) / .8); tf(m.g, `translate(${O7X + m.x + 10 * Math.sin(t * 5 + m.i)} ${lerp(600 + rise, 330 + (m.i % 3) * 90, q)}) rotate(${m.i * 25 - 30}) scale(${1 - .3 * on(q, .15, .5, .1)} 1)`); op(m.g, ramp(u, -.4, 0)); });
      o7At(s.La[0], O7X, 150, u, -.1, TA + .1); }
    else if (ph === 1) { const v = u - TA, va = v + .2; o7Tube(s.rings, .5 * va + .12 * va * va, 420, 160 * Math.sin(va * 1.6) * (1 - ramp(v, .9, 1.6)), 0, 8); tf(s.light, `translate(${O7X} ${O7Y}) scale(${.22 * Math.exp(1.75 * v)})`);
      o7Fly(s.mates, .06 * va, {fog: .6, k: 1.5, fn: (o, x, y, z, sc) => [x + Math.sin(t * 8 + o.u * 40) * 10 * sc, y + Math.cos(t * 9 + o.u * 70) * 10 * sc, sc]}); o7RunStreaks(s.str, 1.5 * va, {r0: 80, a: .6}); o7At(s.Lb, O7X, 140, v, .05, 1.5); }
    else { const v = u - TW, z = 1 + 6 * Math.exp(-3.2 * v), k = Math.exp(-3.2 * v); o7Pose(s.kid, {lean: 1.5 * Math.sin(t * 3), mouth: v < .5 ? 1 : 0}); op(s.kid.sweat, 1 - ramp(v, .4, 1.2));
      tf(s.cam, `translate(${O7X} ${O7Y}) scale(${z}) translate(${-lerp(O7X, NX + 120, k)} ${-lerp(O7Y, NY, k)})`);
      s.air.forEach(m => { const d = m.d * (1 - Math.exp(-2.2 * (v + .25))) + 20 * v; tf(m.g, `translate(${NX + 30 + d * Math.cos(m.an) + 10 * Math.sin(t * 2 + m.a)} ${NY + 10 + d * Math.sin(m.an) * .8 + 10 * Math.cos(t * 1.7 + m.a)}) rotate(${m.r + t * 20})`); });
      const m0 = s.air[0], d0 = m0.d * (1 - Math.exp(-2.2 * (v + .25))) + 20 * v; o7At(s.Lc, NX + 30 + d0 * Math.cos(m0.an) + 10, NY - 58 + d0 * Math.sin(m0.an) * .8, v, .75, 9, .9); }
    op(s.blink, 1 - ramp(u, -.4, .15)); op(s.white, Math.max(on(u, TW - .3, TW + .35, .25), 0)); op(s.vg, ph === 2 ? 1 - ramp(u, TW + .3, TW + 1) : 1);
    o7Show(s.card, u, TW + .3, D + 1); }; return s; })();
