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
- Noted (main session): Part 2 of EP16, EP17, EP18 and EP21 is re-rendered from unchanged code after each Part 1 (for the one-bed music
  fix); EP19 Part 2 and EP20 Part 2 are the art-fix agent's. upload_v2.json of 16/17/18/21 carry both parts (replaces both live ids);
  19/20 carry Part 1 only (add the art-fix agent's Part 2 there). "after" chains: EP16 after RCwRXpameIk, EP17 after
  explained-p3-ep16v2-part2, EP18 after ...ep17v2-part2, EP19 after ...ep18v2-part2, EP20 after ...ep19v2-part2 (or JpBskDtIwb0 if EP19
  Part 2 is not re-uploaded), EP21 after ...ep20v2-part2 (or A72s28TeDnU). Chapters keys EPNN_P1_v2 (all six) and EPNN_P2_v2 (16/17/18/21).
- 2026-11-24 06:09 UTC (lofi agent): **lofi sample ready**: `/tmp/claude-0/-home-user/74176568-2247-5488-9d44-67460063f436/scratchpad/lofi_sample/sample.mp4` (60 s, 720p, AAC; EP22 Part 2 0:00-1:00, its mp4 untouched): Kampong Walk fades in under Heart's recap, sits at about -28 LUFS-S under speech (-23 in gaps), fades out smoothly to silence for the Round 1 countdown at 0:45 (ticks and bell only) and back in after. One bed, 0 beat restarts, 0 hard cuts. Tool: `python3 add_lofi.py <epdir> <part>`; rule in SERIES_FORMAT.md section 9.
- EP16 ready (Part 1): files ep16/ep16_part1.mp4 (319.4 s, 9582 frames, -16.0 LUFS); first word 0.825 s (was 6.3 s); ep16/upload_v2.json (both parts listed; Part 2 render still to come, from unchanged code); chapters EP16_P1_v2 / EP16_P2_v2.
- EP20 art fixed (art-fix agent, commit 3cc1bd4; code only, EP20 Part 1 NOT rendered: yours). What changed: the pencil now passes THROUGH
  both ring magnets everywhere (rings20 / pencilRings); the HOLD ON! ring picture is one cream disc centred on the ring, clipped to it, the
  pencil + plasticine + both rings above the number badge; the Round 1 ring picture (ringP1) smaller and above the badge; the ring is lifted
  right off the pencil before it is turned over (topRing, flip arrow); "Be the top ring magnet" (SC.shrink, 79-117 s) redrawn as a side view
  at ring size (lc20.js ringJourney; same marks and timings; tl_p1 / cues / app_moments unchanged); waitw's closing wipe is now the wall colour.
  Stills checked: /tmp/claude-0/-home-user/74176568-2247-5488-9d44-67460063f436/scratchpad/ep20fix/ (journey, holdon, pencil_p1).
- Also from the art-fix agent (fix 2 audit, same commit), Part 1 code changes for you to pick up when you render: EVERY lock-in ring picture
  (lockN in epNN/common.js, EP16-EP22) is now clipped to the ring's inner circle (the picture's own disc used to spill under the drained
  track; EP21 P1's ruler went over it). EP19 P1: HOLD ON! wok picture centred + clipped (was 40 px low, the wok behind the badge), Round 1
  "copper wire" moved out from behind the badge. EP21 P1: HOLD ON! picture centred + clipped (was 20 px low, the bench over the track).
  Already rendered before this: EP16 Part 1 (06:07) and EP17 Part 1 (render.js started 06:13:23, before my 06:14 common.js edit): both lack
  only the lock-in clip (a thin edge of the picture's disc under the drained track); re-render if you want them exact. Your Part 2 renders of
  EP16 / EP17 / EP18 / EP21 from the current code pick up the clip (plus EP17 P2's wrigglers moved up out from behind the badge): please
  render those after commit 3cc1bd4. I render EP19 Part 2, EP20 Part 2, EP22 Part 1 and EP22 Part 2.
