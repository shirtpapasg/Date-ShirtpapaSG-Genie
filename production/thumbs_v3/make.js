#!/usr/bin/env node
/* P4 thumbnails, "P5 formula": pill + giant "P4 <Topic>" + topic scene with one hero + yellow idea banner.
 * usage: NODE_PATH=$(npm root -g) node make.js            # all 22 + contact sheets
 *        NODE_PATH=$(npm root -g) node make.js 7 16       # only these episodes (+ sheets)
 * data.json = words per episode; scenes.js = the drawn SVG scene per episode; template.html = the shared frame. */
const fs = require('fs'), path = require('path');
const { chromium } = require('playwright');
const DIR = __dirname;
const FONTS = 'file://' + path.resolve(DIR, '../workspace/sau/fonts/node_modules/@fontsource/fredoka/files');
const pad = n => String(n).padStart(2, '0');
(async () => {
  const data = JSON.parse(fs.readFileSync(path.join(DIR, 'data.json'), 'utf8'));
  delete require.cache[require.resolve('./scenes.js')];
  const scenes = require('./scenes.js');
  const tpl = fs.readFileSync(path.join(DIR, 'template.html'), 'utf8');
  const only = process.argv.slice(2).filter(a => /^\d+$/.test(a)).map(Number);
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  fs.mkdirSync(path.join(DIR, '.work'), { recursive: true });
  for (const e of data) {
    if (only.length && !only.includes(e.ep)) continue;
    const fn = scenes[e.scene];
    if (!fn) throw new Error('no scene ' + e.scene);
    const html = tpl.replace(/{{FONTS}}/g, FONTS).replace('<!--SCENE-->', () => fn(e)).replace('/*DATA*/{}', () => JSON.stringify(e));
    const f = path.join(DIR, '.work', `P4_EP${pad(e.ep)}.html`);
    fs.writeFileSync(f, html);
    await page.goto('file://' + f);
    await page.waitForFunction('window.READY === true');
    await page.screenshot({ path: path.join(DIR, `P4_EP${pad(e.ep)}.jpg`), type: 'jpeg', quality: 92 });
    console.log('made', `P4_EP${pad(e.ep)}.jpg`);
  }
  // contact sheets (every thumbnail that exists)
  const have = data.filter(e => fs.existsSync(path.join(DIR, `P4_EP${pad(e.ep)}.jpg`)));
  const sheet = async (file, w, h, cols, gap, label) => {
    const rows = Math.ceil(have.length / cols);
    const W = cols * (w + gap) + gap, H = rows * (h + gap + (label ? 22 : 0)) + gap;
    const cells = have.map(e => `<div style="width:${w}px"><img src="file://${DIR}/P4_EP${pad(e.ep)}.jpg?${Date.now()}" width="${w}" height="${h}">${label ? `<div class="l">EP${pad(e.ep)} · ${e.video}</div>` : ''}</div>`).join('');
    await page.setViewportSize({ width: W, height: H });
    await page.setContent(`<body style="margin:0;background:#0f0f0f"><style>.l{font:12px/22px sans-serif;color:#ddd;height:22px;overflow:hidden;white-space:nowrap}img{display:block;border-radius:${w > 200 ? 8 : 4}px}</style><div style="display:flex;flex-wrap:wrap;gap:${gap}px;padding:${gap}px">${cells}</div></body>`, { waitUntil: 'load' });
    await page.screenshot({ path: path.join(DIR, file) });
  };
  await sheet('contact_sheet.png', 480, 270, 4, 14, true);
  await sheet('contact_small.png', 168, 94, 6, 10, false);
  await browser.close();
})();
