# TheOneApp, Explained: timestamp audit (2026-11-23)

The teacher (23 Nov): "ensure all TheOneApp Explained youtube videos are all time stamped clearly, so they are linked correctly to the
correct video to watch when the mindmap AI marked them."

How a mistake becomes a link: `moments.js` `momentFor()` picks a moment `{ at, what, keys }` of an episode in `videos.js`;
`watch.js` draws "Watch the part that explains this · m:ss" (`videos.html#play=<id>&t=<s>`); the mind map (`mymap.js` `watchSpot`)
asks with `{ chapter: <map title>, level, text: <row + hint + fix> }`, so for the mind map a moment is found only through its
**chapter** plus at least two shared words between its `what` and the marker's text.

Checked against: YouTube Data API `videos.list` (privacy, `contentDetails.duration`, description first line, existing chapters),
`production/youtube/explained_uploaded.json` (newest key per episode) and the render timelines
`workspace/explained2/epNN/tl_p1.json` / `tl_p2.json`.

## Findings on `main` (before this change), by level

| Level | Entries | Live and public | Retired upload in the app | Moments | Problems |
|---|---|---|---|---|---|
| P3 | 18 | 18 | **8** (EP2, 3, 4, 5, 6, 7A, 7B, 8: description starts "▶ NEW VERSION") | 66 | see below |
| P4 | 22 | 22 | 0 | 87 | none blocking (see below) |
| P5 | 8 | 8 | 0 | **0** | no moments at all; shelves never matched a chapter |
| P6 | 12 | 12 | 0 | 66 | none blocking (see below) |
| Explored (not Explained, noted) | 12 | 12 | **2** (EP5 `qvJ-D5yKsaI`, EP12 `isq1RcHdBcU`) | 61 | old pre-pronunciation-fix uploads |

### P3 (the main problem)
- **8 links went to retired classic videos** (EP2 `hHXI7B1Qg8A`, EP3 `-xdqLxDUUgI`, EP4 `sO31eHgDCGI`, EP5 `hPr9v0QXres`, EP6
  `D9NxEvJuneI`, EP7A `5fBBrJMrAcU`, EP7B `X7Ys0KAaYyg`, EP8 `_gRJ0NwV6p0`); 29 of their moments pointed into those old videos.
  (The EP2/EP3 revamp links were on branch `claude/p3-ep03-revamp`, never merged.)
- **26 of the 28 live revamp parts (2A to 14B) were missing** from the app; only 1A and 1B were in, and with **no moments**, so every
  P3 Living Things mistake opened a video at 0:00.
- Mind-map special (EP0, `zxerWQ9zGII`, 4:06): the video was re-cut; 4 of 6 moments no longer sat on the idea they name and
  `4:26` was **past the end** of the video.
- Classics EP9 to 14B (life cycles, magnets) are live and current; their moments match the chapters in their descriptions, but
  they had **no keys**, and their numbers 14A/14B collide with the revamp's 14A/14B.
- **The mind map could not reach P3 classification or materials moments by chapter**: the mind map passes "Living & Non-Living",
  "Diversity of Materials", "Life Cycles", "Magnets"; watch.js adds the syllabus name; the shelves are "Classifying Living Things",
  "Materials". `moments.js` only compared the shelf name.

### P4
All 22 links live, public, current; every `len` within 1 s; every moment inside its video. 82 of 87 moments sit exactly on a chapter
in the description (the chapters were made from the same render timeline). Five start inside a chapter, on a later line of it
(P4 1 `1:02`, 14 `1:46`, 19 `1:34`, 20 `0:45`, 22 `0:40`); these are plausible but the P4 render timelines are not in this
workspace, so they could not be checked to the line. No change.

### P5
All 8 live and current, but **no moments**, and the shelves ("Reproduction", "Water", "Respiratory System") are not the syllabus
chapter names the mind map passes, so a P5 mind-map mistake found nothing. Fixed (moments from the description chapters, plus
chapter keys).

### P6
All 12 live and current; moments match the description chapters; shelves are the syllabus chapter names, so the mind map reaches
them. Keys are empty (only chapter + words). Not changed; P6 outcome and misconception keys could be added later.

### Timelines vs the live videos (P3 revamp)
Every live part's timeline END matches the live length to within 1.2 s. Version notes:
EP5 is v3 (`zexMf4fY7Ms` / `1FGxQNHwrUo`, patched spans; `ep05/tl_p*.json` = v3, 304.3 / 308.0 s).
EP6 is the v2 patch (`fNZuqF2zDww` / `Ojuq9XJI66E`): `ep06/tl_p*.json` (312.6 / 312.3 s) is the live one; `ep06/out/live/` holds
the v1 timelines (they differ only after 4:35, past every moment). EP12 = v4, EP13 = v2, EP14 = v3 as rendered.
**No part's timeline failed to match.**

| Part | Live video | Live length | Timeline END | Matches | App moments | YouTube chapters |
|---|---|---|---|---|---|---|
| 1A | `LFOr_y9No7g` | 5:06 | 305.4 s (`ep01/tl_p1.json`) | yes | 6 | 8 |
| 1B | `3KyRNndmUU8` | 4:50 | 289.7 s (`ep01/tl_p2.json`) | yes | 6 | 8 |
| 2A | `0GMt5_Z56Ds` | 4:59 | 298.5 s (`ep02/tl_p1.json`) | yes | 9 | 10 |
| 2B | `23sA7ZKKIFU` | 4:59 | 298.2 s (`ep02/tl_p2.json`) | yes | 7 | 8 |
| 3A | `fk5iHK_12hg` | 4:56 | 295.3 s (`ep03/tl_p1.json`) | yes | 9 | 10 |
| 3B | `VQQmu6Gjfhc` | 5:00 | 299.8 s (`ep03/tl_p2.json`) | yes | 10 | 12 |
| 4A | `sZZh7fjmaKQ` | 4:59 | 298.9 s (`ep04/tl_p1.json`) | yes | 10 | 11 |
| 4B | `HCDeYV32P8w` | 5:02 | 301.4 s (`ep04/tl_p2.json`) | yes | 9 | 10 |
| 5A | `zexMf4fY7Ms` | 5:05 | 304.3 s (`ep05/tl_p1.json`) | yes | 11 | 12 |
| 5B | `1FGxQNHwrUo` | 5:09 | 308.0 s (`ep05/tl_p2.json`) | yes | 12 | 11 |
| 6A | `fNZuqF2zDww` | 5:13 | 312.6 s (`ep06/tl_p1.json`) | yes | 13 | 11 |
| 6B | `Ojuq9XJI66E` | 5:13 | 312.3 s (`ep06/tl_p2.json`) | yes | 10 | 12 |
| 7A | `v1WKPqkfQ7w` | 5:18 | 317.2 s (`ep07/tl_p1.json`) | yes | 10 | 11 |
| 7B | `PBoXgjYIun4` | 5:16 | 315.5 s (`ep07/tl_p2.json`) | yes | 10 | 11 |
| 8A | `5-JcNGeLviE` | 5:50 | 349.6 s (`ep08/tl_p1.json`) | yes | 11 | 13 |
| 8B | `rfRyqc4PLXQ` | 5:28 | 327.1 s (`ep08/tl_p2.json`) | yes | 11 | 13 |
| 9A | `JMpROK4Cz2c` | 5:10 | 309.9 s (`ep09/tl_p1.json`) | yes | 9 | 11 |
| 9B | `mbUzXp6CKbs` | 4:58 | 297.3 s (`ep09/tl_p2.json`) | yes | 8 | 9 |
| 10A | `d0jyiDdL2sA` | 4:51 | 290.2 s (`ep10/tl_p1.json`) | yes | 9 | 10 |
| 10B | `HjN5HO7qFnY` | 5:09 | 308.9 s (`ep10/tl_p2.json`) | yes | 9 | 9 |
| 11A | `ABTKBrfkDW0` | 4:55 | 294.6 s (`ep11/tl_p1.json`) | yes | 9 | 10 |
| 11B | `q2KJp6lKln0` | 5:06 | 305.1 s (`ep11/tl_p2.json`) | yes | 9 | 11 |
| 12A | `zCCVRRtDffc` | 5:21 | 320.1 s (`ep12/tl_p1.json`) | yes | 10 | 12 |
| 12B | `Mb9XNdpTSrk` | 5:22 | 321.0 s (`ep12/tl_p2.json`) | yes | 9 | 10 |
| 13A | `HcwbIH3rnhk` | 5:23 | 322.1 s (`ep13/tl_p1.json`) | yes | 10 | 12 |
| 13B | `tCqnQReFySw` | 5:21 | 320.5 s (`ep13/tl_p2.json`) | yes | 9 | 11 |
| 14A | `zWkifG2E82A` | 5:38 | 337.7 s (`ep14/tl_p1.json`) | yes | 10 | 12 |
| 14B | `wIKe2y3lxgs` | 5:34 | 333.1 s (`ep14/tl_p2.json`) | yes | 10 | 10 |

## What changed

theoneapp, branch `claude/explained-timestamps` (from `origin/main`, with the unmerged EP2/EP3 revamp commits cherry-picked):
- `videos.js` P3: the 28 live revamp parts 1A to 14B, each with 6 to 13 moments (265 in all) taken from its timeline: one per idea a
  pupil can get wrong (each Mark Sentence, look-closer, round question, answer explanation, Showdown fix, and the journey). `at` is
  1.5 s before the idea's first spoken line (floored to the second). `what` is a plain title carrying the idea's own words, so the
  marker's text matches it. Keys: the syllabus outcome, the chapter (syllabus name, plus "Living & Non-Living" for classification
  because the mind map files it there), and misconceptions / mix-up cards where they fit (M-33 float/sink, M-34 one property,
  mix:lifecycles:62 insect, mix:lifecycles:64 many eggs). The 8 retired classics are removed. The classics with no revamp yet
  (life cycles 9, 10, 11 and magnets 12, 13, 14A, 14B) stay, **renumbered 15, 16, 17, 18, 19, 20A, 20B**, with keys added
  (M-28, M-29, M-35, M-36, mix:magnets:24/26, mix:lifecycles:63). Mind-map special: moments re-timed to the re-cut video.
- `videos.js` P5: 38 moments from the description chapters, with outcome, chapter and misconception keys (M-11, M-27, M-30, M-31,
  M-32; mix:reproduction, mix:water:9, mix:respcirc).
- `videos.js` Explored: EP5 and EP12 point at the current uploads (`Y_EeXelH3mY`, `5qYFvo33xVc`; same length and chapters).
- `moments.js`: a moment counts as in the error's chapter when its shelf **or one of its keys** names that chapter.
- `spell-words.js`: combs for 4A to 14B made from the old classic combs' words (Heart's clips already exist); classic combs renumbered.
  Several shelves have only 1 to 3 words until Heart records the rest (see the SHORT list in `tests/spell-complete.test.mjs`).
- Tests: keys may name a chapter; every moment of every episode must sit inside it; mind-map chapter labels must reach the revamp.
  `npm test`: 578 of 579 pass; the one failure (Fun Fair booth page) fails on `main` too.

Genie repo: `production/youtube/chapters_p3.json` (the 28 parts: Intro at 0:00, the app's moments, and "Your score, key words and
next time"; a moment less than 10 s after the previous chapter is left out of YouTube's list only) and
`production/youtube/apply_chapters.py` (dry run by default; `--apply` writes; never touches the title, tags, category, privacy or
the first line). **Not yet applied.**

## momentFor check (P3 mistakes as the mind map sends them: chapter = the map title, through watch.js)

```
Living & Non-Living | Living things need water. The plant drooped because it d -> 2A 2:31 "All living things need water: plants, animals and you"  videos.html#play=0GMt5_Z56Ds&t=151
                                                                                 timeline: 2A [scene who] "All living things such as plants and animals need water."
Living & Non-Living | A wind-up robot can move so it is a living thing.        -> 1A 2:32 "The wind-up robot moves, yet it is a non-living thing"  videos.html#play=LFOr_y9No7g&t=152
                                                                                 timeline: 1A [scene r1ev] "Watch. The robot stops. A spring inside was pushing it."
Living & Non-Living | A plant does not need food because it does not eat. Plan -> 2B 2:05 "Plants need light to make their own food"  videos.html#play=23sA7ZKKIFU&t=125
                                                                                 timeline: 2B [scene mark2] "Say it with me!"
Living & Non-Living | A mimosa folds its leaves because it is shy. It responds -> 3A 2:11 "The mimosa folds, then opens: it responds to a change"  videos.html#play=fk5iHK_12hg&t=131
                                                                                 timeline: 3A [scene reveal] "The answer is two. The leaves opened again."
Living & Non-Living | A non-flowering plant has spores. A fern reproduces from -> 4B 2:21 "A fern reproduces from spores kept in spore bags"  videos.html#play=HCDeYV32P8w&t=141
                                                                                 timeline: 4B [scene reveal] "No flowers. No seeds. A fern reproduces from spores, kept in"
Living & Non-Living | A mushroom is a plant. Mushrooms belong to the fungi gro -> 4A 1:46 "Mushrooms belong to the fungi group"  videos.html#play=sZZh7fjmaKQ&t=106
                                                                                 timeline: 4A [scene open3] "The answer is three. A mushroom is not a plant: it does not "
Living & Non-Living | A bat is a bird because it has wings. A bat is a mammal  -> 6B 1:22 "A bat is a mammal: it has wings and fur, a bird has feathers"  videos.html#play=Ojuq9XJI66E&t=82
                                                                                 timeline: 6B [scene reveal] "The answer is two. A bat is not a bird. It is a mammal!"
Living & Non-Living | A spider is an insect. Insects have six legs and three b -> 6A 1:06 "Count the ant: six legs, two feelers, three body parts"  videos.html#play=fNZuqF2zDww&t=66
                                                                                 timeline: 6A [scene ant] "Count with me! One, two, three, four, five, six. Six legs!"
Living & Non-Living | All bacteria are harmful. Some bacteria are useful.      -> 7B 2:12 "Some bacteria are harmful, others are useful"  videos.html#play=PBoXgjYIun4&t=132
                                                                                 timeline: 7B [scene mark1] "Say it with me!"
Diversity of Materials | Glass is fragile, metal is strong.                    -> 9A 4:08 "Glass is fragile, metal is strong"  videos.html#play=JMpROK4Cz2c&t=248
                                                                                 timeline: 9A [scene fragile] "Glass is fragile, but metal is strong. A glass cup breaks ea"
Diversity of Materials | Heavy things sink and light things float. A ship floa -> 10A 1:33 "A heavy ship floats and a light spoon sinks"  videos.html#play=d0jyiDdL2sA&t=93
                                                                                 timeline: 10A [scene holdon] "Arms crossed? One finger up! The giant ship is very heavy, a"
Diversity of Materials | A rubber band is flexible: it bends without breaking. -> 9B 1:24 "Flexibility: a flexible material bends without breaking"  videos.html#play=mbUzXp6CKbs&t=84
                                                                                 timeline: 9B [scene mark1] "Say it with me!"
Diversity of Materials | Frosted glass is translucent: only some light passes  -> 11A 3:15 "Translucent: frosted glass lets only some light pass through"  videos.html#play=ABTKBrfkDW0&t=195
                                                                                 timeline: 11A [scene mark2] "Say it with me!"
Diversity of Materials | Waterproof materials do not absorb water.             -> 10B 1:36 "Waterproof materials keep water out completely"  videos.html#play=HjN5HO7qFnY&t=96
                                                                                 timeline: 10B [scene mark1] "Say it with me!"
Diversity of Materials | Choose a material suitable for the intended use of th -> 12B 3:49 "Choose a material suitable for the intended use"  videos.html#play=Mb9XNdpTSrk&t=229
                                                                                 timeline: 12B [scene board] "It is important to choose a material whose physical property"
Life Cycles | A cycle repeats: a repeated pattern of change.                   -> 14A 3:45 "Cycles are repeated patterns of change"  videos.html#play=zWkifG2E82A&t=225
                                                                                 timeline: 14A [scene mark2] "Say it with me!"
Life Cycles | Day and night are caused by the rotation of the Earth.           -> 14A 3:10 "Day and night: the Earth's rotation takes 24 hours"  videos.html#play=zWkifG2E82A&t=190
                                                                                 timeline: 14A [scene mark1] "Say it with me!"
Life Cycles | A chick looks like the adult.                                    -> 16 0:39 "A chicken: egg, chick, adult; the chick looks like its parent"  videos.html#play=2Atm-edXKVk&t=39
                                                                                 timeline: (classic or other level)
Life Cycles | A life cycle ends at the adult.                                  -> 14B 2:49 "Egg, chick, adult chicken, egg again: a life cycle"  videos.html#play=wIKe2y3lxgs&t=169
                                                                                 timeline: 14B [scene ring] "First an egg, then a chick, then an adult chicken, and then "
Magnets | All metals are attracted to magnets.                                 -> 18 1:13 "Magnets attract iron and steel; other metals are non-magnetic"  videos.html#play=VLGDU0qduEw&t=73
                                                                                 timeline: (classic or other level)
```
