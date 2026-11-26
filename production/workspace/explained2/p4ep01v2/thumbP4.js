// thumbP4.js: P4 EP1's thumbnail in the series' v2 style (../THUMBNAIL_V2.md), drawn with the shared ../thumb_v2.js (required, not edited).
//   NODE_PATH=$(npm root -g) node thumbP4.js        -> p4ep01/thumb.jpg (1280x720) and qa/thumb_320.jpg (the phone-feed size check)
// The script's thumbnail (section 9): the PROBLEM, bold: Pip big (about a third of the frame), surprised, his helmet askew (the whole painting
// tilts; the helmet is the episode's own, drawn by the engine over the teacher's painting), sitting on the grass; the bare drive of his bike
// big on the right: the front gear and the back gear with NO chain and a big "?" in the empty gap between them; two words that ask: WHICH PART?
// (white, then sun-yellow, thick dark outline); a bold sky-blue background; a tiny "P4" chip by the logo; nothing in the bottom right.
const path = require('path'); const { chromium } = require('playwright');
const V2 = require('../thumb_v2.js'); const INK = '#1E1638';
V2.THUMBS.p4ep01 = { ep: 'p4ep01', part: 1, chip: false, out: 'p4ep01/thumb.jpg', old: 'ep27/thumb.jpg',
  bg: { c: ['#E8F8FF', '#38B6FF', '#0B4F9C'], at: [760, 300], rays: .22 },
  cuts: {
    drive: `TF(960, 600, 2.4, bikeP4(1, { chain: false, brakes: 0, bell: 0, saddle: false, stand: false, crank: .5, sh: 0, g2: 0 })) + TF(960 + 2.4 * (BK.RA[0] + BK.BB[0]) / 2, 600 + 2.4 * (BK.BB[1] - 14), 1, '<circle r="74" fill="#FFD60A" stroke="#1E1638" stroke-width="10"/>' + T(0, 38, '?', 110, '#1E1638'))`,
    pip: `buddy("pip", 960, 1040, 900, 1, { pose: "surprised", tag: false, shadow: false, noreact: true, still: true, helmet: true, look: -9 })` },
  layers: [
    { svg: `<path d="M0 600 Q640 560 1280 610 L1280 720 L0 720z" fill="#7CC85A"/><path d="M0 600 Q640 560 1280 610" stroke="#5E9E3E" stroke-width="6" fill="none"/>` },
    { cut: 'drive', x: 560, y: 250, w: 760, line: '#fff', lw: 8, glow: INK },
    { cut: 'pip', x: 10, y: 150, w: 470, line: '#fff', lw: 9, glow: INK },
    { svg: `<g transform="translate(292 34)"><rect x="0" y="0" width="64" height="40" rx="20" fill="#fff" stroke="${INK}" stroke-width="5"/><text x="32" y="29" text-anchor="middle" font-family="NunitoB" font-weight="900" font-size="26" fill="${INK}">P4</text></g>` } ],
  words: [{ t: 'WHICH', x: 1250, y: 122, size: 128, fill: '#FFFFFF', rot: -3, anchor: 'end' }, { t: 'PART?', x: 1256, y: 262, size: 150, fill: '#FFD60A', rot: -3, anchor: 'end' }] };
(async () => { const b = await chromium.launch(); try { await V2.make(b, 'p4ep01');
  const p = await b.newPage({ viewport: { width: 700, height: 220 } }); const f = 'file://' + path.join(__dirname, 'thumb.jpg') + '?' + Date.now();
  const tmp = path.join(require('os').tmpdir(), 'thumbP4_320.html'); require('fs').writeFileSync(tmp, `<body style="margin:0;background:#0F0F0F;display:flex;gap:20px;padding:20px"><img src="${f}" width="320" height="180"><img src="${f}" width="168" height="94"></body>`); await p.goto('file://' + tmp); await p.waitForLoadState('networkidle');
  await p.screenshot({ path: path.join(__dirname, 'qa', 'thumb_320.jpg'), type: 'jpeg', quality: 90 }); await p.close(); } finally { await b.close(); } })();
