const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
  const page = await (await b.newContext({ viewport: { width: 390, height: 844 } })).newPage();
  const errs = [];
  page.on('pageerror', e => errs.push('PAGEERROR ' + e.message));
  page.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
  await page.route('**/*', async route => {
    const u = route.request().url();
    if (u.includes('mindlab-video.js')) { const r = await route.fetch(); return route.fulfill({ response: r, body: (await r.text()).replace("var MINDLAB_VIDEO_ID = '';", "var MINDLAB_VIDEO_ID = 'abcdefghijk';") }); }
    if (u.includes('youtube')) return route.abort();
    return route.continue();
  });
  await page.goto('http://127.0.0.1:8737/mindmap.html');
  await page.waitForTimeout(1500);
  await page.screenshot({ path: '/tmp/claude-0/-home-user/8764a423-5385-5445-b38a-c2c2633ecdb7/scratchpad/rev/blocked.png' });
  await page.click('#mlv-sound');
  await page.locator('.tbtn').nth(1).click();
  await page.click('[data-mode="node"]');
  console.log(JSON.stringify(await page.evaluate(() => ({ btnHidden: document.getElementById('mlv-sound').hidden, note: document.getElementById('mlv-note').hidden }))));
  console.log(errs);
  await b.close();
})();
