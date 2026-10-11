const { setup, BASE, SNAP, chromium } = require('./check.cjs');
const W = +(process.env.W || 1280), H = +(process.env.H || 800), TAG = process.env.TAG || 'desk';

(async () => {
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader'] });
  const ctx = await browser.newContext({ viewport: { width: W, height: H }, isMobile: TAG === 'phone', hasTouch: TAG === 'phone' });
  await setup(ctx);
  const page = await ctx.newPage();
  const errs = [];
  page.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
  page.on('pageerror', e => errs.push('pageerror: ' + e.message));
  await page.goto(BASE + '/mindmap.html', { waitUntil: 'load' });
  await page.waitForTimeout(800);
  const reset = () => page.evaluate(() => { window.__yt.calls.length = 0; if (window.__ytp) { window.__ytp.state = 1; } document.getElementById('mlv-note').hidden = true; });
  const calls = () => page.evaluate(() => window.__yt.calls.slice());
  const out = [];
  async function check(name, fn, expectPause) {
    await reset();
    await fn();
    await page.waitForTimeout(250);
    const c = await calls();
    const paused = c.includes('pauseVideo');
    const note = await page.evaluate(() => !document.getElementById('mlv-note').hidden);
    out.push((paused === expectPause ? 'OK  ' : 'FAIL') + ' ' + name + ' -> calls=' + JSON.stringify(c) + ' note=' + note);
  }
  const click = sel => () => page.locator(sel).first().click();

  console.log('auto-draw state before scroll:', await page.evaluate(() => document.getElementById('play').textContent));
  await check('open maker (#mm-make)', async () => { await page.click('#mm-make'); await page.waitForTimeout(400); await page.screenshot({ path: SNAP + 'mlv_rv_' + TAG + '_maker.png' }); }, false);
  await check('close maker (Escape)', async () => { await page.keyboard.press('Escape'); }, false);
  await check('maker via #make hash', async () => { await page.evaluate(() => { location.hash = '#make'; }); await page.waitForTimeout(300); await page.keyboard.press('Escape'); }, false);
  await check('scroll to stage (auto draw)', async () => { await page.evaluate(() => document.getElementById('stage-shell').scrollIntoView({ block: 'center' })); await page.waitForTimeout(600); }, false);
  console.log('auto-draw state after scroll:', await page.evaluate(() => document.getElementById('play').textContent));
  await check('open mix-up opossum', async () => { await page.click('#possum', { force: true }); await page.waitForTimeout(200); await page.keyboard.press('Escape'); }, false);
  await check('Pause button (mid draw)', async () => { await page.evaluate(() => { const b = document.getElementById('play'); if (!/Pause/.test(b.textContent)) b.click(); }); await page.waitForTimeout(100); await page.evaluate(() => { window.__yt.calls.length = 0; window.__ytp.state = 1; }); await page.click('#play'); }, false);
  await check('Resume button', click('#play'), true);
  await page.waitForTimeout(200);
  await check('Replay/Draw (#play when stopped)', async () => { await page.evaluate(() => { const b = document.getElementById('play'); if (/Pause/.test(b.textContent)) b.click(); }); await page.evaluate(() => { window.__yt.calls.length = 0; window.__ytp.state = 1; }); await page.evaluate(() => window.MindLab.seek(window.MindLab.duration())); await page.evaluate(() => { window.__yt.calls.length = 0; }); await page.click('#play'); }, true);
  await check('chapter chip', async () => { await page.locator('.tbtn[aria-pressed=false]').nth(2).click(); }, true);
  await check('theme strip button', async () => { await page.locator('.sbtn[aria-pressed=false]').first().click(); }, true);
  await check('speed 2x', click('[data-speed="2"]'), true);
  await check('Sound off', click('#sound'), false);
  await check('Sound on', click('#sound'), true);
  await check('sfx line "Hear it"', async () => { await page.locator('#sfxline button').first().click(); }, true);
  await check('gallery card', async () => { await page.locator('.gcard[aria-pressed=false]').first().click(); await page.waitForTimeout(500); }, true);
  await check('poster tappable', async () => { await page.evaluate(() => document.querySelector('#map [role=button]').dispatchEvent(new MouseEvent('click', { bubbles: true }))); }, true);
  await check('view Quick node', click('[data-mode="node"]'), true);
  await check('view Poster', click('[data-mode="poster"]'), true);
  await check('view 3D', click('[data-mode="3d"]'), true);
  // electrical chapter for the rig
  await check('chapter Electrical (in 3D)', async () => { await page.evaluate(() => window.MindLab.topics.find(t => t.id === 'electrical') && [...document.querySelectorAll('.tbtn')].find(b => /Electrical System/.test(b.textContent)).click()); }, true);
  await check('view Rig', click('[data-mode="rig"]'), true);
  // tap the rig's switch: try a grid of points on the canvas until the state toggles
  await check('rig: tap switch / bulb B in canvas', async () => {
    await page.evaluate(() => document.getElementById('three-host').scrollIntoView({ block: 'center' }));
    await page.waitForTimeout(300);
    const box = await page.locator('#three-host').boundingBox();
    const before = await page.evaluate(() => document.getElementById('mode-note').textContent);
    let hit = false;
    for (let fy = 0.2; fy <= 0.8 && !hit; fy += 0.05) for (let fx = 0.05; fx <= 0.95 && !hit; fx += 0.05) {
      await page.mouse.click(box.x + box.width * fx, box.y + box.height * fy);
      const now = await page.evaluate(() => document.getElementById('mode-note').textContent);
      if (now !== before) { hit = true; console.log('rig toggled at', fx.toFixed(2), fy.toFixed(2), '->', now.slice(0, 50)); }
    }
    if (!hit) console.log('rig: no toggle found');
  }, true);
  await check('view Poster again', click('[data-mode="poster"]'), true);
  await check('MindLab.open (maker Compare path)', async () => { await page.evaluate(() => window.MindLab.open('plants')); }, true);

  console.log(out.join('\n'));
  console.log('errors:', errs);
  await page.screenshot({ path: SNAP + 'mlv_rv_' + TAG + '_after.png' });
  await browser.close();
})();
