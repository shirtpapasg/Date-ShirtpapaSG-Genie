// thumb.js: the YouTube thumbnail -> thumb.jpg (1280x720).   NODE_PATH=$(npm root -g) node thumb.js
const { chromium } = require('playwright'); const path = require('path'), { execFileSync } = require('child_process');
(async () => { const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1920, height: 1080 } }); p.on('pageerror', e => console.log('PAGEERR', e.message));
  await p.goto('file://' + path.join(__dirname, 'page.html')); await p.waitForFunction(() => window.READY === true, null, { timeout: 60000 });
  await p.evaluate(() => window.renderThumb()); const png = path.join(__dirname, 'out', 'thumb_full.png'); await p.screenshot({ path: png }); await b.close();
  execFileSync('ffmpeg', ['-loglevel', 'error', '-y', '-i', png, '-vf', 'scale=1280:720:flags=lanczos', '-q:v', '2', path.join(__dirname, 'thumb.jpg')]); console.log('thumb.jpg'); })();
