const { setup, BASE, SNAP, chromium } = require('./check.cjs');

(async () => {
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--autoplay-policy=no-user-gesture-required'] });
  for (const vp of [{ w: 1280, h: 800, tag: 'desk' }, { w: 390, h: 844, tag: 'phone' }]) {
    const ctx = await browser.newContext({ viewport: { width: vp.w, height: vp.h }, deviceScaleFactor: 1, isMobile: vp.tag === 'phone', hasTouch: vp.tag === 'phone' });
    const net = await setup(ctx);
    const page = await ctx.newPage();
    const errs = [];
    page.on('console', m => { if (m.type() === 'error' || m.type() === 'warning') errs.push(m.type() + ': ' + m.text()); });
    page.on('pageerror', e => errs.push('pageerror: ' + e.message));
    await page.goto(BASE + '/mindmap.html', { waitUntil: 'load' });
    await page.waitForTimeout(1200);
    const info = await page.evaluate(() => {
      const r = s => { const e = document.querySelector(s); if (!e) return null; const b = e.getBoundingClientRect(); return { x: Math.round(b.x), y: Math.round(b.y), w: Math.round(b.width), h: Math.round(b.height), hidden: e.hidden }; };
      return {
        mlv: r('#mlv'), frame: r('#mlv-frame'), iframe: r('#mlv-player'), sound: r('#mlv-sound'), note: r('#mlv-note'),
        rail: r('#rail'), sechead: r('.sec .sec-head'), wrap: r('.wrap'), mast: r('.mast'), possum: r('#possum'), say: r('#possum-say'), stage: r('#stage-shell'),
        src: document.getElementById('mlv-player') && document.getElementById('mlv-player').src,
        sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth,
        created: window.__yt && window.__yt.created, calls: window.__yt && window.__yt.calls.slice(),
        playBtn: document.getElementById('play').textContent,
      };
    });
    console.log(vp.tag, JSON.stringify(info, null, 1));
    console.log(vp.tag, 'yt net:', net.slice(0, 5));
    await page.screenshot({ path: SNAP + 'mlv_rv_' + vp.tag + '_top.png' });
    await page.screenshot({ path: SNAP + 'mlv_rv_' + vp.tag + '_full.png', fullPage: true });
    console.log(vp.tag, 'errors:', errs);
    await ctx.close();
  }
  await browser.close();
})();
