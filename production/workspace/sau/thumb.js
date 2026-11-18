// thumb.js: a TheOneApp, Explored thumbnail in the P5 style (pill, giant two-tone title, the episode's own scene, yellow banner).
// node thumb.js page.html out.png t "WHITE WORDS" "YELLOW WORDS" "banner words" [stageTransform] [extra.js: run in the page after the frame is drawn]
const { chromium } = require('playwright');
(async () => { const [page, out, t, w1, w2, banner, stf, extra] = process.argv.slice(2); const X = extra ? require('fs').readFileSync(extra, 'utf8') : ''; const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1920, height: 1080 } }); await p.goto('file://' + require('path').resolve(page)); await p.waitForFunction(() => window.READY === true);
  await p.evaluate(([t, w1, w2, banner, stf, X]) => { window.render(+t); ['caps', 'kwFly', 'shelf', 'tag', 'progBg', 'prog', 'head'].forEach(id => { const e = document.getElementById(id); if (e) e.setAttribute('opacity', 0); });
    const sc = TL.segs.find(s => s.t0 <= +t && +t <= s.t1 + 1); if (stf && sc) S[sc.scene].stage.setAttribute('transform', stf); if (X) (new Function('S', 'sc', X))(S, sc);
    const NS = 'http://www.w3.org/2000/svg', v = document.getElementById('v'), g = document.createElementNS(NS, 'g'); v.appendChild(g);
    const E = (tag, a, txt) => { const e = document.createElementNS(NS, tag); for (const k in a) e.setAttribute(k, a[k]); if (txt) e.textContent = txt; g.appendChild(e); return e; };
    E('rect', {x: 0, y: 0, width: 1920, height: 330, fill: 'url(#thg)'});
    const lg = document.createElementNS(NS, 'linearGradient'); lg.id = 'thg'; lg.setAttribute('x1', 0); lg.setAttribute('y1', 0); lg.setAttribute('x2', 0); lg.setAttribute('y2', 1);
    [['0', '#000', '.55'], ['1', '#000', '0']].forEach(([o, c, a]) => { const st = document.createElementNS(NS, 'stop'); st.setAttribute('offset', o); st.setAttribute('stop-color', c); st.setAttribute('stop-opacity', a); lg.appendChild(st); }); v.querySelector('defs').appendChild(lg);
    E('rect', {x: 50, y: 40, width: 560, height: 90, rx: 45, fill: '#1b1b3a', stroke: '#fff', 'stroke-width': 5});
    const pt = E('text', {x: 330, y: 101, 'text-anchor': 'middle', 'font-size': 50, 'font-weight': 700, fill: '#fff'}); pt.innerHTML = 'TheOneApp <tspan fill="#ffd60a">Explored</tspan>';
    const tt = E('text', {x: 60, y: 300, 'font-size': 170, 'font-weight': 700, class: 'out', 'stroke-width': 30}); tt.innerHTML = `<tspan fill="#fff">${w1}</tspan> <tspan fill="#ffd60a">${w2}</tspan>`;
    const bb = tt.getBBox(); if (bb.width > 1800) tt.setAttribute('font-size', 170 * 1800 / bb.width);
    // banner words with a thick yellow border (no box), the teacher's choice 18 Nov 2026
    const bo = E('text', {x: 960, y: 1000, 'text-anchor': 'middle', 'font-size': 112, 'font-weight': 700, 'letter-spacing': 5, fill: '#1b1b3a', stroke: '#1b1b3a', 'stroke-width': 30, 'stroke-linejoin': 'round'}, banner);
    const bt = E('text', {x: 960, y: 1000, 'text-anchor': 'middle', 'font-size': 112, 'font-weight': 700, 'letter-spacing': 5, fill: '#1b1b3a', stroke: '#ffd60a', 'stroke-width': 15, 'stroke-linejoin': 'round', style: 'paint-order:stroke'}, banner);
    const w = bt.getBBox().width; if (w > 1700) [bo, bt].forEach(e => e.setAttribute('font-size', 112 * 1700 / w));
  }, [t, w1, w2, banner, stf, X]);
  await p.screenshot({ path: out }); await b.close(); })();
