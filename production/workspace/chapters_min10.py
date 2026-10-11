import re, json, glob, os
S = os.path.dirname(os.path.abspath(__file__))
def fix(block, n):
    END = json.load(open(f"{S}/ep{n}/tl.json"))["END"]
    lines = block.split("\n"); idx = [i for i, L in enumerate(lines) if re.match(r"^\d+:\d\d ", L)]
    tm = lambda L: int(L.split(":")[0]) * 60 + int(L.split(":")[1][:2])
    drop = set()
    while True:
        live = [i for i in idx if i not in drop]; bad = None
        for j, i in enumerate(live):
            nxt = tm(lines[live[j + 1]]) if j + 1 < len(live) else END
            if nxt - tm(lines[i]) < 10: bad = (j, i); break
        if not bad: break
        j, i = bad
        drop.add(live[1] if j == 0 else i)   # short opener absorbs the next chapter; others merge into the one before
    return "\n".join(L for i, L in enumerate(lines) if i not in drop), [lines[i] for i in sorted(drop)]
for p in [f"{S}/p4/YOUTUBE_UPLOAD_KIT.md"] + sorted(glob.glob(f"{S}/p4/kit_ep*.md")):
    parts = re.split(r"(?=## EPISODE \d+)", open(p).read())
    for k, part in enumerate(parts):
        m = re.match(r"## EPISODE (\d+)", part)
        if m:
            parts[k], d = fix(part, int(m.group(1)))
            if d and p.endswith("KIT.md"): print(m.group(1), "merged:", d)
    open(p, "w").write("".join(parts))
