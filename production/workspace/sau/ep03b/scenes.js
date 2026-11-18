/* TheOneApp, Explored EP03 Part 2: Where does our rubbish go? Load after common.js, geo_map.js and before ep03b/pov.js.
   Scenes draw in a 1200 x 900 box; narrated scenes take their times from cue(scene, word, fallback).
   Helpers copied from EP02 under new names: r3Kid (the pupil, ep02/coldopen.js), FR3 (FR), S.close and the recap board idea. */
/* made by ep03b/sg_geo.py from Natural Earth coastlines: 3300 px per degree, (103.82 E, 1.31 N) at (810, 480) */
const SG3 = {"land": "M2254 -500L2274 -385L2300 -316L2300 291L2195 291L2178 302L2144 350L2128 361L1978 354L1914 340L1780 287L1754 265L1751 231L1754 168L1736 121L1696 86L1651 55L1618 23L1600 -99L1689 -156L1811 -205L1891 -297L1829 -311L1771 -296L1716 -263L1605 -180L1580 -168L1568 -190L1549 -250L1444 -467L1422 -500L1310 -500L1431 -308L1433 -262L1415 -170L1423 -127L1437 -79L1445 -29L1436 23L1320 118L1162 78L875 -70L791 -63L659 6L589 23L456 11L406 16L353 45L183 257L84 337L-32 315L-39 300L-63 266L-88 242L-100 258L-97 295L-81 345L-78 372L-86 408L-145 496L-192 611L-233 546L-348 447L-395 383L-423 317L-530 -41L-591 -168L-684 -274L-700 -284L-700 -500ZM873 1500L872 1493L892 1461L931 1456L988 1491L987 1464L1008 1399L1050 1456L1104 1483L1159 1500ZM-434 1461L-428 1483L-428 1500L-587 1500L-641 1471L-700 1485L-700 1077L-687 1070L-653 1063L-610 1073L-604 1099L-615 1134L-618 1174L-599 1252L-583 1291L-563 1322L-544 1334L-501 1339L-482 1347L-472 1362L-472 1377L-473 1393L-471 1409L-463 1423L-442 1446L-434 1461ZM1887 973L1907 1041L1905 1109L1837 1342L1811 1339L1754 1288L1748 1312L1748 1333L1756 1353L1776 1378L1749 1393L1736 1414L1727 1440L1709 1471L1706 1485L1708 1500L1443 1500L1391 1471L1364 1468L1294 1476L1258 1471L1241 1456L1134 1334L1096 1266L1083 1204L1120 1174L1153 1186L1200 1240L1236 1244L1260 1223L1257 1194L1243 1161L1228 1091L1217 1071L1221 1057L1258 1038L1295 1035L1363 1060L1391 1063L1441 1025L1467 913L1506 883L1540 904L1638 1021L1686 1063L1706 1023L1706 980L1690 939L1663 903L1703 883L1745 878L1786 885L1825 905L1860 935L1875 954L1887 973ZM2300 1491L2298 1491L2215 1446L2201 1386L2204 1319L2172 1254L2169 1195L2250 1144L2300 1126ZM1275 212L1357 231L1402 248L1415 268L1377 332L1321 399L1253 453L1179 475L1098 484L1033 509L918 588L899 606L889 617L872 624L830 631L749 629L710 619L693 599L664 554L596 523L514 503L443 496L299 499L241 485L217 440L232 387L330 248L344 186L361 150L398 113L442 86L473 81L545 90L619 81L711 37L760 23L848 28L933 55L1181 179L1275 212ZM1922 1500L1922 1464L1940 1447L1977 1443L1988 1431L2002 1408L2018 1421L2028 1449L2023 1463L2000 1487L2000 1500ZM667 1500L664 1473L653 1453L636 1460L617 1475L606 1461L615 1425L610 1399L658 1353L660 1333L675 1333L707 1348L721 1341L734 1351L747 1398L747 1439L743 1455L749 1500ZM1953 1407L1938 1360L1950 1320L1950 1302L1991 1283L2018 1279L2008 1298L2037 1341L2032 1369L2017 1385L1992 1406L1973 1427L1953 1407ZM781 1176L793 1176L806 1195L785 1221L753 1211L731 1183L748 1140L773 1164L781 1176ZM481 1116L482 1115L483 1121L479 1123L477 1122L474 1117L480 1114L481 1116ZM1033 998L1040 982L1048 1028L1036 1032L1003 1024L1017 998L1033 998ZM968 993L965 971L981 977L968 993ZM-578 982L-556 1008L-550 1052L-603 1055L-650 988L-604 951L-578 982ZM-524 394L-491 371L-455 427L-466 457L-495 481L-502 481L-515 467L-524 394Z", "tuas": [203, 638], "tuas0": [262, 498], "sem": [652, 826], "mid": [810, 332]};

const FR3 = name => { const c = SC[name]; return c ? (tt => clamp((tt - c.t0) / Math.max(.1, c.t1 - c.t0))) : (() => 0); };
const r3Defs = () => $("v").querySelector("defs");
function r3GL(stops, a = {}) { const id = "r3l" + (r3GL.n = (r3GL.n || 0) + 1), g = el("linearGradient", Object.assign({id, x1: 0, y1: 0, x2: 0, y2: 1}, a), r3Defs());
  stops.forEach(([o, c, al]) => el("stop", {offset: o, "stop-color": c, "stop-opacity": al === undefined ? 1 : al}, g)); return `url(#${id})`; }
function r3GR(stops, a = {}) { const id = "r3r" + (r3GR.n = (r3GR.n || 0) + 1), g = el("radialGradient", Object.assign({id, cx: .5, cy: .5, r: .5}, a), r3Defs());
  stops.forEach(([o, c, al]) => el("stop", {offset: o, "stop-color": c, "stop-opacity": al === undefined ? 1 : al}, g)); return `url(#${id})`; }
const R3O = {stroke: INK, "stroke-width": 6, "stroke-linejoin": "round", "stroke-linecap": "round"}, R3A = (a, b) => Object.assign({}, R3O, a, b || {});
const CURRY = "#f0a202", CURRY2 = "#c77700";
function r3Lab(p, x, y, s, fs = 34, fill = "#fff") { return tx(p, {x, y, "text-anchor": "middle", "font-size": fs, "font-weight": 700, fill, class: "out", "stroke-width": fs * .22}, s); }

/* ---- the takeaway box, covered in curry (the hero). Centre 0,0; about 240 wide. o.face: eyes and a mouth (it is "you"). */
function r3Box(p, o = {}) { const g = el("g", {}, p);
  g.sh = el("ellipse", {cx: 0, cy: 74, rx: 118, ry: 13, fill: INK, opacity: .2}, g);
  g.lidIn = el("g", {opacity: 0}, g); el("path", R3A({d: "M-112 -12 L-100 -84 Q-98 -94 -88 -94 L88 -94 Q98 -94 100 -84 L112 -12 Z", fill: "#efe6d0"}), g.lidIn);
  el("path", {d: "M-70 -30 q30 -40 62 -8 q30 -26 66 2 q-60 14 -128 6 Z", fill: CURRY, opacity: .8}, g.lidIn);
  g.food = el("g", {opacity: 0}, g); el("ellipse", R3A({cx: 0, cy: -14, rx: 104, ry: 15, fill: CURRY, "stroke-width": 5}), g.food);
  seed = 5; for (let i = 0; i < 9; i++) el("ellipse", {cx: -70 + rnd() * 140, cy: -22 + rnd() * 10, rx: 9, ry: 5, fill: "#fff", stroke: INK, "stroke-width": 2}, g.food);
  el("path", R3A({d: "M-110 -10 L110 -10 L97 60 Q95 72 84 72 L-84 72 Q-95 72 -97 60 Z", fill: "#fffdf5"}), g);
  el("path", {d: "M-96 40 L96 40 L94 58 Q92 68 84 68 L-84 68 Q-92 68 -94 58 Z", fill: "#e9e2cf"}, g);
  // curry running down the front
  el("path", {d: "M-84 -8 C-84 34 -62 40 -58 14 C-56 52 -30 58 -28 16 C-22 34 -6 32 -2 -8 Z", fill: CURRY, stroke: CURRY2, "stroke-width": 3.5, "stroke-linejoin": "round"}, g);
  el("path", {d: "M44 -8 C46 22 62 26 64 6 C68 30 84 28 86 -8 Z", fill: CURRY, stroke: CURRY2, "stroke-width": 3.5, "stroke-linejoin": "round"}, g);
  [[-66, 4, 5], [-40, 26, 4], [70, 2, 4]].forEach(([x, y, r]) => el("circle", {cx: x, cy: y, r, fill: "#ffd166", opacity: .8}, g));
  [[24, 46, 7], [-8, 54, 5], [96, 30, 4]].forEach(([x, y, r]) => el("circle", {cx: x, cy: y, r, fill: CURRY, stroke: CURRY2, "stroke-width": 2.5}, g));
  g.lid = el("g", {}, g); el("path", R3A({d: "M-114 -12 L-100 -66 Q-97 -78 -86 -78 L86 -78 Q97 -78 100 -66 L114 -12 Z", fill: "#fff"}), g.lid);
  el("path", {d: "M-84 -58 H84 M-90 -40 H90", fill: "none", stroke: "#d8d2c0", "stroke-width": 5, "stroke-linecap": "round"}, g.lid);
  el("path", {d: "M-60 -76 C-70 -44 -44 -34 -30 -52 C-24 -30 4 -30 2 -62 C10 -50 24 -56 20 -76 Z", fill: CURRY, stroke: CURRY2, "stroke-width": 3.5, "stroke-linejoin": "round"}, g.lid);
  el("ellipse", {cx: 62, cy: -34, rx: 20, ry: 9, fill: CURRY, stroke: CURRY2, "stroke-width": 3, transform: "rotate(-14 62 -34)"}, g.lid);
  el("rect", R3A({x: -122, y: -20, width: 244, height: 16, rx: 8, fill: "#f4efdf", "stroke-width": 5}), g.lid);
  el("rect", R3A({x: -24, y: -22, width: 48, height: 26, rx: 8, fill: "#fff", "stroke-width": 5}), g.lid);
  if (o.face) { g.face = el("g", {}, g); g.eyes = el("g", {}, g.face);
    [-34, 34].forEach(x => { el("ellipse", {cx: x, cy: 22, rx: 15, ry: 18, fill: "#fff", stroke: INK, "stroke-width": 4}, g.eyes); g["pu" + (x < 0 ? 0 : 1)] = el("circle", {cx: x + 2, cy: 25, r: 8, fill: INK}, g.eyes); el("circle", {cx: x + 5, cy: 20, r: 3, fill: "#fff"}, g.eyes); });
    g.m0 = el("path", {d: "M-12 50 Q0 60 12 50", fill: "none", stroke: INK, "stroke-width": 5, "stroke-linecap": "round"}, g.face);
    g.m1 = el("ellipse", {cx: 0, cy: 54, rx: 10, ry: 12, fill: "#7a1c1c", stroke: INK, "stroke-width": 4, opacity: 0}, g.face); }
  // open(k): k = 0 open (the lid stands up behind, food showing), k = 1 closed
  g.open = k => { op(g.lidIn, k < .5 ? 1 : 0); op(g.food, k < .9 ? 1 : 0); op(g.lid, k >= .5 ? 1 : 0);
    tf(g.lidIn, `translate(0 -12) scale(1 ${lerp(1.25, .06, clamp(k * 2))}) translate(0 12)`); tf(g.lid, `translate(0 -12) scale(1 ${lerp(.06, 1, clamp(k * 2 - 1))}) translate(0 12)`); };
  return g; }
// a tied rubbish bag (centre 0,0, about 150 wide)
function r3Bag(p, col = "#495057", k = 1) { const g = el("g", {transform: `scale(${k})`}, p);
  el("path", R3A({d: "M-14 -70 Q-70 -50 -74 10 Q-76 70 -30 78 H34 Q78 68 74 8 Q70 -52 14 -70 Z", fill: col}), g);
  el("path", R3A({d: "M-14 -70 L-30 -104 Q-8 -92 0 -100 Q10 -92 30 -106 L14 -70 Z", fill: col}), g);
  el("path", {d: "M-44 -20 Q-50 20 -34 50 M30 -30 Q46 0 40 40", fill: "none", stroke: "#fff", "stroke-width": 6, "stroke-linecap": "round", opacity: .25}, g); return g; }
// the blue recycling bin (base at 0,0)
function r3Bin(p, k = 1) { const g = el("g", {transform: `scale(${k})`}, p);
  el("ellipse", {cx: 0, cy: 0, rx: 92, ry: 12, fill: INK, opacity: .2}, g);
  el("path", R3A({d: "M-84 -206 L84 -206 L66 -6 Q64 4 54 4 L-54 4 Q-64 4 -66 -6 Z", fill: "#1d6fd6"}), g);
  el("path", {d: "M40 -200 L78 -200 L62 -8 Q60 0 52 0 H30 Z", fill: "#1657ad"}, g);
  g.hole = el("ellipse", R3A({cx: 0, cy: -208, rx: 78, ry: 13, fill: "#0b2e5c", "stroke-width": 5}), g);
  el("rect", R3A({x: -96, y: -222, width: 192, height: 22, rx: 11, fill: "#3a86ff", "stroke-width": 5}), g);
  el("circle", {cx: -6, cy: -108, r: 50, fill: "#fff", stroke: INK, "stroke-width": 4}, g);
  // three chasing arrows
  for (let i = 0; i < 3; i++) { const a = el("g", {transform: `translate(-6 -108) rotate(${i * 120})`}, g);
    el("path", {d: "M-22 -26 A34 34 0 0 1 22 -26", fill: "none", stroke: "#1d6fd6", "stroke-width": 10, "stroke-linecap": "round"}, a); el("path", {d: "M16 -40 L34 -20 L10 -14 Z", fill: "#1d6fd6"}, a); }
  return g; }
// the rubbish chute hopper in the kitchen wall (centre 0,0). flap(k): 0 shut, 1 pulled open
function r3Hopper(p) { const g = el("g", {}, p);
  el("rect", R3A({x: -96, y: -92, width: 192, height: 184, rx: 12, fill: "#8d99ae"}), g);
  g.dark = el("rect", {x: -74, y: -70, width: 148, height: 140, rx: 6, fill: "#14142b"}, g);
  g.fl = el("path", R3A({d: "", fill: "#ced4da"}), g); g.hd = el("rect", R3A({x: -30, y: 0, width: 60, height: 14, rx: 7, fill: "#495057", "stroke-width": 4}), g);
  [[-84, -80], [84, -80], [-84, 80], [84, 80]].forEach(([x, y]) => el("circle", {cx: x, cy: y, r: 4, fill: INK}, g));
  const pl = el("g", {transform: "translate(0 -126)"}, g); el("rect", R3A({x: -104, y: -22, width: 208, height: 40, rx: 8, fill: "#fff", "stroke-width": 4}), pl);
  tx(pl, {x: 0, y: 8, "text-anchor": "middle", "font-size": 25, "font-weight": 700, fill: INK}, "RUBBISH CHUTE");
  g.flap = k => { const h = lerp(140, 44, k), w = 10 * k; set(g.fl, "d", `M-74 70 L74 70 L${74 + w} ${70 - h} L${-74 - w} ${70 - h} Z`); set(g.hd, "y", 70 - h + 14); set(g.fl, "fill", mix("#ced4da", "#eef1f4", k)); };
  g.flap(0); return g; }
function r3Kid(p) { const K = el("g", {}, p), SKIN = "#f1c27d", BLUE = "#3a86ff", NAVY = "#1d3557", HAIR = "#3d2c1e", o = {stroke: INK, "stroke-width": 6, "stroke-linejoin": "round", "stroke-linecap": "round"};
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
  K.strap = el("g", {}, K.torso);
  el("path", A({d: "M-30 -326 Q-14 -252 -50 -212", fill: "none", stroke: INK, "stroke-width": 18}), K.strap); el("path", {d: "M-30 -326 Q-14 -252 -50 -212", fill: "none", stroke: "#c1121f", "stroke-width": 9, "stroke-linecap": "round"}, K.strap);   // bag strap
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

/* ---- an HDB kitchen (floor at y = 760). Returns the group; g.hop = the chute hopper, g.front = things in front of the pupil */
function r3Kitchen(p, HX = 1040, HY = 400) { const g = el("g", {}, p), F = 760;
  el("rect", {x: -700, y: -500, width: 3200, height: 1260, fill: "#fdebc8"}, g);
  el("rect", {x: -700, y: 250, width: 3200, height: 510, fill: "#f7f3e8"}, g);                                    // tiled lower wall
  for (let x = -700; x < 2500; x += 96) el("line", {x1: x, y1: 250, x2: x, y2: F, stroke: "#e0d8c3", "stroke-width": 4}, g);
  for (let y = 250; y < F; y += 96) el("line", {x1: -700, y1: y, x2: 2500, y2: y, stroke: "#e0d8c3", "stroke-width": 4}, g);
  el("line", {x1: -700, y1: 250, x2: 2500, y2: 250, stroke: INK, "stroke-width": 5}, g);
  el("rect", {x: -700, y: F, width: 3200, height: 700, fill: "#c9ada7"}, g); el("line", {x1: -700, y1: F, x2: 2500, y2: F, stroke: INK, "stroke-width": 6}, g);
  [830, 920, 1030].forEach(y => el("line", {x1: -700, y1: y, x2: 2500, y2: y, stroke: "#b5928b", "stroke-width": 4}, g));
  for (let i = 0; i < 16; i++) el("line", {x1: 810 + (i - 8) * 150, y1: F, x2: 810 + (i - 8) * 420, y2: 1300, stroke: "#b5928b", "stroke-width": 4}, g);
  // window: daylight and the blocks across the road
  const w = el("g", {transform: "translate(560 60)"}, g); el("rect", R3A({x: 0, y: 0, width: 300, height: 250, rx: 6, fill: "#8ecae6"}), w);
  [[14, 130, 70, "#f4a261"], [96, 80, 86, "#e9c46a"], [194, 150, 92, "#e76f51"]].forEach(([x, y, ww, c]) => { el("rect", {x, y, width: ww, height: 250 - y, fill: c, stroke: INK, "stroke-width": 3}, w);
    for (let r = 0; r < 6; r++) for (let q = 0; q < 3; q++) if (y + 12 + r * 26 < 236) el("rect", {x: x + 8 + q * (ww - 16) / 3, y: y + 12 + r * 26, width: 12, height: 14, fill: "#fdf0d5"}, w); });
  emo(w, 60, 50, 44, "☁️"); el("rect", R3A({x: 0, y: 0, width: 300, height: 250, rx: 6, fill: "none", "stroke-width": 9, stroke: "#fff"}), w); el("rect", R3A({x: -6, y: -6, width: 312, height: 262, rx: 8, fill: "none"}), w);
  el("line", {x1: 150, y1: 0, x2: 150, y2: 250, stroke: "#fff", "stroke-width": 8}, w);
  // wall cabinets and the counter (left)
  [-420, -200, 20, 240].forEach(x => { el("rect", R3A({x, y: -150, width: 212, height: 300, rx: 8, fill: "#e9c46a"}), g); el("rect", {x: x + 178, y: 60, width: 12, height: 50, rx: 6, fill: INK}, g); });
  el("rect", R3A({x: -500, y: 560, width: 760, height: 200, fill: "#e9c46a"}), g); [-300, -80, 140].forEach(x => { el("rect", R3A({x, y: 584, width: 200, height: 160, rx: 8, fill: "#f1d58a", "stroke-width": 4}), g); el("rect", {x: x + 88, y: 600, width: 50, height: 10, rx: 5, fill: INK}, g); });
  el("rect", R3A({x: -520, y: 536, width: 800, height: 30, rx: 8, fill: "#6c757d"}), g);
  emo(g, -60, 480, 110, "🍚"); emo(g, 130, 478, 104, "🫖");
  // fridge (right)
  el("rect", R3A({x: 1420, y: 130, width: 300, height: 630, rx: 18, fill: "#dfe7ee"}), g); el("line", {x1: 1420, y1: 370, x2: 1720, y2: 370, stroke: INK, "stroke-width": 6}, g);
  [250, 470].forEach(y => el("rect", {x: 1444, y, width: 14, height: 90, rx: 7, fill: INK}, g)); emo(g, 1600, 250, 50, "🧲");
  g.hop = r3Hopper(g); tf(g.hop, `translate(${HX} ${HY})`); g.HX = HX; g.HY = HY;
  return g; }

// ---- COLD OPEN (no voice): the pupil finishes chicken rice, hesitates between the blue bin and the chute, then THUNK
const C0 = {U: 6, LID: [1.05, 1.4], WALK: [1.7, 2.9], STEP0: 1.76, STEP: .29, BIN: [2.95, 3.4], Q: 3.55, UP: [3.6, 4.1], FLAP: [4.25, 4.5], IN: [4.6, 4.9], SLAM: 5.0};
S.chute0 = (() => { const s = scene("chute0", "#fdebc8", "#fdebc8"), F = 760; s.cam = el("g", {}, s.stage);
  s.kit = r3Kitchen(s.cam); const HX = s.kit.HX, HY = s.kit.HY;
  s.kid = r3Kid(s.cam); op(s.kid.bag, 0); op(s.kid.strap, 0);
  s.spoon = el("g", {}, s.kid.armN); el("line", {x1: 0, y1: 0, x2: 0, y2: 44, stroke: INK, "stroke-width": 11, "stroke-linecap": "round"}, s.spoon); el("line", {x1: 0, y1: 0, x2: 0, y2: 44, stroke: "#dee2e6", "stroke-width": 5, "stroke-linecap": "round"}, s.spoon);
  el("ellipse", {cx: 0, cy: 54, rx: 10, ry: 14, fill: "#dee2e6", stroke: INK, "stroke-width": 3.5}, s.spoon);
  // the table (in front of the pupil)
  s.table = el("g", {}, s.cam); el("rect", R3A({x: 500, y: 560, width: 250, height: 26, rx: 8, fill: "#bc8a5f"}), s.table); [[516, 0], [712, 0]].forEach(([x]) => el("rect", R3A({x, y: 586, width: 22, height: 184, fill: "#9c6644"}), s.table));
  s.boxG = el("g", {}, s.cam); s.box = r3Box(s.boxG);
  s.bin = r3Bin(s.cam); tf(s.bin, "translate(940 806)");
  s.q = tx(s.cam, {x: 0, y: 0, "text-anchor": "middle", "font-size": 130, "font-weight": 700, fill: "#ffe14d", class: "out", "stroke-width": 16}, "?");
  s.hit = el("g", {}, s.cam); for (let i = 0; i < 9; i++) { const a = -Math.PI * .95 + i * Math.PI * .9 / 8 - .0; el("line", {x1: Math.cos(a) * 130, y1: Math.sin(a) * 120, x2: Math.cos(a) * 190, y2: Math.sin(a) * 176, stroke: "#ffbe0b", "stroke-width": 12, "stroke-linecap": "round"}, s.hit); }
  s.run = t => { const c = SC.chute0, u = FR3("chute0")(t) * C0.U + Math.min(0, t - c.t0), K = s.kid;
    const eat = on(u, .12, .95, .3), lid = ramp(u, C0.LID[0], C0.LID[1]), p = clamp((u - C0.WALK[0]) / (C0.WALK[1] - C0.WALK[0])), pe = .5 * p + .5 * ease(p);
    const toBin = ramp(u, C0.BIN[0], C0.BIN[1]) * (1 - ramp(u, C0.UP[0], C0.UP[1])), up = ramp(u, C0.UP[0], C0.UP[1]), put = ramp(u, C0.FLAP[0] + .1, C0.IN[0]), inn = ramp(u, C0.IN[0], C0.IN[1]), slam = ramp(u, C0.SLAM, C0.SLAM + .07), after = ramp(u, C0.SLAM + .15, C0.SLAM + .55);
    const kx = lerp(450, 800, pe), ky = F + 6, amp = 19 * ramp(u, C0.WALK[0], C0.STEP0) * (1 - ramp(u, C0.WALK[1] - .2, C0.WALK[1] + .04)), ph = Math.PI / 2 + Math.PI * (u - C0.STEP0) / C0.STEP, sw = amp * Math.sin(ph);
    const hop = -14 * on(u, C0.SLAM + .02, C0.SLAM + .4, .14), bob = -amp / 19 * 7 * Math.abs(Math.cos(ph)) + hop - 5 * eat * Math.abs(Math.sin(u * 9));
    tf(K, `translate(${kx} ${ky})`); tf(K.body, `translate(0 ${bob}) rotate(${1.5 * amp / 19 + 5 * toBin - 2 * put} 0 -120)`);
    tf(K.legN, `translate(16 -120) rotate(${sw})`); tf(K.legF, `translate(-14 -120) rotate(${-sw})`); tf(K.armF, `translate(-6 -300) rotate(${sw * .9})`);
    // the near arm: spoon to mouth, then it carries the box
    const hold = ramp(u, 1.45, 1.7);
    let a = lerp(-60, -138, eat); a = lerp(a, -74, hold); a = lerp(a, -44, toBin); a = lerp(a, -84, up * (1 - put)); a = lerp(a, -112, put); a = lerp(a, -10, after);
    tf(K.armN, `translate(10 -300) rotate(${a})`); op(s.spoon, u < 1.02 ? 1 : 0); tf(s.spoon, `translate(0 126) rotate(${-a + 62 * eat})`);
    const hx = kx + 10 - 126 * Math.sin(a * Math.PI / 180), hy = ky + bob - 300 + 126 * Math.cos(a * Math.PI / 180);
    tf(K.head, `rotate(${6 * (1 - eat) * (1 - hold) + 13 * toBin - 12 * up * (1 - after) - 8 * after} 2 -330)`);
    const happy = after > .4 || (u > .8 && u < 1.5); op(K.m0, happy ? 0 : 1); op(K.m1, happy ? 1 : 0); tf(K.brow, `translate(0 ${-6 * up * (1 - after) - 5 * after})`); tf(K.eyes, `translate(${2 * up} ${4 * toBin - 4 * up})`);
    // the box: on the table, then in the hand, then into the chute
    s.box.open(lid); const bx = lerp(lerp(606, hx + 26, hold), HX, inn), by = lerp(lerp(506, hy - 6, hold), HY - 16, inn), bs = lerp(.72, .5, inn);
    tf(s.boxG, `translate(${bx} ${by}) rotate(${-8 * toBin + 10 * put * (1 - inn) + 20 * inn}) scale(${bs})`); op(s.boxG, 1 - ramp(u, C0.IN[1] - .08, C0.IN[1] + .04)); op(s.box.sh, 1 - hold);
    s.kit.hop.flap(ramp(u, C0.FLAP[0], C0.FLAP[1]) * (1 - slam));
    tf(s.q, `translate(${kx + 50} ${ky - 540}) scale(${Math.max(0, pop(u, C0.Q, .3)) * (1 + .06 * Math.sin(u * 9))}) rotate(${8 * Math.sin(u * 5)})`); op(s.q, on(u, C0.Q, C0.FLAP[0] + .1, .12));
    const hk = on(u, C0.SLAM + .02, C0.SLAM + .45, .06); op(s.hit, hk); tf(s.hit, `translate(${HX} ${HY}) scale(${.8 + .5 * ramp(u, C0.SLAM, C0.SLAM + .4)})`);
    // camera: follow the pupil, push in on the choice, shake on the thunk
    const z = 1.22 + .2 * ramp(u, 2.7, 3.5) - .1 * ramp(u, C0.SLAM, C0.SLAM + .5), cx = lerp(590, 930, ramp(u, 1.6, 3.0)), cy = lerp(430, 440, ramp(u, 2.7, 3.5));
    const sh = (1 - ramp(u, C0.SLAM, C0.SLAM + .45)) * (u > C0.SLAM ? 1 : 0) * 16;
    tf(s.cam, `translate(${VP[0] + sh * Math.sin(u * 90)} ${VP[1] + sh * Math.cos(u * 70)}) scale(${z}) translate(${-cx} ${-cy})`); }; return s; })();

// a card that shows the real Singapore coastline (SG3). w x h, centred on 0,0; k = zoom; (cx, cy) = the map point in the middle. g.m is in map units
function r3Map(p, w, h, k, cx, cy, rx = 30) { const g = el("g", {}, p), id = "r3mc" + (r3Map.n = (r3Map.n || 0) + 1); const cp = el("clipPath", {id}, r3Defs()); el("rect", {x: -w / 2, y: -h / 2, width: w, height: h, rx}, cp);
  el("rect", {x: -w / 2, y: -h / 2, width: w, height: h, rx, fill: "#48cae4"}, g); const c = el("g", {"clip-path": `url(#${id})`}, g);
  g.m = el("g", {transform: `scale(${k}) translate(${-cx} ${-cy})`}, c); g.k = k;
  for (let i = 0; i < 26; i++) el("path", {d: `M${-560 + (i % 7) * 400 + (i % 2) * 150} ${-260 + Math.floor(i / 7) * 420 + (i % 3) * 60} q${14 / k} ${-9 / k} ${28 / k} 0 t${28 / k} 0`, fill: "none", stroke: "#fff", "stroke-width": 3.5 / k, opacity: .4}, g.m);
  el("path", {d: SG3.land, fill: "#95d5b2", stroke: INK, "stroke-width": 4 / k, "stroke-linejoin": "round"}, g.m);
  // Pulau Semakau is too small for the coastline file: drawn here at its real place, 8 km south of the main island
  g.sem = el("g", {transform: `translate(${SG3.sem[0]} ${SG3.sem[1]})`}, g.m);
  el("path", {d: "M-50 6 Q-46 -18 -10 -22 Q36 -30 52 -10 Q58 10 26 20 Q-20 30 -50 6 Z", fill: "#cfd8dc", stroke: INK, "stroke-width": 4 / k, "stroke-linejoin": "round"}, g.sem);
  el("path", {d: "M-30 2 Q-8 -12 30 -8", fill: "none", stroke: "#6c757d", "stroke-width": 9, "stroke-linecap": "round"}, g.sem);
  el("rect", {x: -w / 2, y: -h / 2, width: w, height: h, rx, fill: "none", stroke: INK, "stroke-width": 7}, g);
  g.pt = (q, dx = 0, dy = 0) => [(q[0] - cx) * k + dx, (q[1] - cy) * k + dy]; return g; }
function r3Pin(p, col = "#e63946", r = 15) { const g = el("g", {}, p); g.ring = el("circle", {r, fill: "none", stroke: col, "stroke-width": 5}, g); el("circle", {r, fill: col, stroke: "#fff", "stroke-width": 5}, g); return g; }
const r3Pulse = (pin, t) => { const k = (t * .8) % 1; set(pin.ring, "r", 15 + 40 * k); op(pin.ring, 1 - k); };

// ---- HOOK: down the chute; where next? A small island with only one landfill, filling up
S.hook = (() => { const s = scene("hook", "#3a0ca3", "#4361ee"), st = s.stage;
  // an HDB block cut open: the chute runs down to the bin at the bottom
  s.blk = el("g", {}, st); el("rect", R3A({x: 60, y: 110, width: 400, height: 690, rx: 10, fill: "#f4a261"}), s.blk);
  for (let r = 0; r < 8; r++) { [84, 154, 366, 406].forEach((x, i) => el("rect", {x, y: 140 + r * 78, width: i % 2 ? 34 : 50, height: 44, rx: 4, fill: "#fdf0d5", stroke: INK, "stroke-width": 3}, s.blk));
    el("rect", {x: 300, y: 158 + r * 78, width: 26, height: 22, rx: 3, fill: "#ced4da", stroke: INK, "stroke-width": 3}, s.blk); }
  el("rect", R3A({x: 232, y: 124, width: 64, height: 676, fill: "#14142b"}), s.blk); el("rect", R3A({x: 190, y: 716, width: 150, height: 84, fill: "#2b2d42"}), s.blk);
  el("path", R3A({d: "M214 738 H316 L306 796 H224 Z", fill: "#2a9d8f"}), s.blk); el("rect", {x: 30, y: 800, width: 470, height: 14, rx: 7, fill: INK}, s.blk);
  s.bag = r3Bag(st, "#adb5bd", .36); s.puff = el("g", {}, st); [[-30, 0], [0, -14], [30, 0]].forEach(([x, y]) => el("circle", {cx: x, cy: y, r: 16, fill: "#fff", opacity: .8}, s.puff));
  s.q = el("g", {}, st); tx(s.q, {x: 0, y: 0, "text-anchor": "middle", "font-size": 62, "font-weight": 700, fill: "#ffe14d", class: "out", "stroke-width": 11}, "Where does it go next?");
  s.arrow = arrowG(st, "#ffe14d"); s.qm = tx(st, {x: 0, y: 0, "text-anchor": "middle", "font-size": 150, "font-weight": 700, fill: "#ffe14d", class: "out", "stroke-width": 18}, "?");
  s.mapG = el("g", {}, st); s.map = r3Map(s.mapG, 600, 470, .42, 800, 560); s.sgL = r3Lab(s.map, ...s.map.pt(SG3.mid, 0, 10), "Singapore", 40);
  s.pin = r3Pin(s.map); tf(s.pin, `translate(${s.map.pt(SG3.sem).join(" ")})`); s.one = chip(s.mapG, "our only landfill", "#6c757d", {fs: 32});
  s.fill = chip(st, "…and it is filling up!", "#e63946", {fs: 40});
  s.run = t => { const a = (w, f) => cue("hook", w, f), t0 = SC.hook.t0, tg = a("goes", .1), tw = a("where", .25), ts = a("singapore", .5), tl = a("landfill", .75), tf2 = a("filling", .9);
    const f = clamp((t - t0 + .3) / (tg + .45 - t0)), y = lerp(150, 742, f * f); tf(s.bag, `translate(264 ${y}) rotate(${f * 500}) scale(.36)`); op(s.bag, t < tg + .5 ? 1 : 0);
    const pk = clamp((t - tg - .45) / .5); op(s.puff, pk > 0 && pk < 1 ? 1 - pk : 0); tf(s.puff, `translate(264 ${730 - 30 * pk}) scale(${.6 + pk})`);
    const out = 1 - .0 * ramp(t, ts - .3, ts);
    tf(s.arrow, `translate(${560 + 10 * Math.sin(t * 5)} 760) scale(${.8 * Math.max(0, pop(t, tw - .1))})`); op(s.arrow, t > tw - .1 ? out : 0);
    tf(s.qm, `translate(720 810) scale(${Math.max(0, pop(t, tw + .2)) * (1 + .06 * Math.sin(t * 6))})`); op(s.qm, t > tw + .2 ? 1 : 0);
    popAt(s.q, 820, 110, t, tw);
    popAt(s.mapG, 850, 420, t, ts - .15); tf(s.one, `translate(${s.map.pt(SG3.sem, 0, -52).join(" ")}) scale(${Math.max(0, pop(t, tl - .1))})`); op(s.one, t > tl - .1 ? 1 : 0);
    op(s.pin, ramp(t, tl - .3, tl - .1)); r3Pulse(s.pin, t); popAt(s.fill, 880, 760, t, tf2 - .1); op(s.qm, (t > tw + .2 ? 1 : 0) * (1 - ramp(t, tf2 - .4, tf2 - .1))); op(s.arrow, (t > tw - .1 ? 1 : 0) * (1 - ramp(t, tf2 - .4, tf2 - .1))); }; return s; })();

function r3Can(p, col = "#e63946", k = 1) { const g = el("g", {transform: `scale(${k})`}, p);
  el("rect", R3A({x: -34, y: -60, width: 68, height: 120, rx: 12, fill: col}), g); el("rect", R3A({x: -28, y: -70, width: 56, height: 16, rx: 6, fill: "#ced4da", "stroke-width": 4}), g);
  el("rect", {x: -22, y: -44, width: 10, height: 88, rx: 5, fill: "#fff", opacity: .45}, g); el("ellipse", {cx: 6, cy: -62, rx: 9, ry: 3.5, fill: INK}, g); return g; }
function r3Cross(p, r = 70) { const g = el("g", {}, p); [[-1, -1, 1, 1], [1, -1, -1, 1]].forEach(([a, b, c, d]) => { el("line", {x1: a * r, y1: b * r, x2: c * r, y2: d * r, stroke: INK, "stroke-width": 26, "stroke-linecap": "round"}, g); });
  [[-1, -1, 1, 1], [1, -1, -1, 1]].forEach(([a, b, c, d]) => el("line", {x1: a * r, y1: b * r, x2: c * r, y2: d * r, stroke: "#e63946", "stroke-width": 16, "stroke-linecap": "round"}, g)); return g; }
function r3Panel(p, w, h, fill = "#fffaf0") { const g = el("g", {}, p); el("rect", {x: -w / 2, y: -h / 2, width: w, height: h, rx: 34, fill, stroke: INK, "stroke-width": 7, filter: "url(#sh)"}, g); return g; }

// ---- THE ANSWER to Part 1: recycled aluminium needs much less energy, no new digging, and it never wears out
S.answer = (() => { const s = scene("answer", "#3a0ca3", "#4361ee"), st = s.stage;
  s.top = chip(st, "✅ The answer from Part 1", "#06d6a0", {fs: 44});
  s.q = tx(st, {x: 600, y: 150, "text-anchor": "middle", "font-size": 42, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 8, "data-fit": 1160}, "Why is recycling a can better than digging up new metal?");
  const P = [200, 600, 1000].map(x => { const g = r3Panel(st, 360, 430); g.x = x; return g; });
  // 1: energy. Recycled aluminium needs about one-twentieth of the energy of new metal
  const e = P[0]; el("line", {x1: -150, y1: 150, x2: 150, y2: 150, stroke: INK, "stroke-width": 6, "stroke-linecap": "round"}, e);
  s.b1 = el("rect", R3A({x: -120, y: -130, width: 90, height: 280, fill: "#f77f00"}), e); s.b2 = el("rect", R3A({x: 30, y: 136, width: 90, height: 14, fill: "#06d6a0"}), e);
  emo(e, -75, -168, 44, "⚡"); s.z2 = emo(e, 75, 100, 44, "⚡");
  tx(e, {x: -75, y: 192, "text-anchor": "middle", "font-size": 28, "font-weight": 700, fill: INK}, "new metal"); tx(e, {x: 75, y: 192, "text-anchor": "middle", "font-size": 28, "font-weight": 700, fill: INK}, "recycled");
  // 2: no new digging
  const d = P[1]; el("path", R3A({d: "M-150 -20 H-70 L-40 90 H50 L80 -20 H150 V170 H-150 Z", fill: "#bc6c25"}), d); el("path", {d: "M-150 60 H-52 M62 60 H150 M-150 120 H150", stroke: "#99582a", "stroke-width": 5, fill: "none"}, d);
  emo(d, 4, 44, 76, "🪨"); emo(d, -70, -96, 110, "⛏️"); emo(d, 96, -66, 80, "🚜"); s.x = r3Cross(d, 84);
  // 3: again and again
  const l = P[2]; s.loop = el("g", {}, l); for (let i = 0; i < 3; i++) { const a = el("g", {transform: `rotate(${i * 120})`}, s.loop);
    el("path", {d: "M-62 -108 A124 124 0 0 1 62 -108", fill: "none", stroke: INK, "stroke-width": 26, "stroke-linecap": "round"}, a); el("path", {d: "M-62 -108 A124 124 0 0 1 62 -108", fill: "none", stroke: "#06d6a0", "stroke-width": 16, "stroke-linecap": "round"}, a);
    el("path", {d: "M52 -142 L104 -92 L40 -76 Z", fill: "#06d6a0", stroke: INK, "stroke-width": 6, "stroke-linejoin": "round"}, a); }
  s.can = r3Can(l, "#e63946", 1); s.n = tx(l, {x: 0, y: 198, "text-anchor": "middle", "font-size": 30, "font-weight": 700, fill: INK}, "");
  s.caps = [["much less energy", "#f77f00"], ["no new digging", "#bc6c25"], ["again and again!", "#2a9d8f"]].map(([lab, col]) => chip(st, lab, col, {fs: 34}));
  s.P = P;
  s.run = t => { const a = (w, f) => cue("answer", w, f), T = [a("making", .35), a("dig", .62), a("again", .85)], tc = [a("less", .5), a("ground", .7), a("again", .85) + .5];
    popAt(s.top, 600, 50, t, SC.answer.t0 - .2); popAt(s.q, 0, 0, t, a("why", .15) - .1);
    P.forEach((g, i) => { popAt(g, g.x, 440, t, T[i] - .25); popAt(s.caps[i], g.x, 720, t, tc[i]); });
    const k1 = ramp(t, T[0], T[0] + .9), k2 = ramp(t, a("recycled", .45), a("recycled", .45) + .5); set(s.b1, "height", 280 * k1); set(s.b1, "y", 150 - 280 * k1); op(s.b2, k2); op(s.z2, k2);
    op(s.x, ramp(t, a("don't", .6), a("don't", .6) + .15)); tf(s.x, `translate(0 20) scale(${Math.max(0, pop(t, a("don't", .6), .35))})`);
    const tl = T[2], rot = 120 * Math.max(0, t - tl); tf(s.loop, `translate(0 -10) rotate(${rot})`); tf(s.can, `translate(0 -10) scale(.9)`);
    s.n.textContent = "made into a can: " + (1 + Math.floor(Math.max(0, t - tl) / 1)) + " times"; }; return s; })();

// ---- NEWS: a record year of rubbish; about 1 in 10 from homes recycled; Semakau Landfill full by about 2035
S.news = (() => { const s = scene("news", "#023e8a", "#0077b6"), st = s.stage;
  s.A = el("g", {}, st); skyline(s.A, 90, 800, "#03045e"); s.heap = el("g", {}, s.A);
  el("path", R3A({d: "M40 800 Q200 520 420 470 Q600 300 780 470 Q1020 540 1160 800 Z", fill: "#6c757d"}), s.heap);
  seed = 31; for (let i = 0; i < 22; i++) { const x = 170 + rnd() * 860, y = 800 - rnd() * Math.max(40, 300 - Math.abs(x - 600) * .55); const b = r3Bag(s.heap, ["#343a40", "#495057", "#adb5bd", "#212529"][i % 4], .55 + rnd() * .35); tf(b, `translate(${x} ${y - 40}) rotate(${rnd() * 50 - 25}) scale(${.55 + rnd() * .35})`); }
  el("rect", {x: -200, y: 800, width: 1600, height: 300, fill: "#03045e"}, s.A);
  s.up = arrowG(s.A, "#e63946"); s.c1 = chip(st, "2025: more rubbish than ever before", "#e63946", {fs: 40});
  s.B = el("g", {}, st); s.bags = []; for (let i = 0; i < 10; i++) { const g = el("g", {}, s.B); g.grey = r3Bag(g, "#6c757d", 1); g.blue = r3Bag(g, "#1d6fd6", 1); s.bags.push(g); }
  { const g = s.bags[0]; el("circle", {cx: 0, cy: 6, r: 34, fill: "#fff", stroke: INK, "stroke-width": 4}, g.blue); emo(g.blue, 0, 6, 44, "♻️"); }
  s.l1 = r3Lab(s.B, 165, 640, "recycled", 40, "#8ecae6"); s.l9 = r3Lab(s.B, 660, 640, "burnt or thrown away", 40);
  s.br = el("path", {d: "M260 560 V580 H1060 V560", fill: "none", stroke: "#fff", "stroke-width": 7, "stroke-linecap": "round", "stroke-linejoin": "round"}, s.B);
  s.c2 = chip(st, "From our homes: only about 1 in 10 was recycled", "#1d6fd6", {fs: 36});
  s.C = el("g", {}, st); s.map = r3Map(s.C, 1140, 720, .66, 800, 520); tf(s.map, "translate(600 470)");
  s.sgL = r3Lab(s.map, ...s.map.pt(SG3.mid, 0, 10), "Singapore", 52); s.pin = r3Pin(s.map); tf(s.pin, `translate(${s.map.pt(SG3.sem).join(" ")})`);
  s.semL = r3Lab(s.map, ...s.map.pt(SG3.sem, 0, 70), "Semakau Landfill", 42, "#ffe14d");
  s.c3 = chip(st, "Expected to be full by about 2035", "#e63946", {fs: 40});
  s.run = t => { const a = (w, f) => cue("news", w, f), t0 = SC.news.t0, tb = a("only", .36) - .3, tc = a("and", .66) - .2;
    op(s.A, 1 - ramp(t, tb - .2, tb + .2)); op(s.B, on(t, tb, tc + .2, .35)); op(s.C, ramp(t, tc - .1, tc + .3));
    const r = ramp(t, t0 + .6, a("before", .3) + .3); tf(s.heap, `translate(600 800) scale(${.45 + .55 * r}) translate(-600 -800)`);
    tf(s.up, `translate(1080 ${lerp(560, 300, r)}) rotate(-90) scale(${Math.max(0, pop(t, a("more", .22)))})`); op(s.up, (t > a("more", .22) ? 1 : 0) * (1 - ramp(t, tb - .2, tb + .2)));
    popAt(s.c1, 600, 60, t, a("twenty-five", .1) - .2); op(s.c1, on(t, a("twenty-five", .1) - .2, tb + .1, .2));
    const one = ramp(t, a("one", .4) - .1, a("one", .4) + .3), ten = a("ten", .45);
    s.bags.forEach((g, i) => { const x = 165 + i * 99 + (i ? 60 : 0), tp = tb + .15 + i * .05; tf(g, `translate(${x} ${lerp(470, 440, i ? 0 : one)}) scale(${Math.max(0, pop(t, tp, .35)) * (i ? 1 - .12 * one : 1 + .25 * one) * .62})`); op(g, t > tp ? 1 : 0);
      op(g.blue, i ? 0 : one); op(g.grey, i ? 1 - .35 * one : 1 - one); });
    op(s.l1, ramp(t, ten, ten + .3)); op(s.l9, ramp(t, a("thrown", .52), a("thrown", .52) + .3)); op(s.br, ramp(t, a("thrown", .52), a("thrown", .52) + .3));
    popAt(s.c2, 600, 60, t, a("recycled", .6) - .9); op(s.c2, on(t, a("recycled", .6) - .9, tc + .1, .2));
    op(s.pin, ramp(t, a("semakau", .78) - .3, a("semakau", .78))); r3Pulse(s.pin, t); op(s.semL, ramp(t, a("semakau", .78) - .1, a("semakau", .78) + .2));
    popAt(s.c3, 600, 60, t, a("full", .9) - .1); }; return s; })();

// ---- RECAP: the board lights up as Heart names each step
function r3Mini(g, kind) {
  if (kind === "box") { const b = r3Box(g, {face: 1}); tf(b, "translate(0 -22) scale(.62)"); }
  else if (kind === "chute") { el("rect", R3A({x: -36, y: -100, width: 72, height: 150, fill: "#14142b", "stroke-width": 5}), g); const b = r3Bag(g, "#adb5bd", .3); tf(b, "translate(0 -40) rotate(20) scale(.3)");
    el("path", {d: "M0 0 V30 M-12 20 L0 34 L12 20", fill: "none", stroke: "#ffe14d", "stroke-width": 7, "stroke-linecap": "round", "stroke-linejoin": "round"}, g); }
  else if (kind === "ash") { el("path", R3A({d: "M-84 40 Q-40 -50 0 -54 Q44 -48 84 40 Z", fill: "#8d99ae", "stroke-width": 5}), g); [[-30, 10], [10, -14], [36, 18], [-4, 22]].forEach(([x, y]) => el("circle", {cx: x, cy: y, r: 6, fill: "#495057"}, g)); }
  else if (kind === "barge") { el("path", R3A({d: "M-90 -6 H70 L88 -6 L74 34 H-78 Z", fill: "#e76f51", "stroke-width": 5}), g); el("path", R3A({d: "M-70 -6 Q-20 -60 40 -6 Z", fill: "#8d99ae", "stroke-width": 5}), g);
    el("path", {d: "M-100 44 q16 -12 32 0 t32 0 t32 0 t32 0 t32 0 t32 0", fill: "none", stroke: "#0096c7", "stroke-width": 8, "stroke-linecap": "round"}, g); }
  else emo(g, 0, -22, 104, kind); }
S.recap = (() => { const s = scene("recap", "#fff3b0", "#ffd6a5"), st = s.stage;
  const ST = [["box", "takeaway box", "takeaway"], ["chute", "down the chute", "chute"], ["🚛", "into a truck", "truck"], ["🏭", "plant in Tuas", "waste-to-energy"], ["🔥", "burnt", "burnt"], ["⚡", "heat → electricity", "electricity"], ["ash", "ash", "ash"], ["barge", "barge to Semakau", "barge"]];
  s.top = chip(st, "🥡 Your journey", "#f77f00", {fs: 42});
  s.arrows = ST.slice(0, 7).map((_, i) => { const a = el("path", {d: "M-14 -16 L14 0 L-14 16 Z", fill: INK}, st); if (i === 3) tf(a, "translate(1050 480) rotate(90)"); else tf(a, `translate(${150 + (i % 4) * 300 + 150} ${i < 4 ? 300 : 660})`); return a; });
  s.cards = ST.map(([e, lab, w], i) => { const g = el("g", {}, st), x = 150 + (i % 4) * 300, y = i < 4 ? 300 : 660;
    g.bg = el("rect", {x: -122, y: -122, width: 244, height: 244, rx: 30, fill: "#fff", stroke: INK, "stroke-width": 6, filter: "url(#sh)"}, g); r3Mini(g, e);
    tx(g, {x: 0, y: 94, "text-anchor": "middle", "font-size": 27, "font-weight": 700, fill: INK, "data-fit": 216}, lab);
    el("circle", {cx: -92, cy: -92, r: 22, fill: "#7209b7"}, g); tx(g, {x: -92, y: -82, "text-anchor": "middle", "font-size": 27, "font-weight": 700, fill: "#fff"}, String(i + 1)); g.x = x; g.y = y; g.w = w; return g; });
  s.run = t => { popAt(s.top, 600, 80, t, SC.recap.t0 - .2);
    s.cards.forEach((g, i) => { const tw = cue("recap", g.w, (i + 1.5) / 10), done = ramp(t, tw - .1, tw + .15), now = on(t, tw - .1, tw + 1.5, .2);
      tf(g, `translate(${g.x} ${g.y}) scale(${1 + .13 * now})`); op(g, .28 + .72 * done); set(g.bg, "fill", now > .5 ? "#fff8d6" : "#fff"); set(g.bg, "stroke", now > .5 ? "#f77f00" : INK);
      if (i < 7) op(s.arrows[i], .25 + .75 * ramp(t, cue("recap", s.cards[i + 1].w, (i + 2.5) / 10) - .3, cue("recap", s.cards[i + 1].w, (i + 2.5) / 10))); }); }; return s; })();

// ---- TEXTBOOK (P6: how people affect the environment): everything took materials and energy to make; reduce, reuse, recycle, in that order
S.textbook = (() => { const s = scene("textbook", "#d8f3dc", "#95d5b2"), st = s.stage;
  s.p6 = chip(st, "📗 P6: how people affect the environment", "#7209b7", {fs: 38});
  s.mk = el("g", {}, st); emo(s.mk, 250, 200, 96, "🌳"); emo(s.mk, 370, 200, 80, "🛢️"); emo(s.mk, 580, 200, 96, "⚡");
  tx(s.mk, {x: 475, y: 215, "text-anchor": "middle", "font-size": 70, "font-weight": 700, fill: INK}, "+");
  r3Lab(s.mk, 310, 290, "materials", 34); r3Lab(s.mk, 580, 290, "energy", 34);
  s.ar = arrowG(s.mk, "#f77f00"); tf(s.ar, "translate(760 200) scale(.8)"); s.box = r3Box(s.mk); tf(s.box, "translate(960 196) scale(.8)");
  s.line = tx(st, {x: 600, y: 372, "text-anchor": "middle", "font-size": 42, "font-weight": 700, fill: INK, "data-fit": 1100}, "Everything took materials and energy to make");
  const R = [["1", "REDUCE", "use less", "#2a9d8f", 980, "reduce"], ["2", "REUSE", "use things again", "#3a86ff", 800, "reuse"], ["3", "RECYCLE", "what's left", "#06d6a0", 620, "recycle"]];
  s.rows = R.map(([n, a, b, col, w, cw], i) => { const g = el("g", {}, st), y = 470 + i * 128;
    el("rect", {x: -w / 2, y: -52, width: w, height: 104, rx: 52, fill: col, stroke: INK, "stroke-width": 7, filter: "url(#sh)"}, g);
    el("circle", {cx: -w / 2 + 56, cy: 0, r: 40, fill: "#fff", stroke: INK, "stroke-width": 5}, g); tx(g, {x: -w / 2 + 56, y: 18, "text-anchor": "middle", "font-size": 52, "font-weight": 700, fill: INK}, n);
    tx(g, {x: -w / 2 + 120, y: 19, "font-size": 54, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 8}, a); tx(g, {x: w / 2 - 40, y: 14, "text-anchor": "end", "font-size": 36, "font-weight": 700, fill: INK}, b); g.y = y; g.cw = cw; return g; });
  s.run = t => { const a = (w, f) => cue("textbook", w, f), te = a("everything", .35);
    popAt(s.p6, 600, 60, t, a("primary", .1) - .2); op(s.mk, ramp(t, te - .3, te)); tf(s.mk, `translate(0 ${20 * (1 - ramp(t, te - .3, te))})`);
    tf(s.ar, `translate(${760 + 8 * Math.sin(t * 5)} 200) scale(.8)`); popAt(s.line, 0, 0, t, a("took", .45) - .1);
    s.rows.forEach((g, i) => { const tw = a(g.cw, .62 + i * .12) - .15; popAt(g, 600, g.y, t, tw); }); }; return s; })();

// ---- WHAT YOU CAN DO: your own container; cans and bottles back for 10 cents; recycling clean and dry
S.act = (() => { const s = scene("act", "#ffd166", "#f77f00"), st = s.stage;
  s.top = chip(st, "💪 What can YOU do?", "#7209b7", {fs: 46});
  const C = [["Bring your own", "container", "bring"], ["Return cans & bottles", "get 10¢ back", "return"], ["Keep recycling", "clean and dry", "keep"]];
  s.cards = C.map(([l1, l2, w], i) => { const g = r3Panel(st, 364, 560); g.x = 200 + i * 400; g.w = w;
    el("circle", {cx: -132, cy: -230, r: 34, fill: ["#ff5d73", "#3a86ff", "#06d6a0"][i], stroke: INK, "stroke-width": 5}, g); tx(g, {x: -132, y: -214, "text-anchor": "middle", "font-size": 44, "font-weight": 700, fill: "#fff"}, String(i + 1));
    tx(g, {x: 0, y: 190, "text-anchor": "middle", "font-size": 34, "font-weight": 700, fill: INK, "data-fit": 330}, l1); tx(g, {x: 0, y: 236, "text-anchor": "middle", "font-size": 34, "font-weight": 700, fill: "#d00000", "data-fit": 330}, l2); return g; });
  // 1: a reusable container with clips
  { const g = el("g", {transform: "translate(0 -30)"}, s.cards[0]); el("path", R3A({d: "M-120 -10 H120 L108 90 Q106 104 92 104 H-92 Q-106 104 -108 90 Z", fill: "#48cae4"}), g);
    el("rect", R3A({x: -132, y: -50, width: 264, height: 46, rx: 16, fill: "#2a9d8f"}), g); [-132, 108].forEach(x => el("rect", R3A({x, y: -30, width: 24, height: 50, rx: 8, fill: "#ffd166", "stroke-width": 5}), g));
    emo(g, -40, 44, 60, "🍚"); emo(g, 40, 44, 60, "🍗"); s.tick = emo(s.cards[0], 110, -140, 80, "✅"); }
  // 2: a can and a bottle go back; a 10-cent coin comes out
  { const g = el("g", {transform: "translate(0 -30)"}, s.cards[1]); const c = r3Can(g, "#e63946", 1.1); tf(c, "translate(-96 20) scale(1.1)");
    el("path", R3A({d: "M-22 -100 H22 V-70 Q46 -50 46 -20 V84 Q46 96 34 96 H-34 Q-46 96 -46 84 V-20 Q-46 -50 -22 -70 Z", fill: "#a8dadc"}), g); el("rect", R3A({x: -24, y: -114, width: 48, height: 22, rx: 6, fill: "#3a86ff", "stroke-width": 5}), g);
    el("rect", {x: -44, y: -6, width: 88, height: 50, fill: "#3a86ff", stroke: INK, "stroke-width": 4}, g);
    s.coin = el("g", {}, s.cards[1]); el("circle", R3A({r: 54, fill: "#ffd166"}), s.coin); el("circle", {r: 43, fill: "none", stroke: "#e0a800", "stroke-width": 5}, s.coin); tx(s.coin, {x: 0, y: 17, "text-anchor": "middle", "font-size": 48, "font-weight": 700, fill: INK}, "10¢"); }
  // 3: the blue bin, clean and dry
  { const g = el("g", {}, s.cards[2]); const b = r3Bin(g, 1.05); tf(b, "translate(-10 130) scale(1.05)"); s.sp = emo(s.cards[2], 110, -150, 70, "✨"); s.sp2 = emo(s.cards[2], -120, -60, 50, "✨"); }
  s.run = t => { const a = (w, f) => cue("act", w, f); popAt(s.top, 600, 70, t, SC.act.t0 - .2);
    s.cards.forEach((g, i) => popAt(g, g.x, 450, t, a(g.w, .15 + i * .28) - .2));
    tf(s.tick, `translate(110 -140) scale(${Math.max(0, pop(t, a("container", .2) + .3))}) translate(-110 140)`);
    const tc = a("ten", .55); tf(s.coin, `translate(${110} ${lerp(40, -130, ramp(t, tc - .1, tc + .4))}) scale(${Math.max(0, pop(t, tc - .1))})`); op(s.coin, t > tc - .1 ? 1 : 0);
    const k = Math.max(0, pop(t, a("clean", .82))); tf(s.sp, `translate(110 -150) scale(${k * (1 + .1 * Math.sin(t * 6))}) translate(-110 150)`); tf(s.sp2, `translate(-120 -60) scale(${Math.max(0, pop(t, a("dry", .88)))}) translate(120 60)`); }; return s; })();

// ---- TRY THIS: count everything your family throws away in one day
S.try = (() => { const s = scene("try", "#caffbf", "#9bf6ff"), st = s.stage;
  s.top = chip(st, "🏠 Try this at home!", "#7209b7", {fs: 46});
  s.clip = el("g", {}, st); el("rect", R3A({x: -230, y: -300, width: 460, height: 600, rx: 26, fill: "#bc8a5f"}), s.clip); el("rect", R3A({x: -200, y: -260, width: 400, height: 540, rx: 10, fill: "#fff", "stroke-width": 4}), s.clip);
  el("rect", R3A({x: -80, y: -330, width: 160, height: 60, rx: 14, fill: "#adb5bd"}), s.clip);
  tx(s.clip, {x: 0, y: -196, "text-anchor": "middle", "font-size": 40, "font-weight": 700, fill: INK}, "Thrown away today");
  el("line", {x1: -170, y1: -172, x2: 170, y2: -172, stroke: INK, "stroke-width": 4}, s.clip);
  s.marks = []; for (let i = 0; i < 20; i++) { const gx = -150 + (Math.floor(i / 5) % 2) * 170 + (i % 5) * 26, gy = -130 + Math.floor(i / 10) * 150;
    s.marks.push(i % 5 === 4 ? el("line", {x1: gx - 118, y1: gy + 70, x2: gx + 6, y2: gy + 14, stroke: "#e63946", "stroke-width": 9, "stroke-linecap": "round"}, s.clip) : el("line", {x1: gx, y1: gy, x2: gx, y2: gy + 84, stroke: INK, "stroke-width": 9, "stroke-linecap": "round"}, s.clip)); }
  s.num = tx(s.clip, {x: 0, y: 250, "text-anchor": "middle", "font-size": 64, "font-weight": 700, fill: "#e63946"}, "0");
  s.binG = el("g", {}, st); el("path", R3A({d: "M-110 -220 H110 L90 0 H-90 Z", fill: "#6c757d"}), s.binG); el("rect", R3A({x: -124, y: -240, width: 248, height: 26, rx: 13, fill: "#495057"}), s.binG);
  s.items = ["🍌", "🧻", "🥤", "🥡", "🛍️", "📰"].map(e => emo(st, 0, 0, 86, e));
  s.q = chip(st, "How many could you have reused or recycled? ♻️", "#2a9d8f", {fs: 38});
  s.run = t => { const a = (w, f) => cue("try", w, f), tc = a("count", .32), th = a("how", .66);
    popAt(s.top, 600, 70, t, SC.try.t0 - .2); popAt(s.clip, 330, 470, t, a("one", .2) - .3); popAt(s.binG, 880, 760, t, a("one", .2) - .1);
    const n = clamp(Math.floor((t - tc) / .28), 0, 17); s.marks.forEach((m, i) => op(m, i < n ? 1 : 0)); s.num.textContent = String(n);
    s.items.forEach((e, i) => { const k = clamp((t - tc - i * .56) / .7); tf(e, `translate(${880 + (i % 2 ? 60 : -60) * (1 - k)} ${lerp(180, 600, k * k)}) rotate(${(i % 2 ? 1 : -1) * 160 * k}) translate(0 0)`); op(e, k > 0 && k < 1 ? 1 : 0); });
    popAt(s.q, 600, 850, t, th); }; return s; })();

// ---- THINK ABOUT IT: why shouldn't a greasy food box go in the blue recycling bin?
S.think = (() => { const s = scene("think", "#3a0ca3", "#7209b7"), st = s.stage;
  s.title = tx(st, {x: 600, y: 96, "text-anchor": "middle", "font-size": 76, "font-weight": 700, fill: "#ffe14d", class: "out", "stroke-width": 10}, "🤔 Think about it!");
  s.bin = r3Bin(st, 1.5); s.boxG = el("g", {}, st); s.box = r3Box(s.boxG);
  s.drips = [0, 1, 2].map(i => el("path", {d: "M0 -14 Q12 4 0 12 Q-12 4 0 -14 Z", fill: CURRY, stroke: CURRY2, "stroke-width": 3}, st));
  s.ar = el("path", {d: "M0 0 V70 M-22 46 L0 74 L22 46", fill: "none", stroke: "#fff", "stroke-width": 12, "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-dasharray": "2 22"}, st);
  s.q = tx(st, {x: 0, y: 0, "text-anchor": "middle", "font-size": 230, "font-weight": 700, fill: "#ff5d73", class: "out", "stroke-width": 22}, "?");
  s.gl = chip(st, "greasy food box", "#f77f00", {fs: 34}); s.bl = chip(st, "blue recycling bin", "#1d6fd6", {fs: 34});
  s.ans = chip(st, "Answer next time!", "#f72585", {fs: 46});
  s.run = t => { const a = (w, f) => cue("think", w, f), tg = a("greasy", .3), tb = a("blue", .5);
    popAt(s.title, 0, 0, t, SC.think.t0 - .2); popAt(s.bin, 520, 800, t, tb - .2, 1.5); 
    tf(s.boxG, `translate(520 ${290 + 10 * Math.sin(t * 2.2)}) rotate(${-6 + 3 * Math.sin(t * 1.7)}) scale(${1.15 * Math.max(0, pop(t, tg - .2))})`);
    s.drips.forEach((d, i) => { const k = ((t - tg) * .55 + i / 3) % 1; tf(d, `translate(${452 + i * 60} ${lerp(390, 520, k * k)})`); op(d, t > tg ? Math.min(1, 4 * (1 - k)) : 0); });
    tf(s.ar, "translate(520 396)"); op(s.ar, 0);
    tf(s.q, `translate(900 480) scale(${Math.max(0, pop(t, a("why", .2))) * (1 + .07 * Math.sin(t * 5))}) rotate(${6 * Math.sin(t * 3)})`); op(s.q, t > a("why", .2) ? 1 : 0);
    popAt(s.gl, 220, 290, t, tg); popAt(s.bl, 220, 690, t, tb); popAt(s.ans, 860, 800, t, a("next", .85)); }; return s; })();

// ---- CLOSE: what to remember, then the next episode (rows come from CFG.close, as in EP02)
S.close = (() => { const s = scene("close", "#f15bb5", "#fee440");
  const CL = CFG.close || {}, rows = CL.rows || [];
  s.rows = rows.map(([e, lab, w, f, col], i) => ({c: chip(s.stage, e + "  " + lab, col, {fs: 42}), w, f, y: 170 + i * (rows.length > 3 ? 160 : 190)}));
  s.tease = chip(s.stage, CL.tease || "Next time!", "#3a0ca3", {fs: 40});
  s.run = t => { const tn = cue("close", CL.teaseWord || "next", .85);
    s.rows.forEach(r => { const tw = cue("close", r.w, r.f); popAt(r.c, 600, r.y, t, tw); op(r.c, ramp(t, tw - .05, tw + .1) * (1 - .6 * ramp(t, tn - .2, tn + .3))); });
    popAt(s.tease, 600, 800, t, tn); }; return s; })();
