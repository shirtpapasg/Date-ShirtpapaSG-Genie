// Browser checks for the Mind Lab video. Usage: node mlv-check.cjs <port>
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const PORT = process.argv[2] || '8767';
const BASE = `http://127.0.0.1:${PORT}/mindmap.html`;
const SNAPS = '/tmp/claude-0/-home-user/8764a423-5385-5445-b38a-c2c2633ecdb7/scratchpad/snaps';
const THREE = '/tmp/claude-0/-home-user/8764a423-5385-5445-b38a-c2c2633ecdb7/scratchpad/dl-three/package/build/three.min.js';
const SRC = fs.readFileSync('/home/user/theoneapp-video/mindlab-video.js', 'utf8');
const TEST_ID = 'dQw4w9WgXcQ';

/* A stand-in for YouTube's iframe API that writes down what it was asked. */
const YT_STUB = `
window.__yt = { calls: [], state: -1, muted: true };
window.YT = { PlayerState: { PLAYING: 1, PAUSED: 2 }, Player: function (el, o) {
  var s = window.__yt, self = this;
  s.el = el && el.id;
  ['pauseVideo','playVideo','unMute','mute','setVolume'].forEach(function (f) {
    self[f] = function () { s.calls.push(f);
      if (f === 'pauseVideo') { s.state = 2; } if (f === 'playVideo') { s.state = 1; o.events.onStateChange({ data: 1 }); }
      if (f === 'unMute') s.muted = false; if (f === 'mute') s.muted = true; };
  });
  this.isMuted = function () { return s.muted; };
  this.getPlayerState = function () { return s.state; };
  this.getVolume = function () { return 100; };
  s.resumeByUser = function () { s.state = 1; o.events.onStateChange({ data: 1 }); };
  setTimeout(function () { s.state = 1; o.events.onReady({ target: self }); o.events.onStateChange({ data: 1 }); }, 50);
} };
setTimeout(function () { window.onYouTubeIframeAPIReady && window.onYouTubeIframeAPIReady(); }, 30);
`;
const EMBED_STUB = `<!doctype html><meta charset=utf-8><body style="margin:0;background:#1b1b1b;color:#eee;font:600 20px system-ui;display:grid;place-items:center;height:100vh">
<div style="text-align:center">▶ YouTube player (test stub)<br><small style="opacity:.6;font-size:13px">How to make your own mind map</small></div>`;

async function setup(browser, { viewport, withId, reducedMotion, saveData, log }) {
  const ctx = await browser.newContext({ viewport, deviceScaleFactor: 1, reducedMotion: reducedMotion ? 'reduce' : 'no-preference', isMobile: viewport.width < 500, hasTouch: viewport.width < 500 });
  const page = await ctx.newPage();
  const errors = [], yt = [];
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', e => errors.push('pageerror: ' + e.message));
  page.on('request', r => { if (/youtube|ytimg|googlevideo/.test(r.url())) yt.push(r.url()); });
  await page.route('https://cdnjs.cloudflare.com/ajax/libs/three.js/0.160.0/three.min.js', r => r.fulfill({ path: THREE, contentType: 'application/javascript' }));
  if (withId) {
    await page.route('**/mindlab-video.js', r => r.fulfill({ contentType: 'application/javascript', body: SRC.replace("var MINDLAB_VIDEO_ID = '';", `var MINDLAB_VIDEO_ID = '${TEST_ID}';`) }));
    await page.route('https://www.youtube.com/iframe_api', r => r.fulfill({ contentType: 'application/javascript', body: YT_STUB }));
    await page.route('https://www.youtube-nocookie.com/**', r => r.fulfill({ contentType: 'text/html', body: EMBED_STUB }));
  }
  if (saveData) await page.addInitScript(() => { Object.defineProperty(navigator, 'connection', { value: { saveData: true } }); });
  // count Web Audio voices so we can tell whether the lab made a sound
  await page.addInitScript(() => {
    window.__voices = 0;
    const A = window.AudioContext || window.webkitAudioContext; if (!A) return;
    const o = A.prototype.createOscillator, b = A.prototype.createBufferSource;
    A.prototype.createOscillator = function () { window.__voices++; return o.apply(this, arguments); };
    A.prototype.createBufferSource = function () { window.__voices++; return b.apply(this, arguments); };
  });
  return { ctx, page, errors, yt };
}

const results = [];
const ok = (name, cond, extra) => { results.push((cond ? 'PASS ' : 'FAIL ') + name + (extra ? '  ' + extra : '')); };

(async () => {
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--autoplay-policy=no-user-gesture-required'] });

  /* ── A. no id: nothing shows, nothing fetched ── */
  for (const vp of [{ width: 1280, height: 800 }, { width: 390, height: 844 }]) {
    const { ctx, page, errors, yt } = await setup(browser, { viewport: vp, withId: false });
    await page.goto(BASE, { waitUntil: 'networkidle' });
    const st = await page.evaluate(() => ({
      hidden: document.getElementById('mlv').hidden,
      display: getComputedStyle(document.getElementById('mlv')).display,
      iframes: document.querySelectorAll('iframe[src*="youtube"]').length,
      api: !!document.querySelector('script[src*="iframe_api"]'),
      gap: document.querySelector('.sec').getBoundingClientRect().top - document.querySelector('header.mast').getBoundingClientRect().bottom,
      scrollW: document.documentElement.scrollWidth, w: innerWidth
    }));
    ok(`[no id ${vp.width}] section hidden (display:${st.display})`, st.hidden && st.display === 'none');
    ok(`[no id ${vp.width}] no YouTube iframe/script`, st.iframes === 0 && !st.api);
    ok(`[no id ${vp.width}] zero requests to YouTube`, yt.length === 0, yt.join(' '));
    ok(`[no id ${vp.width}] header→chapters gap unchanged (46px)`, Math.round(st.gap) === 46, 'gap=' + st.gap);
    ok(`[no id ${vp.width}] no horizontal scroll`, st.scrollW <= st.w, st.scrollW + ' vs ' + st.w);
    ok(`[no id ${vp.width}] no console errors`, errors.length === 0, errors.join(' | '));
    await page.screenshot({ path: path.join(SNAPS, `mlv_noid_${vp.width}.png`) });
    await ctx.close();
  }

  /* ── B. with an id: layout at phone and desktop ── */
  for (const vp of [{ width: 1280, height: 800 }, { width: 390, height: 844 }, { width: 1366, height: 768 }, { width: 1920, height: 1080 }, { width: 844, height: 390 }]) {
    const { ctx, page, errors, yt } = await setup(browser, { viewport: vp, withId: true });
    await page.goto(BASE, { waitUntil: 'networkidle' });
    await page.waitForFunction(() => window.__yt && window.__yt.el);
    const st = await page.evaluate(() => {
      const f = document.querySelector('#mlv iframe'), r = f.getBoundingClientRect(), wrap = document.querySelector('.wrap'), cs = getComputedStyle(wrap);
      const content = wrap.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
      const mlv = document.getElementById('mlv').getBoundingClientRect(), sec = document.querySelector('.sec').getBoundingClientRect();
      const fr = document.getElementById('mlv-frame').getBoundingClientRect(), po = document.getElementById('possum').getBoundingClientRect();
      const possumOver = !(po.right <= fr.left || po.left >= fr.right || po.bottom <= fr.top || po.top >= fr.bottom);
      return { possumOver, frameBottom: fr.bottom, frameLeft: fr.left, contentLeft: wrap.getBoundingClientRect().left + parseFloat(cs.paddingLeft), ih: innerHeight, src: f.src, allow: f.getAttribute('allow'), ref: f.getAttribute('referrerpolicy'), w: r.width, h: r.height, frameW: document.getElementById('mlv-frame').getBoundingClientRect().width, content,
        soundVisible: !document.getElementById('mlv-sound').hidden, mlvBottom: mlv.bottom, secTop: sec.top, scrollW: document.documentElement.scrollWidth, iw: innerWidth,
        title: document.getElementById('mlv-title').textContent, font: getComputedStyle(document.getElementById('mlv-title')).fontFamily };
    });
    const u = new URL(st.src), q = u.searchParams;
    ok(`[id ${vp.width}] iframe src is youtube-nocookie /embed/${TEST_ID}`, u.origin === 'https://www.youtube-nocookie.com' && u.pathname === '/embed/' + TEST_ID, st.src);
    ok(`[id ${vp.width}] autoplay=1 mute=1 playsinline=1 enablejsapi=1 rel=0`, q.get('autoplay') === '1' && q.get('mute') === '1' && q.get('playsinline') === '1' && q.get('enablejsapi') === '1' && q.get('rel') === '0');
    ok(`[id ${vp.width}] origin param = page origin`, q.get('origin') === `http://127.0.0.1:${PORT}`, q.get('origin'));
    ok(`[id ${vp.width}] allow has autoplay, referrerpolicy set`, /autoplay/.test(st.allow) && st.ref === 'strict-origin-when-cross-origin');
    ok(`[id ${vp.width}] 16:9`, Math.abs(st.w / st.h - 16 / 9) < 0.02, st.w.toFixed(1) + 'x' + st.h.toFixed(1));
    ok(`[id ${vp.width}x${vp.height}] width ≤ page content width (centred)`, st.frameW <= st.content + 0.5 && Math.abs((st.frameLeft - st.contentLeft) - (st.content - st.frameW) / 2) < 1, st.frameW.toFixed(1) + ' vs ' + st.content);
    ok(`[id ${vp.width}x${vp.height}] opossum does not sit on the player`, !st.possumOver);
    if (vp.width >= 1000) ok(`[id ${vp.width}x${vp.height}] whole player on the first screen`, st.frameBottom <= st.ih, 'bottom ' + st.frameBottom.toFixed(1) + ' / ' + st.ih);
    ok(`[id ${vp.width}] above "Every chapter, mapped"`, st.mlvBottom <= st.secTop);
    ok(`[id ${vp.width}] Tap for sound shown`, st.soundVisible);
    ok(`[id ${vp.width}] title + display font`, /Watch first: How to make your own mind map/.test(st.title) && /Baloo/.test(st.font), st.font);
    ok(`[id ${vp.width}] no horizontal scroll`, st.scrollW <= st.iw, st.scrollW + ' vs ' + st.iw);
    ok(`[id ${vp.width}] YouTube requests only nocookie embed + iframe_api`, yt.every(x => /^https:\/\/www\.youtube-nocookie\.com\/embed\/|^https:\/\/www\.youtube\.com\/iframe_api$/.test(x)), yt.join(' '));
    await page.screenshot({ path: path.join(SNAPS, `mlv_top_${vp.width}x${vp.height}.png`) });
    if (vp.width === 1280 || vp.width === 390) await page.screenshot({ path: path.join(SNAPS, `mlv_full_${vp.width}.png`), fullPage: true });
    ok(`[id ${vp.width}] no console errors`, errors.length === 0, errors.join(' | '));
    await ctx.close();
  }

  /* ── C. the pause hooks (desktop) ── */
  {
    const { ctx, page, errors } = await setup(browser, { viewport: { width: 1280, height: 800 }, withId: true });
    await page.goto(BASE, { waitUntil: 'networkidle' });
    await page.waitForFunction(() => window.MindLabVideo && window.__yt && window.__yt.state === 1 && window.MindLabVideo.audible !== undefined);
    await page.waitForTimeout(150);
    const reset = () => page.evaluate(() => { window.__yt.calls = []; window.__yt.resumeByUser(); });
    const calls = () => page.evaluate(() => window.__yt.calls.slice());
    const drawDone = () => page.waitForFunction(() => /Replay/.test(document.getElementById('play').textContent), null, { timeout: 30000 });

    // 1. Tap for sound
    await reset();
    await page.click('#mlv-sound');
    let c = await calls();
    ok('[pause] Tap for sound → unMute + playVideo, button hides', c.includes('unMute') && c.includes('playVideo') && await page.$eval('#mlv-sound', b => b.hidden), c.join(','));
    ok('[pause] video now audible', await page.evaluate(() => window.MindLabVideo.audible()));

    // 2. Make my own mind map: no pause
    await reset();
    await page.click('#mm-make');
    await page.waitForSelector('#mm-sheet:not([hidden])');
    await page.click('#mm-new');
    await page.waitForSelector('#mm-edit:not([hidden])');
    await page.fill('#mm-centre', 'PLANTS');
    await page.click('#mm-add');
    await page.waitForTimeout(300);
    await page.screenshot({ path: path.join(SNAPS, 'mlv_maker_open_1280.png') });
    c = await calls();
    ok('[pause] Make my own mind map (open, new, type, add branch) → NO pause', !c.includes('pauseVideo'), c.join(','));
    await page.keyboard.press('Escape');
    await page.waitForSelector('#mm-sheet', { state: 'hidden' });

    // 3. scrolling down: the poster draws itself → NO pause, and silent while the video talks
    await reset();
    await page.evaluate(() => { window.__voices = 0; });
    await page.evaluate(() => document.getElementById('stage-shell').scrollIntoView({ block: 'center' }));
    await page.waitForFunction(() => /Pause|Replay/.test(document.getElementById('play').textContent));
    await page.waitForTimeout(2500);
    c = await calls();
    const v1 = await page.evaluate(() => window.__voices);
    ok('[pause] scroll → automatic draw → NO pause', !c.includes('pauseVideo'), c.join(','));
    ok('[pause] automatic draw is silent while the video plays out loud', v1 === 0, 'voices=' + v1);
    await page.screenshot({ path: path.join(SNAPS, 'mlv_scrolled_autodraw_1280.png') });
    await drawDone();

    const check = async (name, act, expect = true) => {
      await reset();
      await act();
      await page.waitForTimeout(250);
      const cc = await calls();
      ok(`[pause] ${name} → ${expect ? 'pauseVideo' : 'NO pause'}`, cc.includes('pauseVideo') === expect, cc.join(',') || '(none)');
    };
    await page.evaluate(() => { window.__voices = 0; });
    await check('Replay', () => page.click('#play'));
    ok('[pause] Replay draw makes sound again', await page.evaluate(() => window.__voices) > 0);
    await check('Pause the drawing (⏸)', () => page.click('#play'), false);
    await check('Resume the drawing (▶ Resume)', () => page.click('#play'));
    await check('chapter chip (Water Cycle…)', () => page.click('.tbtn[aria-pressed="false"] >> nth=3'));
    await check('theme strip button', () => page.click('#stylebar .sbtn[aria-pressed="false"] >> nth=0'));
    await check('theme gallery card', () => page.click('#gallery .gcard[aria-pressed="false"] >> nth=0'));
    await check('view: Quick node', () => page.click('[data-mode="node"]'));
    await check('view: 3D', () => page.click('[data-mode="3d"]'));
    await page.waitForTimeout(400);
    await page.screenshot({ path: path.join(SNAPS, 'mlv_3d_1280.png') });
    await check('view: Poster', () => page.click('[data-mode="poster"]'));
    await check('speed 2×', () => page.click('[data-speed="2"]'));
    await check('speed 1×', () => page.click('[data-speed="1"]'));
    await check('Sound → Muted', () => page.click('#sound'), false);
    await check('Muted → Sound on', () => page.click('#sound'));
    await drawDone().catch(() => {});
    await check('a "Sounds" line button (hear a branch)', () => page.click('#sfxline button >> nth=0'));
    // Rig: needs a chapter with a sim (electrical)
    await page.evaluate(() => window.MindLab.open('electrical'));
    await page.waitForTimeout(300);
    await check('view: Rig (Electrical)', () => page.click('#rig-btn'));
    await check('the opossum (mix-up busters list)', () => page.click('#possum', { force: true }), false);
    await page.keyboard.press('Escape');
    await check('Make my own mind map again', async () => { await page.click('#mm-make'); await page.waitForSelector('#mm-sheet:not([hidden])'); }, false);
    await check('Compare with the poster (leaves the maker and draws the poster)', async () => {
      await page.click('#mm-list .mm-btn.primary >> nth=0').catch(() => {});
      await page.waitForSelector('#mm-edit:not([hidden])');
      await page.click('#mm-compare');
    });
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(300);
    ok('[pause] "Paused while your mind map plays" note shown', await page.$eval('#mlv-note', n => !n.hidden));
    const shift = await page.evaluate(() => { const n = document.getElementById('mlv-note'), sec = document.querySelector('.sec');
      const a = sec.getBoundingClientRect().top; n.hidden = true; const b = sec.getBoundingClientRect().top; n.hidden = false;
      const r = n.getBoundingClientRect(), f = document.getElementById('mlv-frame').getBoundingClientRect(), h = sec.querySelector('h3').getBoundingClientRect();
      return { moved: a - b, between: r.top > f.bottom && r.bottom < h.top };
    });
    ok('[pause] showing the note moves nothing, and it sits between the player and the chapters', shift.moved === 0 && shift.between, JSON.stringify(shift));
    await page.screenshot({ path: path.join(SNAPS, 'mlv_paused_note_1280.png') });
    ok('[pause] no console errors', errors.length === 0, errors.join(' | '));
    await ctx.close();
  }

  /* ── D. the pause before the API has loaded: nothing breaks ── */
  {
    const { ctx, page, errors } = await setup(browser, { viewport: { width: 1280, height: 800 }, withId: true });
    await page.route('https://www.youtube.com/iframe_api', r => r.abort());
    await page.goto(BASE, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.getElementById('stage-shell').scrollIntoView({ block: 'center' }));
    await page.waitForTimeout(400);
    await page.click('.tbtn[aria-pressed="false"] >> nth=1');
    await page.click('[data-speed="2"]');
    await page.waitForTimeout(300);
    const nonApi = errors.filter(e => !/iframe_api|ERR_FAILED|Failed to load resource/.test(e));
    ok('[no API] lab still draws and controls work with the API blocked', await page.evaluate(() => /Pause|Replay/.test(document.getElementById('play').textContent)));
    ok('[no API] no script errors (besides the blocked API request)', nonApi.length === 0, errors.join(' | '));
    await ctx.close();
  }

  /* ── E. reduced motion / Save-Data: no autoplay ── */
  for (const [name, o] of [['reduced-motion', { reducedMotion: true }], ['save-data', { saveData: true }]]) {
    const { ctx, page, errors } = await setup(browser, Object.assign({ viewport: { width: 390, height: 844 }, withId: true }, o));
    await page.goto(BASE, { waitUntil: 'networkidle' });
    const st = await page.evaluate(() => ({ src: document.querySelector('#mlv iframe').src, sound: !document.getElementById('mlv-sound').hidden }));
    const q = new URL(st.src).searchParams;
    ok(`[${name}] autoplay=0 mute=0, no sound button`, q.get('autoplay') === '0' && q.get('mute') === '0' && !st.sound, st.src);
    ok(`[${name}] no console errors`, errors.length === 0, errors.join(' | '));
    await page.screenshot({ path: path.join(SNAPS, `mlv_${name}_390.png`) });
    await ctx.close();
  }

  await browser.close();
  console.log(results.join('\n'));
  console.log(results.filter(r => r.startsWith('FAIL')).length + ' failed of ' + results.length);
})().catch(e => { console.error(e); console.log(results.join('\n')); process.exit(1); });
