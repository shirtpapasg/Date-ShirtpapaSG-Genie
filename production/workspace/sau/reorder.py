"""reorder.py: the teacher's running order (19 Nov 2026). After "Today you'll learn" (welcome) comes "Are you ready? Three, two, one,
go!" (scene countdown), then the first-person journey (the silent segments that followed the news), then the news, then the rest.
    python3 reorder.py epNN/epNN_segments.json      (safe to run twice)"""
import json, sys
p = sys.argv[1]; d = json.load(open(p)); S = d['segments']
if any(s['id'] == 'ready' for s in S): print(p, 'already reordered'); sys.exit()
ids = [s['id'] for s in S]
w = ids.index('welcome')
n = ids.index('news') if 'news' in ids else ids.index('today')        # EP02 Part 1's "news" is the 93-out-of-100 scene
h = n + 1
while h < len(S) and S[h].get('silent'): h += 1
hero = S[n + 1:h]; between = S[w + 1:n + 1]                             # e.g. EP02 Part 2's history comes with its news
ready = {"id": "ready", "scene": "countdown", "excited": True, "text": "Are you ready? Three, two, one, go!"}
d['segments'] = S[:w + 1] + [ready] + hero + between + S[h:]
json.dump(d, open(p, 'w'), indent=1, ensure_ascii=False)
print(p, 'hero', [s['scene'] for s in hero][:3], '... then', [s['scene'] for s in between])
