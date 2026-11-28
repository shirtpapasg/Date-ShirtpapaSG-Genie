#!/usr/bin/env node
/* Thumbnails, "P5 formula": pill + giant "P4 <Topic>" + topic scene with one hero + yellow idea banner.
 * usage: NODE_PATH=$(npm root -g) node make.js            # everything + contact sheets
 *        NODE_PATH=$(npm root -g) node make.js 7 16       # only these P4 episodes (+ sheets)
 *        NODE_PATH=$(npm root -g) node make.js P6 P3:2    # all of P6 and P3 episode 2 (+ sheets)
 * data.json = words per episode (set = P3/P4/P5/P6); scenes.js + scenes_p356.js = the drawn SVG scene per episode;
 * template.html = the shared frame. A row with "static": true is a finished JPG that is kept as it is (P5 EP01). */
const fs = require('fs'), path = require('path');
const { chromium } = require('playwright');
const DIR = __dirname;
const FONTS = 'file://' + path.resolve(DIR, '../workspace/sau/fonts/node_modules/@fontsource/fredoka/files');
const pad = n => String(n).replace(/^\d+/, d => d.padStart(2, '0'));   // 7 -> 07, '7A' -> 07A
const name = e => `${e.set || 'P4'}_EP${pad(e.ep)}`;
(async () => {
  const data = JSON.parse(fs.readFileSync(path.join(DIR, 'data.json'), 'utf8'));
  delete require.cache[require.resolve('./scenes.js')];
  const scenes = require('./scenes.js');
  const tpl = fs.readFileSync(path.join(DIR, 'template.html'), 'utf8');
  const args = process.argv.slice(2);
  const want = e => !args.length || args.some(a => /^\d+$/.test(a) ? (e.set || 'P4') === 'P4' && +a === e.ep
    : a.includes(':') ? a.toUpperCase() === `${e.set}:${e.ep}` : a.toUpperCase() === e.set);
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  fs.mkdirSync(path.join(DIR, '.work'), { recursive: true });
  for (const e of data) {
    if (e.static || !want(e)) continue;
    const fn = scenes[e.scene];
    if (!fn) throw new Error('no scene ' + e.scene);
    const html = tpl.replace(/{{FONTS}}/g, FONTS).replace('<!--SCENE-->', () => fn(e)).replace('/*DATA*/{}', () => JSON.stringify(e));
    const f = path.join(DIR, '.work', name(e) + '.html');
    fs.writeFileSync(f, html);
    await page.goto('file://' + f);
    await page.waitForFunction('window.READY === true');
    await page.screenshot({ path: path.join(DIR, name(e) + '.jpg'), type: 'jpeg', quality: 92 });
    console.log('made', name(e) + '.jpg');
  }
  // contact sheets (every thumbnail that exists)
  const sheet = async (rows, file, w, h, cols, gap, label) => {
    const have = rows.filter(e => fs.existsSync(path.join(DIR, name(e) + '.jpg')));
    if (!have.length) return;
    const nr = Math.ceil(have.length / cols);
    const W = cols * (w + gap) + gap, H = nr * (h + gap + (label ? 22 : 0)) + gap;
    const cells = have.map(e => `<div style="width:${w}px"><img src="file://${DIR}/${name(e)}.jpg?${Date.now()}" width="${w}" height="${h}">${label ? `<div class="l">${label(e)}</div>` : ''}</div>`).join('');
    await page.setViewportSize({ width: W, height: H });
    await page.setContent(`<body style="margin:0;background:#0f0f0f"><style>.l{font:12px/22px sans-serif;color:#ddd;height:22px;overflow:hidden;white-space:nowrap}img{display:block;border-radius:${w > 200 ? 8 : 4}px}</style><div style="display:flex;flex-wrap:wrap;gap:${gap}px;padding:${gap}px">${cells}</div></body>`, { waitUntil: 'load' });
    await page.screenshot({ path: path.join(DIR, file) });
  };
  const p4 = data.filter(e => (e.set || 'P4') === 'P4'), rest = data.filter(e => (e.set || 'P4') !== 'P4' && !e.batch), more = data.filter(e => e.batch === 'p3more');
  await sheet(p4, 'contact_sheet.png', 480, 270, 4, 14, e => `EP${pad(e.ep)} · ${e.video}`);
  await sheet(p4, 'contact_small.png', 168, 94, 6, 10, null);
  await sheet(rest, 'contact_sheet_p3p5p6.png', 480, 270, 4, 14, e => `${e.set} EP${pad(e.ep)} · ${e.video}`);
  await sheet(rest, 'contact_small_p3p5p6.png', 168, 94, 6, 10, null);
  await sheet(more, 'contact_sheet_p3_more.png', 480, 270, 4, 14, e => `${e.set} EP${pad(e.ep)} · ${e.video}`);
  await sheet(more, 'contact_small_p3_more.png', 168, 94, 6, 10, null);
  await browser.close();
})();
