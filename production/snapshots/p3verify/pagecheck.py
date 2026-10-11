import re,sys
def norm(s):
    s=s.replace('\\','').replace('**','').replace('*','')
    for a,b in [('“','"'),('”','"'),('‘',"'"),('’',"'"),('–','-'),('—','-'),('‑','-')]:
        s=s.replace(a,b)
    s=s.replace('[sic] ','').replace(' [sic]','')
    return re.sub(r'\s+',' ',s).strip()
pages={}; cur=None; buf=[]
for line in open(sys.argv[1]):
    m=re.search(r'\(book (-?\d+)\)',line)
    if m:
        if cur is not None: pages[cur]=norm(' '.join(buf))
        cur=int(m.group(1)); buf=[]; continue
    buf.append(line)
pages[cur]=norm(' '.join(buf))
doc=open(sys.argv[2]).read().split('\n')
for ln in doc:
    if not ln.startswith('| ') or ln.startswith('| #') or ln.startswith('|---'): continue
    cells=[c.strip() for c in ln.strip('|').split(' | ')]
    if len(cells)<5: continue
    rid=cells[0]; pg=cells[4] if len(cells)>4 else ''
    qs=re.findall(r'"([^"]+)"',cells[2])
    if not qs: continue
    found=set()
    for q in qs:
        qn=norm(q)
        hit=[p for p,t in pages.items() if qn in t]
        if not hit:
            # may cross a page boundary
            hit=['X']
        found.update(hit)
    if pg.isdigit() and int(pg) not in found:
        print(rid, 'page col', pg, 'found on', sorted(found, key=str))
