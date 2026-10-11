const { chromium } = require('playwright');
(async () => { const b = await chromium.launch(); for (const [w,n] of [[1200,"wide"],[400,"phone"]]) { const p = await b.newPage({viewport:{width:w,height:900}});
 p.on("pageerror", e => console.log("ERR", e.message)); await p.goto("http://localhost:8772/b.html"); await p.waitForTimeout(500);
 const el = await p.$("#list"); await el.screenshot({path:`../snaps/badges_${n}.png`}); await p.close(); } await b.close(); })();
