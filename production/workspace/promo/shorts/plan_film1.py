"""Film 1, The Forgetting Fog: the Short's crop plan (see make_short.py).
KF: (t, ease seconds (0 = hard cut), cx, w, ybot) in source pixels. w 634 = a full vertical crop; 1920 = the whole frame."""
HOOK = ["A FOG THAT", "MAKES YOU FORGET?!"]
KEY = ['new', 'forget', 'fun', 'batteries', 'path', 'open', 'circuit', 'questions', 'electricity', 'scientist', 'you',
       'conductor', 'closed', 'Metal', 'take', 'Science', 'TheOneApp!', 'asleep']
KF = [
    (0.00, 0, 1100, 634, 880),     # opening: the night sky and the station (hook title on top)
    (0.60, 2.6, 960, 634, 880),    #   tilt down onto the station and the train
    (3.80, 1.4, 960, 700, 880),    #   the three buddies arrive (x 700-1260)
    (6.97, 0, 1040, 980, 880),     # CUT the Videos airship screen + Pip ("Watch it.")
    (9.22, 0, 1040, 634, 880),     # CUT quiz rings, the lighthouse
    (9.80, 1.2, 1010, 634, 880),   #   Momo by the lighthouse ("Quiz it!")
    (11.70, 0, 1075, 700, 880),    # CUT the chest and Basil ("Keep it.")
    (14.63, 0, 900, 1920, 880),    # CUT the station; the fog airship far left, buddies right: whole frame
    (19.20, 1.6, 1250, 1100, 880), #   the camera settles on the buddies ("It is making things forget.")
    (22.20, 1.6, 1180, 900, 880),
    (24.40, 1.2, 860, 1300, 880),  #   close: buddies left, Basil right
    (26.00, 0.9, 545, 634, 880),   #   Momo and Pip ("...Who turned off the fun?", "More batteries!")
    (29.30, 1.0, 700, 760, 880),   #   Momo stacks batteries
    (31.90, 1.0, 1150, 760, 880),  #   Basil: "More batteries will not help..."
    (35.80, 1.2, 860, 1250, 880),  #   the beam: buddies left, Basil right
    (38.60, 1.0, 1150, 760, 880),  #   "The circuit is open.": the gap and Basil
    (41.55, 0, 1100, 1920, 880),   # CUT the fog of unanswered questions: whole frame
    (44.98, 0, 300, 634, 880),     # CUT Pip waves
    (45.70, 1.0, 760, 1350, 880),  #   the three cards and Pip ("Which one lets electricity through?")
    (50.40, 1.2, 1000, 1920, 880), #   Momo and Basil come in at the right ("We need you.")
    (54.50, 0, 960, 1250, 700),    # CUT the cards close
    (55.30, 0.8, 1300, 634, 760),  #   the metal spoon ticks
    (55.90, 0, 1030, 634, 880),    # CUT "Metal is a conductor of electricity."
    (59.00, 1.0, 900, 900, 880),   #   the spoon flies into the gap ("...only when the circuit is closed.")
    (61.43, 0, 960, 1300, 880),    # CUT the flash: closed circuit, the buddies cheer
    (64.83, 0, 760, 760, 880),     # CUT the station: Momo jumps ("YES!")
    (66.00, 1.2, 900, 1150, 880),  #   "What you learn, the fog cannot take."
    (69.40, 1.6, 960, 1100, 880),  #   the logo rises
    (72.00, 2.0, 960, 1150, 880),  #   "The only app you need to learn Science" / TheOneApp
    (76.80, 1.0, 700, 1250, 880),  #   Basil, big at the left: "Next time... why are the Guardians asleep?"
]
END = 2.6
