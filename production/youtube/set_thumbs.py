"""set_thumbs.py: set thumbnails from production/thumbs_v3 on the YouTube videos linked in TheOneApp's videos.js.
    python3 set_thumbs.py P3_EP00 P6_EP01 ...      (names of JPGs in thumbs_v3, without .jpg)
"""
import json, os, re, sys, time, urllib.request, urllib.parse, urllib.error
HERE = os.path.dirname(os.path.abspath(__file__)); TH = os.path.join(HERE, '../thumbs_v3')
CLIENT = "780560926873-2jum0brhcjavtrm6f3ksab5tdk3fv0et.apps.googleusercontent.com"; TF = os.path.join(HERE, '.yt_token.json')
t = json.load(open(TF)); b = urllib.parse.urlencode({"client_id": CLIENT, "refresh_token": t['refresh_token'], "grant_type": "refresh_token"}).encode()
tok = json.load(urllib.request.urlopen(urllib.request.Request("https://oauth2.googleapis.com/token", data=b)))['access_token']; t['access_token'] = tok; json.dump(t, open(TF, 'w'))
src = open(os.environ.get('VIDEOS_JS', '/home/user/theoneapp/videos.js')).read(); ids = {}
for lv in ['P3', 'P4', 'P5', 'P6']:
    i = src.index(f"level: '{lv}'"); j = src.find("level: 'P", i + 10); j = j if j > 0 else len(src)
    for m in re.finditer(r"\{ no: '?([0-9]+[AB]?)'?,.*?url: 'https://www\.youtube\.com/watch\?v=([A-Za-z0-9_-]{11})'", src[i:j]):
        n = m.group(1); ids[f"{lv}_EP{n.zfill(3) if n[-1] in 'AB' else n.zfill(2)}"] = m.group(2)
ok, bad = [], []
for name in sys.argv[1:]:
    vid = ids.get(name)
    if not vid: bad.append((name, 'no video id')); continue
    r = urllib.request.Request(f"https://www.googleapis.com/upload/youtube/v3/thumbnails/set?videoId={vid}&uploadType=media", data=open(f"{TH}/{name}.jpg", 'rb').read(),
                               headers={"Authorization": "Bearer " + tok, "Content-Type": "image/jpeg"}, method="POST")
    try: urllib.request.urlopen(r); ok.append(name)
    except urllib.error.HTTPError as e: bad.append((name, e.code, e.read()[:150]))
    time.sleep(.5)
print("set", len(ok), ok); print("failed", bad)
