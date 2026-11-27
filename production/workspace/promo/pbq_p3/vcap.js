// vcap.js: frame-exact capture of the real game (Pet Buddy Quest: Primary 3) on a virtual clock.
// The page's requestAnimationFrame, performance.now and Date.now are replaced, so every captured frame is exactly 1/60 s of game
// time apart (true 60 fps, no dropped frames, normal speed), however long each screenshot takes. CSS animations and transitions are
// paused and stepped on the same clock. Voice lines are not played (their length is kept on the game clock); every voice line and
// sound effect is logged with its time so the soundtrack can be rebuilt exactly (sfx.js renders the game's own Web Audio sounds).
// Taps and drags are logged for the tap rings drawn in the edit.
const {chromium}=require('playwright');const {spawn}=require('child_process');const fs=require('fs');
const FPS=60,DT=1000/FPS;
const INIT=`(()=>{let vt=0,fr=0;const D0=Date.now(),q=[],seen=new WeakMap();
  window.requestAnimationFrame=cb=>{q.push(cb);return q.length;};window.cancelAnimationFrame=()=>{};
  performance.now=()=>vt;Date.now=()=>D0+vt;
  const V=window.__V={log:[],get t(){return vt;},get f(){return fr;}};
  window.__step=ms=>{vt+=ms;fr++;const cbs=q.splice(0);for(const cb of cbs){try{cb(vt);}catch(e){console.error('raf '+(e&&e.message));}}
    for(const a of document.getAnimations()){let s=seen.get(a);if(!s){s={t:0};seen.set(a,s);}else s.t+=ms;
      try{a.pause();const end=a.effect.getComputedTiming().endTime;if(isFinite(end)&&s.t>=end)a.finish();else a.currentTime=s.t;}catch(e){}}};
  document.addEventListener('DOMContentLoaded',()=>{
    // voice lines: keep their length on the game clock, play nothing, log them
    window.voPlay=function(who,text){if(!text)return null;const k=vkey(who,text),e=VO.idx[k];if(!e){V.log.push({t:vt,ev:'vomiss',who,text});return null;}
      voStop();let res;const c={id:k,who,dur:e[3]/TS,ended:false,skipped:false,src:null};c.done=new Promise(r=>res=r);
      c.end=()=>{if(c.ended)return;c.ended=true;V.log.push({t:vt,ev:'voend',k});if(VO.cur===c){VO.cur=null;duck(false);}res();};
      VO.cur=c;duck(true);VO.log.played.push(k);V.log.push({t:vt,ev:'vo',who,text,k,dur:e[3]});wait(e[3]).then(c.end);return c;};
    // sound effects: log the outermost call (the edit rebuilds them with sfx.js)
    let depth=0;window.__SFX0={};for(const k of Object.keys(SFX)){const o=SFX[k];window.__SFX0[k]=o;
      SFX[k]=function(...a){if(!depth)V.log.push({t:vt,ev:'sfx',k,a});depth++;try{return o.apply(this,a);}finally{depth--;}};}
  });})();`;
async function open(o){
  const b=await chromium.launch({args:['--mute-audio','--autoplay-policy=no-user-gesture-required']});
  const ctx=await b.newContext({viewport:{width:o.w,height:o.h},deviceScaleFactor:o.dpr||1,hasTouch:!!o.touch});
  if(o.pg)await ctx.addInitScript(pg=>{try{localStorage.setItem('pbq-p3-v1',JSON.stringify(pg));}catch(e){}},o.pg);
  await ctx.addInitScript(INIT);
  const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push(m.text());});
  await p.goto(o.url);await p.waitForFunction(()=>window.__pbq&&!document.getElementById('load'),null,{timeout:20000,polling:100}).catch(()=>{});
  const cdp=await ctx.newCDPSession(p);
  const C={p,b,cdp,errs,cap:false,frames:[],taps:[],out:o.out,ff:null,
    async step(n=1){for(let i=0;i<n;i++){await p.evaluate(ms=>window.__step(ms),DT);if(C.cap)await C.shot();if(C.onStep)await C.onStep();}},
    async shot(){const r={data:(await p.screenshot({type:'jpeg',quality:93})).toString('base64')};
      if(!C.ff){C.ff=spawn('ffmpeg',['-v','error','-y','-f','image2pipe','-c:v','mjpeg','-framerate',String(FPS),'-i','-','-vf','pad=ceil(iw/2)*2:ceil(ih/2)*2','-c:v','libx264','-preset','veryfast','-crf','13','-pix_fmt','yuv420p','-r',String(FPS),C.out+'.mp4'],{stdio:['pipe','inherit','inherit']});
        C.ffDone=new Promise(r=>C.ff.on('close',r));}
      const buf=Buffer.from(r.data,'base64');if(!C.ff.stdin.write(buf))await new Promise(r=>C.ff.stdin.once('drain',r));
      C.frames.push(await p.evaluate(()=>window.__V.t));},
    async run(sec){await C.step(Math.round(sec*FPS));},
    async until(fn,arg,max=60){const n=Math.round(max*FPS);for(let i=0;i<n;i++){if(await p.evaluate(fn,arg))return true;await C.step(1);}console.log('  until: timed out',String(fn).slice(0,80));return false;},
    async box(sel){const l=p.locator(sel).first();await l.evaluate(e=>e.scrollIntoView({block:'nearest'})).catch(()=>{});return l.boundingBox();},
    async tap(sel,o={}){const bb=await C.box(sel);if(!bb){console.log('  tap: no',sel);return false;}const x=bb.x+bb.width*(o.fx??.5),y=bb.y+bb.height*(o.fy??.5);
      const t=await p.evaluate(()=>window.__V.t);C.taps.push({t,x,y,kind:'tap',sel});await p.mouse.move(x,y);await p.mouse.down();await C.step(4);await p.mouse.up();return true;},
    async drag(from,to,o={}){const a=await C.box(from),b2=await C.box(to);if(!a||!b2){console.log('  drag: no box',from,to);return false;}
      const x0=a.x+a.width/2,y0=a.y+a.height/2,x1=b2.x+b2.width/2,y1=b2.y+Math.min(b2.height/2,o.dy||40),n=o.frames||30;
      const t=await p.evaluate(()=>window.__V.t);const path=[];await p.mouse.move(x0,y0);await p.mouse.down();await C.step(6);
      for(let i=1;i<=n;i++){const u=i/n,e=u<.5?2*u*u:1-Math.pow(-2*u+2,2)/2;const x=x0+(x1-x0)*e,y=y0+(y1-y0)*e-Math.sin(Math.PI*u)*(o.arc||40);
        await p.mouse.move(x,y);path.push([x,y]);await C.step(1);}
      await C.step(3);await p.mouse.up();C.taps.push({t,x:x0,y:y0,kind:'drag',path,n});return true;},
    async eval(fn,arg){return p.evaluate(fn,arg);},
    async close(){if(C.ff){C.ff.stdin.end();await C.ffDone;}
      const log=await p.evaluate(()=>window.__V.log);
      fs.writeFileSync(C.out+'.json',JSON.stringify({fps:FPS,w:o.w,h:o.h,dpr:o.dpr||1,frames:C.frames,taps:C.taps,log,errs:C.errs},null,0));
      console.log('  wrote',C.out,C.frames.length,'frames,',log.length,'events, errors:',C.errs.length?C.errs.slice(0,3).join(' | '):'none');await b.close();}};
  // start the page's audio context (as a first tap would) and let the scene settle
  await p.mouse.click(5,150);return C;}
module.exports={open,FPS};
