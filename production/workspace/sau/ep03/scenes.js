/* TheOneApp, Explored EP03 Part 1: What really happens to your drink can? Load after common.js and geo_map.js; ep03/pov.js follows.
   Scenes draw in a 1200 x 900 box; times come from cue(scene, word, fallback).
   Kept true (rule 9): Singapore's 10-cent coin is silver-coloured; the Deposit Mark here is our own generic mark (no real logo is copied);
   a magnet attracts steel (it is mostly iron) and not aluminium; recycled aluminium needs far less energy than new metal (bars drawn about 1 to 20).
   Helpers are EP02's under new names (c3...). Every frame depends only on t. */

/* ---- helpers ---- */
const c3T = n => SC[n] ? SC[n].t0 : -1e6, c3D = n => SC[n] ? SC[n].t1 - SC[n].t0 : 1;
const c3Defs = () => $("v").querySelector("defs");
function c3GradR(stops, a = {}) { const id = "c3r" + (c3GradR.n = (c3GradR.n || 0) + 1), g = el("radialGradient", Object.assign({id, cx: .5, cy: .5, r: .5}, a), c3Defs());
  stops.forEach(([o, c, al]) => el("stop", {offset: o, "stop-color": c, "stop-opacity": al === undefined ? 1 : al}, g)); return `url(#${id})`; }
function c3GradL(stops, a = {}) { const id = "c3l" + (c3GradL.n = (c3GradL.n || 0) + 1), g = el("linearGradient", Object.assign({id, x1: 0, y1: 0, x2: 0, y2: 1}, a), c3Defs());
  stops.forEach(([o, c, al]) => el("stop", {offset: o, "stop-color": c, "stop-opacity": al === undefined ? 1 : al}, g)); return `url(#${id})`; }
function c3Glow(p, col, r, a = 1, core = 0) { return el("circle", {r, fill: c3GradR([[0, col, a], [core, col, a], [1, col, 0]])}, p); }
const O3 = {stroke: INK, "stroke-width": 6, "stroke-linejoin": "round", "stroke-linecap": "round"}, A3 = (a, b) => Object.assign({}, O3, a, b || {});
function c3Lab(p, text, fs = 40, fill = "#fff") { return tx(p, {x: 0, y: 0, "text-anchor": "middle", "font-size": fs, "font-weight": 700, fill, class: "out", "stroke-width": fs * .22}, text); }
const c3At = (e, x, y, t, a, b = 1e9, sc = 1) => { tf(e, `translate(${x} ${y}) scale(${sc * Math.max(0, pop(t, a))})`); op(e, on(t, a, b, .25)); };
function c3Cross(p, r, w = 16) { const g = el("g", {}, p); [[-1, -1, 1, 1], [1, -1, -1, 1]].forEach(([a, b, c, d]) => { el("line", {x1: a * r, y1: b * r, x2: c * r, y2: d * r, stroke: INK, "stroke-width": w + 8, "stroke-linecap": "round"}, g); });
  [[-1, -1, 1, 1], [1, -1, -1, 1]].forEach(([a, b, c, d]) => el("line", {x1: a * r, y1: b * r, x2: c * r, y2: d * r, stroke: "#e63946", "stroke-width": w, "stroke-linecap": "round"}, g)); return g; }
function c3Tick(p, r, w = 16) { const g = el("g", {}, p), d = `M${-r} ${0} L${-r * .3} ${r * .7} L${r} ${-r * .7}`; el("path", {d, fill: "none", stroke: INK, "stroke-width": w + 8, "stroke-linecap": "round", "stroke-linejoin": "round"}, g);
  el("path", {d, fill: "none", stroke: "#06d6a0", "stroke-width": w, "stroke-linecap": "round", "stroke-linejoin": "round"}, g); return g; }
function c3Arrow(p, len, col = INK, w = 12) { const g = el("g", {}, p); el("path", {d: `M0 0 H${len - 20} M${len - 34} -20 L${len} 0 L${len - 34} 20`, fill: "none", stroke: col, "stroke-width": w, "stroke-linecap": "round", "stroke-linejoin": "round"}, g); return g; }

/* ---- drawings ---- */
const HERO = "#fb8500";      // our can before it is recycled (plain stripes and dots: no real brand)
// our own Deposit Mark: a white disc, a "comes back" arrow and 10¢ (generic: it copies no real logo)
function dmark(p, r = 30) { const g = el("g", {}, p), R = r * .7, a0 = -50 * Math.PI / 180, a1 = 235 * Math.PI / 180, c = Math.cos(a1), s = Math.sin(a1);
  el("circle", {r, fill: "#fff", stroke: INK, "stroke-width": Math.max(2, r * .12)}, g);
  el("path", {d: `M${R * Math.cos(a0)} ${R * Math.sin(a0)} A${R} ${R} 0 1 1 ${R * c} ${R * s}`, fill: "none", stroke: "#2a9d8f", "stroke-width": r * .17, "stroke-linecap": "round"}, g);
  const P = [R * c, R * s], Tn = [-s, c], N = [c, s], h = r * .42, w = r * .27;
  el("path", {d: `M${P[0] + Tn[0] * h} ${P[1] + Tn[1] * h} L${P[0] + N[0] * w} ${P[1] + N[1] * w} L${P[0] - N[0] * w} ${P[1] - N[1] * w} Z`, fill: "#2a9d8f"}, g);
  tx(g, {x: 0, y: r * .2, "text-anchor": "middle", "font-size": r * .6, "font-weight": 700, fill: "#14534c"}, "10¢"); return g; }
// an aluminium drink can, 100 wide and 190 tall, centred. o.face, o.mark, o.dent
function canG(p, col = "#e63946", o = {}) { const g = el("g", {}, p), sw = o.sw || 6, body = o.dent ? "M-40 -90 H40 L50 -70 V-20 L38 6 L50 30 V70 L40 90 H-40 L-50 70 V34 L-42 4 L-50 -24 V-70 Z" : "M-40 -90 H40 L50 -70 V70 L40 90 H-40 L-50 70 V-70 Z";
  const cp = "c3cp" + (canG.n = (canG.n || 0) + 1), c = el("clipPath", {id: cp}, c3Defs()); el("path", {d: body}, c);
  el("path", {d: body, fill: "#d5dde2"}, g); const m = el("g", {"clip-path": `url(#${cp})`}, g);
  el("rect", {x: -52, y: -68, width: 104, height: 136, fill: col}, m);
  el("rect", {x: -52, y: 14, width: 104, height: 32, fill: "#fff", opacity: .92}, m); [-26, 0, 26].forEach(x => el("circle", {cx: x, cy: 30, r: 8, fill: col}, m));
  el("rect", {x: -40, y: -84, width: 13, height: 168, rx: 6, fill: "#fff", opacity: .32}, m); el("rect", {x: 30, y: -90, width: 22, height: 180, fill: INK, opacity: .12}, m);
  [-68, 68].forEach(y => el("line", {x1: -52, y1: y, x2: 52, y2: y, stroke: INK, "stroke-width": sw * .6}, m));
  el("path", {d: body, fill: "none", stroke: INK, "stroke-width": sw, "stroke-linejoin": "round"}, g);
  el("rect", {x: -37, y: -100, width: 74, height: 12, rx: 5, fill: "#f1f4f6", stroke: INK, "stroke-width": sw * .8}, g);
  if (o.face) { g.face = el("g", {}, g); [-18, 18].forEach(x => { el("circle", {cx: x, cy: -36, r: 13, fill: "#fff", stroke: INK, "stroke-width": 3}, g.face); el("circle", {cx: x + 2, cy: -34, r: 6.5, fill: INK}, g.face); el("circle", {cx: x + 4, cy: -37, r: 2.2, fill: "#fff"}, g.face); });
    el("path", {d: "M-13 -14 Q0 -2 13 -14", fill: "none", stroke: INK, "stroke-width": 4.5, "stroke-linecap": "round"}, g.face); }
  if (o.mark) { g.mark = dmark(g, 17); tf(g.mark, "translate(26 54)"); }
  return g; }
// a steel food can (a "tin"): shorter, wider, ribbed, with a paper label
function tinG(p, o = {}) { const g = el("g", {}, p);
  el("rect", A3({x: -58, y: -66, width: 116, height: 132, rx: 6, fill: c3GradL([[0, "#8b969e"], [.3, "#c9d1d6"], [.6, "#9aa5ad"], [1, "#6f7a82"]], {x2: 1, y2: 0})}), g);
  [-52, -42, 42, 52].forEach(y => el("line", {x1: -56, y1: y, x2: 56, y2: y, stroke: INK, "stroke-width": 3, opacity: .55}, g));
  el("rect", {x: -58, y: -32, width: 116, height: 64, fill: o.col || "#588157", stroke: INK, "stroke-width": 4}, g);
  if (!o.face) [[-28, 0, 13], [0, -6, 15], [28, 2, 13]].forEach(([x, y, r]) => el("circle", {cx: x, cy: y, r, fill: "#a7c957", stroke: INK, "stroke-width": 3}, g));
  [-66, 66].forEach(y => el("rect", A3({x: -62, y: y - 7, width: 124, height: 14, rx: 6, fill: "#dfe6ea", "stroke-width": 5}), g));
  if (o.face) { [-18, 18].forEach(x => { el("circle", {cx: x, cy: -4, r: 12, fill: "#fff", stroke: INK, "stroke-width": 3}, g); el("circle", {cx: x + 2, cy: -2, r: 6, fill: INK}, g); });
    el("path", {d: "M-10 18 Q0 12 10 18", fill: "none", stroke: INK, "stroke-width": 4, "stroke-linecap": "round"}, g); }
  return g; }
const BOT = "M-16 -100 Q-16 -76 -40 -58 Q-46 -50 -46 -38 V104 Q-46 120 -30 120 H30 Q46 120 46 104 V-38 Q46 -50 40 -58 Q16 -76 16 -100 Z";
// a plastic drink bottle (with our Deposit Mark) and a glass bottle (no mark: glass is not in the scheme)
function bottleG(p, o = {}) { const g = el("g", {}, p); el("path", A3({d: BOT, fill: "#c9ecff"}), g); el("rect", {x: -34, y: -40, width: 11, height: 140, rx: 5, fill: "#fff", opacity: .7}, g);
  el("rect", {x: -46, y: -6, width: 92, height: 70, fill: o.col || "#06d6a0", stroke: INK, "stroke-width": 4}, g); el("rect", {x: -46, y: 18, width: 92, height: 22, fill: "#fff", opacity: .9}, g);
  el("rect", A3({x: -20, y: -124, width: 40, height: 26, rx: 6, fill: "#3a86ff", "stroke-width": 5}), g);
  if (o.mark !== false) { g.mark = dmark(g, 17); tf(g.mark, "translate(22 88)"); } return g; }
function glassG(p) { const g = el("g", {}, p); el("path", A3({d: BOT, fill: "#2d6a4f"}), g); el("rect", {x: -34, y: -40, width: 11, height: 140, rx: 5, fill: "#b7e4c7", opacity: .6}, g);
  el("rect", {x: -46, y: 4, width: 92, height: 56, fill: "#f8f1dc", stroke: INK, "stroke-width": 4}, g); el("rect", A3({x: -19, y: -116, width: 38, height: 16, rx: 4, fill: "#e9c46a", "stroke-width": 5}), g); return g; }
function cartonG(p) { const g = el("g", {}, p); el("path", A3({d: "M-50 -80 L-34 -110 H34 L50 -80 V110 H-50 Z", fill: "#ffb703"}), g); el("line", {x1: -50, y1: -80, x2: 50, y2: -80, stroke: INK, "stroke-width": 5}, g);
  el("circle", A3({cx: 0, cy: 14, r: 34, fill: "#fb8500", "stroke-width": 5}), g); el("path", A3({d: "M0 -20 q14 -18 28 -8 q-10 16 -28 8", fill: "#52b788", "stroke-width": 4}), g);
  el("path", {d: "M20 -108 L44 -160", stroke: INK, "stroke-width": 14, "stroke-linecap": "round"}, g); el("path", {d: "M20 -108 L44 -160", stroke: "#fff", "stroke-width": 6, "stroke-linecap": "round"}, g); return g; }
// Singapore's 10-cent coin is silver-coloured
function coinG(p, r = 60) { const g = el("g", {}, p); el("circle", {r, fill: c3GradL([[0, "#f8f9fa"], [.55, "#ced4da"], [1, "#9aa5ad"]]), stroke: INK, "stroke-width": Math.max(3, r * .1)}, g);
  el("circle", {r: r * .8, fill: "none", stroke: "#8d99ae", "stroke-width": r * .05}, g); tx(g, {x: 0, y: r * .24, "text-anchor": "middle", "font-size": r * .72, "font-weight": 700, fill: INK}, "10¢"); return g; }
// a return machine (generic). Feet at (0, 0), 300 wide, 560 tall; the hole is at (0, -215). g.scr is the screen text
function rvmG(p) { const g = el("g", {}, p);
  el("rect", A3({x: -150, y: -560, width: 300, height: 560, rx: 24, fill: "#2a9d8f", "stroke-width": 7}), g); el("path", {d: "M-146 -44 H146 V-22 Q146 -4 128 -4 H-128 Q-146 -4 -146 -22 Z", fill: "#1f776d"}, g);
  el("rect", {x: 112, y: -540, width: 26, height: 500, rx: 10, fill: INK, opacity: .12}, g);
  el("rect", A3({x: -124, y: -536, width: 248, height: 84, rx: 16, fill: "#fff"}), g);
  el("path", {d: "M-70 -494 a22 22 0 1 1 -22 -22 M-100 -530 l10 14 l-18 4", fill: "none", stroke: "#2a9d8f", "stroke-width": 9, "stroke-linecap": "round", "stroke-linejoin": "round"}, g);
  tx(g, {x: 26, y: -478, "text-anchor": "middle", "font-size": 46, "font-weight": 700, fill: INK}, "RETURN");
  el("rect", A3({x: -112, y: -432, width: 224, height: 112, rx: 14, fill: "#12313a"}), g);
  g.scr = tx(g, {x: 0, y: -358, "text-anchor": "middle", "font-size": 50, "font-weight": 700, fill: "#8dffc0"}, "10¢ back");
  g.ring = el("circle", A3({cx: 0, cy: -215, r: 76, fill: "#e9eef1", "stroke-width": 7}), g); el("circle", A3({cx: 0, cy: -215, r: 56, fill: "#0b1d24"}), g);
  el("path", {d: "M-40 -246 A56 56 0 0 1 40 -246", fill: "none", stroke: "#27485a", "stroke-width": 8, "stroke-linecap": "round"}, g);
  el("rect", A3({x: -112, y: -120, width: 224, height: 62, rx: 14, fill: "#e9f5f3", "stroke-width": 5}), g);
  tf(canG(g, HERO, {sw: 12}), "translate(-52 -89) scale(.25)"); tf(bottleG(g, {mark: false}), "translate(-6 -88) scale(.2)"); tf(c3Tick(g, 14, 9), "translate(62 -90)"); return g; }
// a green litter bin (the kind at a void deck) and the big blue recycling bin
function binG(p) { const g = el("g", {}, p); el("rect", A3({x: -62, y: -170, width: 124, height: 170, rx: 14, fill: "#40916c"}), g); el("rect", A3({x: -74, y: -196, width: 148, height: 34, rx: 12, fill: "#2d6a4f"}), g);
  el("rect", A3({x: -40, y: -150, width: 80, height: 30, rx: 8, fill: "#12241c", "stroke-width": 5}), g); [-30, 0, 30].forEach(x => el("line", {x1: x, y1: -100, x2: x, y2: -20, stroke: "#2d6a4f", "stroke-width": 7, "stroke-linecap": "round"}, g)); return g; }
function blueBinG(p) { const g = el("g", {}, p); el("circle", A3({cx: -66, cy: -16, r: 20, fill: "#343a40"}), g); el("circle", A3({cx: 66, cy: -16, r: 20, fill: "#343a40"}), g);
  el("path", A3({d: "M-104 -238 H104 L84 -22 H-84 Z", fill: "#1d6fd1", "stroke-width": 7}), g); el("path", A3({d: "M-120 -272 H120 V-244 Q120 -232 108 -232 H-108 Q-120 -232 -120 -244 Z", fill: "#1554a8", "stroke-width": 7}), g);
  el("rect", A3({x: -58, y: -196, width: 116, height: 106, rx: 12, fill: "#fff", "stroke-width": 5}), g); emo(g, 0, -142, 76, "♻️"); return g; }
// HDB flats with solar panels on the roof (EP02's hdb, with the panels as its own group)
function c3Hdb(p, x, y, w, h, col) { const g = el("g", {}, p); el("rect", {x, y: y - h, width: w, height: h, rx: 6, fill: col, stroke: INK, "stroke-width": 5}, g); g.win = [];
  for (let r = 0; r < Math.floor(h / 46); r++) for (let c = 0; c < Math.floor(w / 40); c++) g.win.push(el("rect", {x: x + 12 + c * 40, y: y - h + 18 + r * 46, width: 22, height: 26, rx: 3, fill: "#fdf0d5"}, g));
  g.roof = el("g", {}, g); g.pan = []; for (let c = 0; c < Math.floor(w / 46); c++) g.pan.push(el("rect", {x: x + 8 + c * 46, y: y - h - 22, width: 40, height: 18, fill: "#1d3557", stroke: "#a8dadc", "stroke-width": 2, transform: `skewX(-20)`, "transform-origin": `${x + 28 + c * 46} ${y - h - 13}`}, g.roof));
  return g; }
// "YOU" tag: points down at whatever we are
function youTag(p) { const g = el("g", {}, p); el("path", {d: "M-62 -92 H62 Q74 -92 74 -80 V-44 Q74 -32 62 -32 H16 L0 -8 L-16 -32 H-62 Q-74 -32 -74 -44 V-80 Q-74 -92 -62 -92 Z", fill: "#ffe14d", stroke: INK, "stroke-width": 6, "stroke-linejoin": "round"}, g);
  tx(g, {x: 0, y: -46, "text-anchor": "middle", "font-size": 44, "font-weight": 700, fill: INK}, "YOU"); return g; }

/* ---- the pupil: EP02's krKid (ep02/coldopen.js), so the student looks the same across the series; K.can is in the near hand ---- */
function c3Kid(p) { const K = el("g", {}, p), SKIN = "#f1c27d", BLUE = "#3a86ff", NAVY = "#1d3557", HAIR = "#3d2c1e", A = A3;
  K.sh = el("ellipse", {cx: 6, cy: 2, rx: 92, ry: 15, fill: INK, opacity: .22}, K);
  K.body = el("g", {}, K);
  const leg = far => { const g = el("g", {}, K.body);
    el("rect", A({x: -17, y: -6, width: 34, height: 96, rx: 15, fill: far ? "#dba968" : SKIN}), g); el("rect", A({x: -17, y: 62, width: 34, height: 34, rx: 6, fill: "#fff"}), g);
    el("path", A({d: "M-20 92 H24 Q44 94 44 110 Q44 120 34 120 H-20 Z", fill: far ? "#2b2b45" : "#33334f"}), g); return g; };
  K.bag = el("g", {}, K.body);
  el("rect", A({x: -104, y: -316, width: 78, height: 150, rx: 22, fill: "#e63946"}), K.bag); el("rect", A({x: -98, y: -238, width: 50, height: 56, rx: 12, fill: "#ff7b54", "stroke-width": 5}), K.bag);
  el("path", A({d: "M-84 -316 Q-66 -340 -46 -318", fill: "none", "stroke-width": 7}), K.bag);
  K.armF = el("g", {}, K.body); el("rect", A({x: -13, y: 36, width: 26, height: 70, rx: 13, fill: "#dba968"}), K.armF); el("rect", A({x: -17, y: -8, width: 34, height: 58, rx: 15, fill: "#2f6fd6"}), K.armF);
  K.legF = leg(1); K.legN = leg(0);
  K.torso = el("g", {}, K.body);
  el("path", A({d: "M-50 -186 H50 L54 -112 H4 L0 -136 L-4 -112 H-54 Z", fill: NAVY}), K.torso);
  el("rect", A({x: -54, y: -326, width: 108, height: 152, rx: 30, fill: BLUE}), K.torso);
  el("rect", A({x: 6, y: -278, width: 34, height: 34, rx: 6, fill: "#fff", "stroke-width": 4}), K.torso);
  el("path", A({d: "M-30 -326 Q-14 -252 -50 -212", fill: "none", stroke: INK, "stroke-width": 18}), K.torso); el("path", {d: "M-30 -326 Q-14 -252 -50 -212", fill: "none", stroke: "#c1121f", "stroke-width": 9, "stroke-linecap": "round"}, K.torso);
  K.head = el("g", {}, K.body);
  el("rect", A({x: -15, y: -340, width: 34, height: 30, fill: SKIN, "stroke-width": 5}), K.head);
  el("path", A({d: "M-26 -324 L4 -300 L34 -324 L22 -336 H-14 Z", fill: "#fff", "stroke-width": 5}), K.head);
  el("circle", A({cx: 6, cy: -402, r: 80, fill: SKIN}), K.head);
  el("path", A({d: "M-72 -372 Q-92 -486 0 -488 Q84 -490 88 -420 Q60 -446 22 -448 Q-4 -444 -14 -412 Q-22 -384 -40 -352 Q-66 -352 -72 -372 Z", fill: HAIR}), K.head);
  el("path", A({d: "M-8 -487 Q0 -506 16 -500", fill: "none", stroke: HAIR, "stroke-width": 9}), K.head); el("path", {d: "M-8 -487 Q0 -506 16 -500", fill: "none", stroke: HAIR, "stroke-width": 6, "stroke-linecap": "round"}, K.head);
  el("ellipse", A({cx: -18, cy: -394, rx: 13, ry: 17, fill: SKIN, "stroke-width": 5}), K.head);
  el("circle", {cx: 26, cy: -370, r: 15, fill: "#ff8fa3", opacity: .6}, K.head);
  K.eyes = el("g", {}, K.head);
  [[32, 11, 15], [66, 9, 14]].forEach(([x, rx, ry]) => { el("ellipse", {cx: x, cy: -404, rx, ry, fill: INK}, K.eyes); el("circle", {cx: x + 3, cy: -410, r: 4.4, fill: "#fff"}, K.eyes); });
  K.brow = el("g", {}, K.head); [[20, 44], [58, 76]].forEach(([a, b]) => el("path", {d: `M${a} -430 Q${(a + b) / 2} -437 ${b} -431`, fill: "none", stroke: INK, "stroke-width": 5, "stroke-linecap": "round"}, K.brow));
  K.m0 = el("path", {d: "M38 -372 Q52 -362 66 -372", fill: "none", stroke: INK, "stroke-width": 5.5, "stroke-linecap": "round"}, K.head);
  K.m1 = el("g", {opacity: 0}, K.head); el("path", A({d: "M34 -376 Q52 -371 72 -378 Q69 -348 51 -348 Q37 -350 34 -376 Z", fill: "#7a1c1c", "stroke-width": 5}), K.m1); el("path", {d: "M39 -372 Q52 -368 68 -373 L67 -366 Q52 -362 40 -365 Z", fill: "#fff"}, K.m1);
  K.armN = el("g", {}, K.body);
  K.can = el("g", {transform: "translate(0 132)"}, K.armN); K.canIn = canG(K.can, HERO, {mark: true, sw: 10}); tf(K.canIn, "scale(.36)");
  el("rect", A({x: -14, y: 36, width: 28, height: 92, rx: 14, fill: SKIN}), K.armN);
  el("circle", A({cx: 0, cy: 126, r: 17, fill: SKIN, "stroke-width": 5}), K.armN);
  el("rect", A({x: -19, y: -10, width: 38, height: 62, rx: 17, fill: BLUE}), K.armN);
  return K; }
// pose: q = {x, y, sc, sw (leg swing, degrees), bob, lean, arm (near arm: 0 = down, -90 = straight out to the right), head (tilt), smile (0 or 1), can (the can's own angle)}
function c3Pose(K, q) { const sw = q.sw || 0; tf(K, `translate(${q.x} ${q.y}) scale(${q.sc || 1})`); tf(K.body, `translate(0 ${q.bob || 0}) rotate(${q.lean || 0} 0 -120)`);
  tf(K.legN, `translate(16 -120) rotate(${sw})`); tf(K.legF, `translate(-14 -120) rotate(${-sw})`); tf(K.armF, `translate(-6 -300) rotate(${sw * .9})`);
  tf(K.armN, `translate(10 -300) rotate(${q.arm === undefined ? -sw * .9 : q.arm})`); tf(K.head, `rotate(${q.head || 0} 2 -330)`);
  op(K.m0, q.smile ? 0 : 1); op(K.m1, q.smile ? 1 : 0); tf(K.brow, `translate(0 ${q.smile ? -6 : 0})`); tf(K.can, `translate(0 132) rotate(${q.can || 0})`); }
const c3Hand = (q, d = 132) => { const a = (q.arm || 0) * Math.PI / 180, sc = q.sc || 1; return [q.x + sc * (10 - d * Math.sin(a)), q.y + sc * (-300 + (q.bob || 0) + d * Math.cos(a))]; };
// a walk: returns {sw, bob} for step phase
const c3Walk = (u, a, b, n) => { const k = clamp((u - a) / (b - a)), amp = 19 * ramp(u, a, a + .15) * (1 - ramp(u, b - .15, b)), ph = Math.PI * n * k; return {k, sw: amp * Math.sin(ph), bob: -amp / 19 * 7 * Math.abs(Math.sin(ph))}; };

// ---- COLD OPEN (silent, 5 s): a hot afternoon at an HDB void deck. A pupil gulps the last of a drink, flicks the empty can (clink), walks to the
// rubbish bin, stops... and spots a return machine. u = seconds of a 5 s shot. Sounds: ep03_gulp 0.25, ep03_clink 1.85, footsteps 2.1, sparkle 3.85, reveal 3.9
S.voidDeck = (() => { const s = scene("voidDeck", "#ffd166", "#ffd166"), st = s.stage, G = 800, U = 5; s.cam = el("g", {}, st); const c = s.cam;
  el("rect", {x: -700, y: -500, width: 3200, height: 1400, fill: c3GradL([[0, "#4cc9f0"], [.6, "#bfe9ff"], [1, "#fff3c4"]])}, c);
  s.sun = el("g", {transform: "translate(-20 60)"}, c); c3Glow(s.sun, "#fff3b0", 420, .9, .15); el("circle", {r: 84, fill: "#ffe14d", stroke: "#ffb703", "stroke-width": 8}, s.sun);
  el("rect", {x: -700, y: G, width: 3200, height: 500, fill: "#f4dfa8"}, c);                                             // sunny ground
  [[-250, 620, 150], [-120, 660, 110]].forEach(([x, y, r]) => { el("rect", {x: x - 12, y, width: 24, height: G - y, fill: "#7f5539", stroke: INK, "stroke-width": 5}, c); el("circle", A3({cx: x, cy: y - r * .5, r, fill: "#52b788"}), c); el("circle", {cx: x - r * .3, cy: y - r * .7, r: r * .35, fill: "#74c69d"}, c); });
  // the block of flats: homes above, the open void deck below
  const BX = 90, BW = 1900, TOP = 250;
  el("rect", {x: BX, y: TOP, width: BW, height: G - TOP, fill: "#b9b3a6"}, c);                                           // the shaded void deck: back wall
  el("rect", {x: BX, y: G - 250, width: BW, height: 250, fill: "#a7a195"}, c);
  el("rect", {x: BX + 620, y: TOP + 60, width: 520, height: G - TOP - 60, fill: c3GradL([[0, "#e8f7d4"], [1, "#b7e4a0"]])}, c); el("rect", {x: BX + 620, y: TOP + 60, width: 520, height: G - TOP - 60, fill: "none", stroke: INK, "stroke-width": 6}, c);   // a way through to the sunny garden behind
  el("circle", A3({cx: BX + 780, cy: 560, r: 86, fill: "#52b788", "stroke-width": 5}), c); el("rect", {x: BX + 772, y: 640, width: 16, height: 160, fill: "#7f5539", stroke: INK, "stroke-width": 4}, c); el("circle", A3({cx: BX + 1010, cy: 600, r: 64, fill: "#74c69d", "stroke-width": 5}), c); el("rect", {x: BX + 1004, y: 660, width: 12, height: 140, fill: "#7f5539", stroke: INK, "stroke-width": 4}, c);
  el("path", {d: `M${BX} ${G} H${BX + BW} L${BX + BW + 300} 1100 H${BX - 500} Z`, fill: "#d6d0c2"}, c);                   // the floor in shade
  [860, 940].forEach(y => el("line", {x1: -700, y1: y, x2: 2500, y2: y, stroke: "#bdb6a6", "stroke-width": 4}, c)); for (let k = 0; k < 14; k++) el("line", {x1: BX + k * 170, y1: G, x2: BX + k * 170 + (k - 5) * 60, y2: 1100, stroke: "#bdb6a6", "stroke-width": 4}, c);
  el("path", {d: `M${BX - 500} ${G} H${BX} L${BX - 190} 1100 H${BX - 500} Z`, fill: "#f4dfa8"}, c);                       // sunlight on the ground outside
  // a stone table and stools
  const tb = el("g", {transform: `translate(${BX + 300} ${G - 2})`}, c); el("rect", A3({x: -14, y: -86, width: 28, height: 86, fill: "#8d99ae", "stroke-width": 5}), tb); el("rect", A3({x: -96, y: -108, width: 192, height: 26, rx: 10, fill: "#ced4da", "stroke-width": 5}), tb);
  [-150, 150].forEach(x => { el("rect", A3({x: x - 10, y: -50, width: 20, height: 50, fill: "#8d99ae", "stroke-width": 5}), tb); el("rect", A3({x: x - 36, y: -66, width: 72, height: 20, rx: 9, fill: "#ced4da", "stroke-width": 5}), tb); });
  // the flats above
  el("rect", A3({x: BX, y: -520, width: BW, height: TOP + 520, fill: "#ffe8c2", "stroke-width": 7}), c);
  for (let r = 0; r < 3; r++) { const y = TOP - 222 - r * 190; el("rect", {x: BX, y: y + 96, width: BW, height: 60, fill: "#f4a261", stroke: INK, "stroke-width": 5}, c);   // corridor walls
    for (let k = 0; k < 13; k++) { const x = BX + 40 + k * 146; el("rect", A3({x, y: y - 22, width: 62, height: 118, rx: 4, fill: k % 3 ? "#8d5b3a" : "#9c6644", "stroke-width": 5}), c); el("rect", A3({x: x + 74, y: y - 10, width: 54, height: 62, rx: 4, fill: "#a8dadc", "stroke-width": 5}), c); } }
  el("rect", A3({x: BX, y: TOP - 34, width: BW, height: 44, fill: "#e76f51", "stroke-width": 6}), c);
  [BX + 10, BX + 560, BX + 1140, BX + 1700].forEach(x => { el("rect", A3({x, y: TOP + 8, width: 76, height: G - TOP - 8, fill: "#fff1d6", "stroke-width": 6}), c); el("rect", {x: x + 54, y: TOP + 10, width: 20, height: G - TOP - 12, fill: INK, opacity: .1}, c); });
  const sign = el("g", {transform: `translate(${BX + 48} ${TOP + 96})`}, c); el("rect", A3({x: -34, y: -40, width: 68, height: 80, rx: 8, fill: "#1d3557", "stroke-width": 5}), sign); tx(sign, {x: 0, y: -8, "text-anchor": "middle", "font-size": 22, "font-weight": 700, fill: "#fff"}, "BLK"); tx(sign, {x: 0, y: 26, "text-anchor": "middle", "font-size": 30, "font-weight": 700, fill: "#ffe14d"}, "88");
  // the rubbish bin and the return machine
  s.bin = binG(c); tf(s.bin, `translate(1020 ${G + 34}) scale(1.02)`);
  s.mglow = el("g", {transform: `translate(1500 ${G - 200})`, opacity: 0}, c); c3Glow(s.mglow, "#b8fff0", 420, .95, .2);
  s.rvm = rvmG(c); tf(s.rvm, `translate(1500 ${G + 30}) scale(.8)`);
  s.rays = el("g", {transform: `translate(1500 ${G - 200})`, opacity: 0}, c); for (let k = 0; k < 10; k++) { const a = k * .628 + .3; el("line", {x1: Math.cos(a) * 250, y1: Math.sin(a) * 300, x2: Math.cos(a) * 310, y2: Math.sin(a) * 372, stroke: INK, "stroke-width": 18, "stroke-linecap": "round"}, s.rays); }
  for (let k = 0; k < 10; k++) { const a = k * .628 + .3; el("line", {x1: Math.cos(a) * 250, y1: Math.sin(a) * 300, x2: Math.cos(a) * 310, y2: Math.sin(a) * 372, stroke: "#ffe14d", "stroke-width": 9, "stroke-linecap": "round"}, s.rays); }
  s.kid = c3Kid(c);
  s.clk = el("g", {opacity: 0}, c); [-60, -15, 30].forEach(a => { const r = a * Math.PI / 180; el("line", {x1: Math.cos(r) * 34, y1: Math.sin(r) * 34, x2: Math.cos(r) * 62, y2: Math.sin(r) * 62, stroke: INK, "stroke-width": 11, "stroke-linecap": "round"}, s.clk); el("line", {x1: Math.cos(r) * 34, y1: Math.sin(r) * 34, x2: Math.cos(r) * 62, y2: Math.sin(r) * 62, stroke: "#ffe14d", "stroke-width": 5, "stroke-linecap": "round"}, s.clk); });
  s.bang = el("g", {}, c); tx(s.bang, {x: 0, y: 0, "text-anchor": "middle", "font-size": 130, "font-weight": 700, fill: "#ffe14d", class: "out", "stroke-width": 20}, "!");
  s.heat = el("rect", {x: -700, y: -500, width: 3200, height: 1700, fill: "#ffb703", opacity: .07}, c);
  s.run = t => { const cc = SC.voidDeck, u = clamp((t - cc.t0) / Math.max(.1, cc.t1 - cc.t0), -.2, 1.2) * U, KS = .6;
    const gulp = 1 - ramp(u, 1.35, 1.75), w = c3Walk(u, 2.05, 3.45, 4), reach = ramp(u, 3.3, 3.7), spot = ramp(u, 3.75, 3.95), back = ramp(u, 4.1, 4.5);
    const sip = gulp * Math.max(0, Math.sin((u - .25) / .43 * Math.PI * 2)) * (u > .25 && u < 1.5 ? 1 : 0);
    const flick = on(u, 1.8, 2.05, .06) * Math.sin((u - 1.8) * 50) * 9;
    const arm = lerp(lerp(lerp(-38, -142, gulp), -74, reach), -52, back) + flick * .4 + (gulp < .05 ? -w.sw * .3 : 0);
    const q = {x: lerp(430, 870, w.k), y: G + 40, sc: KS, sw: w.sw, bob: w.bob - 3 * sip, arm, head: lerp(0, -20, gulp) - 2 * sip - 10 * spot, smile: (u > 1.55 && u < 2.1) || u > 4.05,
      can: lerp(lerp(38, -114 + 142, gulp), 74, reach * (1 - back)) + flick};
    c3Pose(s.kid, q); tf(s.kid.eyes, `translate(${4 * spot} ${-2 * spot})`);
    const hd = c3Hand(q); tf(s.clk, `translate(${hd[0] + 24} ${hd[1] - 14})`); op(s.clk, on(u, 1.82, 2.12, .06));
    tf(s.bang, `translate(${q.x + 20} ${q.y - 340}) scale(${Math.max(0, pop(u, 3.8, .3))})`); op(s.bang, on(u, 3.8, 4.7, .1));
    op(s.mglow, spot * (.75 + .25 * Math.sin(u * 9))); op(s.rays, spot); tf(s.rays, `translate(1500 ${G - 200}) scale(${spot ? .8 + .2 * pop(u, 3.8, .4) : .8})`);
    s.rvm.scr.textContent = u > 3.8 && Math.floor(u * 3.2) % 2 ? "♻ return" : "10¢ back";
    // camera: close on the pupil drinking, back to see the bin, then over to the machine
    const z1 = ramp(u, 1.5, 2.4), z2 = ramp(u, 3.7, 4.5), z = lerp(lerp(1.75, 1.02, z1), 1.22, z2), cx = lerp(lerp(470, 810, z1), 1130, z2), cy = lerp(lerp(640, 470, z1), 560, z2);
    tf(c, `translate(${VP[0]} ${VP[1]}) scale(${z}) translate(${-cx} ${-cy})`); }; return s; })();

// ---- HOOK: bin it, or bring it back? a 10-cent deposit; bring the empty back and get 10 cents; but what really happens to the can?
S.hook = (() => { const s = scene("hook", "#118ab2", "#073b4c"), st = s.stage;
  s.bin = el("g", {}, st); binG(s.bin); s.binQ = c3Lab(st, "bin it?", 54, "#fff");
  s.rvm = el("g", {}, st); s.m = rvmG(s.rvm); s.rvmQ = c3Lab(st, "bring it back?", 54, "#ffe14d");
  s.bot = el("g", {}, st); bottleG(s.bot);
  s.can = el("g", {}, st); s.canIn = canG(s.can, HERO, {mark: true});
  s.clk = el("g", {}, st); [-150, -90, -30].forEach(a => { const r = a * Math.PI / 180; el("line", {x1: Math.cos(r) * 190, y1: Math.sin(r) * 240, x2: Math.cos(r) * 250, y2: Math.sin(r) * 310, stroke: "#ffe14d", "stroke-width": 14, "stroke-linecap": "round"}, s.clk); });
  s.dep = chip(st, "+ 10¢ deposit", "#2a9d8f", {fs: 52});
  s.coin = el("g", {}, st); coinG(s.coin, 100); s.back = c3Lab(st, "10¢ back!", 84, "#ffe14d");
  s.q = tx(st, {x: 0, y: 0, "text-anchor": "middle", "font-size": 72, "font-weight": 700, fill: "#ffe14d", class: "out", "stroke-width": 12}, "What really happens to the can?");
  s.qm = c3Lab(st, "?", 230, "#ffe14d");
  s.run = t => { const a = (w, f) => cue("hook", w, f), t0 = SC.hook.t0, tb = a("bin", .18), tr = a("bring", .22), tw = a("when", .3), td = a("deposit", .58), t2 = a("bring#2", .66), tg = a("get", .76), tq = a("but", .86);
    const k1 = ramp(t, tw - .3, tw + .3), k2 = ramp(t, t2, t2 + 1.1), k3 = ramp(t, tq - .3, tq + .2);
    // the can: big in the middle, then beside the bottle, then into the machine, then back in the middle for the question
    const cx = lerp(lerp(lerp(600, 380, k1), 1010, k2), 600, k3), cy = lerp(lerp(lerp(420, 470, k1), 385, k2), 400, k3), cs = lerp(lerp(lerp(2.3, 1.7, k1), .45, k2), 2.1, k3);
    tf(s.can, `translate(${cx} ${cy}) scale(${cs * Math.max(0, pop(t, t0 - .15))}) rotate(${lerp(0, 90, k2 * (1 - k3)) + Math.sin((t - t0) * 40) * 6 * on(t, t0, t0 + .5, .1)})`); op(s.can, 1 - on(t, t2 + 1, tq - .2, .15));
    op(s.clk, on(t, t0, t0 + .7, .12)); tf(s.clk, `translate(600 420) scale(${.8 + .3 * ramp(t, t0, t0 + .6)})`);
    c3At(s.bin, 190, 720, t, tb - .15, tw - .1, 1.5); c3At(s.binQ, 190, 800, t, tb, tw - .1);
    const mk = ramp(t, tw - .3, tw + .3); tf(s.rvm, `translate(${lerp(1010, 1010, mk)} ${lerp(790, 820, mk)}) scale(${Math.max(0, pop(t, tr - .15)) * lerp(.95, 1.02, mk)})`); op(s.rvm, ramp(t, tr - .2, tr) * (1 - ramp(t, tq - .3, tq)));
    c3At(s.rvmQ, 1010, 215, t, tr, tw - .1); s.m.scr.textContent = t > tg - .1 && t < tq ? "✓ 10¢ back" : "RETURN";
    const bx = lerp(640, 1010, k2), by = lerp(455, 385, k2), bs = lerp(1.5, .4, k2); tf(s.bot, `translate(${bx} ${by}) scale(${bs * Math.max(0, pop(t, a("bottled", .4) - .2))}) rotate(${90 * k2})`); op(s.bot, ramp(t, a("bottled", .4) - .25, a("bottled", .4)) * (1 - ramp(t, t2 + .9, t2 + 1.1)));
    c3At(s.dep, 500, 150, t, td - .1, t2 + .2);
    const ck = ramp(t, tg, tg + .6); tf(s.coin, `translate(${lerp(1010, 480, ck)} ${lerp(385, 420, ck) - Math.sin(ck * Math.PI) * 150}) scale(${lerp(.3, 1.5, ck) * Math.max(0, pop(t, tg - .05, .3))}) rotate(${(1 - ck) * -300})`); op(s.coin, on(t, tg - .05, tq - .1, .2));
    c3At(s.back, 480, 660, t, tg + .45, tq - .1);
    c3At(s.q, 600, 800, t, tq + .1); tf(s.qm, `translate(880 440) scale(${Math.max(0, pop(t, tq + .35)) * (1 + .05 * Math.sin(t * 5))}) rotate(12)`); op(s.qm, ramp(t, tq + .3, tq + .45)); }; return s; })();

// ---- LAST TIME'S ANSWER: could solar panels on every rooftop power all of Singapore? Not on their own: rooftops are too small for all we use,
// and panels make nothing at night and less on cloudy days. So Singapore also looks at power from neighbours, and even nuclear. (EP02's rooftops, and the night)
S.answer = (() => { const s = scene("answer", "#3a0ca3", "#4361ee"), st = s.stage, PX = 40, PY = 190, PW = 1120, PH = 470;
  s.top = chip(st, "✅ Last time's answer", "#06d6a0", {fs: 44});
  s.q = tx(st, {x: 600, y: 150, "text-anchor": "middle", "font-size": 46, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 9}, "Could rooftop solar panels power all of Singapore?");
  const cp = el("clipPath", {id: "c3ans"}, c3Defs()); el("rect", {x: PX, y: PY, width: PW, height: PH, rx: 36}, cp);
  s.pan = el("g", {"clip-path": "url(#c3ans)"}, st);
  el("rect", {x: PX, y: PY, width: PW, height: PH, fill: c3GradL([[0, "#48cae4"], [1, "#caf0f8"]])}, s.pan);
  s.night = el("rect", {x: PX, y: PY, width: PW, height: PH, fill: c3GradL([[0, "#0b1030"], [1, "#2b2d6e"]]), opacity: 0}, s.pan);
  s.grey = el("rect", {x: PX, y: PY, width: PW, height: PH, fill: "#9aa5b1", opacity: 0}, s.pan);
  s.stars = el("g", {}, s.pan); seed = 31; for (let i = 0; i < 26; i++) el("circle", {cx: PX + rnd() * PW, cy: PY + rnd() * 220, r: 2 + rnd() * 2.5, fill: "#fff"}, s.stars);
  s.sun = el("g", {}, s.pan); c3Glow(s.sun, "#fff3b0", 190, .9, .2); el("circle", {r: 62, fill: "#ffe14d", stroke: "#ffb703", "stroke-width": 7}, s.sun);
  s.moon = el("g", {}, s.pan); el("circle", {r: 50, fill: "#fff3c4"}, s.moon); el("circle", {cx: -20, cy: -12, r: 44, fill: "#141a48"}, s.moon);
  s.beams = el("g", {}, s.pan);
  s.flats = [[70, 300, "#f4a261"], [280, 240, "#e76f51"], [490, 340, "#2a9d8f"], [700, 270, "#e9c46a"], [910, 310, "#f4a261"]].map(([x, h, c]) => c3Hdb(s.pan, x, PY + PH, 190, h, c));
  s.flats.forEach(f => { const r = f.pan[0], x0 = +r.getAttribute("x"), y0 = +r.getAttribute("y"); f.beam = el("path", {d: `M${x0} ${y0} h180 L${x0 + 260} ${PY - 20} h-340 Z`, fill: "#fff3b0", opacity: .0}, s.beams); });
  s.cloud = el("g", {}, s.pan); [[0, 0, 120], [120, 20, 100], [-130, 24, 96], [40, -50, 90], [230, 40, 70], [-230, 44, 66]].forEach(([x, y, r]) => el("circle", {cx: x, cy: y, r, fill: "#e9ecef", stroke: INK, "stroke-width": 6}, s.cloud)); [[0, 0, 114], [120, 20, 94], [-130, 24, 90], [40, -50, 84], [230, 40, 64], [-230, 44, 60]].forEach(([x, y, r]) => el("circle", {cx: x, cy: y, r, fill: "#e9ecef"}, s.cloud));
  el("rect", {x: PX, y: PY, width: PW, height: PH, rx: 36, fill: "none", stroke: INK, "stroke-width": 8}, st);
  s.not = el("g", {}, st); el("rect", {x: -300, y: -62, width: 600, height: 124, rx: 26, fill: "#e63946", stroke: INK, "stroke-width": 8, filter: "url(#sh)"}, s.not); tx(s.not, {x: 0, y: 24, "text-anchor": "middle", "font-size": 70, "font-weight": 700, fill: "#fff"}, "Not on their own!");
  s.c1 = chip(st, "🏠 Rooftops are too small for all we use", "#f77f00", {fs: 46});
  s.c2 = chip(st, "🌙 night: no power", "#1d3557", {fs: 44}); s.c3 = chip(st, "☁️ cloudy: less power", "#6c757d", {fs: 44});
  s.c4 = tx(st, {x: 600, y: 742, "text-anchor": "middle", "font-size": 46, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 9}, "So Singapore is also looking at…");
  s.c5 = chip(st, "🔌 power from our neighbours", "#2a9d8f", {fs: 42}); s.c6 = chip(st, "⚛️ even nuclear", "#7209b7", {fs: 42});
  s.run = t => { const a = (w, f) => cue("answer", w, f), t0 = SC.answer.t0, tp = a("panels", .15), tn = a("not", .32), ts = a("small", .45), tng = a("nothing", .62), tc = a("less", .69), tw = a("that's", .78);
    popAt(s.top, 600, 40, t, t0 - .2); op(s.q, ramp(t, a("could", .1) - .1, a("could", .1) + .3));
    const ng = on(t, tng - .1, tc - .1, .5), cl = ramp(t, tc - .15, tc + .5), day = (1 - ng), pw = day * (1 - .6 * cl) * ramp(t, tp, tp + .6);
    op(s.night, ng); op(s.stars, ng); op(s.grey, cl * .55 * (1 - ng));
    tf(s.sun, `translate(${PX + 190} ${PY + 110 + 420 * ng})`); tf(s.moon, `translate(${PX + 940} ${PY + 100 + 400 * (1 - ng)})`);
    tf(s.cloud, `translate(${lerp(-340, PX + 250, cl)} ${PY + 110}) scale(1.1)`);
    s.flats.forEach((f, i) => { op(f.roof, ramp(t, tp + i * .12, tp + i * .12 + .3)); f.pan.forEach(r => set(r, "fill", mix("#0b132b", "#3a86ff", pw))); op(f.beam, .32 * pw * ramp(t, tp + .5, tp + 1));
      f.win.forEach((wn, j) => set(wn, "fill", ng > .5 && (j * 7 + i * 3) % 5 < 3 ? "#ffd166" : mix("#fdf0d5", "#3d4470", ng))); });
    const nk = Math.max(0, pop(t, tn - .05, .35)); tf(s.not, `translate(600 330) rotate(-5) scale(${nk})`); op(s.not, on(t, tn - .05, tng - .2, .2));
    c3At(s.c1, 600, 728, t, ts - .2, tw - .1); c3At(s.c2, 300, 826, t, tng + .3, tw - .1); c3At(s.c3, 850, 826, t, tc + .3, tw - .1);
    op(s.c4, ramp(t, tw, tw + .3)); c3At(s.c5, 400, 830, t, a("neighbours", .9) - .2); c3At(s.c6, 960, 830, t, a("nuclear", .97) - .15); }; return s; })();

// ---- NEWS: 1 April 2026, the Beverage Container Return Scheme. Plastic bottles and metal cans carry a 10¢ deposit; around 1,000 return machines; the machine pays the 10¢ back
S.news = (() => { const s = scene("news", "#0b6e63", "#0a3d62"), st = s.stage;
  s.top = chip(st, "📰 THE NEWS", "#e63946", {fs: 44});
  s.cal = el("g", {}, st); el("rect", A3({x: -130, y: -130, width: 260, height: 270, rx: 26, fill: "#fff", "stroke-width": 8, filter: "url(#sh)"}), s.cal); el("path", {d: "M-126 -70 V-104 Q-126 -126 -104 -126 H104 Q126 -126 126 -104 V-70 Z", fill: "#e63946"}, s.cal); el("line", {x1: -130, y1: -70, x2: 130, y2: -70, stroke: INK, "stroke-width": 6}, s.cal);
  tx(s.cal, {x: 0, y: -84, "text-anchor": "middle", "font-size": 40, "font-weight": 700, fill: "#fff", "letter-spacing": 3}, "APRIL"); tx(s.cal, {x: 0, y: 64, "text-anchor": "middle", "font-size": 150, "font-weight": 700, fill: INK}, "1"); tx(s.cal, {x: 0, y: 118, "text-anchor": "middle", "font-size": 40, "font-weight": 700, fill: "#6c757d"}, "2026");
  s.title = el("g", {}, st); tx(s.title, {x: 0, y: 0, "text-anchor": "middle", "font-size": 76, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 12}, "Beverage Container"); tx(s.title, {x: 0, y: 92, "text-anchor": "middle", "font-size": 76, "font-weight": 700, fill: "#ffe14d", class: "out", "stroke-width": 12}, "Return Scheme");
  // B: what carries the deposit
  s.B = el("g", {}, st); s.bot = el("g", {}, s.B); bottleG(s.bot); s.can = el("g", {}, s.B); canG(s.can, HERO, {mark: true});
  s.l1 = c3Lab(s.B, "plastic bottle", 44); s.l2 = c3Lab(s.B, "metal can", 44);
  s.mk = el("g", {}, s.B); dmark(s.mk, 100); s.mkL = c3Lab(s.B, "Deposit Mark", 50, "#ffe14d");
  s.ln = [el("line", {stroke: "#ffe14d", "stroke-width": 7, "stroke-dasharray": "4 14", "stroke-linecap": "round"}, s.B), el("line", {stroke: "#ffe14d", "stroke-width": 7, "stroke-dasharray": "4 14", "stroke-linecap": "round"}, s.B)];
  // C: around 1,000 machines (50 little machines, each standing for 20)
  s.C = el("g", {}, st); s.minis = []; for (let i = 0; i < 50; i++) { const g = el("g", {}, s.C); el("rect", {x: -24, y: -44, width: 48, height: 88, rx: 8, fill: "#2a9d8f", stroke: INK, "stroke-width": 4}, g); el("rect", {x: -16, y: -36, width: 32, height: 16, rx: 3, fill: "#fff"}, g); el("circle", {cx: 0, cy: 4, r: 12, fill: "#0b1d24", stroke: "#e9eef1", "stroke-width": 4}, g); g.x = 105 + (i % 10) * 110; g.y = 300 + Math.floor(i / 10) * 112; s.minis.push(g); }
  s.n1 = tx(s.C, {x: 600, y: 170, "text-anchor": "middle", "font-size": 76, "font-weight": 700, fill: "#ffe14d", class: "out", "stroke-width": 12}, "around 1,000 return machines");
  s.key = el("g", {transform: "translate(600 846)"}, s.C); el("rect", {x: -316, y: -34, width: 28, height: 52, rx: 5, fill: "#2a9d8f", stroke: INK, "stroke-width": 3}, s.key); tx(s.key, {x: 20, y: 6, "text-anchor": "middle", "font-size": 36, "font-weight": 700, fill: "#fff"}, "= 20 machines, all across Singapore");
  // D: the machine pays back
  s.D = el("g", {}, st); s.rv = el("g", {}, s.D); s.m = rvmG(s.rv); s.dcan = el("g", {}, s.D); canG(s.dcan, HERO, {mark: true}); s.coin = el("g", {}, s.D); coinG(s.coin, 100); s.back = c3Lab(s.D, "10¢ back!", 90, "#ffe14d");
  s.run = t => { const a = (w, f) => cue("news", w, f), t0 = SC.news.t0, td = a("first", .08), tt = a("beverage", .2), tB = a("drinks", .33), tC = a("there", .6), tD = a("put", .82);
    popAt(s.top, 600, 40, t, t0 - .2);
    const up = ramp(t, tB - .5, tB), calS = lerp(1.15, .42, up); tf(s.cal, `translate(${lerp(600, 110, up)} ${lerp(330, 150, up)}) scale(${calS * Math.max(0, pop(t, td - .15))}) rotate(${lerp(-4, 0, up)})`); op(s.cal, ramp(t, td - .2, td) * (1 - ramp(t, tC - .3, tC)));
    tf(s.title, `translate(${lerp(600, 680, up)} ${lerp(640, 130, up)}) scale(${lerp(1, .62, up) * Math.max(0, pop(t, tt - .1))})`); op(s.title, ramp(t, tt - .15, tt) * (1 - ramp(t, tC - .3, tC)));
    op(s.B, on(t, tB - .1, tC - .1, .3)); c3At(s.bot, 230, 500, t, a("plastic", .37) - .2, 1e9, 1.5); c3At(s.l1, 230, 280, t, a("plastic", .37)); c3At(s.can, 540, 525, t, a("metal", .42) - .2, 1e9, 1.5); c3At(s.l2, 540, 280, t, a("metal", .42));
    const tm = a("ten-cent", .5) - .1; c3At(s.mk, 900, 450, t, tm, 1e9, 1 + .05 * Math.sin(t * 6) * on(t, tm, tm + 1.5, .2)); c3At(s.mkL, 900, 620, t, tm + .25);
    [[230 + 33, 500 + 132], [540 + 39, 525 + 81]].forEach(([x, y], i) => { const l = s.ln[i]; set(l, "x1", x + 26); set(l, "y1", y - 8); set(l, "x2", 812); set(l, "y2", lerp(y, 450, .75)); op(l, ramp(t, tm + .2 + i * .15, tm + .5 + i * .15)); });
    op(s.C, on(t, tC - .1, tD - .1, .3)); const tk = a("thousand", .66); tf(s.n1, `translate(600 170) scale(${Math.max(0, pop(t, tk - .1))}) translate(-600 -170)`);
    s.minis.forEach((g, i) => { const ti = tC + .1 + i * .05; tf(g, `translate(${g.x} ${g.y}) scale(${1.15 * Math.max(0, pop(t, ti, .3))})`); }); op(s.key, ramp(t, a("across", .74), a("across", .74) + .3));
    op(s.D, ramp(t, tD - .1, tD + .2)); tf(s.rv, `translate(820 850) scale(${1.25 * Math.max(0, pop(t, tD - .1))})`);
    const tcn = a("can", .86), kin = ramp(t, tcn, tcn + .8), tp = a("pays", .93); tf(s.dcan, `translate(${lerp(330, 820, kin)} ${lerp(600, 581, kin)}) scale(${lerp(1.5, .5, kin)}) rotate(${90 * ramp(t, tcn - .5, tcn)})`); op(s.dcan, ramp(t, tD + .1, tD + .3) * (1 - ramp(t, tcn + .7, tcn + .85)));
    s.m.scr.textContent = t > tcn + .85 ? "✓ 10¢ back" : "RETURN";
    const ck = ramp(t, tp, tp + .6); tf(s.coin, `translate(${lerp(820, 330, ck)} ${lerp(581, 480, ck) - Math.sin(ck * Math.PI) * 140}) scale(${lerp(.3, 1.5, ck)}) rotate(${(1 - ck) * -300})`); op(s.coin, ramp(t, tp - .05, tp + .1));
    c3At(s.back, 330, 730, t, tp + .5); }; return s; })();

// ---- RECAP: the journey in eight steps; each lights up as Heart names it. One kind of label per row: what happened to you
function c3Recap(name, words) { const s = scene(name, "#fff3b0", "#ffd6a5"), st = s.stage;
  s.head = tx(st, {x: 600, y: 122, "text-anchor": "middle", "font-size": 60, "font-weight": 700, fill: INK}, "Your journey as a drink can");
  s.me = el("g", {}, st); canG(s.me, HERO, {face: true});
  const icon = [g => tf(rvmG(g), "translate(0 62) scale(.27)"),
    g => emo(g, 0, -18, 104, "🚚"),
    g => { el("path", A3({d: "M-52 -76 H-22 V-34 A22 22 0 0 0 22 -34 V-76 H52 V-34 A52 52 0 0 1 -52 -34 Z", fill: "#e63946", "stroke-width": 5}), g); el("rect", A3({x: -52, y: -76, width: 30, height: 18, fill: "#dee2e6", "stroke-width": 4}), g); el("rect", A3({x: 22, y: -76, width: 30, height: 18, fill: "#dee2e6", "stroke-width": 4}), g); tf(tinG(g), "translate(-36 32) scale(.36) rotate(-10)"); tf(canG(g, "#3a86ff", {sw: 10}), "translate(44 40) scale(.3)"); g.flip = 1; },
    g => { seed = 71; const cs = ["#e63946", "#3a86ff", "#06d6a0", "#ffbe0b", "#cfd8dc", "#f77f00"]; for (let r = 0; r < 5; r++) for (let c = 0; c < 6; c++) el("rect", {x: -66 + c * 22, y: -78 + r * 24, width: 22, height: 24, fill: cs[Math.floor(rnd() * 6)], stroke: INK, "stroke-width": 2.5}, g); el("rect", A3({x: -66, y: -78, width: 132, height: 120, fill: "none", "stroke-width": 5}), g); [-24, 24].forEach(x => el("line", {x1: x, y1: -78, x2: x, y2: 42, stroke: INK, "stroke-width": 6}, g)); },
    g => { c3Glow(g, "#ff9e00", 90, .8, .3); el("path", A3({d: "M-64 34 Q-64 -10 -40 -10 H40 Q64 -10 64 34 Q64 50 48 50 H-48 Q-64 50 -64 34 Z", fill: "#6c757d", "stroke-width": 5}), g); el("ellipse", {cx: 0, cy: -8, rx: 52, ry: 13, fill: "#ffb703", stroke: INK, "stroke-width": 4}, g); el("ellipse", {cx: -8, cy: -10, rx: 26, ry: 5, fill: "#fff3b0"}, g); emo(g, 0, -62, 54, "🔥"); },
    g => { el("rect", {x: -84, y: -24, width: 84, height: 22, fill: "#cfd8dc", stroke: INK, "stroke-width": 4}, g); el("rect", {x: 0, y: -17, width: 84, height: 8, fill: "#cfd8dc", stroke: INK, "stroke-width": 3}, g); [-48, 22].forEach(y => { el("circle", A3({cx: 0, cy: y, r: 32, fill: "#8d99ae", "stroke-width": 5}), g); el("circle", {cx: 0, cy: y, r: 7, fill: INK}, g); }); },
    g => { el("rect", A3({x: -22, y: -84, width: 44, height: 70, rx: 6, fill: "#8d99ae", "stroke-width": 5}), g); el("path", A3({d: "M-40 -22 V42 H40 V-22", fill: "none", stroke: "#cfd8dc", "stroke-width": 9}), g); el("path", {d: "M-46 -22 V48 H46 V-22 M-34 -22 V36 H34 V-22", fill: "none", stroke: INK, "stroke-width": 3.5, "stroke-linejoin": "round"}, g); el("path", {d: "M0 -110 V-90 M-10 -100 L0 -88 L10 -100", stroke: INK, "stroke-width": 6, fill: "none", "stroke-linecap": "round"}, g); },
    g => { tf(canG(g, "#3a86ff", {face: true, sw: 9}), "translate(0 -16) scale(.62)"); emo(g, 58, -72, 44, "✨"); }];
  const ST = ["scanned: 10¢ back", "collected by truck", "magnet takes the steel", "squashed into a block", "melted", "rolled thin", "pressed into shape", "a brand-new can!"];
  s.cards = ST.map((lab, i) => { const g = el("g", {}, st), x = 150 + (i % 4) * 300, y = i < 4 ? 320 : 670;
    g.bx = el("rect", {x: -128, y: -140, width: 256, height: 280, rx: 30, fill: i === 7 ? "#fff8d6" : "#fff", stroke: INK, "stroke-width": 6, filter: "url(#sh)"}, g); icon[i](el("g", {}, g));
    tx(g, {x: 0, y: 108, "text-anchor": "middle", "font-size": 31, "font-weight": 700, fill: INK, "data-fit": 236}, lab);
    el("circle", {cx: -96, cy: -108, r: 24, fill: "#7209b7"}, g); tx(g, {x: -96, y: -97, "text-anchor": "middle", "font-size": 30, "font-weight": 700, fill: "#fff"}, String(i + 1)); g.x = x; g.y = y; return g; });
  s.arrows = ST.slice(0, 7).map((_, i) => { const a = el("path", {d: "M-14 -14 L12 0 L-14 14 Z", fill: INK}, st); if (i === 3) tf(a, "translate(1050 495) rotate(90)"); else tf(a, `translate(${150 + (i % 4) * 300 + 150} ${i < 4 ? 320 : 670})`); return a; });
  s.run = t => { const ty = cue(name, "you#2", .1); tf(s.me, `translate(1085 100) scale(${.5 * Math.max(0, pop(t, ty - .1))}) rotate(8)`);
    s.cards.forEach((g, i) => { const tw = cue(name, words[i], (i + 1.5) / 9.5), done = t >= tw - .1, now = on(t, tw - .1, tw + 1.5, .2);
      tf(g, `translate(${g.x} ${g.y}) scale(${1 + .13 * now})`); op(g, done ? 1 : .28); set(g.bx, "stroke", now > .5 ? "#f72585" : INK); set(g.bx, "stroke-width", 6 + 5 * now); if (i < 7) op(s.arrows[i], t >= cue(name, words[i + 1], (i + 2.5) / 9.5) - .1 ? 1 : .25); }); }; return s; }
S.recap = c3Recap("recap", ["scanned", "truck", "magnet", "squashed", "melted", "rolled", "pressed", "brand-new"]);

// ---- TEXTBOOK (P3 materials): a drink can is made of aluminium, a metal; metals can be melted and shaped again and again; magnets attract steel but not aluminium
function c3Magnet(p) { const g = el("g", {}, p); el("path", A3({d: "M-150 -170 H-60 V-10 A60 60 0 0 0 60 -10 V-170 H150 V-10 A150 150 0 0 1 -150 -10 Z", fill: "#e63946", "stroke-width": 8}), g);
  [[-150, "N"], [60, "S"]].forEach(([x, l]) => { el("rect", A3({x, y: -170, width: 90, height: 64, fill: "#e9ecef", "stroke-width": 8}), g); tx(g, {x: x + 45, y: -122, "text-anchor": "middle", "font-size": 46, "font-weight": 700, fill: INK}, l); }); return g; }
S.textbook = (() => { const s = scene("textbook", "#fdf0d5", "#ffd6a5"), st = s.stage;
  s.head = el("g", {}, st); el("rect", {x: -400, y: -48, width: 800, height: 96, rx: 30, fill: "#3a0ca3", stroke: INK, "stroke-width": 7, filter: "url(#sh)"}, s.head); tx(s.head, {x: 0, y: 18, "text-anchor": "middle", "font-size": 50, "font-weight": 700, fill: "#fff"}, "📘 Primary 3 Science · Materials");
  // A + B: the can, and the "again and again" loop
  s.AB = el("g", {}, st); s.can = el("g", {}, s.AB); canG(s.can, HERO, {mark: true});
  s.n1 = tx(s.AB, {x: 250, y: 0, "text-anchor": "middle", "font-size": 46, "font-weight": 700, fill: INK}, "drink can"); s.n2 = tx(s.AB, {x: 250, y: 0, "text-anchor": "middle", "font-size": 46, "font-weight": 700, fill: "#6c757d"}, "aluminium: a metal");
  s.loop = el("g", {transform: "translate(800 470)"}, s.AB); const LR = 215, node = k => { const an = -Math.PI / 2 + k * 2 * Math.PI / 3; return [Math.cos(an) * LR, Math.sin(an) * LR]; };
  s.arcs = [0, 1, 2].map(k => { const a0 = -90 + k * 120 + 34, a1 = -90 + (k + 1) * 120 - 34, r = Math.PI / 180, g = el("g", {}, s.loop);
    el("path", {d: `M${Math.cos(a0 * r) * LR} ${Math.sin(a0 * r) * LR} A${LR} ${LR} 0 0 1 ${Math.cos(a1 * r) * LR} ${Math.sin(a1 * r) * LR}`, fill: "none", stroke: INK, "stroke-width": 14, "stroke-linecap": "round"}, g);
    el("path", {d: "M-22 -16 L8 0 L-22 16 Z", fill: INK, stroke: INK, "stroke-width": 8, "stroke-linejoin": "round", transform: `translate(${Math.cos(a1 * r) * LR} ${Math.sin(a1 * r) * LR}) rotate(${a1 + 90})`}, g); return g; });
  s.nodes = [0, 1, 2].map(k => { const g = el("g", {}, s.loop), [x, y] = node(k); g.x = x; g.y = y;
    if (k === 0) { tf(canG(g, "#3a86ff", {sw: 8}), "scale(.72)"); g.l = "a can"; }
    if (k === 1) { c3Glow(g, "#ff9e00", 110, .8, .3); el("path", A3({d: "M-70 20 Q-70 -24 -44 -24 H44 Q70 -24 70 20 Q70 44 50 44 H-50 Q-70 44 -70 20 Z", fill: "#6c757d"}), g); el("ellipse", {cx: 0, cy: -22, rx: 56, ry: 15, fill: "#ffb703", stroke: INK, "stroke-width": 5}, g); el("ellipse", {cx: -10, cy: -24, rx: 28, ry: 6, fill: "#fff3b0"}, g); g.l = "melted"; }
    if (k === 2) { el("path", A3({d: "M-80 14 L-50 -22 H80 L50 14 Z", fill: "#dfe6ea"}), g); el("path", A3({d: "M-80 14 H50 V26 H-80 Z", fill: "#aab4bc", "stroke-width": 5}), g); el("path", A3({d: "M50 14 L80 -22 V-10 L50 26 Z", fill: "#8d99ae", "stroke-width": 5}), g); g.l = "shaped"; }
    tx(g, {x: 0, y: k === 0 ? 106 : 92, "text-anchor": "middle", "font-size": 40, "font-weight": 700, fill: INK}, g.l); return g; });
  s.again = chip(s.AB, "again and again!", "#f77f00", {fs: 44});
  // C: the magnet test. One kind of label per row: the thing's name above, the science word below
  s.C = el("g", {}, st); s.mag = el("g", {}, s.C); c3Magnet(s.mag);
  s.pull = el("g", {}, s.C); [-36, 0, 36].forEach(x => el("path", {d: `M${x} 0 V60`, stroke: "#e63946", "stroke-width": 9, "stroke-linecap": "round", "stroke-dasharray": "2 20"}, s.pull));
  s.tin = el("g", {}, s.C); tinG(s.tin); s.al = el("g", {}, s.C); canG(s.al, HERO, {mark: true});
  s.tn = tx(s.C, {x: 330, y: 700, "text-anchor": "middle", "font-size": 46, "font-weight": 700, fill: INK}, "steel can (mostly iron)"); s.ts = chip(s.C, "magnetic ✓", "#06d6a0", {fs: 38, ink: INK});
  s.an = tx(s.C, {x: 870, y: 700, "text-anchor": "middle", "font-size": 46, "font-weight": 700, fill: INK}, "aluminium can"); s.as = chip(s.C, "non-magnetic ✗", "#e63946", {fs: 38});
  
  s.home = chip(st, "🏠 Try it at home with a fridge magnet!", "#f77f00", {fs: 44});
  s.run = t => { const a = (w, f) => cue("textbook", w, f), t0 = SC.textbook.t0, tc = a("a", .3), tal = a("aluminium", .42), tm = a("metals", .5), tg = a("magnets", .7), tst = a("steel", .76), tno = a("not", .81), th = a("that's", .9);
    tf(s.head, `translate(720 100) scale(${Math.max(0, pop(t, a("primary", .1) - .2))})`);
    op(s.AB, on(t, tc - .2, tg - .15, .3)); const mv = ramp(t, tm - .5, tm);
    tf(s.can, `translate(${lerp(600, 250, mv)} ${lerp(400, 420, mv)}) scale(${lerp(2.0, 1.7, mv) * Math.max(0, pop(t, tc - .15))})`);
    set(s.n1, "x", lerp(600, 250, mv)); set(s.n2, "x", lerp(600, 250, mv)); set(s.n1, "y", lerp(650, 640, mv)); set(s.n2, "y", lerp(700, 690, mv)); op(s.n1, ramp(t, tc, tc + .3)); op(s.n2, ramp(t, tal - .1, tal + .2));
    op(s.loop, ramp(t, tm - .2, tm + .1)); const tk = [tm, a("melted", .55), a("shaped", .6)];
    s.nodes.forEach((g, k) => { const hl = on(t, tk[k] - .05, tk[k] + .9, .2); tf(g, `translate(${g.x} ${g.y}) scale(${Math.max(0, pop(t, tk[k] - .2)) * (1 + .12 * hl)})`); });
    const tag = a("again", .63), cyc = Math.max(0, t - tag) * 1.6; s.arcs.forEach((g, k) => { op(g, t < tag ? ramp(t, tk[Math.min(2, k + 1)] - .3, tk[Math.min(2, k + 1)]) * (k === 2 ? ramp(t, tag - .2, tag) : 1) : .45 + .55 * (Math.floor(cyc) % 3 === k ? 1 : 0)); });
    c3At(s.again, 0, 0, t, tag - .05); tf(s.again, `translate(800 455) scale(${Math.max(0, pop(t, tag - .05))})`);
    op(s.C, ramp(t, tg - .1, tg + .2)); tf(s.mag, `translate(600 340) scale(${.95 * Math.max(0, pop(t, tg - .1))})`);
    const j = ramp(t, tst, tst + .22), jj = j * j; tf(s.tin, `translate(${lerp(330, 500, jj)} ${lerp(500, 402, jj)}) scale(${Math.max(0, pop(t, tg + .2)) * 1.05}) rotate(${-8 * jj + (j >= 1 ? 0 : 0)})`);
    op(s.pull, on(t, tg + .5, tst + .2, .15) * (.5 + .5 * Math.sin(t * 16))); tf(s.pull, `translate(480 430) rotate(40)`);
    const wob = on(t, tno, tno + .7, .15) * Math.sin((t - tno) * 26) * 3; tf(s.al, `translate(870 470) scale(${Math.max(0, pop(t, tg + .35)) * 1.1}) rotate(${wob})`);
    op(s.tn, ramp(t, tst - .2, tst)); c3At(s.ts, 330, 692, t, tst + .2, 1e9, 1); op(s.an, ramp(t, tno - .4, tno - .2)); c3At(s.as, 870, 692, t, tno + .1);
    set(s.tn, "y", 640); set(s.an, "y", 640);
    c3At(s.home, 600, 800, t, th + .2); }; return s; })();

// ---- WHY IT MATTERS: a can from recycled aluminium needs much less energy than one from new metal dug out of the ground (no number is given; the bars are about 1 to 20)
S.matters = (() => { const s = scene("matters", "#d8f3dc", "#95d5b2"), st = s.stage, BX = 760, BL = 400;
  s.head = tx(st, {x: 600, y: 84, "text-anchor": "middle", "font-size": 66, "font-weight": 700, fill: INK}, "Why it matters");
  const row = (y, col, title) => { const g = el("g", {}, st); el("rect", {x: 30, y: y - 150, width: 1140, height: 300, rx: 34, fill: "#fff", stroke: INK, "stroke-width": 7, filter: "url(#sh)"}, g);
    el("rect", {x: 30, y: y - 150, width: 1140, height: 62, rx: 30, fill: col}, g); el("rect", {x: 30, y: y - 120, width: 1140, height: 32, fill: col}, g); el("line", {x1: 30, y1: y - 88, x2: 1170, y2: y - 88, stroke: INK, "stroke-width": 6}, g); el("rect", {x: 30, y: y - 150, width: 1140, height: 300, rx: 34, fill: "none", stroke: INK, "stroke-width": 7}, g);
    tx(g, {x: 64, y: y - 104, "font-size": 40, "font-weight": 700, fill: "#fff"}, title);
    g.ar = [0, 1].map(k => tf(c3Arrow(g, 70), `translate(${250 + k * 210} ${y + 30})`) || g.lastChild);
    tx(g, {x: BX, y: y - 30, "font-size": 34, "font-weight": 700, fill: INK}, "energy needed"); el("rect", {x: BX, y: y - 6, width: BL, height: 56, rx: 12, fill: "#e9ecef", stroke: INK, "stroke-width": 5}, g);
    g.bar = el("rect", {x: BX, y: y - 6, width: 0, height: 56, rx: 10, fill: "#f77f00", stroke: INK, "stroke-width": 5}, g); g.y = y; return g; };
  // recycled row
  s.R = row(275, "#2a9d8f", "♻️ A can from RECYCLED aluminium"); const R = s.R;
  R.a = el("g", {}, R); [[-34, 14, -16, "#e63946"], [8, 22, 10, "#3a86ff"], [44, 26, 24, "#ffbe0b"]].forEach(([x, y, r, c]) => tf(canG(R.a, c, {sw: 10, dent: true}), `translate(${x} ${y}) rotate(${r}) scale(.5)`));
  R.b = el("g", {}, R); c3Glow(R.b, "#ff9e00", 110, .7, .3); el("path", A3({d: "M-70 30 Q-70 -14 -44 -14 H44 Q70 -14 70 30 Q70 54 50 54 H-50 Q-70 54 -70 30 Z", fill: "#6c757d"}), R.b); el("ellipse", {cx: 0, cy: -12, rx: 56, ry: 15, fill: "#ffb703", stroke: INK, "stroke-width": 5}, R.b); emo(R.b, 0, -62, 50, "🔥");
  R.c = el("g", {}, R); tf(canG(R.c, "#3a86ff", {sw: 8}), "scale(.75)"); R.less = chip(R, "much less energy!", "#06d6a0", {fs: 36, ink: INK});
  // new-metal row
  s.N = row(585, "#9c6644", "⛏️ A can from NEW metal, dug out of the ground"); const N = s.N;
  N.a = el("g", {}, N); el("path", A3({d: "M-96 62 L-70 -6 L-40 22 L-10 -30 L24 10 L50 -12 L96 62 Z", fill: "#b5651d"}), N.a); el("path", {d: "M-40 62 L-22 30 H26 L44 62 Z", fill: "#7f4f24", stroke: INK, "stroke-width": 5, "stroke-linejoin": "round"}, N.a);
  N.dig = el("g", {}, N.a); emo(N.dig, 0, 0, 62, "⛏️"); seed = 9; [[-60, 40], [66, 44], [0, 52]].forEach(([x, y], i) => tf(blob(N.a, 15, "#c1440e", 40 + i), `translate(${x} ${y})`));
  N.b = el("g", {}, N); emo(N.b, 0, 12, 120, "🏭"); N.c = el("g", {}, N); tf(canG(N.c, "#3a86ff", {sw: 8}), "scale(.75)"); N.more = chip(N, "lots of energy", "#f77f00", {fs: 36});
  s.run = t => { const a = (w, f) => cue("matters", w, f), t0 = SC.matters.t0, tr = a("recycled", .3), tl = a("much", .55), tn = a("new", .8), tdg = a("dug", .88);
    op(s.head, ramp(t, t0, t0 + .3));
    [[R, tr - .5, 275], [N, tn - .5, 585]].forEach(([g, tt, y]) => { tf(g, `translate(${-40 * (1 - ramp(t, tt, tt + .35))} 0)`); op(g, ramp(t, tt, tt + .3));
      [g.a, g.b, g.c].forEach((e, k) => tf(e, `translate(${150 + k * 210} ${y + 30}) scale(${Math.max(0, pop(t, tt + .25 + k * .3))})`)); g.ar.forEach((e, k) => op(e, ramp(t, tt + .45 + k * .3, tt + .6 + k * .3))); });
    set(R.bar, "width", BL / 20 * ramp(t, tl, tl + .4)); c3At(R.less, BX + 190, 275 + 96, t, tl + .2);
    set(N.bar, "width", BL * ramp(t, tdg, tdg + 1.2)); c3At(N.more, BX + 190, 585 + 96, t, tdg + 1.0);
    tf(N.dig, `translate(6 -44) rotate(${-20 + 40 * Math.abs(Math.sin((t - tdg) * 6)) * on(t, tdg - .2, tdg + 1.6, .2)})`); }; return s; })();

// ---- TRY THIS: find the Deposit Mark; empty the can and keep it whole; glass bottles and drink cartons go in the blue recycling bin, not the machine
S.try = (() => { const s = scene("try", "#caffbf", "#9bf6ff"), st = s.stage;
  s.title = tx(st, {x: 640, y: 116, "text-anchor": "middle", "font-size": 66, "font-weight": 700, fill: INK}, "🏠 Try this at home!");
  const panel = (x, n) => { const g = el("g", {}, st); el("rect", {x: -185, y: -260, width: 370, height: 560, rx: 34, fill: "#fff", stroke: INK, "stroke-width": 7, filter: "url(#sh)"}, g);
    el("circle", {cx: -140, cy: -216, r: 32, fill: "#7209b7", stroke: INK, "stroke-width": 5}, g); tx(g, {x: -140, y: -201, "text-anchor": "middle", "font-size": 42, "font-weight": 700, fill: "#fff"}, String(n)); g.x = x; return g; };
  const cap = (g, l1, l2) => { tx(g, {x: 0, y: 222, "text-anchor": "middle", "font-size": 31, "font-weight": 700, fill: INK, "data-fit": 340}, l1); tx(g, {x: 0, y: 262, "text-anchor": "middle", "font-size": 31, "font-weight": 700, fill: INK, "data-fit": 340}, l2); };
  // 1: the mark
  s.p1 = panel(200, 1); const p1 = s.p1; tf(canG(p1, HERO, {mark: true}), "translate(-50 10) scale(1.5)");
  s.lens = el("g", {}, p1); el("line", {x1: 52, y1: 52, x2: 110, y2: 110, stroke: INK, "stroke-width": 26, "stroke-linecap": "round"}, s.lens); el("line", {x1: 56, y1: 56, x2: 108, y2: 108, stroke: "#8d5b3a", "stroke-width": 14, "stroke-linecap": "round"}, s.lens);
  el("circle", {r: 78, fill: "#e9f5ff", stroke: INK, "stroke-width": 9}, s.lens); tf(dmark(s.lens, 58), "translate(0 0)"); cap(p1, "Look for the", "Deposit Mark");
  // 2: empty, whole, to the machine
  s.p2 = panel(600, 2); const p2 = s.p2; s.c2 = el("g", {}, p2); canG(s.c2, HERO, {mark: true}); s.drops = [0, 1, 2].map(i => el("path", {d: "M0 -12 Q10 4 0 10 Q-10 4 0 -12 Z", fill: "#4cc9f0", stroke: INK, "stroke-width": 3}, p2));
  s.sq = el("g", {}, p2); tf(canG(s.sq, HERO, {dent: true, sw: 9}), "scale(.62 .4) rotate(8)"); s.sqx = c3Cross(s.sq, 36, 11); s.ok = c3Tick(p2, 30, 12);
  s.m2 = el("g", {}, p2); tf(rvmG(s.m2), "scale(.42)"); s.ar2 = c3Arrow(p2, 60); cap(p2, "Empty it. Keep it whole.", "Bring it to a return machine");
  // 3: glass and cartons
  s.p3 = panel(1000, 3); const p3 = s.p3; s.gl = el("g", {}, p3); glassG(s.gl); s.ct = el("g", {}, p3); cartonG(s.ct);
  s.m3 = el("g", {}, p3); tf(rvmG(s.m3), "scale(.3)"); s.x3 = c3Cross(s.m3, 50, 14); tf(s.x3, "translate(0 -90)");
  s.bb = el("g", {}, p3); tf(blueBinG(s.bb), "scale(.62)"); s.ok3 = c3Tick(p3, 28, 12); cap(p3, "Glass bottles and cartons:", "the blue bin at your block");
  s.run = t => { const a = (w, f) => cue("try", w, f), t1 = a("look", .12), t2 = a("empty", .3), tw = a("whole", .4), tr = a("return", .48), t3 = a("glass", .58), tcn = a("cartons", .66), tx3 = a("don't", .74), tb = a("blue", .9);
    [[s.p1, t1], [s.p2, t2], [s.p3, t3]].forEach(([g, tt]) => { tf(g, `translate(${g.x} 460) scale(${Math.max(0, pop(t, tt - .25))})`); op(g, ramp(t, tt - .3, tt - .1)); });
    tf(s.lens, `translate(${lerp(90, -11, ramp(t, t1, t1 + .7))} ${lerp(-120, 91, ramp(t, t1, t1 + .7))}) scale(${1 + .05 * Math.sin(t * 5)})`);
    const tip = on(t, t2, tw - .1, .3), set2 = ramp(t, tw - .1, tw + .2); tf(s.c2, `translate(${lerp(-10, -100, set2)} ${lerp(-60, -70, set2)}) scale(${lerp(1.15, .85, set2)}) rotate(${150 * tip})`);
    s.drops.forEach((d, i) => { const k = ((t - t2) * 1.6 + i * .33) % 1; tf(d, `translate(${44 + i * 3} ${lerp(10, 130, k)})`); op(d, tip > .8 ? Math.sin(k * Math.PI) : 0); });
    c3At(s.ok, -100, 40, t, tw); tf(s.sq, `translate(-100 130) scale(${Math.max(0, pop(t, tw + .25))})`); op(s.sq, ramp(t, tw + .2, tw + .35));
    tf(s.ar2, `translate(-36 -60) scale(${Math.max(0, pop(t, tr - .1))})`); op(s.ar2, ramp(t, tr - .15, tr)); tf(s.m2, `translate(104 70) scale(${Math.max(0, pop(t, tr))})`);
    const dn = ramp(t, tb + .25, tb + .9); tf(s.gl, `translate(${lerp(-90, -30, dn)} ${lerp(-110, 40, dn)}) scale(${.72 * Math.max(0, pop(t, t3)) * lerp(1, .5, dn)})`); tf(s.ct, `translate(${lerp(10, -10, dn)} ${lerp(-100, 50, dn)}) scale(${.72 * Math.max(0, pop(t, tcn)) * lerp(1, .5, dn)})`);
    op(s.gl, 1 - ramp(t, tb + .75, tb + .9)); op(s.ct, 1 - ramp(t, tb + .75, tb + .9));
    tf(s.m3, `translate(112 -20) scale(${Math.max(0, pop(t, tx3 - .2))})`); op(s.m3, ramp(t, tx3 - .25, tx3 - .1)); op(s.x3, ramp(t, tx3, tx3 + .15));
    tf(s.bb, `translate(-24 190) scale(${Math.max(0, pop(t, tb - .1))})`); op(s.bb, ramp(t, tb - .15, tb)); c3At(s.ok3, 110, 130, t, tb + .8); }; return s; })();

// ---- THINK ABOUT IT: a can can be recycled again and again. Why is that better than digging up new metal? (answered in Part 2)
S.think = (() => { const s = scene("think", "#3a0ca3", "#7209b7"), st = s.stage;
  s.title = tx(st, {x: 600, y: 100, "text-anchor": "middle", "font-size": 76, "font-weight": 700, fill: "#ffe14d", class: "out", "stroke-width": 10}, "🤔 Think about it!");
  s.L = el("g", {}, st); el("circle", {r: 200, fill: "#fff", stroke: INK, "stroke-width": 8, filter: "url(#sh)"}, s.L); s.spin = el("g", {}, s.L);
  [0, 180].forEach(a => { const g = el("g", {transform: `rotate(${a})`}, s.spin); el("path", {d: "M-150 -40 A155 155 0 0 1 130 -84", fill: "none", stroke: "#2a9d8f", "stroke-width": 24, "stroke-linecap": "round"}, g); el("path", {d: "M108 -128 L160 -62 L84 -52 Z", fill: "#2a9d8f", stroke: "#2a9d8f", "stroke-width": 8, "stroke-linejoin": "round"}, g); });
  tf(canG(s.L, HERO, {mark: true}), "scale(.95)"); s.l1 = c3Lab(st, "recycle: again and again", 44);
  s.R = el("g", {}, st); el("circle", {r: 200, fill: "#fff", stroke: INK, "stroke-width": 8, filter: "url(#sh)"}, s.R); el("path", A3({d: "M-150 96 L-104 6 L-58 50 L-16 -34 L40 30 L84 -6 L150 96 Z", fill: "#b5651d"}), s.R); emo(s.R, 0, -86, 96, "⛏️"); s.l2 = c3Lab(st, "dig up new metal", 44);
  s.vs = c3Lab(st, "?", 220, "#ffe14d");
  s.ans = chip(st, "Answer in Part 2!", "#f72585", {fs: 48});
  s.run = t => { const a = (w, f) => cue("think", w, f), tc = a("can", .18), tw = a("why", .48), td = a("digging", .6);
    popAt(s.title, 0, 0, t, SC.think.t0 - .2);
    tf(s.L, `translate(300 440) scale(${Math.max(0, pop(t, tc - .2))})`); op(s.L, ramp(t, tc - .25, tc - .1)); tf(s.spin, `rotate(${Math.max(0, t - a("recycled", .22)) * 120})`); c3At(s.l1, 300, 720, t, a("again", .3) - .2);
    tf(s.R, `translate(900 440) scale(${Math.max(0, pop(t, td - .2))})`); op(s.R, ramp(t, td - .25, td - .1)); c3At(s.l2, 900, 720, t, td + .1);
    tf(s.vs, `translate(600 520) scale(${Math.max(0, pop(t, tw - .1)) * (1 + .06 * Math.sin(t * 5))})`); op(s.vs, ramp(t, tw - .15, tw));
    popAt(s.ans, 600, 830, t, a("answer", .85)); }; return s; })();

// ---- CLOSE: what to remember, then Part 2's teaser (EP02's S.close, driven by CFG.close)
S.close = (() => { const s = scene("close", "#f15bb5", "#fee440");
  const CL = CFG.close || {}, rows = CL.rows || [];
  s.rows = rows.map(([e, lab, w, f, col], i) => ({c: chip(s.stage, e + "  " + lab, col, {fs: 46}), w, f, y: 170 + i * 190}));
  s.tease = chip(s.stage, CL.tease || "▶ Part 2", "#3a0ca3", {fs: 46});
  s.run = t => { const tn = cue("close", CL.teaseWord || "next", .85);
    s.rows.forEach(r => { const tw = cue("close", r.w, r.f); popAt(r.c, 600, r.y, t, tw); op(r.c, ramp(t, tw - .05, tw + .1) * (1 - .6 * ramp(t, tn - .2, tn + .3))); });
    popAt(s.tease, 600, 800, t, tn); }; return s; })();

// narrated scenes fill more of the frame: everything drawn above sits 10% bigger, clear of the label (top left), the key-word shelf (right) and the captions
["hook", "answer", "news", "recap", "textbook", "matters", "try", "think", "close"].forEach(n => { const s = S[n], g = el("g", {transform: "translate(640 452) scale(1.1) translate(-568 -450)"}); while (s.stage.firstChild) g.appendChild(s.stage.firstChild); s.stage.appendChild(g); });
