const { chromium } = require('playwright');
(async () => { const b = await chromium.launch(); const p = await b.newPage({viewport:{width:1100,height:1000}});
 p.on("pageerror", e => console.log("ERR", e.message)); await p.goto("http://localhost:8772/c.html"); await p.waitForTimeout(500);
 await p.screenshot({path:"../snaps/track.png", fullPage:true}); await b.close(); })();
