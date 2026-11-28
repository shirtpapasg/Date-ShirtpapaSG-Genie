const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});
const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://'+process.cwd()+'/explained-episode-guide.html');
for(const q of ['56','3.5','magnet','p. 15','digestion','zzz']){await p.fill('#q',q);console.log(q,'=>',await p.$$eval('.ep .no',n=>n.length),await p.textContent('#hint'));}
await p.fill('#q','');await p.screenshot({path:'g1.png',fullPage:false});
console.log('overflow',await p.evaluate(()=>document.documentElement.scrollWidth),errs);await b.close();})();
