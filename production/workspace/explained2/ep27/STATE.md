# EP27 build state (for a resume after a restart)
P3 EP27, **the P3-to-P4 Bridge** ("P3 Finale / P4 Pilot"): **"The Great Ice Cream Rescue"**, ONE video, **6:26.6** (the story to 5:52,
then the read-along, "Now you know!", 4.6 s of outro and a 7 s blooper after the end card). Asked for by the teacher on 25 Nov 2026 ("Build on
this and make it live immediately. Impress me! New music, new story, following the same rules."); pre-approved to go live after the main
session's check. Built by one Opus agent on 25 Nov 2026 (script, voices, drawing, music, render, checks). NOT uploaded (the main session uploads).
The script: `../p3_ep27_bridge_script.md` (header `script_header.md` + the beat table generated from the timeline by `make_script_md.py` +
`script_tail.md`; copied to SecondBrain `Plans/videos/P3-new/`). Every spoken word: `script.py`.

## The P4 style it pilots (teacher, 25 Nov; SecondBrain `Plans/videos/P4-new-direction.md`)
Format B, The Fix-It: the problem in the first line (the party in twenty minutes, the ice cream at the mama shop, 33 degrees), a party clock
on screen; the viewer picks the fix out of THREE fix cards (run faster / fan it / wrap it in wool; a 6 s ring); the story tests them: fix 1
fails (Pip's "the cold is going into my tummy", corrected), fix 2 fails (the fan; the slow-motion replay; LOOK CLOSER: 33 °C air vs −18 °C
ice cream: HOTTER TO COLDER), fix 3 the twist (the journey into the wool's trapped air: POOR CONDUCTOR OF HEAT), the real solution tested
(a FAIR TEST: 30 / 20 / 5 ml) and used (the scarf + the covered walkway), a P3 callback (the magnet fishes the steel opener out of the drain;
the aluminium ring pull stays), the party (the fan callback joke), the words that earn marks, the P3 year, the P4 level-up (goggles, badge,
magnifier) and teaser, the read-along, "Now you know!", a blooper. Left out on purpose: goal cards, hidden animal, chant (see the script's
section 0). **Heart mystery hint #1:** the logo heart flickers (cyan / magenta double, a sliver offset, a tiny blip) on "4" in Heart's
"See you in Primary 4!" (mark `glitch`, p1.js `glitch27`, sound `blip`).

## Files
- Engine copied from `../ep22/` (lib.js with EP27's OUTCOMES / learnAt / KW / SHELF_HIDE / KWLINE and EP23's `o.watch`; common.js,
  closer.js, shrink.js, props/sets/art files unchanged; main.js + `XDEFS27`; page.html loads `art27.js`, `p1.js` only).
- New: `art27.js` (the four places baked as bg/ms27, path27, walk27, vd27; the box, cups, scarf, fan, thermometer, jugs, magnet, opener,
  ring pull, standing fan, bunting, balloons, the P4 items, the fix cards, the wool micro-world, the party clock), `p1.js` (every scene),
  `sound_cues.js`, `song.js` (the NEW music: "Scoop Parade" theme, lite, tense, party beds on one 112 BPM bar clock, 0.8 s crossfades;
  the stings), `make_voice.py` (+ the `slowof` slow-motion line, EXTRA words), `finish.sh` (ep27.mp4, sheet.png, ep27.srt),
  `make_moments.py` (app_moments.json + chapters key EP27), `thumb27.js` (thumb.jpg via ../thumb_v2.js, unedited), `make_script_md.py`.
- Voices: every line recorded and aligned (`voice.log`, `voice_redo.log`; not aligned: none); the ritual voices (h860, h864, h1304*, h1305,
  u1300, u1305) copied from ep22. No new sg_pron entry: no Singapore name is spoken ("mama shop", "void deck", "air-con" as Kokoro says them).

## Checks
- `qa/ghost_scan.txt`: **no buddy ghosting** (every scene change).
- `qa/facing_scan.txt`: no backwards movers; 3 for eye review (Pip's dash right, the three walking right under the walkway: front views, not
  mirrored, facing the way they go: checked on stills).
- Render: see the line at the end of this file (decode check, LUFS, sheet).

## Upload (the main session)
`upload.json` (one part, key `explained-p3-ep27`, after `explained-p3-ep26-part2` in both playlists: adjust at upload time), `thumb.jpg`,
chapters `production/youtube/chapters_p3.json` key `EP27`, `app_moments.json` (videos.js entry 27, keys are placeholders).

## Render (25 Nov 2026, 18:3x UTC)
**`ep27.mp4`**: 1920x1080, 30 fps, **11562 frames = 6:25.4**, decodes end to end (0 errors), **-16.0 LUFS, true peak -1.9 dBTP**
(the master ceiling was lowered from .84 to .78 after a first mux measured -1.2 dBTP). `sheet.png` (30 stills), `ep27.srt` (captions for
Studio). Chunk 140-150 s re-rendered once (the look-closer's magnifier now gives way to fix card 2's stamp). Intermediates deleted.
Rendered from git HEAD's files plus that one p1.js fix (committed with this line).
Known small thing left: during the slow-motion replay Momo already shows her shy pose (she was wrong about the fan). (The other two items
noted here were fixed in the overlap round below.)

## Overlap fixes (coordinator review, 25 Nov 2026, 19:xx UTC) and re-render
- Key-word chips (top right) kept clear: the VOID DECK signpost is no longer baked into bg/path27 (drawn live only in run / fan / replay,
  before any chip is up); speech bubbles placed clear of the chip stack (fair test, drain, party), of the box's label and the thermometer
  (scarf), of the magnet and its line (drain), of the LEVEL UP pill (year); each buddy its own bubble space in the picks (pins removed).
- Buddies apart: fix 1 (Basil 200, Momo 570, Pip starts at 860), the walk (-10 / 420 / 850), the drain (Pip 150, Momo 470), picks (360 px).
- Key-word pops moved off text: HOTTER TO COLDER to (820, 730) inside the look-closer panel; FAIR TEST to (1000, 580) above the wall.
  Drain labels: "steel: magnetic" inside the drain's upper left, "inside the drain" under the cut-away, Basil's rod no longer crosses his chin.
- The level-up items stay 2.8 s (was 1.6 s): the timeline after 5:44 is 1.2 s later (6:26.6).
- app_moments.json: the real TheOneApp videos.js keys (O.heatFlow, O.gainLoss, O.conductors, O.magMaterials, CH.magnets); the fair-test and
  P3-year moments have none in videos.js, so their keys are empty.
- Render: a full render (the verified chunks had been deleted as intermediates), then the seven fair-test chunks (210-280 s) once more after
  the last bubble / FAIR TEST pop fix. **ep27.mp4: 11598 frames = 6:26.6, decode clean, -16.0 LUFS, -2.0 dBTP; ghost scan clean; facing scan
  clean** (3 buddy walks right, eye-checked). Before/after: qa/before_after.jpg (+ qa/final_fairtest.jpg for the fair test's final frames,
  qa/items_346.4.jpg). Every 2.5 s of the video was rendered as stills and checked for text over text, a bubble over a chip or label, and a
  buddy over a word or another buddy's face.
