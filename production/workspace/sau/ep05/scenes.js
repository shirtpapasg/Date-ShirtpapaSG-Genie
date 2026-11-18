/* TheOneApp, Explored EP05: Where does your energy come from? (photosynthesis, food chains, energy conversion, food security)
   Load after ../common.js and ../geo_map.js; ep05/pov.js (the picture-only shots) loads after this file.
   Part 1 of this file is the drawing kit both files share (the pupil, the school, the hen, the corn plant, the world map...).
   Part 2 is the narrated scenes: hook, answer, news, recap, photo, security, try, think, close.
   Scenes draw in a 1200 x 900 box; times come from cue(scene, word, fallback). Every frame depends only on t.
   The first line is data: the world map, written by ep05/geo_world.py from Natural Earth (rule 9: real coastlines). */
/*WORLD*/ /*WORLD*/

/* =========================================== PART 1: THE DRAWING KIT =========================================== */
const FR5 = name => { const c = SC[name]; return c ? (tt => clamp((tt - c.t0) / Math.max(.1, c.t1 - c.t0))) : (() => 0); };
const U5 = (name, t) => (SC[name] ? t - SC[name].t0 : 0), D5 = name => (SC[name] ? SC[name].t1 - SC[name].t0 : 1);
const defs5 = () => $("v").querySelector("defs");
const OL5 = {stroke: INK, "stroke-width": 6, "stroke-linejoin": "round", "stroke-linecap": "round"};
const A5 = (a, b) => Object.assign({}, OL5, a, b || {});
const sg5 = (u, a, b) => clamp((u - a) / (b - a));
let uid5 = 0;
function grad5(kind, attrs, stops) { const id = "e5g" + (++uid5); const g = el(kind, Object.assign({id}, attrs), defs5());
  stops.forEach(([o, c, a]) => el("stop", {offset: o, "stop-color": c, "stop-opacity": a === undefined ? 1 : a}, g)); return `url(#${id})`; }
function clip5(make) { const id = "e5c" + (++uid5); make(el("clipPath", {id}, defs5())); return `url(#${id})`; }
const lab5 = (p, x, y, s, fs = 30, fill = "#fff", anchor = "middle") => tx(p, {x, y, "text-anchor": anchor, "font-size": fs, "font-weight": 700, fill, class: "out", "stroke-width": Math.max(6, fs * .22)}, s);
const card5 = (p, text, col = INK, fs = 42) => chip(p, text, col, {fs});
function showC5(c, t, a, b, y = 900, x = VP[0]) { tf(c, `translate(${x} ${y}) scale(${Math.max(0, pop(t, a))})`); op(c, on(t, a, b, .25)); }
// an arrow from (x1, y1) to (x2, y2) with an ink outline
function arrow5(p, x1, y1, x2, y2, col, w = 12) { const g = el("g", {}, p), an = Math.atan2(y2 - y1, x2 - x1), L = Math.hypot(x2 - x1, y2 - y1), h = w * 2.6;
  const b = el("g", {transform: `translate(${x1} ${y1}) rotate(${an * 180 / Math.PI})`}, g);
  el("path", {d: `M0 ${-w / 2} H${L - h} V${-w * 1.5} L${L} 0 L${L - h} ${w * 1.5} V${w / 2} H0 Z`, fill: col, stroke: INK, "stroke-width": 5, "stroke-linejoin": "round"}, b); return g; }

// ---- the Sun
function sun5(p, r = 100) { const g = el("g", {}, p);
  el("circle", {r: r * 1.7, fill: "#ffd166", opacity: .35, filter: "url(#blur)"}, g);
  g.rays = el("g", {}, g); for (let i = 0; i < 16; i++) el("path", {d: `M${r * .9} ${-r * .17} L${r * (i % 2 ? 1.38 : 1.6)} 0 L${r * .9} ${r * .17} Z`, fill: "#ffbe0b", stroke: INK, "stroke-width": Math.max(3, r * .05), "stroke-linejoin": "round", transform: `rotate(${i * 22.5})`}, g.rays);
  el("circle", {r, fill: sun5.g || (sun5.g = grad5("radialGradient", {cx: .4, cy: .38, r: .75}, [[0, "#fff3b0"], [.55, "#ffbe0b"], [1, "#f77f00"]])), stroke: INK, "stroke-width": Math.max(4, r * .06)}, g);
  return g; }

// ---- a corn plant; the base of the stalk is at (0, 0), it is about 520 tall
function corn5(p, o = {}) { const g = el("g", {}, p), G1 = "#52b788", G2 = "#74c69d";
  el("path", {d: "M0 0 V-470", fill: "none", stroke: INK, "stroke-width": 26, "stroke-linecap": "round"}, g); el("path", {d: "M0 0 V-470", fill: "none", stroke: "#6a994e", "stroke-width": 15, "stroke-linecap": "round"}, g);
  [[-90, 1, 220, 60], [-170, -1, 250, 70], [-250, 1, 260, 40], [-330, -1, 230, 30], [-410, 1, 190, 0], [-440, -1, 150, -10]].forEach(([y, d, L, dr]) => {
    el("path", A5({d: `M0 ${y} Q${d * L * .45} ${y - 130} ${d * L} ${y + dr} Q${d * L * .5} ${y - 62} 0 ${y + 30} Z`, fill: d > 0 ? G1 : G2, "stroke-width": 5}), g);
    el("path", {d: `M0 ${y + 12} Q${d * L * .46} ${y - 100} ${d * L * .96} ${y + dr - 2}`, fill: "none", stroke: "#d8f3dc", "stroke-width": 3.5, opacity: .8}, g); });
  [-18, -6, 6, 18].forEach(d => el("path", {d: `M0 -468 Q${d * .6} -500 ${d * 2.6} -548`, fill: "none", stroke: "#bc8a3f", "stroke-width": 6, "stroke-linecap": "round"}, g));     // tassel
  if (o.cob !== false) { const c = g.cob = el("g", {transform: "translate(22 -236) rotate(24)"}, g);
    el("path", A5({d: "M-26 30 Q-34 -40 0 -86 Q34 -40 26 30 Q0 44 -26 30 Z", fill: "#ffd23f", "stroke-width": 5}), c);
    for (let r = 0; r < 5; r++) el("path", {d: `M${-22 + r * 2} ${12 - r * 18} Q0 ${20 - r * 18} ${22 - r * 2} ${12 - r * 18}`, fill: "none", stroke: "#e09f00", "stroke-width": 3}, c);
    el("path", A5({d: "M-30 34 Q-44 -10 -20 -50 Q-22 0 -6 40 Z", fill: "#95d5b2", "stroke-width": 5}), c); el("path", A5({d: "M30 34 Q44 -10 20 -50 Q22 0 6 40 Z", fill: "#74c69d", "stroke-width": 5}), c);
    [-8, 0, 8].forEach(d => el("path", {d: `M0 -84 Q${d} -104 ${d * 2.4} -112`, fill: "none", stroke: "#9c6644", "stroke-width": 3.5, "stroke-linecap": "round"}, c)); }
  return g; }

// ---- a brown hen, side view, facing right; her feet are at (0, 0). g.head nods about (52, -150).
function hen5(p) { const g = el("g", {}, p), B = "#c8763a", D = "#a85d2a";
  [[-14, 0], [22, 4]].forEach(([x, d]) => { el("path", {d: `M${x} -52 V${-2 + d}`, stroke: INK, "stroke-width": 11, "stroke-linecap": "round"}, g); el("path", {d: `M${x} -52 V${-2 + d} M${x - 14} ${d} H${x + 20}`, stroke: "#f4a261", "stroke-width": 6, "stroke-linecap": "round", fill: "none"}, g); });
  el("path", A5({d: "M-66 -96 Q-150 -150 -132 -214 Q-104 -196 -92 -168 Q-98 -214 -74 -232 Q-56 -190 -40 -150 Z", fill: D, "stroke-width": 5}), g);          // tail
  el("ellipse", A5({cx: 0, cy: -104, rx: 96, ry: 68, fill: B}), g);
  g.head = el("g", {}, g);
  el("path", A5({d: "M30 -150 Q46 -214 84 -232 Q124 -228 122 -190 Q118 -150 86 -110 Q50 -96 30 -150 Z", fill: B}), g.head);                                     // neck and head
  el("path", A5({d: "M70 -230 Q66 -262 84 -254 Q88 -272 102 -256 Q118 -262 112 -234 Z", fill: "#e63946", "stroke-width": 5}), g.head);                           // comb
  el("path", A5({d: "M118 -212 L152 -200 L118 -186 Z", fill: "#f4a261", "stroke-width": 5}), g.head);                                                              // beak
  el("path", A5({d: "M112 -186 Q124 -160 108 -152 Q98 -166 104 -186 Z", fill: "#e63946", "stroke-width": 4.5}), g.head);                                          // wattle
  el("circle", {cx: 98, cy: -210, r: 9, fill: INK}, g.head); el("circle", {cx: 100, cy: -213, r: 3, fill: "#fff"}, g.head);
  el("path", A5({d: "M-52 -112 Q-30 -150 22 -136 Q44 -104 10 -78 Q-34 -70 -52 -112 Z", fill: D, "stroke-width": 5}), g);                                         // wing
  el("path", {d: "M-28 -102 Q-8 -90 14 -102 M-22 -118 Q-4 -108 16 -120", fill: "none", stroke: INK, "stroke-width": 3.5, "stroke-linecap": "round", opacity: .6}, g);
  return g; }

function egg5(p, col = "#f6d7b0") { const g = el("g", {}, p);
  el("path", A5({d: "M0 -62 C38 -62 50 -6 50 18 C50 48 28 64 0 64 C-28 64 -50 48 -50 18 C-50 -6 -38 -62 0 -62 Z", fill: col, "stroke-width": 5}), g);
  el("ellipse", {cx: -18, cy: -20, rx: 10, ry: 18, fill: "#fff", opacity: .55, transform: "rotate(20 -18 -20)"}, g); return g; }
function hex5(p, r = 30, col = "#ffb703") { const g = el("g", {}, p), P = k => [Math.cos(k * Math.PI / 3) * r, Math.sin(k * Math.PI / 3) * r];
  el("path", {d: "M" + [0, 1, 2, 3, 4, 5].map(k => P(k).map(v => v.toFixed(1)).join(" ")).join(" L") + " Z", fill: col, stroke: INK, "stroke-width": Math.max(3, r * .16), "stroke-linejoin": "round"}, g);
  el("path", {d: `M${-r * .5} ${-r * .5} L${r * .1} ${-r * .5}`, stroke: "#fff", "stroke-width": r * .14, "stroke-linecap": "round", opacity: .7}, g); return g; }
function kernel5(p) { const g = el("g", {}, p);
  el("path", A5({d: "M0 -52 C36 -52 46 -16 42 14 C38 44 20 58 0 58 C-20 58 -38 44 -42 14 C-46 -16 -36 -52 0 -52 Z", fill: "#ffd23f", "stroke-width": 5}), g);
  el("path", {d: "M-24 34 Q0 22 24 34 Q14 54 0 54 Q-14 54 -24 34 Z", fill: "#fff3c4"}, g); el("ellipse", {cx: -16, cy: -22, rx: 8, ry: 14, fill: "#fff", opacity: .6}, g); return g; }
function drop5(p, r = 20) { const g = el("g", {}, p); el("path", {d: `M0 ${-r * 1.5} C${r * .9} ${-r * .3} ${r} ${r * .2} ${r} ${r * .4} A${r} ${r} 0 0 1 ${-r} ${r * .4} C${-r} ${r * .2} ${-r * .9} ${-r * .3} 0 ${-r * 1.5} Z`, fill: "#4cc9f0", stroke: INK, "stroke-width": Math.max(3, r * .18), "stroke-linejoin": "round"}, g);
  el("ellipse", {cx: -r * .35, cy: r * .3, rx: r * .18, ry: r * .34, fill: "#fff", opacity: .7}, g); return g; }
// a bubble of gas with its name in it: CO₂ (grey) or O₂ (pale)
function gas5(p, kind, r = 30) { const g = el("g", {}, p), co = kind === "co2";
  el("circle", {r, fill: co ? "#6c757d" : "#e0fbfc", stroke: INK, "stroke-width": Math.max(3, r * .14)}, g); el("ellipse", {cx: -r * .35, cy: -r * .4, rx: r * .22, ry: r * .14, fill: "#fff", opacity: .6}, g);
  tx(g, {x: 0, y: r * .3, "text-anchor": "middle", "font-size": r * .82, "font-weight": 700, fill: co ? "#fff" : INK}, co ? "CO₂" : "O₂"); return g; }
// a bulk carrier (carries grain), facing right; the middle of the waterline is at (0, 0), about 210 long
function ship5(p) { const g = el("g", {}, p);
  el("path", A5({d: "M-104 -34 H84 L108 -40 L92 0 H-94 Z", fill: "#22223b", "stroke-width": 5}), g); el("path", {d: "M-97 -12 H97 L92 0 H-94 Z", fill: "#c1121f"}, g);
  for (let k = 0; k < 5; k++) el("rect", A5({x: -46 + k * 26, y: -46, width: 20, height: 12, rx: 2, fill: "#f4a261", "stroke-width": 4}), g);
  el("rect", A5({x: -98, y: -78, width: 40, height: 44, rx: 3, fill: "#f8f9fa", "stroke-width": 5}), g); [-90, -76].forEach(x => el("rect", {x, y: -68, width: 9, height: 8, fill: "#4cc9f0"}, g));
  el("rect", A5({x: -86, y: -98, width: 16, height: 22, fill: "#f77f00", "stroke-width": 4}), g); return g; }
// a plate of dinner seen from above: rice, a fried egg, vegetables and a chicken drumstick (parts are named so a scene can point at them)
function plate5(p) { const g = el("g", {}, p);
  el("circle", A5({r: 170, fill: "#f8f9fa"}), g); el("circle", {r: 128, fill: "none", stroke: "#ced4da", "stroke-width": 5}, g);
  g.rice = el("g", {}, g); el("path", A5({d: "M-110 -30 Q-112 -96 -52 -100 Q-2 -104 -6 -52 Q-4 -6 -56 -6 Q-104 -4 -110 -30 Z", fill: "#fff", "stroke-width": 5}), g.rice);
  seed = 31; for (let k = 0; k < 16; k++) { const x = -96 + rnd() * 76, y = -88 + rnd() * 66; el("path", {d: `M${x} ${y} l7 3`, stroke: "#adb5bd", "stroke-width": 3.5, "stroke-linecap": "round"}, g.rice); }
  g.egg = el("g", {}, g); el("path", A5({d: "M14 -84 Q60 -112 96 -76 Q124 -40 96 -8 Q60 12 28 -6 Q-2 -40 14 -84 Z", fill: "#fff", "stroke-width": 5}), g.egg); el("circle", A5({cx: 62, cy: -50, r: 24, fill: "#ffbe0b", "stroke-width": 5}), g.egg);
  g.veg = el("g", {}, g); [[-70, 54, -20], [-40, 76, 20], [-92, 84, 50]].forEach(([x, y, a]) => { el("path", A5({d: "M0 30 Q-34 0 0 -34 Q34 0 0 30 Z", fill: "#52b788", "stroke-width": 5, transform: `translate(${x} ${y}) rotate(${a})`}), g.veg); el("path", {d: "M0 26 V-22", stroke: "#d8f3dc", "stroke-width": 4, transform: `translate(${x} ${y}) rotate(${a})`}, g.veg); });
  g.chk = el("g", {transform: "translate(62 70) rotate(-28)"}, g); el("path", A5({d: "M52 -4 H86 M86 -4 q10 -12 14 0 q-4 12 -14 0", fill: "#fff", "stroke-width": 9}), g.chk); el("path", {d: "M52 -4 H88", stroke: "#fff", "stroke-width": 5, "stroke-linecap": "round"}, g.chk);
  el("path", A5({d: "M-44 0 Q-46 -38 0 -34 Q44 -30 60 -4 Q44 24 0 30 Q-42 32 -44 0 Z", fill: "#bc6c25", "stroke-width": 5}), g.chk); el("path", {d: "M-22 -14 Q0 -22 22 -12", fill: "none", stroke: "#e9a55b", "stroke-width": 6, "stroke-linecap": "round"}, g.chk);
  return g; }
// the real world map (equirectangular, see ep05/geo_world.py). In its own units it fills the whole screen.
function world5(p) { const g = el("g", {}, p);
  el("rect", {x: -180, y: -90, width: 1980, height: 1140, fill: "#48cae4"}, g);
  seed = 53; for (let i = 0; i < 60; i++) { const x = -140 + rnd() * 1880, y = -40 + rnd() * 1040; el("path", {d: `M${x} ${y} q9 -6 18 0 t18 0`, fill: "none", stroke: "#fff", "stroke-width": 2.5, opacity: .3}, g); }
  el("path", {d: WORLD5.land, fill: "#95d5b2", stroke: INK, "stroke-width": 2.4, "stroke-linejoin": "round"}, g); return g; }

// ---- the pupil (the same look as EP02's cold open: blue top, dark hair with a tuft). Side view, facing right, feet at (0, 0), about 490 tall.
// o: {shirt, skin, hair, style: "tuft" | "pony" | "bob" | "short"}
function kid5(p, o = {}) { const K = el("g", {}, p), SKIN = o.skin || "#f1c27d", TOP = o.shirt || "#3a86ff", HAIR = o.hair || "#3d2c1e", NAVY = "#1d3557", far = c => mix(c.length === 7 ? c : "#888888", "#000000", .14);
  K.sh = el("ellipse", {cx: 6, cy: 2, rx: 92, ry: 15, fill: INK, opacity: .2}, K);
  K.body = el("g", {}, K);
  const leg = f => { const g = el("g", {}, K.body);
    el("rect", A5({x: -17, y: -6, width: 34, height: 96, rx: 15, fill: f ? far(SKIN) : SKIN}), g); el("rect", A5({x: -17, y: 62, width: 34, height: 34, rx: 6, fill: "#fff"}), g);
    el("path", A5({d: "M-20 92 H24 Q44 94 44 110 Q44 120 34 120 H-20 Z", fill: f ? "#2b2b45" : "#33334f"}), g); return g; };
  K.armF = el("g", {}, K.body); el("rect", A5({x: -13, y: 36, width: 26, height: 80, rx: 13, fill: far(SKIN)}), K.armF); el("rect", A5({x: -17, y: -8, width: 34, height: 58, rx: 15, fill: far(TOP)}), K.armF);
  K.legF = leg(1); K.legN = leg(0);
  K.torso = el("g", {}, K.body);
  el("path", A5({d: "M-50 -186 H50 L54 -112 H4 L0 -136 L-4 -112 H-54 Z", fill: NAVY}), K.torso);
  el("rect", A5({x: -54, y: -326, width: 108, height: 152, rx: 30, fill: TOP}), K.torso);
  K.glow = el("circle", {cx: 16, cy: -80, r: 26, fill: "#ffe14d", opacity: 0, filter: "url(#blur)"}, K.legN);
  K.head = el("g", {}, K.body);
  if (o.style === "pony") el("path", A5({d: "M-66 -440 Q-140 -440 -128 -350 Q-120 -310 -104 -330 Q-96 -390 -62 -400 Z", fill: HAIR}), K.head);
  if (o.style === "bob") el("path", A5({d: "M-76 -420 Q-96 -330 -60 -312 H-6 V-420 Z", fill: HAIR}), K.head);
  el("rect", A5({x: -15, y: -340, width: 34, height: 30, fill: SKIN, "stroke-width": 5}), K.head);
  el("path", A5({d: "M-26 -324 L4 -300 L34 -324 L22 -336 H-14 Z", fill: "#fff", "stroke-width": 5}), K.head);
  el("circle", A5({cx: 6, cy: -402, r: 80, fill: SKIN}), K.head);
  el("path", A5({d: "M-72 -372 Q-92 -486 0 -488 Q84 -490 88 -420 Q60 -446 22 -448 Q-4 -444 -14 -412 Q-22 -384 -40 -352 Q-66 -352 -72 -372 Z", fill: HAIR}), K.head);
  if (!o.style || o.style === "tuft") { el("path", A5({d: "M-8 -487 Q0 -506 16 -500", fill: "none", stroke: HAIR, "stroke-width": 9}), K.head); el("path", {d: "M-8 -487 Q0 -506 16 -500", fill: "none", stroke: HAIR, "stroke-width": 6, "stroke-linecap": "round"}, K.head); }
  if (o.style === "pony") el("circle", A5({cx: -70, cy: -440, r: 12, fill: "#f72585", "stroke-width": 4}), K.head);
  el("ellipse", A5({cx: -18, cy: -394, rx: 13, ry: 17, fill: SKIN, "stroke-width": 5}), K.head);
  el("circle", {cx: 26, cy: -370, r: 15, fill: "#ff8fa3", opacity: .6}, K.head);
  K.eyes = el("g", {}, K.head);
  [[32, 11, 15], [66, 9, 14]].forEach(([x, rx, ry]) => { el("ellipse", {cx: x, cy: -404, rx, ry, fill: INK}, K.eyes); el("circle", {cx: x + 3, cy: -410, r: 4.4, fill: "#fff"}, K.eyes); });
  K.shut = el("g", {opacity: 0}, K.head); [[32, 12], [66, 10]].forEach(([x, w]) => el("path", {d: `M${x - w} -400 Q${x} -416 ${x + w} -400`, fill: "none", stroke: INK, "stroke-width": 6, "stroke-linecap": "round"}, K.shut));
  K.brow = el("g", {}, K.head); [[20, 44], [58, 76]].forEach(([a, b]) => el("path", {d: `M${a} -430 Q${(a + b) / 2} -437 ${b} -431`, fill: "none", stroke: INK, "stroke-width": 5, "stroke-linecap": "round"}, K.brow));
  K.m0 = el("path", {d: "M38 -372 Q52 -362 66 -372", fill: "none", stroke: INK, "stroke-width": 5.5, "stroke-linecap": "round"}, K.head);
  K.m1 = el("g", {opacity: 0}, K.head); el("path", A5({d: "M30 -380 Q52 -374 76 -382 Q74 -340 51 -340 Q33 -342 30 -380 Z", fill: "#7a1c1c", "stroke-width": 5}), K.m1); el("path", {d: "M36 -376 Q52 -371 71 -377 L70 -368 Q52 -363 37 -367 Z", fill: "#fff"}, K.m1);
  K.armN = el("g", {}, K.body);
  el("rect", A5({x: -14, y: 36, width: 28, height: 92, rx: 14, fill: SKIN}), K.armN); el("circle", A5({cx: 0, cy: 126, r: 17, fill: SKIN, "stroke-width": 5}), K.armN);
  el("rect", A5({x: -19, y: -10, width: 38, height: 62, rx: 17, fill: TOP}), K.armN);
  return K; }
// pose the pupil. q: {legN, legF, armN, armF (degrees; negative = forwards), lean, bob, head, laugh (0..1), flip, shadow}
function pose5(K, x, y, sc, q = {}) { const f = q.flip ? -1 : 1;
  tf(K, `translate(${x} ${y}) scale(${sc * f} ${sc})`); tf(K.body, `translate(0 ${q.bob || 0}) rotate(${q.lean || 0} 0 -120)`);
  tf(K.legN, `translate(16 -120) rotate(${q.legN || 0})`); tf(K.legF, `translate(-14 -120) rotate(${q.legF || 0})`);
  tf(K.armN, `translate(10 -300) rotate(${q.armN || 0})`); tf(K.armF, `translate(-6 -300) rotate(${q.armF || 0})`);
  tf(K.head, `rotate(${q.head || 0} 2 -330)`); const L = q.laugh || 0;
  op(K.m0, L < .5 ? 1 : 0); op(K.m1, L >= .5 ? 1 : 0); op(K.eyes, L >= .5 && q.shut !== false ? 0 : 1); op(K.shut, L >= .5 && q.shut !== false ? 1 : 0);
  op(K.sh, q.shadow === undefined ? .2 : q.shadow); tf(K.sh, `translate(0 ${-(q.lift || 0)}) scale(${1 - .3 * clamp(-(q.bob || 0) / 200)})`); }
// a running pose: ph = the stride angle (radians), A = how far the legs swing (degrees)
const run5 = (ph, A = 42, extra = {}) => Object.assign({legN: A * Math.sin(ph), legF: -A * Math.sin(ph), armN: -A * 1.05 * Math.sin(ph) - 12, armF: A * 1.05 * Math.sin(ph) - 12, lean: 9, bob: -16 * Math.abs(Math.cos(ph)), head: -4}, extra);
// a jump pose: k = 0..1 through the jump, h = its height
const jump5 = (k, h = 170, extra = {}) => { const up = Math.sin(Math.PI * clamp(k)); return Object.assign({bob: -h * up, legN: -34 * up, legF: 30 * up, armN: -168 * Math.min(1, up * 1.6), armF: 168 * Math.min(1, up * 1.6) - 336 * Math.min(1, up * 1.6) + 20, lean: -4 * up, head: -12 * up, laugh: up > .15 ? 1 : 0}, extra); };

// ---- the school playground (a Singapore primary school; no real school's name). Ground for the back row is y = 800.
const PG5 = {BAR: 548, BAR_X: [520, 900], TOWER: [1090, 1210], PLAT: 566, CHUTE: [[1206, 560], [1300, 600], [1380, 730], [1480, 776]], DOOR: [148, 640]};
function school5(p) { const g = el("g", {}, p);
  el("rect", {x: -1200, y: -900, width: 4400, height: 1560, fill: school5.sky || (school5.sky = grad5("linearGradient", {x1: 0, y1: 0, x2: 0, y2: 1}, [[0, "#6ec6ff"], [1, "#e3f6ff"]]))}, g);
  [[-60, 120, 26], [1270, 60, 30], [640, -20, 22]].forEach(([x, y, r]) => { const c = el("g", {fill: "#fff", opacity: .9}, g); [[0, 0, 2.2], [r * 1.9, -r * .7, 2.8], [r * 4, 0, 2.3], [r * 2, r * .5, 3.2]].forEach(([dx, dy, k]) => el("ellipse", {cx: x + dx, cy: y + dy, rx: r * k * .8, ry: r * k * .42}, c)); });
  // HDB blocks far away
  [[-150, 300, 190, "#f6bd60"], [1250, 260, 170, "#84a59d"], [1450, 330, 230, "#f28482"], [1690, 280, 200, "#f6bd60"]].forEach(([x, y, w, col]) => { el("rect", {x, y, width: w, height: 400, fill: col, stroke: INK, "stroke-width": 4, opacity: .75}, g);
    for (let r = 0; r < 8; r++) for (let c = 0; c < Math.floor(w / 34); c++) el("rect", {x: x + 10 + c * 34, y: y + 14 + r * 40, width: 18, height: 20, fill: "#fff", opacity: .55}, g); });
  // the school block: three floors of classrooms along open corridors
  el("rect", A5({x: 60, y: 214, width: 1130, height: 430, fill: "#fff3d6"}), g); el("rect", A5({x: 40, y: 192, width: 1170, height: 30, rx: 6, fill: "#2a9d8f"}), g);
  for (let f = 0; f < 3; f++) { const y = 240 + f * 136;
    el("rect", {x: 63, y, width: 1124, height: 92, fill: "#5c677d"}, g);
    for (let c = 0; c < 9; c++) { el("rect", {x: 80 + c * 124, y: y + 12, width: 60, height: 58, rx: 4, fill: "#bde0fe", stroke: INK, "stroke-width": 3}, g); el("rect", {x: 150 + c * 124, y: y + 6, width: 36, height: 86, fill: ["#e76f51", "#f4a261", "#e9c46a"][f], stroke: INK, "stroke-width": 3}, g); }
    el("rect", A5({x: 60, y: y + 78, width: 1130, height: 38, fill: ["#ffd166", "#f4a261", "#fff3d6"][f], "stroke-width": 5}), g);
    for (let c = 0; c < 10; c++) el("rect", {x: 58 + c * 124, y: y - 2, width: 12, height: 118, fill: "#fff3d6", stroke: INK, "stroke-width": 3}, g); }
  el("rect", {x: PG5.DOOR[0] - 64, y: 536, width: 128, height: 108, fill: "#1b263b"}, g);                                             // the way out to the playground
  const sign = el("g", {}, g); el("rect", A5({x: 440, y: 150, width: 380, height: 56, rx: 10, fill: "#fff", "stroke-width": 5}), sign); tx(sign, {x: 630, y: 190, "text-anchor": "middle", "font-size": 34, "font-weight": 700, fill: INK, "letter-spacing": 2}, "PRIMARY SCHOOL");
  el("rect", A5({x: -70, y: 150, width: 150, height: 494, fill: "#2a9d8f"}), g); for (let k = 0; k < 4; k++) el("rect", {x: -44, y: 190 + k * 110, width: 98, height: 22, rx: 4, fill: "#1d6f66"}, g);                 // the stair tower
  // the bell on the stair tower
  g.bell = el("g", {transform: "translate(5 500)"}, g); el("circle", A5({r: 44, fill: "#e63946"}), g.bell); el("circle", A5({r: 13, fill: "#f8f9fa", "stroke-width": 4}), g.bell);
  g.clap = el("path", A5({d: "M0 44 V70", "stroke-width": 9, fill: "none"}), g.bell); el("circle", A5({cx: 0, cy: 74, r: 9, fill: "#adb5bd", "stroke-width": 4}), g.bell);
  g.ring = el("g", {transform: "translate(5 500)"}, g); [70, 96, 122].forEach(r => { el("path", {d: `M${r * .8} ${-r * .6} A${r} ${r} 0 0 1 ${r * .8} ${r * .6}`, fill: "none", stroke: "#e63946", "stroke-width": 8, "stroke-linecap": "round"}, g.ring); el("path", {d: `M${-r * .8} ${-r * .6} A${r} ${r} 0 0 0 ${-r * .8} ${r * .6}`, fill: "none", stroke: "#e63946", "stroke-width": 8, "stroke-linecap": "round"}, g.ring); });
  // a rain tree and the covered walkway
  el("rect", A5({x: 1590, y: 470, width: 40, height: 180, fill: "#7f5539"}), g); el("path", A5({d: "M1400 470 Q1380 380 1480 370 Q1520 300 1620 320 Q1740 290 1790 380 Q1850 440 1790 480 Q1600 520 1400 470 Z", fill: "#40916c"}), g);
  el("rect", {x: -1200, y: 640, width: 4400, height: 800, fill: "#d9d2c5"}, g); el("line", {x1: -1200, y1: 640, x2: 3200, y2: 640, stroke: INK, "stroke-width": 5}, g);
  el("path", A5({d: "M1230 520 H1900 L1880 496 H1250 Z", fill: "#40916c"}), g); [1270, 1500, 1730].forEach(x => el("rect", A5({x: x - 7, y: 520, width: 14, height: 122, fill: "#f8f9fa", "stroke-width": 4}), g));
  // the rubber play floor
  el("path", {d: "M250 720 H1660 Q1760 720 1790 820 L1840 1040 H130 L200 800 Q215 720 250 720 Z", fill: "#ef8354", stroke: INK, "stroke-width": 5}, g);
  el("path", {d: "M640 800 Q820 760 1020 810 Q1140 880 1010 960 Q780 1010 610 950 Q520 870 640 800 Z", fill: "#4cc9f0", opacity: .8}, g); el("circle", {cx: 1420, cy: 900, r: 70, fill: "#ffd166", opacity: .8}, g);
  // the monkey bars
  const mb = el("g", {}, g), [bx0, bx1] = PG5.BAR_X, by = PG5.BAR;
  [bx0, bx1].forEach(x => { el("rect", A5({x: x - 9, y: by, width: 18, height: 800 - by, rx: 6, fill: "#ffbe0b", "stroke-width": 5}), mb); for (let k = 1; k < 5; k++) el("line", {x1: x - 26, y1: by + k * 50, x2: x + 26, y2: by + k * 50, stroke: INK, "stroke-width": 7, "stroke-linecap": "round"}, mb); });
  el("rect", A5({x: bx0 - 20, y: by - 10, width: bx1 - bx0 + 40, height: 18, rx: 9, fill: "#ffbe0b", "stroke-width": 5}), mb);
  for (let x = bx0 + 38; x < bx1; x += 44) el("circle", {cx: x, cy: by - 1, r: 7, fill: INK}, mb);
  // the slide: a tower with a roof, a ladder at the back and a chute down to the right
  const sl = el("g", {}, g), [tx0, tx1] = PG5.TOWER, py = PG5.PLAT;
  for (let k = 0; k < 5; k++) el("line", {x1: tx0 - 46, y1: 780 - k * 46, x2: tx0 - 4, y2: 780 - k * 46, stroke: INK, "stroke-width": 8, "stroke-linecap": "round"}, sl);
  el("path", A5({d: `M${tx0 - 50} 800 V${py - 40} M${tx0 - 4} 800 V${py}`, fill: "none", "stroke-width": 9}), sl);
  [tx0, tx1].forEach(x => el("rect", A5({x: x - 8, y: py - 150, width: 16, height: 800 - py + 150, rx: 5, fill: "#7209b7", "stroke-width": 5}), sl));
  el("rect", A5({x: tx0 - 14, y: py, width: tx1 - tx0 + 28, height: 20, rx: 6, fill: "#f72585", "stroke-width": 5}), sl);
  el("path", A5({d: `M${tx0 - 34} ${py - 146} L${(tx0 + tx1) / 2} ${py - 226} L${tx1 + 34} ${py - 146} Z`, fill: "#e63946"}), sl);
  const C = PG5.CHUTE, cd = `M${C[0][0]} ${C[0][1] + 16} C${C[1][0]} ${C[1][1] + 16} ${C[2][0]} ${C[2][1] + 16} ${C[3][0]} ${C[3][1] + 16} H${C[3][0] + 60}`;
  el("path", {d: cd, fill: "none", stroke: INK, "stroke-width": 44, "stroke-linecap": "round"}, sl); el("path", {d: cd, fill: "none", stroke: "#3a86ff", "stroke-width": 32, "stroke-linecap": "round"}, sl);
  el("path", {d: cd, fill: "none", stroke: "#a2d2ff", "stroke-width": 8, "stroke-linecap": "round", transform: "translate(0 -8)"}, sl);
  el("rect", A5({x: C[3][0] + 30, y: 790, width: 14, height: 12, fill: "#7209b7", "stroke-width": 4}), sl);
  return g; }
// where a rider is on the slide's chute (k = 0 at the top, 1 at the lip) and the slope there, in degrees
function chute5(k) { const C = PG5.CHUTE, B = (i, u) => (1 - u) ** 3 * C[0][i] + 3 * (1 - u) ** 2 * u * C[1][i] + 3 * (1 - u) * u * u * C[2][i] + u ** 3 * C[3][i];
  const u = clamp(k), x = B(0, u), y = B(1, u), x2 = B(0, Math.min(1, u + .02)), y2 = B(1, Math.min(1, u + .02)); return [x, y, Math.atan2(y2 - y, x2 - x + .001) * 180 / Math.PI]; }
// the friends at play: red on the monkey bars, yellow on the slide, purple cheering. tau = seconds; they loop.
function friends5(p) { const F = {r: kid5(p, {shirt: "#e63946", skin: "#c68642", hair: "#1b1b1b", style: "short"}), y: kid5(p, {shirt: "#ffbe0b", skin: "#f1c27d", hair: "#1b1b1b", style: "pony"}), g: kid5(p, {shirt: "#06d6a0", skin: "#8d5524", hair: "#1b1b1b", style: "short"}), v: kid5(p, {shirt: "#9d4edd", skin: "#e0ac69", hair: "#5a3825", style: "bob"})}; return F; }
// the kid on the monkey bars: hand over hand from x0 to x1
function hang5(K, x, tau, sc = .5) { const sw = Math.sin(tau * 5.2); pose5(K, x, PG5.BAR + 8 + 430 * sc, sc, {armN: -176 + 14 * sw, armF: -184 - 14 * sw, legN: 14 * sw - 8, legF: -12 * sw + 6, lean: 7 * sw, laugh: 1, shut: false, shadow: 0}); }
