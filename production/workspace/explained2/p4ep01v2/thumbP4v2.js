// thumbP4v2.js: P4 EP1 v2's thumbnail in the series' v2 style (../THUMBNAIL_V2.md), drawn with the shared ../thumb_v2.js (required, not edited).
//   NODE_PATH=$(npm root -g) node thumbP4v2.js      -> p4ep01v2/thumb.jpg (1280x720) and qa/thumb_320.jpg (the phone-feed size check)
// The script's thumbnail (section 11): Basil big (a third of the frame) sitting in the ice box, helmet on, a pigeon on it, deadpan; the snail
// big in the foreground wearing the cardboard crown; three words that ask: LOST TO A SNAIL?! (white, then sun-yellow, thick dark-violet
// outline); a bold sky-blue background; a tiny "P4" chip; nothing in the bottom right.
const path = require('path'); const { chromium } = require('playwright');
const V2 = require('../thumb_v2.js'); const INK = '#1E1638';
V2.THUMBS.p4ep01v2 = { ep: 'p4ep01v2', part: 1, chip: false, out: 'p4ep01v2/thumb.jpg', old: 'p4ep01/thumb.jpg',
  bg: { c: ['#E8F8FF', '#38B6FF', '#0B4F9C'], at: [700, 300], rays: .22 },
  cuts: {
    box: `TF(960, 980, 1.3, iceBoxBackV2(1)) + buddy("basil", 972, 950, 560, 1, { pose: "sit", tag: false, shadow: false, noreact: true, still: true, look: -3 }) + TF(930, 405, 1.35, pigeonV2(1, { ph: 2 })) + TF(960, 980, 1.3, iceBoxFrontV2(1))`,
    snail: `TF(960, 900, 3.2, snailV2(1.2, { crown: true }))` },
  layers: [
    { cut: 'box', x: 10, y: 150, w: 560, line: '#fff', lw: 9, glow: INK },
    { cut: 'snail', x: 470, y: 340, w: 420, line: '#fff', lw: 9, glow: INK, rot: -4 },
    { svg: `<g transform="translate(292 34)"><rect x="0" y="0" width="64" height="40" rx="20" fill="#fff" stroke="${INK}" stroke-width="5"/><text x="32" y="29" text-anchor="middle" font-family="NunitoB" font-weight="900" font-size="26" fill="${INK}">P4</text></g>` } ],
  words: [{ t: 'LOST TO', x: 1250, y: 150, size: 120, fill: '#FFFFFF', rot: -3, anchor: 'end' }, { t: 'A SNAIL?!', x: 1256, y: 300, size: 150, fill: '#FFD60A', rot: -3, anchor: 'end' }] };
(async () => { const b = await chromium.launch(); try { await V2.make(b, 'p4ep01v2');
  const p = await b.newPage({ viewport: { width: 700, height: 220 } }); const f = 'file://' + path.join(__dirname, 'thumb.jpg') + '?' + Date.now();
  const tmp = path.join(require('os').tmpdir(), 'thumbP4v2_320.html'); require('fs').writeFileSync(tmp, `<body style="margin:0;background:#0F0F0F;display:flex;gap:20px;padding:20px"><img src="${f}" width="320" height="180"><img src="${f}" width="168" height="94"></body>`); await p.goto('file://' + tmp); await p.waitForLoadState('networkidle');
  await p.screenshot({ path: path.join(__dirname, 'qa', 'thumb_320.jpg'), type: 'jpeg', quality: 90 }); await p.close(); } finally { await b.close(); } })();
