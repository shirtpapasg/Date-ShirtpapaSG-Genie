const { chromium } = require('playwright');
const PORT = process.argv[2];
const BASE = 'http://127.0.0.1:' + PORT + '/mindmap.html';
const ID = 'abcdefghijk';
const STUB = `
window.__yt = [];
window.YT = { Player: function (el, o) {
  var self = this; window.__ytOpts = o; window.__ytEl = el && el.id;
  var st = 1, muted = true;
  self.pauseVideo = function(){ __yt.push('pauseVideo'); st = 2; };
  self.playVideo = function(){ __yt.push('playVideo'); st = 1; };
  self.unMute = function(){ __yt.push('unMute'); muted = false; };
  self.isMuted = function(){ return muted; };
  self.getPlayerState = function(){ return st; };
  self.getVolume = function(){ return 100; };
  setTimeout(function(){ o.events.onReady({ target: self }); }, 50);
} };
setTimeout(function(){ window.onYouTubeIframeAPIReady && window.onYouTubeIframeAPIReady(); }, 0);
`;
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' }).catch(async () => chromium.launch());
  async function run(withId, label, vp) {
    const ctx = await b.newContext({ viewport: vp || { width: 1280, height: 800 } });
    const page = await ctx.newPage();
    const ext = [], errs = [];
    page.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
    page.on('pageerror', e => errs.push('PAGEERROR ' + e.message));
    page.on('request', r => { const u = r.url(); if (!u.startsWith('http://127.0.0.1')) ext.push(u); });
    await page.route('**/*', async route => {
      const u = route.request().url();
      if (u.includes('mindlab-video.js') && withId) {
        const resp = await route.fetch(); let t = await resp.text();
        t = t.replace("var MINDLAB_VIDEO_ID = '';", "var MINDLAB_VIDEO_ID = '" + ID + "';");
        return route.fulfill({ response: resp, body: t });
      }
      if (u.startsWith('https://www.youtube.com/iframe_api')) return route.fulfill({ contentType: 'text/javascript', body: STUB });
      if (u.startsWith('https://www.youtube-nocookie.com/')) return route.fulfill({ contentType: 'text/html', body: '<body style="background:#222"></body>' });
      if (u.startsWith('http://127.0.0.1') || u.includes('cdnjs') || u.includes('fonts.g')) return route.continue();
      return route.abort();
    });
    await page.goto(BASE, { waitUntil: 'load' });
    await page.waitForTimeout(800);
    const info = await page.evaluate(() => ({
      mlvHidden: document.getElementById('mlv').hidden,
      src: (document.getElementById('mlv-player') || {}).src,
      opts: window.__ytOpts ? Object.keys(window.__ytOpts) : null,
      scrollW: document.documentElement.scrollWidth, innerW: innerWidth,
      started: window.MindLabVideo && window.MindLabVideo.started,
      calls: (window.__yt || []).slice()
    }));
    console.log(label, JSON.stringify(info));
    const steps = [];
    const act = async (name, fn) => { await page.evaluate(() => { if (window.__yt) window.__yt.length = 0; }); await fn(); await page.waitForTimeout(150); steps.push(name + ':' + JSON.stringify(await page.evaluate(() => (window.__yt || []).slice()))); };
    if (withId) {
      await act('scroll-autodraw', async () => { await page.locator('#stage-shell').scrollIntoViewIfNeeded(); await page.waitForTimeout(600); });
      await act('make', async () => { await page.click('#mm-make'); await page.waitForTimeout(300); await page.keyboard.press('Escape'); });
      await act('pause-lab', () => page.click('#play')); await act('resume-lab', () => page.click('#play'));
      await act('speed', () => page.click('[data-speed="2"]'));
      await act('chip', () => page.locator('.tbtn').nth(2).click());
      await act('theme', () => page.locator('.sbtn').nth(1).click());
      await act('sound-off', () => page.click('#sound'));
      await act('sound-on', () => page.click('#sound'));
      await act('view-node', () => page.click('[data-mode="node"]'));
      await act('view-3d', () => page.click('[data-mode="3d"]'));
      console.log(steps.join('\n'));
    }
    console.log(label, 'external requests:', ext.length ? ext : 'none');
    console.log(label, 'errors:', errs.length ? errs : 'none');
    await ctx.close();
  }
  await run(false, 'EMPTY');
  await run(true, 'WITHID');
  await run(true, 'PHONE', { width: 390, height: 844 });
  await b.close();
})();
