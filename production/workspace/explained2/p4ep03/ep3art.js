// ep3art.js: P4 EP3 "The Case of the Mystery Leaf": the new art, drawn in code in the series' painted-cartoon style (dark rounded outlines,
// soft gradients, warm light), on top of EP2's ep2art.js (GLITCH, the Help Desk, the props). Script ../p4/p4_ep03_script.md, section 6b.
//   leaves: hibLeaf (THE mystery leaf: oval, pointed tip, JAGGED edge, net veins, a leaf stalk, the same small dusty mark in every shot),
//           mangoLeaf (long, oblong to lance-shaped, a STRAIGHT (smooth, slightly wavy) edge, net veins, a stalk; young = coppery red),
//           pandanLeaf (a long strap, PARALLEL veins, pointed tip, no leaf stalk)
//   plants: the pandan in its big pot, the mango tree (with a bunch of young reddish leaves), the hibiscus hedge (red flowers), drawn true
//           (NParks Flora & Fauna Web, checked 28 Nov 2026; the script's section 2)
//   the set: BG.vd3 (baked): EP2's void deck (vdv2, one 214 plaque) with the mango tree in the open side at the left, the pandan pot by
//           the letterboxes, the hibiscus hedge in a planter in front of the bicycle bay, Uncle Lim's stone table beside it
//   props: the tape roll and strips, swatches, ruler, tape measure, Pip's clipboard, the basket, the case board with mugshots and red
//           string, CLEARED / CASE CLOSED stamps, Basil's detective hat (a deerstalker, INSTEAD of his helmet), the cactus cameo, the insets
const INK3 = "#2B2147";
/* ================================================================ leaves ================================================================ */
// a leaf outline along +x from the blade's base (0, 0) to its tip (L, 0): half-width W * prof(u); teeth: n small saw teeth pointing to the
// tip (a jagged edge); wav: a gentle wave (a straight, smooth edge)
function leafOutline(L, W, prof, o = {}) { const n = o.n || 72, up = [], lo = [];
  for (let i = 0; i <= n; i++) { const u = i / n, w = W * prof(u); let d = 0;
    if (o.teeth) { const f = (u * o.teeth) % 1; d = o.tAmp * (f < .78 ? f / .78 : (1 - f) / .22) * Math.min(1, u * 8, (1 - u) * 6); }
    if (o.wav) d += o.wav * Math.sin(u * Math.PI * 7) * Math.min(1, u * 5, (1 - u) * 4);
    up.push([L * u, -(w + d)]); lo.push([L * u, w + d * (o.teeth ? 1 : -1)]); }
  const pts = up.concat(lo.reverse()); return "M" + pts.map(([x, y]) => `${n2(x)} ${n2(y)}`).join(" L") + "Z"; }
const PROF_HIB = (u) => Math.pow(Math.max(0, Math.sin(Math.PI * Math.pow(u, .82))), .85) * (u > .88 ? 1 - (u - .88) * 2.2 : 1);
const PROF_MANGO = (u) => Math.pow(Math.max(0, Math.sin(Math.PI * Math.pow(u, .72))), 1.1);
// net veins: a main vein, side veins curving towards the tip, and the small veins between them that split and join (a net)
function netVeins(L, W, prof, col, sw = 3, o = {}) { let s = `<path d="M-2 0 Q${n2(L * .5)} ${n2(-W * .04)} ${n2(L * .97)} 0" stroke="${col}" stroke-width="${n2(sw * 1.8)}" fill="none" stroke-linecap="round"/>`;
  const k = o.k || 6, side = [];
  for (let i = 0; i < k; i++) { const u = .1 + .78 * i / (k - 1), x0 = L * u; for (const sg of [-1, 1]) { const u1 = Math.min(.97, u + .16), x1 = L * u1, y1 = sg * W * prof(u1) * .86, cx = (x0 + x1) / 2 - L * .02, cy = sg * W * prof(u) * .55;
      s += `<path d="M${n2(x0)} 0 Q${n2(cx)} ${n2(cy)} ${n2(x1)} ${n2(y1)}" stroke="${col}" stroke-width="${n2(sw)}" fill="none" stroke-linecap="round"/>`; side.push([sg, u, u1]); } }
  if (o.net !== false) { const fine = (i, j) => hash(i * 13 + j, 7);   // the net: small veins joining neighbouring side veins
    for (let i = 0; i < k - 1; i++) for (const sg of [-1, 1]) for (let j = 0; j < 4; j++) { const f = .25 + .5 * fine(i, j), ua = .1 + .78 * (i + f * .6) / (k - 1), ub = ua + .1;
      const xa = L * (ua + .05), ya = sg * W * prof(ua) * (.25 + .2 * j), xb = L * (ub + .03), yb = sg * W * prof(ub) * (.3 + .17 * j);
      s += `<path d="M${n2(xa)} ${n2(ya)} L${n2((xa + xb) / 2 + 6)} ${n2((ya + yb) / 2 + sg * 6)} L${n2(xb)} ${n2(yb)}" stroke="${col}" stroke-width="${n2(sw * .55)}" fill="none" stroke-linecap="round" opacity=".85"/>`; } }
  return s; }
// THE MYSTERY LEAF (a hibiscus leaf). origin = the base of the blade (where the stalk joins), the tip at +x. o.glow: lit from behind (the
// veins glow); o.hi = { blade, edge, stalk, main, small } highlights 0..1; o.stalk = false hides the stalk; o.noMark
function hibLeaf(o = {}) { const L = 300, W = 108, d = leafOutline(L, W, PROF_HIB, { teeth: 19, tAmp: 9 }), gl = o.glow || 0, hi = o.hi || {}, id = (o.id || "hl") + (gl ? "g" : "");
  const fillA = gl ? "#7FCB4E" : "#5BAE3E", fillB = gl ? "#C9EE7A" : "#3F8F2E", vc = gl ? "#F4FFC8" : "#2C6A1C";
  let s = `<defs>${lg(id + "G", [[0, fillA], [1, fillB]], 1, 1)}</defs>`;
  if (o.stalk !== false) s += `<path d="M2 0 Q-40 6 -78 18" stroke="${INK3}" stroke-width="15" fill="none" stroke-linecap="round"/><path d="M2 0 Q-40 6 -78 18" stroke="${hi.stalk ? "#FFE27A" : "#6FA83A"}" stroke-width="8" fill="none" stroke-linecap="round"/>`;
  if (hi.blade) s += `<path d="${d}" fill="#FFE27A" opacity="${n2(.6 * hi.blade)}" transform="scale(1.06)" filter="url(#b4)"/>`;
  s += `<path d="${d}" fill="url(#${id}G)" stroke="${INK3}" stroke-width="6" stroke-linejoin="round"/>`;
  if (gl) s += `<path d="${d}" fill="#FFF6B0" opacity="${n2(.25 * gl)}"/>`;
  s += netVeins(L, W, PROF_HIB, vc, gl ? 3.6 : 3, { k: 6 });
  if (hi.main) s += `<path d="M0 0 Q150 -4 ${n2(L * .97 * hi.main)} 0" stroke="#FFE27A" stroke-width="9" fill="none" stroke-linecap="round" opacity=".95"/>`;
  if (hi.small) s += `<g opacity="${n2(hi.small)}">${netVeins(L, W, PROF_HIB, "#FFE27A", 4.2, { k: 6 })}</g>`;
  if (hi.edge) s += `<path d="${d}" fill="none" stroke="#FFE27A" stroke-width="9" stroke-dasharray="${n2(1400 * hi.edge)} 2000" stroke-linejoin="round"/>`;
  if (!o.noMark) s += `<ellipse cx="205" cy="-34" rx="11" ry="7" fill="#8A7A5A" opacity=".45"/><ellipse cx="214" cy="-30" rx="5" ry="3.5" fill="#8A7A5A" opacity=".35"/>`;   // the same small dusty mark
  s += `<path d="M40 -40 Q110 -78 190 -50" stroke="#fff" stroke-width="6" fill="none" opacity=".22" stroke-linecap="round"/>`;
  return s; }
// a mango leaf: long, oblong to lance-shaped, a smooth slightly wavy ("straight") edge, net veins, a short stalk. o.young: smaller, coppery red
function mangoLeaf(o = {}) { const y = o.young, L = y ? 230 : 400, W = y ? 36 : 58, d = leafOutline(L, W, PROF_MANGO, { wav: 2.2 }), id = o.id || (y ? "mly" : "mlo"), hi = o.hi || {};
  let s = `<defs>${lg(id + "G", y ? [[0, "#D9774B"], [1, "#9E3F2A"]] : [[0, "#3E8F43"], [1, "#22602C"]], 1, 1)}</defs>`;
  s += `<path d="M2 0 Q-26 3 -50 10" stroke="${INK3}" stroke-width="13" fill="none" stroke-linecap="round"/><path d="M2 0 Q-26 3 -50 10" stroke="${y ? "#C9764E" : "#7DAA4A"}" stroke-width="6" fill="none" stroke-linecap="round"/>`;
  s += `<path d="${d}" fill="url(#${id}G)" stroke="${INK3}" stroke-width="6" stroke-linejoin="round"/>` + netVeins(L, W, PROF_MANGO, y ? "#F2B48E" : "#A8D58A", 2.8, { k: 7 });
  if (hi.edge) s += `<path d="${d}" fill="none" stroke="#FFE27A" stroke-width="9" stroke-dasharray="${n2(1600 * hi.edge)} 2000" stroke-linejoin="round"/>`;
  return s + `<path d="M50 -20 Q160 -40 280 -24" stroke="#fff" stroke-width="5" fill="none" opacity=".18" stroke-linecap="round"/>`; }
// a pandan leaf: a long strap (no leaf stalk: its base clasps the stem), parallel veins side by side from end to end, a pointed tip.
// L = its length; o.curve = the strap's droop (px at the tip); o.hi = the parallel veins lit
function pandanLeaf(L = 600, o = {}) { const W = o.w || 30, c = o.curve || 0, n = 40, up = [], lo = [], mid = [];
  for (let i = 0; i <= n; i++) { const u = i / n, w = W * (u < .82 ? 1 - .15 * u : (1 - .15 * .82) * (1 - u) / .18), x = L * u, y = c * u * u; up.push([x, y - w]); lo.push([x, y + w]); mid.push([x, y]); }
  const d = "M" + up.concat(lo.slice().reverse()).map(([x, y]) => `${n2(x)} ${n2(y)}`).join(" L") + "Z";
  let s = `<path d="${d}" fill="${o.fill || "#3E9B3A"}" stroke="${INK3}" stroke-width="6" stroke-linejoin="round"/>`;
  for (const f of [-.62, -.3, 0, .3, .62]) s += `<path d="M${mid.filter((_, i) => i < n * .97).map(([x, y], i) => `${n2(x)} ${n2(y + f * W * (i / n < .82 ? 1 - .15 * i / n : (1 - .15 * .82) * (1 - i / n) / .18))}`).join(" L")}" stroke="${o.hi ? "#FFE27A" : f === 0 ? "#2A7428" : "#2F8230"}" stroke-width="${o.hi ? 4 : f === 0 ? 4 : 2.4}" fill="none" opacity="${o.hi ? 1 : .9}"/>`;
  return s + `<path d="M${n2(L * .08)} ${n2(-W * .55)} L${n2(L * .5)} ${n2(c * .25 - W * .5)}" stroke="#fff" stroke-width="4" opacity=".2"/>`; }

/* ================================================================ the plants ================================================================ */
// the pandan in its big glazed pot: strap leaves in a spiral from a short stem; origin = the pot's base centre. o.taped: a mango leaf taped
// in among the straps (the cold open; GLITCH peels it off at `peel`); o.noFront: leave out the front leaf (the scene draws it, flopping)
const PANDAN_LV = [[-62, 430, -40], [-38, 470, -22], [-14, 500, -6], [12, 490, 10], [36, 460, 26], [58, 420, 42], [-80, 360, -58], [80, 350, 60], [-50, 330, -74], [52, 320, 80], [0, 380, -90], [-20, 300, 100]];
function pandanPlant(t, o = {}) { let s = `<ellipse cx="0" cy="4" rx="150" ry="18" fill="${INK3}" opacity=".2"/>`;
  const back = PANDAN_LV.slice(6), front = PANDAN_LV.slice(0, 6), sway = (i) => 1.2 * Math.sin(t * 1.3 + i);
  const leaf = ([dx, len, ang], i) => `<g transform="translate(${dx * .3} -150) rotate(${n2(-90 + ang * .9 + sway(i))})">${pandanLeaf(len, { w: 22, curve: ang * 2.4, fill: ["#3E9B3A", "#48A842", "#358C33"][i % 3] })}</g>`;
  s += back.map((l, i) => leaf(l, i + 6)).join("");
  s += `<path d="M-120 -170 L120 -170 L96 0 L-96 0Z" fill="url(#pdPot)" stroke="${INK3}" stroke-width="7" stroke-linejoin="round"/><rect x="-132" y="-190" width="264" height="34" rx="12" fill="#2E7FA8" stroke="${INK3}" stroke-width="7"/><path d="M-100 -120 Q0 -96 100 -120" stroke="#fff" stroke-width="6" fill="none" opacity=".35"/>`;
  s += front.filter((_, i) => !(o.noFront && i === 2)).map((l, i) => leaf(l, i)).join("");
  if (o.taped) s += `<g transform="translate(40 -420) rotate(-70) scale(.42)">${mangoLeaf({ id: "mlt" })}</g>` + tapeX(40, -420 + 8, .9, -20) + tapeX(52, -360, .7, 30);
  return s; }
const XDEFSE3 = () => lg("pdPot", [[0, "#5BB7DE"], [1, "#2D7FA6"]]) + lg("hbPlanter", [[0, "#C9B79A"], [1, "#A8977B"]]) + lg("mgTrunk", [[0, "#8A5A34"], [1, "#5E3A20"]], 1, 0) + lg("cork", [[0, "#D7A86E"], [1, "#B98A52"]], 1, 1);
// a strip of clear sticky tape (x, y centre, k scale, rotation)
const tapeX = (x, y, k = 1, r = 0) => `<g transform="translate(${n2(x)} ${n2(y)}) rotate(${r}) scale(${k})"><rect x="-40" y="-13" width="80" height="26" rx="3" fill="#F6E7B8" opacity=".78" stroke="#C8B27A" stroke-width="2"/><path d="M-34 -7 H30" stroke="#fff" stroke-width="4" opacity=".7"/></g>`;
// a mango-tree leaf cluster (small leaves at the tree's depth); y = young (coppery red)
const mgCluster = (x, y, k, n, ang, young) => { let s = ""; for (let i = 0; i < n; i++) { const a = ang + (i - (n - 1) / 2) * 24 + 6 * hash(i + x, 3);
    s += `<g transform="translate(${n2(x)} ${n2(y)}) rotate(${n2(a)}) scale(${n2(k * (.85 + .3 * hash(i + y, 5)))})"><path d="${leafOutline(64, 10, PROF_MANGO, { n: 16 })}" fill="${young ? ["#C9643E", "#B4532F"][i % 2] : ["#2F7D3A", "#3B8F45", "#276B31"][i % 3]}" stroke="${INK3}" stroke-width="2.5" stroke-linejoin="round"/><path d="M0 0 L60 0" stroke="${young ? "#F0A47E" : "#7FBF6A"}" stroke-width="1.6"/></g>`; } return s; };
// the mango tree (world coordinates, in the void deck's open side): a trunk on the grass, branches, a crown of long dark leaves, a bunch of
// young coppery-red leaves low at the right (the o405 inset points at it), a low branch reaching to the pillar
function mangoTreeV3() { let s = `<path d="M110 676 Q118 520 128 400 Q100 330 40 280 M128 400 Q170 330 250 300 M126 470 Q200 450 330 470" stroke="url(#mgTrunk)" stroke-width="44" fill="none" stroke-linecap="round"/>`
    + `<path d="M110 676 Q118 520 128 400" stroke="${INK3}" stroke-width="5" fill="none" opacity=".5"/><path d="M92 676 Q120 690 150 676" stroke="#5E3A20" stroke-width="20" stroke-linecap="round"/>`;
  const crown = [[-170, 170], [-90, 140], [0, 120], [90, 150], [190, 160], [280, 190], [-200, 260], [-110, 230], [-10, 220], [80, 240], [180, 250], [290, 270], [-150, 340], [-40, 320], [60, 330], [-180, 410]];
  crown.forEach(([x, y], i) => { s += `<ellipse cx="${x}" cy="${y}" rx="${80 + 14 * hash(i, 2)}" ry="${58 + 10 * hash(i, 4)}" fill="${["#2E6F34", "#367D3C", "#285F2E"][i % 3]}"/>`; });
  crown.forEach(([x, y], i) => { s += mgCluster(x, y + 10, .9, 5, 70 + 40 * hash(i, 9), false); });
  s += mgCluster(300, 460, 1.0, 5, 80, false) + mgCluster(250, 330, 1.05, 5, 95, true) + mgCluster(220, 350, .9, 4, 70, true);   // the low branch; the young red leaves
  return s; }
// the hibiscus hedge in a long planter (world coordinates): oval leaves with jagged edges, red hibiscus flowers; origin = the planter's
// front-left foot. W = width
function hibHedgeV3(W = 560) { let s = `<rect x="0" y="-96" width="${W}" height="96" rx="8" fill="url(#hbPlanter)" stroke="${INK3}" stroke-width="6"/><path d="M8 -70 H${W - 8}" stroke="#E2D4BA" stroke-width="6" opacity=".7"/>`;
  for (let i = 0; i < 9; i++) s += `<ellipse cx="${n2(30 + i * (W - 60) / 8)}" cy="${n2(-190 - 40 * hash(i, 3))}" rx="${n2(90 + 20 * hash(i, 5))}" ry="${n2(120 + 30 * hash(i, 7))}" fill="${["#2E7A36", "#378A3F", "#2A6E31"][i % 3]}"/>`;
  for (let i = 0; i < 70; i++) { const x = 10 + hash(i, 11) * (W - 20), y = -110 - hash(i, 13) * 230, a = hash(i, 17) * 360;
    s += `<g transform="translate(${n2(x)} ${n2(y)}) rotate(${n2(a)}) scale(.17)"><path d="${leafOutline(300, 108, PROF_HIB, { teeth: 15, tAmp: 11, n: 30 })}" fill="${["#4FA23A", "#3F8F2E", "#5BAE3E"][i % 3]}" stroke="${INK3}" stroke-width="12" stroke-linejoin="round"/><path d="M0 0 L290 0" stroke="#2C6A1C" stroke-width="8"/></g>`; }
  for (let i = 0; i < 9; i++) { const x = 40 + hash(i, 21) * (W - 80), y = -140 - hash(i, 23) * 180; s += TF(x, y, .5 + .15 * hash(i, 25), hibFlower(), hash(i, 27) * 60); }
  return s; }
// a red hibiscus flower (five petals, the long red stamen with yellow pollen)
const hibFlower = () => [0, 1, 2, 3, 4].map((i) => `<g transform="rotate(${i * 72})"><path d="M0 0 Q-34 -40 -18 -70 Q0 -84 18 -70 Q34 -40 0 0Z" fill="#E5333B" stroke="#8E1A22" stroke-width="4"/></g>`).join("") + `<circle r="12" fill="#9E1E24"/><path d="M0 0 L30 -34" stroke="#C9252E" stroke-width="5"/><circle cx="32" cy="-37" r="6" fill="#FFD23F"/>`;
// Uncle Lim's round stone table and two stools (world)
const stoneTableV3 = () => `<ellipse cx="0" cy="44" rx="130" ry="18" fill="${INK3}" opacity=".15"/><rect x="-22" y="-26" width="44" height="70" fill="#B9B2A5"/><ellipse cx="0" cy="-30" rx="110" ry="26" fill="#D2CBBE" stroke="#A39B8C" stroke-width="5"/>`
  + [[-150, 26], [150, 26]].map(([x, y]) => `<rect x="${x - 22}" y="${y - 8}" width="44" height="34" fill="#B9B2A5"/><ellipse cx="${x}" cy="${y - 10}" rx="30" ry="10" fill="#D2CBBE" stroke="#A39B8C" stroke-width="4"/>`).join("")
  + `<g transform="translate(40 -46)"><rect x="-14" y="-24" width="28" height="26" rx="5" fill="#fff" stroke="#8A5A2B" stroke-width="3"/><path d="M14 -16 q12 2 0 12" stroke="#8A5A2B" stroke-width="3" fill="none"/></g>`;
// THE SET: the void deck (EP2's vdv2, one 214 on the middle pillar) with the three suspects; the chalk race line of EP1 is gone (repaved)
const PANDAN_AT = [250, 948, .78], HEDGE_AT = [1560, 952, 600], TABLE_AT = [1440, 912, .6];
window.BG_OBST = Object.assign(window.BG_OBST || {}, { vd3: [[VD_PLAQUE_X + 16, 220, 88, 60, "214"]] });
BG.vd3 = () => { let s = BG.vdv2();
  s += `<clipPath id="vd3open"><rect x="-200" y="120" width="560" height="560"/></clipPath><g clip-path="url(#vd3open)"><rect x="-200" y="120" width="560" height="560" fill="url(#vdSky)"/>${blockP4(-160, 190, 260, 420, "#EAD9F0", "#E58A6B")}<rect x="-200" y="600" width="560" height="80" fill="url(#vdGrass)"/>${mangoTreeV3()}</g>`;
  for (const x of [360]) s += `<rect x="${x}" y="30" width="120" height="740" fill="#EFE6D6" stroke="#CFC3AD" stroke-width="5"/><rect x="${x}" y="730" width="120" height="40" fill="#D9CDB8"/>`;   // the pillar again, in front of the low branch
  s += `<rect x="-200" y="900" width="2320" height="320" fill="url(#floorV2)"/><path d="M-200 900 H2120" stroke="#B5AA95" stroke-width="5"/>`;
  for (let i = 0; i < 26; i++) s += `<path d="M${-200 + i * 100} 900 L${-520 + i * 140} 1210" stroke="#C2B8A4" stroke-width="3" opacity=".65"/>`;
  for (const y of [960, 1040, 1130]) s += `<path d="M-200 ${y} H2120" stroke="#C2B8A4" stroke-width="3" opacity=".65"/>`;
  s += TF(TABLE_AT[0], TABLE_AT[1], TABLE_AT[2], stoneTableV3()) + TF(HEDGE_AT[0], HEDGE_AT[1], 1, hibHedgeV3(HEDGE_AT[2])) + TF(PANDAN_AT[0], PANDAN_AT[1], PANDAN_AT[2], pandanPlant(0));
  return s; };
// the taped leaves of the cold open (live, over the baked set; gone after GLITCH's peel-off): a mango leaf among the pandan's straps, a
// pandan leaf on the mango trunk, a mango leaf on the hibiscus hedge; k = 1 on, 0 peeled (each leaf has its own peel time)
function tapedLeaves(t, pe = [9e9, 9e9, 9e9]) { let s = ""; const off = (i) => clamp((t - pe[i]) / .35), on = (i) => off(i) < 1;
  if (on(0)) s += OP(1 - off(0), TF(PANDAN_AT[0] + 30 * PANDAN_AT[2], PANDAN_AT[1] - 400 * PANDAN_AT[2] - 40 * off(0), PANDAN_AT[2], `<g transform="rotate(-68) scale(.44)">${mangoLeaf({ id: "tp1" })}</g>` + tapeX(0, 6, .9, -20) + tapeX(14, 70, .7, 30)));
  if (on(1)) s += OP(1 - off(1), TF(124, 560 - 30 * off(1), .5, `<g transform="rotate(-84)">${pandanLeaf(330, { w: 20, curve: 30 })}</g>` + tapeX(4, -40, 1.1, 8) + tapeX(10, -230, 1, -6)));
  if (on(2)) s += OP(1 - off(2), TF(HEDGE_AT[0] + 330, HEDGE_AT[1] - 260 - 30 * off(2), .55, `<g transform="rotate(-20)">${mangoLeaf({ id: "tp3" })}</g>` + tapeX(60, -10, 1.3, 70) + tapeX(250, -60, 1.1, 60)));
  return s; }

/* ================================================================ props ================================================================ */
// GLITCH's sticky-tape roll (clear tape on a cardboard core, a cutter edge): held in front of his crossed arms (local units of glitchV3)
const tapeRoll = (k = 1, rot = 0) => `<g transform="scale(${k}) rotate(${rot})"><circle r="78" fill="#F3E2AE" stroke="${INK3}" stroke-width="7" opacity=".95"/><circle r="66" fill="none" stroke="#fff" stroke-width="5" opacity=".5"/><circle r="40" fill="#C99A5B" stroke="${INK3}" stroke-width="6"/><circle r="28" fill="#2B2147" opacity=".35"/><path d="M-30 -60 A66 66 0 0 1 40 -55" stroke="#fff" stroke-width="7" fill="none" opacity=".6" stroke-linecap="round"/><path d="M60 40 L96 52 L92 66 L54 56Z" fill="#B9C1CB" stroke="${INK3}" stroke-width="4"/></g>`;
// GLITCH with his tape (EP2's painting, "crossed" arms, the roll in front of them; o.strip: a strip hanging from the roll, 0..1 pulled)
function glitchTape(t, o = {}) { const g = glitchV3(t, { pose: "crossed", ...o }); const st = o.strip || 0;
  return g + `<g transform="translate(0 -300)">${tapeRoll(1.05)}${st > 0 ? `<path d="M70 60 L${n2(70 + 40 * st)} ${n2(60 + 170 * st)}" stroke="#F3E2AE" stroke-width="40" opacity=".8" stroke-linecap="butt"/>` : ""}</g>`; }
// the screen: LEAF RETURN SERVICE (title line, small icons), OWNER: ..., the laugh meter, a thumbs-up icon, the parts check (unit square)
const scrTxt = (y, txt, size = .085, col = "#9FFFE0") => `<text x=".5" y="${y}" font-family="Fredoka" font-weight="700" font-size="${size}" text-anchor="middle" fill="${col}">${esc(txt)}</text>`;
const scrBox = (y, h) => `<rect x=".07" y="${y}" width=".86" height="${h}" rx=".04" fill="#0E3A3A" opacity=".88"/>`;
const scrLRS = () => scrBox(.06, .2) + scrTxt(.14, "LEAF RETURN", .075) + scrTxt(.225, "SERVICE", .075);
const scrOwner = (txt, tick) => scrBox(.72, .2) + scrTxt(.84, "OWNER: " + txt + (tick ? " ✓" : ""), txt.length > 10 ? .055 : .07);
const scrLaugh = () => scrBox(.06, .22) + scrTxt(.14, "LAUGHTER", .06) + `<rect x=".2" y=".18" width=".6" height=".05" rx=".02" fill="#2E5F5F"/>` + scrTxt(.25, "0", .05, "#FFB3A0");
const scrThumb = () => `<g transform="translate(.82 .2) scale(.0018)"><path d="M-30 20 h30 v60 h-30z M0 20 q30 -10 30 -60 q20 -10 25 20 l-5 30 h40 q15 5 10 25 l-12 45 q-5 12 -20 12 h-68z" fill="#9FFFE0" stroke="#0E3A3A" stroke-width="10"/></g>`;
const scrParts = (u) => scrBox(.72, .22) + ["BLADE", "STALK", "VEINS"].map((w, i) => `<text x="${.2 + i * .3}" y=".82" font-family="Fredoka" font-weight="700" font-size=".05" text-anchor="middle" fill="#9FFFE0">${w}</text>` + (u > (i + 1) / 3.2 ? `<text x="${.2 + i * .3}" y=".9" font-family="Fredoka" font-weight="700" font-size=".07" text-anchor="middle" fill="#3FE0B0">✓</text>` : "")).join("");
// the colour swatch strips Momo fans out; the ruler; the tape measure; Pip's clipboard; the basket
const swatchFan = (k = 1) => `<g transform="scale(${k})">${["#4FA23A", "#5BAE3E", "#3F8F2E"].map((c, i) => `<g transform="rotate(${-20 + i * 20}) translate(0 -70)"><rect x="-20" y="-60" width="40" height="120" rx="6" fill="#fff" stroke="${INK3}" stroke-width="4"/><rect x="-14" y="-52" width="28" height="70" rx="3" fill="${c}"/></g>`).join("")}<circle r="9" fill="#8C96A2" stroke="${INK3}" stroke-width="3"/></g>`;
const rulerV3 = (L = 300) => `<rect x="${-L / 2}" y="-20" width="${L}" height="40" rx="5" fill="#FFD75A" stroke="${INK3}" stroke-width="5"/>` + [...Array(Math.floor(L / 20) + 1)].map((_, i) => `<path d="M${-L / 2 + 8 + i * 20} -20 v${i % 5 ? 12 : 22}" stroke="${INK3}" stroke-width="3"/>`).join("");
const tapeMeasureV3 = () => `<rect x="-48" y="-48" width="96" height="96" rx="24" fill="#F2A93B" stroke="${INK3}" stroke-width="6"/><circle r="22" fill="#FFE08A" stroke="${INK3}" stroke-width="4"/><path d="M48 30 H120" stroke="#FFD75A" stroke-width="16"/><path d="M60 24 v12 M80 24 v12 M100 24 v12" stroke="${INK3}" stroke-width="3"/>`;
const clipPip = () => `<g filter="url(#dropS)"><rect x="-70" y="-90" width="140" height="180" rx="10" fill="#C99A5B" stroke="#7A5226" stroke-width="5"/></g><rect x="-58" y="-70" width="116" height="150" rx="4" fill="#fff"/><rect x="-26" y="-102" width="52" height="24" rx="6" fill="#8C96A2" stroke="#59616B" stroke-width="3"/>` + [0, 1, 2, 3].map((i) => `<path d="M-44 ${-40 + i * 30} H44" stroke="#C7D0DB" stroke-width="5"/>`).join("") + T(0, -48, "LEAF CASE", 16, INK3);
const toolsBundle = () => TF(-40, 10, .55, rulerV3(260), -60) + TF(30, 0, .45, tapeMeasureV3()) + TF(0, -10, .55, clipPip(), 8);
const basketV3 = (n = 0) => `<path d="M-90 -50 L90 -50 L70 30 L-70 30Z" fill="#C99A5B" stroke="#7A5226" stroke-width="6"/>` + [-50, 0, 50].map((x) => `<path d="M${x} -50 L${x * .8} 30" stroke="#8A6234" stroke-width="4"/>`).join("") + `<path d="M-80 -16 H80" stroke="#8A6234" stroke-width="4"/>`
  + (n > 0 ? `<g transform="translate(-30 -54) rotate(-20) scale(.22)">${mangoLeaf({ id: "bk1" })}</g>` : "") + (n > 1 ? `<g transform="translate(20 -60) rotate(10) scale(.3)">${pandanLeaf(300, { w: 20 })}</g>` : "") + (n > 2 ? `<g transform="translate(-10 -58) rotate(-5) scale(.2)">${mangoLeaf({ id: "bk3" })}</g>` : "");
// a rubber stamp (the handle and the pad), its text on the pad's face; and the stamped mark
const stampHandle = (txt = "CASE CLOSED") => `<rect x="-22" y="-150" width="44" height="90" rx="14" fill="#8A5A2B" stroke="${INK3}" stroke-width="6"/><circle cy="-160" r="32" fill="#A86B34" stroke="${INK3}" stroke-width="6"/><rect x="-90" y="-62" width="180" height="46" rx="8" fill="#59616B" stroke="${INK3}" stroke-width="6"/><rect x="-96" y="-18" width="192" height="22" rx="4" fill="#E5484D" stroke="${INK3}" stroke-width="4"/>`;
const stampMark = (txt, col, sz = 40) => { const w = tw(txt, sz, 700) + 40; return `<g transform="rotate(-12)" opacity=".92"><rect x="${n2(-w / 2)}" y="${-sz * .85}" width="${n2(w)}" height="${sz * 1.5}" rx="10" fill="none" stroke="${col}" stroke-width="7"/>${T(0, sz * .32, txt, sz, col, { ls: 2 })}</g>`; };
// THE CASE BOARD: cork on an easel; three mugshot cards (each a drawing of the suspect), the mystery leaf's photo in the middle, red string;
// st = [k1, k2, k3] the stamps (CLEARED, CLEARED, CASE CLOSED) 0..1 each; hi = which card is lit (1..3)
function caseBoard(t, st = [0, 0, 0], hi = 0, o = {}) { let s = `<path d="M-250 280 L-200 -260 M250 280 L200 -260 M0 -270 L0 300" stroke="#8A5A2B" stroke-width="16" stroke-linecap="round"/>`
    + `<g filter="url(#drop)"><rect x="-300" y="-250" width="600" height="440" rx="14" fill="#8A5A2B"/></g><rect x="-284" y="-234" width="568" height="408" rx="6" fill="url(#cork)"/>`
    + [...Array(30)].map((_, i) => `<circle cx="${n2(-270 + hash(i, 3) * 540)}" cy="${n2(-220 + hash(i, 5) * 380)}" r="3" fill="#9C6E3A" opacity=".5"/>`).join("")
    + T(0, -196, "CASE FILE: THE MYSTERY LEAF", 26, INK3, { ls: 1 });
  const C = [[-190, 20], [0, 60], [190, 20]], names = ["PANDAN", "MANGO TREE", "HIBISCUS"];
  const pic = (i) => i === 0 ? TF(0, 30, .16, pandanPlant(t)) : i === 1 ? TF(-30, 40, .26, `<g transform="rotate(-60)">${mangoLeaf({ id: "cbm" })}</g>`) : TF(-30, 30, .3, `<g transform="rotate(-60)">${hibLeaf({ id: "cbh", noMark: true })}</g>`);
  s += C.map(([x, y]) => `<path d="M0 -120 L${x} ${y - 70}" stroke="#D9302A" stroke-width="5"/>`).join("");
  s += `<g transform="translate(0 -110) rotate(3)"><rect x="-64" y="-50" width="128" height="100" fill="#fff" stroke="${INK3}" stroke-width="4"/><g transform="translate(-34 8) scale(.2)">${hibLeaf({ id: "cbp" })}</g><circle cx="0" cy="-50" r="9" fill="#E5484D"/></g>`;
  C.forEach(([x, y], i) => { const lit = hi === i + 1 ? .5 + .3 * Math.sin(t * 7) : 0;
    s += `<g transform="translate(${x} ${y}) rotate(${(i - 1) * 4})">${lit ? `<rect x="-90" y="-100" width="180" height="210" rx="10" fill="${P.sun}" opacity="${n2(lit)}" filter="url(#b4)"/>` : ""}<rect x="-80" y="-90" width="160" height="190" rx="6" fill="#FFF8EA" stroke="${INK3}" stroke-width="5"/><clipPath id="cbc${i}"><rect x="-70" y="-80" width="140" height="120"/></clipPath><rect x="-70" y="-80" width="140" height="120" fill="#DDEFF7"/><g clip-path="url(#cbc${i})">${pic(i)}</g>${T(0, 76, names[i], i === 1 ? 20 : 22, INK3)}<circle cx="0" cy="-90" r="9" fill="#E5484D"/>`
      + (st[i] > 0 ? TF(0, -10, lerp(2, 1, eo(st[i])) * (i === 2 ? 1 : .85), stampMark(i === 2 ? "CASE CLOSED" : "CLEARED", i === 2 ? "#2E9E4C" : "#D9302A", i === 2 ? 30 : 34)) : "") + `</g>`; });
  return s; }
// THE DETECTIVE HAT (script 6b, question 11 A: drawn in code). v2 (teacher, 28 Nov 2026: "detective needs detective hat... not over his
// episode bike helmet"): a brown tweed DEERSTALKER (a front peak and a back peak, the ear flaps tied up in a bow on top), a size too big,
// worn INSTEAD of his orange bike helmet, sitting straight on his head (SERIES_FORMAT: a costume hat REPLACES the bike helmet, never
// stacked; bike helmets only when the buddies cycle). Drawn in the head's own frame (items_options.js BASILH: origin = the middle of the
// helmet's front edge = just above the eyes, 300 wide = the head's width); per pose: cx, rim, hw, tilt (+ back: the back view).
// slide: < 0 = falling in from above (the cold open), 0 = landed, 1 = sunk low to his eyebrows (too big; never over his eyes),
// .25 = pushed back up (tipped back a little). EP3 has no bike scene, so he wears no helmet at all (page.html BASIL_HELMET = false).
const BASILH3 = { sit: { cx: 434, rim: 152, hw: 168, tilt: -3 }, oops: { cx: 345, rim: 86, hw: 160, tilt: -6, paw: [470, 66, 54, 50] }, surprised: { cx: 345, rim: 76, hw: 162, tilt: -4 }, arms_crossed: { cx: 357, rim: 80, hw: 162, tilt: -3 },
  cheer: { cx: 347, rim: 72, hw: 158, tilt: -4 }, laughing: { cx: 340, rim: 86, hw: 170, tilt: -2 }, pointing: { cx: 352, rim: 78, hw: 160, tilt: -4 }, thinking: { cx: 357, rim: 76, hw: 158, tilt: -3 },
  worried: { cx: 352, rim: 78, hw: 158, tilt: -3 }, waving: { cx: 345, rim: 78, hw: 160, tilt: -3 }, back: { cx: 258, rim: 98, hw: 130, tilt: 0, back: true } };
const HAT = { base: "#9A6A3E", dark: "#6E4628", mid: "#7E5230", light: "#C9A06C", ink: "#1E3442" };
// the tweed check, clipped to a shape (every hat part uses it)
const hatTweed = (id, d) => `<clipPath id="${id}"><path d="${d}"/></clipPath><path d="${d}" fill="${HAT.base}"/><g clip-path="url(#${id})">`
  + [...Array(15)].map((_, i) => `<path d="M${-280 + i * 40} -260 V120" stroke="${HAT.mid}" stroke-width="9" opacity=".45"/><path d="M-300 ${-250 + i * 26} H300" stroke="${HAT.mid}" stroke-width="7" opacity=".4"/>`).join("")
  + [...Array(15)].map((_, i) => `<path d="M${-262 + i * 40} -260 V120" stroke="${HAT.light}" stroke-width="2.5" opacity=".55"/>`).join("")
  + `<path d="M-300 -40 Q0 60 300 -40 V140 H-300Z" fill="${HAT.dark}" opacity=".28"/></g>`;
// the deerstalker seen from the front three-quarter (the face turned to +x)
function deerstalker() { const ink = HAT.ink;
  const crown = "M-160 6 C-170 -84 -102 -156 6 -158 C112 -156 172 -84 160 6 Q4 26 -160 6Z";
  const backPeak = "M-146 2 Q-194 4 -220 26 Q-180 32 -136 20Z";
  const frontPeak = "M-24 16 Q60 24 150 6 Q180 10 192 22 Q124 36 40 34 Q-8 32 -24 16Z";
  const flap = (sg) => `M${sg * 156} -6 Q${sg * 172} -58 ${sg * 140} -102 Q${sg * 114} -116 ${sg * 98} -92 Q${sg * 112} -46 ${sg * 110} 2Z`;
  let s = hatTweed("dsBP", backPeak) + `<path d="${backPeak}" fill="none" stroke="${ink}" stroke-width="8" stroke-linejoin="round"/>`;
  s += `<g filter="url(#b4)" opacity=".35"><path d="M-160 10 Q0 40 160 10" stroke="#10202A" stroke-width="18" fill="none"/></g>`;   // its soft shadow on his head
  s += hatTweed("dsCr", crown) + `<path d="${crown}" fill="none" stroke="${ink}" stroke-width="9" stroke-linejoin="round"/>`;
  s += `<path d="M6 -158 Q36 -82 30 22 M6 -158 Q-64 -100 -88 18 M6 -158 Q92 -110 118 14" stroke="${HAT.dark}" stroke-width="6" fill="none" opacity=".8"/>`;   // the panel seams
  for (const sg of [-1, 1]) s += hatTweed("dsF" + (sg + 1), flap(sg)) + `<path d="${flap(sg)}" fill="none" stroke="${ink}" stroke-width="7" stroke-linejoin="round"/>`;   // the ear flaps, tied up
  s += `<path d="M-116 -98 Q-66 -154 -12 -160 M124 -96 Q76 -152 24 -160" stroke="${HAT.dark}" stroke-width="7" fill="none" stroke-linecap="round"/>`;   // the ties
  s += `<g transform="translate(6 -162)"><path d="M0 0 Q-40 -34 -52 -6 Q-40 18 0 0Z M0 0 Q40 -34 52 -6 Q40 18 0 0Z" fill="${HAT.dark}" stroke="${ink}" stroke-width="6" stroke-linejoin="round"/><circle r="11" fill="${HAT.mid}" stroke="${ink}" stroke-width="5"/></g>`;   // the bow on top
  s += hatTweed("dsFP", frontPeak) + `<path d="${frontPeak}" fill="none" stroke="${ink}" stroke-width="8" stroke-linejoin="round"/>`;
  s += `<path d="M-112 -108 Q-56 -142 6 -146" stroke="#fff" stroke-width="9" fill="none" opacity=".28" stroke-linecap="round"/>`;   // a soft shine
  return s; }
// the deerstalker from behind (the journey's back view): symmetric, the back peak towards us, the flaps' bow on top
function deerstalkerBack() { const ink = HAT.ink;
  const crown = "M-170 10 C-182 -88 -104 -168 0 -170 C104 -168 182 -88 170 10 Q0 34 -170 10Z", peak = "M-120 16 Q0 40 120 16 Q110 60 0 68 Q-110 60 -120 16Z";
  const flap = (sg) => `M${sg * 166} -4 Q${sg * 182} -60 ${sg * 148} -108 Q${sg * 120} -124 ${sg * 102} -96 Q${sg * 118} -48 ${sg * 116} 4Z`;
  let s = hatTweed("dbCr", crown) + `<path d="${crown}" fill="none" stroke="${ink}" stroke-width="9" stroke-linejoin="round"/><path d="M0 -170 V30 M0 -170 Q-80 -100 -90 24 M0 -170 Q80 -100 90 24" stroke="${HAT.dark}" stroke-width="6" fill="none" opacity=".8"/>`;
  for (const sg of [-1, 1]) s += hatTweed("dbF" + (sg + 1), flap(sg)) + `<path d="${flap(sg)}" fill="none" stroke="${ink}" stroke-width="7" stroke-linejoin="round"/>`;
  s += `<path d="M-120 -104 Q-64 -166 -8 -172 M120 -104 Q64 -166 8 -172" stroke="${HAT.dark}" stroke-width="7" fill="none" stroke-linecap="round"/><g transform="translate(0 -174)"><path d="M0 0 Q-40 -34 -52 -6 Q-40 18 0 0Z M0 0 Q40 -34 52 -6 Q40 18 0 0Z" fill="${HAT.dark}" stroke="${ink}" stroke-width="6" stroke-linejoin="round"/><circle r="11" fill="${HAT.mid}" stroke="${ink}" stroke-width="5"/></g>`;
  s += hatTweed("dbPk", peak) + `<path d="${peak}" fill="none" stroke="${ink}" stroke-width="8" stroke-linejoin="round"/>`;
  return s; }
function detHat(slide = 0, back = false) { const sl = clamp(slide, -6, 1), y = sl < 0 ? -30 + sl * 110 : lerp(-30, -16, sl), rot = back || sl < 0 ? 0 : -8 * (1 - sl);
  return `<g transform="translate(0 ${n2(y)}) rotate(${n2(rot)} -120 0)">${back ? deerstalkerBack() : deerstalker()}</g>`; }
// The hat follows Basil's pose: itemsOf (lib.js / items_options.js) is wrapped once. window.CAP(t) -> the slide, or null for no hat. While
// the hat is on, the bike helmet (and its chin strap) is never drawn under it, whatever BASIL_HELMET says.
(function () { const prev = itemsOf; itemsOf = function (who, name, fl, o) { o = o || {};
  if (who !== "basil" || !window.CAP || o.cap === false) return prev(who, name, fl, o);
  const H = BASILH3[poseKey("basil", name)], sl = window.CAP(window._T || 0);
  if (sl === null || !H) return prev(who, name, fl, o);
  const paw = H.paw ? `<clipPath id="hatPaw_${name}"><ellipse cx="${H.paw[0]}" cy="${H.paw[1]}" rx="${H.paw[2]}" ry="${H.paw[3]}"/></clipPath><use href="#s_${name}" clip-path="url(#hatPaw_${name})"/>` : "";   // a paw on the hat stays on top
  return prev(who, name, fl, { ...o, helmet: false }) + `<g transform="translate(${H.cx} ${H.rim}) rotate(${H.tilt}) scale(${n2(H.hw / 150 * 1.02)})">${detHat(sl, !!H.back)}</g>` + paw; }; })();
// the cactus cameo (the link to EP4; a code drawing until EP4's Spike is painted): round, ribbed, green, spines in clusters on the ribs, a
// glazed pot, three bright plastic leaves sticky-taped on, leaning a little. Origin = the pot's base. FACES: none (it hops straight up)
function cactusV3(t, o = {}) { const sq = o.sq || 0; let s = `<ellipse cx="0" cy="4" rx="90" ry="12" fill="${INK3}" opacity=".2"/><g transform="scale(${n2(1 + .1 * sq)} ${n2(1 - .12 * sq)})">`;
  s += `<path d="M-80 -110 L80 -110 L64 0 L-64 0Z" fill="#E86A4A" stroke="${INK3}" stroke-width="7"/><rect x="-90" y="-128" width="180" height="28" rx="10" fill="#F08A66" stroke="${INK3}" stroke-width="7"/>`;
  s += `<g transform="rotate(${o.lean === undefined ? 6 : o.lean} 0 -128)"><ellipse cx="0" cy="-230" rx="82" ry="112" fill="#4FA23A" stroke="${INK3}" stroke-width="7"/>` + [-50, -20, 20, 50].map((x) => `<path d="M${x} -335 Q${x * 1.25} -230 ${x} -130" stroke="#2F7A2A" stroke-width="5" fill="none"/>`).join("")
    + [...Array(14)].map((_, i) => { const x = [-50, -20, 20, 50][i % 4] * (1 + .1 * (i % 3)), y = -310 + Math.floor(i / 4) * 55; return `<path d="M${x} ${y} l-10 -12 M${x} ${y} l10 -12 M${x} ${y} l0 -15" stroke="#FFF6D8" stroke-width="3" stroke-linecap="round"/>`; }).join("")
    + [[-70, -270, -40, "#43BF6C"], [64, -220, 30, "#7ED957"], [-10, -340, -5, "#2FD07A"]].map(([x, y, r, c]) => `<g transform="translate(${x} ${y}) rotate(${r})"><path d="M0 0 Q30 -40 70 -10 Q30 30 0 0Z" fill="${c}" stroke="${INK3}" stroke-width="4"/><path d="M4 0 L66 -10" stroke="#fff" stroke-width="3" opacity=".6"/>${tapeX(6, -2, .4, 70)}</g>`).join("") + `</g></g>`;
  return s; }
// a little inset card (title under the picture) — EP2's x2inset, kept here so the insets are one style
const inset3 = (t, t0, t1, x, y, title, pic, col, w = 340, h = 250) => { if (t < t0 - .05 || t > t1 + .35) return ""; const k = spring(t, t0, .45) * (1 - ramp(t, t1, .3)), id = "in3" + Math.round(x) + Math.round(y);
  return DHUD(TF(x, y, k, `<g filter="url(#dropS)"><rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="22" fill="#fff" stroke="${col}" stroke-width="7"/></g><clipPath id="${id}"><rect x="${-w / 2 + 10}" y="${-h / 2 + 10}" width="${w - 20}" height="${h - 64}" rx="16"/></clipPath><g clip-path="url(#${id})">${pic}</g>` + T(0, h / 2 - 20, title, 28, INK3, { w: 700 }))); };
// the inset pictures
const picChilliLeaf = () => `<rect x="-170" y="-130" width="340" height="200" fill="#EAF6FF"/>` + TF(-150, -10, .42, `<path d="M0 0 Q90 -46 230 0 Q90 46 0 0Z" fill="#6DB548" stroke="${INK3}" stroke-width="9"/><path d="M0 0 H225" stroke="#3F7A2A" stroke-width="5"/>`) + TF(30, -20, .38, hibLeaf({ id: "pcl" }));
const picRedLeaves = () => `<rect x="-170" y="-130" width="340" height="200" fill="#EAF6FF"/>` + TF(-80, -30, .4, `<g transform="rotate(40)">${mangoLeaf({ young: true, id: "prl1" })}</g>`) + TF(-120, -40, .36, `<g transform="rotate(70)">${mangoLeaf({ young: true, id: "prl2" })}</g>`)
  + TF(80, 40, 1, `<path d="M0 0 V-60" stroke="#5E3A20" stroke-width="6"/>` + [[-1, -40], [1, -55], [-1, -70], [1, -20]].map(([sg, y]) => `<g transform="translate(0 ${y}) rotate(${sg * 50 - 90})"><path d="M0 0 Q30 -18 60 0 Q30 18 0 0Z" fill="#7B3FA0" stroke="${INK3}" stroke-width="3"/></g>`).join(""));
const picTrack = () => `<rect x="-170" y="-130" width="340" height="200" fill="#D9573E"/>` + [...Array(6)].map((_, i) => `<path d="M-180 ${-110 + i * 36} H180" stroke="#fff" stroke-width="5"/>`).join("") + T(-120, -80, "1", 26, "#fff") + T(-120, -44, "2", 26, "#fff");
const picTongue = () => `<rect x="-170" y="-130" width="340" height="200" fill="#FDF0E2"/><path d="M-140 -30 Q0 -80 140 -30 L140 30 Q0 -20 -140 30Z" fill="#F2A8A0" stroke="${INK3}" stroke-width="6"/>` + [...Array(48)].map((_, i) => { const x = -120 + (i % 16) * 16, y = -30 + Math.floor(i / 16) * 18 - 18 * Math.cos((x / 140) * 1.4); return `<path d="M${x} ${n2(y)} l5 -8 l5 8" stroke="#fff" stroke-width="3" fill="none"/>`; }).join("");
const picNewLeaves = (t) => `<rect x="-170" y="-130" width="340" height="200" fill="#EAF6FF"/><path d="M-140 60 Q-20 30 60 -30" stroke="#6E4A2A" stroke-width="12" fill="none" stroke-linecap="round"/>` + [[0, 0, -30, .18], [40, -24, -60, .13], [62, -32, -20, .08]].map(([x, y, r, k]) => `<g transform="translate(${x} ${y}) rotate(${r}) scale(${n2(k * (1 + .1 * Math.sin(t * 2)))})">${hibLeaf({ id: "nl" + x, noMark: true, stalk: false })}</g>`).join("");

// EP1's snail with its tiny cardboard crown (artv2.js snailV2), with an invisible face box so speech bubbles keep off it (kit/bubble_layout.js)
const snail3 = (t, o = {}) => `<!--FACES:right snail-->` + snailV2(t, { crown: true, ...o }) + `<rect data-face="snail" x="56" y="-120" width="52" height="84" fill="none" stroke="none"/>`;
// v2 (teacher 28 Nov 2026: no bike helmets in EP3; Pip in his goggles, items_options.js option C): from behind (the journey's back view)
// the goggles' strap shows across the back of his head, between his ears (sprite px of pip_back; the lenses are on the far side)
(function () { const prev = itemsOf; itemsOf = function (who, name, fl, o) { const s = prev(who, name, fl, o);
  if (who !== "pip" || name !== "pip_back" || (window.ITEM_OPT || {}).pip !== "C") return s;
  const d = "M206 182 C262 206 378 206 432 178"; return s + `<path d="${d}" stroke="#3A3E56" stroke-width="24" fill="none" stroke-linecap="round"/><path d="${d}" stroke="#3E4460" stroke-width="15" fill="none" stroke-linecap="round"/><path d="M226 186 C270 200 360 200 410 184" stroke="#6E7594" stroke-width="3" fill="none" opacity=".7"/>`; }; })();
