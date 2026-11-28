// qa_helmets.js (P4 EP3 v2): no bike helmet on any buddy in any frame (teacher 28 Nov 2026: "why is pip still in cyclist helmet?").
// Renders every 0.25 s in the page (no screenshots) and looks for the buddies' helmet paint: items_options.js helmetP gradients
// (hBas = Basil's orange, hLil / hSun = Pip's) and lib.js helmetP4 (Pip's purple, #8B5CF6 shell). Uncle Lim's own white helmet is his.
const { chromium } = require('playwright'); const path = require('path');
(async () => { const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
  await p.goto('file://' + path.join(__dirname, 'page.html') + '?part=1'); await p.waitForFunction(() => window.READY === true, null, { timeout: 120000 });
  const r = await p.evaluate(() => { const hits = []; let n = 0; for (let t = 0; t < TL.END; t += .25) { n++; window.render(t); const h = document.getElementById('dyn').innerHTML;
    const m = h.match(/url\(#(hBas|hLil|hSun)|fill="#8B5CF6" stroke="#2B2147" stroke-width="9"/); if (m) hits.push([+t.toFixed(2), window._S.name, m[0]]); } return { n, hits }; });
  console.log(`${r.n} frames swept; frames with a bike helmet on a buddy: ${r.hits.length}` + (r.hits.length ? ' e.g. ' + JSON.stringify(r.hits.slice(0, 5)) : ' (OK)')); await b.close(); process.exit(r.hits.length ? 1 : 0); })();
