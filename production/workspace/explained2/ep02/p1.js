// p1.js: PART 1, "Our Plant Is Drooping on Day 31. Is It SAD?": water and air. Segments 1-13 of the approved script.
if (PART === 1) { (() => {
const BX = [110, 320, 530], BY = 1064, BH = 180;   // the buddies' discs, to the left of the rooms
const trio = (t, o = {}) => ["pip", "basil", "momo"].map((w, i) => buddy(w, BX[i], BY, BH, t, { aura: true, tag: false, ...(o[w] || {}) })).join("");
const boxDish = (o = {}) => dishIn({ s: .62, y: -22, ...o });
/* what stands in the hotel in Part 1. o: { droop, wet, shine, px (plant x), sway, dish: "box" | "jar" | "none", jar: null | {lid, lidY, lidX, lidR}, jarX, jarY, jarS, cover: null | {x, peek, tag}, boxLid, bites, extra } */
function items1(t, o = {}) { const dish = o.dish || "box"; let s = "";
  s += gPlant({ droop: o.droop === undefined ? .9 : o.droop, wet: o.wet || 0, shine: o.shine, sway: o.sway || 0 }, o.px === undefined ? HT.rx[0] : o.px);
  if (o.jar) s += TF(o.jarX === undefined ? HT.rx[1] : o.jarX, o.jarY === undefined ? HT.fy : o.jarY, .9 * (o.jarS || 1), jar(dish === "jar" ? dishIn({ s: .6, y: -6, bites: o.bites, id: "cj1" }) : "", o.jar));
  s += gBox(dish === "box" ? boxDish({ bites: o.bites, id: "cb1" }) : "", { lid: o.boxLid === undefined ? 1 : o.boxLid, lidY: o.boxLidY || 0 });
  if (o.cover) s += gCover(o.cover, o.cover.x === undefined ? HT.rx[2] : o.cover.x);
  return s + (o.extra || ""); }

// the thumbnail frame: Round 1, the drooping plant in Room 1, large, left of centre; Momo on the far left with big worried eyes; the bright window on the right
const THUMB1 = (t) => hotelView(t, { clock: 9, board: 0, rooms: [0, 0, 0], sign: 0, items: TF(900, 930, 1.9, roomFront(1)) + TF(900, 985 - 54 * 1.75, 1.75, potPlant({ droop: .9, wet: 0 })) })
  + buddy("momo", 280, 800, 330, t, { aura: true, tag: false, pose: "surprised", still: true }) + logo(t);
/* ============ 1 · the silent cold open: Day 31 on the window ledge ============ */
SC.cold = (t, s) => { if (location.search.includes("thumb")) return THUMB1(t); const tb = MK("coldBuild"), e = eio(t / (tb + .6)), cam = [lerp(1.3, 1, e), lerp(1090, 960, e), lerp(640, 540, e)];
  const [sx, sd] = slideX(t, tb + .1, .5, -400, 0, HT.fy), rdx = [0, 1, 2].map((i) => slideX(t, tb + 1.1 + i * .5, .45, 1500, 0, HT.fy));
  const st = { clock: 9, sign: t >= tb + .1 ? 1 : 0, signDx: sx, rooms: rdx.map((r, i) => t >= tb + 1.1 + i * .5 ? 1 : 0), roomDx: rdx.map((r) => r[0]), board: spring(t, tb + 2.9, .45),
    items: `<g transform="translate(${HT.sign} 0)">${sd}</g>` + rdx.map((r, i) => `<g transform="translate(${HT.rx[i]} 0)">${r[1]}</g>`).join("") + items1(t, { px: 870 }) };
  return hotelView(t, st, cam)
    + buddy("momo", BX[2], BY, BH, t, { aura: true, tag: false, in: 1.7, poses: [[1.7, "surprised"], [2.9, "oops"], [tb + 3.0, "sit"]] })
    + buddy("basil", BX[1], BY, BH, t, { aura: true, tag: false, in: tb - .1, poses: [[tb - .1, "cheer"], [tb + 1.6, "sit"]], nohop: true, jump: [[tb + .05, 26]] })
    + buddy("pip", BX[0], BY, BH, t, { aura: true, tag: false, in: tb + .9, poses: [[tb + .9, "pointing"], [tb + 2.8, "cheer"]], jump: [[tb + 1.15, 18], [tb + 1.65, 18], [tb + 2.15, 18]] })
    + dayCounter(t, 31) + OP(1 - ramp(t, tb - .4, .3), lowerPill(60, 990, "Toa Payoh, Singapore", "9.00 am")); };

/* ============ 2 · the callback and the dare ============ */
SC.callback = (t, s) => { const a = "a201", tS = W(a, "sad") - .2, e = eio((t - s.t0) / 1.0), cam = [lerp(1, 2.2, e), lerp(960, 1010, e), lerp(540, 715, e)];
  return hotelView(t, { items: items1(t, { px: 870, sway: .6 * Math.sin(t * .8) }) }, cam)
    + buddy("momo", 1560, 1066, 360, t, { aura: true, flip: true, in: s.t0 + .1, poses: [[s.t0, "thinking"], [LT("a202") - .12, "sit"]] })
    + thought(t, tS, LT("a202") - .15, 1380, 380, "sad?", { dir: 1 }) + say("a202", 1390, 560, t, { size: 52, tail: 80 })
    + dayCounter(t, 31, s.t0 + .2); };
SC.title = (t, s) => { const u = t - s.t0, a = (d) => { const k = clamp((u - d) / .16); return k <= 0 ? 0 : lerp(2.4, 1, eo(k)) + .05 * wob(u, d + .16, .4); }, L = "a203", k1 = a(.1), k2 = a(.5), k3 = a(W(L, "it") - s.t0 - .1);
  const ln = (y, txt, size, col, k, ls = 6) => k ? `<g transform="translate(960 ${y}) scale(${n2(k)})"><g transform="translate(0 8)" opacity=".85">${T(0, 0, txt, size, P.ink, { ls })}</g>${T(0, 0, txt, size, col, { ls })}</g>` : "";
  return hotelView(t, { items: items1(t, { px: 870 }) }, [2.2 - .12 * clamp(u / 5), 1010, 715]) + `<rect width="1920" height="1080" fill="${P.night}" opacity="${n2(.66 * clamp(u / .2))}"/>`
    + ln(260, "A DROOPING PLANT", 150, "#fff", k1, 4) + ln(440, "ISN’T SAD.", 176, "#fff", k2) + ln(650, "WHAT DOES IT NEED?", 138, P.sun, k3, 4)
    + (t >= W(L, "did") - .1 ? TF(960, 800, spring(t, W(L, "did") - .1, .45), tpill(0, 0, "Did you lock in your answer? Hold on to it!", 40, P.ink, "#fff", { w: 600 })) : "") + OP(clamp((u - .2) / .3), logo(t)); };

/* ============ 3 · the Buddy Hotel ============ */
SC.hotel = (t, s) => { const a = "a301", b = "a302", tR = W(a, "three"), tG = W(a, "three", 1), tE = W(a, "everything"), tSun = W(a, "sunset") - .1;
  const tP = W(b, "plant") - .45, tMw = W(b, "mealworm") - .1, tMy = W(b, "mystery") - .5;
  const [px, pd, psq] = slideX(t, tP, .5, 870, HT.rx[0], HT.fy), [cx, cd] = slideX(t, tMy, .8, 2150, HT.rx[2], HT.fy);
  const rooms = [0, 1, 2].map((i) => 1 + .07 * pulse(t, tR + i * .14, .03, .3) + .05 * pulse(t, tG + i * .14, .03, .3));
  const flash = [0, 1, 2].map((i) => pulse(t, tE + i * .3, .04, .5));
  const glow = pulse(t, tMw, .1, 1.0);
  const st = { clock: 9, rooms, bopt: { flash }, wall: t >= tSun ? TF(430, 420, spring(t, tSun, .4) * (1 - ramp(t, LT(b) - .2, .3)), tpill(0, 0, "by sunset", 34, P.ink, P.sun, { w: 700 })) : "",
    items: pd + cd + items1(t, { px, cover: t >= tMy ? { x: cx } : null })
      + OP(glow, `<ellipse cx="${HT.box}" cy="${HT.fy - 70}" rx="150" ry="110" fill="none" stroke="${P.sun}" stroke-width="8"/>`) };
  return hotelView(t, st, [1, 960, 540]) + trio(t, { basil: { poses: [[tP - .1, "cheer"], [tP + 1.0, "sit"]], nohop: true, jump: [[tP, 22]] }, pip: { poses: [[tMy - .1, "pointing"], [tMy + 1.6, "sit"]], jump: [[tMy, 22]] }, momo: { poses: [[tSun, "surprised"], [LT(b) - .1, "sit"]] } })
    + (t >= tR ? OP(1 - ramp(t, tG - .15, .2), TF(1150, 420, spring(t, tR, .4), tpill(0, 0, "Three rooms", 44, "#fff", P.ink, { w: 700 }))) : "") + (t >= tG ? OP(1 - ramp(t, tE - .15, .2), TF(1150, 420, spring(t, tG, .4), tpill(0, 0, "Three guests", 44, "#fff", P.ink, { w: 700 }))) : "")
    + dayCounter(t, 31) + HUD(t); };
SC.game = (t, s) => gameScene(t, s, "a303", true);
SC.goals = (t, s) => goalsScene(t, s, "a401", [["What a drooping plant needs", TF(0, 30, .5, potPlant({ droop: .9, wet: 0 }))], ["Why living things need water", TF(0, 0, 1.5, `<circle r="42" fill="${P.paper}"/>` + needIcon("water", "#1F5FD0", "#BFE0FF"))], ["Why living things need air", TF(0, 0, 1.5, `<circle r="42" fill="${P.paper}"/>` + needIcon("air", "#4E93B4", "#EAF6FF"))]], [["what"], ["why"], ["why", 1]]);

/* ============ 5 · Round 1: the drooping plant ============ */
SC.r1 = (t, s) => { const L = "a501", tq = W(L, "what") - .25;
  if (t < tq) { const e = eio((t - s.t0) / .8), cam = [lerp(1.5, 2.25, e), 800, lerp(640, 705, e)], tD = W(L, "the") - .1;
    return hotelView(t, { items: items1(t, { cover: {}, sway: .5 * Math.sin(t) }) }, cam) + OP(ramp(t, W(L, "room") - .1, .25), TF(1420, 300, 1, tpill(0, 0, "Room 1", 56, P.ink, "#fff", { w: 700 }))) + OP(ramp(t, tD, .25), TF(1420, 410, 1, tpill(0, 0, "The plant is drooping.", 44, "#fff", P.ink, { w: 700 })))
      + dayCounter(t, 31) + HUD(t); }
  return lock3(t, { s: { t0: tq }, q: "What does the plant need?", tq, tc: [W(L, "one", 2), W(L, "two"), W(L, "three")], ring0: MK("ring0_1"), dur: 5, lock: "a502",
    obj: () => TF(430, 566, 1.12, potPlant({ droop: .9, wet: 0 })),
    picks: [{ who: "pip", id: "a504", word: "1 WATER", kind: "blue" }, { who: "basil", id: "a503", word: "2 FOOD", kind: "orange", x: true }, { who: "momo", id: "a505", word: "1 WATER", kind: "blue" }],
    props: { basil: [LT("a503") + .9, TF(0, 0, 1.1, biscuit())], pip: [W("a504", "soil") - .1, `<g filter="url(#dropS)"><circle r="56" fill="${P.paper}"/></g><ellipse cx="0" cy="6" rx="40" ry="16" fill="#D8BE96" stroke="#B0946A" stroke-width="4"/><path d="M-22 2 l12 6 l10 -5 M8 -2 l10 7" stroke="#A88A5E" stroke-width="3" fill="none"/>${T(0, -22, "dry", 26, P.ink)}`], momo: [W("a505", "nobody") - .1, TF(20, 50, .8, wateringCan(0, 0))] } }); };

/* ============ 6 · we test it ============ */
SC.test = (t, s) => { const L = "a601", tW = W(L, "pip", 1) - .2, tWait = W(L, "now") - .2, tH = W(L, "this") - .1, tSh = W(L, "so") - .1;
  const e1 = eio((t - tWait) / .9), e2 = ei((t - (s.t1 - .7)) / .7), cam = [lerp(lerp(2.0, 1.3, e1), 5.5, e2), lerp(lerp(760, 650, e1), 775, e2), lerp(lerp(700, 560, e1), 770, e2)];
  const pour = ss(tW + .35, tW + .7, t) * (1 - ss(tWait - .5, tWait - .1, t)), tilt = 34 * ss(tW, tW + .4, t) * (1 - ss(tWait - .3, tWait + .2, t)), wet = ss(tW + .7, tWait - .2, t), clk = 9 + 1.2 * clamp((t - tH) / (s.t1 - tH));
  const canX = 960, can = t >= tW - .5 ? TF(canX + 420 * (1 - eo((t - tW + .5) / .4)), HT.fy - 150 * ss(tW - .1, tW + .3, t) * (1 - ss(tWait - .3, tWait + .2, t)), .8, wateringCan(tilt, pour, t)) + (t < tWait + .3 ? pawDown(canX + 60 + 420 * (1 - eo((t - tW + .5) / .4)), HT.fy - 230 * ss(tW - .1, tW + .3, t) * (1 - ss(tWait - .3, tWait + .2, t)) - 60, 1, .55) : "") : "";
  return hotelView(t, { clock: clk, items: items1(t, { wet: wet > .5 ? 1 : 0, shine: wet, cover: {} }) + can }, cam)
    + buddy("pip", 250, 1062, 300, t, { aura: true, in: s.t0 + .1, poses: [[s.t0, "thinking"], [tW - .3, "pointing"], [tWait, "sit"]], out: s.t1 - .8 })
    + (t >= tH ? OP(1 - e2, TF(camX(cam, 430), camY(cam, 270) + 150, spring(t, tH, .4), tpill(0, 0, "a few hours", 36, P.ink, "#fff", { w: 700 }))) : "") + OP(1 - e2, speeded(t, tH, s.t1 + 1, 1700, 1010))
    + OP(1 - e2, dayCounter(t, 31) + HUD(t)) + (e2 > 0 ? `<rect width="1920" height="1080" fill="#2A1A10" opacity="${n2(ss(.5, 1, e2))}"/>` : ""); };

/* ============ 7 · the reveal: it was wilting ============ */
SC.reveal = (t, s) => { const L = "a701", u = (t - s.t0) / 1.2, tUp = W(L, "look") - .2, tAns = W(L, "the", 1) - .1, tW = W(L, "water") - .1;
  const droop = lerp(.5, 0, ss(s.t0 + .3, tUp + .9, t)), clk = lerp(12.6, 13, ss(s.t0, s.t0 + 1.4, t)), z = lerp(3.4, 1.55, eo(u)), cam = [z + .04 * (t - s.t0) / 8, lerp(775, 800, eo(u)), lerp(770, 650, eo(u))];
  const gh = ss(tUp + .6, tUp + 1.2, t) * .5, card = t >= tAns ? TF(1010, HT.fy + 26, .5 * spring(t, tAns, .45), TF(0, -200, 1, needCard(0, { lit: pulse(t, tW, .1, 2.2) * .9 + .25 }))) : "";
  return hotelView(t, { clock: clk, items: (gh > 0 ? `<g opacity="${n2(gh)}" filter="url(#ghostF)">${gPlant({ droop: .9, soil: false })}</g>` : "") + items1(t, { droop, wet: 1, shine: .6, cover: {}, sway: 1.5 * wob(t, tUp + .9, 1.2) }) + card }, cam)
    + (u < 1 ? `<circle cx="960" cy="540" r="1200" fill="none" stroke="#2A1A10" stroke-width="${n2(1700 * (1 - eo(u)))}"/>` : "")
    + OP(ramp(t, s.t0 + .5, .3) * (1 - ramp(t, tAns, .3)), lowerPill(60, 960, "A few hours", "later")) + buddy("pip", 1650, 1062, 280, t, { aura: true, flip: true, in: tUp + .3, poses: [[tUp + .3, "cheer"], [tUp + 2.4, "sit"]] })
    + dayCounter(t, 31) + HUD(t); };
SC.mark1 = (t, s) => markScene(t, s, { id: "a703", sayId: "a702", who: "momo", n: "1 of 2", text: "It is wilting. It does not have enough water.", keys: ["wilting.", "water."], size: 78, y: 230,
  poses: [[LE("a703") + .2, "cheer"]] });
SC.notsad = (t, s) => { const a = "a704", tNot = W(a, "not") - .1, tWl = W(a, "wilting") - .1, tk = WE(a, "wilting") + .1, cam = [1.7, 900, 650];
  return hotelView(t, { clock: 13, ticks: { "1w": tk }, items: items1(t, { droop: 0, wet: 1, cover: {} }) }, cam)
    + TF(1560, 1040, .95, boardEasel(t, { "1w": tk }, { blink: t < tk ? "1w" : null }))
    + buddy("momo", 250, 1062, 320, t, { aura: true, in: s.t0 + .1, poses: [[s.t0, "thinking"], [tNot, "surprised"], [LT("a705") - .12, "sit"], [LE("a705") + .1, "cheer"]] })
    + thought(t, s.t0 + .3, tNot + .25, 360, 500, "sad?", { dir: -1 }) + (t >= tNot + .1 && t < tNot + .5 ? OP(1 - (t - tNot - .1) / .4, `<g stroke="${P.momo}" stroke-width="8" stroke-linecap="round">${[0, 1, 2, 3, 4, 5, 6, 7].map((i) => { const an = i * Math.PI / 4, r = 70 + 240 * (t - tNot - .1); return `<path d="M${n2(360 + Math.cos(an) * r)} ${n2(500 + Math.sin(an) * r * .6)} l${n2(Math.cos(an) * 26)} ${n2(Math.sin(an) * 16)}"/>`; }).join("")}</g>`) : "")
    + thought(t, tWl, LT("a705") - .15, 380, 500, "wilting", { dir: -1 }) + say("a705", 420, 560, t, { size: 50, tail: -120 })
    + dayCounter(t, 31) + HUD(t); };
SC.r1score = (t, s) => { const tc = WE("a706", "finger") + .2, tb = tc + .6, tOne = W("a706", "one", 1) - .1, tCr = LT("a707") - .5;
  return bg("stage") + `<g transform="translate(960 ${n2(lerp(-200, 230, eo((t - s.t0) / .35)))})">${scoreboard(t, 0, 0, 1.5)}</g>` + coin(t, tc, 700, 400, "+1", "if you showed one finger") + coin(t, tb, 1230, 400, "+1", "Pip and Momo")
    + TF(330, 780, spring(t, tOne, .4) * 1.5, `<g filter="url(#dropS)">${countHand(1)}</g>`) + (t > tOne ? youPill(330, 540, 1.2) : "")
    + buddy("basil", 960, 1060, 380, t, { aura: true, poses: [[s.t0, "oops"], [LT("a707") - .12, "sit"], [LE("a707") + .1, "cheer"]] })
    + (t >= tCr ? TF(1190, 880, spring(t, tCr, .4) * 1.2, `<mask id="bisM"><rect x="-60" y="-60" width="120" height="120" fill="#fff"/>${t >= LT("a707") + .2 ? `<circle cx="34" cy="-30" r="26" fill="#000"/>` : ""}${t >= LE("a707") ? `<circle cx="40" cy="20" r="24" fill="#000"/>` : ""}</mask><g mask="url(#bisM)">${biscuit()}</g>`) : "")
    + buddy("momo", 1600, 1050, 300, t, { aura: true, flip: true, poses: [[s.t0, "cheer"], [s.t0 + 2, "sit"]] })
    + say("a707", 960, 540, t, { size: 46 }) + logo(t); };
SCORE.push([WE("a706", "finger") + .2, 1, 0], [WE("a706", "finger") + .8, 1, 1]);

/* ============ 8 · who else needs water? Picture cards standing in a row ============ */
const kidDrink = () => kid({ armR: 150, armL: 20, mouth: "o", eyes: "shut", exR: `<g transform="translate(0 92) rotate(170)">${bottle()}</g>` });
SC.who = (t, s) => { const a = "a801", b = "a802", tp = [W(b, "plant") - .15, W(b, "mealworm") - .15, W(b, "you") - .25];
  const cards = [[TF(0, -150, .82, potPlant({ droop: 0, wet: 1 })), "the plant"], [TF(-10, -150, 1.25, wormDish({ bites: 2, wx: 20, wl: 84, id: "cw8" })) + `<rect x="-200" y="-150" width="400" height="60" fill="#F4E3C3"/>` + TF(-10, -150, 1.25, wormDish({ bites: 2, wx: 20, wl: 84, id: "cw9" })), "the mealworm"], [`<rect x="-200" y="-150" width="400" height="60" fill="#8FD49A"/>` + TF(0, -128, .92, kidDrink()), "you!"]];
  let out = bg("daystage") + bookCaption(t, a, "All living things such as plants and animals need water.", 330, { size: 54 });
  cards.forEach(([inner, lab], i) => { const k = spring(t, tp[i], .5); if (k < .02) return; out += TF(400 + i * 560, 990, k * 1.2 * (1 + .04 * pulse(t, tp[i] + .1, .05, .6)), picCard(inner, lab, { id: "pw" + i, rot: [-2, 1, -1.5][i], size: 44 })); });
  out += (t >= tp[2] ? TF(1800, 480, spring(t, tp[2] + .2, .4), `<g filter="url(#dropS)"><circle r="56" fill="${P.paper}"/></g>` + TF(0, 0, 1.5, needIcon("water", "#1F5FD0", "#8CC8FF"))) : "");
  return out + HUD(t); };
SC.why = (t, s) => { const L = "a803", tp = [W(L, "we") - .15, W(L, "we", 1) - .15, W(L, "we", 2) - .15], ends = [W(L, "we", 1) - .2, W(L, "we", 2) - .2, 1e9];
  const sent = ["We need water to digest food.", "We need water to carry out our daily activities.", "We need water to remove waste from our body."], offs = [0, 6, 15];
  const plate = `<ellipse cx="0" cy="0" rx="70" ry="16" fill="#fff" stroke="#B9C6DE" stroke-width="4"/><ellipse cx="-8" cy="-10" rx="44" ry="16" fill="#FFF6DC" stroke="#E0CF9A" stroke-width="3"/><path d="M4 -22 q30 -6 44 8 q-22 10 -46 4z" fill="#E9B878" stroke="#B4762E" stroke-width="3"/><ellipse cx="-44" cy="-4" rx="12" ry="5" fill="#57B77A"/>`;
  const cards = [[`<rect x="-200" y="-190" width="400" height="120" fill="#F6CFA0"/><rect x="-200" y="-196" width="400" height="14" fill="#C99A62"/>` + TF(-40, -100, .86, kid({ armR: 70, armL: 30, mouth: "open", hair: "tails", exR: `<rect x="-5" y="80" width="10" height="46" rx="4" fill="#AAB3CC"/><ellipse cx="0" cy="130" rx="11" ry="8" fill="#C9D2E8"/>` })) + `<rect x="-200" y="-190" width="400" height="110" fill="#E6C39A"/><rect x="-200" y="-196" width="400" height="12" fill="#B98A5A"/>` + TF(60, -206, 1, plate), "digest food"],
    [`<rect x="-200" y="-170" width="400" height="90" fill="#7BCB8C"/><path d="M-200 -170 H200" stroke="#fff" stroke-width="5" opacity=".7"/>` + TF(10, -118, .88, kid({ armR: 70, armL: -50, legL: 34, legR: -40, lean: 8, mouth: "open", hair: "tails", sweat: 1 })), "daily activities"],
    [`<rect x="-200" y="-420" width="400" height="360" fill="#DCEBFF"/><rect x="-104" y="-388" width="208" height="300" rx="10" fill="#7FB4D6" stroke="#4E7FA8" stroke-width="6"/><circle cx="74" cy="-236" r="10" fill="#FFE27A" stroke="#C98200" stroke-width="3"/><g transform="translate(0 -306)"><rect x="-58" y="-40" width="116" height="80" rx="12" fill="#fff" stroke="#4E7FA8" stroke-width="4"/><circle cx="-24" cy="-16" r="10" fill="${P.ink}"/><path d="M-36 30 V2 Q-36 -4 -30 -4 H-18 Q-12 -4 -12 2 V30z" fill="${P.ink}"/><circle cx="24" cy="-16" r="10" fill="${P.ink}"/><path d="M10 26 L18 -4 H30 L38 26z" fill="${P.ink}"/><path d="M0 -30 V30" stroke="#4E7FA8" stroke-width="3"/></g>`, "remove waste"]];
  let out = bg("daystage");
  sent.forEach((sn, i) => { out += bookCaption(t, L, sn, 330, { size: 54, off: offs[i], t1: ends[i] }); });
  cards.forEach(([inner, lab], i) => { const k = spring(t, tp[i], .5); if (k < .02) return; out += TF(400 + i * 560, 990, k * 1.2 * (1 + .04 * pulse(t, tp[i] + .1, .05, .6)), picCard(inner, lab, { id: "py" + i, rot: [1.5, -1, 2][i], size: 42 })); });
  return out + HUD(t); };

/* ============ 9 · HOLD ON! Room 2 is not ready ============ */
const LIZ1 = [330, 478];
function room2View(t, cam, o = {}) { return hotelView(t, { clock: 13.2, ticks: { "1w": 0, ...(o.ticks || {}) }, wall: o.liz ? TF(LIZ1[0] + (o.lizDx || 0), LIZ1[1], .85, `<g transform="rotate(-24)">${cicak()}</g>`) : "", items: items1(t, { droop: 0, wet: 1, cover: {}, ...o }) + (o.more || "") }, cam); }
SC.room2 = (t, s) => { const a = "a901", h = "a902", c = "a903", r0 = MK("ring0_2"), bell = r0 + 5, rs = ringState(t, r0, 5), shut = pulse(t, bell, .01, .6), tIn = s.t0 + .15, tH = LT(h) - .2;
  const e = eio((t - tH) / .8), cam = [lerp(1.3, 2.25, e), lerp(770, 1165, e), lerp(600, 745, e)];
  const u = clamp((t - tIn) / .7), jy = lerp(HT.fy + 330, HT.fy, eio(u)), js = lerp(1.35, 1, eio(u)), lz0 = LT(a) + .2, lzk = t < lz0 ? null : (t < lz0 + .5 ? lerp(-420, 0, eo((t - lz0) / .5)) : t < lz0 + 3.4 ? 0 : lerp(0, -420, ei((t - lz0 - 3.4) / .5)));
  const tNo = W(c, "lid") - .2, tAir = W(c, "air") - .1, tBx = W("a904", "holes") - .2, tOne = WE(c, "crossed") + .2;
  const J = [HT.rx[1], HT.fy - 232], Bx = [HT.box, HT.fy - 138];
  let sw = ""; if (t >= tAir) for (let i = 0; i < 3; i++) { const uu = ((t * .7 + i / 3) % 1); sw += `<g transform="translate(${n2(J[0] - 60 + i * 60)} ${n2(J[1] - 120 + 100 * Math.min(uu, .8) - (uu > .8 ? (uu - .8) * 200 : 0))})" opacity="${n2(Math.sin(Math.PI * uu) * ramp(t, tAir, .3))}" fill="none" stroke="#fff" stroke-width="3.5" stroke-linecap="round"><path d="M-14 0 H4 a5 5 0 1 0 -5 -5"/><path d="M-10 8 H8"/></g>`; }
  if (t >= tBx) for (let i = 0; i < 3; i++) { const uu = ((t * .7 + i / 3) % 1); sw += `<g transform="translate(${n2(Bx[0] - 60 + i * 50)} ${n2(Bx[1] - 110 + 150 * uu)})" opacity="${n2(Math.sin(Math.PI * uu) * ramp(t, tBx, .3))}" fill="none" stroke="#fff" stroke-width="3.5" stroke-linecap="round"><path d="M-14 0 H4 a5 5 0 1 0 -5 -5"/><path d="M-10 8 H8"/></g>`; }
  let out = room2View(t, cam, { jar: { lid: "tight" }, jarY: jy, jarS: js, liz: lzk !== null, lizDx: lzk || 0, more: dust(HT.rx[1], HT.fy, (t - tIn - .7) / .4) + sw });
  const lab = (t0, txt, wx, wy, lx, ly) => t < t0 ? "" : OP(ramp(t, t0, .2), `<path d="M${lx} ${ly} L${n2(camX(cam, wx))} ${n2(camY(cam, wy))}" stroke="#fff" stroke-width="5" stroke-linecap="round"/><circle cx="${n2(camX(cam, wx))}" cy="${n2(camY(cam, wy))}" r="8" fill="#fff"/>`) + TF(lx, ly, spring(t, t0, .4), tpill(0, 0, txt, 44, "#fff", P.ink, { w: 700 }));
  out += lab(tNo, "no holes", J[0] - 30, J[1], 560, 250) + lab(tBx, "air holes", Bx[0] + 30, Bx[1] - 6, 1500, 300);
  const rk = spring(t, r0 - .5, .4) * (1 - ss(bell + .9, bell + 1.2, t));
  if (rk > .02) out += TF(1700, 560, rk, `<g transform="scale(.56)">${ringTimer(0, 0, t < bell ? rs.frac : 0, t < bell ? rs.secs : 0, t, { tick: rs.tick, shut, inner: `<g transform="scale(.82) translate(0 -10)">${crossedArms()}</g>` })}</g>` + tpill(0, -170, "HOLD ON!", 40, P.sun, P.ink, { w: 700, ls: 3 }));
  const tCA = W(h, "cross") - .1, ca = spring(t, tCA, .45) * (1 - ss(r0 + .8, r0 + 1.2, t));
  if (ca > .02) out += TF(960, 330, ca * 1.2, `<g filter="url(#drop)">${crossedArms()}</g>`) + TF(960, 490, ca, youPill(0, 0, 1.3));
  out += stamp(t, WE(h, "on") - .25, 960, 600, "HOLD ON!") + stamp(t, bell + .05, 960, 480, "TIME!") + coin(t, tOne, 1660, 300, "+1", "if you crossed your arms") + bellIcon(t, r0);
  out += buddy("pip", 190, 1066, 300, t, { aura: true, in: s.t0 + .1, poses: [[s.t0, "pointing"], [LT(a) - .12, "sit"], [LE(a) + .1, "cheer"], [tH, "sit"], [r0, "thinking"], [tNo, "surprised"], [tBx, "oops"], [LT("a905") - .12, "sit"]], nohop: true })
    + (t >= tBx - .5 ? buddy("basil", 1740, 1066, 280, t, { aura: true, flip: true, in: tBx - .5, poses: [[tBx - .5, "surprised"], [LT("a904") - .12, "sit"], [LE("a904") + .1, "cheer"]] }) : "")
    + say(a, 420, 640, t, { size: 42, maxW: 560, tail: -130 }) + say("a904", 1500, 640, t, { size: 42, maxW: 560, tail: 140 }) + say("a905", 420, 640, t, { size: 42, maxW: 560, tail: -130 });
  return out + dayCounter(t, 31) + HUD(t); };
SCORE.push([WE("a903", "crossed") + .2, 2, 1]);
const CAM2 = [2.25, 1165, 745];
SC.newlid = (t, s) => { const L = "a906", t0 = s.t0 + .1, up = ss(t0 + .3, t0 + .8, t), sw = t >= t0 + 1.2, dn = ss(t0 + 1.5, t0 + 2.0, t), ly = sw ? -170 * (1 - dn) : -170 * up, lx = sw ? 0 : 260 * ss(t0 + .8, t0 + 1.2, t), tA = W(L, "air") - .2;
  const J = [HT.rx[1], HT.fy - 232]; let swl = ""; if (t >= tA) for (let i = 0; i < 4; i++) swl += airSwirl(t, J[0] - 130 + i * 30, J[1] - 150 + i * 14, 110, 200, i / 4, "#fff", ramp(t, tA, .3));
  const hand = t > t0 && t < t0 + 2.5 ? TF(J[0] + lx * .9, J[1] + ly * .9 - 14 - 300 * (1 - ss(t0, t0 + .3, t)) - 400 * ss(t0 + 2.05, t0 + 2.5, t), .62, adultArm()) : "";
  return room2View(t, CAM2, { jar: { lid: sw ? "holes" : "tight", lidY: ly, lidX: sw ? 0 : lx }, more: hand + swl + dust(J[0], J[1] + 6, (t - t0 - 2.0) / .3, .5) })
    + buddy("pip", 190, 1066, 300, t, { aura: true, poses: [[s.t0, "sit"], [t0 + 2.1, "cheer"]] }) + finePrint(t, t0 + .4, "An adult makes the holes.", 1500, 1030) + dayCounter(t, 31) + HUD(t); };
SC.mark2 = (t, s) => markScene(t, s, { id: "a908", sayId: "a907", who: "basil", n: "2 of 2", text: "Living things breathe in air that contains oxygen.", keys: ["air", "oxygen."], size: 74, y: 220,
  poses: [[LE("a908") + .2, "cheer"]] });
SC.movein = (t, s) => { const L = "a910", t0 = s.t0 + .1, tA = W(L, "air") - .1, tF = W(L, "oats") - .1, tWt = W(L, "carrot") - .1, J = [HT.rx[1], HT.fy], Bx = [HT.box, HT.fy];
  // the box lid rests against the box; one hand holds the jar's lid up, the other carries the dish across; then the lid goes on
  const a = eio((t - t0 - .3) / .5), b = eio((t - t0 - .8) / .7), c = eio((t - t0 - 1.5) / .5), dx = lerp(Bx[0], J[0], b), dy = HT.fy - 12 - 250 * a * (1 - c) - 6 * c, inJar = t >= t0 + 2.0;
  const lidUp = ss(t0, t0 + .4, t) * (1 - ss(t0 + 2.1, t0 + 2.6, t)), carried = !inJar ? TF(dx, t < t0 + .3 ? HT.fy - 12 : dy, .9 * .6, wormDish({ bites: 1, id: "cmv" })) : "";
  const hands = (t > t0 && t < t0 + 2.3 ? TF(dx + 4, (t < t0 + .3 ? HT.fy - 12 - 300 * (1 - ss(t0, t0 + .3, t)) : dy) - 30 - 500 * ss(t0 + 2.0, t0 + 2.3, t), .6, adultArm()) : "") + (lidUp > .02 ? TF(J[0] - 150, HT.fy - 232 - 170 * lidUp - 16, .6, adultArm("#5B7BD6", "#3A56A8")) : "");
  const tk = { "1w": 0, "2a": tA, "2f": tF, "2w": tWt };
  const view = hotelView(t, { clock: 13.3, ticks: tk, items: gPlant({ droop: 0, wet: 1 }) + (inJar ? "" : `<g>${TF(J[0], J[1], .9, jar("", { lid: null }))}</g>`) + (inJar ? gJar(dishIn({ s: .6, y: -6, bites: t > tWt + .6 ? 2 : 1, id: "cj2" }), { lid: "holes", lidY: -170 * lidUp, lidX: -150 * lidUp }) : TF(J[0] - 150 * lidUp, HT.fy - 170 * lidUp, .9, jarLid("holes")))
      + (inJar ? "" : carried) + gBox("", { lid: 0 }) + TF(Bx[0] + 10, HT.fy + 40, .8, `<ellipse cx="0" cy="4" rx="150" ry="10" fill="${P.ink}" opacity=".2" filter="url(#b4)"/><rect x="-142" y="-26" width="284" height="30" rx="12" fill="#3FD0C3" stroke="#188A80" stroke-width="4"/><rect x="-134" y="-22" width="268" height="8" rx="4" fill="#fff" opacity=".3"/>${[0, 1, 2, 3, 4, 5].map((i) => `<ellipse cx="${-100 + i * 40}" cy="-12" rx="8" ry="4.5" fill="${P.night}" opacity=".75"/>`).join("")}`) + gCover({}) + hands }, CAM2);
  const ic = (t0_, i, x) => t < t0_ ? "" : TF(x, 250, spring(t, t0_, .4), needChip(i, 44, { num: false }));
  return view + TF(1640, 1046, .8, boardEasel(t, tk, {})) + ic(tA, 2, 420) + ic(tF, 1, 640) + ic(tWt, 0, 880)
    + finePrint(t, t0 + .3, "An adult helps. Wash your hands.", 560, 1030) + dayCounter(t, 31) + HUD(t); };
SC.plantair = (t, s) => { const a = "a911", b = "a912", tk = WE(b, "air") - .1, e = eio((t - s.t0) / 1.0), cam = [2.0, lerp(1165, 860, e), lerp(745, 660, e)], T1 = { "1w": 0, "2a": 0, "2f": 0, "2w": 0, "1a": tk };
  let sw = ""; for (let i = 0; i < 5; i++) sw += airSwirl(t, 600 + i * 30, 560 + i * 50, 380, -30 + i * 12, i / 5, "#fff", .9 * ramp(t, s.t0 + .6, .5));
  return hotelView(t, { clock: 13.4, ticks: T1, items: items1(t, { droop: 0, wet: 1, dish: "jar", jar: { lid: "holes" }, bites: 2, cover: {}, sway: 1.2 * Math.sin(t * 1.3) }) + sw }, cam)
    + TF(1600, 1046, .86, boardEasel(t, T1, { blink: t < tk ? "1a" : null })) + bookCaption(t, a, "All living things need air to live.", 150, { size: 54, x: 800 })
    + (t >= LT(b) ? TF(600, 300, spring(t, LT(b), .4), tpill(0, 0, "Even plants need air.", 46, P.ink, "#fff", { w: 700 })) : "") + dayCounter(t, 31) + HUD(t); };
const T5 = { "1w": 0, "1a": 0, "2w": 0, "2f": 0, "2a": 0 };

/* ============ 10 · the chant ============ */
SC.chant = (t, s) => chantScene(t, s, "c1003", { ticks: T5, head: OP(ramp(t, LT("a1001") - .1, .25) * (1 - ramp(t, LT("u1002") - .3, .25)), TF(1020, 170, 1, tpill(0, 0, "One guest. Three needs.", 60, P.sun, P.ink, { w: 700 }))) });

/* ============ 11 · the score hand, the lizard ============ */
SC.final = (t, s) => finalScene(t, s, "a1101", 1, [[s.t0, null, 1], [W("a1101", "two") - .1, "Two fingers? You beat the Buddies!", 2]]);
SC.liz = (t, s) => { const L = "a1102", tr = LT("a901") + 1.5; return lizReveal(t, s, L, room2View(tr, [1.3, 770, 600], { jar: { lid: "tight" }, liz: true }), camX([1.3, 770, 600], LIZ1[0]), camY([1.3, 770, 600], LIZ1[1]), W(L, "does") - .1, "Does a lizard need water?"); };

/* ============ 12 · the cliffhanger: Room 3 ============ */
SC.cliff = (t, s) => { const a = "a1201", m = "a1202", e = eio((t - s.t0) / 1.2), cam = [1.55, 1480, 640], mix = ss(s.t0, s.t0 + 2, t);
  return hotelView(t, { mode: "am", mode2: "pm", mix, clock: 14, ticks: T5, bopt: { flash: [0, 0, 0] }, items: items1(t, { droop: 0, wet: 1, dish: "jar", jar: { lid: "holes" }, bites: 2, cover: {} }) }, cam)
    + (t >= LT(a) ? TF(1500, 250, spring(t, LT(a), .4), tpill(0, 0, "Five ticks.", 50, P.ink, "#fff", { w: 700 })) : "") + (t >= W(a, "four") - .1 ? TF(1500, 350, spring(t, W(a, "four") - .1, .4), tpill(0, 0, "Four to go.", 50, P.sun, P.ink, { w: 700 })) : "")
    + buddy("momo", 260, 1062, 340, t, { aura: true, in: s.t0 + .2, poses: [[s.t0, "thinking"], [LT(m) - .12, "sit"], [LE(m) + .1, "thinking"]] }) + say(m, 520, 500, t, { size: 46, maxW: 640, tail: -180 })
    + lowerPill(60, 300, "2 o’clock") + dayCounter(t, 31) + HUD(t); };
SC.room3 = (t, s) => { const L = "a1203", e = eio((t - s.t0) / 1.0), cam = [lerp(1.55, 2.0, e), lerp(1480, 1700, e), lerp(640, 740, e)], tWa = W(L, "water") - .1, tAi = W(L, "air") - .1, tWr = W(L, "wrong") - .2, tQ = W(L, "what") - .15, tF = W(L, "find") - .1;
  const [cx, cd] = slideX(t, s.t0 + .3, .7, HT.rx[2], HT.rx[2] - 30, HT.fy), peek = ss(tWr, tWr + .6, t), bump = .03 * pulse(t, tWr + .2, .1, .5);
  const chip = (t0, kind, x, col, fill) => t < t0 ? "" : TF(x, 330, spring(t, t0, .45), `<g filter="url(#dropS)"><circle r="70" fill="${P.paper}"/></g>` + TF(0, 0, 1.7, needIcon(kind, col, fill)) + TF(52, 46, 1, tickMark(28)));
  return hotelView(t, { mode: "pm", clock: 14.1, ticks: T5, items: cd + gPlant({ droop: 0, wet: 1 }) + gJar(dishIn({ s: .6, y: -6, bites: 2, id: "cj3" }), { lid: "holes" }) + gBox("", {})
      + TF(cx, HT.fy + 14 * e, .86 * (1 + .1 * e + bump), coveredPot({ tag: true, peek })) + (t >= tQ ? TF(cx + 205, HT.fy + 10, .5 * spring(t, tQ, .5), `<path d="M-50 0 L-34 -36 H34 L50 0z" fill="url(#hWood)" stroke="#8A5E34" stroke-width="4"/><g filter="url(#dropS)"><rect x="-90" y="-250" width="180" height="220" rx="24" fill="url(#gSun)"/></g>${T(0, -84, "?", 170, P.ink)}`) : "") }, cam)
    + chip(tWa, "water", 380, "#1F5FD0", "#BFE0FF") + chip(tAi, "air", 560, "#4E93B4", "#EAF6FF")
    + (t >= tF ? TF(960, 170, spring(t, tF, .45), `<g filter="url(#drop)" transform="rotate(-3)"><rect x="-330" y="-62" width="660" height="124" rx="62" fill="${P.ink}"/></g><g transform="rotate(-3)">${T(0, 22, `Find out in <tspan fill="${P.sun}">PART 2!</tspan>`, 64, "#fff")}</g>`) : "")
    + buddy("pip", 240, 1062, 320, t, { aura: true, in: s.t0 + .1, poses: [[s.t0, "pointing"], [tWr, "thinking"], [tF, "waving"]], jump: [[s.t0 + .3, 22]] })
    + dayCounter(t, 31) + HUD(t); };

/* ============ 13 · "Now you know!" ============ */
SC.nyk = (t, s) => nykScene(t, s, miniHotel([TF(0, -50, .8, potPlant({ droop: 0, wet: 1 })), TF(0, 0, .8, jar(dishIn({ s: .6, y: -6, bites: 2, id: "cjn" }), { lid: "holes" })), TF(0, 0, .78, coveredPot({ peek: 1 }))]));
})(); }
