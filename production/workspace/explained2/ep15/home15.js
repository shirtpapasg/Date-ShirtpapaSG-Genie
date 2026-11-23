// home15.js: EP15's shared props and Part 1's sets (Stage 2, drawn 2026-11-23). Loaded after tests.js / ep14dare.js, before common.js.
// SHARED: hand15 (an adult's hand: four fingers and a thumb, a blue sleeve), the mango (whole, cut, its ONE big flat seed with its hairy
//   husk), mango leaves (red when new, green later), youngPlant15 (the young mango plant at any age), pot15 (OUR terracotta pot), ruler15 (a
//   clear 30 cm school ruler, zero at the bottom; CM px per cm), snail15 (Part 1's hidden animal: cute, eye-stalks out, always moving).
// THE HDB KITCHEN BG.kitchen15 (baked) + VK(t, o, cam) live: the mango on its board, the saucer with the seed, drips from the wet ledge, the
//   neighbour's wind chime, a bird on the grille, the wall fan, the snail on the OUTSIDE ledge by the herb pot.
// THE HDB CORRIDOR BG.corridor15 (baked) + VC(t, o, cam) live: our pot on its plant stand (the table), the neighbours' pots on the parapet,
//   the laundry on its pole, the wind chime, birds, a far bus, the old mango tree's crown beyond the parapet (it is in the garden below).
// LOOK-CLOSERS: obsArt (observing like a scientist: the seed and the journal), seedArt (the window in the pot, Day 1 to Day 45);
//   the journey BE THE MANGO SEED (seedJourney).

const SKN = "#F2C29B", SKL = "#C98F66";
const mixC = (a, b, u) => { const p = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16)), A = p(a), B = p(b); u = clamp(u); return "#" + A.map((v, i) => Math.round(v + (B[i] - v) * u).toString(16).padStart(2, "0")).join(""); };
const XDEFS15 = () => `${lg("g14Mango", [[0, "#FFD75A"], [.6, "#FFA53A"], [1, "#F0703A"]])}${lg("g15MangoG", [[0, "#B5D96A"], [1, "#6FAE45"]])}${lg("g14Sky", [[0, "#6FC1FF"], [.65, "#CBEBFF"], [1, "#F3FBF0"]])}${lg("g14Grass", [[0, "#A6DE7E"], [1, "#6DBB58"]])}
  ${lg("f14Wood", [[0, "#D9A56A"], [1, "#A9703C"]])}${lg("g14Trunk", [[0, "#A9774A"], [1, "#7A5230"]], 1, 0)}${rg("g14Dapple", [[0, "#FFF9C8", .5], [1, "#FFF9C8", 0]])}${lg("g14Soil", [[0, "#9B6B45"], [1, "#77502F"]])}
  ${lg("k15Wall", [[0, "#FFF4E0"], [1, "#F6E2C2"]])}${lg("k15Cab", [[0, "#A9D8CF"], [1, "#86BFB4"]])}${lg("k15Top", [[0, "#E9E4DC"], [1, "#C9C2B6"]])}${lg("k15Sky", [[0, "#9FD6FF"], [1, "#EAF7FF"]])}
  ${lg("c15Wall", [[0, "#FCE7CF"], [1, "#F2D1AC"]])}${lg("c15Floor", [[0, "#D9CBB4"], [1, "#B9A88C"]])}${lg("p15Pot", [[0, "#E58A5A"], [1, "#B8582E"]], 1, 0)}${lg("p15Soil", [[0, "#6E4A2C"], [1, "#4A2F1A"]])}
  ${rg("s15Shell", [[0, "#F3C98A"], [.6, "#C98A4A"], [1, "#8A5426"]], .4, .35, .7)}${lg("j15Soil", [[0, "#5A3A22"], [1, "#2E1C10"]])}${lg("j15Sky", [[0, "#7CC8FF"], [1, "#FFF3D6"]])}
  ${lg("g15Steel", [[0, "#E4EBF2"], [.5, "#B9C6D4"], [1, "#DCE4EC"]], 1, 0)}${lg("g15Bank", [[0, "#F4F8FB"], [1, "#DDE7EE"]])}
  <filter id="b6"><feGaussianBlur stdDeviation="6"/></filter><filter id="b16"><feGaussianBlur stdDeviation="16"/></filter>`;

/* ---------- an adult's hand (teacher, 22 Nov: four fingers and a thumb), seen from the back, pointing +x; origin = the knuckles' middle.
   o.curl 0..1 bends the fingers (a grip); o.sleeve colour; o.point = the index finger straight, the others curled ---------- */
function hand15(o = {}) { const c = o.curl || 0, sl = o.sleeve || "#5B7BD6", sd = o.sleeveD || "#3A56A8", F = [[-29, 70], [-9, 80], [11, 74], [29, 58]];
  const fing = F.map(([y, L], i) => { const cc = o.point && i === 0 ? 0 : (o.point ? .75 : c), l = L * (1 - .6 * cc) + 10; return `<rect x="-10" y="${y - 10}" width="${n2(l)}" height="20" rx="10" transform="rotate(${n2((i - 1.5) * 4)} 0 ${y})"/>`; }).join("");
  return `<rect x="-330" y="-54" width="230" height="108" rx="20" fill="${sl}" stroke="${sd}" stroke-width="5"/><g fill="${SKN}" stroke="${SKL}" stroke-width="4" stroke-linejoin="round"><rect x="-118" y="-44" width="128" height="88" rx="34"/>${fing}<rect x="-70" y="-60" width="70" height="24" rx="12" transform="rotate(-26 -70 -48)"/></g>`
    + `<path d="M-6 -30 q6 2 0 6 M-6 -10 q6 2 0 6 M-6 10 q6 2 0 6" fill="none" stroke="${SKL}" stroke-width="2.5" opacity=".7"/>`; }

/* ---------- the mango: whole (origin = its middle), cut open, and its ONE big flat seed (the hairy husk) ---------- */
const mangoWhole = (k = 1, rot = 0) => `<g transform="rotate(${rot}) scale(${k})"><path d="M-6 -62 C52 -66 88 -24 84 18 C80 58 40 72 -4 68 C-58 64 -86 30 -80 -10 C-74 -46 -44 -60 -6 -62z" fill="url(#g14Mango)" stroke="#C4581E" stroke-width="5"/><path d="M-6 -62 C-40 -58 -66 -40 -76 -14 C-60 -34 -34 -48 -6 -50z" fill="#8CC04F" opacity=".75"/><ellipse cx="22" cy="-30" rx="14" ry="22" fill="#fff" opacity=".35" transform="rotate(30 22 -30)"/><path d="M-8 -62 q-6 -14 4 -20" fill="none" stroke="#6E4324" stroke-width="6" stroke-linecap="round"/></g>`;
// the seed (the husk): flat, oval, pale buff, with fibres like short hairs; origin = its middle, length about 170 at k = 1
const mangoSeed = (k = 1, rot = 0, o = {}) => { let hairs = ""; for (let i = 0; i < 26; i++) { const a = i / 26 * Math.PI * 2, x = 84 * Math.cos(a), y = 46 * Math.sin(a), nx = Math.cos(a), ny = Math.sin(a) * 1.5;
    hairs += `<path d="M${n2(x)} ${n2(y)} l${n2(nx * 8 + 3 * Math.sin(i))} ${n2(ny * 6)}" stroke="#C9A974" stroke-width="2.5" stroke-linecap="round"/>`; }
  return `<g transform="rotate(${rot}) scale(${k})">${hairs}<path d="M-84 0 C-84 -34 -40 -48 0 -48 C46 -48 86 -30 86 0 C86 30 46 48 0 48 C-40 48 -84 34 -84 0z" fill="${o.fill || "#EBD7A6"}" stroke="#B48F5C" stroke-width="5"/>
    <path d="M-60 -16 Q0 -30 62 -14 M-66 4 Q0 -8 68 6 M-58 22 Q0 12 60 26" fill="none" stroke="#C9A974" stroke-width="3.5" stroke-linecap="round"/><ellipse cx="-30" cy="-26" rx="26" ry="8" fill="#fff" opacity=".35" transform="rotate(-8 -30 -26)"/></g>`; };
// a mango cut in half, seen from above: the two cheeks open, the seed in the middle (origin = the middle)
const mangoCutOpen = (k = 1, seed = true) => `<g transform="scale(${k})"><g transform="translate(-74 0) rotate(-8)"><ellipse rx="70" ry="88" fill="#F7A23A" stroke="#C4581E" stroke-width="5"/><ellipse rx="56" ry="74" fill="#FFC83A"/><path d="M-30 -40 l60 0 M-40 0 l80 0 M-30 40 l60 0 M0 -60 l0 120" stroke="#F4A82A" stroke-width="3" opacity=".6"/></g>
  <g transform="translate(74 0) rotate(8)"><ellipse rx="70" ry="88" fill="#F7A23A" stroke="#C4581E" stroke-width="5"/><ellipse rx="56" ry="74" fill="#FFC83A"/><path d="M-30 -40 l60 0 M-40 0 l80 0 M-30 40 l60 0 M0 -60 l0 120" stroke="#F4A82A" stroke-width="3" opacity=".6"/></g>${seed ? TF(0, 0, .62, mangoSeed(1, 90)) : ""}</g>`;
// a mango leaf pointing +x from its stalk (origin), len x wid; colours: new (red) or grown (green)
const leaf15 = (len, wid, fill, line) => `<path d="M0 0 Q${n2(len * .32)} ${n2(-wid)} ${n2(len * .74)} ${n2(-wid * .62)} Q${n2(len * .94)} ${n2(-wid * .24)} ${len} 0 Q${n2(len * .94)} ${n2(wid * .24)} ${n2(len * .74)} ${n2(wid * .62)} Q${n2(len * .32)} ${n2(wid)} 0 0z" fill="${fill}" stroke="${line}" stroke-width="3" stroke-linejoin="round"/><path d="M4 0 L${n2(len * .95)} 0" stroke="${line}" stroke-width="2" opacity=".6"/>`;
const LEAFR = ["#D2503F", "#8E2E26"], LEAFG = ["#4FA866", "#2F7A45"];
const leafC = (red) => [mixC(LEAFG[0], LEAFR[0], red), mixC(LEAFG[1], LEAFR[1], red)];
/* the young mango plant (origin = where the stem leaves the soil): o.h stem height, o.n leaves (0..8), o.red 0..1 (new leaves are red),
   o.open 0..1 (the leaves unfold), o.hook 0..1 (the shoot's tip still bent like a hook), o.k leaf size, o.sw sway (deg) */
function youngPlant15(t, o = {}) { const h = o.h || 140, n = o.n === undefined ? 4 : o.n, red = o.red || 0, op = o.open === undefined ? 1 : o.open, hk = o.hook || 0, k = o.k || 1, sw = (o.sw === undefined ? 1 : o.sw) * Math.sin(t * 1.3);
  const topX = 6 * Math.sin(sw * .05) + hk * 20, topY = -h;
  let s = hk > .02 ? `<path d="M0 0 Q-4 ${n2(-h * .55)} ${n2(hk * 6)} ${n2(-h * (1 - .12 * hk))} Q${n2(hk * 22)} ${n2(-h - 14 * hk)} ${n2(hk * 34)} ${n2(-h + 18 * hk)}" fill="none" stroke="#7E9A3E" stroke-width="${n2(7 * k)}" stroke-linecap="round"/>`
    : `<path d="M0 0 Q-5 ${n2(-h * .5)} ${n2(topX)} ${n2(topY)}" fill="none" stroke="#7E8A3E" stroke-width="${n2(7 * k)}" stroke-linecap="round"/><path d="M0 -4 Q-3 ${n2(-h * .4)} ${n2(topX * .6)} ${n2(-h * .7)}" fill="none" stroke="#A8B860" stroke-width="${n2(2.4 * k)}" stroke-linecap="round" opacity=".7"/>`;
  const [fc, lc] = leafC(red);
  for (let i = 0; i < n; i++) { const side = i % 2 ? 1 : -1, tier = Math.floor(i / 2), y = topY + tier * 16 * k, droop = 40 * red + 10;
    const ang0 = side > 0 ? -70 : -110, ang1 = side > 0 ? (-28 + tier * 24 + droop) : (208 - tier * 24 - droop), a = lerp(ang0, ang1, eio(op)) + sw * (side > 0 ? 1 : -1);
    const L = (74 - tier * 6) * k * lerp(.45, 1, eio(op)), Wd = (16 - tier) * k * lerp(.5, 1, op);
    s += `<g transform="translate(${n2(topX * (1 - tier * .2))} ${n2(y)}) rotate(${n2(a)})">${leaf15(L, Wd, fc, lc)}</g>`; }
  return s; }
// OUR pot (terracotta) on its stand: origin = the pot's base centre; the soil's surface is at y = -144 (8 cm above the table at CM = 18)
const POTS = -144;
const pot15 = (o = {}) => `<ellipse cx="0" cy="4" rx="112" ry="12" fill="${P.ink}" opacity=".24" filter="url(#b4)"/><path d="M-86 0 L-108 -124 L108 -124 L86 0z" fill="url(#p15Pot)" stroke="#9A4A2A" stroke-width="5" stroke-linejoin="round"/><path d="M-70 -20 L-86 -110" stroke="#F4A77E" stroke-width="7" stroke-linecap="round" opacity=".5"/>
  <rect x="-120" y="-152" width="240" height="32" rx="9" fill="#D9774A" stroke="#9A4A2A" stroke-width="5"/><ellipse cx="0" cy="${POTS + 4}" rx="104" ry="11" fill="${o.wet ? mixC("#7A5434", "#4A2F1A", o.wet) : "#7A5434"}"/>${o.label === false ? "" : `<rect x="-40" y="-84" width="80" height="34" rx="8" fill="#FFF8EA" stroke="#9A4A2A" stroke-width="3"/>${T(0, -60, "ours", 22, "#9A4A2A")}`}`;
// a clear 30 cm school ruler, standing up: origin = its ZERO end (bottom centre); CM px per centimetre
const CM = 18;
const ruler15 = (o = {}) => { const n = 30, c = o.cm || CM; let s = `<g filter="url(#dropS)"><rect x="-28" y="${-n * c - 14}" width="56" height="${n * c + 18}" rx="6" fill="#E3F4FF" fill-opacity=".86" stroke="#6FA6CF" stroke-width="3"/></g>`;
  for (let i = 0; i <= n; i++) { const y = -i * c, L = i % 5 === 0 ? 24 : 13; s += `<path d="M-28 ${y} h${L}" stroke="#1E2A44" stroke-width="${i % 5 ? 1.8 : 3}"/>`; if (i % 5 === 0) s += T(10, y + 7, String(i), 19, "#1E2A44", { a: "start" }); }
  return s + (o.zero ? `<path d="M-46 0 H46" stroke="${P.leaf}" stroke-width="8" stroke-linecap="round"/>` : ""); };

/* ---------- the little garden snail (Part 1's hidden animal): origin = under its foot, facing right; eye-stalks stretch and wave ---------- */
function snail15(t, o = {}) { const e = o.ext === undefined ? .72 + .28 * Math.sin(t * 1.7) : o.ext, b = Math.sin(t * 2.2), sl = o.slide ? 3 * Math.sin(t * 3) : 0;
  let sp = ""; for (let i = 0; i <= 40; i++) { const a = i / 40 * Math.PI * 3.6, r = 6 + 34 * (i / 40); sp += `${i ? "L" : "M"}${n2(-12 + r * Math.cos(-a))} ${n2(-62 + r * Math.sin(-a))} `; }
  const s1 = [80 + 10 * e + 2 * b, -70 - 40 * e], s2 = [62 + 2 * e, -70 - 34 * e - 2 * b];
  return `<ellipse cx="0" cy="2" rx="86" ry="7" fill="${P.ink}" opacity=".16"/><path d="M-84 0 Q-86 -16 -56 -20 L28 -22 Q48 -24 54 -46 Q60 -76 80 -76 Q102 -74 100 -42 Q98 -8 72 0z" fill="#CDB89C" stroke="#8E765C" stroke-width="4" stroke-linejoin="round" transform="translate(${n2(sl)} 0)"/>
    <path d="M${s2[0] - 66} -6 Q-20 -2 20 -6" stroke="#E6D7C2" stroke-width="5" fill="none" stroke-linecap="round" opacity=".7"/>
    <path d="M70 -72 Q${n2(s1[0] - 4)} ${n2((s1[1] - 72) / 2)} ${n2(s1[0])} ${n2(s1[1])} M62 -72 Q${n2(s2[0] - 8)} ${n2((s2[1] - 72) / 2)} ${n2(s2[0])} ${n2(s2[1])}" fill="none" stroke="#B9A385" stroke-width="7" stroke-linecap="round"/>
    <circle cx="${n2(s1[0])}" cy="${n2(s1[1])}" r="8" fill="#2B2147"/><circle cx="${n2(s1[0] - 2)}" cy="${n2(s1[1] - 3)}" r="2.6" fill="#fff"/><circle cx="${n2(s2[0])}" cy="${n2(s2[1])}" r="7" fill="#2B2147"/><circle cx="${n2(s2[0] - 2)}" cy="${n2(s2[1] - 3)}" r="2.3" fill="#fff"/>
    <path d="M84 -36 q8 6 14 -2" fill="none" stroke="#6E5A44" stroke-width="3.5" stroke-linecap="round"/><ellipse cx="78" cy="-44" rx="6" ry="4" fill="#F7A59A" opacity=".7"/>
    <circle cx="-12" cy="-62" r="46" fill="url(#s15Shell)" stroke="#7A4A26" stroke-width="5"/><path d="${sp}" fill="none" stroke="#7A4A26" stroke-width="4" stroke-linecap="round"/><ellipse cx="-30" cy="-84" rx="12" ry="7" fill="#fff" opacity=".45" transform="rotate(-30 -30 -84)"/>`; }
const snailAt = (t, x, y, k = .34, o = {}) => TF(x, y, k * (o.flip ? -1 : 1), snail15(t, o), o.rot || 0, k);

/* ---------- small life ---------- */
// a wind chime hanging from (x, y): the tubes swing
const chime15 = (t, x, y, k = 1) => { const sw = 6 * Math.sin(t * 1.6) + 3 * Math.sin(t * 2.7); return TF(x, y, k, `<path d="M0 0 V36" stroke="#8A8F9E" stroke-width="2"/><g transform="translate(0 36) rotate(${n2(sw * .4)})"><ellipse rx="26" ry="7" fill="#C9A26A" stroke="#7E5A2A" stroke-width="2"/>${[-18, -6, 6, 18].map((x2, i) => `<g transform="translate(${x2} 4) rotate(${n2(sw * (1 + .3 * i))})"><path d="M0 0 V12" stroke="#8A8F9E" stroke-width="1.5"/><rect x="-3.5" y="12" width="7" height="${44 + 10 * (i % 2)}" rx="3" fill="url(#g15Steel)" stroke="#8A94A6" stroke-width="1.5"/></g>`).join("")}<path d="M0 6 V70" stroke="#8A8F9E" stroke-width="1.5"/><rect x="-10" y="70" width="20" height="26" rx="4" fill="#F49B7E" transform="rotate(${n2(sw * 1.4)} 0 70)"/></g>`); };
// a little bird (a sparrow) that hops; origin = its feet, facing right
const bird15 = (t, k = 1, ph = 0) => { const hp = Math.max(0, Math.sin(t * 2.3 + ph)) > .85 ? 8 : 0, pk = Math.max(0, Math.sin(t * 1.7 + ph)) > .9 ? 12 : 0;
  return TF(0, -hp, k, `<path d="M-4 0 l-4 -14 M6 0 l2 -14" stroke="#8A5A36" stroke-width="3"/><ellipse cx="0" cy="-22" rx="20" ry="14" fill="#B98A5A"/><path d="M-14 -24 Q-36 -30 -40 -18 Q-26 -16 -14 -18z" fill="#7E5A3A"/><g transform="rotate(${pk} 14 -30)"><circle cx="14" cy="-32" r="11" fill="#9A6E44"/><path d="M24 -33 l9 3 l-9 3z" fill="#F2C14E"/><circle cx="17" cy="-35" r="2.6" fill="#2B2147"/></g><ellipse cx="2" cy="-18" rx="11" ry="7" fill="#E9D7BC"/>`); };
// water drips from a ledge at (x, y): a drop grows, falls, splashes
const drips15 = (t, pts) => pts.map(([x, y, ph, fall], i) => { const u = ((t + ph) % 2.6) / 2.6, gr = clamp(u / .55), fu = clamp((u - .55) / .3);
  return fu <= 0 ? `<ellipse cx="${x}" cy="${n2(y + 4 * gr)}" rx="${n2(3 + 2 * gr)}" ry="${n2(4 + 4 * gr)}" fill="#BFE6FF" stroke="#7FB2D6" stroke-width="1.5"/>` : fu < 1 ? `<ellipse cx="${x}" cy="${n2(y + 8 + fall * fu * fu)}" rx="4" ry="7" fill="#BFE6FF" stroke="#7FB2D6" stroke-width="1.5"/>` : ""; }).join("");

/* =============================================================================================================================
   THE HDB KITCHEN (Part 1: the cold open, back, the game's push-in). The window over the sink, the wet ledge outside (the snail, a herb pot)
   ============================================================================================================================= */
const KWIN = { x0: 800, x1: 1480, y0: 130, y1: 540 };
const farBlocks = (x0, x1, y, seed = 1, k = 1) => { let s = ""; for (let i = 0, x = x0; x < x1; i++) { const w = (110 + 60 * hash(i, seed)) * k, h = (260 + 200 * hash(i, seed + 2)) * k, col = ["#F4E6D2", "#E9EEF5", "#F6DDD0", "#E2F0E6"][i % 4], st = ["#F6A38F", "#8FD3C8", "#B9A6FF", "#FFC38A"][i % 4];
    s += `<rect x="${n2(x)}" y="${n2(y - h)}" width="${n2(w)}" height="${n2(h + 400)}" fill="${col}"/><rect x="${n2(x)}" y="${n2(y - h)}" width="${n2(w)}" height="${n2(10 * k)}" fill="${st}"/>`;
    for (let r = 0; r < h / (30 * k) - 1; r++) for (let c = 0; c < w / (26 * k) - 1; c++) s += `<rect x="${n2(x + 8 * k + c * 26 * k)}" y="${n2(y - h + 22 * k + r * 30 * k)}" width="${n2(13 * k)}" height="${n2(14 * k)}" fill="#A9C4DC" opacity=".8"/>`;
    x += w + 26 * k; } return s; };
BG.kitchen15 = () => { let s = `<rect x="-200" y="-120" width="2320" height="1320" fill="url(#k15Wall)"/>`;
  // the window: sky, far blocks, trees, the open casements, the grille, the wet ledge outside
  const W_ = KWIN; s += `<rect x="${W_.x0}" y="${W_.y0}" width="${W_.x1 - W_.x0}" height="${W_.y1 - W_.y0}" fill="url(#k15Sky)"/><clipPath id="kwc"><rect x="${W_.x0}" y="${W_.y0}" width="${W_.x1 - W_.x0}" height="${W_.y1 - W_.y0}"/></clipPath><g clip-path="url(#kwc)">${farBlocks(W_.x0 - 30, W_.x1, 470, 3, .9)}
    ${[...Array(8)].map((_, i) => `<circle cx="${W_.x0 + 40 + i * 92}" cy="${484 + 10 * (i % 2)}" r="${48 + 14 * (i % 3)}" fill="${i % 2 ? "#5FB56C" : "#7CC97A"}"/>`).join("")}<rect x="${W_.x0}" y="500" width="${W_.x1 - W_.x0}" height="60" fill="#7CC97A"/>
    <ellipse cx="1000" cy="200" rx="90" ry="22" fill="#fff" opacity=".9"/><ellipse cx="1040" cy="184" rx="50" ry="26" fill="#fff" opacity=".9"/><ellipse cx="1330" cy="250" rx="70" ry="18" fill="#fff" opacity=".8"/></g>`;
  // the outside ledge (wet), the herb pot on it
  s += `<rect x="${W_.x0 - 30}" y="${W_.y1 - 6}" width="${W_.x1 - W_.x0 + 60}" height="30" rx="4" fill="#CFC8BE"/><rect x="${W_.x0 - 30}" y="${W_.y1 - 6}" width="${W_.x1 - W_.x0 + 60}" height="8" fill="#fff" opacity=".55"/><path d="M${W_.x0 + 40} ${W_.y1 + 2} h420 M${W_.x0 + 520} ${W_.y1 + 2} h100" stroke="#9FC6E0" stroke-width="3" opacity=".8"/>`;
  s += `<g transform="translate(1300 ${W_.y1 - 4})"><path d="M-34 0 L-40 -50 H40 L34 0z" fill="#E08A5E" stroke="#9A4A2A" stroke-width="3"/>${[[-20, -50, -120], [-6, -54, -95], [8, -54, -80], [22, -50, -55], [0, -52, -100], [14, -52, -70]].map(([x, y, a], i) => `<g transform="translate(${x} ${y}) rotate(${a})">${leaf15(48 + 8 * (i % 2), 10, i % 2 ? "#5DB06A" : "#7CC97A", "#2F7A45")}</g>`).join("")}</g>`;
  // frame, open casements, grille (HDB style: bars with a curl)
  s += `<rect x="${W_.x0 - 22}" y="${W_.y0 - 22}" width="${W_.x1 - W_.x0 + 44}" height="22" fill="#fff"/><rect x="${W_.x0 - 22}" y="${W_.y0 - 22}" width="22" height="${W_.y1 - W_.y0 + 22}" fill="#fff"/><rect x="${W_.x1}" y="${W_.y0 - 22}" width="22" height="${W_.y1 - W_.y0 + 22}" fill="#fff"/>
    <path d="M${W_.x0} ${W_.y0} L${W_.x0 + 90} ${W_.y0 + 30} L${W_.x0 + 90} ${W_.y1 - 40} L${W_.x0} ${W_.y1}z" fill="#DDEFF8" stroke="#fff" stroke-width="8" opacity=".9"/><path d="M${W_.x1} ${W_.y0} L${W_.x1 - 90} ${W_.y0 + 30} L${W_.x1 - 90} ${W_.y1 - 40} L${W_.x1} ${W_.y1}z" fill="#DDEFF8" stroke="#fff" stroke-width="8" opacity=".9"/>`;
  for (let x = W_.x0 + 40; x < W_.x1 - 20; x += 56) s += `<path d="M${x} ${W_.y0} V${W_.y1 - 8}" stroke="#F2F2F2" stroke-width="7"/>`;
  s += `<path d="M${W_.x0} ${W_.y0 + 150} H${W_.x1} M${W_.x0} ${W_.y0 + 290} H${W_.x1}" stroke="#F2F2F2" stroke-width="7"/>` + [...Array(6)].map((_, i) => `<path d="M${W_.x0 + 68 + i * 112} ${W_.y0 + 150} q28 50 0 140" fill="none" stroke="#F2F2F2" stroke-width="5"/>`).join("");
  // cabinets above, the calendar, tiles, the counter, the sink and tap, the cabinets below, the floor
  s += `<rect x="-200" y="-120" width="900" height="420" fill="url(#k15Cab)"/><rect x="1580" y="-120" width="540" height="420" fill="url(#k15Cab)"/>${[0, 1, 2].map((i) => `<rect x="${-160 + i * 290}" y="-90" width="260" height="360" rx="10" fill="none" stroke="#6FA89D" stroke-width="5"/><rect x="${-160 + i * 290 + 230}" y="180" width="10" height="60" rx="5" fill="#F2F2F2"/>`).join("")}${[0, 1].map((i) => `<rect x="${1610 + i * 260}" y="-90" width="230" height="360" rx="10" fill="none" stroke="#6FA89D" stroke-width="5"/>`).join("")}
    <rect x="-200" y="300" width="900" height="16" fill="#6FA89D"/><rect x="1580" y="300" width="540" height="16" fill="#6FA89D"/>`;
  s += `<rect x="-200" y="560" width="2320" height="190" fill="#FBFBF8"/>${[...Array(40)].map((_, i) => `<path d="M${-200 + i * 60} 560 V750" stroke="#E2DDD3" stroke-width="2"/>`).join("")}<path d="M-200 620 H2120 M-200 685 H2120" stroke="#E2DDD3" stroke-width="2"/>`;
  s += `<g transform="translate(560 400)"><path d="M0 -14 V0" stroke="#8A5A36" stroke-width="3"/><rect x="-70" y="0" width="140" height="150" rx="6" fill="#fff" stroke="#C9C2B6" stroke-width="3"/><rect x="-70" y="0" width="140" height="36" rx="6" fill="#FF7A5C"/>${T(0, 26, "MARCH", 22, "#fff")}${[...Array(20)].map((_, i) => `<rect x="${-58 + (i % 5) * 24}" y="${48 + Math.floor(i / 5) * 24}" width="16" height="14" rx="3" fill="${i === 7 ? "#FFC83A" : "#E9E4DC"}"/>`).join("")}</g>`;
  s += `<rect x="-200" y="736" width="2320" height="40" fill="url(#k15Top)"/><rect x="-200" y="770" width="2320" height="12" fill="#A9A296"/><rect x="-200" y="782" width="2320" height="420" fill="url(#k15Cab)"/>${[...Array(9)].map((_, i) => `<rect x="${-170 + i * 260}" y="806" width="236" height="300" rx="10" fill="none" stroke="#6FA89D" stroke-width="5"/><rect x="${-170 + i * 260 + 200}" y="840" width="10" height="64" rx="5" fill="#F2F2F2"/>`).join("")}
    <rect x="-200" y="1110" width="2320" height="100" fill="#D9CBB4"/><rect x="-200" y="1104" width="2320" height="10" fill="#6FA89D"/>`;
  s += `<path d="M1000 744 Q1140 760 1290 744" fill="none" stroke="#B9C6D4" stroke-width="10" stroke-linecap="round"/><path d="M1150 740 V660 Q1150 628 1182 628 H1210 Q1226 628 1226 646 V656" fill="none" stroke="url(#g15Steel)" stroke-width="16" stroke-linecap="round"/><rect x="1136" y="720" width="30" height="24" rx="6" fill="#B9C6D4"/>`;
  // the rice cooker and the fruit bowl
  s += `<g transform="translate(1880 742)"><ellipse cx="0" cy="0" rx="110" ry="12" fill="${P.ink}" opacity=".2"/><path d="M-96 0 Q-104 -110 -80 -140 H80 Q104 -110 96 0z" fill="#FFFDF6" stroke="#C9C2B6" stroke-width="5"/><path d="M-84 -140 Q0 -190 84 -140z" fill="#F49B7E" stroke="#C9644A" stroke-width="5"/><rect x="-30" y="-80" width="60" height="30" rx="8" fill="#E9E4DC" stroke="#C9C2B6" stroke-width="3"/><circle cx="-10" cy="-65" r="5" fill="#43BF6C"/></g>`;
  s += `<g transform="translate(560 744)"><ellipse cx="0" cy="0" rx="120" ry="12" fill="${P.ink}" opacity=".2"/><g transform="translate(-44 -50)">${mangoWhole(.55, -20)}</g><circle cx="30" cy="-46" r="34" fill="#F4C24A" stroke="#B98A1E" stroke-width="4"/><circle cx="66" cy="-40" r="28" fill="#F28A3A" stroke="#B8581E" stroke-width="4"/><path d="M-110 -40 Q-104 0 0 2 Q104 0 110 -40z" fill="#FFF8EA" stroke="#C9A974" stroke-width="5"/><path d="M-96 -24 Q0 -10 96 -24" stroke="#8FD3C8" stroke-width="6" fill="none"/></g>`;
  return s; };
// the live kitchen. o.board = the mango state: { cut 0..1 (the knife goes through), seedOut 0..1 (the seed travels to the saucer) }, o.snail [x, y] or false,
// o.dim; cam = [z, cx, cy]
const SNAILK = [1376, KWIN.y1 - 4];
function VK(t, o = {}, cam) { let s = bg("kitchen15");
  // a bird on the grille now and then; drips from the wet ledge; the wind chime outside
  const bu = ((t + 3) % 14) / 14, bk = ss(0, .08, bu) * (1 - ss(.7, .78, bu)); if (bk > .02) s += TF(940, KWIN.y1 - 4 - 30 * (1 - bk), .9, bird15(t, 1, 1)) + (bk < 1 ? `<g opacity="${n2(1 - bk)}"><path d="M940 ${KWIN.y1 - 40} q-20 -20 -40 -6 M940 ${KWIN.y1 - 40} q20 -20 40 -6" stroke="#7E5A3A" stroke-width="4" fill="none"/></g>` : "");
  s += drips15(t, [[860, KWIN.y1 + 24, 0, 90], [1050, KWIN.y1 + 24, 1.1, 90], [1420, KWIN.y1 + 24, .5, 90]]) + chime15(t, 1440, KWIN.y0 - 4, .9);
  if (o.snail !== false) { const [x, y] = o.snail || SNAILK; s += snailAt(t, x, y, .36, { slide: true }); }
  // the wall fan (top left), turning
  s += `<g transform="translate(120 420)"><rect x="-8" y="0" width="16" height="70" fill="#E9E4DC"/><circle r="70" fill="#fff" opacity=".6" stroke="#C9C2B6" stroke-width="4"/>${[0, 1, 2].map((i) => `<ellipse cx="0" cy="-34" rx="16" ry="34" fill="#8FD3C8" opacity=".85" transform="rotate(${n2(t * 420 + i * 120)})"/>`).join("")}<circle r="12" fill="#6FA89D"/><circle r="70" fill="none" stroke="#C9C2B6" stroke-width="3" stroke-dasharray="4 8"/></g>`;
  // the chopping board with the mango, the saucer with the seed
  const bd = o.board || { cut: 1, seedOut: 1 }, cu = clamp(bd.cut || 0), so = clamp(bd.seedOut || 0);
  s += `<g transform="translate(1060 752)"><ellipse cx="0" cy="8" rx="190" ry="14" fill="${P.ink}" opacity=".2"/><rect x="-180" y="-16" width="360" height="26" rx="12" fill="url(#f14Wood)" stroke="#7E4F27" stroke-width="4"/><circle cx="150" cy="-3" r="7" fill="#7E4F27"/>`
    + (cu < .99 ? `<g transform="translate(0 -60)">${mangoWhole(.9, -12)}</g>` : `<g transform="translate(-70 -46) rotate(-80)"><ellipse rx="44" ry="60" fill="#F7A23A" stroke="#C4581E" stroke-width="4"/><ellipse rx="34" ry="48" fill="#FFC83A"/></g><g transform="translate(78 -46) rotate(80)"><ellipse rx="44" ry="60" fill="#F7A23A" stroke="#C4581E" stroke-width="4"/><ellipse rx="34" ry="48" fill="#FFC83A"/></g>`) + `</g>`;
  const sx = 1300, sy = 744; s += `<g transform="translate(${sx} ${sy})"><ellipse cx="0" cy="6" rx="96" ry="12" fill="${P.ink}" opacity=".2"/><path d="M-90 -10 Q-80 10 0 12 Q80 10 90 -10z" fill="#fff" stroke="#C9C2B6" stroke-width="4"/><ellipse cx="0" cy="-10" rx="90" ry="14" fill="#F7F4EE" stroke="#C9C2B6" stroke-width="4"/><path d="M-70 -12 Q0 0 70 -12" stroke="#8FD3C8" stroke-width="4" fill="none"/></g>`;
  if (cu >= .99) { const e = eio(so), x = lerp(1060, sx, e), y = lerp(712, sy - 26, e) - 70 * Math.sin(Math.PI * e); s += TF(x, y, .62, mangoSeed(1, lerp(90, 8, e))); }
  if (o.over) s += o.over;
  if (o.dim) s += `<rect x="-200" y="-120" width="2320" height="1320" fill="${P.night}" opacity="${n2(o.dim)}"/>`;
  return cam ? CAM(s, cam[0], cam[1], cam[2]) : s; }

/* =============================================================================================================================
   THE HDB CORRIDOR outside the flat (Part 1: plant, the look-closers' sets, seedans, measure, HOLD ON!, the snail's reveal, the cliffhanger).
   Facing the parapet: the far blocks and sky beyond it; the old mango tree's crown rises from the garden below at the right; OUR pot on its
   small wooden plant stand (the table) in front of the parapet, centre right; the neighbours' pots along the parapet's ledge
   ============================================================================================================================= */
const PAR = 470, TABLE = [1240, 660], POTW = [1240, 660];   // the parapet's top, the table's top (centre), the pot's base
BG.corridor15 = () => { let s = `<rect x="-200" y="-120" width="2320" height="${PAR + 140}" fill="url(#g14Sky)"/>`;
  s += `<g opacity=".7">${farBlocks(-180, 2120, PAR + 10, 7, 1.15)}</g>${[...Array(16)].map((_, i) => `<circle cx="${-160 + i * 150}" cy="${PAR - 6 + 8 * (i % 3)}" r="${60 + 22 * (i % 3)}" fill="${i % 2 ? "#5FB56C" : "#7CC97A"}"/>`).join("")}`;
  s += `<ellipse cx="300" cy="90" rx="120" ry="28" fill="#fff" opacity=".95"/><ellipse cx="350" cy="68" rx="70" ry="34" fill="#fff" opacity=".95"/><ellipse cx="1100" cy="130" rx="100" ry="22" fill="#fff" opacity=".85"/>`;
  // the corridor's ceiling edge at the top, the column at the left
  s += `<rect x="-200" y="-120" width="2320" height="70" fill="#F2E4CC"/><rect x="-200" y="-56" width="2320" height="10" fill="#D9C9A8"/><rect x="-200" y="-120" width="120" height="${PAR + 140}" fill="#F2E4CC"/><rect x="-86" y="-120" width="12" height="${PAR + 140}" fill="#D9C9A8"/>`;
  // the parapet: cap, face with a painted band, the floor's tiles
  s += `<rect x="-200" y="${PAR}" width="2320" height="340" fill="url(#c15Wall)"/><rect x="-200" y="${PAR - 12}" width="2320" height="26" rx="6" fill="#FFF4E2" stroke="#D9C9A8" stroke-width="3"/><rect x="-200" y="${PAR + 120}" width="2320" height="22" fill="#8FD3C8"/>${[...Array(24)].map((_, i) => `<rect x="${-180 + i * 100}" y="${PAR + 40}" width="60" height="40" rx="6" fill="#EBD3B4"/>`).join("")}`;
  s += `<rect x="-200" y="${PAR + 330}" width="2320" height="420" fill="url(#c15Floor)"/>${[...Array(26)].map((_, i) => `<path d="M${-200 + i * 100} ${PAR + 330} L${-480 + i * 124} 1200" stroke="#A8977C" stroke-width="2" opacity=".6"/>`).join("")}${[0, 1, 2, 3].map((i) => `<path d="M-200 ${PAR + 380 + i * i * 34 + i * 40} H2120" stroke="#A8977C" stroke-width="2" opacity=".5"/>`).join("")}`;
  // the shoe rack at the left, with shoes
  s += `<g transform="translate(150 1000)"><ellipse cx="0" cy="10" rx="170" ry="14" fill="${P.ink}" opacity=".2"/><rect x="-150" y="-170" width="300" height="170" rx="8" fill="#B98A5A" stroke="#7E5A3A" stroke-width="5"/><path d="M-150 -86 H150" stroke="#7E5A3A" stroke-width="5"/>${[[-100, -100, "#FF7A5C"], [-30, -100, "#5B7BD6"], [50, -100, "#fff"], [-90, -14, "#43BF6C"], [10, -14, "#FFC83A"], [90, -14, "#9B6BFF"]].map(([x, y, c]) => `<path d="M${x - 30} ${y} Q${x - 30} ${y - 26} ${x} ${y - 26} Q${x + 34} ${y - 22} ${x + 34} ${y}z" fill="${c}" stroke="${P.ink}" stroke-width="3" opacity=".9"/>`).join("")}</g>`;
  // the neighbours' pots on the ledge: pandan, a chilli plant, a money plant
  s += `<g transform="translate(640 ${PAR - 10})"><path d="M-40 0 L-46 -56 H46 L40 0z" fill="#5B8DEF" stroke="#34457A" stroke-width="3"/>${[...Array(9)].map((_, i) => `<path d="M${-20 + i * 5} -56 Q${-60 + i * 15} ${-150 - 20 * (i % 3)} ${-90 + i * 22} ${-110 - 30 * (i % 2)}" fill="none" stroke="${i % 2 ? "#3E9E5A" : "#58B56C"}" stroke-width="9" stroke-linecap="round"/>`).join("")}</g>`;
  s += `<g transform="translate(910 ${PAR - 10})"><path d="M-36 0 L-42 -54 H42 L36 0z" fill="#E08A5E" stroke="#9A4A2A" stroke-width="3"/><rect x="-46" y="-62" width="92" height="12" rx="4" fill="#D9774A" stroke="#9A4A2A" stroke-width="3"/><path d="M0 -60 V-150 M0 -110 L-40 -140 M0 -100 L40 -136" stroke="#5E8A3E" stroke-width="5" fill="none"/>${[[-40, -140, 200], [40, -136, -20], [0, -150, -90], [-20, -120, 150], [22, -118, 20]].map(([x, y, a]) => `<g transform="translate(${x} ${y}) rotate(${a})">${leaf15(40, 10, "#58B56C", "#2F7A45")}</g>`).join("")}${[[-30, -122], [26, -110], [8, -138]].map(([x, y]) => `<path d="M${x} ${y} q4 20 -2 34" stroke="#E33B2E" stroke-width="7" fill="none" stroke-linecap="round"/>`).join("")}</g>`;
  s += `<g transform="translate(1690 ${PAR - 10})"><path d="M-38 0 L-44 -56 H44 L38 0z" fill="#FFF4E2" stroke="#C9A974" stroke-width="3"/>${[...Array(6)].map((_, i) => `<path d="M${-30 + i * 12} -54 Q${-60 + i * 24} ${10 + 20 * (i % 2)} ${-50 + i * 20} ${120 + 30 * (i % 3)}" fill="none" stroke="#3E9E5A" stroke-width="3"/>`).join("")}${[...Array(10)].map((_, i) => `<ellipse cx="${-44 + i * 10}" cy="${-30 + 16 * (i % 4) + i * 6}" rx="12" ry="9" fill="${i % 2 ? "#7CC97A" : "#B8DC6A"}" stroke="#2F7A45" stroke-width="2"/>`).join("")}</g>`;
  // the plant stand (our table): top at TABLE
  const [tx, ty] = TABLE; s += `<ellipse cx="${tx}" cy="${ty + 250}" rx="190" ry="16" fill="${P.ink}" opacity=".22" filter="url(#b4)"/><path d="M${tx - 140} ${ty + 16} L${tx - 150} ${ty + 248} M${tx + 140} ${ty + 16} L${tx + 150} ${ty + 248} M${tx - 80} ${ty + 16} L${tx - 84} ${ty + 230} M${tx + 80} ${ty + 16} L${tx + 84} ${ty + 230}" stroke="#7E4F27" stroke-width="14" stroke-linecap="round"/><path d="M${tx - 144} ${ty + 150} H${tx + 144}" stroke="#7E4F27" stroke-width="9"/><rect x="${tx - 170}" y="${ty}" width="340" height="22" rx="7" fill="url(#f14Wood)" stroke="#7E4F27" stroke-width="4"/>`;
  return s; };
// the old mango tree's crown, seen beyond the parapet (it stands in the garden below): flower sprays, a few mangoes, red tips
const oldCrown = (t, x, y, k = 1) => { const C = [[-190, 30, 150, 80, "#2F8048"], [0, -20, 200, 100, "#3E9E5A"], [190, 30, 150, 80, "#2F8048"], [-90, -60, 120, 60, "#58B56C"], [100, -60, 130, 60, "#58B56C"]];
  let s = C.map(([cx, cy, rx, ry, c], i) => `<ellipse cx="${n2(cx + 4 * Math.sin(t * .7 + i))}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${c}"/>`).join("");
  s += [[-200, -10], [-110, -70], [-20, -100], [70, -80], [160, -20], [220, 30], [-150, 60], [40, 20]].map(([a, b], i) => flowerSpray(t, a, b, .5, i)).join("") + [[-60, 50], [120, 60]].map(([a, b]) => `<g transform="translate(${a} ${b})">${mangoHang(.45, "g")}</g>`).join("");
  return TF(x, y, k, s); };
// a spray (panicle) of tiny cream mango flowers; origin = its base, pointing up
function flowerSpray(t, x, y, k = 1, ph = 0, o = {}) { const sw = 3 * Math.sin(t * 1.2 + ph); let s = `<path d="M0 0 Q${n2(sw)} -60 ${n2(sw * 1.5)} -120" stroke="#C9A55A" stroke-width="5" fill="none" stroke-linecap="round"/>`;
  for (let i = 0; i < 9; i++) { const yy = -14 - i * 12, w = (9 - i) * 6 + 8; s += `<path d="M${n2(sw * yy / -120)} ${yy} l${-w} ${-10} M${n2(sw * yy / -120)} ${yy} l${w} ${-10}" stroke="#C9A55A" stroke-width="2.5" stroke-linecap="round"/>`;
    for (const sd of [-1, 1]) for (let j = 0; j < 3; j++) { const fx = sw * yy / -120 + sd * w * (j + 1) / 3, fy = yy - 10 * (j + 1) / 3 - 4; s += `<circle cx="${n2(fx)}" cy="${n2(fy)}" r="${n2(o.big ? 6 : 5)}" fill="${(i + j) % 3 ? "#FFF6DA" : "#FFE6A8"}" stroke="#D9B86A" stroke-width="1.2"/>`; } }
  return TF(x, y, k, s + `<circle cx="${n2(sw * 1.5)}" cy="-126" r="6" fill="#FFF6DA" stroke="#D9B86A" stroke-width="1.2"/>`); }
// a mango hanging on its stalk (origin = the stalk's top); kind "g" green (young) or "y" ripe
const mangoHang = (k = 1, kind = "g") => `<g transform="scale(${k})"><path d="M0 0 Q4 20 0 40" stroke="#6E4324" stroke-width="5" fill="none"/><path d="M0 40 C34 38 50 70 44 104 C38 136 14 148 -8 144 C-36 140 -46 112 -40 84 C-34 58 -20 42 0 40z" fill="${kind === "g" ? "url(#g15MangoG)" : "url(#g14Mango)"}" stroke="${kind === "g" ? "#4E8A34" : "#C4581E"}" stroke-width="4"/><ellipse cx="-14" cy="80" rx="7" ry="16" fill="#fff" opacity=".35" transform="rotate(15 -14 80)"/></g>`;
// the live corridor. o.plant = youngPlant15 options (null = no plant: only soil), o.seed (the seed lying on the soil, before planting),
// o.snail [x, y] or false, o.items (svg drawn after the pot), o.wet 0..1 (the soil after watering), o.dim, o.crown (the old tree's crown: default on)
const SNAILC = { plant: [880, PAR - 64], seedans: [430, 1000], waitw: [1300, 600], measure: [1500, PAR - 8], strip: [1500, PAR - 8], holdon: [1100, 820], liz: [1336, 512], cliff: [1336, 512] };
function VC(t, o = {}, cam) { let s = bg("corridor15");
  if (o.crown !== false) s += oldCrown(t, 1640, PAR - 40, .9);
  // the laundry pole at the top with the neighbour's clothes swaying; a bird on the ledge; a far bus below (just its roof)
  s += `<path d="M-200 30 L2120 60" stroke="#C9A26A" stroke-width="12"/>` + [[260, "#8FC0F2", 0], [420, "#FF8FB1", 1], [560, "#FFF8EA", 2], [1500, "#FFC38A", 3]].map(([x, c, i]) => { const y = 30 + 30 * (x + 200) / 2320, sw = 3 * Math.sin(t * 1.3 + i); return `<g transform="translate(${x} ${n2(y)}) rotate(${n2(sw)})"><path d="M-40 0 L-56 26 L-36 34 L-36 110 H36 V34 L56 26 L40 0 Q0 18 -40 0z" fill="${c}" stroke="${P.ink}" stroke-width="3" opacity=".95"/><path d="M-20 -2 V8 M20 -2 V8" stroke="#8A8F9E" stroke-width="3"/></g>`; }).join("");
  s += chime15(t, 1460, -50, 1.1);
  const bu = ((t + 7) % 16) / 16, bk = ss(0, .06, bu) * (1 - ss(.75, .82, bu)); if (bk > .02) s += TF(470 + 40 * bu, PAR - 12 - 40 * (1 - bk), .9, bird15(t, 1, 2));
  if (o.snail !== false) { const sp = o.snail || SNAILC[(window._S || {}).name]; if (sp) s += snailAt(t, sp[0], sp[1], .34, { slide: true, flip: sp[2] }); }
  // our pot on the table, its plant
  const [px, py] = POTW; s += TF(px, py, 1, pot15({ wet: o.wet || 0 }) + (o.seed ? TF(0, POTS - 6, .42, mangoSeed(1, 6)) : "") + (o.plant ? TF(0, POTS, 1, youngPlant15(t, o.plant)) : "") + (o.potOver || ""));
  if (o.items) s += o.items;
  if (o.dim) s += `<rect x="-200" y="-120" width="2320" height="1320" fill="${P.night}" opacity="${n2(o.dim)}"/>`;
  return cam ? CAM(s, cam[0], cam[1], cam[2]) : s; }
const camPt = (c, p) => [c[0] * p[0] - (c[0] - 1) * c[1], c[0] * p[1] - (c[0] - 1) * c[2]];
const camL = (a, b, u) => [lerp(a[0], b[0], u), lerp(a[1], b[1], u), lerp(a[2], b[2], u)];
// the plant's state at any time in Part 1 (after the time-lapse): Day 45 -> Week 4 (12 cm)
const PLANT45 = { h: 140, n: 4, red: 0, k: 1 }, PLANTW4 = { h: 12 * CM - 14, n: 6, red: 0, k: 1.05 };

/* =============================================================================================================================
   LOOK CLOSER 1 · observing like a scientist: LEFT the real seed, big, on its saucer (each sense done to it); RIGHT the journal page, LARGE
   ============================================================================================================================= */
const SENSE = [["look", "LOOK", "#3A8DFF", "brown, big and flat"], ["touch", "TOUCH", "#E36A12", "hard, a little hairy"], ["smell", "SMELL", "#2FA35A", "smells of mango"]];
const eyeIcon = (c) => `<path d="M-30 0 Q0 -26 30 0 Q0 26 -30 0z" fill="#fff" stroke="${c}" stroke-width="5"/><circle r="11" fill="${c}"/><circle cx="-3" cy="-3" r="3.5" fill="#fff"/>`;
const handIcon = (c) => `<g fill="#fff" stroke="${c}" stroke-width="4.5" stroke-linejoin="round"><rect x="-16" y="-6" width="32" height="30" rx="10"/><rect x="-15" y="-26" width="8" height="26" rx="4"/><rect x="-6" y="-31" width="8" height="30" rx="4"/><rect x="3" y="-29" width="8" height="28" rx="4"/><rect x="12" y="-23" width="7" height="22" rx="3.5"/><rect x="-28" y="-4" width="16" height="8" rx="4" transform="rotate(-30 -20 0)"/></g>`;
const noseIcon = (c) => `<path d="M-4 -26 Q-8 4 -20 12 Q-14 22 0 18 Q14 22 20 12 Q8 4 4 -26z" fill="#fff" stroke="${c}" stroke-width="5" stroke-linejoin="round"/><circle cx="-8" cy="12" r="3" fill="${c}"/><circle cx="8" cy="12" r="3" fill="${c}"/>`;
const senseIcon = (i, c) => [eyeIcon, handIcon, noseIcon][i](c);
const pageLined = (x, y, w, h, o = {}) => `<g transform="translate(${x} ${y}) rotate(${o.rot || 0})"><g filter="url(#dropS)"><rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="10" fill="#FFFDF6" stroke="#D9C9A8" stroke-width="3"/></g>${[...Array(Math.floor(h / 40) - 1)].map((_, i) => `<path d="M${-w / 2 + 14} ${-h / 2 + 40 + i * 40} H${w / 2 - 14}" stroke="#BFD6EE" stroke-width="2"/>`).join("")}<path d="M${-w / 2 + 40} ${-h / 2 + 6} V${h / 2 - 6}" stroke="#F4A7A0" stroke-width="2"/>${o.inner || ""}</g>`;
const scribbleLine = (x, y, txt, size, u, col = "#3A3A5A") => { if (u <= 0) return ""; const n = Math.max(1, Math.round(txt.length * clamp(u))); return `<text x="${x}" y="${y}" font-family="Fredoka" font-weight="600" font-size="${size}" fill="${col}">${esc(txt.slice(0, n))}</text>`; };
const pencil15 = (k = 1, rot = 0) => `<g transform="rotate(${rot}) scale(${k})"><rect x="0" y="-9" width="150" height="18" rx="3" fill="#FFC83A" stroke="#B98A1E" stroke-width="3"/><path d="M150 -9 L178 0 L150 9z" fill="#F2D9B0" stroke="#B98A1E" stroke-width="3"/><path d="M170 -2.5 L178 0 L170 2.5z" fill="#2B2147"/><rect x="-22" y="-9" width="24" height="18" rx="3" fill="#F49B9B" stroke="#B9666A" stroke-width="3"/></g>`;
function obsArt(t) { const m = MK, tJ = m("journal"), tP = LT("g603p"), tH = LT("g604"), tL = m("look"), tT = m("touch"), tS = m("smell"), tW = m("write"), ph = ss(tH - .2, tH + .6, t);
  let s = `<rect x="-900" y="-450" width="1800" height="900" fill="#FFF3DC"/><rect x="-900" y="160" width="1800" height="300" fill="#F2DDB8"/><path d="M-900 160 H900" stroke="#E3C9A8" stroke-width="4"/>`;
  // LEFT: the seed, big, on its saucer (by the pot's edge)
  const SX = -360, SY = 40; s += `<g transform="translate(${SX} ${SY + 120})"><ellipse cx="0" cy="34" rx="300" ry="34" fill="${P.ink}" opacity=".16"/><path d="M-280 -10 Q-250 40 0 44 Q250 40 280 -10z" fill="#fff" stroke="#C9C2B6" stroke-width="6"/><ellipse cx="0" cy="-10" rx="280" ry="44" fill="#F7F4EE" stroke="#C9C2B6" stroke-width="6"/><path d="M-220 -14 Q0 20 220 -14" stroke="#8FD3C8" stroke-width="8" fill="none"/></g>`
    + TF(SX, SY + 50 - 6 * pulse(t, tT + .6, .05, .4), 2.2, mangoSeed(1, -6)) + `<path d="M-900 -330 L-700 -330 L-700 120 L-900 120z" fill="url(#p15Pot)" opacity=".9"/><rect x="-910" y="-360" width="236" height="44" rx="10" fill="#D9774A" stroke="#9A4A2A" stroke-width="5"/>`;
  // the senses happening on the seed: a magnifier (look), a gentle finger (touch), scent wisps and a sniff (smell)
  const aL = ss(tL - .1, tL + .3, t) * (1 - ss(tT - .3, tT, t)), aT = ss(tT - .2, tT + .4, t) * (1 - ss(tS - .3, tS, t)), aS = ss(tS - .2, tS + .3, t) * (1 - ss(tW - .1, tW + .3, t));
  if (aL > .01) s += OP(aL, TF(SX + 40 + 40 * Math.sin(t * 1.4), SY + 10 + 16 * Math.cos(t * 1.1), 1.4, magnifier(100)));
  if (aT > .01) s += OP(aT, TF(SX + 300 - 40 * ss(tT, tT + .8, t), SY - 40, .9, hand15({ point: true }), 150));
  if (aS > .01) s += OP(aS, [0, 1, 2].map((i) => { const u = ((t * .6 + i / 3) % 1); return `<path d="M${SX - 60 + i * 60} ${n2(SY - 20 - 200 * u)} q20 -20 0 -40 q-20 -20 0 -40" fill="none" stroke="#2FA35A" stroke-width="7" stroke-linecap="round" opacity="${n2(Math.sin(Math.PI * u) * .8)}"/>`; }).join(""));
  // RIGHT: Momo's idea first (only two pages, Day 1 and "a big tree", a big gap with a ?), Pip fills the gap with many pages; then the journal at Day 1
  const kI = spring(t, tJ, .45) * (1 - ph);
  if (kI > .01) { let g = pageLined(-250, 0, 220, 280, { rot: -4, inner: T(0, -96, "Day 1", 34, P.ink) + TF(0, 30, .55, mangoSeed(1, 0)) }) + pageLined(250, 0, 220, 280, { rot: 4, inner: T(0, -96, "a big tree", 30, P.ink) + `<g transform="translate(0 70)"><path d="M-8 30 V-40 M8 30 V-40" stroke="#8A5E3A" stroke-width="10"/><ellipse cx="0" cy="-70" rx="70" ry="50" fill="#58B56C"/></g>` });
      const fill = ss(tP + .4, tP + 2.4, t); if (fill < .2) g += `<path d="M-120 0 H120" stroke="${P.ink}" stroke-width="5" stroke-dasharray="4 14" stroke-linecap="round"/>` + TF(0, -10, 1 + .06 * Math.sin(t * 4), `<circle r="46" fill="url(#gSun)"/>${T(0, 24, "?", 70, P.ink)}`);
      for (let i = 0; i < 9; i++) { const a = ss(tP + .4 + i * .2, tP + .6 + i * .2, t); if (a > .01) g += TF(-110 + i * 27.5, 10 - 30 * Math.sin(i), a * .32, pageLined(0, 0, 220, 280, { rot: -10 + i * 3, inner: T(0, -60, "Day " + [2, 3, 5, 8, 10, 15, 20, 30, 45][i], 46, P.ink) })); }
      g += TF(0, -200, spring(t, tJ + .2, .4), tpill(0, 0, "Momo's plan: look only twice?", 34, P.momo, "#fff", { w: 700 })) + (fill > .5 ? TF(0, 200, spring(t, tP + 2.2, .4), tpill(0, 0, "we would miss all the changes!", 34, P.ink, "#fff", { w: 700 })) : "");
      s += TF(380, -30, kI * 1.08, g); }
  if (ph > .01) { const JX = 420, JY = 20, JW = 740, JH = 600;
    let j = `<g filter="url(#drop)"><rect x="${-JW / 2 - 14}" y="${-JH / 2 - 10}" width="${JW + 28}" height="${JH + 24}" rx="18" fill="#3E7CC9"/></g>` + pageLined(0, 0, JW, JH, { inner: "" })
      + T(-JW / 2 + 70, -JH / 2 + 32, "Day 1", 52, P.ink, { a: "start" }) + T(JW / 2 - 30, -JH / 2 + 30, "OUR MANGO SEED", 26, "#3E7CC9", { a: "end", ls: 2 })
      + TF(JW / 2 - 110, -JH / 2 + 120, .62, mangoSeed(1, -8)) + `<path d="M${JW / 2 - 190} ${-JH / 2 + 80} q80 -6 150 4" stroke="#3A3A5A" stroke-width="2" fill="none" stroke-dasharray="4 4"/>`;
    SENSE.forEach(([mk, word, col, line], i) => { const t0 = m(mk), y = -JH / 2 + 210 + i * 120, k = spring(t, t0 - .05, .4); if (k < .02) return;
      j += TF(-JW / 2 + 60, y - 12, k * (1 + .12 * pulse(t, t0, .03, .4)), `<circle r="44" fill="${col}" opacity=".16"/>` + senseIcon(i, col)) + T(-JW / 2 + 120, y - 30, word, 30, col, { a: "start", ls: 2 })
        + scribbleLine(-JW / 2 + 120, y + 14, line, 46, (t - t0 - .3) / 1.4); });
    if (t >= tW - .1) { const u = clamp((t - tW) / 2.4), py = -JH / 2 + 210 + Math.min(2, Math.floor(u * 3)) * 120 + 14, px = -JW / 2 + 140 + 420 * ((u * 3) % 1);
      j += [1, 2, 3].map((i) => { const a = ss(tW + .4 + i * .5, tW + .8 + i * .5, t); return a < .01 ? "" : OP(a, `<g transform="translate(${JW / 2 + 10 + i * 18} ${-JH / 2 + 30 + i * 12})"><rect x="-30" y="0" width="60" height="${JH - 60}" rx="8" fill="#FFFDF6" stroke="#D9C9A8" stroke-width="3"/></g>` + TF(JW / 2 + 44 + i * 18, -JH / 2 + 10 + i * 12, 1, tpill(0, 0, "Day " + [2, 3, 4][i - 1], 24, "#3E7CC9", "#fff", { w: 700 }))); }).join("")
        + (u < 1 ? TF(px, py - 60, .8, pencil15(1, 120 + 8 * Math.sin(t * 20))) : "") + (t >= tW + 1.2 ? TF(0, JH / 2 - 44, spring(t, tW + 1.2, .4), tpill(0, 0, "write it down every time", 34, "#3E7CC9", "#fff", { w: 700 })) : ""); }
    s += OP(ph, TF(JX, JY, lerp(.86, 1, ph), j));
    // each sense's icon joined to the seed by a plain line in its colour (the line goes from the thing to its journal line)
    SENSE.forEach(([mk, , col], i) => { const t0 = m(mk); if (t < t0) return; const y = JY - JH / 2 + 210 + i * 120 - 12; s += pline(SX + 200, SY + 10 - 30 + i * 30, JX - JW / 2 + 16, y, ramp(t, t0, .3) * ph, col); }); }
  return s; }

/* =============================================================================================================================
   LOOK CLOSER 2 · the seed, day after day, through a window in the pot's side (one continuous time-lapse, speeded up)
   ============================================================================================================================= */
const SEEDP = [-60, 120];   // the seed in the window (art coordinates); the soil's surface at y = -150
function seedArt(t) { const m = MK, tR = m("root"), tS = m("shoot"), tL = m("leaves"), tG = m("green"), tO = m("oldseed"), tD = [m("d1"), m("d10"), m("d20"), m("d30"), m("d45")];
  const day = t < tD[1] ? 1 : t < tD[2] ? lerp(1, 10, 0) + 9 * ss(tD[1] - 1, tD[1], t) : 0;   // (unused: the day pill is drawn by over)
  const light = .35 + .65 * clamp((t - tD[0]) / (tD[4] - tD[0]));
  // the camera inside the picture: tilt down for the root, up for the shoot, a push on the red leaves, back out for the old seed
  const cyA = lerp(0, 100, ss(tR - .3, tR + 1.2, t)) * (1 - ss(tS - .4, tS + .6, t)) + lerp(0, -90, ss(tS - .4, tS + 1.2, t)) * (1 - ss(tG + .5, tG + 1.8, t)), zA = 1 + .16 * ss(tL - .2, tL + .8, t) * (1 - ss(tG + 1.2, tG + 2.2, t));
  let s = `<rect x="-900" y="-450" width="1800" height="900" fill="${mixC("#C9E4F2", "#FFF1C8", light)}"/>`;
  // behind: the corridor's parapet, soft
  s += `<g opacity=".55" filter="url(#b6)"><rect x="-900" y="-200" width="1800" height="70" fill="#FFF4E2"/><rect x="-900" y="-130" width="1800" height="300" fill="#F2D1AC"/></g>`;
  let w = "";
  // the pot (big), its rim, the window
  w += `<path d="M-430 520 L-470 -120 L350 -120 L310 520z" fill="url(#p15Pot)" stroke="#9A4A2A" stroke-width="7"/><rect x="-500" y="-170" width="880" height="64" rx="16" fill="#D9774A" stroke="#9A4A2A" stroke-width="7"/><ellipse cx="-60" cy="-150" rx="400" ry="22" fill="#6E4A2C"/>`;
  w += `<clipPath id="swc"><rect x="-340" y="-80" width="560" height="520" rx="26"/></clipPath><rect x="-350" y="-90" width="580" height="540" rx="32" fill="#E9F6FF" stroke="#7FB2D6" stroke-width="8"/><g clip-path="url(#swc)"><rect x="-340" y="-80" width="560" height="520" fill="url(#j15Soil)"/>`;
  for (let i = 0; i < 46; i++) { const x = -330 + 540 * hash(i, 21), y = -70 + 500 * hash(i, 23), r = 5 + 12 * hash(i, 25), sh = (t > tR && Math.hypot(x - SEEDP[0], y - SEEDP[1] - 160) < 120) ? 3 * Math.sin(t * 5 + i) : 0;
    w += `<ellipse cx="${n2(x + sh)}" cy="${n2(y)}" rx="${n2(r)}" ry="${n2(r * .7)}" fill="${i % 3 ? "#6E4A2C" : "#8A6240"}" opacity=".85"/>`; }
  w += `<ellipse cx="120" cy="330" rx="34" ry="22" fill="#A89A8A" stroke="#7A6E62" stroke-width="3"/>`;
  // the root: FIRST, from the seed's lower end, growing DOWN (with small side roots later)
  const ru = clamp((t - (tR - .5)) / 3.2), rootEnd = [SEEDP[0] - 70 - 20 * ru, SEEDP[1] + 30 + 300 * ru];
  if (ru > 0) { w += `<path d="M${SEEDP[0] - 70} ${SEEDP[1] + 20} Q${SEEDP[0] - 90} ${SEEDP[1] + 30 + 150 * ru} ${n2(rootEnd[0])} ${n2(rootEnd[1])}" fill="none" stroke="#F6EEDF" stroke-width="13" stroke-linecap="round"/>`;
    const sr = clamp((t - tS) / 6); for (let i = 0; i < 5; i++) { const a = ss(i * .15, i * .15 + .4, sr); if (a > .01) { const yy = SEEDP[1] + 80 + i * 50 * ru, sd = i % 2 ? 1 : -1; w += `<path d="M${n2(SEEDP[0] - 84 - 5 * i)} ${n2(yy)} q${sd * 30 * a} ${18 * a} ${sd * 60 * a} ${40 * a}" fill="none" stroke="#F6EEDF" stroke-width="5" stroke-linecap="round"/>`; } } }
  // the seed (it swells a little after the root starts), the shoot from its upper end, hooked, pushing up
  const sw = 1 + .06 * ss(tR - 1, tR, t); w += TF(SEEDP[0], SEEDP[1], 1.5 * sw, mangoSeed(1, -8, { fill: mixC("#EBD7A6", "#D8BE86", clamp((t - tS) / 10)) }));
  const su = clamp((t - (tS - .5)) / 1.8), sTop = lerp(SEEDP[1] - 40, -150, su);
  if (su > 0) w += `<path d="M${SEEDP[0] - 60} ${SEEDP[1] - 30} Q${SEEDP[0] - 40} ${n2((SEEDP[1] + sTop) / 2)} ${SEEDP[0] - 20} ${n2(sTop)}" fill="none" stroke="#C8D88A" stroke-width="14" stroke-linecap="round"/>`;
  w += `</g>`;
  // above the soil: the shoot comes out bent like a hook, straightens towards the light; two RED leaves open, then turn green; two more
  const up = clamp((t - (tS + 1.2)) / (tL - tS - 1)), hook = 1 - ss(tL - 1.2, tL + .2, t), h = 30 + 170 * eio(up) + 60 * ss(tL, tG + 1, t), red = 1 - ss(tG - .1, tG + 1.4, t), nL = t < tL - .1 ? 0 : t < tG + .6 ? 2 : 4;
  if (t > tS + 1.1) w += TF(SEEDP[0] - 20, -150, 1.5, youngPlant15(t, { h: h / 1.5, n: nL, red, open: ss(tL - .1, tL + 1.6, t) * (nL > 2 ? 1 : 1), hook, k: 1.1, sw: .6 }));
  // labels (a plain line to the exact part; colour: the seed buff, the root white, the shoot and leaves green / red)
  const lab = (mk, tx, ty, txt, px, py, o = {}) => lcLab(t, mk, tx, ty, txt, px, py, { size: 44, ...o });
  w += lab(m("kw_seed") - .3, 380, 120, "seed", SEEDP[0] + 110, SEEDP[1], { t1: tR - .4 }) + lab(tR + .2, 330, 330, "root", rootEnd[0] + 10, rootEnd[1] - 40, { t1: tS - .3 })
    + lab(tS + .6, 380, -220, "shoot", SEEDP[0] - 20 + (t > tS + 1.2 ? 0 : 0), t > tS + 1.4 ? -150 - h * .5 : -60, { t1: tL - .2 }) + lab(tL + .4, 400, -360, "leaves", SEEDP[0] + 60, -150 - h + 10, { t1: tO - .3, fill: mixC("#DFF5E2", "#FFE1DC", red) })
    + lab(tO, 400, 210, "the old seed", SEEDP[0] + 100, SEEDP[1] + 10, {});
  if (t > tL + .5 && t < tG + .8) w += TF(-470, -330, spring(t, tL + .6, .4), tpill(0, 0, "red, not green!", 40, "#C2473A", "#fff", { w: 700 }));
  if (t > tG + .4 && t < tO) w += TF(-470, -330, spring(t, tG + .5, .4), tpill(0, 0, "now they turn green", 40, P.leaf, "#fff", { w: 700 }));
  s += `<g transform="translate(140 70) scale(.8) translate(0 ${n2(-cyA)}) scale(${n2(zA)}) translate(${n2(-(SEEDP[0] - 20) * (1 - 1 / zA))} ${n2(150 * (1 - 1 / zA))})">${w}</g>`;
  return s; }

/* =============================================================================================================================
   THE JOURNEY · BE THE MANGO SEED (first person, present tense). The camera IS the seed: dark cool soil, crumbs big as rocks; a root goes
   down (the view tilts down with it); a shoot goes up, up, up; out into the light inside OUR pot (its rim like cliffs, the parapet, the sky);
   the first leaves open, soft and red, framing the view. World y: the soil's surface at 0, the seed at +700
   ============================================================================================================================= */
function seedJourney(t, s) { const m = MK, tS = m("jseed"), tW = m("jswell"), tR = m("jroot"), tSh = m("jshoot"), tLi = m("jlight"), tLv = m("jleaves");
  const camY = lerp(700, 1000, ss(tR, tR + 2, t)) - 860 * ss(tSh + .2, tLi + .4, t) * 0 - lerp(0, 1220, ss(tSh + .2, tLi + .6, t)), Y = (wy) => 540 + wy - camY, sw = 1 + .08 * ss(tW, tW + 1.4, t);
  let o = `<rect width="1920" height="1080" fill="url(#j15Soil)"/>`;
  // above the surface: the sky, the parapet like a cliff, our pot's rim rising on both sides
  const sY = Y(0); if (sY > -200) o += `<rect x="0" y="${n2(sY - 1600)}" width="1920" height="1600" fill="url(#j15Sky)"/><rect x="1240" y="${n2(sY - 1500)}" width="900" height="1100" fill="#F2D1AC"/><rect x="1220" y="${n2(sY - 1520)}" width="940" height="60" rx="10" fill="#FFF4E2"/>`
    + `<path d="M-40 ${n2(sY + 40)} L120 ${n2(sY - 540)} L260 ${n2(sY - 560)} L250 ${n2(sY + 40)}z" fill="url(#p15Pot)" stroke="#9A4A2A" stroke-width="10"/><path d="M1960 ${n2(sY + 40)} L1800 ${n2(sY - 540)} L1660 ${n2(sY - 560)} L1670 ${n2(sY + 40)}z" fill="url(#p15Pot)" stroke="#9A4A2A" stroke-width="10"/>`
    + [...Array(7)].map((_, i) => { const x = 300 + i * 200 + 30 * Math.sin(t * .5 + i), y = sY - 380 + 140 * Math.sin(i * 1.7) + 20 * Math.sin(t * .8 + i); return `<circle cx="${n2(x)}" cy="${n2(y)}" r="${n2(4 + 3 * hash(i, 4))}" fill="#FFF6C8" opacity="${n2(.5 + .4 * Math.sin(t * 2 + i))}"/>`; }).join("")
    + `<path d="M500 ${n2(sY - 1100)} L800 ${n2(sY - 200)} M900 ${n2(sY - 1100)} L1000 ${n2(sY - 200)}" stroke="#FFF6C8" stroke-width="60" opacity=".18"/>`;
  // the soil: crumbs big as rocks (three depths: far small and slow, near big and fast), grains drifting, a far ant tunnel, a friendly worm far off
  for (let i = 0; i < 60; i++) { const d = .4 + .9 * hash(i, 31), x = 1920 * hash(i, 33), wy = -60 + 2000 * hash(i, 35), y = 540 + (wy - camY) * d + 20 * Math.sin(t * .3 + i), r = (20 + 50 * hash(i, 37)) * d;
    if (y < sY - 20 || y < -100 || y > 1200) continue; o += `<ellipse cx="${n2(x)}" cy="${n2(y)}" rx="${n2(r)}" ry="${n2(r * .72)}" fill="${i % 3 ? "#5E3E26" : "#7A5434"}" opacity="${n2(.5 + .45 * (d - .4))}"/><ellipse cx="${n2(x - r * .3)}" cy="${n2(y - r * .3)}" rx="${n2(r * .3)}" ry="${n2(r * .18)}" fill="#9A7350" opacity=".35"/>`; }
  { const y = Y(980); if (y < 1300 && y > -200) o += `<path d="M1300 ${n2(y)} q120 -40 240 10 t240 -20" fill="none" stroke="#3A2414" stroke-width="40" stroke-linecap="round" opacity=".5"/>`; }
  { const y = Y(560), x = 260 + 40 * Math.sin(t * .4); if (y > -100 && y < 1200) o += `<path d="M${n2(x)} ${n2(y)} q30 -20 60 0 t60 0 t60 0" fill="none" stroke="#E89A8A" stroke-width="22" stroke-linecap="round"/><circle cx="${n2(x + 176)}" cy="${n2(y - 4)}" r="3" fill="#2B2147"/><path d="M${n2(x + 168)} ${n2(y + 4)} q6 4 10 0" stroke="#2B2147" stroke-width="2" fill="none"/>`; }
  // YOU: the seed coat (hairy, curved) along the bottom of the view; it swells; the root pushes out and goes down; the shoot goes up
  const seedY = Y(760); o += `<g transform="translate(960 ${n2(seedY + 300)}) scale(${n2(sw)})"><ellipse rx="1250" ry="420" fill="#EBD7A6" stroke="#B48F5C" stroke-width="12"/>${[...Array(60)].map((_, i) => { const a = Math.PI + i / 60 * Math.PI, x = 1250 * Math.cos(a), y = 420 * Math.sin(a); return `<path d="M${n2(x)} ${n2(y)} l${n2(Math.cos(a) * 26)} ${n2(Math.sin(a) * 34)}" stroke="#C9A974" stroke-width="6" stroke-linecap="round"/>`; }).join("")}<path d="M-900 -260 Q0 -380 900 -260 M-1000 -180 Q0 -300 1000 -180" stroke="#C9A974" stroke-width="10" fill="none" opacity=".7"/></g>`;
  const ru = clamp((t - tR) / 3); if (ru > 0) { const x0 = 400, y0 = seedY - 40, ex = lerp(x0, 170, ru), ey = y0 + 640 * ru; o += `<path d="M${x0} ${n2(y0)} Q${n2(x0 - 40)} ${n2(y0 + 300 * ru)} ${n2(ex)} ${n2(ey)}" fill="none" stroke="#8A7A5A" stroke-width="58" stroke-linecap="round" opacity=".35"/><path d="M${x0} ${n2(y0)} Q${n2(x0 - 40)} ${n2(y0 + 300 * ru)} ${n2(ex)} ${n2(ey)}" fill="none" stroke="#F6EEDF" stroke-width="46" stroke-linecap="round"/>` + [.3, .5, .7, .85].map((q, i) => q > ru ? "" : `<path d="M${n2(lerp(x0, ex, q) - 14)} ${n2(lerp(y0, ey, q))} l${i % 2 ? 40 : -40} 16" stroke="#F6EEDF" stroke-width="6" stroke-linecap="round"/>`).join(""); }
  const su = clamp((t - tSh) / (tLi - tSh + .6)); if (su > 0) { const yb = seedY - 100, yt = lerp(yb, Y(-260), eio(su)); o += `<path d="M960 ${n2(seedY + 40)} L960 ${n2(yt + 40)}" stroke="#B8C870" stroke-width="80" stroke-linecap="round"/><path d="M940 ${n2(seedY)} L940 ${n2(yt + 60)}" stroke="#D8E49A" stroke-width="18" stroke-linecap="round" opacity=".7"/>`
      + `<path d="M960 ${n2(yt + 40)} q0 -70 70 -80" fill="none" stroke="#B8C870" stroke-width="${n2(80 * (1 - ss(tLi, tLi + 1, t)) + 1)}" stroke-linecap="round"/>`; }
  // your first leaves: soft and red, they open and frame the view (left and right)
  const lv = ss(tLv - .2, tLv + 1.6, t); if (lv > .01) { const [fc, lc] = leafC(1); o += [-1, 1].map((sd) => `<g transform="translate(${960 + sd * 60} ${n2(Y(-180))}) rotate(${n2(sd > 0 ? lerp(-80, -10, lv) : lerp(-100, -170, lv))}) scale(${n2(lerp(.5, 9, lv))})">${leaf15(70, 18, fc, lc)}</g>`).join(""); }
  // grains drifting in the light, dust in the beam
  return o + `<rect width="1920" height="1080" fill="#0A0604" opacity="${n2(.35 * (1 - ss(tSh + 1, tLi + .5, t)))}"/>`; }
// the book's strip on two lines when long (cream, dark text, read aloud: each word appears as it is said; highlighter on o.keys). origin: top y
function strip15(t, id, text, y = 200, o = {}) { const L = TL.lines[id], size = o.size || 48, fam = "Atkinson Hyperlegible", maxW = o.maxW || 1640, sp = tw(" ", size, 700, fam), toks = text.split(" ");
  const lines = []; let cur = []; for (const w of toks) { const tr = [...cur, w].join(" "); if (cur.length && tw(tr, size, 700, fam) > maxW) { lines.push(cur); cur = [w]; } else cur.push(w); } lines.push(cur);
  const W_ = Math.max(...lines.map((l) => tw(l.join(" "), size, 700, fam))), lh = size * 1.3, H = lines.length * lh + size * .6, x0 = (o.x || 960) - W_ / 2, t0 = L.words[0].a - .3, a0 = ramp(t, t0, .3) * (1 - ramp(t, o.t1 === undefined ? 1e9 : o.t1, .25)); if (a0 <= 0) return "";
  let tx = "", k = 0; lines.forEach((ln, j) => { let cx = 0; const yy = y + size * .3 + j * lh + size * .9; ln.forEach((w) => { const wt = (L.words[k] || L.words[L.words.length - 1]).a, a = ramp(t, wt - .05, .15); k++;
      if (a > 0 && (o.keys || []).includes(norm(w))) tx += `<rect x="${n2(x0 + cx - 5)}" y="${n2(yy - size * .42)}" width="${n2(eo((t - wt) / .35) * (tw(w, size, 700, fam) + 10))}" height="${n2(size * .5)}" rx="6" fill="#FFD75A"/>`;
      if (a > 0) tx += `<text x="${n2(x0 + cx)}" y="${n2(yy)}" font-family="${fam}" font-weight="700" font-size="${size}" fill="${P.ink}" opacity="${n2(a)}">${esc(w)}</text>`; cx += tw(w, size, 700, fam) + sp; }); });
  return OP(a0, `<g filter="url(#dropS)"><rect x="${n2(x0 - 44)}" y="${y}" width="${n2(W_ + 88)}" height="${n2(H)}" rx="20" fill="url(#gPaper)"/><rect x="${n2(x0 - 44)}" y="${y}" width="14" height="${n2(H)}" rx="7" fill="${P.sun}"/></g>` + tx); }
