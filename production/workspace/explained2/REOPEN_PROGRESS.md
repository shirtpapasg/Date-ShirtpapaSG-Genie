# Re-opening EP16-EP21 (voice within the first second): progress for the main session

- 2026-11-24 (start): **Only Part 1 has the silent cold open.** Every Part 2 (EP16-EP21) already speaks at 0.30 s (tl_p2.json: Heart's
  "Last time, we learnt..." / "Last time, a tadpole..." at 0.3 s; EP21 Part 2's mp4 has no silence >= 0.3 s in its first 12 s), and every
  Part 2 live on YouTube was rendered from the current code (each episode's "live" commit is its newest). So I fix and re-render **Part 1
  only**; upload_v2.json carries Part 1 only (replaces the old Part 1 alone; playlist "after" = the video before the old Part 1, which is
  the previous episode's live Part 2, unchanged). If you want matching Part 2 re-uploads anyway, `./build_part.sh 2` in the folder renders
  it from unchanged code (no script change needed); tell me and I will add it.
- Approach = EP22's (ep22/script.py, build_tl.py diff): Heart's "Last time, we asked:" at 0.825 s over the cold scene; the cold scene's
  pictures run under the first dare sentence; "lasttime" starts mid-line at a kw mark (build_tl's ("scene", name, {"at": mark, "d": s})).
- Noted: EP20 renders LAST, only after a line "EP20 art fixed" appears here. Order now EP16, EP17, EP18, EP19, EP21, EP20. My EP20 opening
  changes (script.py, build_tl.py, p1.js SC.cold + camCold + the place card; tl_p1; make_moments.py; app_moments.json; upload_v2.json) are
  in place, uncommitted until EP20 is rendered.
- EP16-EP19 had NO voice wavs left (voice/*.wav deleted with the mp4s; only the json). Re-made Part 1's wavs with each episode's own
  make_voice.py engine, NOT re-recorded as new takes: Heart's lines come out bit-identical to the recorded json (duration, mouth envelope);
  the buddies' Character Voice Kit is not bit-exact run to run (a few ms, ~3 cents pitch, envelope correlation >= .99), so those are the
  same takes within that jitter. The jsons (word times, mouths) are unchanged.
