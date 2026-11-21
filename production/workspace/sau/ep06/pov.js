/* TheOneApp, Explored EP06: the picture-only shots. Load after common.js, geo_map.js and ep06/scenes.js.
   canteenBite (cold open, outside) · povMouth · povGullet · povStomach · povSmall · povLarge · povExit (first person: YOU are a bit of
   fibre from the green vegetable; the green edge of the screen is you) · toilet (outside).
   u = seconds into the shot. Every frame depends only on t. Science (rule 9): teeth chew and saliva starts digestion in the mouth;
   the gullet pushes food down in muscle waves; the stomach churns food with digestive juices; in the small intestine digested food
   passes through the wall into the blood; fibre is not digested; in the large intestine water is taken back. */

const ME6 = "#40916c";
// a tunnel whose rings can shift and squeeze: fn(z, ring) -> [dx, dy, squeeze, turn]
function tun6(p, n, make) { const G = el("g", {}, p), a = []; for (let i = 0; i < n; i++) { const e = el("g", {}, G); make(e, i); a.push({z0: i / n, e, i}); } a.G = G; return a; }
function runTun6(a, off, R, fn, fade = .22) { a.forEach(o => { const z = ((o.z0 - off) % 1 + 1) % 1, zz = .12 + 8 * z; o.z = z; const m = fn ? fn(z, o) : [0, 0, 1, 0];
    tf(o.e, `translate(${VP[0] + m[0]} ${VP[1] + m[1]}) scale(${R / 300 / zz * m[2]}) rotate(${m[3] || 0})`); op(o.e, clamp((1 - z) / fade)); });
  a.slice().sort((p, q) => q.z - p.z).forEach(o => a.G.appendChild(o.e)); }
const donut6 = (p, col, ri = 300) => el("path", {d: `M-9000 0 a9000 9000 0 1 0 18000 0 a9000 9000 0 1 0 -18000 0 Z M${-ri} 0 a${ri} ${ri} 0 1 0 ${2 * ri} 0 a${ri} ${ri} 0 1 0 ${-2 * ri} 0 Z`, fill: col, "fill-rule": "evenodd", stroke: INK, "stroke-width": 5}, p);
const cam6 = (g, z, cx, cy, rot = 0) => tf(g, `translate(${VP[0]} ${VP[1]}) rotate(${rot}) scale(${z}) translate(${-cx} ${-cy})`);
const shake6 = (u, T, amp = 16) => u > T ? amp * Math.sin((u - T) * 70) * Math.exp(-(u - T) * 9) : 0;

/* ================= COLD OPEN: the school canteen. A spoonful of rice, egg and chye sim... chomp. ================= */
S.canteenBite = (() => { const s = scene("canteenBite", "#fff1d0", "#fff1d0"), SKIN = "#f1c27d", BLUE = "#3a86ff", HAIR = "#3d2c1e";
  s.cam = el("g", {}, s.stage); const c = s.cam;
  el("rect", {x: -900, y: -700, width: 3600, height: 2400, fill: "#fff1d0"}, c); el("rect", {x: -900, y: -700, width: 3600, height: 720, fill: "#ffe3a8"}, c);
  el("line", {x1: -900, y1: 20, x2: 2700, y2: 20, stroke: "#e9c46a", "stroke-width": 8}, c);
  // the stalls along the back
  [["STALL 1 · RICE", "#e63946", "🍚🥬🍳"], ["STALL 2 · NOODLES", "#2a9d8f", "🍜🥟🥢"], ["STALL 3 · DRINKS", "#3a86ff", "🧃🥛🍉"]].forEach(([name, col, em], i) => { const x = 430 + i * 470, g = el("g", {}, c);
    el("rect", A6({x, y: 150, width: 430, height: 450, fill: "#5c4d7d"}), g); el("rect", {x: x + 16, y: 166, width: 398, height: 250, fill: "#fdf0d5"}, g);
    [0, 1, 2].forEach(k => { el("rect", A6({x: x + 30 + k * 128, y: 186, width: 112, height: 124, rx: 10, fill: "#fff", "stroke-width": 4}), g); emo(g, x + 86 + k * 128, 248, 70, [...em][k]); });
    el("rect", A6({x: x - 12, y: 50, width: 454, height: 104, rx: 14, fill: col}), g); tx(g, {x: x + 215, y: 120, "text-anchor": "middle", "font-size": 44, "font-weight": 700, fill: "#fff", "letter-spacing": 2}, name);
    el("rect", A6({x: x - 12, y: 400, width: 454, height: 34, rx: 8, fill: "#f8f9fa"}), g); el("rect", A6({x, y: 434, width: 430, height: 170, fill: "#dee2e6"}), g); });
  // a poster on the wall
  const po = el("g", {}, c); el("rect", A6({x: -110, y: 90, width: 330, height: 330, rx: 14, fill: "#d8f3dc"}), po); emo(po, 55, 210, 150, "🥦"); tx(po, {x: 55, y: 372, "text-anchor": "middle", "font-size": 38, "font-weight": 700, fill: "#2d6a4f"}, "EAT YOUR GREENS");
  el("rect", {x: -900, y: -700, width: 3600, height: 1400, fill: "#fff1d0", opacity: .28}, c);
  // the pupil (side view, facing right), in the series' look: blue school shirt, red bag, dark hair
  const K = "translate(520 250) scale(1.875) translate(-6 402)", kb = el("g", {transform: K}, c);
  el("rect", A6({x: -104, y: -316, width: 78, height: 150, rx: 22, fill: "#e63946"}), kb);
  el("rect", A6({x: -54, y: -326, width: 108, height: 190, rx: 30, fill: BLUE}), kb); el("rect", A6({x: 6, y: -278, width: 34, height: 34, rx: 6, fill: "#fff", "stroke-width": 4}), kb);
  el("path", A6({d: "M-30 -326 Q-14 -252 -50 -212", fill: "none", "stroke-width": 18}), kb); el("path", {d: "M-30 -326 Q-14 -252 -50 -212", fill: "none", stroke: "#c1121f", "stroke-width": 9, "stroke-linecap": "round"}, kb);
  s.head = el("g", {}, kb); const h = s.head;
  el("rect", A6({x: -15, y: -340, width: 34, height: 30, fill: SKIN, "stroke-width": 5}), h); el("path", A6({d: "M-26 -324 L4 -300 L34 -324 L22 -336 H-14 Z", fill: "#fff", "stroke-width": 5}), h);
  el("circle", A6({cx: 6, cy: -402, r: 80, fill: SKIN}), h);
  s.cheek = el("circle", A6({cx: 38, cy: -366, r: 20, fill: SKIN, "stroke-width": 4, opacity: 0}), h);
  el("path", A6({d: "M-72 -372 Q-92 -486 0 -488 Q84 -490 88 -420 Q60 -446 22 -448 Q-4 -444 -14 -412 Q-22 -384 -40 -352 Q-66 -352 -72 -372 Z", fill: HAIR}), h);
  el("path", {d: "M-8 -487 Q0 -506 16 -500", fill: "none", stroke: INK, "stroke-width": 9, "stroke-linecap": "round"}, h); el("path", {d: "M-8 -487 Q0 -506 16 -500", fill: "none", stroke: HAIR, "stroke-width": 6, "stroke-linecap": "round"}, h);
  el("ellipse", A6({cx: -18, cy: -394, rx: 13, ry: 17, fill: SKIN, "stroke-width": 5}), h); el("circle", {cx: 24, cy: -372, r: 15, fill: "#ff8fa3", opacity: .6}, h);
  s.eyes = el("g", {}, h); [[32, 11, 15], [66, 9, 14]].forEach(([x, rx, ry]) => { el("ellipse", {cx: x, cy: -404, rx, ry, fill: INK}, s.eyes); el("circle", {cx: x + 3, cy: -410, r: 4.4, fill: "#fff"}, s.eyes); });
  s.eyesH = el("g", {opacity: 0}, h); [[32, 12], [66, 10]].forEach(([x, w]) => el("path", {d: `M${x - w} -400 Q${x} -416 ${x + w} -400`, fill: "none", stroke: INK, "stroke-width": 6, "stroke-linecap": "round"}, s.eyesH));
  [[20, 44], [58, 76]].forEach(([a, b]) => el("path", {d: `M${a} -430 Q${(a + b) / 2} -437 ${b} -431`, fill: "none", stroke: INK, "stroke-width": 5, "stroke-linecap": "round"}, h));
  s.m0 = el("path", {d: "M40 -370 Q54 -362 68 -371", fill: "none", stroke: INK, "stroke-width": 5.5, "stroke-linecap": "round"}, h);
  s.m1 = el("g", {}, h); s.mo = el("ellipse", A6({cx: 58, cy: -366, rx: 19, ry: 16, fill: "#7a1c1c", "stroke-width": 5}), s.m1); s.mt = el("rect", {x: 44, y: -380, width: 28, height: 7, rx: 3, fill: "#fff"}, s.m1);
  // the table, the plate (rice, a fried egg, chye sim) and a cup
  const tb = el("g", {}, c); el("rect", A6({x: -900, y: 600, width: 3600, height: 900, fill: "#8ecae6"}), tb); el("rect", {x: -900, y: 604, width: 3600, height: 16, fill: "#fff", opacity: .4}, tb);
  el("ellipse", {cx: 800, cy: 676, rx: 250, ry: 44, fill: INK, opacity: .15}, tb); el("ellipse", A6({cx: 800, cy: 664, rx: 240, ry: 50, fill: "#f8f9fa"}), tb); el("ellipse", {cx: 800, cy: 668, rx: 190, ry: 34, fill: "none", stroke: "#ced4da", "stroke-width": 5}, tb);
  el("ellipse", A6({cx: 905, cy: 650, rx: 84, ry: 22, fill: "#fffdf7", "stroke-width": 5}), tb); el("path", A6({d: "M872 646 Q876 612 906 612 Q936 612 940 646 Z", fill: "#ffc93c", "stroke-width": 5}), tb);
  el("path", A6({d: "M610 662 Q616 570 716 566 Q812 570 820 662 Z", fill: "#fffdf2", "stroke-width": 5}), tb);
  seed = 66; for (let i = 0; i < 26; i++) { const x = 640 + rnd() * 150, y = 590 + rnd() * 60; el("ellipse", {cx: x, cy: y, rx: 9, ry: 4.5, fill: "none", stroke: "#d8cfae", "stroke-width": 2.5, transform: `rotate(${rnd() * 180} ${x} ${y})`}, tb); }
  [[700, 690, -4], [770, 700, 3], [840, 692, -2]].forEach(([x, y, r]) => { const g = el("g", {transform: `translate(${x} ${y}) rotate(${r})`}, tb); el("rect", A6({x: -70, y: -7, width: 150, height: 14, rx: 7, fill: "#b7e4c7", "stroke-width": 4}), g);
    el("ellipse", A6({cx: 96, cy: -4, rx: 44, ry: 17, fill: "#40916c", "stroke-width": 4}), g); el("ellipse", A6({cx: 40, cy: -14, rx: 30, ry: 11, fill: "#52b788", "stroke-width": 4}), g); el("circle", {cx: -60, cy: -10, r: 6, fill: "#ffd60a", stroke: INK, "stroke-width": 2}, g); });
  const cup = el("g", {}, tb); el("path", A6({d: "M1150 520 H1270 L1256 676 H1164 Z", fill: "#fff"}), cup); el("path", {d: "M1156 580 H1264 L1256 672 H1164 Z", fill: "#bc8a5f"}, cup); el("line", {x1: 1232, y1: 430, x2: 1206, y2: 640, stroke: INK, "stroke-width": 14, "stroke-linecap": "round"}, cup); el("line", {x1: 1232, y1: 430, x2: 1206, y2: 640, stroke: "#ef476f", "stroke-width": 8, "stroke-linecap": "round"}, cup);
  // the near arm and the spoon
  const ka = el("g", {transform: K}, c);
  s.arm0 = el("path", {fill: "none", stroke: INK, "stroke-width": 40, "stroke-linecap": "round", "stroke-linejoin": "round"}, ka);
  s.arm1 = el("path", {fill: "none", stroke: SKIN, "stroke-width": 29, "stroke-linecap": "round"}, ka); s.arm2 = el("path", {fill: "none", stroke: BLUE, "stroke-width": 29, "stroke-linecap": "round"}, ka);
  s.sp = el("g", {}, ka); el("line", {x1: -8, y1: -2, x2: 66, y2: 20, stroke: INK, "stroke-width": 13, "stroke-linecap": "round"}, s.sp); el("line", {x1: -8, y1: -2, x2: 66, y2: 20, stroke: "#ced4da", "stroke-width": 7, "stroke-linecap": "round"}, s.sp);
  el("ellipse", A6({cx: -6, cy: 0, rx: 27, ry: 11, fill: "#e9ecef", "stroke-width": 4}), s.sp);
  s.food = el("g", {}, s.sp); el("path", A6({d: "M-30 -1 Q-28 -30 -6 -30 Q16 -30 18 -1 Z", fill: "#fffdf2", "stroke-width": 4}), s.food); el("circle", A6({cx: 6, cy: -20, r: 10, fill: "#ffc93c", "stroke-width": 3.5}), s.food);
  el("path", A6({d: "M-26 -14 Q-22 -34 -4 -30 Q-8 -14 -26 -14 Z", fill: "#40916c", "stroke-width": 3.5}), s.food);
  s.hand = el("circle", A6({r: 18, fill: SKIN, "stroke-width": 5}), ka);
  s.ch = tx(s.stage, {x: 0, y: 0, "text-anchor": "middle", "font-size": 150, "font-weight": 700, fill: "#ffe14d", class: "out", "stroke-width": 20}, "CHOMP!");
  s.card = card6(s.stage, "Recess in the school canteen", INK, 44);
  const Sx = 4, Sy = -296, LA = 100;
  s.run = t => { const u = U6("canteenBite", t), CH = 3.3;
    // the spoon bowl: over the plate, a scoop, up to the mouth, in, out
    const P = [[0, 112, -246], [.45, 112, -246], [.8, 110, -222], [1.15, 112, -244], [2.6, 100, -360], [3.1, 76, -366], [CH + .1, 76, -366], [3.9, 124, -330], [4.7, 128, -256], [9, 128, -256]];
    let bx = 112, by = -246; for (let i = 0; i < P.length - 1; i++) if (u >= P[i][0]) { const k = ease(sg6(u, P[i][0], P[i + 1][0])); bx = lerp(P[i][1], P[i + 1][1], k); by = lerp(P[i][2], P[i + 1][2], k); }
    const hx = bx + 62, hy = by + 18, dx = hx - Sx, dy = hy - Sy, d = Math.min(2 * LA - 1, Math.hypot(dx, dy)), b = Math.atan2(dy, dx) + Math.acos(d / (2 * LA)), ex = Sx + LA * Math.cos(b), ey = Sy + LA * Math.sin(b);
    set(s.arm0, "d", `M${Sx} ${Sy} L${ex} ${ey} L${hx} ${hy}`); set(s.arm1, "d", `M${ex} ${ey} L${hx} ${hy}`); set(s.arm2, "d", `M${Sx} ${Sy} L${lerp(Sx, ex, .7)} ${lerp(Sy, ey, .7)}`);
    tf(s.sp, `translate(${bx} ${by})`); tf(s.hand, `translate(${hx} ${hy})`); op(s.food, u > .8 && u < CH ? 1 : 0);
    const open = ramp(u, 2.3, 2.9) * (1 - ramp(u, CH - .06, CH + .02)), chew = u > CH ? Math.sin((u - CH) * 14) : 0;
    op(s.m1, open > .02 ? 1 : 0); op(s.m0, open > .02 ? 0 : 1); set(s.mo, "ry", 3 + 15 * open); set(s.mt, "y", -366 - 3 - 12 * open);
    set(s.m0, "d", `M40 ${-370 + 2 * chew} Q54 ${-362 + 4 * chew} 68 ${-371 + 2 * chew}`);
    op(s.cheek, u > CH ? 1 : 0); set(s.cheek, "r", 19 + 4 * chew); op(s.eyes, u > CH + .1 ? 0 : 1); op(s.eyesH, u > CH + .1 ? 1 : 0);
    tf(s.head, `rotate(${5 * ramp(u, 2.2, 3) - 4 * ramp(u, CH + .1, 3.9) + 1.2 * chew * (u > CH ? 1 : 0)} 6 -330)`);
    const z = lerp(1.04, 1.85, ramp(u, .9, 3)) + .12 * ramp(u, CH, 5), sh = shake6(u, CH, 10);
    cam6(c, z, lerp(810, 700, ramp(u, .9, 3)) + sh, lerp(480, 380, ramp(u, .9, 3)));
    tf(s.ch, `translate(1180 300) rotate(8) scale(${Math.max(0, pop(u, CH, .35))})`); op(s.ch, on(u, CH, 4.75, .15));
    showC6(s.card, t, SC.canteenBite.t0 + .2, SC.canteenBite.t0 + 2.6); }; return s; })();

/* ================= 1. THE MOUTH: teeth slam down like giant white walls, saliva splashes, the tongue rolls us back ================= */
S.povMouth = (() => { const s = scene("povMouth", "#5c0a17", "#5c0a17"), CH = [.9, 1.95, 3.0];
  s.cam = el("g", {}, s.stage); const c = s.cam;
  el("rect", {x: -2000, y: -2000, width: 5600, height: 5000, fill: grad6("radialGradient", {cx: .5, cy: .48, r: .5}, [[0, "#7a1020"], [1, "#a4133c"]])}, c);
  [[760, "#b3243f"], [600, "#8f1a33"], [450, "#6d1227"]].forEach(([r, col]) => el("ellipse", A6({cx: VP[0], cy: 430, rx: r * 1.25, ry: r * .82, fill: col, "stroke-width": 5}), c));    // the roof and cheeks, ring by ring
  el("ellipse", A6({cx: VP[0], cy: 450, rx: 300, ry: 230, fill: "#2b0409", "stroke-width": 6}), c);                                                                                         // the throat
  el("path", A6({d: `M${VP[0] - 34} 224 Q${VP[0] - 40} 330 ${VP[0]} 348 Q${VP[0] + 40} 330 ${VP[0] + 34} 224 Z`, fill: "#e5536e", "stroke-width": 5}), c);
  s.tongue = el("g", {}, c); el("path", A6({d: "M-900 1900 V820 Q-300 590 810 574 Q1920 590 2500 820 V1900 Z", fill: "#ff6b81", "stroke-width": 7}), s.tongue);
  el("path", {d: "M810 600 V1100", stroke: "#e5536e", "stroke-width": 12, "stroke-linecap": "round"}, s.tongue);
  seed = 611; for (let i = 0; i < 60; i++) { const x = -100 + rnd() * 1820, y = 660 + rnd() * 340; el("circle", {cx: x, cy: y, r: 5 + rnd() * 7, fill: "#ff8fa3", opacity: .8}, s.tongue); }
  // our friends on the tongue, and the pieces they are chewed into
  s.bits = []; seed = 613; for (let i = 0; i < 14; i++) { const fr = i % 2; s.bits.push({e: el("ellipse", A6({rx: fr ? 17 : 12, ry: fr ? 14 : 20, fill: fr ? "#ffc93c" : "#fffdf2", "stroke-width": 4}), c), fr, n: Math.floor(i / 2) % 3 + (i > 5 ? 0 : 0), a: rnd() * 6.28, r: 70 + rnd() * 130, i}); }
  s.rice = el("g", {}, c); s.riceC = rice6(s.rice); s.egg = el("g", {}, c); s.eggC = egg6(s.egg);
  // bits of us (green) fly at each bite
  s.green = []; for (let i = 0; i < 12; i++) s.green.push({e: el("path", A6({d: "M-30 8 Q-20 -22 14 -20 Q34 -6 22 14 Q-6 26 -30 8 Z", fill: "#52b788", "stroke-width": 4}), s.stage), a: rnd() * 6.28, v: .6 + rnd() * .6, n: i % 3});
  // saliva
  s.sal = []; for (let i = 0; i < 30; i++) s.sal.push({e: el("ellipse", {rx: 14, ry: 22, fill: "#d7ecff", stroke: "#74b3e8", "stroke-width": 4, opacity: 0}, s.stage), x: rnd() * 1800 - 100, a: rnd(), v: .5 + rnd(), n: i % 3, dn: i % 2});
  // the teeth: two rows of giant white walls
  const row = (up) => { const g = el("g", {}, s.stage), d = up ? -1 : 1;
    el("rect", A6({x: -400, y: up ? -1700 : 640, width: 2700, height: 1060, fill: "#ff8fa3", "stroke-width": 8}), g);
    for (let k = 0; k < 6; k++) { const x = -260 + k * 360; el("rect", A6({x: x + 8, y: up ? -760 : 0, width: 344, height: 760, rx: 86, fill: grad6("linearGradient", {x1: 0, y1: 0, x2: 1, y2: 0}, [[0, "#ffffff"], [.75, "#f4f1e8"], [1, "#ddd8c8"]]), "stroke-width": 9}), g);
      el("path", {d: `M${x + 70} ${d * 40} Q${x + 180} ${d * 90} ${x + 290} ${d * 40}`, fill: "none", stroke: "#d8d2c0", "stroke-width": 9, "stroke-linecap": "round", transform: `translate(0 ${up ? -110 : 110})`}, g); }
    return g; };
  s.tU = row(true); s.tD = row(false);
  s.flash = fullRect(s.stage, "#fff", 0); s.dark = fullRect(s.stage, "#2b0409", 0); s.vg = vignette(s.stage, ME6, .7);
  s.card = card6(s.stage, "Mouth: teeth chew you into small pieces", "#c9184a", 46);
  s.run = t => { const u = U6("povMouth", t), sc = SC.povMouth;
    let cl = 0, sh = 0, fl = 0, nb = 0; CH.forEach(T => { const k = u < T ? Math.pow(sg6(u, T - .26, T), 3) : 1 - ease(sg6(u, T + .1, T + .5)); cl = Math.max(cl, k); sh += shake6(u, T, 22); fl = Math.max(fl, on(u, T - .01, T + .16, .05)); if (u >= T) nb++; });
    tf(s.tU, `translate(0 ${lerp(20, 478, cl) + sh})`); tf(s.tD, `translate(0 ${lerp(950, 482, cl) - sh})`); op(s.flash, .55 * fl);
    // the tongue rolls us to the back of the mouth: the throat grows until it swallows the screen
    const ro = ease(sg6(u, 3.55, 5)), z = 1 + 4.2 * ro * ro; cam6(c, z, VP[0], lerp(480, 450, ro), 10 * Math.sin(ro * Math.PI) + sh * .1);
    tf(s.tongue, `translate(0 ${-150 * Math.sin(Math.min(1, ro * 1.6) * Math.PI) + 8 * Math.sin(u * 3)})`); op(s.dark, ramp(u, 4.55, 4.95));
    const sq = 1 - .3 * cl, fs = [1.9, 1.6, 1.3, 1.05][nb];
    tf(s.rice, `translate(${lerp(520, 760, ro)} ${lerp(690, 470, ro)}) rotate(${-12 + 400 * ro}) scale(${fs * (1 - .75 * ro)} ${fs * sq * (1 - .75 * ro)})`);
    tf(s.egg, `translate(${lerp(1110, 860, ro)} ${lerp(700, 480, ro)}) rotate(${10 - 380 * ro}) scale(${fs * (1 - .75 * ro)} ${fs * sq * (1 - .75 * ro)})`);
    s.bits.forEach(b => { const T = CH[b.n], k = sg6(u, T, T + .35), cx = b.fr ? 1110 : 520, cy = b.fr ? 700 : 690; const x = cx + Math.cos(b.a) * b.r * ease(k), y = cy + 40 + Math.sin(b.a) * b.r * .45 * ease(k) - 60 * Math.sin(k * Math.PI);
      tf(b.e, `translate(${lerp(x, 810, ro)} ${lerp(y, 470, ro)}) rotate(${b.a * 60}) scale(${1 - .7 * ro})`); op(b.e, u >= T ? 1 : 0); });
    s.green.forEach(g => { const T = CH[g.n], k = sg6(u, T, T + .7); tf(g.e, `translate(${VP[0] + Math.cos(g.a) * 1300 * k * g.v} ${VP[1] + Math.sin(g.a) * 800 * k * g.v}) rotate(${g.a * 90 + k * 300}) scale(${1 + 5 * k})`); op(g.e, u >= T ? 1 - k : 0); });
    s.sal.forEach(d => { const T = CH[d.n], k = sg6(u, T + .02, T + .75 + .2 * d.a), dir = d.dn ? 1 : -1; tf(d.e, `translate(${d.x + (d.a - .5) * 300 * k} ${480 + dir * 460 * d.v * k + 380 * k * k}) scale(${1.6 - .8 * k})`); op(d.e, u >= T ? Math.sin(Math.min(1, k * 1.1) * Math.PI) : 0); });
    showC6(s.card, t, sc.t0 + .3, sc.t0 + 4.5); }; return s; })();

/* ================= 2. THE GULLET: squeezed down in muscle waves ================= */
S.povGullet = (() => { const s = scene("povGullet", "#2b0409", "#2b0409"); fullRect(s.stage, "#3b0a14");
  s.tun = tun6(s.stage, 12, (e, i) => { donut6(e, i % 2 ? "#e5697a" : "#d14b63"); el("circle", {r: 316, fill: "none", stroke: "#ffb3c1", "stroke-width": 16, opacity: .55}, e);
    for (let k = 0; k < 16; k++) el("line", {x1: 0, y1: -322, x2: 0, y2: -420, stroke: "#b0304a", "stroke-width": 9, "stroke-linecap": "round", transform: `rotate(${k * 22.5 + i * 9})`}, e); });
  s.far = el("circle", {cx: VP[0], cy: VP[1], r: 150, fill: "#1a0206", filter: "url(#blur)"}, s.stage);
  s.rice = el("g", {}, s.stage); rice6(s.rice); s.egg = el("g", {}, s.stage); egg6(s.egg);
  s.glow = el("circle", {cx: VP[0], cy: VP[1], r: 10, fill: "#d9ed92"}, s.stage);
  s.sq = vignette(s.stage, "#7a1020", .9); s.vg = vignette(s.stage, ME6, .7);
  s.card = card6(s.stage, "Down the gullet!", "#c9184a", 50);
  s.run = t => { const u = U6("povGullet", t), sc = SC.povGullet, off = .1 + .34 * u, per = 1.1, ph = (u % per) / per, zw = ph * .55;
    runTun6(s.tun, off, 390, z => [0, 0, 1 - .42 * Math.exp(-Math.pow((z - zw) / .07, 2)), 0]);
    const pz = Math.exp(-Math.pow((ph - .16) / .1, 2));                         // the squeeze passes us, then our friends just ahead
    op(s.sq, .25 + .75 * Math.exp(-Math.pow((ph - .04) / .09, 2)));
    tf(s.rice, `translate(${VP[0] - 150 + 20 * Math.sin(u * 3)} ${VP[1] + 50}) rotate(${u * 80}) scale(${1.5 * (1 - .4 * pz)} ${1.5 * (1 + .25 * pz)})`);
    tf(s.egg, `translate(${VP[0] + 150 + 20 * Math.sin(u * 3 + 2)} ${VP[1] + 90}) rotate(${-u * 70}) scale(${1.4 * (1 - .4 * pz)} ${1.4 * (1 + .25 * pz)})`);
    const g = Math.pow(sg6(u, 3.1, 4.05), 2); set(s.glow, "r", 10 + 1500 * g); op(s.glow, ramp(u, 3.0, 3.3));
    showC6(s.card, t, sc.t0 + .3, sc.t0 + 3.4); }; return s; })();

/* ================= 3. THE STOMACH: churned in a pool of digestive juice ================= */
S.povStomach = (() => { const s = scene("povStomach", "#6a040f", "#6a040f");
  s.R = el("g", {}, s.stage); const R = s.R;
  el("rect", {x: -2000, y: -2000, width: 5600, height: 5000, fill: "#e5536e"}, R);
  [[1500, 1000, "#d6405c"], [1230, 800, "#e5536e"], [980, 620, "#c9304d"], [740, 450, "#a61e3b"], [520, 300, "#7d1128"]].forEach(([rx, ry, col], i) => el("path", A6({d: (() => { let d = ""; for (let k = 0; k <= 24; k++) { const an = k / 24 * 6.2832, w = 1 + .05 * Math.sin(k * 2.6 + i * 2); d += (k ? "L" : "M") + (VP[0] + Math.cos(an) * rx * w).toFixed(0) + " " + (VP[1] + Math.sin(an) * ry * w).toFixed(0); } return d + "Z"; })(), fill: col, "stroke-width": 6}), R));
  s.drips = []; seed = 631; for (let i = 0; i < 9; i++) { const g = el("g", {}, R); drop6(g, "#d9ed92", 2); s.drips.push({g, x: 60 + i * 190 + rnd() * 60, u: rnd()}); }
  s.pool = el("path", A6({fill: "#cfe35a", "fill-opacity": .86, "stroke-width": 7}), R); s.pool2 = el("path", {fill: "#e3f08a", opacity: .5}, R);
  s.bub = []; for (let i = 0; i < 18; i++) s.bub.push({e: el("circle", {r: 10 + rnd() * 16, fill: "none", stroke: "#f7ffc9", "stroke-width": 5}, R), x: rnd(), u: rnd(), v: .25 + rnd() * .3});
  s.sw = el("g", {}, R); s.things = []; const cols = ["#fffdf2", "#ffc93c", "#52b788", "#fffdf2", "#ffc93c", "#52b788", "#f4a261", "#fffdf2", "#ffc93c", "#fffdf2"];
  cols.forEach((col, i) => { const e = el("ellipse", A6({rx: 18 + rnd() * 10, ry: 13 + rnd() * 8, fill: col, "stroke-width": 4}), s.sw); s.things.push({e, a: rnd() * 6.28, r: 150 + rnd() * 420, big: 0}); });
  s.rice = el("g", {}, s.sw); rice6(s.rice); s.egg = el("g", {}, s.sw); egg6(s.egg);
  s.spl = fullRect(s.stage, "#d9ed92", 0); s.vg = vignette(s.stage, ME6, .7);
  s.card = card6(s.stage, "Stomach: churned with digestive juices", "#c9184a", 46);
  s.run = t => { const u = U6("povStomach", t), sc = SC.povStomach, rot = 15 * Math.sin(u * 2.0) + 5 * Math.sin(u * 3.7);
    tf(R, `translate(${VP[0]} ${VP[1]}) rotate(${rot}) scale(${1.12 + .05 * Math.sin(u * 4)}) translate(${-VP[0]} ${-VP[1] + 14 * Math.sin(u * 4)})`);
    const top = x => 500 + 60 * Math.sin(x / 260 + u * 3.2) + 34 * Math.sin(x / 110 - u * 4.4) - (x - VP[0]) * .12 * Math.sin(u * 2.0);
    let d = "M-900 2000 "; for (let x = -900; x <= 2600; x += 70) d += `L${x} ${top(x).toFixed(1)} `; set(s.pool, "d", d + "L2600 2000 Z");
    let d2 = "M-900 2000 "; for (let x = -900; x <= 2600; x += 70) d2 += `L${x} ${(top(x + 150) + 90).toFixed(1)} `; set(s.pool2, "d", d2 + "L2600 2000 Z");
    s.drips.forEach(o => { const k = (u * .7 + o.u) % 1; tf(o.g, `translate(${o.x} ${lerp(-140, top(o.x), k * k)}) scale(${1 + .3 * k})`); op(o.g, k < .97 ? 1 : 0); });
    s.bub.forEach(o => { const k = (u * o.v + o.u) % 1, x = -100 + o.x * 1800; set(o.e, "cx", x + 30 * Math.sin(u * 3 + o.u * 9)); set(o.e, "cy", lerp(1050, top(x) + 20, k)); op(o.e, Math.sin(k * Math.PI)); });
    const spin = u * 2.3 + .25 * Math.sin(u * 2), brk = ramp(u, 1.2, 4.4);
    s.things.forEach((o, i) => { const an = o.a + spin * (380 / (o.r + 120)); tf(o.e, `translate(${VP[0] + Math.cos(an) * o.r} ${VP[1] + 90 + Math.sin(an) * o.r * .55}) rotate(${an * 80}) scale(${lerp(1.6, 1, brk)})`); op(o.e, ramp(u, .3 + i * .3, .6 + i * .3)); });
    tf(s.rice, `translate(${VP[0] + Math.cos(spin) * 300} ${VP[1] + 80 + Math.sin(spin) * 170}) rotate(${spin * 70}) scale(${lerp(2.1, 1.25, brk)})`);
    tf(s.egg, `translate(${VP[0] + Math.cos(spin + 3.14) * 300} ${VP[1] + 80 + Math.sin(spin + 3.14) * 170}) rotate(${-spin * 60}) scale(${lerp(2.0, 1.2, brk)})`);
    op(s.spl, 1 - ramp(u, -.1, .5));
    showC6(s.card, t, sc.t0 + .3, sc.t0 + 4.7); }; return s; })();

/* ================= 4. THE SMALL INTESTINE: villi all around; digested food passes into the blood. But you're fibre! ================= */
S.povSmall = (() => { const s = scene("povSmall", "#5c1a1a", "#5c1a1a"); fullRect(s.stage, "#3a0d0d");
  s.tun = tun6(s.stage, 9, (e, i) => { donut6(e, i % 2 ? "#f28482" : "#e56b6f");
    for (let k = 0; k < 14; k++) el("rect", A6({x: -27, y: -318, width: 54, height: 132, rx: 27, fill: k % 2 ? "#ffcad4" : "#ffb5c2", "stroke-width": 5, transform: `rotate(${k * 360 / 14 + i * 11})`}), e); });
  // a villus close up, with its blood vessel
  s.V = el("g", {}, s.stage); el("path", A6({d: "M2700 230 H1200 Q990 230 990 470 Q990 710 1200 710 H2700 Z", fill: "#ffcad4", "stroke-width": 9}), s.V);
  el("path", {d: "M2700 210 H1200 Q968 210 968 470 Q968 730 1200 730 H2700", fill: "none", stroke: "#ff8fa3", "stroke-width": 16, opacity: .6}, s.V);
  const vd = "M2700 610 H1240 Q1100 610 1100 470 Q1100 330 1240 330 H2700"; el("path", {d: vd, fill: "none", stroke: INK, "stroke-width": 62, "stroke-linecap": "round"}, s.V); el("path", {d: vd, fill: "none", stroke: "#e63946", "stroke-width": 50}, s.V);
  s.flow = el("path", {d: vd, fill: "none", stroke: "#ff8fa3", "stroke-width": 12, "stroke-dasharray": "30 50", "stroke-linecap": "round"}, s.V);
  tx(s.V, {x: 1500, y: 492, "text-anchor": "middle", "font-size": 54, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 9}, "blood vessel");
  s.vp = el("path", {d: "M1100 470 Q1100 330 1240 330 H2000", fill: "none"}, s.stage); const VL = s.vp.getTotalLength();
  s.rice = el("g", {}, s.stage); rice6(s.rice); s.egg = el("g", {}, s.stage); egg6(s.egg);
  s.bits = []; seed = 641; for (let i = 0; i < 12; i++) { const fr = i % 2, lead = i < 2, g = el("g", {}, s.stage); el("circle", A6({r: lead ? 36 : 21, fill: fr ? "#ffc93c" : "#fffdf2", "stroke-width": lead ? 5 : 4}), g);
    if (lead) { face6(g, 0, -2, .95); g.arm = el("line", {x1: 30, y1: -12, x2: 58, y2: -40, stroke: INK, "stroke-width": 6, "stroke-linecap": "round"}, g); }
    s.bits.push({g, fr, lead, sx: (fr ? 760 : 560) + (rnd() - .5) * 150, sy: (fr ? 560 : 430) + (rnd() - .5) * 130, td: 3.0 + (lead ? fr * .25 + .9 : rnd() * 1.3), wy: 400 + rnd() * 140}); }
  s.bye = el("g", {}, s.stage); el("path", A6({d: "M-90 -50 Q-90 -84 -56 -84 H56 Q90 -84 90 -50 V-10 Q90 24 56 24 H10 L-24 58 L-18 24 H-56 Q-90 24 -90 -10 Z", fill: "#fff", "stroke-width": 5}), s.bye);
  tx(s.bye, {x: 0, y: -12, "text-anchor": "middle", "font-size": 50, "font-weight": 700, fill: INK}, "Bye!");
  s.vg = vignette(s.stage, ME6, .7);
  s.c1 = card6(s.stage, "Small intestine: digested food passes into the blood", "#e63946", 44);
  s.c2 = card6(s.stage, "But you're fibre. You can't be digested!", "#2d6a4f", 48);
  const speed = u => .07 + .4 * (1 - ramp(u, 1.9, 2.9)) + .4 * ramp(u, 5.5, 6.3);
  s.run = t => { const u = U6("povSmall", t), sc = SC.povSmall; let off = 0; for (let k = 0; k < 60; k++) off += speed(u * (k + .5) / 60) * u / 60;
    runTun6(s.tun, off, 400, z => [620 * z * Math.sin(off * 3 + z * 3.2), 220 * z * Math.cos(off * 2.2 + z * 2.5), 1, off * 20], .7);
    const vin = ease(sg6(u, 2.1, 3.0)), vout = Math.pow(sg6(u, 5.5, 6.4), 2); tf(s.V, `translate(${1000 * (1 - vin) + 80 * vout} 0) scale(${1 + 1.2 * vout})`); op(s.V, 1 - ramp(u, 6.0, 6.4)); set(s.flow, "stroke-dashoffset", u * 160);
    // the friends break into tiny bits: digested
    const br = [2.5, 2.8]; [[s.rice, 560, 430, 1.7, 0], [s.egg, 760, 560, 1.6, 1]].forEach(([g, x, y, k, i]) => { tf(g, `translate(${x + 14 * Math.sin(u * 2.4 + i)} ${y + 12 * Math.sin(u * 3 + i * 2)}) rotate(${10 * Math.sin(u * 2 + i)}) scale(${k * (1 + .25 * on(u, br[i] - .25, br[i] + .05, .1))})`); op(g, u < br[i] ? 1 : 0); });
    let L = null; s.bits.forEach(b => { const tb = br[b.fr], sp = ease(sg6(u, tb, tb + .4)), x0 = lerp(b.fr ? 760 : 560, b.sx, sp) + 8 * Math.sin(u * 3 + b.sx), y0 = lerp(b.fr ? 560 : 430, b.sy, sp) + 8 * Math.cos(u * 2.6 + b.sy);
      const k1 = ease(sg6(u, b.td, b.td + .8)), k2 = sg6(u, b.td + .8, b.td + 2.0); let x = lerp(x0, 1100, k1), y = lerp(y0, lerp(b.wy, 470, k1), k1);
      if (k2 > 0) { const P = s.vp.getPointAtLength(VL * k2 * k2); x = P.x; y = P.y; }
      tf(b.g, `translate(${x + 1000 * (1 - vin) * (k1 > .98 ? 1 : 0)} ${y}) scale(${lerp(1, .8, k1)})`); op(b.g, u >= tb ? 1 - ramp(k2, .8, 1) : 0);
      if (b.lead) { set(b.g.arm, "transform", `rotate(${24 * Math.sin(u * 14)} 30 -12)`); if (!b.fr) L = [x, y]; } });
    tf(s.bye, `translate(${L[0] - 20} ${L[1] - 60}) scale(${Math.max(0, pop(u, 3.2, .35))})`); op(s.bye, on(u, 3.2, 5.0, .2));
    showC6(s.c1, t, sc.t0 + .3, sc.t0 + 3.6); showC6(s.c2, t, sc.t0 + 3.9, sc.t0 + 6.85); }; return s; })();

/* ================= 5. THE LARGE INTESTINE: water is taken back; we get drier and squashed together with other leftovers ================= */
S.povLarge = (() => { const s = scene("povLarge", "#2a1a3a", "#2a1a3a"); fullRect(s.stage, "#1f1230");
  s.tun = tun6(s.stage, 8, (e, i) => { donut6(e, i % 2 ? "#b79ced" : "#8f6fd0"); for (let k = 0; k < 6; k++) el("ellipse", A6({cx: 0, cy: -420, rx: 190, ry: 150, fill: i % 2 ? "#c4adf0" : "#9d80da", "stroke-width": 5, transform: `rotate(${k * 60 + i * 30})`}), e); });
  s.drops = []; seed = 651; for (let i = 0; i < 20; i++) { const g = el("g", {}, s.stage); drop6(g, "#4cc9f0", 1); s.drops.push({g, a: i / 20 * 6.2832 + rnd() * .2, u: rnd(), v: .45 + rnd() * .2}); }
  s.lumps = [[250, 720, -1, 0], [1380, 720, 1, .35], [540, 900, -1, .8], [1090, 900, 1, 1.15], [810, 960, 0, 1.5]].map(([x, y, sd, d]) => { const g = el("g", {}, s.stage); lump6(g); return {g, x, y, sd, d}; });
  s.dry = vignette(s.stage, "#8f6240", .9); s.vg = vignette(s.stage, ME6, .7);
  s.card = card6(s.stage, "Large intestine: water is taken back", "#7b2cbf", 46);
  s.run = t => { const u = U6("povLarge", t), sc = SC.povLarge, off = .34 * u - .032 * u * u;
    runTun6(s.tun, off, 430, z => [200 * z * Math.sin(off * 2 + z * 2), 60 * z * Math.cos(off * 2), 1, 0], .6);
    s.drops.forEach(o => { const k = (u * o.v + o.u) % 1, r = lerp(110, 620, ease(k)); tf(o.g, `translate(${VP[0] + Math.cos(o.a) * r * 1.35} ${VP[1] + Math.sin(o.a) * r * .8}) rotate(${o.a * 57.3 + 90}) scale(${lerp(2.4, .7, k)})`); op(o.g, Math.sin(k * Math.PI) * 1.4 * (1 - ramp(u, 4.2, 4.9))); });
    s.lumps.forEach(o => { const k = ease(sg6(u, 1.9 + o.d, 3.0 + o.d)), sq = 1 - .14 * ramp(u, 3.6, 4.6); tf(o.g, `translate(${lerp(o.x + o.sd * 1100, o.x + (VP[0] - o.x) * .12 * ramp(u, 3.6, 4.6), k)} ${lerp(o.y + (o.sd ? 0 : 500), o.y, k)}) scale(${2.5 * (2 - sq)} ${2.5 * sq})`); });
    op(s.dry, .9 * ramp(u, 1.5, 4.8));
    showC6(s.card, t, sc.t0 + .3, sc.t0 + 4.7, 80); }; return s; })();

/* ================= 6. THE WAY OUT: a dark tunnel, light ahead... and out! ================= */
S.povExit = (() => { const s = scene("povExit", "#120a18", "#120a18"); fullRect(s.stage, "#1c1126");
  s.tun = tun6(s.stage, 10, (e, i) => { donut6(e, i % 2 ? "#6f5a94" : "#5b487d"); el("circle", {r: 325, fill: "none", stroke: "#9f86d9", "stroke-width": 18, opacity: .4}, e); });
  s.dk = fullRect(s.stage, "#120a18", .5);
  s.glow = el("circle", {cx: VP[0], cy: VP[1], r: 100, fill: "#fff3b0", filter: "url(#blur)"}, s.stage); s.light = el("circle", {cx: VP[0], cy: VP[1], r: 30, fill: "#fffdf5"}, s.stage);
  s.rays = el("g", {}, s.stage); for (let i = 0; i < 12; i++) el("path", {d: `M0 0 L${Math.cos(i * .5236 - .05) * 1400} ${Math.sin(i * .5236 - .05) * 1400} L${Math.cos(i * .5236 + .05) * 1400} ${Math.sin(i * .5236 + .05) * 1400} Z`, fill: "#fff3b0", opacity: .22}, s.rays);
  s.l1 = el("g", {}, s.stage); lump6(s.l1); s.l2 = el("g", {}, s.stage); lump6(s.l2);
  s.vg = vignette(s.stage, "#8f6240", .85); s.vg2 = vignette(s.stage, ME6, .5);
  s.white = fullRect(s.stage, "#fffdf5", 0);
  s.card = card6(s.stage, "…and out!", INK, 56);
  s.run = t => { const u = U6("povExit", t), sc = SC.povExit, off = .16 * u + .1 * u * u;
    runTun6(s.tun, off, 400);
    const r = 34 + 22 * u + 60 * Math.exp(Math.max(0, u - 2.3) * 3.6) - 60; set(s.light, "r", r); set(s.glow, "r", r * 2.4 + 60); tf(s.rays, `translate(${VP[0]} ${VP[1]}) scale(${.25 + .2 * u + 2 * Math.pow(sg6(u, 2.2, 3.4), 2)})`);
    tf(s.l1, `translate(${150 - 60 * u} ${800 + 20 * u}) rotate(-12) scale(3.4)`); tf(s.l2, `translate(${1480 + 60 * u} ${820 + 20 * u}) rotate(10) scale(3.4)`);
    op(s.white, ramp(u, 2.9, 3.35)); showC6(s.card, t, sc.t0 + 2.2, sc.t0 + 3.9); }; return s; })();

/* ================= 7. OUTSIDE: plop into the toilet bowl, then the flush. Cute, never gross. ================= */
S.toilet = (() => { const s = scene("toilet", "#e0fbfc", "#e0fbfc"), st = s.stage, CX = VP[0], WY = 668;
  fullRect(st, "#dff3f5"); for (let k = 0; k < 15; k++) el("line", {x1: -150 + k * 140, y1: -60, x2: -150 + k * 140, y2: 1020, stroke: "#b8dfe6", "stroke-width": 6}, st);
  for (let k = 0; k < 9; k++) el("line", {x1: -150, y1: -60 + k * 140, x2: 1770, y2: -60 + k * 140, stroke: "#b8dfe6", "stroke-width": 6}, st);
  // a floor mat, a toilet roll and a little bin: an HDB bathroom seen from above
  el("rect", A6({x: 1270, y: 560, width: 330, height: 380, rx: 30, fill: "#a2d2ff"}), st); [640, 720, 800, 880].forEach(y => el("line", {x1: 1300, y1: y, x2: 1570, y2: y, stroke: "#74b3e8", "stroke-width": 8, "stroke-linecap": "round"}, st));
  el("rect", A6({x: 1300, y: 120, width: 170, height: 120, rx: 20, fill: "#fff"}), st); el("ellipse", A6({cx: 1300, cy: 180, rx: 34, ry: 60, fill: "#f1f3f5"}), st); el("ellipse", {cx: 1300, cy: 180, rx: 12, ry: 22, fill: "#bc8a5f", stroke: INK, "stroke-width": 4}, st);
  el("circle", A6({cx: 200, cy: 260, r: 110, fill: "#ced4da"}), st); el("circle", A6({cx: 200, cy: 260, r: 78, fill: "#495057", "stroke-width": 5}), st);
  el("ellipse", {cx: CX + 14, cy: 590, rx: 350, ry: 440, fill: INK, opacity: .14}, st);
  el("rect", A6({x: CX - 290, y: -50, width: 580, height: 250, rx: 40, fill: "#fff", "stroke-width": 8}), st); el("rect", {x: CX - 262, y: -24, width: 524, height: 196, rx: 28, fill: "none", stroke: "#dee2e6", "stroke-width": 6}, st);
  s.btn = el("g", {}, st); el("circle", A6({r: 50, fill: "#e9ecef"}), s.btn); el("line", {x1: 0, y1: -50, x2: 0, y2: 50, stroke: INK, "stroke-width": 5}, s.btn);
  el("ellipse", A6({cx: CX, cy: 580, rx: 320, ry: 420, fill: "#fff", "stroke-width": 8}), st);
  el("ellipse", A6({cx: CX, cy: 600, rx: 222, ry: 316, fill: grad6("radialGradient", {cx: .5, cy: .6, r: .6}, [[0, "#dee2e6"], [1, "#f8f9fa"]])}), st);
  s.water = el("ellipse", A6({cx: CX, cy: WY, rx: 160, ry: 200, fill: "#74c0fc", "stroke-width": 5}), st); s.hole = el("ellipse", {cx: CX, cy: WY + 30, rx: 50, ry: 58, fill: "#339af0"}, st);
  s.sw = el("g", {}, st); for (let i = 0; i < 5; i++) el("path", {d: "M0 -150 A150 150 0 0 1 130 75 A110 110 0 0 0 0 -105", fill: "#fff", opacity: .75, transform: `rotate(${i * 72})`}, s.sw);
  s.rip = [0, 1].map(() => el("ellipse", {cx: CX, cy: WY, rx: 10, ry: 12, fill: "none", stroke: "#fff", "stroke-width": 8}, st));
  s.blob = el("g", {}, st); s.bl = lump6(s.blob);
  s.dr = []; seed = 671; for (let i = 0; i < 12; i++) { const g = el("g", {}, st); drop6(g, "#a5d8ff", 1.2); s.dr.push({g, a: i / 12 * 6.2832 + rnd() * .3, v: .7 + rnd() * .6}); }
  s.plop = tx(st, {x: 0, y: 0, "text-anchor": "middle", "font-size": 150, "font-weight": 700, fill: "#ffe14d", class: "out", "stroke-width": 20}, "PLOP!");
  s.c1 = card6(st, "Out with the leftovers. That's you in there!", "#6c584c", 44); s.c2 = card6(st, "And… FLUSH!", "#1d6fd8", 54);
  s.run = t => { const u = U6("toilet", t), sc = SC.toilet, PL = .6, FL = 2.45;
    const f = Math.pow(sg6(u, 0, PL), 2), k = ease(sg6(u, FL + .15, 4.15)), an = k * 16, r = 105 * Math.min(1, k * 5) * (1 - k);
    const bob = u > PL ? 8 * Math.sin((u - PL) * 5) * Math.exp(-(u - PL) * .8) - 26 * Math.exp(-(u - PL) * 6) * Math.cos((u - PL) * 16) : 0;
    tf(s.blob, `translate(${CX + r * Math.cos(an)} ${lerp(260, WY - 10, f) + bob + r * 1.2 * Math.sin(an) + 26 * k}) rotate(${an * 57.3 * .9}) scale(${lerp(5.5, 1.5, f) * Math.pow(1 - k, .8)})`); op(s.blob, ramp(u, -.05, .12) * (1 - ramp(u, 4.0, 4.15)));
    s.rip.forEach((e, i) => { const q = sg6(u, PL + i * .18, PL + .9 + i * .18); set(e, "rx", 60 + 110 * q); set(e, "ry", 70 + 140 * q); op(e, u > PL + i * .18 ? 1 - q : 0); });
    s.dr.forEach(o => { const q = sg6(u, PL, PL + .7); tf(o.g, `translate(${CX + Math.cos(o.a) * 330 * q * o.v} ${WY + Math.sin(o.a) * 330 * q * o.v - 160 * Math.sin(q * Math.PI)}) scale(${1.6 - q})`); op(o.g, u > PL ? 1 - q * q : 0); });
    tf(s.plop, `translate(1280 430) rotate(10) scale(${Math.max(0, pop(u, PL, .35))})`); op(s.plop, on(u, PL, 2.1, .15));
    const pr = on(u, FL - .15, FL + .5, .1); tf(s.btn, `translate(${CX} 76) scale(${1 - .14 * pr})`); set(s.btn.firstChild, "fill", pr > .5 ? "#74c0fc" : "#e9ecef");
    const fl = on(u, FL, 4.45, .3); tf(s.sw, `translate(${CX} ${WY}) scale(1.02 1.28) rotate(${-(u - FL) * 520})`); op(s.sw, fl);
    set(s.hole, "rx", 50 + 60 * fl); set(s.hole, "ry", 58 + 76 * fl); set(s.water, "fill", mix("#74c0fc", "#a5d8ff", fl));
    showC6(s.c1, t, sc.t0 + PL + .25, sc.t0 + FL - .1, 80); showC6(s.c2, t, sc.t0 + FL + .1, sc.t0 + 4.6, 80); }; return s; })();
