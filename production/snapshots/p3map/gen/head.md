# TheOneApp for Primary 3: what each P3 video can link to

Checked on 11 Oct 2026 against the live app code: `origin/main` at `5df55d2` (merge of PR #67), plus branch `origin/claude/my-mind-map` at `f39193c` (PR #60, **open, not merged**). Machine-readable twin: `labs_p3.json` (one record per experiment, same order as the School Lab list). Every label below was read from the code, not from memory.

---

## 0. The ten things to know first

1. **The School Lab has 28 Primary 3 experiments**, covering all seven chapters of the P3 book (the activity-book codes 1.1 to 7.2). Every one has a built 3D bench and the same start button, **"Let's test it now!"**, as P4.
2. **Only one is live for pupils today: 1.1 "Spot and sort".** The other 27 have status `review`. A pupil does not see them at all; they show only in Admin mode or Adult mode, with an amber "In review" badge. Before a P3 video tells pupils to open experiment X, the teacher must sign X off (its record then gets `status: 'ready'`). The safe plan is to film in Admin mode, but publish each video only after its lab is signed off. Or the teacher signs off the labs in the order the videos come out.
3. **There is no lab for activity 3.4 (floating and sinking).** The list jumps from 3.3 to 3.5. A float-or-sink video has no School Lab card. Leave the card out, or point to the Mind Lab instead.
4. **The spoken line works exactly like P4:** "Open the School Lab, experiment one point two, and press, Let's test it now!" Codes with a letter are spoken with the letter: "two point one A", "six point three C".
5. **The P3 folder opens by itself.** The School Lab opens the first level that has a ready experiment. P3 comes first and 1.1 is ready, so **Primary 3 is open and Primary 4 is folded** when the page loads. Side effect on the live P4 videos: a P4 pupil now has to tap "Primary 4" before finding, say, 7.3. This document does not change that; it is only reported here.
6. **The Mind Lab has four P3 posters:** "Living & Non-Living", "Diversity of Materials", "Life Cycles" and "Magnets", each tagged P3. Chapters 1 and 2 share a poster, as do 4 and 5, and 6 and 7.
7. **The "My mind map" maker (PR #60) uses the same list.** Its chapter picker reads `window.MindLab.topics`, the Mind Lab's own list, so the P3 options are "Living & Non-Living (P3)", "Diversity of Materials (P3)", "Life Cycles (P3)" and "Magnets (P3)".
8. **Phones cannot reach Mind maps on `main` yet.** The only way in is the sun (or moon) tagged "Mind maps" in the right margin of the Questions screen, and it hides on screens narrower than 760 px. PR #60 adds a "✏️ Mind maps" pill for phones. Until it merges, the P4 line "Tap Mind maps, then, Make my own mind map" is true only on the PR branch.
9. **Quiz Yourself (the Recitation Cloud) has a P3 tab** with three chapters from the teacher's AL1 recitation tables: Living and Non-Living Things, Materials, and Life Cycles. There is no P3 magnets recitation.
10. **Mix-up busters (the opossum in the Mind Lab) has P3 cards only for Life Cycles (5) and Magnets (3).** Living & Non-Living and Materials have none. The richest P3 mix-up source is each bench's own 🏆 Challenge: every wrong option is written as one real mix-up (section 5).

---

## 1. The School Lab: the exact path a pupil follows

1. Open TheOneApp. It opens on the **Questions** screen.
2. Tap **"School Lab"** in the bottom bar (button `#nav-lab`, the last of "Questions · My Log · School Lab"). On a wide screen, the door of the lab building in the scenery opens it too. A door-light animation plays, then `lab.html` loads.
3. If asked, sign in: the page is members only ("Members sign in here.").
4. The page heading is **"Every experiment in the books."** It shows one folder per level: "Primary 3", "Primary 4", "Primary 5", "Primary 6". The **Primary 3** folder is open (its line reads "1 ready" for pupils today).
5. Inside it: **"Chapter N"** headings with the chapter name. Each experiment is a row: the code, the title, a badge ("Ready", or "In review" in Admin mode), and a line such as "Observation · about 25 minutes · runs in 3D".
6. Tap the experiment. The **Briefing** screen shows "<chapter> · <code> · about N minutes", the title, "💡 The big idea", "🔭 What we are finding out" and, where there is one, "⚠️ Stay safe". The page says: "Predict first. The moment you make a prediction, **Let's test it now!** lights up and the 3D bench opens for that part."
7. Next comes the part screen, for example "Part A · predict, then test it on the bench" (for 1.1: "Part A · think it through, then observe on the bench"), with the part's title. Then come its steps. On the 🔮 **Predict** step, tap an answer.
8. The button **"Let's test it now!"** appears under the answer. Press it.
9. The 3D bench opens full-screen over the steps and jumps straight to that part's pill. "← Back to the steps" returns.

**Inside every P3 bench** the pills read, in order: "Intro", "🧠 Before I Start", one pill per part (for example "🌱 Test the Bean Plant"), "🏆 Challenge", "Wrap-up". The P3 benches add things the P4 benches do not have:
- a six-scene **welcome tour** on first open, with a "Skip ▸" button and a 🎬 replay button;
- a **"Show me" (👀)** button on every prediction panel;
- tap-then-tap sorting, and a soft "boing" when a choice is wrong;
- a sticker for each part, and **three stars** in the Challenge;
- a 🔊 button on every caption.

**Lab-card text for the video** (same `labcard.js` card as P4): header "🧪 Try it yourself in TheOneApp", line `School Lab › <code>  <title>`, sub-line `Part (x): <part title>`, button "Let's test it now! ▶". In `prep_all.py` terms, a P3 entry looks like:
`LAB = {1: ("<segment id>", "try", "1.1", "Spot and sort", "Part (a): Spot the clues")}`, with `_lab(lead, "one point one")`.

**Part labels.** The app shows parts as "Part A", "Part B" and "Part C". The P4 videos wrote them as "Part (a): <title>". `labs_p3.json` gives both forms (`label` is the video form, `appLabel` is the app form).

**Steps-page depth.** 1.1 has the full P4-style steps page: two "What did you see?" questions per part, a written explanation marked by the marker, fill-in conclusions and two end checks. The 27 labs in review have only the set-up line, the prediction, the bench task and a "Worth knowing" note on the steps page. Their questions live in the bench's own 🏆 Challenge (five multiple-choice questions each).

---

## 2. Which lab to link for which P3 idea

| P3 idea (book chapter) | Best lab and part to name in the video | Live now? |
|---|---|---|
| What living things need and can do (Ch 1) | 1.1 Spot and sort, Part (a): Spot the clues · 1.3 Six clues, Part (a): Check the six clues | 1.1 yes; 1.3 no |
| Living things need water, food and air (Ch 1) | 1.2 The needs test, Part (a): Test the bean plant | no |
| Moving is not the same as living (Ch 1) | 1.1 Part (b): Sort them out · 1.3 Part (b): Judge living or non-living | 1.1 yes |
| Flowering and non-flowering plants (Ch 2) | 2.1A Bloom or not, Part (b): Sort plants | no |
| Six animal groups (Ch 2) | 2.1B Coat and cover, Part (b): Sort animals | no |
| Fungi and bacteria (Ch 2) | 2.2 Tiny life, Part (b): Spot the fungi · Part (c): Helpful or harmful | no |
| Classifying from evidence (Ch 2) | 2.3 The mystery creature, Part (b): Decide the group | no |
| Objects and materials (Ch 3) | 3.1 What is it made of?, Part (a): Count the parts | no |
| Strength (Ch 3) | 3.2 The snap test, Part (a): Hold the load | no |
| Flexibility (Ch 3) | 3.3 The bend test, Part (b): Bend the plastic | no |
| Floating and sinking (Ch 3) | **no lab** (activity 3.4 was not built) | n/a |
| Waterproof (Ch 3) | 3.5 The drip test, Part (b): Drip on sheet two | no |
| How much light passes through (Ch 3) | 3.6 The light box, Part (b): Shine on sheet two | no |
| Choosing a material for its use (Ch 3) | 3.7 Match the job, Part (b): Why this material? | no |
| Designing and improving (Ch 3) | 3.8 Upgrade it, Part (b): Test the upgrade | no |
| Young and adult; what a life cycle is (Ch 4) | 4.1 Find my young, Part (a): Match young to adult | no |
| Plant life cycle (Ch 4) | 4.2 Seed to plant, Part (b): Build the life cycle | no |
| Three-stage and four-stage cycles (Ch 5) | 5.1 Three stages or four, Part (b): Four-stage animals | no |
| Comparing life cycles (Ch 5) | 5.2 Compare life cycles, Part (b): Different number of stages | no |
| Attract and repel (Ch 6) | 6.1A Magnet pairs, Part (a): Bar magnet pair · 6.3A The magnet cart, Part (b): Like poles facing | no |
| Magnetic and non-magnetic materials (Ch 6) | 6.1B Magnetic materials, Part (a): Test the metal objects | no |
| Poles are the strongest parts (Ch 6) | 6.2 Magnet poles, Part (a): Test the bar magnet | no |
| Floating ring magnets (Ch 6) | 6.3B Ring magnets, Part (a): Stack the rings | no |
| Is it a magnet? (repulsion test) (Ch 6) | 6.3C Magnet or not?, Part (a): Test the objects | no |
| Freely suspended magnet and compass (Ch 6) | 6.4 A magnet at rest, Part (c): Compare with a compass | no |
| Stroke method (Ch 7) | 7.1A Make a magnet by stroking, Part (a): Make a magnet | no |
| Electromagnet (Ch 7) | 7.1B Make a magnet with electricity, Part (b): Test the strength | no |
| Designing a magnetic toy (Ch 7) | 7.2 Create a toy, Part (a): Choose and place the magnets | no |

---

## 3. Every P3 experiment, exactly as the app names it

Source of truth: `labs-p4.js` (the `SOON_P3` list plus the full `p3-1-1` record), `labs-review.js` (the 27 records in review), the `/api/lab` chapter numbering, and each bench page `labs/<folder>/index.html` (bench name, intro button and pills). The "Predict" and "Does" lines are the app's own words (not the textbook's). "Script check" lines compare the lab with the book's wording; see the P3 `content_map.md` and the definitions file for the exact wording.
