# TheOneApp for Primary 5: what each P5 video can link to

Checked on 11 Oct 2026 against the local clone `/home/user/theoneapp`. The working tree is on branch `terms` at `dd577da` ("Add terms of service page"), which is one commit on top of `main` at `8b2ac6c` (merge of PR #97). `origin/main` is also at `8b2ac6c`. That extra commit was not diffed: apart from one read-only `git log`/`git status` at the start, no git was run. The "My mind map" work (PR #60) is now on `main`: `mymap.js`, the "✏️ Make my own mind map" button (`mindmap.html` line 500) and the "✏️ Mind maps" pill (`index.html` line 977). Machine-readable twin: `labs_p5.json` has one record per built experiment, in the same order as the School Lab list. Every label below was read from the code, not from memory.

---

## 0. The ten things to know first

1. **The School Lab has 40 built Primary 5 experiments.** They cover all six P5 chapters, with activity-book codes 1.2 to 6.6, including 1.5A–1.5D and 4.2A/4.2B. The records are `"p5-1-2"` to `"p5-6-6"` in `labs-review.js` (lines 2317–9927); the benches are `labs/p5-*/index.html`. Every one has a 3D bench and the same start button, **"Let's test it now!"**.
2. **None of them is live for pupils.** All 40 have status `review`; 0 are `ready`. A pupil does not see them at all. They show only in Admin mode or Adult mode, with an amber "In review" badge (`lab.html` lines 799 and 804). Before a P5 video tells pupils to open experiment X, the teacher must sign X off; its record then moves to `labs-p4.js` with `status: 'ready'`. Film in Admin mode, but publish each video only after its lab is signed off (or sign the labs off in episode order).
3. **1.1 "Basic Unit of Life" has no lab.** No `p5-1-1` record exists in `labs-review.js`, and there is no `labs/p5-1-1/` folder. The list still shows it, from the coming-soon line in `labs-p4.js` line 2135, as "1.1 Basic Unit of Life · Coming soon". Its line under the title reads just "Experiment" (no minutes, no "runs in 3D"), and it cannot be tapped. Its notes exist (`labs/briefs-p5/1.1.md`), but line 3 says "the teacher has ruled cells outside this level; build only at the teacher's word" (also `labs/BRIEF-P5.md` §5). A cells video therefore gets `lab: null`. This ruling contradicts `syllabus-p3p5.js` line 17, which lists "Recognise that a cell is a basic unit of life" as a P5 outcome; see §7.
4. **The Primary 5 folder is folded when the page loads.** The School Lab opens the first level with a ready experiment (`lab.html` line 808). That is Primary 3 (1.1 Spot and sort is ready). So a P5 pupil must first tap **"Primary 5"**. Today its line reads "1 coming soon", because labs in review are not counted (lines 810–811). Inside, all six "Chapter N" headings are drawn even when every lab under them is filtered out (lines 803–804). A pupil therefore sees 1.1 "Coming soon" under Chapter 1, and five empty chapter headings.
5. **The spoken line works exactly as in P3 and P4:** "Open the School Lab, experiment two point four, and press, Let's test it now!" Codes with a letter are spoken with the letter: "one point five A", "four point two B". Because of point 4, you may want to add the folder: "Open the School Lab, tap Primary 5, then experiment two point four…". The kit does not need it; it is a script choice.
6. **The P5 benches are a new engine with more to do than P3 or P4.** Each part has a prediction with a reason for every option, a **variables box** (its chips read "Changed variable", "Measured variable" and "Constant variables (kept the same)"), up to three runs with an **Average** row, and a graph where the pupil taps the trend. The bench's 🏆 Challenge has **3 multiple-choice questions, then 3 typed questions** that the app's marker marks. Details in §1.
7. **The Mind Lab has four P5 posters and one P4/P5 poster:** "Reproduction in Plants", "The Water Cycle", "Circulatory System", "Electrical System" (all tagged P5), and "Plant System" (tagged P4/P5). **There is no human-reproduction poster and no respiratory-only poster.** Chapters 5 and 6 share "Electrical System". Posters, word for word, are in §4.
8. **The "My mind map" maker uses the same list.** The P5 options in its picker are "Reproduction in Plants (P5)", "The Water Cycle (P5)", "Circulatory System (P5)", "Plant System (P4/P5)" and "Electrical System (P5)". The chapter names to speak are **Reproduction in Plants · The Water Cycle · Plant System · Circulatory System · Electrical System**.
9. **Quiz Yourself (the Recitation Cloud) has a "Primary 5" tab with two chapters:** "Plant and Human Reproduction" (24 answers) and "Water and the Three States" (17 answers, shown as "Chapter 5"). There is no P5 recitation for plant transport, the respiratory and circulatory systems, or electricity.
10. **Mix-up busters has 31 cards on the five P5 posters:** Reproduction in Plants 7, The Water Cycle 8, Circulatory (and Respiratory) 4 and Electrical System 7 (26 tagged P5), plus Plant System 5 (tagged P4). Four of the Electrical cards are not P5 content: #16 and #20 are about electromagnets, and #17 and #18 use energy words (P6). The richest P5 mix-up source is the benches: 26 of the 40 Challenges have a question tagged "The trap", and every prediction option carries the reason pupils give (§5).

---

## 1. The School Lab path a pupil follows

1. Open TheOneApp. It opens on the **Questions** screen.
2. Tap **"School Lab"** in the bottom bar (button `#nav-lab`, the last of "Questions · My Log · School Lab"). On a wide screen, the door of the lab building in the scenery opens it too.
3. If asked, sign in: the page is members only ("Members sign in here.", `lab.html` line 579).
4. The page heading is **"Every experiment in the books."** (line 815), with one folder per level: "Primary 3", "Primary 4", "Primary 5", "Primary 6". **Primary 3 is open; tap "Primary 5"** (its line reads "1 coming soon" today; once labs are signed off it reads "N ready · 1 coming soon").
5. Inside it are six **"Chapter N"** headings, numbered by the `/api/lab` list in book order: 1 Reproduction in Animals and Plants, 2 Cycles in Water, 3 Plant Transport System, 4 Respiratory and Circulatory Systems, 5 Electrical Systems, 6 Series and Parallel Circuits. Each experiment row has the code, the title, a badge ("Ready", or "In review" in Admin mode) and the line **"Experiment · about 25 minutes · runs in 3D"** (or "about 30 minutes" for the 15 three-part labs). Every P5 record has `kind: 'lab3d'` (`labs-p4.js` line 2205), so all of them say "Experiment", even the observation and sorting labs.
6. Tap the experiment. The **Briefing** shows "<chapter> · <code> · about N minutes", the title, "💡 The big idea", "🔭 What we are finding out", "⚠️ Stay safe" where there is one (21 of the 40 labs have one), and "Predict first. The moment you make a prediction, **Let's test it now!** lights up and the 3D bench opens for that part."
7. Next comes the part screen: **"Part A · predict, then test it on the bench"** (the same for all 95 P5 parts), with the part's title. On the steps page each part has five steps: a set-up line, 🔮 **Predict**, the bench task, 👀 **"What did you see?"** (one question after the test), and ✨ "Worth knowing" (the note). The P5 records have no fill-in conclusions and no end checks; their written questions live in the bench's Challenge.
8. Tap a Predict answer. **"Let's test it now!"** appears; press it.
9. The 3D bench opens full-screen over the steps, on that part's pill. "← Back to the steps" returns.

**Inside every P5 bench** the pills read, in order: "Intro", "🧠 Before I Start", one pill per part (for example "🔆 Warmer or Cooler"), "🏆 Challenge", "Wrap-up". What is new compared with P3 and P4 (engine in every `labs/p5-*/index.html`; line numbers below are from `labs/p5-1-2/index.html`):
- **Welcome tour** (lines 862–871). It has seven scenes, named "Look Around", "Choose your steps!", "Your Prediction", "Select Variable(s)", "Run the Test", "Study the Results", and "Average and Next" (or "Answer and Next"). It has six when the first part has no variables box. There is a "Skip ▸" button, a 🎬 replay button ("Show me round"), and a "👀 Show me the bench" button (it toggles to "✓ Done looking").
- **The prediction comes with reasons.** Every part opens on a panel with three options, and each option has a reason. The wrong reasons are the mix-ups pupils actually hold (`labs/BRIEF-P5.md` §2). `labs_p5.json` gives them as `parts[].predictOptions`.
- **The variables box ("Select Variable(s)").** It has three chips: **"Changed variable"**, **"Measured variable"** and **"Constant variables (kept the same)"**. Line 853 calls these "the full terms pupils must use (teacher, 2026-10-10)". The pupil taps a chip and picks from three. A wrong pick bounces with "Which of these did you change on purpose?", "Which of these did you measure each time?" or "Which of these stayed the same in every run?" (line 854). Note that `BRIEF-P5.md` §4 still says "Changed · Measured · Kept the same" and "Which one did you decide to make different?"; the built pages use the words above. The box appears on **72 of the 95 parts**. It is left out on the 22 tap-task parts (sorting, labelling, ordering: `run.type` "choice" or "sequence") and on 1.5B Part (b), which is marked `fair: false` (lines 856–859). See §7 for the 33 parts where the bench shows a variables box but the lab's notes call the part an observation.
- **Repeat and average.** "Run again" works up to three times (`MAXRUNS = 3`, line 855). An **Average** row then appears, with the note "Repeating and finding the average makes the result more reliable." (line 1470). The outlier warning ("This reading is far from run 1. It is an outlier. Reject it and run again.", line 1464) appears only when the URL has `?outlier=`; the rate is 0 by default (lines 890–892), so a pupil never sees it.
- **The pupil finishes the graph.** The points are plotted; the pupil taps the trend ("increases / stays the same / decreases") and the line draws. That tap is the "What did you see?" question.
- **Time dials and "See inside" views** for slow or hidden things (a week of germination, a loop of blood, electricity in glass wires).
- **The 🏆 Challenge has six questions.** First come 3 multiple-choice questions, shuffled on every visit; then 3 typed questions (one "define" [1 mark], two "explain" [2 marks]), marked by the app's marker (`lab.html` lines 1462–1487). The buttons read "Check my answer", "Next question →" and "See my results →". When the bench is opened on its own, outside the app, the typed questions can only be saved ("Save my answer"), not marked. `BRIEF-P5.md` and every brief say "Five questions"; the built benches have 3 + 3.

**Part labels.** The app shows "Part A", "Part B" and "Part C"; the videos write "Part (a): <title>". `labs_p5.json` gives both (`label` and `appLabel`).

**A loophole to know about, not to use.** A review lab is hidden only in the list. `lab.html#a/p5-2-4` opens it for any signed-in member: `route()` at lines 742–744 and `openActivity()` at lines 826–833 never check the status, and `api/lab.js` lines 58–61 return any record. Never put such a link in a video description before the lab is signed off.

---

## 2. Which lab to link for which P5 idea

Episode numbers are those in `00_series_plan.md`. "Live now?" is "no" for every row, because all 40 labs are in review.

| P5 idea (book chapter, episode) | Best lab and part to name in the video | Live now? |
|---|---|---|
| Cells, the basic unit of life (Ch 1, EP 1) | **no lab**: 1.1 Basic Unit of Life is "Coming soon", with no bench (`lab: null`) | n/a |
| Why living things reproduce (Ch 1, EP 2) | 1.2 Living Things Reproduce, Part (a): Run the reserve forward · Part (b): Reading the trend | no |
| Characteristics passed on from parents (Ch 1, EP 3) | 1.3 Passing On Characteristics, Part (b): Build the family tree | no |
| Human reproductive systems and fertilisation (Ch 1, EP 4) | 1.4 Human Reproduction, Part (a): Label the systems · Part (b): Fertilisation | no |
| Parts of a flower (Ch 1, EP 5) | 1.5A Flower Parts and Pollination, Part (a): Inside a flower | no |
| Pollination; insect- vs wind-pollinated (Ch 1, EP 6) | 1.5A Part (b): Which way to pollinate? · 1.5D Part (a): Pick a plant | no |
| Fertilisation in flowers; fruit and seed (Ch 1, EP 7) | 1.5D The Flowering Plant Story, Part (b): Run the story | no |
| Seed dispersal (Ch 1, EP 8) | 1.5B Seed Dispersal, Part (a): Check the seed · Part (b): Send it off | no |
| Conditions for germination; fair test (Ch 1, EP 9) | 1.5C Conditions for Germination, Part (c): Light test (or (a) Water test, (b) Warmth test) | no |
| The four processes in order (Ch 1, EP 10) | 1.5D Part (b): Run the story | no |
| Human vs plant reproduction (Ch 1, EP 10) | 1.6 Human and Plant Reproduction Compared, Part (a): Similar or different | no |
| A new plant moves in; competition (Ch 1, EP 10) | 1.7 A New Plant Moves In, Part (b): Watch the plots | no |
| Melting point; temperature stays at 0 °C (Ch 2, EP 11) | 2.1 Ice Watch, Part (a): Watch the ice melt | no |
| Boiling point (Ch 2, EP 12) | 2.2 Boiling Point, Part (a): Watch the water boil · Part (b): Turn up the heat | no |
| Evaporation happens at any temperature (Ch 2, EP 12) | 2.4 Drying Towels, Part (a): Warmer or cooler (its trap question is exactly this) | no |
| Condensation on a cold surface (Ch 2, EP 13) | 2.3 Cold Surface, Part (a): A cold, covered beaker · Part (b): A hot, covered beaker | no |
| What speeds up evaporation (Ch 2, EP 14) | 2.4 Drying Towels, Part (a) Warmer or cooler · (b) Folded or spread out · (c) Still or moving air | no |
| The water cycle (Ch 2, EP 15) | 2.5 Sea to Sky, Part (b): Clouds, rain and flowing back | no |
| Water for life; saving water (Ch 2, EP 16) | 2.6 Every Drop Counts, Part (b): Tap on or off | no |
| Keeping water clean (Ch 2, EP 16) | 2.7 Clear Water, Part (a): Litter in the water | no |
| A water catcher (solar still) (Ch 2, EP 16) | 2.8 Clean Water Catcher, Part (a): Build the catcher | no |
| A plant wilts without water (Ch 3, EP 17) | 3.1 The Wilting Clue, Part (a): Water or no water | no |
| Coloured water shows the water-carrying tubes (Ch 3, EP 17) | 3.2 The Water Path, Part (a): Follow the colour | no |
| A fair test on water taken in (Ch 3, EP 17) | 3.4 Design Your Own Water Test, Part (c): Fair or not | no |
| Water-carrying and food-carrying tubes (Ch 3, EP 18) | 3.3 Two Tube Networks, Part (c): Trace the routes | no |
| Ring the stem (Ch 3, EP 18) | 3.5 Ring the Stem, Part (b): Ring or deep cut | no |
| Air is a mixture of gases (Ch 4, EP 19) | 4.1 Breath of Air, Part (b): Build the mix | no |
| Nose, windpipe, lungs (Ch 4, EP 19) | 4.2A Airway Explorer, Part (a): Which way does air go | no |
| Air breathed in vs out; limewater (Ch 4, EP 19) | 4.2B Limewater Test, Part (a): Blow into limewater · Part (c): Compare the air | no |
| Plant, fish and human gas exchange (Ch 4, EP 20) | 4.3 Three Ways to Breathe, Part (a): Spot the gas doors | no |
| Heart, blood vessels and blood (Ch 4, EP 21) | 4.4 Pump and Pipes, Part (a): What blood carries | no |
| Plant transport vs human transport (Ch 4, EP 22) | 4.5 Two Systems Side by Side, Part (b): What's different | no |
| Heart rate and breathing rate in exercise (Ch 4, EP 22) | 4.6 Heart Rate Challenge, Part (a): Choose the activity | no |
| One loop of a drop of blood (Ch 4, EP 22) | 4.7 Blood's Big Trip, Part (a): Plan the trip · Part (c): Faster loop | no |
| Parts of a circuit; a complete loop (Ch 5, EP 23) | 5.1 Circuit Parts, Part (a): Will it light? | no |
| Closed and open circuits; the switch (Ch 5, EP 23) | 5.2 Closed Circuits, Part (a): Open or closed? | no |
| Electrical conductors and insulators (Ch 5, EP 24) | 5.3 Conductors and Insulators, Part (a): Test the object | no |
| Circuit diagrams (Ch 5, EP 24) | 5.4 Circuit Diagrams, Part (b): Build the diagram | no |
| More batteries in series (Ch 6, EP 25) | 6.1 Batteries in Series, Part (a): Chain the batteries | no |
| More bulbs in series (Ch 6, EP 25) | 6.2 Bulbs in Series, Part (a): Add a bulb | no |
| Bulbs in parallel (Ch 6, EP 26) | 6.3 Bulbs in Parallel, Part (a): Add a path | no |
| Series or parallel at home (Ch 6, EP 26) | 6.4 Bulb Arrangements, Part (b): Wire the house | no |
| Using electricity safely and wisely (Ch 6, EP 27) | 6.5 Electricity Safely and Wisely, Part (a): Spot the hazard · Part (b): Save electricity | no |
| A circuit toy with a switch (Ch 6, EP 27) | 6.6 Circuit Toy Maker, Part (b): Add a switch | no |

---

## 3. Lab-card text and config examples, and every P5 experiment as the app names it

### 3a. The card and the kit config
- **Card text** (the same `labcard.js` card as P3 and P4): the header reads "🧪 Try it yourself in TheOneApp", then the line `School Lab › <code>  <title>`, the sub-line `Part (x): <part title>`, and the button "Let's test it now! ▶". The card shrinks a title line that is wider than 870 px. The longest P5 card lines, and so the most likely to shrink, are 1.6 "Human and Plant Reproduction Compared" and 6.5 "Electricity Safely and Wisely".
- **Kit config** (`prep_p3.py` checks it: `"lab"` must be null or `{seg, word, code, title, part}`). The card shows from the **last** `word` spoken in `seg` until 0.6 s after `seg` ends. Spell the code out in the narration, because digits get no word timing. Examples:
  - `"lab": {"seg": "lab", "word": "try", "code": "2.4", "title": "Drying Towels", "part": "Part (b): Folded or spread out"}`. Spoken: "Want to race two towels yourself? You can try it in The One App. Open the School Lab, experiment two point four, and press, Let's test it now!"
  - `"lab": {"seg": "lab", "word": "try", "code": "1.5C", "title": "Conditions for Germination", "part": "Part (c): Light test"}`. Spoken: "…Open the School Lab, experiment one point five C, and press, Let's test it now!"
  - `"lab": {"seg": "lab", "word": "try", "code": "4.2B", "title": "Limewater Test", "part": "Part (a): Blow into limewater"}`. Spoken: "…experiment four point two B…"
  - `"lab": {"seg": "lab", "word": "try", "code": "6.3", "title": "Bulbs in Parallel", "part": "Part (a): Add a path"}`. Spoken: "…experiment six point three…"
  - Cells (EP 1): `"lab": null`.
- `labs_p5.json` has the ready-made `labcard` (default Part (a)), `spokenCode` and `narration` for every lab. Swap `part` for the part named in §2.

### 3b. Every P5 experiment

Sources: `labs-p4.js` (the `SOON_P5` list, from line 2134: code, chapter, title), `labs-review.js` (the 40 records: minutes, big idea, aim, safety, parts, steps, typed questions), the `/api/lab` chapter numbering, and each bench page `labs/p5-*/index.html` (its `LAB` object: bench name, subtitle, intro button, pills, prediction reasons, variables chips, Challenge). The "Predict", "Does" and "Takeaway" lines are the app's own words, not the textbook's. The P5 textbook scans hold no readable text, so the "Script check" lines compare against the activity book (Chapters 1–2), the teacher's recitation tables, the Mix-up busters and the syllabus file.

**About `labs_p5.json`.**
- It has 40 records, one per built lab, in School Lab order. 1.1 is left out because it has no record, bench or parts.
- **Every P3 field has a P5 value, so no field is set to null.** Two P3 fields need a note:
  - `kind` is "Experiment" for all 40, because every P5 record has `kind: 'lab3d'`.
  - `mindmap` always names the nearest P5 poster. Where that poster does not cover the lab, a new `mindmap.note` says so; otherwise `note` is null.
- **P5-only fields, added on top of the P3 shape:**
  - per part: `predictOptions` (each option, its reason, and which one is right), `observeQ` and `observeAnswer` (the "What did you see?" step), `variables` (`{changed, measured, kept}`, or **null** where the bench shows no variables box), `variablesShown`, `briefSays` (what `labs/briefs-p5/` says about that part), `benchTask` ("choice" or "sequence" for tap tasks, else null) and `graph` ("bar", "line", or null when the part has no chart);
  - per lab: `challenge[].trap` (true for the question the bench tags "The trap"), `written` (the 3 typed Challenge questions with the model answer and the do-not-accept list, from `labs-review.js`), and `brief` (the notes file).

### Chapter 1: Reproduction in Animals and Plants (Cycles)

#### 1.2 Living Things Reproduce  ·  In review (admin/adult mode only)
- Folder: `labs/p5-1-2/` · list line: "Experiment · about 25 minutes · runs in 3D" · bench: **Living Things Reproduce Lab** ("Why reproducing matters"), intro button "Open the reserve →"
- Spoken: "Open the School Lab, experiment one point two, and press, Let's test it now!"  ·  card line: `School Lab › 1.2  Living Things Reproduce`
- Big idea (app): Living things reproduce to make more of their own kind. Reproduction lets a group continue after its older members die. Helping rare animals such as giant pandas reproduce keeps their kind going. A falling trend in children per woman can lead to a shrinking population.
- **Part (a): Run the reserve forward** (bench pill "🐾 Reserve Forward"). Predict: "What happens to the reserve after ten years if reproduction is switched off?" (The number of deer falls toward zero). Variables box: changed *whether reproduction is on or off* · measured *the number of deer after ten years* · kept the same *the starting deer, the reserve and the food given*. Does: Switch reproduction off, then on, and count the deer left after ten years. Takeaway: Living things reproduce to make more of their own kind. The young replace the deer that die, so the group keeps going.
- **Part (b): Reading the trend** (bench pill "📈 Reading the Trend"). Predict: "If that number keeps falling year after year, what happens to the country's population over time?" (It can shrink over time). Variables box: changed *the year you read* · measured *the average children per woman* · kept the same *the same country and the same graph*. (The brief calls this part an observation.) Does: Read the average number of children per woman for each year on the board, then name the trend. Takeaway: The average number of children per woman fell from 5.8 to 1.1. With fewer young born, a population can shrink over time.
- Typed Challenge questions (marked by the app): "What does reproduce mean? [1]" · "In the reserve, both switch settings started with the same eight deer, the same reserve and the same food. Explain why these were kept the same. [2]" · "On the graph board, the average number of children per woman fell as the years went by. Explain what can happen to the country's population if this goes on. [2]"
- Mind map to pick: **Reproduction in Plants** (The poster is about flowering plants only. It has no branch for why living things reproduce.)
- Script check: The graph board is a made-up "small country" (children per woman 5.8, 1.8, 1.6, 1.1 for 1960 to 2020; the CHILDREN table in labs/p5-1-2/index.html). It never names Singapore. If the video shows Singapore's real fertility-rate graph, give its source, and do not present the bench's numbers as Singapore's.
- Script check: The book's phrase is "continuity of their own kind". The bench says "keeps their kind going". Use the book's phrase in the Exam corner.

#### 1.3 Passing On Characteristics  ·  In review (admin/adult mode only)
- Folder: `labs/p5-1-3/` · list line: "Experiment · about 25 minutes · runs in 3D" · bench: **Passing On Characteristics Lab** ("How young take after their parents"), intro button "Meet the dog family →"
- Spoken: "Open the School Lab, experiment one point three, and press, Let's test it now!"  ·  card line: `School Lab › 1.3  Passing On Characteristics`
- Big idea (app): Characteristics are passed on from parents to their young. This is why offspring often look like their parents. A young one gets characteristics from both parents, not just one. A family tree shows how characteristics travel across generations.
- **Part (a): Family likeness** (bench pill "👀 Family Likeness"). Predict: "Will the pups share any characteristics with their parents?" (Yes. Each pup shares some characteristics with its parents). Variables box: changed *the pup you check* · measured *the characteristics shared, out of 3* · kept the same *the two parents and the same three checks*. (The brief calls this part an observation.) Does: Check each pup against its parents and count the characteristics it shares with a parent. Takeaway: Young take after their parents, so a family often looks alike.
- **Part (b): Build the family tree** (bench pill "🌳 Build the Tree"). Predict: "Where does a young dog's pair of tokens come from?" (One token from its father and one from its mother). No variables box (a tap task: sequence). Does: Build each young one by tapping its father's token, then its mother's. Takeaway: Characteristics are passed on from parents to their young when living things reproduce.
- Typed Challenge questions (marked by the app): "What does a family tree show? [1]" · "In your results, every pup shared at least two characteristics with a parent. Explain why. [2]" · "On the family tree, each young one got one token from its father and one from its mother. Explain what this shows about where a young one's characteristics come from. [2]"
- Mind map to pick: **Reproduction in Plants** (The poster has no heredity branch (characteristics passed on).)
- Script check: The family tree uses coloured tokens: one from the father and one from the mother. It is a model only. Do not call the tokens genes.
- Script check: The bench says "characteristics". The Quiz Yourself card (science-kb.js, P5 chapter 1) says "Heredity is the passing of traits from parents to offspring". Agree one word with the teacher and use it throughout the video.

#### 1.4 Human Reproduction  ·  In review (admin/adult mode only)
- Folder: `labs/p5-1-4/` · list line: "Experiment · about 25 minutes · runs in 3D" · bench: **Human Reproduction Lab** ("Parts of the systems and fertilisation"), intro button "Look at the diagrams →"
- Spoken: "Open the School Lab, experiment one point four, and press, Let's test it now!"  ·  card line: `School Lab › 1.4  Human Reproduction`
- Big idea (app): The testes make sperm and the ovaries make eggs. Fertilisation happens when a sperm joins with an egg. Only one sperm joins one egg. The fertilised egg grows into a baby in the womb, not the stomach.
- **Part (a): Label the systems** (bench pill "🏷️ Label the Systems"). Predict: "Which part makes sperm in the male system, and which makes eggs in the female system?" (The testes make sperm and the ovaries make eggs). No variables box (a tap task: choice). Does: Choose a part, then tap the word that names the part that is lit up. Takeaway: The testes make sperm and the ovaries make eggs. These are the male and female reproductive cells.
- **Part (b): Fertilisation** (bench pill "🔗 Fertilisation"). Predict: "What happens when a sperm and an egg meet?" (They join to form one fertilised egg). Variables box: changed *the seconds on the clock* · measured *the gap between the sperm and the egg* · kept the same *the egg, the sperm and the slow-motion speed*. (The brief calls this part an observation.) Does: Set the seconds, press Run, and read the gap between the sperm and the egg. Takeaway: Fertilisation happens when one sperm joins with one egg. The fertilised egg then settles in the womb and grows into a baby.
- Typed Challenge questions (marked by the app): "What is fertilisation? [1]" · "The testes and the ovaries make different reproductive cells. Explain why both kinds of cell are needed before a baby can start to grow. [2]" · "On the slow-motion stage, the egg was fertilised when the gap reached 0. A pupil says many sperm must join one egg to fertilise it. Explain why the pupil is wrong. [2]"
- Mind map to pick: **Reproduction in Plants** (There is no human-reproduction poster. "Reproduction in Plants" is the nearest chapter, but none of its branches covers human reproduction.)
- Script check: The bench's words are "sperm", "eggs", "womb", "egg tube" and "sperm duct". The series plan and Quiz Yourself use "sperm cell", "egg cell", "fallopian tube" and "uterus". Mix-up buster #46 (mixups.js line 324) says "Write egg cell, not egg". Use the book's terms in narration, and "womb" only as the everyday word for the uterus.
- Script check: Part (b) shows a variables box (changed: the seconds on the clock; measured: the gap between the sperm and the egg). It is a slow-motion demonstration, not a fair test; the brief (labs/briefs-p5/1.4.md) says "no variables". Do not use it as a fair-test example.
- Script check: The syllabus excludes foetal development and the umbilical cord. The bench stops at "settles in the womb and grows into a baby". Keep the video there too.

#### 1.5A Flower Parts and Pollination  ·  In review (admin/adult mode only)
- Folder: `labs/p5-1-5a/` · list line: "Experiment · about 25 minutes · runs in 3D" · bench: **Flower Parts and Pollination Lab** ("Parts of a flower and how pollen moves"), intro button "Look at the flower →"
- Spoken: "Open the School Lab, experiment one point five A, and press, Let's test it now!"  ·  card line: `School Lab › 1.5A  Flower Parts and Pollination`
- Big idea (app): A flower's stamen is its male part and its pistil is its female part. Pollination is pollen moving from an anther to a stigma. The ovary holds the ovules that can become seeds. Bright petals, scent and nectar attract insects. Light, powdery pollen suits the wind.
- **Part (a): Inside a flower** (bench pill "🌸 Inside a Flower"). Predict: "Which parts of the flower are male, and which are female?" (The stamen is male and the pistil is female). No variables box (a tap task: choice). Does: Choose a part of the flower, then tap the word that names it. Takeaway: The stamen is the male part: the anther and filament. The pistil is the female part: the stigma, style and ovary.
- **Part (b): Which way to pollinate?** (bench pill "🐝 Which Way to Pollinate?"). Predict: "Is it more likely to be pollinated by insects or by wind?" (By wind). No variables box (a tap task: choice). Does: Pick a flower, read its petals, scent and pollen, then tap the pollinator that fits. Takeaway: Pollination is pollen moving from an anther to a stigma. Bright petals and scent attract insects. Light, powdery pollen suits the wind.
- Safety line: Pollen can cause allergies. Wash your hands after touching real flowers.
- Typed Challenge questions (marked by the app): "What is pollination? [1]" · "When you opened the flower, the ovary was at the base of the pistil. Explain why the ovary is an important part of the flower. [2]" · "The bright flower had bright petals, a sweet scent and sticky pollen. Explain how these features help it to be pollinated by insects. [2]"
- Mind map to pick: **Reproduction in Plants**
- Script check: The bench's definition is "Pollination is pollen moving from an anther to a stigma". The book and Quiz Yourself say "the transfer of pollen grains from the anther to the stigma", and Mix-up buster #45 insists on TRANSFER, FROM and TO. Use the book's wording.
- Script check: The bench names the anther, filament, stigma, style, ovary and ovules. The Mind Lab poster has only "Stamen and anther", "Stigma and ovary" and "Ovule" (mindmap.html line 706). The mind-map beat must use the poster's words.
- Script check: The syllabus marks the terms self-pollination and cross-pollination as not required. The bench does not use them; keep them out of the video.

#### 1.5B Seed Dispersal  ·  In review (admin/adult mode only)
- Folder: `labs/p5-1-5b/` · list line: "Experiment · about 25 minutes · runs in 3D" · bench: **Seed Dispersal Lab** ("How seeds travel away from the parent plant"), intro button "Look at the seed tray →"
- Spoken: "Open the School Lab, experiment one point five B, and press, Let's test it now!"  ·  card line: `School Lab › 1.5B  Seed Dispersal`
- Big idea (app): Seeds are dispersed by wind, water, animals or splitting. A seed's features match its method: winged, waterproof, hooked or held in a pod. Dispersal spreads young plants away from the parent. This stops them crowding each other for light, water and space.
- **Part (a): Check the seed** (bench pill "🔎 Check the Seed"). Predict: "How is a seed with hooks all over its coat most likely to be dispersed?" (By animals). No variables box (a tap task: choice). Does: Pick a seed, read its clue, then tap the way it is dispersed. Takeaway: A seed's shape and coat are clues to how it is dispersed. It travels by wind, water, animals or splitting.
- **Part (b): Send it off** (bench pill "🌬️ Send It Off"). Predict: "Which set-up will send its seed the furthest from the parent plant?" (Water, with a seed that floats). No variables box (marked "not a fair test"). Does: Launch a seed in each lane and measure how far it lands. The four lanes show four ways a seed travels. Takeaway: Seeds travel away from the parent by wind, water, animals or splitting. This is not a fair test, because more than one thing changes.
- Typed Challenge questions (marked by the app): "What is seed dispersal? [1]" · "On the seed tray, the seed with hooks all over its coat is dispersed by animals. Explain how the hooks help this seed to be dispersed. [2]" · "In your results, every seed landed some distance away from the parent plant. Explain why this is good for the young plants. [2]"
- Mind map to pick: **Reproduction in Plants**
- Script check: The bench's water seed is "a seed that floats" (the big idea says "waterproof"). For a coconut, use Mix-up buster #49: "The fibrous husk TRAPS AIR, so the fruit floats on water".
- Script check: Part (b) has no variables box (fair: false), and its note says "This is not a fair test, because more than one thing changes." That makes it a good fair-test beat.
- Script check: The bench says "splitting". Mix-up buster #51 asks for "explosive action", and "it is the SEED (or fruit) that is dispersed". Say both words in the video.

#### 1.5C Conditions for Germination  ·  In review (admin/adult mode only)
- Folder: `labs/p5-1-5c/` · list line: "Experiment · about 30 minutes · runs in 3D" · bench: **Conditions for Germination Lab** ("What a seed needs to germinate"), intro button "Set up the trays →"
- Spoken: "Open the School Lab, experiment one point five C, and press, Let's test it now!"  ·  card line: `School Lab › 1.5C  Conditions for Germination`
- Big idea (app): A seed needs water and warmth to germinate. It needs air too. Light is not needed for a seed to germinate. A fair test changes only one condition and keeps the others the same. Any difference found can then be linked to that one condition.
- **Part (a): Water test** (bench pill "💧 Water Test"). Predict: "Which tray's seeds will germinate after a week?" (Only tray B, the one with water). Variables box: changed *whether water is added to the tray* · measured *the seeds germinated after a week* · kept the same *the number of seeds, the container and the room*. Does: Choose a tray and press Run to let a week pass. Count the seeds that have germinated. Takeaway: Water is needed for a seed to germinate. The seeds in the tray with no water did not change.
- **Part (b): Warmth test** (bench pill "🌡️ Warmth Test"). Predict: "Which tray's seeds will germinate after a week?" (Only tray A, on the warm table). Variables box: changed *where the tray is placed* · measured *the seeds germinated after a week* · kept the same *the water given, the number of seeds and the container*. Does: Choose a tray and press Run to let a week pass. Count the seeds that have germinated. Takeaway: Warmth is needed for a seed to germinate. The seeds in the cold refrigerator did not germinate.
- **Part (c): Light test** (bench pill "☀️ Light Test"). Predict: "Which tray's seeds will germinate after a week?" (Both trays). Variables box: changed *whether the tray is in light or in a covered box* · measured *the seeds germinated after a week* · kept the same *the water, the warmth and the number of seeds*. Does: Choose a tray and press Run to let a week pass. Count the seeds that have germinated. Takeaway: Light is not needed for a seed to germinate. Water, air and warmth are needed.
- Typed Challenge questions (marked by the app): "What does germinate mean? [1]" · "In the water test, the seeds in tray A did not germinate but most of the seeds in tray B did. Explain why. [2]" · "In the warmth test, both trays had the same water, but the seeds in the refrigerator did not germinate. Explain why. [2]"
- Mind map to pick: **Reproduction in Plants**
- Script check: The bench tests water, warmth and light. It only states that air is needed; it never tests air. Do not say that the bench shows that air is needed.
- Script check: Matches Mix-up buster #47: seeds need water, air and warmth, not sunlight.

#### 1.5D The Flowering Plant Story  ·  In review (admin/adult mode only)
- Folder: `labs/p5-1-5d/` · list line: "Experiment · about 25 minutes · runs in 3D" · bench: **The Flowering Plant Story Lab** ("From flower to new plant"), intro button "Look at the plant cards →"
- Spoken: "Open the School Lab, experiment one point five D, and press, Let's test it now!"  ·  card line: `School Lab › 1.5D  The Flowering Plant Story`
- Big idea (app): A flowering plant's story runs in order: pollination, fertilisation, seed dispersal, then germination. Each stage depends on the one before it. Different plants use different features to succeed at each stage. The whole story turns one flower into a new, growing plant.
- **Part (a): Pick a plant** (bench pill "🃏 Pick a Plant"). Predict: "Whose pollen will most likely travel on an insect?" (The garden flower, with bright petals and a sweet scent). No variables box (a tap task: choice). Does: Pick a plant card, read its clues, then tap the answer they point to. Takeaway: A plant's petals, scent, pollen and fruit are clues. They point to how it is pollinated and how its seeds are dispersed.
- **Part (b): Run the story** (bench pill "⏩ Run the Story"). Predict: "After pollination, what is the very next stage the plant reaches?" (Fertilisation). Variables box: changed *the day on the dial* · measured *the stage the plant has reached* · kept the same *the same plant and the same weather*. Does: Turn the dial to a day and press Run. Read which stage the plant has reached. Takeaway: A flowering plant's story runs in order: pollination, then fertilisation, then seed dispersal, then germination.
- Typed Challenge questions (marked by the app): "In a flowering plant, what is fertilisation? [1]" · "The fruit tree card showed sweet, juicy fruits with seeds inside. Explain how these fruits help the tree's seeds to be dispersed. [2]" · "On the story stage, seed dispersal came only after fertilisation. Explain why seeds cannot be dispersed before fertilisation happens. [2]"
- Mind map to pick: **Reproduction in Plants**
- Script check: Fertilisation, in the bench's typed question: "the male cell joins with the female cell inside the flower". Book and Quiz Yourself: "the male reproductive cell from pollen fuses with the egg cell in the ovule". Mind Lab poster: "Pollen joins the ovule" (mindmap.html line 708). The poster's mind-map line is the loosest of the three. See the sign-off gates.
- Script check: Part (b)'s variables box (changed: the day on the dial; measured: the stage reached) is a timeline, not a fair test.

#### 1.6 Human and Plant Reproduction Compared  ·  In review (admin/adult mode only)
- Folder: `labs/p5-1-6/` · list line: "Experiment · about 25 minutes · runs in 3D" · bench: **Reproduction Compared Lab** ("What humans and flowering plants share"), intro button "Look at both diagrams →"
- Spoken: "Open the School Lab, experiment one point six, and press, Let's test it now!"  ·  card line: `School Lab › 1.6  Human and Plant Reproduction Compared`
- Big idea (app): Fertilisation happens in the reproduction of both humans and flowering plants. In both, a male cell joins a female cell. Flowering plants need pollination first. Humans do not have this extra stage. The parts and places involved look very different.
- **Part (a): Similar or different** (bench pill "⚖️ Similar or Different"). Predict: "Is this a similarity or a difference between the two?" (A similarity. Both need the two cells to join). No variables box (a tap task: choice). Does: Choose a statement, then tap Similar or Different to sort it. Takeaway: Both humans and flowering plants go through fertilisation. A male and a female cell join. The parts involved look very different.
- **Part (b): Side by side** (bench pill "🔁 Side by Side"). Predict: "Does a matching pollination stage happen in humans?" (No. Humans have no pollination stage). No variables box (a tap task: choice). Does: Choose a stage, watch both sides, then tap where that stage happens. Takeaway: Flowering plants need pollination before fertilisation can happen. Humans do not have a matching pollination stage.
- Typed Challenge questions (marked by the app): "What is fertilisation? [1]" · "In the sorting task, you found that fertilisation happens in both humans and flowering plants. Explain what is the same about it in the two, and what is different. [2]" · "When both sides played together, only the flowering plant had a pollination stage. Explain why humans do not have a pollination stage. [2]"
- Mind map to pick: **Reproduction in Plants** (The poster covers only the plant half (its Fertilisation branch). There is no human-reproduction poster.)
- Script check: The bench header reads "Reproduction Compared Lab". The list title is "Human and Plant Reproduction Compared" (37 characters, the longest P5 title, so the lab card will likely shrink its title line).
- Script check: The bench says "male cell", "female cell" and "womb", and its typed question says "the sperm swim along a tube". Use "male reproductive cell", "egg cell" and the book's names for the parts.

#### 1.7 A New Plant Moves In  ·  In review (admin/adult mode only)
- Folder: `labs/p5-1-7/` · list line: "Experiment · about 25 minutes · runs in 3D" · bench: **A New Plant Moves In Lab** ("How a fast-spreading plant affects the others"), intro button "Look at the new plant →"
- Spoken: "Open the School Lab, experiment one point seven, and press, Let's test it now!"  ·  card line: `School Lab › 1.7  A New Plant Moves In`
- Big idea (app): A plant's growth, flowers and fruit decide how far and how fast its seeds spread. A fast-spreading new plant competes with plants already there for light, water and space. As the new plant's numbers rise, the numbers of the others can fall. Comparing a plot with the new plant to one without shows this fairly.
- **Part (a): Check its features** (bench pill "🌱 Check Its Features"). Predict: "What does this suggest about how its seeds spread?" (Animals eat the fruits and spread the seeds far and wide). No variables box (a tap task: choice). Does: Choose a feature of the new plant, then tap what it suggests. Takeaway: A plant's growth speed, flower type and fruit type together decide how it spreads. It can move quickly and widely into new ground.
- **Part (b): Watch the plots** (bench pill "📊 Watch the Plots"). Predict: "After a season, how many established plants will each plot have?" (Fewer in plot B. Plot A stays the same). Variables box: changed *the week on the dial* · measured *the established plants left in plot B* · kept the same *the plot size, the starting plants, the water and the light*. Does: Turn the dial to a week and press Run. Compare the plants left in plot B with plot A. Takeaway: At the same week, plot A kept all ten plants but plot B lost some. The new plant competes with them for light, water and space.
- Typed Challenge questions (marked by the app): "What does it mean when plants compete with each other? [1]" · "The feature cards showed that the new plant grows very quickly, and that it grows well in both shade and sun. Explain how these two features help it to spread. [2]" · "Plot A was kept without the new plant, and it matched plot B in every other way. Explain why plot A was needed. [2]"
- Mind map to pick: **Reproduction in Plants** (The poster has no branch for competition between plants.)
- Script check: The bench lists competition for "light, water and space". Mix-up buster #48 says "sunlight, water, space and mineral salts". Add mineral salts if the video gives the list.
- Script check: The bench's new plant is not named. A video that names Koster's Curse (series plan, episode 10) is going beyond the bench.


### Chapter 2: Cycles in Water (Cycles)

#### 2.1 Ice Watch  ·  In review (admin/adult mode only)
- Folder: `labs/p5-2-1/` · list line: "Experiment · about 25 minutes · runs in 3D" · bench: **Ice Watch Lab** ("Ice melts at a fixed temperature"), intro button "Open the ice bench →"
- Spoken: "Open the School Lab, experiment two point one, and press, Let's test it now!"  ·  card line: `School Lab › 2.1  Ice Watch`
- Big idea (app): Ice gains heat from its warmer surroundings. It melts at a fixed temperature, 0 °C. The reading stays at 0 °C for as long as ice is still turning into water. A bigger heap of ice simply takes longer to finish melting.
- **Part (a): Watch the ice melt** (bench pill "🧊 Watch It Melt"). Predict: "While ice is still in the beaker, what does the thermometer reading do?" (It stays at 0 °C, then rises once the ice is gone). Variables box: changed *the minute on the clock* · measured *the temperature on the thermometer* · kept the same *the ice, the beaker and the warm room*. (The brief calls this part an observation.) Does: Read the thermometer at different minutes and see when the last ice is gone. Takeaway: Ice gains heat from the warmer room and melts at 0 °C. Its temperature stays at 0 °C while any ice is left.
- **Part (b): More ice, more time?** (bench pill "⚖️ More Ice, More Time?"). Predict: "Which heap takes longer to melt away completely?" (The big heap takes longer). Variables box: changed *the mass of ice in the beaker* · measured *the time for all the ice to melt* · kept the same *the room, the beaker and the thermometer*. Does: Time how long 30 g, 60 g and 90 g of ice take to melt away. Takeaway: A bigger mass of ice has more to melt, so it must gain more heat. It takes longer, but it still melts at 0 °C.
- Safety line: Real ice is cold and wet, so dry your hands afterwards, and keep a thermometer bulb off your skin.
- Typed Challenge questions (marked by the app): "What is melting? [1]" · "In your results, the thermometer stayed at 0 °C while there was still ice in the beaker, even though the room was warm. Explain why. [2]" · "In your results, a bigger mass of ice took longer to melt completely. Explain why. [2]"
- Mind map to pick: **The Water Cycle**
- Script check: Part (a) shows a variables box (changed: the minute on the clock). The brief (labs/briefs-p5/2.1.md line 30) says "no variables, an observation". Do not present it as a fair test.
- Script check: Matches the book: ice gains heat from the warmer surroundings and melts at 0 °C, and the reading stays at 0 °C while ice is left (misconception M-11).

#### 2.2 Boiling Point  ·  In review (admin/adult mode only)
- Folder: `labs/p5-2-2/` · list line: "Experiment · about 25 minutes · runs in 3D" · bench: **Boiling Point Lab** ("Water boils at a fixed temperature"), intro button "Open the boiling bench →"
- Spoken: "Open the School Lab, experiment two point two, and press, Let's test it now!"  ·  card line: `School Lab › 2.2  Boiling Point`
- Big idea (app): Water gains heat from the flame and its temperature climbs. It boils at 100 °C, the boiling point. While it keeps boiling, the temperature stays at 100 °C. A stronger flame gets the water there sooner, but it never boils hotter.
- **Part (a): Watch the water boil** (bench pill "🔥 Watch It Boil"). Predict: "Once steady bubbles break the surface, what does the thermometer reading do?" (It stays at 100 °C). Variables box: changed *the minute on the clock* · measured *the temperature on the thermometer* · kept the same *the water, the beaker and the flame*. (The brief calls this part an observation.) Does: Read the thermometer at different minutes and see when the water starts to boil. Takeaway: Water gains heat from the flame until it boils at 100 °C. Its temperature stays at 100 °C while it keeps boiling.
- **Part (b): Turn up the heat** (bench pill "🔆 Turn Up the Heat"). Predict: "Which reaches 100 °C sooner, and does either boil hotter than 100 °C?" (The high flame is sooner, and neither boils hotter). Variables box: changed *how strong the flame is* · measured *the time for the water to start boiling* · kept the same *the amount of water and its starting temperature*. Does: Heat the water on a low, a medium and a high flame, and time how long it takes to boil. Takeaway: A stronger flame gives heat to the water faster, so it boils sooner. Water still boils at 100 °C on every flame.
- Safety line: A flame, boiling water and steam are hot. Keep your hands and face well back from the beaker.
- Typed Challenge questions (marked by the app): "What is meant by the boiling point of water? [1]" · "In your results, the thermometer reading stayed at 100 °C while the water kept boiling. Explain why. [2]" · "In your results, the water on the high flame started to boil sooner than the water on the low flame. Explain why. [2]"
- Mind map to pick: **The Water Cycle**
- Script check: The safety line says "A flame, boiling water and steam are hot". Mix-up buster #11 rejects "boiling makes steam". In narration, say "water vapour", and keep "steam" for the safety warning only.
- Script check: Part (a) shows a variables box (changed: the minute on the clock), but the brief calls it an observation.

#### 2.3 Cold Surface  ·  In review (admin/adult mode only)
- Folder: `labs/p5-2-3/` · list line: "Experiment · about 25 minutes · runs in 3D" · bench: **Cold Surface Lab** ("Where water vapour turns into droplets"), intro button "Open the beaker bench →"
- Spoken: "Open the School Lab, experiment two point three, and press, Let's test it now!"  ·  card line: `School Lab › 2.3  Cold Surface`
- Big idea (app): Water vapour is always in the air around us, and it cannot be seen. When it meets a surface that is cold enough, it loses heat to that surface. It then turns back into liquid droplets. This is condensation. The colder the surface, the more droplets tend to form.
- **Part (a): A cold, covered beaker** (bench pill "🧊 A Cold, Covered Beaker"). Predict: "Where will droplets of water collect?" (On the cold outer wall and the cover). Variables box: changed *the part of the beaker you check* · measured *the droplets counted* · kept the same *the beaker, the cold water and the warm room*. (The brief calls this part an observation.) Does: Count the droplets that form on the outer wall, on the cover and inside the water. Takeaway: Water vapour in the air loses heat to the cold wall and the cooled cover, and turns into liquid droplets there.
- **Part (b): A hot, covered beaker** (bench pill "🍵 A Hot, Covered Beaker"). Predict: "Which lid collects more droplets, a warm lid or a cold lid?" (The cold lid). Variables box: changed *whether the lid is warm or cold* · measured *the droplets counted on the lid* · kept the same *the hot water and the time observed*. Does: Put a warm lid and a cold lid on the hot beaker, and count the droplets on each. Takeaway: The colder the lid, the more heat the rising water vapour loses to it, so more droplets form.
- Safety line: The hot-water beaker is warm enough to feel through the glass, so hold it by the stand, not the sides.
- Typed Challenge questions (marked by the app): "What is condensation? [1]" · "In your results, more droplets formed on the outer wall of the cold beaker than on its cover. Explain why. [2]" · "In your results, droplets formed under the lid of the hot beaker. Explain where the water in these droplets came from. [2]"
- Mind map to pick: **The Water Cycle**
- Script check: The trap question matches the syllabus: the mist is tiny droplets, and water vapour cannot be seen (M-07).
- Script check: Part (a) shows a variables box (changed: the part of the beaker you check), but the brief calls it an observation.

#### 2.4 Drying Towels  ·  In review (admin/adult mode only)
- Folder: `labs/p5-2-4/` · list line: "Experiment · about 30 minutes · runs in 3D" · bench: **Drying Towels Lab** ("What makes water evaporate faster"), intro button "Open the drying bench →"
- Spoken: "Open the School Lab, experiment two point four, and press, Let's test it now!"  ·  card line: `School Lab › 2.4  Drying Towels`
- Big idea (app): Water evaporates faster when it is warmer. It also evaporates faster from a larger exposed surface. It evaporates faster when moving air carries the water vapour away. Each factor was tested on its own, so the differences can be trusted.
- **Part (a): Warmer or cooler** (bench pill "🔆 Warmer or Cooler"). Predict: "Which towel loses more mass by drying?" (The towel near the lamp). Variables box: changed *how close the towel is to the lamp* · measured *the mass the towel loses in ten minutes* · kept the same *the starting water, the size of the towel and the time*. Does: Place the towel near the lamp and far from it, and find the mass it loses in ten minutes. Takeaway: A warmer place makes water evaporate faster, so the towel near the lamp loses more mass.
- **Part (b): Folded or spread out** (bench pill "📄 Folded or Spread Out"). Predict: "Which towel loses more mass by drying?" (The flat towel). Variables box: changed *whether the towel is flat or folded* · measured *the mass the towel loses in ten minutes* · kept the same *the starting water, the lamp distance and the time*. Does: Lay the towel flat and fold it, and find the mass it loses in ten minutes. Takeaway: A larger exposed surface lets water evaporate faster, so the flat towel loses more mass.
- **Part (c): Still or moving air** (bench pill "🌬️ Still or Moving Air"). Predict: "Which towel loses more mass by drying?" (The towel in front of the fan). Variables box: changed *whether the fan is off or on* · measured *the mass the towel loses in ten minutes* · kept the same *the starting water, the lamp distance and the time*. Does: Switch the fan off and on, and find the mass the towel loses in ten minutes. Takeaway: Moving air carries water vapour away from the surface faster, so the towel in front of the fan loses more mass.
- Safety line: The lamp gets hot, so hold it by its base and never by the part around the bulb.
- Typed Challenge questions (marked by the app): "What is evaporation? [1]" · "In your results, the flat towel lost more mass than the folded towel. Explain why. [2]" · "In your results, the towel in front of the fan lost more mass than the towel in still air. Explain why. [2]"
- Mind map to pick: **The Water Cycle**
- Script check: The bench says "a larger exposed surface". The book and Mix-up buster #15 say "exposed SURFACE AREA" and "evaporates FASTER". Use "exposed surface area" in the video.
- Script check: BRIEF-P5.md names humidity as a factor. The bench does not test it.

#### 2.5 Sea to Sky  ·  In review (admin/adult mode only)
- Folder: `labs/p5-2-5/` · list line: "Experiment · about 25 minutes · runs in 3D" · bench: **Sea to Sky Lab** ("The water cycle"), intro button "Open the sea and sky →"
- Spoken: "Open the School Lab, experiment two point five, and press, Let's test it now!"  ·  card line: `School Lab › 2.5  Sea to Sky`
- Big idea (app): The sun's warmth makes water evaporate from the sea. As the water vapour rises it loses heat to the air and condenses into clouds. When the clouds hold enough water, it falls as rain. The rain flows back to the sea, so the whole cycle can start again.
- **Part (a): Rising and cooling** (bench pill "☀️ Rising and Cooling"). Predict: "As water vapour rises high above the sea, what happens to the air around it?" (It gets cooler). Variables box: changed *the height above the sea* · measured *the air temperature at that height* · kept the same *the sea, the sun and the time of day*. (The brief calls this part an observation.) Does: Read the air temperature at different heights above the sea as the water vapour rises. Takeaway: The sun's warmth makes water evaporate from the sea. Higher up, the air is cooler, so the rising water vapour loses heat to it.
- **Part (b): Clouds, rain and flowing back** (bench pill "🌧️ Clouds, Rain and Flowing Back"). Predict: "What happens to the cooling water vapour next?" (It condenses into tiny droplets that gather as clouds). Variables box: changed *the hour of the day* · measured *the volume of water in the river* · kept the same *the sea, the hills and the sun*. (The brief calls this part an observation.) Does: Read the volume of water in the river at different hours as the clouds form and rain falls. Takeaway: Water vapour that loses heat condenses into clouds. The rain it makes fills the river, and the river carries the water back to the sea.
- Typed Challenge questions (marked by the app): "What is the water cycle? [1]" · "In your results, the air was cooler higher above the sea. Explain how this makes clouds form from the water vapour that rises from the sea. [2]" · "In your results, the volume of water in the river increased as the hours passed. Explain why. [2]"
- Mind map to pick: **The Water Cycle**
- Script check: The bench says "The sun's warmth makes water evaporate". The exam wording (science-kb.js TRIGGERS, line 304) is "Water gains heat from the Sun and evaporates into water vapour." Use the exam wording.
- Script check: Both parts show a variables box (height, then hour), but the brief calls both observations.

#### 2.6 Every Drop Counts  ·  In review (admin/adult mode only)
- Folder: `labs/p5-2-6/` · list line: "Experiment · about 25 minutes · runs in 3D" · bench: **Every Drop Counts Lab** ("Why water matters and how to save it"), intro button "Open the water bench →"
- Spoken: "Open the School Lab, experiment two point six, and press, Let's test it now!"  ·  card line: `School Lab › 2.6  Every Drop Counts`
- Big idea (app): All living things need water to carry out their life processes. Because of this, water is precious and must be used wisely. Small habits, like turning off a running tap, add up to real savings. It is worth doing our part to conserve water.
- **Part (a): Watered or not** (bench pill "🌱 Watered or Not"). Predict: "After five days, which plant looks healthier?" (The plant that is watered). Variables box: changed *whether the plant is watered each day* · measured *the health score after five days* · kept the same *the pot, the sunlight and the plant at the start*. Does: Water one plant every day and leave the other dry, then score their health on day 5. Takeaway: Living things need water to carry out their life processes. A plant without water wilts, while a watered plant stays healthy.
- **Part (b): Tap on or off** (bench pill "🚰 Tap On or Off"). Predict: "Who uses more water?" (The pupil who leaves the tap running). Variables box: changed *whether the tap runs or is turned off between rinses* · measured *the litres of water used* · kept the same *the brushing time and how far the tap is turned*. Does: Brush for two minutes with the tap left running, then with the tap off between rinses. Takeaway: Turning the tap off when it is not needed uses far less water than leaving it running.
- Typed Challenge questions (marked by the app): "What does it mean to conserve water? [1]" · "In your results, the plant that was not watered had a much lower health score than the watered plant. Explain why. [2]" · "In your results, less water was used when the tap was turned off between rinses. Explain why. [2]"
- Mind map to pick: **The Water Cycle** (The poster has no branch for water conservation.)
- Script check: The "health score" is a made-up 0 to 10 scale. Do not present it as a real measurement.

#### 2.7 Clear Water  ·  In review (admin/adult mode only)
- Folder: `labs/p5-2-7/` · list line: "Experiment · about 25 minutes · runs in 3D" · bench: **Clear Water Lab** ("Litter, light and water plants"), intro button "Open the tank bench →"
- Spoken: "Open the School Lab, experiment two point seven, and press, Let's test it now!"  ·  card line: `School Lab › 2.7  Clear Water`
- Big idea (app): Litter and other human activities can cloud a water body. This blocks the light that plants and other living things need. Clearing litter away lets the light through again. We all have a part to play in keeping our water clean.
- **Part (a): Litter in the water** (bench pill "🗑️ Litter in the Water"). Predict: "What happens to the light reading as more litter is added?" (It falls). Variables box: changed *the amount of litter in the tank* · measured *the light reading at the sensor* · kept the same *the water, the lamp and the distance to the sensor*. Does: Add no litter, a little and a lot, and read the light that reaches the sensor. Takeaway: More litter in the water blocks more light, so less light reaches the far side.
- **Part (b): Cleaning it up** (bench pill "🧹 Cleaning It Up"). Predict: "After five days, which tank's plants look healthier?" (The tank that was cleared). Variables box: changed *whether the litter is cleared or left in* · measured *the health score of the plants after five days* · kept the same *the plants at the start, the light and the water*. Does: Clear the litter from one tank and leave it in the other, then score the plants on day 5. Takeaway: Litter in the water can block light and harm water plants. Plants in the cleared tank stayed healthier.
- Typed Challenge questions (marked by the app): "What is litter? [1]" · "In your results, the light reading was lower with a lot of litter than with a little litter. Explain why. [2]" · "In your results, the plants in the tank left with litter had a lower health score after five days. Explain why. [2]"
- Mind map to pick: **The Water Cycle** (The poster has no branch for water pollution.)
- Script check: The written model answer says "Plants need light to make food". Making food with light is P6 (photosynthesis). In a P5 video, say "the light that water plants need".
- Script check: The bench covers only litter blocking light. The book's water-pollution activity is wider.

#### 2.8 Clean Water Catcher  ·  In review (admin/adult mode only)
- Folder: `labs/p5-2-8/` · list line: "Experiment · about 25 minutes · runs in 3D" · bench: **Clean Water Catcher Lab** ("Evaporation and condensation make clean water"), intro button "Open the catcher →"
- Spoken: "Open the School Lab, experiment two point eight, and press, Let's test it now!"  ·  card line: `School Lab › 2.8  Clean Water Catcher`
- Big idea (app): Water evaporates off the muddy cup and leaves the dirt behind. The water vapour condenses on the cool cover and drips down as clean water. Only the water turns into vapour, so the water caught is clean. A warmer spot speeds up the evaporating, so more clean water is caught in the same time.
- **Part (a): Build the catcher** (bench pill "🛠️ Build the Catcher"). Predict: "Where will the clean water end up?" (In the catching cup, dripping from the low point of the cover). Variables box: changed *the minute on the clock* · measured *the water collected in the catching cup* · kept the same *the muddy water, the cover and the spot*. (The brief calls this part an observation.) Does: Read the water in the catching cup at different minutes and follow how it got there. Takeaway: Water evaporates off the muddy cup, leaving the mud behind. It condenses on the cool cover and drips clean into the catching cup.
- **Part (b): Warm spot or cool spot** (bench pill "☀️ Warm Spot or Cool Spot"). Predict: "Which collects more clean water in one hour?" (The catcher in the warm, sunny spot). Variables box: changed *whether the catcher sits in a warm or a cool spot* · measured *the clean water collected in one hour* · kept the same *the amount of muddy water, the containers and the time*. Does: Put the catcher in a warm spot and a cool spot, and measure the clean water after one hour. Takeaway: A warmer spot makes the muddy water evaporate faster, so more clean water is collected in the same time.
- Typed Challenge questions (marked by the app): "What is evaporation? [1]" · "The water that dripped into the catching cup came from the muddy water, but it was clean. Explain why it was clean. [2]" · "In your results, the catcher in the warm, sunny spot collected more clean water than the catcher in the cool, shaded spot. Explain why. [2]"
- Mind map to pick: **The Water Cycle**
- Script check: The bench calls the water it catches "clean" throughout. The series plan (episode 16) says "cleaner water ... may still hold bacteria". Say "cleaner", and agree the drinking-safety line with the teacher.
- Script check: Part (a) shows a variables box (changed: the minute), but the brief calls it an observation.


### Chapter 3: Plant Transport System (Systems)

#### 3.1 The Wilting Clue  ·  In review (admin/adult mode only)
- Folder: `labs/p5-3-1/` · list line: "Experiment · about 30 minutes · runs in 3D" · bench: **The Wilting Clue Lab** ("Why a plant droops without water"), intro button "Start growing →"
- Spoken: "Open the School Lab, experiment three point one, and press, Let's test it now!"  ·  card line: `School Lab › 3.1  The Wilting Clue`
- Big idea (app): A plant that has no water begins to droop. Watering a drooping plant lets it stand upright again. Water travels from the roots, up through the stem, to the leaves. The next lab finds the tubes that carry the water.
- **Part (a): Water or no water** (bench pill "🌱 Two Plants"). Predict: "Which plant will droop more after six hours?" (The plant with no water). Variables box: changed *whether the plant is given water* · measured *the droop angle after six hours* · kept the same *the kind of plant, the pot and the lamp*. Does: Test the watered plant and the dry plant, and read how far each one droops after six hours. Takeaway: A plant that gets no water begins to droop. The plant with water stays upright.
- **Part (b): Water a drooping plant** (bench pill "⏩ Speed the Clock"). Predict: "What happens to the drooping plant after it is watered?" (It stands upright again). Variables box: changed *the hours since the plant was watered* · measured *the droop angle after watering* · kept the same *the same plant, the water given and the lamp*. (The brief calls this part an observation.) Does: Water the drooping plant, then read its droop after one, two and three hours. Takeaway: Once water reaches the plant again, it stands upright. The stem straightens and the leaves lift.
- **Part (c): Where the water goes** (bench pill "💧 Where Does It Go"). Predict: "Which way does water travel inside the plant?" (Up from the roots to the leaves). Variables box: changed *whether you look from outside or inside* · measured *the height of the light you can see* · kept the same *the same plant and the same six hours*. (The brief calls this part an observation.) Does: Look at the stem from outside, then from inside, and read how high the line of light climbs. Takeaway: Water is pulled up from the roots, through the stem, to the leaves.
- Typed Challenge questions (marked by the app): "What does it mean when a plant wilts? [1]" · "In your results, the dry plant drooped much more than the watered plant. Explain why. [2]" · "In your results, the drooping plant stood upright again a few hours after water was poured onto its soil. Explain why. [2]"
- Mind map to pick: **Plant System**
- Script check: Part (c)'s "line of light" stands for the water. Say so if you film it.
- Script check: Parts (b) and (c) show variables boxes, but the brief calls both observations.

#### 3.2 The Water Path  ·  In review (admin/adult mode only)
- Folder: `labs/p5-3-2/` · list line: "Experiment · about 30 minutes · runs in 3D" · bench: **The Water Path Lab** ("The path water takes inside a stem"), intro button "Start colouring →"
- Spoken: "Open the School Lab, experiment three point two, and press, Let's test it now!"  ·  card line: `School Lab › 3.2  The Water Path`
- Big idea (app): Water climbs through set paths inside the stem, called the water-carrying tubes. A cross-cut shows them as dots. A length-cut shows them as lines. Each path keeps to its own side and does not mix with the next. Warmer water climbs faster. The next lab looks closer at these tubes.
- **Part (a): Follow the colour** (bench pill "🔴 Follow the Colour"). Predict: "What will the cut stalk look like after standing in red water?" (Red dots and lines inside it). Variables box: changed *how the stalk is cut* · measured *the number of coloured paths counted* · kept the same *the stalk, the red dye and the six hours*. (The brief calls this part an observation.) Does: Let six hours pass, then cut the stalk across and along, and count the coloured paths you can see. Takeaway: Water climbs through the water-carrying tubes. A cross-cut shows them as dots. A length-cut shows them as lines.
- **Part (b): Two colours, one stalk** (bench pill "🔵 Two Colours"). Predict: "Will the two colours mix in the joined top of the stalk?" (No. They stay apart). Variables box: changed *the colour of dot you count* · measured *the number of dots counted* · kept the same *the same stalk, the same cut and the same six hours*. (The brief calls this part an observation.) Does: Let six hours pass, cut the joined top, and count the red, blue and purple dots. Takeaway: Each water-carrying tube carries its own water. The red and the blue do not mix with their neighbours.
- **Part (c): Race the climb** (bench pill "⏱️ Race the Climb"). Predict: "Will the colour climb to the mark faster in cool water or in warm water?" (Faster in warm water). Variables box: changed *the temperature of the water* · measured *the time for the colour to reach the mark* · kept the same *the stalk length, the dye and the marked height*. Does: Set the water temperature and time how long the colour takes to climb to the mark. Takeaway: Warmer water helps the stem draw water up faster, so the colour reaches the mark sooner.
- Safety line: Real knives are sharp. Ask an adult to do the cutting, and keep your fingers clear of the blade.
- Typed Challenge questions (marked by the app): "What are the water-carrying tubes of a plant? [1]" · "In your results, red dots and blue dots were found in the joined top of the split stalk, but no purple dots. Explain why. [2]" · "In your results, the colour took less time to reach the mark when the water was warmer. Explain why. [2]"
- Mind map to pick: **Plant System**
- Script check: Part (c) teaches "Warmer water climbs faster" ("Warmth helps water move faster"). This is not a syllabus point. Leave it out of a P5 video unless the teacher wants it.
- Script check: The bench says "water-carrying tubes" and never "xylem" (good: the syllabus says xylem and phloem are not required).

#### 3.3 Two Tube Networks  ·  In review (admin/adult mode only)
- Folder: `labs/p5-3-3/` · list line: "Experiment · about 30 minutes · runs in 3D" · bench: **Two Tube Networks Lab** ("Two kinds of tubes in a plant"), intro button "Start zooming →"
- Spoken: "Open the School Lab, experiment three point three, and press, Let's test it now!"  ·  card line: `School Lab › 3.3  Two Tube Networks`
- Big idea (app): A plant has two kinds of tubes. They run through the roots, stem and leaves. Water-carrying tubes carry water and mineral salts up from the roots. Food-carrying tubes carry food made in the leaves to the rest of the plant. The next lab tests what happens if one set of tubes is cut.
- **Part (a): Same pattern, three places** (bench pill "🔬 Same Pattern"). Predict: "Will the stem, the leaf and the root all show tube bundles?" (Yes. All three show tube bundles). Variables box: changed *the part of the plant you look at* · measured *the number of tube bundles counted* · kept the same *the microscope and the thickness of each slice*. (The brief calls this part an observation.) Does: Zoom in on the stem, the leaf and the root, and count the tube bundles in each. Takeaway: The same tube network runs through the roots, stem and leaves. Every part shows tube bundles.
- **Part (b): Sort the tubes** (bench pill "🏷️ Sort the Tubes"). Predict: "Which tubes carry water, and which carry food?" (The inner tubes carry water. The outer tubes carry food). No variables box (a tap task: choice). Does: Tap a kind of tube, then choose whether it carries water or food. Takeaway: Water-carrying tubes carry water and mineral salts. Food-carrying tubes carry the food made in the leaves.
- **Part (c): Trace the routes** (bench pill "🧭 Trace the Routes"). Predict: "Which way does food travel once it is made in the leaves?" (Out from the leaves to the rest of the plant). Variables box: changed *the trail you follow* · measured *the height where the trail starts* · kept the same *the same glass plant and the same time*. (The brief calls this part an observation.) Does: Follow the water trail and the food trail through the glass plant, and see where each one starts. Takeaway: Water moves up from the roots. Food moves out from the leaves to the rest of the plant.
- Typed Challenge questions (marked by the app): "What are the food-carrying tubes of a plant? [1]" · "In your results, tube bundles were found in the stem, in the leaf and in the root. Explain why a plant has tube bundles in all of these parts. [2]" · "In your results, the water trail started at the roots but the food trail started in the leaves. Explain why. [2]"
- Mind map to pick: **Plant System**
- Script check: Part (b) sorts the tubes by position (inner tubes carry water, outer tubes carry food). The syllabus does not ask for positions. Use position only to explain ring-barking (lab 3.5).
- Script check: Parts (a) and (c) show variables boxes, but the brief calls both observations.

#### 3.4 Design Your Own Water Test  ·  In review (admin/adult mode only)
- Folder: `labs/p5-3-4/` · list line: "Experiment · about 30 minutes · runs in 3D" · bench: **Design Your Own Water Test Lab** ("Plan a fair test on how much water a plant takes in"), intro button "Start planning →"
- Spoken: "Open the School Lab, experiment three point four, and press, Let's test it now!"  ·  card line: `School Lab › 3.4  Design Your Own Water Test`
- Big idea (app): A fair test changes only one thing at a time and keeps everything else the same. Repeating a reading and finding the average makes it more reliable. More leaves, brighter light and warmer air make a plant take in more water.
- **Part (a): Pick your question** (bench pill "🧪 Pick Your Question"). Predict: "Will a plant in the busier condition take in more water, less water or the same?" (More water than in the calmer condition). Variables box: changed *the one factor you choose to change* · measured *the water taken in after one day* · kept the same *the other two factors, the pot and the starting water*. Does: Choose one factor, test its busy and calm conditions, and read how much water the plant takes in over a day. Takeaway: A plant with more leaves, brighter light or warmer air loses more water from its leaves, so it takes in more water.
- **Part (b): Run it again** (bench pill "🔁 Run It Again"). Predict: "Why run the same test more than once?" (To find an average that is more reliable). Variables box: changed *which test you repeat* · measured *the water taken in on each run* · kept the same *the plant, the jar and the one day each run lasts*. (The brief calls this part an observation.) Does: Repeat each test and watch the readings. Then find the average of the runs. Takeaway: One reading can be off. Readings repeated and averaged are more reliable.
- **Part (c): Fair or not** (bench pill "⚖️ Fair or Not"). Predict: "Is a test fair if it changes two factors at once?" (No. We cannot tell which factor caused the difference). No variables box (a tap task: choice). Does: Check each test and name the factor that was not kept the same. Takeaway: A fair test changes only one thing at a time. Everything else is kept the same.
- Typed Challenge questions (marked by the app): "What is a fair test? [1]" · "On the bench, a plant with many leaves took in more water in one day than a plant with few leaves. Explain why. [2]" · "You ran the same test more than once and found the average of the readings. Explain why this is better than using one reading. [2]"
- Mind map to pick: **Plant System**
- Script check: "Busier" and "calmer" are the bench's own words for its two conditions. Do not use them as exam terms.

#### 3.5 Ring the Stem  ·  In review (admin/adult mode only)
- Folder: `labs/p5-3-5/` · list line: "Experiment · about 30 minutes · runs in 3D" · bench: **Ring the Stem Lab** ("Why a thin ring cut gives bigger fruit"), intro button "Start cutting →"
- Spoken: "Open the School Lab, experiment three point five, and press, Let's test it now!"  ·  card line: `School Lab › 3.5  Ring the Stem`
- Big idea (app): Cutting a thin ring through the food-carrying tubes traps food just above the cut, so fruit there grows bigger. A deeper cut also removes the water-carrying tubes, so the part above it wilts. The gardener should cut carefully, and only through the outer ring.
- **Part (a): Where to cut** (bench pill "✂️ Where to Cut"). Predict: "Which ring position makes the fruit grow bigger?" (Either position. The fruit grows bigger). Variables box: changed *where the ring is cut* · measured *the fruit size after thirty days* · kept the same *the cut depth, the age of the tree and the water given*. Does: Ring the branch near the fruit and near the trunk, and read the fruit size after thirty days. Takeaway: A ring cut removes the food-carrying tubes at that spot. Food builds up above the cut, so the fruit grows bigger.
- **Part (b): Ring or deep cut** (bench pill "🌳 Ring or Deep Cut"). Predict: "What happens to the leaves above a cut that goes too deep?" (They wilt). Variables box: changed *how deep the cut goes* · measured *the leaf droop after thirty days* · kept the same *the cut position, the age of the tree and the water given*. Does: Make a thin ring and a deep cut, and read how far the leaves droop after thirty days. Takeaway: A thin ring leaves the water-carrying tubes whole. A deep cut removes them, so the leaves above it wilt.
- **Part (c): Advise the gardener** (bench pill "💬 Advise the Gardener"). Predict: "Which piece of advice gives bigger fruit and keeps the tree healthy?" (Cut only a thin ring through the outer tubes). Variables box: changed *the advice the gardener follows* · measured *the fruit size after thirty days* · kept the same *the same tree, the same water and the same thirty days*. (The brief calls this part an observation.) Does: Follow each piece of advice for thirty days. Then read the fruit size and the healthy leaves. Takeaway: A thin ring grows bigger fruit and keeps the water-carrying tubes whole, so the tree stays healthy.
- Safety line: Real cutting tools are sharp. Ask an adult to do any cutting, and keep your fingers clear.
- Typed Challenge questions (marked by the app): "What are the food-carrying tubes in a plant? [1]" · "In your results, the fruit above a ring cut grew bigger than the fruit on a branch with no ring. Explain why. [2]" · "In your results, the leaves above the deep cut drooped, but the leaves above the thin ring did not. Explain why. [2]"
- Mind map to pick: **Plant System**
- Script check: Matches misconception M-22: a thin ring removes only the food-carrying tubes, so food builds up above the cut. The bench says "ring cut", never "ring-barking".


### Chapter 4: Respiratory and Circulatory Systems (Systems)

#### 4.1 Breath of Air  ·  In review (admin/adult mode only)
- Folder: `labs/p5-4-1/` · list line: "Experiment · about 30 minutes · runs in 3D" · bench: **Breath of Air Lab** ("Air is a mixture of gases"), intro button "Start exploring →"
- Spoken: "Open the School Lab, experiment four point one, and press, Let's test it now!"  ·  card line: `School Lab › 4.1  Breath of Air`
- Big idea (app): Air is a mixture of gases, not one gas alone. Most of it is nitrogen, then oxygen, with a small amount of carbon dioxide and other gases. A glowing splint keeps glowing when oxygen is present, and limewater turns cloudy with carbon dioxide. The next lab follows this air into the body.
- **Part (a): One gas or many** (bench pill "🫙 One Gas or Many"). Predict: "Is the air in the jar one single gas, or a mix of several gases?" (A mix of several gases). Variables box: changed *whether you look from outside or inside* · measured *the number of different gases you pick out* · kept the same *the same jar and the same air*. (The brief calls this part an observation.) Does: Look at the jar from outside, then see inside, and count the different gases you can pick out. Takeaway: Air is a mixture of several gases, not one gas alone. From outside it looks like one clear gas.
- **Part (b): Build the mix** (bench pill "📏 Build the Mix"). Predict: "Which gas makes up the biggest share of air?" (Nitrogen). Variables box: changed *the gas you measure* · measured *the share of the air for that gas* · kept the same *the same jar and the same air*. (The brief calls this part an observation.) Does: Measure the share of nitrogen, oxygen, and carbon dioxide with the other gases in the jar of air. Takeaway: Most of the air is nitrogen, then oxygen, with only a small sliver of carbon dioxide and other gases.
- **Part (c): Which gas is which** (bench pill "🧪 Which Gas Is Which"). Predict: "What will happen to the splint and the limewater when they are tested with air from the jar?" (The splint keeps glowing and the limewater turns cloudy). Variables box: changed *which test you use* · measured *the sign you see* · kept the same *the same jar of air*. (The brief calls this part an observation.) Does: Test the air in the jar with a glowing splint and with limewater, and score the sign you see. Takeaway: A splint that keeps glowing shows oxygen is present. Cloudy limewater shows carbon dioxide is present.
- Safety line: Limewater is for testing only, never for drinking. A real glowing splint is handled by an adult.
- Typed Challenge questions (marked by the app): "What is air? [1]" · "On the bench, the glowing splint kept glowing when it was tested with air from the jar. Explain why. [2]" · "On the bench, the limewater turned cloudy, but only slowly, when it was tested with air from the jar. Explain why. [2]"
- Mind map to pick: **Circulatory System** (The poster has no branch for what air is made of.)
- Script check: The gas tests: "A glowing splint keeps glowing when oxygen is present", and air turns limewater cloudy "slowly". The textbook scans hold no readable text for Chapter 4, so check both against the book before the video states either test.
- Script check: All three parts show a variables box, but the brief calls all three observations.

#### 4.2A Airway Explorer  ·  In review (admin/adult mode only)
- Folder: `labs/p5-4-2a/` · list line: "Experiment · about 30 minutes · runs in 3D" · bench: **Airway Explorer Lab** ("The route air takes into the body"), intro button "Start breathing →"
- Spoken: "Open the School Lab, experiment four point two A, and press, Let's test it now!"  ·  card line: `School Lab › 4.2A  Airway Explorer`
- Big idea (app): Air enters through the nose, travels down the windpipe and reaches the lungs. The nose warms and filters the air, and the windpipe is a passage for it. The lungs are where oxygen and carbon dioxide are exchanged. A deeper breath fills the lungs more than a shallow one.
- **Part (a): Which way does air go** (bench pill "🧭 Which Way Does Air Go"). Predict: "Which order does a breath of air travel through the body?" (Nose, windpipe, lungs). No variables box (a tap task: sequence). Does: Choose breathing in or out, then tap the parts in the order the air meets them. Takeaway: Air enters through the nose, passes down the windpipe and reaches the lungs. Breathing out follows the same tube back.
- **Part (b): What each part does** (bench pill "🏷️ What Each Part Does"). Predict: "Which part filters and warms the air first?" (The nose). No variables box (a tap task: choice). Does: Choose a part of the airway, then tap the job that belongs to it. Takeaway: The nose warms and filters the air, the windpipe is a passage, and the lungs exchange gases.
- **Part (c): Breathe and watch** (bench pill "🫁 Breathe and Watch"). Predict: "Does a deep breath fill the lungs more than a shallow breath?" (Yes, they fill more). Variables box: changed *the depth of the breath* · measured *how full the lungs get* · kept the same *the same torso, the same speed and the same rest*. Does: Choose a shallow, medium or deep breath and read how full the lungs get. Takeaway: A deeper breath draws in more air, so the lungs fill more than they do with a shallow breath.
- Typed Challenge questions (marked by the app): "What do the lungs do? [1]" · "On the bench, the air you breathed out met the same parts as the air you breathed in, but in the opposite order. Explain why. [2]" · "In your results, a deep breath filled the lungs more than a shallow breath. Explain why. [2]"
- Mind map to pick: **Circulatory System** (There is no respiratory-only poster. Only the poster's "Lungs" branch touches this lab; it has no nose or windpipe.)
- Script check: The bench takes air in through the nose only. Mix-up buster #55: the mouth belongs to the digestive system. The two agree.
- Script check: "The lungs are where oxygen and carbon dioxide are exchanged": say exchanged between the air in the lungs and the blood.

#### 4.2B Limewater Test  ·  In review (admin/adult mode only)
- Folder: `labs/p5-4-2b/` · list line: "Experiment · about 30 minutes · runs in 3D" · bench: **Limewater Test Lab** ("What changes in the air we breathe out"), intro button "Start testing →"
- Spoken: "Open the School Lab, experiment four point two B, and press, Let's test it now!"  ·  card line: `School Lab › 4.2B  Limewater Test`
- Big idea (app): Breathed-out air turns limewater cloudy because it carries more carbon dioxide than room air. It leaves a foggy patch on a cool mirror because it carries water vapour. Compared with air breathed in, air breathed out has less oxygen and more carbon dioxide and water vapour. Both are mixtures of gases. We do not breathe in only oxygen.
- **Part (a): Blow into limewater** (bench pill "🧪 Blow Into Limewater"). Predict: "Will blowing breath into limewater make it turn cloudy?" (Yes, it turns cloudy). Variables box: changed *the kind of air blown through the straw* · measured *the cloudiness of the limewater after one minute* · kept the same *the same amount of limewater, the same straw and the same blowing time*. Does: Blow room air, then breath, through a straw into limewater and score how cloudy it gets. Takeaway: Exhaled breath turns limewater cloudy because it carries more carbon dioxide than room air.
- **Part (b): Breath on the mirror** (bench pill "🪞 Breath on the Mirror"). Predict: "What will appear on the mirror after breathing out onto it?" (A foggy patch of tiny water droplets). Variables box: changed *whether the breath has reached the mirror yet* · measured *the fog on the mirror* · kept the same *the same mirror, in the same cool air*. (The brief calls this part an observation.) Does: Look at the mirror before and after breath is blown onto it, and score the fog. Takeaway: A foggy patch on the mirror shows exhaled breath carries water vapour. The vapour turns into tiny droplets on the cool glass.
- **Part (c): Compare the air** (bench pill "📊 Compare the Air"). Predict: "How does the air breathed out compare with the air breathed in?" (Less oxygen, and more carbon dioxide and water vapour). Variables box: changed *whether the air was breathed in or out* · measured *the share of oxygen in the air* · kept the same *the same chart and the same four groups of gases*. (The brief calls this part an observation.) Does: Measure the gases in the air breathed in and the air breathed out, and compare the oxygen bars. Takeaway: Air breathed out has less oxygen, and more carbon dioxide and water vapour, than air breathed in. It is a mixture, not one gas.
- Safety line: Limewater is for testing only, never for drinking.
- Typed Challenge questions (marked by the app): "What is water vapour? [1]" · "In your results, breath made the limewater much cloudier than room air did. Explain why. [2]" · "In your results, the air breathed out had less oxygen and more carbon dioxide than the air breathed in. Explain why. [2]"
- Mind map to pick: **Circulatory System** (There is no respiratory-only poster. Only the poster's "Lungs" branch touches this lab.)
- Script check: Matches misconception M-27 and Mix-up buster #56: we do not breathe in only oxygen.
- Script check: Parts (b) and (c) show variables boxes, but the brief calls both observations.

#### 4.3 Three Ways to Breathe  ·  In review (admin/adult mode only)
- Folder: `labs/p5-4-3/` · list line: "Experiment · about 30 minutes · runs in 3D" · bench: **Three Ways to Breathe Lab** ("Plant, fish and human compared"), intro button "Start comparing →"
- Spoken: "Open the School Lab, experiment four point three, and press, Let's test it now!"  ·  card line: `School Lab › 4.3  Three Ways to Breathe`
- Big idea (app): A plant, a fish and a human all exchange oxygen and carbon dioxide, through different parts. A plant uses tiny leaf openings, a fish uses gills, and a human uses lungs. Warm water brings out tiny bubbles of gas from a leaf, showing its openings. Every living thing needs a way to exchange gases.
- **Part (a): Spot the gas doors** (bench pill "🔎 Spot the Gas Doors"). Predict: "Which part does each living thing use to swap gases?" (Leaf openings for the plant, gills for the fish, lungs for the human). No variables box (a tap task: choice). Does: Choose a living thing, then tap the part it uses to swap gases with the air or water. Takeaway: A plant uses tiny leaf openings, a fish uses gills, and a human uses lungs to exchange gases.
- **Part (b): Follow the oxygen** (bench pill "🧭 Follow the Oxygen"). Predict: "Once oxygen enters each living thing, where does it go next?" (It travels further inward to be used). No variables box (a tap task: choice). Does: Choose a living thing, watch the arrow, then tap where the oxygen goes after it enters. Takeaway: In each living thing, oxygen taken in at the gas part travels further inward to be used.
- **Part (c): Warm leaf test** (bench pill "🌡️ Warm Leaf Test"). Predict: "Will warm water bring out more tiny bubbles from the leaf than cool water?" (Yes, it brings out more bubbles). Variables box: changed *the temperature of the water* · measured *the number of tiny bubbles in five minutes* · kept the same *the same leaf, the same dip depth and the same beaker*. Does: Set the water temperature and count the tiny bubbles that come out of the leaf in five minutes. Takeaway: Warm water brings out more tiny bubbles, which shows the leaf has openings that let gas in and out.
- Safety line: The warm water is handled by the bench. Never touch hot water yourself.
- Typed Challenge questions (marked by the app): "What does it mean when a living thing exchanges gases? [1]" · "On the bench, the oxygen did not stay at the gills or in the lungs. It travelled further inward. Explain why. [2]" · "In your results, tiny bubbles came out of the leaf in the water, and more came out as the water got warmer. Explain what the bubbles show about the leaf. [2]"
- Mind map to pick: **Circulatory System** (The poster is about humans only. It has nothing on plants or fish.)
- Script check: The bench says "tiny leaf openings" and never names them. The Plant System Mix-up busters #40 and #42 say "stomata". Agree with the teacher whether a P5 video says "stomata".
- Script check: "A plant takes in oxygen and gives out carbon dioxide" is true, but P6 adds photosynthesis (misconception M-23). Do not say "only".

#### 4.4 Pump and Pipes  ·  In review (admin/adult mode only)
- Folder: `labs/p5-4-4/` · list line: "Experiment · about 30 minutes · runs in 3D" · bench: **Pump and Pipes Lab** ("The heart, blood vessels and blood"), intro button "Start pumping →"
- Spoken: "Open the School Lab, experiment four point four, and press, Let's test it now!"  ·  card line: `School Lab › 4.4  Pump and Pipes`
- Big idea (app): Blood carries oxygen and digested food to the body, and carbon dioxide and waste away. The heart pumps blood round the body. A faster pump moves it more quickly. Blood visits the lungs to pick up oxygen before it reaches the rest of the body. Blood carries oxygen from the air, not air itself.
- **Part (a): What blood carries** (bench pill "🩸 What Blood Carries"). Predict: "What does blood carry around the body?" (Oxygen and digested food in, carbon dioxide and waste out). No variables box (a tap task: choice). Does: Choose a blood vessel, then tap what it carries at that point. Takeaway: Blood carries oxygen and digested food to the body, and carbon dioxide and waste away from it.
- **Part (b): Pump the heart** (bench pill "❤️ Pump the Heart"). Predict: "Does a faster pumping heart move blood round the loop more quickly?" (Yes, the loop takes less time). Variables box: changed *the pump rate of the heart* · measured *the time for a drop of blood to go once round the loop* · kept the same *the same vessels, the same blood and the same body*. Does: Set the pump to slow, normal or fast and time a drop of blood round one full loop. Takeaway: A faster-pumping heart moves blood around the loop more quickly, so one trip takes less time.
- **Part (c): Trace a loop** (bench pill "🧭 Trace a Loop"). Predict: "Where does the blood pick up oxygen, and where does it give it up?" (It picks up oxygen at the lungs and gives it up at the body). No variables box (a tap task: choice). Does: Choose the lungs or the body, watch the drop reach it, then tap what the drop carries as it leaves. Takeaway: Blood picks up oxygen at the lungs, then swaps it for carbon dioxide at the body.
- Typed Challenge questions (marked by the app): "What are blood vessels? [1]" · "In your results, a drop of blood went round the loop in less time when the heart pumped faster. Explain why. [2]" · "On the bench, the drop of blood was carrying oxygen when it left the lungs, but carbon dioxide when it left the body. Explain why. [2]"
- Mind map to pick: **Circulatory System**
- Script check: Part (c) colours the drop of blood "red with oxygen and blue with carbon dioxide". Blood is never blue. If you film it, say that the colours are only a code.
- Script check: The bench says "blood vessels" and does not name arteries or veins, as the series plan wants.

#### 4.5 Two Systems Side by Side  ·  In review (admin/adult mode only)
- Folder: `labs/p5-4-5/` · list line: "Experiment · about 30 minutes · runs in 3D" · bench: **Two Systems Side by Side Lab** ("The plant's tubes and the human's blood vessels"), intro button "Start comparing →"
- Spoken: "Open the School Lab, experiment four point five, and press, Let's test it now!"  ·  card line: `School Lab › 4.5  Two Systems Side by Side`
- Big idea (app): Plants and humans both move substances to every part of their body to help them survive. The human system has a pump, the heart. The plant system shown here has none. Some jobs, like carrying food, are shared by both systems. The two systems are alike in their job, but they are not the same.
- **Part (a): Same job** (bench pill "🤝 Same Job"). Predict: "What job do the plant's tubes and the human's blood vessels share?" (Both carry substances to every part). No variables box (a tap task: choice). Does: Choose a substance card, then tap the system that carries it to every part: the plant, the human, or both. Takeaway: Both the plant system and the human system carry substances to every part of the living thing.
- **Part (b): What's different** (bench pill "🔀 What's Different"). Predict: "What is different between the plant's tubes and the human's blood vessels?" (The human system has a pump, the heart). Variables box: changed *the system you watch* · measured *the number of beats counted in ten seconds* · kept the same *the same ten seconds and the same bench*. (The brief calls this part an observation.) Does: Choose the human system or the plant system, and count the beats you see in ten seconds. Takeaway: The human system has a pump, the heart. The plant system shown here has none.
- **Part (c): Which one am I** (bench pill "🗂️ Which One Am I"). Predict: "Where does the card "found in blood vessels" belong?" (The human bin). No variables box (a tap task: choice). Does: Choose a feature card, then tap the bin it belongs in: the plant bin, the human bin, or both. Takeaway: Some features, like carrying food, are shared. Others, like a pump, belong only to humans.
- Typed Challenge questions (marked by the app): "What are the water-carrying tubes of a plant? [1]" · "On the bench, the food card went to both the plant system and the human system. Explain why. [2]" · "In your results, you counted beats in the human system but no beats in the plant system. Explain why. [2]"
- Mind map to pick: **Circulatory System** (The poster is about humans only. For the plant half, use the Plant System poster.)
- Script check: The bench is careful: "The plant system shown here has none" (no pump). Keep that hedge.

#### 4.6 Heart Rate Challenge  ·  In review (admin/adult mode only)
- Folder: `labs/p5-4-6/` · list line: "Experiment · about 30 minutes · runs in 3D" · bench: **Heart Rate Challenge Lab** ("Heart rate and breathing rate in exercise"), intro button "Start measuring →"
- Spoken: "Open the School Lab, experiment four point six, and press, Let's test it now!"  ·  card line: `School Lab › 4.6  Heart Rate Challenge`
- Big idea (app): Heart rate and breathing rate rise with more vigorous activity. The muscles need more oxygen and digested food, so the heart pumps faster. Breathing quickens too, to take in the extra oxygen. Sitting still gives the lowest heart rate and breathing rate, and jumping gives the highest.
- **Part (a): Choose the activity** (bench pill "🏃 Choose the Activity"). Predict: "Which activity will give the highest heart rate?" (Jumping). Variables box: changed *the activity: sitting, marching or jumping* · measured *the heart rate in beats a minute* · kept the same *the same body model, the same 15 seconds and the same rest before each trial*. Does: Choose sitting, marching or jumping, and measure the heart rate and breathing rate for 15 seconds. Takeaway: A more vigorous activity raises both heart rate and breathing rate.
- **Part (b): See the pattern** (bench pill "📈 See the Pattern"). Predict: "How does breathing rate change from sitting to marching to jumping?" (It rises steadily, like the heart rate). Variables box: changed *the activity you read* · measured *the average breathing rate* · kept the same *the same body model and the same chart*. (The brief calls this part an observation.) Does: Read the average breathing rate for sitting, marching and jumping, then name the trend. Takeaway: Breathing rate rises as the activity becomes more vigorous, just as the heart rate does.
- **Part (c): Why it climbs** (bench pill "🫀 Why It Climbs"). Predict: "Why does the heart beat faster during vigorous activity?" (The muscles need more oxygen and digested food). Variables box: changed *the effort level, from rest to vigorous* · measured *the heart rate in beats a minute* · kept the same *the same glass torso and the same body*. (The brief calls this part an observation.) Does: Choose an effort level from rest to vigorous, and watch the heart and lungs speed up together. Takeaway: The heart and breathing speed up as the effort rises. Working muscles need more oxygen and digested food.
- Safety line: The body model does the sitting, marching and jumping, so you do not need to move to test it.
- Typed Challenge questions (marked by the app): "What is heart rate? [1]" · "In your results, the heart rate was higher when the body model was jumping than when it was sitting. Explain why. [2]" · "In your results, the breathing rate also rose as the activity became more vigorous. Explain why. [2]"
- Mind map to pick: **Circulatory System**
- Script check: The heart rate is counted for 15 seconds and shown in beats a minute. Explain the times-four step if the video shows it.

#### 4.7 Blood's Big Trip  ·  In review (admin/adult mode only)
- Folder: `labs/p5-4-7/` · list line: "Experiment · about 30 minutes · runs in 3D" · bench: **Blood's Big Trip Lab** ("One loop of blood round the body"), intro button "Start the journey →"
- Spoken: "Open the School Lab, experiment four point seven, and press, Let's test it now!"  ·  card line: `School Lab › 4.7  Blood's Big Trip`
- Big idea (app): A drop of blood goes from the heart to the lungs and back, then out to the body and back to the heart. At the lungs it picks up oxygen. At the body it gives up the oxygen and picks up carbon dioxide to carry away. During exercise the heart pumps faster, so the loop takes less time. Blood carries oxygen, not air.
- **Part (a): Plan the trip** (bench pill "🧩 Plan the Trip"). Predict: "What is the correct order for a drop of blood's journey?" (Heart, lungs, heart, body, heart). No variables box (a tap task: sequence). Does: Choose where the drop starts, then tap the stops in the order it visits them. Takeaway: A drop of blood travels from the heart to the lungs, back to the heart, out to the body and back to the heart.
- **Part (b): Ride along** (bench pill "🚗 Ride Along"). Predict: "What does the drop pick up and drop off along its journey?" (It gains oxygen at the lungs and swaps it for carbon dioxide at the body). Variables box: changed *the place on the loop you watch* · measured *the oxygen the drop carries at that place* · kept the same *the same torso and the same drop*. (The brief calls this part an observation.) Does: Choose a place to watch, ride one loop with the drop, and score how much oxygen it carries there. Takeaway: Along the loop, the drop gains oxygen at the lungs, then swaps it for carbon dioxide at the body.
- **Part (c): Faster loop** (bench pill "⏱️ Faster Loop"). Predict: "Does the loop take less time during exercise than at rest?" (Yes, it takes less time). Variables box: changed *the pump rate of the heart: resting or exercising* · measured *the time for one loop* · kept the same *the same vessel width, the same loop length and the same body size*. Does: Set the heart to resting or exercising and time a drop of blood round one full loop. Takeaway: During exercise, the heart pumps faster, so the loop takes less time.
- Typed Challenge questions (marked by the app): "What does the heart do? [1]" · "On the bench, the drop of blood went to the lungs before it went to the rest of the body. Explain why. [2]" · "In your results, one loop took less time when the heart was exercising than when it was resting. Explain why. [2]"
- Mind map to pick: **Circulatory System**
- Script check: The order "Heart, lungs, heart, body, heart" goes beyond the Circulatory System poster, which has no order branch. Narrate the order, and keep the mind map to the poster.


### Chapter 5: Electrical Systems (Systems)

#### 5.1 Circuit Parts  ·  In review (admin/adult mode only)
- Folder: `labs/p5-5-1/` · list line: "Experiment · about 25 minutes · runs in 3D" · bench: **Circuit Parts Lab** ("The parts of a circuit and the complete loop"), intro button "Start clipping →"
- Spoken: "Open the School Lab, experiment five point one, and press, Let's test it now!"  ·  card line: `School Lab › 5.1  Circuit Parts`
- Big idea (app): An electric circuit is made of a battery, wires and a bulb. A bulb lights only when it is joined in one complete loop with the battery. Both ends of the battery must be fastened. A bulb has two contacts, joined inside by one unbroken path.
- **Part (a): Will it light?** (bench pill "🔌 Will It Light?"). Predict: "Will the bulb light with one wire left unclipped?" (No. The loop is not complete). Variables box: changed *the way the wires and bulb are joined* · measured *the brightness of the bulb* · kept the same *the battery and the length of wire*. Does: Try ways of clipping the wires, and read how brightly the bulb shines each time. Takeaway: A bulb lights only when it is joined in one complete, unbroken loop with the battery.
- **Part (b): Look inside the bulb** (bench pill "🔍 Look Inside"). Predict: "What joins the two contacts inside the glass?" (One unbroken path, through a fine coil). Variables box: changed *whether you look from outside or inside* · measured *the number of parts of the path seen* · kept the same *the same bulb, battery and wires*. (The brief calls this part an observation.) Does: Look at the bulb from outside, then from inside, and count the parts of its path. Takeaway: Both contacts of a bulb join the circuit. One unbroken path joins them inside the bulb.
- Safety line: Never join the two ends of a battery with a bare wire.
- Typed Challenge questions (marked by the app): "What is an electric circuit? [1]" · "In your results, the bulb stayed dark when one clip was left loose. Explain why. [2]" · "In your results, the bulb stayed dark when both clips were fastened to the same contact of the bulb. Explain why. [2]"
- Mind map to pick: **Electrical System**
- Script check: The bench calls the filament "a fine coil". It never says "filament".

#### 5.2 Closed Circuits  ·  In review (admin/adult mode only)
- Folder: `labs/p5-5-2/` · list line: "Experiment · about 25 minutes · runs in 3D" · bench: **Closed Circuits Lab** ("Why a circuit must be closed"), intro button "Flick the switch →"
- Spoken: "Open the School Lab, experiment five point two, and press, Let's test it now!"  ·  card line: `School Lab › 5.2  Closed Circuits`
- Big idea (app): A closed circuit has no gap, so electricity flows and the bulb lights. An open circuit has a gap, so nothing flows and the bulb stays dark. A switch is built to open and close a circuit on purpose. Electricity flows round the whole loop. The bulb does not use it up.
- **Part (a): Open or closed?** (bench pill "🔓 Open or Closed?"). Predict: "With the switch left open, will the bulb light?" (No. The open switch leaves a gap in the loop). Variables box: changed *whether the switch is open or closed* · measured *the brightness of the bulb* · kept the same *the battery, the bulb and the wires*. Does: Flick the switch open and closed, and read how brightly the bulb shines each time. Takeaway: A switch closes the last gap in a circuit. Opening it breaks the loop at that gap.
- **Part (b): Watch it flow** (bench pill "✨ Watch It Flow"). Predict: "With the switch closed, what will you see moving along the wires?" (A glow moving all the way round the loop). Variables box: changed *the view of the loop* · measured *the number of parts glowing* · kept the same *the same battery, bulb and wires*. (The brief calls this part an observation.) Does: Look at the loop from outside, then with glass wires and the switch closed and open. Count the parts that glow. Takeaway: Electricity flows right round a closed circuit and is not used up. It stops flowing the moment the loop is broken.
- Safety line: Never join the two ends of a battery with a bare wire.
- Typed Challenge questions (marked by the app): "What is a closed circuit? [1]" · "In your results, the bulb stayed dark when the switch was open. Explain why. [2]" · "A pupil says, "The bulb uses up the electricity as it shines." Use what you saw in the glass wires to explain why the pupil is wrong. [2]"
- Mind map to pick: **Electrical System**
- Script check: "The bulb does not use it up" (electricity) is in line with the BRIEF-P5 rule. Mix-up buster #17 (mixups.js line 130) explains a dim torch with "chemical potential energy", which is P6. Keep energy words out of P5 videos.
- Script check: The bench always says "electricity flows". The Electrical System poster says "Current flows" and "No current flows". See the sign-off gates.

#### 5.3 Conductors and Insulators  ·  In review (admin/adult mode only)
- Folder: `labs/p5-5-3/` · list line: "Experiment · about 25 minutes · runs in 3D" · bench: **Conductors and Insulators Lab** ("Which materials let electricity flow"), intro button "Open the tester →"
- Spoken: "Open the School Lab, experiment five point three, and press, Let's test it now!"  ·  card line: `School Lab › 5.3  Conductors and Insulators`
- Big idea (app): Materials can be electrical conductors or electrical insulators. An electrical conductor, such as most metals, lets electricity flow through it. An electrical insulator, such as plastic, rubber and wood, does not. It leaves a gap, so nothing flows round the loop. A circuit tester sorts an object by whether the bulb lights.
- **Part (a): Test the object** (bench pill "🧪 Test the Object"). Predict: "Will the bulb light?" (Yes. Metal is an electrical conductor). Variables box: changed *the object placed across the gap* · measured *the brightness of the bulb* · kept the same *the battery, the bulb and the probe wires*. Does: Place objects across the gap, one at a time, and read how brightly the bulb shines. Takeaway: An object that lets the bulb light carries electricity across the gap. It is an electrical conductor.
- **Part (b): Follow the glow** (bench pill "🚧 Follow the Glow"). Predict: "What will the glow do?" (Nothing will glow. The loop has no complete path). Variables box: changed *the object placed across the gap* · measured *the number of parts of the loop that glow* · kept the same *the tester and its glass wires*. (The brief calls this part an observation.) Does: Watch the glow with different objects in the gap, and count the parts of the loop that glow. Takeaway: An electrical insulator leaves a gap. With no complete path, electricity does not flow anywhere in the loop.
- Safety line: Test only safe classroom objects with a battery. Never test a wall socket or a mains wire.
- Typed Challenge questions (marked by the app): "What is an electrical conductor? [1]" · "In your results, the bulb lit when the metal spoon was placed across the gap. Explain why. [2]" · "With the plastic ruler across the gap, no part of the loop glowed, not even the wire joined to the battery. Explain why. [2]"
- Mind map to pick: **Electrical System**
- Script check: The bench says "electrical conductor / insulator" in full. The poster says "Conductors & insulators" and "Metals let current through".

#### 5.4 Circuit Diagrams  ·  In review (admin/adult mode only)
- Folder: `labs/p5-5-4/` · list line: "Experiment · about 25 minutes · runs in 3D" · bench: **Circuit Diagrams Lab** ("Reading circuit diagrams with symbols"), intro button "Start matching →"
- Spoken: "Open the School Lab, experiment five point four, and press, Let's test it now!"  ·  card line: `School Lab › 5.4  Circuit Diagrams`
- Big idea (app): The parts of a circuit are shown with standard symbols. A circuit diagram uses these symbols to show a real circuit, without drawing every detail. A switch symbol drawn open means the built circuit has a gap, so the bulb will not light. Reading a diagram tells you how the real circuit will behave.
- **Part (a): Match the symbol** (bench pill "🔣 Match the Symbol"). Predict: "Which symbol stands for the bulb?" (A circle with a cross inside it). No variables box (a tap task: choice). Does: Tap each real part and choose its standard symbol. Takeaway: Every part of a circuit has its own standard symbol. It is used the same way in every diagram.
- **Part (b): Build the diagram** (bench pill "🗺️ Build the Diagram"). Predict: "Will the bulb light?" (No. The open switch leaves a gap). Variables box: changed *how the switch symbol is drawn* · measured *the brightness of the bulb when built* · kept the same *the number of batteries and bulbs, and the wires used*. Does: Choose how the switch is drawn, press Build, and read how brightly the bulb shines. Takeaway: A circuit diagram shows exactly how a real circuit will behave when it is built.
- Safety line: Never join the two ends of a battery with a bare wire.
- Typed Challenge questions (marked by the app): "What is a circuit diagram? [1]" · "On the bench, each part of the circuit had its own standard symbol. Explain why it is useful that every circuit diagram uses the same symbols. [2]" · "In your results, the bulb did not light when the circuit was built from the diagram with the switch drawn open. Explain why. [2]"
- Mind map to pick: **Electrical System**
- Script check: Bulb symbol: "a circle with a cross inside". Battery: "two parallel lines, one long and one short". Check both against the book's symbol table.


### Chapter 6: Series and Parallel Circuits (Systems)

#### 6.1 Batteries in Series  ·  In review (admin/adult mode only)
- Folder: `labs/p5-6-1/` · list line: "Experiment · about 25 minutes · runs in 3D" · bench: **Batteries in Series Lab** ("More batteries, a brighter bulb"), intro button "Open the bench →"
- Spoken: "Open the School Lab, experiment six point one, and press, Let's test it now!"  ·  card line: `School Lab › 6.1  Batteries in Series`
- Big idea (app): The more batteries joined in series, the brighter the bulb. Batteries in series must be joined + to − to work this way. Repeating a reading and finding the average makes a result more reliable. A rising line can be followed to judge roughly what the next point would show.
- **Part (a): Chain the batteries** (bench pill "🔋 Chain the Batteries"). Predict: "What happens to the bulb's brightness when a second battery is added?" (The bulb becomes brighter). Variables box: changed *the number of batteries in series* · measured *the brightness score on the meter* · kept the same *the bulb, the wires, and the + to − joining*. Does: Join one, two, then three batteries + to −, and read the brightness each time. Takeaway: The more batteries joined in series, the brighter the bulb. They must be joined + to −.
- **Part (b): Read the trend** (bench pill "📈 Read the Trend"). Predict: "What would the fourth point on the line show?" (A brightness higher than the third point). Variables box: changed *the number of batteries you read* · measured *the brightness read from the graph* · kept the same *the same graph and the same bulb*. (The brief calls this part an observation.) Does: Read the brightness at one, two and three batteries from the graph, then look ahead. Takeaway: A rising line lets us judge roughly what the next reading would show.
- Safety line: Never join the two ends of a battery with a bare wire. Parts can grow warm, so keep the loop closed only briefly.
- Typed Challenge questions (marked by the app): "What does it mean when batteries are joined in series? [1]" · "In your results, the bulb was brighter with three batteries in series than with one. Explain why. [2]" · "On your graph, the line rose from one battery to three. Explain what a fourth battery in series would most likely do to the brightness of the bulb. [2]"
- Mind map to pick: **Electrical System** (The poster's "Series" branch is about bulbs only. It has nothing on batteries in series.)
- Script check: A prediction reason says that two batteries "make electricity flow harder". Do not quote that phrase. Say "the bulb is brighter".
- Script check: Part (b) reads a trend off the graph. Its variables box (changed: the number of batteries you read) is a reading exercise, not a new test.

#### 6.2 Bulbs in Series  ·  In review (admin/adult mode only)
- Folder: `labs/p5-6-2/` · list line: "Experiment · about 25 minutes · runs in 3D" · bench: **Bulbs in Series Lab** ("More bulbs, a dimmer glow"), intro button "Open the bench →"
- Spoken: "Open the School Lab, experiment six point two, and press, Let's test it now!"  ·  card line: `School Lab › 6.2  Bulbs in Series`
- Big idea (app): The more bulbs joined in one series loop, the dimmer each bulb. All the bulbs in the loop share the same one path. Bulb A is at its brightest when it is the only bulb in the loop. A falling line shows the dimming and can be followed to judge the next point.
- **Part (a): Add a bulb** (bench pill "💡 Add a Bulb"). Predict: "What happens to the brightness of each bulb?" (Each bulb becomes dimmer). Variables box: changed *the number of bulbs in the loop* · measured *the brightness score of bulb A* · kept the same *the battery, the wires, and the single loop*. Does: Add one, two, then three bulbs to the loop, and read the brightness of bulb A each time. Takeaway: The more bulbs joined in one series loop, the dimmer each bulb. All the bulbs share the same one path.
- **Part (b): Read the trend** (bench pill "📉 Read the Trend"). Predict: "What would the fourth point on the line show?" (A brightness lower than the third point). Variables box: changed *the number of bulbs you read* · measured *the brightness read from the graph* · kept the same *the same graph and the same bulb A*. (The brief calls this part an observation.) Does: Read the brightness at one, two and three bulbs from the graph, then look ahead. Takeaway: A falling line lets us judge roughly what the next reading would show.
- Safety line: Never join the two ends of a battery with a bare wire. Parts can grow warm, so keep the loop closed only briefly.
- Typed Challenge questions (marked by the app): "What does it mean when bulbs are joined in series? [1]" · "In your results, bulb A became dimmer each time another bulb was added to the series loop. Explain why. [2]" · "On this bench, you ran each number of bulbs more than once and found the average. Explain why. [2]"
- Mind map to pick: **Electrical System**
- Script check: The poster's Series branch says "Bulbs are dimmer", and the bench agrees.

#### 6.3 Bulbs in Parallel  ·  In review (admin/adult mode only)
- Folder: `labs/p5-6-3/` · list line: "Experiment · about 25 minutes · runs in 3D" · bench: **Bulbs in Parallel Lab** ("Each bulb on its own path"), intro button "Open the bench →"
- Spoken: "Open the School Lab, experiment six point three, and press, Let's test it now!"  ·  card line: `School Lab › 6.3  Bulbs in Parallel`
- Big idea (app): Bulbs on separate parallel paths from one battery stay as bright as one bulb alone. Each bulb has its own separate path back to the battery. A level line shows a reading staying the same as more paths are added. This is different from bulbs in series, which grow dimmer as more are added.
- **Part (a): Add a path** (bench pill "🔀 Add a Path"). Predict: "What happens to the brightness of each bulb?" (Each bulb stays just as bright as before). Variables box: changed *the number of bulbs on separate paths* · measured *the brightness score of bulb A* · kept the same *the battery, the wires, and a separate path for each bulb*. Does: Add one, two, then three bulbs on separate paths, and read the brightness of bulb A each time. Takeaway: Bulbs on separate parallel paths from one battery stay as bright as one bulb alone.
- **Part (b): Read the trend** (bench pill "➖ Read the Trend"). Predict: "What would the fourth point on the line show?" (About the same brightness as the other points). Variables box: changed *the number of bulbs you read* · measured *the brightness read from the graph* · kept the same *the same graph and the same bulb A*. (The brief calls this part an observation.) Does: Read the brightness at one, two and three bulbs from the graph, then look ahead. Takeaway: A level line shows a reading that is not changing as more paths are added.
- Safety line: Never join the two ends of a battery with a bare wire. Parts can grow warm, so keep the circuit closed only briefly.
- Typed Challenge questions (marked by the app): "What is a parallel circuit? [1]" · "In your results, bulb A stayed about as bright when a second and a third bulb were added in parallel. Explain why. [2]" · "For each number of bulbs, you repeated the run and found the average. Explain why the average is used and not just one reading. [2]"
- Mind map to pick: **Electrical System**
- Script check: The poster's Parallel branch says "Bulbs are brighter" (than in series). The bench says they "stay as bright as one bulb alone". Both are true; say "brighter than in series" only when comparing the two.

#### 6.4 Bulb Arrangements  ·  In review (admin/adult mode only)
- Folder: `labs/p5-6-4/` · list line: "Experiment · about 25 minutes · runs in 3D" · bench: **Bulb Arrangements Lab** ("Series or parallel?"), intro button "Open the bench →"
- Spoken: "Open the School Lab, experiment six point four, and press, Let's test it now!"  ·  card line: `School Lab › 6.4  Bulb Arrangements`
- Big idea (app): Taking a bulb out of a series circuit breaks the loop, so every bulb goes out. Taking a bulb out of a parallel circuit leaves the other bulbs lit, on their own paths. A house is usually wired in parallel, so one room's bulb can be changed without affecting another. Choosing series or parallel changes what happens when a bulb is removed.
- **Part (a): Take one away** (bench pill "➖ Take One Away"). Predict: "In which circuit does the remaining bulb stay lit?" (The parallel circuit). Variables box: changed *the circuit a bulb is taken out of* · measured *the brightness of the bulb left behind* · kept the same *the battery, and two bulbs to start with*. Does: Take one bulb out of the series circuit, then out of the parallel circuit. Read the bulb left behind. Takeaway: Taking a bulb out breaks a series loop completely. A parallel circuit's other path still works on its own.
- **Part (b): Wire the house** (bench pill "🏠 Wire the House"). Predict: "What happens to the kitchen bulb when the living room bulb is taken out?" (The kitchen bulb goes dark too). Variables box: changed *the wiring, series or parallel* · measured *the brightness of the kitchen bulb* · kept the same *the battery and one bulb in each room*. Does: Wire the two rooms in series, then in parallel. Take out the living room bulb each time and read the kitchen bulb. Takeaway: Wiring rooms in parallel lets one room's bulb be changed without affecting the other room.
- Safety line: Never touch real mains wiring or sockets. This bench uses batteries only.
- Typed Challenge questions (marked by the app): "What is a series circuit? [1]" · "In your results, the bulb left behind in the parallel circuit stayed lit when the other bulb was taken out. Explain why. [2]" · "With series wiring in the toy house, the kitchen bulb went dark when the living room bulb was taken out. Explain why. [2]"
- Mind map to pick: **Electrical System**
- Script check: "A house is usually wired in parallel" matches the series plan (episode 26).

#### 6.5 Electricity Safely and Wisely  ·  In review (admin/adult mode only)
- Folder: `labs/p5-6-5/` · list line: "Experiment · about 25 minutes · runs in 3D" · bench: **Electricity Safely and Wisely Lab** ("Using electricity safely and wisely"), intro button "Open the bench →"
- Spoken: "Open the School Lab, experiment six point five, and press, Let's test it now!"  ·  card line: `School Lab › 6.5  Electricity Safely and Wisely`
- Big idea (app): Electricity must be handled with care: never with wet hands, and never through damaged wires. A hazard is something that could cause harm. We spot it before anyone is hurt. We can each save electricity by switching things off when they are not needed. Small daily habits add up to a lower meter reading over time.
- **Part (a): Spot the hazard** (bench pill "⚠️ Spot the Hazard"). Predict: "Is a lamp with a frayed wire safe to use?" (No. The bare metal is a hazard even before anyone touches it). No variables box (a tap task: choice). Does: Look at each hazard in the room, then tap the safety measure that fits it. Takeaway: A hazard is spotted by what could go wrong, before anyone is hurt.
- **Part (b): Save electricity** (bench pill "🔌 Save Electricity"). Predict: "What happens to the meter reading if the lamp is switched off whenever the room is empty?" (It ends lower than if the lamp stayed on all day). Variables box: changed *the habits followed* · measured *the meter reading at the end of the day* · kept the same *the same appliances and the same 24 hours*. Does: Run a day with no habits, then with lights off, then with lights, TV and charger all switched off. Read the meter each time. Takeaway: Switching things off when they are not needed uses less electricity over a day.
- Safety line: Electricity and water must never meet. Use dry hands only, and never handle a wire with damaged covering.
- Typed Challenge questions (marked by the app): "What is a hazard? [1]" · "In the model room, the lamp's wire was frayed, with bare metal showing. Explain why the lamp should not be used until the wire is replaced. [2]" · "In your results, the meter reading was lowest on the day the lamp, the television and the charger were switched off when not needed. Explain why. [2]"
- Mind map to pick: **Electrical System** (The poster has no safety or saving-electricity branch.)
- Script check: The safety lines are real: "never with wet hands", "never through damaged wires". Mix-up buster #21: when a question asks for the property, plastic is an electrical insulator (safety is the use).

#### 6.6 Circuit Toy Maker  ·  In review (admin/adult mode only)
- Folder: `labs/p5-6-6/` · list line: "Experiment · about 25 minutes · runs in 3D" · bench: **Circuit Toy Maker Lab** ("Wiring a toy and adding a switch"), intro button "Open the workshop →"
- Spoken: "Open the School Lab, experiment six point six, and press, Let's test it now!"  ·  card line: `School Lab › 6.6  Circuit Toy Maker`
- Big idea (app): A working toy circuit follows the same rules as any circuit. A battery, wires and a bulb are joined in one complete loop. Every clip must be fastened. Building a switch into a circuit lets it be turned on and off easily. Understanding circuits lets us design things that use electricity on purpose.
- **Part (a): Wire the toy** (bench pill "🛠️ Wire the Toy"). Predict: "Will the lantern light come on?" (No. The loop still has a gap where the clip is open). Variables box: changed *the build of the toy circuit* · measured *the brightness of the lantern* · kept the same *the same battery and wires*. (The brief calls this part an observation.) Does: Test three builds: a bulb missing, a clip open, and a complete loop. Read the lantern each time. Takeaway: A toy's circuit works the same way as any other. Every part must be joined in one complete loop.
- **Part (b): Add a switch** (bench pill "🔘 Add a Switch"). Predict: "Which toy can have its light turned off without pulling any wire loose?" (The toy with a switch). Variables box: changed *whether the toy has a switch* · measured *the brightness left after trying to turn it off* · kept the same *the same battery, bulb and tower*. Does: Try to turn the light off on a toy without a switch, then on a toy with one. Takeaway: Building a switch into a circuit lets it be turned on and off easily.
- Safety line: Never join the two ends of a battery with a bare wire.
- Typed Challenge questions (marked by the app): "What is a switch? [1]" · "In your results, the lantern lit only in the build with every clip fastened. Explain why. [2]" · "On the toy without a switch, the light stayed on when you tried to turn it off. Explain why it is useful to build a switch into the toy's circuit. [2]"
- Mind map to pick: **Electrical System**

---

## 4. Mind Lab posters, word for word, and the spoken mind-map line

### 4a. The Mind Lab (`mindmap.html`)
- **Page title:** "Science Claw Mind Lab". **Subtitle:** "MOE Primary Science Syllabus 2023 · P3–P6 · 17 chapters" (lines 496–497). The chapter list ("Every chapter, mapped", "Grouped by the five syllabus themes. Tap one to draw it.", lines 507–508) shows each chapter name with a small level tag (line 5136).
- **The P5 buttons** (the `TOPICS` array, lines 670–860):

| Theme row | Button text (exact) | Tag | Topic id | `mindmap.html` line | P5 book chapters it covers |
|---|---|---|---|---|---|
| Cycles | Reproduction in Plants | P5 | `reproduction` | 704 | Ch 1 Reproduction in Animals and Plants (plants only) |
| Cycles | The Water Cycle | P5 | `water` | 726 | Ch 2 Cycles in Water |
| Systems | Circulatory System | P5 | `respcirc` | 748 | Ch 4 Respiratory and Circulatory Systems (its "Lungs" branch is the only respiratory part) |
| Systems | Plant System | P4/P5 | `plants` | 759 | Ch 3 Plant Transport System (the P4 poster, shared) |
| Systems | Electrical System | P5 | `electrical` | 768 | Ch 5 Electrical Systems + Ch 6 Series and Parallel Circuits |

- **Missing posters.** There is **no human-reproduction poster**: "Reproduction in Plants" is about flowers only. There is **no respiratory-only poster**: no nose, no windpipe, no air-is-a-mixture. A video on 1.2, 1.3, 1.4, 1.6, 2.6, 2.7, 4.1, 4.2A, 4.2B or 4.3 can only pick the nearest poster; `labs_p5.json` gives the reason in `mindmap.note`.
- The P4 Plant System poster opens first on the page (`let current=TOPICS.find(t=>t.id==='plants')`, line 4619).

**What each P5 poster says** (the app's own text: the main idea, then each branch with its points, then the three or four "can do" lines under the poster). The videos' mind maps must use this wording.

- **Reproduction in Plants** (`reproduction`, P5, Cycles). Main idea: "A flower makes seeds, and those seeds travel away to grow into new plants." Branches:
  - Parts of a flower: Stamen and anther, Stigma and ovary, Ovule
  - Pollination: Pollen lands on the stigma, Carried by insects, Carried by wind
  - Fertilisation: Pollen joins the ovule, The ovule becomes a seed
  - Seed dispersal: By wind, By water, By animals, By splitting
  - Germination: Needs water, Needs air, Needs warmth
  - Can-do lines: "Name the flower parts and say what each one does" · "Trace pollen from anther to a new seed" · "Link a seed’s features to how it is dispersed"
- **The Water Cycle** (`water`, P5, Cycles). Main idea: "Water moves round and round between the sea, the sky and the land, changing state as it goes." Branches:
  - Evaporation: Liquid turns into gas, Faster when it is hotter, Faster in the wind
  - Condensation: Gas turns back into liquid, Happens on a cold surface
  - Boiling: Only at the boiling point, Bubbles all through the liquid
  - Freezing & melting: Water turns into ice, Ice turns back into water
  - Round and round: Sea and land, Clouds, Rain, Back to the sea
  - Can-do lines: "Tell evaporation and boiling apart" · "Explain the water droplets on a cold glass" · "Follow one drop of water all the way round the cycle"
- **Circulatory System** (`respcirc`, P5, Systems; drawn in the "sides" layout). Main idea: "The heart, blood vessels and blood work together to carry substances around the body." Branches:
  - Heart: Pumps blood around the body, Beats faster when we are active
  - Lungs: Blood takes in oxygen, Blood gives off carbon dioxide
  - Blood vessels: Carry blood to and from the heart, Reach all parts of the body
  - Blood: Carries oxygen, digested food and water, Carries carbon dioxide and waste away
  - Body parts: Take in oxygen and digested food, Give off carbon dioxide
  - Can-do lines: "Trace the blood from the heart to the lungs and back" · "Explain why the heart beats faster when we are active" · "Name what blood carries to and from the body parts"
- **Plant System** (`plants`, P4/P5, Systems; it carries the user's own wording, per the comment at line 660). Main idea: "Different parts that work together so that the plant grows well" (no full stop in the app). Branches:
  - Leaves: Make food, Take in and give out gases
  - Stem: Hold the plant upright to get light, Transport food, water and mineral salts to different parts of the plant
  - Roots: Hold the plant firmly to the ground, Absorb water and dissolved mineral salts
  - Can-do lines: "Name each plant part and the job it does" · "Follow water from the soil up to a leaf" · "Predict what happens to a plant with its stem cut"
- **Electrical System** (`electrical`, P5, Systems; it has a 3D circuit view, `sim:'circuit'`). Main idea: "Electricity flows only when the path is complete. How we arrange the parts changes what happens." Branches (six):
  - Parts of a circuit: Cell or battery, Bulb, Switch, Wires
  - Closed circuit: The path is complete, Current flows, The bulb lights up
  - Open circuit: The path is broken, No current flows, The bulb stays off
  - Conductors & insulators: Metals let current through, Plastic and wood do not
  - Series: One path only, One bulb out, all out, Bulbs are dimmer
  - Parallel: More than one path, One bulb out, the others stay on, Bulbs are brighter
  - Can-do lines: "Draw a closed circuit that lights a bulb" · "Test whether a material is a conductor or an insulator" · "Predict what happens when one bulb is removed from a series or parallel circuit" · "Explain why parallel bulbs are brighter than series bulbs"

**How the posters compare with the labs and the book** (for the mind-map segment of each script):
- The **Electrical System** poster says "Current flows", "No current flows" and "Metals let current through" (lines 771–773). The labs never say "current": `BRIEF-P5.md` §1 bans it ("say 'electricity flows'"), and the series plan keeps "the words voltage and current" out of episodes 23–26. **The mind map must match the poster, so this is a sign-off gate (§7).**
- In **Reproduction in Plants**, "Pollen joins the ovule" (line 708) is looser than the book ("the male reproductive cell from pollen fuses with the egg cell in the ovule"). "Pollen lands on the stigma" is close to the answer that Mix-up buster #45 marks as the mix-up ("Pollen touches the stigma"; the right answer is the TRANSFER of pollen FROM the anther TO the stigma). The poster has no petal, filament or style; lab 1.5A has all of them.
- **The Water Cycle** has no "exposed surface area" point (lab 2.4 tests it), no 0 °C or 100 °C, and no "gains heat / loses heat".
- **Plant System** never says "water-carrying tubes" or "food-carrying tubes", the P5 words that every Chapter 3 lab uses; it says "Transport food, water and mineral salts".
- **Electrical System** says "Cell or battery". The P5 labs say only "battery".

### 4b. "My mind map" maker (now on `main`)
- **Ways in:**
  - the sun (or moon) tagged "Mind maps" in the right margin of the Questions screen;
  - on phones, the **"✏️ Mind maps"** pill (`index.html` line 977; it shows wherever the sun is hidden, lines 4175–4180);
  - in the Mind Lab, the **"✏️ Make my own mind map"** button (`#mm-make`, `mindmap.html` line 500);
  - `mindmap.html#make` opens the maker directly.
- **The chapter picker** (`mymap.js` lines 291–299) reads `window.MindLab.topics` (`mindmap.html` line 5507). It groups the options by theme, and each option reads `title + " (" + level + ")"`. The P5 options, exactly:
  - under **Cycles**: "Reproduction in Plants (P5)", "The Water Cycle (P5)" (alongside "Life Cycles (P3)" and "Matter (P4)");
  - under **Systems**: "Circulatory System (P5)", "Plant System (P4/P5)", "Electrical System (P5)" (alongside "Digestive System (P4)").
- The picker starts on whichever poster is on the stage (Plant System when the page opens), so the pupil must **pick** the chapter.
- A new map's middle word starts as the chapter title, and its default name is "My <title> mind map" (`mymap-core.js` line 187). That gives "My The Water Cycle mind map", which reads oddly; rename the seeded map in any phone shot. The limits are 10 branches, 8 sub-branches each, 60 characters per box and 40 for the name (`mymap-core.js` line 20).
- **The spoken line** (P4 pattern): "Save it in TheOneApp, the ultimate science app. Tap Mind maps, then, Make my own mind map, and pick <chapter>." For P5, end it with one of these exact chapter names:
  - Ch 1 Reproduction in Animals and Plants → "…and pick **Reproduction in Plants**."
  - Ch 2 Cycles in Water → "…and pick **The Water Cycle**."
  - Ch 3 Plant Transport System → "…and pick **Plant System**."
  - Ch 4 Respiratory and Circulatory Systems → "…and pick **Circulatory System**."
  - Ch 5 Electrical Systems and Ch 6 Series and Parallel Circuits → "…and pick **Electrical System**."
- **Phone screenshots:** use the P3/P4 method (`app_p3.md` §4b). Add the P5 ids to the shot script's `titles` map: `reproduction: 'Reproduction in Plants'`, `water: 'The Water Cycle'`, `plants: 'Plant System'`, `respcirc: 'Circulatory System'`, `electrical: 'Electrical System'`. Give the P5 kit its own `mm/` folder, so that P5 episode N does not overwrite P4 episode N.

---

## 5. The bench Challenge questions as a mix-up source

Positive-language note: the app calls these "mix-ups", "think again" and "say it right". Use "Lots of students mix this up", never "trap", on screen. (The benches tag one question per Challenge as "The trap" internally, in 26 of the 40 labs.) Each line quotes a real wrong option or a wrong prediction reason from the bench, then gives the source. All of them are in `labs_p5.json` (`challenge[].mixups`, `parts[].predictOptions`).

### Reproduction (Ch 1)
- "Yes. Numbers only fall when people take some of the animals out of the reserve." (1.2 trap) · "Deer with food and space always increase in number." (1.2 prediction reason)
- "Only humans pass characteristics to their young." · "Only the mother passes on characteristics." (1.3 prediction reasons)
- "The ovaries make sperm and the testes make eggs." · "Many sperm are needed to fertilise one egg." · a fertilised egg grows "In the stomach." (1.4)
- "The petals are the parts that make pollen." · "Wind needs bright petals to carry pollen well." (1.5A)
- "Hooks help the seed float further on water." · "A pod flings its seed hard, so it goes furthest." (1.5B)
- "Yes. Light is the first thing a seed needs, before water or warmth." (1.5C trap) · "Cold keeps seeds fresh, so they germinate faster." (1.5C)
- "Seeds are scattered before they have even formed." · "A seed starts growing the moment pollen lands." (1.5D)
- "Plants do not make separate male and female cells." · "Humans go through pollination before fertilisation." (1.6)
- "Yes. Plants always help each other to grow when they stand close together." (1.7 trap)
- **Gap:** no bench has a question on "pollination is the same as fertilisation", although `BRIEF-P5.md` §4 names it as a trap. Use misconception M-30 (`misconceptions.js`) and the Quiz Yourself card "What is fertilisation in plants?".

### Cycles in Water (Ch 2)
- "Ice has no temperature until it turns into water." (2.1 reason) · "It loses heat to the warmer room." (2.1)
- "Yes. A stronger flame always makes the water boil at a higher temperature than 100 °C." (2.2 trap) · "The water stops needing heat once it starts bubbling." (2.2)
- "Yes. Water vapour is white, which is why we can see it rising from hot water." (2.3 trap) · "The droplets are water that leaks from inside the beaker." · "Warmth helps water vapour form droplets." (2.3)
- "Yes. Water must be heated until it boils before any of it can turn into water vapour." (2.4 trap) · "The fan only cools the towel, so it dries more slowly." · "It takes up less space, so it dries faster." (2.4, folded towel)
- "Higher up is closer to the sun, so it must be warmer." · "Clouds are made of smoke, not water from the sea." (2.5)
- "Condensation only happens when it is cold, so the cool spot wins." · "The cover makes new water out of the dirt that is left in the cup." (2.8)

### Plant Transport System (Ch 3)
- "Plants only droop in the dark." · "Leaves drink water from the air." · "Once a plant droops, it can never recover." (3.1)
- "Yes. The red water soaked evenly into every part of the stalk." (3.2 trap) · "Liquids inside a plant mix, like water in a cup." (3.2)
- "Yes. One tube carries both, in both directions." (3.3 trap) · "Only thick parts like the stem need tubes to carry water." · "Food follows the same route as water." (3.3)
- "Yes. One plant took in more water, so the leaves must be the cause." (3.4 trap, a two-variable test) · "Running a test again makes the numbers go up." (3.4)
- "Yes. Any cut, however thin, cuts through every tube and stops the whole tree taking in water." (3.5 trap) · "A bigger cut means bigger fruit." (3.5)

### Respiratory and Circulatory Systems (Ch 4)
- "Yes. We need oxygen to live, so the air we breathe must be all oxygen." (4.1 trap) · "A mix, but mostly carbon dioxide." (4.1)
- "Yes. The lungs pull air straight in from outside the body through the chest." (4.2A trap) · "Yes. The windpipe carries food to the stomach, not air to the lungs." (4.2A)
- "Yes. The body takes in all the oxygen from the air and gives back only carbon dioxide." (4.2B trap) · "Water alone, not a gas, makes limewater cloudy." (4.2B)
- "Yes. All animals have lungs." (4.3 trap) · "Gills work in both water and air." (4.3)
- "Yes. Breathing puts air straight into the blood, and the blood carries it." (4.4 trap) · "The body makes oxygen for the blood to carry to the lungs." (4.4)
- "Yes. Plants also have blood vessels, so the two are the same." (4.5)
- "Yes. Resting makes the heart work hardest to keep the body steady and calm." (4.6 trap) · "The heart has to make up for slow lungs." (4.6)
- "Yes. Oxygen and air are the same thing, so blood carries air." (4.7) · "Heart, body, lungs, heart." (4.7)

### Electrical Systems (Ch 5)
- "Yes. Electricity can easily jump across a small gap to the bulb all by itself." (5.1 trap) · "Both clips fastened, but both on the same bulb contact." (5.1)
- "Being joined to the battery is enough on its own." · "It makes new electricity and sends it round the whole loop." (5.2). The brief's mix-up that a bulb "uses up" electricity is a typed question in 5.2, not a multiple-choice one.
- "Yes. Hard things always let electricity flow across the gap." (5.3 trap) · "Every material lets electricity through, only more slowly." · "They use up all the electricity that reaches them, so the bulb stays dark." (5.3)
- "Yes. A symbol is only allowed if it looks just like the real part it stands for." (5.4 trap) · "Any symbol can stand for the bulb." (5.4)

### Series and Parallel Circuits (Ch 6)
- "Yes. Extra batteries only make the bulb last longer, not shine brighter." (6.1) · "The batteries share their electricity between them." (6.1)
- "Every bulb still gets its own full share." · "More bulbs in a loop make each one shine harder." (6.2)
- "The battery must now be shared between more paths." · "About one third as bright." (6.3; this is the brief's mix-up "more bulbs in parallel share the brightness")
- "Each room has its own path, however it is wired." (6.4)
- "Yes. Only a screen that is being watched uses any electricity at all." (6.5 trap) · "Switching a lamp on and off uses more electricity." (6.5)
- "Yes. The parts do not need to be joined together, because they are all inside the toy." (6.6 trap) · "The battery can be switched off, so no switch is needed." (6.6)

---

## 6. Quiz Yourself and Mix-up busters coverage

### 6a. Quiz Yourself (Recitation Cloud, `recite.html`)
- **Way in:** the cloud in the scenery, or the **"☁ Quiz Yourself"** pill where the cloud is hidden (`index.html` line 975).
- **Tabs:** "All levels", "Primary 3", "Primary 4", "Primary 5", "Primary 6", "⚡ Mix-up busters" (`recite.html` line 380).
- **What the Primary 5 tab shows:**
  - two recitation chapters from `science-kb.js` `RECITATION` (the teacher's own tables, with fixed answers that the marker checks for keywords):
    - **"Plant and Human Reproduction"**: "Chapter 1 · 24 answers" (`science-kb.js` line 156);
    - **"Water and the Three States"**: "Chapter 5 · 17 answers" (line 182). "Chapter 5" is the number in the teacher's table, not the book's Chapter 2, so never say "chapter five" in a video;
  - the Mix-up chapters tagged exactly P5 (`recite.html` lines 286–291): "Mix-ups: Reproduction in Plants" (7), "Mix-ups: The Water Cycle" (8), "Mix-ups: Circulatory and Respiratory Systems" (4), "Mix-ups: Electrical System" (7).
- "Mix-ups: Plant System" (5 cards) is tagged **P4** in `MIXUP_CHAPTERS` (`mixups.js` line 544), so it appears under Primary 4, not Primary 5.
- **No P5 recitation** exists for Plant Transport, Respiratory and Circulatory, Electrical, or Series and Parallel. `RECITATION_MORE` has no P5 rows.
- The 31 P5 rows of `TRIGGERS` (`science-kb.js` lines 296–328: Water Cycle, Plant Reproduction, Human Reproduction) are exported but used by no page: a search of the app's `.js` and `.html` files finds `TRIGGERS` only in `science-kb.js`. They are still the best source of exam wording (for example line 304: "Water gains heat from the Sun and evaporates into water vapour.").
- **Script checks on the P5 recitation answers:**
  - "What are the main reproductive parts of a flower?" → "Anther, stigma, ovary and filament." This list leaves out the ovule and the style, and it differs from the poster ("Stamen and anther", "Stigma and ovary", "Ovule").
  - "How are seeds dispersed by water?" → "Fruits float and are carried away by water currents." For the reason, use Mix-up buster #49 ("The fibrous husk TRAPS AIR").
  - Human reproduction uses "sperm cells", "egg cells", "testes", "ovaries", "fallopian tube (oviduct)" and "uterus"; lab 1.4 says "sperm", "eggs", "egg tube" and "womb". "Which organ produces sperms?" uses "organ" and "sperms".
  - "What is heredity?" → "the passing of traits", while lab 1.3 says "characteristics".
  - "Why does salt cause ice to melt faster?" and "Why is salt spread on icy roads?" ("Salt lowers the melting point") are not in the P5 outcomes, and they cut across "ice melts at 0 °C" (lab 2.1). Keep them out of videos.
  - "What are the properties of solids, liquids and gases?" is P4 Matter content.

### 6b. Mix-up busters (`mixups.js`: the opossum in the Mind Lab, and the "⚡ Mix-up busters" tab)
- **Reproduction in Plants (7):**
  - #45 pollination is the TRANSFER of pollen FROM the anther TO the stigma;
  - #46 fruit from the OVARY, seeds from the OVULES, "Write egg cell, not egg";
  - #47 seeds need water, air (oxygen) and warmth;
  - #48 young plants compete for sunlight, water, space and mineral salts;
  - #49 the coconut's fibrous husk traps air;
  - #50 seed leaves feed the SEEDLING;
  - #51 "explosive ACTION", and it is the seed that is dispersed.
- **The Water Cycle (8):**
  - #8 name the right source of the water vapour;
  - #9 ice GAINS heat and melts;
  - #10 vapour loses heat TO THE COOLER SURFACE;
  - #11 boiling vs evaporation (not "steam");
  - #12 a warmer surface means fewer droplets;
  - #13 the three parts of a freezing definition;
  - #14 the condensation chain;
  - #15 "FASTER", "exposed SURFACE AREA".
- **Circulatory and Respiratory Systems (4)** (the name in `MIXUP_CHAPTERS`; the poster says "Circulatory System"):
  - #55 the mouth is digestive; air enters through the nose and windpipe;
  - #56 IN oxygen, OUT carbon dioxide;
  - #58 the BLOOD transports oxygen and digested food TO ALL PARTS;
  - #59 "Windpipe", "Circulatory system".
- **Electrical System (7):**
  - #16 the electromagnet's coil;
  - #17 a dim torch has "less chemical potential energy left to be converted into electrical energy" (line 130);
  - #18 "write ELECTRICAL ENERGY, never electricity" (line 136);
  - #20 a stronger electromagnet;
  - #21 the property is "insulator of electricity";
  - #22 say the circuit is closed AND what that does;
  - #23 "In parallel WITH THE FIRST BULB".
  - **Only #21, #22 and #23 are P5 circuit content.** #16 and #20 are P3 electromagnets, and #17 and #18 are P6 energy words. The labs' rule is "**Never** particles, molecules, atoms, energy (the P6 word)…" (`BRIEF-P5.md` line 33). Do not use #16–#18 or #20 in P5 videos; see §7.
- **Plant System (5, tagged P4):**
  - #38 roots absorb water and dissolved mineral salts;
  - #39 the stem TRANSPORTS, through water-carrying and food-carrying tubes (good P5 wording);
  - #40 stomata ALLOW gases in and out;
  - #42 water leaves as water vapour through the stomata;
  - #44 compare roots by surface area.
- **Any experiment ("_exp", 6):** #75 repeat AND find the average; #76 an exact, measurable kept-the-same variable; #77 why readings are taken often at the start; #78 accuracy vs reliability; #79 the control set-up; #80 a conclusion with direction. These suit the variables-box and average beats.

### 6c. The marker's misconception list (`misconceptions.js`, not shown to pupils as a list)
P5-area entries the marker can name in feedback: M-07 to M-12 (Water), M-20 to M-23 (Plant systems), M-26 and M-27 (Human systems), M-30 to M-32 (Reproduction), M-37 (Electrical system). M-23 ("Plants breathe out oxygen instead of respiring") answers in P6 terms (photosynthesis, "Respiration releases energy from food"). Do not quote its fix in a P5 video.

---

## 7. Sign-off gates before each video goes public

1. **Every P5 lab is in review.**
   - 0 of 40 are ready. Sign off the lab each video names (§2) before release day, or sign them off in episode order. The series plan's order, with repeats removed, is 1.2, 1.3, 1.4, 1.5A, 1.5D, 1.5B, 1.5C, 2.1, 2.2, 2.3, 2.4, 2.5, 2.8, 3.2, 3.3, 4.2B, 4.3, 4.4, 4.7, 5.2, 5.3, 6.2, 6.4, 6.5.
   - When a lab is signed off, its record leaves `labs-review.js` for `labs-p4.js` with `status: 'ready'` (header comment, `labs-review.js` lines 1–4). Re-read the record then, because written questions and marking points may change.
2. **Cells (1.1): decide before episode 1.** Four places in the app disagree:
   - `syllabus-p3p5.js` line 17 lists "Recognise that a cell is a basic unit of life" as a P5 outcome;
   - `labs/briefs-p5/1.1.md` line 3 and `BRIEF-P5.md` §5 say the teacher ruled cells outside this level;
   - `mixups.js` lines 11–12 say the CELLS cards were removed "because the syllabus does not teach that topic";
   - the reproduction labs (1.4, 1.5A, 1.5D, 1.6) still say "reproductive cells", "male cell" and "female cell".

   The teacher must confirm (a) whether a cells episode ships at all, with `lab: null`, and (b) whether "male/female reproductive cell" is fine in Chapter 1 videos.
3. **The P5 folder is folded.** Pupils must tap "Primary 5" first (§0, point 4). Decide whether the spoken line names the folder.
4. **Poster wording that a video's mind map must match, but that conflicts with the labs or the book:**
   - **Electrical System:** "Current flows", "No current flows", "Metals let current through" (`mindmap.html` lines 771–773). The labs and the series plan never say "current". Either the teacher allows "current" in the mind-map beat, or the poster is changed first.
   - **Reproduction in Plants:** "Pollen joins the ovule" (line 708) and "Pollen lands on the stigma" (line 707) are looser than the exam wording, and the second is close to Mix-up buster #45's mix-up.
5. **Wording in the labs that could contradict a video or the exam wording** (details in each lab's "Script check" lines, §3b):
   - 1.4 says "egg", "womb", "egg tube" and "sperm duct"; Mix-up buster #46 says "Write egg cell, not egg".
   - 1.5A defines pollination as "pollen moving", not "the transfer of pollen grains".
   - 1.5D and 1.6 say "male cell joins female cell", not "fuses with the egg cell in the ovule".
   - 2.2's marking points accept "water vapour (steam)" (`labs-review.js` lines 4237 and 4264), and its safety line says "steam". But Mix-up buster #11 rejects "boiling makes steam", and 4.2B's do-not-accept list has "steam that you can see" (line 7049). Agree one rule.
   - 2.7's model answer says "Plants need light to make food" (P6 photosynthesis).
   - 2.8 calls the caught water "clean".
   - 3.2 Part (c) teaches "Warmer water climbs faster" (not a syllabus point).
   - 3.3 Part (b) sorts tubes by position (beyond the syllabus).
   - 4.4 Part (c) colours oxygen-poor blood **blue**.
   - 4.1's gas tests (glowing splint "keeps glowing", limewater "turns cloudy slowly" with air) are unverified against the book.
6. **Variables box on observation parts.** In 33 parts the bench shows the variables box, but the lab's own notes in `labs/briefs-p5/` call the part "no variables, an observation". Do not film any of these as a fair test; use the parts marked "variables" (for example 1.2 Part (a), 1.5C Parts (a)–(c), 2.4 Parts (a)–(c), 3.4 Part (a), 6.1 Part (a)). The 33 parts:
   - 1.2 (b), 1.3 (a), 1.4 (b)
   - 2.1 (a), 2.2 (a), 2.3 (a), 2.5 (a) and (b), 2.8 (a)
   - 3.1 (b) and (c), 3.2 (a) and (b), 3.3 (a) and (c), 3.4 (b), 3.5 (c)
   - 4.1 (a), (b) and (c), 4.2B (b) and (c), 4.5 (b), 4.6 (b) and (c), 4.7 (b)
   - 5.1 (b), 5.2 (b), 5.3 (b)
   - 6.1 (b), 6.2 (b), 6.3 (b), 6.6 (a)

   `labs_p5.json` marks each part: `variablesShown` and `briefSays`.
7. **Excluded words: checked, none found.** The search covered the lab-specific text of all 40 benches (each page's `LAB` object and its `*-scene.js`) and the 40 records. It found no xylem, phloem, energy, molecule(s), particle(s), atom(s), voltage, "current", nickel, cobalt, self-/cross-pollination, pollen tube, umbilical cord, foetus, embryo or organ(s). "Cell(s)" appears only in the reproduction labs (point 2) and as code names in the circuit scene scripts, which are never shown. "Steam" appears only in 2.2 (point 5). The out-of-level words do appear in **other parts of the app** that a P5 video might quote:
   - Mix-up busters #16–#18 and #20 (energy, electromagnets);
   - the Electrical poster's "current";
   - Quiz Yourself's "organ" and "salt lowers the melting point".
8. **The Challenge is 3 + 3, not 5.** A video that says "answer the five questions" is wrong. The 3 typed questions are marked only inside the app, and need sign-in and the marker.
9. **Do not link review labs directly.** `lab.html#a/<id>` opens a review lab for any member (§1). Keep such links out of descriptions until sign-off.
10. **Textbook gate.** The P5 textbook scans have no readable text, and the activity-book text covers only Chapters 1–2. Every Chapter 3–6 definition in a script is "textbook unverified" until the teacher checks it. This includes the circuit symbols in 5.4 and the gas tests in 4.1.
