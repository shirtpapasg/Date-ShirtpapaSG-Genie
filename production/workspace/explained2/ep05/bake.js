// bake.js: static backgrounds (BG.* in props.js / scenes) -> bg/<name>.png at 2304x1296 (world -192..2112 x -108..1188), + the film grain.
//   NODE_PATH=$(npm root -g) node bake.js [name ...]
const { chromium } = require('playwright'); const fs = require('fs'); const path = require('path');
(async () => { const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1.2 });
  p.on('pageerror', e => console.log('PAGEERR', e.message)); p.on('console', m => { if (m.type() === 'error') console.log('ERR', m.text()); });
  await p.goto('file://' + path.resolve(__dirname, 'page.html') + '?nobake'); await p.waitForFunction(() => window.READY === true, null, { timeout: 60000 });
  let names = process.argv.slice(2); if (!names.length) names = await p.evaluate(() => Object.keys(BG).filter(k => BG[k].length === 0));
  for (const n of names) { await p.evaluate(x => window.bakeSVG(x), n); await p.screenshot({ path: path.join(__dirname, 'bg', n + '.png') }); console.log('baked', n); }
  // film grain: grey noise, used with soft-light
  await p.evaluate(() => { document.getElementById('dyn').innerHTML = `<rect width="1920" height="1080" fill="#808080"/><rect width="1920" height="1080" filter="url(#grainF)" opacity=".3"/>`; });
  await p.screenshot({ path: path.join(__dirname, 'bg', '_grain.png') });
  const all = fs.readdirSync(path.join(__dirname, 'bg')).filter(f => f.endsWith('.png')).map(f => f.slice(0, -4));
  fs.writeFileSync(path.join(__dirname, 'bg', 'manifest.js'), 'window.BAKED=' + JSON.stringify(all) + ';'); console.log(all.length, 'baked'); await b.close(); })();
