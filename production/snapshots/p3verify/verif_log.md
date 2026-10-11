---

## Verification log

**Independent check, 11 Oct 2026.** Both plan files were treated as wrong until proven right and checked against fresh reads of the two sources.

### Method
- **Textbook:** fetched again from Drive (1rqAhBU29SUCwBbgCVZGkUwUfCfr44ZbI; 139,808 characters, 140 PDF pages; byte-identical to the earlier extraction) and read page by page from cover to back cover, including the features pages, every Let's Apply, every concept map and the acknowledgements.
- **Monograph:** fetched and read in full (17OzDgiPCrOGfh8fOXyrO2RlzScH922Fo; 126,354 characters, printed pp. 1–74). It is a teaching monograph, not a glossary; what it says about P3 is summarised at the end of `definitions.md`.
- **Machine checks on `definitions.md`:** all 332 double-quoted strings are found in the book text (0 missing); every row's page number matches the page where its quote is printed (0 mismatches); 51 of the 53 monograph quotes (in guillemets) are found in the monograph text, and the other 2 run across its two-column layout on p. 13 and were checked by eye; every table row has the right number of cells.
- **Limits:** the extraction keeps bold only for headings, three inline words and the insect labels, so coloured key-term highlighting inside sentences could not be seen; the PDF is too large (47.5 MB) for the Drive connector's 10 MB download limit, so no font check was possible. Instead, every bold heading was listed and checked against both files (see **Section headings in book order**), and every term the book defines or explains was checked against `definitions.md`.

### Confirmed correct (no change needed)
- All 7 chapters, 3 theme openers, the one theme closure and their page ranges; PDF page = book page + 8.
- Characteristics of living things: need water, food and air; grow, respond to changes, reproduce (book order, pp. 9–17).
- Four groups of living things (plants, animals, fungi, bacteria; protists named for later); flowering vs non-flowering; the six animal groups in the book's order (amphibians, birds, fish, insects, reptiles, mammals) and every criterion in the summary table.
- The seven materials in the book's order (wood, metal, ceramic, rubber, glass, plastic, fabric) and the five properties in order (strength, flexibility, float or sink, waterproof, transparency); transparent, translucent and opaque with the book's examples.
- Life-cycle stages and young: plant (seed, young plant, adult plant); chicken, frog, grasshopper, cockroach (egg, young, adult); mealworm beetle, butterfly, mosquito (egg, larva, pupa, adult); chick, tadpole, nymph, caterpillar, wriggler.
- Magnet facts, stroke and electrical methods (steps, safety box, ways to strengthen), the fair-test table, and all section takeaways and What I Have Learnt lists.
- Let's Apply answers that can be read from the text: Ch 2 Q3 option 3 (fungus, bird); Ch 3 Q1 material A; Ch 3 Q3 material C; Ch 5 Q3 option 4 (three stages); Ch 7 Q2(b) the number of turns differs.
- Every one of the 250 original quotes in `definitions.md` was exact.

### Changes to `content_map.md`
1. **Back matter:** acknowledgements are pp. 127–130, then a blank page (131) and the back cover (132); the table had squeezed all of PDF 135–140 into "127–130".
2. **Bold note:** added the bold insect labels (head, thorax, abdomen, p. 30) and why inline bold key terms cannot be checked.
3. **Features page:** added the Interactions theme opener (p. 99) to the sample pages it reuses.
4. **New: MOE syllabus topic names** (monograph Table 2) mapped to the chapters.
5. **New: Section headings in book order** for every chapter, so every section can be ticked off.
6. **New: Feature index** with the page of every Let's Think and Do (6), Let's Explore (16), Science Around Us (26), I'm Inspired (6), Let's Connect (3), Let's Apply (4) and Activity Book link.
7. **Classification wordings:** the book has four, not three (pp. 3, 5, 20, 43); fixed in Chapter 1 and in Accuracy flag 2.
8. **Plants responding:** removed "just more slowly", which is not in the book and is wrong for the mimosa.
9. **Insect examples:** the pictured examples are cricket, grasshopper and mosquito; the ant is in the Let's Explore.
10. **Goodall prompt (p. 33):** it sits in the I'm Inspired box; it is not a Let's Explore.
11. **Magnet shapes:** put in the book's order (bar, U-shaped, button, rod, ring, horseshoe).
12. **Design process (p. 66):** flagged that the drawing step's place in the flow cannot be confirmed from the text.
13. **Monograph cross-checks added** to the theme openers (essential takeaways; the Cycles C1 wording difference; theme-level Interactions questions), Chapter 2 (grass is a flowering plant; fungi are not all microscopic; microbes are not only germs; keep the hedge words), Chapter 3 (hard and soft are not P3 properties; same-size objects make a fair comparison), Chapter 5 (no stage numbers; mealworms in class), Chapter 6 (the two magnet alternative conceptions; say attract, not stick) and Chapter 7 (P3 vs P4 fair-test terms).
14. **Accuracy flags 12–16 added:** fungi and microscopes; no stage numbers; design-process order; comparing settled by p. 90; *fragile* never defined.

### Changes to `definitions.md`
1. **New column "Monograph wording / note"** on every table: the monograph's wording where it states the idea, ✓ for agreement, ⚠ CONFLICT where it disagrees, a dash where it is silent. A closing section, **MOE monograph cross-check**, lists the theme takeaways and questions, the topic names, 6 conflicts or differences and 6 named alternative conceptions.
2. **Wrong cross-references fixed:** D0.1 pointed to "D2.1 or D2.13" and 1.3 to "1.20 / D2.13" (1.20 is the mimosa; D2.13 does not exist). Both now point to 2.1 / 2.33.
3. **27 rows added** (numbered with a letter suffix, or D0.3, 4.0 and 5.0, so the original numbers stay valid), all exact book wording: D0.3 theme aim; 2.9a where animals live; 2.10a animal groups by similarities and differences; 2.16a mudskipper; 2.25a **primatologist** (a term the book defines, previously missing); 2.27a bread mould; 2.28a mushroom spores; 2.29a useful and harmful fungi; 2.30a microscopes; 2.31a harmful and useful bacteria; 2.31b penicillin and antibiotic (with a positive-language swap for "bacteria killer"); 3.13a **fragile** (used but never defined); 3.16a most and least flexible; 3.17a why ships float; 3.18a waterproof materials and wax; C0.3a why day and night happen; 4.0 chapter opener; 4.4a plants' repeated pattern; 5.0 and 5.6a the three-stage and four-stage lead-ins (the second is the key line that the young of four-stage animals do not look like the adult); 5.10a mosquitoes and dengue; 5.17a answer to Save the Butterflies; 6.4a classifying with a magnet; 6.14a spoon compass (with the existing accuracy flag); 7.8a what an experiment does; 7.12a magnets in everyday objects; 7.13a MRI.
4. **Wording added to existing rows:** p. 90's "identify similarities and differences" sentence (5.12, 2.4 and the skills table); the mimosa, eyelid, "most insects live on land", insect-egg, transparency-example, lodestone-compass, poles-attract-most-clips, magnetic-objects, stroke-method step 3 and electrical-method step lines; 5.16's companion sentence.
5. **Corrections to existing rows:** 7.12's heading is "Examples of variables to be kept the same" (it said "Variables to be kept the same"); magnet shapes in the book's order in 6.2 and the checklist; metal and fabric page lists completed; glass "not as strong as plastic or metal" and metal "not transparent" added to the materials table.
6. **Checklists extended:** the book's order of the needs and abilities of living things; habitat as a classification criterion; the six animal groups' order; why the hedge words matter; the order of animals and stages in Chapter 5 and the no-numbers rule for cycle diagrams.

### Still open (needs the printed page)
- Inline key terms highlighted in colour inside sentences (not visible in the extraction).
- The exact flow order of the design process (p. 66).
- Picture-only Let's Apply content: animals A–D (p. 40), animals A and B (p. 41), the bar heights (p. 68), the four plant-cycle arrow diagrams (p. 94) and Belle's magnet set-up (p. 123).
