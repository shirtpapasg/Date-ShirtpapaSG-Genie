import re,sys
S=sys.argv[1]
prev=set(open(sys.argv[2],encoding='utf8').read().split('\n'))
for n in range(1,23):
    h=open(f'{S}/ep{n}/ep{n}b.html',encoding='utf8').read()
    i=h.find('S.')  # scene code region roughly
    h=re.sub(r'data:[^"\')]{200,}','',h)
    strs=re.findall(r'"((?:[^"\\\n]|\\.){2,300})"',h)
    out=[]
    seen=set()
    for s in strs:
        if s in prev or s in seen: continue
        seen.add(s)
        if not re.search(r'[A-Za-z]{2,}',s): continue
        if re.search(r'[{;]|^#|^(text-anchor|middle|start|end|none|round|bold|font|fill|stroke|g|rect|path|line|circle|ellipse|text|tspan|polygon|defs|use|image|href|opacity|transform|width|height|class|id|style|filter|mask|url|span|div|svg)$|^[a-z][A-Za-z-]*$|px|\(|^\w+#\d',s): continue
        out.append(s)
    print(f'==== EP{n}: '+' | '.join(out))
