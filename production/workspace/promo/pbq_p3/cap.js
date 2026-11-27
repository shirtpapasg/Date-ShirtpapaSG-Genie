// cap.js LAYOUT [which...]: captures the real game for the promo, on the virtual clock (vcap.js).
//   LAYOUT desk  = 1280x720 CSS px at 1.5x  -> 1920x1080 frames (the 16:9 cut)
//   LAYOUT phone = 390x693 CSS px at 2.769x -> 1080x1919 frames (the 9:16 cut; phone-sized gameplay)
// which: map title ep19 ep05 glitch (default: all). Output clips/<layout>_<which>.mp4 + .json (frame times, taps, voice and sound log).
// Needs the game served:  (cd <p3quest>/work && node serve.js 8765)
const V=require('./vcap');const L=process.argv[2]||'desk';const WHICH=process.argv.slice(3);
const LAY={desk:{w:1280,h:720,dpr:1.5},phone:{w:390,h:693,dpr:1080/390,touch:false}}[L];
const URL='http://localhost:8765/_test.html';
// progress so the map looks lived-in: Worlds 1-4 finished (EP0-EP18), EP19 glowing next
function pg(upTo,mem){const eps={};const st=[3,3,2,3,3,3,2,3,3,3,3,2,3,3,3,3,3,2,3,3,3,3,2,3,3,3,3,3];for(let i=0;i<=upTo;i++){const k=String(i).padStart(2,'0');eps[k]={done:1,stars:st[i],perfect:st[i]===3,plays:1,ts:1764000000000+i*1e6};}
  const gw={'Study Skills|00':{won:1,tries:1},'Living & Non-Living|01':{won:1,tries:2},'Classifying Living Things|04':{won:1,tries:1},'Materials|08':{won:1,tries:1}};
  const M={};(mem||[]).forEach((m,i)=>{M[m[0]]={k:m[0],ep:m[1],n:1,ts:1764100000000+i*1000,kind:m[2]};});
  return{v:1,eps,mem:M,gw,muted:false,met:4,seenMap:1};}
const PG_MAP=pg(18,[['r|16-2','16','holdon']]);
const PG_GL=pg(25,[['r|19-3','19','lockin'],['r|22-2','22','holdon'],['r|25-2','25','holdon']]);
const vis=`const q=s=>document.querySelector(s),vis=e=>!!e&&!e.disabled&&e.offsetParent!==null&&!e.closest('[hidden]');`;
const ST=new Function(vis+`const R=__pbq.RUN,cur=R.cur||{},S=__pbq.S;return{next:vis(q('#next')),hi5:vis(q('#hi5')),holdon:vis(q('#holdon')),
  cards:[...document.querySelectorAll('#acts .card')].filter(vis).length,kind:cur.kind||null,id:cur.id||null,ans:cur.answer,
  sd:[...document.querySelectorAll('#acts > .sheet .line')].filter(vis).length,mission:!!q('#acts .mission'),
  res:vis(q('#toMap'))&&!q('#panel').hidden,ring:!!(S.ring&&S.ring.run&&S.ring.a>.95),wipe:q('#wipe').className,
  opts:[...document.querySelectorAll('#acts .opt')].filter(vis).length,gend:vis(q('#gMemory'))||vis(q('#rematch')),hand:!!(S.hand&&S.hand.a>.9),vo:(typeof VO!=='undefined'&&VO.cur)?VO.cur.who:null};`);
const st=C=>C.eval(ST);
async function waitFor(C,pred,max=40){for(let i=0;i<max*V.FPS/3;i++){const s=await st(C);if(pred(s))return s;await C.step(3);}console.log('  waitFor timed out',String(pred));return st(C);}
async function next(C){await waitFor(C,s=>s.next);await C.tap('#next');await C.step(2);}
// one right mission move (sort: drag the first item to its bin; other types: tap-tap like drive.js)
async function missionMove(C,drag){const a=await C.eval(()=>{const m=__pbq.RUN.cur,root=document.querySelector('#acts .mission');if(!root)return null;
    const it=[...root.querySelectorAll('[data-item]')].find(x=>!x.disabled);if(!it)return null;const i=+it.dataset.item;
    const right=m.type==='sort'?m.items[i].bin:m.type==='fairtest'?(m.vars[i].change?'c':'k'):String(i);return{from:'.mission [data-item="'+i+'"]',to:'.mission [data-drop="'+right+'"]'};});
  if(!a)return false;if(drag)await C.drag(a.from,a.to,{frames:34});else{await C.tap(a.from);await C.step(3);await C.tap(a.to);}await C.step(drag?20:6);return true;}
// play a level on, answering right, until pred(state) is true; nothing captured unless C.cap is on
async function playTo(C,pred,max=300){for(let n=0;n<max*20;n++){const s=await st(C);if(pred(s))return s;
    if(s.wipe==='in'){await C.step(3);continue;}
    if(s.hi5){await C.tap('#hi5');continue;}
    if(s.holdon){await C.tap('#holdon');await C.step(30);continue;}
    if(s.cards){await C.tap('#acts .card[data-i="'+s.ans+'"]');await C.step(6);continue;}
    if(s.sd&&s.kind==='showdown'){await C.tap('#acts > .sheet .line[data-i="'+s.ans+'"]');await C.step(6);continue;}
    if(s.mission&&await missionMove(C,false))continue;
    if(s.next){await C.tap('#next');await C.step(2);continue;}
    await C.step(3);}console.log('  playTo timed out');}
const T={
  async map(){const C=await V.open({...LAY,url:URL+'?map',pg:PG_MAP,out:`clips/${L}_map`});await C.run(.5);
    const top=await C.eval(()=>{const o=document.querySelector('#map');const t=o.scrollTop;o.scrollTop=0;return t;});
    console.log('  map target scroll',top);let k=0;const N=Math.round(4.2*V.FPS);
    C.onStep=async()=>{k++;if(k>45&&k<=45+N){const u=(k-45)/N,e=u<.5?4*u*u*u:1-Math.pow(-2*u+2,3)/2;await C.eval(y=>{document.querySelector('#map').scrollTop=y;},top*e);}};
    C.cap=true;await C.run(6.6);C.onStep=null;await C.close();},
  async title(){const C=await V.open({...LAY,url:URL,out:`clips/${L}_title`});await C.run(.3);C.cap=true;await C.run(9);await C.close();},
  async ep19(){const C=await V.open({...LAY,url:URL+'?ep=19',pg:PG_MAP,out:`clips/${L}_ep19`});
    C.cap=true;await C.run(3.2);C.cap=false;await waitFor(C,s=>s.next);await C.run(1);C.cap=true;await C.tap('#next');      // level card, intro
    await waitFor(C,s=>s.ring);await C.run(1.8);let s=await st(C);await C.tap('#acts .card[data-i="'+s.ans+'"]');               // lock-in: ring timer, tap
    await waitFor(C,s=>s.next);await C.run(1.2);C.cap=false;await C.tap('#next');
    await waitFor(C,s=>s.holdon);C.cap=true;await C.run(.4);                                                                   // HOLD ON! (Momo's wok)
    await waitFor(C,s=>s.vo==='momo');await waitFor(C,s=>s.vo!=='momo');await C.run(.4);await C.tap('#holdon');await waitFor(C,s=>s.cards);await C.run(1.4);s=await st(C);
    await C.tap('#acts .card[data-i="'+s.ans+'"]');await waitFor(C,s=>s.next);await C.run(.8);C.cap=false;await C.tap('#next');
    await playTo(C,s=>s.kind==='showdown');C.cap=true;await waitFor(C,s=>s.sd);await C.run(3.4);s=await st(C);                  // Showdown (Basil)
    await C.tap('#acts > .sheet .line[data-i="'+s.ans+'"]');await waitFor(C,s=>s.next);await C.run(1);C.cap=false;
    await playTo(C,s=>s.mission);await C.run(.2);C.cap=true;await C.run(2.4);for(let i=0;i<4;i++)await missionMove(C,true);  // mission: drag into bins
    await C.run(.6);C.cap=false;
    for(let i=0;i<40;i++){const n=await C.eval(()=>[...document.querySelectorAll('#acts .mission [data-item]')].filter(x=>!x.disabled).length);if(n<=1)break;
      const s2=await st(C);if(s2.next){await C.tap('#next');continue;}await missionMove(C,false);}
    C.cap=true;await missionMove(C,true);                                                                                       // last card, then the score hand
    await playTo(C,s=>s.hi5);await C.run(1.3);await C.tap('#hi5');await waitFor(C,s=>s.next);await C.run(.8);await C.tap('#next'); // HIGH FIVE
    await waitFor(C,s=>s.res);await C.run(5.5);await C.close();},                                                              // stars and the badge
  async ep05(){const C=await V.open({...LAY,url:URL+'?ep=05',pg:PG_MAP,out:`clips/${L}_ep05`});
    await playTo(C,s=>s.kind==='holdon');C.cap=true;await C.run(.3);await waitFor(C,s=>s.vo==='basil');await waitFor(C,s=>s.vo!=='basil');await C.run(.3);
    await C.tap('#holdon');await waitFor(C,s=>s.cards);await C.run(1.5);let s=await st(C);await C.tap('#acts .card[data-i="'+s.ans+'"]');
    await waitFor(C,s=>s.next);await C.run(1);await C.close();},
  async glitch(){const C=await V.open({...LAY,url:URL+'?map',pg:PG_GL,out:`clips/${L}_glitch`});await C.run(.5);
    await C.eval(()=>document.querySelector('#glitch5').scrollIntoView({block:'center'}));await C.run(.3);
    C.cap=true;await C.run(.8);await C.tap('#glitch5');await waitFor(C,s=>s.vo==='glitch',30);await C.run(1.2);C.cap=false;  // arrival; skip his hello
    for(let i=0;i<20;i++){const s=await waitFor(C,s=>s.opts||(s.next&&!s.vo),90);if(s.opts)break;await C.run(.5);if(i>=1)C.cap=true;await C.tap('#next');await C.step(2);}
    await C.run(1.6);await C.tap('#acts .opt[data-ok="1"]');await waitFor(C,s=>s.next);await C.run(1.5);C.cap=false;
    let lastQ=false;
    for(let i=0;i<14;i++){const s=await waitFor(C,s=>s.opts||s.next||s.gend,90);if(s.gend)break;
      if(s.opts){lastQ=await C.eval(()=>{const em=document.querySelector('#qq em');const m=em&&em.textContent.match(/Q(\d) of (\d)/);return!!m&&m[1]===m[2];});
        await C.tap('#acts .opt[data-ok="1"]');continue;}
      if(lastQ){C.cap=true;await waitFor(C,s=>!s.vo,30);await C.run(.7);}await C.tap('#next');await C.step(2);}
    await waitFor(C,s=>s.gend,60);await C.run(2);await C.close();},
  // the end card: the game's own title scene (the buddies and GLITCH, live), with the promo's end words in the panel
  async end(){const C=await V.open({...LAY,url:URL,out:`clips/${L}_end`});await C.run(.3);
    await C.eval(port=>{GEN++;closeOverlays();const st=document.createElement('style');st.textContent=`
      #title p{display:none}#title .ep{font-size:${port?17:18}px}
      #inner{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:${port?14:12}px;padding:${port?'18px 14px 26px':'16px 20px 22px'}}
      .ec-now{font:700 ${port?33:46}px Fredoka;color:#fff;background:var(--coral);border:4px solid var(--ink);border-radius:22px;padding:6px 26px 8px;box-shadow:0 7px 0 var(--ink);white-space:nowrap;animation:ecpop .5s cubic-bezier(.3,1.7,.5,1) both}
      .ec-now b{color:var(--sun)}
      .ec-sub{font:600 ${port?17:24}px Fredoka;color:#fff;text-align:center;white-space:nowrap;animation:ecpop .5s .25s cubic-bezier(.3,1.7,.5,1) both}
      .ec-sub span{color:var(--sun)}
      @keyframes ecpop{from{transform:scale(.4);opacity:0}to{transform:none;opacity:1}}`;document.head.append(st);
      document.querySelector('#inner').innerHTML='<div class="ec-now">Now in <b>TheOneApp</b></div><div class="ec-sub"><span>All 28</span> Primary 3 episodes · <span>Fully voiced</span></div>';
      if(typeof fitPanel==='function')fitPanel();
      B.momo.set('cheer');B.basil.set('waving');B.pip.set('cheer');
      Object.assign(GL,{vis:true,expr:'smug',x:V.ww/2+160,light:'#7CF5E6'});tween(GL,{x:V.ww/2+(port?-46:-90)},1.1,E.out).then(()=>{GL.antV=10;GL.expr='happy';});},L==='phone');
    let k=0;C.onStep=async()=>{k++;if(k%50===10)await C.eval(i=>{const w=['momo','basil','pip'][i%3];B[w].jump(260+Math.random()*120);},k/50|0);};
    C.cap=true;await C.run(6);C.onStep=null;await C.close();},
};
(async()=>{for(const k of(WHICH.length?WHICH:Object.keys(T))){console.log(L,k);const t=Date.now();await T[k]();console.log('  done in',((Date.now()-t)/1000).toFixed(0),'s');}})();
