import re,sys
def norm(s):
    s=s.replace('\\','').replace('**','').replace('*','')
    for a,b in [('“','"'),('”','"'),('‘',"'"),('’',"'"),('–','-'),('—','-')]:
        s=s.replace(a,b)
    return re.sub(r'\s+',' ',s).strip()
B=norm(open(sys.argv[1]).read())
doc=open(sys.argv[2]).read()
qs=re.findall(r'«([^»]+)»',doc); bad=0
for q in sorted(set(qs)):
    if norm(q) not in B: bad+=1; print('NOT IN MONOGRAPH:',q)
print(len(set(qs)),'monograph quotes,',bad,'not found')
