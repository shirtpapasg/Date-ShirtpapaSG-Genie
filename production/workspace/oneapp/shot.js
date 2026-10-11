const { chromium } = require('playwright');
(async () => { const b = await chromium.launch();
  for (const [name, vp] of [['mobile', {width: 390, height: 844}], ['desktop', {width: 1440, height: 900}]]) {
    const p = await b.newPage({ viewport: vp, deviceScaleFactor: 2 });
    try { await p.goto(process.argv[2], { waitUntil: 'networkidle', timeout: 45000 }); } catch (e) { console.log('goto', e.message.split('\n')[0]); }
    await p.waitForTimeout(2500);
    await p.screenshot({ path: `${process.argv[3]}/${name}.png` });
    console.log(name, await p.title());
  }
  await b.close(); })();
