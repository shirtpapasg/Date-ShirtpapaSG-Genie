/* TheOneApp, Explored EP04: the PICTURE-ONLY shots (sound effects, a music bed and one-line cards; no voice). Load after ep04/scenes.js.
   rainWindow (silent cold open) > ... > the hero journey, where YOU are Mo, a water molecule:
     home (outside, MacRitchie) > povEvap > povFriends > povSea > povCool > povGrow > povFall > povDrain > homeAgain (outside) ... clearSky (the last shot).
   In first person the two white hydrogen atoms at the bottom corners of the screen are YOUR hands: that is how we know we are the molecule.
   Science kept true: no bubbles when we evaporate (no boiling); vapour molecules are spread far apart and there is no "steam"; the cloud is
   made of tiny liquid droplets, each formed on a speck of dust; the salt stays in the sea. Every frame depends only on t. */

/* ---- first-person helpers (copied and adapted from ep02/pov.js) ---- */
function fly4(a, off, o = {}) { const sp = o.spread || 900, fog = o.fog || .3, K = o.k || 2.6;
  a.forEach(ob => { const z = ((ob.z0 - off) % 1 + 1) % 1, zz = .08 + K * z; ob.z = z;
    let sx = VP[0] + ob.x * sp / zz, sy = VP[1] + ob.y * sp * .7 / zz, sc = .5 / zz, r = o.rot === 0 ? 0 : ob.u * 360 + off * 60 * (ob.u - .5);
    if (o.fn) { const q = o.fn(ob, sx, sy, z, sc); if (q) { sx = q[0]; sy = q[1]; if (q[2] !== undefined) sc = q[2]; if (q[3] !== undefined) r = q[3]; } }
    tf(ob.e, `translate(${sx} ${sy}) scale(${sc}) rotate(${r})`); op(ob.e, clamp((1 - z) / fog) * clamp((z - .004) / (o.nf || .05)) * (o.a === undefined ? 1 : o.a)); });
  a.slice().sort((p, q) => q.z - p.z).forEach(ob => a.G.appendChild(ob.e)); }
function streaks4(p, n, sd, col, w = 6) { const G = el("g", {}, p); seed = sd; const a = [];
  for (let i = 0; i < n; i++) a.push({an: rnd() * Math.PI * 2, u: rnd(), v: .6 + rnd() * .8, e: el("line", {stroke: col, "stroke-width": w, "stroke-linecap": "round"}, G)}); a.G = G; return a; }
function runStreaks4(a, ph, o = {}) { const cx = VP[0] + (o.x || 0), cy = VP[1] + (o.y || 0);
  a.forEach(s => { const k = ((s.u + ph * s.v) % 1 + 1) % 1, r1 = (o.r0 || 90) + (o.r1 || 1150) * k * k, r2 = r1 * (1 + (o.len || .22)), c = Math.cos(s.an), sn = Math.sin(s.an);
    set(s.e, "x1", cx + c * r1); set(s.e, "y1", cy + sn * r1); set(s.e, "x2", cx + c * r2); set(s.e, "y2", cy + sn * r2); op(s.e, Math.sin(k * Math.PI) * (o.a === undefined ? .7 : o.a)); }); }
function runTube4(a, off, R = 380, bx = 0, by = 0, K = 8) { a.forEach(o => { const z = ((o.z0 - off) % 1 + 1) % 1, zz = .12 + K * z, q = 1 - .12 / zz; o.z = z;
    tf(o.e, `translate(${VP[0] + bx * q} ${VP[1] + by * q}) scale(${R / 300 / zz})`); op(o.e, clamp((1 - z) / .3) * clamp(z / .02)); });
  a.slice().sort((p, q) => q.z - p.z).forEach(o => a.G.appendChild(o.e)); }
// YOUR hands: the two hydrogen atoms, at the bottom corners of the screen
function hands4(p) { const g = el("g", {}, p); g.h = [-1, 1].map(sd => { const h = el("g", {}, g), x = VP[0] + sd * 870;
    el("circle", {cx: x, cy: 1075, r: 235, fill: "#fff", stroke: INK, "stroke-width": 10}, h); el("path", {d: `M${x - sd * 150} 930 q${sd * 40} -50 ${sd * 110} -44`, fill: "none", stroke: "#dfe6ee", "stroke-width": 16, "stroke-linecap": "round"}, h);
    tx(h, {x: x - sd * 88, y: 1010, "text-anchor": "middle", "font-size": 120, "font-weight": 700, fill: "#aeb8c6"}, "H"); return h; }); return g; }
// dx, dy: a jiggle; inw: the hands reach in towards the middle (0..1)
function runHands4(g, dx = 0, dy = 0, inw = 0, a = 1) { g.h.forEach((h, i) => tf(h, `translate(${dx * (i ? 1 : -1) + (i ? -1 : 1) * inw * 150} ${dy * (i ? 1 : .8) - inw * 90})`)); op(g, a); }
function card4(p, text, col = INK) { return chip(p, text, col, {fs: 46}); }
// u-seconds helper for a shot: U = its planned length; returns {u, at(u) -> absolute time, f}
function shot4(name, U, t) { const t0 = T0(name), d = T1(name) - t0; return {u: (t - t0) * U / d, at: u => t0 + u * d / U, f: clamp((t - t0) / d), t0, d}; }
const show4 = (c, t, q, a, b) => showCard(c, t, q.at(a), q.at(b), 890);

/* ---- 0. rainWindow: the silent cold open. Dusk, an HDB block in the rain, thunder; we push in on one lit window, where a pupil watches a drop slide down the glass ---- */
const RW4 = {U: 6};
S.rainWindow = (() => { const s = scene("rainWindow", "#23244d", "#23244d"), st = s.stage; s.cam = el("g", {}, st); const c = s.cam;
  el("rect", {x: -3200, y: -1700, width: 8000, height: 1500, fill: gL([[0, "#23244d"], [.55, "#5b4a82"], [.86, "#c9705f"], [1, "#f2a65a"]])}, c);
  s.bolt = el("path", {d: "M1750 -1100 L1650 -860 L1740 -850 L1600 -560 L1690 -550 L1560 -300", fill: "none", stroke: "#fff", "stroke-width": 22, "stroke-linejoin": "round", "stroke-linecap": "round", opacity: 0}, c);
  [[-600, -620, 900, 3], [500, -760, 1100, 5], [1500, -600, 1000, 7], [2500, -700, 900, 9], [-1500, -720, 1000, 11]].forEach(([x, y, w, sd]) => at4(cloud4(c, sd, w, "#3b3a66", 7), x, y));
  el("rect", {x: -3200, y: -250, width: 8000, height: 3600, fill: "#6a5d86"}, c); el("rect", {x: -3200, y: -300, width: 8000, height: 64, fill: "#4d4368", stroke: INK, "stroke-width": 8}, c);
  [-1, 0, 1, 2].forEach(j => el("rect", {x: -3200, y: 480 + j * 560 + 238, width: 8000, height: 84, fill: "#594d76", stroke: INK, "stroke-width": 6}, c));
  const frame = (g, lit) => { el("rect", A4({x: -276, y: -216, width: 552, height: 432, rx: 10, fill: "#aab2c0", "stroke-width": 9}), g); el("rect", A4({x: -250, y: -190, width: 500, height: 380, fill: lit ? "#ffd58a" : "#2b3055", "stroke-width": 6}), g);
    el("rect", A4({x: -292, y: 214, width: 584, height: 30, rx: 6, fill: "#8c93a3", "stroke-width": 7}), g); };
  seed = 77; for (let j = -1; j <= 2; j++) for (let i = -3; i <= 3; i++) { if (!i && !j) continue; const g = el("g", {transform: `translate(${810 + i * 700} ${480 + j * 560})`}, c), lit = rnd() < .55; frame(g, lit);
    if (lit) { const cc = ["#e76f51", "#2a9d8f", "#e9c46a", "#8ecae6"][Math.floor(rnd() * 4)]; el("path", {d: "M-250 -190 H-120 Q-150 0 -190 190 H-250 Z", fill: cc, stroke: INK, "stroke-width": 5}, g); el("path", {d: "M250 -190 H120 Q150 0 190 190 H250 Z", fill: cc, stroke: INK, "stroke-width": 5}, g); }
    el("line", {x1: 0, y1: -190, x2: 0, y2: 190, stroke: INK, "stroke-width": 12}, g); el("line", {x1: 0, y1: -190, x2: 0, y2: 190, stroke: "#aab2c0", "stroke-width": 6}, g);
    if (rnd() < .4) { el("rect", A4({x: -200, y: 256, width: 190, height: 110, rx: 10, fill: "#cfd4dc", "stroke-width": 6}), g); el("circle", A4({cx: -105, cy: 311, r: 36, fill: "#8c93a3", "stroke-width": 5}), g); } }
  // the window we push in on
  s.win = el("g", {transform: "translate(810 480)"}, c); const w = s.win; frame(w, true);
  const cp = clip4(q => el("rect", {x: -250, y: -190, width: 500, height: 380}, q)), R = el("g", {"clip-path": cp}, w);
  el("rect", {x: -250, y: -190, width: 500, height: 380, fill: gR([[0, "#ffe2a6"], [1, "#e9a05c"]], {cx: .62, cy: .2, r: .9})}, R);
  el("path", {d: "M150 -190 V-120", stroke: INK, "stroke-width": 5}, R); el("path", A4({d: "M112 -120 H188 L204 -76 H96 Z", fill: "#fff3c4", "stroke-width": 5}), R); glow4(R, "#fff8d6", 150, .7, .1).setAttribute("transform", "translate(150 -70)");
  el("path", A4({d: "M-250 -190 H-150 Q-176 0 -206 190 H-250 Z", fill: "#e76f51", "stroke-width": 5}), R); el("path", A4({d: "M250 -190 H196 Q214 0 226 190 H250 Z", fill: "#e76f51", "stroke-width": 5}), R);
  // the pupil (front view): blue school top, dark hair, hands on the glass
  s.kid = el("g", {transform: "translate(-30 34)"}, R); const K = s.kid, SK = "#f1c27d";
  el("path", A4({d: "M-150 200 Q-150 96 -60 84 H60 Q150 96 150 200 Z", fill: "#3a86ff"}), K); el("path", A4({d: "M-30 84 L0 112 L30 84 Z", fill: "#fff", "stroke-width": 5}), K);
  el("rect", A4({x: -22, y: 60, width: 44, height: 34, fill: SK, "stroke-width": 5}), K);
  [-1, 1].forEach(sd => el("ellipse", A4({cx: sd * 92, cy: 6, rx: 15, ry: 20, fill: SK, "stroke-width": 5}), K));
  el("circle", A4({cx: 0, cy: 0, r: 92, fill: SK}), K);
  el("path", A4({d: "M-94 -6 Q-104 -104 0 -106 Q104 -104 94 -6 Q80 -46 40 -58 Q-10 -40 -56 -60 Q-84 -44 -94 -6 Z", fill: "#3d2c1e"}), K);
  [-1, 1].forEach(sd => el("circle", {cx: sd * 52, cy: 34, r: 15, fill: "#ff8fa3", opacity: .55}, K));
  s.eyes = el("g", {}, K); [-1, 1].forEach(sd => el("ellipse", {cx: sd * 34, cy: 2, rx: 19, ry: 22, fill: "#fff", stroke: INK, "stroke-width": 4.5}, s.eyes));
  s.pup = el("g", {}, s.eyes); [-1, 1].forEach(sd => { el("circle", {cx: sd * 34, cy: 2, r: 11, fill: INK}, s.pup); el("circle", {cx: sd * 34 + 4, cy: -3, r: 4, fill: "#fff"}, s.pup); });
  s.brow = el("g", {}, K); [-1, 1].forEach(sd => el("path", {d: `M${sd * 16} -30 Q${sd * 34} -40 ${sd * 54} -30`, fill: "none", stroke: INK, "stroke-width": 5.5, "stroke-linecap": "round"}, s.brow));
  s.mo0 = el("path", {d: "M-14 46 Q0 56 14 46", fill: "none", stroke: INK, "stroke-width": 5.5, "stroke-linecap": "round"}, K); s.mo1 = el("ellipse", {cx: 0, cy: 50, rx: 10, ry: 12, fill: "#7a1c1c", stroke: INK, "stroke-width": 4.5, opacity: 0}, K);
  [[-150, 150], [140, 140]].forEach(([hx, hy]) => { const h = el("g", {transform: `translate(${hx} ${hy})`}, K); [-24, -8, 8, 24].forEach((fx, i) => el("rect", A4({x: fx - 8, y: -44 - (i === 1 || i === 2 ? 8 : 0), width: 16, height: 40, rx: 8, fill: SK, "stroke-width": 4.5}), h)); el("ellipse", A4({cx: 0, cy: 0, rx: 36, ry: 30, fill: SK, "stroke-width": 5}), h); });
  // the wet glass
  el("rect", {x: -250, y: -190, width: 500, height: 380, fill: "#9bd0ff", opacity: .16}, R); s.cold = el("rect", {x: -250, y: -190, width: 500, height: 380, fill: "#bfe0ff", opacity: 0}, R);
  [[-210, -190, 60], [-110, -190, 26]].forEach(([x, y, wd]) => el("path", {d: `M${x} ${y} h${wd} l-160 380 h${-wd} Z`, fill: "#fff", opacity: .13}, R));
  seed = 5; s.small = []; for (let i = 0; i < 26; i++) { const x = -235 + rnd() * 470, y = -180 + rnd() * 360, r = 4 + rnd() * 7; const d = el("g", {transform: `translate(${x} ${y})`}, R); el("ellipse", {rx: r, ry: r * 1.25, fill: "#dff3ff", stroke: INK, "stroke-width": 2, opacity: .9}, d); el("circle", {cx: -r * .3, cy: -r * .4, r: r * .3, fill: "#fff"}, d); s.small.push({d, x, y}); }
  s.trail = el("path", {d: "", fill: "none", stroke: "#eaf6ff", "stroke-width": 9, "stroke-linecap": "round", "stroke-linejoin": "round", opacity: .55}, R);
  s.join = el("g", {}, R); el("ellipse", {rx: 11, ry: 14, fill: "#dff3ff", stroke: INK, "stroke-width": 2.5}, s.join); el("circle", {cx: -3, cy: -5, r: 3.5, fill: "#fff"}, s.join);
  s.drop = el("g", {}, R); el("path", {d: "M0 -26 C8 -12 17 -3 17 6 A17 17 0 0 1 -17 6 C-17 -3 -8 -12 0 -26 Z", fill: "#e8f6ff", stroke: INK, "stroke-width": 3.5, "stroke-linejoin": "round"}, s.drop); el("ellipse", {cx: -6, cy: 3, rx: 4, ry: 7, fill: "#fff"}, s.drop);
  el("line", {x1: 0, y1: -190, x2: 0, y2: -112, stroke: INK, "stroke-width": 0}, w);
  el("rect", {x: -250, y: -112, width: 500, height: 12, fill: "#aab2c0", stroke: INK, "stroke-width": 4}, w);                      // the bar of the top pane
  s.rain = rain4(st, 150, 21, {len: 90, sw: 5, speed: 2100, slant: -.26, col: "#cfe3ff"}); s.rain2 = rain4(st, 40, 22, {len: 150, sw: 8, speed: 2700, slant: -.26, col: "#e6f1ff"});
  s.flash = fullRect(st, "#eaf0ff", 0);
  const DX = y => 96 + 16 * Math.sin((y + 150) / 46) + (y + 150) * .09, JY = 6;
  s.run = t => { const q = shot4("rainWindow", RW4.U, t), u = q.u;
    const k = ease((u - 1.7) / 1.5), z = lerp(lerp(.5, .56, clamp(u / 1.7)), 2.05, k) + .12 * clamp((u - 3.2) / 2.8), cy = lerp(130, 486, k), cx = lerp(810, 850, k);
    tf(c, `translate(${VP[0]} ${VP[1]}) scale(${z}) translate(${-cx} ${-cy})`);
    const f1 = u - 1.0, f2 = u - 4.35, fl = x => x > 0 && x < .7 ? (x < .07 ? 1 : x < .14 ? .25 : x < .22 ? .8 : (1 - (x - .22) / .48) * .6) : 0; op(s.flash, .7 * fl(f1) + .4 * fl(f2)); op(s.bolt, f1 > 0 && f1 < .28 ? 1 : 0);
    runRain4(s.rain, t); runRain4(s.rain2, t); op(s.rain2.G, .8 - .4 * k);
    // the drop: it creeps, stops, meets another drop (they join), then runs
    const p = u < 2.5 ? 0 : u < 3.5 ? .22 * ease((u - 2.5) / 1) : u < 3.9 ? .22 : u < 4.5 ? lerp(.22, .5, ease((u - 3.9) / .6)) : lerp(.5, 1.02, Math.pow(clamp((u - 4.5) / 1.1), 1.7));
    const y0 = -150, y1 = 205, y = lerp(y0, y1, p), big = p > .5 ? 1.4 : 1; at4(s.drop, DX(y), y, big * (1 + .08 * Math.sin(t * 9)));
    let d = `M${DX(y0)} ${y0}`; for (let yy = y0; yy < y; yy += 12) d += ` L${DX(yy)} ${yy}`; d += ` L${DX(y)} ${y}`; set(s.trail, "d", d);
    const jy = lerp(y0, y1, .5); at4(s.join, DX(jy), jy + JY); op(s.join, p < .5 ? 1 : 0);
    const kx = -30, ky = 34, lx = clamp((DX(y) - kx) / 150, -1, 1), ly = clamp((y - ky) / 170, -1, 1), see = ramp(u, 2.3, 2.8); tf(s.pup, `translate(${7 * lx * see} ${8 * ly * see})`);
    const wow = on(u, 4.36, 5.1, .12); op(s.mo1, wow); op(s.mo0, 1 - wow); tf(s.brow, `translate(0 ${-7 * wow})`); op(s.cold, .5 * fl(f2)); }; return s; })();

/* ---- the reservoir under water, at the size of a molecule: liquid water = molecules close together, sliding past each other ---- */
function under4(st) { const g = el("g", {}, st); el("rect", {x: FULL.x - 800, y: FULL.y - 1400, width: FULL.w + 1600, height: FULL.h + 2200, fill: gL([[0, "#9be7ff"], [.36, "#3fb2e8"], [.62, "#1479c4"], [1, "#0a3d7a"]])}, g);
  const sh = el("g", {opacity: .16}, g); [[300, 140, 260], [700, 110, 330], [1150, 160, 300], [1500, 90, 240], [0, 100, 200]].forEach(([x, w1, w2]) => el("path", {d: `M${x} -1500 h${w1} L${x + w1 + w2} 1200 h${-w1 - w2 * 1.6} Z`, fill: "#fff"}, sh));
  g.sunG = glow4(g, "#fffbe0", 900, .85, .1); at4(g.sunG, 810, -1100);
  g.surf = el("path", {d: "M-1000 -1010 Q-800 -1040 -600 -1010 T-200 -1010 T200 -1010 T600 -1010 T1000 -1010 T1400 -1010 T1800 -1010 T2200 -1010 T2600 -1010 V-1500 H-1000 Z", fill: "#e8fbff", opacity: .85}, g);
  seed = 61; g.crowd = []; for (let i = 0; i < 54; i++) { const far = i < 30, R = far ? 15 + rnd() * 9 : 30 + rnd() * 16, m = mol4(g, far ? "plain" : "friend", R); m.x = -220 + rnd() * 2060; m.y = -420 + rnd() * 1500; m.r = rnd() * 360; m.ph = rnd() * 9; m.far = far;
    if (Math.abs(m.x - 810) < 430 && Math.abs(m.y - 500) < 330) m.x += m.x < 810 ? -430 : 430; op(m, far ? .45 : .92); g.crowd.push(m); }
  g.jig = t => g.crowd.forEach(m => at4(m, m.x + 9 * wob4(t, 2.4, m.ph), m.y + 9 * wob4(t, 2.1, m.ph * 3), 1, m.r + 14 * wob4(t, 1.7, m.ph * 5)));
  return g; }

/* ---- 1. home (outside): MacRitchie Reservoir; we dive in and zoom down to the size of a molecule; Mama and Papa wave as Mo swims up to the sunny surface ---- */
const HM4 = {U: 6.5};
S.home = (() => { const s = scene("home", "#0a3d7a", "#0a3d7a"), st = s.stage;
  s.uw = el("g", {}, st); s.u = under4(s.uw);
  s.mama = mol4(s.uw, "mama", 92); s.papa = mol4(s.uw, "papa", 92); s.me = el("g", {}, s.uw); s.gl = glow4(s.me, "#ffe14d", 190, .75, .3); s.mo = mol4(s.me, "mo", 80);
  s.tm = tag4(s.uw, "Mama", "#ff70a6", "#fff", 36, 1); s.tp = tag4(s.uw, "Papa", "#3a86ff", "#fff", 36, 1); s.ty = tag4(s.uw, "YOU", "#ffe14d", INK, 40, 1);
  // outside: the reservoir, the forest, a boardwalk
  s.out = el("g", {}, st); const o = s.out; el("rect", {x: FULL.x - 400, y: FULL.y - 300, width: FULL.w + 800, height: 800, fill: gL([[0, "#4fb3ff"], [1, "#d8f3ff"]])}, o);
  s.sun = sun4(o, 90); at4(s.sun, 1420, 130);
  [[100, 120, 300, 3], [900, 80, 380, 5]].forEach(([x, y, w, sd]) => at4(cloud4(o, sd, w, "#fff"), x, y));
  seed = 3; for (let i = 0; i < 30; i++) { const x = -200 + i * 70 + rnd() * 30, r = 70 + rnd() * 50; el("circle", {cx: x, cy: 420 - rnd() * 30, r: r + 6, fill: INK}, o); }
  seed = 3; for (let i = 0; i < 30; i++) { const x = -200 + i * 70 + rnd() * 30, r = 70 + rnd() * 50; el("circle", {cx: x, cy: 420 - rnd() * 30, r, fill: i % 3 ? "#2d9d5c" : "#40b36f"}, o); }
  el("rect", {x: FULL.x - 400, y: 440, width: FULL.w + 800, height: 800, fill: gL([[0, "#56c0f0"], [.5, "#2f8fd8"], [1, "#1766b5"]]), stroke: INK, "stroke-width": 6}, o);
  seed = 9; for (let i = 0; i < 26; i++) el("path", {d: `M${-120 + rnd() * 1850} ${480 + rnd() * 520} q24 -10 48 0 t48 0`, fill: "none", stroke: "#fff", "stroke-width": 5, "stroke-linecap": "round", opacity: .45}, o);
  const bw = el("g", {}, o); el("path", A4({d: "M-180 600 L300 560 L520 640 L900 600 L900 628 L520 668 L300 588 L-180 628 Z", fill: "#b5835a"}), bw); [[-100, 606], [100, 590], [300, 574], [410, 614], [520, 654], [710, 634]].forEach(([x, y]) => el("rect", A4({x: x - 7, y, width: 14, height: 70, fill: "#8d5b3a", "stroke-width": 4}), bw));
  const sg = el("g", {transform: "translate(1180 560)"}, o); el("rect", A4({x: -8, y: 0, width: 16, height: 120, fill: "#8d5b3a", "stroke-width": 4}), sg); el("rect", A4({x: -210, y: -70, width: 420, height: 96, rx: 14, fill: "#2a6f4f"}), sg);
  tx(sg, {x: 0, y: -26, "text-anchor": "middle", "font-size": 40, "font-weight": 700, fill: "#fff"}, "MacRitchie"); tx(sg, {x: 0, y: 12, "text-anchor": "middle", "font-size": 34, "font-weight": 700, fill: "#ffe14d"}, "Reservoir");
  s.splash = el("g", {}, st); s.bub = []; seed = 15; for (let i = 0; i < 22; i++) s.bub.push({e: el("circle", {fill: "#fff", "fill-opacity": .35, stroke: "#fff", "stroke-width": 4}, s.splash), x: rnd(), v: .6 + rnd() * .8, r: 10 + rnd() * 30, ph: rnd()});
  s.str = streaks4(st, 36, 8, "#e8fbff", 7); s.flood = fullRect(st, "#e63946", 0);
  s.card = card4(st, "You are a water molecule. Home: MacRitchie Reservoir", "#1d3557");
  s.run = t => { const q = shot4("home", HM4.U, t), u = q.u;
    // outside, then the dive
    const dv = ease((u - 1.3) / 1.0), zo = 1 + 9 * dv * dv; tf(o, `translate(810 760) scale(${zo}) translate(-810 ${-760 + 60 * clamp(u / 1.3)})`); op(o, 1 - ramp(u, 1.75, 2.25));
    s.bub.forEach(b => { const k = clamp((u - 1.55 - b.ph * .3) / 1.1); set(b.e, "cx", VP[0] + (b.x - .5) * 1700); set(b.e, "cy", 1100 - k * 1500 * b.v); set(b.e, "r", b.r); op(b.e, k > 0 && k < 1 ? 1 : 0); });
    runStreaks4(s.str, u * 1.4, {r0: 120}); op(s.str.G, on(u, 1.5, 2.5, .3));
    // under water
    s.u.jig(t); const rise = ease((u - 3.5) / 2.2), my = lerp(590, 245, rise), mx = 810 + 26 * Math.sin((u - 3.5) * 3) * (rise > 0 && rise < 1 ? 1 : 0);
    const dive = Math.pow(clamp((u - 5.75) / .75), 2.2), zu = lerp(.7, 1.22, ease((u - 1.6) / 1.2)) * (1 + 12 * dive), camY = lerp(560, 440, rise);
    tf(s.uw, `translate(${VP[0]} ${VP[1]}) scale(${zu}) translate(${-lerp(810, mx, dive)} ${-lerp(camY, my, dive)})`);
    at4(s.mama, 500 + 8 * wob4(t, 2, 1), 640 + 8 * wob4(t, 2.3, 2), 1.15, -8); at4(s.papa, 1120 + 8 * wob4(t, 2.1, 3), 650 + 8 * wob4(t, 1.9, 4), 1.15, 8);
    at4(s.me, mx + 5 * wob4(t, 2.6, 5), my + 5 * wob4(t, 2.2, 6), 1, 10 * Math.sin((u - 3.5) * 3) * (rise > 0 && rise < 1 ? 1 : 0));
    const wv = on(u, 3.0, 5.9, .3); wave4(s.mama, 1, -34 * wv * (.5 + .5 * Math.sin(t * 9))); wave4(s.papa, -1, 34 * wv * (.5 + .5 * Math.sin(t * 9 + 1)));
    face4(s.mama, wv > .5 ? 1 : 0, 0, .7, -.9 * rise); face4(s.papa, wv > .5 ? 1 : 0, 0, -.7, -.9 * rise); face4(s.mo, rise > .1 ? 1 : 0, 0, 0, -rise);
    wave4(s.mo, -1, 30 * on(u, 2.9, 3.6, .2) * (.5 + .5 * Math.sin(t * 10)));
    [[s.tm, 500, 478, 2.5], [s.tp, 1120, 488, 2.7]].forEach(([g, x, y, a]) => { at4(g, x, y, Math.max(0, pop(t, q.at(a)))); op(g, on(u, a, 5.6, .25)); });
    at4(s.ty, mx, my - 168, Math.max(0, pop(t, q.at(2.9)))); op(s.ty, on(u, 2.9, 5.7, .25)); op(s.gl, .5 + .5 * Math.sin(t * 4));
    op(s.flood, ramp(u, 6.25, 6.5)); show4(s.card, t, q, 2.3, 6.1); }; return s; })();

/* ---- 2. povEvap: at the surface the Sun's heat makes us jiggle faster and faster... POP: we break free into the air as water vapour. No bubbles: this is not boiling ---- */
const EV4 = {U: 5.5, POP: 3.4};
S.povEvap = (() => { const s = scene("povEvap", "#4aa8ff", "#4aa8ff"), st = s.stage; s.w = el("g", {}, st);
  // the air above (seen after the pop)
  s.air = el("g", {}, s.w); el("rect", {x: FULL.x - 100, y: FULL.y - 100, width: FULL.w + 200, height: FULL.h + 200, fill: gL([[0, "#2f8fe8"], [.7, "#bfe6ff"], [1, "#eaf8ff"]])}, s.air);
  s.sun = sun4(s.air, 120); at4(s.sun, 810, 170);
  s.vap = [[250, 300, 44], [1340, 240, 50], [520, 620, 36], [1150, 640, 40], [90, 700, 30], [1560, 520, 34]].map(([x, y, R], i) => { const g = mol4(s.air, "friend", R); g.x = x; g.y = y; g.i = i; return g; });
  // the water we leave behind (seen from above once we are out): it drops away below us
  s.below = el("g", {}, s.w); el("path", {d: "M-400 0 Q-300 -22 -200 0 T0 0 T200 0 T400 0 T600 0 T800 0 T1000 0 T1200 0 T1400 0 T1600 0 T1800 0 T2000 0 V1400 H-400 Z", fill: gL([[0, "#3fb2e8"], [1, "#1479c4"]]), stroke: INK, "stroke-width": 7}, s.below);
  s.rings = [0, 1, 2].map(i => el("ellipse", {cx: 810, cy: 90, fill: "none", stroke: "#fff", "stroke-width": 7}, s.below));
  seed = 14; s.left = []; for (let i = 0; i < 16; i++) { const g = mol4(s.below, "friend", 34); g.x = -100 + i * 122 + rnd() * 40; g.y = 80 + rnd() * 110; g.ph = rnd() * 9; s.left.push(g); }
  // under the surface, looking up at the Sun
  s.under = el("g", {}, s.w); el("rect", {x: FULL.x - 100, y: FULL.y - 100, width: FULL.w + 200, height: FULL.h + 200, fill: gR([[0, "#f3fdff"], [.16, "#b4ecff"], [.5, "#3fb2e8"], [1, "#1269b0"]], {cx: .5, cy: .16, r: .95})}, s.under);
  s.sunU = el("g", {}, s.under); glow4(s.sunU, "#fff7c2", 430, .95, .22); el("circle", {r: 105, fill: "#fff3a0", opacity: .9}, s.sunU);
  s.ca = [0, 1, 2, 3, 4, 5].map(i => el("path", {d: `M-300 ${40 + i * 50} q100 ${-30 - i * 4} 200 0 t200 0 t200 0 t200 0 t200 0 t200 0 t200 0 t200 0 t200 0 t200 0 t200 0`, fill: "none", stroke: "#fff", "stroke-width": 16 - i * 2, "stroke-linecap": "round", opacity: .5 - i * .06}, s.under));
  s.heat = [0, 1, 2, 3, 4, 5, 6].map(i => el("line", {x1: 810 + (i - 3) * 40, y1: 200, x2: 810 + (i - 3) * 240, y2: 900, stroke: "#ffb703", "stroke-width": 12, "stroke-linecap": "round", "stroke-dasharray": "34 44", opacity: 0}, s.under));
  s.nb = [[170, 300, 110, 0], [440, 150, 80, 1], [1210, 150, 86, 0], [1490, 330, 112, 1], [80, 650, 96, 1], [1570, 690, 100, 0], [400, 560, 64, 0], [1230, 580, 66, 1], [640, 330, 46, 0], [1000, 350, 48, 1]].map(([x, y, R, j], i) => { const g = mol4(s.under, "friend", R); g.x = x; g.y = y; g.i = i; return g; });
  s.warm = fullRect(st, "#ff9f1c", 0); s.str = streaks4(st, 40, 12, "#fff", 8); s.hands = hands4(st); s.flash = fullRect(st, "#fff", 0);
  s.lab = lab4(st, "Now you are water vapour: a gas, too spread out to see", 44, "#fff");
  s.card = card4(st, "The Sun's heat: you evaporate!", "#e85d04");
  s.run = t => { const q = shot4("povEvap", EV4.U, t), u = q.u, P = EV4.POP, heat = ramp(u, .5, P), out = ease((u - P) / .5), ph = 16 * u + 5.5 * u * u;
    const amp = (4 + 34 * heat * heat) * (1 - out) + 5 * out, jx = amp * Math.sin(ph), jy = amp * Math.cos(ph * 1.31);
    tf(s.w, `translate(${jx} ${jy})`);
    tf(s.under, `translate(0 ${out * 1500})`); op(s.under, 1 - ramp(u, P + .1, P + .45)); at4(s.sunU, 810, 150, 1 + .25 * heat);
    s.ca.forEach((e, i) => tf(e, `translate(${-100 + 80 * Math.sin(t * .8 + i * 1.3)} 0)`)); s.heat.forEach((e, i) => { op(e, .75 * heat * (1 - out)); set(e, "stroke-dashoffset", -t * 240); });
    s.nb.forEach(g => { const a = (5 + 26 * heat * heat) * (.7 + .1 * (g.i % 4)); at4(g, g.x + a * Math.sin(ph * (.8 + .05 * g.i) + g.i * 2), g.y + a * Math.cos(ph * (.9 + .04 * g.i) + g.i * 3), 1, (g.i % 2 ? 1 : -1) * (18 + 8 * Math.sin(ph * .3 + g.i))); face4(g, heat > .55 ? 2 : 0, 0, clamp((810 - g.x) / 700, -1, 1), -.4); });
    tf(s.below, `translate(0 ${lerp(-200, 700, out) + 190 * ramp(u, P + .4, EV4.U)})`); op(s.below, ramp(u, P, P + .12));
    s.rings.forEach((e, i) => { const k = clamp((u - P - i * .22) / 1.2); set(e, "rx", 60 + 380 * k); set(e, "ry", 14 + 70 * k); op(e, k > 0 ? 1 - k : 0); });
    s.left.forEach(g => { at4(g, g.x + 7 * wob4(t, 2.4, g.ph), g.y + 7 * wob4(t, 2, g.ph * 2)); face4(g, 1, 0, clamp((810 - g.x) / 600, -1, 1), -1); });
    op(s.air, ramp(u, P - .05, P + .1)); tf(s.sun.rays, `rotate(${t * 10})`);
    s.vap.forEach(g => { at4(g, g.x + 30 * wob4(t, 1.1, g.i * 2), g.y - 46 * (u - P) + 20 * wob4(t, 1.3, g.i * 5), 1, 12 * wob4(t, 1.2, g.i)); face4(g, 1); op(g, ramp(u, P + .2, P + .7)); });
    op(s.warm, .22 * heat * (1 - out)); const fk = u - P; op(s.flash, fk > -.04 && fk < .45 ? 1 - Math.abs(fk < 0 ? fk / .04 : fk / .45) : 0);
    runStreaks4(s.str, u * 2.2, {r0: 140, a: .8}); op(s.str.G, on(u, P - .05, P + .9, .25));
    runHands4(s.hands, jx * 1.5, jy * 1.5, 0, 1); at4(s.lab, VP[0], 800, Math.max(0, pop(t, q.at(P + .7)))); op(s.lab, on(u, P + .7, EV4.U, .25));
    show4(s.card, t, q, .9, EV4.U - .1); }; return s; })();

/* ---- 3. povFriends: rising over Singapore. Friends zoom up to join us: one from a spilled puddle on a kitchen floor (out through the window), one from the Kallang River ---- */
const FD4 = {U: 6.5};
function block4(p, x, y, w, h, col, dz = 60) { const g = el("g", {}, p);        // an HDB block seen from above and in front: the front and the roof
  el("path", A4({d: `M${x} ${y - h} l${dz * .7} ${-dz * .5} h${w} l${-dz * .7} ${dz * .5} Z`, fill: "#dfe3e8", "stroke-width": 5}), g); el("path", A4({d: `M${x + w} ${y - h} l${dz * .7} ${-dz * .5} v${h} l${-dz * .7} ${dz * .5} Z`, fill: "#b9a27c", "stroke-width": 5}), g);
  el("rect", A4({x, y: y - h, width: w, height: h, fill: col, "stroke-width": 5}), g); const fl = Math.floor(h / 34), n = Math.floor(w / 30);
  for (let r = 0; r < fl; r++) for (let c = 0; c < n; c++) el("rect", {x: x + 8 + c * 30, y: y - h + 10 + r * 34, width: 16, height: 18, rx: 2, fill: "#cfe8fb", stroke: INK, "stroke-width": 1.6}, g); return g; }
S.povFriends = (() => { const s = scene("povFriends", "#4aa8ff", "#4aa8ff"), st = s.stage;
  fullRect(st, gL([[0, "#2f8fe8"], [.42, "#cdeeff"], [1, "#eaf8ff"]])); s.sun = sun4(st, 80); at4(s.sun, 1500, 110);
  s.gr = el("g", {}, st); const G = s.gr; const far = el("g", {opacity: .55, transform: "translate(-100 330) scale(1.1 .8) translate(0 -705)"}, G); skyline(far, -150, 705, "#7fa3c9"); skyline(far, 900, 705, "#7fa3c9");
  el("path", {d: "M-900 330 H2500 V1500 H-900 Z", fill: gL([[0, "#a8e0b0"], [1, "#6cc487"]]), stroke: INK, "stroke-width": 5}, G);
  s.river = el("path", {d: "M1090 330 Q1010 430 1180 520 Q1500 660 1380 1500 L1900 1500 Q2000 640 1330 500 Q1150 440 1150 330 Z", fill: "#3a86ff", stroke: INK, "stroke-width": 6, "stroke-linejoin": "round"}, G);
  el("path", {d: "M1150 380 q14 30 60 60 M1330 560 q120 60 150 220 M1500 900 q40 200 0 400", fill: "none", stroke: "#fff", "stroke-width": 7, opacity: .5, "stroke-linecap": "round"}, G);
  [[200, 380, 110, 50, "#f4d6a0", 26], [420, 372, 90, 60, "#f1faee", 26], [660, 384, 120, 56, "#f6e3b4", 26], [1320, 378, 100, 52, "#f1faee", 26], [1560, 390, 130, 60, "#f4d6a0", 26],
    [-80, 480, 190, 110, "#f1faee", 40], [560, 500, 230, 120, "#f4d6a0", 40], [1620, 520, 220, 130, "#f6e3b4", 40], [880, 470, 150, 90, "#f1faee", 34],
    [640, 760, 330, 200, "#f1faee", 60], [-260, 700, 300, 170, "#f6e3b4", 56]].forEach(([x, y, w, h, col, dz]) => block4(G, x, y, w, h, col, dz));
  [[330, 470, .7], [470, 520, .8], [1010, 600, .9], [1080, 700, 1.1], [1650, 720, 1.2], [520, 880, 1.3], [1100, 900, 1.4]].forEach(([x, y, k]) => tree4(G, x, y, k));
  s.home = block4(G, 60, 1010, 470, 330, "#f4d6a0", 80); s.kw = el("rect", {x: 300, y: 760, width: 44, height: 40, rx: 4, fill: "#ffe14d", stroke: INK, "stroke-width": 5}, G);
  s.rip = [0, 1].map(i => el("ellipse", {cx: 1300, cy: 610, fill: "none", stroke: "#fff", "stroke-width": 6}, G));
  // the kitchen, in a round window
  s.ins = el("g", {}, st); const I = s.ins; s.ptr = el("path", {d: "", fill: "#fff", stroke: INK, "stroke-width": 5, "stroke-linejoin": "round"}, st); st.insertBefore(s.ptr, I);
  const cp = clip4(c => el("circle", {r: 196}, c)), K = el("g", {"clip-path": cp}, I);
  el("rect", {x: -200, y: -200, width: 400, height: 400, fill: "#ffe8c2"}, K); el("rect", {x: -200, y: 20, width: 400, height: 200, fill: "#f1e3cf"}, K);
  for (let i = -4; i < 5; i++) { el("line", {x1: i * 62 - 40, y1: 20, x2: i * 90 - 60, y2: 200, stroke: "#cdb89a", "stroke-width": 3}, K); } [70, 130].forEach(y => el("line", {x1: -200, y1: y, x2: 200, y2: y, stroke: "#cdb89a", "stroke-width": 3}, K));
  el("rect", A4({x: -200, y: -70, width: 190, height: 92, fill: "#8ecae6", "stroke-width": 5}), K); el("rect", A4({x: -200, y: -86, width: 204, height: 20, fill: "#e9ecef", "stroke-width": 5}), K);
  el("rect", A4({x: 40, y: -160, width: 150, height: 120, fill: "#7cc6f2", "stroke-width": 7}), K); el("line", {x1: 115, y1: -160, x2: 115, y2: -40, stroke: INK, "stroke-width": 5}, K); el("path", {d: "M40 -160 l-34 -14 v120 l34 14", fill: "#cfe8fb", stroke: INK, "stroke-width": 5, "stroke-linejoin": "round"}, K);
  s.pud = el("path", {d: "M-110 110 C-130 70 -40 50 10 66 C70 50 130 80 100 120 C120 160 20 170 -30 152 C-90 170 -130 150 -110 110 Z", fill: "#5aa9e6", stroke: INK, "stroke-width": 5}, K);
  el("path", A4({d: "M-150 96 l40 -26 l34 22 l-40 26 Z", fill: "#fff", "stroke-width": 4.5}), K); el("ellipse", A4({cx: -93, cy: 81, rx: 22, ry: 13, fill: "#bde0fe", "stroke-width": 4, transform: "rotate(-32 -93 81)"}), K);
  s.km = mol4(K, "friend", 22); el("circle", {r: 196, fill: "none", stroke: INK, "stroke-width": 10}, I); el("circle", {r: 196, fill: "none", stroke: "#fff", "stroke-width": 4}, I);
  s.f1 = mol4(st, "friend", 112); s.f2 = mol4(st, "friend", 112);
  s.t1 = tag4(st, "from: a puddle on a kitchen floor", "#ffe14d", INK, 40); s.t2 = tag4(st, "from: the Kallang River", "#bde0fe", INK, 40);
  s.hands = hands4(st); s.card = card4(st, "Water evaporates from puddles, rivers, everywhere!", "#1d3557");
  s.run = t => { const q = shot4("povFriends", FD4.U, t), u = q.u, rise = u / FD4.U, gs = lerp(1.32, 1.0, ease(rise)), gy = 60 * ease(rise);
    tf(G, `translate(810 ${330 + gy}) scale(${gs}) translate(-810 -330)`); const W = (x, y) => [810 + (x - 810) * gs, 330 + gy + (y - 330) * gs];
    // friend 1: the kitchen puddle
    const ik = Math.max(0, pop(t, q.at(.5), .5)) * (1 - ramp(u, 3.0, 3.4)), ic = [520, 470]; at4(I, ic[0], ic[1], ik); const [wx, wy] = W(322, 780);
    set(s.ptr, "d", ik > .3 ? `M${wx} ${wy} L${ic[0] - 60} ${ic[1] + 150 * ik} L${ic[0] + 60} ${ic[1] + 170 * ik} Z` : ""); op(s.ptr, clamp(ik * 2 - 1)); set(s.kw, "opacity", u < 3.3 ? .6 + .4 * Math.sin(t * 8) : 1);
    const k1 = clamp((u - 1.0) / .9); at4(s.km, lerp(0, 150, ease(k1)), lerp(92, -105, ease(k1)), 1, 20 * Math.sin(u * 6)); op(s.km, on(u, .9, 2.0, .1)); face4(s.km, 1);
    tf(s.pud, `translate(0 110) scale(${1 - .12 * ramp(u, .8, 3)}) translate(0 -110)`);
    const a1 = ease((u - 1.75) / 1.0), p1 = [440 + 16 * wob4(t, 1.2, 1), 360 + 14 * wob4(t, 1.4, 2)]; at4(s.f1, lerp(ic[0] + 150, p1[0], a1), lerp(ic[1] - 105, p1[1], a1), lerp(.22, 1, a1 * a1), 10 * wob4(t, 1.5, 3)); op(s.f1, ramp(u, 1.7, 1.85));
    face4(s.f1, 1, 0, .6, .2); wave4(s.f1, 1, -30 * on(u, 2.6, 4.2, .2) * (.5 + .5 * Math.sin(t * 9)));
    at4(s.t1, p1[0] + 40, p1[1] + 250, Math.max(0, pop(t, q.at(2.65)))); op(s.t1, ramp(u, 2.65, 2.8));
    // friend 2: the river
    const [rx, ry] = W(1300, 610); s.rip.forEach((e, i) => { const k = clamp((u - 3.3 - i * .25) / .9); set(e, "rx", 20 + 90 * k); set(e, "ry", 6 + 26 * k); op(e, k > 0 ? 1 - k : 0); });
    const a2 = ease((u - 3.45) / 1.0), p2 = [1220 + 16 * wob4(t, 1.3, 4), 350 + 14 * wob4(t, 1.1, 5)]; at4(s.f2, lerp(rx, p2[0], a2), lerp(ry, p2[1], a2), lerp(.1, 1, a2 * a2), 10 * wob4(t, 1.4, 6)); op(s.f2, ramp(u, 3.4, 3.55));
    face4(s.f2, 1, 0, -.6, .2); wave4(s.f2, -1, 30 * on(u, 4.4, 6, .2) * (.5 + .5 * Math.sin(t * 9)));
    at4(s.t2, p2[0], p2[1] + 250, Math.max(0, pop(t, q.at(4.4)))); op(s.t2, ramp(u, 4.4, 4.55));
    runHands4(s.hands, 8 * wob4(t, 3, 1), 8 * wob4(t, 2.6, 2), 0, 1); show4(s.card, t, q, 4.9, FD4.U - .1); }; return s; })();

/* ---- 4. povSea: a friend rises off the sea; the salt tries to follow and drops back. Only the water evaporates ---- */
const SE4 = {U: 5};
S.povSea = (() => { const s = scene("povSea", "#4aa8ff", "#4aa8ff"), st = s.stage;
  fullRect(st, gL([[0, "#2f8fe8"], [.4, "#cdeeff"]])); s.sun = sun4(st, 80); at4(s.sun, 1450, 130);
  const far = el("g", {opacity: .6, transform: "translate(-150 400) scale(.62 .5) translate(0 -705)"}, st); skyline(far, 0, 705, "#7fa3c9");
  const ship = el("g", {transform: "translate(1180 392)"}, st); el("path", A4({d: "M-130 0 H130 L110 34 H-110 Z", fill: "#e63946", "stroke-width": 4}), ship); [["#3a86ff", -100], ["#ffbe0b", -56], ["#06d6a0", -12], ["#f77f00", 32]].forEach(([c, x]) => el("rect", {x, y: -26, width: 40, height: 26, fill: c, stroke: INK, "stroke-width": 3}, ship)); el("rect", A4({x: 84, y: -46, width: 30, height: 46, fill: "#fff", "stroke-width": 3}), ship);
  el("rect", {x: FULL.x, y: 400, width: FULL.w, height: 260, fill: gL([[0, "#3fa7f0"], [1, "#1d7fd1"]]), stroke: INK, "stroke-width": 5}, st);
  seed = 6; for (let i = 0; i < 16; i++) el("path", {d: `M${-120 + rnd() * 1850} ${430 + rnd() * 150} q20 -8 40 0 t40 0`, fill: "none", stroke: "#fff", "stroke-width": 4, "stroke-linecap": "round", opacity: .5}, st);
  // the sea cut open: we can look in
  s.cut = el("path", {d: "", fill: gL([[0, "#56c0f0"], [1, "#0f5fae"]]), stroke: INK, "stroke-width": 7}, st);
  seed = 18; s.mols = []; for (let i = 0; i < 14; i++) { const g = mol4(st, i % 3 ? "friend" : "plain", 44); g.x = -110 + i * 138 + rnd() * 30; g.y = 690 + (i % 3) * 105 + rnd() * 30; g.ph = rnd() * 9; s.mols.push(g); }
  s.salts = []; for (let i = 0; i < 8; i++) { const g = salt4(st, 32); g.x = -40 + i * 245 + rnd() * 40; g.y = 740 + ((i + 1) % 3) * 100 + rnd() * 20; g.ph = rnd() * 9; s.salts.push(g); }
  s.hop = salt4(st, 38); s.hf = el("g", {}, s.hop); [-12, 12].forEach(x => el("circle", {cx: x, cy: -4, r: 5.5, fill: INK}, s.hf)); s.hm = el("path", {d: "M-11 16 Q0 7 11 16", fill: "none", stroke: INK, "stroke-width": 4.5, "stroke-linecap": "round"}, s.hop);
  s.spl = [0, 1].map(i => el("ellipse", {fill: "none", stroke: "#fff", "stroke-width": 6}, st));
  s.lsalt = tag4(st, "salt", "#f1f3f5", INK, 40); s.lsea = lab4(st, "sea water", 48, "#fff");
  s.f = mol4(st, "friend", 115); s.tag = tag4(st, "from: the sea", "#9be7ff", INK, 40);
  s.hands = hands4(st); s.card = card4(st, "Only the water evaporates. The salt stays behind!", "#0b5fa5");
  s.run = t => { const q = shot4("povSea", SE4.U, t), u = q.u; let d = "M-200 610"; for (let x = -200; x <= 1800; x += 100) d += ` Q${x + 50} ${610 + 16 * Math.sin(t * 1.6 + x * .01)} ${x + 100} 610`; set(s.cut, "d", d + " V1100 H-200 Z");
    s.mols.forEach(g => at4(g, g.x + 8 * wob4(t, 2.3, g.ph), g.y + 8 * wob4(t, 2, g.ph * 2), 1, 12 * wob4(t, 1.6, g.ph * 3))); s.salts.forEach(g => at4(g, g.x + 5 * wob4(t, 1.5, g.ph), g.y + 5 * wob4(t, 1.3, g.ph * 2), 1, 8 * wob4(t, 1.1, g.ph)));
    const a = ease((u - .9) / 1.2), p = [520 + 14 * wob4(t, 1.2, 1), 250 + 12 * wob4(t, 1.4, 2)]; at4(s.f, lerp(700, p[0], a), lerp(690, p[1], a), lerp(.4, 1, a), 10 * wob4(t, 1.3, 3)); face4(s.f, a > .2 ? 1 : 0, 0, .5, .6); wave4(s.f, 1, -30 * on(u, 2.1, 3.6, .2) * (.5 + .5 * Math.sin(t * 9)));
    at4(s.tag, p[0], p[1] + 256, Math.max(0, pop(t, q.at(2.1)))); op(s.tag, ramp(u, 2.1, 2.25));
    // the salt hops up after its friend... and falls back in (twice)
    const h1 = clamp((u - 1.0) / 1.0), h2 = clamp((u - 2.6) / .9), hy = 700 - 250 * Math.sin(h1 * Math.PI) * (h1 < 1 ? 1 : 0) - 170 * Math.sin(h2 * Math.PI) * (h2 < 1 ? 1 : 0);
    at4(s.hop, 850 + 40 * h1, hy, 1, 200 * h1 + 160 * h2); op(s.hm, u > 1.9 ? 1 : 0);
    s.spl.forEach((e, i) => { const k = clamp((u - (i ? 3.45 : 1.95)) / .7); set(e, "cx", 890); set(e, "cy", 612); set(e, "rx", 20 + 110 * k); set(e, "ry", 5 + 22 * k); op(e, k > 0 ? 1 - k : 0); });
    at4(s.lsalt, 890, 790, Math.max(0, pop(t, q.at(2.0)))); op(s.lsalt, ramp(u, 2.0, 2.15)); at4(s.lsea, 200, 580, Math.max(0, pop(t, q.at(.4))));
    runHands4(s.hands, 8 * wob4(t, 3, 1), 8 * wob4(t, 2.6, 2), 0, 1); show4(s.card, t, q, 2.4, SE4.U - .1); }; return s; })();

/* ---- 5. povCool: high up it is cold. We slow down and huddle onto a speck of dust: a tiny droplet. Then, from outside: lots of droplets make a cloud ---- */
const CO4 = {U: 5.5};
S.povCool = (() => { const s = scene("povCool", "#4aa8ff", "#27336e"), st = s.stage; s.sky = fullRect(st, "#4aa8ff");
  // outside view at the end: the cloud of droplets
  s.cl = el("g", {}, st); s.cloud = cloud4(s.cl, 44, 1500, "#fff", 8); at4(s.cloud, 810, 620);
  seed = 71; s.dots = []; for (let i = 0; i < 150; i++) { const x = 810 + (rnd() - .5) * 1350, y = 610 - rnd() * 330 * Math.cos((x - 810) / 760) + 20; s.dots.push(el("circle", {cx: x, cy: y, r: 6 + rnd() * 5, fill: "#4cc9f0", stroke: INK, "stroke-width": 2.5}, s.cl)); }
  s.w = el("g", {}, st);
  s.dust = el("g", {}, s.w); blob(s.dust, 74, "#a68a64", 31); seed = 9; for (let i = 0; i < 7; i++) el("circle", {cx: (rnd() - .5) * 80, cy: (rnd() - .5) * 70, r: 5 + rnd() * 7, fill: INK, opacity: .25}, s.dust);
  s.drop = el("g", {}, s.w); el("circle", {r: 300, fill: gR([[0, "#dff8ff", .35], [.75, "#8fdcff", .5], [1, "#4cc9f0", .75]]), stroke: "#fff", "stroke-width": 12}, s.drop); el("circle", {r: 300, fill: "none", stroke: INK, "stroke-width": 5, transform: "scale(1.022)"}, s.drop);
  el("path", {d: "M-230 -100 A250 250 0 0 1 -90 -232", fill: "none", stroke: "#fff", "stroke-width": 26, "stroke-linecap": "round", opacity: .85}, s.drop);
  seed = 33; s.fr = []; for (let i = 0; i < 8; i++) { const g = mol4(s.w, "friend", 62); g.sx = (rnd() - .5) * 2000; g.sy = (rnd() - .5) * 1100; if (Math.hypot(g.sx, g.sy) < 420) g.sx += g.sx < 0 ? -420 : 420; const an = i / 8 * Math.PI * 2 + .3; g.ex = Math.cos(an) * 150; g.ey = Math.sin(an) * 138; g.i = i; g.ph = rnd() * 9; g.an = an; s.fr.push(g); }
  s.ld = tag4(s.w, "a speck of dust", "#e9d8a6", INK, 32);
  s.th = el("g", {transform: "translate(1560 380)"}, st); el("rect", A4({x: -26, y: -230, width: 52, height: 400, rx: 26, fill: "#fff"}), s.th); el("circle", A4({cx: 0, cy: 200, r: 52, fill: "#e63946"}), s.th);
  s.lv = el("rect", {x: -13, y: 0, width: 26, height: 200, fill: "#e63946"}, s.th); for (let i = 0; i < 7; i++) el("line", {x1: 30, y1: -200 + i * 55, x2: 52, y2: -200 + i * 55, stroke: INK, "stroke-width": 5, "stroke-linecap": "round"}, s.th);
  s.tw = emo(s.th, 0, -290, 70, "☀️"); s.tc = emo(s.th, 0, 300, 70, "❄️");
  s.frost = [[-150, -60, 0], [1770, -60, 90], [1770, 1020, 180], [-150, 1020, 270]].map(([x, y, r]) => { const g = el("g", {transform: `translate(${x} ${y}) rotate(${r})`}, st); const f = el("g", {}, g);
    el("path", {d: "M0 0 H430 Q300 90 250 190 Q150 250 90 330 Q40 380 0 430 Z", fill: "#eaf6ff", opacity: .7}, f); seed = 11 + r; for (let i = 0; i < 9; i++) { const an = rnd() * 1.4 + .08, L = 110 + rnd() * 190; const x2 = Math.cos(an) * L, y2 = Math.sin(an) * L;
      el("line", {x1: 0, y1: 0, x2, y2, stroke: "#fff", "stroke-width": 7, "stroke-linecap": "round", opacity: .9}, f); [.45, .7].forEach(k => [-.6, .6].forEach(da => el("line", {x1: x2 * k, y1: y2 * k, x2: x2 * k + Math.cos(an + da) * 46, y2: y2 * k + Math.sin(an + da) * 46, stroke: "#fff", "stroke-width": 5, "stroke-linecap": "round", opacity: .9}, f))); } return f; });
  s.hands = hands4(st); s.blue = fullRect(st, "#bfe6ff", 0);
  s.l1 = lab4(st, "a tiny droplet of liquid water", 46, "#fff"); s.you = tag4(st, "YOU are in this droplet", "#ffe14d", INK, 32); s.l2 = lab4(st, "A cloud: tiny droplets, far too many to count", 46, "#fff");
  s.card = card4(st, "High up, it's cold: water vapour condenses!", "#3a0ca3");
  s.run = t => { const q = shot4("povCool", CO4.U, t), u = q.u, cold = ramp(u, .2, 2.6), hud = ease((u - 2.0) / 1.5), dr = ease((u - 3.45) / .5), outk = ease((u - 4.5) / .7);
    set(s.sky, "fill", mixH(mixH("#4aa8ff", "#3a4fa8", cold), "#6fb6f2", outk));
    const z = lerp(.62, 1.25, ease((u - .3) / 3.2)) * lerp(1, .022, outk); tf(s.w, `translate(${VP[0]} ${lerp(VP[1], 470, outk)}) scale(${z})`); op(s.w, 1 - ramp(u, 4.95, 5.15));
    const speed = 1 - .85 * cold, phase = 5 * u - 1.9 * u * u * .5;                     // the jiggle slows as it gets colder
    s.fr.forEach(g => { const a = 46 * speed + 4, x = lerp(g.sx, g.ex, hud) + a * Math.sin(phase * (2 + g.i * .13) + g.ph), y = lerp(g.sy, g.ey, hud) + a * Math.cos(phase * (1.8 + g.i * .11) + g.ph * 2);
      at4(g, x, y, lerp(1, .78, hud), lerp(40 * Math.sin(phase + g.i), 14 * Math.cos(g.an), hud)); face4(g, hud > .9 ? 0 : cold > .5 ? 2 : 1, hud > .95 ? 1 : 0); });
    at4(s.dust, 0, 0, 1, 12 * Math.sin(u * .7)); at4(s.ld, 0, 150, Math.max(0, pop(t, q.at(1.0)))); op(s.ld, on(u, 1.0, 2.4, .25));
    at4(s.drop, 0, 0, Math.max(0, pop(t, q.at(3.45), .5)) * 1.0); op(s.drop, dr);
    const k = 1 - cold * .78; set(s.lv, "y", 170 - 370 * k); set(s.lv, "height", 30 + 370 * k); op(s.th, on(u, .15, 4.5, .3)); s.frost.forEach(f => { tf(f, `scale(${.2 + 1.0 * cold})`); op(f, cold * (1 - outk)); });
    op(s.cl, outk); s.dots.forEach((d, i) => op(d, ramp(u, 4.7 + (i % 10) * .03, 4.9 + (i % 10) * .03)));
    runHands4(s.hands, 9 * speed * Math.sin(phase * 3), 9 * speed * Math.cos(phase * 2.6), hud * (1 - outk), 1 - outk); op(s.blue, .16 * dr * (1 - outk));
    at4(s.l1, VP[0], 120, Math.max(0, pop(t, q.at(3.6)))); op(s.l1, on(u, 3.6, 4.5, .2)); at4(s.you, 810, 560, Math.max(0, pop(t, q.at(5.0)))); op(s.you, ramp(u, 5.0, 5.1));
    at4(s.l2, VP[0], 150, Math.max(0, pop(t, q.at(4.9)))); op(s.l2, ramp(u, 4.9, 5.05));
    show4(s.card, t, q, .7, CO4.U - .05); }; return s; })();

/* ---- 6. povGrow: inside the cloud, in our droplet. Other droplets bump into us and join: we grow, we get heavy, we start to sink ---- */
const GR4 = {U: 4.5, B: [.9, 1.8, 2.7]};
function dropBall4(p, r) { const g = el("g", {}, p); el("circle", {r, fill: gR([[0, "#e6faff", .7], [.7, "#8fdcff", .85], [1, "#3fb6e8", .95]]), stroke: INK, "stroke-width": Math.max(3, r * .05)}, g);
  el("path", {d: `M${-r * .7} ${-r * .25} A${r * .75} ${r * .75} 0 0 1 ${-r * .25} ${-r * .7}`, fill: "none", stroke: "#fff", "stroke-width": r * .1, "stroke-linecap": "round", opacity: .9}, g); return g; }
S.povGrow = (() => { const s = scene("povGrow", "#c9d6e3", "#9fb3c8"), st = s.stage; fullRect(st, gL([[0, "#e9f1f8"], [.6, "#b9c8d8"], [1, "#7f93aa"]]));
  seed = 51; s.mist = []; for (let i = 0; i < 12; i++) { const e = glow4(st, "#fff", 260 + rnd() * 260, .75, .2); s.mist.push({e, x: rnd() * 1920 - 150, y: rnd() * 1500 - 200, v: .6 + rnd() * .8}); }
  s.bg = []; for (let i = 0; i < 22; i++) { const r = 16 + rnd() * 40, g = dropBall4(st, r); s.bg.push({g, x: rnd() * 1920 - 150, y: rnd() * 1300 - 150, v: .7 + rnd() * .6, ph: rnd() * 9}); }
  s.inc = [[-1, .2, 190], [1, -.15, 210], [-.25, -1, 230]].map(([dx, dy, r], i) => { const g = dropBall4(st, r); const m = mol4(g, "friend", r * .28); at4(m, -r * .2, r * .1); const m2 = mol4(g, "friend", r * .22); at4(m2, r * .34, -r * .18); g.dx = dx; g.dy = dy; g.r = r; g.i = i; g.ms = [m, m2]; return g; });
  // our droplet: we look out through its skin
  s.rim = el("g", {}, st); s.tint = el("circle", {r: 500, fill: gR([[0, "#bfefff", 0], [.72, "#9be3ff", .12], [1, "#4cc9f0", .5]])}, s.rim);
  s.edge = el("circle", {r: 500, fill: "none", stroke: "#f4fdff", "stroke-width": 26}, s.rim); el("circle", {r: 515, fill: "none", stroke: INK, "stroke-width": 6}, s.rim);
  el("path", {d: "M-410 -180 A450 450 0 0 1 -170 -415", fill: "none", stroke: "#fff", "stroke-width": 30, "stroke-linecap": "round", opacity: .9}, s.rim);
  s.out = el("path", {d: "", fill: "#5c6f86", opacity: .0, "fill-rule": "evenodd"}, st);
  seed = 57; s.in = []; for (let i = 0; i < 9; i++) { const g = mol4(st, "friend", 66), an = (i * 2.4 + .6) % 6.283; g.an = an; g.i = i; g.ph = rnd() * 9; s.in.push(g); }
  s.ring = el("circle", {fill: "none", stroke: "#fff", "stroke-width": 16}, st); s.str = streaks4(st, 30, 9, "#fff", 7);
  s.hands = hands4(st); s.wt = lab4(st, "heavier…", 50, "#fff"); s.card = card4(st, "Droplets join… too heavy to float!", "#3a0ca3");
  s.run = t => { const q = shot4("povGrow", GR4.U, t), u = q.u, B = GR4.B, n = B.filter(b => u >= b).length, grow = B.reduce((a, b) => a + ease((u - b) / .35), 0), sink = Math.pow(clamp((u - 3.1) / 1.4), 2), fall = sink * 900;
    const R = 610 + 60 * grow, last = B.reduce((a, b) => u >= b ? b : a, -9), bump = Math.exp(-(u - last) * 6) * Math.sin((u - last) * 34) * (u > last ? 1 : 0), wsc = 1 - .13 * grow;
    s.mist.forEach(m => at4(m.e, m.x, ((m.y - fall * m.v - 40 * u) % 1700 + 1700) % 1700 - 350)); s.bg.forEach(b => at4(b.g, VP[0] + (b.x - VP[0]) * wsc + 10 * wob4(t, 1.2, b.ph), VP[1] + ((((b.y - fall * b.v) % 1400 + 1400) % 1400 - 200) - VP[1]) * wsc, wsc));
    s.inc.forEach(g => { const b = B[g.i], k = clamp((u - (b - .8)) / .8), touch = R * .98 + g.r * .2, far = 1700, d = lerp(far, touch, ease(k)), mg = ease((u - b) / .35); const x = VP[0] + g.dx * d * (1 - mg * .5), y = VP[1] + g.dy * d * .5 * (1 - mg * .5);
      at4(g, x, y, lerp(.35, 1, k) * (1 + .4 * mg)); op(g, k > 0 ? 1 - mg : 0); g.ms.forEach(m => face4(m, 1)); });
    at4(s.rim, VP[0], VP[1] + 14 * bump, R / 500 * (1 + .03 * bump), 0);
    s.in.forEach(g => { const vis = g.i < 3 + n * 2 ? 1 : 0, rr = R * (.4 + .09 * (g.i % 3)), x = VP[0] + Math.cos(g.an) * rr * 1.5 + 9 * wob4(t, 2.2, g.ph), y = VP[1] + Math.sin(g.an) * rr * .78 + 9 * wob4(t, 2, g.ph * 2) + 14 * bump;
      const born = g.i < 3 ? -9 : B[Math.floor((g.i - 3) / 2)]; at4(g, x, y, Math.max(0, pop(t, q.at(born + .1), .4)) * vis, 14 * wob4(t, 1.4, g.ph)); face4(g, sink > .2 ? 2 : 1, 0, 0, sink > .2 ? 1 : 0); });
    const rk = clamp((u - last) / .45); set(s.ring, "cx", VP[0]); set(s.ring, "cy", VP[1]); set(s.ring, "r", R * (1 + .5 * rk)); op(s.ring, u > last ? (1 - rk) * .9 : 0);
    runStreaks4(s.str, -u * 1.5, {r0: 200, y: 300, a: .8 * sink}); op(s.str.G, sink > 0 ? 1 : 0);
    runHands4(s.hands, 10 * bump, 16 * bump + 30 * sink, .12 * grow / 3, 1);
    at4(s.wt, VP[0], 170 + 30 * sink, Math.max(0, pop(t, q.at(2.75)))); op(s.wt, ramp(u, 2.75, 2.9)); show4(s.card, t, q, .8, GR4.U - .05); }; return s; })();

/* ---- 7. povFall: we fall as a raindrop. Seen straight down: HDB rooftops rush up at us, then SPLASH on a road, next to a drain ---- */
const FA4 = {U: 5, HIT: 4.05};
S.povFall = (() => { const s = scene("povFall", "#6f8f6a", "#6f8f6a"), st = s.stage; s.town = el("g", {}, st); const T = s.town, CW = 900, CH = 700, N = 5;
  el("rect", {x: -N * CW - 600, y: -N * CH - 600, width: 2 * N * CW + 1200, height: 2 * N * CH + 1200, fill: "#79b98a"}, T);
  seed = 101; const roofs = ["#e9ecef", "#f1e3c8", "#dfe7ee", "#f4d6a0"];
  for (let j = -N; j < N; j++) for (let i = -N; i < N; i++) { const x0 = i * CW + 110, y0 = j * CH + 110, kind = Math.floor(rnd() * 4), g = el("g", {}, T);
    el("rect", {x: x0 - 20, y: y0 - 20, width: CW - 180, height: CH - 180, rx: 30, fill: (i + j) % 2 ? "#86c797" : "#7dbf8e"}, g);
    if (kind < 3) { const vert = kind === 2; [0, 1].forEach(b => { const bx = vert ? x0 + 60 + b * 330 : x0 + 20, by = vert ? y0 + 10 : y0 + 30 + b * 250, w = vert ? 150 : 560, h = vert ? 440 : 150, col = roofs[Math.floor(rnd() * 4)];
        el("rect", {x: bx + 16, y: by + 18, width: w, height: h, rx: 8, fill: INK, opacity: .25}, g); el("rect", A4({x: bx, y: by, width: w, height: h, rx: 8, fill: col, "stroke-width": 7}), g); el("rect", {x: bx + 14, y: by + 14, width: w - 28, height: h - 28, rx: 4, fill: "none", stroke: INK, "stroke-width": 3, opacity: .4}, g);
        const m = vert ? [bx + 40, by + 60, 70, 70] : [bx + 70, by + 40, 70, 70]; el("rect", A4({x: m[0], y: m[1], width: m[2], height: m[3], rx: 6, fill: "#adb5bd", "stroke-width": 5}), g); el("circle", A4({cx: vert ? bx + 75 : bx + 420, cy: vert ? by + 340 : by + 75, r: 28, fill: "#8ecae6", "stroke-width": 5}), g);
        if (rnd() < .5) for (let k = 0; k < 3; k++) el("rect", {x: vert ? bx + 30 : bx + 190 + k * 62, y: vert ? by + 160 + k * 46 : by + 46, width: vert ? 90 : 52, height: vert ? 38 : 60, fill: "#1d3557", stroke: "#8ecae6", "stroke-width": 3}, g); }); }
    else { el("rect", A4({x: x0 + 40, y: y0 + 40, width: 420, height: 250, rx: 10, fill: "#8d99ae", "stroke-width": 6}), g); for (let k = 0; k < 6; k++) el("rect", {x: x0 + 62 + k * 66, y: y0 + 56 + (k % 2) * 130, width: 44, height: 80, rx: 10, fill: ["#e63946", "#fff", "#3a86ff", "#ffbe0b", "#2a9d8f", "#fff"][k], stroke: INK, "stroke-width": 4}, g);
      el("circle", A4({cx: x0 + 590, cy: y0 + 380, r: 70, fill: "#ffd166", "stroke-width": 6}), g); el("circle", A4({cx: x0 + 590, cy: y0 + 380, r: 34, fill: "#ef476f", "stroke-width": 5}), g); }
    for (let k = 0; k < 5; k++) { const tx_ = x0 + rnd() * (CW - 240), ty = y0 + (rnd() < .5 ? -2 : CH - 232) + rnd() * 16, r = 32 + rnd() * 16; el("circle", {cx: tx_, cy: ty, r: r + 5, fill: INK}, g); el("circle", {cx: tx_, cy: ty, r, fill: "#2d9d5c"}, g); el("circle", {cx: tx_ - r * .3, cy: ty - r * .3, r: r * .4, fill: "#52b788"}, g); } }
  for (let j = -N; j <= N; j++) { el("rect", {x: -N * CW - 600, y: j * CH - 80, width: 2 * N * CW + 1200, height: 160, fill: "#5d6b82", stroke: INK, "stroke-width": 6}, T); el("line", {x1: -N * CW - 600, y1: j * CH, x2: N * CW + 600, y2: j * CH, stroke: "#fff", "stroke-width": 8, "stroke-dasharray": "60 50", opacity: .85}, T); }
  for (let i = -N; i <= N; i++) { el("rect", {x: i * CW - 80, y: -N * CH - 600, width: 160, height: 2 * N * CH + 1200, fill: "#5d6b82"}, T); el("line", {x1: i * CW - 80, y1: -N * CH - 600, x2: i * CW - 80, y2: N * CH + 600, stroke: INK, "stroke-width": 6}, T); el("line", {x1: i * CW + 80, y1: -N * CH - 600, x2: i * CW + 80, y2: N * CH + 600, stroke: INK, "stroke-width": 6}, T);
    el("line", {x1: i * CW, y1: -N * CH - 600, x2: i * CW, y2: N * CH + 600, stroke: "#fff", "stroke-width": 8, "stroke-dasharray": "60 50", opacity: .85}, T); }
  for (let j = -N; j <= N; j++) for (let i = -N; i <= N; i++) el("rect", {x: i * CW - 77, y: j * CH - 77, width: 154, height: 154, fill: "#5d6b82"}, T);
  // a canal crosses the town (it comes back in the next shot)
  el("path", {d: "M-5000 1050 H5000", stroke: INK, "stroke-width": 150, fill: "none"}, T); el("path", {d: "M-5000 1050 H5000", stroke: "#ced4da", "stroke-width": 136, fill: "none"}, T); el("path", {d: "M-5000 1050 H5000", stroke: "#3a86ff", "stroke-width": 84, fill: "none"}, T);
  // where we land: the road by the kerb, with a drain grating
  const TX = 430, TY = 26; s.spot = el("g", {transform: `translate(${TX} ${TY})`}, T);
  el("rect", {x: -260, y: 46, width: 520, height: 10, fill: "#ffd60a", stroke: INK, "stroke-width": 1.5}, s.spot); el("rect", {x: -60, y: 34, width: 120, height: 34, rx: 4, fill: "#212529", stroke: INK, "stroke-width": 2}, s.spot);
  for (let k = 0; k < 9; k++) el("rect", {x: -54 + k * 12.5, y: 38, width: 7, height: 26, rx: 2, fill: "#868e96"}, s.spot);
  seed = 27; for (let k = 0; k < 40; k++) el("circle", {cx: (rnd() - .5) * 320, cy: (rnd() - .6) * 90, r: .6 + rnd() * 1.2, fill: k % 2 ? "#4a5568" : "#7b8798"}, s.spot);
  el("path", {d: "M-70 -30 q8 -6 14 2 q-6 8 -14 -2 Z", fill: "#e9c46a", stroke: INK, "stroke-width": .8}, s.spot);
  s.wetR = el("g", {}, s.spot); s.rp = [0, 1, 2, 3].map(i => el("circle", {fill: "none", stroke: "#eaf6ff", "stroke-width": 1.6}, s.wetR)); s.film = el("path", {d: "", fill: "#9bd9ff", opacity: .75, stroke: "#eaf6ff", "stroke-width": 1}, s.wetR);
  s.mist = fullRect(st, "#c9d6e3", 0); seed = 91; s.wisps = []; for (let i = 0; i < 10; i++) s.wisps.push({e: glow4(st, "#fff", 300 + rnd() * 300, .8, .2), an: rnd() * 6.283, r: 200 + rnd() * 500});
  s.str = streaks4(st, 54, 16, "#e6f4ff", 6);
  s.mates = [[330, 250, 50], [1280, 300, 60], [500, 760, 44], [1180, 720, 52], [120, 520, 38], [1520, 560, 40], [840, 150, 34]].map(([x, y, r], i) => { const g = dropBall4(st, r); g.x = x; g.y = y; g.i = i; return g; });
  s.sp = []; seed = 44; for (let i = 0; i < 26; i++) s.sp.push({e: dropBall4(st, 14 + rnd() * 22), an: rnd() * 6.283, v: .5 + rnd() * .9});
  s.hands = hands4(st); s.flash = fullRect(st, "#eaf6ff", 0); s.card = card4(st, "You fall as rain!", "#1d3557"); s.card2 = card4(st, "SPLASH!", "#1d6fe0");
  s.run = t => { const q = shot4("povFall", FA4.U, t), u = q.u, H = FA4.HIT, k = clamp((u - .25) / (H - .25)), z = .17 * Math.pow(60, Math.pow(k, 1.55)), hit = u - H, pan = ease((u - H - .25) / .7);
    const sh = hit > 0 ? 16 * Math.exp(-hit * 5) * Math.sin(hit * 40) : 0;
    tf(T, `translate(${VP[0]} ${VP[1] + sh}) rotate(${lerp(-16, 0, Math.pow(k, .7))}) scale(${z}) translate(${-TX} ${-TY - 44 * pan})`);
    op(s.mist, 1 - ramp(u, .1, .9)); s.wisps.forEach(w => { const kk = clamp(u / 1.2), r = w.r * (1 + 5 * kk * kk); at4(w.e, VP[0] + Math.cos(w.an) * r, VP[1] + Math.sin(w.an) * r * .7, 1 + 2 * kk); op(w.e, 1 - kk); });
    runStreaks4(s.str, u * 1.7 + u * u * .3, {r0: 160, a: .75}); op(s.str.G, hit > 0 ? 0 : ramp(u, .3, .9));
    s.mates.forEach(g => { at4(g, g.x + 16 * wob4(t, 2.1, g.i), g.y + 16 * wob4(t, 1.8, g.i * 3), 1 + .2 * k); op(g, hit > 0 ? 0 : ramp(u, .3, .8)); });
    s.rp.forEach((e, i) => { const kk = clamp((hit - i * .16) / 1.0); set(e, "r", 4 + 46 * kk); op(e, kk > 0 ? 1 - kk : 0); });
    
    s.sp.forEach(p => { const kk = clamp(hit / .7), r = 60 + 900 * kk * p.v; at4(p.e, VP[0] + Math.cos(p.an) * r, VP[1] + Math.sin(p.an) * r * .8 + 300 * kk * kk, 1.6 - kk, p.an * 180 / Math.PI + 90); op(p.e, hit > 0 && kk < 1 ? 1 - kk * kk : 0); });
    op(s.flash, hit > -.03 && hit < .4 ? .95 * (1 - Math.max(0, hit) / .4) : 0);
    runHands4(s.hands, 10 * wob4(t, 9, 1) * (hit > 0 ? 0 : 1) + sh, 10 * wob4(t, 8, 2) * (hit > 0 ? 0 : 1) + sh, 0, 1);
    show4(s.card, t, q, .9, H - .15); show4(s.card2, t, q, H + .08, FA4.U); }; return s; })();

/* ---- 8. povDrain: down the drain, then out along a concrete canal, between the HDB blocks, towards the trees and the wide water of a reservoir ---- */
const DR4 = {U: 5, OUT: 1.5, END: 4.0};
S.povDrain = (() => { const s = scene("povDrain", "#10202f", "#10202f"), st = s.stage, R = 400, BY = -70, S1 = R / 300 / .12, S2 = R / 300 / 8.12, hx = VP[0], hy = VP[1] + BY * (1 - .12 / 8.12);
  const P = (x, y, near) => near ? [VP[0] + x * S1, VP[1] + y * S1] : [hx + x * S2, hy + y * S2], poly = (pts, fill) => el("path", {d: "M" + pts.map(p => p[0].toFixed(0) + " " + p[1].toFixed(0)).join(" L") + " Z", fill, stroke: INK, "stroke-width": 5, "stroke-linejoin": "round"}, s.can);
  // the open canal
  s.can = el("g", {}, st); el("rect", {x: FULL.x, y: FULL.y, width: FULL.w, height: FULL.h, fill: gL([[0, "#5fb0ee"], [.42, "#d6efff"], [1, "#d6efff"]])}, s.can);
  [[300, 200, 420, 3], [1200, 120, 520, 5]].forEach(([x, y, w, sd]) => at4(cloud4(s.can, sd, w, "#f1f5f9"), x, y));
  poly([P(-4000, -150, 1), P(-520, -150, 1), P(-520, -150, 0), P(-4000, -150, 0)], "#7dbf8e"); poly([P(4000, -150, 1), P(520, -150, 1), P(520, -150, 0), P(4000, -150, 0)], "#7dbf8e");
  poly([P(-520, -150, 1), P(-300, 210, 1), P(-300, 210, 0), P(-520, -150, 0)], "#c3cad4"); poly([P(520, -150, 1), P(300, 210, 1), P(300, 210, 0), P(520, -150, 0)], "#aab3bf");
  s.floor = poly([P(-300, 210, 1), P(300, 210, 1), P(300, 210, 0), P(-300, 210, 0)], gL([[0, "#bfe9ff"], [.25, "#3a9be8"], [1, "#1d6fe0"]]));
  s.rings = tunnelG(s.can, 14, (e, i) => { el("path", {d: "M-520 -150 L-300 210 M300 210 L520 -150", fill: "none", stroke: "#8a94a3", "stroke-width": 7, "stroke-linecap": "round"}, e);
    [-1, 1].forEach(sd => { el("rect", {x: sd * 548 - 7, y: -212, width: 14, height: 64, fill: "#2a9d8f", stroke: INK, "stroke-width": 3}, e); });
    seed = 300 + i; for (let k = 0; k < 3; k++) el("path", {d: `M${-240 + rnd() * 480} 208 h${30 + rnd() * 40}`, stroke: "#fff", "stroke-width": 7, "stroke-linecap": "round", opacity: .8}, e);
    if (i % 2 === 0) tree4(e, -760 - (i % 4) * 60, -150, 1.5); else tree4(e, 800 + (i % 3) * 70, -150, 1.4);
    if (i % 4 === 1) hdb4(e, -1500, -150, 520, 620, i % 8 === 1 ? "#f4d6a0" : "#f1faee", {sd: i, band: "#3a86ff"}); if (i % 4 === 3) hdb4(e, 1000, -150, 520, 560, i % 8 === 3 ? "#f6e3b4" : "#f1faee", {sd: i});
    if (i === 6) { el("rect", A4({x: -900, y: -330, width: 1800, height: 90, fill: "#8d99ae"}), e); el("rect", A4({x: -900, y: -372, width: 1800, height: 46, fill: "#2a9d8f"}), e); [-560, 560].forEach(x => el("rect", A4({x: x - 30, y: -240, width: 60, height: 90, fill: "#8d99ae"}), e)); }
    if (i === 10) { const l = el("g", {transform: "translate(120 196)"}, e); el("path", {d: "M-30 0 Q0 -22 30 0 Q0 22 -30 0 Z", fill: "#e9c46a", stroke: INK, "stroke-width": 4}, l); } });
  // the reservoir at the end
  s.res = el("g", {}, st); const RG = s.res; el("rect", {x: -3000, y: -2000, width: 6000, height: 2010, fill: gL([[0, "#5fb0ee"], [1, "#e6f6ff"]])}, RG);
  seed = 19; for (let i = 0; i < 44; i++) { const x = -1500 + i * 70 + rnd() * 30, r = 60 + rnd() * 50; el("circle", {cx: x, cy: -30 - rnd() * 30, r: r + 5, fill: INK}, RG); } seed = 19; for (let i = 0; i < 44; i++) { const x = -1500 + i * 70 + rnd() * 30, r = 60 + rnd() * 50; el("circle", {cx: x, cy: -30 - rnd() * 30, r, fill: i % 3 ? "#2d9d5c" : "#40b36f"}, RG); }
  el("rect", {x: -3000, y: 0, width: 6000, height: 2400, fill: gL([[0, "#7fd0f5"], [.3, "#2f8fd8"], [1, "#1766b5"]]), stroke: INK, "stroke-width": 5}, RG);
  seed = 7; for (let i = 0; i < 30; i++) el("path", {d: `M${-900 + rnd() * 1800} ${30 + rnd() * 500} q24 -10 48 0 t48 0`, fill: "none", stroke: "#fff", "stroke-width": 5, "stroke-linecap": "round", opacity: .5}, RG);
  s.sun = sun4(RG, 70); at4(s.sun, 480, -330);
  // the dark drain under the road
  s.dr = el("g", {}, st); el("rect", {x: FULL.x - 700, y: FULL.y - 700, width: FULL.w + 1400, height: FULL.h + 1400, fill: gR([[0, "#dff6ff"], [.05, "#8fcdf0"], [.2, "#2f4e6b"], [.55, "#182a3c"], [1, "#0b1622"]], {r: .78 * FULL.w / (FULL.w + 1400)})}, s.dr);
  s.tube = tunnelG(s.dr, 12, (e, i) => { el("rect", {x: -300, y: -230, width: 600, height: 460, rx: 70, fill: "none", stroke: INK, "stroke-width": i % 3 ? 20 : 34}, e); el("rect", {x: -300, y: -230, width: 600, height: 460, rx: 70, fill: "none", stroke: i % 3 ? "#6c7888" : "#9aa5b4", "stroke-width": i % 3 ? 10 : 22}, e);
    el("path", {d: "M-250 190 Q0 235 250 190", fill: "none", stroke: "#4cc9f0", "stroke-width": 16, "stroke-linecap": "round", opacity: .9}, e); });
  s.light = el("g", {}, s.dr); glow4(s.light, "#fff", 120, .95, .4);
  s.bars = [0, 1, 2, 3, 4, 5, 6].map(i => el("rect", {x: FULL.x, width: FULL.w, height: 90, fill: "#1b1f27", stroke: INK, "stroke-width": 6}, st));
  s.str = streaks4(st, 44, 23, "#dff6ff", 7); s.spray = []; seed = 29; for (let i = 0; i < 16; i++) s.spray.push({e: drop4(st, 14 + rnd() * 18, "#dff6ff"), x: rnd(), v: .6 + rnd() * .8, ph: rnd()});
  s.hands = hands4(st); s.flash = fullRect(st, "#fff", 0); s.sign = lab4(st, "a reservoir!", 60, "#ffe14d");
  s.card = card4(st, "Drains and canals carry the rain to a reservoir", "#1d6fe0");
  s.run = t => { const q = shot4("povDrain", DR4.U, t), u = q.u, O = DR4.OUT, E = DR4.END, inD = 1 - ramp(u, O - .08, O + .12), end = Math.pow(clamp((u - E + .7) / 1.7), 2.2);
    runTube4(s.tube, .5 * u + .25 * u * u, 420, 0, 0); at4(s.light, VP[0], VP[1], .4 + 14 * Math.pow(clamp(u / O), 5)); op(s.dr, inD);
    s.bars.forEach((b, i) => { const y = -200 + i * 190 - u * 2600; set(b, "y", y); op(b, u < .7 ? 1 : 0); });
    runTube4(s.rings, .42 * (u - O) + .05 * (u - O) * (u - O), R, 0, BY); op(s.can, 1);
    const rs = .012 + 2.6 * end; tf(RG, `translate(${hx} ${hy + 6}) scale(${rs})`); op(RG, ramp(u, O + .2, O + .6));
    runStreaks4(s.str, u * 1.6, {r0: 200, y: 160, a: .5}); const sway = 26 * Math.sin(u * 2.4);
    tf(s.can, `translate(${sway} ${10 * Math.sin(u * 5)})`);
    s.spray.forEach(p => { const k = ((u * p.v * 1.3 + p.ph) % 1), x = VP[0] + (p.x - .5) * 1500, y = 1040 - 260 * Math.sin(k * Math.PI); at4(p.e, x + (p.x - .5) * 300 * k, y, 1.2); op(p.e, Math.sin(k * Math.PI) * .9); });
    const fk = u - O; op(s.flash, fk > -.1 && fk < .5 ? .9 * (1 - Math.abs(fk < 0 ? fk / .1 : fk / .5)) : 0);
    runHands4(s.hands, sway * .4 + 8 * wob4(t, 8, 1), 10 * wob4(t, 7, 2), 0, 1);
    at4(s.sign, VP[0], 200, Math.max(0, pop(t, q.at(E + .2)))); op(s.sign, ramp(u, E + .2, E + .35)); show4(s.card, t, q, 1.0, DR4.U - .05); }; return s; })();

/* ---- 9. homeAgain (outside): Mo splashes back into MacRitchie, tells Mama and Papa where the journey went, and gets a hug ---- */
const HA4 = {U: 5};
S.homeAgain = (() => { const s = scene("homeAgain", "#0a3d7a", "#0a3d7a"), st = s.stage; s.uw = el("g", {}, st); s.u = under4(s.uw);
  s.bub = []; seed = 35; for (let i = 0; i < 16; i++) s.bub.push({e: el("circle", {fill: "#fff", "fill-opacity": .3, stroke: "#fff", "stroke-width": 4}, s.uw), x: rnd(), v: .5 + rnd() * .8, r: 8 + rnd() * 22, ph: rnd()});
  s.mama = mol4(s.uw, "mama", 96); s.papa = mol4(s.uw, "papa", 96); s.me = el("g", {}, s.uw); s.gl = glow4(s.me, "#ffe14d", 200, .7, .3); s.mo = mol4(s.me, "mo", 88);
  s.hearts = [[-150, -150], [0, -210], [150, -150], [-70, -260], [80, -270]].map(([x, y], i) => { const e = emo(s.uw, 0, 0, 70, i % 2 ? "💕" : "❤️"); e.hx = x; e.hy = y; e.i = i; return e; });
  s.sp = el("g", {}, s.uw); el("path", A4({d: "M-330 -90 H330 Q370 -90 370 -50 V50 Q370 90 330 90 H-60 L-110 150 L-110 90 H-330 Q-370 90 -370 50 V-50 Q-370 -90 -330 -90 Z", fill: "#fffaf0", filter: "url(#sh)"}), s.sp);
  s.ic = ["☀️", "☁️", "🌧️", "🏞️"].map((e, i) => { const g = el("g", {}, s.sp); emo(g, 0, 0, 100, e); g.x = -255 + i * 170; return g; }); s.ar = [0, 1, 2].map(i => el("path", {d: "M-16 0 H10 M2 -10 L14 0 L2 10", fill: "none", stroke: INK, "stroke-width": 7, "stroke-linecap": "round", "stroke-linejoin": "round", transform: `translate(${-170 + i * 170} 0)`}, s.sp));
  s.ty = tag4(s.uw, "YOU", "#ffe14d", INK, 40, 1);
  s.card = card4(st, "Home again! That's the water cycle.", "#06a77d");
  s.run = t => { const q = shot4("homeAgain", HA4.U, t), u = q.u; s.u.jig(t);
    const dn = ease((u - .15) / 1.5), hug = ease((u - 2.5) / .7), sq = on(u, 3.1, 4.9, .3), z = lerp(1, 1.18, ease((u - 2.4) / 2));
    tf(s.uw, `translate(${VP[0]} ${VP[1]}) scale(${z}) translate(-810 ${-lerp(380, 520, dn)})`);
    const my = lerp(-420, 520, dn) + 6 * wob4(t, 2.4, 1), mx = 810 + 40 * Math.sin(dn * 7) * (1 - dn);
    s.bub.forEach(b => { const k = clamp((u - .1 - b.ph * .5) / 1.6); set(b.e, "cx", 810 + (b.x - .5) * 420); set(b.e, "cy", lerp(-380, 480, dn) - k * 500 * b.v); set(b.e, "r", b.r); op(b.e, k > 0 && k < 1 ? 1 - k * .6 : 0); });
    at4(s.me, mx, my, 1 - .05 * sq, 0); face4(s.mo, 1, sq > .5 ? 1 : 0, 0, dn < 1 ? 1 : 0); wave4(s.mo, -1, 26 * on(u, 1.6, 2.6, .2) * Math.sin(t * 10)); wave4(s.mo, 1, -26 * on(u, 1.6, 2.6, .2) * Math.sin(t * 10 + 1));
    const px = lerp(340, 176, hug), py = lerp(700, 566, hug); at4(s.mama, 810 - px + 6 * wob4(t, 2, 2) * (1 - hug), py + 6 * wob4(t, 2.2, 3) * (1 - hug), 1, lerp(-6, 14, hug)); at4(s.papa, 810 + px + 6 * wob4(t, 2.1, 4) * (1 - hug), py + 6 * wob4(t, 1.9, 5) * (1 - hug), 1, lerp(6, -14, hug));
    face4(s.mama, 1, hug > .8 ? 1 : 0, .8, -.9); face4(s.papa, 1, hug > .8 ? 1 : 0, -.8, -.9); wave4(s.mama, 1, -40 * hug); wave4(s.papa, -1, 40 * hug);
    s.hearts.forEach(h => { const k = clamp((u - 3.0 - h.i * .14) / 1.5); at4(h, 810 + h.hx, 520 + h.hy - 70 * k, Math.max(0, pop(t, q.at(3.0 + h.i * .14)))); op(h, k > 0 ? 1 - ramp(k, .7, 1) : 0); });
    at4(s.sp, 1030, 190 + lerp(380, 520, dn) - 380, Math.max(0, pop(t, q.at(1.5), .4))); op(s.sp, on(u, 1.5, 3.2, .2)); s.ic.forEach((g, i) => at4(g, g.x, 0, Math.max(0, pop(t, q.at(1.65 + i * .3))))); s.ar.forEach((a, i) => op(a, ramp(u, 1.8 + i * .3, 1.95 + i * .3)));
    at4(s.ty, mx, my - 180, Math.max(0, pop(t, q.at(.9)))); op(s.ty, on(u, .9, 1.5, .2)); op(s.gl, .5 + .5 * Math.sin(t * 4));
    show4(s.card, t, q, 2.7, HA4.U); }; return s; })();

/* ---- clearSky: the last shot. The rain stops, the clouds slide away, the Sun comes out over Singapore (the hook's street, now bright) ---- */
S.clearSky = (() => { const s = scene("clearSky", "#7cc6f2", "#7cc6f2"), st = s.stage; s.c = city4(st);
  s.gl = [[150, 846], [700, 862], [1300, 842], [420, 880]].map(([x, y]) => { const e = emo(st, x, y, 46, "✨"); return e; });
  s.run = t => { const f = fr4("clearSky")(t); s.c.set(t, 1 - ease(f / .7), 1 - ramp(f, .05, .5), ramp(f, .5, .9));
    s.gl.forEach((e, i) => op(e, ramp(f, .6 + i * .06, .75 + i * .06) * (.6 + .4 * Math.sin(t * 6 + i * 2)))); tf(s.c.sun.rays, `rotate(${t * 10})`); }; return s; })();
