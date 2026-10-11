# Key-word bank (draft): "Check my map"

App wording (Mind Lab `TOPICS` in mindmap.html, origin/main 67c3545) is the **master**. The P4 video wording is aligned to it. Sources for each episode N: the phone mind map (`mm/eps.json`), the `S.mindmap` scene (`epN/epNb.html`) and the key-word panel labels (`epN/tl.json` kws). P3 chapters list app terms only. Machine-readable copy: `kwbank_draft.json` (built by `kwbank_build.py`, checked by `kwbank_selftest.py`).

**Checks run:** every phone-map label and every key-word-panel label in EP1-22 is aligned or listed as a habit label. Every `means` is a real app term. App branches and keys equal TOPICS, except the step (d) change. No mix-up fires on any app term, app alias or video term, apart from the intended "of heat" wording nudges. Every mix-up fires on a plain-language example. Correct look-alikes do not fire ("cold doesn't flow", "unlike poles attract", "further from screen ➜ bigger", "shape ≠ mass").

## Conventions

- **meansKind**: `branch` = an app branch, `key` = an app key word (see "under"), `centre` = the chapter itself (middle word), `idea` = the chapter's big idea (TOPICS.idea), `extra` = no app equivalent: accept, never hint at it
- **partial**: true = close but not the same idea; credit it, but do not count it as a full match in the "you got right" lines if a better match exists
- **afterD**: what the term will mean once step (d) adds "Heat is a form of energy" to the Heat poster
- **detect**: a phrase, matched on WHOLE WORDS after normalising (see "normalise"). "a && b" = both phrases in the same node, or in the node plus its branch. "unless": skip if any of these is in the same node (or its branch). "inBranch": only test sub-branches of a branch that matches that app branch.
- **normalise**: lower-case; FIRST arrows ➜ → -> => ➡ ⟶ ⇒ -> " to " (➜ and ➡ are in emoji ranges); then drop emoji (keep ✓ ✗ ≠); "&" -> "and"; other punctuation (= : · + , . ( ) ' etc.) -> space; collapse spaces; simple plural on both sides (-ies -> y; -ses/-xes/-zes/-ches/-shes -> drop "es"; else drop a final s, not ss). Reference: kwbank_selftest.py norm().
- **matchOrder**: for each pupil node: (1) exact video term / raw (normalised) of this chapter; (2) app keys and keyAliases of the branch the node sits under; (3) the longest alias anywhere in the chapter. Several app terms can share a short alias ("temperature", "volume ✓", "shape ✗"), so the longest / in-branch match wins.
- **proposed**: heat > "Heat is a form of energy" is NOT on the poster yet (step d). Do not hint at it before the poster has it.
- JSON per chapter: `app:[{branch, keys, aliases, keyAliases, rank, hint, proposed?, keyShort?, changed?}]`, `video:[{ep, eps, term, type:"branch"|"keyword", means, meansKind, under?, videoParent?, meansAll?, partial?, afterD?, note?, src, raw[], chip?}]`, `videoCentre:[…same…]`, `centreAliases`, `extras:[{term, eps, note?}]`, `mixups:[{detect[], say, src, kind:"mixup"|"wording", unless?, inBranch?, note?}]`, `mixupsSkipped`, `mixupCandidates?`, `habitLabelsSkipped`. The top-level `_meta` key holds these notes. Skip keys starting with "_", as mixups.js does with `_exp`.

## Summary

| Chapter | Level | Episodes | App branches | Video terms aligned | Extras | Mix-ups (+ candidates) |
|---|---|---|---|---|---|---|
| plants (Plant System) | P4/P5 | 1, 2, 3, 4 | 3 | 24 | 43 | 6 |
| digestive (Digestive System) | P4 | 5, 6, 7 | 5 | 30 | 17 | 10 |
| matter (Matter) | P4 | 8, 9, 10, 11, 12 | 5 | 23 | 44 | 9 + 1 |
| light (Light) | P4 | 13, 14, 15, 16, 17 | 4 | 22 | 41 | 5 + 1 |
| heat (Heat) | P4 | 18, 19, 20, 21, 22 | 6 (1 proposed) | 35 | 23 | 9 |
| living (Living & Non-Living) | P3 | - | 5 | 0 | 0 | 1 + 1 |
| materials (Diversity of Materials) | P3 | - | 5 | 0 | 0 | 1 |
| lifecycles (Life Cycles) | P3 | - | 5 | 0 | 0 | 6 |
| magnets (Magnets) | P3 | - | 5 | 0 | 0 | 3 |

## Flags for the teacher / reviewer

- **Possible factual issue (Light poster), not changed:** Shadows key "Same shape as the object". EP17 teaches, correctly, that the shape depends on the part of the object facing the light: a cone can cast a triangle or a circle. A safer wording would be along the lines of "Shape of the side facing the light". This is for a reviewer or the teacher to decide.
- **Definition rule, outside the posters (needs the teacher's approval to change):** in mixups.js, the heat card #3 "ok" text says "Temperature is a measure of how hot something is." In misconceptions.js, M-03 "wrong" says "temperature measures how hot or cold something is". After step (d) the poster says "how hot or cold an object is". mixups.js may only change with the teacher's approval, and misconceptions.js feeds the marking prompt, so neither was touched.
- **Step (d) layout:** the poster draws 6 branches already (Electrical System and Forces have 6), so a 6th Heat branch "Heat is a form of energy" fits. The bank carries it as `proposed:true`, with suggested key words "Gain heat: temperature rises" / "Lose heat: temperature falls". These match EP19. Adjust them if (d) lands with different words.
- **Coverage gap, not an error:** the Light poster has no light-sources branch (natural / man-made), but it is P4 syllabus and in every Light video (EP13-17). Left alone, as agreed. Sources are accepted as extras.
- **Chip length:** one app key is longer than the maker's 60-character field (Plant System > Stem, 71 characters). `keyShort` gives "Transport food, water and mineral salts".
- **Mix-up candidates that are NOT in misconceptions.js / mixups.js** (in `mixupCandidates`, off by default): matter "light / heat / sound is matter" (EP8); light "the Moon is a source of light" (EP14 exam box); living "a car is living because it moves" (TOPICS outcome).

## Plant System (`plants`, P4/P5) | videos EP1-4

Big idea: *Different parts that work together so that the plant grows well*  ·  Middle word accepts: plant system, plant parts, parts of a plant, plant, system, tree

### Mismatches, video vs app

- Key words are short verbs in the videos, full jobs in the app: "anchor" = Hold the plant firmly to the ground; "absorb" = Absorb water and dissolved mineral salts; "holds upright" = Hold the plant upright to get light; "transports" = Transport food, water and mineral salts…; "gases in & out" = Take in and give out gases.
- Middle word: EP4 "PLANT PARTS" and EP1 "SYSTEM" vs the app's "Plant System". EP4 also says "STEMS" (plural) for the app's "Stem".
- EP1 maps BIKE / BODY / TREE. Only TREE > roots, leaves fits this chapter. BIKE (pedals, chain) and BODY (lungs, heart) are extras.
- EP3 is a map of one LEAF: 4 PARTS (blade, stalk, main vein, smaller veins), 2 VEIN PATTERNS (parallel, net), DIFFERENCES (edge, shape, colour, texture). The app has none of it, so all extras.
- EP4 adaptations are all extras: spines (cactus), woody / non-woody, climbing, creepers, storage roots, roots in water, stores water, green stem makes food, stem cutting.
- App key "Transport food, water and mineral salts to different parts of the plant" is 71 characters. The maker allows 60, so the chip needs the short text "Transport food, water and mineral salts" (keyShort).

### App master wording

| Rank | Branch | Key words | Also accepted (branch / keys) | Hint if missing |
|---|---|---|---|---|
| 1 | **Leaves** | Make food<br>Take in and give out gases | leaf, leaves<br>*Make food*: make food, makes food, makes its own food, make their own food, food maker, photosynthesis<br>*Take in and give out gases*: gases in and out, gases in & out, take in gases, give out gases, takes in and gives out gases, exchange of gases, gas exchange, gases | Add a branch for the leaves. What job do leaves do for the plant? |
| 2 | **Roots** | Hold the plant firmly to the ground<br>Absorb water and dissolved mineral salts | root, roots<br>*Hold the plant firmly to the ground*: anchor, anchors, anchors the plant, holds the plant firmly, holds the plant in the ground, holds the plant in place, grips the soil<br>*Absorb water and dissolved mineral salts*: absorb, absorbs, absorb water, absorbs water, takes in water, take in water, mineral salts, water and mineral salts, absorb water and mineral salts | Add a branch for the roots. What two jobs do roots do? |
| 3 | **Stem** | Hold the plant upright to get light<br>Transport food, water and mineral salts to different parts of the plant *(chip: Transport food, water and mineral salts)* | stem, stems<br>*Hold the plant upright to get light*: holds upright, hold upright, holds the plant up, keeps the plant upright, supports the plant, support, holds up the leaves<br>*Transport food, water and mineral salts to different parts of the plant*: transport, transports, carries water, carries food, carries food and water, transports water, transports food, moves water and food, water-carrying tubes, food-carrying tubes | Add a branch for the stem. How does the stem help the plant? |

### Video wording that maps to the app

| Ep | Video term | Type | Under (video) | Means (app) | Kind | Note |
|---|---|---|---|---|---|---|
| 1 | SYSTEM | branch |  | (big idea) | idea | EP1 is a general "systems" map (bike, body, tree). |
| 2 | PLANT SYSTEM | branch |  | Plant System | centre |  |
| 3 | LEAF | branch |  | Leaves | branch | EP3 zooms in on one leaf: the whole map sits under the Leaves branch. |
| 4 | PLANT PARTS | branch |  | Plant System | centre |  |
| 1 | TREE | branch |  | Plant System | centre | A tree is a plant system. |
| 1 | roots | keyword | TREE | Roots | branch |  |
| 1 | leaves | keyword | TREE | Leaves | branch |  |
| 1 | PARTS | keyword |  | (big idea) | idea |  |
| 1 | WORK TOGETHER | keyword |  | (big idea) | idea |  |
| 1 | SYSTEM | keyword |  | Plant System | centre |  |
| 1 | FUNCTION | keyword |  | (big idea) | idea | Function = the job a part does. The app's key words are the jobs. |
| 2,4 | LEAVES | branch |  | Leaves | branch |  |
| 2 | make food | keyword | LEAVES | Leaves > Make food | key |  |
| 2 | gases in & out | keyword | LEAVES | Leaves > Take in and give out gases | key |  |
| 2 | STEM | branch |  | Stem | branch |  |
| 4 | STEMS | branch |  | Stem | branch |  |
| 2 | holds upright | keyword | STEM | Stem > Hold the plant upright to get light | key |  |
| 2 | transports | keyword | STEM | Stem > Transport food, water and mineral salts to different parts of the plant | key |  |
| 2,4 | ROOTS | branch |  | Roots | branch |  |
| 2 | anchor | keyword | ROOTS | Roots > Hold the plant firmly to the ground | key |  |
| 2 | absorb | keyword | ROOTS | Roots > Absorb water and dissolved mineral salts | key |  |
| 2 | LEAVES | keyword |  | Leaves | branch |  |
| 2 | GASES | keyword |  | Leaves > Take in and give out gases | key |  |
| 2 | STEM | keyword |  | Stem | branch |  |
| 2 | TRANSPORT | keyword |  | Stem > Transport food, water and mineral salts to different parts of the plant | key |  |
| 2 | ROOTS | keyword |  | Roots | branch |  |
| 2 | ABSORB | keyword |  | Roots > Absorb water and dissolved mineral salts | key |  |
| 2 | MINERAL SALTS | keyword |  | Roots > Absorb water and dissolved mineral salts + Transport food, water and mineral salts to different parts of the plant | key |  |

### Extras: video terms with no app equivalent (accept them; never hint at them)

| Ep(s) | Term | Note |
|---|---|---|
| 1 | BIKE | A non-living example of a system. |
| 1 | pedals |  |
| 1 | chain |  |
| 1 | BODY | Human body as a system: see Digestive System / Circulatory System (P5) maps. |
| 1 | lungs | See Circulatory System (respcirc, P5). |
| 1 | heart | See Circulatory System (respcirc, P5). |
| 1 | ONE PART FAILS → SYSTEM AFFECTED | Systems idea. Close to the app outcome "Predict what happens to a plant with its stem cut". |
| 1 | RESPIRATORY SYSTEM | See Circulatory System (respcirc, P5). |
| 3 | 4 PARTS | Parts of a leaf. The Leaves branch has no leaf-part key words. |
| 3 | blade |  |
| 3 | stalk |  |
| 3 | main vein |  |
| 3 | smaller veins |  |
| 3 | 2 VEIN PATTERNS |  |
| 3 | parallel |  |
| 3 | net |  |
| 3 | DIFFERENCES | How leaves differ. |
| 3 | edge |  |
| 3 | shape |  |
| 3 | colour |  |
| 3 | texture |  |
| 3 | LEAF BLADE |  |
| 3 | LEAF STALK |  |
| 3 | PARALLEL VEINS |  |
| 3 | NET VEINS |  |
| 3 | OBSERVE | Science process skill. |
| 3 | ASK | Science process skill. |
| 3 | INVESTIGATE | Science process skill. |
| 4 | spines (cactus) | Adaptation: a cactus's spines are its leaves (M-46). |
| 4 | woody |  |
| 4 | non-woody |  |
| 4 | climbing |  |
| 4 | storage | Storage roots (e.g. carrot). |
| 4 | in water | Roots that grow in water. |
| 4 | WOODY STEM |  |
| 4 | NON-WOODY STEM |  |
| 4 | STORES WATER |  |
| 4 | SPINES = LEAVES |  |
| 4 | CLIMBERS |  |
| 4 | CREEPERS |  |
| 4 | STORAGE ROOTS |  |
| 4 | STEM CUTTING |  |
| 4 | GREEN STEM MAKES FOOD | Related to Leaves > Make food, but about the stem. Accept, no credit for the Leaves branch. |

Habit / channel labels in the key-word panels (not science, left out of the bank): EP1: HABIT STACKING, MIND MAP; EP2: MAKE IT OBVIOUS, MIND MAP; EP3: TWO-MINUTE RULE, MIND MAP; EP4: PERSEVERANCE, MAKE IT SATISFYING

### Mix-ups (friendly flag; positive "Exam tip" wording)

| Source | Kind | Detect (whole words, normalised) | Unless | Only in branch | Say |
|---|---|---|---|---|---|
| M-20 + mixups.plants#38 | mixup | roots absorb food; roots take in food; absorb food; absorbs food; takes in food from the soil; food from the soil; food from soil; gets food from the soil; absorb nutrients; absorbs nutrients; takes in nutrients; soil gives food; plants eat soil |  |  | Exam tip: roots absorb water and dissolved mineral salts. The leaves make the plant's food. |
| M-21 | mixup | roots only hold; only hold the plant; roots just hold |  |  | Exam tip: roots do two jobs. They hold the plant firmly and absorb water and mineral salts. |
| mixups.plants#39 | mixup | stem stores food; stems store food; stem keeps food; stem stores the food |  |  | Exam tip: the stem transports water and food to all parts of the plant. |
| mixups.plants#40 | mixup | stomata take in; stomata takes in; stomata absorb; stomata breathe |  |  | Exam tip: stomata are tiny openings. They allow gases to enter and leave the leaf. |
| M-23 | mixup | breathe out oxygen; breathes out oxygen; breathe in carbon dioxide; breathes in carbon dioxide; plants breathe; leaves breathe |  |  | Exam tip: plants respire like all living things. Leaves take in and give out gases. |
| M-46 | mixup | cactus has no leaves; cactus has no leaf; cactus no leaves; cactus does not have leaves; cactus doesn't have leaves; spines are not leaves; cactus is not a plant |  |  | Exam tip: a cactus is a plant. Its spines are its leaves. |

Left out (they cannot be detected in a map, or belong to another chapter): M-22 (bark, P5; not map-shaped); mixups.plants#42, #44 (answer-writing for one question type)

## Digestive System (`digestive`, P4) | videos EP5-7

Big idea: *Different parts work together to break food down so the body can take it in.*  ·  Middle word accepts: digestive system, digestion, human digestive system

### Mismatches, video vs app

- EP5 middle word is "HUMAN BODY SYSTEMS" with five branches. Only DIGESTIVE fits this chapter. RESPIRATORY and CIRCULATORY belong to the P5 Circulatory System poster (respcirc). SKELETAL and MUSCULAR have no poster. All are extras here.
- Mouth: video gives PARTS ("teeth · saliva · tongue"); the app gives JOBS ("Breaks food into smaller pieces", "Mixes food with digestive juice"). Teeth and saliva map; tongue is extra.
- Stomach: video "mixes with juices"; the app says "Churns the food up" and "Breaks food down into simpler substances". "Simpler substances" is only in the EP6 key-word panel. "Mixes … juice" is the app's MOUTH wording, so the match must be scoped to the branch.
- Small intestine: "digestion ends" = "Digestion is completed here"; "into blood" = "Digested food is absorbed into the blood". Same meaning, different words.
- Large intestine: the video says "absorbs water" but leaves out "from undigested food", which is an exam point (mixups.digestive#53). "Waste leaves the body" is not in any video map; the nearest is the key word RECTUM + ANUS.
- EP6 stops at the stomach on purpose (Part 1). Only EP7 has all five parts.

### App master wording

| Rank | Branch | Key words | Also accepted (branch / keys) | Hint if missing |
|---|---|---|---|---|
| 1 | **Mouth** | Digestion begins here<br>Breaks food into smaller pieces<br>Mixes food with digestive juice | mouth<br>*Digestion begins here*: digestion begins, digestion starts, digestion begins in the mouth, starts digestion<br>*Breaks food into smaller pieces*: teeth, chew, chews, chewing, smaller pieces, breaks food into small pieces, bite, grind<br>*Mixes food with digestive juice*: saliva, digestive juice, mixes with saliva, mixes food with saliva | Start where food goes in. Add a branch for the mouth. |
| 2 | **Small intestine** | Digestion is completed here<br>Digested food is absorbed into the blood | small intestine, small gut<br>*Digestion is completed here*: digestion ends, digestion ends here, digestion is completed, digestion completed, completes digestion, digestion finishes<br>*Digested food is absorbed into the blood*: into blood, into the blood, absorbed into blood, absorbed into the blood, absorbs digested food, absorption, absorbs food, absorbed into the bloodstream | Add the small intestine. This is where digested food goes into the blood. |
| 3 | **Stomach** | Churns the food up<br>Breaks food down into simpler substances | stomach<br>*Churns the food up*: churns, churn, churning, mixes with juices, mixes food with digestive juices, squeezes and mixes<br>*Breaks food down into simpler substances*: simpler substances, breaks food down, digests food, simpler food | Add a branch for the stomach. What does it do to the food? |
| 4 | **Large intestine** | Absorbs water from undigested food<br>Waste leaves the body | large intestine<br>*Absorbs water from undigested food*: absorbs water, absorb water, takes in water, water from undigested food<br>*Waste leaves the body*: waste leaves the body, waste, rectum, anus, rectum and anus, removes waste, faeces, feces | Add the large intestine. What does it take back from the food that is left? |
| 5 | **Gullet** | Pushes food down to the stomach | gullet, oesophagus, esophagus, food pipe, foodpipe<br>*Pushes food down to the stomach*: pushes food down, push food down, carries food to the stomach, moves food to the stomach, squeezes food down | Add the gullet. It joins the mouth to the stomach. |

### Video wording that maps to the app

| Ep | Video term | Type | Under (video) | Means (app) | Kind | Note |
|---|---|---|---|---|---|---|
| 6,7 | DIGESTIVE SYSTEM | branch |  | Digestive System | centre |  |
| 5 | DIGESTIVE | branch |  | Digestive System | centre |  |
| 5 | DIGESTIVE SYSTEM | keyword |  | Digestive System | centre |  |
| 6,7 | MOUTH | branch |  | Mouth | branch |  |
| 6 | teeth | keyword | MOUTH | Mouth > Breaks food into smaller pieces | key |  |
| 6 | saliva | keyword | MOUTH | Mouth > Mixes food with digestive juice | key | Saliva is the digestive juice in the mouth. |
| 7 | digestion begins | keyword | MOUTH | Mouth > Digestion begins here | key |  |
| 6,7 | GULLET | branch |  | Gullet | branch |  |
| 6,7 | pushes food down | keyword | GULLET | Gullet > Pushes food down to the stomach | key |  |
| 6,7 | STOMACH | branch |  | Stomach | branch |  |
| 6,7 | mixes with juices | keyword | STOMACH | Stomach > Churns the food up | key | ≈ partial. Closest app key: churning mixes food with digestive juices. Scope to the Stomach branch: under Mouth it means "Mixes food with digestive juice". |
| 7 | SMALL INTESTINE | branch |  | Small intestine | branch |  |
| 7 | digestion ends | keyword | SMALL INTESTINE | Small intestine > Digestion is completed here | key |  |
| 7 | into blood | keyword | SMALL INTESTINE | Small intestine > Digested food is absorbed into the blood | key |  |
| 7 | LARGE INTESTINE | branch |  | Large intestine | branch |  |
| 7 | absorbs water | keyword | LARGE INTESTINE | Large intestine > Absorbs water from undigested food | key | App adds "from undigested food" (mixups.digestive#53). |
| 6 | DIGESTION | keyword |  | (big idea) | idea |  |
| 6 | SIMPLER SUBSTANCES | keyword |  | Stomach > Breaks food down into simpler substances | key |  |
| 6 | TEETH | keyword |  | Mouth > Breaks food into smaller pieces | key |  |
| 6 | SALIVA | keyword |  | Mouth > Mixes food with digestive juice | key |  |
| 6 | DIGESTION BEGINS IN MOUTH | keyword |  | Mouth > Digestion begins here | key |  |
| 6 | GULLET | keyword |  | Gullet | branch |  |
| 6 | STOMACH | keyword |  | Stomach | branch |  |
| 6 | DIGESTIVE JUICES | keyword |  | Mouth > Mixes food with digestive juice + Churns the food up | key | In the mouth (saliva) and in the stomach. |
| 7 | SMALL INTESTINE | keyword |  | Small intestine | branch |  |
| 7 | MORE DIGESTIVE JUICES | keyword |  | Small intestine > Digestion is completed here | key | ≈ partial. Why digestion is completed in the small intestine. |
| 7 | DIGESTION ENDS HERE | keyword |  | Small intestine > Digestion is completed here | key |  |
| 7 | ABSORBED INTO BLOOD | keyword |  | Small intestine > Digested food is absorbed into the blood | key |  |
| 7 | LARGE INTESTINE | keyword |  | Large intestine | branch |  |
| 7 | ABSORBS WATER | keyword |  | Large intestine > Absorbs water from undigested food | key |  |
| 7 | RECTUM + ANUS | keyword |  | Large intestine > Waste leaves the body | key | ≈ partial. Where the waste leaves the body. |

### Extras: video terms with no app equivalent (accept them; never hint at them)

| Ep(s) | Term | Note |
|---|---|---|
| 5 | RESPIRATORY | See Circulatory System (respcirc, P5). |
| 5 | CIRCULATORY | See Circulatory System (respcirc, P5). |
| 5 | SKELETAL | No Mind Lab poster (Recitation topic only). |
| 5 | MUSCULAR | No Mind Lab poster. |
| 5 | MODEL |  |
| 5 | RESPIRATORY SYSTEM |  |
| 5 | EXCHANGE OF GASES |  |
| 5 | CIRCULATORY SYSTEM |  |
| 5 | SKELETAL SYSTEM |  |
| 5 | FEMUR |  |
| 5 | MUSCULAR SYSTEM |  |
| 5 | CONTRACT / RELAX |  |
| 6 | tongue | A part, not a job. Accept under Mouth. |
| 6 | MORE SURFACE EXPOSED | Why chewing helps digestion. |
| 6 | WINDPIPE | Respiratory system; food goes down the gullet, not the windpipe. |
| 7 | FIBRE |  |
| 7 | MALNOURISHED |  |

Habit / channel labels in the key-word panels (not science, left out of the bank): EP5: NEVER MISS TWICE; EP6: PLAN TIME + PLACE; EP7: MAKE IT EASY

### Mix-ups (friendly flag; positive "Exam tip" wording)

| Source | Kind | Detect (whole words, normalised) | Unless | Only in branch | Say |
|---|---|---|---|---|---|
| M-24 | mixup | digestion starts in the stomach; digestion begins in the stomach; digestion only in the stomach; digestion happens only in the stomach; only the stomach digests; digestion starts in stomach |  |  | Exam tip: digestion begins in the mouth. It is completed in the small intestine. |
| M-24 | mixup | digestion begins; digestion starts | mouth | Stomach | Exam tip: digestion begins in the mouth. It is completed in the small intestine. |
| M-25 | mixup | absorbed in the stomach; stomach absorbs; into the blood in the stomach |  |  | Exam tip: digested food is absorbed into the blood in the small intestine. |
| M-25 | mixup | absorb; absorbs; absorbed; into blood; into the blood |  | Stomach | Exam tip: digested food is absorbed into the blood in the small intestine. |
| mixups.digestive#52 | mixup | digestion breaks food into smaller pieces; digestion is breaking food into smaller pieces; digestion means breaking food into smaller pieces; digestion: smaller pieces; digestion = smaller pieces; digestion to smaller pieces |  |  | Exam tip: digestion breaks food down into simpler substances, not just smaller pieces. |
| mixups.digestive#53 | mixup | water from digested food; water from the digested food |  |  | Exam tip: the large intestine absorbs water from the undigested food. |
| mixups.digestive#59 | wording | big intestine |  |  | Exam tip: its name is the large intestine. |
| M-26 | mixup | lungs pump blood; lungs pump; lung pumps |  |  | Exam tip: the heart pumps blood. The lungs take in oxygen and give out carbon dioxide. |
| mixups.respcirc#55 | mixup | mouth is part of the respiratory system; respiratory && mouth |  |  | Exam tip: the mouth belongs to the digestive system. Air goes in through the nose and the windpipe. |
| mixups.respcirc#59 | wording | breathing tube; circulation system |  |  | Exam tip: use the exact names: windpipe, circulatory system. |

Left out (they cannot be detected in a map, or belong to another chapter): mixups.digestive#54 (less blood -> less absorption; question-specific); M-27 (respiratory; P5 chapter)

## Matter (`matter`, P4) | videos EP8-12

Big idea: *Everything around us is matter. All matter has mass, takes up space, and can change state.*  ·  Middle word accepts: matter, states of matter, three states of matter, 3 states of matter

### Mismatches, video vs app

- The structure is different. The video branches HAS MASS and TAKES UP SPACE are app KEY WORDS ("Mass", "Volume") under the app branch "All matter has". The words "All matter has" are never used in a video.
- EP9 uses ✓/✗ shorthand ("shape ✓ volume ✓", "shape ✗ volume ✓", "shape ✗ volume ✗") and says "definite" where the app says "Fixed". Liquid "shape ✗" = "Takes the shape of its container". The Gas key "Fills up the whole container" is never shown in a video.
- The app branch "Changing state" (Gains heat / Loses heat) is in no Matter video. Change of state only appears in Heat EP22.
- Video extras with no app term: NOT MATTER (light, shadow, heat, sound); units (kg, g, cm³, ml); the electronic balance and its rules; the measuring cylinder and eye level; squeeze / compressed; helium; the EP12 branch HOW SCIENTISTS INVESTIGATE (hypothesis, fair test, change 1 variable, measure).
- Middle word: EP9 "STATES OF MATTER" vs "Matter".
- Detection caution: the word "heat" under NOT MATTER (EP8) must not earn credit for Changing state > Gains heat.

### App master wording

| Rank | Branch | Key words | Also accepted (branch / keys) | Hint if missing |
|---|---|---|---|---|
| 1 | **All matter has** | Mass<br>Volume | all matter has, matter has, properties of matter, what matter has<br>*Mass*: mass, has mass, have mass<br>*Volume*: volume, takes up space, take up space, occupies space, has volume, space | What does all matter have? Add a branch for it. |
| 2 | **Solid** | Fixed shape<br>Fixed volume | solid, solids<br>*Fixed shape*: fixed shape, definite shape, keeps its shape, own shape, shape ✓<br>*Fixed volume*: fixed volume, definite volume, volume ✓ | Add a branch for solids. Think about shape and volume. |
| 3 | **Liquid** | Takes the shape of its container<br>Fixed volume | liquid, liquids<br>*Takes the shape of its container*: takes the shape of its container, takes the shape of the container, shape of the container, no fixed shape, no definite shape, shape ✗<br>*Fixed volume*: fixed volume, definite volume, volume ✓ | Add a branch for liquids. Think about shape and volume. |
| 4 | **Gas** | Fills up the whole container<br>No fixed shape or volume | gas, gases<br>*Fills up the whole container*: fills up the whole container, fills the container, fills up the container, fills the whole container, fills any container, spreads out to fill<br>*No fixed shape or volume*: no fixed shape or volume, no fixed shape, no fixed volume, no definite shape, no definite volume, shape ✗ volume ✗, volume ✗ | Add a branch for gases. Think about shape and volume. |
| 5 | **Changing state** | Gains heat<br>Loses heat | changing state, change of state, changes of state, change state, state change, melting, freezing<br>*Gains heat*: gains heat, gain heat, gaining heat, heated, when heated<br>*Loses heat*: loses heat, lose heat, losing heat, cooled, when cooled | Matter can change state. What makes it change? |

### Video wording that maps to the app

| Ep | Video term | Type | Under (video) | Means (app) | Kind | Note |
|---|---|---|---|---|---|---|
| 8,10,11,12 | MATTER | branch |  | Matter | centre |  |
| 9 | STATES OF MATTER | branch |  | Matter | centre | Its three branches are the app branches Solid, Liquid, Gas. |
| 8,10,11,12 | HAS MASS | branch |  | All matter has > Mass | key | Video BRANCH = app KEY WORD (under "All matter has"). Accept as a branch. |
| 8,10,11,12 | TAKES UP SPACE | branch |  | All matter has > Volume | key | Video BRANCH = app KEY WORD (under "All matter has"). Accept as a branch. |
| 8,11 | volume | keyword | TAKES UP SPACE | All matter has > Volume | key |  |
| 8 | MATTER | keyword |  | Matter | centre |  |
| 8 | MASS | keyword |  | All matter has > Mass | key |  |
| 8 | VOLUME | keyword |  | All matter has > Volume | key |  |
| 8 | AIR HAS MASS | keyword |  | All matter has > Mass | key | ≈ partial. Air is a gas, and it has mass. |
| 8 | AIR TAKES UP SPACE | keyword |  | All matter has > Volume | key | ≈ partial.  |
| 8 | AIR IS MATTER | keyword |  | (big idea) | idea |  |
| 9 | SOLID | branch |  | Solid | branch |  |
| 9 | shape ✓ | keyword | SOLID | Solid > Fixed shape | key |  |
| 9 | volume ✓ | keyword | SOLID | Solid > Fixed volume | key |  |
| 9 | LIQUID | branch |  | Liquid | branch |  |
| 9 | shape ✗ | keyword | LIQUID | Liquid > Takes the shape of its container | key | No fixed shape. |
| 9 | volume ✓ | keyword | LIQUID | Liquid > Fixed volume | key |  |
| 9 | GAS | branch |  | Gas | branch |  |
| 9 | shape ✗ volume ✗ | keyword | GAS | Gas > No fixed shape or volume | key |  |
| 9 | 3 STATES OF MATTER | keyword |  | Solid + Liquid + Gas | branch |  |
| 9 | DEFINITE SHAPE | keyword |  | Solid > Fixed shape | key | definite = fixed |
| 9 | DEFINITE VOLUME | keyword |  | Solid > Fixed volume | key | Solid and Liquid. |
| 9 | SOLID | keyword |  | Solid | branch |  |
| 9 | LIQUID | keyword |  | Liquid | branch |  |
| 9 | GAS | keyword |  | Gas | branch |  |

### Extras: video terms with no app equivalent (accept them; never hint at them)

| Ep(s) | Term | Note |
|---|---|---|
| 8 | kg, g | Units of mass. |
| 8 | use a balance |  |
| 8 | ✗ NOT MATTER | Light, shadow, heat and sound are not matter. Its "heat" must NOT count as Changing state > Gains heat. |
| 8 | light |  |
| 8 | shadow |  |
| 8 | heat |  |
| 8 | sound |  |
| 8 | BALANCE |  |
| 8 | NOT MATTER |  |
| 9 | squeeze ✗ | Cannot be compressed. |
| 9 | squeeze ✓ | Can be compressed. |
| 9 | GAS CAN BE COMPRESSED |  |
| 9 | HELIUM |  |
| 10 | kg and g | Units of mass. |
| 10 | electronic balance |  |
| 10 | 3 rules: flat · ON when empty · zero/tare |  |
| 10 | KILOGRAMS (kg) |  |
| 10 | GRAMS (g) |  |
| 10 | FLAT + STEADY |  |
| 10 | READS ZERO |  |
| 10 | ZERO ERROR |  |
| 10 | TARE BUTTON |  |
| 10 | SUBTRACT |  |
| 10 | AIR: 11 g |  |
| 11 | cm³ and ml | Units of volume. |
| 11 | measuring cylinder |  |
| 11 | eye level |  |
| 11 | MORE ACCURATE |  |
| 11 | cm³ |  |
| 11 | ml |  |
| 11 | 1 cm³ = 1 ml |  |
| 11 | FLAT SURFACE |  |
| 11 | BOTTOM OF THE CURVE |  |
| 11 | WATER RISES |  |
| 12 | HOW SCIENTISTS INVESTIGATE | Experimental skills (mixups._exp applies to every chapter). |
| 12 | hypothesis |  |
| 12 | fair test |  |
| 12 | change 1 variable |  |
| 12 | measure (e.g. mass) |  |
| 12 | PREDICTION FROM WHAT YOU KNOW |  |
| 12 | CHANGE ONLY 1 VARIABLE |  |
| 12 | MEASURED VARIABLE |  |
| 12 | RESULTS SUPPORT HYPOTHESIS |  |
| 12 | SHAPE DOESN'T CHANGE MASS | Related to Mass (M-14). Must NOT trigger the M-14 mix-up (negated). |

Habit / channel labels in the key-word panels (not science, left out of the bank): EP8: I AM A SCIENTIST; EP9: HABIT TRACKER; EP10: MAKE IT ATTRACTIVE; EP11: STUDY BUDDY; EP12: TREAT IT LIKE AN EXPERIMENT

### Mix-ups (friendly flag; positive "Exam tip" wording)

| Source | Kind | Detect (whole words, normalised) | Unless | Only in branch | Say |
|---|---|---|---|---|---|
| M-13 | mixup | gas has no mass; gases have no mass; air has no mass; air has no weight; air weighs nothing; gas weighs nothing; air is not matter; gas is not matter; gases are not matter; air is nothing; air does not take up space; air doesn't take up space; gas does not take up space; gases do not take up space; air takes up no space |  |  | Exam tip: air is matter. It has mass and takes up space. |
| M-14 | mixup | breaking reduces mass; less mass when broken; cutting reduces mass; mass changes with shape; shape changes mass; changing shape changes mass; less matter when broken; smaller pieces have less mass | not; doesn't; does not; no; ≠ |  | Exam tip: changing the shape does not change the mass. The amount of matter stays the same. |
| M-15 | mixup | liquid has a fixed shape; liquids have a fixed shape; liquid has a definite shape; liquids have a definite shape; liquids keep their shape; liquid keeps its shape |  |  | Exam tip: a liquid has no fixed shape. It takes the shape of its container. |
| M-15 | mixup | fixed shape; definite shape; own shape; keeps its shape; shape ✓ | no; not; without; ✗ | Liquid | Exam tip: a liquid has no fixed shape. It takes the shape of its container. |
| M-13 (wrong: "A gas ... fills its container") + TOPICS Gas keys | mixup | fixed volume; definite volume; volume ✓; fixed shape; definite shape; shape ✓ | no; not; without; ✗ | Gas | Exam tip: a gas has no fixed shape and no fixed volume. It fills up the whole container. |
| M-44 | mixup | same volume same mass; same size same mass; same volume means same mass; same size means same mass; same volume so same mass | not; doesn't; does not |  | Exam tip: two things can take up the same space but have different masses. |
| mixups.water#9 | mixup | loses heat and melts; lose heat and melt; lost heat and melted; melts when it loses heat; melts when cooled; lose heat to melt; gains heat and freezes; gain heat and freeze; freezes when heated; freezes when it gains heat; gain heat to freeze |  |  | Exam tip: ice gains heat and melts. Water loses heat and freezes. |
| mixups._exp#75 | mixup | repeat the experiment; repeat experiment; do it again | average |  | Exam tip: repeat the experiment and find the average. |
| mixups._exp#76 | wording | amount of water; size of; type of |  |  | Exam tip: name something you can measure, like the volume of water. |

Candidates, **not in misconceptions.js / mixups.js** (need the teacher's approval):

- detect: light is matter; heat is matter; sound is matter; shadow is matter; light has mass; heat has mass; sound has mass; say: Exam tip: light, heat, sound and shadows are not matter. They have no mass. *(from video EP8 (NOT MATTER box))*

Left out (they cannot be detected in a map, or belong to another chapter): mixups._exp#77-80 (answer-writing; not map-shaped)

## Light (`light`, P4) | videos EP13-17

Big idea: *Light travels in straight lines. That one fact explains shadows, reflection and how we see.*  ·  Middle word accepts: light

### Mismatches, video vs app

- Light SOURCES (NATURAL SOURCES / MAN-MADE SOURCES: Sun, stars, lightning, fireflies, jellyfish, glow-worms, bulbs, candles, torches, fireworks) is a branch in all five Light videos. The Light poster has no sources branch, so all extras.
- The videos have no "Light travels" branch. "light travels in STRAIGHT lines" sits UNDER SHADOWS, and only in the EP15 scene, not in the phone map.
- The videos have no "Reflection" branch. "reflected from objects" sits UNDER HOW WE SEE. "Mirrors reflect best" is never shown. "No light means no seeing" is never shown in a map.
- Shadows: "opaque ➜ dark shadow" ≈ "Light is blocked". "translucent ➜ less dark" is extra. Size: the video gives two rules (nearer the light ➜ bigger; further from the screen ➜ bigger); the app gives only "Nearer the light, bigger the shadow". Shape: the video says "the part facing the light"; the app says "Same shape as the object". Outdoor shadows (longest morning + evening, shortest noon) are extra.
- The videos add sub-branch headings (SHADOW SIZE, SHADOW SHAPE, OUTDOOR SHADOWS), which makes a 3-level map. The app has these ideas as key words.

### App master wording

| Rank | Branch | Key words | Also accepted (branch / keys) | Hint if missing |
|---|---|---|---|---|
| 1 | **Light travels** | In straight lines | light travels, how light travels<br>*In straight lines*: straight lines, straight line, in a straight line, travels straight, travels in straight lines | Add the big idea: how does light travel? |
| 2 | **How we see** | Light enters our eyes<br>No light means no seeing | how we see, seeing, how do we see<br>*Light enters our eyes*: enters our eyes, enters the eyes, enter the eyes, enters the eye, into our eyes, into the eyes, reaches our eyes, light must enter the eyes<br>*No light means no seeing*: no light no seeing, cannot see in the dark, can't see in the dark, cannot see without light, need light to see, no light cannot see | Add a branch for how we see. Where must the light go? |
| 3 | **Shadows** | Light is blocked<br>Nearer the light, bigger the shadow<br>Same shape as the object | shadow, shadows<br>*Light is blocked*: light is blocked, blocks light, blocks the light, blocked, opaque, opaque blocks all light<br>*Nearer the light, bigger the shadow*: nearer the light bigger, closer to the light bigger, near the light bigger, light closer bigger, nearer the light bigger shadow, object nearer the light bigger, shadow size, size<br>*Same shape as the object*: same shape, shadow shape, shape of the object, part facing the light, outline of the object, shape | Add a branch for shadows. How does a shadow form? |
| 4 | **Reflection** | Light bounces off surfaces<br>Mirrors reflect best | reflection, reflect, reflects, reflected<br>*Light bounces off surfaces*: bounces off, bounce off, light bounces, reflected from objects, reflected off, light is reflected, reflects light<br>*Mirrors reflect best*: mirror, mirrors, shiny surfaces | Add a branch for reflection. What happens when light hits a surface? |

### Video wording that maps to the app

| Ep | Video term | Type | Under (video) | Means (app) | Kind | Note |
|---|---|---|---|---|---|---|
| 13,14,15,16,17 | LIGHT | branch |  | Light | centre |  |
| 14,15,16,17 | HOW WE SEE | branch |  | How we see | branch |  |
| 14 | light must ENTER the eyes | keyword | HOW WE SEE | How we see > Light enters our eyes | key |  |
| 14 | directly from a source | keyword | HOW WE SEE | How we see > Light enters our eyes | key | ≈ partial. Light from a source enters the eyes directly. |
| 14 | reflected from objects | keyword | HOW WE SEE | Reflection > Light bounces off surfaces + Light enters our eyes | key | Video puts reflection UNDER How we see; the app has its own Reflection branch. |
| 14 | LIGHT MUST ENTER THE EYES | keyword |  | How we see > Light enters our eyes | key |  |
| 14 | SEEN DIRECTLY | keyword |  | How we see > Light enters our eyes | key | ≈ partial.  |
| 14 | LIGHT FALLS ON THE OBJECT | keyword |  | Reflection > Light bounces off surfaces | key | ≈ partial. Light falls on the object and is reflected into our eyes. |
| 14 | REFLECTION | keyword |  | Reflection | branch |  |
| 15,16,17 | SHADOWS | branch |  | Shadows | branch |  |
| 15 | light travels in STRAIGHT lines | keyword | SHADOWS | Light travels > In straight lines | key | Video puts it UNDER Shadows; the app has its own "Light travels" branch. |
| 15 | opaque ➜ dark shadow | keyword | SHADOWS | Shadows > Light is blocked | key | ≈ partial. Opaque objects block all the light. |
| 15 | OPAQUE | keyword |  | Shadows > Light is blocked | key | ≈ partial.  |
| 15 | SHADOW | keyword |  | Shadows | branch |  |
| 15 | LIGHT TRAVELS IN STRAIGHT LINES | keyword |  | Light travels > In straight lines | key |  |
| 15 | OPAQUE BLOCKS ALL LIGHT | keyword |  | Shadows > Light is blocked | key |  |
| 16,17 | SHADOW SIZE | branch | SHADOWS | Shadows > Nearer the light, bigger the shadow | key | ≈ partial. Sub-branch heading under SHADOWS. |
| 16 | nearer the light ➜ bigger | keyword | SHADOWS | Shadows > Nearer the light, bigger the shadow | key |  |
| 16 | LIGHT CLOSER = BIGGER | keyword |  | Shadows > Nearer the light, bigger the shadow | key |  |
| 17 | SHADOW SHAPE | branch | SHADOWS | Shadows > Same shape as the object | key | ≈ partial.  |
| 17 | the part facing the light | keyword | SHADOWS | Shadows > Same shape as the object | key | ≈ partial. More exact than the poster: the shape depends on the part facing the light (a cone can cast a circle). |
| 17 | SHADOW SHAPE | keyword |  | Shadows > Same shape as the object | key | ≈ partial.  |
| 17 | PART FACING THE LIGHT | keyword |  | Shadows > Same shape as the object | key | ≈ partial.  |

### Extras: video terms with no app equivalent (accept them; never hint at them)

| Ep(s) | Term | Note |
|---|---|---|
| 13,14 | NATURAL SOURCES | Light sources. The Light poster has no "sources of light" branch. |
| 13,15,16,17 | NATURAL | Short form of NATURAL SOURCES. |
| 13 | Sun |  |
| 13 | other stars |  |
| 13 | lightning |  |
| 13 | fireflies |  |
| 13 | jellyfish |  |
| 13 | glow-worms |  |
| 13,14 | MAN-MADE SOURCES |  |
| 13,15,16,17 | MAN-MADE |  |
| 13 | light bulbs |  |
| 13 | fireworks |  |
| 13 | candles |  |
| 13 | torches |  |
| 13 | ENERGY | See Energy Conversion (P6). |
| 13 | FORMS OF ENERGY | See Energy Conversion (P6). |
| 13 | SOURCE OF LIGHT |  |
| 13 | THE SUN IS A STAR |  |
| 13 | LIVING LIGHT |  |
| 14 | the Moon reflects sunlight | An example of reflection: accept, related to Reflection. |
| 14 | MOON: NOT A SOURCE |  |
| 14 | BORROWED SUNLIGHT |  |
| 15 | translucent ➜ less dark | The poster has no translucent key word. |
| 15 | TRANSLUCENT |  |
| 15 | TRANSPARENT |  |
| 15 | THREE-CARD TEST |  |
| 15 | LESS DARK SHADOW |  |
| 16 | further from screen ➜ bigger | The poster gives only the light-distance rule. Correct science: accept. |
| 16 | SCREEN |  |
| 16 | TWO DISTANCES |  |
| 16 | SCREEN FURTHER = BIGGER |  |
| 16 | BOTH DISTANCES CHANGE |  |
| 16 | RAY MODEL | Uses straight-line travel (Light travels). |
| 17 | OUTDOOR SHADOWS |  |
| 17 | longest morning + evening |  |
| 17 | shortest noon |  |
| 17 | SIDE = TRIANGLE |  |
| 17 | BASE = CIRCLE |  |
| 17 | SUN LOW = LONG SHADOW |  |
| 17 | NOON = SHORTEST |  |
| 17 | SUNDIAL |  |

Habit / channel labels in the key-word panels (not science, left out of the bank): EP13: PERSISTENCE, CELEBRATE SMALL WINS; EP14: EXAM TIP, TEACH IT; EP15: SPACE IT OUT; EP16: REMOVE DISTRACTIONS; EP17: TEST YOURSELF

### Mix-ups (friendly flag; positive "Exam tip" wording)

| Source | Kind | Detect (whole words, normalised) | Unless | Only in branch | Say |
|---|---|---|---|---|---|
| M-16 | mixup | light from our eyes; light from the eyes; light from eyes; eyes give out light; eyes give light; eyes send out light; eyes send light; eyes shoot light; eyes produce light; light comes out of our eyes; from eyes to object; from the eyes to the object | not; don't; do not |  | Exam tip: light enters our eyes. Our eyes do not give out light. |
| M-17 | mixup | shadow is a reflection; shadows are reflections; shadow is reflected; shadow reflects; shadow is made by reflection | not; isn't |  | Exam tip: a shadow forms where light is blocked. It is not a reflection. |
| M-18 | mixup | translucent && no shadow; translucent && not cast; translucent && doesn't cast; translucent && does not cast; translucent && cannot cast; translucent && no shadows |  |  | Exam tip: translucent things let some light through, so they cast a less dark shadow. |
| M-19 | mixup | closer to the screen && bigger; nearer the screen && bigger; nearer to the screen && bigger; near the screen && bigger; closer to screen && bigger; further from the light && bigger; farther from the light && bigger; away from the light && bigger; further from the torch && bigger; nearer the light && smaller; closer to the light && smaller |  |  | Exam tip: nearer the light, bigger the shadow. Nearer the screen, smaller the shadow. |
| M-45 | mixup | eyes adjust; eyes get used to the dark; see in the dark; see in total darkness; see in complete darkness; can see without light; see without light | cannot; can't; not; no light no |  | Exam tip: with no light at all, we cannot see. Light must enter our eyes. |

Candidates, **not in misconceptions.js / mixups.js** (need the teacher's approval):

- detect: moon is a source; moon gives out light; moon gives light; moon makes light; moon produces light; moon shines by itself; say: Exam tip: the Moon is not a source of light. It reflects light from the Sun. *(from video EP14 exam box)*

## Heat (`heat`, P4) | videos EP18-22

Big idea: *Heat always flows from the hotter thing to the colder one, until both are the same.*  ·  Middle word accepts: heat

### Mismatches, video vs app

- Branches: the videos use TEMPERATURE / HEAT (energy) / HEAT FLOW / CONDUCTORS / EFFECTS OF HEAT. The app uses Heat flows / Temperature / Good conductors of heat / Poor conductors of heat / Gaining or losing heat.
- HEAT (energy) / "a form of ENERGY" (EP19-22) has no app branch. It is an extra until step (d) adds "Heat is a form of energy" (afterD).
- "gain heat ➜ temperature rises", "lose heat ➜ temperature falls" (EP19) and "temperature change" (EP22): the app's Gaining or losing heat keys are only expand / contract / change state, so a temperature change is not an app key. These fit the proposed (d) branch.
- CONDUCTORS is one video branch ("good: metals", "poor: glass · plastic · wood · air"). The app has two branches, and the video leaves out "of heat" (mixups.heat#6 wording tip). "Heat travels through them quickly / slowly" is never shown. Glass and polystyrene are extras (they are poor conductors, but not app words).
- Temperature: the video map shows "measured in °C", "thermometer" and three thermometer types. The definition appears only in the EP19 key-word panel ("TEMP: HOW HOT OR COLD"). App: "How hot or cold something is" (step d changes it to "an object is") and "Measured with a thermometer". °C, the thermometer types, bulb fully in and the data logger are extras.
- Heat flow: "hot ➜ cold" and "stops when temperatures are equal" vs "From hotter to colder" and "Until both are the same temperature". Same meaning, different words. Sources of heat (Sun, Earth) is extra, and only in the scene and narration.
- EFFECTS OF HEAT = "Gaining or losing heat". "expansion + contraction" = "Expands when heated" + "Contracts when cooled". "change of state" = "Can change state".

### App master wording

| Rank | Branch | Key words | Also accepted (branch / keys) | Hint if missing |
|---|---|---|---|---|
| 1 | **Heat flows** | From hotter to colder<br>Until both are the same temperature | heat flow, heat flows, flow of heat, heat transfer, heat moves, direction of heat flow<br>*From hotter to colder*: hotter to colder, hot to cold, from hot to cold, higher temperature to lower temperature, warmer to cooler, from a hotter place to a colder place<br>*Until both are the same temperature*: same temperature, temperatures are equal, stops when equal, stops when temperatures are equal, until equal, until both are the same, equal temperature | Add the big idea: which way does heat flow? |
| 2 | **Temperature** | How hot or cold an object is *(was: How hot or cold something is)*<br>Measured with a thermometer | temperature, temp<br>*How hot or cold an object is*: how hot or cold, how hot or cold an object is, how hot or cold something is, how hot something is, degree of hotness<br>*Measured with a thermometer*: thermometer, measured with a thermometer, use a thermometer, lab thermometer, laboratory thermometer, digital thermometer, clinical thermometer | Add a branch for temperature. What does it tell us? |
| 3 | **Heat is a form of energy** *(proposed, step d)* | Gain heat: temperature rises<br>Lose heat: temperature falls | heat is a form of energy, form of energy, heat is energy, heat (energy), heat energy, energy<br>*Gain heat: temperature rises*: gain heat temperature rises, gains heat temperature rises, temperature rises, temperature increases, gain heat to temperature rises<br>*Lose heat: temperature falls*: lose heat temperature falls, loses heat temperature falls, temperature falls, temperature drops, temperature decreases, lose heat to temperature falls | What is heat? Add a branch that says heat is a form of energy. |
| 4 | **Good conductors of heat** | Metals<br>Heat travels through them quickly | good conductor, good conductors, good conductor of heat, conductors of heat<br>*Metals*: metal, metals, iron, steel, copper, aluminium, aluminum, silver<br>*Heat travels through them quickly*: heat travels quickly, conducts heat quickly, heat passes through quickly, heat flows through quickly, quickly, fast | Add good conductors of heat. Which materials let heat through quickly? |
| 5 | **Poor conductors of heat** | Plastic, wood and air<br>Heat travels through them slowly | poor conductor, poor conductors, poor conductor of heat, heat insulator, insulator, insulators<br>*Plastic, wood and air*: plastic, wood, air, glass, polystyrene, wool, rubber, cloth, fabric, cork<br>*Heat travels through them slowly*: heat travels slowly, conducts heat slowly, heat passes through slowly, slowly, slow | Add poor conductors of heat. Which materials let heat through slowly? |
| 6 | **Gaining or losing heat** | Expands when heated<br>Contracts when cooled<br>Can change state | gaining or losing heat, gain or lose heat, effects of heat, effect of heat, heating and cooling, when heated or cooled<br>*Expands when heated*: expand, expands, expansion, expands when heated, volume up, volume increases<br>*Contracts when cooled*: contract, contracts, contraction, contracts when cooled, volume down, volume decreases<br>*Can change state*: change of state, changes state, change state, state change, melt, melts, melting, freeze, freezes, boil, boils, evaporate, condense | What happens to things when they gain or lose heat? Add a branch. |

### Video wording that maps to the app

| Ep | Video term | Type | Under (video) | Means (app) | Kind | Note |
|---|---|---|---|---|---|---|
| 18,19,20,21,22 | HEAT | branch |  | Heat | centre |  |
| 18,19,20,21,22 | TEMPERATURE | branch |  | Temperature | branch |  |
| 18 | thermometer | keyword | TEMPERATURE | Temperature > Measured with a thermometer | key |  |
| 18 | TEMPERATURE | keyword |  | Temperature | branch |  |
| 18 | THERMOMETER | keyword |  | Temperature > Measured with a thermometer | key |  |
| 18 | DIGITAL THERMOMETER | keyword |  | Temperature > Measured with a thermometer | key | ≈ partial. A type of thermometer. |
| 18 | INFRARED THERMOMETER | keyword |  | Temperature > Measured with a thermometer | key | ≈ partial. A type of thermometer. |
| 18 | LAB THERMOMETER | keyword |  | Temperature > Measured with a thermometer | key | ≈ partial. A type of thermometer. |
| 19 | gain heat ➜ temperature rises | keyword | HEAT (energy) | Gaining or losing heat | branch | ≈ partial. After (d): Heat is a form of energy > Gain heat: temperature rises. The poster's Gaining or losing heat keys are expand / contract / change state; "temperature rises" is not one of them. |
| 19 | lose heat ➜ temperature falls | keyword | HEAT (energy) | Gaining or losing heat | branch | ≈ partial. After (d): Heat is a form of energy > Lose heat: temperature falls.  |
| 19 | GAIN HEAT ➜ RISES | keyword |  | Gaining or losing heat | branch | ≈ partial. After (d): Heat is a form of energy > Gain heat: temperature rises.  |
| 19 | LOSE HEAT ➜ FALLS | keyword |  | Gaining or losing heat | branch | ≈ partial. After (d): Heat is a form of energy > Lose heat: temperature falls.  |
| 19,20 | HEAT FLOWS HOT ➜ COLD | keyword |  | Heat flows > From hotter to colder | key |  |
| 19 | TEMP: HOW HOT OR COLD | keyword |  | Temperature > How hot or cold an object is | key |  |
| 20,21,22 | HEAT FLOW | branch |  | Heat flows | branch |  |
| 20 | hot ➜ cold | keyword | HEAT FLOW | Heat flows > From hotter to colder | key |  |
| 20 | stops when temperatures are equal | keyword | HEAT FLOW | Heat flows > Until both are the same temperature | key |  |
| 20 | COLD DOESN'T FLOW | keyword |  | Heat flows > From hotter to colder | key | The M-01 correction. Must NOT trigger the "cold flows" mix-up (negated). |
| 20 | STOPS WHEN EQUAL | keyword |  | Heat flows > Until both are the same temperature | key |  |
| 21,22 | CONDUCTORS | branch |  | Good conductors of heat + Poor conductors of heat | branch | One video branch = two poster branches. Wording tip: add "of heat" (mixups.heat#6). |
| 21 | good: metals | keyword | CONDUCTORS | Good conductors of heat > Good conductors of heat + Metals | key |  |
| 21 | poor: glass · plastic · wood · air | keyword | CONDUCTORS | Poor conductors of heat > Poor conductors of heat + Plastic, wood and air | key | "glass" is extra (not on the poster); plastic, wood and air match. |
| 21 | GOOD CONDUCTOR | keyword |  | Good conductors of heat | branch | Wording tip: "good conductor OF HEAT" (mixups.heat#6). |
| 21 | METALS | keyword |  | Good conductors of heat > Metals | key |  |
| 21 | POOR CONDUCTOR | keyword |  | Poor conductors of heat | branch | Wording tip: "poor conductor OF HEAT". |
| 21 | AIR = POOR CONDUCTOR | keyword |  | Poor conductors of heat > Plastic, wood and air | key |  |
| 21 | POLYSTYRENE | keyword |  | Poor conductors of heat > Plastic, wood and air | key | ≈ partial. Another poor conductor of heat. |
| 22 | EFFECTS OF HEAT | branch |  | Gaining or losing heat | branch |  |
| 22 | temperature change | keyword | EFFECTS OF HEAT | Gaining or losing heat | branch | ≈ partial. After (d): Heat is a form of energy. Same idea as EP19 gain/lose heat -> temperature rises/falls. |
| 22 | expansion | keyword | EFFECTS OF HEAT | Gaining or losing heat > Expands when heated | key |  |
| 22 | contraction | keyword | EFFECTS OF HEAT | Gaining or losing heat > Contracts when cooled | key |  |
| 22 | change of state | keyword | EFFECTS OF HEAT | Gaining or losing heat > Can change state | key |  |
| 22 | EXPAND = VOLUME UP | keyword |  | Gaining or losing heat > Expands when heated | key |  |
| 22 | CONTRACT = VOLUME DOWN | keyword |  | Gaining or losing heat > Contracts when cooled | key |  |
| 22 | CHANGE OF STATE | keyword |  | Gaining or losing heat > Can change state | key |  |
| 22 | MELT | keyword |  | Gaining or losing heat > Can change state | key |  |

### Extras: video terms with no app equivalent (accept them; never hint at them)

| Ep(s) | Term | Note |
|---|---|---|
| 18 | measured in °C | The unit. Do not credit "Measured with a thermometer" from the word "measured" alone. |
| 18 | digital · infrared · laboratory | Three types of thermometer: related to "Measured with a thermometer". |
| 18 | DEGREES CELSIUS (°C) |  |
| 18 | THERMAL CAMERA |  |
| 18 | BULB FULLY IN |  |
| 18 | DATA LOGGER |  |
| 19,20 | HEAT (energy) | After (d): Heat is a form of energy. No poster branch today. After step (d) it means "Heat is a form of energy". |
| 21,22 | HEAT | After (d): Heat is a form of energy. Short form of HEAT (energy). |
| 19 | a form of ENERGY | After (d): Heat is a form of energy.  |
| 19 | HEAT: A FORM OF ENERGY | After (d): Heat is a form of energy.  |
| 19 | ROOM TEMPERATURE |  |
| 19 | SURROUNDINGS |  |
| 20 | sources: Sun · Earth | Sources of heat. In the scene and the narration, not in the phone map. |
| 20 | HORIZONTAL AXIS | Line-graph skills. |
| 20 | VERTICAL AXIS | Line-graph skills. |
| 20 | DATA POINT | Line-graph skills. |
| 20 | SOURCE OF HEAT |  |
| 20 | HOT SPRINGS |  |
| 21 | MATERIAL MATTERS |  |
| 21 | WAX ROD TEST |  |
| 22 | BALL + RING |  |
| 22 | GASES EXPAND MOST |  |
| 22 | EXPANSION GAPS |  |

Habit / channel labels in the key-word panels (not science, left out of the bank): EP18: MEASURE PROGRESS; EP19: ONE-SENTENCE SUMMARY; EP20: NAME THE DIRECTION; EP21: LINK TO REAL LIFE; EP22: BIG PICTURE REVIEW

### Mix-ups (friendly flag; positive "Exam tip" wording)

| Source | Kind | Detect (whole words, normalised) | Unless | Only in branch | Say |
|---|---|---|---|---|---|
| M-01 | mixup | cold flows; cold flow; flow of cold; cold moves; cold travels; cold goes into; cold enters; cold passes; cold spreads; coldness flows; cold to hot; colder to hotter; cold energy | not; doesn't; does not; no; never; isn't |  | Exam tip: only heat flows, from the hotter thing to the colder thing. Cold does not flow. |
| M-02 + mixups.heat#2 | mixup | non-conductor; non conductor; nonconductor; stops heat; stop heat; blocks heat; block heat; does not conduct heat; doesn't conduct heat; no heat passes; heat cannot pass; does not let heat through; doesn't let heat through |  |  | Exam tip: say "poor conductor of heat". Heat still passes through it, only slowly. |
| M-03 + mixups.heat#3 | mixup | temperature is heat; temperature measures heat; temperature is a measure of heat; measure of heat; measures heat; heat is temperature; heat is the same as temperature; heat equals temperature; heat and temperature are the same; thermometer measures heat | not; isn't; is not; ≠ |  | Exam tip: heat is a form of energy. Temperature is how hot or cold an object is. |
| M-04 | mixup | metals are cold; metal is cold; metals are colder; metal is colder; metals are naturally cold |  |  | Exam tip: metal only feels cold. It is a good conductor of heat, so it takes heat away from your hand quickly. |
| M-05 + mixups.heat#1 | mixup | traps heat; trap heat; trapped heat; trapping heat; blanket gives heat; blanket adds heat; blankets give heat; fur gives heat; adds heat to |  |  | Exam tip: fur and blankets trap AIR. Air is a poor conductor of heat, so heat is lost more slowly. |
| M-06 | mixup | mass increases; more mass; gains mass; mass goes up; mass gets bigger; gets heavier; becomes heavier; heavier when heated; loses mass when cooled | not; same |  | Exam tip: when something expands, its volume goes up. Its mass stays the same. |
| mixups.water#9 | mixup | loses heat and melts; lose heat and melt; lost heat and melted; melts when it loses heat; melts when cooled; lose heat to melt; gains heat and freezes; gain heat and freeze; freezes when heated; freezes when it gains heat; gain heat to freeze |  |  | Exam tip: ice gains heat and melts. Water loses heat and freezes. |
| mixups.heat#7 | wording | becomes bigger; gets bigger; grows bigger; becomes smaller; gets smaller; shrinks | expand; contract |  | Exam tip: use the science words: it expands when heated and contracts when cooled. |
| mixups.heat#6 | wording | good conductor; good conductors; poor conductor; poor conductors; conductors | of heat; heat |  | Exam tip: write it in full: good conductor of heat, poor conductor of heat. |

Left out (they cannot be detected in a map, or belong to another chapter): mixups.heat#4 (bubble: name what expands); mixups.heat#5 (gain heat FROM what); M-43 (ring and ball: which object); M-11 (temperature steady while melting; P5 water)

## Living & Non-Living (`living`, P3) | no P4 videos (P3: app terms only)

Big idea: *Living things need certain things, and can do certain things. Non-living things cannot.*  ·  Middle word accepts: living and non-living, living things, living & non-living, living

### App master wording

| Rank | Branch | Key words | Also accepted (branch / keys) | Hint if missing |
|---|---|---|---|---|
| 1 | **Living things need** | Water<br>Food<br>Air | living things need, needs, what living things need<br>*Water*: water<br>*Food*: food<br>*Air*: air, oxygen | What do all living things need? Add a branch. |
| 2 | **Living things can** | Grow<br>Respond to changes<br>Reproduce | living things can, characteristics of living things, what living things can do<br>*Grow*: grow, grows, growth<br>*Respond to changes*: respond, responds to changes, response, react to changes<br>*Reproduce*: reproduce, reproduces, reproduction, have young, make young | What can all living things do? Add a branch. |
| 3 | **Plants** | Flowering plants<br>Non-flowering plants | plant, plants<br>*Flowering plants*: flowering, flowering plant, flowers<br>*Non-flowering plants*: non-flowering, non flowering, fern, ferns, moss, mosses | Add a branch for plants. What two groups are there? |
| 4 | **Animals** | Mammals, birds, fish<br>Reptiles, amphibians<br>Insects | animal, animals<br>*Mammals, birds, fish*: mammal, mammals, bird, birds, fish<br>*Reptiles, amphibians*: reptile, reptiles, amphibian, amphibians<br>*Insects*: insect, insects | Add a branch for animals and their groups. |
| 5 | **Other groups** | Fungi<br>Bacteria | other groups, fungi and bacteria, microorganisms<br>*Fungi*: fungi, fungus, mushroom, mushrooms, mould, mold, yeast<br>*Bacteria*: bacteria, bacterium | Some living things are not plants or animals. Add a branch for them. |

### Mix-ups (friendly flag; positive "Exam tip" wording)

| Source | Kind | Detect (whole words, normalised) | Unless | Only in branch | Say |
|---|---|---|---|---|---|
| mixups.lifecycles#62 (cross-listed) | mixup | wings; feelers; antennae | six legs; 6 legs; three body parts; 3 body parts; three parts; 3 parts | Insects | Exam tip: an insect has six legs and three body parts. Other animals can have wings and feelers too. |

Candidates, **not in misconceptions.js / mixups.js** (need the teacher's approval):

- detect: car is living; cars are living; moves so it is living; it moves so it is alive; fire is living; say: Exam tip: moving is not enough. A living thing also grows, responds to changes and reproduces. *(from TOPICS outcome ("why a car moves but is still non-living"))*

Left out (they cannot be detected in a map, or belong to another chapter): No Living-and-Non-Living entries exist in misconceptions.js or mixups.js.

## Diversity of Materials (`materials`, P3) | no P4 videos (P3: app terms only)

Big idea: *Every material has properties, and those properties decide what it is good for.*  ·  Middle word accepts: diversity of materials, materials, properties of materials

### App master wording

| Rank | Branch | Key words | Also accepted (branch / keys) | Hint if missing |
|---|---|---|---|---|
| 1 | **Strength** | Holds heavy loads<br>Breaks easily | strength, strong<br>*Holds heavy loads*: holds heavy loads, holds heavy things, strong, does not break easily<br>*Breaks easily*: breaks easily, weak, fragile | Add a branch for strength. Which materials are strong? |
| 2 | **Flexibility** | Bends without breaking<br>Stiff and keeps its shape | flexibility, flexible<br>*Bends without breaking*: bends without breaking, bends easily, flexible, bendy<br>*Stiff and keeps its shape*: stiff, rigid, keeps its shape, not flexible | Add a branch for flexibility. Which materials bend? |
| 3 | **Float or sink** | Floats on water<br>Sinks in water | float or sink, floating, sinking, floats or sinks<br>*Floats on water*: floats, float, floats on water<br>*Sinks in water*: sinks, sink, sinks in water | Add a branch: does it float or sink? |
| 4 | **Waterproof** | Keeps water out<br>Soaks water up | waterproof, water resistant<br>*Keeps water out*: keeps water out, waterproof, does not absorb water, does not let water through<br>*Soaks water up*: soaks water up, soaks up water, absorbs water, absorbent | Add a branch for waterproof materials. |
| 5 | **Lets light through** | Clear enough to see through<br>Blocks the light | lets light through, allows light through, light passes through<br>*Clear enough to see through*: clear, transparent, see-through, see through<br>*Blocks the light*: blocks light, blocks the light, opaque, does not let light through | Add a branch: does it let light through? |

### Mix-ups (friendly flag; positive "Exam tip" wording)

| Source | Kind | Detect (whole words, normalised) | Unless | Only in branch | Say |
|---|---|---|---|---|---|
| M-33 | mixup | heavy things sink; heavy objects sink; heavy sinks; heavier sinks; light things float; light objects float; lighter floats; light floats; heavy things cannot float; heavy objects cannot float | not |  | Exam tip: floating does not depend on weight alone. It depends on the material. |

Left out (they cannot be detected in a map, or belong to another chapter): M-34 (one useful property): not detectable in a map.; No Materials entries in mixups.js.

## Life Cycles (`lifecycles`, P3) | no P4 videos (P3: app terms only)

Big idea: *Plants and animals go through stages, in order, from the start of life to adult.*  ·  Middle word accepts: life cycles, life cycle, lifecycles

### App master wording

| Rank | Branch | Key words | Also accepted (branch / keys) | Hint if missing |
|---|---|---|---|---|
| 1 | **Flowering plant** | Seed<br>Young plant<br>Adult plant | flowering plant, plant, plant life cycle<br>*Seed*: seed, seeds<br>*Young plant*: young plant, seedling<br>*Adult plant*: adult plant, mature plant | Add the flowering plant. What stages does it go through? |
| 2 | **Butterfly & beetle** | Egg<br>Larva<br>Pupa<br>Adult | butterfly, beetle, butterfly and beetle, four stages, 4 stages, four-stage, mosquito<br>*Egg*: egg, eggs<br>*Larva*: larva, larvae, caterpillar, grub<br>*Pupa*: pupa, pupae, chrysalis, cocoon<br>*Adult*: adult | Add a four-stage life cycle, like the butterfly. |
| 3 | **Grasshopper & cockroach** | Egg<br>Nymph<br>Adult | grasshopper, cockroach, grasshopper and cockroach, three stages, 3 stages, three-stage<br>*Egg*: egg, eggs<br>*Nymph*: nymph, nymphs, young<br>*Adult*: adult | Add a three-stage life cycle, like the grasshopper. |
| 4 | **Frog** | Egg<br>Tadpole (the young)<br>Adult frog | frog, frogs<br>*Egg*: egg, eggs, frogspawn<br>*Tadpole (the young)*: tadpole, tadpoles, froglet<br>*Adult frog*: adult frog, adult, frog | Add the frog. What is its young called? |
| 5 | **Chicken** | Egg<br>Chick<br>Adult hen | chicken, hen<br>*Egg*: egg, eggs<br>*Chick*: chick, chicks<br>*Adult hen*: adult hen, hen, adult chicken, rooster | Add the chicken. What hatches from the egg? |

### Mix-ups (friendly flag; positive "Exam tip" wording)

| Source | Kind | Detect (whole words, normalised) | Unless | Only in branch | Say |
|---|---|---|---|---|---|
| M-28 + M-29 | mixup | pupa; pupae; larva; larvae; caterpillar; chrysalis | no; not | Grasshopper & cockroach | Exam tip: grasshoppers and cockroaches have three stages: egg, nymph, adult. There is no larva or pupa. |
| M-28 | mixup | all insects have a pupa; all insects have pupa; every insect has a pupa; all insects have four stages; all insects have 4 stages |  |  | Exam tip: some insects have three stages (egg, nymph, adult), with no pupa. |
| mixups.lifecycles#62 | mixup | wings; feelers; antennae | six legs; 6 legs; three body parts; 3 body parts; three parts; 3 parts | Insects | Exam tip: an insect has six legs and three body parts. Other animals can have wings and feelers too. |
| mixups.lifecycles#63 | mixup | oil stops air entering; oil blocks air; oil stops air from entering; oil stops air going into the water; oil stops oxygen entering the water |  |  | Exam tip: the oil stops the larvae and pupae from taking in air at the water's surface. |
| mixups.lifecycles#64 | mixup | continuity of its kind; continuity of their kind |  |  | Exam tip: many eggs are laid because some are eaten or do not hatch. This way, some survive. |
| mixups.lifecycles#66 | wording | information from parents; information is passed; information passed down |  |  | Exam tip: the young get their characteristics from their parents. |

Left out (they cannot be detected in a map, or belong to another chapter): mixups.lifecycles#65 (rain stopped, numbers rise; question-specific)

## Magnets (`magnets`, P3) | no P4 videos (P3: app terms only)

Big idea: *A magnet pushes or pulls without touching, and only some materials feel it.*  ·  Middle word accepts: magnets, magnet

### App master wording

| Rank | Branch | Key words | Also accepted (branch / keys) | Hint if missing |
|---|---|---|---|---|
| 1 | **Poles together** | Unlike poles attract<br>Like poles repel | poles together, like and unlike poles<br>*Unlike poles attract*: unlike poles attract, opposite poles attract, different poles attract, north and south attract, n and s attract<br>*Like poles repel*: like poles repel, same poles repel, north and north repel, south and south repel, n and n repel, s and s repel | What happens when two poles meet? Add a branch. |
| 2 | **Two poles** | North pole<br>South pole | two poles, 2 poles, poles<br>*North pole*: north pole, north, n pole<br>*South pole*: south pole, south, s pole | Add a branch for the two poles. |
| 3 | **A magnet can** | Push<br>Pull | a magnet can, magnet can, what magnets do<br>*Push*: push, pushes<br>*Pull*: pull, pulls | What can a magnet do? Add a branch. |
| 4 | **Magnetic materials** | Iron and steel<br>Not copper or plastic | magnetic materials, magnetic, attracted to magnets<br>*Iron and steel*: iron, steel, nickel, cobalt<br>*Not copper or plastic*: non-magnetic, not magnetic, copper, plastic, aluminium, aluminum, wood, glass, not attracted | Which materials does a magnet attract? Add a branch. |
| 5 | **Making a magnet** | Stroke method<br>Electrical method | making a magnet, make a magnet, make magnets<br>*Stroke method*: stroke, stroking, stroke method<br>*Electrical method*: electrical method, electric, electromagnet, coil of wire | How can we make a magnet? Add a branch. |

### Mix-ups (friendly flag; positive "Exam tip" wording)

| Source | Kind | Detect (whole words, normalised) | Unless | Only in branch | Say |
|---|---|---|---|---|---|
| M-35 + mixups.magnets#24 | mixup | all metals are magnetic; all metals; attracts all metals; attracts metal; attract metal; attracts metals; attract metals; magnets attract metal; copper is magnetic; aluminium is magnetic; aluminum is magnetic; attracts copper; attracts aluminium; attracts aluminum; attracts gold; attracts silver | not; only some; non |  | Exam tip: magnets attract magnetic materials like iron and steel. Not all metals are magnetic. |
| M-36 | mixup | like poles attract; same poles attract; unlike poles repel; opposite poles repel; different poles repel; north and north attract; south and south attract; north and south repel; n and n attract; s and s attract; n and s repel; stronger pole attracts |  |  | Exam tip: unlike poles attract. Like poles repel. |
| mixups.magnets#25 | wording | attracted the magnet; attracts the magnet; attract the magnet; iron attracts; steel attracts; iron attracted |  |  | Exam tip: write it this way round: the iron is attracted to the magnet. |

Left out (they cannot be detected in a map, or belong to another chapter): mixups.magnets#26 (balance reading; question-specific)

