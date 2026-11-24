// extra captures for EP0: the home screen (no pop-ups) and the Magnets poster as a whole element
const { chromium } = require('playwright'); const path = require('path');
(async () => { const OUT = process.argv[2]; const b = await chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1180, height: 820 }, deviceScaleFactor: 2.6 });
  await ctx.addInitScript(() => { try { if (!sessionStorage.getItem('_set')) { localStorage.setItem('sm-sfx-v1', JSON.stringify('off')); localStorage.setItem('sm-mmtour-v1', String(Date.now()));
    localStorage.setItem('sm-firsttrip-v1', JSON.stringify({ done: true })); localStorage.setItem('sm-welcome-v1', String(Date.now())); localStorage.setItem('sm-seen-v1', '1'); localStorage.setItem('sm-whatsnew-v1', '2026-11-24'); sessionStorage.setItem('_set', '1'); } } catch (e) {} });
  const p = await ctx.newPage();
  await p.goto('http://127.0.0.1:8765/index.html', { waitUntil: 'load' }); await p.waitForTimeout(2500); try { await p.getByText('TAP TO BEGIN').first().click({ timeout: 3000 }); } catch (e) {}
  await p.waitForTimeout(4000); await p.screenshot({ path: OUT + '/home.png' });
  const mm = await p.locator('text=Mind Maps').all(); for (const m of mm) { const bb = await m.boundingBox().catch(() => null); if (bb) console.log('MM', JSON.stringify(bb)); }
  await p.goto('http://127.0.0.1:8765/mindmap.html', { waitUntil: 'load' }); await p.waitForTimeout(2500);
  await p.click('#mm-make'); await p.waitForTimeout(800); await p.selectOption('#mm-ch', 'magnets'); await p.click('#mm-new'); await p.waitForTimeout(800);
  await p.click('#mm-add'); await p.locator('#mm-branches input.mm-in').last().fill('Two poles'); await p.waitForTimeout(500);
  await p.click('#mm-compare'); await p.waitForTimeout(9000); await p.addStyleTag({ content: '#pl-arrive,.mm-return,body>div[role="status"],.mm-fs-btn,#mm-exit,[class*="mixup"],[class*="mx-"]{display:none!important}' });
  const st = p.locator('#stage'); await st.scrollIntoViewIfNeeded(); await p.waitForTimeout(600); console.log('STAGE', JSON.stringify(await st.boundingBox()));
  await st.screenshot({ path: OUT + '/posterP.png' }); await b.close(); })();
