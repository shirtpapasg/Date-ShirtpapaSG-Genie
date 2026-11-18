/* Scenes for the P3, P5 and P6 thumbnails. Same rules as scenes.js: a toned background + ONE hero that is the episode's idea.
 * Keep clear: the title strip (x<TITLE_RIGHT, y 95-225), the banner (y>565) and the bottom-right 200x80.
 * Called from scenes.js with its scene table S and its shared backgrounds/props H. */
const L = require('./lib.js');
const { K, Y, em, word, vgrad, rgrad, sky, spot, vignette, blurred, sticker, shadow, clouds, hdb, bokeh, stars, arrow, hand, thermo, ring } = L;

module.exports = (S, H) => {
  const { bgPark, bgGarden, bgLeafy, bgDesert, bgBody, bgLab, bgKitchen, bgWall, kidHead, leafShape, chickenRice } = H;
  const T = (t, s) => `<g transform="${t}">${s}</g>`;
  const P = Math.PI;
  const sub2 = `<tspan font-size="62%" dy="10">2</tspan>`;

  /* ---------- shared props ---------- */
  // round "card" with something inside (clipped), optional yellow number badge
  let nb = 0;
  const bubble = (x, y, r, inner, fill = '#fff', n = null) => {
    const c = 'pb' + (++nb);
    return sticker(`<circle cx="${x}" cy="${y}" r="${r + 5}" fill="${fill}" stroke="${K}" stroke-width="8"/><clipPath id="${c}"><circle cx="${x}" cy="${y}" r="${r}"/></clipPath><g clip-path="url(#${c})">${inner}</g>` +
      (n == null ? '' : `<circle cx="${x - r * .74}" cy="${y - r * .74}" r="36" fill="${Y}" stroke="${K}" stroke-width="7"/><text x="${x - r * .74}" y="${y - r * .74 + 18}" font-size="52" font-weight="700" text-anchor="middle" fill="${K}">${n}</text>`));
  };
  const sun = (x, y, r, face = false) => {
    let rays = ''; for (let i = 0; i < 12; i++) rays += `<path d="M0 ${-r * 1.18} L${r * .17} ${-r * 1.54} L${-r * .17} ${-r * 1.54}Z" fill="#ffb31f" stroke="${K}" stroke-width="7" stroke-linejoin="round" transform="rotate(${i * 30})"/>`;
    return T(`translate(${x},${y})`, `${rays}<circle r="${r}" fill="${Y}" stroke="${K}" stroke-width="8"/><circle cx="${-r * .3}" cy="${-r * .3}" r="${r * .45}" fill="#fff6b0" opacity=".6"/>` +
      (face ? `<ellipse cx="${-r * .34}" cy="${-r * .12}" rx="${r * .1}" ry="${r * .14}" fill="${K}"/><ellipse cx="${r * .34}" cy="${-r * .12}" rx="${r * .1}" ry="${r * .14}" fill="${K}"/><path d="M${-r * .36} ${r * .28} Q0 ${r * .64} ${r * .36} ${r * .28}" fill="#fff" stroke="${K}" stroke-width="6" stroke-linejoin="round"/>` : ''));
  };
  const cross = (x, y, s, c = '#ff3b3b') => `<g stroke-linecap="round"><path d="M${x - s} ${y - s} L${x + s} ${y + s} M${x + s} ${y - s} L${x - s} ${y + s}" stroke="${K}" stroke-width="${s * .62}"/><path d="M${x - s} ${y - s} L${x + s} ${y + s} M${x + s} ${y - s} L${x - s} ${y + s}" stroke="${c}" stroke-width="${s * .36}"/></g>`;
  const drops = list => list.map(([x, y, s]) => T(`translate(${x},${y}) scale(${s})`, `<path d="M0 -30 Q24 4 24 18 A24 24 0 1 1 -24 18 Q-24 4 0 -30Z" fill="#3fa9ff" stroke="${K}" stroke-width="6" stroke-linejoin="round"/><ellipse cx="-8" cy="16" rx="5" ry="9" fill="#fff" opacity=".8"/>`)).join('');
  const pot = (x, y, w, h, c = '#e2713a') => `<path d="M${x - w / 2} ${y} H${x + w / 2} L${x + w * .36} ${y + h} H${x - w * .36}Z" fill="${c}" stroke="${K}" stroke-width="8" stroke-linejoin="round"/><rect x="${x - w / 2 - 14}" y="${y - 30}" width="${w + 28}" height="40" rx="10" fill="#f08a4f" stroke="${K}" stroke-width="8"/>`;
  const tag = (t, x, y, s = 46, fill = '#fff') => word(t, x, y, s, fill);
  // dotted trail
  const dots = (d, c = '#fff') => `<path d="${d}" fill="none" stroke="${K}" stroke-width="16" stroke-linecap="round" stroke-dasharray="1 30"/><path d="${d}" fill="none" stroke="${c}" stroke-width="9" stroke-linecap="round" stroke-dasharray="1 30"/>`;

  /* ================= P3 ================= */

  // P3 EP0  make your own mind map: curved branches, one colour each
  S.mindMap = () => {
    const cx = 800, cy = 372;
    const br = [['#ff5a5a', 1120, 120, '🌱', 0], ['#2f9bff', 1175, 360, '🧲', 30], ['#31c48d', 1010, 520, '💧', -20], ['#ff9f1c', 500, 500, '☀️', 20], ['#b06bff', 360, 320, '🐞', -30], ['#ff6bd6', 730, 110, '', 0]];
    let lines = '', nodes = '';
    br.forEach(([c, x, y, e, bend], i) => {
      const mx = (cx + x) / 2 - (y - cy) * .18, my = (cy + y) / 2 + (x - cx) * .18;
      const d = `M${cx} ${cy} Q${mx} ${my} ${x} ${y}`;
      if (!e) return;
      lines += `<path d="${d}" fill="none" stroke="${K}" stroke-width="34" stroke-linecap="round"/><path d="${d}" fill="none" stroke="${c}" stroke-width="20" stroke-linecap="round"/>`;
      // two little twigs per branch
      [[-1, 1], [1, 1]].forEach(([sx], k) => { const tx = x + (x > cx ? 96 : -96), ty = y + sx * 56; lines += `<path d="M${x} ${y} Q${(x + tx) / 2} ${y} ${tx} ${ty}" fill="none" stroke="${K}" stroke-width="20" stroke-linecap="round"/><path d="M${x} ${y} Q${(x + tx) / 2} ${y} ${tx} ${ty}" fill="none" stroke="${c}" stroke-width="10" stroke-linecap="round"/><circle cx="${tx}" cy="${ty}" r="15" fill="#fff" stroke="${K}" stroke-width="6"/>`; });
      nodes += `<circle cx="${x}" cy="${y}" r="62" fill="${c}" stroke="${K}" stroke-width="8"/><circle cx="${x}" cy="${y}" r="48" fill="#fff"/>` + em(e, x, y, 60);
    });
    const centre = `<circle cx="${cx}" cy="${cy}" r="118" fill="${Y}" stroke="${K}" stroke-width="9"/><circle cx="${cx}" cy="${cy}" r="96" fill="#fff"/>` + em('🧠', cx, cy - 2, 140);
    return bgBody('#5b2bd6', '#1f8fd6') + spot(cx, cy, 470, '#fff', .5) + sticker(lines) + sticker(nodes) + sticker(centre) + sticker(em('✏️', 632, 300, 120, 0));
  };

  // P3 EP1  is the teddy bear alive? sort into living / non-living
  const teddy = (x, y, s) => T(`translate(${x},${y}) scale(${s})`, `<g stroke="${K}" stroke-width="7" stroke-linejoin="round">
    <circle cx="-68" cy="-160" r="36" fill="#b9763f"/><circle cx="68" cy="-160" r="36" fill="#b9763f"/><circle cx="-68" cy="-160" r="16" fill="#e9b98a" stroke-width="5"/><circle cx="68" cy="-160" r="16" fill="#e9b98a" stroke-width="5"/>
    <ellipse cx="-108" cy="14" rx="34" ry="64" fill="#b9763f" transform="rotate(28 -108 14)"/><ellipse cx="108" cy="14" rx="34" ry="64" fill="#b9763f" transform="rotate(-28 108 14)"/>
    <ellipse cx="-64" cy="150" rx="48" ry="40" fill="#b9763f"/><ellipse cx="64" cy="150" rx="48" ry="40" fill="#b9763f"/><circle cx="-66" cy="154" r="20" fill="#e9b98a" stroke-width="5"/><circle cx="66" cy="154" r="20" fill="#e9b98a" stroke-width="5"/>
    <ellipse cx="0" cy="52" rx="100" ry="112" fill="#c98548"/><ellipse cx="0" cy="66" rx="58" ry="68" fill="#f0c896" stroke-width="5"/>
    <circle cx="0" cy="-96" r="90" fill="#c98548"/><ellipse cx="0" cy="-66" rx="42" ry="32" fill="#f3d2ad" stroke-width="5"/>
    <ellipse cx="0" cy="-80" rx="15" ry="11" fill="${K}"/><path d="M0 -70 V-56 M-16 -52 Q0 -42 16 -52" fill="none" stroke-linecap="round" stroke-width="6"/>
    <circle cx="-34" cy="-112" r="11" fill="${K}"/><circle cx="34" cy="-112" r="11" fill="${K}"/><circle cx="-31" cy="-116" r="3.5" fill="#fff" stroke="none"/><circle cx="37" cy="-116" r="3.5" fill="#fff" stroke="none"/>
    <path d="M0 -14 L-44 -36 V8Z M0 -14 L44 -36 V8Z" fill="#ff4b4b"/><circle cx="0" cy="-14" r="12" fill="#ff4b4b"/></g>`);
  S.teddy = () => {
    const hoop = (x, c, c2) => `<ellipse cx="${x}" cy="476" rx="196" ry="66" fill="${c2}" opacity=".85"/><ellipse cx="${x}" cy="476" rx="196" ry="66" fill="none" stroke="${K}" stroke-width="22"/><ellipse cx="${x}" cy="476" rx="196" ry="66" fill="none" stroke="${c}" stroke-width="11"/>`;
    return bgWall('#fff3d0', '#ffc27a', '#7a4fa3') + spot(640, 380, 420, '#fff', .55) +
      shadow(hoop(226, '#31c48d', '#c9f5df') + hoop(1054, '#9aa2b8', '#e6e9f2')) +
      sticker(em('🐈', 150, 418, 130) + em('🪴', 300, 410, 120)) + sticker(em('⚽', 980, 428, 104) + em('🚲', 1120, 410, 130)) +
      tag('LIVING', 226, 318, 52, '#7dffb0') + tag('NON-LIVING', 1054, 318, 52, '#fff') +
      sticker(teddy(640, 392, .98)) + word('?', 812, 330, 170, Y, 'middle', 12) +
      arrow(520, 520, 420, 520, { c: '#31c48d', w: 16 }) + arrow(760, 520, 860, 520, { c: '#c5cbdb', w: 16 });
  };

  // P3 EP2  a drooping plant is not sad: living things need water, food and air
  S.droop = () => {
    const px = 930, py = 452;
    const stem = `M${px} ${py - 20} Q${px - 6} ${py - 200} ${px + 70} ${py - 250} Q${px + 150} ${py - 280} ${px + 190} ${py - 190}`;
    const leaf = (x, y, r, w = 60, h = 130) => leafShape(x, y, w, h, r, '#7fbf4f', `<path d="M0 ${-h * .4} V${h * .4}" stroke="#4d8f2f" stroke-width="5" fill="none"/>`);
    const plant = `<path d="${stem}" fill="none" stroke="${K}" stroke-width="30" stroke-linecap="round"/><path d="${stem}" fill="none" stroke="#6fbf4a" stroke-width="16" stroke-linecap="round"/>` +
      leaf(px - 48, py - 96, 200) + leaf(px + 44, py - 150, 165) + leaf(px + 118, py - 206, 150, 56, 120) + leaf(px + 210, py - 130, 185, 70, 150) + leaf(px + 150, py - 150, 205, 56, 120) + pot(px, py, 190, 104);
    const can = T('translate(600,330) rotate(24)', `<g stroke="${K}" stroke-width="8" stroke-linejoin="round"><path d="M-100 -30 Q-170 -30 -170 30 Q-170 80 -100 70" fill="none" stroke-width="24"/><path d="M-100 -30 Q-170 -30 -170 30 Q-170 80 -100 70" fill="none" stroke="#2f9bff" stroke-width="9"/>
      <path d="M90 20 L200 -50 L216 -26 L96 70Z" fill="#2f9bff"/><path d="M190 -70 L232 -16 L212 -4 L176 -56Z" fill="#8fd0ff"/><rect x="-104" y="-60" width="204" height="150" rx="22" fill="#3fa9ff"/><rect x="-104" y="-60" width="204" height="34" rx="14" fill="#8fd0ff"/></g>`);
    const need = (x, e, n) => bubble(x, 446, 70, `<rect x="${x - 80}" y="366" width="160" height="160" fill="#eaf7ff"/>` + em(e, x, 448, 84));
    const sad = sticker(`<path d="M1010 60 H1230 Q1250 60 1250 80 V170 Q1250 190 1230 190 H1120 L1080 226 L1088 190 H1010 Q990 190 990 170 V80 Q990 60 1010 60Z" fill="#fff" stroke="${K}" stroke-width="7" stroke-linejoin="round"/><text x="1096" y="148" font-size="68" font-weight="700" text-anchor="middle" fill="${K}">sad?</text>`) + cross(1222, 76, 30);
    return bgGarden(540) + spot(900, 330, 400, '#fff', .55) + sticker(plant) + sticker(can) + drops([[806, 330, 1], [842, 384, .8], [790, 400, .7]]) +
      need(112, '💧') + need(282, '🍚') + need(452, '💨') + sad;
  };

  // P3 EP3  touch the mimosa and it folds: living things respond to changes
  S.mimosa = () => {
    const frond = (open) => {
      let s = `<path d="M0 0 H360" stroke="${K}" stroke-width="20" stroke-linecap="round"/><path d="M0 0 H360" stroke="#7a9a3a" stroke-width="9" stroke-linecap="round"/>`;
      for (let i = 0; i < 11; i++) { const x = 34 + i * 31; const a = open ? 80 : 24, ry = open ? 54 : 46;
        [1, -1].forEach(d => { s += `<ellipse cx="${x}" cy="${-d * ry}" rx="13" ry="${ry}" fill="${open ? '#4fcf63' : '#2f9a4c'}" stroke="${K}" stroke-width="6" transform="rotate(${d * (90 - a)} ${x} 0)"/>`; }); }
      return s;
    };
    const flower = (x, y, r) => { let s = ''; for (let i = 0; i < 20; i++) { const a = i * P / 10; s += `<line x1="${x}" y1="${y}" x2="${x + r * 1.25 * Math.cos(a)}" y2="${y + r * 1.25 * Math.sin(a)}" stroke="#ff8ad8" stroke-width="5" stroke-linecap="round"/>`; } return `<circle cx="${x}" cy="${y}" r="${r * 1.2}" fill="${K}"/>` + s + `<circle cx="${x}" cy="${y}" r="${r * .8}" fill="#ff6bd0" stroke="${K}" stroke-width="5"/>`; };
    const a = T('translate(70,470) rotate(-22)', frond(true)), b = T('translate(760,330) rotate(26)', frond(false));
    const stalk = `<path d="M40 560 Q60 500 70 470 M720 560 Q740 420 760 330" fill="none" stroke="${K}" stroke-width="20" stroke-linecap="round"/><path d="M40 560 Q60 500 70 470 M720 560 Q740 420 760 330" fill="none" stroke="#7a9a3a" stroke-width="9" stroke-linecap="round"/>`;
    return bgLeafy() + spot(900, 380, 380, '#fff', .35) + sticker(stalk + a + flower(470, 470, 34)) + sticker(b) +
      arrow(520, 330, 690, 330, { c: Y, w: 22 }) + sticker(em('👇', 968, 286, 190, 20)) +
      `<g stroke="${Y}" stroke-width="9" stroke-linecap="round"><path d="M850 330 L812 300 M1090 420 L1136 432 M1076 470 L1100 506"/></g>`;
  };

  // P3 EP4  sort living things into groups: flowers, six legs, feathers
  S.classify = () => {
    const c = (x, y, r, col, e, es) => bubble(x, y, r, `<rect x="${x - r - 6}" y="${y - r - 6}" width="${2 * r + 12}" height="${2 * r + 12}" fill="${col}"/>` + em(e, x, y + 4, es));
    return bgPark() + spot(1040, 320, 360, '#fff', .6) +
      c(190, 386, 104, '#fff3b8', '🌻', 150) + c(566, 386, 104, '#ffe0d0', '🐜', 140) + c(1046, 312, 168, '#d6f1ff', '🦜', 250) +
      tag('FLOWERS', 190, 548, 50, '#fff') + tag('6 LEGS', 566, 548, 50, '#fff') + tag('FEATHERS', 1046, 548, 56, Y) +
      word('?', 380, 400, 110, Y) + word('?', 780, 400, 110, Y);
  };

  // P3 EP5  a mushroom is not a plant: fungi feed on other things and spread by spores
  S.fungi = () => {
    const mx = 950, my = 300;
    let spores = ''; [[-150, 96, 10], [-110, 160, 8], [-190, 180, 7], [130, 104, 10], [170, 170, 8], [100, 190, 7], [-230, 110, 7], [220, 110, 7], [-140, 220, 6], [150, 226, 6]].forEach(([x, y, r]) => spores += `<circle cx="${mx + x}" cy="${my + y}" r="${r}" fill="#fff6c8" stroke="${K}" stroke-width="4"/>`);
    const mush = `<path d="M${mx - 52} ${my + 20} Q${mx - 70} ${my + 180} ${mx - 84} ${my + 236} H${mx + 84} Q${mx + 70} ${my + 180} ${mx + 52} ${my + 20}Z" fill="#fff3dc" stroke="${K}" stroke-width="8" stroke-linejoin="round"/>
      <path d="M${mx - 226} ${my + 36} Q${mx - 240} ${my - 190} ${mx} ${my - 200} Q${mx + 240} ${my - 190} ${mx + 226} ${my + 36} Q${mx} ${my + 84} ${mx - 226} ${my + 36}Z" fill="#ff4b4b" stroke="${K}" stroke-width="8" stroke-linejoin="round"/>
      <path d="M${mx - 222} ${my + 36} Q${mx} ${my + 84} ${mx + 222} ${my + 36} Q${mx} ${my + 14} ${mx - 222} ${my + 36}Z" fill="#f3d9b0" stroke="${K}" stroke-width="6" stroke-linejoin="round"/>
      <g fill="#fff" stroke="${K}" stroke-width="5"><ellipse cx="${mx - 110}" cy="${my - 70}" rx="40" ry="30"/><ellipse cx="${mx + 20}" cy="${my - 130}" rx="46" ry="30"/><ellipse cx="${mx + 130}" cy="${my - 50}" rx="36" ry="28"/><ellipse cx="${mx - 10}" cy="${my - 36}" rx="26" ry="20"/><ellipse cx="${mx - 170}" cy="${my - 6}" rx="20" ry="15"/></g>
      <ellipse cx="${mx - 22}" cy="${my + 120}" rx="9" ry="13" fill="${K}"/><ellipse cx="${mx + 22}" cy="${my + 120}" rx="9" ry="13" fill="${K}"/><path d="M${mx - 18} ${my + 152} Q${mx} ${my + 170} ${mx + 18} ${my + 152}" fill="none" stroke="${K}" stroke-width="6" stroke-linecap="round"/>`;
    const log = `<rect x="640" y="520" width="700" height="90" rx="40" fill="#8a5a36" stroke="${K}" stroke-width="8"/><path d="M700 548 H900 M960 580 H1180" stroke="#5f3b20" stroke-width="7" stroke-linecap="round"/>`;
    // the tiny ones: bacteria under a microscope view
    let bac = ''; [[-50, -40, 20], [30, -50, -30], [-20, 30, 70], [56, 24, 10], [-64, 44, -40]].forEach(([x, y, r]) => bac += `<rect x="${250 + x - 34}" y="${410 + y - 14}" width="68" height="28" rx="14" fill="#7be08a" stroke="${K}" stroke-width="6" transform="rotate(${r} ${250 + x} ${410 + y})"/>`);
    const scope = bubble(250, 410, 116, `<rect x="120" y="280" width="260" height="260" fill="#103a52"/>${bac}`) + sticker(em('🔬', 400, 470, 120));
    return bgLeafy() + spot(mx, 330, 400, '#fff', .45) + log + bubble(596, 340, 78, `<rect x="500" y="240" width="200" height="200" fill="#eaffd8"/>` + em('🌱', 596, 344, 110)) + cross(656, 278, 30) + sticker(mush) + spores + scope;
  };

  /* ================= P5 ================= */

  // P5 EP2  fertilisation: one sperm fuses with one egg
  S.fertilise = () => {
    const ex = 960, ey = 330;
    const [g1, d1] = rgrad([[0, '#fff3c4'], [.75, '#ffc98a'], [1, '#ff9f6b']], .4, .4, .65);
    const egg = `<defs>${d1}</defs><circle cx="${ex}" cy="${ey}" r="216" fill="#ffd6e8" opacity=".55"/><circle cx="${ex}" cy="${ey}" r="178" fill="url(#${g1})" stroke="${K}" stroke-width="9"/><circle cx="${ex + 34}" cy="${ey - 10}" r="54" fill="#ff8a6b" stroke="${K}" stroke-width="7"/><circle cx="${ex + 20}" cy="${ey - 26}" r="16" fill="#ffd0b8"/>`;
    const sperm = (x, y, rot, s = 1, win = false) => T(`translate(${x},${y}) rotate(${rot}) scale(${s})`, `<path d="M-24 0 Q-60 -34 -96 0 T-168 0 T-240 0" fill="none" stroke="${K}" stroke-width="17" stroke-linecap="round"/><path d="M-24 0 Q-60 -34 -96 0 T-168 0 T-240 0" fill="none" stroke="${win ? '#fff' : '#cfe6ff'}" stroke-width="8" stroke-linecap="round"/><ellipse cx="0" cy="0" rx="36" ry="24" fill="${win ? '#fff' : '#cfe6ff'}" stroke="${K}" stroke-width="7"/><ellipse cx="12" cy="0" rx="14" ry="12" fill="#6fa8ff"/>`);
    return bgBody('#ff6fa3', '#7a3bd0') + spot(ex, ey, 420, '#fff', .5) + sticker(egg) +
      blurred(sperm(250, 300, 8, .7) + sperm(330, 520, -14, .7) + sperm(120, 430, 0, .6)) +
      sticker(sperm(520, 300, 14, .9) + sperm(600, 500, -24, .9)) +
      sticker(sperm(752, 372, -10, 1.15, true)) + ring(770, 368, 74) + word('1', 690, 286, 110, Y);
  };

  // P5 EP3  pollination: bright petals attract the bee that carries pollen grains
  const flower = (x, y, s, c1, c2) => { let p = ''; for (let i = 0; i < 8; i++) p += `<ellipse cx="0" cy="-104" rx="50" ry="84" fill="${i % 2 ? c1 : c2}" stroke="${K}" stroke-width="7" transform="rotate(${i * 45})"/>`;
    let an = ''; for (let i = 0; i < 8; i++) { const a = i * P / 4 + .3; an += `<circle cx="${40 * Math.cos(a)}" cy="${40 * Math.sin(a)}" r="11" fill="#ffb31f" stroke="${K}" stroke-width="4"/>`; }
    return T(`translate(${x},${y}) scale(${s})`, `${p}<circle r="66" fill="${Y}" stroke="${K}" stroke-width="7"/>${an}<circle r="16" fill="#8fd65a" stroke="${K}" stroke-width="5"/>`); };
  S.pollinate = () => {
    const stem = (x, y, y2) => `<path d="M${x} ${y} Q${x - 20} ${(y + y2) / 2} ${x} ${y2}" fill="none" stroke="${K}" stroke-width="30" stroke-linecap="round"/><path d="M${x} ${y} Q${x - 20} ${(y + y2) / 2} ${x} ${y2}" fill="none" stroke="#3fae4f" stroke-width="16" stroke-linecap="round"/>`;
    const pollen = [[640, 300], [676, 330], [610, 340], [650, 366], [700, 296], [560, 392], [500, 420], [770, 330]].map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="${i < 5 ? 12 : 9}" fill="#ffd23f" stroke="${K}" stroke-width="5"/>`).join('');
    return bgGarden(600) + spot(1000, 300, 420, '#fff', .55) +
      sticker(stem(250, 440, 640) + flower(250, 410, .62, '#ff9a3c', '#ffb86b')) + sticker(stem(1010, 330, 640) + flower(1010, 316, 1.3, '#ff3b8d', '#ff6bb0')) +
      dots('M330 380 Q470 240 610 300', '#fff') + sticker(em('🐝', 660, 290, 210)) + pollen + arrow(770, 300, 880, 300, { c: Y, w: 20 });
  };

  // P5 EP5  four ways seeds travel: wind, animals, splitting, water
  S.disperse = () => {
    const wing = `<g stroke="${K}" stroke-width="6" stroke-linejoin="round"><path d="M0 0 Q-70 -80 -40 -150 Q0 -110 0 0Z" fill="#d9a05a"/><path d="M0 0 Q70 -80 40 -150 Q0 -110 0 0Z" fill="#e9b877"/><ellipse cx="0" cy="14" rx="24" ry="30" fill="#8a5326"/></g>`;
    const b1 = `<rect x="20" y="290" width="240" height="240" fill="#bfe8ff"/>` + T('translate(150,440) rotate(24) scale(.82)', wing) + `<g stroke="#fff" stroke-width="8" stroke-linecap="round" fill="none"><path d="M60 360 Q110 340 150 360 M54 400 Q90 384 116 398 M70 480 Q120 500 170 486"/></g>`;
    const b2 = `<rect x="260" y="290" width="240" height="240" fill="#ffe7b8"/>` + em('🐒', 372, 398, 124) + em('🍒', 428, 458, 62);
    const pod = `<g stroke="${K}" stroke-width="6" stroke-linejoin="round"><path d="M-70 40 Q-60 -40 0 -64 Q-10 0 -70 40Z" fill="#8fbf4a"/><path d="M70 40 Q60 -40 0 -64 Q10 0 70 40Z" fill="#a9d45f"/></g><g fill="#5a3a1e" stroke="${K}" stroke-width="4"><circle cx="-10" cy="-84" r="11"/><circle cx="44" cy="-74" r="11"/><circle cx="-60" cy="-62" r="11"/><circle cx="16" cy="-30" r="11"/></g><g stroke="${Y}" stroke-width="7" stroke-linecap="round"><path d="M-26 -50 L-36 -70 M22 -56 L30 -70 M0 -100 V-112"/></g>`;
    const b3 = `<rect x="500" y="290" width="240" height="240" fill="#e4f7c8"/>` + T('translate(616,446)', pod);
    const coco = `<g stroke="${K}" stroke-width="8" stroke-linejoin="round"><ellipse cx="0" cy="0" rx="150" ry="118" fill="#9a6338"/><ellipse cx="-30" cy="-30" rx="92" ry="60" fill="#b9814e" stroke="none"/><path d="M-90 -20 Q-40 -60 30 -50 M-70 30 Q0 0 80 20 M-20 70 Q30 50 90 64" fill="none" stroke="#6b4222" stroke-width="6" stroke-linecap="round"/><circle cx="84" cy="-28" r="10" fill="#4f2f1b"/><circle cx="108" cy="2" r="10" fill="#4f2f1b"/><circle cx="76" cy="12" r="10" fill="#4f2f1b"/></g>`;
    const [g, d] = vgrad([[0, '#35b6e8'], [1, '#0f6fb5']]);
    const sea = `<defs>${d}</defs><path d="M700 730 Q730 440 800 440 Q840 410 880 440 T1000 440 T1120 440 T1240 440 T1360 440 V730Z" fill="url(#${g})" stroke="${K}" stroke-width="8"/><path d="M820 510 Q860 492 900 510 T980 510 M1040 560 Q1080 542 1120 560 T1200 560" fill="none" stroke="#bfeaff" stroke-width="8" stroke-linecap="round"/>`;
    return blurred(sky([[0, '#58b9ff'], [.6, '#c8eeff'], [1, '#ffe9b0']]) + clouds([[980, 120, 1.2], [1200, 240, .9]]) + `<rect y="520" width="1280" height="200" fill="#f2d79a"/>`) + vignette(.3) + spot(1010, 330, 330, '#fff', .5) +
      sticker(T('translate(1030,336) rotate(-8)', coco)) + shadow(sea) + arrow(900, 200, 1180, 200, { c: '#fff', w: 18, bend: -30 }) +
      bubble(140, 410, 100, b1, '#fff', 1) + bubble(380, 410, 100, b2, '#fff', 2) + bubble(620, 410, 100, b3, '#fff', 3) +
      `<circle cx="872" cy="262" r="36" fill="${Y}" stroke="${K}" stroke-width="7"/><text x="872" y="280" font-size="52" font-weight="700" text-anchor="middle" fill="${K}">4</text>`;
  };

  // P5 EP6  germination needs water, air (oxygen) and warmth
  S.germinate = () => {
    const sx = 1010, sy = 330;
    const seed = `<path d="M${sx} ${sy + 60} Q${sx - 10} ${sy + 150} ${sx + 26} ${sy + 232}" fill="none" stroke="${K}" stroke-width="28" stroke-linecap="round"/><path d="M${sx} ${sy + 60} Q${sx - 10} ${sy + 150} ${sx + 26} ${sy + 232}" fill="none" stroke="#fff3dc" stroke-width="14" stroke-linecap="round"/>
      <path d="M${sx - 30} ${sy - 70} Q${sx - 50} ${sy - 170} ${sx + 20} ${sy - 210}" fill="none" stroke="${K}" stroke-width="30" stroke-linecap="round"/><path d="M${sx - 30} ${sy - 70} Q${sx - 50} ${sy - 170} ${sx + 20} ${sy - 210}" fill="none" stroke="#7fd65a" stroke-width="16" stroke-linecap="round"/>` +
      leafShape(sx + 64, sy - 232, 60, 120, 62, '#5fcf5a') + leafShape(sx - 26, sy - 250, 54, 110, -40, '#7fd65a') +
      `<g stroke="${K}" stroke-width="8" stroke-linejoin="round"><path d="M${sx - 150} ${sy} Q${sx - 150} ${sy - 96} ${sx - 20} ${sy - 96} Q${sx + 150} ${sy - 100} ${sx + 160} ${sy + 10} Q${sx + 160} ${sy + 96} ${sx + 20} ${sy + 100} Q${sx - 150} ${sy + 100} ${sx - 150} ${sy}Z" fill="#c9783c"/><path d="M${sx - 60} ${sy - 92} Q${sx - 10} ${sy} ${sx - 40} ${sy + 96}" fill="none" stroke="#7a431c" stroke-width="7"/></g><ellipse cx="${sx + 60}" cy="${sy - 40}" rx="50" ry="24" fill="#e09a5f" opacity=".8"/>`;
    const b = (x, n, e, col) => bubble(x, 414, 96, `<rect x="${x - 110}" y="304" width="220" height="220" fill="${col}"/>` + e, '#fff', n);
    const airIn = `<g fill="#fff" stroke="${K}" stroke-width="5"><circle cx="350" cy="386" r="30"/><circle cx="398" cy="440" r="22"/><circle cx="330" cy="452" r="18"/></g><text x="350" y="398" font-size="32" font-weight="700" text-anchor="middle" fill="${K}">air</text>`;
    return bgGarden(470) + spot(sx, 320, 380, '#fff', .55) + sticker(seed) +
      b(130, 1, em('💧', 130, 420, 110), '#d6f1ff') + b(362, 2, airIn, '#bfe8d8') + b(594, 3, em('🌡️', 594, 420, 116), '#ffe2c2') +
      arrow(708, 414, 800, 380, { c: Y, w: 20 });
  };

  // P5 EP16  air is only about 21% oxygen
  S.airPie = () => {
    const cx = 930, cy = 320, r = 210;
    const pt = (f, rr = r, ox = 0, oy = 0) => [cx + ox + rr * Math.sin(2 * P * f), cy + oy - rr * Math.cos(2 * P * f)];
    const slice = (f0, f1, c, ox = 0, oy = 0) => { const [x0, y0] = pt(f0, r, ox, oy), [x1, y1] = pt(f1, r, ox, oy); return `<path d="M${cx + ox} ${cy + oy} L${x0} ${y0} A${r} ${r} 0 ${f1 - f0 > .5 ? 1 : 0} 1 ${x1} ${y1}Z" fill="${c}" stroke="${K}" stroke-width="9" stroke-linejoin="round"/>`; };
    const pie = slice(.21, .99, '#8a6bff') + slice(.99, 1, '#ffb31f') + slice(0, .21, '#31d0ff', 34, -26);
    const kid = T('translate(0,0)', kidHead(250, 400, 104, 'wow'));
    return bgBody('#2a8fd6', '#7fe0ff') + blurred(clouds([[300, 300, 1.2], [1150, 560, 1]])) + spot(cx, cy, 430, '#fff', .5) + sticker(pie) +
      word('?', 850, 440, 230, '#fff') + word('21%', 1146, 150, 92, Y) + word('O' + sub2, 1050, 252, 66, K === K ? '#fff' : '#fff') +
      sticker(kid) + `<g fill="none" stroke="#fff" stroke-width="10" stroke-linecap="round" opacity=".95"><path d="M560 380 Q470 350 400 400 M580 440 Q490 430 410 440 M560 500 Q480 500 404 474"/></g>` + arrow(470, 440, 380, 440, { c: '#31d0ff', w: 16 });
  };

  /* ================= P6 ================= */

  // P6 EP1  does mould need food? every living thing gets energy from food
  S.mould = () => {
    const bx = 950, by = 322;
    const patch = (x, y, s, c, c2) => { let o = ''; [[0, 0, 44], [-40, 14, 30], [38, 18, 32], [-10, -34, 28], [22, -28, 24], [-30, 40, 22], [14, 44, 24]].forEach(([a, b, r]) => o += `<circle cx="${a}" cy="${b}" r="${r}" fill="${c}" stroke="${K}" stroke-width="5"/>`);
      [[0, 0, 40], [-40, 14, 26], [38, 18, 28], [-10, -34, 24], [22, -28, 20], [-30, 40, 18], [14, 44, 20]].forEach(([a, b, r]) => o += `<circle cx="${a}" cy="${b}" r="${r}" fill="${c}"/>`);
      [[-8, -10], [20, 12], [-30, 20], [10, -36], [-14, 40]].forEach(([a, b]) => o += `<circle cx="${a}" cy="${b}" r="7" fill="${c2}"/>`);
      return T(`translate(${x},${y}) scale(${s})`, o); };
    const bread = `<g stroke="${K}" stroke-width="9" stroke-linejoin="round"><path d="M${bx - 200} ${by - 60} Q${bx - 250} ${by - 196} ${bx - 110} ${by - 200} Q${bx} ${by - 236} ${bx + 110} ${by - 200} Q${bx + 250} ${by - 196} ${bx + 200} ${by - 60} L${bx + 186} ${by + 210} Q${bx} ${by + 232} ${bx - 186} ${by + 210}Z" fill="#c98a4b"/>
      <path d="M${bx - 170} ${by - 66} Q${bx - 206} ${by - 166} ${bx - 100} ${by - 170} Q${bx} ${by - 200} ${bx + 100} ${by - 170} Q${bx + 206} ${by - 166} ${bx + 170} ${by - 66} L${bx + 158} ${by + 180} Q${bx} ${by + 198} ${bx - 158} ${by + 180}Z" fill="#ffe9bf" stroke-width="5"/></g>`;
    const face = `<circle cx="${bx - 34}" cy="${by + 30}" r="22" fill="#fff" stroke="${K}" stroke-width="5"/><circle cx="${bx + 34}" cy="${by + 30}" r="22" fill="#fff" stroke="${K}" stroke-width="5"/><circle cx="${bx - 28}" cy="${by + 34}" r="10" fill="${K}"/><circle cx="${bx + 40}" cy="${by + 34}" r="10" fill="${K}"/><path d="M${bx - 30} ${by + 76} Q${bx} ${by + 112} ${bx + 30} ${by + 76}Z" fill="#7a1f2b" stroke="${K}" stroke-width="6" stroke-linejoin="round"/>`;
    const mould = patch(bx, by + 50, 1.9, '#5fb58a', '#3a8f66') + patch(bx - 96, by - 96, .9, '#8ab8c9', '#5f93a8') + patch(bx + 112, by - 80, .7, '#5fb58a', '#3a8f66') + patch(bx + 120, by + 150, .5, '#8ab8c9', '#5f93a8') + face;
    const burst = (x, y, r, c = '#ff7a1f') => { let d = ''; for (let i = 0; i < 20; i++) { const a = i * P / 10, rr = i % 2 ? r * .72 : r; d += (i ? 'L' : 'M') + (x + rr * Math.cos(a)).toFixed(1) + ' ' + (y + rr * Math.sin(a)).toFixed(1); } return `<path d="${d}Z" fill="${c}" stroke="${K}" stroke-width="8" stroke-linejoin="round"/>`; };
    return bgKitchen() + spot(bx, by, 420, '#fff', .6) + sticker(chickenRice(170, 420, .62)) + arrow(330, 420, 430, 420, { c: '#ff3b3b', w: 20 }) +
      sticker(burst(540, 420, 100) + em('⚡', 540, 422, 110)) + sticker(bread + mould) + word('?', 1190, 150, 170, Y, 'middle', 12);
  };

  // P6 EP2  photosynthesis: light + water + carbon dioxide in, food and oxygen out
  S.photo = () => {
    const lx = 760, ly = 396;
    const veins = `<path d="M0 -196 V196 M0 -120 L70 -160 M0 -50 L96 -96 M0 30 L92 -16 M0 106 L66 68 M0 -120 L-70 -160 M0 -50 L-96 -96 M0 30 L-92 -16 M0 106 L-66 68" stroke="#1f7a3a" stroke-width="7" fill="none" stroke-linecap="round"/>`;
    const leaf = leafShape(lx, ly, 330, 430, 62, '#3fc45f', veins);
    const o2 = `<g fill="#eaf8ff" stroke="${K}" stroke-width="6"><circle cx="1120" cy="436" r="62"/><circle cx="1206" cy="350" r="30"/><circle cx="1216" cy="500" r="24"/></g><text x="1118" y="456" font-size="58" font-weight="700" text-anchor="middle" fill="${K}">O<tspan font-size="36" dy="10">2</tspan></text>`;
    return bgGarden(600) + spot(lx, ly, 430, '#fff', .55) + sticker(sun(1130, 130, 78)) +
      arrow(1050, 190, 900, 290, { c: Y, w: 26 }) + sticker(leaf) + word('FOOD', lx - 6, ly + 24, 84, Y, 'middle', -8) +
      sticker(em('💧', 250, 500, 104)) + arrow(320, 496, 548, 452, { c: '#3fa9ff', w: 22 }) +
      word('CO' + sub2, 250, 348, 76, '#fff') + arrow(350, 330, 560, 360, { c: '#c5cbdb', w: 22 }) +
      arrow(950, 424, 1040, 434, { c: '#7fe0ff', w: 18 }) + sticker(o2);
  };

  // P6 EP3  every food chain starts with the Sun
  S.sunChain = () => {
    const padi = T('translate(452,420)', `<g fill="none" stroke-linecap="round"><path d="M0 110 Q-6 20 -50 -70 M0 110 Q4 0 0 -100 M0 110 Q10 20 56 -66" stroke="${K}" stroke-width="22"/><path d="M0 110 Q-6 20 -50 -70 M0 110 Q4 0 0 -100 M0 110 Q10 20 56 -66" stroke="#5fcf5a" stroke-width="11"/></g>` +
      [[-56, -84, -30], [0, -116, 0], [62, -80, 30]].map(([x, y, r]) => `<g transform="translate(${x},${y}) rotate(${r})">${[0, 1, 2, 3].map(i => `<ellipse cx="${i % 2 ? 11 : -11}" cy="${i * 17 - 20}" rx="11" ry="15" fill="#ffd76b" stroke="${K}" stroke-width="5"/>`).join('')}</g>`).join(''));
    return bgPark() + spot(160, 400, 330, '#fff8b0', .8) + spot(1040, 380, 330, '#fff', .5) +
      sticker(sun(170, 404, 104, true)) +
      arrow(350, 404, 400, 404, { c: Y, w: 22 }) + sticker(padi) + arrow(530, 404, 590, 404, { c: Y, w: 22 }) + sticker(em('🐔', 690, 410, 170)) + arrow(800, 404, 860, 404, { c: Y, w: 22 }) +
      sticker(chickenRice(1040, 440, .66)) + sticker(kidHead(1120, 200, 96, 'open')) + arrow(1050, 380, 1090, 310, { c: Y, w: 18 });
  };

  // P6 EP4  a wound-up toy stores (elastic) potential energy in its spring
  S.windup = () => {
    const cx = 900, cy = 400;
    let sp = `M${cx - 30} ${cy - 20}`; for (let i = 1; i <= 90; i++) { const a = i * .28, r = 5 + i * .92; sp += ` L${(cx - 30 + r * Math.cos(a)).toFixed(1)} ${(cy - 20 + r * Math.sin(a)).toFixed(1)}`; }
    const wheel = x => `<circle cx="${x}" cy="${cy + 112}" r="62" fill="#2b3350" stroke="${K}" stroke-width="8"/><circle cx="${x}" cy="${cy + 112}" r="26" fill="#e9eef8" stroke="${K}" stroke-width="6"/>`;
    const car = `<g stroke="${K}" stroke-width="9" stroke-linejoin="round"><path d="M${cx - 300} ${cy + 110} V${cy + 10} Q${cx - 300} ${cy - 40} ${cx - 240} ${cy - 50} L${cx - 170} ${cy - 150} Q${cx - 150} ${cy - 176} ${cx - 110} ${cy - 176} H${cx + 90} Q${cx + 130} ${cy - 176} ${cx + 160} ${cy - 140} L${cx + 220} ${cy - 50} Q${cx + 310} ${cy - 40} ${cx + 310} ${cy + 20} V${cy + 110}Z" fill="#ff4b4b"/>
      <path d="M${cx + 110} ${cy - 150} L${cx + 180} ${cy - 54} H${cx + 96} V${cy - 150}Z" fill="#bfeaff"/></g>
      <circle cx="${cx - 30}" cy="${cy - 20}" r="112" fill="#1b2450" stroke="${K}" stroke-width="9"/><path d="${sp}" fill="none" stroke="${Y}" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="${cx + 270}" cy="${cy + 20}" r="20" fill="${Y}" stroke="${K}" stroke-width="6"/>` + wheel(cx - 190) + wheel(cx + 190);
    const key = T(`translate(${cx - 300},${cy - 10})`, `<g stroke="${K}" stroke-width="8" stroke-linejoin="round"><rect x="-80" y="-12" width="90" height="24" fill="#c5cbdb"/><ellipse cx="-110" cy="-50" rx="42" ry="56" fill="${Y}"/><ellipse cx="-110" cy="50" rx="42" ry="56" fill="${Y}"/><ellipse cx="-110" cy="-50" rx="16" ry="26" fill="#1b2450" opacity=".35" stroke="none"/><ellipse cx="-110" cy="50" rx="16" ry="26" fill="#1b2450" opacity=".35" stroke="none"/></g>`);
    return bgWall('#d8f6ff', '#6fc3ff', '#3a4a8a') + spot(cx, cy, 440, '#fff', .55) + sticker(key + car) + ring(cx - 30, cy - 20, 130) +
      arrow(430, 300, 430, 470, { c: Y, w: 20, bend: 90 }) + word('?', 250, 420, 220, Y, 'middle', -10) +
      `<g stroke="#fff" stroke-width="10" stroke-linecap="round" opacity=".9"><path d="M1230 330 H1270 M1236 400 H1276 M1230 470 H1270"/></g>`;
  };

  // P6 EP5  trace the fan's energy back: Sun -> fuel -> power station -> fan
  S.fanSun = () => {
    const fx = 1090, fy = 290;
    let cage = ''; for (let i = 0; i < 12; i++) cage += `<line x1="${fx}" y1="${fy}" x2="${fx + 150 * Math.cos(i * P / 6)}" y2="${fy + 150 * Math.sin(i * P / 6)}" stroke="#dfe5f2" stroke-width="4"/>`;
    const blade = r => `<path d="M0 -14 Q60 -110 110 -70 Q130 -20 20 14Z" fill="#31d0c0" stroke="${K}" stroke-width="7" stroke-linejoin="round" transform="rotate(${r})"/>`;
    const fan = `<g stroke="${K}" stroke-width="8" stroke-linejoin="round"><rect x="${fx - 16}" y="${fy + 130}" width="32" height="150" fill="#c5cbdb"/><path d="M${fx - 110} ${fy + 300} Q${fx} ${fy + 240} ${fx + 110} ${fy + 300}Z" fill="#6b7592"/></g>
      <circle cx="${fx}" cy="${fy}" r="156" fill="#f5f8ff" stroke="${K}" stroke-width="9"/>${cage}${T(`translate(${fx},${fy})`, blade(10) + blade(130) + blade(250))}<circle cx="${fx}" cy="${fy}" r="30" fill="${Y}" stroke="${K}" stroke-width="7"/><circle cx="${fx}" cy="${fy}" r="156" fill="none" stroke="${K}" stroke-width="9"/>`;
    const wind = `<g fill="none" stroke="#fff" stroke-width="10" stroke-linecap="round"><path d="M900 200 Q850 190 800 210 M910 270 Q850 262 790 282 M900 340 Q850 334 810 350"/></g>`;
    return bgPark() + spot(fx, fy, 380, '#fff', .55) + spot(150, 420, 280, '#fff8b0', .7) +
      sticker(sun(150, 420, 88, true)) + arrow(300, 420, 348, 420, { c: Y, w: 22 }) +
      bubble(440, 420, 78, `<rect x="350" y="330" width="180" height="180" fill="#2b3350"/>` + em('🔥', 440, 418, 96)) + arrow(538, 420, 586, 420, { c: Y, w: 22 }) +
      sticker(em('🏭', 696, 404, 170)) + arrow(806, 420, 890, 420, { c: Y, w: 22 }) + sticker(em('⚡', 848, 350, 76)) +
      wind + sticker(fan) + tag('fuel', 440, 546, 40) + tag('power station', 696, 546, 40);
  };

  // P6 EP6  a force is a push or a pull
  S.pushPull = () => {
    const bx = 640, by = 410;
    const crate = `<g stroke="${K}" stroke-width="9" stroke-linejoin="round"><rect x="${bx - 130}" y="${by - 130}" width="260" height="260" rx="14" fill="#e0a45a"/><rect x="${bx - 100}" y="${by - 100}" width="200" height="200" fill="#f3c98a" stroke-width="6"/><path d="M${bx - 100} ${by - 100} L${bx + 100} ${by + 100} M${bx + 100} ${by - 100} L${bx - 100} ${by + 100}" stroke-width="16" stroke="#c98548"/></g>`;
    const rope = `<path d="M${bx + 130} ${by} H1010" stroke="${K}" stroke-width="22" stroke-linecap="round"/><path d="M${bx + 130} ${by} H1010" stroke="#f6e3b4" stroke-width="11" stroke-dasharray="16 8"/>`;
    const fist = T(`translate(1010,${by})`, `<g stroke="${K}" stroke-width="7" stroke-linejoin="round"><rect x="60" y="-36" width="340" height="72" rx="20" fill="#ffcf9e"/><rect x="170" y="-46" width="260" height="92" rx="14" fill="#3aa0ff"/><rect x="-36" y="-56" width="116" height="112" rx="34" fill="#ffcf9e"/><path d="M-8 -56 V-10 M20 -56 V-10 M48 -56 V-10" fill="none" stroke-width="6"/><rect x="-20" y="2" width="84" height="30" rx="15" fill="#ffcf9e"/></g>`);
    return bgWall('#e8fbff', '#8fd3ff', '#4a5a8a') + spot(bx, by, 380, '#fff', .55) + rope + sticker(crate) + sticker(hand(250, by, 1.25, 0, '#ffcf9e', 400, '#ff5a5a')) + sticker(fist) +
      arrow(250, 268, 470, 268, { c: '#ff3b3b', w: 30 }) + arrow(830, 268, 1050, 268, { c: '#2f9bff', w: 30 }) +
      word('PUSH', 150, 290, 64, '#fff') + word('PULL', 1160, 290, 64, '#fff') + `<rect y="540" width="1280" height="12" fill="${K}" opacity=".5"/>`;
  };

  // P6 EP7  friction: the grooves on a sole grip the floor
  S.friction = () => {
    const sx = 620, sy = 250;
    let teeth = ''; for (let i = 0; i < 12; i++) teeth += `<path d="M${sx + 30 + i * 46} ${sy + 246} h30 l-6 28 h-18Z" fill="#2b3350" stroke="${K}" stroke-width="6" stroke-linejoin="round"/>`;
    const shoe = `<g stroke="${K}" stroke-width="9" stroke-linejoin="round"><path d="M${sx + 20} ${sy + 200} Q${sx} ${sy + 60} ${sx + 70} ${sy + 20} Q${sx + 130} ${sy} ${sx + 170} ${sy + 50} L${sx + 330} ${sy + 120} Q${sx + 480} ${sy + 130} ${sx + 560} ${sy + 176} Q${sx + 590} ${sy + 196} ${sx + 586} ${sy + 214} H${sx + 20}Z" fill="#ff4b4b"/>
      <path d="M${sx + 440} ${sy + 132} Q${sx + 520} ${sy + 150} ${sx + 586} ${sy + 206} H${sx + 420}Z" fill="#fff"/><path d="M${sx + 30} ${sy + 60} Q${sx + 90} ${sy + 80} ${sx + 150} ${sy + 44}" fill="none" stroke="#fff" stroke-width="16"/>
      <rect x="${sx + 8}" y="${sy + 200}" width="590" height="52" rx="20" fill="#fff"/></g>
      <g stroke="#fff" stroke-width="12" stroke-linecap="round"><path d="M${sx + 200} ${sy + 84} l-30 46 M${sx + 250} ${sy + 104} l-30 46 M${sx + 300} ${sy + 124} l-30 46"/></g><path d="M${sx + 60} ${sy + 150} Q${sx + 180} ${sy + 190} ${sx + 330} ${sy + 186}" fill="none" stroke="#ffd23f" stroke-width="14" stroke-linecap="round"/>` + teeth;
    // zoom on the grooves biting into the rough floor
    let z = `<rect x="80" y="260" width="320" height="320" fill="#dff1ff"/><rect x="80" y="260" width="320" height="110" fill="#fff" stroke="${K}" stroke-width="7"/>`;
    for (let i = 0; i < 4; i++) z += `<path d="M${96 + i * 84} 368 h52 l-10 62 h-32Z" fill="#2b3350" stroke="${K}" stroke-width="6" stroke-linejoin="round"/>`;
    z += `<path d="M70 470 l30 -34 l36 30 l28 -32 l40 34 l30 -34 l36 32 l30 -30 l36 32 l40 -30 l40 40 V600 H70Z" fill="#8a93ad" stroke="${K}" stroke-width="7" stroke-linejoin="round"/>`;
    const floor = `<rect y="524" width="1280" height="196" fill="#8a93ad"/><rect y="524" width="1280" height="12" fill="${K}" opacity=".45"/>`;
    return blurred(sky([[0, '#ffb84c'], [1, '#ffe7a8']]) + bokeh([[1100, 140, 90, .25], [200, 300, 70, .2], [760, 120, 60, .2]], '#fff')) + floor + vignette(.35) + spot(900, 380, 380, '#fff', .5) +
      sticker(shoe) + ring(790, 512, 62, 40) +
      `<line x1="372" y1="450" x2="730" y2="506" stroke="${K}" stroke-width="20" stroke-linecap="round"/><line x1="372" y1="450" x2="730" y2="506" stroke="${Y}" stroke-width="10" stroke-linecap="round"/>` +
      bubble(240, 412, 130, z) + sticker(em('💦', 1190, 470, 90)) + tag('GRIP!', 240, 314, 56, Y);
  };

  // P6 EP8  the same 200 g block: gravity pulls less on the Moon, so it weighs less
  S.moonWeight = () => {
    const spring = (x, top, len, n = 9) => { let d = `M${x} ${top} V${top + 16}`; const h = (len - 32) / n; for (let i = 0; i < n; i++) d += ` L${x + (i % 2 ? -28 : 28)} ${top + 16 + h * (i + .5)}`; d += ` L${x} ${top + len - 16} V${top + len}`;
      return `<path d="${d}" fill="none" stroke="${K}" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="#e9eef8" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>`; };
    const block = (x, y) => `<rect x="${x - 74}" y="${y}" width="148" height="104" rx="12" fill="#ff8a3c" stroke="${K}" stroke-width="8"/><text x="${x}" y="${y + 68}" font-size="46" font-weight="700" text-anchor="middle" fill="${K}">200 g</text>`;
    const rig = (x, top, len) => `<rect x="${x - 110}" y="${top - 24}" width="220" height="26" rx="10" fill="#6b7592" stroke="${K}" stroke-width="8"/>` + spring(x, top, len) + block(x, top + len);
    const [g, d] = vgrad([[0, '#060a2a'], [1, '#27307a']]);
    const moonSide = `<defs>${d}<clipPath id="mwc"><path d="M700 0 H1280 V720 H640Z"/></clipPath></defs><g clip-path="url(#mwc)"><rect width="1280" height="720" fill="url(#${g})"/>${stars(60, 5, 480)}
      <path d="M560 560 Q900 470 1300 540 V720 H560Z" fill="#c9ccd8" stroke="${K}" stroke-width="8"/><g fill="#a3a8ba"><ellipse cx="820" cy="560" rx="54" ry="16"/><ellipse cx="1150" cy="566" rx="70" ry="18"/><ellipse cx="980" cy="620" rx="40" ry="12"/></g></g><path d="M700 0 L640 720" stroke="#fff" stroke-width="10"/>`;
    return blurred(sky([[0, '#4fb4ff'], [.7, '#c8eeff']]) + clouds([[160, 330, 1.1], [520, 280, .8]]) + `<rect y="540" width="1280" height="180" fill="#5cc45c"/>`) + moonSide + vignette(.3) +
      sticker(em('🌏', 1170, 120, 130)) + sticker(rig(400, 262, 150)) + sticker(rig(960, 262, 84, 5)) +
      arrow(230, 300, 230, 520, { c: '#ff3b3b', w: 34 }) + arrow(1136, 300, 1136, 392, { c: '#ff3b3b', w: 18 }) +
      `<line x1="500" y1="516" x2="1060" y2="516" stroke="#fff" stroke-width="6" stroke-dasharray="14 12" opacity=".9"/>` + word('?', 800, 420, 130, Y);
  };

  // P6 EP9  snails keep to damp, shady places: physical factors of a habitat
  const snail = (x, y, s) => { let sp = 'M0 0'; for (let i = 1; i <= 70; i++) { const a = i * .3, r = i * 1.32; sp += ` L${(r * Math.cos(a)).toFixed(1)} ${(r * Math.sin(a)).toFixed(1)}`; }
    return T(`translate(${x},${y}) scale(${s})`, `<g stroke="${K}" stroke-width="8" stroke-linejoin="round" stroke-linecap="round"><path d="M-226 -150 L-196 -40 M-150 -160 L-160 -40" fill="none" stroke-width="20"/><path d="M-226 -150 L-196 -40 M-150 -160 L-160 -40" fill="none" stroke="#f6d58a" stroke-width="8"/>
      <circle cx="-226" cy="-152" r="17" fill="#fff"/><circle cx="-150" cy="-162" r="17" fill="#fff"/><circle cx="-228" cy="-152" r="7" fill="${K}" stroke="none"/><circle cx="-152" cy="-162" r="7" fill="${K}" stroke="none"/>
      <path d="M-236 20 Q-250 -50 -180 -60 Q-130 -60 -120 0 Q-100 60 -20 70 H210 Q260 76 270 110 H-170 Q-226 100 -236 20Z" fill="#f6d58a"/><path d="M-200 30 Q-180 50 -150 36" fill="none" stroke-width="6"/>
      <circle cx="40" cy="-20" r="124" fill="#f08a3c"/><g transform="translate(40,-20)"><path d="${sp}" fill="none" stroke="#8a4a1c" stroke-width="10"/></g></g>`); };
  S.snail = () => {
    const [g, d] = vgrad([[0, '#12402e'], [1, '#0a2a20']]);
    const damp = `<defs>${d}<clipPath id="snc"><path d="M520 0 H1280 V720 H420Z"/></clipPath></defs><g clip-path="url(#snc)"><rect width="1280" height="720" fill="url(#${g})"/>${blurred(bokeh([[700, 200, 90, .2], [1100, 150, 120, .16], [900, 520, 100, .14]], '#7fe0a0'))}
      <path d="M420 520 H1280 V720 H420Z" fill="#3a2a1e"/><g fill="#7a5a2e" stroke="${K}" stroke-width="5">${[[560, 540, 20], [690, 556, -30], [1180, 540, 40], [1060, 560, -10], [800, 548, 60]].map(([x, y, r]) => `<ellipse cx="${x}" cy="${y}" rx="46" ry="18" transform="rotate(${r} ${x} ${y})"/>`).join('')}</g></g><path d="M520 0 L420 720" stroke="#fff" stroke-width="10"/>`;
    const dry = blurred(sky([[0, '#ffb84c'], [.7, '#ffe7a8']]) + `<rect y="520" width="1280" height="200" fill="#d9a35f"/><path d="M40 560 l60 30 l-20 50 M200 540 l40 60 l60 -10 M330 600 l50 -40" stroke="#8a5a2a" stroke-width="6" fill="none"/>`);
    return dry + damp + vignette(.35) + spot(900, 380, 330, '#bfffd8', .35) +
      sticker(sun(120, 330, 62)) + sticker(thermo(300, 250, 280, .88)) + sticker(em('🥵', 150, 480, 100)) +
      sticker(snail(900, 420, .92)) + drops([[650, 250, 1.3], [1150, 240, 1.5], [1210, 420, 1.1], [610, 420, 1]]) +
      sticker(leafShape(1090, 150, 150, 330, 68, '#3f9a4f', `<path d="M0 -150 V150" stroke="#1f6a3a" stroke-width="7" fill="none"/>`));
  };

  // P6 EP10  food web: what happens to the others when more birds arrive?
  S.foodWeb = () => {
    const n = (x, y, r, e, col = '#fff') => bubble(x, y, r, `<rect x="${x - r - 8}" y="${y - r - 8}" width="${2 * r + 16}" height="${2 * r + 16}" fill="${col}"/>` + em(e, x, y + 2, r * 1.25));
    const a = (x1, y1, x2, y2, b = 0) => arrow(x1, y1, x2, y2, { c: '#fff', w: 14, bend: b });
    const bird = (x, y, s) => sticker(em('🐦', x, y, s));
    return bgPark() + spot(1040, 280, 360, '#fff', .55) +
      a(196, 400, 330, 340) + a(196, 470, 330, 500) + a(486, 320, 800, 250, -20) + a(486, 500, 620, 480) + a(770, 440, 880, 340) + a(486, 480, 850, 330, 30) +
      n(120, 436, 76, '🌿', '#d8f7c8') + n(408, 320, 76, '🦗', '#fff3b8') + n(408, 500, 60, '🐛', '#e4f7c8') + n(700, 466, 70, '🐸', '#d6f1ff') +
      bird(1010, 300, 250) + bird(1180, 150, 130) + bird(860, 130, 110) + bird(1200, 420, 120) +
      word('+', 1090, 110, 110, Y) + word('?', 540, 290, 120, '#ff5a5a') + word('?', 820, 510, 100, '#ff5a5a');
  };

  // P6 EP11  a desert animal stays in its burrow by day and comes out in the cool night
  const fox = (x, y, s) => T(`translate(${x},${y}) scale(${s})`, `<g stroke="${K}" stroke-width="8" stroke-linejoin="round">
    <path d="M70 130 Q200 150 210 60 Q214 10 170 0 Q190 70 90 80Z" fill="#f0c27a"/><path d="M170 0 Q214 10 210 60 Q190 40 176 30Z" fill="#fff6e0" stroke-width="6"/>
    <path d="M-90 190 Q-110 60 -50 0 H50 Q110 60 90 190Z" fill="#f0c27a"/><path d="M-40 190 Q-46 90 0 60 Q46 90 40 190Z" fill="#fff6e0" stroke-width="6"/>
    <path d="M-70 -70 L-170 -300 Q-60 -280 -6 -110Z" fill="#f0c27a"/><path d="M70 -70 L170 -300 Q60 -280 6 -110Z" fill="#f0c27a"/>
    <path d="M-80 -110 L-146 -262 Q-76 -240 -36 -120Z" fill="#ffb0a0" stroke="none"/><path d="M80 -110 L146 -262 Q76 -240 36 -120Z" fill="#ffb0a0" stroke="none"/>
    <path d="M-104 -60 Q-110 -130 0 -134 Q110 -130 104 -60 Q70 30 0 48 Q-70 30 -104 -60Z" fill="#f6cf8a"/>
    <path d="M-50 -10 Q0 -40 50 -10 Q30 40 0 48 Q-30 40 -50 -10Z" fill="#fff6e0" stroke-width="5"/><ellipse cx="0" cy="-2" rx="15" ry="11" fill="${K}"/>
    <circle cx="-46" cy="-56" r="19" fill="${K}"/><circle cx="46" cy="-56" r="19" fill="${K}"/><circle cx="-40" cy="-63" r="7" fill="#fff" stroke="none"/><circle cx="52" cy="-63" r="7" fill="#fff" stroke="none"/></g>`);
  S.desertFox = () => {
    const [g, d] = vgrad([[0, '#0a0f3a'], [.7, '#2c3aa6'], [1, '#5a5fc0']]);
    const night = `<defs>${d}<clipPath id="dfc"><path d="M560 0 H1280 V720 H440Z"/></clipPath></defs><g clip-path="url(#dfc)"><rect width="1280" height="720" fill="url(#${g})"/>${stars(70, 9, 430)}
      <path d="M400 470 Q700 400 1000 470 T1300 440 V720 H400Z" fill="#6a6fb0"/><path d="M400 540 Q800 480 1300 540 V720 H400Z" fill="#4d5296"/><ellipse cx="760" cy="548" rx="96" ry="30" fill="#141a4d"/></g><path d="M560 0 L440 720" stroke="#fff" stroke-width="10"/>`;
    const moon = `<circle cx="700" cy="330" r="96" fill="#fff8d0" opacity=".18"/><circle cx="700" cy="330" r="64" fill="#fff6c8" stroke="${K}" stroke-width="8"/><circle cx="730" cy="310" r="52" fill="#1a2266"/>`;
    return bgDesert() + night + vignette(.3) + spot(930, 360, 330, '#cfd6ff', .35) +
      sticker(sun(150, 350, 70)) + sticker(thermo(330, 250, 280, .92)) + sticker(em('🥵', 170, 490, 104)) +
      moon + sticker(fox(985, 398, .86)) + word('?', 1200, 330, 150, Y, 'middle', 10);
  };

  // P6 EP12  conservation: help the hatchlings get across the beach to the sea
  const turtle = (x, y, s, r) => T(`translate(${x},${y}) rotate(${r}) scale(${s})`, `<g stroke="${K}" stroke-width="8" stroke-linejoin="round">
    <path d="M-50 -60 Q-150 -130 -170 -40 Q-110 -50 -60 -10Z" fill="#6fae8a"/><path d="M50 -60 Q150 -130 170 -40 Q110 -50 60 -10Z" fill="#6fae8a"/>
    <path d="M-50 70 Q-110 110 -90 150 Q-50 130 -30 90Z" fill="#6fae8a"/><path d="M50 70 Q110 110 90 150 Q50 130 30 90Z" fill="#6fae8a"/>
    <ellipse cx="0" cy="-116" rx="38" ry="44" fill="#7fc49a"/><circle cx="-16" cy="-128" r="7" fill="${K}" stroke="none"/><circle cx="16" cy="-128" r="7" fill="${K}" stroke="none"/>
    <ellipse cx="0" cy="10" rx="86" ry="104" fill="#3f7a5a"/><path d="M0 -60 L38 -30 V40 L0 76 L-38 40 V-30Z M0 -60 V-94 M38 -30 L80 -44 M38 40 L78 62 M0 76 V114 M-38 40 L-78 62 M-38 -30 L-80 -44" fill="#5f9a76" stroke-width="6"/></g>`);
  S.turtle = () => {
    const [g, d] = vgrad([[0, '#1f8fd6'], [1, '#5fd0e8']]);
    const sea = `<defs>${d}</defs><path d="M700 0 H1280 V330 Q1180 300 1100 250 Q1000 180 900 190 Q780 180 700 0Z" fill="url(#${g})"/><path d="M700 0 Q780 180 900 190 Q1000 180 1100 250 Q1180 300 1280 330" fill="none" stroke="#fff" stroke-width="26" stroke-linecap="round"/><path d="M930 110 Q970 92 1010 110 T1090 110 M1100 180 Q1140 162 1180 180 T1260 180" fill="none" stroke="#d6f6ff" stroke-width="8" stroke-linecap="round"/>`;
    const sand = sky([[0, '#ffe2a0'], [1, '#f2c070']]) + bokeh([[120, 300, 5, .3], [300, 520, 6, .3], [520, 330, 5, .3], [1000, 520, 6, .3], [1180, 470, 5, .3], [640, 540, 5, .3], [420, 440, 4, .3]], '#a8743a');
    const tracks = [[560, 548], [600, 520], [524, 520], [650, 496], [574, 478]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="16" ry="8" fill="#c99a52" transform="rotate(-40 ${x} ${y})"/>`).join('');
    return sand + sea + vignette(.3) + spot(790, 400, 300, '#fff', .5) + tracks +
      sticker(turtle(300, 440, .5, 60)) + sticker(turtle(470, 330, .42, 48)) +
      sticker(em('🥤', 1090, 450, 130, 14)) + sticker(em('🛍️', 150, 310, 100, -12)) + cross(1150, 392, 30) + cross(206, 262, 26) +
      dots('M880 320 Q930 250 990 200', '#fff') + arrow(960, 240, 1010, 176, { c: Y, w: 24 }) +
      sticker(turtle(760, 410, 1.12, 42));
  };
};
