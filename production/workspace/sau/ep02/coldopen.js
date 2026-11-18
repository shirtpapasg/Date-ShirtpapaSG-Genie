/* TheOneApp, Explored EP02: the cold open. Load after common.js, geo_map.js, ep02/scenes.js and ep02/pov.js.
   S.kidRoom: a dim HDB bedroom in the evening. The door opens, a pupil walks in with a school bag, reaches for the switch by the door
   and flips it: CLICK, the room floods with warm light and the pupil looks up at the ceiling light, pleased. Picture and sound only;
   Heart's first line ("Flip a switch, and the lights come on...") starts on S.hook, straight after.
   Times are in u = seconds of a 4.8 s shot (they stretch with the segment). The click is at KR.CL (74% of the way in).
   Every frame depends only on t. Sound cues for a 4.8 s segment: door_open 0.52, footsteps 1.28, lamp_click 3.5, click 3.55. */
const KR = {U: 4.8, CL: 3.55, DOOR: [.62, 1.25], WALK: [1.12, 2.48], STEP0: 1.30, STEP: .34, REACH: [2.58, 3.22]};

// a colour filter that turns a lit drawing into a night one: mul = how much of red, green, blue is left; add = a little blue haze
function krFilter(id) { const f = el("filter", {id, x: "-5%", y: "-5%", width: "110%", height: "110%", "color-interpolation-filters": "sRGB"}, $("v").querySelector("defs"));
  const m = el("feColorMatrix", {type: "matrix", values: "1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"}, f);
  return (mul, add, k) => { const v = i => [lerp(mul[i], 1, k), lerp(add[i], 0, k)];
    set(m, "values", `${v(0)[0]} 0 0 0 ${v(0)[1]} 0 ${v(1)[0]} 0 0 ${v(1)[1]} 0 0 ${v(2)[0]} 0 ${v(2)[1]} 0 0 0 1 0`); }; }

// the pupil, seen from the side and facing right; the feet are at (0, 0). Blue top and dark hair, like the pupil seen from above in S.ceiling.
function krKid(p) { const K = el("g", {}, p), SKIN = "#f1c27d", BLUE = "#3a86ff", NAVY = "#1d3557", HAIR = "#3d2c1e", o = {stroke: INK, "stroke-width": 6, "stroke-linejoin": "round", "stroke-linecap": "round"};
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

S.kidRoom = (() => { const s = scene("kidRoom", "#0d1326", "#0d1326"), o = {stroke: INK, "stroke-width": 6, "stroke-linejoin": "round", "stroke-linecap": "round"}, A = (a, b) => Object.assign({}, o, a, b || {});
  const FLOOR = 760, DX = -40, DW = 300, DT = 60, SW = [436, 402], LAMP = [486, -6];
  s.cam = el("g", {}, s.stage); el("rect", {x: -500, y: -400, width: 2700, height: 1800, fill: "#0d1326"}, s.cam);
  s.dim = krFilter("krDim"); s.dimK = krFilter("krDimK");
  // ---- the room (drawn lit; the filter makes it night)
  const R1 = s.roomA = el("g", {}, s.cam);
  el("rect", {x: -400, y: -300, width: 2500, height: 1070, fill: "#ffd9a8"}, R1);                                                     // wall
  el("rect", {x: -400, y: -300, width: 2500, height: 262, fill: "#fff1d6"}, R1); el("line", {x1: -400, y1: -38, x2: 2100, y2: -38, stroke: INK, "stroke-width": 6}, R1);   // ceiling
  el("rect", {x: -400, y: FLOOR, width: 2500, height: 500, fill: "#d4a373"}, R1);                                                     // wooden floor
  [812, 880, 962].forEach(y => el("line", {x1: -400, y1: y, x2: 2100, y2: y, stroke: "#bc8a5f", "stroke-width": 4}, R1));
  seed = 41; [[786, 5], [846, 4], [921, 4], [991, 3]].forEach(([y, n]) => { for (let i = 0; i < n; i++) { const x = -150 + (i + rnd()) * 1920 / n; el("line", {x1: x, y1: y - 26, x2: x, y2: y + (y > 900 ? 29 : 26), stroke: "#bc8a5f", "stroke-width": 4}, R1); } });
  el("rect", {x: -400, y: FLOOR - 26, width: 2500, height: 26, fill: "#f4d9b0", stroke: INK, "stroke-width": 5}, R1);                 // skirting
  el("rect", A({x: DX - 16, y: DT - 16, width: DW + 32, height: FLOOR - DT + 16, fill: "#8d5b3a"}), R1);                              // door frame
  // the switch by the door
  s.sw = el("g", {transform: `translate(${SW[0]} ${SW[1]})`}, R1); el("rect", A({x: -30, y: -40, width: 60, height: 80, rx: 10, fill: "#fff", "stroke-width": 5}), s.sw);
  el("rect", A({x: -13, y: -24, width: 26, height: 48, rx: 6, fill: "#dee2e6", "stroke-width": 4}), s.sw); s.tog = el("rect", {x: -10, y: 0, width: 20, height: 21, rx: 4, fill: "#8d99ae"}, s.sw);
  // the ceiling light
  s.lampG = el("g", {transform: `translate(${LAMP[0]} ${LAMP[1]})`}, R1); el("rect", A({x: -64, y: -34, width: 128, height: 24, rx: 8, fill: "#adb5bd", "stroke-width": 5}), s.lampG);
  s.dome = el("path", A({d: "M-96 -12 H96 Q92 62 0 64 Q-92 62 -96 -12 Z", fill: "#dfe3e8"}), s.lampG);
  // the bed (right), with a shelf above it
  const bed = el("g", {transform: "translate(34 0)"}, R1);
  el("rect", A({x: 1236, y: 470, width: 40, height: 330, rx: 10, fill: "#bc8a5f"}), bed);                                            // headboard
  el("rect", A({x: 1262, y: 690, width: 640, height: 96, rx: 8, fill: "#9c6644"}), bed);                                             // frame
  el("rect", A({x: 1266, y: 606, width: 640, height: 96, rx: 22, fill: "#f8f9fa"}), bed);                                            // mattress
  el("rect", A({x: 1282, y: 556, width: 170, height: 70, rx: 30, fill: "#fff"}), bed);                                               // pillow
  el("path", A({d: "M1480 596 Q1500 580 1540 584 H1900 V742 H1500 Q1476 742 1478 716 Z", fill: "#8ecae6"}), bed);                    // blanket
  el("path", A({d: "M1480 628 H1900", fill: "none", stroke: "#fff", "stroke-width": 16}), bed); el("path", {d: "M1486 648 H1900", fill: "none", stroke: INK, "stroke-width": 4}, bed);
  el("rect", A({x: 1280, y: 786, width: 30, height: 26, fill: "#7f5539", "stroke-width": 5}), bed);
  const sh = el("g", {transform: "translate(34 0)"}, R1); el("rect", A({x: 1330, y: 300, width: 380, height: 22, rx: 6, fill: "#bc8a5f"}), sh);
  [["#e63946", 1352, 34, 104], ["#ffbe0b", 1386, 30, 86], ["#06d6a0", 1416, 38, 112], ["#3a86ff", 1454, 30, 94]].forEach(([c, x, w, h]) => el("rect", A({x, y: 300 - h, width: w, height: h, rx: 4, fill: c, "stroke-width": 5}), sh));
  el("path", A({d: "M1602 300 h56 l-10 -22 h-36 Z", fill: "#6c757d", "stroke-width": 5}), sh); el("circle", A({cx: 1630, cy: 232, r: 50, fill: "#4cc9f0", "stroke-width": 5}), sh);   // a globe
  el("path", A({d: "M1600 214 q16 -22 36 -10 q10 14 -6 26 q-4 22 -22 12 q-14 -10 -8 -28 Z M1648 240 q14 -6 20 6 q-4 16 -18 14 q-8 -8 -2 -20 Z", fill: "#52b788", "stroke-width": 3.5}), sh);
  // the study desk (under the window)
  const dk = el("g", {transform: "translate(70 0)"}, R1);
  [[624, 800], [1078, 800]].forEach(([x, y]) => el("rect", A({x, y: 520, width: 26, height: y - 520, fill: "#8a8a72", "stroke-width": 5}), dk));
  el("rect", A({x: 640, y: 528, width: 170, height: 190, rx: 6, fill: "#b7b79f", "stroke-width": 5}), dk); [566, 630].forEach(y => { el("line", {x1: 640, y1: y + 26, x2: 810, y2: y + 26, stroke: INK, "stroke-width": 4}, dk); el("rect", {x: 705, y: y - 4, width: 40, height: 9, rx: 4, fill: INK}, dk); });
  el("rect", A({x: 596, y: 500, width: 536, height: 30, rx: 8, fill: "#a5a58d"}), dk);
  [["#06d6a0", 646, 500, 108, 22], ["#ffbe0b", 654, 478, 96, 20], ["#ef476f", 650, 458, 100, 18]].forEach(([c, x, y, w, h]) => el("rect", A({x, y: y - h, width: w, height: h, rx: 4, fill: c, "stroke-width": 5}), dk));   // books
  el("rect", A({x: 800, y: 452, width: 46, height: 50, rx: 6, fill: "#4cc9f0", "stroke-width": 5}), dk);                              // pencil cup
  [[810, -8, "#ffbe0b"], [824, 4, "#ef476f"], [836, 14, "#06d6a0"]].forEach(([x, r, c]) => el("rect", A({x: x - 5, y: 410, width: 10, height: 46, rx: 3, fill: c, "stroke-width": 3.5, transform: `rotate(${r} ${x} 452)`}), dk));
  el("rect", A({x: 800, y: 452, width: 46, height: 50, rx: 6, fill: "#4cc9f0", "stroke-width": 5}), dk);
  el("path", A({d: "M1058 498 V430 L1010 392", fill: "none", "stroke-width": 15}), dk); el("path", {d: "M1058 498 V430 L1010 392", fill: "none", stroke: "#6c757d", "stroke-width": 6, "stroke-linejoin": "round"}, dk);   // the desk lamp from S.ceiling (off)
  el("rect", A({x: 1022, y: 488, width: 72, height: 14, rx: 6, fill: "#6c757d", "stroke-width": 5}), dk); el("path", A({d: "M1024 366 L984 414 L940 380 Q956 340 1000 344 Z", fill: "#f4a261"}), dk);
  // the chair, tucked in
  const ch = el("g", {transform: "translate(70 0)"}, R1); el("rect", A({x: 870, y: 440, width: 22, height: 372, rx: 8, fill: "#3a86ff", "stroke-width": 5}), ch); el("rect", A({x: 976, y: 610, width: 20, height: 202, rx: 8, fill: "#3a86ff", "stroke-width": 5}), ch);
  el("rect", A({x: 862, y: 596, width: 144, height: 28, rx: 10, fill: "#4895ef"}), ch); el("rect", A({x: 858, y: 428, width: 46, height: 110, rx: 14, fill: "#4895ef"}), ch);
  // ---- the window: outside it is evening; a few flats are lit (these glow by themselves, so they are not dimmed)
  const WX = 690, WY = 96, WW = 400, WH = 330, cp = el("clipPath", {id: "krWin"}, $("v").querySelector("defs")); el("rect", {x: WX, y: WY, width: WW, height: WH}, cp);
  s.out = el("g", {"clip-path": "url(#krWin)"}, s.cam);
  el("rect", {x: WX, y: WY, width: WW, height: WH, fill: gradL([[0, "#14213d"], [.7, "#3d348b"], [1, "#7b4b94"]])}, s.out);
  [[730, 150, 2.5], [812, 122, 2], [975, 136, 2.5], [1060, 190, 2], [920, 176, 1.8]].forEach(([x, y, r]) => el("circle", {cx: x, cy: y, r, fill: "#fff", opacity: .8}, s.out));
  el("circle", {cx: 1032, cy: 150, r: 24, fill: "#fff3c4"}, s.out); el("circle", {cx: 1022, cy: 143, r: 21, fill: "#1a2550"}, s.out);                      // a thin moon
  seed = 23; s.flats = [];
  [[676, 210, 150, "#243b6b"], [834, 262, 118, "#1f3160"], [960, 180, 150, "#2a437a"]].forEach(([x, top, w, col]) => { el("rect", {x, y: top, width: w, height: 300, fill: col, stroke: INK, "stroke-width": 5}, s.out);
    el("rect", {x: x - 4, y: top - 10, width: w + 8, height: 14, fill: col, stroke: INK, "stroke-width": 4}, s.out);
    for (let r = 0; r < 6; r++) for (let c = 0; c < Math.floor((w - 14) / 34); c++) { const litW = rnd() < .42; s.flats.push(el("rect", {x: x + 14 + c * 34, y: top + 18 + r * 38, width: 20, height: 22, rx: 2, fill: litW ? (rnd() < .3 ? "#fff3c4" : "#ffd166") : "#141d3d"}, s.out)); } });
  const R2 = s.roomB = el("g", {}, s.cam);
  el("rect", A({x: WX, y: WY, width: WW, height: WH, fill: "none", stroke: INK, "stroke-width": 20})), el("rect", {x: WX, y: WY, width: WW, height: WH, fill: "none", stroke: INK, "stroke-width": 22, "stroke-linejoin": "round"}, R2);
  el("rect", {x: WX, y: WY, width: WW, height: WH, fill: "none", stroke: "#fff", "stroke-width": 11}, R2); el("line", {x1: WX + WW / 2, y1: WY, x2: WX + WW / 2, y2: WY + WH, stroke: INK, "stroke-width": 16}, R2); el("line", {x1: WX + WW / 2, y1: WY, x2: WX + WW / 2, y2: WY + WH, stroke: "#fff", "stroke-width": 6}, R2);
  el("rect", A({x: WX - 26, y: WY + WH + 4, width: WW + 52, height: 20, rx: 6, fill: "#fff", "stroke-width": 5}), R2);
  el("line", {x1: WX - 70, y1: WY - 34, x2: WX + WW + 70, y2: WY - 34, stroke: INK, "stroke-width": 12, "stroke-linecap": "round"}, R2);
  [[WX - 58, 1], [WX + WW + 58, -1]].forEach(([x, d]) => el("path", A({d: `M${x} ${WY - 34} h${d * 96} q${-d * 6} 150 ${-d * 40} 250 q${-d * 6} 70 ${-d * 4} 152 h${-d * 52} Z`, fill: "#e76f51"}), R2));
  [[WX - 58, 1], [WX + WW + 58, -1]].forEach(([x, d]) => [26, 52].forEach(k => el("path", {d: `M${x + d * k} ${WY - 26} q${-d * 4} 200 ${-d * k * .55} 396`, fill: "none", stroke: "#c8553d", "stroke-width": 5, "stroke-linecap": "round"}, R2)));
  // ---- the hallway behind the door (bright), and its light on the bedroom floor
  s.hall = el("g", {}, s.cam); el("rect", {x: DX, y: DT, width: DW, height: FLOOR - DT, fill: "#fff3c4"}, s.hall); el("rect", {x: DX, y: 690, width: DW, height: 70, fill: "#f0c987"}, s.hall);
  el("line", {x1: DX, y1: 690, x2: DX + DW, y2: 690, stroke: "#d9a05b", "stroke-width": 6}, s.hall); el("rect", {x: DX, y: DT, width: DW, height: FLOOR - DT, fill: gradL([[0, "#fff", .7], [.5, "#fff", 0]])}, s.hall);
  s.spill = el("path", {fill: gradL([[0, "#ffe08a", .95], [1, "#ffd166", .35]])}, s.cam);
  s.kidSh = el("path", {fill: INK, opacity: 0}, s.cam);
  s.kidG = el("g", {}, s.cam); s.kid = krKid(s.kidG);
  s.leafG = el("g", {}, s.cam); s.leaf = el("path", A({fill: "#c98b5a"}), s.leafG); s.leafIn = el("path", {fill: "none", stroke: "#a86f44", "stroke-width": 6, "stroke-linejoin": "round"}, s.leafG);
  s.knob = el("g", {}, s.leafG); el("rect", A({x: -9, y: -22, width: 18, height: 44, rx: 8, fill: "#dee2e6", "stroke-width": 4}), s.knob); el("rect", A({x: -34, y: -7, width: 40, height: 14, rx: 7, fill: "#f8f9fa", "stroke-width": 4}), s.knob);
  s.edge = el("path", {fill: "#ffd98a", stroke: INK, "stroke-width": 5, "stroke-linejoin": "round"}, s.cam);
  s.crack = el("rect", {x: DX + 6, y: FLOOR - 9, width: DW - 12, height: 9, fill: "#ffe08a"}, s.cam);
  // ---- the light
  s.glow = el("g", {transform: `translate(${LAMP[0]} ${LAMP[1] + 40})`, opacity: 0}, s.cam); glowDot(s.glow, "#fff3b0", 520, .5, .06);
  s.rays = el("g", {transform: `translate(${LAMP[0]} ${LAMP[1] + 22})`, opacity: 0}, s.cam);
  for (let k = 0; k < 6; k++) { const a = (30 + k * 24) * Math.PI / 180; el("line", {x1: Math.cos(a) * 128, y1: Math.sin(a) * 96, x2: Math.cos(a) * 188, y2: Math.sin(a) * 142, stroke: INK, "stroke-width": 20, "stroke-linecap": "round"}, s.rays); }
  for (let k = 0; k < 6; k++) { const a = (30 + k * 24) * Math.PI / 180; el("line", {x1: Math.cos(a) * 128, y1: Math.sin(a) * 96, x2: Math.cos(a) * 188, y2: Math.sin(a) * 142, stroke: "#ffe14d", "stroke-width": 10, "stroke-linecap": "round"}, s.rays); }
  s.flash = el("rect", {x: -500, y: -400, width: 2700, height: 1800, fill: "#fff6d0", opacity: 0}, s.cam);
  s.spark = el("g", {transform: `translate(${SW[0]} ${SW[1]})`, opacity: 0}, s.cam);
  [-150, -100, -50, 0, 50].forEach(a => { const r = a * Math.PI / 180; el("line", {x1: Math.cos(r) * 52, y1: Math.sin(r) * 52, x2: Math.cos(r) * 80, y2: Math.sin(r) * 80, stroke: "#ffe14d", "stroke-width": 9, "stroke-linecap": "round"}, s.spark); });

  s.run = t => { const c = SC.kidRoom, u = FR("kidRoom")(t) * KR.U + Math.min(0, t - c.t0) * KR.U / Math.max(.1, c.t1 - c.t0), CL = KR.CL;
    const lit = ramp(u, CL, CL + .07), after = u - CL;
    // light: night colours until the click
    const filt = lit < 1 ? "url(#krDim)" : null; [s.roomA, s.roomB, s.leafG].forEach(g => filt ? set(g, "filter", filt) : g.removeAttribute("filter"));
    lit < 1 ? set(s.kidG, "filter", "url(#krDimK)") : s.kidG.removeAttribute("filter");
    const open = ease((u - KR.DOOR[0]) / (KR.DOOR[1] - KR.DOOR[0]));
    s.dim([.2 + .05 * open, .25 + .05 * open, .5 + .04 * open], [.012, .02, .06], lit); s.dimK([.46, .46, .66], [.01, .015, .05], lit);
    op(s.flash, .42 * lit * (1 - ramp(after, .04, .34))); op(s.glow, lit * (.6 + .4 * (1 - ramp(after, .05, .5))));
    op(s.rays, lit); tf(s.rays, `translate(${LAMP[0]} ${LAMP[1] + 22}) scale(${lit ? .7 + .3 * pop(u, CL, .3) : .7})`);
    set(s.dome, "fill", lit > .5 ? "#fff8d6" : "#dfe3e8"); set(s.tog, "y", lit > .5 ? -21 : 0); set(s.tog, "fill", lit > .5 ? "#06d6a0" : "#8d99ae");
    op(s.spark, on(u, CL, CL + .32, .08)); tf(s.spark, `translate(${SW[0]} ${SW[1]}) scale(${.6 + .5 * ramp(u, CL, CL + .25)})`);
    // the door swings into the room (hinge on the left); the leaf gets narrower and its free edge comes towards us
    const an = open * 80 * Math.PI / 180, cs = Math.cos(an), sn = Math.sin(an), xe = DX + DW * cs, yt = DT - 30 * sn, yb = FLOOR + 46 * sn;
    set(s.leaf, "d", `M${DX} ${DT} L${xe} ${yt} L${xe} ${yb} L${DX} ${FLOOR} Z`);
    const ix = k => DX + DW * cs * k, iy = (k, v) => lerp(lerp(DT, yt, k), lerp(FLOOR, yb, k), v);
    set(s.leafIn, "d", [[.12, .88, .06, .46], [.12, .88, .54, .94]].map(([a, b, v0, v1]) => `M${ix(a)} ${iy(a, v0)} L${ix(b)} ${iy(b, v0)} L${ix(b)} ${iy(b, v1)} L${ix(a)} ${iy(a, v1)} Z`).join(" "));
    tf(s.knob, `translate(${ix(.9)} ${iy(.9, .5)}) scale(${Math.max(.25, cs)} 1)`);
    set(s.edge, "d", `M${xe} ${yt} l${16 * sn} ${-2 * sn} V${yb + 3 * sn} L${xe} ${yb} Z`); op(s.edge, open > .02 ? 1 : 0);
    op(s.crack, (1 - ramp(open, 0, .15)) * (1 - lit));
    set(s.spill, "d", `M${xe} ${FLOOR} L${DX + DW} ${FLOOR} L${DX + DW + 330 * open} 1040 L${xe - 150 - 60 * open} 1040 Z`); op(s.spill, ramp(open, 0, .25) * (1 - lit));
    // the pupil walks in
    const p = clamp((u - KR.WALK[0]) / (KR.WALK[1] - KR.WALK[0])), pe = .5 * p + .5 * ease(p), kx = lerp(74, 292, pe), ky = lerp(756, 784, pe), ksc = lerp(.92, 1, pe);
    const amp = 19 * ramp(u, KR.WALK[0], KR.STEP0) * (1 - ramp(u, KR.STEP0 + 3 * KR.STEP, KR.WALK[1] + .04)), ph = Math.PI / 2 + Math.PI * (u - KR.STEP0) / KR.STEP, sw = amp * Math.sin(ph);
    const hop = -16 * on(u, CL + .04, CL + .46, .16), bob = -amp / 19 * 7 * Math.abs(Math.cos(ph)) + hop;
    const reach = ramp(u, KR.REACH[0], KR.REACH[1]), press = ramp(u, CL - .12, CL) * (1 - ramp(u, CL + .08, CL + .2)), down = ramp(u, CL + .12, CL + .5);
    const K = s.kid; tf(K, `translate(${kx} ${ky}) scale(${ksc})`); tf(K.body, `translate(0 ${bob}) rotate(${4 * reach * (1 - down) + 1.5 * amp / 19} 0 -120)`);
    tf(K.legN, `translate(16 -120) rotate(${sw})`); tf(K.legF, `translate(-14 -120) rotate(${-sw})`);
    tf(K.armF, `translate(-6 -300) rotate(${sw * .9 - 14 * down * (1 - ramp(u, CL + .5, CL + .9))})`);
    const aN = lerp(lerp(-sw * .9, -121, reach), -18, down);
    tf(K.armN, `translate(${10 + 7 * press} ${-300 - 5 * press}) rotate(${aN})`);
    const look = ramp(u, CL + .06, CL + .32), nod = 4 * reach * (1 - look);
    tf(K.head, `rotate(${-24 * look + nod - 3 * (1 - reach) * amp / 19} 2 -330)`);
    op(K.m0, look < .5 ? 1 : 0); op(K.m1, look >= .5 ? 1 : 0); tf(K.brow, `translate(0 ${-7 * look})`); tf(K.eyes, `translate(${3 * look} ${-4 * look})`);
    op(K.sh, .1 + .16 * lit);
    // the pupil's long shadow in the hallway light
    set(s.kidSh, "d", `M${kx - 46 * ksc} ${ky + 6} L${kx + 50 * ksc} ${ky + 6} L${kx + 250 + 90 * pe} 1040 L${kx + 40 + 60 * pe} 1040 Z`); op(s.kidSh, .34 * ramp(open, .3, .9) * (1 - lit));
    // camera: a slow push towards the switch, then it springs back as the room lights up
    const push = ramp(u, 1.3, CL - .1), back = Math.min(1.08, Math.max(0, pop(u, CL, .45))), z = 1 + .3 * push - .13 * back;
    tf(s.cam, `translate(${VP[0]} ${VP[1]}) scale(${z}) translate(${-lerp(lerp(VP[0], 470, push), 590, back)} ${-lerp(lerp(VP[1], 500, push), 392, back)})`); }; return s; })();
