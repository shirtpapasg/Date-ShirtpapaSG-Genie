// materials.js: EP8's data for THE 7 MATERIALS board, the material-name pops, and two generic props kept from EP5 (the picture board on
// its stand, the magnifying glass). STAGE 1 (setup): data and timing only. STAGE 2 (Fable) draws the canteen, the board, the props and
// the scenes (see SCENES_TODO.md); replace the placeholder pop drawing in namePop() when the board is drawn.

/* ---------- the board: seven tiles in the book's order (script section 3). Stamp colours only: never an answer colour (green/blue),
   never a buddy colour, never sun yellow. src = the source slot's words under the tile. ---------- */
const MAT = [
  { k: "wood",    name: "WOOD",    col: "#8B4A2B", src: "trees",                         part: 2 },
  { k: "metal",   name: "METAL",   col: "#5E6B73", src: "dug up from the ground",        part: 1 },
  { k: "ceramic", name: "CERAMIC", col: "#C8612E", src: "clay",                          part: 1 },
  { k: "rubber",  name: "RUBBER",  col: "#2F2F38", src: "sap of a rubber tree, or oil",  part: 2 },
  { k: "glass",   name: "GLASS",   col: "#8FA6B8", src: "sand",                          part: 1 },
  { k: "plastic", name: "PLASTIC", col: "#E0457B", src: "oil",                           part: 1 },
  { k: "fabric",  name: "FABRIC",  col: "#A07A1A", src: "animals or plants",             part: 2 },
];
const MATK = Object.fromEntries(MAT.map((m) => [m.k, m]));
// when each tile is full at t (Part 2 starts with METAL, CERAMIC, GLASS and PLASTIC already full): 0 = dashed "?", 1 = full
const tileFull = (k, t) => { const m = MATK[k]; if (PART === 2 && m.part === 1) return 1; const mk = TL.marks["tile_" + k]; return mk !== undefined && t >= mk ? 1 : 0; };

/* ---------- the material names that pop large (2.0 s, a chime) and then hop low to their tile. GLASS, METAL, PLASTIC and WOOD pop at
   their nm_* mark. CERAMIC, RUBBER and FABRIC are shelf key words (lib.js KW): they pop at their kw_* mark and fly to the shelf, and a
   copy hops to the edge of the tile (listed here with shelf: true so the board can show the copy waiting). ---------- */
const NAMES = (PART === 1 ? [["glass", "nm_glass"], ["metal", "nm_metal"], ["plastic", "nm_plastic"], ["ceramic", "kw_ceramic", true]]
  : [["wood", "nm_wood"], ["rubber", "kw_rubber", true], ["fabric", "kw_fabric", true]]).filter(([k, mk]) => TL.marks[mk] !== undefined)
  .map(([k, mk, shelf]) => ({ k, mk, shelf: !!shelf, t: TL.marks[mk], th: TL.marks[mk] + KWHOLD, ...MATK[k] }));
// where the board's tile is on screen in the current scene (Stage 2 sets BOARD_AT per scene; this placeholder points bottom right)
window.BOARD_AT = window.BOARD_AT || ((k, t, s) => [1640 + 40 * MAT.findIndex((m) => m.k === k) - 120, 960]);
// placeholder drawing: the name in a pill of its stamp colour, large in the middle for KWHOLD, then a low hop to its tile (.6 s)
function namePop(t, s) { let out = "";
  for (const n of NAMES) { if (n.shelf || t < n.t || t > n.th + .6) continue; const a = clamp((t - n.t) / .2), kk = spring(t, n.t, .5);
    if (t < n.th) { out += `<rect width="1920" height="1080" fill="${P.night}" opacity="${n2(.45 * a)}"/>` + TF(960, 470, kk * (1 + .02 * Math.sin((t - n.t) * 3)), `<g filter="url(#drop)"><rect x="${n2(-tw(n.name, 130, 700, "Fredoka", 9) / 2 - 90)}" y="-110" width="${n2(tw(n.name, 130, 700, "Fredoka", 9) + 180)}" height="220" rx="110" fill="${n.col}"/></g>` + T(0, 46, n.name, 130, "#fff", { ls: 9 }))
      + OP(a, tpill(960, 650, "MATERIAL", 34, P.ink, "#fff", { w: 700, ls: 5 })); continue; }
    const e = eio((t - n.th) / .6), [bx, by] = BOARD_AT(n.k, t, s), x = lerp(960, bx, e), y = lerp(470, by, e) - 140 * Math.sin(Math.PI * e);
    out += `<rect width="1920" height="1080" fill="${P.night}" opacity="${n2(.45 * (1 - e))}"/>` + TF(x, y, lerp(1, .3, e), `<g filter="url(#drop)"><rect x="${n2(-tw(n.name, 130, 700, "Fredoka", 9) / 2 - 90)}" y="-110" width="${n2(tw(n.name, 130, 700, "Fredoka", 9) + 180)}" height="220" rx="110" fill="${n.col}"/></g>` + T(0, 46, n.name, 130, "#fff", { ls: 9 })); }
  return out; }
window.OVER2 = (t, s) => namePop(t, s);

/* ---------- generic props kept from EP5 (ep05/wetland.js), unchanged ---------- */
// a picture board on its stand, standing on the ground (origin = the middle of its feet). inner is drawn centred in a w x h window
function wboard(inner, w = 330, h = 290, id = "wb", o = {}) { const lab = o.lab, size = o.size || 32;
  return `<ellipse cx="0" cy="4" rx="${w * .5}" ry="14" fill="${P.ink}" opacity=".22" filter="url(#b4)"/><path d="M${-w * .3} 0 V-60 M${w * .3} 0 V-60" stroke="#8A5A36" stroke-width="14" stroke-linecap="round"/><clipPath id="c_${id}"><rect x="${-w / 2}" y="${-h - 50}" width="${w}" height="${h}" rx="18"/></clipPath>
  <g filter="url(#drop)"><rect x="${-w / 2 - 12}" y="${-h - 62}" width="${w + 24}" height="${h + 24 + (lab ? size * 1.7 : 0)}" rx="24" fill="url(#gPaper)" stroke="#E3C9A8" stroke-width="6"/></g><g clip-path="url(#c_${id})"><g transform="translate(0 ${-h / 2 - 50})">${inner}</g></g>${lab ? T(0, -50 + size * 1.15, lab, size, o.ink || P.ink) : ""}`; }
// the magnifying glass (origin = the middle of the lens). EP8 stands it on little feet (script: "the magnifying glass stands on its little feet")
const magnifier = (r = 90) => `<path d="M${n2(r * .7)} ${n2(r * .7)} L${n2(r * 1.7)} ${n2(r * 1.7)}" stroke="#5E3F28" stroke-width="${n2(r * .3)}" stroke-linecap="round"/><circle r="${r}" fill="#DDF4FF" opacity=".35"/><circle r="${r}" fill="none" stroke="${P.ink}" stroke-width="${n2(r * .16)}"/><path d="M${n2(-r * .55)} ${n2(-r * .3)} q${n2(r * .2)} ${n2(-r * .34)} ${n2(r * .55)} ${n2(-r * .34)}" fill="none" stroke="#fff" stroke-width="${n2(r * .1)}" stroke-linecap="round" opacity=".8"/>`;

/* ---------- STAGE 1 placeholder for a scene Stage 2 has not drawn yet: the scene's name, what to draw, and the line being said.
   It keeps the page loading (sound cues, stills, timing checks). Delete each use as its scene is drawn. ---------- */
function phScene(t, s, title, notes = []) { let out = bg("stage2") + `<g filter="url(#drop)"><rect x="200" y="150" width="1520" height="620" rx="40" fill="url(#gPaper)"/></g>`
    + tpill(960, 150, "STAGE 2: TO DRAW", 30, P.coral, "#fff", { w: 700, ls: 3 }) + T(960, 250, title, 56, P.ink);
  let y = 330; for (const n of notes) for (const ln of wrap(n, 32, 1380, 500)) { out += `<text x="270" y="${y}" font-family="Fredoka" font-weight="500" font-size="32" fill="${P.ink}">${esc(ln)}</text>`; y += 44; }
  for (const id of TL.order) { const L = TL.lines[id]; if (t >= L.t - .05 && t < L.end + .3) { const who = L.who === "chant" ? "ALL" : L.who.toUpperCase(), txt = `${who}: ${L.text}`, ls = wrap(txt, 34, 1600, 600);
    out += ls.map((l, i) => tpill(960, 860 + i * 66 - (ls.length - 1) * 33, l, 34, "#120E2E", "#fff", { w: 600 })).join(""); } }
  return out + T(960, 1050, `${s.name} · ${(t - s.t0).toFixed(1)} / ${(s.t1 - s.t0).toFixed(1)} s`, 26, "#DDD3FF", { w: 500 }) + HUD(t); }
