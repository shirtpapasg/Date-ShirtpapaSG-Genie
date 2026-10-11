"""preview.py N: apply fixes/epN.json entries not yet in epN/epNb.html -> epN/preview.html (no audio work).
Reports, for each entry: applied / already-in / NOT FOUND."""
import json, sys, os
S = os.path.dirname(os.path.abspath(__file__)); n = int(sys.argv[1])
h = open(f"{S}/ep{n}/ep{n}b.html").read(); fx = json.load(open(f"{S}/fixes/ep{n}.json"))
for i, (a, b, *k) in enumerate(fx):
    c = h.count(a); want = k[0] if k else 1
    if b in h and (a in b or c == 0): print(i, "already in")
    elif c == want: h = h.replace(a, b); print(i, "applied")
    else: print(i, f"NOT FOUND (count {c}, expected {want}):", a[:80]); 
open(f"{S}/ep{n}/preview.html", "w").write(h); print("wrote", f"{S}/ep{n}/preview.html")
