const { chromium } = require('playwright');
(async () => { const b = await chromium.launch(); const p = await b.newPage({viewport:{width:1100,height:1300}});
 await p.goto("http://localhost:8772/b.html"); await p.waitForTimeout(500);
 console.log(await p.$$eval(".ep", es => es.map(e => e.querySelector(".vcol").innerText.replace(/\n/g," | "))));
 await p.screenshot({path:"../snaps/badges_full.png", fullPage:true}); await b.close(); })();
