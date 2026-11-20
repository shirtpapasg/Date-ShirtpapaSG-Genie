#!/usr/bin/env python3
"""progress.py: one-glance progress of the revamp animators. Reads progress/<id>.json (written by each agent after every step)
and checks which deliverables exist on disk. python3 progress.py"""
import json, os, glob, datetime
H = os.path.dirname(os.path.abspath(__file__))
JOBS = [("art", "Art direction", ["research.md", "STYLE_GUIDE.md", "frames/sheet.png"]),
        ("characters", "Buddies (Pip, Basil, Momo)", ["characters/buddies.js", "characters/sheet.png", "characters/talk.mp4"]),
        ("script", "P3 EP1 pilot script", ["pilot_p3_ep01_script.md"]),
        ("script2", "P3 EP2 script", ["p3_ep02_script.md"]),
        ("motion", "EP1 Short: It walks. Is it ALIVE?", ["kit/motion.js", "MOTION_GUIDE.md", "short1/out/short1.mp4"]),
        ("sprites", "Basil talking test (your art)", ["characters/sprites/basil_talk_test.mp4", "characters/sprites/pip_talk_test.mp4", "characters/sprites/momo_talk_test.mp4", "characters/sprites/buddies_lineup_test.mp4"]),
        ("ep01", "P3 EP1 pilot episode", ["ep01/ep01.mp4", "ep01/ep01_part1.mp4", "ep01/ep01_part2.mp4"]),
        ("posetest", "Pose-switching test (robot round)", ["characters/sprites/pose_test_robot_round.mp4"])]
now = datetime.datetime.now(datetime.timezone.utc)
for jid, name, files in JOBS:
    p = {}
    try: p = json.load(open(f"{H}/progress/{jid}.json"))
    except Exception: pass
    pct = int(p.get("pct", 0)); bar = "█" * (pct // 5) + "░" * (20 - pct // 5)
    age = ""
    if p.get("updated"):
        try: age = f"{int((now - datetime.datetime.fromisoformat(p['updated'].replace('Z', '+00:00'))).total_seconds() // 60)} min ago"
        except Exception: pass
    have = [f for f in files if os.path.exists(f"{H}/{f}")]
    print(f"{name:28} {bar} {pct:3d}%  {age}")
    print(f"{'':28} done: {p.get('step', 'starting…')}")
    print(f"{'':28} next: {p.get('next', '-')}   files {len(have)}/{len(files)}")
