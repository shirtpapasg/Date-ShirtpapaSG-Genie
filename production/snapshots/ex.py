import re,sys
S=sys.argv[1]
for n in range(1,23):
    h=open(f'{S}/ep{n}/ep{n}b.html',encoding='utf8').read()
    # drop base64/fonts
    h=re.sub(r'data:[^"\')]{200,}','',h)
    strs=re.findall(r'"((?:[^"\\\n]|\\.){2,300})"|\'((?:[^\'\\\n]|\\.){2,300})\'|`([^`]{2,400})`',h)
    seen=set();out=[]
    for a,b,c in strs:
        s=a or b or c
        if s in seen: continue
        seen.add(s)
        if not re.search(r'[A-Za-z]{3,}.*\s.*[A-Za-z]{2,}|[A-Z][a-z]{3,}',s): continue
        if re.search(r'^(#|rgb|translate|scale|M\d|http|px)|\{|;|=>|function|var\(|font-|stroke|fill:|px |\.mp|\.png|\.wav|position|display',s): continue
        out.append(s)
    print(f'==== EP{n}'); print('\n'.join(out))
