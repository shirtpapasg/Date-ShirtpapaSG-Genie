// thumbs_v3.js: click-first YouTube thumbnails for promo films 1-3 -> up/thumb<N>_v3<a|b>.jpg (1280x720 JPG),
// plus a review sheet (all six large) and a phone-size check (168x94 next to film 4, on YouTube's white and dark UI).
// Principles and sources: THUMBNAILS.md. One giant subject, an emotional face looking at the problem, 1-3 huge words,
// one bold background colour per film (1 yellow, 2 blue, 3 magenta), a tiny "TheOneApp" pill top-left, nothing in the
// bottom-right (YouTube's duration stamp).
//   NODE_PATH=$(npm root -g) node thumbs_v3.js [outdir-for-copies]
const { chromium } = require('playwright'); const fs = require('fs'), path = require('path'), { execFileSync } = require('child_process');
const D = __dirname, UP = path.join(D, 'up'), WORK = path.join(D, 'work', 'thumbs_v3');
const SPR = path.join(D, '../../explained2/ep20/spr'), PETS = '/home/user/theoneapp/pets';
const FONT = path.join(D, '../../explained2/fonts/node_modules/@fontsource/fredoka/files/fredoka-latin-700-normal.woff2');
const FILM4 = path.join(D, '../film4/thumb.jpg');
const INK = '#1A1240', GOLD = '#FFD23F';
// sprite sizes (explained2/ep20/spr/manifest.js)
const SZ = { pip_surprised: [529, 643], basil_surprised: [612, 629], basil_worried: [578, 629], momo_surprised: [474, 641] };
const b64 = (f, mime) => `data:${mime};base64,` + fs.readFileSync(f).toString('base64');
const IMG = {}; const img = (k, f) => (IMG[k] = IMG[k] || b64(f, 'image/png'));
const spr = k => img(k, path.join(SPR, k + '.png'));

/* ---------- drawing helpers (1280x720 user space) ---------- */
// a sprite placed by its top-left at (x,y) with scale s; flip mirrors it in place
function sprite(k, x, y, s, flip) { const [w, h] = SZ[k];
  const tf = flip ? `translate(${x + w * s} ${y}) scale(${-s} ${s})` : `translate(${x} ${y}) scale(${s})`;
  return `<g filter="url(#drop)"><image href="${spr(k)}" width="${w}" height="${h}" transform="${tf}"/></g>`; }
function pet(file, x, y, size, extra = '') { return `<g filter="url(#drop)" ${extra}><image href="${img(file, path.join(PETS, file))}" x="${x}" y="${y}" width="${size}" height="${size}"/></g>`; }
// background: a radial wash (light behind the subject, deeper at the edges) and soft sunburst rays from the same point
function bg(id, inner, outer, cx, cy, rayCol, rayOp = 0.16) { let rays = '';
  for (let i = 0; i < 18; i++) { const a0 = (i / 18) * Math.PI * 2, a1 = a0 + Math.PI / 18, R = 1700;
    rays += `M${cx} ${cy}L${(cx + R * Math.cos(a0)).toFixed(0)} ${(cy + R * Math.sin(a0)).toFixed(0)}L${(cx + R * Math.cos(a1)).toFixed(0)} ${(cy + R * Math.sin(a1)).toFixed(0)}Z`; }
  return `<radialGradient id="${id}" cx="${cx}" cy="${cy}" r="900" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="${inner}"/><stop offset="1" stop-color="${outer}"/></radialGradient>
    <rect width="1280" height="720" fill="url(#${id})"/><path d="${rays}" fill="${rayCol}" opacity="${rayOp}"/>`; }
// the huge words: white Fredoka, thick ink outline, drop shadow; [x] marks an accent word. fit = max width
function words(lines, x, y, size, anchor = 'start', accent = GOLD, fit = 1200, lh = 0.92) {
  return `<g class="words" data-fit="${fit}" data-anchor="${anchor}" data-x="${x}" filter="url(#tdrop)">` + lines.map((ln, i) => {
    const sp = ln.split(/(\[[^\]]+\])/).filter(Boolean).map(w => w.startsWith('[') ? `<tspan fill="${accent}">${w.slice(1, -1)}</tspan>` : w).join('');
    return `<text x="${x}" y="${y + i * size * lh}" font-family="Fredoka" font-weight="700" font-size="${size}" text-anchor="${anchor}" fill="#fff" stroke="${INK}" stroke-width="${size * 0.16}" stroke-linejoin="round" paint-order="stroke" letter-spacing="1">${sp}</text>`; }).join('') + '</g>'; }
// the series mark: a small dark pill, "The" white, "One" gold, "App" white (as the films' end card)
const brand = `<g transform="translate(22 20)"><rect width="176" height="46" rx="23" fill="${INK}" stroke="#fff" stroke-width="3.5"/>
  <text x="88" y="32" font-family="Fredoka" font-weight="700" font-size="28" text-anchor="middle" fill="#fff">The<tspan fill="${GOLD}">One</tspan>App</text></g>`;
const spiral = (cx, cy, r, turns, a0) => { let d = ''; for (let i = 0; i <= 140; i++) { const u = i / 140, th = a0 + u * turns * 2 * Math.PI, rr = r * (0.12 + 0.88 * u);
  d += (i ? 'L' : 'M') + (cx + rr * Math.cos(th)).toFixed(1) + ' ' + (cy + rr * Math.sin(th)).toFixed(1); } return d; };
// the Forgetting Fog: a purple cloud bank of overlapping puffs with the film's lilac spirals in it
function fog(puffs, spirals, qs = []) {
  const P = puffs.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}"/>`).join('');
  return `<g filter="url(#fogsoft)"><g fill="#3B1C8C">${P}</g></g>
    <g filter="url(#fogsoft2)" opacity=".95"><g fill="url(#fogfill)">${puffs.map(([x, y, r]) => `<circle cx="${x - r * .08}" cy="${y - r * .1}" r="${r * .86}"/>`).join('')}</g></g>
    <g fill="none" stroke="#E4D6FF" stroke-linecap="round" opacity=".55">${spirals.map(([x, y, r, t, a, w]) => `<path d="${spiral(x, y, r, t, a)}" stroke-width="${w}"/>`).join('')}</g>
    ${qs.map(([x, y, s, rot, op]) => `<text x="${x}" y="${y}" font-family="Fredoka" font-weight="700" font-size="${s}" fill="#F1E9FF" opacity="${op}" text-anchor="middle" transform="rotate(${rot} ${x} ${y})">?</text>`).join('')}`; }
// the fog drawn as a cartoon cloud bank: ink outline round the union of the puffs, a purple body, lighter tops, curling
// tendrils (ink-edged strokes), the film's lilac spirals and a few faint question marks inside
function fogC(puffs, tendrils, spirals, qs = []) {
  const C = (o, k = 1, dx = 0, dy = 0) => puffs.map(([x, y, r]) => `<circle cx="${x + dx * r}" cy="${y + dy * r}" r="${r * k + o}"/>`).join('');
  const T = (w, col) => tendrils.map(d => `<path d="${d}" stroke="${col}" stroke-width="${w}" fill="none" stroke-linecap="round"/>`).join('');
  return `<g filter="url(#smoke)"><g filter="url(#drop)"><g fill="${INK}">${C(9)}</g>${T(74, INK)}</g><g fill="url(#fogfill)">${C(0)}</g>${T(56, '#7E56E6')}</g>
    <clipPath id="fogclip">${C(0)}</clipPath>
    <g fill="none" stroke="#EDE4FF" stroke-linecap="round" opacity=".7" clip-path="url(#fogclip)">${spirals.map(([x, y, r, t, a, w]) => `<path d="${spiral(x, y, r, t, a)}" stroke-width="${w}"/>`).join('')}</g>
    ${qs.map(([x, y, sz, rot, op]) => `<text x="${x}" y="${y}" font-family="Fredoka" font-weight="700" font-size="${sz}" fill="#F1E9FF" opacity="${op}" text-anchor="middle" transform="rotate(${rot} ${x} ${y})">?</text>`).join('')}`; }
// a dead light bulb (no glow): glass, filament, screw base; centre-top of the glass at (x,y), glass radius r
function bulb(x, y, r) { const cy = y + r, nb = r * 0.52;
  return `<g filter="url(#drop)"><path d="M${x - r} ${cy} A${r} ${r} 0 1 1 ${x + r} ${cy} C${x + r} ${cy + r * .55} ${x + nb} ${cy + r * .8} ${x + nb} ${cy + r * 1.22} L${x - nb} ${cy + r * 1.22} C${x - nb} ${cy + r * .8} ${x - r} ${cy + r * .55} ${x - r} ${cy}Z"
      fill="#5E6B86" stroke="${INK}" stroke-width="9"/>
    <path d="M${x - r * .62} ${cy - r * .35} A${r * .7} ${r * .7} 0 0 1 ${x - r * .1} ${cy - r * .78}" stroke="#C9D3E8" stroke-width="${r * .12}" fill="none" stroke-linecap="round" opacity=".8"/>
    <path d="M${x - nb * .5} ${cy + r * 1.2} L${x - nb * .5} ${cy + r * .4} M${x + nb * .5} ${cy + r * 1.2} L${x + nb * .5} ${cy + r * .4} M${x - nb * .5} ${cy + r * .4} q${nb * .25} ${-r * .3} ${nb * .5} 0 q${nb * .25} ${-r * .3} ${nb * .5} 0"
      stroke="#2B2F45" stroke-width="7" fill="none" stroke-linejoin="round"/>
    ${[0, 1, 2].map(i => `<rect x="${x - nb - 6}" y="${cy + r * 1.22 + i * r * .2}" width="${2 * nb + 12}" height="${r * .2}" rx="${r * .08}" fill="${i % 2 ? '#8E96A8' : '#B8BFCC'}" stroke="${INK}" stroke-width="7"/>`).join('')}
    <path d="M${x - nb * .6} ${cy + r * 1.82} L${x + nb * .6} ${cy + r * 1.82} L${x + nb * .25} ${cy + r * 2.02} L${x - nb * .25} ${cy + r * 2.02}Z" fill="#2B2F45" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/></g>`; }
// a battery lying on its side (gold body, dark band, + nub on the right), centred at (x,y), rotated rot degrees
function battery(x, y, w, h, rot) { return `<g transform="translate(${x} ${y}) rotate(${rot})" filter="url(#drop)">
  <rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="${h * .22}" fill="${GOLD}" stroke="${INK}" stroke-width="8"/>
  <rect x="${-w / 2}" y="${-h / 2}" width="${w * .34}" height="${h}" rx="${h * .22}" fill="#2B2F45" stroke="${INK}" stroke-width="8"/>
  <rect x="${w / 2 - 2}" y="${-h * .2}" width="${h * .22}" height="${h * .4}" rx="5" fill="#B8BFCC" stroke="${INK}" stroke-width="6"/>
  <path d="M${-w * .36} ${-h * .32} h${w * .75}" stroke="#FFF3B8" stroke-width="${h * .12}" stroke-linecap="round" opacity=".8"/>
  <text x="${w * .12}" y="${h * .27}" font-family="Fredoka" font-weight="700" font-size="${h * .7}" text-anchor="middle" fill="${INK}">+</text></g>`; }
// sleep Zs, getting bigger as they rise
const zzz = (x, y, s, col = '#fff', dir = 1) => [0, 1, 2].map(i => `<text x="${x + dir * i * s * .62}" y="${y - i * s * .78}" font-family="Fredoka" font-weight="700" font-size="${s * (0.62 + i * .3)}" fill="${col}" stroke="${INK}" stroke-width="${s * .1}" paint-order="stroke" stroke-linejoin="round" transform="rotate(-12 ${x + dir * i * s * .62} ${y - i * s * .78})">Z</text>`).join('');
const sparkle = (x, y, r, col = '#fff') => `<path d="M${x} ${y - r}Q${x} ${y} ${x + r} ${y}Q${x} ${y} ${x} ${y + r}Q${x} ${y} ${x - r} ${y}Q${x} ${y} ${x} ${y - r}Z" fill="${col}"/>`;
// shout lines: three arcs fanning from (x,y) toward angle a (degrees)
function shout(x, y, a, col = '#fff') { let s = ''; for (let i = 0; i < 3; i++) { const r = 40 + i * 34, sp = 26 + i * 4;
  const p = d => [x + r * Math.cos((a + d) * Math.PI / 180), y + r * Math.sin((a + d) * Math.PI / 180)].map(v => v.toFixed(1)).join(' ');
  s += `<path d="M${p(-sp)} A${r} ${r} 0 0 1 ${p(sp)}" stroke="${col}" stroke-width="13" fill="none" stroke-linecap="round"/>`; }
  return `<g filter="url(#tdrop)">${s}</g>`; }
// the eclipse: a black disc with a blazing gold corona and spiky rays, a bright bead on the rim
function eclipse(x, y, r) { let rays = ''; for (let i = 0; i < 28; i++) { const a = i / 28 * Math.PI * 2 + 0.1, L = r * (1.28 + 0.32 * ((i * 7) % 5) / 4), w = 0.05;
  const p = (ang, rr) => `${(x + rr * Math.cos(ang)).toFixed(1)} ${(y + rr * Math.sin(ang)).toFixed(1)}`;
  rays += `M${p(a - w, r * .98)}L${p(a, L)}L${p(a + w, r * .98)}Z`; }
  return `<circle cx="${x}" cy="${y}" r="${r * 2.1}" fill="url(#corona)"/><path d="${rays}" fill="#FFE9A8" opacity=".85" filter="url(#rayblur)"/>
    <circle cx="${x}" cy="${y}" r="${r * 1.04}" fill="#FFF6D6" filter="url(#rimglow)"/>
    <circle cx="${x}" cy="${y}" r="${r}" fill="#0D0820"/>
    <circle cx="${x + r * .72}" cy="${y - r * .7}" r="${r * .1}" fill="#fff" filter="url(#rimglow)"/>`; }

/* ---------- the six thumbnails ---------- */
const T = {
  // 1A: the fog rolls in from the right over a sunny yellow world; giant shocked Pip stares at it.
  '1a': () => `${bg('b1a', '#FFF06A', '#FFB300', 260, 380, '#fff', .22)}
    ${fogC([[1010, 90, 170], [1200, 230, 210], [860, 330, 150], [1080, 450, 230], [800, 600, 160], [1000, 730, 190], [1260, 640, 200], [1250, 0, 170], [740, 180, 95], [690, 430, 80]],
           ['M700 520 C 610 500, 560 580, 610 625 C 650 660, 700 610, 670 580', 'M760 230 C 680 200, 640 120, 690 85'],
           [[1070, 430, 175, 1.7, 0.3, 24], [900, 330, 90, 1.4, 2.2, 15], [1210, 230, 100, 1.4, 1, 16], [1000, 690, 100, 1.3, 2.6, 15]],
           [[1190, 610, 120, 16, .5], [820, 610, 80, -14, .4]])}
    ${sprite('pip_surprised', -70, 100, 1.3)}
    ${words(['IT\'S', '[COMING!]'], 985, 215, 145, 'middle', '#FFE14D', 520)}`,
  // 1B: a wobbling tower of batteries under a dead bulb; giant Basil gasps up at it. "MORE?!" (the film's wrong idea, not the fix)
  '1b': () => `${bg('b1b', '#FFF06A', '#FFB300', 860, 300, '#fff', .22)}
    ${[0, 1, 2, 3, 4, 5].map(i => battery(900 + [0, 22, -14, 30, 4, -20][i], 690 - i * 70, 250, 74, [3, -5, 6, -4, 8, -7][i])).join('')}
    ${bulb(905, 30, 92)}
    <g stroke="${INK}" stroke-width="10" stroke-linecap="round" opacity=".9"><path d="M1040 120 l40 -24 M1050 175 l50 0 M760 120 l-40 -24 M750 175 l-50 0"/></g>
    ${sprite('basil_surprised', -60, 215, 1.05)}
    ${words(['MORE[?!]'], 40, 205, 190, 'start', GOLD, 640)}`,
  // 2A: the legendary Dragon fast asleep, filling the right; Momo yells WAKE UP at it.
  '2a': () => `${bg('b2a', '#5CC2FF', '#0A4FD6', 900, 380, '#fff', .16)}
    <g>${sparkle(640, 170, 18)}${sparkle(1210, 470, 14)}${sparkle(700, 600, 12)}${sparkle(1160, 110, 10)}</g>
    ${pet('zodiac-full/dragon-happy.png', 520, -20, 800)}
    ${zzz(1080, 210, 86, '#fff')}
    ${sprite('momo_surprised', -30, 270, 0.88, true)}
    ${shout(405, 440, -18)}
    ${words(['WAKE', '[UP!!]'], 262, 200, 138, 'middle', GOLD, 470)}`,
  // 2B: the three Guardians asleep (Dragon huge in the middle, Unicorn and Robot either side). "HOW?!"
  '2b': () => `${bg('b2b', '#5CC2FF', '#0A4FD6', 640, 420, '#fff', .16)}
    <g>${sparkle(420, 120, 16)}${sparkle(1180, 300, 14)}${sparkle(90, 330, 12)}${sparkle(860, 90, 12)}</g>
    ${pet('legendary-extra/unicorn-calm.png', -40, 230, 520)}
    ${pet('legendary-extra/robot-calm.png', 820, 250, 500)}
    ${pet('zodiac-full/dragon-happy.png', 250, 40, 760)}
    ${zzz(840, 260, 70, '#fff')}${zzz(150, 250, 46, '#fff', -1)}${zzz(1160, 350, 46, '#fff')}
    ${words(['[HOW?!]'], 640, 150, 160, 'middle', GOLD, 560)}`,
  // 3A: a black sun with a blazing corona; giant Pip gasps up at it. "A CURSE?!" (the film's first guess; the answer is not shown)
  '3a': () => `${bg('b3a', '#FF5FB0', '#A3105C', 900, 250, '#FFD6EC', .14)}
    ${eclipse(950, 400, 170)}
    ${sprite('pip_surprised', -50, 190, 1.14)}
    ${words(['A [CURSE?!]'], 40, 200, 150, 'start', GOLD, 690)}`,
  // 3B: the black sun on the left; giant worried Basil looks up at it from the right. "WHO DID IT?"
  '3b': () => `${bg('b3b', '#FF5FB0', '#A3105C', 330, 260, '#FFD6EC', .14)}
    ${eclipse(330, 270, 170)}
    ${sprite('basil_worried', 620, 150, 1.12)}
    ${words(['WHO', '[DID IT?]'], 330, 560, 128, 'middle', GOLD, 560)}`,
};

function page(k) { return `<!doctype html><html><head><meta charset="utf-8"><style>
  @font-face{font-family:Fredoka;font-weight:700;src:url(${b64(FONT, 'font/woff2')}) format("woff2")}
  html,body{margin:0;overflow:hidden;background:#000} svg{display:block}</style></head><body>
  <svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720"><defs>
    <filter id="drop" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="8" stdDeviation="9" flood-color="${INK}" flood-opacity=".55"/></filter>
    <filter id="tdrop" x="-20%" y="-30%" width="140%" height="160%"><feDropShadow dx="0" dy="9" stdDeviation="5" flood-color="${INK}" flood-opacity=".7"/></filter>
    <filter id="fogsoft" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="10"/></filter>
    <filter id="fogsoft2" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="16"/></filter>
    <filter id="rayblur"><feGaussianBlur stdDeviation="4"/></filter>
    <filter id="rimglow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="9"/></filter>
    <filter id="smoke" x="-10%" y="-10%" width="120%" height="120%"><feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="2" seed="7"/><feDisplacementMap in="SourceGraphic" scale="46" xChannelSelector="R" yChannelSelector="G"/></filter>
    <radialGradient id="fogfill" cx="1100" cy="380" r="560" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#5A2FC4"/><stop offset=".7" stop-color="#8A63EE"/><stop offset="1" stop-color="#B79BFF"/></radialGradient>
    <radialGradient id="corona"><stop offset=".45" stop-color="#FFF4C2"/><stop offset=".55" stop-color="#FFC233" stop-opacity=".95"/><stop offset=".75" stop-color="#FF8A1F" stop-opacity=".45"/><stop offset="1" stop-color="#FF5FB0" stop-opacity="0"/></radialGradient>
  </defs>${T[k]()}${brand}</svg></body></html>`; }

(async () => { fs.mkdirSync(WORK, { recursive: true }); const copyTo = process.argv[2];
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 2 });
  p.on('pageerror', e => console.log('PAGEERR', e.message)); const outs = [];
  for (const k of Object.keys(T)) { const html = path.join(WORK, `thumb${k}.html`); fs.writeFileSync(html, page(k)); await p.goto('file://' + html);
    await p.evaluate(async () => { await document.fonts.load('700 100px Fredoka'); await document.fonts.ready;
      await Promise.all([...document.querySelectorAll('image')].map(im => new Promise(r => { const i = new Image(); i.onload = i.onerror = r; i.src = im.getAttribute('href'); })));
      for (const g of document.querySelectorAll('.words')) { // shrink a word block that is wider than its fit
        const w = g.getBBox().width, fit = +g.dataset.fit; if (w > fit) { const s = fit / w, x = +g.dataset.x, y0 = g.getBBox().y;
          g.setAttribute('transform', `translate(${x} ${y0}) scale(${s}) translate(${-x} ${-y0})`); } } });
    const png = path.join(WORK, `thumb${k}.png`); await p.screenshot({ path: png });
    const n = k[0], v = k[1], out = path.join(UP, `thumb${n}_v3${v}.jpg`);
    execFileSync('ffmpeg', ['-loglevel', 'error', '-y', '-i', png, '-vf', 'scale=1280:720:flags=lanczos', '-q:v', '2', out]);
    outs.push(out); console.log(out, (fs.statSync(out).size / 1024).toFixed(0) + ' KB'); }
  // review sheet: all six at 1280x720 in a 2x3 grid (film per row), labelled
  const lab = (f, t) => `<figure><img src="${b64(f, 'image/jpeg')}"><figcaption>${t}</figcaption></figure>`;
  const sheet = `<!doctype html><html><head><style>@font-face{font-family:Fredoka;font-weight:700;src:url(${b64(FONT, 'font/woff2')})}
    body{margin:0;background:#202124;font-family:Fredoka;color:#fff;width:2600px;padding:20px;box-sizing:border-box}
    .g{display:grid;grid-template-columns:1280px 1280px;gap:20px} figure{margin:0} img{width:1280px;height:720px;display:block;border-radius:12px} figcaption{font-size:34px;padding:6px 4px 10px}</style></head><body>
    <div class="g">${outs.map(f => lab(f, path.basename(f))).join('')}</div></body></html>`;
  // phone check: 168x94, YouTube's mobile/sidebar size, with film 4 for comparison, on the light and dark UI
  const small = (bgc, fg, title) => `<div style="background:${bgc};padding:18px 18px 10px;color:${fg}"><div style="font:600 15px Roboto,Arial,sans-serif;margin-bottom:10px">${title}</div>
    <div style="display:flex;gap:12px;flex-wrap:wrap">${[...outs, FILM4].map(f => `<div style="width:168px"><img src="${b64(f, 'image/jpeg')}" style="width:168px;height:94px;border-radius:8px;display:block">
    <div style="font:500 11px Roboto,Arial,sans-serif;margin-top:5px;opacity:.85">${f === FILM4 ? 'film 4 (live)' : 'film ' + path.basename(f).replace(/thumb(\d)_v3(\w).jpg/, (m, n, v) => n + v.toUpperCase())}</div></div>`).join('')}</div></div>`;
  const smallHtml = `<!doctype html><html><body style="margin:0;width:1290px">${small('#ffffff', '#0f0f0f', 'YouTube light UI, 168x94')}${small('#0f0f0f', '#f1f1f1', 'YouTube dark UI, 168x94')}</body></html>`;
  const shot = async (html, name, w, scale) => { const f = path.join(WORK, name + '.html'); fs.writeFileSync(f, html);
    const q = await b.newPage({ viewport: { width: w, height: 100 }, deviceScaleFactor: scale }); await q.goto('file://' + f); await q.evaluate(() => document.fonts.ready);
    const png = path.join(WORK, name + '.png'); await q.screenshot({ path: png, fullPage: true }); await q.close();
    const jpg = path.join(WORK, name + '.jpg'); execFileSync('ffmpeg', ['-loglevel', 'error', '-y', '-i', png, '-q:v', '3', jpg]); return jpg; };
  const sheetJpg = await shot(sheet, 'sheet', 2600, 1), smallJpg = await shot(smallHtml, 'small', 1290, 1);
  await b.close();
  if (copyTo) { fs.mkdirSync(copyTo, { recursive: true }); for (const f of [...outs, sheetJpg, smallJpg]) fs.copyFileSync(f, path.join(copyTo, path.basename(f))); console.log('copied to', copyTo); }
})();
