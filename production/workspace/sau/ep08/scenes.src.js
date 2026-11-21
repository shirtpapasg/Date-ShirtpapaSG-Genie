/* TheOneApp, Explored EP08 "What did the crocodile eat?" (P6 food chains), set in the mangroves of Sungei Buloh Wetland Reserve.
   This file: the drawings every EP08 scene shares (crocodile, giant mudskipper, mangrove crab, mangrove leaf, mangrove tree,
   the wetland, the pupil) and the narrated scenes. The picture-only shots are in ep08/pov.js. Load after common.js.
   Rule 9 (true to the science): sesarmid crabs eat fallen mangrove leaves; giant mudskippers hunt crabs; saltwater crocodiles eat
   fish, mudskippers among them; every arrow points from the food to the eater. Rule 10: one kind of label per row.
   scenes.js is built from scenes.src.js by ep08/build.sh (it copies the series' pupil from ep02/coldopen.js as e8Kid). */

const e8o = {stroke: INK, "stroke-width": 6, "stroke-linejoin": "round", "stroke-linecap": "round"};
const e8A = (a, b) => Object.assign({}, e8o, a, b || {});
const e8defs = () => $("v").querySelector("defs");
let e8uid = 0;
function e8grad(kind, attrs, stops) { const id = "e8g" + (++e8uid); const g = el(kind, Object.assign({id}, attrs), e8defs());
  stops.forEach(([o, c, a]) => el("stop", {offset: o, "stop-color": c, "stop-opacity": a === undefined ? 1 : a}, g)); return `url(#${id})`; }
const e8FR = name => { const c = SC[name]; return c ? (tt => clamp((tt - c.t0) / Math.max(.1, c.t1 - c.t0))) : (() => 0); };
const e8q = (a, c, b, k) => [(1 - k) * (1 - k) * a[0] + 2 * (1 - k) * k * c[0] + k * k * b[0], (1 - k) * (1 - k) * a[1] + 2 * (1 - k) * k * c[1] + k * k * b[1]];

/* ---- saltwater crocodile, side view, facing right; the feet stand on y = 0; about 900 long. C.upper = the upper jaw (turn it
   about (165, -5) to open the mouth), C.lid = the closed eyelid, C.glow = a spot of energy in the belly. */
function e8Croc(p) { const C = el("g", {}, p), g = el("g", {transform: "translate(0 -74)"}, C), G = "#6f8f45", D = "#55723a", B = "#e6dea8";
  const leg = (x, far) => { const l = el("g", {}, g); el("path", e8A({d: `M${x - 26} 18 Q${x - 36} 52 ${x - 56} 58 L${x - 60} 74 H${x + 20} Q${x + 28} 50 ${x + 28} 18 Z`, fill: far ? D : G}), l);
    [-52, -34, -16].forEach(dx => el("path", {d: `M${x + dx} 74 l-7 -11 h14 Z`, fill: "#fff", stroke: INK, "stroke-width": 3, "stroke-linejoin": "round"}, l)); return l; };
  leg(-150, 1); leg(70, 1);
  el("path", e8A({d: "M-470 14 Q-330 -18 -170 -50 Q0 -82 150 -54 L165 44 Q0 66 -160 44 Q-320 34 -470 14 Z", fill: G}), g);
  el("path", {d: "M-440 17 Q-320 33 -160 43 Q0 64 163 43 L161 20 Q0 38 -160 20 Q-320 12 -440 17 Z", fill: B}, g);
  for (let i = 0; i < 13; i++) { const k = (i + .5) / 13, q = i < 6 ? e8q([-470, 14], [-330, -18], [-170, -50], (i + .6) / 6) : e8q([-170, -50], [0, -82], [150, -54], (i - 5.6) / 7.6);
    el("path", {d: `M${q[0] - 17} ${q[1] + 5} L${q[0] - 2} ${q[1] - 17} L${q[0] + 17} ${q[1] + 3} Z`, fill: D, stroke: INK, "stroke-width": 5, "stroke-linejoin": "round"}, g); }
  [[-250, 2], [-190, -16], [-110, -24], [-40, -30], [40, -32], [110, -24], [-150, 4], [-60, 0], [20, -2], [-320, 12]].forEach(([x, y]) => el("ellipse", {cx: x, cy: y, rx: 15, ry: 8, fill: D, opacity: .75}, g));
  C.glow = el("g", {opacity: 0}, g); el("circle", {cx: -20, cy: 0, r: 90, fill: "#ffe14d", filter: "url(#blur)"}, C.glow); el("circle", {cx: -20, cy: 0, r: 30, fill: "#fff3a0", stroke: INK, "stroke-width": 5}, C.glow);
  leg(-110, 0); leg(110, 0);
  // lower jaw with its teeth, then the upper jaw
  el("path", e8A({d: "M150 6 L410 20 Q424 30 408 40 L165 46 Z", fill: B}), g);
  for (let i = 0; i < 9; i++) { const x = 236 + i * 19; el("path", {d: `M${x} ${12 + i * 1} l6 -15 l7 15 Z`, fill: "#fff", stroke: INK, "stroke-width": 2.5, "stroke-linejoin": "round"}, g); }
  C.upper = el("g", {}, g);
  for (let i = 0; i < 10; i++) { const x = 226 + i * 19; el("path", {d: `M${x} ${5 - i * .4} l6 16 l7 -16 Z`, fill: "#fff", stroke: INK, "stroke-width": 2.5, "stroke-linejoin": "round"}, C.upper); }
  el("path", e8A({d: "M150 -54 Q185 -90 224 -68 Q262 -42 340 -38 Q378 -52 402 -42 Q426 -28 414 -2 Q300 4 160 12 Z", fill: G}), C.upper);
  el("ellipse", {cx: 398, cy: -33, rx: 8, ry: 5, fill: INK}, C.upper);
  el("circle", e8A({cx: 204, cy: -62, r: 17, fill: "#ffd23f", "stroke-width": 5}), C.upper); el("ellipse", {cx: 206, cy: -62, rx: 4.5, ry: 12, fill: INK}, C.upper);
  C.lid = el("g", {opacity: 0}, C.upper); el("circle", e8A({cx: 204, cy: -62, r: 17, fill: D, "stroke-width": 5}), C.lid); el("path", {d: "M190 -58 Q204 -50 218 -58", fill: "none", stroke: INK, "stroke-width": 4, "stroke-linecap": "round"}, C.lid);
  C.jaw = a => tf(C.upper, `rotate(${-a} 165 -5)`);
  return C; }

/* ---- giant mudskipper, side view, facing right, belly on y = 0; about 290 long. Bulging eyes on top of the head, and
   pectoral fins it props itself up on like arms (M.arm turns about (40, 14)). */
function e8Skipper(p) { const M = el("g", {}, p), g = el("g", {transform: "translate(0 -52)"}, M), B = "#9c8660", L = "#eadfc0", F = "#c2955a";
  el("path", e8A({d: "M-118 4 L-172 -28 Q-156 4 -172 36 Z", fill: F}), g);
  el("path", e8A({d: "M-92 -8 Q-70 -36 -30 -27 L-36 -17 Z", fill: F, "stroke-width": 5}), g);
  el("path", e8A({d: "M-22 -26 Q-22 -82 22 -72 Q36 -52 42 -32 Z", fill: F}), g);
  [[-6, -52], [8, -60], [18, -46], [2, -40]].forEach(([x, y]) => el("circle", {cx: x, cy: y, r: 3.5, fill: "#8fd3e8"}, g));
  el("path", e8A({d: "M-120 4 Q-60 -22 20 -32 Q78 -40 104 -18 Q122 4 104 26 Q60 38 0 31 Q-60 24 -120 4 Z", fill: B}), g);
  el("path", {d: "M-104 7 Q-40 24 20 28 Q70 32 104 23 Q60 18 0 14 Q-50 11 -104 7 Z", fill: L}, g);
  el("path", {d: "M-100 0 Q-30 -13 56 -15", fill: "none", stroke: "#5b4a34", "stroke-width": 7, "stroke-linecap": "round"}, g);
  [[-70, -8], [-44, 4], [-16, -22], [10, 0], [34, -24], [-88, 2], [60, 2]].forEach(([x, y]) => el("circle", {cx: x, cy: y, r: 3.2, fill: "#8fd3e8"}, g));
  el("path", {d: "M50 -8 Q43 8 52 22", fill: "none", stroke: INK, "stroke-width": 4, "stroke-linecap": "round"}, g);
  el("path", {d: "M113 8 Q94 19 70 13", fill: "none", stroke: INK, "stroke-width": 5, "stroke-linecap": "round"}, g);
  el("circle", e8A({cx: 58, cy: -42, r: 15, fill: "#86724f", "stroke-width": 5}), g); el("circle", {cx: 60, cy: -44, r: 8, fill: "#fff"}, g); el("circle", {cx: 62, cy: -44, r: 4.5, fill: INK}, g);
  el("circle", e8A({cx: 82, cy: -40, r: 19, fill: B, "stroke-width": 5}), g); el("circle", {cx: 86, cy: -43, r: 11.5, fill: "#fff", stroke: INK, "stroke-width": 2.5}, g); el("circle", {cx: 89, cy: -43, r: 6, fill: INK}, g); el("circle", {cx: 91, cy: -46, r: 2, fill: "#fff"}, g);
  M.arm = el("g", {transform: "translate(40 14)"}, g);
  el("path", e8A({d: "M-12 -6 Q16 2 26 26 L34 40 L10 46 L-4 38 Q-10 18 -24 6 Z", fill: F, "stroke-width": 5}), M.arm);
  [[6, 14, 14, 40], [14, 12, 26, 38], [-2, 16, 2, 38]].forEach(([a, b, c, d]) => el("line", {x1: a, y1: b, x2: c, y2: d, stroke: INK, "stroke-width": 2.5, "stroke-linecap": "round"}, M.arm));
  return M; }

/* ---- mangrove (sesarmid) crab, seen from the front, feet on y = 0; about 330 wide with its legs. K.cl = [left claw, right claw]. */
function e8Crab(p) { const K = el("g", {}, p), S = "#7a5646", R = "#e2553a";
  [-1, 1].forEach(s => { for (let i = 0; i < 4; i++) { const d = `M${s * 60} ${-40 + i * 5} L${s * (104 + i * 13)} ${-78 + i * 15} L${s * (122 + i * 15)} -2`;
    el("path", {d, fill: "none", stroke: INK, "stroke-width": 19, "stroke-linecap": "round", "stroke-linejoin": "round"}, K); el("path", {d, fill: "none", stroke: i % 2 ? "#8c6553" : S, "stroke-width": 9, "stroke-linecap": "round", "stroke-linejoin": "round"}, K); } });
  [-1, 1].forEach(s => { el("line", {x1: s * 50, y1: -88, x2: s * 56, y2: -112, stroke: INK, "stroke-width": 9, "stroke-linecap": "round"}, K);
    el("circle", {cx: s * 57, cy: -116, r: 11, fill: INK}, K); el("circle", {cx: s * 57 + 3, cy: -119, r: 3.5, fill: "#fff"}, K); });
  el("path", e8A({d: "M-80 -92 H80 L68 -26 Q0 -10 -68 -26 Z", fill: S}), K);
  el("path", {d: "M-70 -84 H70 L66 -66 H-66 Z", fill: "#94705c"}, K);
  el("path", {d: "M-30 -62 Q0 -50 30 -62 M-20 -76 V-58 M20 -76 V-58", fill: "none", stroke: INK, "stroke-width": 4, "stroke-linecap": "round", opacity: .6}, K);
  el("rect", {x: -18, y: -42, width: 36, height: 14, rx: 5, fill: "#4a3329", stroke: INK, "stroke-width": 3}, K);
  K.cl = [-1, 1].map(s => { const c = el("g", {transform: `translate(${s * 66} -40) scale(${s} 1)`}, K), a = el("g", {}, c);
    el("path", e8A({d: "M-6 -10 L30 -4 L30 16 L-6 12 Z", fill: "#b8432f", "stroke-width": 5}), a);
    el("path", e8A({d: "M22 -24 Q62 -38 88 -10 L56 0 L88 12 Q62 36 22 22 Z", fill: R, "stroke-width": 5}), a);
    el("path", {d: "M70 -22 Q82 -18 86 -11 L72 -7 Z M70 22 Q82 18 86 12 L72 8 Z", fill: "#ffd9c2"}, a); c.a = a; return c; });
  K.claws = up => K.cl.forEach(c => tf(c.a, `rotate(${-up})`));
  return K; }

/* ---- a mangrove (Rhizophora) leaf: thick, glossy, oval with a small point; the stalk is on the left; about 170 long */
function e8Leaf(p, col = "#3f9a5f", rib = "#2a6e41") { const g = el("g", {}, p);
  el("path", {d: "M-96 0 L-64 0", stroke: INK, "stroke-width": 13, "stroke-linecap": "round"}, g); el("path", {d: "M-96 0 L-64 0", stroke: rib, "stroke-width": 6, "stroke-linecap": "round"}, g);
  el("path", e8A({d: "M-70 0 Q-30 -48 30 -36 Q64 -24 84 0 Q64 24 30 36 Q-30 48 -70 0 Z", fill: col}), g);
  el("path", {d: "M-50 -8 Q-10 -34 36 -24", fill: "none", stroke: "#fff", "stroke-width": 7, "stroke-linecap": "round", opacity: .35}, g);
  el("path", {d: "M-66 0 H74 M-30 0 L-14 -24 M-30 0 L-14 24 M6 0 L22 -22 M6 0 L22 22 M40 0 L52 -14 M40 0 L52 14", fill: "none", stroke: rib, "stroke-width": 4, "stroke-linecap": "round"}, g);
  return g; }
function e8Sun(p, r = 70) { const g = el("g", {}, p); g.rays = el("g", {}, g);
  for (let i = 0; i < 12; i++) el("path", e8A({d: `M${-r * .2} ${-r * 1.12} L0 ${-r * 1.55} L${r * .2} ${-r * 1.12} Z`, fill: "#ffb703", "stroke-width": 5, transform: `rotate(${i * 30})`}), g.rays);
  el("circle", e8A({r, fill: "#ffd23f"}), g); el("path", {d: `M${-r * .55} ${-r * .3} Q${-r * .3} ${-r * .68} ${r * .1} ${-r * .66}`, fill: "none", stroke: "#fff", "stroke-width": r * .12, "stroke-linecap": "round", opacity: .6}, g); return g; }
// an energy arrow, 150 long, pointing right, centred on (0, 0); g.a is the shape to colour
function e8Arrow(p, sc = .6) { const g = el("g", {}, p); g.a = el("path", {d: "M-70 -14 H30 V-36 L80 0 L30 36 V14 H-70 Z", fill: "#cfd3dc", stroke: INK, "stroke-width": 6 / sc * .8, "stroke-linejoin": "round", transform: `scale(${sc})`}, g); return g; }

/* ---- a mangrove tree with arching prop roots; the mud is at y = 0 under the trunk; about 620 wide and 680 tall */
function e8Mangrove(p, sd = 5) { const g = el("g", {}, p); seed = sd;
  [[-300, 96], [290, 104], [-232, 156], [216, 172], [-154, 232], [142, 250], [-84, 292], [72, 300]].forEach(([x, h]) => { const d = `M${x * .06} ${-h} Q${x * .96} ${-h * .96} ${x} 8`;
    el("path", {d, fill: "none", stroke: INK, "stroke-width": 25, "stroke-linecap": "round"}, g); el("path", {d, fill: "none", stroke: "#8a6548", "stroke-width": 13, "stroke-linecap": "round"}, g); });
  el("path", e8A({d: "M-24 -170 Q-14 -330 -32 -480 H36 Q18 -330 26 -170 Z", fill: "#8a6548"}), g);
  const C = ["#2f7d4f", "#3f9a5f", "#27693f"];
  [[-170, -470, 160, 104], [170, -480, 165, 108], [-60, -400, 130, 84], [100, -410, 135, 84], [0, -570, 200, 122]].forEach(([x, y, rx, ry], i) => el("ellipse", e8A({cx: x, cy: y, rx, ry, fill: C[i % 3]}), g));
  for (let i = 0; i < 22; i++) { const x = -260 + rnd() * 520, y = -640 + rnd() * 300, a = rnd() * 180; el("path", {d: "M-16 0 Q0 -10 16 0 Q0 10 -16 0 Z", fill: "#5cb878", opacity: .8, transform: `translate(${x} ${y}) rotate(${a})`}, g); }
  return g; }
// a wooden boardwalk seen from the side: the deck's top is at y, from x0 to x1; k scales the timber
function e8Boardwalk(p, x0, x1, y, k = 1, legH = 150) { const g = el("g", {}, p), W = "#b98a5e", D = "#8a6240", sw = Math.max(2.5, 5 * k);
  for (let x = x0 + 40 * k; x < x1; x += 170 * k) el("rect", {x: x - 9 * k, y, width: 18 * k, height: legH * k, fill: D, stroke: INK, "stroke-width": sw}, g);
  for (let x = x0 + 40 * k; x < x1; x += 170 * k) el("rect", {x: x - 7 * k, y: y - 118 * k, width: 14 * k, height: 118 * k, fill: W, stroke: INK, "stroke-width": sw}, g);
  el("rect", {x: x0, y: y - 126 * k, width: x1 - x0, height: 16 * k, rx: 6 * k, fill: W, stroke: INK, "stroke-width": sw}, g);
  el("rect", {x: x0, y: y - 66 * k, width: x1 - x0, height: 10 * k, fill: W, stroke: INK, "stroke-width": sw * .8}, g);
  el("rect", {x: x0, y, width: x1 - x0, height: 26 * k, fill: W, stroke: INK, "stroke-width": sw}, g);
  for (let x = x0 + 30 * k; x < x1; x += 46 * k) el("line", {x1: x, y1: y + 3, x2: x, y2: y + 23 * k, stroke: D, "stroke-width": 2.5 * k + 1}, g);
  return g; }

/* ---- the wetland, full screen: sky, the far line of mangroves, murky water, and (o.bank) a mudbank in front with a mangrove.
   o.dawn = dawn colours; o.board = the boardwalk in the distance on the left. The horizon is at y = 430. */
function e8Swamp(p, o = {}) { const g = el("g", {}, p), dawn = o.dawn;
  fullRect(g, e8grad("linearGradient", {x1: 0, y1: 0, x2: 0, y2: 1}, dawn ? [[0, "#4b5a94"], [.2, "#b98aa8"], [.36, "#f6a878"], [.46, "#ffe2a8"]] : [[0, "#58b4ee"], [.46, "#dff4ff"]]));
  if (dawn) { el("circle", {cx: 330, cy: 420, r: 150, fill: "#fff3c4", filter: "url(#blur)", opacity: .9}, g); el("circle", {cx: 330, cy: 428, r: 56, fill: "#fff6d6"}, g); }
  seed = 31; let d = "M-170 440"; for (let x = -170; x <= 1800; x += 56) { const h = 54 + rnd() * 64; d += ` Q${x + 14} ${430 - h - 14} ${x + 28} ${430 - h} T${x + 56} ${430 - h + 16 * rnd()}`; } d += " L1800 440 Z";
  const far = dawn ? "#465a70" : "#3c8a5e";
  el("rect", {x: -170, y: 430, width: 1960, height: 610, fill: e8grad("linearGradient", {x1: 0, y1: 0, x2: 0, y2: 1}, dawn ? [[0, "#f3c79a"], [.25, "#a99aa6"], [1, "#55667c"]] : [[0, "#b9d8b8"], [.3, "#8fb89a"], [1, "#55806c"]])}, g);
  el("path", {d, fill: far, opacity: .28, transform: "translate(0 868) scale(1 -1)"}, g);
  el("path", {d, fill: far, stroke: INK, "stroke-width": 4, "stroke-linejoin": "round"}, g);
  for (let x = -150; x < 1790; x += 44) el("line", {x1: x, y1: 432, x2: x + (rnd() - .5) * 10, y2: 432 + 10 + rnd() * 12, stroke: INK, "stroke-width": 2.5, opacity: .5}, g);     // stilt roots at the water's edge
  seed = 12; for (let i = 0; i < 26; i++) { const y = 470 + rnd() * 540, x = -150 + rnd() * 1900, w = 40 + (y - 430) * .28; el("line", {x1: x, y1: y, x2: x + w, y2: y, stroke: "#fff", "stroke-width": 3 + (y - 430) / 150, "stroke-linecap": "round", opacity: dawn ? .3 : .28}, g); }
  if (o.board) { g.board = e8Boardwalk(g, -170, 700, 520, .5, 110); }
  if (o.bank !== false) { const b = g.bank = el("g", {}, g);
    g.tree = e8Mangrove(b, 5); tf(g.tree, "translate(1540 800) scale(1.18)");
    el("path", e8A({d: "M300 1060 Q360 815 640 772 Q900 742 1250 764 Q1560 784 1800 760 L1800 1060 Z", fill: "#8b6f58"}), b);
    el("path", {d: "M420 880 Q520 800 700 786 Q900 766 1200 780", fill: "none", stroke: "#a98b70", "stroke-width": 10, "stroke-linecap": "round", opacity: .8}, b);
    [[560, 900, 70, 14], [1180, 880, 90, 16], [820, 960, 120, 18], [1480, 930, 80, 14]].forEach(([x, y, rx, ry]) => el("ellipse", {cx: x, cy: y, rx, ry, fill: "#75593f", opacity: .7}, b));
    seed = 77; for (let i = 0; i < 16; i++) { const x = 480 + rnd() * 1250, y = 800 + rnd() * 150, h = 26 + rnd() * 34; if (x > 520 && x < 1340 && y < 850) continue;
      el("path", {d: `M${x - 6} ${y} L${x - 2} ${y - h} L${x + 3} ${y - h} L${x + 7} ${y} Z`, fill: "#5b4636", stroke: INK, "stroke-width": 3, "stroke-linejoin": "round"}, b); } }      // pencil roots
  return g; }
function e8Mist(p, n = 5, sd = 3) { const g = el("g", {}, p); seed = sd; g.m = [];
  for (let i = 0; i < n; i++) g.m.push({e: el("ellipse", {rx: 420 + rnd() * 260, ry: 34 + rnd() * 26, fill: "#fff", filter: "url(#blur)", opacity: .5}, g), x: -100 + rnd() * 1800, y: 450 + rnd() * 260, v: 8 + rnd() * 14});
  g.run = u => g.m.forEach(m => { set(m.e, "cx", m.x + m.v * u); set(m.e, "cy", m.y); }); return g; }

/*KID*/
function e8Pose(K, sw = 0, arm) { tf(K.legN, `translate(16 -120) rotate(${sw})`); tf(K.legF, `translate(-14 -120) rotate(${-sw})`); tf(K.armF, `translate(-6 -300) rotate(${sw * .9})`);
  tf(K.armN, `translate(10 -300) rotate(${arm === undefined ? -sw * .9 : arm})`); }

/* ---- one link of the chain in a white disc (radius 120): "sun", "leaf", "leafF" (a fallen leaf), "crab", "skipper", "croc" */
function e8Item(p, kind, ring = INK) { const g = el("g", {}, p), id = "e8c" + (++e8uid); const cp = el("clipPath", {id}, e8defs()); el("circle", {r: 116}, cp);
  g.disc = el("circle", {r: 120, fill: "#fff", stroke: ring, "stroke-width": 8}, g); const c = el("g", {"clip-path": `url(#${id})`}, g), q = el("g", {}, c); g.pic = q;
  if (kind === "sun") e8Sun(q, 54);
  else if (kind === "leaf") tf(e8Leaf(q), "translate(6 0) rotate(-24) scale(1.12)");
  else if (kind === "leafF") tf(e8Leaf(q, "#d9a441", "#9a6a1f"), "translate(6 0) rotate(14) scale(1.12)");
  else if (kind === "crab") tf(e8Crab(q), "translate(0 56) scale(.6)");
  else if (kind === "skipper") tf(e8Skipper(q), "translate(22 44) scale(.66)");
  else if (kind === "croc") tf(e8Croc(q), "translate(-178 52) scale(.62)");
  el("circle", {r: 120, fill: "none", stroke: ring, "stroke-width": 8}, g); return g; }
const E8NAME = {sun: "the Sun", leaf: "mangrove leaf", leafF: "fallen leaf", crab: "mangrove crab", skipper: "mudskipper", croc: "crocodile"};

// ============================================================ NARRATED SCENES ============================================================

// ---- HOOK: the crocodile on its mudbank at Sungei Buloh. Apex predator. But where did its energy come from? Let's rewind!
S.hook = (() => { const s = scene("hook", "#58b4ee", "#55806c"); s.cam = el("g", {}, s.stage);
  s.sw = e8Swamp(s.cam, {board: true}); s.croc = e8Croc(s.cam); tf(s.croc, "translate(880 800)");
  s.sep = fullRect(s.stage, "#a8703a", 0); set(s.sep, "style", "mix-blend-mode:multiply");
  s.name = chip(s.stage, "saltwater crocodile", "#2a9d8f", {fs: 44});
  s.loc = chip(s.stage, "📍 Sungei Buloh Wetland Reserve, Singapore", INK, {fs: 36});
  s.apex = chip(s.stage, "👑 APEX PREDATOR: nothing here hunts it", "#e63946", {fs: 46});
  s.q = tx(s.stage, {x: 810, y: 300, "text-anchor": "middle", "font-size": 84, "font-weight": 700, fill: "#ffe14d", class: "out", "stroke-width": 14}, "Where did its energy come from?");
  s.rw = el("g", {}, s.stage); tx(s.rw, {x: 0, y: 0, "text-anchor": "middle", "font-size": 190, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 26}, "⏪ REWIND!");
  s.run = t => { const a = (w, f) => cue("hook", w, f), tA = a("apex", .55), tE = a("energy", .75), tR = a("rewind", .93);
    const z = 1.16 + .12 * ramp(t, SC.hook.t0, tA) + .34 * ramp(t, tA - .3, tA + .6) - .25 * ramp(t, tE - .3, tE + .5), k = ramp(t, tA - .3, tA + .6) * (1 - ramp(t, tE - .3, tE + .5)), r = ramp(t, tR - .1, tR + .5);
    tf(s.cam, `translate(${VP[0]} ${VP[1]}) rotate(${-9 * r}) scale(${z * (1 + .1 * r)}) translate(${-lerp(840, 1090, k)} ${-lerp(520, 700, k)})`);
    s.croc.jaw(22 * on(t, tA - .2, tE - .2, .5)); op(s.croc.glow, on(t, tE - .1, 1e9, .4) * (.75 + .25 * Math.sin(t * 7)));
    popAt(s.name, 810, 500, t, a("crocodile", .1) - .1); op(s.name, on(t, a("crocodile", .1) - .1, tA - .4, .2));
    popAt(s.loc, 950, 130, t, a("sungei", .2) - .1); op(s.loc, on(t, a("sungei", .2) - .1, tA - .2, .2));
    popAt(s.apex, 810, 180, t, tA); op(s.apex, on(t, tA, tE - .2, .2));
    tf(s.q, `translate(810 300) scale(${Math.max(0, pop(t, tE + .1))}) translate(-810 -300)`); op(s.q, on(t, tE + .1, tR - .05, .15));
    op(s.sep, .55 * r); tf(s.rw, `translate(810 470) scale(${Math.max(0, pop(t, tR, .4))}) rotate(${-6 + 3 * Math.sin(t * 9)})`); op(s.rw, ramp(t, tR - .05, tR + .1)); };
  return s; })();

// ---- LAST TIME'S ANSWER: why your face turns red after running (a PE lesson): muscles make heat, more blood flows near the skin
S.answer = (() => { const s = scene("answer", "#3a0ca3", "#4361ee"), ST = s.stage, st = el("g", {transform: "translate(600 440) scale(1.34) translate(-600 -430)"}, ST), SKIN = "#f1c27d";
  s.top = chip(ST, "✅ Last time: why does your face turn red after running?", "#06d6a0", {fs: 38, ink: INK});
  // the pupil running at PE
  s.run1 = el("g", {}, st); el("rect", {x: 30, y: 668, width: 330, height: 60, rx: 12, fill: "#e76f51", stroke: INK, "stroke-width": 6}, s.run1);
  [80, 150, 220, 290].forEach(x => el("line", {x1: x, y1: 698, x2: x + 36, y2: 698, stroke: "#fff", "stroke-width": 6, "stroke-linecap": "round"}, s.run1));
  s.kidG = el("g", {transform: "translate(190 690) scale(.66)"}, s.run1); s.kid = e8Kid(s.kidG); op(s.kid.bag, 0);
  s.hot = el("g", {}, s.run1); [[150, 590], [190, 560], [232, 596]].forEach(([x, y]) => el("path", {d: `M${x} ${y} q-13 -17 0 -34 q13 -17 0 -34 q-13 -17 0 -34`, fill: "none", stroke: "#ff5d3b", "stroke-width": 9, "stroke-linecap": "round"}, s.hot));
  tx(s.run1, {x: 195, y: 330, "text-anchor": "middle", "font-size": 40, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 8}, "running at PE");
  // the face
  s.face = el("g", {}, st); const f = el("g", {}, s.face);
  [-1, 1].forEach(k => el("ellipse", e8A({cx: k * 150, cy: 12, rx: 22, ry: 30, fill: SKIN}), f));
  el("circle", e8A({r: 150, fill: SKIN}), f); s.red = el("circle", {r: 146, fill: "#ff3b30", opacity: 0}, f);
  s.cheek = [-1, 1].map(k => el("circle", {cx: k * 84, cy: 52, r: 40, fill: "#ff3b30", opacity: .25}, f));
  el("path", e8A({d: "M-153 -16 Q-172 -172 0 -174 Q172 -172 153 -16 Q118 -92 40 -98 Q-44 -100 -153 -16 Z", fill: "#3d2c1e"}), f);
  [-1, 1].forEach(k => { el("ellipse", {cx: k * 54, cy: -6, rx: 14, ry: 18, fill: INK}, f); el("circle", {cx: k * 54 + 4, cy: -13, r: 5, fill: "#fff"}, f); });
  el("path", e8A({d: "M-38 60 Q0 74 38 60 Q30 104 0 104 Q-30 104 -38 60 Z", fill: "#7a1c1c", "stroke-width": 5}), f);
  s.sweat = [[-128, -40], [132, 6]].map(([x, y]) => el("path", e8A({d: `M${x} ${y - 20} Q${x + 15} ${y + 6} ${x} ${y + 12} Q${x - 15} ${y + 6} ${x} ${y - 20} Z`, fill: "#7fd4ff", "stroke-width": 4}), f));
  tx(s.face, {x: 0, y: 232, "text-anchor": "middle", "font-size": 40, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 8}, "your face");
  // under the skin: blood vessels near the surface get wider; the heat leaves through the skin
  s.skin = el("g", {}, st); const id = "e8sk", cp = el("clipPath", {id}, e8defs()); el("circle", {r: 170}, cp); const k = el("g", {"clip-path": `url(#${id})`}, s.skin);
  el("rect", {x: -180, y: -180, width: 360, height: 360, fill: "#bfe6ff"}, k); el("rect", {x: -180, y: -40, width: 360, height: 230, fill: "#f6c1a8"}, k);
  el("rect", {x: -180, y: -62, width: 360, height: 44, fill: SKIN, stroke: INK, "stroke-width": 5}, k);
  const vd = "M-180 30 Q-90 0 0 30 T180 30"; el("path", {d: "M-180 112 Q-90 88 0 112 T180 112", fill: "none", stroke: "#9d0208", "stroke-width": 30, opacity: .8}, k);
  s.vo = el("path", {d: vd, fill: "none", stroke: INK}, k); s.v = el("path", {d: vd, fill: "none", stroke: "#e5383b"}, k); s.vf = el("path", {d: vd, fill: "none", stroke: "#ff8fa3", "stroke-dasharray": "14 26", "stroke-linecap": "round"}, k);
  s.heat = [-96, -32, 32, 96].map(x => { const h = el("g", {}, k); el("path", {d: `M${x} 0 q-13 -17 0 -34 q13 -17 0 -34 q-13 -17 0 -34 q13 -14 0 -26`, fill: "none", stroke: "#ff5d3b", "stroke-width": 9, "stroke-linecap": "round"}, h);
    el("path", {d: `M${x - 16} -118 L${x} -146 L${x + 16} -118 Z`, fill: "#ff5d3b", stroke: "#ff5d3b", "stroke-width": 4, "stroke-linejoin": "round"}, h); return h; });
  el("circle", {r: 170, fill: "none", stroke: INK, "stroke-width": 9}, s.skin);
  tx(s.skin, {x: 0, y: 232, "text-anchor": "middle", "font-size": 40, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 8}, "under your skin");
  s.zoom = el("path", {d: "M700 330 L800 260 M700 470 L800 560", fill: "none", stroke: "#fff", "stroke-width": 5, "stroke-dasharray": "10 10"}, st);
  s.c = [["1  muscles make heat", "#f77f00", 80], ["2  more blood near the skin", "#e63946", 610], ["3  the heat gets out", "#2a9d8f", 1130]].map(([l, c, x]) => { const g = chip(ST, l, c, {fs: 38}); g.x = x; return g; });
  s.run = t => { const a = (w, f) => cue("answer", w, f), t0 = SC.answer.t0, tM = a("muscles", .4), tB = a("blood", .6), tL = a("let", .75);
    popAt(s.top, 660, 60, t, t0 - .2);
    const ph = (t - t0) * 9, sw = 34 * Math.sin(ph); op(s.run1, ramp(t, t0, t0 + .3)); e8Pose(s.kid, sw); tf(s.kid.body, `translate(0 ${-10 * Math.abs(Math.cos(ph))}) rotate(7 0 -120)`);
    op(s.hot, on(t, tM, 1e9, .3) * (.6 + .4 * Math.sin(t * 8)));
    popAt(s.face, 600, 420, t, a("face", .15) - .2); const fl = ramp(t, tB, tB + 1.2); op(s.red, .34 * fl); s.cheek.forEach(c => op(c, .25 + .6 * fl)); s.sweat.forEach(e => op(e, ramp(t, tM, tM + .4)));
    popAt(s.skin, 980, 420, t, tB - .5); op(s.zoom, ramp(t, tB - .3, tB)); const w = lerp(12, 34, fl); set(s.vo, "stroke-width", w + 10); set(s.v, "stroke-width", w); set(s.vf, "stroke-width", w * .3); set(s.vf, "stroke-dashoffset", -t * (40 + 60 * fl));
    s.heat.forEach((h, i) => { const kk = ramp(t, tL + i * .12, tL + .5 + i * .12); op(h, kk); tf(h, `translate(0 ${24 * (1 - kk) - 8 * Math.sin(t * 5 + i)})`); });
    s.c.forEach((c, i) => popAt(c, c.x, 868, t, [tM, tB, tL][i])); };
  return s; })();

// ---- NEWS: a Singapore fact. The largest reptile in the world (drawn to scale beside a pupil); then a school trip on the boardwalk
S.news = (() => { const s = scene("news", "#0b6e6e", "#073b4c"), st = s.stage;
  s.A = el("g", {transform: "translate(600 470) scale(1.3) translate(-640 -520)"}, st);
  el("line", {x1: 60, y1: 560, x2: 1250, y2: 560, stroke: "#fff", "stroke-width": 6, "stroke-linecap": "round", opacity: .5}, s.A);
  s.croc = e8Croc(s.A); tf(s.croc, "translate(560 560)");                                   // 894 px long = about 5 m, so 1 m = 179 px
  s.kidG = el("g", {transform: "translate(1140 560) scale(.495)"}, s.A); s.kid = e8Kid(s.kidG); e8Pose(s.kid, 0);      // a 1.4 m pupil = 250 px
  s.ruler = el("g", {}, s.A); el("path", {d: "M90 640 H984 M90 620 V660 M984 620 V660", fill: "none", stroke: "#ffe14d", "stroke-width": 7, "stroke-linecap": "round"}, s.ruler);
  for (let i = 1; i < 5; i++) el("line", {x1: 90 + i * 178.8, y1: 628, x2: 90 + i * 178.8, y2: 652, stroke: "#ffe14d", "stroke-width": 5}, s.ruler);
  tx(s.ruler, {x: 537, y: 712, "text-anchor": "middle", "font-size": 46, "font-weight": 700, fill: "#ffe14d", class: "out", "stroke-width": 8}, "a big male: about 5 metres long");
  s.kl = el("g", {}, s.A); el("path", {d: "M1232 310 V560 M1218 310 H1246 M1218 560 H1246", fill: "none", stroke: "#fff", "stroke-width": 6, "stroke-linecap": "round"}, s.kl);
  tx(s.kl, {x: 1140, y: 640, "text-anchor": "middle", "font-size": 38, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 8}, "you: about");
  tx(s.kl, {x: 1140, y: 684, "text-anchor": "middle", "font-size": 38, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 8}, "1.4 metres");
  s.top = chip(st, "🇸🇬 Singapore fact", "#f72585", {fs: 44});
  s.big = chip(st, "🏆 the largest reptile in the world", "#f77f00", {fs: 44});
  s.few = chip(st, "A few live wild in Singapore's mangroves", "#2a9d8f", {fs: 40});
  // the school trip: pupils on the boardwalk, the sign, and the crocodile far away across the water
  s.B = el("g", {}, st); s.sw = e8Swamp(s.B, {bank: false});
  const fb = el("g", {}, s.B); tf(e8Mangrove(fb, 9), "translate(1560 640) scale(.62)");
  el("path", e8A({d: "M1000 660 Q1150 610 1400 616 Q1650 620 1800 650 L1800 700 Q1400 690 1000 660 Z", fill: "#8b6f58", "stroke-width": 5}), fb);
  s.croc2 = e8Croc(fb); tf(s.croc2, "translate(1330 640) scale(.42)");
  s.bw = e8Boardwalk(s.B, -170, 1000, 790, 1.15, 260);
  s.kids = [[150, 0, .6], [330, -74, .64], [520, 0, .6]].map(([x, arm, sc], i) => { const g = el("g", {transform: `translate(${x} 790) scale(${sc})`}, s.B), K = e8Kid(g); e8Pose(K, 0, arm || undefined); if (i === 1) { op(K.m0, 0); op(K.m1, 1); } return K; });
  s.sign = el("g", {transform: "translate(800 790)"}, s.B); el("rect", {x: -9, y: -250, width: 18, height: 250, fill: "#6c757d", stroke: INK, "stroke-width": 5}, s.sign);
  el("rect", e8A({x: -170, y: -420, width: 340, height: 220, rx: 18, fill: "#ffd23f"}), s.sign); el("rect", {x: -156, y: -406, width: 312, height: 192, rx: 10, fill: "none", stroke: INK, "stroke-width": 4}, s.sign);
  tx(s.sign, {x: 0, y: -350, "text-anchor": "middle", "font-size": 38, "font-weight": 700, fill: "#c1121f"}, "⚠ CROCODILES");
  tx(s.sign, {x: 0, y: -298, "text-anchor": "middle", "font-size": 30, "font-weight": 700, fill: INK}, "Keep a safe distance");
  tx(s.sign, {x: 0, y: -252, "text-anchor": "middle", "font-size": 30, "font-weight": 700, fill: INK}, "Stay on the path");
  s.trip = chip(st, "🎒 A school trip to Sungei Buloh Wetland Reserve", INK, {fs: 38});
  s.safe = chip(st, "✅ Stay on the path · keep a safe distance", "#2a9d8f", {fs: 40});
  s.run = t => { const a = (w, f) => cue("news", w, f), t0 = SC.news.t0, tB = a("at", .68) - .35, kB = ramp(t, tB, tB + .5);
    op(s.A, 1 - kB); op(s.B, kB); tf(s.B, `translate(${VP[0]} ${VP[1]}) scale(${1.12 - .12 * ramp(t, tB, tB + 5)}) translate(${-VP[0]} ${-VP[1]})`);
    popAt(s.top, 760, 60, t, t0 - .2); op(s.top, on(t, t0 - .2, tB, .2));
    popAt(s.croc, 560, 560, t, a("saltwater", .1) - .3); op(s.ruler, ramp(t, a("largest", .25), a("largest", .25) + .4)); op(s.kidG, ramp(t, a("reptiles", .32), a("reptiles", .32) + .3)); op(s.kl, ramp(t, a("reptiles", .32) + .2, a("reptiles", .32) + .5));
    popAt(s.big, 640, 150, t, a("largest", .25)); op(s.big, on(t, a("largest", .25), tB, .2));
    popAt(s.few, 640, 850, t, a("few", .42)); op(s.few, on(t, a("few", .42), tB, .2));
    popAt(s.trip, 930, 110, t, tB + .3); popAt(s.safe, 900, 850, t, a("keep", .9) - .1); };
  return s; })();

// ---- RECAP: the rewind, on a board. The chain reads Sun -> leaf -> crab -> mudskipper -> crocodile; it lights from the
// crocodile backwards as Heart names each step, and each arrow (food -> eater) lights when she says who was eaten.
S.recap = (() => { const s = scene("recap", "#fff3b0", "#ffd6a5"), st = s.stage, K = ["sun", "leafF", "crab", "skipper", "croc"], X = i => 810 + (i - 2) * 335;
  s.title = tx(st, {x: 810, y: 140, "text-anchor": "middle", "font-size": 84, "font-weight": 700, fill: INK}, "⏪ You rewound the crocodile's lunch");
  s.arr = [0, 1, 2, 3].map(i => { const g = e8Arrow(st, .5); return g; });
  s.cards = K.map((k, i) => { const g = el("g", {}, st); el("rect", {x: -98, y: -150, width: 196, height: 330, rx: 28, fill: "#fff", stroke: INK, "stroke-width": 6, filter: "url(#sh)"}, g);
    tf(e8Item(g, k, ["#ffbe0b", "#2a9d8f", "#f77f00", "#3a86ff", "#e63946"][i]), "translate(0 -36) scale(.78)");
    tx(g, {x: 0, y: 122, "text-anchor": "middle", "font-size": 30, "font-weight": 700, fill: INK, "data-fit": 176}, E8NAME[k]); g.x = X(i); return g; });
  s.arr.forEach(g => st.appendChild(g));
  s.say = [["The crocodile ate a mudskipper", "#e63946"], ["The mudskipper ate a crab", "#3a86ff"], ["The crab ate a fallen mangrove leaf", "#f77f00"], ["The leaf made its food from sunlight", "#2a9d8f"]].map(([l, c]) => chip(st, l, c, {fs: 54}));
  s.run = t => { const a = (w, f) => cue("recap", w, f), T = [a("sunlight", .93), a("leaf", .7), a("crab", .45), a("mudskipper", .28), a("crocodile", .18)], TA = [a("sunlight", .93), a("leaf", .7), a("crab", .45), a("mudskipper", .28)];
    op(s.title, ramp(t, SC.recap.t0 - .1, SC.recap.t0 + .3));
    s.cards.forEach((g, i) => { const now = on(t, T[i] - .1, T[i] + 1.5, .2); tf(g, `translate(${g.x} ${430 - 26 * now}) scale(${1.45 * (1 + .12 * now)})`); op(g, t >= T[i] - .1 ? 1 : .28); });
    s.arr.forEach((g, i) => { const k = ramp(t, TA[i], TA[i] + .3); set(g.a, "fill", mix("#cfd3dc", "#ffbe0b", k)); op(g, .35 + .65 * k); tf(g, `translate(${X(i) + 167} 410) scale(${1 + .35 * on(t, TA[i], TA[i] + .7, .2)})`); });
    const ST = [a("crocodile", .18), a("mudskipper#2", .4), a("crab#2", .6), a("leaf#2", .85)]; s.say.forEach((c, i) => { popAt(c, 810, 800, t, ST[i] - .1); op(c, on(t, ST[i] - .1, i < 3 ? ST[i + 1] - .15 : 1e9, .15)); }); };
  return s; })();

// ---- TEXTBOOK (P6 food chains). Three rows under the pictures, one kind of label each: the names; producer or consumer;
// predator or prey. The Sun shines light energy on the leaf. Arrows point from the food to the eater.
S.textbook = (() => { const s = scene("textbook", "#e0fbfc", "#c2dfe3"), st = s.stage, K = ["leaf", "crab", "skipper", "croc"], X = i => 240 + i * 290, Y = 330;
  s.h = chip(st, "📘 Primary 6 · Food chains", "#3a0ca3", {fs: 44});
  s.who = chip(st, "A food chain shows who eats whom", INK, {fs: 40});
  s.sun = e8Sun(st, 50); s.ray = el("g", {}, st); [[96, 150, 172, 252], [78, 176, 150, 268], [116, 132, 196, 236]].forEach(([a, b, c, d]) => el("line", {x1: a, y1: b, x2: c, y2: d, stroke: "#ffbe0b", "stroke-width": 10, "stroke-linecap": "round", "stroke-dasharray": "22 16"}, s.ray));
  s.le = chip(st, "light energy", "#ffbe0b", {fs: 30, ink: INK});
  s.arr = [0, 1, 2].map(i => { const g = e8Arrow(st, .5); g.x = X(i) + 145; return g; });
  s.dots = [0, 1, 2].map(() => el("circle", {r: 13, fill: "#fff3a0", stroke: "#f77f00", "stroke-width": 5}, st));
  s.items = K.map((k, i) => { const g = e8Item(st, k, ["#2a9d8f", "#f77f00", "#f77f00", "#f77f00"][i]); g.x = X(i); return g; });
  const lab = (x, y, t, fs, col) => tx(st, {x, y, "text-anchor": "middle", "font-size": fs, "font-weight": 700, fill: col || INK, "data-fit": 270}, t);
  s.names = K.map((k, i) => lab(X(i), 510, E8NAME[k], 36));
  const pill = (x, y, t, col) => { const g = el("g", {}, st); el("rect", {x: -128, y: -34, width: 256, height: 68, rx: 34, fill: col, stroke: INK, "stroke-width": 5, filter: "url(#sh)"}, g); tx(g, {x: 0, y: 13, "text-anchor": "middle", "font-size": 38, "font-weight": 700, fill: "#fff"}, t); g.x = x; g.y = y; return g; };
  s.roles = K.map((k, i) => pill(X(i), 590, i ? "consumer" : "producer", i ? "#f77f00" : "#2a9d8f"));
  s.hunt = [pill(X(2), 680, "prey", "#3a86ff"), pill(X(3), 680, "predator", "#e63946")];
  s.rl = [];
  s.make = chip(st, "🌿 Green plants make their own food", "#2a9d8f", {fs: 34}); s.eat = chip(st, "🍽️ Animals eat plants or other animals", "#f77f00", {fs: 34});
  s.flow = chip(st, "➡️ The arrows show the way energy flows", "#7209b7", {fs: 38}); s.fe = chip(st, "from the FOOD  →  to the EATER", "#e63946", {fs: 44});
  s.run = t => { const a = (w, f) => cue("textbook", w, f), t0 = SC.textbook.t0, tW = a("chain", .2), tG = a("green", .3), tP = a("producers", .33), tL = a("light", .42), tAn = a("animals", .47), tC = a("consumers", .5),
      tPr = a("predator", .68), tPy = a("prey", .77), tAr = a("arrows", .82), tF = a("from", .93), tE = a("eater", .98);
    popAt(s.h, 760, 56, t, t0 - .2); op(s.h, ramp(t, t0 - .2, t0) * (1 - on(t, tG - .3, tAr + .3, .3))); popAt(s.who, 700, 150, t, tW); op(s.who, on(t, tW, tG - .2, .2));
    s.items.forEach((g, i) => { popAt(g, g.x, Y, t, tW + .15 * i, .85 * (1 + .1 * (i === 0 ? on(t, tG, tAn - .3, .3) : on(t, tAn, tPr - .4, .3)) + .12 * (i === 3 ? on(t, tPr, tPy - .2, .25) : i === 2 ? on(t, tPy, tAr - .3, .25) : 0))); });
    s.names.forEach((n, i) => op(n, ramp(t, tW + .3 + .15 * i, tW + .6 + .15 * i)));
    s.arr.forEach((g, i) => { const k = ramp(t, tW + .5 + .15 * i, tW + .8 + .15 * i), lit = ramp(t, tAr + i * .25, tAr + .3 + i * .25); op(g, k); set(g.a, "fill", mix("#cfd3dc", "#ffbe0b", lit)); tf(g, `translate(${g.x} ${Y}) scale(${1 + .3 * on(t, tAr + i * .25, tAr + .8 + i * .25, .2)})`); });
    s.dots.forEach((d, i) => { const ph = ((t - tAr) * .9 - i * .18) % 1, vis = t > tAr + .2 ? Math.sin(Math.PI * clamp(ph)) : 0; set(d, "cx", lerp(X(i) + 70, X(i + 1) - 70, clamp(ph))); set(d, "cy", Y - 62); op(d, vis); });
    tf(s.ray, "translate(12 36)"); tf(s.sun, `translate(86 164) scale(${Math.max(0, pop(t, tG - .2)) * (1 + .08 * on(t, tL, tL + 1.2, .3))})`); op(s.ray, ramp(t, tL - .3, tL)); set(s.ray, "stroke-dashoffset", 0); [...s.ray.children].forEach(l => set(l, "stroke-dashoffset", -(t - tL) * 60));
    popAt(s.le, 290, 190, t, tL); op(s.le, on(t, tL, 1e9, .2));
    s.roles.forEach((g, i) => popAt(g, g.x, g.y, t, i ? tC + .12 * (i - 1) : tP)); popAt(s.hunt[1], s.hunt[1].x, s.hunt[1].y, t, tPr); popAt(s.hunt[0], s.hunt[0].x, s.hunt[0].y, t, tPy);
    popAt(s.make, 820, 130, t, tP + .9); op(s.make, on(t, tP + .9, tAn - .1, .2)); popAt(s.eat, 780, 190, t, tC + .9); op(s.eat, on(t, tC + .9, tPr - .2, .2));
    popAt(s.flow, 600, 800, t, tAr + .2); op(s.flow, on(t, tAr + .2, tF - .1, .2)); popAt(s.fe, 600, 800, t, tF); };
  return s; })();

// ---- BIG IDEA: back at the mudbank. Almost every food chain begins with the Sun; even a crocodile runs on sunlight.
S.bigidea = (() => { const s = scene("bigidea", "#58b4ee", "#55806c"); s.cam = el("g", {}, s.stage);
  s.sw = e8Swamp(s.cam, {}); s.glow = el("circle", {cx: 180, cy: 200, r: 210, fill: "#fff3a0", filter: "url(#blur)", opacity: .7}, s.cam); s.sun = e8Sun(s.cam, 86);
  const P = [[180, 200], [1480, 330], [1470, 790], [1010, 720]];
  s.path = el("path", {d: `M${P[0]} L${P[1]} L${P[2]} L${P[3]}`.replace(/,/g, " "), fill: "none", stroke: "#ffe14d", "stroke-width": 12, "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-dasharray": "4 26"}, s.cam);
  s.croc = e8Croc(s.cam); tf(s.croc, "translate(880 800)");
  s.crab = e8Crab(s.cam); tf(s.crab, "translate(1560 850) scale(.5)"); s.skip = e8Skipper(s.cam); tf(s.skip, "translate(1400 856) scale(-.7 .7)");
  s.sp = el("g", {}, s.cam); el("circle", {r: 44, fill: "#ffe14d", filter: "url(#blur)"}, s.sp); el("circle", {r: 17, fill: "#fff", stroke: "#f77f00", "stroke-width": 5}, s.sp);
  s.t1 = tx(s.stage, {x: 880, y: 150, "text-anchor": "middle", "font-size": 72, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 13}, "Almost every food chain");
  s.t2 = tx(s.stage, {x: 880, y: 250, "text-anchor": "middle", "font-size": 92, "font-weight": 700, fill: "#ffe14d", class: "out", "stroke-width": 15}, "begins with the Sun!");
  s.c = chip(s.stage, "☀️ Even a crocodile runs on sunlight!", "#e63946", {fs: 50});
  s.run = t => { const a = (w, f) => cue("bigidea", w, f), t0 = SC.bigidea.t0, tS = a("sun", .55), tC = a("crocodile", .75), tR = a("runs", .85);
    tf(s.cam, `translate(${VP[0]} ${VP[1]}) scale(${1.1 - .1 * ramp(t, t0 - .3, t0 + 4)}) translate(${-VP[0]} ${-VP[1]})`);
    tf(s.sun, `translate(180 200) scale(${1 + .16 * on(t, tS - .1, tS + 1.2, .3)})`); tf(s.sun.rays, `scale(${1 + .2 * on(t, tS - .1, tS + 1.2, .3)})`); op(s.glow, .5 + .4 * on(t, tS - .1, tS + 1.4, .3));
    tf(s.t1, `translate(880 150) scale(${Math.max(0, pop(t, a("almost", .28) - .1))}) translate(-880 -150)`); tf(s.t2, `translate(880 250) scale(${Math.max(0, pop(t, a("begins", .48)))}) translate(-880 -250)`);
    const k = clamp((t - tS - .3) / (tC + .5 - tS - .3)), seg = Math.min(2.999, k * 3), i = Math.floor(seg), f = ease(seg - i), x = lerp(P[i][0], P[i + 1][0], f), y = lerp(P[i][1], P[i + 1][1], f);
    op(s.path, ramp(t, tS, tS + .4)); tf(s.sp, `translate(${x} ${y})`); op(s.sp, on(t, tS + .2, tC + .7, .15)); op(s.croc.glow, on(t, tC + .5, 1e9, .3) * (.8 + .2 * Math.sin(t * 7)));
    op(s.t1, on(t, a("almost", .28) - .1, tC - .2, .2)); op(s.t2, on(t, a("begins", .48), tC - .2, .2)); popAt(s.c, 880, 200, t, tR - .2); };
  return s; })();

// ---- TRY THIS: two food chains from a pupil's own day, on a notebook page: the school garden, and dinner (chicken rice)
S.try = (() => { const s = scene("try", "#caffbf", "#9bf6ff"), st = s.stage;
  s.h = chip(st, "✏️ Try this at home!", "#7209b7", {fs: 46});
  s.page = el("g", {}, st); el("rect", {x: 40, y: 130, width: 1120, height: 650, rx: 26, fill: "#fffdf5", stroke: INK, "stroke-width": 7, filter: "url(#sh)"}, s.page);
  for (let y = 210; y < 760; y += 54) el("line", {x1: 60, y1: y, x2: 1140, y2: y, stroke: "#a8dadc", "stroke-width": 3}, s.page); el("line", {x1: 150, y1: 134, x2: 150, y2: 776, stroke: "#ff8fa3", "stroke-width": 4}, s.page);
  const row = (y, title, col, items, w) => { const g = el("g", {}, st); g.w = w; tx(g, {x: 180, y: y - 92, "font-size": 40, "font-weight": 700, fill: col}, title);
    g.it = items.map(([e, n], i) => { const q = el("g", {}, g), x = 270 + i * 265; if (e === "SUN") tf(e8Sun(q, 42), `translate(${x} ${y})`); else emo(q, x, y, 104, e);
      tx(q, {x, y: y + 98, "text-anchor": "middle", "font-size": 34, "font-weight": 700, fill: INK}, n); return q; });
    g.ar = [0, 1, 2].map(i => { const q = e8Arrow(g, .46); tf(q, `translate(${270 + i * 265 + 132} ${y})`); set(q.a, "fill", "#ffbe0b"); return q; }); return g; };
  s.r1 = row(310, "🌱 From the school garden", "#2a9d8f", [["SUN", "the Sun"], ["🥬", "leaf"], ["🐛", "caterpillar"], ["🐦", "bird"]], "garden");
  s.r2 = row(600, "🍽️ From your dinner: chicken rice", "#e63946", [["SUN", "the Sun"], ["🌾", "rice plant"], ["🐔", "chicken"], ["🧒", "you"]], "dinner");
  s.tip = chip(st, "Start with the Sun · draw the arrows the way energy flows", "#f77f00", {fs: 36});
  s.run = t => { const a = (w, f) => cue("try", w, f), t0 = SC.try.t0, tA = a("arrows", .82), tS = a("start", .62);
    popAt(s.h, 700, 60, t, t0 - .2); op(s.page, ramp(t, t0, t0 + .3));
    [s.r1, s.r2].forEach((g, r) => { const tw = a(g.w, r ? .5 : .35) - .2; op(g, ramp(t, tw, tw + .2)); g.it.forEach((q, i) => { op(q, ramp(t, tw + .14 * i, tw + .14 * i + .25)); if (i === 0) { const b = 1 + .22 * on(t, tS, tS + 1, .25), x = 270, y = r ? 600 : 310; tf(q, `translate(${x} ${y}) scale(${b}) translate(${-x} ${-y})`); } });
      g.ar.forEach((q, i) => { const k = ramp(t, tA + r * .3 + i * .15, tA + r * .3 + i * .15 + .3); op(q, k); }); });
    popAt(s.tip, 600, 840, t, tS); };
  return s; })();

// ---- THINK ABOUT IT: take the mangrove crabs out of the chain. What happens to the crocodile?
S.think = (() => { const s = scene("think", "#3a0ca3", "#7209b7"), st = s.stage, K = ["leafF", "crab", "skipper", "croc"], X = i => 105 + i * 330, Y = 400;
  s.title = tx(st, {x: 600, y: 110, "text-anchor": "middle", "font-size": 76, "font-weight": 700, fill: "#ffe14d", class: "out", "stroke-width": 10}, "🤔 Think about it!");
  s.arr = [0, 1, 2].map(i => { const g = e8Arrow(st, .55); tf(g, `translate(${X(i) + 165} ${Y})`); set(g.a, "fill", "#ffbe0b"); return g; });
  s.gone = el("g", {}, st); el("circle", {cx: X(1), cy: Y, r: 128, fill: "none", stroke: "#fff", "stroke-width": 7, "stroke-dasharray": "18 16"}, s.gone); tx(s.gone, {x: X(1), y: Y + 34, "text-anchor": "middle", "font-size": 100, "font-weight": 700, fill: "#fff"}, "?");
  s.items = K.map((k, i) => { const g = e8Item(st, k); g.x = X(i); return g; });
  s.names = K.map((k, i) => tx(st, {x: X(i), y: Y + 190, "text-anchor": "middle", "font-size": 40, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 7}, E8NAME[k]));
  s.q = emo(st, X(3), Y - 150, 110, "❓");
  s.c = chip(st, "No more mangrove crabs… what happens to the crocodile?", "#e63946", {fs: 42});
  s.ans = chip(st, "Answer next time!", "#f72585", {fs: 46});
  s.run = t => { const a = (w, f) => cue("think", w, f), t0 = SC.think.t0, tW = a("what", .2), tD = a("disappeared", .6), tC = a("crabs", .52);
    popAt(s.title, 0, 0, t, t0 - .2); const g1 = ramp(t, tD, tD + .5);
    s.items.forEach((g, i) => { const sh = i === 1 ? 8 * on(t, tC, tD, .1) * Math.sin(t * 40) : 0; popAt(g, g.x + sh, Y, t, tW - .3 + i * .1, 1.08 * (i === 1 ? 1 - .5 * g1 : 1) * (i === 3 ? 1 + .1 * on(t, a("crocodile", .3), a("crocodile", .3) + 1, .2) : 1)); if (i === 1) op(g, (1 - g1) * ramp(t, tW - .3, tW)); else if (i > 1) op(g, ramp(t, tW - .3 + i * .1, tW + i * .1)); });
    s.names.forEach((n, i) => op(n, ramp(t, tW + i * .1, tW + .3 + i * .1) * (i === 1 ? 1 - .6 * g1 : 1))); s.arr.forEach((g, i) => op(g, ramp(t, tW + i * .1, tW + .3 + i * .1) * (i < 2 ? 1 - .75 * g1 : 1)));
    op(s.gone, g1); tf(s.q, `translate(${X(3)} ${Y - 150}) scale(${Math.max(0, pop(t, tD + .5)) * (1 + .08 * Math.sin(t * 5))}) translate(${-X(3)} ${-(Y - 150)})`);
    popAt(s.c, 600, 700, t, tD + .2); popAt(s.ans, 600, 830, t, a("next", .9)); };
  return s; })();

// ---- CLOSE: what to remember, then next time's teaser (rows from CFG.close; copied from ep02)
S.close = (() => { const s = scene("close", "#f15bb5", "#fee440");
  const CL = CFG.close || {}, rows = CL.rows || [];
  s.rows = rows.map(([e, lab, w, f, col], i) => ({c: chip(s.stage, e + "  " + lab, col, {fs: 42}), w, f, y: 150 + i * (rows.length > 3 ? 160 : 190)}));
  s.tease = chip(s.stage, CL.tease || "Next time!", "#3a0ca3", {fs: 40});
  s.run = t => { const tn = cue("close", CL.teaseWord || "next", .85);
    s.rows.forEach(r => { const tw = cue("close", r.w, r.f); popAt(r.c, 600, r.y, t, tw); op(r.c, ramp(t, tw - .05, tw + .1) * (1 - .6 * ramp(t, tn - .2, tn + .3))); });
    popAt(s.tease, 600, 820, t, tn); }; return s; })();
