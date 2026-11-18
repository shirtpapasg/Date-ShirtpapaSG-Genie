/* TheOneApp, Explored EP09 "Mosquitoes vs mosquitoes!": the picture-only shots. Load after common.js and ep09/scenes.js.
   nightBuzz (the silent cold open) · the hero sequence, in first person: YOU are "Wolby", a male Aedes mosquito with Wolbachia
   inside. lab (outside) -> povRelease -> povFly -> povMeet -> povEggs -> fewer (outside).
   "This is you": a purple edge (Wolbachia) and your own bushy antennae and proboscis at the bottom of the picture.
   Every frame depends only on t; "u" = seconds after the scene's t0 (u runs from about -0.6). */
(() => {
const CX = VP[0], CY = VP[1];
const T0 = n => (SC[n] ? SC[n].t0 : 0), DUR = n => (SC[n] ? SC[n].t1 - SC[n].t0 : 1);
const card = (p, text, col = INK, fs = 46) => chip(p, text, col, {fs});
const showC = (c, t, a, b, y = 905, x = CX) => { tf(c, `translate(${x} ${y}) scale(${Math.max(0, pop(t, a))})`); op(c, on(t, a, b, .25)); };
const hash = (a, b) => { const x = Math.sin(a * 127.1 + b * 311.7) * 43758.5453; return x - Math.floor(x); };
const grad = (stops, x2 = 0, y2 = 1) => e9grad("linearGradient", {x1: 0, y1: 0, x2, y2}, stops);
const DAWN = [[0, "#5a6bb0"], [.38, "#f4a9a0"], [.62, "#ffe2a8"]], DAY = [[0, "#58b4ee"], [.7, "#dff4ff"]];

/* ---- "this is you": the purple edge, and your own antennae (bushy: you are a male) and proboscis poking into the picture */
function me(p) { const g = el("g", {}, p); g.vg = vignette(g, "#9d4edd", .55); g.b = el("g", {}, g);
  g.a = [-1, 1].map(s => { const a = el("g", {}, g.b), bx = CX + s * 170, by = 1070, ex = CX + s * 400, ey = 640, dx = ex - bx, dy = ey - by, L = Math.hypot(dx, dy), nx = -dy / L, ny = dx / L;
    for (let i = 1; i <= 15; i++) { const k = i / 16, x = bx + dx * k, y = by + dy * k, h = 92 * (1 - .5 * k);
      el("path", {d: `M${x + nx * h + dx / L * h * .6} ${y + ny * h + dy / L * h * .6} L${x} ${y} L${x - nx * h + dx / L * h * .6} ${y - ny * h + dy / L * h * .6}`, fill: "none", stroke: M9K, "stroke-width": 7, "stroke-linecap": "round", opacity: .92}, a); }
    el("line", {x1: bx, y1: by, x2: ex, y2: ey, stroke: M9K, "stroke-width": 17, "stroke-linecap": "round"}, a); a.o = [bx, by]; a.s = s; return a; });
  el("path", {d: `M${CX - 30} 1080 L${CX - 5} 838 Q${CX} 826 ${CX + 5} 838 L${CX + 30} 1080 Z`, fill: M9K}, g.b);
  g.run = (t, k = 1) => { tf(g.b, `translate(0 ${7 * k * Math.sin(t * 6.3)})`); g.a.forEach(a => tf(a, `rotate(${a.s * (2.5 * k * Math.sin(t * 8.7 + a.s))} ${a.o[0]} ${a.o[1]})`)); }; return g; }

/* ---- a place we fly through, drawn in true perspective from the vanishing point (CX, CY). Units: at depth z = 1, x and y are
   screen pixels from the middle; the walls are at x = -760 and 760, the floor at y = 470, the ceiling at y = -470.
   kind "corridor": an HDB common corridor (flats' doors and windows on the right, the parapet and the open air on the left).
   kind "void": the void deck (pillars on both sides, open to the grass outside). H.run(off) moves us forward by `off`. */
function hall(p, kind, sky) { const H = el("g", {}, p), W = 760, FL = 470, CE = -470, PT = 110, ZR = 16, Z0 = .2, cor = kind === "corridor";
  const P = (x, y, z) => [+(CX + x / z).toFixed(1), +(CY + y / z).toFixed(1)], Q = pts => "M" + pts.map(q => q.join(" ")).join(" L") + " Z";
  const poly = (pts, fill, o = {}) => el("path", Object.assign({d: Q(pts), fill, stroke: INK, "stroke-width": 5, "stroke-linejoin": "round"}, o), H);
  fullRect(H, grad(sky));
  if (cor) { [[-170, 330, 260], [130, 250, 230], [400, 300, 200]].forEach(([x, y, w]) => { el("rect", {x, y, width: w, height: 800, fill: "#c9a5b4", opacity: .8}, H); for (let r = 0; r < 9; r++) el("rect", {x: x + 12, y: y + 20 + r * 44, width: w - 24, height: 12, fill: "#fff", opacity: .3}, H); });
    el("circle", {cx: 330, cy: 420, r: 150, fill: "#fff3c4", filter: "url(#blur)", opacity: .9}, H); el("circle", {cx: 330, cy: 420, r: 52, fill: "#fff6d6"}, H); }
  else { el("rect", {x: -170, y: CY + 6, width: 1960, height: 600, fill: "#8fce7e"}, H); [[-60, 1.5], [330, .8], [1240, .8], [1640, 1.5]].forEach(([x, k]) => { const g = el("g", {transform: `translate(${x} ${CY + 30 + 60 * k}) scale(${k})`}, H);
      el("rect", {x: -12, y: -150, width: 24, height: 150, fill: "#8a6548", stroke: INK, "stroke-width": 5}, g); [[0, -230, 110], [-70, -170, 74], [70, -176, 78]].forEach(([cx, cy, r]) => el("circle", {cx, cy, r, fill: "#3f9a5f", stroke: INK, "stroke-width": 5}, g)); });
    [[620, 300, 190], [840, 240, 170]].forEach(([x, y, w]) => { el("rect", {x, y, width: w, height: CY + 6 - y, fill: "#bcdff2"}, H); for (let r = 0; r < 5; r++) el("rect", {x: x + 10, y: y + 16 + r * 40, width: w - 20, height: 10, fill: "#fff", opacity: .4}, H); }); }
  poly([P(-W, CE, Z0), P(W, CE, Z0), [CX, CY]], "#efe6cf"); poly([P(-W, FL, Z0), P(W, FL, Z0), [CX, CY]], cor ? "#c9c2b2" : "#d6d0c4");
  if (cor) { poly([P(W, CE, Z0), P(W, FL, Z0), [CX, CY]], "#f3ead2"); poly([P(-W, PT, Z0), P(-W, FL, Z0), [CX, CY]], "#fffaf0"); poly([P(-W, PT + 90, Z0), P(-W, PT + 170, Z0), [CX, CY]], "#f77f00", {stroke: "none"});
    const a = P(-W, CE, ZR), b = P(W, FL, ZR); el("rect", {x: a[0], y: a[1], width: b[0] - a[0], height: b[1] - a[1], fill: "#d8cdb2", stroke: INK, "stroke-width": 3}, H); }
  H.dyn = el("g", {}, H); const D = H.items = [], add = (z0, len, make) => { const g = el("g", {}, H.dyn), it = {z0, len, g}; it.upd = make(g); D.push(it); };
  const DC = ["#2a9d8f", "#8d5b3a", "#3a86ff", "#c1121f"];
  for (let k = 0; k < ZR / 4; k++) { const b = k * 4;
    [0, 2].forEach(d => add(b + d, 0, g => { const l = el("line", {stroke: INK, "stroke-width": 3, opacity: .35}, g); return z => { const a = P(-W, FL, z), c = P(W, FL, z); set(l, "x1", a[0]); set(l, "y1", a[1]); set(l, "x2", c[0]); set(l, "y2", c[1]); }; }));
    add(b + 3.2, .3, g => { const e = el("path", {fill: "#e2d8bd", stroke: INK, "stroke-width": 4, "stroke-linejoin": "round"}, g); return (z, z2) => set(e, "d", Q([P(-W, CE, z), P(W, CE, z), P(W, CE, z2), P(-W, CE, z2)])); });
    if (cor) {
      add(b + .4, 1, g => { const e = el("path", {fill: DC[k % 4], stroke: INK, "stroke-width": 5, "stroke-linejoin": "round"}, g), gl = [.2, .4, .6, .8].map(() => el("line", {stroke: INK, "stroke-width": 3, opacity: .6}, g)), pl = el("path", {fill: "#fff", stroke: INK, "stroke-width": 3, "stroke-linejoin": "round"}, g);
        return (z, z2) => { set(e, "d", Q([P(W, -250, z), P(W, -250, z2), P(W, FL, z2), P(W, FL, z)])); gl.forEach((l, i) => { const zz = 1 / lerp(1 / z, 1 / z2, (i + 1) / 5), a = P(W, -250, zz), c = P(W, FL, zz); set(l, "x1", a[0]); set(l, "y1", a[1]); set(l, "x2", c[0]); set(l, "y2", c[1]); });
          const za = 1 / lerp(1 / z2, 1 / (z2 + .5), .15), zb = 1 / lerp(1 / z2, 1 / (z2 + .5), .85); set(pl, "d", Q([P(W, -230, za), P(W, -230, zb), P(W, -150, zb), P(W, -150, za)])); }; });
      add(b + 2.1, 1.2, g => { const e = el("path", {fill: "#9bd0e8", stroke: INK, "stroke-width": 5, "stroke-linejoin": "round"}, g), gl = [.25, .5, .75].map(() => el("line", {stroke: INK, "stroke-width": 3}, g));
        return (z, z2) => { set(e, "d", Q([P(W, -220, z), P(W, -220, z2), P(W, 70, z2), P(W, 70, z)])); gl.forEach((l, i) => { const y = lerp(-220, 70, (i + 1) / 4), a = P(W, y, z), c = P(W, y, z2); set(l, "x1", a[0]); set(l, "y1", a[1]); set(l, "x2", c[0]); set(l, "y2", c[1]); }); }; });
      add(b + 3.2, .3, g => { const f = el("path", {fill: "#fbf4e2", stroke: INK, "stroke-width": 5, "stroke-linejoin": "round"}, g), sd = el("path", {fill: "#e2d8bd", stroke: INK, "stroke-width": 5, "stroke-linejoin": "round"}, g);
        return (z, z2) => { set(sd, "d", Q([P(-W + 50, CE, z), P(-W + 50, CE, z2), P(-W + 50, FL, z2), P(-W + 50, FL, z)])); set(f, "d", Q([P(-W - 130, CE, z), P(-W + 50, CE, z), P(-W + 50, FL, z), P(-W - 130, FL, z)])); }; });
      add(b + 1.3, 0, g => { const s = el("g", {}, g); m9Pot(s); return z => { const a = P(-W + 190, FL - 30, z); tf(s, `translate(${a[0]} ${a[1]}) scale(${.62 / z})`); }; }); }
    else [-1, 1].forEach(sn => [0, 2].forEach(d => add(b + d + .6, .5, g => { const f = el("path", {fill: "#fbf4e2", stroke: INK, "stroke-width": 5, "stroke-linejoin": "round"}, g), sd = el("path", {fill: "#d8cdb2", stroke: INK, "stroke-width": 5, "stroke-linejoin": "round"}, g), bd = el("path", {fill: "#f77f00"}, g);
        const x1 = sn * (W - 60), x2 = sn * (W + 190);
        return (z, z2) => { set(sd, "d", Q([P(x1, CE, z), P(x1, CE, z2), P(x1, FL, z2), P(x1, FL, z)])); set(f, "d", Q([P(x1, CE, z), P(x2, CE, z), P(x2, FL, z), P(x1, FL, z)])); set(bd, "d", Q([P(x1, 250, z), P(x2, 250, z), P(x2, 300, z), P(x1, 300, z)])); }; })));
  }
  H.P = P; H.run = off => { D.forEach(it => { const z = ((it.z0 - off + 2) % ZR + ZR) % ZR - 2, z2 = z + it.len; it.z = z; if (z2 < Z0 + .02) { op(it.g, 0); return; }
      op(it.g, clamp((ZR - 2 - z) / 3)); it.upd(Math.max(z, Z0), Math.max(z2, Z0 + .01)); });
    D.slice().sort((a, b) => b.z - a.z).forEach(it => H.dyn.appendChild(it.g)); };
  return H; }
// the swarm of other males flying with us (seen from behind)
function swarm(p, n, sd) { const g = el("g", {}, p); seed = sd; g.m = []; for (let i = 0; i < n; i++) g.m.push({e: m9Back(g), a: rnd() * 6.28, r: 130 + rnd() * 330, k: .5 + rnd() * .9, ph: rnd() * 6});
  g.run = (t, spread = 1, shrink = 1) => g.m.forEach(m => { const x = CX + Math.cos(m.a) * m.r * spread * 1.5 + 26 * Math.sin(t * 3.1 + m.ph), y = CY - 30 + Math.sin(m.a) * m.r * spread * .62 + 20 * Math.sin(t * 4.3 + m.ph * 2); tf(m.e, `translate(${x} ${y}) scale(${m.k * shrink})`); }); return g; }

/* =====================================================================================================================
   NIGHT BUZZ (cold open, 5 s, outside): night in an HDB bedroom. A mosquito's bzzzz circles a sleeping pupil's ear... SLAP! */
S.nightBuzz = (() => { const s = scene("nightBuzz", "#0d1326", "#0d1326"), N = "nightBuzz"; s.cam = el("g", {}, s.stage); const c = s.cam, HX = 778, HY = 560;
  el("rect", {x: -600, y: -500, width: 3000, height: 2000, fill: "#cfd8ee"}, c); el("rect", {x: -600, y: 800, width: 3000, height: 700, fill: "#b08a68"}, c); el("line", {x1: -600, y1: 800, x2: 2400, y2: 800, stroke: INK, "stroke-width": 6}, c);
  // the window: night outside, a block of flats with a few lit windows, the Moon
  const cp = el("clipPath", {id: "m9win"}, e9defs()); el("rect", {x: 1130, y: 60, width: 440, height: 330}, cp); const w = el("g", {"clip-path": "url(#m9win)"}, c);
  el("rect", {x: 1130, y: 60, width: 440, height: 330, fill: grad([[0, "#14213d"], [1, "#3d348b"]])}, w); s.moon = el("circle", {cx: 1250, cy: 140, r: 34, fill: "#fff3c4"}, w);
  seed = 5; el("rect", {x: 1360, y: 150, width: 260, height: 300, fill: "#243b6b", stroke: INK, "stroke-width": 5}, w); s.lit = []; for (let r = 0; r < 6; r++) for (let q = 0; q < 6; q++) s.lit.push(el("rect", {x: 1376 + q * 36, y: 168 + r * 38, width: 22, height: 22, fill: rnd() < .3 ? "#ffd166" : "#141d3d"}, w));
  el("rect", {x: 1130, y: 60, width: 440, height: 330, fill: "none", stroke: INK, "stroke-width": 22}, c); el("rect", {x: 1130, y: 60, width: 440, height: 330, fill: "none", stroke: "#fff", "stroke-width": 10}, c); el("line", {x1: 1350, y1: 60, x2: 1350, y2: 390, stroke: "#fff", "stroke-width": 8}, c);
  // the bed and the sleeping pupil (head on the left)
  el("rect", m9A({x: 470, y: 420, width: 44, height: 400, rx: 12, fill: "#9c6644"}), c); el("rect", m9A({x: 500, y: 700, width: 1300, height: 110, rx: 10, fill: "#9c6644"}), c); el("rect", m9A({x: 506, y: 628, width: 1300, height: 90, rx: 24, fill: "#f8f9fa"}), c);
  el("rect", m9A({x: 540, y: 574, width: 330, height: 84, rx: 40, fill: "#fff"}), c);
  s.kidG = el("g", {transform: "translate(1180 590) rotate(-90)"}, c); const K = s.kid = e9Kid(s.kidG); op(K.bag, 0); op(K.sh, 0); e9Pose(K, 0, 0);
  s.shut = el("g", {}, K.head); [[32, 11], [66, 9]].forEach(([x, r]) => el("path", {d: `M${x - r} -402 Q${x} -392 ${x + r} -402`, fill: "none", stroke: INK, "stroke-width": 5.5, "stroke-linecap": "round"}, s.shut));
  s.oh = el("ellipse", {cx: 52, cy: -366, rx: 10, ry: 12, fill: "#7a1c1c", stroke: INK, "stroke-width": 4, opacity: 0}, K.head);
  s.blk = el("g", {}, c); el("path", m9A({d: "M905 524 Q930 500 980 504 H1800 V716 H930 Q900 716 902 690 Z", fill: "#8ecae6"}), s.blk); el("path", {d: "M910 548 H1800", stroke: "#fff", "stroke-width": 18}, s.blk);
  s.zz = el("g", {}, c); ["z", "z", "Z"].forEach((z, i) => m9T(s.zz, 870 + i * 44, 440 - i * 50, z, 44 + i * 16, "#fff"));
  s.night = fullRect(s.stage, "#1a2466", .62); set(s.night, "style", "mix-blend-mode:multiply");
  s.trail = el("path", {fill: "none", stroke: "#fff", "stroke-width": 5, "stroke-dasharray": "3 16", "stroke-linecap": "round", opacity: .8}, c);
  s.mg = el("g", {}, c); el("circle", {r: 46, fill: "#fff", filter: "url(#blur)", opacity: .5}, s.mg); s.mz = m9Moz(s.mg, {female: true}); s.mz.fly(1); tf(s.mz, "scale(.26)");
  s.bz = m9T(c, 0, 0, "bzzzz", 54, "#ffe14d");
  s.flash = fullRect(s.stage, "#fff", 0); s.slap = el("g", {}, s.stage);
  for (let i = 0; i < 12; i++) el("path", {d: `M0 0 L${Math.cos(i * .5236 - .16) * 430} ${Math.sin(i * .5236 - .16) * 300} L${Math.cos(i * .5236 + .16) * 430} ${Math.sin(i * .5236 + .16) * 300} Z`, fill: "#ffe14d", stroke: INK, "stroke-width": 6, "stroke-linejoin": "round"}, s.slap);
  tx(s.slap, {x: 0, y: 62, "text-anchor": "middle", "font-size": 190, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 28}, "SLAP!");
  const SL = 4.3, pos = u => { const k = clamp(u / (SL - .1)), r = lerp(520, 54, Math.pow(k, .8)), a = -2.2 + 9.2 * Math.pow(k, 1.15); let x = HX + 20 + Math.cos(a) * r * 1.25, y = HY - 90 + Math.sin(a) * r * .55;
    const e = ramp(u, SL - .08, SL + .5); return [x + 1500 * e, y - 900 * e * e]; };
  s.run = t => { const u = t - T0(N), z = 1.08 + .62 * ramp(u, .4, SL) - .12 * Math.max(0, pop(u, SL, .4)), k = ramp(u, .4, SL);
    tf(c, `translate(${CX} ${CY}) scale(${z}) translate(${-lerp(960, HX + 60, k)} ${-lerp(480, HY - 40, k)})`);
    const [x, y] = pos(u), [x1, y1] = pos(u + .03); tf(s.mg, `translate(${x} ${y}) scale(${x1 < x ? -1 : 1} 1) rotate(${-8})`);
    let d = ""; for (let i = 0; i < 34; i++) { const q = pos(Math.max(0, u - i * .035)); d += (i ? "L" : "M") + q[0].toFixed(1) + " " + q[1].toFixed(1); } set(s.trail, "d", d); op(s.trail, u > 0 ? .8 : 0);
    tf(s.bz, `translate(${x + 40} ${y - 44}) rotate(${6 * Math.sin(u * 30)}) scale(${.7 + .5 * k})`); op(s.bz, on(u, .5, SL - .05, .2));
    const hit = ramp(u, SL - .16, SL), back = ramp(u, SL + .5, SL + 1.1); tf(K.armN, `translate(10 -300) rotate(${lerp(0, 152, hit) - 60 * back})`);
    const awake = u > SL ? 1 : 0; op(K.eyes, awake); op(s.shut, 1 - awake); op(K.m0, 1 - awake); op(s.oh, awake); tf(K.brow, `translate(0 ${-9 * awake})`); op(s.zz, on(u, -.6, SL - .1, .2)); tf(s.zz, `translate(0 ${-10 * Math.sin(u * 2)})`);
    tf(K.head, `rotate(${awake * 5 * Math.sin((u - SL) * 30) * (1 - ramp(u, SL, SL + .4))} 2 -330)`);
    op(s.flash, .5 * on(u, SL - .02, SL + .25, .1)); tf(s.slap, `translate(${CX + 250} 330) rotate(-8) scale(${Math.max(0, pop(u, SL, .25)) * .9})`); op(s.slap, on(u, SL, 1e9, .05)); };
  return s; })();

/* =====================================================================================================================
   LAB (5 s, outside): an NEA mosquito production facility: racks of trays where the young mosquitoes grow in water, and a cage
   of adult males. The camera goes into the cage and meets one of them: YOU. */
S.lab = (() => { const s = scene("lab", "#d8f3f0", "#d8f3f0"), N = "lab"; s.cam = el("g", {}, s.stage); const c = s.cam;
  el("rect", {x: -400, y: -300, width: 2500, height: 1100, fill: "#d8f3f0"}, c); el("rect", {x: -400, y: 800, width: 2500, height: 500, fill: "#aab7c4"}, c); el("line", {x1: -400, y1: 800, x2: 2100, y2: 800, stroke: INK, "stroke-width": 6}, c);
  [[-60, 6], [1250, 6]].forEach(([x0, sd]) => { seed = sd; el("rect", m9A({x: x0, y: 110, width: 520, height: 700, fill: "none", "stroke-width": 10, stroke: "#6c757d"}), c);
    for (let r = 0; r < 5; r++) { const y = 240 + r * 140; el("rect", {x: x0, y, width: 520, height: 12, fill: "#6c757d", stroke: INK, "stroke-width": 3}, c);
      [0, 1].forEach(q => { const x = x0 + 20 + q * 250; el("path", m9A({d: `M${x} ${y - 62} H${x + 230} L${x + 218} ${y} H${x + 12} Z`, fill: "#fff", "stroke-width": 5}), c); el("path", {d: `M${x + 7} ${y - 40} H${x + 223} L${x + 216} ${y - 5} H${x + 14} Z`, fill: "#7fd4ff"}, c);
        for (let i = 0; i < 9; i++) el("path", {d: `M${x + 24 + rnd() * 180} ${y - 36} q${6 + rnd() * 6} 8 ${rnd() * 8} 22`, fill: "none", stroke: "#8a6a4a", "stroke-width": 4, "stroke-linecap": "round"}, c); }); } });
  // the table and the cage of adult males in the middle
  el("rect", m9A({x: 560, y: 640, width: 600, height: 26, rx: 8, fill: "#8d99ae"}), c); [590, 1110].forEach(x => el("rect", m9A({x, y: 664, width: 22, height: 140, fill: "#6c757d", "stroke-width": 5}), c));
  s.cage = el("g", {}, c); el("rect", m9A({x: 690, y: 330, width: 340, height: 310, rx: 10, fill: "#f8fdff"}), s.cage);
  for (let i = 1; i < 11; i++) { el("line", {x1: 690 + i * 31, y1: 332, x2: 690 + i * 31, y2: 638, stroke: "#8d99ae", "stroke-width": 2, opacity: .6}, s.cage); el("line", {x1: 692, y1: 330 + i * 28, x2: 1028, y2: 330 + i * 28, stroke: "#8d99ae", "stroke-width": 2, opacity: .6}, s.cage); }
  seed = 9; s.in = []; for (let i = 0; i < 9; i++) { const g = el("g", {}, s.cage), m = m9Moz(g); g.x = 740 + rnd() * 240; g.y = 380 + rnd() * 200; g.f = rnd() < .5 ? -1 : 1; g.ph = rnd() * 6; if (i > 4) m.fly(1); s.in.push(g); }
  s.off = m9Officer(c); tf(s.off, "translate(1180 806) scale(.8)");
  s.w = el("g", {}, s.stage); s.glow = el("circle", {r: 330, fill: "#fff", filter: "url(#blur)", opacity: .85}, s.w); s.me = m9Moz(s.w);
  s.lb = [["bushy antennae = a male", 250, -190, 150, -70, INK], ["white stripes", -330, 210, -110, 110, INK], ["Wolbachia inside", -330, -170, -110, -16, "#7209b7"]].map(([l, x, y, ax, ay, col]) => { const g = el("g", {}, s.stage);
    g.ln = el("line", {x1: CX + x * .8, y1: 440 + y * .8, x2: CX + ax * 1.7, y2: 440 + ay * 1.7, stroke: INK, "stroke-width": 6, "stroke-linecap": "round"}, g); g.c = chip(g, l, col, {fs: 36}); g.x = CX + x * 1.25; g.y = 440 + y * 1.1; return g; });
  s.loc = card(s.stage, "📍 An NEA mosquito production facility", INK, 40); s.c = card(s.stage, "You are a male Aedes mosquito, with Wolbachia inside", "#7209b7", 42);
  s.run = t => { const u = t - T0(N), D = DUR(N), k = ramp(u, 1.5, 2.7), z = lerp(1.05, 3.4, k) + 5 * ramp(u, D - .5, D + .1);
    tf(c, `translate(${CX} ${CY}) scale(${z}) translate(${-lerp(810, 860, k)} ${-lerp(480, 485, k)})`);
    s.in.forEach(g => tf(g, `translate(${g.x + 8 * Math.sin(u * 2.3 + g.ph)} ${g.y + 6 * Math.sin(u * 3.1 + g.ph)}) scale(${.1 * g.f} .1)`));
    const a = Math.max(0, pop(u, 2.5, .5)), dive = ramp(u, D - .5, D + .1); tf(s.w, `translate(${CX - 150 * dive * 3} ${440 + 20 * dive}) scale(${1.7 * a * (1 + 3 * dive)})`); op(s.w, a > 0 ? 1 : 0);
    op(s.me.wol, ramp(u, 3.3, 3.7) * (.75 + .25 * Math.sin(u * 6)));
    s.lb.forEach((g, i) => { const tt = [2.9, 3.1, 3.4][i]; op(g, on(u, tt, D - .5, .2)); popAt(g.c, g.x, g.y, u, tt); });
    showC(s.loc, u, .3, 2.5, 905); showC(s.c, u, 2.8, D - .1, 905); };
  return s; })();

/* =====================================================================================================================
   POV RELEASE (5 s): dark inside the release device, other males around us. The lid lifts: dawn light. We fly out together
   along an HDB corridor. */
S.povRelease = (() => { const s = scene("povRelease", "#10122a", "#10122a"), N = "povRelease"; s.cam = el("g", {}, s.stage);
  s.hall = hall(s.cam, "corridor", DAWN); s.sw = swarm(s.cam, 9, 4);
  s.box = el("g", {}, s.stage); const hw = 420, hh = 250;
  el("path", {d: `M-3000 -3000 H5000 V4000 H-3000 Z M${CX - hw} ${CY - hh} V${CY + hh} H${CX + hw} V${CY - hh} Z`, fill: "#1b1e36", "fill-rule": "evenodd"}, s.box);
  el("rect", {x: CX - hw, y: CY - hh, width: 2 * hw, height: 2 * hh, fill: "none", stroke: "#3b4166", "stroke-width": 26}, s.box); el("rect", {x: CX - hw - 13, y: CY - hh - 13, width: 2 * hw + 26, height: 2 * hh + 26, fill: "none", stroke: INK, "stroke-width": 6}, s.box);
  for (let i = 0; i < 7; i++) el("line", {x1: -170, y1: 80 + i * 140, x2: 1790, y2: 80 + i * 140, stroke: "#2a2e4d", "stroke-width": 5}, s.box);
  s.lid = el("g", {}, s.box); el("rect", {x: CX - hw, y: 0, width: 2 * hw, height: 2 * hh, fill: "#2b3052", stroke: INK, "stroke-width": 6}, s.lid);
  s.slit = el("rect", {x: CX - hw, y: CY + hh - 8, width: 2 * hw, height: 10, fill: "#ffe2a8"}, s.box); s.beam = el("path", {d: `M${CX - hw} ${CY + hh} H${CX + hw} L${CX + hw + 300} 1100 H${CX - hw - 300} Z`, fill: "#ffe2a8", opacity: .12}, s.box);
  s.pals = [[250, 760, .8, 1], [1380, 700, .9, -1], [1150, 880, .7, -1], [470, 900, .6, 1]].map(([x, y, k, f]) => { const g = el("g", {}, s.box), m = m9Moz(g); g.m = m; g.x = x; g.y = y; g.k = k; g.f = f; return g; });
  s.flash = fullRect(s.stage, "#fff3c4", 0); s.me = me(s.stage);
  s.c0 = card(s.stage, "Inside the release device…", INK, 40); s.c = card(s.stage, "Released at an HDB block", "#f77f00");
  s.run = t => { const u = t - T0(N), D = DUR(N), open = ease((u - 1.1) / .6), out = ease((u - 1.75) / 1.25);
    s.hall.run(.25 + .5 * Math.max(0, u - 1.8) + .25 * Math.max(0, u - 3)); s.sw.run(t, .35 + .65 * ramp(u, 1.6, 3.4), 1.5 - .8 * ramp(u, 1.8, D));
    op(s.sw, ramp(u, 1.7, 2.1)); tf(s.box, `translate(${CX} ${CY}) scale(${1 + 9 * out * out}) translate(${-CX} ${-CY})`); op(s.box, 1 - ramp(u, 2.75, 3.0));
    tf(s.lid, `translate(0 ${CY - hh}) scale(1 ${1 - open})`); op(s.slit, on(u, -.6, 1.3, .2) * (.6 + .4 * Math.sin(u * 5))); op(s.beam, on(u, -.6, 1.2, .2));
    s.pals.forEach((g, i) => { const k = ramp(u, 1.35 + i * .12, 2.1 + i * .12); g.m.fly(ramp(u, 1.2 + i * .1, 1.4 + i * .1)); tf(g, `translate(${lerp(g.x, CX, k)} ${lerp(g.y, CY, k) - 120 * Math.sin(Math.PI * k)}) scale(${g.f * g.k * (1 - .8 * k)} ${g.k * (1 - .8 * k)})`); op(g, 1 - ramp(k, .8, 1)); });
    op(s.flash, .75 * on(u, 1.2, 1.9, .3)); s.me.run(t, ramp(u, 1.3, 2)); op(s.me.vg, .5 + .5 * ramp(u, 1.5, 2.5));
    showC(s.c0, u, .15, 1.3, 905); showC(s.c, u, 2.3, D - .1, 905); };
  return s; })();

/* =====================================================================================================================
   POV FLY (6 s): along the corridor past doors and flower pots, then down to the void deck. A pupil walks by: we fly past.
   Males don't bite. */
S.povFly = (() => { const s = scene("povFly", "#dff4ff", "#dff4ff"), N = "povFly";
  s.B = el("g", {}, s.stage); s.hb = hall(s.B, "void", DAY); s.kidG = el("g", {}, s.B); s.kid = e9Kid(s.kidG);
  s.A = el("g", {}, s.stage); s.ha = hall(s.A, "corridor", DAY.concat()); s.sw = swarm(s.A, 5, 8);
  s.me = me(s.stage); s.c0 = card(s.stage, "Off to look for a female…", INK, 40); s.c = card(s.stage, "Males don't bite! Only females do.", "#2a9d8f");
  s.no = el("g", {}, s.stage); el("circle", {r: 70, fill: "#fff", stroke: INK, "stroke-width": 7}, s.no); emo(s.no, 0, 2, 76, "🩸"); tf(m9X(s.no, 44), "translate(0 0)");
  s.run = t => { const u = t - T0(N), D = DUR(N), sw = ramp(u, 2.45, 3.05);
    s.ha.run(.6 + 2.2 * u + .5 * u * u); s.sw.run(t, 1 + .3 * u, .8 - .2 * u); op(s.sw, 1 - ramp(u, 1.2, 2));
    tf(s.A, `translate(${-500 * sw} ${-1500 * sw * sw}) rotate(${14 * sw} ${CX} ${CY})`); op(s.A, 1 - ramp(u, 2.8, 3.05));
    tf(s.B, `translate(${200 * (1 - sw)} ${900 * (1 - sw) * (1 - sw)}) rotate(${-10 * (1 - sw)} ${CX} ${CY})`);
    const v = Math.max(0, u - 2.6), off = 1.25 * v; s.hb.run(off);
    const zk = 5.4 - off, zz = Math.max(.34, zk), wx = lerp(-80, 330, ramp(zk, .5, 5.4)) + 500 * (1 - ramp(zk, .2, 1.1)), q = s.hb.P(wx, 470, zz), ph = u * 7;
    tf(s.kidG, `translate(${q[0]} ${q[1]}) scale(${-1 / zz} ${1 / zz})`); e9Pose(s.kid, 26 * Math.sin(ph)); tf(s.kid.body, `translate(0 ${-8 * Math.abs(Math.cos(ph))})`); op(s.kidG, zk > .3 ? 1 : 0);
    s.me.run(t); showC(s.c0, u, .2, 2.3, 905); showC(s.c, u, 3.5, D - .1, 905);
    tf(s.no, `translate(${CX + 560} 250) scale(${Math.max(0, pop(u, 4.0))})`); op(s.no, on(u, 4.0, D - .1, .2)); };
  return s; })();

/* =====================================================================================================================
   POV MEET (5 s): a wild female rests on the corridor wall (thin antennae). We fly up to her. */
S.povMeet = (() => { const s = scene("povMeet", "#f3ead2", "#f3ead2"), N = "povMeet"; s.cam = el("g", {}, s.stage); const c = s.cam;
  el("rect", {x: -1500, y: -1200, width: 4800, height: 3400, fill: "#f3ead2"}, c); el("rect", {x: -1500, y: 1250, width: 4800, height: 900, fill: "#c9c2b2"}, c); el("line", {x1: -1500, y1: 1250, x2: 3300, y2: 1250, stroke: INK, "stroke-width": 8}, c);
  el("rect", m9A({x: -700, y: -520, width: 560, height: 1770, fill: "#2a9d8f", "stroke-width": 8}), c); for (let i = 1; i < 6; i++) el("line", {x1: -700 + i * 93, y1: -516, x2: -700 + i * 93, y2: 1246, stroke: INK, "stroke-width": 6, opacity: .5}, c);
  el("rect", m9A({x: -60, y: -470, width: 330, height: 130, rx: 16, fill: "#fff"}), c); tx(c, {x: 105, y: -374, "text-anchor": "middle", "font-size": 82, "font-weight": 700, fill: INK}, "#07-119");
  el("rect", m9A({x: 1500, y: -300, width: 760, height: 560, fill: "#9bd0e8", "stroke-width": 8}), c); for (let i = 1; i < 6; i++) el("line", {x1: 1500, y1: -300 + i * 93, x2: 2260, y2: -300 + i * 93, stroke: INK, "stroke-width": 6}, c);
  tf(m9Pot(c), "translate(1700 1210) scale(2.3)");
  seed = 3; for (let i = 0; i < 16; i++) el("line", {x1: -100 + rnd() * 1700, y1: -200 + rnd() * 1300, x2: 0, y2: 0, stroke: "none"}, c);
  s.sh = el("ellipse", {cx: 850, cy: 640, rx: 250, ry: 40, fill: INK, opacity: .12}, c);
  s.f = m9Moz(c, {female: true}); tf(s.f, "translate(830 470) scale(1.55) rotate(-90)"); tf(s.f, "translate(830 430) scale(1.5)");
  s.ring = el("ellipse", {cx: 1070, cy: 370, rx: 110, ry: 86, fill: "none", stroke: "#f72585", "stroke-width": 9, "stroke-dasharray": "22 14"}, s.stage);
  s.l1 = chip(s.stage, "thin antennae = a female", "#f72585", {fs: 40}); s.l2 = chip(s.stage, "a wild female: no Wolbachia inside", INK, {fs: 38});
  s.heart = emo(s.stage, 0, 0, 150, "💜");
  s.me = me(s.stage); s.c = card(s.stage, "You find a wild female…", "#f72585");
  s.run = t => { const u = t - T0(N), D = DUR(N), k = ramp(u, -.4, 2.6), z = lerp(.3, 1, Math.pow(k, 1.5)), wob = 1 - ramp(u, 2.4, 3.2);
    tf(c, `translate(${CX + 40 * wob * Math.sin(u * 2.6)} ${CY + 26 * wob * Math.sin(u * 3.7)}) scale(${z}) translate(${-830} ${-400})`);
    op(s.ring, on(u, 2.7, D - .2, .2)); set(s.ring, "stroke-dashoffset", 0); popAt(s.l1, 1250, 230, u, 2.7); popAt(s.l2, 620, 700, u, 3.2);
    tf(s.heart, `translate(${CX} ${200 - 30 * ramp(u, 3.9, 4.8)}) scale(${Math.max(0, pop(u, 3.9))})`); op(s.heart, on(u, 3.9, D, .2));
    s.me.run(t, .3 + .7 * wob); showC(s.c, u, .7, D - .1, 905); };
  return s; })();

/* =====================================================================================================================
   POV EGGS (6 s): she lays her eggs at the water's edge in a flower pot plate. Days and nights pass... the eggs stay closed. */
S.povEggs = (() => { const s = scene("povEggs", "#f3ead2", "#f3ead2"), N = "povEggs", OX = CX + 520, OY = 900, SCL = 1.5, WY = OY - 105 * SCL;
  s.A = el("g", {}, s.stage); el("rect", {x: -170, y: -80, width: 1960, height: 1120, fill: "#f3ead2"}, s.A); el("rect", {x: -170, y: 700, width: 1960, height: 340, fill: "#c9c2b2"}, s.A); el("line", {x1: -170, y1: 700, x2: 1790, y2: 700, stroke: INK, "stroke-width": 6}, s.A);
  s.potG = el("g", {}, s.A); s.pot = m9Pot(s.potG);
  s.B = el("g", {}, s.stage); el("rect", {x: -170, y: -80, width: 1960, height: 1120, fill: "#f3ead2"}, s.B);
  s.sky = el("g", {}, s.B); s.tint = fullRect(s.B, "#1a2466", 0); set(s.tint, "style", "mix-blend-mode:multiply");
  s.cut = m9PlateCut(s.B); tf(s.cut, `translate(${OX} ${OY}) scale(${SCL})`);
  // the eggs: black, glued to the plate's wall right at the water line, and a few on the water's edge (cut's own units)
  s.eggs = [[-566, -128, -76], [-560, -152, -74], [-570, -110, -78], [-530, -108, 4], [-486, -107, -6], [-444, -108, 8]].map(([x, y, r]) => { const e = m9Egg(s.cut, 1.25); e.x = x; e.y = y; e.r = r; return e; });
  s.fg = el("g", {}, s.B); s.f = m9Moz(s.fg, {female: true});
  s.sun = el("g", {}, s.B); el("circle", {r: 120, fill: "#fff3a0", filter: "url(#blur)"}, s.sun); e9Sun(s.sun, 56);
  s.moon = el("g", {}, s.B); el("circle", {r: 60, fill: "#fff3c4", stroke: INK, "stroke-width": 6}, s.moon); el("circle", {cx: 24, cy: -14, r: 50, fill: "#3d4a8f"}, s.moon);
  s.day = chip(s.B, "Day 1", INK, {fs: 60, w: 280}); s.dayT = s.day.querySelector("text");
  s.lens = el("g", {}, s.B); el("circle", {r: 150, fill: "none", stroke: "#e63946", "stroke-width": 12}, s.lens);
  s.x = m9X(s.B, 70); s.nl = chip(s.B, "no larvae", "#e63946", {fs: 44}); s.wet = chip(s.B, "eggs at the water's edge", INK, {fs: 34});
  s.me = me(s.stage); s.c0 = card(s.stage, "She lays her eggs in a flower pot plate", INK, 40); s.c = card(s.stage, "…but her eggs don't hatch!", "#e63946", 50);
  s.run = t => { const u = t - T0(N), D = DUR(N), kz = ramp(u, -.4, 1.1), kB = ramp(u, .85, 1.25), EX = OX - 520 * SCL, EY = WY - 10;
    tf(s.potG, `translate(${lerp(810, 1500, kz)} ${lerp(690, 1500, kz)}) scale(${lerp(1.3, 5.5, kz)})`); op(s.A, 1 - kB); op(s.B, kB);
    // she lands on the water (mosquitoes can stand on it), lays, and leaves
    const kin = ramp(u, .9, 1.6), kout = ramp(u, 3.0, 3.6), fx = lerp(lerp(1500, EX + 230, kin), -500, kout), fy = lerp(lerp(60, WY - 178, kin), 100, kout) - 120 * Math.sin(Math.PI * kout);
    s.f.fly(1 - on(u, 1.6, 3.0, .12)); tf(s.fg, `translate(${fx} ${fy}) scale(1.45) rotate(${-6 * (1 - kin) + 12 * on(u, 1.7, 2.95, .2)})`); op(s.fg, on(u, .85, 3.65, .15));
    s.eggs.forEach((e, i) => { const tt = 1.8 + i * .2; tf(e, `translate(${e.x} ${e.y}) rotate(${e.r}) scale(${Math.max(0, pop(u, tt, .25))})`); });
    popAt(s.wet, EX + 250, WY + 150, u, 2.2); op(s.wet, on(u, 2.2, 3.3, .2));
    // days pass: the Sun and the Moon cross the sky, seven times
    const dk = clamp((u - 3.35) / 1.55), dd = dk * 7, day = Math.min(6, Math.floor(dd)), f = dd - day, isN = dk > 0 && dk < 1 && f > .5, ph = (f % .5) * 2;
    const ax = lerp(-100, 1720, ph), ay = 250 - 170 * Math.sin(Math.PI * ph); tf(s.sun, `translate(${dk >= 1 ? 1300 : ax} ${dk >= 1 ? 170 : ay})`); tf(s.moon, `translate(${ax} ${ay})`);
    op(s.sun, dk > 0 && !isN ? 1 : 0); op(s.moon, isN ? 1 : 0); op(s.tint, dk > 0 && dk < 1 ? .55 * Math.pow(Math.max(0, Math.sin(Math.PI * (f - .5) * 2)), .6) * (isN ? 1 : 0) : 0);
    s.dayT.textContent = "Day " + (day + 1); popAt(s.day, 300, 190, u, 3.3); const bump = 1 + .12 * (1 - clamp(f * 3)) * (dk > 0 && dk < 1 ? 1 : 0); tf(s.day, `translate(300 190) scale(${Math.max(0, pop(u, 3.3)) * bump})`);
    tf(s.lens, `translate(${EX + 60} ${EY - 30}) scale(${1 + .5 * (1 - ramp(u, 4.9, 5.3))})`); op(s.lens, on(u, 4.9, 1e9, .15));
    popAt(s.x, EX + 330, EY + 110, u, 5.05); popAt(s.nl, EX + 560, EY + 110, u, 5.2);
    s.me.run(t, .5); showC(s.c0, u, 1.2, 3.2, 905); showC(s.c, u, 4.75, D + .2, 905); };
  return s; })();

/* =====================================================================================================================
   FEWER (5 s, outside): the HDB block. Fewer eggs hatch, so there are fewer and fewer mosquitoes: the counter drops. */
S.fewer = (() => { const s = scene("fewer", "#58b4ee", "#dff4ff"), N = "fewer"; s.cam = el("g", {}, s.stage);
  s.est = m9Estate(s.cam, {x: 640, k: .8, trees: [[60, 1.1], [1280, 1.1]]});
  s.kidG = el("g", {}, s.cam); s.kid = e9Kid(s.kidG); op(s.kid.m0, 0); op(s.kid.m1, 1);
  seed = 21; s.mz = []; for (let i = 0; i < 20; i++) { const g = el("g", {}, s.cam), m = m9Moz(g, {female: i % 2 === 0}); m.fly(1); g.x = 120 + rnd() * 1100; g.y = 150 + rnd() * 560; g.ph = rnd() * 6; g.f = rnd() < .5 ? -1 : 1; g.o = rnd(); s.mz.push(g); }
  s.mz.sort((a, b) => a.o - b.o).forEach((g, i) => g.rank = i);
  // the counter: 20 mosquito marks; they go out one by one (a picture, not a measured number)
  s.pan = el("g", {}, s.stage); el("rect", m9A({x: -210, y: -230, width: 420, height: 460, rx: 34, fill: "#fff", filter: "url(#sh)"}), s.pan); el("rect", {x: -210, y: -230, width: 420, height: 84, rx: 34, fill: INK}, s.pan); el("rect", {x: -210, y: -180, width: 420, height: 34, fill: INK}, s.pan);
  tx(s.pan, {x: 0, y: -174, "text-anchor": "middle", "font-size": 36, "font-weight": 700, fill: "#ffe14d"}, "Aedes mosquitoes here");
  s.marks = []; for (let i = 0; i < 20; i++) { const g = el("g", {transform: `translate(${-150 + (i % 5) * 75} ${-90 + Math.floor(i / 5) * 66})`}, s.pan); tf(m9Moz(g), "scale(.17)"); s.marks.push(g); }
  s.dn = el("g", {}, s.pan); el("path", m9A({d: "M-26 -40 H26 V0 H54 L0 54 L-54 0 H-26 Z", fill: "#06d6a0"}), s.dn); s.dt = tx(s.pan, {x: -60, y: 204, "font-size": 44, "font-weight": 700, fill: INK}, "going down");
  s.c = card(s.stage, "Fewer mosquitoes, less dengue", "#06d6a0", 52); s.c.querySelector("text").setAttribute("fill", INK);
  s.run = t => { const u = t - T0(N), D = DUR(N), left = 20 - 16 * clamp((u - .9) / 2.5);
    tf(s.cam, `translate(${CX} ${CY}) scale(${1.1 - .08 * ramp(u, -.6, 4)}) translate(${-CX} ${-CY})`);
    s.mz.forEach(g => { const a = clamp(left - g.rank); tf(g, `translate(${g.x + 30 * Math.sin(u * 2 + g.ph)} ${g.y + 22 * Math.sin(u * 2.7 + g.ph * 2)}) scale(${.2 * g.f * (.6 + .4 * a)} ${.2 * (.6 + .4 * a)})`); op(g, a); });
    s.marks.forEach((g, i) => op(g, .13 + .87 * clamp(left - i)));
    tf(s.pan, `translate(${CX + 610} 380) scale(${Math.max(0, pop(u, .2))})`); tf(s.dn, `translate(-120 190) scale(${.8 + .12 * Math.sin(u * 6)})`); op(s.dn, ramp(u, .9, 1.2)); op(s.dt, ramp(u, .9, 1.2));
    const ph = u * 7, kx = lerp(-260, 560, clamp((u + .6) / (D + .8))); tf(s.kidG, `translate(${kx} 915) scale(.5)`); e9Pose(s.kid, 26 * Math.sin(ph)); tf(s.kid.body, `translate(0 ${-8 * Math.abs(Math.cos(ph))})`);
    showC(s.c, u, 2.9, D + .3, 905, CX - 200); };
  return s; })();
})();
