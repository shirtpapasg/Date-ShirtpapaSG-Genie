"""ep13/habitat_draft.py: PHASE 1 DRAFT (teacher, 27 Nov 2026) of the habitat section inside the BE THE THING journey. NOT in the episode yet.
Teacher: "talk more about the effects of El Niño on habitat, including showing animals dying and the environment. Let this be inside the
micro journey with the pet buddies."  Goes between pip2 ("Wait for us, clouds!", povWeak) and wind6 ("You look down at Singapore...", povDry),
so the journey still ends on "What you just lived through has a name: El Niño." Heart soft (the journey voice: speed .86, .9 s gaps).
Facts and sources: SCRIPT.md, section 9.  Writes ep13/hab_segments.json (the stretch wind5 .. wind6 only, for timing and stills) and hab2_segments.json (the trimmed variant).
On approval, HAB is pasted into make_segments.py between pip2 and wind6, and the HABITAT key word added to "kws".
    python3 ep13/habitat_draft.py   then   $PY ep13/voice13.py ep13/hab_segments.json ep13/aud_hab ; $PY ep13/build_tl13.py ep13/hab_segments.json ep13/aud_hab ep13/hab
"""
import json, os, importlib.util
H = os.path.dirname(os.path.abspath(__file__))
HAB = [
  # the reef (middle of the Pacific): the warm water bleaches the corals
  {"id": "hab1", "scene": "povReef", "soft": True, "text": "In strong El Niño years, the warm water spreads over coral reefs. A reef is the habitat of many sea animals.",
   "sfx": [["underwater", 0.2], ["sea_wash", 3.0]]},
  {"id": "hab2", "scene": "povReef", "soft": True, "text": "Too much heat turns the corals white. This is called coral bleaching. If it lasts too long, the corals die.",
   "sfx": [["underwater", 0]], "hold": 0.4},
  # the coast near South America (Galápagos): the small fish are hard to find, the sea lions and seabirds go hungry
  {"id": "hab3", "scene": "povCoast", "soft": True, "text": "Near South America, the small fish become hard to find. Sea lions and seabirds go hungry, and many of their babies die.",
   "sfx": [["sea_wash", 0], ["wind", 3.0]]},
  {"id": "pipH", "scene": "povCoast", "who": "pip", "text": "Oh no. The poor little pups.", "hold": 0.3},
  # back near Singapore (Borneo): dry ponds, peat fires, the orangutans' lost home, and the rescue
  {"id": "hab4", "scene": "povForest", "soft": True, "text": "Back near Singapore, ponds dry up, and the fish in them die. Dry peat forests burn, and orangutans lose their home.",
   "sfx": [["wind", 0], ["crackle", 4.5]]},
  {"id": "basilH", "scene": "povForest", "who": "basil", "text": "Somebody help them!"},
  {"id": "hab5", "scene": "povForest", "soft": True, "text": "Rescue teams do. They carry orangutans to safer forests.",
   "hold": 0.6},
]
# TRIMMED variant (about 35-40 s): the two coral lines merged, shorter coast line; the same three scenes, Pip and Basil kept.
HAB_SHORT = [
  {"id": "hab1t", "scene": "povReef", "soft": True, "text": "In strong El Niño years, warm water spreads over coral reefs, the habitat of many sea animals. Too much heat turns the corals white, and if it lasts, they die.",
   "sfx": [["underwater", 0.2], ["sea_wash", 4.0]], "hold": 0.3},
  {"id": "hab3t", "scene": "povCoast", "soft": True, "text": "Near South America, sea lions and seabirds cannot find enough fish, and many of their babies die.",
   "sfx": [["sea_wash", 0], ["wind", 2.5]]},
  dict(HAB[3], hold=0.2),
  {"id": "hab4t", "scene": "povForest", "soft": True, "text": "Back near Singapore, ponds dry up, and their fish die. Peat forests burn, and orangutans lose their home.",
   "sfx": [["wind", 0], ["crackle", 4.0]]},
  HAB[5],
  dict(HAB[6], hold=0.4),
]
KW = ["hab1", "habitat", "HABITAT", "#2d6a4f"]          # the key-word shelf (green-teal, not used by the other five)
if __name__ == "__main__":
    spec = importlib.util.spec_from_file_location("ms", os.path.join(H, "make_segments.py"))
    src = open(os.path.join(H, "make_segments.py")).read(); ns = {}
    exec(compile(src.split("spec = {")[0].replace('H = os.path.dirname(os.path.abspath(__file__))', f'H = {H!r}'), "ms", "exec"), ns)   # SEG only, nothing written
    E = {s["id"]: s for s in ns["SEG"]}
    segs = [E["wind5"], E["pip2"]] + HAB + [E["wind6"]]
    json.dump({"episode": "SAU EP13 habitat draft", "title": "habitat draft", "tag": "🌏 TheOneApp, Explored · EP 13 · El Niño", "outro": 1.0,
               "kws": [KW], "segments": segs}, open(os.path.join(H, "hab_segments.json"), "w"), indent=1, ensure_ascii=False)
    print("wrote hab_segments.json", len(segs), "segments (", len(HAB), "new )")
    segs = [E["wind5"], E["pip2"]] + HAB_SHORT + [E["wind6"]]
    json.dump({"episode": "SAU EP13 habitat draft (trimmed)", "title": "habitat draft trimmed", "tag": "🌏 TheOneApp, Explored · EP 13 · El Niño", "outro": 1.0,
               "kws": [["hab1t", "habitat", "HABITAT", "#2d6a4f"]], "segments": segs}, open(os.path.join(H, "hab2_segments.json"), "w"), indent=1, ensure_ascii=False)
    print("wrote hab2_segments.json (trimmed)")
