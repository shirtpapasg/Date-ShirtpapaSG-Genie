# Style Guide — "TheOneApp, Explained" · Primary 3 series

This guide carries over **every** rule of the P4 style guide (`S/p4/01_style_guide.md`) and the teacher's standing rules, then adds the P3 adjustments for 8–9-year-olds and the build-kit conventions (`R/kit/README.md`). Where a P3 rule tightens a P4 rule, the P3 rule wins for P3 episodes. **Every rule of `S/p4/01_style_guide.md` still applies unless this guide changes it**; the P4 rules that scripts lean on most are repeated below so nobody has to open two files.

---

## 1. Voice

- A warm, curious teacher talking to ONE 8-year-old: "you", short sentences, one idea per sentence.
- Spoken English, not textbook English. Contractions are fine ("don't", "here's"). No Singlish in the narration, so it works in both countries.
- **Explain, then name:** describe the thing in everyday words first, then give the science term. "It bends without breaking. Scientists call that *flexible*."
- Every claim is accurate to the P3 syllabus. Simplify, but never say something a P4, P5 or P6 teacher would have to "unteach" (for example never "plants eat sunlight", never "magnets attract metal", never "a seed needs soil to start growing"). In P3 answers, call the tadpole the frog's young, not a larva (the book's stage name; biologists do call it a larva, so no ✗ goes on that word).
- Never invent numbers. Use only book-safe values (the Earth's rotation takes 24 hours; three or four stages; six legs; two poles; rabbits have one to twelve young; a female mosquito lays 100 to 200 eggs) or clearly hypothetical "say, ten clips" numbers.
- Keep the book's hedge words: *usually*, *most*, *some*, *many*. They are part of the definition (ostriches and penguins cannot fly; guppies give birth; mudskippers can live on land as well as in water; snakes have no legs; many adult insects have two pairs of wings).

## 2. Positive language (parents and educators)

- Never use words with negative connotations, even playfully: no "cheat", "lying", "trap", "stupid", "dumb", "kill", "dead", "bad guys", "gross".
- Swaps: "cheat" → **"superpower"**; "exam trap" → **"Exam tip"** ("Lots of students mix this up"); "your touch is lying" → "your senses got mixed up"; "killing" → "harming"; "bacteria killer" → **"a medicine that stops harmful bacteria from growing"**; "die / die out" → **"stop living" / "disappear forever"** (keep **extinct** as the science term, defined as the book does); "the pupa looks dead" → **"the pupa is alive and busy changing inside"**; "bad bacteria" → **"harmful bacteria"**.
- Science words that only sound negative are fine in their real meaning: "harmful fungi", "repel", "fragile", "non-living", "break", "extinct", **"trapped air"** (the book's own reason a ship floats, EP 10), and P4's "if one part fails" and "it lies next to" (position).
- Apply this everywhere: narration, on-screen text, titles, thumbnails, descriptions, chapters and the review board.

## 3. Pacing

- Pauses after every teaching point: the kit leaves **0.55 s between lines in the same scene and 1.0 s between scenes** (P4 values). For P3, get extra breathing room by **writing shorter segments** (two or three sentences each), so the scene gap falls more often. Do not change the kit's timings.
- **Voice 3** speed (0.92 statements, 0.86 questions) is already slower than voice 1; it stays as the series voice for P3. Reserve **voice 4 ("foundation")** for Foundation Science resources, not for the P3 YouTube episodes.
- One new idea per beat, then show it, then say it again in the Exam corner. Three touches per idea.

## 4. Narrator (same as P4, decided 10 Oct 2026)

- **Heart, voice 3 ("expressive")** narrates every P3 episode: Kokoro `af_heart`, `en-us`, pitch range widened 1.6x, read sentence by sentence (the kit's default).
- One narrator from start to finish; no voice swap mid-video, no alternation across episodes.
- Write in neutral English that works in both accents ("your parents", not "mum" or "mom").
- Write numbers as words whenever the TTS or the aligner needs a cue ("twenty-four hours", "six legs", "experiment one point one"). Digits are read aloud but get no word timing, so never put a visual cue on a digit.
- Every spoken word must be in cmudict or in `R/kit/pron.txt` (or the episode config `pron`). Watch P3-specific words: *mimosa, tempeh, rambutan, tadpole, nymph, pupa, pupae, larva, larvae, wriggler, prolegs, moult, moulting, lodestone, maglev, Aedes, kopitiam, kiln, sapling, cicak*. Prefer an everyday synonym when a rare word is not needed (no herbarium, no binomial nomenclature, no penicillin in the P3 videos: they go in the description).

## 5. Structure (3:15–4:15, about 420–580 authored spoken words)

1. **Hook (0:00–0:12):** one surprising, specific line that confirms the title, opens a question and promises the payoff. **About 28–30 words at voice 3, never more than 35.** Segment id `hook`, scene `hook`. The hook still opens the video, so any clip from the start works as a Short or TikTok.
2. **Welcome + "Today you'll learn" (kit-made, about 15 s):** "Hi there, and welcome to The One App, Explained! I'm so happy you're here. Today, you will learn three big ideas. First, … Second, … And third, … Let's get started!" Exactly **three goals**, each popping onto the "🎯 TODAY YOU'LL LEARN" board. No "subscribe".
3. **Body (3–4 beats):** one idea per beat, each ending on a mini-question. P3: name the object, show it, count it, then name the science word. Each body carries one spoken **Singapore anchor** and one spoken **US bridge** inside a named beat (section 11), not only in the brief's side notes.
4. **Try-it moment:** the School Lab link (spoken + card) or a safe home observation ("gently touch a mimosa leaf").
5. **Pause and predict (`quiz1` then `quiz2`, scene `quiz`):** one question, **three options** for P3 (A, B, C), the kit's **4-second silent "Think!" countdown with soft ticks**, then the answer with the reason. Options stay on screen through the countdown; reveal on `quiz2` cues; never draw your own timer. **The quiz is a prediction, not a recall pause:** (a) it uses an object or situation not shown earlier in the episode; (b) the question never contains the definition words of the right answer; (c) the beat just before `quiz1` must not state the answer (and neither does the title); (d) at least one wrong option is a misconception from the brief's list. When a quiz is replaced, update the brief's "Pause and predict" box, the `quiz2` text and the `["quiz2", …]` burst cue together.
6. **Exam corner (`exam`, 20–30 s):** "In your exam, say it like this…" then the exact wording from `definitions.md`, line by line with a ✓. **At most three lines.** When the chapter has more, drop whole definitions rather than shorten one (definition accuracy wins over coverage); a dropped line still appears in its word box and the mind map.
7. **Payoff and recap:** deliver the hook's promise, explicitly.
8. **Habit + revision (`habit1` in scene `habit`, `habit2` in scene `mindmap`, about 30 s):** ONE atomic habit (habit stacking, two-minute rule, make it obvious, habit tracker, never miss twice, implementation intention, temptation bundling, environment design, identity, accountability partner, reward after, start tiny) in **30 words or fewer**; then the mind map: `habit2` **speaks only the middle word and the branch names**, the sub-branches pop up on screen without narration, then the fixed app line follows. **Target: exam + habit1 + habit2 ≤ 120 spoken words** (P4 averaged 124; P3 viewers are younger).
9. **Close (`close`):** ONE ask that the viewer can do offline: "Tell someone at home…", "Show your teacher tomorrow…", "Draw it in your notebook…", "Find one … at home". **Never "tell me in the comments":** videos for 8–9-year-olds are uploaded as "made for kids", which switches comments off (`S/p4/YOUTUBE_UPLOAD_KIT.md`), and the series does not ask young children to post in public. The close's visual is a notebook or a family speech bubble, not a comment bubble.
10. **Goodbye over the end card (kit-made):** "Thanks for watching! See you next time. Bye!" (last episode: "See you soon."), under 3.15 s.

## 6. The teacher's standing rules (checked before every render)

1. **Definition accuracy.** Every definition shown or spoken is the FULL, correct MOE wording from `definitions.md`, never a shortened version. Shortening is how errors creep in. Summaries, mind maps, habit lines, key-word labels, word boxes and one-line recaps follow the same rule: if a line states what something IS, it uses the full definition. Fact-check every science statement against `definitions.md` before rendering and flag anything that would lose marks in a Singapore exam.
   - P3 watch-list: *classification* = "the grouping of things based on their similarities and differences" (row 2.33); *comparing* = finding similarities **and** differences (5.12; first taught in EP 04, used in EP 09, reviewed in EP 18); *strength* = "ability to be pulled or pushed without breaking or tearing" (3.12, never without "or tearing"); *flexibility* = "ability to bend without breaking" (3.15); *waterproof* = "do not absorb water at all" (3.18); *life cycle* = "a repeated pattern of change as a living thing grows over time and reproduces" (4.2); *cycle* = "a repeated pattern of change" (C0.1, never just "a pattern that repeats"); *fair test* (7.9: the things kept the same are variables too); magnet lines (6.2–6.17: a freely suspended magnet "comes to rest in the North–South direction", never "points North").
2. **Plain label lines.** Every label of a part is joined to that part by one plain line, **no arrowhead**. **Never use numbered markers** beside a drawing in place of labels (and never number the stages of a life cycle: the book says there is no first or last stage, 5.16).
   - Arrows are allowed only to show **motion, flow or direction**: the loop arrows of a life cycle, the pull and push between magnet poles, water flowing. Never for pointing at a label.
3. **Wrong statements:** a ✗ at the start of the statement only. **No strikeout**; pupils must still be able to read the words. A ✗ goes only on a statement that is actually false: never on a true fact that merely uses a word the book does not (seeds forming in the flower, a tadpole being a larva, ceramic tiles being strong).
4. **Positive language:** "Exam tip", never "trap" (section 2).
5. **Realism** of objects, colours and directions (section 10).
6. **Every named skill or term becomes a key word, with its full name** ("FLOWERING PLANTS", not "FLOWERING"; "STROKE METHOD"; "FREELY SUSPENDED MAGNET"; "CLASSIFYING", "COMPARING", "OBSERVING", "OBSERVABLE CHARACTERISTICS", "FAIR TEST" when the skill is named).
7. **The 4-second silent "Think!" countdown with soft ticks** before every quiz answer (kit: `quiz1` → `quiz2`).
8. **School Lab card plus the spoken link** in every episode that has a matching lab: "You can try it in The One App. Open the School Lab, experiment one point two, and press, Let's test it now!" (codes with a letter: "two point one A", "six point three C"). The card shows from the cue word "try" to 0.6 s after the segment. The spoken teaser names the animals or objects the card's part actually holds (check `labs_p3.json` `setUp`).
9. **Mind-map habit with the real app steps:** "Save it in TheOneApp, the ultimate science app. Tap Mind maps, then, Make my own mind map, and pick Living and Non-Living." (`habit2` must say "save" and "tap"; the chapter name is one of the four P3 Mind Lab names: Living & Non-Living, Diversity of Materials, Life Cycles, Magnets; speak "&" as "and").
10. **Bigger objects filling the empty space.** Draw the main object large (a third of the stage or more) and let the kit's scene fills enlarge up to 1.5x; never leave a small drawing floating in a big empty scene.
11. **Welcome with three goals and a spoken goodbye** on every episode (kit-made from the config `goals` and `bye`).

## 7. P3 adjustments for 8–9-year-olds

- **Shorter sentences:** about 8–12 words, one clause. Split anything with "because … and … so …" into two sentences.
- **Simpler words:** "pull" before "attract", "push" before "repel", "see-through" before "transparent", "young one" before "young", "turn into" before "develop into". Then give the science word, every time, and use the science word in the Exam corner.
- **Define every new word on screen.** When a term first appears, a word box shows the term and its meaning:
  - exam terms: the **full** `definitions.md` wording (for example "Waterproof: materials that do not absorb water at all are waterproof"; "When living things grow, they increase in size. They also become more complex.");
  - helper words that are not exam definitions (kiln, sap, pulp, lodestone, feelers, egg case, similarities): a short plain gloss ("kiln: a very hot oven"; "similarities: characteristics that things have in common").
- **Slower pace:** fewer words per beat, one visual change every 3–4 seconds instead of 2–3, and a full second of "look at it" after each reveal. Count things aloud ("one, two, three body parts") while the parts light up.
- **Concrete Singapore examples** pupils have touched: recess snack box, school bag, HDB bathroom frosted window, fridge magnets, the kopi sock at the kopitiam, mimosa on the school field, rambutan and mango, tempeh, yoghurt drinks, free-roaming chickens near HDB blocks, the cicak on the wall, NEA's Mozzie Wipeout, Tree Planting Day, the Botanic Gardens seed bank, hiking at MacRitchie.
- **Three quiz options, not four.** One question, one skill, one reason in the answer (and the four quiz rules in section 5.5).
- **One mind map, three to five branches**, two or three sub-branches each (the maker allows 10 branches of 8 but P3 maps stay small; a list chapter groups its items, for example the seven materials by source).
- **Hedge words stay**, but explain them once in kid words: "most means more than half, but not all of them".
- **No numbers on stages, no stage called "first".** Life cycles and day-and-night are loops; say "let's start our loop at the seed", never "the first stage".
- **One episode, three goals, no fourth idea.** Enrichment that is not a goal (Linnaeus's two-word names, Fleming and penicillin, the herbarium, the magnetic field, the virus question) goes in the video description, not the video.
- **Characters:** do not reuse the textbook's cast names (Ali, Belle, Chen, Devi, Mr Bala, Mrs Lim). Use "a girl in class", "your friend", "you".
- **Safety line and "Ask an adult" badge.** Any try-it involving heat, flames or sharp tools carries an on-screen "Ask an adult" badge and a spoken safety line (P4 rule, still in force). P3 cases: the electromagnet (battery only, not too long, never the mains), mould ("never touch or sniff real mould"), torches ("never shine a torch into anyone's eyes"), real yards ("look at small animals without picking them up; wash your hands"), the mimosa ("touch just one leaf with one finger; the stem has tiny prickles") and **magnets** ("keep small magnets away from your mouth and from little brothers and sisters"; badge on every home try-it with magnets: EP 19, 20, 22 and the EP 25 `toy` beat). Home tries must give the result the video shows: stroke with one pole of a bar magnet (never a flat fridge magnet), test iron nails, steel clips and aluminium foil (never a coin), use bar or round whiteboard magnets to feel repulsion.

## 8. On-screen conventions (unchanged from P4, kit-built)

- Bright, colourful, kid-friendly look: a new background colour per scene, rounded Fredoka font, cartoon outlines, bouncy pop-ins, confetti bursts on "aha" moments (config `bursts`). 1920 × 1080, 60 fps.
- **Keywords:** when a key term is first spoken, a "⭐ LABEL" pill pops at the bottom centre (pop sound), then flies to the **⭐ KEY WORDS** shelf top right (whoosh) and stays for the episode. Up to 14 per episode (P3: aim for 6–10). Labels are terms, not abbreviations; add a `short` shelf label only when the full label would not fit.
- Word-by-word captions in a dark pill below the keyword box, chunks of up to 5 words, broken after `, . ? !`. "The One App" is shown as "TheOneApp".
- The episode tag "🔍 TheOneApp, Explained - <topic>" sits top left, sized to its text.
- **Exam corner:** a dark chalkboard panel with green ✓ lines; wrong statements get a red ✗ at the start.
- Temperatures (rare in P3) are °C first with °F small underneath.

## 9. Text layout rules (checked on every video)

- **Text never spills out of its box.** Every pill, chip, keyword box and caption bar is sized from the measured width of its text once the font has loaded. Emoji count toward the width. Fixed-width boxes shrink the text to fit.
- **Text never overlaps visuals or other text.** Labels sit beside the drawing with a plain pointer line.
- **Reserved zones:** nothing important in the caption band (y > 950), the ⭐ KEY WORDS shelf (x > 1480) or the episode tag (top left). Keep content inside x 50..1480, y 100..950; stage centre is x = 760. Avoid the bottom centre for about 2.5 s after a key-word cue.
- The kit's `check_page.js` (run by `prep_p3.py` every 0.1 s before TTS and again after) catches only script errors and missing cues; it is **not** a layout check. **After prep, run the P4 layout audit read-only on the P3 page:** `node S/audit.js R/epN/epNb.html R/epN/audit.json` (the kit template uses the same ids: `#v`, `#scenes`, `#caps`, `#kwFly`, `#tag`, `#shelf`). It steps through the episode every 0.25 s and flags text out of its box, off screen, under the captions or keyword shelf, or overlapping other text. **Fix every flag that lasts 0.5 s or more, then check the fixed frames by eye** (`W/snap.js`, `R/epN/stills.sh`). (Or ask the kit owner to add this step to `prep_p3.py`.)

## 10. Drawing quality and realism (P3 additions in bold)

- Things that are one object in real life look connected on screen: stems grow out of roots, leaves sit on stalks attached to the stem, side roots branch out of main roots, **wings and six legs attach to an insect's thorax, feelers to its head**.
- Rows of repeated parts touch each other with no stray gaps unless the gap is the point (**ring magnets floating with a gap IS the point**).
- Objects look and behave as in real life: tools point at what they act on (**a torch's lens faces along its beam; a spout faces its stream; a bar magnet's pole faces the nail it strokes**), moving things face the way they move, water and other clear liquids are blue or clear (never brown unless the script says so: EP 10's kopi is brown because the script says so), organs pink, red or dark maroon (never purple), blood red, bones off-white, a container being filled is open, liquid surfaces stay level, shadows fall away from the light (but shadows are P4 content, so none are drawn in the P3 transparency episode), the heavier pan goes down, **insects have 6 legs and 3 body parts, spiders 8 legs, frogs 4 legs with webbed hind feet, tadpoles a tail and no legs at first, caterpillars 3 pairs of true legs plus prolegs, a butterfly pupa appears when the caterpillar's skin splits (no silk wrapping), a cockroach's eggs are in an egg case, mushrooms have gills under the cap, a ship's hull sits partly below the waterline, a sinking spoon rests on the bottom, magnet poles are red (N) and blue (S) with white letters, a compass needle's red end points North, a hanging magnet is tied at its middle and hangs level, an electromagnet's wire is coiled in neat turns round the nail with both ends on the battery's two terminals, steel clips hang from a magnet's poles (not its middle), a maglev train floats with a visible gap above its track, a floating toy globe is drawn with the book's reason only ("interactions between magnets"), no pole labels or push arrows**.
- Diagram labels: one plain line each, no arrowheads, no numbered markers (section 6.2).
- Heat (rare in P3): wiggly arrows pointing outward in all directions; heat flowing from one thing into another is drawn as the same wiggly arrows pointing along the flow; flame emojis only for real fires and stoves (the kiln).
- **Life-cycle loops:** stages placed round a circle, joined by curved arrows in one direction, labelled by name (egg, young, adult / egg, larva, pupa, adult / seed, young plant, adult plant), never numbered.
- **Magnets:** pull shown as two arrows pointing toward each other between unlike poles, push as two arrows pointing away between like poles; iron-powder field patterns are not drawn in P3 (the magnetic field is not one of the goals).
- **Time passing** (a plant straightening after watering, a mimosa reopening) is shown with a clock-face card ("A few hours later…"), not an instant change and not a countdown timer.

## 11. Two audiences, one video

- **Singapore anchors:** see section 7. Use the book's own Singapore items where they exist (seed bank, butterfly conservation, dengue and NEA, Tree Planting Day, tempeh).
- **US bridges:** "Grade 3", backyard, robin, school cafeteria, science fair, monarch butterfly and milkweed, bullfrog, alligator in Florida, national-park hiking with a compass, a pizza dough rising (yeast), a child in New York on the other side of the Earth.
- **One of each per episode, spoken inside a named beat** (the brief's "Singapore anchor + US bridge" section says which beat carries each); extra anchors and bridges go in the description. Scripts are written from the beat table, so an anchor that lives only in the side notes is lost.

## 12. Kit conventions the scripts must follow (`R/kit/README.md`)

- Three authored files per episode: `R/plan/epNN_segments.json`, `R/plan/epNN.json`, `R/epN/scenes_epN.js`.
- Segments: first id `hook`; no `welcome`/`bye` (kit adds them); `quiz1` immediately followed by `quiz2` in the same scene; `habit2` in scene `mindmap` and it says "save" and "tap"; segments of a scene are consecutive; ids lowercase `[a-z][a-z0-9_]*`.
- Config: `topic` (the tag), `icon`, 3 `goals`, `kw` (1–14), optional `short`, `bursts`, `lab` (or `null` when no lab fits), `mm` (phone shot path + boxes; P3 shots live in their own folder, never `W/mm/`), `end` lines, `output`, `pron` for one-off words (cicak).
- **Cue words are the spoken token lowercased with everything but a–z and `'` removed** (`build_tl.py` `cue_table`): "non-living" → `nonliving`, "cold-blooded" → `coldblooded`, "jelly-like" → `jellylike`, "North–South!" → `northsouth`, "Let's" → `let's`. Write every `kw`, `bursts` and `lab` cue word in that stripped form, or `prep_p3.py` stops with a missing cue. `word#2` cues the second time a word is spoken.
- The School Lab card text is `School Lab › <code>  <title>` / `Part (x): <part title>`; the spoken code uses words ("three point two"); letters are spoken ("two point one A").
- Scene code: `s.run(t)` is a pure function of `t`; use `C(seg, word)` cues; keep y > 950 clear; no own countdown timer; `S.mindmap` uses `mmPhone()`.
- **Scripts (`epNN_script.md`) keep P4's `[ON SCREEN @ "word": …]` convention:** every beat's visual is tied to a spoken cue word, named in the bracket, so the scene code and the brief's `[ON SCREEN]` column agree.

## 13. Pre-render checklist (P3)

1. Every definition line matches `definitions.md` word for word; word boxes show the full wording.
2. Hedge words present where the book has them.
3. No numbered stages, no stage called "first", no arrowheads on label lines, no strikeout, ✗ only at the start of wrong (and actually false) lines.
4. Positive language sweep (section 2) over narration, screen text, title, thumbnail, description.
5. Key words: full names; every named skill included; cue words in stripped form.
6. Three goals, welcome, Think! countdown (quiz passes the four rules in 5.5), lab card + spoken line, mind map with app steps and chapter pick, one offline ask, goodbye.
7. Realism sweep (section 10) on every drawing.
8. Layout audit (`S/audit.js`, section 9) clean: every flag of 0.5 s or more fixed, then the fixed frames checked by eye.
9. Safety badge where needed (section 7), including every home try-it with magnets.
10. The lab named on the card is signed off (status `ready`) before the video goes public, **and the linked lab does not contradict the video** (no numbered life-cycle stages, no "first / last" platform, no "seedling" or "young" where the video says "young plant" or "larva" without a note). The Life Cycles poster's main idea must match the book (section 4a of `app_p3.md`) before EP 14–18 go public.
11. Tail length: exam + habit1 + habit2 ≤ 120 spoken words; hook ≤ 35 words; whole episode ≤ 580 authored words.
12. One Singapore anchor and one US bridge spoken in a named beat.
