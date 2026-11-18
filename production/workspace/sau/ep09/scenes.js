/* TheOneApp, Explored EP09 "Mosquitoes vs mosquitoes!" (P3 life cycles; P6 how people affect the environment).
   This file: the drawings every EP09 scene shares (the Aedes mosquito, its egg, larva and pupa, an HDB block, an HDB corridor,
   a flower pot on its plate, the NEA officer, the release device, the pupil) and the narrated scenes. The picture-only shots
   are in ep09/pov.js. Load after common.js. scenes.js is built from this file by ep09/build.sh.
   Rule 9 (true to the science): Aedes are black with white stripes on the legs and body; males have bushy (feathery) antennae and
   do not bite; females have thin antennae and bite (they need blood to make eggs); egg, larva and pupa live in water (the larva
   hangs under the surface and breathes through a tube; Aedes eggs are black and sit at the water line); eggs from a Wolbachia
   male and a wild female (no Wolbachia) do not hatch. Rule 10: one kind of label per row. */

/* ---- copied from ep08/scenes.src.js (renamed e8 -> e9) ---- */
const e9o = {stroke: INK, "stroke-width": 6, "stroke-linejoin": "round", "stroke-linecap": "round"};
const e9A = (a, b) => Object.assign({}, e9o, a, b || {});
const e9defs = () => $("v").querySelector("defs");
let e9uid = 0;
function e9grad(kind, attrs, stops) { const id = "e9g" + (++e9uid); const g = el(kind, Object.assign({id}, attrs), e9defs());
  stops.forEach(([o, c, a]) => el("stop", {offset: o, "stop-color": c, "stop-opacity": a === undefined ? 1 : a}, g)); return `url(#${id})`; }
const e9FR = name => { const c = SC[name]; return c ? (tt => clamp((tt - c.t0) / Math.max(.1, c.t1 - c.t0))) : (() => 0); };
const e9q = (a, c, b, k) => [(1 - k) * (1 - k) * a[0] + 2 * (1 - k) * k * c[0] + k * k * b[0], (1 - k) * (1 - k) * a[1] + 2 * (1 - k) * k * c[1] + k * k * b[1]];

/* ---- saltwater crocodile, side view, facing right; the feet stand on y = 0; about 900 long. C.upper = the upper jaw (turn it
   about (165, -5) to open the mouth), C.lid = the closed eyelid, C.glow = a spot of energy in the belly. */
function e9Croc(p) { const C = el("g", {}, p), g = el("g", {transform: "translate(0 -74)"}, C), G = "#6f8f45", D = "#55723a", B = "#e6dea8";
  const leg = (x, far) => { const l = el("g", {}, g); el("path", e9A({d: `M${x - 26} 18 Q${x - 36} 52 ${x - 56} 58 L${x - 60} 74 H${x + 20} Q${x + 28} 50 ${x + 28} 18 Z`, fill: far ? D : G}), l);
    [-52, -34, -16].forEach(dx => el("path", {d: `M${x + dx} 74 l-7 -11 h14 Z`, fill: "#fff", stroke: INK, "stroke-width": 3, "stroke-linejoin": "round"}, l)); return l; };
  leg(-150, 1); leg(70, 1);
  el("path", e9A({d: "M-470 14 Q-330 -18 -170 -50 Q0 -82 150 -54 L165 44 Q0 66 -160 44 Q-320 34 -470 14 Z", fill: G}), g);
  el("path", {d: "M-440 17 Q-320 33 -160 43 Q0 64 163 43 L161 20 Q0 38 -160 20 Q-320 12 -440 17 Z", fill: B}, g);
  for (let i = 0; i < 13; i++) { const k = (i + .5) / 13, q = i < 6 ? e9q([-470, 14], [-330, -18], [-170, -50], (i + .6) / 6) : e9q([-170, -50], [0, -82], [150, -54], (i - 5.6) / 7.6);
    el("path", {d: `M${q[0] - 17} ${q[1] + 5} L${q[0] - 2} ${q[1] - 17} L${q[0] + 17} ${q[1] + 3} Z`, fill: D, stroke: INK, "stroke-width": 5, "stroke-linejoin": "round"}, g); }
  [[-250, 2], [-190, -16], [-110, -24], [-40, -30], [40, -32], [110, -24], [-150, 4], [-60, 0], [20, -2], [-320, 12]].forEach(([x, y]) => el("ellipse", {cx: x, cy: y, rx: 15, ry: 8, fill: D, opacity: .75}, g));
  C.glow = el("g", {opacity: 0}, g); el("circle", {cx: -20, cy: 0, r: 90, fill: "#ffe14d", filter: "url(#blur)"}, C.glow); el("circle", {cx: -20, cy: 0, r: 30, fill: "#fff3a0", stroke: INK, "stroke-width": 5}, C.glow);
  leg(-110, 0); leg(110, 0);
  // lower jaw with its teeth, then the upper jaw
  el("path", e9A({d: "M150 6 L410 20 Q424 30 408 40 L165 46 Z", fill: B}), g);
  for (let i = 0; i < 9; i++) { const x = 236 + i * 19; el("path", {d: `M${x} ${12 + i * 1} l6 -15 l7 15 Z`, fill: "#fff", stroke: INK, "stroke-width": 2.5, "stroke-linejoin": "round"}, g); }
  C.upper = el("g", {}, g);
  for (let i = 0; i < 10; i++) { const x = 226 + i * 19; el("path", {d: `M${x} ${5 - i * .4} l6 16 l7 -16 Z`, fill: "#fff", stroke: INK, "stroke-width": 2.5, "stroke-linejoin": "round"}, C.upper); }
  el("path", e9A({d: "M150 -54 Q185 -90 224 -68 Q262 -42 340 -38 Q378 -52 402 -42 Q426 -28 414 -2 Q300 4 160 12 Z", fill: G}), C.upper);
  el("ellipse", {cx: 398, cy: -33, rx: 8, ry: 5, fill: INK}, C.upper);
  el("circle", e9A({cx: 204, cy: -62, r: 17, fill: "#ffd23f", "stroke-width": 5}), C.upper); el("ellipse", {cx: 206, cy: -62, rx: 4.5, ry: 12, fill: INK}, C.upper);
  C.lid = el("g", {opacity: 0}, C.upper); el("circle", e9A({cx: 204, cy: -62, r: 17, fill: D, "stroke-width": 5}), C.lid); el("path", {d: "M190 -58 Q204 -50 218 -58", fill: "none", stroke: INK, "stroke-width": 4, "stroke-linecap": "round"}, C.lid);
  C.jaw = a => tf(C.upper, `rotate(${-a} 165 -5)`);
  return C; }

/* ---- giant mudskipper, side view, facing right, belly on y = 0; about 290 long. Bulging eyes on top of the head, and
   pectoral fins it props itself up on like arms (M.arm turns about (40, 14)). */
function e9Skipper(p) { const M = el("g", {}, p), g = el("g", {transform: "translate(0 -52)"}, M), B = "#9c8660", L = "#eadfc0", F = "#c2955a";
  el("path", e9A({d: "M-118 4 L-172 -28 Q-156 4 -172 36 Z", fill: F}), g);
  el("path", e9A({d: "M-92 -8 Q-70 -36 -30 -27 L-36 -17 Z", fill: F, "stroke-width": 5}), g);
  el("path", e9A({d: "M-22 -26 Q-22 -82 22 -72 Q36 -52 42 -32 Z", fill: F}), g);
  [[-6, -52], [8, -60], [18, -46], [2, -40]].forEach(([x, y]) => el("circle", {cx: x, cy: y, r: 3.5, fill: "#8fd3e8"}, g));
  el("path", e9A({d: "M-120 4 Q-60 -22 20 -32 Q78 -40 104 -18 Q122 4 104 26 Q60 38 0 31 Q-60 24 -120 4 Z", fill: B}), g);
  el("path", {d: "M-104 7 Q-40 24 20 28 Q70 32 104 23 Q60 18 0 14 Q-50 11 -104 7 Z", fill: L}, g);
  el("path", {d: "M-100 0 Q-30 -13 56 -15", fill: "none", stroke: "#5b4a34", "stroke-width": 7, "stroke-linecap": "round"}, g);
  [[-70, -8], [-44, 4], [-16, -22], [10, 0], [34, -24], [-88, 2], [60, 2]].forEach(([x, y]) => el("circle", {cx: x, cy: y, r: 3.2, fill: "#8fd3e8"}, g));
  el("path", {d: "M50 -8 Q43 8 52 22", fill: "none", stroke: INK, "stroke-width": 4, "stroke-linecap": "round"}, g);
  el("path", {d: "M113 8 Q94 19 70 13", fill: "none", stroke: INK, "stroke-width": 5, "stroke-linecap": "round"}, g);
  el("circle", e9A({cx: 58, cy: -42, r: 15, fill: "#86724f", "stroke-width": 5}), g); el("circle", {cx: 60, cy: -44, r: 8, fill: "#fff"}, g); el("circle", {cx: 62, cy: -44, r: 4.5, fill: INK}, g);
  el("circle", e9A({cx: 82, cy: -40, r: 19, fill: B, "stroke-width": 5}), g); el("circle", {cx: 86, cy: -43, r: 11.5, fill: "#fff", stroke: INK, "stroke-width": 2.5}, g); el("circle", {cx: 89, cy: -43, r: 6, fill: INK}, g); el("circle", {cx: 91, cy: -46, r: 2, fill: "#fff"}, g);
  M.arm = el("g", {transform: "translate(40 14)"}, g);
  el("path", e9A({d: "M-12 -6 Q16 2 26 26 L34 40 L10 46 L-4 38 Q-10 18 -24 6 Z", fill: F, "stroke-width": 5}), M.arm);
  [[6, 14, 14, 40], [14, 12, 26, 38], [-2, 16, 2, 38]].forEach(([a, b, c, d]) => el("line", {x1: a, y1: b, x2: c, y2: d, stroke: INK, "stroke-width": 2.5, "stroke-linecap": "round"}, M.arm));
  return M; }

/* ---- mangrove (sesarmid) crab, seen from the front, feet on y = 0; about 330 wide with its legs. K.cl = [left claw, right claw]. */
function e9Crab(p) { const K = el("g", {}, p), S = "#7a5646", R = "#e2553a";
  [-1, 1].forEach(s => { for (let i = 0; i < 4; i++) { const d = `M${s * 60} ${-40 + i * 5} L${s * (104 + i * 13)} ${-78 + i * 15} L${s * (122 + i * 15)} -2`;
    el("path", {d, fill: "none", stroke: INK, "stroke-width": 19, "stroke-linecap": "round", "stroke-linejoin": "round"}, K); el("path", {d, fill: "none", stroke: i % 2 ? "#8c6553" : S, "stroke-width": 9, "stroke-linecap": "round", "stroke-linejoin": "round"}, K); } });
  [-1, 1].forEach(s => { el("line", {x1: s * 50, y1: -88, x2: s * 56, y2: -112, stroke: INK, "stroke-width": 9, "stroke-linecap": "round"}, K);
    el("circle", {cx: s * 57, cy: -116, r: 11, fill: INK}, K); el("circle", {cx: s * 57 + 3, cy: -119, r: 3.5, fill: "#fff"}, K); });
  el("path", e9A({d: "M-80 -92 H80 L68 -26 Q0 -10 -68 -26 Z", fill: S}), K);
  el("path", {d: "M-70 -84 H70 L66 -66 H-66 Z", fill: "#94705c"}, K);
  el("path", {d: "M-30 -62 Q0 -50 30 -62 M-20 -76 V-58 M20 -76 V-58", fill: "none", stroke: INK, "stroke-width": 4, "stroke-linecap": "round", opacity: .6}, K);
  el("rect", {x: -18, y: -42, width: 36, height: 14, rx: 5, fill: "#4a3329", stroke: INK, "stroke-width": 3}, K);
  K.cl = [-1, 1].map(s => { const c = el("g", {transform: `translate(${s * 66} -40) scale(${s} 1)`}, K), a = el("g", {}, c);
    el("path", e9A({d: "M-6 -10 L30 -4 L30 16 L-6 12 Z", fill: "#b8432f", "stroke-width": 5}), a);
    el("path", e9A({d: "M22 -24 Q62 -38 88 -10 L56 0 L88 12 Q62 36 22 22 Z", fill: R, "stroke-width": 5}), a);
    el("path", {d: "M70 -22 Q82 -18 86 -11 L72 -7 Z M70 22 Q82 18 86 12 L72 8 Z", fill: "#ffd9c2"}, a); c.a = a; return c; });
  K.claws = up => K.cl.forEach(c => tf(c.a, `rotate(${-up})`));
  return K; }

/* ---- a mangrove (Rhizophora) leaf: thick, glossy, oval with a small point; the stalk is on the left; about 170 long */
function e9Leaf(p, col = "#3f9a5f", rib = "#2a6e41") { const g = el("g", {}, p);
  el("path", {d: "M-96 0 L-64 0", stroke: INK, "stroke-width": 13, "stroke-linecap": "round"}, g); el("path", {d: "M-96 0 L-64 0", stroke: rib, "stroke-width": 6, "stroke-linecap": "round"}, g);
  el("path", e9A({d: "M-70 0 Q-30 -48 30 -36 Q64 -24 84 0 Q64 24 30 36 Q-30 48 -70 0 Z", fill: col}), g);
  el("path", {d: "M-50 -8 Q-10 -34 36 -24", fill: "none", stroke: "#fff", "stroke-width": 7, "stroke-linecap": "round", opacity: .35}, g);
  el("path", {d: "M-66 0 H74 M-30 0 L-14 -24 M-30 0 L-14 24 M6 0 L22 -22 M6 0 L22 22 M40 0 L52 -14 M40 0 L52 14", fill: "none", stroke: rib, "stroke-width": 4, "stroke-linecap": "round"}, g);
  return g; }
function e9Sun(p, r = 70) { const g = el("g", {}, p); g.rays = el("g", {}, g);
  for (let i = 0; i < 12; i++) el("path", e9A({d: `M${-r * .2} ${-r * 1.12} L0 ${-r * 1.55} L${r * .2} ${-r * 1.12} Z`, fill: "#ffb703", "stroke-width": 5, transform: `rotate(${i * 30})`}), g.rays);
  el("circle", e9A({r, fill: "#ffd23f"}), g); el("path", {d: `M${-r * .55} ${-r * .3} Q${-r * .3} ${-r * .68} ${r * .1} ${-r * .66}`, fill: "none", stroke: "#fff", "stroke-width": r * .12, "stroke-linecap": "round", opacity: .6}, g); return g; }
// an energy arrow, 150 long, pointing right, centred on (0, 0); g.a is the shape to colour
function e9Arrow(p, sc = .6) { const g = el("g", {}, p); g.a = el("path", {d: "M-70 -14 H30 V-36 L80 0 L30 36 V14 H-70 Z", fill: "#cfd3dc", stroke: INK, "stroke-width": 6 / sc * .8, "stroke-linejoin": "round", transform: `scale(${sc})`}, g); return g; }

/* ---- a mangrove tree with arching prop roots; the mud is at y = 0 under the trunk; about 620 wide and 680 tall */
function e9Mangrove(p, sd = 5) { const g = el("g", {}, p); seed = sd;
  [[-300, 96], [290, 104], [-232, 156], [216, 172], [-154, 232], [142, 250], [-84, 292], [72, 300]].forEach(([x, h]) => { const d = `M${x * .06} ${-h} Q${x * .96} ${-h * .96} ${x} 8`;
    el("path", {d, fill: "none", stroke: INK, "stroke-width": 25, "stroke-linecap": "round"}, g); el("path", {d, fill: "none", stroke: "#8a6548", "stroke-width": 13, "stroke-linecap": "round"}, g); });
  el("path", e9A({d: "M-24 -170 Q-14 -330 -32 -480 H36 Q18 -330 26 -170 Z", fill: "#8a6548"}), g);
  const C = ["#2f7d4f", "#3f9a5f", "#27693f"];
  [[-170, -470, 160, 104], [170, -480, 165, 108], [-60, -400, 130, 84], [100, -410, 135, 84], [0, -570, 200, 122]].forEach(([x, y, rx, ry], i) => el("ellipse", e9A({cx: x, cy: y, rx, ry, fill: C[i % 3]}), g));
  for (let i = 0; i < 22; i++) { const x = -260 + rnd() * 520, y = -640 + rnd() * 300, a = rnd() * 180; el("path", {d: "M-16 0 Q0 -10 16 0 Q0 10 -16 0 Z", fill: "#5cb878", opacity: .8, transform: `translate(${x} ${y}) rotate(${a})`}, g); }
  return g; }
// a wooden boardwalk seen from the side: the deck's top is at y, from x0 to x1; k scales the timber
function e9Boardwalk(p, x0, x1, y, k = 1, legH = 150) { const g = el("g", {}, p), W = "#b98a5e", D = "#8a6240", sw = Math.max(2.5, 5 * k);
  for (let x = x0 + 40 * k; x < x1; x += 170 * k) el("rect", {x: x - 9 * k, y, width: 18 * k, height: legH * k, fill: D, stroke: INK, "stroke-width": sw}, g);
  for (let x = x0 + 40 * k; x < x1; x += 170 * k) el("rect", {x: x - 7 * k, y: y - 118 * k, width: 14 * k, height: 118 * k, fill: W, stroke: INK, "stroke-width": sw}, g);
  el("rect", {x: x0, y: y - 126 * k, width: x1 - x0, height: 16 * k, rx: 6 * k, fill: W, stroke: INK, "stroke-width": sw}, g);
  el("rect", {x: x0, y: y - 66 * k, width: x1 - x0, height: 10 * k, fill: W, stroke: INK, "stroke-width": sw * .8}, g);
  el("rect", {x: x0, y, width: x1 - x0, height: 26 * k, fill: W, stroke: INK, "stroke-width": sw}, g);
  for (let x = x0 + 30 * k; x < x1; x += 46 * k) el("line", {x1: x, y1: y + 3, x2: x, y2: y + 23 * k, stroke: D, "stroke-width": 2.5 * k + 1}, g);
  return g; }

/* ---- the wetland, full screen: sky, the far line of mangroves, murky water, and (o.bank) a mudbank in front with a mangrove.
   o.dawn = dawn colours; o.board = the boardwalk in the distance on the left. The horizon is at y = 430. */
function e9Swamp(p, o = {}) { const g = el("g", {}, p), dawn = o.dawn;
  fullRect(g, e9grad("linearGradient", {x1: 0, y1: 0, x2: 0, y2: 1}, dawn ? [[0, "#4b5a94"], [.2, "#b98aa8"], [.36, "#f6a878"], [.46, "#ffe2a8"]] : [[0, "#58b4ee"], [.46, "#dff4ff"]]));
  if (dawn) { el("circle", {cx: 330, cy: 420, r: 150, fill: "#fff3c4", filter: "url(#blur)", opacity: .9}, g); el("circle", {cx: 330, cy: 428, r: 56, fill: "#fff6d6"}, g); }
  seed = 31; let d = "M-170 440"; for (let x = -170; x <= 1800; x += 56) { const h = 54 + rnd() * 64; d += ` Q${x + 14} ${430 - h - 14} ${x + 28} ${430 - h} T${x + 56} ${430 - h + 16 * rnd()}`; } d += " L1800 440 Z";
  const far = dawn ? "#465a70" : "#3c8a5e";
  el("rect", {x: -170, y: 430, width: 1960, height: 610, fill: e9grad("linearGradient", {x1: 0, y1: 0, x2: 0, y2: 1}, dawn ? [[0, "#f3c79a"], [.25, "#a99aa6"], [1, "#55667c"]] : [[0, "#b9d8b8"], [.3, "#8fb89a"], [1, "#55806c"]])}, g);
  el("path", {d, fill: far, opacity: .28, transform: "translate(0 868) scale(1 -1)"}, g);
  el("path", {d, fill: far, stroke: INK, "stroke-width": 4, "stroke-linejoin": "round"}, g);
  for (let x = -150; x < 1790; x += 44) el("line", {x1: x, y1: 432, x2: x + (rnd() - .5) * 10, y2: 432 + 10 + rnd() * 12, stroke: INK, "stroke-width": 2.5, opacity: .5}, g);     // stilt roots at the water's edge
  seed = 12; for (let i = 0; i < 26; i++) { const y = 470 + rnd() * 540, x = -150 + rnd() * 1900, w = 40 + (y - 430) * .28; el("line", {x1: x, y1: y, x2: x + w, y2: y, stroke: "#fff", "stroke-width": 3 + (y - 430) / 150, "stroke-linecap": "round", opacity: dawn ? .3 : .28}, g); }
  if (o.board) { g.board = e9Boardwalk(g, -170, 700, 520, .5, 110); }
  if (o.bank !== false) { const b = g.bank = el("g", {}, g);
    g.tree = e9Mangrove(b, 5); tf(g.tree, "translate(1540 800) scale(1.18)");
    el("path", e9A({d: "M300 1060 Q360 815 640 772 Q900 742 1250 764 Q1560 784 1800 760 L1800 1060 Z", fill: "#8b6f58"}), b);
    el("path", {d: "M420 880 Q520 800 700 786 Q900 766 1200 780", fill: "none", stroke: "#a98b70", "stroke-width": 10, "stroke-linecap": "round", opacity: .8}, b);
    [[560, 900, 70, 14], [1180, 880, 90, 16], [820, 960, 120, 18], [1480, 930, 80, 14]].forEach(([x, y, rx, ry]) => el("ellipse", {cx: x, cy: y, rx, ry, fill: "#75593f", opacity: .7}, b));
    seed = 77; for (let i = 0; i < 16; i++) { const x = 480 + rnd() * 1250, y = 800 + rnd() * 150, h = 26 + rnd() * 34; if (x > 520 && x < 1340 && y < 850) continue;
      el("path", {d: `M${x - 6} ${y} L${x - 2} ${y - h} L${x + 3} ${y - h} L${x + 7} ${y} Z`, fill: "#5b4636", stroke: INK, "stroke-width": 3, "stroke-linejoin": "round"}, b); } }      // pencil roots
  return g; }
function e9Mist(p, n = 5, sd = 3) { const g = el("g", {}, p); seed = sd; g.m = [];
  for (let i = 0; i < n; i++) g.m.push({e: el("ellipse", {rx: 420 + rnd() * 260, ry: 34 + rnd() * 26, fill: "#fff", filter: "url(#blur)", opacity: .5}, g), x: -100 + rnd() * 1800, y: 450 + rnd() * 260, v: 8 + rnd() * 14});
  g.run = u => g.m.forEach(m => { set(m.e, "cx", m.x + m.v * u); set(m.e, "cy", m.y); }); return g; }

// the pupil (copied from ep02/coldopen.js krKid): side view, facing right, feet at (0, 0)
function e9Kid(p) { const K = el("g", {}, p), SKIN = "#f1c27d", BLUE = "#3a86ff", NAVY = "#1d3557", HAIR = "#3d2c1e", o = {stroke: INK, "stroke-width": 6, "stroke-linejoin": "round", "stroke-linecap": "round"};
  const A = (a, b) => Object.assign({}, o, a, b || {});
  K.sh = el("ellipse", {cx: 6, cy: 2, rx: 92, ry: 15, fill: INK, opacity: .22}, K);
  K.body = el("g", {}, K);
  const leg = far => { const g = el("g", {}, K.body);
    el("rect", A({x: -17, y: -6, width: 34, height: 96, rx: 15, fill: far ? "#dba968" : SKIN}), g);
    el("rect", A({x: -17, y: 62, width: 34, height: 34, rx: 6, fill: "#fff"}), g);                               // sock
    el("path", A({d: "M-20 92 H24 Q44 94 44 110 Q44 120 34 120 H-20 Z", fill: far ? "#2b2b45" : "#33334f"}), g); return g; };       // school shoe
  K.bag = el("g", {}, K.body);
  el("rect", A({x: -104, y: -316, width: 78, height: 150, rx: 22, fill: "#e63946"}), K.bag); el("rect", A({x: -98, y: -238, width: 50, height: 56, rx: 12, fill: "#ff7b54", "stroke-width": 5}), K.bag);
  el("path", A({d: "M-84 -316 Q-66 -340 -46 -318", fill: "none", "stroke-width": 7}), K.bag);
  K.armF = el("g", {}, K.body); el("rect", A({x: -13, y: 36, width: 26, height: 70, rx: 13, fill: "#dba968"}), K.armF); el("rect", A({x: -17, y: -8, width: 34, height: 58, rx: 15, fill: "#2f6fd6"}), K.armF);
  K.legF = leg(1); K.legN = leg(0);
  K.torso = el("g", {}, K.body);
  el("path", A({d: "M-50 -186 H50 L54 -112 H4 L0 -136 L-4 -112 H-54 Z", fill: NAVY}), K.torso);                                   // shorts
  el("rect", A({x: -54, y: -326, width: 108, height: 152, rx: 30, fill: BLUE}), K.torso);                                          // school shirt
  el("rect", A({x: 6, y: -278, width: 34, height: 34, rx: 6, fill: "#fff", "stroke-width": 4}), K.torso);                          // pocket (no badge: no real school)
  el("path", A({d: "M-30 -326 Q-14 -252 -50 -212", fill: "none", stroke: INK, "stroke-width": 18}), K.torso); el("path", {d: "M-30 -326 Q-14 -252 -50 -212", fill: "none", stroke: "#c1121f", "stroke-width": 9, "stroke-linecap": "round"}, K.torso);   // bag strap
  K.head = el("g", {}, K.body);
  el("rect", A({x: -15, y: -340, width: 34, height: 30, fill: SKIN, "stroke-width": 5}), K.head);
  el("path", A({d: "M-26 -324 L4 -300 L34 -324 L22 -336 H-14 Z", fill: "#fff", "stroke-width": 5}), K.head);                       // collar
  el("circle", A({cx: 6, cy: -402, r: 80, fill: SKIN}), K.head);
  el("path", A({d: "M-72 -372 Q-92 -486 0 -488 Q84 -490 88 -420 Q60 -446 22 -448 Q-4 -444 -14 -412 Q-22 -384 -40 -352 Q-66 -352 -72 -372 Z", fill: HAIR}), K.head);   // hair: fringe and the back of the head
  el("path", A({d: "M-8 -487 Q0 -506 16 -500", fill: "none", stroke: HAIR, "stroke-width": 9}), K.head); el("path", {d: "M-8 -487 Q0 -506 16 -500", fill: "none", stroke: HAIR, "stroke-width": 6, "stroke-linecap": "round"}, K.head);
  el("ellipse", A({cx: -18, cy: -394, rx: 13, ry: 17, fill: SKIN, "stroke-width": 5}), K.head);                                     // ear
  el("circle", {cx: 26, cy: -370, r: 15, fill: "#ff8fa3", opacity: .6}, K.head);                                                    // cheek
  K.eyes = el("g", {}, K.head);
  [[32, 11, 15], [66, 9, 14]].forEach(([x, rx, ry]) => { el("ellipse", {cx: x, cy: -404, rx, ry, fill: INK}, K.eyes); el("circle", {cx: x + 3, cy: -410, r: 4.4, fill: "#fff"}, K.eyes); });
  K.brow = el("g", {}, K.head); [[20, 44], [58, 76]].forEach(([a, b]) => el("path", {d: `M${a} -430 Q${(a + b) / 2} -437 ${b} -431`, fill: "none", stroke: INK, "stroke-width": 5, "stroke-linecap": "round"}, K.brow));
  K.m0 = el("path", {d: "M38 -372 Q52 -362 66 -372", fill: "none", stroke: INK, "stroke-width": 5.5, "stroke-linecap": "round"}, K.head);          // small smile
  K.m1 = el("g", {opacity: 0}, K.head); el("path", A({d: "M34 -376 Q52 -371 72 -378 Q69 -348 51 -348 Q37 -350 34 -376 Z", fill: "#7a1c1c", "stroke-width": 5}), K.m1); el("path", {d: "M39 -372 Q52 -368 68 -373 L67 -366 Q52 -362 40 -365 Z", fill: "#fff"}, K.m1);   // big open smile
  K.armN = el("g", {}, K.body);
  el("rect", A({x: -14, y: 36, width: 28, height: 92, rx: 14, fill: SKIN}), K.armN); K.finger = el("rect", A({x: -6, y: 122, width: 12, height: 28, rx: 6, fill: SKIN, "stroke-width": 4.5}), K.armN);
  el("circle", A({cx: 0, cy: 126, r: 17, fill: SKIN, "stroke-width": 5}), K.armN);
  el("rect", A({x: -19, y: -10, width: 38, height: 62, rx: 17, fill: BLUE}), K.armN);
  return K; }
function e9Pose(K, sw = 0, arm) { tf(K.legN, `translate(16 -120) rotate(${sw})`); tf(K.legF, `translate(-14 -120) rotate(${-sw})`); tf(K.armF, `translate(-6 -300) rotate(${sw * .9})`);
  tf(K.armN, `translate(10 -300) rotate(${arm === undefined ? -sw * .9 : arm})`); }

/* ---- one link of the chain in a white disc (radius 120): "sun", "leaf", "leafF" (a fallen leaf), "crab", "skipper", "croc" */
function e9Item(p, kind, ring = INK) { const g = el("g", {}, p), id = "e9c" + (++e9uid); const cp = el("clipPath", {id}, e9defs()); el("circle", {r: 116}, cp);
  g.disc = el("circle", {r: 120, fill: "#fff", stroke: ring, "stroke-width": 8}, g); const c = el("g", {"clip-path": `url(#${id})`}, g), q = el("g", {}, c); g.pic = q;
  if (kind === "sun") e9Sun(q, 54);
  else if (kind === "leaf") tf(e9Leaf(q), "translate(6 0) rotate(-24) scale(1.12)");
  else if (kind === "leafF") tf(e9Leaf(q, "#d9a441", "#9a6a1f"), "translate(6 0) rotate(14) scale(1.12)");
  else if (kind === "crab") tf(e9Crab(q), "translate(0 56) scale(.6)");
  else if (kind === "skipper") tf(e9Skipper(q), "translate(22 44) scale(.66)");
  else if (kind === "croc") tf(e9Croc(q), "translate(-178 52) scale(.62)");
  el("circle", {r: 120, fill: "none", stroke: ring, "stroke-width": 8}, g); return g; }
const E9NAME = {sun: "the Sun", leaf: "mangrove leaf", leafF: "fallen leaf", crab: "mangrove crab", skipper: "mudskipper", croc: "crocodile"};



// ============================================================ EP09 DRAWINGS ============================================================
const m9A = (a, b) => Object.assign({stroke: INK, "stroke-width": 6, "stroke-linejoin": "round", "stroke-linecap": "round"}, a, b || {});
const M9K = "#17171f";
const m9T = (p, x, y, s, fs = 40, fill = "#fff", o = {}) => tx(p, Object.assign({x, y, "text-anchor": "middle", "font-size": fs, "font-weight": 700, fill, class: fill === INK ? "" : "out", "stroke-width": fs * .2}, o), s);

/* ---- an Aedes mosquito, side view, facing right, about 370 long; the feet stand on y = 120. o.female: thin antennae (a male has
   bushy ones and long palps beside the proboscis). M.fly(k): 1 = wings a blur and legs trailing. M.wol = Wolbachia inside (off). */
function m9Moz(p, o = {}) { const M = el("g", {}, p), fem = !!o.female, K = M9K;
  const leg = (pts, far) => { const d = "M" + pts.map(q => q.join(" ")).join(" L"), g = el("g", {}, M.legs);
    el("path", {d, fill: "none", stroke: far ? "#3a3a52" : K, "stroke-width": 9, "stroke-linecap": "round", "stroke-linejoin": "round"}, g);
    el("path", {d, fill: "none", stroke: "#fff", "stroke-width": 9, "stroke-dasharray": "9 19", "stroke-dashoffset": -12}, g); return g; };
  M.legs = el("g", {}, M);
  leg([[52, 4], [104, 50], [124, 120]], 1); leg([[30, 8], [18, 66], [10, 120]], 1); leg([[6, 6], [-50, 54], [-112, 120]], 1);
  // wings: at rest (folded back over the body) and in flight (a blur)
  M.wf = el("g", {opacity: 0}, M); [[-32, -128, 66], [-58, -96, 40], [-74, -58, 16]].forEach(([x, y, r], i) => el("ellipse", {cx: x, cy: y, rx: 104, ry: 26, fill: "#e8f7ff", opacity: i === 1 ? .6 : .32, stroke: "#9fc6dc", "stroke-width": 3, transform: `rotate(${r} ${x} ${y})`}, M.wf));
  el("path", m9A({d: "M-8 -24 Q-92 -36 -180 -2 Q-190 8 -178 14 Q-92 32 -8 22 Z", fill: K, "stroke-width": 5}), M);
  [-40, -68, -96, -124, -150].forEach((x, i) => { const h = 23 - i * 3.3; el("line", {x1: x, y1: -h, x2: x - 3, y2: h + 1, stroke: "#fff", "stroke-width": 9, "stroke-linecap": "round"}, M); });
  M.wol = el("g", {opacity: 0}, M); el("ellipse", {cx: -86, cy: 0, rx: 96, ry: 44, fill: "#c77dff", filter: "url(#blur)", opacity: .9}, M.wol);
  [[-34, -4], [-62, 8], [-88, -6], [-112, 6], [-138, 0], [-54, -10]].forEach(([x, y]) => el("circle", {cx: x, cy: y, r: 8, fill: "#c77dff", stroke: "#fff", "stroke-width": 3}, M.wol));
  el("ellipse", m9A({cx: 24, cy: -14, rx: 52, ry: 42, fill: K, "stroke-width": 5}), M);
  el("path", {d: "M-6 -36 Q24 -56 54 -36 M2 -12 Q24 -26 48 -12", fill: "none", stroke: "#fff", "stroke-width": 7, "stroke-linecap": "round"}, M);
  [[6, 10], [30, 14], [52, 6]].forEach(([x, y]) => el("circle", {cx: x, cy: y, r: 6, fill: "#fff"}, M));
  M.wr = el("ellipse", {cx: -74, cy: -40, rx: 112, ry: 22, fill: "#e8f7ff", opacity: .62, stroke: INK, "stroke-width": 3, transform: "rotate(-7 -74 -40)"}, M);
  leg([[40, 8], [92, 52], [112, 120]], 0); leg([[18, 12], [2, 68], [-8, 120]], 0); leg([[-6, 10], [-64, 58], [-130, 120]], 0);
  // head: proboscis, palps (long in a male), antennae, eye
  el("line", {x1: 102, y1: 4, x2: fem ? 184 : 176, y2: fem ? 58 : 52, stroke: K, "stroke-width": 7, "stroke-linecap": "round"}, M);
  if (!fem) { el("line", {x1: 104, y1: -4, x2: 178, y2: 34, stroke: K, "stroke-width": 6, "stroke-linecap": "round"}, M); el("line", {x1: 104, y1: -4, x2: 178, y2: 34, stroke: "#fff", "stroke-width": 6, "stroke-dasharray": "7 16", "stroke-dashoffset": -10}, M); }
  M.ant = el("g", {}, M);
  [[172, -78], [186, -40]].forEach(([ex, ey]) => { const bx = 98, by = -24, dx = ex - bx, dy = ey - by, L = Math.hypot(dx, dy), nx = -dy / L, ny = dx / L;
    el("line", {x1: bx, y1: by, x2: ex, y2: ey, stroke: K, "stroke-width": fem ? 4 : 5, "stroke-linecap": "round"}, M.ant);
    const n = fem ? 4 : 11; for (let i = 1; i <= n; i++) { const k = i / (n + .6), x = bx + dx * k, y = by + dy * k, h = fem ? 7 : 26 * (1 - .55 * k);
      el("path", {d: `M${x + nx * h - dx / L * h * .5} ${y + ny * h - dy / L * h * .5} L${x} ${y} L${x - nx * h - dx / L * h * .5} ${y - ny * h - dy / L * h * .5}`, fill: "none", stroke: K, "stroke-width": fem ? 2.5 : 3.2, "stroke-linecap": "round"}, M.ant); } });
  el("circle", m9A({cx: 86, cy: -6, r: 25, fill: K, "stroke-width": 5}), M);
  el("circle", {cx: 94, cy: -10, r: 13, fill: "#fff"}, M); el("circle", {cx: 98, cy: -9, r: 7, fill: INK}, M); el("circle", {cx: 100, cy: -12, r: 2.4, fill: "#fff"}, M);
  M.fly = k => { op(M.wr, .62 * (1 - k)); op(M.wf, k); tf(M.legs, `rotate(${16 * k} 20 0)`); };
  return M; }
// a mosquito flying away from us (seen from behind), about 110 wide: for the swarm we fly out with
function m9Back(p) { const g = el("g", {}, p);
  [-1, 1].forEach(s => [18, 34].forEach(a => el("ellipse", {cx: s * 46, cy: -10, rx: 46, ry: 12, fill: "#e8f7ff", opacity: .4, stroke: "#9fc6dc", "stroke-width": 2, transform: `rotate(${-s * a} ${s * 8} -6)`}, g)));
  [[-16, 44], [-6, 52], [8, 52], [18, 44]].forEach(([x, y]) => { el("line", {x1: x * .4, y1: 8, x2: x, y2: y, stroke: M9K, "stroke-width": 5, "stroke-linecap": "round"}, g); el("line", {x1: x * .4, y1: 8, x2: x, y2: y, stroke: "#fff", "stroke-width": 5, "stroke-dasharray": "6 10", "stroke-dashoffset": -6}, g); });
  el("circle", {r: 18, fill: M9K, stroke: INK, "stroke-width": 4}, g); el("circle", {r: 10, fill: "none", stroke: "#fff", "stroke-width": 5}, g); return g; }

/* ---- the three stages that live in water. The water surface is y = 0 for the larva and the pupa. */
function m9Egg(p, k = 1) { const g = el("g", {}, p); el("ellipse", {rx: 19 * k, ry: 7.5 * k, fill: "#111118", stroke: INK, "stroke-width": 3}, g); el("path", {d: `M${-10 * k} ${-2.5 * k} Q0 ${-5.5 * k} ${9 * k} ${-3 * k}`, fill: "none", stroke: "#fff", "stroke-width": 2.5 * k, "stroke-linecap": "round", opacity: .7}, g); return g; }
// the larva (a "wriggler") hangs head down from the surface; its breathing tube touches the surface at (0, 0). L.run(ph) wriggles it.
function m9Larva(p, k = 1) { const L = el("g", {}, p), C = "#b89068"; L.seg = [];
  L.tube = el("line", {stroke: INK, "stroke-width": 13 * k, "stroke-linecap": "round"}, L); L.tube2 = el("line", {stroke: "#8a6a4a", "stroke-width": 7 * k, "stroke-linecap": "round"}, L);
  L.hair = el("path", {fill: "none", stroke: INK, "stroke-width": 2.5 * k, "stroke-linecap": "round"}, L);
  for (let i = 0; i < 9; i++) L.seg.push(el("circle", {r: (i === 7 ? 19 : i === 8 ? 15 : 10 + i * .5) * k, fill: i === 8 ? "#6b4a2e" : i === 7 ? "#a37a52" : C, stroke: INK, "stroke-width": 4 * k}, L));
  L.eye = el("circle", {r: 3.2 * k, fill: INK}, L);
  L.run = ph => { let x = 26 * k, y = 34 * k, a = 62 * Math.PI / 180; set(L.tube, "x1", 0); set(L.tube, "y1", 2 * k); set(L.tube, "x2", x); set(L.tube, "y2", y); ["x1", "y1", "x2", "y2"].forEach(q => set(L.tube2, q, L.tube.getAttribute(q)));
    let d = ""; L.seg.forEach((c, i) => { set(c, "cx", x); set(c, "cy", y); if (i > 0 && i < 7) d += `M${x - 16 * k} ${y - 9 * k} L${x + 14 * k} ${y + 9 * k} `; if (i === 8) { set(L.eye, "cx", x + 5 * k); set(L.eye, "cy", y + 5 * k); }
      a += .2 * Math.sin(ph - i * .75); const st = (i >= 6 ? 21 : 15) * k; x += Math.cos(a) * st; y += Math.sin(a) * st; }); set(L.hair, "d", d); };
  L.run(0); return L; }
// the pupa: comma-shaped, floats just under the surface and breathes through two little trumpets
function m9Pupa(p, k = 1) { const g = el("g", {transform: `scale(${k})`}, p), C = "#7a5a3c";
  [[-14, -4], [10, -4]].forEach(([x, y]) => { el("line", {x1: x, y1: 26, x2: x + (x < 0 ? -4 : 4), y2: y + 4, stroke: INK, "stroke-width": 11, "stroke-linecap": "round"}, g); el("line", {x1: x, y1: 26, x2: x + (x < 0 ? -4 : 4), y2: y + 4, stroke: "#b89068", "stroke-width": 5, "stroke-linecap": "round"}, g); });
  el("path", m9A({d: "M22 62 Q62 96 40 132 Q26 152 4 140", fill: "none", stroke: INK, "stroke-width": 24}), g); el("path", {d: "M22 62 Q62 96 40 132 Q26 152 4 140", fill: "none", stroke: "#a37a52", "stroke-width": 15, "stroke-linecap": "round"}, g);
  [[46, 92], [44, 116], [28, 138]].forEach(([x, y]) => el("line", {x1: x - 9, y1: y - 3, x2: x + 9, y2: y + 3, stroke: INK, "stroke-width": 2.5}, g));
  el("ellipse", m9A({cx: 0, cy: 50, rx: 40, ry: 34, fill: C, "stroke-width": 5}), g); el("circle", {cx: -16, cy: 54, r: 6, fill: INK}, g);
  el("path", {d: "M-22 34 Q0 22 24 36", fill: "none", stroke: "#fff", "stroke-width": 5, "stroke-linecap": "round", opacity: .35}, g); return g; }

/* ---- a flower pot standing on its plate, seen a little from above; the plate's middle is (0, 0); about 300 wide, 430 tall.
   g.water = the water in the plate (set its opacity to empty it). */
function m9Pot(p, o = {}) { const g = el("g", {}, p);
  el("ellipse", {cx: 0, cy: 14, rx: 168, ry: 30, fill: INK, opacity: .16}, g);
  el("ellipse", m9A({cx: 0, cy: 0, rx: 150, ry: 34, fill: "#c9764a"})); el("path", m9A({d: "M-150 -2 A150 34 0 0 0 150 -2 L142 16 A142 30 0 0 1 -142 16 Z", fill: "#b5633b"}), g);
  el("ellipse", m9A({cx: 0, cy: -4, rx: 150, ry: 32, fill: "#d98a5f"}), g);
  g.water = el("ellipse", {cx: 0, cy: -2, rx: 130, ry: 25, fill: "#7fd4ff", stroke: "#3a86ff", "stroke-width": 4}, g);
  g.shine = el("path", {d: "M-104 2 Q-60 16 -10 18", fill: "none", stroke: "#fff", "stroke-width": 6, "stroke-linecap": "round", opacity: .8}, g);
  g.pot = el("g", {}, g);
  el("path", m9A({d: "M-86 -6 A86 16 0 0 0 86 -6 L112 -168 H-112 Z", fill: "#d2693c"}), g.pot); el("rect", m9A({x: -126, y: -206, width: 252, height: 44, rx: 12, fill: "#e07a4a"}), g.pot);
  el("path", {d: "M-72 -150 L-58 -30", stroke: "#fff", "stroke-width": 9, "stroke-linecap": "round", opacity: .25}, g.pot);
  if (o.plant !== false) { const pl = el("g", {}, g.pot); el("ellipse", {cx: 0, cy: -204, rx: 112, ry: 14, fill: "#5b3a22"}, pl);
    [[-70, -286, -50], [70, -290, 50], [-34, -330, -22], [38, -334, 24], [0, -360, 0], [-96, -244, -76], [96, -246, 76]].forEach(([x, y, r], i) => el("path", m9A({d: "M0 0 Q-34 -50 0 -104 Q34 -50 0 0 Z", fill: i % 2 ? "#2f9e5b" : "#46b874", "stroke-width": 5, transform: `translate(${x * .35} -204) rotate(${r})`}), pl));
    [[-58, -300], [52, -310], [0, -344]].forEach(([x, y]) => { for (let i = 0; i < 5; i++) el("circle", {cx: x + 15 * Math.cos(i * 1.257), cy: y + 15 * Math.sin(i * 1.257), r: 12, fill: "#ff7aa8", stroke: INK, "stroke-width": 3}, pl); el("circle", {cx: x, cy: y, r: 9, fill: "#ffe14d", stroke: INK, "stroke-width": 3}, pl); }); }
  return g; }
/* ---- the plate cut open, close up: plate wall left and right, the pot's base standing in it, water with its surface at y = -105
   (plate floor y = 0). g.wat = the water group (things that live in the water go in here, drawn in front of the water). */
function m9PlateCut(p) { const g = el("g", {}, p), W = 640;
  el("path", m9A({d: `M-250 -18 L-330 -760 H330 L250 -18 Z`, fill: "#d2693c"}), g); el("path", {d: "M-286 -700 L-222 -60", stroke: "#fff", "stroke-width": 16, "stroke-linecap": "round", opacity: .2}, g);
  g.wat = el("g", {}, g); el("path", {d: `M${-W + 34} -105 H-262 L-250 -18 H${-W + 60} Z M262 -105 H${W - 34} L${W - 60} -18 H250 Z`, fill: "#7fd4ff"}, g.wat);
  el("path", {d: `M${-W + 34} -105 H-262 M262 -105 H${W - 34}`, stroke: "#3a86ff", "stroke-width": 7, "stroke-linecap": "round"}, g.wat);
  el("path", {d: `M${-W + 60} -92 h120 M330 -92 h150`, stroke: "#fff", "stroke-width": 6, "stroke-linecap": "round", opacity: .7}, g.wat);
  el("path", m9A({d: `M${-W} -190 L${-W + 60} 0 H${W - 60} L${W} -190 L${W - 44} -190 L${W - 84} -30 H${-W + 84} L${-W + 44} -190 Z`, fill: "#c9764a", "stroke-width": 7}), g);
  return g; }

/* ---- an HDB slab block seen from the front: the ground is y = 0 and the block is centred on x = 0. Common corridors with doors
   and windows behind a parapet on every floor, the void deck underneath. o.fl floors, o.un units, o.col the block's colour band. */
function m9Block(p, o = {}) { const g = el("g", {}, p), fl = o.fl || 10, un = o.un || 8, UW = 124, FH = 84, VD = 124, W = un * UW, col = o.col || "#f77f00", top = -VD - fl * FH;
  el("rect", m9A({x: -W / 2 - 16, y: top - 20, width: W + 32, height: 24, fill: "#e9dfc8", "stroke-width": 5}), g);
  el("rect", m9A({x: -W / 2 + 180, y: top - 74, width: 150, height: 56, rx: 6, fill: "#cfd6dd", "stroke-width": 5}), g);          // water tank
  el("rect", m9A({x: -W / 2, y: top, width: W, height: fl * FH + VD, fill: "#fbf4e2"}), g);
  el("rect", {x: -W / 2 + 3, y: -VD, width: W - 6, height: VD, fill: "#a9a08c"}, g); el("rect", {x: -W / 2 + 3, y: -22, width: W - 6, height: 22, fill: "#cfc7b4"}, g);
  seed = o.sd || 17; const DC = ["#8d5b3a", "#2a9d8f", "#3a86ff", "#c1121f", "#6d597a"];
  for (let f = 0; f < fl; f++) { const y = -VD - (f + 1) * FH;
    el("rect", {x: -W / 2 + 3, y: y + 8, width: W - 6, height: FH - 8, fill: "#d8cdb2"}, g);
    for (let u = 0; u < un; u++) { const x = -W / 2 + u * UW; el("rect", {x: x + 20, y: y + 20, width: 30, height: FH - 20, fill: DC[Math.floor(rnd() * 5)], stroke: INK, "stroke-width": 3}, g);
      el("rect", {x: x + 64, y: y + 22, width: 44, height: 24, fill: rnd() < .5 ? "#9bd0e8" : "#bfe6ff", stroke: INK, "stroke-width": 3}, g); }
    el("rect", {x: -W / 2, y: y + FH * .56, width: W, height: FH * .44, fill: "#fffaf0", stroke: INK, "stroke-width": 4}, g);
    el("rect", {x: -W / 2 + 2, y: y + FH * .56 + 12, width: W - 4, height: 10, fill: col}, g); }
  for (let u = 0; u <= un; u++) el("rect", {x: -W / 2 + u * UW - 7, y: top, width: 14, height: fl * FH, fill: "#fbf4e2", stroke: INK, "stroke-width": 3}, g);
  for (let u = 0; u <= un; u += 2) el("rect", m9A({x: -W / 2 + u * UW - 15, y: -VD, width: 30, height: VD, fill: "#efe6cf", "stroke-width": 4}), g);
  el("rect", m9A({x: -W / 2 - 4, y: top, width: 92, height: fl * FH, fill: col, "stroke-width": 5}), g);
  tx(g, {x: -W / 2 + 42, y: top + 96, "text-anchor": "middle", "font-size": 54, "font-weight": 700, fill: "#fff"}, o.num || "909");
  el("rect", m9A({x: -W / 2 + 290, y: -52, width: 150, height: 14, rx: 5, fill: "#8d99ae", "stroke-width": 4}), g); [300, 420].forEach(x => el("rect", {x: -W / 2 + x, y: -40, width: 10, height: 40, fill: INK}, g));   // a void-deck table
  g.W = W; g.top = top; return g; }
// the estate: sky, far blocks, grass, a path, trees, and one block in front (g.block). The ground line is y = 800.
function m9Estate(p, o = {}) { const g = el("g", {}, p);
  fullRect(g, e9grad("linearGradient", {x1: 0, y1: 0, x2: 0, y2: 1}, o.dawn ? [[0, "#5a6bb0"], [.4, "#f4a9a0"], [.72, "#ffe2a8"]] : [[0, "#58b4ee"], [.75, "#dff4ff"]]));
  [[-120, 560, 300], [230, 470, 260], [1270, 520, 300], [1590, 450, 260]].forEach(([x, h, w]) => { el("rect", {x, y: 800 - h, width: w, height: h, fill: o.dawn ? "#c9a5b4" : "#bcdff2"}, g);
    for (let r = 0; r < h / 46 - 1; r++) el("rect", {x: x + 12, y: 800 - h + 20 + r * 46, width: w - 24, height: 12, fill: "#fff", opacity: .35}, g); });
  el("rect", {x: -170, y: 800, width: 1960, height: 240, fill: "#8fce7e"}, g); el("path", {d: "M-170 870 H1790 V940 H-170 Z", fill: "#e8dcc4"}, g); el("line", {x1: -170, y1: 800, x2: 1790, y2: 800, stroke: INK, "stroke-width": 5}, g);
  g.block = m9Block(g, o); tf(g.block, `translate(${o.x === undefined ? 810 : o.x} 800) scale(${o.k || .78})`);
  (o.trees || [[80, 1.1], [1560, 1.2]]).forEach(([x, k]) => { const t = el("g", {transform: `translate(${x} 806) scale(${k})`}, g); el("rect", m9A({x: -13, y: -150, width: 26, height: 150, fill: "#8a6548", "stroke-width": 5}), t);
    [[0, -230, 110], [-70, -170, 74], [70, -176, 78]].forEach(([cx, cy, r]) => el("circle", m9A({cx, cy, r, fill: "#3f9a5f", "stroke-width": 5}), t)); });
  return g; }

/* ---- one HDB corridor seen from outside the block, close up (full screen): the floor slab above, flats' doors and windows,
   columns, the parapet in front. Corridor floor y = 862; ceiling y = 160; parapet top y = 582. */
function m9Corridor(p) { const g = el("g", {}, p);
  el("rect", {x: -170, y: -80, width: 1960, height: 1120, fill: "#e6dcc2"}, g);
  el("rect", {x: -170, y: 160, width: 1960, height: 702, fill: "#f3ead2"}, g); el("rect", {x: -170, y: 160, width: 1960, height: 70, fill: INK, opacity: .1}, g);
  [[90, "#2a9d8f", "#07-117"], [730, "#8d5b3a", "#07-119"], [1370, "#3a86ff", "#07-121"]].forEach(([x, c, n]) => {
    el("rect", m9A({x, y: 250, width: 200, height: 620, fill: c})); el("rect", m9A({x, y: 250, width: 200, height: 620, fill: c}), g);
    for (let i = 1; i < 6; i++) el("line", {x1: x + i * 33.3, y1: 254, x2: x + i * 33.3, y2: 866, stroke: INK, "stroke-width": 4, opacity: .55}, g);        // the gate
    el("rect", m9A({x: x + 226, y: 262, width: 124, height: 52, rx: 8, fill: "#fff", "stroke-width": 4}), g); tx(g, {x: x + 288, y: 300, "text-anchor": "middle", "font-size": 30, "font-weight": 700, fill: INK}, n);
    el("rect", m9A({x: x + 250, y: 350, width: 250, height: 190, fill: "#9bd0e8"}), g); for (let i = 1; i < 6; i++) el("line", {x1: x + 250, y1: 350 + i * 31.6, x2: x + 500, y2: 350 + i * 31.6, stroke: INK, "stroke-width": 4}, g); });
  g.mid = el("g", {}, g);                                                       // things standing in the corridor go here (behind the parapet)
  g.front = el("g", {}, g);
  el("rect", m9A({x: -180, y: 582, width: 1980, height: 300, fill: "#fffaf0"}), g.front); el("rect", {x: -180, y: 640, width: 1980, height: 34, fill: "#f77f00"}, g.front);
  el("rect", m9A({x: -180, y: 566, width: 1980, height: 26, rx: 6, fill: "#e9dfc8", "stroke-width": 5}), g.front);
  [600, 1240].forEach(x => el("rect", m9A({x, y: 160, width: 64, height: 720, fill: "#fbf4e2"}), g.front));
  el("rect", m9A({x: -180, y: 96, width: 1980, height: 70, fill: "#d9cfb6"}), g.front); el("rect", m9A({x: -180, y: 876, width: 1980, height: 70, fill: "#d9cfb6"}), g.front);
  el("rect", {x: -180, y: 946, width: 1980, height: 100, fill: "#b9ae94"}, g.front); el("rect", {x: -180, y: -80, width: 1980, height: 176, fill: "#fffaf0", stroke: INK, "stroke-width": 6}, g.front); el("rect", {x: -180, y: -22, width: 1980, height: 34, fill: "#f77f00"}, g.front);
  return g; }
/* ---- the release device: a small box on the corridor wall; D.lid swings up (D.open(k)); about 150 wide, 190 tall, centred */
function m9Device(p) { const D = el("g", {}, p);
  el("rect", m9A({x: -70, y: -80, width: 140, height: 176, rx: 14, fill: "#f8f9fa"}), D); el("rect", {x: -67, y: 20, width: 134, height: 46, fill: "#2a9d8f"}, D);
  tx(D, {x: 0, y: 40, "text-anchor": "middle", "font-size": 17, "font-weight": 700, fill: "#fff"}, "PROJECT"); tx(D, {x: 0, y: 59, "text-anchor": "middle", "font-size": 17, "font-weight": 700, fill: "#fff"}, "WOLBACHIA");
  D.hole = el("rect", {x: -52, y: -66, width: 104, height: 72, rx: 8, fill: "#2b2f45", stroke: INK, "stroke-width": 4}, D);
  D.lid = el("g", {}, D); el("rect", m9A({x: -58, y: 0, width: 116, height: 80, rx: 8, fill: "#dee2e6", "stroke-width": 5}), D.lid); el("circle", {cx: 0, cy: 62, r: 7, fill: INK}, D.lid);
  D.open = k => tf(D.lid, `translate(0 -70) scale(1 ${1 - 1.9 * k})`); D.open(0); return D; }
/* ---- an NEA officer, front view, feet at (0, 0), about 560 tall: polo shirt, vest marked NEA, cap, clipboard */
function m9Officer(p) { const g = el("g", {}, p), SK = "#e0ac69";
  el("rect", m9A({x: -62, y: -250, width: 56, height: 232, rx: 14, fill: "#1d3557"}), g); el("rect", m9A({x: 6, y: -250, width: 56, height: 232, rx: 14, fill: "#1d3557"}), g);
  [-66, 4].forEach(x => el("rect", m9A({x, y: -26, width: 66, height: 28, rx: 12, fill: "#33334f"}), g));
  g.armL = el("g", {transform: "translate(-76 -398)"}, g); el("rect", m9A({x: -18, y: 0, width: 36, height: 150, rx: 16, fill: SK}), g.armL); el("rect", m9A({x: -22, y: -8, width: 44, height: 74, rx: 16, fill: "#fff"}), g.armL);
  el("rect", m9A({x: -84, y: -420, width: 168, height: 190, rx: 30, fill: "#fff"}), g);
  el("path", m9A({d: "M-84 -400 Q-84 -420 -60 -420 H-26 L-10 -330 V-236 H-84 Z M84 -400 Q84 -420 60 -420 H26 L10 -330 V-236 H84 Z", fill: "#b5e48c"}), g);
  el("rect", {x: -76, y: -300, width: 58, height: 12, fill: "#fff"}, g); el("rect", {x: 18, y: -300, width: 58, height: 12, fill: "#fff"}, g);
  tx(g, {x: 47, y: -330, "text-anchor": "middle", "font-size": 30, "font-weight": 700, fill: INK}, "NEA");
  el("rect", m9A({x: -20, y: -446, width: 40, height: 36, fill: SK, "stroke-width": 5}), g);
  el("circle", m9A({cx: 0, cy: -500, r: 70, fill: SK}), g);
  el("path", m9A({d: "M-72 -516 Q-70 -584 0 -584 Q70 -584 72 -516 Z", fill: "#1d3557"}), g); el("path", m9A({d: "M-80 -518 H96 Q104 -506 92 -500 H-80 Z", fill: "#1d3557"}), g);
  [-26, 26].forEach(x => { el("ellipse", {cx: x, cy: -486, rx: 9, ry: 12, fill: INK}, g); el("circle", {cx: x + 3, cy: -490, r: 3.4, fill: "#fff"}, g); });
  el("path", {d: "M-22 -458 Q0 -440 22 -458", fill: "none", stroke: INK, "stroke-width": 5.5, "stroke-linecap": "round"}, g);
  g.armR = el("g", {transform: "translate(76 -398)"}, g); el("rect", m9A({x: -18, y: 0, width: 36, height: 150, rx: 16, fill: SK}), g.armR); el("rect", m9A({x: -22, y: -8, width: 44, height: 74, rx: 16, fill: "#fff"}), g.armR);
  g.clip = el("g", {transform: "translate(-104 -300) rotate(-8)"}, g); el("rect", m9A({x: -50, y: -66, width: 100, height: 132, rx: 8, fill: "#bc8a5f"}), g.clip); el("rect", {x: -40, y: -50, width: 80, height: 106, fill: "#fff", stroke: INK, "stroke-width": 3}, g.clip);
  [-30, -10, 10, 30].forEach(y => el("line", {x1: -30, y1: y, x2: 30, y2: y, stroke: "#8d99ae", "stroke-width": 4}, g.clip)); el("rect", {x: -18, y: -76, width: 36, height: 18, rx: 5, fill: "#8d99ae", stroke: INK, "stroke-width": 3}, g.clip);
  return g; }
// a white disc (radius 120) with a picture inside, for diagrams. kind: "eggs", "larva", "pupa", "adultF", "adultM"; the first
// three show water. g.pic holds the drawing; g.larva is the larva (call g.larva.run(ph)).
function m9Disc(p, kind, ring = INK) { const g = el("g", {}, p), id = "m9c" + (m9Disc.n = (m9Disc.n || 0) + 1); const cp = el("clipPath", {id}, e9defs()); el("circle", {r: 116}, cp);
  el("circle", {r: 120, fill: "#fff", stroke: ring, "stroke-width": 8}, g); const q = g.pic = el("g", {"clip-path": `url(#${id})`}, g);
  if (kind === "eggs" || kind === "larva" || kind === "pupa") { el("rect", {x: -130, y: -130, width: 260, height: 260, fill: "#eaf7ff"}, q); el("rect", {x: -130, y: -42, width: 260, height: 180, fill: "#7fd4ff"}, q); el("line", {x1: -130, y1: -42, x2: 130, y2: -42, stroke: "#3a86ff", "stroke-width": 6}, q); }
  if (kind === "eggs") { el("path", m9A({d: "M56 -130 L84 130 H140 V-130 Z", fill: "#d98a5f", "stroke-width": 5}), q); [[40, -52, -74], [34, -78, -70], [44, -30, -78], [30, -102, -68]].forEach(([x, y, r]) => tf(m9Egg(q, 1.35), `translate(${x} ${y}) rotate(${r})`)); [[-40, -47, 0], [-84, -46, 8]].forEach(([x, y, r]) => tf(m9Egg(q, 1.25), `translate(${x} ${y}) rotate(${r})`)); }
  if (kind === "larva") { g.larva = m9Larva(q, 1.05); tf(g.larva, "translate(-58 -42)"); }
  if (kind === "pupa") tf(m9Pupa(q, .95), "translate(-6 -42)");
  if (kind === "adultF" || kind === "adultM") { el("rect", {x: -130, y: -130, width: 260, height: 260, fill: "#fff8e1"}, q); g.moz = m9Moz(q, {female: kind === "adultF"}); tf(g.moz, "translate(-2 -6) scale(.56)"); }
  el("circle", {r: 120, fill: "none", stroke: ring, "stroke-width": 8}, g); return g; }
// a red "no" cross and a green tick
const m9X = (p, r = 60) => { const g = el("g", {}, p); [[-1, 1], [1, 1]].forEach(([a]) => { el("line", {x1: -r * a, y1: -r, x2: r * a, y2: r, stroke: INK, "stroke-width": r * .52, "stroke-linecap": "round"}, g); }); [[-1], [1]].forEach(([a]) => el("line", {x1: -r * a, y1: -r, x2: r * a, y2: r, stroke: "#e63946", "stroke-width": r * .32, "stroke-linecap": "round"}, g)); return g; };
const m9Tick = (p, r = 60) => { const g = el("g", {}, p), d = `M${-r} ${r * .1} L${-r * .3} ${r * .8} L${r} ${-r * .8}`; el("path", {d, fill: "none", stroke: INK, "stroke-width": r * .52, "stroke-linecap": "round", "stroke-linejoin": "round"}, g); el("path", {d, fill: "none", stroke: "#06d6a0", "stroke-width": r * .32, "stroke-linecap": "round", "stroke-linejoin": "round"}, g); return g; };

// ============================================================ NARRATED SCENES ============================================================

// ---- HOOK: an HDB estate. An Aedes mosquito: some spread dengue. The twist: Singapore fights mosquitoes with more mosquitoes.
S.hook = (() => { const s = scene("hook", "#58b4ee", "#dff4ff"), st = s.stage; s.cam = el("g", {}, st);
  s.est = m9Estate(s.cam, {x: 900, k: .8});
  s.dark = fullRect(st, "#1b1b3a", 0);
  s.fg = el("g", {}, st); s.f = m9Moz(s.fg, {female: true}); s.f.fly(1);
  s.males = []; for (let i = 0; i < 7; i++) { const g = el("g", {}, st), m = m9Moz(g); m.fly(1); op(m.wol, 1); s.males.push(g); }
  s.name = chip(st, "an Aedes mosquito: black, with white stripes", INK, {fs: 40});
  s.den = chip(st, "⚠️ Some Aedes mosquitoes spread DENGUE", "#e63946", {fs: 48});
  s.tw = m9T(st, 810, 200, "But here's a twist…", 110, "#ffe14d");
  s.t1 = m9T(st, 810, 170, "Mosquitoes", 130, "#fff"); s.vs = m9T(st, 810, 330, "VS", 150, "#ffe14d"); s.t2 = m9T(st, 810, 170, "mosquitoes!", 130, "#fff");
  s.run = t => { const a = (w, f) => cue("hook", w, f), t0 = SC.hook.t0, tM = a("some", .15), tD = a("disease", .35), tT = a("twist", .57), tF = a("fighting", .76), tW = a("with", .9);
    tf(s.cam, `translate(${VP[0]} ${VP[1]}) scale(${1.14 - .1 * ramp(t, t0 - .4, t0 + 5)}) translate(${-VP[0]} ${-VP[1]})`);
    const kin = ramp(t, t0 - .3, t0 + 1.3), kl = ramp(t, tF - .2, tF + .6), hov = Math.sin(t * 5.2) * 10, x = lerp(lerp(-360, 760, kin), 330, kl), y = lerp(120, 470, kin) - 190 * Math.sin(Math.PI * kin) * .5 + hov + 60 * kl;
    tf(s.fg, `translate(${x} ${y}) rotate(${-10 + 8 * kin}) scale(${lerp(1.75, 1.15, kl)})`);
    popAt(s.name, 800, 760, t, t0 + 1.3); op(s.name, on(t, t0 + 1.3, tD - .1, .2)); popAt(s.den, 810, 800, t, tD); op(s.den, on(t, tD, tT - .1, .2));
    op(s.dark, .5 * ramp(t, tT - .2, tT + .3)); tf(s.tw, `translate(810 200) scale(${Math.max(0, pop(t, tT))}) translate(-810 -200)`); op(s.tw, on(t, tT, tF - .15, .15));
    [[s.t1, 300, 170, tF], [s.vs, 810, 420, tF + .35], [s.t2, 1300, 170, tW]].forEach(([e, X, Y, tt]) => { set(e, "x", 0); set(e, "y", 0); tf(e, `translate(${X} ${Y}) scale(${Math.max(0, pop(t, tt))})`); op(e, ramp(t, tt - .05, tt + .1)); });
    s.males.forEach((g, i) => { const k = ramp(t, tW - .1 + i * .07, tW + .7 + i * .07), c = i % 3, r = Math.floor(i / 3), X = lerp(2100, 1010 + c * 250 + (r % 2) * 110, k), Y = 380 + r * 190 + Math.sin(t * 5 + i * 2) * 9;
      tf(g, `translate(${X} ${Y}) scale(${-.62} .62)`); op(g, k > 0 ? 1 : 0); }); };
  return s; })();

// ---- LAST TIME'S ANSWER (EP08, Sungei Buloh): no crabs -> the mudskippers lose their food -> fewer mudskippers -> less food for the crocodile
S.answer = (() => { const s = scene("answer", "#3a0ca3", "#7209b7"), st = s.stage, K = ["leafF", "crab", "skipper", "croc"], X = i => 240 + i * 380, Y = 420;
  s.sw = e9Swamp(st, {bank: false}); fullRect(st, "#2a1470", .72);
  s.top = chip(st, "✅ Last time: no more mangrove crabs… what happens to the crocodile?", "#06d6a0", {fs: 38, ink: INK});
  s.loc = chip(st, "📍 Sungei Buloh Wetland Reserve", INK, {fs: 30});
  s.arr = [0, 1, 2].map(i => { const g = e9Arrow(st, .62); set(g.a, "fill", "#ffbe0b"); return g; });
  s.gone = el("g", {}, st); el("circle", {cx: X(1), cy: Y, r: 138, fill: "none", stroke: "#fff", "stroke-width": 7, "stroke-dasharray": "18 16"}, s.gone); m9T(s.gone, X(1), Y + 16, "gone", 56, "#fff");
  s.items = K.map((k, i) => { const g = e9Item(st, k); g.x = X(i); return g; });
  s.names = K.map((k, i) => m9T(st, X(i), Y + 208, E9NAME[k], 40));
  s.xs = [1, 2].map(i => { const g = m9X(st, 30); return g; });
  s.c = [["1  The mudskippers lose their food", "#f77f00"], ["2  Fewer mudskippers", "#3a86ff"], ["3  Less food for the crocodile", "#e63946"]].map(([l, c]) => chip(st, l, c, {fs: 44}));
  s.big = m9T(st, 810, 0, "Every link in a food chain matters!", 84, "#ffe14d");
  s.run = t => { const a = (w, f) => cue("answer", w, f), t0 = SC.answer.t0, tW = a("what", .16), tD = a("disappeared", .36), tL = a("lose", .5), tF = a("fewer", .63), tS = a("less", .73), tE = a("every", .88);
    popAt(s.top, 810, 80, t, t0 - .2); popAt(s.loc, 810, 150, t, t0 + .4); const g1 = ramp(t, tD, tD + .5), g2 = ramp(t, tF, tF + .7), g3 = ramp(t, tS, tS + .7);
    s.items.forEach((g, i) => { const sh = i === 1 ? 8 * on(t, a("crabs", .33), tD, .1) * Math.sin(t * 40) : 0, sc = 1.15 * (i === 1 ? 1 - .5 * g1 : i === 2 ? 1 - .32 * g2 : i === 3 ? 1 - .1 * g3 : 1);
      popAt(g, g.x + sh, Y, t, tW - .5 + i * .1, sc); op(g, ramp(t, tW - .5 + i * .1, tW - .3 + i * .1) * (i === 1 ? 1 - g1 : i === 2 ? 1 - .5 * g2 : i === 3 ? 1 - .25 * g3 : 1)); });
    s.names.forEach((n, i) => op(n, ramp(t, tW - .3 + i * .1, tW + i * .1) * (i === 1 ? 1 - .6 * g1 : 1)));
    const gl = ramp(t, tL, tL + .4);
    s.arr.forEach((g, i) => { tf(g, `translate(${X(i) + 190} ${Y})`); op(g, ramp(t, tW - .3 + i * .1, tW + i * .1) * (i === 0 ? 1 - .75 * g1 : 1)); set(g.a, "fill", mix("#ffbe0b", "#8d99ae", i === 1 ? gl : i === 2 ? g3 : g1)); });
    s.xs.forEach((g, k) => popAt(g, X(k + 1) + 190, Y, t, k ? tS : tL)); op(s.gone, g1);
    s.c.forEach((c, i) => { const tt = [tL, tF, tS][i]; popAt(c, 810, 800, t, tt); op(c, on(t, tt, i < 2 ? [tF, tS][i] - .1 : tE - .1, .15)); });
    set(s.big, "x", 0); tf(s.big, `translate(810 800) scale(${Math.max(0, pop(t, tE))})`); op(s.big, ramp(t, tE - .05, tE + .1)); };
  return s; })();

// ---- NEWS: the dengue numbers as two bars drawn to scale; then real life: an estate in a Project Wolbachia area, an NEA officer
// and a release device on a corridor; the risk of dengue fell by more than 70%.
S.news = (() => { const s = scene("news", "#0b6e6e", "#073b4c"), st = s.stage, B0 = 770, H = 520, CX = 600;
  s.A = el("g", {}, st); s.top = chip(st, "📰 Dengue cases in Singapore", "#f72585", {fs: 46});
  el("line", {x1: 130, y1: B0, x2: 1070, y2: B0, stroke: "#fff", "stroke-width": 7, "stroke-linecap": "round"}, s.A);
  s.bars = [[340, 13600, "#e63946", "2024", "about 13,600"], [860, 4100, "#ffbe0b", "2025", "just over 4,000"]].map(([x, n, c, yr, lab]) => { const g = el("g", {}, s.A); g.h = H * n / 13600; g.x = x;
    g.r = el("rect", m9A({x: x - 120, width: 240, fill: c, rx: 10})); g.r = el("rect", m9A({x: x - 120, width: 240, fill: c, rx: 10}), g); m9T(s.A, x, B0 + 66, yr, 56); g.l = m9T(g, x, 0, lab, 60, "#ffe14d"); g.s = m9T(g, x, 0, "cases", 38); return g; });
  s.dn = el("g", {}, s.A); el("path", m9A({d: "M-150 -60 Q20 -70 120 60 L152 34 L150 130 L58 108 L88 84 Q10 -20 -150 -14 Z", fill: "#06d6a0"}), s.dn);
  s.src = tx(s.A, {x: 1070, y: B0 + 100, "text-anchor": "end", "font-size": 28, "font-weight": 600, fill: "#fff", opacity: .8}, "Source: National Environment Agency (NEA)");
  // real life
  s.B = el("g", {}, st); s.est = m9Estate(s.B, {x: 560, k: .8, un: 7, trees: [[-60, 1.1], [1170, 1.1]]});
  s.area = chip(st, "📍 An HDB estate in a Project Wolbachia area", INK, {fs: 38});
  s.C = el("g", {}, st); s.cam = el("g", {}, s.C); s.cor = m9Corridor(s.cam);
  s.off = m9Officer(s.cor.mid); tf(s.off, "translate(400 880) scale(.84)"); s.dev = m9Device(s.cor.front); tf(s.dev, "translate(632 420) scale(.9)");
  s.moz = []; for (let i = 0; i < 8; i++) { const g = el("g", {}, s.cam), m = m9Moz(g); m.fly(1); s.moz.push(g); }
  s.lo = chip(s.C, "NEA officer", "#2a9d8f", {fs: 34}); s.ld = chip(s.C, "release device", "#7209b7", {fs: 34}); s.lm = chip(s.C, "male Wolbachia mosquitoes", INK, {fs: 34});
  s.pct = el("g", {}, st); el("rect", m9A({x: -430, y: -100, width: 860, height: 200, rx: 40, fill: "#06d6a0", "stroke-width": 8, filter: "url(#sh)"}), s.pct);
  tx(s.pct, {x: 0, y: -24, "text-anchor": "middle", "font-size": 52, "font-weight": 700, fill: INK}, "Risk of getting dengue here:"); tx(s.pct, {x: 0, y: 62, "text-anchor": "middle", "font-size": 76, "font-weight": 700, fill: INK}, "down by more than 70%");
  s.run = t => { const a = (w, f) => cue("news", w, f), t0 = SC.news.t0, t13 = a("thirteen", .17), t4 = a("four", .47), tP = a("project", .63) - .3, tR = a("risk", .78) - .3, t70 = a("seventy", .9);
    const kB = ramp(t, tP, tP + .4), kC = ramp(t, tR, tR + .4); op(s.A, 1 - kB); op(s.B, kB * (1 - kC)); op(s.C, kC);
    popAt(s.top, CX, 70, t, t0 - .2); op(s.top, on(t, t0 - .2, tP, .2));
    s.bars.forEach((g, i) => { const tt = i ? t4 : t13, k = ease((t - tt) / .9), h = Math.max(1, g.h * k); set(g.r, "y", B0 - h); set(g.r, "height", h); op(g, ramp(t, tt - .05, tt + .1)); set(g.l, "y", B0 - h - 66); set(g.s, "y", B0 - h - 20); });
    tf(s.dn, `translate(600 330) scale(${Math.max(0, pop(t, t4 + .8))})`); op(s.src, ramp(t, t13, t13 + .4));
    tf(s.B, `translate(600 450) scale(${1.02 + .1 * ramp(t, tP, tR + .4)}) translate(-600 -450)`); popAt(s.area, 600, 80, t, tP + .3); op(s.area, on(t, tP + .3, tR, .2));
    const z = lerp(1.5, 1.22, ramp(t, tR, t70 + 1)); tf(s.cam, `translate(600 400) scale(${z}) translate(-560 -470)`);
    const u = t - tR - .7; s.dev.open(ramp(u, 0, .35)); tf(s.off.armR, `translate(76 -398) rotate(${-150 * ramp(u, -.5, 0) + 20 * ramp(u, .3, .8)})`);
    s.moz.forEach((g, i) => { const k = clamp((u - .25 - i * .16) / 2.6), ang = -1.2 + i * .34, d = 520 * Math.pow(k, .7); tf(g, `translate(${632 + Math.cos(ang) * d * 1.3 + 30 * Math.sin(t * 4 + i)} ${392 + Math.sin(ang) * d * .55 - 40 * k}) scale(${(i % 2 ? -1 : 1) * lerp(.1, .3, k)} ${lerp(.1, .3, k)})`); op(g, k > 0 ? 1 - ramp(k, .85, 1) : 0); });
    popAt(s.lo, 330, 240, t, tR + .4); popAt(s.ld, 800, 230, t, tR + .7); popAt(s.lm, 880, 520, t, tR + 1.5); [s.lo, s.ld, s.lm].forEach(c => op(c, +c.getAttribute("opacity") * (1 - ramp(t, t70 - .3, t70))));
    popAt(s.pct, 600, 760, t, t70 - .1); };
  return s; })();

// ---- RECAP: the journey on a board; each step lights up as Heart names it
S.recap = (() => { const s = scene("recap", "#fff3b0", "#ffd6a5"), st = s.stage, X = i => 110 + (i % 3) * 490, Y = i => 300 + Math.floor(i / 3) * 310;
  s.title = tx(st, {x: 600, y: 110, "text-anchor": "middle", "font-size": 72, "font-weight": 700, fill: INK}, "🦟 Your journey as a Wolbachia mosquito");
  const pics = [g => { const m = m9Moz(g); op(m.wol, 1); tf(m, "translate(0 -10) scale(.42)"); },
    g => { tf(m9Block(g, {fl: 4, un: 3}), "translate(-10 62) scale(.26)"); const d = m9Device(g); d.open(1); tf(d, "translate(74 6) scale(.42)"); },
    g => { const m = m9Moz(g); m.fly(1); tf(m, "translate(-14 -6) scale(.36)"); tf(m9X(g, 20), "translate(62 32)"); emo(g, 66, -34, 44, "🧒"); },
    g => { const f = m9Moz(g, {female: true}); tf(f, "translate(0 -10) scale(.42)"); },
    g => { el("rect", {x: -100, y: 0, width: 200, height: 60, fill: "#7fd4ff"}, g); el("line", {x1: -100, y1: 0, x2: 100, y2: 0, stroke: "#3a86ff", "stroke-width": 5}, g); [-60, -20, 20, 60].forEach((x, i) => tf(m9Egg(g, 1.5), `translate(${x} ${-4 + (i % 2) * 5}) rotate(${i * 9 - 12})`)); tf(m9X(g, 26), "translate(0 -40)"); },
    g => { [[-66, -30, 1], [0, -30, 0], [66, -30, 0], [-66, 34, 0], [0, 34, 1], [66, 34, 0]].forEach(([x, y, k]) => { const m = m9Moz(g); tf(m, `translate(${x} ${y}) scale(.15)`); op(m, k ? 1 : .18); }); }];
  s.cards = ["You: a male Aedes, with Wolbachia", "Released at an HDB block", "Males don't bite", "You found a wild female", "Her eggs did not hatch", "Fewer mosquitoes, less dengue"].map((lab, i) => { const g = el("g", {}, st);
    el("rect", {x: -215, y: -130, width: 430, height: 260, rx: 30, fill: "#fff", stroke: INK, "stroke-width": 6, filter: "url(#sh)"}, g);
    el("circle", {cx: -176, cy: -92, r: 30, fill: ["#7209b7", "#f77f00", "#2a9d8f", "#f72585", "#e63946", "#06d6a0"][i], stroke: INK, "stroke-width": 5}, g); tx(g, {x: -176, y: -78, "text-anchor": "middle", "font-size": 40, "font-weight": 700, fill: "#fff"}, String(i + 1));
    pics[i](el("g", {transform: "translate(0 -34)"}, g)); tx(g, {x: 0, y: 104, "text-anchor": "middle", "font-size": 30, "font-weight": 700, fill: INK, "data-fit": 400}, lab); return g; });
  s.run = t => { const a = (w, f) => cue("recap", w, f), T = [a("male", .1), a("released", .3), a("males", .45), a("found", .66), a("eggs", .8), a("fewer", .9)];
    op(s.title, ramp(t, SC.recap.t0 - .1, SC.recap.t0 + .3));
    s.cards.forEach((g, i) => { const now = on(t, T[i] - .1, T[i] + 1.6, .2); tf(g, `translate(${X(i)} ${Y(i) - 14 * now}) scale(${1 + .1 * now})`); op(g, t >= T[i] - .1 ? 1 : .25); }); };
  return s; })();

// ---- TEXTBOOK (P3 life cycles): the mosquito's life cycle as a circle, in step with Heart: egg, larva, pupa (all in water), adult.
// Two rows of labels, one kind each: the stage's name; where it lives. Then real life: water left in a flower pot plate.
S.textbook = (() => { const s = scene("textbook", "#e0fbfc", "#c2dfe3"), st = s.stage, CX = 600, CY = 470, R = 262;
  const P = [[CX, CY - R], [CX + R + 130, CY], [CX, CY + R], [CX - R - 130, CY]], K = ["eggs", "larva", "pupa", "adultF"], NM = ["egg", "larva", "pupa", "adult"], RC = ["#2a9d8f", "#3a86ff", "#f77f00", "#e63946"];
  s.h = chip(st, "📘 Primary 3 · Life cycles", "#3a0ca3", {fs: 44}); s.A = el("g", {}, st);
  s.mid = el("g", {}, s.A); tx(s.mid, {x: CX, y: CY - 8, "text-anchor": "middle", "font-size": 46, "font-weight": 700, fill: INK}, "a mosquito's"); tx(s.mid, {x: CX, y: CY + 46, "text-anchor": "middle", "font-size": 46, "font-weight": 700, fill: INK}, "life cycle");
  s.arr = [0, 1, 2, 3].map(i => { const a = P[i], b = P[(i + 1) % 4], mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2, ox = (mx - CX) * .34, oy = (my - CY) * .34, g = el("g", {}, s.A);
    const ux = b[0] - a[0], uy = b[1] - a[1], L = Math.hypot(ux, uy), A = [a[0] + ux / L * 150, a[1] + uy / L * 150], B = [b[0] - ux / L * 150, b[1] - uy / L * 150], d = `M${A} Q${mx + ox} ${my + oy} ${B}`.replace(/,/g, " ");
    el("path", {d, fill: "none", stroke: INK, "stroke-width": 20, "stroke-linecap": "round"}, g); g.p = el("path", {d, fill: "none", stroke: "#ffbe0b", "stroke-width": 10, "stroke-linecap": "round"}, g);
    const an = Math.atan2(B[1] - (my + oy), B[0] - (mx + ox)) * 180 / Math.PI; el("path", m9A({d: "M-24 -26 L26 0 L-24 26 Z", fill: "#ffbe0b", transform: `translate(${B[0]} ${B[1]}) rotate(${an})`}), g); return g; });
  s.band = el("rect", {x: -150, y: 0, width: 1500, height: 0, fill: "#7fd4ff", opacity: 0}, s.A);
  s.items = K.map((k, i) => { const g = m9Disc(s.A, k, RC[i]); g.x = P[i][0]; g.y = P[i][1]; return g; });
  const lx = i => P[i][0] + (i === 0 || i === 2 ? 250 : 0), ly = i => P[i][1] + (i === 0 || i === 2 ? -10 : 178);
  s.names = NM.map((n, i) => tx(s.A, {x: lx(i), y: ly(i), "text-anchor": "middle", "font-size": 50, "font-weight": 700, fill: INK}, n));
  s.where = ["in water", "in water", "in water", "on land, in the air"].map((w, i) => { const g = chip(s.A, w, i < 3 ? "#3a86ff" : "#8d99ae", {fs: 32}); g.x = lx(i); g.y = ly(i) + 50; return g; });
  s.tube = el("g", {}, s.A); el("path", {d: `M${P[1][0] - 58} ${P[1][1] - 60} L${P[1][0] - 20} ${P[1][1] - 150}`, stroke: INK, "stroke-width": 5, "stroke-linecap": "round"}, s.tube); s.tl = chip(s.tube, "breathing tube", INK, {fs: 28});
  s.four = chip(st, "4 stages", "#7209b7", {fs: 44});
  // real life: a flower pot on its plate in the corridor; in the plate's water, larvae and a pupa
  s.B = el("g", {}, st); el("rect", {x: -170, y: -80, width: 1960, height: 1120, fill: "#f3ead2"}, s.B); el("rect", {x: -170, y: 640, width: 1960, height: 400, fill: "#c9c2b2"}, s.B); el("line", {x1: -170, y1: 640, x2: 1790, y2: 640, stroke: INK, "stroke-width": 6}, s.B);
  s.pot = m9Pot(s.B); tf(s.pot, "translate(250 700) scale(1.25)");
  s.lens = el("g", {transform: "translate(830 440)"}, s.B); const cp = el("clipPath", {id: "m9lens"}, e9defs()); el("circle", {r: 300}, cp); const q = el("g", {"clip-path": "url(#m9lens)"}, s.lens);
  el("rect", {x: -310, y: -310, width: 620, height: 620, fill: "#eaf7ff"}, q); s.cut = m9PlateCut(q); tf(s.cut, "translate(-430 250) scale(1.35)");
  s.lar = [[310, 0], [420, 1.7], [520, 3.1]].map(([x, ph]) => { const L = m9Larva(s.cut.wat, .62); tf(L, `translate(${x} -105)`); L.ph = ph; return L; }); tf(m9Pupa(s.cut.wat, .5), "translate(590 -105)");
  el("circle", {r: 300, fill: "none", stroke: INK, "stroke-width": 12}, s.lens); el("path", {d: "M-190 232 L-430 300 M-250 -166 L-446 232", stroke: INK, "stroke-width": 5, "stroke-dasharray": "12 12", fill: "none"}, s.B);
  s.w1 = chip(st, "🪴 A flower pot plate with water left standing in it", INK, {fs: 36}); s.w2 = chip(st, "⚠️ Standing water = a home for young mosquitoes", "#e63946", {fs: 42});
  s.run = t => { const a = (w, f) => cue("textbook", w, f), t0 = SC.textbook.t0, tC = a("cycle", .37), T = [a("egg", .48), a("larva", .52), a("pupa", .56), a("adult", .59)], tW = a("first", .65), tWa = a("water", .75), tB = a("that's", .81) - .3, kB = ramp(t, tB, tB + .5);
    popAt(s.h, 600, 56, t, t0 - .2); op(s.h, on(t, t0 - .2, tB, .2)); op(s.A, 1 - kB); op(s.B, kB);
    op(s.mid, ramp(t, tC - .3, tC)); popAt(s.four, 600, 150, t, a("four", .4)); op(s.four, on(t, a("four", .4), T[0] - .1, .2));
    s.items.forEach((g, i) => { const hi = on(t, T[i], i < 3 ? T[i + 1] : T[i] + .9, .15), w = i < 3 ? on(t, tW, tB, .3) * .06 : 0; popAt(g, g.x, g.y, t, T[i] - .1, .92 * (1 + .14 * hi + w)); op(s.names[i], ramp(t, T[i], T[i] + .2)); });
    s.items[1].larva.run(t * 7);
    s.arr.forEach((g, i) => { const tt = i < 3 ? T[i + 1] - .25 : T[3] + .5; op(g, ramp(t, tt, tt + .3)); set(g.p, "stroke-dasharray", "26 20"); set(g.p, "stroke-dashoffset", -t * 60); });
    s.where.forEach((g, i) => popAt(g, g.x, g.y, t, i < 3 ? tWa - .5 + i * .18 : tWa + .5));
    op(s.tube, on(t, T[1] + .3, tB, .2)); popAt(s.tl, P[1][0] + 60, P[1][1] - 170, t, T[1] + .3);
    s.lar.forEach(L => L.run(t * 7 + L.ph)); tf(s.lens, `translate(830 440) scale(${Math.max(0, pop(t, tB + .5, .5))})`);
    popAt(s.w1, 600, 60, t, tB + .3); popAt(s.w2, 600, 850, t, a("standing", .9) - .2); };
  return s; })();

// ---- DENGUE: only females bite (they need blood to make eggs). Then: person with dengue -> mosquito -> the next person.
S.dengue = (() => { const s = scene("dengue", "#fde2e4", "#fad2e1"), st = s.stage, X = [190, 600, 1010], Y = 400;
  s.A = el("g", {}, st);
  s.f = el("g", {}, s.A); s.fd = m9Disc(s.f, "adultF", "#e63946"); m9T(s.f, 0, 196, "female", 54, INK); tx(s.f, {x: 0, y: 244, "text-anchor": "middle", "font-size": 34, "font-weight": 700, fill: INK}, "thin antennae"); s.ft = m9Tick(s.f, 30); s.fb = chip(s.f, "bites", "#e63946", {fs: 44});
  s.m = el("g", {}, s.A); s.md = m9Disc(s.m, "adultM", "#3a86ff"); m9T(s.m, 0, 196, "male", 54, INK); tx(s.m, {x: 0, y: 244, "text-anchor": "middle", "font-size": 34, "font-weight": 700, fill: INK}, "bushy antennae"); s.mx = m9X(s.m, 26); s.mb = chip(s.m, "does not bite", "#3a86ff", {fs: 44});
  s.eg = el("g", {}, s.A); emo(s.eg, -150, 0, 84, "🩸"); const ar = e9Arrow(s.eg, .6); set(ar.a, "fill", "#ffbe0b"); el("rect", m9A({x: 76, y: -52, width: 200, height: 104, rx: 22, fill: "#fff"}), s.eg); [[120, -16, -10], [166, 8, 12], [212, -14, 6], [148, 26, -4], [226, 22, 14]].forEach(([x, y, r]) => tf(m9Egg(s.eg, 1.5), `translate(${x} ${y}) rotate(${r})`));
  s.ec = chip(st, "She needs blood to make her eggs", "#e63946", {fs: 40});
  s.B = el("g", {}, st); s.h = chip(st, "🦟 How dengue spreads", "#e63946", {fs: 46});
  const person = (x, face, ring) => { const g = el("g", {}, s.B); el("circle", {r: 120, fill: "#fff", stroke: ring, "stroke-width": 8}, g); emo(g, 0, 4, 150, face); g.x = x; return g; };
  s.p1 = person(X[0], "🤒", "#e63946"); s.mq = m9Disc(s.B, "adultF", INK); s.mq.x = X[1]; s.p2 = person(X[2], "🙂", "#2a9d8f");
  s.ars = [0, 1].map(i => { const g = e9Arrow(s.B, .9); set(g.a, "fill", "#cfd3dc"); tf(g, `translate(${(X[i] + X[i + 1]) / 2} ${Y})`); return g; });
  s.bite = [0, 1].map(i => { const g = chip(s.B, i ? "bites again" : "bites", INK, {fs: 30}); return g; });
  s.names = ["a person with dengue", "a female Aedes mosquito", "the next person"].map((n, i) => tx(s.B, {x: X[i], y: Y + 186, "text-anchor": "middle", "font-size": 36, "font-weight": 700, fill: INK, "data-fit": 380}, n));
  s.v = el("g", {}, s.B); for (let i = 0; i < 10; i++) el("line", {x1: 0, y1: 0, x2: 30 * Math.cos(i * .628), y2: 30 * Math.sin(i * .628), stroke: "#7209b7", "stroke-width": 7, "stroke-linecap": "round"}, s.v); el("circle", {r: 20, fill: "#c77dff", stroke: "#7209b7", "stroke-width": 6}, s.v);
  s.vl = chip(s.B, "dengue virus", "#7209b7", {fs: 32});
  s.end = chip(st, "The mosquito carries the virus from person to person", "#7209b7", {fs: 38});
  s.run = t => { const a = (w, f) => cue("dengue", w, f), t0 = SC.dengue.t0, tO = a("only", 0), tBi = a("bite", .12), tBl = a("blood", .25), tW = a("when", .43) - .3, tB1 = a("bites", .57), tD = a("dengue", .65), tP = a("pass", .76), tN = a("next", .88), kB = ramp(t, tW, tW + .4);
    op(s.A, 1 - kB); op(s.B, kB); op(s.ec, +s.ec.getAttribute("opacity") * (1 - kB));
    tf(s.f, `translate(330 330) scale(${1.25 * Math.max(0, pop(t, tO - .1))})`); tf(s.m, `translate(880 330) scale(${1.25 * Math.max(0, pop(t, tO + .15))})`);
    popAt(s.ft, 104, -100, t, tBi - .1); popAt(s.fb, 0, -172, t, tBi - .1); popAt(s.mx, 104, -100, t, tBi + .5); popAt(s.mb, 0, -172, t, tBi + .5);
    tf(s.eg, `translate(540 760) scale(${Math.max(0, pop(t, tBl))})`); popAt(s.ec, 600, 860, t, tBl + .4); op(s.ec, on(t, tBl + .4, tW, .2));
    popAt(s.h, 600, 70, t, tW + .2); popAt(s.p1, X[0], Y, t, tD - .6, 1.1); popAt(s.mq, X[1], Y, t, tW + .2, 1.1); popAt(s.p2, X[2], Y, t, tN - .2, 1.1);
    s.names.forEach((n, i) => op(n, ramp(t, [tD - .5, tW + .3, tN - .1][i], [tD - .5, tW + .3, tN - .1][i] + .3)));
    s.ars.forEach((g, i) => { const tt = i ? tP : tD - .2, k = ramp(t, tt, tt + .3); op(g, k); set(g.a, "fill", mix("#cfd3dc", "#c77dff", ramp(t, tt + .2, tt + .8))); });
    popAt(s.bite[0], (X[0] + X[1]) / 2, Y - 74, t, tD - .2); popAt(s.bite[1], (X[1] + X[2]) / 2, Y - 74, t, tP + .1);
    const k1 = ease((t - tD - .1) / .9), k2 = ease((t - tP - .2) / 1.0), vx = lerp(lerp(X[0], X[1], k1), X[2], k2); tf(s.v, `translate(${vx} ${Y - 150 - 26 * Math.sin(Math.PI * (k2 > 0 ? k2 : k1))}) scale(${.8 + .1 * Math.sin(t * 6)})`); op(s.v, ramp(t, tD - .4, tD - .1));
    popAt(s.vl, vx, Y - 216, t, tD - .3); popAt(s.end, 600, 800, t, tN + .5); };
  return s; })();

// ---- TRY THIS: once a week, tip out standing water: a flower pot plate, a pail, a roof gutter. Break the life cycle!
S.try = (() => { const s = scene("try", "#caffbf", "#9bf6ff"), st = s.stage, X = [200, 600, 1000], Y = 600;
  s.h = chip(st, "✏️ Try this at home!", "#7209b7", {fs: 46}); s.wk = chip(st, "🗓️ Once a week: hunt for standing water", "#3a86ff", {fs: 40});
  s.cards = X.map(x => el("rect", {x: x - 180, y: 230, width: 360, height: 470, rx: 30, fill: "#fff", stroke: INK, "stroke-width": 6, filter: "url(#sh)"}, st));
  s.it = X.map((x, i) => el("g", {}, st)); s.tilt = [];
  // 1 the flower pot plate: lift the pot off, tip the plate
  { const g = s.it[0]; s.pot = m9Pot(g); tf(s.pot, "translate(0 40) scale(.74)"); s.pour0 = el("path", {d: "M100 40 Q150 60 150 130", fill: "none", stroke: "#7fd4ff", "stroke-width": 16, "stroke-linecap": "round"}, g); }
  // 2 the pail
  { const g = s.it[1], p = s.pail = el("g", {}, g); el("path", {d: "M-96 -150 Q0 -260 96 -150", fill: "none", stroke: INK, "stroke-width": 9, "stroke-linecap": "round"}, p);
    el("path", m9A({d: "M-104 -150 H104 L80 40 H-80 Z", fill: "#3a86ff"}), p); s.pw = el("ellipse", {cx: 0, cy: -150, rx: 98, ry: 20, fill: "#7fd4ff", stroke: INK, "stroke-width": 6}, p); el("path", {d: "M-70 -110 L-58 10", stroke: "#fff", "stroke-width": 10, "stroke-linecap": "round", opacity: .35}, p);
    s.pour1 = el("path", {d: "M120 -60 Q170 -20 166 120", fill: "none", stroke: "#7fd4ff", "stroke-width": 20, "stroke-linecap": "round"}, g); }
  // 3 the roof gutter: clear the leaves so the water runs away
  { const g = s.it[2]; el("path", m9A({d: "M-170 -90 L150 -250 L150 -200 L-170 -40 Z", fill: "#e76f51"}), g); for (let i = 0; i < 5; i++) el("line", {x1: -150 + i * 62, y1: -72 - i * 31, x2: -150 + i * 62, y2: -36 - i * 31, stroke: INK, "stroke-width": 4, opacity: .5}, g);
    el("path", m9A({d: "M-176 -30 H40 V20 Q40 50 10 50 H-146 Q-176 50 -176 20 Z", fill: "#adb5bd"}), g); s.gw = el("rect", {x: -170, y: -22, width: 204, height: 30, fill: "#7fd4ff", stroke: "#3a86ff", "stroke-width": 3}, g);
    s.lv = el("g", {}, g); [[-120, -20, 20], [-60, -26, -30], [0, -18, 60]].forEach(([x, y, r]) => el("path", m9A({d: "M-24 0 Q0 -18 24 0 Q0 18 -24 0 Z", fill: "#a47148", "stroke-width": 4, transform: `translate(${x} ${y}) rotate(${r})`}), s.lv));
    el("rect", m9A({x: 2, y: 46, width: 34, height: 110, fill: "#8d99ae"}), g); s.pour2 = el("path", {d: "M19 160 V230", fill: "none", stroke: "#7fd4ff", "stroke-width": 16, "stroke-linecap": "round"}, g); }
  s.names = ["flower pot plate", "pail", "roof gutter"].map((n, i) => tx(st, {x: X[i], y: 290, "text-anchor": "middle", "font-size": 40, "font-weight": 700, fill: INK}, n));
  s.ok = X.map(x => m9Tick(st, 34));
  s.tip = chip(st, "💧 Tip it out!", "#f77f00", {fs: 50}); s.brk = chip(st, "No water = no eggs, larvae or pupae. The life cycle breaks!", "#e63946", {fs: 36});
  s.run = t => { const a = (w, f) => cue("try", w, f), t0 = SC.try.t0, T = [a("flower", .45), a("pails", .58), a("roof", .64)], tT = a("tip", .77), tB = a("break", .86);
    popAt(s.h, 600, 60, t, t0 - .2); popAt(s.wk, 600, 150, t, a("once", .15));
    X.forEach((x, i) => { const k = Math.max(0, pop(t, T[i] - .15)); op(s.cards[i], clamp(k)); op(s.names[i], clamp(k)); const tk = ramp(t, tT + i * .25, tT + .6 + i * .25), dn = ramp(t, tT + .5 + i * .25, tT + 1.2 + i * .25);
      tf(s.it[i], `translate(${x} ${Y}) scale(${k})`); popAt(s.ok[i], x + 130, 640, t, tT + 1.1 + i * .25);
      if (i === 0) { tf(s.pot.pot, `translate(${-60 * tk} ${-70 * tk})`); tf(s.pot, `translate(0 40) scale(.74) rotate(${16 * tk * (1 - .0 * dn)} 110 0)`); op(s.pot.water, 1 - dn); op(s.pot.shine, 1 - dn); op(s.pour0, on(t, tT + .3, tT + 1.2, .2)); }
      if (i === 1) { tf(s.pail, `rotate(${62 * tk} 90 20)`); op(s.pw, 1 - .8 * dn); op(s.pour1, on(t, tT + .55, tT + 1.45, .2)); }
      if (i === 2) { tf(s.lv, `translate(${-70 * tk} ${-120 * tk}) rotate(${-30 * tk})`); op(s.lv, 1 - dn); set(s.gw, "height", 30 * (1 - dn)); set(s.gw, "y", -22 + 30 * dn); op(s.pour2, on(t, tT + .8, tT + 1.7, .2)); } });
    popAt(s.tip, 600, 770, t, tT); op(s.tip, on(t, tT, tB, .2)); popAt(s.brk, 600, 790, t, tB); };
  return s; })();

// ---- THINK ABOUT IT: why release only males, never females?
S.think = (() => { const s = scene("think", "#3a0ca3", "#7209b7"), st = s.stage;
  s.title = tx(st, {x: 600, y: 110, "text-anchor": "middle", "font-size": 76, "font-weight": 700, fill: "#ffe14d", class: "out", "stroke-width": 10}, "🤔 Think about it!");
  s.dev = m9Device(st); tf(s.dev, "translate(600 420) scale(1.7)"); s.dev.open(1);
  s.m = [0, 1, 2].map(i => { const g = el("g", {}, st), d = m9Disc(g, "adultM", "#06d6a0"); tf(m9Tick(g, 30), "translate(96 -96)"); return g; }); s.ml = m9T(st, 250, 0, "males: released", 44);
  s.f = el("g", {}, st); m9Disc(s.f, "adultF", "#e63946"); s.fx = m9X(s.f, 84); s.fl = m9T(st, 1010, 0, "females: never released", 44); s.q = emo(st, 1010, 190, 110, "❓");
  s.c = chip(st, "Why does Project Wolbachia release only MALE mosquitoes?", "#e63946", {fs: 40}); s.ans = chip(st, "Answer next time!", "#f72585", {fs: 46});
  s.run = t => { const a = (w, f) => cue("think", w, f), t0 = SC.think.t0, tM = a("male", .45), tF = a("females", .65), tR = a("release", .35);
    popAt(s.title, 0, 0, t, t0 - .2); op(s.dev, ramp(t, tR - .4, tR - .1));
    s.m.forEach((g, i) => popAt(g, [150, 330, 240][i], [330, 330, 520][i], t, tM - .1 + i * .15, .72)); set(s.ml, "y", 700); op(s.ml, ramp(t, tM + .2, tM + .5));
    popAt(s.f, 1010, 420, t, tF - .15, 1.05); set(s.fl, "y", 620); op(s.fl, ramp(t, tF + .1, tF + .4));
    tf(s.q, `translate(1010 190) scale(${Math.max(0, pop(t, tF + .4)) * (1 + .08 * Math.sin(t * 5))}) translate(-1010 -190)`);
    popAt(s.c, 600, 780, t, a("why", .15)); popAt(s.ans, 600, 860, t, a("next", .9)); };
  return s; })();

// ---- CLOSE: what to remember, then next time's teaser (rows from CFG.close; copied from ep02)
S.close = (() => { const s = scene("close", "#f15bb5", "#fee440");
  const CL = CFG.close || {}, rows = CL.rows || [];
  s.rows = rows.map(([e, lab, w, f, col], i) => ({c: chip(s.stage, e + "  " + lab, col, {fs: 42}), w, f, y: 150 + i * (rows.length > 3 ? 160 : 190)}));
  s.tease = chip(s.stage, CL.tease || "Next time!", "#3a0ca3", {fs: 40});
  s.run = t => { const tn = cue("close", CL.teaseWord || "next", .85);
    s.rows.forEach(r => { const tw = cue("close", r.w, r.f); popAt(r.c, 600, r.y, t, tw); op(r.c, ramp(t, tw - .05, tw + .1) * (1 - .6 * ramp(t, tn - .2, tn + .3))); });
    popAt(s.tease, 600, 820, t, tn); }; return s; })();
