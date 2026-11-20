"""explained_upload.py: put one TheOneApp, Explained episode (all its parts) on YouTube, live, in one go.

The teacher (2026-11-20): "Upload into YouTube and make it live automatically. I trust the system."

    python3 explained_upload.py <episode.json>          upload what is missing, then tidy the playlists (safe to re-run)
    python3 explained_upload.py <episode.json> --check  show what would happen, change nothing

episode.json:
{
  "key": "explained-p3-ep03",
  "parts": [
    {"key": "explained-p3-ep03-part1", "file": "/abs/ep03_part1.mp4", "thumb": "/abs/thumb_part1.jpg",
     "title": "...", "description": "...", "tags": ["..."]},
    ...
  ],
  "playlists": [{"id": "PLb8LpPqxQI4E", "after": "3KyRNndmUU8"}, {"id": "PLPfEuT7l4KjI", "after": "3KyRNndmUU8"}],
  "replaces": ["-xdqLxDUUgI"],          old videos this episode replaces (optional)
  "retire_old": true                    take the old ones out of these playlists and point them to the new parts
}

Rules kept here (SERIES_FORMAT.md section 10):
- Made for Kids, public, category Education, English.
- Parts go into each playlist right after `after`, in order.
- An old video is NEVER deleted and never made private or unlisted: its views count towards monetising the channel.
  With retire_old it leaves the playlists and its description gets a first line pointing to the new episode.
- IDs are kept in explained_uploaded.json (gitignored), so a re-run skips what is done. A quota error stops the run
  cleanly; run it again after the daily reset (08:00 UTC) to finish.
"""
import json, os, sys, time, urllib.request, urllib.error
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from yt import call, API, UP

HERE = os.path.dirname(os.path.abspath(__file__))
DONE_F = os.path.join(HERE, 'explained_uploaded.json')
cfg = json.load(open(sys.argv[1])); CHECK = '--check' in sys.argv
done = json.load(open(DONE_F)) if os.path.exists(DONE_F) else {}
def save(): json.dump(done, open(DONE_F, 'w'), indent=1)
def stop_if_error(r, what):
    if isinstance(r, dict) and 'ERROR' in r:
        print(f"STOPPED at {what}: HTTP {r['ERROR']} {r.get('body', '')}")
        if 'quota' in r.get('body', ''): print("Daily quota used up: run this again after 08:00 UTC.")
        sys.exit(1)
    return r

def upload(p):
    meta = {"snippet": {"title": p['title'][:100], "description": p['description'], "tags": p.get('tags', []), "categoryId": "27",
                        "defaultLanguage": "en", "defaultAudioLanguage": "en"},
            "status": {"privacyStatus": "public", "selfDeclaredMadeForKids": True, "embeddable": True}}
    q = {"uploadType": "resumable", "part": "snippet,status"}
    req = urllib.request.Request(f"{UP}/videos?" + urllib.parse.urlencode(q), data=json.dumps(meta).encode(), method="POST",
                                 headers={"Authorization": "Bearer " + __import__('yt').TOK, "Content-Type": "application/json",
                                          "X-Upload-Content-Type": "video/mp4"})
    try: loc = urllib.request.urlopen(req).headers['Location']
    except urllib.error.HTTPError as e: stop_if_error({"ERROR": e.code, "body": e.read()[:300].decode('utf8', 'ignore')}, "upload start")
    r = stop_if_error(call("PUT", loc, raw=open(p['file'], 'rb').read(), ctype="video/mp4"), "upload")
    return r['id']

import urllib.parse
# 1. upload the parts
for p in cfg['parts']:
    if p['key'] in done: print("already up:", p['key'], done[p['key']]['videoId']); continue
    if CHECK: print("would upload:", p['key'], p['title']); continue
    vid = upload(p)
    done[p['key']] = {"videoId": vid, "url": f"https://www.youtube.com/watch?v={vid}", "title": p['title'],
                      "uploaded": time.strftime('%Y-%m-%dT%H:%M:%SZ', time.gmtime())}; save()
    print("uploaded:", p['key'], vid)
    if p.get('thumb'):
        stop_if_error(call("POST", f"{UP}/thumbnails/set", {"videoId": vid, "uploadType": "media"},
                           raw=open(p['thumb'], 'rb').read(), ctype="image/jpeg"), "thumbnail")
        done[p['key']]['thumb'] = True; save(); print("  thumbnail set")
if CHECK: sys.exit(0)
ids = [done[p['key']]['videoId'] for p in cfg['parts']]

def items(pl):
    out, tok = [], None
    while True:
        q = {"part": "snippet,contentDetails", "playlistId": pl, "maxResults": 50}
        if tok: q['pageToken'] = tok
        r = stop_if_error(call("GET", f"{API}/playlistItems", q), "playlist read"); out += r.get('items', []); tok = r.get('nextPageToken')
        if not tok: return out

# 2. playlists: parts right after `after`, in order; old videos out (retire_old)
for pl in cfg.get('playlists', []):
    its = items(pl['id']); have = [i['contentDetails']['videoId'] for i in its]
    anchor = pl.get('after')
    pos = (have.index(anchor) + 1) if anchor in have else len(have)
    for vid in ids:
        if vid in have: pos = have.index(vid) + 1; continue
        stop_if_error(call("POST", f"{API}/playlistItems", {"part": "snippet"},
                           {"snippet": {"playlistId": pl['id'], "position": pos, "resourceId": {"kind": "youtube#video", "videoId": vid}}}),
                      "playlist insert"); print("  playlist", pl['id'], "<-", vid, "at", pos); have.insert(pos, vid); pos += 1
    if cfg.get('retire_old'):
        for it in items(pl['id']):
            if it['contentDetails']['videoId'] in cfg.get('replaces', []):
                stop_if_error(call("DELETE", f"{API}/playlistItems", {"id": it['id']}), "playlist remove")
                print("  playlist", pl['id'], "removed old", it['contentDetails']['videoId'])

# 3. point each old video to the new parts (first line of its description); it stays public
if cfg.get('retire_old'):
    first = f"▶ NEW VERSION: {cfg['parts'][0]['title'].split(' | ')[0]} https://www.youtube.com/watch?v={ids[0]}"
    for old in cfg.get('replaces', []):
        r = stop_if_error(call("GET", f"{API}/videos", {"part": "snippet", "id": old}), "old read")
        if not r.get('items'): continue
        sn = r['items'][0]['snippet']
        if sn['description'].startswith("▶ NEW VERSION"): continue
        body = {"id": old, "snippet": {k: sn[k] for k in ('title', 'categoryId', 'tags', 'defaultLanguage') if k in sn}}
        body['snippet']['description'] = first + "\n\n" + sn['description']
        stop_if_error(call("PUT", f"{API}/videos", {"part": "snippet"}, body), "old description"); print("  old", old, "now points to", ids[0])
print("DONE", cfg['key'], ids)
