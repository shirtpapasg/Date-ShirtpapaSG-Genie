const { chromium } = require('playwright');
(async () => { const [page, t, out, line1, line2, col, emoji, ex, ey] = process.argv.slice(2);
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
  await p.goto('file://' + page); await p.waitForFunction(() => window.READY === true);
  await p.evaluate(([t, line1, line2, col, emoji, ex, ey]) => { window.render(+t); if (window.THUMB_SHIFT) {}
    ['caps', 'shelf', 'kwFly', 'tag', 'confetti'].forEach(id => { const e = document.getElementById(id); if (e) e.style.display = 'none'; });
    document.getElementById('prog').style.display = 'none';
    const NS = 'http://www.w3.org/2000/svg', v = document.getElementById('v');
    const g = document.createElementNS(NS, 'g'); v.appendChild(g);
    const shade = document.createElementNS(NS, 'rect'); Object.entries({x: 0, y: 0, width: 1920, height: 1080, fill: 'url(#thumbShade)'}).forEach(([k, x]) => shade.setAttribute(k, x));
    const lg = document.createElementNS(NS, 'linearGradient'); lg.id = 'thumbShade'; lg.setAttribute('x1', 0); lg.setAttribute('x2', 1);
    [[0, .0], [.55, .0], [1, .55]].forEach(([o, a]) => { const s = document.createElementNS(NS, 'stop'); s.setAttribute('offset', o); s.setAttribute('stop-color', '#000'); s.setAttribute('stop-opacity', a); lg.appendChild(s); });
    v.querySelector('defs').appendChild(lg); g.appendChild(shade);
    const T = (y, s, size, fill) => { const t = document.createElementNS(NS, 'text'); Object.entries({x: 1860, y, 'text-anchor': 'end', 'font-size': size, 'font-weight': 700, fill, stroke: '#1b1b3a', 'stroke-width': 26, 'paint-order': 'stroke', 'stroke-linejoin': 'round', 'font-family': 'Fredoka'}).forEach(([k, x]) => t.setAttribute(k, x)); t.textContent = s; g.appendChild(t); };
    T(line2 ? 470 : 600, line1, 230, '#fff'); if (line2) T(720, line2, 230, col);
    if (emoji) emoji.split('|').forEach((em, i) => { const t = document.createElementNS(NS, 'text'); Object.entries({x: ex, y: ey, 'font-size': i ? 300 : 260, 'text-anchor': 'middle', 'dominant-baseline': 'central', 'font-family': 'Noto Color Emoji', opacity: i ? .9 : 1}).forEach(([k, x]) => t.setAttribute(k, x)); t.textContent = em; g.appendChild(t); });
  }, [t, line1, line2, col, emoji, ex, ey]);
  await p.screenshot({ path: out, type: 'jpeg', quality: 92, clip: { x: 0, y: 0, width: 1920, height: 1080 } }); await b.close(); })();
