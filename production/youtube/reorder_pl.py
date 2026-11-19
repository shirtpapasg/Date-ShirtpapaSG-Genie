exec(open(__import__('os').path.join(__import__('os').path.dirname(__import__('os').path.abspath(__file__)),'yt.py')).read())
import time
done=json.load(open(HERE+'/sau_uploaded.json')); pl=done['_playlist']
def items():
    out=[];tok=None
    while True:
        p={"part":"snippet,status","playlistId":pl,"maxResults":50}
        if tok:p["pageToken"]=tok
        r=call("GET",f"{API}/playlistItems",p); out+=r.get('items',[]); tok=r.get('nextPageToken')
        if not tok: return out
# 4. reorder: each episode followed by its Shorts
order=['sau-trailer','sau-ep01','sau-ep01-s1','sau-ep01-s2','sau-ep02','sau-ep02b','sau-ep02-s1','sau-ep02-s2','sau-ep03','sau-ep03-s1','sau-ep03-s2','sau-ep03b','sau-ep03b-s1','sau-ep03b-s2','sau-ep04','sau-ep04-s1','sau-ep04-s2','sau-ep05','sau-ep05-s1','sau-ep05-s2','sau-ep06','sau-ep06-s1','sau-ep06-s2','sau-ep07','sau-ep07-s1','sau-ep07-s2','sau-ep08','sau-ep09','sau-ep10','sau-ep10-s1','sau-ep10-s2']
want=[done[k]['videoId'] for k in order]
cur=items(); byvid={i['snippet']['resourceId']['videoId']:i for i in cur}
print("in playlist",len(cur),"wanted",len(want),"missing",[k for k in order if done[k]['videoId'] not in byvid])
curorder=[i['snippet']['resourceId']['videoId'] for i in sorted(cur,key=lambda i:i['snippet']['position'])]
for pos,vid in enumerate(want):
    if curorder.index(vid)==pos: continue
    it=byvid[vid]
    r=call("PUT",f"{API}/playlistItems",{"part":"snippet"},{"id":it['id'],"snippet":{"playlistId":pl,"position":pos,"resourceId":it['snippet']['resourceId']}})
    if 'ERROR' in r: print("move fail",vid,r); break
    curorder.remove(vid); curorder.insert(pos,vid); time.sleep(.4)
final=[i['snippet']['resourceId']['videoId'] for i in sorted(items(),key=lambda i:i['snippet']['position'])]
print("ORDER OK" if final==want else ("ORDER DIFF",final))
