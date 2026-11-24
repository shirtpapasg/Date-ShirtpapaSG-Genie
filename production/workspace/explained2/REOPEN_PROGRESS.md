# Re-opening EP16-EP21 (voice within the first second): progress for the main session

- 2026-11-24 (start): **Only Part 1 has the silent cold open.** Every Part 2 (EP16-EP21) already speaks at 0.30 s (tl_p2.json: Heart's
  "Last time, we learnt..." / "Last time, a tadpole..." at 0.3 s; EP21 Part 2's mp4 has no silence >= 0.3 s in its first 12 s), and every
  Part 2 live on YouTube was rendered from the current code (each episode's "live" commit is its newest). So I fix and re-render **Part 1
  only**; upload_v2.json carries Part 1 only (replaces the old Part 1 alone; playlist "after" = the video before the old Part 1, which is
  the previous episode's live Part 2, unchanged). If you want matching Part 2 re-uploads anyway, `./build_part.sh 2` in the folder renders
  it from unchanged code (no script change needed); tell me and I will add it.
- Approach = EP22's (ep22/script.py, build_tl.py diff): Heart's "Last time, we asked:" at 0.825 s over the cold scene; the cold scene's
  pictures run under the first dare sentence; "lasttime" starts mid-line at a kw mark (build_tl's ("scene", name, {"at": mark, "d": s})).
