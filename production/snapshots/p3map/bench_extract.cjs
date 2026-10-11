const fs=require('fs'),path=require('path');
const dir=process.argv[2];const out={};
for(const f of fs.readdirSync(dir).sort()){
  const h=fs.readFileSync(path.join(dir,f),'utf8');
  const i=h.indexOf('const LAB = {'); if(i<0){out[f]={err:'no LAB'};continue;}
  // brace match
  let j=h.indexOf('{',i),d=0,k=j;for(;k<h.length;k++){const c=h[k];if(c==='{')d++;else if(c==='}'){d--;if(d===0)break;}}
  const s=h.slice(j,k+1);
  const g=(re)=>{const m=s.match(re);return m?m[1]:null};
  const parts=[];const re=/id: '([a-z0-9]+)', label: '((?:[^'\\]|\\.)*)', title: '((?:[^'\\]|\\.)*)'/g;let m;
  while((m=re.exec(s)))parts.push({step:m[1],pill:m[2].replace(/\\'/g,"'"),title:m[3].replace(/\\'/g,"'")});
  out[f]={code:g(/code: '([^']+)'/),name:g(/name: '((?:[^'\\]|\\.)*)'/),sub:g(/sub: '((?:[^'\\]|\\.)*)'/),button:g(/button: '((?:[^'\\]|\\.)*)'/),parts};
  // also title tag
  const t=h.match(/<title>([^<]*)<\/title>/);out[f].htmlTitle=t?t[1]:null;
}
console.log(JSON.stringify(out,null,1));
