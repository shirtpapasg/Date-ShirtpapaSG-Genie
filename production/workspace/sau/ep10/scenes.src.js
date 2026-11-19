/* TheOneApp, Explored EP10 "Dead things… become your food?!" (P6 decomposers and the cycle of nutrients; the compost bin;
   food security). This file: the drawings every EP10 scene shares and the narrated scenes. The picture-only shots are in
   ep10/pov.js. Load after common.js. scenes.js is built from this file by ep10/build.sh (it copies in the pupil, the Aedes
   mosquito and the real Singapore map under our own names).
   Rule 9 (true to the science): decomposers are bacteria and fungi; ants, flies, earthworms, millipedes and woodlice are
   detritivores (never labelled decomposers); a dead animal in nature returns its nutrients to the soil directly; the compost
   bin takes leaves, soil and plant food scraps, never meat; roots take in nutrients dissolved in water.
   Rule 10: one kind of label per row. */

const qA = (a, b) => Object.assign({stroke: INK, "stroke-width": 6, "stroke-linejoin": "round", "stroke-linecap": "round"}, a, b || {});
const QK = "#17171f";
const qDefs = () => $("v").querySelector("defs"); let qUid = 0;
function qGrad(stops, kind = "linearGradient", attrs = {x1: 0, y1: 0, x2: 0, y2: 1}) { const id = "qg" + (++qUid), g = el(kind, Object.assign({id}, attrs), qDefs());
  stops.forEach(([o, c, a]) => el("stop", {offset: o, "stop-color": c, "stop-opacity": a === undefined ? 1 : a}, g)); return `url(#${id})`; }
const qT = (p, x, y, s, fs = 40, fill = "#fff", o = {}) => tx(p, Object.assign({x, y, "text-anchor": "middle", "font-size": fs, "font-weight": 700, fill, class: fill === INK ? "" : "out", "stroke-width": fs * .2}, o), s);
// narrated scenes after the first key word: the picture fills the screen left of the key-word shelf
const qW = s => el("g", {transform: "translate(650 432) scale(1.12) translate(-600 -450)"}, s.stage);
const qX = (p, r = 60) => { const g = el("g", {}, p); [1, -1].forEach(a => el("line", {x1: -r * a, y1: -r, x2: r * a, y2: r, stroke: INK, "stroke-width": r * .52, "stroke-linecap": "round"}, g)); [1, -1].forEach(a => el("line", {x1: -r * a, y1: -r, x2: r * a, y2: r, stroke: "#e63946", "stroke-width": r * .32, "stroke-linecap": "round"}, g)); return g; };
const qTick = (p, r = 60) => { const g = el("g", {}, p), d = `M${-r} ${r * .1} L${-r * .3} ${r * .8} L${r} ${-r * .8}`; el("path", {d, fill: "none", stroke: INK, "stroke-width": r * .52, "stroke-linecap": "round", "stroke-linejoin": "round"}, g); el("path", {d, fill: "none", stroke: "#06d6a0", "stroke-width": r * .32, "stroke-linecap": "round", "stroke-linejoin": "round"}, g); return g; };
function qArrow(p, sc = .6, col = "#ffbe0b") { const g = el("g", {}, p); g.a = el("path", {d: "M-70 -14 H30 V-36 L80 0 L30 36 V14 H-70 Z", fill: col, stroke: INK, "stroke-width": 6 / sc * .8, "stroke-linejoin": "round", transform: `scale(${sc})`}, g); return g; }
const qPop = (e, x, y, t, a, s = 1, r = 0) => { tf(e, `translate(${x} ${y}) rotate(${r}) scale(${s * Math.max(0, pop(t, a))})`); op(e, ramp(t, a - .05, a + .1)); };
const qHash = (a, b) => { const x = Math.sin(a * 127.1 + b * 311.7) * 43758.5453; return x - Math.floor(x); };

/*LIB*/
function qPose(K, sw = 0, arm) { tf(K.legN, `translate(16 -120) rotate(${sw})`); tf(K.legF, `translate(-14 -120) rotate(${-sw})`); tf(K.armF, `translate(-6 -300) rotate(${sw * .9})`);
  tf(K.armN, `translate(10 -300) rotate(${arm === undefined ? -sw * .9 : arm})`); }

// ============================================================ EP10 DRAWINGS ============================================================

/* ---- YOU: a tiny bit of nutrient: a small green glowing speck with a face (r = its radius). N.eyes blink with N.blink(t). */
function qNut(p, r = 40, face = true) { const N = el("g", {}, p);
  el("circle", {r: r * 1.9, fill: "#7dffb0", filter: "url(#blur)", opacity: .75}, N);
  el("circle", {r, fill: "#3ddc84", stroke: "#eafff2", "stroke-width": Math.max(2.5, r * .1)}, N); el("circle", {r: r * .98, fill: "none", stroke: INK, "stroke-width": Math.max(1.5, r * .045), opacity: .55}, N);
  el("ellipse", {cx: -r * .36, cy: -r * .44, rx: r * .3, ry: r * .17, fill: "#fff", opacity: .7, transform: `rotate(-28 ${-r * .36} ${-r * .44})`}, N);
  if (face) { N.eyes = el("g", {}, N); [-1, 1].forEach(s => { el("ellipse", {cx: s * r * .32, cy: -r * .08, rx: r * .13, ry: r * .18, fill: INK}, N.eyes); el("circle", {cx: s * r * .32 + r * .04, cy: -r * .15, r: r * .05, fill: "#fff"}, N.eyes); });
    N.m = el("path", {d: `M${-r * .26} ${r * .28} Q0 ${r * .56} ${r * .26} ${r * .28}`, fill: "none", stroke: INK, "stroke-width": r * .09, "stroke-linecap": "round"}, N);
    [-1, 1].forEach(s => el("circle", {cx: s * r * .58, cy: r * .22, r: r * .13, fill: "#ffb3c1", opacity: .7}, N));
    N.blink = t => tf(N.eyes, `translate(0 ${-r * .08}) scale(1 ${(t * .43 + .2) % 1 < .045 ? .15 : 1}) translate(0 ${r * .08})`); }
  return N; }

/* ---- a grasshopper, side view, facing right, about 430 long; the feet stand on y = 0. o.dead: dull colours, legs curled, the
   eye a small cross (simple, not gory). H.head nods (munching). */
function qHopper(p, o = {}) { const H = el("g", {}, p), dead = !!o.dead, G = dead ? "#b9b277" : "#7cc243", D = dead ? "#8f8a55" : "#4e9a2e", B = dead ? "#ddd7a6" : "#d4ec8e";
  const line = (pts, w, col = D) => { const d = "M" + pts.map(q => q.join(" ")).join(" L"); el("path", {d, fill: "none", stroke: INK, "stroke-width": w + 8, "stroke-linecap": "round", "stroke-linejoin": "round"}, H); return el("path", {d, fill: "none", stroke: col, "stroke-width": w, "stroke-linecap": "round", "stroke-linejoin": "round"}, H); };
  line(dead ? [[-22, -64], [-98, -128], [-58, -12]] : [[-22, -64], [-98, -152], [-132, -2], [-106, -2]], 8, D);
  line(dead ? [[66, -46], [84, -16], [70, -4]] : [[66, -46], [88, -18], [104, -2], [118, -2]], 6, D);
  (dead ? ["M128 -124 Q180 -138 232 -112", "M136 -120 Q190 -116 236 -94"] : ["M128 -124 Q150 -186 214 -200", "M136 -120 Q176 -170 240 -168"]).forEach(d => el("path", {d, fill: "none", stroke: INK, "stroke-width": 5, "stroke-linecap": "round"}, H));
  el("path", qA({d: "M24 -104 Q-80 -118 -194 -66 Q-202 -56 -188 -50 Q-80 -30 24 -40 Z", fill: G}), H);
  el("path", {d: "M20 -54 Q-80 -44 -188 -57 L-186 -52 Q-80 -34 22 -43 Z", fill: B}, H);
  [-30, -66, -100, -132, -160].forEach(x => el("line", {x1: x, y1: -106 + (24 - x) * .19, x2: x - 6, y2: -41 - (24 - x) * .05, stroke: INK, "stroke-width": 3, opacity: .45}, H));
  el("path", qA({d: "M74 -110 Q-50 -140 -184 -80 Q-60 -80 66 -90 Z", fill: D, "stroke-width": 5}), H);
  el("path", {d: "M40 -108 Q-50 -122 -150 -88", fill: "none", stroke: "#fff", "stroke-width": 4, "stroke-linecap": "round", opacity: .3}, H);
  el("path", qA({d: "M14 -112 Q52 -126 92 -110 L96 -44 Q50 -34 12 -42 Z", fill: G}), H);
  H.head = el("g", {}, H); el("ellipse", qA({cx: 124, cy: -84, rx: 40, ry: 48, fill: G}), H.head);
  if (dead) { [[-9, -9, 9, 9], [9, -9, -9, 9]].forEach(([a, b, c, d]) => el("line", {x1: 136 + a, y1: -100 + b, x2: 136 + c, y2: -100 + d, stroke: INK, "stroke-width": 5, "stroke-linecap": "round"}, H.head)); el("path", {d: "M146 -60 L160 -60", stroke: INK, "stroke-width": 5, "stroke-linecap": "round"}, H.head); }
  else { el("circle", {cx: 136, cy: -100, r: 16, fill: "#fff", stroke: INK, "stroke-width": 4}, H.head); el("circle", {cx: 141, cy: -99, r: 8, fill: INK}, H.head); el("circle", {cx: 144, cy: -103, r: 2.6, fill: "#fff"}, H.head);
    el("path", {d: "M144 -58 Q156 -50 163 -62", fill: "none", stroke: INK, "stroke-width": 5, "stroke-linecap": "round"}, H.head); }
  line(dead ? [[34, -46], [46, -16], [30, -4]] : [[34, -46], [22, -20], [10, -2], [24, -2]], 6, G);
  line(dead ? [[-90, -138], [-48, -10]] : [[-100, -156], [-150, -2], [-124, -2]], 8, G);
  line(dead ? [[-6, -68], [-90, -138]] : [[-6, -68], [-100, -156]], 22, G);
  return H; }
// the dead grasshopper lying on its back on the ground (y = 0)
function qDead(p) { const g = el("g", {}, p); g.h = qHopper(el("g", {transform: "translate(0 -162) scale(1 -1)"}, g), {dead: true}); return g; }

/* ---- leaves, plants and garden things */
const qLeafD = "M0 0 Q-34 -50 0 -104 Q34 -50 0 0 Z";
// a chye sim plant: the soil line is y = 0; about 190 tall. V.lv = its leaves (for wilting)
function qVeg(p, o = {}) { const V = el("g", {}, p); V.lv = [];
  [[-64, -52], [58, -48], [-30, -22], [34, -24], [0, 0]].forEach(([r], i) => { const g = el("g", {transform: `rotate(${r})`}, V);
    el("path", {d: "M0 4 L0 -92", stroke: INK, "stroke-width": 15, "stroke-linecap": "round"}, g); el("path", {d: "M0 4 L0 -92", stroke: "#d9f0b0", "stroke-width": 8, "stroke-linecap": "round"}, g);
    const l = el("path", qA({d: qLeafD, fill: i % 2 ? "#3fa34d" : "#57b85a", "stroke-width": 5, transform: "translate(0 -74) scale(1.15)"}), g); el("path", {d: "M0 -84 V-176", stroke: "#d9f0b0", "stroke-width": 4, "stroke-linecap": "round", opacity: .8}, g); V.lv.push(l); V.lv.push(g); });
  return V; }
// a dry, dead leaf about 90 long, centred
function qDry(p, col = "#b07a3c") { const g = el("g", {}, p); el("path", qA({d: "M-46 0 Q-10 -30 44 0 Q-10 30 -46 0 Z", fill: col, "stroke-width": 4.5}), g); el("path", {d: "M-40 0 H40 M-12 0 L2 -14 M8 0 L22 12", fill: "none", stroke: INK, "stroke-width": 3, "stroke-linecap": "round", opacity: .55}, g); return g; }
// food scraps from plants only: "banana" peel, "apple" core, "orange" peel, "carrot" peel, cabbage "leaf"; about 100 across
function qPeel(p, kind) { const g = el("g", {}, p);
  if (kind === "banana") { [-64, 0, 64].forEach(r => el("path", qA({d: "M-12 0 Q-26 -40 -6 -74 Q0 -80 6 -74 Q26 -40 12 0 Z", fill: "#ffd43b", "stroke-width": 4.5, transform: `rotate(${r + 180})`}), g)); el("rect", qA({x: -9, y: -22, width: 18, height: 24, rx: 5, fill: "#8a6a2f", "stroke-width": 4}), g); }
  else if (kind === "apple") { el("path", qA({d: "M-34 -44 Q0 -62 34 -44 Q12 -22 12 0 Q12 22 34 44 Q0 60 -34 44 Q-12 22 -12 0 Q-12 -22 -34 -44 Z", fill: "#fff3c4", "stroke-width": 4.5}), g);
    el("path", qA({d: "M-34 -44 Q0 -62 34 -44 Q16 -34 0 -36 Q-16 -34 -34 -44 Z", fill: "#e63946", "stroke-width": 4}), g); el("path", qA({d: "M-34 44 Q0 60 34 44 Q16 34 0 36 Q-16 34 -34 44 Z", fill: "#e63946", "stroke-width": 4}), g);
    el("path", {d: "M0 -50 Q4 -66 14 -72", fill: "none", stroke: "#6b4423", "stroke-width": 6, "stroke-linecap": "round"}, g); [[-3, -6], [4, 8]].forEach(([x, y]) => el("ellipse", {cx: x, cy: y, rx: 3.5, ry: 6, fill: "#5c3d2e"}, g)); }
  else if (kind === "orange") { el("path", {d: "M-40 10 Q-30 -40 10 -36 Q44 -30 40 6 Q34 30 12 28", fill: "none", stroke: INK, "stroke-width": 30, "stroke-linecap": "round"}, g); el("path", {d: "M-40 10 Q-30 -40 10 -36 Q44 -30 40 6 Q34 30 12 28", fill: "none", stroke: "#ff922b", "stroke-width": 21, "stroke-linecap": "round"}, g);
    el("path", {d: "M-34 12 Q-26 -30 10 -28 Q36 -24 33 6", fill: "none", stroke: "#ffe8cc", "stroke-width": 6, "stroke-linecap": "round"}, g); }
  else if (kind === "carrot") { const d = "M-50 8 Q-26 -22 0 0 Q26 22 50 -8"; el("path", {d, fill: "none", stroke: INK, "stroke-width": 24, "stroke-linecap": "round"}, g); el("path", {d, fill: "none", stroke: "#f76707", "stroke-width": 15, "stroke-linecap": "round"}, g); el("path", {d, fill: "none", stroke: "#ffc078", "stroke-width": 4, "stroke-dasharray": "8 12", "stroke-linecap": "round"}, g); }
  else { el("path", qA({d: "M-50 6 Q-40 -40 0 -44 Q44 -40 50 4 Q30 40 -4 38 Q-40 36 -50 6 Z", fill: "#b5e48c", "stroke-width": 4.5}), g); el("path", {d: "M-40 6 Q0 -6 40 4 M-10 -30 Q0 0 -6 30 M16 -30 Q14 0 20 28", fill: "none", stroke: "#f1ffe0", "stroke-width": 5, "stroke-linecap": "round"}, g); }
  return g; }
const QPEELS = ["banana", "apple", "orange", "carrot", "leaf"];
// a small mushroom: the ground is y = 0, about 100 tall
function qMush(p) { const g = el("g", {}, p); el("path", qA({d: "M-16 2 Q-22 -34 -12 -58 H12 Q22 -34 16 2 Z", fill: "#fff8e7", "stroke-width": 5}), g);
  el("path", qA({d: "M-62 -52 Q-58 -108 0 -110 Q58 -108 62 -52 Q0 -40 -62 -52 Z", fill: "#d98b4a", "stroke-width": 5}), g); el("path", {d: "M-40 -72 Q-30 -96 -4 -98", fill: "none", stroke: "#fff", "stroke-width": 6, "stroke-linecap": "round", opacity: .5}, g); return g; }
// bacteria: a rod (teal) or a round one (yellow); the two shapes pupils see in the textbook
function qBact(p, round, k = 1) { const g = el("g", {}, p);
  if (round) { el("circle", {r: 13 * k, fill: "#ffd166", stroke: INK, "stroke-width": 4 * k}, g); el("circle", {cx: -4 * k, cy: -4 * k, r: 4 * k, fill: "#fff", opacity: .7}, g); }
  else { el("rect", {x: -25 * k, y: -11 * k, width: 50 * k, height: 22 * k, rx: 11 * k, fill: "#2ec4b6", stroke: INK, "stroke-width": 4 * k}, g); el("line", {x1: -14 * k, y1: -4 * k, x2: 4 * k, y2: -4 * k, stroke: "#fff", "stroke-width": 3.5 * k, "stroke-linecap": "round", opacity: .7}, g); }
  return g; }
// white fungus threads: a branching path. T.grow(k) draws it from its start (0..1)
function qThread(p, d, w = 7, out = true) { const T = el("g", {}, p); T.o = out ? el("path", {d, fill: "none", stroke: INK, "stroke-width": w + 6, "stroke-linecap": "round", "stroke-linejoin": "round", pathLength: 100, opacity: .7}, T) : null;
  T.p = el("path", {d, fill: "none", stroke: "#fffdf2", "stroke-width": w, "stroke-linecap": "round", "stroke-linejoin": "round", pathLength: 100}, T);
  T.grow = k => [T.o, T.p].forEach(e => { if (e) { set(e, "stroke-dasharray", `${clamp(k) * 100} 200`); op(e, k > 0 ? (e === T.o ? .7 : 1) : 0); } }); return T; }
// an earthworm (a detritivore, never called a decomposer): W.run(ph) makes it crawl; about 260 long, head on the right
function qWorm(p, k = 1) { const W = el("g", {}, p); W.o = el("path", {fill: "none", stroke: INK, "stroke-width": 34 * k, "stroke-linecap": "round", "stroke-linejoin": "round"}, W); W.p = el("path", {fill: "none", stroke: "#e8a0a6", "stroke-width": 25 * k, "stroke-linecap": "round", "stroke-linejoin": "round"}, W);
  W.s = el("path", {fill: "none", stroke: "#c9777f", "stroke-width": 25 * k, "stroke-dasharray": `${3 * k} ${11 * k}`}, W); W.b = el("path", {fill: "none", stroke: "#f4c2c2", "stroke-width": 27 * k, "stroke-linecap": "round"}, W);
  W.run = ph => { const P = []; for (let i = 0; i <= 16; i++) P.push([(-130 + i * 16.25) * k, 13 * k * Math.sin(ph - i * .55)]); const d = "M" + P.map(q => q[0].toFixed(1) + " " + q[1].toFixed(1)).join(" L");
    [W.o, W.p, W.s].forEach(e => set(e, "d", d)); set(W.b, "d", "M" + P.slice(10, 13).map(q => q[0].toFixed(1) + " " + q[1].toFixed(1)).join(" L")); }; W.run(0); return W; }
// the little helpers (detritivores), each about 200 long, facing right, feet on y = 0
function qAnt(p) { const g = el("g", {}, p), C = "#8a3324"; [[-30, -40, -64, 0], [0, -40, -4, 0], [22, -40, 58, 0]].forEach(([a, b, c, d]) => el("path", {d: `M${a} ${b} L${(a + c) / 2} ${b - 26} L${c} ${d}`, fill: "none", stroke: INK, "stroke-width": 6, "stroke-linecap": "round", "stroke-linejoin": "round"}, g));
  el("ellipse", qA({cx: -66, cy: -46, rx: 46, ry: 32, fill: C, "stroke-width": 5}), g); el("ellipse", qA({cx: 0, cy: -42, rx: 30, ry: 22, fill: C, "stroke-width": 5}), g); el("circle", qA({cx: 52, cy: -52, r: 28, fill: C, "stroke-width": 5}), g);
  el("path", {d: "M60 -76 L84 -106 L112 -98 M66 -72 L98 -86 L120 -72", fill: "none", stroke: INK, "stroke-width": 5, "stroke-linecap": "round", "stroke-linejoin": "round"}, g); el("circle", {cx: 62, cy: -56, r: 7, fill: "#fff"}, g); el("circle", {cx: 64, cy: -56, r: 4, fill: INK}, g);
  el("path", {d: "M-92 -60 Q-70 -76 -44 -66", fill: "none", stroke: "#fff", "stroke-width": 5, "stroke-linecap": "round", opacity: .35}, g); return g; }
function qFly(p) { const g = el("g", {}, p); [[-20, -30, -40, 0], [4, -30, 6, 0], [26, -30, 50, 0]].forEach(([a, b, c, d]) => el("path", {d: `M${a} ${b} L${c} ${d}`, stroke: INK, "stroke-width": 5, "stroke-linecap": "round"}, g));
  el("ellipse", qA({cx: -36, cy: -48, rx: 50, ry: 30, fill: "#4a4e69", "stroke-width": 5}), g); [-50, -28].forEach(x => el("line", {x1: x, y1: -74, x2: x - 4, y2: -22, stroke: INK, "stroke-width": 3, opacity: .5}, g));
  el("ellipse", qA({cx: 16, cy: -52, rx: 30, ry: 27, fill: "#5c6079", "stroke-width": 5}), g); el("circle", qA({cx: 54, cy: -54, r: 26, fill: "#4a4e69", "stroke-width": 5}), g); el("ellipse", {cx: 62, cy: -60, rx: 15, ry: 18, fill: "#c1121f", stroke: INK, "stroke-width": 4}, g); el("circle", {cx: 58, cy: -66, r: 4, fill: "#fff", opacity: .7}, g);
  [[-12, -30], [-28, -10]].forEach(([r, o]) => el("ellipse", {cx: -50, cy: -92 + o, rx: 74, ry: 22, fill: "#e8f7ff", opacity: .75, stroke: INK, "stroke-width": 3.5, transform: `rotate(${r} 10 -70)`}, g)); return g; }
function qMilli(p) { const g = el("g", {}, p), N = 15; for (let i = 0; i < N; i++) { const x = -112 + i * 15, y = -30 - 12 * Math.sin(i / (N - 1) * Math.PI); [-5, 5].forEach(dx => el("line", {x1: x + dx, y1: y + 6, x2: x + dx * 1.6 - 2, y2: 0, stroke: INK, "stroke-width": 3.5, "stroke-linecap": "round"}, g)); }
  for (let i = 0; i < N; i++) { const x = -112 + i * 15, y = -30 - 12 * Math.sin(i / (N - 1) * Math.PI); el("circle", {cx: x, cy: y, r: 16, fill: i % 2 ? "#6f4e37" : "#8a6548", stroke: INK, "stroke-width": 4}, g); }
  el("circle", qA({cx: 114, cy: -30, r: 18, fill: "#5c3d2e", "stroke-width": 4.5}), g); el("circle", {cx: 120, cy: -34, r: 4.5, fill: "#fff"}, g); el("path", {d: "M124 -44 Q140 -62 152 -54 M126 -38 Q146 -46 156 -34", fill: "none", stroke: INK, "stroke-width": 4, "stroke-linecap": "round"}, g); return g; }
function qLouse(p, rolled) { const g = el("g", {}, p), C = "#8d99ae";
  if (rolled) { el("circle", qA({cx: 0, cy: -46, r: 46, fill: C, "stroke-width": 5}), g); for (let i = 0; i < 6; i++) el("path", {d: `M0 -46 L${46 * Math.cos(i * 1.047)} ${-46 + 46 * Math.sin(i * 1.047)}`, stroke: INK, "stroke-width": 3.5, opacity: .6}, g); el("circle", {cx: 0, cy: -46, r: 10, fill: "#6c757d", stroke: INK, "stroke-width": 3.5}, g); return g; }
  for (let i = 0; i < 7; i++) el("line", {x1: -66 + i * 22, y1: -16, x2: -72 + i * 22, y2: 0, stroke: INK, "stroke-width": 4.5, "stroke-linecap": "round"}, g);
  el("path", qA({d: "M-100 -14 Q-96 -84 0 -88 Q90 -86 100 -14 Q0 -4 -100 -14 Z", fill: C, "stroke-width": 5}), g);
  for (let i = 1; i < 7; i++) { const x = -100 + i * 28.5; el("path", {d: `M${x} -12 Q${x + 12} -50 ${x * .86} ${-86 + Math.abs(x) * .16}`, fill: "none", stroke: INK, "stroke-width": 3.5, opacity: .6}, g); }
  el("path", {d: "M-60 -66 Q-20 -80 30 -76", fill: "none", stroke: "#fff", "stroke-width": 6, "stroke-linecap": "round", opacity: .4}, g);
  el("circle", {cx: 80, cy: -34, r: 5, fill: INK}, g); el("path", {d: "M92 -40 Q116 -60 130 -50 M96 -30 Q120 -34 132 -22", fill: "none", stroke: INK, "stroke-width": 4, "stroke-linecap": "round"}, g); return g; }

/* ---- the school compost bin: the ground is y = 0, about 260 wide and 330 tall. B.lid swings open with B.open(k). */
function qBin(p, o = {}) { const B = el("g", {}, p), C = o.col || "#2d6a4f";
  el("ellipse", {cx: 0, cy: 4, rx: 150, ry: 16, fill: INK, opacity: .18}, B);
  B.in = el("g", {}, B); el("path", {d: "M-100 -286 H100 L104 -250 H-104 Z", fill: "#1b2a22"}, B.in);
  el("path", qA({d: "M-104 -280 H104 L128 0 H-128 Z", fill: C}), B); [-60, 0, 60].forEach(x => el("line", {x1: x * .86, y1: -262, x2: x, y2: -14, stroke: INK, "stroke-width": 4, opacity: .28}, B));
  [-150, -128, -106].forEach(y => el("rect", {x: -78, y, width: 48, height: 9, rx: 4, fill: INK, opacity: .55}, B));
  el("rect", qA({x: -52, y: -86, width: 104, height: 74, rx: 8, fill: mix(C, "#000000", .25), "stroke-width": 5}), B); el("rect", {x: -14, y: -76, width: 28, height: 9, rx: 4, fill: "#fff", opacity: .6}, B);
  el("rect", qA({x: -6, y: -228, width: 116, height: 50, rx: 8, fill: "#fff", "stroke-width": 4}), B); tx(B, {x: 52, y: -193, "text-anchor": "middle", "font-size": 23, "font-weight": 700, fill: INK}, o.label || "COMPOST");
  B.lid = el("g", {}, B); el("path", qA({d: "M-118 -278 Q-118 -306 -90 -308 H90 Q118 -306 118 -278 Z", fill: mix(C, "#000000", .3)}), B.lid); el("rect", qA({x: -26, y: -324, width: 52, height: 18, rx: 8, fill: mix(C, "#000000", .3), "stroke-width": 5}), B.lid);
  B.open = k => tf(B.lid, `rotate(${-104 * k} -118 -280)`); return B; }
// the blue recycling bin (the one in every HDB estate)
function qBlue(p) { const B = el("g", {}, p); el("ellipse", {cx: 0, cy: 4, rx: 130, ry: 14, fill: INK, opacity: .18}, B);
  el("path", qA({d: "M-100 -250 H100 L88 0 H-88 Z", fill: "#1d6fd6"}), B); el("path", qA({d: "M-112 -250 Q-112 -282 -84 -284 H84 Q112 -282 112 -250 Z", fill: "#1554a8"}), B);
  el("circle", {cx: 0, cy: -130, r: 58, fill: "#fff", stroke: INK, "stroke-width": 4}, B); emo(B, 0, -128, 78, "♻️"); [-70, 70].forEach(x => el("circle", qA({cx: x, cy: -2, r: 20, fill: "#343a40", "stroke-width": 5}), B)); return B; }
/* ---- a waste-to-energy plant: the ground is y = 0, about 520 wide: the hall where rubbish is burnt, and a tall striped chimney */
function qWTE(p) { const g = el("g", {}, p);
  el("rect", qA({x: 150, y: -470, width: 62, height: 470, fill: "#f1f3f5"}), g); [-470, -350, -230].forEach(y => el("rect", {x: 153, y, width: 56, height: 50, fill: "#e63946"}, g)); el("rect", qA({x: 150, y: -470, width: 62, height: 470, fill: "none"}), g);
  el("path", qA({d: "M-250 0 V-210 L-130 -270 H110 V0 Z", fill: "#adb5bd"}), g); el("rect", qA({x: -250, y: -60, width: 360, height: 60, fill: "#868e96"}), g);
  for (let i = 0; i < 4; i++) el("rect", {x: -214 + i * 80, y: -180, width: 50, height: 70, fill: "#dee2e6", stroke: INK, "stroke-width": 4}, g);
  g.fire = el("g", {}, g); el("rect", {x: -214, y: -180, width: 290, height: 70, fill: "#ff922b", opacity: .9}, g.fire); for (let i = 0; i < 4; i++) { el("rect", {x: -214 + i * 80, y: -180, width: 50, height: 70, fill: "#ffa94d", stroke: INK, "stroke-width": 4}, g.fire); emo(g.fire, -189 + i * 80, -143, 44, "🔥"); }
  el("rect", qA({x: -40, y: -56, width: 90, height: 56, fill: "#495057", "stroke-width": 5}), g); return g; }
// an HDB block, front view: the ground is y = 0, centred on x = 0
function qHDB(p, w = 420, h = 520, col = "#f77f00") { const g = el("g", {}, p); el("rect", qA({x: -w / 2, y: -h, width: w, height: h, fill: "#fbf4e2"}), g); el("rect", {x: -w / 2 + 3, y: -70, width: w - 6, height: 70, fill: "#b9b09a"}, g);
  const n = Math.floor((h - 90) / 62); for (let f = 0; f < n; f++) { const y = -h + 22 + f * 62; el("rect", {x: -w / 2 + 3, y, width: w - 6, height: 30, fill: "#d8cdb2"}, g); for (let x = -w / 2 + 30; x < w / 2 - 50; x += 56) el("rect", {x, y: y + 2, width: 30, height: 26, fill: (f + x) % 3 ? "#9bd0e8" : "#ffd166", stroke: INK, "stroke-width": 2.5}, g);
    el("rect", {x: -w / 2, y: y + 30, width: w, height: 20, fill: "#fffaf0", stroke: INK, "stroke-width": 3}, g); el("rect", {x: -w / 2 + 2, y: y + 37, width: w - 4, height: 6, fill: col}, g); }
  el("rect", qA({x: -w / 2 - 3, y: -h, width: 60, height: h - 70, fill: col, "stroke-width": 5}), g); return g; }
// a raised garden bed (a wooden box of soil): the ground is y = 0; w wide, 90 tall. Things growing in it go in g.top (soil line y = -84)
function qBed(p, w = 520, n = 4, comp) { const g = el("g", {}, p); el("ellipse", {cx: 0, cy: 6, rx: w / 2 + 16, ry: 12, fill: INK, opacity: .16}, g);
  g.top = el("g", {}, g); for (let i = 0; i < n; i++) { const v = qVeg(g.top); tf(v, `translate(${-w / 2 + w * (i + .5) / n} -84) scale(${.62 + .08 * (i % 2)})`); }
  el("rect", {x: -w / 2 + 6, y: -92, width: w - 12, height: 30, rx: 8, fill: comp ? "#33221a" : "#6b4423", stroke: INK, "stroke-width": 5}, g);
  el("rect", qA({x: -w / 2, y: -74, width: w, height: 74, rx: 8, fill: "#c98f52"})); el("rect", qA({x: -w / 2, y: -74, width: w, height: 74, rx: 8, fill: "#c98f52"}), g);
  el("line", {x1: -w / 2 + 4, y1: -38, x2: w / 2 - 4, y2: -38, stroke: INK, "stroke-width": 4, opacity: .4}, g); for (let x = -w / 2 + 90; x < w / 2 - 20; x += 130) el("line", {x1: x, y1: -72, x2: x, y2: -2, stroke: INK, "stroke-width": 4, opacity: .3}, g); return g; }

/* ---- the school garden, full screen: sky, the school block, a fence, grass, a path, vegetable beds and the compost bin in the
   corner. The ground the pupil walks on is y = 880. G.bin = the compost bin. */
function qGarden(p, o = {}) { const G = el("g", {}, p);
  fullRect(G, qGrad([[0, "#58b4ee"], [.6, "#dff4ff"]]));
  [[1500, 150, 90], [1180, 110, 60]].forEach(([x, y, r]) => { const c = el("g", {fill: "#fff", opacity: .9}, G); el("ellipse", {cx: x, cy: y, rx: r * 1.5, ry: r * .5}, c); el("circle", {cx: x - r * .5, cy: y - r * .2, r: r * .5}, c); el("circle", {cx: x + r * .3, cy: y - r * .34, r: r * .62}, c); });
  // the school block: three floors of corridors
  el("rect", qA({x: -200, y: 120, width: 1180, height: 470, fill: "#fff6df"}), G); el("rect", {x: -200, y: 100, width: 1200, height: 34, fill: "#2a9d8f", stroke: INK, "stroke-width": 5}, G);
  for (let f = 0; f < 3; f++) { const y = 150 + f * 148; el("rect", {x: -196, y, width: 1172, height: 96, fill: "#cfe3e6"}, G); for (let x = -150; x < 940; x += 150) { el("rect", {x, y: y + 10, width: 46, height: 86, fill: "#3a86ff", stroke: INK, "stroke-width": 3}, G); el("rect", {x: x + 62, y: y + 14, width: 64, height: 40, fill: "#bfe6ff", stroke: INK, "stroke-width": 3}, G); }
    el("rect", {x: -200, y: y + 64, width: 1180, height: 54, fill: "#fff6df", stroke: INK, "stroke-width": 4}, G); el("rect", {x: -198, y: y + 80, width: 1176, height: 12, fill: "#2a9d8f"}, G); }
  [[1260, 1.5], [1640, 1.25]].forEach(([x, k]) => { const t = el("g", {transform: `translate(${x} 640) scale(${k})`}, G); el("rect", qA({x: -13, y: -150, width: 26, height: 150, fill: "#8a6548", "stroke-width": 5}), t); [[0, -230, 110], [-70, -170, 74], [70, -176, 78]].forEach(([cx, cy, r]) => el("circle", qA({cx, cy, r, fill: "#3f9a5f", "stroke-width": 5}), t)); });
  el("rect", {x: -170, y: 590, width: 1960, height: 450, fill: "#8fce7e"}, G); el("line", {x1: -170, y1: 590, x2: 1790, y2: 590, stroke: INK, "stroke-width": 5}, G);
  for (let x = -160; x < 1790; x += 62) el("rect", {x, y: 520, width: 12, height: 76, rx: 3, fill: "#fff", stroke: INK, "stroke-width": 3}, G); [540, 570].forEach(y => el("rect", {x: -170, y, width: 1960, height: 10, fill: "#fff", stroke: INK, "stroke-width": 3}, G));
  el("path", {d: "M-170 840 H1790 V1040 H-170 Z", fill: "#a9744a"}, G); el("path", {d: "M-170 840 H1790", stroke: INK, "stroke-width": 5}, G);
  seed = 41; for (let i = 0; i < 60; i++) el("ellipse", {cx: -150 + rnd() * 1900, cy: 860 + rnd() * 160, rx: 5 + rnd() * 12, ry: 3 + rnd() * 5, fill: rnd() < .5 ? "#8a5a36" : "#bd8a5c", opacity: .8}, G);
  for (let i = 0; i < 26; i++) { const x = -160 + i * 76 + rnd() * 30; el("path", {d: `M${x} 842 l-8 -22 l10 14 l4 -24 l6 24 l10 -16 l-6 24 Z`, fill: "#5fb05a", stroke: INK, "stroke-width": 3, "stroke-linejoin": "round"}, G); }
  G.beds = [[250, 760, 520, 4], [860, 760, 520, 4]].map(([x, y, w, n]) => { const b = qBed(G, w, n); tf(b, `translate(${x} ${y})`); return b; });
  { const s = el("g", {transform: "translate(560 700)"}, G); el("rect", qA({x: -5, y: -70, width: 10, height: 100, fill: "#8a6548", "stroke-width": 4}), s); el("rect", qA({x: -98, y: -124, width: 196, height: 62, rx: 10, fill: "#fff"}), s); tx(s, {x: 0, y: -82, "text-anchor": "middle", "font-size": 27, "font-weight": 700, fill: "#2d6a4f"}, "School Garden"); }
  G.bin = qBin(G); tf(G.bin, "translate(1500 790) scale(.92)"); return G; }
/* ---- close to the ground: soft green garden behind, the soil from y = gy down. For shots at a grasshopper's size. */
function qClose(p, gy = 700) { const G = el("g", {}, p); fullRect(G, qGrad([[0, "#a8dadc"], [.5, "#b7e4a3"], [1, "#74c365"]]));
  seed = 23; for (let i = 0; i < 16; i++) el("circle", {cx: -150 + rnd() * 1900, cy: rnd() * gy, r: 60 + rnd() * 130, fill: i % 2 ? "#95d58a" : "#d8f3c8", opacity: .35}, G);
  for (let i = 0; i < 16; i++) { const x = -170 + i * 128 + rnd() * 60, h = 200 + rnd() * 240; el("path", {d: `M${x - 22} ${gy + 6} Q${x - 10 + rnd() * 60 - 30} ${gy - h * .6} ${x + rnd() * 120 - 60} ${gy - h} Q${x + 20} ${gy - h * .5} ${x + 22} ${gy + 6} Z`, fill: i % 2 ? "#5fb05a" : "#4c9a50", stroke: INK, "stroke-width": 5, "stroke-linejoin": "round", opacity: .9}, G); }
  el("rect", {x: -170, y: gy, width: 1960, height: 1040 - gy, fill: qGrad([[0, "#8a5a36"], [1, "#5c3d2e"]])}, G); el("line", {x1: -170, y1: gy, x2: 1790, y2: gy, stroke: INK, "stroke-width": 6}, G);
  for (let i = 0; i < 70; i++) el("ellipse", {cx: -150 + rnd() * 1900, cy: gy + 16 + rnd() * (1010 - gy), rx: 6 + rnd() * 20, ry: 4 + rnd() * 9, fill: ["#6b4423", "#a9744a", "#4a2f20"][i % 3], opacity: .8}, G); return G; }
/* ---- under the ground, cut open: dark soil from y0 down, with crumbs and little stones */
function qSoil(p, y0 = -80, sd = 5, pale) { const G = el("g", {}, p); G.r = el("rect", {x: -170, y: y0, width: 1960, height: 1040 - y0, fill: qGrad(pale ? [[0, "#c9b79a"], [1, "#b09f84"]] : [[0, "#6b4423"], [1, "#3b2416"]])}, G);
  seed = sd; for (let i = 0; i < 90; i++) el("ellipse", {cx: -150 + rnd() * 1900, cy: y0 + 14 + rnd() * (1010 - y0), rx: 6 + rnd() * 26, ry: 4 + rnd() * 14, fill: pale ? ["#bba98c", "#d8c8ad"][i % 2] : ["#4a2f20", "#8a5a36", "#2e1c12", "#7a5234"][i % 4], opacity: .75, transform: `rotate(${rnd() * 40 - 20})`}, G); return G; }

/* ---- a white disc (radius 120) with one picture inside; D.pic holds the drawing. Used by the cycle, the recap and the diagrams. */
function qDisc(p, kind, ring = INK) { const D = el("g", {}, p), id = "qc" + (++qUid); const cp = el("clipPath", {id}, qDefs()); el("circle", {r: 116}, cp);
  el("circle", {r: 120, fill: "#fff", stroke: ring, "stroke-width": 8}, D); const q = D.pic = el("g", {"clip-path": `url(#${id})`}, D);
  const sky = () => el("rect", {x: -130, y: -130, width: 260, height: 260, fill: "#e3f6ff"}, q), soil = (y, c = "#6b4423") => { el("rect", {x: -130, y, width: 260, height: 260, fill: c}, q); el("line", {x1: -130, y1: y, x2: 130, y2: y, stroke: INK, "stroke-width": 4}, q); };
  const nuts = L => L.forEach(([x, y]) => tf(qNut(q, 9, false), `translate(${x} ${y})`));
  const bact = () => { [[-50, -30, 20, 0], [30, -50, -30, 0], [-10, 20, 60, 0], [50, 30, -10, 0], [-58, 44, 0, 1], [-40, 54, 0, 1], [10, -10, 0, 1], [60, -6, 0, 1], [-70, 6, 80, 0], [14, 62, 0, 1], [36, 66, 0, 1]].forEach(([x, y, r, rd]) => tf(qBact(q, rd, 1.25), `translate(${x} ${y}) rotate(${r})`)); };
  const fungi = () => { soil(30); [["M-90 120 Q-70 70 -30 60 Q10 50 0 34", 6], ["M-30 60 Q-60 80 -100 60", 5], ["M60 120 Q50 80 20 66 Q-4 60 0 34", 6], ["M20 66 Q70 70 110 50", 5], ["M0 34 Q30 80 10 120", 5]].forEach(([d, w]) => qThread(q, d, w, false)); tf(qMush(q), "translate(0 34) scale(1.05)"); tf(qMush(q), "translate(-70 34) scale(.55)"); };
  if (kind === "dead") { sky(); soil(50, "#8a5a36"); tf(qDead(q), "translate(-6 52) scale(.5)"); }
  else if (kind === "deadmix") { sky(); soil(50, "#8a5a36"); tf(qDead(q), "translate(18 52) scale(.36)"); [[-62, 30, -20], [-30, 44, 30], [58, -6, 0]].forEach(([x, y, r]) => tf(qDry(q), `translate(${x} ${y}) rotate(${r}) scale(.8)`)); el("path", {d: "M-96 -30 L-20 -64 M-52 -50 L-44 -80", stroke: "#8a6548", "stroke-width": 9, "stroke-linecap": "round"}, q); }
  else if (kind === "bacteria") { el("rect", {x: -130, y: -130, width: 260, height: 260, fill: "#e8f8f5"}, q); bact(); }
  else if (kind === "fungi") { sky(); fungi(); }
  else if (kind === "decomp") { sky(); fungi(); [[-66, 76, 20, 0], [70, 92, -30, 0], [58, 62, 0, 1], [-30, 100, 0, 1], [84, 30, 60, 0]].forEach(([x, y, r, rd]) => tf(qBact(q, rd, 1.1), `translate(${x} ${y}) rotate(${r})`)); }
  else if (kind === "soil" || kind === "subst") { sky(); soil(-30); seed = 3; for (let i = 0; i < 14; i++) el("ellipse", {cx: -110 + rnd() * 220, cy: -10 + rnd() * 120, rx: 8 + rnd() * 14, ry: 5 + rnd() * 8, fill: "#4a2f20", opacity: .8}, q); nuts([[-60, 10], [-10, 50], [50, 14], [70, 70], [-70, 80], [10, -4], [-30, 96]]); el("path", {d: "M-100 -32 l-6 -20 l10 12 l4 -22 l6 22 l10 -14 l-6 22 Z M40 -32 l-6 -20 l10 12 l4 -22 l6 22 l10 -14 l-6 22 Z", fill: "#5fb05a", stroke: INK, "stroke-width": 3}, q); }
  else if (kind === "bin") { sky(); soil(84, "#8fce7e"); D.bin = qBin(q); tf(D.bin, "translate(0 88) scale(.56)"); }
  else if (kind === "scraps") { el("rect", {x: -130, y: -130, width: 260, height: 260, fill: "#fff3d6"}, q); [["banana", -40, -30, 20], ["apple", 46, -20, -10], ["orange", -50, 50, 0], ["leaf", 30, 56, 30], ["carrot", 0, 10, -30]].forEach(([k, x, y, r]) => tf(qPeel(q, k), `translate(${x} ${y}) rotate(${r}) scale(.8)`)); }
  else if (kind === "compost") { el("rect", {x: -130, y: -130, width: 260, height: 260, fill: "#fff3d6"}, q); el("path", qA({d: "M-110 70 Q-60 -50 0 -56 Q60 -50 110 70 Z", fill: "#3b2416", "stroke-width": 5}), q); seed = 9; for (let i = 0; i < 26; i++) { const x = -86 + rnd() * 172, y = 60 - rnd() * (100 - Math.abs(x) * .9); el("circle", {cx: x, cy: y, r: 4 + rnd() * 6, fill: rnd() < .5 ? "#5c3d2e" : "#2a170d"}, q); } nuts([[-40, 30], [20, 0], [50, 44], [-6, 46]]); }
  else if (kind === "bed") { sky(); soil(70, "#8fce7e"); tf(qBed(q, 300, 3, true), "translate(0 84) scale(.72)"); }
  else if (kind === "roots" || kind === "plant") { sky(); const y0 = kind === "roots" ? -20 : 50; soil(y0); ["M0 0 Q-10 40 -50 70 Q-70 84 -90 110", "M0 0 Q6 50 0 120", "M0 0 Q14 36 56 64 Q76 76 90 106", "M-50 70 Q-40 96 -52 120", "M56 64 Q50 90 62 118"].forEach(d => { el("path", {d, fill: "none", stroke: INK, "stroke-width": 11, "stroke-linecap": "round", transform: `translate(0 ${y0})`}, q); el("path", {d, fill: "none", stroke: "#f1e3c6", "stroke-width": 6, "stroke-linecap": "round", transform: `translate(0 ${y0})`}, q); });
    tf(qVeg(q), `translate(0 ${y0}) scale(${kind === "roots" ? .5 : .78})`); if (kind === "roots") nuts([[-74, 40], [38, 70], [-20, 96], [80, 20]]); }
  else if (kind === "hopper") { sky(); el("path", qA({d: "M-130 60 Q-20 20 130 50 Q20 96 -130 60 Z", fill: "#57b85a", "stroke-width": 5}), q); tf(qHopper(q), "translate(-4 44) scale(.48)"); }
  else if (kind === "leaf") { el("rect", {x: -130, y: -130, width: 260, height: 260, fill: "#f3ead2"}, q); tf(qDry(q), "rotate(-20) scale(2)"); }
  else if (kind === "bits") { el("rect", {x: -130, y: -130, width: 260, height: 260, fill: "#f3ead2"}, q); seed = 12; for (let i = 0; i < 16; i++) el("path", qA({d: "M-12 -8 L10 -12 L14 6 L-8 12 Z", fill: i % 2 ? "#b07a3c" : "#96652e", "stroke-width": 3.5, transform: `translate(${-80 + (i % 4) * 52 + rnd() * 16} ${-76 + Math.floor(i / 4) * 50 + rnd() * 14}) rotate(${rnd() * 360}) scale(${.8 + rnd() * .6})`}), q); }
  else if (kind === "ant") { soil(60, "#a9744a"); el("rect", {x: -130, y: -130, width: 260, height: 190, fill: "#f3ead2"}, q); tf(qAnt(q), "translate(4 60) scale(.8)"); }
  else if (kind === "fly") { soil(60, "#a9744a"); el("rect", {x: -130, y: -130, width: 260, height: 190, fill: "#f3ead2"}, q); tf(qFly(q), "translate(14 60) scale(.95)"); }
  else if (kind === "worm") { soil(-6, "#8a5a36"); el("rect", {x: -130, y: -130, width: 260, height: 124, fill: "#f3ead2"}, q); D.worm = qWorm(q, .72); tf(D.worm, "translate(-2 40) rotate(-8)"); }
  else if (kind === "milli") { soil(60, "#a9744a"); el("rect", {x: -130, y: -130, width: 260, height: 190, fill: "#f3ead2"}, q); tf(qMilli(q), "translate(-14 60) scale(.72)"); }
  else if (kind === "louse") { soil(60, "#a9744a"); el("rect", {x: -130, y: -130, width: 260, height: 190, fill: "#f3ead2"}, q); tf(qLouse(q), "translate(-22 60) scale(.72)"); tf(qLouse(q, true), "translate(76 -8) scale(.5)"); }
  else if (kind === "farm") { sky(); soil(90, "#ced4da"); for (let i = 0; i < 3; i++) { const x = -78 + i * 78; el("rect", qA({x: x - 30, y: -92, width: 60, height: 182, fill: "#f1f3f5", "stroke-width": 4}), q); for (let r = 0; r < 5; r++) { el("rect", {x: x - 26, y: -70 + r * 34, width: 52, height: 7, fill: "#868e96"}, q); [-14, 4, 20].forEach(dx => el("circle", {cx: x + dx - 3, cy: -76 + r * 34, r: 9, fill: r % 2 ? "#57b85a" : "#3fa34d", stroke: INK, "stroke-width": 2.5}, q)); } } }
  el("circle", {r: 120, fill: "none", stroke: ring, "stroke-width": 8}, D); return D; }
// a white disc with an Aedes mosquito inside (female: thin antennae; male: bushy antennae)
function qMozDisc(p, female, ring) { const D = el("g", {}, p), id = "qc" + (++qUid); const cp = el("clipPath", {id}, qDefs()); el("circle", {r: 116}, cp); el("circle", {r: 120, fill: "#fff8e1", stroke: ring, "stroke-width": 8}, D);
  const q = el("g", {"clip-path": `url(#${id})`}, D); tf(qMoz(q, {female}), "translate(-2 -6) scale(.56)"); el("circle", {r: 120, fill: "none", stroke: ring, "stroke-width": 8}, D); return D; }
// a ring of arrows between points P (each [x, y]) round the centre (cx, cy): returns the arrows; a.p is the bright line to light up
function qRing(p, P, cx, cy, gap = 130, bend = .3) { return P.map((a, i) => { const b = P[(i + 1) % P.length], mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2, ox = (mx - cx) * bend, oy = (my - cy) * bend, g = el("g", {}, p);
  const ux = b[0] - a[0], uy = b[1] - a[1], L = Math.hypot(ux, uy), A = [a[0] + ux / L * gap, a[1] + uy / L * gap], B = [b[0] - ux / L * gap, b[1] - uy / L * gap], d = `M${A[0]} ${A[1]} Q${mx + ox} ${my + oy} ${B[0]} ${B[1]}`;
  el("path", {d, fill: "none", stroke: INK, "stroke-width": 22, "stroke-linecap": "round"}, g); g.p = el("path", {d, fill: "none", stroke: "#cfd3dc", "stroke-width": 12, "stroke-linecap": "round"}, g);
  const an = Math.atan2(B[1] - (my + oy), B[0] - (mx + ox)) * 180 / Math.PI; g.h = el("path", qA({d: "M-26 -28 L28 0 L-26 28 Z", fill: "#cfd3dc", transform: `translate(${B[0]} ${B[1]}) rotate(${an})`}), g);
  g.at = k => { const u = 1 - k; return [u * u * A[0] + 2 * u * k * (mx + ox) + k * k * B[0], u * u * A[1] + 2 * u * k * (my + oy) + k * k * B[1]]; };
  g.lit = k => { const c = mix("#cfd3dc", "#06d6a0", k); set(g.p, "stroke", c); set(g.h, "fill", c); }; return g; }); }

// ============================================================ NARRATED SCENES ============================================================

// ---- HOOK: the dead grasshopper, close up. Gross? No: treasure. Inside it are nutrients that plants need. Where do they go?
S.hook = (() => { const s = scene("hook", "#b7e4a3", "#74c365"), st = s.stage; s.cam = el("g", {}, st); qClose(s.cam, 700);
  s.rays = el("g", {transform: "translate(700 560)"}, s.cam); for (let i = 0; i < 14; i++) el("path", {d: `M0 0 L${Math.cos(i * .449 - .1) * 900} ${Math.sin(i * .449 - .1) * 900} L${Math.cos(i * .449 + .1) * 900} ${Math.sin(i * .449 + .1) * 900} Z`, fill: "#ffe14d", opacity: .5}, s.rays);
  s.dg = el("g", {transform: "translate(720 706) scale(2.15)"}, s.cam); s.d = qDead(s.dg);
  s.in = el("g", {}, s.cam); seed = 8; s.nuts = [[430, 590], [520, 520], [610, 600], [700, 530], [780, 600], [860, 540], [560, 640], [760, 660]].map(([x, y]) => { const n = qNut(s.in, 17, false); n.x = x; n.y = y; n.ph = rnd() * 6; return n; }); s.me = qNut(s.in, 34);
  s.veg = el("g", {}, s.cam); tf(qVeg(s.veg), "scale(2)"); s.pc = chip(st, "plants need them to grow", "#2a9d8f", {fs: 38});
  s.sp = [[330, 400], [1010, 380], [660, 300], [1120, 560], [250, 600]].map(([x, y]) => { const e = emo(st, 0, 0, 80, "✨"); e.px = x; e.py = y; return e; });
  s.gq = qT(st, 810, 0, "Gross?", 150, "#fff"); s.tr = qT(st, 810, 0, "It's TREASURE!", 140, "#ffe14d"); s.nc = chip(st, "nutrients inside", "#2a9d8f", {fs: 46}); s.wh = qT(st, 810, 0, "Where do they go?", 120, "#ffe14d");
  s.run = t => { const a = (w, f) => cue("hook", w, f), t0 = SC.hook.t0, tG = a("gross", .2), tT = a("treasure", .42), tI = a("inside", .55), tP = a("plants", .72), tW = a("where", .9);
    tf(s.cam, `translate(${VP[0]} ${VP[1]}) scale(${1.12 - .1 * ramp(t, t0 - .4, t0 + 4)}) translate(${-VP[0]} ${-VP[1]})`);
    op(s.rays, on(t, tT, tW, .3)); tf(s.rays, `translate(700 560) rotate(${t * 8})`);
    const k = ramp(t, tI - .2, tI + .5); op(s.d.h, 1 - .55 * k); op(s.in, k);
    s.nuts.forEach(n => tf(n, `translate(${n.x + 6 * Math.sin(t * 2 + n.ph)} ${n.y + 5 * Math.cos(t * 2.3 + n.ph)})`)); tf(s.me, `translate(680 ${585 + 5 * Math.sin(t * 2.4)}) scale(${1 + .5 * Math.max(0, pop(t, tI + .1))})`); s.me.blink(t);
    [[s.gq, tG, tT - .1], [s.tr, tT, tI - .1], [s.wh, tW, 1e9]].forEach(([e, a0, a1]) => { set(e, "x", 0); tf(e, `translate(810 ${e === s.wh ? 210 : 230}) scale(${Math.max(0, pop(t, a0))}) rotate(${e === s.gq ? -4 : 0})`); op(e, on(t, a0, a1, .15)); });
    s.sp.forEach((e, i) => { tf(e, `translate(${e.px} ${e.py}) scale(${Math.max(0, pop(t, tT + .1 + i * .1)) * (1 + .15 * Math.sin(t * 6 + i))})`); op(e, on(t, tT + .1 + i * .1, tI, .2)); });
    qPop(s.nc, 700, 420, t, tI + .2); op(s.nc, on(t, tI + .2, tW - .1, .2));
    tf(s.veg, `translate(1330 702) scale(${Math.max(0, pop(t, tP - .1, .5))})`); qPop(s.pc, 1330, 250, t, tP + .2); op(s.pc, on(t, tP + .2, tW - .1, .2)); };
  return s; })();

// ---- LAST TIME'S ANSWER (EP09): only males are released: males don't bite, so they can't spread dengue; females bite
S.answer = (() => { const s = scene("answer", "#3a0ca3", "#7209b7"), st = s.stage, XM = 440, XF = 1180, Y = 370;
  s.top = chip(st, "✅ Last time: why does Project Wolbachia release only MALE mosquitoes?", "#06d6a0", {fs: 36, ink: INK});
  s.m = el("g", {}, st); qMozDisc(s.m, false, "#06d6a0"); s.f = el("g", {}, st); qMozDisc(s.f, true, "#e63946");
  s.nm = qT(st, XM, Y + 250, "male", 60); s.nf = qT(st, XF, Y + 250, "female", 60);
  s.a1 = chip(st, "does not bite", "#06d6a0", {fs: 44, ink: INK}); s.a2 = chip(st, "can't spread dengue", "#06d6a0", {fs: 44, ink: INK});
  s.b1 = chip(st, "bites", "#e63946", {fs: 44}); s.b2 = chip(st, "more females = more bites", "#e63946", {fs: 44});
  s.tk = qTick(st, 46); s.x = qX(st, 44); s.vs = qT(st, 810, Y + 30, "vs", 80, "#ffe14d");
  s.run = t => { const a = (w, f) => cue("answer", w, f), t0 = SC.answer.t0, tM = a("male#2", .47), tB = a("don't", .52), tS = a("spread", .63), tF = a("female", .73), tB2 = a("bite#2", .8), tW = a("worse", .96);
    qPop(s.top, 810, 80, t, t0 - .2); qPop(s.m, XM, Y, t, a("male", .35) - .1, 1.55 * (1 + .06 * on(t, tM, tF, .2))); op(s.nm, ramp(t, a("male", .35), a("male", .35) + .3));
    qPop(s.f, XF, Y, t, tF - .15, 1.55); op(s.nf, ramp(t, tF, tF + .3)); op(s.vs, ramp(t, tF - .1, tF + .2));
    qPop(s.a1, XM, Y + 340, t, tB); qPop(s.tk, XM + 200, Y - 150, t, tB + .2); qPop(s.a2, XM, Y + 430, t, tS);
    qPop(s.b1, XF, Y + 340, t, tB2); qPop(s.x, XF + 200, Y - 150, t, tW - .5); qPop(s.b2, XF, Y + 430, t, tW - .5); };
  return s; })();

// ---- a hawker centre (box 1200 x 900): stalls at the back, a table in front. The floor is y = 720.
function qHawker(p) { const g = el("g", {}, p); el("rect", {x: -300, y: -200, width: 1900, height: 1300, fill: "#fff1d6"}, g);
  el("rect", {x: -300, y: -200, width: 1900, height: 250, fill: "#e9dcc0"}, g); [150, 600, 1050].forEach(x => { el("line", {x1: x, y1: -200, x2: x, y2: 6, stroke: INK, "stroke-width": 5}, g); el("ellipse", {cx: x, cy: 14, rx: 120, ry: 12, fill: "#adb5bd", stroke: INK, "stroke-width": 4}, g); });
  [["Chicken Rice", "#e63946", 0], ["Noodles", "#f77f00", 1], ["Drinks", "#3a86ff", 2], ["Fruit Juice", "#2a9d8f", 3]].forEach(([n, c, i]) => { const x = -130 + i * 380;
    el("rect", qA({x, y: 80, width: 360, height: 420, fill: "#f8f9fa"}), g); el("rect", qA({x, y: 80, width: 360, height: 84, fill: c}), g); tx(g, {x: x + 180, y: 136, "text-anchor": "middle", "font-size": 40, "font-weight": 700, fill: "#fff"}, n);
    el("rect", {x: x + 24, y: 190, width: 312, height: 170, fill: "#3d405b", stroke: INK, "stroke-width": 4}, g); el("rect", {x: x + 24, y: 190, width: 312, height: 60, fill: "#ffd166", opacity: .5}, g); emo(g, x + 180, 300, 90, ["🍗", "🍜", "🥤", "🍉"][i]);
    el("rect", qA({x: x + 10, y: 360, width: 340, height: 140, fill: "#dee2e6", "stroke-width": 5}), g); });
  el("rect", {x: -300, y: 500, width: 1900, height: 600, fill: "#d9c9a8"}, g); el("line", {x1: -300, y1: 500, x2: 1600, y2: 500, stroke: INK, "stroke-width": 5}, g);
  for (let i = 0; i < 9; i++) el("line", {x1: -300 + i * 240, y1: 500, x2: -700 + i * 340, y2: 1100, stroke: INK, "stroke-width": 3, opacity: .15}, g);
  return g; }
function qTable(p) { const g = el("g", {}, p); [-190, 190].forEach(x => { el("rect", qA({x: x - 12, y: 40, width: 24, height: 150, fill: "#868e96", "stroke-width": 5}), g); el("ellipse", qA({cx: x, cy: 40, rx: 62, ry: 18, fill: "#f77f00", "stroke-width": 5}), g); });
  el("rect", qA({x: -20, y: 0, width: 40, height: 200, fill: "#868e96", "stroke-width": 5}), g); el("ellipse", qA({cx: 0, cy: 0, rx: 250, ry: 52, fill: "#f8f9fa"}), g); el("ellipse", {cx: 0, cy: -4, rx: 226, ry: 40, fill: "#fff"}, g); return g; }
// a plate seen a little from above (rx 96); full = leftover rice and vegetables on it
function qPlate(p, full) { const g = el("g", {}, p); el("ellipse", qA({rx: 96, ry: 30, fill: "#fff", "stroke-width": 5}), g); el("ellipse", {rx: 66, ry: 19, fill: "none", stroke: "#ced4da", "stroke-width": 3}, g);
  g.food = el("g", {}, g); if (full) { el("path", qA({d: "M-50 0 Q-40 -40 0 -42 Q36 -40 44 -2 Q0 12 -50 0 Z", fill: "#fffdf2", "stroke-width": 4}), g.food); [[-20, -14, "#57b85a"], [14, -22, "#f77f00"], [28, -6, "#57b85a"], [-36, 0, "#d98b4a"]].forEach(([x, y, c]) => el("ellipse", {cx: x, cy: y, rx: 14, ry: 8, fill: c, stroke: INK, "stroke-width": 3}, g.food)); }
  return g; }

// ---- NEWS: hawker-centre leftovers go into the bin; about 790,000 tonnes in 2025; of every 100 tonnes about 18 recycled, the rest burnt
S.news = (() => { const s = scene("news", "#fff1d6", "#ffd8a8"), st = qW(s);
  s.A = el("g", {}, st); qHawker(s.A); tf(qTable(s.A), "translate(380 640)"); tf(qPlate(s.A, true), "translate(250 630) scale(.9)"); s.cup = emo(s.A, 480, 600, 80, "🥤");
  s.fb = el("g", {transform: "translate(940 860)"}, s.A); el("path", qA({d: "M-110 -270 H110 L92 0 H-92 Z", fill: "#868e96"}), s.fb); el("ellipse", qA({cx: 0, cy: -270, rx: 110, ry: 26, fill: "#343a40"}), s.fb); el("rect", qA({x: -84, y: -190, width: 168, height: 62, rx: 8, fill: "#fff", "stroke-width": 4}), s.fb); tx(s.fb, {x: 0, y: -148, "text-anchor": "middle", "font-size": 28, "font-weight": 700, fill: INK}, "FOOD WASTE");
  s.pl = el("g", {}, s.A); s.plate = qPlate(s.pl, true); s.bits = [0, 1, 2, 3, 4].map(i => el("ellipse", {rx: 16, ry: 10, fill: ["#fffdf2", "#57b85a", "#f77f00", "#fffdf2", "#d98b4a"][i], stroke: INK, "stroke-width": 3}, s.A));
  s.top = chip(st, "📰 Singapore, 2025", "#f72585", {fs: 44}); s.loc = chip(st, "📍 a hawker centre", INK, {fs: 32});
  s.num = el("g", {}, st); el("rect", qA({x: -420, y: -106, width: 840, height: 212, rx: 40, fill: "#fff", "stroke-width": 8, filter: "url(#sh)"}), s.num);
  tx(s.num, {x: 0, y: -6, "text-anchor": "middle", "font-size": 92, "font-weight": 700, fill: "#e63946"}, "about 790,000 tonnes"); tx(s.num, {x: 0, y: 66, "text-anchor": "middle", "font-size": 46, "font-weight": 700, fill: INK}, "of food waste thrown away");
  // B: of every 100 tonnes
  s.B = el("g", {}, st); el("rect", {x: -300, y: -200, width: 1900, height: 1300, fill: "#16324f"}, s.B); s.h2 = chip(st, "Out of every 100 tonnes of food waste…", "#f72585", {fs: 40});
  s.cells = []; for (let i = 0; i < 100; i++) { const c = el("g", {transform: `translate(${100 + (i % 10) * 56} ${190 + Math.floor(i / 10) * 56})`}, s.B); c.r = el("rect", {x: -23, y: -23, width: 46, height: 46, rx: 9, fill: "#b08968", stroke: INK, "stroke-width": 3.5}, c); s.cells.push(c); }
  s.src = tx(s.B, {x: 352, y: 762, "text-anchor": "middle", "font-size": 26, "font-weight": 600, fill: "#fff", opacity: .8}, "Source: National Environment Agency (NEA)");
  s.g1 = el("g", {}, s.B); s.cb = qBin(s.g1, {col: "#2d6a4f"}); tf(s.cb, "translate(770 400) scale(.6)"); s.n18 = qT(s.g1, 1040, 300, "about 18", 92, "#7dffb0"); qT(s.g1, 1040, 366, "recycled", 50);
  s.g2 = el("g", {}, s.B); s.wte = qWTE(s.g2); tf(s.wte, "translate(760 760) scale(.5)"); s.n82 = qT(s.g2, 1070, 640, "about 82", 92, "#ffa94d"); qT(s.g2, 1070, 706, "burnt", 50);
  s.lost = [0, 1, 2, 3, 4].map(i => qNut(s.B, 13, false)); s.lc = chip(st, "…and their nutrients were lost", "#e63946", {fs: 40});
  s.run = t => { const a = (w, f) => cue("news", w, f), t0 = SC.news.t0, tT = a("threw", .24), tN = a("seven", .3), tO = a("only", .55) - .35, t18 = a("eighteen", .59), tR = a("rest", .83), tL = a("nutrients", .92), kB = ramp(t, tO, tO + .4);
    op(s.A, 1 - kB); op(s.B, kB); qPop(s.top, 780, 60, t, t0 - .2); op(s.top, on(t, t0 - .2, tO, .2)); qPop(s.loc, 200, 150, t, t0 + .5); op(s.loc, on(t, t0 + .5, tN - .1, .2));
    const k = ramp(t, tT - .9, tT - .1), tip = ramp(t, tT - .1, tT + .4); tf(s.pl, `translate(${lerp(560, 860, k)} ${lerp(628, 470, k)}) rotate(${50 * tip})`); op(s.plate.food, 1 - ramp(t, tT + .1, tT + .5));
    s.bits.forEach((b, i) => { const f = clamp((t - tT - .1 - i * .09) / .5); tf(b, `translate(${lerp(900, 935 + i * 6, f)} ${lerp(500, 600, f * f)}) rotate(${f * 200 + i * 50})`); op(b, f > 0 && f < 1 ? 1 : 0); });
    qPop(s.num, 600, 250, t, tN - .15); op(s.num, on(t, tN - .15, tO, .2));
    qPop(s.h2, 800, 60, t, tO + .2);
    s.cells.forEach((c, i) => { const g = i < 18 ? ramp(t, t18 + i * .05, t18 + .2 + i * .05) : 0, r = i >= 18 ? ramp(t, tR + (i - 18) * .012, tR + .25 + (i - 18) * .012) : 0; set(c.r, "fill", i < 18 ? mix("#b08968", "#06d6a0", g) : mix("#b08968", "#f76707", r));
      tf(c, `translate(${100 + (i % 10) * 56} ${190 + Math.floor(i / 10) * 56}) scale(${Math.max(0, pop(t, tO + .2 + i * .006, .3)) * (1 + .18 * Math.sin(Math.PI * (i < 18 ? g : r)))})`); });
    op(s.g1, ramp(t, t18 + .3, t18 + .7)); op(s.g2, ramp(t, tR, tR + .4)); op(s.src, ramp(t, tO + .6, tO + 1)); op(s.wte.fire, .7 + .3 * Math.sin(t * 9));
    s.lost.forEach((n, i) => { const f = ((t - tL) * .5 + i * .2) % 1; tf(n, `translate(${852 + 30 * Math.sin(f * 5 + i)} ${520 - f * 130})`); op(n, t > tL ? (1 - f) * ramp(f, 0, .15) : 0); });
    qPop(s.lc, 640, 836, t, tL - .1); };
  return s; })();

// ---- RECAP: the journey on a circle board; each step lights up as Heart names it, and YOU hop from step to step
S.recap = (() => { const s = scene("recap", "#fff3b0", "#ffd6a5"), st = qW(s), CX = 600, CY = 478, RX = 420, RY = 288, N = 7;
  const P = []; for (let i = 0; i < N; i++) { const an = -Math.PI / 2 + i * 2 * Math.PI / N; P.push([CX + RX * Math.cos(an), CY + RY * Math.sin(an)]); }
  s.title = tx(st, {x: 830, y: 64, "text-anchor": "middle", "font-size": 44, "font-weight": 700, fill: INK}, "🔄 Your journey as a tiny bit of nutrient");
  s.mid = el("g", {}, st); tx(s.mid, {x: CX, y: CY + 20, "text-anchor": "middle", "font-size": 44, "font-weight": 700, fill: "#2a9d8f"}, "the cycle"); tx(s.mid, {x: CX, y: CY + 70, "text-anchor": "middle", "font-size": 44, "font-weight": 700, fill: "#2a9d8f"}, "of nutrients");
  s.arr = qRing(st, P, CX, CY, 104, .16);
  const K = ["dead", "decomp", "soil", "bin", "bed", "roots", "hopper"], NM = ["dead grasshopper", "decomposers", "soil", "compost bin", "garden bed", "plant roots", "grasshopper"];
  s.it = K.map((k, i) => { const g = el("g", {}, st); g.d = qDisc(g, k, ["#8d99ae", "#7f5539", "#6b4423", "#2d6a4f", "#6a994e", "#2a9d8f", "#57b85a"][i]); tf(g.d, "scale(.7)");
    el("circle", {cx: -66, cy: -66, r: 25, fill: INK}, g); tx(g, {x: -66, y: -54, "text-anchor": "middle", "font-size": 34, "font-weight": 700, fill: "#fff"}, String(i + 1));
    g.n = tx(g, {x: 0, y: 122, "text-anchor": "middle", "font-size": 31, "font-weight": 700, fill: INK}, NM[i]); return g; });
  s.me = qNut(st, 30);
  s.run = t => { const a = (w, f) => cue("recap", w, f), t0 = SC.recap.t0, T = [a("inside", .17), a("decomposers", .27), a("soil", .39), a("raked", .45), a("spread", .62), a("roots", .75), a("grasshopper#2", .82)], tBk = a("back", .95);
    op(s.title, ramp(t, t0 - .1, t0 + .3)); op(s.mid, ramp(t, T[0], T[0] + .4));
    s.it.forEach((g, i) => { const now = on(t, T[i] - .1, (i < N - 1 ? T[i + 1] : tBk) - .1, .2) + (i === 0 ? ramp(t, tBk, tBk + .3) : 0); tf(g, `translate(${P[i][0]} ${P[i][1]}) scale(${1 + .13 * now})`); op(g, t >= T[i] - .1 ? 1 : .22); });
    s.arr.forEach((g, i) => { const tt = i < N - 1 ? T[i + 1] : tBk; op(g, t >= tt - .5 ? 1 : .18); g.lit(ramp(t, tt - .5, tt)); });
    let x = P[0][0], y = P[0][1]; for (let i = 0; i < N; i++) { const tt = i < N - 1 ? T[i + 1] : tBk, k = ease((t - tt + .5) / .5); if (k > 0) { const b = P[(i + 1) % N]; x = lerp(P[i][0], b[0], k) ; y = lerp(P[i][1], b[1], k) - 50 * Math.sin(Math.PI * k); } }
    tf(s.me, `translate(${x + 62} ${y - 62}) scale(${Math.max(0, pop(t, T[0] - .2))})`); s.me.blink(t); };
  return s; })();

// ---- TEXTBOOK (P6): decomposers (bacteria and fungi) break down dead plants and animals into simpler substances that go back
// into the soil for plants. Then: without decomposers, dead things pile up and the soil runs out of nutrients.
S.textbook = (() => { const s = scene("textbook", "#e9f5db", "#cfe1b9"), st = qW(s), X = [115, 385, 615, 885, 1105], Y = 450, K = ["deadmix", "bacteria", "fungi", "subst", "plant"], NM = ["dead plants and animals", "bacteria", "fungi", "simpler substances", "plants"];
  s.h = chip(st, "📘 Primary 6 · Decomposers", "#3a0ca3", {fs: 38}); s.A = el("g", {}, st);
  s.br = el("g", {}, s.A); el("path", {d: `M${X[1] - 112} ${Y - 138} V${Y - 162} H${X[2] + 112} V${Y - 138}`, fill: "none", stroke: INK, "stroke-width": 7, "stroke-linecap": "round", "stroke-linejoin": "round"}, s.br); s.dc = chip(s.br, "decomposers", "#7f5539", {fs: 44});
  s.it = K.map((k, i) => { const g = el("g", {}, s.A); tf(qDisc(g, k, ["#8d99ae", "#2ec4b6", "#d98b4a", "#2a9d8f", "#57b85a"][i]), "scale(.9)"); return g; });
  s.nm = NM.map((n, i) => { const g = el("g", {}, s.A), w = n.split(" "); if (w.length > 2) { tx(g, {x: X[i], y: Y + 152, "text-anchor": "middle", "font-size": 36, "font-weight": 700, fill: INK}, w.slice(0, 2).join(" ")); tx(g, {x: X[i], y: Y + 194, "text-anchor": "middle", "font-size": 36, "font-weight": 700, fill: INK}, w.slice(2).join(" ")); }
    else if (i === 3) { tx(g, {x: X[i], y: Y + 152, "text-anchor": "middle", "font-size": 36, "font-weight": 700, fill: INK}, w[0]); tx(g, {x: X[i], y: Y + 194, "text-anchor": "middle", "font-size": 36, "font-weight": 700, fill: INK}, w[1]); }
    else tx(g, {x: X[i], y: Y + 152, "text-anchor": "middle", "font-size": 40, "font-weight": 700, fill: INK}, n); return g; });
  s.ar = [[(X[0] + X[1]) / 2 - 4, "break down"], [(X[2] + X[3]) / 2, "into"], [(X[3] + X[4]) / 2, ""]].map(([x]) => { const g = qArrow(s.A, .42); g.x = x; return g; });
  s.bk = chip(s.A, "back into the soil", "#6b4423", {fs: 36}); s.gr = chip(s.A, "plants use them to grow", "#2a9d8f", {fs: 36});
  // B: without decomposers
  s.B = el("g", {}, st); el("rect", {x: -300, y: -200, width: 1900, height: 1300, fill: "#dfe7ee"}, s.B);
  s.soilP = qSoil(s.B, 560, 7, true); s.soilD = qSoil(s.B, 560, 7); el("line", {x1: -300, y1: 560, x2: 1600, y2: 560, stroke: INK, "stroke-width": 6}, s.B);
  seed = 14; s.sn = []; for (let i = 0; i < 16; i++) { const n = qNut(s.B, 12, false); tf(n, `translate(${60 + rnd() * 1080} ${610 + rnd() * 210})`); s.sn.push(n); }
  s.pile = []; seed = 77; for (let i = 0; i < 34; i++) { const g = el("g", {}, s.B), row = Math.floor(Math.sqrt(i * 1.1)), n = 9 - row, j = i - [0, 9, 17, 24, 30, 35][Math.min(5, row)]; g.x = 170 + ((i * 53) % 9) * 62 + rnd() * 30 - row * 4 + row * 30; g.y = 548 - Math.floor(i / 8) * 46 - rnd() * 10;
    if (i % 7 === 3) tf(qDead(g), "scale(.3)"); else if (i % 9 === 5) el("path", {d: "M-50 0 L50 -10 M-10 -4 L10 -26", stroke: INK, "stroke-width": 15, "stroke-linecap": "round"}, g), el("path", {d: "M-50 0 L50 -10 M-10 -4 L10 -26", stroke: "#8a6548", "stroke-width": 8, "stroke-linecap": "round"}, g); else tf(qDry(g, ["#b07a3c", "#96652e", "#c99a4f"][i % 3]), `rotate(${rnd() * 60 - 30}) scale(1.15)`); g.r = rnd() * 40 - 20; s.pile.push(g); }
  s.vg = el("g", {transform: "translate(1010 560)"}, s.B); s.v = qVeg(s.vg);
  s.wo = chip(st, "Without decomposers…", "#e63946", {fs: 46}); s.c1 = chip(st, "dead things pile up", INK, {fs: 40}); s.c2 = chip(st, "the soil runs out of nutrients", INK, {fs: 40});
  s.run = t => { const a = (w, f) => cue("textbook", w, f), t0 = SC.textbook.t0, tBa = a("bacteria", .26), tFu = a("fungi", .3), tBr = a("break", .34), tD = a("dead", .37), tS = a("simpler", .45), tSo = a("soil", .59), tPl = a("plants#2", .64), tW = a("without", .73) - .3, tPi = a("pile", .85), tR = a("run", .93), kB = ramp(t, tW, tW + .4);
    qPop(s.h, 780, 60, t, t0 - .2); op(s.h, on(t, t0 - .2, tW, .2)); op(s.A, 1 - kB); op(s.B, kB);
    const TT = [tD - .1, tBa - .1, tFu - .1, tS - .1, tPl - .1]; s.it.forEach((g, i) => { qPop(g, X[i], Y, t, TT[i], 1 + .08 * on(t, TT[i], TT[i] + 1, .2)); op(s.nm[i], ramp(t, TT[i] + .1, TT[i] + .4)); });
    op(s.br, ramp(t, tBa - .2, tBa + .1)); qPop(s.dc, (X[1] + X[2]) / 2, Y - 208, t, tBa - .2);
    [tBr, tS - .3, tPl - .3].forEach((tt, i) => qPop(s.ar[i], s.ar[i].x, Y, t, tt)); qPop(s.bk, X[3], Y + 262, t, tSo - .3); qPop(s.gr, X[4] - 70, Y - 200, t, a("grow", .7) - .5);
    qPop(s.wo, 780, 70, t, tW + .2); qPop(s.c1, 430, 190, t, tPi - .2); qPop(s.c2, 600, 700, t, tR - .2);
    s.pile.forEach((g, i) => { const tt = tW + .5 + i * (tR - tW) / 36, f = clamp((t - tt) / .45); tf(g, `translate(${g.x} ${lerp(g.y - 500, g.y, f * f)}) rotate(${g.r * f})`); op(g, f > 0 ? 1 : 0); });
    const kR = ramp(t, tR - .4, tR + 1.2); op(s.soilD, 1 - kR); s.sn.forEach((n, i) => op(n, 1 - ramp(t, tR - .4 + i * .06, tR + i * .06)));
    tf(s.v, `scale(${1.7 - .2 * kR})`); s.v.lv.forEach((l, i) => { if (i % 2 === 0) set(l, "fill", mix(i % 4 ? "#3fa34d" : "#57b85a", "#d9c27a", kR)); else tf(l, `rotate(${[-64, 58, -30, 34, 0][(i - 1) / 2] * (1 + .55 * kR) + (i === 9 ? 30 * kR : 0)})`); }); };
  return s; })();

// ---- HELPERS: ants, flies, earthworms, millipedes and woodlice are detritivores: they break dead things into smaller pieces,
// then bacteria and fungi (the decomposers) finish the job. Two rows, one word each. Then: leave them alone!
S.helpers = (() => { const s = scene("helpers", "#f3ead2", "#e6ccb2"), st = qW(s), X = [130, 365, 600, 835, 1070], Y1 = 250, Y2 = 660, K = ["ant", "fly", "worm", "milli", "louse"], NM = ["ant", "fly", "earthworm", "millipede", "woodlouse"];
  s.A = el("g", {}, st); s.h = chip(st, "🐜 The little helpers", "#bc6c25", {fs: 40});
  s.it = K.map((k, i) => { const g = el("g", {}, s.A); g.d = qDisc(g, k, "#bc6c25"); tf(g.d, "scale(.78)"); g.n = tx(g, {x: 0, y: 134, "text-anchor": "middle", "font-size": 36, "font-weight": 700, fill: INK}, NM[i]); return g; });
  s.band = el("g", {}, s.A); el("path", {d: `M${X[0] - 96} ${Y1 - 112} V${Y1 - 134} H${X[4] + 96} V${Y1 - 112}`, fill: "none", stroke: INK, "stroke-width": 7, "stroke-linecap": "round", "stroke-linejoin": "round"}, s.band); s.dt = chip(s.band, "detritivores", "#bc6c25", {fs: 44});
  // row 2: dead leaf -> smaller pieces -> bacteria, fungi
  const X2 = [150, 430, 780, 1010], K2 = ["leaf", "bits", "bacteria", "fungi"], N2 = ["dead leaf", "smaller pieces", "bacteria", "fungi"];
  s.r2 = K2.map((k, i) => { const g = el("g", {}, s.A); tf(qDisc(g, k, i < 2 ? "#8d99ae" : "#7f5539"), "scale(.72)"); tx(g, {x: 0, y: 126, "text-anchor": "middle", "font-size": 34, "font-weight": 700, fill: INK}, N2[i]); return g; });
  s.nib = el("g", {}, s.A); tf(qAnt(s.nib), "scale(.34)"); s.nib2 = el("g", {}, s.A); tf(qLouse(s.nib2), "scale(-.34 .34)");
  s.a1 = qArrow(s.A, .5, "#bc6c25"); s.a2 = qArrow(s.A, .5, "#7f5539");
  s.b2 = el("g", {}, s.A); el("path", {d: `M${X2[2] - 92} ${Y2 - 104} V${Y2 - 124} H${X2[3] + 92} V${Y2 - 104}`, fill: "none", stroke: INK, "stroke-width": 7, "stroke-linecap": "round", "stroke-linejoin": "round"}, s.b2); s.dc = chip(s.b2, "decomposers", "#7f5539", {fs: 40});
  s.fin = chip(s.A, "finish the job", "#2a9d8f", {fs: 34});
  // B: leave them alone
  s.B = el("g", {}, st); el("rect", {x: -300, y: -200, width: 1900, height: 1300, fill: "#d8f3dc"}, s.B); el("rect", {x: -300, y: 640, width: 1900, height: 500, fill: "#a9744a"}, s.B); el("line", {x1: -300, y1: 640, x2: 1600, y2: 640, stroke: INK, "stroke-width": 6}, s.B);
  [[120, 30], [330, -20], [900, 10], [1090, -30]].forEach(([x, r]) => tf(qDry(s.B), `translate(${x} ${660 + (x % 3) * 20}) rotate(${r}) scale(1.3)`));
  s.walk = [[qAnt, .8, 0], [qLouse, .9, 1], [qMilli, .95, 2], [qAnt, .66, 3]].map(([f, k, i]) => { const g = el("g", {}, s.B); tf(f(g), `scale(${k})`); g.i = i; return g; });
  s.hand = el("g", {}, s.B); emo(s.hand, 0, 0, 230, "✋"); s.slip = el("g", {}, s.B); el("rect", qA({x: -12, y: 40, width: 24, height: 230, rx: 10, fill: "#f77f00"}), s.slip); el("rect", qA({x: -100, y: -130, width: 200, height: 180, rx: 26, fill: "#ffd166"}), s.slip); for (let i = 1; i < 6; i++) { el("line", {x1: -100 + i * 33.3, y1: -126, x2: -100 + i * 33.3, y2: 46, stroke: INK, "stroke-width": 3, opacity: .5}, s.slip); el("line", {x1: -96, y1: -130 + i * 30, x2: 96, y2: -130 + i * 30, stroke: INK, "stroke-width": 3, opacity: .5}, s.slip); } s.sx = qX(s.slip, 90);
  s.dk = chip(st, "Don't kill them!", "#e63946", {fs: 46}); s.lv = qT(st, 600, 0, "Leave them alone! 💚", 104, "#fff");
  s.run = t => { const a = (w, f) => cue("helpers", w, f), t0 = SC.helpers.t0, T = [a("ants", .13), a("flies", .15), a("earthworms", .2), a("millipedes", .25), a("woodlice", .29)], tDt = a("detritivores", .45), tBr = a("break", .54), tSm = a("smaller", .6), tBa = a("bacteria", .7), tFu = a("fungi", .74), tFi = a("finish", .78), tK = a("don't#2", .87) - .25, tL = a("leave", .95), kB = ramp(t, tK, tK + .4);
    op(s.A, 1 - kB); op(s.B, kB); qPop(s.h, 760, 56, t, t0 - .2); op(s.h, on(t, t0 - .2, tDt - .2, .2));
    s.it.forEach((g, i) => { qPop(g, X[i], Y1, t, T[i] - .12, 1 + .1 * on(t, T[i] - .1, T[i] + .5, .15)); }); s.it[2].d.worm.run(t * 5);
    op(s.band, ramp(t, tDt - .2, tDt + .1)); qPop(s.dt, 600, Y1 - 176, t, tDt - .15);
    const TT = [tBr - .5, tSm - .1, tBa - .1, tFu - .1]; s.r2.forEach((g, i) => qPop(g, X2[i], Y2, t, TT[i]));
    qPop(s.a1, (X2[0] + X2[1]) / 2, Y2, t, tBr); qPop(s.a2, (X2[1] + X2[2]) / 2 + 6, Y2, t, tBa - .4);
    const nb = on(t, tBr - .2, tBa, .2); tf(s.nib, `translate(${X2[0] + 60 + 5 * Math.sin(t * 14)} ${Y2 - 78}) rotate(${4 * Math.sin(t * 14)})`); op(s.nib, nb); tf(s.nib2, `translate(${X2[0] + 190 - 5 * Math.sin(t * 12)} ${Y2 + 70})`); op(s.nib2, nb);
    op(s.b2, ramp(t, tBa - .2, tBa + .1)); qPop(s.dc, (X2[2] + X2[3]) / 2, Y2 - 162, t, tBa - .15); qPop(s.fin, (X2[2] + X2[3]) / 2, Y2 + 190, t, tFi - .1);
    s.walk.forEach(g => { const x = ((t * 46 + g.i * 330) % 1500) - 150; tf(g, `translate(${x} ${640 + (g.i % 2) * 2}) rotate(${1.5 * Math.sin(t * 16 + g.i)})`); });
    tf(s.slip, `translate(330 340) rotate(-24) scale(${Math.max(0, pop(t, tK + .2))})`); qPop(s.sx, 0, 0, t, tK + .7); qPop(s.dk, 330, 120, t, tK + .3); op(s.dk, on(t, tK + .3, tL, .15)); op(s.slip, on(t, tK + .1, tL, .2));
    tf(s.hand, `translate(${lerp(1500, 930, ramp(t, tL - .3, tL + .3))} 400) rotate(${8 * Math.sin(t * 4)})`); op(s.hand, ramp(t, tL - .3, tL));
    set(s.lv, "x", 0); tf(s.lv, `translate(520 250) scale(${Math.max(0, pop(t, tL))})`); op(s.lv, ramp(t, tL - .05, tL + .1)); };
  return s; })();

// ---- FOOD SECURITY: a community garden by an HDB block; scraps -> compost bin -> compost -> gardens and farms (not burnt);
// a hawker plate finished clean, and fewer crates of food to buy from other countries
S.security = (() => { const s = scene("security", "#bde0fe", "#e3f6ff"), st = qW(s), X = [115, 355, 595, 860, 1090], Y = 400;
  s.A = el("g", {}, st); el("rect", {x: -300, y: -200, width: 1900, height: 1300, fill: qGrad([[0, "#58b4ee"], [.7, "#dff4ff"]])}, s.A);
  tf(qHDB(s.A, 440, 560, "#f77f00"), "translate(250 640)"); tf(qHDB(s.A, 380, 460, "#2a9d8f"), "translate(700 640)");
  { const f = el("g", {transform: "translate(1050 640)"}, s.A); el("rect", qA({x: -130, y: -380, width: 260, height: 380, fill: "#e9ecef"}), f); for (let r = 0; r < 5; r++) { el("rect", {x: -116, y: -350 + r * 70, width: 232, height: 50, fill: "#c5f6fa", stroke: INK, "stroke-width": 3}, f); for (let i = 0; i < 6; i++) el("circle", {cx: -96 + i * 38, cy: -316 + r * 70, r: 13, fill: i % 2 ? "#57b85a" : "#3fa34d", stroke: INK, "stroke-width": 2.5}, f); }
    el("rect", qA({x: -100, y: -436, width: 200, height: 54, rx: 8, fill: "#fff", "stroke-width": 4}), f); tx(f, {x: 0, y: -398, "text-anchor": "middle", "font-size": 28, "font-weight": 700, fill: "#2d6a4f"}, "Vertical farm"); }
  el("rect", {x: -300, y: 640, width: 1900, height: 500, fill: "#8fce7e"}, s.A); el("line", {x1: -300, y1: 640, x2: 1600, y2: 640, stroke: INK, "stroke-width": 5}, s.A);
  [[220, 800, 460, 4], [760, 800, 460, 4]].forEach(([x, y, w, n]) => tf(qBed(s.A, w, n, true), `translate(${x} ${y}) scale(1.15)`));
  { const g = el("g", {transform: "translate(495 716)"}, s.A); el("rect", qA({x: -5, y: -60, width: 10, height: 90, fill: "#8a6548", "stroke-width": 4}), g); el("rect", qA({x: -120, y: -118, width: 240, height: 62, rx: 10, fill: "#fff"}), g); tx(g, {x: 0, y: -76, "text-anchor": "middle", "font-size": 26, "font-weight": 700, fill: "#2d6a4f"}, "Community Garden"); }
  tf(qBin(s.A), "translate(1100 830) scale(.6)");
  s.h = chip(st, "🍽️ Food security: enough safe food for everyone", "#3a0ca3", {fs: 36}); s.hs = chip(st, "healthy soil → healthy food", "#6a994e", {fs: 44});
  s.B = el("g", {}, st); el("rect", {x: -300, y: -200, width: 1900, height: 1300, fill: "#fff8e8", opacity: .95}, s.B);
  const K = ["scraps", "bin", "compost", "bed", "farm"], NM = ["food scraps", "compost bin", "compost", "gardens", "farms"];
  s.it = K.map((k, i) => { const g = el("g", {}, s.B); tf(qDisc(g, k, "#6a994e"), "scale(.8)"); tx(g, {x: 0, y: 138, "text-anchor": "middle", "font-size": 36, "font-weight": 700, fill: INK}, NM[i]); return g; });
  s.ar = [0, 1, 2].map(i => { const g = qArrow(s.B, .42, "#6a994e"); g.x = (X[i] + X[i + 1]) / 2 + (i === 2 ? 6 : 0); return g; });
  s.no = el("g", {}, s.B); tf(qWTE(s.no), "scale(.44)"); s.nx = qX(s.no, 70); s.nb = chip(s.B, "not burnt!", "#e63946", {fs: 40});
  s.C = el("g", {}, st); el("rect", {x: -300, y: -200, width: 1900, height: 1300, fill: "#fff1d6"}, s.C);
  s.tb = el("g", {transform: "translate(270 600)"}, s.C); tf(qTable(s.tb), "scale(1.1)"); s.cp = qPlate(s.tb, false); tf(s.cp, "translate(0 -12) scale(1.7)"); el("path", {d: "M-34 -20 L34 -12 M-34 -4 L34 4", stroke: "#adb5bd", "stroke-width": 9, "stroke-linecap": "round"}, s.tb);
  s.cs = [[-190, -120], [170, -150], [0, -190]].map(([x, y]) => { const e = emo(s.tb, 0, 0, 70, "✨"); e.px = x; e.py = y; return e; }); s.cl = chip(s.C, "plate finished clean!", "#06d6a0", {fs: 40, ink: INK});
  s.ship = el("g", {}, s.C); el("rect", {x: -330, y: 60, width: 660, height: 90, fill: "#48cae4"}, s.ship); el("path", qA({d: "M-270 0 H270 L220 90 H-220 Z", fill: "#e76f51"}), s.ship); el("rect", qA({x: 150, y: -90, width: 80, height: 90, fill: "#f8f9fa"}), s.ship);
  s.cr = [0, 1, 2, 3, 4, 5].map(i => { const g = el("g", {transform: `translate(${-210 + (i % 3) * 110} ${-44 - Math.floor(i / 3) * 84})`}, s.ship); el("rect", qA({x: -50, y: -40, width: 100, height: 80, rx: 6, fill: "#ffd166", "stroke-width": 5}), g); emo(g, 0, 2, 50, ["🥬", "🍚", "🥚", "🍎", "🐟", "🥕"][i]); return g; });
  s.sl = tx(s.C, {x: 900, y: 730, "text-anchor": "middle", "font-size": 36, "font-weight": 700, fill: INK}, "food bought from other countries"); s.wl = chip(st, "waste less → buy less", "#3a86ff", {fs: 46});
  s.run = t => { const a = (w, f) => cue("security", w, f), t0 = SC.security.t0, tH = a("healthy", .2), tC = a("composting", .36) - .3, tCo = a("compost", .52), tG = a("gardens", .58), tF = a("farms", .63), tI = a("instead", .69), tW = a("wasting", .8) - .3, tBu = a("buy", .95), kB = ramp(t, tC, tC + .4), kC = ramp(t, tW, tW + .4);
    op(s.B, kB * (1 - kC)); op(s.C, kC); qPop(s.h, 640, 130, t, t0 - .1); op(s.h, on(t, t0 - .1, tW, .2)); qPop(s.hs, 600, 220, t, tH - .1); op(s.hs, on(t, tH - .1, tC, .2));
    tf(s.A, `translate(600 450) scale(${1.02 + .06 * ramp(t, t0, tC)}) translate(-600 -450)`);
    const TT = [tC + .3, tC + .9, tCo - .2, tG - .1, tF - .1]; s.it.forEach((g, i) => qPop(g, X[i], Y, t, TT[i])); s.ar.forEach((g, i) => qPop(g, g.x, Y, t, [tC + .7, tCo - .5, tG - .4][i]));
    tf(s.no, `translate(520 800) scale(${Math.max(0, pop(t, tI - .2))})`); op(s.no, ramp(t, tI - .25, tI)); qPop(s.nx, 0, -100, t, tI + .3, 1.3); qPop(s.nb, 800, 740, t, tI + .4);
    s.cs.forEach((e, i) => tf(e, `translate(${e.px} ${e.py}) scale(${Math.max(0, pop(t, tW + .5 + i * .12)) * (1 + .15 * Math.sin(t * 6 + i))})`)); qPop(s.cl, 280, 250, t, tW + .5);
    tf(s.ship, `translate(${lerp(1600, 900, ramp(t, tW + .6, tW + 1.6))} 520)`); s.cr.forEach((g, i) => op(g, i >= 3 ? 1 - ramp(t, tBu - .7 + (i - 3) * .15, tBu - .4 + (i - 3) * .15) : 1)); op(s.sl, ramp(t, tW + 1.2, tW + 1.6)); qPop(s.wl, 640, 840, t, tBu - .6); };
  return s; })();

// ---- SEMAKAU: composting and recycling both mean less to burn, so less ash goes by barge to Pulau Semakau (on the real map,
// about 8 km south of the main island), Singapore's only landfill, which could be full by about 2035
S.semakau = (() => { const s = scene("semakau", "#cfe8ef", "#a8dadc"), st = qW(s);
  s.A = el("g", {}, st); el("rect", {x: -300, y: 700, width: 1900, height: 500, fill: "#b7c9cf"}, s.A); el("line", {x1: -300, y1: 700, x2: 1600, y2: 700, stroke: INK, "stroke-width": 5}, s.A);
  s.cb = el("g", {}, s.A); s.cbin = qBin(s.cb); s.cbin.open(.9); s.bb = el("g", {}, s.A); qBlue(s.bb); s.plus = qT(s.A, 392, 590, "+", 130, INK);
  s.wg = el("g", {}, s.A); s.wte = qWTE(s.wg); s.wl = tx(s.wg, {x: -20, y: 62, "text-anchor": "middle", "font-size": 46, "font-weight": 700, fill: INK}, "waste-to-energy plant");
  s.ncb = tx(s.A, {x: 215, y: 752, "text-anchor": "middle", "font-size": 38, "font-weight": 700, fill: INK}, "compost bin"); s.nbb = tx(s.A, {x: 545, y: 752, "text-anchor": "middle", "font-size": 38, "font-weight": 700, fill: INK}, "recycling bin");
  s.peel = el("g", {}, s.A); tf(qPeel(s.peel, "banana"), "scale(.9)"); s.can = el("g", {}, s.A); el("rect", qA({x: -24, y: -40, width: 48, height: 80, rx: 9, fill: "#e63946", "stroke-width": 5}), s.can); el("rect", {x: -24, y: -14, width: 48, height: 22, fill: "#fff"}, s.can); el("ellipse", {cx: 0, cy: -38, rx: 20, ry: 6, fill: "#ced4da", stroke: INK, "stroke-width": 3}, s.can);
  s.ghost = [0, 1].map(i => el("path", {d: i ? "M700 230 Q840 220 880 330" : "M560 160 Q800 120 900 320", fill: "none", stroke: "#e63946", "stroke-width": 8, "stroke-dasharray": "16 14", "stroke-linecap": "round", opacity: .0}, s.A)); s.gx = qX(s.A, 34);
  s.ol = chip(st, "one less thing to burn", "#06d6a0", {fs: 44, ink: INK});
  s.ash = el("g", {}, s.A); s.ashB = el("path", qA({d: "M-150 0 Q-70 -150 0 -156 Q70 -150 150 0 Z", fill: "#adb5bd"}), s.ash); s.ashS = el("path", qA({d: "M-150 0 Q-70 -150 0 -156 Q70 -150 150 0 Z", fill: "#868e96"}), s.ash); s.al = chip(s.A, "less burning → less ash", "#6c757d", {fs: 40});
  // the real map
  s.C = el("g", {}, st); el("rect", {x: -300, y: -200, width: 1900, height: 1300, fill: "#48cae4"}, s.C); s.map = qMap(s.C, 1220, 800, .72, 760, 560, 0); tf(s.map, "translate(600 440)");
  const pt = q => s.map.pt(q), S0 = pt(QSG.tuas0), S1 = pt(QSG.sem), TU = pt(QSG.tuas), mid = [(S0[0] + S1[0]) / 2 - 30, (S0[1] + S1[1]) / 2 + 50];
  s.sgL = qT(s.map, pt(QSG.mid)[0] + 70, pt(QSG.mid)[1] + 60, "Singapore", 54); s.rt = el("path", {d: `M${S0[0]} ${S0[1]} Q${mid[0]} ${mid[1]} ${S1[0]} ${S1[1] - 12}`, fill: "none", stroke: "#fff", "stroke-width": 6, "stroke-dasharray": "4 14", "stroke-linecap": "round"}, s.map);
  s.tp = el("g", {transform: `translate(${S0[0]} ${S0[1]})`}, s.map); el("circle", {r: 13, fill: "#f76707", stroke: "#fff", "stroke-width": 5}, s.tp); s.tl = qT(s.map, S0[0] - 20, S0[1] - 30, "Tuas: where the ash is loaded", 30);
  s.pin = el("g", {transform: `translate(${S1[0]} ${S1[1]})`}, s.map); s.pr = el("circle", {r: 15, fill: "none", stroke: "#e63946", "stroke-width": 5}, s.pin);
  s.sl = qT(s.map, S1[0] + 40, S1[1] + 72, "Pulau Semakau", 50, "#ffe14d"); s.s2 = chip(s.map, "Singapore's only landfill", "#6c757d", {fs: 34});
  s.bg = el("g", {}, s.map); el("path", qA({d: "M-36 -8 H30 L40 -8 L30 12 H-30 Z", fill: "#e76f51", "stroke-width": 4}), s.bg); el("path", qA({d: "M-24 -8 Q0 -30 22 -8 Z", fill: "#868e96", "stroke-width": 4}), s.bg);
  s.sc = el("g", {}, s.map); el("line", {x1: 0, y1: 0, x2: 8 / 111 * 3300 * .72, y2: 0, stroke: "#fff", "stroke-width": 6, "stroke-linecap": "round"}, s.sc); tx(s.sc, {x: 8 / 111 * 3300 * .72 / 2, y: -12, "text-anchor": "middle", "font-size": 26, "font-weight": 700, fill: "#fff"}, "8 km");
  s.bar = el("g", {}, st); el("rect", qA({x: -330, y: -86, width: 660, height: 212, rx: 30, fill: "#fff", "stroke-width": 7, filter: "url(#sh)"}), s.bar); tx(s.bar, {x: -300, y: -38, "font-size": 34, "font-weight": 700, fill: INK}, "Semakau Landfill: how full?");
  el("rect", {x: -300, y: -16, width: 600, height: 46, rx: 12, fill: "#e9ecef", stroke: INK, "stroke-width": 4}, s.bar); s.fill = el("rect", {x: -297, y: -13, height: 40, rx: 10, fill: "#6c757d"}, s.bar); tx(s.bar, {x: 300, y: 68, "text-anchor": "end", "font-size": 30, "font-weight": 700, fill: "#e63946"}, "full by about 2035?"); s.slow = tx(s.bar, {x: -300, y: 106, "font-size": 30, "font-weight": 700, fill: "#2a9d8f"}, "less ash = fills more slowly");
  s.run = t => { const a = (w, f) => cue("semakau", w, f), t0 = SC.semakau.t0, tR = a("recycling", .1), tP = a("peel", .2), tCa = a("can", .31), tO = a("one", .39), tA = a("less#2", .51), tS = a("pulau", .64) - .5, tOn = a("only", .78), tF = a("which", .86), kC = ramp(t, tS, tS + .4);
    op(s.A, 1 - kC); op(s.C, kC);
    tf(s.cb, `translate(215 700) scale(${1.12 * Math.max(0, pop(t, t0))})`); tf(s.bb, `translate(545 700) scale(${1.2 * Math.max(0, pop(t, tR - .1))})`); op(s.plus, ramp(t, tR - .2, tR + .1)); op(s.ncb, ramp(t, t0 + .2, t0 + .5)); op(s.nbb, ramp(t, tR, tR + .3));
    tf(s.wg, `translate(960 700) scale(${.8 * Math.max(0, pop(t, tO - .6))})`); op(s.wte.fire, .7 + .3 * Math.sin(t * 9));
    [[s.peel, tP, 215, 0], [s.can, tCa, 560, 1]].forEach(([e, tt, bx, i]) => { const k = ease((t - tt + .15) / .8), x = lerp(i ? 700 : 560, i ? 545 : 215, k), y = lerp(i ? 230 : 160, 380, k) - 120 * Math.sin(Math.PI * k); tf(e, `translate(${x} ${y}) rotate(${k * 260})`); op(e, on(t, tt - .5, tt + .6, .15)); op(s.ghost[i], .8 * on(t, tO - .2, tA, .2)); });
    qPop(s.gx, 890, 330, t, tO); op(s.gx, on(t, tO, tA, .2)); qPop(s.ol, 640, 150, t, tO); op(s.ol, on(t, tO, tA, .2));
    const kA = ramp(t, tA + .5, tA + 1.4); tf(s.ash, `translate(1212 700) scale(.56)`); op(s.ash, ramp(t, tA - .2, tA + .1)); tf(s.ashS, `translate(0 0) scale(${1 - .5 * kA})`); op(s.ashB, .35); qPop(s.al, 640, 150, t, tA);
    const kb = ease((t - tS - .7) / Math.max(1, tOn - tS)), u = 1 - kb, bx = u * u * S0[0] + 2 * u * kb * mid[0] + kb * kb * S1[0], by = u * u * S0[1] + 2 * u * kb * mid[1] + kb * kb * (S1[1] - 12); tf(s.bg, `translate(${bx} ${by})`);
    const kp = (t * .8) % 1; set(s.pr, "r", 15 + 44 * kp); op(s.pr, 1 - kp); op(s.sl, ramp(t, tS + .5, tS + .8)); qPop(s.s2, S1[0] + 40, S1[1] + 128, t, tOn - .1); tf(s.sc, `translate(${S1[0] + 230} ${S1[1] - 20})`);
    qPop(s.bar, 850, 140, t, tF - .1); const f1 = ramp(t, tF, tF + .7) * .78, f2 = .78 + .1 * clamp((t - tF - .7) / 4); set(s.fill, "width", 594 * (t < tF + .7 ? f1 : f2)); op(s.slow, ramp(t, tF + .9, tF + 1.2)); };
  return s; })();

// ---- HABIT: a small peel container on the counter of an HDB kitchen; then four benefits
S.habit = (() => { const s = scene("habit", "#fff3d6", "#ffe8b5"), st = qW(s);
  s.A = el("g", {}, st); el("rect", {x: -300, y: -200, width: 1900, height: 1300, fill: "#fdf0d5"}, s.A);
  for (let r = 0; r < 5; r++) for (let c = 0; c < 16; c++) el("rect", {x: -300 + c * 120, y: 200 + r * 76, width: 116, height: 72, rx: 6, fill: (r + c) % 2 ? "#e9f5f9" : "#d6ecf3", stroke: "#b8d8e3", "stroke-width": 2}, s.A);
  { const w = el("g", {transform: "translate(250 240)"}, s.A); el("rect", qA({x: -190, y: -150, width: 380, height: 300, fill: "#a8dcf5"}), w); tf(qHDB(w, 150, 230, "#2a9d8f"), "translate(-80 148)"); tf(qHDB(w, 130, 180, "#f77f00"), "translate(90 148)"); el("rect", {x: -190, y: -150, width: 380, height: 300, fill: "none", stroke: "#fff", "stroke-width": 14}, w); el("rect", qA({x: -190, y: -150, width: 380, height: 300, fill: "none"}), w); el("line", {x1: 0, y1: -150, x2: 0, y2: 150, stroke: "#fff", "stroke-width": 10}, w); }
  [-40, 300, 640, 980].forEach(x => el("rect", qA({x, y: -200, width: 330, height: 250, fill: "#f4e1c1"}), s.A)); [250, 590, 930].forEach(x => el("circle", {cx: x, cy: 10, r: 9, fill: INK}, s.A));
  el("rect", qA({x: -300, y: 590, width: 1900, height: 60, fill: "#dee2e6"}), s.A); el("rect", {x: -300, y: 650, width: 1900, height: 500, fill: "#c98f52", stroke: INK, "stroke-width": 6}, s.A); [100, 500, 900].forEach(x => { el("rect", qA({x, y: 680, width: 360, height: 300, fill: "#d9a066", "stroke-width": 5}), s.A); el("rect", {x: x + 150, y: 700, width: 60, height: 12, rx: 6, fill: INK}, s.A); });
  { const b = el("g", {transform: "translate(930 590)"}, s.A); el("rect", qA({x: -150, y: -22, width: 300, height: 22, rx: 8, fill: "#e0b77e"}), b); emo(b, -60, -62, 90, "🍌"); emo(b, 50, -58, 84, "🍎"); emo(b, 130, -120, 70, "🥕"); }
  { const k = el("g", {transform: "translate(150 590)"}, s.A); el("path", qA({d: "M-40 0 V-160 Q-40 -200 0 -200 H40 V-170", fill: "none", stroke: INK, "stroke-width": 26}), k); el("path", {d: "M-40 0 V-160 Q-40 -200 0 -200 H40 V-170", fill: "none", stroke: "#ced4da", "stroke-width": 14, "stroke-linecap": "round"}, k); }
  s.tub = el("g", {}, s.A); el("path", qA({d: "M-100 -150 H100 L86 0 H-86 Z", fill: "#95d5b2"}), s.tub); el("rect", qA({x: -74, y: -112, width: 148, height: 62, rx: 10, fill: "#fff", "stroke-width": 4}), s.tub); tx(s.tub, {x: 0, y: -68, "text-anchor": "middle", "font-size": 38, "font-weight": 700, fill: "#2d6a4f"}, "PEELS");
  s.lid = el("g", {}, s.tub); el("rect", qA({x: -112, y: -176, width: 224, height: 30, rx: 12, fill: "#52b788"}), s.lid); el("rect", qA({x: -24, y: -196, width: 48, height: 22, rx: 8, fill: "#52b788", "stroke-width": 5}), s.lid);
  s.pe = ["banana", "orange", "carrot", "apple"].map(k => { const g = el("g", {}, s.A); tf(qPeel(g, k), "scale(.8)"); return g; });
  s.h = chip(st, "♻️ Make composting a habit!", "#2d6a4f", {fs: 46}); s.kc = chip(st, "a small container for fruit and vegetable peels", INK, {fs: 34});
  s.B = el("g", {}, st); el("rect", {x: -300, y: -200, width: 1900, height: 1300, fill: "#fff8e8", opacity: .93}, s.B); s.bh = chip(st, "⭐ The benefits", "#f72585", {fs: 46});
  const pics = [g => { emo(g, 0, -10, 130, "🗑️"); el("path", qA({d: "M-26 -40 H26 V0 H54 L0 54 L-54 0 H-26 Z", fill: "#06d6a0", transform: "translate(112 0) scale(.7)"}), g); },
    g => { el("path", qA({d: "M-120 60 Q-60 -60 0 -66 Q60 -60 120 60 Z", fill: "#3b2416", "stroke-width": 5}), g); [[-40, 20], [20, -10], [56, 36], [-6, 36], [-70, 46]].forEach(([x, y]) => tf(qNut(g, 11, false), `translate(${x} ${y})`)); },
    g => { tf(qVeg(g), "translate(0 70) scale(.86)"); emo(g, 96, -50, 54, "✨"); },
    g => { el("path", qA({d: "M-56 -70 H56 L66 66 H-66 Z", fill: "#f1f3f5", "stroke-width": 5}), g); el("rect", {x: -50, y: -30, width: 100, height: 50, fill: "#f77f00"}, g); tx(g, {x: 0, y: 6, "text-anchor": "middle", "font-size": 24, "font-weight": 700, fill: "#fff"}, "fertiliser"); emo(g, 104, -40, 70, "💰"); tf(qX(g, 22), "translate(104 -40)"); }];
  s.cards = ["Less rubbish", "Richer soil", "Healthier plants", "Less fertiliser to buy"].map((lab, i) => { const g = el("g", {}, s.B); el("rect", {x: -255, y: -160, width: 510, height: 320, rx: 34, fill: "#fff", stroke: INK, "stroke-width": 7, filter: "url(#sh)"}, g);
    el("rect", {x: -255, y: 74, width: 510, height: 86, rx: 34, fill: ["#e63946", "#7f5539", "#2a9d8f", "#3a86ff"][i]}, g); el("rect", {x: -255, y: 74, width: 510, height: 40, fill: ["#e63946", "#7f5539", "#2a9d8f", "#3a86ff"][i]}, g); el("rect", {x: -255, y: -160, width: 510, height: 320, rx: 34, fill: "none", stroke: INK, "stroke-width": 7}, g);
    pics[i](el("g", {transform: "translate(0 -46)"}, g)); tx(g, {x: 0, y: 132, "text-anchor": "middle", "font-size": 42, "font-weight": 700, fill: "#fff", "data-fit": 470}, lab); return g; });
  s.run = t => { const a = (w, f) => cue("habit", w, f), t0 = SC.habit.t0, tC = a("container", .23), tP = a("fruit", .3), tB = a("benefits", .51) - .4, T = [a("less", .63), a("richer", .71), a("healthier", .78), a("less#2", .89)], kB = ramp(t, tB, tB + .4);
    op(s.B, kB); qPop(s.h, 800, 60, t, t0 - .1); op(s.h, on(t, t0 - .1, tB, .2)); qPop(s.kc, 560, 150, t, tC + .2); op(s.kc, on(t, tC + .2, tB, .2));
    tf(s.A, `translate(560 480) scale(${1 + .18 * ramp(t, tC - .3, tP + 1.2)}) translate(-560 -480)`);
    tf(s.tub, `translate(560 590) scale(${1.15 * Math.max(0, pop(t, tC - .15))})`); tf(s.lid, `translate(${150 * ramp(t, tP - .3, tP)} ${-60 * ramp(t, tP - .3, tP)}) rotate(${24 * ramp(t, tP - .3, tP)})`);
    s.pe.forEach((g, i) => { const tt = tP + i * .32, k = clamp((t - tt) / .6); tf(g, `translate(${lerp(820 + i * 40, 540 + i * 14, k)} ${lerp(470, 420, k) - 190 * Math.sin(Math.PI * k) + 30 * k * k}) rotate(${k * 300})`); op(g, k > 0 && k < 1 ? 1 : 0); });
    qPop(s.bh, 640, 60, t, tB + .2); s.cards.forEach((g, i) => qPop(g, 330 + (i % 2) * 560, 300 + Math.floor(i / 2) * 350, t, T[i] - .12, .98)); };
  return s; })();

// ---- TRY THIS: a mini compost container: peels, dry leaves, soil; keep it damp, stir; dark compost in a few weeks. No meat, fish or oily food.
S.try = (() => { const s = scene("try", "#caffbf", "#9bf6ff"), st = qW(s), TX = 330, TB = 830, TW = 480;
  s.h = chip(st, "✏️ Try this at home!", "#7209b7", {fs: 46});
  s.tub = el("g", {}, st); el("path", {d: `M${TX - TW / 2} ${TB - 360} H${TX + TW / 2} L${TX + TW / 2 - 30} ${TB} H${TX - TW / 2 + 30} Z`, fill: "#fff", opacity: .55}, s.tub);
  const cp = el("clipPath", {id: "qtub"}, qDefs()); el("path", {d: `M${TX - TW / 2} ${TB - 360} H${TX + TW / 2} L${TX + TW / 2 - 30} ${TB} H${TX - TW / 2 + 30} Z`}, cp); s.in = el("g", {"clip-path": "url(#qtub)"}, s.tub);
  s.L = [0, 1, 2].map(i => el("g", {}, s.in)); // peels, dry leaves, soil (bottom to top)
  el("rect", {x: TX - 240, y: TB - 96, width: 480, height: 100, fill: "#ffe8cc"}, s.L[0]); seed = 31; for (let i = 0; i < 12; i++) tf(qPeel(s.L[0], QPEELS[i % 5]), `translate(${TX - 170 + (i % 6) * 68} ${TB - 30 - Math.floor(i / 6) * 40 - rnd() * 8}) rotate(${rnd() * 360}) scale(.62)`);
  el("rect", {x: TX - 240, y: TB - 176, width: 480, height: 84, fill: "#e6c79a"}, s.L[1]); for (let i = 0; i < 14; i++) tf(qDry(s.L[1], ["#b07a3c", "#96652e", "#c99a4f"][i % 3]), `translate(${TX - 180 + (i % 7) * 60} ${TB - 112 - Math.floor(i / 7) * 36 - rnd() * 6}) rotate(${rnd() * 80 - 40}) scale(.9)`);
  el("rect", {x: TX - 240, y: TB - 246, width: 480, height: 74, fill: "#5c3d2e", stroke: INK, "stroke-width": 4}, s.L[2]); for (let i = 0; i < 22; i++) el("circle", {cx: TX - 200 + rnd() * 400, cy: TB - 236 + rnd() * 54, r: 4 + rnd() * 6, fill: rnd() < .5 ? "#3b2416" : "#7a5234"}, s.L[2]);
  s.done = el("g", {}, s.in); el("rect", {x: TX - 240, y: TB - 210, width: 480, height: 220, fill: "#33221a", stroke: INK, "stroke-width": 4}, s.done); for (let i = 0; i < 70; i++) el("circle", {cx: TX - 205 + rnd() * 410, cy: TB - 196 + rnd() * 190, r: 4 + rnd() * 8, fill: ["#4a2f20", "#1f120b", "#5c3d2e"][i % 3]}, s.done);
  s.stick = el("g", {}, s.tub); el("rect", qA({x: -9, y: -330, width: 18, height: 360, rx: 8, fill: "#d9a066", "stroke-width": 5}), s.stick);
  el("path", qA({d: `M${TX - TW / 2} ${TB - 360} H${TX + TW / 2} L${TX + TW / 2 - 30} ${TB} H${TX - TW / 2 + 30} Z`, fill: "none", "stroke-width": 7}), s.tub); el("path", {d: `M${TX - TW / 2 + 26} ${TB - 330} L${TX - TW / 2 + 48} ${TB - 40}`, stroke: "#fff", "stroke-width": 12, "stroke-linecap": "round", opacity: .6}, s.tub);
  s.lab = ["peels", "dry leaves", "soil"].map((n, i) => { const g = el("g", {}, st), y = TB - 48 - i * 82; el("line", {x1: TX + TW / 2 - 10, y1: y, x2: 640, y2: y, stroke: INK, "stroke-width": 5, "stroke-linecap": "round"}, g); tx(g, {x: 654, y: y + 13, "font-size": 40, "font-weight": 700, fill: INK}, n); return g; });
  s.spray = el("g", {}, st); el("rect", qA({x: -34, y: 0, width: 68, height: 110, rx: 14, fill: "#74c0fc"}), s.spray); el("rect", qA({x: -14, y: -40, width: 28, height: 44, fill: "#f8f9fa", "stroke-width": 5}), s.spray); el("path", qA({d: "M-18 -66 H40 V-40 H-18 Z", fill: "#e63946", "stroke-width": 5}), s.spray);
  s.dr = [0, 1, 2, 3, 4, 5].map(() => el("path", {d: "M0 -12 Q10 4 0 10 Q-10 4 0 -12 Z", fill: "#4dabf7", stroke: INK, "stroke-width": 3}, st));
  s.c1 = chip(st, "💧 keep it damp", "#3a86ff", {fs: 40}); s.c2 = chip(st, "🥄 stir every few days", "#f77f00", {fs: 40}); s.c3 = chip(st, "🗓️ a few weeks later…", INK, {fs: 40}); s.c4 = chip(st, "dark, crumbly compost!", "#6b4423", {fs: 44});
  s.R = el("g", {}, st); el("rect", {x: 660, y: 150, width: 590, height: 640, rx: 34, fill: "#fff", stroke: INK, "stroke-width": 7, filter: "url(#sh)"}, s.R); tx(s.R, {x: 955, y: 226, "text-anchor": "middle", "font-size": 46, "font-weight": 700, fill: "#e63946"}, "Don't add:");
  s.bad = [["🥩", "meat"], ["🐟", "fish"], ["🍟", "oily food"]].map(([e, n], i) => { const g = el("g", {}, s.R); emo(g, 0, 0, 120, e); tx(g, {x: 0, y: 190, "text-anchor": "middle", "font-size": 38, "font-weight": 700, fill: INK}, n); return g; });
  s.x = el("g", {}, s.R); [1, -1].forEach(a => el("line", {x1: -250 * a, y1: -120, x2: 250 * a, y2: 120, stroke: INK, "stroke-width": 40, "stroke-linecap": "round"}, s.x)); [1, -1].forEach(a => el("line", {x1: -250 * a, y1: -120, x2: 250 * a, y2: 120, stroke: "#e63946", "stroke-width": 24, "stroke-linecap": "round"}, s.x)); s.w = chip(s.R, "👃 they smell  ·  🐀 attract pests", "#e63946", {fs: 32});
  s.run = t => { const a = (w, f) => cue("try", w, f), t0 = SC.try.t0, tC = a("container", .1), T = [a("fruit", .17), a("dry", .26), a("soil", .32)], tD = a("damp", .4), tS = a("stir", .43), tWk = a("weeks", .56), tDk = a("dark", .62), tBut = a("but", .75) - .1, tM = [a("meat", .77), a("fish", .8), a("oily", .84)], tSm = a("smell", .92);
    qPop(s.h, 760, 60, t, t0 - .2); tf(s.tub, `translate(${TX} ${TB}) scale(${Math.max(0, pop(t, tC - .15))}) translate(${-TX} ${-TB})`); op(s.tub, ramp(t, tC - .2, tC));
    const kD = ramp(t, tDk - .6, tDk + .4); s.L.forEach((g, i) => { const f = clamp((t - T[i] + .1) / .45); tf(g, `translate(0 ${-420 * (1 - f * f)})`); op(g, (f > 0 ? 1 : 0) * (1 - kD)); op(s.lab[i], on(t, T[i] + .2, tDk - .5, .2)); }); op(s.done, kD);
    const st1 = on(t, tS - .2, tWk, .25); tf(s.stick, `translate(${TX + 90 * Math.sin((t - tS) * 5)} ${TB - 150 - 20 * Math.cos((t - tS) * 10)}) rotate(${14 * Math.sin((t - tS) * 5)})`); op(s.stick, st1);
    tf(s.spray, `translate(${TX - 250} ${TB - 560}) rotate(24)`); op(s.spray, on(t, tD - .3, tS, .2)); s.dr.forEach((d, i) => { const f = ((t - tD) * 1.6 + i / 6) % 1; tf(d, `translate(${TX - 200 + f * 180 + (i % 3) * 16} ${TB - 590 + f * f * 240 + (i % 2) * 20})`); op(d, on(t, tD - .1, tS - .1, .15) * (1 - f)); });
    qPop(s.c1, 920, 250, t, tD - .1); qPop(s.c2, 940, 350, t, tS - .1); qPop(s.c3, 940, 450, t, tWk - .3); qPop(s.c4, 940, 560, t, tDk); [s.c1, s.c2, s.c3, s.c4].forEach(c => op(c, +c.getAttribute("opacity") * (1 - ramp(t, tBut - .3, tBut))));
    tf(s.R, `translate(${520 * (1 - ease((t - tBut + .2) / .5))} 0)`); op(s.R, ramp(t, tBut - .2, tBut)); s.bad.forEach((g, i) => qPop(g, 775 + i * 180, 380, t, tM[i] - .1)); qPop(s.x, 955, 380, t, tM[2] + .5); qPop(s.w, 955, 700, t, tSm - .15); };
  return s; })();

// ---- THINK ABOUT IT: why does a compost bin get warm inside?
S.think = (() => { const s = scene("think", "#3a0ca3", "#7209b7"), st = qW(s);
  s.title = tx(st, {x: 640, y: 168, "text-anchor": "middle", "font-size": 76, "font-weight": 700, fill: "#ffe14d", class: "out", "stroke-width": 10}, "🤔 Think about it!");
  s.glow = el("circle", {cx: 500, cy: 500, r: 190, fill: "#ff922b", filter: "url(#blur)", opacity: 0}, st); s.bg = el("g", {transform: "translate(500 660) scale(1.1)"}, st); s.bin = qBin(s.bg);
  s.st = [0, 1, 2].map(i => el("path", {fill: "none", stroke: "#fff", "stroke-width": 12, "stroke-linecap": "round", opacity: 0}, st));
  s.th = el("g", {transform: "translate(860 480)"}, st); el("rect", qA({x: -22, y: -190, width: 44, height: 300, rx: 22, fill: "#fff"}), s.th); el("circle", qA({cx: 0, cy: 120, r: 44, fill: "#e63946"}), s.th); s.mer = el("rect", {x: -10, width: 20, fill: "#e63946"}, s.th); for (let i = 0; i < 6; i++) el("line", {x1: 22, y1: -160 + i * 44, x2: 44, y2: -160 + i * 44, stroke: "#fff", "stroke-width": 5, "stroke-linecap": "round"}, s.th);
  s.wm = qT(st, 860, 250, "warm!", 60, "#ffa94d"); s.q = emo(st, 1040, 330, 120, "❓");
  s.c = chip(st, "Why does a compost bin get warm inside?", "#e63946", {fs: 42}); s.ans = chip(st, "Answer next time!", "#f72585", {fs: 46});
  s.run = t => { const a = (w, f) => cue("think", w, f), t0 = SC.think.t0, tW = a("warm", .5), k = ramp(t, tW - .6, tW + .8);
    qPop(s.title, 0, 0, t, t0 - .2); op(s.glow, .8 * k * (.85 + .15 * Math.sin(t * 3))); s.bin.open(.5 * ramp(t, tW - .4, tW + .2));
    s.st.forEach((p, i) => { const f = ((t * .45 + i / 3) % 1), y = 330 - f * 150, x = 420 + i * 70; set(p, "d", `M${x} ${y} q18 -24 0 -48 q-18 -24 0 -48`); op(p, k * .8 * Math.sin(Math.PI * f)); });
    const h = lerp(40, 230, k); set(s.mer, "y", 100 - h); set(s.mer, "height", h); op(s.th, ramp(t, t0 + .6, t0 + .9)); op(s.wm, ramp(t, tW - .1, tW + .2));
    tf(s.q, `translate(1040 330) scale(${Math.max(0, pop(t, tW + .3)) * (1 + .08 * Math.sin(t * 5))}) translate(-1040 -330)`);
    qPop(s.c, 640, 742, t, a("why", .22)); qPop(s.ans, 640, 824, t, a("next", .9)); };
  return s; })();

// ---- CLOSE: what to remember, then next time's teaser (rows from CFG.close; copied from ep02)
S.close = (() => { const s = scene("close", "#f15bb5", "#fee440");
  const CL = CFG.close || {}, rows = CL.rows || [];
  s.rows = rows.map(([e, lab, w, f, col], i) => ({c: chip(s.stage, e + "  " + lab, col, {fs: 42}), w, f, y: 150 + i * (rows.length > 3 ? 160 : 190)}));
  s.tease = chip(s.stage, CL.tease || "Next time!", "#3a0ca3", {fs: 40});
  s.run = t => { const tn = cue("close", CL.teaseWord || "next", .85);
    s.rows.forEach(r => { const tw = cue("close", r.w, r.f); popAt(r.c, 600, r.y, t, tw); op(r.c, ramp(t, tw - .05, tw + .1) * (1 - .6 * ramp(t, tn - .2, tn + .3))); });
    popAt(s.tease, 600, 820, t, tn); }; return s; })();
