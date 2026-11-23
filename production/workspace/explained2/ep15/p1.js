// p1.js: PART 1, "We Planted a Mango SEED. What Grows FIRST?": EP14's dare answered (a young plant comes first), observing like a scientist,
// the seed growing (root first, then the shoot), measuring a plant. Segments 1-16 of ../p3_ep15_script.md (version 1, 22 Nov 2026).
// STAGE 2 (drawn 2026-11-23): every scene is in a real place (home15.js: the HDB kitchen after rain, the common corridor with our pot on its
// plant stand) in morning light, with small life always moving (drips, the wind chime, a bird, the fan, the laundry); the buddies stand IN the
// scene, big, with a contact shadow, and react to every line (lib.js); the camera drifts or pushes in every scene and never cuts inside a place.
// The words, marks and timing are Stage 1's: every action is drawn AT its mark.
if (PART === 1) { (() => {
const L1 = "g501";
// the scores (script section 3): Round 1 1 : 0 (only Basil is right), HOLD ON! 2 : 0
SCORE.push([MK("coin1") - .1, 1, 0]);
SCORE.push([W("g1203", "one") - .1, 2, 0]);
const FOOT = "P3 · Life Cycles · The life cycle of a plant";
const dareBoard = (i, x, y, sc, o = {}) => picBoard(DARE_PICS[i], x, y, 1, { sc, lab: o.lab === false ? undefined : DARE_CARDS[i].toLowerCase(), size: 30, id: "p1d" + i + (o.id || ""), t: o.t || 0 });
const qMark = (t, t0, x, y, r = 50) => t < t0 ? "" : TF(x, y, spring(t, t0, .5) * (1 + .05 * Math.sin(t * 4)), `<g filter="url(#dropS)"><circle r="${r}" fill="url(#gSun)"/></g>${T(0, r * .52, "?", r * 1.56, P.ink)}`);
const slamFit = (y, txt, col, k) => slamLine(y, txt, Math.min(170, 170 * 1720 / tw(txt, 170, 700, "Fredoka", 4)), col, k);
const knife = (t, t0) => smallPrint(t, t0, KNIFE_RULE);
const xChip = (t, t0, x, y, s = 1) => t < t0 ? "" : TF(x, y, spring(t, t0, .4) * s, `<g filter="url(#dropS)"><circle r="30" fill="#fff" stroke="${P.ink}" stroke-width="4"/></g><path d="M-12 -12 L12 12 M12 -12 L-12 12" stroke="${P.ink}" stroke-width="7" stroke-linecap="round"/>`);
const tickChip = (t, t0, x, y, s = 1) => t < t0 ? "" : TF(x, y, spring(t, t0, .4) * s, tickBadge(30));
const bd = (who, x, y, h, t, o = {}) => buddy(who, x, y, h, t, o);
// the picture of the scene before melts away over the new one (no hard cut from a card screen into a place)
const melt = (t, s, name, d = .4) => { const a = 1 - clamp((t - s.t0) / d); if (a <= .01) return ""; window._noHud = true; let v = ""; try { v = SC[name](SCN[name].t1 - .04, SCN[name]); } finally { window._noHud = false; } return OP(a, v); };

/* 1 · silent cold open: the HDB kitchen after rain. ONE slow push towards the board and the seed. An adult's hands slice the mango and lift
   out its ONE big flat seed onto the saucer (cutmango); EP14's three mango boards slide in low along the cabinets (boardsIn); the buddies pop in
   (budsIn): Basil on the counter sniffing the mango, Momo curious on the floor, Pip with a hop */
const CBX = [900, 1110, 1320], CBY = 1000;
const boards3 = (t, id, t0) => [0, 1, 2].map((i) => { if (t0 === undefined) return dareBoard(i, CBX[i], CBY, .5, { lab: false, id }); const tt = t0 + i * .3; if (t < tt) return ""; const [x, d] = slideX(t, tt, .7, -300, CBX[i], CBY + 4); return d + dareBoard(i, x, CBY, .5, { lab: false, id }); }).join("");
const camCold = (t) => [1 + .07 * eio(t / 6), 1150, 640];
// the knife hand and the lifting hand (four fingers and a thumb, blue sleeves)
const cutHands = (t) => { const tc = MK("cutmango"), u = (t - tc) / 2.6; if (u < -.35 || u > 1.15) return ""; let s = "";
  const kin = eio((t - tc + .4) / .4) * (1 - eio((t - tc - 1.1) / .4)), ky = 640 - 70 * ss(tc, tc + .5, t) + 70 * ss(tc + .6, tc + .9, t);
  if (kin > .01) s += TF(1060 + 520 * (1 - kin), ky, 1, `<path d="M-10 0 L-190 -6 Q-210 0 -190 10 L-10 12z" fill="url(#g15Steel)" stroke="#8A97A8" stroke-width="3"/><rect x="-10" y="-8" width="90" height="26" rx="8" fill="#5E3F28"/>` + TF(40, 4, .8, hand15({ curl: .8 }), 180, -.8));
  const lin = eio((t - tc - 1.2) / .4) * (1 - eio((t - tc - 2.3) / .4)); if (lin > .01) { const e = eio((t - tc - 1.4) / .9); s += TF(lerp(1060, 1300, e) + 400 * (1 - lin), lerp(650, 650, e) - 70 * Math.sin(Math.PI * e) - 30, .8, hand15({ curl: .55 }), 120); }
  return s; };
const kitchenBoard = (t) => { const tc = MK("cutmango"); return { cut: ss(tc + .3, tc + .55, t), seedOut: ss(tc + 1.4, tc + 2.3, t) }; };
SC.cold = (t, s) => { const tb = MK("boardsIn"), tp = MK("budsIn");
  return VK(t, { board: kitchenBoard(t), over: boards3(t, "c", tb) + cutHands(t) }, camCold(t))
    + bd("basil", 1660, 768, 460, t, { in: tp, poses: [[tp, "sit"], [tp + 1.1, "cheer"]], eyes: t < tp + 1 ? "shut" : undefined, k: 1 + .03 * Math.sin(t * 9) * (t < tp + 1 ? 1 : 0), flip: true, look: -6, nohop: true })
    + bd("momo", 330, 1076, 420, t, { in: tp + .2, poses: [[tp + .2, "thinking"]], look: 4 }) + bd("pip", 640, 1076, 340, t, { in: tp + .4, poses: [[tp + .4, "waving"]], jump: [[tp + .45, 24]], wave: true })
    + OP(ramp(t, .5, .5), lowerPill(60, 96, "An HDB flat, Singapore ·", "morning")) + knife(t, MK("cutmango") - .4); };

/* 2 · "Last time...": EP14's dare, word for word. ONE calm picture: the three mango boards side by side, a gentle push-in, the big ?, the
   three cards; each board steps forward and its card lights while Heart says it (>= 2.5 s each). WIRED */
SC.lasttime = (t, s) => { const L = "g203", tc = [W(L, "one"), W(L, "two"), W(L, "three")], z = 1 + .04 * eio((t - s.t0) / 8), k = ramp(t, s.t0 + .05, .5), cur = tc.filter((x) => t >= x - .15).length - 1;
  let boards = ""; [0, 1, 2].forEach((i) => { const fw = cur === i ? ss(tc[i] - .15, tc[i] + .25, t) : (cur > i ? 1 - ss(tc[i + 1] - .15, tc[i + 1] + .25, t) : 0);
    boards += dareBoard(i, 560 + i * 400, 600 + 14 * (1 - spring(t, s.t0 + .2 + i * .15, .45)), .95 * (1 + .1 * fw), { id: "lt", t }); });
  return bg("stage2") + OP(ramp(t, s.t0, .3), T(960, 110, "Last time…", 60, "#fff", { w: 600 }))
    + OP(k, `<g transform="translate(960 540) scale(${n2(z)}) translate(-960 -540)">${boards}</g>`
      + qMark(t, W("g202", "what") - .1, 960, 240)
      + DARE_CARDS.map((c, i) => TF(560 + i * 400, 880, .5 * spring(t, tc[i] - .1, .45), ansCard(i + 1, c, { w: 430, h: 290, size: 50, pulse: cur === i ? .9 : pulse(t, tc[i], .04, .9) }))).join("")
      + TF(960, 1010, spring(t, W("g202", "what") - .1, .4), tpill(0, 0, DARE_LABEL, 40, P.sun, P.ink, { w: 700 }))) + HUD(t); };
/* back in the kitchen: the camera drifts on towards the window (it carries on under the title and into the game: no cut). Pip keeps his answer
   to himself (thinking), Basil is sure (a proud hop), Momo thinks */
const camBack = (t) => { const u = clamp((t - SCN.back.t0) / (SCN.title.t1 - SCN.back.t0)); return [1.07 + .05 * eio(u), 1180, 600]; };
const budsBack = (t) => { const s = SCN.back;
  return bd("basil", 1660, 768, 470, t, { in: s.t0, flip: true, poses: [[s.t0, "sit"], [LT("g204") + .4, "thinking"]], jump: [[LT("g204") + .45, 20]], look: -4 })
    + bd("momo", 330, 1076, 420, t, { in: s.t0, poses: [[s.t0, "thinking"]], look: 4 }) + bd("pip", 640, 1076, 340, t, { in: s.t0, poses: [[s.t0, "sit"], [LT("g204") + .2, "thinking"]] }); };
SC.back = (t, s) => (t < s.t0 + .5 ? `<rect width="1920" height="1080" fill="${P.night}"/>` : "") + VK(t, { over: boards3(t, "bk") }, camBack(t)) + budsBack(t)
  + (t >= LT("g204") - .1 ? TF(620, 330, spring(t, LT("g204") - .1, .4), tpill(0, 0, "Hold on to your answer!", 52, P.sun, P.ink, { w: 700 })) : "") + melt(t, s, "lasttime", .5) + HUD(t);
// the title slam over the dimmed kitchen: WE PLANTED A MANGO SEED (white) then WHAT GROWS FIRST? (sun yellow)
const TITLE = (k1, k2) => slamFit(400, "WE PLANTED A MANGO SEED", "#fff", k1) + slamFit(610, "WHAT GROWS FIRST?", P.sun, k2);
SC.title = (t, s) => { const u = t - MK("title"), dim = clamp(u / .2); return VK(t, { over: boards3(t, "ti") }, camBack(t)) + budsBack(t) + `<rect width="1920" height="1080" fill="${P.night}" opacity="${n2(.78 * dim)}"/>` + TITLE(slamK(u, .05), slamK(u, .55)) + HUD(t); };

/* 3 · the game, and the hidden snail: ONE smooth push-in from the (dimmed) kitchen straight onto the snail on the wet window ledge outside
   (common.js gameScene): its eye-stalks stretch out on "snail" */
SC.game = (t, s) => { const cE = camBack(SCN.title.t1), tS = W("g301a", "snail");
  return gameScene(t, s, ["g301a", "g301b", "g301r"], false, { world: (tt) => VK(tt, { over: boards3(tt, "gm"), snail: false }, cE) + CAM(snailAt(tt, SNAILK[0], SNAILK[1], .36, { ext: .35 + .65 * ss(tS - .2, tS + 1, tt) + .1 * Math.sin(tt * 2), slide: true }), cE[0], cE[1], cE[2]),
    A: camPt(cE, [SNAILK[0] + 6, SNAILK[1] - 24]), T: [640, 440], Z: 2.9, dim0: .78, pre: (tt) => budsBack(tt) + TITLE(1, 1) }); };
SC.goals = (t, s) => goals3(t, s, [["Observing like a scientist", ""], ["What grows from a seed", ""], ["Measuring a plant", ""]], ["g401", "g402", "g403", "g404"], "momo");

/* 5 · Round 1: EP14's dare (a short 3 s ring). The three mango boards on the cards; the clue labels one big seed · we plant it ON TOP of the
   ring through the countdown; in the ring: the big flat seed on its saucer, rocking a tiny bit. No x chip yet: the look-closer decides */
SC.r1card = (t, s) => roundCard(t, s, "ROUND 1", "YOUR ANSWER FROM LAST TIME");
const ringSeed = (tt) => `<g transform="translate(430 540)"><path d="M-150 -10 Q-130 26 0 28 Q130 26 150 -10z" fill="#fff" stroke="#C9C2B6" stroke-width="5"/><ellipse cx="0" cy="-10" rx="150" ry="26" fill="#F7F4EE" stroke="#C9C2B6" stroke-width="5"/></g>` + TF(430, 486, 1.25, mangoSeed(1, -6 + 4 * Math.sin(tt * 2.2)));
SC.r1 = (t, s) => lockN(t, { cards: DARE_CARDS, clues: DARE_CLUES.map((c, i) => [c, W(L1, "mango") + .15 * i]), lead: "basil", csize: 34, q: DARE_LABEL, tq: W(L1, "what") - .1,
  tc: [W(L1, "what"), W(L1, "seed"), W(L1, "show")], ring0: MK("ring0_r1"), dur: 3, lock: "g502",
  pics: [0, 1, 2].map((i) => dareBoard(i, 0, 108, .6, { lab: false, id: "r1i" })),
  obj: ringSeed,
  picks: [{ who: "momo", id: "g503", word: "1" }, { who: "pip", id: "g504", word: "2" }, { who: "basil", id: "g505", word: "3" }],
  react: [[LE("g503") + .1, "momo", "pointing"], [LE("g504") + .1, "pip", "thinking"], [LE("g505") + .1, "basil", "cheer"]] });

/* 6 · "How will we ever know?": the corridor. Momo big at the left asks; the camera drifts to our pot on its stand; an adult's hand presses the
   seed into the soil (potin), pats it twice (soilpat), and a little water from a small green can (water): the soil darkens */
const camPlant = (t) => { const s = SCN.plant, e = eio((t - (LT("g601") - .3)) / 1.6); return [1 + .02 * eio((t - s.t0) / 3) + .36 * e, lerp(960, 1240, e), lerp(560, 500, e)]; };
const plantHands = (t) => { const tp = MK("potin"), tpat = MK("soilpat"), tw = MK("water"); let s = "";
  // the hand with the seed comes down (potin), lets go, pats twice, leaves
  const a = ss(tp - 1.1, tp - .5, t) * (1 - ss(tpat + .9, tpat + 1.3, t)); if (a > .01) { const down = ss(tp - .6, tp, t), pat = Math.max(hop(t, tpat, .3), hop(t, tpat + .4, .3)), y = lerp(250, 470, down) - 30 * pat + 140 * ss(tpat + .9, tpat + 1.3, t), x = 1290 + 300 * (1 - a);
    s += (t < tp + .1 ? TF(x - 40, y + 60, .44, mangoSeed(1, 10)) : "") + TF(x, y, .8, hand15({ curl: t < tp + .1 ? .55 : .1 }), 115 + (t > tp + .2 ? -20 : 0)); }
  // the little green watering can: it tips, a thin stream, drops
  const c = ss(tw - .9, tw - .4, t); if (c > .01) { const tip = ss(tw - .4, tw, t); s += TF(1470 + 300 * (1 - c), 330, 1, `<g transform="rotate(${n2(-34 * tip)})"><path d="M-70 -60 H60 L70 40 H-80z" fill="#43BF6C" stroke="#1F8A4C" stroke-width="5"/><path d="M-70 -30 L-190 -90" stroke="#43BF6C" stroke-width="16" stroke-linecap="round"/><ellipse cx="-196" cy="-94" rx="18" ry="10" fill="#1F8A4C"/><path d="M60 -50 Q110 -40 70 30" fill="none" stroke="#1F8A4C" stroke-width="10"/></g>`)
      + (tip > .8 ? [0, 1, 2, 3, 4].map((i) => { const u = ((t * 3 + i / 5) % 1); return `<ellipse cx="${n2(1300 - 10 * i + 6 * u)}" cy="${n2(400 + 110 * u)}" rx="5" ry="9" fill="#8FD3F0" opacity="${n2(1 - u * .5)}"/>`; }).join("") : ""); }
  return s; };
SC.plant = (t, s) => { const tp = MK("potin"), wet = ss(MK("water"), MK("water") + 1.2, t);
  return VC(t, { seed: t < tp + .1 && t > tp - .5, wet, items: plantHands(t) }, camPlant(t))
    + bd("momo", 330, 1076, 520, t, { in: s.t0 + .05, poses: [[s.t0, "sit"], [LE("g601m") + .1, "thinking"]], look: 3 })
    + bd("basil", 1600, 1070, 360, t, { in: s.t0 + .15, flip: true, poses: [[s.t0, "sit"], [tp + .3, "surprised"], [tp + 1.6, "sit"]], look: -5 })
    + bd("pip", 1800, 1066, 340, t, { in: s.t0 + .25, flip: true, poses: [[s.t0, "sit"]], jump: [[MK("water") + .2, 14]] }) + knife(t, 99999) + melt(t, s, "r1", .45) + HUD(t); };

/* 7 · [LOOK CLOSER] observing like a scientist (home15.js obsArt): the seed big beside the journal; Momo's plan (look only twice) filled in by
   Pip's many pages; then each sense on its mark, joined to its journal line by a line in its colour; OBSERVING pops (lib.js o.at) */
SC.lcobserve = (t, s) => { window._BUBAT = { '*': [540, 330] }; const cP = camPlant(SCN.plant.t1), p = camPt(cP, [POTW[0], POTW[1] - 200]);
  return lookCloser(t, s, { tz: s.t0, fx: p[0], fy: p[1], art: obsArt, bgc: "#FFF3DC", verdict: [`OBSERVE AGAIN AND AGAIN`, GOODC], tv: MK("v_observe"), peekH: 440,
    over: (tt) => smallPrint(tt, s.t0 + 1.0, TASTE_RULE) }); };
SC.mark1 = (t, s) => markScene(t, s, { id: "g702", sayId: "g701", who: "basil", n: "1 of 2", text: "We can use our five senses to gather information about the life cycles of plants.", keys: ["five", "senses", "gather", "information", "life", "cycles", "plants"], size: 62, y: 240, footer: FOOT,
  under: SENSE.map(([, word, col], i) => { const k = spring(t, s.t0 + .5 + i * .15, .45), gl = pulse(t, LT("g702") + 1 + i * 1.2, .05, .6); return TF(900 + i * 230, 960, k * (1 + .15 * gl), `<g filter="url(#dropS)"><circle r="56" fill="#fff"/></g><circle r="56" fill="${col}" opacity=".14"/>` + senseIcon(i, col)) + TF(900 + i * 230, 1040, k, tpill(0, 0, word, 28, col, "#fff", { w: 700 })); }).join("")
    + TF(1600, 960, spring(t, s.t0 + 1, .45), pageLined(0, 0, 150, 190, { inner: T(-36, -60, "Day 1", 26, P.ink) + TF(0, 20, .4, mangoSeed(1, 0)) })) });

/* 9 · [LOOK CLOSER] the seed, day after day, through the window in the pot's side (home15.js seedArt; one continuous time-lapse, speeded up).
   SEED pops on Heart's word; the root FIRST (down), then the hooked shoot (up), two RED leaves that turn green; the old seed still there */
const camSeed = [1.25, 1240, 560];
SC.lcseed = (t, s) => { window._BUBAT = { '*': [520, 300] }; const p = camPt(camSeed, [POTW[0], POTW[1] - 110]);
  return lookCloser(t, s, { tz: s.t0, fx: p[0], fy: p[1], art: seedArt, bgc: "#FFF1C8", set: (tt) => VC(tt, { wet: 1 }, camSeed), verdict: [`A YOUNG PLANT COMES FIRST`, GOODC], tv: MK("v_seed"),
    over: (tt) => stepPill(tt, DAYS, 1640, 205) + speeded(tt, MK("d1"), MK("v_seed"), 1640, 290) }); };

/* the answer is three: a young plant. The corridor; our young plant (Day 45: a thin stem, four green leaves); EP14's three boards stand along the
   parapet's foot: the green tick on board 3, x chips on boards 1 and 2 and by Momo and Pip; the coin; YOUNG PLANT pops on Heart's term */
const ABX = [740, 900, 1060], ABY = 900;
SC.seedans = (t, s) => { const tA = MK("ansglow"), tK = MK("kw_young_plant"), e = eio((t - (tK - .6)) / 1.2) * (1 - eio((t - (LT("g809b") - .2)) / 1.4)), cam = [1.03 + .14 * e, lerp(1100, 1240, e), lerp(620, 520, e)];
  return VC(t, { plant: PLANT45, items: [0, 1, 2].map((i) => dareBoard(i, ABX[i], ABY, .46, { lab: false, id: "sa" }) + (i === 2 ? tickChip(t, tA, ABX[i] + 70, ABY - 200) : xChip(t, tA + .15 * i, ABX[i] + 70, ABY - 200))).join("") }, cam)
    + coin(t, MK("coin1") - .1, 560, 330, "+1", "if you showed three fingers")
    + bd("momo", 190, 1076, 370, t, { in: s.t0 + .1, poses: [[s.t0, "sit"]] }) + (t > s.t0 + .3 ? pickNum("momo", 320, 830, t, s.t0 + .3, "1") : "") + xChip(t, tA + .4, 360, 780, .7)
    + bd("pip", 450, 1070, 350, t, { in: s.t0 + .15, poses: [[s.t0, "sit"], [LT("g808") + .3, "pointing"]] }) + (t > s.t0 + .35 ? pickNum("pip", 570, 840, t, s.t0 + .35, "2") : "") + xChip(t, tA + .5, 610, 790, .7)
    + bd("basil", 1660, 1076, 540, t, { in: s.t0 + .1, flip: true, poses: [[s.t0, "sit"]], jump: [[tA + .05, 30]] }) + (t > s.t0 + .3 ? pickNum("basil", 1430, 760, t, s.t0 + .3, "3") : "") + tickChip(t, tA + .3, 1470, 700, .7) + HUD(t); };

/* 10 · Be the mango seed! The pill, the buddies wave us off, and ONE glide to the pot and down into the soil (a soft dark wipe); the journey
   (home15.js seedJourney; the tags are wired on their marks; the buddies ride along, shrunk); then one pull back out */
const camDive = (dive, e) => { const m = Math.max(e * .5, dive); return [1 + .25 * e + 6 * dive, lerp(1000, POTW[0], m), lerp(560, POTW[1] + POTS + 10, m)]; };
SC.waitw = (t, s) => { const L = "g901", dive = ei((t - (s.t1 - 1.5)) / 1.5), e = eio((t - s.t0) / 1.2), tP = W(L, "be") - .15;
  return VC(t, { plant: PLANT45, snail: [1180, 612] }, camDive(dive, e)) + OP(1 - dive * 1.7, bd("momo", 300, 1076, 430, t, { in: s.t0 + .1, poses: [[s.t0, "sit"], [tP + .2, "waving"]], wave: true }) + bd("pip", 620, 1070, 360, t, { in: s.t0 + .15, poses: [[s.t0, "sit"], [tP + .5, "waving"]], wave: true })
      + bd("basil", 1700, 1076, 430, t, { in: s.t0 + .1, flip: true, poses: [[s.t0, "sit"], [tP + .35, "cheer"]], wave: true })
      + (t >= tP ? TF(960, 250, spring(t, tP, .45), tpill(0, 0, "Be the mango seed!", 76, P.sun, P.ink, { w: 700 })) : "") + HUD(t)) + wipe(t, s.t1, "#2E1C10", 960, 540); };
SC.shrink = (t, s) => { const m = MK, rp = (w) => w === "momo" ? [[m("jseed") + .3, "surprised"], [m("jlight") + .1, "surprised"], [m("jyoung") - .1, "cheer"]] : w === "basil" ? [[m("jroot") + .2, "pointing"], [m("jlight") + .15, "surprised"], [m("jyoung"), "cheer"]] : [[m("jshoot") + .2, "thinking"], [m("jlight") + .2, "surprised"], [m("jyoung") + .1, "cheer"]];
  return seedJourney(t, s) + riders(t, s, { tin: m("jseed") + .6, h: 170, at: { pip: [200, 1044], basil: [1720, 1050], momo: [380, 1040] }, poses: { pip: rp("pip"), basil: rp("basil"), momo: rp("momo") } })
    + youTag(t, m("jseed"), "You: a mango seed") + feelTag(t, m("jroot"), m("jshoot") - .1, "the root grows down", 160) + feelTag(t, m("jshoot") + .2, m("jleaves") - .1, "the shoot grows up", 160) + feelTag(t, m("jyoung"), m("jyoung") + 3, "a young plant", 160); };
SC.pullout = (t, s) => { const u = 1 - eo((t - s.t0) / .6); return VC(t, { plant: PLANT45 }, camDive(u, u)) + bd("momo", 300, 1076, 430, t, { in: s.t0 + .2, poses: [[s.t0 + .2, "cheer"]] }) + bd("basil", 1700, 1076, 430, t, { in: s.t0 + .25, flip: true, poses: [[s.t0 + .25, "cheer"]] }) + wipe(t, s.t0, "#2E1C10") + HUD(t); };
// Mark Sentence 2 (Momo): under the card, the time-lapse in four small pictures with arrows (the seed, the root, the shoot, the young plant)
const lapseMini = (i, t) => { const soil = `<rect x="-80" y="0" width="160" height="70" fill="#6E4A2C"/><rect x="-80" y="-90" width="160" height="90" fill="#DCEFFB"/>`;
  const sd = TF(0, 36, .42, mangoSeed(1, -8)); const root = i >= 1 ? `<path d="M-26 44 Q-34 60 -30 ${i >= 1 ? 68 : 50}" stroke="#F6EEDF" stroke-width="6" fill="none" stroke-linecap="round"/>` : "";
  const shoot = i === 2 ? `<path d="M-20 30 Q-14 -10 0 -30 Q10 -40 18 -26" stroke="#9CB85A" stroke-width="7" fill="none" stroke-linecap="round"/>` : i === 3 ? TF(-10, 0, .55, youngPlant15(t, { h: 120, n: 4, red: 0 })) : "";
  return `<clipPath id="lm${i}"><rect x="-80" y="-90" width="160" height="160" rx="16"/></clipPath><g clip-path="url(#lm${i})">${soil}${sd}${root}${shoot}</g><rect x="-80" y="-90" width="160" height="160" rx="16" fill="none" stroke="#fff" stroke-width="6"/>`; };
SC.mark2 = (t, s) => markScene(t, s, { id: "g1002", sayId: "g1001", who: "momo", n: "2 of 2", text: "The seed grew into a young plant.", keys: ["seed", "young", "plant"], size: 76, y: 260, footer: FOOT,
  under: [0, 1, 2, 3].map((i) => { const x = 820 + i * 230, k = spring(t, s.t0 + .4 + i * .15, .45), gl = pulse(t, LT("g1002") + .5 + i * .5, .05, .5); return TF(x, 920, k * (1 + .08 * gl), lapseMini(i, t)) + TF(x, 1036, k, tpill(0, 0, ["seed", "root", "shoot", "young plant"][i], 28, "#FFF8EA", P.ink, { w: 700 })) + (i ? OP(k, `<path d="M${x - 140} 916 h50" stroke="#fff" stroke-width="7"/><path d="M${x - 98} 904 l14 12 l-14 12" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round"/>`) : ""); }).join("") });

/* 12 · measuring: four weeks later (the week pill), the young plant taller (12 cm). Pip pushes in a clear 30 cm school ruler (rulerin); the
   camera pushes in on it. The book's strip (Heart reads it); under it, the ruler stands IN the pot, its zero on the soil */
const weekPill = (t, t0) => t < t0 ? "" : TF(220, 210, spring(t, t0, .4), `<g filter="url(#dropS)"><rect x="-120" y="-36" width="240" height="72" rx="36" fill="${P.ink}"/></g>` + T(0, 13, "Week 4", 38, "#fff", { w: 700 }));
SC.measure = (t, s) => { const tr = MK("rulerin"), e = eio((t - tr + .2) / 1.1), cam = [1 + .03 * eio((t - s.t0) / 4) + .1 * e, lerp(960, 760, e), lerp(560, 600, e)];
  const [rx, ds] = t >= tr - .5 ? slideX(t, tr - .5, .6, -200, 620, 1074) : [-400, ""];
  return VC(t, { plant: PLANTW4 }, cam) + (t >= tr - .5 ? ds + TF(rx, 1074, .9, ruler15()) : "")
    + bd("pip", 330, 1076, 520, t, { in: s.t0 + .05, poses: [[s.t0, "sit"], [LE("g1101p") + .1, "pointing"]] })
    + bd("basil", 1620, 1070, 360, t, { in: s.t0 + .15, flip: true, poses: [[s.t0, "sit"]] }) + bd("momo", 1800, 1066, 350, t, { in: s.t0 + .2, flip: true, poses: [[s.t0, "sit"]] }) + weekPill(t, s.t0 + .2) + HUD(t); };
const camStrip = [1.4, 1240, 400];
SC.strip = (t, s) => VC(t, { plant: PLANTW4, potOver: TF(70, POTS, 1, ruler15({ zero: true })) }, [camStrip[0] + .04 * eio((t - s.t0) / 5), camStrip[1], camStrip[2]])
  + strip15(t, "g1102", "We can use simple tools, such as a ruler, to help us measure the height of plants.", 150, { keys: ["ruler", "measure", "height"], maxW: 1240, x: 900 }) + bd("pip", 210, 1076, 320, t, { in: s.t0 + .2, poses: [[s.t0, "sit"]], jump: [[LT("g1102") + 2, 12]] }) + HUD(t);

/* 13 · HOLD ON! Basil measures from the table: he stands the ruler on the TABLE (rtable), its top reads 20 cm at the leaf tip (r20). The countdown
   takes the stage (the blue game stage; the ring big and central with the pot and ruler in it; the clue labels large on top of its frame; the YOU
   arms crossed; Basil big at the left fidgeting). After the bell: Pip slides the ruler into the pot so its ZERO sits on the soil (rzero, rsoil):
   12 cm (r12), a green tick */
const RG = [960, 420], RR = 215;
window.SHELF_AWAY = (t) => { if (PART !== 1) return 0; const a = W("g1202", "cross") - .3, b = LE("g1203") + .4; return ss(a, a + .35, t) * (1 - ss(b, b + .35, t)); };
const rulerAt = (t) => { const tz = MK("rzero"), ts = MK("rsoil"), u = eio((t - tz) / (ts - tz + .4)); return [lerp(TABLE[0] + 150, POTW[0] + 64, u), lerp(TABLE[1], POTW[1] + POTS, u)]; };
SC.holdon = (t, s) => { const a = "g1201", b = "g1202", c = "g1203", d = "g1204p", f = "g1205b", r0 = MK("ring0_hold"), bell = MK("bell_hold"), rs = ringState(t, r0, 5), tX = W(b, "cross") - .15, tH = W(b, "hold") - .1, tOne = W(c, "one") - .1, inT = t >= r0 && t < bell, tR = MK("rtable"), t20 = MK("r20"), t12 = MK("r12");
  const st = ss(tX - .1, tX + .4, t) * (1 - ss(LE(c) + .1, LE(c) + .6, t)), ring = st > .01, [rx, ry] = rulerAt(t);
  // the camera: on Basil and the pot, a push on the ruler's foot at rtable, back; then close on the soil for Pip's fix
  const eA = eio((t - tR + .2) / 1.2) * (1 - eio((t - t20 - 1.2) / 1.2)), eB = eio((t - LT(d) + .3) / 1.4), cam = [1.02 + .38 * eA + .55 * eB, lerp(lerp(1100, 1360, eA), 1260, eB), lerp(lerp(600, 600, eA), 450, eB)];
  const rul = t >= tR - .2 ? TF(rx, ry, 1, ruler15({ zero: t >= MK("rsoil") }) ) + popSpark(t, tR - .2, rx, ry - 200, 120) : "";
  const tip = POTW[1] + POTS - PLANTW4.h - 14, marks = (t >= t20 && t < MK("rzero") ? `<path d="M${POTW[0] - 120} ${tip} H${rx - 30}" stroke="${P.ink}" stroke-width="4" stroke-dasharray="8 6"/>` + TF(POTW[0] - 190, tip, spring(t, t20, .4), tpill(0, 0, "20 cm?", 40, "#fff", P.ink, { w: 700 })) : "")
    + (t >= t12 ? `<path d="M${POTW[0] - 120} ${tip} H${rx - 30}" stroke="${P.leaf}" stroke-width="5" stroke-dasharray="8 6"/>` + TF(POTW[0] - 200, tip, spring(t, t12, .4), tpill(0, 0, "12 cm", 44, P.leaf, "#fff", { w: 700 })) + tickChip(t, t12 + .2, POTW[0] - 310, tip, .8) : "")
    + (t >= MK("rsoil") && t < t12 + 2.5 ? TF(rx + 170, POTW[1] + POTS + 6, spring(t, MK("rsoil"), .4), tpill(0, 0, "zero on the soil", 30, P.leaf, "#fff", { w: 700 })) : "");
  const room = VC(t, { plant: PLANTW4, items: rul + marks }, cam) + `<rect width="1920" height="1080" fill="${P.night}" opacity="${n2(.12 * st)}"/>`;
  const pic = `<circle cx="${RG[0]}" cy="${RG[1]}" r="${RR - 24}" fill="#FCE7CF"/><rect x="${RG[0] - 190}" y="${RG[1] + 96}" width="380" height="16" rx="5" fill="url(#f14Wood)"/>` + TF(RG[0] - 40, RG[1] + 96, .5, pot15({ label: false }) + TF(0, POTS, 1, youngPlant15(t, PLANTW4))) + TF(RG[0] + 50, RG[1] + 96, .5, ruler15({ cm: 18 }));
  const labels = [["the ruler starts at the table", 420, 240, -1], ["20 cm?", 1500, 250, 1]].map(([l, x, y, sd], i) => { const t0 = tX + .2 + i * .15; return t < t0 ? "" : pline(x - sd * 190, y + 40, RG[0] + sd * RR * .8, RG[1] - RR * .6, ramp(t, t0, .2)) + clue3(x, y, l, spring(t, t0, .4), 54, 520); }).join("");
  const fid = inT ? 1 : 0, bob = inT ? 16 * Math.sin((t - r0) * Math.PI * 2) : 6 * Math.sin(t * 3);
  return room + (ring ? OP(st, bg("stage")) : "")
    + (ring ? OP(st, TF(RG[0], RG[1], spring(t, tX, .45) * (1 + .035 * (inT ? rs.tick : 0)), `<g transform="translate(${-RG[0]} ${-RG[1]})">${ringTimer(RG[0], RG[1], t < r0 ? 1 : t < bell ? rs.frac : 0, t < r0 ? 5 : t < bell ? rs.secs : 0, t, { R: RR, sw: 34, tick: rs.tick, shut: pulse(t, bell, .01, .6), chg: inT || (t >= bell && t < bell + .5) ? (t >= bell ? bell : rs.chg) : -9, ns: 1.25, inner: pic })}</g>`)
      + labels + TF(1700, 640 + bob, .9 * spring(t, tX + .1, .4), `<g filter="url(#dropS)">${crossedArms()}</g>`) + youPill(1700, 470 + bob * .6, 1.2) + TF(1700, 860, spring(t, tX + .2, .4), tpill(0, 0, "cross your arms", 38, P.ink, "#fff", { w: 700 }))) : "")
    + bd("pip", 1720, 1076, 440, t, { in: LT(d) - .5, flip: true, poses: [[LT(d) - .5, "surprised"], [LT(d) - .12, "sit"], [LE(d) + .2, "pointing"]], look: -3 })
    + bd("momo", 760, 1066, 320, t, { in: LT(d) - .3, poses: [[LT(d) - .3, "thinking"], [t12, "surprised"], [t12 + 1.2, "sit"]] })
    + bd("basil", 300, 1076, 520, t, { in: s.t0 + .1, rock: fid * 2.2, look: inT ? 6 : 0, poses: [[s.t0, "cheer"], [LE(a) + .3, "sit"], [W(b, "not") - .1, "surprised"], [tH + .5, "sit"], [r0 - .2, "thinking"], [bell - 1.6, "oops"], [bell, "surprised"], [LT(c) + .1, "oops"], [LE(f) - 1.2, "waving"], [LE(f) + .4, "sit"]], jump: [[W(a, "twenty") - .1, 30], [bell + .02, 30], [W(f, "handsome") - .1, 24]], nohop: true })
    + stamp(t, tH, 960, 560, "HOLD ON!") + bellIcon(t, r0) + coin(t, tOne, 1300, 700, "+1", "arms crossed") + HUD(t); };

/* 14 · score hand, the snail (lizReveal: the score hand melts into the corridor, ONE push-in onto the snail on the rim of OUR pot, the iris,
   the ring on "snail"; Pip's fun fact: a snail's tongue with thousands of tiny teeth (ff_teeth), a soft young leaf it scrapes (ff_leaf)) */
SC.final = (t, s) => { const L = "g1301"; return finalScene(t, s, L, 0, [[s.t0, null, 1], [W(L, "two") - .1, null, 2]]); };
SC.liz = (t, s) => { const L = "g1302", tq = W(L, "it") - .1, sp = SNAILC.liz;
  return lizReveal(t, s, L, VC(t, { plant: PLANTW4, snail: false, items: snailAt(t, sp[0], sp[1], .34, { slide: true, ext: .8 + .2 * Math.sin(t * 2) }) }), sp[0] + 4, sp[1] - 26, tq, "It was on the rim of our plant pot!", -120, 160, 80, 2.9, { from: () => SC.final(SCN.final.t1 - .04, SCN.final), qx: 560, qy: 770, tx: 560, ty: 900, tell: "g1304",
    fact: { id: "g1303", at: [1220, 470], w: 860, h: 470, items: [["ff_teeth", "1000s of tiny teeth", ffTeeth], ["ff_leaf", "scrapes young leaves", ffScrape]], cols: ["#C9746A", "#2FA35A"] } }) + finePrint(t, s.t0 + .5, SNAIL_RULE, 1120, 1040); };

/* 15 · the cliffhanger: will it ever grow mangoes? Momo big beside our young plant (no flowers, no mangoes: a ? pops at q); the camera rises
   over the parapet to the old mango tree in the garden below, full of tiny flowers and a few mangoes (treein); PART 2 slams in */
SC.cliff = (t, s) => { const tP = W("g1503", "part") - .1, tq = MK("q"), tT = MK("treein"), e = eio((t - tT + .3) / 1.6), cam = [1 + .04 * eio((t - s.t0) / 4) + .6 * e, lerp(1000, 1640, e), lerp(560, 300, e)];
  const tip = camPt(cam, [POTW[0], POTW[1] + POTS - PLANTW4.h - 50]);
  return VC(t, { plant: PLANTW4, snail: false }, cam) + OP(1 - e, qMark(t, tq, tip[0] + 40, tip[1] - 40, 48))
    + bd("basil", 1560, 1070, 360, t, { in: s.t0 + .15, flip: true, poses: [[s.t0, "sit"], [LT("g1502") + .2, "pointing"]], look: -4 }) + bd("pip", 1780, 1066, 340, t, { in: s.t0 + .2, flip: true, poses: [[s.t0, "sit"], [LT("g1502") + .5, "surprised"]] })
    + bd("momo", 330, 1076, 520, t, { in: s.t0 + .1, poses: [[s.t0, "sit"], [LE("g1501") + .1, "thinking"], [tP, "sit"]], jump: [[LT("g1503") + .1, 22]] })
    + (t >= tT + .6 ? TF(1000, 990, spring(t, tT + .6, .4), tpill(0, 0, "the old mango tree, downstairs", 40, "#fff", P.ink, { w: 700 })) : "")
    + (t >= tP ? slamFit(330, "PART 2", P.sun, slamK(t - tP, 0)) : "") + HUD(t); };

/* 16 · "Now you know!": our young plant in its pot, centred between the buddies */
SC.nyk = (t, s) => nykScene(t, s, TF(960, 1010, 1.15, pot15({}) + TF(0, POTS, 1, youngPlant15(t, PLANTW4))), { bx: [200, 1715, 1375], hx: 470 });
})(); }
