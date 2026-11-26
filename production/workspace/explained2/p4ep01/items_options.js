// items_options.js: OPTIONS for the P4 "level-up" items (teacher, 26 Nov 2026: "design choice needs improvement. Momo's necklace is off,
// and Pip isn't wearing his helmet properly"). NOT loaded by page.html: the live P4 EP1 build is unchanged until the teacher picks.
// To try an option in the engine, load this file after lib.js and set window.ITEM_OPT, e.g. { pip: "B", momo: "A", basil: "A" }
// ("live" or unset = lib.js itemsOf as it is now). items_sheet.js renders the comparison sheets.
// How the items sit IN the paintings: every item is drawn inside the sprite's own transform (sprite pixels; it follows squash, hop, lean
// and flips), and parts of the painting are drawn AGAIN on top of the item where the item must go BEHIND them: Pip's ears come out over
// his helmet, his paw stays on top when it touches the helmet or the chin strap, Momo's cheek ruff hides where her cord goes round her
// neck, her paw closes round the magnifier's handle, her crossed arms hide the tucked handle. (redraw(): the same painting, clipped.)
// Head and chest landmarks were measured on each painting (sprite pixels) with GRID=1 items_sheet.js.
(function () {
window.ITEM_OPT = window.ITEM_OPT || {};
const r1 = (v) => Math.round(v * 10) / 10;
const INK = { pip: "#3A3E56", momo: "#2A1E2E", basil: "#1E3442" };   // each painting's own outline colour (sampled)
// the painting drawn again on top, clipped to the given shapes (sprite pixels)
const redraw = (name, key, shapes) => { if (!shapes) return ""; const id = `rd_${name}_${key}`; return `<clipPath id="${id}">${shapes}</clipPath><use href="#s_${name}" clip-path="url(#${id})"/>`; };
// the same, but with a soft (feathered) edge: where the painting's fur crosses an item (an ear base over the helmet) there is no hard line
const redrawSoft = (name, key, shapes, b = 6) => { if (!shapes) return ""; const id = `rs_${name}_${key}`, S = SPR[name];
  return `<filter id="${id}f" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="${b}"/></filter><mask id="${id}" maskUnits="userSpaceOnUse" x="0" y="0" width="${S.w}" height="${S.h}"><g fill="#fff" filter="url(#${id}f)">${shapes}</g></mask><use href="#s_${name}" mask="url(#${id})"/>`; };
const ell = (e) => `<ellipse cx="${e[0]}" cy="${e[1]}" rx="${e[2]}" ry="${e[3]}"${e[4] ? ` transform="rotate(${e[4]} ${e[0]} ${e[1]})"` : ""}/>`;
// a mask = the painting's own silhouette (so a band round the head ends exactly at the head's outline)
const silMask = (name) => { const S = SPR[name], id = `sm_${name}`; return [`<mask id="${id}" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="${S.w}" height="${S.h}"><use href="#s_${name}"/></mask>`, id]; };
const lgr = (id, stops, x2 = 0, y2 = 1) => lg(id, stops, x2, y2);

/* ================================================================ PIP ================================================================ */
// per pose: cx, rim y (the helmet's front edge, just above the eyebrows), hw (half the head's width), tilt (deg, the eye line), chin,
// ear ellipses [cx, cy, rx, ry, rot] and any paw that touches the helmet or strap (drawn again on top)
const PIPH = {   // vx = how far the face (visor) sits right of the skull's middle (the paintings turn the head a little to his left)
  sit: { cx: 514, rim: 190, hw: 168, vx: 26, tilt: -7, chin: [566, 336], ears: [[350, 146, 54, 80, -14], [612, 116, 46, 76, 10]] },
  oops: { cx: 368, rim: 177, hw: 170, vx: 20, tilt: -2, chin: [410, 308], ears: [[206, 114, 62, 70, -25], [458, 88, 48, 76, 14]], paws: [[497, 160, 44, 44]] },
  surprised: { cx: 354, rim: 183, hw: 166, vx: 22, tilt: -4, chin: [386, 344], ears: [[191, 114, 64, 72, -25], [440, 94, 50, 80, 12]] },
  thinking: { cx: 364, rim: 180, hw: 166, vx: 24, tilt: -9, chin: [418, 302], ears: [[213, 111, 72, 72, -25], [460, 90, 50, 74, 12]], paws: [[474, 324, 38, 46]] },
  cheer: { cx: 370, rim: 174, hw: 168, vx: 24, tilt: -9, chin: [404, 322], ears: [[220, 106, 70, 72, -25], [475, 91, 50, 74, 12]] } };
const PIPCOL = {
  sun: { id: "hSun", hi: "#FFE08A", mid: "#FFC23D", lo: "#EE9420", vent: "#7A4A12", rim: "#D97F14", visor: "#F2A126" },
  lilac: { id: "hLil", hi: "#DCCFFF", mid: "#B39BFF", lo: "#8463E6", vent: "#3E2A86", rim: "#7454D6", visor: "#9479F2" } };
const hk = (H) => H.hw / 150;
const hpt = (H, x, y) => { const a = H.tilt * Math.PI / 180, k = hk(H); return [H.cx + k * (x * Math.cos(a) - y * Math.sin(a)), H.rim + k * (x * Math.sin(a) + y * Math.cos(a))]; };
const inHead = (H, inner) => `<g transform="translate(${H.cx} ${H.rim}) rotate(${H.tilt}) scale(${r1(hk(H) * 1000) / 1000})">${inner}</g>`;
// the helmet shell, local frame: origin = the middle of its front edge, 300 wide; c = colours; o.visor
function helmetP(c, o = {}) { const ink = INK.pip;
  const shell = SHELL, vx = o.vx || 0;
  let s = `<defs>${lgr(c.id + "S", [[0, c.hi], [.5, c.mid], [1, c.lo]], .35, 1)}${lgr(c.id + "V", [[0, c.visor], [1, c.lo]])}</defs>`;
  s += `<path d="M-150 58 C-120 38 -72 8 0 6 C72 8 120 38 150 58" stroke="${ink}" stroke-width="20" fill="none" opacity=".26" filter="url(#b4)"/>`;   // its shadow on the fur
  s += `<path d="${shell}" fill="url(#${c.id}S)"/>`;
  s += `<ellipse cx="-62" cy="-84" rx="52" ry="20" transform="rotate(-24 -62 -84)" fill="#fff" opacity=".5" filter="url(#b4)"/>`;   // the shine
  for (const [x1, y1, x2, y2, w] of [[0, -106, 0, -52, 17], [-54, -100, -66, -46, 16], [54, -100, 66, -46, 16], [-104, -76, -124, -26, 13], [104, -76, 124, -26, 13]])
    s += `<path d="M${x1} ${y1} L${x2} ${y2}" stroke="${c.vent}" stroke-width="${w}" stroke-linecap="round" opacity=".82"/><path d="M${x1 + 4} ${y1 + 6} L${x2 + 4} ${y2 + 2}" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".35"/>`;
  s += `<path d="M-148 42 C-118 22 -72 -6 0 -8 C72 -6 118 22 148 42" stroke="${c.rim}" stroke-width="12" fill="none" opacity=".75"/>`;   // the darker edge band
  s += `<path d="${shell}" fill="none" stroke="${ink}" stroke-width="8" stroke-linejoin="round"/>`;
  if (o.visor !== false) s += `<g transform="translate(${vx} 0)"><path d="M-86 -8 C-48 -20 48 -20 86 -8 C76 8 40 14 0 14 C-40 14 -76 8 -86 -8Z" fill="url(#${c.id}V)" stroke="${ink}" stroke-width="7" stroke-linejoin="round"/><path d="M-60 -6 C-30 -12 30 -12 60 -6" stroke="#fff" stroke-width="3.5" fill="none" opacity=".45" stroke-linecap="round"/></g>`;
  return s; }
// goggles, local frame: origin = between the lenses; o.frame colour; o.band = the elastic band's two ends [[x, y], ...] (local)
function gogglesP(o = {}) { const ink = INK.pip, fr = o.frame || "#2BB5A3"; let s = `<defs>${lgr("gLens", [[0, "#F2FCFF"], [.55, "#BDE9FA"], [1, "#7FC6E6"]], .3, 1)}</defs>`;
  if (o.band) for (const [sg, e] of [[-1, o.band[0]], [1, o.band[1]]]) { const d = `M${sg * 70} 0 Q${r1((sg * 70 + e[0]) / 2)} ${r1(e[1] * .3 - 8)} ${e[0]} ${e[1]}`; s += `<path d="${d}" stroke="${ink}" stroke-width="19" fill="none" stroke-linecap="round"/><path d="${d}" stroke="${o.bandCol || "#3E4460"}" stroke-width="12" fill="none" stroke-linecap="round"/>`; }
  s += `<rect x="-14" y="-7" width="28" height="12" rx="5" fill="${fr}" stroke="${ink}" stroke-width="5"/>`;
  for (const sg of [-1, 1]) s += `<g transform="translate(${sg * 40} 0) rotate(${sg * 5})"><rect x="-34" y="-25" width="68" height="50" rx="23" fill="${fr}" stroke="${ink}" stroke-width="7"/><rect x="-25" y="-17" width="50" height="34" rx="16" fill="url(#gLens)" stroke="${ink}" stroke-width="3" opacity=".97"/><path d="M-15 -7 Q-8 -13 4 -12" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round"/></g>`;
  return s; }
// the chin strap: from under each ear (local anchor) down the cheeks to a buckle under the chin
function strapP(H) { const ink = INK.pip, B = [H.chin[0], H.chin[1] + 8]; let s = "";
  for (const sg of [-1, 1]) { const A = hpt(H, sg * 128 + (H.vx || 0) * .5, 40), C = [A[0] + sg * 6, A[1] + (B[1] - A[1]) * .92], d = `M${r1(A[0])} ${r1(A[1])} Q${r1(C[0])} ${r1(C[1])} ${r1(B[0] + sg * 12)} ${r1(B[1])}`;
    s += `<path d="${d}" stroke="${ink}" stroke-width="14" fill="none" stroke-linecap="round"/><path d="${d}" stroke="#5A5F7A" stroke-width="8" fill="none" stroke-linecap="round"/>`; }
  return s + `<g transform="translate(${r1(B[0])} ${r1(B[1])}) rotate(${H.tilt})"><rect x="-17" y="-10" width="34" height="20" rx="7" fill="#454A63" stroke="${ink}" stroke-width="5"/><rect x="-9" y="-4" width="18" height="6" rx="3" fill="#A9AFC6"/></g>`; }
// where an ear comes out through the helmet: the lower edge of its hole, an ink arc on the shell (clipped to the shell)
const SHELL = "M-153 50 C-172 -30 -126 -118 0 -122 C126 -118 172 -30 153 50 C122 30 72 -2 0 -4 C-72 -2 -122 30 -153 50Z";
const arcE = (e, a1, a2) => { const R = (e[4] || 0) * Math.PI / 180, p = (t) => { t *= Math.PI / 180; const x = e[2] * Math.cos(t), y = e[3] * Math.sin(t); return `${r1(e[0] + x * Math.cos(R) - y * Math.sin(R))} ${r1(e[1] + x * Math.sin(R) + y * Math.cos(R))}`; };
  return `M${p(a1)} A${e[2]} ${e[3]} ${e[4] || 0} 0 1 ${p(a2)}`; };
const earHoles = (name, H) => { const id = `sh_${name}`, k = r1(hk(H) * 1000) / 1000;
  return `<clipPath id="${id}"><path d="${SHELL}" transform="translate(${H.cx} ${H.rim}) rotate(${H.tilt}) scale(${k})"/></clipPath><g clip-path="url(#${id})">${H.ears.map((e) => `<path d="${arcE([e[0], e[1], e[2] + 2, e[3] + 2, e[4]], 15, 165)}" stroke="${INK.pip}" stroke-width="7" fill="none" stroke-linecap="round"/><path d="${arcE([e[0], e[1], e[2] + 9, e[3] + 9, e[4]], 30, 150)}" stroke="${INK.pip}" stroke-width="8" fill="none" opacity=".22"/>`).join("")}</g>`; };
function pipItem(op, name, H) { const top = redraw(name, "e", H.ears.map(ell).join("")) + redraw(name, "p", (H.paws || []).map(ell).join("")), holes = op === "C" ? "" : earHoles(name, H);
  if (op === "A") return inHead(H, helmetP(PIPCOL.sun, { vx: H.vx })) + strapP(H) + holes + top;
  if (op === "B") return inHead(H, helmetP(PIPCOL.lilac, { visor: false }) + TF(-6, -44, .95, gogglesP({ frame: "#FF8A3D", band: [[-150, 18], [150, 18]], bandCol: "#5B3FB8" }))) + strapP(H) + holes + top;
  if (op === "C") { const [m, id] = silMask(name); return `<defs>${m}</defs><g mask="url(#${id})">${inHead(H, `<path d="M-170 2 C-110 -40 110 -40 170 2" stroke="${INK.pip}" stroke-width="22" fill="none"/><path d="M-170 2 C-110 -40 110 -40 170 2" stroke="#3E4460" stroke-width="14" fill="none"/>`)}</g>`
    + inHead(H, TF(H.vx * .6, -30, 1.18, gogglesP({ frame: "#2BB5A3" }))) + top; }
  return ""; }

/* ================================================================ MOMO ================================================================ */
// per pose: chin (the middle of the jaw), pend (where the magnifier hangs: on the chest, or resting on her crossed arms), ruff = the lower
// face drawn again over the cord's ends (the cord goes round her neck under the fur), arms = the crossed arms (B: the handle tucked under),
// hold = B: [paw ellipse, lens centre, lens r] (the paw drawn again over the handle: she grips it), head = C: [cx, eye y, tilt]
const MOMOH = {
  sit: { chin: [440, 270], pend: [452, 326], ruff: [442, 236, 118, 56, 4], arms: [548, 404, 108, 62], tuck: [622, 322, 32], tail: [234, 322] },
  arms_crossed: { chin: [270, 254], pend: [278, 326], ruff: [272, 222, 112, 54, 3], arms: [350, 388, 92, 54], tuck: [414, 318, 32], tail: [80, 305] },
  pointing: { chin: [263, 251], pend: [270, 334], ruff: [264, 218, 112, 54, 0], tail: [50, 305] },
  thinking: { chin: [268, 254], pend: [262, 336], ruff: [266, 222, 112, 54, -4], hold: [[372, 292, 36, 46], [408, 196], 40], tail: [48, 305] },
  waving: { chin: [270, 276], pend: [266, 350], ruff: [268, 240, 112, 56, -4], tail: [46, 305] },
  surprised: { chin: [290, 280], pend: [292, 356], ruff: [286, 246, 112, 56, -6], hold: [[389, 284, 36, 44], [432, 186], 38], tail: [64, 299] },
  cheer: { chin: [290, 286], pend: [292, 362], ruff: [288, 252, 112, 56, -4], hold: [[462, 186, 36, 38], [470, 92], 38], tail: [62, 299] } };
// the magnifier, origin = the lens centre; r = lens radius; a = the handle's angle (deg from straight down, + = to her right)
function magP(r, a = 25, o = {}) { const ink = INK.momo, L = r * 1.45, hx = Math.sin(a * Math.PI / 180), hy = Math.cos(a * Math.PI / 180), x1 = r1(hx * r * .95), y1 = r1(hy * r * .95), x2 = r1(hx * (r + L)), y2 = r1(hy * (r + L));
  return `<defs>${lgr("mRim", [[0, "#FFE19A"], [.5, "#E8B04A"], [1, "#B9782A"]], .3, 1)}${lgr("mWood", [[0, "#B8743E"], [1, "#7C4520"]], 1, 0)}${rg("mGlass", [[0, "#FFFFFF", .95], [.7, "#D6F1FF", .85], [1, "#A9DDF5", .9]], .38, .35, .7)}</defs>`
    + `<path d="M${x1} ${y1} L${x2} ${y2}" stroke="${ink}" stroke-width="${r1(r * .52)}" stroke-linecap="round"/><path d="M${x1} ${y1} L${x2} ${y2}" stroke="url(#mWood)" stroke-width="${r1(r * .34)}" stroke-linecap="round"/>`
    + `<circle r="${r}" fill="url(#mGlass)"/><circle r="${r}" fill="none" stroke="${ink}" stroke-width="${r1(r * .42)}"/><circle r="${r}" fill="none" stroke="url(#mRim)" stroke-width="${r1(r * .24)}"/>`
    + `<path d="M${r1(-r * .55)} ${r1(-r * .2)} A${r1(r * .6)} ${r1(r * .6)} 0 0 1 ${r1(-r * .1)} ${r1(-r * .58)}" stroke="#fff" stroke-width="${r1(r * .16)}" fill="none" stroke-linecap="round"/>`
    + (o.loop ? `<circle cx="0" cy="${r1(-r - r * .22)}" r="${r1(r * .2)}" fill="none" stroke="${ink}" stroke-width="${r1(r * .16)}"/>` : ""); }
function momoItem(op, name, H) { const ink = INK.momo;
  if (op === "A") { const [px, py] = H.pend, r = 30, top = [px, py - r - 7], [cx, cy] = H.chin; let s = "";
    for (const sg of [-1, 1]) { const a = [cx + sg * 64, cy - 10], d = `M${a[0]} ${a[1]} Q${r1(cx + sg * 56)} ${r1(top[1] - 4)} ${r1(top[0] + sg * 4)} ${r1(top[1])}`;
      s += `<path d="${d}" stroke="${ink}" stroke-width="10" fill="none" stroke-linecap="round"/><path d="${d}" stroke="#1FA08C" stroke-width="5.5" fill="none" stroke-linecap="round"/>`; }
    return s + redraw(name, "ruff", ell(H.ruff)) + TF(px, py, 1, magP(r, 16, { loop: true })); }
  if (op === "B") { if (H.tuck) { const [x, y, r] = H.tuck, a = Math.atan2(H.arms[0] - x, H.arms[1] - y) * 180 / Math.PI; return TF(x, y, 1, magP(r, a)) + redraw(name, "arms", ell(H.arms)); }
    if (H.hold) { const [paw, [lx, ly], r] = H.hold, a = Math.atan2(paw[0] - lx, paw[1] - ly) * 180 / Math.PI; return TF(lx, ly, 1, magP(r, a)) + redraw(name, "paw", ell(paw)); }
    return ""; }
  if (op === "C") { const [tx, ty] = H.tail, r = 32;   // the tail's tip curls round the handle: the tuft is drawn again over it
    return TF(tx + 6, ty - r - 22, 1, magP(r, -4)) + redraw(name, "tail", ell([tx, ty + 44, 46, 50])); }
  return ""; }

/* ================================================================ BASIL ================================================================ */
// A: the badge pinned on the upper chest (where a lab badge is worn), at the side of the chest away from the paws in each pose, a
// little tilt, a clip and a soft shadow; the card in the paintings' palette (cream card, teal band, ink outline), words always readable
const BASH = { sit: [470, 360, -6], oops: [400, 300, -5], waving: [372, 290, 0], thinking: [376, 300, -6], worried: [376, 300, -6], surprised: [402, 292, -6], pointing: [352, 318, -6],
  cheer: [352, 330, -6], arms_crossed: [382, 300, -6], laughing: [296, 318, -6] };
function basilItem(op, name, H, fl) { if (op !== "A") return ""; const ink = INK.basil, [x, y, a] = H;
  const card = `<g transform="translate(3 6)" opacity=".28" filter="url(#b4)"><rect x="-62" y="-40" width="124" height="84" rx="12" fill="${ink}"/></g>`
    + `<rect x="-62" y="-40" width="124" height="84" rx="12" fill="#FFF8EA" stroke="${ink}" stroke-width="5"/><path d="M-62 -16 V-28 a12 12 0 0 1 12 -12 H50 a12 12 0 0 1 12 12 V-16z" fill="#2BA58E"/><path d="M-62 -16 H62" stroke="${ink}" stroke-width="3"/>`
    + T(0, -21, "P4 LAB", 17, "#fff") + T(0, 16, "SCIENTIST", 17, ink) + `<rect x="-40" y="24" width="80" height="6" rx="3" fill="#2BA58E" opacity=".35"/>`
    + `<rect x="-12" y="-52" width="24" height="18" rx="5" fill="#C9D1DA" stroke="${ink}" stroke-width="4"/><circle cx="0" cy="-44" r="3.5" fill="${ink}"/>`;
  return TF(x, y, 1, `<g transform="rotate(${a}) scale(${fl} 1)">${card}</g>`); }

/* ================================================================ the switch ================================================================ */
window.ITEM_LABEL = {
  pip: { live: ["Now (live build)", "helmet perched on top", "like a bowl; ears out", "under it; straps hang", "loose in the air"],
    A: ["A: sun-yellow", "bike helmet", "sits down on the skull,", "ears out through it,", "visor, chin strap", "+ buckle; no goggles"],
    B: ["B: helmet +", "goggles (P4 item)", "lilac helmet, goggles", "pushed up on its front,", "chin strap + buckle"],
    C: ["C: goggles only", "(no helmet)", "band round the head", "behind the ears,", "lenses up on the crown.", "NOT for bike scenes"] },
  momo: { live: ["Now (live build)", "cord starts at her", "mouth; big pendant", "hangs over her arms"],
    A: ["A: short cord,", "done right", "cord goes under her", "cheek ruff; small", "magnifier rests on the", "chest / on her arms"],
    B: ["B: carried, not worn", "tucked under her", "crossed arms; held up", "in her paw when she", "thinks / is surprised /", "cheers; none otherwise"],
    C: ["C: carried in her tail", "the tail's tip curls", "round the handle; the", "lens stands up beside", "her; never on her", "face, paws or belly"] },
  basil: { live: ["Now (live build)", "flat white card,", "big; same place on", "every pose"],
    A: ["A: badge re-pinned", "smaller cream card,", "clip + soft shadow,", "slight tilt, moved", "clear of his paws"] } };
const _orig = itemsOf;
const GRID = (name) => { const S = SPR[name]; let s = ""; for (let x = 0; x <= S.w; x += 25) s += `<path d="M${x} 0 V${S.h}" stroke="${x % 100 ? "#f99" : "#e00"}" stroke-width="${x % 100 ? 1 : 2}" opacity=".7"/>`; for (let y = 0; y <= S.h; y += 25) s += `<path d="M0 ${y} H${S.w}" stroke="${y % 100 ? "#99f" : "#00e"}" stroke-width="${y % 100 ? 1 : 2}" opacity=".7"/>`;
  for (let x = 0; x <= S.w; x += 100) for (let y = 0; y <= S.h; y += 100) s += `<text x="${x + 3}" y="${y + 18}" font-size="18" fill="#000">${x},${y}</text>`; return s; };
itemsOf = function (who, name, fl, o) { const op = window.ITEM_OPT[who]; if (!op || op === "live") return _orig(who, name, fl, o); if (op === "grid") return GRID(name);
  const key = poseKey(who, name);
  if (who === "pip") { const H = PIPH[key]; if (!H) return _orig(who, name, fl, o); if (op !== "C" && o.helmet === false) return ""; return pipItem(op, name, H); }
  if (who === "momo") { const H = MOMOH[key]; return H ? momoItem(op, name, H) : _orig(who, name, fl, o); }
  if (who === "basil") { const H = BASH[key]; return H ? basilItem(op, name, H, fl) : _orig(who, name, fl, o); }
  return _orig(who, name, fl, o); };
})();
