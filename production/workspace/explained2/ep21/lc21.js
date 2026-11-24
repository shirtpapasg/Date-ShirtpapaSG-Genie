// lc21.js: EP21's own art, part B (Stage 2, drawn 2026-11-24): THE EARTH (a simple orthographic globe: blue seas, green and sand-brown land,
// white cloud, the place words North / South; NEVER red or blue on it, never a bar magnet inside it, never which magnetic pole is where), the
// two journeys (be the hanging magnet; be the compass needle), the four look-closers (lcplaces, lcearth, lcuse, lcnight) and the pictures
// (cards, fun facts, the recap, the Mark Sentences' small pictures, the chant board, the Showdown checklist). Loaded after sets21.js.

/* ================================================================ THE EARTH ================================================================ */
// rough coastlines [lon, lat] (our own simple drawing: shapes a child knows, not a survey map)
const LAND = {
  africa: [[-17, 21], [-10, 30], [-5, 36], [10, 37], [20, 32], [32, 31], [35, 28], [43, 12], [51, 12], [42, -1], [40, -10], [35, -24], [27, -34], [18, -34], [13, -20], [9, -1], [9, 4], [-8, 5], [-17, 14]],
  eurasia: [[-9, 43], [-9, 37], [-2, 37], [3, 43], [12, 44], [16, 40], [23, 37], [26, 40], [36, 36], [35, 33], [34, 28], [39, 21], [43, 13], [52, 17], [56, 22], [51, 26], [48, 30], [57, 26], [62, 25], [67, 25], [70, 21], [73, 16], [76, 9], [78, 8], [80, 13], [80, 16], [87, 21], [92, 21], [94, 17], [97, 16], [98, 9], [100, 4], [103.4, 1.4], [104.2, 1.6], [103, 5], [101, 7], [100, 12], [101, 13], [105, 9], [107, 11], [109, 12], [108, 16], [106, 20], [109, 21], [113, 22], [117, 24], [120, 28], [122, 31], [120, 35], [121, 39], [118, 39], [122, 41], [125, 40], [127, 38], [129, 35], [129, 39], [130, 43], [135, 44], [140, 48], [141, 53], [137, 55], [140, 58], [150, 59], [160, 60], [163, 62], [180, 66], [180, 72], [140, 74], [110, 77], [80, 73], [68, 70], [55, 69], [42, 67], [30, 70], [20, 70], [15, 68], [10, 63], [5, 61], [8, 58], [10, 55], [8, 54], [4, 52], [0, 50], [-5, 48], [-1, 46]],
  sumatra: [[95, 5], [98, 4], [104, -2], [106, -6], [102, -4], [97, 1]], borneo: [[109, 1], [111, 3], [116, 6], [119, 5], [118, 1], [116, -4], [110, -3]], java: [[105, -6], [114, -7], [114, -8.5], [106, -7.5]],
  guinea: [[131, -1], [141, -3], [150, -8], [143, -9], [138, -8], [132, -3]], japan: [[130, 31], [132, 34], [135, 35], [140, 36], [142, 40], [141, 43], [145, 44], [141, 45], [140, 41], [139, 38], [136, 36], [132, 35]],
  australia: [[114, -22], [122, -17], [129, -15], [136, -12], [137, -16], [141, -12], [145, -15], [146, -19], [153, -25], [153, -30], [150, -37], [146, -39], [140, -38], [135, -35], [129, -32], [124, -34], [115, -34], [114, -28]],
  madagascar: [[44, -25], [49, -15], [50, -16], [47, -25]], britain: [[-5, 50], [1, 51], [-2, 56], [-5, 58], [-6, 55]],
  namerica: [[-168, 66], [-155, 71], [-140, 70], [-125, 70], [-110, 68], [-95, 72], [-80, 68], [-62, 60], [-56, 52], [-66, 45], [-70, 42], [-76, 38], [-81, 31], [-80, 25], [-82, 29], [-90, 30], [-97, 26], [-98, 20], [-95, 18], [-90, 21], [-87, 21], [-88, 16], [-83, 10], [-79, 9], [-80, 7], [-86, 12], [-92, 15], [-105, 20], [-110, 23], [-112, 29], [-115, 32], [-117, 32], [-120, 34], [-124, 40], [-124, 46], [-127, 50], [-133, 56], [-140, 60], [-150, 61], [-160, 58], [-165, 60]],
  samerica: [[-80, 8], [-75, 11], [-62, 11], [-52, 5], [-35, -6], [-39, -14], [-48, -26], [-58, -34], [-65, -41], [-68, -52], [-75, -50], [-73, -38], [-71, -28], [-70, -18], [-76, -13], [-81, -5], [-79, 1]],
  nz: [[172, -35], [175, -37], [178, -38], [174, -41], [171, -44], [167, -46], [170, -42]],
  antarctica: [...Array(37)].map((_, i) => [-180 + i * 10, -70 + 2 * Math.sin(i)]).concat([[180, -90], [-180, -90]]) };
const SAND = { sahara: [[-12, 28], [10, 32], [30, 30], [33, 20], [15, 15], [-5, 16], [-14, 20]], arabia: [[39, 24], [45, 28], [55, 23], [52, 17], [44, 16]], ozdry: [[120, -22], [135, -20], [140, -26], [132, -31], [120, -28]],
  gobi: [[90, 42], [110, 44], [112, 38], [95, 37]], usdry: [[-116, 36], [-104, 37], [-102, 31], [-111, 29]] };
const CLOUDS = [[60, 30, 14], [100, -15, 12], [20, -10, 10], [140, 15, 13], [-30, 40, 12], [170, -30, 12], [-140, 20, 14], [-90, -25, 11], [80, 55, 11], [120, 45, 10]];
// orthographic projection: [x, y, visible] for (lon, lat) on a globe of radius R centred on (lon0, lat0)
const proj = (lon, lat, lon0, lat0, R) => { const d = Math.PI / 180, l = lat * d, l0 = lat0 * d, dl = (lon - lon0) * d, c = Math.sin(l0) * Math.sin(l) + Math.cos(l0) * Math.cos(l) * Math.cos(dl);
  return [R * Math.cos(l) * Math.sin(dl), -R * (Math.cos(l0) * Math.sin(l) - Math.sin(l0) * Math.cos(l) * Math.cos(dl)), c]; };
const projPoly = (pts, lon0, lat0, R) => { const out = []; for (let i = 0; i < pts.length; i++) { const a = pts[i], b = pts[(i + 1) % pts.length];
    for (let k = 0; k < 3; k++) { const u = k / 3; let lon = lerp(a[0], b[0], u), lat = lerp(a[1], b[1], u); let [x, y, c] = proj(lon, lat, lon0, lat0, R); if (c < 0) { const r = Math.hypot(x, y) || 1; x *= R / r; y *= R / r; } out.push([x, y, c]); } }
  return out.some((p) => p[2] > 0) ? "M" + out.map((p) => `${n2(p[0])} ${n2(p[1])}`).join(" L") + "z" : ""; };
// the Earth: origin = its centre. o: lon0, lat0, R, t (clouds drift), words (North / South place words), glow
function earth21(t, o = {}) { const R = o.R || 270, lon0 = o.lon0 === undefined ? 85 : o.lon0, lat0 = o.lat0 === undefined ? 8 : o.lat0, id = "eC" + (o.id || "");
  let s = (o.glow !== false ? `<circle r="${n2(R * 1.12)}" fill="#9FD6FF" opacity=".18" filter="url(#b10)"/>` : "") + `<clipPath id="${id}"><circle r="${R}"/></clipPath><circle r="${R}" fill="url(#earthSea)"/><g clip-path="url(#${id})">`;
  for (const p of Object.values(LAND)) s += `<path d="${projPoly(p, lon0, lat0, R)}" fill="#5FAE5A" stroke="#3E8A3E" stroke-width="${n2(Math.max(1, R / 140))}" stroke-linejoin="round"/>`;
  for (const p of Object.values(SAND)) s += `<path d="${projPoly(p, lon0, lat0, R)}" fill="#D9C08A" opacity=".85"/>`;
  for (const [lo, la, r] of CLOUDS) { const [x, y, c] = proj(lo + (t || 0) * 1.5, la, lon0, lat0, R); if (c > .1) s += `<ellipse cx="${n2(x)}" cy="${n2(y)}" rx="${n2(R * r / 100 * (.5 + .5 * c))}" ry="${n2(R * r / 300)}" fill="#fff" opacity=".7"/>`; }
  s += `</g><circle r="${R}" fill="url(#earthRim)"/><circle r="${R}" fill="none" stroke="#1E3E7A" stroke-width="${n2(Math.max(2, R / 70))}"/><path d="M${n2(-R * .62)} ${n2(-R * .5)} A${n2(R * .9)} ${n2(R * .9)} 0 0 1 ${n2(-R * .05)} ${n2(-R * .86)}" stroke="#fff" stroke-width="${n2(R / 22)}" fill="none" opacity=".35" stroke-linecap="round"/>`;
  if (o.words) s += T(0, n2(-R - R * .1), "North", n2(Math.max(24, R * .16)), "#fff", { w: 700 }) + T(0, n2(R + R * .2), "South", n2(Math.max(24, R * .16)), "#fff", { w: 700 });
  return s; }
// a little magnet ON the Earth at (lon, lat): it lies along the North-South line there (its red end towards North), on a short stand; it
// turns before it settles (spin degrees); origin = the Earth's centre. Returns "" when the place is round the back
function earthMag(lon, lat, g, spin = 0, k = 1) { const [x, y, c] = proj(lon, lat, g.lon0, g.lat0, g.R); if (c < .15) return ""; const [xn, yn] = proj(lon, lat + 2, g.lon0, g.lat0, g.R), a = Math.atan2(yn - y, xn - x) * 180 / Math.PI + 90;
  const ox = x / g.R, oy = y / g.R, L = 30 * k; return `<path d="M${n2(x)} ${n2(y)} l${n2(ox * L)} ${n2(oy * L)}" stroke="#fff" stroke-width="${n2(3 * k)}"/><circle cx="${n2(x)}" cy="${n2(y)}" r="${n2(4 * k)}" fill="#fff"/>`
    + `<g transform="translate(${n2(x + ox * L)} ${n2(y + oy * L)}) rotate(${n2(a + spin)}) scale(${n2(k * (.55 + .45 * c))})"><rect x="-9" y="-30" width="18" height="30" rx="3" fill="${NORTHC}" stroke="#fff" stroke-width="3"/><rect x="-9" y="0" width="18" height="30" rx="3" fill="${SOUTHC}" stroke="#fff" stroke-width="3"/></g>`; }
const earthPt = (lon, lat, g) => proj(lon, lat, g.lon0, g.lat0, g.R);

/* ================================================================ Part 1: BE THE HANGING MAGNET ================================================================ */
// The camera IS the magnet (SCENES_TODO 6): your own bar across the bottom of the frame (your red end with its white N at the left, your
// blue end with its white S at the right), the string rising from your middle to the broom handle, a tall wooden beam high above. The
// field whirls round you (a panorama by compass bearing: the rain tree at 0, straight past your red end when you rest); the giant finger
// (an adult's: four fingers and a thumb) pushes and then fades out COMPLETELY; you slow, swing past the faint dashed gold line on the grass
// far below and back, each swing smaller (soft gold ripples nudge you back), and stop with the rain tree past your red end. Twice.
const JH = 600, JX0 = 330, JDEG = 11;   // the horizon, where bearing 0 sits on screen when you rest, pixels per degree
function yawMag(t) { const m = MK, Y0 = -130, T1 = 1080, T2 = 1080 + 720;
  const seg = (t, a, b, sw, y0, y1) => { const u = clamp((t - a) / (b - a)); let y = y0 + (y1 - y0) * (1 - Math.pow(1 - u, 4)); if (t > sw) y += 36 * Math.exp(-(t - sw) / 1.3) * Math.sin(2 * Math.PI * (t - sw) / 1.9) * (1 - ss(b - .5, b, t)); return y; };
  if (t < m("jspin")) return Y0 + 5 * Math.sin(t * 1.3);
  if (t < m("jagain")) return seg(t, m("jspin"), m("jstop"), m("jswing"), Y0 + 5 * Math.sin(m("jspin") * 1.3), T1);
  const sw2 = m("jagain") + (m("jswing") - m("jspin")) * (m("jstop2") - m("jagain")) / (m("jstop") - m("jspin")); return seg(t, m("jagain"), m("jstop2"), sw2, T1, T2); }
const wrapD = (d) => ((d % 360) + 540) % 360 - 180;
// the panorama: [bearing, draw(x) at the horizon]
const PANO = [
  [-100, (x) => TF(x, JH, 1.2, TF(-300, -452, 1, spinChart21(9, 0, 0, 1, {})) )], [-55, (x) => TF(x, JH + 6, 1.1, `<g transform="translate(-720 -842)">${bench21(420)}</g>`)],
  [0, (x, t) => TF(x, JH + 10, 1.6, `<g transform="translate(-300 -452)">${rainTree(t)}</g>`)], [14, (x) => TF(x, JH, 1.1, `<g transform="translate(-700 -478)">${goal21()}</g>`)],
  [50, (x) => TF(x, JH, 1, `<rect x="-260" y="-300" width="520" height="300" fill="#F2E4C8" stroke="#C8B48E" stroke-width="4"/>` + [0, 1, 2, 3].map((f) => `<rect x="-260" y="${-280 + f * 72 + 46}" width="520" height="8" fill="#3E7FA8"/>` + [0, 1, 2, 3, 4, 5].map((i) => `<rect x="${-240 + i * 84}" y="${-276 + f * 72}" width="50" height="26" fill="#9FC4DA"/>`).join("")).join(""))],
  [85, (x) => TF(x, JH, 1, `<path d="M0 0 V-560" stroke="#9AA4AE" stroke-width="22"/><rect x="-80" y="-600" width="160" height="60" rx="8" fill="#5A6270"/>`)],
  [120, (x) => TF(x, JH, 1, `<rect x="-300" y="-300" width="600" height="300" fill="#F2E4C8" stroke="#C8B48E" stroke-width="4"/>` + [0, 1, 2, 3].map((f) => `<rect x="-300" y="${-280 + f * 72 + 46}" width="600" height="8" fill="#3E7FA8"/>`).join(""))],
  [160, (x) => TF(x, JH, 1, `<rect x="-200" y="-220" width="400" height="220" fill="#EFE2C6" stroke="#B8A882" stroke-width="5"/><rect x="-140" y="-150" width="160" height="150" fill="#5E8E62"/><path d="M-230 -230 H230 L210 -206 H-210z" fill="#3E6A50"/>`)],
  [195, (x) => TF(x, JH + 30, 1.3, `<g transform="translate(-1880 -660)">${hoop21(1880, 660, 336, 1)}</g>`)], [235, (x) => TF(x, JH, 1, `<g transform="translate(-700 -478)">${goal21()}</g>`)],
  [290, (x) => TF(x, JH, 1, `<path d="M0 0 V-560" stroke="#9AA4AE" stroke-width="22"/><rect x="-80" y="-600" width="160" height="60" rx="8" fill="#5A6270"/>`)]];
function magnetJourney(t, s) { const m = MK, yaw = yawMag(t), vel = Math.abs(yawMag(t + .03) - yawMag(t - .03)) / .06, blur = clamp((vel - 40) / 260);
  // the sky and the field far below; the near grass streaks scroll with your turn
  let pano = `<rect width="1920" height="${JH}" fill="url(#fdSky)"/><circle cx="${n2(JX0 + wrapD(-60 - yaw) * JDEG)}" cy="140" r="520" fill="url(#sunGlow)"/><rect y="${JH}" width="1920" height="${1080 - JH}" fill="url(#fdGrass)"/>`;
  for (let i = 0; i < 36; i++) { const b = i * 10, x = JX0 + wrapD(b - yaw) * JDEG; pano += `<path d="M${n2(x)} ${JH + 4} L${n2(960 + (x - 960) * 3.2)} 1080" stroke="#fff" stroke-width="${i % 2 ? 3 : 6}" opacity=".08"/>`; }
  pano += `<rect y="${JH - 2}" width="1920" height="20" fill="#B24A34" opacity=".8"/>`;
  const items = PANO.map(([b, f]) => [wrapD(b - yaw), f]).filter(([d]) => Math.abs(d) < 120).sort((a, b) => Math.abs(b[0]) - Math.abs(a[0]));
  for (const [d, f] of items) pano += f(JX0 + d * JDEG, t);
  // the faint dashed gold line on the grass far below (the line you swing past): from under you towards bearing 0 (and 180)
  const lineK = ss(m("jslow") - .5, m("jswing"), t) * (1 - ss(m("jagain") - .2, m("jagain") + .3, t)) + ss(m("jagain") + 2.5, m("jagain") + 3.5, t);
  if (lineK > .02) { const x0 = JX0 + wrapD(-yaw) * JDEG; if (Math.abs(wrapD(-yaw)) < 100) pano += OP(.75 * lineK, `<path d="M${n2(x0)} ${JH + 6} L${n2(960 + (x0 - 960) * .2)} 1080" stroke="${NSC}" stroke-width="14" stroke-dasharray="40 26"/>`); }
  let out = blur > .05 ? `<g filter="url(#${blur > .5 ? "b10" : "b4"})">${pano}</g>` : pano;
  if (blur > .1) for (let i = 0; i < 9; i++) { const y = 120 + i * 100 + 30 * hash(i, 3), x = ((t * 2600 + hash(i, 5) * 1920) % 2400) - 240; out += `<path d="M${n2(x)} ${n2(y)} h${n2(-260 * blur)}" stroke="#fff" stroke-width="5" opacity="${n2(.35 * blur)}" stroke-linecap="round"/>`; }
  // gold ripples: something you cannot see turns you back (from jback, and on the second spin's swings)
  const rip = (t0, t1) => { let r = ""; if (t < t0 || t > t1 + 1) return ""; for (let j = 0; j < 4; j++) { const u = (((t - t0) / 1.2) + j / 4) % 1, a = (1 - u) * (1 - ss(t1, t1 + 1, t)); r += `<ellipse cx="960" cy="${n2(JH + 120 + 220 * u)}" rx="${n2(300 + 900 * u)}" ry="${n2(60 + 160 * u)}" fill="none" stroke="${NSC}" stroke-width="${n2(10 * (1 - u) + 2)}" opacity="${n2(.55 * a)}"/>`; } return r; };
  out += rip(m("jback"), m("jstop")) + rip(m("jagain") + 2.6, m("jstop2"));
  // the broom handle high above (a great wooden beam), the string from it down to your middle (it sways a hair)
  const sw = 6 * Math.sin(t * 1.1);
  out += `<path d="M-40 26 Q960 ${n2(60 + sw)} 1960 26" stroke="#7A4A22" stroke-width="120" fill="none"/><path d="M-40 12 Q960 ${n2(46 + sw)} 1960 12" stroke="#B67A42" stroke-width="80" fill="none"/><path d="M-40 -6 Q960 ${n2(28 + sw)} 1960 -6" stroke="#E2B07A" stroke-width="10" fill="none" opacity=".6"/>`
    + `<path d="M960 70 L${n2(960 + sw)} 930" stroke="#F4F2EC" stroke-width="12"/><path d="M960 70 L${n2(960 + sw)} 930" stroke="#9A9080" stroke-width="5"/>`;
  // YOU: the bar magnet across the bottom (red left, blue right), the knot at your middle
  out += `<path d="M40 1080 L150 930 H960 V1080z" fill="${NORTHC}" stroke="#9A2A1E" stroke-width="8"/><path d="M1880 1080 L1770 930 H960 V1080z" fill="${SOUTHC}" stroke="#1E3E8A" stroke-width="8"/><path d="M170 948 H940 M980 948 H1750" stroke="#fff" stroke-width="10" opacity=".3"/>`
    + T(420, 1050, "N", 120, "#fff") + T(1500, 1050, "S", 120, "#fff") + `<ellipse cx="${n2(960 + sw)}" cy="930" rx="40" ry="16" fill="#F4F2EC" stroke="#9A9080" stroke-width="4"/>`;
  // the giant finger: it pushes your blue end (jspin; again on "giant finger" and at jagain), then fades out COMPLETELY
  const fing = (a, b) => { if (t < a - .6 || t > b + .6) return ""; const k = ramp(t, a - .6, .4) * (1 - ss(b, b + .55, t)), push = hop(t, a, .5) * 80; return OP(k, TF(1640 - push, 820, 1.25, giantFinger(1, -8))); };
  out += fing(m("jspin"), m("jspin") + .6) + fing(m("jfinger"), m("jfinger") + .7) + fing(m("jagain"), m("jagain") + .7);
  return out; }

/* ================================================================ Part 2: BE THE COMPASS NEEDLE ================================================================ */
// The camera IS the needle at its pin (SCENES_TODO 5): your long red end stretching ahead of you over the dial (your white end behind you,
// at the bottom edge), the silver pin under you; the round clear room (the case: its wall and lid catch the sky); the dial far below with
// the big letters N, E, S, W round its edge; outside, through the clear wall, the trail map's wooden ledge and the sea. The giant hand (an
// adult's: four fingers and a thumb) carries the bar magnet LOW along the wood from the right: its RED end pushes your red end away
// (magenta), turned round its BLUE end pulls your red end in (green); taken away it FADES OUT COMPLETELY and you swing back to North.
const NP = [960, 1046], NRX = 900, NRY = 400, NL = 640;
function needleAng(t) { const m = MK; if (t < m("jfree")) return 50 + 3 * Math.sin(t * 2);
  if (t < m("jpush")) { const a = settle21(t, m("jfree"), 50 + 3 * Math.sin(m("jfree") * 2), 1.2, 3.1); return a * (1 - ss(m("jnorth"), m("jnorth") + .6, t)) + .8 * Math.sin(t * 9) * ss(m("jcome"), m("jpush"), t); }
  if (t < m("jpull")) return settle21(t, m("jpush"), 0, .45, 5.2, -68);
  if (t < m("jback") + .3) return settle21(t, m("jpull"), -68, .45, 5.2, 70);
  return settle21(t, m("jback") + .3, 70, .9, 3.6, 0) * (1 - ss(m("jns") + .2, m("jns") + .9, t)); }
const dialPt = (deg, r = .85) => [NP[0] + NRX * r * Math.sin(deg * Math.PI / 180), NP[1] - NRY * r * Math.cos(deg * Math.PI / 180)];
function needleJourney(t, s) { const m = MK, a = needleAng(t), ar = a * Math.PI / 180;
  // outside the case: the sky, the sea, the trail map's wooden ledge (seen through the clear wall: a little soft)
  let out = `<g filter="url(#b2)"><rect width="1920" height="620" fill="url(#ubSky)"/><rect y="300" width="1920" height="200" fill="url(#ubSea)"/><rect y="470" width="1920" height="260" fill="#B88A56"/>` + [0, 1, 2, 3].map((i) => `<path d="M0 ${500 + i * 50} H1920" stroke="#8A6236" stroke-width="4"/>`).join("") + TF(1560, 250, .9, `<rect x="-300" y="-240" width="600" height="300" fill="#8A5E34"/><rect x="-280" y="-224" width="560" height="270" fill="#F6EBD2"/>`) + `</g>`;
  // the bar magnet, carried LOW along the wood from the right by the giant hand; its red end first; turned round; taken away (fades out)
  const tc = m("jcome"), tp = m("jpush"), tu = m("jturn"), tb = m("jback");
  if (t > tc - .2 && t < tb + 1.4) { const x = t < tp ? lerp(2400, 1560, eio((t - tc) / (tp - tc - .2))) : t < tb ? 1560 : lerp(1560, 2100, eio((t - tb) / 1.2)), fade = 1 - ss(tb + .3, tb + 1.2, t), f = clamp((t - tu) / .9), sx = Math.cos(Math.PI * eio(f)), flip = sx < 0;
    out += OP(fade, `<g transform="translate(${n2(x)} 590)"><ellipse cx="0" cy="110" rx="340" ry="26" fill="${P.ink}" opacity=".2" filter="url(#b4)"/><g transform="scale(${n2(Math.max(.05, Math.abs(sx)) * 2.1)} 2.1)">${bar20(t, { glint: false, flip })}</g>`
      + `<g transform="translate(${n2(60 * sx)} -150) rotate(${n2(80 + 10 * Math.sin(Math.PI * f))})">${TF(0, 0, 1.15, hand15({ curl: .7, sleeve: "#6E8AC8", sleeveD: "#4A64A0" }))}</g></g>`)
      + (t > tc && t < tp + .4 ? OP(ramp(t, tc, .5) * (1 - ramp(t, tp + .2, .3)), `<ellipse cx="${n2(x - 280)}" cy="600" rx="140" ry="140" fill="${NORTHC}" opacity=".12" filter="url(#b10)"/>`) : ""); }
  // the case: its clear wall (the far side) rising from the dial to the lid; the lid's rim high above with glints
  out += `<path d="M${NP[0] - NRX - 40} ${NP[1]} A${NRX + 40} ${NRY + 30} 0 0 1 ${NP[0] + NRX + 40} ${NP[1]} L${NP[0] + NRX + 120} 120 A${NRX + 120} 300 0 0 0 ${NP[0] - NRX - 120} 120z" fill="#DDF4FF" opacity=".16"/>`
    + `<ellipse cx="960" cy="70" rx="1100" ry="230" fill="none" stroke="#fff" stroke-width="10" opacity=".45"/><path d="M300 150 Q600 60 900 50" stroke="#fff" stroke-width="16" opacity=".35" fill="none" stroke-linecap="round"/>`
    + [380, 760, 1160, 1540].map((x, i) => `<path d="M${x} ${n2(170 + 30 * Math.abs(i - 1.5))} L${n2(x + (x - 960) * .18)} ${n2(640 + 30 * Math.abs(i - 1.5))}" stroke="#fff" stroke-width="6" opacity=".18"/>`).join("");
  // the dial far below: a big white disc with ticks and the letters N, E, S, W round its edge (it does not turn)
  out += `<ellipse cx="${NP[0]}" cy="${NP[1]}" rx="${NRX + 40}" ry="${NRY + 30}" fill="#3E4652"/><ellipse cx="${NP[0]}" cy="${NP[1]}" rx="${NRX}" ry="${NRY}" fill="#FBFBF7"/>`;
  for (let i = 0; i < 72; i++) { const d = i * 5, [x1, y1] = dialPt(d, .97), [x2, y2] = dialPt(d, i % 18 ? .93 : .88); out += `<path d="M${n2(x1)} ${n2(y1)} L${n2(x2)} ${n2(y2)}" stroke="${P.ink}" stroke-width="${i % 18 ? 2 : 5}"/>`; }
  for (const [l, d] of [["N", 0], ["E", 90], ["S", 180], ["W", 270]]) { const [x, y] = dialPt(d, .74), sz = 70 + 60 * (y - (NP[1] - NRY)) / (2 * NRY); out += TF(x, y, 1, `<g transform="scale(1 .62)">${T(0, n2(sz * .36), l, n2(sz * 1.4), l === "N" ? NEEDLEC : P.ink)}</g>`); }
  // the push (magenta) and the pull (green): fat arrows by your red end, away from / towards the magnet on the right
  const tip = [NP[0] + NL * Math.sin(ar), NP[1] - NL * .44 * Math.cos(ar)];
  if (t > tp && t < tu + .3) { const k = ramp(t, tp, .3) * (1 - ramp(t, tu, .3)); out += OP(k, fatArrow(tip[0] + 140, tip[1] - 40, tip[0] - 40, tip[1] - 90, PUSHC, 30) + chevrons(t, 1300, 620, 1000, 620, k, PUSHC, 3, 1.6)); }
  if (t > m("jpull") && t < tb + .2) { const k = ramp(t, m("jpull"), .3) * (1 - ramp(t, tb, .3)); out += OP(k, fatArrow(tip[0] - 160, tip[1] - 60, tip[0] + 30, tip[1] - 110, PULLC, 30) + chevrons(t, 1000, 620, 1300, 620, k, PULLC, 3, 1.6)); }
  // YOU: the needle from the pin: your red end stretching ahead over the dial, your white end behind you; the silver pin
  const px = Math.cos(ar) * 52, py = Math.sin(ar) * 52 * .44, back = [NP[0] - NL * Math.sin(ar), NP[1] + NL * .44 * Math.cos(ar)];
  out += `<path d="M${n2(NP[0] + px)} ${n2(NP[1] + py)} L${n2(back[0])} ${n2(back[1])} L${n2(NP[0] - px)} ${n2(NP[1] - py)}z" fill="${NEEDLEW}" stroke="${P.ink}" stroke-width="6"/>`
    + `<path d="M${n2(NP[0] + px)} ${n2(NP[1] + py)} L${n2(tip[0])} ${n2(tip[1])} L${n2(NP[0] - px)} ${n2(NP[1] - py)}z" fill="${NEEDLEC}" stroke="${P.ink}" stroke-width="6" stroke-linejoin="round"/>`
    + `<path d="M${n2(NP[0] + px * .4)} ${n2(NP[1] + py * .4 - 8)} L${n2(tip[0])} ${n2(tip[1])}" stroke="#fff" stroke-width="7" opacity=".35"/>`
    + `<ellipse cx="${NP[0]}" cy="${NP[1]}" rx="40" ry="22" fill="#C8D0D8" stroke="${P.ink}" stroke-width="5"/><ellipse cx="${NP[0] - 10}" cy="${NP[1] - 6}" rx="12" ry="6" fill="#fff"/>`;
  // a thin hum line round the pin as you turn; tiny bubbles of light drifting
  for (let i = 0; i < 10; i++) { const u = (t * .06 + hash(i, 3)) % 1; out += `<circle cx="${n2(200 + hash(i, 5) * 1520)}" cy="${n2(900 - u * 700)}" r="${n2(4 + 6 * hash(i, 7))}" fill="#fff" opacity="${n2(.4 * Math.sin(Math.PI * u))}"/>`; }
  return out; }

/* ================================================================ LOOK CLOSER helpers ================================================================ */
// a buddy's FACE peeking in from a lower corner of the panel (EP20's peekFace): side "l" / "r"; poses [[t, pose]]; o.achieved for a cheer
const peekFace = (who, side, t, tin, tout, poses, o = {}) => { if (t < tin - .05 || (tout !== undefined && t > tout + .3)) return ""; const W_ = LCW, x = side === "l" ? W_.x - W_.w / 2 + 200 : W_.x + W_.w / 2 - 200;
  return buddy(who, x, W_.y + W_.h / 2 + 470 * .42 + (1 - eo((t - tin) / .45)) * 350, 470, t, { in: tin, out: tout, poses: [[tin, "sit"], ...(poses || [])], peek: true, tag: false, shadow: false, flip: side === "r", nohop: true, achieved: o.achieved }); };
// art -> screen inside the look-closer window (closer.js: translate(960, 572) scale(1.06 * push))
const lcK = (t, s) => 1.06 * (1 + .055 * clamp((t - s.t0 - 1) / Math.max(1, s.t1 - s.t0 - 1)));
const lcXY = (t, s, x, y) => { const k = lcK(t, s); return [960 + x * k, 572 + y * k]; };
// a magnifier circle linked by a plain line to the exact spot (EP13's approved look-closer): inner(t) is drawn centred, clipped to the circle
const magni21 = (t, t0, x, y, r, px, py, inner, lab, t1) => { if (t < t0) return ""; const a = t1 === undefined ? 1 : 1 - ramp(t, t1, .3); if (a <= .01) return ""; const k = spring(t, t0, .45), id = "mg" + Math.round(x) + "_" + Math.round(y);
  return OP(a, pline(px, py, x, y, ramp(t, t0, .2)) + TF(x, y, k, `<g filter="url(#drop)"><circle r="${r + 12}" fill="#fff"/></g><clipPath id="${id}"><circle r="${r}"/></clipPath><g clip-path="url(#${id})">${inner(t)}</g><circle r="${r}" fill="none" stroke="${P.ink}" stroke-width="8"/>`)
    + (lab ? TF(x, y + r + 40, k, tpill(0, 0, lab, 34, "#fff", P.ink, { w: 700 })) : "")); };

/* ================================================================ Part 1 · [LOOK CLOSER] which way? the same line in three places ================================================================ */
// three panels side by side, each with the magnet BIG, turning then stopping, its red end to the LEFT (the rain tree's way) every time:
// the field (far from the goalpost: the small goal far off to the RIGHT, not on the line), the classroom (hung from a wooden ruler across two
// stacks of books on a plastic-topped table, away from steel; the window shows the rain tree), the basin (floating on a round plastic lid).
// Each stops along a dashed gold line; sameline: the three glow together; nsline: one big dashed gold line across all three, N at the
// rain-tree end, S at the other (the same line every time); the end tags; THE SPIN CHART's rows are rewritten (seen when the panel closes).
const PX = [-545, 0, 545], PW = 500, PY0 = -340, PY1 = 70;
const pSpin = (t, t0, turns, d) => { const u = t - t0; if (u < 0) return 150; return 150 + (360 * turns - 150) * (1 - Math.pow(Math.max(0, 1 - u / d), 3)) + (u > d * .6 ? 30 * Math.exp(-(u - d * .6) / .7) * Math.sin((u - d * .6) * 5.5) : 0); };
const pStop = (t0, d) => t0 + d + 1.2;
function lcPlacesArt(t) { const m = MKS, tF = m("field"), tR = m("room"), tB = m("basin"), tS = m("sameline"), tN = m("nsline"), D = [1.6, 3.0, 3.6], T0 = [tF, tR, tB];
  let s = `<rect x="-830" y="-395" width="1660" height="790" fill="#FFF8EA"/>`;
  const glow = t >= tS ? 1 + .6 * pulse(t, tS, .05, 1.2) : 1;
  const panel = (i, inner, lab) => { const x0 = PX[i] - PW / 2, k = spring(t, T0[i] - .2, .5); if (t < T0[i] - .25) return `<rect x="${x0}" y="${PY0}" width="${PW}" height="${PY1 - PY0}" rx="26" fill="#EFE6D4" stroke="#D8C8A8" stroke-width="4" stroke-dasharray="14 10"/>`;
    return TF(PX[i], (PY0 + PY1) / 2 + 30, 1.1 * (.9 + .1 * k), `<g transform="translate(${-PX[i]} ${-(PY0 + PY1) / 2})"><clipPath id="lp${i}"><rect x="${x0}" y="${PY0}" width="${PW}" height="${PY1 - PY0}" rx="26"/></clipPath><g clip-path="url(#lp${i})">${inner}</g><rect x="${x0}" y="${PY0}" width="${PW}" height="${PY1 - PY0}" rx="26" fill="none" stroke="${P.ink}" stroke-width="6"/>`
      + TF(PX[i], PY0 + 40, 1, tpill(0, 0, lab, 30, P.ink, "#fff", { w: 700 })) + `</g>`); };
  const stopLine = (i, y, w = 170) => { const ts = pStop(T0[i], D[i]); if (t < ts) return ""; const u = eo((t - ts) / .5); return `<path d="M${PX[i] - w * u} ${y} H${PX[i] + w * u}" stroke="${NSC}" stroke-width="${n2(10 * glow)}" stroke-dasharray="24 14" stroke-linecap="round"/>`; };
  // 1 THE FIELD: the sky, the far rain tree at the left, the small goal far off to the right, the broom handle, the magnet big
  { const x = PX[0], a = pSpin(t, tF, 1, D[0]); let p = `<rect x="${x - 260}" y="${PY0}" width="520" height="250" fill="url(#fdSky)"/><rect x="${x - 260}" y="${PY0 + 230}" width="520" height="200" fill="url(#fdGrass)"/>`
      + TF(x - 200, PY0 + 236, .42, `<g transform="translate(-300 -452)">${rainTree(t)}</g>`) + TF(x + 170, PY0 + 236, .32, `<g transform="translate(-700 -478)">${goal21()}</g>`) + T(x + 170, PY0 + 200, "far!", 26, "#fff", { w: 700 })
      + broom21(x - 250, x + 250, PY0 + 96) + TF(x, PY0 + 96, 1, hangMag21(t, a, 150, .82)) + stopLine(0, PY0 + 310);
    s += panel(0, p, "the field"); }
  // 2 THE CLASSROOM: a cream wall, the window (the rain tree outside, at the left), the whiteboard, the ceiling fan; the plastic-topped table
  // with two stacks of books and the wooden ruler across them; the magnet hangs from the ruler's middle
  { const x = PX[1], a = pSpin(t, tR, 2, D[1]), fa = t * 260; let p = `<rect x="${x - 260}" y="${PY0}" width="520" height="430" fill="#F3EBDA"/><rect x="${x - 260}" y="${PY0 + 300}" width="520" height="130" fill="#C9D3DA"/>`
      + `<rect x="${x - 236}" y="${PY0 + 70}" width="140" height="150" fill="url(#fdSky)" stroke="#9AA4AE" stroke-width="6"/>` + TF(x - 170, PY0 + 214, .3, `<g transform="translate(-300 -452)">${rainTree(t)}</g>`) + `<rect x="${x - 236}" y="${PY0 + 190}" width="140" height="30" fill="#8CC867"/><path d="M${x - 166} ${PY0 + 70} V${PY0 + 220}" stroke="#E8ECEF" stroke-width="5"/>`
      + `<rect x="${x + 40}" y="${PY0 + 84}" width="200" height="120" fill="#FDFEFE" stroke="#B8C0C8" stroke-width="8"/><path d="M${x + 150} ${PY0} V${PY0 + 40}" stroke="#8A949E" stroke-width="5"/>` + [0, 120, 240].map((d) => `<ellipse cx="${n2(x + 150 + 60 * Math.cos((fa + d) * Math.PI / 180))}" cy="${PY0 + 44}" rx="${n2(Math.abs(Math.cos((fa + d) * Math.PI / 180)) * 56 + 8)}" ry="6" fill="#F4F6F2" stroke="#A8B0BA" stroke-width="2"/>`).join("")
      + `<path d="M${x - 210} ${PY0 + 330} H${x + 210} L${x + 196} ${PY0 + 350} H${x - 196}z" fill="#F2F5F3" stroke="#8A949E" stroke-width="4"/><path d="M${x - 180} ${PY0 + 350} V${PY0 + 430} M${x + 180} ${PY0 + 350} V${PY0 + 430}" stroke="#C8A070" stroke-width="10"/>`
      + [-1, 1].map((sd) => [0, 1, 2, 3].map((j) => `<rect x="${x + sd * 170 - 46}" y="${PY0 + 304 - j * 26}" width="92" height="24" rx="4" fill="${["#E0453A", "#3A8DFF", "#43BF6C", "#FFC83A"][(j + (sd > 0 ? 2 : 0)) % 4]}" stroke="#5A3A20" stroke-width="2"/>`).join("")).join("")
      + `<rect x="${x - 230}" y="${PY0 + 186}" width="460" height="16" rx="4" fill="#E8C68A" stroke="#9A6A38" stroke-width="3"/>` + [...Array(14)].map((_, j) => `<path d="M${x - 220 + j * 32} ${PY0 + 186} v8" stroke="#9A6A38" stroke-width="2"/>`).join("")
      + TF(x, PY0 + 194, 1, hangMag21(t, a, 66, .62)) + stopLine(1, PY0 + 268, 150);
    s += panel(1, p, "in the classroom"); }
  // 3 THE BASIN: the classroom floor, a plastic basin of water, a round plastic lid floating in it with the magnet lying on the lid; it turns
  // slowly in the water, then stops along the same line (seen from above, tilted)
  { const x = PX[2], a = pSpin(t, tB, 2, D[2]), cy = PY0 + 250, rp = (t * .7) % 1; let p = `<rect x="${x - 260}" y="${PY0}" width="520" height="430" fill="#C9D3DA"/>` + [...Array(6)].map((_, j) => `<path d="M${x - 260} ${PY0 + 60 + j * 70} H${x + 260}" stroke="#AEBBC6" stroke-width="3"/>`).join("")
      + `<ellipse cx="${x}" cy="${cy + 24}" rx="236" ry="104" fill="#E07A9A" stroke="#9A3A5A" stroke-width="6"/><ellipse cx="${x}" cy="${cy}" rx="236" ry="104" fill="#F4A6C0" stroke="#9A3A5A" stroke-width="6"/><ellipse cx="${x}" cy="${cy + 4}" rx="206" ry="86" fill="#9FD6EA"/>`
      + (t > tB ? `<ellipse cx="${x}" cy="${cy + 6}" rx="${n2(120 + 80 * rp)}" ry="${n2(50 + 34 * rp)}" fill="none" stroke="#fff" stroke-width="3" opacity="${n2(.6 * (1 - rp))}"/>` : "")
      + `<g transform="translate(${x} ${cy + 6}) scale(1 .42)"><circle r="122" fill="#FFF3C4" stroke="#C8A84A" stroke-width="7"/><circle r="104" fill="none" stroke="#E8D08A" stroke-width="4"/><g transform="rotate(${n2(-a)})">${TF(0, 0, .62, bar20(t, { glint: false }))}</g></g>`
      + (t > tB && t < tB + .8 ? `<path d="M${x - 40} ${cy - 30} q-20 -40 -50 -30 M${x + 40} ${cy - 30} q20 -40 50 -30" stroke="#fff" stroke-width="5" fill="none" opacity="${n2(1 - (t - tB) / .8)}"/>` : "") + stopLine(2, cy + 140, 150);
    s += panel(2, p, "floating on a lid"); }
  // the ONE big dashed gold line across all three panels: N at the rain-tree end (left), S at the other; the end tags
  if (t >= tN) { s += nsLine(t, tN, -420, 172, 420, 172, 40) + (t > tN + .6 ? TF(0, 132, spring(t, tN + .6, .45), tpill(0, 0, "the same line every time", 32, NSC, "#fff", { w: 700 })) : "");
    s += (t >= m("endN") ? TF(-250, 234, spring(t, m("endN"), .45), tpill(0, 0, "this end faces North", 30, NORTHC, "#fff", { w: 700 })) + pline(-420, 197, -330, 222, ramp(t, m("endN"), .2)) : "")
      + (t >= m("endS") ? TF(250, 234, spring(t, m("endS"), .45), tpill(0, 0, "this end faces South", 30, SOUTHC, "#fff", { w: 700 })) + pline(420, 197, 330, 222, ramp(t, m("endS"), .2)) : ""); }
  return s; }

/* ================================================================ Part 1 · [LOOK CLOSER] fly up and see the whole Earth ================================================================ */
// up: from Basil's magnet the view rises in ONE smooth move (a map seen from above): the field and its cones, the school, the HDB blocks
// round it, the whole of Singapore (a small green island, labelled), the sea, Malaysia above it; then the whole round EARTH (North at the
// top, South at the bottom); everywhere: little magnets on stands pop on round the world (Singapore labelled), each turns and comes to rest
// along the North-South line there (red ends all towards North), none near the poles; soft gold ripples from the Earth to each (interacts).
// The Earth turns slowly. (One face of a globe cannot show every continent: the magnets sit in Europe, Africa, India, Singapore, Japan and
// Australia; the United States is on Part 2's small Earth.)
const SGI = [[103.64, 1.32], [103.68, 1.4], [103.75, 1.44], [103.82, 1.47], [103.9, 1.42], [104.0, 1.4], [104.05, 1.36], [104.0, 1.33], [103.95, 1.31], [103.86, 1.27], [103.78, 1.27], [103.7, 1.29]];
const JOHOR = [[103.2, 1.48], [103.5, 1.47], [103.62, 1.44], [103.72, 1.47], [103.85, 1.5], [104.0, 1.46], [104.3, 1.42], [104.5, 1.5], [104.5, 2.2], [103.2, 2.2]];
const BATAM = [[103.9, 1.18], [104.15, 1.16], [104.12, 1.02], [103.95, 1.03]];
const SCHOOL = [103.94, 1.355], EMAG = [[103.8, 1.35, "Singapore"], [12, 48], [22, 2], [78, 21], [139, 36], [134, -25]];
const kmXY = (lon, lat) => [(lon - SCHOOL[0]) * 111, -(lat - SCHOOL[1]) * 111];
function riseView(t, u) { const P_ = Math.exp(lerp(Math.log(9000), Math.log(14), u)), f = ss(.45, .95, u), fx = lerp(0, kmXY(103.86, 1.36)[0], f), fy = lerp(0, kmXY(103.86, 1.36)[1] + 4 * f, f);
  const XY = (lon, lat) => { const [x, y] = kmXY(lon, lat); return [(x - fx) * P_, (y - fy) * P_]; }, poly = (pts) => "M" + pts.map((p) => XY(...p).map(n2).join(" ")).join(" L") + "z";
  let s = `<rect x="-830" y="-395" width="1660" height="790" fill="#3F86C8"/>` + `<path d="${poly(JOHOR)}" fill="#6DB45E" stroke="#3E8A3E" stroke-width="4"/><path d="${poly(SGI)}" fill="#7CC468" stroke="#3E8A3E" stroke-width="5"/><path d="${poly(BATAM)}" fill="#6DB45E" stroke="#3E8A3E" stroke-width="4"/>`;
  // the town round the school: HDB blocks (rows of pale rectangles) and roads; then the school, its field, the track, the cones and the magnet
  const km = (x, y) => [(x - fx) * P_, (y - fy) * P_];
  if (P_ > 120) { const a = clamp((P_ - 120) / 300); let blk = ""; for (let i = -14; i <= 14; i++) for (let j = -10; j <= 10; j++) { if (Math.abs(i) < 3 && Math.abs(j) < 3) continue; const [x, y] = km(i * .11 + .03 * hash(i, j), j * .11), w = .06 * P_, h = .022 * P_;
      if (Math.abs(x) < 900 && Math.abs(y) < 500) blk += `<rect x="${n2(x - w / 2)}" y="${n2(y - h / 2)}" width="${n2(w)}" height="${n2(h)}" fill="${(i + j) % 3 ? "#F2E8D8" : "#E2D2BC"}" stroke="#B8A888" stroke-width="1.5"/>`; }
    const rd = [-.18, .18].map((v) => { const [x1, y1] = km(-2, v), [x2] = km(2, v); return `<path d="M${n2(x1)} ${n2(y1)} H${n2(x2)}" stroke="#B8BCC4" stroke-width="${n2(.03 * P_)}"/>`; }).join("");
    s += OP(a, `<rect x="-830" y="-395" width="1660" height="790" fill="#9AC88A"/>` + rd + blk); }
  if (P_ > 500) { const a = clamp((P_ - 500) / 600), [sx, sy] = km(0, 0), W = .22 * P_, H = .16 * P_;
    s += OP(a, `<rect x="${n2(sx - W / 2)}" y="${n2(sy - H / 2)}" width="${n2(W)}" height="${n2(H)}" fill="#8CC867"/><rect x="${n2(sx - W / 2)}" y="${n2(sy - H / 2)}" width="${n2(W)}" height="${n2(H * .22)}" fill="#F2E4C8" stroke="#C8B48E" stroke-width="3"/>`
      + `<rect x="${n2(sx - W * .32)}" y="${n2(sy - H * .12)}" width="${n2(W * .64)}" height="${n2(H * .5)}" rx="${n2(H * .25)}" fill="none" stroke="#C9573E" stroke-width="${n2(Math.max(2, .008 * P_))}"/>`
      + TF(sx, sy + H * .13, Math.max(.05, P_ / 9000), CONES.map(([x], i) => `<circle cx="${(x - 1180) * .35}" cy="0" r="16" fill="${CONEC}" stroke="#9A4A10" stroke-width="4"/>`).join("") + `<rect x="-42" y="-10" width="42" height="20" fill="${NORTHC}"/><rect x="0" y="-10" width="42" height="20" fill="${SOUTHC}"/><path d="M-70 0 H70" stroke="${NSC}" stroke-width="5" stroke-dasharray="12 8"/>`));
    if (P_ > 2000) s += TF(sx, sy - H * .35, 1, tpill(0, 0, "the school field", 30, "#fff", P.ink, { w: 700 })); }
  if (P_ < 260 && P_ > 18) { const a = Math.min(clamp((260 - P_) / 80), clamp((P_ - 18) / 10)), [lx, ly] = XY(103.83, 1.36), [mx, my] = XY(103.9, 1.6); s += OP(a, TF(lx, ly, 1, tpill(0, 0, "Singapore", 38, "#fff", P.ink, { w: 700 })) + (P_ < 120 ? TF(mx, my, 1, tpill(0, 0, "Malaysia", 32, "#fff", P.ink, { w: 700 })) : "") + (P_ < 90 ? TF(0, 330, 1, T(0, 0, "the sea", 30, "#fff", { w: 700 })) : "")); }
  return s; }
function lcEarthArt(t) { const m = MKS, tU = m("up"), tE = m("earth"), tW = m("everywhere"), tK = m("kw_earth_behaves_like_a_magnet"), tP = m("poles2"), tC = m("chartEarth");
  if (t < tE - .2) return riseView(t, eio((t - tU) / (tE - .3 - tU)));
  const g = (() => { const e = eio((t - tE + .2) / 1.4), R = lerp(2600, 250, e); return { R, lon0: lerp(103.8, 70, e) + 6 * clamp((t - tE - 1.4) / 18), lat0: lerp(1.3, 10, e) }; })(), cx = -60, cy = -40;
  let s = `<rect x="-830" y="-395" width="1660" height="790" fill="#0B1033"/>` + [...Array(60)].map((_, i) => `<circle cx="${n2((hash(i, 2) - .5) * 1640)}" cy="${n2((hash(i, 4) - .5) * 780)}" r="${n2(1 + 2.4 * hash(i, 6))}" fill="#fff" opacity="${n2(.3 + .5 * hash(i, 8) * (.6 + .4 * Math.sin(t * 2 + i)))}"/>`).join("");
  s += OP(1 - ss(tE - .2, tE + .2, t), `<g>${riseView(t, 1)}</g>`);
  let G = earth21(t, { ...g, words: t > tE + 1.2, id: "lce" });
  // the little magnets: they pop on one after another, turn, then rest along the North-South line (red ends towards North); gold ripples
  EMAG.forEach(([lo, la, name], i) => { const tp = tW + .4 * i; if (t < tp) return; const sp = settle21(t, tp + .1, 130 + 40 * i, .55, 6.5), kk = spring(t, tp, .45);
    const [x, y, c] = earthPt(lo, la, g); if (c < .15) return; const rp = ((t - tp) / 1.6) % 1;
    G += (t > tp + .8 ? `<circle cx="${n2(x)}" cy="${n2(y)}" r="${n2(14 + 40 * rp)}" fill="none" stroke="${NSC}" stroke-width="3" opacity="${n2(.7 * (1 - rp))}"/>` : "") + earthMag(lo, la, g, sp, 1.3 * kk);
    if (name && t > tp + .3) G += TF(x - 120, y + 40, spring(t, tp + .3, .45), tpill(0, 0, name, 26, "#fff", P.ink, { w: 700 })); });
  s += TF(cx, cy, 1, G);
  if (t >= tW + 2.6) { const [x, y] = earthPt(103.8, 1.3, g); s += lcLab(t, tW + 2.6, cx + 330, cy + 150, "interacts", cx + x + 20, cy + y, { size: 34, fill: NSC, ink: "#fff" }); }
  // its own North and South poles: two thin lines to the top and bottom of the Earth (no colour, no magnet drawn in it)
  if (t >= tP) s += OP(ramp(t, tP, .4), pline(cx + 300, cy - 210, cx + 6, cy - g.R + 4, 1) + pline(cx + 300, cy + 210, cx + 6, cy + g.R - 4, 1) + TF(cx + 470, cy - 210, spring(t, tP, .45), tpill(0, 0, "its own North pole", 30, "#fff", P.ink, { w: 700 })) + TF(cx + 470, cy + 210, spring(t, tP + .2, .45), tpill(0, 0, "its own South pole", 30, "#fff", P.ink, { w: 700 })));
  // chartEarth: THE SPIN CHART gets its small Earth (an inset of the chart's bottom with an arrow from the big Earth)
  if (t >= tC) s += TF(-560, -240, spring(t, tC, .45), `<g filter="url(#drop)"><rect x="-200" y="-90" width="400" height="180" rx="14" fill="#FDFEFE" stroke="#B8C0C8" stroke-width="8"/></g><circle cx="-130" cy="0" r="50" fill="#3F7FD0" stroke="${P.ink}" stroke-width="3"/><path d="M-152 -24 q22 -12 34 4 q10 20 -10 34 q-22 2 -24 -38z" fill="#5FAE5A"/>` + T(60, -8, "Why? Earth behaves", 28, P.ink, { w: 700 }) + T(60, 26, "like a magnet", 28, P.ink, { w: 700 }) + T(0, -110, "THE SPIN CHART", 26, "#fff", { w: 700 }));
  return s; }

/* ================================================================ Part 2 · [LOOK CLOSER] turn the compass, not the needle ================================================================ */
// the compass FILLS the left two thirds, seen from above, BIG: Basil turns the case slowly (a quarter turn, then a half turn: a curved arrow):
// the dial and its letters turn; the thin red-and-white needle stays exactly where it was (the dashed gold line from its red end to the
// panel's edge stays still). setN: the case is turned back until the N sits right under the red end (a green tick); this way is North. At
// the right, THE TRAIL MAP's compass rose, big: N fills the box the gold line points to (up), then E, S, W.
const LCU = [-370, -10], LCK = 2.0;
const caseAt = (t) => { const m = MKS, tT = m("turn"), tN = m("setN"); if (t < tT) return 0; if (t < tN) return 90 * eio((t - tT) / 1.3) + 90 * eio((t - tT - 2.0) / 1.4);
  return 180 * (1 - eio((t - tN) / 1.6)); };
function lcUseArt(t) { const m = MKS, tT = m("turn"), tS = m("still"), tN = m("setN"), tR = m("rose"), cd = caseAt(t), R = 130 * LCK;
  let s = `<rect x="-830" y="-395" width="1660" height="790" fill="#E9DCC0"/>` + [...Array(9)].map((_, i) => `<path d="M-830 ${-395 + i * 95} H830" stroke="#D2C09A" stroke-width="6"/>`).join("");   // the wooden ledge, from above
  // the gold line from the needle's red end to the panel's edge (still while the case turns)
  s += `<path d="M${LCU[0]} ${n2(LCU[1] - R * .86)} V-395" stroke="${NSC}" stroke-width="12" stroke-dasharray="30 18"/>`;
  s += TF(LCU[0], LCU[1], LCK, compass21(t, .6 * Math.sin(t * 7) * (1 - ss(tT - .5, tT, t)), cd));
  // the curved arrow while the case turns (both turns, then the turn back)
  const arc = (a0, a1, k) => { if (k < .02) return ""; const r = R + 80, p = (d) => [LCU[0] + r * Math.sin(d * Math.PI / 180), LCU[1] - r * Math.cos(d * Math.PI / 180)], [x0, y0] = p(a0), [x1, y1] = p(a1), dir = a1 > a0 ? 1 : 0, ah = a1 + (a1 > a0 ? -8 : 8), [hx, hy] = p(ah);
    return OP(k, `<path d="M${n2(x0)} ${n2(y0)} A${r} ${r} 0 0 ${dir} ${n2(x1)} ${n2(y1)}" fill="none" stroke="#fff" stroke-width="26" stroke-linecap="round"/><path d="M${n2(x0)} ${n2(y0)} A${r} ${r} 0 0 ${dir} ${n2(x1)} ${n2(y1)}" fill="none" stroke="${P.ink}" stroke-width="12" stroke-linecap="round"/><circle cx="${n2(x1)}" cy="${n2(y1)}" r="16" fill="${P.ink}"/>`); };
  s += arc(100, 190, ramp(t, tT, .3) * (1 - ramp(t, tS + .8, .3))) + arc(-10, -120, ramp(t, tN, .3) * (1 - ramp(t, tN + 2, .3)));
  if (t >= tT && t < tN + 2.2) s += OP(1 - ramp(t, tN + 1.8, .3), TF(LCU[0] - 120, LCU[1] + R + 52, spring(t, tT + .2, .45), tpill(0, 0, "Basil turns the compass", 30, P.basil, "#fff", { w: 700 })));
  // the tags: the needle stays still · the letters turn (each joined to what it describes)
  s += lcLab(t, tS, 120, -250, "the needle stays still", LCU[0] + 10, LCU[1] - R * .5, { size: 32, t1: tN, fill: NEEDLEC, ink: "#fff" })
    + lcLab(t, tS + .7, 130, 150, "the letters turn", LCU[0] + R * .7 * Math.sin((cd + 90) * Math.PI / 180), LCU[1] - R * .7 * Math.cos((cd + 90) * Math.PI / 180), { size: 32, t1: tN });
  if (t >= tN + 1.6) s += TF(LCU[0] + 110, LCU[1] - R * .96, spring(t, tN + 1.6, .45), tickBadge(40)) + lcLab(t, tN + 1.7, 120, -250, "N under the red end", LCU[0] + 30, LCU[1] - R * .74, { size: 32, fill: GOODC, ink: "#fff" })
    + TF(LCU[0] + 200, -350, spring(t, tN + 2.3, .45), tpill(0, 0, "this way is North", 32, NSC, "#fff", { w: 700 }));
  // THE TRAIL MAP's compass rose (the right third): its four boxes fill N, E, S, W
  const RX = 560, RY = -140; s += TF(RX, RY, 1, `<g filter="url(#drop)"><rect x="-230" y="-230" width="460" height="420" rx="18" fill="#F6EBD2" stroke="#8A5E34" stroke-width="14"/></g>` + T(0, -180, "THE TRAIL MAP", 30, "#5A3A1E", { ls: 2 }));
  let rose = `<circle r="120" fill="#FFF8E6" stroke="#5A3A1E" stroke-width="4"/><path d="M0 -66 L14 -14 L66 0 L14 14 L0 66 L-14 14 L-66 0 L-14 -14z" fill="#fff" stroke="#5A3A1E" stroke-width="4"/><path d="M0 -66 L14 -14 L0 0z M66 0 L14 14 L0 0z M0 66 L-14 14 L0 0z M-66 0 L-14 -14 L0 0z" fill="#C8B490"/>`;
  ROSE21.forEach(([l, rx, ry], i) => { const ti = tR + .4 * i, on = t >= ti; rose += `<rect x="${rx - 26}" y="${ry - 26}" width="52" height="52" rx="8" fill="${on ? "#fff" : "#EFE2C6"}" stroke="#5A3A1E" stroke-width="4"/>` + (on ? TF(rx, ry, spring(t, ti, .4), T(0, 15, l, 42, l === "N" ? NEEDLEC : "#5A3A1E")) : "") + (on ? popSpark(t, ti, rx, ry, 50) : ""); });
  s += TF(RX, RY + 10, 1.05, rose);
  if (t >= tR) s += OP(ramp(t, tR, .3), `<path d="M${LCU[0]} -380 Q${RX - 200} -420 ${RX} ${RY - 128}" fill="none" stroke="${NSC}" stroke-width="6" stroke-dasharray="14 10"/>`);
  return s; }

/* ================================================================ Part 2 · [LOOK CLOSER] night and far away ================================================================ */
// two beats, each half of the panel, big. LEFT: the Singapore Strait at night, a container ship with its lights on; clouds hide the stars
// and the Moon (no Sun, no stars); a magnifier into the ship's bridge: the ship's compass in its stand (a binnacle), its card with a red N
// swinging, slowing and coming to rest on a dashed gold N – S line, the captain's hand on the wheel. RIGHT: far away in the United States a
// hiker with a backpack in thick white fog among tall pines (no named park); her compass in her hand settles on its gold N – S line. A small
// Earth between the halves: Singapore and the United States marked, their little magnets lined up.
const shipBig = (t) => { const b = 4 * Math.sin(t * 1.2); return `<g transform="translate(0 ${n2(b)})"><path d="M-330 0 L-310 -60 H330 L300 0z" fill="#3A2E3E" stroke="#120E2E" stroke-width="4"/><path d="M-310 -44 H330" stroke="#8A2E2E" stroke-width="6"/>`
  + [...Array(14)].map((_, i) => `<rect x="${-290 + i * 36}" y="${-60 - 26 * (1 + (i * 5) % 3)}" width="33" height="${26 * (1 + (i * 5) % 3)}" fill="${["#7A3A30", "#2E4A6A", "#8A6A1E", "#3E5A3E", "#5A3E6E"][i % 5]}" stroke="#120E2E" stroke-width="2"/>`).join("")
  + `<rect x="200" y="-150" width="90" height="90" fill="#D8DCE4" stroke="#120E2E" stroke-width="3"/><rect x="190" y="-176" width="110" height="30" fill="#C8CCD4" stroke="#120E2E" stroke-width="3"/>` + [0, 1, 2].map((i) => `<rect x="${200 + i * 32}" y="-170" width="22" height="16" fill="#FFE7A0"/>`).join("")
  + [[-300, -70], [300, -70], [245, -180], [0, -150]].map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="${n2(6 + 2 * Math.sin(t * 3 + i))}" fill="${i === 1 ? "#3AE060" : i === 0 ? "#FF5A4A" : "#FFF2B0"}"/><circle cx="${x}" cy="${y}" r="20" fill="#FFF2B0" opacity=".2"/>`).join("") + `<path d="M245 -176 V-230" stroke="#C8CCD4" stroke-width="5"/></g>`; };
const pine21 = (x, y, h, c) => { let s = `<rect x="${n2(x - h * .025)}" y="${n2(y - h * .2)}" width="${n2(h * .05)}" height="${n2(h * .2)}" fill="#6A5A4A"/>`; for (let i = 0; i < 5; i++) { const ty = y - h * (.18 + i * .17), w = h * (.2 - i * .032); s += `<path d="M${n2(x - w)} ${n2(ty)} Q${x} ${n2(ty - h * .04)} ${n2(x + w)} ${n2(ty)} L${x} ${n2(ty - h * .26)}z" fill="${c}" stroke="#4E6A5A" stroke-width="2" stroke-linejoin="round"/>`; } return s; };
// the hiker (a woman in a red jacket with a big backpack, a cap; one hand holds her compass flat in front of her), origin = her feet
const hiker21 = (t) => { const sw = 2 * Math.sin(t * 1.5); return `<g transform="rotate(${n2(sw * .4)})"><path d="M-14 0 L-10 -110 M14 0 L10 -110" stroke="#3A4A5A" stroke-width="22" stroke-linecap="round"/><ellipse cx="-16" cy="2" rx="18" ry="8" fill="#5A3A2A"/><ellipse cx="18" cy="2" rx="18" ry="8" fill="#5A3A2A"/>`
  + `<rect x="-62" y="-250" width="62" height="120" rx="20" fill="#5E7A4A" stroke="#3E5A2E" stroke-width="4"/><rect x="-60" y="-200" width="58" height="14" rx="4" fill="#3E5A2E"/>` + `<rect x="-34" y="-230" width="70" height="130" rx="26" fill="#D6402E" stroke="#8A2418" stroke-width="4"/>`
  + `<path d="M28 -200 Q60 -170 72 -150" stroke="#D6402E" stroke-width="22" stroke-linecap="round" fill="none"/><circle cx="76" cy="-146" r="13" fill="${SKN}" stroke="${SKL}" stroke-width="3"/>`
  + `<circle cx="0" cy="-262" r="32" fill="${SKN}" stroke="${SKL}" stroke-width="3"/><path d="M-34 -268 Q0 -310 34 -268z" fill="#3A56A8"/><path d="M20 -276 H52" stroke="#3A56A8" stroke-width="10" stroke-linecap="round"/><circle cx="14" cy="-262" r="4" fill="#2B2147"/><path d="M8 -246 q8 5 16 0" stroke="#8A4A3A" stroke-width="3" fill="none"/>`
  + `<path d="M-30 -236 Q-40 -248 -26 -270" stroke="#4A2E1E" stroke-width="10" fill="none" stroke-linecap="round"/>` + TF(82, -144, .16, compass21(t, 0, 20, { sy: .5, base: false })) + `</g>`; };
function lcNightArt(t) { const m = MKS, tS = m("ship"), tC = m("clouds"), tN = m("shipneedle"), tF = m("fog"), tH = m("hiker"), tK = m("kw_tell_the_direction");
  // LEFT: night. Stars and the Moon, then clouds slide over them; the sea; the ship with its lights
  let L = `<rect x="-830" y="-395" width="820" height="790" fill="url(#ngSky)"/>` + [...Array(40)].map((_, i) => `<circle cx="${n2(-820 + hash(i, 2) * 800)}" cy="${n2(-390 + hash(i, 4) * 320)}" r="${n2(1.4 + 2 * hash(i, 6))}" fill="#fff" opacity="${n2(.4 + .5 * hash(i, 8))}"/>`).join("")
    + `<circle cx="-650" cy="-300" r="44" fill="#FFF6D0"/><circle cx="-632" cy="-312" r="40" fill="#1A2450" opacity="0"/>`;
  const cv = ss(tC - .3, tC + 2.2, t); L += [...Array(6)].map((_, i) => { const x = lerp(-1100 - i * 120, -720 + i * 130, cv), y = -340 + (i % 3) * 70; return `<ellipse cx="${n2(x)}" cy="${y}" rx="240" ry="62" fill="#2E3A66"/><ellipse cx="${n2(x + 60)}" cy="${y - 22}" rx="150" ry="50" fill="#3A4778"/>`; }).join("");
  L += `<rect x="-830" y="-70" width="820" height="470" fill="url(#ngSea)"/>` + [...Array(14)].map((_, i) => `<path d="M${n2(-800 + hash(i, 3) * 760)} ${n2(-40 + hash(i, 5) * 400)} h${n2(30 + 40 * hash(i, 7))}" stroke="#5A6AA0" stroke-width="3" opacity="${n2(.3 + .3 * Math.sin(t * 2 + i))}"/>`).join("")
    + `<path d="M-830 -70 H-10" stroke="#2A3A6A" stroke-width="4"/>` + [...Array(6)].map((_, i) => `<circle cx="${-760 + i * 30}" cy="-74" r="3" fill="#FFE7A0" opacity=".7"/>`).join("") + TF(-430, 40, .95, shipBig(t))
    + [[-560, 60], [-200, 64]].map(([x, y]) => `<path d="M${x} ${y} h80" stroke="#FFE7A0" stroke-width="4" opacity="${n2(.3 + .2 * Math.sin(t * 3 + x))}"/>`).join("");
  let s = `<clipPath id="lnL"><rect x="-830" y="-395" width="820" height="790"/></clipPath><g clip-path="url(#lnL)">${L}</g>`;
  // RIGHT: fog among tall pines; the hiker (only from `fog`; before it the right half waits, softly fogged)
  let Rt = `<rect x="10" y="-395" width="820" height="790" fill="url(#fogSky)"/>` + [[80, 360, 620, "#8FA898"], [230, 380, 700, "#7E9A88"], [700, 370, 660, "#8FA898"], [560, 390, 560, "#9EB4A6"], [420, 400, 760, "#6E8C7A"], [800, 400, 720, "#7E9A88"]].map(([x, y, h, c]) => pine21(x, y, h, c)).join("")
    + `<rect x="10" y="230" width="820" height="170" fill="#C8D0C8"/>` + [0, 1, 2].map((i) => `<ellipse cx="${n2(200 + ((t * 30 + i * 300) % 900))}" cy="${-100 + i * 120}" rx="300" ry="70" fill="#fff" opacity=".55" filter="url(#b10)"/>`).join("")
    + (t >= tF - .2 ? TF(290, 300, spring(t, tF, .5) * .95, hiker21(t)) : "") + `<rect x="10" y="-395" width="820" height="790" fill="#fff" opacity=".18"/>`;
  s += `<clipPath id="lnR"><rect x="10" y="-395" width="820" height="790"/></clipPath><g clip-path="url(#lnR)">${OP(.35 + .65 * ramp(t, tF - .3, .6), Rt)}</g><path d="M0 -395 V395" stroke="#FFF8EA" stroke-width="20"/>`;
  // the magnifier into the ship's bridge: the binnacle, the card swinging and coming to rest on the gold N – S line; the captain's hand on the wheel
  s += magni21(t, tN - .2, -520, -180, 190, -170, -150, (tt) => `<rect x="-200" y="-200" width="400" height="400" fill="#2A3048"/><rect x="-200" y="80" width="400" height="120" fill="#3E3A44"/>`
      + TF(-50, -10, .62, binnacle21(tt, settle21(tt, tN, 120, .8, 5))) + `<path d="M-50 -170 V150" stroke="${NSC}" stroke-width="7" stroke-dasharray="18 12"/>` + T(-50, -150, "N", 30, NSC) + T(-50, 178, "S", 30, NSC)
      + `<g transform="translate(120 40) rotate(${n2(8 * Math.sin(tt * .8))})"><circle r="70" fill="none" stroke="#8A5E34" stroke-width="12"/>${[...Array(8)].map((_, i) => `<path d="M0 0 L0 -96" stroke="#8A5E34" stroke-width="10" stroke-linecap="round" transform="rotate(${i * 45})"/>`).join("")}<circle r="16" fill="#8A5E34"/></g>`
      + TF(150, -20, .55, hand15({ curl: .8, sleeve: "#F4F6F2", sleeveD: "#B8C0C8" }), -60), "the ship's compass")
    + lcLab(t, tN + 1.2, -230, 130, "the captain knows which way to steer", -430, 30, { size: 30, t1: tF });
  if (t >= tS + .4) s += lcLab(t, tS + .4, -600, -60, "no Sun, no stars", -560, -300, { size: 34, t1: tN - .3 });
  if (t >= tF + .3) s += lcLab(t, tF + .3, 420, -330, "the United States, far away", 300, -120, { size: 32, t1: tH });
  // her compass, close up: the needle settling on its gold N – S line
  s += magni21(t, tH - .2, 560, -150, 165, 390, 160, (tt) => `<rect x="-200" y="-200" width="400" height="400" fill="#E4EAE6"/>` + `<path d="M0 -170 V170" stroke="${NSC}" stroke-width="7" stroke-dasharray="18 12"/>` + TF(0, 10, .95, compass21(tt, settle21(tt, tH, 100, .7, 5), 20, { base: false })) + T(0, -140, "N", 30, NSC) + T(0, 166, "S", 30, NSC), "her compass works too");
  // the small Earth between the halves: Singapore and the United States marked, their little magnets lined up (place words only)
  const g = { R: 104, lon0: 172, lat0: 15 }; let E = earth21(t, { ...g, glow: true, id: "lcn" }) + earthMag(103.8, 1.3, g, 0, .9) + earthMag(-100, 40, g, 0, .9);
  const [sx, sy] = earthPt(103.8, 1.3, g), [ux, uy] = earthPt(-100, 40, g); E += `<circle cx="${n2(sx)}" cy="${n2(sy)}" r="6" fill="#FFE7A0"/><circle cx="${n2(ux)}" cy="${n2(uy)}" r="6" fill="#FFE7A0"/>` + TF(sx - 40, sy + 34, 1, tpill(0, 0, "Singapore", 20, "#fff", P.ink, { w: 700 })) + TF(ux + 30, uy - 32, 1, tpill(0, 0, "the United States", 20, "#fff", P.ink, { w: 700 }));
  if (t >= tF + 1.2) s += TF(0, -10, spring(t, tF + 1.2, .5), E);
  return s; }

/* ================================================================ PICTURES ================================================================ */
// Part 1 Round 1's ring picture: Basil's magnet on its string from the broom handle, spinning (spin, spin, spin), motion lines round it
const ringP1 = (t) => `<circle cx="430" cy="470" r="190" fill="#FFF8EA"/>` + broom21(260, 600, 330) + TF(430, 330, 1, hangMag21(t, (t * 150) % 360, 150, .78))
  + [0, 1].map((i) => `<path d="M${330 - i * 20} ${470 + i * 26} Q430 ${520 + i * 26} ${530 + i * 20} ${470 + i * 26}" fill="none" stroke="${P.ink}" stroke-width="4" opacity="${n2(.25 + .2 * Math.sin(t * 6 + i))}" stroke-dasharray="14 10"/>`).join("");
// Part 1: the cliffhanger's close-up: Momo's compass over the cones' line, its needle settling along it (red end towards the rain tree)
const cliffMagni = (t, t0) => (tt) => `<rect x="-260" y="-260" width="520" height="520" fill="url(#fdGrass)"/><path d="M-240 120 H240" stroke="${NSC}" stroke-width="10" stroke-dasharray="26 16"/>` + TF(-190, 150, .5, cone21()) + TF(190, 150, .5, cone21())
  + `<path d="M-230 -10 H230" stroke="${NSC}" stroke-width="7" stroke-dasharray="20 14" opacity="${n2(ss(t0 + 2.2, t0 + 2.8, tt))}"/>` + TF(0, -10, .95, compass21(tt, settle21(tt, t0, 20, 1.0, 4.6, -90), 0, { sy: .62, base: false }));
// Mark Sentence 1's small picture: the hanging magnet over its two cones on the dashed gold N – S line
const markHang = (t, x, y, k) => TF(x, y, k, `<g filter="url(#dropS)"><rect x="-430" y="-160" width="860" height="320" rx="30" fill="#FFF8EA"/></g>` + broom21(-200, 200, -130) + TF(0, -130, 1, hangMag21(t, 0, 150, .8))
  + nsLine(99, 0, -230, 110, 230, 110, 36) + TF(-110, 128, .55, cone21()) + TF(110, 128, .55, cone21()));
// Mark Sentence 2's small picture: the Earth with its little magnets lined up (place words only)
const markEarth = (t, x, y, k) => { const g = { R: 140, lon0: 85, lat0: 10 }; return TF(x, y, k, `<g filter="url(#dropS)"><rect x="-430" y="-180" width="860" height="360" rx="30" fill="#0B1033"/></g>` + earth21(t, { ...g, words: true, id: "mk2" }) + EMAG.map(([lo, la]) => earthMag(lo, la, g, 0, .8)).join("")); };
// Part 1's fun fact (the swallow): ff_map a map of Asia, a dotted route of little swallows from the far north to Singapore; ff_earth a small
// Earth with a soft glow, a tiny swallow over it; ff_way a swallow flying, a tiny compass rose beside it
const ffMap21 = (t, w, h) => { const u = clamp((t - MKS("ff_map")) / 3); let s = `<rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" fill="#6FB0E0"/>` + `<path d="M${-w / 2} ${-h / 2} H${w / 2} V20 Q60 30 30 60 Q10 100 -10 150 L-20 ${h / 2} H${-w / 2}z" fill="#8CC867" stroke="#3E8A3E" stroke-width="4"/>`
    + `<circle cx="-14" cy="120" r="9" fill="${NORTHC}" stroke="#fff" stroke-width="3"/>` + T(56, 128, "Singapore", 20, "#fff", { w: 700 }) + T(-40, -120, "far north", 22, P.ink, { w: 700 });
  s += `<path d="M-70 -110 Q40 -40 -14 110" fill="none" stroke="#fff" stroke-width="5" stroke-dasharray="12 10"/>`;
  [0, .33, .66].forEach((d) => { const v = (u + d) % 1, x = lerp(-70, -14, v) + 60 * Math.sin(v * Math.PI) , y = lerp(-110, 110, v); s += TF(x, y, .18, swallowFly(t, { ph: d * 9, look: 1 }), 70); });
  return s; };
const ffEarth21 = (t, w, h) => `<rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" fill="#0B1033"/>` + [...Array(14)].map((_, i) => `<circle cx="${n2((hash(i, 3) - .5) * w)}" cy="${n2((hash(i, 5) - .5) * h)}" r="2" fill="#fff" opacity=".6"/>`).join("")
  + TF(0, 30, 1, earth21(t, { R: 92, lon0: 110, lat0: 15, id: "ffe" }) + `<circle r="112" fill="none" stroke="#FFE7A0" stroke-width="6" opacity="${n2(.4 + .3 * Math.sin(t * 3))}"/>`) + TF(40 * Math.sin(t * .8), -90, .32, swallowFly(t, { look: 1 }));
const ffWay21 = (t, w, h) => `<rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" fill="#8FD0F6"/><ellipse cx="-40" cy="-90" rx="90" ry="24" fill="#fff"/>` + TF(-30 + 20 * Math.sin(t), 20, .62, swallowFly(t, { look: 1 }))
  + TF(90, 100, .42, `<circle r="80" fill="#FFF8E6" stroke="#5A3A1E" stroke-width="5"/><path d="M0 -60 L12 -12 L60 0 L12 12 L0 60 L-12 12 L-60 0 L-12 -12z" fill="#fff" stroke="#5A3A1E" stroke-width="4"/><path d="M0 -60 L12 -12 L0 0 L-12 -12z" fill="${NEEDLEC}"/>` + T(0, -64, "N", 34, NEEDLEC));
// Part 1 "Now you know!": THE SPIN CHART complete, the magnet over its cones
const nykP1 = (t) => spinChart21(t, 800, 760, .9, { all: true }) + TF(1230, 640, .9, broom21(-180, 180, 0) + hangMag21(t, 0, 140, .7)) + TF(1160, 930, .5, cone21()) + TF(1300, 930, .5, cone21()) + nsLine(99, 0, 1100, 890, 1360, 890, 26);

/* ---------- Part 2 ---------- */
// the recap's three pictures (one at a time, centred, large): 0 Basil's magnet on its string over the two cones (the field); 1 the North-South
// line across the three places; 2 the Earth with its little magnets lined up
const recapP2 = (i, t) => { let s = `<rect x="-520" y="-300" width="1040" height="600" fill="${["#CFE6F0", "#FFF3DC", "#0B1033"][i]}"/>`;
  if (i === 0) s += `<rect x="-520" y="60" width="1040" height="240" fill="url(#fdGrass)"/>` + TF(-380, 120, .5, `<g transform="translate(-300 -452)">${rainTree(t)}</g>`) + broom21(-260, 260, -220) + TF(0, -220, 1, hangMag21(t, 0, 200, 1.0)) + TF(-150, 200, .8, cone21()) + TF(150, 200, .8, cone21()) + `<path d="M-150 186 H150" stroke="${NSC}" stroke-width="10" stroke-dasharray="26 16"/>`;
  if (i === 1) { [-340, 0, 340].forEach((x, j) => { s += TF(x, -60, .55, `<rect x="-280" y="-230" width="560" height="430" rx="30" fill="${["#CFE6F0", "#F3EBDA", "#C9D3DA"][j]}" stroke="${P.ink}" stroke-width="6"/>` + TF(0, -60, 1.4, bar20(t, { glint: false }))) + T(x, 110, ["the field", "the classroom", "the basin"][j], 34, P.ink, { w: 700 }); }); s += nsLine(99, 0, -440, 200, 440, 200, 48); }
  if (i === 2) { const g = { R: 230, lon0: 85, lat0: 10 }; s += TF(0, 20, 1, earth21(t, { ...g, words: true, id: "rc2" }) + EMAG.map(([lo, la]) => earthMag(lo, la, g, 0, 1.1)).join("")); }
  return s; };
// Round 1's three numbered picture cards: 1 Nothing happens (the needle still, the magnet beside it, a small "zzz"); 2 The needle turns (it
// swings towards the magnet; "towards or away"); 3 It spins round and round, forever (the needle with circular arrows)
const r1Pic = (i, t) => { let s = `<rect x="-200" y="-140" width="400" height="280" fill="${["#EEF1F5", "#E6F6E8", "#FBE6F0"][i]}"/>`;
  const nd = i === 0 ? 0 : i === 1 ? 62 + 4 * Math.sin(t * 3) : (t * 300) % 360; s += TF(-50, 6, .62, compass21(t, nd, 0, { base: false })) + TF(130, 6, .36, bar20(t, { glint: false }), 90);
  if (i === 0) s += T(40, -84, "z z z", 30, "#8A949E", { w: 700 });
  if (i === 1) s += tpill(-50, 112, "towards or away", 22, P.ink, "#fff", { w: 700 });
  if (i === 2) s += `<path d="M-150 -40 A110 110 0 1 1 -120 70" fill="none" stroke="${P.ink}" stroke-width="7" stroke-dasharray="16 10"/><path d="M-132 60 l12 14 l14 -14" fill="none" stroke="${P.ink}" stroke-width="7" stroke-linecap="round"/>`;
  return s; };
// Round 1's ring: Momo's compass flat on the trail map's wooden ledge, its needle at rest; Basil's bar magnet coming towards it along the
// wood (a GAP between them, never touching)
const ringP2 = (t) => { const x = 600 - 50 * (.5 + .5 * Math.sin(t * 1.2)); return `<circle cx="430" cy="470" r="190" fill="#E9DCC0"/>` + [0, 1, 2, 3].map((i) => `<path d="M240 ${400 + i * 46} H620" stroke="#D2C09A" stroke-width="5"/>`).join("")
  + TF(360, 470, .72, compass21(t, .6 * Math.sin(t * 6), 0, { base: false })) + TF(x, 470, .5, bar20(t, { glint: false })) + `<path d="M${n2(x - 100)} 520 H${n2(x - 160 + 10)}" stroke="${P.ink}" stroke-width="4" stroke-dasharray="6 6"/>` + T(x - 128, 552, "a gap", 22, P.ink, { w: 700 }); };
// the jetty's wooden bench (for the dare) and Basil's checklist easel (the Showdown)
const benchJ = (w = 560) => bench21(w);
const CHECK21 = ["Hold the compass flat, so the needle can turn freely.", "Wait until the needle stops moving.", "Keep Basil's magnet right next to the compass, to help it."];
const checkIcon = (i, t) => i === 0 ? TF(0, 0, .3, compass21(t, 0, 0, { sy: .5, base: false })) : i === 1 ? TF(-10, 0, .26, compass21(t, 0, 0, { base: false })) + `<circle cx="36" cy="24" r="22" fill="#fff" stroke="${P.ink}" stroke-width="4"/><path d="M36 24 V10 M36 24 H48" stroke="${P.ink}" stroke-width="4" stroke-linecap="round"/>`
  : TF(-16, 0, .26, compass21(t, 30, 0, { base: false })) + TF(40, 0, .2, bar20(t, { glint: false }), 90);
// Momo's checklist: a clipboard on a small easel (EP20's smallEasel), titled "Using my compass"; lit: [l1, l2, l3]; strike: line 3 struck
// through (KEPT); fix: the green rewrite under it, with a small phone and a small magnet beside it, each with a gap arrow
const momoSheet = (t, o = {}) => { const lit = o.lit || [0, 0, 0], st = o.strike || 0, fx = o.fix || 0, Y = [-150, -10, 130], H = 640;
  let s = `<ellipse cx="0" cy="6" rx="330" ry="16" fill="${P.ink}" opacity=".2" filter="url(#b4)"/><path d="M-230 0 L-180 -820 M230 0 L180 -820 M0 -30 V-780" stroke="#8A5A36" stroke-width="16" stroke-linecap="round"/><rect x="-310" y="-180" width="620" height="20" rx="8" fill="#7A4A26"/>`;
  let c = `<g filter="url(#drop)"><rect x="-300" y="${-H / 2}" width="600" height="${H}" rx="18" fill="#C9925A" stroke="#7A4A22" stroke-width="6"/></g><rect x="-276" y="${-H / 2 + 24}" width="552" height="${H - 48}" rx="8" fill="#FFFDF4"/><rect x="-90" y="${-H / 2 - 20}" width="180" height="50" rx="12" fill="#8A949E" stroke="#4A4E5A" stroke-width="4"/>`
    + T(0, -248, "Using my compass", 40, P.momo, { w: 700 }) + `<path d="M-200 -230 H200" stroke="${P.momo}" stroke-width="4"/>`;
  CHECK21.forEach((ln, i) => { const y = Y[i], ls = wrap(ln, 26, 360, 700); c += (lit[i] > .02 ? `<rect x="-266" y="${y - 48}" width="532" height="${ls.length * 32 + 34}" rx="12" fill="#FFF0A8" opacity="${n2(lit[i])}"/>` : "")
      + `<circle cx="-230" cy="${y - 14}" r="22" fill="${P.momo}"/>` + T(-230, y - 4, String(i + 1), 28, "#fff") + ls.map((l, j) => `<text x="-196" y="${y - 6 + j * 32}" font-family="Fredoka" font-weight="700" font-size="26" fill="${P.ink}">${esc(l)}</text>`).join("")
      + TF(206, y, 1, checkIcon(i, t)); });
  if (st > 0) c += `<path d="M-200 ${Y[2] - 12} L${n2(-200 + 370 * st)} ${Y[2] - 12} M-200 ${Y[2] + 20} L${n2(-200 + 300 * st)} ${Y[2] + 20}" stroke="#D6402E" stroke-width="7" stroke-linecap="round"/>`;
  if (fx > 0) c += OP(fx, `<rect x="-266" y="200" width="532" height="88" rx="12" fill="#E2F6E6" stroke="${GOODC}" stroke-width="4"/>` + wrap("Keep magnets and phones away from the compass.", 26, 330, 700).map((l, j) => `<text x="-246" y="${236 + j * 32}" font-family="Fredoka" font-weight="700" font-size="26" fill="#1F7A3E">${esc(l)}</text>`).join("")
    + TF(140, 244, .17, compass21(t, 0, 0, { base: false })) + `<rect x="222" y="218" width="30" height="52" rx="6" fill="#2B2147"/><rect x="226" y="224" width="22" height="36" rx="3" fill="#8FD0F6"/>` + `<path d="M176 278 H216" stroke="${GOODC}" stroke-width="3"/><path d="M170 278 l8 -5 v10z M222 278 l-8 -5 v10z" fill="${GOODC}"/>`);
  return o.board ? c : s + TF(0, -500, 1, c); };
// Mark Sentence 1's small picture: THE TRAIL MAP (rose filled, route lit) and the compass with the N under the red end
const markMap = (t, x, y, k) => TF(x, y, k, TF(-170, 0, .62, trailMap21(t, 0, 0, 1)) + TF(250, 40, .62, compass21(t, 0, 0, { base: false })));
// Mark Sentence 2's small picture: the ship's compass and the hiker's compass, both resting on their gold N – S lines
const markTwo = (t, x, y, k) => TF(x, y, k, `<g filter="url(#dropS)"><rect x="-460" y="-170" width="920" height="340" rx="30" fill="#FFF8EA"/></g><rect x="-440" y="-150" width="420" height="300" rx="20" fill="#1A2450"/><rect x="20" y="-150" width="420" height="300" rx="20" fill="#E4EAE6"/>`
  + `<path d="M-230 -140 V140 M230 -140 V140" stroke="${NSC}" stroke-width="7" stroke-dasharray="18 12"/>` + TF(-230, -10, .5, binnacle21(t, 0)) + TF(230, 0, .8, compass21(t, 0, 20, { base: false }))
  + T(-230, 130, "on a ship at night", 24, "#fff", { w: 700 }) + T(230, 130, "in the fog", 24, P.ink, { w: 700 }));
// the chant's board (right): three tiles that flash on their lines: 1 the magnet over the cones; 2 the needle pushed and pulled; 3 the Earth
const chantBoard21 = (t, f) => { const tile = (i, inner, lab) => { const y = -300 + i * 260, k = 1 + .08 * f[i]; return TF(0, y, k, `<g filter="url(#dropS)"><rect x="-240" y="-110" width="480" height="220" rx="24" fill="${f[i] > .3 ? "#FFF6C8" : "#FFF8EA"}" stroke="${f[i] > .3 ? P.sun : "#E3C9A8"}" stroke-width="8"/></g>${inner}${T(0, 92, lab, 26, P.ink, { w: 700 })}`); };
  const g = { R: 62, lon0: 85, lat0: 10 };
  return tile(0, broom21(-110, 110, -86) + TF(0, -86, 1, hangMag21(t, 0, 90, .5)) + nsLine(99, 0, -120, 50, 120, 50, 22), "Hang it freely: North–South")
    + tile(1, TF(-80, -10, .45, compass21(t, 55 * Math.sin(t * 2), 0, { base: false })) + TF(110, -10, .38, bar20(t, { glint: false })) + ppArrows(t, 20, -10, Math.sin(t * 2) > 0 ? "pull" : "push", 1, { gap: 6, len: 22, w: 8 }), "The needle: a small magnet")
    + tile(2, TF(0, -14, 1, earth21(t, { ...g, glow: false, id: "chb" }) + EMAG.slice(0, 4).map(([lo, la]) => earthMag(lo, la, g, 0, .5)).join("")), "Earth behaves like a magnet"); };
// Part 2's fun fact (the sea turtle): ff_baby a tiny baby turtle scrambling down a sandy beach into the sea; ff_ocean the turtle swimming
// across a wide blue ocean on a dotted route, a small glowing Earth above it (the Earth's magnet); ff_home a grown turtle arriving back on the
// same sandy beach (years later: back home)
const ffBaby21 = (t, w, h) => { const u = ((t - MKS("ff_baby")) / 3) % 1; return `<rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" fill="#8FD0F6"/><path d="M${-w / 2} -10 Q0 -30 ${w / 2} 0 V${h / 2} H${-w / 2}z" fill="#F2DCA0"/><path d="M${-w / 2} 60 Q0 40 ${w / 2} 70 V${h / 2} H${-w / 2}z" fill="#3E8FB4"/><path d="M${-w / 2} 60 Q0 40 ${w / 2} 70" stroke="#fff" stroke-width="6" fill="none"/>`
  + [[-60, -20], [-20, -26], [30, -22]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="14" ry="9" fill="#E8C888" stroke="#C8A868" stroke-width="2"/>`).join("") + TF(lerp(-40, 30, u), lerp(-10, 50, u), .32, turtleSwim(t, { baby: true }), 70); };
const ffOcean21 = (t, w, h) => { const u = ((t - MKS("ff_ocean")) / 4) % 1; return `<rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" fill="#2E7AA0"/>` + [...Array(6)].map((_, i) => `<path d="M${-w / 2 + 20 + i * 50} ${-40 + 30 * (i % 3)} q14 -8 28 0" stroke="#fff" stroke-width="3" fill="none" opacity=".5"/>`).join("")
  + `<path d="M${-w / 2 + 20} 120 Q0 20 ${w / 2 - 20} 100" fill="none" stroke="#fff" stroke-width="5" stroke-dasharray="12 10"/>` + TF(lerp(-w / 2 + 40, w / 2 - 40, u), 120 - 120 * Math.sin(u * Math.PI) * .7 + 10, .3, turtleSwim(t, {}), -20 + 40 * u)
  + TF(0, -90, 1, earth21(t, { R: 50, lon0: 100, lat0: 0, id: "ffo", glow: false }) + `<circle r="62" fill="none" stroke="#FFE7A0" stroke-width="5" opacity="${n2(.4 + .3 * Math.sin(t * 3))}"/>`); };
const ffHome21 = (t, w, h) => { const u = clamp((t - MKS("ff_home")) / 2.4); return `<rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" fill="#8FD0F6"/><path d="M${-w / 2} -10 Q0 -30 ${w / 2} 0 V${h / 2} H${-w / 2}z" fill="#F2DCA0"/><path d="M${-w / 2} 60 Q0 40 ${w / 2} 70 V${h / 2} H${-w / 2}z" fill="#3E8FB4"/><path d="M${-w / 2} 60 Q0 40 ${w / 2} 70" stroke="#fff" stroke-width="6" fill="none"/>`
  + TF(lerp(20, -10, u), lerp(110, 10, u), .55, turtleSwim(t, {}), -110) + TF(60, -70, 1, `<path d="M0 0 l-8 -14 h16z" fill="${NORTHC}"/>`) + T(60, -86, "home", 24, P.ink, { w: 700 }); };
// Part 2 "Now you know!": THE TRAIL MAP complete, Momo's compass
const nykP2 = (t) => trailMap21(t, 860, 560, .72, { all: true }) + TF(1300, 900, .55, compass21(t, 3 * Math.sin(t * 2), 0));
