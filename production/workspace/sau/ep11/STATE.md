# TheOneApp, Explored EP11: state (24 Nov 2026)

"How Do You Build a Chip That Helps AI Think?" Script approved by the teacher on 24 Nov 2026 ("Great! let's go!"): `SCRIPT.md`.
**Rendered, NOT uploaded** (the teacher reviews first). Goes up: episode Thu 26 Nov, Short 1 Fri 27 Nov, Short 2 Mon 30 Nov, 5 pm SGT.

## Files

| What | File |
|---|---|
| Episode (1920x1080) | `ep11.mp4`, `ep11.srt`, `sheet_ep11.jpg` (1 frame / 5 s), `thumb_ep11.jpg` (globe style, 1280x720) |
| Short 1 "From sand to chip" (1080x1920) | `short1.mp4`, `short1.srt`, `sheet_short1.jpg`, `thumb_short1.jpg` (720x1280) |
| Short 2 "One teacher or a whole hall?" (1080x1920) | `short2.mp4`, `short2.srt`, `sheet_short2.jpg`, `thumb_short2.jpg` |
| YouTube details | `upload_ep11.json` (sau_upload.py's VIDEOS format; every entry `"hold": true`) |
| Segments / timelines | `ep11_segments.json`, `short1_segments.json`, `short2_segments.json`, `*_tl.json` |
| Pictures | `scenes.src.js` (narrated scenes; `build.sh` makes `scenes.js` with the series pupil copied in), `pov.js` (picture-only shots), `short_extra.js` (Short 1's close scene, vertical refit), `geo11.py` -> `geo11.js` (real maps) |
| Tools | `build.sh` (scenes, timelines, pages), `sheet.sh` (stills), `thumb11.py`, `make_extras.py` (srt + upload json), `check.sh` (decode, frames, loudness, contact sheets), `pron_clip.py` |

Rebuild: `./ep11/build.sh` then `flock /tmp/explained_render.lock ./render_all.sh ep11` then `python3 ep11/make_extras.py` and `ep11/check.sh`.
Upload (only after the teacher's "go"): `YT_TOKEN_FILE=.yt_token.json python3 youtube/sau_upload.py sau-ep11` (Fri: `sau-ep11-s1`, Mon: `sau-ep11-s2`).
`sau_upload.py` now also reads `epNN/upload_epNN.json`; entries with `"hold": true` are uploaded only when named. The episode goes in
"TheOneApp, Explored"; the Shorts (#Shorts in the title) only in "TheOneApp Shorts" (rule 8, done by the script).

## Lengths and checks

| Video | Length | Frames (30 fps) | Decode check | Loudness | Size |
|---|---|---|---|---|---|
| ep11.mp4 (1920x1080) | 4:57.9 (297.9 s) | 8936 = ceil(END x 30) | `ffmpeg -v error ... -f null -`: no errors | -16.5 LUFS | 53 MB |
| short1.mp4 (1080x1920) | 56.6 s | 1698 = expected | no errors | -16.5 LUFS | 11 MB |
| short2.mp4 (1080x1920) | 52.5 s | 1575 = expected | no errors | -16.4 LUFS | 8.7 MB |

Stills checked in three rounds of fixes (layout clear of the tag and captions, the shadow diagram redrawn, the Short 1 shadow diagram
refitted to the vertical frame, a 1.3 s hold after Short 1's P4 line and 1.5 s in the episode). Contact sheets: `sheet_*.jpg`.

## Running order (episode)

Cold open (silent: a pupil's laptop at night, CLICK, a game lights up, the laptop goes see-through to the chip) -> hook (one die beside a
postage stamp, then 100 billion+ switches drawn by a sweep of light) -> last time's answer (compost bin heat) -> the news (real globe:
Nvidia, Santa Clara, California; November 2026; the CEO chair and a "Jensen Huang, CEO" name plate that leaves and returns, calendar 12 -> 23 Nov;
no face) -> GPUs and pixels -> CPU vs GPU (one teacher vs a school hall) -> AI (cat or dog) -> P5 circuits (switch closed / open) -> transistors
-> "Are you ready? Three! Two! One! Go!" -> first person: dive into the beach to YOU, a grain of sand -> silica (1 Si : 2 O) cleaned and
melted -> seed crystal pulled and turned; the crystal beside the pupil (real proportions: 30 cm across, as long as the child is tall)
-> wafers (edge beside a coin at true thickness ratio) and polishing -> clean room (yellow light, filtered air, suits head to toe) ->
first person under the mask: the flash of light -> P4 light and shadows (rays in straight lines, opaque card, shadow zone, the star shadow
seen from the front) then the same on the wafer (mask, special layer, shadow keeps the pattern) -> lenses (and a hair beside a 1000x zoom)
-> layers (etch, metal, again; weeks) -> 56 dies on a 300 mm wafer, cut, tested, packed; "Now you are a chip!" -> where chips are made
(globe: Santa Clara -> Hsinchu, Taiwan; real Singapore coast with Woodlands and Tampines fabs; 1 in 10) -> the turn: data centre, hot, P4
heat flows hotter -> colder, cold plate and water -> try this -> think about it -> close (chip -> grain of sand on the beach) -> Now you know!

Not in this episode: "Welcome / Today you'll learn" (the approved script has none, and the episode would pass 5 minutes). The countdown
(series standard) was added before the journey.

## Changes from the approved script (for the teacher)

1. **The hook, fact fix (rule 5/9).** Nvidia's 208 billion transistors (Blackwell) sit on TWO dies, each about 26 x 33 mm, about the size of
   a postage stamp. So "smaller than a postage stamp ... more than two hundred billion switches" was not true. Now (the fallback wording
   the brief allowed): "This tiny square is about the size of a postage stamp. Inside it are more than a hundred billion switches." The two
   later lines follow: "So how do you build a hundred billion switches?" and the close "A hundred billion switches. Drawn with light and
   shadow." If the teacher prefers 200 billion: "These two tiny squares, each about the size of a postage stamp, hold more than two hundred
   billion switches."
2. The countdown line "Are you ready? Three! Two! One! Go!" (series standard, not in the script) before "You are a grain of sand."
3. The P4 light line is split after "...it forms a shadow." with a 1.5 s hold, so the shadow picture stays on screen (same words).

## Facts (rule 5), checked 24 Nov 2026 from the cloud

| Fact | Status | Source |
|---|---|---|
| Blackwell GPU: 208 billion transistors, two dies (so one die holds about 104 billion: "more than a hundred billion") | confirmed | Nvidia Blackwell architecture page and Nvidia's launch release (seen in search results; nvidia.com pages could not be opened from the cloud) |
| Jensen Huang stepped down 12 Nov 2026; reinstated as CEO 23 Nov 2026 (11 days) | confirmed | Nvidia press release of 23 Nov 2026 filed with the SEC (8-K, nov23pressrelease.htm; text seen in search results, sec.gov not reachable from the cloud); CBS News, NPR, CNBC, 23 Nov 2026. **NBC News article not found: to confirm before approving.** Some outlets give 11 Nov for the step-down |
| Singapore makes about 1 in 10 of the world's chips | confirmed | EDB (edb.gov.sg/en/industries/semiconductor), SingStat newsletter, A*STAR, MTI |
| Nvidia designs in the US (Santa Clara HQ); TSMC builds the newest in Taiwan | confirmed (news reports) | The Register, PC Gamer, SCMP (2025); Santa Clara HQ is common knowledge (not in the search results) |
| Wafer about 0.8 mm (775 micrometres for 300 mm); crystal up to about 2 m; seed pulled while turning | confirmed (reference articles) | Wafer (electronics), Czochralski method articles; patents |
| Clean rooms cleaner than an operating theatre | **to confirm before approving** | Fabs are ISO class 1-5; operating theatres about ISO 7 (class 10,000); no single source compares them directly |
| "Its founder, Jensen Huang" | **to confirm wording**: he is one of three co-founders (Nvidia says "Jensen Huang founded NVIDIA in 1993") |  |
| "Lenses shrink the pattern again and again" | wording note: a scanner shrinks the mask's pattern about 4 times through a column of many lenses (the picture shows that) |  |

## Pronunciation (test clip `explained2/pron_clips/Heart_explored11_new_words.mp3`, 1.2 s between sentences)

| # | Starts at | Sentence |
|---|---|---|
| 1 | 0.40 s | Nvidia's famous chips are called GPUs, graphics processing units. |
| 2 | 6.04 s | Its founder, Jensen Huang, stepped down as its boss for a short time. |
| 3 | 11.28 s | Then, eleven days later, he came back as CEO. |
| 4 | 15.47 s | An ordinary computer brain, a CPU, is like one very clever teacher, solving sums one after another. |
| 5 | 23.74 s | A chip is made of tiny switches called transistors. |
| 6 | 27.96 s | Sand is mostly silica, made of silicon and oxygen. |
| 7 | 32.51 s | You are sliced into thin round plates called wafers, thinner than a coin, and polished until you shine like a mirror. |
| 8 | 40.43 s | Nvidia designs its chips in the United States, and factories in Taiwan build the newest ones. |
| 9 | 47.64 s | Woodlands and Tampines are in Singapore. (BEFORE: Kokoro's own "TAM-pines") |
| 10 | 51.23 s | Woodlands and Tampines are in Singapore. (AFTER: the sg_pron fix "TAM-pin-ees") |

Sentences 1-8 are cut from the episode's own recording. Kokoro's phonemes: Nvidia ˈɛnvˈɪdiə ("en-VID-ee-uh"), Jensen Huang dʒˈɛnsən hwˈɑːŋ
("JEN-sun HWAHNG"), GPU(s) / CPU / CEO / AI as letters, transistors tɹænzˈɪstɚz, silica sˈɪlɪkə, silicon sˈɪlɪkən, wafers wˈeɪfɚz,
Woodlands wˈʊdləndz: all as the dictionary says, no fix. Tampines came out "TAM-pines" (tˈæmpaɪnz): added to `sg_pron.py` as tˈæmpɪnˌiːs,
PRONUNCIATION.md row "Waiting for the teacher's listen". EP11 never says Tampines aloud (map label only), so no video depends on it.
`build_tl.py` learnt gpu, gpus, nvidia's, multiplications, tampines for word timing.

## Shorts (words; NEW = not in the approved episode or script)

Short 1, "How does sand become a chip?": NEW "How does a grain of sand become a computer chip?" (question card) / first-person dive (2.6 s)
/ "You are a grain of sand." / "You are cleaned and melted until you are almost pure silicon." / wafer line / first-person flash under the
mask (2.8 s) / the P4 line / "A stencil, called a mask, ... the shadow keeps the pattern." / "A hundred billion switches. Drawn with light
and shadow." / the script's question "What blocks the light to make the pattern?" / "Watch the full episode on TheOneApp, Explored." / Now you know!

Short 2, "One teacher or a whole hall?": NEW "One clever teacher, or a whole school hall? Which works faster?" / "Nvidia's famous chips are
called GPUs, graphics processing units. They were first made to draw video games." / the CPU-GPU hall line / the AI line / the script's
question "Which finishes first: one friend with twenty sums, or twenty friends with one sum each?" / "Watch the full episode..." / Now you know!

## Weak points / to watch

- The hook's wording changed for a fact (see "Changes" 1): the teacher must OK it.
- "Its founder": Huang is one of three co-founders. "Lenses shrink the pattern again and again": one projection lens column (many lens
  elements) shrinks about 4 times. Both are approved words, left as they are; flagged for the teacher.
- Clean room vs operating theatre: true by ISO classes, but no single source says it directly (to confirm before approving).
- NBC News could not be found; the 8-K text and CBS / NPR / CNBC agree (11 days, 12 -> 23 Nov). sec.gov and nvidianews.nvidia.com do not open
  from the cloud, so the 8-K and Nvidia's Blackwell page were read through search results only.
- No "Welcome / Today you'll learn" card (the approved script has none; adding it would pass 5 minutes).
- Pictures that are simple on purpose: the transistor is a block drawing (two ends, a channel, a gate), not a real cross-section; the
  data-centre racks are icons; the AI "cat or dog" uses emoji on cards; the "1 in 10" row uses ten chip icons.
- The globe in the news and map scenes is drawn from Natural Earth 1:50m country outlines (internal borders show faintly); the Singapore
  map uses the 1:10m coast. Santa Clara, Hsinchu, Woodlands and Tampines are at their real longitude and latitude (geo11.py).
- The heat scene's change from the racks to the hotter/colder diagram is a 0.3 s cross-fade, so one contact-sheet frame shows both.
- Short 1's question "What blocks the light to make the pattern?" is answered in its own pictures (the mask); it is a recap question.
