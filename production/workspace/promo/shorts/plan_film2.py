"""Film 2, The Sleeping Guardians: the Short's crop plan (see make_short.py).
KF: (t, ease seconds (0 = hard cut), cx, w, ybot) in source pixels. w 634 = a full vertical crop; 1920 = the whole frame.
The film has no burned-in captions until 12 s, so the opening may show the frame lower down (ybot up to 1000)."""
HOOK = ["THE GUARDIANS", "WON'T", "WAKE UP!"]
HOOK_Y, HOOK_OUT, HOOK_PX = 900, 1.2, 100         # the robot Guardian glows at the top of the opening frame: the title goes below it
KEY = ['Guardians', 'sparkle', 'slept.', 'sleep!', 'enchanted', 'WAKE', 'UP!', 'Shouting', 'missing', 'Lab,', 'Heat', 'hotter',
       'colder', 'One!', 'Light', 'reflected.', 'Two!', 'magnet', 'iron.', 'Three.', 'science!', 'buddies', 'Science.', 'TheOneApp!', 'light?']
KF = [
    (0.00, 0, 1050, 634, 880),     # the robot Guardian glows over the Station (hook title below it)
    (0.40, 0.6, 1270, 700, 1000),  #   the fire dragon sweeps in low
    (1.05, 0.5, 980, 700, 1000),
    (1.35, 0.5, 450, 700, 1000),   #   the rainbow unicorn
    (1.90, 0.4, 760, 760, 1000),
    (2.25, 0, 930, 1000, 900),     # CUT the Station: three Guardians fly in and out ("Three Guardians keep...", "They have never once slept.")
    (9.60, 1.2, 860, 1000, 900),   #   the lights go out, the Guardians fall asleep
    (11.00, 1.4, 1100, 950, 880),  #   the buddies come in under the sleeping unicorn ("They never sleep!", "Then something has enchanted them.")
    (16.70, 0, 690, 700, 880),     # CUT Momo on the sleeping dragon: "WAKE UP!"
    (18.97, 0, 760, 900, 880),     # CUT Basil: "Shouting will not do it."
    (20.30, 1.2, 620, 900, 880),
    (21.67, 0, 420, 760, 880),     # CUT "Look: each one is missing something.": the dragon,
    (22.55, 0.8, 1330, 700, 880),  #   the unicorn,
    (23.45, 0.7, 1660, 700, 880),  #   the robot
    (24.63, 0, 470, 900, 880),     # CUT the dragon and the glowing door ("In the School Lab, we find out.")
    (25.65, 0, 600, 1000, 880),
    (27.55, 0, 880, 1500, 880),    # CUT the School Lab
    (28.98, 0, 960, 1300, 880),    # CUT "Which way does heat flow?"
    (30.10, 0, 800, 1100, 880),    # CUT the buddies, the hot stone and the cold ember ("Heat flows from a hotter object...")
    (33.70, 0.8, 1250, 1100, 880), #   the heat reaches the dragon
    (34.53, 0, 1150, 760, 880),    # CUT the dragon wakes: "One!"
    (35.40, 0.8, 930, 760, 880),
    (36.17, 0, 900, 1500, 880),    # CUT the lamp's beam and the sleeping unicorn
    (37.50, 0, 970, 1300, 880),    # CUT "What can send the light to the Unicorn?"
    (39.75, 0, 800, 1300, 880),    # CUT "Light can be reflected."
    (40.60, 1.0, 1000, 1000, 880),
    (41.98, 0, 1250, 760, 880),    # CUT the unicorn wakes: "Two!"
    (43.72, 0, 850, 1500, 880),    # CUT the robot and the magnet test
    (44.80, 0, 960, 1300, 880),    # CUT "Which one will a magnet pick up?"
    (46.98, 0, 1190, 1450, 880),   # CUT "A magnet attracts iron."
    (48.80, 1.0, 900, 1300, 880),
    (49.90, 0, 1200, 760, 880),    # CUT the robot wakes: "Three."
    (51.40, 0, 1100, 760, 880),    # CUT the flash
    (52.40, 0, 960, 1600, 880),    # CUT the Station: all three Guardians awake
    (53.00, 1.0, 960, 1450, 880),
    (56.20, 0, 820, 800, 880),     # CUT Momo: "You woke them! You did the science!"
    (58.62, 0, 960, 1350, 880),    # CUT the Gift Shop: "And the Guardians can be your buddies too."
    (63.18, 0, 960, 1150, 880),    # CUT the logo: "The only app you need to learn Science"
    (69.30, 1.2, 700, 1250, 880),  #   Basil, big at the left: "Next time... who stole the light?"
]
END = 2.3
CAP_Y_AT = [(16.7, 18.97, 300), (41.98, 43.72, 300)]   # Momo on the dragon's head, the unicorn's horn: captions above them
# the <=60 s ad cut (make_short.py 2 --cut): source ranges kept; the three School Lab tests are joined on their own scene cuts
CUT = [(0, 7.9), (9.4, 18.97), (24.63, 27.55), (28.98, 36.17), (37.5, 43.72), (44.8, 51.4), (52.4, 70.3)]
