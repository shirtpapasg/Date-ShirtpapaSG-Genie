"""ep13/make_segments.py: writes ep13_segments.json, EP13 "Super El Nino! Why Is Singapore So Hot And Dry?" (TheOneApp, Explored).
The teacher's approved script (draft doc https://claude.ai/artifact/7s2QmX4ZPN4ezyRgf8Es9U), word for word, with:
  - the 2:15 wording swapped for the exact definitions (P5 definitions file, Cycles in Water, AB-C 2.3 / 2.5, TLG; see SCRIPT.md);
  - spoken forms for numbers and letters ("P S I", "the ninth of October"), so Kokoro reads them the Singapore way; captions keep digits;
  - series standards the draft leaves out, marked ADDED (the countdown before the journey, the silent cold open, "Now you know!": rule 1).
"who": heart (default) | pip | momo | basil.  "soft": Heart's quiet journey voice (BE THE THING).
Phase 2 (teacher, 26 Nov: "1 no level, 2 yes, 4 EP13, 3 Dec OK"): no school level said anywhere; the 2:15 definitions without the
"Clouds are made up of..." sentence; the four checks applied (1:12 version A + "Hardly any rain clouds." at 1:22; the 2:40 fires wording;
Basil "Lizards love the heat!" + Pip "Not us! ..."; the teacher's title); fact fixes "more than two degrees Celsius", "a warmer, drier".
Also writes short1_segments.json (Fri: the journey) and short2_segments.json (Mon: two degrees, India and the USA).
    python3 ep13/make_segments.py      (from workspace/sau)"""
import json, os
H = os.path.dirname(os.path.abspath(__file__))
WC_BEFORE = ("Let's name what you saw. Water gains heat and evaporates into water vapour. Water vapour loses heat and condenses into tiny water "
             "droplets, which form clouds. The droplets fall as rain. That is the water cycle. El Niño does not stop the water cycle. It moves where the rain falls.")
WC_AFTER = ("Let's name what you saw. Water gains heat and evaporates to form water vapour. When water vapour loses heat, it changes into water droplets. "
            "This process is called condensation, where a change in state from gas to liquid occurs. "
            "The droplets fall as rain. The continuous movement of water from the Earth to the sky and back to the Earth again is called the water cycle. "
            "El Niño does not stop the water cycle. It moves where the rain falls.")
SEG = [
  # 0:00 Why does it feel like an oven?
  {"id": "c0", "scene": "corridor", "silent": 3.0, "sfx": [["whirr", 0.0], ["ep07_birds", 0.4]], "added": "silent cold open (series standard)"},
  {"id": "oven", "scene": "corridor", "text": "It's the end of the year. The rainy season should be here. So why does Singapore still feel like an oven?"},
  {"id": "pip1", "scene": "corridor", "who": "pip", "text": "My fur is melting!"},
  {"id": "momo1", "scene": "corridor", "who": "momo", "text": "My water bowl went down again."},
  {"id": "basil1", "scene": "corridor", "who": "basil", "text": "I feel great, actually. Lizards love the heat!"},
  {"id": "pip0", "scene": "corridor", "who": "pip", "text": "Not us! Drink lots of water and stay in the shade.", "hold": 0.4},
  {"id": "far", "scene": "globeFly", "text": "The answer starts thousands of kilometres away, over the Pacific Ocean. Let's shrink down and go there."},
  {"id": "ready", "scene": "countdown", "excited": True, "text": "Are you ready? Three! Two! One! Go!", "added": "countdown (series standard, as EP11)"},
  # 0:40 You are the trade wind (BE THE THING, soft; NO music, natural sound only: teacher, 26 Nov)
  {"id": "w0", "scene": "povShrink", "silent": 3.2, "sfx": [["space_warp", 0.2], ["wind", 1.0], ["sparkle", 2.4]]},
  {"id": "wind1", "scene": "povWind", "soft": True, "text": "You are a gust of wind. You blow over the Pacific Ocean from east to west, day after day. People call you the trade wind.", "sfx": [["wind", 0], ["sea_wash", 1.5]]},
  {"id": "wind2", "scene": "povWarm", "soft": True, "text": "Below you, the sea is warm. You push the warm top layer of water along with you, west, towards Singapore.", "sfx": [["sea_wash", 0], ["wind", 2.5]]},
  {"id": "wind3", "scene": "povCloud", "soft": True, "text": "The warm water gains heat from the Sun. Some of it evaporates into water vapour and rises with you. High up, the water vapour loses heat, condenses into tiny water droplets and forms clouds.", "sfx": [["sparkle", 2.0], ["wind", 5.0]]},
  {"id": "wind4", "scene": "povRain", "soft": True, "text": "Over Singapore, the clouds rain down. That is a normal year.", "sfx": [["rain", 0.3], ["thunder", 1.2]], "hold": 0.6},
  {"id": "wind5", "scene": "povWeak", "soft": True, "text": "But this year, you grow weaker and weaker. The warm water slides back east, away from Singapore. The warm, wet air that rises from it, and builds the rain clouds, moves east too.", "sfx": [["wind", 0], ["pass_by", 4.5]]},
  {"id": "pip2", "scene": "povWeak", "who": "pip", "text": "Wait for us, clouds!"},
  {"id": "wind6", "scene": "povDry", "soft": True, "text": "You look down at Singapore. Blue sky. Hardly any rain clouds. What you just lived through has a name: El Niño.", "sfx": [["reveal", 4.6]], "hold": 0.8},
  # 1:30 The headline
  {"id": "news", "scene": "news", "text": "On the twelfth of November, scientists at NOAA in the USA said this El Niño is strong to very strong. Back in May, Singapore's weather scientists had already warned us: a warmer, drier June to October."},
  # 1:55 What makes it super
  {"id": "super", "scene": "thermo", "text": "The middle of the Pacific is more than two degrees Celsius warmer than usual. When it gets that warm, scientists call it a Super El Niño."},
  {"id": "momo2", "scene": "thermo", "who": "momo", "text": "Only two degrees?"},
  {"id": "super2", "scene": "thermo", "text": "Across a whole ocean, that is a huge amount of heat.", "hold": 0.6},
  # 2:15 The water cycle (LOOK CLOSER); exact definitions (see SCRIPT.md, task 2)
  {"id": "wcycle", "scene": "waterCycle", "text": WC_AFTER, "hold": 0.8},
  # 2:40 Here in Singapore: the haze
  {"id": "haze", "scene": "haze", "text": "With less rain, forests and peatland in our region dried out. Dry land burns easily, so the fires that started burned longer and spread further. On the ninth of October, Singapore's haze reading, the P S I, reached one hundred and ninety-two. That is unhealthy. Remember the smoke particle from Episode One?"},
  {"id": "basil2", "scene": "haze", "who": "basil", "text": "Even I stayed indoors.", "hold": 0.4},
  # 3:00 Meanwhile in India and the USA
  {"id": "india", "scene": "india", "text": "El Niño moves rain around the world. In India, this year's monsoon brought about one-eighth less rain than normal, the weakest in over ten years. The south and the northeast were driest."},
  {"id": "usa", "scene": "usa", "text": "In the USA, it works the other way for some places. This winter, scientists expect wetter weather than usual across the south, like California and Florida, and a warmer winter up north."},
  {"id": "pip3", "scene": "usa", "who": "pip", "text": "So one tired wind changes the weather in three countries?"},
  {"id": "usa2", "scene": "usa", "text": "Yes. That is why scientists all over the world watch it."},
  # 3:25 Try this
  {"id": "try", "scene": "try", "text": "Be a weather detective. Put two cups with the same amount of water outside: one in the sun, one in the shade. Mark the water level. Check after three days. Which cup lost more water, and why? Hint: which one gained more heat?", "hold": 0.6},
  # 3:45 Close
  {"id": "momo3", "scene": "bye", "who": "momo", "text": "Then tell a friend in India or the USA what El Niño is doing to their weather!"},
  {"id": "bye", "scene": "bye", "text": "See you next time on TheOneApp, Explored."},
  {"id": "nyk", "scene": "nyk", "excited": True, "text": "Now you know!", "added": "rule 1"},
]
spec = {"episode": "SAU EP13", "title": "Super El Niño! Why is Singapore so hot and dry?",
        "tag": "🌏 TheOneApp, Explored · EP 13 · El Niño",
        "next": ["NEXT TIME", "More science from", "your world! 🌏"], "endChip": "🌏 TheOneApp, Explored · a new episode every Thursday",
        "kws": [["wind1", "trade", "TRADE WIND", "#4cc9f0"], ["wind6", "nino", "EL NIÑO", "#f77f00"], ["wcycle", "evaporates", "EVAPORATION", "#ef476f"],
                ["wcycle", "condensation", "CONDENSATION", "#3a86ff"], ["wcycle", "continuous", "WATER CYCLE", "#06d6a0"]],
        "wc_before": WC_BEFORE, "segments": SEG, "outro": 4.2}
json.dump(spec, open(f"{H}/ep13_segments.json", "w"), indent=1, ensure_ascii=False); print("wrote ep13_segments.json", len(SEG), "segments")
# ---- the Shorts (SHORTS_BRIEF): the episode's own words wherever possible; "new": a new sentence for the teacher's list
E = {x["id"]: x for x in SEG}
def ep(i, **kw): d = dict(E[i]); d.pop("hold", None); d.update(kw); return d
WATCH = {"id": "watch", "scene": "bye", "text": "Watch the full episode on TheOneApp, Explored.", "hold": 0.3}
S1 = [{"id": "q1", "scene": "qcard", "text": "Why is Singapore so hot and dry this year?", "new": True},
      dict(E["w0"], silent=2.6, sfx=[["space_warp", 0.1], ["wind", 0.8], ["sparkle", 2.0]]),
      ep("wind1"), ep("wind5"), ep("pip2"), ep("wind6", hold=0.5), WATCH, E["nyk"]]
S2 = [{"id": "q2", "scene": "qcard", "text": "How can two degrees change the weather in India and the USA?", "new": True},
      ep("super"), ep("momo2"), ep("super2", hold=0.3), ep("india"), ep("usa", hold=0.3), WATCH, E["nyk"]]
for n, segs, title, kws in (("short1", S1, "Why is Singapore so hot and dry?", [["wind1", "trade", "TRADE WIND", "#4cc9f0"], ["wind6", "nino", "EL NIÑO", "#f77f00"]]),
                            ("short2", S2, "How can 2 °C change the weather?", [["super", "super", "SUPER EL NIÑO", "#e63946"]])):
    json.dump({"episode": f"SAU EP13 {n}", "title": title, "tag": "🌏 TheOneApp, Explored", "outro": 2.4, "kws": kws, "segments": segs},
              open(f"{H}/{n}_segments.json", "w"), indent=1, ensure_ascii=False); print("wrote", n, len(segs), "segments")
