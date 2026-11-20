// micro.js: PART 1's first-person shrink: you follow the water. Wet soil -> in through a root -> up the stem -> all the way to a leaf.
// One long shot (no cut): each place grows out of the last one. True at P3 level: no part labels, no new science word.
if (PART === 1) { (() => {
const GR = Array.from({ length: 46 }, (_, i) => ({ x: -500 + hash(i, 1) * 2900, y: -700 + hash(i, 2) * 2300, rx: 90 + hash(i, 3) * 150, ry: 70 + hash(i, 4) * 110, c: ["#6B4630", "#7A5238", "#5A3A28", "#8A6040", "#4E3222"][i % 5], r: hash(i, 5) * 60 - 30 }));
const WT = Array.from({ length: 30 }, (_, i) => ({ x: -400 + hash(i, 11) * 2700, y: -600 + hash(i, 12) * 2100, r: 26 + hash(i, 13) * 60 }));
BG.soil = () => `<defs>${rg("soBg", [[0, "#4A2E1E"], [1, "#22130B"]], .5, .45, .8)}</defs><rect x="-200" y="-120" width="2320" height="1320" fill="url(#soBg)"/><ellipse cx="900" cy="300" rx="900" ry="500" fill="#FFD9A0" opacity=".12" filter="url(#b60)"/>`;
function soilWorld(t) { let s = "";
  GR.forEach((g, i) => { s += `<g transform="translate(${n2(g.x)} ${n2(g.y)}) rotate(${n2(g.r)})"><ellipse rx="${n2(g.rx)}" ry="${n2(g.ry)}" fill="${g.c}" stroke="#2E1A10" stroke-width="6"/><path d="M${n2(-g.rx * .6)} ${n2(-g.ry * .45)} Q0 ${n2(-g.ry * .95)} ${n2(g.rx * .55)} ${n2(-g.ry * .5)}" fill="none" stroke="#C9A27A" stroke-width="9" stroke-linecap="round" opacity=".35"/><circle cx="${n2(g.rx * .3)}" cy="${n2(g.ry * .2)}" r="${n2(g.ry * .12)}" fill="#2E1A10" opacity=".25"/></g>`; });
  // the root: pale, as thick as a tree trunk, with fine hairs
  const rp = "M2500 240 C1800 380 1300 470 900 560 S-100 760 -600 900"; let hairs = ""; for (let i = 0; i < 26; i++) { const u = i / 25, x = 2300 - u * 2700, y = 280 + u * 580 + 30 * Math.sin(u * 9); hairs += `<path d="M${n2(x)} ${n2(y)} q${n2(20 - 40 * hash(i, 7))} ${n2((i % 2 ? 1 : -1) * (120 + 60 * hash(i, 8)))} ${n2(50 - 100 * hash(i, 9))} ${n2((i % 2 ? 1 : -1) * (190 + 80 * hash(i, 8)))}" fill="none" stroke="#F4EAD0" stroke-width="7" stroke-linecap="round" opacity=".7"/>`; }
  s += `<g filter="url(#rimC)">${hairs}<path d="${rp}" fill="none" stroke="#CDBE98" stroke-width="216" stroke-linecap="round"/><path d="${rp}" fill="none" stroke="#F6EFD2" stroke-width="186" stroke-linecap="round"/><path d="${rp}" fill="none" stroke="#fff" stroke-width="40" stroke-linecap="round" opacity=".5" transform="translate(0 -52)"/></g>`;
  // the water between the grains: shining, and slowly moving towards the root
  WT.forEach((w, i) => { const dx = 960 - w.x, dy = 560 - w.y, d = Math.hypot(dx, dy) || 1, mv = 26 * Math.sin(t * .5 + i) + ((t * 14 + i * 37) % 120), x = w.x + dx / d * mv, y = w.y + dy / d * mv, tw_ = .5 + .5 * Math.sin(t * 1.4 + i * 2.1);
    s += `<g transform="translate(${n2(x)} ${n2(y)})"><ellipse rx="${n2(w.r * 1.25)}" ry="${n2(w.r)}" fill="#6FC3FF" opacity=".5"/><ellipse cx="${n2(w.r * .1)}" cy="${n2(w.r * .1)}" rx="${n2(w.r * .9)}" ry="${n2(w.r * .7)}" fill="#BFE6FF" opacity=".5"/><ellipse cx="${n2(-w.r * .4)}" cy="${n2(-w.r * .35)}" rx="${n2(w.r * .3)}" ry="${n2(w.r * .18)}" fill="#fff" opacity="${n2(.6 + .4 * tw_)}"/></g>`; });
  return s; }
const lerpC = (a, b, u) => { const p = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16)), A = p(a), B = p(b); return "#" + A.map((v, i) => Math.round(lerp(v, B[i], clamp(u))).toString(16).padStart(2, "0")).join(""); };
// inside the root and the stem: a tall tunnel; v = how far we have climbed (px), g = 0 (pale root) .. 1 (green stem, glowing from outside)
function tunnel(t, v, g) { const mid = lerpC("#F6EFD2", "#C9F0A0", g), wall = lerpC("#CDBE98", "#3E9A52", g), wall2 = lerpC("#B5A47C", "#2A7A44", g); let s = `<rect width="1920" height="1080" fill="${mid}"/>`;
  s += `<ellipse cx="960" cy="540" rx="520" ry="900" fill="#FFF8D0" opacity="${n2(.35 + .25 * g)}" filter="url(#b60)"/>`;
  for (let i = 0; i < 44; i++) { const x = 330 + hash(i, 21) * 1260, len = 220 + hash(i, 22) * 420, sp = .7 + hash(i, 23) * .6, y = ((hash(i, 24) * 1700 + v * sp) % 1700) - 500, w = 14 + hash(i, 25) * 22;
    s += `<rect x="${n2(x)}" y="${n2(y)}" width="${n2(w)}" height="${n2(len)}" rx="${n2(w / 2)}" fill="${g > .5 ? "#EAFBC8" : "#fff"}" opacity="${n2(.22 + .2 * hash(i, 26))}"/>`; }
  for (const sd of [-1, 1]) { const x0 = 960 + sd * 640; s += `<path d="M${x0} -20 Q${x0 - sd * 60} 540 ${x0} 1100 H${960 + sd * 1100} V-20z" fill="${wall}"/><path d="M${x0 + sd * 130} -20 Q${x0 + sd * 80} 540 ${x0 + sd * 130} 1100 H${960 + sd * 1100} V-20z" fill="${wall2}"/><path d="M${x0} -20 Q${x0 - sd * 60} 540 ${x0} 1100" fill="none" stroke="#fff" stroke-width="14" opacity=".35"/>`;
    for (let j = 0; j < 7; j++) { const y = ((j * 260 + v * 1.1) % 1820) - 300; s += `<path d="M${x0 + sd * 6} ${n2(y)} h${sd * 150}" stroke="${wall2}" stroke-width="10" opacity=".6"/>`; } }
  // the water, climbing with us
  for (let i = 0; i < 9; i++) { const x = 560 + hash(i, 31) * 800 + 30 * Math.sin(t * .8 + i), y = 760 - hash(i, 32) * 560 + 26 * Math.sin(t * 1.1 + i * 1.7), r = 30 + hash(i, 33) * 42;
    s += `<g transform="translate(${n2(x)} ${n2(y)})"><ellipse rx="${n2(r)}" ry="${n2(r * 1.15)}" fill="#6FC3FF" opacity=".55"/><ellipse cx="0" cy="${n2(r * .1)}" rx="${n2(r * .8)}" ry="${n2(r * .9)}" fill="#D9F1FF" opacity=".5"/><ellipse cx="${n2(-r * .3)}" cy="${n2(-r * .4)}" rx="${n2(r * .28)}" ry="${n2(r * .2)}" fill="#fff" opacity=".9"/></g>`; }
  if (g > .2) s += `<g style="mix-blend-mode:screen" opacity="${n2((g - .2) * .5)}"><rect x="0" y="0" width="420" height="1080" fill="#FFF3B8" filter="url(#b60)"/><rect x="1500" y="0" width="420" height="1080" fill="#FFF3B8" filter="url(#b60)"/></g>`;
  return s; }
// inside a leaf: light pours through its green skin from above, like sunlight through a tent. lift 0..1
function leafInside(t, lift) { let veins = "", cells = "";
  for (let i = 0; i < 9; i++) { const y = 940 - i * 105, sd = i % 2 ? 1 : -1; veins += `<path d="M960 ${y} Q${960 + sd * 420} ${y - 150} ${960 + sd * 1100} ${y - 330}" fill="none" stroke="#EAFBC8" stroke-width="${22 - i}" stroke-linecap="round" opacity=".7"/><path d="M${960 + sd * 420} ${y - 128} q${sd * 120} -150 ${sd * 300} -210 M${960 + sd * 620} ${y - 196} q${sd * 60} 90 ${sd * 260} 110" fill="none" stroke="#EAFBC8" stroke-width="8" stroke-linecap="round" opacity=".5"/>`; }
  for (let i = 0; i < 60; i++) { const x = hash(i, 41) * 2100 - 90, y = hash(i, 42) * 1100, r = 30 + hash(i, 43) * 46; cells += `<ellipse cx="${n2(x)}" cy="${n2(y)}" rx="${n2(r * 1.2)}" ry="${n2(r)}" fill="none" stroke="#3E9A52" stroke-width="5" opacity=".28"/>`; }
  let drops = ""; for (let i = 0; i < 8; i++) { const x = 400 + hash(i, 51) * 1120 + 30 * Math.sin(t * .7 + i), y = 900 - hash(i, 52) * 420 - 90 * lift + 20 * Math.sin(t + i * 2), r = 26 + hash(i, 53) * 34; drops += `<g transform="translate(${n2(x)} ${n2(y)})"><ellipse rx="${n2(r)}" ry="${n2(r * 1.1)}" fill="#6FC3FF" opacity=".55"/><ellipse cx="${n2(-r * .3)}" cy="${n2(-r * .4)}" rx="${n2(r * .28)}" ry="${n2(r * .2)}" fill="#fff" opacity=".9"/></g>`; }
  return `<defs>${lg("lfBg", [[0, "#F2FFB0"], [.45, "#9BE07A"], [1, "#3E9A52"]])}</defs><g transform="translate(960 1100) rotate(${n2(-9 * (1 - lift))}) translate(-960 ${n2(-1100 + 60 * (1 - lift))})"><rect x="-400" y="-400" width="2720" height="1900" fill="url(#lfBg)"/>${cells}
    <path d="M960 1300 Q${n2(950)} 600 960 -300" fill="none" stroke="#EAFBC8" stroke-width="46" stroke-linecap="round" opacity=".8"/>${veins}${drops}</g>
    <g style="mix-blend-mode:screen" opacity="${n2(.45 + .4 * lift)}"><ellipse cx="960" cy="-80" rx="1100" ry="520" fill="#FFF6B8" filter="url(#b60)"/><path d="M500 -100 L760 -100 L560 1200 L120 1200z M1100 -100 L1300 -100 L1500 1200 L1100 1200z" fill="#FFF3B8" opacity=".35" filter="url(#b30)"/></g>`; }
SC.shrink = (t, s) => { const td = MK("dive"), tR = MK("toRoot"), tS = MK("toStem"), tLf = MK("toLeaf"), tUp = MK("leafUp");
  const inRoot = LT("a603") + 1.3, toG = tS, inLeaf = LT("a605") + 1.0;
  let out;
  if (t < inRoot) { // the wet soil; then we go in through the root
    const fall = eo((t - td) / 3.2), app = ei((t - tR) / (inRoot - tR)), z = lerp(.7, 1.0, fall) * lerp(1, 7, app), cx = lerp(1300, 960, fall), cy = lerp(-250, 545, fall) + 20 * Math.sin(t * .6);
    out = bg("soil") + CAM(soilWorld(t), z, cx, cy) + `<rect width="1920" height="1080" fill="#F6EFD2" opacity="${n2(ss(.72, 1, app))}"/>`;
  } else if (t < inLeaf) { const g = ss(tS - .6, tS + 1.4, t), v = (t - inRoot) * 300, open = ei((t - (inLeaf - 1.1)) / 1.1);
    out = `<g transform="translate(960 540) scale(${n2(1 + 1.6 * open)}) translate(-960 -540)">${tunnel(t, v, g)}</g>` + `<rect width="1920" height="1080" fill="#F2FFB0" opacity="${n2(ss(.6, 1, open))}"/>` + `<rect width="1920" height="1080" fill="#F6EFD2" opacity="${n2(1 - ss(inRoot, inRoot + .5, t))}"/>`;
  } else { const lift = ss(tLf + .2, s.t1 - 1.0, t);
    out = leafInside(t, lift) + `<rect width="1920" height="1080" fill="#F2FFB0" opacity="${n2(1 - ss(inLeaf, inLeaf + .6, t))}"/>`; }
  const specks = Array.from({ length: 20 }, (_, i) => { const x = (hash(i, 2) * 2100 + t * (6 + hash(i, 4) * 10)) % 2100 - 90, y = (hash(i, 6) * 1100 + 1100 - t * (4 + hash(i, 8) * 8)) % 1100; return `<circle cx="${n2(x)}" cy="${n2(y)}" r="${n2(2 + hash(i, 3) * 4)}" fill="#FFF3DC" opacity="${n2(.2 + .3 * hash(i, 5))}"/>`; }).join("");
  const tHands = LT("a602") - .4, txt = "You: too small to see";
  return out + specks + `<rect width="1920" height="1080" fill="none" stroke="${P.sun}" stroke-width="26" opacity=".16" filter="url(#b10)"/>`
    + OP(ramp(t, td + 1.2, .5), `<g transform="translate(60 60)"><rect x="0" y="0" width="${n2(tw(txt, 30, 600) + 60)}" height="58" rx="29" fill="${P.ink}" opacity=".8"/>${T(30, 39, txt, 30, "#fff", { a: "start", w: 600 })}</g>`)
    + OP(ramp(t, td + 1.2, .4) * (1 - ramp(t, td + 3.6, .4)), speeded(t, 0, 1e9, 1700, 80))
    + OP(ramp(t, tHands, .5), TF(600, 1050 + 60 * (1 - ramp(t, tHands, .6)) + 6 * Math.sin(t * 1.1), 1.0, `<g transform="rotate(14)">${countHand(5)}</g>`) + TF(1320, 1050 + 60 * (1 - ramp(t, tHands, .6)) + 6 * Math.sin(t * 1.1 + 1), 1.0, `<g transform="scale(-1 1) rotate(14)">${countHand(5)}</g>`) + youPill(960, 1020, 1.1))
    + bookCaption(t, "a606", "Plants need water to make food.", 190, { size: 60 })
    + OP(1 - ss(td + .1, td + 1.3, t), `<rect width="1920" height="1080" fill="#2A1A10"/>`) + vignette(.5); };
})(); }
