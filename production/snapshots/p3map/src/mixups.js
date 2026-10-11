/* Mix-up busters: the teacher's approved list (2026-09-20) of answers that the marking
 * schemes turn away, and what earns the mark instead. Drawn from the answer keys and
 * written in our own words; no school is named and nothing is copied.
 *
 * One list, two places: the opossum in Mind maps (mindmap.html) shows a chapter's cards,
 * and the Recitation Cloud (recite.html) tests them. Keyed by the mind map's topic id.
 *   n   the number on the teacher's list        q   the question a pupil is asked
 *   x   the trap: what many pupils write, shown only AFTER they have answered
 *   ok  what earns the mark                     w   right science, loose wording
 *   r   the teacher's own ruling
 * "_exp" applies to every chapter. Nothing here sits outside the syllabus: the CELLS
 * cards were taken out on 2026-09-20, because the syllabus does not teach that topic.
 * The skeletal system stays; it has no mind map poster, so it is a Recitation topic only.
 * Change a card only with the teacher's approval, and keep it under the right chapter.
 * This is NOT misconceptions.js: that list feeds the marking prompt and must not change
 * with this one. */
window.MIXUPS = {
 "heat": [
  {
   "n": 1,
   "x": "The fur (or the blanket) traps heat.",
   "ok": "The material traps AIR. Air is a poor conductor of heat, so heat is lost to the surroundings more slowly.",
   "r": 1,
   "q": "A polar bear has thick fur. How does the fur help it to keep warm?"
  },
  {
   "n": 2,
   "x": "It is a non-conductor of heat.",
   "ok": "Poor conductor of heat. A poor conductor still conducts heat, only slowly.",
   "q": "Foam does not let heat pass through it easily. What do we call it, in full?"
  },
  {
   "n": 3,
   "x": "Temperature is a measure of heat.",
   "ok": "Temperature is a measure of how hot something is.",
   "q": "What does temperature measure?"
  },
  {
   "n": 4,
   "x": "The bubble expands.",
   "ok": "Name what expands: the AIR inside the bubble gains heat and expands.",
   "q": "A bubble is warmed and grows bigger. What exactly gains heat and expands?"
  },
  {
   "n": 5,
   "x": "It gained heat. (From what?)",
   "ok": "Say what it gains heat FROM, or what it loses heat TO.",
   "w": 1,
   "q": "You have written that something gained heat. What must you always add?"
  },
  {
   "n": 6,
   "x": "It is a good conductor.",
   "ok": "A good conductor OF HEAT.",
   "w": 1,
   "q": "Metal lets heat pass through it quickly. What do we call it, in full?"
  },
  {
   "n": 7,
   "x": "It becomes bigger.",
   "ok": "It expands.",
   "w": 1,
   "q": "A metal ball is heated and takes up more space. What is the science word for this?"
  }
 ],
 "water": [
  {
   "n": 8,
   "x": "Water vapour in the air formed the droplets (when the vapour really came from the hot food or the breath).",
   "ok": "Name the right source of the water vapour. Where it came from earns the first mark.",
   "q": "Water droplets form on the inside of a lid above hot food. What must your answer say first?"
  },
  {
   "n": 9,
   "x": "The ice lost heat and melted.",
   "ok": "Ice GAINS heat from the warmer surroundings and melts.",
   "q": "An ice cube left on a table melts. What happens to the heat?"
  },
  {
   "n": 10,
   "x": "The water vapour lost heat to the surrounding air (when the droplets are on a surface).",
   "ok": "It loses heat TO THE COOLER SURFACE it touches.",
   "q": "Water droplets form on a cold can. Where does the water vapour lose heat to?"
  },
  {
   "n": 11,
   "x": "Evaporation makes water vapour, but boiling makes steam.",
   "ok": "Boiling happens at a fixed temperature, throughout the liquid. Evaporation happens at any temperature, at the surface only.",
   "q": "How is boiling different from evaporation?"
  },
  {
   "n": 12,
   "x": "The hands blocked the water vapour, so there were fewer droplets.",
   "ok": "A warmer surface means a smaller difference in temperature, so less heat is lost and fewer droplets form.",
   "q": "A pupil warms the outside of a cold glass with their hands, and fewer droplets form. Why?"
  },
  {
   "n": 13,
   "x": "Freezing happens at its freezing point.",
   "ok": "Three parts: what loses heat and TO what, from which state to which state, and AT A FIXED TEMPERATURE.",
   "r": 1,
   "q": "What three parts must a definition of freezing contain?"
  },
  {
   "n": 14,
   "x": "The water vapour turned into water.",
   "ok": "Show the chain: it touches the cooler surface, loses heat to it, and condenses into tiny water droplets.",
   "w": 1,
   "q": "Describe how water droplets form on a cold surface."
  },
  {
   "n": 15,
   "x": "It evaporates quickly. / The exposed area is larger.",
   "ok": "It evaporates FASTER. / The exposed SURFACE AREA is larger.",
   "w": 1,
   "q": "Wind blows over wet clothes. How should you write about the rate, and about the area?"
  }
 ],
 "electrical": [
  {
   "n": 16,
   "x": "The current flows through the iron rod.",
   "ok": "The current flows through the COIL OF WIRE. The iron rod becomes an electromagnet.",
   "r": 1,
   "q": "The switch of an electromagnet is closed. Where does the current flow?"
  },
  {
   "n": 17,
   "x": "The battery is used up (or drained).",
   "ok": "It has less chemical potential energy left to be converted into electrical energy.",
   "q": "A torch grows dim after being left on for hours. What has happened to the battery?"
  },
  {
   "n": 18,
   "x": "Electricity is changed to light.",
   "ok": "In an energy change, write ELECTRICAL ENERGY, never electricity.",
   "q": "A bulb lights up. What is the energy from the battery called in an energy change?"
  },
  {
   "n": 20,
   "x": "The electromagnet has reached its maximum strength.",
   "ok": "To make it stronger: more turns of wire in the coil, or more batteries.",
   "q": "How can an electromagnet be made stronger?"
  },
  {
   "n": 21,
   "x": "So that the user is not electrocuted. (When the PROPERTY is asked for.)",
   "ok": "It is an insulator of electricity. That is the property; safety is only the use.",
   "q": "A wire is covered in plastic. What property of plastic makes it suitable?"
  },
  {
   "n": 22,
   "x": "It allows electricity to pass through. (And stops there.)",
   "ok": "Say the circuit is closed AND what that does: the bulb lights up.",
   "w": 1,
   "q": "The switch of a circuit is closed. What must your answer say?"
  },
  {
   "n": 23,
   "x": "Add a bulb in parallel.",
   "ok": "In parallel WITH THE FIRST BULB. Say in relation to what.",
   "w": 1,
   "q": "You want to add a second bulb so that both stay bright. How must you describe where it goes?"
  }
 ],
 "magnets": [
  {
   "n": 24,
   "x": "Magnets attract metal.",
   "ok": "Only magnetic materials: iron, steel, nickel and cobalt. Copper and aluminium are not magnetic.",
   "q": "Which materials are attracted to a magnet?"
  },
  {
   "n": 25,
   "x": "The iron ball attracted the magnet.",
   "ok": "The iron ball is attracted TO the magnet.",
   "q": "A magnet is brought near an iron ball and they come together. Which way round do you write it?"
  },
  {
   "n": 26,
   "x": "The reading went up because its mass (or its weight, or gravity) increased.",
   "ok": "The PUSH of repulsion between the like poles raises the reading.",
   "q": "A magnet is held above another one on a balance, and the reading goes up. Why?"
  }
 ],
 "forces": [
  {
   "n": 27,
   "x": "The ball overcame gravity as it moved upwards.",
   "ok": "It moves AGAINST the gravitational force. It is slowing down, so it has not overcome anything.",
   "q": "A ball is thrown straight up and is still rising. What is it moving against?"
  },
  {
   "n": 28,
   "x": "The spring expands. / The spring contracts.",
   "ok": "Springs STRETCH, EXTEND or are COMPRESSED. Expand and contract are heat words.",
   "q": "A spring is pulled and gets longer. Which words should you use for this?"
  },
  {
   "n": 19,
   "x": "Use a stronger spring.",
   "ok": "Use a STIFFER spring. Strong means hard to break, which is a different property.",
   "r": 1,
   "q": "A spring must push a bolt in further. What kind of spring is needed?"
  },
  {
   "n": 29,
   "x": "It reached its elastic limit.",
   "ok": "\"It cannot stretch any more\" earns half. \"It snapped\" is right if it broke.",
   "q": "A spring stops getting any longer when more masses are hung on it. How do you say this?"
  },
  {
   "n": 30,
   "x": "The exposed surface area affects friction.",
   "ok": "Friction depends on the two surfaces in contact. A rougher surface gives MORE friction.",
   "q": "What decides how much friction there is between two things?"
  },
  {
   "n": 31,
   "x": "It takes longer to reach the ground. (And stops there.)",
   "ok": "A larger surface area gives MORE AIR RESISTANCE, so it falls more slowly.",
   "q": "An open parachute makes a load fall more slowly. Why?"
  },
  {
   "n": 32,
   "x": "There is less friction.",
   "ok": "Name the two surfaces: less friction between the wheels and the track.",
   "w": 1,
   "q": "Wheels make a cart easier to push. How must you write about the friction?"
  }
 ],
 "energy": [
  {
   "n": 33,
   "x": "The energy is used up. / It has not enough energy.",
   "ok": "The energy was converted to HEAT (and sound) because of friction or air resistance.",
   "q": "A rolling ball slows down and stops on its own. What happened to its kinetic energy?"
  },
  {
   "n": 34,
   "x": "All the kinetic energy is converted. (While the object is still moving.)",
   "ok": "SOME is converted. All of it only at the very top, where the object stops for a moment.",
   "q": "A ball rolls up a slope and is still moving. How much of its kinetic energy has become gravitational potential energy?"
  },
  {
   "n": 35,
   "x": "Gravitational energy.",
   "ok": "The word POTENTIAL is needed. \"Potential energy\" on its own is accepted.",
   "r": 1,
   "q": "A ball is held high above the ground. What is the energy it has called?"
  },
  {
   "n": 36,
   "x": "Writing a conversion when asked which forms of energy the object HAS.",
   "ok": "List the forms it has. Give a conversion only when a conversion is asked for.",
   "q": "A question asks which forms of energy a stretched catapult HAS. What do you write?"
  },
  {
   "n": 37,
   "x": "Raise the stand. / Put the track higher.",
   "ok": "Say exactly what to change and where: raise the end of the track where the car starts.",
   "w": 1,
   "q": "A toy car should travel further down a track. How must you write the change?"
  }
 ],
 "plants": [
  {
   "n": 38,
   "x": "Roots absorb nutrients (or food).",
   "ok": "Roots absorb WATER AND DISSOLVED MINERAL SALTS. The plant makes its own food in its leaves.",
   "q": "What do roots absorb from the soil?"
  },
  {
   "n": 39,
   "x": "The stem stores food.",
   "ok": "The stem TRANSPORTS. Water-carrying tubes take water up from the roots; food-carrying tubes take food from the leaves to all parts.",
   "q": "What does the stem do for water and for food?"
  },
  {
   "n": 40,
   "x": "Stomata take in carbon dioxide.",
   "ok": "Stomata are openings. They ALLOW gases to enter and leave.",
   "q": "What do the stomata do?"
  },
  {
   "n": 42,
   "x": "The water in the pot evaporated. (When the question is about the plant.)",
   "ok": "Water leaves the plant as water vapour through the stomata.",
   "q": "How does water leave a plant?"
  },
  {
   "n": 44,
   "x": "It has more roots. / It has bigger roots.",
   "ok": "Compare the right thing: longer, deeper or more spread out, so a larger surface area in contact with the soil.",
   "w": 1,
   "q": "One plant takes in more water than another. How should you compare their roots?"
  }
 ],
 "photosynthesis": [
  {
   "n": 41,
   "x": "Photosynthesis produces starch. / It needs water vapour.",
   "ok": "It needs light, carbon dioxide, water and chlorophyll. It makes food (sugar) and oxygen.",
   "q": "What does photosynthesis need, and what does it make?"
  },
  {
   "n": 43,
   "x": "The plant releases food. / The plant provides oxygen.",
   "ok": "A plant MAKES food and GIVES OUT oxygen.",
   "w": 1,
   "q": "Which verbs do you use for a plant and its food, and for a plant and its oxygen?"
  }
 ],
 "reproduction": [
  {
   "n": 45,
   "x": "Pollen touches the stigma.",
   "ok": "Pollination is the TRANSFER of pollen FROM the anther TO the stigma.",
   "q": "What is pollination?"
  },
  {
   "n": 46,
   "x": "Seeds develop from the ovum. / The egg is fertilised.",
   "ok": "The fruit develops from the OVARY and the seeds from the OVULES. Write egg cell, not egg.",
   "q": "After fertilisation, which part becomes the fruit, and which part becomes the seeds?"
  },
  {
   "n": 47,
   "x": "Seeds need sunlight (or heat) to germinate.",
   "ok": "Seeds need water, air (oxygen) and warmth.",
   "q": "What does a seed need in order to germinate?"
  },
  {
   "n": 48,
   "x": "Young plants compete for food, air or oxygen.",
   "ok": "They compete for sunlight, water, space and mineral salts.",
   "q": "What do young plants growing close together compete for?"
  },
  {
   "n": 49,
   "x": "The fruit floats because it is light.",
   "ok": "The fibrous husk TRAPS AIR, so the fruit floats on water.",
   "q": "A coconut is carried away on the sea. Why does it float?"
  },
  {
   "n": 50,
   "x": "Seed leaves give food to the seed (or to the plant).",
   "ok": "They give food to the SEEDLING until its first leaves can make food.",
   "q": "What do the seed leaves do?"
  },
  {
   "n": 51,
   "x": "Dispersed by explosion. / The plant is dispersed.",
   "ok": "By explosive ACTION. It is the SEED (or fruit) that is dispersed.",
   "w": 1,
   "q": "A pod dries, splits and flings its seeds out. Name this method exactly."
  }
 ],
 "digestive": [
  {
   "n": 52,
   "x": "Digestion breaks food into smaller pieces.",
   "ok": "Digestion breaks food down into SIMPLER SUBSTANCES. Smaller pieces are still the same substance.",
   "q": "What is digestion?"
  },
  {
   "n": 53,
   "x": "The large intestine absorbs water from digested food.",
   "ok": "It absorbs water from the UNDIGESTED food.",
   "q": "What does the large intestine absorb, and what does it absorb it from?"
  },
  {
   "n": 54,
   "x": "Less blood to the small intestine means less digestion.",
   "ok": "It means less ABSORPTION of digested food into the blood.",
   "q": "Less blood flows to the small intestine. What happens there?"
  },
  {
   "n": 59,
   "x": "Big intestine.",
   "ok": "LARGE intestine. Name each part exactly.",
   "w": 1,
   "q": "What is the correct name for the wider part of the intestine?"
  }
 ],
 "respcirc": [
  {
   "n": 55,
   "x": "The mouth is part of the respiratory system.",
   "ok": "The mouth belongs to the digestive system. Air enters through the nose and the windpipe.",
   "q": "Which system does the mouth belong to, and how does air enter the body?"
  },
  {
   "n": 56,
   "x": "We take in air.",
   "ok": "We take IN oxygen and give OUT carbon dioxide. Both gases and both directions are needed.",
   "q": "What does the respiratory system do?"
  },
  {
   "n": 58,
   "x": "The blood is transported around the body.",
   "ok": "The BLOOD transports oxygen and digested food TO ALL PARTS of the body, and carries carbon dioxide away.",
   "q": "What does the circulatory system do?"
  },
  {
   "n": 59,
   "x": "Breathing tube. / Circulation system.",
   "ok": "Windpipe. / Circulatory system. Name each part exactly.",
   "w": 1,
   "q": "What are the correct names for the tube air passes down, and for the system that carries blood?"
  }
 ],
 "lifecycles": [
  {
   "n": 62,
   "x": "It is an insect because it has wings and feelers and lays eggs.",
   "ok": "An insect has SIX LEGS and THREE BODY PARTS. Other animals have wings, feelers and eggs too.",
   "q": "What makes an animal an insect?"
  },
  {
   "n": 63,
   "x": "Oil stops air entering the water, so the mosquitoes die.",
   "ok": "The LARVAE AND PUPAE cannot take in oxygen at the surface, so they die.",
   "q": "A thin layer of oil is poured onto still water. How does this control mosquitoes?"
  },
  {
   "n": 64,
   "x": "It lays many eggs to ensure the continuity of its kind.",
   "ok": "Some eggs are not fertilised, some do not hatch, some are eaten. Laying many means some survive.",
   "q": "Why does a fish lay so many eggs?"
  },
  {
   "n": 65,
   "x": "There are still adult mosquitoes around. (Why numbers rise after the rain stops.)",
   "ok": "Eggs already laid need time to hatch and grow into adults.",
   "q": "The rain has stopped, yet mosquito numbers keep rising for weeks. Why?"
  },
  {
   "n": 66,
   "x": "Information is passed down from the parents.",
   "ok": "The young get their CHARACTERISTICS from their parents.",
   "q": "What do young animals get from their parents?"
  }
 ],
 "environment": [
  {
   "n": 67,
   "x": "It can camouflage. (And stops there.)",
   "ok": "Feature AND benefit: its colour blends in with the surroundings, SO it is not easily spotted by its predators.",
   "r": 1,
   "q": "A moth rests on bark the same colour as its wings. How does this help it to survive?"
  },
  {
   "n": 68,
   "x": "It can hide. / It can escape. / It is protected from predators.",
   "ok": "Say what the predator CANNOT do: it cannot swim there, it cannot fit through the opening.",
   "q": "An animal nests on a small island in the middle of a lake. How does this keep it safe?"
  },
  {
   "n": 69,
   "x": "Big ears lose heat.",
   "ok": "A larger surface area, so it loses MORE heat, or loses heat FASTER. The comparison earns the mark.",
   "q": "A desert fox has very large ears. How do they help it in the heat?"
  },
  {
   "n": 70,
   "x": "The bee gets honey. / It pollinates the pollen.",
   "ok": "The insect gets NECTAR. The flower is pollinated: its pollen is transferred to another flower.",
   "q": "A bee visits a flower. What does each one gain?"
  },
  {
   "n": 71,
   "x": "They migrated to the island.",
   "ok": "Seeds were dispersed there by wind, water or birds. Animals swam or flew there, or were brought by people.",
   "q": "A new island has plants and animals living on it. How did they get there?"
  },
  {
   "n": 72,
   "x": "Burning releases heat, which causes global warming.",
   "ok": "Burning releases CARBON DIOXIDE. Carbon dioxide TRAPS HEAT, so the temperature of the surroundings rises.",
   "q": "How does the burning of fuels lead to global warming?"
  },
  {
   "n": 73,
   "x": "The water is clear, so it is clean. / It still has dirt in it.",
   "ok": "Clear water may still hold germs or chemicals THAT CANNOT BE SEEN.",
   "q": "The water in a stream looks perfectly clear. Why is it still unsafe to drink?"
  },
  {
   "n": 74,
   "x": "A reason for a population change, with no increase or decrease stated.",
   "ok": "Say first whether the population INCREASES or DECREASES. Then give the reason.",
   "q": "You are asked what happens to the population of an animal. How must your answer begin?"
  }
 ],
 "_exp": [
  {
   "n": 75,
   "x": "Repeat the experiment. (And stops there.)",
   "ok": "Repeat the experiment AND FIND THE AVERAGE.",
   "r": 1,
   "q": "How do you make your results more reliable?"
  },
  {
   "n": 76,
   "x": "Keep the amount of water the same. / The size of... / The type of...",
   "ok": "Name something exact that can be measured: the VOLUME of water, the LENGTH of the string.",
   "q": "How exact must a variable that is kept the same be?"
  },
  {
   "n": 77,
   "x": "Read the temperature often to be more accurate.",
   "ok": "Because the temperature is changing quickly at the start.",
   "q": "Why is the temperature read more often at the start of an experiment?"
  },
  {
   "n": 78,
   "x": "Repeat the experiment. (When asked how to be more ACCURATE.)",
   "ok": "A change that fits the measurement: read at eye level, use a measuring cylinder, lower the object gently on a string.",
   "q": "How do you make a measurement more accurate?"
  },
  {
   "n": 79,
   "x": "Control: bare hands. / Do not apply anything.",
   "ok": "The SAME SET-UP, without the one thing being tested.",
   "q": "What is a control set-up?"
  },
  {
   "n": 80,
   "x": "Quoting the numbers as the conclusion.",
   "ok": "Say what the numbers SHOW, with the direction: liquid T kills more bacteria than soap.",
   "q": "How do you write a conclusion from a table of results?"
  }
 ],
 "skeleton": [
  {
   "n": 57,
   "q": "What does the skeletal system protect?",
   "x": "The skeleton protects the ribcage (or the skull).",
   "ok": "The skeleton protects the ORGANS: the heart, the lungs and the brain. The ribcage and the skull do the protecting; they are not what is protected."
  }
 ]
};
window.MIXUP_CHAPTERS = [{"id":"living","t":"Living & Non-Living","lv":"P3"},{"id":"materials","t":"Diversity of Materials","lv":"P3"},{"id":"lifecycles","t":"Life Cycles","lv":"P3"},{"id":"reproduction","t":"Reproduction in Plants","lv":"P5"},{"id":"matter","t":"Matter","lv":"P4"},{"id":"water","t":"The Water Cycle","lv":"P5"},{"id":"digestive","t":"Digestive System","lv":"P4"},{"id":"respcirc","t":"Circulatory and Respiratory Systems","lv":"P5"},{"id":"skeleton","t":"The Skeletal System","lv":"P4"},{"id":"plants","t":"Plant System","lv":"P4"},{"id":"electrical","t":"Electrical System","lv":"P5"},{"id":"magnets","t":"Magnets","lv":"P3"},{"id":"forces","t":"Forces","lv":"P6"},{"id":"environment","t":"Living Things & Their Environment","lv":"P6"},{"id":"light","t":"Light","lv":"P4"},{"id":"heat","t":"Heat","lv":"P4"},{"id":"photosynthesis","t":"Photosynthesis","lv":"P6"},{"id":"energy","t":"Energy Conversion","lv":"P6"},{"id":"_exp","t":"Experimental Skills","lv":"P6"}];
window.MIXUP_POSSUM = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 120 120\" aria-hidden=\"true\"><path d=\"M86 96c16 4 26-4 24-15-2-9-13-10-16-3-2 5 3 9 7 6\" fill=\"none\" stroke=\"#f3a6b4\" stroke-width=\"6\" stroke-linecap=\"round\"/><ellipse cx=\"60\" cy=\"92\" rx=\"31\" ry=\"23\" fill=\"#9aa3ad\"/><ellipse cx=\"60\" cy=\"97\" rx=\"19\" ry=\"15\" fill=\"#f4f1ea\"/><circle cx=\"33\" cy=\"33\" r=\"13\" fill=\"#3e444d\"/><circle cx=\"33\" cy=\"34\" r=\"7.5\" fill=\"#f3a6b4\"/><circle cx=\"87\" cy=\"33\" r=\"13\" fill=\"#3e444d\"/><circle cx=\"87\" cy=\"34\" r=\"7.5\" fill=\"#f3a6b4\"/><path d=\"M60 22c22 0 36 14 36 31 0 16-16 30-36 36C40 83 24 69 24 53c0-17 14-31 36-31z\" fill=\"#9aa3ad\"/><path d=\"M60 31c8-6 22-3 27 8 5 12-2 27-27 45C35 66 28 51 33 39c5-11 19-14 27-8z\" fill=\"#fbf9f4\"/><path d=\"M48 27c4 5 8 9 12 9s8-4 12-9c-7-3-17-3-24 0z\" fill=\"#9aa3ad\"/><ellipse cx=\"46\" cy=\"52\" rx=\"6.2\" ry=\"7\" fill=\"#1d2026\"/><circle cx=\"48\" cy=\"49.5\" r=\"2.2\" fill=\"#fff\"/><ellipse cx=\"74\" cy=\"52\" rx=\"6.2\" ry=\"7\" fill=\"#1d2026\"/><circle cx=\"76\" cy=\"49.5\" r=\"2.2\" fill=\"#fff\"/><ellipse cx=\"38\" cy=\"62\" rx=\"5\" ry=\"3\" fill=\"#f7c4cd\" opacity=\".8\"/><ellipse cx=\"82\" cy=\"62\" rx=\"5\" ry=\"3\" fill=\"#f7c4cd\" opacity=\".8\"/><g stroke=\"#b9bfc7\" stroke-width=\"1.4\" stroke-linecap=\"round\"><path d=\"M44 72l-15-3M45 76l-14 3M76 72l15-3M75 76l14 3\"/></g><ellipse cx=\"60\" cy=\"68\" rx=\"5.5\" ry=\"4.2\" fill=\"#ef7f95\"/><path d=\"M60 72v3m-6 0c2 3.5 4 4.5 6 4.5s4-1 6-4.5\" fill=\"none\" stroke=\"#3e444d\" stroke-width=\"1.8\" stroke-linecap=\"round\"/><g transform=\"rotate(-6 60 102)\"><rect x=\"40\" y=\"92\" width=\"40\" height=\"22\" rx=\"5\" fill=\"#fff\" stroke=\"#3e444d\" stroke-width=\"2\"/><path d=\"M47 98l7 7m0-7l-7 7\" stroke=\"#ff5d4d\" stroke-width=\"3\" stroke-linecap=\"round\"/><path d=\"M57.5 103h5m-2-2.5l2.5 2.5-2.5 2.5\" stroke=\"#3e444d\" stroke-width=\"1.8\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><path d=\"M66 103l3.5 3.5 6-7.5\" stroke=\"#1f8a4c\" stroke-width=\"3\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></g><ellipse cx=\"40\" cy=\"103\" rx=\"5.5\" ry=\"4.5\" fill=\"#f3a6b4\"/><ellipse cx=\"80\" cy=\"101\" rx=\"5.5\" ry=\"4.5\" fill=\"#f3a6b4\"/></svg>";
