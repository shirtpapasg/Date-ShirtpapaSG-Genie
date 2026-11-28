# Art and direction research: what the most-viewed animated science and kids' explainers do

For the "TheOneApp, Explained" revamp (P3 to P6). Written 19 Nov 2026 by the art-direction agent.
We take PRINCIPLES only. We never copy any channel's look, characters, names, layouts or music.

How this was made: the seven examples are the teacher's (`success_examples.md`); the notes on them come from the teacher's own
summary, each video's public title and thumbnail premise, and the studios' own pages. I could not watch the videos from this
machine, so nothing here is a frame-by-frame claim. The extra sources were found by web search on 19 Nov 2026.

## A. The teacher's seven examples: what each one teaches us about ART and DIRECTION

| # | Example | Art and direction principle | What we do with it |
|---|---|---|---|
| 1 | Sesame Street, "Elmo Visits the Farm" https://www.youtube.com/watch?v=GOSF1qlBO54 | Characters look straight at the viewer and ask for help. A field trip to a real place. Big, simple, saturated shapes; one character colour each. Many short segments. | Buddies face the camera with eye contact in every game beat. One "class trip" segment per episode in a real Singapore place (frame g: Kranji). One aura colour per buddy, never shared. |
| 2 | Dr. Plants, "World's Biggest vs Smallest Egg" https://www.youtube.com/watch?v=BthfXVCRWEQ | "X vs Y" is drawn as a split picture: two things, same pose, same size on screen, one difference. | Thumbnail type "X vs Y" and the lock-in screen share one layout: left choice, right choice, the object in the middle. |
| 3 | Dr. Plants, "Simulating Africa for 100 Days" https://www.youtube.com/watch?v=M3oT3-4sSOY | A mini-world in a box; a big day counter that never leaves the screen; time-lapse; the payoff held to the end; close-ups. | The "30-day box" with a flip-calendar day counter in a fixed corner and a 30-dot progress row (frame f). Thumbnail type "Day 1 vs Day 30". |
| 4 | Aquarium Info, "I Turned my Bed into a Fish Tank!" https://www.youtube.com/watch?v=HH2gKrl22Fw | An absurd, visible premise; the build shown step by step; one big reveal object. | The buddies BUILD the sorting machine and the box on screen. Thumbnail type "big reveal object": one object, huge, glowing, with a buddy reacting. |
| 5 | Journey to the Microcosmos, "The Incredible World of Bacterial Communities" https://www.youtube.com/watch?v=GvQrH8qas0Q | Tiny life as a beautiful, calm world: dark or softly lit field, organic shapes, slow drift, shots that breathe, almost no text. | The "micro-world" mode: soft backlight, translucent layers, glow, slow drift, one caption at most, no scoreboard (frame b). The contrast with the bright game mode is the point. |
| 6 | Kurzgesagt, "AI Just Crossed the Terrifying Line" https://www.youtube.com/watch?v=ujkD4SxPKOI | Flat vector shapes, one strong palette, glow on dark, layered depth and parallax, constant gentle motion, icon-clear diagrams, every frame worth pausing on. | The polish bar. A fixed palette in code (`kit/style.js`), three depth planes in every scene, one key light, glow reserved for "the thing that matters". |
| 7 | Kurzgesagt, "Black Holes Explained" https://www.youtube.com/watch?v=e-P5IFTqB98 | A few visual metaphors reused through the film; scale shown by comparison; each picture answers the question the last one raised. | Recurring devices: the two gates, the ring timer, the Mark Sentence card, the day counter. Scale shown with Singapore things ("You: the size of an ant", an HDB block, an MRT train). |

## B. Extra sources (principles, with links)

1. **Design the metaphor before the drawing.** Kurzgesagt's own process page says the team fixes the visual metaphor for each scene
   at the sketch stage, then illustrates, mixing vector illustration and infographics. https://kurzgesagt.org/youtube/
   For us: every scene in a script names its ONE picture idea before anyone draws.
2. **Simple, bright, round.** An arts review of their work describes the look as simple shapes, round forms and a vivid palette, which
   is why complicated ideas feel friendly. https://artsatmichigan.umich.edu/ink/2019/09/27/simple-bright-beautiful-the-work-of-kurzgesagt
   For us: round corners everywhere, no sharp or scary shapes, no black.
3. **Signalling and coherence (Mayer).** Learning improves when extra material is removed (coherence) and the essential thing is
   highlighted (signalling); labels belong next to the part they name (spatial contiguity), and words are spoken as the matching
   picture shows (temporal contiguity). Summary of Mayer's principles:
   https://www.unh.edu/teaching-learning-resource-hub/sites/default/files/media/2023-06/itow-research-based-principles-for-designing-multimedia-instruction-mayer.pdf
   and https://my.chartered.college/?p=6958
   For us: glow and the sun-yellow highlight are the ONLY signal colours, and they mark only the thing being talked about. Labels
   touch their part with one plain line (the teacher's rule). No decoration that moves during a teaching sentence.
4. **Thumbnails: faces are common, not magic; the shrink test matters.** A vidIQ study of 500 breakout videos found faces on 69%
   (80% of the top 50), and notes that contrast is what survives a phone-sized thumbnail. A larger Eden analysis (507,478 videos) found
   faces, brightness and saturation barely separate winners from losers, and that a specific title and an ambitious premise matter
   more. Both are about general (mostly adult) channels. https://vidiq.com/research/youtube-thumbnail-study/ and
   https://eden.so/blog/what-makes-a-good-youtube-thumbnail/
   For us: the premise comes first (one object, one question). A buddy's face is there for warmth and brand, small enough never to
   hide the object. Every thumbnail is checked at 320 px wide.
5. **Children's channels behave differently.** A 2025 study of 38,598 videos from top children's channels found thumbnail features do
   help predict views and that children's viewing needs its own design rules (the abstract does not say which features).
   https://aisel.aisnet.org/pacis2025/is_education/is_education/9
   For us: test our four thumbnail types against each other with YouTube's own "Test and compare"; do not assume adult-channel rules.
6. **A thumbnail must keep its promise.** Packaging that promises what the video does not deliver gets clicks, then loses watch time
   and trust (same vidIQ and Eden pages). For us: the thumbnail picture is always a real frame idea from the episode.

## C. The ten principles we carry into the style guide

1. One picture idea per scene; say it in a sentence before drawing it.
2. One palette, in code, for every episode and thumbnail: a channel recognised from a single frame.
3. Two visual modes that contrast: the bright GAME world and the soft, glowing MICRO-WORLD. The switch itself is an event.
4. Three depth planes in every scene (far soft, mid sharp, near dark and blurred), moving at different speeds.
5. One key light per scene; glow marks only what matters.
6. Round, soft, friendly shapes; self-coloured outlines; no black, nothing frightening.
7. Something always moves gently (drift, breathing, dust), but nothing new moves while a teaching sentence is spoken.
8. Recurring devices the child learns once: gates, ring timer, Mark Sentence card, day counter, scoreboard.
9. Characters look at the viewer and ask for help; the viewer is "YOU" on screen.
10. Drawn, but true: real proportions, real Singapore places, correct science at primary level, exact textbook wording on cards.
