import json, sys
d = json.load(open(sys.argv[1]))
out = []
ch = None
for x in d:
    if x["chapterNo"] != ch:
        ch = x["chapterNo"]
        out.append(f"\n### Chapter {ch}: {x['topic']} ({x['theme']})\n")
    live = "**LIVE for pupils**" if x["visibleToPupils"] else "In review (admin/adult mode only)"
    out.append(f"#### {x['code']} {x['title']}  ·  {live}")
    out.append(f"- Folder: `{x['folder']}` · list line: \"{x['listLine']}\" · bench: **{x['bench']['name']}** (\"{x['bench']['subtitle']}\"), intro button \"{x['bench']['introButton']}\"")
    out.append(f"- Spoken: \"{x['narration']}\"  ·  card line: `{x['labcard']['line']}`")
    out.append(f"- Big idea (app): {x['bigIdea']}")
    for p in x["parts"]:
        out.append(f"- **{p['label']}** (bench pill \"{p['benchPill']}\"). Predict: \"{p['predictQ']}\" ({p['predictAnswer'].rstrip('.')}). Does: {p['does']} Takeaway: {p['takeaway']}")
    if x["safety"]:
        out.append(f"- Safety line: {' '.join(x['safety'])}")
    for c in x["scriptCautions"]:
        out.append(f"- Script check: {c}")
    out.append("")
print("\n".join(out))
