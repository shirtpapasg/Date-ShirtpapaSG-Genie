// thumb_v2.js: the "v2" thumbnail style (click-rate pilot, Nov 2026). Rules and how-to: THUMBNAIL_V2.md.
//   node thumb_v2.js <key> [<key> ...]   draw the thumbnails named in THUMBS below (e.g. ep10_1), or "all"
//   node thumb_v2.js sheet               qa/thumb_pilot.jpg: old vs new for every entry, at full size and at 320 px
// How it works: (1) each "cut" is an SVG expression evaluated inside that episode's own engine page (epNN/page.html, so the episode's
// drawing functions, gradients and sprites are all there) and screenshotted on a transparent background; (2) the cut-outs, the teacher's
// buddy PNG (characters/sprites/poses/, never redrawn: only scaled, flipped, outlined) and the words are laid out on a 1280x720 page with a
// saturated burst background and saved as a JPG. Nothing here uploads anything.
const { chromium } = require('playwright'); const path = require('path'), fs = require('fs'), os = require('os');
const ROOT = __dirname, W = 1280, H = 720, INK = '#1E1638';
const FONT = path.join(ROOT, 'fonts/node_modules/@fontsource/nunito/files/nunito-latin-900-normal.woff2');
const FRED = path.join(ROOT, 'fonts/node_modules/@fontsource/fredoka/files/fredoka-latin-700-normal.woff2');
const TMP = path.join(os.tmpdir(), 'thumb_v2'); fs.mkdirSync(TMP, { recursive: true });

/* One entry per thumbnail.
   ep, part      the episode folder and the part (the engine page that draws the cuts; the small chip shows the part; chip: false for none)
   out, old      the JPG to write; the old thumbnail (for the comparison sheet)
   bg            { c: [centre, middle, edge] colours of the burst, at: [x, y] its centre, rays: ray opacity }
   cuts          name -> SVG expression (a string of JavaScript, run in the engine page; world 1920x1080; t = 1)
   layers        back to front, each one of
                   { cut, x, y, w, rot, flip, line, lw, glow }   a cut-out: left, top, width in px; line = sticker outline colour (or none)
                   { buddy, x, y, h, flip, rot, line, lw, glow }      a buddy pose file name without .png (or "pip_sit_wide" etc. from sprites/)
                   { svg }                                             raw SVG in the 1280x720 frame (a sea band, a floor line)
   words         [{ t, x, y, size, fill, rot, anchor }]: 0-3 words in all, white #FFFFFF or yellow #FFD60A, thick dark outline
*/
const THUMBS = {
  ep10_1: { ep: 'ep10', part: 1, out: 'ep10/thumb_v2_part1.jpg', old: 'ep10/thumb_part1.jpg',
    bg: { c: ['#FFF27A', '#FFB300', '#F4511E'], at: [830, 250], rays: .2 },
    cuts: { ship: `TF(960, 600, 1, shipSide())`,
      tub: `TF(960, 800, 1.6, tubSvg({ t: 1, label: false, inner: TF(0, TUB.fl - 16, 2.1, spoonM(), 3) + bubbles(3, 0, 10, () => -40, TUB.ys, 4, .5, 30, 5) }))` },
    layers: [
      { cut: 'ship', x: 290, y: 163, w: 1000, flip: true, glow: INK },
      { svg: `<rect x="0" y="453" width="${W}" height="${H}" fill="#0B63C8" opacity=".86"/><rect x="0" y="560" width="${W}" height="${H}" fill="#083C8C" opacity=".5"/>
        <path d="M0 453 ${Array.from({ length: 33 }, () => 'q10 -9 20 0 t20 0').join(' ')}" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round"/>` },
      { cut: 'tub', x: 640, y: 415, w: 430, line: '#fff', lw: 7, glow: INK },
      { buddy: 'basil_surprised', x: -40, y: 140, h: 610, line: '#fff', lw: 9, glow: INK } ],
    words: [{ t: 'HOW?!', x: 470, y: 178, size: 165, fill: '#FFD60A', rot: -4, anchor: 'start' }] },

  ep09_2: { ep: 'ep09', part: 2, out: 'ep09/thumb_v2_part2.jpg', old: 'ep09/thumb_part2.jpg',
    bg: { c: ['#7CFFB2', '#12B76A', '#05603A'], at: [860, 420], rays: .2 },
    cuts: { stick: `TF(960, 520, 1.5, stickSvg({ bend: 30, crack: 1 })) + TF(960 + 372, 574, 1.5, glovePinch(0), 15) + '<g transform="translate(' + (960 - 372) + ' 574) rotate(-15) scale(-1.5 1.5)">' + glovePinch(0) + '</g>'`,
      band: `TF(960, 540, 1.6, bandSvg(0, 1))` },
    layers: [
      { cut: 'stick', x: 330, y: 300, w: 1100, line: '#fff', lw: 7, glow: INK },
      { cut: 'band', x: 700, y: 492, w: 350, line: '#fff', lw: 7, glow: INK, rot: -6 },
      { buddy: 'momo_surprised', x: -30, y: 150, h: 600, line: '#fff', lw: 9, glow: INK } ],
    words: [{ t: 'WHICH', x: 1240, y: 122, size: 122, fill: '#FFFFFF', rot: -3, anchor: 'end' }, { t: 'SNAPS?', x: 1246, y: 236, size: 142, fill: '#FFD60A', rot: -3, anchor: 'end' }] },

  ep11_1: { ep: 'ep11', part: 1, out: 'ep11/thumb_v2_part1.jpg', old: 'ep11/thumb_part1.jpg',
    bg: { c: ['#B46BFF', '#6D28D9', '#2A0F6B'], at: [850, 430], rays: .16 },
    cuts: { clear: `'<rect x="792" y="270" width="336" height="388" fill="#FFF6D8"/>' + TF(960, 700, 1, frontView("clear", 1, { id: "tc" }))`,
      frost: `'<rect x="792" y="270" width="336" height="388" fill="#FFF6D8"/>' + TF(960, 700, 1, frontView("frost", 1, { id: "tf" }))` },
    layers: [
      { cut: 'clear', x: 455, y: 262, w: 400, line: '#fff', lw: 7, glow: '#FFE45C', rot: -3 },
      { cut: 'frost', x: 850, y: 262, w: 400, line: '#fff', lw: 7, glow: '#FFE45C', rot: 3 },
      { buddy: 'pip_surprised', x: -20, y: 150, h: 600, line: '#fff', lw: 9, glow: INK } ],
    words: [{ t: 'WHY', x: 456, y: 190, size: 112, fill: '#FFFFFF', rot: -3, anchor: 'start' }, { t: 'BLURRY?', x: 1256, y: 148, size: 112, fill: '#FFD60A', rot: -3, anchor: 'end' }] },
};

const file = (p) => 'file://' + path.resolve(p);
async function cutOut(b, th, name) {   // one cut-out PNG from the episode's engine; returns { png, w, h }
  const p = await b.newPage({ viewport: { width: 1920, height: 1080 } }); p.on('pageerror', (e) => console.log('PAGEERR', th.ep, e.message));
  await p.goto(file(path.join(ROOT, th.ep, 'page.html')) + '?part=' + th.part); await p.waitForFunction(() => window.READY === true, null, { timeout: 60000 });
  const box = await p.evaluate((e) => { document.documentElement.style.background = 'transparent'; document.body.style.background = 'transparent';
    const d = document.getElementById('dyn'); d.innerHTML = eval(e); const r = d.getBoundingClientRect(), pad = 14;
    const x = Math.max(0, Math.floor(r.left - pad)), y = Math.max(0, Math.floor(r.top - pad)); return { x, y, width: Math.min(1920, Math.ceil(r.right + pad)) - x, height: Math.min(1080, Math.ceil(r.bottom + pad)) - y }; }, th.cuts[name]);
  const png = path.join(TMP, `${th.ep}_${th.part}_${name}.png`); await p.screenshot({ path: png, omitBackground: true, clip: box }); await p.close(); return { png, w: box.width, h: box.height };
}
// the brand tag, drawn by the episode's own logo() (kept top left, small) and cut out the same way
const TAG = `logo(0, 40, 40, 1)`;
const size = (png) => { const d = fs.readFileSync(png); return [d.readUInt32BE(16), d.readUInt32BE(20)]; };
// a sticker outline (round, from the cut-out's own shape) and a soft glow behind it
const fx = (id, line, lw, glow) => `<filter id="${id}" x="-20%" y="-20%" width="140%" height="140%" color-interpolation-filters="sRGB">
  ${line ? `<feGaussianBlur in="SourceAlpha" stdDeviation="${lw * .55}"/><feComponentTransfer result="fat"><feFuncA type="linear" slope="40" intercept="-3"/></feComponentTransfer><feFlood flood-color="${line}"/><feComposite in2="fat" operator="in" result="edge"/>` : `<feMerge result="fat"><feMergeNode in="SourceAlpha"/></feMerge><feMerge result="edge"><feMergeNode in="SourceGraphic"/></feMerge>`}
  ${glow ? `<feGaussianBlur in="fat" stdDeviation="13"/><feOffset dy="6"/><feComponentTransfer result="gb"><feFuncA type="linear" slope=".85"/></feComponentTransfer><feFlood flood-color="${glow}"/><feComposite in2="gb" operator="in" result="gl"/>` : ''}
  <feMerge>${glow ? '<feMergeNode in="gl"/>' : ''}<feMergeNode in="edge"/><feMergeNode in="SourceGraphic"/></feMerge></filter>`;
function burst(bg) { const [cx, cy] = bg.at, n = 16, R = 1700; let rays = '';
  for (let i = 0; i < n; i++) { const a0 = (i / n) * 2 * Math.PI + .1, a1 = a0 + Math.PI / n; rays += `<path d="M${cx} ${cy} L${(cx + R * Math.cos(a0)).toFixed(1)} ${(cy + R * Math.sin(a0)).toFixed(1)} L${(cx + R * Math.cos(a1)).toFixed(1)} ${(cy + R * Math.sin(a1)).toFixed(1)}z"/>`; }
  return `<defs><radialGradient id="bgG" gradientUnits="userSpaceOnUse" cx="${cx}" cy="${cy}" r="900"><stop offset="0" stop-color="${bg.c[0]}"/><stop offset=".42" stop-color="${bg.c[1]}"/><stop offset="1" stop-color="${bg.c[2]}"/></radialGradient>
    <radialGradient id="bgV" cx=".5" cy=".5" r=".75"><stop offset=".62" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".38"/></radialGradient></defs>
    <rect width="${W}" height="${H}" fill="url(#bgG)"/><g fill="#fff" opacity="${bg.rays === undefined ? .18 : bg.rays}">${rays}</g><rect width="${W}" height="${H}" fill="url(#bgV)"/>`; }
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const word = (w) => `<g transform="translate(${w.x} ${w.y}) rotate(${w.rot || 0})" filter="url(#wsh)"><text text-anchor="${w.anchor || 'middle'}" font-family="NunitoB" font-weight="900" font-size="${w.size}" letter-spacing="-2" fill="${w.fill || '#fff'}" stroke="${INK}" stroke-width="${Math.round(w.size * .2)}" stroke-linejoin="round" paint-order="stroke">${esc(w.t)}</text></g>`;

async function make(b, key) { const th = THUMBS[key]; if (!th) throw new Error('no such thumbnail: ' + key + ' (have: ' + Object.keys(THUMBS).join(', ') + ')');
  const cuts = {}; for (const n of Object.keys(th.cuts)) cuts[n] = await cutOut(b, th, n);
  th.cuts._tag = TAG; const tag = await cutOut(b, th, '_tag'); delete th.cuts._tag;
  let defs = '', body = '', i = 0;
  for (const L of th.layers) { if (L.svg) { body += L.svg; continue; } const id = 'f' + (i++); let src, w, h;
    if (L.cut) { const c = cuts[L.cut]; src = c.png; w = L.w; h = L.w * c.h / c.w; }
    else { src = ['poses', '.'].map((d) => path.join(ROOT, 'characters/sprites', d, L.buddy + '.png')).find((f) => fs.existsSync(f)); if (!src) throw new Error('no buddy art: ' + L.buddy); const [pw, ph] = size(src); h = L.h; w = L.h * pw / ph; }
    defs += fx(id, L.line, L.lw || 8, L.glow);
    body += `<g transform="translate(${L.x + w / 2} ${L.y + h / 2}) rotate(${L.rot || 0}) scale(${L.flip ? -1 : 1} 1)" filter="url(#${id})"><image href="${file(src)}" x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}"/></g>`; }
  const tw = 250, tagS = `<image href="${file(tag.png)}" x="14" y="12" width="${tw}" height="${tw * tag.h / tag.w}"/>`;
  const chip = th.chip === false ? '' : `<g transform="translate(${14 + tw + 22} ${12 + tw * tag.h / tag.w / 2})"><circle r="19" fill="#fff" stroke="${INK}" stroke-width="5"/><text y="10" text-anchor="middle" font-family="NunitoB" font-weight="900" font-size="28" fill="${INK}">${th.part}</text></g>`;
  const html = `<!doctype html><meta charset="utf-8"><style>@font-face{font-family:NunitoB;font-weight:900;src:url(${file(FONT)})}@font-face{font-family:Fredoka;font-weight:700;src:url(${file(FRED)})}html,body{margin:0;background:#000}svg{display:block}</style>
  <svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">${burst(th.bg)}<defs>${defs}<filter id="wsh" x="-20%" y="-30%" width="140%" height="170%"><feDropShadow dx="0" dy="9" stdDeviation="5" flood-color="${INK}" flood-opacity=".55"/></filter></defs>
  ${body}${(th.words || []).map(word).join('')}${tagS}${chip}</svg>`;
  const tmp = path.join(TMP, key + '.html'); fs.writeFileSync(tmp, html); const p = await b.newPage({ viewport: { width: W, height: H } });
  await p.goto(file(tmp)); await p.evaluate(() => document.fonts.load('900 40px NunitoB').then(() => document.fonts.ready)); await p.waitForLoadState('networkidle');
  const out = path.join(ROOT, th.out); let q = 92; do { await p.screenshot({ path: out, type: 'jpeg', quality: q }); q -= 4; } while (fs.statSync(out).size > 1.9e6 && q > 60);
  await p.close(); console.log(th.out, Math.round(fs.statSync(out).size / 1024) + ' KB', 'words: ' + (th.words || []).map((w) => w.t).join(' ')); }

// the comparison sheet: a row per thumbnail: OLD and NEW large, then both at 320 px (the size in a phone feed), on YouTube's dark grey
async function sheet(b) { const keys = Object.keys(THUMBS).filter((k) => fs.existsSync(path.join(ROOT, THUMBS[k].out))), bw = 800, bh = 450, sw = 320, sh = 180;
  const rows = keys.map((k) => { const th = THUMBS[k], o = file(path.join(ROOT, th.old)), n = file(path.join(ROOT, th.out)) + '?' + Date.now();
    return `<div class="r"><div><p>${th.ep.toUpperCase()} Part ${th.part}: OLD</p><img src="${o}" width="${bw}" height="${bh}"></div><div><p>NEW (v2): ${(th.words || []).map((w) => w.t).join(' ')}</p><img src="${n}" width="${bw}" height="${bh}"></div>
      <div><p>at 320 px: old</p><img src="${o}" width="${sw}" height="${sh}"><p>at 320 px: new</p><img src="${n}" width="${sw}" height="${sh}"></div></div>`; }).join('');
  const html = `<!doctype html><meta charset="utf-8"><style>body{margin:0;background:#0F0F0F;font:700 22px sans-serif;color:#fff;width:${bw * 2 + sw + 100}px}.r{display:flex;gap:25px;padding:14px 25px}p{margin:8px 0 6px}img{display:block;border-radius:10px}</style>${rows}`;
  const tmp = path.join(TMP, 'sheet.html'); fs.writeFileSync(tmp, html); const p = await b.newPage({ viewport: { width: bw * 2 + sw + 100, height: 300 } }); await p.goto(file(tmp)); await p.waitForLoadState('networkidle');
  fs.mkdirSync(path.join(ROOT, 'qa'), { recursive: true }); await p.screenshot({ path: path.join(ROOT, 'qa/thumb_pilot.jpg'), type: 'jpeg', quality: 88, fullPage: true }); await p.close(); console.log('qa/thumb_pilot.jpg'); }

if (require.main === module) (async () => { let a = process.argv.slice(2); if (!a.length) { console.log('node thumb_v2.js <' + Object.keys(THUMBS).join('|') + '|all|sheet> ...'); return; }
  if (a.includes('all')) a = [...Object.keys(THUMBS), ...a.filter((x) => x === 'sheet')]; const b = await chromium.launch();
  try { for (const k of a) if (k === 'sheet') await sheet(b); else await make(b, k); } finally { await b.close(); } })();
module.exports = { THUMBS, make, sheet };
