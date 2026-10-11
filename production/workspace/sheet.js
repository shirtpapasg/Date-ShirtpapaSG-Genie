// Contact sheet of audit flags: one frame per flagged item, offending text boxed in red (and the other item in blue).
// usage: node sheet.js page.html audit.json out.jpg
const { chromium } = require('playwright'); const fs = require('fs');
(async () => { const [file, aj, out] = process.argv.slice(2); const issues = JSON.parse(fs.readFileSync(aj));
  const seen = new Set(), list = issues.filter(i => { const k = i.kind + i.text + i.other; if (seen.has(k)) return false; seen.add(k); return true; });
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
  await p.goto('file://' + file); await p.waitForFunction(() => window.READY === true); const shots = [];
  for (const [i, it] of list.entries()) { const t = (it.from + it.to) / 2;
    await p.evaluate(({t, it, i}) => { window.render(t); document.querySelectorAll('.auditbox').forEach(e => e.remove());
      const find = s => [...document.querySelectorAll('#v text')].filter(e => (e.textContent || '').trim().slice(0, 40) === s);
      const box = (e, col) => { const r = e.getBoundingClientRect(); const d = document.createElement('div'); d.className = 'auditbox';
        Object.assign(d.style, {position: 'fixed', left: r.left - 4 + 'px', top: r.top - 4 + 'px', width: r.width + 8 + 'px', height: r.height + 8 + 'px', border: `5px solid ${col}`, zIndex: 9}); document.body.appendChild(d); };
      find(it.text).forEach(e => box(e, 'red')); if (it.other && !it.other.includes(':')) find(it.other).forEach(e => box(e, '#00b4ff'));
      const l = document.createElement('div'); l.className = 'auditbox'; Object.assign(l.style, {position: 'fixed', left: '0', top: '0', background: '#000', color: '#ff0', font: 'bold 34px sans-serif', padding: '6px 12px', zIndex: 10});
      l.textContent = `#${i} ${it.kind} @${t.toFixed(1)}s`; document.body.appendChild(l); }, {t, it, i});
    shots.push(await p.screenshot({ type: 'jpeg', quality: 60 })); }
  // stitch with a tiny canvas page
  const cols = 3, W = 640, H = 360, rows = Math.ceil(shots.length / cols) || 1;
  await p.setViewportSize({ width: cols * W, height: rows * H });
  await p.setContent(`<body style="margin:0;background:#222">${shots.map(s => `<img src="data:image/jpeg;base64,${s.toString('base64')}" style="width:${W}px;height:${H}px;float:left">`).join('')}</body>`);
  await p.waitForTimeout(300); await p.screenshot({ path: out, type: 'jpeg', quality: 72, fullPage: true });
  list.forEach((it, i) => console.log(`#${i} ${it.kind} ${it.from}-${it.to}s | ${it.text} | ${it.other}`)); await b.close(); })();
