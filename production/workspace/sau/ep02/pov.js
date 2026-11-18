/* TheOneApp, Explored EP02: the gas journey in FIRST PERSON (the teacher, 18 Nov 2026). Load after common.js, geo_map.js and ep02/scenes.js.
   The camera IS a tiny bit of natural gas. Picture-only shots (sound effects, no voice), in this order:
     seabed (outside) > povRock > povWell > povClean > route (outside, real map) > povBurn > povTurbine > povCoil > chimney (outside) > povCable > ceiling (outside)
   Science kept true: the gas is cleaned (not distilled); burning needs oxygen and makes carbon dioxide and water vapour; the hot gases turn the
   turbine; the turbine turns a magnet inside a copper coil; ELECTRICITY (not gas) travels on to homes.
   The edge colour says what "we" are: cyan = natural gas, orange = hot gases, yellow = electricity.
   Every frame depends only on t. */

/* ---- helpers for first-person shots (general enough to move into common.js) ---- */
const PT = n => SC[n] ? SC[n].t0 : -1e6, PE = n => SC[n] ? SC[n].t1 : -1e6;             // a scene's start and end (safe if the scene is not in this video)
function gradR(stops, a = {}) { const id = "pgr" + (gradR.n = (gradR.n || 0) + 1), g = el("radialGradient", Object.assign({id, cx: .5, cy: .5, r: .5}, a), $("v").querySelector("defs"));
  stops.forEach(([o, c, al]) => el("stop", {offset: o, "stop-color": c, "stop-opacity": al === undefined ? 1 : al}, g)); return `url(#${id})`; }
function gradL(stops, a = {}) { const id = "pgl" + (gradL.n = (gradL.n || 0) + 1), g = el("linearGradient", Object.assign({id, x1: 0, y1: 0, x2: 0, y2: 1}, a), $("v").querySelector("defs"));
  stops.forEach(([o, c, al]) => el("stop", {offset: o, "stop-color": c, "stop-opacity": al === undefined ? 1 : al}, g)); return `url(#${id})`; }
// a soft light with no blur filter (cheap to draw, any size): centred on 0,0
function glowDot(p, col, r, a = 1, core = 0) { return el("circle", {r, fill: gradR([[0, col, a], [core, col, a], [1, col, 0]])}, p); }
// the whole screen filled with a round gradient centred on the middle of the screen (a tube seen from inside)
function fullRound(p, stops, r = .78) { return el("rect", {x: FULL.x - 700, y: FULL.y - 700, width: FULL.w + 1400, height: FULL.h + 1400, fill: gradR(stops, {r: r * FULL.w / (FULL.w + 1400)})}, p); }
// another tiny bit of gas (a friend): r = 24 is the size of meGas
function gasFace(p, r = 24, col = "#4cc9f0") { const g = el("g", {}, p), k = r / 24; el("circle", {r, fill: col, stroke: INK, "stroke-width": 4 * k}, g);
  el("ellipse", {cx: -9 * k, cy: -13 * k, rx: 7 * k, ry: 4 * k, fill: "#fff", opacity: .55, transform: `rotate(-30 ${-9 * k} ${-13 * k})`}, g);
  [-8, 8].forEach(x => { el("circle", {cx: x * k, cy: -3 * k, r: 5.4 * k, fill: "#fff"}, g); el("circle", {cx: (x + 1) * k, cy: -2 * k, r: 2.7 * k, fill: INK}, g); });
  el("path", {d: `M${-7 * k} ${8 * k} Q0 ${14 * k} ${7 * k} ${8 * k}`, fill: "none", stroke: INK, "stroke-width": 2.6 * k, "stroke-linecap": "round"}, g); return g; }
// molecules, drawn the same way everywhere: O red, C black, H white, each atom with its letter
const MOLS = {co2: [[-34, 0, 20, "#e63946", "O"], [0, 0, 22, "#212529", "C"], [34, 0, 20, "#e63946", "O"]], h2o: [[0, 0, 22, "#e63946", "O"], [-26, 18, 15, "#fff", "H"], [26, 18, 15, "#fff", "H"]],
  o2: [[-17, 0, 20, "#e63946", "O"], [17, 0, 20, "#e63946", "O"]]};
function molG(p, kind) { const g = el("g", {}, p); MOLS[kind].forEach(([x, y, r, col, l]) => { el("circle", {cx: x, cy: y, r, fill: col, stroke: INK, "stroke-width": 3.5}, g);
  tx(g, {x, y: y + r * .36, "text-anchor": "middle", "font-size": r * 1.05, "font-weight": 700, fill: col === "#fff" ? INK : "#fff"}, l); }); return g; }
// a label on the picture (white with a dark outline, readable on anything)
function povLab(p, text, fs = 44, fill = "#fff") { return tx(p, {x: 0, y: 0, "text-anchor": "middle", "font-size": fs, "font-weight": 700, fill, class: "out", "stroke-width": fs * .22}, text); }
function bigCard(p, text, col = INK) { return chip(p, text, col, {fs: 50}); }
function showBig(c, t, a, b) { showCard(c, t, a, b, 884); }
// flyField with choices: o.spread, o.fog (how much of the depth fades into the dark), o.rot = 0 (keep things upright), o.k (depth), o.fn(o, x, y, z, scale) -> [x, y, scale, rot] (it may also set o.al, that thing's own opacity)
function fly(a, off, o = {}) { const sp = o.spread || 900, fog = o.fog || .3, K = o.k || 2.6;
  a.forEach(ob => { const z = ((ob.z0 - off) % 1 + 1) % 1, zz = .08 + K * z; ob.z = z;
    let sx = VP[0] + ob.x * sp / zz, sy = VP[1] + ob.y * sp * .7 / zz, sc = .5 / zz, r = o.rot === 0 ? 0 : ob.u * 360 + off * 60 * (ob.u - .5);
    if (o.fn) { const q = o.fn(ob, sx, sy, z, sc); if (q) { sx = q[0]; sy = q[1]; if (q[2] !== undefined) sc = q[2]; if (q[3] !== undefined) r = q[3]; } }
    tf(ob.e, `translate(${sx} ${sy}) scale(${sc}) rotate(${r})`); op(ob.e, clamp((1 - z) / fog) * clamp((z - .004) / (o.nf || .05)) * (o.a === undefined ? 1 : o.a) * (ob.al === undefined ? 1 : ob.al)); });
  a.slice().sort((p, q) => q.z - p.z).forEach(ob => a.G.appendChild(ob.e)); }
// speed lines that burst out from the middle of the screen (ph growing = we rush forward; ph falling = things rush ahead of us)
function streaks(p, n, sd, col, w = 6) { const G = el("g", {}, p); seed = sd; const a = [];
  for (let i = 0; i < n; i++) a.push({an: rnd() * Math.PI * 2, u: rnd(), v: .6 + rnd() * .8, e: el("line", {stroke: col, "stroke-width": w, "stroke-linecap": "round"}, G)}); a.G = G; return a; }
function runStreaks(a, ph, o = {}) { const cx = VP[0] + (o.x || 0), cy = VP[1] + (o.y || 0);
  a.forEach(s => { const k = ((s.u + ph * s.v) % 1 + 1) % 1, r1 = (o.r0 || 90) + (o.r1 || 1150) * k * k, r2 = r1 * (1 + (o.len || .22)), c = Math.cos(s.an), sn = Math.sin(s.an);
    set(s.e, "x1", cx + c * r1); set(s.e, "y1", cy + sn * r1); set(s.e, "x2", cx + c * r2); set(s.e, "y2", cy + sn * r2); op(s.e, Math.sin(k * Math.PI) * (o.a === undefined ? .7 : o.a)); }); }
// runTunnel with a bend: the far end of the tube sits at (bx, by) from the middle of the screen
function runTube(a, off, R = 380, bx = 0, by = 0, K = 8) { a.forEach(o => { const z = ((o.z0 - off) % 1 + 1) % 1, zz = .12 + K * z, q = 1 - .12 / zz; o.z = z;
    tf(o.e, `translate(${VP[0] + bx * q} ${VP[1] + by * q}) scale(${R / 300 / zz})`); op(o.e, clamp((1 - z) / .3) * clamp(z / .02)); });
  a.slice().sort((p, q) => q.z - p.z).forEach(o => a.G.appendChild(o.e)); }

// ---- 2. povRock: squeezed in the dark between huge rock grains; other bits of gas all round; then a well pipe breaks in: a way out
S.povRock = (() => { const s = scene("povRock", "#120a06", "#120a06"), st = s.stage; s.w = el("g", {}, st); fullRound(s.w, [[0, "#3a2416"], [.5, "#1d110a"], [1, "#0c0704"]]);
  s.way = el("g", {}, s.w); glowDot(s.way, "#bff3ff", 330, .85, .1);
  s.mouth = el("g", {}, s.way); el("circle", {r: 74, fill: "#0b1622", stroke: INK, "stroke-width": 8}, s.mouth); el("circle", {r: 66, fill: "none", stroke: "#adb5bd", "stroke-width": 12}, s.mouth);
  el("circle", {r: 56, fill: gradR([[0, "#e8fbff"], [.16, "#a9def5"], [.5, "#3f6a8c"], [1, "#16283a"]])}, s.mouth);
  const cols = ["#a47148", "#8a5a3c", "#b08968", "#7f5539", "#9c6644", "#bc8a5f"];
  s.grains = field(s.w, 96, 311, (e, i) => { blob(e, 330, cols[i % 6], 1000 + i * 7); const h = blob(e, 200, "#fff", 2000 + i * 3); set(h, "stroke", "none"); set(h, "opacity", .16); tf(h, "translate(-66 -80)");
    seed = 500 + i; for (let k = 0; k < 5; k++) el("circle", {cx: (rnd() - .5) * 340, cy: (rnd() - .3) * 300, r: 10 + rnd() * 18, fill: INK, opacity: .22}, e); }, .2);
  s.mates = field(s.w, 14, 77, e => gasFace(e, 100), .12);
  s.vg = vignette(st, "#4cc9f0", .5); s.blink = fullRect(st, "#4cc9f0", 0);
  s.card = bigCard(st, "Squeezed inside rock, deep under the seabed"); s.card2 = bigCard(st, "A well! A way out!", "#0077b6");
  s.run = t => { const f = FR("povRock")(t), t0 = PT("povRock"), d = PE("povRock") - t0, pull = ease((f - .6) / .36), dr = on(f, .52, .7, .04);
    const off = .2 * f + .6 * pull * pull;
    const m = ramp(f, .52, .62), ws = .5 + .5 * m + 12 * Math.pow(pull, 4), clr = (o, x, y, z, sc) => { o.al = m ? clamp((Math.hypot(x - VP[0], y - VP[1]) - 80 * ws - 230 * sc) / 110 + 1 - m) : 1; };
    fly(s.grains, off, {fog: .9, k: 1.9, nf: .02, fn: clr});
    fly(s.mates, off - .16 * pull, {rot: 0, fog: .7, k: 1.9, fn: (o, x, y, z, sc) => [x + Math.sin(t * 9 + o.u * 40) * 7 * sc, y + Math.cos(t * 11 + o.u * 70) * 7 * sc, sc, Math.sin(t * 7 + o.u * 30) * 8]});
    tf(s.way, `translate(${VP[0]} ${VP[1]}) scale(${ws})`); op(s.way, .28 + .72 * m); op(s.mouth, m);
    tf(s.w, `translate(${Math.sin(t * 71) * 9 * dr} ${Math.cos(t * 83) * 7 * dr})`);       // the drill shakes the rock
    op(s.blink, 1 - ramp(f, .02, .14));
    showBig(s.card, t, t0 + .5, t0 + .56 * d); showBig(s.card2, t, t0 + .6 * d, t0 + d); }; return s; })();

// ---- 3. povWell: shooting up the well pipe towards a circle of light that grows until it fills the screen
S.povWell = (() => { const s = scene("povWell", "#0d1b2a", "#0d1b2a"), st = s.stage;
  fullRound(st, [[0, "#e8fbff"], [.07, "#a9def5"], [.3, "#3f6a8c"], [.7, "#1c3248"], [1, "#0d1b2a"]]);
  for (let k = 0; k < 12; k++) { const an = (k + .5) / 12 * Math.PI * 2; el("line", {x1: VP[0] + Math.cos(an) * 60, y1: VP[1] + Math.sin(an) * 60, x2: VP[0] + Math.cos(an) * 1500, y2: VP[1] + Math.sin(an) * 1500, stroke: "#0b1622", "stroke-width": 5, opacity: .3}, st); }
  s.rings = tunnelG(st, 12, (e, i) => { const o = i % 3 === 0; el("circle", {r: 300, fill: "none", stroke: INK, "stroke-width": o ? 30 : 16}, e); el("circle", {r: 300, fill: "none", stroke: o ? "#f4a261" : "#8fa7bd", "stroke-width": o ? 20 : 8}, e);
    if (o) for (let k = 0; k < 16; k++) el("circle", {cx: Math.cos(k / 16 * 6.283) * 300, cy: Math.sin(k / 16 * 6.283) * 300, r: 5, fill: INK}, e); });
  s.str = streaks(st, 40, 5, "#caf0f8", 6);
  s.light = el("g", {}, st); s.lg = glowDot(s.light, "#ffffff", 100, .9, .45); s.lc = el("circle", {r: 50, fill: gradR([[0, "#ffffff"], [.7, "#eafaff"], [1, "#bfe9ff"]])}, s.light);
  seed = 41; s.mates = []; for (let k = 0; k < 6; k++) s.mates.push({e: gasFace(st, 40), an: k / 6 * 6.283 + rnd(), r: 250 + rnd() * 170, u: rnd()});
  vignette(st, "#4cc9f0", .7); s.flood = fullRect(st, "#f4fdff", 0); s.card = bigCard(st, "Whoosh! Up the well pipe");
  s.run = t => { const f = FR("povWell")(t), t0 = PT("povWell"), tau = Math.max(0, t - t0), g = Math.pow(clamp(f / .9), 6);
    runTunnel(s.rings, .32 * tau + .055 * tau * tau, 400); runStreaks(s.str, .9 * tau + .2 * tau * tau, {r0: 60, a: .75});
    const r = 30 + 1500 * g; tf(s.light, `translate(${VP[0]} ${VP[1]}) scale(${r / 50})`);
    s.mates.forEach(m => { const rr = (m.r + 30 * Math.sin(tau * 2.2 + m.u * 9)) * (1 + 2.2 * g), an = m.an + .25 * Math.sin(tau * 1.3 + m.u * 5);
      tf(m.e, `translate(${VP[0] + Math.cos(an) * rr} ${VP[1] + Math.sin(an) * rr * .8}) scale(${(.7 + .6 * m.u) * (1 + 1.2 * g)})`); });
    op(s.flood, ramp(f, .86, .93)); showBig(s.card, t, t0 + .25, t0 + .72 * (PE("povWell") - t0)); }; return s; })();

// ---- 4. povClean: tumbling through the cleaning tank. Water drops and sand fall away below, other gases peel off above; it gets clearer
S.povClean = (() => { const s = scene("povClean", "#dbe7f0", "#b8cfe0"), st = s.stage, X = VP[0], Y = VP[1]; s.w = el("g", {}, st);
  el("rect", {x: -1400, y: -1700, width: 4500, height: 4400, fill: gradL([[0, "#7f95a8"], [.36, "#eef4f8"], [.6, "#dde8f0"], [1, "#8fa5b8"]])}, s.w);
  s.ribs = tunnelG(s.w, 6, e => { el("ellipse", {rx: 300, ry: 200, fill: "none", stroke: INK, "stroke-width": 9}, e); el("ellipse", {rx: 300, ry: 200, fill: "none", stroke: "#a9bccd", "stroke-width": 5}, e); });
  s.exit = el("g", {transform: `translate(${X} ${Y})`}, s.w); el("circle", {r: 128, fill: "#8d99ae", stroke: INK, "stroke-width": 8}, s.exit); el("circle", {r: 100, fill: gradR([[0, "#ffffff"], [.6, "#e8fbff"], [1, "#9bdcf5"]]), stroke: INK, "stroke-width": 7}, s.exit);
  s.fld = field(s.w, 52, 93, (e, i) => { const k = i % 4;
    if (k === 0) gasFace(e, 84); else if (k === 1) { const g = el("g", {transform: "scale(1.5)"}, e); el("path", {d: "M0 -70 C40 -10 52 14 52 34 A52 52 0 0 1 -52 34 C-52 14 -40 -10 0 -70 Z", fill: "#0096c7", stroke: INK, "stroke-width": 6}, g); el("ellipse", {cx: -20, cy: 30, rx: 10, ry: 18, fill: "#fff", opacity: .6}, g); }
    else if (k === 2) blob(e, 62, ["#9c6644", "#bc6c25", "#7f5539"][i % 3], 300 + i);
    else { el("circle", {r: 70, fill: "#b197fc", stroke: INK, "stroke-width": 8}, e); el("circle", {cx: -22, cy: -26, r: 16, fill: "#fff", opacity: .5}, e); } }, .13);
  // the outlet at the top (other gases leave) and the pool at the bottom (water, with sand under it)
  s.out = el("g", {transform: `translate(${X} ${Y - 470})`}, s.w); el("ellipse", {rx: 380, ry: 150, fill: "#8d99ae", stroke: INK, "stroke-width": 8}, s.out); el("ellipse", {rx: 320, ry: 112, fill: "#1b2733", stroke: INK, "stroke-width": 7}, s.out);
  let wd = `M-1500 ${Y + 300}`; for (let k = 0; k < 26; k++) wd += " q45 -26 90 0 t90 0"; s.pool = el("g", {}, s.w);
  el("path", {d: wd + " V2800 H-1500 Z", fill: "#3fb8dc", stroke: INK, "stroke-width": 7, "stroke-linejoin": "round", opacity: .93}, s.pool);
  let sd = `M-1500 ${Y + 455}`; for (let k = 0; k < 14; k++) sd += " q80 -34 160 0 t160 0"; el("path", {d: sd + " V2800 H-1500 Z", fill: "#bc8a5f", stroke: INK, "stroke-width": 6, "stroke-linejoin": "round"}, s.pool);
  s.murk = fullRect(st, "#6b5234", .5); s.vg = vignette(st, "#4cc9f0", .6); s.flood = fullRect(st, "#f4fdff", 0);
  s.L = [povLab(st, "⬆ other gases", 54), povLab(st, "⬇ water and sand", 54), povLab(st, "clean natural gas", 50, "#ffe14d")]; s.card = bigCard(st, "The cleaning tank");
  s.run = t => { const f = FR("povClean")(t), t0 = PT("povClean"), tau = Math.max(0, t - t0), d = PE("povClean") - t0;
    tf(s.w, `rotate(${20 * Math.sin(tau * 2.3 + .6) * (1 - ease(f / .7))} ${X} ${Y})`);
    runTunnel(s.ribs, .1 * tau, 1500);
    fly(s.fld, .06 + .1 * tau, {rot: 0, fog: .45, fn: (o, x, y, z, sc) => { const k = o.i % 4, q = Math.pow(clamp((f - .08 - o.u * .3) / .4), 2);
      o.al = k ? 1 - clamp((q - .75) / .25) : 1;                                              // once it has left, it stays out
      if (k === 1 || k === 2) return [x, y + q * 1500, sc]; if (k === 3) return [lerp(x, X, q * .8), y - q * 1500, sc];
      return [x + Math.sin(tau * 5 + o.u * 30) * 8 * sc, y + Math.cos(tau * 6 + o.u * 50) * 8 * sc, sc]; }});
    tf(s.pool, `translate(0 ${-50 * ease(f / .8)})`);                                              // the water collects
    const ex = Math.pow(clamp((f - .7) / .22), 2); tf(s.exit, `translate(${X} ${Y}) scale(${1 + 11 * ex})`);
    op(s.murk, .55 * (1 - ease(f / .7))); op(s.flood, ramp(f, .88, .94));
    tf(s.L[0], `translate(${X + 560} 150)`); op(s.L[0], on(f, .28, .82, .08)); tf(s.L[1], `translate(${X - 470} 905)`); op(s.L[1], on(f, .28, .82, .08));
    tf(s.L[2], `translate(${X} ${Y + 200})`); op(s.L[2], on(f, .5, .76, .08));
    showBig(s.card, t, t0 + .2, t0 + .27 * d); }; return s; })();

// ---- 6. povBurn: diving into a ring of blue flames; oxygen from the air rushes in beside us; FLASH; we are now carbon dioxide and water vapour
S.povBurn = (() => { const s = scene("povBurn", "#0d0b1e", "#0d0b1e"), st = s.stage;
  s.cold = el("g", {}, st); fullRound(s.cold, [[0, "#3a4a8c"], [.25, "#232a57"], [.7, "#14132e"], [1, "#0a0918"]]);
  s.tube = tunnelG(s.cold, 8, e => { el("circle", {r: 300, fill: "none", stroke: INK, "stroke-width": 22}, e); el("circle", {r: 300, fill: "none", stroke: "#4a4e69", "stroke-width": 12}, e); });
  s.core = el("g", {}, s.cold); glowDot(s.core, "#bfe3ff", 300, 1, .15);
  s.ring = el("g", {}, s.cold); el("circle", {r: 300, fill: "none", stroke: INK, "stroke-width": 44}, s.ring); el("circle", {r: 300, fill: "none", stroke: "#6c757d", "stroke-width": 30}, s.ring);
  s.fl = []; for (let k = 0; k < 16; k++) { const a = el("g", {transform: `rotate(${k * 22.5}) translate(0 -300)`}, s.ring), g = el("g", {}, a); el("circle", {r: 13, fill: INK}, a);
    el("path", {d: "M0 6 C-46 -24 -40 -96 0 -170 C40 -96 46 -24 0 6 Z", fill: "#3a86ff", stroke: INK, "stroke-width": 7, "stroke-linejoin": "round"}, g);
    el("path", {d: "M0 0 C-24 -16 -20 -56 0 -100 C20 -56 24 -16 0 0 Z", fill: "#a5e8ff"}, g); s.fl.push(g); }
  s.o2 = field(s.cold, 16, 21, e => tf(molG(e, "o2"), "scale(4)"), .3);
  s.mates = field(s.cold, 6, 33, e => gasFace(e, 54), .14);
  s.vc = vignette(s.cold, "#4cc9f0", .7);
  s.ol = el("g", {}, s.cold); tf(molG(s.ol, "o2"), "translate(-130 -18) scale(1.6)"); set(povLab(s.ol, "oxygen", 56), "x", 50); s.card = bigCard(s.cold, "Burning needs oxygen from the air");
  // after the flash: hot gases
  s.hot = el("g", {}, st); fullRound(s.hot, [[0, "#fff3b0"], [.3, "#ffb703"], [.65, "#f3722c"], [1, "#9d0208"]]);
  s.str = streaks(s.hot, 36, 12, "#fff8d6", 8);
  s.ms = [["co2", -330, -30], ["h2o", 250, -170], ["h2o", 330, 150]].map(([k, x, y]) => ({e: molG(s.hot, k), x, y, k}));
  s.l1 = povLab(s.hot, "carbon dioxide", 50); s.l2 = povLab(s.hot, "water vapour", 50);
  vignette(s.hot, "#ff7b00", .75); s.card2 = bigCard(s.hot, "Now we are very hot gases!", "#d00000");
  s.flash = fullRect(st, "#ffffff", 0);
  s.run = t => { const f = FR("povBurn")(t), t0 = PT("povBurn"), tau = Math.max(0, t - t0), d = PE("povBurn") - t0, FL = .58, g = Math.pow(clamp(f / FL), 1.7), hot = f >= FL;
    op(s.cold, hot ? 0 : 1); op(s.hot, hot ? 1 : 0);
    if (!hot) { runTunnel(s.tube, .25 * tau + .1 * tau * tau, 520);
      const sr = .3 * Math.exp(3.1 * g); tf(s.ring, `translate(${VP[0]} ${VP[1]}) scale(${sr})`); tf(s.core, `translate(${VP[0]} ${VP[1]}) scale(${sr * (.9 + .5 * g)})`);
      s.fl.forEach((e, k) => tf(e, `scale(${1 + .12 * Math.sin(t * 23 + k * 2.4)} ${1 + .22 * Math.sin(t * 17 + k * 1.7)})`));
      fly(s.o2, -(.3 * tau + .08 * tau * tau), {fog: .5, k: 2.4}); fly(s.mates, -.1 * tau, {rot: 0, fog: .5});
      tf(s.ol, `translate(${VP[0]} 96) scale(${Math.max(0, pop(t, t0 + .5))})`); op(s.ol, on(f, .08, .5, .05));
      showBig(s.card, t, t0 + .25, t0 + .5 * d); }
    else { const k = ease((f - FL) / .22), sc = lerp(9, 2.7, k) * (1 - .12 * ramp(f, .8, 1)), sp = lerp(2.6, 1, k);
      runStreaks(s.str, 1.5 * tau, {r0: 240, a: .6});
      s.ms.forEach((m, i) => tf(m.e, `translate(${VP[0] + m.x * sp + Math.sin(t * 13 + i * 2) * 7} ${VP[1] + m.y * sp + Math.cos(t * 15 + i * 3) * 7}) scale(${sc}) rotate(${Math.sin(t * 5 + i) * 7})`));
      tf(s.l1, `translate(${VP[0] - 330} ${VP[1] + 110})`); tf(s.l2, `translate(${VP[0] + 300} ${VP[1] + 20})`); [s.l1, s.l2].forEach(l => op(l, ramp(f, FL + .1, FL + .15)));
      showBig(s.card2, t, t0 + (FL + .14) * d, t0 + d); }
    op(s.flash, Math.max(ramp(f, FL - .05, FL) * (f < FL ? 1 : 0), f >= FL ? 1 - ramp(f, FL + .01, FL + .13) : 0)); }; return s; })();

// ---- 7. povTurbine: we are the hot gases, rushing at giant turbine blades that spin faster as we push them
S.povTurbine = (() => { const s = scene("povTurbine", "#3b1408", "#3b1408"), st = s.stage;
  fullRound(st, [[0, "#3a1a10"], [.45, "#7a2a0c"], [1, "#e85d04"]]);
  s.w = el("g", {}, st); el("circle", {r: 486, fill: INK}, s.w); el("circle", {r: 464, fill: "none", stroke: "#6c757d", "stroke-width": 30}, s.w); el("circle", {r: 448, fill: gradR([[0, "#3d405b"], [1, "#16162e"]])}, s.w);
  const blades = (p, o) => { const g = el("g", {opacity: o}, p); for (let k = 0; k < 9; k++) { const b = el("g", {transform: `rotate(${k * 40})`}, g);
    el("path", {d: "M-30 -92 C-84 -220 -62 -360 16 -440 L104 -410 C58 -330 52 -200 36 -90 Z", fill: "#5c8fb0", stroke: INK, "stroke-width": 9, "stroke-linejoin": "round"}, b);
    el("path", {d: "M-22 -110 C-66 -220 -48 -340 14 -416 L44 -406 C0 -330 -6 -220 2 -108 Z", fill: "#b8dcf0"}, b); } return g; };
  s.gh = blades(s.w, .3); s.bl = blades(s.w, 1);
  s.hub = el("g", {}, s.w); el("circle", {r: 108, fill: "#ced4da", stroke: INK, "stroke-width": 9}, s.hub); el("circle", {r: 46, fill: "#6c757d", stroke: INK, "stroke-width": 7}, s.hub);
  for (let k = 0; k < 6; k++) el("circle", {cx: Math.cos(k * 1.047) * 78, cy: Math.sin(k * 1.047) * 78, r: 9, fill: k ? INK : "#e63946"}, s.hub);
  s.str = streaks(st, 34, 9, "#ffd166", 8);
  seed = 61; s.ms = []; for (let k = 0; k < 7; k++) s.ms.push({e: molG(st, k % 3 ? "h2o" : "co2"), an: k / 7 * 6.283 + rnd() * .5, r: 380 + rnd() * 330, u: rnd()});
  vignette(st, "#ff7b00", .75); s.end = fullRect(st, "#1a1208", 0); s.card = bigCard(st, "Hot gases push the turbine round and round", "#d00000");
  s.run = t => { const f = FR("povTurbine")(t), t0 = PT("povTurbine"), tau = Math.max(0, t - t0), d = PE("povTurbine") - t0;
    const ang = 25 * tau + 58 * tau * tau, w = 25 + 116 * tau, zoom = lerp(.6, 1.12, ease(f / .78)) * (1 + 10 * Math.pow(clamp((f - .78) / .17), 2));
    tf(s.w, `translate(${VP[0]} ${VP[1]}) scale(${zoom})`); tf(s.bl, `rotate(${ang})`); tf(s.gh, `rotate(${ang - w * .022})`); tf(s.hub, `rotate(${ang})`);
    runStreaks(s.str, 1.1 * tau + .15 * tau * tau, {r0: 200, a: .65});
    s.ms.forEach(m => { const p = ((m.u + tau * .42) % 1), rr = m.r * (1.5 - 1.1 * p), an = m.an + .5 * p; tf(m.e, `translate(${VP[0] + Math.cos(an) * rr} ${VP[1] + Math.sin(an) * rr * .75}) scale(${2.4 - 1.7 * p}) rotate(${m.u * 300 + tau * 120})`); op(m.e, clamp(p / .08) * clamp((1 - p) / .12) * (1 - ramp(f, .76, .84))); });
    op(s.end, ramp(f, .86, .94)); showBig(s.card, t, t0 + .25, t0 + .78 * d); }; return s; })();

// ---- 8. povCoil: inside the generator, looking along the shaft. Copper coil windings all round; the magnet spins; electricity starts to flow
S.povCoil = (() => { const s = scene("povCoil", "#1a1208", "#1a1208"), st = s.stage;
  fullRound(st, [[0, "#06040a"], [.3, "#2a1a0c"], [1, "#120b05"]]);
  const C = 2 * Math.PI * 300, A = C * 62 / 360; s.arcs = [];
  s.rings = tunnelG(st, 15, e => { el("circle", {r: 300, fill: "none", stroke: INK, "stroke-width": 46}, e); el("circle", {r: 300, fill: "none", stroke: "#b5651d", "stroke-width": 34}, e);
    el("circle", {r: 309, fill: "none", stroke: "#f0a868", "stroke-width": 7}, e); el("circle", {r: 291, fill: "none", stroke: "#7f4410", "stroke-width": 7}, e);
    el("circle", {r: 300, fill: "none", stroke: INK, "stroke-width": 34, "stroke-dasharray": "3 23", opacity: .3}, e);
    s.arcs.push(el("circle", {r: 300, fill: "none", stroke: "#ffe14d", "stroke-width": 30, "stroke-linecap": "round", "stroke-dasharray": `${A} ${C / 2 - A}`}, e)); });
  s.mag = el("g", {}, st); el("rect", {x: -265, y: -62, width: 265, height: 124, rx: 10, fill: "#e63946", stroke: INK, "stroke-width": 9}, s.mag); el("rect", {x: 0, y: -62, width: 265, height: 124, rx: 10, fill: "#3a86ff", stroke: INK, "stroke-width": 9}, s.mag);
  tx(s.mag, {x: -160, y: 34, "text-anchor": "middle", "font-size": 96, "font-weight": 700, fill: "#fff"}, "N"); tx(s.mag, {x: 160, y: 34, "text-anchor": "middle", "font-size": 96, "font-weight": 700, fill: "#fff"}, "S");
  el("circle", {r: 58, fill: "#ced4da", stroke: INK, "stroke-width": 9}, s.mag); el("circle", {r: 18, fill: INK}, s.mag);
  seed = 71; s.sp = []; for (let k = 0; k < 14; k++) { const an = rnd() * 6.283, r = 340 + rnd() * 380, g = el("g", {transform: `translate(${VP[0] + Math.cos(an) * r} ${VP[1] + Math.sin(an) * r * .78})`}, st);
    el("path", {d: "M0 -34 L8 -8 L34 0 L8 8 L0 34 L-8 8 L-34 0 L-8 -8 Z", fill: "#fff8d6", stroke: "#ffbe0b", "stroke-width": 4}, g); s.sp.push({g, an}); }
  s.vg = vignette(st, "#ffe14d", .8); s.card = bigCard(st, "The turbine spins a magnet inside a copper coil…", "#7a4a00"); s.card2 = bigCard(st, "…and that makes electricity! ⚡", "#7a4a00");
  s.run = t => { const f = FR("povCoil")(t), t0 = PT("povCoil"), tau = Math.max(0, t - t0), ang = 150 * tau + 22 * tau * tau, e = ramp(f, .3, .56);
    runTunnel(s.rings, .035 * tau, 400); s.arcs.forEach((a, i) => { tf(a, `rotate(${ang - 31 - i * 9})`); op(a, e * (.65 + .35 * Math.sin(t * 40 + i))); });
    tf(s.mag, `translate(${VP[0]} ${VP[1]}) scale(${lerp(.86, 1, ease(f))}) rotate(${ang})`);
    const th = ang * Math.PI / 180; s.sp.forEach((q, i) => { const b = Math.pow(Math.max(0, Math.cos(2 * (th - q.an)) ), 6) * e; op(q.g, b); });
    op(s.vg, e); const d = PE("povCoil") - t0; showBig(s.card, t, t0 + .2, t0 + .5 * d); showBig(s.card2, t, t0 + .53 * d, t0 + d); }; return s; })();

// ---- 10. povCable: riding the electricity along cables under the ground, towards a light
S.povCable = (() => { const s = scene("povCable", "#14102b", "#14102b"), st = s.stage;
  s.wall = fullRound(st, [[0, "#fff8d6"], [.06, "#ffe14d"], [.2, "#f77f00"], [.48, "#4a2a6a"], [1, "#14102b"]]);
  s.rings = tunnelG(st, 12, (e, i) => { el("circle", {r: 300, fill: "none", stroke: INK, "stroke-width": 26}, e); el("circle", {r: 300, fill: "none", stroke: i % 2 ? "#f0a868" : "#b5651d", "stroke-width": 15}, e); });
  s.str = streaks(st, 40, 15, "#fff8d6", 8);
  seed = 19; s.bolts = []; for (let k = 0; k < 8; k++) { const g = el("g", {}, st), d = "M0 0 L62 -24 L50 8 L124 -16 L108 14 L196 0";
    el("path", {d, fill: "none", stroke: INK, "stroke-width": 30, "stroke-linejoin": "round", "stroke-linecap": "round"}, g); el("path", {d, fill: "none", stroke: "#ffe14d", "stroke-width": 20, "stroke-linejoin": "round", "stroke-linecap": "round"}, g);
    el("path", {d, fill: "none", stroke: "#fff", "stroke-width": 7, "stroke-linejoin": "round", "stroke-linecap": "round"}, g); s.bolts.push({g, an: k / 8 * 6.283 + rnd() * .5, u: rnd(), v: .7 + rnd() * .6}); }
  s.light = el("g", {}, st); glowDot(s.light, "#ffffff", 110, .9, .4); el("circle", {r: 50, fill: gradR([[0, "#ffffff"], [.7, "#fffbe6"], [1, "#ffe9a8"]])}, s.light);
  s.vg = vignette(st, "#ffe14d", .7); s.flood = fullRect(st, "#fffbe6", 0); s.card = bigCard(st, "Electricity races through cables under the ground", "#7a4a00");
  s.run = t => { const f = FR("povCable")(t), t0 = PT("povCable"), tau = Math.max(0, t - t0), st8 = 1 - ease((f - .55) / .3), g = Math.pow(clamp(f / .9), 6);
    const bx = 430 * Math.sin(tau * 1.7 + .4) * st8, by = 170 * Math.sin(tau * 2.6 + 1) * st8;
    tf(s.wall, `translate(${bx} ${by})`); runTube(s.rings, .5 * tau + .04 * tau * tau, 400, bx, by); runStreaks(s.str, 1.6 * tau, {r0: 70, a: .8, x: bx * .5, y: by * .5});
    s.bolts.forEach(b => { const k = (b.u + tau * .8 * b.v) % 1, r = 110 + 1000 * k * k; tf(b.g, `translate(${VP[0] + bx * (1 - k) + Math.cos(b.an) * r} ${VP[1] + by * (1 - k) + Math.sin(b.an) * r * .8}) rotate(${b.an * 180 / Math.PI}) scale(${.3 + 2.4 * k})`); op(b.g, Math.sin(k * Math.PI) * (1 - ramp(f, .7, .85))); });
    tf(s.light, `translate(${VP[0] + bx} ${VP[1] + by}) scale(${(26 + 1500 * g) / 50})`);
    op(s.flood, ramp(f, .86, .93)); showBig(s.card, t, t0 + .25, t0 + .7 * (PE("povCable") - t0)); }; return s; })();
