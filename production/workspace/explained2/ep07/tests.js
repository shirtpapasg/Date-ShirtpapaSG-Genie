// tests.js: asset sheets for checking the drawings (page.html?test=name). Not used by the episode.
window.TESTS = {
  kitchen: (t) => kitchenView(t, { day: 1, tray: { into: 0, seal: 0 }, liz: 1, cliz: 1, boards: TF(KT.b1[0], KT.b1[1], KT.b1[2], dareBoard(0)) + TF(KT.b2[0], KT.b2[1], KT.b2[2], dareBoard(1)) }),
  night: (t) => kitchenView(t, { night: 1, day: 7, tray: { day: 7 }, liz: 1 }),
  trays: (t) => closeBg() + [1, 4, 6, 8, 10].map((d, i) => TF(200 + i * 380, 330, .52, tray({ day: d, drops: d > 9 ? 1 : 0 }))).join("") + TF(330, 780, .8, tray({ into: 0, seal: 0 })) + TF(960, 780, .8, tray({ into: .5, seal: 0 })) + TF(1590, 780, .8, tray({ into: 1, seal: .5, glow: 1 })),
  big: (t) => closeBg() + TF(960, 600, 1.45, tray({ day: 10, drops: 1 })),
  props: (t) => closeBg() + TF(250, 900, 1, doughBowl(0)) + TF(600, 900, 1, doughBowl(1)) + TF(880, 900, 1, yeastPacket()) + TF(1100, 900, 1, dayPill(t, 10)) + TF(1350, 900, 1, pedalBin(0)) + TF(1600, 900, 1, pedalBin(1)) + TF(1800, 900, 1.5, soapPump()),
  sink: (t) => sinkView(t, { water: 1 }),
  sink2: (t) => sinkView(t, { soap: .8, prints: 1 }),
  fungi: (t) => closeBg() + TF(330, 900, 1, bigMushroom()) + TF(850, 560, 1, mushroomUnder() + sporeDust(2.5, .6)) + TF(1300, 980, 1, picCardK(TF(0, 110, .7, punnet()), 300, 320, "a")) + TF(1640, 980, 1, picCardK(TF(0, 0, .5, tempehPic()), 300, 320, "b"))
    + TF(1300, 560, .6, sortTray(0, 620)) + TF(1640, 560, .6, sortTray(1)) + TF(1500, 250, 1, tummy()) + TF(1300, 120, 1, safeBadge("Never pick wild mushrooms!")),
  scopes: (t) => closeBg() + TF(250, 1000, 1, scopeOld()) + TF(560, 1000, 1, scopeMid()) + TF(980, 1000, 1, microscope()) + TF(1500, 330, 1, roundView(mouldMicro(t), 250, "a")) + TF(1560, 800, 1, roundView(bactField(t), 220, "b")) + TF(1180, 900, 1, yoghurtCup()) + TF(1300, 900, 1, yoghurtDrink()) + TF(300, 400, .8, bodyOutline(t)),
  table: (t) => bg("stage2") + TF(960, 1070, 1, clueTable(t, { lit: { A0: 1, B1: .5 }, badge: [1, 0, 0], rub: 1, write: 1, pics: [TF(0, 14, .22, nestFern()), TF(0, 40, .6, mushroom()), TF(6, 40, .34, kingfisher({}))], pk: [1, 1, 1] })),
  map: (t) => bg("stage2") + TF(960, 1010, 1.08, mapBoard(t, {}, { flash: [0, 0, 1, 0] })),
  canteen: (t) => canteenFar(t) + TF(960, 520, 1, sandwich()) + [0, 1, 2].map((i) => TF(300 + i * 430, 1060, .7, dare8(i))).join("") + TF(1650, 1040, 1, sandPile()),
};
