/* TheOneApp, Explored EP04: Where does all this rain come from? (P4, the water cycle). Load after common.js and geo_map.js; ep04/pov.js follows.
   This file: the helpers and drawings both files share, then the NARRATED scenes (hook, answer, news, recap, cycle, salt, try, think, close).
   Scenes draw in a 1200 x 900 box; times come from cue(scene, word, fallback). Every frame depends only on t.
   Science kept true (rule 9): water vapour is invisible (we only draw its molecules, spread far apart); a cloud is tiny drops of LIQUID water;
   water evaporates without boiling; salt does not evaporate; drains and canals carry rain to reservoirs.
   Labels (rule 10): a PROCESS is a coloured pill, a THING is white outlined text; a line on a map starts and ends somewhere named. */

/* ---------- helpers (copied and adapted from ep02/pov.js under EP04 names) ---------- */
const D4 = () => $("v").querySelector("defs");
const fr4 = name => { const c = SC[name]; return c ? (tt => clamp((tt - c.t0) / Math.max(.1, c.t1 - c.t0))) : (() => 0); };
const T0 = n => SC[n] ? SC[n].t0 : -1e6, T1 = n => SC[n] ? SC[n].t1 : -1e6;
function gR(stops, a = {}) { const id = "w4r" + (gR.n = (gR.n || 0) + 1), g = el("radialGradient", Object.assign({id, cx: .5, cy: .5, r: .5}, a), D4());
  stops.forEach(([o, c, al]) => el("stop", {offset: o, "stop-color": c, "stop-opacity": al === undefined ? 1 : al}, g)); return `url(#${id})`; }
function gL(stops, a = {}) { const id = "w4l" + (gL.n = (gL.n || 0) + 1), g = el("linearGradient", Object.assign({id, x1: 0, y1: 0, x2: 0, y2: 1}, a), D4());
  stops.forEach(([o, c, al]) => el("stop", {offset: o, "stop-color": c, "stop-opacity": al === undefined ? 1 : al}, g)); return `url(#${id})`; }
function glow4(p, col, r, a = 1, core = 0) { return el("circle", {r, fill: gR([[0, col, a], [core, col, a], [1, col, 0]])}, p); }
function clip4(make) { const id = "w4c" + (clip4.n = (clip4.n || 0) + 1), c = el("clipPath", {id}, D4()); make(c); return `url(#${id})`; }
function lab4(p, text, fs = 40, fill = "#fff", anchor = "middle") { const g = el("g", {}, p);
  tx(g, {x: 0, y: 0, "text-anchor": anchor, "font-size": fs, "font-weight": 700, fill, class: "out", "stroke-width": fs * .22}, text); return g; }
const at4 = (e, x, y, s = 1, r = 0) => tf(e, `translate(${x} ${y}) scale(${s}) rotate(${r})`);
const wob4 = (t, f, ph = 0) => Math.sin(t * f + ph) * .6 + Math.sin(t * f * 1.73 + ph * 2.3) * .4;      // a smooth jiggle between -1 and 1
const O4 = {stroke: INK, "stroke-width": 6, "stroke-linejoin": "round", "stroke-linecap": "round"}, A4 = (a, b) => Object.assign({}, O4, a, b || {});

/* ---------- the cast: water molecules. One red oxygen atom (with the face) and two white hydrogen atoms, H2O-shaped (104.5 degrees) ---------- */
// kind: "mo" (you: a little curl of hair), "mama" (bow), "papa" (moustache), "friend", "plain" (no face: a diagram)
function mol4(p, kind = "friend", R = 40) { const g = el("g", {}, p), k = R / 40, sw = Math.max(2.2, 5 * k), an = 52.25 * Math.PI / 180, d = 47 * k;
  g.h = [-1, 1].map(sd => { const h = el("g", {}, g), x = sd * Math.sin(an) * d, y = Math.cos(an) * d;
    el("circle", {cx: x, cy: y, r: 22 * k, fill: "#fff", stroke: INK, "stroke-width": sw}, h);
    tx(h, {x, y: y + 8 * k, "text-anchor": "middle", "font-size": 23 * k, "font-weight": 700, fill: "#8d99ae"}, "H"); return h; });
  el("circle", {r: R, fill: "#e63946", stroke: INK, "stroke-width": sw}, g);
  el("ellipse", {cx: -16 * k, cy: -23 * k, rx: 13 * k, ry: 6.5 * k, fill: "#fff", opacity: .42, transform: `rotate(-32 ${-16 * k} ${-23 * k})`}, g);
  if (kind === "plain") { tx(g, {x: 0, y: 13 * k, "text-anchor": "middle", "font-size": 36 * k, "font-weight": 700, fill: "#fff"}, "O"); return g; }
  [-1, 1].forEach(sd => el("circle", {cx: sd * 25 * k, cy: 9 * k, r: 7 * k, fill: "#ffb3c6", opacity: .8}, g));
  g.eyes = el("g", {}, g); [-1, 1].forEach(sd => el("circle", {cx: sd * 14 * k, cy: -6 * k, r: 10.5 * k, fill: "#fff", stroke: INK, "stroke-width": sw * .5}, g.eyes));
  g.pup = el("g", {}, g.eyes); [-1, 1].forEach(sd => { el("circle", {cx: sd * 14 * k, cy: -5 * k, r: 5.8 * k, fill: INK}, g.pup); el("circle", {cx: sd * 14 * k + 2 * k, cy: -7.5 * k, r: 2 * k, fill: "#fff"}, g.pup); });
  g.shut = el("g", {opacity: 0}, g);
  [-1, 1].forEach(sd => { el("circle", {cx: sd * 14 * k, cy: -6 * k, r: 12.5 * k, fill: "#e63946"}, g.shut);
    el("path", {d: `M${(sd * 14 - 9) * k} ${-3 * k} Q${sd * 14 * k} ${-14 * k} ${(sd * 14 + 9) * k} ${-3 * k}`, fill: "none", stroke: INK, "stroke-width": sw * .7, "stroke-linecap": "round"}, g.shut); });
  g.m = [el("path", {d: `M${-10 * k} ${12 * k} Q0 ${23 * k} ${10 * k} ${12 * k}`, fill: "none", stroke: INK, "stroke-width": sw * .7, "stroke-linecap": "round"}, g),
    el("path", {d: `M${-12 * k} ${10 * k} Q0 ${14 * k} ${12 * k} ${10 * k} Q${11 * k} ${28 * k} 0 ${28 * k} Q${-11 * k} ${28 * k} ${-12 * k} ${10 * k} Z`, fill: "#7a1c1c", stroke: INK, "stroke-width": sw * .55, "stroke-linejoin": "round", opacity: 0}, g),
    el("ellipse", {cx: 0, cy: 18 * k, rx: 6 * k, ry: 8 * k, fill: "#7a1c1c", stroke: INK, "stroke-width": sw * .55, opacity: 0}, g)];
  if (kind === "mo") el("path", {d: `M${-2 * k} ${-R} q${-9 * k} ${-17 * k} ${7 * k} ${-21 * k} q${13 * k} ${-2 * k} ${10 * k} ${9 * k}`, fill: "none", stroke: INK, "stroke-width": sw * .9, "stroke-linecap": "round"}, g);
  if (kind === "mama") { const b = el("g", {transform: `translate(${14 * k} ${-R + 3 * k}) rotate(18)`}, g);
    [-1, 1].forEach(sd => el("path", {d: `M0 0 L${sd * 22 * k} ${-13 * k} Q${sd * 27 * k} 0 ${sd * 22 * k} ${13 * k} Z`, fill: "#ff70a6", stroke: INK, "stroke-width": sw * .6, "stroke-linejoin": "round"}, b));
    el("circle", {r: 6.5 * k, fill: "#ffd6e0", stroke: INK, "stroke-width": sw * .6}, b);
    [-1, 1].forEach(sd => [0, 1].forEach(j => el("line", {x1: (sd * 22 + sd * j * 3) * k, y1: (-12 + j * 5) * k, x2: (sd * 29 + sd * j * 3) * k, y2: (-17 + j * 6) * k, stroke: INK, "stroke-width": sw * .5, "stroke-linecap": "round"}, g))); }
  if (kind === "papa") { el("path", {d: `M0 ${6 * k} Q${-9 * k} ${1 * k} ${-19 * k} ${8 * k} Q${-10 * k} ${15 * k} 0 ${9 * k} Q${10 * k} ${15 * k} ${19 * k} ${8 * k} Q${9 * k} ${1 * k} 0 ${6 * k} Z`, fill: "#3d2c1e", stroke: INK, "stroke-width": sw * .45, "stroke-linejoin": "round"}, g);
    [-1, 1].forEach(sd => el("line", {x1: sd * 6 * k, y1: -19 * k, x2: sd * 23 * k, y2: -22 * k, stroke: INK, "stroke-width": sw * .95, "stroke-linecap": "round"}, g));
    g.m.forEach(m => set(m, "transform", `translate(0 ${6 * k})`)); }
  g.kind = kind; g.k = k; return g; }
// the face: mouth 0 = smile, 1 = big open smile, 2 = "oh!"; shut = happy closed eyes; (lx, ly) = where the eyes look (-1..1)
function face4(g, m = 0, shut = 0, lx = 0, ly = 0) { if (!g.m) return; g.m.forEach((e, i) => op(e, i === m ? 1 : 0)); op(g.shut, shut); const R = 4.2 * (g.k || 1); tf(g.pup, `translate(${lx * R} ${ly * R})`); }
// a hydrogen "hand" waves (the bond bends a little)
function wave4(g, sd, a) { const h = g.h[sd < 0 ? 0 : 1]; tf(h, `rotate(${a})`); }
// a small name tag with a pointer (below a thing by default)
function tag4(p, text, col = "#ffe14d", ink = INK, fs = 28, down = 0) { const g = el("g", {}, p); const c = chip(g, text, col, {fs, ink}); op(c, 1); const a = fs / 2 + 12, b = fs / 2 + 28, k = down ? 1 : -1;
  el("path", {d: `M-10 ${k * a} L0 ${k * b} L10 ${k * a} Z`, fill: col, stroke: INK, "stroke-width": 4, "stroke-linejoin": "round"}, g); return g; }
// mix two hex colours, giving a hex colour back (so it can be mixed again)
const mixH = (h1, h2, k) => { const a = hex(h1), b = hex(h2); return "#" + a.map((v, i) => Math.round(lerp(v, b[i], clamp(k))).toString(16).padStart(2, "0")).join(""); };

/* ---------- drawings ---------- */
function sun4(p, r = 80) { const g = el("g", {}, p); glow4(g, "#fff3b0", r * 3.2, .7, .2); g.rays = el("g", {}, g);
  for (let i = 0; i < 12; i++) el("path", {d: `M${-r * .16} ${-r * 1.28} L0 ${-r * 1.75} L${r * .16} ${-r * 1.28} Z`, fill: "#ffbe0b", stroke: INK, "stroke-width": 5, "stroke-linejoin": "round", transform: `rotate(${i * 30})`}, g.rays);
  el("circle", {r, fill: "#ffd60a", stroke: INK, "stroke-width": 6}, g); el("circle", {cx: -r * .3, cy: -r * .3, r: r * .32, fill: "#fff", opacity: .35}, g); return g; }
function cloud4(p, sd, w = 300, col = "#fff", n = 6) { const g = el("g", {}, p); seed = sd; const C = [];
  for (let i = 0; i < n; i++) { const k = i / (n - 1); C.push([(k - .5) * w * .8, -Math.sin(k * Math.PI) * w * .15 - rnd() * w * .05, w * (.13 + .1 * Math.sin(k * Math.PI) + rnd() * .03)]); }
  g.o = el("g", {fill: INK}, g); g.f = el("g", {fill: col}, g);
  C.forEach(([x, y, r]) => { el("circle", {cx: x, cy: y, r: r + 6}, g.o); el("circle", {cx: x, cy: y, r}, g.f); });
  el("rect", {x: -w * .5 - 6, y: -w * .05 - 6, width: w + 12, height: w * .2 + 12, rx: w * .1 + 6}, g.o); el("rect", {x: -w * .5, y: -w * .05, width: w, height: w * .2, rx: w * .1}, g.f); return g; }
function drop4(p, r = 30, col = "#4cc9f0") { const g = el("g", {}, p);
  el("path", {d: `M0 ${-r * 1.7} C${r * .3} ${-r * .9} ${r} ${-r * .3} ${r} ${r * .25} A${r} ${r} 0 0 1 ${-r} ${r * .25} C${-r} ${-r * .3} ${-r * .3} ${-r * .9} 0 ${-r * 1.7} Z`, fill: col, stroke: INK, "stroke-width": Math.max(2.5, r * .14), "stroke-linejoin": "round"}, g);
  el("ellipse", {cx: -r * .38, cy: r * .12, rx: r * .16, ry: r * .34, fill: "#fff", opacity: .7, transform: `rotate(18 ${-r * .38} ${r * .12})`}, g); return g; }
// rain: streaks that fall (and wrap) inside a box
function rain4(p, n, sd, o = {}) { const G = el("g", {}, p); seed = sd; const a = [];
  for (let i = 0; i < n; i++) a.push({x: rnd(), y: rnd(), v: .75 + rnd() * .5, L: (o.len || 50) * (.6 + rnd() * .9), e: el("line", {stroke: o.col || "#dbeeff", "stroke-width": o.sw || 4, "stroke-linecap": "round", opacity: .35 + rnd() * .5}, G)});
  a.G = G; a.o = {x0: o.x0 === undefined ? FULL.x : o.x0, w: o.w || FULL.w, y0: o.y0 === undefined ? FULL.y : o.y0, h: o.h || FULL.h, sl: o.slant === undefined ? -.2 : o.slant, sp: o.speed || 1500}; return a; }
function runRain4(a, t) { const o = a.o; a.forEach(d => { const yy = (d.y * o.h + t * o.sp * d.v) % (o.h + 80) - 40, xx = ((d.x * o.w + yy * o.sl) % o.w + o.w) % o.w;
  set(d.e, "x1", o.x0 + xx); set(d.e, "y1", o.y0 + yy); set(d.e, "x2", o.x0 + xx + d.L * o.sl); set(d.e, "y2", o.y0 + yy + d.L); }); }
// an HDB block seen from the front; (x, y) is its bottom-left corner. lit: evening windows
function hdb4(p, x, y, w, h, col, o = {}) { const g = el("g", {}, p), fl = Math.floor((h - 30) / 44), cw = 38, n = Math.floor((w - 20) / cw), x0 = x + (w - n * cw) / 2; seed = o.sd || (x * 7 + h);
  el("rect", A4({x, y: y - h, width: w, height: h, rx: 6, fill: col, "stroke-width": 5}), g);
  el("rect", {x: x + w * .42, y: y - h - 18, width: w * .16, height: 20, fill: col, stroke: INK, "stroke-width": 5}, g);
  el("rect", {x, y: y - h, width: w, height: 16, fill: o.band || "#e76f51", stroke: INK, "stroke-width": 5}, g);
  for (let r = 0; r < fl; r++) { const yy = y - h + 30 + r * 44; el("line", {x1: x + 4, y1: yy + 34, x2: x + w - 4, y2: yy + 34, stroke: INK, "stroke-width": 2.5, opacity: .35}, g);
    for (let c = 0; c < n; c++) el("rect", {x: x0 + c * cw + 7, y: yy, width: cw - 14, height: 26, rx: 3, fill: o.lit ? (rnd() < .62 ? "#ffd166" : "#3d4a6b") : "#cfe8fb", stroke: INK, "stroke-width": 2}, g); }
  el("rect", {x, y: y - 34, width: w, height: 34, fill: INK, opacity: .22}, g); return g; }
function tree4(p, x, y, s = 1, col = "#2d9d5c") { const g = el("g", {transform: `translate(${x} ${y}) scale(${s})`}, p);
  el("rect", A4({x: -9, y: -70, width: 18, height: 72, rx: 5, fill: "#8d5b3a", "stroke-width": 4}), g);
  [[0, -120, 52], [-40, -90, 40], [40, -92, 42]].forEach(([cx, cy, r]) => el("circle", {cx, cy, r: r + 5, fill: INK}, g)); [[0, -120, 52], [-40, -90, 40], [40, -92, 42]].forEach(([cx, cy, r]) => el("circle", {cx, cy, r, fill: col}, g));
  el("circle", {cx: -14, cy: -134, r: 16, fill: "#fff", opacity: .18}, g); return g; }
// the city under the afternoon sky (the hook, and the last shot of the episode). Returns the parts that change.
function city4(st) { const c = {}; c.sky = fullRect(st, "#7cc6f2"); c.hi = el("rect", {x: FULL.x, y: 250, width: FULL.w, height: 480, fill: gL([[0, "#fff", 0], [1, "#fff", .5]])}, st);
  c.sun = sun4(st, 84); at4(c.sun, 260, 170);
  c.bow = el("g", {opacity: 0}, st); ["#ef476f", "#f78c6b", "#ffd166", "#06d6a0", "#118ab2", "#7b2cbf"].forEach((col, i) => el("path", {d: `M${160 + i * 26} 700 A${650 - i * 26} ${650 - i * 26} 0 0 1 ${1460 - i * 26} 700`, fill: "none", stroke: col, "stroke-width": 27, opacity: .8}, c.bow));
  c.far = el("g", {}, st); skyline(c.far, -150, 705, "#6f93bd"); seed = 23; let x = 880; while (x < 1790) { const w = 50 + rnd() * 70, h = 110 + rnd() * 190; el("rect", {x, y: 705 - h, width: w, height: h, rx: 4, fill: "#6f93bd"}, c.far); x += w + 8; }
  c.near = el("g", {}, st);
  [[-140, 300, 250, "#f4d6a0", "#e76f51"], [215, 250, 330, "#f1faee", "#3a86ff"], [880, 290, 300, "#f6e3b4", "#2a9d8f"], [1235, 250, 240, "#f1faee", "#e76f51"], [1530, 300, 330, "#f4d6a0", "#3a86ff"]].forEach(([bx, w, h, col, band], i) => hdb4(c.near, bx, 800, w, h, col, {band, sd: 31 + i}));
  [[520, 1], [640, .8], [760, 1.05], [1195, .9], [1500, .85]].forEach(([tx_, s]) => tree4(c.near, tx_, 802, s));
  c.road = el("g", {}, st); el("rect", {x: FULL.x, y: 800, width: FULL.w, height: 240, fill: "#5d6b82"}, c.road); el("rect", {x: FULL.x, y: 796, width: FULL.w, height: 14, fill: "#cfd8e3", stroke: INK, "stroke-width": 4}, c.road);
  for (let i = 0; i < 9; i++) el("rect", {x: -120 + i * 220, y: 892, width: 110, height: 12, rx: 6, fill: "#fff", opacity: .75}, c.road);
  c.pud = el("g", {opacity: 0}, c.road); [[150, 850, 150], [700, 868, 210], [1300, 846, 170]].forEach(([px, py, w]) => { el("ellipse", {cx: px, cy: py, rx: w, ry: 20, fill: "#9ad1f5", stroke: INK, "stroke-width": 3, opacity: .9}, c.pud); el("ellipse", {cx: px - w * .3, cy: py - 4, rx: w * .3, ry: 5, fill: "#fff", opacity: .6}, c.pud); });
  c.dark = fullRect(st, "#16213e", 0);
  c.clouds = [[300, 90, 520, 3], [820, 40, 640, 5], [1350, 110, 560, 7], [40, 210, 420, 9], [1100, 230, 480, 11], [600, 200, 500, 13], [1620, 250, 440, 15]].map(([cx, cy, w, sd]) => { const g = cloud4(st, sd, w, "#5c677d", 7); g.cx = cx; g.cy = cy; return g; });
  c.rain = rain4(st, 110, 5, {len: 60}); c.flash = fullRect(st, "#fff", 0);
  // k = how stormy (0 clear .. 1 dark), r = how hard it rains, t = time
  c.set = (t, k, r, bow = 0) => { set(c.sky, "fill", mix("#7cc6f2", "#4a5878", k)); op(c.hi, 1 - k); op(c.dark, .42 * k); op(c.sun, 1 - k * 1.4);
    c.clouds.forEach((g, i) => { const e = ease(clamp(k * 1.5 - i * .06)); at4(g, g.cx + (1 - e) * (1900 - i * 60), g.cy - (1 - e) * 260); });
    op(c.rain.G, r); if (r > 0) runRain4(c.rain, t); op(c.pud, clamp(r * 2 + bow)); op(c.bow, bow * .9); };
  return c; }

/* ---------- Singapore close-up: real coastline (Natural Earth, made by ep04/sg_geo.py); reservoirs and the Kallang River at their real positions ---------- */
const SG4 = {"land": "M1654 -160L1665 -98L1714 33L1737 143L1739 203L1723 230L1703 251L1710 356L1698 393L1607 393L1595 401L1570 436L1558 444L1450 439L1403 429L1306 390L1287 374L1285 350L1286 304L1273 270L1245 244L1212 222L1188 198L1175 110L1239 68L1328 33L1386 -34L1341 -45L1299 -33L1259 -10L1178 51L1160 60L1152 43L1137 -0L1061 -158L1060 -160L977 -160L1052 -42L1053 -9L1040 58L1046 90L1056 124L1062 161L1055 198L971 267L856 239L647 131L586 136L490 186L439 198L342 190L306 193L267 214L144 369L72 426L-13 411L-17 400L-35 375L-53 358L-62 370L-59 397L-48 432L-46 452L-52 479L-95 542L-129 626L-158 579L-242 507L-260 483L-260 -160ZM1383 890L1398 939L1396 988L1358 1120L1288 1120L1286 1119L1286 1120L818 1120L808 1103L798 1058L826 1035L849 1044L884 1084L910 1086L927 1071L925 1050L915 1026L904 976L896 961L899 950L926 937L953 935L1002 953L1023 955L1059 927L1078 846L1106 824L1131 839L1202 925L1237 955L1252 926L1252 895L1240 864L1221 839L1249 824L1280 820L1310 825L1338 840L1364 862L1375 875L1383 890ZM1604 1120L1591 1093L1589 1051L1647 1014L1764 971L1792 956L1805 942L1830 904L1840 879L1841 858L1851 844L1880 840L1880 1120ZM938 336L998 350L1031 362L1040 377L1012 423L972 472L922 511L869 527L809 534L762 552L679 609L665 622L658 630L645 636L614 640L556 639L527 632L515 618L494 585L444 562L384 548L333 542L229 545L186 535L169 501L179 464L251 362L261 317L273 291L300 264L332 244L355 240L407 247L461 240L528 209L564 198L628 202L689 222L870 312L938 336ZM1448 1120L1459 1115L1479 1112L1474 1120ZM579 1037L588 1037L590 1044L583 1045Z",
  "res": [["MacRitchie Reservoir", [614, 449]], ["Marina Reservoir", [713, 586]], ["Kranji Reservoir", [403, 238]], ["Bedok Reservoir", [852, 454]], ["", [540, 382]], ["", [617, 384]], ["", [559, 308]], ["", [631, 291]], ["", [410, 519]], ["", [377, 456]], ["", [833, 332]], ["", [804, 310]], ["", [187, 447]], ["", [221, 360]], ["", [252, 324]], ["", [288, 267]]],
  "kallang": [[617, 384], [653, 416], [679, 437], [710, 476], [722, 512], [715, 548], [713, 586]]};
function sgMap4(p) { const g = el("g", {}, p); el("rect", {x: 0, y: 0, width: 1200, height: 900, fill: "#48cae4"}, g);
  el("path", {d: SG4.land, fill: "#95d5b2", stroke: INK, "stroke-width": 5, "stroke-linejoin": "round"}, g);
  tx(g, {x: 120, y: 150, "font-size": 34, "font-weight": 700, fill: INK, opacity: .6}, "Johor, Malaysia"); tx(g, {x: 300, y: 760, "font-size": 30, "font-weight": 700, fill: "#fff", opacity: .9}, "Singapore Strait");
  tx(g, {x: 530, y: 196, "text-anchor": "middle", "font-size": 54, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 11, "letter-spacing": 3}, "SINGAPORE");
  const d = "M" + SG4.kallang.map(q => q.join(" ")).join(" L");
  g.river = el("g", {}, g); el("path", {d, fill: "none", stroke: INK, "stroke-width": 15, "stroke-linecap": "round", "stroke-linejoin": "round"}, g.river); el("path", {d, fill: "none", stroke: "#1d6fe0", "stroke-width": 9, "stroke-linecap": "round", "stroke-linejoin": "round"}, g.river);
  g.flow = el("path", {d, fill: "none", stroke: "#dff6ff", "stroke-width": 5, "stroke-dasharray": "10 16", "stroke-linecap": "round"}, g.river);
  g.res = SG4.res.map(([name, [x, y]]) => { const r = el("g", {transform: `translate(${x} ${y})`}, g); r.ring = el("circle", {r: 16, fill: "none", stroke: "#fff", "stroke-width": 5, opacity: 0}, r);
    el("circle", {r: name ? 15 : 10, fill: "#1d6fe0", stroke: "#fff", "stroke-width": name ? 5 : 3.5}, r); r.named = !!name; return r; });
  return g; }

// ---- HOOK: the monsoon is here; the afternoon sky turns dark, the rain pours down; where does it come from, where does it go?
S.hook = (() => { const s = scene("hook", "#7cc6f2", "#7cc6f2"), st = s.stage; s.c = city4(st);
  s.m1 = chip(st, "🌧️ The north-east monsoon is here", "#3a86ff", {fs: 44});
  s.mon = ["NOV", "DEC", "JAN"].map((m, i) => { const g = el("g", {}, st); el("rect", A4({x: -74, y: -62, width: 148, height: 124, rx: 18, fill: "#fffaf0"}), g); el("rect", {x: -74, y: -62, width: 148, height: 40, rx: 18, fill: "#e63946", stroke: INK, "stroke-width": 6}, g);
    tx(g, {x: 0, y: 36, "text-anchor": "middle", "font-size": 50, "font-weight": 700, fill: INK}, m); emo(g, 52, -70, 44, "🌧️"); g.i = i; return g; });
  s.wet = lab4(st, "Singapore's wettest months", 46, "#fff");
  s.clk = el("g", {}, st); el("circle", A4({r: 64, fill: "#fffaf0"}), s.clk); for (let i = 0; i < 12; i++) el("line", {x1: 0, y1: -54, x2: 0, y2: -46, stroke: INK, "stroke-width": 4, transform: `rotate(${i * 30})`}, s.clk);
  s.hh = el("line", {x1: 0, y1: 0, x2: 0, y2: -30, stroke: INK, "stroke-width": 8, "stroke-linecap": "round"}, s.clk); s.mh = el("line", {x1: 0, y1: 0, x2: 0, y2: -46, stroke: "#e63946", "stroke-width": 6, "stroke-linecap": "round"}, s.clk);
  s.q1 = el("g", {}, st); tx(s.q1, {x: 0, y: 0, "text-anchor": "middle", "font-size": 84, "font-weight": 700, fill: "#ffe14d", class: "out", "stroke-width": 15}, "Where does all this rain come from?");
  s.q2 = el("g", {}, st); tx(s.q2, {x: 0, y: 0, "text-anchor": "middle", "font-size": 84, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 15}, "And where does it go?");
  s.up = el("g", {}, st); el("path", A4({d: "M-22 60 V-10 H-52 L0 -70 L52 -10 H22 V60 Z", fill: "#ffe14d"}), s.up); s.dn = el("g", {}, st); el("path", A4({d: "M-22 -60 V10 H-52 L0 70 L52 10 H22 V-60 Z", fill: "#fff"}), s.dn);
  s.run = t => { const a = (w, f) => cue("hook", w, f), t0 = SC.hook.t0, td = a("dark", .55), tp = a("pours", .65), tq = a("where", .75), tg = a("go", .93), ta = a("afternoon", .42);
    const k = ramp(t, ta - .2, td + .5); s.c.set(t, k, ramp(t, tp - .5, tp + .6), 0);
    const fl = t - (tp + .15); op(s.c.flash, fl > 0 && fl < .5 ? (1 - fl / .5) * .55 * (fl < .08 || fl > .16 ? 1 : .3) : 0);
    popAt(s.m1, 600, 60, t, a("monsoon", .08)); op(s.m1, on(t, a("monsoon", .08) - .05, ta - .1, .2));
    const tw = a("wettest", .22); s.mon.forEach(g => { popAt(g, 420 + g.i * 180, 330, t, tw + g.i * .14); op(g, on(t, tw + g.i * .14, ta - .1, .2)); });
    popAt(s.wet, 600, 480, t, tw); op(s.wet, on(t, tw, ta - .1, .2));
    popAt(s.clk, 600, 300, t, ta); op(s.clk, on(t, ta, tq - .3, .25)); const hk = ramp(t, ta, td + .4); tf(s.hh, `rotate(${lerp(30, 105, hk)})`); tf(s.mh, `rotate(${lerp(0, 900, hk)})`);
    popAt(s.q1, 600, 300, t, tq); popAt(s.up, 600, 150 - 12 * Math.max(0, Math.sin((t - tq) * 5)) * (t > tq ? 1 : 0), t, tq + .25);
    popAt(s.q2, 600, 560, t, tg); popAt(s.dn, 600, 700 + 12 * Math.max(0, Math.sin((t - tg) * 5)) * (t > tg ? 1 : 0), t, tg + .25); }; return s; })();

// ---- LAST TIME'S ANSWER: a greasy food box in the blue recycling bin dirties the clean paper and plastic, so the whole load may be burnt
S.answer = (() => { const s = scene("answer", "#3a0ca3", "#4361ee"), st = s.stage;
  s.top = chip(st, "✅ Last time's answer", "#06d6a0", {fs: 44});
  s.q = lab4(st, "A greasy food box in the blue recycling bin?", 44, "#ffe14d");
  // the bin (a window cut in its front shows the load inside)
  s.bin = el("g", {}, st); const B = s.bin;
  el("ellipse", {cx: 0, cy: 262, rx: 250, ry: 22, fill: INK, opacity: .25}, B);
  [-150, 150].forEach(x => el("circle", A4({cx: x, cy: 240, r: 30, fill: "#343a40"}), B));
  s.lid = el("g", {}, B); el("path", A4({d: "M-236 0 H236 Q250 -8 240 -34 H-240 Q-250 -8 -236 0 Z", fill: "#1259a8"}), s.lid); el("rect", A4({x: -240, y: -226, width: 480, height: 26, rx: 10, fill: "#1259a8"}), B);
  el("path", A4({d: "M-225 -210 H225 L190 230 H-190 Z", fill: "#1d6fe0"}), B); el("path", {d: "M-225 -210 H-180 L-150 230 H-190 Z", fill: "#fff", opacity: .16}, B);
  const cp = clip4(c => el("rect", {x: -165, y: -150, width: 330, height: 250, rx: 26}, c));
  el("rect", A4({x: -165, y: -150, width: 330, height: 250, rx: 26, fill: "#0b2f5e"}), B); s.in = el("g", {"clip-path": cp}, B);
  const stain = (g, pts) => { g.st = el("g", {opacity: 0}, g); pts.forEach(([x, y, r]) => { el("circle", {cx: x, cy: y, r, fill: "#b5651d", opacity: .85}, g.st); el("circle", {cx: x + r * .3, cy: y - r * .2, r: r * .45, fill: "#e09f3e", opacity: .8}, g.st); }); };
  s.items = [];
  { const g = el("g", {}, s.in); [0, 1, 2, 3].forEach(i => el("rect", A4({x: -150, y: 60 - i * 15, width: 150, height: 15, rx: 3, fill: i % 2 ? "#f8f9fa" : "#e9ecef", "stroke-width": 3.5}), g)); stain(g, [[-90, 30, 22], [-40, 50, 16], [-120, 62, 13]]); s.items.push(g); }
  { const g = el("g", {}, s.in); el("rect", A4({x: 22, y: -22, width: 50, height: 110, rx: 16, fill: "#bde0fe", "stroke-width": 4}), g); el("rect", A4({x: 36, y: -44, width: 22, height: 24, rx: 4, fill: "#3a86ff", "stroke-width": 4}), g); el("rect", {x: 26, y: 22, width: 42, height: 28, fill: "#fff", opacity: .8}, g); stain(g, [[48, 10, 18], [40, 60, 12]]); s.items.push(g); }
  { const g = el("g", {}, s.in); el("rect", A4({x: 88, y: 14, width: 54, height: 78, rx: 8, fill: "#ef476f", "stroke-width": 4}), g); el("rect", {x: 88, y: 40, width: 54, height: 18, fill: "#fff", opacity: .85}, g); el("ellipse", A4({cx: 115, cy: 14, rx: 27, ry: 7, fill: "#ced4da", "stroke-width": 4}), g); stain(g, [[112, 66, 15]]); s.items.push(g); }
  { const g = el("g", {}, s.in); el("rect", A4({x: -150, y: -52, width: 120, height: 50, rx: 4, fill: "#fffaf0", "stroke-width": 3.5}), g); [-40, -28, -16].forEach(y => el("line", {x1: -138, y1: y, x2: -44, y2: y, stroke: "#adb5bd", "stroke-width": 4}, g)); stain(g, [[-100, -30, 20], [-60, -14, 12]]); s.items.push(g); }
  el("rect", {x: -165, y: -150, width: 330, height: 250, rx: 26, fill: "none", stroke: INK, "stroke-width": 6}, B);
  el("circle", A4({cx: 0, cy: 162, r: 40, fill: "#fff", "stroke-width": 5}), B); emo(B, 0, 164, 50, "♻️");
  s.box = el("g", {}, st); el("path", A4({d: "M-90 -34 H90 L80 46 H-80 Z", fill: "#c68e4e"}), s.box); el("path", A4({d: "M-90 -34 L-70 -74 H110 L90 -34 Z", fill: "#dba75f"}), s.box);
  [[-40, 6, 20], [20, 16, 26], [58, -6, 14], [-10, -54, 13], [50, -56, 10]].forEach(([x, y, r]) => { el("circle", {cx: x, cy: y, r, fill: "#a4551a", opacity: .75}, s.box); el("circle", {cx: x + 4, cy: y - 4, r: r * .45, fill: "#f4a261", opacity: .9}, s.box); });
  s.boxT = lab4(st, "greasy food box", 36, "#fff");
  s.drips = [[-70, .0], [-20, .25], [40, .1], [85, .4]].map(([x, d]) => ({e: el("ellipse", {cx: x, rx: 7, ry: 11, fill: "#e09f3e", stroke: INK, "stroke-width": 2.5}, s.in), d}));
  s.dirty = chip(st, "food and oil dirty the clean paper and plastic", "#b5651d", {fs: 38});
  // where the spoilt load goes: burnt, not recycled
  s.arr = el("g", {}, st); el("path", A4({d: "M-80 -16 H30 V-42 L92 0 L30 42 V16 H-80 Z", fill: "#ffe14d"}), s.arr);
  s.inc = el("g", {}, st); el("rect", A4({x: 60, y: -260, width: 60, height: 300, fill: "#adb5bd"}), s.inc); [-230, -190].forEach(y => el("rect", {x: 60, y, width: 60, height: 18, fill: "#e63946", stroke: INK, "stroke-width": 4}, s.inc));
  el("rect", A4({x: -190, y: -60, width: 330, height: 220, rx: 10, fill: "#ced4da"}), s.inc); el("rect", A4({x: -140, y: 30, width: 130, height: 130, rx: 10, fill: "#343a40"}), s.inc);
  s.fire = emo(s.inc, -75, 100, 100, "🔥"); s.smoke = [0, 1, 2].map(i => el("circle", {r: 30, fill: "#dee2e6", stroke: INK, "stroke-width": 4}, s.inc));
  s.burnt = chip(st, "the whole load may be burnt!", "#e63946", {fs: 40});
  s.keep = chip(st, "✅ Keep your recycling clean and dry!", "#06d6a0", {fs: 50, ink: INK});
  s.run = t => { const a = (w, f) => cue("answer", w, f), tg = a("greasy", .25), td = a("dirty", .45), tb = a("burnt", .72), tk = a("keep", .85);
    popAt(s.top, 700, 30, t, SC.answer.t0 - .2); popAt(s.q, 600, 112, t, a("why", .15)); op(s.q, on(t, a("why", .15), tb - .1, .2));
    popAt(s.bin, 330, 505, t, SC.answer.t0 + .1, 1.22); tf(s.lid, `translate(0 -222)`); op(s.lid, 1 - ramp(t, tg - .6, tg - .3));
    const kf = ease((t - tg) / .7), by = lerp(-90, 322, kf); at4(s.box, 330 + 30 * (1 - kf), by, lerp(1.5, 1.0, kf), lerp(-14, 6, kf)); op(s.box, t > tg - .3 ? 1 : 0);
    at4(s.boxT, 330, 196, Math.max(0, pop(t, tg + .1))); op(s.boxT, on(t, tg + .1, td - .1, .2));
    const kd = ramp(t, td, td + 2.2); s.items.forEach((g, i) => op(g.st, clamp(kd * 1.6 - i * .15)));
    s.drips.forEach(d => { const q = ((t - td) * .9 + d.d) % 1; set(d.e, "cy", lerp(-110, 70, q)); op(d.e, t > td - .2 && t < tk ? Math.sin(q * Math.PI) : 0); });
    popAt(s.dirty, 470, 852, t, td); op(s.dirty, on(t, td, tk - .15, .2));
    popAt(s.arr, 690, 520, t, tb - .3); popAt(s.inc, 970, 590, t, tb - .1, 1.25); const fk = 1 + .1 * Math.sin(t * 9); tf(s.fire, `translate(-75 150) scale(${fk}) translate(75 -150)`);
    s.smoke.forEach((e, i) => { const q = (((t - tb) * .35 + i / 3) % 1 + 1) % 1; set(e, "cx", 90 + q * 60); set(e, "cy", -280 - q * 150); set(e, "r", 20 + q * 34); op(e, t > tb ? (1 - q) * .9 : 0); });
    popAt(s.burnt, 760, 130, t, tb + .2); op(s.burnt, on(t, tb + .2, tk - .15, .2)); popAt(s.keep, 600, 852, t, tk); }; return s; })();

// ---- NEWS: the north-east monsoon (Nov to Jan), then Singapore close up: drains and canals carry rain into the reservoirs; two-thirds of the land is catchment
S.news = (() => { const s = scene("news", "#023e8a", "#0077b6"), st = s.stage;
  const cp = clip4(c => el("rect", {x: 0, y: 0, width: 1200, height: 900, rx: 40}, c)); s.box = el("g", {"clip-path": cp}, st);
  s.m1 = el("g", {}, s.box); s.map = regionMap(s.m1);
  s.sea = lab4(s.m1, "South China Sea", 38, "#fff"); at4(s.sea, 905, 172);
  const W = [["M900 200 Q800 250 668 372"], ["M1010 300 Q850 330 690 398"], ["M790 120 Q730 220 640 350"]];
  s.winds = W.map(([d]) => { const g = el("g", {}, s.m1); el("path", {d, fill: "none", stroke: INK, "stroke-width": 20, "stroke-linecap": "round"}, g);
    g.f = el("path", {d, fill: "none", stroke: "#fff", "stroke-width": 11, "stroke-linecap": "round", "stroke-dasharray": "26 20"}, g); const L = g.f.getTotalLength(), e = g.f.getPointAtLength(L), b = g.f.getPointAtLength(L - 12);
    el("path", A4({d: "M-4 -26 L34 0 L-4 26 Z", fill: "#fff", "stroke-width": 5, transform: `translate(${e.x} ${e.y}) rotate(${Math.atan2(e.y - b.y, e.x - b.x) * 180 / Math.PI})`}), g); return g; });
  s.wl = chip(s.m1, "north-east monsoon winds", "#3a86ff", {fs: 36});
  s.cl = [[640, 330, 190, 4], [560, 380, 150, 8]].map(([x, y, w, sd]) => { const g = cloud4(s.m1, sd, w, "#e9ecef"); g.x = x; g.y = y; return g; });
  s.r1 = rain4(s.m1, 16, 9, {x0: 520, w: 190, y0: 350, h: 110, len: 20, speed: 260, sw: 4, col: "#1d6fe0"});
  s.mon = ["NOV", "DEC", "JAN"].map((m, i) => { const g = el("g", {}, st); el("rect", A4({x: -66, y: -54, width: 132, height: 108, rx: 16, fill: "#fffaf0"}), g); el("rect", {x: -66, y: -54, width: 132, height: 36, rx: 16, fill: "#e63946", stroke: INK, "stroke-width": 6}, g);
    tx(g, {x: 0, y: 34, "text-anchor": "middle", "font-size": 44, "font-weight": 700, fill: INK}, m); g.i = i; return g; });
  s.heavy = chip(st, "🌧️ some of the heaviest rain of the year", "#1d3557", {fs: 40});
  // Singapore close up
  s.m2 = el("g", {opacity: 0}, s.box); s.sg = sgMap4(s.m2);
  s.rl = s.sg.res.filter(r => r.named).map((r, i) => { const [name, [x, y]] = SG4.res[i], g = lab4(s.m2, name, 38, "#fff", ["end", "start", "end", "start"][i]); at4(g, x + [-28, 30, -28, -40][i], y + [14, 30, 14, -30][i]); return g; });
  s.kl = lab4(s.m2, "Kallang River", 34, "#bde0fe", "start"); at4(s.kl, 746, 520);
  s.r2 = rain4(s.m2, 60, 12, {x0: 0, w: 1200, y0: 0, h: 900, len: 34, speed: 900, sw: 4, col: "#eaf6ff"});
  el("rect", {x: 0, y: 0, width: 1200, height: 900, rx: 40, fill: "none", stroke: INK, "stroke-width": 7}, st);
  s.dc = chip(st, "Drains and canals carry the rain into our reservoirs", "#1d6fe0", {fs: 40});
  // two-thirds: two of three equal parts
  s.two = el("g", {}, st); el("rect", A4({x: -470, y: -74, width: 940, height: 148, rx: 34, fill: "#fffaf0", filter: "url(#sh)"}), s.two);
  s.tiles = [0, 1, 2].map(i => { const g = el("g", {transform: `translate(${-400 + i * 62} 0) scale(.56)`}, s.two); el("rect", A4({x: -48, y: -48, width: 96, height: 96, rx: 16, fill: "#95d5b2", "stroke-width": 5}), g);
    g.f = el("g", {}, g); el("rect", A4({x: -48, y: -48, width: 96, height: 96, rx: 16, fill: "#3a86ff", "stroke-width": 5}), g.f); const d = drop4(g.f, 20, "#dff6ff"); at4(d, 0, 12); return g; });
  tx(s.two, {x: -220, y: -8, "font-size": 40, "font-weight": 700, fill: INK}, "About two-thirds of our land"); tx(s.two, {x: -220, y: 42, "font-size": 40, "font-weight": 700, fill: "#1d6fe0"}, "catches rain for us to use");
  s.run = t => { const a = (w, f) => cue("news", w, f), t0 = SC.news.t0, tm = a("monsoon", .1), tn = a("november", .22), th = a("heaviest", .38), tz = a("waste", .52) - .25, tdn = a("drains", .6), tr = a("reservoirs", .72), t2 = a("two-thirds", .82);
    const z = ramp(t, tz, tz + 1), sc = lerp(1, 5, z * z); tf(s.m1, `translate(612 418) scale(${sc}) translate(-612 -418)`); op(s.m1, 1 - ramp(t, tz + .45, tz + .9));
    s.winds.forEach((g, i) => { op(g, ramp(t, tm - .2 + i * .2, tm + .1 + i * .2)); set(g.f, "stroke-dashoffset", -t * 90); }); at4(s.sea, 905, 172, Math.max(0, pop(t, tm - .3)));
    popAt(s.wl, 930, 440, t, tm + .3); s.cl.forEach((g, i) => at4(g, g.x, g.y, Math.max(0, pop(t, th - .3 + i * .15, .5)))); op(s.r1.G, ramp(t, th, th + .4)); runRain4(s.r1, t);
    s.mon.forEach(g => { popAt(g, 150 + g.i * 150, 760, t, tn + g.i * .16); op(g, on(t, tn + g.i * .16, tz + .2, .2)); }); popAt(s.heavy, 640, 56, t, th); op(s.heavy, on(t, th, tz + .2, .2));
    op(s.m2, ramp(t, tz + .35, tz + .9)); const s2 = lerp(.55, 1, ramp(t, tz + .2, tz + 1.1)); tf(s.m2, `translate(600 430) scale(${s2}) translate(-600 -430)`);
    op(s.r2.G, .8 * on(t, tz + .6, t2 + 1.5, .5)); runRain4(s.r2, t);
    op(s.sg.river, ramp(t, tdn - .1, tdn + .4)); set(s.sg.flow, "stroke-dashoffset", -t * 60); op(s.kl, ramp(t, tdn + .1, tdn + .5));
    s.sg.res.forEach((r, i) => { const tt = tr - .2 + i * .05, k = Math.max(0, pop(t, tt)); set(r, "opacity", clamp(k)); const q = (((t - tt) * .7) % 1 + 1) % 1; set(r.ring, "r", 16 + q * 26); op(r.ring, t > tt && r.named ? (1 - q) * .9 : 0); });
    s.rl.forEach((g, i) => op(g, ramp(t, tr + i * .12, tr + .3 + i * .12)));
    popAt(s.dc, 640, 56, t, tdn); op(s.dc, ramp(t, tdn - .05, tdn + .1));
    popAt(s.two, 600, 790, t, t2 - .1); s.tiles.forEach((g, i) => op(g.f, i < 2 ? ramp(t, t2 + .25 + i * .3, t2 + .5 + i * .3) : 0)); }; return s; })();

// ---- RECAP: the journey as a loop of eight cards; each lights up as Heart names it, and Mo hops along (makeRecap from EP02, drawn anew)
function recapArt4(g, i) { const o = el("g", {}, g);
  if (i === 0) { el("rect", {x: -100, y: -96, width: 200, height: 86, fill: "#bde0fe"}, o); [-80, -40, 0, 40, 80].forEach((x, j) => el("circle", {cx: x, cy: -18 - (j % 2) * 8, r: 30, fill: "#2d9d5c", stroke: INK, "stroke-width": 3}, o));
    el("rect", {x: -100, y: -12, width: 200, height: 64, fill: "#3a86ff", stroke: INK, "stroke-width": 3}, o); at4(mol4(o, "mo", 18), 0, 18); }
  if (i === 1) { at4(sun4(o, 26), -56, -56); el("rect", {x: -100, y: 20, width: 200, height: 32, fill: "#3a86ff", stroke: INK, "stroke-width": 3}, o);
    [-20, 30, 76].forEach(x => el("path", {d: `M${x} 10 q-12 -18 0 -36 q12 -18 0 -36 M${x - 12} -48 L${x} -66 L${x + 12} -48`, fill: "none", stroke: "#f77f00", "stroke-width": 7, "stroke-linecap": "round", "stroke-linejoin": "round"}, o)); }
  if (i === 2) { [[-58, -40, "🏠"], [58, -40, "🌊"], [0, 26, "🏞️"]].forEach(([x, y, e]) => emo(o, x, y, 54, e)); at4(mol4(o, "friend", 13), -14, -44); at4(mol4(o, "friend", 13), 20, -8); }
  if (i === 3) { emo(o, -64, -52, 50, "❄️"); el("path", {d: "M-12 -26 l18 -12 l20 10 l6 22 l-14 16 l-24 -2 l-12 -16 Z", fill: "#a68a64", stroke: INK, "stroke-width": 4, "stroke-linejoin": "round", transform: "translate(18 0)"}, o);
    [[-22, -24], [58, -30], [8, 30], [56, 22]].forEach(([x, y]) => at4(mol4(o, "plain", 12), x, y)); }
  if (i === 4) { at4(cloud4(o, 5, 170, "#fff"), 0, -6); [[-40, -22], [0, -40], [36, -18], [-14, -2], [20, 6]].forEach(([x, y]) => el("circle", {cx: x, cy: y, r: 7, fill: "#4cc9f0", stroke: INK, "stroke-width": 2.5}, o)); }
  if (i === 5) { [[-70, -30, 9], [-52, 2, 9], [-78, 22, 9]].forEach(([x, y, r]) => el("circle", {cx: x, cy: y, r, fill: "#4cc9f0", stroke: INK, "stroke-width": 2.5}, o)); el("path", {d: "M-36 -4 H-8 M-18 -14 L-6 -4 L-18 6", fill: "none", stroke: INK, "stroke-width": 6, "stroke-linecap": "round", "stroke-linejoin": "round"}, o); at4(drop4(o, 40), 46, 2); }
  if (i === 6) { at4(cloud4(o, 6, 150, "#8d99ae"), 0, -62); [[-44, -14], [0, 6], [44, -10], [-22, 34], [24, 38]].forEach(([x, y]) => at4(drop4(o, 11), x, y)); }
  if (i === 7) { el("path", {d: "M-100 -60 H-60 L-36 30 H36 L60 -60 H100 V52 H-100 Z", fill: "#ced4da", stroke: INK, "stroke-width": 4, "stroke-linejoin": "round"}, o); el("path", {d: "M-52 -20 H52 L36 30 H-36 Z", fill: "#3a86ff", stroke: INK, "stroke-width": 3}, o);
    el("path", {d: "M-24 4 H18 M8 -8 L22 4 L8 16", fill: "none", stroke: "#fff", "stroke-width": 7, "stroke-linecap": "round", "stroke-linejoin": "round"}, o); }
  return o; }
S.recap = (() => { const s = scene("recap", "#fff3b0", "#ffd6a5"), st = s.stage;
  s.title = chip(st, "Your journey as a water molecule", "#7209b7", {fs: 40});
  const ST = [["MacRitchie Reservoir", "macritchie"], ["the Sun's heat: you evaporate", "evaporate"], ["friends join: puddle, sea, river", "friends"], ["cold sky: you condense", "cold"],
    ["a tiny droplet in a cloud", "droplet"], ["droplets join and grow", "joined"], ["you fall as rain", "rain"], ["drains and canals take you home", "drains"]];
  const P = i => i < 4 ? [150 + i * 300, 270] : [1050 - (i - 4) * 300, 650];
  s.loop = el("g", {}, st); ST.forEach((_, i) => { const [x, y] = P(i), [nx, ny] = P((i + 1) % 8), g = el("g", {}, s.loop), mx = (x + nx) / 2, my = (y + ny) / 2, r = Math.atan2(ny - y, nx - x) * 180 / Math.PI;
    el("path", A4({d: "M-24 -10 H4 V-22 L28 0 L4 22 V10 H-24 Z", fill: "#fff", "stroke-width": 4, transform: `translate(${mx} ${my}) rotate(${r})`}), g); });
  s.cards = ST.map(([lab, w], i) => { const g = el("g", {}, st), [x, y] = P(i);
    g.bg = el("rect", A4({x: -130, y: -150, width: 260, height: 300, rx: 30, fill: "#fff", filter: "url(#sh)"}), g); recapArt4(g, i);
    el("rect", {x: -130, y: 70, width: 260, height: 80, rx: 0, fill: INK, opacity: .06}, g);
    const words = lab.split(" "), mid = Math.ceil(words.join(" ").length / 2); let l1 = "", l2 = ""; words.forEach(wd => { if ((l1 + " " + wd).trim().length <= mid + 3 && !l2) l1 = (l1 + " " + wd).trim(); else l2 = (l2 + " " + wd).trim(); });
    tx(g, {x: 0, y: l2 ? 100 : 118, "text-anchor": "middle", "font-size": 27, "font-weight": 700, fill: INK, "data-fit": 236}, l1); if (l2) tx(g, {x: 0, y: 132, "text-anchor": "middle", "font-size": 27, "font-weight": 700, fill: INK, "data-fit": 236}, l2);
    el("circle", A4({cx: -104, cy: -124, r: 24, fill: "#7209b7", "stroke-width": 4}), g); tx(g, {x: -104, y: -113, "text-anchor": "middle", "font-size": 30, "font-weight": 700, fill: "#fff"}, String(i + 1)); g.x = x; g.y = y; g.w = w; return g; });
  s.me = el("g", {}, st); glow4(s.me, "#ffe14d", 70, .9, .3); s.mo = mol4(s.me, "mo", 26); const yt = tag4(s.me, "YOU", "#ffe14d", INK, 22); at4(yt, 0, 84);
  s.home = chip(st, "…and round again: the water cycle!", "#06d6a0", {fs: 44, ink: INK});
  s.run = t => { const tt = s.cards.map((g, i) => cue("recap", g.w, .12 + i * .1)), th = cue("recap", "home", .96);
    popAt(s.title, 600, 40, t, SC.recap.t0 - .2); op(s.title, on(t, SC.recap.t0 - .2, tt[0] - .3, .2));
    s.cards.forEach((g, i) => { const done = t >= tt[i] - .1, now = on(t, tt[i] - .1, (tt[i + 1] || th) - .1, .2); tf(g, `translate(${g.x} ${g.y}) scale(${1 + .13 * now})`); op(g, done ? 1 : .32); set(g.bg, "fill", now > .5 ? "#fffbe0" : "#fff"); set(g.bg, "stroke", now > .5 ? "#f72585" : INK); });
    let x = s.cards[0].x - 60, y = s.cards[0].y - 60, hop = 0; const stops = tt.concat([th]);
    stops.forEach((tw, i) => { const k = ease((t - (tw - .35)) / .5), c = s.cards[i % 8]; if (k > 0) { hop = Math.sin(clamp((t - (tw - .35)) / .5) * Math.PI); x = lerp(x, c.x + 78, k); y = lerp(y, c.y - 96, k); } });
    at4(s.me, x, y - hop * 46); face4(s.mo, t > th ? 1 : 0, 0); op(s.me, ramp(t, tt[0] - .5, tt[0] - .2));
    popAt(s.home, 600, 40, t, th + .1); }; return s; })();

// ---- THE TEXTBOOK LINK: the water cycle. Gains heat: evaporation (liquid -> gas, water vapour). Loses heat: condensation (gas -> liquid). Round and round.
S.cycle = (() => { const s = scene("cycle", "#bde0fe", "#e0f4ff"), st = s.stage;
  fullRect(st, gL([[0, "#8fd0ff"], [.75, "#e6f6ff"]]));
  s.sun = sun4(st, 70); at4(s.sun, 150, 170);
  // the land: a hill on the right, a town, a canal down to the reservoir on the left
  el("path", {d: "M430 1040 L470 720 Q560 640 700 620 Q900 560 1000 470 Q1090 400 1180 440 Q1300 500 1790 520 V1040 Z", fill: "#74c69d", stroke: INK, "stroke-width": 6, "stroke-linejoin": "round"}, st);
  el("path", {d: "M1000 470 Q1090 400 1180 440 Q1240 470 1330 484 Q1200 500 1090 560 Q1040 520 1000 470 Z", fill: "#52b788", opacity: .7}, st);
  [[1250, 500, .8], [1340, 510, .7], [1500, 520, .9], [1630, 524, .75]].forEach(([x, y, k]) => tree4(st, x, y, k));
  hdb4(st, 640, 634, 110, 120, "#f4d6a0", {sd: 3}); hdb4(st, 770, 606, 100, 150, "#f1faee", {band: "#3a86ff", sd: 4});
  s.water = el("path", {d: "M-170 700 Q-60 690 60 700 T300 700 T470 716 L440 1040 H-170 Z", fill: "#3a86ff", stroke: INK, "stroke-width": 6}, st);
  el("path", {d: "M-120 760 q40 -14 80 0 t80 0 M120 800 q40 -14 80 0 t80 0 M-60 850 q40 -14 80 0 t80 0", fill: "none", stroke: "#fff", "stroke-width": 5, opacity: .5, "stroke-linecap": "round"}, st);
  const cd = "M1010 560 Q900 640 760 690 Q600 740 468 740"; el("path", {d: cd, fill: "none", stroke: INK, "stroke-width": 34, "stroke-linecap": "round"}, st); el("path", {d: cd, fill: "none", stroke: "#ced4da", "stroke-width": 24, "stroke-linecap": "round"}, st);
  el("path", {d: cd, fill: "none", stroke: "#3a86ff", "stroke-width": 13, "stroke-linecap": "round"}, st); s.cf = el("path", {d: cd, fill: "none", stroke: "#dff6ff", "stroke-width": 5, "stroke-dasharray": "14 20", "stroke-linecap": "round"}, st);
  // heat rays from the Sun down to the water
  s.rays = [[230, 250, 300, 640], [200, 280, 180, 640], [260, 220, 410, 640]].map(([x1, y1, x2, y2]) => el("line", {x1, y1, x2, y2, stroke: "#ffb703", "stroke-width": 9, "stroke-dasharray": "22 18", "stroke-linecap": "round"}, st));
  // evaporation: wavy arrows up, with molecules leaving the water
  s.ev = el("g", {}, st); [[90, 0], [250, 1], [400, 2]].forEach(([x, j]) => { el("path", {d: `M${x} 686 q-26 -25 0 -50 q26 -25 0 -50 q-26 -25 0 -50`, fill: "none", stroke: INK, "stroke-width": 22, "stroke-linecap": "round"}, s.ev);
    el("path", {d: `M${x} 686 q-26 -25 0 -50 q26 -25 0 -50 q-26 -25 0 -50`, fill: "none", stroke: "#f77f00", "stroke-width": 12, "stroke-linecap": "round"}, s.ev); el("path", A4({d: `M${x - 30} 540 L${x} 492 L${x + 30} 540 Z`, fill: "#f77f00", "stroke-width": 5}), s.ev); });
  s.vap = [[380, 300], [500, 220], [640, 290], [760, 200], [820, 300], [460, 410]].map(([x, y], i) => { const g = mol4(st, "plain", 17); g.x = x; g.y = y; g.i = i; return g; });
  // the cloud, its drops, the rain
  s.cloud = cloud4(st, 21, 430, "#fff", 7); s.dots = el("g", {}, s.cloud); seed = 8; for (let i = 0; i < 26; i++) el("circle", {cx: (rnd() - .5) * 330, cy: -rnd() * 110 + 30, r: 6, fill: "#4cc9f0", stroke: INK, "stroke-width": 2}, s.dots);
  s.rain = rain4(st, 22, 4, {x0: 850, w: 320, y0: 380, h: 120, len: 26, speed: 330, sw: 6, col: "#1d6fe0", slant: -.1});
  // labels: processes are pills (with the change of state under them), things are white outlined words
  const proc = (name, sub, col) => { const g = el("g", {}, st); const c = chip(g, name, col, {fs: 44}); op(c, 1); g.sub = lab4(g, sub, 34, "#fff"); at4(g.sub, 0, 62); return g; };
  s.pE = proc("EVAPORATION", "liquid → gas", "#f77f00"); s.pC = proc("CONDENSATION", "gas → liquid", "#7209b7");
  s.hE = chip(st, "🔥 water gains heat", "#e63946", {fs: 30}); s.hC = chip(st, "❄️ water vapour loses heat", "#3a86ff", {fs: 30});
  s.lv = el("g", {}, st); at4(lab4(s.lv, "water vapour", 40, "#fff"), 0, 0); at4(lab4(s.lv, "(a gas: you cannot see it)", 28, "#fff"), 0, 40);
  s.lc = el("g", {}, st); at4(lab4(s.lc, "cloud: tiny drops", 34, "#fff", "start"), 0, 0); at4(lab4(s.lc, "of liquid water", 34, "#fff", "start"), 0, 40); s.lr = lab4(st, "rain", 40, "#fff", "start"); s.ld = lab4(st, "drains and canals", 32, "#fff"); s.lw = lab4(st, "reservoir", 38, "#fff"); s.ls = lab4(st, "the Sun", 32, "#fff");
  s.title = chip(st, "📘 Primary 4 Science: the water cycle", "#1d3557", {fs: 46});
  // real life (the teacher: link every idea to a Singapore moment): clothes drying on a bamboo pole; drops on a cold drink
  const real = (cap1, cap2, col, draw) => { const g = el("g", {}, st); el("circle", A4({r: 122, fill: col, "stroke-width": 8, filter: "url(#sh)"}), g); const m = el("g", {"clip-path": clip4(c => el("circle", {r: 118}, c))}, g); draw(m);
    el("circle", {r: 122, fill: "none", stroke: INK, "stroke-width": 8}, g); at4(lab4(g, cap1, 30, "#fff"), 0, 166); at4(lab4(g, cap2, 30, "#ffe14d"), 0, 202); return g; };
  s.rE = real("like clothes drying", "on a bamboo pole", "#bfe6ff", m => { hdb4(m, -130, 130, 150, 220, "#f4d6a0", {sd: 5}); el("rect", A4({x: -40, y: -34, width: 170, height: 12, rx: 6, fill: "#e9c46a", "stroke-width": 4}), m);
    [["#ef476f", -6], ["#06d6a0", 70]].forEach(([c, x]) => { const h = shirt4(m, c); tf(h, `translate(${x} -30) scale(.62) rotate(6)`); op(h.wet, 0); }); at4(sun4(m, 22), -74, -74); });
  s.rC = real("like the drops on", "a cold drink", "#ffe8c2", m => { el("rect", {x: -130, y: 62, width: 260, height: 70, fill: "#c98b5a"}, m); el("path", A4({d: "M-44 -78 L-34 66 H34 L44 -78 Z", fill: "#fff", "fill-opacity": .65, "stroke-width": 5}), m); el("path", {d: "M-40 -40 L-33 62 H33 L40 -40 Z", fill: "#8d5524", opacity: .85}, m);
    [[-18, -52], [10, -60], [22, -40]].forEach(([x, y]) => el("rect", A4({x: x - 13, y: y - 13, width: 26, height: 26, rx: 5, fill: "#dff6ff", "stroke-width": 3}), m)); el("line", {x1: 14, y1: -110, x2: -2, y2: 20, stroke: "#e63946", "stroke-width": 8, "stroke-linecap": "round"}, m);
    [[-52, -20], [-48, 22], [50, -6], [46, 34], [-56, 50], [54, -44]].forEach(([x, y]) => at4(drop4(m, 8, "#4cc9f0"), x, y)); });
  s.loopA = el("g", {}, st); [["M420 350 Q600 250 790 262", 0], ["M1150 520 Q1150 600 1060 610", 1], ["M430 800 Q250 830 120 760", 2]].forEach(([d]) => { const p = el("path", {d, fill: "none", stroke: "#ffe14d", "stroke-width": 12, "stroke-linecap": "round", "stroke-dasharray": "4 22"}, s.loopA); });
  s.round = chip(st, "🔁 round and round: the water cycle", "#06d6a0", {fs: 42, ink: INK});
  s.run = t => { const a = (w, f) => cue("cycle", w, f), t0 = SC.cycle.t0, tg = a("gains", .22), te = a("evaporates", .28), tl = a("liquid", .36), tv = a("vapour", .44), tlo = a("loses", .55), tc = a("condenses", .6), td = a("drops", .68), tr = a("round", .78);
    popAt(s.title, 700, 30, t, a("primary", .08)); op(s.title, on(t, a("primary", .08), tv - .2, .2)); at4(s.ls, 150, 326, Math.max(0, pop(t, t0 + .3))); at4(s.lw, 110, 820, Math.max(0, pop(t, t0 + .6)));
    tf(s.sun.rays, `rotate(${t * 8})`); s.rays.forEach(r => { op(r, on(t, tg, tlo, .3)); set(r, "stroke-dashoffset", -t * 70); });
    popAt(s.hE, 250, 760, t, tg); op(s.hE, on(t, tg, 1e9, .2));
    op(s.ev, ramp(t, te - .1, te + .3)); popAt(s.pE, 262, 392, t, te); op(s.pE.sub, ramp(t, tl - .1, tl + .2));
    s.vap.forEach(g => { const tt = tv - .3 + g.i * .12, k = ramp(t, tt, tt + .8); at4(g, lerp(250, g.x + 60, k) + 5 * Math.sin(t * 1.3 + g.i), lerp(600, g.y, k) + 5 * Math.cos(t * 1.1 + g.i * 2)); op(g, .9 * k); });
    popAt(s.lv, 600, 96, t, tv);
    popAt(s.hC, 1040, 36, t, tlo); const ck = Math.max(0, pop(t, tc - .2, .6)); at4(s.cloud, 1000, 340, ck); popAt(s.pC, 1000, 118, t, tc); at4(s.lc, 1262, 300, Math.max(0, pop(t, tc + .5)));
    op(s.rain.G, ramp(t, td - .1, td + .4)); runRain4(s.rain, t); at4(s.lr, 1200, 440, Math.max(0, pop(t, td)));
    at4(s.ld, 800, 760, Math.max(0, pop(t, td + .7))); set(s.cf, "stroke-dashoffset", -t * 60); op(s.cf, ramp(t, td + .3, td + .8));
    op(s.loopA, ramp(t, tr - .1, tr + .4)); [...s.loopA.children].forEach(p => set(p, "stroke-dashoffset", -t * 70)); popAt(s.round, 620, 868, t, tr + .2); popAt(s.rE, 1330, 690, t, te + 1.0); popAt(s.rC, 1620, 690, t, tc + 1.2); if (t > tr) op(s.hE, 0); }; return s; })();

// ---- SALT: sea water evaporates, the salt stays behind; rain is fresh water
function salt4(p, r = 16) { const g = el("g", {}, p); el("rect", {x: -r, y: -r, width: r * 2, height: r * 2, rx: r * .35, fill: "#f1f3f5", stroke: INK, "stroke-width": Math.max(2.5, r * .2)}, g);
  el("rect", {x: -r * .6, y: -r * .65, width: r * .5, height: r * .3, rx: r * .1, fill: "#fff"}, g); return g; }
S.salt = (() => { const s = scene("salt", "#0077b6", "#48cae4"), st = s.stage;
  fullRect(st, gL([[0, "#8fd0ff"], [.6, "#e6f6ff"]])); s.sun = sun4(st, 64); at4(s.sun, 120, 150);
  s.title = el("g", {}, st); tx(s.title, {x: 0, y: 0, "text-anchor": "middle", "font-size": 84, "font-weight": 700, fill: "#ffe14d", class: "out", "stroke-width": 14}, "😮 Here's a surprise!");
  // the sea (cut open so we can look in)
  s.sea = el("path", {d: "M-170 500 Q-80 480 10 500 T190 500 T370 500 T550 500 T730 500 T800 520 V1040 H-170 Z", fill: "#2a86e6", stroke: INK, "stroke-width": 6}, st);
  el("rect", {x: -170, y: 600, width: 980, height: 440, fill: gL([[0, "#1d6fe0", 0], [1, "#03045e", .6]])}, st);
  el("path", {d: "M800 520 Q860 560 880 700 Q900 820 1040 860 Q1300 900 1790 880 V1040 H800 Z", fill: "#e9c46a", stroke: INK, "stroke-width": 6, "stroke-linejoin": "round"}, st);
  seed = 4; s.mols = []; for (let i = 0; i < 9; i++) { const g = mol4(st, i < 5 ? "friend" : "plain", 36); g.x = -80 + i * 100 + rnd() * 20; g.y = 590 + (i % 3) * 95 + rnd() * 30; g.i = i; s.mols.push(g); }
  s.salts = []; for (let i = 0; i < 6; i++) { const g = salt4(st, 26); g.x = -30 + i * 140 + rnd() * 20; g.y = 640 + ((i + 1) % 3) * 90 + rnd() * 20; g.i = i; s.salts.push(g); }
  s.lsea = lab4(st, "the sea at East Coast Park", 44, "#fff", "start"); s.lsalt = el("g", {}, st); const sc = chip(s.lsalt, "the salt stays behind", "#f1f3f5", {fs: 44, ink: INK}); op(sc, 1);
  s.up = [0, 1, 2, 3].map(i => { const g = mol4(st, "friend", 40); g.i = i; return g; });
  s.lvap = lab4(st, "only the water evaporates", 44, "#fff");
  s.cloud = cloud4(st, 31, 400, "#fff", 7); s.rain = rain4(st, 16, 14, {x0: 880, w: 300, y0: 330, h: 250, len: 30, speed: 420, sw: 6, col: "#1d6fe0", slant: 0});
  s.glass = el("g", {}, st); el("path", A4({d: "M-80 -120 L-62 120 H62 L80 -120", fill: "#fff", "fill-opacity": .5}), s.glass); s.fill = el("path", {d: "M-70 0 L-62 116 H62 L70 0 Z", fill: "#4cc9f0", stroke: INK, "stroke-width": 4}, s.glass);
  s.fresh = chip(st, "💧 Rain is fresh water", "#06d6a0", {fs: 46, ink: INK}); s.tick = emo(st, 0, 0, 90, "✅");
  s.run = t => { const a = (w, f) => cue("salt", w, f), t0 = SC.salt.t0, te = a("evaporates", .35), ts = a("salt", .45), tf_ = a("fresh", .7), tse = a("sea", .92);
    popAt(s.title, 700, 90, t, t0); op(s.title, on(t, t0, te + .2, .25)); at4(s.lsea, -110, 452, Math.max(0, pop(t, t0 + .5)));
    s.mols.forEach(g => at4(g, g.x + 6 * wob4(t, 2.2, g.i), g.y + 6 * wob4(t, 1.9, g.i * 3)));
    s.salts.forEach(g => { const tt = ts + g.i * .12, j = on(t, tt, tt + .9, .2); at4(g, g.x + 3 * wob4(t, 1.6, g.i * 5), g.y - 60 * Math.abs(Math.sin(clamp((t - tt) / .9) * Math.PI)) * (t > tt && t < tt + .9 ? 1 : 0), 1 + .25 * j); });
    popAt(s.lsalt, 330, 868, t, ts + .3);
    s.up.forEach(g => { const tt = te - .2 + g.i * .55, k = clamp((t - tt) / 2.6), x = lerp(120 + g.i * 150, 900 + g.i * 40, ease(k)), y = lerp(540, 250, ease(k)) - 150 * Math.sin(k * Math.PI); at4(g, x, y, lerp(1, .55, k)); op(g, k > 0 ? 1 - ramp(k, .86, 1) : 0); face4(g, 1); });
    at4(s.lvap, 420, 230, Math.max(0, pop(t, te + .1))); op(s.lvap, on(t, te + .1, tf_ + .3, .25));
    at4(s.cloud, 1030, 250, Math.max(0, pop(t, te + 1.2, .6))); op(s.rain.G, ramp(t, tf_ - .3, tf_ + .2)); runRain4(s.rain, t);
    popAt(s.glass, 1030, 700, t, tf_ - .5); const fk = ramp(t, tf_, tf_ + 2.5); set(s.fill, "d", `M${-62 - 10 * fk} ${116 - 150 * fk} L-62 116 H62 L${62 + 10 * fk} ${116 - 150 * fk} Z`);
    popAt(s.fresh, 1060, 868, t, tf_ + .2); popAt(s.tick, 1150, 600, t, tse); }; return s; })();

// ---- TRY THIS: draw round a puddle with chalk, come back every hour, watch it shrink
S.try = (() => { const s = scene("try", "#d8e2dc", "#d8e2dc"), st = s.stage;
  fullRect(st, "#cfc6b8"); for (let i = 0; i < 9; i++) for (let j = 0; j < 6; j++) el("rect", {x: -160 + i * 220 + (j % 2) * 110, y: -70 + j * 190, width: 212, height: 182, rx: 10, fill: (i + j) % 2 ? "#d9d0c1" : "#e3dbcd", stroke: "#b8ad9b", "stroke-width": 4}, st);
  el("path", {d: "M-170 -80 H1790 V60 Q900 150 -170 40 Z", fill: "#fff", opacity: .25}, st);
  s.sun = sun4(st, 60); at4(s.sun, 1080, 110);
  const PD = "M-250 -30 C-270 -150 -90 -200 40 -170 C200 -210 330 -110 290 10 C330 130 150 190 20 160 C-120 210 -290 130 -250 -30 Z";
  s.pg = el("g", {}, st);
  s.lines = [1, .76, .52].map((k, i) => { const p = el("path", {d: PD, fill: "none", stroke: "#fff", "stroke-width": 11 / k, "stroke-linecap": "round", "stroke-dasharray": "2000", transform: `scale(${k})`, opacity: .95}, s.pg); p.L = p.getTotalLength(); p.k = k; return p; });
  s.wet = el("path", {d: PD, fill: "#8d8577", opacity: .35}, s.pg);
  s.pud = el("g", {}, s.pg); el("path", {d: PD, fill: "#5aa9e6", stroke: INK, "stroke-width": 6}, s.pud); el("path", {d: "M-170 -70 C-120 -130 -10 -140 60 -120", fill: "none", stroke: "#fff", "stroke-width": 14, "stroke-linecap": "round", opacity: .6}, s.pud); el("ellipse", {cx: 120, cy: 40, rx: 60, ry: 22, fill: "#fff", opacity: .25}, s.pud);
  s.chalk = el("g", {}, st); el("rect", A4({x: -14, y: -120, width: 28, height: 120, rx: 8, fill: "#fff", "stroke-width": 5}), s.chalk); el("rect", {x: -14, y: -120, width: 28, height: 50, rx: 8, fill: "#ffafcc", stroke: INK, "stroke-width": 5}, s.chalk);
  s.clock = el("g", {}, st); el("circle", A4({r: 84, fill: "#fffaf0", filter: "url(#sh)"}), s.clock); for (let i = 0; i < 12; i++) el("line", {x1: 0, y1: -72, x2: 0, y2: -60, stroke: INK, "stroke-width": 5, transform: `rotate(${i * 30})`}, s.clock);
  s.hh = el("line", {x1: 0, y1: 0, x2: 0, y2: -40, stroke: INK, "stroke-width": 10, "stroke-linecap": "round"}, s.clock); s.mh = el("line", {x1: 0, y1: 0, x2: 0, y2: -62, stroke: "#e63946", "stroke-width": 7, "stroke-linecap": "round"}, s.clock);
  s.hrs = ["now", "1 hour later", "2 hours later"].map(l => chip(st, l, "#1d3557", {fs: 40}));
  s.title = chip(st, "🧪 Try this at home!", "#7209b7", {fs: 50});
  s.c1 = chip(st, "1  Draw round a puddle with chalk", "#3a86ff", {fs: 46}); s.c2 = chip(st, "2  Come back every hour, and draw again", "#f77f00", {fs: 46});
  s.q = el("g", {}, st); tx(s.q, {x: 0, y: 0, "text-anchor": "middle", "font-size": 84, "font-weight": 700, fill: "#ffe14d", class: "out", "stroke-width": 15}, "Where did the water go?");
  s.run = t => { const a = (w, f) => cue("try", w, f), t0 = SC.try.t0, tc = a("chalk", .32) - .9, th = a("hour", .5), ta = a("again", .62), tsh = a("shrink", .75), tw = a("where", .86);
    popAt(s.title, 640, 44, t, t0 - .2); at4(s.pg, 540, 490, 1.3 * Math.max(0, pop(t, a("puddle", .2) - .3, .5)));
    const T = [[tc, tc + 1.4], [ta - .3, ta + .8], [tsh + .2, tsh + 1.2]], k1 = ramp(t, th, ta - .3), k2 = ramp(t, ta + .9, tsh + .2), sc = lerp(lerp(1, .76, k1), .52, k2); tf(s.pud, `scale(${sc})`);
    let cx = 900, cy = 760, cv = 0; s.lines.forEach((p, i) => { const k = clamp((t - T[i][0]) / (T[i][1] - T[i][0])); set(p, "stroke-dasharray", `${p.L * k} ${p.L}`); if (k > 0 && k < 1) { const q = p.getPointAtLength(p.L * k); cx = 540 + q.x * p.k * 1.3; cy = 490 + q.y * p.k * 1.3; cv = 1; } });
    at4(s.chalk, cx, cy, 1, 28); op(s.chalk, t > tc - .3 ? (cv ? 1 : .0 + ramp(t, tc - .3, tc)) * (cv || t < tc ? 1 : 0) : 0);
    popAt(s.clock, 1110, 330, t, th - .4, 1.2); const hk = k1 + k2; tf(s.hh, `rotate(${60 + hk * 30})`); tf(s.mh, `rotate(${hk * 360})`);
    const hi = t < th + .3 ? 0 : t < ta + 1.2 ? 1 : 2; s.hrs.forEach((c, i) => { popAt(c, 1110, 480, t, [th - .3, th + .3, ta + 1.2][i]); op(c, i === hi && t > th - .3 ? 1 : 0); });
    popAt(s.c1, 600, 856, t, tc); op(s.c1, on(t, tc, th - .1, .2)); popAt(s.c2, 600, 856, t, th); op(s.c2, on(t, th, tw - .1, .2));
    popAt(s.q, 600, 880 - 40, t, tw); }; return s; })();

// ---- THINK ABOUT IT: wet clothes on a sunny, windy day and on a cloudy, still day
function shirt4(p, col) { const g = el("g", {}, p); el("path", A4({d: "M-50 0 L-86 28 L-66 56 L-46 44 V150 H46 V44 L66 56 L86 28 L50 0 Q0 26 -50 0 Z", fill: col, "stroke-width": 5}), g);
  g.wet = el("path", {d: "M-46 60 H46 V150 H-46 Z", fill: "#1b1b3a", opacity: .3}, g); el("rect", A4({x: -9, y: -16, width: 18, height: 30, rx: 5, fill: "#ffd166", "stroke-width": 4}), g); return g; }
S.think = (() => { const s = scene("think", "#3a0ca3", "#7209b7"), st = s.stage;
  s.title = tx(st, {x: 600, y: 84, "text-anchor": "middle", "font-size": 76, "font-weight": 700, fill: "#ffe14d", class: "out", "stroke-width": 12}, "🤔 Think about it!");
  const panel = (x, sunny) => { const g = el("g", {}, st), cp = clip4(c => el("rect", {x: -270, y: -280, width: 540, height: 560, rx: 36}, c)), m = el("g", {"clip-path": cp}, g);
    el("rect", {x: -270, y: -280, width: 540, height: 560, fill: sunny ? gL([[0, "#56b8f5"], [1, "#d6f1ff"]]) : gL([[0, "#8d99ae"], [1, "#ced4da"]])}, m);
    if (sunny) { g.sun = sun4(m, 54); at4(g.sun, -170, -180); } else g.cl = [[-120, -170, 260, 3], [120, -200, 300, 6], [20, -110, 240, 9]].map(([cx, cy, w, sd]) => at4(cloud4(m, sd, w, "#adb5bd"), cx, cy) || 0);
    hdb4(m, -270, 300, 220, 250, sunny ? "#f4d6a0" : "#cdbf9f", {sd: 12}); hdb4(m, 60, 300, 230, 200, sunny ? "#f1faee" : "#cfd6d2", {band: "#3a86ff", sd: 14});
    g.wind = sunny ? [0, 1, 2, 3].map(i => el("path", {d: "M0 0 q30 -16 60 0 t60 0", fill: "none", stroke: "#fff", "stroke-width": 8, "stroke-linecap": "round", opacity: .9}, m)) : [];
    el("rect", A4({x: -250, y: -30, width: 500, height: 14, rx: 7, fill: "#e9c46a", "stroke-width": 4}), m);
    g.sh = [["#ef476f", -150], ["#06d6a0", 0], ["#ffd166", 150]].map(([col, sx]) => { const h = el("g", {}, m); h.s = shirt4(h, col); h.x = sx; return h; });
    g.drips = [0, 1, 2, 3, 4, 5].map(i => ({e: el("ellipse", {rx: 5, ry: 9, fill: "#4cc9f0", stroke: INK, "stroke-width": 2}, m), i}));
    el("rect", {x: -270, y: -280, width: 540, height: 560, rx: 36, fill: "none", stroke: INK, "stroke-width": 8}, g);
    g.lab = chip(g, sunny ? "☀️ sunny, windy day" : "☁️ cloudy, still day", sunny ? "#f77f00" : "#6c757d", {fs: 40}); at4(g.lab, 0, 330); g.x = x; g.sunny = sunny; return g; };
  s.L = panel(300, true); s.R = panel(900, false);
  s.fast = chip(st, "dries faster!", "#06d6a0", {fs: 40, ink: INK}); s.q = emo(st, 600, 400, 130, "❓");
  s.ans = chip(st, has("think", "next") ? "Answer next time!" : "▶ Full episode: TheOneApp, Explored", "#f72585", {fs: 46});
  s.run = t => { const a = (w, f) => cue("think", w, f), t0 = SC.think.t0, tw = a("why", .15), ts = a("sunny", .45), tc = a("cloudy", .68), tn = a("next", .92);
    popAt(s.title, 0, 0, t, t0 - .2);
    [s.L, s.R].forEach(g => { const tt = g.sunny ? ts - .4 : tc - .4; at4(g, g.x + (g.sunny ? -14 : 14), 440, 1.06 * Math.max(0, pop(t, Math.min(tt, tw + .6 + (g.sunny ? 0 : .2)), .5))); op(g.lab, ramp(t, tt + .3, tt + .5));
      const dry = g.sunny ? ramp(t, ts, ts + 5) : ramp(t, ts, ts + 5) * .25;
      g.sh.forEach((h, i) => { at4(h, h.x, -24, 1, g.sunny ? 9 * Math.sin(t * 3.2 + i * .9) + 6 : 0); set(h.s.wet, "d", `M-46 ${60 + 90 * dry} H46 V150 H-46 Z`); });
      g.drips.forEach(d => { const q = (t * (.9 + d.i * .07) + d.i * .37) % 1, hx = g.sh[d.i % 3].x + (d.i % 2 ? 22 : -20); set(d.e, "cx", hx); set(d.e, "cy", 130 + q * 130); op(d.e, (1 - q) * (g.sunny ? 1 - ramp(t, ts + 1, ts + 3.5) : 1)); });
      g.wind.forEach((w, i) => { const q = (t * .7 + i * .25) % 1; at4(w, -300 + q * 600, -150 + i * 62); op(w, Math.sin(q * Math.PI) * .9); }); if (g.sun) tf(g.sun.rays, `rotate(${t * 10})`); });
    popAt(s.fast, 300, 190, t, a("faster", .35)); tf(s.q, `translate(600 400) scale(${Math.max(0, pop(t, tw)) * (1 + .06 * Math.sin(t * 5))}) translate(-600 -400)`);
    popAt(s.ans, 600, 880 - 26, t, tn); }; return s; })();

// ---- CLOSE: what to remember (rows from CFG.close), then the teaser (S.close from EP02, with the cycle drawn behind)
S.close = (() => { const s = scene("close", "#f15bb5", "#fee440"), st = s.stage;
  const CL = CFG.close || {}, rows = CL.rows || [];
  s.rows = rows.map(([e, lab, w, f, col], i) => ({c: chip(st, e + "  " + lab, col, {fs: 50}), w, f, y: 130 + i * (rows.length > 3 ? 150 : 170)}));
  s.again = chip(st, "🔁 …then it all starts again", "#06d6a0", {fs: 46, ink: INK});
  s.mo = el("g", {}, st); s.m = mol4(s.mo, "mo", 60);
  s.tease = chip(st, CL.tease || "Next time!", "#3a0ca3", {fs: 48});
  s.run = t => { const tn = cue("close", CL.teaseWord || "next", .85), ta = cue("close", "again", .75);
    s.rows.forEach(r => { const tw = cue("close", r.w, r.f); popAt(r.c, 600, r.y, t, tw); op(r.c, ramp(t, tw - .05, tw + .1) * (1 - .6 * ramp(t, tn - .2, tn + .3))); });
    popAt(s.again, 600, 640, t, ta); op(s.again, ramp(t, ta - .05, ta + .1) * (1 - .6 * ramp(t, tn - .2, tn + .3)));
    at4(s.mo, 1350, 560, Math.max(0, pop(t, SC.close.t0 + .2))); wave4(s.m, 1, -26 * Math.max(0, Math.sin(t * 6))); face4(s.m, 1);
    popAt(s.tease, 600, 830, t, tn); }; return s; })();
