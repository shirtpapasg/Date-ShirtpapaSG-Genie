"""Apply verification fixes to P3 content_map.md: python3 -I fix_map.py IN OUT LOGFILE"""
import sys
src, out, logf = sys.argv[1], sys.argv[2], sys.argv[3]
t = open(src, encoding='utf-8').read()

def rep(a, b):
    global t
    n = t.count(a)
    assert n == 1, (n, a[:80])
    t = t.replace(a, b)

# 1. bold note
rep("The extraction kept bold formatting only for headings and a handful of inline words (\"reptiles\" p. 31, \"fair test\" and \"variable\" p. 118, the theme names). The key-term lists below are therefore built from the terms the book defines, puts in section headings or uses in its summaries.",
    "The extraction kept bold formatting only for headings and a handful of inline words (\"reptiles\" p. 31, \"fair test\" and \"variable\" p. 118, the theme names) plus the diagram labels head, thorax and abdomen (p. 30). The book's coloured key-term highlighting inside sentences did not survive the extraction, and the PDF itself cannot be fetched for a font check (the Drive connector refuses files over 10 MB). The key-term lists below are therefore built from the terms the book defines, puts in section headings or uses in its summaries; the full list of bold section headings is under **Section headings in book order** below.")

# 2. features sample pages
rep("(Fleming p. 38, mosquito p. 88, dengue p. 89, Let's Apply p. 40, magnets pp. 100 and 104, strength p. 53).",
    "(Fleming p. 38, mosquito p. 88, dengue p. 89, Let's Apply p. 40, Interactions theme opener p. 99, magnets pp. 100 and 104, strength p. 53).")

# 3. back-matter row
rep("| — | Acknowledgements (photo credits), blank page, back cover | — | 127–130 (PDF 135–140) |",
    "| — | Acknowledgements (photo credits) 127–130, blank page 131, back cover 132 | — | 127–132 (PDF 135–140) |")

# 4. syllabus topic names + section headings + feature index after "no glossary" line
rep("The book has no glossary and no index. The P3 book has three themes (Diversity, Cycles, Interactions); Systems and Energy are P4.",
    "The book has no glossary and no index. The P3 book has three themes (Diversity, Cycles, Interactions); Systems and Energy are P4.\n\n"
    "**MOE syllabus topic names (2025 monograph, Table 2, p. 7):** Diversity of living and non-living things (General characteristics and classification) = Chapters 1 and 2; Diversity of materials = Chapter 3; Cycles in plants and animals (Life cycles) = Chapters 4 and 5; Interaction of forces (Magnets) = Chapters 6 and 7. The book's p. 16 Let's Connect uses the syllabus name Cycles in Plants and Animals (Life Cycles); its concept maps use shorter topic names (pp. 44, 98, 126).\n\n"
    "### Section headings in book order (bold headings, checked page by page)\n"
    "- **Ch 1:** What can we observe around us? (p. 5) · How do we classify things? (p. 5) · What do living things need? (p. 9): Living things need water (pp. 9–10), Living things need food (p. 11), Living things need air (p. 13) · What can living things do? (p. 14): Living things can grow (p. 14), Living things can respond to changes (p. 15), Living things can reproduce (p. 16) · What I Have Learnt (p. 18).\n"
    "- **Ch 2:** What are the similarities and differences between plants and animals? (p. 20): Plants (p. 21), Animals (p. 23), Amphibians (p. 25), Birds (p. 26), Fish (p. 27), Insects (p. 29), Reptiles (p. 31), Mammals (p. 32) · What other groups of living things are there? (p. 34): Fungi (p. 34), Bacteria (p. 36) · Let's Apply (pp. 40–42) · What I Have Learnt (p. 43) · concept map (p. 44).\n"
    "- **Ch 3:** What are the different types of materials around us? (p. 46): Wood (p. 46), Metal (p. 47), Ceramic (p. 48), Rubber (p. 49), Glass (p. 50), Plastic (p. 51), Fabric (p. 52) · What are the physical properties of materials? (p. 53): Strength (p. 53) with Materials have different strengths (p. 54), Flexibility (p. 55) with Materials have different flexibility (p. 55), Ability to float or sink in water (p. 56), Waterproof (p. 57), Transparency (p. 58) · How are materials with different properties used? (p. 59): Materials with different properties are used for different purposes (p. 60), The same object can be made from different materials (p. 63), Many materials may be used to make an object (p. 64), The design process (p. 66) · Let's Apply (pp. 67–69) · What I Have Learnt and concept map (p. 70).\n"
    "- **Theme Closure (pp. 71–72):** Design my zoo!\n"
    "- **Ch 4:** What is a life cycle? (p. 75) · What are the stages in the life cycle of a plant? (p. 76) · What I Have Learnt (p. 79).\n"
    "- **Ch 5:** What are the stages in the life cycles of different animals? (p. 81): Life cycle of a chicken (p. 82), a frog (p. 83), a grasshopper (p. 84), a cockroach (p. 85), a mealworm beetle (p. 86), a butterfly (p. 87), a mosquito (p. 88); key idea box (p. 89) · How are the life cycles of animals similar or different? (p. 90) · day-and-night story (p. 93) · Let's Apply (pp. 94–96) · What I Have Learnt (p. 97) · concept map (p. 98).\n"
    "- **Ch 6:** What is a magnet? (p. 102): Magnetic and non-magnetic materials (p. 102) · Which parts of a magnet have the strongest pull? (p. 105) · How do magnets interact with one another? (p. 107) · What direction does a freely suspended magnet point in? (p. 110) · What I Have Learnt (p. 112).\n"
    "- **Ch 7:** How can we make a magnet? (p. 114): The stroke method (p. 114), The electrical method (p. 115), How do we increase the strength of an electromagnet? (p. 116, plain text) · How do we conduct a fair test? (p. 118) · How are magnets used in our everyday life? (p. 119) · Let's Apply (pp. 123–124) · What I Have Learnt (p. 125) · concept map (p. 126).\n\n"
    "### Feature index (book pages)\n"
    "- **Let's Think and Do (6):** pp. 5, 20, 53, 76, 90, 118.\n"
    "- **Let's Explore (16):** pp. 7, 8, 11, 14, 29, 36, 39, 59, 61, 63, 65, 79, 89, 103, 109, 114.\n"
    "- **Science Around Us (26):** pp. 10, 12, 13, 15, 17, 20, 25, 27, 28, 30, 31, 32, 35, 46, 50, 52, 54, 56, 57, 83, 84, 87, 88, 101, 108, 120.\n"
    "- **I'm Inspired (6):** pp. 33 (Goodall), 38 (Fleming), 49 (Goodyear), 78 (Herbarium), 92 (Merian), 121 (Faraday).\n"
    "- **Let's Connect (3):** pp. 16, 77, 104. **Let's Apply (4):** pp. 40, 67, 94, 123.\n"
    "- **Let's Inquire (AB activities):** 1.1 p. 7, 1.2 p. 9, 1.3 p. 17; 2.1A p. 21, 2.1B p. 32, 2.2 p. 34, 2.3 p. 39; 3.1 p. 46, 3.2 p. 53, 3.3 p. 55, 3.4 p. 56, 3.5 p. 57, 3.6 p. 58, 3.7 p. 60, 3.8 p. 66; 4.1 p. 75, 4.2 p. 76; 5.1 p. 81, 5.2 p. 91; 6.1A p. 102, 6.1B p. 104, 6.2 p. 105, 6.3A–B p. 108, 6.3C p. 109, 6.4 p. 111; 7.1A p. 114, 7.1B p. 115, 7.2 p. 122. Named SLS lessons appear on pp. 9, 17, 32, 34, 39, 52, 58, 76, 81, 102, 108, 111, 114, 115; the Theme Closure (p. 72) has an SLS link too.")

# 5. Diversity theme opener: monograph takeaways
rep("- **Key inquiry questions (paraphrased):**\n  - D1: What can we see around us?",
    "- **MOE essential takeaways for the theme (monograph Table 1, not printed in the book):** there is a great variety of living and non-living things around us; we classify them by their similarities and differences; keeping that diversity matters for survival. The book's own opener line asks pupils to observe their surroundings and appreciate the diversity of living and non-living things (p. 2).\n"
    "- **Key inquiry questions (paraphrased; the monograph's Table 1 has the same three, word for word):**\n  - D1: What can we see around us?")

# 6. Ch 1 classification wordings
rep("(Three slightly different wordings appear in the book: p. 3, p. 5, and pp. 20/43. See `definitions.md`; use the p. 43 summary wording in scripts.)",
    "(Four wordings appear in the book: p. 3 (similar characteristics), p. 5 (similarities), p. 20 (living things, similarities and differences) and p. 43 (things, similarities and differences). See `definitions.md`; use the p. 43 summary wording in scripts. The MOE monograph's theme takeaway also says similarities and differences.)")

# 7. Ch 1 plants respond
rep("- Responding to changes protects living things (eyelids, mimosa); plants respond too, just more slowly (growing towards light).",
    "- Responding to changes protects living things (eyelids, mimosa); plants respond too (a plant grows towards light; the mimosa folds its leaves within moments of a touch and reopens them after a few minutes). Do not teach that plants always respond slowly.")

# 8. Ch 2 insect examples
rep("Most lay many tiny, easily destroyed eggs so that some hatch (a cockroach laying eggs). Examples: cricket, grasshopper, mosquito, ant.",
    "Most lay many tiny, easily destroyed eggs so that some hatch (a cockroach laying eggs). Examples pictured: cricket, grasshopper, mosquito (the ant appears in the p. 29 Let's Explore).")

# 9. Ch 2 Goodall prompt is not a Let's Explore
rep("- **Let's Explore (p. 33):** find out more about Jane Goodall and Sir David Attenborough.",
    "- **I'm Inspired prompt (p. 33, not a Let's Explore box):** find out more about Jane Goodall and Sir David Attenborough.")

# 10. Ch 2 misconceptions additions
rep("- **Classification wording:** use \"grouping things based on their similarities and differences\" (p. 43).",
    "- **Classification wording:** use \"grouping things based on their similarities and differences\" (p. 43).\n"
    "- **Grass is a flowering plant** (MOE monograph, C7): its flowers are usually mown off, so pupils often call it non-flowering.\n"
    "- **Fungi are not all microscopic.** The monograph (C1) groups bacteria and fungi as microscopic, but the book's fungi include mushrooms and bread mould that you can see. Say bacteria need a microscope; mushrooms do not.\n"
    "- **Microbes are not only germs** (monograph C1: children link microbes with disease and draw them as tiny animals). Show the book's useful examples (yoghurt bacteria, yeast, tempeh, edible mushrooms) and the real shapes of bacteria (rod, sphere, spiral).\n"
    "- **Keep the hedge words** (*usually*, *most*, *some*): the book's groups have real exceptions (ostrich and penguin, guppy, mudskipper, snakes), and the monograph adds the platypus, a mammal that lays eggs.")

# 11. Ch 3 design process order flag
rep("Steps: think about what the object is for; list the parts needed; decide the intended use of each part; draw the design; choose materials whose properties suit each part. Task: design a school bag.",
    "Steps: think about what the object is for; list the parts needed; decide the intended use of each part; draw the design; choose materials whose properties suit each part. Task: design a school bag. (The text extraction prints *Draw the design of the object* between the parts step and the intended-use step, so the drawing step's place in the printed flow is not certain; do not number the steps on screen until the printed page is checked.)")

# 12. Ch 3 misconceptions: monograph notes
rep("- **Same object, different materials; one object, many materials.**",
    "- **Same object, different materials; one object, many materials.**\n"
    "- **Hard and soft are everyday words, not P3 properties.** The monograph's materials lesson (C2) collects words like hard and soft under *property*; keep the exam list to the book's five.\n"
    "- **Fair comparisons of materials** use objects of the same size (the SPARKLE kit's same-size objects teach the nature of a fair investigation, monograph Section B); the Let's Apply Q2 strips are the same thickness and length for the same reason.")

# 13. Cycles opener KIQ note
rep("  - C3: Why do cycles matter for life?\n- Hook question: why is it useful to understand cycles?",
    "  - C3: Why do cycles matter for life?\n- The monograph's Table 1 has the same three questions except C1, worded *What makes a cycle?* (book: *What makes up a cycle?*). MOE essential takeaways: there are repeated patterns of change around us; understanding cycles helps us predict events and processes.\n- Hook question: why is it useful to understand cycles?")

# 14. Ch 5 misconceptions: numbering stages
rep("- **No first or last stage** in a cycle; the arrows form a loop.",
    "- **No first or last stage** in a cycle; the arrows form a loop. The MOE monograph (C3) names numbering the stages as a common alternative conception, so never put Stage 1/2/3 numbers on a life-cycle diagram; label each stage by name and join them with arrows.")
rep("- A natural classroom/home observation is the mealworm (commonly kept in schools) and the butterfly on a host plant, matching the photos (no explicit rearing instructions in the book).",
    "- A natural classroom/home observation is the mealworm (commonly kept in schools; the monograph's C3 class kept live mealworms and role-played each stage) and the butterfly on a host plant, matching the photos (no explicit rearing instructions in the book).")

# 15. Interactions opener note
rep("  - I2: How do magnets' interactions affect our daily lives?",
    "  - I2: How do magnets' interactions affect our daily lives?\n- The monograph's Table 1 gives the theme-level questions for P3 to P6 (types of interactions; how interactions affect the environment and us; why conserve the environment). The P3 book narrows them to magnets. No conflict.")

# 16. Ch 6 magnet shapes order
rep("2. **What a magnet is (p. 102):** an object usually made of **iron or steel**. Shapes: **bar, U-shaped, horseshoe, button, rod, ring**.",
    "2. **What a magnet is (p. 102):** an object usually made of **iron or steel**. Shapes, in the book's order: **bar, U-shaped, button, rod, ring, horseshoe**.")

# 17. Ch 6 misconceptions: monograph alternative conceptions
rep("- **Attraction does not prove an object is a magnet** (a magnet also attracts a plain iron nail). **Repulsion proves it.**",
    "- **Attraction does not prove an object is a magnet** (a magnet also attracts a plain iron nail). **Repulsion proves it.** The MOE monograph (C4) lists the two matching alternative conceptions: all magnetic materials are magnets, and objects are magnets if they can be attracted.\n"
    "- **Say attract, not stick.** Pupils start with \"magnets stick together\"; the monograph's C4 lesson moves them to push/repel and pull/attract, the book's words.")

# 18. Ch 7 fair test monograph note
rep("- **Fair test wording:** change only one variable, keep the others the same, measure one thing; repeat for reliable results.",
    "- **Fair test wording:** change only one variable, keep the others the same, measure one thing; repeat for reliable results. P3 says *prediction* and *variable to be changed / kept the same / measured*; P4 adds *hypothesis* and the names changed, constant and measured variable (monograph C5). Do not bring the P4 names into P3 exam wording.")

# 19. Accuracy flags
rep("2. **Classification** has three wordings (pp. 3, 5, 20/43). Use the fullest: grouping things based on their similarities and differences (p. 43).",
    "2. **Classification** has four wordings (pp. 3, 5, 20, 43). Use the fullest: grouping things based on their similarities and differences (p. 43). The MOE monograph's theme takeaway agrees.")
rep("11. **Plant life-cycle stage names:** seed, young plant, adult plant (not seedling or germination).",
    "11. **Plant life-cycle stage names:** seed, young plant, adult plant (not seedling or germination).\n"
    "12. **Fungi and microscopes:** the MOE monograph calls bacteria and fungi microscopic; the book's fungi include mushrooms and visible bread mould. Never say all fungi are microscopic.\n"
    "13. **No stage numbers on life cycles** (monograph C3 names numbering as an alternative conception; book p. 93 says there is no first or last stage).\n"
    "14. **Design-process flow (p. 66):** the drawing step's position cannot be confirmed from the text; check the printed page before showing numbered steps.\n"
    "15. **Comparing (p. 20 vs p. 90):** p. 90 itself says comparing finds similarities and differences, and so does the monograph. Flag 1 is settled in favour of both.\n"
    "16. **Fragile (p. 54):** used but never defined; safe line: fragile materials break easily when dropped or knocked.")

open(out, 'w', encoding='utf-8').write(t.rstrip('\n') + '\n\n' + open(logf, encoding='utf-8').read().rstrip('\n') + '\n')
print('ok')
