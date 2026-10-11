const fs=require('fs'),path=require('path');const dir=process.argv[2];const out={};
function grab(h,key){const i=h.indexOf('  '+key+': [');if(i<0)return null;let j=h.indexOf('[',i),d=0,k=j,q=null;for(;k<h.length;k++){const c=h[k];if(q){if(c==='\\'){k++;continue}if(c===q)q=null;continue}if(c==="'"||c==='"'||c==='`'){q=c;continue}if(c==='[')d++;else if(c===']'){d--;if(d===0)break;}}return h.slice(j,k+1)}
for(const f of fs.readdirSync(dir).sort()){const h=fs.readFileSync(path.join(dir,f),'utf8');const s=grab(h,'quiz');let quiz=null;try{quiz=new Function('return '+s)()}catch(e){quiz='ERR '+e.message}
out[f.replace('.html','')]=quiz}
console.log(JSON.stringify(out,null,1));
