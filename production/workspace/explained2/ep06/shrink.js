// shrink.js: the first-person journeys (the series' signature). The camera IS the thing.
// Part 1: you are one scale on a monitor lizard's back. You look along its back: rows of scales like roof tiles, rising and falling as it
//         breathes, its head far ahead. Early morning in the shade (cool: the thermometer is low, the lizard is slow); it crawls into the sun
//         (a line of sunlight sweeps across the scales and lands on you: you warm up); noon (too hot); splash, into the lake (you cool down).
//         Your warmth follows the place you are in: the book's word for it (cold-blooded) comes after, on the Mark Sentence card.
// Part 2: you are one hair on a fruit bat's back (fur like a forest, upside down; the wings: thin skin, no feathers; out into the cool night,
//         but the body under you stays warm; back at the palm, a baby bat drinks its mother's milk).
const hexL = (a, b, u) => { const pa = [1, 3, 5].map((i) => parseInt(a.substr(i, 2), 16)), pb = [1, 3, 5].map((i) => parseInt(b.substr(i, 2), 16)); return "#" + pa.map((v, i) => Math.round(lerp(v, pb[i], clamp(u))).toString(16).padStart(2, "0")).join(""); };
const youTag = (t, t0, txt) => OP(ramp(t, t0, .4), tpill(60 + tw(txt, 34, 600) / 2 + 26, 76, txt, 34, P.ink, "#fff", { w: 600 }));
const feelTag = (t, t0, t1, txt, y = 790, x = 960, fill = "#fff", ink = P.ink) => t < t0 || t > t1 + .3 ? "" : TF(x, y, spring(t, t0, .45) * (1 - ramp(t, t1, .25)), tpill(0, 0, txt, 46, fill, ink, { w: 700 }));
const uwRays = (t, col = "#fff", o = .13) => [0, 1, 2, 3, 4].map((i) => { const x = 200 + i * 400 + 60 * Math.sin(t * .5 + i * 1.3); return `<path d="M${n2(x)} -20 L${n2(x + 150)} -20 L${n2(x - 120 + 80 * Math.sin(t * .3 + i))} 1100 L${n2(x - 380)} 1100z" fill="${col}" opacity="${n2(o * (.6 + .4 * Math.sin(t * .8 + i * 2)))}"/>`; }).join("");
// a several-stop colour ramp: stops [[u, "#hex"], ...]
const ramp3 = (u, stops) => { for (let i = 1; i < stops.length; i++) if (u <= stops[i][0]) return hexL(stops[i - 1][1], stops[i][1], (u - stops[i - 1][0]) / (stops[i][0] - stops[i - 1][0])); return stops[stops.length - 1][1]; };

if (PART === 1) { (() => {
const HZ = 470;
// the scale field: rows of bead scales running away towards the lizard's head, curving down at the sides (the top of its back).
// light: {base, lit, zl (the sunlight front: rows nearer than z = zl... are still in shade), warm 0..1, wet 0..1}, br = breathing (px)
function scaleField(t, L) { const rows = 18, zm = Math.pow(1.17, rows - 1); let pts = ""; for (let i = 0; i <= 40; i++) { const x = -200 + i * 58, dx = (x - 960) / 960; pts += `${i ? "L" : "M"}${n2(x)} ${n2(HZ + 600 / zm + L.br / zm + dx * dx * 520 / Math.sqrt(zm))}`; }
  let s = `<path d="${pts} L2120 1200 L-200 1200z" fill="${hexL(hexL(L.base, "#000000", .3), L.haze, .25)}"/>`;
  for (let j = rows - 1; j >= 0; j--) { const z = Math.pow(1.17, j), y0 = HZ + 600 / z + L.br * (1 / z), w = 236 / z, h = 150 / z, off = (j % 2) * .5, nc = Math.ceil(1920 / w / 2) + 3, haze = .55 * Math.pow(1 - 1 / z, 1.6);
    for (let c = -nc; c <= nc; c++) { const x = 960 + (c + off) * w, dx = (x - 960) / 960, y = y0 + dx * dx * 520 / Math.sqrt(z), sk = 1 - .25 * dx * dx; if (y > 1180 || x < -w || x > 1920 + w) continue;
      const lit = z > L.zl ? 1 : clamp(1 - (L.zl - z) * 1.6), cc = c + 40, spot = (j % 4 === 1 && cc % 5 < 2) || (j % 4 === 3 && (cc + 2) % 5 < 2), ridge = Math.abs(c + off) < .6;
      let col = hexL(spot ? L.spot : L.base, L.lit, lit * L.warm); col = hexL(col, hash(c * 13 + j * 5, 3) > .5 ? "#000000" : "#FFFFFF", .06); col = hexL(col, L.haze, haze);
      const dkc = hexL(hexL(col, "#000000", .26 + .12 * Math.abs(dx)), L.haze, haze * .8), hw = w * (ridge ? .56 : .5), hh = h * (ridge ? .62 : .54);
      s += `<g transform="translate(${n2(x)} ${n2(y)}) rotate(${n2(dx * 16)}) scale(${n2(sk)} 1)"><rect x="${n2(-hw)}" y="${n2(-hh + h * .12)}" width="${n2(2 * hw)}" height="${n2(2 * hh)}" rx="${n2(Math.min(hw, hh) * .9)}" fill="${dkc}"/><rect x="${n2(-hw * .92)}" y="${n2(-hh)}" width="${n2(2 * hw * .92)}" height="${n2(2 * hh * .9)}" rx="${n2(Math.min(hw, hh) * .85)}" fill="${col}"/>`
        + (w > 26 ? `<ellipse cx="${n2(-w * .1)}" cy="${n2(-hh * .55)}" rx="${n2(hw * .5)}" ry="${n2(hh * .22)}" fill="#fff" opacity="${n2((.1 + .18 * lit * L.warm + .4 * L.wet) * (1 - haze))}"/>` : "") + `</g>`; } }
  return s; }
// your own scale: the big tile under the camera, at the bottom of the frame (a faint sun-yellow rim says "this is you")
const myScale = (L, glow) => `<g transform="translate(960 1160)"><ellipse rx="620" ry="250" fill="${hexL(hexL(L.base, L.lit, L.warm), "#000000", .2)}"/><ellipse cy="-30" rx="580" ry="210" fill="${hexL(L.base, L.lit, L.warm)}"/><ellipse cx="-120" cy="-150" rx="260" ry="40" fill="#fff" opacity="${n2(.1 + .25 * L.wet)}"/>
  <ellipse cy="-30" rx="580" ry="210" fill="none" stroke="${P.sun}" stroke-width="10" opacity="${n2(.35 + .5 * glow)}"/>${glow > .02 ? `<ellipse cy="-30" rx="600" ry="230" fill="#FFB347" opacity="${n2(.35 * glow)}" filter="url(#b30)"/>` : ""}</g>`;
// the world beyond the lizard's back: the sky, the far bank and the lake, and giant grass blades (with dew) that slide past as it crawls. d = distance crawled
function worldBack(t, d, Lw) { let s = `<rect x="-200" y="-200" width="2320" height="${HZ + 260}" fill="${Lw.sky}"/>`;
  s += `<circle cx="${Lw.sunX}" cy="${Lw.sunY}" r="${Lw.sunR * 3}" fill="${Lw.sunC}" opacity="${n2(Lw.sunA * .5)}" filter="url(#b60)"/><circle cx="${Lw.sunX}" cy="${Lw.sunY}" r="${Lw.sunR}" fill="#FFFBEA" opacity="${n2(Lw.sunA)}"/>`;
  s += `<g filter="url(#b10)">${Array.from({ length: 16 }, (_, i) => `<circle cx="${n2(((i * 170 - d * 40) % 2400 + 2400) % 2400 - 240)}" cy="${n2(HZ - 60 - 40 * hash(i, 2))}" r="${n2(90 + 60 * hash(i, 4))}" fill="${Lw.trees}"/>`).join("")}</g><rect x="-200" y="${HZ - 40}" width="2320" height="300" fill="${Lw.ground}"/>`;
  // giant grass blades with dew drops, near the lizard's sides: they come from far (small, near the middle) and slide out to the edges
  for (let i = 0; i < 14; i++) { const sd = i % 2 ? 1 : -1, v = ((hash(i, 5) + d * .22) % 1), x = 960 + sd * (260 + 1100 * v * v), sc = .25 + 1.6 * v * v, y = HZ + 40 + 300 * v * v, sw = 10 * Math.sin(t * .8 + i), h = 520 * sc, col = i % 3 ? Lw.blade : Lw.blade2;
    s += `<path d="M${n2(x - 26 * sc)} ${n2(y + 40)} Q${n2(x + sw)} ${n2(y - h * .5)} ${n2(x + sd * 60 * sc + sw * 2)} ${n2(y - h)} Q${n2(x + 10 * sc)} ${n2(y - h * .5)} ${n2(x + 26 * sc)} ${n2(y + 40)}z" fill="${col}" opacity="${n2(Math.min(1, v * 3))}"/>`;
    if (Lw.dew > .02) s += `<circle cx="${n2(x + sd * 18 * sc + sw * .7)}" cy="${n2(y - h * .55)}" r="${n2(15 * sc)}" fill="#E8F6FF" opacity="${n2(.85 * Lw.dew * Math.min(1, v * 3))}" stroke="#fff" stroke-width="${n2(3 * sc)}"/><circle cx="${n2(x + sd * 18 * sc + sw * .7 - 5 * sc)}" cy="${n2(y - h * .55 - 5 * sc)}" r="${n2(4 * sc)}" fill="#fff" opacity="${n2(Lw.dew * Math.min(1, v * 3))}"/>`; }
  return s; }
// the back of the lizard's head and neck, far ahead along its back (it lifts a little as it crawls)
const lizHead = (L, lift = 0, tg = 0) => { const c = hexL(hexL(L.base, L.lit, L.warm * .9), L.haze, .2), dk = hexL(c, "#000000", .28), sp = hexL(hexL(L.spot, L.lit, L.warm * .9), L.haze, .2);
  return `<g transform="translate(960 ${n2(HZ + 30 - lift)})"><path d="M-190 40 Q-150 -20 -96 -34 Q-60 -100 -30 -150 Q0 -172 30 -150 Q60 -100 96 -34 Q150 -20 190 40z" fill="${dk}"/><path d="M-160 40 Q-126 -14 -84 -28 Q-52 -92 -24 -140 Q0 -158 24 -140 Q52 -92 84 -28 Q126 -14 160 40z" fill="${c}"/>
    ${[[-50, -40], [50, -40], [0, -70], [-26, -100], [26, -100], [0, -126]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="12" ry="7" fill="${sp}" opacity=".7"/>`).join("")}
    <ellipse cx="-74" cy="-58" rx="20" ry="16" fill="${dk}"/><ellipse cx="74" cy="-58" rx="20" ry="16" fill="${dk}"/><circle cx="-80" cy="-60" r="8" fill="#1E1C16"/><circle cx="80" cy="-60" r="8" fill="#1E1C16"/><circle cx="-82" cy="-63" r="2.5" fill="#fff"/><circle cx="78" cy="-63" r="2.5" fill="#fff"/>
    ${tg > .02 ? `<path d="M0 -160 l0 ${n2(-46 * tg)} m0 0 l-10 -14 m10 14 l10 -14" stroke="#C86A9A" stroke-width="5" fill="none" stroke-linecap="round"/>` : ""}</g>`; };
SC.shrink = (t, s) => { const td = MK("dive"), tShade = MK("shade"), tSun = MK("sun"), tNoon = MK("noon"), tLand = W("e1104", "lands") - .1, tSp = W("e1105", "splash") - .05, tHot = W("e1105", "hot") - .1, tCool = W("e1105", "cool") - .1;
  const crawl = ss(tSun - .2, tSun + 1.0, t) * (1 - ss(tSp - .3, tSp, t)), slowCrawl = ss(tShade, tShade + 1, t) * (1 - ss(tSun - .4, tSun, t)) * .25;
  // how far it has crawled (the world slides past); speeded up while it crawls into the sun and on to noon
  const d = .05 * (t - td) + 1.6 * clamp((t - tSun) / (tNoon - tSun)) + .6 * clamp((t - tNoon) / 2) , gait = Math.sin((t - td) * (crawl > .1 ? 5.2 : 1.4)), sway = (crawl * 3.2 + slowCrawl * 1.2) * gait;
  const wet = ss(tSp, tSp + .4, t), warm = t < tSun ? 0 : clamp(ss(tLand - .8, tLand + 1.6, t) * .75 + .25 * ss(tNoon - .4, tNoon + .8, t)) * (1 - .85 * ss(tSp + .2, tCool + 1.2, t));
  const zl = t < W("e1104", "sunlight") - 1.2 ? 99 : lerp(14, -1, eio((t - (W("e1104", "sunlight") - 1.2)) / (tLand - W("e1104", "sunlight") + 1.4)));
  const noon = ss(tNoon - .3, tNoon + .8, t) * (1 - wet), br = 14 * Math.sin((t - td) * 2.1);
  const L = { base: hexL("#5E6450", "#5A6E58", wet * .7), spot: hexL("#C9BE86", "#9EB08A", wet), haze: t < tSun ? "#9FB4CC" : hexL("#E8D8B0", "#F4EEDC", noon), lit: hexL("#E8A040", "#F4C870", noon), warm: wet ? warm : (t < tSun ? 0 : warm), zl: wet > .5 ? 99 : zl, br, wet };
  const Lw = { sky: ramp3(clamp((t - td) / (tNoon + 1 - td)), [[0, "#9FB4CC"], [.35, "#B4C6DA"], [.6, "#FFD9A0"], [1, "#FFF6DC"]]), sunX: lerp(300, 960, clamp((t - tSun + 1) / (tNoon - tSun + 2))), sunY: lerp(HZ - 60, 40, clamp((t - tSun + 1) / (tNoon - tSun + 2))), sunR: 70, sunC: "#FFE08A", sunA: t < tSun - 1 ? .15 : .9,
    trees: hexL("#4E7A6A", "#5E9A5A", ss(tSun, tNoon, t)), ground: hexL("#6E8A6E", "#9CCB6A", ss(tSun, tNoon, t)), blade: hexL("#3E7A5A", "#5AAE4A", ss(tSun, tNoon, t)), blade2: hexL("#2E6A4A", "#4A9E40", ss(tSun, tNoon, t)), dew: 1 - ss(tSun, tSun + 2, t) };
  let world = worldBack(t, d, Lw) + lizHead(L, 10 * crawl * Math.abs(gait), tongueAt(t, .5, 4.5));
  world += `<g transform="translate(0 ${n2(sway * 4)})">${scaleField(t, L)}</g>`;
  // tip forward into the lake: everything tilts and drops, then the water closes over
  const tip = ss(tSp - .35, tSp + .25, t), rot = 8 * tip * (1 - wet * .6), dy = 160 * tip * (1 - wet);
  let out = `<g transform="translate(960 600) rotate(${n2(sway + rot)}) translate(-960 ${n2(-600 + dy)}) ">${world}</g>`;
  // the line of sunlight sweeping across the rows (a soft golden band at the light front)
  if (zl < 20 && zl > -1 && !wet) { const yb = HZ + 600 / Math.max(.6, zl); out += `<rect x="-100" y="${n2(yb - 70)}" width="2120" height="140" fill="#FFD27A" opacity=".35" filter="url(#b30)" style="mix-blend-mode:screen"/>`; }
  out += myScale(L, ss(tLand - .1, tLand + .5, t) * (1 - wet) + .3 * noon);
  // light: cool shade early, golden sun, white noon; heat shimmer at noon
  out += `<rect width="1920" height="1080" fill="#6A8AB0" opacity="${n2(.22 * (1 - ss(tSun, tLand, t)) * (1 - wet))}" style="mix-blend-mode:multiply"/>`;
  out += `<rect width="1920" height="1080" fill="#FFE4A0" opacity="${n2(.16 * warm * (1 - wet) + .1 * noon)}" style="mix-blend-mode:screen"/>`;
  if (noon > .05) for (let i = 0; i < 6; i++) { const y = 520 + i * 70 - ((t * 60) % 70); out += `<path d="M0 ${n2(y)} Q240 ${n2(y - 10)} 480 ${n2(y)} T960 ${n2(y)} T1440 ${n2(y)} T1920 ${n2(y)}" fill="none" stroke="#fff" stroke-width="3" opacity="${n2(.12 * noon)}"/>`; }
  if (t < tLand + 1 && t > td) out += motes(t, 18, 9, t < tSun ? "#DCE8F4" : "#FFF0C0");
  // under water: green-brown lake water, rays from the surface, bubbles streaming up past you
  if (wet > .01) { let bub = ""; for (let i = 0; i < 34; i++) { const v = ((t - tSp) * (.35 + .4 * hash(i, 3)) + hash(i, 5)) % 1, x = 120 + hash(i, 7) * 1680 + 30 * Math.sin(t * 2 + i), y = 1120 - v * 1240, r = 6 + 22 * hash(i, 9); bub += `<circle cx="${n2(x)}" cy="${n2(y)}" r="${n2(r)}" fill="none" stroke="#E8FFF4" stroke-width="${n2(2 + r * .12)}" opacity="${n2(.75 * Math.sin(Math.PI * v))}"/><circle cx="${n2(x - r * .3)}" cy="${n2(y - r * .3)}" r="${n2(r * .25)}" fill="#fff" opacity="${n2(.6 * Math.sin(Math.PI * v))}"/>`; }
    out += OP(wet, `<rect width="1920" height="1080" fill="#4E7A62" opacity=".55" style="mix-blend-mode:multiply"/><rect width="1920" height="${n2(HZ - 40)}" fill="#9AD0B8" opacity=".55"/><path d="M0 ${HZ - 40} Q480 ${HZ - 60 + 10 * Math.sin(t * 2)} 960 ${HZ - 40} T1920 ${HZ - 40}" fill="none" stroke="#E8FFF4" stroke-width="6" opacity=".6"/>` + uwRays(t, "#E8FFE8", .14) + bub);
    if (t - tSp < 1.0) { const u = t - tSp; let dr = ""; for (let i = 0; i < 30; i++) { const an = hash(i, 3) * Math.PI * 2, r = (120 + 900 * hash(i, 5)) * eo(u / .7); dr += `<circle cx="${n2(960 + Math.cos(an) * r)}" cy="${n2(560 + Math.sin(an) * r * .7)}" r="${n2((10 + 26 * hash(i, 7)) * (1 - u))}" fill="#fff" opacity=".9"/>`; } out += `<rect width="1920" height="1080" fill="#fff" opacity="${n2(clamp(1 - u / .35))}"/>` + dr; } }
  // the thermometer (your body warmth): low in the shade, rising in the sun, high at noon, falling in the lake
  const lev = lerp(.2, .62, ss(tLand - .6, tNoon - .2, t)) + .23 * ss(tNoon - .2, tNoon + 1.2, t) - .55 * ss(tSp + .3, tCool + 1.4, t);
  out += TF(1790, 1050, .84, thermo(lev, 300, { glow: pulse(t, tLand, .1, 1.5) + pulse(t, tCool, .1, 1.5) }));
  out += feelTag(t, W("e1102", "dry") - .1, tShade + .3, "dry and scaly", 820) + feelTag(t, W("e1103", "slow") - .2, tSun + .2, "The lizard is slow", 820, 960, "#DCE8F4")
    + speeded(t, tSun + .2, tSp - .2, 1500, 1010) + (t >= tHot ? TF(1540, 240, spring(t, tHot, .45) * (1 - ramp(t, tSp + .1, .25)), `<g transform="rotate(${n2(t * 25)})">${sunHeat()}</g>` + tpill(0, 96, "too hot", 46, "#fff", P.ink, { w: 700 })) : "");
  return out + youTag(t, td + .8, "You: one scale") + wipe(t, s.t0, "#E8D9B0") + wipe(t, s.t1, "#BFE6FF"); };
})(); }

if (PART === 2) { (() => {
SC.shrink = (t, s) => `<rect width="1920" height="1080" fill="#3B2A8C"/>`;
})(); }
