import json, os, sys
S = "/tmp/claude-0/-home-user-Date-ShirtpapaSG-Genie/8764a423-5385-5445-b38a-c2c2633ecdb7/scratchpad"
def add(n, pairs):
    h = open(f"{S}/ep{n}/ep{n}.html").read()
    for p in pairs:
        c = p[2] if len(p) > 2 else 1
        assert h.count(p[0]) == c, ("count", h.count(p[0]), p[0][:100])
    fp = f"{S}/fixes/ep{n}.json"
    L = json.load(open(fp)) if os.path.exists(fp) else []
    L += [list(p) for p in pairs]
    tmp = fp + ".tmp"; json.dump(L, open(tmp, "w"), indent=1, ensure_ascii=False); os.replace(tmp, fp)
    print("appended", len(pairs), "->", len(L))
