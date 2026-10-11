const { chromium } = require('playwright');
const [,, lab, prefix, ...modes] = process.argv;
const OUT = '/tmp/claude-0/-home-user/8764a423-5385-5445-b38a-c2c2633ecdb7/scratchpad/snaps/';
const sizes = [[1440,900],[1280,720],[844,390]];
(async () => {
  const b = await chromium.launch({ args: ['--use-gl=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist'] });
  for (const [w,h] of sizes) {
    const ctx = await b.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
    const fs = require('fs');
    const V = '/tmp/claude-0/-home-user/8764a423-5385-5445-b38a-c2c2633ecdb7/scratchpad/unpkg/';
    await ctx.route('https://unpkg.com/**', r => { const u = new URL(r.request().url()); const m = u.pathname.match(/^\/((?:@[^/]+\/)?[^/@]+@[^/]+)\/(.*)$/); const f = m && V + m[1].replace('/', '__') + '/package/' + m[2]; if (!f || !fs.existsSync(f)) { console.log('miss', u.href); return r.fulfill({ status: 404, body: '' }); } r.fulfill({ status: 200, contentType: 'text/javascript', headers: { 'access-control-allow-origin': '*' }, body: fs.readFileSync(f) }); });
    await ctx.route(/fonts\.(googleapis|gstatic)\.com/, r => r.fulfill({ status: 200, contentType: 'text/css', body: '' }));
    await ctx.route('**/api/**', r => r.fulfill({ status: 200, contentType: 'application/json', body: '{}' }));
    const p = await ctx.newPage();
    p.on('pageerror', e => console.log('ERR', e.message));
    await p.goto('http://localhost:8765/labs/' + lab + '/index.html');
    await p.evaluate(() => { for (let i=0;i<localStorage.length;i++){} });
    await p.waitForTimeout(2500);
    await p.evaluate(() => { const s=[...document.querySelectorAll('button')].find(b=>/Skip/.test(b.textContent)); if (s) s.click(); });
    await p.waitForTimeout(300);
    const steps = require('fs').existsSync('/x') ? [] : null;
    for (const m of modes) {
      // m = "click:REGEX" | "wait:ms" | "shot:name" | "aside0" | "eval:js"
      const [k, ...rest] = m.split(':'); const v = rest.join(':');
      if (k === 'click') { const ok = await p.evaluate((re) => { const r = new RegExp(re); const el=[...document.querySelectorAll('button')].filter(b=>b.getClientRects().length).find(b=>r.test(b.textContent)); if (el) { el.click(); return true; } return false; }, v); if (!ok) console.log('noclick', v); await p.waitForTimeout(400); }
      else if (k === 'wait') await p.waitForTimeout(+v);
      else if (k === 'slide') { await p.evaluate((val) => { const i = document.querySelector('[data-dock] input[type=range]'); const set = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set; set.call(i, val); i.dispatchEvent(new Event('input', { bubbles: true })); i.dispatchEvent(new Event('change', { bubbles: true })); }, v); await p.waitForTimeout(400); }
      else if (k === 'probe') { console.log(w+'x'+h, v, await p.evaluate(() => { const a = document.querySelector('aside'); if (!a) return 'no aside'; const ab = a.getBoundingClientRect(); return JSON.stringify([...a.querySelectorAll('div')].filter(d => d.style.order === '1' && d.style.zoom && d.getClientRects().length).map(d => { const r = d.getBoundingClientRect(); return [d.innerText.split('\n')[0].slice(0, 20), Math.round(r.top), Math.round(r.bottom), 'asideBottom', Math.round(ab.bottom), 'scrollH', a.scrollHeight, a.clientHeight]; })); })); }
      else if (k === 'pickaside') { await p.evaluate(() => { const b = [...document.querySelectorAll('aside button')].filter(b => b.getClientRects().length && !/Back|Next|→|Start again|Replay/.test(b.textContent))[0]; if (b) b.click(); }); await p.waitForTimeout(600); }
      else if (k === 'eval') { console.log(await p.evaluate(v)); }
      else if (k === 'shot') await p.screenshot({ path: OUT + prefix + '_' + v + '_' + w + 'x' + h + '.png' });
    }
    await ctx.close();
  }
  await b.close();
})();
