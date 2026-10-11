"""Apply the verification fixes to P3 definitions.md (run with python3 -I fix_defs.py IN OUT)."""
import re, sys

src, out = sys.argv[1], sys.argv[2]
L = open(src, encoding='utf-8').read().split('\n')

MAIN_HDR = '| # | Term / key idea | Exact textbook wording | Ch | Page | Notes |'
MAIN_SEP = '|---|---|---|---|---|---|'
NONE = '—'

# ---------- monograph column, keyed by row id ----------
T1D = '«We classify living and non-living things based on their similarities and differences.»'
M = {
 'D0.1': f'Table 1 (p. 6), Diversity essential takeaway: {T1D} ⚠ The book\'s p. 3 line says *similar characteristics* only; the monograph backs the fuller wording (2.33).',
 'D0.2': 'Table 1 (p. 6) has the same three questions word for word: «What can we observe around us?» / «How can we classify the great variety of living and non-living things?» / «Why is it important to maintain diversity?» ✓ No conflict.',
 'D0.3': 'Table 1 (p. 6), Diversity essential takeaways: «There is a great variety of living and non-living things around us.» / ' + T1D + ' / «Maintaining the diversity of living and non-living things is important for survival.» The third takeaway (D3) has no matching sentence in the P3 book; it is touched only through the seed bank (p. 79) and Save the Butterflies (pp. 80, 97).',
 '1.1': 'Table 1 (p. 6): «There is a great variety of living and non-living things around us.» ✓ Same as the book\'s first sentence.',
 '1.3': f'Table 1 (p. 6): {T1D} ⚠ The book\'s Ch 1 line leaves out *differences*; the monograph backs 2.1 / 2.33.',
 '1.5': 'Same idea as Table 1 (p. 6) «There is a great variety of living and non-living things around us.» (the takeaway box says *diversity* where Table 1 says *variety*). ✓',
 '2.1': f'Table 1 (p. 6): {T1D} ✓ Agrees.',
 '2.4': 'No definition in the monograph, but every comparing task it describes asks for both: «compare the similarities and differences between the young and adult animals» (C3, p. 31); «Comparing similarities and differences of different plants» (Table 4, p. 19). ⚠ CONFLICT with the book\'s p. 20 wording (similarities only). Follow the monograph and the book\'s own p. 90 sentence (5.12).',
 '2.5': 'C7 (p. 55, a P4 lesson): «Given that variabilities exist in nature, there are exceptions to generalised scientific knowledge.» Keep the book\'s *usually* (the cactus has needle-like leaves and its stem traps sunlight, C7 pp. 55–56). ✓',
 '2.7': 'C7 (p. 58): a teacher explains that grass is a flowering plant whose flowers are usually cut off by grass-cutters, so they are seldom seen. ✓ No conflict; a useful misconception example.',
 '2.22': 'C7 (p. 55): «mammals are groups of organisms that give birth to their young alive, have hair, and are warm-blooded. The platypus is a mammal with exception since they have hair, are warm-blooded but they lay eggs.» ✓ Agrees with the book\'s *Most mammals* (2.23).',
 '2.23': 'See 2.22: the monograph names the platypus (lays eggs) as the exception, which is why the book says *Most*. ✓',
 '2.24': 'C7 (p. 55) lists warm-blooded as a mammal characteristic (no definition given). ✓',
 '2.27': 'C1 (p. 21): «Bacteria and fungi are microscopic organisms that are not visible to our unaided eyes.» ⚠ CONFLICT in scope: the book\'s fungi include mushrooms and bread mould you can see (pp. 34–35), and it never calls fungi microscopic. Script rule: bacteria are too small to see without a microscope; some fungi (yeast cells, mould seen up close) need a microscope, but mushrooms do not.',
 '2.27a': 'See 2.27 (C1, p. 21). A mould patch on bread is visible; only its fine parts need a microscope.',
 '2.30': 'C1 (p. 21): «Bacteria and fungi are microscopic organisms that are not visible to our unaided eyes.» ✓ for bacteria (the book: *tiny*, found once microscopes became more powerful).',
 '2.30a': 'C1 (pp. 21–23): the lesson uses portable microscopes to look at slides of bacteria and fungi. ✓',
 '2.31': 'C1 (p. 21): research shows children often link microbes only with disease and picture them as tiny animals with arms and legs. ✓ The book\'s useful examples (help break down food, yoghurt) answer this.',
 '2.31a': 'See 2.31 (C1, p. 21). ✓',
 '2.31b': 'C1 (p. 22): an SLS video on Fleming and «the discovery of penicillin». ✓',
 '2.33': f'Table 1 (p. 6): {T1D} ✓ Agrees; this is the wording to use.',
 '3.1': 'C2 (p. 26): «objects around us are made of different types of materials that have different properties and functions.» ✓',
 '3.9': 'C2 (p. 26), same key idea as 3.1. ✓',
 '3.10': 'C2 (p. 27): everyday describing words (hard, soft) are gathered under the word *property*; pupils «use their five senses to make observations and classifications». ⚠ Hardness is not one of the book\'s five P3 properties (3.11); use it only as an everyday word.',
 '3.11': 'Section B (p. 13): SPARKLE objects «made of different materials but identical sizes» teach the properties of materials and «the nature of a fair investigation». ✓ (same size keeps the comparison fair)',
 '3.25': 'C2 (p. 26): «The properties of materials afforded their application and use under different conditions.» ✓',
 '3.26': 'C2 (p. 26): «same objects … can be made up of different materials» ✓',
 '3.28': 'C2 (p. 26), same idea as 3.25. ✓',
 'C0.1': 'Table 1 (p. 6), Cycles essential takeaways: «There are repeated patterns of change around us.» / «Understanding cycles helps us to make predictions about events and processes around us.» ✓',
 'C0.3': 'Section B (p. 13): a Young Scientist Badge task asks pupils to «explore the Earth’s rotation to understand the phenomenon of day and night». ✓',
 'C0.4': 'Table 1 (p. 6): «What makes a cycle?» / «How does a cycle help us predict events and processes?» / «Why are cycles important to life?» ⚠ Minor wording difference in C1 (*makes a cycle* vs the book\'s *makes up a cycle*). Use the book\'s wording in P3 episodes.',
 '4.1': 'C3 (p. 31): the lesson goal is to «understand that the life cycles are repeated patterns of change». ✓',
 '4.2': 'C3 (p. 31), as 4.1. ✓',
 '4.3': 'C2 (p. 27): pupils «use their five senses to make observations and classifications». ✓',
 '5.7': 'C3 (pp. 31–33): classes keep live mealworms; pupils role-play «the young (larva) of a mealworm beetle». ✓',
 '5.11': 'C3 (p. 32): the three-stage cycles of the chicken, frog and cockroach are used to compare the young with the adult. ✓',
 '5.12': 'C3 (p. 31): «compare the similarities and differences between the young and adult animals of different life cycles». ✓',
 '5.13': 'C3 (p. 31), as 5.12. ✓',
 '5.14': 'C3 (p. 31), as 5.12. ✓',
 '5.15': 'C3 (p. 31), as 5.12. ✓',
 '5.16': 'C3 (p. 32): «the common alternative conception that the stages of a life cycle can be numbered»; «life cycles are continuous, as such they do not have a start or end point»; the teacher points to «the arrows showing the continuous movement and change from one stage of the life cycle to another». ✓ Strong support. Production rule: never put Stage 1/2/3 numbers on a life-cycle diagram.',
 'I0.1': 'Table 1 (p. 6), Interactions essential takeaway: «There are interactions among us, living and non-living things in the environment.» ✓',
 'I0.2': 'Table 1 (p. 6), theme-level questions for P3–P6: «What are the types of interactions around us?» / «How do interactions affect the environment and us?» / «Why is it important for us to conserve the environment?» The P3 book narrows them to magnets (I1–I2). No conflict.',
 '6.2': 'C4 (pp. 38–41): the SPARKLE kit\'s magnets are bar, ring, rod, U-shaped and button magnets. ✓',
 '6.3': 'C4 (p. 35): alternative conception «all magnetic materials are magnets». ✓ The book keeps magnets and magnetic materials apart.',
 '6.6': 'C4 (p. 39): «poles of magnets» are introduced after pupils notice that some parts of two magnets push, some pull. ✓',
 '6.9': 'C4 (p. 39): pupils move from «magnets sticking to each other» to magnets that «“push” or “repel” as well as “pull” or “attract”». ✓ Use the book\'s words attract (pull) and repel (push); avoid *stick*.',
 '6.13': 'C4 (p. 35): alternative conception «objects are magnets if they can be attracted». ✓ Supports the book: only repulsion proves an object is a magnet.',
 '7.9': 'C5 (p. 43, a P4 lesson): «an investigation was fair when any results collected was due to the changed variable»; (p. 44) «all the variables must be kept the same, with only one variable changed». ✓ P4 calls them constant, changed and measured variables; P3 uses *variable to be changed / kept the same / measured* and *prediction* (no *hypothesis* yet).',
 '7.10': 'C5 (p. 44): «This is to make sure results collected are due to that one changed variable.» ✓',
 '7.12': 'C5 (p. 43): P4 labels «constant variables, changed variable, and measured variable». ✓ Same three roles as the P3 table.',
 '7.13': 'C4 (p. 36): pupils name everyday magnet uses (refrigerator, phone, television); a levitating globe opens the lesson, as on book p. 100. ✓',
 '7.14': 'C4 (p. 39): magnets «“push” or “repel” as well as “pull” or “attract”». ✓',
}

# ---------- new rows (exact book wording; inserted after the given id) ----------
NEW = {
 'D0.2': [('D0.3', 'Theme aim (opener)', '"Let us observe our surroundings and appreciate the diversity of living and non-living things."', 'Theme', '2', 'Opener page text before the key inquiry questions.')],
 '2.9': [('2.9a', 'Where animals live (a grouping criterion)', '"Some animals live only on land, while some live only in water. There are also some animals that can live both on land and in water."', '2', '23', 'Examples: lions (land), fish (water), frogs (land and water).')],
 '2.10': [('2.10a', 'Animal groups are based on similarities and differences', '"Scientists have grouped the diversity of animals around us according to their similarities and differences."', '2', '24', 'Leads into the six animal groups.')],
 '2.16': [('2.16a', 'Mudskipper (exception)', '"Mudskippers are special fish that can live on land as well as in water. When they are in water, they can breathe through their gills. On land, they can breathe through their skin."', '2', '28', 'Use as the exception to *fish usually live only in water* (2.15).')],
 '2.25': [('2.25a', 'Primatologist', '"a scientist who studies animals such as chimpanzees and gorillas"', '2', '33', 'Defined in brackets in the I\'m Inspired box on Jane Goodall.')],
 '2.27': [('2.27a', 'Bread mould', '"Bread mould is a fungus that grows on bread. It produces a substance that breaks down the bread into simpler substances and absorbs them as food."', '2', '34', 'Picture caption that models the fungi definition (2.27).')],
 '2.28': [('2.28a', 'Mushroom spores', '"Mushrooms have spores that are found in gills under the cap. When the wind blows, the spores are dispersed."', '2', '35', 'Labels: cap, stalk, gills ("gills containing spores").')],
 '2.29': [('2.29a', 'Useful and harmful fungi (examples)', '"Edible mushrooms are useful since they are food for us. Yeast is another useful fungus as it is commonly used in baking bread to make the dough rise." / "Bread mould is an example of harmful fungi. Eating mouldy bread can cause us to fall sick."', '2', '35', 'Also: "Tempeh is made with a useful fungus."')],
 '2.30': [('2.30a', 'Microscope and the discovery of bacteria', '"As scientists developed more powerful microscopes, they were able to discover living things that are even smaller than fungi." / "A microscope allows us to see very small things."', '2', '36', 'Shapes on p. 37: "Rod-shaped bacteria", "Sphere-shaped (round) bacteria", "Spiral-shaped bacteria".')],
 '2.31': [
   ('2.31a', 'Harmful and useful bacteria (examples)', '"Bacteria can be harmful when they cause you to fall sick." / "Not all bacteria are harmful. There are some bacteria that are useful to humans. Useful bacteria in our body help us to break down food."', '2', '37', 'p. 37 (harmful, wash hands before eating) and p. 38 (useful; yoghurt and yoghurt drinks).'),
   ('2.31b', 'Penicillin, antibiotic', '"Penicillin is a medicine that is used to treat infections." / "This was the discovery of the world’s first antibiotic or bacteria killer."', '2', '38', '⚠ Positive-language swap for narration: say *a medicine that stops harmful bacteria from growing* rather than *bacteria killer*.'),
 ],
 '3.13': [('3.13a', 'Fragile (used, never defined)', '"Ceramic is fragile, but rubber is not. A ceramic plate breaks easily when dropped or knocked, but a rubber plate does not." / "Glass is fragile, but metal is strong. A glass cup breaks easily when it is dropped, but a metal cup does not."', '3', '54', '⚠ The book uses *fragile* as the opposite of strong but gives no definition. Safe line: fragile materials break easily when dropped or knocked.')],
 '3.16': [('3.16a', 'Most and least flexible', '"Rubber tubes can bend more than plastic tubes without breaking. Plastic tubes can bend more than metal tubes without breaking." / "rubber is the most flexible material, while metal is the least flexible material among the three tubes."', '3', '55', 'Flexibility comes in degrees.')],
 '3.17': [('3.17a', 'Why metal ships float', '"This is because there is a lot of trapped air inside the ship. The trapped air helps the ship to float on water."', '3', '56', 'Science Around Us. Also: "Some materials sink in water, while others float."')],
 '3.18': [('3.18a', 'Waterproof and not waterproof materials', '"Rubber, plastic, glass and metals do not absorb water and do not allow water to pass through them. They are waterproof materials." / "Fabric absorbs water and allows water to pass through it. It is not a waterproof material." / "Fabric absorbs water. However, it can be made waterproof by applying a layer of wax over it."', '3', '57', '')],
 'C0.3': [('C0.3a', 'Why day and night happen', '"When we are on the side of Earth that faces the Sun, it is day time. When we are on the side of Earth that faces away from the Sun, it is nighttime."', 'Theme', '73', 'Book spells "day time" and "nighttime".')],
 '4.0': [],
 '4.4': [('4.4a', 'Plants go through a repeated pattern', '"Plants grow over time. They go through a repeated pattern of change in their life cycles."', '4', '78', 'Introduces the soybean life cycle ("How many stages does the soybean plant have?").')],
 '5.0': [],
 '5.10': [('5.10a', 'Mosquitoes and dengue', '"Most of the mosquitoes do not spread diseases, but some do. For example, Aedes albopictus and Aedes aegypti spread dengue." / "Dengue fever is a disease spread by infected mosquitoes such as Aedes aegypti."', '5', '88', 'Second sentence is p. 89 (Let\'s Explore): "We can reduce the number of mosquitoes breeding by removing their breeding spots in our schools and homes."')],
 '5.17': [('5.17a', 'Answer to the chapter opener', '"When there are not enough plants for butterflies to lay their eggs on, there will be fewer larvae. This will result in fewer pupae and adult butterflies."', '5', '97', 'Speech bubble; answers "Save the Butterflies" (p. 80).')],
 '6.4': [('6.4a', 'Classifying materials with a magnet', '"One of the ways to classify these materials is to observe how they interact with a magnet."', '6', '104', 'Let\'s Connect to Diversity of Materials on the same page.')],
 '6.14': [('6.14a', 'Ancient spoon compass', '"The spoon, which acts as the needle of the compass, is a magnet. The tip of the spoon points to the South."', '6', '110', '⚠ Historically it is the spoon\'s handle that points South. In scripts say the spoon settles pointing North–South; do not name an end.')],
 '7.8': [('7.8a', 'What an experiment does', '"When scientists plan and conduct an experiment, they answer a question or test a prediction."', '7', '118', 'First sentence of "How do we conduct a fair test?"')],
 '7.12': [('7.12a', 'Magnets in everyday objects', '"Strips of magnets can be found inside the doors of a refrigerator. These help to keep the door closed." / "The crane has a large iron disc that becomes a powerful electromagnet. The electromagnet then attracts objects made of iron and steel." / "Some whiteboards have steel sheets under the writing surfaces. These allow magnets to be attracted to the whiteboards." / "The magnet on a doorstop helps to hold the door in place and prevents it from closing suddenly." / "The magnets on the train and the tracks repel one another."', '7', '119–120', 'Maglev continues: the train can "‘float’ above the track". Takeaway box is 7.13.')],
 '7.13': [('7.13a', 'MRI scanner', '"magnetic resonance imaging (MRI) scanner" / "MRI is a safe and painless test."', '7', '120', 'Science Around Us. "a large round magnet with a tunnel in the centre".')],
}
# rows placed BEFORE an id (opener-type key ideas)
BEFORE = {
 '4.1': [('4.0', 'Chapter 4 opener', '"Living things reproduce and have young."', '4', '74', '')],
 '5.1': [
   ('5.0', 'Three-stage life cycles (lead-in)', '"Some animals have three stages in their life cycles. Some of the young animals look like their parents, while some do not."', '5', '82', ''),
 ],
 '5.7': [('5.6a', 'Four-stage life cycles (lead-in)', '"Some animals have four stages in their life cycles. The young of these animals do not look like the adult."', '5', '86', '✅ Key generalisation: in every P3 four-stage cycle the young does not look like the adult.')],
}

# ---------- note fixes on existing rows: (id, old, new) on the Notes cell ----------
NOTE_FIX = [
 ('D0.1', 'Use D2.1 or D2.13 in scripts.', 'Use 2.1 or 2.33 in scripts.'),
 ('1.3', 'The fuller wording is 1.20 / D2.13.', 'The fuller wording is 2.1 / 2.33.'),
 ('1.20', 'Science Around Us.', 'Science Around Us. Continues: "The mimosa plant folds its leaves to protect itself from harm. The leaves will re-open after a few minutes." / "The folding of the leaves is an example of a living thing responding to changes."'),
 ('1.18', '', 'Example: "Shutting our eyelids in bright light prevents too much light from entering our eyes and damaging them."'),
 ('2.4', '⚠ Similarities only, yet all comparing tasks ask for similarities and differences.', '⚠ Similarities only, yet all comparing tasks ask for similarities and differences, and p. 90 says "When we compare, we can use observable characteristics to identify similarities and differences" (5.12). Teach both.'),
 ('2.18', '', 'Also: "Most insects live on land." (p. 29). Bold labels on the p. 30 diagram: head, thorax, abdomen; also "feelers".'),
 ('2.19', 'Wings are not a reliable insect test.', 'Wings are not a reliable insect test. Why so many eggs: "The eggs of insects are usually very small and can be easily destroyed. As such, insects usually lay many eggs at one time so that some will hatch successfully."'),
 ('3.10', '"Different materials have different physical properties. Each material has its own physical properties."', '"Different materials have different physical properties. Each material has its own physical properties." / "You can tell materials apart based on their physical properties."'),
 ('3.20', 'Glass, some plastics.', '"Glass and some plastics are transparent."'),
 ('3.21', 'Frosted glass, some plastics.', '"Frosted glass and some plastics are translucent." / "You cannot clearly see the objects placed behind translucent materials."'),
 ('3.22', 'Rubber, wood, metal.', '"Rubber, wood and metal are opaque materials." / "You cannot see objects placed behind opaque materials."'),
 ('3.29', 'Steps: what the object is for → parts needed → intended use of each part → draw the design → choose materials.', 'Steps (text boxes on the flow): what the object will be used for → the parts needed → the intended use of each part → draw the design → choose materials whose properties suit each part. ⚠ The text extraction cannot confirm where *draw the design* sits in the flow (it is printed between *parts* and *intended use*); check the printed page before showing numbered steps.'),
 ('5.12', 'Let\'s Think and Do: Comparing.', 'Let\'s Think and Do: Comparing. The sentence before it: "When we compare, we can use observable characteristics to identify similarities and differences between the life cycles of the animals." ✅ Use this as the P3 meaning of comparing.'),
 ('5.16', 'Speech bubble (Devi\'s father).', 'Speech bubble (Devi\'s father). Same page: "Animals also go through a repeated pattern of change as they grow over time in their life cycles."'),
 ('6.1', 'Science Around Us (Magnes story).', 'Science Around Us (Magnes story). The lodestone led to "a compass-like tool. This tool always points in the North–South direction of the Earth."'),
 ('6.2', 'Shapes: bar, U-shaped, button, rod, ring, horseshoe.', 'Shapes in the book\'s order: bar, U-shaped, button, rod, ring, horseshoe (printed *Horse-shoe*).'),
 ('6.3', '', '"Magnets can interact with some objects." / "Iron nails and steel pins are attracted to magnets."'),
 ('6.4', 'Caption: "Non-magnetic materials are not attracted to a magnet."', 'Caption: "Non-magnetic materials are not attracted to a magnet." Let\'s Explore: "Did you know that metals can be magnetic or non-magnetic?" Objects shown: cotton towel, aluminium foil, wooden ruler, ceramic bowl, eraser, copper wire, plastic bottle, glass cup.'),
 ('6.7', '', 'Same page: "The poles of the bar magnet attract the most number of clips."'),
 ('7.2', 'Steps: "Stroke the iron nail with one pole of a bar magnet." / "Repeat the strokes in the same direction each time." / "Make sure to stroke the iron nail with the same pole."', 'Steps: "Stroke the iron nail with one pole of a bar magnet." / "Repeat the strokes in the same direction each time." / "Make sure to stroke the iron nail with the same pole." / "Test the magnetised iron nail by placing it near some steel clips. Observe if the iron nail attracts any steel clips."'),
 ('7.4', 'Steps: coil a long piece of wire around an iron nail; connect the ends of the wires to a battery; test near steel clips.', 'Steps: "Coil a long piece of wire around an iron nail." / "Connect the ends of the wires to a battery." / "Test the iron nail by placing it near some steel clips."'),
]
TEXT_FIX = [  # whole-cell text fixes in the wording column
 ('7.12', 'Variables to be kept the same: "Type of batteries"', '"Examples of variables to be kept the same": "Type of batteries"'),
]

def row(cells):
    return '| ' + ' | '.join(cells) + ' |'

def split(ln):
    inner = ln.strip()[1:-1]
    return [c.strip() for c in inner.split(' | ')]

used = set()
outL = []
in_main = False
for ln in L:
    if ln == MAIN_HDR:
        in_main = True
        outL.append(ln + ' Monograph wording / note |'); continue
    if ln == MAIN_SEP and in_main:
        outL.append(ln + '---|'); continue
    if in_main and not ln.startswith('|'):
        in_main = False
    if in_main and ln.startswith('| '):
        c = split(ln)
        assert len(c) == 6, (len(c), ln[:80])
        rid = c[0]
        for nid, a, b in [(x[0], x[1], x[2]) for x in NOTE_FIX if x[0] == rid]:
            if a == '':
                c[5] = (c[5] + ' ' + b).strip() if c[5] else b
            else:
                assert a in c[5], (rid, a); c[5] = c[5].replace(a, b)
            used.add(('N', rid, a))
        for tid, a, b in [x for x in TEXT_FIX if x[0] == rid]:
            assert a in c[2], (rid, a); c[2] = c[2].replace(a, b); used.add(('T', rid))
        for nr in BEFORE.get(rid, []):
            outL.append(row(list(nr) + [M.get(nr[0], NONE)])); used.add(('B', nr[0]))
            for nr2 in NEW.get(nr[0], []):
                outL.append(row(list(nr2) + [M.get(nr2[0], NONE)])); used.add(('A', nr2[0]))
        outL.append(row(c + [M.get(rid, NONE)])); used.add(('M', rid))
        for nr in NEW.get(rid, []):
            outL.append(row(list(nr) + [M.get(nr[0], NONE)])); used.add(('A', nr[0]))
        continue
    outL.append(ln)

# sanity: every NEW/BEFORE/NOTE_FIX entry used
for k, v in NEW.items():
    for nr in v: assert ('A', nr[0]) in used, nr[0]
for k, v in BEFORE.items():
    for nr in v: assert ('B', nr[0]) in used, nr[0]
for x in NOTE_FIX: assert ('N', x[0], x[1]) in used, x
for k in M:
    assert any(u[1] == k for u in used if u[0] in 'MAB'), ('monograph key unused', k)
open(out, 'w', encoding='utf-8').write('\n'.join(outL))
print('rows written', sum(1 for l in outL if l.startswith('| ') and not l.startswith('| #')))
