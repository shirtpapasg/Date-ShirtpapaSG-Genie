// art.js: promo film 4's drawings. TheOneApp Station (the earlier films' night look: the dome, the "Quiz Yourself" lighthouse, the
// "Videos" airship, searchlights, the train on the viaduct, the Fun Fair wheel, the School Lab, the "My Log" chest), the platform, the
// Gift Shop front, the Dressing Room, the Science Claw in Versus, the quiz cards, the captions and the end card. Pure functions of t.

/* ---------- colours ---------- */
const C = { sky0: "#0C0930", sky1: "#22175E", sky2: "#4B2D8F", grass: "#1B1D45", grass2: "#151634", via: "#2B3478", viaTop: "#5A6BD8",
  cyan: "#4FD8FF", mag: "#F05CFF", gold: "#FFD23F", pink: "#FF6FA8", heart: "#F472B6", capBg: "#1E1546", grey: "#BFB8DA" };
const DAY = { sky0: "#5FB4FF", sky1: "#9AD3FF", sky2: "#FFE3B8", grass: "#4E9A5B", grass2: "#3C7E48", via: "#5D6FB8" };
const mix = (a, b, u) => { const p = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16)); const A = p(a), B = p(b); return "#" + A.map((v, i) => Math.round(lerp(v, B[i], clamp(u))).toString(16).padStart(2, "0")).join(""); };

/* ---------- shared defs (added once by main.js) ---------- */
function ARTDEFS() { return `
  ${lg("dome", [[0, "#5B3FB8", .55], [1, "#2A1E6E", .25]])}
  <linearGradient id="domeRim" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${C.cyan}"/><stop offset=".5" stop-color="#9B7BFF"/><stop offset="1" stop-color="${C.mag}"/></linearGradient>
  ${lg("beamB", [[0, "#6FA8FF", .0], [1, "#6FA8FF", .38]])}${lg("beamV", [[0, "#B07BFF", .0], [1, "#B07BFF", .34]])}
  ${lg("lampBeam", [[0, "#FFF4C8", .55], [1, "#FFF4C8", 0]], 1, 0)}
  ${lg("tower", [[0, "#2C2A6E"], [1, "#1A1848"]])}
  ${lg("glass", [[0, "#3C4F9C"], [1, "#1E2654"]])}
  ${lg("capG", [[0, "#2A1F5C", .94], [1, "#1A1340", .94]])}
  ${lg("tileG", [[0, "#2A2A63"], [1, "#16163A"]])}
  ${lg("carG", [[0, "#FFFFFF"], [1, "#E6E2F2"]])}
  ${lg("goldG", [[0, "#FFE48A"], [1, "#E9A93A"]])}
  ${lg("woodG", [[0, "#C88A52"], [1, "#8A5532"]])}
  ${lg("hudG", [[0, "#0E2A4A", .92], [1, "#08182E", .92]])}
  ${lg("halfL", [[0, "#2A6FDB", .35], [1, "#0E1A3A", .9]])}${lg("halfR", [[0, "#C04BE0", .35], [1, "#1E0E3A", .9]])}
  ${rg("glowY", [[0, "#FFE9A8", .9], [1, "#FFE9A8", 0]])}${rg("glowW", [[0, "#FFFFFF", .8], [1, "#FFFFFF", 0]])}${rg("glowC", [[0, "#7FE3FF", .7], [1, "#7FE3FF", 0]])}
  ${rg("moonGlow", [[0, "#FFF6D8", .35], [1, "#FFF6D8", 0]])}${rg("sunG", [[0, "#FFF7C2"], [.6, "#FFD36B"], [1, "#FFB23A"]])}
  <filter id="glowS" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="6" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  <filter id="neon" x="-20%" y="-50%" width="140%" height="200%"><feGaussianBlur stdDeviation="5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  <filter id="b6" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="6"/></filter>
  <filter id="b18" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="18"/></filter>
  ${rg("glowP", [[0, "#FF8FD0", .75], [1, "#FF8FD0", 0]])}${rg("glowV", [[0, "#B48CFF", .7], [1, "#B48CFF", 0]])}${rg("glowO", [[0, "#FFB25A", .85], [1, "#FFB25A", 0]])}
  ${rg("glowWarm", [[0, "#FFD99A", .55], [.5, "#FFC36B", .18], [1, "#FFC36B", 0]])}${rg("nebV", [[0, "#7B4FD8", .42], [1, "#7B4FD8", 0]])}${rg("nebB", [[0, "#3C6FE0", .32], [1, "#3C6FE0", 0]])}
  ${lg("winWarm", [[0, "#FFF1C2"], [1, "#FFC867"]])}${lg("roofG", [[0, "#F4F2FB"], [1, "#C9C3E2"]])}${lg("skirtG", [[0, "#3A3466"], [1, "#1C1838"]])}
  ${lg("headBeam", [[0, "#FFF6D0", .5], [1, "#FFF6D0", 0]], 1, 0)}${lg("cone", [[0, "#FFE9B0", .38], [1, "#FFE9B0", 0]])}${lg("coneC", [[0, "#BFEFFF", .34], [1, "#BFEFFF", 0]])}
  ${lg("floorFade", [[0, "#1E1E4A", 0], [1, "#1E1E4A", .96]])}${lg("glossFloor", [[0, "#2B2B66"], [1, "#15153A"]])}
  ${lg("wallWarm", [[0, "#7A4A2C"], [1, "#4A2C1A"]])}${lg("shelfG", [[0, "#D39A5E"], [1, "#9A6236"]])}${lg("velvet", [[0, "#B0233F"], [.5, "#7E1530"], [1, "#B0233F"]], 1, 0)}
  ${lg("stageG", [[0, "#3A2558"], [1, "#1A1030"]])}${lg("flameG", [[0, "#FFF7D0"], [.35, "#FFD35A"], [1, "#FF6A2A", 0]])}${lg("snowSky", [[0, "#2A3E7A"], [1, "#7FA3D8"]])}${lg("spaceSky", [[0, "#0A0624"], [1, "#2A1760"]])}
  ${lg("goldText", [[0, "#FFF4B8"], [1, "#FFC233"]])}${lg("gridFade", [[0, "#FF5CF0", 0], [1, "#FF5CF0", .55]])}
  ${winPat("winA", 1)}${winPat("winB", 2)}${winPat("winC", 3)}
  <clipPath id="scrClip"><rect x="0" y="0" width="1920" height="1080" rx="46"/></clipPath>
  <image id="logoImg" href="img/logo.png" width="512" height="512"/>
  ${["shop", "shop2", "dress", "dress2", "boss", "boss2", "claw"].map((k) => `<image id="shot_${k}" href="shots/${k}.jpg" width="1920" height="1080"/>`).join("")}`; }

/* ---------- text helpers ---------- */
const TX = (x, y, s, size, fill, o = {}) => `<text x="${n2(x)}" y="${n2(y)}" font-family="Fredoka" font-weight="${o.w || 700}" font-size="${size}" fill="${fill}" text-anchor="${o.a || "middle"}"${o.ls ? ` letter-spacing="${o.ls}"` : ""}${o.stroke ? ` stroke="${o.stroke}" stroke-width="${o.sw || 8}" stroke-linejoin="round" paint-order="stroke"` : ""}${o.op !== undefined ? ` opacity="${n2(o.op)}"` : ""}>${s}</text>`;
// the small cream sign pills the films use for places ("Quiz Yourself", "School Lab", "My Log")
function sign(x, y, txt, size = 22, o = {}) { const w = tw(txt, size, 700) + size * 1.1, h = size * 1.55;
  return `<g transform="translate(${n2(x)} ${n2(y)})"><rect x="${n2(-w / 2)}" y="${n2(-h / 2)}" width="${n2(w)}" height="${n2(h)}" rx="${n2(h / 2)}" fill="${o.fill || "#FFF6E4"}" stroke="${o.stroke || "#3A2E6E"}" stroke-width="2.5"/>${TX(0, size * .36, esc(txt), size, o.ink || "#2B2147")}</g>`; }

/* ---------- the sky: night (0) to day (1) ---------- */
function sky(t, day = 0, o = {}) {
  const s0 = mix(C.sky0, DAY.sky0, day), s1 = mix(C.sky1, DAY.sky1, day), s2 = mix(C.sky2, DAY.sky2, day); let st = "";
  if (day < .9) for (let i = 0; i < 150; i++) { const x = hash(i, 1) * 1920, y = hash(i, 2) * 700, r = .8 + hash(i, 3) * 1.8, tw_ = .45 + .55 * Math.abs(Math.sin(t * (.6 + hash(i, 4) * 1.5) + i));
    st += `<circle cx="${n2(x)}" cy="${n2(y)}" r="${n2(r)}" fill="#fff" opacity="${n2(tw_ * (1 - day) * .85)}"/>`; }
  // a twinkle cross on a few stars (the films' sparkle)
  if (day < .5) for (let i = 0; i < 5; i++) { const x = hash(i, 9) * 1900 + 10, y = hash(i, 8) * 520 + 20, k = (.5 + .5 * Math.sin(t * 2 + i * 2)) * (1 - day * 2);
    st += `<path d="M${n2(x)} ${n2(y - 12 * k)} L${n2(x)} ${n2(y + 12 * k)} M${n2(x - 12 * k)} ${n2(y)} L${n2(x + 12 * k)} ${n2(y)}" stroke="#fff" stroke-width="2" opacity="${n2(.8 * k)}"/>`; }
  // v3: a few bright stars with halos, and soft violet / blue nebula glows (films 1-3's deep night)
  if (day < .9) for (let i = 0; i < 14; i++) { const x = hash(i, 19) * 1920, y = hash(i, 18) * 560, k = (.6 + .4 * Math.sin(t * 1.3 + i * 2.1)) * (1 - day);
    st += `<circle cx="${n2(x)}" cy="${n2(y)}" r="16" fill="url(#glowW)" opacity="${n2(.55 * k)}"/><circle cx="${n2(x)}" cy="${n2(y)}" r="2.6" fill="#fff" opacity="${n2(k)}"/>`; }
  const neb = day < .95 ? `<ellipse cx="420" cy="260" rx="720" ry="330" fill="url(#nebV)" opacity="${n2(1 - day)}"/><ellipse cx="1560" cy="380" rx="640" ry="300" fill="url(#nebB)" opacity="${n2(1 - day)}"/><ellipse cx="960" cy="760" rx="1300" ry="260" fill="url(#nebV)" opacity="${n2(.8 * (1 - day))}"/>` : "";
  return `<linearGradient id="skyG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${s0}"/><stop offset=".55" stop-color="${s1}"/><stop offset="1" stop-color="${s2}"/></linearGradient>
    <rect x="-400" y="-300" width="2720" height="1700" fill="url(#skyG)"/>${neb}${st}`; }
function moon(x, y, r = 56, o = 1) { return OP(o, `<circle cx="${x}" cy="${y}" r="${r * 3.2}" fill="url(#moonGlow)"/><path d="M${x + r * .35} ${y - r} A${r} ${r} 0 1 0 ${x + r * .9} ${y + r * .55} A${r * .78} ${r * .78} 0 1 1 ${x + r * .35} ${y - r}z" fill="#FFF6DE"/>`); }
function sunDisc(x, y, r = 70, o = 1) { return OP(o, `<circle cx="${x}" cy="${y}" r="${r * 2.6}" fill="url(#glowY)" opacity=".7"/><circle cx="${x}" cy="${y}" r="${r}" fill="url(#sunG)"/>`); }
// searchlights from the bay towers, sweeping slowly
function beams(t, o = 1) { let s = "";
  [[1630, 560, -18, "beamB", 0], [1700, 560, 12, "beamV", 1.7], [1780, 560, -4, "beamB", 3.1], [1560, 560, 24, "beamV", 4.4], [120, 600, 30, "beamV", 2.2]].forEach(([x, y, a0, g, ph]) => {
    const a = a0 + 9 * Math.sin(t * .35 + ph); s += `<g transform="translate(${x} ${y}) rotate(${n2(a)})"><path d="M-8 0 L-90 -980 L90 -980 L8 0z" fill="url(#${g})"/></g>`; });
  return OP(o, s); }

/* ---------- v3: the richer night (films 1-3's look): window patterns, a layered skyline, fireflies, foreground grass ---------- */
// a tile of lit windows (most warm yellow, a few cyan or pink, a few dark), repeated over a building's face
function winPat(id, seed) { let s = ""; const cols = ["#FFD86B", "#FFD86B", "#FFE9A8", "#FFD86B", "#8FE3FF", "#FFB0D8"];
  for (let i = 0; i < 5; i++) for (let j = 0; j < 6; j++) { const h_ = hash(i * 7 + j * 13, seed); if (h_ < .34) continue;
    s += `<rect x="${4 + i * 18}" y="${5 + j * 20}" width="9" height="11" rx="1" fill="${cols[Math.floor(hash(i + j * 5, seed + 4) * cols.length)]}" opacity="${n2(.55 + .45 * hash(i * 3 + j, seed + 8))}"/>`; }
  return `<pattern id="${id}" width="90" height="120" patternUnits="userSpaceOnUse">${s}</pattern>`; }
// a row of buildings across the whole width (base line y), windows from the patterns; o: seed, h0, h1, col, lit
function skyline(y, day, t, o = {}) { const nt = 1 - day, sd = o.seed || 51; let s = "", x = -420, i = 0; const col = mix(o.col || "#1C1852", "#8796C8", day * .7);
  while (x < 2340) { const w = 54 + hash(i, sd) * 96, h = (o.h0 || 110) + hash(i, sd + 1) ** 1.6 * (o.h1 || 240);
    s += `<rect x="${n2(x)}" y="${n2(y - h)}" width="${n2(w)}" height="${n2(h + 60)}" fill="${col}"/>`;
    if (hash(i, sd + 9) > .18) s += `<rect x="${n2(x + 5)}" y="${n2(y - h + 10)}" width="${n2(w - 10)}" height="${n2(h - 10)}" fill="url(#${["winA", "winB", "winC"][i % 3]})" opacity="${n2(nt * (o.lit || .9))}"/>`;
    s += `<rect x="${n2(x)}" y="${n2(y - h)}" width="${n2(w)}" height="3" fill="${o.rim || "#4B43A8"}" opacity="${n2(.7 * nt + .2)}"/>`;
    if (h > (o.h0 || 110) + (o.h1 || 240) * .55) { const ax = x + w / 2; s += `<path d="M${n2(ax)} ${n2(y - h)} V${n2(y - h - 34)}" stroke="${col}" stroke-width="3"/>`;
      if (nt > .2) { const bl = .5 + .5 * Math.sin(t * 3 + i); s += `<circle cx="${n2(ax)}" cy="${n2(y - h - 36)}" r="4" fill="#FF4D6D" opacity="${n2(bl * nt)}"/><circle cx="${n2(ax)}" cy="${n2(y - h - 36)}" r="16" fill="url(#glowP)" opacity="${n2(bl * nt * .8)}"/>`; } }
    x += w + 3 + hash(i, sd + 3) * 22; i++; }
  return s; }
// fireflies / floating light motes: drifting, twinkling dots with a soft halo (the films' glow in the air)
function motes(t, n = 26, y0 = 420, y1 = 1000, o = {}) { let s = ""; const cols = o.cols || ["#FFF3B0", "#BFEFFF", "#FFC2E6"];
  for (let i = 0; i < n; i++) { const x = (hash(i, 61) * 2200 + t * (8 + 14 * hash(i, 62))) % 2200 - 140, y = y0 + hash(i, 63) * (y1 - y0) + 18 * Math.sin(t * (.6 + hash(i, 64)) + i), a = .35 + .65 * Math.abs(Math.sin(t * (.8 + hash(i, 65)) + i * 1.7)), c = cols[i % cols.length], r = 2 + 2.2 * hash(i, 66);
    s += `<circle cx="${n2(x)}" cy="${n2(y)}" r="${n2(r * 5)}" fill="url(#${c === "#BFEFFF" ? "glowC" : c === "#FFC2E6" ? "glowP" : "glowY"})" opacity="${n2(a * .55 * (o.op || 1))}"/><circle cx="${n2(x)}" cy="${n2(y)}" r="${n2(r)}" fill="${c}" opacity="${n2(a * (o.op || 1))}"/>`; }
  return s; }
// a flower: five petals and a yellow eye (the films' ground flowers); glow adds a soft halo
function flower(x, y, r, col, glow = 0) { let s = glow ? `<circle cx="${n2(x)}" cy="${n2(y)}" r="${n2(r * 3.2)}" fill="url(#glowP)" opacity="${n2(glow)}"/>` : "";
  s += `<path d="M${n2(x)} ${n2(y + r * .6)} q${n2(-r * .3)} ${n2(r * 1.6)} ${n2(-r * .1)} ${n2(r * 2.6)}" stroke="#3C7A55" stroke-width="${n2(Math.max(1.5, r * .28))}" fill="none"/>`;
  for (let k = 0; k < 5; k++) { const a = k * 1.2566 - 1.57; s += `<circle cx="${n2(x + Math.cos(a) * r * .62)}" cy="${n2(y + Math.sin(a) * r * .62)}" r="${n2(r * .5)}" fill="${col}"/>`; }
  return s + `<circle cx="${n2(x)}" cy="${n2(y)}" r="${n2(r * .36)}" fill="#FFE27A"/>`; }
// foreground grass tufts along the bottom edge (dark, near the camera)
function foreGrass(t, y = 1080, o = {}) { let s = ""; const col = o.col || "#100F2C";
  for (let i = 0; i < 44; i++) { const x = hash(i, 71) * 2100 - 90; if (o.sides && x > 420 && x < 1500) continue; const h = 40 + 70 * hash(i, 72), sw = 6 * Math.sin(t * 1.2 + i);
    s += `<path d="M${n2(x - 10)} ${y} Q${n2(x - 4 + sw * .5)} ${n2(y - h * .6)} ${n2(x + sw)} ${n2(y - h)} Q${n2(x + 6)} ${n2(y - h * .5)} ${n2(x + 12)} ${y}z" fill="${col}"/>`; }
  for (let i = 0; i < 9; i++) { const x = hash(i, 74) * 1900 + 10; if (o.sides && x > 420 && x < 1500) continue; s += flower(x, y - 60 - 40 * hash(i, 75), 12 + 6 * hash(i, 76), ["#FF6FA8", "#FFB14A", "#6FA8FF", "#B07BFF"][i % 4], .35); }
  return s; }

/* ---------- the Station's pieces ---------- */
function ferris(t, cx, cy, r) { let s = `<circle cx="${cx}" cy="${cy}" r="${r + 30}" fill="url(#glowV)" opacity=".45"/><circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#9A86FF" stroke-width="6" opacity=".95"/><circle cx="${cx}" cy="${cy}" r="${r * .62}" fill="none" stroke="#7E6BE8" stroke-width="3" opacity=".7"/><circle cx="${cx}" cy="${cy}" r="${r * .15}" fill="#5A4CC0"/>`;
  const a0 = t * .12; for (let i = 0; i < 12; i++) { const a = a0 + i * Math.PI / 6, x = cx + Math.cos(a) * r, y = cy + Math.sin(a) * r, col = ["#FF6FA8", "#FFD23F", "#4FD8FF", "#7BE08F"][i % 4];
    s += `<path d="M${cx} ${cy} L${n2(x)} ${n2(y)}" stroke="#6B5BD6" stroke-width="2.5" opacity=".7"/><circle cx="${n2(x)}" cy="${n2(y + 8)}" r="30" fill="url(#glowY)" opacity=".35"/><rect x="${n2(x - 12)}" y="${n2(y - 2)}" width="24" height="20" rx="7" fill="${col}"/><rect x="${n2(x - 7)}" y="${n2(y + 2)}" width="14" height="8" rx="2" fill="#FFF3C4" opacity=".9"/>`; }
  for (let i = 0; i < 24; i++) { const a = a0 * 1.0 + i * Math.PI / 12, on = .5 + .5 * Math.sin(t * 5 + i); s += `<circle cx="${n2(cx + Math.cos(a) * r)}" cy="${n2(cy + Math.sin(a) * r)}" r="3.2" fill="#FFF6D8" opacity="${n2(.4 + .6 * on)}"/>`; }
  s += `<path d="M${cx - 60} ${cy + r + 120} L${cx} ${cy} L${cx + 60} ${cy + r + 120}" stroke="#5A4CC0" stroke-width="8" fill="none"/>`;
  return s; }
function block(x, y, w, h, lit = 1, seed = 1, col = "#1F1B55") { let s = `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${col}"/>`;
  for (let i = 0; i < Math.floor(w / 18); i++) for (let j = 0; j < Math.floor(h / 22); j++) { if (hash(i * 31 + j, seed) < .35) continue; s += `<rect x="${x + 7 + i * 18}" y="${y + 9 + j * 22}" width="9" height="11" fill="#FFD86B" opacity="${n2((.55 + .45 * hash(i + j * 7, seed + 3)) * lit)}"/>`; }
  return s; }
function lighthouse(t, x, base, top, day = 0) { const w0 = 46, w1 = 30; let s = "";
  const a = -150 + 40 * Math.sin(t * .5);   // the lamp's beam sweeps over the sky
  if (day < .8) s += OP(1 - day, `<g transform="translate(${x} ${top - 26}) rotate(${n2(a)})"><path d="M0 -10 L760 -120 L760 120 L0 10z" fill="url(#lampBeam)"/></g><g transform="translate(${x} ${top - 26}) rotate(${n2(a + 180)})"><path d="M0 -8 L420 -60 L420 60 L0 8z" fill="url(#lampBeam)" opacity=".6"/></g><circle cx="${x}" cy="${top - 26}" r="70" fill="url(#glowY)"/>`);
  const H = base - top; for (let i = 0; i < 6; i++) { const y0 = top + H * i / 6, y1 = top + H * (i + 1) / 6, wa = lerp(w1, w0, i / 6), wb = lerp(w1, w0, (i + 1) / 6);
    s += `<path d="M${n2(x - wa)} ${n2(y0)} L${n2(x + wa)} ${n2(y0)} L${n2(x + wb)} ${n2(y1)} L${n2(x - wb)} ${n2(y1)}z" fill="${i % 2 ? "#F7F1FF" : "#E2475B"}"/>`; }
  s += `<rect x="${x - 40}" y="${top - 6}" width="80" height="10" rx="3" fill="#2B2147"/><rect x="${x - 22}" y="${top - 50}" width="44" height="44" rx="6" fill="#FFF1B0"/><path d="M${x - 30} ${top - 50} L${x} ${top - 82} L${x + 30} ${top - 50}z" fill="#E2475B"/>`;
  s += `<path d="M${x - 10} ${base} L${x - 10} ${base - 34} Q${x} ${base - 46} ${x + 10} ${base - 34} L${x + 10} ${base}z" fill="#2B2147"/>`;
  return s + sign(x, top - 116, "Quiz Yourself", 22); }
function school(x, y, t) { // the School Lab: a small Singapore school block with its clock
  return `<rect x="${x}" y="${y}" width="170" height="110" fill="#3A2F7E"/><rect x="${x}" y="${y}" width="170" height="16" fill="#E2475B"/>` +
    [0, 1, 2, 3].map((i) => `<rect x="${x + 14 + i * 40}" y="${y + 34}" width="26" height="30" fill="#FFD86B" opacity=".9"/><rect x="${x + 14 + i * 40}" y="${y + 74}" width="26" height="26" fill="#FFD86B" opacity=".75"/>`).join("") +
    `<rect x="${x + 60}" y="${y - 44}" width="50" height="46" fill="#2B2147"/><circle cx="${x + 85}" cy="${y - 20}" r="17" fill="#FFF6E4"/><path d="M${x + 85} ${y - 20} L${x + 85} ${y - 31} M${x + 85} ${y - 20} L${n2(x + 85 + 8 * Math.cos(t))} ${n2(y - 20 + 8 * Math.sin(t))}" stroke="#2B2147" stroke-width="3" stroke-linecap="round"/>` + sign(x + 85, y - 70, "School Lab", 22); }
function dome(t, cx, cy, r) { let g = "";
  for (let i = 1; i < 8; i++) { const a = Math.PI * i / 8, x = cx - Math.cos(a) * r; g += `<path d="M${n2(x)} ${cy} Q${n2(cx - Math.cos(a) * r * .55)} ${n2(cy - r * 1.05)} ${cx} ${cy - r}" fill="none" stroke="#B9A6FF" stroke-width="1.5" opacity=".35"/>`; g += `<path d="M${n2(2 * cx - x)} ${cy} Q${n2(cx + Math.cos(a) * r * .55)} ${n2(cy - r * 1.05)} ${cx} ${cy - r}" fill="none" stroke="#B9A6FF" stroke-width="1.5" opacity=".35"/>`; }
  for (let j = 1; j < 4; j++) { const yy = cy - r * j / 4, xx = Math.sqrt(r * r - (cy - yy) ** 2); g += `<path d="M${n2(cx - xx)} ${n2(yy)} Q${cx} ${n2(yy - 18)} ${n2(cx + xx)} ${n2(yy)}" fill="none" stroke="#B9A6FF" stroke-width="1.5" opacity=".3"/>`; }
  let lights = ""; for (let i = 0; i <= 20; i++) { const a = Math.PI + i * Math.PI / 20, on = .55 + .45 * Math.sin(t * 2.4 - i * .5); lights += `<circle cx="${n2(cx + Math.cos(a) * r)}" cy="${n2(cy + Math.sin(a) * r)}" r="4" fill="#fff" opacity="${n2(on)}"/>`; }
  return `<ellipse cx="${cx}" cy="${cy - r * .35}" rx="${r * 1.25}" ry="${r * .95}" fill="url(#glowV)" opacity=".55"/><path d="M${cx - r} ${cy} A${r} ${r} 0 0 1 ${cx + r} ${cy}z" fill="url(#dome)"/><ellipse cx="${cx}" cy="${cy - 30}" rx="${r * .7}" ry="${r * .5}" fill="url(#glowP)" opacity="${n2(.28 + .08 * Math.sin(t * 1.5))}"/>${g}${lights}<path d="M${cx - r} ${cy} A${r} ${r} 0 0 1 ${cx + r} ${cy}" fill="none" stroke="url(#domeRim)" stroke-width="9" filter="url(#neon)"/>` + oneBadge(cx, cy - r - 34, 1, t); }
function oneBadge(x, y, s, t) { // the "1" on the dome, with its little halo ring
  return TF(x, y, s, `<ellipse cx="0" cy="-62" rx="30" ry="10" fill="none" stroke="${C.cyan}" stroke-width="3.5" opacity="${n2(.7 + .3 * Math.sin(t * 2))}"/><path d="M0 -52 L0 -32" stroke="${C.cyan}" stroke-width="3"/>
    <rect x="-26" y="-32" width="52" height="56" rx="12" fill="#12203F" stroke="${C.cyan}" stroke-width="4" filter="url(#glowS)"/>${TX(0, 12, "1", 40, C.gold)}`); }
function towers(x, y, day = 0) { let s = ""; // the bay's three towers with their deck, yellow window bands
  for (let i = 0; i < 3; i++) { const tx = x + i * 92; s += `<rect x="${tx}" y="${y}" width="62" height="${800 - y + 40}" fill="url(#tower)"/>`;
    for (let j = 0; j < 14; j++) s += `<rect x="${tx + 10}" y="${y + 20 + j * 18}" width="42" height="5" fill="#FFD86B" opacity="${n2((.9 - .5 * day) * (j % 4 === 3 ? .4 : 1))}"/>`; }
  return s + `<rect x="${x - 26}" y="${y - 22}" width="${92 * 2 + 62 + 52}" height="20" rx="10" fill="#2C2A6E"/>`; }
function supertree(x, y, h, t) { return `<path d="M${x - 10} ${y} L${x - 4} ${y - h} L${x + 4} ${y - h} L${x + 10} ${y}z" fill="#7E4FD0"/><ellipse cx="${x}" cy="${y - h}" rx="90" ry="22" fill="none" stroke="#B07BFF" stroke-width="5"/>` +
  [0, 1, 2, 3, 4, 5, 6].map((i) => `<path d="M${x} ${y - h + 6} L${x - 90 + i * 30} ${y - h}" stroke="#B07BFF" stroke-width="2" opacity=".7"/>`).join("") + `<ellipse cx="${x}" cy="${y - h}" rx="96" ry="26" fill="#B07BFF" opacity="${n2(.15 + .1 * Math.sin(t * 1.3))}" filter="url(#b6)"/>`; }
function chest(x, y, t) { const g = .6 + .4 * Math.sin(t * 2.2);
  return `<ellipse cx="${x}" cy="${y - 150}" rx="44" ry="16" fill="none" stroke="${C.cyan}" stroke-width="3" opacity=".8"/><path d="M${x} ${y - 196} L${x + 16} ${y - 150} L${x} ${y - 104} L${x - 16} ${y - 150}z" fill="#E8F6FF" opacity="${n2(g)}" filter="url(#glowS)"/>
    <rect x="${x - 56}" y="${y - 78}" width="112" height="78" rx="10" fill="#E9A93A"/><path d="M${x - 56} ${y - 54} H${x + 56}" stroke="#8A5532" stroke-width="5"/><rect x="${x - 12}" y="${y - 62}" width="24" height="26" rx="5" fill="#8A5532"/>` + sign(x, y - 238, "My Log", 22); }
function airship(x, y, s, t, screen) { // the "Videos" airship with its NOW SHOWING screen
  const bob = 6 * Math.sin(t * .9);
  return TF(x, y + bob, s, `<path d="M-140 -10 L-185 -42 L-176 6z" fill="#E2475B"/><ellipse cx="0" cy="0" rx="180" ry="62" fill="#F1EEFA"/><ellipse cx="0" cy="-18" rx="150" ry="26" fill="#fff" opacity=".7"/><path d="M-178 14 Q0 70 178 14" fill="none" stroke="#E2475B" stroke-width="9"/>${TX(0, 12, "Videos", 36, "#2B2147")}
    <path d="M-60 52 L-70 96 M60 52 L70 96" stroke="#9AA4C8" stroke-width="3"/><rect x="-120" y="92" width="240" height="150" rx="12" fill="#0E2A4A" stroke="${C.cyan}" stroke-width="4"/>${TX(0, 118, "NOW SHOWING", 17, C.gold, { ls: 1 })}
    ${screen ? `<g transform="translate(-106 128) scale(${n2(212 / 1920)})"><use href="#shot_${screen}"/></g>` : ""}`); }
function grass(day = 0, y = 820, t = 0) { let s = `<linearGradient id="grG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${mix("#2A2C66", DAY.grass, day)}"/><stop offset="1" stop-color="${mix("#121331", DAY.grass2, day)}"/></linearGradient><rect x="-400" y="${y}" width="2720" height="${1200 - y}" fill="url(#grG)"/>`;
  s += `<rect x="-400" y="${y}" width="2720" height="5" fill="${mix("#5A6BD8", "#7FC88A", day)}" opacity=".55"/>`;
  for (let i = 0; i < 150; i++) { const x = hash(i, 11) * 2200 - 140, yy = y + 24 + hash(i, 12) ** .8 * 250, h = 10 + 10 * hash(i, 13) * (yy - y) / 200;
    s += `<path d="M${n2(x)} ${n2(yy)} l-3 ${n2(-h)} M${n2(x + 5)} ${n2(yy)} l2 ${n2(-h * .8)}" stroke="${mix("#4A4C92", "#2F6E3A", day)}" stroke-width="2.2" opacity=".8"/>`; }
  for (let i = 0; i < 46; i++) { const x = hash(i, 21) * 2100 - 90, yy = y + 34 + hash(i, 22) ** .9 * 240, r = 5 + 6 * (yy - y) / 250;
    s += flower(x, yy, r, ["#FF6FA8", "#FFB14A", "#6FA8FF", "#B07BFF", "#7BE08F"][i % 5], (1 - day) * (.25 + .2 * Math.sin(t * 1.6 + i))); }
  return s; }
// the train: n carriages, the front at x (moving left to right means x grows)
function train(x, y, n = 6, o = {}) { let s = "", glow = "", refl = ""; const W = 214, H = 72, nt = o.nt === undefined ? 1 : o.nt;
  for (let i = 0; i < n; i++) { const L = x - i * (W + 10) - W, front = i === 0, back = i === n - 1, rl = back ? 26 : 8, rr = front ? 34 : 8;
    let c = `<path d="M${rl} 6 H${W - rr} Q${W} 6 ${W} ${rr + 6} V${H - 6} H0 V${rl + 6} Q0 6 ${rl} 6z" fill="url(#carG)"/>`;
    c += `<rect x="10" y="0" width="${W - 20}" height="9" rx="4.5" fill="url(#roofG)"/><rect x="${W / 2 - 28}" y="-7" width="56" height="9" rx="3" fill="#B9B3D6"/>`;
    c += `<rect x="6" y="16" width="${W - (front ? 30 : 12)}" height="27" rx="7" fill="#2A2554"/>`;
    for (let j = 0; j < 4; j++) { const wx = 14 + j * 46; if (wx + 34 > W - (front ? 32 : 10)) break; c += `<rect x="${wx}" y="19" width="34" height="21" rx="5" fill="url(#winWarm)" opacity="${n2(.55 + .45 * nt)}"/>`;
      if (hash(i * 5 + j, 81) > .35) c += `<circle cx="${n2(wx + 10 + 14 * hash(i + j, 82))}" cy="33" r="5.5" fill="${["#6B4A3A", "#2E2A44", "#8A5A3A", "#3A2F2A"][(i + j) % 4]}" opacity=".75"/><path d="M${n2(wx + 3 + 14 * hash(i + j, 82))} 41 q7 -9 14 0" fill="${["#E2475B", "#4FA8FF", "#7BE08F", "#FFB14A"][(i + j) % 4]}" opacity=".7"/>`; }
    for (const dx of [W * .3 - 11, W * .72 - 11]) c += `<rect x="${n2(dx)}" y="13" width="22" height="${H - 19}" rx="3" fill="none" stroke="#B5AED2" stroke-width="2"/><rect x="${n2(dx + 4)}" y="18" width="14" height="22" rx="2" fill="#FFE7A6" opacity=".85"/>`;
    c += `<rect x="0" y="${H - 22}" width="${W}" height="7" fill="${C.pink}"/><rect x="0" y="${H - 13}" width="${W}" height="2.5" fill="${C.cyan}" opacity=".8"/><rect x="2" y="${H - 6}" width="${W - 4}" height="12" rx="4" fill="url(#skirtG)"/>`;
    c += `<rect x="18" y="${H + 2}" width="44" height="9" rx="4.5" fill="#15122E"/><rect x="${W - 62}" y="${H + 2}" width="44" height="9" rx="4.5" fill="#15122E"/>`;
    if (front) { c += `<path d="M${W - 30} 16 Q${W - 6} 18 ${W - 3} 42 L${W - 30} 42z" fill="#2A2554"/><path d="M${W - 26} 19 Q${W - 10} 22 ${W - 8} 39 L${W - 26} 39z" fill="#8FDBFF" opacity=".55"/><circle cx="${W - 9}" cy="${H - 26}" r="5" fill="#FFFBE8"/>`;
      glow += `<circle cx="${n2(L + W - 9)}" cy="${n2(y + H - 26)}" r="34" fill="url(#glowW)" opacity="${n2(.9 * nt)}"/><path d="M${n2(L + W - 9)} ${n2(y + H - 30)} L${n2(L + W + 420)} ${n2(y + H - 90)} L${n2(L + W + 420)} ${n2(y + H + 40)}z" fill="url(#headBeam)" opacity="${n2(.8 * nt)}"/>`; }
    if (!back) c += `<rect x="${W}" y="${H - 30}" width="10" height="16" fill="#2A2554"/>`;
    s += `<g transform="translate(${n2(L)} ${y})">${c}</g>`;
    glow += `<ellipse cx="${n2(L + W / 2)}" cy="${n2(y + 30)}" rx="${W * .62}" ry="44" fill="url(#glowWarm)" opacity="${n2(.55 * nt)}"/>`;
    refl += `<rect x="${n2(L + 8)}" y="${n2(y + H + 16)}" width="${W - 16}" height="5" rx="2" fill="#FFE7A6" opacity="${n2(.35 * nt)}"/><rect x="${n2(L + 4)}" y="${n2(y + H + 24)}" width="${W - 8}" height="3" fill="${C.pink}" opacity=".3"/>`; }
  return OP(o.op === undefined ? 1 : o.op, glow + s + (o.refl === false ? "" : refl)); }
function viaduct(y, day = 0) { return `<rect x="-400" y="${y}" width="2720" height="16" fill="${mix(C.via, DAY.via, day)}"/><rect x="-400" y="${y}" width="2720" height="4" fill="${C.viaTop}" opacity=".8"/>` +
  [0, 1, 2, 3, 4, 5, 6, 7].map((i) => `<rect x="${-60 + i * 300}" y="${y + 16}" width="18" height="${830 - y}" fill="${mix("#24296A", "#4B5C9E", day)}"/>`).join(""); }
function lightRail(t, y) { let s = `<path d="M-100 ${y} H2100" stroke="#6FC8FF" stroke-width="3" opacity=".7"/>`;
  for (let i = 0; i < 44; i++) { const x = i * 48 - ((t * 60) % 48); s += `<circle cx="${n2(x)}" cy="${y}" r="5" fill="#BFE9FF" opacity="${n2(.6 + .4 * Math.sin(i + t * 3))}"/>`; }
  return s; }

/* The whole Station, wide (the films' establishing shot). o: day (0..1), trainX (front of the train), shop (0 dark .. 1 lit), screen, fw (fireworks t0) */
function station(t, o = {}) { const day = o.day || 0, nt = 1 - day;
  let s = sky(t, day);
  s += moon(1270, 150 + 400 * day, 56, nt) + (day > .02 ? sunDisc(lerp(300, 1500, o.sunU === undefined ? .5 : o.sunU), 260 - 120 * Math.sin(Math.PI * (o.sunU === undefined ? .5 : o.sunU)), 64, day) : "");
  s += beams(t, nt * .95);
  if (o.fw !== undefined) s += fireworks(t, o.fw);
  // far skyline
  s += OP(1, `<g opacity="${n2(.85)}">${block(140, 610, 90, 210, nt, 3)}${block(1110, 640, 80, 180, nt, 5)}${block(1240, 600, 70, 220, nt, 7)}${block(560, 650, 70, 170, nt, 9, "#25205E")}</g>`);
  s += towers(1560, 560, day) + supertree(1880, 820, 330, t) + supertree(1760, 830, 200, t + 1);
  s += ferris(t, 60, 640, 170) + sign(70, 430, "Fun Fair", 22);
  s += school(250, 700, t * .2) + lighthouse(t, 470, 820, 520, day);
  s += dome(t, 950, 760, 330) + sign(950, 628, "TheOneApp Station", 28, { fill: "#FFF6E4" });
  s += viaduct(738, day) + train(o.trainX === undefined ? 1640 : o.trainX, 676);
  s += chest(1800, 830, t);
  s += grass(day, 818) + lightRail(t, 852);
  if (o.shop !== undefined) s += giftShopMini(1350, 838, o.shop, t);
  s += airship(o.shipX || 300, 150, .82, t, o.screen);
  return s; }
// fireworks (the end card): bursts of dots, each from a list of (time, x, y, colour)
function fireworks(t, t0) { let s = ""; const B = [[0, 1500, 260, "#FFB14A"], [.6, 420, 220, "#6FA8FF"], [1.3, 1650, 180, "#FF6FA8"], [2.0, 300, 300, "#FFD23F"], [2.6, 1420, 330, "#B07BFF"], [3.3, 560, 180, "#7BE08F"], [4.0, 1580, 240, "#FFD23F"], [4.8, 380, 250, "#FF6FA8"], [5.6, 1480, 200, "#6FA8FF"], [6.3, 480, 300, "#FFB14A"]];
  for (const [d, x, y, col] of B) { const u = (t - t0 - d) / 1.6; if (u < 0 || u > 1) continue; const r = 150 * eo(u), op = 1 - ei(u);
    for (let i = 0; i < 26; i++) { const a = i * Math.PI * 2 / 26 + d, px = x + Math.cos(a) * r, py = y + Math.sin(a) * r + 40 * u * u;
      s += `<path d="M${n2(x + Math.cos(a) * r * .75)} ${n2(y + Math.sin(a) * r * .75 + 30 * u * u)} L${n2(px)} ${n2(py)}" stroke="${col}" stroke-width="3" opacity="${n2(op * .6)}"/><circle cx="${n2(px)}" cy="${n2(py)}" r="4.5" fill="${col}" opacity="${n2(op)}"/>`; } }
  return s; }

/* ---------- the Gift Shop front (the app's: green and cream awning, the wooden board, string lights) ---------- */
function giftShop(x, y, w, h, lit, t) { // x, y = the top left of the shopfront; lit 0..1
  const aw = 70, stripes = 10; let s = "";
  s += `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${mix("#231C4D", "#3A2A5E", lit)}"/>`;
  // the window: dark, then warm
  s += `<rect x="${x + 40}" y="${y + aw + 50}" width="${w - 80}" height="${h - aw - 120}" rx="14" fill="${mix("#141030", "#FFE3A8", lit)}"/>`;
  if (lit > .05) s += OP(lit, `<rect x="${x + 40}" y="${y + aw + 50}" width="${w - 80}" height="${h - aw - 120}" rx="14" fill="url(#glowY)" opacity=".6"/>` +
    // shelves with things on them (drawn small: hats, goggles, bags)
    [0, 1].map((r) => `<rect x="${x + 60}" y="${y + aw + 130 + r * 120}" width="${w - 120}" height="8" fill="#B97B48"/>`).join("") +
    [[.2, 0, "#FF6FA8"], [.4, 0, "#4FD8FF"], [.62, 0, "#FFD23F"], [.82, 0, "#7BE08F"], [.25, 1, "#B07BFF"], [.5, 1, "#FFB14A"], [.75, 1, "#6FA8FF"]].map(([u, r, c]) => `<path d="M${n2(x + w * u - 26)} ${y + aw + 128 + r * 120} Q${n2(x + w * u)} ${y + aw + 70 + r * 120} ${n2(x + w * u + 26)} ${y + aw + 128 + r * 120}z" fill="${c}"/>`).join(""));
  else s += `<path d="M${x + 60} ${y + aw + 70} L${x + w - 60} ${y + h - 90}" stroke="#2D2660" stroke-width="3"/>`;
  // the door
  s += `<rect x="${x + w / 2 - 50}" y="${y + h - 150}" width="100" height="150" rx="10" fill="${mix("#18133A", "#8A5532", lit)}"/>`;
  // awning
  for (let i = 0; i < stripes; i++) { const sx = x - 20 + i * (w + 40) / stripes; s += `<path d="M${n2(sx)} ${y} h${n2((w + 40) / stripes)} v${aw} q${n2(-(w + 40) / stripes / 2)} 26 ${n2(-(w + 40) / stripes)} 0z" fill="${i % 2 ? mix("#2C3A3A", "#EFE5CF", lit) : mix("#163028", "#1E8A5A", lit)}"/>`; }
  // string lights
  let b = ""; for (let i = 0; i <= 16; i++) { const bx = x - 10 + i * (w + 20) / 16, by = y - 10 + 14 * Math.sin(Math.PI * (i % 4) / 4); const on = lit * (.7 + .3 * Math.sin(t * 4 + i));
    b += `<circle cx="${n2(bx)}" cy="${n2(by)}" r="7" fill="${mix("#3A3466", ["#FF6FA8", "#FFD23F", "#6FA8FF", "#7BE08F"][i % 4], on)}"/>` + (on > .3 ? `<circle cx="${n2(bx)}" cy="${n2(by)}" r="18" fill="url(#glowY)" opacity="${n2(on * .7)}"/>` : ""); }
  s += `<path d="M${x - 10} ${y - 10} Q${x + w / 2} ${y + 14} ${x + w + 10} ${y - 10}" fill="none" stroke="#2B2147" stroke-width="2"/>` + b;
  // the board
  s += `<g transform="translate(${x + w / 2} ${y - 52})"><path d="M-110 -10 L-120 -60 M110 -10 L120 -60" stroke="#6B4A32" stroke-width="3"/><rect x="-170" y="-36" width="340" height="72" rx="12" fill="${mix("#3B2A22", "#9A6136", lit)}" stroke="${mix("#2B2020", "#6B4021", lit)}" stroke-width="5"/>${TX(0, 15, "The Gift Shop", 40, mix("#6E6488", "#FFF1D8", lit))}</g>`;
  return s; }
function giftShopMini(x, y, lit, t) { return TF(x, y, .32, giftShop(-260, -470, 520, 470, lit, t)); }

/* ---------- the pupils' characters (the app's avatar.js art, avatars.js) ---------- */
// front view, feet at (x, y), height h. o: sat (1 colour .. 0 grey), rot, sx (squash), op
function avFront(name, x, y, h, o = {}) { const A = AV[name]; if (!A) return ""; const s = h / 216, W = 148 * s;
  let svg = A.front.replace(/^<svg class="av-front" viewBox="([^"]+)" width="\d+" height="\d+"/, `<svg viewBox="$1" x="${n2(-74 * s)}" y="${n2(-210 * s)}" width="${n2(W)}" height="${n2(h)}" overflow="visible"`);
  const sat = o.sat === undefined ? 1 : o.sat, fid = "sat" + Math.round(sat * 100);
  const f = sat < .995 ? `<filter id="${fid}" x="-10%" y="-10%" width="120%" height="120%"><feColorMatrix type="saturate" values="${n2(sat)}"/><feComponentTransfer><feFuncR type="linear" slope="${n2(lerp(.82, 1, sat))}"/><feFuncG type="linear" slope="${n2(lerp(.82, 1, sat))}"/><feFuncB type="linear" slope="${n2(lerp(.9, 1, sat))}"/></feComponentTransfer></filter>` : "";
  const sh = o.shadow === false ? "" : `<ellipse cx="0" cy="2" rx="${n2(h * .2)}" ry="${n2(h * .035)}" fill="#0A0820" opacity=".45"/>`;
  return OP(o.op === undefined ? 1 : o.op, `<g transform="translate(${n2(x)} ${n2(y)}) rotate(${n2(o.rot || 0)}) scale(${n2((o.flip ? -1 : 1) * (o.sx || 1))} ${n2(o.sy || 1)})">${f}${sh}<g ${f ? `filter="url(#${fid})"` : ""}>${svg}</g></g>`); }
// side view walking (facing left; flip for right), feet at (x, y), height h; ph = walk phase (radians)
function avSide(name, x, y, h, ph, o = {}) { const A = AV[name]; if (!A) return ""; const s = h / 190;
  const sw = Math.sin(ph) * (o.amp === undefined ? 26 : o.amp);
  let g = A.side.replace(/class="av-leg-near" style="transform-origin:-2px 0px"/g, `class="av-leg-near" style="transform-origin:-2px 0px;transform:rotate(${n2(sw)}deg)"`)
    .replace(/class="av-leg-far" style="transform-origin:-2px 0px"/g, `class="av-leg-far" style="transform-origin:-2px 0px;transform:rotate(${n2(-sw)}deg)"`)
    .replace(/class="av-arm-near" style="transform-origin:0px -40px"/g, `class="av-arm-near" style="transform-origin:0px -40px;transform:rotate(${n2(-sw * .8)}deg)"`)
    .replace(/class="av-arm-far" style="transform-origin:0px -40px"/g, `class="av-arm-far" style="transform-origin:0px -40px;transform:rotate(${n2(sw * .8)}deg)"`);
  const bob = Math.abs(Math.cos(ph)) * 4 * s;
  return `<g transform="translate(${n2(x)} ${n2(y)})"><ellipse cx="0" cy="2" rx="${n2(h * .16)}" ry="${n2(h * .03)}" fill="#0A0820" opacity=".4"/><g transform="translate(0 ${n2(-bob)}) scale(${n2((o.flip ? -1 : 1) * s)} ${n2(s)}) translate(0 -41)">${g}</g></g>`; }

/* ---------- a tablet showing the REAL app screen ("Now showing" / In the app) ---------- */
function tablet(x, y, w, shot, o = {}) { const h = w * 1080 / 1920, k = w / 1920, pad = 22;
  let s = `<g filter="url(#drop)"><rect x="${n2(-w / 2 - pad)}" y="${n2(-h / 2 - pad)}" width="${n2(w + pad * 2)}" height="${n2(h + pad * 2)}" rx="44" fill="#120F26"/></g><rect x="${n2(-w / 2 - pad + 4)}" y="${n2(-h / 2 - pad + 4)}" width="${n2(w + pad * 2 - 8)}" height="${n2(h + pad * 2 - 8)}" rx="40" fill="none" stroke="#3B3470" stroke-width="3"/>
    <g transform="translate(${n2(-w / 2)} ${n2(-h / 2)}) scale(${n2(k * 10000) / 10000})"><g clip-path="url(#scrClip)">`;
  const zz = o.zoom || 1, zx = o.zx === undefined ? 960 : o.zx, zy = o.zy === undefined ? 540 : o.zy;
  s += `<g transform="translate(960 540) scale(${n2(zz)}) translate(${-zx} ${-zy})"><use href="#shot_${shot}"/>${o.over2 ? `<g opacity="${n2(o.over2[1])}"><use href="#shot_${o.over2[0]}"/></g>` : ""}${o.inner || ""}</g></g></g>`;
  if (o.label) s += `<g transform="translate(0 ${n2(-h / 2 - pad - 4)})" filter="url(#dropS)"><rect x="${n2(-tw(o.label, 30, 700) / 2 - 64)}" y="-28" width="${n2(tw(o.label, 30, 700) + 128)}" height="56" rx="28" fill="${C.gold}"/><circle cx="${n2(-tw(o.label, 30, 700) / 2 - 34)}" cy="0" r="9" fill="#2B2147"/>${TX(14, 11, esc(o.label), 30, "#2B2147")}</g>`;
  return TF(x, y, o.s === undefined ? 1 : o.s, s, o.rot || 0); }
// a finger tap: a ring that grows and fades
function tapFX(t, t0, x, y, col = "#fff") { const u = (t - t0) / .55; if (u < -.25 || u > 1) return ""; const hand = u < 0 ? 1 + u * 2 : 1;
  return (u >= 0 ? `<circle cx="${x}" cy="${y}" r="${n2(14 + 70 * eo(u))}" fill="none" stroke="${col}" stroke-width="${n2(8 * (1 - u))}" opacity="${n2(1 - u)}"/><circle cx="${x}" cy="${y}" r="${n2(16 * (1 - u))}" fill="${col}" opacity="${n2(.7 * (1 - u))}"/>` : "") +
    OP(clamp(hand * 1.5) * (1 - clamp((u - .5) * 3)), `<g transform="translate(${x + 18} ${y + 30 + (u < 0 ? -u * 120 : 0)}) rotate(-20) scale(.8)"><path d="M-14 -40 Q-14 -54 0 -54 Q14 -54 14 -40 L14 0 L40 6 Q54 10 52 26 L44 70 L-20 70 L-40 20 Q-46 6 -32 2 L-14 10z" fill="#FFE1C8" stroke="#2B2147" stroke-width="5" stroke-linejoin="round"/></g>`); }

/* ---------- credits ---------- */
function coinIc(x, y, r = 30) { return `<g transform="translate(${n2(x)} ${n2(y)})"><circle r="${r}" fill="url(#goldG)" stroke="#B9772A" stroke-width="${n2(r * .12)}"/><path d="M0 ${n2(-r * .55)} L${n2(r * .16)} ${n2(-r * .16)} L${n2(r * .55)} ${n2(-r * .12)} L${n2(r * .24)} ${n2(r * .14)} L${n2(r * .34)} ${n2(r * .55)} L0 ${n2(r * .32)} L${n2(-r * .34)} ${n2(r * .55)} L${n2(-r * .24)} ${n2(r * .14)} L${n2(-r * .55)} ${n2(-r * .12)} L${n2(-r * .16)} ${n2(-r * .16)}z" fill="#FFF6D0"/></g>`; }
// the till: "★ 50 credits", as the app's pill
function till(x, y, n, s = 1, bump = 0) { const txt = `${n} credit${n === 1 ? "" : "s"}`, w = tw(txt, 40, 700) + 120;
  return TF(x, y, s * (1 + .14 * bump), `<g filter="url(#dropS)"><rect x="${n2(-w / 2)}" y="-38" width="${n2(w)}" height="76" rx="38" fill="#1B1640" stroke="${C.gold}" stroke-width="4"/></g>${coinIc(-w / 2 + 42, 0, 24)}${TX(24, 14, txt, 40, "#fff")}`); }
// coins flying from (x0, y0) to (x1, y1) between t0 and t0 + d
function coinFly(t, t0, x0, y0, x1, y1, n = 8, d = .9) { let s = "";
  for (let i = 0; i < n; i++) { const u = clamp((t - t0 - i * .06) / d); if (u <= 0 || u >= 1) continue; const e = eio(u), x = lerp(x0 + (hash(i, 5) - .5) * 160, x1, e), y = lerp(y0 + (hash(i, 6) - .5) * 80, y1, e) - 220 * Math.sin(Math.PI * e);
    s += coinIc(x, y, 22 * (1 - .4 * e)); }
  return s; }

/* ---------- the quiz cards (film 1's: neon cards with a picture and a name) ---------- */
function itemIcon(kind) {
  if (kind === "duck") return `<g transform="scale(1.1)"><ellipse cx="0" cy="22" rx="62" ry="36" fill="#FFD23F"/><circle cx="34" cy="-16" r="34" fill="#FFD23F"/><path d="M62 -14 L92 -8 L62 0z" fill="#FF8A3D"/><circle cx="42" cy="-24" r="6" fill="#2B2147"/><path d="M-40 10 Q-10 -4 10 16" fill="none" stroke="#E9A93A" stroke-width="7" stroke-linecap="round"/></g>`;
  if (kind === "nail") return `<g transform="rotate(-30)"><rect x="-90" y="-10" width="160" height="20" rx="4" fill="#9AA4B8"/><rect x="-90" y="-10" width="160" height="7" rx="3" fill="#D5DCEA"/><path d="M70 -10 L100 0 L70 10z" fill="#8A93A8"/><rect x="-104" y="-26" width="18" height="52" rx="5" fill="#7E879C"/></g>`;
  if (kind === "marble") return `<circle r="56" fill="#7FD3FF" opacity=".9"/><path d="M-30 -10 Q0 -40 30 -4 Q4 20 -30 -10z" fill="#2E8BD8" opacity=".8"/><path d="M-10 30 Q20 10 40 26" fill="none" stroke="#2EC4B6" stroke-width="8" stroke-linecap="round"/><ellipse cx="-20" cy="-26" rx="16" ry="9" fill="#fff" opacity=".8"/>`;
  if (kind === "magnet") return `<path d="M-60 -60 L-60 10 A60 60 0 0 0 60 10 L60 -60 L28 -60 L28 10 A28 28 0 0 1 -28 10 L-28 -60z" fill="#E2475B"/><rect x="-60" y="-78" width="32" height="26" fill="#D5DCEA"/><rect x="28" y="-78" width="32" height="26" fill="#D5DCEA"/>`;
  return ""; }
function card(x, y, kind, label, o = {}) { const w = 300, h = 300, lit = o.lit || 0, dim = o.dim || 0, k = o.k === undefined ? 1 : o.k;
  return TF(x, y, k * (1 + .06 * lit), `<g opacity="${n2(1 - .55 * dim)}"><rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="30" fill="#0C1638" stroke="${lit ? "#7BE08F" : C.cyan}" stroke-width="${lit ? 9 : 6}" filter="url(#neon)"/><rect x="${-w / 2 + 6}" y="${-h / 2 + 6}" width="${w - 12}" height="${h - 12}" rx="26" fill="url(#hudG)"/>
    <g transform="translate(0 -36)">${itemIcon(kind)}</g>${TX(0, h / 2 - 42, label, 38, "#fff")}</g>` + (o.tick ? TF(w / 2 - 20, -h / 2 + 20, spring(o.tick, 0, .4), `<circle r="40" fill="#2FA85A" stroke="#fff" stroke-width="6"/><path d="M-17 2 L-4 15 L19 -13" fill="none" stroke="#fff" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>`) : "")
    + (o.cross ? TF(w / 2 - 20, -h / 2 + 20, spring(o.cross, 0, .4), `<circle r="40" fill="#E2475B" stroke="#fff" stroke-width="6"/><path d="M-14 -14 L14 14 M14 -14 L-14 14" stroke="#fff" stroke-width="10" stroke-linecap="round"/>`) : "")); }
// the app's logo (the test tube "1"), in its glowing ring
function logo(x, y, r, t, o = {}) { const k = r / 256;
  return `<g transform="translate(${n2(x)} ${n2(y)})"><circle r="${n2(r * 1.16)}" fill="none" stroke="#9FD8FF" stroke-width="${n2(r * .025)}" opacity=".55"/><circle r="${n2(r * 1.06)}" fill="none" stroke="#DDF2FF" stroke-width="${n2(r * .04)}" filter="url(#glowS)"/>
    <g transform="scale(${n2(k)}) translate(-256 -256)"><use href="#logoImg"/></g></g>`; }
// the films' TAP TO BEGIN plate (a neon HUD box with arrows)
function tapToBegin(x, y, t, a = 1, press = 0) { const blink = .65 + .35 * Math.abs(Math.sin(t * 3)), k = 1 - .06 * press;
  return OP(a, TF(x, y, k, `<path d="M-250 -46 H240 L262 -24 V46 H-240 L-262 24z" fill="#0B2440" fill-opacity=".85" stroke="${C.cyan}" stroke-width="4" filter="url(#neon)"/>${TX(0, 16, "TAP  TO  BEGIN", 46, "#BFEFFF", { ls: 12, op: blink })}
    <path d="M-300 -10 L-284 0 L-300 10z" fill="${C.cyan}" opacity="${n2(blink)}"/><path d="M300 -10 L284 0 L300 10z" fill="${C.cyan}" opacity="${n2(blink)}"/>`)); }

/* ---------- captions: the speaker's name pill above one caption line; the word being said in yellow, words to come dim ---------- */
const PILLC = { heart: C.heart, pip: "#8B5CF6", momo: "#FB7158", basil: "#14B8A6", trio: C.gold };
function caption(t) { let L = null; for (const id of TL.order) { const x = TL.lines[id]; if (t >= x.t - .12 && t < x.end + .55) L = x; } if (!L) return "";
  const a = ramp(t, L.t - .12, .18) * (1 - ss(L.end + .35, L.end + .55, t)); if (a < .01) return "";
  const keys = (L.keys || []).map(norm), size = tw(L.text, 50, 700) > 1460 ? 44 : 50, sp = tw(" ", size, 700); let x = 0, parts = [], cur = -1;
  L.words.forEach((w, i) => { if (t >= w.a - .03) cur = i; });
  const ws = L.text.split(" "), wds = ws.map((w, i) => ({ w, x: 0, ww: tw(w, size, 700), i }));
  wds.forEach((d) => { d.x = x; x += d.ww + sp; }); const W = x - sp;
  for (const d of wds) { const said = d.i <= cur, now = d.i === cur && t < (L.words[d.i] ? L.words[d.i].b + .12 : 0), key = keys.includes(norm(d.w));
    const fill = (now || (said && key)) ? C.gold : said ? "#FFFFFF" : "#9C93C4"; parts.push(`<tspan x="${n2(d.x - W / 2)}" fill="${fill}">${esc(d.w)}</tspan>`); }
  const bw = W + 76, nm = L.name, nw = tw(nm, 30, 700) + 40, pc = PILLC[L.speaker] || C.heart, ink = L.speaker === "trio" ? "#2B2147" : "#fff";
  return OP(a, `<g transform="translate(960 986)"><rect x="${n2(-bw / 2)}" y="-44" width="${n2(bw)}" height="86" rx="43" fill="url(#capG)"/>
    <text y="17" font-family="Fredoka" font-weight="700" font-size="${size}" text-anchor="start">${parts.join("")}</text>
    <g transform="translate(0 -56)"><rect x="${n2(-nw / 2)}" y="-22" width="${n2(nw)}" height="44" rx="22" fill="${pc}"/>${TX(0, 10, esc(nm), 30, ink)}</g></g>`); }
