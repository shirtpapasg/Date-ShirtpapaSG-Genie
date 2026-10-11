const { chromium } = require('playwright');
(async () => { const b = await chromium.launch(); const p = await b.newPage(); await p.goto('file://' + process.argv[2]); await p.waitForFunction(() => window.READY === true);
  const r = await p.evaluate(id => { const gs = [...document.querySelectorAll('#' + id)].map(g => [...g.children].map(s => s.getAttribute('stop-color')).join('>'));
    const users = [...document.querySelectorAll(`[fill="url(#${id})"]`)].map(e => { let n = e; while (n && !(n.parentNode && n.parentNode.id === 'scenes')) n = n.parentNode; return n ? [...n.parentNode.children].indexOf(n) : -1; }); return {gs, users}; }, process.argv[3]);
  console.log(JSON.stringify(r)); await b.close(); })();
