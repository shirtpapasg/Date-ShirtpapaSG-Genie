import re,sys
S=sys.argv[1]
for n in range(1,23):
    try: src=open(f"{S}/ep{n}/ep{n}b.html",encoding='utf-8').read()
    except Exception as e: print(n,'ERR',e); continue
    i=src.find('S.mindmap = ')
    if i<0:
        print(n,'no S.mindmap'); continue
    j=src.find('s.run',i)
    blk=src[i:j]
    strs=re.findall(r'"([^"\n]{2,80})"',blk)
    skip=re.compile(r'^(#|url|M\d|mindmap$|line$|path$|g$|ellipse$|rect$|image$|middle$|none$|round$|clipPath|xMid|stroke|fill|font|text-anchor|scr\d+|oneapp|defs|v$|width|height|opacity|rx$|ry$|x$|y$|x1|y1|x2|y2|d$|href|preserve|id$|clip-path|r$|cx$|cy$|transform)')
    out=[s for s in strs if not skip.match(s)]
    print(f"EP{n}:", ' | '.join(out))
