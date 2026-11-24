// sets00.js: EP0's one real place, THE VOID DECK STUDY CORNER of an HDB block (both parts; script section 1). The static parts are baked
// (bake.js -> bg/vdday.png, bg/vdnight.png); the live parts (the rain tree's twigs, the lamp post's light and moths, the neighbours, the
// rain, the hidden animals, the notice board's ONE-WEEK MEMORY TEST card, the study table and its props) are drawn every frame on top, in
// WORLD coordinates (1920 x 1080 at camera 1; cam = [z, cx, cy] as CAM / camPt / camOn).
// The place: the open ground floor under the block (a concrete ceiling with fluorescent tubes, square pillars, a tiled floor); at the LEFT the
// wall with the notice board RESIDENTS' CORNER (the card's HOME), a stone bench with a potted plant in front of it, and the steps down to
// the car park; in the MIDDLE two openings past the pillars onto the outside (a low wall with potted plants along it; beyond it a lamp post,
// a rain tree with every leaf on a twig, the playground with its slide and railing, a bicycle bay under a little roof, the next block); at
// the RIGHT the wall of metal letterboxes and the lift lobby (the lift doors, the doormat in front of them). The wooden STUDY TABLE stands in
// the middle of the floor. Times of day: day (Monday after school), dusk (Part 1's cliff), night (Monday evening: the lights on, moths round
// the lamp), rain (Thursday), morning (next Monday: sun through the pillars).

const VD = { o1: [530, 150, 930, 560], o2: [1010, 150, 1400, 560], floor: 640, lamp: [700, 205], table: [470, 700, 1450, 760], board: [52, 168, 404, 520],
  box: [1520, 232, 1690, 560], lift: [1735, 250, 1895, 640], mat: [1815, 674], bench: [255, 812], steps: [-20, 690] };
const VDC = { wall: "#EFE7D8", wallD: "#D9CFBD", pillar: "#E6DCCB", pillarS: "#CBBFAA", ceil: "#DCD5C9", tileA: "#D7CCB8", tileB: "#CFC3AE", grout: "#B8AC96" };

/* ================================================================ plants (every leaf on a stalk on a twig) ================================================================ */
// a potted plant: origin = the pot's foot. Each leaf sits on a stalk that grows from the stems (SERIES_FORMAT 5: every leaf joins a stem)
function pottedPlant(x, y, k = 1, seed = 1, t = 0, live = false) { let s = `<path d="M-34 0 L-42 -58 H42 L34 0z" fill="#C8693E" stroke="#8A4224" stroke-width="4"/><rect x="-48" y="-68" width="96" height="14" rx="5" fill="#D87A4E" stroke="#8A4224" stroke-width="3"/>`;
  const stems = 5; for (let j = 0; j < stems; j++) { const a = -Math.PI / 2 + (j - (stems - 1) / 2) * .38 + .1 * (hash(j, seed) - .5), L = 70 + 40 * hash(j, seed + 2), sw = live ? 2.5 * Math.sin(t * 1.3 + j + seed) : 0;
    const ex = Math.cos(a) * L * .9 + sw, ey = -64 + Math.sin(a) * L; s += `<path d="M0 -62 Q${n2(ex * .4)} ${n2(-64 + Math.sin(a) * L * .5)} ${n2(ex)} ${n2(ey)}" stroke="#3E7A3A" stroke-width="4" fill="none" stroke-linecap="round"/>`;
    for (let i = 0; i < 4; i++) { const u = .35 + i * .2, px = ex * u, py = -64 + (ey + 64) * u, sd = i % 2 ? 1 : -1, la = a * 180 / Math.PI + 90 + sd * (50 + 10 * hash(i + j, seed + 4)), c = ["#6FBF5A", "#4FA048", "#8ED06A"][(i + j) % 3];
      s += `<g transform="translate(${n2(px)} ${n2(py)}) rotate(${n2(la)})"><path d="M0 0 V-5" stroke="#3E7A3A" stroke-width="2.5"/><path d="M0 -4 Q-12 -16 0 -34 Q12 -16 0 -4z" fill="${c}" stroke="#2F6A34" stroke-width="1.6"/></g>`; }
    s += `<g transform="translate(${n2(ex)} ${n2(ey)}) rotate(${n2(a * 180 / Math.PI + 90)})"><path d="M0 0 Q-12 -16 0 -32 Q12 -16 0 0z" fill="#8ED06A" stroke="#2F6A34" stroke-width="1.6"/></g>`; }
  return TF(x, y, k, s); }
// the rain tree beyond the low wall: a broad crown of twigs, every leaflet on a twig (o.live: only the outer twigs sway)
const RAIN_B = [[0, 0, -8, -150, 40], [-8, -150, -120, -250, 22], [-8, -150, 110, -260, 22], [-120, -250, -230, -280, 13], [-120, -250, -90, -350, 13], [110, -260, 220, -300, 13], [110, -260, 80, -360, 13], [-8, -150, -10, -330, 16], [-10, -330, -60, -400, 10], [-10, -330, 50, -410, 10]];
function rainTree(t, x, y, k, live) { return TF(x, y, k, `<g transform="rotate(${live ? n2(.8 * Math.sin(t * .7)) : 0} 0 -150)">${tree22(RAIN_B, 1, ["#7FC660", "#5BAA4C", "#3F8A40"], 4)}</g>`); }
// tree22 (EP22's broad tree, every leaf on a twig), copied unchanged
function tree22(B, k = 1, col = ["#8ED06A", "#5FB04E", "#3E8A3E"], seed = 1) { let s = "", lv = "";
  for (const [x0, y0, x1, y1, w] of B) s += `<path d="M${x0} ${y0} Q${n2((x0 + x1) / 2 + (x1 - x0) * .1)} ${n2((y0 + y1) / 2 - 20)} ${x1} ${y1}" stroke="#5E4632" stroke-width="${w}" fill="none" stroke-linecap="round"/><path d="M${x0 - w * .2} ${y0} Q${n2((x0 + x1) / 2)} ${n2((y0 + y1) / 2 - 20)} ${x1 - w * .15} ${y1}" stroke="#8A6A4E" stroke-width="${n2(w * .25)}" fill="none" stroke-linecap="round" opacity=".6"/>`;
  B.filter((b) => b[4] < 26).forEach(([x0, y0, x1, y1], bi) => { for (let j = 0; j < 6; j++) { const a = -Math.PI / 2 + (j - 2.5) * .55 + .3 * (hash(bi * 7 + j, seed) - .5), L = 70 + 40 * hash(bi * 7 + j, seed + 2), ex = x1 + Math.cos(a) * L, ey = y1 + Math.sin(a) * L * .8 + 10;
      lv += `<path d="M${x1} ${y1} L${n2(ex)} ${n2(ey)}" stroke="#6E553E" stroke-width="4" stroke-linecap="round"/>`;
      for (let i = 0; i < 6; i++) { const u = .25 + i * .14, px = lerp(x1, ex, u), py = lerp(y1, ey, u), sd = i % 2 ? 1 : -1, la = a * 180 / Math.PI + 90 + sd * (55 + 12 * hash(i + j, seed + 3)), c = col[(i + j + bi) % 3];
        lv += `<g transform="translate(${n2(px)} ${n2(py)}) rotate(${n2(la)})"><path d="M0 0 V-6" stroke="#4E6E36" stroke-width="2.4"/><path d="M0 -5 Q-11 -16 0 -32 Q11 -16 0 -5z" fill="${c}" stroke="#2F6A34" stroke-width="1.6"/></g>`; }
      lv += `<g transform="translate(${n2(ex)} ${n2(ey)}) rotate(${n2(a * 180 / Math.PI + 90)})"><path d="M0 0 Q-12 -16 0 -34 Q12 -16 0 0z" fill="${col[0]}" stroke="#2F6A34" stroke-width="1.6"/></g>`; } });
  return TF(0, 0, k, s + lv); }

/* ================================================================ the baked set ================================================================ */
function vdBase(night) { const [a0, , a1, ay1] = VD.o1, [b0, , b1] = VD.o2, F = VD.floor;
  // outside (seen through the openings): sky, the next block, the playground, the bicycle bay, the lamp post, the rain tree, the low wall
  let out = `<rect x="-200" y="-120" width="2320" height="${F + 120}" fill="url(#${night ? "vdSkyN" : "vdSky"})"/>`;
  out += `<rect x="1060" y="190" width="420" height="380" fill="${night ? "#4A5478" : "#E9E1D2"}"/>` + [...Array(5)].map((_, r) => [...Array(6)].map((_, c) => `<rect x="${1080 + c * 66}" y="${208 + r * 66}" width="40" height="34" rx="3" fill="${night ? (hash(r * 6 + c, 3) > .45 ? "#FFE7A0" : "#2E3658") : "#9FB6C9"}"/>`).join("")).join("")
    + `<rect x="1060" y="190" width="420" height="10" fill="${night ? "#38405F" : "#CFC4B0"}"/>`;
  // the playground: a slide and a climbing frame behind a railing; the bicycle bay with its little roof
  out += `<g transform="translate(1110 470)"><path d="M0 70 L40 0 H70 L130 70" stroke="${night ? "#6F7FA8" : "#E2543E"}" stroke-width="14" fill="none" stroke-linecap="round"/><rect x="34" y="-40" width="44" height="44" rx="6" fill="${night ? "#5A6A94" : "#F2C230"}"/><path d="M40 -40 L56 -66 L72 -40" fill="${night ? "#5A6A94" : "#3FA0E0"}"/>
    <path d="M130 70 V10 M170 70 V10 M210 70 V10 M130 10 H210 M130 40 H210" stroke="${night ? "#6F7FA8" : "#3FA0E0"}" stroke-width="9" stroke-linecap="round"/></g>`;
  out += `<g transform="translate(1290 520)"><path d="M-10 -60 H110 L100 -48 H0z" fill="${night ? "#4A5A80" : "#5E8F6E"}"/><path d="M0 -48 V40 M100 -48 V40" stroke="#7D8590" stroke-width="6"/>${[0, 1, 2].map((i) => `<circle cx="${20 + i * 34}" cy="22" r="14" fill="none" stroke="#3A3F48" stroke-width="4"/>`).join("")}</g>`;
  out += `<path d="M528 520 H1402" stroke="${night ? "#5B6A8E" : "#9FA6AE"}" stroke-width="6"/>` + [...Array(18)].map((_, i) => `<path d="M${540 + i * 49} 520 V560" stroke="${night ? "#5B6A8E" : "#9FA6AE"}" stroke-width="5"/>`).join("");
  out += rainTree(0, 600, 560, 1.05, false);
  // the lamp post (its head: VD.lamp)
  out += `<path d="M708 560 V232" stroke="#5B6470" stroke-width="12"/><path d="M708 236 Q708 214 730 210 H760" stroke="#5B6470" stroke-width="9" fill="none"/><rect x="736" y="204" width="52" height="14" rx="6" fill="#4A525C"/>`;
  // the low wall along the openings, with potted plants on top
  out += `<rect x="520" y="560" width="890" height="80" fill="${VDC.wallD}"/><rect x="520" y="556" width="890" height="12" rx="4" fill="#E8DFCF"/>` + [620, 820, 1100, 1300].map((x, i) => pottedPlant(x, 560, .62, 10 + i)).join("");
  // the ceiling and the fluorescent tubes
  let s = out + `<path d="M-200 -120 H2120 V150 L2080 120 H-160 L-200 150z" fill="${VDC.ceil}"/><rect x="-200" y="118" width="2320" height="16" fill="#C9C1B3"/>`
    + [260, 960, 1660].map((x) => `<rect x="${x - 150}" y="58" width="300" height="20" rx="10" fill="#FFFFFF"/><rect x="${x - 162}" y="52" width="324" height="10" rx="4" fill="#B9B2A6"/>`).join("");
  // the walls: left (the notice board's) and right (letterboxes, lift lobby); the pillars
  s += `<rect x="-200" y="130" width="${a0 + 200}" height="${F - 130}" fill="url(#vdWall)"/><rect x="${b1}" y="130" width="${2120 - b1}" height="${F - 130}" fill="url(#vdWall)"/>`
    + `<rect x="${a1}" y="130" width="${b0 - a1}" height="${F - 130}" fill="url(#vdPillar)"/>`
    + [[a0 - 60, a0 + 14], [b1 - 14, b1 + 60]].map(([x0, x1]) => `<rect x="${x0}" y="130" width="${x1 - x0}" height="${F - 130}" fill="url(#vdPillar)"/><rect x="${x0}" y="130" width="10" height="${F - 130}" fill="${VDC.pillarS}"/>`).join("")
    + `<rect x="-200" y="${F - 26}" width="2320" height="26" fill="#C7BBA5"/>`;   // the skirting
  // the letterboxes (a wall of small metal doors with number tags) and the lift lobby
  { const [x0, y0, x1, y1] = VD.box; s += `<rect x="${x0 - 12}" y="${y0 - 12}" width="${x1 - x0 + 24}" height="${y1 - y0 + 24}" rx="8" fill="#8E969F"/>`;
    for (let r = 0; r < 8; r++) for (let c = 0; c < 4; c++) { const w = (x1 - x0) / 4, h = (y1 - y0) / 8, x = x0 + c * w, y = y0 + r * h; s += `<rect x="${n2(x + 3)}" y="${n2(y + 3)}" width="${n2(w - 6)}" height="${n2(h - 6)}" rx="3" fill="${(r + c) % 2 ? "#BCC3CB" : "#C8CED5"}"/><rect x="${n2(x + w * .3)}" y="${n2(y + h * .22)}" width="${n2(w * .4)}" height="5" rx="2" fill="#7B838C"/><rect x="${n2(x + w * .62)}" y="${n2(y + h * .6)}" width="10" height="7" rx="2" fill="#E6C46A"/>`; } }
  { const [x0, y0, x1] = VD.lift, F2 = F; s += `<rect x="${x0 - 20}" y="${y0 - 30}" width="${x1 - x0 + 40}" height="${F2 - y0 + 30}" fill="#E2D8C6"/><rect x="${x0}" y="${y0}" width="${x1 - x0}" height="${F2 - y0}" fill="#A9B2BC"/><path d="M${(x0 + x1) / 2} ${y0} V${F2}" stroke="#7C858F" stroke-width="5"/>`
    + `<rect x="${x1 + 26}" y="400" width="26" height="60" rx="8" fill="#C9C2B4"/><circle cx="${x1 + 39}" cy="418" r="7" fill="#F2C230"/><circle cx="${x1 + 39}" cy="442" r="7" fill="#F2C230"/><rect x="${x0 + 40}" y="${y0 - 26}" width="${x1 - x0 - 80}" height="20" rx="6" fill="#3A3F48"/>${T((x0 + x1) / 2, y0 - 10, "LIFT", 16, "#FFD27A", { w: 700, ls: 4 })}`; }
  // the notice board's own frame (its card is live: noticeCard)
  { const [x0, y0, x1, y1] = VD.board; s += `<rect x="${x0 - 14}" y="${y0 - 14}" width="${x1 - x0 + 28}" height="${y1 - y0 + 28}" rx="10" fill="#7A5432"/><rect x="${x0}" y="${y0}" width="${x1 - x0}" height="${y1 - y0}" fill="#C99A62"/>`
    + `<rect x="${x0 + 60}" y="${y0 - 46}" width="${x1 - x0 - 120}" height="36" rx="8" fill="#2E5C8A"/>${T((x0 + x1) / 2, y0 - 20, "RESIDENTS' CORNER", 22, "#fff", { w: 700, ls: 2 })}`
    + `<rect x="${x0 + 14}" y="${y1 - 96}" width="96" height="78" fill="#FFF7E0" transform="rotate(-4 ${x0 + 60} ${y1 - 60})"/><rect x="${x1 - 108}" y="${y1 - 104}" width="92" height="84" fill="#E2F0FF" transform="rotate(3 ${x1 - 60} ${y1 - 60})"/>`; }
  // the floor: big square tiles in perspective
  s += `<rect x="-200" y="${F}" width="2320" height="${1200 - F}" fill="${VDC.tileA}"/>`;
  for (let r = 0; r < 9; r++) { const y0 = F + Math.pow(r / 9, 1.6) * 560, y1 = F + Math.pow((r + 1) / 9, 1.6) * 560; s += `<path d="M-200 ${n2(y0)} H2120" stroke="${VDC.grout}" stroke-width="${n2(1.5 + r * .5)}"/>`; }
  for (let c = -12; c <= 12; c++) { const xb = 960 + c * 150, xt = 960 + c * 64; s += `<path d="M${xt} ${F} L${xb + c * 120} 1200" stroke="${VDC.grout}" stroke-width="2"/>`; }
  for (let r = 0; r < 9; r++) for (let c = -12; c < 12; c++) if ((r + c) % 2 === 0) { const y0 = F + Math.pow(r / 9, 1.6) * 560, y1 = F + Math.pow((r + 1) / 9, 1.6) * 560, f = (y) => (y - F) / 560, xa = (cc, y) => 960 + cc * 64 + (cc * 150 + cc * 120 - cc * 64) * f(y);
    s += `<path d="M${n2(xa(c, y0))} ${n2(y0)} L${n2(xa(c + 1, y0))} ${n2(y0)} L${n2(xa(c + 1, y1))} ${n2(y1)} L${n2(xa(c, y1))} ${n2(y1)}z" fill="${VDC.tileB}" opacity=".7"/>`; }
  // the steps down to the car park (left), the stone bench (left, in front of the notice board's wall) with its potted plant
  { const [x, y] = VD.steps; s += [0, 1, 2].map((i) => `<rect x="${x - 200}" y="${y + i * 26}" width="${330 - i * 30}" height="26" fill="${i % 2 ? "#BFB49F" : "#CFC5B1"}"/><rect x="${x - 200}" y="${y + i * 26}" width="${330 - i * 30}" height="5" fill="#E3DACA"/>`).join("") + `<path d="M${x + 130} ${y - 30} L${x + 40} ${y + 78}" stroke="#7D8590" stroke-width="6"/>`; }
  { const [x, y] = VD.bench; s += `<ellipse cx="${x}" cy="${y + 66}" rx="170" ry="16" fill="#5A4C44" opacity=".22"/><rect x="${x - 150}" y="${y - 22}" width="300" height="34" rx="10" fill="#B4AEA4"/><rect x="${x - 150}" y="${y - 22}" width="300" height="9" rx="5" fill="#D2CCC2"/><rect x="${x - 120}" y="${y + 10}" width="34" height="58" fill="#A29C92"/><rect x="${x + 86}" y="${y + 10}" width="34" height="58" fill="#A29C92"/>` + pottedPlant(x + 210, y + 66, .9, 21); }
  s += pottedPlant(1710, F + 8, .62, 31) + `<rect x="${VD.mat[0] - 70}" y="${VD.mat[1] - 12}" width="140" height="30" rx="6" fill="#8A5A3A"/><rect x="${VD.mat[0] - 62}" y="${VD.mat[1] - 7}" width="124" height="20" rx="4" fill="none" stroke="#B07A52" stroke-width="3"/>`;   // by the lift lobby: a potted plant, the doormat
  // the ceiling's soft light pools on the floor, and the shade under the ceiling's edge
  s += [260, 960, 1660].map((x) => `<ellipse cx="${x}" cy="${F + 130}" rx="420" ry="90" fill="#FFF8E8" opacity="${night ? .22 : .12}" filter="url(#b40)"/>`).join("");
  return s; }
BG.vdday = () => vdBase(false);
BG.vdnight = () => vdBase(true);
const XDEFS00 = () => `${lg("vdSky", [[0, "#8CCBF2"], [1, "#E8F5FF"]])}${lg("vdSkyN", [[0, "#0F1838"], [1, "#2E3B66"]])}${lg("vdWall", [[0, "#F1E9DA"], [1, "#E2D8C5"]])}${lg("vdPillar", [[0, "#ECE3D3"], [1, "#DCD1BE"]])}
  ${lg("vdWood", [[0, "#D9A66A"], [1, "#B57F45"]])}${lg("vdTop", [[0, "#E4B67C"], [1, "#C9935A"]])}${lg("vdDusk", [[0, "#F48A5C", .85], [.6, "#F6B66E", .6], [1, "#F7D9A0", .3]])}${lg("vdRain", [[0, "#7C8796", .78], [1, "#A8B2BE", .55]])}
  ${rg("vdLampG", [[0, "#FFF1B8", .9], [1, "#FFF1B8", 0]])}${rg("vdSunP", [[0, "#FFF2C4", .5], [1, "#FFF2C4", 0]])}${lg("vdGrass", [[0, "#9FD67A"], [1, "#5FAE52"]])}${lg("vdPath", [[0, "#F4D9A6"], [1, "#E2BA7C"]])}${lg("vdMeadowSky", [[0, "#BFE6FF"], [1, "#F4FBFF"]])}`;

/* ================================================================ the live parts ================================================================ */
// the neighbours (far, beyond the low wall): an auntie with a market trolley crossing the walkway; a boy bouncing a ball in the playground
// (small, seen past the pillars; hands kept out of sight behind the trolley and at the boy's sides, so no hand is drawn)
const auntie = (t, x, y) => { const w = Math.sin(t * 7) * 3; return `<g transform="translate(${n2(x)} ${y})"><rect x="-16" y="-92" width="32" height="56" rx="12" fill="#D86A9A"/><rect x="-14" y="-40" width="28" height="40" rx="8" fill="#5A6A9A"/><circle cy="-108" r="15" fill="#E8B88E"/><path d="M-16 -114 Q0 -132 16 -114 Q14 -104 0 -106 Q-14 -104 -16 -114z" fill="#3A2E2A"/>
  <rect x="18" y="-70" width="34" height="44" rx="6" fill="#3F8A6A"/><path d="M18 -70 L8 -96" stroke="#5B6470" stroke-width="4"/><circle cx="26" cy="-22" r="6" fill="#333"/><circle cx="46" cy="-22" r="6" fill="#333"/><path d="M-8 0 l${n2(-3 + w)} 0 M8 0 l${n2(3 - w)} 0" stroke="#3A2E2A" stroke-width="6" stroke-linecap="round"/></g>`; };
const boyBall = (t, x, y) => { const b = Math.abs(Math.sin(t * 3.2)); return `<g transform="translate(${x} ${y})"><rect x="-11" y="-58" width="22" height="34" rx="8" fill="#3FA0E0"/><rect x="-10" y="-26" width="20" height="26" rx="6" fill="#3A3F58"/><circle cy="-70" r="11" fill="#D9A57E"/><path d="M-11 -74 Q0 -86 11 -74z" fill="#2A2220"/><circle cx="22" cy="${n2(-6 - 40 * b)}" r="8" fill="#F28A2E" stroke="#B85C14" stroke-width="2"/></g>`; };
// moths round the lamp at night; rain beyond the low wall on Thursday
const moths = (t, x, y) => [...Array(5)].map((_, i) => { const a = t * (1.6 + .3 * i) + i * 1.7; return `<g transform="translate(${n2(x + Math.cos(a) * (26 + 8 * i))} ${n2(y + 20 + Math.sin(a * 1.3) * 18)})"><path d="M0 0 l-6 -4 l1 6z M0 0 l6 -4 l-1 6z" fill="#F4EBD6" opacity=".9"/></g>`; }).join("");
const rainOut = (t, box) => { const [x0, y0, x1, y1] = box; let s = `<clipPath id="rc${x0}"><rect x="${x0}" y="${y0}" width="${x1 - x0}" height="${y1 - y0 + 60}"/></clipPath><g clip-path="url(#rc${x0})" stroke="#E6EEF7" stroke-width="2.4" opacity=".75">`;
  for (let i = 0; i < 46; i++) { const x = x0 + hash(i, 5) * (x1 - x0 + 60), v = ((t * 1.6 + hash(i, 7)) % 1), y = y0 - 40 + v * (y1 - y0 + 120); s += `<path d="M${n2(x)} ${n2(y)} l-8 26"/>`; } return s + `</g>`; };
// the outside's light for the time of day, over the openings only (the set under the ceiling keeps its own light)
const outsideTint = (when) => { const boxes = [VD.o1, VD.o2]; if (when === "dusk") return boxes.map(([x0, y0, x1, y1]) => `<rect x="${x0}" y="${y0}" width="${x1 - x0}" height="${y1 - y0}" fill="url(#vdDusk)" style="mix-blend-mode:multiply"/>`).join("");
  if (when === "rain") return boxes.map(([x0, y0, x1, y1]) => `<rect x="${x0}" y="${y0}" width="${x1 - x0}" height="${y1 - y0}" fill="url(#vdRain)"/>`).join("");
  if (when === "morning") return boxes.map(([x0, y0, x1, y1]) => `<rect x="${x0}" y="${y0}" width="${x1 - x0}" height="${y1 - y0}" fill="#FFE2A8" opacity=".22"/>`).join(""); return ""; };
const sunShafts = (t) => [0, 1, 2].map((i) => { const x = 640 + i * 330; return `<path d="M${x} 160 L${x + 190} 160 L${x + 520} 1080 L${x + 190} 1080z" fill="#FFF0C2" opacity="${n2(.16 + .03 * Math.sin(t * .8 + i))}"/>`; }).join("");

/* the notice board's card: ONE-WEEK MEMORY TEST (HOME: VD.board). o.fill: what is filled in so far (Part 2's week): { mon, tue, thu, res } */
function noticeCard(t, o = {}) { const [x0, y0, x1, y1] = VD.board, w = x1 - x0 - 28, h = y1 - y0 - 120, x = x0 + 14, y = y0 + 14, cw = (w - 120) / 4;
  let s = `<g filter="url(#dropS)"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="#FFFDF5"/></g><circle cx="${x + w / 2}" cy="${y + 8}" r="8" fill="#D84A3A"/>`
    + T(x + w / 2, y + 40, "ONE-WEEK MEMORY TEST", 22, P.ink, { w: 700, ls: 1 }) + T(x + w / 2, y + 66, "Magnets quiz: next Monday!", 17, "#C2573A", { w: 700 });
  ["Mon", "Tue", "Thu", "next Mon"].forEach((d, i) => { s += T(x + 120 + cw * i + cw / 2, y + 96, d, 14, P.ink2, { w: 700 }); });
  const rows = [["Pip", "read the poster 5 times", "#8E82B8", 124], ["Basil", "make it, check it, draw it again", "#E0A33A", 196]];
  rows.forEach(([who, txt, col, ry]) => { s += `<rect x="${x + 6}" y="${y + ry - 26}" width="${w - 12}" height="64" rx="8" fill="${col}" opacity=".16"/><rect x="${x + 8}" y="${y + ry - 22}" width="104" height="24" rx="12" fill="${col}"/>` + T(x + 60, y + ry - 4, who, 15, "#fff", { w: 700 }) + T(x + 60, y + ry + 26, txt.length > 20 ? txt.slice(0, 20) + "…" : txt, 9, P.ink2, { w: 600 }); });
  for (let i = 0; i <= 4; i++) s += `<path d="M${x + 116 + cw * i} ${y + 84} V${y + 232}" stroke="#D9CBB2" stroke-width="2"/>`;
  const f = o.fill || {}, cell = (i, ry) => [x + 120 + cw * i + cw / 2, y + ry + 6];
  const mini = (cx, cy, k) => `<g transform="translate(${n2(cx)} ${n2(cy)}) scale(${n2(k)})"><circle r="9" fill="#FFF3C4" stroke="#E0A33A" stroke-width="2.5"/>${[0, 72, 144, 216, 288].map((a) => `<path d="M${n2(Math.cos(a * Math.PI / 180) * 9)} ${n2(Math.sin(a * Math.PI / 180) * 9)} L${n2(Math.cos(a * Math.PI / 180) * 22)} ${n2(Math.sin(a * Math.PI / 180) * 18)}" stroke="${["#F28A2E", "#3FA0E0", "#2FA35A", "#C2577A", "#8B5CF6"][a / 72]}" stroke-width="3"/>`).join("")}</g>`;
  if (f.mon) { const [a, b] = cell(0, 124); s += OP(f.mon, TF(a, b - 2, 1, T(0, 0, "read ×5", 14, "#6E5FA8", { w: 700 }))); const [c, d] = cell(0, 196); s += OP(f.mon, mini(c - 10, d - 6, .9) + TF(c + 22, d - 10, .5, tickBadge(22))); }
  if (f.tue) { const [c, d] = cell(1, 196); s += OP(f.tue, mini(c - 10, d - 6, .9) + TF(c + 22, d - 10, .5, tickBadge(22))); }
  if (f.thu) { const [c, d] = cell(2, 196); s += OP(f.thu, mini(c - 10, d - 6, .9) + TF(c + 22, d - 10, .5, tickBadge(22))); }
  if (f.res) { const [a, b] = cell(3, 124), [c, d] = cell(3, 196); s += OP(f.res, T(a, b, "2 branches", 13, "#6E5FA8", { w: 700 }) + T(c, d, "5 branches", 13, "#B9741A", { w: 700 })); }
  return s; }
// the study table (wooden top seen a little from above) and what is on it: the poster on its easel (o.easel: 0 facing us .. 1 turned to the
// wall), Basil's sheet and pencils (o.sheet: a mind-map drawing progress 0..1), the tablet on its stand (o.tab: a screen svg)
function studyTable(t, o = {}) { const [x0, y0, x1, y1] = VD.table; let s = `<ellipse cx="${(x0 + x1) / 2}" cy="${y1 + 160}" rx="${(x1 - x0) * .52}" ry="26" fill="#5A4C44" opacity=".25" filter="url(#b4)"/>`;
  s += [[x0 + 40, 0], [x1 - 70, 0], [x0 + 90, 1], [x1 - 120, 1]].map(([x, b]) => `<rect x="${x}" y="${y1 - 4}" width="30" height="${b ? 120 : 170}" fill="${b ? "#9C6A38" : "#B07A42"}"/>`).join("");
  s += `<path d="M${x0 + 40} ${y0} H${x1 - 40} L${x1} ${y1} H${x0}z" fill="url(#vdTop)"/><rect x="${x0}" y="${y1}" width="${x1 - x0}" height="24" fill="#9C6A38"/>`;
  return s; }
// the printed Magnets poster (TheOneApp's own: a crop of the real Compare-with-the-poster screen) on its small wooden easel
function easelPoster(t, x, y, k, turn = 0, o = {}) { const W_ = 330, H_ = 236, sx = Math.cos(Math.PI * turn), back = turn > .5;
  let s = `<path d="M-120 0 L-40 -${H_ + 40} M120 0 L40 -${H_ + 40} M0 -${H_ + 50} L0 0" stroke="#8A5A30" stroke-width="12" stroke-linecap="round"/><rect x="-${W_ / 2 + 14}" y="-22" width="${W_ + 28}" height="14" rx="5" fill="#9C6A38"/>`;
  const face = back ? `<rect x="${-W_ / 2}" y="${-H_ - 22}" width="${W_}" height="${H_}" fill="#E8DCC4" stroke="#BFAF92" stroke-width="4"/><path d="M${-W_ / 2 + 20} ${-H_ + 10} L${W_ / 2 - 20} -40 M${W_ / 2 - 20} ${-H_ + 10} L${-W_ / 2 + 20} -40" stroke="#D6C8AC" stroke-width="3"/>`
    : `<rect x="${-W_ / 2 - 6}" y="${-H_ - 28}" width="${W_ + 12}" height="${H_ + 12}" fill="#fff"/>` + appImg("posterP", -W_ / 2, -H_ - 22, W_, H_);
  s += `<g transform="translate(0 0) scale(${n2(Math.max(.03, Math.abs(sx)))} 1)">${face}</g>`;
  return TF(x, y, k, s); }
// an image captured from TheOneApp (app/*.jpg, preloaded in main.js as #ap_<name>): x, y, w, h in the caller's units
const appImg = (name, x, y, w, h, o = {}) => `<use href="#ap_${name}" transform="translate(${n2(x)} ${n2(y)}) scale(${n2(w / APP[name].w)} ${n2(h / APP[name].h)})"${o.op !== undefined ? ` opacity="${n2(o.op)}"` : ""}/>`;

/* the whole place. o: when ("day" | "dusk" | "night" | "rain" | "morning"), crow / cat (spots: [x, y, k, opts]), board (the card's fill),
   table (false: no table), top (svg on the table), front (svg in front of everything), people (false: no neighbours) */
function VDS(t, o = {}, cam) { const when = o.when || "day", night = when === "night";
  let s = bg(night ? "vdnight" : "vdday") + outsideTint(when);
  if (when === "rain") s += rainOut(t, VD.o1) + rainOut(t, VD.o2);

  if (night || when === "dusk") s += `<circle cx="${VD.lamp[0] + 62}" cy="${VD.lamp[1] + 22}" r="${night ? 90 : 60}" fill="url(#vdLampG)"/><rect x="738" y="216" width="48" height="8" rx="4" fill="#FFF3C4"/>` + (night ? moths(t, VD.lamp[0] + 62, VD.lamp[1] + 20) : "");
  if (o.people !== false && !night && when !== "rain") { const u = ((t % 26) + 26) % 26 / 26; s += `<g opacity=".9">${auntie(t, lerp(1420, 500, u), 556)}</g>` + boyBall(t, 1250, 556); }
  if (o.crow) s += crowAt(t, ...o.crow);
  if (o.cat) s += catAt(t, ...o.cat);
  s += noticeCard(t, o.board || {});
  if (night || when === "dusk") s += [260, 960, 1660].map((x) => `<ellipse cx="${x}" cy="90" rx="220" ry="60" fill="#FFFDF0" opacity=".5" filter="url(#b40)"/>`).join("");
  if (when === "morning") s += sunShafts(t);
  if (o.table !== false) s += studyTable(t) + (o.top || "");
  if (o.front) s += o.front;
  if (night) s += `<rect x="-200" y="-120" width="2320" height="1320" fill="#1A2350" opacity=".1"/>`;
  if (when === "dusk") s += `<rect x="-200" y="-120" width="2320" height="1320" fill="#F08A50" opacity=".06"/>`;
  return cam ? CAM(s, cam[0], cam[1], cam[2]) : s; }
