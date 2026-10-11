const { chromium } = require('playwright');
const fs = require('fs');
const EPS = JSON.parse(fs.readFileSync(__dirname + '/eps.json', 'utf8'));
const COL = { red:'#e0503f', orange:'#e07b1f', yellow:'#c99a00', green:'#4f9a2a', teal:'#1f9488', blue:'#2f6fd1', purple:'#7c4dff', pink:'#d6458f' };
const rgb = h => [1,3,5].map(i => parseInt(h.slice(i, i+2), 16));
function hsl(h) { const [r,g,b] = rgb(h).map(v => v/255); const mx = Math.max(r,g,b), mn = Math.min(r,g,b); let H = 0; const d = mx-mn;
  if (d) { H = mx===r ? ((g-b)/d)%6 : mx===g ? (b-r)/d+2 : (r-g)/d+4; H*=60; if (H<0) H+=360; } return [H, d/(1-Math.abs(mx+mn-1)||1), (mx+mn)/2]; }
function pick(hex, used) {
  if (COL[hex]) return hex; const [h, s] = hsl(hex);
  const dist = id => { const d = Math.abs(hsl(COL[id])[0] - h); return Math.min(d, 360-d) + (s < 0.25 ? 0 : 0); };
  let ids = Object.keys(COL);
  if (s < 0.2 || hex === '#1b1b3a') return ids.filter(i => !used.has(i)).includes('purple') ? 'purple' : ids.find(i => !used.has(i));
  ids = ids.sort((a, b) => dist(a) - dist(b));
  return ids.find(i => !used.has(i)) || ids[0];
}
(async () => {
  const only = process.argv.slice(2);
  const b = await chromium.launch();
  const boxes = fs.existsSync(__dirname + '/boxes.json') ? JSON.parse(fs.readFileSync(__dirname + '/boxes.json')) : {};
  const titles = { plants:'Plant System', digestive:'Digestive System', matter:'Matter', light:'Light', heat:'Heat' };
  for (const n of Object.keys(EPS)) {
    if (only.length && !only.includes(n)) continue;
    const e = EPS[n], used = new Set();
    const now = Date.now();
    const map = { id: 'ep' + n, ch: e.ch, name: 'My ' + titles[e.ch] + ' mind map', centre: e.c,
      b: e.b.map(([t, hex, k]) => { const c = pick(hex, used); used.add(c); return { t, c, k }; }), at: now - 60000, up: now };
    const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
    const p = await ctx.newPage();
    await p.addInitScript(s => { try { localStorage.setItem('sm-mymaps-v1', s); } catch (x) {} }, JSON.stringify({ v: 1, maps: [map] }));
    await p.goto('http://localhost:8766/mindmap.html');
    await p.waitForFunction(() => window.MyMindMap);
    await p.evaluate(() => document.fonts.ready);
    await p.evaluate(id => window.MyMindMap.open(id), map.id);
    await p.waitForTimeout(900);
    await p.evaluate(() => { const d = document.querySelector('.mm-dialog'); d.scrollTop = 0; document.activeElement && document.activeElement.blur(); });
    await p.waitForTimeout(300);
    const r = await p.evaluate(() => { const f = el => { const q = el.getBoundingClientRect(); return [q.x, q.y, q.width, q.height].map(v => Math.round(v * 2)); };
      return { saved: f(document.getElementById('mm-saved')), map: f(document.querySelector('.mm-canvas')), txt: document.getElementById('mm-saved').textContent }; });
    if (r.txt !== 'Saved ✓') console.log('WARN pill', n, r.txt);
    await p.screenshot({ path: __dirname + '/mm_ep' + n + '.png' });
    boxes[n] = { saved: r.saved, map: r.map };
    console.log(n, JSON.stringify(boxes[n]), map.b.map(x => x.c).join(','));
    await ctx.close();
  }
  fs.writeFileSync(__dirname + '/boxes.json', JSON.stringify(Object.fromEntries(Object.keys(boxes).sort((a,b)=>a-b).map(k=>[k,boxes[k]]))));
  await b.close();
})();
