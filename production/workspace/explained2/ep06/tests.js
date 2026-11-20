// tests.js: asset sheets for checking the drawings (page.html?test=name). Not used by the episode.
window.TESTS = {
  bugs: (t) => `<rect width="1920" height="1080" fill="#EAF6E8"/>` + TF(330, 420, .55, antBig({ glow: [1, 0, 0, 0, 0, 0], parts: [0, 0, 0], feel: 0 })) + TF(330, 900, .5, antBig({ clean: 1, cleanAnt: 1, parts: [0, 1, 0] }))
    + TF(900, 330, .6, spiderWeb(330) + spiderBig({ glow: [0, 1, 0, 0, 0, 0, 0, 0] })) + TF(900, 800, .5, grasshopper({})) + TF(1400, 420, .6, mosquito({})) + TF(1400, 830, .6, butterfly({})) + TF(1750, 450, .9, pigeon({})) + TF(1780, 800, 1, moth(0)),
  beasts: (t) => `<rect width="1920" height="1080" fill="#EAF6E8"/>` + TF(600, 280, .55, monitor({ tongue: 1 })) + TF(600, 560, .55, monitor({ pose: "walk", ph: 1 })) + TF(600, 760, .55, monitor({ pose: "swim", t: 1 })) + TF(1400, 200, .7, snakeArt(t)) + TF(1400, 420, .6, turtleArt(t)) + TF(1400, 640, .55, crocArt(t))
    + TF(300, 860, .6, eggClutch(.8, t)) + TF(700, 1000, .6, thermo(.7)) + TF(900, 900, .6, skinDisc("scaly", 120)) + TF(1200, 900, .6, skinDisc("fur", 120)) + TF(1700, 1000, .5, macaque(t)),
  bats: (t) => `<rect width="1920" height="1080" fill="#6A5A9A"/>` + TF(250, 60, .9, hangBat({})) + TF(560, 60, .9, hangBat({ baby: 1 })) + TF(1100, 520, .7, fruitBat({ wings: 1, flap: 0 })) + TF(1650, 520, .6, fruitBat({ wings: 1, flap: 1.4 }))
    + TF(400, 1000, .55, catNursing(t)) + TF(1000, 1000, .7, catSit(t)) + TF(1450, 900, .6, seaTurtle({})) + TF(1750, 950, .4, seaTurtle({ dark: 1 })) + TF(1150, 760, .3, mouldBread()) + TF(1750, 740, .3, yeastLoaf()) + TF(800, 750, 1.6, houseLiz({ t })),
  lake: (t) => bg("lake"), dusk: (t) => bg("lakedusk"), pv: (t) => bg("palmvalley"),
};
