"""Shift YouTube chapters to the new timelines and apply kit wording fixes."""
import json, os, re, glob, shutil
S = os.path.dirname(os.path.abspath(__file__))
KITFIX = [("plus the exam trap about roots that catches lots of students", "plus an exam tip about roots that many students mix up"),
          ("Exam trap: do roots take in food?", "Exam tip: do roots take in food?"),
          ("5 Plants That Cheat | P4 Science Plant System", "5 Plants With Superpowers | P4 Science Plant System"),
          ("0:09 Plants that cheat", "0:09 Plants with superpowers"),
          ("Exam trap: eyes don't send out light", "Exam tip: eyes don't send out light"),
          ("P4 Science, Explained", "TheOneApp, Explained")]   # series renamed 10 Oct 2026

def mapper(n):
    old = json.load(open(f"{S}/bak_v1/ep{n}/tl.json"))["segs"]; new = {s["id"]: s for s in json.load(open(f"{S}/ep{n}/tl.json"))["segs"]}
    def f(t):
        if t == 0: return 0
        o = max((s for s in old if s["t0"] - 1.0 <= t), key=lambda s: s["t0"])
        return max(0, new[o["id"]]["t0"] + (t - o["t0"]))
    w = new["welcome"]["t0"]
    return f, w

def fmt(t): t = int(t); return f"{t // 60}:{t % 60:02d}"

def fix_block(block, n):
    f, w = mapper(n); lines = block.split("\n"); out = []; added = False
    for L in lines:
        m = re.match(r"^(\d+):(\d\d) (.*)$", L)
        if m:
            t = int(m.group(1)) * 60 + int(m.group(2))
            if t > 0 and not added: out.append(f"{fmt(w)} Welcome! What you'll learn today"); added = True
            if "What you'll learn today" in m.group(3): continue
            out.append(f"{fmt(f(t + .5))} {m.group(3)}")
        else: out.append(L)
    return "\n".join(out)

def fix_file(p, single=None):
    bak = f"{S}/bak_v1/kit/{os.path.basename(p)}"; os.makedirs(os.path.dirname(bak), exist_ok=True)
    if not os.path.exists(bak): shutil.copy(p, bak)
    k = open(bak).read()
    for a, b in KITFIX: k = k.replace(a, b)
    parts = re.split(r"(?=## EPISODE \d+)", k)
    for i, part in enumerate(parts):
        m = re.match(r"## EPISODE (\d+)", part)
        if m: parts[i] = fix_block(part, int(m.group(1)))
    open(p, "w").write("".join(parts))

fix_file(f"{S}/p4/YOUTUBE_UPLOAD_KIT.md")
for p in sorted(glob.glob(f"{S}/p4/kit_ep*.md")): fix_file(p)
print(open(f"{S}/p4/kit_ep14.md").read().split("0:00")[1][:400])
