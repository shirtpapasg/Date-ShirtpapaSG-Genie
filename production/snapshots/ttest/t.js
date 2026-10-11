const { chromium } = require('playwright');
(async () => { const b = await chromium.launch({channel:undefined,args:["--autoplay-policy=no-user-gesture-required"]}); const p = await b.newPage({viewport:{width:1200,height:800}});
 p.on("pageerror", e => console.log("ERR", e.message));
 await p.goto("http://localhost:8771/index.html"); await p.click("[data-act=play]"); await p.waitForTimeout(3000);
 console.log(await p.textContent("#ptime"));
 await p.$eval("#pseek", el => { el.value = 600; el.dispatchEvent(new Event("change")); }); await p.waitForTimeout(2000);
 console.log("after seek 60%:", await p.textContent("#ptime"), await p.$eval("#pv", v => v.src.split("/").pop()+" @"+v.currentTime.toFixed(1)));
 await p.screenshot({path:"../snaps/timebar.png"}); await b.close(); })();
