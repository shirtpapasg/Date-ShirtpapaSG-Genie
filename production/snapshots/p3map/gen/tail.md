
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
