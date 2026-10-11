import json, os, sys
S = sys.argv[1]
def ch(ep, names):
    t = json.load(open(f'{S}/{ep}/tl.json')); out = []; seen = set()
    for s in t['segs']:
        if s['id'] in names and names[s['id']] not in seen:
            x = int(max(0, s['t0'] - 0.4)) if out else 0; out.append(f"{x//60}:{x%60:02d} {names[s['id']]}"); seen.add(names[s['id']])
    return "\n".join(out)
eps = json.load(open(f'{S}/kit_eps.json'))
B = "`" * 3
out = []
for e in eps:
    out.append(f"""
---

## {e['h']}

**File:** `{e['f']}` · **Thumbnail:** `{e['th']}`

**Title:**
{B}
{e['title']}
{B}
**Thumbnail words:** {e['tw']}

**Description:**
{B}
{e['first']}

🚀 Revise with mind maps in TheOneApp, the ultimate science app: https://theoneapp-ten.vercel.app

{ch(e['ep'], e['names'])}

Follows the MOE Primary Science Syllabus 2023 and links to NGSS 4-LS1-1.
Narration: computer-generated voice. Animation: original.

#science #primary4 #scienceforkids
{B}

**Tags:**
{B}
{e['tags']}
{B}
""")
p = f'{S}/p4/YOUTUBE_UPLOAD_KIT.md'; s = open(p).read()
s = s.replace("(Episodes 1–2)", "(Episodes 1–5)")
a = s.find("\n---\n\n## EPISODE 3"); b = s.index("## Uploading (about 3 minutes per video)")
if a != -1: s = s[:a] + "\n" + s[b:]
b = s.index("## Uploading (about 3 minutes per video)")
s = s[:b] + "".join(out).lstrip("\n") + "\n---\n\n" + s[b:]
open(p, 'w').write(s); print("ok")
