import re,sys
src,dst=sys.argv[1],sys.argv[2]
out=[]
for line in open(src,encoding='utf-8'):
    s=line.rstrip('\n').strip()
    if not s: continue
    if s in ('|  |','| :-: |','-----'): continue
    m=re.match(r'\| \[\*\*Page (\d+)\*\*\]\(\) \|',s)
    if m: out.append('=== PDF p.%s ==='%m.group(1)); continue
    if 'For Teachers’ Use Only' in s: continue
    out.append(s)
open(dst,'w',encoding='utf-8').write('\n'.join(out)+'\n')
