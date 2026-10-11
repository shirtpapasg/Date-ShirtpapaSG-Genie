import json,re,glob,sys
R=sys.argv[1]
labs={r['code']:r for r in json.load(open(R+'/plan/labs_p3.json'))}
plan=open(R+'/plan/00_series_plan.md').read()
rows={}
for line in plan.splitlines():
    m=re.match(r'\| (\d+) \|',line)
    if m:
        cells=[c.strip() for c in line.strip().strip('|').split('|')]
        rows[int(m.group(1))]=cells
chap={'Living & Non-Living','Diversity of Materials','Life Cycles','Magnets'}
spoken={'Living and Non-Living','Diversity of Materials','Life Cycles','Magnets'}
for f in sorted(glob.glob(R+'/plan/briefs/ep*.md')):
    n=int(re.search(r'ep(\d+)',f).group(1)); t=open(f).read()
    cfgs=re.findall(r'\{"seg":"lab".*?\}',t)
    for c in cfgs:
        d=json.loads(c); L=labs.get(d['code'])
        if not L: print(n,'NO LAB CODE',d['code']); continue
        if L['title']!=d['title']: print(n,'TITLE MISMATCH',repr(d['title']),'vs',repr(L['title']))
        if d['part'] not in [p['label'] for p in L['parts']]: print(n,'PART MISMATCH',d['part'])
        # spoken code
        segline=[l for l in t.splitlines() if l.startswith('| lab |')]
        if segline and L['spokenCode'] not in segline[0]: print(n,'SPOKEN CODE MISSING',L['spokenCode'])
        if segline and "Open the School Lab, experiment %s, and press, Let's test it now!"%L['spokenCode'] not in segline[0]: print(n,'SPOKEN LINE DIFFERS')
        if segline and 'try' not in segline[0].lower(): print(n,'no try cue')
        # header
        hdr=t.splitlines()[2]
        mh=re.search(r'\*\*School Lab:\*\* ([^·]+?) · (Part \([a-c]\): [^·(]+)',hdr)
        if mh:
            hc=mh.group(1).strip(); hp=mh.group(2).strip()
            if hc!=f"{d['code']} {d['title']}": print(n,'HEADER code/title',repr(hc))
            if hp!=d['part']: print(n,'HEADER part',repr(hp),'vs',d['part'])
        # plan row
        row=rows.get(n)
        if row:
            labcell=row[7]
            if f"{d['code']} {d['title']} · {d['part']}" not in labcell: print(n,'PLAN ROW LAB',repr(labcell))
    if not cfgs: print(n,'NO LAB CONFIG')
    mm=re.search(r'\*\*Mind Lab chapter:\*\* ([^·]+?) ·',t).group(1).strip()
    if mm not in chap: print(n,'BAD MIND LAB CHAPTER',mm)
    if rows.get(n) and rows[n][8]!=mm: print(n,'PLAN ROW MM',rows[n][8],'vs',mm)
    picks=re.findall(r'and pick ([A-Z][A-Za-z &-]+?)[.\"]',t)
    for p in picks:
        if p not in spoken: print(n,'BAD PICK',p)
    # consistency of picks with header
    exp={'Living & Non-Living':'Living and Non-Living'}.get(mm,mm)
    for p in picks:
        if p!=exp: print(n,'PICK != HEADER',p,mm)
    # habit2 save/tap
    h2=[l for l in t.splitlines() if l.startswith('| habit2 |')]
    if h2:
        s=h2[0]
        for w in ['Save it in TheOneApp, the ultimate science app. Tap Mind maps, then, Make my own mind map, and pick']:
            if w not in s: print(n,'habit2 line differs')
        if '| mindmap |' not in s: print(n,'habit2 not in mindmap scene')
    print(n,'OK-checked', [json.loads(c)['code'] for c in cfgs], mm, picks)
