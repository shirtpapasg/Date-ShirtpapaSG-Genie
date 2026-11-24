// sets22.js: EP22's two real places (Stage 2, drawn 2026-11-24). The static parts are baked (bake.js -> bg/hs22.png, bg/ms22.png); the
// live parts (the wind chime, the shoppers, the trees' twigs, the fans, the 3D printer, the boards, the props, the hidden animal) are drawn
// every frame on top, in WORLD coordinates (1920 x 1080 at camera 1; cam = [z, cx, cy] as CAM / camPt / camOn).
// PART 1: a HARDWARE SHOP at an HDB neighbourhood centre on Saturday morning (HS22): on the left, across the walkway, the square (a big
// ANGSANA TREE, a wooden notice board, a wooden pergola, a wooden planter box, the HDB blocks behind with a provision shop and a bakery on
// their ground floor); a frangipani tree by the shop; the shop front on the right under the five-foot way's roof (the sign HARDWARE, a wall of
// small wooden drawers NAILS · SCREWS · HOOKS, coils of rope, stacked pails, the door with the wind chime and the cash counter inside, a
// tall rack of brooms and mops with their wooden handles up, garden hoses); a stack of wooden pallets against the shop front; the WOODEN
// FOLDING TABLE outside with two plastic stools. Saturday-morning sun on the square, soft shade under the roof, dappled light under the tree.
// PART 2: a SCHOOL MAKER SPACE on Monday after school (MS22): the window onto the school garden (a big tree), the ledge with Basil's snack
// box, the pegboard of hand tools, the poster MAKE · TEST · IMPROVE, the 3D printer on its cabinet, the back workbench with tall stools and
// bins, the small sink, two ceiling fans, the NEAR WORKBENCH (wooden top) with the craft bin on its shelf. Warm afternoon window light.

/* ================================================================ trees and plants (every leaf on a twig) ================================================================ */
// a broad tree (the angsana; the school garden's tree): origin = the trunk's foot. B = branches [x0, y0, x1, y1, w] in local units; every
// branch end carries twigs, every leaf sits on a twig with a short stalk. col: [light, mid, dark] greens. o.live: only the twigs (to sway)
function tree22(B, k = 1, col = ["#8ED06A", "#5FB04E", "#3E8A3E"], seed = 1) { let s = "", lv = "";
  for (const [x0, y0, x1, y1, w] of B) s += `<path d="M${x0} ${y0} Q${n2((x0 + x1) / 2 + (x1 - x0) * .1)} ${n2((y0 + y1) / 2 - 20)} ${x1} ${y1}" stroke="#5E4632" stroke-width="${w}" fill="none" stroke-linecap="round"/><path d="M${x0 - w * .2} ${y0} Q${n2((x0 + x1) / 2)} ${n2((y0 + y1) / 2 - 20)} ${x1 - w * .15} ${y1}" stroke="#8A6A4E" stroke-width="${n2(w * .25)}" fill="none" stroke-linecap="round" opacity=".6"/>`;
  B.filter((b) => b[4] < 26).forEach(([x0, y0, x1, y1], bi) => { for (let j = 0; j < 6; j++) { const a = -Math.PI / 2 + (j - 2.5) * .55 + .3 * (hash(bi * 7 + j, seed) - .5), L = 70 + 40 * hash(bi * 7 + j, seed + 2), ex = x1 + Math.cos(a) * L, ey = y1 + Math.sin(a) * L * .8 + 10;
      lv += `<path d="M${x1} ${y1} L${n2(ex)} ${n2(ey)}" stroke="#6E553E" stroke-width="4" stroke-linecap="round"/>`;
      for (let i = 0; i < 6; i++) { const u = .25 + i * .14, px = lerp(x1, ex, u), py = lerp(y1, ey, u), sd = i % 2 ? 1 : -1, la = a * 180 / Math.PI + 90 + sd * (55 + 12 * hash(i + j, seed + 3)), c = col[(i + j + bi) % 3];
        lv += `<g transform="translate(${n2(px)} ${n2(py)}) rotate(${n2(la)})"><path d="M0 0 V-6" stroke="#4E6E36" stroke-width="2.4"/><path d="M0 -5 Q-11 -16 0 -32 Q11 -16 0 -5z" fill="${c}" stroke="#2F6A34" stroke-width="1.6"/></g>`; }
      lv += `<g transform="translate(${n2(ex)} ${n2(ey)}) rotate(${n2(a * 180 / Math.PI + 90)})"><path d="M0 0 Q-12 -16 0 -34 Q12 -16 0 0z" fill="${col[0]}" stroke="#2F6A34" stroke-width="1.6"/></g>`; } });
  return TF(0, 0, k, s + lv); }
const ANGSANA_B = [[0, 0, -10, -250, 64], [-10, -250, -150, -380, 34], [-10, -250, 120, -400, 36], [-150, -380, -280, -430, 18], [-150, -380, -120, -520, 18], [120, -400, 260, -440, 18], [120, -400, 70, -560, 18], [-10, -250, -10, -480, 26], [-10, -480, -60, -600, 16], [-10, -480, 60, -610, 16], [-280, -430, -340, -360, 12], [260, -440, 330, -370, 12]];
// a flowering FRANGIPANI (thick grey forked branches; long leaves in rosettes at the branch tips; white flowers with yellow centres)
function frangipani22(t, x, y, k = 1) { const B = [[0, 0, 0, -170, 26], [0, -170, -90, -260, 16], [0, -170, 80, -280, 16], [-90, -260, -140, -330, 11], [-90, -260, -40, -350, 11], [80, -280, 40, -360, 11], [80, -280, 150, -330, 11]];
  let s = `<path d="M-60 0 H60 L50 60 H-50z" fill="#C8693E" stroke="#8A4224" stroke-width="5"/><rect x="-68" y="-10" width="136" height="16" rx="5" fill="#D87A4E" stroke="#8A4224" stroke-width="4"/>`;
  for (const [x0, y0, x1, y1, w] of B) s += `<path d="M${x0} ${y0} L${x1} ${y1}" stroke="#7E7A70" stroke-width="${w}" stroke-linecap="round"/>`;
  B.slice(3).forEach(([, , x1, y1], i) => { const sw = 3 * Math.sin(t * 1.2 + i);
    for (let j = 0; j < 6; j++) { const a = -150 + j * 50 + sw; s += `<g transform="translate(${x1} ${y1}) rotate(${n2(a)})"><path d="M0 0 V-6" stroke="#4E7A36" stroke-width="3"/><path d="M0 -4 Q-12 -30 0 -62 Q12 -30 0 -4z" fill="${j % 2 ? "#4BA862" : "#3E9A5A"}" stroke="#2F6A34" stroke-width="2"/><path d="M0 -8 V-56" stroke="#2F6A34" stroke-width="1.4" opacity=".6"/></g>`; }
    s += `<path d="M${x1} ${y1} L${x1 + 4} ${y1 - 26}" stroke="#4E7A36" stroke-width="3"/>` + [0, 1, 2].map((f) => { const fx = x1 + (f - 1) * 16 + sw, fy = y1 - 30 - (f % 2) * 10; return `<g transform="translate(${n2(fx)} ${fy}) rotate(${n2(f * 25 + t * 4)})">${[0, 72, 144, 216, 288].map((r) => `<ellipse cx="0" cy="-8" rx="5.5" ry="9" fill="#FFFDF4" stroke="#D9C9A8" stroke-width="1.2" transform="rotate(${r})"/>`).join("")}<circle r="4" fill="#FFD34A"/></g>`; }).join(""); });
  return TF(x, y, k, s); }
// a low shrub in the planter (stems from the soil, leaves on short stalks)
const shrub22 = (t, x, y, k = 1, ph = 0) => { let s = ""; for (let j = 0; j < 5; j++) { const ex = (j - 2) * 22 + 4 * Math.sin(t * 1.1 + j + ph), ey = -70 - 20 * hash(j, 9);
    s += `<path d="M${(j - 2) * 8} 0 Q${n2(ex * .5)} ${n2(ey * .5)} ${n2(ex)} ${n2(ey)}" stroke="#3E7A3A" stroke-width="4" fill="none"/>`;
    for (let i = 0; i < 4; i++) { const u = .35 + i * .18, px = lerp((j - 2) * 8, ex, u), py = lerp(0, ey, u), a = (i % 2 ? 1 : -1) * 55 + (j - 2) * 8; s += `<g transform="translate(${n2(px)} ${n2(py)}) rotate(${n2(a)})"><path d="M0 0 V-4" stroke="#3E7A3A" stroke-width="2"/><path d="M0 -3 Q-8 -12 0 -22 Q8 -12 0 -3z" fill="${(i + j) % 2 ? "#58B56C" : "#4BA862"}" stroke="#2F6A34" stroke-width="1.4"/></g>`; } }
  return TF(x, y, k, s); };

/* ================================================================ PART 1: THE HARDWARE SHOP ================================================================ */
const HS = { col: 1080, kerb: 792, table: [480, 834, 1240, 884], board: [1150, 856], pal: [1290, 1450, 690, 800], rack: [1660, 1830], door: [1460, 1640], drawers: [1130, 1440, 262, 520] };
BG.hs22 = () => { let s = `<rect x="-200" y="-120" width="2320" height="1320" fill="url(#hsSky)"/>`;
  // the HDB blocks behind the square (windows, a coloured stripe, a water tank on the roof); the provision shop and the bakery on the ground floor
  const blk = (x0, x1, y0, c) => { let b = `<rect x="${x0}" y="${y0}" width="${x1 - x0}" height="${640 - y0}" fill="url(#hsBlock)" stroke="#C9BFAE" stroke-width="4"/><rect x="${x0}" y="${y0}" width="${x1 - x0}" height="16" fill="${c}"/><rect x="${x0 + 30}" y="${y0 - 40}" width="80" height="40" fill="#DCD3C4" stroke="#C9BFAE" stroke-width="3"/>`;
    for (let r = 0; r * 56 + y0 + 40 < 520; r++) for (let i = 0; x0 + 24 + i * 52 < x1 - 30; i++) b += `<rect x="${x0 + 24 + i * 52}" y="${y0 + 36 + r * 56}" width="34" height="30" rx="3" fill="${hash(i + r * 5, x0) > .7 ? "#FFE9B8" : "#9DB8C9"}" stroke="#B8AE9C" stroke-width="2"/>` + (hash(i * 3 + r, x0) > .8 ? `<path d="M${x0 + 20 + i * 52} ${y0 + 70 + r * 56} H${x0 + 62 + i * 52}" stroke="${["#E0453A", "#3A8DFF", "#FFC83A", "#9B6BFF"][(i + r) % 4]}" stroke-width="4"/>` : "");
    return b; };
  s += blk(-200, 250, 70, "#E8A38A") + blk(300, 700, 150, "#8FC6A8") + blk(760, 1180, 100, "#E8C26A");
  s += `<rect x="300" y="520" width="400" height="120" fill="#EDE6DA"/><rect x="760" y="520" width="420" height="120" fill="#EDE6DA"/>`
    + `<path d="M310 520 H690 L670 556 H330z" fill="#3A8DFF" opacity=".85"/>` + T(500, 548, "PROVISION SHOP", 22, "#fff") + `<rect x="340" y="566" width="320" height="74" fill="#C9B89A"/>` + [0, 1, 2, 3, 4].map((i) => `<rect x="${350 + i * 62}" y="${578 + (i % 2) * 6}" width="50" height="22" rx="3" fill="${["#E0453A", "#FFC83A", "#43BF6C", "#FF9838", "#9B6BFF"][i]}"/>`).join("")
    + `<path d="M780 520 H1170 L1150 556 H800z" fill="#E86A8A" opacity=".85"/>` + T(975, 548, "BAKERY", 22, "#fff") + `<rect x="810" y="566" width="330" height="74" fill="#F4E2C6"/>` + [0, 1, 2, 3].map((i) => `<ellipse cx="${850 + i * 78}" cy="600" rx="30" ry="14" fill="#D99A52" stroke="#A8692E" stroke-width="3"/>`).join("");
  // the square: paving, a lawn strip, the kerb of the walkway
  s += `<rect x="-200" y="640" width="1300" height="${HS.kerb - 640}" fill="url(#hsPave)"/>` + [...Array(14)].map((_, i) => `<path d="M${-200 + i * 100} 640 L${-260 + i * 110} ${HS.kerb}" stroke="#B5AE9E" stroke-width="2"/>`).join("") + `<path d="M-200 700 H1100 M-200 750 H1100" stroke="#B5AE9E" stroke-width="2"/>`
    + `<path d="M-200 650 Q300 640 640 656 L640 690 Q300 676 -200 690z" fill="#8ACB6A" opacity=".9"/>`
    + `<ellipse cx="270" cy="770" rx="230" ry="40" fill="#5E7A4A" opacity=".18"/>`;
  // the notice board (wooden, two legs, pinned papers)
  s += `<path d="M512 620 V740 M628 620 V740" stroke="#7A5230" stroke-width="12"/><rect x="496" y="520" width="148" height="104" rx="6" fill="#B07A42" stroke="#6E4422" stroke-width="5"/><rect x="508" y="532" width="124" height="80" fill="#D9B98C"/>`
    + `<rect x="516" y="540" width="46" height="34" fill="#fff" transform="rotate(-3 539 557)"/><rect x="572" y="538" width="50" height="40" fill="#FFF3A8"/><rect x="530" y="580" width="56" height="26" fill="#BFE6FF"/>` + [[539, 542], [597, 540], [558, 582]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3" fill="#E0453A"/>`).join("");
  // the pergola (wooden posts and beams; a creeper on top, every leaf on its stem)
  s += `<path d="M700 780 V540 M900 780 V540 M760 760 V560 M960 760 V560" stroke="#8A5A30" stroke-width="22" stroke-linecap="square"/><path d="M700 780 V540 M900 780 V540" stroke="#B07A42" stroke-width="14"/>`
    + `<rect x="672" y="526" width="320" height="18" rx="4" fill="#9A6A3A"/>` + [0, 1, 2, 3, 4, 5].map((i) => `<rect x="${680 + i * 56}" y="510" width="14" height="44" rx="3" fill="#B07A42"/>`).join("")
    + [0, 1, 2, 3, 4, 5, 6, 7].map((i) => { const x = 690 + i * 40; return `<path d="M${x} 526 q8 -16 18 -22" stroke="#3E7A3A" stroke-width="3" fill="none"/><path d="M${x + 18} 504 Q${x + 8} 494 ${x + 18} 482 Q${x + 28} 494 ${x + 18} 504z" fill="#58B56C" stroke="#2F6A34" stroke-width="1.5"/><path d="M${x + 4} 528 q-4 10 -2 22" stroke="#3E7A3A" stroke-width="2.5" fill="none"/><path d="M${x + 2} 550 Q${x - 8} 558 ${x - 2} 570 Q${x + 8} 560 ${x + 2} 550z" fill="#4BA862" stroke="#2F6A34" stroke-width="1.5"/>`; }).join("");
  // the wooden planter box in front of the pergola (its shrubs are live)
  s += `<rect x="600" y="726" width="380" height="66" rx="4" fill="url(#hsWood)" stroke="#7A5230" stroke-width="5"/>` + [0, 1, 2].map((i) => `<path d="M604 ${746 + i * 16} H976" stroke="#9A6A3A" stroke-width="3"/>`).join("") + `<rect x="596" y="720" width="388" height="12" rx="4" fill="#C99158" stroke="#7A5230" stroke-width="3"/>`;
  // the angsana tree's trunk and branches (the twigs and leaves are baked too; a few live twigs sway on top)
  s += `<g transform="translate(262 772)"><path d="M-40 0 Q-30 -120 -22 -250 L22 -250 Q30 -120 46 0 Q70 4 80 14 L-80 14 Q-62 4 -40 0z" fill="#6E5644" stroke="#3E2E22" stroke-width="5"/><path d="M-10 -10 Q-4 -120 -8 -240 M14 -20 Q18 -130 10 -236" stroke="#8A7260" stroke-width="5" fill="none" opacity=".7"/></g>`
    + TF(262, 772, 1, tree22(ANGSANA_B, 1, ["#9ED86E", "#6CBF52", "#4E9E44"], 3));
  // the walkway (the five-foot way's floor tiles), the kerb
  s += `<rect x="-200" y="${HS.kerb}" width="2320" height="${1200 - HS.kerb}" fill="url(#hsWalk)"/><rect x="-200" y="${HS.kerb - 6}" width="1290" height="12" fill="#A89E8C"/>`;
  for (let i = -14; i <= 16; i++) s += `<path d="M${960 + i * 120} ${HS.kerb} L${960 + i * 230} 1200" stroke="#A89A84" stroke-width="2" opacity=".6"/>`;
  for (const y of [840, 900, 980, 1080]) s += `<path d="M-200 ${y} H2120" stroke="#A89A84" stroke-width="2" opacity=".5"/>`;
  // THE SHOP FRONT (x > HS.col): the five-foot way's roof and its shade, the column, the sign, the drawers, the ropes and pails, the door,
  // the counter and the radio inside, the broom rack, the hoses
  const [dx0, dx1] = HS.door, [wx0, wx1, wy0, wy1] = HS.drawers;
  s += `<rect x="${HS.col}" y="-120" width="1100" height="260" fill="#E8DDCB"/><rect x="${HS.col}" y="120" width="1100" height="28" fill="#C9BBA4"/><rect x="${HS.col}" y="148" width="1100" height="652" fill="#EFE4D2"/>`
    + `<rect x="1230" y="160" width="580" height="76" rx="8" fill="#2F5FA8" stroke="#1E3E7A" stroke-width="5"/>` + T(1520, 214, "HARDWARE", 54, "#fff", { ls: 10 })
    + `<rect x="${wx0}" y="${wy0}" width="${wx1 - wx0}" height="${wy1 - wy0}" fill="#9A6A3A" stroke="#6E4422" stroke-width="5"/>`;
  for (let r = 0; r < 5; r++) for (let c = 0; c < 6; c++) { const x = wx0 + 10 + c * 50, y = wy0 + 10 + r * 50; s += `<rect x="${x}" y="${y}" width="44" height="44" rx="3" fill="#C99158" stroke="#7A5230" stroke-width="2.5"/><circle cx="${x + 22}" cy="${y + 30}" r="4" fill="#5A3A1E"/>`; }
  [["NAILS", 0], ["SCREWS", 1], ["HOOKS", 2]].forEach(([w, i]) => { s += `<rect x="${wx0 + 10 + i * 100}" y="${wy0 + 270}" width="94" height="30" rx="5" fill="#FFF8EA" stroke="#6E4422" stroke-width="3"/>` + T(wx0 + 57 + i * 100, wy0 + 292, w, 19, P.ink); });
  s += [0, 1, 2].map((i) => `<ellipse cx="${1170 + i * 70}" cy="620" rx="30" ry="30" fill="none" stroke="#C9A060" stroke-width="10"/><ellipse cx="${1170 + i * 70}" cy="620" rx="14" ry="14" fill="none" stroke="#A8803E" stroke-width="6"/>`).join("")
    + [0, 1, 2].map((i) => `<path d="M${1350 + i * 8} ${700 - i * 34} L${1342 + i * 8} ${740 - i * 34} H${1430 - i * 8} L${1422 - i * 8} ${700 - i * 34}z" fill="${["#E0453A", "#3A8DFF", "#43BF6C"][i]}" stroke="#2B2147" stroke-width="3"/>`).join("");
  s += `<rect x="${dx0}" y="250" width="${dx1 - dx0}" height="550" fill="url(#hsInside)"/><path d="M${dx0} 250 V800 M${dx1} 250 V800" stroke="#9A8A72" stroke-width="10"/>`
    + `<rect x="${dx0 + 20}" y="300" width="${dx1 - dx0 - 40}" height="150" fill="#5E4C3E"/>` + [0, 1, 2].map((r) => `<path d="M${dx0 + 20} ${340 + r * 46} H${dx1 - 20}" stroke="#3E3026" stroke-width="5"/>` + [0, 1, 2, 3, 4].map((i) => `<rect x="${dx0 + 30 + i * 30}" y="${312 + r * 46}" width="22" height="26" fill="${["#E8B04A", "#9DB8C9", "#E06A5A", "#C9C9C9", "#8ACB6A"][(i + r) % 5]}"/>`).join("")).join("")
    + `<rect x="${dx0 + 10}" y="580" width="${dx1 - dx0 - 20}" height="220" fill="#8A6A4A" stroke="#5E4632" stroke-width="5"/><rect x="${dx0 + 4}" y="568" width="${dx1 - dx0 - 8}" height="20" rx="4" fill="#B08A5E"/><rect x="${dx0 + 40}" y="530" width="70" height="40" rx="6" fill="#4A4E5A"/><rect x="${dx0 + 48}" y="538" width="30" height="24" rx="3" fill="#9DE0B0"/><rect x="${dx0 + 120}" y="540" width="40" height="28" rx="5" fill="#C9472E"/><circle cx="${dx0 + 132}" cy="554" r="7" fill="#2B2147"/><path d="M${dx0 + 148} 540 L${dx0 + 162} 516" stroke="#888" stroke-width="3"/>`;
  // the broom and mop rack (wooden handles UP), the garden hoses
  const [rx0, rx1] = HS.rack; s += `<rect x="${rx0}" y="600" width="${rx1 - rx0}" height="20" rx="4" fill="#7A5230"/><rect x="${rx0}" y="760" width="${rx1 - rx0}" height="40" rx="4" fill="#7A5230"/>`;
  for (let i = 0; i < 5; i++) { const x = rx0 + 18 + i * 34, top = 330 + 20 * (i % 2); s += `<rect x="${x - 5}" y="${top}" width="10" height="${640 - top}" rx="5" fill="#C99158" stroke="#7A5230" stroke-width="2.5"/>` + (i % 2 ? `<path d="M${x - 22} 640 H${x + 22} L${x + 16} 760 H${x - 16}z" fill="#E8D2A0" stroke="#A8864E" stroke-width="3"/>` : `<path d="M${x - 20} 640 H${x + 20} L${x + 26} 760 H${x - 26}z" fill="#3A8DFF" stroke="#1F5FD0" stroke-width="3"/>` + [0, 1, 2, 3].map((j) => `<path d="M${x - 18 + j * 12} 700 V758" stroke="#1F5FD0" stroke-width="2"/>`).join("")); }
  s += [0, 1].map((i) => `<ellipse cx="${1870}" cy="${400 + i * 150}" rx="42" ry="56" fill="none" stroke="${["#43BF6C", "#FF9838"][i]}" stroke-width="12"/>`).join("");
  // the column and the shade under the roof; the pallets against the shop front (three wooden pallets)
  s += `<rect x="${HS.col - 10}" y="-120" width="60" height="${HS.kerb + 130}" fill="#DCCFBB" stroke="#B8AA92" stroke-width="4"/><rect x="${HS.col}" y="148" width="1100" height="60" fill="url(#hsShade)"/>`;
  const [p0, p1, py0, py1] = HS.pal; for (let i = 0; i < 4; i++) { const y = py1 - (i + 1) * 28; s += `<rect x="${p0}" y="${y}" width="${p1 - p0}" height="10" fill="#C99158" stroke="#7A5230" stroke-width="2.5"/><rect x="${p0}" y="${y + 18}" width="${p1 - p0}" height="10" fill="#C99158" stroke="#7A5230" stroke-width="2.5"/>` + [0, .5, 1].map((u) => `<rect x="${n2(lerp(p0, p1 - 20, u))}" y="${y + 8}" width="20" height="12" fill="#A8743E"/>`).join(""); }
  // dappled light under the angsana, the morning sun on the square
  s += [...Array(10)].map((_, i) => `<ellipse cx="${n2(60 + 50 * i + 30 * hash(i, 2))}" cy="${n2(680 + 80 * hash(i, 3))}" rx="${n2(26 + 20 * hash(i, 4))}" ry="10" fill="#FFF4C8" opacity=".35"/>`).join("")
    + `<path d="M-200 640 H1080 V792 H-200z" fill="#FFF4C8" opacity=".08"/>`;
  return s; };
// the live shop: the wind chime, the angsana's live twigs, the frangipani, shoppers far off on the square (out of focus, one at a time), an
// auntie pulling a market trolley, a pigeon pecking
const windChime = (t, x, y) => { let s = `<path d="M${x} ${y - 90} V${y - 60}" stroke="#7A6A5A" stroke-width="3"/><ellipse cx="${x}" cy="${y - 60}" rx="34" ry="8" fill="#B08A5E" stroke="#6E4422" stroke-width="3"/>`;
  for (let i = 0; i < 5; i++) { const a = 6 * Math.sin(t * 1.6 + i * 1.3), L = 60 + i * 9, x0 = x - 28 + i * 14; s += `<g transform="rotate(${n2(a)} ${x0} ${y - 56})"><path d="M${x0} ${y - 56} V${y - 56 + L * .4}" stroke="#7A6A5A" stroke-width="1.6"/><rect x="${x0 - 3}" y="${n2(y - 56 + L * .4)}" width="6" height="${n2(L * .6)}" rx="3" fill="#D8DEE3" stroke="#8A949E" stroke-width="1.5"/></g>`; }
  return s + `<g transform="rotate(${n2(9 * Math.sin(t * 1.3))} ${x} ${y - 56})"><path d="M${x} ${y - 56} V${y + 30}" stroke="#7A6A5A" stroke-width="1.6"/><rect x="${x - 10}" y="${y + 30}" width="20" height="26" rx="3" fill="#E8C26A" stroke="#A8864E" stroke-width="2"/></g>`; };
const shopper = (t, x, y, c, ph, trolley) => { const w = Math.sin(t * 6 + ph); let s = `<g transform="translate(${n2(x)} ${y})"><ellipse cx="0" cy="4" rx="30" ry="6" fill="${P.ink}" opacity=".15"/><path d="M-8 0 L${n2(-8 + 8 * w)} -60 M8 0 L${n2(8 - 8 * w)} -60" stroke="#4A4E5A" stroke-width="10" stroke-linecap="round"/><rect x="-20" y="-124" width="40" height="70" rx="16" fill="${c}"/><circle cx="0" cy="-142" r="18" fill="#E8B48A"/><path d="M-18 -148 Q0 -170 18 -148z" fill="#2A1E16"/>`;
  if (trolley) s += `<path d="M24 -80 L56 -40" stroke="#6E7884" stroke-width="5"/><rect x="40" y="-60" width="44" height="54" rx="8" fill="#C9472E"/><path d="M40 -44 H84 M40 -28 H84 M56 -60 V-6 M70 -60 V-6" stroke="#2F5FA8" stroke-width="3"/><circle cx="50" cy="-2" r="8" fill="#2B2147"/><circle cx="76" cy="-2" r="8" fill="#2B2147"/>`;
  return s + `</g>`; };
const SHOPPERS = [[0, "#E86A8A", 0], [9, "#5B9FD0", 1], [17, "#FF9838", 0], [26, "#8FC6A8", 1], [34, "#9B6BFF", 0]];
const pigeon22 = (t, x, y, k = 1) => { const pk = Math.max(0, Math.sin(t * 2.6)) > .7 ? 12 : 0; return TF(x, y, k, `<ellipse cx="0" cy="-24" rx="30" ry="18" fill="#8A8EA0"/><path d="M-26 -26 Q-50 -30 -52 -18 Q-36 -16 -24 -20z" fill="#6A6E80"/><g transform="rotate(${pk} 20 -30)"><circle cx="22" cy="-38" r="12" fill="#7A7E92"/><path d="M14 -30 Q22 -24 30 -30" stroke="#7FB8A0" stroke-width="5" fill="none"/><path d="M32 -40 l10 3 l-10 3z" fill="#D9A86A"/><circle cx="25" cy="-41" r="2.6" fill="#2B2147"/></g><path d="M-4 -6 V2 M6 -6 V2" stroke="#E88A6A" stroke-width="3"/>`); };
/* the hidden WOODPECKER's spots in the hardware shop [x, y, k, o] (SCENES_TODO rule 8): INTRO = the angsana's trunk (cold .. game: never used
   again); then a NEW fair spot in every scene: a branch of the frangipani by the shop (waitw), the top of the notice board (answer), a post of
   the pergola (pipclaim), the top of the pallet stack (holdon), the edge of the planter box (lcq2); the REVEAL: the wooden handle of a broom
   in the shop's rack (liz). */
const WPAT = { intro: [302, 470, .4, { flip: true, hop: true }], waitw: [1028, 562, .36, { flip: true }], answer: [580, 518, .36, { peck: false }], pipclaim: [712, 640, .34, { flip: true }],
  holdon: [1384, 682, .36, { peck: false }], lcq2: [940, 722, .34, { peck: false }], liz: [1717, 430, .4, { flip: true }] };
['cold', 'back', 'title', 'today', 'game'].forEach((k) => { WPAT[k] = WPAT.intro; });
// HS22: the live hardware shop. o: top (the props on the table, world coordinates), front (in front of the table), bird (a WPAT entry | false;
// default the scene's own), table (true), board (OUR FISHING GAME at its HOME, true), dim
function HS22(t, o = {}, cam) { const sc = (window._S || {}).name, bd = o.bird === undefined ? WPAT[sc] : o.bird;
  let s = bg("hs22");
  for (const [t0, c, tr] of SHOPPERS) { const u = (((t - t0) % 42) + 42) % 42 / 11; if (u > 0 && u < 1) s += `<g filter="url(#b2)" opacity=".85">${shopper(t, lerp(tr ? 1100 : -120, tr ? -120 : 1100, u), 786, c, t0, tr)}</g>`; }
  s += pigeon22(t, 1010, 790, .7) + windChime(t, 1490, 330) + frangipani22(t, 1010, 760, .95);
  s += TF(262, 772, 1, `<g transform="rotate(${n2(1.2 * Math.sin(t * .9))} -150 -380)">${tree22([[-150, -380, -230, -300, 10]], 1, ["#9ED86E", "#6CBF52", "#4E9E44"], 9)}</g><g transform="rotate(${n2(1.4 * Math.sin(t * .8 + 1))} 120 -400)">${tree22([[120, -400, 210, -330, 10]], 1, ["#9ED86E", "#6CBF52", "#4E9E44"], 11)}</g>`);
  s += [0, 1, 2, 3].map((i) => shrub22(t, 650 + i * 92, 724, 1, i)).join("");
  if (bd) s += woodpeckerAt(t, bd[0], bd[1], bd[2], { ...bd[3], ph: 1.3 });
  if (o.table !== false) s += table22(t);
  if (o.board !== false) s += fishBoard22(t, HS.board[0], HS.board[1] - 4, .8, o.boardO || {});
  if (o.table !== false) s += o.top || "";
  if (o.front) s += o.front;
  if (o.dim) s += `<rect x="-200" y="-120" width="2320" height="1320" fill="${P.night}" opacity="${n2(o.dim)}"/>`;
  return cam ? CAM(s, cam[0], cam[1], cam[2]) : s; }
// the WOODEN FOLDING TABLE (x 480..1240, the top's back edge y 834, its front edge y 884) and two plastic stools under it
function table22(t) { const [x0, y0, x1, y1] = HS.table;
  return `<path d="M640 1080 L700 960 H760 L700 1080z M1060 1080 L1000 960 H1060 L1120 1080z" fill="#D6402E" stroke="#8A2418" stroke-width="4"/><ellipse cx="730" cy="958" rx="62" ry="14" fill="#E8533A" stroke="#8A2418" stroke-width="4"/><ellipse cx="1030" cy="958" rx="62" ry="14" fill="#3A8DFF" stroke="#1F5FD0" stroke-width="4"/>`
    + `<path d="M${x0 + 60} ${y1 + 12} L${x1 - 120} 1090 M${x1 - 60} ${y1 + 12} L${x0 + 120} 1090" stroke="#8A6A4A" stroke-width="12" stroke-linecap="round"/><path d="M${x0 + 30} ${y1 + 12} L${x0 + 30} 1090 M${x1 - 30} ${y1 + 12} L${x1 - 30} 1090" stroke="#7A5A3A" stroke-width="10"/>`
    + `<path d="M${x0 + 30} ${y0} H${x1 - 30} L${x1} ${y1} H${x0}z" fill="url(#hsTop)" stroke="#8A5A30" stroke-width="5" stroke-linejoin="round"/><rect x="${x0}" y="${y1}" width="${x1 - x0}" height="16" fill="#A8743E" stroke="#7A5230" stroke-width="3"/>`
    + [0, 1, 2, 3].map((i) => `<path d="M${x0 + 40 + i * 4} ${y0 + 12 + i * 10} H${x1 - 40 - i * 4}" stroke="#B88A54" stroke-width="2" opacity=".6"/>`).join("") + `<path d="M${x0 + 60} ${y0 + 6} L${x0 + 400} ${y0 + 6} L${x0 + 440} ${y1 - 6} L${x0 + 40} ${y1 - 6}z" fill="#FFF4C8" opacity=".14"/>`; }
// the table's own props (world): the paper bag of nails, the tray of steel clips, the magnet's box (o.box: lid 0..1, o.mag), the magnet lying
// on the table (o.magOn), loose nails
const TB = { bag: [545, 874], tray: [890, 878], box: [610, 880], mag: [700, 860], nails: [1060, 868] };
const tableProps = (t, o = {}) => (o.bag === false ? "" : paperBag22(TB.bag[0], TB.bag[1], .55)) + (o.box === false ? "" : magBox22(t, TB.box[0] + 80, TB.box[1] + 4, .5, { lid: o.lid === undefined ? 0 : o.lid, mag: o.boxMag }))
  + (o.magOn ? TF(1000, 856, .42, bar20(t, { glint: false })) : "") + (o.tray === false ? "" : trayClips22(t, TB.tray[0], TB.tray[1], .62, { n: o.trayN })) + (o.nails === false ? "" : nail21(1050, 872, .28, 8) + nail21(1062, 882, .28, -6));

/* ================================================================ PART 2: THE SCHOOL MAKER SPACE ================================================================ */
const MS = { win: [80, 150, 620, 560], peg: [700, 150, 1180, 470], poster: [1230, 170, 1440, 400], prn: [1250, 560, 1470], sink: [1520, 1900, 600], floor: 760, bench: [420, 822, 1500, 862] };
BG.ms22 = () => { const [wx0, wy0, wx1, wy1] = MS.win, [px0, py0, px1, py1] = MS.peg, fl = MS.floor;
  let s = `<rect x="-200" y="-120" width="2320" height="1320" fill="url(#msWall)"/><rect x="-200" y="-120" width="2320" height="160" fill="#FBF8F2"/><path d="M-200 40 H2120" stroke="#DDD2BE" stroke-width="6"/>`
    + `<rect x="-200" y="${fl}" width="2320" height="${1200 - fl}" fill="url(#msFloor)"/><rect x="-200" y="${fl - 18}" width="2320" height="20" fill="#C9BCA6"/>`;
  for (let i = -14; i <= 14; i++) s += `<path d="M${960 + i * 120} ${fl} L${960 + i * 250} 1200" stroke="#9E9484" stroke-width="2" opacity=".55"/>`;
  for (const y of [800, 870, 960, 1080]) s += `<path d="M-200 ${y} H2120" stroke="#9E9484" stroke-width="2" opacity=".45"/>`;
  // the window onto the school garden: sky, the field, a fence, the big tree (every leaf on a twig)
  s += `<rect x="${wx0 - 18}" y="${wy0 - 18}" width="${wx1 - wx0 + 36}" height="${wy1 - wy0 + 36}" rx="8" fill="#F4F1EA" stroke="#A8A090" stroke-width="5"/><clipPath id="msWin"><rect x="${wx0}" y="${wy0}" width="${wx1 - wx0}" height="${wy1 - wy0}"/></clipPath><g clip-path="url(#msWin)"><rect x="${wx0}" y="${wy0}" width="${wx1 - wx0}" height="${wy1 - wy0}" fill="url(#msSky)"/>`
    + `<ellipse cx="200" cy="210" rx="80" ry="22" fill="#fff" opacity=".85"/><rect x="${wx0}" y="400" width="${wx1 - wx0}" height="${wy1 - 400}" fill="url(#msGrass)"/>` + [...Array(18)].map((_, i) => `<path d="M${wx0 + 10 + i * 31} 392 V420" stroke="#8A9AA6" stroke-width="3"/>`).join("") + `<path d="M${wx0} 396 H${wx1}" stroke="#8A9AA6" stroke-width="3"/>`
    + TF(420, 470, .55, `<path d="M-30 0 Q-20 -120 -14 -250 L14 -250 Q20 -120 34 0z" fill="#6E5644" stroke="#3E2E22" stroke-width="5"/>` + tree22(ANGSANA_B.slice(1), 1, ["#9ED86E", "#6CBF52", "#4E9E44"], 5)) + `</g>`
    + `<path d="M${(wx0 + wx1) / 2} ${wy0} V${wy1} M${wx0} 340 H${wx1}" stroke="#F4F1EA" stroke-width="14"/><path d="M${(wx0 + wx1) / 2} ${wy0} V${wy1} M${wx0} 340 H${wx1}" stroke="#B8B0A0" stroke-width="3"/>`
    + `<rect x="${wx0 - 36}" y="${wy1 + 4}" width="${wx1 - wx0 + 72}" height="26" rx="6" fill="#F4F1EA" stroke="#A8A090" stroke-width="4"/>`;
  // Basil's snack box on the ledge (a teal lid), a biscuit crumb beside it
  s += `<rect x="470" y="${wy1 - 38}" width="110" height="44" rx="10" fill="#FFFDF6" stroke="#8A949E" stroke-width="4"/><rect x="464" y="${wy1 - 48}" width="122" height="18" rx="8" fill="#14B8A6" stroke="#0E7C70" stroke-width="3"/>` + T(525, wy1 - 8, "Basil", 18, "#0E7C70")
    + `<path d="M436 ${wy1 + 4} l8 -9 l9 3 l2 7z" fill="#E2B06A" stroke="#A8743E" stroke-width="2"/>`;
  // the pegboard of hand tools (a hot-glue gun switched off and hung up)
  s += `<rect x="${px0}" y="${py0}" width="${px1 - px0}" height="${py1 - py0}" fill="#C9A070" stroke="#8A6438" stroke-width="6"/>` + [...Array(10)].map((_, r) => [...Array(16)].map((_, c) => `<circle cx="${px0 + 16 + c * 29}" cy="${py0 + 16 + r * 30}" r="3" fill="#8A6438"/>`).join("")).join("")
    + `<g transform="translate(760 230)"><rect x="-8" y="0" width="16" height="110" rx="5" fill="#C99158" stroke="#7A5230" stroke-width="3"/><rect x="-34" y="-14" width="68" height="28" rx="5" fill="#8A949E" stroke="#4E565E" stroke-width="3"/></g>`
    + `<g transform="translate(850 220)"><path d="M-10 0 L-26 110 M10 0 L26 110" stroke="#E8533A" stroke-width="16" stroke-linecap="round"/><path d="M-8 -10 L-4 -50 M8 -10 L4 -50" stroke="#8A949E" stroke-width="10" stroke-linecap="round"/><circle cx="0" cy="-4" r="7" fill="#4E565E"/></g>`
    + [0, 1, 2].map((i) => screwdriver22(930 + i * 46, 300, .42, 90 + (i - 1) * 3)).join("")
    + `<g transform="translate(1100 250)"><path d="M-40 -30 H40 L30 10 H-14 L-20 60 H-40z" fill="#5B6BD6" stroke="#2A3A8A" stroke-width="4" stroke-linejoin="round"/><rect x="40" y="-22" width="40" height="12" rx="4" fill="#8A949E"/><circle cx="-28" cy="-40" r="6" fill="none" stroke="#4E565E" stroke-width="3"/>${T(0, 100, "glue gun: off", 16, P.ink, { w: 600 })}</g>`
    + `<g transform="translate(1110 400)"><circle r="22" fill="none" stroke="#E8C26A" stroke-width="12"/><circle r="8" fill="#FFF8EA"/></g>`;
  // the poster MAKE · TEST · IMPROVE
  const [qx0, qy0, qx1, qy1] = MS.poster; s += `<g filter="url(#dropS)"><rect x="${qx0}" y="${qy0}" width="${qx1 - qx0}" height="${qy1 - qy0}" rx="6" fill="#FFF6DE"/></g><rect x="${qx0}" y="${qy0}" width="${qx1 - qx0}" height="50" fill="#FF9838"/>` + T((qx0 + qx1) / 2, qy0 + 35, "MAKER SPACE", 24, "#fff", { ls: 2 })
    + [["MAKE", "#3A8DFF"], ["TEST", "#43BF6C"], ["IMPROVE", "#9B6BFF"]].map(([w, c], i) => `<circle cx="${qx0 + 34}" cy="${qy0 + 92 + i * 58}" r="18" fill="${c}"/>` + T(qx0 + 34, qy0 + 100 + i * 58, i + 1, 22, "#fff") + T(qx0 + 120, qy0 + 101 + i * 58, w, 26, P.ink)).join("");
  // the back workbench with tall stools tucked under; bins of card, string and craft sticks under it
  s += `<rect x="640" y="590" width="560" height="22" rx="4" fill="url(#msBench)" stroke="#8A6438" stroke-width="4"/><path d="M660 612 V${fl} M1180 612 V${fl}" stroke="#8A6438" stroke-width="12"/>`
    + [760, 1060].map((x) => `<ellipse cx="${x}" cy="640" rx="44" ry="10" fill="#E8533A" stroke="#8A2418" stroke-width="3"/><path d="M${x - 30} 646 L${x - 38} ${fl} M${x + 30} 646 L${x + 38} ${fl}" stroke="#6E7884" stroke-width="6"/>`).join("")
    + [["CARD", "#F4D29C", 830], ["STRING", "#BFE6FF", 930], ["STICKS", "#DDD3FF", 1030]].map(([w, c, x]) => `<rect x="${x - 44}" y="${fl - 78}" width="88" height="76" rx="6" fill="${c}" stroke="#8A949E" stroke-width="3"/>` + T(x, fl - 34, w, 16, P.ink)).join("");
  // the 3D printer's cabinet (the printer itself is live)
  s += `<rect x="${MS.prn[0]}" y="${MS.prn[1]}" width="${MS.prn[2] - MS.prn[0]}" height="${fl - MS.prn[1]}" fill="#E4E8EE" stroke="#9AA4AE" stroke-width="4"/><path d="M${MS.prn[0]} ${MS.prn[1] + 100} H${MS.prn[2]}" stroke="#9AA4AE" stroke-width="3"/><rect x="${(MS.prn[0] + MS.prn[2]) / 2 - 20}" y="${MS.prn[1] + 40}" width="40" height="8" rx="4" fill="#8A949E"/>`;
  // the small sink: its counter, the basin, the tap
  const [sx0, sx1, sy] = MS.sink; s += `<rect x="${sx0}" y="${sy + 20}" width="${sx1 - sx0}" height="${fl - sy - 20}" fill="#DCE6EA" stroke="#8EA6B0" stroke-width="4"/><rect x="${sx0 - 10}" y="${sy}" width="${sx1 - sx0 + 20}" height="24" rx="5" fill="#B9C6CC" stroke="#7E929C" stroke-width="4"/>`
    + `<path d="M1620 ${sy + 4} H1820 L1806 ${sy + 20} H1634z" fill="#8EA6B0"/><path d="M1720 ${sy} V${sy - 70} Q1720 ${sy - 90} 1744 ${sy - 90} H1770 V${sy - 74}" fill="none" stroke="#A8B4BA" stroke-width="12" stroke-linecap="round"/>` + [1640, 1800].map((x) => `<path d="M${x} ${sy + 40} V${fl - 10}" stroke="#8EA6B0" stroke-width="3"/>`).join("")
    + `<rect x="1560" y="440" width="80" height="110" rx="8" fill="#FFFDF6" stroke="#9AA4AE" stroke-width="3"/>` + T(1600, 500, "WASH", 16, P.ink) + T(1600, 520, "HANDS", 16, P.ink);
  // the afternoon light from the window across the floor
  s += `<path d="M620 ${fl} L1100 ${fl} L1500 1200 L760 1200z" fill="#FFF4C8" opacity=".18"/>`;
  return s; };
// the ceiling fans (live) and the 3D printer (live: its head moves slowly, a little light blinks)
const fan22 = (t, x, y) => { const a = t * 190; return `<path d="M${x} 40 V${y - 6}" stroke="#8A949E" stroke-width="8"/>` + [0, 120, 240].map((d) => { const c = Math.cos((a + d) * Math.PI / 180); return `<ellipse cx="${n2(x + c * 105)}" cy="${y + 4}" rx="${n2(Math.abs(c) * 100 + 12)}" ry="10" fill="#F4F6F2" stroke="#A8B0BA" stroke-width="3"/>`; }).join("") + `<circle cx="${x}" cy="${y}" r="22" fill="#C9D0D8" stroke="#8A949E" stroke-width="3"/>`; };
const printer22 = (t) => { const [x0, y0, x1] = MS.prn, hx = (x0 + x1) / 2 + 60 * Math.sin(t * .8); return `<rect x="${x0 + 20}" y="${y0 - 180}" width="${x1 - x0 - 40}" height="180" rx="8" fill="#3A3E4A" stroke="#22252E" stroke-width="4"/><rect x="${x0 + 36}" y="${y0 - 164}" width="${x1 - x0 - 72}" height="140" fill="#5A6070"/>`
  + `<path d="M${x0 + 40} ${y0 - 130} H${x1 - 40}" stroke="#A8B0BA" stroke-width="5"/><rect x="${n2(hx - 22)}" y="${y0 - 140}" width="44" height="30" rx="4" fill="#E8533A"/><path d="M${n2(hx)} ${y0 - 110} V${y0 - 96}" stroke="#FFC83A" stroke-width="3"/><rect x="${(x0 + x1) / 2 - 50}" y="${y0 - 44}" width="100" height="14" rx="3" fill="#9B6BFF"/><rect x="${(x0 + x1) / 2 - 36}" y="${y0 - 58}" width="72" height="14" rx="3" fill="#9B6BFF" opacity=".8"/>`
  + `<circle cx="${x1 - 40}" cy="${y0 - 10}" r="6" fill="${Math.sin(t * 5) > 0 ? "#7FE58F" : "#2E6A3A"}"/>`; };
// a child passing in the corridor (through the door's glass is not in shot: through the window, far, on the path) and the garden tree's live twigs
const gardenLive = (t) => TF(420, 470, .55, `<g transform="rotate(${n2(1.5 * Math.sin(t * .9))} -150 -380)">${tree22([[-150, -380, -230, -300, 10]], 1, ["#9ED86E", "#6CBF52", "#4E9E44"], 13)}</g>`);
/* the hidden ANT's spots in the maker space [x, y, k, o] (SCENES_TODO rule 8): INTRO = beside the biscuit crumb on the window ledge, by Basil's
   snack box (maker, game: never used again); then a NEW fair spot in every scene: the rim of the cardboard pond (waitw), the bottom of the
   pegboard's frame (r1ans), a wooden ruler on the bench (ask), the leg of Pip's easel (show), the rim of the craft bin under the bench (fix),
   the window frame's side post (lc2q); the REVEAL: the edge of the small sink, leading a little line of ants (liz). */
const ANTAT = { intro: [428, 562, .34, { wave: true }], waitw: [1300, 712, .3, { walk: true, zig: true }], r1ans: [980, 470, .3, { walk: true, zig: true }], ask: [690, 832, .3, { flip: true }],
  show: [596, 940, .3, { rot: -90 }], fix: [640, 966, .3, { walk: true }], lc2q: [616, 400, .3, { rot: -90 }], liz: [1640, 598, .36, { line: 4 }] };
['maker', 'game'].forEach((k) => { ANTAT[k] = ANTAT.intro; });
// MS22: the live maker space. o: bench (the props on the near workbench, world coordinates), front (in front of it), ant (an ANTAT entry |
// false; default the scene's own), pond (THE FISHING POND at its HOME, true; o.pondO its options), wb (the FISH CAUGHT whiteboard, true), dim
const POND = [1130, 836, .7], WB = [640, 834, .62];
function MS22(t, o = {}, cam) { const sc = (window._S || {}).name, a = o.ant === undefined ? ANTAT[sc] : o.ant;
  let s = bg("ms22") + fan22(t, 560, 70) + fan22(t, 1400, 70) + printer22(t) + gardenLive(t);
  const antS = a ? (a[3].line ? antLine(t, a[0], a[1], a[2], a[3].line, 1) : antAt(t, a[0], a[1], a[2], { ...a[3], ph: .7 })) : "";
  if (a && a[1] < MS.bench[1]) s += antS;
  s += bench22(t);
  if (o.wb !== false) s += wb22(t, WB[0], WB[1], WB[2], o.wbO || {});
  if (o.pond !== false) s += pond22(t, POND[0], POND[1], POND[2], { rods: [[1, "nail", -60], [2, "none", -66], [3, "none", -72]], ...o.pondO });
  if (o.bench) s += o.bench;
  if (a && a[1] >= MS.bench[1]) s += antS;
  if (o.front) s += o.front;
  if (o.dim) s += `<rect x="-200" y="-120" width="2320" height="1320" fill="${P.night}" opacity="${n2(o.dim)}"/>`;
  return cam ? CAM(s, cam[0], cam[1], cam[2]) : s; }
// the NEAR WORKBENCH (x 420..1500, top y 822..862), its shelf with the craft bin, a wooden ruler and the tray of steel clips on it
function bench22(t) { const [x0, y0, x1, y1] = MS.bench;
  return `<path d="M${x0 + 30} ${y1} V1090 M${x1 - 30} ${y1} V1090" stroke="#8A6438" stroke-width="18"/><rect x="${x0 + 20}" y="1000" width="${x1 - x0 - 40}" height="14" fill="#A87C4A" stroke="#7A5230" stroke-width="3"/>`
    + `<rect x="560" y="948" width="170" height="54" rx="8" fill="#9FD0FF" stroke="#5B8FC0" stroke-width="4"/><rect x="556" y="942" width="178" height="14" rx="5" fill="#BFE0FF" stroke="#5B8FC0" stroke-width="3"/>` + T(645, 986, "CRAFT BIN", 18, P.ink)
    + [[580, 940, 20], [610, 936, -30], [690, 938, 40]].map(([x, y, a]) => `<rect x="${x - 4}" y="${y - 40}" width="8" height="44" rx="3" fill="#E8C26A" stroke="#A8864E" stroke-width="2" transform="rotate(${a} ${x} ${y})"/>`).join("")
    + `<path d="M${x0 + 30} ${y0} H${x1 - 30} L${x1} ${y1} H${x0}z" fill="url(#msBench)" stroke="#8A6438" stroke-width="5" stroke-linejoin="round"/><rect x="${x0}" y="${y1}" width="${x1 - x0}" height="18" fill="#A87C4A" stroke="#7A5230" stroke-width="3"/>`
    + `<path d="M${x0 + 60} ${y0 + 8} L${x0 + 520} ${y0 + 8} L${x0 + 560} ${y1 - 6} L${x0 + 40} ${y1 - 6}z" fill="#FFF4C8" opacity=".16"/>`
    + `<rect x="560" y="826" width="220" height="16" rx="3" fill="#E8C26A" stroke="#A8864E" stroke-width="2.5"/>` + [...Array(11)].map((_, i) => `<path d="M${570 + i * 20} 826 V${i % 5 ? 832 : 836}" stroke="#7A5A2A" stroke-width="2"/>`).join(""); }
