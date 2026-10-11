import sys
p=sys.argv[1]; s=open(p,encoding='utf-8').read()
reps=[('"P3 Science Textbook.pdf"','`P3 Science Textbook.pdf`'),
('every definition and "what something IS" line','every definition and *what something IS* line'),
('the book is "For Teachers\' Use Only. Not For Distribution"','the book is marked *For Teachers\' Use Only. Not For Distribution*'),
('- "Takeaway" rows are','- **Takeaway** rows are'),
('"WIHL" rows are','**WIHL** rows are'),
('(see also "Accuracy flags" in `content_map.md`)','(see also **Accuracy flags** in `content_map.md`)'),
('Never say "plants eat".','Never say *plants eat*.'),
('Positive-language swap in narration: "cannot stay alive".','Positive-language swap in narration: *cannot stay alive*.'),
('Do not extend to "all mammals sweat".','Do not extend to *all mammals sweat*.'),
('(for "why is X made of Y?" answers)','(for *why is X made of Y?* answers)'),
('## SCIENCE-PRACTICE SKILLS NAMED IN "LET\'S THINK AND DO"','## SCIENCE-PRACTICE SKILLS NAMED IN LET’S THINK AND DO'),
('- Every quote was machine-checked','- Every double-quoted string in this file is book text, and every one was machine-checked'),
]
for a,b in reps:
    n=s.count(a)
    if n!=1: print('COUNT',n,a)
    s=s.replace(a,b)
open(p,'w',encoding='utf-8').write(s)
