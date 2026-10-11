// Clean phone shot of the finished, saved map, made the same way as W/mm/shoot.js (P4 mm_epN.png).
const { chromium } = require('playwright');
const fs = require('fs');
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  const now = Date.now();
  const map = { id: 'ep0', ch: 'heat', name: 'My Heat mind map', centre: 'HEAT',
    b: [ { t: 'Temperature', c: 'red', k: ['How hot or cold', 'Measured with a thermometer'] },
         { t: 'Heat flow', c: 'orange', k: ['From hotter to colder', 'Until both are the same'] },
         { t: 'Conductors', c: 'blue', k: ['Good: metals', 'Poor: plastic, wood, air'] } ],
    at: now - 60000, up: now };
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
  const p = await ctx.newPage();
  await p.addInitScript(s => { try { localStorage.setItem('sm-mymaps-v1', s); } catch (x) {} }, JSON.stringify({ v: 1, maps: [map] }));
  await p.goto('http://127.0.0.1:8781/mindmap.html');
  await p.waitForFunction(() => window.MyMindMap);
  await p.evaluate(() => document.fonts.ready);
  await p.evaluate(id => window.MyMindMap.open(id), map.id);
  await p.waitForTimeout(900);
  await p.evaluate(() => { const d = document.querySelector('.mm-dialog'); d.scrollTop = 0; document.activeElement && document.activeElement.blur(); });
  await p.waitForTimeout(300);
  const r = await p.evaluate(() => { const f = el => { const q = el.getBoundingClientRect(); return [q.x, q.y, q.width, q.height].map(v => Math.round(v * 2)); };
    return { saved: f(document.getElementById('mm-saved')), map: f(document.querySelector('.mm-canvas')), txt: document.getElementById('mm-saved').textContent }; });
  if (r.txt !== 'Saved ✓') console.log('WARN pill', r.txt);
  await p.screenshot({ path: __dirname + '/mm_ep0.png' });
  fs.writeFileSync(__dirname + '/mm_box.json', JSON.stringify({ saved: r.saved, map: r.map }));
  console.log(JSON.stringify({ saved: r.saved, map: r.map }));
  await b.close();
})();
