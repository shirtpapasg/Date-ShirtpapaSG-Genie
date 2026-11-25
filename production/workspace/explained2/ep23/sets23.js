// sets23.js: EP23's two real places (drawn 2026-11-25). The static parts are baked (bake.js -> bg/cs23.png, bg/sr23.png); the live parts
// (the ceiling fans, the scrapyard's crane, the lorries passing on the road, the auntie, the boards, the props, the hidden animal) are drawn
// every frame on top, in WORLD coordinates (1920 x 1080 at camera 1; cam = [z, cx, cy] as CAM / camPt / camOn).
// PART 1 (CS23): a COFFEE SHOP IN AN INDUSTRIAL ESTATE on Saturday morning, across the road from a SCRAP METAL YARD: an open-sided coffee
//   shop (a ceiling with two fans, a pillar at each side, the left one with a white wall socket low on it), the drinks stall with its kopi
//   cups and the auntie, a stack of plastic drink crates, a big potted plant, the next round table with a plastic stool and a mop pail, cream
//   floor tiles, the bicycle rack on the kerb; across the road a bus stop and a rain tree (every leaf on a twig), the yard's tall green fence
//   with its sign SCRAP METAL and its open gate, heaps of rusty iron and steel scrap, a tipper lorry, and the crane with its big round disc.
// PART 2 (SR23): the SCHOOL SCIENCE ROOM on Monday after school: the window onto the school garden (a big tree, leaves on twigs), the
//   windowsill with a potted plant, the notice board ASK · TEST · SHARE, the sink, the bookshelf, the cupboard with a tray of AA batteries,
//   the open door to the corridor with the OLD ELECTRIC BELL above it (and the ledge under the bell), a back bench with tall stools, two
//   ceiling fans, Momo's easel folded by the wall, the NEAR BENCH (wooden top) where the mini crane and HOW STRONG? stand.

/* ================================================================ trees and fans (copied unchanged from ../ep22/sets22.js) ================================================================ */
function tree22(B, k = 1, col = ["#8ED06A", "#5FB04E", "#3E8A3E"], seed = 1) { let s = "", lv = "";
  for (const [x0, y0, x1, y1, w] of B) s += `<path d="M${x0} ${y0} Q${n2((x0 + x1) / 2 + (x1 - x0) * .1)} ${n2((y0 + y1) / 2 - 20)} ${x1} ${y1}" stroke="#5E4632" stroke-width="${w}" fill="none" stroke-linecap="round"/><path d="M${x0 - w * .2} ${y0} Q${n2((x0 + x1) / 2)} ${n2((y0 + y1) / 2 - 20)} ${x1 - w * .15} ${y1}" stroke="#8A6A4E" stroke-width="${n2(w * .25)}" fill="none" stroke-linecap="round" opacity=".6"/>`;
  B.filter((b) => b[4] < 26).forEach(([x0, y0, x1, y1], bi) => { for (let j = 0; j < 6; j++) { const a = -Math.PI / 2 + (j - 2.5) * .55 + .3 * (hash(bi * 7 + j, seed) - .5), L = 70 + 40 * hash(bi * 7 + j, seed + 2), ex = x1 + Math.cos(a) * L, ey = y1 + Math.sin(a) * L * .8 + 10;
      lv += `<path d="M${x1} ${y1} L${n2(ex)} ${n2(ey)}" stroke="#6E553E" stroke-width="4" stroke-linecap="round"/>`;
      for (let i = 0; i < 6; i++) { const u = .25 + i * .14, px = lerp(x1, ex, u), py = lerp(y1, ey, u), sd = i % 2 ? 1 : -1, la = a * 180 / Math.PI + 90 + sd * (55 + 12 * hash(i + j, seed + 3)), c = col[(i + j + bi) % 3];
        lv += `<g transform="translate(${n2(px)} ${n2(py)}) rotate(${n2(la)})"><path d="M0 0 V-6" stroke="#4E6E36" stroke-width="2.4"/><path d="M0 -5 Q-11 -16 0 -32 Q11 -16 0 -5z" fill="${c}" stroke="#2F6A34" stroke-width="1.6"/></g>`; }
      lv += `<g transform="translate(${n2(ex)} ${n2(ey)}) rotate(${n2(a * 180 / Math.PI + 90)})"><path d="M0 0 Q-12 -16 0 -34 Q12 -16 0 0z" fill="${col[0]}" stroke="#2F6A34" stroke-width="1.6"/></g>`; } });
  return TF(0, 0, k, s + lv); }
const fan22 = (t, x, y) => { const a = t * 190; return `<path d="M${x} -40 V${y - 6}" stroke="#8A949E" stroke-width="8"/>` + [0, 120, 240].map((d) => { const c = Math.cos((a + d) * Math.PI / 180); return `<ellipse cx="${n2(x + c * 105)}" cy="${y + 4}" rx="${n2(Math.abs(c) * 100 + 12)}" ry="10" fill="#F4F6F2" stroke="#A8B0BA" stroke-width="3"/>`; }).join("") + `<circle cx="${x}" cy="${y}" r="22" fill="#C9D0D8" stroke="#8A949E" stroke-width="3"/>`; };
// a RAIN TREE: a wide umbrella of branches, every leaf on a twig (k: scale; origin = the trunk's foot)
const RAIN_B = [[0, 0, -6, -200, 46], [-6, -200, -170, -300, 26], [-6, -200, 160, -310, 26], [-6, -200, 10, -340, 20], [-170, -300, -300, -330, 14], [-170, -300, -150, -400, 14], [160, -310, 290, -340, 14], [160, -310, 120, -410, 14], [10, -340, -40, -430, 12], [10, -340, 70, -440, 12], [-300, -330, -360, -280, 10], [290, -340, 350, -290, 10]];

/* ================================================================ PART 1: THE COFFEE SHOP ================================================================ */
const CS = { kerbFar: 560, road: [560, 650], kerb: 650, floor: 680, fence: [820, 1810, 360, 560], gate: [1000, 1420], pillarL: [20, 130], pillarR: [1810, 1920], socket: [75, 790], table: [960, 850] };
BG.cs23 = () => { let s = `<rect x="-200" y="-120" width="2320" height="1320" fill="url(#csSky)"/>`;
  // far: low factory buildings of the industrial estate (grey and pale blue, roller doors)
  s += [[-200, 260, 340], [300, 640, 300], [1700, 2120, 280]].map(([x0, x1, y0]) => `<rect x="${x0}" y="${y0}" width="${x1 - x0}" height="${560 - y0}" fill="#C9D3DC" stroke="#9AA8B4" stroke-width="3"/><rect x="${x0}" y="${y0}" width="${x1 - x0}" height="14" fill="#8AA6C0"/>` + [0, 1, 2].map((i) => `<rect x="${x0 + 30 + i * (x1 - x0) / 3}" y="${y0 + 60}" width="${(x1 - x0) / 3 - 60}" height="${520 - y0 - 40}" fill="#AEB8C2" stroke="#8A96A2" stroke-width="2"/>`).join("")).join("");
  // the rain tree across the road (left) and the bus stop
  s += TF(420, 560, 1.15, tree22(RAIN_B, 1, ["#9ED86E", "#6CBF52", "#4E9E44"], 3));
  s += `<rect x="600" y="430" width="200" height="16" rx="4" fill="#5B8FC0"/><path d="M612 446 V560 M788 446 V560" stroke="#6E7882" stroke-width="8"/><rect x="630" y="470" width="120" height="70" rx="4" fill="#E8F2FA" stroke="#8A96A2" stroke-width="3"/>` + T(690, 500, "BUS", 20, "#2E6E9A") + T(690, 526, "STOP", 20, "#2E6E9A") + `<rect x="620" y="520" width="160" height="10" rx="3" fill="#9AA4AE"/>`;
  // the SCRAP METAL yard: heaps of rusty scrap behind the fence (some peek over it), the tipper lorry inside the gate
  const heap = (cx, w, h, seed) => { let g = `<path d="M${cx - w / 2} 560 Q${cx - w / 4} ${560 - h} ${cx} ${560 - h - 10} Q${cx + w / 4} ${560 - h} ${cx + w / 2} 560z" fill="#8A5A3E" stroke="#5A3420" stroke-width="4"/>`;
    for (let i = 0; i < 16; i++) { const x = cx + (hash(i, seed) - .5) * w * .8, y = 560 - h * (.15 + .7 * hash(i, seed + 1)) * (1 - Math.abs(x - cx) / w), a = hash(i, seed + 2) * 180; g += `<rect x="${n2(x - 22)}" y="${n2(y - 5)}" width="44" height="10" rx="3" fill="${["#A8683E", "#6E5A4E", "#B8784A", "#7A6A5E"][i % 4]}" transform="rotate(${n2(a)} ${n2(x)} ${n2(y)})"/>`; }
    return g + [...Array(4)].map((_, i) => `<circle cx="${n2(cx + (hash(i, seed + 5) - .5) * w * .6)}" cy="${n2(560 - h * .4 * hash(i, seed + 6))}" r="14" fill="none" stroke="#6E5A4E" stroke-width="6"/>`).join(""); };
  s += `<rect x="${CS.fence[0]}" y="440" width="${CS.fence[1] - CS.fence[0]}" height="120" fill="#B8A890"/>` + heap(1290, 300, 120, 2) + heap(1540, 420, 230, 5) + heap(1720, 260, 170, 7);
  s += `<g transform="translate(1100 560)"><rect x="-120" y="-90" width="190" height="66" rx="6" fill="#4E7AB0" stroke="#2E4A70" stroke-width="4"/><path d="M-122 -92 L-110 -110 H66 L74 -92" fill="#6A90C0" stroke="#2E4A70" stroke-width="3"/><rect x="74" y="-96" width="70" height="72" rx="6" fill="#E8E2D0" stroke="#7A7262" stroke-width="4"/><rect x="88" y="-86" width="44" height="28" rx="3" fill="#BFE6FF"/><rect x="-128" y="-28" width="276" height="10" fill="#3A3A44"/>` + [-90, -10, 110].map((wx) => `<circle cx="${wx}" cy="-12" r="16" fill="#2E2E36"/><circle cx="${wx}" cy="-12" r="6" fill="#9AA4AE"/>`).join("") + `</g>`;
  // the tall green fence with its open gate and the sign SCRAP METAL
  const [fx0, fx1, fy0, fy1] = CS.fence, [gx0, gx1] = CS.gate;
  for (const [a, b] of [[fx0, gx0], [gx1, fx1]]) s += `<rect x="${a}" y="${fy0}" width="${b - a}" height="${fy1 - fy0}" fill="#4E9A5E" stroke="#2E6A3A" stroke-width="4"/>` + [...Array(Math.floor((b - a) / 40))].map((_, i) => `<path d="M${a + 20 + i * 40} ${fy0} V${fy1}" stroke="#3E8A4E" stroke-width="3"/>`).join("");
  s += `<rect x="${gx0 - 18}" y="${fy0 - 30}" width="22" height="${fy1 - fy0 + 30}" fill="#6E7882" stroke="#3E464E" stroke-width="3"/><rect x="${gx1 - 4}" y="${fy0 - 30}" width="22" height="${fy1 - fy0 + 30}" fill="#6E7882" stroke="#3E464E" stroke-width="3"/>`
    + `<path d="M${gx0 + 4} ${fy0 + 10} L${gx0 - 60} ${fy0 + 40} V${fy1 - 10} L${gx0 + 4} ${fy1}" fill="#5AA66A" stroke="#2E6A3A" stroke-width="3" opacity=".9"/>`
    + `<rect x="850" y="380" width="230" height="64" rx="6" fill="#F7F5F0" stroke="#3E464E" stroke-width="4"/>` + T(965, 422, "SCRAP METAL", 32, "#3E464E", { ls: 2 });
  // the road: the far kerb, the asphalt with its lane marks, the near kerb
  s += `<rect x="-200" y="${CS.kerbFar - 6}" width="2320" height="12" fill="#B8B2A6"/><rect x="-200" y="${CS.road[0] + 6}" width="2320" height="${CS.road[1] - CS.road[0] - 6}" fill="#6A6E76"/>` + [...Array(14)].map((_, i) => `<rect x="${-180 + i * 170}" y="602" width="90" height="8" rx="3" fill="#F4F0E6"/>`).join("")
    + `<rect x="-200" y="${CS.kerb}" width="2320" height="${CS.floor - CS.kerb}" fill="#C9C3B6"/><path d="M-200 ${CS.kerb} H2120" stroke="#9A948A" stroke-width="4"/>`;
  // the bicycle rack on the kerb (the reveal spot is on the kerb beside it)
  s += [0, 1, 2, 3].map((i) => `<path d="M${1560 + i * 46} 676 V650 Q${1560 + i * 46 + 18} 626 ${1560 + i * 46 + 36} 650 V676" stroke="#8A949E" stroke-width="7" fill="none"/>`).join("") + `<g transform="translate(1660 676) scale(.8)"><circle cx="-60" cy="-30" r="30" fill="none" stroke="#3A3A44" stroke-width="6"/><circle cx="60" cy="-30" r="30" fill="none" stroke="#3A3A44" stroke-width="6"/><path d="M-60 -30 L-10 -30 L20 -70 L-30 -70 Z M20 -70 L60 -30 M-30 -70 L-36 -86 M20 -70 L26 -90 H44" stroke="#E0453A" stroke-width="6" fill="none" stroke-linejoin="round"/></g>`;
  // the coffee shop: the floor tiles, the ceiling, the two pillars (the white wall socket low on the left one)
  s += `<rect x="-200" y="${CS.floor}" width="2320" height="${1200 - CS.floor}" fill="url(#csFloor)"/>` + [...Array(12)].map((_, i) => `<path d="M-200 ${CS.floor + i * i * 6 + i * 14} H2120" stroke="#D8CDB8" stroke-width="2"/>`).join("") + [...Array(22)].map((_, i) => `<path d="M${960 + (i - 11) * 40} ${CS.floor} L${960 + (i - 11) * 170} 1200" stroke="#D8CDB8" stroke-width="2"/>`).join("");
  s += `<rect x="-200" y="-120" width="2320" height="200" fill="#8A6A4E"/><rect x="-200" y="70" width="2320" height="18" fill="#6E5038"/>` + [...Array(12)].map((_, i) => `<rect x="${-180 + i * 200}" y="-120" width="22" height="190" fill="#7A5A40"/>`).join("") + `<rect x="300" y="88" width="500" height="10" fill="#FFF3C8" opacity=".5"/><rect x="1140" y="88" width="500" height="10" fill="#FFF3C8" opacity=".5"/>`;
  for (const [a, b] of [CS.pillarL, CS.pillarR]) s += `<rect x="${a}" y="80" width="${b - a}" height="1120" fill="#E8DCC8" stroke="#B8A890" stroke-width="4"/><rect x="${a + 10}" y="80" width="18" height="1120" fill="#fff" opacity=".3"/><rect x="${a}" y="600" width="${b - a}" height="12" fill="#C9B89A"/>`;
  s += socket23(CS.socket[0], CS.socket[1], .62);
  // the drinks stall (left): the counter, stacked kopi cups, a menu board, a glass case of buns
  s += `<rect x="140" y="250" width="320" height="70" rx="8" fill="#2E4A3A" stroke="#1E2E24" stroke-width="4"/>` + T(300, 278, "DRINKS", 28, "#FFE38A", { ls: 3 }) + T(300, 306, "kopi · teh · milo · iced lemon tea", 16, "#fff", { w: 600 })
    + `<rect x="140" y="560" width="320" height="200" fill="#D8C3A0" stroke="#8A6A4E" stroke-width="4"/><rect x="130" y="546" width="340" height="22" rx="5" fill="#E8DCC8" stroke="#8A6A4E" stroke-width="3"/><rect x="150" y="600" width="300" height="10" fill="#C9AE84"/>`
    + [...Array(4)].map((_, r) => [...Array(5 - r)].map((_, i) => `<path d="M${170 + i * 26 + r * 13} ${540 - r * 20} l4 -18 h16 l4 18z" fill="#fff" stroke="#8A7A62" stroke-width="2"/>`).join("")).join("")
    + `<rect x="340" y="470" width="110" height="76" rx="6" fill="#E6F6FF" stroke="#8A96A2" stroke-width="3" opacity=".9"/>` + [0, 1, 2].map((i) => `<ellipse cx="${362 + i * 34}" cy="530" rx="14" ry="9" fill="#E8B46A" stroke="#A8743A" stroke-width="2"/>`).join("");
  // the stack of plastic drink crates (red and blue) by the stall
  s += [[490, 700, "#D6402E"], [490, 650, "#3A7AD8"], [490, 600, "#D6402E"]].map(([x, y, c]) => `<rect x="${x}" y="${y}" width="110" height="50" rx="5" fill="${c}" stroke="${P.ink}" stroke-width="3"/>` + [0, 1, 2, 3].map((i) => `<rect x="${x + 10 + i * 25}" y="${y + 12}" width="16" height="26" rx="3" fill="#fff" opacity=".25"/>`).join("")).join("") + `<rect x="490" y="750" width="110" height="20" fill="#B8322A"/>`;
  // the next round table (back right) with a plastic stool and the mop pail
  s += `<ellipse cx="1500" cy="700" rx="120" ry="22" fill="#F2EDE4" stroke="#A8A090" stroke-width="4"/><path d="M1500 720 V800 M1460 800 H1540" stroke="#8A949E" stroke-width="10"/>`
    + `<path d="M1630 760 L1610 820 M1690 760 L1710 820 M1615 800 H1705" stroke="#2E6FD6" stroke-width="7"/><ellipse cx="1660" cy="756" rx="46" ry="12" fill="#3A8DFF" stroke="#1F5FD0" stroke-width="4"/>`
    + `<path d="M1740 760 L1756 830 H1800 L1816 760z" fill="#FFC83A" stroke="#A8864E" stroke-width="4"/><ellipse cx="1778" cy="760" rx="38" ry="8" fill="#E8B42A" stroke="#A8864E" stroke-width="3"/><path d="M1790 760 L1840 560" stroke="#8A6A4A" stroke-width="7"/>`;
  return s; };
const XDEFS23 = () => `${lg("csSky", [[0, "#8FD3FF"], [1, "#E6F6FF"]])}${lg("csFloor", [[0, "#EFE6D4"], [1, "#E2D6BE"]])}${lg("csTop", [[0, "#F7F2EA"], [1, "#E2DACB"]])}${lg("srWall", [[0, "#F4EFE6"], [1, "#E6DDCF"]])}${lg("srFloor", [[0, "#B9C7BC"], [1, "#9AAB9E"]])}${lg("srBench", [[0, "#DDB27A"], [1, "#B98A52"]])}${lg("srSky", [[0, "#9ED7FF"], [1, "#E8F7FF"]])}`;
// the big potted plant (live: the leaves sway a little; every leaf on its stalk on a stem from the soil). origin = the pot's rim middle
const potPlant23 = (t, x, y, k = 1) => { let s = `<path d="M-70 0 H70 L56 110 H-56z" fill="#C8693E" stroke="#8A4224" stroke-width="5"/><rect x="-78" y="-12" width="156" height="20" rx="6" fill="#D87A4E" stroke="#8A4224" stroke-width="4"/><ellipse cx="0" cy="-2" rx="66" ry="8" fill="#5A3A22"/>`;
  for (let j = 0; j < 7; j++) { const ex = (j - 3) * 34 + 6 * Math.sin(t * .9 + j), ey = -170 - 70 * hash(j, 4); s += `<path d="M${(j - 3) * 8} 0 Q${n2(ex * .4)} ${n2(ey * .5)} ${n2(ex)} ${n2(ey)}" stroke="#3E7A3A" stroke-width="5" fill="none"/>`;
    for (let i = 0; i < 5; i++) { const u = .3 + i * .16, px = lerp((j - 3) * 8, ex, u), py = lerp(0, ey, u), a = (i % 2 ? 1 : -1) * 58 + (j - 3) * 8; s += `<g transform="translate(${n2(px)} ${n2(py)}) rotate(${n2(a)})"><path d="M0 0 V-6" stroke="#3E7A3A" stroke-width="2.6"/><path d="M0 -5 Q-16 -26 0 -50 Q16 -26 0 -5z" fill="${(i + j) % 2 ? "#58B56C" : "#4BA862"}" stroke="#2F6A34" stroke-width="1.8"/></g>`; } }
  return TF(x, y, k, s); };
// a lorry passing on the road now and then (out of focus, far). FACES: right (its cab at the right) and it drives left to right: matches
const roadLorry = (t) => { const u = (((t - 6) % 23) + 23) % 23 / 6; if (u <= 0 || u >= 1) return ""; const x = lerp(-300, 2200, u); return `<g filter="url(#b2)" transform="translate(${n2(x)} 640) scale(.7)"><rect x="-200" y="-150" width="280" height="120" rx="6" fill="#E8E2D0" stroke="#7A7262" stroke-width="4"/><rect x="80" y="-120" width="110" height="90" rx="10" fill="#3A8DFF" stroke="#1F5FD0" stroke-width="4"/><rect x="100" y="-108" width="60" height="36" rx="4" fill="#BFE6FF"/>` + [-150, -60, 140].map((wx) => `<circle cx="${wx}" cy="-24" r="22" fill="#2E2E36"/>`).join("") + `</g>`; };
// the yard's crane, live: o.crane = { sw, lift, on, fall } (default: slowly lifting a tangle, never dropping it: the cold open's "it does NOT drop it")
const CRANE_AT = [1640, 560, .62];
const yardCraneLive = (t, o) => TF(CRANE_AT[0], CRANE_AT[1], CRANE_AT[2], yardCrane23(t, o || { sw: 0, lift: .5 + .5 * Math.sin(t * .25), on: true }));
/* the hidden MILLIPEDE's spots in the coffee shop [x, y, k, o]: INTRO = the rim of the big potted plant (cold, back, title, today, game: never
   used again); then a NEW fair spot in every scene: up the leg of the next table (waitw), along the stack of drink crates (answer), the rim of
   the mop pail (lc1q), the bottom rung of the plastic stool at the next table (holdon, well away from the socket), a fallen rain-tree leaf on
   the floor tiles (lc2q); the REVEAL: the kerb by the bicycle rack (liz). Not in a look-closer, a journey or a countdown. */
const POT = [700, 700];
const MPAT = { intro: [POT[0] - 40, POT[1] - 12, .3, {}], waitw: [1498, 760, .26, { rot: -90 }], answer: [545, 600, .28, {}], lc1q: [1765, 758, .26, {}], holdon: [1660, 800, .26, {}],
  lc2q: [1060, 1004, .3, { flip: true }], liz: [1500, 668, .34, {}] };
['cold', 'back', 'title', 'today', 'game', 'lasttime'].forEach((k) => { MPAT[k] = MPAT.intro; });
const leaf23 = (x, y, a = 20) => TF(x, y, 1, `<path d="M-40 0 Q-10 -26 40 -4 Q10 22 -40 0z" fill="#C9A45A" stroke="#8A6A2A" stroke-width="3"/><path d="M-40 0 L40 -4" stroke="#8A6A2A" stroke-width="2"/><path d="M-44 0 l-10 4" stroke="#8A6A2A" stroke-width="3"/>`, a);
// CS23: the live coffee shop. o: top (the props on the round table, world coordinates), front (in front of it), bug (an MPAT entry | false;
// default the scene's own), table (true), board (OUR MINI CRANE at its HOME, true; o.boardO its options), crane (the yard crane's state), dim
const BOARD1 = [1150, 864, .78];
function CS23(t, o = {}, cam) { const sc = (window._S || {}).name, bd = o.bug === undefined ? MPAT[sc] : o.bug;
  let s = bg("cs23") + yardCraneLive(t, o.crane) + roadLorry(t) + TF(300, 600, .9, auntie23(t)) + fan22(t, 700, 96) + fan22(t, 1240, 96) + potPlant23(t, POT[0], POT[1], .9);
  if (sc === "lc2q" || o.leaf) s += leaf23(1050, 1012, 8);
  const bugS = bd ? millipedeAt(t, bd[0], bd[1], bd[2], { ...bd[3], ph: .9 }) : "";
  if (bd && bd[1] < CS.table[1]) s += bugS;
  if (o.table !== false) s += table23(t);
  if (o.board !== false) s += boardCrane23(t, BOARD1[0], BOARD1[1], BOARD1[2], o.boardO || {});
  if (o.table !== false) s += o.top || "";
  if (bd && bd[1] >= CS.table[1]) s += bugS;
  if (o.front) s += o.front;
  if (o.dim) s += `<rect x="-200" y="-120" width="2320" height="1320" fill="${P.night}" opacity="${n2(o.dim)}"/>`;
  return cam ? CAM(s, cam[0], cam[1], cam[2]) : s; }
// the big ROUND TABLE (white top, a centre pedestal; the top's front edge y 900): x 420..1500
function table23(t) { return `<path d="M940 920 V1090 M860 1090 H1020" stroke="#8A949E" stroke-width="20"/><ellipse cx="960" cy="868" rx="560" ry="58" fill="url(#csTop)" stroke="#A8A090" stroke-width="5"/><path d="M400 868 Q960 960 1520 868 V884 Q960 976 400 884z" fill="#C9C1B2" stroke="#A8A090" stroke-width="3"/>`
  + `<ellipse cx="820" cy="858" rx="260" ry="20" fill="#fff" opacity=".35"/>`; }

/* ================================================================ PART 2: THE SCIENCE ROOM ================================================================ */
const SR = { win: [140, 150, 640, 520], sill: 528, board: [700, 170, 960, 330], sink: [700, 560, 960, 640], shelf: [990, 260, 1230, 640], cup: [1250, 360, 1440, 640], door: [1500, 160, 1740, 640], bell: [1620, 92], floor: 640, bench: [380, 830, 1540, 870] };
BG.sr23 = () => { const [wx0, wy0, wx1, wy1] = SR.win; let s = `<rect x="-200" y="-120" width="2320" height="${SR.floor + 120}" fill="url(#srWall)"/><rect x="-200" y="${SR.floor}" width="2320" height="${1200 - SR.floor}" fill="url(#srFloor)"/><rect x="-200" y="${SR.floor - 10}" width="2320" height="14" fill="#C9BFAE"/>`;
  // the window onto the school garden: the sky, the grass, a path, the big tree (every leaf on a twig)
  s += `<rect x="${wx0}" y="${wy0}" width="${wx1 - wx0}" height="${wy1 - wy0}" fill="url(#srSky)"/><rect x="${wx0}" y="${wy0 + 250}" width="${wx1 - wx0}" height="${wy1 - wy0 - 250}" fill="#8ACB6A"/><path d="M${wx0} ${wy1 - 40} Q400 ${wy1 - 90} ${wx1} ${wy1 - 60} L${wx1} ${wy1} H${wx0}z" fill="#D9CDB0"/>`
    + `<clipPath id="srWin"><rect x="${wx0}" y="${wy0}" width="${wx1 - wx0}" height="${wy1 - wy0}"/></clipPath><g clip-path="url(#srWin)">${TF(390, 470, .62, tree22(RAIN_B, 1, ["#9ED86E", "#6CBF52", "#4E9E44"], 7))}</g>`
    + `<rect x="${wx0}" y="${wy0}" width="${wx1 - wx0}" height="${wy1 - wy0}" fill="none" stroke="#F7F4EE" stroke-width="18"/><path d="M${(wx0 + wx1) / 2} ${wy0} V${wy1} M${wx0} ${(wy0 + wy1) / 2} H${wx1}" stroke="#F7F4EE" stroke-width="12"/>`
    + `<rect x="${wx0 - 30}" y="${SR.sill - 10}" width="${wx1 - wx0 + 60}" height="22" rx="4" fill="#E8E0D0" stroke="#B8AE9C" stroke-width="3"/>`;
  // the notice board with the poster ASK · TEST · SHARE
  const [bx0, by0, bx1, by1] = SR.board; s += `<rect x="${bx0}" y="${by0}" width="${bx1 - bx0}" height="${by1 - by0}" rx="6" fill="#C99A62" stroke="#7A5230" stroke-width="5"/><rect x="${bx0 + 14}" y="${by0 + 14}" width="${bx1 - bx0 - 28}" height="${by1 - by0 - 28}" fill="#E8D2A8"/>`
    + `<rect x="${bx0 + 30}" y="${by0 + 26}" width="200" height="60" rx="4" fill="#FFF8EA" stroke="#B8AE9C" stroke-width="2"/>` + T(bx0 + 130, by0 + 66, "ASK · TEST · SHARE", 22, "#2E6E9A") + `<rect x="${bx0 + 40}" y="${by0 + 96}" width="80" height="50" fill="#BFE6FF"/><rect x="${bx0 + 140}" y="${by0 + 98}" width="90" height="46" fill="#FFF3A8"/>`;
  // the sink on its cupboard, a tap
  const [sx0, sy0, sx1, sy1] = SR.sink; s += `<rect x="${sx0}" y="${sy0}" width="${sx1 - sx0}" height="${sy1 - sy0}" fill="#9FB4C4" stroke="#5E7282" stroke-width="4"/><rect x="${sx0 - 10}" y="${sy0 - 14}" width="${sx1 - sx0 + 20}" height="18" rx="4" fill="#D8DEE3" stroke="#8A96A2" stroke-width="3"/><path d="M${sx0 + 40} ${sy0 - 12} Q${(sx0 + sx1) / 2} ${sy0 + 30} ${sx1 - 40} ${sy0 - 12}" fill="#B8C4CE" stroke="#8A96A2" stroke-width="3"/><path d="M${(sx0 + sx1) / 2} ${sy0 - 14} V${sy0 - 60} H${(sx0 + sx1) / 2 + 40} V${sy0 - 44}" stroke="#A8B0BA" stroke-width="8" fill="none" stroke-linecap="round"/>`;
  // the bookshelf
  const [hx0, hy0, hx1, hy1] = SR.shelf; s += `<rect x="${hx0}" y="${hy0}" width="${hx1 - hx0}" height="${hy1 - hy0}" fill="#A87C4A" stroke="#6E4E2E" stroke-width="5"/>` + [0, 1, 2, 3].map((r) => { const y = hy0 + 20 + r * 92; let b = `<rect x="${hx0 + 10}" y="${y + 74}" width="${hx1 - hx0 - 20}" height="10" fill="#7A5A3A"/>`; for (let i = 0; i < 9; i++) b += `<rect x="${hx0 + 14 + i * 24}" y="${y + 10 + 8 * hash(i + r * 9, 3)}" width="20" height="${n2(64 - 8 * hash(i + r * 9, 3))}" rx="2" fill="${["#E0453A", "#3A8DFF", "#43BF6C", "#FFC83A", "#9B6BFF", "#FF9838"][(i + r) % 6]}" stroke="${P.ink}" stroke-width="1.5"/>`; return b; }).join("");
  // the cupboard with glass doors: a tray of AA batteries on its middle shelf
  const [cx0, cy0, cx1, cy1] = SR.cup; s += `<rect x="${cx0}" y="${cy0}" width="${cx1 - cx0}" height="${cy1 - cy0}" fill="#D8C3A0" stroke="#8A6A4E" stroke-width="5"/><rect x="${cx0 + 12}" y="${cy0 + 12}" width="${(cx1 - cx0) / 2 - 18}" height="${cy1 - cy0 - 24}" fill="#E6F6FF" opacity=".55" stroke="#8A6A4E" stroke-width="3"/><rect x="${(cx0 + cx1) / 2 + 6}" y="${cy0 + 12}" width="${(cx1 - cx0) / 2 - 18}" height="${cy1 - cy0 - 24}" fill="#E6F6FF" opacity=".55" stroke="#8A6A4E" stroke-width="3"/>`
    + `<rect x="${cx0 + 20}" y="${cy0 + 130}" width="${cx1 - cx0 - 40}" height="34" rx="4" fill="#5A5A66"/>` + [...Array(7)].map((_, i) => `<rect x="${cx0 + 28 + i * 20}" y="${cy0 + 136}" width="14" height="24" rx="3" fill="#3A3A44"/><rect x="${cx0 + 28 + i * 20}" y="${cy0 + 136}" width="14" height="6" rx="2" fill="#D9A43A"/>`).join("") + T((cx0 + cx1) / 2, cy0 + 200, "AA batteries", 18, P.ink, { w: 600 });
  // the open door to the corridor; the ledge under the bell
  const [dx0, dy0, dx1, dy1] = SR.door; s += `<rect x="${dx0 - 16}" y="${dy0 - 16}" width="${dx1 - dx0 + 32}" height="${dy1 - dy0 + 16}" fill="#C9BFAE"/><rect x="${dx0}" y="${dy0}" width="${dx1 - dx0}" height="${dy1 - dy0}" fill="#EDE6D6"/><rect x="${dx0}" y="${dy0 + 300}" width="${dx1 - dx0}" height="${dy1 - dy0 - 300}" fill="#C9C1B4"/><rect x="${dx0 + 40}" y="${dy0 + 40}" width="120" height="70" rx="4" fill="#BFE6FF" opacity=".8"/>`
    + `<path d="M${dx1} ${dy0} L${dx1 + 70} ${dy0 + 30} V${dy1 + 20} L${dx1} ${dy1}z" fill="#8A6A4E" stroke="#5A3A22" stroke-width="4"/><rect x="${dx0 - 30}" y="${dy0 - 34}" width="${dx1 - dx0 + 60}" height="20" rx="4" fill="#B8AE9C" stroke="#8A7E6A" stroke-width="3"/>`;
  // the back bench with tall stools (one stool nearer, by the bench's end)
  s += `<rect x="60" y="560" width="560" height="22" rx="4" fill="#C99A62" stroke="#7A5230" stroke-width="4"/><rect x="70" y="582" width="540" height="58" fill="#B8865A" stroke="#7A5230" stroke-width="3"/>`
    + [[1300, 700], [1060, 720]].map(([x, y]) => `<path d="M${x - 30} ${y} L${x - 46} ${y + 120} M${x + 30} ${y} L${x + 46} ${y + 120} M${x - 40} ${y + 70} H${x + 40}" stroke="#6E7882" stroke-width="7"/><ellipse cx="${x}" cy="${y}" rx="44" ry="12" fill="#3A3A44" stroke="#1E1E26" stroke-width="3"/>`).join("");
  return s; };
/* the hidden CRICKET's spots in the science room [x, y, k, o]: INTRO = the windowsill beside the potted plant (lasttime? no; lab, game: never
   used again); then a NEW fair spot in every scene: the rim of the sink (waitw), the rung of a tall stool by the bench (r1ans), the leg of
   Momo's folded easel by the wall (lc1q), the spine of a book on the bookshelf (show, fix), the window frame (lc2q); the REVEAL: the ledge
   right under the corridor's school bell (liz). */
const CKAT = { intro: [520, SR.sill - 8, .3, { clean: true }], waitw: [780, 548, .26, {}], r1ans: [1060, 790, .26, {}], lc1q: [1476, 690, .26, { rot: -80 }], show: [1110, 470, .24, { rot: -90, hop: false }],
  lc2q: [152, 330, .26, { rot: -90, hop: false }], liz: [1560, 140, .3, { clean: true }] };
['lab', 'game'].forEach((k) => { CKAT[k] = CKAT.intro; }); CKAT.fix = CKAT.show;
// the windowsill's potted plant (live), Momo's easel folded by the wall
const sillPlant = (t) => TF(590, SR.sill - 6, .5, potPlant23(t, 0, -110, 1));
const easelFolded = `<path d="M1470 430 L1440 700 M1486 430 L1500 700 M1478 420 L1476 700" stroke="#7A5230" stroke-width="10" stroke-linecap="round"/>`;
// SR23: the live science room. o: bench (the props on the near bench), front, bug (a CKAT entry | false), hs (HOW STRONG? at its HOME, true;
// o.hsO its options), bell (the bell's ring 0..1), easel (Momo's folded easel by the wall, true), dim
const HSB = [1150, 852, .8];
function SR23(t, o = {}, cam) { const sc = (window._S || {}).name, bd = o.bug === undefined ? CKAT[sc] : o.bug;
  let s = bg("sr23") + fan22(t, 620, 60) + fan22(t, 1320, 60) + sillPlant(t) + TF(SR.bell[0], SR.bell[1], .42, bell23(t, { ring: o.bell || 0 })) + (o.easel !== false ? easelFolded : "");
  const bugS = bd ? cricketAt(t, bd[0], bd[1], bd[2], { ...bd[3], ph: .4 }) : "";
  if (bd && bd[1] < SR.bench[1]) s += bugS;
  s += bench23(t);
  if (o.hs !== false) s += howStrong23(t, HSB[0], HSB[1], HSB[2], o.hsO || {});
  if (o.bench) s += o.bench;
  if (bd && bd[1] >= SR.bench[1]) s += bugS;
  if (o.front) s += o.front;
  if (o.dim) s += `<rect x="-200" y="-120" width="2320" height="1320" fill="${P.night}" opacity="${n2(o.dim)}"/>`;
  return cam ? CAM(s, cam[0], cam[1], cam[2]) : s; }
// the NEAR BENCH (x 380..1540, top y 830..870)
function bench23(t) { const [x0, y0, x1, y1] = SR.bench;
  return `<path d="M${x0 + 30} ${y1} V1090 M${x1 - 30} ${y1} V1090" stroke="#8A6438" stroke-width="18"/><rect x="${x0 + 20}" y="1000" width="${x1 - x0 - 40}" height="14" fill="#A87C4A" stroke="#7A5230" stroke-width="3"/>`
    + `<path d="M${x0 + 30} ${y0} H${x1 - 30} L${x1} ${y1} H${x0}z" fill="url(#srBench)" stroke="#8A6438" stroke-width="5" stroke-linejoin="round"/><rect x="${x0}" y="${y1}" width="${x1 - x0}" height="18" fill="#A87C4A" stroke="#7A5230" stroke-width="3"/>`
    + `<path d="M${x0 + 60} ${y0 + 8} L${x0 + 520} ${y0 + 8} L${x0 + 560} ${y1 - 6} L${x0 + 40} ${y1 - 6}z" fill="#FFF4C8" opacity=".16"/>`; }
