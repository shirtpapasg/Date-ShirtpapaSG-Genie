/* TheOneApp, Explored EP07: How does oxygen get to your muscles? (P5 respiratory and circulatory systems). Load after common.js, geo_map.js.
   This file: the shared drawings (the pupil, the school field, molecules, lungs, heart) and the narrated scenes
   (hook, answer, news, recap, textbook, try, think, close). The picture-only shots are in ep07/pov.js.
   Rule 9: oxygen is never shown turning into carbon dioxide. Carbon dioxide is made from the food; the oxygen ends up in water.
   Every frame depends only on t. */
// the teacher (19 Nov 2026): the oxygen journey was too rushed. The hero shots now run SLOWER: their segments are 1.6 times longer and
// each shot's own clock runs 1.6 times slower, so every move, card and beat keeps its place in the shot, just slower.
const O7SLOW = {airOut: 1.6, povNose: 1.6, povWindpipe: 1.6, povAirSac: 1.6, povRBC: 1.6, povHeart: 1.6, povArtery: 1.6, povMuscle: 1.6, povReturn: 1.6, povExhale: 1.6};
const o7T = n => SC[n] ? SC[n].t0 : -1e6, o7D = n => SC[n] ? (SC[n].t1 - SC[n].t0) / (O7SLOW[n] || 1) : 1, o7U = (n, t) => (t - o7T(n)) / (O7SLOW[n] || 1);
const O7X = VP[0], O7Y = VP[1];
const O7 = {SKIN: "#f1c27d", SK2: "#dba968", BLUE: "#3a86ff", NAVY: "#1d3557", HAIR: "#3d2c1e", O: "#e63946", C: "#343a40", N: "#9db8d6", ME: "#ff5d73", CO: "#8d99ae"};
const o7o = {stroke: INK, "stroke-width": 6, "stroke-linejoin": "round", "stroke-linecap": "round"}, o7A = (a, b) => Object.assign({}, o7o, a, b || {});
function o7GR(stops, a = {}) { const id = "o7r" + (o7GR.n = (o7GR.n || 0) + 1), g = el("radialGradient", Object.assign({id, cx: .5, cy: .5, r: .5}, a), $("v").querySelector("defs"));
  stops.forEach(([o, c, al]) => el("stop", {offset: o, "stop-color": c, "stop-opacity": al === undefined ? 1 : al}, g)); return `url(#${id})`; }
function o7GL(stops, a = {}) { const id = "o7l" + (o7GL.n = (o7GL.n || 0) + 1), g = el("linearGradient", Object.assign({id, x1: 0, y1: 0, x2: 0, y2: 1}, a), $("v").querySelector("defs"));
  stops.forEach(([o, c, al]) => el("stop", {offset: o, "stop-color": c, "stop-opacity": al === undefined ? 1 : al}, g)); return `url(#${id})`; }
function o7Glow(p, col, r, a = 1, core = 0) { return el("circle", {r, fill: o7GR([[0, col, a], [core, col, a], [1, col, 0]])}, p); }
function o7Lab(p, text, fs = 44, fill = "#fff") { return tx(p, {x: 0, y: 0, "text-anchor": "middle", "font-size": fs, "font-weight": 700, fill, class: "out", "stroke-width": fs * .22}, text); }
function o7At(e, x, y, u, a, b, sc = 1) { tf(e, `translate(${x} ${y}) scale(${sc * Math.max(0, pop(u, a))})`); op(e, on(u, a, b, .25)); }
function o7Card(p, text, col = INK) { return chip(p, text, col, {fs: 46}); }
function o7Show(c, u, a, b, y = 900) { tf(c, `translate(${O7X} ${y}) scale(${Math.max(0, pop(u, a))})`); op(c, on(u, a, b, .3)); }
const o7Poly = (P, k) => { k = clamp(k); const L = []; let tot = 0; for (let i = 1; i < P.length; i++) { const d = Math.hypot(P[i][0] - P[i - 1][0], P[i][1] - P[i - 1][1]); L.push(d); tot += d; }
  let s = k * tot; for (let i = 0; i < L.length; i++) { if (s <= L[i] || i === L.length - 1) { const q = L[i] ? clamp(s / L[i]) : 0; return [lerp(P[i][0], P[i + 1][0], q), lerp(P[i][1], P[i + 1][1], q)]; } s -= L[i]; } return P[0]; };

/* ---- molecules: oxygen = two red atoms; carbon dioxide = one dark carbon between two red oxygens; water = one red oxygen and two small white hydrogens */
function o7Atom(p, x, y, r, col) { el("circle", {cx: x, cy: y, r, fill: col, stroke: INK, "stroke-width": Math.max(2.5, r * .14)}, p);
  el("ellipse", {cx: x - r * .34, cy: y - r * .42, rx: r * .28, ry: r * .15, fill: "#fff", opacity: .5, transform: `rotate(-30 ${x - r * .34} ${y - r * .42})`}, p); }
function o7Eyes(p, x, y, k, d = 1) { [-1, 1].forEach(s => { el("circle", {cx: x + s * 9 * k * d, cy: y, r: 7 * k, fill: "#fff", stroke: INK, "stroke-width": 1.6 * k}, p); el("circle", {cx: x + s * 9 * k * d + 1.6 * k, cy: y + .8 * k, r: 3.6 * k, fill: INK}, p); }); }
function o7O2(p, r = 30, face = true) { const g = el("g", {}, p); o7Atom(g, -r * .74, 0, r, O7.O); o7Atom(g, r * .74, 0, r, O7.O);
  if (face) { const k = r / 24; o7Eyes(g, 0, -4 * k, k, 2.1); el("path", {d: `M${-9 * k} ${9 * k} Q0 ${19 * k} ${9 * k} ${9 * k}`, fill: "none", stroke: INK, "stroke-width": 3 * k, "stroke-linecap": "round"}, g); } return g; }
function o7CO2(p, r = 30, face = true) { const g = el("g", {}, p); o7Atom(g, -r * 1.5, 0, r * .9, O7.O); o7Atom(g, r * 1.5, 0, r * .9, O7.O); o7Atom(g, 0, 0, r, O7.C);
  if (face) { const k = r / 24; o7Eyes(g, 0, -4 * k, k); el("path", {d: `M${-8 * k} ${9 * k} Q0 ${17 * k} ${8 * k} ${9 * k}`, fill: "none", stroke: "#fff", "stroke-width": 3 * k, "stroke-linecap": "round"}, g); } return g; }
function o7N2(p, r = 30) { const g = el("g", {}, p); o7Atom(g, -r * .74, 0, r, O7.N); o7Atom(g, r * .74, 0, r, O7.N); return g; }
function o7H2O(p, r = 30, face = false) { const g = el("g", {}, p); o7Atom(g, -r * .95, r * .62, r * .58, "#fff"); o7Atom(g, r * .95, r * .62, r * .58, "#fff"); o7Atom(g, 0, 0, r, O7.O);
  if (face) { const k = r / 24; o7Eyes(g, 0, -4 * k, k); el("path", {d: `M${-8 * k} ${9 * k} Q0 ${17 * k} ${8 * k} ${9 * k}`, fill: "none", stroke: INK, "stroke-width": 3 * k, "stroke-linecap": "round"}, g); } return g; }
// sugar from food: a six-sided ring (glucose is drawn as a ring), with a friendly face
function o7Sugar(p, r = 60) { const g = el("g", {}, p), P = []; for (let k = 0; k < 6; k++) P.push([Math.cos(k * Math.PI / 3) * r, Math.sin(k * Math.PI / 3) * r]);
  el("path", {d: "M" + P.map(q => q.join(" ")).join(" L") + " Z", fill: "#ffd166", stroke: INK, "stroke-width": r * .12, "stroke-linejoin": "round"}, g);
  el("path", {d: "M" + P.map(q => (q[0] * .72) + " " + (q[1] * .72)).join(" L") + " Z", fill: "#ffe9a8", opacity: .7}, g);
  P.forEach(q => el("circle", {cx: q[0], cy: q[1], r: r * .17, fill: "#fff", stroke: INK, "stroke-width": r * .06}, g));
  const k = r / 34; o7Eyes(g, 0, -5 * k, k, 1.2); el("path", {d: `M${-10 * k} ${9 * k} Q0 ${20 * k} ${10 * k} ${9 * k}`, fill: "none", stroke: INK, "stroke-width": 3 * k, "stroke-linecap": "round"}, g); return g; }
// a red blood cell seen flat: a red disc, dented in the middle. dark = carrying little oxygen, bright = carrying lots
const O7RB = {};
function o7RBC(p, r = 60, both = false) { const g = el("g", {}, p); if (!O7RB.b) { O7RB.b = o7GR([[0, "#b3121f"], [.38, "#cf2231"], [.7, "#f0414f"], [1, "#e02b3a"]]); O7RB.d = o7GR([[0, "#5e0a14"], [.38, "#7c101c"], [.7, "#9c1c29"], [1, "#8a1622"]]); }
  const mk = fill => { const q = el("g", {}, g); el("ellipse", {rx: r, ry: r * .86, fill, stroke: INK, "stroke-width": Math.max(3, r * .09)}, q);
    el("path", {d: `M${-r * .62} ${-r * .46} Q${-r * .2} ${-r * .78} ${r * .3} ${-r * .66}`, fill: "none", stroke: "#fff", "stroke-width": r * .07, "stroke-linecap": "round", opacity: .45}, q); return q; };
  g.dk = mk(O7RB.d); g.br = both ? mk(O7RB.b) : null; if (!both) { g.dk.remove(); g.br = mk(O7RB.b); } return g; }
function o7You(p) { const g = el("g", {}, p); el("path", {d: "M-62 -92 H62 Q74 -92 74 -80 V-44 Q74 -32 62 -32 H16 L0 -8 L-16 -32 H-62 Q-74 -32 -74 -44 V-80 Q-74 -92 -62 -92 Z", fill: "#ffe14d", stroke: INK, "stroke-width": 5, "stroke-linejoin": "round"}, g);
  tx(g, {x: 0, y: -48, "text-anchor": "middle", "font-size": 38, "font-weight": 700, fill: INK}, "YOU"); return g; }

/* ---- organs (cartoon, but the right shapes) */
function o7Lungs(p) { const g = el("g", {}, p), pk = o7GL([[0, "#ffb3c1"], [1, "#ff8fa3"]]);
  g.pipe = el("g", {}, g); el("rect", o7A({x: -17, y: -124, width: 34, height: 100, rx: 10, fill: "#f6efe2"}), g.pipe);
  [-104, -84, -64, -44].forEach(y => el("line", {x1: -17, y1: y, x2: 17, y2: y, stroke: INK, "stroke-width": 4}, g.pipe));
  el("path", o7A({d: "M0 -34 L-52 22 M0 -34 L52 22", fill: "none", "stroke-width": 26}), g.pipe); el("path", {d: "M0 -34 L-52 22 M0 -34 L52 22", fill: "none", stroke: "#f6efe2", "stroke-width": 15, "stroke-linecap": "round"}, g.pipe);
  const lobe = k => { const q = el("g", {}, g); el("path", o7A({d: "M22 -46 C74 -86 138 -22 142 62 C146 124 104 140 42 124 C22 118 18 60 22 -46 Z", fill: pk, transform: `scale(${k} 1)`}), q);
    el("path", {d: "M52 12 Q84 28 104 66 M56 50 Q72 70 76 98", fill: "none", stroke: "#e5677f", "stroke-width": 6, "stroke-linecap": "round", transform: `scale(${k} 1)`}, q); return q; };
  g.L = lobe(-1); g.R = lobe(1); return g; }
function o7Heart(p) { const g = el("g", {}, p);
  el("path", o7A({d: "M30 -52 Q34 -108 -6 -112", fill: "none", "stroke-width": 34}), g); el("path", {d: "M30 -52 Q34 -108 -6 -112", fill: "none", stroke: "#e63946", "stroke-width": 22, "stroke-linecap": "round"}, g);     // the big vessel out to the body
  el("path", o7A({d: "M-34 -48 V-104", fill: "none", "stroke-width": 30}), g); el("path", {d: "M-34 -48 V-104", fill: "none", stroke: "#4895ef", "stroke-width": 18, "stroke-linecap": "round"}, g);                       // a vessel coming back in
  g.b = el("g", {}, g);
  el("path", o7A({d: "M0 -40 C-30 -76 -88 -60 -88 -8 C-88 44 -30 76 8 106 C46 72 88 36 88 -10 C88 -60 36 -76 0 -40 Z", fill: o7GL([[0, "#f25c66"], [1, "#c9182b"]]), "stroke-width": 7}), g.b);
  el("path", {d: "M-62 -22 Q-58 -48 -34 -50", fill: "none", stroke: "#fff", "stroke-width": 9, "stroke-linecap": "round", opacity: .55}, g.b);
  el("path", {d: "M6 -30 Q-8 30 10 92", fill: "none", stroke: "#9d0f1f", "stroke-width": 5, "stroke-linecap": "round", opacity: .6}, g.b); return g; }
// a leg muscle: a spindle of fibres
function o7Muscle(p) { const g = el("g", {}, p); el("path", o7A({d: "M-110 0 C-70 -52 70 -52 110 0 C70 52 -70 52 -110 0 Z", fill: "#e5677a"}), g);
  [-22, 0, 22].forEach(y => el("path", {d: `M-84 ${y * .5} Q0 ${y * 1.5} 84 ${y * .5}`, fill: "none", stroke: "#b23a4e", "stroke-width": 5, "stroke-linecap": "round"}, g));
  [[-126, 0], [126, 0]].forEach(([x]) => el("rect", o7A({x: x - 20, y: -9, width: 40, height: 18, rx: 8, fill: "#f6efe2", "stroke-width": 5}), g)); return g; }

/* ---- the series' pupil, seen from the side and facing right: blue school shirt, navy shorts, dark hair (the red bag is by the field).
   Feet at (0, 0). Jointed, so it can run, bend over and jump: see o7Pose. */
function o7Kid(p) { const K = el("g", {}, p), C = O7;
  K.sh = el("ellipse", {cx: 6, cy: 2, rx: 92, ry: 15, fill: INK, opacity: .2}, K); K.body = el("g", {}, K);
  const leg = far => { const g = el("g", {}, K.body), sk = far ? C.SK2 : C.SKIN; g.shin = el("g", {}, g);
    el("rect", o7A({x: -15, y: -6, width: 30, height: 64, rx: 14, fill: sk}), g.shin); el("rect", o7A({x: -15, y: 30, width: 30, height: 28, rx: 5, fill: "#fff"}), g.shin);
    el("path", o7A({d: "M-18 54 H22 Q42 56 42 71 Q42 80 32 80 H-18 Z", fill: far ? "#2b2b45" : "#33334f"}), g.shin);
    el("rect", o7A({x: -17, y: -10, width: 34, height: 80, rx: 16, fill: sk}), g); el("rect", o7A({x: -22, y: -14, width: 44, height: 58, rx: 12, fill: far ? "#172a45" : C.NAVY}), g); return g; };
  const arm = far => { const g = el("g", {}, null), sk = far ? C.SK2 : C.SKIN; g.fore = el("g", {}, g);
    el("rect", o7A({x: -13, y: -6, width: 26, height: 84, rx: 13, fill: sk}), g.fore); el("circle", o7A({cx: 0, cy: 80, r: 16, fill: sk, "stroke-width": 5}), g.fore);
    el("rect", o7A({x: -18, y: -10, width: 36, height: 68, rx: 16, fill: far ? "#2f6fd6" : C.BLUE}), g); return g; };
  K.legF = leg(1); K.legN = leg(0);
  el("rect", o7A({x: -36, y: -184, width: 72, height: 56, rx: 16, fill: C.NAVY}), K.body);
  K.up = el("g", {}, K.body); K.armF = arm(1); K.up.appendChild(K.armF);
  el("rect", o7A({x: -54, y: -326, width: 108, height: 158, rx: 30, fill: C.BLUE}), K.up);
  el("rect", o7A({x: 8, y: -280, width: 32, height: 32, rx: 6, fill: "#fff", "stroke-width": 4}), K.up);
  K.chest = el("g", {transform: "translate(10 -258)", opacity: 0}, K.up);
  K.head = el("g", {}, K.up);
  el("rect", o7A({x: -15, y: -340, width: 34, height: 30, fill: C.SKIN, "stroke-width": 5}), K.head);
  el("path", o7A({d: "M-26 -324 L4 -300 L34 -324 L22 -336 H-14 Z", fill: "#fff", "stroke-width": 5}), K.head);
  el("circle", o7A({cx: 6, cy: -402, r: 80, fill: C.SKIN}), K.head);
  K.red = el("circle", {cx: 6, cy: -402, r: 77, fill: "#e63946", opacity: 0}, K.head);
  el("path", o7A({d: "M84 -410 Q102 -398 92 -382", fill: C.SKIN, "stroke-width": 5}), K.head);                                               // nose
  el("path", o7A({d: "M-72 -372 Q-92 -486 0 -488 Q84 -490 88 -420 Q60 -446 22 -448 Q-4 -444 -14 -412 Q-22 -384 -40 -352 Q-66 -352 -72 -372 Z", fill: C.HAIR}), K.head);
  el("path", {d: "M-8 -487 Q0 -506 16 -500", fill: "none", stroke: INK, "stroke-width": 9, "stroke-linecap": "round"}, K.head); el("path", {d: "M-8 -487 Q0 -506 16 -500", fill: "none", stroke: C.HAIR, "stroke-width": 5, "stroke-linecap": "round"}, K.head);
  el("ellipse", o7A({cx: -18, cy: -394, rx: 13, ry: 17, fill: C.SKIN, "stroke-width": 5}), K.head);
  K.cheek = el("circle", {cx: 28, cy: -370, r: 16, fill: "#ff6b81", opacity: .55}, K.head);
  K.eyes = el("g", {}, K.head); [[34, 11, 15], [66, 9, 14]].forEach(([x, rx, ry]) => { el("ellipse", {cx: x, cy: -404, rx, ry, fill: INK}, K.eyes); el("circle", {cx: x + 3, cy: -410, r: 4.4, fill: "#fff"}, K.eyes); });
  K.brow = el("g", {}, K.head); [[22, 46], [58, 76]].forEach(([a, b]) => el("path", {d: `M${a} -430 Q${(a + b) / 2} -437 ${b} -431`, fill: "none", stroke: INK, "stroke-width": 5, "stroke-linecap": "round"}, K.brow));
  K.m0 = el("path", {d: "M40 -372 Q54 -362 68 -372", fill: "none", stroke: INK, "stroke-width": 5.5, "stroke-linecap": "round"}, K.head);
  K.m2 = el("ellipse", o7A({cx: 58, cy: -366, rx: 11, ry: 14, fill: "#7a1c1c", "stroke-width": 5, opacity: 0}), K.head);                      // mouth open: panting
  K.sweat = el("g", {opacity: 0}, K.head); [[-6, -452, 1], [70, -448, .8], [-40, -420, .7]].forEach(([x, y, k]) => el("path", {d: `M${x} ${y - 14 * k} Q${x + 10 * k} ${y} ${x} ${y + 8 * k} Q${x - 10 * k} ${y} ${x} ${y - 14 * k} Z`, fill: "#bfe9ff", stroke: INK, "stroke-width": 3}, K.sweat));
  K.armN = arm(0); K.up.appendChild(K.armN); o7Pose(K, {}); return K; }
const O7STAND = {lean: 0, thN: 0, knN: 0, thF: 0, knF: 0, aN: 5, eN: -8, aF: -5, eF: -8, head: 0, mouth: 0, bob: 0};
const O7BENT = {lean: 58, thN: -34, knN: 52, thF: -30, knF: 50, aN: -33, eN: 3, aF: -30, eF: 3, head: -44, mouth: 1, bob: 0};
const o7Run = ph => ({lean: 16, thN: -8 - 42 * Math.sin(ph), knN: 22 + 62 * Math.max(0, Math.cos(ph)), thF: -8 + 42 * Math.sin(ph), knF: 22 + 62 * Math.max(0, -Math.cos(ph)),
  aN: 40 * Math.sin(ph), eN: -85, aF: -40 * Math.sin(ph), eF: -85, head: -8, mouth: 0, bob: -16 * Math.abs(Math.cos(ph))});
const o7Mix = (a, b, k) => { const o = {}; for (const key in O7STAND) o[key] = lerp(a[key] === undefined ? O7STAND[key] : a[key], b[key] === undefined ? O7STAND[key] : b[key], k); return o; };
function o7Pose(K, q) { const d = Object.assign({}, O7STAND, q), R = Math.PI / 180, len = (th, kn) => 62 * Math.cos(th * R) + 80 * Math.cos((th + kn) * R);
  tf(K.body, `translate(0 ${142 - Math.max(len(d.thN, d.knN), len(d.thF, d.knF)) + d.bob})`);
  tf(K.legN, `translate(15 -142) rotate(${d.thN})`); tf(K.legN.shin, `translate(0 62) rotate(${d.knN})`); tf(K.legF, `translate(-13 -142) rotate(${d.thF})`); tf(K.legF.shin, `translate(0 62) rotate(${d.knF})`);
  tf(K.up, `rotate(${d.lean} 0 -160)`); tf(K.armN, `translate(8 -296) rotate(${d.aN})`); tf(K.armN.fore, `translate(0 54) rotate(${d.eN})`); tf(K.armF, `translate(-4 -296) rotate(${d.aF})`); tf(K.armF.fore, `translate(0 54) rotate(${d.eF})`);
  tf(K.head, `rotate(${d.head} 2 -330)`); op(K.m0, d.mouth < .5 ? 1 : 0); op(K.m2, d.mouth >= .5 ? 1 : 0); }
// panting: bent over, hands on knees; br = breathing phase (radians)
const o7Pant = br => Object.assign({}, O7BENT, {lean: 58 - 3.5 * Math.sin(br), head: -44 + 4 * Math.sin(br), aN: -33 + 3.5 * Math.sin(br), aF: -30 + 3.5 * Math.sin(br)});
// a thumping heart drawn on the chest: put it in K.chest
function o7ChestHeart(K) { const g = K.chest; g.r = [0, 1].map(() => el("circle", {r: 30, fill: "none", stroke: "#ff4d6d", "stroke-width": 7}, g)); g.h = el("g", {}, g);
  el("path", o7A({d: "M0 -12 C-12 -30 -36 -22 -36 -2 C-36 18 -12 30 0 44 C12 30 36 18 36 -2 C36 -22 12 -30 0 -12 Z", fill: "#ff2e4d", "stroke-width": 5}), g.h); return g; }
// beat: 0..1 phase of one heartbeat -> size (a quick double thump: ba-dum)
const o7Beat = ph => { ph = (ph % 1 + 1) % 1; return Math.exp(-Math.pow((ph - .06) / .07, 2)) + .7 * Math.exp(-Math.pow((ph - .3) / .08, 2)); };
function o7Thump(K, ph, a = 1) { const g = K.chest; op(g, a); tf(g.h, `scale(${1 + .28 * o7Beat(ph)})`); g.r.forEach((c, i) => { const q = ((ph + i * .5) % 1 + 1) % 1; set(c, "r", 34 + 60 * q); op(c, .8 * (1 - q)); }); }

/* ---- the school field at PE time: HDB blocks behind, the school block, rain trees, the playground, the grass with lane lines. Ground (feet) at y = 800 */
function o7Field(p) { const g = el("g", {}, p);
  el("rect", {x: -1400, y: -1200, width: 4600, height: 1760, fill: o7GL([[0, "#4fb6f5"], [1, "#d8f1ff"]])}, g);
  el("circle", {cx: 1560, cy: 20, r: 74, fill: "#ffe066", stroke: INK, "stroke-width": 6}, g);
  [[80, 90, 1], [900, 30, .8], [-520, 160, .9], [1950, 140, 1]].forEach(([x, y, k]) => el("path", o7A({d: `M${x - 90 * k} ${y} q${-40 * k} ${-50 * k} ${30 * k} ${-60 * k} q${30 * k} ${-60 * k} ${90 * k} ${-20 * k} q${70 * k} ${-30 * k} ${90 * k} ${30 * k} q${50 * k} ${10 * k} ${20 * k} ${50 * k} Z`, fill: "#fff", "stroke-width": 5}), g));
  [[-900, 300, "#f6d6c8"], [-560, 250, "#cfe3f5"], [-250, 320, "#f9e2ae"], [900, 290, "#d5ecd4"], [1230, 240, "#f6d6c8"], [1580, 310, "#cfe3f5"], [1920, 260, "#f9e2ae"], [2260, 300, "#d5ecd4"]].forEach(([x, h, c]) => {
    el("rect", {x, y: 540 - h, width: 270, height: h, fill: c, stroke: INK, "stroke-width": 5}, g); el("rect", {x: x - 6, y: 540 - h - 14, width: 282, height: 18, fill: "#e76f51", stroke: INK, "stroke-width": 4}, g);
    for (let r = 0; r < Math.floor(h / 36) - 1; r++) { el("line", {x1: x + 14, y1: 540 - h + 34 + r * 36, x2: x + 256, y2: 540 - h + 34 + r * 36, stroke: INK, "stroke-width": 3, opacity: .45}, g);
      for (let c2 = 0; c2 < 7; c2++) el("rect", {x: x + 20 + c2 * 34, y: 540 - h + 12 + r * 36, width: 16, height: 16, fill: "#5c7c9c", opacity: .7}, g); } });
  // the school block
  el("rect", o7A({x: 60, y: 300, width: 760, height: 240, fill: "#fff3d6"}), g); el("rect", o7A({x: 40, y: 280, width: 800, height: 30, fill: "#c1121f"}), g);
  [0, 1, 2].forEach(r => { el("rect", {x: 60, y: 372 + r * 70 - 14, width: 760, height: 14, fill: "#ffd6a5", stroke: INK, "stroke-width": 3}, g);
    for (let c2 = 0; c2 < 9; c2++) { el("rect", {x: 86 + c2 * 82, y: 322 + r * 70, width: 30, height: 34, fill: "#8ecae6", stroke: INK, "stroke-width": 3}, g); el("rect", {x: 122 + c2 * 82, y: 322 + r * 70, width: 22, height: 36, fill: "#bc6c25", stroke: INK, "stroke-width": 3}, g); } });
  // rain trees
  [[-380, 1.2], [-40, 1], [950, 1.1], [1700, 1.25], [2080, 1]].forEach(([x, k]) => { el("rect", o7A({x: x - 13 * k, y: 540 - 150 * k, width: 26 * k, height: 150 * k, fill: "#8d5b3a", "stroke-width": 5}), g);
    el("path", o7A({d: `M${x - 150 * k} ${540 - 140 * k} q${-30 * k} ${-70 * k} ${50 * k} ${-90 * k} q${40 * k} ${-60 * k} ${110 * k} ${-30 * k} q${80 * k} ${-20 * k} ${100 * k} ${40 * k} q${60 * k} ${40 * k} ${10 * k} ${80 * k} Z`, fill: "#52b788"}), g); });
  // the playground
  const pg = el("g", {transform: "translate(1280 540)"}, g);
  [[0, 150], [120, 150]].forEach(([x, h]) => el("rect", o7A({x: x - 7, y: -h, width: 14, height: h, fill: "#ffbe0b", "stroke-width": 4}), pg));
  el("rect", o7A({x: -12, y: -92, width: 144, height: 16, fill: "#3a86ff", "stroke-width": 4}), pg); el("path", o7A({d: "M-22 -150 L60 -206 L142 -150 Z", fill: "#e63946", "stroke-width": 5}), pg);
  el("path", o7A({d: "M132 -86 Q200 -70 232 -6 L206 -2 Q184 -52 132 -68 Z", fill: "#ffd166", "stroke-width": 5}), pg);
  [-70, -48, -26].forEach(y => el("line", {x1: -44, y1: y + 4, x2: -6, y2: y + 4, stroke: INK, "stroke-width": 5}, pg)); el("path", {d: "M-44 0 V-84 M-6 0 V-84", stroke: INK, "stroke-width": 6, fill: "none"}, pg);
  // the grass
  el("rect", {x: -1400, y: 540, width: 4600, height: 1400, fill: o7GL([[0, "#8fd67f"], [.5, "#5fbf5a"], [1, "#3f9d4a"]])}, g);
  [[575, 40], [680, 70], [860, 110]].forEach(([y, h]) => el("rect", {x: -1400, y, width: 4600, height: h, fill: "#fff", opacity: .09}, g));
  el("line", {x1: -1400, y1: 540, x2: 3200, y2: 540, stroke: INK, "stroke-width": 5}, g);
  [716, 884].forEach(y => el("line", {x1: -1400, y1: y, x2: 3200, y2: y, stroke: "#fff", "stroke-width": 9, opacity: .85}, g));
  // goal post, cones, the pupil's red school bag on the grass
  el("path", {d: "M-250 620 V470 H-70 V620", fill: "none", stroke: INK, "stroke-width": 16, "stroke-linejoin": "round"}, g); el("path", {d: "M-250 620 V470 H-70 V620", fill: "none", stroke: "#fff", "stroke-width": 8, "stroke-linejoin": "round"}, g);
  [[420, 884], [1180, 884], [1180, 716], [420, 716]].forEach(([x, y]) => { el("path", o7A({d: `M${x - 22} ${y + 6} L${x} ${y - 46} L${x + 22} ${y + 6} Z`, fill: "#f77f00", "stroke-width": 5}), g); el("rect", o7A({x: x - 30, y: y + 2, width: 60, height: 10, rx: 4, fill: "#f77f00", "stroke-width": 4}), g); });
  const bag = el("g", {transform: "translate(160 640)"}, g); el("rect", o7A({x: -34, y: -70, width: 68, height: 80, rx: 18, fill: "#e63946", "stroke-width": 5}), bag); el("rect", o7A({x: -22, y: -34, width: 44, height: 34, rx: 9, fill: "#ff7b54", "stroke-width": 4}), bag);
  el("path", {d: "M-14 -70 Q0 -92 14 -70", fill: "none", stroke: INK, "stroke-width": 6}, bag); return g; }

/* =============================================== the narrated scenes =============================================== */
// ---- HOOK: huff, puff: you breathe faster, your heart pounds. Why? Your muscles are calling for oxygen
S.hook = (() => { const s = scene("hook", "#4fb6f5", "#d8f1ff"), st = s.stage; s.cam = el("g", {transform: "translate(-250 20)"}, st); o7Field(s.cam);
  s.kidG = el("g", {transform: "translate(560 800) scale(1.25)"}, s.cam); s.kid = o7Kid(s.kidG); o7ChestHeart(s.kid);
  s.puff = [0, 1, 2].map(() => el("g", {}, s.cam)); s.puff.forEach(g => { el("circle", {r: 16, fill: "#fff", stroke: INK, "stroke-width": 3.5}, g); el("circle", {cx: 16, cy: -6, r: 11, fill: "#fff", stroke: INK, "stroke-width": 3.5}, g); });
  const bub = (x, y, lab, col) => { const g = el("g", {}, st); el("circle", {r: 128, fill: "#fff", stroke: INK, "stroke-width": 8, filter: "url(#sh)"}, g); g.in = el("g", {}, g);
    const c = chip(g, lab, col, {fs: 30}); tf(c, "translate(0 158)"); op(c, 1); g.x = x; g.y = y; return g; };
  s.bL = bub(640, 210, "breathing faster", "#3a86ff"); s.lungs = o7Lungs(s.bL.in); tf(s.lungs, "translate(0 6) scale(.74)");
  s.bH = bub(980, 210, "heart pounding", "#e63946"); s.heart = o7Heart(s.bH.in); tf(s.heart, "translate(0 6) scale(.86)");
  s.q = tx(st, {x: 0, y: 0, "text-anchor": "middle", "font-size": 170, "font-weight": 700, fill: "#ffe14d", class: "out", "stroke-width": 22}, "Why?");
  s.say = el("g", {}, st); el("path", o7A({d: "M-250 -86 H250 Q290 -86 290 -46 V46 Q290 86 250 86 H-120 L-230 150 L-190 86 H-250 Q-290 86 -290 46 V-46 Q-290 -86 -250 -86 Z", fill: "#fff", "stroke-width": 8, filter: "url(#sh)"}), s.say);
  o7Muscle(el("g", {transform: "translate(-180 0) scale(.62)"}, s.say)); tx(s.say, {x: 70, y: -8, "text-anchor": "middle", "font-size": 46, "font-weight": 700, fill: INK}, "Oxygen,"); tx(s.say, {x: 70, y: 44, "text-anchor": "middle", "font-size": 46, "font-weight": 700, fill: "#e63946"}, "please!");
  s.o2 = [[1150, 430], [1170, 760], [700, 790]].map(([x, y]) => { const g = o7O2(st, 34); g.x = x; g.y = y; return g; });
  s.run = t => { const a = (w, f) => cue("hook", w, f), br = t * 2 * Math.PI * 1.5, hb = t * 2.6;
    o7Pose(s.kid, o7Pant(br)); op(s.kid.sweat, 1); o7Thump(s.kid, hb, ramp(t, a("heart", .4) - .3, a("heart", .4)));
    s.puff.forEach((g, i) => { const q = ((t * 1.5 + i * .12) % 1 + 1) % 1; tf(g, `translate(${930 + q * 120} ${520 + i * 16 - q * 30}) scale(${.5 + q})`); op(g, Math.sin(q * Math.PI) * .9); });
    popAt(s.bL, s.bL.x, s.bL.y, t, a("breathe", .25) - .15); const k = 1 + .13 * Math.sin(br); tf(s.lungs.L, `scale(${k})`); tf(s.lungs.R, `scale(${k})`);
    popAt(s.bH, s.bH.x, s.bH.y, t, a("heart", .4) - .15); tf(s.heart.b, `scale(${1 + .16 * o7Beat(hb)})`);
    const tw = a("why", .6), tm = a("muscles", .75); tf(s.q, `translate(900 590) scale(${Math.max(0, pop(t, tw - .1)) * (1 - ramp(t, tm - .3, tm))}) rotate(-6)`); op(s.q, t > tw - .2 ? 1 : 0);
    popAt(s.say, 900, 590, t, tm - .1); s.o2.forEach((g, i) => { const tt = a("oxygen", .92) - .1 + i * .12; tf(g, `translate(${g.x} ${g.y + Math.sin(t * 3 + i * 2) * 8}) scale(${Math.max(0, pop(t, tt))})`); op(g, t > tt - .05 ? 1 : 0); }); }; return s; })();

// ---- LAST TIME'S ANSWER: why the small intestine is so long: length + finger-like bumps = a huge surface for digested food to pass into the blood
S.answer = (() => { const s = scene("answer", "#3a0ca3", "#4361ee"), st = s.stage;
  s.top = chip(st, "✅ Last time's answer", "#06d6a0", {fs: 44});
  s.q = tx(st, {x: 600, y: 150, "text-anchor": "middle", "font-size": 46, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 9}, "Why is the small intestine so long?");
  // left: the small intestine, folded up
  s.gut = el("g", {}, st); el("rect", o7A({x: 40, y: 200, width: 500, height: 470, rx: 60, fill: "#ffe5d9", "stroke-width": 8}), s.gut);
  el("path", {d: "M100 610 V300 Q100 250 150 250 H430 Q480 250 480 300 V610", fill: "none", stroke: INK, "stroke-width": 62, "stroke-linecap": "round"}, s.gut);
  el("path", {d: "M100 610 V300 Q100 250 150 250 H430 Q480 250 480 300 V610", fill: "none", stroke: "#d8a48f", "stroke-width": 48, "stroke-linecap": "round"}, s.gut);
  let d = "M176 330"; [0, 1, 2, 3].forEach(r => { const y = 330 + r * 76, R = r % 2 === 0; d += R ? ` H366 Q404 ${y} 404 ${y + 38} Q404 ${y + 76} 366 ${y + 76}` : ` H214 Q176 ${y} 176 ${y + 38} Q176 ${y + 76} 214 ${y + 76}`; }); d += " H366";
  el("path", {d, fill: "none", stroke: INK, "stroke-width": 44, "stroke-linecap": "round"}, s.gut); s.si = el("path", {d, fill: "none", stroke: "#ff8fa3", "stroke-width": 32, "stroke-linecap": "round"}, s.gut);
  s.siL = el("path", {d, fill: "none", stroke: "#ffe14d", "stroke-width": 12, "stroke-linecap": "round"}, s.gut);
  s.lab1 = o7Lab(st, "small intestine", 44); s.lab1b = o7Lab(st, "very long, folded up to fit", 34, "#ffe14d");
  // right: a close look at the wall
  s.lens = el("g", {}, st); const cp = el("clipPath", {id: "o7lens"}, $("v").querySelector("defs")); el("circle", {r: 226}, cp);
  el("circle", {r: 226, fill: "#fff1e6"}, s.lens); const m = el("g", {"clip-path": "url(#o7lens)"}, s.lens);
  el("rect", {x: -240, y: 120, width: 480, height: 120, fill: "#ff8fa3", stroke: INK, "stroke-width": 7}, m);
  s.villi = [-150, -50, 50, 150].map(x => { const g = el("g", {transform: `translate(${x} 124)`}, m);
    el("path", o7A({d: "M-42 4 V-150 Q-42 -196 0 -196 Q42 -196 42 -150 V4 Z", fill: "#ffb3c1", "stroke-width": 7}), g); el("path", {d: "M-14 30 V-140 Q-14 -164 0 -164 Q14 -164 14 -140 V30", fill: "none", stroke: "#e63946", "stroke-width": 10, "stroke-linecap": "round"}, g); return g; });
  el("rect", {x: -240, y: 170, width: 480, height: 26, fill: "#e63946", stroke: INK, "stroke-width": 5}, m);
  seed = 71; s.food = []; for (let i = 0; i < 16; i++) s.food.push({e: el("circle", {r: 11, fill: "#ffbe0b", stroke: INK, "stroke-width": 3.5}, m), u: rnd(), v: i % 4, w: rnd()});
  el("circle", {r: 226, fill: "none", stroke: INK, "stroke-width": 10}, s.lens);
  s.l2 = [o7Lab(st, "finger-like bumps", 40), o7Lab(st, "digested food", 36, "#ffe14d"), o7Lab(st, "blood", 36, "#ffb3b3")];
  s.zl = el("path", {d: "M420 450 L640 330 M420 480 L650 610", stroke: "#fff", "stroke-width": 5, "stroke-dasharray": "10 12", fill: "none"}, st);
  s.c = chip(st, "Huge surface → lots of digested food passes into the blood", "#f72585", {fs: 34});
  s.run = t => { const a = (w, f) => cue("answer", w, f), LEN = s.L || (s.L = s.siL.getTotalLength());
    popAt(s.top, 600, 50, t, SC.answer.t0 - .2); op(s.q, ramp(t, a("why", .17) - .2, a("why", .17) + .2));
    op(s.gut, ramp(t, a("small", .2) - .3, a("small", .2))); const k = ramp(t, a("long", .28), a("long", .28) + 1.6), tl = a("length", .63), k2 = ramp(t, tl, tl + 1.2);
    set(s.siL, "stroke-dasharray", `${LEN * .12} ${LEN}`); set(s.siL, "stroke-dashoffset", -LEN * (t < tl ? k : k2)); op(s.siL, t < tl ? on(t, a("long", .28), a("long", .28) + 1.7, .2) : on(t, tl, tl + 1.3, .2));
    o7At(s.lab1, 290, 722, t, a("long", .28) - .2, 1e9); o7At(s.lab1b, 290, 770, t, a("long", .28) + .5, 1e9);
    const tv = a("finger-like", .46) - .5; popAt(s.lens, 880, 420, t, tv); op(s.zl, ramp(t, tv, tv + .3) * .8);
    s.villi.forEach((g, i) => tf(g, `translate(${-150 + i * 100} 124) scale(1 ${Math.max(.05, Math.min(1.05, pop(t, tv + .5 + i * .12, .5)))})`));
    const tp = a("lots", .78); s.food.forEach(f => { const q = t < tp ? 0 : ((t - tp) * .32 + f.u) % 1, x0 = -200 + f.u * 400, y0 = -190 + f.w * 90 + Math.sin(t * 2 + f.u * 9) * 6, vx = -150 + f.v * 100;
      const P = [[x0, y0], [vx + (f.w - .5) * 60, -60 - f.w * 60], [vx, -20], [vx, 150], [vx + 120, 183]], [x, y] = o7Poly(P, q); set(f.e, "cx", x); set(f.e, "cy", y); op(f.e, q > .9 ? (1 - q) * 10 : 1); });
    o7At(s.l2[0], 880, 690, t, tv + .7, 1e9); o7At(s.l2[1], 1075, 215, t, a("digested", .8), 1e9); o7At(s.l2[2], 1100, 640, t, a("blood", .96) - .2, 1e9);
    popAt(s.c, 600, 830, t, a("huge", .68)); }; return s; })();

// ---- NEWS (an amazing fact): about 100 000 heartbeats every day; blood goes all the way round the body in about one minute
S.news = (() => { const s = scene("news", "#14213d", "#3a0ca3"), st = s.stage;
  s.top = chip(st, "🤯 Amazing fact", "#f72585", {fs: 44});
  s.kidG = el("g", {transform: "translate(170 850) scale(1.35)"}, st); s.kid = o7Kid(s.kidG); o7ChestHeart(s.kid);
  // the counter (like the tally counter a PE teacher clicks)
  s.cnt = el("g", {}, st); el("rect", o7A({x: -300, y: -92, width: 600, height: 184, rx: 34, fill: "#f8f9fa", "stroke-width": 8, filter: "url(#sh)"}), s.cnt);
  el("rect", o7A({x: -270, y: -66, width: 540, height: 104, rx: 16, fill: "#1b1b3a", "stroke-width": 5}), s.cnt);
  s.num = tx(s.cnt, {x: 0, y: 16, "text-anchor": "middle", "font-size": 92, "font-weight": 700, fill: "#ffe14d", "letter-spacing": 6}, "0");
  tx(s.cnt, {x: 0, y: 76, "text-anchor": "middle", "font-size": 30, "font-weight": 700, fill: INK}, "heartbeats in one day");
  s.heartG = el("g", {}, st); s.heart = o7Heart(s.heartG);
  // one trip round the body
  s.loop = el("g", {}, st); const LP = "M560 560 C560 380 760 330 900 330 C1060 330 1140 430 1140 560 C1140 690 1060 790 900 790 C760 790 560 740 560 560";
  el("path", {d: LP, fill: "none", stroke: INK, "stroke-width": 44}, s.loop); s.lr = el("path", {d: LP, fill: "none", stroke: "#e63946", "stroke-width": 30}, s.loop);
  s.lb = el("path", {d: LP, fill: "none", stroke: "#4895ef", "stroke-width": 30}, s.loop);
  s.dot = el("g", {}, s.loop); o7RBC(s.dot, 30);
  s.lt = [o7Lab(s.loop, "out to the body", 32, "#ffb3b3"), o7Lab(s.loop, "back to the heart", 32, "#bcd9ff")]; tf(s.lt[0], "translate(900 296)"); tf(s.lt[1], "translate(900 846)");
  s.sw = el("g", {}, st); el("rect", o7A({x: -14, y: -134, width: 28, height: 30, rx: 6, fill: "#adb5bd", "stroke-width": 5}), s.sw); el("circle", o7A({r: 108, fill: "#fff", "stroke-width": 9}), s.sw);
  for (let i = 0; i < 12; i++) el("line", {x1: 0, y1: -98, x2: 0, y2: -84, stroke: INK, "stroke-width": 5, transform: `rotate(${i * 30})`}, s.sw);
  s.swA = el("path", {fill: "#06d6a0", opacity: .55}, s.sw); s.hand = el("line", {x1: 0, y1: 12, x2: 0, y2: -88, stroke: "#e63946", "stroke-width": 8, "stroke-linecap": "round"}, s.sw); el("circle", {r: 10, fill: INK}, s.sw);
  s.swT = chip(st, "about 1 minute", "#06d6a0", {fs: 36, ink: INK});
  s.run = t => { const a = (w, f) => cue("news", w, f), hb = t * 1.25, tb = a("beats", .25), tp = a("pumps", .62), LEN = s.L || (s.L = s.lr.getTotalLength());
    popAt(s.top, 600, 50, t, SC.news.t0 - .2); o7Pose(s.kid, {}); o7Thump(s.kid, hb, ramp(t, a("heart", .2) - .3, a("heart", .2)));
    const mv = ramp(t, tp - .5, tp + .3); popAt(s.heartG, lerp(640, 560, mv), lerp(560, 560, mv), t, a("heart", .2) - .2, lerp(1.9, 1.05, mv)); tf(s.heart.b, `scale(${1 + .15 * o7Beat(hb)})`);
    popAt(s.cnt, 820, 185, t, tb - .2, .82); const n = Math.round(100000 * ease(clamp((t - a("hundred", .33)) / Math.max(.6, a("day", .5) - a("hundred", .33))))); s.num.textContent = n.toLocaleString("en-US").replace(/,/g, " ");
    op(s.loop, ramp(t, tp - .3, tp + .2)); const q = clamp((t - tp) / Math.max(1, a("minute", .96) + .5 - tp)), pt = s.lr.getPointAtLength(LEN * q);
    set(s.lr, "stroke-dasharray", `${LEN * .5} ${LEN}`); set(s.lb, "stroke-dasharray", `${LEN * .5} ${LEN}`); set(s.lb, "stroke-dashoffset", -LEN * .5);
    tf(s.dot, `translate(${pt.x} ${pt.y})`); if (s.dot.parentNode.lastChild !== s.dot) s.loop.appendChild(s.dot);
    popAt(s.sw, 880, 560, t, tp + .1, .9); tf(s.hand, `rotate(${360 * q})`); const an = 2 * Math.PI * q, R = 82;
    set(s.swA, "d", q <= 0 ? "" : q >= .999 ? `M0 ${-R} A${R} ${R} 0 1 1 -0.1 ${-R} Z` : `M0 0 L0 ${-R} A${R} ${R} 0 ${q > .5 ? 1 : 0} 1 ${R * Math.sin(an)} ${-R * Math.cos(an)} Z`);
    popAt(s.swT, 880, 715, t, a("one", .9)); }; return s; })();

// ---- RECAP: the journey in ten steps; each card lights up as Heart names it
S.recap = (() => { const s = scene("recap", "#fff3b0", "#ffd6a5"), st = s.stage;
  s.top = chip(st, "🫁 Your journey as oxygen", "#e63946", {fs: 40});
  const ST = [["playground", "in the playground air", g => { o7O2(g, 34); }], ["nose", "in through the nose", g => { el("path", o7A({d: "M-10 -62 Q-16 -10 -48 18 Q-60 44 -30 48 Q-4 62 22 46 Q40 40 30 16 Q8 -10 8 -62 Z", fill: O7.SKIN}), g); el("ellipse", {cx: -14, cy: 36, rx: 9, ry: 6, fill: "#7a2a3d"}, g); el("ellipse", {cx: 14, cy: 34, rx: 9, ry: 6, fill: "#7a2a3d"}, g); }],
    ["windpipe", "down the windpipe", g => { el("rect", o7A({x: -28, y: -70, width: 56, height: 140, rx: 14, fill: "#f6efe2"}), g); [-44, -16, 12, 40].forEach(y => el("line", {x1: -28, y1: y, x2: 28, y2: y, stroke: INK, "stroke-width": 5}, g)); }],
    ["sac", "into a tiny air sac", g => { [[-34, -22, 34], [30, -30, 30], [0, 26, 38]].forEach(([x, y, r]) => el("circle", o7A({cx: x, cy: y, r, fill: "#ffc2cd", "stroke-width": 5}), g)); el("path", {d: "M-44 44 Q0 84 46 40", fill: "none", stroke: "#e63946", "stroke-width": 9, "stroke-linecap": "round"}, g); }],
    ["red", "a red blood cell carries you", g => { o7RBC(g, 60); tf(o7O2(g, 15, false), "translate(0 -2)"); }], ["heart", "the heart pumps", g => { tf(o7Heart(g), "translate(0 6) scale(.62)"); }],
    ["muscle", "to a leg muscle", g => { tf(o7Muscle(g), "scale(.72) rotate(-20)"); }], ["energy", "energy from food!", g => { el("path", o7A({d: "M10 -74 L-40 6 H-6 L-18 72 L42 -14 H6 Z", fill: "#ffe14d"}), g); tf(o7Sugar(g, 22), "translate(-52 -44)"); }],
    ["carbon", "carbon dioxide rides back", g => { o7CO2(g, 26); }], ["out", "and out!", g => { tf(o7CO2(g, 15, false), "translate(26 -30)"); tf(o7CO2(g, 11, false), "translate(56 16) rotate(30)"); el("path", {d: "M-70 -30 H-6 M-70 6 H10 M-70 42 H-14", stroke: INK, "stroke-width": 9, "stroke-linecap": "round", fill: "none"}, g); }]];
  s.cards = ST.map(([w, lab, draw], i) => { const g = el("g", {}, st), x = 128 + (i % 5) * 236, y = i < 5 ? 290 : 640;
    g.box = el("rect", {x: -108, y: -140, width: 216, height: 290, rx: 30, fill: "#fff", stroke: INK, "stroke-width": 6, filter: "url(#sh)"}, g); const ic = el("g", {transform: "translate(0 -34)"}, g); draw(ic);
    const words = lab.split(" "), mid = lab.length > 16 ? Math.ceil(words.length / 2) : words.length, L1 = words.slice(0, mid).join(" "), L2 = words.slice(mid).join(" ");
    tx(g, {x: 0, y: L2 ? 86 : 102, "text-anchor": "middle", "font-size": 27, "font-weight": 700, fill: INK, "data-fit": 196}, L1); if (L2) tx(g, {x: 0, y: 118, "text-anchor": "middle", "font-size": 27, "font-weight": 700, fill: INK, "data-fit": 196}, L2);
    el("circle", {cx: -80, cy: -112, r: 21, fill: i < 8 ? "#e63946" : "#6c757d", stroke: INK, "stroke-width": 4}, g); tx(g, {x: -80, y: -103, "text-anchor": "middle", "font-size": 26, "font-weight": 700, fill: "#fff"}, String(i + 1)); g.x = x; g.y = y; g.w = w; return g; });
  s.arrows = ST.slice(0, 9).map((_, i) => { const a = el("path", {d: "M-12 -14 L12 0 L-12 14 Z", fill: INK}, st); if (i === 4) tf(a, "translate(1072 466) rotate(90)"); else tf(a, `translate(${128 + (i % 5) * 236 + 118} ${i < 5 ? 290 : 640})`); return a; });
  s.run = t => { popAt(s.top, 600, 60, t, SC.recap.t0 - .2);
    s.cards.forEach((g, i) => { const tw = cue("recap", g.w, (i + 1) / 11), now = on(t, tw - .1, tw + 1.5, .2); tf(g, `translate(${g.x} ${g.y}) scale(${1 + .12 * now})`); op(g, t >= tw - .1 ? 1 : .3); set(g.box, "fill", now > .3 ? "#fff7c2" : "#fff"); });
    s.arrows.forEach((a, i) => op(a, t >= cue("recap", s.cards[i + 1].w, (i + 2) / 11) - .1 ? 1 : .25)); }; return s; })();

// ---- TEXTBOOK: lungs, heart and blood vessels round the body, lighting up in step with Heart. Rule 10: every label is the name of a part
S.textbook = (() => { const s = scene("textbook", "#e8f7ff", "#cdeaf7"), st = s.stage, RED = "#e63946", BLU = "#4895ef";
  s.top = chip(st, "📘 Primary 5 Science", "#3a0ca3", {fs: 36});
  const R1 = [[650, 300], [720, 262], [880, 262], [880, 432], [668, 432]], R2 = [[668, 486], [960, 486], [960, 690], [740, 690]], B1 = [[460, 690], [240, 690], [240, 486], [532, 486]], B2 = [[532, 432], [320, 432], [320, 262], [480, 262], [550, 300]];
  const V = (P, col) => { const g = el("g", {}, st), d = "M" + P.map(q => q.join(" ")).join(" L"); el("path", {d, fill: "none", stroke: INK, "stroke-width": 32, "stroke-linecap": "round", "stroke-linejoin": "round"}, g);
    el("path", {d, fill: "none", stroke: col, "stroke-width": 21, "stroke-linecap": "round", "stroke-linejoin": "round"}, g); g.f = el("path", {d, fill: "none", stroke: "#fff", "stroke-width": 7, "stroke-dasharray": "2 44", "stroke-linecap": "round", opacity: .9}, g); return g; };
  s.v = [V(R1, RED), V(R2, RED), V(B1, BLU), V(B2, BLU)];
  s.body = el("g", {transform: "translate(600 690)"}, st); s.bodyBox = el("rect", o7A({x: -150, y: -78, width: 300, height: 156, rx: 28, fill: "#fff", "stroke-width": 7}), s.body); tf(o7Muscle(s.body), "translate(0 22) scale(.9)");
  tx(s.body, {x: 0, y: -40, "text-anchor": "middle", "font-size": 32, "font-weight": 700, fill: INK}, "body cells");
  s.star = el("g", {}, st); el("path", o7A({d: "M0 -70 L18 -24 L66 -30 L30 4 L52 50 L6 28 L-30 64 L-24 14 L-70 -4 L-22 -22 Z", fill: "#ffe14d"}), s.star); tx(s.star, {x: 0, y: 12, "text-anchor": "middle", "font-size": 26, "font-weight": 700, fill: INK}, "energy");
  s.lungG = el("g", {transform: "translate(600 262) scale(1.1)"}, st); s.lungs = o7Lungs(s.lungG);
  s.nose = el("g", {transform: "translate(600 108)"}, st); el("path", o7A({d: "M-8 -34 Q-12 -4 -30 12 Q-38 30 -18 32 Q0 42 18 32 Q34 28 28 12 Q10 -4 8 -34 Z", fill: O7.SKIN, "stroke-width": 5}), s.nose);
  s.heartG = el("g", {transform: "translate(600 462)"}, st); s.heart = o7Heart(s.heartG);
  s.air = el("g", {}, st); el("path", o7A({d: "M-11 -30 H11 V6 H26 L0 36 L-26 6 H-11 Z", fill: "#06d6a0", "stroke-width": 5}), s.air);
  s.airO = el("g", {}, st); el("path", o7A({d: "M-11 30 H11 V-6 H26 L0 -36 L-26 -6 H-11 Z", fill: "#8d99ae", "stroke-width": 5}), s.airO);
  const L = (text, x, y, lx, ly) => { const g = el("g", {}, st); if (lx !== undefined) el("line", {x1: lx, y1: ly, x2: x + (lx < x ? -8 : 8), y2: y - 12, stroke: INK, "stroke-width": 4, "stroke-linecap": "round"}, g);
    tx(g, {x, y, "text-anchor": lx !== undefined && lx < x ? "start" : lx !== undefined ? "end" : "middle", "font-size": 34, "font-weight": 700, fill: INK}, text); return g; };
  s.L = {nose: L("nose", 700, 120, 634, 112), pipe: L("windpipe", 716, 196, 624, 180), lungs: L("lungs", 400, 216, 470, 240), heart: L("heart", 600, 606), vess: L("blood vessels", 990, 600, 972, 590)};
  // key
  s.key = el("g", {transform: "translate(908 84)"}, st); el("rect", o7A({x: 0, y: 0, width: 290, height: 166, rx: 18, fill: "#fff", "stroke-width": 5}), s.key);
  [[RED, ["blood rich in oxygen"], 30], [BLU, ["blood with more", "carbon dioxide"], 64]].forEach(([c, l, y]) => { el("line", {x1: 16, y1: y, x2: 50, y2: y, stroke: INK, "stroke-width": 16, "stroke-linecap": "round"}, s.key); el("line", {x1: 16, y1: y, x2: 50, y2: y, stroke: c, "stroke-width": 9, "stroke-linecap": "round"}, s.key);
    l.forEach((ln, i) => tx(s.key, {x: 64, y: y + 8 + i * 26, "font-size": 23, "font-weight": 700, fill: INK, "data-fit": 214}, ln)); });
  tx(s.key, {x: 145, y: 128, "text-anchor": "middle", "font-size": 20, "font-weight": 700, fill: "#c1121f"}, "Real blood is always red."); tx(s.key, {x: 145, y: 152, "text-anchor": "middle", "font-size": 20, "font-weight": 700, fill: "#c1121f"}, "Blue is just for the diagram.");
  s.o2 = [0, 1, 2, 3, 4, 5].map(i => { const g = o7O2(st, 13, false); g.i = i; return g; }); s.co = [0, 1, 2, 3, 4, 5].map(i => { const g = o7CO2(st, 11, false); g.i = i; return g; });
  s.run = t => { const a = (w, f) => cue("textbook", w, f), tb = a("breathe", .27), to = a("oxygen", .31), tp = a("passes", .38), th = a("heart", .45), tv = a("vessels", .51), tbd = a("body", .58), tc = a("cells", .62), te = a("energy", .7), tk = a("carbon", .77), tr = a("carries", .85), tbk = a("back", .92), tout = a("out", .985);
    popAt(s.top, 880, 40, t, SC.textbook.t0 - .2);
    const lit = (e, tt) => op(e, .3 + .7 * ramp(t, tt - .2, tt + .2)), bump = tt => 1 + .1 * on(t, tt - .1, tt + .9, .2);
    const trs = a("respiratory", .15), tci = a("circulatory", .19); lit(s.lungG, trs); lit(s.nose, trs); lit(s.heartG, tci); lit(s.body, tci + .5); s.v.forEach((v, i) => { lit(v, tci + .2); set(v.f, "stroke-dashoffset", -(t - th) * 70); op(v.f, t > th ? .9 : 0); });
    const br = 1 + .07 * Math.sin((t - tb) * 2.1) * ramp(t, tb, tb + .4); tf(s.lungs.L, `scale(${br})`); tf(s.lungs.R, `scale(${br})`); tf(s.lungG, `translate(600 262) scale(${1.1 * bump(tb) * bump(trs)})`);
    tf(s.heartG, `translate(600 462) scale(${bump(th) * bump(tci)})`); tf(s.heart.b, `scale(${1 + .13 * o7Beat((t - th) * 1.2) * (t > th ? 1 : 0)})`);
    tf(s.body, `translate(600 690) scale(${bump(tc)})`); set(s.bodyBox, "fill", t > te && t < te + 1.6 ? "#fff3a6" : "#fff"); popAt(s.star, 760, 628, t, te - .1, .9); op(s.star, on(t, te - .1, tk + .6, .25));
    tf(s.air, `translate(540 ${96 + 8 * Math.sin(t * 5)})`); op(s.air, on(t, tb - .2, tp + .6, .25)); tf(s.airO, `translate(540 ${96 - 8 * Math.sin(t * 5)})`); op(s.airO, ramp(t, tout - .5, tout - .2));
    o7At(s.L.nose, 0, 0, t, trs, 1e9); o7At(s.L.pipe, 0, 0, t, trs + .15, 1e9); o7At(s.L.lungs, 0, 0, t, trs + .3, 1e9); o7At(s.L.heart, 0, 0, t, tci, 1e9); o7At(s.L.vess, 0, 0, t, tv - .1, 1e9);
    op(s.key, ramp(t, tci + .4, tci + .8));
    // oxygen: nose -> windpipe -> lungs -> blood -> heart -> body cells
    s.o2.forEach(g => { const dl = g.i * .16, side = g.i % 2 ? 1 : -1, P0 = [[600, 70], [600, 232], [600 + side * 62, 300]], P3 = [[740, 690], [600 + side * 40 + g.i * 6, 706]];
      let p, o = 1; if (t < tp + dl) { p = o7Poly(P0, (t - to + .7 - dl) / 1.3); o = ramp(t, to - .7 + dl, to - .5 + dl); }
      else if (t < th + .3 + dl) p = o7Poly([[600 + side * 62, 300]].concat(R1), (t - tp - dl) / Math.max(.6, th + .3 - tp));
      else if (t < tbd + dl) p = o7Poly(R2, (t - th - .3 - dl) / Math.max(.8, tbd - th - .5)); else { p = o7Poly(P3, (t - tbd - dl) / .5); o = 1 - ramp(t, te - .1, te + .2); }
      tf(g, `translate(${p[0]} ${p[1] + (g.i % 3 - 1) * 5})`); op(g, o); });
    // carbon dioxide: made in the body cells -> blood -> heart -> lungs -> out
    s.co.forEach(g => { const dl = g.i * .14, side = g.i % 2 ? 1 : -1, P0 = [[600 + side * 50, 712], [460, 690]], PO = [[550, 300], [600, 232], [600, 70], [600 + side * 40, -10]];
      let p, o = ramp(t, tk - .1 + dl, tk + .1 + dl); const d1 = Math.max(.8, tbk - tr), t2 = tr + d1, d2 = Math.max(.8, tout - .5 - t2);
      if (t < tr + dl) p = o7Poly(P0, (t - tr + .4 - dl) / .4); else if (t < t2 + dl) p = o7Poly(B1, (t - tr - dl) / d1); else if (t < t2 + d2 + dl) p = o7Poly(B2, (t - t2 - dl) / d2); else { p = o7Poly(PO, (t - t2 - d2 - dl) / 1.1); o = 1 - ramp(t, t2 + d2 + dl + .9, t2 + d2 + dl + 1.2); }
      tf(g, `translate(${p[0]} ${p[1] + (g.i % 3 - 1) * 5})`); op(g, o); }); }; return s; })();

// ---- TRY THIS: count your breaths in 30 seconds and feel your pulse; jump on the spot for a minute; count again
S.try = (() => { const s = scene("try", "#caffbf", "#9bf6ff"), st = s.stage;
  s.top = chip(st, "🏠 Try this at home!", "#7209b7", {fs: 44});
  el("rect", {x: -200, y: 792, width: 2100, height: 300, fill: "#8fd67f"}, st); el("line", {x1: -200, y1: 792, x2: 1900, y2: 792, stroke: INK, "stroke-width": 5}, st);
  s.kidG = el("g", {}, st); s.kid = o7Kid(s.kidG); o7ChestHeart(s.kid);
  // the wrist: two fingers on the pulse
  s.wr = el("g", {}, st); el("circle", {r: 150, fill: "#fff", stroke: INK, "stroke-width": 8, filter: "url(#sh)"}, s.wr); const cp = el("clipPath", {id: "o7wr"}, $("v").querySelector("defs")); el("circle", {r: 146}, cp); const w = el("g", {"clip-path": "url(#o7wr)"}, s.wr);
  el("rect", o7A({x: -260, y: 4, width: 330, height: 84, rx: 30, fill: O7.SKIN, "stroke-width": 7}), w);                                              // the forearm, palm up
  el("path", o7A({d: "M40 -6 Q110 -22 128 10 L176 -4 Q196 2 184 22 L140 44 Q150 100 96 104 H40 Z", fill: O7.SKIN, "stroke-width": 7}), w);
  s.pd = [0, 1].map(() => el("circle", {cx: -8, cy: 26, r: 20, fill: "none", stroke: "#e63946", "stroke-width": 7}, w)); el("circle", {cx: -8, cy: 26, r: 12, fill: "#e63946"}, w);
  [[-36, -190], [0, -190]].forEach(([x, y]) => el("rect", o7A({x: x - 16, y, width: 32, height: 206, rx: 16, fill: O7.SK2, "stroke-width": 7}), w));              // two fingers of the other hand
  s.wl = chip(st, "feel your pulse on your wrist", "#e63946", {fs: 30});
  // the stopwatch
  s.sw = el("g", {}, st); el("rect", o7A({x: -12, y: -98, width: 24, height: 24, rx: 5, fill: "#adb5bd", "stroke-width": 5}), s.sw); el("circle", o7A({r: 78, fill: "#fff", "stroke-width": 8}), s.sw);
  s.swT = tx(s.sw, {x: 0, y: 16, "text-anchor": "middle", "font-size": 46, "font-weight": 700, fill: INK}, "30 s");
  // the table
  s.tab = el("g", {transform: "translate(700 250)"}, st); el("rect", o7A({x: 0, y: 0, width: 480, height: 330, rx: 26, fill: "#fff", "stroke-width": 7, filter: "url(#sh)"}), s.tab);
  el("path", {d: "M0 90 H480 M0 210 H480 M210 0 V330 M345 0 V330", stroke: INK, "stroke-width": 4, fill: "none"}, s.tab);
  [["before", 278], ["after", 412]].forEach(([l, x]) => tx(s.tab, {x, y: 56, "text-anchor": "middle", "font-size": 32, "font-weight": 700, fill: "#7209b7"}, l));
  tx(s.tab, {x: 105, y: 142, "text-anchor": "middle", "font-size": 28, "font-weight": 700, fill: INK}, "breaths"); tx(s.tab, {x: 105, y: 176, "text-anchor": "middle", "font-size": 24, "font-weight": 600, fill: INK}, "in 30 seconds"); tx(s.tab, {x: 105, y: 280, "text-anchor": "middle", "font-size": 28, "font-weight": 700, fill: INK}, "pulse");
  s.cell = [[278, 150], [278, 270], [412, 150], [412, 270]].map(([x, y]) => tx(s.tab, {x, y: y + 18, "text-anchor": "middle", "font-size": 54, "font-weight": 700, fill: "#f72585"}, "?"));
  s.q = chip(st, "What changed? Why?", "#f72585", {fs: 48});
  s.run = t => { const a = (w, f) => cue("try", w, f), tj = a("jump", .58), tg = a("again", .77), jump = on(t, tj, tg + .6, .2), ph = (t - tj) * 2 * Math.PI * 2;
    popAt(s.top, 600, 50, t, SC.try.t0 - .2); const hop = jump * Math.max(0, Math.sin(ph)), cr = jump * Math.max(0, -Math.sin(ph)), after = ramp(t, tg + .4, tg + 1);
    tf(s.kidG, `translate(230 ${790 - 90 * hop}) scale(1.28)`); const br = Math.sin(t * (2 + 6 * after));
    o7Pose(s.kid, {thN: -28 * cr, knN: 56 * cr, thF: -28 * cr, knF: 56 * cr, aN: -150 * hop + 5, aF: -150 * hop - 5, eN: -8, eF: -8, lean: 2 * br * (1 - jump), mouth: after > .5 || jump > .5 ? 1 : 0});
    tf(s.kid.sh, `scale(${1 - .4 * hop})`); op(s.kid.sweat, after); o7Thump(s.kid, t * (1.2 + 1.3 * Math.max(jump, after)), ramp(t, a("pulse", .42) - .2, a("pulse", .42)));
    const tw = a("pulse", .42) - .2; popAt(s.wr, 520, 610, t, tw, .85); s.pd.forEach((c, i) => { const q = ((t * 1.2 + i * .5) % 1 + 1) % 1; set(c, "r", 14 + 40 * q); op(c, 1 - q); }); popAt(s.wl, 600, 830, t, tw + .2); op(s.wl, on(t, tw + .2, tj - .1, .2));
    popAt(s.sw, 540, 300, t, a("thirty", .27) - .2); s.swT.textContent = t > a("one", .68) - .1 ? "1 min" : "30 s"; tf(s.sw, `translate(540 300) scale(${Math.max(0, pop(t, a("thirty", .27) - .2)) * (1 + .15 * on(t, a("one", .68) - .1, a("one", .68) + .6, .15))})`);
    popAt(s.tab, 700, 250, t, a("count", .14) - .2); tf(s.tab, `translate(${700 + 240 * (1 - Math.max(0, pop(t, a("count", .14) - .2)))} 250)`);
    [a("breathe", .23), a("pulse", .42), tg, tg + .35].forEach((tt, i) => { op(s.cell[i], ramp(t, tt, tt + .2)); tf(s.cell[i], `translate(0 0)`); });
    popAt(s.q, 900, 700, t, a("what", .85)); }; return s; })();

// ---- THINK ABOUT IT: why does your face turn red after running?
S.think = (() => { const s = scene("think", "#3a0ca3", "#7209b7"), st = s.stage;
  s.title = tx(st, {x: 600, y: 100, "text-anchor": "middle", "font-size": 76, "font-weight": 700, fill: "#ffe14d", class: "out", "stroke-width": 10}, "🤔 Think about it!");
  const face = (x, lab, id) => { const g = el("g", {}, st), cp = el("clipPath", {id}, $("v").querySelector("defs")); el("circle", {r: 196}, cp); el("circle", {r: 196, fill: "#bde0fe"}, g);
    const m = el("g", {"clip-path": `url(#${id})`}, g), kg = el("g", {transform: "translate(-40 880) scale(2.1)"}, m); g.kid = o7Kid(kg); op(g.kid.sh, 0); el("circle", {r: 196, fill: "none", stroke: INK, "stroke-width": 10}, g);
    g.lab = o7Lab(g, lab, 44); tf(g.lab, "translate(0 262)"); g.x = x; return g; };
  s.f0 = face(310, "before running", "o7f0"); s.f1 = face(890, "after running", "o7f1");
  s.arr = el("g", {}, st); el("path", o7A({d: "M-70 -16 H24 V-42 L78 0 L24 42 V16 H-70 Z", fill: "#ffe14d"}), s.arr);
  s.q = tx(st, {x: 0, y: 0, "text-anchor": "middle", "font-size": 150, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 20}, "?");
  s.ans = chip(st, "Answer next time!", "#f72585", {fs: 44});
  s.run = t => { const a = (w, f) => cue("think", w, f), tr = a("red", .4), red = ramp(t, tr - .2, tr + .8);
    popAt(s.title, 0, 0, t, SC.think.t0 - .2); popAt(s.f0, 310, 440, t, a("why", .2) - .2); popAt(s.arr, 600, 440, t, a("turn", .34) - .2); popAt(s.f1, 890, 440, t, a("turn", .34));
    o7Pose(s.f0.kid, {}); o7Pose(s.f1.kid, {mouth: 1, lean: 1.5 * Math.sin(t * 8)}); op(s.f1.kid.red, .42 * red); op(s.f1.kid.cheek, .55 + .45 * red); op(s.f1.kid.sweat, red);
    tf(s.q, `translate(600 310) scale(${Math.max(0, pop(t, a("running", .58) + .2)) * (1 + .06 * Math.sin(t * 5))})`); op(s.q, t > a("running", .58) + .15 ? 1 : 0);
    popAt(s.ans, 600, 820, t, a("next", .88)); }; return s; })();

// ---- CLOSE: what to remember, then the next episode's teaser (rows and teaser come from CFG.close)
S.close = (() => { const s = scene("close", "#f15bb5", "#fee440"), st = s.stage;
  const CL = CFG.close || {}, rows = CL.rows || [];
  s.rows = rows.map(([e, lab, w, f, col], i) => ({c: chip(st, e + "  " + lab, col, {fs: 42}), w, f, y: 170 + i * (rows.length > 3 ? 150 : 185)}));
  s.co = chip(st, "💨  Carbon dioxide: carried back and breathed out", "#6c757d", {fs: 42});
  s.tease = chip(st, CL.tease || "Next time!", "#3a0ca3", {fs: 40});
  s.run = t => { const tn = cue("close", CL.teaseWord || "next", .85), dim = 1 - .6 * ramp(t, tn - .2, tn + .3);
    s.rows.forEach(r => { const tw = cue("close", r.w, r.f); popAt(r.c, 600, r.y, t, tw); op(r.c, ramp(t, tw - .05, tw + .1) * dim); });
    const tc = cue("close", "carbon", .62); popAt(s.co, 600, 170 + rows.length * 185 - 30, t, tc); op(s.co, ramp(t, tc - .05, tc + .1) * dim);
    popAt(s.tease, 600, 840, t, tn); }; return s; })();
