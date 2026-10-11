import re,sys
book=open(sys.argv[1],encoding='utf-8').read()
doc=open(sys.argv[2],encoding='utf-8').read()
def norm(s):
    s=s.replace('\\','').replace('**','').replace('*','')
    s=re.sub(r'=== PDF p\.\d+ ===',' ',s)
    for a,b in [('“','"'),('”','"'),('‘',"'"),('’',"'"),('–','-'),('—','-'),('‑','-')]:
        s=s.replace(a,b)
    s=s.replace('[sic] ','').replace(' [sic]','')
    s=re.sub(r'\s+',' ',s)
    return s.strip()
B=norm(book)
quotes=re.findall(r'"([^"]+)"',doc)
bad=0
for q in quotes:
    qn=norm(q)
    # allow a leading lowercase fragment: search case-sensitively
    if qn not in B:
        bad+=1; print('MISSING:',q)
print(len(quotes),'quotes checked,',bad,'missing')
