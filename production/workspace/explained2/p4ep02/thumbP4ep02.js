// thumbP4ep02.js: P4 EP2's thumbnail in the series' v2 style (../THUMBNAIL_V2.md), drawn with the shared ../thumb_v2.js (required, not edited).
//   NODE_PATH=$(npm root -g) node thumbP4ep02.js      -> p4ep02/thumb.jpg (1280x720) and qa/thumb_320.jpg (the phone-feed size check)
// The script's thumbnail (section 11): Chilli big and wilting in its glossy orange pot, water spilling over the rim; GLITCH beside it, his
// can tipped and his screen showing swirly error eyes; Basil (a third of the frame) at the left, dripping, deadpan; three words that ask:
// WHY WILTING?! (white, then sun-yellow, thick dark-violet outline); a bold sky-blue background; a tiny "P4" chip; nothing bottom right.
const path = require('path'); const { chromium } = require('playwright');
const V2 = require('../thumb_v2.js'); const INK = '#1E1638';
V2.THUMBS.p4ep02 = { ep: 'p4ep02', part: 1, chip: false, out: 'p4ep02/thumb.jpg', old: 'p4ep01v2/thumb.jpg',
  bg: { c: ['#E8F8FF', '#38B6FF', '#0B4F9C'], at: [560, 320], rays: .22 },
  cuts: {
    basil: `buddy("basil", 960, 1000, 640, 1, { pose: "sit", tag: false, shadow: false, noreact: true, still: true, look: 3 }) + [0, 1, 2, 3].map((i) => '<path d="M' + [700, 760, 1180, 1240][i] + ' ' + (330 + (i % 2) * 40) + ' q-10 26 0 40 q10 -14 0 -40z" fill="#5CB8F0" stroke="#2C7FB8" stroke-width="4"/>').join("")`,
    chilli: `TF(960, 960, 2.3, chilliV3(1, { body: "wilt", face: "droop", talk: false, blink: false })) + '<ellipse cx="960" cy="618" rx="215" ry="24" fill="#5CB8F0"/><path d="M748 616 q-40 10 -50 70 q-12 90 -20 190" stroke="#5CB8F0" stroke-width="30" fill="none" stroke-linecap="round"/><path d="M1172 618 q40 14 46 80 q8 80 22 160" stroke="#5CB8F0" stroke-width="24" fill="none" stroke-linecap="round"/><circle cx="676" cy="930" r="14" fill="#5CB8F0"/>'`,
    glitch: `TF(960, 1000, .95, glitchV3(1, { pose: "jug", face: "error", talk: false, shadow: false }))` },
  layers: [
    { cut: 'basil', x: -20, y: 250, w: 470, line: '#fff', lw: 9, glow: INK },
    { cut: 'chilli', x: 330, y: 170, w: 470, line: '#fff', lw: 9, glow: INK },
    { cut: 'glitch', x: 720, y: 330, w: 330, line: '#fff', lw: 9, glow: INK, rot: 6 },
    { svg: `<g transform="translate(292 34)"><rect x="0" y="0" width="64" height="40" rx="20" fill="#fff" stroke="${INK}" stroke-width="5"/><text x="32" y="29" text-anchor="middle" font-family="NunitoB" font-weight="900" font-size="26" fill="${INK}">P4</text></g>` } ],
  words: [{ t: 'WHY', x: 1250, y: 150, size: 130, fill: '#FFFFFF', rot: -3, anchor: 'end' }, { t: 'WILTING?!', x: 1256, y: 300, size: 132, fill: '#FFD60A', rot: -3, anchor: 'end' }] };
(async () => { const b = await chromium.launch(); try { await V2.make(b, 'p4ep02');
  const p = await b.newPage({ viewport: { width: 700, height: 220 } }); const f = 'file://' + path.join(__dirname, 'thumb.jpg') + '?' + Date.now();
  const tmp = path.join(require('os').tmpdir(), 'thumbP4ep02_320.html'); require('fs').writeFileSync(tmp, `<body style="margin:0;background:#0F0F0F;display:flex;gap:20px;padding:20px"><img src="${f}" width="320" height="180"><img src="${f}" width="168" height="94"></body>`); await p.goto('file://' + tmp); await p.waitForLoadState('networkidle');
  await p.screenshot({ path: path.join(__dirname, 'qa', 'thumb_320.jpg'), type: 'jpeg', quality: 90 }); await p.close(); } finally { await b.close(); } })();
