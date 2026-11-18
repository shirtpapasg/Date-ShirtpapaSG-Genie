/* TheOneApp, Explored EP03 Part 2: the hero sequence. Load after common.js, geo_map.js and ep03b/scenes.js.
   YOU are a takeaway box, covered in curry. Picture and sound only, with one-line cards.
   kitchen (outside) -> povChute -> povTruck2 -> povClaw -> povFurnace (first person, then a cut-open plant) -> povAsh -> barge (real map) -> semakau (outside).
   In the first-person shots the bottom edge of the screen is your own rim (white with curry; grey once you are ash) and the screen edge glows curry yellow.
   Every frame depends only on t. */
const r3Sh = (u, k, a = 1) => [k * Math.sin(u * 83 * a), k * Math.cos(u * 67 * a)];
// your own rim along the bottom of the screen
function r3Me(p) { const g = el("g", {}, p);
  g.a = el("path", R3A({d: "M-220 1060 V996 Q-220 978 -190 974 L420 952 Q810 938 1200 952 L1810 974 Q1840 978 1840 996 V1060 Z", fill: "#fffdf5", "stroke-width": 8}), g);
  g.b = el("path", {d: "M-190 990 L420 968 Q810 954 1200 968 L1810 990", fill: "none", stroke: "#d8d2c0", "stroke-width": 6}, g);
  g.c = [el("path", {d: "M150 964 C150 1004 190 1010 196 984 C204 1030 250 1030 252 986 C262 1004 290 1000 292 958 Z", fill: CURRY, stroke: CURRY2, "stroke-width": 4, "stroke-linejoin": "round"}, g),
    el("path", {d: "M980 944 C984 990 1030 996 1036 962 C1046 1010 1100 1004 1100 950 Z", fill: CURRY, stroke: CURRY2, "stroke-width": 4, "stroke-linejoin": "round"}, g),
    el("path", {d: "M1420 958 C1426 990 1460 992 1464 968 C1472 1000 1510 996 1512 964 Z", fill: CURRY, stroke: CURRY2, "stroke-width": 4, "stroke-linejoin": "round"}, g),
    el("ellipse", {cx: 560, cy: 990, rx: 44, ry: 12, fill: CURRY, stroke: CURRY2, "stroke-width": 4}, g)];
  g.tab = el("rect", R3A({x: 750, y: 926, width: 120, height: 40, rx: 12, fill: "#fff", "stroke-width": 7}), g);
  g.burn = k => { set(g.a, "fill", mix("#fffdf5", "#1c1410", k)); set(g.tab, "fill", mix("#ffffff", "#2a1c12", k)); set(g.b, "stroke", mix("#d8d2c0", "#ff7b00", k)); g.c.forEach(e => set(e, "fill", mix(CURRY, "#3b1d08", k))); };
  return g; }
function r3Flame(p, k = 1) { const g = el("g", {transform: `scale(${k})`}, p);
  el("path", {d: "M0 60 C-90 30 -80 -70 -14 -150 C-20 -90 30 -80 22 -130 C84 -70 86 26 0 60 Z", fill: "#e85d04", stroke: "#9d0208", "stroke-width": 6, "stroke-linejoin": "round"}, g);
  el("path", {d: "M0 56 C-56 34 -50 -30 -8 -84 C-8 -44 26 -40 20 -70 C58 -30 56 30 0 56 Z", fill: "#ffba08"}, g);
  el("path", {d: "M2 52 C-26 40 -24 4 -2 -24 C0 -6 16 -4 14 -18 C32 4 30 40 2 52 Z", fill: "#fff3b0"}, g); return g; }

// ---- 1 KITCHEN (outside): you, the curry-covered box, go into the rubbish bag; the bag is tied and goes into the chute
S.kitchen = (() => { const s = scene("kitchen", "#fdebc8", "#fdebc8"), st = s.stage; s.cam = el("g", {}, st);
  s.kit = r3Kitchen(s.cam, 1250, 400); const HX = 1250, HY = 400;
  s.bagB = el("g", {}, s.cam); el("path", R3A({d: "M-150 -130 Q-180 30 -130 130 Q0 170 130 130 Q180 30 150 -130 Z", fill: "#ced4da"}), s.bagB); el("ellipse", R3A({cx: 0, cy: -130, rx: 150, ry: 26, fill: "#6c757d"}), s.bagB);
  s.junk = [["🍌", -70, 60, -20], ["🧻", 74, 70, 14]].map(([e, x, y, r]) => { const j = emo(s.cam, 0, 0, 96, e); j.x = x; j.y = y; j.r = r; return j; });
  s.boxG = el("g", {}, s.cam); s.box = r3Box(s.boxG, {face: 1});
  s.bagF = el("g", {}, s.cam); el("path", R3A({d: "M-150 -130 Q-180 30 -130 130 Q0 170 130 130 Q180 30 150 -130 Q0 -96 -150 -130 Z", fill: "#f1f3f5", "fill-opacity": .5}), s.bagF);
  el("path", {d: "M-110 -70 Q-124 20 -96 90", fill: "none", stroke: "#fff", "stroke-width": 10, "stroke-linecap": "round", opacity: .7}, s.bagF);
  s.bagT = el("g", {}, s.cam); el("path", R3A({d: "M-20 -150 Q-170 -110 -150 30 Q-140 130 0 150 Q140 130 150 30 Q170 -110 20 -150 Z", fill: "#f1f3f5", "fill-opacity": .55}), s.bagT);
  el("path", R3A({d: "M-20 -150 L-46 -200 Q-14 -182 0 -196 Q16 -182 48 -202 L20 -150 Z", fill: "#e9ecef"}), s.bagT);
  el("path", {d: "M-110 -60 Q-124 20 -96 90", fill: "none", stroke: "#fff", "stroke-width": 10, "stroke-linecap": "round", opacity: .7}, s.bagT);
  s.you = el("g", {}, st); tx(s.you, {x: 0, y: 0, "text-anchor": "middle", "font-size": 110, "font-weight": 700, fill: "#ffe14d", class: "out", "stroke-width": 18}, "YOU");
  el("path", {d: "M110 -30 Q200 -40 230 30", fill: "none", stroke: INK, "stroke-width": 20, "stroke-linecap": "round"}, s.you); el("path", {d: "M110 -30 Q200 -40 230 30", fill: "none", stroke: "#ffe14d", "stroke-width": 10, "stroke-linecap": "round"}, s.you);
  el("path", {d: "M200 16 L236 60 L262 8 Z", fill: "#ffe14d", stroke: INK, "stroke-width": 6, "stroke-linejoin": "round"}, s.you);
  s.dark = fullRect(st, "#000", 0); s.card = povCard(st, "You are a takeaway box, covered in curry", "#f77f00");
  s.run = t => { const f = FR3("kitchen")(t), tt = t - SC.kitchen.t0, BX = 800, BY = 600;
    const drop = ramp(f, .34, .46), tie = ramp(f, .56, .62), lift = ramp(f, .68, .86), inn = ramp(f, .86, .95), flap = ramp(f, .64, .72) * (1 - ramp(f, .955, .975));
    const gx = lerp(lerp(BX, HX - 10, lift), HX, inn), gy = lerp(lerp(BY, HY - 60, lift) - 90 * Math.sin(lift * Math.PI) * (1 - inn), HY, inn), gs = lerp(1, .35, inn), gr = lerp(0, 16, lift);
    const G = `translate(${gx} ${gy}) rotate(${gr}) scale(${gs * (1 + .08 * on(f, .56, .66, .04))})`;
    [s.bagB, s.bagF, s.bagT].forEach(g => tf(g, G)); op(s.bagB, tie < .5 ? 1 : 0); op(s.bagF, tie < .5 ? 1 : 0); op(s.bagT, (tie >= .5 ? 1 : 0) * (1 - ramp(f, .93, .96)));
    // the box: big and centre at first, then it drops into the bag
    const bx = lerp(BX, 0, drop), by = lerp(330 + 8 * Math.sin(tt * 3), 46, drop * drop), bs = lerp(1.5, .92, drop), br = lerp(-4, 12, drop);
    tf(s.boxG, drop < 1 ? `translate(${lerp(BX, gx, drop)} ${lerp(by, gy + 46, drop)}) rotate(${br}) scale(${bs})` : `${G} translate(0 46) rotate(12) scale(.92)`); op(s.boxG, 1 - ramp(f, .93, .96)); op(s.box.sh, 0);
    const blink = (tt % 1.7) < .12 ? .1 : 1; tf(s.box.eyes, `translate(0 ${22 * (1 - blink)}) scale(1 ${blink})`); const scared = f > .3; op(s.box.m0, scared ? 0 : 1); op(s.box.m1, scared ? 1 : 0);
    s.junk.forEach((j, i) => { const k = ramp(f, .44 + i * .05, .54 + i * .05); tf(j, k < 1 ? `translate(${BX + j.x} ${lerp(-120, BY + j.y, k * k)}) rotate(${j.r + 200 * (1 - k)})` : `${G} translate(${j.x} ${j.y}) rotate(${j.r})`); op(j, (f > .44 + i * .05 ? 1 : 0) * (1 - ramp(f, .93, .96))); });
    s.kit.hop.flap(flap);
    tf(s.you, `translate(480 300) scale(${Math.max(0, pop(f, .05, .08))}) rotate(${-6 + 2 * Math.sin(tt * 4)})`); op(s.you, on(f, .05, .34, .04));
    const z = lerp(1.45, 1.15, ramp(f, .3, .5)) + .55 * ramp(f, .84, 1), cx = lerp(BX, lerp(960, HX, ramp(f, .84, 1)), ramp(f, .3, .7)), cy = lerp(400, lerp(470, HY, ramp(f, .84, 1)), ramp(f, .3, .7));
    tf(s.cam, `translate(${VP[0]} ${VP[1]}) scale(${z}) translate(${-cx} ${-cy})`); op(s.dark, ramp(f, .955, .995));
    showCard(s.card, t, SC.kitchen.t0 + .5, SC.kitchen.t1 - .2); }; return s; })();

// ---- 2 DOWN THE CHUTE (first person): we tumble down the dark shaft past the hopper of every floor, 12 down to 1
S.povChute = (() => { const s = scene("povChute", "#07070d", "#07070d"), st = s.stage, N = 13;
  s.tun = el("g", {}, st);
  [[[-1, -1], [1, -1], "#2b2d3a"], [[1, -1], [1, 1], "#3a3d4d"], [[1, 1], [-1, 1], "#22242f"], [[-1, 1], [-1, -1], "#34374a"]].forEach(([a, b, c]) => el("path", {d: `M0 0 L${a[0] * 2600} ${a[1] * 2600} L${b[0] * 2600} ${b[1] * 2600} Z`, fill: c}, s.tun));
  [[-1, -1], [1, -1], [1, 1], [-1, 1]].forEach(a => el("line", {x1: 0, y1: 0, x2: a[0] * 2600, y2: a[1] * 2600, stroke: "#0b0b12", "stroke-width": 8}, s.tun));
  s.fog = el("circle", {r: 1500, fill: r3GR([[0, "#000", 1], [.1, "#000", .96], [.45, "#000", .45], [1, "#000", 0]])}, s.tun);
  s.rings = []; for (let j = N; j >= 1; j--) { const g = el("g", {}, s.tun); g.j = j; g.rib = el("rect", {x: -300, y: -300, width: 600, height: 600, fill: "none", stroke: "#0b0b12", "stroke-width": 16}, g);
    el("rect", {x: -292, y: -292, width: 584, height: 584, fill: "none", stroke: "#6c7086", "stroke-width": 5, opacity: .6}, g);
    g.door = el("path", {fill: "#ffd166", stroke: INK, "stroke-width": 5, "stroke-linejoin": "round"}, s.tun); g.glow = el("path", {fill: "#ffd166", opacity: .25}, s.tun);
    g.num = tx(s.tun, {x: 0, y: 0, "text-anchor": "middle", "font-size": 90, "font-weight": 700, fill: INK}, String(13 - j)); s.rings.push(g); }
  s.bot = el("g", {}, s.tun); el("rect", {x: -300, y: -300, width: 600, height: 600, fill: "#2a9d8f", stroke: INK, "stroke-width": 14}, s.bot);
  seed = 12; for (let i = 0; i < 9; i++) { const b = r3Bag(s.bot, ["#343a40", "#495057", "#adb5bd"][i % 3]); tf(b, `translate(${-200 + (i % 3) * 200 + rnd() * 40} ${-200 + Math.floor(i / 3) * 200 + rnd() * 40}) rotate(${rnd() * 360}) scale(1.5)`); }
  s.streaks = []; seed = 3; for (let i = 0; i < 46; i++) s.streaks.push({e: el("line", {stroke: "#fff", "stroke-width": 5, "stroke-linecap": "round", opacity: .22}, st), a: rnd() * 6.283, u: rnd(), v: .6 + rnd() * .8});
  s.pals = [[r3Bag(st, "#495057"), 1.5, .9], [emo(st, 0, 0, 170, "🍌"), 3.7, 1.25], [emo(st, 0, 0, 150, "🧻"), 5.4, .7]];
  s.me = r3Me(st); s.vig = vignette(st, CURRY, .5); s.flash = fullRect(st, "#fff", 0); s.dark = fullRect(st, "#000", 0);
  s.run = t => { const f = FR3("povChute")(t), tt = t - SC.povChute.t0, c = .15 + 13.1 * Math.pow(f, 1.5), hit = ramp(f, .955, .97);
    const rot = 150 * f + 14 * Math.sin(tt * 2.3), sh = r3Sh(tt, 6 + 30 * hit * (1 - ramp(f, .97, 1)));
    tf(s.tun, `translate(${VP[0] + 40 * Math.sin(tt * 1.7) + sh[0]} ${VP[1] + 30 * Math.cos(tt * 2.1) + sh[1]}) rotate(${rot})`);
    s.rings.forEach(g => { const rel = g.j - c, vis = rel > .16 && rel < 9; op(g, vis ? clamp(1.25 - rel / 7) : 0); [g.door, g.glow, g.num].forEach(e => op(e, 0)); if (!vis) return;
      tf(g, `scale(${1 / rel})`); const r1 = rel + .22, r2 = rel + .62; if (r1 < .12) return; const s1 = 1 / r1, s2 = 1 / r2, sm = 2 / (r1 + r2);
      set(g.door, "d", `M${296 * s1} ${-78 * s1} L${296 * s1} ${78 * s1} L${296 * s2} ${78 * s2} L${296 * s2} ${-78 * s2} Z`); op(g.door, clamp(1.3 - rel / 6));
      set(g.glow, "d", `M${296 * s1} ${-78 * s1} L${296 * s1} ${78 * s1} L${120 * s1} ${200 * s1} L${120 * s1} ${-200 * s1} Z`); op(g.glow, .16 * clamp(1.3 - rel / 5));
      tf(g.num, `translate(${296 * sm - 4 * sm} ${0}) scale(${sm * .55} ${sm * 1.15})`); set(g.num, "y", 32); op(g.num, clamp(1.3 - rel / 4)); });
    const rb = N + .45 - c; tf(s.bot, `scale(${1 / Math.max(.2, rb)})`); op(s.bot, clamp(1.6 - rb / 5));
    const sp = .5 + 2.6 * f; s.streaks.forEach(o => { const u = (o.u + tt * o.v * sp * .5) % 1, r = 160 + 950 * u * u, L = 40 + 260 * u * sp * .5, ca = Math.cos(o.a + rot * Math.PI / 180), sa = Math.sin(o.a + rot * Math.PI / 180);
      set(o.e, "x1", VP[0] + ca * r); set(o.e, "y1", VP[1] + sa * r); set(o.e, "x2", VP[0] + ca * (r + L)); set(o.e, "y2", VP[1] + sa * (r + L)); op(o.e, .3 * u * (1 - hit)); });
    s.pals.forEach(([e, a0, k], i) => { const a = a0 + .5 * Math.sin(tt * 1.3 + i * 2), r = 560 + 60 * Math.sin(tt * 2 + i) - 300 * hit;
      tf(e, `translate(${VP[0] + Math.cos(a) * r * 1.25} ${VP[1] + Math.sin(a) * r * .72}) rotate(${tt * (140 + i * 60)}) scale(${k * (1.5 + .2 * Math.sin(tt * 3 + i))})`); });
    tf(s.me, `translate(${sh[0]} ${8 * Math.sin(tt * 5) + sh[1]}) rotate(${4 * Math.sin(tt * 2.6)} 810 1000)`);
    op(s.flash, .8 * on(f, .955, .99, .012)); op(s.dark, ramp(f, .975, 1)); }; return s; })();

// ---- 3 IN THE REFUSE TRUCK (first person): more bags tumble in on top of us, then the steel plate squeezes everything tight
S.povTruck2 = (() => { const s = scene("povTruck2", "#15171f", "#15171f"), st = s.stage;
  s.far = el("g", {}, st); const W = 420, Hh = 250;
  el("rect", {x: -W, y: -Hh, width: 2 * W, height: 2 * Hh, fill: r3GL([[0, "#8ecae6"], [1, "#d8f3ff"]])}, s.far);
  [[-380, 150, 170, "#f4a261"], [-170, 90, 150, "#e9c46a"], [230, 170, 190, "#e76f51"]].forEach(([x, top, w, c]) => { el("rect", {x, y: -Hh + top, width: w, height: 2 * Hh - top, fill: c, stroke: INK, "stroke-width": 5}, s.far);
    for (let r = 0; r < 7; r++) for (let q = 0; q < 4; q++) if (-Hh + top + 20 + r * 44 < Hh - 60) el("rect", {x: x + 14 + q * (w - 20) / 4, y: -Hh + top + 20 + r * 44, width: 20, height: 24, fill: "#fdf0d5", stroke: INK, "stroke-width": 2}, s.far); });
  emo(s.far, 80, 150, 190, "🌳"); el("rect", {x: -W, y: Hh - 50, width: 2 * W, height: 50, fill: "#6c757d"}, s.far);
  // the steel walls of the hopper, from the opening out past the screen
  [[[-1, -1], [1, -1], "#3d4252"], [[1, -1], [1, 1], "#4a5064"], [[1, 1], [-1, 1], "#2b2f3c"], [[-1, 1], [-1, -1], "#434859"]].forEach(([a, b, c]) =>
    el("path", R3A({d: `M${a[0] * W} ${a[1] * Hh} L${b[0] * W} ${b[1] * Hh} L${b[0] * W * 9} ${b[1] * Hh * 9} L${a[0] * W * 9} ${a[1] * Hh * 9} Z`, fill: c, "stroke-width": 7}), s.far));
  [1.5, 2.2, 3.3, 5].forEach(k => el("rect", {x: -W * k, y: -Hh * k, width: 2 * W * k, height: 2 * Hh * k, fill: "none", stroke: "#1b1d27", "stroke-width": 5 * k, opacity: .7}, s.far));
  // the packer plate: swings down over the opening, then pushes at us
  s.plate = el("g", {}, s.far); s.pl = el("rect", R3A({x: -W - 30, y: -Hh - 30, width: 2 * W + 60, height: 10, fill: "#8d99ae", "stroke-width": 7}), s.plate);
  s.hz = el("g", {}, s.plate); const cid = "r3hz"; el("rect", {x: -W - 30, y: 0, width: 2 * W + 60, height: 70}, el("clipPath", {id: cid}, r3Defs()));
  const hz = el("g", {"clip-path": `url(#${cid})`}, s.hz); el("rect", {x: -W - 30, y: 0, width: 2 * W + 60, height: 70, fill: "#ffd60a"}, hz); for (let i = -12; i < 14; i++) el("path", {d: `M${i * 80} 0 h40 l-50 70 h-40 Z`, fill: INK}, hz);
  el("rect", R3A({x: -W - 30, y: 0, width: 2 * W + 60, height: 70, fill: "none", "stroke-width": 7}), s.hz);
  s.riv = el("g", {}, s.plate); for (let i = 0; i < 9; i++) el("circle", {cx: -W + 30 + i * (2 * W - 60) / 8, cy: -Hh + 4, r: 9, fill: "#495057", stroke: INK, "stroke-width": 3}, s.riv);
  s.bags = [[-560, 250, 2.6, "#343a40", -20], [620, 290, 2.9, "#495057", 24], [40, 420, 3.3, "#adb5bd", 6], [-180, 120, 1.9, "#212529", 40], [330, 90, 1.7, "#6c757d", -30]].map(([x, y, k, c, r], i) => { const g = el("g", {}, st), b = r3Bag(g, c); g.x = x; g.y = y; g.k = k; g.r = r; g.i = i; return g; });
  s.me = r3Me(st); s.barT = fullRect(st, "#000"); s.barB = fullRect(st, "#000"); s.vig = vignette(st, CURRY, .5); s.dark = fullRect(st, "#000", 0);
  s.run = t => { const f = FR3("povTruck2")(t), tt = t - SC.povTruck2.t0, dn = ramp(f, .3, .52), push = ease(clamp((f - .5) / .45)), sq = push * push;
    const sh = r3Sh(tt, 3 + 16 * push * (1 - ramp(f, .95, 1)));
    tf(s.far, `translate(${VP[0] + sh[0]} ${VP[1] - 40 + sh[1]}) scale(${1 + 2.3 * push})`);
    const ph = 10 + (2 * 250 + 40) * dn; set(s.pl, "height", ph); tf(s.hz, `translate(0 ${-250 - 30 + ph - 70})`); op(s.hz, dn > .12 ? 1 : 0);
    s.bags.forEach(g => { const k = clamp((f - .02 - g.i * .055) / .2), kk = k * k; tf(g, `translate(${VP[0] + lerp(g.x * .1, g.x * (1 - .25 * sq), kk) + sh[0]} ${VP[1] + lerp(-150, g.y - 120 * sq * (g.y < 200 ? 1 : .3), kk) + 30 * Math.sin(k * Math.PI) + sh[1]}) rotate(${g.r + 200 * (1 - k)}) scale(${lerp(.25, g.k, kk) * (1 + .25 * sq)} ${lerp(.25, g.k, kk) * (1 - .45 * sq)})`); op(g, k > 0 ? 1 : 0); });
    tf(s.me, `translate(${sh[0]} ${sh[1] - 60 * sq}) translate(810 1020) scale(${1 + .08 * sq} ${1 + 1.2 * sq}) translate(-810 -1020)`);
    tf(s.barT, `translate(0 ${-1120 + 470 * sq * sq + 200 * ramp(f, .93, 1)})`); tf(s.barB, `translate(0 ${1120 - 60 - 250 * sq * sq - 400 * ramp(f, .93, 1)})`); op(s.dark, ramp(f, .95, 1)); }; return s; })();

// ---- 4 THE CLAW (first person): we lie in the rubbish pit of the plant, looking up. The giant grab comes down, closes round us and lifts
S.povClaw = (() => { const s = scene("povClaw", "#1f2430", "#1f2430"), st = s.stage;
  s.hall = el("g", {}, st); const CW = 300, CH = 170, O = 9;
  [[[-1, -1], [1, -1], "#59606f"], [[1, -1], [1, 1], "#6b7384"], [[1, 1], [-1, 1], "#4a505d"], [[-1, 1], [-1, -1], "#626a7a"]].forEach(([a, b, c]) =>
    el("path", {d: `M${a[0] * CW} ${a[1] * CH} L${b[0] * CW} ${b[1] * CH} L${b[0] * CW * O} ${b[1] * CH * O} L${a[0] * CW * O} ${a[1] * CH * O} Z`, fill: c, stroke: INK, "stroke-width": 5, "stroke-linejoin": "round"}, s.hall));
  [1.35, 1.9, 2.8, 4.3, 6.6].forEach(k => el("rect", {x: -CW * k, y: -CH * k, width: 2 * CW * k, height: 2 * CH * k, fill: "none", stroke: "#3b404c", "stroke-width": 3 * k, opacity: .8}, s.hall));
  el("rect", {x: -CW, y: -CH, width: 2 * CW, height: 2 * CH, fill: "#2b3040", stroke: INK, "stroke-width": 5}, s.hall);
  for (let i = 0; i < 4; i++) el("rect", {x: -CW + 50 + i * 150, y: -CH + 26, width: 60, height: 2 * CH - 52, rx: 8, fill: "#fff8d6", opacity: .92}, s.hall);
  s.lite = el("circle", {r: 900, fill: r3GR([[0, "#fff8d6", .5], [1, "#fff8d6", 0]])}, s.hall);
  // the control room window in the wall (the crane driver sits here)
  el("path", R3A({d: `M${-CW * 1.5} ${-70} L${-CW * 2.5} ${-130} L${-CW * 2.5} ${110} L${-CW * 1.5} ${50} Z`, fill: "#4cc9f0", "stroke-width": 6}), s.hall); el("circle", {cx: -CW * 2.05, cy: 6, r: 28, fill: INK}, s.hall); el("rect", {x: -CW * 2.05 - 40, y: 30, width: 80, height: 50, rx: 16, fill: INK}, s.hall);
  // the crane bridge under the roof
  el("rect", R3A({x: -CW * 1.25, y: -34, width: 2.5 * CW, height: 68, fill: "#f4a300"}), s.hall); for (let i = 0; i < 9; i++) el("path", {d: `M${-CW * 1.25 + 20 + i * 84} -34 l34 68`, stroke: INK, "stroke-width": 5}, s.hall);
  s.troll = el("rect", R3A({x: -60, y: -52, width: 120, height: 104, rx: 10, fill: "#495057"}), s.hall);
  s.cab = [0, 1].map(() => el("line", {stroke: INK, "stroke-width": 10, "stroke-linecap": "round"}, st));
  // the grab: a hub and six tines, seen from below
  s.claw = el("g", {}, st); s.tines = []; for (let i = 0; i < 6; i++) { const g = el("g", {}, s.claw); g.a = i * 60 + 30; g.sc = el("g", {}, g);
    el("path", R3A({d: "M50 -44 L330 -70 Q430 -52 500 0 Q430 52 330 70 L50 44 Z", fill: "#f4a300", "stroke-width": 9}), g.sc); el("path", {d: "M70 -18 L330 -32 Q400 -24 446 0 Q400 24 330 32 L70 18 Z", fill: "#c97b00"}, g.sc);
    el("path", R3A({d: "M430 -34 Q520 -10 560 0 Q520 10 430 34 Z", fill: "#adb5bd", "stroke-width": 7}), g.sc); [150, 250].forEach(x => el("circle", {cx: x, cy: 0, r: 13, fill: "#495057", stroke: INK, "stroke-width": 4}, g.sc)); s.tines.push(g); }
  el("circle", R3A({r: 104, fill: "#495057", "stroke-width": 9}), s.claw); el("circle", R3A({r: 54, fill: "#343a40"}), s.claw); for (let i = 0; i < 8; i++) el("circle", {cx: Math.cos(i * .785) * 80, cy: Math.sin(i * .785) * 80, r: 9, fill: "#adb5bd", stroke: INK, "stroke-width": 3}, s.claw);
  s.heap = [[-640, 420, 3, "#343a40", 20], [690, 430, 3.2, "#495057", -24], [-880, 160, 2.3, "#6c757d", 60], [900, 140, 2.2, "#212529", -50], [-330, 520, 2.4, "#adb5bd", -8], [330, 540, 2.5, "#343a40", 12]].map(([x, y, k, c, r]) => { const g = el("g", {}, st); r3Bag(g, c); g.x = x; g.y = y; g.k = k; g.r = r; return g; });
  s.me = r3Me(st); s.sha = fullRect(st, "#000", 0); s.vig = vignette(st, CURRY, .5); s.card = povCard(st, "A waste-to-energy plant in Tuas", "#f77f00"); s.flash = fullRect(st, "#fff8d6", 0);
  s.run = t => { const f = FR3("povClaw")(t), tt = t - SC.povClaw.t0, dsc = ease(clamp((f - .1) / .5)), down = dsc * dsc, opn = ramp(f, .16, .4), grab = ramp(f, .6, .68), lift = ease(clamp((f - .7) / .3));
    const sh = r3Sh(tt, 26 * on(f, .6, .8, .02) + 5 * lift), HY = 330 - 60 * lift, hs = 1 + 1.5 * lift * lift;
    tf(s.hall, `translate(${VP[0] + sh[0]} ${HY + sh[1]}) scale(${hs})`);
    const sw = (1 - grab) * 26 * Math.sin(tt * 1.6) * (1 - .6 * down), cx = VP[0] + sw + sh[0], cy = lerp(HY + 20, 470, down) + sh[1] * .6, sc = lerp(.13, 1.15, down) + 1.25 * grab;
    tf(s.claw, `translate(${cx} ${cy}) rotate(${10 * Math.sin(tt * .9) * (1 - grab)}) scale(${sc})`);
    s.tines.forEach(g => { tf(g, `rotate(${g.a})`); tf(g.sc, `scale(${lerp(.5, 1, opn) * (1 + .12 * grab)} ${1 + .5 * grab})`); });
    s.cab.forEach((l, i) => { const dx = (i ? 22 : -22); set(l, "x1", VP[0] + sh[0] + dx * hs * .6); set(l, "y1", HY + sh[1]); set(l, "x2", cx + dx * sc); set(l, "y2", cy); set(l, "stroke-width", 4 + 9 * sc); });
    s.heap.forEach((g, i) => { tf(g, `translate(${VP[0] + g.x * (1 + .5 * lift) + sh[0]} ${VP[1] + g.y + 900 * lift * lift + sh[1]}) rotate(${g.r}) scale(${g.k * (1 - .3 * lift)})`); });
    tf(s.me, `translate(${sh[0]} ${sh[1] + 6 * Math.sin(tt * 3) * lift})`); op(s.sha, .35 * down * (1 - grab) + .3 * grab * (1 - lift)); op(s.flash, ramp(f, .93, 1) * .9);
    showCard(s.card, t, SC.povClaw.t0 + .4, SC.povClaw.t1 - .3); }; return s; })();
