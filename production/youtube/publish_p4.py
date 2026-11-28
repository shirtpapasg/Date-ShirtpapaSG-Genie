"""Fill in P4 episodes on YouTube from the upload kit, and make them public.

The teacher uploads each MP4 in YouTube Studio (API uploads from an unaudited
project are locked Private). This script then, for every episode in the
chosen range:

  1. finds the uploaded video on the channel (by "P4 EP01"-style text in its
     current title, or by the kit title if it was already set),
  2. sets title, description, tags, category Education, language English,
  3. sets "made for kids" = yes and visibility = public (or unlisted),
  4. uploads the custom thumbnail,
  5. adds it to the "TheOneApp, Explained" playlist (created if missing).

Usage:
  python3 publish_p4.py --from 1 --to 5 --dry-run         # show what would change
  python3 publish_p4.py --from 1 --to 5 --privacy public  # do it

Auth: an OAuth access token with scope https://www.googleapis.com/auth/youtube,
read from the YT_ACCESS_TOKEN environment variable or from the file named by
YT_TOKEN_FILE (JSON with an "access_token" field). The token is never printed.
"""
import argparse, json, os, re, sys, time, urllib.request, urllib.parse, urllib.error

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
from kit_to_json import parse as parse_kit  # noqa: E402

API = "https://www.googleapis.com/youtube/v3"
UPLOAD = "https://www.googleapis.com/upload/youtube/v3"
PLAYLIST_TITLE = "TheOneApp, Explained"
PLAYLIST_DESC = ("Primary 4 Science (Singapore) and Grade 4 Science (US), explained for kids aged 9–12. "
                 "Revise with mind maps in TheOneApp: https://theoneapp-sg.vercel.app")


def token():
    t = os.environ.get("YT_ACCESS_TOKEN")
    if t:
        return t
    f = os.environ.get("YT_TOKEN_FILE")
    if f and os.path.exists(f):
        return json.load(open(f))["access_token"]
    sys.exit("No access token: set YT_ACCESS_TOKEN or YT_TOKEN_FILE")


def call(method, url, params=None, body=None, raw=None, content_type="application/json"):
    if params:
        url += ("&" if "?" in url else "?") + urllib.parse.urlencode(params)
    data = raw if raw is not None else (json.dumps(body).encode() if body is not None else None)
    req = urllib.request.Request(url, data=data, method=method)
    req.add_header("Authorization", "Bearer " + token())
    if data is not None:
        req.add_header("Content-Type", content_type)
    for attempt in range(3):
        try:
            with urllib.request.urlopen(req) as r:
                txt = r.read()
                return json.loads(txt) if txt else {}
        except urllib.error.HTTPError as e:
            msg = e.read().decode(errors="replace")
            if e.code >= 500 and attempt < 2:
                time.sleep(2 ** attempt)
                continue
            raise RuntimeError(f"{method} {url.split('?')[0]} -> {e.code}: {msg[:600]}")


def paged(url, params):
    items, tok = [], None
    while True:
        p = dict(params, maxResults=50)
        if tok:
            p["pageToken"] = tok
        r = call("GET", url, p)
        items += r.get("items", [])
        tok = r.get("nextPageToken")
        if not tok:
            return items


def channel_uploads():
    r = call("GET", f"{API}/channels", {"part": "snippet,contentDetails", "mine": "true"})
    if not r.get("items"):
        sys.exit("The connected Google account has no YouTube channel.")
    ch = r["items"][0]
    return ch["id"], ch["snippet"]["title"], ch["contentDetails"]["relatedPlaylists"]["uploads"]


def find_videos(uploads_pl, episodes):
    """Map episode number -> playlistItem snippet of the matching upload."""
    items = paged(f"{API}/playlistItems", {"part": "snippet", "playlistId": uploads_pl})
    by_ep, unmatched = {}, []
    kit_titles = {e["title"]: e["ep"] for e in episodes}
    for it in items:
        s = it["snippet"]
        t = s["title"]
        m = re.search(r"\bP4[\s_-]*EP[\s_-]*0*(\d{1,2})\b", t, re.I)
        ep = int(m.group(1)) if m else kit_titles.get(t)
        if ep is None:
            unmatched.append(t)
            continue
        vid = s["resourceId"]["videoId"]
        if ep in by_ep and by_ep[ep]["videoId"] != vid:
            print(f"  ! EP{ep:02d} matches two uploads: {by_ep[ep]['title']!r} and {t!r}; using the newest")
            if s["publishedAt"] < by_ep[ep]["publishedAt"]:
                continue
        by_ep[ep] = {"videoId": vid, "title": t, "publishedAt": s["publishedAt"]}
    return by_ep, unmatched


def get_video(video_id):
    r = call("GET", f"{API}/videos", {"part": "snippet,status", "id": video_id})
    return r["items"][0] if r.get("items") else None


def update_video(video, ep, privacy):
    body = {
        "id": video["id"],
        "snippet": {
            "title": ep["title"],
            "description": ep["description"],
            "tags": ep["tags"],
            "categoryId": "27",            # Education
            "defaultLanguage": "en",
            "defaultAudioLanguage": "en",
        },
        "status": {
            "privacyStatus": privacy,
            "selfDeclaredMadeForKids": True,
            "embeddable": True,
            "license": "youtube",
            "publicStatsViewable": True,
        },
    }
    return call("PUT", f"{API}/videos", {"part": "snippet,status"}, body)


def set_thumbnail(video_id, path):
    with open(path, "rb") as f:
        img = f.read()
    return call("POST", f"{UPLOAD}/thumbnails/set", {"videoId": video_id, "uploadType": "media"},
                raw=img, content_type="image/jpeg")


def ensure_playlist(privacy, dry):
    for pl in paged(f"{API}/playlists", {"part": "snippet,status", "mine": "true"}):
        if pl["snippet"]["title"].strip().lower() == PLAYLIST_TITLE.lower():
            return pl["id"], False
    if dry:
        return None, True
    pl = call("POST", f"{API}/playlists", {"part": "snippet,status"},
              {"snippet": {"title": PLAYLIST_TITLE, "description": PLAYLIST_DESC, "defaultLanguage": "en"},
               "status": {"privacyStatus": privacy}})
    return pl["id"], True


def playlist_videos(pl_id):
    return {it["snippet"]["resourceId"]["videoId"]: it["snippet"]["position"]
            for it in paged(f"{API}/playlistItems", {"part": "snippet", "playlistId": pl_id})}


def add_to_playlist(pl_id, video_id):
    return call("POST", f"{API}/playlistItems", {"part": "snippet"},
                {"snippet": {"playlistId": pl_id, "resourceId": {"kind": "youtube#video", "videoId": video_id}}})


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--from", dest="lo", type=int, default=1)
    ap.add_argument("--to", dest="hi", type=int, default=5)
    ap.add_argument("--privacy", choices=["public", "unlisted", "private"], default="public")
    ap.add_argument("--dry-run", action="store_true")
    ap.add_argument("--report", default=os.path.join(HERE, "publish_report.json"))
    a = ap.parse_args()

    episodes = [e for e in parse_kit() if a.lo <= e["ep"] <= a.hi]
    bad = [e for e in episodes if e.get("problems")]
    if bad:
        for e in bad:
            print(f"EP{e['ep']:02d}: {e['problems']}")
        sys.exit("Fix the kit first.")

    ch_id, ch_title, uploads = channel_uploads()
    print(f"Channel: {ch_title} ({ch_id})")
    by_ep, unmatched = find_videos(uploads, episodes)
    if unmatched:
        print("Uploads that match no episode:", unmatched)

    pl_id, created = ensure_playlist(a.privacy, a.dry_run)
    print(f"Playlist {PLAYLIST_TITLE!r}: {'would create' if created and a.dry_run else ('created ' if created else 'found ') + str(pl_id)}")
    in_pl = {}
    if pl_id and not created:
        for attempt in range(4):          # a playlist made moments ago can 404 for a few seconds
            try:
                in_pl = playlist_videos(pl_id)
                break
            except RuntimeError as err:
                if "playlistNotFound" not in str(err) or attempt == 3:
                    raise
                time.sleep(3 * (attempt + 1))

    report = []
    for e in episodes:
        n = e["ep"]
        hit = by_ep.get(n)
        if not hit:
            print(f"EP{n:02d}: NOT FOUND on the channel. Upload {e['file']} in YouTube Studio first.")
            report.append({"ep": n, "status": "missing", "file": e["file"]})
            continue
        vid = hit["videoId"]
        url = f"https://www.youtube.com/watch?v={vid}"
        thumb = os.path.join(HERE, e["thumbnail"])
        print(f"EP{n:02d}: {hit['title']!r} -> {e['title']!r}  {url}")
        if a.dry_run:
            print(f"        would set description ({len(e['description'])} chars), {len(e['tags'])} tags, "
                  f"category Education, made-for-kids, {a.privacy}, thumbnail {os.path.basename(thumb)}"
                  f"{' (file missing!)' if not os.path.exists(thumb) else ''}, "
                  f"{'already in' if vid in in_pl else 'add to'} playlist")
            report.append({"ep": n, "videoId": vid, "url": url, "status": "dry-run"})
            continue
        v = get_video(vid)
        update_video(v, e, a.privacy)
        print("        metadata, made-for-kids and visibility set")
        thumb_ok = None
        if os.path.exists(thumb):
            try:
                set_thumbnail(vid, thumb)
                thumb_ok = True
                print("        thumbnail set")
            except RuntimeError as err:
                thumb_ok = False
                print("        thumbnail NOT set:", str(err)[:300])
        if vid not in in_pl:
            for attempt in range(4):
                try:
                    add_to_playlist(pl_id, vid)
                    print("        added to playlist")
                    break
                except RuntimeError as err:
                    if "playlistNotFound" not in str(err) or attempt == 3:
                        raise
                    time.sleep(3 * (attempt + 1))
        after = get_video(vid)
        report.append({"ep": n, "videoId": vid, "url": url, "status": "done",
                       "title": after["snippet"]["title"], "privacy": after["status"]["privacyStatus"],
                       "madeForKids": after["status"].get("selfDeclaredMadeForKids"),
                       "thumbnail": thumb_ok, "playlistId": pl_id})

    json.dump({"channel": ch_title, "playlistId": pl_id, "episodes": report}, open(a.report, "w"), indent=1)
    print("Report:", a.report)


if __name__ == "__main__":
    main()
