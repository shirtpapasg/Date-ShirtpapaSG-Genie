const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' }).catch(() => chromium.launch());
  const errs = [];
  for (const [w, h] of [[1280, 800], [390, 844]]) {
    const p = await b.newPage({ viewport: { width: w, height: h } });
    p.on('pageerror', e => errs.push(`${w} pageerror ${e.message}`));
    await p.goto('http://localhost:8771/mindmap.html#make', { waitUntil: 'load' }); await p.waitForTimeout(2500);
    const txt = await p.evaluate(() => document.body.innerText);
    console.log(w, 'maker visible:', /Make my own mind map|My mind maps|Start a new mind map/.test(txt));
    await p.goto('http://localhost:8771/index.html', { waitUntil: 'load' }); await p.waitForTimeout(2500);
    const pill = await p.evaluate(() => [...document.querySelectorAll('button,a')].some(x => /Mind maps/.test(x.textContent)));
    console.log(w, 'index has Mind maps entry:', pill);
    await p.close();
  }
  console.log('errors:', errs.length ? errs : 'none'); await b.close();
})();
