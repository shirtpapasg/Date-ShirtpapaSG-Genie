// sfx.js: renders the game's own synthesised sound effects (src/2audio.js, SFX.*) to sfx/<name>.wav, 48 kHz mono, with an
// OfflineAudioContext in the real page, for every effect logged in clips/*.json. Usage: node sfx.js
const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const need=new Map();
  for(const f of fs.readdirSync('clips').filter(f=>f.endsWith('.json'))){const d=JSON.parse(fs.readFileSync('clips/'+f));
    for(const e of d.log)if(e.ev==='sfx')need.set(e.k+(e.a.length?'_'+e.a.join('_'):''),[e.k,e.a]);}
  fs.mkdirSync('sfx',{recursive:true});const todo=[...need].filter(([n])=>!fs.existsSync('sfx/'+n+'.wav'));console.log(need.size,'effects,',todo.length,'to render');
  const b=await chromium.launch();const p=await b.newPage();await p.goto('http://localhost:8765/_test.html?map');await p.waitForTimeout(1500);
  for(const [name,[k,a]] of todo){
    const pcm=await p.evaluate(async([k,a])=>{const oc=new OfflineAudioContext(1,48000*3,48000),c0=AU.c,s0=AU.sfx;
      AU.c=oc;AU.sfx=oc.createGain();AU.sfx.connect(oc.destination);NB=null;try{SFX[k](...a);}finally{AU.c=c0;AU.sfx=s0;NB=null;}
      const d=(await oc.startRendering()).getChannelData(0);let n=d.length;while(n>1&&Math.abs(d[n-1])<2e-4)n--;
      const o=new Int16Array(n);for(let i=0;i<n;i++)o[i]=Math.max(-32767,Math.min(32767,Math.round(d[i]*32767)));
      let s='';const u=new Uint8Array(o.buffer);for(let i=0;i<u.length;i+=8192)s+=String.fromCharCode.apply(null,u.subarray(i,i+8192));return btoa(s);},[k,a]);
    const raw=Buffer.from(pcm,'base64'),h=Buffer.alloc(44);h.write('RIFF',0);h.writeUInt32LE(36+raw.length,4);h.write('WAVEfmt ',8);h.writeUInt32LE(16,16);
    h.writeUInt16LE(1,20);h.writeUInt16LE(1,22);h.writeUInt32LE(48000,24);h.writeUInt32LE(96000,28);h.writeUInt16LE(2,32);h.writeUInt16LE(16,34);h.write('data',36);h.writeUInt32LE(raw.length,40);
    fs.writeFileSync('sfx/'+name+'.wav',Buffer.concat([h,raw]));console.log(' ',name,(raw.length/96000).toFixed(2)+'s');}
  await b.close();})();
