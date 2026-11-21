# Making the two YouTube Shorts for one TheOneApp, Explored episode: brief for an animator agent

You are making two vertical YouTube Shorts (1080 x 1920, about 40 to 60 seconds each) cut from one finished episode of
"TheOneApp, Explored", a science YouTube series for Singapore Primary 3 to 6 pupils (ages 9 to 12), in
`/home/user/Date-ShirtpapaSG-Genie/production/workspace/sau/epNN/`. The teacher wants speed: be quick and decisive, and keep the bar high.

## Read first
- `EPISODE_BRIEF.md` and `POV_BRIEF.md` (the kit, determinism, the test loop). Python: `PY=/home/user/heart-tts/venv/bin/python`.
- `production/THEONEAPP_EXPLORED.md` (two levels up): rules 1 to 10. Rule 9: drawn but true; nothing may teach a wrong idea. Rule 10: one
  kind of label per row; map lines start and end somewhere named. Real-life Singapore examples always.
- The finished Shorts to copy and beat: `ep05/short1_segments.json`, `ep05/short2_segments.json`, `ep06/short1_segments.json`,
  and `ep05/short_extra.js` (how scenes are refitted for the vertical frame when `SHORT` is true: `fit5`, `hide`, and
  shrinking wide titles). Watch `ep05/short1.mp4` or take stills from it to see the target.
- Your episode: `epNN/epNN_segments.json` (the approved script), `epNN/scenes.js`, `epNN/pov.js`, `epNN/epNN_tl.json`, and `epNN/epNN.mp4`.

## Shape of each Short
1. `qcard`: the Short's question, spoken (e.g. "Why does your heart pound when you run?"). It is the hook: make it a question a
   9-year-old wants answered.
2. The first-person hero shots from the episode (silent segments, with their sound effects), trimmed to the strongest 3 to 5 shots.
3. Two to four narrated lines that answer the question, using the episode's own scenes (`recap`, `news`, `textbook`, `try`, ...).
4. "Watch the full episode on TheOneApp, Explored."
5. `nyk` with `"excited": true`: "Now you know!"
Short 1 is the journey (the episode's first-person adventure). Short 2 is a different angle from the same episode (a fact, a
"try this", a real-life link). The two must not repeat each other.

## Words
Reuse the approved episode narration word for word wherever you can (the teacher has checked its facts). New words must be short,
plain and true; list every new sentence in your report so the teacher can check it. No new facts or numbers beyond the episode's.

## Build (Short files only; never touch the episode's own files)
```
cd production/workspace/sau
$PY voice.py epNN/short1_segments.json epNN/aud_s1          # short2 -> aud_s2
$PY build_tl.py epNN/short1_segments.json epNN/aud_s1 epNN/short1
python3 build_page.py epNN/short1_segments.json epNN/short1_tl.json common.js,geo_map.js,epNN/scenes.js,epNN/pov.js,epNN/short_extra.js epNN/short1_page.html 1080x1920
NODE_PATH=$(npm root -g) node stills.js epNN/short1_page.html /tmp/epNN_s1/s 1080 1920 1.0 4.0 ...
```
(Check `epNN/build.sh` first: if scenes.js is built from scenes.src.js, keep using the built scenes.js and do not rebuild it.)
Write `epNN/short_extra.js` so that every frame reads well in 1080 x 1920: nothing important cut off at the sides, titles and chips
inside the frame, the captions clear. Look at stills of EVERY segment, at least two rounds of critique and fixes. Hero silent
segments may be shortened or have their sfx retimed in the Short's own segments file.

Render the Shorts only (the machine is shared, so only when the stills are right): `./render_all.sh epNN "short1 short2"`.

## Thumbnails
One vertical thumbnail per Short, from a strong frame of that Short (not the globe, and not the same as the episode's thumbnail):
1080 x 1920, the "TheOneApp Explored" pill, a short two-tone title (white + yellow), one hook line with a yellow border. Copy the look of
`thumb_frame.py` (landscape) into your own script under `epNN/` for the vertical size. Write `epNN/thumb_short1.jpg` and
`epNN/thumb_short2.jpg` (JPEG under 2 MB).

## Report (brief)
For each Short: title, length, the segment list with each line's words (mark NEW sentences), the stills you checked, and a
contact sheet of about 12 stills at `/tmp/epNN_shorts_sheet.png`. Do not commit, push, upload, or touch YouTube or the review board.
