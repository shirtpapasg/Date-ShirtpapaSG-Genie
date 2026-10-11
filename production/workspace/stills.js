const { chromium } = require('playwright');
(async () => {
  const dir = process.argv[2];
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
  p.on('pageerror', e => console.log('PAGEERR', e.message));
  await p.goto('file://' + dir + '/v2b.html');
  for (const t of process.argv.slice(3).map(Number)) {
    await p.evaluate(t => window.render(t), t);
    await p.screenshot({ path: `${dir}/still_${t}.jpg`, quality: 70, type: 'jpeg' });
  }
  await b.close();
})();
