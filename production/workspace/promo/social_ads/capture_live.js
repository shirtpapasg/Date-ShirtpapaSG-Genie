// capture_live.js: REAL marking on the live app (https://app.theoneapp.sg), phone-sized, for the parent ads.
//   NODE_PATH=$(npm root -g) node capture_live.js
// One question, two answers -> two calls to /api/mark (the app's own marking; nothing is staged or mocked).
// /api/log is BLOCKED in this browser, so no row reaches the teacher's pupil Google Sheet and no session report is sent.
// The Progress Report (parent.html) is then opened in the same browser: it is built only from the work just done here.
const { chromium } = require('playwright'); const fs = require('fs'), path = require('path');
const OUT = path.join(__dirname, 'shots'), APP = 'https://app.theoneapp.sg/';
const Q = 'bank:113';   // "How is a shadow formed? What property of light causes it?" (P4 Light)
const A1 = 'The object blocks the light so there is a shadow.';
const A2 = 'Light travels in a straight line. The opaque object blocks the light, so a shadow forms behind it.';
(async () => {
  const b = await chromium.launch();
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, colorScheme: 'dark', isMobile: true, hasTouch: true });
  await ctx.route('**/api/log**', r => r.abort());
  await ctx.addInitScript(() => { try { if (!sessionStorage.getItem('_s')) { sessionStorage.setItem('_s', '1'); sessionStorage.setItem('sm-classic', '1');
    for (const k of ['sm-seen-v1', 'sm-welcome-v1', 'sm-tour2-seen', 'sm-tour2-done']) localStorage.setItem(k, '1'); localStorage.setItem('sm-sfx-v1', '"off"'); } } catch (e) {}
    // the first-visit trip card and the daily-credit toast sit over the page: hidden for the stills (the app is not changed)
    document.addEventListener('DOMContentLoaded', () => { const st = document.createElement('style'); st.textContent = '#ft-card,.cr-toast,#cr-toast{display:none!important}'; document.head.appendChild(st); }); });
  const p = await ctx.newPage(); p.on('pageerror', e => console.log('  PAGEERR', e.message.slice(0, 140)));
  let marks = 0; p.on('response', r => { if (/\/api\/mark/.test(r.url())) { marks++; console.log('  /api/mark', r.status()); } });
  const hide = () => p.addStyleTag({ content: '.cr-toast,#cr-toast,[class*="toast"]{display:none!important}' }).catch(() => {});
  const shot = async (n, full) => { await hide(); await p.waitForTimeout(500); await p.screenshot({ path: path.join(OUT, n + '.png'), fullPage: !!full }); console.log('shot', n); };
  await p.goto(APP + 'index.html', { waitUntil: 'load', timeout: 40000 }); await p.waitForTimeout(4000);
  for (const t of ["Let's Go", 'Let us go']) { const el = p.getByText(t, { exact: false }).first(); if (await el.isVisible().catch(() => false)) { await el.click().catch(() => {}); await p.waitForTimeout(800); } }
  await p.evaluate(() => goView('mark')); await p.waitForTimeout(1500);
  await p.selectOption('#q', Q); await p.waitForTimeout(800);
  await shot('mk_ask');
  await p.click('#a1'); await p.keyboard.type(A1, { delay: 25 }); await shot('mk_typed');
  await p.click('#go1'); await p.waitForSelector('#stage-fb:not(.hide)', { timeout: 90000 }); await p.waitForTimeout(1500);
  await p.evaluate(() => window.scrollTo(0, 0)); await shot('mk_fb'); await shot('mk_fb_full', true);
  await p.click('#go2'); await p.waitForTimeout(1000);
  await p.fill('#a2', ''); await p.click('#a2'); await p.keyboard.type(A2, { delay: 20 }); await shot('mk_2nd');
  await p.click('#go3'); await p.waitForSelector('#stage-done:not(.hide)', { timeout: 90000 }); await p.waitForTimeout(1500);
  await p.click('#showmarks').catch(() => {}); await p.waitForTimeout(800);
  await p.evaluate(() => window.scrollTo(0, 0)); await shot('mk_done'); await shot('mk_done_full', true);
  fs.writeFileSync(path.join(OUT, 'mk_text.json'), JSON.stringify(await p.evaluate(() => {
    const g = id => (document.getElementById(id) || {}).innerText || '';
    return { verdict: g('verdict'), headline: g('headline'), hits: g('hits'), gaps: g('gaps'), ponder: g('ponder'), tip: g('tip'), verdict2: g('verdict2'), headline2: g('headline2'), gained: g('gained'), model: g('model'), marks: g('marks'), mc: g('mc-belief') + ' / ' + g('mc-fix') };
  }), null, 1));
  await p.goto(APP + 'parent.html', { waitUntil: 'load' }); await p.waitForTimeout(3500); await shot('report'); await shot('report_full', true);
  await p.goto(APP + 'index.html#log', { waitUntil: 'load' }); await p.waitForTimeout(3500); await shot('mylog'); await shot('mylog_full', true);
  console.log('mark calls:', marks); await b.close();
})();
