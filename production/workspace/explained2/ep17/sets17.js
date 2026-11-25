// sets17.js: EP17's real places (Stage 2, drawn 2026-11-23). EP15 / EP16's community garden beside the HDB block, so the story carries on.
// THE LIME-PLANT SIDE (Part 1): BG.lime17 (baked: the block and its void deck behind, the far estate, the grass and path, the bench, the
//   planter bed, the green fence and its post) + VL(t, o, cam) live: the lime plant in its big pot (EP16's dare spot: the same terracotta pot)
//   with its glossy leaves swaying, the caterpillar / the egg / the pupa on their twigs, the watering can by the pot, a bulbul hopping on the
//   fence, clouds, a bee, dew; the dawn light (o.dawn) turning gold; the moth in its spot for the scene (MOTHAT: never the intro pillar again).
// THE FAR CORNER BY THE TAP AFTER RAIN (Part 1's cliffhanger, Part 2): BG.corner17 (baked) + VCR(t, o, cam) live: the tap on its pipe dripping,
//   the old blue PAIL of rainwater (flat and still, a few leaves floating, rings when a drop falls; the wrigglers when o.wrig), the flower pot
//   on its plate, the watering can, the planter bed with BAMBOO STAKES, the bench, a puddle drying, wet shine; the dragonfly (DFLYAT).
// AN HDB CORRIDOR on a high floor of the same block (Part 2's plate): BG.corr17 (baked) + VH(t, o, cam) live: the flat's door and gate
//   grille, a window with a fan turning, the shoe rack, a vase by the door, potted plants on little plates along the parapet, a pail turned
//   over, the estate and sky beyond, a curtain stirring.
// THE VOID DECK (Part 2's dare): BG.void17 (baked) + VD(t, o, cam) live: square pillars, the stone table and stools, letterboxes, a ceiling
//   fan turning, a pigeon walking, the bright garden beyond.

/* ---------------------------------------------------------------- shared pieces ---------------------------------------------------------------- */
// an HDB block face (x0..x1, its roof at y0, the void deck's floor at yv): coloured bands, windows, the void deck's square pillars and dark shade
const hdbBlock17 = (x0, x1, y0, yv, o = {}) => { let s = `<rect x="${x0}" y="${y0}" width="${x1 - x0}" height="${yv - y0}" fill="#FFF4E2"/><rect x="${x1 - 26}" y="${y0}" width="26" height="${yv - y0}" fill="#E3CFAE"/>`;
  const rows = Math.floor((yv - 190 - y0) / 110); for (let r = 0; r < rows; r++) { const y = y0 + 40 + r * 110; s += `<rect x="${x0}" y="${y + 64}" width="${x1 - x0 - 26}" height="20" fill="${["#8FD3C8", "#B9A6FF", "#FFC38A", "#F6A38F"][r % 4]}"/>`;
    for (let x = x0 + 50; x < x1 - 90; x += 118) s += `<rect x="${x}" y="${y}" width="74" height="58" rx="5" fill="#9DB8CC"/><rect x="${x + 4}" y="${y + 4}" width="31" height="50" rx="3" fill="#CFE6F4"/>`; }
  const vt = yv - 170; s += `<rect x="${x0}" y="${vt}" width="${x1 - x0}" height="170" fill="#6E7898"/><rect x="${x0}" y="${vt}" width="${x1 - x0}" height="170" fill="#2B2147" opacity=".28"/><rect x="${x0}" y="${vt - 16}" width="${x1 - x0 + 10}" height="18" fill="#E3CFAE"/>`;
  for (let x = x0 + 40; x < x1; x += 200) s += `<rect x="${x}" y="${vt + 2}" width="52" height="168" fill="#F2E4C8"/><rect x="${x + 40}" y="${vt + 2}" width="12" height="168" fill="#D9C7A6"/>`;
  if (o.letters) { const [lx, ly] = o.letters; s += `<rect x="${lx}" y="${ly}" width="170" height="104" rx="6" fill="#B9C4D0" stroke="#7A8798" stroke-width="4"/>${[...Array(12)].map((_, i) => `<rect x="${lx + 10 + (i % 4) * 40}" y="${ly + 10 + Math.floor(i / 4) * 31}" width="32" height="24" rx="3" fill="#D9E1EA" stroke="#8C98A8" stroke-width="2"/>`).join("")}`; }
  if (o.notice) { const [nx, ny] = o.notice; s += `<rect x="${nx}" y="${ny}" width="120" height="86" rx="6" fill="#7A5A34"/><rect x="${nx + 8}" y="${ny + 8}" width="104" height="70" fill="#F4E6C8"/><rect x="${nx + 16}" y="${ny + 16}" width="40" height="30" fill="#FFC38A"/><rect x="${nx + 62}" y="${ny + 18}" width="40" height="40" fill="#8FD3C8"/>`; }
  return s; };
const clouds17 = (t, list) => list.map(([x, y, k], i) => { const cx = (x + t * (7 + 2 * i) + 400) % 2500 - 300; return TF(cx, y, k, `<g opacity=".95"><ellipse rx="130" ry="34" fill="#fff"/><ellipse cx="-50" cy="-26" rx="62" ry="40" fill="#fff"/><ellipse cx="34" cy="-36" rx="76" ry="50" fill="#fff"/></g>`); }).join("");
const benchArt17 = (bx, by, k = 1) => TF(bx, by, k, `<ellipse cx="0" cy="96" rx="230" ry="14" fill="${P.ink}" opacity=".2" filter="url(#b4)"/><path d="M-170 96 V10 M170 96 V10" stroke="#7E4F27" stroke-width="14" stroke-linecap="round"/><rect x="-210" y="-64" width="420" height="18" rx="8" fill="url(#f14Wood)" stroke="#7E4F27" stroke-width="4"/><rect x="-210" y="-38" width="420" height="18" rx="8" fill="url(#f14Wood)" stroke="#7E4F27" stroke-width="4"/><path d="M-190 -64 V0 M190 -64 V0" stroke="#7E4F27" stroke-width="10" stroke-linecap="round"/><rect x="-220" y="-4" width="440" height="24" rx="10" fill="url(#f14Wood)" stroke="#7E4F27" stroke-width="4"/><path d="M-226 -4 V-40 M226 -4 V-40" stroke="#7E4F27" stroke-width="12" stroke-linecap="round"/>`);
// a watering can (origin = its base middle). o.k
const canArt17 = (o = {}) => TF(0, 0, o.k || 1, `<ellipse cx="0" cy="4" rx="90" ry="12" fill="${P.ink}" opacity=".22" filter="url(#b4)"/><path d="M-70 0 L-60 -120 H60 L70 0z" fill="${o.col || "#4FB0A0"}" stroke="${o.line || "#2E7A6E"}" stroke-width="5" stroke-linejoin="round"/><path d="M60 -90 L150 -160 L162 -150 L76 -70" fill="${o.col || "#4FB0A0"}" stroke="${o.line || "#2E7A6E"}" stroke-width="5" stroke-linejoin="round"/><ellipse cx="160" cy="-158" rx="18" ry="10" fill="${o.line || "#2E7A6E"}" transform="rotate(-40 160 -158)"/><path d="M-50 -120 Q0 -200 50 -120" stroke="${o.line || "#2E7A6E"}" stroke-width="12" fill="none" stroke-linecap="round"/><path d="M-60 -60 H60" stroke="#fff" stroke-width="5" opacity=".35"/>`);
// the handle's top (where an animal can sit), in the can's own frame
const CANHANDLE = [0, -160];
// a leaf on its short leaf stalk at (x, y), pointing at angle a (deg) (SERIES_FORMAT: every leaf joins a stem; no leaf floats)
const stalkLeaf17 = (x, y, a, len, wid, i, o = {}) => { const st = o.stalk || Math.max(8, len * .18); return `<g transform="translate(${n2(x)} ${n2(y)}) rotate(${n2(a)})"><path d="M0 0 L${n2(st)} 0" stroke="${o.stalkC || "#5E7A3A"}" stroke-width="${n2(Math.max(2.5, wid * .14))}" stroke-linecap="round"/><g transform="translate(${n2(st - 2)} 0)">${leaf15(len, wid, (o.cols || ["#3E9E5A", "#58B56C"])[i % 2], o.line || "#2A6E3E")}</g></g>`; };
// a leafy twig: the stem b = [x0, y0, cx, cy, x1, y1] (a quadratic curve), leaves on stalks along it (alternate sides) and one at its tip.
// o: n, len, wid, w (stem width), wood, u0, u1, spread (deg), sw (k => sway deg), tip (false: none), seed, stalk, cols, line
const leafyTwig17 = (b, o = {}) => { const n = o.n === undefined ? 3 : o.n, len = o.len || 60, wid = o.wid || 24, u0 = o.u0 === undefined ? .35 : o.u0, u1 = o.u1 === undefined ? .85 : o.u1, sw = o.sw || (() => 0), sd = o.seed || 0;
  let s = `<path d="M${n2(b[0])} ${n2(b[1])} Q${n2(b[2])} ${n2(b[3])} ${n2(b[4])} ${n2(b[5])}" stroke="${o.wood || "#7A5230"}" stroke-width="${o.w || 8}" fill="none" stroke-linecap="round"/>`;
  for (let k = 0; k < n; k++) { const u = u0 + (u1 - u0) * (n > 1 ? k / (n - 1) : 0), [x, y] = qpt(b, u); s += stalkLeaf17(x, y, qang(b, u) + ((k + sd) % 2 ? 1 : -1) * (o.spread || 50) + sw(k), len, wid, k + sd, o); }
  if (o.tip !== false) s += stalkLeaf17(b[4], b[5], qang(b, 1) + sw(n), len, wid, n + sd, o);
  return s; };

/* ---------------------------------------------------------------- THE LIME-PLANT SIDE ---------------------------------------------------------------- */
const POTL = [1160, 950], FENCE = { y: 650, post: [1690, 650] }, BENCHL = [420, 700], PLANTERL = [700, 760];
BG.lime17 = () => { let s = `<rect x="-200" y="-120" width="2320" height="800" fill="url(#e17Sky)"/><g opacity=".6">${farBlocks(760, 2140, 420, 41, 1)}</g>`;
  s += hdbBlock17(-200, 820, -120, 600, { letters: [120, 470], notice: [520, 478] });
  s += `<rect x="-200" y="590" width="2320" height="620" fill="url(#g14Grass)"/><path d="M-200 600 Q400 584 960 596 T2120 590 V620 H-200z" fill="#B7E58F"/>`;
  for (let i = 0; i < 9; i++) s += `<circle cx="${820 + i * 160}" cy="${n2(612 + 8 * hash(i, 4))}" r="${n2(46 + 22 * hash(i, 6))}" fill="${i % 2 ? "#5FB56C" : "#7CC97A"}"/>`;
  // the green fence along the back right, with its fence post (the moth's spot in waitw)
  s += `<path d="M820 ${FENCE.y - 40} H2120" stroke="#3E8A5A" stroke-width="8"/><path d="M820 ${FENCE.y - 4} H2120" stroke="#3E8A5A" stroke-width="8"/>${[...Array(40)].map((_, i) => `<path d="M${840 + i * 34} ${FENCE.y - 60} V${FENCE.y + 4}" stroke="#4E9A68" stroke-width="5"/>`).join("")}`
    + `<rect x="${FENCE.post[0] - 16}" y="${FENCE.post[1] - 110}" width="32" height="120" rx="5" fill="#3E7A52" stroke="#2A5A3A" stroke-width="4"/><rect x="${FENCE.post[0] - 20}" y="${FENCE.post[1] - 118}" width="40" height="14" rx="5" fill="#4E9A68"/>`;
  // the path
  s += `<path d="M-200 1200 Q300 900 560 760 Q640 720 820 700 L940 700 Q760 760 700 860 Q600 1040 640 1200z" fill="#EAD9B8"/><path d="M820 700 L940 700 Q760 760 700 860" stroke="#D9C5A0" stroke-width="5" fill="none"/>`;
  s += benchArt17(BENCHL[0], BENCHL[1], .9);
  // the planter bed: a low brick wall, soil, herbs and lemongrass
  { const [px, py] = PLANTERL; s += `<ellipse cx="${px}" cy="${py + 64}" rx="300" ry="16" fill="${P.ink}" opacity=".2" filter="url(#b4)"/><rect x="${px - 280}" y="${py - 10}" width="560" height="70" rx="8" fill="#C97A5A" stroke="#8A4A2E" stroke-width="5"/>${[...Array(7)].map((_, i) => `<path d="M${px - 280 + i * 80} ${py - 10} v70" stroke="#8A4A2E" stroke-width="3" opacity=".5"/>`).join("")}<rect x="${px - 270}" y="${py - 26}" width="540" height="22" rx="8" fill="url(#g14Soil)"/>`;
    for (let i = 0; i < 14; i++) { const x = px - 250 + i * 12, h = 120 + 50 * hash(i, 51); s += `<path d="M${x} ${py - 20} Q${n2(x - 20 + 40 * hash(i, 53))} ${n2(py - 20 - h * .6)} ${n2(x - 30 + 60 * hash(i, 55))} ${n2(py - 20 - h)}" stroke="${i % 2 ? "#8CC86A" : "#6FAE54"}" stroke-width="5" fill="none" stroke-linecap="round"/>`; }
    for (let i = 0; i < 9; i++) s += `<g transform="translate(${px - 40 + i * 32} ${py - 22})"><ellipse cx="-8" cy="-14" rx="9" ry="16" fill="#58B56C" transform="rotate(-24 -8 -14)"/><ellipse cx="8" cy="-14" rx="9" ry="16" fill="#43A85C" transform="rotate(24 8 -14)"/></g>`; }
  for (let i = 0; i < 44; i++) { const x = -160 + hash(i, 3) * 2240, y = 660 + hash(i, 7) * 520; if (x > 560 && x < 900 && y > 760) continue; s += `<path d="M${n2(x)} ${n2(y)} q4 -18 0 -26 M${n2(x + 9)} ${n2(y)} q8 -14 10 -22 M${n2(x - 8)} ${n2(y)} q-6 -12 -10 -18" stroke="#58A84E" stroke-width="4" stroke-linecap="round" fill="none" opacity=".7"/>`; }
  return s; };
// the lime plant's branches and leaves (live: they sway). The pot's rim top is at POTL[1] - 230. Twigs where the animals sit:
//   LT_CAT the caterpillar's twig (right), LT_EGG a young leaf's tip (top left), LT_PUPA the stem where it hangs (left low branch)
// EVERY LEAF ON A TWIG (SERIES_FORMAT, teacher 23 Nov 2026: "the leaves of the tree must branch out from the branches, not in mid-air"; EP18's
//   limePlant18 approach): the trunk, eight branches and their side twigs as quadratic curves; leaves in pairs along them, each on a short
//   leaf stalk. The caterpillar's twig (answer1's twig) is real wood now, with the chewed leaf on a stalk at the caterpillar's head; the moth's
//   answer1 leaf (820, 330) is the tip leaf of a twig off the egg branch. Same crown as before (x 815..1505, y 205..675).
const LT_CAT = [1330, 560], LT_EGG = [980, 330], LT_PUPA = [1000, 690], LT_TOP = [1180, 210];
// the wood: [x0, y0, cx, cy, x1, y1, width, leaves] (leaves: how many along it; "down" = only hanging below, for the caterpillar's twig)
const LIMEBR = (() => { const [px, py] = POTL; return [
  [px, py - 236, px - 10, py - 420, px, py - 560, 15, 3],                          // 0 the trunk
  [px, py - 470, px - 90, py - 380, LT_PUPA[0], LT_PUPA[1] - 120, 10, 5],          // 1 the pupa's branch (it hangs at the end)
  [px + 2, py - 520, px + 25, py - 390, 1212, 567, 10, 3],                         // 2 to the caterpillar's twig
  [px, py - 600, px - 80, py - 660, LT_EGG[0], LT_EGG[1], 10, 6],                  // 3 the egg's branch (the young leaf at its tip)
  [px, py - 560, px + 10, py - 680, LT_TOP[0], LT_TOP[1] + 40, 10, 6],             // 4 the top
  [px - 4, py - 520, px - 180, py - 470, 900, 470, 10, 6],                         // 5 left
  [px + 4, py - 500, px + 200, py - 430, 1420, 470, 10, 6],                        // 6 right
  [px + 6, py - 620, px + 180, py - 680, 1300, 290, 10, 6],                        // 7 top right
  [1212, 567, LT_CAT[0], LT_CAT[1] - 6, LT_CAT[0] + 130, LT_CAT[1], 9, "down"],     // 8 the caterpillar's twig
  [1075, 292, 975, 330, 888, 346, 7, "tip"]]; })();                                // 9 the moth's leaf twig (answer1: its tip leaf)
const qpt = (b, u) => { const v = 1 - u; return [v * v * b[0] + 2 * v * u * b[2] + u * u * b[4], v * v * b[1] + 2 * v * u * b[3] + u * u * b[5]]; };
const qang = (b, u) => { const dx = 2 * (1 - u) * (b[2] - b[0]) + 2 * u * (b[4] - b[2]), dy = 2 * (1 - u) * (b[3] - b[1]) + 2 * u * (b[5] - b[3]); return Math.atan2(dy, dx) * 180 / Math.PI; };
// side twigs off the branches: [branch, u, angle (deg), length]; each carries three leaves (one each side, one at its tip)
const LIMETW = [[5, .45, 150, 100], [5, .5, -145, 90], [6, .55, 35, 100], [6, .45, -55, 90], [7, .6, -35, 80], [1, .45, -125, 80], [4, .5, -150, 70], [3, .35, -110, 70]]
  .map(([j, u, an, len]) => { const b = LIMEBR[j], [x0, y0] = qpt(b, u), r = an * Math.PI / 180, x1 = x0 + len * Math.cos(r), y1 = y0 + len * Math.sin(r);
    return [x0, y0, (x0 + x1) / 2 + 12 * Math.sin(r), (y0 + y1) / 2 - 12 * Math.cos(r), x1, y1, 6, "twig"]; });
// one leaf on its stalk at (x, y), pointing at angle a (deg)
const limeLeaf = (x, y, a, i, len = 66, wid = 28) => `<g transform="translate(${n2(x)} ${n2(y)}) rotate(${n2(a)})"><path d="M0 0 L14 0" stroke="#5E7A3A" stroke-width="4" stroke-linecap="round"/><g transform="translate(12 0)">${leaf15(len, wid, i % 3 ? "#3E9E5A" : "#58B56C", "#2A6E3E")}<path d="M12 -8 Q30 -18 50 -10" stroke="#9FE0A8" stroke-width="3" fill="none" opacity=".6"/></g></g>`;
function limePlant(t, o = {}) { const [px, py] = POTL, sw = (i) => 2.4 * Math.sin(t * 1.1 + i * .7); let s = "", lv = "";
  const keep = (i) => !(o.cut && hash(i, 9) < .1);   // o.cut: a few leaves gone (as before)
  // the big terracotta pot (EP16's: the same pot, the same rim)
  s += `<ellipse cx="${px}" cy="${py + 8}" rx="220" ry="24" fill="${P.ink}" opacity=".24" filter="url(#b4)"/><path d="M${px - 170} ${py} L${px - 196} ${py - 206} H${px + 196} L${px + 170} ${py}z" fill="url(#p15Pot)" stroke="#9A4A2A" stroke-width="7" stroke-linejoin="round"/><rect x="${px - 214}" y="${py - 240}" width="428" height="44" rx="12" fill="#D9774A" stroke="#9A4A2A" stroke-width="7"/><path d="M${px - 150} ${py - 160} Q${px - 140} ${py - 60} ${px - 130} ${py - 20}" stroke="#F2A27A" stroke-width="10" fill="none" opacity=".45" stroke-linecap="round"/><ellipse cx="${px}" cy="${py - 236}" rx="190" ry="14" fill="url(#p15Soil)"/>`;
  // the wood (trunk, branches, twigs), then the leaves on it
  [...LIMEBR, ...LIMETW].forEach((b, j) => { s += `<path d="M${n2(b[0])} ${n2(b[1])} Q${n2(b[2])} ${n2(b[3])} ${n2(b[4])} ${n2(b[5])}" stroke="#7A5230" stroke-width="${b[6]}" fill="none" stroke-linecap="round"/>`;
    const kind = b[7];
    if (kind === "twig") { [[.45, -1], [.75, 1]].forEach(([u, side], k) => { const i = 100 + j * 10 + k, [x, y] = qpt(b, u); if (keep(i)) lv += limeLeaf(x, y, qang(b, u) + side * (45 + 10 * hash(i, 5)) + sw(i), i, 58, 25); });
      const i = 100 + j * 10 + 5; if (keep(i)) lv += limeLeaf(b[4], b[5], qang(b, 1) + sw(i), i, 58, 25); return; }
    if (kind === "tip") { const i = 95; lv += limeLeaf(b[4], b[5], qang(b, 1) + sw(i) * .4, i, 62, 26); [.45].forEach((u) => { const [x, y] = qpt(b, u); lv += limeLeaf(x, y, qang(b, u) - 55 + sw(96), 96); }); return; }
    if (kind === "down") { [[.2, 70], [.85, 60]].forEach(([u, d], k) => { const i = 90 + k, [x, y] = qpt(b, u); if (keep(i)) lv += limeLeaf(x, y, qang(b, u) + d + sw(i), i); }); lv += limeLeaf(b[4], b[5], qang(b, 1) + 10 + sw(92), 92); return; }
    const n = kind; for (let k = 0; k < n; k++) { const u = j ? .3 + .66 * k / (n - 1) : .45 + .2 * k, [x, y] = qpt(b, u), a = qang(b, u), side = k % 2 ? 1 : -1, i = j * 10 + k;
      if (j === 3 && k === n - 1) continue;   // the young leaf at LT_EGG is drawn on its own
      if (keep(i)) lv += limeLeaf(x, y, a + side * (50 + 10 * hash(i, 5)) + sw(i), i); } });
  s += lv;
  // the chewed leaf the caterpillar eats (its edge bitten away), on its stalk from the caterpillar's twig; the young leaf with the egg at its tip
  { const bites = o.bites || 0, [sx, sy] = qpt(LIMEBR[8], .6); s += `<path d="M${n2(sx)} ${n2(sy)} Q${n2(sx - 4)} ${n2(sy - 14)} ${LT_CAT[0] + 30} ${LT_CAT[1] - 30}" stroke="#5E7A3A" stroke-width="5" fill="none" stroke-linecap="round"/><g transform="translate(${LT_CAT[0] + 30} ${LT_CAT[1] - 30}) rotate(${n2(-8 + sw(3) * .5)})"><path d="M0 0 Q40 -50 110 -40 Q150 -10 140 30 Q90 60 0 0z" fill="#58B56C" stroke="#2A6E3E" stroke-width="3"/>${[...Array(Math.round(3 + bites))].map((_, i) => `<circle cx="${110 - i * 18}" cy="${-36 + i * 4}" r="12" fill="url(#e17Sky)"/>`).join("")}<path d="M6 0 Q70 -16 136 24" stroke="#2A6E3E" stroke-width="2" fill="none" opacity=".6"/></g>`; }
  s += `<g transform="translate(${LT_EGG[0]} ${LT_EGG[1]}) rotate(${n2(200 + sw(5))})"><path d="M0 0 L10 0" stroke="#5E7A3A" stroke-width="4"/><g transform="translate(8 0)">${leaf15(80, 26, "#8FD86A", "#3E9E5A")}</g></g>`;
  if (o.egg !== false) s += TF(LT_EGG[0] - 82, LT_EGG[1] - 26, o.eggK || .9, limeEgg(1, t));
  if (o.cat) { const c = o.cat; s += TF(c.x || LT_CAT[0], c.y || LT_CAT[1], c.k || .5, cat17(t, c.o || {}), c.rot === undefined ? -6 : c.rot); }
  if (o.pupa) { const p = o.pupa; s += TF(p.x || LT_PUPA[0], p.y || LT_PUPA[1], p.k || .42, pupa17(t, p.o || { stem: false })); }
  if (o.bfly) { const b = o.bfly; s += TF(b.x, b.y, b.k || .4, bfly17(t, { flap: .5 + .5 * Math.sin(t * 9) }), b.rot || 0); }
  return s; }
// the moth's spot in each lime-side scene [x, y, k, rot]: the intro (the void deck's pillar) is used ONLY before and at the game's push-in
const MOTHAT = { cold: [466, 520, .34, 0], back: [466, 520, .34, 0], title: [466, 520, .34, 0], game: [466, 520, .34, 0],
  answer1: [820, 330, .28, -20], lime: [LT_TOP[0] + 40, LT_TOP[1] + 30, .3, 180, "front"], waitw: [FENCE.post[0], FENCE.post[1] - 124, .3, 0],
  larva: [POTL[0] - 320, POTL[1] - 146, .3, 0], ring: null, holdon: null, liz: [POTL[0] - 120, POTL[1] - 90, .34, -6] };
// VL: the live lime-plant side. o: dawn (0..1 the dawn tint), cat, pupa, egg, bites, bfly, can (true: the watering can by the pot), mothAt
// ([..] | false), items (drawn before the plant), over (after the plant), dim
function VL(t, o = {}, cam) { let s = bg("lime17") + clouds17(t, [[200, 90, 1], [1250, 60, .8], [1850, 150, .7]]);
  if (o.items0) s += o.items0;
  // a bulbul hops along the fence
  s += TF(1840 + 10 * Math.sin(t * .4), FENCE.y - 64 - hop(t % 2.3, 0, .3, 10), .9, bird15(t, 1, 1.3));
  const ma = o.mothAt === undefined ? MOTHAT[(window._S || {}).name] : o.mothAt; const mothS = ma ? mothAt(t, ma[0], ma[1], ma[2], { rot: ma[3], tw: 1, open: o.mothOpen || 0 }) : "";
  if (ma && ma[1] < 600 && !ma[4]) s += mothS;   // on the void deck / far: behind the plant ("front": on a leaf, in front of the crown)
  if (o.can !== false) s += TF(POTL[0] - 320, POTL[1] + 4, .9, canArt17());
  if (o.items) s += o.items;
  s += limePlant(t, o);
  if (ma && (ma[1] >= 600 || ma[4])) s += mothS;
  // a bee passes; dew sparkles at dawn
  { const u = (t / 11) % 1, bx = -100 + 2200 * u, by = 380 + 50 * Math.sin(u * 20); s += TF(bx, by, .9, `<ellipse cx="-4" cy="-10" rx="10" ry="6" fill="#fff" opacity=".8" transform="rotate(${n2(30 * Math.sin(t * 60))} -4 -10)"/><ellipse rx="12" ry="8" fill="#FFC83A" stroke="${P.ink}" stroke-width="2"/><path d="M-2 -7 v14 M5 -6 v12" stroke="${P.ink}" stroke-width="3"/>`); }
  if (o.dawn) { s += [[1040, 470], [1300, 390], [1210, 620], [1420, 520]].map(([x, y], i) => lcGlint(x, y, 10, t, i)).join("") + `<rect x="-200" y="-120" width="2320" height="1320" fill="url(#e17Dawn)" opacity="${n2(.4 * o.dawn)}" style="mix-blend-mode:multiply"/>`; }
  if (o.over) s += o.over;
  if (o.dim) s += `<rect x="-200" y="-120" width="2320" height="1320" fill="${P.night}" opacity="${n2(o.dim)}"/>`;
  return cam ? CAM(s, cam[0], cam[1], cam[2]) : s; }

/* ---------------------------------------------------------------- THE FAR CORNER BY THE TAP, AFTER RAIN ---------------------------------------------------------------- */
const TAPC = [470, 700], PAILC = [700, 930], PLATEC = [1560, 900], CANC = [1800, 960], STAKES = [[1010, 470], [1130, 440], [1250, 470], [1370, 450]], BENCHC = [1480, 640];
const PAILW = 150, PAILH = 230;   // the pail's half-width at the rim, its height; its rim at PAILC[1] - PAILH
BG.corner17 = () => { let s = `<rect x="-200" y="-120" width="2320" height="800" fill="url(#e17Sky)"/><g opacity=".55">${farBlocks(700, 2140, 430, 47, 1)}</g>`;
  s += hdbBlock17(-200, 640, -120, 600, { letters: [80, 470] });
  s += `<rect x="-200" y="590" width="2320" height="620" fill="url(#e17Wet)"/><path d="M-200 600 Q400 584 960 596 T2120 590 V620 H-200z" fill="#A9DC8A"/>`;
  for (let i = 0; i < 10; i++) s += `<circle cx="${640 + i * 160}" cy="${n2(610 + 8 * hash(i, 8))}" r="${n2(46 + 22 * hash(i, 9))}" fill="${i % 2 ? "#4FA860" : "#6CBF70"}"/>`;
  s += benchArt17(BENCHC[0], BENCHC[1], .8);
  // the planter bed with bamboo stakes (the dragonfly's intro spot: a stake's tip)
  s += `<ellipse cx="1190" cy="700" rx="320" ry="16" fill="${P.ink}" opacity=".2" filter="url(#b4)"/><rect x="900" y="630" width="580" height="70" rx="8" fill="#C97A5A" stroke="#8A4A2E" stroke-width="5"/><rect x="910" y="614" width="560" height="22" rx="8" fill="url(#g14Soil)"/>`;
  STAKES.forEach(([x, y], i) => { s += `<path d="M${x} 630 L${x} ${y}" stroke="#D9C27A" stroke-width="12" stroke-linecap="round"/>${[0, 1, 2].map((k) => `<path d="M${x - 6} ${y + 40 + k * 50} h12" stroke="#A8904A" stroke-width="4"/>`).join("")}`;
    // the bean vines climbing the stake: every leaf on a vine, on its own little stalk (SERIES_FORMAT: no leaf in mid-air)
    const vo = { len: 40, wid: 16, w: 5, wood: "#4E9A44", stalk: 8, cols: ["#3E9E5A", "#58B56C"] };
    s += leafyTwig17([x, 600, x + 40, 560 - 30 * hash(i, 3), x + 30, y + 60], { ...vo, n: 3, u0: .3, u1: .8, spread: 55, seed: i }) + leafyTwig17([x, 610, x - 30, 560, x - 26, y + 90], { ...vo, n: 2, u0: .4, u1: .8, spread: 55, seed: i + 1 }); });
  // the tap on its pipe (with a drip at the spout)
  { const [tx, ty] = TAPC; s += `<rect x="${tx - 14}" y="${ty - 200}" width="28" height="${200 + 220}" rx="8" fill="url(#e17Steel)" stroke="#6E7A8A" stroke-width="4"/><path d="M${tx} ${ty - 170} H${tx + 70} V${ty - 140}" stroke="#A9B4C2" stroke-width="22" fill="none" stroke-linejoin="round"/><path d="M${tx} ${ty - 170} H${tx + 70} V${ty - 140}" stroke="#6E7A8A" stroke-width="4" fill="none"/><rect x="${tx - 26}" y="${ty - 224}" width="52" height="16" rx="6" fill="#E0453A"/><rect x="${tx - 6}" y="${ty - 236}" width="12" height="20" fill="#B8342A"/>`; }
  // a puddle drying on the path, wet shine
  s += `<path d="M-200 1200 Q200 980 520 880 Q760 820 1000 840 L1180 860 Q900 900 820 1000 Q760 1100 800 1200z" fill="#D9CCB0"/><ellipse cx="980" cy="1010" rx="160" ry="34" fill="#BFE0EA" opacity=".8"/><ellipse cx="950" cy="1004" rx="90" ry="12" fill="#fff" opacity=".5"/>`;
  for (let i = 0; i < 40; i++) { const x = -160 + hash(i, 13) * 2240, y = 660 + hash(i, 17) * 520; if (x > 600 && x < 1200 && y > 840) continue; s += `<path d="M${n2(x)} ${n2(y)} q4 -18 0 -26 M${n2(x + 9)} ${n2(y)} q8 -14 10 -22" stroke="#4E9A44" stroke-width="4" stroke-linecap="round" fill="none" opacity=".7"/>`; }
  return s; };
// the pail of rainwater (origin = its base middle): blue plastic, a handle, the water flat and still near the rim, a few leaves floating.
// o.rings [[t0, x]]: rings where a drop fell; o.wrig: wrigglers (seen through the water near the surface); o.pupae; o.t
function pailArt17(t, o = {}) { const w = PAILW, h = PAILH, wb = w * .78, wy = -h + 34; let s = `<ellipse cx="0" cy="6" rx="${w + 20}" ry="18" fill="${P.ink}" opacity=".24" filter="url(#b4)"/>`
    + `<path d="M${-w} ${-h} L${-wb} 0 H${wb} L${w} ${-h}z" fill="url(#e17Pail)" stroke="#1E4E88" stroke-width="6" stroke-linejoin="round"/><path d="M${-w + 24} ${-h + 40} L${-wb + 20} -20" stroke="#8CC8F4" stroke-width="10" opacity=".5" stroke-linecap="round"/>${[-h + 70, -h + 150].map((y) => `<path d="M${n2(-w + (y + h) * (w - wb) / h)} ${y} H${n2(w - (y + h) * (w - wb) / h)}" stroke="#1E4E88" stroke-width="3" opacity=".4"/>`).join("")}`
    + `<ellipse cx="0" cy="${-h}" rx="${w}" ry="30" fill="#2E6FB8" stroke="#1E4E88" stroke-width="6"/><ellipse cx="0" cy="${-h + 6}" rx="${w - 12}" ry="22" fill="url(#e17Water)"/>`;
  // floating leaves, the reflection, the rings
  s += `<g transform="translate(-60 ${-h + 4}) rotate(-20)">${leaf15(46, 18, "#C9A84A", "#8A6A2A")}</g><g transform="translate(40 ${-h + 10}) rotate(160)">${leaf15(40, 16, "#7AB85A", "#3E7A2A")}</g><ellipse cx="30" cy="${-h + 2}" rx="40" ry="5" fill="#fff" opacity=".55"/>`;
  for (const [t0, x] of o.rings || []) { const u = (t - t0) / 1.6; if (u > 0 && u < 1) s += `<ellipse cx="${x}" cy="${-h + 6}" rx="${n2(10 + 70 * u)}" ry="${n2(3 + 14 * u)}" fill="none" stroke="#fff" stroke-width="${n2(4 * (1 - u))}" opacity="${n2(1 - u)}"/>`; }
  if (o.wrig) s += `<clipPath id="pw17${o.id || ""}"><ellipse cx="0" cy="${-h + 6}" rx="${w - 14}" ry="22"/></clipPath><g clip-path="url(#pw17${o.id || ""})">` + [[-70, 0], [-10, 1.3], [60, 2.2], [100, .7]].map(([x, ph], i) => { const dv = o.wrig > 1 ? .5 + .5 * Math.sin(t * 1.4 + ph) : 0; return TF(x + 6 * Math.sin(t * 2 + ph), -h + 4 + 30 * dv, .32, wrig17(t, { wig: .4 + .6 * dv, ph, lean: 60 })); }).join("") + `</g>`;
  if (o.pupae) s += [[-30, 2], [80, 4]].map(([x, ph]) => TF(x, -h + 2, .2, mpupa17(t, { roll: 10 * Math.sin(t * 1.2 + ph) }))).join("");
  s += `<path d="M${-w + 4} ${-h + 6} Q0 ${-h - 150} ${w - 4} ${-h + 6}" stroke="#1E4E88" stroke-width="7" fill="none"/>`;
  return s; }
// the flower pot on its little plate (origin = the plate's middle). o.k
const plantPotPlate = (t, o = {}) => TF(0, 0, o.k || 1, `<ellipse cx="0" cy="6" rx="130" ry="20" fill="${P.ink}" opacity=".2" filter="url(#b4)"/><ellipse cx="0" cy="0" rx="120" ry="24" fill="#C8643E" stroke="#8A3E22" stroke-width="5"/><ellipse cx="0" cy="-4" rx="102" ry="16" fill="#9FD0DE"/><ellipse cx="-30" cy="-6" rx="30" ry="4" fill="#fff" opacity=".6"/>`
  + `<path d="M-80 -10 L-96 -170 H96 L80 -10z" fill="url(#p15Pot)" stroke="#9A4A2A" stroke-width="5"/><rect x="-104" y="-190" width="208" height="28" rx="8" fill="#D9774A" stroke="#9A4A2A" stroke-width="5"/>`
  + `<ellipse cx="0" cy="-188" rx="92" ry="9" fill="url(#p15Soil)"/>` + (() => { const sw = (j) => (k) => 4 * Math.sin(t * 1.2 + j * 2 + k), po = { len: 66, wid: 24, w: 6, wood: "#4E8A3A", stalk: 10, cols: ["#3E9E5A", "#58B56C"] };
    return leafyTwig17([-14, -186, -40, -236, -92, -262], { ...po, n: 3, u0: .2, u1: .75, spread: 55, sw: sw(0) }) + leafyTwig17([14, -186, 50, -230, 96, -250], { ...po, n: 3, u0: .2, u1: .75, spread: 55, sw: sw(1), seed: 1 })
      + leafyTwig17([0, -186, 8, -250, 20, -288], { ...po, n: 2, u0: .3, u1: .65, spread: 60, tip: false, sw: sw(2) }); })() + `<g transform="translate(20 -300)">${[0, 1, 2, 3, 4].map((k) => `<ellipse cx="0" cy="-14" rx="10" ry="15" fill="#F49BC4" transform="rotate(${k * 72})"/>`).join("")}<circle r="7" fill="#FFD75A"/></g>`);
const DFLYAT = { place: [STAKES[1][0], STAKES[1][1] - 6, .34, 0], game: [STAKES[1][0], STAKES[1][1] - 6, .34, 0], waitw: [PAILC[0] + 120, PAILC[1] - PAILH - 16, .3, -20],
  mosqans: [TAPC[0] + 2, TAPC[1] - 240, .3, 0], show: null, fix: [170, 466, .3, 0], liz: [CANC[0] + 2, CANC[1] - 164, .36, -10] };
// VCR: the live far corner. o: rings, wrig (1 hanging, 2 diving), pupae, dflyAt ([..] | false), items, front, dim, noPail
function VCR(t, o = {}, cam) { let s = bg("corner17") + clouds17(t, [[400, 110, .9], [1500, 70, .8]]);
  // drips from the tap and the leaves; a bird shakes its feathers on the bench
  s += drips15(t, [[TAPC[0] + 70, TAPC[1] - 128, 0, 60], [1060, 520, 1.1, 40], [1300, 500, .4, 40]]) + TF(BENCHC[0] + 120, BENCHC[1] - 70, .8, bird15(t, 1, .4));
  if (o.items0) s += o.items0;
  s += TF(PLATEC[0], PLATEC[1], 1, plantPotPlate(t)) + TF(CANC[0], CANC[1], 1, canArt17({ col: "#F2A23A", line: "#B4661E" }));
  if (!o.noPail) s += TF(PAILC[0], PAILC[1], 1, pailArt17(t, { rings: o.rings || [[1e9, 0]], wrig: o.wrig, pupae: o.pupae, id: o.pid }));
  const da = o.dflyAt === undefined ? DFLYAT[(window._S || {}).name] : o.dflyAt; if (da) s += dflyAt(t, da[0], da[1], da[2], { rot: da[3], turn: o.turn || 0 });
  if (o.items) s += o.items;
  s += [[880, 760], [1640, 740], [380, 820]].map(([x, y], i) => lcGlint(x, y, 9, t, i * 1.7)).join("");
  if (o.front) s += o.front;
  if (o.dim) s += `<rect x="-200" y="-120" width="2320" height="1320" fill="${P.night}" opacity="${n2(o.dim)}"/>`;
  return cam ? CAM(s, cam[0], cam[1], cam[2]) : s; }

/* ---------------------------------------------------------------- AN HDB CORRIDOR ---------------------------------------------------------------- */
const PARH = 560, PLATEH = [1180, 900], RAIL = [600, 2120];
BG.corr17 = () => { let s = `<rect x="-200" y="-120" width="2320" height="${PARH + 60}" fill="url(#e17Sky)"/><g opacity=".85">${farBlocks(560, 2140, PARH - 40, 53, 1.1)}</g><g opacity=".5">${farBlocks(500, 2140, PARH - 200, 57, .8)}</g>`;
  // the parapet: a low wall with a rail on top, the tiled floor
  s += `<rect x="560" y="${PARH}" width="1560" height="180" fill="url(#c15Wall)"/><rect x="560" y="${PARH - 16}" width="1560" height="22" rx="6" fill="#E9D6B8"/>${[...Array(14)].map((_, i) => `<rect x="${600 + i * 110}" y="${PARH + 50}" width="70" height="26" rx="4" fill="#D9C2A0"/>`).join("")}`
    + `<path d="M560 ${PARH - 90} H2120" stroke="#8C98A8" stroke-width="10"/>${[...Array(22)].map((_, i) => `<path d="M${600 + i * 72} ${PARH - 90} V${PARH - 14}" stroke="#9AA6B6" stroke-width="5"/>`).join("")}`;
  s += `<rect x="-200" y="${PARH + 180}" width="2320" height="600" fill="url(#e17Tile)"/>${[...Array(16)].map((_, i) => `<path d="M${-200 + i * 160} ${PARH + 180} L${-480 + i * 200} 1200" stroke="#A8957A" stroke-width="2" opacity=".5"/>`).join("")}${[0, 1, 2, 3].map((k) => `<path d="M-200 ${PARH + 230 + k * 80 * (1 + k * .3)} H2120" stroke="#A8957A" stroke-width="2" opacity=".5"/>`).join("")}`;
  // the flat's wall at the left: the door with its gate grille, a window, the shoe rack, the unit number
  s += `<path d="M-200 -120 H560 V${PARH + 180} L560 1200 H-200z" fill="url(#c15Wall)"/><rect x="540" y="-120" width="30" height="${PARH + 300}" fill="#E3CFAE"/>`
    + `<rect x="60" y="160" width="300" height="560" rx="8" fill="#8A5A36" stroke="#5A3A22" stroke-width="6"/><circle cx="320" cy="460" r="10" fill="#E9C46A"/>`
    + `<rect x="40" y="140" width="340" height="590" rx="10" fill="none" stroke="#4A4A5A" stroke-width="10"/>${[...Array(9)].map((_, i) => `<path d="M${76 + i * 34} 146 V724" stroke="#4A4A5A" stroke-width="6"/>`).join("")}${[300, 460].map((y) => `<path d="M44 ${y} H376" stroke="#4A4A5A" stroke-width="6"/>`).join("")}`
    + `<rect x="-160" y="210" width="170" height="200" rx="8" fill="#CFE6F4" stroke="#9AB0C4" stroke-width="8"/><path d="M-75 210 V410" stroke="#9AB0C4" stroke-width="6"/>${T(210, 120, "#12-34", 30, "#7A6A54")}`
    + `<rect x="400" y="600" width="130" height="130" rx="8" fill="#B98A5A" stroke="#7A5230" stroke-width="5"/><path d="M400 665 H530" stroke="#7A5230" stroke-width="5"/>${[[420, 640, "#F6A38F"], [470, 645, "#5B7BD6"], [420, 705, "#FFC38A"], [475, 708, "#8FD3C8"]].map(([x, y, c]) => `<ellipse cx="${x + 18}" cy="${y}" rx="22" ry="10" fill="${c}"/>`).join("")}`;
  // the neighbour's shoes by the next door, far along the parapet's end
  s += `<ellipse cx="1980" cy="${PARH + 230}" rx="26" ry="10" fill="#E0453A"/><ellipse cx="2030" cy="${PARH + 236}" rx="26" ry="10" fill="#E0453A"/>`;
  return s; };
// the potted plants on their plates along the parapet's foot (live leaves); the one we look at is at PLATEH
function corrPlants(t, o = {}) { let s = ""; [[760, PARH + 230, .7], [980, PARH + 240, .75], [PLATEH[0], PLATEH[1], 1.05], [1560, PARH + 250, .8], [1800, PARH + 236, .7]].forEach(([x, y, k], i) => { s += TF(x, y, k, plantPotPlate(t + i)); }); return s; }
// a vase of flowers by the door; a pail turned over
const vaseArt17 = (t) => `<ellipse cx="0" cy="4" rx="60" ry="12" fill="${P.ink}" opacity=".2" filter="url(#b4)"/><path d="M-36 0 Q-60 -80 -24 -130 L-20 -170 H20 L24 -130 Q60 -80 36 0z" fill="#6FA8DC" stroke="#3E6E9E" stroke-width="5" fill-opacity=".85"/><path d="M-30 -100 H30" stroke="#BFE0F4" stroke-width="5"/>${[[-30, -260, "#F49BC4"], [10, -290, "#FFC83A"], [40, -250, "#F49BC4"]].map(([x, y, c]) => `<path d="M0 -170 Q${x / 2} ${y / 2 - 60} ${x} ${y}" stroke="#4E9A44" stroke-width="5" fill="none"/><g transform="translate(${x} ${y})">${[0, 1, 2, 3, 4].map((k) => `<ellipse cx="0" cy="-12" rx="9" ry="13" fill="${c}" transform="rotate(${k * 72 + 4 * Math.sin(t)})"/>`).join("")}<circle r="6" fill="#fff"/></g>`).join("")}`;
const pailOver17 = () => `<ellipse cx="0" cy="4" rx="130" ry="14" fill="${P.ink}" opacity=".2" filter="url(#b4)"/><path d="M-90 -170 L-120 0 H120 L90 -170z" fill="url(#e17Pail)" stroke="#1E4E88" stroke-width="5"/><ellipse cx="0" cy="-170" rx="90" ry="14" fill="#2E6FB8" stroke="#1E4E88" stroke-width="5"/>`;
const DFLYH = { plate: [1340, PARH - 104, .32, 0] };
// VH: the live corridor. o: dflyAt, items, front, dim
function VH(t, o = {}, cam) { let s = bg("corr17") + clouds17(t, [[600, 90, .9], [1500, 140, .7]]);
  // the window's fan turning, a curtain stirring, a far lift light
  s += TF(-75, 310, 1, `<circle r="56" fill="#E9EEF5" opacity=".6"/>${[0, 1, 2].map((i) => `<ellipse cx="0" cy="-28" rx="12" ry="28" fill="#B9C6D4" transform="rotate(${n2(i * 120 + t * 500)})"/>`).join("")}<circle r="9" fill="#8C98A8"/>`) + `<path d="M-150 216 Q${n2(-130 + 8 * Math.sin(t * 1.3))} 300 -150 400" stroke="#F6A38F" stroke-width="16" fill="none" opacity=".8"/>`;
  s += TF(470, PARH + 330, .9, vaseArt17(t)) + TF(380, PARH + 420, .8, pailOver17());
  if (o.items0) s += o.items0;
  s += corrPlants(t, o);
  const da = o.dflyAt === undefined ? DFLYH[(window._S || {}).name] : o.dflyAt; if (da) s += dflyAt(t, da[0], da[1], da[2], { rot: da[3] });
  if (o.items) s += o.items;
  if (o.front) s += o.front;
  if (o.dim) s += `<rect x="-200" y="-120" width="2320" height="1320" fill="${P.night}" opacity="${n2(o.dim)}"/>`;
  return cam ? CAM(s, cam[0], cam[1], cam[2]) : s; }

/* ---------------------------------------------------------------- THE VOID DECK ---------------------------------------------------------------- */
const TABLEV = [1020, 800];
BG.void17 = () => { let s = `<rect x="-200" y="-120" width="2320" height="1320" fill="#E9E1D2"/><rect x="-200" y="-120" width="2320" height="200" fill="#D9CFBC"/><rect x="-200" y="70" width="2320" height="16" fill="#C9BCA4"/>`;
  // the bright garden beyond (right), the back wall with the letterboxes (left)
  s += `<rect x="1300" y="86" width="820" height="620" fill="url(#e17Sky)"/><rect x="1300" y="560" width="820" height="160" fill="url(#g14Grass)"/>${[...Array(6)].map((_, i) => `<circle cx="${1360 + i * 140}" cy="580" r="${50 + 20 * hash(i, 3)}" fill="${i % 2 ? "#5FB56C" : "#7CC97A"}"/>`).join("")}`
    + `<rect x="-200" y="86" width="1500" height="620" fill="#F2E8D6"/><rect x="40" y="260" width="420" height="250" rx="10" fill="#B9C4D0" stroke="#7A8798" stroke-width="5"/>${[...Array(30)].map((_, i) => `<rect x="${56 + (i % 10) * 40}" y="${276 + Math.floor(i / 10) * 76}" width="32" height="62" rx="4" fill="#D9E1EA" stroke="#8C98A8" stroke-width="2"/>`).join("")}`
    + `<rect x="620" y="300" width="200" height="150" rx="8" fill="#7A5A34"/><rect x="632" y="312" width="176" height="126" fill="#F4E6C8"/><rect x="650" y="330" width="70" height="50" fill="#FFC38A"/><rect x="734" y="330" width="56" height="90" fill="#8FD3C8"/>`;
  s += `<rect x="-200" y="700" width="2320" height="500" fill="url(#e17Deck)"/>${[...Array(12)].map((_, i) => `<path d="M${-200 + i * 220} 700 L${-500 + i * 300} 1200" stroke="#B8AE9C" stroke-width="2" opacity=".6"/>`).join("")}<path d="M-200 820 H2120 M-200 980 H2120" stroke="#B8AE9C" stroke-width="2" opacity=".5"/>`;
  // the square pillars
  [[-60, 140], [560, 150], [1280, 170], [1940, 190]].forEach(([x, w]) => { s += `<rect x="${x}" y="86" width="${w}" height="${700 - 86 + w * .3}" fill="#F7EFE0" stroke="#D9CBB2" stroke-width="4"/><rect x="${x + w - 30}" y="86" width="30" height="${700 - 86 + w * .3}" fill="#E3D6BE"/>`; });
  // the stone table and its stools
  { const [tx, ty] = TABLEV; s += `<ellipse cx="${tx}" cy="${ty + 170}" rx="320" ry="30" fill="${P.ink}" opacity=".2" filter="url(#b4)"/><path d="M${tx - 60} ${ty} L${tx - 80} ${ty + 170} H${tx + 80} L${tx + 60} ${ty}z" fill="#BFB6A6" stroke="#8C8272" stroke-width="5"/><ellipse cx="${tx}" cy="${ty}" rx="290" ry="56" fill="#D6CDBC" stroke="#8C8272" stroke-width="5"/><ellipse cx="${tx}" cy="${ty - 6}" rx="260" ry="42" fill="#E3DACA"/>`
    + [[-380, 120], [380, 120]].map(([dx, dy]) => `<path d="M${tx + dx - 50} ${ty + dy - 30} L${tx + dx - 40} ${ty + dy + 60} H${tx + dx + 40} L${tx + dx + 50} ${ty + dy - 30}z" fill="#BFB6A6" stroke="#8C8272" stroke-width="4"/><ellipse cx="${tx + dx}" cy="${ty + dy - 30}" rx="70" ry="20" fill="#D6CDBC" stroke="#8C8272" stroke-width="4"/>`).join(""); }
  return s; };
function VD(t, o = {}, cam) { let s = bg("void17");
  // the ceiling fan turning; a pigeon walking past
  s += `<path d="M960 86 V130" stroke="#6E6A60" stroke-width="8"/>` + TF(960, 140, 1, `<ellipse rx="210" ry="12" fill="#8C8272" transform="scale(${n2(Math.cos(t * 12))} 1)"/><ellipse rx="12" ry="210" fill="#8C8272" transform="scale(1 ${n2(.06)})"/><circle r="22" fill="#6E6A60"/>`);
  { const u = (t / 14) % 1, x = 2100 - 2500 * u, st = Math.sin(t * 9); s += TF(x, 1010 + 3 * Math.abs(st), 1, `<!--FACES:left pigeon--><ellipse cx="0" cy="-30" rx="40" ry="26" fill="#8A90A8"/><circle cx="-36" cy="-58" r="16" fill="#7A809A"/><circle cx="-40" cy="-60" r="3.5" fill="#E0453A"/><path d="M-52 -56 l-10 4 l10 3" fill="#E9C46A"/><path d="M-4 -40 Q20 -50 40 -24" fill="#6E7490"/><path d="M${n2(-8 + 6 * st)} -6 v10 M${n2(8 - 6 * st)} -6 v10" stroke="#E0786A" stroke-width="4"/>`); }
  if (o.items) s += o.items;
  if (o.front) s += o.front;
  if (o.dim) s += `<rect x="-200" y="-120" width="2320" height="1320" fill="${P.night}" opacity="${n2(o.dim)}"/>`;
  return cam ? CAM(s, cam[0], cam[1], cam[2]) : s; }
