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

### Chapter 1: Diversity of Living and Non-living Things (Diversity)

#### 1.1 Spot and sort  ·  **LIVE for pupils**
- Folder: `labs/spotsort/` · list line: "Observation · about 25 minutes · runs in 3D" · bench: **Spot and Sort Lab** ("Living or non-living?"), intro button "Into the yard →"
- Spoken: "Open the School Lab, experiment one point one, and press, Let's test it now!"  ·  card line: `School Lab › 1.1  Spot and sort`
- Big idea (app): Living things need air, water and food, can grow, and can make new living things. Non-living things do none of these. A thing is sorted by what it can do, not by how it looks or whether it happens to be moving.
- **Part (a): Spot the clues** (bench pill "🔍 Spot the Clues"). Predict: "Which of these seven things can grow?" (The ant, the tree, the cat and the seed). Does: On the bench, tap each thing. The bench moves in close and a card tells you the clue it shows and why it is living or non-living. Spot all seven. Takeaway: A living thing does not have to move to be alive.
- **Part (b): Sort them out** (bench pill "📦 Sort Them Out"). Predict: "Where does the seed belong?" (Living). Does: On the bench, tap a thing, then tap its corner. A wrong corner bounces it back with a clue. Put all seven in their corners. Takeaway: Sort things by what they can do, not just by how they look.
- Safety line: In a real yard, look at small animals without picking them up, and wash your hands after touching soil, seeds or puddles.
- Script check: The lab's big idea lists the needs, growing and making new living things, but leaves out "respond to changes". When a video states what living things can do, use the book's full set (need water, food and air; grow, respond to changes and reproduce). Lab 1.3 has all six clues.

#### 1.2 The needs test  ·  In review (admin/adult mode only)
- Folder: `labs/p3-1-2/` · list line: "Experiment · about 25 minutes · runs in 3D" · bench: **The Needs Test Lab** ("What living things need"), intro button "To the table →"
- Spoken: "Open the School Lab, experiment one point two, and press, Let's test it now!"  ·  card line: `School Lab › 1.2  The needs test`
- Big idea (app): Living things need water, food and air to stay alive and grow. Non-living things do not need any of these. Floating, moving in the wind or getting wet is not the same as needing something to live.
- **Part (a): Test the bean plant** (bench pill "🌱 Test the Bean Plant"). Predict: "Does the bean plant need water, food and air?" (Yes, all three). Does: Tap a tray, then tap the bean plant. Try water, food and air. Takeaway: Living things like this bean plant need water, food and air. A plant makes its own food.
- **Part (b): Test the toy boat** (bench pill "⛵ Test the Toy Boat"). Predict: "Does the toy boat need water, food and air?" (No, none of them). Does: Tap a tray, then tap the toy boat. Try water, food and air. Takeaway: Non-living things like this toy boat do not need water, food or air.
- Script check: The bench offers the bean plant a "food" tray. Keep the lab's own line "A plant makes its own food" in any narration, so pupils do not think plants are fed.

#### 1.3 Six clues  ·  In review (admin/adult mode only)
- Folder: `labs/p3-1-3/` · list line: "Observation · about 25 minutes · runs in 3D" · bench: **Six Clues Lab** ("Is it living? Check all six clues"), intro button "To the table →"
- Spoken: "Open the School Lab, experiment one point three, and press, Let's test it now!"  ·  card line: `School Lab › 1.3  Six clues`
- Big idea (app): Living things need water, food and air. They can grow, respond to changes and make new living things like themselves. Something is living only if it shows all these clues, not just one of them.
- **Part (a): Check the six clues** (bench pill "🔍 Check the Six Clues"). Predict: "Will the hen and the lamp show the same six clues?" (No. Only the hen shows all six). Does: Tap a clue card, then tap the hen or the lamp. Try all six clues on both. Takeaway: A living thing shows all six clues. A non-living thing shows none.
- **Part (b): Judge living or non-living** (bench pill "⚖️ Judge Living or Non-living"). Predict: "Do a goldfish and a kite both need food?" (No. Only the goldfish needs food). Does: Watch them, then tap the goldfish or the kite and tap its plaque. Use all six clues. Takeaway: Something is living only if it shows all six clues, not just one.
- Script check: The six clues are water, food, air, grow, respond and young ones. In exam wording, say "reproduce" as the book does.


### Chapter 2: Classification of Living Things (Diversity)

#### 2.1A Bloom or not  ·  In review (admin/adult mode only)
- Folder: `labs/p3-2-1a/` · list line: "Observation · about 25 minutes · runs in 3D" · bench: **Bloom or Not Lab** ("Flowering and non-flowering plants"), intro button "To the plants →"
- Spoken: "Open the School Lab, experiment two point one A, and press, Let's test it now!"  ·  card line: `School Lab › 2.1A  Bloom or not`
- Big idea (app): Plants split into two groups by one thing: does it flower? Flowering plants make seeds inside a flower. Non-flowering plants make spores instead. Leaves, roots and stems do not decide the group.
- **Part (a): Look close** (bench pill "🔍 Look Close"). Predict: "Do all plants grow a flower?" (No, some do not). Does: Tap each plant. See its parts. Look for a flower, or for spore bags. Takeaway: Some plants grow a flower. Some plants never do. Ferns and moss make spores instead.
- **Part (b): Sort plants** (bench pill "🌼 Sort Plants"). Predict: "Which plants can go in the flowering basket?" (Any plant that can make a flower). Does: Tap a plant, then tap its basket. Flowering or non-flowering? Takeaway: Ferns and moss make spores instead of flowers. Leaves, roots and stems do not decide the group.
- Script check: The lab's big idea says flowering plants "make seeds inside a flower". The book says the flowers develop into fruits and the seeds are inside the fruits: use the book's wording. Non-flowering plants reproduce from spores, found in spore bags.

#### 2.1B Coat and cover  ·  In review (admin/adult mode only)
- Folder: `labs/p3-2-1b/` · list line: "Observation · about 30 minutes · runs in 3D" · bench: **Coat and Cover Lab** ("Sorting animals by their covering"), intro button "To the animals →"
- Spoken: "Open the School Lab, experiment two point one B, and press, Let's test it now!"  ·  card line: `School Lab › 2.1B  Coat and cover`
- Big idea (app): Six groups: mammal, bird, fish, reptile, amphibian, insect. The cover on the outside helps you find the group. Most animals hatch from an egg. Most mammals do not. An insect has six legs and a hard case.
- **Part (a): Feel the cover** (bench pill "🖐️ Feel the Cover"). Predict: "Which covering feels smooth and hard?" (Scales). Does: Tap each animal. Feel its cover. It makes its sound! Takeaway: An animal's cover helps sort it into its group: fur, feathers, scales, moist skin or a hard case.
- **Part (b): Sort animals** (bench pill "🐾 Sort Animals"). Predict: "Which cover means an animal is a mammal?" (Fur). Does: Tap an animal, then tap its pen. Use its cover. Takeaway: Six groups: fur, feathers, wet scales, dry scales, moist skin, and a hard case with six legs.
- **Part (c): Egg or young** (bench pill "🥚 Egg or Young"). Predict: "Do all six groups hatch from an egg?" (No, one group does not). Does: Tap an animal, then tap how it is born: from an egg, or as live young. Takeaway: Most animal groups hatch from an egg. Mammals mostly do not: they are born as live young.
- Script check: The bench sorts by covering ("wet scales", "dry scales", "hard case"). For the exam, use the book's features: fish have scales, fins and gills; reptiles have dry, scaly skin; insects have six legs, one pair of feelers and three body parts (head, thorax, abdomen). The book says MOST mammals give birth to live young.

#### 2.2 Tiny life  ·  In review (admin/adult mode only)
- Folder: `labs/p3-2-2/` · list line: "Observation · about 30 minutes · runs in 3D" · bench: **Tiny Life Lab** ("Bacteria and fungi"), intro button "To the microscope →"
- Spoken: "Open the School Lab, experiment two point two, and press, Let's test it now!"  ·  card line: `School Lab › 2.2  Tiny life`
- Big idea (app): Bacteria are tiny living things, seen only with a microscope. Fungi cannot make their own food. Yeast, mushrooms and mould are fungi. Some bacteria and fungi help us. Some can make us unwell.
- **Part (a): Peek at bacteria** (bench pill "🔬 Peek at Bacteria"). Predict: "Can you see bacteria without a microscope?" (No, they are too tiny). Does: Tap a slide to look at it under the microscope. Bacteria are too tiny to see without it. Takeaway: Bacteria are tiny living things. You need a microscope to see them.
- **Part (b): Spot the fungi** (bench pill "🍄 Spot the Fungi"). Predict: "Do fungi make their own food, like a plant?" (No). Does: Tap each cover on the tray. A fungus is underneath. Takeaway: Fungi cannot make their own food. They soak up food from around them.
- **Part (c): Helpful or harmful** (bench pill "⚖️ Helpful or Harmful"). Predict: "Are all bacteria bad for us?" (No, some help us). Does: Tap a card, then tap the tray it belongs in. Takeaway: Some bacteria and fungi help us. Some can make us unwell.
- Safety line: Never touch or sniff real mould. Wash your hands after handling old food.
- Script check: Book: there are four groups of living things (plants, animals, fungi, bacteria). Fungi do not make their own food and reproduce by spores. Bacteria can be rod-shaped, round or spiral-shaped. Give one useful and one harmful example of each.

#### 2.3 The mystery creature  ·  In review (admin/adult mode only)
- Folder: `labs/p3-2-3/` · list line: "Observation · about 25 minutes · runs in 3D" · bench: **The Mystery Creature Lab** ("Use the clues to find the group"), intro button "To the pond →"
- Spoken: "Open the School Lab, experiment two point three, and press, Let's test it now!"  ·  card line: `School Lab › 2.3  The mystery creature`
- Big idea (app): Creature Q has scales and lays its eggs on land. That makes it a reptile, even though it swims most of the day. Living in water does not always mean an animal is a fish. Good conclusions come from checking all the evidence.
- **Part (a): Gather clues** (bench pill "🔎 Gather Clues"). Predict: "What group do you think Creature Q belongs to?" (Reptile). Does: Tap each sealed tile. Read every clue before you decide. Takeaway: Good science reads all the evidence before deciding.
- **Part (b): Decide the group** (bench pill "🧩 Decide the Group"). Predict: "Does living in water always mean an animal is a fish?" (No, other groups live in water too). Does: Tap Creature Q, then tap its pen. Use all three clues. Takeaway: Scales and eggs laid on land point to reptile, even in a creature that swims a lot.
- Script check: Reptiles have dry, scaly skin and most lay eggs on land. Amphibians have moist skin and lay eggs in water. Living in water does not make an animal a fish.


### Chapter 3: Diversity of Materials (Diversity)

#### 3.1 What is it made of?  ·  In review (admin/adult mode only)
- Folder: `labs/p3-3-1/` · list line: "Observation · about 25 minutes · runs in 3D" · bench: **Made-Of Lab** ("Objects and materials"), intro button "To the table →"
- Spoken: "Open the School Lab, experiment three point one, and press, Let's test it now!"  ·  card line: `School Lab › 3.1  What is it made of?`
- Big idea (app): An object can be made of one material or many. The same kind of object can be made of different materials. One material can make many kinds of objects.
- **Part (a): Count the parts** (bench pill "🔢 Count the Parts"). Predict: "How many materials is this backpack made of?" (Three or more). Does: Tap each part of the backpack. A label names its material. Takeaway: An object can be made of one material, or of many. This backpack uses three.
- **Part (b): Same kind, different stuff** (bench pill "🗂️ Same Kind, Different Stuff"). Predict: "Are two mugs always made of the same material?" (No, they can be different). Does: Tap a thing, then tap the bin with its material. Takeaway: The mug and the cup both hold drinks, but one is ceramic and one is plastic.
- Script check: The book names seven materials: wood, metal, ceramic, rubber, glass, plastic and fabric.

#### 3.2 The snap test  ·  In review (admin/adult mode only)
- Folder: `labs/p3-3-2/` · list line: "Experiment · about 25 minutes · runs in 3D" · bench: **Snap Test Lab** ("Which material is stronger?"), intro button "To the bench →"
- Spoken: "Open the School Lab, experiment three point two, and press, Let's test it now!"  ·  card line: `School Lab › 3.2  The snap test`
- Big idea (app): A strong material holds a heavy load without breaking. Some materials are stronger than others. We test strength by adding weights until the material breaks, then comparing the counts.
- **Part (a): Hold the load** (bench pill "🏋️ Hold the Load"). Predict: "Which holds more weights before it snaps: paper or plastic?" (Plastic). Does: Clip on the paper strip. Add weights one at a time until it snaps. Takeaway: A material that holds a heavy load without breaking is strong. Paper snapped after 2 weights.
- **Part (b): Swap the strip** (bench pill "🔁 Swap the Strip"). Predict: "How many weights will the plastic strip hold before it snaps?" (More than paper). Does: Clip on the plastic strip. Add weights one at a time until it snaps. Takeaway: The plastic strip held 6 weights. The paper strip held 2. Plastic is the stronger material.
- Script check: The lab defines "strong" as "holds a heavy load without breaking". The book defines strength as a material's ability to be pulled or pushed without breaking or tearing. Use the book's wording (definitions.md) whenever a line says what strength IS.

#### 3.3 The bend test  ·  In review (admin/adult mode only)
- Folder: `labs/p3-3-3/` · list line: "Experiment · about 25 minutes · runs in 3D" · bench: **Bend Test Lab** ("Which material is more flexible?"), intro button "To the bench →"
- Spoken: "Open the School Lab, experiment three point three, and press, Let's test it now!"  ·  card line: `School Lab › 3.3  The bend test`
- Big idea (app): A flexible material bends without breaking. Some materials bend more than others under the same weight. We test flexibility by measuring how far a strip bends.
- **Part (a): Bend the wood** (bench pill "🌀 Bend the Wood"). Predict: "Which bends more without breaking: wood or plastic?" (Plastic). Does: Clamp the wooden strip. Hang the weight and read the bend. Takeaway: A material that bends without breaking is flexible. The wood bent 2 cm.
- **Part (b): Bend the plastic** (bench pill "🔀 Bend the Plastic"). Predict: "Will the plastic strip bend more or less than the wood?" (More than wood). Does: Clamp the plastic strip. Hang the same weight and read the bend. Takeaway: Under the same weight, plastic bent 6 cm and wood bent 2 cm. Plastic is more flexible.
- Script check: Book: flexibility is a material's ability to bend without breaking. The book's opposite word is "rigid".

#### 3.5 The drip test  ·  In review (admin/adult mode only)
- Folder: `labs/p3-3-5/` · list line: "Experiment · about 25 minutes · runs in 3D" · bench: **Drip Test Lab** ("Does it let water through?"), intro button "To the table →"
- Spoken: "Open the School Lab, experiment three point five, and press, Let's test it now!"  ·  card line: `School Lab › 3.5  The drip test`
- Big idea (app): Some materials do not let water through. The drops sit on top. Some materials soak water up instead. We test this by dripping water and watching what happens on top of and inside the sheet.
- **Part (a): Drip on sheet one** (bench pill "💧 Drip on Sheet One"). Predict: "Which sheet keeps water out: plastic or paper?" (Plastic). Does: Place the plastic sheet. Add drops and watch what the water does. Takeaway: The drops sat on top as beads. Plastic does not let water through.
- **Part (b): Drip on sheet two** (bench pill "🌂 Drip on Sheet Two"). Predict: "Will the paper sheet keep water out too?" (No, the water soaks in). Does: Place the paper sheet. Add drops and watch what the water does. Takeaway: The drops soaked in and spread. Paper soaks up water instead of keeping it out.
- Script check: The bench avoids the word "waterproof" (the P3 lab brief says to use "does not let water through"), but the book teaches "waterproof": a material that does not absorb water or let water pass through. Use the book term in the exam corner.

#### 3.6 The light box  ·  In review (admin/adult mode only)
- Folder: `labs/p3-3-6/` · list line: "Experiment · about 30 minutes · runs in 3D" · bench: **Torch Test Lab** ("Does it let light through?"), intro button "To the bench →"
- Spoken: "Open the School Lab, experiment three point six, and press, Let's test it now!"  ·  card line: `School Lab › 3.6  The light box`
- Big idea (app): Some materials let most light through. They are see-through. Some let only some light through. Things look blurry. Metal lets no light through at all. It makes a dark shadow.
- **Part (a): Shine on sheet one** (bench pill "🔦 Shine on Sheet One"). Predict: "Does this clear sheet let most, some, or no light through?" (Most light). Does: Hold up the clear sheet. Switch on the torch and count the lit dots. Takeaway: A material that lets most light through is see-through. All five dots lit up.
- **Part (b): Shine on sheet two** (bench pill "🌥️ Shine on Sheet Two"). Predict: "Will the frosted sheet light up more or fewer dots than the clear one?" (Fewer dots). Does: Swap in the frosted sheet. Switch on the torch and count the lit dots. Takeaway: A material that lets some light through looks blurry, not clear. Two dots lit up.
- **Part (c): Shine on sheet three** (bench pill "⬛ Shine on Sheet Three"). Predict: "Will any dots light up through the metal sheet?" (None will light up). Does: Swap in the metal sheet. Switch on the torch and count the lit dots. Takeaway: A material that lets no light through blocks it completely. No dots lit up.
- Safety line: Never shine a torch into anyone's eyes.
- Script check: The bench says "lets most / some / no light through" and "see-through". The book adds transparent, translucent and opaque, but the app's syllabus file lists those three terms as not required at P3. Teach most / some / no light first, and name the terms only if the teacher wants them.

#### 3.7 Match the job  ·  In review (admin/adult mode only)
- Folder: `labs/p3-3-7/` · list line: "Observation · about 25 minutes · runs in 3D" · bench: **Match the Material Lab** ("Why that material?"), intro button "To the bench →"
- Spoken: "Open the School Lab, experiment three point seven, and press, Let's test it now!"  ·  card line: `School Lab › 3.7  Match the job`
- Big idea (app): A material is chosen for what it can do. Different objects need different things from a material. Each material has a reason it suits its object.
- **Part (a): Match object to material** (bench pill "🧩 Match Object to Material"). Predict: "Which material is best for making a raincoat?" (Plastic). Does: Tap an object, then tap the material bin it belongs in. Takeaway: A material is chosen because of what it can do. The raincoat is plastic because plastic keeps water out.
- **Part (b): Why this material?** (bench pill "💡 Why This Material?"). Predict: "Why is a raincoat made of plastic?" (It does not let water through). Does: Tap a material bin, then tap the reason it suits its object. Takeaway: Each material is chosen for a reason. Plastic keeps rain out. Glass lets light in. Fabric bends. Metal is strong.
- Script check: Exam pattern for "Why is X made of Y?": name the property, then link it to what the object does.

#### 3.8 Upgrade it  ·  In review (admin/adult mode only)
- Folder: `labs/p3-3-8/` · list line: "Make it · about 25 minutes · runs in 3D" · bench: **Upgrade Lab** ("Choose a better material"), intro button "To the table →"
- Spoken: "Open the School Lab, experiment three point eight, and press, Let's test it now!"  ·  card line: `School Lab › 3.8  Upgrade it`
- Big idea (app): We improve an object by choosing a material that suits its job better. We test an improvement by comparing counts before and after. Choosing a material means thinking about what it can do.
- **Part (a): Choose a better material** (bench pill "🔧 Choose a Better Material"). Predict: "Which material would make a stronger strap?" (Fabric). Does: Tap the torn strap, then tap the material that suits a strap. Takeaway: We choose a material for a part by thinking about what it can do. Fabric bends and is strong.
- **Part (b): Test the upgrade** (bench pill "🧪 Test the Upgrade"). Predict: "How many weights will the new strap hold, compared with the old one?" (More than before). Does: Check the old strap's count. Then clip on the new strap and add weights. Takeaway: An upgrade is only real if a test shows it holds up better. 6 weights beats 2.


### Chapter 4: Life Cycles of Plants (Cycles)

#### 4.1 Find my young  ·  In review (admin/adult mode only)
- Folder: `labs/p3-4-1/` · list line: "Observation · about 25 minutes · runs in 3D" · bench: **Young and Adult Lab** ("Living things grow"), intro button "To the shelf →"
- Spoken: "Open the School Lab, experiment four point one, and press, Let's test it now!"  ·  card line: `School Lab › 4.1  Find my young`
- Big idea (app): Every living thing starts small, as a young one. It grows into an adult of its own kind over time. The young and adult are alike, but the adult has grown more.
- **Part (a): Match young to adult** (bench pill "🧩 Match Young to Adult"). Predict: "Does every living thing have a young stage and an adult stage?" (Yes, every one). Does: Tap a young card, then tap the adult card it grows into. Takeaway: A young living thing grows into the adult of its own kind. A puppy becomes a dog, never a cat.
- **Part (b): Compare young and adult** (bench pill "🔍 Compare Young and Adult"). Predict: "Do the young and the adult look exactly the same?" (No, the adult has grown more). Does: Tap a pair, then tap the chip that is true for it. Takeaway: The young and the adult are alike, but the adult has grown more.

#### 4.2 Seed to plant  ·  In review (admin/adult mode only)
- Folder: `labs/p3-4-2/` · list line: "Experiment · about 25 minutes · runs in 3D" · bench: **Seed to Plant Lab** ("A plant grows up"), intro button "To the windowsill →"
- Spoken: "Open the School Lab, experiment four point two, and press, Let's test it now!"  ·  card line: `School Lab › 4.2  Seed to plant`
- Big idea (app): A plant's life cycle has three stages: seed, seedling and adult plant. The seed needs water, air and the right warmth to start growing. The seedling needs light to grow well. The adult plant makes new seeds of its own.
- **Part (a): Grow the seed** (bench pill "🌱 Grow the Seed"). Predict: "Will the seedling grow taller as the days pass?" (Yes, taller each day). Does: Tap the pots, then tap ▶ Later. Watch both pots and read the height. Takeaway: A seed grows into a seedling that grows taller each day. It needs water, air and light to grow well.
- **Part (b): Build the life cycle** (bench pill "🔄 Build the Life Cycle"). Predict: "Will the grown plant make new seeds?" (Yes, inside its fruit). Does: Tap a stage card, then tap the platform it belongs on: first, second or third. Takeaway: The adult plant grows flowers, then fruit with new seeds inside. The new seeds start the cycle again.
- Script check: The bench calls the middle stage "seedling" (about 36 times). The book's stage names are seed, young plant and adult plant, and the Mind Lab poster also says "Young plant". Say "young plant" in narration and on screen.
- Script check: The bench's "water, air and the right warmth" for a seed to start growing is P5 content (germination). Keep it light.


### Chapter 5: Life Cycles of Animals (Cycles)

#### 5.1 Three stages or four  ·  In review (admin/adult mode only)
- Folder: `labs/p3-5-1/` · list line: "Observation · about 25 minutes · runs in 3D" · bench: **Life Cycle Cases Lab** ("Three stages or four?"), intro button "To the cases →"
- Spoken: "Open the School Lab, experiment five point one, and press, Let's test it now!"  ·  card line: `School Lab › 5.1  Three stages or four`
- Big idea (app): Some animals have three stages: egg, young and adult. Others have four stages: egg, young, pupa and adult. A four-stage animal's young looks nothing like the adult at first.
- **Part (a): Three-stage animals** (bench pill "🦗 Three-Stage Animals"). Predict: "Does every three-stage animal look like its adult when young?" (No, some do and some do not). Does: Tap a stage model, then tap its platform. Build both life cycles in order. Takeaway: A young grasshopper looks like the adult. A tadpole looks nothing like a frog. Both animals have three stages.
- **Part (b): Four-stage animals** (bench pill "🦋 Four-Stage Animals"). Predict: "Does a four-stage animal's young ever look like the adult?" (No, it looks very different). Does: Tap a stage model, then tap its platform. Build both life cycles in order. Takeaway: A four-stage animal's young looks nothing like the adult at first. A caterpillar becomes a butterfly only after the pupa stage.
- Script check: The lab's big idea gives the four stages as "egg, young, pupa and adult". The book, and the bench's own Challenge, say egg, larva, pupa, adult. Use "larva".
- Script check: Name each young one correctly: nymph (grasshopper, cockroach), tadpole (frog), caterpillar (butterfly larva), wriggler (mosquito larva).

#### 5.2 Compare life cycles  ·  In review (admin/adult mode only)
- Folder: `labs/p3-5-2/` · list line: "Observation · about 25 minutes · runs in 3D" · bench: **Compare Cycles Lab** ("Alike and different"), intro button "To the cases →"
- Spoken: "Open the School Lab, experiment five point two, and press, Let's test it now!"  ·  card line: `School Lab › 5.2  Compare life cycles`
- Big idea (app): Different living things can have different life cycles. Some share the same stages but still look different when young. Others have a different number of stages altogether. Comparing means looking for what is alike and what is different.
- **Part (a): Same number of stages** (bench pill "⚖️ Same Number of Stages"). Predict: "Do animals with the same number of stages look alike when young?" (Not always). Does: Look at both cases. Tap a question card, then tap the chip that is true. Takeaway: The chicken and frog have three stages, but look different when young.
- **Part (b): Different number of stages** (bench pill "🔀 Different Number of Stages"). Predict: "Does starting as an egg mean animals share the same stages?" (No, the number of stages can differ). Does: Look at both cases. Tap a question card, then tap the chip that is true. Takeaway: Both start as an egg; only the mosquito has a pupa stage.
- Script check: A comparison answer must give the basis: the number of stages, or whether the young looks like the adult.


### Chapter 6: Properties of Magnets (Interactions)

#### 6.1A Magnet pairs  ·  In review (admin/adult mode only)
- Folder: `labs/p3-6-1a/` · list line: "Experiment · about 25 minutes · runs in 3D" · bench: **Attract or Repel Lab** ("Attract and repel"), intro button "To the table →"
- Spoken: "Open the School Lab, experiment six point one A, and press, Let's test it now!"  ·  card line: `School Lab › 6.1A  Magnet pairs`
- Big idea (app): Unlike poles, one red and one blue, attract. Like poles, both red or both blue, repel. This is true whatever shape the magnet is.
- **Part (a): Bar magnet pair** (bench pill "🧲 Bar Magnet Pair"). Predict: "If you turn one magnet, will they attract or repel?" (It depends which ends face each other). Does: Choose which ends face, then slide the magnets together. Try all three ways. Takeaway: Unlike poles, one red and one blue, attract. Like poles, both red or both blue, repel.
- **Part (b): U-shaped pair** (bench pill "🧲 U-shaped Pair"). Predict: "Will U-shaped magnets attract and repel the same way as bar magnets?" (Yes, the same way). Does: Choose which ends face, then slide the U-shaped magnets together. Try all three ways. Takeaway: The shape of a magnet does not change the rule. Unlike poles attract, like poles repel.
- Script check: The bench colours the poles red and blue and never names them. The book names a North pole and a South pole: say "North pole" and "South pole" in narration, and "unlike poles attract, like poles repel" (the book's words, not "opposite" and "same").

#### 6.1B Magnetic materials  ·  In review (admin/adult mode only)
- Folder: `labs/p3-6-1b/` · list line: "Experiment · about 30 minutes · runs in 3D" · bench: **Magnet Test Lab** ("What does a magnet attract?"), intro button "To the bench →"
- Spoken: "Open the School Lab, experiment six point one B, and press, Let's test it now!"  ·  card line: `School Lab › 6.1B  Magnetic materials`
- Big idea (app): Magnets attract magnetic materials such as iron and steel. Magnets do not attract non-magnetic materials, like copper and plastic. Being made of metal does not always mean an object is magnetic.
- **Part (a): Test the metal objects** (bench pill "🔩 Test the Metal Objects"). Predict: "Which will a magnet attract: the nail, the clip, or the coin?" (Only the nail and the clip). Does: Place an object, then bring the magnet near. Test all three. Takeaway: Not everything made of metal is magnetic. Iron and steel are. Copper is not.
- **Part (b): Test the everyday objects** (bench pill "📏 Test the Everyday Objects"). Predict: "Will the magnet attract the wood, the ruler, or the foil?" (No, none of them). Does: Place an object, then bring the magnet near. Test all three. Takeaway: A magnet attracts only certain materials, like iron and steel. Shiny foil is not one of them.
- **Part (c): Sort them all** (bench pill "📦 Sort Them All"). Predict: "How many of the six are magnetic?" (Two). Does: Tap an object, then tap the box it belongs in: Magnetic or Non-magnetic. Takeaway: Magnetic materials like iron and steel are attracted. Copper, wood, plastic and foil are not.
- Script check: Book: magnetic materials include iron and steel. Aluminium and copper are metals that are not magnetic. Do not name nickel or cobalt: the syllabus says they are not required, even though Mix-up buster card 24 lists them.

#### 6.2 Magnet poles  ·  In review (admin/adult mode only)
- Folder: `labs/p3-6-2/` · list line: "Experiment · about 25 minutes · runs in 3D" · bench: **Strongest Spot Lab** ("Where is a magnet strongest?"), intro button "To the table →"
- Spoken: "Open the School Lab, experiment six point two, and press, Let's test it now!"  ·  card line: `School Lab › 6.2  Magnet poles`
- Big idea (app): A magnet attracts most strongly at its two poles. We measure this by counting the paper clips it holds. This is true for different shapes of magnet.
- **Part (a): Test the bar magnet** (bench pill "🧲 Test the Bar Magnet"). Predict: "Which part will pick up the most clips?" (The two ends). Does: Tap a spot on the magnet, then lower and lift. Count the clips. Test all three spots. Takeaway: A magnet attracts most strongly at its two ends, its poles. The middle holds almost nothing.
- **Part (b): Test another shape** (bench pill "🧲 Test Another Shape"). Predict: "Will a U-shaped magnet also hold most clips at its ends?" (Yes, the same as the bar magnet). Does: Tap a spot on the U-shaped magnet, then lower and lift. Test all three spots. Takeaway: Every magnet attracts most strongly at its poles, whatever its shape.
- Script check: The bench colours the poles red and blue and never names them. The book names a North pole and a South pole: say "North pole" and "South pole" in narration, and "unlike poles attract, like poles repel" (the book's words, not "opposite" and "same").
- Script check: Every magnet has two poles, whatever its shape. Attraction is strongest at the poles.

#### 6.3A The magnet cart  ·  In review (admin/adult mode only)
- Folder: `labs/p3-6-3a/` · list line: "Experiment · about 25 minutes · runs in 3D" · bench: **Magnet Carts Lab** ("Magnets on wheels"), intro button "To the track →"
- Spoken: "Open the School Lab, experiment six point three A, and press, Let's test it now!"  ·  card line: `School Lab › 6.3A  The magnet cart`
- Big idea (app): Unlike poles attract; the carts roll together. Like poles repel; the carts stay apart. Magnets attract or repel without touching.
- **Part (a): Unlike poles facing** (bench pill "🚃 Unlike Poles Facing"). Predict: "If red faces blue, will the carts roll together or stay apart?" (Roll together). Does: Choose which ends face, then roll the cart. Watch what happens. Takeaway: Unlike poles attract: the carts roll together.
- **Part (b): Like poles facing** (bench pill "🚃 Like Poles Facing"). Predict: "If both ends are red, will the carts roll together or stay apart?" (Stay apart). Does: Choose which ends face, then roll the cart. Watch the gap. Takeaway: Like poles repel: the carts stay apart and never touch.
- Script check: The bench colours the poles red and blue and never names them. The book names a North pole and a South pole: say "North pole" and "South pole" in narration, and "unlike poles attract, like poles repel" (the book's words, not "opposite" and "same").

#### 6.3B Ring magnets  ·  In review (admin/adult mode only)
- Folder: `labs/p3-6-3b/` · list line: "Experiment · about 25 minutes · runs in 3D" · bench: **Ring Magnets Lab** ("Floating rings"), intro button "To the stand →"
- Spoken: "Open the School Lab, experiment six point three B, and press, Let's test it now!"  ·  card line: `School Lab › 6.3B  Ring magnets`
- Big idea (app): Like poles repel and leave a gap. Unlike poles attract and sit flat. A gap tells us the hidden pole's colour: it is the same as the one below.
- **Part (a): Stack the rings** (bench pill "🔵 Stack the Rings"). Predict: "If blue meets red, will the rings sit flat or float apart?" (Sit flat together). Does: Choose which sides meet, then lower the top ring. Try all three ways. Takeaway: Unlike poles attract and the rings sit flat. Like poles repel and the top ring floats with a gap.
- **Part (b): Find the missing pole** (bench pill "🔴 Find the Missing Pole"). Predict: "A ring floats with a gap above a red side. Is its hidden side red or blue?" (Red). Does: Tap a puzzle card, look at the stand, then tap the colour of the hidden side. Takeaway: A gap means the same colour poles are facing each other. Flat means they are different.
- Script check: The bench colours the poles red and blue and never names them. The book names a North pole and a South pole: say "North pole" and "South pole" in narration, and "unlike poles attract, like poles repel" (the book's words, not "opposite" and "same").
- Script check: Ring magnets float because like poles repel.

#### 6.3C Magnet or not?  ·  In review (admin/adult mode only)
- Folder: `labs/p3-6-3c/` · list line: "Experiment · about 25 minutes · runs in 3D" · bench: **Magnet or Not Lab** ("Test with both poles"), intro button "To the bench →"
- Spoken: "Open the School Lab, experiment six point three C, and press, Let's test it now!"  ·  card line: `School Lab › 6.3C  Magnet or not?`
- Big idea (app): Attracted by one pole and repelled by the other: it is a magnet. Attracted by both poles: it is a magnetic material. Attracted by neither: it is non-magnetic.
- **Part (a): Test the objects** (bench pill "🔍 Test the Objects"). Predict: "Which result at the blue end would show that A is a magnet?" (It is pushed away). Does: Tap an object and a pole, then bring the magnet near. Do all six tests. Takeaway: A is attracted by one pole and repelled by the other: a magnet. B is attracted by both: a magnetic material. C by neither: non-magnetic.
- **Part (b): Sort the objects** (bench pill "📋 Sort the Objects"). Predict: "From the tests, what is object A?" (A magnet). Does: Tap an object, then tap its box: Magnet, Magnetic material, or Non-magnetic material. Takeaway: Testing both poles tells us if something is a magnet. Only a magnet can be repelled.
- Script check: Only repulsion proves that an object is a magnet. Magnets do not repel non-magnetic materials; they just do not attract them.

#### 6.4 A magnet at rest  ·  In review (admin/adult mode only)
- Folder: `labs/p3-6-4/` · list line: "Experiment · about 30 minutes · runs in 3D" · bench: **Magnet at Rest Lab** ("Which way does a free magnet point?"), intro button "To the bench →"
- Spoken: "Open the School Lab, experiment six point four, and press, Let's test it now!"  ·  card line: `School Lab › 6.4  A magnet at rest`
- Big idea (app): A magnet free to turn always settles the same way. This is true whether it hangs, floats, or sits in a compass. It always points north to south.
- **Part (a): Hang the magnet** (bench pill "🧵 Hang the Magnet"). Predict: "If this hanging magnet turns freely, which way will it point?" (The same way every time). Does: Tap the hanging magnet, let it go, then nudge it. Watch where the red end stops each time. Takeaway: A magnet free to turn always settles pointing the same way: north–south.
- **Part (b): Float the magnet** (bench pill "🌊 Float the Magnet"). Predict: "Will a floating magnet point the same way as the hanging one?" (Yes, the same way). Does: Float the magnet on the board, nudge it, and compare with the hanging magnet. Takeaway: A floating magnet settles pointing the same way as a hanging one: north–south.
- **Part (c): Compare with a compass** (bench pill "🧭 Compare with a Compass"). Predict: "Will the compass needle point the same way as the magnets?" (Yes). Does: Place the compass and watch its needle. Compare with both magnets. Takeaway: A compass needle is a small magnet free to turn. It settles north–south, like any free magnet.
- Script check: Book wording: a freely suspended magnet comes to rest in the North-South direction, because the Earth behaves like a magnet. The bench says "Red end north".


### Chapter 7: Making and Using Magnets (Interactions)

#### 7.1A Make a magnet by stroking  ·  In review (admin/adult mode only)
- Folder: `labs/p3-7-1a/` · list line: "Experiment · about 25 minutes · runs in 3D" · bench: **Make a Magnet Lab** ("Stroke a nail"), intro button "To the bench →"
- Spoken: "Open the School Lab, experiment seven point one A, and press, Let's test it now!"  ·  card line: `School Lab › 7.1A  Make a magnet by stroking`
- Big idea (app): A magnet can be made only from a magnetic material, like an iron nail. Stroke it with one pole, the same way each time, lifting away after every stroke. More strokes make a stronger magnet, up to a point.
- **Part (a): Make a magnet** (bench pill "🧲 Make a Magnet"). Predict: "Which of these can become a magnet when we stroke it?" (Iron nail). Does: Choose a thing from the tray, then stroke it with the magnet, the same way each time. Takeaway: A magnet can only be made from a magnetic material, like iron. Copper and wood cannot.
- **Part (b): Count the clips** (bench pill "📎 Count the Clips"). Predict: "If we stroke the nail more, will it pick up more clips?" (More clips). Does: Choose how many strokes the nail has had, then dip it in the clips. Try all four. Takeaway: The more strokes, the stronger the magnet, up to a point. 40 strokes was only a little better than 30.
- Script check: Book terms: "stroke method" (stroke with one pole, in the same direction, with the same pole each time); the object is then "magnetised". More strokes make a stronger magnet.

#### 7.1B Make a magnet with electricity  ·  In review (admin/adult mode only)
- Folder: `labs/p3-7-1b/` · list line: "Experiment · about 25 minutes · runs in 3D" · bench: **Electric Magnet Lab** ("A magnet made with electricity"), intro button "To the bench →"
- Spoken: "Open the School Lab, experiment seven point one B, and press, Let's test it now!"  ·  card line: `School Lab › 7.1B  Make a magnet with electricity`
- Big idea (app): A magnet can be made with electricity: a coil of wire round an iron nail. It works only while electricity flows, so it can be switched on and off. More turns of wire make it stronger.
- **Part (a): Wind the coil** (bench pill "🔌 Wind the Coil"). Predict: "Will the iron nail attract paper clips before we connect the battery?" (No, only after electricity flows). Does: Tap the loose wire end, then connect the battery. Disconnect and connect again. Watch the clips. Takeaway: A magnet made with electricity works only while electricity flows. Switch it off and the clips drop.
- **Part (b): Test the strength** (bench pill "🔋 Test the Strength"). Predict: "If we add more turns of wire, will it attract more clips?" (More clips). Does: Choose how many turns of wire, then connect the battery and count the clips. Try all three. Takeaway: More turns of wire make a stronger magnet made with electricity: 3, 6, then 9 clips.
- Safety line: Use only a small battery, and disconnect it after each test so the wire does not get hot.
- Script check: The bench says "a magnet made with electricity". The book's terms are "electrical method" and "electromagnet". The book also makes it stronger with more batteries, which the bench does not show.
- Script check: Keep the book's safety line: do not leave it connected for too long, and never connect it to the mains supply.

#### 7.2 Create a toy  ·  In review (admin/adult mode only)
- Folder: `labs/p3-7-2/` · list line: "Make it · about 25 minutes · runs in 3D" · bench: **Magnet Toy Lab** ("Build it, test it, improve it"), intro button "To the track →"
- Spoken: "Open the School Lab, experiment seven point two, and press, Let's test it now!"  ·  card line: `School Lab › 7.2  Create a toy`
- Big idea (app): We choose which poles face each other on purpose: unlike poles attract, like poles repel. We test a toy, then change one thing at a time. Comparing attempts shows whether a change really improved it.
- **Part (a): Choose and place the magnets** (bench pill "🧲 Choose and Place the Magnets"). Predict: "To bring the cart to the flag, should the wand attract or repel it?" (Attract). Does: Try all four ways the poles can face. Find the two that bring the cart to the flag, and the two that push it away. Takeaway: Unlike poles (red and blue) attract and bring the cart. Like poles (red and red, blue and blue) repel and push it away. We choose on purpose.
- **Part (b): Test and improve** (bench pill "🔍 Test and Improve"). Predict: "Will the cart reach the flag on the very first try?" (No, it will likely need a change). Does: Test with the wand far, then move it closer one step at a time. Read the distance each time. Takeaway: We test a toy, then change one thing at a time. Each attempt shows if the change helped.
- Script check: Change one thing at a time, then compare before and after (a fair test).


---

## 4. Mind maps

### 4a. The Mind Lab (`mindmap.html` on `main`)
- **Page title:** "Science Claw Mind Lab". **Subtitle:** "MOE Primary Science Syllabus 2023 · P3–P6 · 17 chapters". **Header link:** "← Back to my questions".
- **Chapter list** (section "Every chapter, mapped": "Grouped by the five syllabus themes. Tap one to draw it."): one row per theme. Each button shows the chapter name with a small level tag. The **P3 buttons** are:

| Theme row | Button text (exact) | Tag | Topic id | Book chapters it covers |
|---|---|---|---|---|
| Diversity | Living & Non-Living | P3 | `living` | Ch 1 Diversity of Living and Non-living Things + Ch 2 Classification of Living Things |
| Diversity | Diversity of Materials | P3 | `materials` | Ch 3 Diversity of Materials |
| Cycles | Life Cycles | P3 | `lifecycles` | Ch 4 Life Cycles of Plants + Ch 5 Life Cycles of Animals |
| Interactions | Magnets | P3 | `magnets` | Ch 6 Properties of Magnets + Ch 7 Making and Using Magnets |

- **What each P3 poster says** (the app's own text: the main idea, then each branch with its points):
  - **Living & Non-Living.** Main idea: "Living things need certain things, and can do certain things. Non-living things cannot." Branches:
    - Living things need: Water, Food, Air
    - Living things can: Grow, Respond to changes, Reproduce
    - Plants: Flowering plants, Non-flowering plants
    - Animals: "Mammals, birds, fish", "Reptiles, amphibians", Insects
    - Other groups: Fungi, Bacteria
  - **Diversity of Materials.** Main idea: "Every material has properties, and those properties decide what it is good for." Branches:
    - Strength: Holds heavy loads, Breaks easily
    - Flexibility: Bends without breaking, Stiff and keeps its shape
    - Float or sink: Floats on water, Sinks in water
    - Waterproof: Keeps water out, Soaks water up
    - Lets light through: Clear enough to see through, Blocks the light
  - **Life Cycles.** Main idea: "Plants and animals go through stages, in order, from the start of life to adult." Branches:
    - Flowering plant: Seed, Young plant, Adult plant
    - Butterfly & beetle: Egg, Larva, Pupa, Adult
    - Grasshopper & cockroach: Egg, Nymph, Adult
    - Frog: Egg, Tadpole (the young), Adult frog
    - Chicken: Egg, Chick, Adult hen
  - **Magnets.** Main idea: "A magnet pushes or pulls without touching, and only some materials feel it." Branches:
    - A magnet can: Push, Pull
    - Two poles: North pole, South pole
    - Poles together: Unlike poles attract, Like poles repel
    - Magnetic materials: Iron and steel, Not copper or plastic
    - Making a magnet: Stroke method, Electrical method
- **How the posters compare with the book** (for the mind-map segment of each script):
  - Life Cycles uses the book's stage names: "Young plant" (not "seedling") and "Larva" and "Nymph".
  - Magnets says "pushes or pulls". The book also explains attract as a pull and repel as a push, but a script's exam line should say "attract" and "repel".
  - The Materials poster has no middle level for light (no "lets some light through"), while lab 3.6 has three levels.
  - Living & Non-Living already lists "Respond to changes", which lab 1.1 leaves out.
- The **opossum** button on the page opens "Mix-up busters" for the chapter on screen (from `mixups.js`, see section 5).

### 4b. "My mind map" maker (branch `claude/my-mind-map`, PR #60, open)
- **Way in:** the Mind Lab header gets a button **"✏️ Make my own mind map"** (`#mm-make`). `mindmap.html#make` opens it straight away.
- **The sheet:**
  1. "My mind maps": a **Chapter** drop-down (`#mm-ch`), then **"＋ Start a new mind map"**.
  2. The maker: "Middle word", "＋ Add a branch", sub-branches, and a "Saved ✓" pill.
  3. Tools: "🖼 Compare with the poster" and "⬇ Save as picture".
  4. Limits: 10 branches, 8 sub-branches each, 60 characters per box, 40 for the name.
  5. Saved on the device only, in localStorage `sm-mymaps-v1`.
- **The chapter list is the Mind Lab's own list. Confirmed:**
  - `mymap.js` reads `window.MindLab.topics`. `mindmap.html` builds that from the same `TOPICS` array the rail uses (the PR only adds the `deep` and `wash` colours).
  - The picker groups the options under each theme (`<optgroup>`). Each option reads `title + " (" + level + ")"`.
  - The **P3 options** are "Living & Non-Living (P3)" and "Diversity of Materials (P3)" under Diversity, "Life Cycles (P3)" under Cycles, and "Magnets (P3)" under Interactions.
  - The `TOPICS` entries are identical on `main` and on the branch.
  - The picker starts on whichever poster is on the stage (Plant System when the page first opens), so the pupil must **pick** the P3 chapter.
  - A new map's middle word starts as the chapter title (for example "Living & Non-Living").
- **How to reach Mind maps:**
  - On `main` there is only the sun or moon, tagged "Mind maps", in the right margin of the Questions screen. It shows only on screens 760 px wide or more.
  - PR #60 adds a pill **"✏️ Mind maps"** to the Questions screen, shown wherever the sun is hidden (phones).
- **Spoken line, P4 pattern** (`prep_all.py` `MM`): "Save it in TheOneApp, the ultimate science app. Tap Mind maps, then, Make my own mind map, and pick Plant System." For P3, end it with "...and pick Living and Non-Living" (or Diversity of Materials, Life Cycles, Magnets). Speak "&" as "and".
- **How the P4 phone screenshots were made** (`W/mm/shoot.js`, `W/mm/eps.json`, `W/mm/boxes.json`). `W` is the scratchpad `/tmp/claude-0/-home-user/8764a423-…/scratchpad`.
  - **Browser:** Playwright Chromium, phone viewport 390 × 844 at device scale 2, so each PNG is 780 × 1688.
  - **Page:** the branch's `mindmap.html` from a local server at `http://localhost:8766/`. PR #60 is not on `main`, so that server must serve a checkout of `claude/my-mind-map`.
  - **Seeding the map:** before the page loads, a script writes one map straight into localStorage `sm-mymaps-v1`. The map is `{id:'ep<n>', ch, name:'My <chapter title> mind map', centre, b:[{t, c, k}]}`.
  - **Opening it:** the script calls `window.MyMindMap.open('ep<n>')`, waits about 0.9 s, scrolls the sheet to the top and takes the screenshot as `mm_ep<n>.png`.
  - **Boxes:** it records two device-pixel boxes, the "Saved ✓" pill (`saved`) and the map canvas (`map`), into `boxes.json` under the episode number. `mmphone.js` uses `saved` for the pulsing ring and `map` for the scroll.
  - **Episode content:** `eps.json` gives each episode's content as `{"ch": "<topic id>", "c": "<middle word>", "b": [["<branch text>", "<hex colour>", ["<sub>", "<sub>"]], …]}`. The hex colour is snapped to the nearest of the maker's 8 colours: red, orange, yellow, green, teal, blue, purple, pink.
  - **Wiring:** `prep_all.py` copies `MMW/mm/mm_ep<n>.png` and reads `MMW/mm/boxes.json[n]`, where `MMW` is set to `W`.
- **Changes needed for P3:**
  - Add the four P3 ids to the `titles` map in `shoot.js`:
    - `living: 'Living & Non-Living'`
    - `materials: 'Diversity of Materials'`
    - `lifecycles: 'Life Cycles'`
    - `magnets: 'Magnets'`
  - The longest map name, "My Diversity of Materials mind map", is 34 characters, under the 40 limit.
  - **Do not write P3 shots into `W/mm/`.** The P4 files there are named `mm_ep1.png`, … and keyed "1", "2", … in `boxes.json`, so P3 episode 1 would overwrite P4 episode 1. Give the P3 kit its own folder and its own `MMW`.

---

## 5. Other P3 content in the app worth linking or using

### 5a. Quiz Yourself (Recitation Cloud, `recite.html`)
- **Way in:** the cloud in the scenery, or the "☁ Quiz Yourself" pill where the cloud is hidden.
- **Tabs:** "All levels", "P3", "P4", "P5", "P6", "⚡ Mix-up busters" (which also tests the Mix-up buster cards: for P3, Life Cycles and Magnets).
- **Where the P3 cards come from:** `science-kb.js` `RECITATION`. These are the teacher's own AL1 recitation tables, fixed answers that the app's marker checks for keywords:
  - Ch 1 "Living and Non-Living Things": 14 cards, including the animal-group reasons.
  - Ch 2 "Materials": 15 cards.
  - Ch 3 "Life Cycles": 15 cards.
- There is no P3 Magnets recitation chapter.
- **Use it as the "Exam corner" source**, after these script checks against the book's wording:
  - "What is a life cycle?" (app: "the series of stages … from egg or birth to adult and reproduction"). The book's key idea is "a repeated pattern of change as a living thing grows over time and reproduces". Use the book's wording.
  - The Materials cards define "transparent" and "opaque". The book teaches transparent, translucent and opaque, but `syllabus-p3p5.js` lists them as not required at P3. Agree with the teacher which to use.
  - "How do water plants help fish survive? … produce oxygen" is P6 content. "Roots absorb water … flowers form fruit" is P4/P5 content. Leave both out of P3 videos.
  - The plant stages "seed → young plant → adult plant" match the book.

### 5b. Syllabus files
- **`syllabus-map.js`:** the app's chapter tags. Its P3 chapter names are exactly the lab chapter names:
  - Diversity: Diversity of Living and Non-living Things; Classification of Living Things; Diversity of Materials
  - Cycles: Life Cycles of Plants; Life Cycles of Animals
  - Interactions: Properties of Magnets; Making and Using Magnets
  - Use these spellings for the series' chapter tags.
- **`syllabus-p3p5.js`:** the P3 outcomes and the syllabus's own "not required" notes. These are the guard-rails for P3 scripts:
  - **Living things:** describe the characteristics of living things, and recognise broad groups by similarities and differences. *Not required:* recalling the names of specific living things and their characteristics.
  - **Materials:** relate each material's use to its physical properties, and compare properties. *Not required:* density, and the terms transparent, translucent and opaque.
  - **Life cycles:** understand that different living things have different life cycles.
  - **Magnets:** describe the properties of magnets, and recognise magnetic and non-magnetic materials. *Not required:* recalling nickel and cobalt as magnetic materials, magnetic shielding, and magnetic induction.

### 5c. `context-library.js` (story contexts the app uses for questions), P3 entry
"Living things need air, water and food to survive". Its everyday set-ups make good hooks:
- two sealed jars of mung beans, one with water and one without
- a fish tank with a broken air pump
- a plant left in a dark store room for a week
- insects in a container with holes in the lid, next to a sealed one
- a potted plant not watered over the school holidays

---

## 6. P3 mix-ups listed in the app (for "Exam tip" beats)

Positive-language note: the app calls these "mix-ups", "think again" and "say it right". Use "Lots of students mix this up", never "trap". Each line gives the mix-up, then the right idea (the app's words, shortened), then the source.

### Living and non-living things (Ch 1)
- "It moves, so it is living" (a bicycle, a wind-up toy chick, a kite, a puddle or a toy boat). Moving because something pushes it is not a clue. (Challenges in 1.1, 1.2 and 1.3)
- "It is still, so it is non-living" (a seed, a sleeping cat). A seed can grow; a sleeping cat still needs air, water and food. (1.1 Challenge)
- Judging by looks ("it is small / brown / soft / colourful / has fur, so…"). Sort by what a thing can do, not how it looks. (1.1 and 1.3 Challenges)
- "The toy boat floats on water, so it needs water." Floating or getting wet is not needing. (1.2 Challenge)
- "A plant is fed from a tray." A plant makes its own food. (1.2 note)
- One clue is enough. A living thing shows all the clues: needs water, food and air, grows, responds, makes young ones. (1.3)

### Classification of living things (Ch 2)
- "No flower open today, so it is non-flowering" (a hibiscus). The group is decided by whether it CAN flower. (2.1A Challenge)
- "Tall / green / has leaves, so it is flowering." Leaves, roots and stems do not decide the group. (2.1A)
- "Spores mean fungus." Ferns and mosses (plants) also make spores. (2.1A; book note in content_map)
- "A spider is an insect." An insect has six legs; a spider has eight. (2.1B Challenge)
- "It swims, so it is a fish" (a furry swimmer, a pond creature). Covering and young decide: fur and milk mean a mammal; dry scales and eggs on land mean a reptile; moist skin and eggs in water mean an amphibian. (2.1B and 2.3 Challenges)
- "It cannot fly, so it is not a bird." Feathers decide. (2.1B and 2.3)
- "All bacteria are harmful." Some help us (yoghurt). (2.2 Challenge)
- "A mushroom makes its own food like a plant." Fungi do not make their own food. (2.2)
- "Mould on bread is just a stain or dust." Mould is a living fungus. (2.2)
- "Decide the group from one clue." Read all the evidence first. (2.3)
- Related app entry M-46 (P4 tag): "A cactus is not a plant, it has no proper leaves." Classification rests on characteristics, not on looking typical.

### Materials (Ch 3)
- "A backpack is one object, so it is one material." One object can use many materials, and one material can make many objects. (3.1 Challenge)
- "An object and a material are the same thing" (spoon vs metal). (3.1)
- "Bending a lot means strong." Strong means holding a load without breaking; bending without breaking is flexible. (3.2 and 3.3 Challenges)
- "Any bend at all means flexible" (glass). (3.3)
- Unfair tests: strips of different sizes, all weights at once, a different weight for each strip, a brighter torch for one sheet. (3.2, 3.3, 3.5 and 3.6 Challenges)
- "Fabric for a raincoat because it is soft." Choose for the job: a raincoat must keep water out. (3.5 and 3.7)
- "A new material always makes it better." It must suit the job, and a test must show the improvement. (3.8 Challenge)
- **M-33** "Heavy objects always sink and light ones always float." Floating does not depend on weight alone. (`misconceptions.js`; no lab for float or sink)
- **M-34** "A material has only one useful property." Materials are chosen for a combination of properties. (`misconceptions.js`)

### Life cycles (Ch 4 and 5)
- "A young living thing turns into a different kind" (a puppy into a cat), "it stays the same size" or "it shrinks". (4.1 Challenge)
- "A seed grows into a bigger seed." (4.1)
- "A seedling needs only sunshine" or "seeds cannot grow in pots". A seed needs water, air and warmth to start; a young plant needs light to grow well. (4.2)
- "New seeds come from the roots or the soil." They form inside the fruit. (4.2)
- **M-28** "All insects go through a pupa stage." Grasshoppers and cockroaches have three stages. (`misconceptions.js`; 5.1 and 5.2)
- **M-29** "The young of a three-stage insect is a larva." It is a young (nymph) that looks like a smaller adult. (`misconceptions.js`)
- "A tadpole looks like a small frog" or "a chick and a tadpole look alike". (5.1 and 5.2 Challenges)
- "Both start as an egg, so they have the same stages." (5.2)
- "Comparing means only finding what is alike." Look for what is alike AND different. (5.2)
- Mix-up busters, Life Cycles:
  - **#62** Wings, feelers and eggs do not make an insect; six legs and three body parts do.
  - **#63** Oil on water controls mosquitoes because the larvae and pupae cannot take in air at the surface. The card says "oxygen", which is beyond P3; say "air".
  - **#64** Why a fish lays many eggs: so some survive.
  - **#65** Mosquito numbers keep rising after rain stops, because eggs already laid still need time to grow.
  - **#66** Young get their characteristics from their parents.

### Magnets (Ch 6 and 7)
- **M-35** and the 6.1B Challenge: "A magnet attracts all metals" or "shiny metals". Only magnetic materials such as iron and steel; copper and aluminium are not magnetic.
- **M-36** "The stronger pole attracts everything." Like poles repel, whatever their strength.
- "A magnet is strongest in the middle." It is strongest at the poles. (6.2 Challenge)
- "Only bar magnets have poles" or "only bar magnets repel". Every magnet has two poles, whatever its shape. (6.1A and 6.2)
- "Anything attracted to a magnet is a magnet." Only repulsion proves it. "Magnets repel non-magnetic things." They do not. (6.3C Challenge; book's Let's Explore)
- "A floating ring magnet is broken." Like poles are repelling. (6.3B)
- "A compass needle points wherever you push it." It swings back to North–South. (6.4)
- "Copper can be stroked into a magnet." Only magnetic materials can be magnetised. "Rub back and forth" is wrong too: stroke one way, with one pole. (7.1A)
- "An electromagnet stays a magnet after switching off." It works only while electricity flows. (7.1B)
- "Changing three things at once tests a toy fairly." Change one thing at a time. (7.2)
- Mix-up busters, Magnets:
  - **#24** "Magnets attract metal": only magnetic materials. The card also names nickel and cobalt, which the syllabus marks as not required; keep P3 scripts to iron and steel.
  - **#25** Write "the iron ball is attracted TO the magnet", not "the iron ball attracted the magnet".
  - **#26** A balance reading goes up because of the push of repulsion between like poles, not more mass.

### Any experiment (Mix-up busters "_exp", all levels)
These suit a fair-test beat in Ch 3 or Ch 7:
- **#75** Repeat the experiment AND find the average.
- **#76** A variable kept the same must be exact and measurable.
- **#79** A control set-up is the same set-up without the one thing being tested.
- **#80** A conclusion says what the numbers show, with the direction.

---

## 7. Open points for the teacher (nothing was changed in the app)

1. **Sign-off order.**
   - 27 of the 28 P3 labs are not visible to pupils yet.
   - Decide the order the labs are signed off in, so each video's "Try it in TheOneApp" card points to a lab pupils can open on release day.
   - The lab to sign off before each video is listed in section 2.
2. **P4 side effect.**
   - Since 1.1 went live, the School Lab opens the Primary 3 folder by default and folds Primary 4.
   - The published P4 videos say "Open the School Lab, experiment seven point three…" without "Primary 4".
3. **Wording mismatches between labs and book** (details in the "Script check" lines). The P3 videos should follow the book; the labs could be aligned later:
   - 4.2 says "seedling"; the book says "young plant".
   - 5.1's big idea says "egg, young, pupa, adult"; the book says "egg, larva, pupa, adult".
   - The magnet benches never name the North and South poles.
   - 7.1B never says "electromagnet".
   - 3.2's definition of "strong" differs from the book's definition of strength.
   - 1.1's big idea leaves out "respond to changes".
   - 2.1A's big idea says seeds are made "inside a flower"; the book says the seeds are inside the fruits.
4. **No lab for 3.4** (floating and sinking).
5. **PR #60** ("My mind map") must merge before the P3 mind-map line works on phones and before pupils see "Make my own mind map".
