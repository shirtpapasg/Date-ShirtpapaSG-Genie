const { setup, BASE, chromium } = require('./check.cjs');
(async()=>{
  const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
  const ctx=await b.newContext({viewport:{width:1280,height:800}});
  await setup(ctx);
  const p=await ctx.newPage();
  p.on('requestfailed',r=>console.log('FAILED',r.url(),r.failure()&&r.failure().errorText));
  await p.goto(BASE+'/mindmap.html'); await p.waitForTimeout(1500);
  console.log('THREE', await p.evaluate(()=>typeof THREE));
  console.log(await p.evaluate(()=>[...document.querySelectorAll('#map [role=button], #map [tabindex]')].length));
  await b.close();
})();
