"""Turn YOUTUBE_UPLOAD_KIT.md into machine-readable metadata.

Usage:  python3 kit_to_json.py [EP_FROM EP_TO] > p4_metadata.json

Each "## EPISODE N" section of the kit holds a title, a description and a
comma-separated tag list inside fenced code blocks. This script extracts
them, checks YouTube's limits (title <= 100 chars, description <= 5000,
tags <= 500 chars in total) and prints JSON.
"""
import json, re, sys, os

KIT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "YOUTUBE_UPLOAD_KIT.md")


def fenced(block, label):
    """Return the text of the ``` block that follows **label...:**, or None."""
    m = re.search(r"\*\*" + label + r"[^*]*\*\*\s*\n```\n(.*?)\n```", block, re.S)
    return m.group(1).strip() if m else None


def parse(path=KIT):
    text = open(path, encoding="utf-8").read()
    parts = re.split(r"^## EPISODE (\d+)\s*$", text, flags=re.M)
    episodes = []
    for i in range(1, len(parts), 2):
        no, block = int(parts[i]), parts[i + 1]
        m = re.search(r"\*\*File:\*\* `([^`]+)` · \*\*Thumbnail:\*\* `([^`]+)`", block)
        ep = {
            "ep": no,
            "file": m.group(1) if m else None,
            "thumbnail": m.group(2) if m else f"P4_EP{no:02d}_thumbnail.jpg",
            "title": fenced(block, "Title"),
            "description": fenced(block, "Description"),
            "tags": [t.strip() for t in (fenced(block, "Tags") or "").split(",") if t.strip()],
        }
        problems = []
        if not ep["title"]:
            problems.append("no title")
        elif len(ep["title"]) > 100:
            problems.append(f"title {len(ep['title'])} chars > 100")
        if not ep["description"]:
            problems.append("no description")
        elif len(ep["description"]) > 5000:
            problems.append("description > 5000 chars")
        if len(",".join(ep["tags"])) > 500:
            problems.append("tags > 500 chars")
        if problems:
            ep["problems"] = problems
        episodes.append(ep)
    return episodes


if __name__ == "__main__":
    eps = parse()
    if len(sys.argv) == 3:
        lo, hi = int(sys.argv[1]), int(sys.argv[2])
        eps = [e for e in eps if lo <= e["ep"] <= hi]
    print(json.dumps(eps, indent=1, ensure_ascii=False))
