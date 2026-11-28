"""Film 3, The Eclipse Riddle: the Short's crop plan (see make_short.py).
KF: (t, ease seconds (0 = hard cut), cx, w, ybot) in source pixels. w 634 = a full vertical crop; 1920 = the whole frame.
No burned-in captions in the first 2.5 s or after 71 s, so ybot may go lower there."""
HOOK = ["WHO STOLE", "THE LIGHT?!"]
HOOK_Y, HOOK_OUT = 110, 1.2          # the buddies ride the train in the opening frame: the title goes above them
KEY = ['lamp', 'Station.', 'riddle!', 'curse!', 'clue.', 'Shoo!', 'Colour', 'mind', 'map,', 'shape.', 'shadow.', 'shadow', 'blocks',
       'light.', 'Closer', 'grows.', 'airship!', 'lamp!', 'light', 'scientist.', 'you.', 'away', 'gone.', 'curse.', 'Science.', 'TheOneApp!']
KF = [
    (0.00, 0, 1025, 900, 900),     # the buddies ride the train (hook title above them)
    (0.50, 1.7, 330, 760, 900),    #   the train runs on to the left: follow Basil
    (2.23, 0, 900, 760, 880),      # CUT the lighthouse and the dome ("Every night, the great lamp lights the Station.")
    (4.00, 1.6, 870, 900, 880),
    (6.37, 0, 900, 1100, 880),     # CUT a dark shape eats the dome
    (8.20, 1.2, 470, 900, 880),    #   the riddle appears on it: LIGHT RETURNS WHEN NOTHING BLOCKS ITS PATH
    (10.20, 0.9, 1180, 760, 880),  #   the buddies: "A riddle!" "A curse!" "...A clue."
    (14.40, 1.2, 1000, 1000, 880), #   "Shoo!", the colour streaks ("Colour will not move it either.")
    (20.98, 0, 960, 760, 880),     # CUT the whoosh into the mind map
    (21.70, 0.8, 700, 1000, 880),  #   Basil and the mind map ("On a mind map, we link what we see.")
    (24.30, 1.2, 1000, 1300, 880), #   lamp, dark shape, "it has an edge" ("This dark has a shape." "So it is a shadow.")
    (30.43, 0, 900, 1350, 880),    # CUT the Shadow Simulation: torch, ball, screen ("A shadow forms when an object blocks light.")
    (33.40, 1.0, 1330, 800, 880),  #   the ball and its shadow on the screen
    (35.30, 1.0, 960, 1350, 880),  #   "Closer to the light, the shadow grows."
    (38.75, 0, 700, 1100, 880),    # CUT the Station: the airship, the riddle
    (40.20, 1.2, 850, 1100, 880),  #   "The airship! It is blocking the lamp!"
    (45.68, 0, 300, 700, 880),     # CUT Pip waves
    (46.40, 1.0, 830, 1500, 880),  #   the three cards ("How do we bring the light back?" "We need a scientist." "We need you.")
    (54.45, 0, 980, 1350, 720),    # CUT the cards close
    (55.10, 0.6, 1400, 700, 760),  #   "move the airship out of the light's path" ticks
    (55.80, 0, 1000, 1100, 880),   # CUT the airship flies off ("Take away what blocks the light, and the shadow is gone.")
    (58.43, 0, 900, 1100, 880),    # CUT the flash: the lamp lights the dome again
    (60.95, 0, 750, 1000, 880),    # CUT the riddle glows gold
    (62.00, 0.7, 1180, 760, 880),  #   "Not a curse." "Science."
    (64.33, 0, 850, 1100, 880),    # CUT the letters fly up
    (65.48, 1.0, 960, 1150, 880),  #   the logo: "The only app you need to learn Science" / "TheOneApp!"
    (72.42, 0, 400, 760, 1060),    # CUT the whole cast, Guardians and buddies: pan along the line
    (72.80, 3.6, 1600, 760, 1060),
]
END = 2.6
# the <=60 s ad cut (make_short.py 3 --cut): the opening and the riddle, then from the Shadow Simulation to the logo
CUT = [(0, 14.3), (30.43, 73.4)]
