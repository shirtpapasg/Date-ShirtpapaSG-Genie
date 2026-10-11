/* ================= FULL VIDEO: beats 1–3 ================= */
const O1 = 29.67, O2 = 59.94, O3 = 87.22, END = 126.3;

/* ---------- Scene C build (PM2.5) ---------- */
seed = 404;
const cParts = [];
for (let i = 0; i < 90; i++) cParts.push({x: rnd() * 1920, y: rnd() * 1080, r: 1 + rnd() * 3, vx: 6 + rnd() * 16, ph: rnd() * 6.28, e: el("circle", {fill: "#e9dcc4"}, $("cBg"))});
// hair vs particle scale
const cs = $("cScale");
const hairG = el("g", {opacity: 0}, cs);
const hairGrad = el("radialGradient", {id: "hairGrad"}, $("v").querySelector("defs"));
el("stop", {offset: "0", "stop-color": "#a07a52"}, hairGrad); el("stop", {offset: "1", "stop-color": "#5e4027"}, hairGrad);
const hair = el("circle", {cx: 720, cy: 420, r: 230, fill: "url(#hairGrad)", stroke: "#c79c6d", "stroke-width": 4}, hairG);
for (let i = 0; i < 9; i++) el("path", {d: `M${560 + i * 35} ${260 + Math.abs(4 - i) * 12} q 20 160 0 ${320 - Math.abs(4 - i) * 24}`, stroke: "#c79c6d", "stroke-opacity": .35, "stroke-width": 3, fill: "none"}, hairG);
const ht = el("text", {x: 720, y: 712, "text-anchor": "middle", "font-size": 40, "font-weight": 800, fill: "#fff"}, hairG); ht.textContent = "Human hair";
const ht2 = el("text", {x: 720, y: 758, "text-anchor": "middle", "font-size": 30, "font-weight": 600, fill: "#cfe3ec"}, hairG); ht2.textContent = "about 50–70 micrometres wide";
const pmG = el("g", {opacity: 0}, cs);
const pmRing = el("circle", {cx: 1330, cy: 420, r: 20, fill: "none", stroke: "#ffcf5a", "stroke-width": 3}, pmG);
el("circle", {cx: 1330, cy: 420, r: 9, fill: "#ffcf5a"}, pmG);
const pt = el("text", {x: 1330, y: 712, "text-anchor": "middle", "font-size": 40, "font-weight": 800, fill: "#ffcf5a"}, pmG); pt.textContent = "PM2.5 particle";
const pt2 = el("text", {x: 1330, y: 758, "text-anchor": "middle", "font-size": 30, "font-weight": 600, fill: "#cfe3ec"}, pmG); pt2.textContent = "2.5 micrometres or smaller";
const cmpG = el("g", {opacity: 0, "text-anchor": "middle"}, cs);
const cmpT = el("text", {x: 1080, y: 300, "font-size": 54, "font-weight": 900, fill: "#fff"}, cmpG); cmpT.textContent = "≈ 30× thinner";
el("path", {d: "M990 340 L1250 410", stroke: "#fff", "stroke-width": 4, "stroke-dasharray": "10 10", fill: "none"}, cmpG);
el("path", {d: "M1250 410 l-26 -2 l12 -16 z", fill: "#fff"}, cmpG);

// lungs diagram
const lg = $("cLungs"); lg.setAttribute("opacity", 0);
const lobeL = "M935 380 C 860 360 760 380 700 470 C 640 560 640 660 690 700 C 740 735 840 720 900 690 C 935 670 945 600 945 520 Z";
const lobeR = "M985 380 C 1060 360 1160 380 1220 470 C 1280 560 1280 660 1230 700 C 1180 735 1080 720 1020 690 C 985 670 975 600 975 520 Z";
el("path", {d: "M610 650 C 760 620 1160 620 1310 650", stroke: "#e04848", "stroke-width": 16, fill: "none", "stroke-linecap": "round", opacity: .9}, lg);
el("path", {d: lobeL, fill: "#f2b6b0", stroke: "#ffe0dc", "stroke-width": 4}, lg);
el("path", {d: lobeR, fill: "#f2b6b0", stroke: "#ffe0dc", "stroke-width": 4}, lg);
el("rect", {x: 943, y: 150, width: 34, height: 250, rx: 16, fill: "#e8a29b", stroke: "#ffe0dc", "stroke-width": 3}, lg);
const bronchi = ["M960 395 C 930 420 880 440 830 470", "M960 395 C 990 420 1040 440 1090 470", "M830 470 C 800 500 780 540 770 600", "M830 470 C 850 510 860 560 860 620", "M1090 470 C 1120 500 1140 540 1150 600", "M1090 470 C 1070 510 1060 560 1060 620", "M800 520 l-50 30", "M1120 520 l50 30", "M860 560 l40 40", "M1060 560 l-40 40"];
bronchi.forEach((d, i) => el("path", {d, stroke: "#b8574f", "stroke-width": i < 2 ? 12 : i < 6 ? 8 : 5, fill: "none", "stroke-linecap": "round"}, lg));
const lbl = (x, y, txt, anchor, col) => { const t = el("text", {x, y, "text-anchor": anchor, "font-size": 32, "font-weight": 800, fill: col || "#fff"}, lg); t.textContent = txt; return t; };
const lb1 = lbl(1010, 200, "nose & throat can’t stop it", "start");
const lb2 = lbl(1250, 470, "deep in the lungs", "start");
const lb3 = lbl(1330, 662, "some reach the blood", "start", "#ff8f8f");
seed = 77;
const lParts = [];
for (let i = 0; i < 46; i++) {
  const side = rnd() < .5 ? -1 : 1;
  const tx = 960 + side * (60 + rnd() * 190), ty = 470 + rnd() * 200;
  lParts.push({t0: rnd() * 7, side, tx, ty, blood: i % 5 === 0, e: el("circle", {r: 6, fill: "#ffcf5a", stroke: "#5a4300", "stroke-width": 1.5, opacity: 0}, lg)});
}
// PSI + effects
const pg = $("cPSI"); pg.setAttribute("opacity", 0);
const chips = [["Stinging eyes", 380], ["Asthma flare-ups", 960], ["Cut outdoor activity", 1540]].map(([txt, x], i) => {
  const g = el("g", {opacity: 0}, pg);
  const w = 30 + txt.length * 19;
  el("rect", {x: x - w / 2, y: 190, width: w, height: 70, rx: 35, fill: "#fff"}, g);
  const t = el("text", {x, y: 236, "text-anchor": "middle", "font-size": 34, "font-weight": 800, fill: "#0f2633"}, g); t.textContent = txt;
  return g;
});
const bands = [["0–50", "Good", "#3fae5a"], ["51–100", "Moderate", "#3b8fd9"], ["101–200", "Unhealthy", "#f2c230"], ["201–300", "Very unhealthy", "#f08a2b"], ["300+", "Hazardous", "#d9443b"]];
const psiG = el("g", {opacity: 0}, pg);
const pt0 = el("text", {x: 210, y: 380, "font-size": 34, "font-weight": 800, fill: "#fff", "letter-spacing": 3}, psiG); pt0.textContent = "PSI (Pollutant Standards Index)";
bands.forEach(([r, n, c], i) => {
  const x = 210 + i * 300;
  el("rect", {x: x + 3, y: 410, width: 294, height: 90, rx: i === 0 ? 14 : 4, fill: c}, psiG);
  const a = el("text", {x: x + 150, y: 468, "text-anchor": "middle", "font-size": 36, "font-weight": 900, fill: "#0f2633"}, psiG); a.textContent = r;
  const b = el("text", {x: x + 150, y: 550, "text-anchor": "middle", "font-size": 30, "font-weight": 700, fill: "#fff"}, psiG); b.textContent = n;
});
const src = el("text", {x: 1710, y: 620, "text-anchor": "end", "font-size": 24, "font-weight": 600, fill: "#9fb9c6"}, psiG); src.textContent = "Bands: National Environment Agency (NEA)";
const needle = el("path", {d: "M0 0 l-18 -30 h36 z", fill: "#fff"}, psiG);

/* ---------- Scene D extras on the map (Beat 2) ---------- */
const windG = el("g", {opacity: 0}, $("camB"));
const winds = [];
[[96.5, -3.5], [99.5, -5.5], [103, -6.5], [107, -7.2], [98.5, 0.0], [110.5, -4.6], [101.5, -2.0], [113.5, -6.4], [95.5, 1.5]].forEach(([lon, lat]) => {
  const a = P(lon, lat), b = P(lon + 3.2, lat + 2.6);
  const p = el("path", {d: `M${a[0]} ${a[1]} Q ${(a[0] + b[0]) / 2 + 20} ${(a[1] + b[1]) / 2 + 20} ${b[0]} ${b[1]}`, stroke: "#9fe3ff", "stroke-width": 7, fill: "none", "stroke-linecap": "round", "stroke-dasharray": "36 22"}, windG);
  const ang = Math.atan2(b[1] - a[1], b[0] - a[0]) * 180 / Math.PI;
  el("path", {d: "M0 0 l-24 -13 l0 26 z", fill: "#9fe3ff", transform: `translate(${b[0]} ${b[1]}) rotate(${ang})`}, windG);
  winds.push(p);
});
const windChip = el("g", {opacity: 0}, $("captions").parentNode.insertBefore(el("g", {}), $("captions")));
el("rect", {x: 1290, y: 72, width: 550, height: 104, rx: 18, fill: "#0b2430", "fill-opacity": .85, stroke: "#9fe3ff", "stroke-width": 3}, windChip);
const wc1 = el("text", {x: 1318, y: 116, "font-size": 32, "font-weight": 900, fill: "#9fe3ff", "letter-spacing": 2}, windChip); wc1.textContent = "SOUTHWEST MONSOON";
const wc2 = el("text", {x: 1318, y: 156, "font-size": 28, "font-weight": 600, fill: "#fff"}, windChip); wc2.textContent = "around June to October";
const dryChip = el("g", {opacity: 0}, windChip.parentNode);
el("rect", {x: 1290, y: 72, width: 550, height: 104, rx: 18, fill: "#3a1d0b", "fill-opacity": .85, stroke: "#ff9a4d", "stroke-width": 3}, dryChip);
const dc1 = el("text", {x: 1318, y: 116, "font-size": 32, "font-weight": 900, fill: "#ffb27a", "letter-spacing": 2}, dryChip); dc1.textContent = "DRY SEASON FIRES";
const dc2 = el("text", {x: 1318, y: 156, "font-size": 28, "font-weight": 600, fill: "#fff"}, dryChip); dc2.textContent = "Sumatra & Kalimantan, Indonesia";
// delivery truck
const truck = el("g", {opacity: 0}, $("camB"));
el("rect", {x: -46, y: -30, width: 60, height: 40, rx: 4, fill: "#fff"}, truck);
el("path", {d: "M14 -20 h20 l12 14 v16 h-32 z", fill: "#9fe3ff"}, truck);
el("circle", {cx: -30, cy: 12, r: 9, fill: "#123a4a", stroke: "#fff", "stroke-width": 3}, truck);
el("circle", {cx: 30, cy: 12, r: 9, fill: "#123a4a", stroke: "#fff", "stroke-width": 3}, truck);
const truckT = el("text", {x: -16, y: -6, "text-anchor": "middle", "font-size": 13, "font-weight": 900, fill: "#123a4a"}, truck); truckT.textContent = "SMOKE";

/* ---------- Scene E build (peat) ---------- */
seed = 12;
const eT = $("eTrees");
for (let i = 0; i < 26; i++) {
  const x = 20 + i * 75 + rnd() * 30, h = 120 + rnd() * 110;
  el("rect", {x: x - 5, y: 340 - h, width: 10, height: h, fill: "#3d4a36"}, eT);
  el("ellipse", {cx: x, cy: 340 - h, rx: 34 + rnd() * 20, ry: 26 + rnd() * 12, fill: rnd() > .5 ? "#4f6b45" : "#5c7a4f"}, eT);
}
const eF = $("eFire");
const efGlow = el("ellipse", {cx: 1450, cy: 330, rx: 160, ry: 70, fill: "url(#fireGlow)"}, eF);
const efUnder = el("ellipse", {cx: 1450, cy: 420, rx: 200, ry: 60, fill: "url(#fireGlow)", opacity: .7}, eF);
const LAYERS = 8, LT = 340, LB = 800, LH = (LB - LT) / LAYERS;
const layerCols = ["#2f2117", "#38281b", "#41301f", "#4a3622", "#543d26", "#5e452b", "#684d30", "#735536"];
const layers = [];
for (let i = 0; i < LAYERS; i++) {
  const y = LB - (i + 1) * LH;
  const g = el("g", {opacity: 0}, $("eLayers"));
  el("rect", {x: 0, y, width: 1920, height: LH + 1, fill: layerCols[i]}, g);
  for (let j = 0; j < 40; j++) { const x = rnd() * 1920, yy = y + 6 + rnd() * (LH - 12); el("path", {d: `M${x} ${yy} q ${18 + rnd() * 20} ${-6 + rnd() * 12} ${40 + rnd() * 30} 0`, stroke: "#9b7a52", "stroke-opacity": .45, "stroke-width": 3, fill: "none"}, g); }
  layers.push({g, y});
}
const leaves = [];
for (let i = 0; i < 60; i++) leaves.push({x: rnd() * 1920, ph: rnd(), e: el("ellipse", {rx: 12, ry: 5, fill: rnd() > .5 ? "#6b8a4f" : "#8a7a3f", opacity: 0}, $("eLeaves"))});
const carbons = [];
for (let i = 0; i < 34; i++) {
  const g = el("g", {opacity: 0}, $("eCarbon"));
  const x = 80 + rnd() * 1760, y = 380 + rnd() * 390;
  el("circle", {cx: x, cy: y, r: 22, fill: "#111", stroke: "#ffcf5a", "stroke-width": 3}, g);
  const t = el("text", {x, y: y + 9, "text-anchor": "middle", "font-size": 26, "font-weight": 900, fill: "#ffcf5a"}, g); t.textContent = "C";
  carbons.push({g, d: rnd()});
}
// side arrow: older at bottom, newer at top
const side = $("eSide"); side.setAttribute("opacity", 0);
el("rect", {x: 40, y: 360, width: 300, height: 420, rx: 16, fill: "#000", "fill-opacity": .45}, side);
el("path", {d: "M80 750 V 400", stroke: "#ffcf5a", "stroke-width": 6}, side);
el("path", {d: "M80 385 l-14 26 h28 z", fill: "#ffcf5a"}, side);
[["newer", 430], ["thousands", 560], ["of years", 600], ["older", 740]].forEach(([s, y], i) => { const t = el("text", {x: 108, y, "font-size": i === 1 || i === 2 ? 36 : 30, "font-weight": i === 1 || i === 2 ? 900 : 700, fill: i === 1 || i === 2 ? "#ffcf5a" : "#fff"}, side); t.textContent = s; });
// chips
const eChips = [["Waterlogged swamp: always wet", "#4fa3d9"], ["Plants never fully rot", "#8fd18a"], ["Huge carbon store", "#ffcf5a"]].map(([txt, c], i) => {
  const g = el("g", {opacity: 0}, $("eChips"));
  const w = 40 + txt.length * 19, x = 1880 - w;
  el("rect", {x, y: 60 + i * 86, width: w, height: 68, rx: 34, fill: "#0f2633", "fill-opacity": .88, stroke: c, "stroke-width": 3}, g);
  const t = el("text", {x: x + w / 2, y: 106 + i * 86, "text-anchor": "middle", "font-size": 32, "font-weight": 800, fill: c}, g); t.textContent = txt;
  return g;
});

/* ---------- extra captions ---------- */
[
  {t0: O1 + 1.4,  t1: O1 + 9.8,  text: "What are you actually breathing?", size: 72},
  {t0: O1 + 9.9,  t1: O1 + 15.4, text: "Tiny enough to slip past your defences", size: 68},
  {t0: O1 + 15.6, t1: O1 + 24.6, text: "PM2.5 travels deep into your lungs", size: 68, sub: {t: O1 + 19.5, text: "…and some can pass into your blood."}},
  {t0: O1 + 24.8, t1: O1 + 29.9, text: "When the PSI climbs, cut outdoor activity", size: 64},
  {t0: O2 + 0.9,  t1: O2 + 9.6,  text: "Where does it come from? Not Singapore.", size: 68},
  {t0: O2 + 9.8,  t1: O2 + 16.9, text: "Monsoon winds carry the smoke to us", size: 68},
  {t0: O2 + 17.2, t1: O2 + 22.2, text: "The wind is the delivery truck…", size: 72},
  {t0: O2 + 22.4, t1: O2 + 26.9, text: "…not the cause.", size: 80},
  {t0: O3 + 0.8,  t1: O3 + 11.0, text: "The part most people never learn…", size: 72},
  {t0: O3 + 11.3, t1: O3 + 14.6, text: "These fires burn in PEAT", size: 76},
  {t0: O3 + 14.8, t1: O3 + 22.4, text: "Peat: dead plants piled up over thousands of years", size: 60},
  {t0: O3 + 22.6, t1: O3 + 30.2, text: "…in swamps that are always waterlogged", size: 64},
  {t0: O3 + 30.5, t1: O3 + 34.4, text: "Always wet, so plants never fully rot", size: 68},
  {t0: O3 + 34.6, t1: O3 + 38.0, text: "Peat stores huge amounts of carbon", size: 68},
].forEach(c => {
  caps.push(c);
  c.g = el("g", {opacity: 0}, $("captions"));
  c.m = el("text", {x: 96, y: 930, "font-size": c.size, "font-weight": 800, fill: "#fff", "letter-spacing": "-1"}, c.g); c.m.textContent = c.text;
  if (c.sub) { c.s = el("text", {x: 100, y: 1000, "font-size": 46, "font-weight": 600, fill: "#ffe9cf", opacity: 0}, c.g); c.s.textContent = c.sub.text; }
});

/* ---------- Full render ---------- */
window.render = function (t) {
  renderOpening(Math.min(t, O1 - 0.02));
  const flick = 1 + .12 * Math.sin(t * 17) + .08 * Math.sin(t * 29 + 1);

  // scene visibility
  const inC = ramp(t, O1 - .35, O1 + .35) * (1 - ramp(t, O2 - .35, O2 + .35));
  const inD = ramp(t, O2 - .35, O2 + .35) * (1 - ramp(t, O3 - .35, O3 + .35));
  const inE = ramp(t, O3 - .35, O3 + .35);
  if (t >= O1 - .35) $("sceneB").setAttribute("opacity", t < O2 - .35 ? 1 - inC : inD);
  $("sceneC").setAttribute("opacity", inC);
  $("sceneE").setAttribute("opacity", inE);

  // ---- Scene C (Beat 1)
  if (inC > 0) {
    const c = t - O1;
    cParts.forEach(p => { p.e.setAttribute("cx", ((p.x + p.vx * c) % 1960) - 20); p.e.setAttribute("cy", p.y + Math.sin(c + p.ph) * 8); p.e.setAttribute("r", p.r); p.e.setAttribute("opacity", .35); });
    const title = ramp(c, 4.2, 5.0) * (1 - ramp(c, 9.4, 9.9));
    $("cTitle").setAttribute("opacity", title);
    $("cTitle").setAttribute("transform", `translate(960 450) scale(${.9 + .1 * ramp(c, 4.2, 5.4)}) translate(-960 -450)`);
    $("cSub").setAttribute("opacity", ramp(c, 5.6, 6.2));
    const sc = 1 - ramp(c, 15.1, 15.6);
    hairG.setAttribute("opacity", ramp(c, 9.9, 10.5) * sc);
    pmG.setAttribute("opacity", ramp(c, 11.2, 11.7) * sc);
    cmpG.setAttribute("opacity", ramp(c, 12.4, 12.9) * sc);
    const pr = ((c - 11.2) % 1.2) / 1.2; pmRing.setAttribute("r", 12 + pr * 30); pmRing.setAttribute("opacity", c > 11.2 ? 1 - pr : 0);
    const lungOn = ramp(c, 15.5, 16.1) * (1 - ramp(c, 24.3, 24.8));
    lg.setAttribute("opacity", lungOn);
    lb1.setAttribute("opacity", ramp(c, 16.5, 17)); lb2.setAttribute("opacity", ramp(c, 18.0, 18.5)); lb3.setAttribute("opacity", ramp(c, 19.6, 20.1));
    lParts.forEach(p => {
      const k = (c - 16 - p.t0) / 2.6;
      if (k < 0) { p.e.setAttribute("opacity", 0); return; }
      let x, y;
      if (k < .4) { const q = k / .4; x = 960 + Math.sin(q * 9 + p.tx) * 6; y = lerp(140, 395, q); }
      else if (k < 1) { const q = ease((k - .4) / .6); x = lerp(960, p.tx, q); y = lerp(395, p.ty, q); }
      else if (p.blood) { const q = ease(clamp(k - 1)); x = p.tx; y = lerp(p.ty, 648, q); }
      else { x = p.tx + Math.sin(c * 2 + p.tx) * 3; y = p.ty; }
      p.e.setAttribute("cx", x); p.e.setAttribute("cy", y); p.e.setAttribute("opacity", 1);
      p.e.setAttribute("fill", p.blood && k > 1.3 ? "#ff6b6b" : "#ffcf5a");
    });
    pg.setAttribute("opacity", ramp(c, 24.7, 25.2));
    chips.forEach((g, i) => g.setAttribute("opacity", ramp(c, 25.0 + i * .5, 25.4 + i * .5)));
    psiG.setAttribute("opacity", ramp(c, 26.3, 26.8));
    const nx = lerp(360, 960, ease(ramp(c, 26.8, 29.3)));
    needle.setAttribute("transform", `translate(${nx} 405)`);
  }

  // ---- Scene D (Beat 2) – the same map, now with wind
  if (inD > 0) {
    const d = t - O2;
    $("path1").setAttribute("opacity", 0); $("path2").setAttribute("opacity", 0);
    bk.setAttribute("opacity", 0);
    sgTag.setAttribute("opacity", 1);
    const fireOn = ramp(d, 3.0, 3.8);
    [fire1, fire2].forEach(f => { f.g.setAttribute("opacity", fireOn); f.glow.setAttribute("r", 60 * flick); });
    dryChip.setAttribute("opacity", ramp(d, 3.2, 3.7) * (1 - ramp(d, 9.4, 9.8)));
    const w = ramp(d, 9.8, 10.6);
    windG.setAttribute("opacity", w); windChip.setAttribute("opacity", ramp(d, 10.0, 10.5));
    winds.forEach(p => p.setAttribute("stroke-dashoffset", -d * 90));
    puffs.forEach(p => {
      const k = ((d * .2 + p.ph) % 1);
      const dirX = 300 * (.35 + .65 * w), dirY = -380 * (.35 + .65 * w);
      p.e.setAttribute("cx", p.src[0] + dirX * k + (p.dx - 240) * .2 * k);
      p.e.setAttribute("cy", p.src[1] + dirY * k + (p.dy + 270) * .2 * k);
      p.e.setAttribute("r", p.r * (.6 + k * 1.6));
      p.e.setAttribute("opacity", fireOn * .5 * Math.sin(k * Math.PI));
    });
    const tr = ramp(d, 17.2, 21.4);
    truck.setAttribute("opacity", ramp(d, 17.0, 17.4) * (1 - ramp(d, 21.6, 22.0)));
    truck.setAttribute("transform", `translate(${lerp(F1[0], SG[0] - 10, tr)} ${lerp(F1[1], SG[1] + 40, tr) - 16}) scale(1.4)`);
    const cause = ramp(d, 22.3, 22.8);
    [fire1, fire2].forEach(f => f.glow.setAttribute("r", 60 * flick * (1 + .8 * cause)));
  } else { windG.setAttribute("opacity", 0); windChip.setAttribute("opacity", 0); dryChip.setAttribute("opacity", 0); truck.setAttribute("opacity", 0); }

  // ---- Scene E (Beat 3) – peat
  if (inE > 0) {
    const e = t - O3;
    efGlow.setAttribute("rx", 160 * flick); efGlow.setAttribute("opacity", 1 - .6 * ramp(e, 14, 16));
    efUnder.setAttribute("opacity", ramp(e, 4, 6) * (1 - .6 * ramp(e, 14, 16)) * (.6 + .3 * flick));
    $("eQ").setAttribute("opacity", ramp(e, 5.0, 5.6) * (1 - ramp(e, 10.8, 11.3)));
    $("ePeat").setAttribute("opacity", ramp(e, 11.3, 11.8) * (1 - ramp(e, 14.4, 14.9)));
    // layers stack bottom-up from 14.6 to 24
    layers.forEach((L, i) => { const a = ramp(e, 14.6 + i * 1.15, 15.3 + i * 1.15); L.g.setAttribute("opacity", a); L.g.setAttribute("transform", `translate(0 ${(1 - a) * -30})`); });
    const ground = 1 - ramp(e, 14.0, 14.6) * .55;
    $("eGround").setAttribute("opacity", ground);
    leaves.forEach(l => {
      const k = ((e * .35 + l.ph) % 1);
      const fill = clamp((e - 14.6) / (LAYERS * 1.15));
      const topY = LB - fill * (LB - LT);
      l.e.setAttribute("cx", l.x + Math.sin(k * 8 + l.x) * 20);
      l.e.setAttribute("cy", lerp(220, topY, k));
      l.e.setAttribute("opacity", ramp(e, 14.6, 15.2) * (1 - ramp(e, 24.5, 25.5)) * Math.min(1, (1 - k) * 4));
    });
    $("eSide").setAttribute("opacity", ramp(e, 15.5, 16.2));
    // water table rises 22.6 -> 26
    const wl = lerp(LB, LT + 24, ease(ramp(e, 22.6, 26.0)));
    let wd = `M0 ${LB} L0 ${wl}`;
    for (let x = 0; x <= 1920; x += 40) wd += ` L${x} ${wl + Math.sin(x / 70 + e * 2) * 6}`;
    wd += ` L1920 ${LB} Z`;
    $("eWater").setAttribute("d", wd); $("eWater").setAttribute("opacity", .38 * ramp(e, 22.6, 23.2));
    eChips[0].setAttribute("opacity", ramp(e, 23.0, 23.5));
    eChips[1].setAttribute("opacity", ramp(e, 30.5, 31.0));
    eChips[2].setAttribute("opacity", ramp(e, 34.6, 35.1));
    carbons.forEach(cb => cb.g.setAttribute("opacity", ramp(e, 34.8 + cb.d * 1.6, 35.2 + cb.d * 1.6) * (.75 + .25 * Math.sin(e * 3 + cb.d * 9))));
  }

  // ---- captions + fades (real time)
  caps.forEach(c => {
    const a = ramp(t, c.t0, c.t0 + .45) * (1 - ramp(t, c.t1 - .35, c.t1));
    c.g.setAttribute("opacity", a);
    c.g.setAttribute("transform", `translate(0 ${(1 - ramp(t, c.t0, c.t0 + .45)) * 18})`);
    if (c.s) c.s.setAttribute("opacity", ramp(t, c.sub.t, c.sub.t + .45));
  });
  $("tag").setAttribute("opacity", ramp(t, .2, 1));
  $("fade").setAttribute("opacity", Math.max(1 - ramp(t, 0, .6), ramp(t, END - .7, END)));
};
