"""script.py: every spoken word of promo film 4, "The Grey Platform" (the avatar: earn it, wear it, play it).
Voices (the teacher: "ignore the voice" of the earlier films): Heart = Kokoro af_heart (the narrator), the buddies = the Character
Voice Kit, exactly as the "TheOneApp, Explained" episodes make them (make_voice.py). Captions show these words exactly.
Each line: (id, who, text, opts). opts: speed / gap (Heart), keys (words highlighted yellow in the caption)."""
LINES = [
    # 1 the Station at night
    ("h01", "heart", "At TheOneApp Station, every pupil has a character of their very own.", {"keys": ["TheOneApp", "Station,", "character"]}),
    # 2 the mystery: a grey character steps off the train
    ("m01", "momo", "Oh wait, why is that one all grey?", {"keys": ["grey?"]}),   # teacher 24 Nov 2026: "Oh wait", not "Ooh..." (educational, no teasing)
    ("p01", "pip", "No colour yet. Let's find out how to bring it back!", {"keys": ["colour", "back!"]}),   # teacher 24 Nov 2026: softened (was "No colour. No style. Not even a hat!")
    ("b01", "basil", "And look. The Gift Shop is dark.", {"keys": ["Gift", "Shop", "dark."]}),
    ("h02", "heart", "Here, style is not given. It is earned.", {"keys": ["earned."]}),
    # 3 the quiz: TAP TO BEGIN
    ("b02", "basil", "Every quiz you finish earns credits. Let's start!", {"keys": ["credits."]}),
    ("p02", "pip", "Which one will a magnet attract?", {"keys": ["magnet", "attract?"]}),
    ("u01", "trio", "We need a scientist. We need you.", {"keys": ["scientist.", "you."]}),
    ("h03", "heart", "A magnet attracts things made of iron.", {"keys": ["magnet", "iron."]}),
    ("m02", "momo", "Quiz finished! Ten credits!", {"keys": ["Ten", "credits!"]}),
    # 4 day by day
    ("h04", "heart", "Day by day, the credits add up. They are earned, never bought.", {"keys": ["earned,", "never", "bought."]}),
    # 5 the Gift Shop
    ("p03", "pip", "The Gift Shop is open! Safety goggles, fifty credits.", {"keys": ["open!", "Safety", "goggles,"]}),
    # 6 the Dressing Room
    ("b03", "basil", "The colours are free. And the goggles? Yours to keep!", {"keys": ["free.", "keep!"]}),
    ("h05", "heart", "Spin it in the mirror. Then take it into every game.", {"keys": ["mirror.", "every", "game."]}),
    # 7 Versus at the Science Claw
    ("p04", "pip", "Versus! Your character against me!", {"keys": ["Versus!", "me!"]}),
    ("m03", "momo", "Iron! You remembered!", {"keys": ["Iron!", "remembered!"]}),
    ("h06", "heart", "What you learn, you keep. What you earn, you wear.", {"keys": ["learn,", "keep.", "earn,", "wear."]}),
    # 8 the tagline and the end card
    ("m04", "momo", "Earn it.", {"keys": ["Earn"]}),
    ("b04", "basil", "Wear it.", {"keys": ["Wear"]}),
    ("p05", "pip", "Play it.", {"keys": ["Play"]}),
    ("h07", "heart", "The only app you need to learn Science. TheOneApp.", {"keys": ["Science.", "TheOneApp."]}),
]
PRON = {"TheOneApp": "The One App"}
NAMES = {"heart": "Heart", "pip": "Pip", "momo": "Momo", "basil": "Basil", "trio": "Pip, Momo and Basil"}
