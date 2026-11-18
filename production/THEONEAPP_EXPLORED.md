# TheOneApp, Explored: the series handbook

Renamed from "Science Around Us" on 18 Nov 2026: other books, films and videos already use that name. "Explored" pairs with the textbook series "TheOneApp, Explained": Explained teaches the textbook, Explored takes it into the real world. The board level code stays `SAU` and the kit folder stays `workspace/sau/`.

The teacher's weekly science-news videos for Singapore primary pupils (2026-11-18). Each week, one news story is linked to a textbook topic pupils already study.

- Proposal and decisions: the teacher's doc "Science in the News: Weekly Video Proposals", https://claude.ai/artifact/AgsDbqBpB2UvQq38XkoLpa
- Board: the Videos Review Board, https://claude.ai/artifact/4LdsCNE87uai78ZDNHTPss, tab **TheOneApp, Explored** (cards have `level: "SAU"`)
- Kit: `production/workspace/sau/` on this branch

## Each week: one episode and two Shorts from one script

| Video | Length | Shape | Goes up |
|---|---|---|---|
| Episode (Proposal A) | 3–5 min, 1920×1080 | headline → what's the science → see it → try this → think about it → close → **"Now You Know!"** | Thursday |
| Short 1 (Proposal B) | under 60 s, 1080×1920 | one surprising fact → the science in one picture → one question + "Watch the full episode" → **"Now You Know!"** | Friday |
| Short 2 (Proposal B) | under 60 s, 1080×1920 | the same shape, a second fact | Monday |

- **Proposal C** (Singapore Science Watch): when a local story is the best of the week, the episode is a local one: where in Singapore, what's happening (with the agency), the textbook link, what the family can do. Aim for about every other week.
- **Proposal D** (From Headline to Exam Question): on the first Monday of each month, one of the three candidates is an exam-question episode for P5–P6: the story, the question with a diagram, the model answer with key words, the common mistake. Flag that the teacher must check the model answer.
- Each episode opens its "What's the science?" part by answering last week's "Think about it" question in one or two sentences.

## Rules (from the teacher)

1. **Every video ends with Heart saying "Now You Know!"** in an excited, happy voice. In the kit, the last segment is `{"id": "nyk", "scene": "nyk", "excited": true, "text": "Now you know!"}`.
2. Name the textbook topic and level out loud, for example "In Primary Five, you learn about the respiratory system". Episodes can serve any of P3–P6.
3. Gentle with worrying news: no frightening images. A worrying story ends with what people are doing about it, and what a child can do.
4. Science, not opinion: explain how things work. Never say which country or person is right.
5. Every fact has a source. Use the agency or mission first (NEA, PUB, NParks, MSS, NASA, ESA). If a page can't be opened from the cloud, use two news reports that agree, and put the fact in the card's `changes` list as "to confirm before approving".
6. Our own pictures: Heart's animations only. No news footage or newspaper photos.
7. Dated, not "this week": say "In November 2026".
8. YouTube: Made for Kids, playlist "TheOneApp, Explored"; sources listed in the description.
9. **Drawn, but true to the world and the science** (the teacher, 18 Nov 2026). Pictures can be cartoons, but what they show must be accurate: real map shapes and positions, real proportions and scales, correct science diagrams.
   - Maps come from real coastline data: `workspace/sau/geo_map.js` (`regionMap()`, used by the scenes) and `globe_thumb.py` (thumbnails), both built from Natural Earth.
   - Places (fires, pipelines, labels) go at their real longitude and latitude.
   - Never draw a made-up coastline or a "rough" map.
10. **One kind of label per row** (the teacher, 18 Nov 2026). In a diagram, every item is labelled the same way: the THING's name above and the science word below (for energy changes: natural gas / chemical potential energy, burning gas / heat energy, turbine / kinetic energy, generator / electrical energy, lamp / light energy). Never mix a name, a state of matter and an energy form in one row: pupils will learn the wrong idea. Every line on a map starts and ends somewhere named (a pipeline starts at its gas field).

## Thumbnails: the globe style (the teacher's favourite, 18 Nov 2026)

Every TheOneApp, Explored video, Shorts and trailer included, uses `workspace/sau/globe_thumb.py`. It draws a real globe in space (Natural Earth coastlines), centred on Singapore, with the story drawn at true positions: haze, fires, pipelines, wind arrows, ships, the Sun. On top go the "TheOneApp Explored" pill, a giant white-and-yellow title, and the hook words with a yellow border (no box). Each video has a small JSON file next to its scenes, for example `ep01/globe_ep01.json` and `ep02/globe_short1.json`.

    python3 globe_thumb.py epNN/globe_epNN.json epNN/thumb_epNN_globe.html && node shot.js epNN/thumb_epNN_globe.html epNN/thumb_epNN.png 1920 1080
    (Shorts: "W": 1080, "H": 1920 in the JSON and 1080 1920 for shot.js; save the JPG at 1280x720 or 720x1280)

For a story far from Singapore, move `centre` and the `cx`/`cy`. Keep rule 9: everything drawn on the globe sits at its real longitude and latitude.

## The kit (`production/workspace/sau/`)

Everything renders in the cloud session; nothing needs the teacher's Mac.

```
sau/
  engine.html      the page that draws every frame (episode 1920x1080 or Short 1080x1920)
  voice.py         Heart's voice 3 (Kokoro af_heart); "excited": true for "Now you know!"
  build_tl.py      word timings (pocketsphinx), voice track, sound effects, captions
  build_page.py    engine + an episode's scenes + its timeline -> one HTML page
  render.js        frames -> mp4 (Playwright + ffmpeg); stills.js for test frames
  render_all.sh    renders the episode and both Shorts, then mixes voice and effects
  fonts/           Fredoka (npm i in this folder)
  ep01/            the haze episode: ep01_segments.json, short1/2_segments.json, scenes.js
```

New week, new folder `epNN/`:

1. Copy the last episode's folder. Write `epNN_segments.json` (title, tag, intro goals, next-episode card, key words, segments) and the two Short files.
2. Write `scenes.js`: one `S.<scene>` per scene, drawn in a 1200×900 box. Time each animation with `cue(scene, word, fallback)` so the Shorts can reuse a scene. The shared scenes `welcome`, `think`, `close`, `nyk`, `end` and `qcard` can be copied as they are.
3. Set up the tools once per session (about a minute):
   `python3 -m venv /home/user/heart-tts/venv && . /home/user/heart-tts/venv/bin/activate && pip install kokoro-onnx soundfile praat-parselmouth pocketsphinx numpy`, then download `kokoro-v1.0.onnx` and `voices-v1.0.bin` from github.com/thewh1teagle/kokoro-onnx releases (model-files-v1.0) into `/home/user/heart-tts/` as `kokoro.onnx` and `voices.bin`. Then run `npm i` in `sau/fonts`.
4. Build and check:
   ```
   python voice.py epNN/epNN_segments.json epNN/aud          (and short1 -> aud_s1, short2 -> aud_s2)
   python build_tl.py epNN/epNN_segments.json epNN/aud epNN/epNN
   python build_page.py epNN/epNN_segments.json epNN/epNN_tl.json epNN/scenes.js epNN/epNN_page.html 1920x1080
   python build_page.py epNN/short1_segments.json epNN/short1_tl.json epNN/scenes.js epNN/short1_page.html 1080x1920
   NODE_PATH=$(npm root -g) node stills.js epNN/epNN_page.html /tmp/st/e 1920 1080 5 20 40 ...   (look at every scene)
   ./render_all.sh epNN                                       (about 15 minutes; writes epNN.mp4, short1.mp4, short2.mp4)
   ```
5. Split each mp4 into parts of about 10 MB (`ffmpeg -f segment -segment_time 45 -reset_timestamps 1 -c copy`). Upload them to the board's asset store (Artifact tool, `asset: true`). Set the card's `parts`, `rendered: true`, `pending: false`, `videoUpdatedAt`. Add a thumbnail (`thumb`).
6. Commit the folder (not the mp4, wav or aud files) to this branch.

## The weekly rhythm (automated)

| When | Who | What |
|---|---|---|
| Monday 07:43 SGT | Scheduled task "TheOneApp, Explored: weekly episode" | Finds three candidate stories from the past week, each with its source, textbook link and level. Sends a phone notification. If this week's episode is already on the board (EP01 was made early for the week of 23 Nov), it plans the following week's instead. |
| Monday | Teacher | Replies 1, 2 or 3 in that session (or "skip"). |
| Monday–Tuesday | That session | Writes the script and both Shorts, renders them, puts all three on the board as Rendered, and replies with the board link. |
| Wednesday | Teacher | Watches, then presses Approve or leaves notes. |
| Daily 07:56 SGT | Scheduled task "Video pipeline check" | Applies notes on TheOneApp, Explored cards by re-rendering in the cloud. Prepares the YouTube details for approved videos. |
| Thursday | Teacher says "go" | Episode uploaded (needs the teacher's YouTube sign-in, see `production/youtube/YOUTUBE_RELOGIN.md`). Short 1 goes up on Friday, Short 2 on Monday. |
| After upload | Daily check | Prepares the TheOneApp change (TheOneApp, Explored shelf in `videos.js`) as a pull request. It merges only on "go". |

## Episodes

| No | Week of | Story | Textbook link | Levels |
|---|---|---|---|---|
| 1 | 23 Nov 2026 | Why did the haze go away? | Respiratory system; how people affect the environment | P5, P6 |
| 2 | 30 Nov 2026 | How does Singapore keep the lights on? (oil in 1965 → natural gas today, Indonesia's gas cut, solar, imports, nuclear). Rendered 18 Nov with two Shorts (sunlight, nuclear); on the board for review | Energy forms and conversion; how people affect the environment | P6 |
| 3 | 7 Dec 2026 | Mosquitoes that fight dengue (Project Wolbachia) | Life cycles; how people affect the environment | P3, P6 |
| 4 | 14 Dec 2026 | Cooling a city without more air-con (exam special) | Heat; energy | P4, P6 |

EP01's "Think about it" (answered at the start of EP02): *Why does an N95 mask protect you better than a cloth mask during the haze?* Answer: the gaps between the fibres of a cloth mask are much bigger than PM2.5 particles, so many slip through. An N95 mask has a fine filter that traps at least 95 out of every 100 tiny particles, and it fits closely so air doesn't leak in around the edges.

EP02's "Think about it" (answer it at the start of EP03): *If we covered every rooftop in Singapore with solar panels, could they power the whole country?* Answer: no. Singapore's rooftops are too small for all the electricity we use, and panels make nothing at night and less on cloudy days. That's why Singapore also looks at imports, storage and other sources.

Before rendering a new episode, show the teacher the script breakdown (each part, its words, what is on screen and why it is written that way) in the proposal doc, and wait for the go. The teacher asked for this on 18 Nov 2026.

## On YouTube (uploaded 18 Nov 2026, re-uploaded the same day after the rename and the accurate maps; scheduled; playlist "TheOneApp, Explored")

`production/youtube/sau_upload.py` uploads each video (`--replace <ids>` swaps in a new render of a still-scheduled video, same slot and date) private with a `publishAt` time, Made for Kids, with chapters from its timeline, its thumbnail (made with `workspace/sau/thumb.js` in the P5 thumbnail style), and the playlist.

| Video | YouTube | Goes public (SGT) |
|---|---|---|
| Trailer | WnUML8oojhM | Wed 25 Nov, 7 pm |
| EP01 | CxCl5ZM_5dw | Thu 26 Nov, 5 pm |
| EP01 Short 1 | jUZChmlOs0s | Fri 27 Nov, 5 pm |
| EP01 Short 2 | ZbA-GGxWt3s | Mon 30 Nov, 5 pm |
| EP02 | rT2wlRo1PCc | Thu 3 Dec, 5 pm |
| EP02 Short 1 | apUqq0d6YvQ | Fri 4 Dec, 5 pm |
| EP02 Short 2 | xE8CyfEKG9w | Mon 7 Dec, 5 pm |

Add an episode to `NEWS` in TheOneApp's videos.js only after it has gone public (a link makes the TheOneApp, Explored ticket appear). The daily check prepares that pull request.
