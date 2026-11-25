// props.js: EP1's drawn things and places in the approved look (kit/style.js palette; shapes after frames/frames.js and short1/film/props.js).
// Pure functions of their arguments. Backgrounds in BG are static and are baked to PNG by bake.js.
const XDEFS = () => `
  ${rg("xRoom", [[0, "#5A3F9E"], [.5, "#2B1F6B"], [1, "#120E2E"]], .5, .42, .8)}${lg("xGlass", [[0, "#BFE6FF", .2], [.5, "#fff", .04], [1, "#BFE6FF", .16]], 1, 1)}
  ${rg("xStage", [[0, "#4A36B0"], [.55, "#251B5C"], [1, "#120E2E"]], .5, .42, .75)}${lg("xFloor", [[0, "#3B2A8C", 0], [1, "#0D0A24", .9]])}
  ${lg("xWorm", [[0, "#F2CB8A"], [1, "#C9924E"]])}${lg("xCarrot", [[0, "#FFB05A"], [1, "#F27A1E"]])}${lg("xBean", [[0, "#9CC46A"], [1, "#5E8F3A"]], 1, 1)}
  ${lg("xDish", [[0, "#EAF4FF"], [1, "#B9C8E6"]])}${rg("xWin", [[0, "#3B2A8C"], [1, "#1A1340"]])}${lg("gPurple", [[0, "#B592FF"], [1, "#7C4DE8"]])}${lg("gGreen", [[0, "#6FD98A"], [1, "#2FA65A"]])}
  ${lg("xLedge", [[0, "#FBF3FF"], [1, "#CFC3EC"]])}${lg("xLiner", [[0, "#F4E3C3"], [1, "#D9BC8E"]])}${lg("xCloth", [[0, "#FF8FB1"], [1, "#E0607F"]])}${lg("xStem", [[0, "#7ED07A"], [1, "#CFE9B4"]])}
  ${lg("xCotton", [[0, "#FFFFFF"], [1, "#DCE6F5"]])}${lg("xPaw", [[0, "#F4F1FA"], [1, "#CFC8E0"]])}
  <linearGradient id="gSunU" gradientUnits="userSpaceOnUse" x1="-200" y1="0" x2="200" y2="0"><stop offset="0" stop-color="#FFB52E"/><stop offset="1" stop-color="#FFE27A"/></linearGradient>
  <filter id="rimB" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="0" stdDeviation="4" flood-color="#FFE9A8" flood-opacity=".8"/></filter>
  <filter id="rimS" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="0" stdDeviation="3" flood-color="#FFE9A8" flood-opacity=".9"/></filter>
  <filter id="glowS" x="-60%" y="-60%" width="220%" height="220%"><feDropShadow dx="0" dy="0" stdDeviation="12" flood-color="#FFC83A" flood-opacity=".95"/></filter>
  <clipPath id="bfW"><rect x="-80" y="-40" width="1330" height="940"/></clipPath><clipPath id="rmW"><rect x="330" y="150" width="760" height="470" rx="14"/></clipPath>
  <clipPath id="xBoxC"><rect x="360" y="230" width="1200" height="640" rx="30"/></clipPath>${typeof XDEFS2 === "function" ? XDEFS2() : ""}`;

/* ---------- the wind-up robot (short1's rig). Origin = the floor between its feet. ---------- */
function robotRig(o = {}) {
  const { liftL = 0, liftR = 0, slideL = 0, slideR = 0, rock = 0, bob = 0, head = 0, ant = 0, arm = 0, key = 0, sy = 1, blink = 0, win = 0, coil = 0 } = o;
  const L = "#147A72", sx = 1 / Math.sqrt(sy), c = Math.cos(key), eyeH = 22 * (1 - .9 * blink), n = n2;
  const wing = (sgn) => `<ellipse cx="46" cy="${n(sgn * 20 * c)}" rx="15" ry="${n(3.5 + 16.5 * Math.abs(c))}"/>`;
  const foot = (x, lift, slide) => `<rect x="${n(x + slide)}" y="${n(60 - lift * 16)}" width="36" height="34" rx="10" fill="#FF8A66" stroke="#C4502E" transform="rotate(${n(-lift * 7)} ${n(x + slide + 18)} 94)"/>`;
  let panel;
  if (win > .01) { const u = clamp(coil), turns = lerp(4.6, 2.1, u), r1 = lerp(15, 21, u); let d = "";
    for (let i = 0; i <= 70; i++) { const k = i / 70, a = k * turns * Math.PI * 2 + .6, r = 3 + (r1 - 3) * Math.pow(k, lerp(1, .8, u)); d += `${i ? "L" : "M"}${n(Math.cos(a) * r - u * 2)} ${n(Math.sin(a) * r * lerp(1, .88, u) + u * 3)}`; }
    panel = `<rect x="-40" y="-18" width="80" height="50" rx="12" fill="#fff" opacity="${n(.9 * (1 - win))}"/>
      <g transform="translate(0 7) scale(${n(clamp(win))})"><rect x="-44" y="-30" width="88" height="60" rx="16" fill="url(#xWin)" stroke="#EEF2FA" stroke-width="5"/>
      <path d="${d}" fill="none" stroke="#7F89A8" stroke-width="6.5" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="#EEF2FA" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="${n(-u * 2)}" cy="${n(u * 3)}" r="4.5" fill="${P.sun}"/><path d="M-34 -22 L-12 -22 L-30 14 L-34 14z" fill="#fff" opacity=".16"/></g>`;
  } else panel = `<rect x="-40" y="-18" width="80" height="50" rx="12" fill="#fff" opacity=".9"/><circle cx="-20" cy="7" r="9" fill="${P.coral}"/><circle cx="4" cy="7" r="9" fill="${P.sun}"/><rect x="20" y="-6" width="12" height="26" rx="4" fill="${P.blue}"/>`;
  return `<g transform="translate(0 -94)">
    <g stroke="${L}" stroke-width="5" stroke-linejoin="round">${foot(-46, liftL, slideL)}${foot(10, liftR, slideR)}</g>
    <g transform="translate(0 ${n(94 - bob)}) rotate(${n(rock)}) scale(${n(sx)} ${n(sy)}) translate(0 -94)">
      <g transform="translate(64 -10)"><rect x="0" y="-7" width="30" height="14" rx="5" fill="url(#gMetal)" stroke="#7F89A8" stroke-width="4"/>
        <g fill="url(#gSun)" stroke="#C98200" stroke-width="4" stroke-linejoin="round">${wing(-1)}${wing(1)}</g></g>
      <g stroke="${L}" stroke-width="5" stroke-linejoin="round">
        <rect x="-86" y="-22" width="26" height="56" rx="12" fill="url(#gMetal)" stroke="#7F89A8" transform="rotate(${n(arm)} -73 -16)"/>
        <rect x="-62" y="-38" width="124" height="106" rx="24" fill="url(#gBot)"/></g>
      ${panel}
      <g transform="rotate(${n(head)} 0 -44)">
        <g transform="rotate(${n(ant)} 0 -128)"><path d="M0-128 v-22" stroke="#7F89A8" stroke-width="5" stroke-linecap="round"/><circle cx="0" cy="-158" r="11" fill="${P.coral}" stroke="#C4502E" stroke-width="4"/><circle cx="-3" cy="-161" r="3" fill="#fff" opacity=".6"/></g>
        <rect x="-52" y="-128" width="104" height="80" rx="22" fill="url(#gBot)" stroke="${L}" stroke-width="5"/>
        <rect x="-38" y="-112" width="76" height="46" rx="14" fill="${P.ink}"/>
        <rect x="-26" y="${n(-89 - eyeH / 2)}" width="18" height="${n(eyeH)}" rx="${n(Math.min(6, eyeH / 2))}" fill="#FFE27A"/><rect x="8" y="${n(-89 - eyeH / 2)}" width="18" height="${n(eyeH)}" rx="${n(Math.min(6, eyeH / 2))}" fill="#FFE27A"/>
        <path d="M-40-118 q40-12 80 0" stroke="#fff" stroke-width="6" stroke-linecap="round" fill="none" opacity=".45"/></g>
    </g></g>`;
}
// the robot walking: phase p (steps so far, fractional), amp 0..1 (how lively). Each whole step is a foot landing.
// FACES: none (seen from the front or above; checked on a still, 2026-11-25)
function robotWalk(p, amp = 1, extra = {}) { const f = p % 1, odd = Math.floor(p) % 2, up = Math.sin(Math.PI * f) * amp;
  return robotRig({ liftL: odd ? 0 : up, liftR: odd ? up : 0, slideL: odd ? -6 * amp : 6 * amp * (f - .5), slideR: odd ? 6 * amp * (f - .5) : -6 * amp, rock: (odd ? 1 : -1) * 3.2 * Math.cos(Math.PI * f) * amp, bob: 4 * Math.abs(Math.sin(Math.PI * f)) * amp,
    head: (odd ? -1 : 1) * 2.5 * Math.sin(Math.PI * f) * amp, ant: (odd ? -1 : 1) * 9 * Math.cos(Math.PI * f) * amp, arm: (odd ? 1 : -1) * 22 * Math.cos(Math.PI * f) * amp, key: p * 1.9, ...extra }); }

// a mealworm: soft segments along a gentle curve. bend: -1..1; origin = its middle on the ground
function mealworm(bend = .25, len = 150) { let s = ""; const N = 10, n = n2;
  for (let i = 0; i < N; i++) { const k = i / (N - 1) - .5, x = k * len, y = -12 - Math.sin((k + .5) * Math.PI) * 10 * bend - Math.abs(k) * 6 * Math.abs(bend), r = 13 - Math.abs(k) * 7;
    s += `<ellipse cx="${n(x)}" cy="${n(y)}" rx="${n(len / N * .68)}" ry="${n(r)}" fill="url(#xWorm)" stroke="#9A6A2E" stroke-width="3.5"/>`; }
  return s + `<circle cx="${n(len / 2 - 4)}" cy="${n(-14 - 3 * Math.abs(bend))}" r="2.6" fill="${P.ink}"/><path d="M${n(-len / 2 + 14)} -21 q${n(len / 2 - 14)} -9 ${n(len - 28)} 0" stroke="#fff" stroke-width="4" stroke-linecap="round" fill="none" opacity=".4"/>`; }
function oats() { const r = rndm(7); let fl = ""; for (let i = 0; i < 26; i++) { const x = -92 + r() * 184, y = -20 - r() * 16 * (1 - Math.abs(x) / 110); fl += `<ellipse cx="${n2(x)}" cy="${n2(y)}" rx="${n2(9 + r() * 5)}" ry="${n2(4 + r() * 2)}" fill="${["#F3DDB0", "#E8C98E", "#FBEBC8"][i % 3]}" stroke="#C9A566" stroke-width="2" transform="rotate(${n2(r() * 60 - 30)} ${n2(x)} ${n2(y)})"/>`; }
  return `<ellipse cx="0" cy="-2" rx="128" ry="20" fill="${P.ink}" opacity=".25" filter="url(#b4)"/><path d="M-120 -24 Q-110 4 -70 6 H70 Q110 4 120 -24z" fill="url(#xDish)" stroke="#7F89A8" stroke-width="5" stroke-linejoin="round"/>${fl}<path d="M-108 -14 Q-100 0 -70 1" stroke="#fff" stroke-width="5" stroke-linecap="round" fill="none" opacity=".6"/>`; }
function carrot(bites = 0, id = "cb") { const cut = [[52, -34, 23], [30, -58, 19], [-50, -40, 20]].slice(0, bites).map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#000"/>`).join("");
  return `<mask id="${id}"><rect x="-90" y="-110" width="180" height="130" fill="#fff"/>${cut}</mask>
    <g mask="url(#${id})"><ellipse cx="0" cy="-22" rx="66" ry="30" fill="#D9620F" stroke="#B4500C" stroke-width="5"/><ellipse cx="0" cy="-34" rx="66" ry="30" fill="url(#xCarrot)" stroke="#B4500C" stroke-width="5"/>
    <ellipse cx="0" cy="-34" rx="38" ry="16" fill="#FFC982" opacity=".8"/><path d="M0 -34 L-40 -44 M0 -34 L34 -50 M0 -34 L30 -20 M0 -34 L-28 -20" stroke="#FFE0B0" stroke-width="3" opacity=".7"/>
    <path d="M-46 -50 q40 -16 86 -2" stroke="#fff" stroke-width="5" stroke-linecap="round" fill="none" opacity=".45"/></g>`; }
// the mealworm's dish: oats, a carrot slice, the mealworm. o: bites, wx (worm x), wl (worm length), wb (bend)
function wormDish(o = {}) { const { bites = 0, wx = -40, wl = 76, wb = .3, id = "cb" } = o;
  return oats() + TF(62, -18, .52, carrot(bites, id)) + TF(wx, -26, 1, mealworm(wb, wl)); }
// a green bean (mung bean) seed. fat: 0..1 swollen with water; split: 0..1 the skin opens
function beanSeed(fat = 0, split = 0) { const k = 1 + .14 * fat;
  return `<g transform="scale(${n2(k)})"><ellipse cx="0" cy="-34" rx="56" ry="38" fill="url(#xBean)" stroke="#3F6A28" stroke-width="5" transform="rotate(-12 0 -34)"/>
    <rect x="-9" y="-50" width="20" height="9" rx="4.5" fill="#F3F6DC" stroke="#3F6A28" stroke-width="2.5" transform="rotate(-12 0 -34)"/><path d="M-36 -52 q20 -16 46 -12" stroke="#fff" stroke-width="6" stroke-linecap="round" fill="none" opacity=".45"/>
    ${split > 0 ? `<path d="M${n2(20 - 34 * split)} ${n2(-8 - 16 * split)} Q26 -2 ${n2(30 + 16 * split)} ${n2(-6 - 22 * split)}" fill="none" stroke="#F6F8E4" stroke-width="${n2(3 + 7 * split)}" stroke-linecap="round"/>` : ""}</g>`; }
// wet cotton wool in a small dish; origin = centre of the dish bottom
function cottonDish() { const r = rndm(3); let puffs = ""; for (let i = 0; i < 9; i++) { const x = -78 + i * 19.5; puffs += `<circle cx="${n2(x)}" cy="${n2(-26 - r() * 6)}" r="${n2(15 + r() * 6)}" fill="url(#xCotton)"/>`; }
  return `<ellipse cx="0" cy="-2" rx="112" ry="16" fill="${P.ink}" opacity=".25" filter="url(#b4)"/><path d="M-104 -22 Q-96 4 -62 6 H62 Q96 4 104 -22z" fill="url(#xDish)" stroke="#7F89A8" stroke-width="5" stroke-linejoin="round"/>
   <g stroke="#B9C8E6" stroke-width="2.5">${puffs}</g><ellipse cx="-30" cy="-34" rx="8" ry="4" fill="#BFE6FF" opacity=".9"/><ellipse cx="44" cy="-30" rx="6" ry="3" fill="#BFE6FF" opacity=".9"/>`; }
// one bean leaf (pointed oval), base at origin pointing right
const bleaf = (L, lit) => `<path d="M0 0 C${n2(L * .3)} ${n2(-L * .42)} ${n2(L * .8)} ${n2(-L * .3)} ${n2(L)} 0 C${n2(L * .8)} ${n2(L * .28)} ${n2(L * .3)} ${n2(L * .36)} 0 0z" fill="url(#${lit ? "gLeafLit" : "gLeaf"})" stroke="#1F7F47" stroke-width="3.5" stroke-linejoin="round"/><path d="M0 0 L${n2(L * .82)} 0" stroke="#D8F6C8" stroke-width="2.2" opacity=".8"/>`;
/* the green bean growing on its cotton wool. day: 1..30 (fractional is fine). Origin = centre of the dish bottom.
   A drawn story (the script: "follows how green beans normally grow"; to be corrected against a real box):
   day 1 seed · day 2 a little fatter · day 3 the skin splits, a root goes down · day 5 a shoot with two leaves · day 10 a small plant ·
   day 14 taller · day 30 a tall young plant. maxH = room under the lid (the top leaves press against it). */
function beanPlant(day, o = {}) { const maxH = o.maxH || 560, sway = o.sway || 0;
  const hgt = day < 3.3 ? 0 : day < 5 ? lerp(0, 96, eio((day - 3.3) / 1.7)) : day < 10 ? lerp(96, 170, (day - 5) / 5) : day < 14 ? lerp(170, 240, (day - 10) / 4) : lerp(240, 600, eo((day - 14) / 16) * .92 + .08 * (day - 14) / 16);
  const h = Math.min(hgt, maxH), press = clamp((hgt - maxH) / 60);
  let s = cottonDish();
  if (o.ghost) return s;
  const fat = clamp(day - 1), split = clamp((day - 2.6) / .5), root = clamp((day - 2.8) / .8);
  if (h < 30) { // the seed lying on the cotton
    s += TF(0, -30, .42, (root > 0 ? `<path d="M22 -10 Q${n2(34 + 6 * root)} ${n2(10 * root)} ${n2(26 - 4 * root)} ${n2(40 * root)}" fill="none" stroke="#FBFBEF" stroke-width="13" stroke-linecap="round"/><path d="M22 -10 Q${n2(34 + 6 * root)} ${n2(10 * root)} ${n2(26 - 4 * root)} ${n2(40 * root)}" fill="none" stroke="#D9DDBB" stroke-width="3" stroke-linecap="round" opacity=".5"/>` : "") + beanSeed(fat, split));
    if (h <= 0) return s; }
  // the shoot
  const lean = (o.lean || 0) + sway, tx = lean * h * .012, st = `M0 -30 C${n2(-8 - tx * .2)} ${n2(-30 - h * .4)} ${n2(10 + tx * .6)} ${n2(-30 - h * .7)} ${n2(tx)} ${n2(-30 - h)}`;
  s += `<path d="${st}" fill="none" stroke="#2C9A55" stroke-width="${n2(clamp(6 + h / 60, 6, 13))}" stroke-linecap="round"/><path d="${st}" fill="none" stroke="#9BE08F" stroke-width="${n2(clamp(2 + h / 150, 2, 5))}" stroke-linecap="round" opacity=".7"/>`;
  if (h < 240) { const cy = -30 - h * .42, co = clamp(1 - (h - 150) / 80);   // the two seed halves low on the stem (they shrink away as the plant uses them)
    if (co > 0) s += `<g opacity="${n2(co)}"><ellipse cx="-13" cy="${n2(cy)}" rx="13" ry="8" fill="#DDE9A8" stroke="#8FA85A" stroke-width="3" transform="rotate(-28 -13 ${n2(cy)})"/><ellipse cx="14" cy="${n2(cy - 2)}" rx="13" ry="8" fill="#DDE9A8" stroke="#8FA85A" stroke-width="3" transform="rotate(26 14 ${n2(cy - 2)})"/></g>`; }
  const open = clamp(h / 96), L1 = lerp(14, 78, clamp(h / 170)) * lerp(1, 1.25, clamp((h - 240) / 300));
  // leaf pairs up the stem (every 130 px once it is tall), then the top pair
  if (h > 250) for (let y = 150, i = 0; y < h - 70; y += 130, i++) { const u = y / h, px = tx * u * u, py = -30 - y, L = L1 * (1.15 - .12 * i), dr = 8 + i * 3;
    s += `<g transform="translate(${n2(px)} ${n2(py)})"><g transform="rotate(${-158 + dr})">${bleaf(L, i % 2 === 0)}</g><g transform="rotate(${-22 - dr})">${bleaf(L, i % 2 === 1)}</g></g>`; }
  const a = lerp(80, 24, open) - press * 26;
  s += `<g transform="translate(${n2(tx)} ${n2(-30 - h)})"><g transform="rotate(${n2(-180 + a)})">${bleaf(L1, true)}</g><g transform="rotate(${n2(-a)})">${bleaf(L1, false)}</g>${h > 250 && press < .05 ? `<g transform="rotate(-90) scale(.5)">${bleaf(L1, true)}</g>` : ""}</g>`;
  return s; }
// the potted plant (a money plant; kit leaf shape). lean: degrees towards the window (left); nu: 0..1 new leaves unrolled (two of them: nu 0..1 = first, 1..2 = second); droop 0..1
function potPlant(o = {}) { const { lean = 0, nu = 0, droop = 0, sway = 0 } = o; const wet = o.wet === undefined ? 1 : o.wet, soilC = o.soil === false ? "" : `<ellipse cx="0" cy="-80" rx="66" ry="17" fill="${wet > .5 ? "#5A3A28" : "#D8BE96"}" stroke="${wet > .5 ? "#3A2420" : "#B0946A"}" stroke-width="4"/>` + (wet > .5 ? `<ellipse cx="-20" cy="-86" rx="22" ry="5" fill="#8CC8FF" opacity="${n2(.55 * (o.shine === undefined ? 0 : o.shine))}"/>` : `<path d="M-40 -84 l14 6 l10 -5 M12 -88 l10 7 l16 -3 M-8 -74 l8 -6" stroke="#A88A5E" stroke-width="3" fill="none" stroke-linecap="round"/>`);
  const stems = [[-96, -30, 30, 40], [96, -80, 34, -70], [-36, -160, 42, 150], [20, -170, 44, 190], [104, 10, 34, -34], [-60, -96, 38, 60]]; let st = "", lv = "";
  stems.forEach(([x, y, r, a], i) => { const hh = -y + 60, k = hh / 230, ex = x - lean * 3.2 * k + sway * k * 4 + droop * (x < 0 ? -1 : 1) * 46 * k, ey = y + droop * (90 * k + 40) + lean * .5 * k;
    st += `<path d="M${n2(x * .1)} -60 Q${n2(x * .5 - lean * k)} ${n2(y * .9 - 30 + droop * 20)} ${n2(ex)} ${n2(ey)}"/>`;
    lv += `<g transform="translate(${n2(ex)} ${n2(ey)}) rotate(${n2(a - lean * .9 + droop * (x < 0 ? -62 : 62) + (droop ? (a > 100 ? (180 - a) * droop * .9 : 0) : 0))})">${leaf(r, i % 2 === 0)}</g>`; });
  // the new leaves: they unroll (scale up from a thin roll) on the window side
  const nl = (u, x, y, a, r) => u <= 0 ? "" : (() => { const ex = x - lean * 3.4, ey = y + droop * 110; st += `<path d="M-4 -60 Q${n2(ex * .4)} ${n2(y * .8)} ${n2(ex)} ${n2(ey)}"/>`; return `<g transform="translate(${n2(ex)} ${n2(ey)}) rotate(${n2(a - lean + droop * -60)}) scale(${n2(lerp(.18, 1, eio(u)))} ${n2(lerp(.5, 1, eio(u)))})">${leaf(r, true).replace(/url\(#gLeafLit\)/g, "#B9EE7A")}</g>`; })();
  const n1 = nl(clamp(nu), -70, -214, 128, 34), n2_ = nl(clamp(nu - 1), 64, -232, 200, 32);
  return soilC + `<g fill="none" stroke="#2C9A55" stroke-width="7" stroke-linecap="round">${st}</g>${lv}${n1}${n2_}
  <path d="M-62-62 H62 L48 56 Q0 70 -48 56z" fill="url(#gPot)" stroke="#9C4423" stroke-width="5" stroke-linejoin="round"/><rect x="-72" y="-78" width="144" height="30" rx="12" fill="url(#gPot)" stroke="#9C4423" stroke-width="5"/>
  <path d="M-58-70 h60" stroke="#fff" stroke-width="6" stroke-linecap="round" opacity=".35"/>`; }
const pebble = () => `<path d="M-80 40 Q-96-10 -50-40 Q-10-70 40-48 Q92-24 84 40z" fill="#A9A6C4" stroke="#6E6A92" stroke-width="5" stroke-linejoin="round"/><path d="M-50-30 Q-10-56 34-40" stroke="#fff" stroke-width="7" stroke-linecap="round" fill="none" opacity=".45"/><path d="M10-10 l24 18 M-30 6 l-14 16" stroke="#6E6A92" stroke-width="4" stroke-linecap="round" opacity=".6"/>`;
// the teddy bear keychain: the kit's teddy with a small ring and chain. Origin = its seat on the ground (teddy() is centred on its body)
const teddyKey = () => `<g transform="translate(0 -88)"><path d="M0 -132 q4 -16 18 -22" stroke="#AAB3CC" stroke-width="5" fill="none" stroke-linecap="round"/><circle cx="30" cy="-166" r="15" fill="none" stroke="#AAB3CC" stroke-width="6"/>${teddy()}</g>`;
const teddyBig = () => `<g transform="translate(0 -88)">${teddy()}</g>`;
// a buddy paw reaching down (origin = the paw pad; the arm goes up out of frame). kind 0 = Momo (tabby stripes), 1 = Pip (plain lavender-grey), 2 = Basil (pale, small scales)
const paw = (col = "#D9D4EA", line = "#A9A2C4", kind = 1) => { let det = "";
  if (kind === 0) for (let y = -90; y > -620; y -= 70) det += `<path d="M-30 ${y} q30 16 60 0" stroke="#A9A6BE" stroke-width="9" fill="none" stroke-linecap="round" opacity=".7"/>`;
  if (kind === 2) for (let y = -70; y > -620; y -= 44) det += `<circle cx="${(y / 44) % 2 ? -12 : 12}" cy="${y}" r="6" fill="#B9C6BE" opacity=".7"/>`;
  return `<path d="M-30 -640 Q-40 -300 -32 -30 H32 Q40 -300 30 -640z" fill="${col}" stroke="${line}" stroke-width="5" stroke-linejoin="round"/>${det}<path d="M-18 -640 Q-24 -300 -18 -40" stroke="#fff" stroke-width="8" stroke-linecap="round" fill="none" opacity=".5"/>
  <ellipse cx="0" cy="-8" rx="48" ry="40" fill="${col}" stroke="${line}" stroke-width="5"/><ellipse cx="-12" cy="-22" rx="20" ry="10" fill="#fff" opacity=".5"/><path d="M-18 14 v13 M0 18 v14 M18 14 v13" stroke="${line}" stroke-width="4.5" stroke-linecap="round"/>`; };
// "no" icons for "it does not need water, food or air"
function needIcon(kind, col = "#6E6A92", fill = "#C9D2E8") { const g = col; return kind === "water" ? `<path d="M0 -30 C18 -6 22 6 22 14 a22 22 0 0 1 -44 0 C-22 6 -18 -6 0 -30z" fill="${fill}" stroke="${g}" stroke-width="5" stroke-linejoin="round"/><path d="M-10 12 q2 10 12 12" stroke="#fff" stroke-width="4" stroke-linecap="round" fill="none"/>`
  : kind === "food" ? `<path d="M-30 -2 H30 Q28 26 0 28 Q-28 26 -30 -2z" fill="${fill}" stroke="${g}" stroke-width="5" stroke-linejoin="round"/><path d="M-24 -4 Q-14 -26 0 -24 Q14 -26 24 -4" fill="#fff" stroke="${g}" stroke-width="5" stroke-linejoin="round"/><path d="M-10 -12 l3 -3 M2 -15 l3 3 M12 -10 l3 -3" stroke="${g}" stroke-width="3" stroke-linecap="round"/>`
  : kind === "air" ? `<g fill="none" stroke="${g}" stroke-width="6" stroke-linecap="round"><path d="M-30 -12 H8 a10 10 0 1 0 -10 -10"/><path d="M-30 4 H20 a11 11 0 1 1 -11 11"/><path d="M-30 20 H-6"/></g>`
  : kind === "grow" ? `<path d="M0 30 V-4" stroke="${g}" stroke-width="6" stroke-linecap="round"/><path d="M0 -2 C-26 -30 -40 -8 -30 6 C-18 12 -6 6 0 -2z M0 -8 C22 -38 42 -16 32 0 C20 8 6 2 0 -8z" fill="${fill}" stroke="${g}" stroke-width="5" stroke-linejoin="round"/>`
  : kind === "respond" ? `<circle r="15" fill="${fill}" stroke="${g}" stroke-width="5"/><g stroke="${g}" stroke-width="5" stroke-linecap="round"><path d="M0 -24 v-9 M0 24 v9 M-24 0 h-9 M24 0 h9 M-17 -17 l-6 -6 M17 -17 l6 -6 M-17 17 l-6 6 M17 17 l6 6"/></g>`
  : `<circle cx="-14" cy="8" r="17" fill="${fill}" stroke="${g}" stroke-width="5"/><circle cx="18" cy="-8" r="11" fill="${fill}" stroke="${g}" stroke-width="5"/><circle cx="22" cy="20" r="8" fill="${fill}" stroke="${g}" stroke-width="5"/>`; }
const iconChip = (kind, o = {}) => `<g filter="url(#dropS)"><circle r="50" fill="${P.paper}"/></g>${needIcon(kind, o.col, o.fill)}`;
// a small house lizard (the hidden one): rounder head, small eyes, a curled tail, a soft rim light so children can find it. Origin = its middle, head up-right
const cicak = (col = "#C9B79C", line = "#6E5F4E") => `<g filter="url(#rimS)"><g stroke="${line}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round">
  <path d="M-26 12 Q-56 26 -66 6 Q-72 -12 -56 -16 Q-46 -18 -44 -8" fill="none" stroke="${col}" stroke-width="12"/><path d="M-26 12 Q-56 26 -66 6 Q-72 -12 -56 -16 Q-46 -18 -44 -8" fill="none" stroke="${line}" stroke-width="15" opacity=".0"/>
  <g fill="${col}"><path d="M16 -16 l6 -20 M24 6 l18 12 M-14 -6 l-8 -20 M-8 14 l8 18" stroke="${col}" stroke-width="9" fill="none"/>
  <circle cx="23" cy="-38" r="6"/><circle cx="44" cy="20" r="6"/><circle cx="-23" cy="-28" r="6"/><circle cx="1" cy="34" r="6"/>
  <ellipse cx="0" cy="0" rx="36" ry="15" transform="rotate(-20)"/><ellipse cx="42" cy="-19" rx="21" ry="17" transform="rotate(-20 42 -19)"/></g></g>
  <ellipse cx="-2" cy="-3" rx="22" ry="6" fill="#fff" opacity=".28" transform="rotate(-20)"/>
  <circle cx="47" cy="-27" r="5.2" fill="#2B2147"/><circle cx="52" cy="-13" r="4.6" fill="#2B2147"/><circle cx="48.5" cy="-28.5" r="1.8" fill="#fff"/><circle cx="53.5" cy="-14.5" r="1.6" fill="#fff"/>
  <path d="M56 -22 q5 4 3 9" fill="none" stroke="${line}" stroke-width="2.5" stroke-linecap="round"/></g>`;
// OUR BOX, small (the void deck, the end shot): the same clear box as on the window ledge: glass sides, the teal lid with its air holes, a handle,
// a label. Origin = the middle of its bottom edge; 260 wide, 150 tall. inner = svg drawn inside (behind the glass). lid: 0 = off, 1 = on; lidY = lift
function ourBox(inner = "", o = {}) { const lid = o.lid === undefined ? 1 : o.lid, ly = o.lidY || 0; let holes = ""; for (let i = 0; i < 6; i++) holes += `<ellipse cx="${-100 + i * 40}" cy="-163" rx="8" ry="4.5" fill="${P.night}" opacity=".75"/>`;
  return `<ellipse cx="0" cy="4" rx="150" ry="14" fill="${P.ink}" opacity=".28" filter="url(#b4)"/><rect x="-130" y="-150" width="260" height="150" rx="12" fill="#EAF6FF" opacity=".5"/><rect x="-130" y="-24" width="260" height="24" rx="8" fill="url(#xLiner)"/>${inner}
  <rect x="-130" y="-150" width="260" height="150" rx="12" fill="url(#xGlass)"/><rect x="-130" y="-150" width="260" height="150" rx="12" fill="none" stroke="#F4FAFF" stroke-width="6"/><path d="M-112 -134 L-78 -134 L-104 -20 L-112 -20z" fill="#fff" opacity=".4"/>
  <g transform="translate(60 -66) rotate(-4)"><rect x="-52" y="-18" width="104" height="36" rx="8" fill="${P.paper}" stroke="${P.sunDeep}" stroke-width="3"/>${T(0, 8, "OUR BOX", 21, P.ink, { ls: 1 })}</g>
  ${lid ? `<g transform="translate(0 ${n2(ly)})" opacity="${n2(lid)}"><path d="M-36 -176 q0 -26 36 -26 q36 0 36 26" fill="none" stroke="#188A80" stroke-width="9" stroke-linecap="round"/><rect x="-142" y="-178" width="284" height="32" rx="12" fill="#3FD0C3" stroke="#188A80" stroke-width="4"/><rect x="-134" y="-174" width="268" height="9" rx="4.5" fill="#fff" opacity=".3"/>${holes}</g>` : ""}`; }
// a green pencil
const pencil = () => `<g transform="rotate(-24)"><rect x="-120" y="-16" width="200" height="32" rx="6" fill="#43BF6C" stroke="#1F8A4C" stroke-width="5"/><rect x="-120" y="-16" width="200" height="11" rx="5" fill="#fff" opacity=".28"/><path d="M80 -16 L128 0 L80 16z" fill="#F3D2AC" stroke="#B9774A" stroke-width="5" stroke-linejoin="round"/><path d="M112 -6 L128 0 L112 6z" fill="${P.ink}"/><rect x="-146" y="-16" width="30" height="32" rx="8" fill="#FF8FB1" stroke="#E0607F" stroke-width="5"/></g>`;

/* ---------- the 30-day box (16:9). The box: x 360..1560, y 230..870; things stand on the liner at y 800; the robot's lane is y 846. ---------- */
const BOX = { x: 360, y: 230, w: 1200, h: 640, floor: 800, lane: 846, plant: 455, robot0: 645, bean: 835, dish: 1045, robot1: 1172, pebble: 1282, teddy: 1455, rs: .8 };
function boxBack() { return `<ellipse cx="960" cy="892" rx="660" ry="30" fill="${P.ink}" opacity=".4" filter="url(#b10)"/>
  <g clip-path="url(#xBoxC)"><rect x="360" y="230" width="1200" height="640" fill="#E9F4FF" opacity=".16"/><ellipse cx="760" cy="470" rx="480" ry="250" fill="#FFF3B8" opacity=".22" filter="url(#b30)"/>
  <path d="M360 782 H1560 V870 H360z" fill="url(#xLiner)"/><path d="M360 782 H1560" stroke="#FFF3DC" stroke-width="6" opacity=".8"/><path d="M360 824 H1560" stroke="#C9A772" stroke-width="2" opacity=".35"/></g>`; }
function boxFront(o = {}) { const lid = o.lid === undefined ? 1 : o.lid, lidY = o.lidY || 0, lidR = o.lidR || 0; let holes = ""; for (let i = 0; i < 10; i++) holes += `<ellipse cx="${470 + i * 109}" cy="216" rx="17" ry="9" fill="${P.night}" opacity=".75"/>`;
  return `<rect x="360" y="230" width="1200" height="640" rx="30" fill="url(#xGlass)"/><rect x="360" y="230" width="1200" height="640" rx="30" fill="none" stroke="#E9F4FF" stroke-width="9" opacity=".85"/>
  <path d="M410 280 L560 280 L436 800 L410 800z" fill="#fff" opacity=".1"/><path d="M596 280 L636 280 L506 800 L468 800z" fill="#fff" opacity=".07"/>
  ${lid ? `<g transform="translate(0 ${n2(lidY)}) rotate(${n2(lidR)} 1560 230)" opacity="${n2(lid)}"><g filter="url(#dropS)"><rect x="336" y="186" width="1248" height="62" rx="24" fill="#3FD0C3"/><rect x="348" y="193" width="1224" height="17" rx="8.5" fill="#fff" opacity=".3"/></g>${holes}</g>` : ""}`; }
/* the six things at their places. st: { day, robotX, robot (svg, optional override), bites, wx, wl, wb, lean, nu, droop, sway, hide: {name: 1}, ghost: 0..1 (DAY 1 outlines), beanO }
   Each living thing can show its DAY 1 outline (style 7.6: time-lapse ghosts). */
function boxThings(st = {}) { const d = st.day || 1, hide = st.hide || {}, B = BOX; let s = "";
  const gh = (inner) => `<g opacity="${n2(st.ghost)}" filter="url(#ghostF)">${inner}</g>`;
  if (!hide.plant) s += TF(B.plant, B.floor - 72, 1.25, potPlant({ lean: st.lean || 0, nu: st.nu || 0, droop: st.droop || 0, sway: st.sway || 0 }));
  if (!hide.bean) s += TF(B.bean, B.floor, 1.05, beanPlant(d, { maxH: 478, sway: st.sway || 0, lean: st.blean || 0 }));
  if (!hide.dish) s += TF(B.dish, B.floor, 1.0, wormDish({ bites: st.bites || 0, wx: st.wx === undefined ? -40 : st.wx, wl: st.wl || 76, wb: st.wb === undefined ? .3 : st.wb, id: st.cid || "cb" }));
  if (!hide.pebble) s += TF(B.pebble, B.floor - 30, .8, pebble());
  if (!hide.teddy) s += TF(B.teddy, B.floor, .85, teddyKey());
  if (st.ghost) s += gh(TF(B.plant, B.floor - 72, 1.25, potPlant({})) + TF(B.bean, B.floor - 31, 1.05 * .42, beanSeed(0, 0)) + TF(B.dish - 40, B.floor - 26, 1.0, mealworm(.3, 76)) + TF(B.pebble, B.floor - 30, .8, pebble()) + TF(B.teddy, B.floor, .85, teddyKey()) + TF(st.robotX === undefined ? B.robot1 : st.robotX, B.lane, B.rs, robotRig({})));
  if (!hide.robot) s += TF(st.robotX === undefined ? B.robot0 : st.robotX, B.lane, B.rs, st.robot || robotRig({ blink: 0 }));
  return s; }
// the cloth over the box on Day 30; bump = how far something pushes it up (px)
function cloth(bump = 0, o = {}) { const bx = 760;
  return `<g filter="url(#drop)"><path d="M300 250 Q320 170 420 168 L${bx - 150} 166 Q${bx - 60} ${166 - bump * .2} ${bx} ${n2(160 - bump)} Q${bx + 60} ${166 - bump * .2} ${bx + 150} 166 L1500 168 Q1600 170 1622 250 L1650 900 Q1560 930 1480 900 Q1380 870 1280 902 Q1180 930 1080 900 Q980 872 880 902 Q780 930 680 900 Q580 872 480 902 Q380 930 272 900z" fill="url(#xCloth)"/></g>
  <g fill="#fff" opacity=".4">${Array.from({ length: 34 }, (_, i) => `<circle cx="${340 + (i % 9) * 150 + (Math.floor(i / 9) % 2) * 75}" cy="${290 + Math.floor(i / 9) * 160}" r="13"/>`).join("")}</g>
  <path d="M420 190 Q960 150 1500 190" stroke="#fff" stroke-width="10" stroke-linecap="round" fill="none" opacity=".3"/><path d="M640 300 Q660 600 620 880 M1240 300 Q1220 600 1270 880" stroke="#C4476A" stroke-width="6" fill="none" opacity=".35" stroke-linecap="round"/>`; }

/* ---------- places (static: baked) ---------- */
function hdbBlock(x, w, top, col, stripe, lit = 0) { let s = `<rect x="${x}" y="${top}" width="${w}" height="900" fill="${col}"/><rect x="${x}" y="${top}" width="${w}" height="14" fill="${stripe}"/><rect x="${x + w * .44}" y="${top - 26}" width="${w * .12}" height="30" fill="${col}"/>`;
  for (let y = top + 34; y < top + 800; y += 44) { s += `<rect x="${x + 8}" y="${y + 24}" width="${w - 16}" height="5" fill="#fff" opacity=".35"/>`;
    for (let c = 0; c < Math.floor(w / 40); c++) { const on = (c * 7 + y) % 5 < 2; s += `<rect x="${x + 14 + c * 40}" y="${y}" width="22" height="18" rx="3" fill="${on ? "#FFE9A8" : (lit ? "#2A2360" : "#7C6BB8")}" opacity="${lit ? (on ? .95 : .7) : .8}"/>`; } }
  return s; }
const BG = {};
// the view behind the box: the bedroom window (left) with the next block across the car park, the wall (right), the ledge the box stands on.
// mode: day | night | rain. Blurred far plane (style 4), one key light: the window.
BG.boxfar = (mode = "day") => { const night = mode === "night", rain = mode === "rain"; const r = rndm(17);
  const sky = night ? [[0, "#141B4D"], [1, "#2B2A6B"]] : rain ? [[0, "#8FA3C8"], [1, "#C9D3E6"]] : [[0, "#7FB7FF"], [.6, "#CFE6FF"], [1, "#FFE9C8"]];
  const wall = night ? [[0, "#1D1650"], [1, "#2A1F5E"]] : rain ? [[0, "#6E66B8"], [1, "#9C8FCB"]] : [[0, "#8E86E0"], [.7, "#C5B1EE"], [1, "#E6C4DA"]];
  let drops = ""; if (rain) for (let i = 0; i < 90; i++) { const x = r() * 1500 - 100, y = r() * 900; drops += `<path d="M${n2(x)} ${n2(y)} l-10 44" stroke="#EAF2FF" stroke-width="3" opacity="${n2(.25 + r() * .3)}" stroke-linecap="round"/>`; }
  return `<defs>${lg("bfSky", sky)}${lg("bfWall", wall)}</defs>
  <rect x="-200" y="-120" width="2320" height="1320" fill="url(#bfWall)"/>
  <g clip-path="url(#bfW)"><rect x="-80" y="-40" width="1330" height="940" fill="url(#bfSky)"/>
    ${night ? `<circle cx="1050" cy="150" r="54" fill="#FFF6D0" filter="url(#b4)"/><circle cx="1050" cy="150" r="130" fill="#BFD0FF" opacity=".25" filter="url(#b30)"/>` : rain ? "" : `<circle cx="120" cy="180" r="250" fill="#FFF3B8" opacity=".85" filter="url(#b60)"/>`}
    <g filter="url(#b4)" opacity="${night ? .9 : 1}">${hdbBlock(60, 300, 250, night ? "#3A2F78" : rain ? "#B79AA6" : "#E9A7A0", night ? "#6A4FB0" : "#FF8A66", night)}${hdbBlock(430, 240, 380, night ? "#33296E" : rain ? "#A99BBE" : "#D9B3D6", night ? "#5A46A8" : "#9B6BFF", night)}${hdbBlock(760, 330, 190, night ? "#3D3180" : rain ? "#BFA596" : "#F1B79A", night ? "#2A8F8A" : "#2EC4B6", night)}
      <path d="M-80 800 Q200 740 520 790 T1250 770 V900 H-80z" fill="${night ? "#1E4A4A" : rain ? "#5E9478" : "#57B77A"}"/></g>
    ${drops}<rect x="-80" y="-40" width="1330" height="940" fill="${night ? "#1B2A6B" : "#FFD9A0"}" opacity="${night ? .2 : rain ? 0 : .12}"/></g>
  <g filter="url(#b2)"><g fill="none" stroke="${night ? "#4B4390" : "#F7F1FF"}" stroke-width="26"><rect x="-80" y="-40" width="1330" height="940"/><path d="M370 -40 V900 M820 -40 V900"/></g>
  <g stroke="${night ? "#4B4390" : "#F7F1FF"}" stroke-width="8" opacity=".9"><path d="M-80 150 H1250 M-80 370 H1250 M-80 590 H1250"/></g></g>
  ${night ? "" : `<g style="mix-blend-mode:screen"><path d="M-80 -40 L700 -40 L1700 1100 L300 1100z" fill="#FFE27A" opacity="${rain ? .05 : .16}" filter="url(#b30)"/></g>`}
  <rect x="-200" y="872" width="2320" height="330" fill="${night ? "#3A3272" : "url(#xLedge)"}"/><rect x="-200" y="872" width="2320" height="8" fill="#fff" opacity="${night ? .15 : .7}"/>
  ${night ? `<rect x="-200" y="-120" width="2320" height="1320" fill="#120E2E" opacity=".25"/>` : ""}`; };
BG.boxfar_day = () => BG.boxfar("day"); BG.boxfar_night = () => BG.boxfar("night"); BG.boxfar_rain = () => BG.boxfar("rain");

// the dark game stage (lock-in, Mark Sentence, scoreboard)
BG.stage = () => { const r = rndm(9);
  return `<rect x="-200" y="-120" width="2320" height="1320" fill="url(#xStage)"/>
  <g opacity=".5">${Array.from({ length: 46 }, () => `<circle cx="${n2(r() * 1920)}" cy="${n2(r() * 760)}" r="${n2(1.5 + r() * 3)}" fill="#fff" opacity="${n2(.15 + r() * .4)}"/>`).join("")}</g>
  <g style="mix-blend-mode:screen" opacity=".55"><path d="M860-120 H1060 L1320 800 H600z" fill="#FFE9A8" opacity=".3" filter="url(#b30)"/></g>
  <rect x="-200" y="800" width="2320" height="400" fill="url(#xFloor)"/>`; };
// stage with bokeh (Mark Sentence card, frame e)
BG.stage2 = () => { const r = rndm(23);
  return BG.stage() + `<g filter="url(#b10)">${Array.from({ length: 14 }, () => `<circle cx="${n2(r() * 1920)}" cy="${n2(r() * 1000)}" r="${n2(30 + r() * 70)}" fill="${["#9B6BFF", "#3A8DFF", "#FFC83A", "#FF8FB1"][Math.floor(r() * 4)]}" opacity="${n2(.06 + r() * .1)}"/>`).join("")}</g>`; };
// a bright day stage (sky to cream) with soft clouds
BG.daystage = () => `<defs>${lg("dsSky", [[0, "#BFE6FF"], [.62, "#EAF6FF"], [1, "#FFF3DC"]])}${lg("dsFl", [[0, "#FFE7C2"], [1, "#F6CFA0"]])}</defs><rect x="-200" y="-120" width="2320" height="1320" fill="url(#dsSky)"/>
  <g fill="#fff" opacity=".8" filter="url(#b10)"><ellipse cx="300" cy="230" rx="260" ry="60"/><ellipse cx="1500" cy="170" rx="300" ry="64"/><ellipse cx="1050" cy="330" rx="200" ry="40"/></g>
  <circle cx="1640" cy="200" r="260" fill="#FFF3B8" opacity=".5" filter="url(#b60)"/>
  <rect x="-200" y="800" width="2320" height="400" fill="url(#dsFl)"/><rect x="-200" y="800" width="2320" height="10" fill="#fff" opacity=".6"/>`;
