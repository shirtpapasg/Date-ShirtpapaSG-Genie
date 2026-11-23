// garden15.js: EP15's Part 2 sets and props (Stage 2, drawn 2026-11-23). Loaded after home15.js.
// THE COMMUNITY GARDEN BG.garden15 (baked) + VG15(t, o, cam) live: the big OLD MANGO TREE (thick trunk, wide crown, sprays of tiny cream
//   flowers, small green mangoes, bunches of red new leaves at the tips, the weaver ants' leaf nest high up), our young plant in its pot on the
//   bench, clouds, a butterfly, a bird on the grass, the pond's ripples and its tadpoles, the weaver ant (Part 2's hidden animal) in a new spot
//   in every scene. weaverAnt (cute, orange, always moving), loopBoard (OUR MANGO'S LIFE CYCLE: three slots round a loop, arrows ONE way, no
//   numbers, no start, no end), hwEasel (Momo's homework), adultArt (the look-closer: our young plant beside the old tree), bankArt (the seed
//   bank), flowerJourney (BE A MANGO FLOWER), the fun-fact pictures (snail: ffTeeth, ffScrape; weaver ants: ffNest, ffBaby, ffTree), the
//   dare's cards (PIC.fish15, PIC.frog15, PIC.liz15).

/* ---------- the weaver ant: origin = under its feet, facing right; legs walk, the front legs can wave ---------- */
function weaverAnt(t, o = {}) { const wv = o.wave || 0, wk = o.walk === false ? 0 : 1, c = "#E8862E", d = "#A9531A";
  const leg = (x, i, front) => { const ph = t * 10 + i * 2.1, lift = wk * 5 * Math.max(0, Math.sin(ph)), up = front ? wv * (30 + 10 * Math.sin(t * 9)) : 0;
    return `<path d="M${x} -24 l${n2(-8 + 6 * Math.sin(ph) * wk)} ${n2(-10 - up)} l${n2(-4 + (front ? 14 * wv : 0))} ${n2(30 - lift + up * 1.4)}" fill="none" stroke="${d}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>`; };
  return `<ellipse cx="0" cy="1" rx="54" ry="5" fill="${P.ink}" opacity=".16"/>${[-26, -2, 20].map((x, i) => leg(x, i, i === 2)).join("")}
    <ellipse cx="-38" cy="-26" rx="26" ry="17" fill="${c}" stroke="${d}" stroke-width="3"/><ellipse cx="-44" cy="-32" rx="9" ry="5" fill="#fff" opacity=".35"/><ellipse cx="-4" cy="-27" rx="16" ry="8" fill="${c}" stroke="${d}" stroke-width="3"/>
    <circle cx="28" cy="-34" r="17" fill="${c}" stroke="${d}" stroke-width="3"/><path d="M34 -48 q6 -22 22 -24 M24 -50 q0 -24 12 -30" fill="none" stroke="${d}" stroke-width="3" stroke-linecap="round" transform="rotate(${n2(6 * Math.sin(t * 3))} 30 -48)"/>
    <circle cx="35" cy="-37" r="6.5" fill="#2B2147"/><circle cx="33" cy="-39" r="2.2" fill="#fff"/><path d="M34 -25 q6 4 11 -1" fill="none" stroke="#6E3410" stroke-width="2.5" stroke-linecap="round"/><ellipse cx="24" cy="-28" rx="4" ry="2.6" fill="#FF9F8A" opacity=".8"/>`; }
const antAt = (t, x, y, k = .3, o = {}) => TF(x, y, k * (o.flip ? -1 : 1), weaverAnt(t, o), o.rot || 0, k);

/* =============================================================================================================================
   THE COMMUNITY GARDEN beside the block (Part 2). The old mango tree's trunk at TRK; the bench under it; our pot on the bench at POT2
   ============================================================================================================================= */
const TRK = [1230, 770], BENCH = [900, 730], POT2 = [930, 726], POND = [560, 700];
BG.garden15 = () => { let s = `<rect x="-200" y="-120" width="2320" height="800" fill="url(#g14Sky)"/>`;
  s += `<g opacity=".55">${farBlocks(900, 2120, 560, 11, 1)}</g>`;
  s += `<rect x="-200" y="-120" width="1000" height="760" fill="#FFF4E2"/><rect x="780" y="-120" width="34" height="760" fill="#E3CFAE"/>`;
  for (let r = 0; r < 5; r++) { const y = -60 + r * 104; s += `<rect x="-200" y="${y + 62}" width="980" height="24" fill="${["#F6A38F", "#8FD3C8", "#B9A6FF", "#FFC38A", "#8FC0F2"][r]}"/>`; for (let c = 0; c < 8; c++) { const x = -150 + c * 118; s += `<rect x="${x}" y="${y}" width="74" height="56" rx="5" fill="#9DB8CC"/><rect x="${x + 4}" y="${y + 4}" width="31" height="48" rx="3" fill="#CFE6F4"/>`; } }
  s += `<rect x="-200" y="460" width="980" height="180" fill="#7C88A8"/><rect x="-200" y="460" width="980" height="180" fill="#2B2147" opacity=".28"/><rect x="-200" y="444" width="1014" height="22" fill="#E3CFAE"/>${[...Array(6)].map((_, i) => `<rect x="${-120 + i * 180}" y="466" width="50" height="170" fill="#F2E4C8"/>`).join("")}`;
  s += `<rect x="320" y="520" width="140" height="100" rx="8" fill="#9DB8CC" stroke="#5E6B7C" stroke-width="4"/><rect x="330" y="530" width="56" height="86" fill="#C9D2DC"/><rect x="394" y="530" width="56" height="86" fill="#C9D2DC"/>${T(390, 508, "LIFT", 22, "#fff")}`;
  s += `<rect x="-200" y="620" width="2320" height="600" fill="url(#g14Grass)"/><path d="M-200 628 Q400 606 960 624 T2120 616 V650 H-200z" fill="#B7E58F"/>`;
  for (let i = 0; i < 10; i++) s += `<circle cx="${820 + i * 140}" cy="${n2(626 + 10 * hash(i, 2))}" r="${n2(48 + 24 * hash(i, 5))}" fill="${i % 2 ? "#5FB56C" : "#7CC97A"}"/>`;
  s += `<path d="M300 640 Q560 720 760 760 Q980 800 1000 1200 H560 Q600 860 360 780 Q220 730 160 640z" fill="#F2E3C2"/>`;
  for (let i = 0; i < 46; i++) { const x = -160 + hash(i, 3) * 2240, y = 680 + hash(i, 7) * 480; s += `<path d="M${n2(x)} ${n2(y)} q4 -18 0 -26 M${n2(x + 9)} ${n2(y)} q8 -14 10 -22 M${n2(x - 8)} ${n2(y)} q-6 -12 -10 -18" stroke="#58A84E" stroke-width="4" stroke-linecap="round" fill="none" opacity=".7"/>`; }
  // the pond with lily pads (left, behind the bench line)
  s += `<ellipse cx="${POND[0]}" cy="${POND[1] + 6}" rx="210" ry="44" fill="#8A7A5A"/><ellipse cx="${POND[0]}" cy="${POND[1]}" rx="196" ry="36" fill="#6FC3D9"/><ellipse cx="${POND[0] - 40}" cy="${POND[1] - 10}" rx="120" ry="12" fill="#BDEBF5" opacity=".6"/>${[[-120, 6, 30], [90, -6, 26], [140, 12, 20]].map(([x, y, r]) => `<path d="M${POND[0] + x} ${POND[1] + y} m${-r} 0 a${r} ${r * .4} 0 1 0 ${r * 2} 0 a${r} ${r * .4} 0 1 0 ${-r * 2} 0 M${POND[0] + x} ${POND[1] + y} l${r} ${-r * .1}" fill="#58B56C" stroke="#2F8048" stroke-width="3"/>`).join("")}<circle cx="${POND[0] + 96}" cy="${POND[1] - 16}" r="9" fill="#FF8FB1"/>`;
  // a planter bed at the right
  s += `<g transform="translate(1560 900)"><ellipse cx="160" cy="80" rx="200" ry="16" fill="${P.ink}" opacity=".2" filter="url(#b4)"/><rect x="0" y="0" width="320" height="76" rx="8" fill="url(#f14Wood)" stroke="#7E4F27" stroke-width="4"/><rect x="6" y="-12" width="308" height="18" rx="8" fill="url(#g14Soil)"/>${[...Array(6)].map((_, i) => `<g transform="translate(${30 + i * 52} -8)"><ellipse cx="-12" cy="-16" rx="12" ry="20" fill="#58B56C" transform="rotate(-24 -12 -16)"/><ellipse cx="12" cy="-16" rx="12" ry="20" fill="#43A85C" transform="rotate(24 12 -16)"/><ellipse cx="0" cy="-24" rx="11" ry="22" fill="#7CCB7A"/></g>`).join("")}</g>`;
  // the bench under the tree
  const [bx, by] = BENCH; s += `<ellipse cx="${bx + 60}" cy="${by + 112}" rx="200" ry="16" fill="${P.ink}" opacity=".2" filter="url(#b4)"/><path d="M${bx - 110} ${by + 110} V${by + 20} M${bx + 230} ${by + 110} V${by + 20}" stroke="#7E4F27" stroke-width="16" stroke-linecap="round"/><rect x="${bx - 140}" y="${by - 70}" width="400" height="20" rx="8" fill="url(#f14Wood)" stroke="#7E4F27" stroke-width="4"/><rect x="${bx - 140}" y="${by - 42}" width="400" height="20" rx="8" fill="url(#f14Wood)" stroke="#7E4F27" stroke-width="4"/><path d="M${bx - 116} ${by - 70} V${by + 6} M${bx + 236} ${by - 70} V${by + 6}" stroke="#7E4F27" stroke-width="12" stroke-linecap="round"/><rect x="${bx - 150}" y="${by - 4}" width="420" height="26" rx="10" fill="url(#f14Wood)" stroke="#7E4F27" stroke-width="4"/>`;
  return s; };
// the old mango tree (live: it sways); o.ant = [x, y, flip] of the weaver ant (null: none), o.nest
const SPRAYS = [[760, 340], [860, 250], [990, 170], [1120, 120], [1290, 100], [1450, 140], [1600, 200], [1740, 290], [1840, 380], [1060, 320], [1380, 300], [1520, 360], [900, 400], [1680, 420]];
const MANGOS = [[960, 360, .7], [1330, 330, .8], [1560, 380, .75], [1180, 300, .6]];
const REDTIPS = [[700, 380, 200], [820, 200, 230], [1700, 120, -30], [1880, 320, -10], [1020, 90, 250]];
function oldTree(t, o = {}) { const [x0, y0] = TRK; let s = `<ellipse cx="${x0 + 20}" cy="${y0 + 10}" rx="320" ry="40" fill="${P.ink}" opacity=".2" filter="url(#b10)"/>`;
  s += `<path d="M${x0 - 90} ${y0} Q${x0 - 50} ${y0 - 200} ${x0 - 60} ${y0 - 420} Q${x0 - 64} ${y0 - 520} ${x0 - 40} ${y0 - 600} H${x0 + 60} Q${x0 + 60} ${y0 - 480} ${x0 + 70} ${y0 - 360} Q${x0 + 80} ${y0 - 160} ${x0 + 120} ${y0} Q${x0 + 60} ${y0 - 30} ${x0 + 20} ${y0} Q${x0 - 30} ${y0 - 26} ${x0 - 90} ${y0}z" fill="url(#g14Trunk)" stroke="#5E3F28" stroke-width="6" stroke-linejoin="round"/>
    <path d="M${x0 - 20} ${y0 - 40} Q${x0 - 10} ${y0 - 300} ${x0 - 20} ${y0 - 560} M${x0 + 30} ${y0 - 60} Q${x0 + 40} ${y0 - 300} ${x0 + 30} ${y0 - 520}" fill="none" stroke="#5E3F28" stroke-width="4" opacity=".4"/>
    <path d="M${x0 - 120} ${y0 + 4} q-60 10 -110 30 M${x0 + 110} ${y0 + 2} q70 8 120 30" stroke="#7A5230" stroke-width="18" stroke-linecap="round" fill="none"/>
    <path d="M${x0 - 50} ${y0 - 420} Q${x0 - 220} ${y0 - 480} ${x0 - 400} ${y0 - 440} M${x0 + 50} ${y0 - 400} Q${x0 + 240} ${y0 - 470} ${x0 + 420} ${y0 - 420} M${x0} ${y0 - 560} Q${x0 + 40} ${y0 - 640} ${x0 + 120} ${y0 - 700}" fill="none" stroke="#7A5230" stroke-width="40" stroke-linecap="round"/>`;
  const CR = [[760, 330, 220, 120, "#2F8048"], [1000, 200, 280, 150, "#3E9E5A"], [1300, 130, 300, 160, "#2F8048"], [1600, 200, 280, 150, "#3E9E5A"], [1820, 330, 200, 120, "#2F8048"], [1150, 40, 240, 110, "#58B56C"], [1450, 30, 240, 110, "#58B56C"], [880, 360, 160, 80, "#3E9E5A"], [1700, 380, 170, 80, "#3E9E5A"], [1260, 330, 300, 90, "#3E9E5A"]];
  CR.forEach(([x, y, rx, ry, c], i) => { s += `<ellipse cx="${n2(x + 7 * Math.sin(t * .7 + i * 1.3))}" cy="${n2(y + 3 * Math.sin(t * .9 + i))}" rx="${rx}" ry="${ry}" fill="${c}"/>`; });
  for (let i = 0; i < 40; i++) { const x = 640 + 1300 * hash(i, 41), y = -60 + 470 * hash(i, 43); s += `<g transform="translate(${n2(x)} ${n2(y)}) rotate(${n2(360 * hash(i, 45) + 4 * Math.sin(t + i))})">${leaf15(46, 11, i % 2 ? "#4FA866" : "#3E9E5A", "#2A6E3E")}</g>`; }
  if (o.nest !== false) s += TF(1560, 40, .9, leafNest(t));
  REDTIPS.forEach(([x, y, a], i) => { const [fc, lc] = leafC(1); s += `<g transform="translate(${x} ${y}) rotate(${n2(a + 3 * Math.sin(t * 1.3 + i))})">${[-30, -10, 10, 30].map((b) => `<g transform="rotate(${b + 70})">${leaf15(56, 12, fc, lc)}</g>`).join("")}</g>`; });
  SPRAYS.forEach(([x, y], i) => { s += flowerSpray(t, x, y, .6, i); });
  MANGOS.forEach(([x, y, k], i) => { s += `<g transform="translate(${x} ${y}) rotate(${n2(5 * Math.sin(t * 1.1 + i))})">${mangoHang(k, "g")}</g>`; });
  for (let i = 0; i < 8; i++) { const x = 720 + i * 150 + 14 * Math.sin(t * .6 + i), y = 800 + 70 * hash(i, 4) + 6 * Math.sin(t * .8 + i * 2); s += `<ellipse cx="${n2(x)}" cy="${n2(y)}" rx="${n2(46 + 20 * hash(i, 6))}" ry="${n2(13 + 6 * hash(i, 8))}" fill="url(#g14Dapple)" opacity="${n2(.6 + .3 * Math.sin(t * 1.2 + i))}"/>`; }
  return s; }
// the weaver ants' nest: leaves sewn together with fine white silk (origin = its middle)
const leafNest = (t) => `<ellipse rx="96" ry="66" fill="#3E9E5A" stroke="#2A6E3E" stroke-width="4"/>${[...Array(9)].map((_, i) => `<g transform="rotate(${i * 40 + 10}) translate(30 0)">${leaf15(74, 18, i % 2 ? "#58B56C" : "#4FA866", "#2A6E3E")}</g>`).join("")}${[...Array(14)].map((_, i) => { const a = i / 14 * Math.PI * 2; return `<path d="M${n2(70 * Math.cos(a))} ${n2(46 * Math.sin(a))} l${n2(16 * Math.cos(a + 1.4))} ${n2(12 * Math.sin(a + 1.4))}" stroke="#fff" stroke-width="2.5" opacity=".9"/>`; }).join("")}<path d="M-60 -10 Q0 -40 60 -6 M-50 20 Q0 0 56 24" stroke="#fff" stroke-width="2" fill="none" opacity=".8" stroke-dasharray="3 5"/>`;
// the ant's spots, scene by scene (teacher, 22 Nov: it hides somewhere new each time; small but findable)
// EP15 fix round (teacher, 23 Nov): never again at the game's intro spot (game: the low left leaf by the flowers), never twice in one spot.
// adultans moved off the intro leaf (to the bench's back rail), waitw off the trunk (place uses the trunk: now on a hanging mango), and the
// reveal (liz) on a different leaf: the far left of the crown.
const ANTAT = { place: [1236, 600, 0, -90], game: [900, 380, 0, 0], adultans: [1120, 668, 1, 0], seeds: [1340, 790, 1, 0], waitw: [1316, 372, 0, -30], fruitcut: [1060, 790, 0, -90], fix: null, nomore: [1640, 300, 1, 0], dare: [700, 726, 1, 0], liz: [690, 262, 0, 0], ring: null, show: null };
function VG15(t, o = {}, cam) { let s = bg("garden15");
  [[300, 90, 1], [1250, 60, .8], [1850, 150, .7]].forEach(([x, y, k], i) => { const cx = (x + t * (7 + 2 * i) + 400) % 2500 - 300; s += TF(cx, y, k, `<g opacity=".95"><ellipse cx="0" cy="0" rx="130" ry="34" fill="#fff"/><ellipse cx="-50" cy="-26" rx="62" ry="40" fill="#fff"/><ellipse cx="34" cy="-36" rx="76" ry="50" fill="#fff"/></g>`); });
  // the pond's ripples, its tadpoles (o.tad), a bird hopping on the grass
  s += [0, 1].map((i) => { const u = ((t * .4 + i * .5) % 1); return `<ellipse cx="${POND[0] + 60 - 120 * i}" cy="${POND[1]}" rx="${n2(10 + 60 * u)}" ry="${n2(3 + 12 * u)}" fill="none" stroke="#fff" stroke-width="2" opacity="${n2(.7 * (1 - u))}"/>`; }).join("");
  if (o.tad) s += [0, 1, 2, 3, 4].map((i) => { const x = POND[0] - 120 + i * 60 + 20 * Math.sin(t * 1.3 + i * 2), y = POND[1] - 8 + 12 * Math.sin(t * .9 + i); return TF(x, y, o.tad, tadpole(t, i), 10 * Math.sin(t + i)); }).join("");
  s += TF(1660 + 60 * Math.sin(t * .15), 980, 1, bird15(t, 1.1, 0));
  // the tree, our pot on the bench, the ant
  s += oldTree(t, o);
  if (o.pot !== false) s += TF(POT2[0], POT2[1], .6, pot15({ label: true }) + TF(0, POTS, 1, youngPlant15(t, o.plant || { h: 250, n: 8, red: 0, k: 1.1 })));
  if (o.items) s += o.items;
  if (o.ant !== false) { const a = o.ant || ANTAT[(window._S || {}).name]; if (a) s += antAt(t, a[0], a[1], .32, { flip: a[2], rot: a[3] || 0, wave: o.wave || 0 }); }
  // a butterfly passes
  const bu = ((t / 9) % 1), bx = 2000 - 2200 * bu, by = 560 + 60 * Math.sin(bu * 14), fl = Math.abs(Math.sin(t * 16)); s += TF(bx, by, 1, `<ellipse cx="${n2(-9 * fl)}" cy="-4" rx="${n2(12 * fl + 2)}" ry="14" fill="#FFB36B" stroke="#C97A2A" stroke-width="2"/><ellipse cx="${n2(9 * fl)}" cy="-4" rx="${n2(12 * fl + 2)}" ry="14" fill="#FFB36B" stroke="#C97A2A" stroke-width="2"/><rect x="-2" y="-12" width="4" height="20" rx="2" fill="#2B2147"/>`);
  if (o.over) s += o.over;
  if (o.dim) s += `<rect x="-200" y="-120" width="2320" height="1320" fill="${P.night}" opacity="${n2(o.dim)}"/>`;
  return cam ? CAM(s, cam[0], cam[1], cam[2]) : s; }
// a tadpole (origin = its body), swimming
const tadpole = (t, i = 0) => { const w = 8 * Math.sin(t * 9 + i); return `<path d="M-10 0 Q-30 ${n2(w)} -50 ${n2(-w * .6)}" stroke="#4A4A5E" stroke-width="7" fill="none" stroke-linecap="round"/><ellipse rx="16" ry="12" fill="#4A4A5E"/><circle cx="7" cy="-4" r="4" fill="#fff"/><circle cx="8" cy="-4" r="2" fill="#2B2147"/>`; };

/* =============================================================================================================================
   LOOK CLOSER · our young plant beside the old tree (two halves, both big). Young plant labels teal, adult labels mango orange
   ============================================================================================================================= */
const YC = ["#D7F5EE", "#0F766E"], AC = ["#FFE2C0", "#B4531A"];
function adultArt(t) { const m = MK, tP = m("pairin"), tS = m("stem"), tT = m("trunk"), tF = m("flowers"), tTi = m("tips"), tK = m("kw_adult_plant"), tA = m("tagadult");
  // the camera inside the picture: both, then a push on each part as it is named, back out for the strip
  const F = [[0, 0, 1], [-450, 40, 1.25], [380, 120, 1.2], [460, -120, 1.45], [640, -170, 1.5], [0, 30, .98]], ts = [tP, tS, tT, tF, tTi, tK - .8];
  let k = 0; for (let i = 1; i < ts.length; i++) if (t >= ts[i] - .3) k = i; const u = ss(ts[k] - .3, ts[k] + .7, t), A = F[Math.max(0, k - 1)], B = F[k], fx = lerp(A[0], B[0], u), fy = lerp(A[1], B[1], u), z = lerp(A[2], B[2], u);
  let w = `<rect x="-1200" y="-700" width="2400" height="1400" fill="#DCEFFB"/><rect x="-1200" y="200" width="2400" height="500" fill="#A6DE7E"/><path d="M-1200 200 H1200" stroke="#7FC566" stroke-width="6"/>`;
  // LEFT: our young plant in its pot (on the bench's edge)
  w += `<rect x="-760" y="200" width="560" height="40" rx="12" fill="url(#f14Wood)" stroke="#7E4F27" stroke-width="5"/>` + TF(-470, 204, 1.55, pot15({}) + TF(0, POTS, 1, youngPlant15(t, { h: 180, n: 8, red: 0, k: 1 })));
  // RIGHT: the old tree's trunk and one branch: a spray of tiny flowers, two small green mangoes, a bunch of new RED leaves at its tip
  w += `<path d="M260 760 Q300 300 280 -200 Q276 -460 300 -700 H520 Q490 -420 500 -200 Q520 300 600 760z" fill="url(#g14Trunk)" stroke="#5E3F28" stroke-width="7"/><path d="M340 600 Q350 200 340 -300 M440 600 Q450 200 440 -260" stroke="#5E3F28" stroke-width="5" fill="none" opacity=".4"/>
    <path d="M480 -140 Q620 -200 760 -250 Q860 -280 960 -260" fill="none" stroke="#7A5230" stroke-width="34" stroke-linecap="round"/>`;
  for (let i = 0; i < 8; i++) w += `<g transform="translate(${560 + i * 50} ${-180 - i * 10 + 8 * (i % 2)}) rotate(${i % 2 ? 60 : -80})">${leaf15(90, 20, i % 2 ? "#4FA866" : "#3E9E5A", "#2A6E3E")}</g>`;
  w += flowerSpray(t, 620, -200, 1.5, 1, { big: true }) + flowerSpray(t, 720, -236, 1.2, 2, { big: true }) + TF(560, -190, 1, mangoHang(.9, "g")) + TF(690, -228, 1, mangoHang(.75, "g"));
  { const [fc, lc] = leafC(1 - .15 * Math.sin(t)); w += `<g transform="translate(950 -262)">${[-50, -25, 0, 25, 50].map((b, i) => `<g transform="rotate(${b + 30 + 3 * Math.sin(t * 1.5 + i)})">${leaf15(110, 22, fc, lc)}</g>`).join("")}</g>`; }
  // the labels (a plain line to the exact part), colour-coded: teal for the young plant, mango orange for the adult plant
  const lab = (t0, x, y, txt, px, py, c, t1) => lcLab(t, t0, x, y, txt, px, py, { size: 46, fill: c[0], ink: c[1], t1 });
  w += lab(tS, -760, -200, "a thin stem", -470, 204 + POTS * 1.55 - 120, YC, tT - .3) + lab(tT, 160, 300, "a thick trunk", 330, 200, AC, tF - .3) + lab(tF, 240, -330, "tiny flowers", 600, -330, AC, tTi - .3)
    + lab(tTi, 700, -330, "new leaves: still growing", 1010, -330, AC, Math.min(tK - .9, LT("j506") - .5));
  // (EP15 fix round: the two summary tags moved out of the zoomed art to p2.js lcadult, in screen space, clear of the face and the bubble)
  return `<rect x="-900" y="-450" width="1800" height="900" fill="#DCEFFB"/><g transform="scale(${n2(z)}) translate(${n2(-fx)} ${n2(-fy)})">${w}</g>`; }

/* =============================================================================================================================
   THE BOARD · OUR MANGO'S LIFE CYCLE: a cream board on a low stand. Three round slots round a loop, the curved arrows all running ONE way,
   NO numbers, no Stage 1, no START, no END. origin = the stand's feet (base centre). o.tiles = [t seed, t young, t adult] (tiles pop in),
   o.back = when the last arrow (from the fruit back to the seed) lights; o.run = the arrows run round; o.flash [3]; o.fade [3] 0..1 (a slot
   empties: nomore); o.t0 = the board's arrival
   ============================================================================================================================= */
const LOOPS = [[0, -600], [200, -330], [-200, -330]], LOOPN = ["seed", "young plant", "adult plant"];
const tilePic = (i, t) => i === 0 ? TF(0, 6, .9, mangoSeed(1, -10))
  : i === 1 ? `<ellipse cx="0" cy="56" rx="70" ry="16" fill="url(#g14Soil)"/>` + TF(0, 52, 1, youngPlant15(t, { h: 96, n: 4, red: 0, k: .8 }))
  : `<ellipse cx="0" cy="66" rx="70" ry="12" fill="#7FC566"/><path d="M-12 66 Q-8 20 -10 -10 H10 Q8 20 14 66z" fill="url(#g14Trunk)" stroke="#5E3F28" stroke-width="3"/><ellipse cx="0" cy="-34" rx="76" ry="52" fill="#3E9E5A"/><ellipse cx="-22" cy="-52" rx="40" ry="26" fill="#58B56C"/>${[[-40, -40], [30, -60], [44, -20], [-10, -70]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="7" fill="#FFF6DA" stroke="#D9B86A" stroke-width="1.5"/>`).join("")}<g transform="translate(-24 -12)">${mangoHang(.32, "y")}</g><g transform="translate(26 -14)">${mangoHang(.3, "y")}</g>`;
function loopBoard(t, o = {}) { const tl = o.tiles || [-9, -9, -9], fl = o.flash || [0, 0, 0], fd = o.fade || [0, 0, 0], tb = o.back === undefined ? -9 : o.back, run = t >= tb + .6 ? (t - tb) : 0;
  let s = `<ellipse cx="0" cy="6" rx="300" ry="20" fill="${P.ink}" opacity=".22" filter="url(#b4)"/><path d="M-220 0 L-180 -150 M220 0 L180 -150 M0 0 V-150" stroke="#8A5A36" stroke-width="18" stroke-linecap="round"/>`
    + `<g filter="url(#drop)"><rect x="-380" y="-790" width="760" height="660" rx="30" fill="url(#gPaper)" stroke="#C9A974" stroke-width="8"/></g>` + T(0, -726, "OUR MANGO'S LIFE CYCLE", 42, P.ink, { ls: 2 });
  // the arrows: seed -> young plant -> adult plant -> (its fruits) back to the seed, all one way round
  const arc = (a, b, bend, lit, i) => { const [x1, y1] = LOOPS[a], [x2, y2] = LOOPS[b], mx = (x1 + x2) / 2, my = (y1 + y2) / 2, nx = -(y2 - y1), ny = x2 - x1, L = Math.hypot(nx, ny), cx = mx + nx / L * bend, cy = my + ny / L * bend;
    const sx = x1 + (cx - x1) * .55 * 1, sy = y1 + (cy - y1) * .55, ex = x2 + (cx - x2) * .55, ey = y2 + (cy - y2) * .55, ang = Math.atan2(ey - cy, ex - cx) * 180 / Math.PI;
    const col = lit ? P.leaf : "#C9B48F"; return `<path d="M${n2(sx)} ${n2(sy)} Q${n2(cx)} ${n2(cy)} ${n2(ex)} ${n2(ey)}" fill="none" stroke="${col}" stroke-width="16" stroke-linecap="round" ${run ? `stroke-dasharray="30 18" stroke-dashoffset="${n2(-run * 60)}"` : ""}/><g transform="translate(${n2(ex)} ${n2(ey)}) rotate(${n2(ang)})"><path d="M-6 -22 L26 0 L-6 22z" fill="${col}"/></g>`; };
  s += arc(0, 1, -60, t >= tl[1], 0) + arc(1, 2, -60, t >= tl[2], 1) + arc(2, 0, -60, t >= tb, 2);
  if (t >= tb && t < tb + 1) s += OP(1 - (t - tb), `<circle cx="-150" cy="-520" r="${n2(30 + 80 * (t - tb))}" fill="none" stroke="${P.sun}" stroke-width="8"/>`);
  LOOPS.forEach(([x, y], i) => { const k = t >= tl[i] ? spring(t, tl[i], .45) : 0, f = fl[i], a = 1 - .85 * clamp(fd[i]);
    s += `<g transform="translate(${x} ${y})"><circle r="112" fill="#F3EAD8" stroke="#D9C9A8" stroke-width="5" stroke-dasharray="${k > .5 ? "0" : "14 10"}"/>`
      + (k > .02 ? OP(a, TF(0, 0, k * (1 + .12 * f), `${f > .05 ? `<circle r="${n2(118 + 14 * f)}" fill="${P.sun}" opacity="${n2(.5 * f)}"/>` : ""}<circle r="104" fill="#fff" stroke="${P.leaf}" stroke-width="7"/><clipPath id="lb${i}${o.id || ""}"><circle r="96"/></clipPath><g clip-path="url(#lb${i}${o.id || ""})">${tilePic(i, t)}</g>`)) : "")
      + (k > .02 ? OP(a * k, tpill(0, 150, LOOPN[i], 34, "#FFF8EA", P.ink, { w: 700 })) : "") + `</g>`; });
  if (t >= tb + .2 && o.tag !== false) s += TF(0, -470, spring(t, tb + .2, .4), `<g filter="url(#dropS)"><circle r="54" fill="${P.leaf}"/></g><path d="M-26 -8 a28 28 0 1 1 6 26" fill="none" stroke="#fff" stroke-width="9" stroke-linecap="round"/><path d="M-36 6 L-20 22 L-6 2z" fill="#fff"/>`);
  return s; }

/* =============================================================================================================================
   MOMO'S HOMEWORK on her easel (the Showdown). origin = the easel's feet; o.lit [3]; o.strike 0..1; o.fix 0..1 (line 3 rewritten in green,
   its pictures bend from a row ending in STOP into a loop)
   ============================================================================================================================= */
const HWL = ["The seed grows into a young plant.", "The young plant grows into an adult plant.", "The adult plant is the last stage, and the cycle ends."];
const miniPic = (i, t, k = .4) => TF(0, 0, k, `<circle r="104" fill="#fff" stroke="#D9C9A8" stroke-width="6"/><clipPath id="mp${i}${Math.round(k * 100)}"><circle r="96"/></clipPath><g clip-path="url(#mp${i}${Math.round(k * 100)})">${tilePic(i, t)}</g>`);
const stopSign = (k = 1) => TF(0, 0, k, `<path d="M-17 -41 H17 L41 -17 V17 L17 41 H-17 L-41 17 V-17z" fill="#E33B2E" stroke="#fff" stroke-width="5"/>${T(0, 9, "STOP", 22, "#fff")}`);
function hwEasel(t, o = {}) { const lit = o.lit || [0, 0, 0], st = o.strike || 0, fx = o.fix || 0;
  let s = `<ellipse cx="0" cy="6" rx="330" ry="20" fill="${P.ink}" opacity=".22" filter="url(#b4)"/><path d="M-240 0 L-170 -360 M240 0 L170 -360 M0 0 L0 -300" stroke="#8A5A36" stroke-width="18" stroke-linecap="round"/><rect x="-420" y="-330" width="840" height="24" rx="8" fill="#8A5A36"/>`
    + `<g filter="url(#drop)"><rect x="-400" y="-960" width="800" height="640" rx="14" fill="#FFFDF6" stroke="#D9C9A8" stroke-width="5"/></g>${[...Array(13)].map((_, i) => `<path d="M-380 ${-890 + i * 44} H380" stroke="#DCE8F4" stroke-width="2"/>`).join("")}<path d="M-330 -950 V-330" stroke="#F4A7A0" stroke-width="3"/>`
    + T(-300, -910, "My homework", 40, P.ink, { a: "start" }) + T(370, -910, "by Momo", 30, P.momo, { a: "end" });   // EP15 fix: a taller page, so line 3's pictures and the fix never sit on its words
  HWL.forEach((txt, i) => { const y = -830 + i * 120, l = lit[i]; const ls = wrap(txt, 34, 640, 600);
    if (l > .02) s += `<rect x="-390" y="${y - 44}" width="780" height="${44 + ls.length * 42}" rx="12" fill="${P.sun}" opacity="${n2(.3 * l)}"/>`;
    s += TF(-360, y - 6, 1, `<circle r="24" fill="${P.ink}"/>${T(0, 10, String(i + 1), 28, "#fff")}`) + ls.map((l2, j) => T(-320, y + j * 42, esc(l2), 34, i === 2 && fx > .5 ? "#9A8F86" : P.ink, { a: "start", w: 600 })).join("");
    if (i === 2 && st > .01) s += `<path d="M-325 ${y - 10} L${n2(-325 + 690 * st)} ${y - 10} M-325 ${y + 32} L${n2(-325 + 690 * st)} ${y + 32}" stroke="#E33B2E" stroke-width="6" stroke-linecap="round"/>`; });
  // line 3's pictures: a row seed -> young -> adult -> STOP; on the fix it bends into a loop (no STOP)
  const by = fx < .5 ? -470 : -386; if (fx < .5) { const a = 1 - 2 * fx; s += OP(a, [0, 1, 2].map((i) => TF(-250 + i * 170, by, 1, miniPic(i, t, .4))).join("") + [0, 1, 2].map((i) => `<path d="M${-196 + i * 170} ${by} h56" stroke="${P.ink}" stroke-width="6"/><path d="M${-146 + i * 170} ${by - 10} l12 10 l-12 10" fill="none" stroke="${P.ink}" stroke-width="6" stroke-linecap="round"/>`).join("") + TF(260, by, 1, stopSign(1))); }
  else { const a = 2 * fx - 1; s += OP(a, [[-90, by - 30], [90, by - 30], [0, by + 40]].map(([x, y], i) => TF(x, y, 1, miniPic(i, t, .3))).join("") + `<path d="M-40 ${by - 60} Q0 ${by - 90} 40 ${by - 60} M126 ${by + 2} Q120 ${by + 50} 50 ${by + 60} M-50 ${by + 60} Q-120 ${by + 50} -126 ${by + 2}" fill="none" stroke="${P.leaf}" stroke-width="7" stroke-linecap="round"/>` + T(250, by + 10, "round and round!", 30, P.leaf, { w: 700 })); }
  if (fx > .02) { const ls = wrap("The adult plant has fruits with new seeds, so round it goes again.", 34, 640, 600); s += OP(clamp(fx * 1.6), ls.map((l2, j) => T(-320, -512 + j * 38, esc(l2), 34, P.leafDeep, { a: "start", w: 700 })).join("")); }
  return s; }

/* =============================================================================================================================
   LOOK CLOSER · the seed bank: trays of small seeds drying, jars with labels, the very cold room's steel door (frost, a thermometer far
   below zero), gloved hands (four fingers and a thumb). NOT mango seeds: small dry seeds (beans, grains, little round seeds)
   ============================================================================================================================= */
const glove15 = (o = {}) => hand15({ ...o, sleeve: "#FFFFFF", sleeveD: "#C9D2DC" }).replace(new RegExp(SKN, "g"), "#8FD3F0").replace(new RegExp(SKL, "g"), "#4E9EC2");
const seedDot = (x, y, kind, r = 1) => kind === 0 ? `<ellipse cx="${x}" cy="${y}" rx="${n2(9 * r)}" ry="${n2(6 * r)}" fill="#8A4A2A" stroke="#5A2E18" stroke-width="1.5"/>` : kind === 1 ? `<ellipse cx="${x}" cy="${y}" rx="${n2(6 * r)}" ry="${n2(3.6 * r)}" fill="#E9C77A" stroke="#B9944A" stroke-width="1.2"/>` : `<circle cx="${x}" cy="${y}" r="${n2(4.5 * r)}" fill="#3A3A4A"/>`;
const jar15 = (i, txt) => `<rect x="-58" y="-150" width="116" height="150" rx="18" fill="#EAF6FF" fill-opacity=".8" stroke="#8AB6D6" stroke-width="4"/><rect x="-50" y="-174" width="100" height="28" rx="8" fill="${["#F49B7E", "#8FD3C8", "#B9A6FF", "#FFC38A", "#8FC0F2"][i % 5]}" stroke="${P.ink}" stroke-width="3"/>${[...Array(26)].map((_, j) => seedDot(-40 + 80 * hash(j, i + 50), -10 - 70 * hash(j, i + 60), i % 3, 1.1)).join("")}<rect x="-46" y="-120" width="92" height="44" rx="6" fill="#FFFDF6" stroke="#C9B48F" stroke-width="2"/>${T(0, -92, txt, 20, P.ink, { w: 600 })}`;
const JARN = ["beans", "rice", "basil", "chilli", "bayam"];
function bankArt(t) { const m = MK, tD = m("dry"), tJ = m("jars"), tC = m("cold"), tB = m("bankin"), pan = -520 * ss(tD - .4, tD + .6, t) * (1 - ss(tJ - .4, tJ + .6, t)) + 560 * ss(tC - .5, tC + .7, t);
  let w = `<rect x="-1400" y="-500" width="2800" height="1000" fill="url(#g15Bank)"/><rect x="-1400" y="160" width="2800" height="340" fill="#C9D6E0"/><path d="M-1400 160 H1400" stroke="#A9B8C6" stroke-width="5"/>`;
  w += `<rect x="-480" y="-392" width="560" height="128" rx="12" fill="#fff" stroke="#A9B8C6" stroke-width="4"/>${T(-200, -330, "SEED BANK", 56, "#3A6EA5", { ls: 6 })}${T(-200, -286, "opened in 2019", 30, "#5E6B7C", { w: 600 })}`;
  // the drying table with trays of small seeds (left)
  w += `<rect x="-1260" y="40" width="660" height="30" rx="8" fill="#B9C6D4"/><path d="M-1220 70 V300 M-640 70 V300" stroke="#8A97A8" stroke-width="16"/>`;
  [[-1100, 0, 0], [-920, 10, 1], [-740, 0, 2]].forEach(([x, y, k]) => { w += `<rect x="${x - 80}" y="${y - 26}" width="160" height="40" rx="8" fill="#F3EAD8" stroke="#C9B48F" stroke-width="3"/>` + [...Array(30)].map((_, j) => seedDot(n2(x - 66 + 132 * hash(j, k + 70)), n2(y - 16 + 22 * hash(j, k + 80)), k, 1)).join(""); });
  w += TF(-700, -140, spring(t, tD - .2, .45), tpill(0, 0, "dry the seeds", 40, "#FFF8EA", P.ink, { w: 700 }));
  // the jars on the shelf (middle), the gloved hand placing one
  w += `<rect x="-480" y="-60" width="760" height="22" rx="6" fill="#B9C6D4"/><rect x="-480" y="140" width="760" height="22" rx="6" fill="#B9C6D4"/>`;
  JARN.forEach((n, i) => { const k = spring(t, tB - .6 + i * .12, .4); w += TF(-400 + i * 150, -60, k, jar15(i, n)) + TF(-400 + i * 150, 140, k, jar15(i + 2, JARN[(i + 2) % 5])); });
  { const a = ss(tJ - .2, tJ + .5, t) * (1 - ss(tC - .3, tC + .2, t)); if (a > .01) w += OP(a, TF(90, -230 + 30 * Math.sin(t * 1.5), .75, `<g transform="rotate(90)">${glove15({ curl: .45 })}</g>`)); }
  w += TF(-100, 240, spring(t, tJ, .45), tpill(0, 0, "jars with labels", 40, "#FFF8EA", P.ink, { w: 700 }));
  // the very cold room (right): the big steel door, frost, the thermometer far below zero, cold mist
  w += `<rect x="460" y="-380" width="560" height="660" rx="16" fill="url(#g15Steel)" stroke="#8A97A8" stroke-width="7"/><rect x="490" y="-350" width="500" height="600" rx="10" fill="none" stroke="#A9B8C6" stroke-width="4"/><rect x="930" y="-60" width="30" height="140" rx="12" fill="#6E7C8E"/>`
    + [...Array(18)].map((_, i) => `<path d="M${470 + 540 * hash(i, 90)} ${n2(-370 + (i % 2 ? 0 : 640) + 30 * hash(i, 91) * (i % 2 ? 1 : -1))} l${n2(10 + 20 * hash(i, 92))} ${n2(i % 2 ? 18 : -18)}" stroke="#fff" stroke-width="6" stroke-linecap="round" opacity=".9"/>`).join("")
    + `<rect x="460" y="-380" width="560" height="36" rx="12" fill="#fff" opacity=".8"/>` + T(740, -404, "VERY COLD ROOM", 34, "#3A6EA5", { ls: 3 });
  { const k = ss(tC - .2, tC + 1.2, t); w += `<g transform="translate(1160 -100)"><rect x="-34" y="-200" width="68" height="330" rx="34" fill="#fff" stroke="#8A97A8" stroke-width="5"/><circle cx="0" cy="150" r="46" fill="#3A8DFF" stroke="#8A97A8" stroke-width="5"/><rect x="-12" y="${n2(lerp(-40, 120, k))}" width="24" height="${n2(150 - lerp(-40, 120, k))}" rx="12" fill="#3A8DFF"/>${[...Array(7)].map((_, i) => `<path d="M14 ${-170 + i * 46} h16" stroke="#8A97A8" stroke-width="3"/>`).join("")}<path d="M-50 -30 H50" stroke="#2B2147" stroke-width="3" stroke-dasharray="6 4"/>${T(-80, -22, "0°C", 28, P.ink, { a: "end" })}</g>`
    + TF(1160, 160, spring(t, tC + .4, .4), tpill(0, 0, "far below zero", 36, "#3A8DFF", "#fff", { w: 700 }));
    for (let i = 0; i < 8; i++) { const u = ((t * .3 + i / 8) % 1); w += `<ellipse cx="${n2(500 + 500 * hash(i, 95) + 40 * u)}" cy="${n2(260 - 60 * u)}" rx="${n2(60 + 60 * u)}" ry="${n2(20 + 10 * u)}" fill="#fff" opacity="${n2(.5 * k * Math.sin(Math.PI * u))}"/>`; }
    w += lcGlint(560, -300, 22, t) + lcGlint(940, 200, 18, t, 2); }
  return `<g transform="translate(${n2(-pan)} 0)">${w}</g>`; }

/* =============================================================================================================================
   THE JOURNEY · BE A MANGO FLOWER (first person, present tense): you are one tiny cream flower in a spray of hundreds; your petals fall; you
   swell into a tiny green mango; week after week you grow bigger and heavier (the branch bends); a see-through view: inside you a seed grows,
   big and flat; you turn yellow and sweet. Nothing about pollination
   ============================================================================================================================= */
function flowerJourney(t, s) { const m = MK, tF = m("jflower"), tP = m("jpetals"), tG = m("jgreen"), tB = m("jbig"), tS = m("jseed"), tR = m("jripe"), tN = m("jnew");
  const grow = ss(tG - .3, tR + .5, t), bend = 8 * ss(tB, tS + 1, t), sink = 60 * ss(tB, tR, t), ripe = ss(tR - .2, tR + 1.6, t);
  let o = `<rect width="1920" height="1080" fill="#BFE3A8"/><rect width="1920" height="1080" fill="url(#j15Sky)" opacity=".55"/>`;
  // light through the leaves (soft circles), leaves at the edges, the branch
  for (let i = 0; i < 18; i++) o += `<circle cx="${n2(1920 * hash(i, 101) + 20 * Math.sin(t * .4 + i))}" cy="${n2(1080 * hash(i, 103))}" r="${n2(40 + 70 * hash(i, 105))}" fill="#FFF6C8" opacity="${n2(.18 + .12 * Math.sin(t + i))}"/>`;
  let v = `<path d="M-300 ${300} Q500 200 1100 330 Q1500 420 2300 380" fill="none" stroke="#7A5230" stroke-width="70" stroke-linecap="round"/>`;
  for (let i = 0; i < 14; i++) { const x = -200 + 2300 * hash(i, 111), y = 120 + 420 * hash(i, 113); v += `<g transform="translate(${n2(x)} ${n2(y)}) rotate(${n2(360 * hash(i, 115) + 5 * Math.sin(t + i))}) scale(3)">${leaf15(70, 16, i % 2 ? "#4FA866" : "#3E9E5A", "#2A6E3E")}</g>`; }
  // the spray you are part of: hundreds of tiny flowers (they fall away around you too)
  const fall = ss(tP - .3, tP + 2.2, t); v += OP(1 - .8 * fall, flowerSpray(t, 960, 900, 6.2, 0, { big: true }));
  v += `<g transform="translate(960 ${n2(760 + sink)}) rotate(${n2(bend)})">`;
  // you: a tiny green mango that grows (a curved skin filling the bottom of the view), then ripe
  if (t > tP - .2) { const r = lerp(240, 900, grow), col = mixC("#9CCB5A", "#FFB43A", ripe), col2 = mixC("#5E9A34", "#E0701E", ripe), a = ss(tP - .2, tG, t);
    v += OP(a, `<ellipse cx="0" cy="${n2(r * .95 + 120 - 40 * grow)}" rx="${n2(r * 1.15)}" ry="${n2(r)}" fill="${col}" stroke="${col2}" stroke-width="12"/><ellipse cx="${n2(-r * .4)}" cy="${n2(r * .3 + 60)}" rx="${n2(r * .18)}" ry="${n2(r * .4)}" fill="#fff" opacity=".22" transform="rotate(20 ${n2(-r * .4)} ${n2(r * .3 + 60)})"/>`); }
  v += `</g>`;
  // your petals at the lower edge of the view (you are the flower); they fall away, drifting down
  for (let i = 0; i < 5; i++) { const a = (-90 + (i - 2) * 38) * Math.PI / 180, d = clamp((t - tP - i * .15) / 2.4), x = 960 + Math.cos(a) * 520 + 300 * d * (i - 2), y = 1060 + Math.sin(a) * 300 + 700 * d * d, rot = (i - 2) * 38 + 200 * d;
    if (d < 1) v += `<g transform="translate(${n2(x)} ${n2(y)}) rotate(${n2(rot)})" opacity="${n2(1 - d)}"><ellipse cx="0" cy="-150" rx="110" ry="190" fill="#FFF6DA" stroke="#E3C88A" stroke-width="8"/><path d="M0 -40 V-280" stroke="#F2DDA8" stroke-width="6"/></g>`; }
  if (t < tP + .5) v += OP(1 - ss(tP, tP + .5, t), `<circle cx="960" cy="1080" r="120" fill="#FFE08A" stroke="#D9B86A" stroke-width="8"/>`);
  // a bee far off (no pollination shown)
  { const u = ((t / 7) % 1), bx = 200 + 1500 * u, by = 200 + 60 * Math.sin(u * 20); v += TF(bx, by, .8, `<ellipse rx="16" ry="11" fill="#FFC83A" stroke="#2B2147" stroke-width="3"/><path d="M-4 -10 V10 M6 -9 V9" stroke="#2B2147" stroke-width="4"/><ellipse cx="-2" cy="-14" rx="${n2(8 + 4 * Math.sin(t * 40))}" ry="6" fill="#fff" opacity=".8"/>`); }
  o += `<g transform="rotate(${n2(-bend * .4)} 960 540) translate(0 ${n2(sink * .3)})">${v}</g>`;
  // the see-through view: inside you, a seed grows big and flat
  const kS = ss(tS - .2, tS + .5, t) * (1 - ss(tN + 1.6, tN + 2.2, t));
  if (kS > .01) { const sg = ss(tS, tR, t); o += TF(1400, 420, kS, `<g filter="url(#drop)"><circle r="220" fill="#fff"/></g><circle r="206" fill="${mixC("#C8E08A", "#FFC83A", ripe)}"/><ellipse rx="170" ry="196" fill="${mixC("#E6F2B8", "#FFD75A", ripe)}"/>` + TF(0, 0, lerp(.5, 1.3, sg), mangoSeed(1, 90)) + `<circle r="206" fill="none" stroke="${P.ink}" stroke-width="6"/>` + tpill(0, 250, "inside you", 36, P.ink, "#fff", { w: 700 })); }
  // the week pill (speeded up)
  if (t > tB - .2 && t < tN + .5) { const wk = Math.min(16, Math.max(1, Math.round(lerp(1, 16, ss(tB, tR + 1, t))))); o += TF(1600, 200, 1, `<g filter="url(#dropS)"><rect x="-110" y="-34" width="220" height="68" rx="34" fill="${P.ink}"/></g>` + T(0, 12, "Week " + wk, 36, "#fff", { w: 700 })) + speeded(t, tB, tN, 1600, 290); }
  return o; }

/* ---------- the fun-fact pictures (common.js funFact: each draws inside -w/2..w/2, -h/2..h/2) ---------- */
const ffBg = (w, h, c) => `<rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" fill="${c}"/>`;
// a snail's tongue, close up: a ribbon with rows of tiny teeth (cute: like a little cheese grater), the snail's face beside it
const ffTeeth = (t, w, h) => { let s = ffBg(w, h, "#FFF3DC") + `<g transform="translate(70 30) rotate(-12)"><rect x="-150" y="-60" width="300" height="120" rx="40" fill="#F7B8A8" stroke="#C9746A" stroke-width="5"/>`;
  for (let r = 0; r < 5; r++) for (let c = 0; c < 13; c++) s += `<path d="M${-132 + c * 22} ${-40 + r * 20} l7 -10 l7 10z" fill="#FFFDF6" stroke="#C9746A" stroke-width="1.5"/>`;
  return s + `</g>` + TF(-150, 60, .9, snail15(t, { ext: .9 })) + TF(60, -110, 1, tpill(0, 0, "×1000s", 34, P.ink, "#fff", { w: 700 })); };
// a soft young leaf with a scraped edge, the snail beside it
const ffScrape = (t, w, h) => { const [fc, lc] = leafC(.7); return ffBg(w, h, "#E8F5DC") + `<g transform="translate(-60 -10) rotate(-20) scale(2.6)">${leaf15(110, 30, fc, lc)}</g><path d="M${-60 + 120} -60 q20 10 10 30 q-14 10 6 24 q-16 8 0 22" fill="none" stroke="#E8F5DC" stroke-width="16"/>` + TF(120, 120, .7, snail15(t, { ext: .8 }), 0, .7); };
// the weaver ants' leaf nest high in the mango tree, leaves joined by fine white silk
const ffNest = (t, w, h) => ffBg(w, h, "#CFEAF8") + `<path d="M${-w / 2} ${-h / 2 + 40} Q0 -60 ${w / 2} ${-h / 2 + 20}" stroke="#7A5230" stroke-width="18" fill="none"/>` + TF(0, 20, 1.5, leafNest(t)) + TF(-80, 70, .32, weaverAnt(t, {})) + TF(70, -40, .28, weaverAnt(t, { wave: 1 }), 0, .28);
// a worker ant holding a larva (a baby) to the leaf edge: a fine silk thread (like a tube of glue)
const ffBaby = (t, w, h) => { const sw = Math.sin(t * 3); return ffBg(w, h, "#E8F5DC") + `<g transform="translate(-30 40) rotate(-10) scale(2.2)">${leaf15(100, 26, "#4FA866", "#2A6E3E")}</g><g transform="translate(-30 -90) rotate(170) scale(2.2)">${leaf15(100, 26, "#58B56C", "#2A6E3E")}</g>`
  + `<path d="M-60 -30 Q${n2(-40 + 6 * sw)} 0 -60 30 M-20 -36 Q${n2(-4 + 6 * sw)} 0 -20 36 M20 -36 Q${n2(36 + 6 * sw)} 0 20 34" stroke="#fff" stroke-width="3" fill="none"/>` + TF(60, 60, .62, weaverAnt(t, { walk: false }))
  + `<g transform="translate(98 26) rotate(-20)"><ellipse rx="26" ry="13" fill="#FFF8EA" stroke="#D9C9A8" stroke-width="3"/><path d="M-14 -10 v20 M-4 -12 v24 M6 -12 v24" stroke="#E3D7C2" stroke-width="2"/><circle cx="-20" cy="-2" r="3" fill="#2B2147"/></g>`; };
// the nest among the hanging mangoes in the tree
const ffTree = (t, w, h) => ffBg(w, h, "#CFEAF8") + `<ellipse cx="0" cy="-60" rx="${w * .6}" ry="120" fill="#3E9E5A"/><ellipse cx="-60" cy="-90" rx="120" ry="60" fill="#58B56C"/>` + TF(10, -40, .8, leafNest(t)) + TF(-110, 10, .9, mangoHang(.9, "g")) + TF(110, 20, .9, mangoHang(.8, "y")) + `<path d="M0 60 V${h / 2}" stroke="#7A5230" stroke-width="22"/>`;

/* ---------- the dare for EP16: the three picture cards (a fish · a frog · a lizard), each big and cute; and the three Part-1 recap pictures ---------- */
PIC.fish15 = (t = 0) => `<rect x="-200" y="-160" width="400" height="320" fill="#BDEBF5"/>${[0, 1, 2].map((i) => `<circle cx="${-120 + i * 110}" cy="${60 - i * 50}" r="${6 + 3 * i}" fill="none" stroke="#fff" stroke-width="3"/>`).join("")}<g transform="translate(-10 10)"><path d="M70 0 L130 -46 L120 0 L130 46z" fill="#FF9838" stroke="#C4581E" stroke-width="5"/><ellipse rx="96" ry="60" fill="#FFB36B" stroke="#C4581E" stroke-width="5"/><path d="M-20 -58 Q10 -96 40 -56" fill="#FF9838" stroke="#C4581E" stroke-width="4"/><circle cx="-52" cy="-12" r="14" fill="#fff"/><circle cx="-56" cy="-12" r="8" fill="#2B2147"/><path d="M-80 18 q12 8 22 0" stroke="#C4581E" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M-10 -30 q14 30 0 60 M20 -36 q14 36 0 72" stroke="#F28A3A" stroke-width="4" fill="none"/></g>`;
PIC.frog15 = (t = 0) => `<rect x="-200" y="-160" width="400" height="320" fill="#DFF3D2"/><ellipse cx="0" cy="110" rx="170" ry="40" fill="#58B56C"/><g transform="translate(0 30)"><ellipse cx="0" cy="30" rx="110" ry="74" fill="#6CC36E" stroke="#2F8048" stroke-width="5"/><path d="M-100 60 q-40 30 -10 50 h50 M100 60 q40 30 10 50 h-50" fill="#6CC36E" stroke="#2F8048" stroke-width="5"/><circle cx="-50" cy="-40" r="34" fill="#6CC36E" stroke="#2F8048" stroke-width="5"/><circle cx="50" cy="-40" r="34" fill="#6CC36E" stroke="#2F8048" stroke-width="5"/><circle cx="-50" cy="-42" r="18" fill="#fff"/><circle cx="50" cy="-42" r="18" fill="#fff"/><circle cx="-46" cy="-40" r="10" fill="#2B2147"/><circle cx="54" cy="-40" r="10" fill="#2B2147"/><path d="M-50 20 Q0 54 50 20" stroke="#2F8048" stroke-width="6" fill="none" stroke-linecap="round"/><ellipse cx="-74" cy="10" rx="12" ry="8" fill="#FF9F8A" opacity=".7"/><ellipse cx="74" cy="10" rx="12" ry="8" fill="#FF9F8A" opacity=".7"/></g>`;
PIC.liz15 = (t = 0) => `<rect x="-200" y="-160" width="400" height="320" fill="#FFF0D6"/><rect x="-200" y="60" width="400" height="100" fill="#E3CFAE"/><g transform="translate(0 40)"><path d="M60 10 Q140 20 170 -20 Q150 30 70 34z" fill="#C9B48F" stroke="#8A7454" stroke-width="4"/><ellipse cx="0" cy="10" rx="90" ry="34" fill="#D9C49E" stroke="#8A7454" stroke-width="5"/><path d="M-60 30 l-20 30 M-20 36 l-6 30 M30 36 l10 30 M60 30 l26 26" stroke="#8A7454" stroke-width="10" stroke-linecap="round"/><ellipse cx="-104" cy="-6" rx="48" ry="30" fill="#D9C49E" stroke="#8A7454" stroke-width="5"/><circle cx="-118" cy="-16" r="10" fill="#fff"/><circle cx="-120" cy="-16" r="6" fill="#2B2147"/><path d="M-148 4 q10 6 18 0" stroke="#8A7454" stroke-width="3" fill="none"/>${[...Array(8)].map((_, i) => `<circle cx="${-60 + i * 18}" cy="${4 + 6 * (i % 2)}" r="3" fill="#A8926C"/>`).join("")}</g>`;
// Part 2's "Last time..." pictures (from Part 1's art): the seed going into our pot; the journal page; the young plant in its pot
const recapPic = (i, t) => { let s = `<rect x="-520" y="-300" width="1040" height="600" fill="${["#FCE7CF", "#FFF3DC", "#DCEFFB"][i]}"/>`;
  if (i === 0) s += `<rect x="-520" y="140" width="1040" height="160" fill="#C9A87C"/>` + TF(0, 230, 2, pot15({})) + TF(-10, 230 + POTS * 2 - 40, .9, mangoSeed(1, 0)) + TF(220, 230 + POTS * 2 - 150, .8, hand15({ curl: .3 }), 120);
  else if (i === 1) s += pageLined(0, 0, 760, 520, { inner: T(-300, -200, "Day 1", 52, P.ink, { a: "start" }) + SENSE.map(([, word, col, line], j) => TF(-300, -90 + j * 120, 1, senseIcon(j, col)) + T(-240, -100 + j * 120, word, 28, col, { a: "start", ls: 2 }) + T(-240, -60 + j * 120, line, 40, "#3A3A5A", { a: "start", w: 600 })).join("") + TF(260, -180, .6, mangoSeed(1, -8)) });
  else s += `<rect x="-520" y="140" width="1040" height="160" fill="url(#f14Wood)"/>` + TF(0, 200, 1.6, pot15({}) + TF(0, POTS, 1, youngPlant15(t, { ...PLANTW4 })));
  return s; };
