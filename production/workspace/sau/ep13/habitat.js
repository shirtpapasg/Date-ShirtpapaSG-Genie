/* ep13/habitat.js: PHASE 1 DRAFT (teacher, 27 Nov 2026): the habitat section INSIDE the BE THE THING journey, after "Wait for us, clouds!"
   and before "You look down at Singapore". Load after ep13/scenes.js (uses its helpers). Lines: ep13/habitat_draft.py. Facts: SCRIPT.md section 9.
   Gentle, as rule 3 asks: no blood, no close-ups of suffering. Animals that died lie still with their eyes closed; nothing is drawn hurt.
   The gust (you) and the buddies ride along SHRUNK DOWN on the curl of wind, in back view; a buddy turns to the front only to speak.
   Every moving thing faces its direction of travel (the fish). One kind of label per row; cards are one line.
     povReef   the middle of the Pacific (Kiritimati, inside NOAA's Nino 3.4 box), 2015-16: the corals bleach white, then dull; the fish leave
     povCoast  the Galapagos Islands, 1982-83: the small fish swim away and down; a sea lion and her thin pup, a booby by an empty nest
     povForest Borneo, Indonesia, 2015: a dried-up pond with two fish lying still, a burnt peat forest smouldering underground, an orangutan
               mother and baby on a burnt log; then "Rescue teams do": the pair is carried (the arrow) to a green, safer forest */

// the riding buddies, as in the other journey shots (feet on the curl of wind, back view; the one who speaks turns round)
function hRide(s, st) { s.curl = el("path", {d: "M-260 0 Q-120 -60 0 -20 Q120 20 260 -30", fill: "none", stroke: "#fff", "stroke-width": 16, "stroke-linecap": "round", opacity: .8}, st);
  s.pip = nBud(st, "pip", false); s.momo = nBud(st, "momo", false); s.basil = nBud(st, "basil", false); s.tag = nYouTag(st, "You: a gust of the trade wind"); }
function hRideRun(s, t) { const X = SHORT ? [360, 600, 830] : [230, 470, 700];
  tf(s.curl, `translate(${SHORT ? 600 : 470} ${900 + Math.sin(t * 1.4) * 6})`);
  ["pip", "momo", "basil"].forEach((w, i) => nShow(s[w], X[i], 915, w === "pip" ? 200 : 195, nTalk(w, t) >= 0 ? "sit" : "back", t, {bob: 5}));
  popAt(s.tag, 810, 60, t, SC[s.name].t0 - .2); }
// a little fish, drawn facing +x (flip with scale(-1 1) to face left); dead = lying on its side, eye closed (a short arc), no marks
function hFish(p, col, k = 1, dead = false) { const g = el("g", {}, p), b = el("g", {transform: `scale(${k})`}, g);
  el("path", {d: "M-30 0 L-46 -14 L-46 14 Z", fill: col, stroke: INK, "stroke-width": 3, "stroke-linejoin": "round"}, b);
  el("ellipse", {cx: 0, cy: 0, rx: 34, ry: 16, fill: col, stroke: INK, "stroke-width": 3}, b);
  el("path", {d: "M-4 -15 Q4 -3 -4 14", fill: "none", stroke: INK, "stroke-width": 2, opacity: .4}, b);
  if (dead) el("path", {d: "M14 -5 Q19 -1 24 -5", fill: "none", stroke: INK, "stroke-width": 2.6, "stroke-linecap": "round"}, b);
  else { el("circle", {cx: 19, cy: -4, r: 5, fill: "#fff", stroke: INK, "stroke-width": 2}, b); el("circle", {cx: 20.5, cy: -4, r: 2.4, fill: INK}, b); }
  return g; }

/* ======================================================================================================================
   THE REEF: looking down through clear, shallow water at a coral reef in the middle of the Pacific. "habitat": the fish swim among the
   corals; "white": the corals fade to white one by one (bleaching); "die": the white corals turn dull grey-brown (dead coral, covered
   by a film of algae) and the last fish swim away out of the picture, facing the way they go. */
S.povReef = (() => { const s = scene("povReef", "#0aa1c2", "#06768f"), st = nWhole(s);
  el("rect", {x: -400, y: -800, width: 2400, height: 2600, fill: nGrad([[0, "#7fdde9"], [.5, "#2bb3c9"], [1, "#127e96"]])}, st);
  seed = 201; for (let i = 0; i < 14; i++) el("ellipse", {cx: -150 + rnd() * 1920, cy: 120 + rnd() * 800, rx: 90 + rnd() * 160, ry: 30 + rnd() * 40, fill: "#f3e3b5", opacity: .55}, st);   // sand
  // the corals (branching, brain, table, fan), each with its living colour; drawn so the buddies (bottom left) cover none of them
  const C = [];
  const branch = (x, y, k, col) => { const g = el("g", {transform: `translate(${x} ${y}) scale(${k})`}, st), parts = [];
    [[0, 0, -10, -90], [-10, -90, -50, -150], [-10, -90, 30, -160], [30, -160, 10, -210], [30, -160, 70, -200], [-50, -150, -80, -190], [0, 0, 60, -70], [60, -70, 100, -120], [0, 0, -60, -50], [-60, -50, -100, -90]]
      .forEach(([a, b, c, d]) => parts.push(el("path", {d: `M${a} ${b} L${c} ${d}`, stroke: col, "stroke-width": 24, "stroke-linecap": "round"}, g)));
    const ol = el("g", {}, g); return {g, parts, col, kind: "stroke"}; };
  const brain = (x, y, k, col) => { const g = el("g", {transform: `translate(${x} ${y}) scale(${k})`}, st);
    const b = el("ellipse", {cx: 0, cy: 0, rx: 110, ry: 70, fill: col, stroke: INK, "stroke-width": 5}, g);
    for (let i = -2; i <= 2; i++) el("path", {d: `M${-80 + Math.abs(i) * 10} ${i * 22} q20 -14 40 0 t40 0 t40 0 t40 0`, fill: "none", stroke: INK, "stroke-width": 3, opacity: .35}, g);
    return {g, parts: [b], col, kind: "fill"}; };
  const table = (x, y, k, col) => { const g = el("g", {transform: `translate(${x} ${y}) scale(${k})`}, st);
    const st1 = el("rect", {x: -14, y: -10, width: 28, height: 60, fill: col, stroke: INK, "stroke-width": 4}, g);
    const top = el("ellipse", {cx: 0, cy: -16, rx: 130, ry: 38, fill: col, stroke: INK, "stroke-width": 5}, g);
    return {g, parts: [st1, top], col, kind: "fill"}; };
  const fan = (x, y, k, col) => { const g = el("g", {transform: `translate(${x} ${y}) scale(${k})`}, st);
    const f = el("path", {d: "M0 0 Q-110 -60 -90 -170 Q0 -230 90 -170 Q110 -60 0 0 Z", fill: col, stroke: INK, "stroke-width": 5}, g);
    for (let i = -3; i <= 3; i++) el("path", {d: `M0 0 L${i * 28} -190`, stroke: INK, "stroke-width": 2, opacity: .3}, g);
    return {g, parts: [f], col, kind: "fill"}; };
  [[branch, 860, 470, 1.0, "#ff6fae"], [brain, 1120, 560, 1, "#b388eb"], [table, 600, 360, 1, "#ffb347"], [fan, 1320, 440, .9, "#ff5d5d"],
   [brain, 980, 730, .8, "#7bd389"], [branch, 1290, 740, .9, "#ffd166"], [table, 1100, 300, .8, "#f78fb3"], [branch, 470, 590, .85, "#9b5de5"],
   [fan, 870, 700, .75, "#ff9f1c"], [brain, 1500, 600, .75, "#ff7096"]].forEach(([f, x, y, k, col], i) => { const c = f(x, y, k, col); c.i = i; C.push(c); });
  s.C = C;
  // the reef's fish (they live here: the habitat); they swim left or right, always facing the way they go
  s.fish = []; seed = 211; for (let i = 0; i < 9; i++) { const col = ["#ffd60a", "#3a86ff", "#ff5d73", "#06d6a0", "#ffbe0b", "#f15bb5"][i % 6];
    s.fish.push({e: hFish(st, col, .75 + rnd() * .35), x0: 420 + rnd() * 1100, y: 200 + rnd() * 560, dir: rnd() < .5 ? -1 : 1, v: 40 + rnd() * 40, ph: rnd() * 6}); }
  // light on the water surface (still), and the soft edge that says "this is you"
  seed = 221; for (let i = 0; i < 22; i++) el("path", {d: `M${-150 + rnd() * 1920} ${-60 + rnd() * 1080} q30 -14 60 0 q30 14 60 0`, fill: "none", stroke: "#e6fbff", "stroke-width": 5, opacity: .35}, st);
  nVig(st, "#d8f3ff", .55);
  hRide(s, st);
  // two reef fish lying still on the sand (eyes closed, no marks): they appear on "die"
  s.deadF = [hFish(st, "#e9d98a", 1.05, true), hFish(st, "#9fb7d9", .95, true)];        // faded colours, lying on their side
  s.where = chip(st, "📍 Kiritimati Island, middle of the Pacific, 2015–16", INK, {fs: 32});
  s.card = chip(st, "CORAL BLEACHING", "#e85d04", {fs: 42});
  s.run = t => { const a = (w, f) => cue("povReef", w, f), t0 = SC.povReef.t0, tW = a("white", .55), tD = a("die", .9);
    C.forEach(c => { const k1 = ramp(t, tW - .4 + c.i * .22, tW + .8 + c.i * .22), k2 = ramp(t, tD - .5 + c.i * .06, tD + .3 + c.i * .06);
      const A = hex(c.col), Bw = hex("#f6f4ee"), Dd = hex("#9c917c"), col = "rgb(" + A.map((v, j) => Math.round(lerp(lerp(v, Bw[j], k1), Dd[j], k2 * .85))).join(",") + ")";   // living colour -> white -> dull (mix() cannot nest)
      c.parts.forEach(p => set(p, c.kind === "stroke" ? "stroke" : "fill", col)); });
    const leave = ramp(t, tW + 1, tD + .6);      // the fish leave the white, then dead, reef
    s.fish.forEach((o, i) => { const sw = Math.sin(t * .7 + o.ph) * 60, x = o.x0 + sw + o.dir * leave * 1400 * (1 + i * .08), y = o.y + Math.sin(t * 1.3 + o.ph) * 10;
      const dirNow = leave > .01 ? o.dir : (Math.cos(t * .7 + o.ph) >= 0 ? 1 : -1);    // FACES: the way it is swimming
      tf(o.e, `translate(${x} ${y}) scale(${dirNow} 1)`); op(o.e, 1 - ramp(t, tD - .2, tD + .6)); });
    tf(s.deadF[0], "translate(1130 840) rotate(-14)"); tf(s.deadF[1], "translate(1420 830) rotate(12) scale(-1 1)"); s.deadF.forEach((d, i) => op(d, ramp(t, tD - .1 + i * .25, tD + .4 + i * .25)));
    hRideRun(s, t); popAt(s.where, 810, 160, t, t0 + .3); op(s.where, on(t, t0 + .3, tW - .5, .3));
    popAt(s.card, 810, 160, t, a("bleaching", .7) - .1); op(s.card, on(t, a("bleaching", .7) - .1, SC.povReef.t1 + .5, .3)); };
  return s; })();

/* ======================================================================================================================
   THE COAST: the Galapagos Islands. Black lava rocks, the sea (warm now: no cold water rising, so few small fish). "hard to find": the
   shoal of small silver fish swims away and down out of the picture, facing the way it goes. A sea lion mother lies on the rock with her
   thin, hungry pup (eyes open; Heart's line carries "many of their babies die"); a blue-footed booby stands by an empty nest. Card "Galapagos Islands, 1982-83". */
S.povCoast = (() => { const s = scene("povCoast", "#8ecae6", "#219ebc"), st = nWhole(s), HZ = 300;
  el("rect", {x: -400, y: -800, width: 2400, height: HZ + 800, fill: nGrad([[0, "#9ad1ff"], [1, "#e8f6ff"]])}, st);
  el("path", {d: `M-150 ${HZ} Q200 ${HZ - 90} 420 ${HZ - 40} Q560 ${HZ - 120} 760 ${HZ} Z`, fill: "#5c677d", stroke: INK, "stroke-width": 4}, st);   // a far island
  el("rect", {x: -400, y: HZ, width: 2400, height: 1600, fill: nGrad([[0, "#48bfe3"], [.5, "#2a9d8f"], [1, "#1d6f73"]])}, st);
  s.warm = el("rect", {x: -400, y: HZ, width: 2400, height: 1600, fill: nGrad([[0, "#ffd29d"], [1, "#f4a261"]]), opacity: 0}, st);
  // the shoal of small fish in the water (anchovies): they leave
  s.shoal = []; seed = 231; for (let i = 0; i < 26; i++) s.shoal.push({e: hFish(st, "#cfd8dc", .42), x: 380 + rnd() * 520, y: 420 + rnd() * 200});
  // the lava rocks (right), where the sea lions and the booby are
  el("path", {d: "M760 1020 L820 560 Q900 470 1040 500 Q1180 430 1330 520 Q1480 500 1560 600 L1640 1020 Z", fill: "#3d405b", stroke: INK, "stroke-width": 6, "stroke-linejoin": "round"}, st);
  el("path", {d: "M860 620 Q980 580 1100 600 M1180 560 Q1300 540 1420 590", fill: "none", stroke: "#5c5f7a", "stroke-width": 8, "stroke-linecap": "round"}, st);
  // a sea lion mother lying on the rock, her thin pup beside her (lying still, eyes closed)
  const seal = (x, y, k, thin, closed) => { const g = el("g", {transform: `translate(${x} ${y}) scale(${k})`}, st);
    el("path", {d: `M-150 10 Q-120 ${thin ? -38 : -60} -20 ${thin ? -42 : -62} Q60 ${thin ? -52 : -78} 110 -60 Q150 -40 140 -6 Q100 14 -150 10 Z`, fill: "#8d6e63", stroke: INK, "stroke-width": 5, "stroke-linejoin": "round"}, g);
    el("path", {d: "M-150 10 L-196 -10 L-186 22 Z", fill: "#8d6e63", stroke: INK, "stroke-width": 4, "stroke-linejoin": "round"}, g);       // tail flippers
    el("path", {d: "M20 0 Q30 30 0 36", fill: "none", stroke: INK, "stroke-width": 4}, g);                                                  // front flipper
    el("circle", {cx: 150, cy: -28, r: 34, fill: "#a1887f", stroke: INK, "stroke-width": 5}, g);                                             // head
    el("ellipse", {cx: 178, cy: -18, rx: 14, ry: 10, fill: "#6d4c41"}, g);
    if (closed) el("path", {d: "M146 -38 Q154 -32 162 -38", fill: "none", stroke: INK, "stroke-width": 3.4, "stroke-linecap": "round"}, g);
    else { el("circle", {cx: 155, cy: -36, r: 6, fill: INK}, g); el("circle", {cx: 157, cy: -38, r: 2, fill: "#fff"}, g); }
    return g; };
  s.mom = seal(1080, 610, 1, false, false); s.pup = seal(1290, 650, .55, true, false);      // the pup: thin and hungry, eyes open (gentle: no dead pups drawn)
  // a blue-footed booby by its empty nest (no egg, no chick)
  s.boo = el("g", {transform: "translate(920 500)"}, st);
  el("ellipse", {cx: 0, cy: 26, rx: 60, ry: 16, fill: "#a1887f", stroke: INK, "stroke-width": 4}, s.boo);  // the nest, empty
  const bb = el("g", {transform: "translate(70 -10)"}, s.boo);
  el("path", {d: "M-14 36 L-18 58 M10 36 L14 58", stroke: "#3fa7d6", "stroke-width": 9, "stroke-linecap": "round"}, bb);           // the blue feet
  el("ellipse", {cx: 0, cy: 0, rx: 30, ry: 42, fill: "#efe6da", stroke: INK, "stroke-width": 4}, bb);
  el("path", {d: "M-26 -10 Q-40 30 -6 40 L-28 30 Z", fill: "#8d6e63", stroke: INK, "stroke-width": 3}, bb);
  el("circle", {cx: 0, cy: -52, r: 20, fill: "#d7ccc8", stroke: INK, "stroke-width": 4}, bb);
  el("path", {d: "M-16 -52 L-50 -44 L-16 -44 Z", fill: "#90a4ae", stroke: INK, "stroke-width": 3}, bb);                                   // beak (faces left, at the sea)
  el("circle", {cx: -6, cy: -56, r: 3.5, fill: INK}, bb);
  nVig(st, "#d8f3ff", .5);
  hRide(s, st);
  s.where = chip(st, "📍 Galápagos Islands, 1982–83", INK, {fs: 34});
  s.run = t => { const a = (w, f) => cue("povCoast", w, f), t0 = SC.povCoast.t0, tH = a("hard", .3), tB = a("babies", .8);
    op(s.warm, .45 * ramp(t, t0, t0 + 1.5));
    const go = ramp(t, tH - .6, tH + 2.4);              // FACES: the shoal swims left and down, away from the camera, facing that way
    s.shoal.forEach((o, i) => { const x = o.x - go * (700 + (i % 5) * 60) + Math.sin(t * 2 + i) * 6, y = o.y + go * (160 + (i % 4) * 30);
      tf(o.e, `translate(${x} ${y}) rotate(${-12 * go}) scale(-1 1)`); op(o.e, 1 - ramp(t, tH + 1.2, tH + 2.6)); });
    hRideRun(s, t); popAt(s.where, 810, 160, t, t0 + .3); };
  return s; })();

/* ======================================================================================================================
   BORNEO: back near Singapore. Left: a dried-up pond, cracked mud, two fish lying still where the water was. Middle and right: a burnt
   peat forest (black trunks, grey ground, a low haze; the peat glows and smoulders UNDER the ground, as peat fires do: no flames, no
   smoke clouds). An orangutan mother with her baby sits on a burnt log. "Rescue teams do": a dotted arrow carries the pair to a green,
   safer forest at the right edge, where they sit in a tree. Card "Borneo, Indonesia, 2015". */
S.povForest = (() => { const s = scene("povForest", "#d8cbb4", "#b8a98e"), st = nWhole(s), HZ = 380;
  el("rect", {x: -400, y: -800, width: 2400, height: HZ + 800, fill: nGrad([[0, "#cbbfa8"], [1, "#e8dcc4"]])}, st);
  el("rect", {x: -400, y: HZ, width: 2400, height: 1600, fill: nGrad([[0, "#9a8f7c"], [1, "#6f6656"]])}, st);
  // the burnt peat forest: black trunks with a few bare branches, far ones paler (the haze)
  seed = 241; for (let i = 0; i < 16; i++) { const x = 300 + i * 80 + rnd() * 40, far = i % 2, h = far ? 220 + rnd() * 80 : 330 + rnd() * 120, y = HZ + (far ? 30 : 90);
    const g = el("g", {opacity: far ? .55 : 1}, st); el("path", {d: `M${x} ${y} L${x + 6} ${y - h} M${x + 4} ${y - h * .6} L${x + 40} ${y - h * .8} M${x + 3} ${y - h * .4} L${x - 30} ${y - h * .55}`, stroke: "#2b2622", "stroke-width": far ? 10 : 16, "stroke-linecap": "round"}, g); }
  // the peat smoulders under the ground: small orange glows in cracks (no flames)
  s.glow = []; seed = 251; for (let i = 0; i < 10; i++) s.glow.push(el("ellipse", {cx: 520 + rnd() * 900, cy: 520 + rnd() * 260, rx: 26 + rnd() * 20, ry: 8, fill: "#ff7b00", filter: "url(#blur)", opacity: 0}, st));
  // the safer forest at the right edge (green, appears on "rescue")
  s.green = el("g", {opacity: 0}, st); [[1480, 1.1], [1600, .9], [1700, 1.2]].forEach(([x, k]) => { const g = el("g", {transform: `translate(${x} ${HZ + 170}) scale(${k})`}, s.green);
    el("rect", {x: -14, y: -180, width: 28, height: 190, fill: "#6d4c41", stroke: INK, "stroke-width": 4}, g);
    el("circle", {cx: 0, cy: -230, r: 95, fill: "#2d6a4f", stroke: INK, "stroke-width": 5}, g); el("circle", {cx: -60, cy: -170, r: 60, fill: "#40916c", stroke: INK, "stroke-width": 5}, g); });
  // the dried-up pond (left of centre, above the buddies): cracked mud, a last wet patch that shrinks, two fish lying still
  s.pond = el("g", {transform: "translate(560 520)"}, st);
  el("ellipse", {cx: 0, cy: 0, rx: 260, ry: 78, fill: "#b08968", stroke: INK, "stroke-width": 5}, s.pond);
  s.wet = el("ellipse", {cx: 20, cy: 6, rx: 200, ry: 56, fill: "#5aa9d6", stroke: "#2a7fb8", "stroke-width": 3}, s.pond);
  seed = 261; for (let i = 0; i < 14; i++) { const x = -220 + rnd() * 440, y = -50 + rnd() * 100; el("path", {d: `M${x} ${y} l${20 + rnd() * 30} ${-10 + rnd() * 20} l${10 + rnd() * 20} ${10 + rnd() * 16}`, fill: "none", stroke: "#7f5539", "stroke-width": 3, opacity: 0, class: "crack"}, s.pond); }
  s.cracks = [...s.pond.querySelectorAll(".crack")];
  s.dead = [hFish(s.pond, "#c9b37e", 1.05, true), hFish(s.pond, "#b5a26e", .95, true)]; tf(s.dead[0], "translate(-70 14) rotate(-8)"); tf(s.dead[1], "translate(90 -10) rotate(170) scale(1 -1)");
  // the orangutan mother and her baby (code-drawn animals, not the buddies): sitting, looking at the burnt forest
  // an orangutan mother with her baby clinging to her chest (sitting, facing us; long arms resting on the log; no neck, head low between
  // the shoulders; shaggy red-orange hair; a darker face with a pale muzzle). Code-drawn animals, not the buddies.
  const face = (g, x, y, k, sad) => { const f = el("g", {transform: `translate(${x} ${y}) scale(${k})`}, g);
    el("ellipse", {cx: 0, cy: 0, rx: 40, ry: 44, fill: "#b5541f", stroke: INK, "stroke-width": 5}, f);                                   // hair round the face
    el("ellipse", {cx: 0, cy: 4, rx: 30, ry: 34, fill: "#7a5240", stroke: INK, "stroke-width": 3}, f);                                   // dark face skin
    el("ellipse", {cx: 0, cy: 18, rx: 20, ry: 15, fill: "#c9a68b", stroke: INK, "stroke-width": 2.5}, f);                               // pale muzzle
    [-11, 11].forEach(ex => { el("ellipse", {cx: ex, cy: -6, rx: 6, ry: 6.5, fill: "#fff", stroke: INK, "stroke-width": 2}, f); el("circle", {cx: ex, cy: -5, r: 3.4, fill: INK}, f); });
    if (sad) [-11, 11].forEach(ex => el("path", {d: `M${ex - 8} ${-17 + (ex < 0 ? 3 : 0)} L${ex + 8} ${-17 + (ex < 0 ? 0 : 3)}`, stroke: INK, "stroke-width": 2.6, "stroke-linecap": "round"}, f));   // worried brows
    el("circle", {cx: -4, cy: 13, r: 1.8, fill: INK}, f); el("circle", {cx: 4, cy: 13, r: 1.8, fill: INK}, f);
    el("path", {d: sad ? "M-8 27 Q0 22 8 27" : "M-8 24 Q0 29 8 24", fill: "none", stroke: INK, "stroke-width": 2.6, "stroke-linecap": "round"}, f); return f; };
  const ape = (p) => { const g = el("g", {}, p);
    el("path", {d: "M-62 -60 Q-150 -10 -120 70 Q-112 92 -96 96", fill: "none", stroke: "#8f3a0f", "stroke-width": 30, "stroke-linecap": "round"}, g);   // long left arm to the log
    el("path", {d: "M62 -60 Q150 -10 120 70 Q112 92 96 96", fill: "none", stroke: "#8f3a0f", "stroke-width": 30, "stroke-linecap": "round"}, g);
    el("path", {d: "M-80 70 Q-100 -40 -40 -78 Q0 -92 40 -78 Q100 -40 80 70 Q0 96 -80 70 Z", fill: "#c1440e", stroke: INK, "stroke-width": 5, "stroke-linejoin": "round"}, g);   // body
    for (let j = -3; j <= 3; j++) el("path", {d: `M${j * 22} -50 q${j * 3} 30 ${j * 2} 60`, fill: "none", stroke: "#e0702b", "stroke-width": 4, "stroke-linecap": "round", opacity: .7}, g);   // shaggy hair
    face(g, 0, -100, 1, true);
    // the baby, clinging to her chest: its arms round her, its little face peeking out
    el("path", {d: "M-44 10 Q0 -14 44 10", fill: "none", stroke: "#a8460f", "stroke-width": 14, "stroke-linecap": "round"}, g);
    el("ellipse", {cx: 0, cy: 34, rx: 34, ry: 30, fill: "#d35d1b", stroke: INK, "stroke-width": 4}, g);
    face(g, 0, 18, .55, false); return g; };
  s.log = el("g", {transform: "translate(1080 640)"}, st); el("rect", {x: -170, y: 80, width: 340, height: 54, rx: 26, fill: "#2b2622", stroke: INK, "stroke-width": 5}, s.log);
  s.ape = ape(s.log);
  s.ape2 = ape(st);                                                     // the same pair, safe in the green forest
  s.arrow = el("path", {d: "M1180 560 Q1330 420 1500 390", fill: "none", stroke: "#06d6a0", "stroke-width": 12, "stroke-dasharray": "4 22", "stroke-linecap": "round", opacity: 0}, st);
  s.arrowH = el("path", {d: "M-16 -16 L14 0 L-16 16", fill: "none", stroke: "#06d6a0", "stroke-width": 12, "stroke-linecap": "round", "stroke-linejoin": "round", opacity: 0,
    transform: `translate(1500 390) rotate(${(Math.atan2(390 - 420, 1500 - 1330) * 180 / Math.PI).toFixed(1)})`}, st);   // FACES: along the path, into the safe forest
  s.haze = el("rect", {x: -400, y: -800, width: 2400, height: 2600, fill: "#a89a80", opacity: .18}, st);
  nVig(st, "#fff3bf", .5);
  hRide(s, st);
  s.where = chip(st, "📍 Borneo, Indonesia, 2015", INK, {fs: 34});
  s.run = t => { const a = (w, f) => cue("povForest", w, f), t0 = SC.povForest.t0, tP = a("ponds", .1), tF = a("fish", .25), tB = a("burn", .45), tO = a("orangutans", .55), tR = a("rescue", .8), tC = a("carry", .86);
    const dry = ramp(t, tP - .3, tF + .5); set(s.wet, "rx", lerp(200, 0, dry)); set(s.wet, "ry", lerp(56, 0, dry)); op(s.wet, 1 - ramp(t, tF, tF + .6));
    s.cracks.forEach((c, i) => op(c, ramp(t, tP + i * .08, tP + .5 + i * .08)));
    s.dead.forEach((d, i) => op(d, ramp(t, tF - .1 + i * .3, tF + .3 + i * .3)));
    s.glow.forEach((g, i) => op(g, ramp(t, tB - .3 + i * .1, tB + .5 + i * .1) * (.55 + .25 * Math.sin(t * 2 + i * 1.7))));   // smouldering (the only motion)
    popAt(s.log, 1080, 600, t, tO - .4);
    const k = ramp(t, tC, tC + 1.6); op(s.arrow, on(t, tR, 1e9, .3)); op(s.arrowH, on(t, tR, 1e9, .3)); set(s.arrow, "stroke-dashoffset", -t * 40);
    op(s.ape, 1 - k); op(s.green, ramp(t, tR - .2, tR + .6)); tf(s.ape2, `translate(1580 ${HZ + 10}) scale(.75)`); op(s.ape2, k);
    hRideRun(s, t); popAt(s.where, 810, 160, t, t0 + .3); };
  return s; })();
