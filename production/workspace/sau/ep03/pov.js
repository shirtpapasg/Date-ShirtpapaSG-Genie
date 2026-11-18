/* TheOneApp, Explored EP03: a drink can's journey in FIRST PERSON. Load after common.js, geo_map.js and ep03/scenes.js.
   The camera IS an aluminium drink can. Picture-only shots (sound effects, a music bed, one-line cards), in this order:
     returnMachine (outside) > povScan > povTruck > povSort > povBale > povMelt > povRoll > shelf (outside)
   Kept true: the return machine reads the Deposit Mark and then squashes the can; at the sorting plant a magnet hanging over the belt lifts off the
   steel cans (steel is mostly iron) and leaves aluminium on the belt; aluminium is baled, melted, rolled into thin sheet, cut into discs and pressed
   (drawn) into a cup that becomes a new can. We ride the belt, so the belt stands still for us and the hall rushes past.
   The silver edge says "this is you" (aluminium); it turns orange while we are hot. Every frame depends only on t. */

const c3BODY = "M-40 -90 H40 L50 -70 V70 L40 90 H-40 L-50 70 V-70 Z", c3DENT = "M-40 -90 H40 L50 -70 V-20 L36 6 L50 30 V70 L40 90 H-40 L-50 70 V34 L-40 4 L-50 -24 V-70 Z";
const C3COL = ["#e63946", "#3a86ff", "#06d6a0", "#ffbe0b", "#f77f00", "#b5179e", "#4cc9f0"];
function c3Face(g, y = -30, k = 1) { [-18, 18].forEach(x => { el("circle", {cx: x * k, cy: y, r: 13 * k, fill: "#fff", stroke: INK, "stroke-width": 3 * k}, g); el("circle", {cx: (x + 2) * k, cy: y + 2 * k, r: 6.5 * k, fill: INK}, g); });
  el("path", {d: `M${-13 * k} ${y + 22 * k} Q0 ${y + 34 * k} ${13 * k} ${y + 22 * k}`, fill: "none", stroke: INK, "stroke-width": 4.5 * k, "stroke-linecap": "round"}, g); }
// a cheap can for crowds (no clip path)
function canLite(p, col, o = {}) { const g = el("g", {}, p); el("path", {d: o.dent ? c3DENT : c3BODY, fill: col, stroke: INK, "stroke-width": 7, "stroke-linejoin": "round"}, g);
  el("path", {d: "M-40 -90 H40 L50 -70 H-50 Z", fill: "#d5dde2", stroke: INK, "stroke-width": 5, "stroke-linejoin": "round"}, g); el("path", {d: "M-50 70 H50 L40 90 H-40 Z", fill: "#d5dde2", stroke: INK, "stroke-width": 5, "stroke-linejoin": "round"}, g);
  if (!o.dent) { el("rect", {x: -47, y: 16, width: 94, height: 30, fill: "#fff", opacity: .9}, g); [[-24, 31], [0, 31], [24, 31]].forEach(([x, y]) => el("circle", {cx: x, cy: y, r: 7, fill: col}, g)); }
  el("rect", {x: -38, y: -60, width: 12, height: 120, rx: 6, fill: "#fff", opacity: .35}, g); if (o.face) c3Face(g, o.dent ? -44 : -34); return g; }
function c3Fly(a, off, o = {}) { const sp = o.spread || 900, fog = o.fog || .3, K = o.k || 2.6;
  a.forEach(ob => { const z = ((ob.z0 - off) % 1 + 1) % 1, zz = .08 + K * z; ob.z = z;
    let sx = VP[0] + ob.x * sp / zz, sy = VP[1] + ob.y * sp * .7 / zz, sc = .5 / zz, r = o.rot === 0 ? 0 : ob.u * 360 + off * 60 * (ob.u - .5);
    if (o.fn) { const q = o.fn(ob, sx, sy, z, sc); if (q) { sx = q[0]; sy = q[1]; if (q[2] !== undefined) sc = q[2]; if (q[3] !== undefined) r = q[3]; } }
    tf(ob.e, `translate(${sx} ${sy}) scale(${sc}) rotate(${r})`); op(ob.e, clamp((1 - z) / fog) * clamp((z - .004) / (o.nf || .05)) * (o.a === undefined ? 1 : o.a)); });
  a.slice().sort((p, q) => q.z - p.z).forEach(ob => a.G.appendChild(ob.e)); }
function c3Streaks(p, n, sd, col, w = 6) { const G = el("g", {}, p); seed = sd; const a = [];
  for (let i = 0; i < n; i++) a.push({an: rnd() * Math.PI * 2, u: rnd(), v: .6 + rnd() * .8, e: el("line", {stroke: col, "stroke-width": w, "stroke-linecap": "round"}, G)}); a.G = G; return a; }
function c3RunStreaks(a, ph, o = {}) { const cx = VP[0] + (o.x || 0), cy = VP[1] + (o.y || 0);
  a.forEach(s => { const k = ((s.u + ph * s.v) % 1 + 1) % 1, r1 = (o.r0 || 90) + (o.r1 || 1150) * k * k, r2 = r1 * (1 + (o.len || .22)), c = Math.cos(s.an), sn = Math.sin(s.an);
    set(s.e, "x1", cx + c * r1); set(s.e, "y1", cy + sn * r1); set(s.e, "x2", cx + c * r2); set(s.e, "y2", cy + sn * r2); op(s.e, Math.sin(k * Math.PI) * (o.a === undefined ? .7 : o.a)); }); }
function c3Big(p, text, col = INK) { return chip(p, text, col, {fs: 50}); }
const c3Show = (c, t, a, b, y = 884) => showCard(c, t, a, b, y);
const c3Full = (p, fill, o = 1, m = 400) => el("rect", {x: FULL.x - m, y: FULL.y - m, width: FULL.w + 2 * m, height: FULL.h + 2 * m, fill, opacity: o}, p);
const c3Shake = (u, a, amp = 16, d = .5) => { const k = u < a ? 0 : Math.exp(-(u - a) / d * 4); return [amp * k * Math.sin((u - a) * 95), amp * k * Math.cos((u - a) * 71)]; };

// ---- 1. returnMachine (outside): the pupil feeds us into the return machine, and the camera dives into the hole after us
S.returnMachine = (() => { const s = scene("returnMachine", "#b9b3a6", "#b9b3a6"), st = s.stage, G = 915, HX = 1180, HY = G + 20 - 322; s.cam = el("g", {}, st); const c = s.cam;
  el("rect", {x: -1500, y: -1200, width: 4800, height: 3600, fill: "#c4beb1"}, c);
  el("rect", {x: -1500, y: -1200, width: 1560, height: 2115, fill: c3GradL([[0, "#bfe9ff"], [1, "#e8f7d4"]])}, c); el("circle", A3({cx: -80, cy: 520, r: 190, fill: "#52b788"}), c); el("rect", A3({x: -96, y: 690, width: 32, height: 230, fill: "#7f5539"}), c);
  el("rect", A3({x: 40, y: -1200, width: 110, height: 2115, fill: "#fff1d6", "stroke-width": 7}), c); el("rect", {x: 120, y: -1200, width: 28, height: 2112, fill: INK, opacity: .1}, c);
  el("rect", {x: -1500, y: G, width: 4800, height: 1400, fill: "#d6d0c2"}, c); el("line", {x1: -1500, y1: G, x2: 3300, y2: G, stroke: INK, "stroke-width": 6}, c); [G + 60, G + 150].forEach(y => el("line", {x1: -1500, y1: y, x2: 3300, y2: y, stroke: "#bdb6a6", "stroke-width": 5}, c));
  el("rect", A3({x: 1480, y: 330, width: 260, height: 200, rx: 10, fill: "#fff", "stroke-width": 5}), c); for (let r = 0; r < 4; r++) for (let k = 0; k < 6; k++) el("rect", {x: 1494 + k * 40, y: 344 + r * 46, width: 32, height: 36, rx: 3, fill: "#ced4da", stroke: INK, "stroke-width": 3}, c);     // letter boxes
  s.sh = el("ellipse", {cx: HX, cy: G + 24, rx: 300, ry: 26, fill: INK, opacity: .18}, c);
  s.rvmG = el("g", {transform: `translate(${HX} ${G + 20}) scale(1.5)`}, c); s.rvm = rvmG(s.rvmG);
  s.dark = el("circle", {cx: HX, cy: HY, r: 80, fill: c3GradR([[0, "#12313a"], [.6, "#0b1d24"], [1, "#081419"]])}, c);
  s.kid = c3Kid(c); op(s.kid.can, 0);
  s.can = el("g", {}, c); canG(s.can, HERO, {face: true, mark: true}); s.you = youTag(c);
  s.cover = el("path", {d: `M${HX - 84} ${HY} A84 84 0 0 1 ${HX + 84} ${HY} L${HX + 140} ${HY} A140 140 0 0 0 ${HX - 140} ${HY} Z`, fill: "none"}, c);
  s.black = fullRect(st, "#0b1d24", 0); s.card = c3Big(st, "You are an aluminium drink can");
  s.run = t => { const t0 = c3T("returnMachine"), u = t - t0, w = c3Walk(u, .25, 1.35, 3), aim = ramp(u, 1.3, 1.9), push = ramp(u, 2.0, 2.6), rel = ramp(u, 2.9, 3.4);
    const q = {x: lerp(560, 800, w.k), y: G + 52, sc: 1.2, sw: w.sw, bob: w.bob, arm: lerp(lerp(-62, -90, aim), -30, rel), head: -4 * rel, smile: u > 2.5, lean: 3 * aim * (1 - rel)};
    c3Pose(s.kid, q); const h = c3Hand({...q, arm: lerp(-62, -90, aim)}, 150);
    const cx = lerp(h[0] + 30 * aim, HX + 10, push), cy = lerp(h[1], HY, Math.min(1, push * 3)), cs = lerp(.72, .5, push);
    tf(s.can, `translate(${cx} ${cy}) rotate(${90 * aim}) scale(${cs})`); op(s.can, 1 - ramp(u, 2.45, 2.62));
    tf(s.you, `translate(${cx} ${cy - 66 - 26 * (1 - aim)}) scale(${Math.max(0, pop(u, .45))})`); op(s.you, on(u, .45, 2.35, .15));
    s.rvm.scr.textContent = u > 2.6 ? "scanning…" : "RETURN"; set(s.rvm.ring, "fill", u > 2.6 ? "#8dffc0" : "#e9eef1");
    const zk = ease(clamp((u - 2.7) / 2.0)), z = Math.exp(lerp(Math.log(lerp(1.06, 1.2, ramp(u, 0, 2.6))), Math.log(15), zk * zk)), fx = lerp(lerp(860, 940, ramp(u, 0, 2.6)), HX, Math.min(1, zk * 3)), fy = lerp(560, HY, Math.min(1, zk * 3));
    tf(c, `translate(${VP[0]} ${VP[1]}) scale(${z}) translate(${-fx} ${-fy})`); op(s.black, ramp(u, 4.2, 4.8));
    c3Show(s.card, t, t0 + .5, t0 + 4.3); }; return s; })();

// ---- 2. povScan: inside the machine. A red scanner beam sweeps over us and reads the Deposit Mark: beep, "10¢ back!", then the press squashes us flat
S.povScan = (() => { const s = scene("povScan", "#0b1d24", "#0b1d24"), st = s.stage, X = VP[0], Y = VP[1]; s.w = el("g", {}, st);
  c3Full(s.w, c3GradR([[0, "#2c5364"], [.55, "#12313a"], [1, "#061217"]]));
  s.tun = tunnelG(s.w, 8, (e, i) => { el("rect", {x: -330, y: -215, width: 660, height: 430, rx: 70, fill: "none", stroke: INK, "stroke-width": 34}, e); el("rect", {x: -330, y: -215, width: 660, height: 430, rx: 70, fill: "none", stroke: i % 2 ? "#3f7388" : "#2f5b6e", "stroke-width": 24}, e);
    [[-250, -215], [250, -215], [-250, 215], [250, 215]].forEach(([x, y]) => el("circle", {cx: x, cy: y, r: 7, fill: "#9fc3d1"}, e)); });
  s.lamps = [-1, 1].map(d => { const g = el("g", {transform: `translate(${X + d * 700} ${Y - 400})`}, s.w); el("rect", A3({x: -70, y: -50, width: 140, height: 100, rx: 20, fill: "#495057"}), g); g.gl = el("g", {}, g); c3Glow(g.gl, "#ff4d6d", 150, .9, .2); el("circle", A3({r: 30, fill: "#ff4d6d", "stroke-width": 5}), g); return g; });
  s.mon = el("g", {}, s.w); el("rect", A3({x: -310, y: -200, width: 620, height: 400, rx: 34, fill: "#3d5a68", "stroke-width": 8}), s.mon); s.scr = el("rect", A3({x: -280, y: -170, width: 560, height: 340, rx: 18, fill: "#06262e"}), s.mon);
  tx(s.mon, {x: 0, y: -122, "text-anchor": "middle", "font-size": 34, "font-weight": 700, fill: "#8dffc0", "letter-spacing": 6}, "SCANNER");
  tf(canG(s.mon, HERO, {face: true, mark: true}), "translate(-150 26) scale(1.25)"); s.mk = el("g", {transform: "translate(110 6)"}, s.mon); dmark(s.mk, 84);
  tx(s.mon, {x: 110, y: 138, "text-anchor": "middle", "font-size": 34, "font-weight": 700, fill: "#fff"}, "Deposit Mark");
  s.zl = el("line", {x1: -112, y1: 88, x2: 22, y2: 30, stroke: "#8dffc0", "stroke-width": 5, "stroke-dasharray": "3 12", "stroke-linecap": "round"}, s.mon);
  s.sl = el("rect", {x: -5, y: -96, width: 10, height: 258, fill: "#ff4d6d"}, s.mon); s.tick = c3Tick(s.mon, 44, 16);
  s.beam = el("g", {}, s.w); el("rect", {x: FULL.x - 400, y: -110, width: FULL.w + 800, height: 220, fill: c3GradL([[0, "#ff4d6d", 0], [.5, "#ff4d6d", .55], [1, "#ff4d6d", 0]])}, s.beam); el("rect", {x: FULL.x - 400, y: -7, width: FULL.w + 800, height: 14, fill: "#fff0f3"}, s.beam);
  s.red = c3Full(s.w, "#ff4d6d", 0); s.green = c3Full(s.w, "#8dffc0", 0);
  s.coin = el("g", {}, s.w); c3Glow(s.coin, "#fff3b0", 260, .8, .2); coinG(s.coin, 120); s.back = c3Lab(s.w, "10¢ back!", 130, "#ffe14d");
  const plate = d => { const g = el("g", {}, s.w); el("rect", {x: FULL.x - 400, y: d > 0 ? 0 : -1300, width: FULL.w + 800, height: 1300, fill: c3GradL([[0, "#6c757d"], [1, "#495057"]])}, g);
    for (let k = 0; k < 30; k++) el("path", {d: `M${FULL.x - 300 + k * 90} ${d > 0 ? 0 : -46} h45 l-36 46 h-45 Z`, fill: "#ffbe0b"}, g); el("rect", {x: FULL.x - 400, y: d > 0 ? 0 : -46, width: FULL.w + 800, height: 46, fill: "none", stroke: INK, "stroke-width": 8}, g);
    for (let k = 0; k < 9; k++) el("circle", {cx: FULL.x + 60 + k * 230, cy: d * 130, r: 16, fill: "#343a40", stroke: INK, "stroke-width": 4}, g); return g; };
  s.pt = plate(-1); s.pb = plate(1);
  vignette(st, "#cfd8dc", .5);
  s.cr = el("g", {}, st); tx(s.cr, {x: 0, y: 60, "text-anchor": "middle", "font-size": 230, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 34}, "CRUNCH!");
  s.black = fullRect(st, "#111", 0); s.card = c3Big(st, "The scanner reads your Deposit Mark");
  s.run = t => { const t0 = c3T("povScan"), u = t - t0, sl = ease(clamp(u / 1.0)), TB = 2.25, TC = 3.95;
    s.tun.forEach(o => { const z = ((o.z0 - .3 - .22 * sl) % 1 + 1) % 1, k = 1 / (.3 + 2.2 * z); tf(o.e, `translate(${X} ${Y}) scale(${k})`); op(o.e, clamp((1 - z) / .3) * clamp(z / .03)); o.z = z; }); s.tun.slice().sort((p, q) => q.z - p.z).forEach(o => s.tun.G.appendChild(o.e));
    tf(s.mon, `translate(${X} ${Y - 30}) scale(${lerp(.6, 1.5, sl)})`); op(s.mon, 1 - .7 * on(u, TB + .3, TC - .25, .15));
    const sw = clamp((u - 1.0) / 1.2), scan = on(u, .95, TB, .1);
    tf(s.beam, `translate(0 ${lerp(-150, 1100, sw)})`); op(s.beam, scan); op(s.red, .1 * scan); s.lamps.forEach(g => op(g.gl, .25 + .75 * scan));
    tf(s.sl, `translate(${lerp(-270, 270, sw)} 0)`); op(s.sl, scan); set(s.scr, "fill", u > TB ? "#0d4a3a" : "#06262e");
    tf(s.mk, `translate(110 6) scale(${1 + .12 * on(u, TB, TB + .4, .12)})`); tf(s.tick, `translate(232 -92) scale(${Math.max(0, pop(u, TB, .3))})`); op(s.green, .28 * on(u, TB, TB + .35, .08));
    tf(s.coin, `translate(${X} ${Y - 60}) scale(${Math.max(0, pop(u, TB + .3, .4))}) rotate(${-200 * (1 - ramp(u, TB + .3, TB + .7))})`); op(s.coin, on(u, TB + .3, TC - .25, .15));
    tf(s.back, `translate(${X} ${Y + 200}) scale(${Math.max(0, pop(u, TB + .5, .4))})`); op(s.back, on(u, TB + .5, TC - .25, .15));
    const k = Math.pow(clamp((u - (TC - .4)) / .4), 3), sh = c3Shake(u, TC, 26, .5); tf(s.pt, `translate(0 ${lerp(-110, 452, k)})`); tf(s.pb, `translate(0 ${lerp(1070, 508, k)})`);
    tf(s.w, `translate(${sh[0]} ${sh[1]})`);
    tf(s.cr, `translate(${X + sh[0]} ${Y + sh[1]}) rotate(-6) scale(${Math.max(0, pop(u, TC, .28))})`); op(s.cr, on(u, TC, 4.85, .08));
    op(s.black, ramp(u, 4.55, 4.95)); c3Show(s.card, t, t0 + .25, t0 + TB + .15); }; return s; })();

// ---- 3. povTruck: tumbling in the back of the collection truck with hundreds of other squashed cans
S.povTruck = (() => { const s = scene("povTruck", "#1d2d44", "#1d2d44"), st = s.stage, X = VP[0], Y = VP[1]; s.w = el("g", {}, st);
  c3Full(s.w, "#22313f"); const bw = 330, bh = 215, E = {l: FULL.x - 300, r: FULL.x + FULL.w + 300, t: FULL.y - 300, b: FULL.y + FULL.h + 300};
  [[`M${E.l} ${E.t} L${X - bw} ${Y - bh} H${X + bw} L${E.r} ${E.t} Z`, "#3b4b5a"], [`M${E.l} ${E.b} L${X - bw} ${Y + bh} H${X + bw} L${E.r} ${E.b} Z`, "#2a3642"], [`M${E.l} ${E.t} L${X - bw} ${Y - bh} V${Y + bh} L${E.l} ${E.b} Z`, "#34424f"], [`M${E.r} ${E.t} L${X + bw} ${Y - bh} V${Y + bh} L${E.r} ${E.b} Z`, "#2f3c48"]].forEach(([d, f]) => el("path", {d, fill: f, stroke: INK, "stroke-width": 6, "stroke-linejoin": "round"}, s.w));
  el("rect", {x: X - bw, y: Y - bh, width: 2 * bw, height: 2 * bh, fill: "#52606d", stroke: INK, "stroke-width": 6}, s.w);
  for (let k = 1; k < 7; k++) { const q = Math.pow(1.52, k); el("rect", {x: X - bw * q, y: Y - bh * q, width: 2 * bw * q, height: 2 * bh * q, fill: "none", stroke: INK, "stroke-width": 3 + k * 1.6, opacity: .35}, s.w); }
  el("path", {d: `M${X - 620} ${E.t} L${X - 210} ${Y - bh} H${X + 210} L${X + 620} ${E.t} Z`, fill: "#fff3c4", stroke: INK, "stroke-width": 6}, s.w);                 // the open hatch: daylight
  el("path", {d: `M${X - 420} ${FULL.y} H${X + 420} L${X + 760} ${E.b} H${X - 760} Z`, fill: "#fff3c4", opacity: .13}, s.w);
  s.far = field(s.w, 90, 311, (e, i) => { el("path", {d: c3DENT, fill: C3COL[i % 7], stroke: INK, "stroke-width": 9, "stroke-linejoin": "round"}, e); el("path", {d: "M-40 -90 H40 L50 -70 H-50 Z", fill: "#d5dde2"}, e); });
  s.cans = field(s.w, 40, 97, (e, i) => canLite(e, C3COL[(i * 3) % 7], {dent: true, face: i % 3 === 0}), .1);
  seed = 53; s.near = []; for (let k = 0; k < 9; k++) { const g = el("g", {}, s.w); canLite(g, C3COL[(k * 2 + 1) % 7], {dent: true, face: k % 2 === 0}); s.near.push({e: g, an: k / 9 * 6.2832 + rnd() * .4, r: 520 + rnd() * 240, u: rnd()}); }
  vignette(st, "#cfd8dc", .5); s.blink = fullRect(st, "#111", 0); s.card = c3Big(st, "Into the truck, with hundreds of other cans");
  s.run = t => { const t0 = c3T("povTruck"), u = t - t0, D = c3D("povTruck"), ua = u + .5;
    const bump = Math.sin(ua * 5.3) * .5 + Math.sin(ua * 8.9) * .3;
    tf(s.w, `rotate(${7 * Math.sin(ua * 2.3) + 2 * bump} ${X} ${Y}) translate(${10 * Math.sin(ua * 31)} ${22 * bump})`);
    c3Fly(s.far, .05 * ua + .02 * bump, {spread: 620, fog: .5, k: 1.6, fn: (o, x, y, z, sc) => [x, y + 150 * sc * Math.abs(Math.sin(ua * 4 + o.u * 40)) + 240 * sc, sc * .8, o.u * 360 + ua * 260 * (o.u - .5)]});
    c3Fly(s.cans, .09 * ua + .035 * bump, {spread: 760, fog: .4, fn: (o, x, y, z, sc) => [x + Math.sin(ua * 3.1 + o.u * 50) * 90 * sc, y - Math.abs(Math.sin(ua * 5.2 + o.u * 30)) * 260 * sc + 120 * sc, sc * 1.25, o.u * 360 + ua * 330 * (o.u - .5)]});
    s.near.forEach(m => { const rr = m.r + 70 * Math.sin(ua * 3.4 + m.u * 9), an = m.an + .35 * Math.sin(ua * 1.9 + m.u * 5); tf(m.e, `translate(${X + Math.cos(an) * rr * 1.5} ${Y + Math.sin(an) * rr * .85 - 90 * Math.abs(Math.sin(ua * 5 + m.u * 7))}) scale(${1.9 + m.u}) rotate(${m.u * 360 + ua * 240 * (m.u - .5)})`); });
    op(s.blink, 1 - ramp(u, -.2, .2)); c3Show(s.card, t, t0 + .3, t0 + D - .3); }; return s; })();

// ---- 4. povSort: riding the sorting belt. A big magnet hangs over the belt: steel cans jump up and stick to it; we are aluminium, so we ride on underneath
S.povSort = (() => { const s = scene("povSort", "#22333b", "#22333b"), st = s.stage, X = VP[0], HY = 400, F = 430, V = 2.1, D0 = 9, MB = -.95, MW = 1.75; s.w = el("g", {}, st);
  const P = (x, y, d) => [X + x * F / d, HY + y * F / d];
  el("rect", {x: FULL.x, y: FULL.y, width: FULL.w, height: HY - FULL.y, fill: c3GradL([[0, "#2b4a66"], [1, "#8fb4d4"]])}, s.w); el("rect", {x: FULL.x, y: HY, width: FULL.w, height: FULL.y + FULL.h - HY, fill: c3GradL([[0, "#5b7385"], [1, "#2a3a45"]])}, s.w);
  s.posts = []; for (let k = 0; k < 9; k++) [-1, 1].forEach(sd => { const g = el("g", {}, s.w); el("rect", {x: -18, y: -340, width: 36, height: 480, fill: "#7b8794", stroke: INK, "stroke-width": 5}, g); el("rect", {x: sd > 0 ? -330 : 0, y: -340, width: 330, height: 26, fill: "#7b8794", stroke: INK, "stroke-width": 5}, g);
    el("rect", {x: -18, y: 40, width: 36, height: 50, fill: "#ffbe0b", stroke: INK, "stroke-width": 4}, g); s.posts.push({e: g, sd, k}); });
  s.lights = []; for (let k = 0; k < 9; k++) { const g = el("g", {}, s.w); c3Glow(g, "#fff3c4", 120, .7, .2); el("rect", {x: -60, y: -12, width: 120, height: 24, rx: 8, fill: "#fff8d6", stroke: INK, "stroke-width": 4}, g); s.lights.push({e: g, k}); }
  // the belt (it stands still for us: we ride on it)
  const bl = P(-1.55, 1, .23), br = P(1.55, 1, .23), fl = P(-1.55, 1, 60), fr = P(1.55, 1, 60);
  el("path", {d: `M${bl} L${fl} L${fr} L${br} Z`, fill: c3GradL([[0, "#5c6770"], [1, "#2b3035"]]), stroke: INK, "stroke-width": 6}, s.w);
  [.45, .62, .85, 1.15, 1.55, 2.1, 2.8, 3.8, 5.2, 7.2, 10].forEach(d => { const a = P(-1.55, 1, d), b = P(1.55, 1, d); el("line", {x1: a[0], y1: a[1], x2: b[0], y2: b[1], stroke: "#1f2327", "stroke-width": Math.max(1.5, 14 / d), opacity: .7}, s.w); });
  [-1, 1].forEach(sd => { const a = P(sd * 1.55, 1, .23), b = P(sd * 1.55, 1, 60), c2 = P(sd * 1.8, .8, 60), d2 = P(sd * 1.8, .8, .23); el("path", {d: `M${a} L${b} L${c2} L${d2} Z`, fill: "#ffbe0b", stroke: INK, "stroke-width": 6, "stroke-linejoin": "round"}, s.w); });
  s.G = el("g", {}, s.w);
  const AL = [[-.85, .95, 1], [.95, 1.6, 4], [-.2, 2.4, 2], [.75, 3.3, 3], [-1.05, 4.3, 0], [.3, 5.4, 6]], ST = [[.62, 1.25], [-.95, 2.0], [.15, 2.9], [-.55, 3.8], [1.0, 4.9]];
  s.items = AL.map(([x, d, ci], i) => { const e = el("g", {}, s.G); canLite(e, C3COL[ci], {face: i < 3}); return {e, x, d, al: 1}; })
    .concat(ST.map(([x, d], i) => { const e = el("g", {}, s.G); tinG(e, {face: i < 3}); const tg = .4 + (D0 - d - .05) / V; e.star = el("g", {}, e); for (let k = 0; k < 8; k++) el("line", {x1: Math.cos(k * .785) * 70, y1: -70 + Math.sin(k * .785) * 34, x2: Math.cos(k * .785) * 120, y2: -70 + Math.sin(k * .785) * 60, stroke: "#ffe14d", "stroke-width": 12, "stroke-linecap": "round"}, e.star); return {e, x, d, tg}; }));
  s.under = el("path", {fill: "#7a1420", stroke: INK, "stroke-width": 6, "stroke-linejoin": "round"}, s.G);
  s.mag = el("g", {}, s.G); const mw = MW * 100;
  [-.7, .7].forEach(k => el("rect", {x: mw * k - 9, y: -1400, width: 18, height: 1180, fill: "#343a40", stroke: INK, "stroke-width": 4}, s.mag));
  el("rect", {x: -mw, y: -235, width: 2 * mw, height: 140, rx: 10, fill: "#e63946", stroke: INK, "stroke-width": 6}, s.mag); el("rect", {x: -mw, y: -128, width: 2 * mw, height: 33, fill: "#ced4da", stroke: INK, "stroke-width": 6}, s.mag);
  tx(s.mag, {x: 0, y: -150, "text-anchor": "middle", "font-size": 62, "font-weight": 700, fill: "#fff", "letter-spacing": 6}, "MAGNET");
  s.shade = fullRect(s.w, "#0b0f14", 0);
  s.lt = c3Lab(s.w, "steel can", 42); s.la = c3Lab(s.w, "aluminium can", 42, "#ffe14d");
  s.str = c3Streaks(s.w, 14, 21, "#dbe7f0", 5);
  vignette(st, "#cfd8dc", .5); s.blink = fullRect(st, "#111", 0); s.card = chip(st, "A magnet grabs steel. You're aluminium, so you ride on!", INK, {fs: 46});
  s.run = t => { const t0 = c3T("povSort"), u = t - t0, D = c3D("povSort"), dm = D0 - V * (u - .4), dmc = Math.max(.16, dm), trav = V * (u + 1);
    s.posts.forEach(p => { const d = ((p.k * 3.2 - trav) % 28.8 + 28.8) % 28.8 + .25, q = P(p.sd * 3.3, 0, d); tf(p.e, `translate(${q[0]} ${q[1]}) scale(${F / d / 100})`); op(p.e, clamp((26 - d) / 8) * clamp((d - .25) / .2)); });
    s.lights.forEach(p => { const d = ((p.k * 3.2 + 1.6 - trav) % 28.8 + 28.8) % 28.8 + .25, q = P(0, -3.1, d); tf(p.e, `translate(${q[0]} ${q[1]}) scale(${F / d / 100})`); op(p.e, clamp((26 - d) / 8)); });
    const list = [];
    s.items.forEach(o => { let d = o.d, y, sc, rot = 0; if (o.al) { y = .37; sc = 1.26 / 190; } else { const k = clamp((u - o.tg) / .16); d = u < o.tg ? o.d : Math.max(.12, dm + .05); y = lerp(.5, MB + .52, k * k); sc = 1.04 / 146; rot = k < 1 ? 14 * Math.sin(k * 3.14) : 0; op(o.e.star, on(u, o.tg + .13, o.tg + .4, .06)); }
      const q = P(o.x, y, d); tf(o.e, `translate(${q[0]} ${q[1]}) scale(${F / d * sc}) rotate(${rot})`); op(o.e, clamp((d - .12) / .1) * clamp((9.5 - d) / 2)); o.q = q; o.dd = d; list.push([d, o.e]); });
    const a = P(-MW, MB, dmc), b = P(MW, MB, dmc), c2 = P(MW, MB, dmc + 1.3), d2 = P(-MW, MB, dmc + 1.3); set(s.under, "d", `M${a} L${b} L${c2} L${d2} Z`); op(s.under, dm > -1.2 ? 1 : 0); list.push([dmc + 1.3, s.under]);
    const mq = P(0, 0, dmc); tf(s.mag, `translate(${mq[0]} ${mq[1]}) scale(${F / dmc / 100})`); op(s.mag, clamp((dm - .1) / .25) * clamp((12 - dm) / 3)); list.push([dmc - .01, s.mag]);
    list.sort((p, q) => q[0] - p[0]).forEach(([d, e]) => s.G.appendChild(e));
    op(s.shade, .45 * on(u, .4 + (D0 - 1.2) / V, .4 + (D0 + 1.1) / V, .3));
    const tn = s.items[6], an = s.items[0]; tf(s.lt, `translate(${tn.q[0]} ${tn.q[1] - F / tn.dd * .62 - 14})`); op(s.lt, on(u, .7, 4.0, .2)); tf(s.la, `translate(${an.q[0] - 40} ${an.q[1] - F / an.dd * .72 - 10})`); op(s.la, on(u, .7, 5.7, .2));
    c3RunStreaks(s.str, .5 * u, {r0: 520, r1: 700, a: .22, len: .12, y: -70});
    op(s.blink, 1 - ramp(u, -.2, .2)); showCard(s.card, t, t0 + 1.0, t0 + D - .15, 890); }; return s; })();

// ---- 5. povBale: the baler. Cans pile in all round us, the press closes... THUD. Outside: a giant block of squashed cans, and one tiny bit of it is us
S.povBale = (() => { const s = scene("povBale", "#1b263b", "#1b263b"), st = s.stage, X = VP[0], Y = VP[1], TH = 2.05; s.w = el("g", {}, st);
  c3Full(s.w, c3GradR([[0, "#52606d"], [.6, "#2a3642"], [1, "#11181f"]]));
  seed = 77; s.cans = []; for (let i = 0; i < 64; i++) { const g = el("g", {}, s.w), an = rnd() * 6.2832, r = 230 + Math.pow(rnd(), .7) * 900; canLite(g, C3COL[i % 7], {dent: true, face: i % 5 === 0}); s.cans.push({e: g, an, r, u: rnd(), sc: 1.1 + rnd() * 1.3}); }
  s.cans.sort((a, b) => b.r - a.r).forEach(o => s.w.appendChild(o.e));
  const pl = (d, vert) => { const g = el("g", {}, s.w); el("rect", {x: vert ? -1400 : (d < 0 ? -2000 : 0), y: vert ? (d < 0 ? -2000 : 0) : -1400, width: vert ? 2800 : 2000, height: vert ? 2000 : 2800, fill: c3GradL([[0, "#8d99ae"], [1, "#5c677d"]]), stroke: INK, "stroke-width": 10}, g);
    for (let k = -6; k <= 6; k++) el("circle", {cx: vert ? k * 200 : d * 70, cy: vert ? d * 70 : k * 200, r: 20, fill: "#343a40", stroke: INK, "stroke-width": 5}, g); return g; };
  s.pl = pl(-1, 0); s.pr = pl(1, 0); s.ptp = pl(-1, 1);
  s.dark = c3Full(s.w, "#0b0f14", 0);
  // outside: the bale
  s.out = el("g", {}, st); c3Full(s.out, c3GradL([[0, "#dbe7f0"], [.62, "#c2d3df"], [.62, "#8d99ae"], [1, "#6c7887"]]));
  const bale = (x, y, k, sd) => { const g = el("g", {transform: `translate(${x} ${y}) scale(${k})`}, s.out), W = 520, H = 400, SX = 130, SY = -84; seed = sd; el("ellipse", {cx: 60, cy: 14, rx: 420, ry: 36, fill: INK, opacity: .25}, g);
    const cell = (x0, y0, w, h, skx, sky, shade) => { const col = rnd() < .3 ? "#cfd8dc" : C3COL[Math.floor(rnd() * 7)]; el("path", {d: `M${x0} ${y0} l${w} ${sky * w} l${skx * h} ${h} l${-w} ${-sky * w} Z`, fill: col, stroke: INK, "stroke-width": 3}, g); if (shade) el("path", {d: `M${x0} ${y0} l${w} ${sky * w} l${skx * h} ${h} l${-w} ${-sky * w} Z`, fill: INK, opacity: shade}, g); };
    for (let r = 0; r < 10; r++) { let x0 = -W / 2; while (x0 < W / 2 - 1) { const w = Math.min(W / 2 - x0, 34 + rnd() * 44); cell(x0, -H + r * 40, w, 40, 0, 0, 0); x0 += w; } }      // front
    for (let r = 0; r < 10; r++) for (let q = 0; q < 3; q++) cell(W / 2 + q * SX / 3, -H + r * 40 + q * SY / 3, SX / 3, 40, 0, SY / SX, .3);                           // side
    for (let q = 0; q < 3; q++) { let x0 = -W / 2; while (x0 < W / 2 - 1) { const w = Math.min(W / 2 - x0, 40 + rnd() * 50); el("path", {d: `M${x0 + q * SX / 3} ${-H + q * SY / 3} h${w} l${SX / 3} ${SY / 3} h${-w} Z`, fill: rnd() < .3 ? "#e3e9ed" : C3COL[Math.floor(rnd() * 7)], stroke: INK, "stroke-width": 3}, g); el("path", {d: `M${x0 + q * SX / 3} ${-H + q * SY / 3} h${w} l${SX / 3} ${SY / 3} h${-w} Z`, fill: "#fff", opacity: .25}, g); x0 += w; } }   // top
    el("path", {d: `M${-W / 2} ${-H} H${W / 2} V0 H${-W / 2} Z M${W / 2} ${-H} l${SX} ${SY} V${SY} L${W / 2} 0 M${-W / 2} ${-H} l${SX} ${SY} H${W / 2 + SX}`, fill: "none", stroke: INK, "stroke-width": 8, "stroke-linejoin": "round"}, g);
    [-130, 130].forEach(xx => el("path", {d: `M${xx + SX} ${-H + SY} L${xx} ${-H} V0`, fill: "none", stroke: "#1b1b3a", "stroke-width": 12, "stroke-linejoin": "round"}, g)); return g; };
  bale(250, 640, .45, 5); bale(1420, 660, .5, 9); s.bl = bale(0, 0, 1, 3);
  s.hl = el("g", {transform: "translate(-45 -180)"}, s.bl); el("rect", {x: -28, y: -20, width: 56, height: 40, fill: "#e63946", stroke: "#ffe14d", "stroke-width": 8}, s.hl); s.you = youTag(s.bl);
  vignette(st, "#cfd8dc", .45); s.blink = fullRect(st, "#111", 0); s.card = c3Big(st, "Squashed into a giant block");
  s.run = t => { const t0 = c3T("povBale"), u = t - t0, D = c3D("povBale"), k = Math.pow(clamp((u - .35) / (TH - .35)), 1.6), sh = c3Shake(u, TH, 30, .45);
    s.cans.forEach(o => { const rr = o.r * (1 - .7 * k) + 40, an = o.an + .08 * Math.sin(u * 7 + o.u * 30) * (1 - k); tf(o.e, `translate(${X + Math.cos(an) * rr * 1.45} ${Y + Math.sin(an) * rr * .85}) rotate(${o.u * 360 + k * 40 * (o.u - .5)}) scale(${o.sc} ${o.sc * (1 - .55 * k)})`); });
    tf(s.pl, `translate(${lerp(FULL.x - 40, X - 330, k)} ${Y})`); tf(s.pr, `translate(${lerp(FULL.x + FULL.w + 40, X + 330, k)} ${Y})`); tf(s.ptp, `translate(${X} ${lerp(FULL.y - 40, Y - 190, k)})`);
    op(s.dark, .8 * ramp(u, TH - .5, TH)); tf(s.w, `translate(${sh[0]} ${sh[1]})`);
    const o2 = ramp(u, TH + .1, TH + .35); op(s.out, o2); tf(s.bl, `translate(${X - 40} ${Y + 300 - 500 * (1 - ease(clamp((u - TH - .05) / .3)))}) scale(${1.05})`);
    tf(s.you, `translate(-45 -196) scale(${Math.max(0, pop(u, TH + .8))})`); op(s.you, ramp(u, TH + .75, TH + .9)); op(s.hl, ramp(u, TH + .7, TH + .9) * (.6 + .4 * Math.sin(u * 10)));
    op(s.blink, 1 - ramp(u, -.2, .2)); c3Show(s.card, t, t0 + .4, t0 + D - .2); }; return s; })();

// ---- 6. povMelt: into the furnace. The glowing mouth looms up and swallows us; the cans around us soften, drip and melt into bright liquid metal
S.povMelt = (() => { const s = scene("povMelt", "#1a0f0a", "#1a0f0a"), st = s.stage, X = VP[0], Y = VP[1], TIN = 1.75; s.w = el("g", {}, st);
  c3Full(s.w, c3GradR([[0, "#5a2a12"], [.5, "#2b1509"], [1, "#0f0705"]]));
  s.mouth = el("g", {}, s.w); const ARC = r => `M${-r} 300 V-40 A${r} ${r} 0 0 1 ${r} -40 V300 Z`;
  c3Glow(s.mouth, "#ff9e00", 720, .55, .3); el("path", {d: ARC(372), fill: "#6b2d1a", stroke: INK, "stroke-width": 10, "stroke-linejoin": "round"}, s.mouth);
  for (let k = 0; k < 11; k++) { const a = Math.PI + k / 10 * Math.PI; el("line", {x1: Math.cos(a) * 300, y1: -40 + Math.sin(a) * 300, x2: Math.cos(a) * 372, y2: -40 + Math.sin(a) * 372, stroke: INK, "stroke-width": 6}, s.mouth); } [70, 180].forEach(y => [-1, 1].forEach(d => el("line", {x1: d * 300, y1: y, x2: d * 372, y2: y, stroke: INK, "stroke-width": 6}, s.mouth)));
  el("path", {d: ARC(300), fill: c3GradR([[0, "#fffbe0"], [.35, "#ffd166"], [.75, "#ff8800"], [1, "#d9480f"]], {cy: .7, r: .75}), stroke: INK, "stroke-width": 10, "stroke-linejoin": "round"}, s.mouth);
  s.fl = [-200, -100, 0, 110, 205].map((x, i) => { const g = el("g", {transform: `translate(${x} 300)`}, s.mouth); g.p = el("path", {d: "M-60 0 Q-70 -90 -20 -150 Q-24 -100 6 -120 Q0 -200 40 -250 Q36 -160 66 -110 Q84 -60 60 0 Z", fill: i % 2 ? "#ffe14d" : "#ff9e00", stroke: "#e85d04", "stroke-width": 5, opacity: .9}, g); return g; });
  s.str = c3Streaks(s.w, 22, 5, "#ffd166", 6);
  s.in = el("g", {}, s.w); c3Full(s.in, c3GradR([[0, "#fff3b0"], [.45, "#ffb703"], [1, "#c2410c"]]));
  s.ch = field(s.in, 22, 131, (e, i) => { e.c = el("g", {}, e); [[-58, 10, -14], [0, -14, 6], [56, 16, 22]].forEach(([x, y, r], k) => tf(canLite(e.c, C3COL[(i + k * 2) % 7], {dent: true, face: k === 1 && i % 2 === 0}), `translate(${x} ${y}) rotate(${r}) scale(.9 .6)`));
    e.b = el("g", {}, e); const bb = blob(e.b, 120, "#ffd166", 300 + i); set(bb, "stroke", "#f77f00"); set(bb, "stroke-width", 8); el("ellipse", {cx: -30, cy: -34, rx: 40, ry: 16, fill: "#fff8d6", opacity: .9}, e.b);
    e.d = el("path", {d: "M-18 60 Q-22 150 0 190 Q22 150 18 60 Z", fill: "#ffd166", stroke: "#f77f00", "stroke-width": 6}, e); }, .2);
  s.pool = el("path", {fill: c3GradL([[0, "#fff8d6"], [.12, "#ffe066"], [.5, "#ffa200"], [1, "#e85d04"]]), stroke: "#fff", "stroke-width": 10, "stroke-linejoin": "round"}, s.in);
  seed = 61; s.sheen = []; for (let i = 0; i < 9; i++) s.sheen.push({e: el("ellipse", {rx: 60 + rnd() * 120, ry: 10 + rnd() * 10, fill: "#fffbe6", opacity: .7}, s.in), x: rnd(), y: rnd(), u: rnd()});
  s.bub = []; for (let i = 0; i < 10; i++) s.bub.push({e: el("circle", {r: 14 + rnd() * 22, fill: "none", stroke: "#fff8d6", "stroke-width": 6}, s.in), x: rnd(), u: rnd()});
  s.vg = vignette(st, "#cfd8dc", .5); s.vh = vignette(st, "#ff6b00", .6); s.blink = fullRect(st, "#111", 0); s.card = c3Big(st, "Melted into liquid metal", "#c2410c"); s.c0 = c3Big(st, "Into the furnace…");
  s.run = t => { const t0 = c3T("povMelt"), u = t - t0, D = c3D("povMelt"), g = clamp((u + .3) / (TIN + .3)), sc = .2 * Math.exp(3.3 * g * g + .25 * g), m = ramp(u, 2.0, 3.9);
    tf(s.mouth, `translate(${X} ${Y - 40 * sc + 30}) scale(${sc})`); s.fl.forEach((f, i) => tf(f.p, `scale(${1 + .12 * Math.sin(u * 11 + i * 2)} ${.75 + .3 * Math.abs(Math.sin(u * 7 + i * 1.7))})`));
    c3RunStreaks(s.str, 1.1 * u, {r0: 200, a: .5 * (1 - ramp(u, TIN - .2, TIN + .3))});
    op(s.in, ramp(u, TIN - .35, TIN + .15));
    c3Fly(s.ch, .05 * u, {spread: 640, rot: 0, fog: .6, k: 1.5, fn: (o, x, y, z, sc2) => { const mm = clamp(m * 1.5 - o.u * .5); op(o.e.c, 1 - ramp(mm, .25, .7)); op(o.e.b, ramp(mm, .1, .6)); tf(o.e.b, `scale(${1 + .15 * mm} ${1 - .5 * mm})`); tf(o.e.d, `translate(0 ${40 * mm}) scale(1 ${.2 + 2.2 * mm})`); op(o.e.d, ramp(mm, .15, .4)); return [x, y - 60 * sc2 + 420 * sc2 * mm * mm, sc2 * 2.4, (o.u - .5) * 30]; }});
    const L = lerp(1140, 150, ease(clamp((u - 2.5) / 2.0))); let d = `M${FULL.x - 20} ${FULL.y + FULL.h + 40} L${FULL.x - 20} ${L}`; for (let x = FULL.x - 20; x <= FULL.x + FULL.w + 60; x += 70) d += ` L${x} ${L + 22 * Math.sin(x * .011 + u * 3.2) + 12 * Math.sin(x * .027 - u * 4.4)}`; set(s.pool, "d", d + ` L${FULL.x + FULL.w + 60} ${FULL.y + FULL.h + 40} Z`);
    s.sheen.forEach(o => { const y = L + 70 + o.y * 760; set(o.e, "cx", FULL.x + ((o.x + u * .05 * (o.u - .5)) % 1 + 1) % 1 * FULL.w); set(o.e, "cy", y); op(o.e, y > L + 40 ? .5 + .3 * Math.sin(u * 3 + o.u * 9) : 0); });
    s.bub.forEach(o => { const k = ((u * .5 + o.u) % 1), y = lerp(1060, L + 20, k); set(o.e, "cx", FULL.x + o.x * FULL.w); set(o.e, "cy", y); op(o.e, u > 2.6 ? Math.sin(k * Math.PI) * .8 : 0); });
    op(s.vg, 1 - ramp(u, TIN - .5, TIN + .4)); op(s.vh, ramp(u, TIN - .5, TIN + .4));
    op(s.blink, 1 - ramp(u, -.2, .2)); c3Show(s.c0, t, t0 + .25, t0 + TIN + .1); c3Show(s.card, t, t0 + 2.5, t0 + D - .15); }; return s; })();

// ---- 7. povRoll: the metal sets, and giant rollers squeeze us thin. Outside: the thin sheet is cut into a disc, and a press pushes the disc into a cup: a brand-new can
S.povRoll = (() => { const s = scene("povRoll", "#1d2d44", "#1d2d44"), st = s.stage, X = VP[0], Y = VP[1], TP = 1.85, SY = 600; s.w = el("g", {}, st);
  c3Full(s.w, c3GradR([[0, "#3d5a80"], [.6, "#1d2d44"], [1, "#0d1520"]]));
  s.slab = el("path", {fill: c3GradL([[0, "#eef2f4"], [.5, "#ffd6a5"], [1, "#ffb86b"]]), stroke: INK, "stroke-width": 8, "stroke-linejoin": "round"}, s.w);
  s.slabL = [0, 1, 2, 3, 4, 5].map(() => el("line", {stroke: "#fff", "stroke-width": 8, "stroke-linecap": "round", opacity: .7}, s.w));
  s.ro = el("g", {}, s.w);
  s.rl = [-1, 1].map(d => { const g = el("g", {transform: `translate(0 ${d * 172})`}, s.ro); el("rect", {x: -780, y: -44, width: 1560, height: 88, rx: 20, fill: "#495057", stroke: INK, "stroke-width": 8}, g);
    el("rect", {x: -620, y: -150, width: 1240, height: 300, rx: 46, fill: c3GradL([[0, "#56616b"], [.3, "#dfe6ea"], [.55, "#aab4bc"], [1, "#3f484f"]]), stroke: INK, "stroke-width": 10}, g);
    g.ln = [0, 1, 2, 3, 4, 5, 6, 7].map(() => el("line", {x1: -600, x2: 600, stroke: INK, "stroke-width": 6, "stroke-linecap": "round"}, g)); g.d = d; return g; });
  s.str = c3Streaks(s.w, 18, 15, "#eef2f4", 6); s.fl = c3Full(s.w, "#f1f4f6", 0);
  // outside: cut and press
  s.out = el("g", {}, st); s.o2 = s.out; s.out = el("g", {transform: `translate(${X} 430) scale(1.15) translate(-910 -560)`}, s.o2); c3Full(s.out, c3GradL([[0, "#dff3ff"], [.7, "#bcd9ec"], [.7, "#8d99ae"], [1, "#6c7887"]]));
  el("rect", A3({x: FULL.x - 20, y: SY + 12, width: 780, height: 40, fill: "#8d99ae"}), s.out); [0, 300, 600].forEach(x => el("rect", A3({x: FULL.x + 60 + x, y: SY + 52, width: 30, height: 200, fill: "#6c757d"}), s.out));
  s.sheet = el("rect", {x: FULL.x - 20, y: SY, width: 780, height: 12, fill: "#eef2f4", stroke: INK, "stroke-width": 5}, s.out);
  s.hole = el("ellipse", {cx: 430, cy: SY + 6, rx: 66, ry: 7, fill: "#3d4852"}, s.out);
  s.cut = el("g", {}, s.out); el("rect", A3({x: -34, y: -640, width: 68, height: 430, fill: "#6c757d"}), s.cut); el("rect", A3({x: -84, y: -220, width: 168, height: 170, rx: 14, fill: "#f77f00", "stroke-width": 7}), s.cut); el("path", A3({d: "M-70 -50 H70 V0 H52 V-26 H-52 V0 H-70 Z", fill: "#ced4da"}), s.cut);
  // the press and its die (seen cut open)
  const PX = 930; el("rect", A3({x: PX - 190, y: SY + 6, width: 130, height: 200, fill: "#495057", "stroke-width": 7}), s.out); el("rect", A3({x: PX + 60, y: SY + 6, width: 130, height: 200, fill: "#495057", "stroke-width": 7}), s.out); el("rect", {x: PX - 60, y: SY + 6, width: 120, height: 200, fill: "#1b263b", stroke: INK, "stroke-width": 7}, s.out); el("rect", A3({x: PX - 210, y: SY + 200, width: 420, height: 44, fill: "#343a40", "stroke-width": 7}), s.out);
  s.cupO = el("path", {fill: "none", stroke: INK, "stroke-width": 22, "stroke-linejoin": "round", "stroke-linecap": "round"}, s.out); s.cup = el("path", {fill: "none", stroke: "#eef2f4", "stroke-width": 12, "stroke-linejoin": "round", "stroke-linecap": "round"}, s.out);
  s.punch = el("g", {}, s.out); el("rect", A3({x: -44, y: -700, width: 88, height: 700, fill: c3GradL([[0, "#8d99ae"], [.4, "#dfe6ea"], [1, "#6c757d"]], {x2: 1, y2: 0}), "stroke-width": 7}), s.punch); el("rect", A3({x: -90, y: -760, width: 180, height: 120, rx: 14, fill: "#f77f00", "stroke-width": 7}), s.punch);
  s.disc = el("g", {}, s.out); el("ellipse", {rx: 66, ry: 12, fill: "#eef2f4", stroke: INK, "stroke-width": 6}, s.disc); el("ellipse", {cx: -14, cy: -3, rx: 30, ry: 4, fill: "#fff"}, s.disc);
  s.l1 = c3Lab(s.out, "cut", 54); s.l2 = c3Lab(s.out, "pressed", 54);
  s.glow = el("g", {}, s.out); c3Glow(s.glow, "#fff8d6", 380, .95, .25); s.rays = el("g", {}, s.out); for (let k = 0; k < 12; k++) el("line", {x1: Math.cos(k * .5236) * 210, y1: Math.sin(k * .5236) * 240, x2: Math.cos(k * .5236) * 290, y2: Math.sin(k * .5236) * 330, stroke: "#ffe14d", "stroke-width": 16, "stroke-linecap": "round"}, s.rays);
  s.newc = el("g", {}, s.out); canG(s.newc, "#3a86ff", {face: true, mark: true}); s.you = youTag(s.out);
  s.vh = vignette(st, "#ff8c42", .5); s.vg = vignette(st, "#cfd8dc", .45); s.blink = fullRect(st, "#ffb703", 0); s.c0 = c3Big(st, "Cooled, then rolled thin…"); s.card = c3Big(st, "…pressed into a NEW can!", "#1d6fd1");
  s.run = t => { const t0 = c3T("povRoll"), u = t - t0, D = c3D("povRoll"), g = clamp((u + .2) / (TP + .2)), sc = .42 * Math.exp(2.1 * g * g);
    tf(s.ro, `translate(${X} ${Y}) scale(${sc})`); const hw = 560 * sc, gy = 22 * sc;
    set(s.slab, "d", `M${X - 900} ${FULL.y + FULL.h + 40} L${X - hw} ${Y + gy} H${X + hw} L${X + 900} ${FULL.y + FULL.h + 40} Z`);
    s.slabL.forEach((l, i) => { const k = ((i / 6 + u * .9) % 1), kk = k * k, y = lerp(Y + gy, FULL.y + FULL.h + 40, 1 - kk), w = lerp(hw, 900, 1 - kk) * .8; set(l, "x1", X - w); set(l, "x2", X + w); set(l, "y1", y); set(l, "y2", y); op(l, .5 * Math.sin(k * Math.PI)); });
    s.rl.forEach(r => r.ln.forEach((l, i) => { const th = i * .785 - r.d * (u * 2.6 + 2.2 * u * u), y = 150 * Math.sin(th); set(l, "y1", y); set(l, "y2", y); op(l, Math.cos(th) > 0 ? .5 * Math.cos(th) : 0); }));
    c3RunStreaks(s.str, 1.2 * u, {r0: 260, a: .35}); op(s.fl, on(u, TP - .25, TP + .5, .22));
    // outside
    op(s.o2, ramp(u, TP + .05, TP + .3)); const CX = 430, PX = 930, cd = on(u, 2.45, 2.85, .13), cutDone = u > 2.6;
    tf(s.cut, `translate(${CX} ${lerp(SY - 110, SY + 4, cd)})`); op(s.hole, cutDone ? 1 : 0);
    const mv = ease(clamp((u - 2.85) / .45)), pk = ramp(u, 3.4, 3.7), pu = pk - ramp(u, 3.75, 4.0), h = 170 * pk;
    tf(s.disc, `translate(${lerp(CX, PX, mv)} ${lerp(SY + 6, SY + 2, mv) - Math.sin(mv * Math.PI) * 120})`); op(s.disc, cutDone && pk < .04 ? 1 : 0);
    const cp = `M${PX - 52} ${SY + 6} V${SY + 6 + h} H${PX + 52} V${SY + 6}`; set(s.cup, "d", cp); set(s.cupO, "d", cp); op(s.cup, pk >= .04 ? 1 : 0); op(s.cupO, pk >= .04 ? 1 : 0);
    tf(s.punch, `translate(${PX} ${lerp(SY - 150, SY - 4 + 170, pu) })`);
    tf(s.l1, `translate(${CX} ${SY + 130})`); op(s.l1, ramp(u, 2.5, 2.7)); tf(s.l2, `translate(${PX} ${SY + 300})`); op(s.l2, ramp(u, 3.5, 3.7));
    const nk = ease(clamp((u - 4.0) / .45)), nx = lerp(PX, 1390, nk), ny = lerp(SY + 110, 500, nk) - Math.sin(nk * Math.PI) * 60;
    tf(s.newc, `translate(${nx} ${ny}) scale(${lerp(.55, 1.9, nk)})`); op(s.newc, ramp(u, 3.98, 4.08)); tf(s.glow, `translate(1390 500)`); op(s.glow, ramp(u, 4.25, 4.5)); tf(s.rays, `translate(1390 500) scale(${.8 + .2 * Math.max(0, pop(u, 4.35, .4))})`); op(s.rays, ramp(u, 4.3, 4.45));
    tf(s.you, `translate(1390 300) scale(${Math.max(0, pop(u, 4.45))})`); op(s.you, ramp(u, 4.4, 4.55));
    op(s.vh, 1 - ramp(u, .6, 1.6)); op(s.vg, ramp(u, .6, 1.6) * (1 - ramp(u, TP, TP + .3)));
    op(s.blink, .9 * (1 - ramp(u, -.2, .3))); c3Show(s.c0, t, t0 + .25, t0 + TP + .1); c3Show(s.card, t, t0 + 2.6, t0 + D - .3); }; return s; })();

// ---- 8. shelf (outside): a brand-new can on a supermarket shelf... and the same pupil picks us up
S.shelf = (() => { const s = scene("shelf", "#fff8e8", "#fff8e8"), st = s.stage, FLR = 930, MX = 770, MY = 566; s.cam = el("g", {}, st); const c = s.cam;
  el("rect", {x: -1000, y: -800, width: 3800, height: 2800, fill: "#fff3d6"}, c); el("rect", {x: -1000, y: FLR, width: 3800, height: 900, fill: "#e3e7ea"}, c); el("line", {x1: -1000, y1: FLR, x2: 2800, y2: FLR, stroke: INK, "stroke-width": 6}, c);
  for (let k = 0; k < 16; k++) el("line", {x1: -400 + k * 190, y1: FLR, x2: -400 + k * 190 + (k - 6) * 50, y2: 1300, stroke: "#c9d0d5", "stroke-width": 4}, c); el("line", {x1: -1000, y1: 1010, x2: 2800, y2: 1010, stroke: "#c9d0d5", "stroke-width": 4}, c);
  el("rect", A3({x: 300, y: -40, width: 1500, height: FLR + 40, fill: "#f8f9fa", "stroke-width": 7}), c); el("rect", {x: 318, y: -22, width: 1464, height: FLR + 10, fill: "#dfe6ea"}, c);
  el("rect", A3({x: 300, y: -150, width: 1500, height: 116, rx: 16, fill: "#e63946", "stroke-width": 7}), c); tx(c, {x: 1050, y: -66, "text-anchor": "middle", "font-size": 76, "font-weight": 700, fill: "#fff", "letter-spacing": 10}, "DRINKS");
  [300, 630, FLR - 10].forEach((y, r) => { if (r < 2) { el("rect", A3({x: 300, y, width: 1500, height: 30, fill: "#f8f9fa"}), c); el("rect", {x: 306, y: y + 30, width: 1488, height: 26, fill: "#ffe14d", stroke: INK, "stroke-width": 4}, c); el("rect", {x: 318, y: y + 56, width: 1464, height: 30, fill: INK, opacity: .12}, c); } });
  s.row = el("g", {}, c);
  const cols = ["#06d6a0", "#06d6a0", "#ffbe0b", "#ffbe0b", "#3a86ff", "#3a86ff", "#3a86ff", "#f77f00", "#f77f00", "#b5179e", "#b5179e", "#4cc9f0", "#4cc9f0", "#e63946"];
  cols.forEach((col, i) => { tf(canG(s.row, cols[(i + 5) % 14], {mark: true, sw: 8}), `translate(${370 + i * 100} 235) scale(.62)`); if (370 + i * 100 !== MX) tf(canG(s.row, col, {mark: true, sw: 8}), `translate(${370 + i * 100} ${MY}) scale(.62)`); });
  for (let i = 0; i < 12; i++) tf(bottleG(s.row, {col: ["#06d6a0", "#f77f00", "#b5179e"][Math.floor(i / 4)]}), `translate(${380 + i * 118} 818) scale(.82)`);
  s.glow = el("g", {transform: `translate(${MX} ${MY})`}, c); c3Glow(s.glow, "#fff8d6", 190, .95, .25);
  s.kid = c3Kid(c); op(s.kid.can, 0);
  s.me = el("g", {}, c); canG(s.me, "#3a86ff", {face: true, mark: true, sw: 8}); s.sp = [[-70, -70, 50], [72, -30, 40], [-60, 50, 36]].map(([x, y, f]) => { const e = emo(c, 0, 0, f, "✨"); e.ox = x; e.oy = y; return e; });
  s.you = youTag(c); s.card = c3Big(st, "Back on the shelf, as a brand-new can!", "#1d6fd1");
  s.run = t => { const t0 = c3T("shelf"), u = t - t0, D = c3D("shelf"), w = c3Walk(u, .7, 1.9, 4), reach = ramp(u, 1.85, 2.35), take = ramp(u, 2.5, 3.15);
    const q = {x: lerp(120, 628, w.k), y: FLR + 55, sc: .97, sw: w.sw, bob: w.bob - 14 * on(u, 3.2, 3.6, .15), arm: lerp(lerp(0, -146, reach), -68, take), head: lerp(-12 * reach, 8, take), smile: u > 2.45, lean: 3 * reach * (1 - take)};
    if (reach <= 0) delete q.arm; c3Pose(s.kid, q); const h = c3Hand(q, 150), held = u > 2.45, cx = held ? h[0] + 16 : MX, cy = held ? h[1] - 6 : MY;
    tf(s.me, `translate(${cx} ${cy}) scale(.62) rotate(${held ? 8 * take : 0})`); op(s.glow, 1 - ramp(u, 2.3, 2.6));
    s.sp.forEach((e, i) => { tf(e, `translate(${cx + e.ox} ${cy + e.oy}) scale(${.8 + .3 * Math.sin(u * 6 + i * 2)})`); op(e, 1 - ramp(u, 2.0, 2.4) + ramp(u, 3.3, 3.6)); });
    tf(s.you, `translate(${cx} ${cy - 62}) scale(${.8 * Math.max(0, pop(u, .15))})`); op(s.you, 1 - on(u, 1.9, 3.3, .2));
    const z1 = ramp(u, .6, 1.6), z2 = ramp(u, 3.0, 4.0), z = lerp(lerp(2.5, 1.02, z1), 1.3, z2), fx = lerp(lerp(MX, 830, z1), 690, z2), fy = lerp(lerp(MY - 10, 430, z1), 560, z2);
    tf(c, `translate(${VP[0]} ${VP[1]}) scale(${z}) translate(${-fx} ${-fy})`); c3Show(s.card, t, t0 + 2.9, t0 + D); }; return s; })();
