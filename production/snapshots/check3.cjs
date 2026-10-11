const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
const ROOT = '/home/user/theoneapp', OUT = '/tmp/claude-0/-home-user/8764a423-5385-5445-b38a-c2c2633ecdb7/scratchpad/snaps/';
(async () => {
  const b = await chromium.launch({ proxy: { server: 'http://127.0.0.1:33675' } });
  for (const [vp, tag, mob] of [[{ width: 1280, height: 800 }, 'desk', false], [{ width: 390, height: 844 }, 'phone', true]]) {
    const ctx = await b.newContext({ viewport: vp, deviceScaleFactor: 2, isMobile: mob, hasTouch: mob });
    await ctx.route('http://app.test/**', r => { const u = new URL(r.request().url()); let f = path.join(ROOT, u.pathname === '/' ? 'index.html' : u.pathname);
      if (r.request().method() !== 'GET' || !fs.existsSync(f)) return r.fulfill({ status: 404, body: '{}' }); r.fulfill({ status: 200, contentType: f.endsWith('.js') ? 'text/javascript' : f.endsWith('.html') ? 'text/html' : undefined, body: fs.readFileSync(f) }); });
    const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message));
    await p.goto('http://app.test/index.html'); await p.waitForTimeout(1500);
    for (const t of ['Skip the tour']) { const l = p.getByText(t, { exact: true }); if (await l.count() && await l.first().isVisible()) { await l.first().click().catch(()=>{}); await p.waitForTimeout(600); } }
    await p.evaluate(() => { const b = [...document.querySelectorAll('.nav button[data-v]')].find(x => x.dataset.v === 'qs'); if (b) b.click(); });
    await p.waitForTimeout(3000);
    console.log(tag, 'pill visible', await p.isVisible('#qs-mindmap'), 'sun visible', await p.isVisible('button.mmf'));
    await p.screenshot({ path: OUT + 'mm_' + tag + '_index_questions.png' });
    if (tag === 'phone') { await p.click('#qs-mindmap'); await p.waitForURL(/mindmap/); console.log('pill goes to', p.url()); }
    else { await p.click('button.mmf'); await p.waitForURL(/mindmap/); console.log('sun goes to', p.url()); }
    await p.waitForTimeout(800);
    console.log(tag, 'make button visible', await p.isVisible('#mm-make'), 'errors', errs);
    await ctx.close();
  }
  await b.close();
})();
