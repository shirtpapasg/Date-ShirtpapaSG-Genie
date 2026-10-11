const http=require("http"),fs=require("fs"),path=require("path");
http.createServer((q,r)=>{const f=path.join(__dirname,decodeURIComponent(q.url.split("?")[0]));if(!fs.existsSync(f)){r.writeHead(404);return r.end();}
const sz=fs.statSync(f).size,ct=f.endsWith(".html")?"text/html":"video/webm",m=/bytes=(\d*)-(\d*)/.exec(q.headers.range||"");
if(m){const s=+m[1]||0,e=m[2]?+m[2]:sz-1;r.writeHead(206,{"Content-Range":`bytes ${s}-${e}/${sz}`,"Accept-Ranges":"bytes","Content-Length":e-s+1,"Content-Type":ct});fs.createReadStream(f,{start:s,end:e}).pipe(r);}
else{r.writeHead(200,{"Accept-Ranges":"bytes","Content-Length":sz,"Content-Type":ct});fs.createReadStream(f).pipe(r);}}).listen(8772);
