// sets21.js: EP21's two real places (Stage 2, drawn 2026-11-24). The static parts are baked (bake.js -> bg/fd21.png, bg/ub21.png,
// bg/bw21.png); the live parts (the rain tree's leaf clusters swaying, the children far off, the grass, the boats and the water, the boards,
// the props, the hidden animal) are drawn every frame on top, in WORLD coordinates (1920 x 1080 at camera 1; cam = [z, cx, cy] as CAM /
// camPt / camOn).
// PART 1: a SCHOOL FIELD in Singapore on Tuesday after school (FD21): the big RAIN TREE at the far LEFT (the field's north: every leaf
// cluster on a twig, on a branch, on the trunk), the white goal in front of it, the school block with its corridors and classroom windows,
// the chain-link fence, the two floodlight poles with the wire between them, the sports shed, the PE equipment trolley, the netball court
// with its two hoops, the red running track, the grass; by the WOODEN BENCH: THE SPIN CHART (a portable whiteboard on wheels) and the two
// grey plastic chairs back to back with the wooden broom handle across them, Basil's bar magnet hanging level from it on a thin string, the
// red end to the LEFT (towards the rain tree) whenever it is at rest. Warm late-afternoon sun from the left, long soft shadows.
// PART 2: PULAU UBIN on Saturday morning: the JETTY (UB21: the deck, the bumboats with tyres on their sides, the jetty pillars, THE TRAIL
// MAP on its wooden signboard at the right, the sea, the ships at anchor, the mangroves and the coastal path) and the BOARDWALK over the
// shore (BW21: the wooden boardwalk on posts, its ladder, the seagrass in the clear shallows, rocks, the mangroves' edge).

/* ================================================================ THE SCHOOL FIELD ================================================================ */
const FD = { hz: 448, goal: [600, 800, 478, 398], lights: [1080, 1540], wire: [1080, 1540, 118, 150], fence: [760, 2120, 362, 452], shed: [1610, 1960, 330, 508],
  hoops: [[1420, 604, 384, .7], [1880, 660, 336, 1]], trolley: [1530, 520], bench: [720, 842, .78], chairs: [900, 1460, 832], broom: [950, 1410, 500], hang: [1180, 500], L: 150, chart: [300, 590] };
const HANG = [FD.hang[0], FD.hang[1] + FD.L];   // the hanging magnet's middle (world)
const CONES = [[1080, 872], [1280, 872]];
BG.fd21 = () => { const hz = FD.hz; let s = `<rect x="-200" y="-120" width="2320" height="${hz + 130}" fill="url(#fdSky)"/><circle cx="-80" cy="150" r="760" fill="url(#sunGlow)"/>`;
  // soft clouds; the far HDB blocks behind the school (pale, hazy)
  s += [[520, 120, 120], [980, 70, 90], [1500, 150, 140], [1880, 90, 100]].map(([x, y, r]) => `<g opacity=".85"><ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r * .28}" fill="#fff"/><ellipse cx="${x - r * .35}" cy="${y - r * .14}" rx="${r * .5}" ry="${r * .26}" fill="#fff"/><ellipse cx="${x + r * .3}" cy="${y - r * .1}" rx="${r * .45}" ry="${r * .22}" fill="#FFF8EC"/></g>`).join("");
  for (let i = 0; i < 7; i++) { const x = 820 + i * 190, w = 120, h = 150 + 60 * hash(i, 3); s += `<rect x="${x}" y="${n2(230 - h)}" width="${w}" height="${n2(h)}" fill="#C9D6E2" opacity=".8"/>` + [...Array(Math.floor(h / 24))].map((_, j) => `<path d="M${x + 8} ${n2(238 - h + j * 24)} H${x + w - 8}" stroke="#AFC0D0" stroke-width="5" opacity=".7"/>`).join(""); }
  // the school block: four floors of corridors (railings) with classroom doors and windows; a red-brown roof edge
  s += `<rect x="780" y="196" width="1360" height="${hz - 196}" fill="#F2E4C8"/><rect x="770" y="184" width="1380" height="18" fill="#B5523A"/>`;
  for (let f = 0; f < 4; f++) { const y = 206 + f * 60; s += `<rect x="780" y="${y + 38}" width="1360" height="8" fill="#D9C7A4"/><rect x="780" y="${y + 24}" width="1360" height="6" fill="#3E7FA8"/>`
    + [...Array(19)].map((_, i) => `<rect x="${800 + i * 70}" y="${y + 4}" width="${i % 3 === 1 ? 22 : 40}" height="${i % 3 === 1 ? 34 : 18}" rx="2" fill="${i % 3 === 1 ? "#8A6A4A" : "#9FC4DA"}" stroke="#7A8A96" stroke-width="2"/>`).join("") + [...Array(46)].map((_, i) => `<path d="M${784 + i * 30} ${y + 24} V${y + 38}" stroke="#3E7FA8" stroke-width="2.5"/>`).join(""); }
  // the floodlight poles and the wire between them (the swallow's first perch)
  const [l0, l1] = FD.lights, [wx0, wx1, wy, wy2] = FD.wire;
  for (const x of [l0, l1]) s += `<path d="M${x} ${hz + 8} V96" stroke="#8A949E" stroke-width="16"/><path d="M${x} ${hz + 8} V96" stroke="#B8C0C8" stroke-width="6"/><rect x="${x - 56}" y="62" width="112" height="44" rx="6" fill="#5A6270" stroke="#3A4250" stroke-width="4"/>`
    + [0, 1, 2, 3].map((i) => `<rect x="${x - 48 + i * 25}" y="68" width="20" height="14" rx="3" fill="#E8EEF2"/><rect x="${x - 48 + i * 25}" y="86" width="20" height="14" rx="3" fill="#E8EEF2"/>`).join("");
  s += `<path d="M${wx0} ${wy} Q${(wx0 + wx1) / 2} ${wy2 + 16} ${wx1} ${wy}" stroke="#4A4E5A" stroke-width="4" fill="none"/>`;
  // the chain-link fence along the far edge (posts, a top rail, the diamond mesh)
  const [fx0, fx1, fy0, fy1] = FD.fence; s += `<g opacity=".85"><path d="M${fx0} ${fy0} H${fx1}" stroke="#8A949E" stroke-width="7"/>`;
  for (let x = fx0; x <= fx1; x += 22) s += `<path d="M${x} ${fy0} L${x + 44} ${fy1} M${x + 44} ${fy0} L${x} ${fy1}" stroke="#A8B0BA" stroke-width="1.6"/>`;
  for (let x = fx0; x <= fx1; x += 150) s += `<path d="M${x} ${fy0 - 4} V${fy1}" stroke="#7A848E" stroke-width="8"/>`; s += `</g>`;
  // the sports shed (in front of the fence, right): cream walls, a green roller door, a dark green roof with an overhang
  const [sx0, sx1, sy0, sy1] = FD.shed; s += `<rect x="${sx0}" y="${sy0}" width="${sx1 - sx0}" height="${sy1 - sy0}" fill="#EFE2C6" stroke="#B8A882" stroke-width="4"/><rect x="${sx0 + 60}" y="${sy0 + 50}" width="150" height="${sy1 - sy0 - 50}" fill="#5E8E62" stroke="#3E6A44" stroke-width="4"/>`
    + [...Array(8)].map((_, i) => `<path d="M${sx0 + 60} ${sy0 + 64 + i * 16} H${sx0 + 210}" stroke="#3E6A44" stroke-width="2"/>`).join("") + `<path d="M${sx0 - 20} ${sy0 - 10} H${sx1 + 20} L${sx1 + 6} ${sy0 + 8} H${sx0 - 6}z" fill="#3E6A50" stroke="#2A4A36" stroke-width="4"/>` + T(sx0 + 270, sy0 + 100, "SPORTS", 28, "#8A6A3A", { w: 600 });
  // the red running track (lane lines), then the grass with its mowing stripes
  s += `<rect x="-200" y="${hz - 4}" width="2320" height="${1200 - hz}" fill="url(#fdGrass)"/>`;
  for (const [a, b, o] of [[540, 610, .1], [700, 800, .09], [900, 1020, .08], [1110, 1200, .07]]) s += `<rect x="-200" y="${a}" width="2320" height="${b - a}" fill="#fff" opacity="${o}"/>`;
  s += `<rect x="-200" y="${hz + 2}" width="2320" height="52" fill="url(#fdTrack)"/>` + [12, 25, 38].map((d) => `<path d="M-200 ${hz + 2 + d} H2120" stroke="#fff" stroke-width="2" opacity=".75"/>`).join("") + `<path d="M-200 ${hz + 54} H2120" stroke="#fff" stroke-width="3"/>`;
  // the netball court (right): a green-grey court with white lines; the two hoops are live (the swallow sits on one)
  s += `<path d="M1330 512 H2120 V650 H1250z" fill="#7E9E8A"/><path d="M1350 520 H2110 M1290 640 H2110 M1720 520 L1700 640 M1350 520 L1290 640" stroke="#fff" stroke-width="4" fill="none" opacity=".85"/><ellipse cx="1710" cy="580" rx="60" ry="18" fill="none" stroke="#fff" stroke-width="4" opacity=".85"/>`;
  // long soft shadows across the grass from the left (the low sun)
  s += `<path d="M560 830 L1100 870 L1100 900 L560 860z" fill="${P.ink}" opacity=".06"/>`;
  return s; };
// the RAIN TREE (live: its leaf clusters sway a little). Every leaf cluster sits at the end of a twig, on a branch, on the trunk; the crown is
// a wide umbrella of clusters. The low sun lights its left edge. o.k scales it about the trunk's base
const RT_B = [[-60, 236, 140, 250], [70, 160, 170, 210], [210, 104, 270, 180], [380, 112, 330, 190], [520, 160, 400, 220], [640, 236, 450, 260], [300, 70, 300, 200]];
const RT_TW = [[-30, -40], [40, -30], [-50, 20], [50, 26], [0, -60]];
function rainTree(t, k = 1) { const bx = 300, by = 452, sp = 330; let wood = `<path d="M${bx - 34} ${by} Q${bx - 20} ${sp + 40} ${bx - 8} ${sp} L${bx + 14} ${sp} Q${bx + 24} ${sp + 40} ${bx + 40} ${by}z" fill="#6A4A2E" stroke="#4A3220" stroke-width="4"/>`, leaves = "";
  RT_B.forEach(([ex, ey, cx, cy], i) => { wood += `<path d="M${bx} ${sp + 6} Q${cx} ${cy} ${ex} ${ey}" stroke="#5A3E26" stroke-width="${i === 6 ? 16 : 13}" fill="none" stroke-linecap="round"/>`;
    RT_TW.slice(0, i === 6 ? 5 : 4).forEach(([dx, dy], j) => { const tx = ex + dx, ty = ey + dy, a = 1.6 * Math.sin(t * .8 + i * 1.7 + j), id = i * 5 + j;
      wood += `<path d="M${ex} ${ey} L${tx} ${ty}" stroke="#5A3E26" stroke-width="6" stroke-linecap="round"/>`;
      let cl = ""; for (let q = 0; q < 6; q++) { const ang = q * 1.05 + hash(id, q), r = 30 + 14 * hash(id + q, 7), d = q ? 36 : 0; cl += `<circle cx="${n2(Math.cos(ang) * d)}" cy="${n2(Math.sin(ang) * d * .6 - 10)}" r="${n2(r)}" fill="${q % 2 ? "#3F8A3E" : "#4E9C46"}"/>`; }
      cl += `<circle cx="-26" cy="-26" r="22" fill="#7CC05A" opacity=".8"/><circle cx="-34" cy="-6" r="14" fill="#A6D86A" opacity=".55"/>` + [0, 1, 2, 3].map((q) => `<path d="M${n2(-30 + q * 18)} ${n2(-8 + 8 * hash(id, q))} q6 -6 12 0" stroke="#2E6A2E" stroke-width="2.5" fill="none" opacity=".6"/>`).join("");
      leaves += `<g transform="translate(${tx} ${ty}) rotate(${n2(a)})">${cl}</g>`; }); });
  return TF(bx, by, k, `<g transform="translate(${-bx} ${-by})"><ellipse cx="${bx + 40}" cy="${by + 6}" rx="300" ry="20" fill="#3E7A30" opacity=".35"/>${wood}${leaves}</g>`); }
// the white goal in front of the rain tree (painted steel posts, the crossbar, the net)
const goal21 = () => { const [x0, x1, y, yt] = FD.goal; let net = ""; for (let x = x0 + 14; x < x1; x += 18) net += `<path d="M${x} ${yt + 6} L${x + 20} ${y - 8}" stroke="#fff" stroke-width="1.4" opacity=".55"/>`; for (let yy = yt + 14; yy < y; yy += 16) net += `<path d="M${x0 + 6} ${yy} H${x1 - 6}" stroke="#fff" stroke-width="1.4" opacity=".5"/>`;
  return net + `<path d="M${x0} ${y} V${yt} H${x1} V${y}" fill="none" stroke="#C9CED6" stroke-width="12"/><path d="M${x0} ${y} V${yt} H${x1} V${y}" fill="none" stroke="#FFFFFF" stroke-width="7"/>`; };
// a netball hoop (a post, an arm, the ring, the net); k = its size (the far one smaller)
const hoop21 = (x, base, ry, k = 1) => `<path d="M${x} ${base} V${ry - 10 * k}" stroke="#6E7884" stroke-width="${12 * k}"/><path d="M${x} ${ry - 4 * k} H${x - 30 * k}" stroke="#6E7884" stroke-width="${8 * k}"/>`
  + `<path d="M${x - 64 * k} ${ry} L${x - 56 * k} ${ry + 50 * k} H${x - 28 * k} L${x - 20 * k} ${ry}" fill="none" stroke="#fff" stroke-width="${2.5 * k}" opacity=".85"/><path d="M${x - 58 * k} ${ry + 16 * k} H${x - 26 * k} M${x - 57 * k} ${ry + 32 * k} H${x - 27 * k}" stroke="#fff" stroke-width="${2 * k}" opacity=".7"/>`
  + `<ellipse cx="${x - 42 * k}" cy="${ry}" rx="${24 * k}" ry="${7 * k}" fill="none" stroke="#E0702A" stroke-width="${5 * k}"/>`;
// the PE equipment trolley by the shed: a wire cage of balls on wheels, its handle on the left
const trolley21 = () => { const [x, y] = FD.trolley; return `<ellipse cx="${x + 50}" cy="${y + 4}" rx="90" ry="10" fill="${P.ink}" opacity=".2"/><rect x="${x}" y="${y - 96}" width="110" height="80" rx="6" fill="none" stroke="#8A949E" stroke-width="5"/>`
  + [[20, -40, "#E0453A"], [50, -36, "#F5B700"], [80, -42, "#3A8DFF"], [34, -66, "#FFFFFF"], [66, -70, "#F28C28"]].map(([dx, dy, c]) => `<circle cx="${x + dx}" cy="${y + dy}" r="17" fill="${c}" stroke="#5A6270" stroke-width="2"/>`).join("")
  + [0, 1, 2, 3].map((i) => `<path d="M${x + 22 * i + 10} ${y - 96} V${y - 16}" stroke="#A8B0BA" stroke-width="2"/>`).join("") + `<path d="M${x} ${y - 90} L${x - 36} ${y - 104}" stroke="#6E7884" stroke-width="6" stroke-linecap="round"/>`
  + `<circle cx="${x + 14}" cy="${y - 6}" r="9" fill="#3A3E4A"/><circle cx="${x + 96}" cy="${y - 6}" r="9" fill="#3A3E4A"/>`; };
const TROLLEY_H = [FD.trolley[0] - 36, FD.trolley[1] - 106];   // the top of its handle (a swallow's perch)
// children far off by the far goal: two small, out-of-focus figures passing a ball (once in a while a kick)
const kids21 = (t) => { const ph = t * .5, bx = 780 + 120 * Math.sin(ph * 1.3), by = 470 - Math.abs(Math.sin(t * 3.2)) * 18;
  const kid = (x, sh, sk, run) => `<g transform="translate(${x} 478)"><rect x="-9" y="-46" width="18" height="24" rx="6" fill="${sh}"/><rect x="-8" y="-24" width="16" height="12" rx="3" fill="${sk}"/><path d="M-4 -12 L${n2(-6 + 6 * run)} 0 M4 -12 L${n2(6 - 6 * run)} 0" stroke="#F2C29B" stroke-width="5" stroke-linecap="round"/><circle cy="-56" r="10" fill="#F2C29B"/><path d="M-10 -60 Q0 -72 10 -60z" fill="#2A1E16"/></g>`;
  return `<g filter="url(#b2)" opacity=".85">${kid(660, "#FFFFFF", "#3A56A8", Math.sin(t * 9))}${kid(900, "#FFD23A", "#2E6A44", Math.sin(t * 9 + 1))}<circle cx="${n2(bx)}" cy="${n2(by)}" r="7" fill="#fff" stroke="#2B2147" stroke-width="2"/></g>`; };
// grass tufts in the foreground, stirring in the breeze
const tufts21 = (t, n = 14) => { let s = ""; for (let i = 0; i < n; i++) { const x = -100 + i * 150 + 60 * hash(i, 4), y = 900 + 260 * hash(i, 6), w = 3 * Math.sin(t * 1.4 + i);
  s += `<path d="M${n2(x - 12)} ${n2(y)} q${n2(-6 + w)} -24 ${n2(-10 + w * 1.6)} -38 M${n2(x)} ${n2(y)} q${n2(w)} -30 ${n2(2 + w * 2)} -46 M${n2(x + 12)} ${n2(y)} q${n2(6 + w)} -22 ${n2(12 + w * 1.6)} -34" stroke="#4E9A3E" stroke-width="5" fill="none" stroke-linecap="round"/>`; } return s; };

/* the hidden SWALLOW's spots in the field [x, y, k, o] (SCENES_TODO rule 8): INTRO = the wire between the floodlight poles (cold .. game:
   never used again); then a NEW fair spot in every scene: the edge of the sports shed's roof (waitw), the top of the chain-link fence
   (answer), the goalpost's crossbar (goal), the handle of the PE equipment trolley (holdon), the top edge of THE SPIN CHART's frame (earthq);
   the REVEAL: the rim of the near netball hoop (liz) */
const WIREMID = [(FD.wire[0] + FD.wire[1]) / 2, (FD.wire[2] + FD.wire[3] + 16) / 2 + 3];
const SWAT = { intro: [WIREMID[0], WIREMID[1], .2, {}], waitw: [1700, FD.shed[2] - 12, .22, { look: -1 }], answer: [1000, FD.fence[2] - 2, .2, {}], goal: [730, FD.goal[3] - 5, .2, { look: -1 }],
  holdon: [TROLLEY_H[0] + 2, TROLLEY_H[1] - 2, .2, {}], earthq: [430, 362, .22, { look: -1 }], liz: [FD.hoops[1][0] - 42, FD.hoops[1][2] - 5, .24, { look: -1 }] };
['cold', 'back', 'title', 'today', 'game'].forEach((k) => { SWAT[k] = SWAT.intro; });
// FD21: the live school field. o: tree (true), chart (THE SPIN CHART at home: its own options), rig (the chairs, the broom handle and the
// hanging magnet: { a } its turn now, or false), cones (true after `cones`), bench (props on the bench, world coords), front (in front of
// everything), swallow (a SWAT entry | false; default the scene's own), dim
function FD21(t, o = {}, cam) { const sc = (window._S || {}).name, sw = o.swallow === undefined ? SWAT[sc] : o.swallow;
  let s = bg("fd21") + rainTree(t) + goal21() + kids21(t) + FD.hoops.map(([x, b, r, k]) => hoop21(x, b, r, k)).join("") + trolley21();
  // the wooden bench and THE SPIN CHART at its home (left)
  s += TF(FD.bench[0], FD.bench[1], FD.bench[2], bench21(420)) + (o.bench || "");
  if (o.chart !== false) s += spinChart21(t, FD.chart[0], FD.chart[1], 1, o.chart || {});
  if (sw) s += swallowAt(t, sw[0], sw[1], sw[2], sw[3]);
  // the two plastic chairs back to back, the broom handle across them, the magnet hanging from it, the cones under its ends
  if (o.rig !== false) { const [c0, c1, cy] = FD.chairs, [b0, b1, by] = FD.broom; s += TF(c0, cy, 1, chair21(1)) + TF(c1, cy, 1, chair21(-1)) + broom21(b0, b1, by);
    if (o.rig === undefined || o.rig.a !== undefined) s += TF(FD.hang[0], FD.hang[1], 1, hangMag21(t, o.rig ? o.rig.a : 0, FD.L, .8)) + `<ellipse cx="${FD.hang[0]}" cy="${CONES[0][1] - 4}" rx="90" ry="10" fill="${P.ink}" opacity=".12" filter="url(#b4)"/>`; }
  if (o.cones) s += CONES.map(([x, y], i) => TF(x, y, .62 * (o.cones === true ? 1 : o.cones[i]), cone21())).join("") + (o.coneLine ? nsLine(t, o.coneLine, CONES[0][0], CONES[0][1] - 30, CONES[1][0], CONES[1][1] - 30, 24) : "");
  s += tufts21(t) + (o.front || "");
  if (o.dim) s += `<rect x="-200" y="-120" width="2320" height="1320" fill="${P.night}" opacity="${n2(o.dim)}"/>`;
  return cam ? CAM(s, cam[0], cam[1], cam[2]) : s; }

/* THE SPIN CHART (Part 1's build; its HOME: the grass by the wooden bench, left of frame): a portable whiteboard on a metal frame with four
   wheels, THE SPIN CHART written in blue marker, three rows Spin 1 · Spin 2 · Spin 3 (a little magnet on a string drawn in each, an empty
   box). Fills: an arrow in each box, all the same way, and "the same way every time!" (chart1); the rows are WIPED (they fade out completely)
   and rewritten "the field" · "the classroom" · "the basin", each with the same arrow, and the dashed gold N – S line beside them (nsline);
   a small Earth at the bottom with "Why? Earth behaves like a magnet" (chartEarth). Once filled, a part stays filled. Origin = the board's
   centre; o.all = everything filled (a card), o.note = Basil's note card on the tray */
function spinChart21(t, x, y, k = 1, o = {}) { const f = (m) => o.all ? 1 : ss(MKS(m) - .1, MKS(m) + .4, t), on = (m) => o.all || t >= MKS(m), wipe = o.all ? 1 : ss(MKS("nsline") - .6, MKS("nsline") - .1, t), BW = 520, BH = 420;
  let s = `<ellipse cx="0" cy="318" rx="250" ry="16" fill="${P.ink}" opacity=".2" filter="url(#b4)"/><path d="M-230 ${BH / 2} L-250 300 M230 ${BH / 2} L250 300 M-250 300 H250" stroke="#7A848E" stroke-width="10" stroke-linecap="round"/>`
    + [-250, -150, 150, 250].map((wx) => `<circle cx="${wx}" cy="306" r="13" fill="#2E323C"/>`).join("")
    + `<g filter="url(#dropS)"><rect x="${-BW / 2 - 14}" y="${-BH / 2 - 14}" width="${BW + 28}" height="${BH + 28}" rx="12" fill="#B8C0C8"/></g><rect x="${-BW / 2}" y="${-BH / 2}" width="${BW}" height="${BH}" rx="4" fill="#FDFEFE"/>`
    + `<path d="M${-BW / 2 + 40} ${-BH / 2 + 30} L${-BW / 2 + 130} ${-BH / 2 + 120}" stroke="#EEF2F6" stroke-width="26"/><rect x="-140" y="${BH / 2 + 10}" width="280" height="14" rx="5" fill="#A8B0BA"/><rect x="-120" y="${BH / 2 + 2}" width="46" height="10" rx="4" fill="#2B5FC4"/>`
    + T(0, -BH / 2 + 54, "THE SPIN CHART", 42, "#2B5FC4", { ls: 3 }) + `<path d="M-190 ${-BH / 2 + 68} H190" stroke="#2B5FC4" stroke-width="4"/>`;
  const arrow = (ax, ay, kk = 1) => TF(ax, ay, kk, `<path d="M58 0 H-46 M-24 -20 L-50 0 L-24 20" stroke="${NORTHC}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`);   // pointing LEFT: the red end's way (to the rain tree)
  ["Spin 1", "Spin 2", "Spin 3"].forEach((r, i) => { const ry = -98 + i * 82; s += OP(1 - wipe, T(-176, ry + 12, r, 32, P.ink) + TF(-70, ry + 6, .9, miniMag(i * 50 + 20, 22)) + `<rect x="10" y="${ry - 32}" width="200" height="64" rx="10" fill="none" stroke="${P.ink}" stroke-width="4"/>` + (on("chart1") ? OP(f("chart1"), arrow(110, ry)) : "")); });
  if (on("chart1")) s += OP(f("chart1") * (1 - wipe), T(0, 156, "the same way every time!", 30, NORTHC, { w: 700 }));
  if (on("nsline")) { const re = f("nsline"); ["the field", "the classroom", "the basin"].forEach((r, i) => { const ry = -98 + i * 82; s += OP(re, T(-110, ry + 12, r, 32, P.ink) + arrow(76, ry, .8)); }); s += o.all ? nsLine(99, 0, 176, -110, 176, 70, 26) : nsLine(t, MKS("nsline"), 176, -110, 176, 70, 26); }
  if (on("chartEarth")) s += OP(f("chartEarth"), `<circle cx="-196" cy="148" r="38" fill="#3F7FD0" stroke="${P.ink}" stroke-width="3"/><path d="M-214 128 q18 -10 28 4 q8 16 -8 28 q-18 2 -20 -32z M-190 168 q14 -4 18 8 q-8 8 -18 -8z" fill="#5FAE5A"/>` + T(30, 142, "Why? Earth behaves", 27, P.ink, { w: 700 }) + T(30, 174, "like a magnet", 27, P.ink, { w: 700 }));
  if (o.note) s += TF(196, BH / 2 + 6, 1, `<g transform="rotate(-4)"><g filter="url(#dropS)"><rect x="-120" y="-86" width="240" height="96" rx="8" fill="#FFF6B8"/></g>${T(0, -50, "On the bench:", 24, P.ink, { w: 700 })}${T(0, -20, "a different way", 24, P.ink, { w: 700 })}${T(0, 4, "every time!", 24, P.ink, { w: 700 })}</g>`);
  return TF(x, y, k, s); }

/* ================================================================ PULAU UBIN: THE JETTY ================================================================ */
const UB = { hz: 400, arm: [300, 1250, 590], deck: 862, map: [1600, 520], mk: .88, ledge: [1600, 520 + 257 * .88], boat1: [560, 812], boat2: [1060, 742] };
// a far container ship at anchor (a dark hull, a white bridge at the back, rows of coloured boxes); origin = its waterline middle
const shipFar = (k = 1, ph = 0) => TF(0, 0, k, `<path d="M-160 0 L-150 -26 H170 L150 0z" fill="#5A4A52"/><rect x="100" y="-66" width="44" height="40" fill="#EDEFF2"/><rect x="106" y="-60" width="32" height="6" fill="#7A8A9A"/>`
  + [...Array(10)].map((_, i) => `<rect x="${-140 + i * 24}" y="${-26 - 14 * (1 + (i * 7 + ph) % 3)}" width="22" height="${14 * (1 + (i * 7 + ph) % 3)}" fill="${["#C9573E", "#3E7FA8", "#E8B020", "#5E8E62", "#8A6AB0"][(i + ph) % 5]}"/>`).join("") + `<path d="M120 -66 V-90" stroke="#5A4A52" stroke-width="4"/>`);
// a mangrove tree on the shore: a short trunk on arching PROP ROOTS that go into the mud; every leaf cluster on a twig on a branch
const mangrove21 = (t, k = 1, ph = 0) => { let s = [-70, -40, -12, 16, 44, 72].map((x) => `<path d="M${x * .3} -60 Q${x * .8} -40 ${x} 0" stroke="#5E4630" stroke-width="7" fill="none"/>`).join("") + `<path d="M-10 -60 L-8 -150 M10 -60 L8 -150" stroke="#5E4630" stroke-width="10"/>`;
  const B = [[-90, -190], [-40, -230], [20, -236], [80, -200], [0, -160]]; let lv = "";
  B.forEach(([bx, by], i) => { s += `<path d="M0 -150 Q${bx * .4} ${by + 30} ${bx} ${by}" stroke="#5E4630" stroke-width="7" fill="none"/>`; [[-26, -14], [24, -18], [0, -34]].forEach(([dx, dy], j) => { const a = 2 * Math.sin(t * .9 + i + j + ph);
    s += `<path d="M${bx} ${by} L${bx + dx} ${by + dy}" stroke="#5E4630" stroke-width="4"/>`; lv += `<g transform="translate(${bx + dx} ${by + dy}) rotate(${n2(a)})"><circle r="30" fill="#2E6E3A"/><circle cx="-12" cy="-10" r="20" fill="#3E8A46"/><circle cx="12" cy="-4" r="18" fill="#357C40"/><circle cx="-8" cy="-16" r="10" fill="#6AB060" opacity=".7"/></g>`; }); });
  return TF(0, 0, k, s + lv); };
// a grey heron far off on the mud (out of focus): it stands, then dips its bill now and then
const heron21 = (t) => { const d = Math.max(0, Math.sin(t * .6)) > .9 ? 14 : 0; return `<g filter="url(#b2)" opacity=".9"><path d="M-4 0 V-30 M6 0 V-30" stroke="#8A8A8A" stroke-width="3"/><ellipse cx="0" cy="-42" rx="20" ry="14" fill="#9EA6B0"/><path d="M10 -50 Q18 -70 ${14} ${-80 + d}" stroke="#C8CED6" stroke-width="7" fill="none" stroke-linecap="round"/><path d="M14 ${-80 + d} l18 ${4 + d * .4}" stroke="#E8B020" stroke-width="4" stroke-linecap="round"/></g>`; };
// a bumboat (a small wooden motor boat, painted, a roof over the seats, old tyres hung on its sides as bumpers); it bobs; origin = waterline middle
const bumboat21 = (t, k = 1, ph = 0) => { const b = 5 * Math.sin(t * 1.4 + ph), r = 1.2 * Math.sin(t * 1.1 + ph);
  return `<g transform="translate(0 ${n2(b)}) rotate(${n2(r)})">` + TF(0, 0, k, `<path d="M-250 -70 H230 Q280 -70 290 -100 L270 -40 Q240 10 -230 10 Q-260 -20 -250 -70z" fill="#F4F2EC" stroke="#3A4A5A" stroke-width="6"/><path d="M-250 -40 H280" stroke="#2E7A9A" stroke-width="18"/><path d="M-240 -8 H250" stroke="#C9573E" stroke-width="8"/>`
    + `<path d="M-170 -70 V-170 M150 -70 V-170" stroke="#6A5A4A" stroke-width="8"/><path d="M-200 -170 H180 L160 -196 H-180z" fill="#3E8A9A" stroke="#245A66" stroke-width="5"/>` + [-120, -50, 20, 90].map((x) => `<rect x="${x}" y="-110" width="50" height="40" rx="6" fill="#C9925A" stroke="#7A4A22" stroke-width="3"/>`).join("")
    + [-180, -40, 100, 220].map((x) => `<ellipse cx="${x}" cy="-30" rx="26" ry="30" fill="#2A2A2E" stroke="#111" stroke-width="4"/><ellipse cx="${x}" cy="-30" rx="12" ry="15" fill="#5A5A60"/><path d="M${x} -60 V-74" stroke="#8A7A5A" stroke-width="3"/>`).join("")
    + `<rect x="-270" y="-120" width="40" height="60" rx="6" fill="#3A3E4A"/>`) + `</g>` + TF(0, 8, k, `<ellipse cx="0" cy="0" rx="290" ry="14" fill="#fff" opacity=".22"/>`); };
BG.ub21 = () => { const hz = UB.hz; let s = `<rect x="-200" y="-120" width="2320" height="${hz + 130}" fill="url(#ubSky)"/><circle cx="2020" cy="-60" r="700" fill="url(#sunGlow)"/>`;
  s += [[300, 110, 150], [820, 60, 110], [1300, 140, 120], [1700, 70, 90]].map(([x, y, r]) => `<g opacity=".95"><ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r * .3}" fill="#fff"/><ellipse cx="${x - r * .3}" cy="${y - r * .16}" rx="${r * .5}" ry="${r * .3}" fill="#fff"/><ellipse cx="${x + r * .35}" cy="${y - r * .1}" rx="${r * .4}" ry="${r * .24}" fill="#F4FAFF"/></g>`).join("");
  s += `<rect x="-200" y="${hz}" width="2320" height="${1200 - hz}" fill="url(#ubSea)"/>`;
  // ships at anchor on the horizon; the far mainland haze
  s += `<path d="M700 ${hz} Q1300 ${hz - 18} 2120 ${hz - 6} V${hz}z" fill="#9FB8C8" opacity=".6"/>` + [[820, .5, 0], [1080, .38, 2], [1380, .55, 4], [1700, .42, 1]].map(([x, k, p]) => TF(x, hz + 2, k, shipFar(1, p))).join("");
  // the shore at the left: the mud, the coastal path behind a low railing; the mangroves are live (their clusters sway)
  s += `<path d="M-200 ${hz - 40} Q300 ${hz - 60} 720 ${hz + 30} Q760 ${hz + 70} 700 ${hz + 96} L-200 ${hz + 110}z" fill="#8A7A5A"/><path d="M-200 ${hz - 44} Q300 ${hz - 66} 700 ${hz + 20}" stroke="#E2D2A8" stroke-width="12" fill="none"/><path d="M-200 ${hz - 60} Q300 ${hz - 82} 700 ${hz + 4}" stroke="#7A5A3A" stroke-width="4" fill="none"/>`;
  // glints on the water
  for (let i = 0; i < 50; i++) { const x = hash(i, 3) * 2300 - 200, y = hz + 20 + Math.pow(hash(i, 5), 1.5) * 760; s += `<path d="M${n2(x)} ${n2(y)} h${n2(20 + 40 * hash(i, 7))}" stroke="#fff" stroke-width="${n2(2 + 3 * (y - hz) / 760)}" opacity=".45" stroke-linecap="round"/>`; }
  // the far arm of the jetty: its deck seen from the side, the concrete pillars down into the water
  const [a0, a1, ay] = UB.arm; s += `<rect x="${a0}" y="${ay}" width="${a1 - a0}" height="18" fill="#B8A88A" stroke="#7A6A4A" stroke-width="3"/><path d="M${a0} ${ay - 20} H${a1}" stroke="#E8E2D2" stroke-width="5"/>` + [...Array(14)].map((_, i) => `<path d="M${a0 + i * 72} ${ay - 20} V${ay}" stroke="#E8E2D2" stroke-width="4"/>`).join("")
    + [...Array(14)].map((_, i) => `<rect x="${a0 + 8 + i * 72}" y="${ay + 18}" width="20" height="62" fill="#A8A498" stroke="#6A665A" stroke-width="3"/><ellipse cx="${a0 + 18 + i * 72}" cy="${ay + 80}" rx="18" ry="5" fill="#fff" opacity=".35"/>`).join("");
  // OUR DECK: the end platform of the jetty (planks running across), a low edge with bollards, under the camera
  const dk = UB.deck; s += `<path d="M-200 ${dk} H2120 V1200 H-200z" fill="url(#ubDeck)"/><path d="M-200 ${dk} H2120" stroke="#6A4A2A" stroke-width="10"/><rect x="-200" y="${dk - 18}" width="2320" height="14" fill="#9A9488" stroke="#6A665A" stroke-width="3"/>`;
  for (let y = dk + 30, g = 26; y < 1200; y += g, g *= 1.18) s += `<path d="M-200 ${n2(y)} H2120" stroke="#8A6236" stroke-width="${n2(2 + g / 14)}" opacity=".7"/>`;
  for (let i = -6; i <= 16; i++) s += `<path d="M${960 + i * 110} ${dk} L${960 + i * 190} 1200" stroke="#9A6E3E" stroke-width="2" opacity=".35"/>`;
  s += [180, 1180].map((x) => `<rect x="${x - 26}" y="${dk - 56}" width="52" height="50" rx="10" fill="#3A3E4A"/><ellipse cx="${x}" cy="${dk - 56}" rx="34" ry="10" fill="#4A4E5A"/>`).join("");
  s += `<path d="M1200 ${dk} L1800 1200 H2120 V${dk}z" fill="#FFF6D8" opacity=".12"/>`;
  return s; };
/* the hidden TURTLE's spots on the jetty [x, y, k, o] (SCENES_TODO rule 8): INTRO = beside a jetty pillar of the far arm (jetty .. game: never
   used again); then an orange buoy near a bumboat (waitw), among the mangrove roots at the water's edge (r1ans), beside a rock in the shallows
   below THE TRAIL MAP (trail). The boardwalk's spots are in BWAT. */
const TTAT = { intro: [UB.arm[0] + 18 + 6 * 72 + 30, UB.arm[2] + 82, .16, {}], waitw: [1300, 712, .2, { look: -1 }], r1ans: [620, UB.hz + 92, .14, {}], trail: [1250, UB.deck - 26, .2, { look: -1 }] };
['jetty', 'game'].forEach((k) => { TTAT[k] = TTAT.intro; });
// UB21: the live jetty. o: map (THE TRAIL MAP's options, or false), ledge (props on the map's wooden ledge), boats (true), turtle (a TTAT entry
// | false; default the scene's own), deck (props on our deck, world coordinates), front, dim
function UB21(t, o = {}, cam) { const sc = (window._S || {}).name, tt = o.turtle === undefined ? TTAT[sc] : o.turtle;
  let s = bg("ub21") + [[-120, 470, .95, 0], [60, 455, .8, 1], [230, 450, .9, 2], [420, 465, .75, 3], [-30, 380, .6, 4], [560, 470, .6, 5]].map(([x, y, k, p]) => TF(x, y, k, mangrove21(t, 1, p))).join("") + TF(500, UB.hz + 86, .7, heron21(t));
  // the orange buoy near the second boat; the waves' soft moving glints
  s += `<g transform="translate(1300 ${n2(724 + 4 * Math.sin(t * 1.7))})"><ellipse cx="0" cy="0" rx="26" ry="20" fill="#F28C28" stroke="#9A4A10" stroke-width="4"/><path d="M-24 -2 H24" stroke="#fff" stroke-width="6"/><ellipse cx="0" cy="18" rx="40" ry="6" fill="#fff" opacity=".3"/></g>`;
  for (let i = 0; i < 18; i++) { const x = (hash(i, 9) * 2300 + t * (20 + 14 * hash(i, 2))) % 2300 - 200, y = UB.hz + 40 + hash(i, 4) * 400; s += `<path d="M${n2(x)} ${n2(y)} q14 -6 28 0" stroke="#fff" stroke-width="3" fill="none" opacity="${n2(.3 + .3 * Math.sin(t * 2 + i))}"/>`; }
  if (tt && tt[1] < UB.deck - 40) s += turtleAt(t, tt[0], tt[1], tt[2], tt[3]);
  if (o.boats !== false) s += TF(UB.boat2[0], UB.boat2[1], .48, bumboat21(t, 1, 1)) + TF(UB.boat1[0], UB.boat1[1], .72, bumboat21(t, 1, 0));
  if (tt && tt[1] >= UB.deck - 40) s += turtleAt(t, tt[0], tt[1], tt[2], tt[3]);
  if (o.map !== false) s += trailMap21(t, UB.map[0], UB.map[1], UB.mk, o.map || {}) + (o.ledge || "");
  s += (o.deck || "") + (o.front || "");
  if (o.dim) s += `<rect x="-200" y="-120" width="2320" height="1320" fill="${P.night}" opacity="${n2(o.dim)}"/>`;
  return cam ? CAM(s, cam[0], cam[1], cam[2]) : s; }

/* THE TRAIL MAP (Part 2's build and reveal; its HOME: a wooden signboard at the end of the jetty, right of frame): our own hand-drawn map of
   the island (no park logo): the jetty (you are here), the paths, the mangroves, the beach and the boardwalk at the far end, a dotted route,
   and an empty compass rose (a star with four empty boxes). Fills: N in the box the needle's red end points to (up), then E, S, W (rose); the
   dotted route lights up gold with "the beach: this way" (route: the reveal). Origin = the board's centre; o.all = everything filled */
const ROSE21 = [["N", 0, -96], ["E", 96, 0], ["S", 0, 96], ["W", -96, 0]];
function trailMap21(t, x, y, k = 1, o = {}) { const r0 = o.all ? -9 : MKS("rose"), rt = o.all ? -9 : MKS("route"), lit = t >= rt, BW = 600, BH = 470;
  let s = `<ellipse cx="0" cy="${BH / 2 + 196}" rx="300" ry="18" fill="${P.ink}" opacity=".22" filter="url(#b4)"/><path d="M-200 ${BH / 2} V${BH / 2 + 196} M200 ${BH / 2} V${BH / 2 + 196}" stroke="#6A4424" stroke-width="30"/><path d="M-200 ${BH / 2} V${BH / 2 + 196} M200 ${BH / 2} V${BH / 2 + 196}" stroke="#8A5E34" stroke-width="18"/>`
    + `<g filter="url(#dropS)"><rect x="${-BW / 2 - 26}" y="${-BH / 2 - 26}" width="${BW + 52}" height="${BH + 52}" rx="14" fill="#8A5E34" stroke="#5A3A1E" stroke-width="6"/></g><path d="M${-BW / 2 - 30} ${-BH / 2 - 30} L0 ${-BH / 2 - 80} L${BW / 2 + 30} ${-BH / 2 - 30}z" fill="#6A4424" stroke="#4A2E14" stroke-width="6" stroke-linejoin="round"/>`
    + `<rect x="${-BW / 2 - 40}" y="${BH / 2 + 22}" width="${BW + 80}" height="22" rx="6" fill="#A8743E" stroke="#5A3A1E" stroke-width="5"/>`   // the wooden ledge (a compass can lie on it)
    + `<rect x="${-BW / 2}" y="${-BH / 2}" width="${BW}" height="${BH}" rx="6" fill="#F6EBD2"/>`;
  // the island (our own drawing): green land, sea round it, the mangroves along a creek, the beach at the far end, the jetty at the bottom
  s += `<path d="M-286 228 V-180 H286 V228z" fill="#BFE0E6"/>` + T(0, -BH / 2 + 42, "THE TRAIL MAP", 38, "#5A3A1E", { ls: 3 }) + `<path d="M-160 ${-BH / 2 + 54} H160" stroke="#5A3A1E" stroke-width="3"/>` + `<path d="M-130 200 Q-210 140 -170 60 Q-150 -40 -60 -90 Q20 -170 150 -170 Q262 -160 270 -60 Q276 40 220 100 Q150 190 30 210 Q-60 222 -130 200z" fill="#BFDDA0" stroke="#7A9A5A" stroke-width="5"/>`
    + [[-110, 90], [-80, 40], [-30, 120], [40, 150], [120, 120], [200, 40], [-20, -40], [60, -90]].map(([tx, ty]) => `<circle cx="${tx}" cy="${ty}" r="14" fill="#6AA05A"/><circle cx="${tx + 10}" cy="${ty + 6}" r="10" fill="#5A9050"/>`).join("")
    + `<path d="M150 -172 Q240 -168 266 -96" stroke="#F2DCA0" stroke-width="18" fill="none" stroke-linecap="round"/>` + T(210, -196, "the beach", 24, "#5A3A1E", { w: 700 })
    + `<path d="M246 -110 L290 -140" stroke="#8A5E34" stroke-width="8"/>` + `<rect x="-112" y="196" width="30" height="40" fill="#8A5E34"/>` + T(-40, 228, "jetty", 24, "#5A3A1E", { w: 700 }) + `<path d="M-97 190 l10 -14 l10 14z" fill="${NORTHC}"/>`;
  const route = `M-97 186 Q-120 120 -60 80 Q0 50 -10 -10 Q-20 -80 60 -100 Q140 -120 200 -150`;
  s += `<path d="${route}" fill="none" stroke="${lit ? "#E8B020" : "#7A5230"}" stroke-width="${lit ? 14 : 7}" stroke-dasharray="${lit ? "22 10" : "14 12"}" stroke-linecap="round"/>`;
  if (lit) s += `<path d="${route}" fill="none" stroke="#FFF3B8" stroke-width="5" stroke-dasharray="22 10" stroke-linecap="round" opacity="${n2(.5 + .5 * Math.sin(t * 5))}"/>` + TF(190, -100, o.all ? 1 : spring(t, rt + .2, .45), tpill(0, 0, "the beach: this way", 26, "#E8B020", P.ink, { w: 700 }));
  // the compass rose (top left of the map): a star, four boxes; they fill N (the box the needle's red end points to: up), then E, S, W
  let rose = `<circle r="120" fill="#FFF8E6" stroke="#5A3A1E" stroke-width="4"/><path d="M0 -66 L14 -14 L66 0 L14 14 L0 66 L-14 14 L-66 0 L-14 -14z" fill="#fff" stroke="#5A3A1E" stroke-width="4"/><path d="M0 -66 L14 -14 L0 0z M66 0 L14 14 L0 0z M0 66 L-14 14 L0 0z M-66 0 L-14 -14 L0 0z" fill="#C8B490"/>`;
  ROSE21.forEach(([l, rx, ry], i) => { const ti = r0 + .4 * i, on = t >= ti; rose += `<rect x="${rx - 26}" y="${ry - 26}" width="52" height="52" rx="8" fill="${on ? "#fff" : "#EFE2C6"}" stroke="#5A3A1E" stroke-width="4"/>` + (on ? TF(rx, ry, o.all ? 1 : spring(t, ti, .4), T(0, 15, l, 42, l === "N" ? NEEDLEC : "#5A3A1E")) : ""); });
  s += TF(-160, -80, .8, rose);
  return TF(x, y, k, s); }
// where the map's rose and route sit, relative to the board's centre (for lines and push-ins)
const MAP_ROSE = [-160, -80], MAP_N = [-160, -80 - 96 * .8], MAP_ROUTE = [60, -20];

/* ================================================================ PULAU UBIN: THE BOARDWALK ================================================================ */
// the wooden boardwalk on posts runs from the near left out over the shore to the far right; the clear shallows show the sandy floor, rocks
// and the SEAGRASS meadow (every blade grows from the sea floor); the mangroves' edge at the left; the ships on the horizon
const BWK = { hz: 380, near: [[-200, 1010], [760, 1200]], far: [[1440, 540], [1600, 580]], ladder: [1118, 936] };
const bwEdge = (u, side) => { const [n0, n1] = BWK.near, [f0, f1] = BWK.far, a = side ? n1 : n0, b = side ? f1 : f0; return [lerp(a[0], b[0], u), lerp(a[1], b[1], u)]; };
BG.bw21 = () => { const hz = BWK.hz; let s = `<rect x="-200" y="-120" width="2320" height="${hz + 130}" fill="url(#ubSky)"/><circle cx="2020" cy="-60" r="700" fill="url(#sunGlow)"/>`;
  s += [[420, 90, 160], [1000, 140, 120], [1560, 60, 140]].map(([x, y, r]) => `<g opacity=".95"><ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r * .3}" fill="#fff"/><ellipse cx="${x - r * .3}" cy="${y - r * .16}" rx="${r * .5}" ry="${r * .3}" fill="#fff"/></g>`).join("");
  s += `<rect x="-200" y="${hz}" width="2320" height="140" fill="url(#ubSea)"/><rect x="-200" y="${hz + 120}" width="2320" height="${1200 - hz - 120}" fill="url(#ubShallow)"/>` + [[700, .5, 3], [1100, .4, 1], [1500, .55, 0], [1840, .38, 2]].map(([x, k, p]) => TF(x, hz + 2, k, shipFar(1, p))).join("");
  // the sandy floor in the clear shallows, rocks
  for (let i = 0; i < 14; i++) { const x = hash(i, 2) * 2300 - 200, y = hz + 180 + hash(i, 3) * 700, r = 50 + 120 * hash(i, 4); s += `<ellipse cx="${n2(x)}" cy="${n2(y)}" rx="${n2(r)}" ry="${n2(r * .25)}" fill="#E6D8A8" opacity=".45"/>`; }
  for (const [x, y, r] of [[980, 930, 60], [1300, 720, 40], [1760, 860, 70], [560, 700, 46]]) s += `<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r * .55}" fill="#7A7A6A" stroke="#4E4E44" stroke-width="4"/><ellipse cx="${x - r * .3}" cy="${y - r * .2}" rx="${r * .4}" ry="${r * .18}" fill="#A8A898" opacity=".7"/>`;
  // the mud and the mangroves' edge at the left (the trees are live)
  s += `<path d="M-200 ${hz - 30} Q120 ${hz - 40} 360 ${hz + 60} Q420 ${hz + 140} 300 ${hz + 200} L-200 ${hz + 230}z" fill="#8A7A5A"/>`;
  return s; };
// the seagrass: blades grow from the sea floor and sway in the current (a meadow around (x, y), n blades)
const seagrass21 = (t, x, y, n = 18, w = 260, h = 70) => { let s = ""; for (let i = 0; i < n; i++) { const bx = x - w / 2 + w * hash(i + x, 3), by = y + 20 * hash(i, 5), L = h * (.6 + .6 * hash(i, 7)), sw = 10 * Math.sin(t * 1.3 + i * .7);
  s += `<path d="M${n2(bx)} ${n2(by)} q${n2(sw * .4)} ${n2(-L * .5)} ${n2(sw)} ${n2(-L)}" stroke="${i % 3 ? "#3E8A46" : "#5AA650"}" stroke-width="7" fill="none" stroke-linecap="round" opacity=".9"/>`; } return s; };
// the boardwalk deck (live, so the buddies' easel can stand on it): the posts into the water, the planks, the low rails, the ladder
const boardwalk21 = (t) => { let s = "", posts = "";
  for (let i = 0; i <= 10; i++) { const u = i / 10, [x0, y0] = bwEdge(u, 0), [x1, y1] = bwEdge(u, 1), h = lerp(140, 40, u); posts += `<rect x="${n2(x0 - 10 * (1 - u * .6))}" y="${n2(y0)}" width="${n2(20 * (1 - u * .6))}" height="${n2(h)}" fill="#6A4A2A"/><rect x="${n2(x1 - 10 * (1 - u * .6))}" y="${n2(y1)}" width="${n2(20 * (1 - u * .6))}" height="${n2(h)}" fill="#5A3A1E"/><ellipse cx="${n2(x1)}" cy="${n2(y1 + h)}" rx="${n2(18 * (1 - u * .6))}" ry="4" fill="#fff" opacity=".35"/>`; }
  s += `<path d="M${n2(bwEdge(0, 0)[0])} ${n2(bwEdge(0, 0)[1] + 40)} L${n2(bwEdge(1, 0)[0])} ${n2(bwEdge(1, 0)[1] + 12)} L${n2(bwEdge(1, 1)[0])} ${n2(bwEdge(1, 1)[1] + 12)} L${n2(bwEdge(0, 1)[0])} ${n2(bwEdge(0, 1)[1] + 40)}z" fill="#13505A" opacity=".25"/>` + posts;
  s += `<path d="M${bwEdge(0, 0).join(" ")} L${bwEdge(1, 0).join(" ")} L${bwEdge(1, 1).join(" ")} L${bwEdge(0, 1).join(" ")}z" fill="#C79A66" stroke="#6A4A2A" stroke-width="5"/>`;
  for (let i = 1; i < 30; i++) { const u = 1 - Math.pow(1 - i / 30, 1.6), a = bwEdge(u, 0), b = bwEdge(u, 1); s += `<path d="M${n2(a[0])} ${n2(a[1])} L${n2(b[0])} ${n2(b[1])}" stroke="#8A6236" stroke-width="${n2(4 * (1 - u) + 1)}" opacity=".7"/>`; }
  // the low rails along both edges, on short posts
  for (const sd of [0, 1]) { let rail = ""; for (let i = 0; i <= 10; i++) { const [x, y] = bwEdge(i / 10, sd), h = lerp(110, 26, i / 10); rail += `<path d="M${n2(x)} ${n2(y)} V${n2(y - h)}" stroke="#7A5230" stroke-width="${n2(lerp(14, 4, i / 10))}"/>`; }
    const a = bwEdge(0, sd), b = bwEdge(1, sd); s += rail + `<path d="M${n2(a[0])} ${n2(a[1] - 110)} L${n2(b[0])} ${n2(b[1] - 26)}" stroke="#A8743E" stroke-width="12" stroke-linecap="round"/>`; }
  // the wooden ladder down to the water, on the boardwalk's right edge
  const [lx, ly] = BWK.ladder; s += `<path d="M${lx - 24} ${ly} V${ly + 120} M${lx + 24} ${ly - 8} V${ly + 112}" stroke="#7A5230" stroke-width="9"/>` + [0, 1, 2, 3].map((i) => `<path d="M${lx - 24} ${ly + 22 + i * 28} L${lx + 24} ${ly + 14 + i * 28}" stroke="#A8743E" stroke-width="7"/>`).join("") + `<ellipse cx="${lx}" cy="${ly + 118}" rx="40" ry="6" fill="#fff" opacity=".4"/>`;
  return s; };
/* the TURTLE's spots by the boardwalk: by the boardwalk's posts near the easel end (show), beside the wooden ladder (fix), in the shadow
   under the boardwalk between two far posts (bwalk); the REVEAL: in the seagrass at the end of the boardwalk (liz) */
const BWAT = { show: [bwEdge(.32, 1)[0] + 40, bwEdge(.32, 1)[1] + 120, .2, {}], fix: [BWK.ladder[0] + 70, BWK.ladder[1] + 116, .2, { look: -1 }], bwalk: [bwEdge(.78, 0)[0] + 50, bwEdge(.78, 0)[1] + 60, .14, {}], liz: [1700, 640, .2, { look: -1 }] };
function BW21(t, o = {}, cam) { const sc = (window._S || {}).name, tt = o.turtle === undefined ? BWAT[sc] : o.turtle;
  let s = bg("bw21") + [[-130, 470, .95, 0], [60, 450, .8, 1], [220, 470, .7, 2], [-20, 400, .6, 3]].map(([x, y, k, p]) => TF(x, y, k, mangrove21(t, 1, p))).join("");
  s += seagrass21(t, 1700, 650, 26, 360, 80) + seagrass21(t, 1220, 900, 20, 300, 70) + seagrass21(t, 520, 860, 18, 300, 60) + seagrass21(t, 1600, 1000, 22, 400, 80);
  for (let i = 0; i < 16; i++) { const x = (hash(i, 9) * 2300 + t * (16 + 10 * hash(i, 2))) % 2300 - 200, y = BWK.hz + 140 + hash(i, 4) * 600; s += `<path d="M${n2(x)} ${n2(y)} q14 -6 28 0" stroke="#fff" stroke-width="3" fill="none" opacity="${n2(.25 + .25 * Math.sin(t * 2 + i))}"/>`; }
  // cloud shadows sliding over the water
  s += [0, 1].map((i) => `<ellipse cx="${n2(((t * 22 + i * 1100) % 2600) - 300)}" cy="${700 + i * 180}" rx="320" ry="60" fill="#0A3A4A" opacity=".08"/>`).join("");
  if (tt && sc !== "fix" && sc !== "show") s += turtleAt(t, tt[0], tt[1], tt[2], tt[3]);
  s += boardwalk21(t);
  if (tt && (sc === "fix" || sc === "show")) s += turtleAt(t, tt[0], tt[1], tt[2], tt[3]);
  s += (o.deck || "") + (o.front || "");
  if (o.dim) s += `<rect x="-200" y="-120" width="2320" height="1320" fill="${P.night}" opacity="${n2(o.dim)}"/>`;
  return cam ? CAM(s, cam[0], cam[1], cam[2]) : s; }
