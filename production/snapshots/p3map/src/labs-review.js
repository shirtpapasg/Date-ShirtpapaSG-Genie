// Benches that are built and checked but not yet signed off by the teacher. Each record joins its coming-soon line
// in labs-p4.js with status "review", so the lab page lists it in admin mode only. Made by the engines' app-sync
// tool from each bench's own words; do not edit by hand. A bench that is signed off gets a full record in labs-p4.js
// (with written questions and marking points) and leaves this file.
export const REVIEW = {
 "p3-1-2": {
  "status": "review",
  "minutes": 25,
  "bigIdea": "Living things need water, food and air to stay alive and grow. Non-living things do not need any of these. Floating, moving in the wind or getting wet is not the same as needing something to live.",
  "aim": "A bean plant and a toy boat sit side by side. Three trays wait beside them: water, food and air. Give each thing what is on the trays and watch what happens.",
  "safety": [],
  "sim": {
   "page": "labs/p3-1-2/index.html",
   "label": "Let's test it now!",
   "covers": [
    "a",
    "b"
   ],
   "map": {
    "a": "sprout",
    "b": "boat"
   }
  },
  "badge": {
   "icon": "🌱",
   "name": "The Needs Test",
   "line": "You predicted, tested and explained every part of The Needs Test."
  },
  "parts": [
   {
    "id": "a",
    "title": "Test the bean plant",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "The bean plant is living."
     },
     {
      "predict": {
       "q": "Does the bean plant need water, food and air?",
       "options": [
        "Yes, all three",
        "Only water",
        "None of them"
       ],
       "answer": 0
      }
     },
     {
      "do": "Tap a tray, then tap the bean plant. Try water, food and air."
     },
     {
      "note": "Living things like this bean plant need water, food and air. A plant makes its own food."
     }
    ]
   },
   {
    "id": "b",
    "title": "Test the toy boat",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "The toy boat is non-living."
     },
     {
      "predict": {
       "q": "Does the toy boat need water, food and air?",
       "options": [
        "No, none of them",
        "Only water, because it floats",
        "Yes, all three"
       ],
       "answer": 0
      }
     },
     {
      "do": "Tap a tray, then tap the toy boat. Try water, food and air."
     },
     {
      "note": "Non-living things like this toy boat do not need water, food or air."
     }
    ]
   }
  ]
 },
 "p3-1-3": {
  "status": "review",
  "minutes": 25,
  "bigIdea": "Living things need water, food and air. They can grow, respond to changes and make new living things like themselves. Something is living only if it shows all these clues, not just one of them.",
  "aim": "A hen and a lamp stand on the table. Six clue cards sit above them: water, food, air, grow, respond, young ones. A living thing shows all six.",
  "safety": [],
  "sim": {
   "page": "labs/p3-1-3/index.html",
   "label": "Let's test it now!",
   "covers": [
    "a",
    "b"
   ],
   "map": {
    "a": "check",
    "b": "judge"
   }
  },
  "badge": {
   "icon": "🔎",
   "name": "Six Clues",
   "line": "You predicted, tested and explained every part of Six Clues."
  },
  "parts": [
   {
    "id": "a",
    "title": "Check the six clues",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "Six clues. Two things."
     },
     {
      "predict": {
       "q": "Will the hen and the lamp show the same six clues?",
       "options": [
        "No. Only the hen shows all six.",
        "Yes. Both show all six.",
        "No. Only the lamp shows all six."
       ],
       "answer": 0
      }
     },
     {
      "do": "Tap a clue card, then tap the hen or the lamp. Try all six clues on both."
     },
     {
      "note": "A living thing shows all six clues. A non-living thing shows none."
     }
    ]
   },
   {
    "id": "b",
    "title": "Judge living or non-living",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "A goldfish swims in a bowl. A kite flies in the wind."
     },
     {
      "predict": {
       "q": "Do a goldfish and a kite both need food?",
       "options": [
        "No. Only the goldfish needs food.",
        "Yes. Both need food.",
        "No. Neither needs food."
       ],
       "answer": 0
      }
     },
     {
      "do": "Watch them, then tap the goldfish or the kite and tap its plaque. Use all six clues."
     },
     {
      "note": "Something is living only if it shows all six clues, not just one."
     }
    ]
   }
  ]
 },
 "p3-2-1a": {
  "status": "review",
  "minutes": 25,
  "bigIdea": "Plants split into two groups by one thing: does it flower? Flowering plants make seeds inside a flower. Non-flowering plants make spores instead. Leaves, roots and stems do not decide the group.",
  "aim": "Six potted plants stand in a row. Look closely at each one. Some can grow a flower. Some never do. Then sort them into two baskets.",
  "safety": [],
  "sim": {
   "page": "labs/p3-2-1a/index.html",
   "label": "Let's test it now!",
   "covers": [
    "a",
    "b"
   ],
   "map": {
    "a": "look",
    "b": "sort"
   }
  },
  "badge": {
   "icon": "🌼",
   "name": "Bloom or Not",
   "line": "You predicted, tested and explained every part of Bloom or Not."
  },
  "parts": [
   {
    "id": "a",
    "title": "Look close",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "Six plants, six pots."
     },
     {
      "predict": {
       "q": "Do all plants grow a flower?",
       "options": [
        "No, some do not",
        "Yes, all of them",
        "Only plants with big leaves"
       ],
       "answer": 0
      }
     },
     {
      "do": "Tap each plant. See its parts. Look for a flower, or for spore bags."
     },
     {
      "note": "Some plants grow a flower. Some plants never do. Ferns and moss make spores instead."
     }
    ]
   },
   {
    "id": "b",
    "title": "Sort plants",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "Two baskets: flowering and non-flowering."
     },
     {
      "predict": {
       "q": "Which plants can go in the flowering basket?",
       "options": [
        "Any plant that can make a flower",
        "Only the ones with a flower open now",
        "Any plant with green leaves"
       ],
       "answer": 0
      }
     },
     {
      "do": "Tap a plant, then tap its basket. Flowering or non-flowering?"
     },
     {
      "note": "Ferns and moss make spores instead of flowers. Leaves, roots and stems do not decide the group."
     }
    ]
   }
  ]
 },
 "p3-2-1b": {
  "status": "review",
  "minutes": 30,
  "bigIdea": "Six groups: mammal, bird, fish, reptile, amphibian, insect. The cover on the outside helps you find the group. Most animals hatch from an egg. Most mammals do not. An insect has six legs and a hard case.",
  "aim": "Six animals sit on stands in a circle. Feel what covers each one, sort them into six pens, then find out how each one is born.",
  "safety": [],
  "sim": {
   "page": "labs/p3-2-1b/index.html",
   "label": "Let's test it now!",
   "covers": [
    "a",
    "b",
    "c"
   ],
   "map": {
    "a": "cover",
    "b": "sort",
    "c": "young"
   }
  },
  "badge": {
   "icon": "🐾",
   "name": "Coat and Cover",
   "line": "You predicted, tested and explained every part of Coat and Cover."
  },
  "parts": [
   {
    "id": "a",
    "title": "Feel the cover",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "Six animals, six covers."
     },
     {
      "predict": {
       "q": "Which covering feels smooth and hard?",
       "options": [
        "Scales",
        "Fur",
        "Feathers"
       ],
       "answer": 0
      }
     },
     {
      "do": "Tap each animal. Feel its cover. It makes its sound!"
     },
     {
      "note": "An animal's cover helps sort it into its group: fur, feathers, scales, moist skin or a hard case."
     }
    ]
   },
   {
    "id": "b",
    "title": "Sort animals",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "Six pens, one for each group."
     },
     {
      "predict": {
       "q": "Which cover means an animal is a mammal?",
       "options": [
        "Fur",
        "Feathers",
        "Scales"
       ],
       "answer": 0
      }
     },
     {
      "do": "Tap an animal, then tap its pen. Use its cover."
     },
     {
      "note": "Six groups: fur, feathers, wet scales, dry scales, moist skin, and a hard case with six legs."
     }
    ]
   },
   {
    "id": "c",
    "title": "Egg or young",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "Every animal starts small."
     },
     {
      "predict": {
       "q": "Do all six groups hatch from an egg?",
       "options": [
        "No, one group does not",
        "Yes, all of them",
        "Only birds and fish"
       ],
       "answer": 0
      }
     },
     {
      "do": "Tap an animal, then tap how it is born: from an egg, or as live young."
     },
     {
      "note": "Most animal groups hatch from an egg. Mammals mostly do not: they are born as live young."
     }
    ]
   }
  ]
 },
 "p3-2-2": {
  "status": "review",
  "minutes": 30,
  "bigIdea": "Bacteria are tiny living things, seen only with a microscope. Fungi cannot make their own food. Yeast, mushrooms and mould are fungi. Some bacteria and fungi help us. Some can make us unwell.",
  "aim": "A microscope sits on the left with three slides. A covered tray sits on the right. Peek at bacteria, find the fungi, then sort helpful from harmful.",
  "safety": [
   "Never touch or sniff real mould. Wash your hands after handling old food."
  ],
  "sim": {
   "page": "labs/p3-2-2/index.html",
   "label": "Let's test it now!",
   "covers": [
    "a",
    "b",
    "c"
   ],
   "map": {
    "a": "peek",
    "b": "spot",
    "c": "sort"
   }
  },
  "badge": {
   "icon": "🔬",
   "name": "Tiny Life",
   "line": "You predicted, tested and explained every part of Tiny Life."
  },
  "parts": [
   {
    "id": "a",
    "title": "Peek at bacteria",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "Three slides wait by the microscope."
     },
     {
      "predict": {
       "q": "Can you see bacteria without a microscope?",
       "options": [
        "No, they are too tiny",
        "Yes, easily",
        "Only in bright light"
       ],
       "answer": 0
      }
     },
     {
      "do": "Tap a slide to look at it under the microscope. Bacteria are too tiny to see without it."
     },
     {
      "note": "Bacteria are tiny living things. You need a microscope to see them."
     }
    ]
   },
   {
    "id": "b",
    "title": "Spot the fungi",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "Three covers hide three fungi."
     },
     {
      "predict": {
       "q": "Do fungi make their own food, like a plant?",
       "options": [
        "No",
        "Yes",
        "Only mushrooms do"
       ],
       "answer": 0
      }
     },
     {
      "do": "Tap each cover on the tray. A fungus is underneath."
     },
     {
      "note": "Fungi cannot make their own food. They soak up food from around them."
     }
    ]
   },
   {
    "id": "c",
    "title": "Helpful or harmful",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "Four cards. Two trays."
     },
     {
      "predict": {
       "q": "Are all bacteria bad for us?",
       "options": [
        "No, some help us",
        "Yes, all of them",
        "Only fungi help us"
       ],
       "answer": 0
      }
     },
     {
      "do": "Tap a card, then tap the tray it belongs in."
     },
     {
      "note": "Some bacteria and fungi help us. Some can make us unwell."
     }
    ]
   }
  ]
 },
 "p3-2-3": {
  "status": "review",
  "minutes": 25,
  "bigIdea": "Creature Q has scales and lays its eggs on land. That makes it a reptile, even though it swims most of the day. Living in water does not always mean an animal is a fish. Good conclusions come from checking all the evidence.",
  "aim": "A shadowed creature, Creature Q, sits on a rock in shallow water. Three sealed clue tiles float beside it. Open every clue before you decide its group.",
  "safety": [],
  "sim": {
   "page": "labs/p3-2-3/index.html",
   "label": "Let's test it now!",
   "covers": [
    "a",
    "b"
   ],
   "map": {
    "a": "clues",
    "b": "decide"
   }
  },
  "badge": {
   "icon": "🧩",
   "name": "The Mystery Creature",
   "line": "You predicted, tested and explained every part of The Mystery Creature."
  },
  "parts": [
   {
    "id": "a",
    "title": "Gather clues",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "Creature Q swims most of the day."
     },
     {
      "predict": {
       "q": "What group do you think Creature Q belongs to?",
       "options": [
        "Reptile",
        "Fish",
        "Amphibian"
       ],
       "answer": 0
      }
     },
     {
      "do": "Tap each sealed tile. Read every clue before you decide."
     },
     {
      "note": "Good science reads all the evidence before deciding."
     }
    ]
   },
   {
    "id": "b",
    "title": "Decide the group",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "Creature Q swims a lot."
     },
     {
      "predict": {
       "q": "Does living in water always mean an animal is a fish?",
       "options": [
        "No, other groups live in water too",
        "Yes, always",
        "Only sometimes"
       ],
       "answer": 0
      }
     },
     {
      "do": "Tap Creature Q, then tap its pen. Use all three clues."
     },
     {
      "note": "Scales and eggs laid on land point to reptile, even in a creature that swims a lot."
     }
    ]
   }
  ]
 },
 "p3-3-1": {
  "status": "review",
  "minutes": 25,
  "bigIdea": "An object can be made of one material or many. The same kind of object can be made of different materials. One material can make many kinds of objects.",
  "aim": "A backpack sits on the table. Beside it, a tray holds a mug, a cup, a ruler and a chair. What is each one made of? Tap and find out.",
  "safety": [],
  "sim": {
   "page": "labs/p3-3-1/index.html",
   "label": "Let's test it now!",
   "covers": [
    "a",
    "b"
   ],
   "map": {
    "a": "count",
    "b": "sort"
   }
  },
  "badge": {
   "icon": "🎒",
   "name": "Made-Of",
   "line": "You predicted, tested and explained every part of Made-Of."
  },
  "parts": [
   {
    "id": "a",
    "title": "Count the parts",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "One backpack sits on the table."
     },
     {
      "predict": {
       "q": "How many materials is this backpack made of?",
       "options": [
        "One",
        "Two",
        "Three or more"
       ],
       "answer": 2
      }
     },
     {
      "do": "Tap each part of the backpack. A label names its material."
     },
     {
      "note": "An object can be made of one material, or of many. This backpack uses three."
     }
    ]
   },
   {
    "id": "b",
    "title": "Same kind, different stuff",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "A mug and a cup both hold drinks."
     },
     {
      "predict": {
       "q": "Are two mugs always made of the same material?",
       "options": [
        "No, they can be different",
        "Yes, always the same",
        "Only if one is broken"
       ],
       "answer": 0
      }
     },
     {
      "do": "Tap a thing, then tap the bin with its material."
     },
     {
      "note": "The mug and the cup both hold drinks, but one is ceramic and one is plastic."
     }
    ]
   }
  ]
 },
 "p3-3-2": {
  "status": "review",
  "minutes": 25,
  "bigIdea": "A strong material holds a heavy load without breaking. Some materials are stronger than others. We test strength by adding weights until the material breaks, then comparing the counts.",
  "aim": "A stand holds a clip and a hook. A paper strip and a plastic strip wait on the rack. Hang weights on each strip. Which one snaps first?",
  "safety": [],
  "sim": {
   "page": "labs/p3-3-2/index.html",
   "label": "Let's test it now!",
   "covers": [
    "a",
    "b"
   ],
   "map": {
    "a": "hold",
    "b": "swap"
   }
  },
  "badge": {
   "icon": "🏋️",
   "name": "Snap Test",
   "line": "You predicted, tested and explained every part of Snap Test."
  },
  "parts": [
   {
    "id": "a",
    "title": "Hold the load",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "Both strips are the same size."
     },
     {
      "predict": {
       "q": "Which holds more weights before it snaps: paper or plastic?",
       "options": [
        "Plastic",
        "Paper",
        "Both the same"
       ],
       "answer": 0
      }
     },
     {
      "do": "Clip on the paper strip. Add weights one at a time until it snaps."
     },
     {
      "note": "A material that holds a heavy load without breaking is strong. Paper snapped after 2 weights."
     }
    ]
   },
   {
    "id": "b",
    "title": "Swap the strip",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "The paper strip held 2 weights."
     },
     {
      "predict": {
       "q": "How many weights will the plastic strip hold before it snaps?",
       "options": [
        "More than paper",
        "Fewer than paper",
        "The same as paper"
       ],
       "answer": 0
      }
     },
     {
      "do": "Clip on the plastic strip. Add weights one at a time until it snaps."
     },
     {
      "note": "The plastic strip held 6 weights. The paper strip held 2. Plastic is the stronger material."
     }
    ]
   }
  ]
 },
 "p3-3-3": {
  "status": "review",
  "minutes": 25,
  "bigIdea": "A flexible material bends without breaking. Some materials bend more than others under the same weight. We test flexibility by measuring how far a strip bends.",
  "aim": "A clamp grips the edge of the table. A ruler stands beside it. A wooden strip and a plastic strip wait on the rack, the same length. Hang the same weight on each. Which one bends more?",
  "safety": [],
  "sim": {
   "page": "labs/p3-3-3/index.html",
   "label": "Let's test it now!",
   "covers": [
    "a",
    "b"
   ],
   "map": {
    "a": "bend",
    "b": "compare"
   }
  },
  "badge": {
   "icon": "🌀",
   "name": "Bend Test",
   "line": "You predicted, tested and explained every part of Bend Test."
  },
  "parts": [
   {
    "id": "a",
    "title": "Bend the wood",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "Both strips are the same length and thickness."
     },
     {
      "predict": {
       "q": "Which bends more without breaking: wood or plastic?",
       "options": [
        "Plastic",
        "Wood",
        "Both bend the same"
       ],
       "answer": 0
      }
     },
     {
      "do": "Clamp the wooden strip. Hang the weight and read the bend."
     },
     {
      "note": "A material that bends without breaking is flexible. The wood bent 2 cm."
     }
    ]
   },
   {
    "id": "b",
    "title": "Bend the plastic",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "The wood bent 2 cm."
     },
     {
      "predict": {
       "q": "Will the plastic strip bend more or less than the wood?",
       "options": [
        "More than wood",
        "Less than wood",
        "The same as wood"
       ],
       "answer": 0
      }
     },
     {
      "do": "Clamp the plastic strip. Hang the same weight and read the bend."
     },
     {
      "note": "Under the same weight, plastic bent 6 cm and wood bent 2 cm. Plastic is more flexible."
     }
    ]
   }
  ]
 },
 "p3-3-5": {
  "status": "review",
  "minutes": 25,
  "bigIdea": "Some materials do not let water through. The drops sit on top. Some materials soak water up instead. We test this by dripping water and watching what happens on top of and inside the sheet.",
  "aim": "A dropper of water sits beside two flat sheets, one plastic and one paper. Drip water on each sheet. Does the water sit on top, or soak in?",
  "safety": [],
  "sim": {
   "page": "labs/p3-3-5/index.html",
   "label": "Let's test it now!",
   "covers": [
    "a",
    "b"
   ],
   "map": {
    "a": "drip",
    "b": "soak"
   }
  },
  "badge": {
   "icon": "💧",
   "name": "Drip Test",
   "line": "You predicted, tested and explained every part of Drip Test."
  },
  "parts": [
   {
    "id": "a",
    "title": "Drip on sheet one",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "Two sheets wait on the table."
     },
     {
      "predict": {
       "q": "Which sheet keeps water out: plastic or paper?",
       "options": [
        "Plastic",
        "Paper",
        "Both keep water out"
       ],
       "answer": 0
      }
     },
     {
      "do": "Place the plastic sheet. Add drops and watch what the water does."
     },
     {
      "note": "The drops sat on top as beads. Plastic does not let water through."
     }
    ]
   },
   {
    "id": "b",
    "title": "Drip on sheet two",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "The plastic sheet kept the water out."
     },
     {
      "predict": {
       "q": "Will the paper sheet keep water out too?",
       "options": [
        "No, the water soaks in",
        "Yes, it stays dry underneath",
        "It sits on top like the plastic"
       ],
       "answer": 0
      }
     },
     {
      "do": "Place the paper sheet. Add drops and watch what the water does."
     },
     {
      "note": "The drops soaked in and spread. Paper soaks up water instead of keeping it out."
     }
    ]
   }
  ]
 },
 "p3-3-6": {
  "status": "review",
  "minutes": 30,
  "bigIdea": "Some materials let most light through. They are see-through. Some let only some light through. Things look blurry. Metal lets no light through at all. It makes a dark shadow.",
  "aim": "A torch points at a screen with five small dots. Three sheets wait on a rack: clear plastic, frosted plastic and metal. Hold a sheet in the light. How many dots light up?",
  "safety": [
   "Never shine a torch into anyone's eyes."
  ],
  "sim": {
   "page": "labs/p3-3-6/index.html",
   "label": "Let's test it now!",
   "covers": [
    "a",
    "b",
    "c"
   ],
   "map": {
    "a": "most",
    "b": "some",
    "c": "none"
   }
  },
  "badge": {
   "icon": "🔦",
   "name": "Torch Test",
   "line": "You predicted, tested and explained every part of Torch Test."
  },
  "parts": [
   {
    "id": "a",
    "title": "Shine on sheet one",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "The clear sheet is first."
     },
     {
      "predict": {
       "q": "Does this clear sheet let most, some, or no light through?",
       "options": [
        "Most light",
        "Some light",
        "No light"
       ],
       "answer": 0
      }
     },
     {
      "do": "Hold up the clear sheet. Switch on the torch and count the lit dots."
     },
     {
      "note": "A material that lets most light through is see-through. All five dots lit up."
     }
    ]
   },
   {
    "id": "b",
    "title": "Shine on sheet two",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "The clear sheet lit all five dots."
     },
     {
      "predict": {
       "q": "Will the frosted sheet light up more or fewer dots than the clear one?",
       "options": [
        "Fewer dots",
        "The same number of dots",
        "More dots"
       ],
       "answer": 0
      }
     },
     {
      "do": "Swap in the frosted sheet. Switch on the torch and count the lit dots."
     },
     {
      "note": "A material that lets some light through looks blurry, not clear. Two dots lit up."
     }
    ]
   },
   {
    "id": "c",
    "title": "Shine on sheet three",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "The metal sheet is last."
     },
     {
      "predict": {
       "q": "Will any dots light up through the metal sheet?",
       "options": [
        "None will light up",
        "A few will light up",
        "All five will light up"
       ],
       "answer": 0
      }
     },
     {
      "do": "Swap in the metal sheet. Switch on the torch and count the lit dots."
     },
     {
      "note": "A material that lets no light through blocks it completely. No dots lit up."
     }
    ]
   }
  ]
 },
 "p3-3-7": {
  "status": "review",
  "minutes": 25,
  "bigIdea": "A material is chosen for what it can do. Different objects need different things from a material. Each material has a reason it suits its object.",
  "aim": "Four object cards sit in a tray: a raincoat, a window, a school bag and a pair of scissors. Four material bins stand behind. Match each object to its material, then say why.",
  "safety": [],
  "sim": {
   "page": "labs/p3-3-7/index.html",
   "label": "Let's test it now!",
   "covers": [
    "a",
    "b"
   ],
   "map": {
    "a": "match",
    "b": "reason"
   }
  },
  "badge": {
   "icon": "🧩",
   "name": "Match the Material",
   "line": "You predicted, tested and explained every part of Match the Material."
  },
  "parts": [
   {
    "id": "a",
    "title": "Match object to material",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "Each object is made of the material that suits its job."
     },
     {
      "predict": {
       "q": "Which material is best for making a raincoat?",
       "options": [
        "Plastic",
        "Wood",
        "Glass"
       ],
       "answer": 0
      }
     },
     {
      "do": "Tap an object, then tap the material bin it belongs in."
     },
     {
      "note": "A material is chosen because of what it can do. The raincoat is plastic because plastic keeps water out."
     }
    ]
   },
   {
    "id": "b",
    "title": "Why this material?",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "Each material was chosen for a reason."
     },
     {
      "predict": {
       "q": "Why is a raincoat made of plastic?",
       "options": [
        "It does not let water through",
        "It lets light through",
        "It floats"
       ],
       "answer": 0
      }
     },
     {
      "do": "Tap a material bin, then tap the reason it suits its object."
     },
     {
      "note": "Each material is chosen for a reason. Plastic keeps rain out. Glass lets light in. Fabric bends. Metal is strong."
     }
    ]
   }
  ]
 },
 "p3-3-8": {
  "status": "review",
  "minutes": 25,
  "bigIdea": "We improve an object by choosing a material that suits its job better. We test an improvement by comparing counts before and after. Choosing a material means thinking about what it can do.",
  "aim": "A school bag sits on the table. Its paper strap tore and hangs loose. A tray holds fabric, glass, metal and more paper. Choose a better material, then test it.",
  "safety": [],
  "sim": {
   "page": "labs/p3-3-8/index.html",
   "label": "Let's test it now!",
   "covers": [
    "a",
    "b"
   ],
   "map": {
    "a": "swap",
    "b": "test"
   }
  },
  "badge": {
   "icon": "🔧",
   "name": "Upgrade",
   "line": "You predicted, tested and explained every part of Upgrade."
  },
  "parts": [
   {
    "id": "a",
    "title": "Choose a better material",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "The strap is made of paper and it tore."
     },
     {
      "predict": {
       "q": "Which material would make a stronger strap?",
       "options": [
        "Fabric",
        "Glass",
        "Paper again"
       ],
       "answer": 0
      }
     },
     {
      "do": "Tap the torn strap, then tap the material that suits a strap."
     },
     {
      "note": "We choose a material for a part by thinking about what it can do. Fabric bends and is strong."
     }
    ]
   },
   {
    "id": "b",
    "title": "Test the upgrade",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "The old paper strap held 2 weights before it tore."
     },
     {
      "predict": {
       "q": "How many weights will the new strap hold, compared with the old one?",
       "options": [
        "More than before",
        "The same as before",
        "Fewer than before"
       ],
       "answer": 0
      }
     },
     {
      "do": "Check the old strap's count. Then clip on the new strap and add weights."
     },
     {
      "note": "An upgrade is only real if a test shows it holds up better. 6 weights beats 2."
     }
    ]
   }
  ]
 },
 "p3-4-1": {
  "status": "review",
  "minutes": 25,
  "bigIdea": "Every living thing starts small, as a young one. It grows into an adult of its own kind over time. The young and adult are alike, but the adult has grown more.",
  "aim": "A wooden shelf holds six picture cards, all mixed up. Three show a young living thing. Three show an adult. Match each young one to the adult it grows into, then say how they are alike and different.",
  "safety": [],
  "sim": {
   "page": "labs/p3-4-1/index.html",
   "label": "Let's test it now!",
   "covers": [
    "a",
    "b"
   ],
   "map": {
    "a": "match",
    "b": "compare"
   }
  },
  "badge": {
   "icon": "🐾",
   "name": "Young and Adult",
   "line": "You predicted, tested and explained every part of Young and Adult."
  },
  "parts": [
   {
    "id": "a",
    "title": "Match young to adult",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "Three young cards and three adult cards are mixed up."
     },
     {
      "predict": {
       "q": "Does every living thing have a young stage and an adult stage?",
       "options": [
        "Yes, every one",
        "Only animals",
        "Only people"
       ],
       "answer": 0
      }
     },
     {
      "do": "Tap a young card, then tap the adult card it grows into."
     },
     {
      "note": "A young living thing grows into the adult of its own kind. A puppy becomes a dog, never a cat."
     }
    ]
   },
   {
    "id": "b",
    "title": "Compare young and adult",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "The pairs are matched."
     },
     {
      "predict": {
       "q": "Do the young and the adult look exactly the same?",
       "options": [
        "No, the adult has grown more",
        "Yes, exactly the same",
        "No, they are a different kind"
       ],
       "answer": 0
      }
     },
     {
      "do": "Tap a pair, then tap the chip that is true for it."
     },
     {
      "note": "The young and the adult are alike, but the adult has grown more."
     }
    ]
   }
  ]
 },
 "p3-4-2": {
  "status": "review",
  "minutes": 25,
  "bigIdea": "A plant's life cycle has three stages: seed, seedling and adult plant. The seed needs water, air and the right warmth to start growing. The seedling needs light to grow well. The adult plant makes new seeds of its own.",
  "aim": "Two small pots sit on a windowsill, each with a seed just planted. One pot is in the sun. One is under a dark box. A day dial reads Day 0. Turn the days forward and watch what grows.",
  "safety": [],
  "sim": {
   "page": "labs/p3-4-2/index.html",
   "label": "Let's test it now!",
   "covers": [
    "a",
    "b"
   ],
   "map": {
    "a": "grow",
    "b": "cycle"
   }
  },
  "badge": {
   "icon": "🌱",
   "name": "Seed to Plant",
   "line": "You predicted, tested and explained every part of Seed to Plant."
  },
  "parts": [
   {
    "id": "a",
    "title": "Grow the seed",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "Both seeds have water, air and warmth. Only one has light."
     },
     {
      "predict": {
       "q": "Will the seedling grow taller as the days pass?",
       "options": [
        "Yes, taller each day",
        "No, it stays the same",
        "Only the dark one grows"
       ],
       "answer": 0
      }
     },
     {
      "do": "Tap the pots, then tap ▶ Later. Watch both pots and read the height."
     },
     {
      "note": "A seed grows into a seedling that grows taller each day. It needs water, air and light to grow well."
     }
    ]
   },
   {
    "id": "b",
    "title": "Build the life cycle",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "The plant has flowers now."
     },
     {
      "predict": {
       "q": "Will the grown plant make new seeds?",
       "options": [
        "Yes, inside its fruit",
        "No, plants never make seeds",
        "Only if we plant more seeds"
       ],
       "answer": 0
      }
     },
     {
      "do": "Tap a stage card, then tap the platform it belongs on: first, second or third."
     },
     {
      "note": "The adult plant grows flowers, then fruit with new seeds inside. The new seeds start the cycle again."
     }
    ]
   }
  ]
 },
 "p3-5-1": {
  "status": "review",
  "minutes": 25,
  "bigIdea": "Some animals have three stages: egg, young and adult. Others have four stages: egg, young, pupa and adult. A four-stage animal's young looks nothing like the adult at first.",
  "aim": "Two glass cases sit side by side, each with numbered platforms. Stage models wait on a tray. Build each animal's life cycle in order: some have three stages, some have four.",
  "safety": [],
  "sim": {
   "page": "labs/p3-5-1/index.html",
   "label": "Let's test it now!",
   "covers": [
    "a",
    "b"
   ],
   "map": {
    "a": "three",
    "b": "four"
   }
  },
  "badge": {
   "icon": "🦋",
   "name": "Life Cycle Cases",
   "line": "You predicted, tested and explained every part of Life Cycle Cases."
  },
  "parts": [
   {
    "id": "a",
    "title": "Three-stage animals",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "The grasshopper and the frog each have three stages."
     },
     {
      "predict": {
       "q": "Does every three-stage animal look like its adult when young?",
       "options": [
        "No, some do and some do not",
        "Yes, always",
        "No, never"
       ],
       "answer": 0
      }
     },
     {
      "do": "Tap a stage model, then tap its platform. Build both life cycles in order."
     },
     {
      "note": "A young grasshopper looks like the adult. A tadpole looks nothing like a frog. Both animals have three stages."
     }
    ]
   },
   {
    "id": "b",
    "title": "Four-stage animals",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "The butterfly and the mosquito each have four stages."
     },
     {
      "predict": {
       "q": "Does a four-stage animal's young ever look like the adult?",
       "options": [
        "No, it looks very different",
        "Yes, always",
        "Only the mosquito does"
       ],
       "answer": 0
      }
     },
     {
      "do": "Tap a stage model, then tap its platform. Build both life cycles in order."
     },
     {
      "note": "A four-stage animal's young looks nothing like the adult at first. A caterpillar becomes a butterfly only after the pupa stage."
     }
    ]
   }
  ]
 },
 "p3-5-2": {
  "status": "review",
  "minutes": 25,
  "bigIdea": "Different living things can have different life cycles. Some share the same stages but still look different when young. Others have a different number of stages altogether. Comparing means looking for what is alike and what is different.",
  "aim": "Two glass cases sit side by side, each showing a whole life cycle. Look at both. What is alike? What is different? First a chicken and a frog, then a mosquito and a cockroach.",
  "safety": [],
  "sim": {
   "page": "labs/p3-5-2/index.html",
   "label": "Let's test it now!",
   "covers": [
    "a",
    "b"
   ],
   "map": {
    "a": "same",
    "b": "different"
   }
  },
  "badge": {
   "icon": "⚖️",
   "name": "Compare Cycles",
   "line": "You predicted, tested and explained every part of Compare Cycles."
  },
  "parts": [
   {
    "id": "a",
    "title": "Same number of stages",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "The chicken and the frog both have three stages."
     },
     {
      "predict": {
       "q": "Do animals with the same number of stages look alike when young?",
       "options": [
        "Not always",
        "Yes, always",
        "Only if both lay eggs"
       ],
       "answer": 0
      }
     },
     {
      "do": "Look at both cases. Tap a question card, then tap the chip that is true."
     },
     {
      "note": "The chicken and frog have three stages, but look different when young."
     }
    ]
   },
   {
    "id": "b",
    "title": "Different number of stages",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "The mosquito and the cockroach both start as an egg."
     },
     {
      "predict": {
       "q": "Does starting as an egg mean animals share the same stages?",
       "options": [
        "No, the number of stages can differ",
        "Yes, always",
        "Only for insects"
       ],
       "answer": 0
      }
     },
     {
      "do": "Look at both cases. Tap a question card, then tap the chip that is true."
     },
     {
      "note": "Both start as an egg; only the mosquito has a pupa stage."
     }
    ]
   }
  ]
 },
 "p3-6-1a": {
  "status": "review",
  "minutes": 25,
  "bigIdea": "Unlike poles, one red and one blue, attract. Like poles, both red or both blue, repel. This is true whatever shape the magnet is.",
  "aim": "Two bar magnets sit apart on the table. One end of each is red, the other blue. Choose which ends face each other, then slide them close. Do they attract, or repel?",
  "safety": [],
  "sim": {
   "page": "labs/p3-6-1a/index.html",
   "label": "Let's test it now!",
   "covers": [
    "a",
    "b"
   ],
   "map": {
    "a": "bar",
    "b": "horseshoe"
   }
  },
  "badge": {
   "icon": "🧲",
   "name": "Attract or Repel",
   "line": "You predicted, tested and explained every part of Attract or Repel."
  },
  "parts": [
   {
    "id": "a",
    "title": "Bar magnet pair",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "Each magnet has a red end and a blue end."
     },
     {
      "predict": {
       "q": "If you turn one magnet, will they attract or repel?",
       "options": [
        "It depends which ends face each other",
        "Attract every time",
        "Repel every time"
       ],
       "answer": 0
      }
     },
     {
      "do": "Choose which ends face, then slide the magnets together. Try all three ways."
     },
     {
      "note": "Unlike poles, one red and one blue, attract. Like poles, both red or both blue, repel."
     }
    ]
   },
   {
    "id": "b",
    "title": "U-shaped pair",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "Now two U-shaped magnets."
     },
     {
      "predict": {
       "q": "Will U-shaped magnets attract and repel the same way as bar magnets?",
       "options": [
        "Yes, the same way",
        "No, the opposite way",
        "U-shaped magnets do not attract or repel"
       ],
       "answer": 0
      }
     },
     {
      "do": "Choose which ends face, then slide the U-shaped magnets together. Try all three ways."
     },
     {
      "note": "The shape of a magnet does not change the rule. Unlike poles attract, like poles repel."
     }
    ]
   }
  ]
 },
 "p3-6-1b": {
  "status": "review",
  "minutes": 30,
  "bigIdea": "Magnets attract magnetic materials such as iron and steel. Magnets do not attract non-magnetic materials, like copper and plastic. Being made of metal does not always mean an object is magnetic.",
  "aim": "A magnet sits beside a row of objects: an iron nail, a steel paper clip, a copper coin, a wooden block, a plastic ruler and some foil. Bring the magnet near each one. Which ones jump?",
  "safety": [],
  "sim": {
   "page": "labs/p3-6-1b/index.html",
   "label": "Let's test it now!",
   "covers": [
    "a",
    "b",
    "c"
   ],
   "map": {
    "a": "metals",
    "b": "others",
    "c": "sortall"
   }
  },
  "badge": {
   "icon": "📎",
   "name": "Magnet Test",
   "line": "You predicted, tested and explained every part of Magnet Test."
  },
  "parts": [
   {
    "id": "a",
    "title": "Test the metal objects",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "The nail, the clip and the coin are all made of metal."
     },
     {
      "predict": {
       "q": "Which will a magnet attract: the nail, the clip, or the coin?",
       "options": [
        "Only the nail and the clip",
        "All three",
        "None of them"
       ],
       "answer": 0
      }
     },
     {
      "do": "Place an object, then bring the magnet near. Test all three."
     },
     {
      "note": "Not everything made of metal is magnetic. Iron and steel are. Copper is not."
     }
    ]
   },
   {
    "id": "b",
    "title": "Test the everyday objects",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "Now some everyday objects."
     },
     {
      "predict": {
       "q": "Will the magnet attract the wood, the ruler, or the foil?",
       "options": [
        "No, none of them",
        "Yes, the foil only",
        "Yes, all of them"
       ],
       "answer": 0
      }
     },
     {
      "do": "Place an object, then bring the magnet near. Test all three."
     },
     {
      "note": "A magnet attracts only certain materials, like iron and steel. Shiny foil is not one of them."
     }
    ]
   },
   {
    "id": "c",
    "title": "Sort them all",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "Six objects have been tested."
     },
     {
      "predict": {
       "q": "How many of the six are magnetic?",
       "options": [
        "Two",
        "Three",
        "Six"
       ],
       "answer": 0
      }
     },
     {
      "do": "Tap an object, then tap the box it belongs in: Magnetic or Non-magnetic."
     },
     {
      "note": "Magnetic materials like iron and steel are attracted. Copper, wood, plastic and foil are not."
     }
    ]
   }
  ]
 },
 "p3-6-2": {
  "status": "review",
  "minutes": 25,
  "bigIdea": "A magnet attracts most strongly at its two poles. We measure this by counting the paper clips it holds. This is true for different shapes of magnet.",
  "aim": "A bar magnet lies beside a pile of paper clips. Lower one spot of the magnet into the clips, lift it, and count how many cling. Which spot holds the most?",
  "safety": [],
  "sim": {
   "page": "labs/p3-6-2/index.html",
   "label": "Let's test it now!",
   "covers": [
    "a",
    "b"
   ],
   "map": {
    "a": "bar",
    "b": "horseshoe"
   }
  },
  "badge": {
   "icon": "📎",
   "name": "Strongest Spot",
   "line": "You predicted, tested and explained every part of Strongest Spot."
  },
  "parts": [
   {
    "id": "a",
    "title": "Test the bar magnet",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "The bar magnet has a red end, a middle and a blue end."
     },
     {
      "predict": {
       "q": "Which part will pick up the most clips?",
       "options": [
        "The two ends",
        "The middle",
        "All parts pick up the same"
       ],
       "answer": 0
      }
     },
     {
      "do": "Tap a spot on the magnet, then lower and lift. Count the clips. Test all three spots."
     },
     {
      "note": "A magnet attracts most strongly at its two ends, its poles. The middle holds almost nothing."
     }
    ]
   },
   {
    "id": "b",
    "title": "Test another shape",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "Now a U-shaped magnet."
     },
     {
      "predict": {
       "q": "Will a U-shaped magnet also hold most clips at its ends?",
       "options": [
        "Yes, the same as the bar magnet",
        "No, the middle holds most",
        "No clips will cling at all"
       ],
       "answer": 0
      }
     },
     {
      "do": "Tap a spot on the U-shaped magnet, then lower and lift. Test all three spots."
     },
     {
      "note": "Every magnet attracts most strongly at its poles, whatever its shape."
     }
    ]
   }
  ]
 },
 "p3-6-3a": {
  "status": "review",
  "minutes": 25,
  "bigIdea": "Unlike poles attract; the carts roll together. Like poles repel; the carts stay apart. Magnets attract or repel without touching.",
  "aim": "Two toy carts sit apart on a straight track. Each carries a bar magnet, red end and blue end. Turn a magnet, roll a cart, and watch: do the carts come together, or stay apart?",
  "safety": [],
  "sim": {
   "page": "labs/p3-6-3a/index.html",
   "label": "Let's test it now!",
   "covers": [
    "a",
    "b"
   ],
   "map": {
    "a": "unlike",
    "b": "like"
   }
  },
  "badge": {
   "icon": "🚃",
   "name": "Magnet Carts",
   "line": "You predicted, tested and explained every part of Magnet Carts."
  },
  "parts": [
   {
    "id": "a",
    "title": "Unlike poles facing",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "The carts start apart."
     },
     {
      "predict": {
       "q": "If red faces blue, will the carts roll together or stay apart?",
       "options": [
        "Roll together",
        "Stay apart",
        "Stay still"
       ],
       "answer": 0
      }
     },
     {
      "do": "Choose which ends face, then roll the cart. Watch what happens."
     },
     {
      "note": "Unlike poles attract: the carts roll together."
     }
    ]
   },
   {
    "id": "b",
    "title": "Like poles facing",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "Now turn one magnet round."
     },
     {
      "predict": {
       "q": "If both ends are red, will the carts roll together or stay apart?",
       "options": [
        "Stay apart",
        "Roll together",
        "Stay still"
       ],
       "answer": 0
      }
     },
     {
      "do": "Choose which ends face, then roll the cart. Watch the gap."
     },
     {
      "note": "Like poles repel: the carts stay apart and never touch."
     }
    ]
   }
  ]
 },
 "p3-6-3b": {
  "status": "review",
  "minutes": 25,
  "bigIdea": "Like poles repel and leave a gap. Unlike poles attract and sit flat. A gap tells us the hidden pole's colour: it is the same as the one below.",
  "aim": "An upright stand holds a rod. Two ring magnets wait beside it, one side red and one side blue. Slide one ring on, then lower the other. Does it sit flat, or float with a gap?",
  "safety": [],
  "sim": {
   "page": "labs/p3-6-3b/index.html",
   "label": "Let's test it now!",
   "covers": [
    "a",
    "b"
   ],
   "map": {
    "a": "stack",
    "b": "find"
   }
  },
  "badge": {
   "icon": "🔵",
   "name": "Ring Magnets",
   "line": "You predicted, tested and explained every part of Ring Magnets."
  },
  "parts": [
   {
    "id": "a",
    "title": "Stack the rings",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "The bottom ring is on the rod. Its top side faces up."
     },
     {
      "predict": {
       "q": "If blue meets red, will the rings sit flat or float apart?",
       "options": [
        "Sit flat together",
        "Float apart with a gap",
        "Nothing happens"
       ],
       "answer": 0
      }
     },
     {
      "do": "Choose which sides meet, then lower the top ring. Try all three ways."
     },
     {
      "note": "Unlike poles attract and the rings sit flat. Like poles repel and the top ring floats with a gap."
     }
    ]
   },
   {
    "id": "b",
    "title": "Find the missing pole",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "One ring has its bottom side painted over. You cannot see its colour."
     },
     {
      "predict": {
       "q": "A ring floats with a gap above a red side. Is its hidden side red or blue?",
       "options": [
        "Red",
        "Blue",
        "Cannot tell"
       ],
       "answer": 0
      }
     },
     {
      "do": "Tap a puzzle card, look at the stand, then tap the colour of the hidden side."
     },
     {
      "note": "A gap means the same colour poles are facing each other. Flat means they are different."
     }
    ]
   }
  ]
 },
 "p3-6-3c": {
  "status": "review",
  "minutes": 25,
  "bigIdea": "Attracted by one pole and repelled by the other: it is a magnet. Attracted by both poles: it is a magnetic material. Attracted by neither: it is non-magnetic.",
  "aim": "A bar magnet with its red and blue ends sits beside three closed casings marked A, B and C. You cannot see inside. Bring each pole near each one. Which is a magnet, which is magnetic, and which is not?",
  "safety": [],
  "sim": {
   "page": "labs/p3-6-3c/index.html",
   "label": "Let's test it now!",
   "covers": [
    "a",
    "b"
   ],
   "map": {
    "a": "test",
    "b": "classify"
   }
  },
  "badge": {
   "icon": "❓",
   "name": "Magnet or Not",
   "line": "You predicted, tested and explained every part of Magnet or Not."
  },
  "parts": [
   {
    "id": "a",
    "title": "Test the objects",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "Object A is attracted to the red end."
     },
     {
      "predict": {
       "q": "Which result at the blue end would show that A is a magnet?",
       "options": [
        "It is pushed away",
        "It is attracted again",
        "Nothing happens"
       ],
       "answer": 0
      }
     },
     {
      "do": "Tap an object and a pole, then bring the magnet near. Do all six tests."
     },
     {
      "note": "A is attracted by one pole and repelled by the other: a magnet. B is attracted by both: a magnetic material. C by neither: non-magnetic."
     }
    ]
   },
   {
    "id": "b",
    "title": "Sort the objects",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "Object A was attracted by the red end and repelled by the blue end."
     },
     {
      "predict": {
       "q": "From the tests, what is object A?",
       "options": [
        "A magnet",
        "A magnetic material",
        "A non-magnetic material"
       ],
       "answer": 0
      }
     },
     {
      "do": "Tap an object, then tap its box: Magnet, Magnetic material, or Non-magnetic material."
     },
     {
      "note": "Testing both poles tells us if something is a magnet. Only a magnet can be repelled."
     }
    ]
   }
  ]
 },
 "p3-6-4": {
  "status": "review",
  "minutes": 30,
  "bigIdea": "A magnet free to turn always settles the same way. This is true whether it hangs, floats, or sits in a compass. It always points north to south.",
  "aim": "A stand holds a bar magnet tied on a string. A basin of water and a small foam board wait nearby, and a compass sits in its box. Let each magnet turn freely. Which way does it point when it stops?",
  "safety": [],
  "sim": {
   "page": "labs/p3-6-4/index.html",
   "label": "Let's test it now!",
   "covers": [
    "a",
    "b",
    "c"
   ],
   "map": {
    "a": "hang",
    "b": "float",
    "c": "compare"
   }
  },
  "badge": {
   "icon": "🧭",
   "name": "Magnet at Rest",
   "line": "You predicted, tested and explained every part of Magnet at Rest."
  },
  "parts": [
   {
    "id": "a",
    "title": "Hang the magnet",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "The magnet hangs on a string, held still."
     },
     {
      "predict": {
       "q": "If this hanging magnet turns freely, which way will it point?",
       "options": [
        "The same way every time",
        "A different way each time",
        "It will not settle at all"
       ],
       "answer": 0
      }
     },
     {
      "do": "Tap the hanging magnet, let it go, then nudge it. Watch where the red end stops each time."
     },
     {
      "note": "A magnet free to turn always settles pointing the same way: north–south."
     }
    ]
   },
   {
    "id": "b",
    "title": "Float the magnet",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "The hanging magnet settled north–south."
     },
     {
      "predict": {
       "q": "Will a floating magnet point the same way as the hanging one?",
       "options": [
        "Yes, the same way",
        "No, a different way",
        "It will spin forever"
       ],
       "answer": 0
      }
     },
     {
      "do": "Float the magnet on the board, nudge it, and compare with the hanging magnet."
     },
     {
      "note": "A floating magnet settles pointing the same way as a hanging one: north–south."
     }
    ]
   },
   {
    "id": "c",
    "title": "Compare with a compass",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "A compass has a thin needle that turns freely."
     },
     {
      "predict": {
       "q": "Will the compass needle point the same way as the magnets?",
       "options": [
        "Yes",
        "No",
        "Only sometimes"
       ],
       "answer": 0
      }
     },
     {
      "do": "Place the compass and watch its needle. Compare with both magnets."
     },
     {
      "note": "A compass needle is a small magnet free to turn. It settles north–south, like any free magnet."
     }
    ]
   }
  ]
 },
 "p3-7-1a": {
  "status": "review",
  "minutes": 25,
  "bigIdea": "A magnet can be made only from a magnetic material, like an iron nail. Stroke it with one pole, the same way each time, lifting away after every stroke. More strokes make a stronger magnet, up to a point.",
  "aim": "A tray holds an iron nail, a copper rod and a wooden peg. A bar magnet and a dish of paper clips sit beside it. Stroke one of them with the magnet, the same way every time. Can you make a new magnet?",
  "safety": [],
  "sim": {
   "page": "labs/p3-7-1a/index.html",
   "label": "Let's test it now!",
   "covers": [
    "a",
    "b"
   ],
   "map": {
    "a": "stroke",
    "b": "test"
   }
  },
  "badge": {
   "icon": "🧲",
   "name": "Make a Magnet",
   "line": "You predicted, tested and explained every part of Make a Magnet."
  },
  "parts": [
   {
    "id": "a",
    "title": "Make a magnet",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "Three things wait on the tray."
     },
     {
      "predict": {
       "q": "Which of these can become a magnet when we stroke it?",
       "options": [
        "Iron nail",
        "Copper rod",
        "Wooden peg"
       ],
       "answer": 0
      }
     },
     {
      "do": "Choose a thing from the tray, then stroke it with the magnet, the same way each time."
     },
     {
      "note": "A magnet can only be made from a magnetic material, like iron. Copper and wood cannot."
     }
    ]
   },
   {
    "id": "b",
    "title": "Count the clips",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "The nail can be stroked more, or less."
     },
     {
      "predict": {
       "q": "If we stroke the nail more, will it pick up more clips?",
       "options": [
        "More clips",
        "The same number of clips",
        "Fewer clips"
       ],
       "answer": 0
      }
     },
     {
      "do": "Choose how many strokes the nail has had, then dip it in the clips. Try all four."
     },
     {
      "note": "The more strokes, the stronger the magnet, up to a point. 40 strokes was only a little better than 30."
     }
    ]
   }
  ]
 },
 "p3-7-1b": {
  "status": "review",
  "minutes": 25,
  "bigIdea": "A magnet can be made with electricity: a coil of wire round an iron nail. It works only while electricity flows, so it can be switched on and off. More turns of wire make it stronger.",
  "aim": "An iron nail is wound with turns of wire. Its two wire ends hang loose. A battery and a dish of clips wait beside it. Connect the wire to the battery and watch the clips.",
  "safety": [
   "Use only a small battery, and disconnect it after each test so the wire does not get hot."
  ],
  "sim": {
   "page": "labs/p3-7-1b/index.html",
   "label": "Let's test it now!",
   "covers": [
    "a",
    "b"
   ],
   "map": {
    "a": "coil",
    "b": "test"
   }
  },
  "badge": {
   "icon": "🔋",
   "name": "Electric Magnet",
   "line": "You predicted, tested and explained every part of Electric Magnet."
  },
  "parts": [
   {
    "id": "a",
    "title": "Wind the coil",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "The nail has a coil of wire, but nothing is connected yet."
     },
     {
      "predict": {
       "q": "Will the iron nail attract paper clips before we connect the battery?",
       "options": [
        "No, only after electricity flows",
        "Yes, it already attracts them",
        "Only if we stroke it first"
       ],
       "answer": 0
      }
     },
     {
      "do": "Tap the loose wire end, then connect the battery. Disconnect and connect again. Watch the clips."
     },
     {
      "note": "A magnet made with electricity works only while electricity flows. Switch it off and the clips drop."
     }
    ]
   },
   {
    "id": "b",
    "title": "Test the strength",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "The coil can have more or fewer turns of wire."
     },
     {
      "predict": {
       "q": "If we add more turns of wire, will it attract more clips?",
       "options": [
        "More clips",
        "The same number of clips",
        "Fewer clips"
       ],
       "answer": 0
      }
     },
     {
      "do": "Choose how many turns of wire, then connect the battery and count the clips. Try all three."
     },
     {
      "note": "More turns of wire make a stronger magnet made with electricity: 3, 6, then 9 clips."
     }
    ]
   }
  ]
 },
 "p3-7-2": {
  "status": "review",
  "minutes": 25,
  "bigIdea": "We choose which poles face each other on purpose: unlike poles attract, like poles repel. We test a toy, then change one thing at a time. Comparing attempts shows whether a change really improved it.",
  "aim": "A small cart sits on a track with a flag at the far end. A hand-held wand holds a magnet. The cart has a magnet too, red end and blue end. Choose the poles, test it, then change one thing to make it reach the flag.",
  "safety": [],
  "sim": {
   "page": "labs/p3-7-2/index.html",
   "label": "Let's test it now!",
   "covers": [
    "a",
    "b"
   ],
   "map": {
    "a": "build",
    "b": "test"
   }
  },
  "badge": {
   "icon": "🚃",
   "name": "Magnet Toy",
   "line": "You predicted, tested and explained every part of Magnet Toy."
  },
  "parts": [
   {
    "id": "a",
    "title": "Choose and place the magnets",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "The cart must reach the flag. The wand waits near the flag."
     },
     {
      "predict": {
       "q": "To bring the cart to the flag, should the wand attract or repel it?",
       "options": [
        "Attract",
        "Repel",
        "It does not matter"
       ],
       "answer": 0
      }
     },
     {
      "do": "Try all four ways the poles can face. Find the two that bring the cart to the flag, and the two that push it away."
     },
     {
      "note": "Unlike poles (red and blue) attract and bring the cart. Like poles (red and red, blue and blue) repel and push it away. We choose on purpose."
     }
    ]
   },
   {
    "id": "b",
    "title": "Test and improve",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "The poles are right. Now the wand's distance matters."
     },
     {
      "predict": {
       "q": "Will the cart reach the flag on the very first try?",
       "options": [
        "No, it will likely need a change",
        "Yes, first try",
        "Cannot tell"
       ],
       "answer": 0
      }
     },
     {
      "do": "Test with the wand far, then move it closer one step at a time. Read the distance each time."
     },
     {
      "note": "We test a toy, then change one thing at a time. Each attempt shows if the change helped."
     }
    ]
   }
  ]
 },
 "p5-1-2": {
  "status": "review",
  "minutes": 25,
  "bigIdea": "Living things reproduce to make more of their own kind. Reproduction lets a group continue after its older members die. Helping rare animals such as giant pandas reproduce keeps their kind going. A falling trend in children per woman can lead to a shrinking population.",
  "aim": "A fenced reserve holds a small group of deer. A switch turns reproduction on or off, and a clock runs ten years in seconds. Beside it, a board shows a real line graph of children per woman in a small country.",
  "safety": [],
  "sim": {
   "page": "labs/p5-1-2/index.html",
   "label": "Let's test it now!",
   "covers": [
    "a",
    "b"
   ],
   "map": {
    "a": "reserve",
    "b": "trend"
   }
  },
  "badge": {
   "icon": "🐾",
   "name": "Living Things Reproduce",
   "line": "You predicted, tested and explained every part of Living Things Reproduce."
  },
  "parts": [
   {
    "id": "a",
    "title": "Run the reserve forward",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "Eight deer live in the reserve. They have food, water and space. The clock will run ten years."
     },
     {
      "predict": {
       "q": "What happens to the reserve after ten years if reproduction is switched off?",
       "options": [
        "The number of deer falls toward zero.",
        "The number of deer grows, because they have food and space.",
        "The number stays exactly the same."
       ],
       "answer": 0
      }
     },
     {
      "do": "Switch reproduction off, then on, and count the deer left after ten years."
     },
     {
      "observe": {
       "q": "Read your bar chart. Which switch setting left more deer in the reserve after ten years?",
       "options": [
        "Reproduction on",
        "Reproduction off",
        "Both the same"
       ],
       "answer": 0
      }
     },
     {
      "note": "Living things reproduce to make more of their own kind. The young replace the deer that die, so the group keeps going."
     }
    ]
   },
   {
    "id": "b",
    "title": "Reading the trend",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "The board shows the average number of children each woman has in a small country. One point for each year."
     },
     {
      "predict": {
       "q": "If that number keeps falling year after year, what happens to the country's population over time?",
       "options": [
        "It can shrink over time.",
        "It always grows, whatever the graph shows.",
        "Nothing. Children per woman has no link to it."
       ],
       "answer": 0
      }
     },
     {
      "do": "Read the average number of children per woman for each year on the board, then name the trend."
     },
     {
      "observe": {
       "q": "Look at the points. As the years go by, the average number of children per woman…",
       "options": [
        "decreases",
        "stays the same",
        "increases"
       ],
       "answer": 0
      }
     },
     {
      "note": "The average number of children per woman fell from 5.8 to 1.1. With fewer young born, a population can shrink over time."
     }
    ]
   }
  ],
  "written": [
   {
    "kind": "define",
    "q": "What does reproduce mean? [1]",
    "marks": 1,
    "concept": "To reproduce is to make more living things of the same kind.",
    "model": "To reproduce means that living things make more of their own kind by having young.",
    "points": [
     {
      "point": "living things make more of their own kind (they produce young)",
      "marks": 1
     }
    ],
    "alsoAccept": [
     "to have young",
     "to produce offspring",
     "to have babies so that there are more of the same kind of living thing"
    ],
    "doNotAccept": [
     "to grow bigger",
     "to stay alive for a long time",
     "to eat and get stronger",
     "to make a group"
    ]
   },
   {
    "kind": "explain",
    "q": "In the reserve, both switch settings started with the same eight deer, the same reserve and the same food. Explain why these were kept the same. [2]",
    "marks": 2,
    "concept": "In a fair test only one thing is changed, so any difference in the result is caused by that one thing.",
    "model": "It makes the test fair, because only the reproduction switch was changed. Then any difference in the number of deer after ten years is caused by reproduction only, not by the food, the reserve or the number of deer at the start.",
    "points": [
     {
      "point": "to make it a fair test: only one thing (whether reproduction is on or off) is changed and everything else is the same",
      "marks": 1
     },
     {
      "point": "so any difference in the number of deer after ten years is caused by reproduction only (not by the food, the reserve or the starting number)",
      "marks": 1
     }
    ],
    "alsoAccept": [
     "so that reproduction is the only variable changed and it alone affects the number of deer left"
    ],
    "doNotAccept": [
     "so that the deer do not die",
     "so that the results are the same",
     "to make the test accurate (with nothing about changing only one thing)",
     "so that the deer have enough food"
    ]
   },
   {
    "kind": "explain",
    "q": "On the graph board, the average number of children per woman fell as the years went by. Explain what can happen to the country's population if this goes on. [2]",
    "marks": 2,
    "concept": "When fewer young are born, there are fewer to replace those who die, so a population can shrink over time.",
    "model": "Fewer children are born each year. There are then not enough young people to replace the people who die, so the population can shrink over time.",
    "points": [
     {
      "point": "fewer children (young) are born as the years go by",
      "marks": 1
     },
     {
      "point": "there are fewer young to replace the people who die, so the population can shrink (become smaller) over time",
      "marks": 1
     }
    ],
    "doNotAccept": [
     "the population grows",
     "nothing happens, because a graph cannot change the number of people",
     "the line on the graph goes down (only repeats the question)",
     "everyone in the country dies at once"
    ]
   }
  ]
 },
 "p5-1-3": {
  "status": "review",
  "minutes": 25,
  "bigIdea": "Characteristics are passed on from parents to their young. This is why offspring often look like their parents. A young one gets characteristics from both parents, not just one. A family tree shows how characteristics travel across generations.",
  "aim": "Five dogs stand in a row: two parents and three pups. Check which characteristics the pups share with them. Then build a family tree of coloured tokens.",
  "safety": [],
  "sim": {
   "page": "labs/p5-1-3/index.html",
   "label": "Let's test it now!",
   "covers": [
    "a",
    "b"
   ],
   "map": {
    "a": "likeness",
    "b": "tree"
   }
  },
  "badge": {
   "icon": "🐕",
   "name": "Passing On Characteristics",
   "line": "You predicted, tested and explained every part of Passing On Characteristics."
  },
  "parts": [
   {
    "id": "a",
    "title": "Family likeness",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "Two parent dogs have three pups. Each dog has ears, a coat and a tail."
     },
     {
      "predict": {
       "q": "Will the pups share any characteristics with their parents?",
       "options": [
        "Yes. Each pup shares some characteristics with its parents.",
        "No. Young never look like their parents.",
        "No. Only humans pass characteristics to their young."
       ],
       "answer": 0
      }
     },
     {
      "do": "Check each pup against its parents and count the characteristics it shares with a parent."
     },
     {
      "observe": {
       "q": "Look at your results table. Which pups share at least two characteristics with a parent?",
       "options": [
        "All three pups",
        "Only one pup",
        "No pup"
       ],
       "answer": 0
      }
     },
     {
      "note": "Young take after their parents, so a family often looks alike."
     }
    ]
   },
   {
    "id": "b",
    "title": "Build the family tree",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "Four grandparent tokens make two parent pairs. A young one gets one token from each parent."
     },
     {
      "predict": {
       "q": "Where does a young dog's pair of tokens come from?",
       "options": [
        "One token from its father and one from its mother.",
        "It makes up new tokens that are not from its parents.",
        "Both tokens come from its mother."
       ],
       "answer": 0
      }
     },
     {
      "do": "Build each young one by tapping its father's token, then its mother's."
     },
     {
      "observe": {
       "q": "Each young one was built from tokens. Where did the tokens come from?",
       "options": [
        "One from each parent",
        "Both from the father",
        "Both from the mother"
       ],
       "answer": 0
      }
     },
     {
      "note": "Characteristics are passed on from parents to their young when living things reproduce."
     }
    ]
   }
  ],
  "written": [
   {
    "kind": "define",
    "q": "What does a family tree show? [1]",
    "marks": 1,
    "concept": "A family tree shows who came from whom in a family, from one generation to the next.",
    "model": "A family tree shows who came from whom in a family, from the grandparents to the parents to their young.",
    "points": [
     {
      "point": "it shows who came from whom in a family (which young came from which parents), across generations",
      "marks": 1
     }
    ],
    "alsoAccept": [
     "it shows the parents and their young, generation by generation",
     "it shows how characteristics are passed on from parents to their young across generations"
    ],
    "doNotAccept": [
     "a tree that a family plants",
     "a tree that a family lives near",
     "a list of the names of animals",
     "how old each dog is"
    ]
   },
   {
    "kind": "explain",
    "q": "In your results, every pup shared at least two characteristics with a parent. Explain why. [2]",
    "marks": 2,
    "concept": "Characteristics are passed on from parents to their young when living things reproduce, so young take after their parents.",
    "model": "When living things reproduce, characteristics are passed on from the parents to their young. So each pup has some of the same characteristics as its parents, such as the same ears, coat or tail.",
    "points": [
     {
      "point": "characteristics are passed on from parents to their young (when living things reproduce)",
      "marks": 1
     },
     {
      "point": "so the pups take after their parents: each pup has some of the same characteristics (ears, coat or tail) as a parent",
      "marks": 1
     }
    ],
    "alsoAccept": [
     "the pups got their characteristics from their parents, so they look like them"
    ],
    "doNotAccept": [
     "the pups copy their parents as they grow up",
     "the pups chose to look like their parents",
     "because they live together and eat the same food",
     "because they are a family (only repeats the question)"
    ]
   },
   {
    "kind": "explain",
    "q": "On the family tree, each young one got one token from its father and one from its mother. Explain what this shows about where a young one's characteristics come from. [2]",
    "marks": 2,
    "concept": "A young one gets characteristics from both parents, not from one parent only.",
    "model": "It shows that a young one gets its characteristics from both parents. The father passes on some and the mother passes on some, so they do not come from one parent only.",
    "points": [
     {
      "point": "a young one's characteristics come from both parents (the father and the mother)",
      "marks": 1
     },
     {
      "point": "each parent passes on some of them (one token each), so they do not come from the mother only or the father only",
      "marks": 1
     }
    ],
    "doNotAccept": [
     "the characteristics come only from the mother",
     "the characteristics come only from the father",
     "the young one makes up its own characteristics",
     "each young one has two tokens (only repeats the question)"
    ]
   }
  ]
 },
 "p5-1-4": {
  "status": "review",
  "minutes": 25,
  "bigIdea": "The testes make sperm and the ovaries make eggs. Fertilisation happens when a sperm joins with an egg. Only one sperm joins one egg. The fertilised egg grows into a baby in the womb, not the stomach.",
  "aim": "Two plain diagrams stand side by side: the male and the female reproductive systems. Name their parts. Then watch a sperm and an egg meet in slow motion.",
  "safety": [],
  "sim": {
   "page": "labs/p5-1-4/index.html",
   "label": "Let's test it now!",
   "covers": [
    "a",
    "b"
   ],
   "map": {
    "a": "label",
    "b": "join"
   }
  },
  "badge": {
   "icon": "🧬",
   "name": "Human Reproduction",
   "line": "You predicted, tested and explained every part of Human Reproduction."
  },
  "parts": [
   {
    "id": "a",
    "title": "Label the systems",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "Each diagram shows the main parts of one reproductive system. One part will light up at a time."
     },
     {
      "predict": {
       "q": "Which part makes sperm in the male system, and which makes eggs in the female system?",
       "options": [
        "The testes make sperm and the ovaries make eggs.",
        "The ovaries make sperm and the testes make eggs.",
        "Sperm and eggs are made in the same part in both systems."
       ],
       "answer": 0
      }
     },
     {
      "do": "Choose a part, then tap the word that names the part that is lit up."
     },
     {
      "observe": {
       "q": "Look back at the parts you named. Which part makes sperm?",
       "options": [
        "The testes make it",
        "The ovaries make it",
        "The womb makes it"
       ],
       "answer": 0
      }
     },
     {
      "note": "The testes make sperm and the ovaries make eggs. These are the male and female reproductive cells."
     }
    ]
   },
   {
    "id": "b",
    "title": "Fertilisation",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "A sperm and an egg are shown much bigger than they really are. Time is slowed down."
     },
     {
      "predict": {
       "q": "What happens when a sperm and an egg meet?",
       "options": [
        "They join to form one fertilised egg.",
        "Many sperm are needed to fertilise one egg.",
        "An egg is fertilised on its own, with no sperm."
       ],
       "answer": 0
      }
     },
     {
      "do": "Set the seconds, press Run, and read the gap between the sperm and the egg."
     },
     {
      "observe": {
       "q": "Look at your results table. As the seconds pass, the gap between sperm and egg…",
       "options": [
        "decreases",
        "stays the same",
        "increases"
       ],
       "answer": 0
      }
     },
     {
      "note": "Fertilisation happens when one sperm joins with one egg. The fertilised egg then settles in the womb and grows into a baby."
     }
    ]
   }
  ],
  "written": [
   {
    "kind": "define",
    "q": "What is fertilisation? [1]",
    "marks": 1,
    "concept": "Fertilisation is the joining of a sperm with an egg.",
    "model": "Fertilisation is when a sperm joins with an egg.",
    "points": [
     {
      "point": "a sperm joins (fuses) with an egg",
      "marks": 1
     }
    ],
    "alsoAccept": [
     "the joining of the male reproductive cell and the female reproductive cell",
     "when one sperm and one egg join to form a fertilised egg"
    ],
    "doNotAccept": [
     "when a baby is born",
     "when the egg grows on its own",
     "when a sperm leaves the testes",
     "when a sperm meets an egg (with no joining)"
    ]
   },
   {
    "kind": "explain",
    "q": "The testes and the ovaries make different reproductive cells. Explain why both kinds of cell are needed before a baby can start to grow. [2]",
    "marks": 2,
    "concept": "The testes make sperm and the ovaries make eggs; a sperm must join with an egg to form a fertilised egg, which grows into a baby.",
    "model": "The testes make sperm and the ovaries make eggs. A sperm must join with an egg to form a fertilised egg, and only a fertilised egg can grow into a baby.",
    "points": [
     {
      "point": "the testes make sperm and the ovaries make eggs",
      "marks": 1
     },
     {
      "point": "a sperm must join with an egg (fertilisation) to form a fertilised egg, which then grows into a baby",
      "marks": 1
     }
    ],
    "alsoAccept": [
     "an egg cannot grow into a baby unless a sperm joins with it"
    ],
    "doNotAccept": [
     "an egg can grow into a baby on its own",
     "the ovaries make sperm and the testes make eggs",
     "because there are males and females (only repeats the question)",
     "the two cells are needed so the baby can grow in the stomach"
    ]
   },
   {
    "kind": "explain",
    "q": "On the slow-motion stage, the egg was fertilised when the gap reached 0. A pupil says many sperm must join one egg to fertilise it. Explain why the pupil is wrong. [2]",
    "marks": 2,
    "concept": "Only one sperm joins with one egg in fertilisation.",
    "model": "Only one sperm joins with one egg. On the stage, one sperm swam to the egg and joined with it, and the egg was fertilised with no other sperm.",
    "points": [
     {
      "point": "fertilisation needs only one sperm to join with one egg",
      "marks": 1
     },
     {
      "point": "on the stage a single sperm reached the egg and joined with it, and the egg was then fertilised",
      "marks": 1
     }
    ],
    "doNotAccept": [
     "the more sperm that join, the better the egg grows",
     "an egg needs no sperm at all",
     "the pupil is wrong (with no reason)",
     "two sperm are needed, one from each parent"
    ]
   }
  ]
 },
 "p5-1-5a": {
  "status": "review",
  "minutes": 25,
  "bigIdea": "A flower's stamen is its male part and its pistil is its female part. Pollination is pollen moving from an anther to a stigma. The ovary holds the ovules that can become seeds. Bright petals, scent and nectar attract insects. Light, powdery pollen suits the wind.",
  "aim": "A large flower turns on a stand with its petals closed. Open it to find its male and female parts. Then compare two flowers to see how pollination works.",
  "safety": [
   "Pollen can cause allergies. Wash your hands after touching real flowers."
  ],
  "sim": {
   "page": "labs/p5-1-5a/index.html",
   "label": "Let's test it now!",
   "covers": [
    "a",
    "b"
   ],
   "map": {
    "a": "inside",
    "b": "pollinate"
   }
  },
  "badge": {
   "icon": "🌸",
   "name": "Flower Parts and Pollination",
   "line": "You predicted, tested and explained every part of Flower Parts and Pollination."
  },
  "parts": [
   {
    "id": "a",
    "title": "Inside a flower",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "The flower is cut open so you can see inside. One part lights up at a time."
     },
     {
      "predict": {
       "q": "Which parts of the flower are male, and which are female?",
       "options": [
        "The stamen is male and the pistil is female.",
        "The petals are the parts that make pollen.",
        "A flower has only one reproductive part."
       ],
       "answer": 0
      }
     },
     {
      "do": "Choose a part of the flower, then tap the word that names it."
     },
     {
      "observe": {
       "q": "Look back at the parts you named. Which two parts belong to the male stamen?",
       "options": [
        "The anther and the filament",
        "The stigma and the style",
        "The petal and the ovary"
       ],
       "answer": 0
      }
     },
     {
      "note": "The stamen is the male part: the anther and filament. The pistil is the female part: the stigma, style and ovary."
     }
    ]
   },
   {
    "id": "b",
    "title": "Which way to pollinate?",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "A flower has small, dull petals, no scent and light, powdery pollen."
     },
     {
      "predict": {
       "q": "Is it more likely to be pollinated by insects or by wind?",
       "options": [
        "By wind.",
        "By insects, since they visit most gardens.",
        "By wind, but only if its petals are bright."
       ],
       "answer": 0
      }
     },
     {
      "do": "Pick a flower, read its petals, scent and pollen, then tap the pollinator that fits."
     },
     {
      "observe": {
       "q": "Look back at the two flowers. Which features suit insect pollination?",
       "options": [
        "Bright petals, scent and sticky pollen",
        "Dull petals, no scent and light pollen",
        "Light, powdery pollen only"
       ],
       "answer": 0
      }
     },
     {
      "note": "Pollination is pollen moving from an anther to a stigma. Bright petals and scent attract insects. Light, powdery pollen suits the wind."
     }
    ]
   }
  ],
  "written": [
   {
    "kind": "define",
    "q": "What is pollination? [1]",
    "marks": 1,
    "concept": "Pollination is the movement of pollen from an anther to a stigma.",
    "model": "Pollination is when pollen moves from an anther to a stigma.",
    "points": [
     {
      "point": "pollen moves (is carried) from an anther to a stigma",
      "marks": 1
     }
    ],
    "alsoAccept": [
     "the transfer of pollen from the male part (anther) of a flower to the female part (stigma)",
     "pollen from the anther lands on the stigma"
    ],
    "doNotAccept": [
     "pollen moving from a stigma to an anther",
     "when a bee visits a flower (with nothing about pollen reaching the stigma)",
     "when a seed is made",
     "pollen falling onto the petals"
    ]
   },
   {
    "kind": "explain",
    "q": "When you opened the flower, the ovary was at the base of the pistil. Explain why the ovary is an important part of the flower. [2]",
    "marks": 2,
    "concept": "The ovary holds the ovules, and the ovules can become seeds.",
    "model": "The ovary holds the ovules. The ovules can become seeds, so without the ovary the flower could not make seeds.",
    "points": [
     {
      "point": "the ovary holds (contains) the ovules",
      "marks": 1
     },
     {
      "point": "the ovules can become seeds",
      "marks": 1
     }
    ],
    "alsoAccept": [
     "the ovules inside the ovary can become seeds"
    ],
    "doNotAccept": [
     "the ovary makes pollen",
     "the ovary catches pollen",
     "the ovary holds up the anther",
     "it is the female part (with nothing about ovules or seeds)"
    ]
   },
   {
    "kind": "explain",
    "q": "The bright flower had bright petals, a sweet scent and sticky pollen. Explain how these features help it to be pollinated by insects. [2]",
    "marks": 2,
    "concept": "Bright petals and scent attract insects; sticky pollen clings to an insect and is carried to another flower.",
    "model": "The bright petals and sweet scent attract insects to the flower. The sticky pollen clings to an insect's body and is carried to the stigma of the next flower it visits.",
    "points": [
     {
      "point": "the bright petals and the sweet scent attract insects to the flower",
      "marks": 1
     },
     {
      "point": "the sticky pollen clings to the insect's body and is carried to (the stigma of) another flower",
      "marks": 1
     }
    ],
    "doNotAccept": [
     "they help the wind to blow the pollen away",
     "the petals make the pollen",
     "they make the flower look nice (with nothing about insects)",
     "the insects eat all the pollen, so the flower is pollinated"
    ]
   }
  ]
 },
 "p5-1-5b": {
  "status": "review",
  "minutes": 25,
  "bigIdea": "Seeds are dispersed by wind, water, animals or splitting. A seed's features match its method: winged, waterproof, hooked or held in a pod. Dispersal spreads young plants away from the parent. This stops them crowding each other for light, water and space.",
  "aim": "A tray holds four seeds: winged, floating, hooked and a pod. Check what each seed looks like. Then send each along its own lane and see how far it lands.",
  "safety": [],
  "sim": {
   "page": "labs/p5-1-5b/index.html",
   "label": "Let's test it now!",
   "covers": [
    "a",
    "b"
   ],
   "map": {
    "a": "check",
    "b": "send"
   }
  },
  "badge": {
   "icon": "🌰",
   "name": "Seed Dispersal",
   "line": "You predicted, tested and explained every part of Seed Dispersal."
  },
  "parts": [
   {
    "id": "a",
    "title": "Check the seed",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "A seed is covered in small hooks. The hooks are a clue to how it travels."
     },
     {
      "predict": {
       "q": "How is a seed with hooks all over its coat most likely to be dispersed?",
       "options": [
        "By animals.",
        "By water.",
        "By wind."
       ],
       "answer": 0
      }
     },
     {
      "do": "Pick a seed, read its clue, then tap the way it is dispersed."
     },
     {
      "observe": {
       "q": "Look back at the seeds you matched. A seed with hooks is dispersed by…",
       "options": [
        "animals",
        "water",
        "wind"
       ],
       "answer": 0
      }
     },
     {
      "note": "A seed's shape and coat are clues to how it is dispersed. It travels by wind, water, animals or splitting."
     }
    ]
   },
   {
    "id": "b",
    "title": "Send it off",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "Each seed is sent along its own lane. A ruler shows the distance from the parent plant."
     },
     {
      "predict": {
       "q": "Which set-up will send its seed the furthest from the parent plant?",
       "options": [
        "Water, with a seed that floats.",
        "The splitting pod.",
        "They all send the seed the same distance."
       ],
       "answer": 0
      }
     },
     {
      "do": "Launch a seed in each lane and measure how far it lands. The four lanes show four ways a seed travels."
     },
     {
      "observe": {
       "q": "Look at the bars. Which set-up sent its seed the shortest distance?",
       "options": [
        "Splitting pod",
        "Wind",
        "Water"
       ],
       "answer": 0
      }
     },
     {
      "note": "Seeds travel away from the parent by wind, water, animals or splitting. This is not a fair test, because more than one thing changes."
     }
    ]
   }
  ],
  "written": [
   {
    "kind": "define",
    "q": "What is seed dispersal? [1]",
    "marks": 1,
    "concept": "Seed dispersal is the carrying or scattering of seeds away from the parent plant.",
    "model": "Seed dispersal is when seeds are carried or scattered away from the parent plant.",
    "points": [
     {
      "point": "seeds are carried (scattered, moved) away from the parent plant",
      "marks": 1
     }
    ],
    "alsoAccept": [
     "seeds travelling away from the parent plant by wind, water, animals or splitting",
     "the spreading of seeds away from the plant they came from"
    ],
    "doNotAccept": [
     "seeds growing into new plants",
     "planting seeds in the soil",
     "pollen moving from one flower to another",
     "seeds falling (with nothing about moving away from the parent plant)"
    ]
   },
   {
    "kind": "explain",
    "q": "On the seed tray, the seed with hooks all over its coat is dispersed by animals. Explain how the hooks help this seed to be dispersed. [2]",
    "marks": 2,
    "concept": "Hooks catch on an animal's fur, so the animal carries the seed away from the parent plant.",
    "model": "The hooks catch on the fur of an animal that brushes past. When the animal moves away, it carries the seed with it, away from the parent plant.",
    "points": [
     {
      "point": "the hooks catch on (stick to) the fur of an animal",
      "marks": 1
     },
     {
      "point": "the animal moves and carries the seed away from the parent plant",
      "marks": 1
     }
    ],
    "alsoAccept": [
     "the seed clings to an animal's fur and drops off somewhere else, far from the parent plant"
    ],
    "doNotAccept": [
     "the hooks help the seed to float on water",
     "the hooks catch the wind",
     "animals eat the hooks",
     "the hooks hold the seed on to the parent plant"
    ]
   },
   {
    "kind": "explain",
    "q": "In your results, every seed landed some distance away from the parent plant. Explain why this is good for the young plants. [2]",
    "marks": 2,
    "concept": "Dispersal spreads young plants away from the parent, so they are not crowded and do not have to share light, water and space.",
    "model": "The young plants do not grow crowded around the parent plant. They have more space, light and water, so they can grow well.",
    "points": [
     {
      "point": "the young plants do not grow crowded around the parent plant (or around each other)",
      "marks": 1
     },
     {
      "point": "so they get more light, water and space (they do not have to share these with the parent plant)",
      "marks": 1
     }
    ],
    "alsoAccept": [
     "they do not have to compete with the parent plant for light, water and space"
    ],
    "doNotAccept": [
     "the seeds turn into fruits sooner",
     "the parent plant grows faster once its seeds have gone",
     "the seeds no longer need water",
     "so that the seeds can travel far (only repeats the question)"
    ]
   }
  ]
 },
 "p5-1-5c": {
  "status": "review",
  "minutes": 30,
  "bigIdea": "A seed needs water and warmth to germinate. It needs air too. Light is not needed for a seed to germinate. A fair test changes only one condition and keeps the others the same. Any difference found can then be linked to that one condition.",
  "aim": "Two trays, A and B, each hold five bean seeds on cotton wool. A day dial runs a whole week in seconds. One condition differs between the trays each time to find what a seed needs to germinate.",
  "safety": [],
  "sim": {
   "page": "labs/p5-1-5c/index.html",
   "label": "Let's test it now!",
   "covers": [
    "a",
    "b",
    "c"
   ],
   "map": {
    "a": "water",
    "b": "warmth",
    "c": "light"
   }
  },
  "badge": {
   "icon": "🌱",
   "name": "Conditions for Germination",
   "line": "You predicted, tested and explained every part of Conditions for Germination."
  },
  "parts": [
   {
    "id": "a",
    "title": "Water test",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "Tray A gets no water. Tray B gets water every day. Each tray holds five seeds."
     },
     {
      "predict": {
       "q": "Which tray's seeds will germinate after a week?",
       "options": [
        "Only tray B, the one with water.",
        "Both trays. A bean holds enough water of its own.",
        "The tray nearer the window, with or without water."
       ],
       "answer": 0
      }
     },
     {
      "do": "Choose a tray and press Run to let a week pass. Count the seeds that have germinated."
     },
     {
      "observe": {
       "q": "Read your bar chart. In which tray did the seeds germinate?",
       "options": [
        "Tray B, with water",
        "Tray A, with no water",
        "Both trays, equally"
       ],
       "answer": 0
      }
     },
     {
      "note": "Water is needed for a seed to germinate. The seeds in the tray with no water did not change."
     }
    ]
   },
   {
    "id": "b",
    "title": "Warmth test",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "Both trays get the same water. Tray A sits on a warm table. Tray B sits in a cold refrigerator."
     },
     {
      "predict": {
       "q": "Which tray's seeds will germinate after a week?",
       "options": [
        "Only tray A, on the warm table.",
        "Both trays. Cold has no effect on a seed that has water.",
        "Tray B. The refrigerator keeps the seeds fresh."
       ],
       "answer": 0
      }
     },
     {
      "do": "Choose a tray and press Run to let a week pass. Count the seeds that have germinated."
     },
     {
      "observe": {
       "q": "Read your bar chart. In which tray did the seeds germinate?",
       "options": [
        "Tray A, on the warm table",
        "Tray B, in the refrigerator",
        "Both trays, equally"
       ],
       "answer": 0
      }
     },
     {
      "note": "Warmth is needed for a seed to germinate. The seeds in the cold refrigerator did not germinate."
     }
    ]
   },
   {
    "id": "c",
    "title": "Light test",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "Both trays get the same water and warmth. Tray A sits in a covered box. Tray B sits in daylight."
     },
     {
      "predict": {
       "q": "Which tray's seeds will germinate after a week?",
       "options": [
        "Both trays.",
        "Only tray B, in the light.",
        "Only tray A. Seeds germinate best in the dark."
       ],
       "answer": 0
      }
     },
     {
      "do": "Choose a tray and press Run to let a week pass. Count the seeds that have germinated."
     },
     {
      "observe": {
       "q": "Read your bar chart. Did the seeds in the covered box germinate as well as those in daylight?",
       "options": [
        "Yes. Both trays germinated.",
        "No. Only the tray in daylight did.",
        "No. Only the covered tray did."
       ],
       "answer": 0
      }
     },
     {
      "note": "Light is not needed for a seed to germinate. Water, air and warmth are needed."
     }
    ]
   }
  ],
  "written": [
   {
    "kind": "define",
    "q": "What does germinate mean? [1]",
    "marks": 1,
    "concept": "A seed germinates when it starts to grow into a young plant.",
    "model": "A seed germinates when it starts to grow into a young plant.",
    "points": [
     {
      "point": "a seed starts to grow (into a young plant)",
      "marks": 1
     }
    ],
    "alsoAccept": [
     "the seed coat splits and a root comes out",
     "a seed begins to sprout"
    ],
    "doNotAccept": [
     "when a plant makes seeds",
     "when a seed is planted in soil",
     "when a plant grows flowers",
     "when a seed is carried away from its parent plant"
    ]
   },
   {
    "kind": "explain",
    "q": "In the water test, the seeds in tray A did not germinate but most of the seeds in tray B did. Explain why. [2]",
    "marks": 2,
    "concept": "A seed needs water to germinate; water was the only thing that differed between the two trays.",
    "model": "A seed needs water to germinate. Tray A had no water but tray B had water added, so only the seeds in tray B could germinate.",
    "points": [
     {
      "point": "a seed needs water to germinate",
      "marks": 1
     },
     {
      "point": "tray A had no water and tray B had water (water was the only difference between the trays)",
      "marks": 1
     }
    ],
    "doNotAccept": [
     "tray A was too cold",
     "tray A had no light",
     "the seeds in tray A were bad seeds",
     "tray B was nearer the window"
    ]
   },
   {
    "kind": "explain",
    "q": "In the warmth test, both trays had the same water, but the seeds in the refrigerator did not germinate. Explain why. [2]",
    "marks": 2,
    "concept": "A seed needs warmth to germinate; having water is not enough when it is too cold.",
    "model": "A seed needs warmth to germinate as well as water. The refrigerator was too cold, so the seeds in it did not germinate even though they had water.",
    "points": [
     {
      "point": "a seed needs warmth to germinate (water alone is not enough)",
      "marks": 1
     },
     {
      "point": "the refrigerator was too cold, so those seeds did not germinate (warmth was the only thing that differed from the tray on the warm table)",
      "marks": 1
     }
    ],
    "doNotAccept": [
     "the seeds in the refrigerator had no water",
     "the refrigerator is dark and seeds need light to germinate",
     "the refrigerator kept the seeds fresh",
     "the seeds were in the refrigerator (only repeats the question)"
    ]
   }
  ]
 },
 "p5-1-5d": {
  "status": "review",
  "minutes": 25,
  "bigIdea": "A flowering plant's story runs in order: pollination, fertilisation, seed dispersal, then germination. Each stage depends on the one before it. Different plants use different features to succeed at each stage. The whole story turns one flower into a new, growing plant.",
  "aim": "Three plant cards are laid out: a garden flower, a grass and a fruit tree. Read their clues. Then turn the day dial to carry a flower through its whole story.",
  "safety": [],
  "sim": {
   "page": "labs/p5-1-5d/index.html",
   "label": "Let's test it now!",
   "covers": [
    "a",
    "b"
   ],
   "map": {
    "a": "pick",
    "b": "story"
   }
  },
  "badge": {
   "icon": "🌼",
   "name": "The Flowering Plant Story",
   "line": "You predicted, tested and explained every part of The Flowering Plant Story."
  },
  "parts": [
   {
    "id": "a",
    "title": "Pick a plant",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "Three plant cards show a garden flower, a grass and a fruit tree. Each one has clues about how it spreads."
     },
     {
      "predict": {
       "q": "Whose pollen will most likely travel on an insect?",
       "options": [
        "The garden flower, with bright petals and a sweet scent.",
        "The grass, with the smallest, dullest flowers.",
        "All of them equally, since wind carries any pollen."
       ],
       "answer": 0
      }
     },
     {
      "do": "Pick a plant card, read its clues, then tap the answer they point to."
     },
     {
      "observe": {
       "q": "Look back at the three cards. The garden flower's pollen travels on…",
       "options": [
        "an insect",
        "the wind",
        "water"
       ],
       "answer": 0
      }
     },
     {
      "note": "A plant's petals, scent, pollen and fruit are clues. They point to how it is pollinated and how its seeds are dispersed."
     }
    ]
   },
   {
    "id": "b",
    "title": "Run the story",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "The dial carries a garden flower from day 0 to day 60. It passes through four stages."
     },
     {
      "predict": {
       "q": "After pollination, what is the very next stage the plant reaches?",
       "options": [
        "Fertilisation.",
        "Seed dispersal, so the young plant is scattered first.",
        "Germination, straight after pollination."
       ],
       "answer": 0
      }
     },
     {
      "do": "Turn the dial to a day and press Run. Read which stage the plant has reached."
     },
     {
      "observe": {
       "q": "Look at your results table. As the days pass, the stage reached…",
       "options": [
        "increases",
        "stays the same",
        "decreases"
       ],
       "answer": 0
      }
     },
     {
      "note": "A flowering plant's story runs in order: pollination, then fertilisation, then seed dispersal, then germination."
     }
    ]
   }
  ],
  "written": [
   {
    "kind": "define",
    "q": "In a flowering plant, what is fertilisation? [1]",
    "marks": 1,
    "concept": "Fertilisation in a flowering plant is the joining of the male cell with the female cell.",
    "model": "Fertilisation is when the male cell joins with the female cell inside the flower.",
    "points": [
     {
      "point": "a male (reproductive) cell joins with a female (reproductive) cell",
      "marks": 1
     }
    ],
    "alsoAccept": [
     "the male cell from the pollen joins with the female cell in the ovule",
     "the male and female cells join so that a seed can form"
    ],
    "doNotAccept": [
     "pollen landing on the stigma (that is pollination)",
     "a seed starting to grow",
     "seeds being scattered away from the plant",
     "an insect visiting the flower"
    ]
   },
   {
    "kind": "explain",
    "q": "The fruit tree card showed sweet, juicy fruits with seeds inside. Explain how these fruits help the tree's seeds to be dispersed. [2]",
    "marks": 2,
    "concept": "Juicy fruit is food for animals; animals that eat the fruit carry the seeds away from the parent plant.",
    "model": "Animals eat the sweet, juicy fruits. The seeds are inside the fruits, so the animals carry the seeds away from the parent tree and leave them somewhere else.",
    "points": [
     {
      "point": "animals are attracted to the sweet, juicy fruits and eat them",
      "marks": 1
     },
     {
      "point": "the seeds inside are carried away from the parent tree by the animals (and left somewhere else)",
      "marks": 1
     }
    ],
    "alsoAccept": [
     "animals eat the fruit and the seeds pass out in their droppings far from the parent tree"
    ],
    "doNotAccept": [
     "the wind blows the juicy fruits far away",
     "the fruit dries, splits and flings the seeds out",
     "the fruits attract insects that carry the pollen (mixes up pollination and dispersal)",
     "the juicy fruit makes the seeds grow faster"
    ]
   },
   {
    "kind": "explain",
    "q": "On the story stage, seed dispersal came only after fertilisation. Explain why seeds cannot be dispersed before fertilisation happens. [2]",
    "marks": 2,
    "concept": "Seeds form only after fertilisation, so each stage depends on the one before it.",
    "model": "Seeds form only after fertilisation, when the male and female cells have joined. Before that there are no seeds, and a seed cannot be scattered before it has formed.",
    "points": [
     {
      "point": "seeds form only after fertilisation (after the male and female cells have joined)",
      "marks": 1
     },
     {
      "point": "so before fertilisation there are no seeds to scatter: a seed cannot be dispersed before it has formed",
      "marks": 1
     }
    ],
    "alsoAccept": [
     "each stage depends on the one before it: dispersal needs seeds, and seeds need fertilisation first"
    ],
    "doNotAccept": [
     "seeds are scattered first and fertilised afterwards",
     "the seed must germinate before it is dispersed",
     "because that is the order of the stages (only repeats the question)",
     "the wind is not strong enough until later"
    ]
   }
  ]
 },
 "p5-1-6": {
  "status": "review",
  "minutes": 25,
  "bigIdea": "Fertilisation happens in the reproduction of both humans and flowering plants. In both, a male cell joins a female cell. Flowering plants need pollination first. Humans do not have this extra stage. The parts and places involved look very different.",
  "aim": "Two stands stand side by side: a plain human reproductive system and a flower. Sort statements into a Similar bin and a Different bin. Then play both together.",
  "safety": [],
  "sim": {
   "page": "labs/p5-1-6/index.html",
   "label": "Let's test it now!",
   "covers": [
    "a",
    "b"
   ],
   "map": {
    "a": "sort",
    "b": "split"
   }
  },
  "badge": {
   "icon": "⚖️",
   "name": "Reproduction Compared",
   "line": "You predicted, tested and explained every part of Reproduction Compared."
  },
  "parts": [
   {
    "id": "a",
    "title": "Similar or different",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "A human and a flowering plant each make a male cell and a female cell. The two cells must join."
     },
     {
      "predict": {
       "q": "Is this a similarity or a difference between the two?",
       "options": [
        "A similarity. Both need the two cells to join.",
        "A difference. Only humans make a male and a female cell.",
        "A difference. Only plants go through fertilisation."
       ],
       "answer": 0
      }
     },
     {
      "do": "Choose a statement, then tap Similar or Different to sort it."
     },
     {
      "observe": {
       "q": "Look back at the statements. Both humans and plants go through…",
       "options": [
        "fertilisation",
        "pollination",
        "a womb stage"
       ],
       "answer": 0
      }
     },
     {
      "note": "Both humans and flowering plants go through fertilisation. A male and a female cell join. The parts involved look very different."
     }
    ]
   },
   {
    "id": "b",
    "title": "Side by side",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "In a flowering plant, pollination comes before fertilisation. Both sides will play together."
     },
     {
      "predict": {
       "q": "Does a matching pollination stage happen in humans?",
       "options": [
        "No. Humans have no pollination stage.",
        "Yes. Humans have an identical pollination stage.",
        "No. Plants skip pollination, just like humans."
       ],
       "answer": 0
      }
     },
     {
      "do": "Choose a stage, watch both sides, then tap where that stage happens."
     },
     {
      "observe": {
       "q": "Look back at the three stages. Which stage did only the flowering plant have?",
       "options": [
        "The pollination stage",
        "The fertilisation stage",
        "The young starting to grow"
       ],
       "answer": 0
      }
     },
     {
      "note": "Flowering plants need pollination before fertilisation can happen. Humans do not have a matching pollination stage."
     }
    ]
   }
  ],
  "written": [
   {
    "kind": "define",
    "q": "What is fertilisation? [1]",
    "marks": 1,
    "concept": "Fertilisation is the joining of a male reproductive cell with a female reproductive cell.",
    "model": "Fertilisation is when a male cell joins with a female cell.",
    "points": [
     {
      "point": "a male (reproductive) cell joins with a female (reproductive) cell",
      "marks": 1
     }
    ],
    "alsoAccept": [
     "a sperm joins with an egg",
     "the male and female reproductive cells join to form a fertilised egg"
    ],
    "doNotAccept": [
     "pollen being carried to a stigma (that is pollination)",
     "the young starting to grow",
     "a baby being born",
     "a male cell meets a female cell (with no joining)"
    ]
   },
   {
    "kind": "explain",
    "q": "In the sorting task, you found that fertilisation happens in both humans and flowering plants. Explain what is the same about it in the two, and what is different. [2]",
    "marks": 2,
    "concept": "The process is the same (a male cell joins a female cell) but the parts and places involved are different.",
    "model": "In both, a male cell joins with a female cell. The parts are different: in a human a sperm joins an egg inside the body, but in a flowering plant the male cell joins the female cell inside the flower.",
    "points": [
     {
      "point": "the same: in both, a male cell joins with a female cell",
      "marks": 1
     },
     {
      "point": "different: the parts or the place (in a human a sperm joins an egg inside the body; in a flowering plant it happens inside the flower, in the ovule)",
      "marks": 1
     }
    ],
    "alsoAccept": [
     "both have fertilisation, but humans have sperm, eggs and a womb while a plant has pollen, a stigma and ovules"
    ],
    "doNotAccept": [
     "it happens in a womb in both",
     "plants do not have fertilisation",
     "it is exactly the same in both",
     "both reproduce (only repeats the question)"
    ]
   },
   {
    "kind": "explain",
    "q": "When both sides played together, only the flowering plant had a pollination stage. Explain why humans do not have a pollination stage. [2]",
    "marks": 2,
    "concept": "Pollination carries pollen to a stigma, which only flowers have; in humans the sperm swim along a tube to meet the egg.",
    "model": "Pollination is pollen being carried to a stigma, and humans have no pollen or flower parts. In humans the sperm swim along a tube to meet the egg, so no pollination is needed.",
    "points": [
     {
      "point": "pollination is the carrying of pollen to a stigma, and humans have no pollen or stigma (no flower parts)",
      "marks": 1
     },
     {
      "point": "in humans the sperm swim along a tube to meet the egg, so the male cell reaches the female cell without pollination",
      "marks": 1
     }
    ],
    "doNotAccept": [
     "humans have a pollination stage too",
     "because humans are not plants (with no reason given)",
     "humans do not have fertilisation",
     "because the young grows in a womb"
    ]
   }
  ]
 },
 "p5-1-7": {
  "status": "review",
  "minutes": 25,
  "bigIdea": "A plant's growth, flowers and fruit decide how far and how fast its seeds spread. A fast-spreading new plant competes with plants already there for light, water and space. As the new plant's numbers rise, the numbers of the others can fall. Comparing a plot with the new plant to one without shows this fairly.",
  "aim": "A new plant stands beside two matching plots of land. Each plot has ten established plants. Check the new plant's features. Then run a season and see what it does.",
  "safety": [],
  "sim": {
   "page": "labs/p5-1-7/index.html",
   "label": "Let's test it now!",
   "covers": [
    "a",
    "b"
   ],
   "map": {
    "a": "features",
    "b": "plots"
   }
  },
  "badge": {
   "icon": "🌿",
   "name": "A New Plant Moves In",
   "line": "You predicted, tested and explained every part of A New Plant Moves In."
  },
  "parts": [
   {
    "id": "a",
    "title": "Check its features",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "The new plant grows quickly in both shade and sun. It has small white flowers and many tiny, juicy fruits."
     },
     {
      "predict": {
       "q": "What does this suggest about how its seeds spread?",
       "options": [
        "Animals eat the fruits and spread the seeds far and wide.",
        "The seeds can only fall straight down near the parent.",
        "The plant cannot be pollinated at all."
       ],
       "answer": 0
      }
     },
     {
      "do": "Choose a feature of the new plant, then tap what it suggests."
     },
     {
      "observe": {
       "q": "Look back at the features you matched. Together, they help the plant to…",
       "options": [
        "spread quickly and widely",
        "stay close to its parent",
        "avoid making seeds"
       ],
       "answer": 0
      }
     },
     {
      "note": "A plant's growth speed, flower type and fruit type together decide how it spreads. It can move quickly and widely into new ground."
     }
    ]
   },
   {
    "id": "b",
    "title": "Watch the plots",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "Plot B has the new plant introduced. Plot A has none. Both start with ten established plants."
     },
     {
      "predict": {
       "q": "After a season, how many established plants will each plot have?",
       "options": [
        "Fewer in plot B. Plot A stays the same.",
        "The same in both. The new plant has no effect on the others.",
        "More in plot B, since plants always help each other grow."
       ],
       "answer": 0
      }
     },
     {
      "do": "Turn the dial to a week and press Run. Compare the plants left in plot B with plot A."
     },
     {
      "observe": {
       "q": "Compare plot B with plot A at the same week. As the weeks pass, plot B has…",
       "options": [
        "fewer plants than plot A",
        "the same number as plot A",
        "more plants than plot A"
       ],
       "answer": 0
      }
     },
     {
      "note": "At the same week, plot A kept all ten plants but plot B lost some. The new plant competes with them for light, water and space."
     }
    ]
   }
  ],
  "written": [
   {
    "kind": "define",
    "q": "What does it mean when plants compete with each other? [1]",
    "marks": 1,
    "concept": "Plants compete when they need the same light, water and space and there is not enough for all of them.",
    "model": "Plants compete when they all need the same light, water and space, and there is not enough for all of them.",
    "points": [
     {
      "point": "the plants need (try to get) the same things, such as light, water and space, when there is not enough for all of them",
      "marks": 1
     }
    ],
    "alsoAccept": [
     "they struggle to get the same light, water and space, so some of them lose out",
     "each plant takes light, water and space that the others also need"
    ],
    "doNotAccept": [
     "the plants help each other to grow",
     "the plants race to see which is tallest",
     "the plants grow in the same plot (with nothing about needing the same things)",
     "the plants fight each other"
    ]
   },
   {
    "kind": "explain",
    "q": "The feature cards showed that the new plant grows very quickly, and that it grows well in both shade and sun. Explain how these two features help it to spread. [2]",
    "marks": 2,
    "concept": "Fast growth lets a plant fill new ground quickly; growing in shade and sun lets it grow in many different places.",
    "model": "Because it grows very quickly, it can spread fast and fill new ground. Because it grows well in both shade and sun, it can grow in many different places.",
    "points": [
     {
      "point": "growing very quickly lets it spread fast and fill new ground",
      "marks": 1
     },
     {
      "point": "growing well in both shade and sun lets it grow in many different places",
      "marks": 1
     }
    ],
    "doNotAccept": [
     "it needs very little water",
     "it can only grow under trees",
     "its seeds cannot travel",
     "it grows fast, so it spreads (only repeats the question, with nothing about shade and sun)"
    ]
   },
   {
    "kind": "explain",
    "q": "Plot A was kept without the new plant, and it matched plot B in every other way. Explain why plot A was needed. [2]",
    "marks": 2,
    "concept": "A matching plot without the new plant allows a fair comparison, so any difference can be linked to the new plant.",
    "model": "Plot A is there to compare with plot B. The only difference between the plots was the new plant, so the fall in the established plants in plot B can be linked to the new plant.",
    "points": [
     {
      "point": "plot A is for comparing with plot B: the new plant is the only thing that differs between the two plots (a fair comparison)",
      "marks": 1
     },
     {
      "point": "so the fall in the number of established plants in plot B can be linked to the new plant (plot A kept all ten)",
      "marks": 1
     }
    ],
    "alsoAccept": [
     "it shows what happens with no new plant, so we know the new plant caused the fall in plot B"
    ],
    "doNotAccept": [
     "to give the new plant more room to spread",
     "because plot A has more water and light",
     "to grow more plants",
     "to see if the plants in plot A grow taller"
    ]
   }
  ]
 },
 "p5-2-1": {
  "status": "review",
  "minutes": 25,
  "bigIdea": "Ice gains heat from its warmer surroundings. It melts at a fixed temperature, 0 °C. The reading stays at 0 °C for as long as ice is still turning into water. A bigger heap of ice simply takes longer to finish melting.",
  "aim": "A beaker of crushed ice stands in a warm room, with a thermometer resting in it. A clock turns minute by minute. Three beakers hold 30 g, 60 g and 90 g of ice.",
  "safety": [
   "Real ice is cold and wet, so dry your hands afterwards, and keep a thermometer bulb off your skin."
  ],
  "sim": {
   "page": "labs/p5-2-1/index.html",
   "label": "Let's test it now!",
   "covers": [
    "a",
    "b"
   ],
   "map": {
    "a": "watch",
    "b": "more"
   }
  },
  "badge": {
   "icon": "🧊",
   "name": "Ice Watch",
   "line": "You predicted, tested and explained every part of Ice Watch."
  },
  "parts": [
   {
    "id": "a",
    "title": "Watch the ice melt",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "Crushed ice stands in a warm room. The thermometer reads 0 °C at the start."
     },
     {
      "predict": {
       "q": "While ice is still in the beaker, what does the thermometer reading do?",
       "options": [
        "It stays at 0 °C, then rises once the ice is gone.",
        "It rises the whole time.",
        "It falls, because the ice is cold."
       ],
       "answer": 0
      }
     },
     {
      "do": "Read the thermometer at different minutes and see when the last ice is gone."
     },
     {
      "observe": {
       "q": "Look at the points from 0 to 6 minutes, while ice was still in the beaker. The temperature…",
       "options": [
        "stays the same",
        "increases",
        "decreases"
       ],
       "answer": 0
      }
     },
     {
      "note": "Ice gains heat from the warmer room and melts at 0 °C. Its temperature stays at 0 °C while any ice is left."
     }
    ]
   },
   {
    "id": "b",
    "title": "More ice, more time?",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "A small heap and a big heap of ice stand in the same warm room."
     },
     {
      "predict": {
       "q": "Which heap takes longer to melt away completely?",
       "options": [
        "The big heap takes longer.",
        "Both melt in the same time.",
        "The big heap melts first."
       ],
       "answer": 0
      }
     },
     {
      "do": "Time how long 30 g, 60 g and 90 g of ice take to melt away."
     },
     {
      "observe": {
       "q": "Look at the points. As the mass of ice increases, the time to melt…",
       "options": [
        "increases",
        "stays the same",
        "decreases"
       ],
       "answer": 0
      }
     },
     {
      "note": "A bigger mass of ice has more to melt, so it must gain more heat. It takes longer, but it still melts at 0 °C."
     }
    ]
   }
  ],
  "written": [
   {
    "kind": "define",
    "q": "What is melting? [1]",
    "marks": 1,
    "concept": "Melting is the change from a solid to a liquid when heat is gained.",
    "model": "Melting is when a solid changes into a liquid as it gains heat, like ice changing into liquid water.",
    "points": [
     {
      "point": "a solid changes into a liquid (for example, ice changes into liquid water)",
      "marks": 1
     }
    ],
    "alsoAccept": [
     "ice (solid water) gains heat and turns into liquid water",
     "the change of state from solid to liquid"
    ],
    "doNotAccept": [
     "ice disappearing",
     "water turning into ice",
     "ice getting warmer",
     "ice dissolving in water"
    ]
   },
   {
    "kind": "explain",
    "q": "In your results, the thermometer stayed at 0 °C while there was still ice in the beaker, even though the room was warm. Explain why. [2]",
    "marks": 2,
    "concept": "Ice gains heat from the warmer room and melts at a fixed temperature, 0 °C; its temperature stays at 0 °C while any ice is left.",
    "model": "The ice gains heat from the warmer room, and this heat makes the ice melt instead of making it warmer. Ice melts at 0 °C, so the temperature stays at 0 °C until all the ice has melted.",
    "points": [
     {
      "point": "the ice gains heat from the warmer room, and the heat gained melts the ice (changes it from solid to liquid) instead of making it warmer",
      "marks": 1
     },
     {
      "point": "ice melts at a fixed temperature, 0 °C, so the temperature stays at 0 °C until all the ice has melted",
      "marks": 1
     }
    ],
    "alsoAccept": [
     "the heat gained from the room is used to melt the ice, so the reading cannot rise above 0 °C while any ice is left"
    ],
    "doNotAccept": [
     "the ice was not gaining any heat",
     "the ice loses heat to the room",
     "cold from the ice moves into the thermometer",
     "the temperature stayed the same (only repeats the question)"
    ]
   },
   {
    "kind": "explain",
    "q": "In your results, a bigger mass of ice took longer to melt completely. Explain why. [2]",
    "marks": 2,
    "concept": "A bigger mass of ice has more to melt, so it must gain more heat, which takes longer.",
    "model": "A bigger mass has more ice to melt, so it must gain more heat from the warm room before it has all melted. Gaining more heat takes a longer time.",
    "points": [
     {
      "point": "a bigger mass has more ice to melt",
      "marks": 1
     },
     {
      "point": "so it must gain more heat from the warm room before all of it has melted, and this takes longer",
      "marks": 1
     }
    ],
    "doNotAccept": [
     "a bigger heap of ice is colder",
     "a bigger heap melts at a higher temperature",
     "the room is colder for the big heap",
     "it is bigger, so it takes longer (only repeats the question)"
    ]
   }
  ]
 },
 "p5-2-2": {
  "status": "review",
  "minutes": 25,
  "bigIdea": "Water gains heat from the flame and its temperature climbs. It boils at 100 °C, the boiling point. While it keeps boiling, the temperature stays at 100 °C. A stronger flame gets the water there sooner, but it never boils hotter.",
  "aim": "A beaker of water stands over a burner, with a thermometer in the water and a clock beside it. A second burner has a dial for the flame: low, medium or high.",
  "safety": [
   "A flame, boiling water and steam are hot. Keep your hands and face well back from the beaker."
  ],
  "sim": {
   "page": "labs/p5-2-2/index.html",
   "label": "Let's test it now!",
   "covers": [
    "a",
    "b"
   ],
   "map": {
    "a": "watch",
    "b": "flame"
   }
  },
  "badge": {
   "icon": "🔥",
   "name": "Boiling Point",
   "line": "You predicted, tested and explained every part of Boiling Point."
  },
  "parts": [
   {
    "id": "a",
    "title": "Watch the water boil",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "Water at room temperature sits over a burner. The flame will heat it."
     },
     {
      "predict": {
       "q": "Once steady bubbles break the surface, what does the thermometer reading do?",
       "options": [
        "It stays at 100 °C.",
        "It keeps climbing.",
        "It falls."
       ],
       "answer": 0
      }
     },
     {
      "do": "Read the thermometer at different minutes and see when the water starts to boil."
     },
     {
      "observe": {
       "q": "Look at the points from 8 to 12 minutes, while the water was boiling. The temperature…",
       "options": [
        "stays the same",
        "increases",
        "decreases"
       ],
       "answer": 0
      }
     },
     {
      "note": "Water gains heat from the flame until it boils at 100 °C. Its temperature stays at 100 °C while it keeps boiling."
     }
    ]
   },
   {
    "id": "b",
    "title": "Turn up the heat",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "Two identical beakers of water are heated, one on a low flame and one on a high flame."
     },
     {
      "predict": {
       "q": "Which reaches 100 °C sooner, and does either boil hotter than 100 °C?",
       "options": [
        "The high flame is sooner, and neither boils hotter.",
        "The high flame boils hotter than 100 °C.",
        "Both reach 100 °C at the same time."
       ],
       "answer": 0
      }
     },
     {
      "do": "Heat the water on a low, a medium and a high flame, and time how long it takes to boil."
     },
     {
      "observe": {
       "q": "Read your bar chart. Which flame made the water boil soonest?",
       "options": [
        "The high flame",
        "The low flame",
        "All the same"
       ],
       "answer": 0
      }
     },
     {
      "note": "A stronger flame gives heat to the water faster, so it boils sooner. Water still boils at 100 °C on every flame."
     }
    ]
   }
  ],
  "written": [
   {
    "kind": "define",
    "q": "What is meant by the boiling point of water? [1]",
    "marks": 1,
    "concept": "The boiling point is the fixed temperature at which water boils, which is 100 °C.",
    "model": "The boiling point of water is the temperature at which water boils. It is 100 °C.",
    "points": [
     {
      "point": "it is the temperature at which water boils (changes into water vapour or steam with steady bubbling)",
      "marks": 1
     }
    ],
    "alsoAccept": [
     "the fixed temperature, 100 °C, at which water boils",
     "the temperature at which boiling water stays while it keeps boiling"
    ],
    "doNotAccept": [
     "100 °C, with no mention that it is the temperature at which water boils",
     "the time water takes to boil",
     "when water gets hot",
     "the hottest that a flame can make water"
    ]
   },
   {
    "kind": "explain",
    "q": "In your results, the thermometer reading stayed at 100 °C while the water kept boiling. Explain why. [2]",
    "marks": 2,
    "concept": "Boiling water keeps gaining heat from the flame, but the heat changes the water into water vapour instead of raising its temperature.",
    "model": "The boiling water keeps gaining heat from the flame. This heat changes the water into water vapour instead of making it hotter, so the temperature stays at 100 °C, the boiling point of water.",
    "points": [
     {
      "point": "the boiling water is still gaining heat from the flame",
      "marks": 1
     },
     {
      "point": "the heat gained changes the water into water vapour (steam) instead of raising its temperature, so the reading stays at 100 °C (its boiling point)",
      "marks": 1
     }
    ],
    "alsoAccept": [
     "water boils at one fixed temperature, so the heat it gains goes into changing liquid water to water vapour"
    ],
    "doNotAccept": [
     "the water stops gaining heat once it boils",
     "the flame cannot get any hotter",
     "the thermometer cannot read above 100 °C",
     "the water is already boiling, so it stays at 100 °C (only repeats the question)"
    ]
   },
   {
    "kind": "explain",
    "q": "In your results, the water on the high flame started to boil sooner than the water on the low flame. Explain why. [2]",
    "marks": 2,
    "concept": "A stronger flame gives heat to the water faster, so the water reaches its boiling point of 100 °C in less time.",
    "model": "The water gains heat faster from the high flame than from the low flame. So its temperature rises faster and it reaches 100 °C, its boiling point, in a shorter time.",
    "points": [
     {
      "point": "the water gains heat faster from the high (stronger) flame",
      "marks": 1
     },
     {
      "point": "so its temperature rises faster and it reaches 100 °C (its boiling point) in less time",
      "marks": 1
     }
    ],
    "doNotAccept": [
     "the high flame makes the water boil at a higher temperature than 100 °C",
     "the high flame is hotter (with nothing about the water gaining heat faster)",
     "there is less water over the high flame",
     "the high flame is stronger, so the water boils sooner (only repeats the question)"
    ]
   }
  ]
 },
 "p5-2-3": {
  "status": "review",
  "minutes": 25,
  "bigIdea": "Water vapour is always in the air around us, and it cannot be seen. When it meets a surface that is cold enough, it loses heat to that surface. It then turns back into liquid droplets. This is condensation. The colder the surface, the more droplets tend to form.",
  "aim": "A beaker of cold water stands under a snug cover. A beaker of hot water waits beside it, with a lid you can choose. Water vapour cannot be seen, so dots on the bench show where it goes.",
  "safety": [
   "The hot-water beaker is warm enough to feel through the glass, so hold it by the stand, not the sides."
  ],
  "sim": {
   "page": "labs/p5-2-3/index.html",
   "label": "Let's test it now!",
   "covers": [
    "a",
    "b"
   ],
   "map": {
    "a": "cold",
    "b": "hot"
   }
  },
  "badge": {
   "icon": "💧",
   "name": "Cold Surface",
   "line": "You predicted, tested and explained every part of Cold Surface."
  },
  "parts": [
   {
    "id": "a",
    "title": "A cold, covered beaker",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "A beaker of cold water stands under a cover in a warm room."
     },
     {
      "predict": {
       "q": "Where will droplets of water collect?",
       "options": [
        "On the cold outer wall and the cover.",
        "Nowhere, until the cover is lifted.",
        "Where water seeps out through the glass."
       ],
       "answer": 0
      }
     },
     {
      "do": "Count the droplets that form on the outer wall, on the cover and inside the water."
     },
     {
      "observe": {
       "q": "Read your bar chart. Which part of the beaker collected the most droplets?",
       "options": [
        "The outer wall",
        "Inside the water",
        "All the same"
       ],
       "answer": 0
      }
     },
     {
      "note": "Water vapour in the air loses heat to the cold wall and the cooled cover, and turns into liquid droplets there."
     }
    ]
   },
   {
    "id": "b",
    "title": "A hot, covered beaker",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "Hot water in a covered beaker gives off water vapour. A lid is placed on top."
     },
     {
      "predict": {
       "q": "Which lid collects more droplets, a warm lid or a cold lid?",
       "options": [
        "The cold lid.",
        "The warm lid.",
        "Both the same."
       ],
       "answer": 0
      }
     },
     {
      "do": "Put a warm lid and a cold lid on the hot beaker, and count the droplets on each."
     },
     {
      "observe": {
       "q": "Read your bar chart. Which lid collected more droplets?",
       "options": [
        "The cold lid",
        "The warm lid",
        "Both the same"
       ],
       "answer": 0
      }
     },
     {
      "note": "The colder the lid, the more heat the rising water vapour loses to it, so more droplets form."
     }
    ]
   }
  ],
  "written": [
   {
    "kind": "define",
    "q": "What is condensation? [1]",
    "marks": 1,
    "concept": "Condensation is the change of water vapour (a gas) into liquid water when it loses heat.",
    "model": "Condensation is the change from water vapour to liquid water. It happens when the water vapour loses heat.",
    "points": [
     {
      "point": "it is the change from water vapour (gas) to liquid water (water droplets)",
      "marks": 1
     }
    ],
    "alsoAccept": [
     "water vapour losing heat and turning into liquid water",
     "the change of state from gas to liquid"
    ],
    "doNotAccept": [
     "the change from liquid water to water vapour (this is evaporation)",
     "water leaking through the glass",
     "water drops on a glass (names what is seen, not the change)",
     "water vapour turning into ice"
    ]
   },
   {
    "kind": "explain",
    "q": "In your results, more droplets formed on the outer wall of the cold beaker than on its cover. Explain why. [2]",
    "marks": 2,
    "concept": "The colder the surface, the more heat water vapour in the air loses to it, so more water vapour condenses into droplets there.",
    "model": "The outer wall touches the cold water, so it is colder than the cover. Water vapour in the air loses more heat to the colder wall, so more of it condenses into droplets there.",
    "points": [
     {
      "point": "the outer wall is colder than the cover (it is the part touching the cold water and ice)",
      "marks": 1
     },
     {
      "point": "water vapour in the air loses more heat to the colder surface, so more of it condenses (turns into liquid droplets) there",
      "marks": 1
     }
    ],
    "doNotAccept": [
     "the water inside seeps or leaks through the wall",
     "the cover stops water vapour from reaching it",
     "there is more water near the wall",
     "the wall has more droplets because it is wetter (only repeats the question)"
    ]
   },
   {
    "kind": "explain",
    "q": "In your results, droplets formed under the lid of the hot beaker. Explain where the water in these droplets came from. [2]",
    "marks": 2,
    "concept": "Hot water gives off water vapour, which rises, loses heat to the cooler lid and condenses into droplets.",
    "model": "The hot water in the beaker gave off water vapour, which rose up to the lid. The water vapour lost heat to the cooler lid and condensed into droplets of liquid water.",
    "points": [
     {
      "point": "the water came from the hot water in the beaker, which gave off water vapour that rose to the lid",
      "marks": 1
     },
     {
      "point": "the water vapour lost heat to the cooler lid and condensed (turned into liquid droplets)",
      "marks": 1
     }
    ],
    "alsoAccept": [
     "some of the hot water evaporated, and the water vapour condensed on the lid"
    ],
    "doNotAccept": [
     "the hot water splashed or jumped up onto the lid",
     "the lid made the water by itself",
     "the water came from the air outside the beaker",
     "the water vapour gained heat from the lid"
    ]
   }
  ]
 },
 "p5-2-4": {
  "status": "review",
  "minutes": 30,
  "bigIdea": "Water evaporates faster when it is warmer. It also evaporates faster from a larger exposed surface. It evaporates faster when moving air carries the water vapour away. Each factor was tested on its own, so the differences can be trusted.",
  "aim": "Three wet paper towels rest on frames over balances. A lamp warms the first, the second can be folded, and a fan stands beside the third. The balance shows the mass of the towel and its water.",
  "safety": [
   "The lamp gets hot, so hold it by its base and never by the part around the bulb."
  ],
  "sim": {
   "page": "labs/p5-2-4/index.html",
   "label": "Let's test it now!",
   "covers": [
    "a",
    "b",
    "c"
   ],
   "map": {
    "a": "warm",
    "b": "spread",
    "c": "wind"
   }
  },
  "badge": {
   "icon": "🧺",
   "name": "Drying Towels",
   "line": "You predicted, tested and explained every part of Drying Towels."
  },
  "parts": [
   {
    "id": "a",
    "title": "Warmer or cooler",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "Two identical wet towels start with the same mass. One sits near a lit lamp, the other far from it."
     },
     {
      "predict": {
       "q": "Which towel loses more mass by drying?",
       "options": [
        "The towel near the lamp.",
        "Both lose the same mass.",
        "The towel far from the lamp."
       ],
       "answer": 0
      }
     },
     {
      "do": "Place the towel near the lamp and far from it, and find the mass it loses in ten minutes."
     },
     {
      "observe": {
       "q": "Read your bar chart. Which towel lost more mass?",
       "options": [
        "The towel near the lamp",
        "The towel far from the lamp",
        "Both the same"
       ],
       "answer": 0
      }
     },
     {
      "note": "A warmer place makes water evaporate faster, so the towel near the lamp loses more mass."
     }
    ]
   },
   {
    "id": "b",
    "title": "Folded or spread out",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "Two identical wet towels start with the same mass. One lies flat, the other is folded in half."
     },
     {
      "predict": {
       "q": "Which towel loses more mass by drying?",
       "options": [
        "The flat towel.",
        "Both lose the same mass.",
        "The folded towel."
       ],
       "answer": 0
      }
     },
     {
      "do": "Lay the towel flat and fold it, and find the mass it loses in ten minutes."
     },
     {
      "observe": {
       "q": "Read your bar chart. Which towel lost more mass?",
       "options": [
        "The flat towel",
        "The folded towel",
        "Both the same"
       ],
       "answer": 0
      }
     },
     {
      "note": "A larger exposed surface lets water evaporate faster, so the flat towel loses more mass."
     }
    ]
   },
   {
    "id": "c",
    "title": "Still or moving air",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "Two identical wet towels start with the same mass. One sits in still air, the other in front of a running fan."
     },
     {
      "predict": {
       "q": "Which towel loses more mass by drying?",
       "options": [
        "The towel in front of the fan.",
        "Both lose the same mass.",
        "The towel in still air."
       ],
       "answer": 0
      }
     },
     {
      "do": "Switch the fan off and on, and find the mass the towel loses in ten minutes."
     },
     {
      "observe": {
       "q": "Read your bar chart. Which towel lost more mass?",
       "options": [
        "The towel with the fan on",
        "The towel with the fan off",
        "Both the same"
       ],
       "answer": 0
      }
     },
     {
      "note": "Moving air carries water vapour away from the surface faster, so the towel in front of the fan loses more mass."
     }
    ]
   }
  ],
  "written": [
   {
    "kind": "define",
    "q": "What is evaporation? [1]",
    "marks": 1,
    "concept": "Evaporation is the change of liquid water into water vapour (a gas), which can happen at any temperature.",
    "model": "Evaporation is the change from liquid water to water vapour. It happens at the surface of the water at any temperature.",
    "points": [
     {
      "point": "it is the change from liquid water to water vapour (a gas)",
      "marks": 1
     }
    ],
    "alsoAccept": [
     "liquid water gaining heat and turning into water vapour",
     "the change of state from liquid to gas"
    ],
    "doNotAccept": [
     "the change from water vapour to liquid water (this is condensation)",
     "water disappearing",
     "water drying up (everyday words, with no change to water vapour)",
     "water boiling at 100 °C"
    ]
   },
   {
    "kind": "explain",
    "q": "In your results, the flat towel lost more mass than the folded towel. Explain why. [2]",
    "marks": 2,
    "concept": "Water evaporates faster from a larger exposed surface, so more water leaves the towel in the same time.",
    "model": "The flat towel has a larger exposed surface than the folded towel. Water evaporates faster from a larger exposed surface, so more water left the flat towel in ten minutes and it lost more mass.",
    "points": [
     {
      "point": "the flat towel has a larger exposed surface (more of its surface faces the air) than the folded towel",
      "marks": 1
     },
     {
      "point": "water evaporates faster from a larger exposed surface, so more water left the flat towel (as water vapour) in the same time",
      "marks": 1
     }
    ],
    "doNotAccept": [
     "the flat towel holds more water",
     "the folded towel is thicker, so it is heavier",
     "the flat towel is nearer the lamp",
     "the flat towel dries faster (only repeats the question)"
    ]
   },
   {
    "kind": "explain",
    "q": "In your results, the towel in front of the fan lost more mass than the towel in still air. Explain why. [2]",
    "marks": 2,
    "concept": "Moving air carries water vapour away from the surface, so water evaporates faster.",
    "model": "The moving air from the fan carries the water vapour away from the towel. This lets the water evaporate faster, so more water left the towel in ten minutes and it lost more mass.",
    "points": [
     {
      "point": "the moving air (wind from the fan) carries water vapour away from the surface of the towel",
      "marks": 1
     },
     {
      "point": "so water evaporates faster from this towel, and more water leaves it in the same time",
      "marks": 1
     }
    ],
    "doNotAccept": [
     "the fan blows the water droplets off the towel",
     "the fan makes the towel warmer",
     "the fan cools the towel, so it dries",
     "the fan dries the towel (only repeats the question)"
    ]
   }
  ]
 },
 "p5-2-5": {
  "status": "review",
  "minutes": 25,
  "bigIdea": "The sun's warmth makes water evaporate from the sea. As the water vapour rises it loses heat to the air and condenses into clouds. When the clouds hold enough water, it falls as rain. The rain flows back to the sea, so the whole cycle can start again.",
  "aim": "A small sea lies beside low hills and a river. A sun crosses the sky as the hours pass. Dots on the bench follow the water vapour, which cannot really be seen.",
  "safety": [],
  "sim": {
   "page": "labs/p5-2-5/index.html",
   "label": "Let's test it now!",
   "covers": [
    "a",
    "b"
   ],
   "map": {
    "a": "rise",
    "b": "fall"
   }
  },
  "badge": {
   "icon": "🌧️",
   "name": "Sea to Sky",
   "line": "You predicted, tested and explained every part of Sea to Sky."
  },
  "parts": [
   {
    "id": "a",
    "title": "Rising and cooling",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "The sun shines on the sea all morning. Some of its water evaporates and rises. A pole beside the sea reads the air temperature."
     },
     {
      "predict": {
       "q": "As water vapour rises high above the sea, what happens to the air around it?",
       "options": [
        "It gets cooler.",
        "It stays the same.",
        "It gets warmer."
       ],
       "answer": 0
      }
     },
     {
      "do": "Read the air temperature at different heights above the sea as the water vapour rises."
     },
     {
      "observe": {
       "q": "Look at the points. As the height above the sea increases, the air temperature…",
       "options": [
        "decreases",
        "stays the same",
        "increases"
       ],
       "answer": 0
      }
     },
     {
      "note": "The sun's warmth makes water evaporate from the sea. Higher up, the air is cooler, so the rising water vapour loses heat to it."
     }
    ]
   },
   {
    "id": "b",
    "title": "Clouds, rain and flowing back",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "The rising water vapour keeps cooling as it climbs. A river runs from the hills to the sea."
     },
     {
      "predict": {
       "q": "What happens to the cooling water vapour next?",
       "options": [
        "It condenses into tiny droplets that gather as clouds.",
        "It stays as invisible vapour for ever.",
        "It turns into smoke over the hills."
       ],
       "answer": 0
      }
     },
     {
      "do": "Read the volume of water in the river at different hours as the clouds form and rain falls."
     },
     {
      "observe": {
       "q": "Look at the points. As the hours pass, the volume of water in the river…",
       "options": [
        "increases",
        "stays the same",
        "decreases"
       ],
       "answer": 0
      }
     },
     {
      "note": "Water vapour that loses heat condenses into clouds. The rain it makes fills the river, and the river carries the water back to the sea."
     }
    ]
   }
  ],
  "written": [
   {
    "kind": "define",
    "q": "What is the water cycle? [1]",
    "marks": 1,
    "concept": "The water cycle is the never-ending movement of water from the sea and land into the air and back again.",
    "model": "The water cycle is the movement of water from the sea into the air and back to the sea again, over and over. The water evaporates, condenses into clouds and falls as rain.",
    "points": [
     {
      "point": "it is the continuous movement of water from the Earth's surface (the sea) into the air and back again, by evaporation, condensation and rain",
      "marks": 1
     }
    ],
    "alsoAccept": [
     "water evaporates from the sea, condenses into clouds, falls as rain and flows back to the sea, again and again",
     "the way water keeps moving between the sea, the sky and the land"
    ],
    "doNotAccept": [
     "rain falling from the clouds (one step only)",
     "water flowing down a river (one step only)",
     "water going round in a circle in the sea",
     "the way water is cleaned for drinking"
    ]
   },
   {
    "kind": "explain",
    "q": "In your results, the air was cooler higher above the sea. Explain how this makes clouds form from the water vapour that rises from the sea. [2]",
    "marks": 2,
    "concept": "Rising water vapour loses heat to the cooler air higher up and condenses into tiny water droplets that gather as clouds.",
    "model": "As the water vapour rises, it loses heat to the cooler air around it. It condenses into tiny droplets of water, and these droplets gather to form clouds.",
    "points": [
     {
      "point": "the rising water vapour loses heat to the cooler air higher up",
      "marks": 1
     },
     {
      "point": "it condenses (changes into tiny droplets of liquid water), and the droplets gather as clouds",
      "marks": 1
     }
    ],
    "doNotAccept": [
     "clouds are made of water vapour that we can see",
     "clouds are made of smoke",
     "the water vapour gains heat from the cooler air",
     "the water vapour cools and makes clouds (no mention of condensing or droplets)"
    ]
   },
   {
    "kind": "explain",
    "q": "In your results, the volume of water in the river increased as the hours passed. Explain why. [2]",
    "marks": 2,
    "concept": "Water droplets in the clouds fall as rain, and the rain runs off the land into the river.",
    "model": "The clouds over the hills held more and more water droplets until the water fell as rain. The rain ran off the hills into the river, so there was more water in the river.",
    "points": [
     {
      "point": "rain fell from the clouds (the water droplets in the clouds fell as rain)",
      "marks": 1
     },
     {
      "point": "the rain water ran off the hills into the river, adding to the water in it",
      "marks": 1
     }
    ],
    "doNotAccept": [
     "water vapour went straight into the river",
     "the sea flowed up into the river",
     "the sun melted the clouds",
     "more water went into the river (only repeats the question)"
    ]
   }
  ]
 },
 "p5-2-6": {
  "status": "review",
  "minutes": 25,
  "bigIdea": "All living things need water to carry out their life processes. Because of this, water is precious and must be used wisely. Small habits, like turning off a running tap, add up to real savings. It is worth doing our part to conserve water.",
  "aim": "Two identical plants stand side by side, with a day dial beside them. A sink has a tap and a tank that tallies the litres of water used.",
  "safety": [],
  "sim": {
   "page": "labs/p5-2-6/index.html",
   "label": "Let's test it now!",
   "covers": [
    "a",
    "b"
   ],
   "map": {
    "a": "plant",
    "b": "tap"
   }
  },
  "badge": {
   "icon": "🚰",
   "name": "Every Drop Counts",
   "line": "You predicted, tested and explained every part of Every Drop Counts."
  },
  "parts": [
   {
    "id": "a",
    "title": "Watered or not",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "One plant is watered every day. The other gets no water at all."
     },
     {
      "predict": {
       "q": "After five days, which plant looks healthier?",
       "options": [
        "The plant that is watered.",
        "Both look about the same.",
        "The plant that is not watered."
       ],
       "answer": 0
      }
     },
     {
      "do": "Water one plant every day and leave the other dry, then score their health on day 5."
     },
     {
      "observe": {
       "q": "Read your bar chart. Which plant had the higher health score?",
       "options": [
        "The watered plant",
        "The plant that was not watered",
        "Both the same"
       ],
       "answer": 0
      }
     },
     {
      "note": "Living things need water to carry out their life processes. A plant without water wilts, while a watered plant stays healthy."
     }
    ]
   },
   {
    "id": "b",
    "title": "Tap on or off",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "One pupil leaves the tap running while brushing for two minutes. Another turns it off between rinses."
     },
     {
      "predict": {
       "q": "Who uses more water?",
       "options": [
        "The pupil who leaves the tap running.",
        "Both use about the same.",
        "The pupil who turns the tap off."
       ],
       "answer": 0
      }
     },
     {
      "do": "Brush for two minutes with the tap left running, then with the tap off between rinses."
     },
     {
      "observe": {
       "q": "Read your bar chart. Which tap setting used more water?",
       "options": [
        "The tap left running",
        "The tap turned off between rinses",
        "Both the same"
       ],
       "answer": 0
      }
     },
     {
      "note": "Turning the tap off when it is not needed uses far less water than leaving it running."
     }
    ]
   }
  ],
  "written": [
   {
    "kind": "define",
    "q": "What does it mean to conserve water? [1]",
    "marks": 1,
    "concept": "To conserve water is to use it wisely and not waste it.",
    "model": "To conserve water means to use water wisely and not waste it, by using only as much as we need.",
    "points": [
     {
      "point": "to use water wisely (carefully), without wasting it",
      "marks": 1
     }
    ],
    "alsoAccept": [
     "to save water by using only what we need",
     "to use less water so that none is wasted"
    ],
    "doNotAccept": [
     "to stop using water",
     "to keep water clean",
     "to collect rain water",
     "to drink more water"
    ]
   },
   {
    "kind": "explain",
    "q": "In your results, the plant that was not watered had a much lower health score than the watered plant. Explain why. [2]",
    "marks": 2,
    "concept": "Living things need water to carry out their life processes; a plant with no water cannot do so and wilts.",
    "model": "Plants are living things, and living things need water to carry out their life processes. The plant that was not watered did not have enough water, so it wilted and scored lower.",
    "points": [
     {
      "point": "plants (living things) need water to carry out their life processes (to stay alive and healthy)",
      "marks": 1
     },
     {
      "point": "the plant that was not watered did not have enough water, so it wilted (became unhealthy)",
      "marks": 1
     }
    ],
    "doNotAccept": [
     "it did not get enough sunlight",
     "water is the food of the plant",
     "the soil ran out of air",
     "it was not watered, so it scored lower (only repeats the question)"
    ]
   },
   {
    "kind": "explain",
    "q": "In your results, less water was used when the tap was turned off between rinses. Explain why. [2]",
    "marks": 2,
    "concept": "Water flows the whole time a tap is open; turning it off between rinses makes the water flow for a shorter time, so less is used.",
    "model": "Water flows from a tap the whole time it is on. When the tap is turned off between rinses, water flows for a shorter time, so fewer litres are used and no water is wasted.",
    "points": [
     {
      "point": "water flows (is used) the whole time the tap is on, even when it is not needed",
      "marks": 1
     },
     {
      "point": "turning the tap off between rinses means water flows for a shorter time (only when it is needed), so fewer litres are used",
      "marks": 1
     }
    ],
    "doNotAccept": [
     "turning the tap off and on again uses more water",
     "the tap gives out water more slowly",
     "the brushing time was shorter",
     "less water came out (only repeats the question)"
    ]
   }
  ]
 },
 "p5-2-7": {
  "status": "review",
  "minutes": 25,
  "bigIdea": "Litter and other human activities can cloud a water body. This blocks the light that plants and other living things need. Clearing litter away lets the light through again. We all have a part to play in keeping our water clean.",
  "aim": "A glass tank of water sits between a lamp and a light sensor. A second tank holds water plants and two fish. Litter can be added to either one.",
  "safety": [],
  "sim": {
   "page": "labs/p5-2-7/index.html",
   "label": "Let's test it now!",
   "covers": [
    "a",
    "b"
   ],
   "map": {
    "a": "litter",
    "b": "clean"
   }
  },
  "badge": {
   "icon": "🐟",
   "name": "Clear Water",
   "line": "You predicted, tested and explained every part of Clear Water."
  },
  "parts": [
   {
    "id": "a",
    "title": "Litter in the water",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "A beam of light shines through a tank of clear water to a sensor. Litter will be added."
     },
     {
      "predict": {
       "q": "What happens to the light reading as more litter is added?",
       "options": [
        "It falls.",
        "It stays the same.",
        "It rises."
       ],
       "answer": 0
      }
     },
     {
      "do": "Add no litter, a little and a lot, and read the light that reaches the sensor."
     },
     {
      "observe": {
       "q": "Look at the points. As the litter increases, the light reading…",
       "options": [
        "decreases",
        "stays the same",
        "increases"
       ],
       "answer": 0
      }
     },
     {
      "note": "More litter in the water blocks more light, so less light reaches the far side."
     }
    ]
   },
   {
    "id": "b",
    "title": "Cleaning it up",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "Two identical tanks hold litter and water plants. One is cleared. The other is left as it is."
     },
     {
      "predict": {
       "q": "After five days, which tank's plants look healthier?",
       "options": [
        "The tank that was cleared.",
        "Both look the same.",
        "The tank left with litter."
       ],
       "answer": 0
      }
     },
     {
      "do": "Clear the litter from one tank and leave it in the other, then score the plants on day 5."
     },
     {
      "observe": {
       "q": "Read your bar chart. Which tank's plants had the higher health score?",
       "options": [
        "The cleared tank",
        "The tank left with litter",
        "Both the same"
       ],
       "answer": 0
      }
     },
     {
      "note": "Litter in the water can block light and harm water plants. Plants in the cleared tank stayed healthier."
     }
    ]
   }
  ],
  "written": [
   {
    "kind": "define",
    "q": "What is litter? [1]",
    "marks": 1,
    "concept": "Litter is rubbish that has been left or thrown where it should not be.",
    "model": "Litter is rubbish that people leave or throw in a place where it should not be, such as in a pond, instead of in a bin.",
    "points": [
     {
      "point": "it is rubbish (waste) left or thrown where it should not be (not put in a bin)",
      "marks": 1
     }
    ],
    "alsoAccept": [
     "rubbish that people drop on the ground or into water instead of putting it in a bin"
    ],
    "doNotAccept": [
     "anything found in water",
     "dirty water",
     "dead leaves and mud",
     "things that block light (says what it does, not what it is)"
    ]
   },
   {
    "kind": "explain",
    "q": "In your results, the light reading was lower with a lot of litter than with a little litter. Explain why. [2]",
    "marks": 2,
    "concept": "Litter in the water blocks light; more litter blocks more light, so less light reaches the sensor.",
    "model": "Litter in the water blocks light, so the light cannot pass through it. A lot of litter blocks more of the light than a little litter does, so less light reaches the sensor.",
    "points": [
     {
      "point": "litter blocks light (light cannot pass through the litter)",
      "marks": 1
     },
     {
      "point": "more litter blocks more of the light, so less light reaches the sensor on the far side",
      "marks": 1
     }
    ],
    "doNotAccept": [
     "the lamp became dimmer",
     "the litter made the water warmer",
     "the litter broke the sensor",
     "there was more litter, so the reading was lower (only repeats the question)"
    ]
   },
   {
    "kind": "explain",
    "q": "In your results, the plants in the tank left with litter had a lower health score after five days. Explain why. [2]",
    "marks": 2,
    "concept": "Litter blocks the light that water plants need, so the plants cannot grow well and become unhealthy.",
    "model": "The litter blocked the light, so less light reached the water plants. Plants need light to make food and grow well, so the plants with less light became less healthy.",
    "points": [
     {
      "point": "the litter blocked the light, so less light passed through the water to reach the plants",
      "marks": 1
     },
     {
      "point": "plants need light (to make food and grow well), so with less light they became less healthy",
      "marks": 1
     }
    ],
    "doNotAccept": [
     "the litter used up all the water",
     "the litter made the water too hot",
     "water plants do not need light",
     "the tank had litter, so the plants were less healthy (only repeats the question)"
    ]
   }
  ]
 },
 "p5-2-8": {
  "status": "review",
  "minutes": 25,
  "bigIdea": "Water evaporates off the muddy cup and leaves the dirt behind. The water vapour condenses on the cool cover and drips down as clean water. Only the water turns into vapour, so the water caught is clean. A warmer spot speeds up the evaporating, so more clean water is caught in the same time.",
  "aim": "A big container holds a small cup of muddy water and an empty catching cup. A clear cover with a pebble at its centre sits over the top. Dots show water vapour, which cannot really be seen.",
  "safety": [],
  "sim": {
   "page": "labs/p5-2-8/index.html",
   "label": "Let's test it now!",
   "covers": [
    "a",
    "b"
   ],
   "map": {
    "a": "build",
    "b": "speed"
   }
  },
  "badge": {
   "icon": "🥛",
   "name": "Clean Water Catcher",
   "line": "You predicted, tested and explained every part of Clean Water Catcher."
  },
  "parts": [
   {
    "id": "a",
    "title": "Build the catcher",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "A clear cover is stretched over the container. A pebble pulls its middle low, above the catching cup."
     },
     {
      "predict": {
       "q": "Where will the clean water end up?",
       "options": [
        "In the catching cup, dripping from the low point of the cover.",
        "Back in the muddy cup it came from.",
        "Nowhere, unless the pebble is taken away."
       ],
       "answer": 0
      }
     },
     {
      "do": "Read the water in the catching cup at different minutes and follow how it got there."
     },
     {
      "observe": {
       "q": "Look at the points. As the minutes pass, the clean water in the catching cup…",
       "options": [
        "increases",
        "stays the same",
        "decreases"
       ],
       "answer": 0
      }
     },
     {
      "note": "Water evaporates off the muddy cup, leaving the mud behind. It condenses on the cool cover and drips clean into the catching cup."
     }
    ]
   },
   {
    "id": "b",
    "title": "Warm spot or cool spot",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "Two identical catchers are set up, one in a warm, sunny spot and one in a cool, shaded spot."
     },
     {
      "predict": {
       "q": "Which collects more clean water in one hour?",
       "options": [
        "The catcher in the warm, sunny spot.",
        "Both collect the same amount.",
        "The catcher in the cool, shaded spot."
       ],
       "answer": 0
      }
     },
     {
      "do": "Put the catcher in a warm spot and a cool spot, and measure the clean water after one hour."
     },
     {
      "observe": {
       "q": "Read your bar chart. Which spot collected more water?",
       "options": [
        "The warm, sunny spot",
        "The cool, shaded spot",
        "Both the same"
       ],
       "answer": 0
      }
     },
     {
      "note": "A warmer spot makes the muddy water evaporate faster, so more clean water is collected in the same time."
     }
    ]
   }
  ],
  "written": [
   {
    "kind": "define",
    "q": "What is evaporation? [1]",
    "marks": 1,
    "concept": "Evaporation is the change of liquid water into water vapour (a gas) when it gains heat.",
    "model": "Evaporation is the change from liquid water to water vapour. It happens when the water gains heat.",
    "points": [
     {
      "point": "it is the change from liquid water to water vapour (a gas)",
      "marks": 1
     }
    ],
    "alsoAccept": [
     "liquid water gaining heat and turning into water vapour",
     "the change of state from liquid to gas"
    ],
    "doNotAccept": [
     "the change from water vapour to liquid water (this is condensation)",
     "water disappearing",
     "water drying up (everyday words, with no change to water vapour)",
     "water dripping from the cover"
    ]
   },
   {
    "kind": "explain",
    "q": "The water that dripped into the catching cup came from the muddy water, but it was clean. Explain why it was clean. [2]",
    "marks": 2,
    "concept": "Only the water evaporates; the mud does not turn into a gas, so it is left behind and the water vapour that condenses is clean water.",
    "model": "Only the water in the muddy cup evaporated and rose as water vapour. The mud does not turn into a gas, so it stayed behind in the muddy cup, and the water vapour condensed into clean water.",
    "points": [
     {
      "point": "only the water evaporates (changes into water vapour) and rises from the muddy cup",
      "marks": 1
     },
     {
      "point": "the mud does not evaporate (does not turn into a gas), so it is left behind in the muddy cup and the water that condenses is clean",
      "marks": 1
     }
    ],
    "doNotAccept": [
     "the cover filters the mud out of the water",
     "the pebble cleans the water",
     "the mud rises with the water vapour",
     "the mud stays behind (with no mention that only the water evaporates)"
    ]
   },
   {
    "kind": "explain",
    "q": "In your results, the catcher in the warm, sunny spot collected more clean water than the catcher in the cool, shaded spot. Explain why. [2]",
    "marks": 2,
    "concept": "Water evaporates faster when it is warmer, so more water vapour reaches the cover and condenses in the same time.",
    "model": "In the warm, sunny spot the muddy water gains more heat, so it evaporates faster. More water vapour reaches the cover and condenses, so more clean water drips into the catching cup in one hour.",
    "points": [
     {
      "point": "the muddy water evaporates faster in the warm spot (it gains more heat from the sun)",
      "marks": 1
     },
     {
      "point": "so more water vapour reaches the cover and condenses, and more clean water drips into the catching cup in the same time",
      "marks": 1
     }
    ],
    "doNotAccept": [
     "condensation only happens when it is warm",
     "the sun melts the water on the cover",
     "the pebble works better in the sun",
     "it was warmer, so more water was collected (only repeats the question)"
    ]
   }
  ]
 },
 "p5-3-1": {
  "status": "review",
  "minutes": 30,
  "bigIdea": "A plant that has no water begins to droop. Watering a drooping plant lets it stand upright again. Water travels from the roots, up through the stem, to the leaves. The next lab finds the tubes that carry the water.",
  "aim": "Two matching potted plants stand under one lamp, with a watering can beside them. A clock turns hours into seconds. A third plant has a glass stem, so you can look inside.",
  "safety": [],
  "sim": {
   "page": "labs/p5-3-1/index.html",
   "label": "Let's test it now!",
   "covers": [
    "a",
    "b",
    "c"
   ],
   "map": {
    "a": "droop",
    "b": "recover",
    "c": "climb"
   }
  },
  "badge": {
   "icon": "🌱",
   "name": "The Wilting Clue",
   "line": "You predicted, tested and explained every part of The Wilting Clue."
  },
  "parts": [
   {
    "id": "a",
    "title": "Water or no water",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "Two plants of the same kind stand in matching pots under one lamp. The clock will run six hours."
     },
     {
      "predict": {
       "q": "Which plant will droop more after six hours?",
       "options": [
        "The plant with no water.",
        "Both plants droop the same.",
        "Neither plant droops under the lamp."
       ],
       "answer": 0
      }
     },
     {
      "do": "Test the watered plant and the dry plant, and read how far each one droops after six hours."
     },
     {
      "observe": {
       "q": "Read your bar chart. Which plant drooped more after six hours?",
       "options": [
        "The dry plant",
        "The watered plant",
        "Both the same"
       ],
       "answer": 0
      }
     },
     {
      "note": "A plant that gets no water begins to droop. The plant with water stays upright."
     }
    ]
   },
   {
    "id": "b",
    "title": "Water a drooping plant",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "The dry plant has drooped about 34 degrees. Now it is watered, and the clock runs on."
     },
     {
      "predict": {
       "q": "What happens to the drooping plant after it is watered?",
       "options": [
        "It stands upright again.",
        "It stays drooped.",
        "It droops even more."
       ],
       "answer": 0
      }
     },
     {
      "do": "Water the drooping plant, then read its droop after one, two and three hours."
     },
     {
      "observe": {
       "q": "Look at the points. As the hours after watering go by, the droop angle…",
       "options": [
        "decreases",
        "stays the same",
        "increases"
       ],
       "answer": 0
      }
     },
     {
      "note": "Once water reaches the plant again, it stands upright. The stem straightens and the leaves lift."
     }
    ]
   },
   {
    "id": "c",
    "title": "Where the water goes",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "Water from the soil has to reach the leaves. The stem will turn to glass, so you can see inside."
     },
     {
      "predict": {
       "q": "Which way does water travel inside the plant?",
       "options": [
        "Up from the roots to the leaves.",
        "Down from the leaves to the roots.",
        "It cannot travel. The stem is solid all the way through."
       ],
       "answer": 0
      }
     },
     {
      "do": "Look at the stem from outside, then from inside, and read how high the line of light climbs."
     },
     {
      "observe": {
       "q": "Look at your results table. Which view shows the water climbing?",
       "options": [
        "The inside view",
        "The outside view",
        "Both views, equally"
       ],
       "answer": 0
      }
     },
     {
      "note": "Water is pulled up from the roots, through the stem, to the leaves."
     }
    ]
   }
  ],
  "written": [
   {
    "kind": "define",
    "q": "What does it mean when a plant wilts? [1]",
    "marks": 1,
    "concept": "A plant wilts when its stem and leaves droop because it does not have enough water.",
    "model": "When a plant wilts, its stem and leaves droop and go limp because the plant does not have enough water.",
    "points": [
     {
      "point": "its stem and leaves droop (bend down, go limp, no longer stand upright)",
      "marks": 1
     }
    ],
    "alsoAccept": [
     "the plant droops because it has too little water",
     "the plant goes soft and bends over when it is short of water"
    ],
    "doNotAccept": [
     "the plant dies",
     "the leaves fall off",
     "the leaves turn yellow",
     "the plant stops growing"
    ]
   },
   {
    "kind": "explain",
    "q": "In your results, the dry plant drooped much more than the watered plant. Explain why. [2]",
    "marks": 2,
    "concept": "A plant loses water all the time; without new water to replace it, the plant cannot stay firm and droops.",
    "model": "A plant loses water all the time, from its leaves into the air. The dry plant had no water to replace the water it lost, so it could not stay firm and it drooped. The watered plant could replace its water, so it stayed upright.",
    "points": [
     {
      "point": "a plant keeps losing water (from its leaves into the air)",
      "marks": 1
     },
     {
      "point": "the dry plant had no water to replace what it lost, so it could not stay firm (the watered plant could replace it)",
      "marks": 1
     }
    ],
    "doNotAccept": [
     "the lamp was too hot for the dry plant",
     "the dry plant had no food",
     "the dry plant was a weaker kind of plant",
     "the dry plant had no water, so it drooped (only repeats the question)"
    ]
   },
   {
    "kind": "explain",
    "q": "In your results, the drooping plant stood upright again a few hours after water was poured onto its soil. Explain why. [2]",
    "marks": 2,
    "concept": "Roots take in water from the soil and the water travels up the stem to the leaves, so the plant becomes firm again.",
    "model": "The roots took in the water from the soil. The water travelled up through the stem to the leaves, so the plant had enough water to become firm and stand upright again.",
    "points": [
     {
      "point": "the roots took in the water from the soil",
      "marks": 1
     },
     {
      "point": "the water travelled up through the stem to the leaves, so the plant became firm (stood upright) again",
      "marks": 1
     }
    ],
    "doNotAccept": [
     "the leaves took in the water from the air",
     "the water made the stem heavier, so it straightened",
     "the plant rested and got better",
     "the plant got water, so it stood up (only repeats the question)"
    ]
   }
  ]
 },
 "p5-3-2": {
  "status": "review",
  "minutes": 30,
  "bigIdea": "Water climbs through set paths inside the stem, called the water-carrying tubes. A cross-cut shows them as dots. A length-cut shows them as lines. Each path keeps to its own side and does not mix with the next. Warmer water climbs faster. The next lab looks closer at these tubes.",
  "aim": "A leafy stalk stands in red water, with a knife and a lens beside it. A second stalk is split between red and blue water. A third stalk stands in water you can warm or cool.",
  "safety": [
   "Real knives are sharp. Ask an adult to do the cutting, and keep your fingers clear of the blade."
  ],
  "sim": {
   "page": "labs/p5-3-2/index.html",
   "label": "Let's test it now!",
   "covers": [
    "a",
    "b",
    "c"
   ],
   "map": {
    "a": "follow",
    "b": "split",
    "c": "race"
   }
  },
  "badge": {
   "icon": "🔴",
   "name": "The Water Path",
   "line": "You predicted, tested and explained every part of The Water Path."
  },
  "parts": [
   {
    "id": "a",
    "title": "Follow the colour",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "A leafy stalk stands in red water for six hours. Then it is cut open and looked at up close."
     },
     {
      "predict": {
       "q": "What will the cut stalk look like after standing in red water?",
       "options": [
        "Red dots and lines inside it.",
        "The whole stalk turns solid red.",
        "No change at all."
       ],
       "answer": 0
      }
     },
     {
      "do": "Let six hours pass, then cut the stalk across and along, and count the coloured paths you can see."
     },
     {
      "observe": {
       "q": "Look at your results table. Which ways of looking showed coloured paths?",
       "options": [
        "Both cuts, but not the uncut stalk",
        "The uncut stalk only",
        "All three, equally"
       ],
       "answer": 0
      }
     },
     {
      "note": "Water climbs through the water-carrying tubes. A cross-cut shows them as dots. A length-cut shows them as lines."
     }
    ]
   },
   {
    "id": "b",
    "title": "Two colours, one stalk",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "A stalk is split up its stem. One half stands in red water and the other half in blue water."
     },
     {
      "predict": {
       "q": "Will the two colours mix in the joined top of the stalk?",
       "options": [
        "No. They stay apart.",
        "Yes. They mix into purple.",
        "Only a little mixes."
       ],
       "answer": 0
      }
     },
     {
      "do": "Let six hours pass, cut the joined top, and count the red, blue and purple dots."
     },
     {
      "observe": {
       "q": "Look at your results table. Which dots were not found on the cut?",
       "options": [
        "Purple dots",
        "Red dots",
        "Blue dots"
       ],
       "answer": 0
      }
     },
     {
      "note": "Each water-carrying tube carries its own water. The red and the blue do not mix with their neighbours."
     }
    ]
   },
   {
    "id": "c",
    "title": "Race the climb",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "A stalk stands in coloured water. A stopwatch times the colour as it climbs to a mark."
     },
     {
      "predict": {
       "q": "Will the colour climb to the mark faster in cool water or in warm water?",
       "options": [
        "Faster in warm water.",
        "Faster in cool water.",
        "The same speed in both."
       ],
       "answer": 0
      }
     },
     {
      "do": "Set the water temperature and time how long the colour takes to climb to the mark."
     },
     {
      "observe": {
       "q": "Look at the points. As the water gets warmer, the time to reach the mark…",
       "options": [
        "decreases",
        "stays the same",
        "increases"
       ],
       "answer": 0
      }
     },
     {
      "note": "Warmer water helps the stem draw water up faster, so the colour reaches the mark sooner."
     }
    ]
   }
  ],
  "written": [
   {
    "kind": "define",
    "q": "What are the water-carrying tubes of a plant? [1]",
    "marks": 1,
    "concept": "Water-carrying tubes are tubes inside the plant through which water travels up from the roots to the leaves.",
    "model": "The water-carrying tubes are tubes inside the stem of a plant. Water travels through them from the roots up to the leaves.",
    "points": [
     {
      "point": "they are tubes inside the plant (the stem) through which water travels up from the roots to the leaves (the other parts of the plant)",
      "marks": 1
     }
    ],
    "alsoAccept": [
     "the set paths inside the stem that water climbs through to reach the leaves",
     "tubes in the stem that carry water and mineral salts up from the roots"
    ],
    "doNotAccept": [
     "tubes that carry water (only repeats the name; it must say they are inside the plant or where the water goes)",
     "tubes that carry food",
     "the whole stem, which soaks up water like a sponge",
     "the roots of the plant"
    ]
   },
   {
    "kind": "explain",
    "q": "In your results, red dots and blue dots were found in the joined top of the split stalk, but no purple dots. Explain why. [2]",
    "marks": 2,
    "concept": "Each water-carrying tube carries its own water and does not mix with its neighbours, so red and blue water stay apart and no purple forms.",
    "model": "Purple dots would form only if the red water and the blue water mixed. Each water-carrying tube carries its own water up the stalk and does not mix with the tubes next to it, so the red water and the blue water stayed apart.",
    "points": [
     {
      "point": "each water-carrying tube carries its own water (the red water climbed the tubes on one side and the blue water climbed the tubes on the other side)",
      "marks": 1
     },
     {
      "point": "the water in one tube does not mix with the water in the tubes next to it, so the red and the blue did not mix to make purple",
      "marks": 1
     }
    ],
    "doNotAccept": [
     "the two colours cancel each other out",
     "the stalk took in only one colour",
     "water cannot climb a split stalk",
     "the colours did not mix (only repeats the question)"
    ]
   },
   {
    "kind": "explain",
    "q": "In your results, the colour took less time to reach the mark when the water was warmer. Explain why. [2]",
    "marks": 2,
    "concept": "Warmer water is drawn up the stem faster, so the coloured water covers the same distance to the mark in less time.",
    "model": "The stem draws warmer water up faster than cooler water. The mark is at the same height each time, so the faster-moving coloured water reaches it in a shorter time.",
    "points": [
     {
      "point": "warmer water is drawn up the stem (through the water-carrying tubes) faster",
      "marks": 1
     },
     {
      "point": "the coloured water travels the same distance to the mark, so moving faster it gets there in less time",
      "marks": 1
     }
    ],
    "doNotAccept": [
     "warm water is lighter, so it floats up",
     "the dye is stronger in warm water",
     "cool water tires the stalk out",
     "the water was warmer, so it took less time (only repeats the question)"
    ]
   }
  ]
 },
 "p5-3-3": {
  "status": "review",
  "minutes": 30,
  "bigIdea": "A plant has two kinds of tubes. They run through the roots, stem and leaves. Water-carrying tubes carry water and mineral salts up from the roots. Food-carrying tubes carry food made in the leaves to the rest of the plant. The next lab tests what happens if one set of tubes is cut.",
  "aim": "A microscope looks at a slice of stem, leaf and root. A magnified tube bundle shows two kinds of tube. A glass plant lets you follow what each kind carries.",
  "safety": [],
  "sim": {
   "page": "labs/p5-3-3/index.html",
   "label": "Let's test it now!",
   "covers": [
    "a",
    "b",
    "c"
   ],
   "map": {
    "a": "zoom",
    "b": "sort",
    "c": "trace"
   }
  },
  "badge": {
   "icon": "🔬",
   "name": "Two Tube Networks",
   "line": "You predicted, tested and explained every part of Two Tube Networks."
  },
  "parts": [
   {
    "id": "a",
    "title": "Same pattern, three places",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "A thin slice of stem, leaf and root sits on the turntable. The microscope looks at one at a time."
     },
     {
      "predict": {
       "q": "Will the stem, the leaf and the root all show tube bundles?",
       "options": [
        "Yes. All three show tube bundles.",
        "No. Only the stem has tubes.",
        "No. The leaf has no tubes at all."
       ],
       "answer": 0
      }
     },
     {
      "do": "Zoom in on the stem, the leaf and the root, and count the tube bundles in each."
     },
     {
      "observe": {
       "q": "Look at your results table. Which parts of the plant showed tube bundles?",
       "options": [
        "The stem, the leaf and the root",
        "The stem only",
        "The stem and the root, but not the leaf"
       ],
       "answer": 0
      }
     },
     {
      "note": "The same tube network runs through the roots, stem and leaves. Every part shows tube bundles."
     }
    ]
   },
   {
    "id": "b",
    "title": "Sort the tubes",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "A magnified bundle shows two kinds of tube. Some sit in the middle, and some sit around the edge."
     },
     {
      "predict": {
       "q": "Which tubes carry water, and which carry food?",
       "options": [
        "The inner tubes carry water. The outer tubes carry food.",
        "The outer tubes carry water. The inner tubes carry food.",
        "Both kinds carry water and food mixed together."
       ],
       "answer": 0
      }
     },
     {
      "do": "Tap a kind of tube, then choose whether it carries water or food."
     },
     {
      "observe": {
       "q": "Look back at your two sorts. The tubes that carry water sit…",
       "options": [
        "closer to the centre of the bundle",
        "at the outer edge of the bundle",
        "in both places, mixed together"
       ],
       "answer": 0
      }
     },
     {
      "note": "Water-carrying tubes carry water and mineral salts. Food-carrying tubes carry the food made in the leaves."
     }
    ]
   },
   {
    "id": "c",
    "title": "Trace the routes",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "The plant model turns to glass. A blue trail marks water. A green trail marks food made in the leaves."
     },
     {
      "predict": {
       "q": "Which way does food travel once it is made in the leaves?",
       "options": [
        "Out from the leaves to the rest of the plant.",
        "Up from the roots to the leaves.",
        "It stays in the leaf that made it."
       ],
       "answer": 0
      }
     },
     {
      "do": "Follow the water trail and the food trail through the glass plant, and see where each one starts."
     },
     {
      "observe": {
       "q": "Look at your results table. Which trail starts in the leaves?",
       "options": [
        "The food trail",
        "The water trail",
        "Both trails"
       ],
       "answer": 0
      }
     },
     {
      "note": "Water moves up from the roots. Food moves out from the leaves to the rest of the plant."
     }
    ]
   }
  ],
  "written": [
   {
    "kind": "define",
    "q": "What are the food-carrying tubes of a plant? [1]",
    "marks": 1,
    "concept": "Food-carrying tubes are tubes that carry the food made in the leaves to the rest of the plant.",
    "model": "The food-carrying tubes are tubes inside a plant that carry the food made in the leaves to all the other parts of the plant.",
    "points": [
     {
      "point": "they are tubes that carry food made in the leaves to the rest (the other parts) of the plant",
      "marks": 1
     }
    ],
    "alsoAccept": [
     "tubes that take food from the leaves to the roots, the stem and the fruit",
     "the outer tubes of a tube bundle, which carry food from the leaves to every part of the plant"
    ],
    "doNotAccept": [
     "tubes that carry food (only repeats the name; it must say the food comes from the leaves or goes to the rest of the plant)",
     "tubes that carry water and mineral salts",
     "tubes that carry food up from the soil",
     "tubes that make food for the plant"
    ]
   },
   {
    "kind": "explain",
    "q": "In your results, tube bundles were found in the stem, in the leaf and in the root. Explain why a plant has tube bundles in all of these parts. [2]",
    "marks": 2,
    "concept": "The tubes form one connected network through the whole plant, so that water and food can reach every part.",
    "model": "The tubes form one connected network that runs through the roots, the stem and the leaves. This lets water from the roots and food from the leaves be carried to every part of the plant.",
    "points": [
     {
      "point": "the tubes form one connected network that runs through the whole plant (roots, stem and leaves)",
      "marks": 1
     },
     {
      "point": "so water (and mineral salts) and food can be carried to every part of the plant, because every part needs them",
      "marks": 1
     }
    ],
    "doNotAccept": [
     "the tubes hold the plant up",
     "each part of the plant makes its own tubes that are not joined to the others",
     "only thick parts need tubes",
     "all parts have tube bundles (only repeats the question)"
    ]
   },
   {
    "kind": "explain",
    "q": "In your results, the water trail started at the roots but the food trail started in the leaves. Explain why. [2]",
    "marks": 2,
    "concept": "Water enters the plant at the roots and travels up; food is made in the leaves and travels out from them to the rest of the plant.",
    "model": "The roots take in water from the soil, so the water starts at the roots and travels up the plant. The leaves make the food, so the food starts in the leaves and travels to the rest of the plant.",
    "points": [
     {
      "point": "water is taken in by the roots (from the soil), so it travels up from the roots",
      "marks": 1
     },
     {
      "point": "food is made in the leaves, so it travels out from the leaves to the rest of the plant",
      "marks": 1
     }
    ],
    "doNotAccept": [
     "food comes from the soil through the roots",
     "the leaves take in water from the air",
     "water and food travel together in the same tube",
     "water goes up and food goes down (says the direction but not why each starts there)"
    ]
   }
  ]
 },
 "p5-3-4": {
  "status": "review",
  "minutes": 30,
  "bigIdea": "A fair test changes only one thing at a time and keeps everything else the same. Repeating a reading and finding the average makes it more reliable. More leaves, brighter light and warmer air make a plant take in more water.",
  "aim": "A plant cutting stands in a measuring jar of water. You can change its leaves, its light and its warmth. A clock turns one day into seconds.",
  "safety": [],
  "sim": {
   "page": "labs/p5-3-4/index.html",
   "label": "Let's test it now!",
   "covers": [
    "a",
    "b",
    "c"
   ],
   "map": {
    "a": "pick",
    "b": "repeat",
    "c": "fair"
   }
  },
  "badge": {
   "icon": "🧪",
   "name": "Design Your Own Water Test",
   "line": "You predicted, tested and explained every part of Design Your Own Water Test."
  },
  "parts": [
   {
    "id": "a",
    "title": "Pick your question",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "Busier means more leaves, brighter light or warmer air. Calmer means fewer leaves, dimmer light or cooler air."
     },
     {
      "predict": {
       "q": "Will a plant in the busier condition take in more water, less water or the same?",
       "options": [
        "More water than in the calmer condition.",
        "Less water than in the calmer condition.",
        "The same amount of water."
       ],
       "answer": 0
      }
     },
     {
      "do": "Choose one factor, test its busy and calm conditions, and read how much water the plant takes in over a day."
     },
     {
      "observe": {
       "q": "Read your bar chart. Compared with the calm conditions, the busy conditions took in…",
       "options": [
        "more water",
        "less water",
        "the same amount of water"
       ],
       "answer": 0
      }
     },
     {
      "note": "A plant with more leaves, brighter light or warmer air loses more water from its leaves, so it takes in more water."
     }
    ]
   },
   {
    "id": "b",
    "title": "Run it again",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "One reading can be a little off. So the same test is run again, and the readings are averaged."
     },
     {
      "predict": {
       "q": "Why run the same test more than once?",
       "options": [
        "To find an average that is more reliable.",
        "To make the readings bigger.",
        "Because the first run is always wrong."
       ],
       "answer": 0
      }
     },
     {
      "do": "Repeat each test and watch the readings. Then find the average of the runs."
     },
     {
      "observe": {
       "q": "Look at your repeated readings. Why is the average of the runs better than one run?",
       "options": [
        "One reading can be a little off, so the average is more reliable",
        "The average makes the plant take in more water",
        "One run is always exact"
       ],
       "answer": 0
      }
     },
     {
      "note": "One reading can be off. Readings repeated and averaged are more reliable."
     }
    ]
   },
   {
    "id": "c",
    "title": "Fair or not",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "Two plants stand side by side. A test must change only one factor to be fair."
     },
     {
      "predict": {
       "q": "Is a test fair if it changes two factors at once?",
       "options": [
        "No. We cannot tell which factor caused the difference.",
        "Yes. Both plants are the same kind, so it is fair.",
        "Only if the plants are in different rooms."
       ],
       "answer": 0
      }
     },
     {
      "do": "Check each test and name the factor that was not kept the same."
     },
     {
      "observe": {
       "q": "Look back at the three tests. A fair test changes…",
       "options": [
        "only one thing at a time",
        "two or three things at once",
        "nothing at all"
       ],
       "answer": 0
      }
     },
     {
      "note": "A fair test changes only one thing at a time. Everything else is kept the same."
     }
    ]
   }
  ],
  "written": [
   {
    "kind": "define",
    "q": "What is a fair test? [1]",
    "marks": 1,
    "concept": "In a fair test only one factor (variable) is changed and all the other factors are kept the same.",
    "model": "A fair test is a test in which only one thing is changed and everything else is kept the same.",
    "points": [
     {
      "point": "only one thing (factor or variable) is changed, and everything else is kept the same",
      "marks": 1
     }
    ],
    "alsoAccept": [
     "a test that changes only one variable at a time while the other variables are kept the same",
     "a test where only one factor is different, so we know that factor caused the difference in the results"
    ],
    "doNotAccept": [
     "a test where everything is kept the same",
     "a test that is done many times",
     "a test where everyone gets the same result",
     "a test with no cheating"
    ]
   },
   {
    "kind": "explain",
    "q": "On the bench, a plant with many leaves took in more water in one day than a plant with few leaves. Explain why. [2]",
    "marks": 2,
    "concept": "A plant loses water to the air from its leaves; more leaves lose more water, so the plant takes in more water to replace it.",
    "model": "A plant loses water to the air from its leaves. The plant with many leaves loses more water, so it takes in more water to replace the water it lost.",
    "points": [
     {
      "point": "a plant loses water (to the air) from its leaves",
      "marks": 1
     },
     {
      "point": "the plant with more leaves loses more water, so it takes in more water (to replace the water lost)",
      "marks": 1
     }
    ],
    "doNotAccept": [
     "a plant with more leaves is bigger so it drinks more",
     "the leaves store the water",
     "more leaves make more food",
     "it took in more water because it has more leaves (only repeats the question)"
    ]
   },
   {
    "kind": "explain",
    "q": "You ran the same test more than once and found the average of the readings. Explain why this is better than using one reading. [2]",
    "marks": 2,
    "concept": "Repeated readings differ a little, so a single reading may be slightly off; the average of repeated readings is more reliable.",
    "model": "One reading can be a little off, because repeated runs do not give exactly the same reading. Finding the average of the repeated readings gives a result that is more reliable.",
    "points": [
     {
      "point": "one reading alone can be a little off (repeated runs give slightly different readings)",
      "marks": 1
     },
     {
      "point": "the average of repeated readings is more reliable (can be trusted more)",
      "marks": 1
     }
    ],
    "doNotAccept": [
     "it makes the test fair",
     "it makes the plant take in more water",
     "the first run is always wrong",
     "to get bigger readings"
    ]
   }
  ]
 },
 "p5-3-5": {
  "status": "review",
  "minutes": 30,
  "bigIdea": "Cutting a thin ring through the food-carrying tubes traps food just above the cut, so fruit there grows bigger. A deeper cut also removes the water-carrying tubes, so the part above it wilts. The gardener should cut carefully, and only through the outer ring.",
  "aim": "A small fruit tree has a branch with leaves and fruit. A ring cut can be made in the branch, and a clock turns days into seconds. A cross-section plate shows the two kinds of tube inside.",
  "safety": [
   "Real cutting tools are sharp. Ask an adult to do any cutting, and keep your fingers clear."
  ],
  "sim": {
   "page": "labs/p5-3-5/index.html",
   "label": "Let's test it now!",
   "covers": [
    "a",
    "b",
    "c"
   ],
   "map": {
    "a": "cut",
    "b": "depth",
    "c": "advise"
   }
  },
  "badge": {
   "icon": "✂️",
   "name": "Ring the Stem",
   "line": "You predicted, tested and explained every part of Ring the Stem."
  },
  "parts": [
   {
    "id": "a",
    "title": "Where to cut",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "A thin ring is cut out of a branch, near the fruit or near the trunk. The fruit starts 40 mm wide."
     },
     {
      "predict": {
       "q": "Which ring position makes the fruit grow bigger?",
       "options": [
        "Either position. The fruit grows bigger.",
        "Only a cut near the fruit.",
        "Neither. A cut always harms the fruit."
       ],
       "answer": 0
      }
     },
     {
      "do": "Ring the branch near the fruit and near the trunk, and read the fruit size after thirty days."
     },
     {
      "observe": {
       "q": "Read your bar chart. Compared with no ring, the fruit above a ring cut grew…",
       "options": [
        "bigger",
        "smaller",
        "the same size"
       ],
       "answer": 0
      }
     },
     {
      "note": "A ring cut removes the food-carrying tubes at that spot. Food builds up above the cut, so the fruit grows bigger."
     }
    ]
   },
   {
    "id": "b",
    "title": "Ring or deep cut",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "A thin ring removes only the outer tubes. A deep cut goes through the outer and the inner tubes."
     },
     {
      "predict": {
       "q": "What happens to the leaves above a cut that goes too deep?",
       "options": [
        "They wilt.",
        "They grow bigger.",
        "Nothing changes."
       ],
       "answer": 0
      }
     },
     {
      "do": "Make a thin ring and a deep cut, and read how far the leaves droop after thirty days."
     },
     {
      "observe": {
       "q": "Read your bar chart. Which cut made the leaves droop?",
       "options": [
        "The deep cut",
        "The thin ring",
        "Both cuts, equally"
       ],
       "answer": 0
      }
     },
     {
      "note": "A thin ring leaves the water-carrying tubes whole. A deep cut removes them, so the leaves above it wilt."
     }
    ]
   },
   {
    "id": "c",
    "title": "Advise the gardener",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "A gardener wants bigger fruit and a healthy tree. Three pieces of advice wait on the board."
     },
     {
      "predict": {
       "q": "Which piece of advice gives bigger fruit and keeps the tree healthy?",
       "options": [
        "Cut only a thin ring through the outer tubes.",
        "Cut as deep as possible.",
        "Do not cut at all, because any cut kills the branch."
       ],
       "answer": 0
      }
     },
     {
      "do": "Follow each piece of advice for thirty days. Then read the fruit size and the healthy leaves."
     },
     {
      "observe": {
       "q": "Read your bar chart. Which advice gave the biggest fruit?",
       "options": [
        "The thin ring",
        "The deepest cut",
        "No cut"
       ],
       "answer": 0
      }
     },
     {
      "note": "A thin ring grows bigger fruit and keeps the water-carrying tubes whole, so the tree stays healthy."
     }
    ]
   }
  ],
  "written": [
   {
    "kind": "define",
    "q": "What are the food-carrying tubes in a plant? [1]",
    "marks": 1,
    "concept": "Food-carrying tubes transport the food made in the leaves to the other parts of the plant.",
    "model": "The food-carrying tubes are tubes in the plant that carry the food made in the leaves to all the other parts of the plant.",
    "points": [
     {
      "point": "tubes that carry (transport) food made in the leaves to the other parts of the plant",
      "marks": 1
     }
    ],
    "alsoAccept": [
     "tubes that transport food from the leaves to the rest of the plant, such as the fruit and the roots",
     "tubes in the stem that carry food from the leaves to all parts of the plant"
    ],
    "doNotAccept": [
     "tubes that carry water",
     "tubes that carry food up from the roots",
     "tubes that carry food from the soil",
     "tubes that make food"
    ]
   },
   {
    "kind": "explain",
    "q": "In your results, the fruit above a ring cut grew bigger than the fruit on a branch with no ring. Explain why. [2]",
    "marks": 2,
    "concept": "A ring cut removes the food-carrying tubes, so food made in the leaves cannot pass the cut and builds up above it, giving the fruit there more food.",
    "model": "The ring cut removes the food-carrying tubes at that spot, so the food made in the leaves cannot pass the cut. The food builds up above the cut, so the fruit there gets more food and grows bigger.",
    "points": [
     {
      "point": "the ring cut removes (cuts) the food-carrying tubes, so food made in the leaves cannot pass the cut",
      "marks": 1
     },
     {
      "point": "food builds up above the cut, so the fruit there gets more food and grows bigger",
      "marks": 1
     }
    ],
    "doNotAccept": [
     "water builds up above the cut",
     "the cut makes the leaves make more food",
     "the fruit gets more water",
     "the fruit has more room to grow"
    ]
   },
   {
    "kind": "explain",
    "q": "In your results, the leaves above the deep cut drooped, but the leaves above the thin ring did not. Explain why. [2]",
    "marks": 2,
    "concept": "A deep cut also removes the water-carrying tubes, so water from the roots cannot reach the leaves above it; a thin ring leaves the water-carrying tubes whole.",
    "model": "The deep cut also removes the water-carrying tubes, so water from the roots cannot reach the leaves above the cut and they wilt. The thin ring removes only the food-carrying tubes, so water still reaches the leaves.",
    "points": [
     {
      "point": "the deep cut removes (cuts) the water-carrying tubes as well, so water (from the roots) cannot reach the leaves above the cut",
      "marks": 1
     },
     {
      "point": "the thin ring leaves the water-carrying tubes whole (only the food-carrying tubes are removed), so water still reaches the leaves",
      "marks": 1
     }
    ],
    "doNotAccept": [
     "the leaves above the deep cut get no food",
     "any cut makes the leaves wilt",
     "the deep cut hurts the tree (does not say which tubes)",
     "the leaves get no sunlight"
    ]
   }
  ]
 },
 "p5-4-1": {
  "status": "review",
  "minutes": 30,
  "bigIdea": "Air is a mixture of gases, not one gas alone. Most of it is nitrogen, then oxygen, with a small amount of carbon dioxide and other gases. A glowing splint keeps glowing when oxygen is present, and limewater turns cloudy with carbon dioxide. The next lab follows this air into the body.",
  "aim": "Every breath pulls in air. Is air one single gas, or a mixture of several? A sealed jar of air stands on the bench, with a bank of share tubes, a glowing splint and a tube of limewater beside it.",
  "safety": [
   "Limewater is for testing only, never for drinking. A real glowing splint is handled by an adult."
  ],
  "sim": {
   "page": "labs/p5-4-1/index.html",
   "label": "Let's test it now!",
   "covers": [
    "a",
    "b",
    "c"
   ],
   "map": {
    "a": "layers",
    "b": "build",
    "c": "test"
   }
  },
  "badge": {
   "icon": "🫙",
   "name": "Breath of Air",
   "line": "You predicted, tested and explained every part of Breath of Air."
  },
  "parts": [
   {
    "id": "a",
    "title": "One gas or many",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "A sealed jar holds air. From outside it looks like clear nothing. The inside view turns the jar to glass."
     },
     {
      "predict": {
       "q": "Is the air in the jar one single gas, or a mix of several gases?",
       "options": [
        "A mix of several gases.",
        "One gas only.",
        "A mix, but mostly carbon dioxide."
       ],
       "answer": 0
      }
     },
     {
      "do": "Look at the jar from outside, then see inside, and count the different gases you can pick out."
     },
     {
      "observe": {
       "q": "Look at your results table. Which view showed more different gases in the air?",
       "options": [
        "See inside",
        "From outside",
        "Both the same"
       ],
       "answer": 0
      }
     },
     {
      "note": "Air is a mixture of several gases, not one gas alone. From outside it looks like one clear gas."
     }
    ]
   },
   {
    "id": "b",
    "title": "Build the mix",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "Air is a mix, but the gases are not in equal shares. A tall tube shows a big share of the jar."
     },
     {
      "predict": {
       "q": "Which gas makes up the biggest share of air?",
       "options": [
        "Nitrogen.",
        "Oxygen.",
        "Carbon dioxide."
       ],
       "answer": 0
      }
     },
     {
      "do": "Measure the share of nitrogen, oxygen, and carbon dioxide with the other gases in the jar of air."
     },
     {
      "observe": {
       "q": "Read your bar chart. Which gas has the biggest share of the air?",
       "options": [
        "Nitrogen",
        "Oxygen",
        "Carbon dioxide and other gases"
       ],
       "answer": 0
      }
     },
     {
      "note": "Most of the air is nitrogen, then oxygen, with only a small sliver of carbon dioxide and other gases."
     }
    ]
   },
   {
    "id": "c",
    "title": "Which gas is which",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "A glowing splint and a tube of limewater stand beside the jar. Each is tested with air from the jar."
     },
     {
      "predict": {
       "q": "What will happen to the splint and the limewater when they are tested with air from the jar?",
       "options": [
        "The splint keeps glowing and the limewater turns cloudy.",
        "Only the splint changes.",
        "Only the limewater changes."
       ],
       "answer": 0
      }
     },
     {
      "do": "Test the air in the jar with a glowing splint and with limewater, and score the sign you see."
     },
     {
      "observe": {
       "q": "Both tests gave a sign. A splint that keeps glowing shows that the air contains…",
       "options": [
        "oxygen",
        "carbon dioxide",
        "nitrogen"
       ],
       "answer": 0
      }
     },
     {
      "note": "A splint that keeps glowing shows oxygen is present. Cloudy limewater shows carbon dioxide is present."
     }
    ]
   }
  ],
  "written": [
   {
    "kind": "define",
    "q": "What is air? [1]",
    "marks": 1,
    "concept": "Air is a mixture of gases (mostly nitrogen, then oxygen, with a small amount of carbon dioxide and other gases), not one gas alone.",
    "model": "Air is a mixture of gases, such as nitrogen, oxygen and carbon dioxide.",
    "points": [
     {
      "point": "air is a mixture of (several different) gases",
      "marks": 1
     }
    ],
    "alsoAccept": [
     "air is made up of several gases mixed together, such as nitrogen, oxygen and carbon dioxide",
     "a mixture of nitrogen, oxygen, carbon dioxide and other gases"
    ],
    "doNotAccept": [
     "air is oxygen",
     "air is a gas (one gas only)",
     "air is what we breathe (does not say what it is made up of)",
     "air is nothing"
    ]
   },
   {
    "kind": "explain",
    "q": "On the bench, the glowing splint kept glowing when it was tested with air from the jar. Explain why. [2]",
    "marks": 2,
    "concept": "A glowing splint keeps glowing when oxygen is present, and oxygen is one of the gases in air.",
    "model": "A glowing splint keeps glowing when oxygen is present. Air contains oxygen, so the splint kept glowing in the air from the jar.",
    "points": [
     {
      "point": "a glowing splint keeps glowing when oxygen is present (it is a test for oxygen)",
      "marks": 1
     },
     {
      "point": "air contains oxygen (oxygen is one of the gases in the air in the jar)",
      "marks": 1
     }
    ],
    "doNotAccept": [
     "air is all oxygen",
     "the splint glows because of carbon dioxide",
     "nitrogen keeps the splint glowing because there is most of it",
     "the splint was already glowing (only repeats the question)"
    ]
   },
   {
    "kind": "explain",
    "q": "On the bench, the limewater turned cloudy, but only slowly, when it was tested with air from the jar. Explain why. [2]",
    "marks": 2,
    "concept": "Limewater turns cloudy when carbon dioxide is present; air contains only a small amount of carbon dioxide, so the change is slow.",
    "model": "Limewater turns cloudy when carbon dioxide is present, so the air contains carbon dioxide. Only a very small share of the air is carbon dioxide, so the limewater turned cloudy slowly.",
    "points": [
     {
      "point": "limewater turns cloudy when carbon dioxide is present, so air contains carbon dioxide",
      "marks": 1
     },
     {
      "point": "air has only a small amount (a small share) of carbon dioxide, so the limewater turned cloudy slowly",
      "marks": 1
     }
    ],
    "doNotAccept": [
     "oxygen turns the limewater cloudy",
     "there is no carbon dioxide in air",
     "the limewater was dirty",
     "most of the air is carbon dioxide"
    ]
   }
  ]
 },
 "p5-4-2a": {
  "status": "review",
  "minutes": 30,
  "bigIdea": "Air enters through the nose, travels down the windpipe and reaches the lungs. The nose warms and filters the air, and the windpipe is a passage for it. The lungs are where oxygen and carbon dioxide are exchanged. A deeper breath fills the lungs more than a shallow one.",
  "aim": "Every breath enters the body and travels through several parts before it reaches the lungs. A see-inside torso shows the nose, the windpipe and the lungs, so you can trace the route.",
  "safety": [],
  "sim": {
   "page": "labs/p5-4-2a/index.html",
   "label": "Let's test it now!",
   "covers": [
    "a",
    "b",
    "c"
   ],
   "map": {
    "a": "route",
    "b": "tag",
    "c": "depth"
   }
  },
  "badge": {
   "icon": "🫁",
   "name": "Airway Explorer",
   "line": "You predicted, tested and explained every part of Airway Explorer."
  },
  "parts": [
   {
    "id": "a",
    "title": "Which way does air go",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "A breath of air enters the body and ends in the lungs. The torso is see-through."
     },
     {
      "predict": {
       "q": "Which order does a breath of air travel through the body?",
       "options": [
        "Nose, windpipe, lungs.",
        "Windpipe, nose, lungs.",
        "Lungs, nose, windpipe."
       ],
       "answer": 0
      }
     },
     {
      "do": "Choose breathing in or out, then tap the parts in the order the air meets them."
     },
     {
      "observe": {
       "q": "Look back at both journeys. Breathing out used the same parts as breathing in, but in…",
       "options": [
        "the opposite order",
        "the same order",
        "a different set of parts"
       ],
       "answer": 0
      }
     },
     {
      "note": "Air enters through the nose, passes down the windpipe and reaches the lungs. Breathing out follows the same tube back."
     }
    ]
   },
   {
    "id": "b",
    "title": "What each part does",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "The nose, windpipe and lungs each have their own job. Three job cards stand beside the torso."
     },
     {
      "predict": {
       "q": "Which part filters and warms the air first?",
       "options": [
        "The nose.",
        "The windpipe.",
        "The lungs."
       ],
       "answer": 0
      }
     },
     {
      "do": "Choose a part of the airway, then tap the job that belongs to it."
     },
     {
      "observe": {
       "q": "Look back at your matches. Which part is where oxygen and carbon dioxide are exchanged?",
       "options": [
        "The lungs",
        "The windpipe",
        "The nose"
       ],
       "answer": 0
      }
     },
     {
      "note": "The nose warms and filters the air, the windpipe is a passage, and the lungs exchange gases."
     }
    ]
   },
   {
    "id": "c",
    "title": "Breathe and watch",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "The lungs are glass, so you can watch them fill. The torso stays the same size and at rest."
     },
     {
      "predict": {
       "q": "Does a deep breath fill the lungs more than a shallow breath?",
       "options": [
        "Yes, they fill more.",
        "No, they always fill the same.",
        "No. Only the windpipe changes size."
       ],
       "answer": 0
      }
     },
     {
      "do": "Choose a shallow, medium or deep breath and read how full the lungs get."
     },
     {
      "observe": {
       "q": "Look at the points. As the breath gets deeper, the lung fill…",
       "options": [
        "increases",
        "stays the same",
        "decreases"
       ],
       "answer": 0
      }
     },
     {
      "note": "A deeper breath draws in more air, so the lungs fill more than they do with a shallow breath."
     }
    ]
   }
  ],
  "written": [
   {
    "kind": "define",
    "q": "What do the lungs do? [1]",
    "marks": 1,
    "concept": "The lungs are the part of the body where oxygen and carbon dioxide are exchanged.",
    "model": "The lungs are where oxygen and carbon dioxide are exchanged.",
    "points": [
     {
      "point": "the lungs are where gases (oxygen and carbon dioxide) are exchanged",
      "marks": 1
     }
    ],
    "alsoAccept": [
     "the lungs exchange gases",
     "oxygen and carbon dioxide are swapped in the lungs",
     "in the lungs, oxygen from the air is taken into the body and carbon dioxide is removed"
    ],
    "doNotAccept": [
     "the lungs warm and filter the air",
     "the lungs are a passage for air",
     "the lungs pump blood",
     "the lungs hold air (does not mention the exchange of gases)"
    ]
   },
   {
    "kind": "explain",
    "q": "On the bench, the air you breathed out met the same parts as the air you breathed in, but in the opposite order. Explain why. [2]",
    "marks": 2,
    "concept": "Air breathed out starts in the lungs and leaves by the same passage it came in by: up the windpipe and out through the nose.",
    "model": "The air that is breathed out starts in the lungs. It follows the same passage back, up the windpipe and out through the nose, so it meets the same parts in the opposite order.",
    "points": [
     {
      "point": "air that is breathed out starts in (leaves from) the lungs, where breathed-in air ended",
      "marks": 1
     },
     {
      "point": "it travels back along the same passage: up the windpipe and then out through the nose",
      "marks": 1
     }
    ],
    "doNotAccept": [
     "the air goes out through a different tube",
     "the air goes out through the heart",
     "because breathing out is the opposite of breathing in (only repeats the question)",
     "the lungs push the air into the stomach"
    ]
   },
   {
    "kind": "explain",
    "q": "In your results, a deep breath filled the lungs more than a shallow breath. Explain why. [2]",
    "marks": 2,
    "concept": "A deeper breath draws more air into the body, and that air goes into the lungs, so they fill more.",
    "model": "A deep breath draws in more air than a shallow breath. The air goes into the lungs, so the lungs hold more air and fill more.",
    "points": [
     {
      "point": "a deeper breath draws (takes) in more air",
      "marks": 1
     },
     {
      "point": "the air goes into the lungs, so the lungs hold more air and fill (swell) more",
      "marks": 1
     }
    ],
    "doNotAccept": [
     "the lungs always fill the same",
     "only the windpipe gets bigger",
     "a deep breath is faster",
     "the lungs grow more parts"
    ]
   }
  ]
 },
 "p5-4-2b": {
  "status": "review",
  "minutes": 30,
  "bigIdea": "Breathed-out air turns limewater cloudy because it carries more carbon dioxide than room air. It leaves a foggy patch on a cool mirror because it carries water vapour. Compared with air breathed in, air breathed out has less oxygen and more carbon dioxide and water vapour. Both are mixtures of gases. We do not breathe in only oxygen.",
  "aim": "The air breathed out is not the same as the air breathed in. A tube of limewater with a straw, a small mirror and a gas chart stand on the bench, ready to find out how the air changes.",
  "safety": [
   "Limewater is for testing only, never for drinking."
  ],
  "sim": {
   "page": "labs/p5-4-2b/index.html",
   "label": "Let's test it now!",
   "covers": [
    "a",
    "b",
    "c"
   ],
   "map": {
    "a": "blow",
    "b": "mirror",
    "c": "compare"
   }
  },
  "badge": {
   "icon": "🧪",
   "name": "Limewater Test",
   "line": "You predicted, tested and explained every part of Limewater Test."
  },
  "parts": [
   {
    "id": "a",
    "title": "Blow into limewater",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "Limewater is clear. Air will be blown through a straw into the tube for one minute."
     },
     {
      "predict": {
       "q": "Will blowing breath into limewater make it turn cloudy?",
       "options": [
        "Yes, it turns cloudy.",
        "No, it stays clear.",
        "Yes, but only from the moisture in breath."
       ],
       "answer": 0
      }
     },
     {
      "do": "Blow room air, then breath, through a straw into limewater and score how cloudy it gets."
     },
     {
      "observe": {
       "q": "Look at the points. From room air to breath, the cloudiness…",
       "options": [
        "increases",
        "stays the same",
        "decreases"
       ],
       "answer": 0
      }
     },
     {
      "note": "Exhaled breath turns limewater cloudy because it carries more carbon dioxide than room air."
     }
    ]
   },
   {
    "id": "b",
    "title": "Breath on the mirror",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "A small mirror stands on the bench. It is clear and dry. Breath will be blown onto it."
     },
     {
      "predict": {
       "q": "What will appear on the mirror after breathing out onto it?",
       "options": [
        "A foggy patch of tiny water droplets.",
        "Nothing at all.",
        "A patch that never clears."
       ],
       "answer": 0
      }
     },
     {
      "do": "Look at the mirror before and after breath is blown onto it, and score the fog."
     },
     {
      "observe": {
       "q": "Look at your results table. When was the mirror foggy?",
       "options": [
        "After the breath",
        "Before the breath",
        "Both times, equally"
       ],
       "answer": 0
      }
     },
     {
      "note": "A foggy patch on the mirror shows exhaled breath carries water vapour. The vapour turns into tiny droplets on the cool glass."
     }
    ]
   },
   {
    "id": "c",
    "title": "Compare the air",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "A chart shows four groups of gases. Pale bars are air breathed in and warm bars are air breathed out."
     },
     {
      "predict": {
       "q": "How does the air breathed out compare with the air breathed in?",
       "options": [
        "Less oxygen, and more carbon dioxide and water vapour.",
        "More of every gas.",
        "Exactly the same."
       ],
       "answer": 0
      }
     },
     {
      "do": "Measure the gases in the air breathed in and the air breathed out, and compare the oxygen bars."
     },
     {
      "observe": {
       "q": "Read your bar chart. Compared with air breathed in, air breathed out has…",
       "options": [
        "less oxygen",
        "more oxygen",
        "the same oxygen"
       ],
       "answer": 0
      }
     },
     {
      "note": "Air breathed out has less oxygen, and more carbon dioxide and water vapour, than air breathed in. It is a mixture, not one gas."
     }
    ]
   }
  ],
  "written": [
   {
    "kind": "define",
    "q": "What is water vapour? [1]",
    "marks": 1,
    "concept": "Water vapour is water in the form of a gas; it is one of the gases in the air we breathe out.",
    "model": "Water vapour is water in the form of a gas.",
    "points": [
     {
      "point": "water in the form of a gas (water in its gaseous state)",
      "marks": 1
     }
    ],
    "alsoAccept": [
     "water as a gas",
     "the gas that water changes into when it evaporates",
     "water that is a gas and cannot be seen"
    ],
    "doNotAccept": [
     "tiny droplets of water",
     "fog or mist",
     "steam that you can see",
     "hot water"
    ]
   },
   {
    "kind": "explain",
    "q": "In your results, breath made the limewater much cloudier than room air did. Explain why. [2]",
    "marks": 2,
    "concept": "Limewater turns cloudy when carbon dioxide is present, and breathed-out air carries more carbon dioxide than room air.",
    "model": "Limewater turns cloudy when carbon dioxide is present. Breath carries more carbon dioxide than room air, so it made the limewater much cloudier.",
    "points": [
     {
      "point": "limewater turns cloudy when carbon dioxide is present (cloudy limewater is the test for carbon dioxide)",
      "marks": 1
     },
     {
      "point": "breath (air breathed out) carries more carbon dioxide than room air",
      "marks": 1
     }
    ],
    "doNotAccept": [
     "breath is only carbon dioxide",
     "the water vapour in breath makes limewater cloudy",
     "breath has more oxygen",
     "breath is warmer"
    ]
   },
   {
    "kind": "explain",
    "q": "In your results, the air breathed out had less oxygen and more carbon dioxide than the air breathed in. Explain why. [2]",
    "marks": 2,
    "concept": "The body uses up some of the oxygen in the air breathed in and adds carbon dioxide to the air breathed out.",
    "model": "The body takes in and uses up some of the oxygen from the air breathed in, so less oxygen is breathed out. The body also gives out carbon dioxide, which is added to the air breathed out.",
    "points": [
     {
      "point": "the body takes in (uses up) some of the oxygen from the air breathed in",
      "marks": 1
     },
     {
      "point": "the body gives out (adds) carbon dioxide to the air that is breathed out",
      "marks": 1
     }
    ],
    "doNotAccept": [
     "we breathe in only oxygen and breathe out only carbon dioxide",
     "the body uses up all the oxygen",
     "the lungs make oxygen",
     "it had less oxygen because it was breathed out (only repeats the question)"
    ]
   }
  ]
 },
 "p5-4-3": {
  "status": "review",
  "minutes": 30,
  "bigIdea": "A plant, a fish and a human all exchange oxygen and carbon dioxide, through different parts. A plant uses tiny leaf openings, a fish uses gills, and a human uses lungs. Warm water brings out tiny bubbles of gas from a leaf, showing its openings. Every living thing needs a way to exchange gases.",
  "aim": "A plant, a fish and a human all take in oxygen and give out carbon dioxide, but each uses a different part to do it. A magnifier and a beaker of warm water stand beside them.",
  "safety": [
   "The warm water is handled by the bench. Never touch hot water yourself."
  ],
  "sim": {
   "page": "labs/p5-4-3/index.html",
   "label": "Let's test it now!",
   "covers": [
    "a",
    "b",
    "c"
   ],
   "map": {
    "a": "spot",
    "b": "follow",
    "c": "warm"
   }
  },
  "badge": {
   "icon": "🐟",
   "name": "Three Ways to Breathe",
   "line": "You predicted, tested and explained every part of Three Ways to Breathe."
  },
  "parts": [
   {
    "id": "a",
    "title": "Spot the gas doors",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "Each living thing swaps oxygen and carbon dioxide with its surroundings through one part."
     },
     {
      "predict": {
       "q": "Which part does each living thing use to swap gases?",
       "options": [
        "Leaf openings for the plant, gills for the fish, lungs for the human.",
        "Lungs for all three.",
        "Gills for all three."
       ],
       "answer": 0
      }
     },
     {
      "do": "Choose a living thing, then tap the part it uses to swap gases with the air or water."
     },
     {
      "observe": {
       "q": "Look back at your finds. Which living thing uses gills?",
       "options": [
        "The fish",
        "The plant",
        "The human"
       ],
       "answer": 0
      }
     },
     {
      "note": "A plant uses tiny leaf openings, a fish uses gills, and a human uses lungs to exchange gases."
     }
    ]
   },
   {
    "id": "b",
    "title": "Follow the oxygen",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "Oxygen enters each living thing at its gas part. A faint path shows the way inward."
     },
     {
      "predict": {
       "q": "Once oxygen enters each living thing, where does it go next?",
       "options": [
        "It travels further inward to be used.",
        "It stays only at the entry point.",
        "It leaves straight away, unused."
       ],
       "answer": 0
      }
     },
     {
      "do": "Choose a living thing, watch the arrow, then tap where the oxygen goes after it enters."
     },
     {
      "observe": {
       "q": "Look back at the three arrows. In every living thing, the oxygen travelled…",
       "options": [
        "further inward, to be used",
        "only to the place it came in",
        "straight back out again"
       ],
       "answer": 0
      }
     },
     {
      "note": "In each living thing, oxygen taken in at the gas part travels further inward to be used."
     }
    ]
   },
   {
    "id": "c",
    "title": "Warm leaf test",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "A leaf sits in a beaker of water. The bench sets the water temperature. Tiny bubbles come out of the leaf."
     },
     {
      "predict": {
       "q": "Will warm water bring out more tiny bubbles from the leaf than cool water?",
       "options": [
        "Yes, it brings out more bubbles.",
        "No. Warm water harms the leaf, so no bubbles appear.",
        "The same number either way."
       ],
       "answer": 0
      }
     },
     {
      "do": "Set the water temperature and count the tiny bubbles that come out of the leaf in five minutes."
     },
     {
      "observe": {
       "q": "Look at the points. As the water gets warmer, the number of bubbles…",
       "options": [
        "increases",
        "stays the same",
        "decreases"
       ],
       "answer": 0
      }
     },
     {
      "note": "Warm water brings out more tiny bubbles, which shows the leaf has openings that let gas in and out."
     }
    ]
   }
  ],
  "written": [
   {
    "kind": "define",
    "q": "What does it mean when a living thing exchanges gases? [1]",
    "marks": 1,
    "concept": "Exchanging gases means taking in oxygen from the surroundings and giving out carbon dioxide.",
    "model": "It means the living thing takes in oxygen from its surroundings and gives out carbon dioxide.",
    "points": [
     {
      "point": "it takes in oxygen and gives out carbon dioxide",
      "marks": 1
     }
    ],
    "alsoAccept": [
     "oxygen goes into the living thing and carbon dioxide comes out of it",
     "it swaps gases with the air or water around it: oxygen in, carbon dioxide out"
    ],
    "doNotAccept": [
     "it breathes with lungs",
     "it takes in air (does not name the gases)",
     "it takes in carbon dioxide and gives out oxygen only",
     "it changes one gas into another"
    ]
   },
   {
    "kind": "explain",
    "q": "On the bench, the oxygen did not stay at the gills or in the lungs. It travelled further inward. Explain why. [2]",
    "marks": 2,
    "concept": "Oxygen is needed inside the body, not only at the part where it enters, so it passes into the blood and is carried inward to be used.",
    "model": "Oxygen is needed inside the body, not just at the part where it enters. So the oxygen passes into the blood, which carries it further inward to be used.",
    "points": [
     {
      "point": "oxygen is needed (used) inside the body, not only at the gills or the lungs",
      "marks": 1
     },
     {
      "point": "the oxygen passes into the blood, which carries it further inward to where it is used",
      "marks": 1
     }
    ],
    "doNotAccept": [
     "the oxygen leaves straight away",
     "the oxygen turns into carbon dioxide at the gills",
     "the oxygen goes to the stomach",
     "because it moved inward (only repeats the question)"
    ]
   },
   {
    "kind": "explain",
    "q": "In your results, tiny bubbles came out of the leaf in the water, and more came out as the water got warmer. Explain what the bubbles show about the leaf. [2]",
    "marks": 2,
    "concept": "The bubbles are gas escaping from the leaf, which shows the leaf has tiny openings that let gases in and out.",
    "model": "The bubbles are gas escaping from inside the leaf, and warm water helps the gas escape faster. This shows that the leaf has tiny openings that let gases in and out.",
    "points": [
     {
      "point": "the bubbles are gas (trapped air) escaping from inside the leaf",
      "marks": 1
     },
     {
      "point": "this shows the leaf has tiny openings that let gases in and out",
      "marks": 1
     }
    ],
    "doNotAccept": [
     "the warm water is boiling",
     "the leaf is making new holes",
     "the leaf is drinking the water",
     "warm water has more bubbles (only repeats the question)"
    ]
   }
  ]
 },
 "p5-4-4": {
  "status": "review",
  "minutes": 30,
  "bigIdea": "Blood carries oxygen and digested food to the body, and carbon dioxide and waste away. The heart pumps blood round the body. A faster pump moves it more quickly. Blood visits the lungs to pick up oxygen before it reaches the rest of the body. Blood carries oxygen from the air, not air itself.",
  "aim": "The heart, the blood vessels and the blood work together to carry things all around the body. A see-inside torso, a pump dial and a stopwatch let you find out how.",
  "safety": [],
  "sim": {
   "page": "labs/p5-4-4/index.html",
   "label": "Let's test it now!",
   "covers": [
    "a",
    "b",
    "c"
   ],
   "map": {
    "a": "carry",
    "b": "pump",
    "c": "trace"
   }
  },
  "badge": {
   "icon": "❤️",
   "name": "Pump and Pipes",
   "line": "You predicted, tested and explained every part of Pump and Pipes."
  },
  "parts": [
   {
    "id": "a",
    "title": "What blood carries",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "Blood flows round the body in blood vessels. Each vessel carries something along."
     },
     {
      "predict": {
       "q": "What does blood carry around the body?",
       "options": [
        "Oxygen and digested food in, carbon dioxide and waste out.",
        "Only air.",
        "Only water."
       ],
       "answer": 0
      }
     },
     {
      "do": "Choose a blood vessel, then tap what it carries at that point."
     },
     {
      "observe": {
       "q": "Look back at the vessels. Blood carries oxygen and digested food…",
       "options": [
        "to the body, and carbon dioxide and waste away from it",
        "only as air",
        "only as water"
       ],
       "answer": 0
      }
     },
     {
      "note": "Blood carries oxygen and digested food to the body, and carbon dioxide and waste away from it."
     }
    ]
   },
   {
    "id": "b",
    "title": "Pump the heart",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "The heart pumps blood round a loop of vessels. A dial sets how fast it pumps."
     },
     {
      "predict": {
       "q": "Does a faster pumping heart move blood round the loop more quickly?",
       "options": [
        "Yes, the loop takes less time.",
        "No, the loop always takes the same time.",
        "Only the heart speeds up, not the blood."
       ],
       "answer": 0
      }
     },
     {
      "do": "Set the pump to slow, normal or fast and time a drop of blood round one full loop."
     },
     {
      "observe": {
       "q": "Look at the points. As the pump gets faster, the loop time…",
       "options": [
        "decreases",
        "stays the same",
        "increases"
       ],
       "answer": 0
      }
     },
     {
      "note": "A faster-pumping heart moves blood around the loop more quickly, so one trip takes less time."
     }
    ]
   },
   {
    "id": "c",
    "title": "Trace a loop",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "A drop of blood rides one full loop. It glows red with oxygen and blue with carbon dioxide."
     },
     {
      "predict": {
       "q": "Where does the blood pick up oxygen, and where does it give it up?",
       "options": [
        "It picks up oxygen at the lungs and gives it up at the body.",
        "It picks up oxygen at the body and gives it up at the lungs.",
        "It picks up oxygen at the heart and keeps it all the way round."
       ],
       "answer": 0
      }
     },
     {
      "do": "Choose the lungs or the body, watch the drop reach it, then tap what the drop carries as it leaves."
     },
     {
      "observe": {
       "q": "Look back at the drop. It picks up oxygen at the…",
       "options": [
        "lungs",
        "body",
        "heart"
       ],
       "answer": 0
      }
     },
     {
      "note": "Blood picks up oxygen at the lungs, then swaps it for carbon dioxide at the body."
     }
    ]
   }
  ],
  "written": [
   {
    "kind": "define",
    "q": "What are blood vessels? [1]",
    "marks": 1,
    "concept": "Blood vessels are the tubes that carry blood to and from every part of the body.",
    "model": "Blood vessels are tubes that carry blood around the body.",
    "points": [
     {
      "point": "tubes that carry blood around (to and from all parts of) the body",
      "marks": 1
     }
    ],
    "alsoAccept": [
     "tubes in the body that blood flows through",
     "tubes that carry blood from the heart to the parts of the body and back again"
    ],
    "doNotAccept": [
     "tubes that carry air",
     "the heart",
     "the blood itself",
     "tubes that carry food from the mouth to the stomach"
    ]
   },
   {
    "kind": "explain",
    "q": "In your results, a drop of blood went round the loop in less time when the heart pumped faster. Explain why. [2]",
    "marks": 2,
    "concept": "The heart is the pump that pushes blood along the blood vessels; a faster pump moves the blood along more quickly, so one loop takes less time.",
    "model": "The heart pumps the blood along the blood vessels. When the heart pumps faster, it pushes the blood along more quickly, so the drop takes less time to go once round the loop.",
    "points": [
     {
      "point": "the heart pumps (pushes) the blood along the blood vessels round the body",
      "marks": 1
     },
     {
      "point": "a faster pump moves the blood along more quickly, so the drop takes less time to go round the loop",
      "marks": 1
     }
    ],
    "doNotAccept": [
     "the blood vessels get shorter",
     "the heart makes more blood",
     "blood always travels at the same speed",
     "the loop took less time because the heart was faster (only repeats the question)"
    ]
   },
   {
    "kind": "explain",
    "q": "On the bench, the drop of blood was carrying oxygen when it left the lungs, but carbon dioxide when it left the body. Explain why. [2]",
    "marks": 2,
    "concept": "Blood picks up oxygen at the lungs, then gives up the oxygen to the body and takes carbon dioxide away from it.",
    "model": "At the lungs, the blood picks up oxygen. At the body, the blood gives up the oxygen to the parts of the body and takes away the carbon dioxide from them.",
    "points": [
     {
      "point": "the blood picks up oxygen at the lungs",
      "marks": 1
     },
     {
      "point": "at the body the blood gives up its oxygen (to the parts of the body) and picks up carbon dioxide to carry away",
      "marks": 1
     }
    ],
    "doNotAccept": [
     "the heart makes the oxygen",
     "the body makes oxygen for the blood",
     "blood carries air",
     "the oxygen runs out by itself"
    ]
   }
  ]
 },
 "p5-4-5": {
  "status": "review",
  "minutes": 30,
  "bigIdea": "Plants and humans both move substances to every part of their body to help them survive. The human system has a pump, the heart. The plant system shown here has none. Some jobs, like carrying food, are shared by both systems. The two systems are alike in their job, but they are not the same.",
  "aim": "A plant and a human each have their own way of moving things to every part of their body. A glass plant with its tubes lit and a see-inside torso with its blood vessels lit stand side by side, with a tray of feature cards in front.",
  "safety": [],
  "sim": {
   "page": "labs/p5-4-5/index.html",
   "label": "Let's test it now!",
   "covers": [
    "a",
    "b",
    "c"
   ],
   "map": {
    "a": "same",
    "b": "differ",
    "c": "sort"
   }
  },
  "badge": {
   "icon": "🤝",
   "name": "Two Systems Side by Side",
   "line": "You predicted, tested and explained every part of Two Systems Side by Side."
  },
  "parts": [
   {
    "id": "a",
    "title": "Same job",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "The plant's tubes and the human's blood vessels both run to every part of their living thing."
     },
     {
      "predict": {
       "q": "What job do the plant's tubes and the human's blood vessels share?",
       "options": [
        "Both carry substances to every part.",
        "Only the plant's tubes carry anything.",
        "Only the human's vessels carry anything."
       ],
       "answer": 0
      }
     },
     {
      "do": "Choose a substance card, then tap the system that carries it to every part: the plant, the human, or both."
     },
     {
      "observe": {
       "q": "Look back at your matches. Which card went to both systems?",
       "options": [
        "Food",
        "Water",
        "Oxygen"
       ],
       "answer": 0
      }
     },
     {
      "note": "Both the plant system and the human system carry substances to every part of the living thing."
     }
    ]
   },
   {
    "id": "b",
    "title": "What's different",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "Each system moves its fluid round the living thing. Look and count for a part that beats."
     },
     {
      "predict": {
       "q": "What is different between the plant's tubes and the human's blood vessels?",
       "options": [
        "The human system has a pump, the heart.",
        "The plant system has a pump too.",
        "There is no difference."
       ],
       "answer": 0
      }
     },
     {
      "do": "Choose the human system or the plant system, and count the beats you see in ten seconds."
     },
     {
      "observe": {
       "q": "Look at your results table. Which system has a beating pump?",
       "options": [
        "The human system",
        "The plant system",
        "Both systems"
       ],
       "answer": 0
      }
     },
     {
      "note": "The human system has a pump, the heart. The plant system shown here has none."
     }
    ]
   },
   {
    "id": "c",
    "title": "Which one am I",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "Five feature cards wait in the tray. Each belongs in the plant bin, the human bin, or both."
     },
     {
      "predict": {
       "q": "Where does the card \"found in blood vessels\" belong?",
       "options": [
        "The human bin.",
        "The plant bin.",
        "Both bins."
       ],
       "answer": 0
      }
     },
     {
      "do": "Choose a feature card, then tap the bin it belongs in: the plant bin, the human bin, or both."
     },
     {
      "observe": {
       "q": "Look back at your sorting. Which feature belongs only to the human system?",
       "options": [
        "Pumped by a heart",
        "Carries food",
        "Found in leaves"
       ],
       "answer": 0
      }
     },
     {
      "note": "Some features, like carrying food, are shared. Others, like a pump, belong only to humans."
     }
    ]
   }
  ],
  "written": [
   {
    "kind": "define",
    "q": "What are the water-carrying tubes of a plant? [1]",
    "marks": 1,
    "concept": "Water-carrying tubes transport water taken in by the roots up the stem to the leaves and the other parts of the plant.",
    "model": "The water-carrying tubes are tubes that carry water from the roots up to the leaves and the other parts of the plant.",
    "points": [
     {
      "point": "tubes that carry (transport) water from the roots to the leaves (the other parts of the plant)",
      "marks": 1
     }
    ],
    "alsoAccept": [
     "tubes in the stem that carry water up from the roots to all parts of the plant",
     "tubes that transport the water taken in by the roots to the rest of the plant"
    ],
    "doNotAccept": [
     "tubes that carry food",
     "tubes that carry blood",
     "tubes that carry water from the leaves down to the roots",
     "the roots"
    ]
   },
   {
    "kind": "explain",
    "q": "On the bench, the food card went to both the plant system and the human system. Explain why. [2]",
    "marks": 2,
    "concept": "Every part of a plant and of a human needs food, and both transport systems carry food to every part.",
    "model": "Every part of a plant and every part of a human needs food. Both systems carry food to every part: the plant's food-carrying tubes carry food from the leaves, and the human's blood vessels carry digested food in the blood.",
    "points": [
     {
      "point": "every part of a living thing (a plant and a human) needs food",
      "marks": 1
     },
     {
      "point": "both systems carry food to every part (the plant's tubes carry food made in the leaves; the human's blood carries digested food)",
      "marks": 1
     }
    ],
    "doNotAccept": [
     "only plants make food, so only the plant system carries food",
     "only humans eat food",
     "both systems are exactly the same",
     "because food is in both bins (only repeats the question)"
    ]
   },
   {
    "kind": "explain",
    "q": "In your results, you counted beats in the human system but no beats in the plant system. Explain why. [2]",
    "marks": 2,
    "concept": "The human system has a pump, the heart, which beats to push blood along the blood vessels; the plant system has no pump.",
    "model": "The human system has a heart. The heart is a pump that beats to push the blood along the blood vessels. The plant system has no pump, so no part of it beats.",
    "points": [
     {
      "point": "the human system has a heart, a pump that beats to push (pump) blood along the blood vessels",
      "marks": 1
     },
     {
      "point": "the plant system has no pump (no heart, no part that beats)",
      "marks": 1
     }
    ],
    "doNotAccept": [
     "plants do not carry anything",
     "the plant's heart beats too slowly to count",
     "plants are not living things",
     "the plant's tubes are too small to see the beats"
    ]
   }
  ]
 },
 "p5-4-6": {
  "status": "review",
  "minutes": 30,
  "bigIdea": "Heart rate and breathing rate rise with more vigorous activity. The muscles need more oxygen and digested food, so the heart pumps faster. Breathing quickens too, to take in the extra oxygen. Sitting still gives the lowest heart rate and breathing rate, and jumping gives the highest.",
  "aim": "Sitting still, marching and jumping all feel different. A body model does each one, with a pulse sensor counting its heartbeats and a breath counter beside it. Measure how heart rate and breathing rate change.",
  "safety": [
   "The body model does the sitting, marching and jumping, so you do not need to move to test it."
  ],
  "sim": {
   "page": "labs/p5-4-6/index.html",
   "label": "Let's test it now!",
   "covers": [
    "a",
    "b",
    "c"
   ],
   "map": {
    "a": "choose",
    "b": "pattern",
    "c": "climb"
   }
  },
  "badge": {
   "icon": "🫀",
   "name": "Heart Rate Challenge",
   "line": "You predicted, tested and explained every part of Heart Rate Challenge."
  },
  "parts": [
   {
    "id": "a",
    "title": "Choose the activity",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "The model sits, marches or jumps. The pulse sensor counts heartbeats for 15 seconds."
     },
     {
      "predict": {
       "q": "Which activity will give the highest heart rate?",
       "options": [
        "Jumping.",
        "Sitting.",
        "All the same."
       ],
       "answer": 0
      }
     },
     {
      "do": "Choose sitting, marching or jumping, and measure the heart rate and breathing rate for 15 seconds."
     },
     {
      "observe": {
       "q": "Read your bar chart. Which activity gave the highest heart rate?",
       "options": [
        "Jumping",
        "Sitting",
        "All the same"
       ],
       "answer": 0
      }
     },
     {
      "note": "A more vigorous activity raises both heart rate and breathing rate."
     }
    ]
   },
   {
    "id": "b",
    "title": "See the pattern",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "The three average breathing rates stand side by side as bars. Read them from left to right."
     },
     {
      "predict": {
       "q": "How does breathing rate change from sitting to marching to jumping?",
       "options": [
        "It rises steadily, like the heart rate.",
        "It falls.",
        "It stays flat."
       ],
       "answer": 0
      }
     },
     {
      "do": "Read the average breathing rate for sitting, marching and jumping, then name the trend."
     },
     {
      "observe": {
       "q": "Look at the bars from left to right. From sitting to jumping, the breathing rate…",
       "options": [
        "increases",
        "stays the same",
        "decreases"
       ],
       "answer": 0
      }
     },
     {
      "note": "Breathing rate rises as the activity becomes more vigorous, just as the heart rate does."
     }
    ]
   },
   {
    "id": "c",
    "title": "Why it climbs",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "The torso is glass, so the heart and lungs show. A dial sets the effort from rest to vigorous."
     },
     {
      "predict": {
       "q": "Why does the heart beat faster during vigorous activity?",
       "options": [
        "The muscles need more oxygen and digested food.",
        "It is only from feeling excited.",
        "The lungs slow down, so the heart speeds up."
       ],
       "answer": 0
      }
     },
     {
      "do": "Choose an effort level from rest to vigorous, and watch the heart and lungs speed up together."
     },
     {
      "observe": {
       "q": "Look at the points. As the effort level rises, the heart rate…",
       "options": [
        "increases",
        "stays the same",
        "decreases"
       ],
       "answer": 0
      }
     },
     {
      "note": "The heart and breathing speed up as the effort rises. Working muscles need more oxygen and digested food."
     }
    ]
   }
  ],
  "written": [
   {
    "kind": "define",
    "q": "What is heart rate? [1]",
    "marks": 1,
    "concept": "Heart rate is the number of times the heart beats in one minute.",
    "model": "Heart rate is the number of times the heart beats in one minute.",
    "points": [
     {
      "point": "the number of heartbeats (times the heart beats) in one minute",
      "marks": 1
     }
    ],
    "alsoAccept": [
     "how many times the heart beats in a minute",
     "the number of beats of the heart in a given time, such as one minute"
    ],
    "doNotAccept": [
     "how hard the heart beats",
     "the number of breaths in one minute",
     "how fast the blood is",
     "how fast the heart is (no mention of counting beats in a time)"
    ]
   },
   {
    "kind": "explain",
    "q": "In your results, the heart rate was higher when the body model was jumping than when it was sitting. Explain why. [2]",
    "marks": 2,
    "concept": "During vigorous activity the working muscles need more oxygen and digested food, so the heart pumps faster to deliver them in the blood.",
    "model": "Jumping is a more vigorous activity, so the muscles need more oxygen and digested food. The heart beats faster to pump blood carrying oxygen and digested food to the muscles more quickly.",
    "points": [
     {
      "point": "during vigorous activity the (working) muscles need more oxygen and digested food",
      "marks": 1
     },
     {
      "point": "the heart beats (pumps) faster to carry oxygen and digested food in the blood to the muscles more quickly",
      "marks": 1
     }
    ],
    "doNotAccept": [
     "the model is excited",
     "the heart is tired",
     "the lungs slow down so the heart speeds up",
     "jumping is harder so the heart is faster (only repeats the question)"
    ]
   },
   {
    "kind": "explain",
    "q": "In your results, the breathing rate also rose as the activity became more vigorous. Explain why. [2]",
    "marks": 2,
    "concept": "A more vigorous activity needs more oxygen, and faster breathing takes more oxygen into the body.",
    "model": "In a more vigorous activity, the body needs more oxygen. Breathing faster takes in more air, so more oxygen is taken into the body to supply the working muscles.",
    "points": [
     {
      "point": "the body (the working muscles) needs more oxygen during a more vigorous activity",
      "marks": 1
     },
     {
      "point": "breathing faster takes in more air, so more oxygen is taken into the body",
      "marks": 1
     }
    ],
    "doNotAccept": [
     "the body needs more air to cool down",
     "the body needs more carbon dioxide",
     "the lungs get bigger",
     "the model is tired (does not say what the body needs)"
    ]
   }
  ]
 },
 "p5-4-7": {
  "status": "review",
  "minutes": 30,
  "bigIdea": "A drop of blood goes from the heart to the lungs and back, then out to the body and back to the heart. At the lungs it picks up oxygen. At the body it gives up the oxygen and picks up carbon dioxide to carry away. During exercise the heart pumps faster, so the loop takes less time. Blood carries oxygen, not air.",
  "aim": "Imagine being a drop of blood pumped out of the heart. Where would the journey take you? A see-inside torso, four stop cards, a clock and a stopwatch let you follow one loop, and time it.",
  "safety": [],
  "sim": {
   "page": "labs/p5-4-7/index.html",
   "label": "Let's test it now!",
   "covers": [
    "a",
    "b",
    "c"
   ],
   "map": {
    "a": "plan",
    "b": "ride",
    "c": "faster"
   }
  },
  "badge": {
   "icon": "🩸",
   "name": "Blood's Big Trip",
   "line": "You predicted, tested and explained every part of Blood's Big Trip."
  },
  "parts": [
   {
    "id": "a",
    "title": "Plan the trip",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "A drop of blood leaves the heart. Four stops mark one full loop around the body."
     },
     {
      "predict": {
       "q": "What is the correct order for a drop of blood's journey?",
       "options": [
        "Heart, lungs, heart, body, heart.",
        "Heart, body, lungs, heart.",
        "Heart, lungs, body, and never back."
       ],
       "answer": 0
      }
     },
     {
      "do": "Choose where the drop starts, then tap the stops in the order it visits them."
     },
     {
      "observe": {
       "q": "Look back at both trips. In every loop, the blood visits the lungs…",
       "options": [
        "once, with the heart before it and after it",
        "never",
        "after the blood has reached the body, not before"
       ],
       "answer": 0
      }
     },
     {
      "note": "A drop of blood travels from the heart to the lungs, back to the heart, out to the body and back to the heart."
     }
    ]
   },
   {
    "id": "b",
    "title": "Ride along",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "A drop of blood rides one full loop in a few seconds. The clock shows the real minute."
     },
     {
      "predict": {
       "q": "What does the drop pick up and drop off along its journey?",
       "options": [
        "It gains oxygen at the lungs and swaps it for carbon dioxide at the body.",
        "It carries only water the whole way round.",
        "It picks up carbon dioxide at the lungs and drops it at the body."
       ],
       "answer": 0
      }
     },
     {
      "do": "Choose a place to watch, ride one loop with the drop, and score how much oxygen it carries there."
     },
     {
      "observe": {
       "q": "Read your bar chart. Where did the drop carry more oxygen?",
       "options": [
        "Near the lungs",
        "Near the body",
        "The same in both places"
       ],
       "answer": 0
      }
     },
     {
      "note": "Along the loop, the drop gains oxygen at the lungs, then swaps it for carbon dioxide at the body."
     }
    ]
   },
   {
    "id": "c",
    "title": "Faster loop",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "A dial sets the heart to resting or exercising. A stopwatch times one loop of the blood."
     },
     {
      "predict": {
       "q": "Does the loop take less time during exercise than at rest?",
       "options": [
        "Yes, it takes less time.",
        "No, it always takes the same time.",
        "Only the heart beats faster, so the loop takes the same time."
       ],
       "answer": 0
      }
     },
     {
      "do": "Set the heart to resting or exercising and time a drop of blood round one full loop."
     },
     {
      "observe": {
       "q": "Look at the points. From resting to exercising, the loop time…",
       "options": [
        "decreases",
        "stays the same",
        "increases"
       ],
       "answer": 0
      }
     },
     {
      "note": "During exercise, the heart pumps faster, so the loop takes less time."
     }
    ]
   }
  ],
  "written": [
   {
    "kind": "define",
    "q": "What does the heart do? [1]",
    "marks": 1,
    "concept": "The heart is a pump: it pumps blood round the body through the blood vessels.",
    "model": "The heart pumps blood to all parts of the body.",
    "points": [
     {
      "point": "it pumps (pushes) blood round the body",
      "marks": 1
     }
    ],
    "alsoAccept": [
     "it is a pump that pushes blood through the blood vessels to all parts of the body",
     "it pumps blood to the lungs and to the rest of the body"
    ],
    "doNotAccept": [
     "it makes blood",
     "it stores oxygen",
     "it breathes in air",
     "it beats (does not say what the beating does)"
    ]
   },
   {
    "kind": "explain",
    "q": "On the bench, the drop of blood went to the lungs before it went to the rest of the body. Explain why. [2]",
    "marks": 2,
    "concept": "Blood picks up oxygen at the lungs, so it must visit the lungs first in order to carry oxygen to the rest of the body.",
    "model": "The blood picks up oxygen at the lungs. It has to go there first so that it has oxygen to carry to the rest of the body, where the oxygen is given up.",
    "points": [
     {
      "point": "the blood picks up (gains) oxygen at the lungs",
      "marks": 1
     },
     {
      "point": "it must do this first so that it can carry the oxygen to the rest of the body (where it gives up the oxygen)",
      "marks": 1
     }
    ],
    "doNotAccept": [
     "the lungs are nearer to the heart",
     "the blood picks up air at the lungs",
     "the blood picks up carbon dioxide at the lungs to take to the body",
     "because that is the order of the loop (only repeats the question)"
    ]
   },
   {
    "kind": "explain",
    "q": "In your results, one loop took less time when the heart was exercising than when it was resting. Explain why. [2]",
    "marks": 2,
    "concept": "During exercise the heart pumps faster, so blood is pushed round the loop more quickly and one loop takes less time.",
    "model": "During exercise, the heart pumps faster. It pushes the blood round the body more quickly, so the drop of blood takes less time to go once round the loop.",
    "points": [
     {
      "point": "during exercise the heart pumps (beats) faster",
      "marks": 1
     },
     {
      "point": "so the blood is pushed round the body more quickly and takes less time to go once round the loop",
      "marks": 1
     }
    ],
    "doNotAccept": [
     "the loop gets shorter",
     "the blood vessels get wider",
     "blood always flows at the same speed",
     "the loop took less time because of exercise (only repeats the question)"
    ]
   }
  ]
 },
 "p5-5-1": {
  "status": "review",
  "minutes": 25,
  "bigIdea": "An electric circuit is made of a battery, wires and a bulb. A bulb lights only when it is joined in one complete loop with the battery. Both ends of the battery must be fastened. A bulb has two contacts, joined inside by one unbroken path.",
  "aim": "A battery sits in one holder and a bulb sits in another. Two wires have clips on their ends. A big bulb on a stand lets you look inside the glass.",
  "safety": [
   "Never join the two ends of a battery with a bare wire."
  ],
  "sim": {
   "page": "labs/p5-5-1/index.html",
   "label": "Let's test it now!",
   "covers": [
    "a",
    "b"
   ],
   "map": {
    "a": "light",
    "b": "inside"
   }
  },
  "badge": {
   "icon": "🔌",
   "name": "Circuit Parts",
   "line": "You predicted, tested and explained every part of Circuit Parts."
  },
  "parts": [
   {
    "id": "a",
    "title": "Will it light?",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "The battery, the bulb and two wires are on the bench. In this set-up, one wire rests on the table and is not clipped to the battery."
     },
     {
      "predict": {
       "q": "Will the bulb light with one wire left unclipped?",
       "options": [
        "No. The loop is not complete.",
        "Yes. The wire is near the battery.",
        "Yes. Electricity can jump a small gap."
       ],
       "answer": 0
      }
     },
     {
      "do": "Try ways of clipping the wires, and read how brightly the bulb shines each time."
     },
     {
      "observe": {
       "q": "Look at your results table. Which set-up lit the bulb?",
       "options": [
        "Only the set-up with both clips fastened properly",
        "Every set-up with two clips fastened",
        "Every set-up with a wire near the battery"
       ],
       "answer": 0
      }
     },
     {
      "note": "A bulb lights only when it is joined in one complete, unbroken loop with the battery."
     }
    ]
   },
   {
    "id": "b",
    "title": "Look inside the bulb",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "A bulb has two metal contacts, one at its side and one at its tip. The glass will turn clear."
     },
     {
      "predict": {
       "q": "What joins the two contacts inside the glass?",
       "options": [
        "One unbroken path, through a fine coil.",
        "Nothing. The contacts need no link.",
        "Nothing. Either contact works alone."
       ],
       "answer": 0
      }
     },
     {
      "do": "Look at the bulb from outside, then from inside, and count the parts of its path."
     },
     {
      "observe": {
       "q": "Look at your results table. Which view shows the path inside the bulb?",
       "options": [
        "The inside view",
        "The outside view",
        "Both views, equally"
       ],
       "answer": 0
      }
     },
     {
      "note": "Both contacts of a bulb join the circuit. One unbroken path joins them inside the bulb."
     }
    ]
   }
  ],
  "written": [
   {
    "kind": "define",
    "q": "What is an electric circuit? [1]",
    "marks": 1,
    "concept": "An electric circuit is a battery, wires and a bulb joined in one complete loop that electricity can flow round.",
    "model": "An electric circuit is a battery, wires and a bulb joined in one complete loop, so that electricity can flow round it.",
    "points": [
     {
      "point": "the parts (a battery, wires and a bulb) are joined in one complete (unbroken) loop or path that electricity flows round",
      "marks": 1
     }
    ],
    "alsoAccept": [
     "a complete path that electricity can flow round",
     "a closed loop made of a battery, wires and a bulb"
    ],
    "doNotAccept": [
     "a battery and a bulb",
     "wires that carry electricity",
     "a circle",
     "something that gives out light"
    ]
   },
   {
    "kind": "explain",
    "q": "In your results, the bulb stayed dark when one clip was left loose. Explain why. [2]",
    "marks": 2,
    "concept": "Electricity flows only round a complete loop; a loose clip leaves a gap, so nothing flows through the bulb.",
    "model": "Electricity flows only round a complete loop. The loose clip left a gap in the loop, so electricity could not flow through the bulb and it stayed dark.",
    "points": [
     {
      "point": "electricity flows only when the loop is complete (a closed circuit, with no gap)",
      "marks": 1
     },
     {
      "point": "the loose clip left a gap in the loop (the circuit was open), so electricity could not flow through the bulb",
      "marks": 1
     }
    ],
    "doNotAccept": [
     "the battery had run out",
     "the wire was too long",
     "the electricity leaked out of the loose clip",
     "the clip was loose (only repeats the question)"
    ]
   },
   {
    "kind": "explain",
    "q": "In your results, the bulb stayed dark when both clips were fastened to the same contact of the bulb. Explain why. [2]",
    "marks": 2,
    "concept": "A bulb has two contacts joined inside by one path through the coil; both contacts must be joined to the circuit so that electricity flows through the coil.",
    "model": "A bulb has two contacts, joined inside by one unbroken path through the coil. Electricity must flow in at one contact, through the coil and out at the other. With both clips on the same contact, electricity did not flow through the coil, so the bulb stayed dark.",
    "points": [
     {
      "point": "a bulb has two contacts (side and tip), joined inside by one path through the coil, and both contacts must be joined to the circuit",
      "marks": 1
     },
     {
      "point": "with both clips on the same contact, electricity did not flow through the coil inside the bulb (there was no complete loop through the bulb), so it did not light",
      "marks": 1
     }
    ],
    "doNotAccept": [
     "the bulb was broken",
     "the battery had run out",
     "the clips were loose",
     "the clips were on the wrong part (only repeats the question)"
    ]
   }
  ]
 },
 "p5-5-2": {
  "status": "review",
  "minutes": 25,
  "bigIdea": "A closed circuit has no gap, so electricity flows and the bulb lights. An open circuit has a gap, so nothing flows and the bulb stays dark. A switch is built to open and close a circuit on purpose. Electricity flows round the whole loop. The bulb does not use it up.",
  "aim": "A battery, a bulb and a switch are joined by wires in one loop. The switch starts open. A button turns the wires to glass, so you can watch electricity flow.",
  "safety": [
   "Never join the two ends of a battery with a bare wire."
  ],
  "sim": {
   "page": "labs/p5-5-2/index.html",
   "label": "Let's test it now!",
   "covers": [
    "a",
    "b"
   ],
   "map": {
    "a": "open",
    "b": "flow"
   }
  },
  "badge": {
   "icon": "🔓",
   "name": "Closed Circuits",
   "line": "You predicted, tested and explained every part of Closed Circuits."
  },
  "parts": [
   {
    "id": "a",
    "title": "Open or closed?",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "The battery, the bulb and the wires are all joined. Only the switch is left open, with a gap in the loop."
     },
     {
      "predict": {
       "q": "With the switch left open, will the bulb light?",
       "options": [
        "No. The open switch leaves a gap in the loop.",
        "Yes. The battery is still joined to the bulb.",
        "Yes. An open switch changes nothing."
       ],
       "answer": 0
      }
     },
     {
      "do": "Flick the switch open and closed, and read how brightly the bulb shines each time."
     },
     {
      "observe": {
       "q": "Look at your results table. With which switch setting did the bulb light?",
       "options": [
        "Switch closed",
        "Switch open",
        "Both settings"
       ],
       "answer": 0
      }
     },
     {
      "note": "A switch closes the last gap in a circuit. Opening it breaks the loop at that gap."
     }
    ]
   },
   {
    "id": "b",
    "title": "Watch it flow",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "Every wire will turn to glass. A glow will mark electricity as it moves."
     },
     {
      "predict": {
       "q": "With the switch closed, what will you see moving along the wires?",
       "options": [
        "A glow moving all the way round the loop.",
        "Nothing. The bulb lights up by itself.",
        "A glow only inside the bulb."
       ],
       "answer": 0
      }
     },
     {
      "do": "Look at the loop from outside, then with glass wires and the switch closed and open. Count the parts that glow."
     },
     {
      "observe": {
       "q": "Look at your results table. In which view did the whole loop glow?",
       "options": [
        "Glass wires, with the switch closed",
        "Glass wires, with the switch open",
        "The outside view"
       ],
       "answer": 0
      }
     },
     {
      "note": "Electricity flows right round a closed circuit and is not used up. It stops flowing the moment the loop is broken."
     }
    ]
   }
  ],
  "written": [
   {
    "kind": "define",
    "q": "What is a closed circuit? [1]",
    "marks": 1,
    "concept": "A closed circuit is a circuit with no gap, so electricity can flow round it.",
    "model": "A closed circuit is a circuit with no gap in it, so electricity can flow all the way round.",
    "points": [
     {
      "point": "a circuit (loop) with no gap, so that electricity can flow round it",
      "marks": 1
     }
    ],
    "alsoAccept": [
     "a complete loop that electricity can flow round",
     "a circuit that is not broken anywhere, so electricity flows"
    ],
    "doNotAccept": [
     "a circuit with the switch off",
     "a circuit that is shut so nothing can get through",
     "a circuit with a bulb in it",
     "a circuit in a box"
    ]
   },
   {
    "kind": "explain",
    "q": "In your results, the bulb stayed dark when the switch was open. Explain why. [2]",
    "marks": 2,
    "concept": "An open switch leaves a gap in the circuit; electricity flows only round a closed circuit, so nothing flows through the bulb.",
    "model": "The open switch left a gap in the circuit, so the circuit was open. Electricity flows only round a closed circuit, so no electricity flowed through the bulb and it stayed dark.",
    "points": [
     {
      "point": "the open switch left a gap in the loop (the circuit was open, not closed)",
      "marks": 1
     },
     {
      "point": "electricity cannot flow round a circuit with a gap, so no electricity flowed through the bulb",
      "marks": 1
     }
    ],
    "doNotAccept": [
     "the bulb was not joined to the battery",
     "the open switch used up the electricity",
     "the battery had run out",
     "the switch was off (only repeats the question)"
    ]
   },
   {
    "kind": "explain",
    "q": "A pupil says, \"The bulb uses up the electricity as it shines.\" Use what you saw in the glass wires to explain why the pupil is wrong. [2]",
    "marks": 2,
    "concept": "Electricity flows right round a closed circuit, through the bulb and back to the battery; the bulb does not use it up.",
    "model": "With the switch closed, the glow went through the bulb and on round the loop, back to the battery. All the parts of the loop glowed. So electricity flows right round the closed circuit and is not used up by the bulb.",
    "points": [
     {
      "point": "what was seen: the glow went through the bulb and on round the whole loop, back to the battery (every part of the loop glowed)",
      "marks": 1
     },
     {
      "point": "so electricity flows right round the closed circuit and is not used up by the bulb",
      "marks": 1
     }
    ],
    "doNotAccept": [
     "the electricity stops at the bulb",
     "less electricity comes back to the battery than left it",
     "the bulb changes all the electricity into light",
     "the bulb does not use it up (only repeats the question, with no reason)"
    ]
   }
  ]
 },
 "p5-5-3": {
  "status": "review",
  "minutes": 25,
  "bigIdea": "Materials can be electrical conductors or electrical insulators. An electrical conductor, such as most metals, lets electricity flow through it. An electrical insulator, such as plastic, rubber and wood, does not. It leaves a gap, so nothing flows round the loop. A circuit tester sorts an object by whether the bulb lights.",
  "aim": "A circuit tester has a battery, a bulb and two probe wires with a gap between their tips. Five everyday objects wait on a tray. Place one across the gap and watch the bulb.",
  "safety": [
   "Test only safe classroom objects with a battery. Never test a wall socket or a mains wire."
  ],
  "sim": {
   "page": "labs/p5-5-3/index.html",
   "label": "Let's test it now!",
   "covers": [
    "a",
    "b"
   ],
   "map": {
    "a": "test",
    "b": "stop"
   }
  },
  "badge": {
   "icon": "🔩",
   "name": "Conductors and Insulators",
   "line": "You predicted, tested and explained every part of Conductors and Insulators."
  },
  "parts": [
   {
    "id": "a",
    "title": "Test the object",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "A metal spoon is placed across the gap of the circuit tester."
     },
     {
      "predict": {
       "q": "Will the bulb light?",
       "options": [
        "Yes. Metal is an electrical conductor.",
        "No. A spoon is not a part of the circuit.",
        "No. Only things that make electricity can light the bulb."
       ],
       "answer": 0
      }
     },
     {
      "do": "Place objects across the gap, one at a time, and read how brightly the bulb shines."
     },
     {
      "observe": {
       "q": "Look at your results table. Which objects lit the bulb?",
       "options": [
        "The metal ones",
        "The wood, rubber and plastic ones",
        "All of them"
       ],
       "answer": 0
      }
     },
     {
      "note": "An object that lets the bulb light carries electricity across the gap. It is an electrical conductor."
     }
    ]
   },
   {
    "id": "b",
    "title": "Follow the glow",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "The wires of the tester turn to glass. A glow marks electricity. A plastic ruler is across the gap."
     },
     {
      "predict": {
       "q": "What will the glow do?",
       "options": [
        "Nothing will glow. The loop has no complete path.",
        "It passes through the ruler, just more slowly.",
        "It runs up to the ruler and stops there."
       ],
       "answer": 0
      }
     },
     {
      "do": "Watch the glow with different objects in the gap, and count the parts of the loop that glow."
     },
     {
      "observe": {
       "q": "Look at your results table. Which objects let the glow go all the way round?",
       "options": [
        "The metal ones",
        "The wood, rubber and plastic ones",
        "All of them"
       ],
       "answer": 0
      }
     },
     {
      "note": "An electrical insulator leaves a gap. With no complete path, electricity does not flow anywhere in the loop."
     }
    ]
   }
  ],
  "written": [
   {
    "kind": "define",
    "q": "What is an electrical conductor? [1]",
    "marks": 1,
    "concept": "An electrical conductor is a material that lets electricity flow through it.",
    "model": "An electrical conductor is a material that lets electricity flow through it.",
    "points": [
     {
      "point": "a material (or object) that lets electricity flow (pass) through it",
      "marks": 1
     }
    ],
    "alsoAccept": [
     "a material that electricity can flow through, such as most metals",
     "something that allows electricity to pass through it"
    ],
    "doNotAccept": [
     "a metal (an example, not the meaning)",
     "something that makes electricity",
     "a hard object",
     "something that lets heat pass through"
    ]
   },
   {
    "kind": "explain",
    "q": "In your results, the bulb lit when the metal spoon was placed across the gap. Explain why. [2]",
    "marks": 2,
    "concept": "Metal is an electrical conductor; it lets electricity flow across the gap, so the circuit is closed and the bulb lights.",
    "model": "The spoon is made of metal, which is an electrical conductor, so it lets electricity flow through it. The spoon closed the gap, so the circuit was complete and electricity flowed round the loop and through the bulb.",
    "points": [
     {
      "point": "the metal spoon is an electrical conductor (it lets electricity flow through it)",
      "marks": 1
     },
     {
      "point": "so the spoon closed the gap (the circuit was complete or closed), and electricity flowed round the loop through the bulb",
      "marks": 1
     }
    ],
    "doNotAccept": [
     "the spoon is hard",
     "the spoon is shiny",
     "the spoon makes electricity",
     "the spoon was in the gap (only repeats the question)"
    ]
   },
   {
    "kind": "explain",
    "q": "With the plastic ruler across the gap, no part of the loop glowed, not even the wire joined to the battery. Explain why. [2]",
    "marks": 2,
    "concept": "An electrical insulator leaves a gap; with no complete path, electricity does not flow anywhere in the loop.",
    "model": "Plastic is an electrical insulator, so it does not let electricity flow through it. The ruler left a gap in the loop. Electricity flows only when there is a complete path, so nothing flowed anywhere in the loop.",
    "points": [
     {
      "point": "the plastic ruler is an electrical insulator (it does not let electricity flow through it), so it leaves a gap in the loop",
      "marks": 1
     },
     {
      "point": "electricity flows only when there is a complete path (a closed circuit), so with a gap nothing flows in any part of the loop",
      "marks": 1
     }
    ],
    "doNotAccept": [
     "the electricity flowed as far as the ruler and stopped there",
     "the ruler used up the electricity",
     "the electricity went through the ruler too slowly",
     "the ruler blocked the light"
    ]
   }
  ]
 },
 "p5-5-4": {
  "status": "review",
  "minutes": 25,
  "bigIdea": "The parts of a circuit are shown with standard symbols. A circuit diagram uses these symbols to show a real circuit, without drawing every detail. A switch symbol drawn open means the built circuit has a gap, so the bulb will not light. Reading a diagram tells you how the real circuit will behave.",
  "aim": "A real circuit of a battery, a bulb, a switch and wires sits beside a blank diagram card. Each part has its own symbol. Match the symbols, then build a circuit from a diagram.",
  "safety": [
   "Never join the two ends of a battery with a bare wire."
  ],
  "sim": {
   "page": "labs/p5-5-4/index.html",
   "label": "Let's test it now!",
   "covers": [
    "a",
    "b"
   ],
   "map": {
    "a": "symbol",
    "b": "draw"
   }
  },
  "badge": {
   "icon": "🔣",
   "name": "Circuit Diagrams",
   "line": "You predicted, tested and explained every part of Circuit Diagrams."
  },
  "parts": [
   {
    "id": "a",
    "title": "Match the symbol",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "Every part of a circuit has its own standard symbol. The wire, the bulb, the battery and the switch are on the bench."
     },
     {
      "predict": {
       "q": "Which symbol stands for the bulb?",
       "options": [
        "A circle with a cross inside it.",
        "Any symbol can stand for the bulb.",
        "A small picture of a glowing bulb."
       ],
       "answer": 0
      }
     },
     {
      "do": "Tap each real part and choose its standard symbol."
     },
     {
      "observe": {
       "q": "Look back at your matches. Which symbol stands for the bulb?",
       "options": [
        "A circle with a cross inside",
        "A straight line",
        "Two parallel lines, one long and one short"
       ],
       "answer": 0
      }
     },
     {
      "note": "Every part of a circuit has its own standard symbol. It is used the same way in every diagram."
     }
    ]
   },
   {
    "id": "b",
    "title": "Build the diagram",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "A diagram shows one battery, one bulb and a switch symbol drawn open. The real circuit is built exactly as the diagram shows."
     },
     {
      "predict": {
       "q": "Will the bulb light?",
       "options": [
        "No. The open switch leaves a gap.",
        "Yes. A diagram only shows how the parts look.",
        "Yes. A switch symbol never changes what a circuit does."
       ],
       "answer": 0
      }
     },
     {
      "do": "Choose how the switch is drawn, press Build, and read how brightly the bulb shines."
     },
     {
      "observe": {
       "q": "Look at your results table. For which diagram did the built bulb light?",
       "options": [
        "The diagram with the switch drawn closed",
        "The diagram with the switch drawn open",
        "Both diagrams"
       ],
       "answer": 0
      }
     },
     {
      "note": "A circuit diagram shows exactly how a real circuit will behave when it is built."
     }
    ]
   }
  ],
  "written": [
   {
    "kind": "define",
    "q": "What is a circuit diagram? [1]",
    "marks": 1,
    "concept": "A circuit diagram uses standard symbols to show the parts of a real circuit and how they are joined.",
    "model": "A circuit diagram is a drawing that uses standard symbols to show the parts of a circuit and how they are joined.",
    "points": [
     {
      "point": "it uses (standard) symbols to show the parts of a circuit and how they are joined",
      "marks": 1
     }
    ],
    "alsoAccept": [
     "a way of showing a real circuit with symbols instead of drawings of the parts",
     "symbols joined by lines that show how a circuit is put together"
    ],
    "doNotAccept": [
     "a picture of a battery and a bulb",
     "a realistic drawing of the circuit",
     "a circuit",
     "a card on the bench"
    ]
   },
   {
    "kind": "explain",
    "q": "On the bench, each part of the circuit had its own standard symbol. Explain why it is useful that every circuit diagram uses the same symbols. [2]",
    "marks": 2,
    "concept": "A standard symbol stands for the same part in every diagram, so anyone can read a diagram in the same way and build the circuit it shows.",
    "model": "A standard symbol stands for the same part in every diagram. So everyone can read a diagram in the same way and build the circuit it shows, without needing a detailed drawing of each part.",
    "points": [
     {
      "point": "each standard symbol stands for the same part in every diagram",
      "marks": 1
     },
     {
      "point": "so anyone can read the diagram in the same way (and build the circuit it shows), without a detailed drawing of every part",
      "marks": 1
     }
    ],
    "doNotAccept": [
     "symbols look nicer",
     "symbols make the bulb brighter",
     "drawing the real parts is not allowed",
     "so that every diagram looks different"
    ]
   },
   {
    "kind": "explain",
    "q": "In your results, the bulb did not light when the circuit was built from the diagram with the switch drawn open. Explain why. [2]",
    "marks": 2,
    "concept": "A switch symbol drawn open means the built circuit has a gap; electricity cannot flow round an open circuit, so the bulb does not light.",
    "model": "A switch drawn open means the real circuit is built with a gap at the switch. The circuit is open, so electricity cannot flow round the loop and through the bulb, and the bulb does not light.",
    "points": [
     {
      "point": "the switch drawn open means the built circuit has a gap at the switch (it is an open circuit)",
      "marks": 1
     },
     {
      "point": "electricity cannot flow round a circuit with a gap, so no electricity flows through the bulb",
      "marks": 1
     }
    ],
    "doNotAccept": [
     "a diagram cannot tell you whether a circuit works",
     "the switch symbol has no effect on the real circuit",
     "the battery had run out",
     "the switch was open (only repeats the question)"
    ]
   }
  ]
 },
 "p5-6-1": {
  "status": "review",
  "minutes": 25,
  "bigIdea": "The more batteries joined in series, the brighter the bulb. Batteries in series must be joined + to − to work this way. Repeating a reading and finding the average makes a result more reliable. A rising line can be followed to judge roughly what the next point would show.",
  "aim": "A holder takes one, two or three batteries in a single series loop with one bulb. A switch closes the circuit. A meter shows the bulb's brightness.",
  "safety": [
   "Never join the two ends of a battery with a bare wire. Parts can grow warm, so keep the loop closed only briefly."
  ],
  "sim": {
   "page": "labs/p5-6-1/index.html",
   "label": "Let's test it now!",
   "covers": [
    "a",
    "b"
   ],
   "map": {
    "a": "chain",
    "b": "trend"
   }
  },
  "badge": {
   "icon": "🔋",
   "name": "Batteries in Series",
   "line": "You predicted, tested and explained every part of Batteries in Series."
  },
  "parts": [
   {
    "id": "a",
    "title": "Chain the batteries",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "One battery lights the bulb. A second battery is added in series, joined + to −."
     },
     {
      "predict": {
       "q": "What happens to the bulb's brightness when a second battery is added?",
       "options": [
        "The bulb becomes brighter.",
        "The bulb becomes dimmer.",
        "The brightness stays exactly the same."
       ],
       "answer": 0
      }
     },
     {
      "do": "Join one, two, then three batteries + to −, and read the brightness each time."
     },
     {
      "observe": {
       "q": "Look at the points. As more batteries join the loop, the brightness…",
       "options": [
        "increases",
        "stays the same",
        "decreases"
       ],
       "answer": 0
      }
     },
     {
      "note": "The more batteries joined in series, the brighter the bulb. They must be joined + to −."
     }
    ]
   },
   {
    "id": "b",
    "title": "Read the trend",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "The board shows the line from the first part. A fourth battery would add one more point."
     },
     {
      "predict": {
       "q": "What would the fourth point on the line show?",
       "options": [
        "A brightness higher than the third point.",
        "The same brightness as the third point.",
        "A lower brightness than the third point."
       ],
       "answer": 0
      }
     },
     {
      "do": "Read the brightness at one, two and three batteries from the graph, then look ahead."
     },
     {
      "observe": {
       "q": "The line keeps the same pattern. The fourth point would be…",
       "options": [
        "higher than the third point",
        "lower than the third point",
        "level with the third point"
       ],
       "answer": 0
      }
     },
     {
      "note": "A rising line lets us judge roughly what the next reading would show."
     }
    ]
   }
  ],
  "written": [
   {
    "kind": "define",
    "q": "What does it mean when batteries are joined in series? [1]",
    "marks": 1,
    "concept": "Batteries in series are joined one after another in the same loop, the + end of one to the − end of the next.",
    "model": "The batteries are joined one after another in the same loop, with the + end of one battery touching the − end of the next.",
    "points": [
     {
      "point": "the batteries are joined one after another in one loop, + end to − end",
      "marks": 1
     }
    ],
    "alsoAccept": [
     "the + end of one battery is joined to the − end of the next battery",
     "the batteries are joined in a row, one after the other, + to −"
    ],
    "doNotAccept": [
     "the batteries are near each other",
     "the + ends of the batteries touch each other",
     "there are many batteries",
     "the batteries are joined any way round"
    ]
   },
   {
    "kind": "explain",
    "q": "In your results, the bulb was brighter with three batteries in series than with one. Explain why. [2]",
    "marks": 2,
    "concept": "Batteries joined in series, + to −, work together, so more electricity flows through the bulb and it shines more brightly.",
    "model": "The three batteries were joined + to −, so they worked together. Together they made more electricity flow through the bulb than one battery did, so the bulb shone more brightly.",
    "points": [
     {
      "point": "batteries joined in series (+ to −) work together",
      "marks": 1
     },
     {
      "point": "so more electricity flows through the bulb (electricity flows harder round the loop), which makes the bulb brighter",
      "marks": 1
     }
    ],
    "alsoAccept": [
     "more batteries in series make more electricity flow through the bulb"
    ],
    "doNotAccept": [
     "there were more batteries (only repeats the question)",
     "the batteries share their electricity between them",
     "extra batteries only make the bulb last longer",
     "the bulb was bigger"
    ]
   },
   {
    "kind": "explain",
    "q": "On your graph, the line rose from one battery to three. Explain what a fourth battery in series would most likely do to the brightness of the bulb. [2]",
    "marks": 2,
    "concept": "A rising line can be followed: the pattern of more batteries, brighter bulb, suggests the next reading would be higher still.",
    "model": "The bulb would most likely be brighter than with three batteries. The line rises each time a battery is added, so if the pattern carries on, the fourth point would be higher than the third.",
    "points": [
     {
      "point": "the bulb would be brighter than with three batteries (the fourth reading would be higher than the third)",
      "marks": 1
     },
     {
      "point": "because the line keeps rising as batteries are added, and this pattern can be followed on to the next point",
      "marks": 1
     }
    ],
    "doNotAccept": [
     "the brightness would stay the same, because the bulb cannot get any brighter",
     "the bulb would be dimmer, because there are too many batteries",
     "the brightness would go back to what it was with one battery"
    ]
   }
  ]
 },
 "p5-6-2": {
  "status": "review",
  "minutes": 25,
  "bigIdea": "The more bulbs joined in one series loop, the dimmer each bulb. All the bulbs in the loop share the same one path. Bulb A is at its brightest when it is the only bulb in the loop. A falling line shows the dimming and can be followed to judge the next point.",
  "aim": "One battery lights a bulb in a single series loop. You add a second and a third bulb, one after the other. A meter shows how bright bulb A is.",
  "safety": [
   "Never join the two ends of a battery with a bare wire. Parts can grow warm, so keep the loop closed only briefly."
  ],
  "sim": {
   "page": "labs/p5-6-2/index.html",
   "label": "Let's test it now!",
   "covers": [
    "a",
    "b"
   ],
   "map": {
    "a": "bulb",
    "b": "trend"
   }
  },
  "badge": {
   "icon": "💡",
   "name": "Bulbs in Series",
   "line": "You predicted, tested and explained every part of Bulbs in Series."
  },
  "parts": [
   {
    "id": "a",
    "title": "Add a bulb",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "One battery lights bulb A. A second bulb is added in the same loop, one after the other."
     },
     {
      "predict": {
       "q": "What happens to the brightness of each bulb?",
       "options": [
        "Each bulb becomes dimmer.",
        "Each bulb stays just as bright.",
        "Every bulb becomes brighter."
       ],
       "answer": 0
      }
     },
     {
      "do": "Add one, two, then three bulbs to the loop, and read the brightness of bulb A each time."
     },
     {
      "observe": {
       "q": "Look at the points. As more bulbs join the loop, the brightness of bulb A…",
       "options": [
        "decreases",
        "stays the same",
        "increases"
       ],
       "answer": 0
      }
     },
     {
      "note": "The more bulbs joined in one series loop, the dimmer each bulb. All the bulbs share the same one path."
     }
    ]
   },
   {
    "id": "b",
    "title": "Read the trend",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "The board shows the line from the first part. A fourth bulb would add one more point."
     },
     {
      "predict": {
       "q": "What would the fourth point on the line show?",
       "options": [
        "A brightness lower than the third point.",
        "The same brightness as the third point.",
        "Bulb A goes dark at once."
       ],
       "answer": 0
      }
     },
     {
      "do": "Read the brightness at one, two and three bulbs from the graph, then look ahead."
     },
     {
      "observe": {
       "q": "The line keeps the same pattern. The fourth point would be…",
       "options": [
        "lower than the third point",
        "higher than the third point",
        "level with the third point"
       ],
       "answer": 0
      }
     },
     {
      "note": "A falling line lets us judge roughly what the next reading would show."
     }
    ]
   }
  ],
  "written": [
   {
    "kind": "define",
    "q": "What does it mean when bulbs are joined in series? [1]",
    "marks": 1,
    "concept": "Bulbs in series are joined one after the other in a single loop, so there is only one path for electricity.",
    "model": "The bulbs are joined one after the other in a single loop, so there is only one path for electricity to flow along.",
    "points": [
     {
      "point": "the bulbs are joined one after the other in one loop (there is only one path for electricity)",
      "marks": 1
     }
    ],
    "alsoAccept": [
     "all the bulbs are on the same one path",
     "the bulbs are in a single loop, so electricity flows through one bulb and then the next"
    ],
    "doNotAccept": [
     "each bulb is on its own separate path",
     "there are many bulbs",
     "the bulbs are close together",
     "each bulb has its own battery"
    ]
   },
   {
    "kind": "explain",
    "q": "In your results, bulb A became dimmer each time another bulb was added to the series loop. Explain why. [2]",
    "marks": 2,
    "concept": "All the bulbs in a series loop share the same one path, so with more bulbs each bulb is dimmer.",
    "model": "In a series loop, all the bulbs are on the same one path. The more bulbs that share this one path, the less electricity flows through each bulb, so bulb A became dimmer.",
    "points": [
     {
      "point": "in a series loop all the bulbs are on (share) the same one path",
      "marks": 1
     },
     {
      "point": "with more bulbs sharing the one path, less electricity flows through each bulb, so each bulb (bulb A) is dimmer",
      "marks": 1
     }
    ],
    "alsoAccept": [
     "the bulbs share the same one path, so each bulb gets a smaller share and is dimmer"
    ],
    "doNotAccept": [
     "the battery was running out",
     "the new bulb takes the light away from bulb A",
     "there were more bulbs (only repeats the question)",
     "bulb A is furthest from the battery"
    ]
   },
   {
    "kind": "explain",
    "q": "On this bench, you ran each number of bulbs more than once and found the average. Explain why. [2]",
    "marks": 2,
    "concept": "Readings differ a little from run to run; the average of repeated runs is closest to the true value, so the result is more reliable.",
    "model": "Each run gives a slightly different reading. The average of the runs is closest to the true value, so repeating and finding the average makes the result more reliable.",
    "points": [
     {
      "point": "one reading may not be exact, because each run differs a little",
      "marks": 1
     },
     {
      "point": "the average of repeated runs is closer to the true value, so the result is more reliable",
      "marks": 1
     }
    ],
    "doNotAccept": [
     "to make it a fair test",
     "to make the bulb brighter",
     "because the first reading is always wrong",
     "to get a bigger number"
    ]
   }
  ]
 },
 "p5-6-3": {
  "status": "review",
  "minutes": 25,
  "bigIdea": "Bulbs on separate parallel paths from one battery stay as bright as one bulb alone. Each bulb has its own separate path back to the battery. A level line shows a reading staying the same as more paths are added. This is different from bulbs in series, which grow dimmer as more are added.",
  "aim": "One battery lights a bulb on its own path. You add a second and a third bulb, each on a separate parallel path back to the battery. A meter shows how bright bulb A is.",
  "safety": [
   "Never join the two ends of a battery with a bare wire. Parts can grow warm, so keep the circuit closed only briefly."
  ],
  "sim": {
   "page": "labs/p5-6-3/index.html",
   "label": "Let's test it now!",
   "covers": [
    "a",
    "b"
   ],
   "map": {
    "a": "path",
    "b": "trend"
   }
  },
  "badge": {
   "icon": "🔀",
   "name": "Bulbs in Parallel",
   "line": "You predicted, tested and explained every part of Bulbs in Parallel."
  },
  "parts": [
   {
    "id": "a",
    "title": "Add a path",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "One battery lights bulb A on its own path. A second bulb is added on its own path."
     },
     {
      "predict": {
       "q": "What happens to the brightness of each bulb?",
       "options": [
        "Each bulb stays just as bright as before.",
        "Each bulb becomes dimmer.",
        "The new bulb is bright and the old one goes dim."
       ],
       "answer": 0
      }
     },
     {
      "do": "Add one, two, then three bulbs on separate paths, and read the brightness of bulb A each time."
     },
     {
      "observe": {
       "q": "Look at the points. As more bulbs are added on their own paths, the brightness of bulb A…",
       "options": [
        "stays the same",
        "increases",
        "decreases"
       ],
       "answer": 0
      }
     },
     {
      "note": "Bulbs on separate parallel paths from one battery stay as bright as one bulb alone."
     }
    ]
   },
   {
    "id": "b",
    "title": "Read the trend",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "The board shows the level line from the first part. A fourth bulb would add one more point."
     },
     {
      "predict": {
       "q": "What would the fourth point on the line show?",
       "options": [
        "About the same brightness as the other points.",
        "A sharp fall in brightness.",
        "A sharp rise in brightness."
       ],
       "answer": 0
      }
     },
     {
      "do": "Read the brightness at one, two and three bulbs from the graph, then look ahead."
     },
     {
      "observe": {
       "q": "The line keeps the same pattern. The fourth point would be…",
       "options": [
        "level with the third point",
        "lower than the third point",
        "higher than the third point"
       ],
       "answer": 0
      }
     },
     {
      "note": "A level line shows a reading that is not changing as more paths are added."
     }
    ]
   }
  ],
  "written": [
   {
    "kind": "define",
    "q": "What is a parallel circuit? [1]",
    "marks": 1,
    "concept": "In a parallel circuit each bulb is on its own separate path back to the battery.",
    "model": "A parallel circuit is a circuit in which each bulb is on its own separate path back to the battery.",
    "points": [
     {
      "point": "each bulb is on its own separate path to the battery (the circuit has more than one path)",
      "marks": 1
     }
    ],
    "alsoAccept": [
     "a circuit with a separate path for each bulb",
     "a circuit with more than one path for electricity to flow along"
    ],
    "doNotAccept": [
     "the bulbs are joined one after the other on one path",
     "the bulbs are side by side",
     "a circuit with two bulbs",
     "each bulb has its own battery"
    ]
   },
   {
    "kind": "explain",
    "q": "In your results, bulb A stayed about as bright when a second and a third bulb were added in parallel. Explain why. [2]",
    "marks": 2,
    "concept": "Each bulb in parallel has its own path back to the battery, so adding bulbs on other paths does not change the brightness of bulb A.",
    "model": "In a parallel circuit, each bulb has its own separate path back to the battery. Bulb A does not share its path with the new bulbs, so the same amount of electricity flows through it and it stays as bright as when it was alone.",
    "points": [
     {
      "point": "each bulb in parallel has its own separate path back to the battery",
      "marks": 1
     },
     {
      "point": "bulb A does not share its path with the other bulbs, so the electricity flowing through it (its brightness) does not change",
      "marks": 1
     }
    ],
    "doNotAccept": [
     "the bulbs share one path",
     "the battery shares out the brightness equally",
     "the new bulbs were not switched on",
     "bulb A is nearest to the battery"
    ]
   },
   {
    "kind": "explain",
    "q": "For each number of bulbs, you repeated the run and found the average. Explain why the average is used and not just one reading. [2]",
    "marks": 2,
    "concept": "Readings differ a little from run to run; the average of repeated runs is closest to the true value, so the result is more reliable.",
    "model": "Each run gives a slightly different reading, so one reading may not be exact. The average of the runs is closest to the true value, so the result is more reliable.",
    "points": [
     {
      "point": "one reading may not be exact, because each run differs a little",
      "marks": 1
     },
     {
      "point": "the average of repeated runs is closer to the true value, so the result is more reliable",
      "marks": 1
     }
    ],
    "doNotAccept": [
     "to make it a fair test",
     "the average is always the biggest reading",
     "because the first reading is always wrong",
     "to make the bulbs brighter"
    ]
   }
  ]
 },
 "p5-6-4": {
  "status": "review",
  "minutes": 25,
  "bigIdea": "Taking a bulb out of a series circuit breaks the loop, so every bulb goes out. Taking a bulb out of a parallel circuit leaves the other bulbs lit, on their own paths. A house is usually wired in parallel, so one room's bulb can be changed without affecting another. Choosing series or parallel changes what happens when a bulb is removed.",
  "aim": "Two circuits stand side by side. One is wired in series and one in parallel, each with a battery and two bulbs. Take a bulb out of each and see what the other bulb does.",
  "safety": [
   "Never touch real mains wiring or sockets. This bench uses batteries only."
  ],
  "sim": {
   "page": "labs/p5-6-4/index.html",
   "label": "Let's test it now!",
   "covers": [
    "a",
    "b"
   ],
   "map": {
    "a": "remove",
    "b": "house"
   }
  },
  "badge": {
   "icon": "🔌",
   "name": "Bulb Arrangements",
   "line": "You predicted, tested and explained every part of Bulb Arrangements."
  },
  "parts": [
   {
    "id": "a",
    "title": "Take one away",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "Each circuit has two bulbs. One bulb will be taken out of each circuit."
     },
     {
      "predict": {
       "q": "In which circuit does the remaining bulb stay lit?",
       "options": [
        "The parallel circuit.",
        "Neither circuit.",
        "Both circuits."
       ],
       "answer": 0
      }
     },
     {
      "do": "Take one bulb out of the series circuit, then out of the parallel circuit. Read the bulb left behind."
     },
     {
      "observe": {
       "q": "Look at your results table. In which circuit did the remaining bulb stay lit?",
       "options": [
        "The parallel circuit",
        "The series circuit",
        "Both the same"
       ],
       "answer": 0
      }
     },
     {
      "note": "Taking a bulb out breaks a series loop completely. A parallel circuit's other path still works on its own."
     }
    ]
   },
   {
    "id": "b",
    "title": "Wire the house",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "A toy house has a bulb in the living room and a bulb in the kitchen. They are wired in series."
     },
     {
      "predict": {
       "q": "What happens to the kitchen bulb when the living room bulb is taken out?",
       "options": [
        "The kitchen bulb goes dark too.",
        "The kitchen bulb stays lit.",
        "The kitchen bulb goes dark only if it is taken out too."
       ],
       "answer": 0
      }
     },
     {
      "do": "Wire the two rooms in series, then in parallel. Take out the living room bulb each time and read the kitchen bulb."
     },
     {
      "observe": {
       "q": "Look at your results table. Which wiring keeps the kitchen bulb lit?",
       "options": [
        "Parallel wiring",
        "Series wiring",
        "Both the same"
       ],
       "answer": 0
      }
     },
     {
      "note": "Wiring rooms in parallel lets one room's bulb be changed without affecting the other room."
     }
    ]
   }
  ],
  "written": [
   {
    "kind": "define",
    "q": "What is a series circuit? [1]",
    "marks": 1,
    "concept": "A series circuit has only one path: the bulbs are joined one after the other in a single loop.",
    "model": "A series circuit is a circuit in which the bulbs are joined one after the other in a single loop, so there is only one path for electricity.",
    "points": [
     {
      "point": "the bulbs are joined one after the other in one loop (there is only one path for electricity)",
      "marks": 1
     }
    ],
    "alsoAccept": [
     "a circuit with only one path for electricity to flow along",
     "a circuit where all the bulbs are on the same one path"
    ],
    "doNotAccept": [
     "a circuit with a separate path for each bulb",
     "a circuit with two bulbs",
     "a circuit with many batteries",
     "a circuit that is broken"
    ]
   },
   {
    "kind": "explain",
    "q": "In your results, the bulb left behind in the parallel circuit stayed lit when the other bulb was taken out. Explain why. [2]",
    "marks": 2,
    "concept": "In a parallel circuit each bulb has its own path to the battery, so taking one bulb out leaves the other path still a closed circuit.",
    "model": "In a parallel circuit, each bulb has its own separate path back to the battery. Taking one bulb out leaves a gap in that bulb's path only. The other path is still complete, so electricity still flows through the bulb left behind.",
    "points": [
     {
      "point": "each bulb in a parallel circuit has its own separate path back to the battery",
      "marks": 1
     },
     {
      "point": "taking one bulb out breaks only its own path; the other path is still complete (closed), so electricity still flows through the bulb left behind",
      "marks": 1
     }
    ],
    "doNotAccept": [
     "the bulbs share one path",
     "the bulb left behind gets the whole battery to itself",
     "the other bulb was not needed",
     "it has a second battery"
    ]
   },
   {
    "kind": "explain",
    "q": "With series wiring in the toy house, the kitchen bulb went dark when the living room bulb was taken out. Explain why. [2]",
    "marks": 2,
    "concept": "In series both bulbs are on one path; taking a bulb out leaves a gap, so the circuit is open and no electricity flows through the other bulb.",
    "model": "In series wiring, both bulbs are on the same one path. Taking out the living room bulb left a gap in this path, so the circuit was open. Electricity could not flow round the loop, so the kitchen bulb went dark too.",
    "points": [
     {
      "point": "in series wiring both bulbs are on the same one path (one loop)",
      "marks": 1
     },
     {
      "point": "taking a bulb out leaves a gap (the circuit is open), so electricity cannot flow through the kitchen bulb",
      "marks": 1
     }
    ],
    "doNotAccept": [
     "the kitchen bulb was taken out too",
     "the battery ran out",
     "the living room bulb gave the kitchen bulb its light",
     "the kitchen bulb became too dim to see"
    ]
   }
  ]
 },
 "p5-6-5": {
  "status": "review",
  "minutes": 25,
  "bigIdea": "Electricity must be handled with care: never with wet hands, and never through damaged wires. A hazard is something that could cause harm. We spot it before anyone is hurt. We can each save electricity by switching things off when they are not needed. Small daily habits add up to a lower meter reading over time.",
  "aim": "A small model room has a lamp, a socket, a kettle and a wet sink. A second corner has a lamp, a television and a charger, with a meter that counts the electricity used in one day.",
  "safety": [
   "Electricity and water must never meet. Use dry hands only, and never handle a wire with damaged covering."
  ],
  "sim": {
   "page": "labs/p5-6-5/index.html",
   "label": "Let's test it now!",
   "covers": [
    "a",
    "b"
   ],
   "map": {
    "a": "hazard",
    "b": "save"
   }
  },
  "badge": {
   "icon": "⚠️",
   "name": "Electricity Safely and Wisely",
   "line": "You predicted, tested and explained every part of Electricity Safely and Wisely."
  },
  "parts": [
   {
    "id": "a",
    "title": "Spot the hazard",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "A lamp's plug has a frayed wire, with bare metal showing underneath."
     },
     {
      "predict": {
       "q": "Is a lamp with a frayed wire safe to use?",
       "options": [
        "No. The bare metal is a hazard even before anyone touches it.",
        "Yes, if the plug still fits the socket.",
        "It is unsafe only after someone touches the bare metal."
       ],
       "answer": 0
      }
     },
     {
      "do": "Look at each hazard in the room, then tap the safety measure that fits it."
     },
     {
      "observe": {
       "q": "Look back at both hazards. Each one was risky because…",
       "options": [
        "something could go wrong, before anyone is hurt",
        "it only matters once someone is hurt",
        "the plug still fitted the socket"
       ],
       "answer": 0
      }
     },
     {
      "note": "A hazard is spotted by what could go wrong, before anyone is hurt."
     }
    ]
   },
   {
    "id": "b",
    "title": "Save electricity",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "The corner has a lamp, a television and a phone charger. The clock runs one day."
     },
     {
      "predict": {
       "q": "What happens to the meter reading if the lamp is switched off whenever the room is empty?",
       "options": [
        "It ends lower than if the lamp stayed on all day.",
        "It stays exactly the same.",
        "It goes up."
       ],
       "answer": 0
      }
     },
     {
      "do": "Run a day with no habits, then with lights off, then with lights, TV and charger all switched off. Read the meter each time."
     },
     {
      "observe": {
       "q": "Read your bar chart. As more habits are followed, the meter reading…",
       "options": [
        "decreases",
        "stays the same",
        "increases"
       ],
       "answer": 0
      }
     },
     {
      "note": "Switching things off when they are not needed uses less electricity over a day."
     }
    ]
   }
  ],
  "written": [
   {
    "kind": "define",
    "q": "What is a hazard? [1]",
    "marks": 1,
    "concept": "A hazard is something that could cause harm; it is spotted by what could go wrong, before anyone is hurt.",
    "model": "A hazard is something that could cause harm.",
    "points": [
     {
      "point": "something that could cause harm (something that could go wrong and hurt someone)",
      "marks": 1
     }
    ],
    "alsoAccept": [
     "a danger that could hurt someone",
     "something unsafe that could harm a person, even before anyone is hurt"
    ],
    "doNotAccept": [
     "an accident that has already happened",
     "something that has already hurt someone",
     "electricity",
     "a frayed wire (an example, not the meaning)"
    ]
   },
   {
    "kind": "explain",
    "q": "In the model room, the lamp's wire was frayed, with bare metal showing. Explain why the lamp should not be used until the wire is replaced. [2]",
    "marks": 2,
    "concept": "A wire with damaged covering leaves bare metal showing; electricity could reach anyone who touches it and harm them.",
    "model": "The covering of the wire is damaged, so the bare metal is not covered. Electricity could reach anyone who touches the bare metal and harm them, so the frayed wire is a hazard.",
    "points": [
     {
      "point": "the covering of the wire is damaged, so bare metal is showing (the metal is no longer covered)",
      "marks": 1
     },
     {
      "point": "electricity could reach (flow to) anyone who touches the bare metal and harm them",
      "marks": 1
     }
    ],
    "alsoAccept": [
     "someone who touches the bare metal could get an electric shock"
    ],
    "doNotAccept": [
     "the lamp will not light",
     "it is unsafe only after someone has been hurt",
     "the plug does not fit the socket",
     "the wire looks old (with no mention of electricity reaching a person)"
    ]
   },
   {
    "kind": "explain",
    "q": "In your results, the meter reading was lowest on the day the lamp, the television and the charger were switched off when not needed. Explain why. [2]",
    "marks": 2,
    "concept": "A device uses electricity whenever it is switched on, whether or not anyone is using it; switched off, it uses none, so less electricity is used over the day.",
    "model": "A device uses electricity all the time it is switched on, even when nobody is using it. When the lamp, television and charger were switched off, they used no electricity for that time, so less electricity was used over the day and the meter counted fewer units.",
    "points": [
     {
      "point": "a device uses electricity whenever it is switched on (even when nobody is using it), and uses none when it is switched off",
      "marks": 1
     },
     {
      "point": "so less electricity was used over the day, and the meter counted fewer units",
      "marks": 1
     }
    ],
    "doNotAccept": [
     "a television that nobody watches uses no electricity",
     "switching things on and off uses more electricity",
     "the meter was switched off",
     "the habits were followed (only repeats the question)"
    ]
   }
  ]
 },
 "p5-6-6": {
  "status": "review",
  "minutes": 25,
  "bigIdea": "A working toy circuit follows the same rules as any circuit. A battery, wires and a bulb are joined in one complete loop. Every clip must be fastened. Building a switch into a circuit lets it be turned on and off easily. Understanding circuits lets us design things that use electricity on purpose.",
  "aim": "A toy lighthouse has a glass tower and a lantern. A tray beside it holds a battery, a bulb, wires and a switch. Build its circuit so the lantern lights.",
  "safety": [
   "Never join the two ends of a battery with a bare wire."
  ],
  "sim": {
   "page": "labs/p5-6-6/index.html",
   "label": "Let's test it now!",
   "covers": [
    "a",
    "b"
   ],
   "map": {
    "a": "wire",
    "b": "switch"
   }
  },
  "badge": {
   "icon": "🛠️",
   "name": "Circuit Toy Maker",
   "line": "You predicted, tested and explained every part of Circuit Toy Maker."
  },
  "parts": [
   {
    "id": "a",
    "title": "Wire the toy",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "The battery, the bulb and the wires are all in the toy. One wire is left unclipped."
     },
     {
      "predict": {
       "q": "Will the lantern light come on?",
       "options": [
        "No. The loop still has a gap where the clip is open.",
        "Yes. All the main parts are inside the toy.",
        "Yes. Only the battery and the bulb need clips."
       ],
       "answer": 0
      }
     },
     {
      "do": "Test three builds: a bulb missing, a clip open, and a complete loop. Read the lantern each time."
     },
     {
      "observe": {
       "q": "Look at your results table. Which build made the light come on?",
       "options": [
        "All parts placed and every clip fastened",
        "All parts placed, with one clip open",
        "The build with the bulb missing"
       ],
       "answer": 0
      }
     },
     {
      "note": "A toy's circuit works the same way as any other. Every part must be joined in one complete loop."
     }
    ]
   },
   {
    "id": "b",
    "title": "Add a switch",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "One lighthouse is built without a switch. A second has a switch in its loop."
     },
     {
      "predict": {
       "q": "Which toy can have its light turned off without pulling any wire loose?",
       "options": [
        "The toy with a switch.",
        "Neither toy.",
        "Both toys, because a battery has its own off button."
       ],
       "answer": 0
      }
     },
     {
      "do": "Try to turn the light off on a toy without a switch, then on a toy with one."
     },
     {
      "observe": {
       "q": "Look at your results table. Which toy let the light be turned off without pulling a wire loose?",
       "options": [
        "The toy with a switch",
        "The toy without a switch",
        "Both the same"
       ],
       "answer": 0
      }
     },
     {
      "note": "Building a switch into a circuit lets it be turned on and off easily."
     }
    ]
   }
  ],
  "written": [
   {
    "kind": "define",
    "q": "What is a switch? [1]",
    "marks": 1,
    "concept": "A switch is a part of a circuit built to open and close the circuit on purpose.",
    "model": "A switch is a part of a circuit that opens and closes the circuit on purpose.",
    "points": [
     {
      "point": "a part of a circuit that opens and closes the circuit (the gap in the loop)",
      "marks": 1
     }
    ],
    "alsoAccept": [
     "a part that opens or closes the gap in a loop, to turn a circuit off and on",
     "a part that lets electricity flow when it is closed and stops it when it is open"
    ],
    "doNotAccept": [
     "a button",
     "a part that makes electricity",
     "a part that makes the bulb brighter",
     "a part that takes the place of the battery"
    ]
   },
   {
    "kind": "explain",
    "q": "In your results, the lantern lit only in the build with every clip fastened. Explain why. [2]",
    "marks": 2,
    "concept": "A bulb lights only when the battery, wires and bulb are joined in one complete loop, so that electricity can flow all the way round.",
    "model": "With every clip fastened, the battery, the wires and the bulb were joined in one complete loop with no gap. Electricity could then flow all the way round the loop and through the bulb, so the lantern lit. In the other builds there was a gap, so no electricity flowed.",
    "points": [
     {
      "point": "with every clip fastened, the battery, wires and bulb are joined in one complete loop (a closed circuit, with no gap)",
      "marks": 1
     },
     {
      "point": "electricity flows only round a complete loop, so only then did it flow through the bulb and light it",
      "marks": 1
     }
    ],
    "doNotAccept": [
     "all the parts were inside the toy",
     "the clips make electricity",
     "the clips were fastened (only repeats the question)",
     "the battery was stronger in that build"
    ]
   },
   {
    "kind": "explain",
    "q": "On the toy without a switch, the light stayed on when you tried to turn it off. Explain why it is useful to build a switch into the toy's circuit. [2]",
    "marks": 2,
    "concept": "Without a switch a wire must be unclipped to break the loop; a switch opens and closes the loop easily, so the toy can be turned off and on without touching the wires.",
    "model": "Without a switch, the only way to turn the light off is to unclip a wire to break the loop. A switch opens and closes the loop, so the light can be turned off and on easily without pulling any wire loose.",
    "points": [
     {
      "point": "without a switch, the light can only be turned off by unclipping (pulling loose) a wire to break the loop",
      "marks": 1
     },
     {
      "point": "a switch opens and closes the loop, so the light can be turned off and on easily without touching the wires",
      "marks": 1
     }
    ],
    "doNotAccept": [
     "a switch makes the bulb brighter",
     "the toy cannot light without a switch",
     "a switch makes the battery last for ever",
     "a switch is useful (only repeats the question)"
    ]
   }
  ]
 },
 "p6-1-1a": {
  "status": "review",
  "minutes": 30,
  "bigIdea": "All living things need food. Food is a source of energy. Energy from food is used for life processes such as moving, growing and repairing. This is true even for a living thing that stays still, like a mould.",
  "aim": "Three living things sit on the bench: a mouse, a caterpillar and a mould. Each has an empty food bowl. Find out what food does for each of them.",
  "safety": [],
  "sim": {
   "page": "labs/p6-1-1a/index.html",
   "label": "Let's test it now!",
   "covers": [
    "a",
    "b",
    "c"
   ],
   "map": {
    "a": "move",
    "b": "grow",
    "c": "decay"
   }
  },
  "badge": {
   "icon": "🍽️",
   "name": "Fuel for Life",
   "line": "You predicted, tested and explained every part of Fuel for Life."
  },
  "parts": [
   {
    "id": "a",
    "title": "On the wheel",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "A mouse will be given food, then put on its wheel for 5 minutes."
     },
     {
      "predict": {
       "q": "If the mouse is given more food, what happens to the distance it runs?",
       "options": [
        "It runs further.",
        "It runs the same distance.",
        "It runs less."
       ],
       "answer": 0
      }
     },
     {
      "do": "Give the mouse different amounts of food and measure how far it runs on the wheel in 5 minutes."
     },
     {
      "observe": {
       "q": "Look at the points. As the food given increases, the distance run…",
       "options": [
        "increases",
        "stays the same",
        "decreases"
       ],
       "answer": 0
      }
     },
     {
      "note": "Food gives the mouse energy. With more energy available, it can be more active."
     }
    ]
   },
   {
    "id": "b",
    "title": "Growing up",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "A young caterpillar will be given leaves every day for three days."
     },
     {
      "predict": {
       "q": "If a caterpillar gets more leaves each day, what happens to the mass it gains?",
       "options": [
        "It gains more mass.",
        "It gains the same mass.",
        "It gains less mass."
       ],
       "answer": 0
      }
     },
     {
      "do": "Give the caterpillar different amounts of leaf each day and measure the mass it gains after three days."
     },
     {
      "observe": {
       "q": "Look at the points. As the leaf given each day increases, the mass gained…",
       "options": [
        "increases",
        "stays the same",
        "decreases"
       ],
       "answer": 0
      }
     },
     {
      "note": "A growing animal uses food not only for energy but as the material to build its own body."
     }
    ]
   },
   {
    "id": "c",
    "title": "Still alive",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "A mould grows on a crumb of bread in a covered dish. It never moves."
     },
     {
      "predict": {
       "q": "Will the mould still need food to grow?",
       "options": [
        "Yes.",
        "No. It makes its own food.",
        "No. It only needs moisture."
       ],
       "answer": 0
      }
     },
     {
      "do": "Give the mould different amounts of food and measure the area it covers after four days."
     },
     {
      "observe": {
       "q": "Look at the points. As the food given increases, the area the mould covers…",
       "options": [
        "increases",
        "stays the same",
        "decreases"
       ],
       "answer": 0
      }
     },
     {
      "note": "Even a living thing that never moves, like a mould, needs food for the energy to grow."
     }
    ]
   }
  ],
  "written": [
   {
    "kind": "define",
    "q": "Food is a source of energy for living things. What does \"a source of energy\" mean? [1]",
    "marks": 1,
    "concept": "A source of energy is something that energy comes from. Food is where living things get the energy for their life processes.",
    "model": "A source of energy is something that gives energy. Living things get the energy they need from their food.",
    "points": [
     {
      "point": "something that gives (provides, supplies) energy, or where the energy comes from",
      "marks": 1
     }
    ],
    "alsoAccept": [
     "something that living things get their energy from",
     "where the energy for life processes comes from"
    ],
    "doNotAccept": [
     "food (an example only, with no meaning given)",
     "something that uses energy",
     "something that makes living things heavier",
     "energy (only repeats the words of the question)"
    ]
   },
   {
    "kind": "explain",
    "q": "In your results, the mouse ran further when it was given more food. Explain why. [2]",
    "marks": 2,
    "concept": "Food is a source of energy. More food gives an animal more energy for a life process such as moving.",
    "model": "Food is a source of energy for the mouse. When it was given more food, it had more energy available for moving, so it could be more active and run further.",
    "points": [
     {
      "point": "food gives the mouse energy (food is its source of energy)",
      "marks": 1
     },
     {
      "point": "more food means more energy available for moving, so the mouse is more active and runs further",
      "marks": 1
     }
    ],
    "doNotAccept": [
     "the mouse was happier or less hungry, so it ran more",
     "food gives the mouse strength or power (the word energy is needed)",
     "it ran further because it had more food (only repeats the question)",
     "the food made the wheel turn faster"
    ]
   },
   {
    "kind": "explain",
    "q": "The caterpillar gained more mass when it was given more leaf each day. Explain why. [2]",
    "marks": 2,
    "concept": "A growing animal uses food for energy and as the material to build its body, so more food allows more growth.",
    "model": "A growing caterpillar uses its food for energy and as the material to build its body. With more leaf each day it had more energy and more material for growth, so it grew more and gained more mass.",
    "points": [
     {
      "point": "the caterpillar uses its food to grow: food is the material that builds its body (accept: food gives it the energy to grow)",
      "marks": 1
     },
     {
      "point": "more leaf means more material and energy for growth, so it grows more and gains more mass",
      "marks": 1
     }
    ],
    "doNotAccept": [
     "the leaf stays in its stomach, so it is heavier",
     "it ate more so it got fatter (no mention of growth)",
     "it gained more mass because it had more leaf (only repeats the question)",
     "caterpillars grow by themselves"
    ]
   }
  ]
 },
 "p6-1-1b": {
  "status": "review",
  "minutes": 30,
  "bigIdea": "Different foods store different amounts of energy. A bigger portion of the same food stores more energy in total, but the type of food still matters. Food labels report the energy value of a food, so foods can be compared. Reading labels helps us choose a variety of foods for a balanced diet.",
  "aim": "A shelf holds five food samples, each with a label card face down. Beside it are a portion tray and a rack of food packets. Read the energy value on each label and compare.",
  "safety": [],
  "sim": {
   "page": "labs/p6-1-1b/index.html",
   "label": "Let's test it now!",
   "covers": [
    "a",
    "b",
    "c"
   ],
   "map": {
    "a": "type",
    "b": "serving",
    "c": "label"
   }
  },
  "badge": {
   "icon": "🏷️",
   "name": "Energy Labels",
   "line": "You predicted, tested and explained every part of Energy Labels."
  },
  "parts": [
   {
    "id": "a",
    "title": "Compare the labels",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "Five food samples sit on the shelf. Each label shows the energy value for 1 g of that food."
     },
     {
      "predict": {
       "q": "Which food sample will show the highest energy value on its label?",
       "options": [
        "The peanut.",
        "Whichever sample looks the heaviest.",
        "All will show the same value."
       ],
       "answer": 0
      }
     },
     {
      "do": "Flip the label card of each food sample and record the energy value for 1 g of that food."
     },
     {
      "observe": {
       "q": "Look at your bar chart. Do the foods you checked all have the same energy value per gram?",
       "options": [
        "No. Different foods have different energy values.",
        "Yes. All foods have the same energy value.",
        "Yes. Only the taste is different."
       ],
       "answer": 0
      }
     },
     {
      "note": "Different foods store different amounts of energy. A higher value on the label means more energy is stored."
     }
    ]
   },
   {
    "id": "b",
    "title": "Bigger portion",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "The portion tray holds four sizes of the same peanut snack."
     },
     {
      "predict": {
       "q": "If you take a bigger portion of the same food, what happens to its total energy value?",
       "options": [
        "It increases.",
        "It stays the same.",
        "It decreases."
       ],
       "answer": 0
      }
     },
     {
      "do": "Use the label to find the total energy value of different portion sizes of the same peanut snack."
     },
     {
      "observe": {
       "q": "Look at the points. As the portion size increases, the total energy value…",
       "options": [
        "increases",
        "stays the same",
        "decreases"
       ],
       "answer": 0
      }
     },
     {
      "note": "A bigger portion of the same food has more energy in total. The type of food still sets the value for each gram."
     }
    ]
   },
   {
    "id": "c",
    "title": "Read the packet",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "Four food packets stand on the rack. Each has a printed label."
     },
     {
      "predict": {
       "q": "Which will be closer to the energy a food really stores: the printed label, or a guess from how sweet it tastes?",
       "options": [
        "The printed label.",
        "A taste guess.",
        "Both are equally accurate."
       ],
       "answer": 0
      }
     },
     {
      "do": "Turn each food packet over and record the energy value printed for 1 g of the food."
     },
     {
      "observe": {
       "q": "Read your bar chart. Which packet lists the highest energy value per gram?",
       "options": [
        "The biscuit",
        "The banana",
        "The milk"
       ],
       "answer": 0
      }
     },
     {
      "note": "The banana and the biscuit both taste sweet, yet their energy values are very different. Taste is not a guide, so we read the label."
     }
    ]
   }
  ],
  "written": [
   {
    "kind": "define",
    "q": "What is the energy value of a food? [1]",
    "marks": 1,
    "concept": "The energy value of a food is the amount of energy stored in it. A food label reports it for a stated amount, such as 1 g.",
    "model": "The energy value of a food is the amount of energy that is stored in the food.",
    "points": [
     {
      "point": "the amount of energy stored in the food (accept: in a stated amount of it, such as 1 g)",
      "marks": 1
     }
    ],
    "alsoAccept": [
     "how much energy each gram of the food stores",
     "how much energy the food gives a living thing that eats it"
    ],
    "doNotAccept": [
     "how heavy the food is",
     "how sweet the food tastes",
     "how healthy the food is",
     "the number on the label (no mention of energy)"
    ]
   },
   {
    "kind": "explain",
    "q": "In your results, a bigger portion of the peanut snack had a higher total energy value, although it was the same food. Explain why. [2]",
    "marks": 2,
    "concept": "Each gram of the same food stores the same amount of energy, so a bigger portion, with more grams, stores more energy in total.",
    "model": "Each gram of the peanut snack stores the same amount of energy. A bigger portion has more grams of the snack, so it has more energy in total.",
    "points": [
     {
      "point": "each gram of the same food stores the same amount of energy (the value for each gram does not change)",
      "marks": 1
     },
     {
      "point": "a bigger portion has more grams (more of the food), so the energy adds up to more in total",
      "marks": 1
     }
    ],
    "doNotAccept": [
     "a bigger portion has more energy in each gram",
     "a bigger portion is more filling",
     "it had more energy because the portion was bigger (only repeats the question)",
     "a bigger portion tastes stronger"
    ]
   },
   {
    "kind": "explain",
    "q": "The banana and the biscuit both taste sweet, but their labels showed very different energy values. Explain why a label is a better guide than taste. [2]",
    "marks": 2,
    "concept": "The value on a label has been measured, while taste does not show how much energy a food stores.",
    "model": "The energy value on a label has been measured, so it shows how much energy the food really stores. Taste does not show the energy stored: the banana and the biscuit are both sweet, but they store very different amounts of energy.",
    "points": [
     {
      "point": "the energy value on a label has been measured",
      "marks": 1
     },
     {
      "point": "taste does not show how much energy a food stores (two foods that taste the same can store very different amounts), so a guess from taste can be wrong",
      "marks": 1
     }
    ],
    "doNotAccept": [
     "a sweeter food always has more energy",
     "a label is easier to read than tasting",
     "the biscuit is bigger than the banana",
     "a label is better than a guess (only repeats the question)"
    ]
   }
  ]
 },
 "p6-1-3a": {
  "status": "review",
  "minutes": 30,
  "bigIdea": "Photosynthesis needs light energy, carbon dioxide and water together. Take away any one of them and no food is made. Carbon dioxide enters mainly through the tiny openings on the underside of the leaf. Photosynthesis makes food, stored as starch, and gives out oxygen.",
  "aim": "A large model leaf stands on the bench. A lamp gives it light, a valve gives it carbon dioxide and a dish below gives it water. Find out what the leaf needs for photosynthesis.",
  "safety": [],
  "sim": {
   "page": "labs/p6-1-3a/index.html",
   "label": "Let's test it now!",
   "covers": [
    "a",
    "b",
    "c"
   ],
   "map": {
    "a": "inputs",
    "b": "pathways",
    "c": "products"
   }
  },
  "badge": {
   "icon": "🍃",
   "name": "Leaf Factory",
   "line": "You predicted, tested and explained every part of Leaf Factory."
  },
  "parts": [
   {
    "id": "a",
    "title": "Leave one out",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "The leaf can be given light, carbon dioxide and water, or one of them can be taken away."
     },
     {
      "predict": {
       "q": "If the leaf is given water and carbon dioxide but no light, will it make food?",
       "options": [
        "No.",
        "Yes, but more slowly.",
        "Yes, the same amount."
       ],
       "answer": 0
      }
     },
     {
      "do": "Take away one ingredient at a time and measure the starch the leaf produces in two hours."
     },
     {
      "observe": {
       "q": "Read your bar chart. When did the leaf produce starch?",
       "options": [
        "Only with light, carbon dioxide and water together",
        "Whenever it had water",
        "In every condition"
       ],
       "answer": 0
      }
     },
     {
      "note": "Photosynthesis needs light energy, carbon dioxide and water together. Take away any one of them and the leaf cannot make food."
     }
    ]
   },
   {
    "id": "b",
    "title": "How it gets in",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "The underside of a leaf has many tiny openings."
     },
     {
      "predict": {
       "q": "If the tiny openings on the underside of the leaf are sealed, what happens to the carbon dioxide entering it?",
       "options": [
        "It drops close to zero.",
        "It stays the same.",
        "It increases."
       ],
       "answer": 0
      }
     },
     {
      "do": "Open, half close and seal the tiny openings under the leaf. Measure the carbon dioxide entering in one minute."
     },
     {
      "observe": {
       "q": "Look at the points. As the tiny openings close, the carbon dioxide entering the leaf…",
       "options": [
        "decreases",
        "stays the same",
        "increases"
       ],
       "answer": 0
      }
     },
     {
      "note": "Carbon dioxide enters the leaf from the air mainly through the tiny openings on its underside. With the openings sealed, almost none gets in."
     }
    ]
   },
   {
    "id": "c",
    "title": "Longer in the light",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "The leaf is given light, carbon dioxide and water, and the gas it gives out is collected."
     },
     {
      "predict": {
       "q": "If the leaf photosynthesises for a longer time, what happens to the oxygen it gives out?",
       "options": [
        "It increases.",
        "It stays the same after a few minutes.",
        "It decreases."
       ],
       "answer": 0
      }
     },
     {
      "do": "Let the leaf photosynthesise for different lengths of time and measure the oxygen it gives out."
     },
     {
      "observe": {
       "q": "Look at the points. As the time in the light increases, the oxygen given out…",
       "options": [
        "increases",
        "stays the same",
        "decreases"
       ],
       "answer": 0
      }
     },
     {
      "note": "The longer a leaf carries out photosynthesis, the more food it makes and the more oxygen it gives out."
     }
    ]
   }
  ],
  "written": [
   {
    "kind": "define",
    "q": "What is photosynthesis? [1]",
    "marks": 1,
    "concept": "Photosynthesis is the process by which a plant makes its own food, using light energy, carbon dioxide and water.",
    "model": "Photosynthesis is the way a plant makes its own food, using light energy, carbon dioxide and water. Oxygen is given out.",
    "points": [
     {
      "point": "a plant (leaf) makes its own food using light energy (with carbon dioxide and water)",
      "marks": 1
     }
    ],
    "alsoAccept": [
     "plants make food from carbon dioxide and water when there is light",
     "the process in which a plant uses light to make food and gives out oxygen"
    ],
    "doNotAccept": [
     "plants taking in food from the soil",
     "plants breathing",
     "plants taking in sunlight (no mention of making food)",
     "plants growing towards the light"
    ]
   },
   {
    "kind": "explain",
    "q": "When the light was taken away, the leaf produced almost no starch, although it still had carbon dioxide and water. Explain why. [2]",
    "marks": 2,
    "concept": "Photosynthesis needs light energy, carbon dioxide and water together. Without light no food is made, so almost no starch is stored.",
    "model": "Photosynthesis needs light energy as well as carbon dioxide and water. Without light the leaf could not carry out photosynthesis, so it made almost no food to store as starch.",
    "points": [
     {
      "point": "photosynthesis needs light (energy), together with carbon dioxide and water",
      "marks": 1
     },
     {
      "point": "without light the leaf cannot photosynthesise (make food), so almost no starch is made and stored",
      "marks": 1
     }
    ],
    "doNotAccept": [
     "the leaf was too cold without the lamp",
     "plants rest or sleep in the dark",
     "the leaf used light that it stored earlier",
     "there was no starch because there was no light (only repeats the question, no mention of making food)"
    ]
   },
   {
    "kind": "explain",
    "q": "In your results, the leaf gave out more oxygen when it was left in the light for a longer time. Explain why. [2]",
    "marks": 2,
    "concept": "Oxygen is given out during photosynthesis, so the longer a leaf photosynthesises, the more food it makes and the more oxygen it gives out.",
    "model": "A leaf gives out oxygen when it carries out photosynthesis. In a longer time the leaf carried out more photosynthesis and made more food, so it gave out more oxygen.",
    "points": [
     {
      "point": "oxygen is given out by the leaf during photosynthesis (as it makes food)",
      "marks": 1
     },
     {
      "point": "in a longer time more photosynthesis takes place (more food is made), so more oxygen is given out",
      "marks": 1
     }
    ],
    "doNotAccept": [
     "the lamp makes the oxygen",
     "the leaf gives out carbon dioxide",
     "the oxygen is air that was already in the water",
     "a longer time gives more oxygen (only repeats the question)"
    ]
   }
  ]
 },
 "p6-1-3b": {
  "status": "review",
  "minutes": 30,
  "bigIdea": "Moving the light closer speeds up photosynthesis. Moving it further away slows it down. More dissolved carbon dioxide also speeds up photosynthesis. The gas in the bubbles is oxygen, given out during photosynthesis. A leaf that photosynthesised turns blue-black with iodine solution, showing it stored starch.",
  "aim": "A water plant sits in a beaker, with a lamp on a rail beside it and a dial for the carbon dioxide dissolved in the water. A dish of iodine solution and two leaves wait at the side.",
  "safety": [
   "Keep iodine solution off your skin and clothes, and wash your hands after a real test."
  ],
  "sim": {
   "page": "labs/p6-1-3b/index.html",
   "label": "Let's test it now!",
   "covers": [
    "a",
    "b",
    "c"
   ],
   "map": {
    "a": "distance",
    "b": "carbon",
    "c": "starch"
   }
  },
  "badge": {
   "icon": "🫧",
   "name": "Light and Gas",
   "line": "You predicted, tested and explained every part of Light and Gas."
  },
  "parts": [
   {
    "id": "a",
    "title": "Move the lamp",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "A water plant gives out bubbles of gas when it photosynthesises."
     },
     {
      "predict": {
       "q": "As the lamp is moved further from the plant, what happens to the number of bubbles each minute?",
       "options": [
        "It decreases.",
        "It stays the same.",
        "It increases."
       ],
       "answer": 0
      }
     },
     {
      "do": "Move the lamp to different distances and count the bubbles the water plant gives out in one minute."
     },
     {
      "observe": {
       "q": "Look at the points. As the lamp distance increases, the bubbles per minute…",
       "options": [
        "decreases",
        "stays the same",
        "increases"
       ],
       "answer": 0
      }
     },
     {
      "note": "Moving the lamp further away reduces the light reaching the plant. With less light the rate of photosynthesis is slower, so fewer bubbles are given out."
     }
    ]
   },
   {
    "id": "b",
    "title": "More gas dissolved",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "The dial changes how much carbon dioxide is dissolved in the water. The lamp stays where it is."
     },
     {
      "predict": {
       "q": "If more carbon dioxide is dissolved in the water, what happens to the rate of photosynthesis?",
       "options": [
        "It increases.",
        "It stays the same.",
        "It decreases."
       ],
       "answer": 0
      }
     },
     {
      "do": "Change the carbon dioxide dissolved in the water and count the bubbles the plant gives out in one minute."
     },
     {
      "observe": {
       "q": "Look at the points. As the carbon dioxide in the water increases, the bubbles per minute…",
       "options": [
        "increases",
        "stays the same",
        "decreases"
       ],
       "answer": 0
      }
     },
     {
      "note": "Carbon dioxide is needed for photosynthesis. With more of it the plant photosynthesises faster and gives out oxygen at a greater rate."
     }
    ]
   },
   {
    "id": "c",
    "title": "The iodine test",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "Two leaves come from the same plant. One was left in light for three days. The other was covered and kept in the dark."
     },
     {
      "predict": {
       "q": "Which leaf will turn blue-black when it is tested with iodine solution?",
       "options": [
        "The leaf left in light.",
        "The leaf kept in the dark.",
        "Both, equally."
       ],
       "answer": 0
      }
     },
     {
      "do": "Test the leaf left in light and the leaf kept in the dark with iodine solution, and record the colour score."
     },
     {
      "observe": {
       "q": "Read your bar chart. Which leaf turned blue-black, showing that it stored starch?",
       "options": [
        "The leaf left in light",
        "The leaf kept in the dark",
        "Both leaves, equally"
       ],
       "answer": 0
      }
     },
     {
      "note": "A leaf that photosynthesised stores starch and turns blue-black with iodine solution. A leaf kept in the dark could not photosynthesise, so it stores little or no starch."
     }
    ]
   }
  ],
  "written": [
   {
    "kind": "define",
    "q": "What does \"the rate of photosynthesis\" mean? [1]",
    "marks": 1,
    "concept": "The rate of photosynthesis is how fast a plant carries out photosynthesis. On the bench, more bubbles of oxygen in one minute means a faster rate.",
    "model": "The rate of photosynthesis is how fast a plant makes food by photosynthesis. A faster rate means more oxygen is given out in the same time.",
    "points": [
     {
      "point": "how fast (quickly) photosynthesis takes place, or how much food or oxygen the plant makes in a given time",
      "marks": 1
     }
    ],
    "alsoAccept": [
     "the speed at which a plant makes food",
     "how many bubbles of oxygen the plant gives out in one minute"
    ],
    "doNotAccept": [
     "how plants make food (the meaning of photosynthesis, not of its rate)",
     "how much light the plant gets",
     "how fast the plant grows taller",
     "the number of leaves on the plant"
    ]
   },
   {
    "kind": "explain",
    "q": "In your results, the water plant gave out fewer bubbles in one minute when the lamp was moved further away. Explain why. [2]",
    "marks": 2,
    "concept": "A lamp that is further away gives the plant less light, so the rate of photosynthesis is slower and less oxygen is given out.",
    "model": "When the lamp is further away, less light reaches the plant. With less light the rate of photosynthesis is slower, so the plant gives out less oxygen and there are fewer bubbles.",
    "points": [
     {
      "point": "less light reaches (is received by) the plant when the lamp is further away",
      "marks": 1
     },
     {
      "point": "with less light the rate of photosynthesis is slower, so less oxygen is given out (fewer bubbles)",
      "marks": 1
     }
    ],
    "doNotAccept": [
     "the water is colder, so there are fewer bubbles",
     "the bubbles are carbon dioxide",
     "the plant breathes more slowly",
     "there were fewer bubbles because the lamp was further away (only repeats the question)"
    ]
   },
   {
    "kind": "explain",
    "q": "The leaf left in light turned blue-black with iodine solution, but the leaf kept in the dark did not. Explain why. [2]",
    "marks": 2,
    "concept": "Iodine solution turns blue-black where there is starch. Only a leaf that had light could photosynthesise and store starch.",
    "model": "The leaf left in light could photosynthesise, so it made food and stored it as starch. Iodine solution turns blue-black when there is starch. The leaf kept in the dark could not photosynthesise, so it stored little or no starch.",
    "points": [
     {
      "point": "the leaf in light photosynthesised and stored starch, and starch turns iodine solution blue-black",
      "marks": 1
     },
     {
      "point": "the leaf in the dark had no light, so it could not photosynthesise and stored little or no starch",
      "marks": 1
     }
    ],
    "doNotAccept": [
     "the light changed the colour of the leaf",
     "iodine solution turns blue-black in light",
     "all leaves contain starch",
     "the leaf kept in the dark was dead"
    ]
   }
  ]
 },
 "p6-1-4": {
  "status": "review",
  "minutes": 30,
  "bigIdea": "A plant makes food by photosynthesis, and it needs light to do it. The food is stored as starch. The longer a leaf is lit, the more starch it stores. Without light a plant cannot make new starch, and it uses what it has stored. An animal uses the energy stored from its food to be active, day and night. More food means more energy.",
  "aim": "A potted plant sits under a lamp beside a dark cupboard, with a dish for the iodine test. A hamster waits in its cage with a wheel and a food dish.",
  "safety": [
   "Keep iodine solution off your skin and clothes, and wash your hands after a real test."
  ],
  "sim": {
   "page": "labs/p6-1-4/index.html",
   "label": "Let's test it now!",
   "covers": [
    "a",
    "b",
    "c"
   ],
   "map": {
    "a": "light",
    "b": "dark",
    "c": "active"
   }
  },
  "badge": {
   "icon": "🌗",
   "name": "Day and Night Engine",
   "line": "You predicted, tested and explained every part of Day and Night Engine."
  },
  "parts": [
   {
    "id": "a",
    "title": "Longer in the light",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "The plant has been kept in the dark, so its leaves start with almost no starch. Then the lamp is switched on."
     },
     {
      "predict": {
       "q": "If a leaf is given more hours of light before it is tested, what happens to the starch found?",
       "options": [
        "It increases.",
        "It stays the same.",
        "It decreases."
       ],
       "answer": 0
      }
     },
     {
      "do": "Light the plant for different numbers of hours, then test a leaf with iodine solution and record the colour score."
     },
     {
      "observe": {
       "q": "Look at the points. As the hours of light increase, the colour score…",
       "options": [
        "increases",
        "stays the same",
        "decreases"
       ],
       "answer": 0
      }
     },
     {
      "note": "The longer a leaf photosynthesises in light, the more starch it makes and stores."
     }
    ]
   },
   {
    "id": "b",
    "title": "Running out in the dark",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "A plant with starch already in its leaves is put in a dark cupboard. It is still watered."
     },
     {
      "predict": {
       "q": "What happens to the starch in its leaves over several days in the dark?",
       "options": [
        "It decreases.",
        "It stays the same.",
        "It increases."
       ],
       "answer": 0
      }
     },
     {
      "do": "Keep the plant in the dark cupboard for different numbers of days, then test a leaf and record the colour score."
     },
     {
      "observe": {
       "q": "Look at the points. As the days in the dark increase, the colour score…",
       "options": [
        "decreases",
        "stays the same",
        "increases"
       ],
       "answer": 0
      }
     },
     {
      "note": "Without light a plant cannot make new starch. It uses its stored starch for its life processes, so the amount found falls."
     }
    ]
   },
   {
    "id": "c",
    "title": "Keeping active",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "A hamster eats some food, then runs on its wheel for 5 minutes."
     },
     {
      "predict": {
       "q": "If the hamster eats more food before the run, what happens to how far it runs?",
       "options": [
        "It runs further.",
        "It runs the same distance.",
        "It runs less far."
       ],
       "answer": 0
      }
     },
     {
      "do": "Let the hamster eat different amounts of food. Then measure how far it runs in 5 minutes."
     },
     {
      "observe": {
       "q": "Look at the points. As the food eaten increases, the distance run…",
       "options": [
        "increases",
        "stays the same",
        "decreases"
       ],
       "answer": 0
      }
     },
     {
      "note": "An animal uses the energy stored from its food to be active, day and night. The more it has eaten, the more energy it has to run."
     }
    ]
   }
  ],
  "written": [
   {
    "kind": "define",
    "q": "What is the starch in a leaf? [1]",
    "marks": 1,
    "concept": "Starch is the stored form of the food a plant makes by photosynthesis.",
    "model": "Starch is the food that a plant has made by photosynthesis and stored in its leaves.",
    "points": [
     {
      "point": "food made by the plant (by photosynthesis) that is stored in the leaf",
      "marks": 1
     }
    ],
    "alsoAccept": [
     "the stored food of a plant",
     "the form in which a leaf stores the food it makes"
    ],
    "doNotAccept": [
     "iodine solution",
     "the blue-black colour",
     "food that the plant takes in from the soil",
     "the green colour of the leaf"
    ]
   },
   {
    "kind": "explain",
    "q": "In your results, the more hours a leaf was lit, the more starch was found in it. Explain why. [2]",
    "marks": 2,
    "concept": "A leaf makes food by photosynthesis only when it has light, and stores the food as starch, so more hours of light means more starch.",
    "model": "A leaf needs light to make food by photosynthesis, and the food is stored as starch. The longer the leaf was lit, the more photosynthesis took place, so it made and stored more starch.",
    "points": [
     {
      "point": "a leaf needs light to photosynthesise (make food), and the food is stored as starch",
      "marks": 1
     },
     {
      "point": "more hours of light means more photosynthesis, so more starch is made and stored",
      "marks": 1
     }
    ],
    "doNotAccept": [
     "the lamp warmed the leaf and changed its colour",
     "the iodine solution got stronger with time",
     "the leaf took in starch from the soil",
     "more light gives more starch (only repeats the question)"
    ]
   },
   {
    "kind": "explain",
    "q": "The longer the plant was kept in the dark, the less starch was found in its leaves. Explain why. [2]",
    "marks": 2,
    "concept": "Without light a plant cannot make new starch, and it uses its stored starch for its life processes.",
    "model": "Without light the plant could not photosynthesise, so it made no new starch. It still needed energy for its life processes, so it used up the starch it had stored and the amount fell.",
    "points": [
     {
      "point": "without light the plant cannot photosynthesise, so no new starch is made",
      "marks": 1
     },
     {
      "point": "the plant uses its stored starch (food) for energy for its life processes, so the amount of starch falls",
      "marks": 1
     }
    ],
    "doNotAccept": [
     "the starch turned into water",
     "the plant made more starch in the dark and moved it to its roots",
     "the plant died",
     "there was less starch because there was no light (only repeats the question)"
    ]
   }
  ]
 },
 "p6-1-5": {
  "status": "review",
  "minutes": 30,
  "bigIdea": "The arrow in a food chain points from the eaten to the eater, showing the direction in which energy passes. A food web is made of several food chains joined together. Energy passes along a chain, but only part of it passes at each link. The living thing furthest from the producer has the least energy available.",
  "aim": "A story board holds picture cards of a producer and several consumers. A second board shows how food chains join into a food web. Tell each energy story the right way round.",
  "safety": [],
  "sim": {
   "page": "labs/p6-1-5/index.html",
   "label": "Let's test it now!",
   "covers": [
    "a",
    "b",
    "c"
   ],
   "map": {
    "a": "link",
    "b": "web",
    "c": "flow"
   }
  },
  "badge": {
   "icon": "🔗",
   "name": "Energy Chain",
   "line": "You predicted, tested and explained every part of Energy Chain."
  },
  "parts": [
   {
    "id": "a",
    "title": "Which way the arrow",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "In a food chain, an arrow joins a living thing to the animal that eats it."
     },
     {
      "predict": {
       "q": "Does the arrow point from the eaten to the eater, or from the eater to the eaten?",
       "options": [
        "From the eaten to the eater.",
        "From the eater to the eaten.",
        "Either way."
       ],
       "answer": 0
      }
     },
     {
      "do": "For each pair, choose the link with the arrow the right way round. Tap the link you think is right."
     },
     {
      "observe": {
       "q": "Look back at the three links you chose. Every correct arrow pointed…",
       "options": [
        "from the eaten to the eater",
        "from the eater to the eaten",
        "either way"
       ],
       "answer": 0
      }
     },
     {
      "note": "The arrow in a food chain always points from the food to the animal that eats it. It shows how energy passes from one living thing to the next."
     }
    ]
   },
   {
    "id": "b",
    "title": "Joining the chains",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "More food chains will be added to the same board. Some living things belong to more than one chain."
     },
     {
      "predict": {
       "q": "As more food chains are joined on the board, what happens to the number of feeding connections shown?",
       "options": [
        "It increases.",
        "It stays the same.",
        "It decreases."
       ],
       "answer": 0
      }
     },
     {
      "do": "Join one, two and three food chains on the board. Each time, trace the path that is asked for."
     },
     {
      "observe": {
       "q": "Look back at the three webs. As more chains are joined, the connections shown…",
       "options": [
        "increase",
        "stay the same",
        "decrease"
       ],
       "answer": 0
      }
     },
     {
      "note": "A food web shows how several food chains link together, because most living things eat more than one kind of food and are eaten by more than one animal."
     }
    ]
   },
   {
    "id": "c",
    "title": "Energy running low",
    "who": "predict, then test it on the bench",
    "steps": [
     {
      "do": "The grass is the producer. The grasshopper eats the grass, and the frog eats the grasshopper."
     },
     {
      "predict": {
       "q": "Which has the least energy available?",
       "options": [
        "The frog, furthest from the producer.",
        "The grass, the producer.",
        "They all have the same."
       ],
       "answer": 0
      }
     },
     {
      "do": "Measure the energy available at each link of the chain: the grass, the grasshopper and the frog."
     },
     {
      "observe": {
       "q": "Look at the points. With each link away from the producer, the energy available…",
       "options": [
        "decreases",
        "stays the same",
        "increases"
       ],
       "answer": 0
      }
     },
     {
      "note": "Energy is passed along a food chain from the producer to each consumer, and only part of it passes on at each link. The living thing furthest from the producer has the least energy available."
     }
    ]
   }
  ],
  "written": [
   {
    "kind": "define",
    "q": "What is a food web? [1]",
    "marks": 1,
    "concept": "A food web is made of several food chains that are joined together.",
    "model": "A food web is several food chains joined together. It shows how the living things in a place feed on one another.",
    "points": [
     {
      "point": "several (two or more) food chains joined (linked) together",
      "marks": 1
     }
    ],
    "alsoAccept": [
     "food chains that are connected because living things eat, or are eaten by, more than one living thing",
     "it shows all the feeding connections between the living things in a place"
    ],
    "doNotAccept": [
     "one very long food chain",
     "a list of the animals in a habitat",
     "a web that a spider makes to catch food",
     "a food chain (no mention of several chains joined)"
    ]
   },
   {
    "kind": "explain",
    "q": "On the story board, the correct link was grass → grasshopper, not grasshopper → grass. Explain why the arrow points this way. [2]",
    "marks": 2,
    "concept": "The arrow in a food chain shows the direction in which energy passes: from the living thing that is eaten to the animal that eats it.",
    "model": "The arrow shows the direction in which energy passes. The grasshopper eats the grass, so energy passes from the grass to the grasshopper, and the arrow points from the grass to the grasshopper.",
    "points": [
     {
      "point": "the arrow shows the direction in which energy passes (is transferred)",
      "marks": 1
     },
     {
      "point": "the grasshopper eats the grass, so energy passes from the grass (the eaten) to the grasshopper (the eater)",
      "marks": 1
     }
    ],
    "doNotAccept": [
     "the arrow means 'eats', so the grass eats the grasshopper",
     "the arrow points to the bigger or stronger living thing",
     "the grass comes first because it is a plant (no mention of energy)",
     "the arrow shows which way the animal moves"
    ]
   },
   {
    "kind": "explain",
    "q": "On the web board, the snake ate the frog, the bird and the mouse. Explain why food chains join into a food web. [2]",
    "marks": 2,
    "concept": "Most living things eat more than one kind of food and are eaten by more than one animal, so they belong to several food chains, which link together.",
    "model": "Most living things eat more than one kind of food and are eaten by more than one kind of animal. So the same living thing, like the snake, is part of more than one food chain, and the chains join at it to make a food web.",
    "points": [
     {
      "point": "most living things eat more than one kind of food, or are eaten by more than one kind of animal",
      "marks": 1
     },
     {
      "point": "so one living thing is part of more than one food chain, and the chains link (join) at that living thing",
      "marks": 1
     }
    ],
    "doNotAccept": [
     "the chains join to make one longer chain",
     "all animals eat grass",
     "the animals live in the same place (no mention of feeding)",
     "a food web has more arrows (only describes the web)"
    ]
   }
  ]
 }
};
