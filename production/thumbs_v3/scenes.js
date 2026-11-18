/* One drawn scene per episode. Each function returns SVG for a 1280x720 canvas:
 * a toned/blurred topic background + ONE hero that is the episode's idea.
 * Keep clear: the title strip (x<TITLE_RIGHT, y 95-225), the banner (y>565) and the bottom-right 200x80. */
delete require.cache[require.resolve('./lib.js')];
const L = require('./lib.js');
const { K, Y, em, word, vgrad, rgrad, sky, spot, vignette, blurred, sticker, shadow, clouds, hdb, bokeh, stars, arrow, torch, beam, hand, thermo, ebal, ring } = L;

/* ---------- backgrounds ---------- */
const bgPark = () => blurred(sky([[0, '#4fb4ff'], [.6, '#bfeaff'], [1, '#e8fbff']]) + clouds([[230, 330, 1.2], [760, 300, 1], [1130, 90, 1.3]]) +
  hdb(60, 330, 120, 200, '#f6c9a8') + hdb(200, 290, 110, 240, '#f3e3b0') + hdb(520, 320, 130, 210, '#c9dcf6') + hdb(700, 350, 100, 180, '#f6c9a8') +
  `<ellipse cx="300" cy="560" rx="520" ry="110" fill="#6fcf6a"/><ellipse cx="1000" cy="570" rx="560" ry="120" fill="#5cc45c"/><rect y="520" width="1280" height="200" fill="#52b955"/>`) + vignette(.3);

const bgGarden = (gy = 430) => blurred(sky([[0, '#58b9ff'], [.55, '#c8eeff'], [1, '#e8fbff']]) + clouds([[200, 300, 1.1], [620, 260, .9]]) +
  `<ellipse cx="350" cy="${gy + 10}" rx="600" ry="70" fill="#78d36f"/><rect y="${gy - 14}" width="1280" height="40" fill="#5cc45c"/>`) +
  (() => { const [g, d] = vgrad([[0, '#8a5a36'], [1, '#4f2f1b']]); return `<defs>${d}</defs><rect y="${gy + 14}" width="1280" height="${720 - gy}" fill="url(#${g})"/><path d="M0 ${gy + 14} H1280" stroke="#3f8f3c" stroke-width="16"/>` + bokeh([[90, gy + 80, 9, .25], [300, gy + 120, 6, .25], [520, gy + 60, 8, .2], [760, gy + 110, 7, .25], [640, gy + 150, 5, .2], [1200, gy + 90, 8, .22]], '#2d1a0e'); })() + vignette(.3);

const bgLeafy = () => blurred(sky([[0, '#0f6b46'], [.5, '#1f9a5e'], [1, '#0c5a3c']]) + bokeh([[120, 300, 90, .18], [420, 520, 120, .14], [700, 260, 80, .18], [1000, 480, 140, .14], [1180, 180, 90, .2], [560, 120, 70, .14], [280, 640, 80, .16]], '#c8ff9a')) + spot(640, 380, 520, '#eaffb8', .35) + vignette(.5);

const bgDesert = () => blurred(sky([[0, '#ff9a3c'], [.45, '#ffc86b'], [.75, '#ffe6a8']]) + `<circle cx="330" cy="330" r="80" fill="#fff3b0" opacity=".9"/>` +
  `<path d="M0 470 Q250 400 520 470 T1280 440 V720 H0Z" fill="#f2b45f"/><path d="M0 530 Q400 470 760 540 T1280 520 V720 H0Z" fill="#e59a45"/>`) + vignette(.3);

const bgBody = (c1, c2, bc = '#fff') => blurred(sky([[0, c1], [1, c2]]) + bokeh([[150, 330, 70, .12], [420, 480, 110, .1], [760, 300, 60, .12], [1150, 520, 120, .1], [980, 120, 80, .1], [600, 640, 90, .1]], bc)) + vignette(.4);

const bgHawker = () => blurred(sky([[0, '#ff8a4c'], [.6, '#ffc36b'], [1, '#ffe2a6']]) +
  `<rect x="0" y="240" width="1280" height="60" fill="#c0392b"/><rect x="40" y="130" width="300" height="110" rx="10" fill="#fff3d6"/><rect x="380" y="130" width="300" height="110" rx="10" fill="#d9f2e6"/><rect x="720" y="130" width="300" height="110" rx="10" fill="#fff3d6"/><rect x="1060" y="130" width="300" height="110" rx="10" fill="#ffe0e0"/>` +
  `<rect x="0" y="300" width="1280" height="190" fill="#7a3d22" opacity=".55"/>` + bokeh([[180, 60, 26, .8], [520, 50, 26, .8], [860, 60, 26, .8], [1200, 50, 26, .8]], '#fff6c0') +
  `<rect y="490" width="1280" height="230" fill="#e9d2b0"/><rect y="490" width="1280" height="16" fill="#c9a877"/>`) + vignette(.35);

const bgLab = (c1 = '#2a8fd6', c2 = '#8fd3ff', table = '#f0e2c8') => blurred(sky([[0, c1], [.7, c2]]) +
  `<rect x="60" y="250" width="420" height="14" fill="#fff" opacity=".5"/>` + bokeh([[120, 215, 34, .35], [220, 205, 44, .3], [330, 220, 30, .35], [430, 212, 38, .3]], '#fff') +
  `<rect y="520" width="1280" height="200" fill="${table}"/><rect y="520" width="1280" height="14" fill="#cdb891"/>`) + vignette(.35);

const skyline = (y, c = '#0d1238', lit = '#ffd76b') => { let s = '', xs = [0, 90, 210, 300, 430, 560, 650, 780, 900, 1010, 1120, 1210], hs = [90, 150, 110, 180, 130, 160, 100, 170, 120, 150, 110, 140]; xs.forEach((x, i) => { s += `<rect x="${x}" y="${y - hs[i]}" width="${(xs[i + 1] || 1290) - x - 8}" height="${hs[i] + 200}" fill="${c}"/>`; for (let yy = y - hs[i] + 14; yy < y - 6; yy += 24) for (let xx = x + 12; xx < (xs[i + 1] || 1290) - 26; xx += 24) if ((xx * 7 + yy * 13 + i) % 5 < 2) s += `<rect x="${xx}" y="${yy}" width="10" height="11" fill="${lit}" opacity=".8"/>`; }); return s; };
const bgNight = () => sky([[0, '#070b2e'], [.6, '#16206b'], [1, '#2a3aa0']]) + stars(90, 11, 470) + blurred(skyline(560)) + vignette(.35);

const bgDark = (c1 = '#3b1d7a', c2 = '#12092e') => (() => { const [g, d] = rgrad([[0, c1], [1, c2]], .45, .6, .8); return `<defs>${d}</defs><rect width="1280" height="720" fill="url(#${g})"/>`; })() + `<rect y="560" width="1280" height="160" fill="#0c0620" opacity=".6"/>`;

const bgKitchen = () => blurred(sky([[0, '#bfe8e0'], [1, '#e8f7f2']]) + (() => { let s = ''; for (let x = 0; x < 1280; x += 80) s += `<line x1="${x}" y1="0" x2="${x}" y2="500" stroke="#fff" stroke-width="5" opacity=".8"/>`; for (let y = 20; y < 500; y += 80) s += `<line x1="0" y1="${y}" x2="1280" y2="${y}" stroke="#fff" stroke-width="5" opacity=".8"/>`; return s; })() +
  `<rect y="500" width="1280" height="220" fill="#5b6478"/><rect y="500" width="1280" height="18" fill="#3c4458"/>`) + vignette(.35);

const bgWall = (c1 = '#fff0c2', c2 = '#e8b56a', floor = '#5a3a6e') => (() => { const [g, d] = rgrad([[0, c1], [.75, c2], [1, '#8a5a3a']], .62, .45, .75); return `<defs>${d}</defs><rect width="1280" height="720" fill="url(#${g})"/>`; })() + `<rect y="545" width="1280" height="175" fill="${floor}"/><rect y="545" width="1280" height="10" fill="${K}" opacity=".35"/>` + vignette(.5);

/* ---------- small props ---------- */
const eq = (x, y, s = 120) => word('=', x, y, s, '#fff');

function kidHead(x, y, r, mouth = 'smile', skin = '#ffcf9e', hair = '#3a2a1e') {
  const m = mouth === 'open' ? `<ellipse cx="${x}" cy="${y + r * .42}" rx="${r * .34}" ry="${r * .3}" fill="#7a1f2b" stroke="${K}" stroke-width="6"/><ellipse cx="${x}" cy="${y + r * .56}" rx="${r * .2}" ry="${r * .12}" fill="#ff7a8a"/>`
    : mouth === 'wow' ? `<ellipse cx="${x}" cy="${y + r * .45}" rx="${r * .16}" ry="${r * .2}" fill="#7a1f2b" stroke="${K}" stroke-width="5"/>`
      : `<path d="M${x - r * .32} ${y + r * .3} Q${x} ${y + r * .68} ${x + r * .32} ${y + r * .3}" fill="#fff" stroke="${K}" stroke-width="6" stroke-linejoin="round"/>`;
  return `<circle cx="${x - r * .96}" cy="${y + r * .05}" r="${r * .18}" fill="${skin}" stroke="${K}" stroke-width="6"/><circle cx="${x + r * .96}" cy="${y + r * .05}" r="${r * .18}" fill="${skin}" stroke="${K}" stroke-width="6"/>
  <circle cx="${x}" cy="${y}" r="${r}" fill="${skin}" stroke="${K}" stroke-width="7"/>
  <path d="M${x - r * 1.02} ${y - r * .1} Q${x - r * 1.05} ${y - r * 1.12} ${x} ${y - r * 1.1} Q${x + r * 1.05} ${y - r * 1.12} ${x + r * 1.02} ${y - r * .1} Q${x + r * .6} ${y - r * .62} ${x + r * .1} ${y - r * .55} Q${x - r * .5} ${y - r * .5} ${x - r * 1.02} ${y - r * .1}Z" fill="${hair}" stroke="${K}" stroke-width="7" stroke-linejoin="round"/>
  <ellipse cx="${x - r * .36}" cy="${y - r * .02}" rx="${r * .11}" ry="${r * .15}" fill="${K}"/><ellipse cx="${x + r * .36}" cy="${y - r * .02}" rx="${r * .11}" ry="${r * .15}" fill="${K}"/>
  <circle cx="${x - r * .32}" cy="${y - r * .07}" r="${r * .04}" fill="#fff"/><circle cx="${x + r * .4}" cy="${y - r * .07}" r="${r * .04}" fill="#fff"/>
  <ellipse cx="${x - r * .6}" cy="${y + r * .3}" rx="${r * .16}" ry="${r * .1}" fill="#ff9a8a" opacity=".7"/><ellipse cx="${x + r * .6}" cy="${y + r * .3}" rx="${r * .16}" ry="${r * .1}" fill="#ff9a8a" opacity=".7"/>${m}`;
}
// torso with an "x-ray window" so we can see inside; cx = centre, top = shoulder y
function torso(cx, top, w, h, shirt = '#3aa0ff') {
  const l = cx - w / 2, r = cx + w / 2;
  return `<path d="M${l} ${top + 50} Q${l} ${top} ${l + 60} ${top} H${r - 60} Q${r} ${top} ${r} ${top + 50} V${top + h} H${l}Z" fill="${shirt}" stroke="${K}" stroke-width="7" stroke-linejoin="round"/>
  <rect x="${cx - 26}" y="${top - 26}" width="52" height="40" fill="#ffcf9e" stroke="${K}" stroke-width="7"/>
  <rect x="${l + 46}" y="${top + 22}" width="${w - 92}" height="${h - 22}" rx="40" fill="#ffe9ef" stroke="${K}" stroke-width="6"/>`;
}
const tube = (d, c, w, extra = '') => `<path d="${d}" fill="none" stroke="${K}" stroke-width="${w + 12}" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" ${extra}/>`;

function leafShape(x, y, w, h, rot, fill, veins = '') {
  return `<g transform="translate(${x},${y}) rotate(${rot})"><path d="M0 ${-h / 2} C${w * .75} ${-h * .3} ${w * .7} ${h * .3} 0 ${h / 2} C${-w * .7} ${h * .3} ${-w * .75} ${-h * .3} 0 ${-h / 2}Z" fill="${fill}" stroke="${K}" stroke-width="7" stroke-linejoin="round"/>${veins}</g>`;
}

/* ---------- scenes ---------- */
const S = {};

// EP1  bike = body = tree : all are systems
S.systems = () => {
  const frame = (w, c) => `<g fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"><path d="M110 215 L215 215 L185 100 L330 100 L215 215 M110 215 L185 100 M330 100 L370 215 M330 100 L322 62 L366 50 M185 100 L180 78"/></g>`;
  const wheel = cx => `<circle cx="${cx}" cy="215" r="88" fill="rgba(255,255,255,.25)" stroke="${K}" stroke-width="24"/><circle cx="${cx}" cy="215" r="88" fill="none" stroke="#5b6480" stroke-width="10"/>` +
    [0, 30, 60, 90, 120, 150].map(a => `<line x1="${cx - 80 * Math.cos(a * Math.PI / 180)}" y1="${215 - 80 * Math.sin(a * Math.PI / 180)}" x2="${cx + 80 * Math.cos(a * Math.PI / 180)}" y2="${215 + 80 * Math.sin(a * Math.PI / 180)}" stroke="#dfe5f2" stroke-width="3"/>`).join('') + `<circle cx="${cx}" cy="215" r="12" fill="#dfe5f2" stroke="${K}" stroke-width="5"/>`;
  const bike = `<g transform="translate(22,236) scale(1.02)">${wheel(110)}${wheel(370)}${frame(30, K)}${frame(16, '#ff4b4b')}
    <path d="M110 205 L215 199 M110 225 L215 232" stroke="${K}" stroke-width="5" stroke-dasharray="9 6" fill="none"/>
    <circle cx="215" cy="215" r="27" fill="${Y}" stroke="${K}" stroke-width="7"/><circle cx="215" cy="215" r="8" fill="${K}"/>
    <path d="M215 215 L246 258" stroke="${K}" stroke-width="11" stroke-linecap="round"/><rect x="228" y="252" width="44" height="15" rx="6" fill="#444c66" stroke="${K}" stroke-width="5"/>
    <rect x="140" y="62" width="84" height="24" rx="12" fill="${K}"/><circle cx="352" cy="44" r="11" fill="${Y}" stroke="${K}" stroke-width="5"/></g>`;
  const kid = `<g transform="translate(28,0)">
    <rect x="652" y="468" width="38" height="84" rx="14" fill="#2a3a7b" stroke="${K}" stroke-width="7"/><rect x="698" y="468" width="38" height="84" rx="14" fill="#2a3a7b" stroke="${K}" stroke-width="7"/>
    <rect x="606" y="360" width="34" height="112" rx="17" fill="#ffcf9e" stroke="${K}" stroke-width="7" transform="rotate(14 623 366)"/><rect x="748" y="360" width="34" height="112" rx="17" fill="#ffcf9e" stroke="${K}" stroke-width="7" transform="rotate(-14 765 366)"/>
    <rect x="632" y="346" width="124" height="140" rx="30" fill="#31c48d" stroke="${K}" stroke-width="7"/>
    ${em('🫀', 694, 414, 70)}${kidHead(694, 292, 56)}</g>`;
  const tree = `<g><path d="M1058 560 Q1070 440 1052 330 L1112 330 Q1100 440 1120 560Z" fill="#9a6338" stroke="${K}" stroke-width="7" stroke-linejoin="round"/>
    <path d="M1058 556 Q1010 560 985 572 M1120 556 Q1160 560 1190 572" stroke="${K}" stroke-width="7" fill="none" stroke-linecap="round"/>
    <g stroke="${K}" stroke-width="7" fill="#3fbf5f"><circle cx="1000" cy="300" r="76"/><circle cx="1170" cy="300" r="76"/><circle cx="1085" cy="215" r="100"/><circle cx="1085" cy="320" r="80"/></g>
    <g fill="#3fbf5f"><circle cx="1000" cy="300" r="70"/><circle cx="1170" cy="300" r="70"/><circle cx="1085" cy="215" r="94"/><circle cx="1085" cy="320" r="76"/></g>
    <g fill="#7be08a" opacity=".8"><circle cx="1050" cy="180" r="34"/><circle cx="980" cy="275" r="24"/><circle cx="1150" cy="265" r="26"/></g></g>`;
  return bgPark() + spot(640, 400, 560, '#fff', .45) + sticker(bike) + sticker(kid) + sticker(tree) + eq(548, 440, 104) + eq(896, 440, 104);
};

// EP2  the 3-part team: leaf, stem, roots
S.plantTeam = () => {
  const gy = 430, px = 1075;
  const roots = `<g fill="none" stroke-linecap="round">${[[K, 22], ['#f6e3b4', 10]].map(([c, w]) => `<g stroke="${c}"><path d="M${px} ${gy - 6} V${gy + 128}" stroke-width="${w + 6}"/><path d="M${px} ${gy + 30} Q${px - 70} ${gy + 50} ${px - 120} ${gy + 110} M${px} ${gy + 30} Q${px + 70} ${gy + 50} ${px + 124} ${gy + 100} M${px} ${gy + 70} Q${px - 40} ${gy + 100} ${px - 62} ${gy + 132} M${px} ${gy + 70} Q${px + 44} ${gy + 100} ${px + 66} ${gy + 130} M${px - 76} ${gy + 62} Q${px - 130} ${gy + 60} ${px - 160} ${gy + 76} M${px + 80} ${gy + 58} Q${px + 130} ${gy + 54} ${px + 160} ${gy + 72}" stroke-width="${w}"/></g>`).join('')}</g>`;
  const vein = `<path d="M0 -70 V70" stroke="#1f7a3a" stroke-width="5" fill="none"/>`;
  const plant = `<path d="M${px} ${gy} V150" stroke="${K}" stroke-width="34" stroke-linecap="round"/><path d="M${px} ${gy} V150" stroke="#4fc45f" stroke-width="20" stroke-linecap="round"/>
    ${leafShape(px - 92, 330, 86, 190, -62, '#3fbf5f', vein)}${leafShape(px + 92, 300, 86, 190, 62, '#3fbf5f', vein)}${leafShape(px - 76, 215, 66, 150, -55, '#58d06e', vein)}${leafShape(px + 74, 190, 66, 150, 55, '#58d06e', vein)}
    <g transform="translate(${px},112)">${[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(a => `<ellipse cx="0" cy="-62" rx="18" ry="34" fill="${Y}" stroke="${K}" stroke-width="6" transform="rotate(${a})"/>`).join('')}<circle r="40" fill="#8a5326" stroke="${K}" stroke-width="7"/></g>`;
  const bub = (x, n, inner, tx, ty) => `<line x1="${x}" y1="400" x2="${tx}" y2="${ty}" stroke="${K}" stroke-width="12" stroke-linecap="round"/><line x1="${x}" y1="400" x2="${tx}" y2="${ty}" stroke="#fff" stroke-width="5" stroke-linecap="round"/>` +
    sticker(`<circle cx="${x}" cy="400" r="104" fill="#fff" stroke="${K}" stroke-width="8"/><clipPath id="cb${n}"><circle cx="${x}" cy="400" r="99"/></clipPath><g clip-path="url(#cb${n})">${inner}</g>
    <circle cx="${x - 78}" cy="322" r="38" fill="${Y}" stroke="${K}" stroke-width="7"/><text x="${x - 78}" y="341" font-size="54" font-weight="700" text-anchor="middle" fill="${K}">${n}</text>`);
  const b1 = `<rect x="56" y="296" width="210" height="210" fill="#cdeeff"/>${leafShape(170, 420, 120, 200, 35, '#3fbf5f', `<path d="M0 -92 V92 M0 -50 L34 -70 M0 -10 L44 -34 M0 30 L40 6 M0 -50 L-34 -70 M0 -10 L-44 -34 M0 30 L-40 6" stroke="#1f7a3a" stroke-width="6" fill="none" stroke-linecap="round"/>`)}${em('☀️', 108, 340, 74)}`;
  const b2 = `<rect x="300" y="296" width="230" height="210" fill="#e9f8d8"/><rect x="386" y="290" width="68" height="220" fill="#4fc45f" stroke="${K}" stroke-width="7"/>${arrow(420, 486, 420, 322, { c: '#2f9bff', w: 16 })}`;
  const b3 = `<rect x="560" y="296" width="230" height="210" fill="#8a5a36"/><g fill="none" stroke-linecap="round">${[[K, 24], ['#f6e3b4', 12]].map(([c, w]) => `<path d="M670 290 V400 M670 340 Q620 370 598 440 M670 340 Q724 370 746 430 M670 400 Q650 440 640 490 M670 400 Q694 440 706 490" stroke="${c}" stroke-width="${w}"/>`).join('')}</g>${em('💧', 610, 345, 46)}${em('💧', 738, 480, 42)}`;
  return bgGarden(gy) + spot(1075, 300, 330, '#fff', .5) + roots + sticker(plant) +
    bub(170, 1, b1, px - 120, 300) + bub(420, 2, b2, px - 8, 380) + bub(670, 3, b3, px - 90, gy + 80);
};

// EP3  read a leaf: parallel veins vs net veins
S.leafVeins = () => {
  let pv = ''; for (const k of [-.72, -.48, -.24, 0, .24, .48, .72]) pv += `<path d="M0 -236 Q${k * 150} 0 0 236" fill="none" stroke="#d8ffb0" stroke-width="${k === 0 ? 8 : 5}" stroke-linecap="round"/>`;
  const blade = `<g transform="translate(300,405) rotate(58)"><path d="M0 -250 C92 -130 92 130 0 250 C-92 130 -92 -130 0 -250Z" fill="#35b55a" stroke="${K}" stroke-width="8" stroke-linejoin="round"/>${pv}</g>`;
  let nv = `<path d="M0 -205 V230" stroke="#d8ffb0" stroke-width="10" stroke-linecap="round"/>`;
  [-140, -80, -20, 40, 100].forEach((yy, i) => { const w = [100, 140, 150, 130, 90][i]; nv += `<path d="M0 ${yy} Q${w * .5} ${yy - 30} ${w} ${yy - 62} M0 ${yy} Q${-w * .5} ${yy - 30} ${-w} ${yy - 62}" fill="none" stroke="#d8ffb0" stroke-width="6" stroke-linecap="round"/>`;
    nv += `<path d="M${w * .45} ${yy - 24} L${w * .55} ${yy + 22} M${-w * .45} ${yy - 24} L${-w * .55} ${yy + 22} M${w * .75} ${yy - 44} L${w * .8} ${yy - 6} M${-w * .75} ${yy - 44} L${-w * .8} ${yy - 6}" fill="none" stroke="#d8ffb0" stroke-width="3.5" stroke-linecap="round"/>`; });
  const broad = `<g transform="translate(985,300) rotate(14)"><path d="M0 -215 C150 -190 215 -20 150 110 C110 190 40 215 0 240 C-40 215 -110 190 -150 110 C-215 -20 -150 -190 0 -215Z" fill="#2fae52" stroke="${K}" stroke-width="8" stroke-linejoin="round"/><path d="M0 230 V292" stroke="${K}" stroke-width="20" stroke-linecap="round"/><path d="M0 230 V290" stroke="#2fae52" stroke-width="8" stroke-linecap="round"/>${nv}</g>`;
  // magnifier showing the net close up
  let net = ''; const pts = [[-70, -50], [-10, -72], [48, -44], [78, 8], [40, 60], [-22, 72], [-74, 30], [-20, -8], [24, 14]];
  [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 0], [0, 7], [1, 7], [7, 8], [8, 2], [8, 3], [8, 4], [7, 6], [7, 5], [8, 5]].forEach(([a, b]) => net += `<line x1="${pts[a][0] * 1.3}" y1="${pts[a][1] * 1.3}" x2="${pts[b][0] * 1.3}" y2="${pts[b][1] * 1.3}" stroke="#eaffc8" stroke-width="7" stroke-linecap="round"/>`);
  const mag = `<g transform="translate(770,420)"><path d="M-78 78 L-150 150" stroke="${K}" stroke-width="40" stroke-linecap="round"/><path d="M-80 80 L-148 148" stroke="#ff8a3c" stroke-width="24" stroke-linecap="round"/>
    <circle r="112" fill="#27a049" stroke="${K}" stroke-width="26"/><clipPath id="mg"><circle r="104"/></clipPath><g clip-path="url(#mg)"><path d="M-130 30 L130 -40" stroke="#eaffc8" stroke-width="13"/>${net}</g><circle r="108" fill="none" stroke="#e9eef8" stroke-width="12"/><path d="M-70 -50 Q-40 -84 0 -86" stroke="#fff" stroke-width="9" fill="none" stroke-linecap="round" opacity=".8"/></g>`;
  return bgLeafy() + sticker(blade) + sticker(broad) + sticker(mag);
};

// EP4  plants with superpowers: cactus spines are leaves
S.cactus = () => {
  let ribs = '', sp = '';
  for (const x of [1010, 1045, 1080]) ribs += `<line x1="${x}" y1="120" x2="${x}" y2="540" stroke="#2a9a50" stroke-width="5"/>`;
  const spine = (x, y, r = 0) => `<g transform="translate(${x},${y}) rotate(${r})" stroke-linecap="round"><path d="M0 0 L-17 -13 M0 0 L17 -13 M0 0 L0 -21" stroke="#1b1b3a" stroke-width="10"/><path d="M0 0 L-17 -13 M0 0 L17 -13 M0 0 L0 -21" stroke="#fff" stroke-width="5"/></g>`;
  [[1010, 150], [1080, 150], [1045, 210], [1010, 440], [1080, 440], [1045, 500], [1010, 520], [1080, 380]].forEach(([x, y]) => sp += spine(x, y));
  [[972, 200, -70], [972, 330, -70], [972, 470, -70], [1118, 180, 70], [1118, 300, 70], [1118, 480, 70], [1045, 82, 0], [870, 250, -60], [1232, 190, 60], [1195, 150, 0], [905, 205, 0]].forEach(([x, y, r]) => sp += spine(x, y, r));
  const cape = `<path d="M985 205 Q880 300 760 300 Q820 380 770 470 Q900 470 990 380Z" fill="#ff3b4e" stroke="${K}" stroke-width="7" stroke-linejoin="round"/>`;
  const cactus = `${cape}<g stroke="${K}" stroke-width="8" stroke-linejoin="round" fill="#3cc36a">
      <path d="M975 400 H930 Q875 400 875 345 V268 Q875 240 905 240 Q935 240 935 268 V335 Q935 345 945 345 H975Z"/>
      <path d="M1115 350 H1160 Q1225 350 1225 290 V205 Q1225 178 1195 178 Q1165 178 1165 205 V282 Q1165 292 1155 292 H1115Z"/>
      <rect x="972" y="80" width="146" height="500" rx="73"/></g>${ribs}
    <rect x="978" y="232" width="134" height="54" rx="18" fill="${K}"/><ellipse cx="1015" cy="259" rx="15" ry="13" fill="#fff"/><ellipse cx="1076" cy="259" rx="15" ry="13" fill="#fff"/><circle cx="1018" cy="260" r="6" fill="${K}"/><circle cx="1079" cy="260" r="6" fill="${K}"/>
    <path d="M1012 318 Q1045 356 1082 314" fill="#fff" stroke="${K}" stroke-width="7" stroke-linejoin="round"/>`;
  // carrot (storage root) in a cut-away of soil
  const carrot = `<g><path d="M70 440 H470 V560 H70Z" fill="#7b4a2a" stroke="${K}" stroke-width="7"/><path d="M70 440 H470" stroke="#58c45c" stroke-width="20"/>
    <path d="M225 432 Q270 420 315 432 Q300 520 270 556 Q240 520 225 432Z" fill="#ff8a1f" stroke="${K}" stroke-width="7" stroke-linejoin="round"/><path d="M240 462 H268 M258 490 H292 M256 516 H280" stroke="#c9600a" stroke-width="5" stroke-linecap="round"/>
    <g stroke="${K}" stroke-width="7" fill="#45c860" stroke-linejoin="round"><path d="M268 432 Q220 380 190 300 Q250 330 270 400Z"/><path d="M270 432 Q262 350 280 262 Q318 340 282 432Z"/><path d="M274 432 Q320 380 372 316 Q356 400 286 436Z"/></g></g>`;
  // climber winding up a stick
  const climber = `<g><rect x="585" y="250" width="22" height="312" rx="8" fill="#b9814a" stroke="${K}" stroke-width="7"/>
    <path d="M596 556 C540 520 660 500 596 460 C536 424 660 404 596 364 C540 330 656 312 598 276" fill="none" stroke="${K}" stroke-width="20" stroke-linecap="round"/><path d="M596 556 C540 520 660 500 596 460 C536 424 660 404 596 364 C540 330 656 312 598 276" fill="none" stroke="#45c860" stroke-width="9" stroke-linecap="round"/>
    ${leafShape(540, 500, 44, 78, -70, '#45c860')}${leafShape(656, 452, 44, 78, 70, '#45c860')}${leafShape(540, 398, 44, 78, -70, '#45c860')}${leafShape(654, 344, 44, 78, 70, '#45c860')}${leafShape(560, 286, 40, 70, -50, '#58d06e')}</g>`;
  return bgDesert() + spot(1045, 300, 380, '#fff', .5) + sticker(carrot) + sticker(climber) + `<g transform="translate(-24,0)">${sticker(cactus)}${sp}${ring(905, 214, 56)}</g>` + arrow(742, 292, 818, 250, { c: Y, w: 18 });
};

// EP5  five systems in one body
S.bodySystems = () => {
  const cx = 1050;
  const body = `<g stroke="${K}" stroke-width="8" stroke-linejoin="round" fill="#ffd9b8">
    <rect x="${cx - 190}" y="210" width="62" height="270" rx="31" transform="rotate(9 ${cx - 160} 215)"/><rect x="${cx + 128}" y="210" width="62" height="270" rx="31" transform="rotate(-9 ${cx + 160} 215)"/>
    <rect x="${cx - 100}" y="440" width="88" height="200" rx="30"/><rect x="${cx + 12}" y="440" width="88" height="200" rx="30"/>
    <path d="M${cx - 140} 240 Q${cx - 140} 186 ${cx - 80} 186 H${cx + 80} Q${cx + 140} 186 ${cx + 140} 240 V470 Q${cx + 140} 500 ${cx + 100} 500 H${cx - 100} Q${cx - 140} 500 ${cx - 140} 470Z"/>
    <rect x="${cx - 28}" y="150" width="56" height="48"/></g>`;
  const bone = (x1, y1, x2, y2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${K}" stroke-width="24" stroke-linecap="round"/><line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#fff" stroke-width="13" stroke-linecap="round"/>`;
  const organs = `${bone(cx - 176, 250, cx - 204, 440)}${bone(cx + 176, 250, cx + 204, 440)}${bone(cx - 56, 510, cx - 56, 600)}${bone(cx + 56, 510, cx + 56, 600)}
    <path d="M${cx} 196 V250" stroke="#ff9db0" stroke-width="14" stroke-linecap="round"/>
    <g stroke="${K}" stroke-width="6" fill="#ff9db0"><path d="M${cx - 12} 232 Q${cx - 86} 222 ${cx - 96} 330 Q${cx - 50} 352 ${cx - 12} 318Z"/><path d="M${cx + 12} 232 Q${cx + 86} 222 ${cx + 96} 330 Q${cx + 50} 352 ${cx + 12} 318Z"/></g>
    <path d="M${cx + 14} 276 q-26 -30 -46 -4 q-14 28 46 66 q60 -38 46 -66 q-20 -26 -46 4Z" fill="#ff2e4d" stroke="${K}" stroke-width="6" stroke-linejoin="round"/>
    <path d="M${cx - 40} 356 Q${cx + 70} 336 ${cx + 62} 392 Q${cx + 40} 418 ${cx - 10} 398 Q${cx - 44} 390 ${cx - 40} 356Z" fill="#ffb14a" stroke="${K}" stroke-width="6" stroke-linejoin="round"/>
    ${tube(`M${cx - 76} 420 H${cx + 76} V478 H${cx - 76} V448 H${cx + 40}`, '#f08a5a', 13)}`;
  const face = kidHead(cx, 96, 66);
  const badge = (x, inner) => sticker(`<circle cx="${x}" cy="398" r="66" fill="#fff" stroke="${K}" stroke-width="8"/>${inner}`);
  const stomach = x => `<path d="M${x - 24} ${370} Q${x - 20} 396 ${x - 4} 392 Q${x + 44} 366 ${x + 40} 412 Q${x + 26} 446 ${x - 14} 434 Q${x - 44} 424 ${x - 36} 398" fill="#ffb14a" stroke="${K}" stroke-width="6" stroke-linejoin="round"/>`;
  return bgBody('#2b6fe0', '#22c1c3') + spot(cx, 330, 380, '#fff', .55) + sticker(body + organs + face) +
    badge(110, em('🫁', 110, 400, 78)) + badge(262, em('🫀', 262, 400, 78)) + badge(414, em('🦴', 414, 400, 78)) + badge(566, em('💪', 566, 400, 78)) + badge(718, stomach(718));
};

// EP6  chicken rice: mouth -> gullet -> stomach
function chickenRice(x, y, s = 1) {
  return `<g transform="translate(${x},${y}) scale(${s})"><ellipse cx="0" cy="40" rx="240" ry="74" fill="#fff" stroke="${K}" stroke-width="8"/><ellipse cx="0" cy="34" rx="180" ry="50" fill="#e8eef8"/>
    <path d="M-150 30 Q-140 -86 -20 -92 Q90 -92 100 30 Q-20 62 -150 30Z" fill="#fffdf0" stroke="${K}" stroke-width="7" stroke-linejoin="round"/>
    <g fill="#e8dcb8">${[[-90, -20], [-50, -50], [-10, -20], [30, -56], [50, -10], [-60, 10], [0, 12], [-110, 14]].map(([a, b]) => `<ellipse cx="${a}" cy="${b}" rx="9" ry="4.5" transform="rotate(${a} ${a} ${b})"/>`).join('')}</g>
    ${[0, 1, 2, 3].map(i => `<g transform="translate(${28 + i * 36},${-34 + i * 9}) rotate(18)"><rect x="-17" y="-48" width="34" height="100" rx="14" fill="#fff0d2" stroke="${K}" stroke-width="6"/><rect x="-17" y="-48" width="34" height="26" rx="12" fill="#f2c257" stroke="${K}" stroke-width="6"/></g>`).join('')}
    ${[[-176, 26], [-150, 50], [-118, 62]].map(([a, b]) => `<ellipse cx="${a}" cy="${b}" rx="24" ry="13" fill="#b8ec8a" stroke="${K}" stroke-width="5"/><ellipse cx="${a}" cy="${b}" rx="12" ry="6" fill="#e2f8c8"/>`).join('')}
    <ellipse cx="186" cy="56" rx="40" ry="19" fill="#fff" stroke="${K}" stroke-width="6"/><ellipse cx="186" cy="54" rx="27" ry="11" fill="#ff3b30"/></g>`;
}
S.digest1 = () => {
  const cx = 1010;
  const gullet = `M${cx} 318 V420`;
  const kid = `${torso(cx, 300, 330, 300, '#ff7b54')}
    ${tube(gullet, '#ff8fa8', 30)}
    <path d="M${cx - 6} 416 Q${cx + 110} 392 ${cx + 104} 478 Q${cx + 80} 548 ${cx - 10} 532 Q${cx - 92} 520 ${cx - 78} 462 Q${cx - 60} 436 ${cx - 6} 454Z" fill="#ff8fa8" stroke="${K}" stroke-width="8" stroke-linejoin="round"/>
    <path d="M${cx - 60} 492 Q${cx} 470 ${cx + 86} 488 Q${cx + 70} 536 ${cx - 8} 524 Q${cx - 56} 520 ${cx - 60} 492Z" fill="#ffe08a"/>
    <circle cx="${cx}" cy="372" r="15" fill="#fffdf0" stroke="${K}" stroke-width="5"/>
    ${kidHead(cx, 186, 118, 'open')}`;
  const path = `M420 352 Q600 262 ${cx - 190} 262`;
  const dots = `<path d="${path}" fill="none" stroke="${K}" stroke-width="26" stroke-linecap="round" stroke-dasharray="2 46"/><path d="${path}" fill="none" stroke="${Y}" stroke-width="15" stroke-linecap="round" stroke-dasharray="2 46"/>`;
  return bgHawker() + spot(cx, 330, 400, '#fff', .55) + sticker(chickenRice(300, 440, 1.05)) + sticker(kid) + dots + arrow(cx - 170, 262, cx - 62, 246, { c: Y, w: 20, bend: 0 }) + arrow(cx + 190, 400, cx + 190, 500, { c: Y, w: 18 });
};

// EP7  the 6.5 m tube: small intestine coiled inside you
S.digest2 = () => {
  const cx = 1010;
  let coil = `M${cx - 78} 372`; let dir = 1;
  for (let yy = 372; yy <= 516; yy += 36) { coil += ` H${cx + 78 * dir} ${yy < 516 ? `q${22 * dir} 18 0 36` : ''}`; dir = -dir; }
  const kid = `${torso(cx, 300, 340, 300, '#8a5cf6')}
    ${tube(`M${cx - 122} 548 V352 Q${cx - 122} 330 ${cx - 96} 330 H${cx + 96} Q${cx + 122} 330 ${cx + 122} 352 V548`, '#d9746a', 26)}
    ${tube(coil, '#ff9db6', 20)}
    ${kidHead(cx, 186, 118, 'wow')}`;
  // tape measure pulled out across the picture
  let ticks = ''; for (let i = 0; i <= 26; i++) { const x = 250 + i * 21; ticks += `<line x1="${x}" y1="352" x2="${x}" y2="${i % 4 ? 372 : 388}" stroke="${K}" stroke-width="${i % 4 ? 4 : 6}"/>`; }
  let nums = ''; [1, 2, 3, 4, 5, 6].forEach(n => nums += `<text x="${250 + n * 84}" y="424" font-size="34" font-weight="700" text-anchor="middle" fill="${K}">${n}</text>`);
  const tape = `<g><rect x="232" y="352" width="590" height="84" fill="${Y}" stroke="${K}" stroke-width="8"/>${ticks}${nums}
    <rect x="812" y="340" width="26" height="108" rx="6" fill="#c9d2e6" stroke="${K}" stroke-width="7"/>
    <rect x="60" y="296" width="196" height="196" rx="40" fill="#ff4b4b" stroke="${K}" stroke-width="8"/><circle cx="158" cy="394" r="58" fill="#fff" stroke="${K}" stroke-width="7"/><circle cx="158" cy="394" r="16" fill="${K}"/></g>`;
  return bgBody('#ff6fa3', '#ffb86b') + spot(cx, 340, 400, '#fff', .55) + `<g transform="translate(0,44)">${sticker(tape)}</g>` + sticker(kid) + word('6.5 m', 540, 356, 100, '#fff');
};

// EP8  is air nothing? upside-down cup pushed into water stays full of air
S.airMatter = () => {
  const tank = `<rect x="620" y="262" width="590" height="296" rx="14" fill="#dff4ff" opacity=".55"/>
    <rect x="624" y="318" width="582" height="238" fill="#2f9bff" opacity=".8"/><rect x="624" y="318" width="582" height="14" fill="#9bd4ff"/>
    <path d="M826 556 V352 Q826 334 846 334 H1004 Q1024 334 1024 352 V556" fill="#f4fbff" stroke="none"/>
    <rect x="834" y="514" width="182" height="42" fill="#2f9bff" opacity=".85"/><rect x="834" y="514" width="182" height="9" fill="#9bd4ff"/>
    <path d="M826 556 V352 Q826 334 846 334 H1004 Q1024 334 1024 352 V556" fill="none" stroke="${K}" stroke-width="22" stroke-linejoin="round" stroke-linecap="round"/>
    <path d="M826 556 V352 Q826 334 846 334 H1004 Q1024 334 1024 352 V556" fill="none" stroke="#fff" stroke-width="9" stroke-linejoin="round" stroke-linecap="round"/>
    <path d="M880 372 q14 -22 42 -16 q30 -10 44 14 q18 22 -4 40 q-12 20 -42 12 q-32 6 -40 -18 q-14 -16 0 -32Z" fill="#fff" stroke="${K}" stroke-width="6" stroke-linejoin="round"/><path d="M900 384 q16 8 30 -4 M912 406 q18 -6 34 4" stroke="#b9c2d8" stroke-width="4" fill="none"/>
    ${bokeh([[700, 430, 12, .7], [730, 380, 8, .7], [690, 500, 9, .6], [1110, 400, 13, .7], [1140, 470, 9, .7], [1090, 510, 7, .6]], '#fff')}
    <rect x="620" y="262" width="590" height="296" rx="14" fill="none" stroke="${K}" stroke-width="9"/>`;
  const push = hand(925, 250, .95, 90, '#ffcf9e', 60);
  return bgLab() + spot(915, 400, 420, '#fff', .55) + sticker(tank) + sticker(push) + sticker(em('🤔', 180, 400, 250)) +
    word('AIR?', 468, 330, 104, '#fff') + arrow(500, 372, 846, 432, { c: Y, w: 20, bend: -46 });
};

// EP9  the squeeze test: only the gas squeezes
S.squeeze = () => {
  const row = (y, fill, kind, ok) => {
    const px = ok ? 610 : 400;           // piston position
    let inside = '';
    if (kind === 'solid') inside = `<rect x="${px + 14}" y="${y - 30}" width="${800 - px - 20}" height="60" fill="#8f97ad"/>` + [[470, -8], [560, 10], [650, -12], [740, 8]].map(([a, b]) => `<circle cx="${a}" cy="${y + b}" r="7" fill="#6b7390"/>`).join('');
    if (kind === 'liquid') inside = `<rect x="${px + 14}" y="${y - 30}" width="${800 - px - 20}" height="60" fill="#2f9bff"/>`;
    if (kind === 'gas') { inside = `<rect x="${px + 14}" y="${y - 30}" width="${800 - px - 20}" height="60" fill="#e9fbff"/>`; for (let i = 0; i < 26; i++) inside += `<circle cx="${px + 26 + (i * 37) % 160}" cy="${y - 22 + (i * 23) % 46}" r="5.5" fill="#ff8a3c"/>`; }
    return `<rect x="340" y="${y - 36}" width="470" height="72" rx="10" fill="#fff" opacity=".9"/>${inside}
      <rect x="340" y="${y - 36}" width="470" height="72" rx="10" fill="none" stroke="${K}" stroke-width="8"/>
      <rect x="806" y="${y - 13}" width="40" height="26" fill="#fff" stroke="${K}" stroke-width="7"/><rect x="840" y="${y - 20}" width="24" height="40" rx="6" fill="#ff4b4b" stroke="${K}" stroke-width="7"/>
      <rect x="${px - 226}" y="${y - 9}" width="230" height="18" fill="#c9d2e6" stroke="${K}" stroke-width="6"/><rect x="${px - 8}" y="${y - 32}" width="22" height="64" rx="5" fill="#444c66" stroke="${K}" stroke-width="6"/>
      <rect x="${px - 240}" y="${y - 40}" width="20" height="80" rx="8" fill="#c9d2e6" stroke="${K}" stroke-width="7"/>`;
  };
  const ys = [286, 394, 502];
  const syr = ys.map((y, i) => row(y, '', ['solid', 'liquid', 'gas'][i], i === 2)).join('');
  const icons = em('🪨', 86, ys[0], 84) + em('💧', 86, ys[1], 84) + em('🎈', 86, ys[2] - 6, 84);
  return bgLab('#6a3de8', '#b79bff', '#efe6ff') + spot(640, 400, 560, '#fff', .5) + sticker(syr) + sticker(icons) +
    sticker(em('❌', 960, ys[0], 84) + em('❌', 960, ys[1], 84) + em('✅', 960, ys[2], 96)) +
    arrow(150, ys[2] + 4, 352, ys[2] + 4, { c: '#ff3b3b', w: 22 }) + sticker(em('😲', 1140, 396, 190));
};

// EP10  weigh air: flat ball vs pumped ball
function basketball(x, y, r, flat = false) {
  if (flat) return `<g transform="translate(${x},${y})"><path d="M${-r} ${r * .22} Q${-r * .9} ${-r * .34} ${-r * .3} ${-r * .2} Q0 ${-r * .02} ${r * .3} ${-r * .22} Q${r * .92} ${-r * .34} ${r} ${r * .22} Q0 ${r * .5} ${-r} ${r * .22}Z" fill="#ff8a2a" stroke="${K}" stroke-width="8" stroke-linejoin="round"/>
    <path d="M${-r * .6} ${-r * .2} Q${-r * .4} ${r * .1} ${-r * .55} ${r * .33} M${r * .6} ${-r * .2} Q${r * .4} ${r * .1} ${r * .55} ${r * .33} M0 ${-r * .08} V${r * .4}" stroke="${K}" stroke-width="6" fill="none" stroke-linecap="round"/></g>`;
  return `<g transform="translate(${x},${y})"><circle r="${r}" fill="#ff8a2a" stroke="${K}" stroke-width="8"/><path d="M${-r} 0 H${r} M0 ${-r} V${r} M${-r * .72} ${-r * .68} Q${-r * .2} 0 ${-r * .72} ${r * .68} M${r * .72} ${-r * .68} Q${r * .2} 0 ${r * .72} ${r * .68}" stroke="${K}" stroke-width="7" fill="none"/><ellipse cx="${-r * .4}" cy="${-r * .5}" rx="${r * .22}" ry="${r * .12}" fill="#fff" opacity=".45" transform="rotate(-35 ${-r * .4} ${-r * .5})"/></g>`;
}
S.weighAir = () => {
  const left = ebal(270, 452, 330, '586 g') + basketball(270, 420, 118, true);
  const right = ebal(790, 452, 330, '597 g') + basketball(790, 338, 116);
  const burst = `<g transform="translate(1100,300)"><polygon points="${Array.from({ length: 24 }, (_, i) => { const a = i * Math.PI / 12, r = i % 2 ? 100 : 136; return `${(r * Math.cos(a)).toFixed(1)},${(r * Math.sin(a)).toFixed(1)}`; }).join(' ')}" fill="#ff3b3b" stroke="${K}" stroke-width="8" stroke-linejoin="round"/></g>`;
  return bgLab('#0f9d8a', '#8ff0d0') + spot(640, 400, 560, '#fff', .5) + sticker(left) + sticker(right) + arrow(452, 330, 640, 330, { c: Y, w: 22 }) + em('💨', 540, 262, 76) + sticker(burst) + word('+11 g', 1100, 322, 66, '#fff');
};

// EP11  rock in, water up: displacement
S.rockVolume = () => {
  const cyl = (x, level, rock) => {
    const top = 246, bot = 548, w = 150, ly = bot - level;
    let t = ''; for (let i = 1; i <= 12; i++) { const yy = bot - i * 22; t += `<line x1="${x - w / 2 + 8}" y1="${yy}" x2="${x - w / 2 + (i % 2 ? 30 : 52)}" y2="${yy}" stroke="${K}" stroke-width="5" stroke-linecap="round"/>`; }
    return `<rect x="${x - w / 2}" y="${top}" width="${w}" height="${bot - top}" rx="12" fill="#fff" opacity=".8"/><rect x="${x - w / 2 + 5}" y="${ly}" width="${w - 10}" height="${bot - ly - 4}" fill="#2f9bff"/><rect x="${x - w / 2 + 5}" y="${ly}" width="${w - 10}" height="12" fill="#9bd4ff"/>
      ${rock ? `<path d="M${x - 40} ${bot - 10} L${x - 54} ${bot - 50} L${x - 20} ${bot - 86} L${x + 30} ${bot - 78} L${x + 54} ${bot - 40} L${x + 36} ${bot - 10}Z" fill="#8f97ad" stroke="${K}" stroke-width="7" stroke-linejoin="round"/><path d="M${x - 20} ${bot - 60} L${x + 6} ${bot - 44} M${x + 20} ${bot - 62} L${x + 30} ${bot - 40}" stroke="#6b7390" stroke-width="5" stroke-linecap="round"/>` : ''}
      ${t}<rect x="${x - w / 2}" y="${top}" width="${w}" height="${bot - top}" rx="12" fill="none" stroke="${K}" stroke-width="8"/><rect x="${x - w / 2 - 26}" y="${bot - 4}" width="${w + 52}" height="22" rx="9" fill="#c9d2e6" stroke="${K}" stroke-width="7"/>`;
  };
  const a = cyl(240, 132, false), b = cyl(820, 220, true);
  const rock = `<path d="M470 336 L452 290 L490 250 L548 258 L574 302 L554 338Z" fill="#8f97ad" stroke="${K}" stroke-width="7" stroke-linejoin="round"/><path d="M488 284 L516 302 M534 282 L544 306" stroke="#6b7390" stroke-width="5" stroke-linecap="round"/>`;
  const lv = (x1, x2, y) => `<line x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" stroke="${K}" stroke-width="10" stroke-dasharray="4 16" stroke-linecap="round"/><line x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" stroke="#fff" stroke-width="5" stroke-dasharray="4 16" stroke-linecap="round"/>`;
  return bgLab('#1273de', '#7fd0ff') + spot(700, 400, 560, '#fff', .5) + sticker(a) + sticker(b) + sticker(rock) +
    arrow(590, 330, 738, 300, { c: Y, w: 20, bend: -40 }) + lv(320, 1010, 416) + lv(900, 1010, 328) +
    arrow(980, 420, 980, 322, { c: '#ff3b3b', w: 26 }) + sticker(em('😮', 1150, 392, 190));
};

// EP12  plasticine: squash it, same mass
S.plasticine = () => {
  const c = '#ff4fa3', d = '#c92f7e';
  const ball = `<circle cx="225" cy="386" r="64" fill="${c}" stroke="${K}" stroke-width="8"/><ellipse cx="204" cy="362" rx="20" ry="12" fill="#fff" opacity=".5" transform="rotate(-30 204 362)"/>`;
  const flat = `<ellipse cx="610" cy="430" rx="126" ry="24" fill="${c}" stroke="${K}" stroke-width="8"/><ellipse cx="580" cy="424" rx="40" ry="6" fill="#fff" opacity=".45"/>`;
  const log = `<rect x="868" y="414" width="254" height="40" rx="20" fill="${c}" stroke="${K}" stroke-width="8"/><rect x="890" y="422" width="90" height="8" rx="4" fill="#fff" opacity=".45"/>`;
  return bgLab('#ff8a3c', '#ffd28a', '#fff1d6') + spot(640, 400, 560, '#fff', .5) +
    sticker(ebal(225, 452, 290, '20 g') + ball) + sticker(ebal(610, 452, 290, '20 g') + flat) + sticker(ebal(995, 452, 290, '20 g') + log) +
    arrow(310, 340, 480, 372, { c: Y, w: 18, bend: -34 }) + arrow(700, 350, 872, 376, { c: Y, w: 18, bend: -34 }) + sticker(em('🤔', 1120, 200, 200));
};

// EP13  sources of light: nature (Sun, lightning, firefly) vs people (bulb, fireworks)
S.lightSources = () => {
  const [g1, d1] = vgrad([[0, '#39a9ff'], [1, '#ffe9a0']]); const [g2, d2] = vgrad([[0, '#0a0d33'], [1, '#2b1c6b']]);
  const bg = `<defs>${d1}${d2}</defs><rect width="1280" height="720" fill="url(#${g1})"/><path d="M860 0 H1280 V720 H700Z" fill="url(#${g2})"/>` + blurred(clouds([[420, 300, 1], [140, 260, .8]])) + `<path d="M860 0 L700 720" stroke="#fff" stroke-width="10"/>` + vignette(.35);
  let rays = ''; for (let i = 0; i < 12; i++) rays += `<path d="M0 -150 L22 -196 L-22 -196Z" fill="#ffb31f" stroke="${K}" stroke-width="7" stroke-linejoin="round" transform="rotate(${i * 30})"/>`;
  const sun = `<g transform="translate(196,424) scale(.8)">${rays}<circle r="128" fill="${Y}" stroke="${K}" stroke-width="8"/><ellipse cx="-44" cy="-18" rx="13" ry="18" fill="${K}"/><ellipse cx="44" cy="-18" rx="13" ry="18" fill="${K}"/><path d="M-46 34 Q0 82 46 34" fill="#fff" stroke="${K}" stroke-width="7" stroke-linejoin="round"/><ellipse cx="-78" cy="26" rx="20" ry="12" fill="#ff8a5a" opacity=".7"/><ellipse cx="78" cy="26" rx="20" ry="12" fill="#ff8a5a" opacity=".7"/></g>`;
  const bolt = `<path d="M500 250 L428 392 L482 392 L440 520 L566 350 L506 350 L552 250Z" fill="#fff36b" stroke="${K}" stroke-width="8" stroke-linejoin="round"/>`;
  const bulb = `<g transform="translate(1030,250)"><circle r="220" fill="#fff3a0" opacity=".28"/><circle r="170" fill="#fff3a0" opacity=".3"/>
    <path d="M-56 152 Q-66 104 -104 58 A138 138 0 1 1 104 58 Q66 104 56 152Z" fill="#fff06a" stroke="${K}" stroke-width="8" stroke-linejoin="round"/>
    <path d="M-36 150 L-52 40 L-20 76 L0 40 L20 76 L52 40 L36 150" fill="none" stroke="#ff9a1f" stroke-width="9" stroke-linejoin="round" stroke-linecap="round"/>
    <rect x="-60" y="150" width="120" height="78" rx="12" fill="#b9c2d8" stroke="${K}" stroke-width="8"/><path d="M-60 176 H60 M-60 202 H60" stroke="${K}" stroke-width="6"/><path d="M-34 228 H34 L20 256 H-20Z" fill="#444c66" stroke="${K}" stroke-width="8" stroke-linejoin="round"/>
    <ellipse cx="-62" cy="-70" rx="22" ry="40" fill="#fff" opacity=".7" transform="rotate(32 -62 -70)"/></g>`;
  const fw = (x, y, r, c) => { let s = ''; for (let i = 0; i < 12; i++) { const a = i * Math.PI / 6; s += `<line x1="${x + r * .35 * Math.cos(a)}" y1="${y + r * .35 * Math.sin(a)}" x2="${x + r * Math.cos(a)}" y2="${y + r * Math.sin(a)}" stroke="${c}" stroke-width="9" stroke-linecap="round"/>`; } return s; };
  const fly = `<g transform="translate(646,474)"><circle r="70" fill="#d8ff5a" opacity=".35"/><circle cx="-26" cy="14" r="34" fill="#e6ff4a" stroke="${K}" stroke-width="7"/><ellipse cx="22" cy="-4" rx="34" ry="24" fill="#5a3a2a" stroke="${K}" stroke-width="7"/><ellipse cx="6" cy="-34" rx="34" ry="15" fill="#dff4ff" stroke="${K}" stroke-width="6" transform="rotate(-24 6 -34)"/><circle cx="56" cy="-8" r="16" fill="#3a241a" stroke="${K}" stroke-width="6"/><circle cx="62" cy="-12" r="5" fill="#fff"/></g>`;
  return bg + sticker(sun) + sticker(bolt) + sticker(fly) + fw(836, 476, 62, '#ff6bd6') + fw(1218, 470, 56, '#6bffd0') + sticker(bulb);
};

// EP14  the Moon only reflects sunlight into our eyes
S.moon = () => {
  const mx = 1050, my = 205, r = 160;
  const moon = `<g><circle cx="${mx}" cy="${my}" r="${r + 44}" fill="#fff8d0" opacity=".16"/><circle cx="${mx}" cy="${my}" r="${r}" fill="#f4f1dc" stroke="${K}" stroke-width="8"/>
    <clipPath id="mc"><circle cx="${mx}" cy="${my}" r="${r - 4}"/></clipPath><g clip-path="url(#mc)">
    <g fill="#cfcbb4"><circle cx="${mx - 60}" cy="${my - 50}" r="34"/><circle cx="${mx - 84}" cy="${my + 44}" r="22"/><circle cx="${mx - 4}" cy="${my + 64}" r="30"/><circle cx="${mx + 30}" cy="${my - 84}" r="20"/><circle cx="${mx + 66}" cy="${my + 10}" r="26"/></g>
    <path d="M${mx + 20} ${my - r - 10} Q${mx - 60} ${my} ${mx + 20} ${my + r + 10} H${mx + r + 20} V${my - r - 10}Z" fill="#141a4d" opacity=".78"/></g></g>`;
  const sun = `<circle cx="-10" cy="420" r="300" fill="#ffd23f" opacity=".18"/><circle cx="-10" cy="420" r="230" fill="#ffd23f" opacity=".25"/><circle cx="-20" cy="420" r="170" fill="${Y}" stroke="${K}" stroke-width="8"/><circle cx="-20" cy="420" r="120" fill="#fff0a0" opacity=".7"/>`;
  const hill = `<path d="M330 720 Q620 470 940 720Z" fill="#0b1030"/><path d="M330 720 Q620 470 940 720" fill="none" stroke="#2c3aa6" stroke-width="8"/>`;
  return bgNight() + sun + hill + sticker(moon) +
    arrow(176, 388, 862, 236, { c: Y, w: 26, bend: -30 }) + arrow(940, 330, 700, 452, { c: '#fff6b8', w: 22, bend: -20 }) +
    sticker(em('🧒', 622, 486, 170));
};

// EP15  opaque wood makes a dark shadow, frosted glass a pale one
S.shadowGlass = () => {
  const b = beam(`236,410 1280,150 1280,640 236,470`, .8);
  const sh = (x, a) => `<path d="M${x} 262 H${x + 176} V548 H${x}Z" fill="#1a1238" opacity="${a}" filter="url(#bgblur)"/>`;
  const wood = `<rect x="470" y="282" width="150" height="262" rx="8" fill="#b9733a" stroke="${K}" stroke-width="8"/><path d="M500 300 V524 M540 310 Q556 400 540 520 M586 300 V524" stroke="#8a4f22" stroke-width="6" stroke-linecap="round" fill="none"/><ellipse cx="548" cy="410" rx="10" ry="18" fill="none" stroke="#8a4f22" stroke-width="5"/>`;
  const glass = `<rect x="842" y="282" width="150" height="262" rx="8" fill="#d8f3ff" opacity=".78"/><rect x="842" y="282" width="150" height="262" rx="8" fill="none" stroke="${K}" stroke-width="8"/><path d="M866 306 L900 306 M866 330 L884 330" stroke="#fff" stroke-width="9" stroke-linecap="round"/><path d="M962 318 L890 520 M982 380 L940 500" stroke="#fff" stroke-width="12" stroke-linecap="round" opacity=".75"/>`;
  return bgWall('#fff0c2', '#eeb066', '#3f2a66') + b + sh(610, .9) + sh(984, .3) +
    sticker(torch(236, 440, 1.0)) + sticker(wood) + sticker(glass) + ring(1076, 404, 108, 160) + word('?!', 1204, 250, 104, Y);
};

// EP16  torch close = giant shadow, torch far = tiny shadow
S.shadowSize = () => {
  const dino = (x, y, s, f = '') => em('🦖', x, y, s, 0, f);
  const b = beam(`214,434 1280,-40 1280,720 214,494`, .55);
  return bgWall() + b +
    dino(985, 300, 520, 'filter="url(#sil)" opacity=".9"') + dino(640, 478, 104, 'filter="url(#sil)" opacity=".85"') +
    sticker(torch(214, 464, 1.0)) + sticker(dino(372, 470, 150)) +
    arrow(700, 372, 752, 300, { c: Y, w: 18 }) + arrow(712, 356, 664, 424, { c: Y, w: 18 });
};

// EP17  one cone, two shadows: triangle and circle
S.coneShadow = () => {
  const cone = `<g><ellipse cx="330" cy="516" rx="118" ry="30" fill="#e56a00" stroke="${K}" stroke-width="8"/><path d="M212 516 L330 258 L448 516 Q330 548 212 516Z" fill="#ff8a1f" stroke="${K}" stroke-width="8" stroke-linejoin="round"/><path d="M330 258 L372 528 Q420 524 448 516Z" fill="#e56a00"/><path d="M212 516 L330 258 L448 516 Q330 548 212 516Z" fill="none" stroke="${K}" stroke-width="8" stroke-linejoin="round"/><path d="M290 380 L262 452" stroke="#fff" stroke-width="10" stroke-linecap="round" opacity=".6"/></g>`;
  const tri = `<path d="M560 520 L668 300 L776 520Z" fill="#1a1238" opacity=".86" filter="url(#bgblur)"/>`;
  const circ = `<circle cx="1040" cy="330" r="140" fill="#1a1238" opacity=".88" filter="url(#bgblur)"/>`;
  return bgWall('#fff0c2', '#f0b060', '#3f2a66') + tri + circ + sticker(cone) + sticker(torch(176, 430, .62, 0)) +
    ring(1040, 330, 172) + word('?!', 1196, 180, 110, Y) + arrow(790, 420, 870, 380, { c: Y, w: 20 });
};

// EP18  same water feels hot to one hand, cold to the other
S.handsTemp = () => {
  const bowl = `<path d="M330 420 H950 Q940 566 780 566 H500 Q340 566 330 420Z" fill="#dff7ff" opacity=".55"/><path d="M352 452 H928 Q910 556 780 558 H500 Q370 556 352 452Z" fill="#35c9d6" opacity=".85"/><rect x="352" y="446" width="576" height="13" rx="6" fill="#b5f3f8"/>`;
  const rim = `<path d="M330 420 H950 Q940 566 780 566 H500 Q340 566 330 420Z" fill="none" stroke="${K}" stroke-width="9" stroke-linejoin="round"/><path d="M310 420 H970" stroke="${K}" stroke-width="20" stroke-linecap="round"/><path d="M312 420 H968" stroke="#fff" stroke-width="8" stroke-linecap="round"/>`;
  const l = hand(372, 396, 1.08, 20, '#ff7d66', 480), r = `<g transform="translate(1280,0) scale(-1,1)">${hand(372, 396, 1.08, 20, '#86bdff', 480)}</g>`;
  return bgKitchen() + spot(640, 420, 520, '#fff', .55) + `<circle cx="250" cy="400" r="200" fill="#ff5a3c" opacity=".38" filter="url(#blur20)"/><circle cx="1030" cy="400" r="200" fill="#3c8cff" opacity=".42" filter="url(#blur20)"/>` +
    sticker(bowl + l + r) + `<path d="M352 470 H928 Q910 556 780 558 H500 Q370 556 352 470Z" fill="#35c9d6" opacity=".5"/>` + rim +
    sticker(em('🥵', 170, 476, 150)) + sticker(em('🥶', 1110, 476, 150)) + word('?', 640, 380, 170, Y);
};

// EP19  heat (energy that flows) is not temperature (the number)
S.heatVsTemp = () => {
  const basin = `<path d="M70 404 H690 L650 562 H110Z" fill="#ff7a4a" stroke="${K}" stroke-width="8" stroke-linejoin="round"/><path d="M70 404 H690 L682 436 H78Z" fill="#ffb08a"/><path d="M60 404 H700" stroke="${K}" stroke-width="20" stroke-linecap="round"/><path d="M62 404 H698" stroke="#fff" stroke-width="8" stroke-linecap="round"/>`;
  const bottle = `<g><rect x="322" y="250" width="116" height="40" rx="10" fill="#3a8dff" stroke="${K}" stroke-width="8"/><path d="M312 296 Q312 286 330 286 H430 Q448 286 448 296 V520 Q448 544 424 544 H336 Q312 544 312 520Z" fill="#fff" stroke="${K}" stroke-width="8" stroke-linejoin="round"/><path d="M320 340 H440 V518 Q440 536 424 536 H336 Q320 536 320 518Z" fill="#fdfdf2"/><path d="M320 340 H440" stroke="#d9e2f2" stroke-width="6"/><rect x="334" y="380" width="92" height="74" rx="10" fill="#bfe0ff"/>${em('🥛', 380, 418, 50)}</g>`;
  const wav = (x1, x2, y) => arrow(x1, y, x2, y, { c: '#ff3b3b', w: 20, bend: x1 < x2 ? -26 : 26 });
  const th = `<g transform="rotate(8 1090 300)">${thermo(1090, 44, 500, .72, 64)}</g>`;
  return bgKitchen() + spot(380, 420, 380, '#ffb08a', .5) + spot(1090, 300, 300, '#fff', .55) + sticker(basin) + sticker(bottle) +
    `<path d="M70 436 H690 L650 562 H110Z" fill="#ff7a4a" opacity=".45"/>` + wav(150, 300, 478) + wav(610, 462, 478) + em('🔥', 190, 340, 90) +
    sticker(th) + word('≠', 850, 400, 220, '#fff');
};

// EP20  heat flows hand -> ice; "cold" never flows
S.coldFlow = () => {
  const ice = `<g transform="translate(1030,330)"><path d="M-150 -70 L0 -150 L150 -70 V90 L0 170 L-150 90Z" fill="#bfeaff" stroke="${K}" stroke-width="8" stroke-linejoin="round"/><path d="M-150 -70 L0 10 L150 -70 L0 -150Z" fill="#e8f8ff"/><path d="M0 10 V170 L150 90 V-70Z" fill="#8fd0ff"/><path d="M-150 -70 L0 10 L150 -70 M0 10 V170" fill="none" stroke="${K}" stroke-width="7" stroke-linejoin="round"/>
    <path d="M-120 -20 V40 M-96 -8 V20" stroke="#fff" stroke-width="10" stroke-linecap="round"/><ellipse cx="-92" cy="60" rx="10" ry="14" fill="${K}"/><ellipse cx="-36" cy="88" rx="10" ry="14" fill="${K}"/><path d="M-84 98 Q-66 118 -44 116" fill="none" stroke="${K}" stroke-width="7" stroke-linecap="round"/>
    <path d="M-130 190 q16 26 0 40 q-16 -14 0 -40Z M60 180 q16 26 0 40 q-16 -14 0 -40Z" fill="#6cc4ff" stroke="${K}" stroke-width="5"/></g>`;
  const h = hand(210, 400, 1.5, 0, '#ffcf9e', 300, '#ff7b54');
  return bgBody('#12306e', '#2aa7d6', '#bfeaff') + spot(1030, 330, 330, '#fff', .5) + `<circle cx="250" cy="400" r="210" fill="#ff5a3c" opacity=".4" filter="url(#blur20)"/>` + sticker(h) + sticker(ice) +
    arrow(476, 318, 850, 300, { c: '#ff3b3b', w: 34, bend: -36 }) + arrow(852, 478, 500, 500, { c: '#4aa8ff', w: 26, bend: -30 }) +
    sticker(em('❌', 676, 508, 120)) + sticker(em('🔥', 662, 272, 84));
};

// EP21  metal pot gets hot, plastic handle stays cool
S.potHandle = () => {
  const [g, d] = vgrad([[0, '#d5dbe8'], [.55, '#c2c9da'], [.8, '#ff9a5a'], [1, '#ff4b2b']]);
  const flames = [0, 1, 2, 3, 4, 5].map(i => `<path d="M${236 + i * 64} 566 q-26 -34 0 -62 q8 22 20 26 q-4 -30 14 -46 q30 46 6 82Z" fill="${i % 2 ? '#ffb31f' : '#ff6a1f'}" stroke="${K}" stroke-width="6" stroke-linejoin="round"/>`).join('');
  const pot = `<defs>${d}</defs>${flames}<rect x="170" y="270" width="80" height="34" rx="14" fill="#8d97b3" stroke="${K}" stroke-width="8"/>
    <path d="M214 296 H636 V480 Q636 520 596 520 H254 Q214 520 214 480Z" fill="url(#${g})" stroke="${K}" stroke-width="8" stroke-linejoin="round"/>
    <path d="M200 296 H650" stroke="${K}" stroke-width="26" stroke-linecap="round"/><path d="M202 296 H648" stroke="#eef1f8" stroke-width="12" stroke-linecap="round"/>
    <rect x="244" y="330" width="22" height="120" rx="11" fill="#fff" opacity=".6"/>
    <rect x="636" y="318" width="60" height="40" fill="#8d97b3" stroke="${K}" stroke-width="8"/><rect x="690" y="308" width="330" height="60" rx="28" fill="#23263a" stroke="${K}" stroke-width="8"/><rect x="716" y="322" width="150" height="10" rx="5" fill="#fff" opacity=".28"/>`;
  const steam = [300, 420, 540].map(x => `<path d="M${x} 262 q-26 -30 0 -58 q26 -28 0 -56" fill="none" stroke="#fff" stroke-width="14" stroke-linecap="round" opacity=".85"/>`).join('');
  const grip = `<g transform="translate(1280,0) scale(-1,1)">${''}</g>` + `<g stroke="${K}" stroke-width="8" stroke-linejoin="round"><path d="M1010 300 H1300 V392 H1010 Q968 392 968 346 Q968 300 1010 300Z" fill="#ffcf9e"/><rect x="1160" y="286" width="160" height="122" rx="16" fill="#3aa0ff"/>
    <rect x="890" y="286" width="36" height="96" rx="18" fill="#ffcf9e"/><rect x="928" y="282" width="36" height="104" rx="18" fill="#ffcf9e"/><rect x="966" y="282" width="36" height="104" rx="18" fill="#ffcf9e"/><rect x="1004" y="286" width="36" height="98" rx="18" fill="#ffcf9e"/></g>`;
  return bgKitchen() + spot(425, 400, 330, '#ff8a5a', .5) + spot(960, 340, 300, '#fff', .5) + steam + sticker(pot) + sticker(grip) +
    sticker(em('🥵', 425, 404, 150)) + sticker(em('😎', 1090, 180, 150)) + ring(792, 338, 116, 66);
};

// EP22  hot day: road slabs expand into the gap
S.roadGap = () => {
  const bg = blurred(sky([[0, '#ff7a3c'], [.5, '#ffb347'], [1, '#ffe29a']]) + hdb(40, 300, 120, 300, '#e8a878') + hdb(180, 250, 110, 350, '#f0c088') + hdb(330, 320, 110, 300, '#e8a878') + hdb(880, 330, 110, 300, '#f0c088') + hdb(1150, 300, 130, 300, '#e8a878')) + vignette(.35);
  let rays = ''; for (let i = 0; i < 14; i++) rays += `<path d="M0 -128 L20 -176 L-20 -176Z" fill="#ffb31f" stroke="${K}" stroke-width="7" stroke-linejoin="round" transform="rotate(${i * 360 / 14})"/>`;
  const sun = `<g transform="translate(1080,170)"><circle r="230" fill="#fff3a0" opacity=".3"/>${rays}<circle r="110" fill="${Y}" stroke="${K}" stroke-width="8"/>${em('🥵', 0, 4, 150)}</g>`;
  const slab = (x, w) => `<rect x="${x}" y="412" width="${w}" height="78" fill="#b9c0d2" stroke="${K}" stroke-width="8"/><rect x="${x}" y="398" width="${w}" height="26" fill="#454a60" stroke="${K}" stroke-width="8"/>`;
  const pillar = x => `<path d="M${x - 70} 490 H${x + 70} L${x + 40} 520 V720 H${x - 40} V520Z" fill="#9aa2b8" stroke="${K}" stroke-width="8" stroke-linejoin="round"/>`;
  const road = pillar(250) + pillar(1010) + slab(-20, 600) + slab(680, 620) + `<path d="M40 411 H540 M720 411 H1240" stroke="#fff" stroke-width="5" stroke-dasharray="40 30"/>`;
  return bg + sticker(sun) + sticker(road) + sticker(em('🚗', 250, 352, 120)) +
    `<circle cx="630" cy="444" r="96" fill="${Y}" opacity=".35"/>` + ring(630, 444, 100) +
    arrow(330, 452, 566, 452, { c: '#ff3b3b', w: 26 }) + arrow(930, 452, 694, 452, { c: '#ff3b3b', w: 26 });
};

module.exports = S;
