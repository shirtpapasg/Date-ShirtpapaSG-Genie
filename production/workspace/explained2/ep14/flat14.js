// flat14.js: EP14's sets and props, Part 1 (Stage 2, drawn 2026-11-22 to the teacher's 22 Nov quality standard). Loaded after pics.js.
// THE WINDOW'S VIEW skyView(h, t, o): a function of the clock (h = hours, any number: 31 = 7 am the next day). Native 1660 x 1000, origin top
//   left: the sky, the Sun (a soft drawing: it rises behind the far blocks in this EAST window and leaves the top; it never sets here), far HDB
//   blocks whose windows light up and go out one by one, clouds by day, stars and a plane's light by night, birds at dawn, the road junction
//   below with its small traffic light, street lamps and a bus, and (o.tree) the rain tree with the little OWL asleep on its branch.
// THE LIVING ROOM BG.flat (baked: wall, floor, sofa, low table, clock face, door, school bag) + VF(t, o, cam) live: the light of the hour
//   (o.dark, o.sun), the window (view, frame, grille), the curtains (o.curt 0 open .. 1 drawn), the ceiling fan, the clock's hands, the globe
//   and the torch on its four books on the low table, the sunbeams and their dust.
// PROPS: owlArt, globe14 (a true orthographic globe: EXACTLY the half that faces the torch is lit), torch14, books4, trafficLight, pencilPic,
//   hen / chick / teddy picture cards, sky tiles. Buddies are never drawn here (sprites only, lib.js buddy()).
const XDEFS14 = () => `${lg("f14Wall", [[0, "#FCEFD8"], [1, "#F3DDB8"]])}${lg("f14Floor", [[0, "#E7D6BC"], [1, "#CDB693"]])}${lg("f14Sofa", [[0, "#9DB2E8"], [1, "#6F86C9"]])}${lg("f14SofaD", [[0, "#7C92D2"], [1, "#566DB0"]])}
  ${lg("f14Wood", [[0, "#D9A56A"], [1, "#A9703C"]])}${lg("f14WoodD", [[0, "#A9703C"], [1, "#7E4F27"]])}${lg("f14Curt", [[0, "#FFC9AE"], [1, "#F49B7E"]])}${rg("f14Sea", [[0, "#8FD8FF"], [.6, "#4AA3EE"], [1, "#2B6FCB"]], .38, .32, .8)}
  ${lg("f14Term", [[0, "#0A1035", 0], [.42, "#0A1035", 0], [.58, "#0A1035", .8], [1, "#0A1035", .86]], 1, 0)}${lg("f14Torch", [[0, "#5FD3C6"], [1, "#2A9D90"]])}${lg("f14Beam", [[0, "#FFF6C8", .75], [1, "#FFF6C8", .12]], 1, 0)}
  ${rg("f14SunG", [[0, "#FFF6C0", 1], [.35, "#FFE27A", .7], [1, "#FFD75A", 0]])}${lg("f14Owl", [[0, "#B98556"], [1, "#8A5C36"]])}${lg("f14Rug", [[0, "#F7A8A0"], [1, "#EE8478"]])}${lg("f14Door", [[0, "#C9E3DD"], [1, "#A5CCC4"]])}
  ${lg("g14Sky", [[0, "#6FC1FF"], [.65, "#CBEBFF"], [1, "#F3FBF0"]])}${lg("g14Grass", [[0, "#A6DE7E"], [1, "#6DBB58"]])}${lg("g14Hen", [[0, "#C08A52"], [1, "#96633A"]])}${lg("g14HenP", [[0, "#DCC6A6"], [1, "#BCA07C"]])}${lg("g14Chick", [[0, "#FFE08A"], [1, "#EEB95A"]])}
  ${lg("g14Trunk", [[0, "#A9774A"], [1, "#7A5230"]], 1, 0)}${rg("g14Egg", [[0, "#FFFDF4"], [.7, "#F6E6C8"], [1, "#E2C79C"]], .38, .3, .8)}${lg("g14Soil", [[0, "#9B6B45"], [1, "#77502F"]])}${lg("g14Block", [[0, "#FFF4E2"], [1, "#F2DFC0"]])}
  ${rg("g14EggIn", [[0, "#FFD9A0"], [.45, "#FF9F6B"], [.8, "#E8604E"], [1, "#8E2F2A"]])}${lg("g14Mango", [[0, "#FFD75A"], [.6, "#FFA53A"], [1, "#F0703A"]])}${rg("g14Dapple", [[0, "#FFF9C8", .5], [1, "#FFF9C8", 0]])}
  <filter id="b6"><feGaussianBlur stdDeviation="6"/></filter><filter id="b16"><feGaussianBlur stdDeviation="16"/></filter>`;
const mixH = (a, b, u) => hexL(a, b, u);
const bump = (h, a0, a1, b0, b1) => ss(a0, a1, h) * (1 - ss(b0, b1, h));
const h24 = (h) => ((h % 24) + 24) % 24;

/* ====================================================================================================================================
   THE WINDOW'S VIEW (east). skyView(h, t, o): o.tree (the rain tree), o.owl {open, wink, look} | false, o.sun = false (hide), o.noGround
   ==================================================================================================================================== */
const SKYK = [[0, "#0B1030", "#121A45", "#1B2456"], [5.6, "#0E1438", "#1A2358", "#2A2F6E"], [6.4, "#243A7A", "#6C6FA8", "#F2A77A"], [7.0, "#5B8FD0", "#BFD6EA", "#FFD49A"], [8.2, "#5FB2F2", "#9FD3F8", "#DDF0FB"], [12, "#4AA8F5", "#8ACBF9", "#CFEAFB"],
  [16.5, "#58AEEF", "#A5D3F2", "#F3E6C8"], [18.3, "#6B8FD6", "#E7B79A", "#FFC98A"], [19.0, "#3B4C9C", "#9A6FA0", "#F29C7A"], [19.6, "#1A2260", "#3A3A80", "#6E5A8E"], [20.5, "#0B1030", "#121A45", "#1B2456"], [24, "#0B1030", "#121A45", "#1B2456"]];
function skyCols(h) { h = h24(h); let i = 0; while (i < SKYK.length - 2 && SKYK[i + 1][0] <= h) i++; const a = SKYK[i], b = SKYK[i + 1], u = (h - a[0]) / (b[0] - a[0]); return [1, 2, 3].map((k) => mixH(a[k], b[k], u)); }
const nightK = (h) => { h = h24(h); return h < 12 ? 1 - ss(5.9, 7.0, h) : ss(18.9, 20.2, h); };
const litFrac = (h) => { h = h24(h); return h < 12 ? .1 + .22 * ss(5.3, 6.2, h) - .32 * ss(6.3, 7.15, h) : .62 * ss(19.2, 20.6, h) - .52 * ss(21.5, 24, h); };
const SKB = [[40, 210, 420, "#F6A38F", 0], [270, 130, 330, "#8FD3C8", 1], [470, 230, 470, "#B9A6FF", 2], [730, 170, 300, "#FFC38A", 3], [930, 200, 400, "#8FC0F2", 4], [1160, 170, 350, "#F6A38F", 5], [1380, 220, 430, "#8FD3C8", 6]];
const SKF = [[150, 150, 250], [520, 100, 220], [640, 160, 280], [880, 90, 230], [1100, 130, 260], [1320, 120, 210], [1520, 140, 270]];
const sunXY = (h) => { h = h24(h); return [430 + (h - 7) * 150, 800 - (h - 6.85) * 300]; };
function skyBlock(b, h, N, lf) { const [x, w, hh, acc, id] = b, y = 800 - hh, sil = bump(h24(h), 5.6, 6.5, 7.4, 8.8) * .72, warm = bump(h24(h), 15.5, 17.6, 18.6, 19.4) * .55, cool = (1 - ss(8, 13, h24(h))) * .22 * (1 - N);
  let face = mixH(mixH(mixH("#F7EEDD", "#93A8CE", cool), "#FFDDA6", warm), "#463F6E", sil); face = mixH(face, "#1B2150", N * .86); const ac = mixH(mixH(acc, "#463F6E", sil * .8), "#262C60", N * .8), sh = mixH(face, "#1A1F4A", .22);
  let s = `<rect x="${x}" y="${y}" width="${w}" height="${hh + 10}" rx="6" fill="${face}"/><rect x="${x}" y="${y}" width="${n2(w * .16)}" height="${hh + 10}" rx="6" fill="${sh}"/><rect x="${x - 4}" y="${y - 10}" width="${w + 8}" height="16" rx="6" fill="${ac}"/><rect x="${n2(x + w * .16)}" y="${y + 6}" width="12" height="${hh}" fill="${ac}" opacity=".8"/>`;
  const c0 = x + w * .16 + 26, cols = Math.floor((w * .84 - 34) / 32), rows = Math.floor((hh - 40) / 38), winD = mixH("#86A6C6", "#4E4A7C", sil);
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) { const hv = hash(id * 53 + r * 7 + c, 3), on = hv < lf, wx = c0 + c * 32, wy = y + 30 + r * 38;
    s += on ? `<rect x="${wx}" y="${wy}" width="17" height="19" rx="3" fill="${hv * 37 % 1 < .3 ? "#FFC9A0" : "#FFE08A"}"/>` : `<rect x="${wx}" y="${wy}" width="17" height="19" rx="3" fill="${N > .5 ? "#2B3168" : winD}" opacity="${N > .5 ? 1 : .6}"/>`; }
  return s; }
function skyView(h, t, o = {}) { const hh = h24(h), N = nightK(h), [c0, c1, c2] = skyCols(h), lf = litFrac(h), id = o.id || "sv";
  let s = `<linearGradient id="${id}g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c0}"/><stop offset=".55" stop-color="${c1}"/><stop offset=".82" stop-color="${c2}"/></linearGradient><rect x="-4" y="-4" width="1668" height="1008" fill="url(#${id}g)"/>`;
  // stars (a CLEAR night) and a plane's blinking light
  if (N > .25) { const a = clamp((N - .25) / .6); let st = ""; for (let i = 0; i < 70; i++) { const x = hash(i, 11) * 1660, y = hash(i, 17) * 700, r = 1.6 + 2.8 * hash(i, 5), tw_ = .55 + .45 * Math.sin(t * (1.5 + 2 * hash(i, 9)) + i); st += `<circle cx="${n2(x)}" cy="${n2(y)}" r="${n2(r)}" fill="#FFF9D8" opacity="${n2(tw_)}"/>`; }
    for (const [x, y] of [[300, 150], [820, 90], [1180, 260], [560, 330]]) st += TF(x, y, 1 + .25 * Math.sin(t * 2.2 + x), `<path d="M0 -13 Q2 -2 13 0 Q2 2 0 13 Q-2 2 -13 0 Q-2 -2 0 -13z" fill="#fff"/>`);
    const px = (t * 34 + 200) % 2100 - 200; st += `<circle cx="${n2(px)}" cy="${n2(250 - px * .06)}" r="5" fill="${Math.sin(t * 7) > 0 ? "#FF7A6A" : "#FFF3DC"}"/>`; s += OP(a, st); }
  // the Sun: a soft drawing, behind the far blocks
  if (o.sun !== false && hh > 6.6 && hh < 10.4) { const [sx, sy] = sunXY(h), a = ss(6.6, 6.9, hh); s += OP(a, `<circle cx="${n2(sx)}" cy="${n2(sy)}" r="230" fill="url(#f14SunG)" opacity=".8"/><circle cx="${n2(sx)}" cy="${n2(sy)}" r="62" fill="#FFE98A"/><circle cx="${n2(sx)}" cy="${n2(sy)}" r="62" fill="none" stroke="#FFD25A" stroke-width="6" opacity=".7"/>`); }
  // clouds by day (peach at dawn and dusk)
  if (N < .9 && !o.noClouds) { const cc = mixH("#FFFFFF", "#FFD2B0", bump(hh, 5.5, 6.5, 7.3, 8.4) + ss(17.6, 18.8, hh)), a = (1 - N) * .92; let cl = "";
    [[200, 150, 1], [900, 90, .8], [1350, 210, .65], [-300, 260, .7]].forEach(([x, y, k], i) => { const cx = ((x + t * (9 + 3 * i) + hh * 55) % 2300 + 2300) % 2300 - 320; cl += TF(cx, y, k, `<ellipse cx="0" cy="0" rx="130" ry="34" fill="${cc}"/><ellipse cx="-50" cy="-26" rx="62" ry="40" fill="${cc}"/><ellipse cx="34" cy="-36" rx="76" ry="50" fill="${cc}"/><ellipse cx="96" cy="-12" rx="50" ry="30" fill="${cc}"/>`); }); s += OP(a, cl); }
  // birds at dawn and in the morning (three, crossing one after another)
  if (N < .7 && hh < 11 && !o.noBirds) { let b = ""; for (let i = 0; i < 3; i++) { const u = ((t + i * 2.3) / 7 + i * .31) % 1, bx = -80 + 1840 * u, by = 230 + 70 * i + 30 * Math.sin(u * 9 + i), fl = Math.sin(t * 11 + i * 2); b += `<path d="M${n2(bx - 22)} ${n2(by - 10 * fl)} Q${n2(bx - 9)} ${n2(by - 8 - 6 * fl)} ${n2(bx)} ${n2(by)} Q${n2(bx + 9)} ${n2(by - 8 - 6 * fl)} ${n2(bx + 22)} ${n2(by - 10 * fl)}" fill="none" stroke="${mixH("#3B3560", "#FFFFFF", N * .2)}" stroke-width="6" stroke-linecap="round"/>`; } s += OP(clamp((1 - N) * 1.4) * ss(6.2, 6.6, hh), b); }
  // far hazy blocks, then the near row
  const hz = mixH(mixH("#CFE2F2", "#8E86B8", bump(hh, 5.6, 6.5, 7.4, 8.8) * .8), "#1A2052", N * .82); s += SKF.map(([x, w, bh]) => `<rect x="${x}" y="${800 - bh - 150}" width="${w}" height="${bh + 160}" rx="6" fill="${hz}"/>`).join("");
  s += SKB.map((b) => skyBlock(b, h, N, lf)).join("");
  if (!o.noGround) { // the tree line, the road and its junction, far below
    const g1 = mixH(mixH("#4FA862", "#2F5E5A", bump(hh, 5.6, 6.5, 7.4, 8.8) * .7), "#142A44", N * .8), g2 = mixH(mixH("#6CC27A", "#3B6E66", bump(hh, 5.6, 6.5, 7.4, 8.8) * .7), "#1A3350", N * .8), rd = mixH("#8D94AA", "#2A2F55", N * .8), pv = mixH("#D8D2C4", "#3A3F68", N * .8);
    let g = ""; for (let i = 0; i < 16; i++) g += `<circle cx="${i * 112 - 10}" cy="${n2(826 + 12 * hash(i, 2) + 1.5 * Math.sin(t * .9 + i))}" r="${n2(52 + 22 * hash(i, 4))}" fill="${i % 2 ? g1 : g2}"/>`;
    g += `<rect x="-4" y="850" width="1668" height="154" fill="${g1}"/><rect x="-4" y="872" width="1668" height="14" fill="${pv}"/><rect x="-4" y="886" width="1668" height="74" fill="${rd}"/><rect x="-4" y="960" width="1668" height="14" fill="${pv}"/><path d="M610 960 L560 1004 H800 L760 960z" fill="${rd}"/>`;
    for (let i = 0; i < 14; i++) if (i * 126 < 560 || i * 126 > 790) g += `<rect x="${i * 126 + 20}" y="920" width="60" height="6" rx="3" fill="#fff" opacity="${n2(.75 - .4 * N)}"/>`;
    for (let i = 0; i < 6; i++) g += `<rect x="${n2(600 + i * 30)}" y="930" width="16" height="28" fill="#fff" opacity="${n2(.8 - .4 * N)}"/>`;
    // the bus (it passes now and then) and a car
    const bu = ((t + (o.bus0 || 0)) / 11) % 1, bx = -260 + 2200 * bu; g += TF(bx, 936, 1, `<rect x="-110" y="-64" width="220" height="64" rx="12" fill="${mixH("#F2685A", "#5A2F5E", N * .6)}"/><rect x="-98" y="-54" width="150" height="24" rx="5" fill="${N > .5 ? "#FFE9A8" : "#CFEFFF"}"/><rect x="62" y="-54" width="36" height="30" rx="5" fill="${N > .5 ? "#FFE9A8" : "#CFEFFF"}"/><circle cx="-62" cy="0" r="14" fill="#2B2147"/><circle cx="62" cy="0" r="14" fill="#2B2147"/>${N > .4 ? `<path d="M110 -20 L330 -44 V16 L110 -6z" fill="#FFF3B8" opacity=".45"/><circle cx="108" cy="-14" r="8" fill="#FFF9D8"/>` : ""}`);
    const cu = ((t + 4) / 8) % 1, cx = 1900 - 2200 * cu; g += TF(cx, 902, 1, `<rect x="-52" y="-24" width="104" height="24" rx="9" fill="${mixH("#5B8DEF", "#2A3570", N * .6)}"/><path d="M-30 -24 Q-20 -46 0 -46 H18 Q34 -46 40 -24z" fill="${mixH("#5B8DEF", "#2A3570", N * .6)}"/><circle cx="-28" cy="0" r="9" fill="#2B2147"/><circle cx="28" cy="0" r="9" fill="#2B2147"/>${N > .4 ? `<circle cx="-52" cy="-12" r="6" fill="#FFF9D8"/>` : ""}`);
    // street lamps (on at night, one by one) and the small traffic light at the junction
    [150, 470, 1010, 1330].forEach((x, i) => { const on = ss(19.25 + i * .22, 19.4 + i * .22, hh) + (hh < 6.9 - i * .12 ? 1 : 0); g += `<path d="M${x} 874 V792 q0 -16 22 -16" fill="none" stroke="${mixH("#7C8497", "#3B4270", N)}" stroke-width="7" stroke-linecap="round"/>${on > .05 ? `<circle cx="${x + 24}" cy="778" r="46" fill="#FFE9A8" opacity="${n2(.4 * Math.min(1, on))}"/><circle cx="${x + 24}" cy="778" r="11" fill="#FFF6C8" opacity="${n2(Math.min(1, on))}"/><path d="M${x - 30} 884 L${x + 24} 786 L${x + 90} 884z" fill="#FFE9A8" opacity="${n2(.2 * Math.min(1, on))}"/>` : `<circle cx="${x + 24}" cy="778" r="9" fill="#C9D2DC"/>`}`; });
    const ph = (t % 12), st = ph < 5.5 ? 2 : ph < 7 ? 1 : 0; g += TF(800, 872, 1, `<path d="M0 0 V-58" stroke="#3B3F55" stroke-width="7" stroke-linecap="round"/><rect x="-13" y="-112" width="26" height="60" rx="8" fill="#2B2147" stroke="#fff" stroke-width="3"/>${["#FF5A4E", "#FFB830", "#3DDC6A"].map((c, i) => `<circle cx="0" cy="${-100 + i * 18}" r="6.5" fill="${st === i ? c : "#4A4660"}"/>${st === i ? `<circle cx="0" cy="${-100 + i * 18}" r="12" fill="${c}" opacity=".35"/>` : ""}`).join("")}`);
    s += g; }
  if (o.tree) s += rainTree(h, t, o);
  return s; }
// the rain tree at the right of the window: an umbrella crown on a leaning trunk, one long branch for the owl. o.owl = false | {open, wink}
function rainTree(h, t, o = {}) { const hh = h24(h), N = nightK(h), dawn = bump(hh, 5.6, 6.5, 7.6, 9), tr = mixH(mixH("#8A5E3A", "#4A3550", dawn * .5), "#1E1B40", N * .7), gold = bump(hh, 6.6, 7.1, 8.5, 10.5);
  const lc = (c) => mixH(mixH(c, "#2C4A52", dawn * .45), "#12243F", N * .78);
  let s = `<path d="M1590 1004 Q1560 760 1520 620 Q1500 540 1540 420" fill="none" stroke="${tr}" stroke-width="58" stroke-linecap="round"/><path d="M1528 600 Q1420 520 1180 536" fill="none" stroke="${tr}" stroke-width="24" stroke-linecap="round"/><path d="M1300 532 q-30 -40 -80 -46 M1420 548 q20 40 60 44" fill="none" stroke="${tr}" stroke-width="12" stroke-linecap="round"/>`;
  const cl = [[1180, 330, 150, 80, "#2F8048"], [1380, 250, 190, 100, "#3E9E5A"], [1560, 300, 170, 100, "#2F8048"], [1280, 210, 150, 80, "#58B56C"], [1480, 170, 170, 80, "#58B56C"], [1640, 200, 120, 90, "#3E9E5A"], [1100, 400, 90, 50, "#3E9E5A"], [1440, 360, 200, 70, "#3E9E5A"], [1650, 380, 100, 70, "#2F8048"]];
  cl.forEach(([x, y, rx, ry, c], i) => { const dx = 5 * Math.sin(t * .8 + i * 1.3), dy = 2.5 * Math.sin(t * 1.1 + i); s += `<ellipse cx="${n2(x + dx)}" cy="${n2(y + dy)}" rx="${rx}" ry="${ry}" fill="${lc(c)}"/>`;
    if (gold > .05 && i > 2 && i < 6) s += `<ellipse cx="${n2(x + dx - rx * .2)}" cy="${n2(y + dy - ry * .45)}" rx="${n2(rx * .62)}" ry="${n2(ry * .32)}" fill="#FFE08A" opacity="${n2(.5 * gold)}"/>`; });
  // a few hanging leaf sprays that stir, and (o.bird) a small bird on a higher branch
  for (let i = 0; i < 7; i++) { if (i === 2) continue; const x = 1130 + i * 82, y = 410 + 30 * hash(i, 3), r = 6 * Math.sin(t * 1.3 + i * 1.7); s += `<g transform="translate(${x} ${n2(y)}) rotate(${n2(r)})"><ellipse cx="0" cy="26" rx="26" ry="34" fill="${lc(i % 2 ? "#58B56C" : "#3E9E5A")}"/></g>`; }
  if (o.owl !== false) s += TF((o.owl && o.owl.at) ? o.owl.at[0] : 1300, (o.owl && o.owl.at) ? o.owl.at[1] : 524, (o.owl && o.owl.at && o.owl.at[2]) || 1, owlArt(t, { ...(o.owl || {}), shade: N * .55 + dawn * .25 }));
  if (o.bird !== undefined) { const u = o.bird, bx = 1215 + 40 * clamp(u), by = 478 - 60 * Math.sin(Math.PI * clamp(u)) - (u > 1 ? (u - 1) * 420 : 0), bxx = bx + (u > 1 ? (u - 1) * 500 : 0); if (u > -.2 && u < 1.9) s += TF(bxx, by + (u < 0 ? u * 600 : 0), 1, `<ellipse cx="0" cy="-14" rx="20" ry="14" fill="${lc("#F2C14E")}"/><circle cx="14" cy="-28" r="11" fill="${lc("#F2C14E")}"/><path d="M24 -29 l12 3 l-12 4z" fill="#F08A3A"/><circle cx="17" cy="-30" r="2.6" fill="#2B2147"/><path d="M-16 -16 l-22 ${n2(-6 + 10 * Math.sin(t * 20) * (u > 1 || u < 0 ? 1 : 0))}" stroke="${lc("#D99A2A")}" stroke-width="8" stroke-linecap="round"/>`); }
  return s; }
/* THE LITTLE OWL (a small scops-type owl: round brown body, little ear tufts, a pale face, eyes shut in the day). origin = its feet on the
   branch; about 120 tall. o.open 0..1 (both eyes), o.wink 0..1 (one eye), o.shade 0..1. It breathes, its ear tufts twitch, it shuffles. */
function owlArt(t, o = {}) { const br = Math.sin(t * 1.9), sy = 1 + .028 * br, tw_ = Math.max(0, Math.sin(t * .9 + 1) - .9) * 10, op = clamp(o.open || 0), wk = clamp(o.wink || 0), sh = o.shade || 0, L = "#5E3D22", tilt = (op > .3 ? 5 * Math.sin(t * 2.2) : 0) + (wk > .3 ? -7 : 0);
  const eye = (x, k) => k < .12 ? `<path d="M${x - 15} -76 Q${x} -64 ${x + 15} -76" fill="none" stroke="${L}" stroke-width="5.5" stroke-linecap="round"/><path d="M${x - 12} -71 l-4 5 M${x + 12} -71 l4 5" stroke="${L}" stroke-width="3" stroke-linecap="round" opacity=".6"/>`
    : `<ellipse cx="${x}" cy="-76" rx="17" ry="${n2(17 * k)}" fill="#FFD75A" stroke="${L}" stroke-width="4"/><ellipse cx="${x + (o.look || 0)}" cy="-76" rx="9" ry="${n2(9.5 * k)}" fill="#2B2147"/><circle cx="${x + 3 + (o.look || 0)}" cy="${n2(-76 - 4 * k)}" r="3.2" fill="#fff"/>`;
  return `<g transform="scale(${n2(1 / (sy * .5 + .5))} ${n2(sy)}) rotate(${n2(tilt * .4)})">
    <path d="M-16 -4 v10 M-8 -4 v11 M8 -4 v11 M16 -4 v10" stroke="#E0A04A" stroke-width="5" stroke-linecap="round"/>
    <path d="M-30 -118 L-40 ${n2(-150 - tw_)} L-14 -128z" fill="url(#f14Owl)" stroke="${L}" stroke-width="4" stroke-linejoin="round"/><path d="M30 -118 L40 ${n2(-150 - tw_ * .6)} L14 -128z" fill="url(#f14Owl)" stroke="${L}" stroke-width="4" stroke-linejoin="round"/>
    <path d="M0 -132 C46 -132 54 -90 52 -52 C50 -14 34 4 0 4 C-34 4 -50 -14 -52 -52 C-54 -90 -46 -132 0 -132z" fill="url(#f14Owl)" stroke="${L}" stroke-width="5"/>
    <path d="M-48 -64 Q-62 -30 -40 -4 Q-34 -34 -40 -66z" fill="#7A4F2C" stroke="${L}" stroke-width="4" stroke-linejoin="round"/><path d="M48 -64 Q62 -30 40 -4 Q34 -34 40 -66z" fill="#7A4F2C" stroke="${L}" stroke-width="4" stroke-linejoin="round"/>
    <ellipse cx="0" cy="-34" rx="30" ry="34" fill="#EBD3AC"/><path d="M-14 -44 l6 7 l6 -7 M2 -44 l6 7 l6 -7 M-8 -26 l6 7 l6 -7 M-16 -10 l6 7 l6 -7 M2 -10 l6 7 l6 -7" fill="none" stroke="#B98556" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
    <g transform="rotate(${n2(tilt)} 0 -70)"><path d="M0 -112 C30 -112 44 -96 44 -76 C44 -56 28 -46 14 -48 Q0 -40 -14 -48 C-28 -46 -44 -56 -44 -76 C-44 -96 -30 -112 0 -112z" fill="#F4E2C2" stroke="${L}" stroke-width="4"/>
    ${eye(-20, Math.max(op, 0))}${eye(20, Math.max(op, wk))}<path d="M-6 -64 L0 -50 L6 -64 Q0 -68 -6 -64z" fill="#F0A23A" stroke="${L}" stroke-width="3" stroke-linejoin="round"/>
    <ellipse cx="-33" cy="-60" rx="7" ry="4.5" fill="#FF9F8A" opacity=".65"/><ellipse cx="33" cy="-60" rx="7" ry="4.5" fill="#FF9F8A" opacity=".65"/></g>
    ${sh > .03 ? `<path d="M0 -150 C60 -150 60 -90 54 -52 C50 -14 34 6 0 6 C-34 6 -50 -14 -54 -52 C-60 -90 -60 -150 0 -150z" fill="#141B45" opacity="${n2(.5 * sh)}"/>` : ""}</g>`
    + (op < .1 && wk < .1 ? [0, 1].map((i) => { const u = ((t * .45 + i * .5) % 1); return OP(Math.sin(Math.PI * u) * .85, T(n2(56 + 26 * u), n2(-120 - 46 * u), "z", n2(22 + 16 * u), "#fff", { w: 700 })); }).join("") : ""); }

/* ====================================================================================================================================
   THE GLOBE. globe14(R, lon0, o): an orthographic school globe, centre (0, 0), tilted on its stand; lon0 = the longitude facing us. The
   torch is at the LEFT: when o.lit, EXACTLY the left half (the half that faces the torch) is lit and the right half is in shadow, with a soft
   edge. It turns towards the east: lon0 goes down, so the lands travel from left to right. o.dot: the red sticker on Singapore.
   globeDot(R, lon0) -> [x, y, front] of the sticker. o.stand = false hides the stand; o.dark = how dark the room is (the unlit look).
   ==================================================================================================================================== */
const GTILT = 16 * Math.PI / 180, SGLL = [103.8, 1.3];
const LANDS = [[[-17, 15], [-5, 35], [10, 37], [32, 31], [43, 12], [51, 11], [40, -5], [35, -25], [20, -35], [12, -15], [9, 4], [-8, 5]], [[-9, 37], [-9, 43], [0, 50], [-5, 58], [10, 58], [25, 70], [40, 66], [40, 45], [27, 37], [15, 38], [5, 43]],
  [[40, 45], [40, 66], [70, 72], [110, 75], [150, 70], [178, 66], [160, 55], [140, 45], [128, 35], [122, 30], [120, 22], [108, 18], [109, 10], [104, 1.3], [100, 8], [98, 16], [92, 22], [88, 22], [80, 8], [73, 20], [60, 25], [57, 18], [45, 13], [35, 30], [36, 36]],
  [[114, -22], [130, -12], [142, -11], [153, -27], [146, -39], [130, -32], [116, -34]], [[-165, 62], [-150, 70], [-95, 72], [-75, 62], [-60, 50], [-78, 35], [-82, 25], [-97, 18], [-88, 16], [-105, 22], [-118, 33], [-125, 48], [-150, 58]],
  [[-80, 8], [-62, 10], [-50, 0], [-35, -7], [-40, -22], [-58, -38], [-68, -54], [-75, -45], [-71, -18], [-81, -5]], [[-55, 60], [-20, 70], [-30, 82], [-60, 80]], [[109, 1], [117, 7], [118, 1], [114, -4], [110, -2]], [[95, 5], [104, -5], [106, -6], [98, 3]], [[131, 33], [141, 43], [142, 37], [135, 33]]];
const LANDC = ["#8ED081", "#A9DB8A", "#9BD67E", "#F2C987", "#8ED081", "#A9DB8A", "#F4F8FB", "#9BD67E", "#9BD67E", "#A9DB8A"];
function gProj(R, lon, lat, lon0) { const l = (lon - lon0) * Math.PI / 180, p = lat * Math.PI / 180, x = Math.cos(p) * Math.sin(l), y = Math.sin(p), z = Math.cos(p) * Math.cos(l);
  return [R * (x * Math.cos(GTILT) + y * Math.sin(GTILT)), R * (x * Math.sin(GTILT) - y * Math.cos(GTILT)), z]; }
const globeDot = (R, lon0) => gProj(R, SGLL[0], SGLL[1], lon0);
function globe14(R, lon0, o = {}) { const id = o.id || "gl", lit = o.lit === undefined ? 0 : o.lit, dk = o.dark || 0; let land = "";
  LANDS.forEach((poly, i) => { let pts = [], any = false; const dense = []; for (let k = 0; k < poly.length; k++) { const a = poly[k], b = poly[(k + 1) % poly.length]; for (let j = 0; j < 4; j++) dense.push([lerp(a[0], b[0], j / 4), lerp(a[1], b[1], j / 4)]); }
    for (const [lo, la] of dense) { let [x, y, z] = gProj(R, lo, la, lon0); if (z > 0) any = true; else { const d = Math.hypot(x, y) || 1; x = x / d * R * 1.02; y = y / d * R * 1.02; } pts.push(n2(x) + " " + n2(y)); }
    if (any) land += `<path d="M${pts.join(" L")}z" fill="${LANDC[i]}" stroke="#5FA865" stroke-width="${n2(R * .012)}" stroke-linejoin="round"/>`; });
  let grid = ""; for (const la of [-60, -30, 0, 30, 60]) { const pts = []; for (let lo = -90; lo <= 90; lo += 15) { const [x, y] = gProj(R, lon0 + lo, la, lon0); pts.push(n2(x) + " " + n2(y)); } grid += `<path d="M${pts.join(" L")}" fill="none" stroke="#fff" stroke-width="${la ? 1.5 : 2.6}" opacity="${la ? .28 : .5}"/>`; }
  for (let m = 0; m < 12; m++) { const lo = m * 30, pts = []; let vis = false; for (let la = -80; la <= 80; la += 16) { const [x, y, z] = gProj(R, lo, la, lon0); if (z > .05) { vis = true; pts.push(n2(x) + " " + n2(y)); } } if (vis && pts.length > 3) grid += `<path d="M${pts.join(" L")}" fill="none" stroke="#fff" stroke-width="1.5" opacity=".24"/>`; }
  const [dx, dy, dz] = globeDot(R, lon0), dotR = o.dotR || R * .075;
  const dot = o.dot === false || dz <= 0 ? "" : `<g transform="translate(${n2(dx)} ${n2(dy)}) scale(${n2((o.dotK === undefined ? 1 : o.dotK) * (.45 + .55 * dz))} ${n2(o.dotK === undefined ? 1 : o.dotK)})"><circle r="${n2(dotR * 1.5)}" fill="#fff" opacity=".9"/><circle r="${n2(dotR)}" fill="#FF3B30" stroke="#B3160E" stroke-width="${n2(dotR * .22)}"/><circle cx="${n2(-dotR * .3)}" cy="${n2(-dotR * .3)}" r="${n2(dotR * .25)}" fill="#fff" opacity=".8"/></g>`;
  const ax = [Math.sin(GTILT), -Math.cos(GTILT)], stand = o.stand === false ? "" : `<path d="M${n2(ax[0] * R * 1.16)} ${n2(ax[1] * R * 1.16)} A${n2(R * 1.16)} ${n2(R * 1.16)} 0 0 1 ${n2(-ax[0] * R * 1.16)} ${n2(-ax[1] * R * 1.16)}" fill="none" stroke="#C9952E" stroke-width="${n2(R * .09)}" stroke-linecap="round"/>
    <path d="M${n2(-ax[0] * R * 1.16)} ${n2(-ax[1] * R * 1.16)} Q${n2(-ax[0] * R * 1.2)} ${n2(R * 1.3)} 0 ${n2(R * 1.34)}" fill="none" stroke="#C9952E" stroke-width="${n2(R * .09)}" stroke-linecap="round"/><ellipse cx="0" cy="${n2(R * 1.5)}" rx="${n2(R * .62)}" ry="${n2(R * .13)}" fill="#8A5A36"/><ellipse cx="0" cy="${n2(R * 1.44)}" rx="${n2(R * .62)}" ry="${n2(R * .13)}" fill="url(#f14Wood)"/><rect x="${n2(-R * .07)}" y="${n2(R * 1.28)}" width="${n2(R * .14)}" height="${n2(R * .16)}" fill="#C9952E"/>
    <circle cx="${n2(ax[0] * R * 1.16)}" cy="${n2(ax[1] * R * 1.16)}" r="${n2(R * .07)}" fill="#E8B84A"/><circle cx="${n2(-ax[0] * R * 1.16)}" cy="${n2(-ax[1] * R * 1.16)}" r="${n2(R * .07)}" fill="#E8B84A"/>`;
  return stand + (lit > .05 ? `<circle r="${n2(R * 1.12)}" fill="#FFF6C8" opacity="${n2(.22 * lit)}" filter="url(#b10)"/>` : "")
    + `<clipPath id="${id}c"><circle r="${R}"/></clipPath><circle r="${R}" fill="url(#f14Sea)"/><g clip-path="url(#${id}c)">${land}${grid}${dot}
      ${dk > .02 ? `<rect x="${-R}" y="${-R}" width="${2 * R}" height="${2 * R}" fill="#0A1035" opacity="${n2(dk * (1 - .92 * lit))}"/>` : ""}
      ${lit > .02 ? `<rect x="${-R}" y="${-R}" width="${2 * R}" height="${2 * R}" fill="url(#f14Term)" opacity="${n2(lit)}"/><ellipse cx="${n2(-R * .5)}" cy="${n2(-R * .3)}" rx="${n2(R * .34)}" ry="${n2(R * .5)}" fill="#fff" opacity="${n2(.2 * lit)}" filter="url(#b10)"/>` : `<ellipse cx="${n2(-R * .36)}" cy="${n2(-R * .4)}" rx="${n2(R * .3)}" ry="${n2(R * .2)}" fill="#fff" opacity=".28"/>`}</g>
    <circle r="${R}" fill="none" stroke="#1F5FB0" stroke-width="${n2(R * .03)}" opacity=".7"/>`; }
// the torch lying on its side, lens at the RIGHT end (it points at the globe). origin = the middle of its underside; about 190 long. on 0..1
const torch14 = (on = 0, o = {}) => `<rect x="-96" y="-44" width="150" height="44" rx="14" fill="url(#f14Torch)" stroke="#1E7268" stroke-width="5"/><path d="M-70 -42 V-2 M-54 -42 V-2" stroke="#1E7268" stroke-width="4"/><path d="M-84 -34 H30" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".45"/>
  <path d="M52 -44 L92 -60 V16 L52 0z" fill="#D5DCE6" stroke="#5E6B7C" stroke-width="5" stroke-linejoin="round"/>${on > .3 ? `<circle cx="98" cy="-22" r="44" fill="#FFF6C8" opacity=".75" filter="url(#b10)"/>` : ""}<ellipse cx="94" cy="-22" rx="8" ry="37" fill="${on > .3 ? "#FFFDF0" : "#8E9AA8"}" stroke="#5E6B7C" stroke-width="4"/>
  <rect x="-30" y="${o.press ? -50 : -55}" width="30" height="12" rx="5" fill="#2B2147"/>`;
// a pile of four books (origin = the middle of the bottom; 4 x 22 = 88 tall, 230 wide)
const books4 = () => [["#5B8DEF", 0], ["#FF8FB1", 10], ["#9B6BFF", -8], ["#FFB36B", 4]].map(([c, dx], i) => `<rect x="${-115 + dx}" y="${-22 - i * 22}" width="230" height="22" rx="5" fill="${c}" stroke="${P.ink}" stroke-width="3"/><rect x="${-115 + dx + 8}" y="${-18 - i * 22}" width="18" height="14" rx="3" fill="#fff" opacity=".8"/><path d="M${85 + dx} ${-11 - i * 22} h22" stroke="#fff" stroke-width="3" opacity=".6"/>`).join("");

/* ====================================================================================================================================
   THE HDB LIVING ROOM by its east window. BG.flat = everything that never moves (baked). VF(t, o, cam) adds the hour's light and the life.
   o: h (the hour outside), dark 0..1 (how dim the room is), sun 0..1 (sunbeams), curt 0..1 (curtains drawn), clk (the wall clock's hour),
   fan (speed), globe { lon, dot, dotK } | false, torch (false hides it), items (svg on the floor), over (svg in the room, last),
   owl { open, wink } | false, bird (0..2: a small bird lands on the branch and flies off), cord (0..1: the curtain cord pulled down)
   ==================================================================================================================================== */
const WIN = { x: 900, y: 140, w: 760, h: 458, s: .458 }, GLB = [1050, 686], GLR = 66, TOR = [740, 710.8], TABY = 790;
const OWLW = [WIN.x + 1300 * WIN.s, WIN.y + (524 - 64) * WIN.s];      // the owl's middle in the room
const CAM0F = [1, 960, 540];
const bag14s = () => `<path d="M-22 -96 Q0 -124 22 -96" fill="none" stroke="#B4500A" stroke-width="8" stroke-linecap="round"/><path d="M-46 0 V-66 Q-46 -100 -18 -100 H18 Q46 -100 46 -66 V0z" fill="#F58A2E" stroke="#B4500A" stroke-width="5" stroke-linejoin="round"/><rect x="-28" y="-52" width="56" height="34" rx="8" fill="#FFB36B" stroke="#B4500A" stroke-width="4"/><path d="M-40 -74 Q0 -58 40 -74" fill="none" stroke="#5E6B7C" stroke-width="5"/>`;
BG.flat = () => { let s = `<rect x="-200" y="-120" width="2320" height="870" fill="url(#f14Wall)"/><rect x="-200" y="740" width="2320" height="460" fill="url(#f14Floor)"/>`;
  for (let i = 0; i < 16; i++) { const x = -700 + i * 220; s += `<path d="M${n2(960 + (x - 960) * .5)} 744 L${x} 1200" stroke="#B9A07A" stroke-width="3" opacity=".45"/>`; }
  for (const y of [790, 856, 950, 1080]) s += `<path d="M-200 ${y} H2120" stroke="#B9A07A" stroke-width="3" opacity=".4"/>`;
  s += `<rect x="-200" y="724" width="2320" height="20" fill="#E9D2AC"/><rect x="-200" y="742" width="2320" height="5" fill="#C9AE84" opacity=".7"/>`;
  // soft wall light, the rug
  s += `<ellipse cx="1280" cy="380" rx="760" ry="420" fill="#fff" opacity=".22" filter="url(#b60)"/><ellipse cx="930" cy="912" rx="560" ry="92" fill="#E0796E"/><ellipse cx="930" cy="906" rx="560" ry="92" fill="url(#f14Rug)"/><ellipse cx="930" cy="906" rx="480" ry="72" fill="none" stroke="#FFE3D6" stroke-width="7" stroke-dasharray="26 18" opacity=".8"/><ellipse cx="930" cy="906" rx="330" ry="46" fill="#FFD9CC" opacity=".5"/>`;
  // two framed pictures (a kite, a little house), the wall clock's face
  s += `<g filter="url(#dropS)"><rect x="150" y="216" width="250" height="190" rx="12" fill="url(#f14Wood)"/><rect x="166" y="232" width="218" height="158" rx="6" fill="#DFF3FF"/><path d="M166 350 Q230 310 290 344 Q340 318 384 340 V390 H166z" fill="#9BD67E"/><path d="M250 262 l34 22 l-22 34 l-34 -22z" fill="#FF8FB1" stroke="#C4587C" stroke-width="3"/><path d="M262 318 q-14 22 4 40 q10 10 -2 24" fill="none" stroke="#C4587C" stroke-width="3"/>
    <rect x="440" y="262" width="150" height="150" rx="12" fill="url(#f14Wood)"/><rect x="454" y="276" width="122" height="122" rx="6" fill="#FFF3DC"/><path d="M484 380 V336 L515 308 L546 336 V380z" fill="#F6A38F" stroke="#B4614F" stroke-width="3"/><rect x="506" y="350" width="18" height="30" fill="#8A5A36"/><circle cx="486" cy="304" r="4" fill="#9B6BFF"/><circle cx="548" cy="298" r="4" fill="#2EC4B6"/></g>
    <g filter="url(#dropS)"><circle cx="745" cy="236" r="64" fill="#5B7BD6"/><circle cx="745" cy="236" r="52" fill="#FFF8EA"/></g>${[...Array(12)].map((_, i) => { const a = i * Math.PI / 6; return `<path d="M${n2(745 + 42 * Math.sin(a))} ${n2(236 - 42 * Math.cos(a))} L${n2(745 + 48 * Math.sin(a))} ${n2(236 - 48 * Math.cos(a))}" stroke="${P.ink}" stroke-width="${i % 3 ? 3 : 5}" stroke-linecap="round"/>`; }).join("")}`;
  // the sofa
  s += `<ellipse cx="350" cy="812" rx="350" ry="26" fill="${P.ink}" opacity=".22" filter="url(#b10)"/><rect x="92" y="790" width="26" height="26" rx="6" fill="#7E4F27"/><rect x="582" y="790" width="26" height="26" rx="6" fill="#7E4F27"/>
    <rect x="60" y="486" width="580" height="250" rx="46" fill="url(#f14Sofa)" stroke="#4E63A6" stroke-width="5"/><path d="M350 500 V660" stroke="#4E63A6" stroke-width="4" opacity=".4"/><rect x="70" y="650" width="560" height="130" rx="34" fill="url(#f14SofaD)" stroke="#4E63A6" stroke-width="5"/><path d="M350 656 V774" stroke="#4E63A6" stroke-width="4" opacity=".5"/>
    <rect x="14" y="580" width="96" height="220" rx="40" fill="url(#f14Sofa)" stroke="#4E63A6" stroke-width="5"/><rect x="590" y="580" width="96" height="220" rx="40" fill="url(#f14Sofa)" stroke="#4E63A6" stroke-width="5"/><path d="M96 520 Q200 496 330 506" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round" opacity=".3"/>
    <circle cx="210" cy="612" r="64" fill="#FFC9A0" stroke="#E39A6C" stroke-width="5"/><circle cx="210" cy="612" r="9" fill="#E39A6C"/><g transform="translate(486 618) rotate(12)"><rect x="-58" y="-58" width="116" height="116" rx="24" fill="#CDEFE3" stroke="#7CC7B2" stroke-width="5"/><path d="M-30 -30 L30 30 M30 -30 L-30 30" stroke="#7CC7B2" stroke-width="4" opacity=".6"/></g>`;
  // the door and the school bag
  s += `<rect x="1800" y="150" width="330" height="594" fill="#8FB8AE"/><rect x="1818" y="168" width="330" height="576" fill="url(#f14Door)"/><rect x="1846" y="210" width="240" height="210" rx="10" fill="none" stroke="#8FB8AE" stroke-width="6"/><circle cx="1846" cy="470" r="13" fill="#E8B84A" stroke="#B88A2A" stroke-width="4"/>
    <ellipse cx="1766" cy="748" rx="60" ry="10" fill="${P.ink}" opacity=".25" filter="url(#b4)"/><g transform="translate(1766 746) rotate(-5)">${bag14s()}</g>`;
  // the low table under the window
  s += `<ellipse cx="920" cy="908" rx="330" ry="22" fill="${P.ink}" opacity=".25" filter="url(#b10)"/><rect x="668" y="826" width="26" height="78" rx="6" fill="url(#f14WoodD)"/><rect x="1146" y="826" width="26" height="78" rx="6" fill="url(#f14WoodD)"/><rect x="716" y="826" width="20" height="56" rx="6" fill="#7E4F27"/><rect x="1104" y="826" width="20" height="56" rx="6" fill="#7E4F27"/>
    <rect x="650" y="812" width="540" height="24" rx="8" fill="url(#f14WoodD)"/><rect x="636" y="${TABY}" width="568" height="28" rx="12" fill="url(#f14Wood)" stroke="#7E4F27" stroke-width="4"/><path d="M660 ${TABY + 8} H1180" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".35"/>`;
  // the fan's rod
  s += `<rect x="423" y="-120" width="14" height="176" fill="#C9D2DC"/><ellipse cx="430" cy="62" rx="40" ry="16" fill="#E6ECF4" stroke="#9AA5B4" stroke-width="4"/>`;
  return s; };
// an adult's arm: fingertips at (x, y), pointing along ang (degrees; 0 = to the right), the blue sleeve running back len px (off the frame)
const arm14 = (x, y, ang, len = 500, sc = 1) => `<g transform="translate(${n2(x)} ${n2(y)}) rotate(${n2(ang)}) scale(${sc}) translate(-90 0)"><rect x="${-250 - len}" y="-44" width="${len + 40}" height="90" rx="16" fill="#5B7BD6" stroke="#3A56A8" stroke-width="5"/>${adultHand()}</g>`;
function curtain14(xa, xb, t, dark, glow, sway = 1) { const w = Math.abs(xb - xa), n = Math.max(3, Math.round(w / 34)), y0 = 118, y1 = 668; let d = `M${n2(xa)} ${y0}`, folds = "";
  for (let i = 0; i <= n; i++) { const x = lerp(xa, xb, i / n), sw = sway * 5 * Math.sin(t * 1.3 + i * .9) * (i / n); d += ` L${n2(x)} ${y0}`; if (i && i < n) folds += `<path d="M${n2(x)} ${y0 + 6} Q${n2(x + sw)} ${n2((y0 + y1) / 2)} ${n2(x + sw * 1.6)} ${y1 - 6}" fill="none" stroke="#D97E62" stroke-width="5" opacity=".5"/><path d="M${n2(x + 9)} ${y0 + 6} Q${n2(x + 9 + sw)} ${n2((y0 + y1) / 2)} ${n2(x + 9 + sw * 1.6)} ${y1 - 6}" fill="none" stroke="#fff" stroke-width="4" opacity=".28"/>`; }
  let b = ""; for (let i = n; i >= 0; i--) { const x = lerp(xa, xb, i / n) + sway * 8 * Math.sin(t * 1.3 + i * .9) * (i / n); b += ` L${n2(x)} ${n2(y1 + (i % 2 ? 8 : 0))}`; }
  const shape = `<path d="${d}${b}z"`;
  return `${shape} fill="url(#f14Curt)" stroke="#D97E62" stroke-width="4" stroke-linejoin="round"/>${folds}${dark > .02 ? `${shape} fill="#141B45" opacity="${n2(.55 * dark)}"/>` : ""}${glow > .02 ? `${shape} fill="#FFD9A0" opacity="${n2(.22 * glow)}"/>` : ""}`
    + [...Array(n + 1)].map((_, i) => `<circle cx="${n2(lerp(xa, xb, i / n))}" cy="112" r="9" fill="none" stroke="#B88A2A" stroke-width="5"/>`).join(""); }
function VF(t, o = {}, cam) { const h = o.h === undefined ? 9 : o.h, dark = o.dark || 0, sun = o.sun || 0, c = clamp(o.curt || 0), clk = o.clk === undefined ? h : o.clk, W_ = WIN, fsp = o.fan === undefined ? 2.2 : o.fan;
  let s = bg("flat");
  // the window's light on the floor (under everything that stands on it)
  if (sun > .02 && c < .9) s += OP(sun * (1 - c), `<path d="M700 800 H1500 L1380 1030 H500z" fill="#FFF3B8" opacity=".42"/>${[0, 1, 2, 3, 4, 5].map((i) => `<path d="M${700 + i * 133.3 + 133.3} 800 L${500 + i * 146.7 + 146.7} 1030" stroke="#D9BE8A" stroke-width="5" opacity=".5"/>`).join("")}<path d="M632 880 H1452" stroke="#D9BE8A" stroke-width="5" opacity=".5"/>`);
  // the clock's hands, the fan's blades
  const ha = (clk % 12) / 12 * 2 * Math.PI, ma = (clk % 1) * 2 * Math.PI; s += `<path d="M745 236 L${n2(745 + 28 * Math.sin(ha))} ${n2(236 - 28 * Math.cos(ha))}" stroke="${P.ink}" stroke-width="7" stroke-linecap="round"/><path d="M745 236 L${n2(745 + 42 * Math.sin(ma))} ${n2(236 - 42 * Math.cos(ma))}" stroke="${P.ink}" stroke-width="5" stroke-linecap="round"/><circle cx="745" cy="236" r="6" fill="${P.coral}"/>`;
  for (let i = 0; i < 3; i++) { const a = t * fsp + i * 2.094, tx = 210 * Math.cos(a), ty = 44 * Math.sin(a), L = Math.hypot(tx, ty), rot = Math.atan2(ty, tx) * 180 / Math.PI; s += `<g transform="translate(430 62) rotate(${n2(rot)})"><rect x="26" y="-13" width="${n2(L - 26)}" height="26" rx="13" fill="${Math.sin(a) > 0 ? "#F4F7FB" : "#DDE4EE"}" stroke="#9AA5B4" stroke-width="3"/></g>`; }
  s += `<ellipse cx="430" cy="64" rx="24" ry="10" fill="#C9D2DC"/>`;
  // on the low table: the torch on its four books (left), the globe (right)
  let front = "";   // teacher, 23 Nov: "The globe is not full circle. It should be in front of the window": table things are drawn AFTER the window
  if (o.torch !== false) front += TF(TOR[0], TABY, .9, books4()) + TF(TOR[0], TOR[1], .9, torch14(0));
  if (o.globe !== false) { const g = o.globe || {}; front += `<ellipse cx="${GLB[0]}" cy="${TABY + 2}" rx="56" ry="8" fill="${P.ink}" opacity=".25" filter="url(#b4)"/>` + TF(GLB[0], GLB[1], 1, globe14(GLR, g.lon === undefined ? 60 : g.lon, { dot: !!g.dot, dotK: g.dotK, id: "vfg" })); }
  if (o.items) front += o.items;
  // the room's dimness (not the window: the sky lights itself)
  if (dark > .02) s += `<path fill-rule="evenodd" d="M-200 -120 H2120 V1200 H-200z M${W_.x} ${W_.y} h${W_.w} v${W_.h} h${-W_.w}z" fill="#141B45" opacity="${n2(.62 * dark)}"/>`;
  // the window: its view, the frame, the grille, the sill
  s += `<clipPath id="vfw"><rect x="${W_.x}" y="${W_.y}" width="${W_.w}" height="${W_.h}"/></clipPath><g clip-path="url(#vfw)"><g transform="translate(${W_.x} ${W_.y}) scale(${W_.s})">${skyView(h, t, { tree: true, owl: o.owl, bird: o.bird, id: "vfs" })}</g></g>`;
  const fr = mixH("#FFFFFF", "#5A6190", dark * .7), gr = mixH("#E6ECF4", "#474E80", dark * .7);
  s += `<rect x="${W_.x - 9}" y="${W_.y - 9}" width="${W_.w + 18}" height="${W_.h + 18}" rx="6" fill="none" stroke="${fr}" stroke-width="18"/><path d="M${W_.x + W_.w / 3} ${W_.y} v${W_.h} M${W_.x + W_.w * 2 / 3} ${W_.y} v${W_.h}" stroke="${fr}" stroke-width="12"/>`
    + [1, 2, 3, 4, 5].filter((i) => i % 2).map((i) => `<path d="M${n2(W_.x + i * W_.w / 6)} ${W_.y} v${W_.h}" stroke="${gr}" stroke-width="4"/>`).join("") + `<path d="M${W_.x} ${n2(W_.y + W_.h / 3)} h${W_.w} M${W_.x} ${n2(W_.y + W_.h * 2 / 3)} h${W_.w}" stroke="${gr}" stroke-width="4"/>`
    + `<rect x="${W_.x - 30}" y="${W_.y + W_.h + 6}" width="${W_.w + 60}" height="22" rx="8" fill="${mixH("#F4E3C4", "#5A5F8E", dark * .6)}"/>`;
  if (front) { const a = dark > .02 ? .62 * dark : 0, k = [0x14, 0x1B, 0x45].map((c) => c / 255 * a), m = 1 - a;   // the room's dimness, applied to the table things too
    s += a ? `<filter id="vfDim" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values="${m} 0 0 0 ${n2(k[0])} 0 ${m} 0 0 ${n2(k[1])} 0 0 ${m} 0 ${n2(k[2])} 0 0 0 1 0"/></filter><g filter="url(#vfDim)">${front}</g>` : front; }
  // the curtains on their rod, the cord at the right
  const glow = c * (1 - nightK(h));
  s += `<path d="M826 112 H1756" stroke="${mixH("#B88A2A", "#4A4470", dark * .6)}" stroke-width="10" stroke-linecap="round"/>` + curtain14(846, lerp(946, 1284, c), t, dark, glow, .6 + (o.swayK || 0)) + curtain14(1714, lerp(1614, 1276, c), t, dark, glow, .6 + (o.swayK || 0));
  const cd = (o.cord || 0) * 90; s += `<path d="M1740 112 V${n2(400 + cd)}" stroke="#D9C9A8" stroke-width="5"/><path d="M1740 ${n2(400 + cd)} l-10 34 h20z" fill="#F49B7E" stroke="#D97E62" stroke-width="3" stroke-linejoin="round"/>`;
  if (c > .5 && glow > .05) s += `<rect x="1272" y="124" width="${n2(3 + 5 * (1 - c) * 10)}" height="540" rx="3" fill="#FFF3B8" opacity="${n2(.85 * glow)}"/><path d="M1272 664 L1180 1000 H1300 L1282 664z" fill="#FFF3B8" opacity="${n2(.18 * glow)}"/>`;
  // sunbeams through the window and the dust in them
  if (sun > .02 && c < .9) { const a = sun * (1 - c); let d = ""; for (let i = 0; i < 22; i++) { const u = (hash(i, 7) + t * (.02 + .03 * hash(i, 3))) % 1, x = 760 + 760 * hash(i, 2) - 180 * u, y = 600 + 420 * u + 12 * Math.sin(t + i); d += `<circle cx="${n2(x)}" cy="${n2(y)}" r="${n2(2 + 3 * hash(i, 5))}" fill="#FFF9D8" opacity="${n2(.75 * Math.sin(Math.PI * u))}"/>`; }
    s += `<g style="mix-blend-mode:screen" opacity="${n2(a)}"><path d="M${W_.x} ${W_.y + W_.h} L${W_.x + W_.w / 3 - 20} ${W_.y + W_.h} L${W_.x - 30} 1100 H${W_.x - 420}z" fill="#FFE9A8" opacity=".2"/><path d="M${W_.x + W_.w / 3 + 20} ${W_.y + W_.h} L${W_.x + W_.w * 2 / 3 - 20} ${W_.y + W_.h} L${W_.x + 330} 1100 H${W_.x - 10}z" fill="#FFE9A8" opacity=".17"/><path d="M${W_.x + W_.w * 2 / 3 + 20} ${W_.y + W_.h} L${W_.x + W_.w} ${W_.y + W_.h} L${W_.x + 640} 1100 H${W_.x + 350}z" fill="#FFE9A8" opacity=".2"/></g>` + OP(a, d); }
  if (o.over) s += o.over;
  return cam ? CAM(s, cam[0], cam[1], cam[2]) : s; }
const camL14 = (a, b, u) => [lerp(a[0], b[0], u), lerp(a[1], b[1], u), lerp(a[2], b[2], u)];

/* ====================================================================================================================================
   SMALL PICTURES: the pencils, the picture tiles of the board CYCLE CHECK, the tiny skies, the cliffhanger cards
   ==================================================================================================================================== */
// an ordinary yellow-and-black pencil lying down, its point to the right; origin = its middle; len = the painted body
const pencil14 = (len, o = {}) => { const h = o.h || 22, x0 = -len / 2 - 14; let st = ""; for (let x = x0 + 16; x < x0 + len - 6; x += 22) st += `<rect x="${n2(x)}" y="${-h / 2}" width="10" height="${h}" fill="#2B2147"/>`;
  return `<rect x="${x0}" y="${-h / 2}" width="${len}" height="${h}" rx="3" fill="#FFD23A"/>${st}<rect x="${x0}" y="${-h / 2}" width="${len}" height="${h}" rx="3" fill="none" stroke="#8A6A10" stroke-width="3"/><rect x="${x0 - 14}" y="${-h / 2}" width="16" height="${h}" rx="5" fill="#FF8FB1" stroke="#B4587C" stroke-width="3"/>
    <path d="M${x0 + len} ${-h / 2} L${x0 + len + 30} 0 L${x0 + len} ${h / 2}z" fill="#F3D2AC" stroke="#8A6A10" stroke-width="3" stroke-linejoin="round"/><path d="M${x0 + len + 20} ${-h / 6} L${x0 + len + 30} 0 L${x0 + len + 20} ${h / 6}z" fill="#2B2147"/>`; };
const shavings14 = (t = 0, fall = 0) => [[-16, 0, 12], [4, -6, 10], [20, 2, 9], [-2, 6, 8]].map(([x, y, r], i) => `<path d="M${x - r} ${y} q${r} ${-r * 1.4} ${2 * r} 0 q${-r} ${r * .6} ${-2 * r} 0z" fill="#F3D2AC" stroke="#C99A5A" stroke-width="2.5"/>`).join("")
  + (fall ? [0, 1, 2].map((i) => { const u = ((t * .7 + i * .33) % 1); return `<path d="M${n2(-8 + i * 9 + 6 * Math.sin(u * 7 + i))} ${n2(-46 + 44 * u)} q5 -6 10 0" fill="none" stroke="#C99A5A" stroke-width="3" opacity="${n2(1 - u)}"/>`; }).join("") : "");
const PENL = { pen1: 150, pen2: 96, pen3: 40 };
const pencilTile = (key, t = 0) => `<rect x="-112" y="-40" width="224" height="80" rx="16" fill="#FFF8EA" stroke="#C9952E" stroke-width="4"/>` + TF(key === "pen3" ? -22 : 0, 0, 1, pencil14(PENL[key])) + (key === "pen3" ? TF(62, 14, 1, shavings14(t, 1)) : "");
// a tiny sky (w x h, origin its middle): bright by day, dark with stars and lit windows by night
const tinySky = (night, w = 180, h = 100, id = "ts") => { const blk = [[-.42, .5], [-.2, .72], [.02, .4], [.2, .62], [.38, .46]].map(([x, k], i) => `<rect x="${n2(x * w - w * .07)}" y="${n2(h / 2 - h * k)}" width="${n2(w * .16)}" height="${n2(h * k)}" rx="3" fill="${night ? "#1E2452" : (i % 2 ? "#F7EEDD" : "#E3EDF7")}"/>` + (night ? [0, 1, 2].map((j) => `<rect x="${n2(x * w - w * .04 + (j % 2) * w * .06)}" y="${n2(h / 2 - h * k + 8 + j * h * .13)}" width="${n2(w * .035)}" height="${n2(h * .07)}" fill="#FFE08A"/>`).join("") : "")).join("");
  return `<clipPath id="${id}"><rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="${n2(h * .14)}"/></clipPath><g clip-path="url(#${id})"><rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" fill="${night ? "#0E1438" : "#6FC1FF"}"/>${night ? [[-.36, -.3], [-.1, -.36], [.18, -.26], [.38, -.38], [.02, -.12], [-.26, -.08]].map(([x, y], i) => `<circle cx="${n2(x * w)}" cy="${n2(y * h)}" r="${i % 2 ? 2.4 : 3.6}" fill="#FFF9D8"/>`).join("")
    : `<ellipse cx="${n2(-w * .2)}" cy="${n2(-h * .2)}" rx="${n2(w * .16)}" ry="${n2(h * .1)}" fill="#fff"/><ellipse cx="${n2(-w * .14)}" cy="${n2(-h * .27)}" rx="${n2(w * .1)}" ry="${n2(h * .1)}" fill="#fff"/><ellipse cx="${n2(w * .26)}" cy="${n2(-h * .3)}" rx="${n2(w * .12)}" ry="${n2(h * .07)}" fill="#fff"/><rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" fill="#FFF6C8" opacity=".25"/>`}${blk}</g><rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="${n2(h * .14)}" fill="none" stroke="#fff" stroke-width="5"/>`; };
// the round picture tiles of the board (radius 64): day, night, green, amber, red, egg, chick, adult
function tilePic(key, t = 0, id = "") { const R = 64, clip = (inner) => `<clipPath id="tp${key}${id}"><circle r="${R - 5}"/></clipPath><g clip-path="url(#tp${key}${id})">${inner}</g>`;
  let pic = "", bgc = "#FFF8EA";
  if (key === "day" || key === "night") pic = clip(TF(0, 0, 1.3, tinySky(key === "night", 130, 110, "tk" + key + id).replace(/<rect[^>]*fill="none"[^>]*\/>$/, "")));
  else if (key === "green" || key === "amber" || key === "red") { const c = { green: "#3DDC6A", amber: "#FFB830", red: "#FF5A4E" }[key]; bgc = "#2B2147"; pic = `<circle r="46" fill="${c}" opacity=".3"/><circle r="36" fill="${c}"/><ellipse cx="-12" cy="-14" rx="12" ry="8" fill="#fff" opacity=".55"/>`; }
  else if (key === "egg") pic = clip(`<rect x="-70" y="-70" width="140" height="140" fill="#E3F5D8"/><ellipse cx="0" cy="44" rx="56" ry="18" fill="#C9A26A"/>` + TF(0, 40, .78, egg14()));
  else if (key === "chick") pic = clip(`<rect x="-70" y="-70" width="140" height="140" fill="#E3F5D8"/><rect x="-70" y="34" width="140" height="40" fill="#9FDB7F"/>` + TF(-4, 42, 1.15, chicken14(t, { age: 0 })));
  else if (key === "adult") pic = clip(`<rect x="-70" y="-70" width="140" height="140" fill="#E3F5D8"/><rect x="-70" y="40" width="140" height="40" fill="#9FDB7F"/>` + TF(-4, 48, .42, chicken14(t, { age: 3 })));
  return `<circle r="${R}" fill="${bgc}" stroke="${P.ink}" stroke-width="5"/>${pic}<circle r="${R}" fill="none" stroke="${P.ink}" stroke-width="5"/>`; }
// a picture card standing on the floor (280 x 250, origin its middle): a hen, a chick, a teddy bear
function picCard14(kind, t = 0) { const pic = kind === "hen" ? TF(-6, 62, .62, chicken14(t, { age: 3, act: "idle" })) : kind === "chick" ? TF(-4, 62, 1.5, chicken14(t, { age: 0, act: "peck", ph: 1 })) : TF(0, 4, .62, teddy());
  return `<path d="M-90 124 L-108 172 M90 124 L108 172" stroke="#8A5A36" stroke-width="12" stroke-linecap="round"/><g filter="url(#drop)"><rect x="-140" y="-126" width="280" height="252" rx="22" fill="#FFF8EA" stroke="#E3C9A8" stroke-width="6"/></g><rect x="-124" y="-110" width="248" height="176" rx="14" fill="${kind === "teddy" ? "#FFE9D6" : "#DFF3D0"}"/>${kind === "teddy" ? "" : `<rect x="-124" y="44" width="248" height="22" rx="8" fill="#9FDB7F"/>`}${pic}` + T(0, 104, kind === "hen" ? "a hen" : kind === "chick" ? "a chick" : "a teddy bear", 32, P.ink, { w: 600 }); }
// a traffic light: three round lamps in a column on a black board with a white edge (red on top, amber, green). origin = the board's middle;
// board 220 x 560. lit = { r, a, g } 0..1
function trafficLight(lit = {}, o = {}) { const L = [["#FF4B3E", lit.r || 0, -170], ["#FFB21E", lit.a || 0, 0], ["#2FE06A", lit.g || 0, 170]];
  return `<rect x="-20" y="270" width="40" height="${o.pole || 600}" fill="#5E6B7C"/><rect x="-20" y="270" width="12" height="${o.pole || 600}" fill="#7C8497"/><g filter="url(#drop)"><rect x="-124" y="-294" width="248" height="588" rx="40" fill="#fff"/><rect x="-110" y="-280" width="220" height="560" rx="30" fill="#221A33"/></g>`
    + L.map(([c, k, y]) => `${k > .05 ? `<circle cx="0" cy="${y}" r="${n2(120 + 6 * k)}" fill="${c}" opacity="${n2(.34 * k)}" filter="url(#b16)"/>` : ""}<circle cx="0" cy="${y}" r="70" fill="${mixH("#3A3348", c, .16 + .84 * k)}" stroke="#0E0A1C" stroke-width="6"/>${k > .05 ? `<circle cx="0" cy="${y}" r="52" fill="#fff" opacity="${n2(.22 * k)}"/><ellipse cx="-24" cy="${y - 26}" rx="20" ry="12" fill="#fff" opacity="${n2(.5 * k)}"/>` : `<ellipse cx="-24" cy="${y - 26}" rx="18" ry="10" fill="#fff" opacity=".12"/>`}
      <path d="M-78 ${y - 26} Q-70 ${y - 92} 0 ${y - 92} Q70 ${y - 92} 78 ${y - 26} Q40 ${y - 74} 0 ${y - 74} Q-40 ${y - 74} -78 ${y - 26}z" fill="#0E0A1C"/>`).join(""); }

/* ====================================================================================================================================
   LOOK CLOSER 1 · the sky from our window, two days, speeded up. skyHour(t): the clock of the time-lapse (hours since Monday midnight)
   ==================================================================================================================================== */
function skyHour(t) { const m = MK, K = [[SCN.lcsky.t0, 6.5], [m("clk0"), 7.0], [m("tagday"), 11.5], [m("dusk"), 18.2], [m("lampson"), 19.35], [m("stars"), 20.7], [m("tue7") - 1.0, 29.3], [m("tue7"), 31.0], [m("tue7") + .7, 33], [m("tue730") - .6, 42.2], [m("tue730"), 43.5], [m("tue730") + .5, 45], [m("wed7") - .5, 53.5], [m("wed7"), 55.0], [m("wed7") + .8, 57], [m("wed7") + 9, 59]];
  if (t <= K[0][0]) return K[0][1]; for (let i = 0; i < K.length - 1; i++) if (t < K[i + 1][0]) return lerp(K[i][1], K[i + 1][1], (t - K[i][0]) / (K[i + 1][0] - K[i][0])); return K[K.length - 1][1]; }
function skyArt(t) { const h = skyHour(t), m = MK, firstNight = t < m("tue7") - 1;
  return `<g transform="translate(-830 -605)">${skyView(h, t, { id: "lcs", noClouds: firstNight && t > m("lampson") - 1 })}</g>`
    + lcLab(t, m("noclouds"), -470, -250, "a clear sky", -590, -120, { t1: m("tue7") - 1, size: 44 }) + lcLab(t, m("noclouds") + .5, 440, -150, "no clouds", 250, -240, { t1: m("tue7") - 1, size: 44 }) + lcLab(t, m("nosun"), -60, -130, "no Sun", -150, -250, { t1: m("tue7") - 1, size: 44 }); }

/* ====================================================================================================================================
   LOOK CLOSER 2 · the globe and the torch (a model). The torch (our Sun) lies still at the LEFT on its four books; the globe (our Earth)
   is turned by an adult's hand TOWARDS THE EAST, never stopping from "turn". EXACTLY the half that faces the torch is lit.
   globeTheta(t) = where the red dot is: 0 = facing us (the edge of the light), -90 = the left limb (facing the torch), +90 = the right limb.
   ==================================================================================================================================== */
function globeTheta(t) { const m = MK, K = [[m("turn"), -52], [m("ddark"), 0], [m("dnight") + 1.0, 72], [m("dlight") - .15, 268], [m("v_globe"), 298], [m("v_globe") + 2.6, 318]];
  const f = (x) => { if (x <= K[0][0]) return K[0][1]; for (let i = 0; i < K.length - 1; i++) if (x < K[i + 1][0]) return lerp(K[i][1], K[i + 1][1], (x - K[i][0]) / (K[i + 1][0] - K[i][0])); return K[K.length - 1][1]; };
  return (f(t - .18) + f(t - .06) + f(t + .06) + f(t + .18)) / 4; }
const GA = { c: [250, -44], R: 200, ty: 258, tor: [-548, 26] };
function globeArt(t) { const m = MK, ton = m("torchon"), lit = clamp((t - ton) / .12), th = globeTheta(t), lon0 = SGLL[0] - th, [gx, gy] = GA.c, R = GA.R, [dx, dy, dz] = globeDot(R, lon0), turning = t >= m("turn");
  let s = `<rect x="-840" y="-400" width="1680" height="800" fill="#161C48"/><ellipse cx="${gx}" cy="-40" rx="620" ry="420" fill="#2A3270" opacity=".55" filter="url(#b30)"/><rect x="-840" y="${GA.ty}" width="1680" height="150" fill="#6E4826"/><rect x="-840" y="${GA.ty}" width="1680" height="16" fill="#9A6A3A"/>`;
  // the pin mark on the table beside the torch (it shows that the torch never moves)
  if (t >= m("pin")) { const k = spring(t, m("pin"), .4); s += `<path d="M-760 ${GA.ty + 34} H-330" stroke="#FFD75A" stroke-width="6" stroke-dasharray="14 10" stroke-linecap="round" opacity="${n2(.9 * clamp(k))}"/>` + TF(-316, GA.ty + 30, k, `<path d="M0 0 V-58" stroke="#E8ECF4" stroke-width="6" stroke-linecap="round"/><circle cx="0" cy="-66" r="17" fill="${P.coral}" stroke="#B4463C" stroke-width="4"/><circle cx="-5" cy="-71" r="5" fill="#fff" opacity=".7"/><ellipse cx="0" cy="2" rx="12" ry="4" fill="#000" opacity=".3"/>`); }
  s += `<ellipse cx="${gx}" cy="${GA.ty + 6}" rx="170" ry="16" fill="#000" opacity=".35" filter="url(#b6)"/><ellipse cx="${GA.tor[0]}" cy="${GA.ty + 6}" rx="210" ry="14" fill="#000" opacity=".35" filter="url(#b6)"/>`;
  s += TF(GA.tor[0], GA.ty, 1.6, books4(), 0, 2.64) + TF(GA.tor[0], GA.tor[1], 1.9, torch14(lit, { press: t > ton - .08 && t < ton + .25 }));
  // the beam: from the lens to the globe, soft; dust drifts in it
  if (lit > .02) { const lx = GA.tor[0] + 180, ly = GA.tor[1] - 42; let d = ""; for (let i = 0; i < 16; i++) { const u = (hash(i, 3) + t * (.03 + .03 * hash(i, 5))) % 1, x = lx + 30 + (gx - lx - 60) * u, y = ly + (hash(i, 9) - .5) * (90 + 300 * u) + 6 * Math.sin(t * 1.3 + i); d += `<circle cx="${n2(x)}" cy="${n2(y)}" r="${n2(2.5 + 3 * hash(i, 7))}" fill="#FFFBE0" opacity="${n2(.8 * Math.sin(Math.PI * u))}"/>`; }
    s += OP(lit, `<g style="mix-blend-mode:screen"><path d="M${lx} ${ly - 66} L${gx} ${gy - R * 1.08} L${gx} ${gy + R * 1.08} L${lx} ${ly + 66}z" fill="url(#f14Beam)"/></g>${d}`); }
  s += TF(gx, gy, 1, globe14(R, lon0, { lit, dark: .78, dot: t >= m("lab_sg") - 3, dotK: 1, id: "lcg", dotR: 17 }));
  // the curved line: the globe turns (dashes run the way it turns)
  if (turning) { const k = clamp((t - m("turn")) / .4), off = -((t - m("turn")) * 60) % 44; s += OP(k, `<g transform="translate(${gx} ${gy}) rotate(16)"><path d="M-240 20 A240 62 0 0 0 240 20" fill="none" stroke="#FFF3B8" stroke-width="9" stroke-linecap="round" stroke-dasharray="26 18" stroke-dashoffset="${n2(off)}"/></g>`); }
  // the hands: one switches the torch on, one turns the globe
  if (t > ton - .7 && t < ton + .9) { const u = clamp((t - (ton - .7)) / .5), out = clamp((t - (ton + .4)) / .5), yy = lerp(-420, GA.tor[1] - 108 + (t > ton - .08 && t < ton + .25 ? 8 : 0), eo(u)) - 420 * ei(out); s += arm14(GA.tor[0] - 28, yy, 82, 500, 1.15); }
  if (t > m("turn") - .5) { const u = clamp((t - (m("turn") - .5)) / .5), a = -52 + 7 * Math.sin(t * 2.6), ar = a * Math.PI / 180, hx = gx + (R + 6) * Math.cos(ar), hy = gy + (R + 6) * Math.sin(ar); s += arm14(lerp(hx + 260, hx, eo(u)), lerp(hy - 380, hy, eo(u)), 128 + .5 * (a + 52), 500, 1.25); }
  // labels with plain lines
  s += lcLab(t, m("lab_earth"), 610, 196, "our Earth", gx + R * .82, gy + R * .5, { t1: m("pin") - .1, size: 46 }) + lcLab(t, m("lab_sun"), -560, -236, "our Sun", GA.tor[0] + 60, GA.tor[1] - 90, { t1: m("pin") - .1, size: 46 })
    + (dz > 0 ? lcLab(t, m("lab_sg"), -90, -250, "Singapore", gx + dx - 10, gy + dy - 16, { t1: m("turn") + .2, size: 46 }) : "")
    + lcLab(t, m("pin"), -300, 340, "the torch stays still", -560, GA.ty + 34, { size: 38 }) + lcLab(t, m("turn"), 640, 250, "the globe turns", gx + 178, gy + 112, { size: 38, t1: m("v_globe") - .3 });
  return s; }

/* ====================================================================================================================================
   LOOK CLOSER 3 · the traffic light at the junction below (seen from upstairs; nobody on the road)
   ==================================================================================================================================== */
function lightArt(t) { const m = MK, z = lerp(.5, 1, eio((t - SCN.lclight.t0 - .2) / 2.0)), gy = lerp(-260, 0, eio((t - SCN.lclight.t0 - .2) / 2.0));
  const st = t >= m("lampG2") ? "g" : t >= m("lampR") ? "r" : t >= m("lampA") ? "a" : t >= m("lampG") ? "g" : "r0", on = (k, mk) => st === k ? clamp((t - mk) / .1) : 0;
  const lit = { r: st === "r0" ? .85 : on("r", m("lampR")), a: on("a", m("lampA")), g: st === "g" ? (t >= m("lampG2") ? clamp((t - m("lampG2")) / .1) : clamp((t - m("lampG")) / .1)) : 0 }, go = st === "g";
  // the junction behind, soft and far (seen from upstairs): the road, the crossing, trees; cars wait at red and pass when it is green
  let b = `<rect x="-1700" y="-900" width="3400" height="1800" fill="#A9DDB0"/><path d="M-1700 -160 H1700 V230 H-1700z" fill="#8D94AA"/><path d="M-360 230 L-520 900 H360 L200 230z" fill="#8D94AA"/><path d="M-1700 -176 H1700 M-1700 246 H-380 M220 246 H1700" stroke="#E6DFCF" stroke-width="34"/>`;
  for (let i = -8; i < 9; i++) b += `<rect x="${i * 220 - 60}" y="26" width="120" height="14" rx="7" fill="#fff" opacity=".8"/>`;
  for (let i = 0; i < 8; i++) b += `<rect x="${-330 + i * 70}" y="120" width="40" height="92" fill="#fff" opacity=".85"/>`;
  [[-1200, -420, 230], [-760, -470, 190], [-250, -440, 220], [420, -480, 200], [900, -430, 240], [1350, -470, 200], [-1100, 520, 220], [760, 560, 240], [1250, 480, 200]].forEach(([x, y, r], i) => { b += `<circle cx="${n2(x + 6 * Math.sin(t * .9 + i))}" cy="${y}" r="${r}" fill="${i % 2 ? "#4FA862" : "#6CC27A"}"/><circle cx="${n2(x - r * .25 + 6 * Math.sin(t * .9 + i))}" cy="${y - r * .3}" r="${r * .5}" fill="#8AD694" opacity=".7"/>`; });
  const car = (x, y, c, dir) => TF(x, y, dir, `<rect x="-120" y="-56" width="240" height="56" rx="20" fill="${c}"/><path d="M-70 -56 Q-50 -110 0 -110 H40 Q80 -110 96 -56z" fill="${c}"/><path d="M-50 -60 Q-36 -96 0 -96 H16 V-60z M30 -60 V-96 H38 Q66 -96 78 -60z" fill="#CFEFFF"/><circle cx="-66" cy="0" r="22" fill="#2B2147"/><circle cx="66" cy="0" r="22" fill="#2B2147"/>`, 0, 1);
  const tg = go ? t - (t >= m("lampG2") ? m("lampG2") : m("lampG")) : 0, roll = go ? 900 * tg * Math.min(1, tg) : 0;
  b += car(-520 + roll, -30, "#5B8DEF", 1) + car(-900 + roll * 1.1, -30, "#F6A38F", 1) + car(640 - roll * .9, 150, "#9B6BFF", -1) + car(1500 - roll * .9, 150, "#FFC38A", -1);
  // a pedestrian signal, far away: its figure blinks
  b += TF(1180, -330, 1, `<rect x="-14" y="0" width="28" height="330" fill="#5E6B7C"/><rect x="-60" y="-150" width="120" height="170" rx="20" fill="#221A33" stroke="#fff" stroke-width="8"/><circle cx="0" cy="-104" r="16" fill="${Math.sin(t * 6) > 0 ? "#2FE06A" : "#3A4A44"}"/><path d="M0 -84 V-40 M0 -70 l-20 16 M0 -70 l20 16 M0 -40 l-16 34 M0 -40 l16 34" stroke="${Math.sin(t * 6) > 0 ? "#2FE06A" : "#3A4A44"}" stroke-width="10" stroke-linecap="round"/>`);
  let s = `<g transform="translate(0 ${n2(gy)}) scale(${n2(z)})"><g filter="url(#b6)" opacity=".92"><g transform="translate(0 150) scale(.62)">${b}</g></g><rect x="-1700" y="-900" width="3400" height="1800" fill="#1B2350" opacity=".2"/>` + TF(-120, -38, .62, trafficLight(lit, { pole: 900 })) + `</g>`;
  // one plain label by each lamp as it lights
  const lx = -120, ly = (k) => -38 + k * 105.4;
  if (t > SCN.lclight.t0 + 2.1) s += lcLab(t, m("lampG"), 250, ly(1) + 30, "green", lx + 50, ly(1), { size: 50, t1: m("lampA") - .05 }) + lcLab(t, m("lampA"), 250, ly(0), "amber", lx + 50, ly(0), { size: 50, t1: m("lampR") - .05 }) + lcLab(t, m("lampR"), 250, ly(-1), "red", lx + 50, ly(-1), { size: 50, t1: m("lampG2") - .05 })
    + lcLab(t, m("lampG2"), 300, ly(1) + 30, "green again", lx + 50, ly(1), { size: 50 });
  return s; }

/* ====================================================================================================================================
   THE JOURNEY: BE THE LITTLE RED DOT (first person, present tense). dotJourney(t, s): you stand on the Earth (it curves away under you:
   sea, land, cloud; a small warm glow marks where you are). The Sun is far to one side, large and steady (a soft drawing). The Earth turns:
   the whole sky swings one way, the Sun slides to the curved edge and is gone; black sky, stars, the small lights of a city; the sky keeps
   swinging the same way, a thin bright line grows along the other edge, and the Sun is back in the same far place. Tags: wired in p1.js.
   ==================================================================================================================================== */
const CREAM14 = "#FFF8EA";
function dotJourney(t, s) { const m = MK, K = [[s.t0, 125], [m("jturn"), 125], [m("jaway"), 173], [m("jnight"), 222], [m("jback"), 332], [m("jlight"), 385], [m("jmorning"), 485], [m("jmorning") + 9, 485]];
  const f = (x) => { if (x <= K[0][0]) return K[0][1]; for (let i = 0; i < K.length - 1; i++) if (x < K[i + 1][0]) return lerp(K[i][1], K[i + 1][1], (x - K[i][0]) / (K[i + 1][0] - K[i][0])); return 485; };
  const psi = (f(t - .3) + f(t - .1) + f(t + .1) + f(t + .3)) / 4, a = psi * Math.PI / 180, sx = 960 + 820 * Math.cos(a), sy = 900 - 800 * Math.sin(a), e = 650 - sy, D = ss(-200, 120, e), Nn = 1 - D, EC = [960, 3210], ER = 2650;
  const P_ = (phi, d = 0) => { const p = phi * Math.PI / 180; return [EC[0] + (ER - d) * Math.sin(p), EC[1] - (ER - d) * Math.cos(p)]; };
  let out = `<linearGradient id="djS" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${mixH("#2F8FE8", "#040716", Nn)}"/><stop offset=".62" stop-color="${mixH("#BFE3FA", "#101A45", Nn)}"/></linearGradient><rect width="1920" height="1080" fill="url(#djS)"/>`;
  // the stars swing with the sky
  if (Nn > .2) { let st = ""; for (let i = 0; i < 110; i++) { const r = 260 + 1200 * hash(i, 3), b = hash(i, 7) * Math.PI * 2 + a, x = 960 + r * Math.cos(b), y = 900 - r * Math.sin(b); if (y > 760 || x < -10 || x > 1930 || y < -10) continue; st += `<circle cx="${n2(x)}" cy="${n2(y)}" r="${n2(1.8 + 3.4 * hash(i, 5))}" fill="#FFF9D8" opacity="${n2(.5 + .5 * Math.sin(t * (1.4 + 2 * hash(i, 9)) + i))}"/>`; if (i % 13 === 0) st += TF(x, y, 1 + .3 * Math.sin(t * 2 + i), `<path d="M0 -15 Q2 -2 15 0 Q2 2 0 15 Q-2 2 -15 0 Q-2 -2 0 -15z" fill="#fff"/>`); }
    out += OP(clamp((Nn - .2) / .6), st); }
  // the warm edge of the sky where the Sun is low, and the Sun itself (a soft drawing; it never changes: it is the Earth that turns)
  const low = clamp(1 - Math.abs(e) / 330); if (low > .02) out += `<radialGradient id="djW" gradientUnits="userSpaceOnUse" cx="${n2(sx)}" cy="640" r="900"><stop offset="0" stop-color="#FFC27A" stop-opacity="${n2(.85 * low)}"/><stop offset="1" stop-color="#FFC27A" stop-opacity="0"/></radialGradient><rect width="1920" height="1080" fill="url(#djW)"/>`;
  out += `<circle cx="${n2(sx)}" cy="${n2(sy)}" r="330" fill="url(#f14SunG)" opacity=".9"/><circle cx="${n2(sx)}" cy="${n2(sy)}" r="92" fill="#FFE98A"/><circle cx="${n2(sx)}" cy="${n2(sy)}" r="92" fill="none" stroke="#FFD25A" stroke-width="8" opacity=".7"/>`;
  // the Earth under you: sea, land, cloud by day; the small lights of a city by night
  const sea = mixH("#3C97E6", "#081230", Nn), land = mixH("#86CF7C", "#122A44", Nn), land2 = mixH("#A9DB8A", "#16304A", Nn), rim = mixH("#D8F1FF", "#2B4AA0", Nn);
  out += `<circle cx="${EC[0]}" cy="${EC[1]}" r="${ER + 26}" fill="${rim}" opacity=".35" filter="url(#b16)"/><circle cx="${EC[0]}" cy="${EC[1]}" r="${ER}" fill="${sea}"/><circle cx="${EC[0]}" cy="${EC[1]}" r="${ER - 5}" fill="none" stroke="${rim}" stroke-width="10" opacity=".8"/>`;
  const LD = [[-17, 120, 330, 70], [-9.5, 60, 250, 44], [-4, 210, 300, 80], [3.5, 300, 420, 100], [9, 90, 280, 50], [15, 170, 340, 80], [19.5, 50, 220, 40], [-13, 330, 300, 90], [11.5, 380, 300, 90]];
  LD.forEach(([phi, d, rx, ry], i) => { const [x, y] = P_(phi, d); out += `<ellipse cx="${n2(x)}" cy="${n2(y)}" rx="${rx}" ry="${ry}" fill="${i % 2 ? land : land2}" transform="rotate(${phi} ${n2(x)} ${n2(y)})"/>`; });
  if (Nn > .3) { let ci = ""; LD.forEach(([phi, d, rx, ry], i) => { const [x, y] = P_(phi, d); for (let k = 0; k < 16; k++) { const lx = x + (hash(i * 31 + k, 3) - .5) * rx * 1.5, ly = y + (hash(i * 31 + k, 5) - .5) * ry * 1.2; ci += `<circle cx="${n2(lx)}" cy="${n2(ly)}" r="${n2(2.5 + 3.5 * hash(k, i + 2))}" fill="${k % 4 ? "#FFE08A" : "#FFC9A0"}" opacity="${n2(.55 + .45 * Math.sin(t * (2 + hash(k, 9) * 3) + k + i))}"/>`; } }); out += OP(clamp((Nn - .3) / .5), ci); }
  for (let i = 0; i < 9; i++) { const phi = ((-24 + i * 5.7 + t * .22 + 48) % 48) - 24, [x, y] = P_(phi, 40 + 260 * hash(i, 4)), k = .8 + .7 * hash(i, 6); out += `<g transform="translate(${n2(x)} ${n2(y)}) rotate(${n2(phi)}) scale(${n2(k)})" opacity="${n2(.12 + .8 * D)}"><ellipse cx="0" cy="0" rx="150" ry="26" fill="#fff"/><ellipse cx="-50" cy="-18" rx="70" ry="28" fill="#fff"/><ellipse cx="50" cy="-22" rx="86" ry="34" fill="#fff"/></g>`; }
  // the thin bright line that grows along the other edge before the light comes back
  const dk = ss(332, 380, psi) * (1 - ss(392, 430, psi)); if (dk > .02) { const A = P_(5, -4), B = P_(21, -4); out += `<path d="M${n2(A[0])} ${n2(A[1])} A${ER + 4} ${ER + 4} 0 0 1 ${n2(B[0])} ${n2(B[1])}" fill="none" stroke="#FFE9A8" stroke-width="${n2(30 * dk)}" opacity="${n2(.5 * dk)}" filter="url(#b10)"/><path d="M${n2(A[0])} ${n2(A[1])} A${ER + 4} ${ER + 4} 0 0 1 ${n2(B[0])} ${n2(B[1])}" fill="none" stroke="#FFFBE6" stroke-width="${n2(4 + 8 * dk)}" stroke-linecap="round" opacity="${n2(dk)}"/>`; }
  // you: the little red dot (a warm glow on a small island)
  const [yx, yy] = P_(0, 262), pu = (t * .8) % 1; out += `<ellipse cx="${n2(yx)}" cy="${n2(yy + 6)}" rx="92" ry="34" fill="${mixH("#9BD67E", "#1B3A4E", Nn)}"/><circle cx="${n2(yx)}" cy="${n2(yy)}" r="${n2(24 + 60 * pu)}" fill="none" stroke="#FFB3A8" stroke-width="5" opacity="${n2(.9 * (1 - pu))}"/><circle cx="${n2(yx)}" cy="${n2(yy)}" r="46" fill="#FF6A5C" opacity=".35" filter="url(#b10)"/><circle cx="${n2(yx)}" cy="${n2(yy)}" r="24" fill="#fff"/><circle cx="${n2(yx)}" cy="${n2(yy)}" r="17" fill="#FF3B30" stroke="#B3160E" stroke-width="4"/><circle cx="${n2(yx - 5)}" cy="${n2(yy - 5)}" r="4" fill="#fff" opacity=".8"/>`;
  if (t > s.t0 + 1.9) { const yb = 10 * Math.sin(t * 4), ya = ramp(t, s.t0 + 1.9, .4); out += OP(ya, `<path d="M${n2(yx)} ${n2(yy - 44 + yb * .4)} l-22 -30 h44z" fill="#FFD23A" stroke="${P.ink}" stroke-width="5" stroke-linejoin="round"/>` + youPill(yx, yy - 112 + yb, 1.35)); }
  // good morning: one bird
  const tb = m("jmorning") - .2; if (t > tb) { const u = (t - tb) / 2.6, bx = -80 + 2100 * u, by = 420 - 90 * Math.sin(u * 3), fl = Math.sin(t * 13); out += `<path d="M${n2(bx - 46)} ${n2(by - 22 * fl)} Q${n2(bx - 18)} ${n2(by - 16 - 12 * fl)} ${n2(bx)} ${n2(by)} Q${n2(bx + 18)} ${n2(by - 16 - 12 * fl)} ${n2(bx + 46)} ${n2(by - 22 * fl)}" fill="none" stroke="#3B3560" stroke-width="10" stroke-linecap="round"/>`; }
  // the way in: out of the cream, the red sticker shrinks to the dot you are
  const ki = eio((t - s.t0) / 1.8); if (ki < 1) out += `<rect width="1920" height="1080" fill="${CREAM14}" opacity="${n2(1 - eio((t - s.t0) / 1.0))}"/><circle cx="${n2(lerp(960, yx, ki))}" cy="${n2(lerp(540, yy, ki))}" r="${n2(lerp(1300, 17, ki))}" fill="#FF3B30" opacity="${n2(.95 * (1 - eio((t - s.t0 - .5) / 1.3)))}"/>`;
  return out; }
