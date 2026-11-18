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
  s.junk = [["🍌", -70, 60, -20], ["🧻", 74, 70, 14]].map(([e, x, y, r]) => { const j = emo(s.cam, 0, 0, 96, e); j.jx = x; j.jy = y; j.jr = r; return j; });
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
    s.junk.forEach((j, i) => { const k = ramp(f, .44 + i * .05, .54 + i * .05); tf(j, k < 1 ? `translate(${BX + j.jx} ${lerp(-120, BY + j.jy, k * k)}) rotate(${j.jr + 200 * (1 - k)})` : `${G} translate(${j.jx} ${j.jy}) rotate(${j.jr})`); op(j, (f > .44 + i * .05 ? 1 : 0) * (1 - ramp(f, .93, .96))); });
    s.kit.hop.flap(flap);
    tf(s.you, `translate(380 250) scale(${Math.max(0, pop(f, .05, .08))}) rotate(${-6 + 2 * Math.sin(tt * 4)})`); op(s.you, on(f, .05, .34, .04));
    const z = lerp(1.45, 1.15, ramp(f, .3, .5)) + .55 * ramp(f, .84, 1), cx = lerp(BX, lerp(960, HX, ramp(f, .84, 1)), ramp(f, .3, .7)), cy = lerp(400, lerp(470, HY, ramp(f, .84, 1)), ramp(f, .3, .7));
    tf(s.cam, `translate(${VP[0]} ${VP[1]}) scale(${z}) translate(${-cx} ${-cy})`); op(s.dark, ramp(f, .955, .995));
    showCard(s.card, t, SC.kitchen.t0 + .5, SC.kitchen.t1 - .2); }; return s; })();

// ---- 2 DOWN THE CHUTE (first person): we tumble down the dark shaft past the hopper of every floor, 12 down to 1
S.povChute = (() => { const s = scene("povChute", "#07070d", "#07070d"), st = s.stage, N = 13;
  s.tun = el("g", {}, st);
  [[[-1, -1], [1, -1], "#4a4e63"], [[1, -1], [1, 1], "#5d627a"], [[1, 1], [-1, 1], "#3b3f52"], [[-1, 1], [-1, -1], "#545970"]].forEach(([a, b, c]) => el("path", {d: `M0 0 L${a[0] * 2600} ${a[1] * 2600} L${b[0] * 2600} ${b[1] * 2600} Z`, fill: c}, s.tun));
  [[-1, -1], [1, -1], [1, 1], [-1, 1]].forEach(a => el("line", {x1: 0, y1: 0, x2: a[0] * 2600, y2: a[1] * 2600, stroke: "#0b0b12", "stroke-width": 8}, s.tun));
  s.fog = el("circle", {r: 1500, fill: r3GR([[0, "#000", 1], [.06, "#000", .95], [.3, "#000", .5], [.7, "#000", .12], [1, "#000", 0]])}, s.tun);
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
      set(g.glow, "d", `M${296 * s1} ${-78 * s1} L${296 * s1} ${78 * s1} L${120 * s1} ${200 * s1} L${120 * s1} ${-200 * s1} Z`); op(g.glow, 0);
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
  s.plate = el("g", {}, s.far); s.pl = el("rect", R3A({x: -W - 30, y: -Hh - 30, width: 2 * W + 60, height: 10, fill: r3GL([[0, "#9aa5b8"], [.82, "#9aa5b8"], [.82, "#5f697c"], [1, "#5f697c"]], {gradientUnits: "userSpaceOnUse", x1: 0, y1: 0, x2: 0, y2: 64, spreadMethod: "repeat"}), "stroke-width": 7}), s.plate);
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
    tf(s.barT, `translate(0 ${-1120 + 470 * sq + 200 * ramp(f, .93, 1)})`); tf(s.barB, `translate(0 ${1120 - 250 * sq - 400 * ramp(f, .93, 1)})`); op(s.dark, ramp(f, .95, 1)); }; return s; })();

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

// ---- 5 THE FURNACE: first person into the fire (we burn), then the plant cut open: fire -> heat -> water boils -> steam -> turbine -> generator -> electricity
S.povFurnace = (() => { const s = scene("povFurnace", "#6a040f", "#6a040f"), st = s.stage;
  s.A = el("g", {}, st); fullRect(s.A, r3GR([[0, "#fff3b0"], [.22, "#ffba08"], [.55, "#e85d04"], [1, "#6a040f"]]));
  s.fl = field(s.A, 46, 77, e => r3Flame(e, 3.6), .2); s.me = r3Me(s.A);
  s.sparks = []; seed = 9; for (let i = 0; i < 40; i++) s.sparks.push({e: el("circle", {r: 4 + rnd() * 7, fill: "#fff3b0"}, s.A), x: rnd(), u: rnd(), v: .5 + rnd()});
  s.vig = vignette(s.A, "#ff7b00", .7);
  // ---- the plant, cut open
  const B = s.B = el("g", {}, st); fullRect(B, r3GL([[0, "#14213d"], [1, "#1d3557"]])); el("rect", {x: -200, y: 800, width: 2100, height: 300, fill: "#0b132b"}, B); el("line", {x1: -200, y1: 800, x2: 1900, y2: 800, stroke: INK, "stroke-width": 6}, B);
  el("rect", R3A({x: 0, y: 130, width: 560, height: 670, rx: 14, fill: "#5c677d", "stroke-width": 8}), B); el("rect", R3A({x: 36, y: 166, width: 488, height: 610, rx: 8, fill: "#1b1b3a"}), B);
  s.glow = el("ellipse", {cx: 280, cy: 700, rx: 300, ry: 260, fill: r3GR([[0, "#ff9e00", .75], [1, "#ff9e00", 0]])}, B);
  el("path", {d: "M50 700 L510 752", stroke: "#adb5bd", "stroke-width": 14, "stroke-linecap": "round", "stroke-dasharray": "34 12"}, B);
  s.fires = [[110, 690, 1.0], [200, 700, 1.25], [300, 712, 1.1], [390, 722, 1.3], [468, 730, .9]].map(([x, y, k]) => { const g = r3Flame(B, k); g.x = x; g.y = y; g.k = k; return g; });
  [[150, 716, 30], [250, 728, 36], [350, 738, 30], [440, 748, 26]].forEach(([x, y, r], i) => blob(el("g", {transform: `translate(${x} ${y})`}, B), r, "#3b1d08", 20 + i));
  s.you = el("g", {transform: "translate(250 700) rotate(-10) scale(.3)"}, B); const yb = r3Box(s.you); op(yb.sh, 0); s.youB = yb;
  s.heat = [0, 1, 2, 3].map(i => { const g = el("g", {}, B); el("path", {d: "M0 40 q-18 -14 0 -28 q18 -14 0 -28 q-18 -14 0 -28", fill: "none", stroke: INK, "stroke-width": 16, "stroke-linecap": "round"}, g);
    el("path", {d: "M0 40 q-18 -14 0 -28 q18 -14 0 -28 q-18 -14 0 -28", fill: "none", stroke: "#ff4d6d", "stroke-width": 8, "stroke-linecap": "round"}, g); el("path", {d: "M-16 -40 L0 -66 L16 -40 Z", fill: "#ff4d6d", stroke: INK, "stroke-width": 5, "stroke-linejoin": "round"}, g); g.x = 120 + i * 106; return g; });
  // the boiler tubes: water in (blue), steam out (white)
  const PD = "M-170 250 H430 Q474 250 474 292 Q474 334 430 334 H130 Q86 334 86 376 Q86 418 130 418 H700 V330 H836";
  el("path", {d: PD, fill: "none", stroke: INK, "stroke-width": 48, "stroke-linejoin": "round"}, B); s.pipe = el("path", {d: PD, fill: "none", stroke: "#48cae4", "stroke-width": 34, "stroke-linejoin": "round"}, B);
  s.pipeS = el("path", {d: "M300 334 H130 Q86 334 86 376 Q86 418 130 418 H700 V330 H836", fill: "none", stroke: "#f1faee", "stroke-width": 34, "stroke-linejoin": "round"}, B);
  s.pipeM = el("path", {d: "M474 292 Q474 334 430 334 H290", fill: "none", stroke: "#bfe9f5", "stroke-width": 34, "stroke-linejoin": "round"}, B);
  s.dots = []; for (let i = 0; i < 18; i++) s.dots.push(el("circle", {r: 9, fill: "#fff", stroke: INK, "stroke-width": 3}, B));
  emo(B, -110, 172, 64, "💧");
  // turbine, shaft, generator, cable, flats
  s.tb = el("g", {transform: "translate(966 330)"}, B); el("circle", R3A({r: 136, fill: "#e9ecef", "stroke-width": 8}), s.tb); s.bl = el("g", {}, s.tb);
  for (let k = 0; k < 10; k++) el("path", {d: "M16 -10 L112 -30 Q124 0 112 30 L16 10 Z", fill: "#457b9d", stroke: INK, "stroke-width": 4, transform: `rotate(${k * 36})`}, s.bl); el("circle", {r: 24, fill: INK}, s.tb);
  s.puffs = [0, 1, 2, 3, 4].map(() => el("circle", {r: 20, fill: "#fff", opacity: .8}, B));
  el("rect", R3A({x: 1100, y: 314, width: 130, height: 32, fill: "#adb5bd"}), B); s.stripes = [0, 1, 2, 3, 4].map(() => el("rect", {y: 316, width: 9, height: 28, fill: INK, opacity: .5}, B));
  el("rect", R3A({x: 1226, y: 206, width: 250, height: 248, rx: 20, fill: "#f8f9fa", "stroke-width": 8}), B);
  for (let k = 0; k < 8; k++) [228, 432].forEach(y => el("path", {d: `M${1250 + k * 27} ${y} h14`, stroke: "#b5651d", "stroke-width": 14, "stroke-linecap": "round"}, B));
  s.mag = el("g", {transform: "translate(1351 330)"}, B); el("rect", {x: -84, y: -22, width: 84, height: 44, fill: "#e63946", stroke: INK, "stroke-width": 5}, s.mag); el("rect", {x: 0, y: -22, width: 84, height: 44, fill: "#3a86ff", stroke: INK, "stroke-width": 5}, s.mag);
  tx(s.mag, {x: -42, y: 12, "text-anchor": "middle", "font-size": 32, "font-weight": 700, fill: "#fff"}, "N"); tx(s.mag, {x: 42, y: 12, "text-anchor": "middle", "font-size": 32, "font-weight": 700, fill: "#fff"}, "S");
  const WD = "M1476 330 H1540 V470 H1580"; el("path", {d: WD, fill: "none", stroke: INK, "stroke-width": 16, "stroke-linejoin": "round"}, B); s.cur = el("path", {d: WD, fill: "none", stroke: "#ffd166", "stroke-width": 8, "stroke-dasharray": "14 18"}, B);
  s.fg = el("circle", {cx: 1665, cy: 500, r: 330, fill: r3GR([[0, "#ffe066", .7], [1, "#ffe066", 0]]), opacity: 0}, B);
  el("rect", R3A({x: 1580, y: 250, width: 170, height: 550, rx: 8, fill: "#f4a261"}), B); s.wins = []; for (let r = 0; r < 8; r++) for (let c = 0; c < 3; c++) s.wins.push(el("rect", {x: 1596 + c * 50, y: 274 + r * 64, width: 34, height: 40, rx: 4, fill: "#3d405b", stroke: INK, "stroke-width": 3}, B));
  s.zap = emo(B, 1351, 150, 110, "⚡");
  s.labA = [["furnace", 280, 100], ["turbine", 966, 150], ["generator", 1351, 500]].map(([w, x, y]) => r3Lab(B, x, y, w, 44, "#ffe14d"));
  s.labB = [["heat", 280, 560], ["steam", 640, 500], ["electricity", 1440, 610]].map(([w, x, y]) => r3Lab(B, x, y, w, 40));
  s.card = povCard(st, "Burning makes heat… and the heat makes electricity", "#e85d04"); s.flash = fullRect(st, "#fff3b0", 0);
  const PTS = []; s.pts = () => { if (!PTS.length) { const L = s.pipe.getTotalLength(); for (let i = 0; i <= 240; i++) { const p = s.pipe.getPointAtLength(L * i / 240); PTS.push([p.x, p.y]); } } return PTS; };
  s.run = t => { const c = SC.povFurnace, f = FR3("povFurnace")(t), tt = t - c.t0, D = c.t1 - c.t0, cut = .3, ff = clamp(f / cut), g = clamp((f - cut) / (1 - cut)), x = ramp(f, cut - .03, cut + .03);
    op(s.A, 1 - x); op(s.B, x); op(s.flash, .9 * on(f, cut - .05, cut + .06, .045) + .8 * on(f, -.05, .08, .05));
    if (x < 1) { flyField(s.fl, .1 + 1.5 * ff, 1000); const burn = ramp(ff, .25, .9); s.me.burn(burn); const sh = r3Sh(tt, 8);
      tf(s.me, `translate(${sh[0]} ${sh[1] + 14 * burn}) translate(810 1020) scale(${1 - .25 * burn} 1) translate(-810 -1020)`);
      s.sparks.forEach(o => { const u = (o.u + tt * o.v * .9) % 1; set(o.e, "cx", -150 + o.x * 1920 + 60 * Math.sin(tt * 3 + o.u * 9)); set(o.e, "cy", 1040 - u * 1150); op(o.e, 1 - u); }); }
    if (x > 0) { const P = s.pts(), T = k => c.t0 + D * (cut + (1 - cut) * k);
      s.fires.forEach((e, i) => tf(e, `translate(${e.x} ${e.y}) scale(${e.k * (1 + .08 * Math.sin(tt * 13 + i * 2))} ${e.k * (1 + .16 * Math.sin(tt * 17 + i * 3))})`));
      s.youB.lid && tf(s.you, `translate(250 ${704}) rotate(-10) scale(.34)`); s.you.setAttribute("opacity", 1 - .0 * g);
      s.heat.forEach((e, i) => { const u = (tt * .7 + i * .27) % 1; tf(e, `translate(${e.x} ${lerp(640, 470, u)})`); op(e, Math.sin(u * Math.PI)); });
      s.dots.forEach((e, i) => { const u = (tt * .16 + i / 18) % 1, p = P[Math.floor(u * 240)], st2 = clamp((u - .34) / .12); set(e, "cx", p[0]); set(e, "cy", p[1]); set(e, "r", lerp(8, 15, st2)); set(e, "fill", mix("#0077b6", "#ffffff", st2)); });
      const ts = tt - D * (cut + (1 - cut) * .22), ang = ts > 0 ? 260 * Math.pow(Math.min(ts, 1.6), 2) / 2 * 1 + (ts > 1.6 ? 416 * (ts - 1.6) : 0) : 0; tf(s.bl, `rotate(${ang})`); tf(s.mag, `translate(1351 330) rotate(${ang})`);
      s.stripes.forEach((r, k) => set(r, "x", 1104 + ((k * 25 + ang * .35) % 118)));
      s.puffs.forEach((e, i) => { const u = (tt * .8 + i / 5) % 1; set(e, "cx", 966 + 60 * (i % 2 ? 1 : -1) * u); set(e, "cy", 190 - 110 * u); set(e, "r", 14 + 26 * u); op(e, ts > 0 ? .7 * (1 - u) : 0); });
      const el2 = ramp(t, T(.52), T(.6)), lit = ramp(t, T(.66), T(.72)); set(s.cur, "stroke-dashoffset", -tt * 110); op(s.cur, el2); tf(s.zap, `translate(1351 150) scale(${Math.max(0, pop(t, T(.5))) * (1 + .08 * Math.sin(tt * 9))}) translate(-1351 -150)`);
      s.wins.forEach((w, i) => set(w, "fill", lit > (i * 7 % 24) / 30 ? "#ffe066" : "#3d405b")); op(s.fg, lit);
      [.04, .36, .5].forEach((k, i) => { const e = s.labA[i], x0 = +e.getAttribute("x"), y0 = +e.getAttribute("y"); tf(e, `translate(${x0} ${y0}) scale(${Math.max(0, pop(t, T(k)))}) translate(${-x0} ${-y0})`); });
      [.1, .22, .62].forEach((k, i) => { const e = s.labB[i], x0 = +e.getAttribute("x"), y0 = +e.getAttribute("y"); tf(e, `translate(${x0} ${y0}) scale(${Math.max(0, pop(t, T(k)))}) translate(${-x0} ${-y0})`); }); }
    showCard(s.card, t, c.t0 + D * cut + .3, c.t1 - .25); }; return s; })();

// ---- 6 ASH (first person): we are ash on a conveyor now; only about one-tenth of the rubbish is left
function r3MeAsh(p) { const g = el("g", {}, p); el("path", R3A({d: "M-220 1060 V980 Q-60 930 120 960 Q300 900 520 944 Q700 890 900 936 Q1120 896 1300 950 Q1500 916 1660 962 Q1780 950 1840 980 V1060 Z", fill: "#8d99ae", "stroke-width": 8}), g);
  seed = 44; for (let i = 0; i < 40; i++) el("circle", {cx: -150 + rnd() * 1900, cy: 968 + rnd() * 50, r: 4 + rnd() * 9, fill: i % 3 ? "#6c757d" : "#ced4da"}, g);
  g.emb = []; for (let i = 0; i < 12; i++) g.emb.push(el("circle", {cx: -100 + rnd() * 1800, cy: 975 + rnd() * 36, r: 5 + rnd() * 5, fill: "#ff7b00"}, g)); return g; }
S.povAsh = (() => { const s = scene("povAsh", "#22252e", "#22252e"), st = s.stage;
  fullRect(st, r3GL([[0, "#2b2f3c"], [.45, "#3a3f50"], [1, "#1b1d27"]]));
  s.exit = el("g", {}, st); el("rect", R3A({x: -150, y: -110, width: 300, height: 220, rx: 10, fill: r3GL([[0, "#bde0fe"], [.55, "#bde0fe"], [.56, "#0096c7"], [1, "#0077b6"]]), "stroke-width": 6}), s.exit); emo(s.exit, 60, -50, 60, "☀️");
  s.belt = el("path", R3A({d: "M-420 1040 L690 500 L930 500 L2040 1040 Z", fill: "#5c6370", "stroke-width": 8}), st);
  s.rails = el("path", {d: "M-420 1040 L690 500 M2040 1040 L930 500", stroke: "#f4a300", "stroke-width": 16, "stroke-linecap": "round", fill: "none"}, st);
  s.posts = []; for (let i = 0; i < 8; i++) { const g = el("g", {}, st); [-1, 1].forEach(sd => { el("rect", R3A({x: sd * 700 - 26, y: -900, width: 52, height: 1500, fill: "#495057"}), g); el("rect", R3A({x: sd * 700 - 60, y: -900, width: 120, height: 70, fill: "#f4a300"}), g); });
    el("rect", R3A({x: -700, y: -900, width: 1400, height: 56, fill: "#495057"}), g); el("rect", R3A({x: -110, y: -850, width: 220, height: 50, rx: 12, fill: "#fff8d6"}), g); s.posts.push({g, z0: i / 8}); }
  s.lumps = []; seed = 21; for (let i = 0; i < 16; i++) { const g = el("g", {}, st), z = .3 + rnd() * .7; blob(g, 60, i % 3 ? "#8d99ae" : "#adb5bd", 50 + i); s.lumps.push({g, x: rnd() * 2 - 1, z}); seed = 21 + i * 7; }
  s.me = r3MeAsh(st); s.flakes = []; seed = 8; for (let i = 0; i < 30; i++) s.flakes.push({e: el("circle", {r: 3 + rnd() * 5, fill: "#ced4da", opacity: .7}, st), x: rnd(), u: rnd(), v: .3 + rnd() * .5});
  s.vig = vignette(st, "#adb5bd", .55);
  // 10 parts of rubbish -> 1 part of ash
  s.g10 = el("g", {}, st); el("rect", {x: 330, y: 18, width: 960, height: 236, rx: 30, fill: "#fffaf0", stroke: INK, "stroke-width": 7, filter: "url(#sh)"}, s.g10);
  tx(s.g10, {x: 470, y: 96, "text-anchor": "end", "font-size": 38, "font-weight": 700, fill: INK}, "rubbish"); tx(s.g10, {x: 470, y: 200, "text-anchor": "end", "font-size": 38, "font-weight": 700, fill: INK}, "ash");
  s.sq = []; for (let i = 0; i < 10; i++) { el("rect", R3A({x: 494 + i * 76, y: 48, width: 64, height: 64, rx: 10, fill: ["#588157", "#a47148", "#6c757d"][i % 3], "stroke-width": 5}), s.g10);
    el("rect", {x: 494 + i * 76, y: 152, width: 64, height: 64, rx: 10, fill: "none", stroke: "#adb5bd", "stroke-width": 4, "stroke-dasharray": "8 8"}, s.g10);
    s.sq.push(el("rect", R3A({x: 494 + i * 76, y: 152, width: 64, height: 64, rx: 10, fill: i ? ["#588157", "#a47148", "#6c757d"][i % 3] : "#8d99ae", "stroke-width": 5}), s.g10)); }
  s.card = povCard(st, "Only ash is left: about one-tenth of the rubbish", "#6c757d"); s.flash = fullRect(st, "#fff", 0);
  s.run = t => { const c = SC.povAsh, f = FR3("povAsh")(t), tt = t - c.t0, off = tt * .16, sh = r3Sh(tt, 3);
    tf(s.exit, `translate(${VP[0]} ${472}) scale(${.42 + 1.1 * f * f})`);
    s.posts.forEach(o => { const z = ((o.z0 - off) % 1 + 1) % 1, zz = .1 + 3 * z; o.z = z; tf(o.g, `translate(${VP[0]} ${500}) scale(${.6 / zz})`); op(o.g, clamp((1 - z) / .25)); });
    s.posts.slice().sort((p, q) => q.z - p.z).forEach(o => st.insertBefore(o.g, s.lumps[0].g));
    s.lumps.forEach((o, i) => { const y = 500 + 540 * o.z * o.z, hw = 110 + 1100 * o.z * o.z; tf(o.g, `translate(${VP[0] + o.x * hw * .8 + sh[0]} ${y + sh[1] * 2 + 3 * Math.sin(tt * 30 + i)}) scale(${.25 + 1.9 * o.z * o.z})`); });
    tf(s.me, `translate(${sh[0]} ${sh[1] * 2 + 3 * Math.sin(tt * 30)})`); s.me.emb.forEach((e, i) => op(e, (1 - ramp(f, .1 + i * .03, .4 + i * .03)) * (.6 + .4 * Math.sin(tt * 9 + i))));
    s.flakes.forEach(o => { const u = (o.u + tt * o.v * .4) % 1; set(o.e, "cx", -150 + o.x * 1920 + 40 * Math.sin(tt * 2 + o.u * 20)); set(o.e, "cy", 1000 - u * 900); op(o.e, .7 * Math.sin(u * Math.PI)); });
    popAt(s.g10, 0, 0, t, c.t0 + .35); tf(s.g10, `translate(810 136) scale(${Math.max(0, pop(t, c.t0 + .35))}) translate(-810 -136)`);
    s.sq.forEach((e, i) => { const k = ramp(f, .28 + (9 - i) * .035, .34 + (9 - i) * .035); if (i) { op(e, 1 - k); } else set(e, "fill", mix("#588157", "#8d99ae", ramp(f, .3, .7))); });
    op(s.flash, ramp(f, .93, 1) * .85); showCard(s.card, t, c.t0 + .9, c.t1 - .25); }; return s; })();

// ---- 7 THE BARGE (outside, the real map): the ash sails from Tuas to Semakau Landfill
S.barge = (() => { const s = scene("barge", "#48cae4", "#48cae4"), st = s.stage, K = 1.15, CX = 640, CY = 600;
  s.map = r3Map(st, FULL.w, FULL.h, K, CX, CY, 0); tf(s.map, `translate(${VP[0]} ${VP[1]})`);
  const M = (q, dx = 0, dy = 0) => { const p = s.map.pt(q, dx, dy); return [p[0] + VP[0], p[1] + VP[1]]; };
  const A = M(SG3.tuas0), Bq = M([330, 770]), C = M(SG3.sem, -58 * K, -4 * K);
  s.cv = u => [(1 - u) * (1 - u) * A[0] + 2 * u * (1 - u) * Bq[0] + u * u * C[0], (1 - u) * (1 - u) * A[1] + 2 * u * (1 - u) * Bq[1] + u * u * C[1]];
  s.dots = []; for (let i = 1; i < 34; i++) { const p = s.cv(i / 34); s.dots.push(el("circle", {cx: p[0], cy: p[1], r: 8, fill: "#fff", stroke: INK, "stroke-width": 4})); st.appendChild(s.dots[i - 1]); }
  s.sgL = r3Lab(st, ...M([830, 330]), "Singapore", 64);
  emo(st, A[0] + 34, A[1] - 44, 80, "🏭"); s.p1 = r3Pin(st); tf(s.p1, `translate(${A.join(" ")})`); s.p2 = r3Pin(st, "#e63946"); tf(s.p2, `translate(${M(SG3.sem).join(" ")})`);
  s.l1 = r3Lab(st, A[0] - 20, A[1] - 96, "Tuas", 50, "#ffe14d"); s.l2 = r3Lab(st, M(SG3.sem)[0] + 40, M(SG3.sem)[1] + 96, "Semakau Landfill", 50, "#ffe14d");
  // the barge, seen from above: a tug pulling a flat barge heaped with ash
  s.wake = el("path", {d: "M-70 -22 L-210 -52 M-70 22 L-210 52 M-80 0 H-190", stroke: "#fff", "stroke-width": 7, "stroke-linecap": "round", fill: "none", opacity: .8}, st);
  s.bg = el("g", {}, st); el("rect", R3A({x: -74, y: -32, width: 124, height: 64, rx: 12, fill: "#e76f51"}), s.bg); blob(s.bg, 30, "#8d99ae", 71).setAttribute("transform", "translate(-12 0) scale(1.5 .8)");
  el("line", {x1: 50, y1: 0, x2: 82, y2: 0, stroke: INK, "stroke-width": 5}, s.bg); el("path", R3A({d: "M82 -16 H112 Q134 -10 138 0 Q134 10 112 16 H82 Z", fill: "#ffd166", "stroke-width": 5}), s.bg); el("rect", {x: 90, y: -8, width: 16, height: 16, rx: 3, fill: INK}, s.bg);
  s.card = povCard(st, "By barge to Semakau Landfill", "#0077b6");
  s.run = t => { const c = SC.barge, f = FR3("barge")(t), u = ease(clamp((f - .14) / .74)), p = s.cv(u), q = s.cv(Math.min(1, u + .01)), an = Math.atan2(q[1] - p[1], q[0] - p[0]) * 180 / Math.PI;
    tf(s.bg, `translate(${p[0]} ${p[1]}) rotate(${u >= .99 ? 8 : an}) scale(1.25)`); tf(s.wake, `translate(${p[0]} ${p[1]}) rotate(${u >= .99 ? 8 : an}) scale(1.25)`); op(s.wake, u > .02 && u < .97 ? .8 : 0);
    s.dots.forEach((d, i) => op(d, (i + 1) / 34 < u - .02 ? 1 : .0));
    [s.p1, s.l1].forEach(e => op(e, ramp(t, c.t0 + .1, c.t0 + .3))); [s.p2, s.l2].forEach(e => op(e, ramp(t, c.t0 + .45, c.t0 + .65))); r3Pulse(s.p1, t); r3Pulse(s.p2, t + .4);
    showCard(s.card, t, c.t0 + .5, c.t1 - .25); }; return s; })();

// ---- 8 SEMAKAU LANDFILL (outside, cut open): a piece of sea walled off by a lined rock wall; ash fills cell after cell
S.semakau = (() => { const s = scene("semakau", "#8ecae6", "#8ecae6"), st = s.stage, SEA = 470, BED = 830;
  fullRect(st, r3GL([[0, "#90e0ef"], [.42, "#caf0f8"], [1, "#caf0f8"]])); emo(st, 120, 80, 100, "☀️");
  el("rect", {x: -200, y: SEA, width: 2100, height: 600, fill: r3GL([[0, "#0096c7"], [1, "#023e8a"]])}, st);
  el("rect", {x: -200, y: BED, width: 2100, height: 300, fill: "#b08968"}, st); el("line", {x1: -200, y1: BED, x2: 1900, y2: BED, stroke: INK, "stroke-width": 6}, st);
  emo(st, 40, 650, 70, "🐠"); emo(st, 230, 740, 60, "🐟"); emo(st, 150, 800, 56, "🪸"); emo(st, -60, 790, 60, "🌿");
  // the cell (between the two rock walls): sea water, then ash
  const cell = "M570 440 L700 830 H1420 L1550 440 Z", cid = "r3cell"; el("path", {d: cell}, el("clipPath", {id: cid}, r3Defs()));
  el("path", {d: cell, fill: "#48cae4"}, st); s.ashC = el("g", {"clip-path": `url(#${cid})`}, st); s.ash = el("path", {fill: "#8d99ae", stroke: INK, "stroke-width": 6, "stroke-linejoin": "round"}, s.ashC);
  s.sp = []; seed = 61; for (let i = 0; i < 70; i++) s.sp.push({e: el("circle", {r: 4 + rnd() * 6, fill: i % 2 ? "#6c757d" : "#ced4da"}, s.ashC), x: 560 + rnd() * 1000, y: 450 + rnd() * 380});
  el("path", {d: "M576 440 L706 830 H1414 L1544 440", fill: "none", stroke: INK, "stroke-width": 18, "stroke-linejoin": "round"}, st); el("path", {d: "M576 440 L706 830 H1414 L1544 440", fill: "none", stroke: "#ffd60a", "stroke-width": 8, "stroke-linejoin": "round", "stroke-dasharray": "26 14"}, st);
  const bund = (x0, flip) => { const g = el("g", {transform: `translate(${x0} 0) scale(${flip ? -1 : 1} 1)`}, st); el("path", R3A({d: "M-150 830 L-30 430 H70 L200 830 Z", fill: "#a39081", "stroke-width": 8}), g);
    seed = 90 + x0; for (let i = 0; i < 26; i++) { const yy = 460 + rnd() * 340, hw = (yy - 430) * .3, xx = lerp(-30 - hw, 60 + hw * .9, rnd()); blob(el("g", {transform: `translate(${xx} ${yy})`}, g), 22 + rnd() * 14, i % 2 ? "#8a7968" : "#b8a999", 300 + i + x0).setAttribute("stroke-width", 4); } return g; };
  bund(500, false); bund(1620, true);
  // a barge at the wall, a tipper truck on the ash
  const bg = el("g", {transform: "translate(140 470)"}, st); el("path", R3A({d: "M-150 -34 H150 L128 30 H-128 Z", fill: "#e76f51"}), bg); el("path", R3A({d: "M-110 -34 Q-30 -110 60 -34 Z", fill: "#8d99ae"}), bg); el("rect", R3A({x: 84, y: -84, width: 44, height: 50, rx: 6, fill: "#ffd166", "stroke-width": 5}), bg);
  s.truck = el("g", {}, st); s.bed = el("g", {}, s.truck); el("path", R3A({d: "M-96 -18 H40 L52 -76 H-108 Z", fill: "#f4a300"}), s.bed); el("path", R3A({d: "M-96 -76 Q-30 -112 44 -76 Z", fill: "#8d99ae", "stroke-width": 5}), s.bed);
  el("rect", R3A({x: 44, y: -84, width: 66, height: 70, rx: 10, fill: "#2a9d8f"}), s.truck); el("rect", {x: 66, y: -72, width: 34, height: 26, rx: 4, fill: "#caf0f8", stroke: INK, "stroke-width": 4}, s.truck);
  el("rect", R3A({x: -96, y: -22, width: 206, height: 14, rx: 6, fill: "#495057", "stroke-width": 5}), s.truck); [-60, 70].forEach(x => { el("circle", R3A({cx: x, cy: 0, r: 22, fill: "#212529"}), s.truck); el("circle", {cx: x, cy: 0, r: 8, fill: "#adb5bd"}, s.truck); });
  s.pour = []; for (let i = 0; i < 14; i++) s.pour.push(el("circle", {r: 9, fill: "#8d99ae", stroke: INK, "stroke-width": 3}, st));
  s.labs = [["the sea", 130, 640], ["rock wall with a lining", 540, 640], ["landfill cell", 1090, 640]].map(([w, x, y]) => r3Lab(st, x, y, w, 40));
  // Semakau's cells seen from above, and the year
  s.top = el("g", {}, st); el("rect", {x: 300, y: 36, width: 1180, height: 216, rx: 30, fill: "#fffaf0", stroke: INK, "stroke-width": 7, filter: "url(#sh)"}, s.top);
  s.yr = tx(s.top, {x: 450, y: 176, "text-anchor": "middle", "font-size": 96, "font-weight": 700, fill: INK}, "2026");
  s.cells = []; for (let i = 0; i < 8; i++) { el("rect", R3A({x: 610 + i * 104, y: 80, width: 90, height: 120, rx: 10, fill: "#48cae4", "stroke-width": 5}), s.top); const f = el("rect", {x: 613 + i * 104, width: 84, rx: 7, fill: "#8d99ae"}, s.top); s.cells.push(f); }
  s.full = chip(st, "Full by about 2035?", "#e63946", {fs: 50}); s.card = povCard(st, "Semakau Landfill: ash fills up cells walled off from the sea", "#0077b6");
  s.run = t => { const c = SC.semakau, f = FR3("semakau")(t), tt = t - c.t0, k = ramp(f, .16, .86) * .6 + .4 * clamp((f - .16) / .7);
    const X1 = lerp(1470, 520, k); set(s.ash, "d", `M1700 420 L${X1} 444 L${X1 - 430} 850 L1700 850 Z`); s.sp.forEach(o => op(o.e, (o.x - X1) / 430 > (444 - o.y) / 406 + .08 ? 1 : 0));
    const txk = Math.max(X1 + 150, 720), tip = .5 + .5 * Math.sin(tt * 2.4); tf(s.truck, `translate(${txk} 424)`); tf(s.bed, `rotate(${-34 * tip * (k < 1 ? 1 : 0)} -96 -18)`);
    s.pour.forEach((e, i) => { const u = (tt * 1.4 + i / 14) % 1; set(e, "cx", txk - 104 - 60 * u); set(e, "cy", 400 + 110 * u * u + 30 * u); op(e, k < 1 && tip > .35 ? 1 - u * .3 : 0); });
    s.labs.forEach((e, i) => { const x0 = +e.getAttribute("x"), y0 = +e.getAttribute("y"); tf(e, `translate(${x0} ${y0}) scale(${Math.max(0, pop(t, c.t0 + .5 + i * .35))}) translate(${-x0} ${-y0})`); });
    const kk = clamp((f - .16) / .7); s.yr.textContent = String(Math.round(lerp(2026, 2035, kk))); set(s.yr, "fill", kk >= 1 ? "#e63946" : INK);
    s.cells.forEach((e, i) => { const h = 114 * (i < 5 ? 1 : clamp(kk * 3 - (i - 5))); set(e, "y", 83 + 114 - h); set(e, "height", h); });
    tf(s.top, `translate(810 144) scale(${Math.max(0, pop(t, c.t0 + .3))}) translate(-810 -144)`);
    tf(s.full, `translate(1090 316) rotate(-4) scale(${Math.max(0, pop(t, c.t0 + (c.t1 - c.t0) * .88, .4)) * (1 + .05 * Math.sin(tt * 8))})`); op(s.full, f > .88 ? 1 : 0);
    showCard(s.card, t, c.t0 + .6, c.t1 - .25); }; return s; })();
