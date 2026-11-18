/* TheOneApp, Explored EP05: the picture-only shots (no narration: sound effects, a music bed and one-line cards).
   Load after common.js, geo_map.js and ep05/scenes.js (which holds the drawing kit: kid5, school5, hen5, corn5, world5...).
   playground0 (cold open) · povSun · povLeaf · povPhoto · povGrain · shipMap · povHen · canteen · povBody · playground.
   In the hero sequence the camera IS the bit of energy: light from the Sun, then food (sugar, starch, egg), then part of a pupil.
   Every frame depends only on t. Inside a scene, u = seconds after the scene's t0; u runs from about -0.45 (the engine fades a
   scene in before its t0) and the last 0.4 s of a shot are already covered by the next one, so nothing important happens there.
   Rule 9 notes: light passes through the leaf's clear skin; carbon dioxide comes in through tiny pores; water comes from the roots;
   sugar is made in the chloroplasts and stored as starch in the grain; the hen eats grain (feed), not a cob. */
(() => {
const CX = VP[0], CY = VP[1], sg = sg5;
const expo = (a, b, k) => a * Math.pow(b / a, clamp(k));
const edge = (p, col, a = .5, inner = .72) => fullRect(p, grad5("radialGradient", {cx: .5, cy: .5, r: .75}, [[inner, col, 0], [1, col, a]]));
const camTf = (g, z, cx, cy) => tf(g, `translate(${CX} ${CY}) scale(${z}) translate(${-cx} ${-cy})`);
const hexD = r => "M" + [0, 1, 2, 3, 4, 5].map(k => `${(Math.cos(k * Math.PI / 3) * r).toFixed(1)} ${(Math.sin(k * Math.PI / 3) * r).toFixed(1)}`).join(" L") + " Z";
// "this is you": once we are sugar, the rim of our own six-sided shape frames the picture
function hexFrame(p) { const g = el("g", {}, p), d = k => `M${1030 * k} 0 L${515 * k} ${500 * k} L${-515 * k} ${500 * k} L${-1030 * k} 0 L${-515 * k} ${-500 * k} L${515 * k} ${-500 * k} Z`;
  el("path", {d: d(1), fill: "none", stroke: INK, "stroke-width": 92, "stroke-linejoin": "round"}, g); el("path", {d: d(1), fill: "none", stroke: "#ffb703", "stroke-width": 72, "stroke-linejoin": "round"}, g);
  el("path", {d: d(.965), fill: "none", stroke: "#ffe08a", "stroke-width": 10, "stroke-linejoin": "round", opacity: .85}, g); return g; }

/* ---------- the friends at play (used by both playground shots) ---------- */
// yellow: climbs the ladder, slides down, leaps off the end, cheers, walks back. One loop is 5 s; tau is seconds into the loop.
function slideKid(K, tau, firstRun) { const sc = .5, [tx0] = PG5.TOWER, py = PG5.PLAT;
  if (tau < 0) { op(K, 0); return; } op(K, 1);
  if (tau < .8) { const k = tau / .8, c = Math.sin(tau * 16); pose5(K, lerp(tx0 - 60, tx0 - 30, k), lerp(800, py, k), sc, {armN: -150 + 26 * c, armF: -150 - 26 * c, legN: -30 - 24 * c, legF: -30 + 24 * c, lean: 8, shadow: 0}); return; }
  if (tau < 1.1) { const k = (tau - .8) / .3; pose5(K, lerp(tx0 - 30, PG5.CHUTE[0][0] - 20, k), py, sc, run5(tau * 14, 30, {shadow: 0})); return; }
  if (tau < 1.9) { const k = ease((tau - 1.1) / .8) * .5 + (tau - 1.1) / .8 * .5, [x, y, an] = chute5(k); pose5(K, x - 10, y + 4 + 120 * sc, sc, {lean: an - 22, legN: -78, legF: -70, armN: -118, armF: -205, laugh: 1, shadow: 0}); return; }
  if (tau < 2.5) { const k = (tau - 1.9) / .6, [x0, y0] = chute5(1); pose5(K, lerp(x0, 1650, k), 800, sc, {bob: lerp(60, 0, k) - 240 * Math.sin(Math.PI * k), legN: -40 * (1 - k), legF: 34 * (1 - k), armN: -118, armF: -205, lean: 6 * (1 - k), laugh: 1}); return; }
  if (tau < 4.0) { const k = ((tau - 2.5) * 1.5) % 1; pose5(K, 1650, 800, sc, jump5(k, 70)); return; }
  const k = (tau - 4) / 1; pose5(K, lerp(1650, tx0 - 60, k), 800, sc, run5(tau * 13, 38, {flip: true, laugh: 0})); }
function cheerKid(K, x, y, tau, sc = .5, flip) { const k = (tau * 1.4 % 1 + 1) % 1; pose5(K, x, y, sc, jump5(k, 56, {flip})); }

/* =====================================================================================================================
   PLAYGROUND0 (silent cold open, 5 s): the recess bell rings and children burst out into a Singapore school playground.
   Red swings along the monkey bars, yellow climbs the slide and leaps off the end, and our pupil (blue top, the same
   look as EP02's) sprints across the front, jumps and laughs. Sound only. */
S.playground0 = (() => { const s = scene("playground0", "#6ec6ff", "#e3f6ff"); s.cam = el("g", {}, s.stage); s.set = school5(s.cam);
  s.F = friends5(s.cam); s.me = kid5(s.cam);
  s.run = t => { const u = U5("playground0", t), F = s.F, DX = PG5.DOOR[0];
    // the bell
    const rg = on(u, -.2, 1.9, .15); tf(s.set.bell, `translate(5 500) rotate(${rg * 9 * Math.sin(u * 150)})`); tf(s.set.clap, `rotate(${rg * 24 * Math.sin(u * 150 + 1)} 0 20)`);
    op(s.set.ring, rg * (.55 + .45 * Math.sin(u * 40))); tf(s.set.ring, `translate(5 500) scale(${1 + .12 * Math.sin(u * 40)})`);
    // out of the door they come
    const out = (K, a, b, x1, y1, sc1, q) => { const k = sg(u, a, b); op(K, u > a - .05 ? 1 : 0); pose5(K, lerp(DX, x1, k), lerp(652, y1, k), lerp(.34, sc1, k), run5(u * 15 + q, 44, {laugh: 1, shut: false})); };
    // green: straight across and away to the right
    if (u < 4.2) out(F.g, .95, 3.9, 1960, 770, .48, 1);
    // red: to the monkey bars, up, and along them hand over hand
    if (u < 1.75) out(F.r, .5, 1.75, PG5.BAR_X[0] + 20, 800, .5, 2);
    else if (u < 2.1) { const k = (u - 1.75) / .35; op(F.r, 1); pose5(F.r, PG5.BAR_X[0] + 20 + 30 * k, 800, .5, {bob: -(800 - (PG5.BAR + 8 + 215)) * 2 * ease(k) , armN: -170, armF: -180, legN: -20 * (1 - k), legF: 18 * (1 - k), shadow: .2 * (1 - k), laugh: 1, shut: false}); }
    else { op(F.r, 1); hang5(F.r, lerp(PG5.BAR_X[0] + 50, PG5.BAR_X[1] - 40, sg(u, 2.1, 5.4)), u); }
    // yellow: to the slide
    if (u < 1.55) out(F.y, .3, 1.55, PG5.TOWER[0] - 60, 800, .5, 0); else slideKid(F.y, u - 1.55, true);
    // purple: runs to the bars and cheers
    if (u < 2.5) out(F.v, 1.3, 2.5, 990, 850, .52, 3); else { op(F.v, 1); cheerKid(F.v, 990, 850, u - 2.5, .52, true); }
    // our pupil: across the front, a big jump, a laugh
    const mx = lerp(-330, 640, sg(u, .7, 3.25)) + 90 * sg(u, 3.25, 4.1);
    if (u < 3.25) pose5(s.me, mx, 968, .8, run5(u * 14.5, 46, {laugh: u > 2.2 ? 1 : 0, shut: false}));
    else if (u < 4.1) pose5(s.me, mx, 968, .8, jump5((u - 3.25) / .85, 210));
    else pose5(s.me, mx, 968, .8, {armN: -118 + 8 * Math.sin(u * 9), armF: -205 - 8 * Math.sin(u * 9), laugh: 1, bob: -14 * Math.abs(Math.sin(u * 6)), head: -8});
    const push = ramp(u, 2.6, 4.8); camTf(s.cam, lerp(1, 1.22, push), lerp(CX, 790, push), lerp(CY, 590, push)); }; return s; })();

/* =====================================================================================================================
   POVSUN (3 s): one outside look at the Sun; a bit of light leaves it and comes straight at us; from then on we ARE the light.
   Stars streak past and the Earth grows from a dot (drawn with clouds only: no made-up coastlines). */
S.povSun = (() => { const s = scene("povSun", "#05061a", "#05061a"); fullRect(s.stage, "#05061a");
  seed = 501; s.stars = []; for (let i = 0; i < 110; i++) s.stars.push({e: el("line", {stroke: i % 5 ? "#fff" : "#ffe14d", "stroke-width": 2 + rnd() * 3, "stroke-linecap": "round"}, s.stage), a: rnd() * Math.PI * 2, z0: rnd(), r0: .25 + rnd() * .75});
  s.earth = el("g", {}, s.stage); el("circle", {r: 118, fill: "#4cc9f0", opacity: .35, filter: "url(#blur)"}, s.earth);
  el("circle", {r: 100, fill: grad5("radialGradient", {cx: .38, cy: .34, r: .8}, [[0, "#48cae4"], [.6, "#0077b6"], [1, "#023e8a"]]), stroke: INK, "stroke-width": 3}, s.earth);
  const cc = clip5(c => el("circle", {r: 98}, c)), cl = el("g", {"clip-path": cc, fill: "none", stroke: "#fff", "stroke-linecap": "round", opacity: .92}, s.earth);
  ["M-90 -40 q30 -20 60 -4 t56 -8", "M-40 -8 q26 -16 52 0 q22 12 50 -6", "M-96 28 q34 -14 60 2 t62 -4", "M-30 62 q30 -14 58 0 q16 8 40 0", "M10 -70 q20 -10 44 0"].forEach((d, i) => set(el("path", {d}, cl), "stroke-width", 13 - i * 1.4));
  s.sun = sun5(s.stage, 250); s.sunL = lab5(s.sun, 0, 28, "the Sun", 90);
  s.bolt = el("g", {}, s.stage); el("circle", {r: 100, fill: "#fff3b0", filter: "url(#blur)"}, s.bolt); el("circle", {r: 62, fill: "#fff"}, s.bolt);
  s.flood = fullRect(s.stage, "#fff3b0", 0); s.vg = edge(s.stage, "#ffe14d", .6);
  s.sky = fullRect(s.stage, "#bfe9ff", 0);
  s.title = lab5(s.stage, CX, 70, "You are light energy from the Sun…", 62);
  s.run = t => { const u = U5("povSun", t), D = D5("povSun"), go = ramp(u, .75, 1.1);
    tf(s.sun, `translate(${CX - 150} ${CY + 20}) scale(${lerp(1.1, .94, sg(u, -.5, .9))})`); tf(s.sun.rays, `rotate(${u * 22})`); op(s.sun, 1 - go);
    const b = Math.pow(sg(u, .25, .95), 2.6); tf(s.bolt, `translate(${lerp(CX + 60, CX, b)} ${lerp(CY - 40, CY, b)}) scale(${.15 + 24 * b})`); op(s.bolt, u > .2 ? 1 - go : 0);
    op(s.flood, on(u, .8, 1.45, .3) * .95); op(s.vg, go);
    const off = Math.max(0, u - .9) * .9;
    s.stars.forEach(o => { const z = ((o.z0 - off) % 1 + 1) % 1, r = 1250 * o.r0 * Math.pow(1 - z, 2.4) + 30, L = 1 + .45 * (1 - z) * go, c = Math.cos(o.a), sn = Math.sin(o.a);
      set(o.e, "x1", CX + c * r); set(o.e, "y1", CY + sn * r * .75); set(o.e, "x2", CX + c * r * L); set(o.e, "y2", CY + sn * r * .75 * L); op(o.e, clamp(z / .1) * clamp((1 - z) / .25) * (.35 + .65 * go)); });
    const ek = sg(u, 1.0, D - .32), er = expo(.03, 9, Math.pow(ek, 1.5)); tf(s.earth, `translate(${CX} ${CY}) scale(${er})`); op(s.earth, ramp(u, 1.0, 1.3));
    op(s.sky, ramp(u, D - .7, D - .4));
    op(s.title, on(u, -.1, D - .9, .3)); }; return s; })();

/* =====================================================================================================================
   POVLEAF (5 s): we dive out of the sky at a field of corn; one leaf looms; we pass through its clear skin and fly between
   green cells packed with chloroplasts; one chloroplast looms and swallows the view. */
S.povLeaf = (() => { const s = scene("povLeaf", "#bfe9ff", "#bfe9ff"), HERO = [700, 990, 1.25], TG = [700 + 1.25 * 127, 990 - 1.25 * 274];
  s.cam = el("g", {}, s.stage);
  el("rect", {x: -3000, y: -3000, width: 7600, height: 3620, fill: grad5("linearGradient", {x1: 0, y1: 0, x2: 0, y2: 1}, [[.5, "#6ec6ff"], [1, "#dff6ff"]])}, s.cam);
  el("rect", {x: -3000, y: 600, width: 7600, height: 3000, fill: "#b08968"}, s.cam); el("rect", {x: -3000, y: 590, width: 7600, height: 60, fill: "#74c69d"}, s.cam);
  for (let r = 0; r < 4; r++) { const sc = [.3, .45, .68, 1][r], y = [640, 700, 800, 960][r], n = [16, 11, 8, 5][r]; for (let i = 0; i < n; i++) { const x = CX + (i - (n - 1) / 2) * 400 * sc + (r % 2) * 90 * sc; if (r === 3 && Math.abs(x - HERO[0]) < 240) continue; tf(corn5(s.cam), `translate(${x} ${y}) scale(${sc})`); } }
  tf(corn5(s.cam), `translate(${HERO[0]} ${HERO[1]}) scale(${HERO[2]})`);
  seed = 511; s.clouds = field(s.stage, 12, 511, e => { const c = el("g", {fill: "#fff"}, e); [[0, 0, 150, 70], [110, -40, 130, 80], [240, 0, 150, 66], [120, 30, 200, 60]].forEach(([x, y, a, b]) => el("ellipse", {cx: x - 120, cy: y, rx: a, ry: b}, c)); }, .3);
  // the leaf's surface: green, with the corn leaf's long straight veins
  s.surf = el("g", {}, s.stage); fullRect(s.surf, "#52b788"); s.veins = el("g", {}, s.surf);
  for (let k = -9; k <= 9; k++) el("path", {d: `M-2600 ${k * 150} H2600`, stroke: k === 0 ? "#d8f3dc" : "#40916c", "stroke-width": k === 0 ? 34 : 9, opacity: k === 0 ? .9 : .7}, s.veins);
  // inside the leaf
  s.inG = el("g", {}, s.stage); fullRect(s.inG, grad5("radialGradient", {cx: .5, cy: .5, r: .7}, [[0, "#74c69d"], [1, "#2d6a4f"]]));
  s.cells = field(s.inG, 30, 517, e0 => { const e = el("g", {transform: "scale(2)"}, e0); el("rect", A5({x: -120, y: -230, width: 240, height: 460, rx: 70, fill: "#95d5b2", "stroke-width": 9}), e); el("rect", {x: -98, y: -208, width: 196, height: 416, rx: 56, fill: "#b7e4c7"}, e);
    for (let k = 0; k < 8; k++) { const x = (rnd() - .5) * 130, y = -180 + k * 50 + rnd() * 16, a = rnd() * 60 - 30; el("ellipse", A5({cx: x, cy: y, rx: 40, ry: 21, fill: "#2d6a4f", "stroke-width": 4.5, transform: `rotate(${a} ${x} ${y})`}), e); el("path", {d: `M${x - 20} ${y} h40`, stroke: "#74c69d", "stroke-width": 5, "stroke-linecap": "round", transform: `rotate(${a} ${x} ${y})`}, e); } }, .34);
  // the skin: a layer of flat, clear cells that light passes straight through
  s.skin = el("g", {}, s.stage); seed = 513; for (let r = -4; r <= 4; r++) for (let c = -6; c <= 6; c++) { const w = 300, h = 210, x = c * w + (r % 2 ? w / 2 : 0) + (rnd() - .5) * 30, y = r * h;
    el("rect", {x: x - w / 2 + 8, y: y - h / 2 + 8, width: w - 16, height: h - 16, rx: 50, fill: "#d8f3dc", "fill-opacity": .5, stroke: "#1b4332", "stroke-width": 9}, s.skin); el("path", {d: `M${x - w / 2 + 44} ${y - h / 2 + 40} h70`, stroke: "#fff", "stroke-width": 10, "stroke-linecap": "round", opacity: .7}, s.skin); }
  s.cp = el("g", {}, s.stage); el("ellipse", A5({rx: 100, ry: 56, fill: "#2d6a4f", "stroke-width": 5}), s.cp); [-52, 0, 52].forEach(x => [0, 1, 2].forEach(k => el("rect", {x: x - 20, y: -24 + k * 16, width: 40, height: 11, rx: 5, fill: "#74c69d", stroke: INK, "stroke-width": 2}, s.cp)));
  s.cpL = lab5(s.stage, 0, 0, "a chloroplast", 54);
  s.vg = edge(s.stage, "#ffe14d", .6);
  s.skinL = lab5(s.stage, CX, 76, "Light passes through the leaf's clear skin", 50);
  s.card = card5(s.stage, "Into a leaf! Chloroplasts catch the light", INK, 44);
  s.run = t => { const u = U5("povLeaf", t), D = D5("povLeaf");
    const k = sg(u, -.45, 1.75), z = expo(1, 70, k * k * (3 - 2 * k)), ck = ease(sg(u, -.45, .9)); camTf(s.cam, z, lerp(CX, TG[0], ck), lerp(CY, TG[1], ck));
    flyField(s.clouds, .55 + (u + .45) * .5, 1500); op(s.clouds.G, 1 - ramp(u, .15, .7));
    const sf = ramp(u, 1.3, 1.7); op(s.surf, sf * (1 - ramp(u, 2.5, 2.9))); tf(s.veins, `translate(${CX} ${CY}) rotate(-14) scale(${expo(.5, 3.2, sg(u, 1.3, 2.9))})`);
    op(s.skin, on(u, 1.75, 3.1, .3)); tf(s.skin, `translate(${CX} ${CY}) rotate(-14) scale(${expo(.45, 7, sg(u, 1.75, 3.1))})`);
    op(s.inG, ramp(u, 2.4, 2.8)); flyField(s.cells, .3 + Math.max(0, u - 2.3) * .2, 1000);
    const ck2 = sg(u, 3.55, D - .35); tf(s.cp, `translate(${CX} ${CY + 10}) scale(${expo(.12, 24, ck2 * ck2)})`); op(s.cp, ramp(u, 3.5, 3.8));
    showC5(s.cpL, t, SC.povLeaf.t0 + 3.65, SC.povLeaf.t0 + D - .7, 250);
    op(s.skinL, on(u, 1.7, 3.1, .25));
    showC5(s.card, t, SC.povLeaf.t0 + 1.2, SC.povLeaf.t0 + D + .3, 905); }; return s; })();

/* =====================================================================================================================
   POVPHOTO (6 s): inside a chloroplast. Water arrives (from the roots) and carbon dioxide drifts in (through tiny pores).
   We, the light, hit the green chlorophyll: FLASH. Now we are sugar (our six-sided rim frames the view) and oxygen bubbles away. */
S.povPhoto = (() => { const s = scene("povPhoto", "#2d6a4f", "#1b4332");
  fullRect(s.stage, grad5("radialGradient", {cx: .5, cy: .5, r: .75}, [[0, "#40916c"], [1, "#12372a"]]));
  s.cam = el("g", {}, s.stage);
  const stack = (x, y, sc, n) => { const g = el("g", {transform: `translate(${x} ${y}) scale(${sc})`}, s.cam); for (let k = n - 1; k >= 0; k--) { el("ellipse", A5({cx: 0, cy: k * 34 - n * 17 + 12, rx: 120, ry: 34, fill: "#2d6a4f", "stroke-width": 6}), g); el("ellipse", A5({cx: 0, cy: k * 34 - n * 17, rx: 120, ry: 34, fill: k % 2 ? "#74c69d" : "#95d5b2", "stroke-width": 6}), g); } return g; };
  [[150, 250, .9, 5], [1480, 780, 1, 5], [1500, 250, .7, 4], [130, 730, .75, 4], [520, 150, .55, 3], [1130, 860, .6, 3]].forEach(a => stack(...a));
  s.main = stack(CX, CY + 30, 1.9, 6); s.hot = el("circle", {cx: CX, cy: CY, r: 150, fill: "#fff3b0", filter: "url(#blur)", opacity: 0}, s.cam);
  s.chl = lab5(s.stage, CX, 96, "chlorophyll: the green part that catches light", 46, "#d8f3dc");
  s.drops = [0, 1, 2, 3, 4, 5].map(() => drop5(s.cam, 30)); s.co2 = [0, 1, 2, 3, 4].map(() => gas5(s.cam, "co2", 44));
  s.wl = el("g", {}, s.stage); lab5(s.wl, 330, 880, "water", 70, "#bde0fe"); lab5(s.wl, 330, 942, "(from the roots)", 44);
  s.cl = el("g", {}, s.stage); lab5(s.cl, 1400, 250, "carbon dioxide", 66, "#e9ecef"); lab5(s.cl, 1400, 310, "(in through tiny pores)", 44);
  s.o2 = [0, 1, 2, 3, 4, 5, 6, 7].map(() => gas5(s.stage, "o2", 40));
  s.ol = lab5(s.stage, 1330, 200, "oxygen", 70, "#e0fbfc");
  s.sug = [[CX - 430, 600, 110], [CX + 440, 640, 84], [CX - 250, 250, 66], [CX + 170, 760, 74]].map(([x, y, r]) => { const g = hex5(s.stage, r); g.q = [x, y]; return g; });
  s.sl = lab5(s.stage, CX - 430, 782, "sugar", 70, "#ffd166");
  s.vgY = edge(s.stage, "#ffe14d", .65); s.vgA = edge(s.stage, "#ff9f1c", .5, .8);
  s.frame = hexFrame(s.stage);
  s.flash = fullRect(s.stage, "#fffbe0", 0);
  s.card = card5(s.stage, "Light energy → chemical potential energy. You are FOOD!", "#d00000", 44);
  s.run = t => { const u = U5("povPhoto", t), D = D5("povPhoto"), HIT = 2.75, aft = ramp(u, HIT, HIT + .15);
    camTf(s.cam, lerp(1, 1.42, Math.pow(sg(u, -.45, HIT), 1.6)) - .1 * aft, CX, CY + 10);
    s.drops.forEach((d, i) => { const p = clamp((u + .3 - i * .38) / 1.5), e = ease(p); tf(d, `translate(${lerp(-60 + i * 30, CX - 90 + (i % 3) * 40, e)} ${lerp(1060, CY + 110 - (i % 2) * 50, e) - 90 * Math.sin(Math.PI * p)}) scale(${lerp(2.2, 1, e)})`); op(d, clamp(p / .1) * (1 - aft)); });
    s.co2.forEach((d, i) => { const p = clamp((u + .1 - i * .42) / 1.7), e = ease(p); tf(d, `translate(${lerp(1790 - i * 40, CX + 100 - (i % 3) * 44, e)} ${lerp(-70, CY - 90 + (i % 2) * 60, e) + 60 * Math.sin(Math.PI * p)}) scale(${lerp(2, 1, e)})`); op(d, clamp(p / .1) * (1 - aft)); });
    op(s.wl, on(u, .1, HIT - .1, .25)); op(s.cl, on(u, .5, HIT - .1, .25)); op(s.chl, on(u, 1.2, HIT - .1, .25));
    op(s.hot, ramp(u, 1.5, HIT) * (1 - ramp(u, HIT + .2, HIT + 1.2) * .7));
    op(s.flash, ramp(u, HIT - .12, HIT) * (1 - ramp(u, HIT + .05, HIT + .65)));
    op(s.vgY, 1 - aft); op(s.vgA, aft); op(s.frame, aft); tf(s.frame, `translate(${CX} ${CY}) scale(${lerp(1.6, 1, Math.min(1.06, Math.max(0, pop(u, HIT, .5))))})`);
    s.sug.forEach((g, i) => { const k = Math.max(0, pop(u, HIT + .15 + i * .14, .4)); tf(g, `translate(${g.q[0]} ${g.q[1]}) scale(${k}) rotate(${i * 20})`); op(g, k > 0 ? 1 : 0); });
    op(s.sl, ramp(u, HIT + .3, HIT + .5));
    s.o2.forEach((g, i) => { const p = ((u - HIT - .2) * .42 + i / 8) % 1, live = u > HIT + .2 + (i / 8) * .6 ? 1 : 0; tf(g, `translate(${CX + 60 + 420 * p + 50 * Math.sin(p * 7 + i)} ${CY - 60 - 470 * p}) scale(${.6 + 1.1 * p})`); op(g, live * clamp(p / .08) * clamp((1 - p) / .2)); });
    op(s.ol, ramp(u, HIT + .7, HIT + 1));
    showC5(s.card, t, SC.povPhoto.t0 + HIT + .35, SC.povPhoto.t0 + D + .3, 905); }; return s; })();

/* =====================================================================================================================
   POVGRAIN (4 s): as sugar we are carried down the plant's food tubes, into a corn kernel, where sugar is packed away as
   starch. Then one look from outside: the cob, and our kernel glowing. */
S.povGrain = (() => { const s = scene("povGrain", "#2d6a4f", "#2d6a4f");
  s.bg1 = fullRect(s.stage, grad5("radialGradient", {cx: .5, cy: .5, r: .7}, [[0, "#d8f3dc"], [.5, "#52b788"], [1, "#1b4332"]]));
  s.tun = tunnelG(s.stage, 12, (e, i) => { el("circle", {r: 300, fill: "none", stroke: INK, "stroke-width": 40}, e); el("circle", {r: 300, fill: "none", stroke: i % 2 ? "#95d5b2" : "#74c69d", "stroke-width": 28}, e);
    for (let k = 0; k < 16; k++) el("circle", {cx: Math.cos(k * Math.PI / 8) * 300, cy: Math.sin(k * Math.PI / 8) * 300, r: 6, fill: "#1b4332"}, e); });
  s.hexes = field(s.stage, 16, 541, (e, i) => hex5(e, 60 + (i % 3) * 14), .28);
  // inside the kernel
  s.gold = fullRect(s.stage, grad5("radialGradient", {cx: .5, cy: .5, r: .75}, [[0, "#fff3c4"], [.6, "#ffd23f"], [1, "#e09f00"]]), 0);
  seed = 547; s.gr = []; for (let r = 0; r < 6; r++) for (let c = 0; c < 9; c++) { const x = -150 + 120 + c * 230 + (r % 2 ? 110 : 0) + (rnd() - .5) * 50, y = -40 + r * 200 + (rnd() - .5) * 40, g = el("g", {}, s.stage), rr = 104 + rnd() * 26;
    blob(g, rr, "#fffaf0", 600 + r * 9 + c); el("circle", {r: rr * .55, fill: "none", stroke: "#e9c46a", "stroke-width": 5, opacity: .8}, g); el("circle", {r: rr * .25, fill: "none", stroke: "#e9c46a", "stroke-width": 5, opacity: .8}, g);
    s.gr.push({g, x, y, d: Math.hypot(x - CX, (y - CY) * 1.3)}); }
  s.gr.sort((a, b) => b.d - a.d); s.gr.forEach((o, i) => { o.i = i; s.stage.appendChild(o.g); });
  s.stL = lab5(s.stage, CX - 460, CY - 150, "starch", 60, "#fff");
  s.vg = edge(s.stage, "#ff9f1c", .5, .8); s.frame = hexFrame(s.stage);
  s.cream = fullRect(s.stage, "#ffe680", 0);
  // outside: the cob
  s.out = el("g", {}, s.stage); s.cam = el("g", {}, s.out);
  el("rect", {x: -4000, y: -4000, width: 9600, height: 9000, fill: grad5("linearGradient", {x1: 0, y1: 0, x2: 0, y2: 1}, [[.4, "#8fd694"], [.6, "#40916c"]])}, s.cam);
  el("path", A5({d: `M${CX - 330} 1500 V200 Q${CX - 330} -180 ${CX} -220 Q${CX + 330} -180 ${CX + 330} 200 V1500 Z`, fill: "#e09f00", "stroke-width": 9}), s.cam);
  for (let r = -2; r < 13; r++) for (let c = 0; c < 6; c++) { const x = CX - 275 + c * 110 + (r % 2 ? 0 : 0), y = -90 + r * 104 + (c % 2) * 30, me = r === 5 && c === 3; if (me) { s.myK = [x, y]; s.glow = el("circle", {cx: x, cy: y, r: 110, fill: "#fff", filter: "url(#blur)", opacity: .9}, s.cam); }
    el("rect", A5({x: x - 50, y: y - 48, width: 100, height: 96, rx: 34, fill: me ? "#ffe680" : (r + c) % 3 ? "#ffd23f" : "#ffc300", "stroke-width": 6}), s.cam); el("path", {d: `M${x - 26} ${y - 24} q10 -12 26 -12`, fill: "none", stroke: "#fff", "stroke-width": 7, "stroke-linecap": "round", opacity: .7}, s.cam); }
  el("path", A5({d: `M${CX - 300} 1500 Q${CX - 560} 700 ${CX - 400} -120 Q${CX - 760} 500 ${CX - 700} 1500 Z`, fill: "#74c69d", "stroke-width": 9}), s.cam);
  el("path", A5({d: `M${CX + 300} 1500 Q${CX + 560} 700 ${CX + 420} -80 Q${CX + 780} 500 ${CX + 720} 1500 Z`, fill: "#52b788", "stroke-width": 9}), s.cam);
  s.you = el("g", {}, s.out); el("path", {d: "M-190 -30 H-52 V-52 L0 0 L-52 52 V30 H-190 Z", fill: "#ffe14d", stroke: INK, "stroke-width": 6, "stroke-linejoin": "round"}, s.you); tx(s.you, {x: -122, y: 15, "text-anchor": "middle", "font-size": 44, "font-weight": 700, fill: INK}, "YOU");
  s.card = card5(s.stage, "Stored in a grain of corn", "#b5651d", 46);
  s.run = t => { const u = U5("povGrain", t), D = D5("povGrain"), IN = 1.55, OUT = 3.1;
    runTunnel(s.tun, (u + .5) * .95, 400); op(s.tun.G, 1 - ramp(u, IN - .25, IN + .1));
    flyField(s.hexes, .2 + (u + .5) * .16, 900); op(s.hexes.G, 1 - ramp(u, IN + .1, IN + .5));
    op(s.gold, ramp(u, IN - .25, IN + .05));
    s.gr.forEach(o => { const k = Math.max(0, pop(u, IN + .15 + o.i * .017, .32)); tf(o.g, `translate(${o.x} ${o.y}) scale(${k})`); op(o.g, k > 0 ? 1 : 0); });
    op(s.stL, on(u, IN + .4, OUT - .1, .2));
    op(s.frame, 1 - ramp(u, IN + .7, IN + 1.1)); tf(s.frame, `translate(${CX} ${CY}) scale(${lerp(1, .2, ease(sg(u, IN + .5, IN + 1.1)))})`); op(s.vg, 1 - ramp(u, OUT - .2, OUT));
    op(s.cream, on(u, OUT - .25, OUT + .35, .22));
    op(s.out, ramp(u, OUT - .05, OUT + .1)); const z = expo(13, 1, ease(sg(u, OUT, OUT + .75))); camTf(s.cam, z, lerp(s.myK[0], CX, ease(sg(u, OUT + .2, OUT + .75))), lerp(s.myK[1], CY, ease(sg(u, OUT + .2, OUT + .75))));
    op(s.glow, .55 + .35 * Math.sin(u * 9));
    tf(s.you, `translate(${s.myK[0] - 66} ${s.myK[1]}) scale(${Math.max(0, pop(u, OUT + .8, .35))})`);
    showC5(s.card, t, SC.povGrain.t0 + IN + .35, SC.povGrain.t0 + D + .3, 905); }; return s; })();

/* =====================================================================================================================
   SHIPMAP (outside shot, the real world map, 4.5 s): a grain ship sails from Brazil, round the southern tip of Africa and
   across the Indian Ocean, to Singapore. Rule 10: the route starts and ends somewhere named. */
S.shipMap = (() => { const s = scene("shipMap", "#48cae4", "#48cae4"); s.cam = el("g", {}, s.stage); world5(s.cam);
  const P = WORLD5.ship, L = P.slice(1).map((p, i) => Math.hypot(p[0] - P[i][0], p[1] - P[i][1])), TOT = L.reduce((a, b) => a + b, 0);
  const at = q => { let d = clamp(q) * TOT; for (let i = 0; i < L.length; i++) { if (d <= L[i]) { const k = d / L[i]; return [lerp(P[i][0], P[i + 1][0], k), lerp(P[i][1], P[i + 1][1], k), i]; } d -= L[i]; } return [P[P.length - 1][0], P[P.length - 1][1], L.length - 1]; };
  WORLD5.names.filter(q => q[0] !== "South America").forEach(([n, [x, y]]) => { const sea = /Ocean/.test(n); tx(s.cam, {x, y, "text-anchor": "middle", "font-size": sea ? 34 : 36, "font-weight": 700, fill: sea ? "#fff" : INK, opacity: sea ? .8 : .6, "letter-spacing": sea ? 3 : 0}, n); });
  const d0 = "M" + P.map(q => q.join(" ")).join(" L");
  el("path", {d: d0, fill: "none", stroke: INK, "stroke-width": 9, "stroke-linecap": "round", "stroke-linejoin": "round", opacity: .5}, s.cam);
  el("path", {d: d0, fill: "none", stroke: "#fff", "stroke-width": 4.5, "stroke-dasharray": "3 12", "stroke-linecap": "round", "stroke-linejoin": "round"}, s.cam);
  s.doneK = el("path", {fill: "none", stroke: INK, "stroke-width": 13, "stroke-linecap": "round", "stroke-linejoin": "round"}, s.cam);
  s.done = el("path", {fill: "none", stroke: "#ffe14d", "stroke-width": 7, "stroke-linecap": "round", "stroke-linejoin": "round"}, s.cam);
  s.br = el("g", {transform: `translate(${P[0][0]} ${P[0][1]})`}, s.cam); el("circle", {r: 30, fill: "#fff", stroke: INK, "stroke-width": 6}, s.br); emo(s.br, 0, 1, 34, "🌽"); lab5(s.br, -20, -48, "Brazil", 50);
  s.sg = el("g", {transform: `translate(${WORLD5.sg[0]} ${WORLD5.sg[1]})`}, s.cam); s.ring = el("circle", {r: 16, fill: "none", stroke: "#e63946", "stroke-width": 6}, s.sg);
  el("circle", {r: 15, fill: "#e63946", stroke: "#fff", "stroke-width": 5}, s.sg); lab5(s.sg, 24, -22, "Singapore", 50, "#fff", "start");
  s.ship = ship5(s.cam); s.wake = el("g", {}, s.ship);
  s.card = card5(s.stage, "Hens' feed comes to Singapore by ship", INK, 46);
  s.run = t => { const u = U5("shipMap", t), D = D5("shipMap"), q = ease(sg(u, .25, D - .95)), [x, y, i] = at(q);
    const d = "M" + P.slice(0, i + 1).map(p => p.join(" ")).join(" L") + ` L${x} ${y}`; set(s.done, "d", d); set(s.doneK, "d", d);
    const k = ease(sg(u, .2, D - .8)), z = lerp(1, 1.5, k); camTf(s.cam, z, lerp(CX, 1060, k), lerp(CY, 610, k));
    tf(s.ship, `translate(${x} ${y - 4}) scale(${1 / Math.sqrt(z)}) rotate(${2.5 * Math.sin(u * 5)})`);
    const ar = sg(u, D - 1.0, D - .3); set(s.ring, "r", 16 + 70 * ar); op(s.ring, ar > 0 ? 1 - ar : 0);
    showC5(s.card, t, SC.shipMap.t0 + .2, SC.shipMap.t0 + D + .3, 905); }; return s; })();

/* =====================================================================================================================
   POVHEN (5 s): we are one grain in a feed trough. A hen's head looms, tilts, and her beak comes down: gulp. Dark; then a
   yolk-yellow glow and a shell close around us. Outside: our egg rolls onto the tray of an egg farm. */
S.povHen = (() => { const s = scene("povHen", "#ffe8c2", "#ffe8c2");
  s.A = el("g", {}, s.stage); fullRect(s.A, grad5("linearGradient", {x1: 0, y1: 0, x2: 0, y2: 1}, [[0, "#fff3d6"], [1, "#f6c98a"]]));
  for (let k = 0; k < 9; k++) el("rect", {x: -150 + k * 230, y: -60, width: 20, height: 700, fill: "#d4a373", opacity: .5}, s.A);
  el("rect", A5({x: -200, y: 250, width: 2100, height: 26, fill: "#adb5bd", "stroke-width": 5}), s.A);
  // the hen (front view): a big brown body, a head with a comb, two round eyes and a beak that opens
  s.bodyG = el("g", {}, s.A); el("ellipse", A5({cx: 0, cy: 0, rx: 470, ry: 430, fill: "#c8763a", "stroke-width": 9}), s.bodyG);
  [-1, 1].forEach(d => el("path", A5({d: `M${d * 300} -250 Q${d * 560} -120 ${d * 520} 200 Q${d * 380} 120 ${d * 300} -250 Z`, fill: "#a85d2a", "stroke-width": 9}), s.bodyG));
  for (let r = 0; r < 3; r++) for (let k = 0; k < 5 - r; k++) el("path", {d: `M${-170 + k * 76 + r * 38} ${-60 + r * 80} q38 50 76 0`, fill: "none", stroke: "#a85d2a", "stroke-width": 9, "stroke-linecap": "round"}, s.bodyG);
  s.feedSlot = el("g", {}, s.A);
  s.hen = el("g", {}, s.A); el("path", A5({d: "M-130 60 Q-150 330 -210 560 H210 Q150 330 130 60 Z", fill: "#c8763a", "stroke-width": 9}), s.hen);
  s.head = el("g", {}, s.hen);
  el("path", A5({d: "M-70 -150 Q-96 -250 -34 -226 Q-20 -292 30 -232 Q84 -262 78 -150 Z", fill: "#e63946", "stroke-width": 8}), s.head);
  [-34, 34].forEach(x => el("path", A5({d: `M${x} 96 Q${x + (x < 0 ? -34 : 34)} 190 ${x} 214 Q${x + (x < 0 ? 22 : -22)} 170 ${x} 96 Z`, fill: "#e63946", "stroke-width": 7}), s.head));
  el("circle", A5({r: 180, fill: "#d98a4a", "stroke-width": 9}), s.head);
  [-98, 98].forEach(x => { el("circle", A5({cx: x, cy: -34, r: 46, fill: "#fff", "stroke-width": 7}), s.head); const p = el("g", {}, s.head); el("circle", {cx: x * .9, cy: -22, r: 26, fill: INK}, p); el("circle", {cx: x * .9 + 8, cy: -32, r: 8, fill: "#fff"}, p); });
  s.mouth = el("ellipse", {cx: 0, cy: 100, rx: 50, ry: 10, fill: "#3a0a0a", stroke: INK, "stroke-width": 7}, s.head);
  s.beakL = el("path", A5({d: "M-52 70 Q0 96 52 70 L0 156 Z", fill: "#e07a1f", "stroke-width": 8}), s.head);
  s.beakU = el("path", A5({d: "M-70 34 Q0 -6 70 34 L0 150 Z", fill: "#f4a261", "stroke-width": 8}), s.head); el("path", {d: "M-18 44 q4 -8 12 -4 M18 44 q-4 -8 -12 -4", fill: "none", stroke: INK, "stroke-width": 5, "stroke-linecap": "round"}, s.head);
  // the feed around us: grain and pellets, big and close
  s.feed = el("g", {}, s.feedSlot); el("rect", A5({x: -200, y: 700, width: 2100, height: 30, fill: "#8d99ae", "stroke-width": 6}), s.feed); el("rect", {x: -200, y: 728, width: 2100, height: 400, fill: "#c9a227"}, s.feed);
  seed = 561; for (let r = 0; r < 4; r++) for (let c = 0; c < 14 - r * 3; c++) { const sc = 1.1 + r * .75, x = -180 + (c + rnd() * .6) * (1980 / (14 - r * 3)), y = 760 + r * 84 + rnd() * 24, g = el("g", {transform: `translate(${x} ${y}) scale(${sc}) rotate(${rnd() * 360})`}, s.feed);
    if ((c + r) % 3 === 0) el("rect", A5({x: -26, y: -46, width: 52, height: 92, rx: 20, fill: "#9c6644", "stroke-width": 5}), g); else kernel5(g); }
  s.vg = edge(s.stage, "#ff9f1c", .5, .8);
  s.dark = fullRect(s.stage, "#3a0a0a", 0);
  s.tun = tunnelG(s.stage, 10, (e, i) => { el("circle", {r: 300, fill: "none", stroke: i % 2 ? "#9d0208" : "#c9184a", "stroke-width": 60}, e); });
  // inside the egg
  s.yolk = el("circle", {cx: CX, cy: CY, r: 10, fill: grad5("radialGradient", {cx: .5, cy: .5, r: .5}, [[0, "#ffd60a"], [.7, "#ffb703"], [1, "#fb8500"]])}, s.stage);
  s.white = el("g", {}, s.stage); s.shellR = el("path", {d: "M0 -62 C38 -62 50 -6 50 18 C50 48 28 64 0 64 C-28 64 -50 48 -50 18 C-50 -6 -38 -62 0 -62 Z", fill: "none", stroke: "#fffaf0", "stroke-width": 30}, s.white);
  s.cream = fullRect(s.stage, "#f6d7b0", 0);
  // outside: the egg farm
  s.out = el("g", {}, s.stage); s.cam = el("g", {}, s.out);
  el("rect", {x: -3000, y: -3000, width: 7600, height: 7000, fill: "#fff3d6"}, s.cam); el("rect", {x: -3000, y: 820, width: 7600, height: 3000, fill: "#b08968"}, s.cam);
  for (let k = -1; k < 6; k++) { const x = k * 400 - 10; el("rect", A5({x: x + 20, y: 150, width: 360, height: 410, rx: 14, fill: "#e9c46a"}), s.cam); el("rect", {x: x + 40, y: 170, width: 320, height: 370, rx: 8, fill: "#7f5539"}, s.cam);
    const h = hen5(s.cam); tf(h, `translate(${x + 180} 560) scale(1.5)`); if (k === 2) s.mom = h; el("path", A5({d: `M${x + 20} 500 q30 -30 60 0 q30 -34 60 0 q30 -30 60 0 q30 -34 60 0 q30 -30 60 0 q30 -34 60 0 V568 H${x + 20} Z`, fill: "#f4d58d", "stroke-width": 6}), s.cam); }
  el("path", A5({d: "M-400 568 H2100 V610 H-400 Z", fill: "#adb5bd"}), s.cam); el("path", A5({d: "M-400 610 L2100 610 L2100 700 L-400 760 Z", fill: "#dee2e6"}), s.cam); el("path", A5({d: "M-400 760 L2100 700 V730 L-400 794 Z", fill: "#6c757d"}), s.cam);
  s.eggs = [[250, 0], [520, 1], [1130, 0], [1420, 1], [1640, 0]].map(([x, w]) => { const e = egg5(s.cam, w ? "#fff" : "#f6d7b0"); tf(e, `translate(${x} ${716 - (x + 400) * .024}) scale(.8) rotate(80)`); return e; });
  s.glow = el("circle", {r: 110, fill: "#ffe14d", filter: "url(#blur)", opacity: .8}, s.cam); s.my = egg5(s.cam);
  s.you = el("g", {}, s.out); el("path", {d: "M-190 -30 H-52 V-52 L0 0 L-52 52 V30 H-190 Z", fill: "#ffe14d", stroke: INK, "stroke-width": 6, "stroke-linejoin": "round"}, s.you); tx(s.you, {x: -122, y: 15, "text-anchor": "middle", "font-size": 44, "font-weight": 700, fill: INK}, "YOU");
  s.card = card5(s.stage, "An egg farm in Lim Chu Kang, Singapore", "#2a9d8f", 46);
  s.run = t => { const u = U5("povHen", t), D = D5("povHen"), PK = 1.95, EG = 2.55, OUT = 3.35;
    // the hen looms
    const dn = ease(sg(u, -.4, .7)), lunge = Math.pow(sg(u, PK - .32, PK + .02), 2.2), back = on(u, 1.25, PK - .2, .25);
    const sc = .8 - .08 * back + 9 * lunge, by = lerp(1250, 700, dn), hy = lerp(by - 500 - 40 * back, CY - 104 * sc, clamp(lunge * 2.5)), tilt = 13 * on(u, .75, 1.3, .2) - 6 * on(u, 1.3, 1.7, .15);
    tf(s.hen, `translate(${CX} ${hy}) scale(${sc})`); tf(s.bodyG, `translate(${CX} ${by})`); tf(s.head, `rotate(${tilt})`);
    const open = ramp(u, PK - .45, PK - .15); tf(s.beakL, `translate(0 ${46 * open})`); set(s.mouth, "ry", 10 + 52 * open); set(s.mouth, "cy", 96 + 26 * open);
    tf(s.feed, `translate(0 ${-30 * dn + 500 * lunge})`); op(s.A, 1 - ramp(u, PK + .05, PK + .2));
    op(s.dark, on(u, PK - .08, EG + .5, .12)); op(s.vg, 1 - ramp(u, OUT - .2, OUT));
    runTunnel(s.tun, (u - PK) * 1.5, 420); op(s.tun.G, on(u, PK, EG + .1, .15) * .85);
    // packed into an egg
    set(s.yolk, "r", 10 + 1500 * ease(sg(u, EG - .1, EG + .45))); op(s.yolk, on(u, EG - .1, OUT + .1, .1));
    tf(s.white, `translate(${CX} ${CY}) scale(${lerp(26, 9.4, ease(sg(u, EG + .2, OUT - .15)))})`); op(s.white, on(u, EG + .2, OUT + .1, .15));
    op(s.cream, on(u, OUT - .22, OUT + .3, .2));
    // outside
    op(s.out, ramp(u, OUT - .02, OUT + .1)); const roll = ease(sg(u, OUT + .1, OUT + .75)), ex = lerp(960, 900, roll), ey = lerp(552, 686, roll);
    tf(s.my, `translate(${ex} ${ey}) rotate(${lerp(0, 80, roll)}) scale(.9)`); set(s.glow, "cx", ex); set(s.glow, "cy", ey); op(s.glow, .5 + .3 * Math.sin(u * 8));
    const zk = ease(sg(u, OUT, OUT + .9)), z = expo(16, 1.12, zk); camTf(s.cam, z, lerp(ex, CX, zk), lerp(ey, CY + 20, zk));
    tf(s.mom.head, `rotate(${-10 * on(u, OUT + .8, OUT + 1.1, .12) - 10 * on(u, OUT + 1.2, OUT + 1.5, .12)} 52 -150)`);
    const zx = CX + (ex - lerp(ex, CX, zk)) * z, zy = CY + (ey - lerp(ey, CY + 20, zk)) * z; tf(s.you, `translate(${zx - 70} ${zy}) scale(${Math.max(0, pop(u, OUT + .95, .35))})`);
    showC5(s.card, t, SC.povHen.t0 + OUT + .25, SC.povHen.t0 + D + .3, 905); }; return s; })();

/* =====================================================================================================================
   CANTEEN (the teacher asked for this one): breakfast in the school canteen. Pupils queue at the stall; the egg is cracked
   into a pan; then, from the plate, a fork and an open mouth loom: munch. */
function face5(p) { const g = el("g", {}, p), SKIN = "#f1c27d", HAIR = "#3d2c1e";
  el("path", A5({d: "M-330 520 Q-320 300 -120 270 H120 Q320 300 330 520 Z", fill: "#3a86ff", "stroke-width": 9}), g); el("path", A5({d: "M-80 262 L0 330 L80 262 L52 230 H-52 Z", fill: "#fff", "stroke-width": 8}), g);
  [-232, 232].forEach(x => el("ellipse", A5({cx: x, cy: 10, rx: 34, ry: 46, fill: SKIN, "stroke-width": 8}), g));
  el("circle", A5({r: 236, fill: SKIN, "stroke-width": 9}), g);
  el("path", A5({d: "M-236 -30 Q-262 -262 0 -270 Q262 -262 236 -30 Q200 -130 90 -150 Q-20 -160 -100 -110 Q-190 -90 -236 -30 Z", fill: HAIR, "stroke-width": 9}), g);
  el("path", A5({d: "M-14 -268 Q4 -322 44 -300", fill: "none", stroke: HAIR, "stroke-width": 22}), g);
  [-150, 150].forEach(x => el("circle", {cx: x, cy: 70, r: 40, fill: "#ff8fa3", opacity: .6}, g));
  g.eyes = el("g", {}, g); [-90, 90].forEach(x => { el("ellipse", {cx: x, cy: -22, rx: 30, ry: 40, fill: INK}, g.eyes); el("circle", {cx: x + 9, cy: -38, r: 12, fill: "#fff"}, g.eyes); });
  [-90, 90].forEach(x => el("path", {d: `M${x - 40} -92 Q${x} -112 ${x + 40} -92`, fill: "none", stroke: INK, "stroke-width": 11, "stroke-linecap": "round"}, g));
  g.mouth = el("g", {transform: "translate(0 112)"}, g); g.mo = el("ellipse", A5({rx: 70, ry: 10, fill: "#5c0f0f", "stroke-width": 9}), g.mouth);
  g.tong = el("ellipse", {cx: 0, cy: 30, rx: 42, ry: 24, fill: "#ff6b81"}, g.mouth); g.teeth = el("rect", {x: -46, y: -60, width: 92, height: 26, rx: 8, fill: "#fff", stroke: INK, "stroke-width": 5}, g.mouth);
  return g; }
S.canteen = (() => { const s = scene("canteen", "#fff3d6", "#fff3d6"), F = 800;
  // A: the canteen, wide
  s.A = el("g", {}, s.stage); s.cam = el("g", {}, s.A);
  el("rect", {x: -1500, y: -1500, width: 5000, height: 2300, fill: "#fff1d0"}, s.cam); el("rect", {x: -1500, y: -1500, width: 5000, height: 1500, fill: "#ffe3a8"}, s.cam);
  el("rect", {x: -1500, y: F - 60, width: 5000, height: 2000, fill: "#cfd8dc"}, s.cam); for (let k = 0; k < 22; k++) el("line", {x1: -600 + k * 150, y1: F - 60, x2: -1100 + k * 190, y2: 1100, stroke: "#b0bec5", "stroke-width": 4}, s.cam);
  [860, 960].forEach(y => el("line", {x1: -1500, y1: y, x2: 3500, y2: y, stroke: "#b0bec5", "stroke-width": 4}, s.cam));
  el("line", {x1: -1500, y1: F - 60, x2: 3500, y2: F - 60, stroke: INK, "stroke-width": 6}, s.cam);
  [[-60, 0], [420, 1]].forEach(([x]) => { el("rect", A5({x, y: -80, width: 60, height: F - 60 + 80, fill: "#f6bd60"}), s.cam); });
  // the stall
  const st = el("g", {transform: "translate(-190 0)"}, s.cam);
  el("rect", A5({x: 1010, y: 190, width: 800, height: 550, fill: "#2b2d42"}), st); el("rect", {x: 1030, y: 210, width: 760, height: 330, fill: "#fdf0d5"}, st);
  el("rect", A5({x: 990, y: 70, width: 840, height: 130, rx: 16, fill: "#e63946"}), st); tx(st, {x: 1410, y: 158, "text-anchor": "middle", "font-size": 70, "font-weight": 700, fill: "#fff", "letter-spacing": 3}, "STALL 3 · BREAKFAST");
  [["🍳", "egg"], ["🍞", "toast"], ["🥛", "milk"]].forEach(([e, n], i) => { el("rect", A5({x: 1500 + i * 96, y: 232, width: 84, height: 108, rx: 10, fill: "#fff", "stroke-width": 5}), st); emo(st, 1542 + i * 96, 274, 50, e); tx(st, {x: 1542 + i * 96, y: 328, "text-anchor": "middle", "font-size": 22, "font-weight": 700, fill: INK}, n); });
  // the stall-holder
  s.aunty = el("g", {transform: "translate(1320 560)"}, st); el("path", A5({d: "M-100 30 Q-96 -110 0 -116 Q96 -110 100 30 Z", fill: "#2a9d8f"}), s.aunty); el("path", A5({d: "M-50 30 V-80 H50 V30 Z", fill: "#fff"}), s.aunty);
  el("circle", A5({cx: 0, cy: -180, r: 72, fill: "#e0ac69"}), s.aunty); el("path", A5({d: "M-74 -190 Q-70 -270 0 -270 Q70 -270 74 -190 Q40 -224 0 -224 Q-40 -224 -74 -190 Z", fill: "#fff"}), s.aunty);
  [-26, 26].forEach(x => el("circle", {cx: x, cy: -178, r: 8, fill: INK}, s.aunty)); el("path", {d: "M-22 -148 Q0 -130 22 -148", fill: "none", stroke: INK, "stroke-width": 6, "stroke-linecap": "round"}, s.aunty);
  s.arm = el("g", {}, s.aunty); el("rect", A5({x: -18, y: 0, width: 36, height: 130, rx: 18, fill: "#e0ac69"}), s.arm); el("rect", A5({x: -22, y: -10, width: 44, height: 60, rx: 20, fill: "#2a9d8f"}), s.arm); s.hegg = egg5(s.arm); tf(s.hegg, "translate(0 142) scale(.42)");
  el("rect", A5({x: 1000, y: 540, width: 820, height: 200, fill: "#dee2e6"}), st); el("rect", A5({x: 990, y: 524, width: 840, height: 34, rx: 8, fill: "#f8f9fa"}), st);
  el("rect", A5({x: 1090, y: 476, width: 190, height: 50, rx: 8, fill: "#495057"}), st); el("path", A5({d: "M1100 456 H1270 L1256 480 H1114 Z", fill: "#22223b"}), st); el("rect", A5({x: 1262, y: 452, width: 90, height: 14, rx: 6, fill: "#22223b", "stroke-width": 5}), st);
  s.steam = [0, 1, 2].map(i => el("path", {d: "M0 0 q-14 -22 0 -44 t0 -44", fill: "none", stroke: "#fff", "stroke-width": 8, "stroke-linecap": "round", opacity: .8, transform: `translate(${1150 + i * 36} 446)`}, st));
  // a table with stools, and the queue
  const tb = el("g", {transform: "translate(-330 0)"}, s.cam); [[-40, 880], [150, 880], [340, 880]].forEach(([x, y]) => { el("rect", A5({x: x - 9, y: y - 70, width: 18, height: 80, fill: "#6c757d", "stroke-width": 5}), tb); el("ellipse", A5({cx: x, cy: y - 74, rx: 56, ry: 16, fill: "#f72585"}), tb); });
  el("rect", A5({x: -130, y: 690, width: 570, height: 26, rx: 10, fill: "#4cc9f0"}), tb); [[-80, 0], [380, 0]].forEach(([x]) => el("rect", A5({x: x - 10, y: 716, width: 20, height: 160, fill: "#6c757d", "stroke-width": 5}), tb));
  emo(tb, 60, 664, 54, "🍜"); emo(tb, 250, 664, 54, "🥤");
  s.q = friends5(s.cam); s.me = kid5(s.cam);
  s.cardA = card5(s.A, "Breakfast in the school canteen", INK, 46);
  // B: the pan, close
  s.B = el("g", {}, s.stage); fullRect(s.B, "#adb5bd"); for (let k = 0; k < 14; k++) el("line", {x1: -150, y1: -40 + k * 84, x2: 1770, y2: -40 + k * 84, stroke: "#9aa5ad", "stroke-width": 5}, s.B);
  el("rect", A5({x: CX + 300, y: CY + 250, width: 900, height: 110, rx: 50, fill: "#22223b", "stroke-width": 10, transform: `rotate(24 ${CX + 300} ${CY + 300})`}), s.B);
  el("circle", A5({cx: CX, cy: CY + 40, r: 470, fill: "#22223b", "stroke-width": 12}), s.B); el("circle", {cx: CX, cy: CY + 40, r: 400, fill: "#343a52", stroke: "#4a4e69", "stroke-width": 10}, s.B);
  s.wh = el("g", {}, s.B); blob(s.wh, 290, "#fffdf5", 571); s.wh.firstChild.setAttribute("stroke-width", 9);
  s.bub = []; seed = 573; for (let i = 0; i < 16; i++) { const a = rnd() * 6.28, r = 190 + rnd() * 80; s.bub.push({e: el("circle", {cx: Math.cos(a) * r, cy: Math.sin(a) * r, r: 8 + rnd() * 12, fill: "none", stroke: "#ced4da", "stroke-width": 5}, s.wh), u: rnd()}); }
  s.yk = el("g", {}, s.B); el("circle", A5({r: 104, fill: grad5("radialGradient", {cx: .4, cy: .35, r: .7}, [[0, "#ffd60a"], [1, "#fb8500"]]), "stroke-width": 9}), s.yk); el("ellipse", {cx: -34, cy: -40, rx: 26, ry: 16, fill: "#fff", opacity: .7, transform: "rotate(-30 -34 -40)"}, s.yk);
  const half = d => { const g = el("g", {}, s.B); el("path", A5({d: `M0 -150 C${d * 110} -150 ${d * 150} -40 ${d * 150} 30 C${d * 150} 100 ${d * 80} 150 0 150 L${d * 26} 100 L${-d * 10} 50 L${d * 30} 0 L${-d * 12} -60 L${d * 22} -110 Z`, fill: "#f6d7b0", "stroke-width": 9}), g); return g; };
  s.hL = half(-1); s.hR = half(1);
  s.sz = [0, 1, 2, 3].map(() => el("path", {d: "M0 0 q-22 -34 0 -68 t0 -68", fill: "none", stroke: "#fff", "stroke-width": 12, "stroke-linecap": "round"}, s.B));
  // C: from the plate
  s.C = el("g", {}, s.stage); fullRect(s.C, grad5("linearGradient", {x1: 0, y1: 0, x2: 0, y2: 1}, [[0, "#ffe3a8"], [.7, "#fff1d0"]]));
  [300, 1320].forEach(x => { el("rect", {x: x - 160, y: -60, width: 320, height: 60, fill: "#fff", opacity: .9}, s.C); el("circle", {cx: x, cy: 10, r: 200, fill: "#fff", opacity: .35, filter: "url(#blur)"}, s.C); });
  s.face = face5(s.C);
  s.plate = el("g", {}, s.C); el("ellipse", A5({cx: CX, cy: 1240, rx: 1250, ry: 420, fill: "#f8f9fa", "stroke-width": 12}), s.plate); el("ellipse", {cx: CX, cy: 1290, rx: 1040, ry: 330, fill: "none", stroke: "#ced4da", "stroke-width": 10}, s.plate);
  s.fork = el("g", {}, s.C); el("rect", A5({x: -34, y: -1500, width: 68, height: 1220, rx: 30, fill: "#ced4da", "stroke-width": 9}), s.fork); el("path", A5({d: "M-110 -330 Q-110 -200 -96 -190 V0 H-66 V-170 H-42 V0 H-12 V-170 H12 V0 H42 V-170 H66 V0 H96 V-190 Q110 -200 110 -330 Z", fill: "#e9ecef", "stroke-width": 9}), s.fork);
  s.vgC = edge(s.C, "#ff9f1c", .5, .8);
  s.maw = fullRect(s.stage, "#3a0a0a", 0);
  s.tU = el("g", {}, s.stage); s.tD = el("g", {}, s.stage);
  for (let k = 0; k < 8; k++) { el("rect", A5({x: -150 + k * 240 + 6, y: -330, width: 228, height: 330, rx: 60, fill: "#fff", "stroke-width": 9}), s.tU); el("rect", A5({x: -150 + k * 240 + 6, y: 0, width: 228, height: 330, rx: 60, fill: "#fff", "stroke-width": 9}), s.tD); }
  el("rect", A5({x: -220, y: -1400, width: 2140, height: 1140, rx: 60, fill: "#ff8fa3", "stroke-width": 9}), s.tU); el("rect", A5({x: -220, y: 260, width: 2140, height: 1140, rx: 60, fill: "#ff8fa3", "stroke-width": 9}), s.tD);
  s.run = t => { const u = U5("canteen", t), D = D5("canteen"), CUT1 = 1.85, CUT2 = 3.45;
    // A
    op(s.A, 1 - ramp(u, CUT1 - .08, CUT1 + .04)); const pk = ease(sg(u, -.45, CUT1)); camTf(s.cam, lerp(1.12, 1.5, pk), lerp(740, 900, pk), lerp(500, 500, pk));
    pose5(s.me, 740, F, .6, {armN: -62 + 6 * Math.sin(u * 3), laugh: u > 1 ? 1 : 0, shut: false, head: -4});
    [[s.q.y, 570], [s.q.r, 400], [s.q.v, 230]].forEach(([K, x], i) => pose5(K, x, F + 6 * i, .58, {head: 6 * Math.sin(u * 1.8 + i * 2), armN: i === 1 ? -30 + 20 * Math.sin(u * 4) : 0}));
    pose5(s.q.g, -180, 800, .5, {legN: -84, legF: -84, armN: -60 + 20 * Math.sin(u * 5), lean: 4, shadow: 0, bob: -24});
    tf(s.arm, `translate(-70 -70) rotate(${lerp(-70, -118, ease(sg(u, .9, 1.6)))})`); s.steam.forEach((p, i) => op(p, .35 + .45 * Math.sin(u * 5 + i * 2)));
    showC5(s.cardA, t, SC.canteen.t0 + .1, SC.canteen.t0 + CUT1 - .1, 905);
    // B
    op(s.B, on(u, CUT1 - .06, CUT2 + .06, .1)); const CR = CUT1 + .4, cr = ease(sg(u, CR, CR + .3)), drop = Math.pow(sg(u, CR + .05, CR + .42), 2), land = sg(u, CR + .42, CR + 1.1);
    const hy = lerp(40, 150, ease(sg(u, CUT1 - .1, CR))) - 200 * ramp(u, CR + .5, CR + 1);
    tf(s.hL, `translate(${CX - 20 - 150 * cr} ${hy}) rotate(${-38 * cr}) scale(.9)`); tf(s.hR, `translate(${CX + 20 + 150 * cr} ${hy}) rotate(${38 * cr}) scale(.9)`);
    tf(s.yk, `translate(${CX + 20} ${lerp(hy + 20, CY + 30, drop)}) scale(${lerp(.55, 1, drop) * (1 + .06 * Math.sin(u * 30) * (1 - land))})`); op(s.yk, u > CR + .02 ? 1 : 0);
    tf(s.wh, `translate(${CX} ${CY + 40}) scale(${u > CR + .4 ? .25 + .85 * Math.min(1.04, Math.max(0, pop(u, CR + .4, .6))) : 0})`);
    s.bub.forEach(b => { const p = ((u * 1.6 + b.u * 3) % 1); set(b.e, "opacity", u > CR + .7 ? 1 - p : 0); set(b.e, "stroke-width", 3 + 5 * p); });
    s.sz.forEach((p, i) => { const k = ((u - CR - .5) * .7 + i / 4) % 1; tf(p, `translate(${CX - 330 + i * 220} ${CY - 60 - 300 * k}) scale(${1 + k})`); op(p, u > CR + .5 ? .7 * (1 - k) * clamp(k / .15) : 0); });
    // C
    op(s.C, ramp(u, CUT2 - .06, CUT2 + .06)); const v = u - CUT2, stab = ease(sg(v, .25, .75)), lift = ease(sg(v, .75, 1.25)), zoom = Math.pow(sg(v, .7, 1.55), 2.2), open = ramp(v, .55, 1.15);
    const fs = lerp(.52, 1, ease(sg(v, -.2, .7))) * (1 + 7.5 * zoom), my = 112 * fs; tf(s.face, `translate(${CX} ${lerp(360, CY - my + 10, clamp(zoom * 6 + lift * .4))}) scale(${fs})`);
    set(s.face.mo, "ry", 10 + 84 * open); set(s.face.mo, "rx", 70 + 14 * open); op(s.face.tong, open); op(s.face.teeth, open); tf(s.face.tong, `translate(0 ${lerp(0, 40, open)})`);
    tf(s.plate, `translate(0 ${-60 * ease(sg(v, -.2, .4)) + 700 * lift})`);
    tf(s.fork, `translate(${lerp(1500, CX + 40, stab)} ${lerp(-500, 1040, stab) + 60 * lift}) rotate(${lerp(38, 8, stab)}) scale(${lerp(.7, 1.5, stab)})`); op(s.fork, v > .15 ? 1 : 0);
    op(s.maw, ramp(v, 1.42, 1.58)); const bite = ease(sg(v, 1.58, 1.74)) - .25 * on(v, 1.78, 1.95, .08);
    tf(s.tU, `translate(0 ${lerp(60, CY + 6, bite)})`); tf(s.tD, `translate(0 ${lerp(900, CY - 6, bite)})`); op(s.tU, v > 1.4 ? 1 : 0); op(s.tD, v > 1.4 ? 1 : 0); }; return s; })();

/* =====================================================================================================================
   POVBODY (5 s): digested into tiny bits in the gut, through the gut wall into the blood, swept along with the red blood
   cells on each heartbeat, and delivered to a leg muscle. */
S.povBody = (() => { const s = scene("povBody", "#800f2f", "#800f2f");
  s.g1 = el("g", {}, s.stage); fullRect(s.g1, grad5("radialGradient", {cx: .5, cy: .5, r: .7}, [[0, "#ffb3c1"], [.5, "#ff758f"], [1, "#a4133c"]]));
  s.gut = tunnelG(s.g1, 11, (e, i) => { el("circle", {r: 300, fill: "none", stroke: INK, "stroke-width": 58}, e); el("circle", {r: 300, fill: "none", stroke: i % 2 ? "#ff8fa3" : "#ffb3c1", "stroke-width": 46}, e);
    for (let k = 0; k < 14; k++) el("circle", A5({cx: Math.cos(k * Math.PI / 7 + i) * 272, cy: Math.sin(k * Math.PI / 7 + i) * 272, r: 24, fill: "#ffccd5", "stroke-width": 4}), e); });
  s.big = field(s.g1, 9, 581, (e, i) => { blob(e, 110, i % 2 ? "#fffdf5" : "#ffd60a", 590 + i); }, .3);
  s.small = field(s.g1, 34, 583, (e, i) => { if (i % 3) hex5(e, 34); else el("circle", A5({r: 22, fill: "#fff3c4", "stroke-width": 5}), e); }, .22);
  s.wall = fullRect(s.stage, "#ff8fa3", 0);
  s.g2 = el("g", {}, s.stage); fullRect(s.g2, grad5("radialGradient", {cx: .5, cy: .5, r: .7}, [[0, "#ff4d6d"], [.45, "#c9184a"], [1, "#590d22"]]));
  s.ves = tunnelG(s.g2, 11, (e, i) => { el("circle", {r: 300, fill: "none", stroke: INK, "stroke-width": 44}, e); el("circle", {r: 300, fill: "none", stroke: i % 2 ? "#e5383b" : "#ba181b", "stroke-width": 32}, e); });
  s.rbc = field(s.g2, 30, 587, (e, i) => { el("ellipse", A5({rx: 92, ry: 78, fill: "#ff4d6d", "stroke-width": 8}), e); el("ellipse", {cx: 6, cy: 6, rx: 44, ry: 34, fill: "#c9184a"}, e); el("path", {d: "M-62 -34 q20 -26 50 -30", fill: "none", stroke: "#ffb3c1", "stroke-width": 9, "stroke-linecap": "round"}, e); }, .26);
  s.sg2 = field(s.g2, 10, 589, (e, i) => hex5(e, 40), .2);
  // the muscle: long striped fibres
  s.mus = el("g", {}, s.stage); fullRect(s.mus, "#7b0d1e"); s.fib = el("g", {}, s.mus);
  for (let k = -5; k <= 5; k++) { const y = k * 190; el("rect", A5({x: -2600, y: y - 84, width: 5200, height: 168, rx: 84, fill: k % 2 ? "#ef476f" : "#ff6b81", "stroke-width": 10}), s.fib);
    for (let x = -2500; x < 2500; x += 64) el("line", {x1: x, y1: y - 62, x2: x, y2: y + 62, stroke: "#9d0208", "stroke-width": 9, "stroke-linecap": "round", opacity: .55}, s.fib); }
  s.spark = el("g", {}, s.mus); el("circle", {r: 230, fill: "#ffe14d", filter: "url(#blur)"}, s.spark); for (let k = 0; k < 10; k++) el("path", {d: "M0 -150 L22 -260 L-22 -260 Z", fill: "#fff3b0", stroke: INK, "stroke-width": 5, "stroke-linejoin": "round", transform: `rotate(${k * 36})`}, s.spark);
  s.ml = lab5(s.stage, CX, 86, "a leg muscle", 62);
  s.vg = edge(s.stage, "#ff9f1c", .55, .78);
  s.card = card5(s.stage, "Digested… carried by the blood to the muscles", "#9d0208", 46);
  s.run = t => { const u = U5("povBody", t), D = D5("povBody"), W = 1.5, M = 3.75;
    runTunnel(s.gut, (u + .5) * .5, 400 + 14 * Math.sin(u * 6)); flyField(s.big, .1 + (u + .5) * .26, 800); op(s.big.G, 1 - ramp(u, .25, .8)); flyField(s.small, .4 + (u + .5) * .3, 900); op(s.small.G, ramp(u, .3, .8));
    op(s.g1, 1 - ramp(u, W + .15, W + .3)); op(s.wall, on(u, W - .25, W + .45, .2));
    // heartbeat: a push every 0.72 s (in step with the sound)
    const hb = v => { const p = ((v - W - .2) / .72 % 1 + 1) % 1; return Math.exp(-p * 5) + .55 * Math.exp(-Math.abs(p - .28) * 14); }, beatSum = (u - W) * .32 + .05 * Math.sin(Math.max(0, u - W - .2) / .72 * 2 * Math.PI);
    op(s.g2, ramp(u, W + .1, W + .35)); runTunnel(s.ves, beatSum * 1.6, 400 * (1 + .07 * hb(u))); flyField(s.rbc, .2 + beatSum, 950); flyField(s.sg2, .5 + beatSum * .5, 700);
    op(s.mus, ramp(u, M - .1, M + .3)); const lk = ease(sg(u, M - .1, D - .5)); tf(s.fib, `translate(${CX} ${CY}) rotate(-12) scale(${lerp(.42, 1.5, lk) * (1 + .03 * on(u, M + .75, M + 1.2, .1))} ${lerp(.42, 1.5, lk) * (1 + .1 * on(u, M + .75, M + 1.2, .1))})`);
    tf(s.spark, `translate(${CX} ${CY}) scale(${Math.max(0, pop(u, M + .65, .4)) * (1 + .1 * Math.sin(u * 14))}) rotate(${u * 40})`); op(s.spark, on(u, M + .65, D + .5, .1));
    op(s.ml, on(u, M + .15, D + .3, .25));
    showC5(s.card, t, SC.povBody.t0 + .35, SC.povBody.t0 + D + .3, 905); }; return s; })();

/* =====================================================================================================================
   PLAYGROUND (outside, 5.5 s): we pull out of the leg muscle and there is our pupil from the cold open, sprinting across
   the playground, jumping and laughing. The energy that left the Sun is now movement (and heat). */
S.playground = (() => { const s = scene("playground", "#6ec6ff", "#e3f6ff"); s.cam = el("g", {}, s.stage); s.set = school5(s.cam); op(s.set.ring, 0);
  s.F = friends5(s.cam); s.me = kid5(s.cam);
  s.heat = [0, 1, 2].map(() => el("path", {d: "M0 0 q-12 -18 0 -36 t0 -36", fill: "none", stroke: "#e63946", "stroke-width": 7, "stroke-linecap": "round"}, s.cam));
  s.amber = fullRect(s.stage, "#ffb703", 0);
  s.top = card5(s.stage, "chemical potential energy → kinetic energy (and heat)", "#e63946", 42);
  s.card = card5(s.stage, "Now you're part of a student!", INK, 50);
  s.run = t => { const u = U5("playground", t), D = D5("playground"), F = s.F, JP = 3.0, LD = 3.95;
    const mx = lerp(-320, 560, sg(u, -.5, JP)) + 170 * sg(u, JP, LD), my = 940, sc = .78;
    if (u < JP) pose5(s.me, mx, my, sc, run5(u * 15, 48, {laugh: 1, shut: false}));
    else if (u < LD) pose5(s.me, mx, my, sc, jump5((u - JP) / (LD - JP), 250));
    else pose5(s.me, mx, my, sc, {armN: -118 + 8 * Math.sin(u * 9), armF: -205 - 8 * Math.sin(u * 9), laugh: 1, bob: -16 * Math.abs(Math.sin(u * 6.5)), head: -8});
    op(s.me.glow, .95 * (1 - ramp(u, 1.6, 2.6) * .45));
    hang5(F.r, lerp(PG5.BAR_X[0] + 50, PG5.BAR_X[1] - 40, .5 - .5 * Math.cos(u * .9 + 1)), u);
    slideKid(F.y, ((u + 1.7) % 5 + 5) % 5); cheerKid(F.v, 1000, 850, u, .52, true);
    pose5(F.g, lerp(1900, 1340, sg(u, -.5, 2.2)), 790, .48, u < 2.2 ? run5(u * 14, 42, {flip: true}) : jump5(((u - 2.2) * 1.3) % 1, 50, {flip: true}));
    // camera: out of the thigh, run with the pupil, then wide for the jump
    const zo = ease(sg(u, -.45, .55)), wide = ease(sg(u, JP - .5, JP + .3)), z = expo(11, 1.5, zo) * lerp(1, .78, wide);
    const tx0 = mx + 14, ty0 = my - 196 * sc - 16 * 0, fx = clamp(mx + 150, -150 + 960 / z, 1770 + 60 - 960 / z), fy = lerp(640, 560, wide);
    camTf(s.cam, z, lerp(tx0, fx, zo), lerp(ty0, fy, zo)); op(s.amber, 1 - ramp(u, -.4, -.05));
    s.heat.forEach((h, i) => { const k = ((u * .8 + i / 3) % 1); tf(h, `translate(${mx - 50 + i * 50} ${my - 420 - 60 * k})`); op(h, u > LD + .1 ? .8 * (1 - k) * clamp(k / .15) : 0); });
    showC5(s.card, t, SC.playground.t0 + .7, SC.playground.t0 + D + 1.2, 905);
    showC5(s.top, t, SC.playground.t0 + 2.0, SC.playground.t0 + D + 1.2, 64); }; return s; })();
})();
