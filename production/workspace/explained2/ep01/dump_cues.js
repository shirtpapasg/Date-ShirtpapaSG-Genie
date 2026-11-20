// dump_cues.js: page -> cues.json (the sound events, computed from the same cues as the picture). NODE_PATH=$(npm root -g) node dump_cues.js
const { chromium } = require('playwright'); const path = require('path'), fs = require('fs');
(async () => { const b = await chromium.launch(); const p = await b.newPage(); p.on('pageerror', e => console.log('PAGEERR', e.message)); p.on('console', m => { if (m.type() === 'error') console.log('ERR', m.text()); });
  await p.goto('file://' + path.resolve(__dirname, 'page.html')); await p.waitForFunction(() => window.READY === true, null, { timeout: 60000 });
  const c = await p.evaluate(() => window.CUES); fs.writeFileSync(path.join(__dirname, 'cues.json'), JSON.stringify(c)); console.log(c.ev.length, 'sound events'); await b.close(); })();
