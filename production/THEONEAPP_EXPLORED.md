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

## Storytelling and pacing guide (the teacher's, 18 Nov 2026)

Every TheOneApp, Explored episode is planned against this guide before its script is written. In our videos, "interview" means Heart's narration and any real voices; "footage" and "B-roll" mean our drawn, animated scenes.

### The core idea

* One clear question or tension drives the whole piece. "What happens to the fish when the river runs dry?" beats "a film about a river".
* The viewer should be able to say in one sentence what it was about afterwards.
* Pick one main character or subject. Short docs fail when they try to cover five people.
* Show change. The subject, situation or the viewer's understanding should be different at the end than the start.

### The flow (3 to 5 minutes)

1. Hook, 0 to 20 seconds. Open on the most striking image, line or question. No logos, no slow title cards. Earn the next minute.
2. Set-up, 20 to 60 seconds. Who, where, what is at stake. Keep it to what the viewer needs right now, not everything you know.
3. Deepen, 1 to 3 minutes. The main body. Two or three beats that each add something new: a complication, a surprise, a human detail. Each beat raises a small question the next beat answers.
4. Turn, around 3 to 4 minutes. The moment things shift. A revelation, a decision, a result. This is the emotional peak.
5. Resolution, last 30 to 45 seconds. Land the meaning. Return to the opening image or line so the piece feels closed. End on a strong final shot, then cut. No lingering.

### Format and ingredients

* Interview audio over picture. The interview is the spine. Cut the talking head away quickly and lay the voice over footage that shows what they describe.
* B-roll with purpose. Every shot should prove, illustrate or contrast something being said. Pretty filler drains energy.
* Real moments over telling. A person doing the thing beats a person describing the thing.
* Minimal narration. Let the subject carry it. If you must narrate, do it to bridge gaps, not to explain what we can already see.
* Text sparingly. Name and role lower-thirds, a date or location card, one or two key facts. No paragraphs.
* Sound. Natural sound, room tone and ambience matter as much as music. Silence after a big line hits harder than a swell.
* Music. One or two tracks at most. Music lifts transitions and the turn, then drops out under important speech.

### Pacing

* Average shot length around 3 to 5 seconds in body sections, longer for emotional beats, shorter during montage or energy.
* Change something every 10 to 15 seconds: a new shot, a new voice, a music shift, a text card. Attention resets.
* Breathe. Let one or two moments run long with no cuts and no music. Those are the shots people remember.
* Cut on action and cut on the beat of speech. Never let a sentence trail into a dead frame.
* Front-load. If the viewer is bored at 40 seconds, they leave. Put the second-best moment early and save the best for the turn.
* Avoid talking heads longer than 8 to 10 seconds without a cutaway.

### Editing discipline

* Script the edit before you cut. Write a one-page outline of the five parts with the key lines from interviews.
* Cut the first version 20 percent long, then trim anything that does not serve the one question.
* Every scene should answer "why is this here?". If you cannot say, remove it.
* Watch with sound off. If the images alone do not tell the story, fix the pictures. Watch with picture off. If the audio alone does not make sense, fix the structure.

### Visual craft

* Vary shot sizes: wide to establish, medium for action, close for emotion and detail. Alternate them.
* Consistent colour and exposure. One grade across everything so the piece feels like one film.
* Stable camera unless movement means something. Handheld for intimacy or urgency, tripod or gimbal for calm.
* Shoot more detail shots than you think you need. Hands, textures, objects and faces fill gaps in the edit.

### Common mistakes in short docs

* Starting with background instead of a hook.
* Trying to tell the whole life story instead of one moment.
* Letting music run under everything.
* Explaining the point out loud at the end instead of showing it.
* Running to 5 minutes when 3 would be tighter. Shorter is almost always better.

### How the kit does this (18 Nov 2026)

* **A hero sequence in every episode.** One fresh, visual idea, such as following one tiny bit of gas from the rock under the seabed to the lamp in your room. It plays first as picture-only shots with sound effects (`"silent": seconds` and `"sfx"` on a segment). Then Heart speaks, in step with recap pictures that light up as she names each step.
* **Let it breathe.** Use `"hold": seconds` on a segment after a big line or a dense fact, so the picture stays and the viewer can take it in.
* **Animation shows the process, never decoration.** Every moving thing must be the science happening (gas flowing, a magnet turning, current moving). No floating, wobbling or spinning for its own sake.
* **Cinema mode.** During picture-only shots, the label and the key-word shelf step aside.
* **First person, not always third person (the teacher, 18 Nov 2026).** In the hero sequence the camera IS the particle: we fly with it at its size, and things rush past and loom up (the teacher's example was the parasite's-eye shots in AI-animated dramas). For the gas: squeezed between huge rock grains, shooting up the well pipe towards a circle of light, tumbling through the cleaning tank, diving into the ring of blue flames until the screen flashes, riding the electricity down the cable, ending top-down as the lamp clicks on. Open with one outside shot that dives into the character, and keep a few outside shots where they explain what you cannot see from inside (a real map, a chimney). Heart's recap then speaks to the viewer as the particle ("You were a tiny bit of natural gas…"). The kit: the first-person section at the end of `common.js` (`VP`, `vignette`, `field`/`flyField`, `tunnelG`/`runTunnel`, `povCard`/`showCard`); EP02's shots are in `ep02/pov.js` and `ep02b/pov.js`.
* **A silent cold open (the teacher, 18 Nov 2026).** Before Heart says a word, open on a few seconds of an everyday moment a pupil knows, with only sound: for EP02, a kid comes into a dark HDB bedroom and flips the light switch, CLICK, the room lights up; then the introduction starts. EP01 opens on haze building over the city and a cough. Picture first, words second.
* **Real life, always (the teacher, 18 Nov 2026).** Whatever the topic, link the science to real-life examples Singapore pupils know, so they make the connection: the school canteen, an HDB flat and its void deck, a hawker centre, PE lessons, the playground, the MRT, a school trip to Sungei Buloh, the blue recycling bin. When a scene teaches an idea, show it in a real Singapore moment as well as in a diagram. Whole-episode builds follow `workspace/sau/EPISODE_BRIEF.md`.
* **A change every 10 to 15 seconds.** A new shot, a switch between first person and outside, a text card, a sound or music shift. For a long narrated segment, add camera moves: `"shots": [["word", zoom, x, y], ...]` eases the camera in on (x, y) of the scene box when Heart says the word (`build_tl.py` warns if the word is never said).
* **Good sound effects.** `sfx_lib.py` synthesises a layered sound library into `sfx/<name>.wav`; `build_tl.py` uses the file when it exists. Gentle synthesised music beds (`pad_wonder`, `pad_tension`) give a music shift under a picture-only sequence.
* **Long episodes come in parts.** EP02 became Part 1 (the science: the gas journey and the energy changes; ends on a cliffhanger and a "think about it" answered in Part 2) and Part 2 (the story: 1965 to today, the news, and the future), each about 3 minutes. `CFG.close` (rows and teaser), `CFG.endChip` and the think scene's "Answer in Part 2!" make each part close in its own words.

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

Released every 3 days at 5 pm SGT from 18 Nov 2026 (the teacher: "don't delay too long"), with a Short on most days in between.

| No | Goes public | Story | Textbook link | Levels |
|---|---|---|---|---|
| 1 | public 18 Nov | Why did the haze go away? (first person: a smoke particle) | Respiratory system; people and the environment | P5, P6 |
| 2 | Part 1 public 18 Nov; Part 2 Sun 22 Nov | How does Singapore keep the lights on? (first person: natural gas; Part 2 sunlight, cable, neutron) | Energy forms and conversion | P6 |
| 3 | Part 1 Wed 25 Nov; Part 2 Sat 28 Nov | Recycling: 10¢ for your can (first person: a drink can) and where our rubbish goes (a greasy takeaway box, Semakau full by about 2035) | Materials and magnets; people and the environment | P3, P6 |
| 4 | Tue 1 Dec | Where does all this rain come from? (first person: a water molecule from MacRitchie) | The water cycle | P4 |
| 5 | Fri 4 Dec | Your food is sunlight?! (first person: light energy, through a leaf, a hen and an egg, to a student) and food security | Photosynthesis; food chains | P5, P6 |
| 6 | Mon 7 Dec | Where does your food go? (first person: vegetable fibre, mouth to toilet bowl; NEWater) | Digestive system | P4 |
| 7 | Thu 10 Dec | How does oxygen get to your muscles? (first person: oxygen, nose to muscle; hands over to carbon dioxide, which is breathed out) | Respiratory and circulatory systems | P5 |
| 8 | Sun 13 Dec | What did the crocodile eat? (a rewind food chain at Sungei Buloh: crocodile, mudskipper, crab, mangrove leaf, the Sun) | Food chains | P6 |
| 9 | Wed 16 Dec | Mosquitoes that fight dengue (Project Wolbachia) | Life cycles; people and the environment | P3, P6 |

EP01's "Think about it" (answered at the start of EP02): *Why does an N95 mask protect you better than a cloth mask during the haze?* Answer: the gaps between the fibres of a cloth mask are much bigger than PM2.5 particles, so many slip through. An N95 mask has a fine filter that traps at least 95 out of every 100 tiny particles, and it fits closely so air doesn't leak in around the edges.

EP02 Part 1's "Think about it" (answered at the start of Part 2): *The energy in natural gas did not start in the gas. Where did it come from?* Answer: the Sun. Natural gas formed over millions of years from tiny living things that got their energy from sunlight.

EP02 Part 2's "Think about it" (answer it at the start of EP03): *If we covered every rooftop in Singapore with solar panels, could they power the whole country?* Answer: no. Singapore's rooftops are too small for all the electricity we use, and panels make nothing at night and less on cloudy days. That's why Singapore also looks at imports, storage and other sources.

Before rendering a new episode, show the teacher the script breakdown (each part, its words, what is on screen and why it is written that way) in the proposal doc, and wait for the go. The teacher asked for this on 18 Nov 2026.

## On YouTube (uploaded 18 Nov 2026, re-uploaded the same day after the rename and the accurate maps; scheduled; playlist "TheOneApp, Explored")

`production/youtube/sau_upload.py` uploads each video (`--replace <ids>` swaps in a new render of a still-scheduled video, same slot and date) private with a `publishAt` time, Made for Kids, with chapters from its timeline, its thumbnail (made with `workspace/sau/thumb.js` in the P5 thumbnail style), and the playlist.

| Video | YouTube | Goes public (SGT) |
|---|---|---|
| Trailer | WnUML8oojhM | public since 18 Nov (the teacher asked to go live early) |
| EP01 | cefk-GzboRU | public since 18 Nov (re-uploaded with the first-person journey) |
| EP01 Short 1 | jUZChmlOs0s | Fri 27 Nov, 5 pm |
| EP01 Short 2 | ZbA-GGxWt3s | Mon 30 Nov, 5 pm |
| EP02 Part 1 | s1l0mru1EGc | public since 18 Nov (re-uploaded with the cold open) |
| EP02 Part 2 | 44kn8zDoo5c | Sun 22 Nov, 5 pm |
| EP03 Part 1 | CJcNV69lzxk | Wed 25 Nov, 5 pm |
| EP03 Part 2 | 6WOvUUOVogE | Sat 28 Nov, 5 pm |
| EP04 Rain | Y4mV0P_QnmI | Tue 1 Dec, 5 pm |
| EP05 Food | 7CLMxQbivnc | Fri 4 Dec, 5 pm |
| EP06 Digestion | JiNYG8Upozg | Mon 7 Dec, 5 pm |
| EP07 Oxygen | SOaxffBqJBI | Thu 10 Dec, 5 pm |
| EP08 Food chain | f3KNTUoYfQg | Sun 13 Dec, 5 pm |
| EP09 Mosquitoes | mUzcEOrz938 | Wed 16 Dec, 5 pm |
| EP02 Short 1 | xDAGBl5XHJQ | Mon 7 Dec, 5 pm |
| EP02 Short 2 | xE8CyfEKG9w | Tue 8 Dec, 5 pm |

Add an episode to `NEWS` in TheOneApp's videos.js only after it has gone public (a link makes the TheOneApp, Explored ticket appear). The daily check prepares that pull request.
