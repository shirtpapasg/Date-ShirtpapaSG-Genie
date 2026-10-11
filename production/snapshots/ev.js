const { chromium } = require('playwright');
(async () => { const [page, code] = process.argv.slice(2); const b = await chromium.launch(); const p = await b.newPage({viewport:{width:1920,height:1080}});
 await p.goto('file://' + page); await p.waitForFunction(() => typeof window.render === 'function'); await p.waitForTimeout(500);
 console.log(JSON.stringify(await p.evaluate(code))); await b.close(); })();
