// thumbs_v2.js: designed YouTube thumbnails for promo films 1-3 (revoiced v2) -> up/thumb<N>_v2.jpg (1280x720, JPG).
// Film 4's look (film4/thumb.js): Fredoka 700 hook in white + gold with a dark outline and a coloured glow at the top,
// the story's key moment (a real frame of the film) in the middle, big Pip / Momo / Basil (v2 sprites) at the bottom corners.
//   NODE_PATH=$(npm root -g) node thumbs_v2.js [1 2 3]      (frames are pulled from film<N>_v2.mp4 into work/thumbs/)
const { chromium } = require('playwright'); const fs = require('fs'), path = require('path'), { execFileSync } = require('child_process');
const D = __dirname, WORK = path.join(D, 'work', 'thumbs'), SPR = path.join(D, '../../explained2/ep20/spr');
const FONT = path.join(D, '../../explained2/fonts/node_modules/@fontsource/fredoka/files/fredoka-latin-700-normal.woff2');
// sprite anchors from explained2/ep20/prep_sprites.py (as film4/spr.js): image w,h; feet anchor ax,ay; body height bh
const SP = { pip_surprised: [529, 643, 337.1, 624.8, 606.8], pip_thinking: [558, 643, 358, 624.8, 606.8], pip_cheer: [648, 643, 360.9, 624.8, 606.8],
  momo_surprised: [474, 641, 267.1, 623.2, 605.2], momo_pointing: [536, 641, 264.7, 623.2, 605.2],
  basil_worried: [578, 629, 343.7, 611.2, 593.2], basil_pointing: [626, 629, 337, 611.2, 593.2] };
const INK = '#1A1240', GOLD = '#FFD23F';

/* Each film: the hook (words in [] are gold), its glow colour, the frame(s) and how they are placed, the two buddies, the pill.
   A frame is placed by mapping the film point (fx,fy) to the canvas point (dx,dy) at scale s; areas the frame does not reach
   are filled by a blurred, enlarged copy of the same frame. */
const FILMS = {
  // 1 "The Forgetting Fog" 0:21.5: the fog swallows the Station from the left (lighthouse and dome fading), the buddies stare
  1: { hook: 'THE [FOG] IS COMING!', glow: '#C77DFF', t: [21.5],
       bg: [{ t: 21.5, s: 1.2, fx: 1250, fy: 800, dx: 1150, dy: 800, grade: 'f1' }], fog: true,
       buddies: [['momo_surprised', 205, 1095, 455, false], ['basil_worried', 1735, 1095, 445, true]],
       pill: { text: 'WE NEED A SCIENTIST!', y: 1006, fill: '#7B3FE4', w: 960 } },
  // 2 "The Sleeping Guardians": 0:17.6 the Dragon Guardian asleep (Momo shouting WAKE UP on its head) -> 0:55.5 awake in its fire
  2: { hook: 'WAKE THE [GUARDIANS]!', glow: '#FF7A2E', t: [17.6, 55.5], split: true,
       bg: [{ t: 17.6, s: 1.06, fx: 700, fy: 560, dx: 470, dy: 700, grade: 'asleep', clip: 'L' },
            { t: 55.5, s: 1.32, fx: 445, fy: 300, dx: 1440, dy: 600, grade: 'awake', clip: 'R' }],
       buddies: [['basil_pointing', 190, 1095, 420, false], ['pip_cheer', 1730, 1095, 420, true]],
       labels: [['ASLEEP', 610, 985, '#5B6B8C'], ['AWAKE!', 1310, 985, '#E8541E']] },
  // 3 "The Eclipse Riddle" 0:08.6: a dark shape blots out the Station's great lamp; the buddies gasp
  3: { hook: 'WHO STOLE THE [LIGHT]?', glow: '#FFC233', t: [8.6],
       bg: [{ t: 8.6, s: 1.14, fx: 0, fy: 140, dx: 0, dy: 0, grade: 'f3', corona: true,
             patch: [180, 858, 420, 92, 430] }],   // the 'TheOneApp Station' sign half behind Pip: covered by the empty rail 430 px to its right,
       buddies: [['pip_thinking', 215, 1095, 445, false], ['momo_pointing', 1745, 1095, 440, true]],
       pill: { text: 'SOLVE THE RIDDLE!', y: 985, fill: '#1F4FA8', w: 700 } } };

const b64 = (f, mime) => `data:${mime};base64,` + fs.readFileSync(f).toString('base64');
function frame(n, t) { const f = path.join(WORK, `f${n}_${t}.jpg`);
  if (!fs.existsSync(f)) execFileSync('ffmpeg', ['-loglevel', 'error', '-y', '-ss', String(t), '-i', path.join(D, `film${n}_v2.mp4`), '-frames:v', '1', '-q:v', '1', f]);
  return f; }

function page(n) { const F = FILMS[n]; const imgs = {}; for (const b of F.bg) imgs[b.t] = b64(frame(n, b.t), 'image/jpeg');
  const sprites = {}; for (const [k] of F.buddies) sprites[k] = b64(path.join(SPR, k + '.png'), 'image/png');
  const grades = { // colour grades (feColorMatrix): keep each film's own palette but push the three apart
    f1: '1.08 0 0 0 0.02  0 1.0 0 0 0  0 0 1.1 0 0.03  0 0 0 1 0',
    asleep: '0.40 0.40 0.15 0 0.02  0.35 0.45 0.15 0 0.03  0.35 0.40 0.35 0 0.08  0 0 0 1 0',
    awake: '1.25 0.05 0 0 0.03  0.05 1.0 0 0 0  0 0 0.85 0 0  0 0 0 1 0',
    f3: '0.80 0.06 0 0 0  0 0.92 0.06 0 0.01  0 0.08 1.10 0 0.03  0 0 0 1 0' };
  // the split for film 2: a slanted seam from (1010,0) to (900,1080)
  const clips = { L: 'M0 0H1010L900 1080H0Z', R: 'M1010 0H1920V1080H900Z' };
  let bg = '', clipdefs = '';
  for (const b of F.bg) { const W = 1920 * b.s, H = 1080 * b.s, x = b.dx - b.fx * b.s, y = b.dy - b.fy * b.s, href = imgs[b.t];
    const cl = b.clip ? `clip-path="url(#clip${b.clip})"` : '';
    bg += `<g ${cl}><g filter="url(#g_${b.grade})">
      <image href="${href}" x="${-192}" y="${-108}" width="${2304}" height="${1296}" preserveAspectRatio="none" filter="url(#fillblur)"/>
      <image href="${href}" x="${x}" y="${y}" width="${W}" height="${H}" mask="url(#edge_${b.t.toString().replace('.', '_')})"/>`;
    if (b.patch) { const [px, py, pw, ph, sx] = b.patch; // a feathered copy of the frame shifted by sx, over [px,py,pw,ph] (film pixels)
      bg += `<g clip-path="url(#patch${b.t.toString().replace('.', '_')})"><image href="${href}" x="${x - sx * b.s}" y="${y}" width="${W}" height="${H}" filter="url(#aa)"/></g>`;
      clipdefs += `<clipPath id="patch${b.t.toString().replace('.', '_')}"><rect x="${x + px * b.s}" y="${y + py * b.s}" width="${pw * b.s}" height="${ph * b.s}" rx="20"/></clipPath>`; }
    bg += `</g>`;
    if (b.corona) bg += `<g id="corona" data-href="1" data-x="${x}" data-y="${y}" data-s="${b.s}"></g>`;
    bg += `</g>`; }
  const masks = F.bg.map(b => { const x = b.dx - b.fx * b.s, y = b.dy - b.fy * b.s, W = 1920 * b.s, H = 1080 * b.s, id = 'edge_' + b.t.toString().replace('.', '_');
    // soft edge (60px) wherever the frame stops inside the canvas, so the blurred fill takes over without a seam
    return `<linearGradient id="${id}v" x1="0" y1="${y}" x2="0" y2="${y + H}" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fff" stop-opacity="${y > 0 ? 0 : 1}"/><stop offset="${Math.min(.5, 60 / H)}" stop-color="#fff"/><stop offset="${1 - Math.min(.5, 60 / H)}" stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity="${y + H < 1080 ? 0 : 1}"/></linearGradient>
      <mask id="${id}" maskUnits="userSpaceOnUse" x="-200" y="-200" width="2400" height="1500"><rect x="${x}" y="${y}" width="${W}" height="${H}" fill="url(#${id}v)"/></mask>`; }).join('');
  let seam = '';
  if (F.split) seam = `<path d="M1010 -10L900 1090" stroke="${GOLD}" stroke-width="26" opacity=".45" filter="url(#soft)"/><path d="M1010 -10L900 1090" stroke="#FFF6D8" stroke-width="9"/>
     <g transform="translate(955 600)" filter="url(#drop)"><path d="M-120 -44H20V-100L130 0L20 100V44H-120Z" fill="${GOLD}" stroke="${INK}" stroke-width="14" stroke-linejoin="round" paint-order="stroke"/></g>`;
  // top scrim: a blurred, darkened band behind the hook
  const scrim = `<g mask="url(#topband)"><g filter="url(#scrimblur)">${bg.replace(/<g id="corona"[^>]*><\/g>/, '')}</g><rect width="1920" height="460" fill="#0B0726" opacity=".55"/></g>
     <rect width="1920" height="460" fill="url(#topdark)"/>`;
  const words = F.hook.split(/(\[[^\]]+\])/).filter(Boolean).map(w => w.startsWith('[') ? `<tspan fill="${GOLD}">${w.slice(1, -1)}</tspan>` : `<tspan fill="#fff">${w}</tspan>`).join('');
  const hook = `<g id="hookg"><text id="hookglow" x="960" y="200" font-family="Fredoka" font-weight="700" font-size="150" text-anchor="middle" fill="${F.glow}" stroke="${F.glow}" stroke-width="40" stroke-linejoin="round" opacity=".75" filter="url(#hglow)">${F.hook.replace(/[\[\]]/g, '')}</text>
     <text id="hook" x="960" y="200" font-family="Fredoka" font-weight="700" font-size="150" text-anchor="middle" stroke="${INK}" stroke-width="26" stroke-linejoin="round" paint-order="stroke">${words}</text></g>`;
  const buddy = ([k, X, Y, Hb, flip]) => { const [w, h, ax, ay, bh] = SP[k], s = Hb / bh;
    const im = `<image href="${sprites[k]}" x="${-ax * s}" y="${-ay * s}" width="${w * s}" height="${h * s}"/>`;
    return `<g transform="translate(${X} ${Y}) scale(${flip ? -1 : 1} 1)" filter="url(#drop)">${im}</g>`; };
  const pill = (text, x, y, fill, w, size = 58) => `<g transform="translate(${x} ${y})" filter="url(#drop)"><rect x="${-w / 2}" y="-62" width="${w}" height="124" rx="62" fill="${fill}" stroke="#fff" stroke-width="9"/>
     <text x="0" y="${size * .36}" font-family="Fredoka" font-weight="700" font-size="${size}" text-anchor="middle" fill="#fff" stroke="${INK}" stroke-width="10" stroke-linejoin="round" paint-order="stroke">${text}</text></g>`;
  let extra = '', fog = '';
  if (F.fog) { // film 1: the fog's own look (pale lilac haze and spirals, as it fills the screen from 0:22) made stronger, so it reads small
    const spiral = (cx, cy, r, turns, a0) => { let d = ''; for (let i = 0; i <= 120; i++) { const u = i / 120, th = a0 + u * turns * 2 * Math.PI, rr = r * (0.18 + 0.82 * u);
      d += (i ? 'L' : 'M') + (cx + rr * Math.cos(th)).toFixed(1) + ' ' + (cy + rr * Math.sin(th)).toFixed(1); } return d; };
    fog = `<rect width="1920" height="1080" fill="url(#fogL)"/><g fill="none" stroke="#D9C6FF" stroke-linecap="round" filter="url(#aa)">
      <path d="${spiral(150, 640, 230, 1.6, 0.4)}" stroke-width="40" opacity=".32"/><path d="${spiral(560, 470, 150, 1.5, 2.4)}" stroke-width="30" opacity=".26"/>
      <path d="${spiral(1450, 300, 110, 1.3, 1.2)}" stroke-width="24" opacity=".16"/></g>`; }
  if (F.pill) extra += pill(F.pill.text, 960, F.pill.y, F.pill.fill, F.pill.w);
  if (F.labels) for (const [t, x, y, c] of F.labels) extra += pill(t, x, y, c, 330, 60);
  return `<!doctype html><html><head><meta charset="utf-8"><style>
  @font-face{font-family:Fredoka;font-weight:700;src:url(${b64(FONT, 'font/woff2')}) format("woff2")}
  html,body{margin:0;background:#120E2E;overflow:hidden} svg{display:block}</style></head><body>
  <svg id="v" xmlns="http://www.w3.org/2000/svg" width="1920" height="1080" viewBox="0 0 1920 1080"><defs>
    ${Object.entries(grades).map(([k, m]) => `<filter id="g_${k}" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values="${m}"/></filter>`).join('')}
    <filter id="fillblur" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="40"/></filter>
    <filter id="scrimblur" x="-5%" y="-5%" width="110%" height="110%"><feGaussianBlur stdDeviation="14"/></filter>
    <filter id="aa"><feGaussianBlur stdDeviation="2.2"/></filter>
    <filter id="soft" x="-50%" y="-10%" width="200%" height="120%"><feGaussianBlur stdDeviation="12"/></filter>
    <filter id="hglow" x="-20%" y="-60%" width="140%" height="220%"><feGaussianBlur stdDeviation="22"/></filter>
    <filter id="drop" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#0B0726" flood-opacity=".75"/></filter>
    <filter id="corglow" x="-30%" y="-60%" width="160%" height="220%"><feMorphology operator="dilate" radius="10" in="SourceAlpha" result="d"/><feGaussianBlur in="d" stdDeviation="26" result="b"/>
      <feFlood flood-color="#FFC233"/><feComposite in2="b" operator="in" result="g1"/><feGaussianBlur in="SourceAlpha" stdDeviation="5" result="b2"/><feFlood flood-color="#FFF3C4"/><feComposite in2="b2" operator="in" result="g2"/>
      <feMerge><feMergeNode in="g1"/><feMergeNode in="g1"/><feMergeNode in="g2"/></feMerge></filter>
    <clipPath id="clipL"><path d="${clips.L}"/></clipPath><clipPath id="clipR"><path d="${clips.R}"/></clipPath>
    <linearGradient id="topfade" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff"/><stop offset=".55" stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
    <mask id="topband" maskUnits="userSpaceOnUse" x="0" y="0" width="1920" height="1080"><rect width="1920" height="460" fill="url(#topfade)"/></mask>
    <linearGradient id="topdark" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0B0726" stop-opacity=".55"/><stop offset="1" stop-color="#0B0726" stop-opacity="0"/></linearGradient>
    <linearGradient id="fogL" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#E9DCFF" stop-opacity=".42"/><stop offset=".45" stop-color="#D7C2FF" stop-opacity=".16"/><stop offset=".7" stop-color="#D7C2FF" stop-opacity="0"/></linearGradient>
    <radialGradient id="vig" cx="50%" cy="52%" r="75%"><stop offset=".6" stop-color="#0B0726" stop-opacity="0"/><stop offset="1" stop-color="#0B0726" stop-opacity=".6"/></radialGradient>
    ${masks}${clipdefs}</defs>
  <g id="bg">${bg}</g>${fog}${seam}${scrim}<rect width="1920" height="1080" fill="url(#vig)"/>
  ${F.buddies.map(buddy).join('')}${extra}${hook}</svg>
  <script>window.CORONA=${JSON.stringify(F.bg.filter(b => b.corona).map(b => ({ href: imgs[b.t] })))};</script></body></html>`; }

(async () => { fs.mkdirSync(WORK, { recursive: true }); const which = process.argv.slice(2).length ? process.argv.slice(2) : ['1', '2', '3'];
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1920, height: 1080 } }); p.on('pageerror', e => console.log('PAGEERR', e.message));
  for (const n of which) { const html = path.join(WORK, `thumb${n}.html`); fs.writeFileSync(html, page(n)); await p.goto('file://' + html);
    await p.evaluate(async () => { await document.fonts.load('700 150px Fredoka'); await document.fonts.ready;
      await Promise.all([...document.images, ...document.querySelectorAll('image')].map(im => im.decode ? im.decode().catch(() => 0) : 0));
      // fit the hook to 1780 px wide
      const t = document.getElementById('hook'), g = document.getElementById('hookglow'), w = t.getBBox().width;
      if (w > 1780) { const fs2 = 150 * 1780 / w; t.setAttribute('font-size', fs2); g.setAttribute('font-size', fs2); }
      // film 3: trace the dark shape on the dome (near-black, low-blue pixels in its box) and give it a golden eclipse rim
      const c = document.getElementById('corona'); if (c && window.CORONA.length) {
        const img = new Image(); img.src = window.CORONA[0].href; await img.decode();
        const cv = document.createElement('canvas'); cv.width = 1920; cv.height = 1080; const x = cv.getContext('2d'); x.drawImage(img, 0, 0);
        const d = x.getImageData(0, 0, 1920, 1080), o = x.createImageData(1920, 1080);
        // each row of the shape is one run (an ellipse over a box), so fill from its first to its last dark pixel: no star holes
        for (let yy = 420; yy < 830; yy++) { let a = -1, z = -1, cnt = 0;
          for (let xx = 0; xx < 900; xx++) { const i = (yy * 1920 + xx) * 4; if (d.data[i] < 22 && d.data[i + 1] < 20 && d.data[i + 2] < 48) { if (a < 0) a = xx; z = xx; cnt++; } }
          if (cnt > 20) for (let xx = a; xx <= z; xx++) { const i = (yy * 1920 + xx) * 4; o.data[i] = 8; o.data[i + 1] = 6; o.data[i + 2] = 26; o.data[i + 3] = 255; } }
        x.clearRect(0, 0, 1920, 1080); x.putImageData(o, 0, 0); const m = cv.toDataURL('image/png');
        const X = +c.dataset.x, Y = +c.dataset.y, S = +c.dataset.s, NS = 'http://www.w3.org/2000/svg';
        const mk = (f) => { const e = document.createElementNS(NS, 'image'); e.setAttribute('href', m); e.setAttribute('x', X); e.setAttribute('y', Y);
          e.setAttribute('width', 1920 * S); e.setAttribute('height', 1080 * S); if (f) e.setAttribute('filter', f); return e; };
        c.appendChild(mk('url(#corglow)')); c.appendChild(mk('url(#aa)'));
        const q = document.createElementNS(NS, 'text'); q.setAttribute('x', X + 430 * S); q.setAttribute('y', Y + 700 * S); q.setAttribute('font-family', 'Fredoka');
        q.setAttribute('font-weight', '700'); q.setAttribute('font-size', '300'); q.setAttribute('text-anchor', 'middle'); q.setAttribute('fill', '#FFD23F');
        q.setAttribute('opacity', '.95'); q.setAttribute('filter', 'url(#hglow)'); q.textContent = '?'; c.appendChild(q.cloneNode(true));
        q.removeAttribute('filter'); q.setAttribute('stroke', '#1A1240'); q.setAttribute('stroke-width', '18'); q.setAttribute('paint-order', 'stroke'); c.appendChild(q);
        await new Promise(r => setTimeout(r, 300)); } });
    const png = path.join(WORK, `thumb${n}_full.png`); await p.screenshot({ path: png });
    const out = path.join(D, 'up', `thumb${n}_v2.jpg`);
    execFileSync('ffmpeg', ['-loglevel', 'error', '-y', '-i', png, '-vf', 'scale=1280:720:flags=lanczos', '-q:v', '2', out]);
    console.log(out, (fs.statSync(out).size / 1024).toFixed(0) + ' KB'); }
  await b.close(); })();
