"""script.py: the words of the two parent-facing ads. Heart (the narrator) speaks TO PARENTS.
Every claim is from the app or its website (see ADS_NOTES.md section 3). Spoken forms: PRON (Kokoro reads spelling)."""
PRON = {"TheOneApp": "The One App", "theoneapp.sg": "the one app dot S G", "3D": "three D", "Primary 3 to 6": "Primary three to six"}

# id: (spoken line, on-screen caption chunks). Caption words in *stars* are drawn yellow.
AD15 = [
    ("h1", "Right idea, but still losing marks in Science?", ["Right idea…", "but still *losing marks*", "in Science?"]),
    ("h2", "TheOneApp marks written answers the Singapore way. A hint comes first, not the answer.",
     ["TheOneApp marks", "*written answers*", "the Singapore way.", "A *hint* comes first,", "not the answer."]),
    ("h3", "Primary 3 to 6 Science. Try it free at theoneapp.sg.", ["Primary 3–6 Science.", "Try it *free* at", "*theoneapp.sg*"]),
]
AD30 = [
    ("a1", "Knows the science, but still losing marks?", ["Knows the science…", "but still *losing marks*?"]),
    ("a2", "In TheOneApp, your child writes the answer like on paper. It is marked the Singapore way.",
     ["In TheOneApp, your child", "*writes the answer*", "like on paper.", "It is *marked*", "the Singapore way."]),
    ("a3", "A hint comes first. The full answer, after the second try.", ["A *hint* comes first.", "The full answer,", "after the *second try*."]),
    ("a4", "Then watch it, try it in 3D, and map it.", ["Then *watch* it,", "*try it in 3D*,", "and *map* it."]),
    ("a5", "You get a Progress Report, with the gaps to fix.", ["You get a", "*Progress Report*,", "with the *gaps to fix*."]),
    ("a6", "And the fun? Finished work earns credits for the Gift Shop. Never money.",
     ["And the fun?", "Finished work", "earns *credits*", "for the Gift Shop.", "*Never money.*"]),
    ("a7", "Try it free at theoneapp.sg.", ["Try it *free* at", "*theoneapp.sg*"]),
]
