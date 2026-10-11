"""Step 2: header, summary tables (monograph column), checklists and the monograph section."""
import sys
src, out = sys.argv[1], sys.argv[2]
t = open(src, encoding='utf-8').read()

def rep(a, b, count=1):
    global t
    n = t.count(a)
    assert n == count, (n, a[:70])
    t = t.replace(a, b)

# ---- header ----
rep("Source: `P3 Science Textbook.pdf` (Inspiring Science Primary 3, MOE CPDD / Marshall Cavendish, 2023; Drive id 1rqAhBU29SUCwBbgCVZGkUwUfCfr44ZbI), read in full on 11 Oct 2026.",
    "Source: `P3 Science Textbook.pdf` (Inspiring Science Primary 3, MOE CPDD / Marshall Cavendish, 2023; Drive id 1rqAhBU29SUCwBbgCVZGkUwUfCfr44ZbI), read in full on 11 Oct 2026 and re-read in full for an independent check the same day (see **Verification log** in `content_map.md`).\n\n"
    "Cross-check source: *Curricular Resource Integration and Innovation for Singapore Primary Science* (MOE and NIE, 2025), the *2025 Primary Science Monograph (Essential Reading)* (Drive id 17OzDgiPCrOGfh8fOXyrO2RlzScH922Fo), read in full on 11 Oct 2026. It is a teaching monograph (syllabus frameworks plus nine classroom stories from P3 and P4), **not a glossary**: it states the theme essential takeaways and key inquiry questions word for word, and a few P3 ideas in passing. Monograph pages are its printed page numbers.")
rep("- The ⚠ notes flag wording that is inconsistent in the book or that needs care (see also **Accuracy flags** in `content_map.md`).",
    "- The ⚠ notes flag wording that is inconsistent in the book or that needs care (see also **Accuracy flags** in `content_map.md`).\n"
    "- The last column, **Monograph wording / note**, gives the monograph's wording where it states the same idea (✓ = agrees, ⚠ CONFLICT = disagrees or differs in scope). A dash (—) means the monograph does not state that idea, so the textbook wording stands on its own. Monograph wording is always set in guillemets, like «There are repeated patterns of change around us.», so it is never mixed up with textbook wording.\n"
    "- Rows with a letter suffix (for example 2.27a) were added by the independent check; the original row numbers are unchanged.")
rep("- Every double-quoted string in this file is book text, and every one was machine-checked against the extracted book text (ignoring line breaks, curly/straight quotes, dash types and the book's own typos, which are marked [sic]).",
    "- Every double-quoted string in this file is book text, and every one was machine-checked against the extracted book text (ignoring line breaks, curly/straight quotes, dash types and the book's own typos, which are marked [sic]). Every guillemet-quoted string was machine-checked against the monograph text in the same way, except two that run across the monograph's two-column layout on p. 13 (checked by eye).")

# ---- characteristics checklist ----
rep("**Characteristics of living things (P3 checklist):** need water, food and air (1.14); grow, respond to changes and reproduce (1.25). Concept map p. 44: living things \"need\" water, food, air; \"can\" grow, respond to changes, reproduce.",
    "**Characteristics of living things (P3 checklist, book order):** need water, food and air (1.14); grow, respond to changes and reproduce (1.25). Concept map p. 44: living things \"need\" water, food, air; \"can\" grow, respond to changes, reproduce. The book teaches them in this order: water (p. 9), food (p. 11), air (p. 13), grow (p. 14), respond to changes (p. 15), reproduce (p. 16). It does not add *move*, *excrete* or *die* to the P3 list.")

# ---- classification criteria ----
rep("- **Animal groups:** outer covering, number of legs, body parts, how it breathes, where it lives, how it reproduces (eggs or young born alive), body temperature (cold-blooded reptiles, warm-blooded mammals).",
    "- **Where animals live (p. 23):** only on land, only in water, or both on land and in water (2.9a).\n"
    "- **Animal groups:** outer covering, number of legs, body parts, how it breathes, where it lives, how it reproduces (eggs or young born alive), body temperature (cold-blooded reptiles, warm-blooded mammals). The book's order of the six groups is amphibians, birds, fish, insects, reptiles, mammals (alphabetical; same on the p. 24 tree and the p. 44 concept map).\n"
    "- **Hedge words are part of the definition:** *usually*, *most* and *some* mark real exceptions (ostrich and penguin cannot fly; guppy gives birth; mudskipper lives on land; snakes have no legs; the platypus, named in the monograph, is a mammal that lays eggs). Never drop them.")

# ---- animal-group table: add monograph column ----
rep("| Group | Outer covering | Breathes through | Young | Other features in the book |\n|---|---|---|---|---|",
    "| Group | Outer covering | Breathes through | Young | Other features in the book | Monograph wording / note |\n|---|---|---|---|---|---|")
for g, note in [("Amphibians", "—"), ("Birds", "—"), ("Fish", "—"), ("Insects", "—"), ("Reptiles", "—"),
                ("Mammals", "C7 (p. 55): mammals «give birth to their young alive, have hair, and are warm-blooded»; the platypus is the exception that lays eggs. ✓ Matches *most*.")]:
    i = t.index("| " + g + " | ", t.index("| Group | Outer covering"))
    j = t.index("\n", i)
    t = t[:j] + " " + note + " |" + t[j:]

# ---- materials table ----
rep("| Material | Properties the book gives it | Pages |\n|---|---|---|",
    "| Material | Properties the book gives it | Pages | Monograph wording / note |\n|---|---|---|---|")
for m in ["Metal", "Glass", "Plastic", "Rubber", "Wood", "Ceramic", "Fabric"]:
    i = t.index("| " + m + " | ", t.index("| Material | Properties the book"))
    j = t.index("\n", i)
    t = t[:j] + " — |" + t[j:]
rep("| Glass | fragile, breaks easily when dropped; transparent; waterproof |",
    "| Glass | fragile, breaks easily when dropped; transparent; waterproof; \"Glass is not as strong as plastic or metal.\" |")
rep("| Metal | strong; rigid (trolley); waterproof; opaque; most metals sink; least flexible of rubber/plastic/metal tubes |",
    "| Metal | strong; rigid (trolley); waterproof; opaque, \"metal is not transparent\"; most metals sink; least flexible of rubber/plastic/metal tubes |")
rep("| Fabric | absorbs water, not waterproof (can be waxed); flexible (curtains, car seats); some are opaque |",
    "| Fabric | absorbs water, not waterproof (can be waxed); flexible (curtains, car seats); some are opaque; a fabric bag does not break under heavy books (p. 53) |")
rep("| Fabric | absorbs water, not waterproof (can be waxed); flexible (curtains, car seats); some are opaque; a fabric bag does not break under heavy books (p. 53) | 57, 60, 64 |",
    "| Fabric | absorbs water, not waterproof (can be waxed); flexible (curtains, car seats); some are opaque; a fabric bag does not break under heavy books (p. 53) | 53, 57, 60, 64 |")

# ---- life-cycle table ----
rep("| Living thing | Stages | Name of the young | Young looks like adult? | Page |\n|---|---|---|---|---|",
    "| Living thing | Stages | Name of the young | Young looks like adult? | Page | Monograph wording / note |\n|---|---|---|---|---|---|")
lc_notes = {"Flowering plant": "—", "Chicken": "C3 (p. 32): compared in class (3-stage). ✓", "Frog": "C3 (p. 32): compared in class (3-stage). ✓",
            "Grasshopper": "—", "Cockroach": "C3 (p. 32): compared in class (3-stage). ✓", "Mealworm beetle": "C3 (pp. 31–33): live mealworms kept in class; the larva is role-played wiggling. ✓",
            "Butterfly": "C3 (p. 31): caterpillar turning into a butterfly shown by video. ✓", "Mosquito": "—"}
for k, v in lc_notes.items():
    i = t.index("| " + k, t.index("| Living thing | Stages"))
    j = t.index("\n", i)
    t = t[:j] + " " + v + " |" + t[j:]
rep("Concept map (p. 98): flowering plants 3 stages (seed, young, adult); animals 3 stages (egg, young, adult) or 4 stages (egg, larva, pupa, adult).",
    "Concept map (p. 98): flowering plants 3 stages (seed, young, adult); animals 3 stages (egg, young, adult) or 4 stages (egg, larva, pupa, adult).\n\n"
    "Order of the animals in the book: chicken, frog, grasshopper, cockroach (three stages, pp. 82–85), then mealworm beetle, butterfly, mosquito (four stages, pp. 86–88). Stage order inside each cycle, as the book lists it: egg, young, adult / egg, larva, pupa, adult (p. 89). Draw the stages round a loop with arrows and no stage numbers (5.16).")

# ---- magnet checklist ----
rep("- A magnet is usually made of iron or steel (6.2). Shapes: bar, U-shaped, horseshoe, button, rod, ring.",
    "- A magnet is usually made of iron or steel (6.2). Shapes in the book's order: bar, U-shaped, button, rod, ring, horseshoe.")
rep("- Unlike poles attract; like poles repel (6.14). Only a magnet can repel a magnet, so repulsion proves an object is a magnet (6.13).",
    "- Unlike poles attract; like poles repel (6.14). Only a magnet can repel a magnet, so repulsion proves an object is a magnet (6.13). The monograph lists the two matching alternative conceptions: «all magnetic materials are magnets» and «objects are magnets if they can be attracted» (C4, p. 35).")

# ---- skills table ----
rep("| Skill | What the book says it is (exact where given) | Page |\n|---|---|---|",
    "| Skill | What the book says it is (exact where given) | Page | Monograph wording / note |\n|---|---|---|---|")
skills = [
 ("| Classifying |", "Table 1 (p. 6): «We classify living and non-living things based on their similarities and differences.» ⚠ The book's p. 5 line has similarities only."),
 ("| Classifying and Comparing |", "⚠ CONFLICT: the monograph's comparing tasks always ask for «similarities and differences» (C3 p. 31; Table 4 p. 19). See 2.4."),
 ("| Comparing (materials) |", "C2 (p. 26): «By emphasising the skills of comparison, students were introduced to objects with similar functions but made of different materials.» ✓"),
 ("| Observing |", "C2 (p. 27): «use their five senses to make observations and classifications». ✓"),
 ("| Comparing (life cycles) |", "C3 (p. 31): «compare the similarities and differences between the young and adult animals of different life cycles». ✓"),
 ("| Designing investigations |", "C5 (pp. 43–44, P4): only one variable changed, all others kept the same, so the results are due to the changed variable. ✓"),
]
for key, note in skills:
    i = t.index(key, t.index("| Skill | What the book says"))
    j = t.index("\n", i) if "\n" in t[i:] else len(t)
    t = t[:j] + " " + note + " |" + t[j:]
rep("| Comparing (life cycles) | \"Observable characteristics include the number of stages and the physical features of the animals.\" | 90 |",
    "| Comparing (life cycles) | \"When we compare, we can use observable characteristics to identify similarities and differences between the life cycles of the animals. Observable characteristics include the number of stages and the physical features of the animals.\" | 90 |")

# ---- monograph section ----
t = t.rstrip('\n') + "\n\n---\n\n" + open(sys.argv[3], encoding='utf-8').read().rstrip('\n') + "\n"
open(out, 'w', encoding='utf-8').write(t)
print('ok')
