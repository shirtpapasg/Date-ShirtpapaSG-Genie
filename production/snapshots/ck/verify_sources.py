import json, re, sys
W='/tmp/claude-0/-home-user/8764a423-5385-5445-b38a-c2c2633ecdb7/scratchpad'
S='/tmp/claude-0/-home-user-Date-ShirtpapaSG-Genie/8764a423-5385-5445-b38a-c2c2633ecdb7/scratchpad'
sys.path.insert(0, W)
B=json.load(open(W+'/kwbank_draft.json'))
EMO = re.compile('[\U0001F000-\U0001FAFF☀-⛿✀-✒✔✖-❖❘-➿️‍⬀-⯿]')
def norm(s):
    s=s.lower()
    for a in ['➜','→','->','=>','➡','⟶','⇒']: s=s.replace(a,' to ')
    s=''.join(c for c in s if c in '✓✗≠' or not EMO.match(c))
    s=s.replace('&',' and ')
    s=re.sub(r"[^\w✓✗≠ ]+",' ',s)
    return ' '.join(s.split())
eps=json.load(open(W+'/mm/eps.json'))
known={}
for ch,c in B.items():
    if ch=='_meta': continue
    s=set()
    for v in c['video']+c['videoCentre']:
        s.add(norm(v['term'])); [s.add(norm(r)) for r in v['raw']]
    for e in c['extras']: s.add(norm(e['term']))
    for ep,l in c['habitLabelsSkipped'].items(): [s.add(norm(x)) for x in l]
    known[ch]=s
miss=0
for ep,m in eps.items():
    ch=m['ch']; labs=[m['c']]
    for b in m['b']: labs.append(b[0]); labs+=b[2]
    tl=json.load(open(f'{S}/ep{ep}/tl.json'))
    for k in tl.get('kws',[]): labs.append(k['label'])
    # scene strings
    html=open(f'{S}/ep{ep}/ep{ep}b.html',encoding='utf8').read()
    i=html.find('S.mindmap = '); j=html.find('\nS.',i+10); seg=html[i:j if j>0 else i+20000]
    for q in re.findall(r'"([^"]{2,60})"', seg):
        if re.search(r'[A-Z]{3}|[^\x00-\x7f]', q) and 'TheOneApp' not in q and 'url(' not in q and 'ultimate' not in q:
            labs.append(q)
    for l in labs:
        if norm(l) and norm(l) not in known[ch]:
            miss+=1; print('ep',ep,ch,'NOT IN BANK:',repr(l))
print('missing',miss)
