#!/usr/bin/env python3
"""Put the chapter list of each TheOneApp, Explained part into its YouTube description.

The teacher (2026-11-23): "ensure all TheOneApp Explained youtube videos are all time stamped clearly, so they are linked correctly
to the correct video to watch when the mindmap AI marked them."

chapters_p3.json is {videoId: [["0:00", "Intro"], ["0:10", "..."], ...]}: the app's moments (theoneapp videos.js, taken from each
part's render timeline), with a chapter dropped where it would start less than 10 s after the one before (YouTube's rule).

For each video this script reads the live snippet, then inserts or replaces one block

    Chapters:
    0:00 Intro
    0:10 ...

after the description's first paragraph. An existing "Chapters:" block (or a bare run of timestamp lines starting at 0:00) is
replaced in place. The title, tags, category, languages, visibility and the description's first line are never changed.

    python3 apply_chapters.py                 dry run: prints what would change, writes nothing
    python3 apply_chapters.py --apply         writes the new descriptions (videos.update, part=snippet)
    python3 apply_chapters.py --only ID ...   just these video ids
    python3 apply_chapters.py --file other.json
"""
import json, os, re, sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)

TS = re.compile(r'^\d{1,2}:\d{2}(:\d{2})?\s+\S')


def secs(t):
    p = [int(x) for x in t.split(':')]
    return p[0] * 60 + p[1] if len(p) == 2 else p[0] * 3600 + p[1] * 60 + p[2]


def check(vid, ch):
    """YouTube shows chapters only when: the first is 0:00, there are at least 3, each lasts 10 s or more."""
    assert len(ch) >= 3, vid + ': fewer than 3 chapters'
    assert ch[0][0] == '0:00', vid + ': the first chapter must be 0:00'
    for (a, _), (b, _) in zip(ch, ch[1:]):
        assert secs(b) - secs(a) >= 10, vid + ': ' + a + ' to ' + b + ' is shorter than 10 s'
    for _, title in ch:
        assert title.strip() and '<' not in title and '>' not in title, vid + ': bad title ' + repr(title)


def block(ch):
    return ['Chapters:'] + ['%s %s' % (t, title) for t, title in ch]


def with_chapters(desc, ch):
    lines = desc.split('\n')
    new = block(ch)
    # 1. an existing "Chapters:" block: replace it where it is
    for i, l in enumerate(lines):
        if l.strip().rstrip(':').lower() == 'chapters':
            j = i + 1
            while j < len(lines) and TS.match(lines[j].strip()):
                j += 1
            return '\n'.join(lines[:i] + new + lines[j:])
    # 2. a bare run of timestamp lines that starts at 0:00 (never the first line): replace it
    for i, l in enumerate(lines):
        if i > 0 and re.match(r'^0:00\s', l.strip()):
            j = i
            while j < len(lines) and TS.match(lines[j].strip()):
                j += 1
            if j - i >= 3:
                return '\n'.join(lines[:i] + new + lines[j:])
    # 3. none yet: after the first paragraph (the first blank line), so the first line stays first
    k = next((i for i, l in enumerate(lines) if i > 0 and not l.strip()), len(lines))
    head, tail = lines[:k], lines[k:]
    if tail:
        return '\n'.join(head + [''] + new + tail)
    return '\n'.join(head + [''] + new)


def main(argv):
    apply = '--apply' in argv
    path = os.path.join(HERE, 'chapters_p3.json')
    only = []
    if '--file' in argv:
        path = argv[argv.index('--file') + 1]
    if '--only' in argv:
        only = [a for a in argv[argv.index('--only') + 1:] if not a.startswith('--')]
    chapters = json.load(open(path, encoding='utf-8'))
    for vid, ch in chapters.items():
        check(vid, ch)
    ids = [v for v in chapters if not only or v in only]

    import yt  # needs production/youtube/.yt_token.json; imported here so --help and the checks above work without it
    items = {}
    for i in range(0, len(ids), 50):
        r = yt.call('GET', yt.API + '/videos', {'part': 'snippet,contentDetails,status', 'id': ','.join(ids[i:i + 50])})
        if 'ERROR' in r:
            sys.exit('videos.list failed: %s' % r)
        for it in r.get('items', []):
            items[it['id']] = it

    changed = 0
    for vid in ids:
        it = items.get(vid)
        if not it:
            print('!! %s: not found (deleted or not ours)' % vid)
            continue
        sn, ch = it['snippet'], chapters[vid]
        m = re.match(r'P(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?)', it['contentDetails']['duration'])
        length = int(m.group(1) or 0) * 3600 + int(m.group(2) or 0) * 60 + int(m.group(3) or 0)
        if secs(ch[-1][0]) > length - 10:
            print('!! %s: last chapter %s is too close to the end (%d s); skipped' % (vid, ch[-1][0], length))
            continue
        old = sn.get('description', '')
        new = with_chapters(old, ch)
        assert new.split('\n')[0] == old.split('\n')[0], vid + ': the first line would change'
        if len(new.encode('utf-8')) > 5000:
            print('!! %s: the description would be over 5000 bytes; skipped' % vid)
            continue
        if new == old:
            print('== %s %s: chapters already up to date' % (vid, sn['title'][:60]))
            continue
        changed += 1
        print('\n>> %s  %s  (%s, %s)' % (vid, sn['title'], it['status']['privacyStatus'], '%d:%02d' % (length // 60, length % 60)))
        print('   ' + '\n   '.join(block(ch)))
        if apply:
            body = {'id': vid, 'snippet': {k: sn[k] for k in ('title', 'categoryId', 'tags', 'defaultLanguage', 'defaultAudioLanguage') if k in sn}}
            body['snippet']['description'] = new
            r = yt.call('PUT', yt.API + '/videos', {'part': 'snippet'}, body)
            if 'ERROR' in r:
                print('   !! update failed: %s' % r)
            else:
                got = r['snippet']
                same = got['title'] == sn['title'] and got.get('tags') == sn.get('tags') and got.get('categoryId') == sn.get('categoryId')
                print('   updated' + ('' if same else '  !! CHECK: title, tags or category came back different'))
    print('\n%d of %d descriptions %s.' % (changed, len(ids), 'updated' if apply else 'would change (dry run; --apply to write)'))


if __name__ == '__main__':
    main(sys.argv[1:])
