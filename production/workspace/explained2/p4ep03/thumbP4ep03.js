// thumbP4ep03.js: P4 EP3's thumbnail in the series' v2 style (../THUMBNAIL_V2.md, as P4 EP2), drawn with the shared ../thumb_v2.js (required,
// not edited).   NODE_PATH=$(npm root -g) node thumbP4ep03.js      -> p4ep03/thumb.jpg (1280x720) and qa/thumb_320.jpg (the phone-feed check)
// The script's thumbnail (section 11): the mystery leaf HUGE and backlit (net veins glowing) on the right; Basil big at the left in his
// oversized detective cap on his helmet, holding up the CASE CLOSED stamp; GLITCH small behind him with his tape and "MANGO?" on his screen.
// Words that ask: WHOSE LEAF? (white, then sun-yellow, thick dark-violet stroke); a deep teal background; a tiny "P4" chip; nothing bottom right.
const path = require('path'); const { chromium } = require('playwright');
const V2 = require('../thumb_v2.js'); const INK = '#1E1638';
V2.THUMBS.p4ep03 = { ep: 'p4ep03', part: 1, chip: false, out: 'p4ep03/thumb.jpg', old: 'p4ep02/thumb.jpg',
  bg: { c: ['#D8FFF6', '#14A89A', '#06424A'], at: [1000, 330], rays: .22 },
  cuts: {
    basil: `(window.CAP = () => .3, window._T = 1, buddy("basil", 900, 1000, 640, 1, { pose: "pointing", tag: false, shadow: false, noreact: true, still: true, look: 3 })) + TF(1230, 640, 1.15, stampHandle(), 16) + TF(1260, 860, 1.3, stampMark("CASE CLOSED", "#2E9E4C", 44))`,
    leaf: `TF(960, 560, 2.4, '<g transform="rotate(-24) translate(-130 0)">' + hibLeaf({ id: "thl", glow: 1, hi: { small: .7 } }) + '</g>')`,
    glitch: `TF(960, 1000, .95, glitchTape(1, { face: "smug", talk: false, shadow: false, scr: '<rect x=".14" y=".62" width=".72" height=".26" rx=".05" fill="#0E3A3A" opacity=".9"/><text x=".5" y=".82" font-family="Fredoka" font-weight="700" font-size=".17" text-anchor="middle" fill="#9FFFE0">MANGO?</text>' }))` },
  layers: [
    { cut: 'glitch', x: 380, y: 300, w: 300, line: '#fff', lw: 8, glow: INK, rot: -6 },
    { cut: 'leaf', x: 700, y: 310, w: 520, line: '#fff', lw: 9, glow: INK, rot: 4 },
    { cut: 'basil', x: -30, y: 170, w: 620, line: '#fff', lw: 9, glow: INK },
    { svg: `<g transform="translate(292 34)"><rect x="0" y="0" width="64" height="40" rx="20" fill="#fff" stroke="${INK}" stroke-width="5"/><text x="32" y="29" text-anchor="middle" font-family="NunitoB" font-weight="900" font-size="26" fill="${INK}">P4</text></g>` } ],
  words: [{ t: 'WHOSE', x: 1250, y: 140, size: 132, fill: '#FFFFFF', rot: -3, anchor: 'end' }, { t: 'LEAF?', x: 1256, y: 290, size: 150, fill: '#FFD60A', rot: -3, anchor: 'end' }] };
(async () => { const b = await chromium.launch(); try { await V2.make(b, 'p4ep03');
  const p = await b.newPage({ viewport: { width: 700, height: 220 } }); const f = 'file://' + path.join(__dirname, 'thumb.jpg') + '?' + Date.now();
  const tmp = path.join(require('os').tmpdir(), 'thumbP4ep03_320.html'); require('fs').writeFileSync(tmp, `<body style="margin:0;background:#0F0F0F;display:flex;gap:20px;padding:20px"><img src="${f}" width="320" height="180"><img src="${f}" width="168" height="94"></body>`); await p.goto('file://' + tmp); await p.waitForLoadState('networkidle');
  await p.screenshot({ path: path.join(__dirname, 'qa', 'thumb_320.jpg'), type: 'jpeg', quality: 90 }); await p.close(); } finally { await b.close(); } })();
