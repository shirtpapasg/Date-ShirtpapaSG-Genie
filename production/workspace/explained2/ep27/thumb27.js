// thumb27.js: EP27's thumbnail in the series' v2 style (../THUMBNAIL_V2.md), drawn with the shared ../thumb_v2.js (required, not edited).
//   NODE_PATH=$(npm root -g) node thumb27.js        -> ep27/thumb.jpg (1280x720) and qa/thumb_320.jpg (the phone-feed size check)
// One striking image of the PROBLEM: the blazing sun over the box of ice cream wrapped in Pip's purple wool scarf and a melting cup;
// Momo big and shocked (her "Wool? You'll melt it!"); two words that ask and never answer: WOOL SCARF?! A hot orange-red burst (EP23 was blue).
const path = require('path'), fs = require('fs'); const { chromium } = require('playwright');
const V2 = require('../thumb_v2.js'); const INK = '#1E1638';
V2.THUMBS.ep27 = { ep: 'ep27', part: 1, chip: false, out: 'ep27/thumb.jpg', old: 'ep23/thumb_part1.jpg',
  bg: { c: ['#FFF3B0', '#FF8A1E', '#7A1408'], at: [900, 300], rays: .24 },
  cuts: { hot: `sun27(1, 1060, 520, 52) + TF(1240, 900, 1.6, iceBox27(1, { wrap: 1 })) + TF(880, 990, 1.75, cup27(1, { melt: .6 })) + TF(1420, 520, 1.1, tempTag(0, 0, '33 °C', true))` },
  layers: [
    { cut: 'hot', x: 500, y: 262, w: 620, line: '#fff', lw: 8, glow: INK },
    { buddy: 'momo_v2_surprised', x: -30, y: 150, h: 600, line: '#fff', lw: 9, glow: INK } ],
  words: [{ t: 'WOOL', x: 1250, y: 120, size: 126, fill: '#FFFFFF', rot: -3, anchor: 'end' }, { t: 'SCARF?!', x: 1256, y: 262, size: 150, fill: '#FFD60A', rot: -3, anchor: 'end' }] };
(async () => { const b = await chromium.launch(); try { await V2.make(b, 'ep27');
  const p = await b.newPage({ viewport: { width: 700, height: 220 } }); const f = 'file://' + path.join(__dirname, 'thumb.jpg') + '?' + Date.now();
  await p.setContent(`<body style="margin:0;background:#0F0F0F;display:flex;gap:20px;padding:20px"><img src="${f}" width="320" height="180"><img src="${f}" width="168" height="94"></body>`); await p.waitForLoadState('networkidle');
  await p.screenshot({ path: path.join(__dirname, 'qa', 'thumb_320.jpg'), type: 'jpeg', quality: 90 }); await p.close(); } finally { await b.close(); } })();
