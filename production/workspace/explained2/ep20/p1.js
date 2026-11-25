// p1.js: PART 1, "Why Does This Magnet FLOAT? Two Poles, a Pull and a Push": EP19's dare answered (two, a push), be the top ring magnet
// (the slide, the slow stop in mid-air, the press, the spring back, the empty gap), the answer, where is a magnet strongest? (the class's
// steel paper clips bunch at the two ends: POLES; the strip 6.7 and ATTRACTION; every shape has two poles, a ring's on its flat sides; Mark
// Sentence 6.6 + 6.8), HOLD ON! (Pip: "the ring must be broken": turned over, it snaps down), pull or push? (two bar magnets on round
// pencils: REPEL; it depends which poles face; Mark Sentence 6.9), the spider, the cliffhanger (two blue ends: is there a rule?).
// Segments 1-13 of ../p3_ep20_script.md section 4 (version 1, 23 Nov 2026).
// STAGE 2 (drawn 2026-11-23): one real place, a SCHOOL SCIENCE ROOM on Monday after school (sets20.js SR20: the window onto the field, the class
// plant, the whiteboard with THE POLES BOARD (it fills on kw_poles, stars, board2), the poster, the bookshelf, the door onto the corridor, the
// fan, the back bench and its stools, the FRONT BENCH with the props); the buddies stand IN the scene, big, with a contact shadow; the camera
// drifts or pushes in and never cuts inside the room. Every pose has its reason (SCENES_TODO.md, pose_reasons.json); the buddy who got it
// wrong stays shy and the right ones confident through the whole fix (lib.js OUTCOMES `to`). Every action is drawn AT its mark.
if (PART === 1) { (() => {
const L1 = "m501";
// the scores (script section 3): Round 1 1 : 1 (Pip and Basil right: the Buddies score too), HOLD ON! 2 : 1 (nothing for the Buddies)
SCORE.push([MK("coin1") - .1, 1, 1]);
SCORE.push([W("m903", "one") - .1, 2, 1]);
const FOOT = "P3 · Interactions · Properties of Magnets";
const bd = (who, x, y, h, t, o = {}) => buddy(who, x, y, h, t, o);
const slamFit = (y, txt, col, k) => slamLine(y, txt, Math.min(170, 170 * 1720 / tw(txt, 170, 700, "Fredoka", 4)), col, k);
const CBX = [760, 1160];
// the front bench's props (world): Pip's pencil with the two rings (PEN), the class stationery tray (TRAY), Basil's bar magnet and two round
// pencils lying by it (MAG)
const PEN = [960, 838], TRAY = [690, 836], MAG = [1250, 828], PK = .5, GAP = [PEN[0], PEN[1] + PK * ringGapY(1)];
const pencilsFlat = (x, y) => TF(x, y, .4, `<rect x="-150" y="-12" width="300" height="24" rx="10" fill="#FFC83A" stroke="#B8861C" stroke-width="4"/><path d="M150 -12 L190 0 L150 12z" fill="#F2D6A8" stroke="#B8861C" stroke-width="3"/><rect x="-140" y="22" width="300" height="24" rx="10" fill="#FFC83A" stroke="#B8861C" stroke-width="4"/><path d="M160 22 L200 34 L160 46z" fill="#F2D6A8" stroke="#B8861C" stroke-width="3"/>`);
const ringsAt = (t, o = {}) => TF(PEN[0], PEN[1], PK, rings20(t, o));
const benchProps = (t, o = {}) => (o.tray === false ? "" : TF(TRAY[0], TRAY[1], .5, tray20(t))) + (o.mag === false ? "" : TF(MAG[0], MAG[1] - 18, .4, bar20(t)) + pencilsFlat(MAG[0] + 40, MAG[1] + 4)) + (o.rings === false ? "" : ringsAt(t, o.ro || {}));
const room = (t, cam, o = {}) => SR20(t, { bench: (o.under || "") + benchProps(t, o) + (o.top || ""), ...o.sr }, cam);
const W0 = [1, 960, 540];
window.SHELF_AWAY = (t) => { if (PART !== 1) return 0; const a = W("m902", "cross") - .3, b = LE("m903") + .4, w = SCN.waitw; return Math.max(ss(a, a + .35, t) * (1 - ss(b, b + .35, t)), ss(w.t0 + .3, w.t0 + .8, t) * (1 - ss(SCN.pullout.t1, SCN.pullout.t1 + .4, t))); };

/* 1 · the cold open, SPEAKING from 0.825 s (SERIES_FORMAT 11 item 1; EP22's approach): the science room, Monday after school, while Heart
   says "Last time, we asked: Two ring magnets on a pencil! The top one floats in mid-air, with no glue and no string." The place card from
   0.2 s (about 7.4 s on screen). One slow push towards the floating ring over the whole scene. ringsIn: Pip's pencil (in its lump
   of plasticine, the two rings, the top one floating) slides in low along the bench and is set down; the top ring bobs, then settles.
   budsIn: Momo and Basil lean in, staring at the gap. paw: Basil's paw swishes through the gap (nothing there). The spider in the window
   frame's top corner on its silk line (the intro spot) */
const camCold = (t) => camMix(camOn([960, 640], 1.08, 960, 580), camOn([GAP[0], GAP[1] - 40], 1.32, 960, 560), eio(t / SCN.cold.t1));
const penIn = (t) => { const a = MK("ringsIn"), u = clamp((t - a + .7) / .7); if (t < a - .7) return ""; const x = lerp(1640, PEN[0], eio(u)); return TF(x, PEN[1], PK, rings20(t, { bob: u < 1 ? 0 : 6 })) + (u < 1 ? dust(x + 90, PEN[1], (t * 3) % 1, .6) : dust(PEN[0], PEN[1], (t - a) / .35, .8)); };
SC.cold = (t, s) => { const tb = MK("budsIn"), tp = MK("paw"), cam = camCold(t), g = camPt(cam, GAP), sw = clamp((t - tp) / .5);
  return SR20(t, { bench: benchProps(t, { rings: false }) + penIn(t), child: .3 }, cam)
    + (sw > 0 && sw < 1 ? OP(Math.sin(Math.PI * sw), `<path d="M${n2(g[0] - 260 + 520 * sw - 160)} ${n2(g[1] + 30)} Q${n2(g[0] - 260 + 520 * sw - 80)} ${n2(g[1] - 20)} ${n2(g[0] - 260 + 520 * sw)} ${n2(g[1] + 4)}" stroke="#fff" stroke-width="16" fill="none" stroke-linecap="round"/>` + `<path d="M${n2(g[0] - 260 + 520 * sw - 140)} ${n2(g[1] + 44)} Q${n2(g[0] - 260 + 520 * sw - 70)} ${n2(g[1] + 10)} ${n2(g[0] - 260 + 520 * sw - 10)} ${n2(g[1] + 24)}" stroke="${P.basil}" stroke-width="8" fill="none" stroke-linecap="round"/>`) : "")
    + bd("pip", 1690, 1076, 500, t, { in: MK("ringsIn") - .4, flip: true, poses: [[0, "sit"]], look: -4 })
    + bd("basil", 260, 1076, 480, t, { in: tb, poses: [[tb, "sit"]], look: 6, jump: [[tp - .1, 22]] })
    + bd("momo", 1360, 1010, 400, t, { in: tb + .15, flip: true, poses: [[tb + .15, "sit"], [tp + .6, "waving"], [tp + 2.4, "sit"]], look: -5, wave: true })
    + OP(ramp(t, .2, .4), lowerPill(60, 96, "A school science room, Singapore ·", "Monday after school")); };

/* 2 · "Last time...": EP19's dare, word for word. ONE calm picture: the two dare cards side by side, a gentle push-in, the big ?, each card
   steps forward and lights while Heart says it (>= 2.5 s each) */
SC.lasttime = (t, s) => { const L = "m203", tc = [W(L, "one"), W(L, "two")], z = 1 + .04 * eio((t - s.t0) / 8), k = ramp(t, s.t0 + .05, .5), cur = tc.filter((x) => t >= x - .15).length - 1;
  let cards = ""; [0, 1].forEach((i) => { const fw = cur === i ? ss(tc[i] - .15, tc[i] + .25, t) : (cur > i && i < 1 ? 1 - ss(tc[i + 1] - .15, tc[i + 1] + .25, t) : 0);
    cards += TF(760 + i * 400, 600 + 14 * (1 - spring(t, s.t0 + .2 + i * .15, .45)), .95 * (1 + .1 * fw), dareCard2(i, { pulse: cur === i ? .9 : pulse(t, tc[i], .04, .9), id: "lt" + i })); });
  return bg("stage2") + OP(ramp(t, s.t0, .3), T(960, 110, "Last time…", 60, "#fff", { w: 600 }))
    + OP(k, `<g transform="translate(960 540) scale(${n2(z)}) translate(-960 -540)">${cards}</g>`
      + qMark20(t, W("m202", "what") - .1, 960, 260)
      + TF(960, 1000, spring(t, W("m202", "what") - .1, .4), tpill(0, 0, DARE_LABEL, 40, P.sun, P.ink, { w: 700 }))) + melt(t, s, "cold", .5) + HUD(t); };
/* back in the science room: a slow drift round the pencil that carries on under the title. Pip hides his answer (a hop), Basil a secret fist
   (a hop), Momo a sure little smile: no pose sprites */
const camBack = (t) => { const u = clamp((t - SCN.back.t0) / (SCN.title.t1 - SCN.back.t0)); return camMix(camOn([GAP[0] - 40, GAP[1] - 30], 1.3, 960, 560), camOn([GAP[0] + 40, GAP[1] - 40], 1.38, 960, 560), eio(u)); };
const backBuds = (t, t0) => bd("basil", 250, 1076, 480, t, { in: t0, poses: [[t0, "sit"]], look: 4, jump: [[LT("m204") + .5, 14]] }) + bd("momo", 1370, 1010, 400, t, { in: t0 + .1, flip: true, poses: [[t0, "sit"]] })
  + bd("pip", 1700, 1076, 500, t, { in: t0 + .05, flip: true, poses: [[t0, "sit"]], jump: [[LT("m204") + .3, 26]] });
SC.back = (t, s) => room(t, camBack(t)) + backBuds(t, s.t0 + .05) + (t >= LT("m204") - .1 ? TF(960, 330, spring(t, LT("m204") - .1, .4), tpill(0, 0, "Hold on to your answer!", 56, P.sun, P.ink, { w: 700 })) : "") + melt(t, s, "lasttime", .5) + HUD(t);
// the title slam over the dimmed science room: WHY DOES IT FLOAT? (white) then A PULL OR A PUSH? (sun yellow)
const TITLE = (k1, k2) => slamFit(400, "WHY DOES IT FLOAT?", "#fff", k1) + slamFit(610, "A PULL OR A PUSH?", P.sun, k2);
SC.title = (t, s) => { const u = t - MK("title"), dim = clamp(u / .2); return lcSet(t, s, "back") + `<rect width="1920" height="1080" fill="${P.night}" opacity="${n2(.78 * dim)}"/>` + TITLE(slamK(u, .05), slamK(u, .55)) + HUD(t); };

/* 3 · today: the camera glides from the floating ring up to THE POLES BOARD on the whiteboard (empty: the big dashed outline and its label
   boxes; held about 2 s from `board`), then across to the window frame's top corner, where the game's push-in starts (one move) */
const camBoard = camOn([890, 330], 1.5, 960, 480), camWin = camOn([SPAT.intro[0], SPAT.intro[1] - 20], 1.7, 760, 440);
const camToday = (t) => { const s = SCN.today, a = eio((t - s.t0) / 1.4), b = eio((t - (s.t1 - 1.5)) / 1.5); return b > 0 ? camMix(camBoard, camWin, b) : camMix(camBack(SCN.title.t1), camBoard, a); };
SC.today = (t, s) => { const out = s.t1 - 1.4; window._BUBAT = { '*': [960, 300] };
  return room(t, camToday(t)) + (t >= MK("board") ? OP(pulse(t, MK("board"), .05, .8), `<rect width="1920" height="1080" fill="#fff" opacity=".12"/>`) : "")
    + bd("basil", 230, 1076, 480, t, { in: s.t0 + .1, out, poses: [[s.t0, "sit"]], look: -3 }) + bd("pip", 1420, 1010, 380, t, { in: s.t0 + .15, out: out + .1, flip: true, poses: [[s.t0, "sit"]] })
    + bd("momo", 1710, 1076, 500, t, { in: s.t0 + .2, out: out + .2, flip: true, poses: [[s.t0, "sit"]], look: -3 }) + HUD(t); };
SC.game = (t, s) => { const cE = camToday(SCN.today.t1), p = SPAT.intro;
  return gameScene(t, s, ["m302", "m303b", "m304"], false, { world: (tt) => room(tt, cE), A: camPt(cE, [p[0], p[1] - 16]), T: [680, 440], Z: 2.0, dim0: 0 }) + smallPrint(t, LT("m304"), LOOK_RULE); };
SC.goals = (t, s) => goals3(t, s, [["Two poles", ""], ["Where the pull is strongest", ""], ["Attract and repel", ""]], ["m401", "m402", "m403", "m404"], "basil");
SC.r1card = (t, s) => roundCard(t, s, "ROUND 1", "YOUR ANSWER FROM LAST TIME");

/* 5 · Round 1: EP19's dare (a short 3 s ring). EP19's two cards as the ONE set of numbered picture cards; the clue labels no glue · no string
   · a gap ON TOP of the ring; in the ring the floating ring, big; ON `press` a finger presses it down and it springs back (Pip's action, shown
   in the picture while he talks). Basil leads (thinking after the question, worried through the countdown: lockN) */
SC.r1 = (t, s) => lockN(t, { cards: DARE_CARDS, clues: DARE_CLUES.map((c, i) => [c, W(L1, "what") + .15 * i]), lead: "basil", csize: 40, q: DARE_LABEL, tq: W(L1, "what") - .1,
  tc: [W(L1, "what"), W(L1, "top"), W(L1, "show")], ring0: MK("ring0_r1"), dur: 3, lock: "m502",
  pics: [0, 1].map((i) => darePic(i)), obj: ringP1,
  picks: [{ who: "momo", id: "m503m", word: "1" }, { who: "pip", id: "m504p", word: "2" }, { who: "basil", id: "m505b", word: "2" }] });

/* 6 · Be the top ring magnet! The camera glides down to the floating ring (one glide, no cut); the buddies wave the viewer off (goodbye), then
   each shrinks with a pop. The spider on the whiteboard's pen tray as the camera passes */
const camWait = (t) => { const s = SCN.waitw, u = eio((t - s.t0) / (s.t1 - s.t0)); return camMix(camOn([GAP[0] - 40, GAP[1] - 120], 1.2, 960, 520), camOn([GAP[0], GAP[1] - 40], 4.4, 960, 540), u * u); };
SC.waitw = (t, s) => { const L = "m601", tP = W(L, "be") - .15, sh = W(L, "shrink") - .1;
  const buds = ["basil", "momo", "pip"].map((w, i) => { const x = [250, 1380, 1700][i]; return bd(w, x, [1076, 1010, 1076][i], [470, 390, 490][i], t, { in: s.t0 + .1 + .05 * i, out: sh + .2 * i + .3, flip: x > 960, poses: [[s.t0, "sit"], [tP + .2 + .15 * i, "waving"]], wave: true }); }).join("");
  return room(t, camWait(t)) + OP(1 - ss(s.t1 - 1.0, s.t1 - .5, t), buds + (t >= tP ? TF(960, 250, spring(t, tP, .45), tpill(0, 0, "Be the top ring magnet!", 76, P.sun, P.ink, { w: 700 })) : "") + HUD(t)) + wipe(t, s.t1, "#E3EEE6", 960, 600); };   // 24 Nov: the wall colour of the side-view journey that follows
SC.shrink = (t, s) => { const m = MK, rp = { momo: [[m("jstop") + .1, "surprised"], [m("jstop") + 2.3, "sit"]], basil: [[m("jbelow") + .4, "pointing"], [m("jbelow") + 2.6, "sit"]] };
  // 24 Nov: a SIDE VIEW (lc20.js ringJourney): the buddies stand on the bench at the pencil's foot (in the world), every tag joined to what it names
  return ringJourney(t, s, { tin: m("jslide") + .6, poses: rp }); };
// the pull back out: the science room at normal size; the ring floating, Pip's finger lifting from it
SC.pullout = (t, s) => { const u = 1 - eo((t - s.t0) / .6);
  return room(t, camMix(camOn([GAP[0], GAP[1] - 60], 1.3, 960, 600), camOn([GAP[0], GAP[1] - 40], 4, 960, 540), u), { ro: { finger: 1 - clamp((t - s.t0) / .6) } })
    + bd("basil", 240, 1076, 480, t, { in: s.t0 + .2 }) + bd("momo", 1440, 1010, 380, t, { in: s.t0 + .25, flip: true }) + bd("pip", 1720, 1076, 500, t, { in: s.t0 + .3, flip: true }) + wipe(t, s.t0, "#FFFFFF") + HUD(t); };

/* 7 · the answer is two: a push. EP19's two cards small at the top left (card 2 lit at ansglow; "not a pull" on card 1); the coins YOU +1 and
   BUDDIES +1. Pip and Basil (right) confident, Momo (wrong) shy, to the END of the scene (OUTCOMES `to`). Pip explains: the camera pushes to
   the gap and magenta arrows push up in it on "pushes". The spider on the leg of a lab stool */
const camAns = (t) => { const a = eio((t - LT("m702p") + .3) / 1.2) * (1 - eio((t - LE("m702p") - .4) / 1.2)); return camMix(camOn([960, 640], 1.22, 960, 600), camOn([GAP[0], 800], 1.85, 960, 600), a); };
SC.answer = (t, s) => { window._BUBAT = { pip: [1250, 300] }; const tA = MK("ansglow"), tPu = W("m702p", "pushes") - .1;
  const arrows = t >= tPu ? ppArrows(t, GAP[0], GAP[1], "push", ramp(t, tPu, .3) * (1 - ramp(t, LE("m702p") + 2, .4)), { dir: "v", gap: 14, len: 34, w: 12 }) : "";
  return room(t, camAns(t), { top: arrows })
    + `<g filter="url(#drop)"><rect x="30" y="40" width="460" height="200" rx="24" fill="#FFF8EA" opacity=".92"/></g>` + [0, 1].map((i) => TF(150 + i * 220, 135, .42, dareCard2(i, { id: "an" + i, lit: i === 1 && t >= tA ? spring(t, tA, .45) : 0 }))).join("")
    + tagAt(t, tA + .3, 150, 222, 1, "not a pull", 22)
    + coin(t, MK("coin1") - .1, 1560, 400, "+1", "if you showed two fingers")
    + bd("basil", 240, 1076, 480, t, { in: s.t0 + .1, poses: [[s.t0, "sit"]] }) + (t > s.t0 + .3 ? pickNum("basil", 400, 640, t, s.t0 + .3, "2") : "") + tickChip16(t, tA + .2, 460, 585, .7)
    + bd("momo", 1440, 1010, 380, t, { in: s.t0 + .15, flip: true, poses: [[s.t0, "sit"]] }) + (t > s.t0 + .35 ? pickNum("momo", 1320, 720, t, s.t0 + .35, "1") : "") + xChip16(t, tA + .25, 1370, 665, .7)
    + bd("pip", 1720, 1076, 500, t, { in: s.t0 + .2, flip: true, poses: [[s.t0, "sit"]] }) + (t > s.t0 + .4 ? pickNum("pip", 1880, 640, t, s.t0 + .4, "2") : "") + tickChip16(t, tA + .3, 1860, 580, .7)
    + melt(t, s, "pullout", .3) + HUD(t); };

/* 8 · Basil at the stationery tray: "Which part pulls the most? ... the middle". His bar magnet slides low along the bench to the tray; the
   camera pushes in on the magnet and the tray (straight into the look-closer: no cut). Basil talks, then thinks (a real question). The spider
   on the top edge of the science poster */
const MAGT = [TRAY[0] + 210, TRAY[1] - 14];
const camBench = (t) => { const s = SCN.bench, u = eio((t - s.t0 - .8) / (s.t1 - s.t0 - .8)); return camMix(camOn([960, 560], 1.1, 960, 560), camOn([TRAY[0] + 60, TRAY[1] - 40], 1.95, 900, 600), u); };
const benchWorld = (t, cam) => { const u = eio(clamp((t - SCN.bench.t0 - .6) / 1.2)); return SR20(t, { bench: TF(TRAY[0], TRAY[1], .5, tray20(t)) + ringsAt(t) + pencilsFlat(MAG[0] + 40, MAG[1] + 4) + TF(lerp(MAG[0], MAGT[0], u), lerp(MAG[1] - 18, MAGT[1] - 18, u), .4, bar20(t)) }, cam); };
SC.bench = (t, s) => benchWorld(t, camBench(t))
  + bd("basil", 260, 1076, 480, t, { in: s.t0 + .1, poses: [[s.t0, "sit"], [LE("m801b") + .1, "thinking"]], look: 3 })
  + bd("pip", 1420, 1010, 380, t, { in: s.t0 + .15, flip: true }) + bd("momo", 1700, 1076, 500, t, { in: s.t0 + .2, flip: true }) + HUD(t);
/* [LOOK CLOSER] where is a magnet strongest? (lc20.js lcPolesArt). Faces: Basil at the right the whole time (his idea, the middle, is tested:
   thinking; oops ON `bunch`, and he stays shy to the verdict: the 23 Nov rule); at the left Pip (teaching POLES; cheer after his line:
   achieved), then Momo (teaching ATTRACTION; a smile and a nod), then Pip again (pointing along the row ON `shapes`) */
const peekFace = (who, side, t, tin, tout, poses, o = {}) => { if (t < tin - .05 || (tout !== undefined && t > tout + .3)) return ""; const W_ = LCW, x = side === "l" ? W_.x - W_.w / 2 + 200 : W_.x + W_.w / 2 - 200;
  return bd(who, x, W_.y + W_.h / 2 + 470 * .42 + (1 - eo((t - tin) / .45)) * 350, 470, t, { in: tin, out: tout, poses: [[tin, "sit"], ...(poses || [])], peek: true, tag: false, shadow: false, flip: side === "r", nohop: true, achieved: o.achieved }); };
SC.lcpoles = (t, s) => { window._BUBAT = { '*': [960, 905] }; const cE = camBench(SCN.bench.t1), p = camPt(cE, [MAGT[0] - 100, MAGT[1] - 30]), tm = s.t0 + 1.2, tB = MK("bunch"), tp = LT("m805p") - .5, tmo = LT("m807m") - .5, tSh = MK("shapes");
  return lookCloser(t, s, { tz: s.t0, fx: p[0], fy: p[1], art: lcPolesArt, bgc: "#FFF8EA", set: (tt) => benchWorld(tt, cE), verdict: [`TWO POLES: STRONGEST AT THE ENDS`, GOODC], tv: MK("v_poles"), peek: false,
    over: (tt) => peekFace("basil", "r", tt, tm, undefined, [[tm + .2, "thinking"], [tB + .1, "oops"]])
      + peekFace("pip", "l", tt, tp, tmo - .3, [[LE("m805p") + .1, "cheer"], [LE("m805p") + 2.1, "sit"]], { achieved: true })
      + peekFace("momo", "l", tt, tmo, tSh - .7) + peekFace("pip", "l", tt, tSh - .5, undefined, [[tSh + .1, "pointing"], [tSh + 2.4, "sit"]])
      + lcStrip(tt, "m805s", "The bar magnet has the strongest pull or attraction at the two poles.", { t1: LT("m807m") + 1.5 }) }); };
SC.mark1 = (t, s) => markScene(t, s, { id: "m810", sayId: "m809", who: "momo", n: "1 of 2", text: "A magnet has two poles. It has a North pole and a South pole. A magnet has two poles where attraction is the strongest.", keys: ["two", "poles", "North", "South", "attraction", "strongest"], size: 58, y: 235, footer: FOOT, achieved: true, poses: [[LE("m810") + .2, "cheer"], [LE("m810") + 2.0, "sit"]],
  under: markPoles(t, 1250, 930, .78 * spring(t, s.t0 + .4, .5)) });

/* 9 · HOLD ON! Pip: "The top ring will not come down... so this ring must be broken!" (try: he presses it down and lets go: it springs back,
   twice). His note card on a small easel. The HOLD ON! stamp; the countdown takes the stage (the blue game stage, the ring big and central
   with the floating ring, the clue labels it floats · broken? ON TOP of the ring, YOU cross your arms; only Pip at the side, his thinking
   face standing in for worried). After the bell Pip stays shy through the WHOLE fix; Basil and Momo confident (OUTCOMES `to`). flip: the top
   ring is lifted off the pencil, turned over (a big curved arrow), slid back on and let go; click: it SNAPS down, CLICK (a jolt, a flash and
   burst, Pip's face close-up, shy); flipback: turned back over, it floats again. The spider on the rim of the class plant's pot */
const NOTEP = [600, 846, .4];
const RING_UP = -650;   // 24 Nov: the ring is lifted right OFF the pencil (its tip is at -570) before it is turned over, then slid back on
const topRing = (t) => { const f0 = MK("flip"), c = MK("click"), fb = MK("flipback"), y0 = RG_TOP, yUp = RING_UP, yDown = RG_BOT - 24, bob = 6 * Math.sin(t * 2.4), tr = MK("try");
  // try: pressed down and let go, twice (it springs back up each time; it will not come down to touch)
  const pr = [tr, tr + 1.8].reduce((a, x) => a + (t >= x && t < x + 1.3 ? (t < x + .3 ? eo((t - x) / .3) : 1 - eo((t - x - .3) / 1)) : 0), 0);
  const fin = [tr, tr + 1.8].reduce((a, x) => Math.max(a, t >= x - .4 && t < x + 1.1 ? (t < x ? eo((t - x + .4) / .4) : t < x + .5 ? 1 : 1 - eo((t - x - .5) / .5)) : 0), 0);
  if (t < f0) return { press: .62 * pr, finger: fin };
  if (t < f0 + .8) return { topY: lerp(y0, yUp, eio((t - f0) / .8)) };
  if (t < f0 + 1.4) return { topY: yUp, topSy: Math.cos(Math.PI * eio((t - f0 - .8) / .6)) };
  if (t < c - .25) return { topY: lerp(yUp, y0 + 30, eio((t - f0 - 1.4) / (c - .25 - f0 - 1.4))), topSy: -1 };
  if (t < c) return { topY: lerp(y0 + 30, yDown, ei((t - c + .25) / .25)), topSy: -1 };
  if (t < fb) return { topY: yDown, topSy: -1 };
  if (t < fb + .6) return { topY: lerp(yDown, yUp, eio((t - fb) / .6)), topSy: -1 };
  if (t < fb + 1.1) return { topY: yUp, topSy: -Math.cos(Math.PI * eio((t - fb - .6) / .5)) };
  return { topY: lerp(yUp, y0, eo((t - fb - 1.1) / .9)) + bob * clamp((t - fb - 2.0) / .5) }; };
const flipArrow = (t, f0) => { const k = ramp(t, f0 + .7, .2) * (1 - ramp(t, f0 + 1.7, .3)); if (k < .02) return ""; const x = PEN[0], y = PEN[1] + PK * RING_UP;
  return OP(k, `<path d="M${x - 120} ${y + 5} Q${x} ${y - 90} ${x + 120} ${y + 5}" fill="none" stroke="#fff" stroke-width="18" stroke-linecap="round"/><path d="M${x - 120} ${y + 5} Q${x} ${y - 90} ${x + 120} ${y + 5}" fill="none" stroke="${P.ink}" stroke-width="9" stroke-linecap="round"/><path d="M${x + 92} ${y - 24} L${x + 122} ${y + 7} L${x + 78} ${y + 17}" fill="none" stroke="${P.ink}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>`); };
const camHold = (t) => { const a = eio((t - MK("try") + .8) / 1.2) * (1 - eio((t - W("m902", "cross") + .6) / .8)), b = eio((t - MK("flip") + 1.2) / 1.2);
  return camMix(camMix(camOn([880, 610], 1.12, 960, 560), camOn([GAP[0] - 80, 790], 1.75, 960, 600), a), camOn([GAP[0], 790], 1.7, 960, 600), b); };
const holdWorld = (t, cam) => { const r0 = MK("ring0_hold"), bell = MK("bell_hold"); return SR20(t, { spider: t < r0 - 1 || t > bell + 1 ? SPAT.holdon : false,
  bench: TF(TRAY[0] - 60, TRAY[1], .5, tray20(t)) + TF(NOTEP[0], NOTEP[1], NOTEP[2], pipNote(t)) + TF(MAG[0] + 40, MAG[1] - 18, .4, bar20(t)) + ringsAt(t, topRing(t)) + flipArrow(t, MK("flip")) }, cam); };
const RG = [960, 420], RR = 215;
const HOLD_PIC = [100, .49];   // the HOLD ON! ring's picture: the plasticine's base 100 px below the ring's centre, scale .49 (the pencil's tip 179 px above it)
SC.holdon = (t, s) => { window._BUBAT = { basil: [1250, 260], momo: [1250, 260], pip: [700, 300] }; const b = "m902", c = "m903", r0 = MK("ring0_hold"), bell = MK("bell_hold"), rs = ringState(t, r0, 5), tX = W(b, "cross") - .15, tH = W(b, "hold") - .1, tOne = W(c, "one") - .1, inT = t >= r0 && t < bell, tC = MK("click"), cam = camHold(t);
  const st = ss(tX - .1, tX + .4, t) * (1 - ss(LE(c) + .1, LE(c) + .6, t)), ring = st > .01;
  // the ring's picture (24 Nov fix): ONE cream disc, exactly the inner circle (r = RR - 24, centred on RG), and the picture clipped to it; Pip's
  // pencil, its plasticine and both rings (a clear gap) scaled to fit inside the circle, above the countdown's number badge
  const inner = `<clipPath id="hoC"><circle cx="${RG[0]}" cy="${RG[1]}" r="${RR - 24}"/></clipPath><circle cx="${RG[0]}" cy="${RG[1]}" r="${RR - 24}" fill="#FFFDF6"/><g clip-path="url(#hoC)">${TF(RG[0], RG[1] + HOLD_PIC[0], HOLD_PIC[1], rings20(t))}</g>`;
  const labels = [["it floats", 420, 250, -1], ["broken?", 1500, 250, 1]].map(([l, x, y, sd], i) => { const t0 = tX + .2 + i * .15; return t < t0 ? "" : pline(x - sd * 190, y + 40, RG[0] + sd * RR * .8, RG[1] - RR * .6, ramp(t, t0, .2)) + clue3(x, y, l, spring(t, t0, .4), 54, 520); }).join("");
  const bob = inT ? 16 * Math.sin((t - r0) * Math.PI * 2) : 6 * Math.sin(t * 3), gp = camPt(cam, [GAP[0] + 60, PEN[1] + PK * (RG_BOT - 12)]);
  const world = JOLT(t, [tC], holdWorld(t, cam), 22);
  return world + `<rect width="1920" height="1080" fill="${P.night}" opacity=".06"/>` + (ring ? OP(st, bg("stage")) : "")
    + (ring ? OP(st, TF(RG[0], RG[1], spring(t, tX, .45) * (1 + .035 * (inT ? rs.tick : 0)), `<g transform="translate(${-RG[0]} ${-RG[1]})">${ringTimer(RG[0], RG[1], t < r0 ? 1 : t < bell ? rs.frac : 0, t < r0 ? 5 : t < bell ? rs.secs : 0, t, { R: RR, sw: 34, tick: rs.tick, shut: pulse(t, bell, .01, .6), chg: inT || (t >= bell && t < bell + .5) ? (t >= bell ? bell : rs.chg) : -9, ns: 1.25, inner })}</g>`)
      + labels + TF(1700, 640 + bob, .9 * spring(t, tX + .1, .4), `<g filter="url(#dropS)">${crossedArms()}</g>`) + youPill(1700, 470 + bob * .6, 1.2) + TF(1700, 860, spring(t, tX + .2, .4), tpill(0, 0, "cross your arms", 38, P.ink, "#fff", { w: 700 }))) : "")
    + (t >= tC ? impactFX(t, tC, gp[0] - 60, gp[1] - 40, "CLICK!", { s: .8 }) : "")
    + linkChip(t, tC + .3, gp[0] + 330, gp[1] - 260, gp[0] + 20, gp[1] - 10, 0, "pulled together!", 44, MK("flipback"))
    + linkChip(t, MK("flipback") + 1.1, gp[0] + 330, gp[1] - 300, gp[0] + 40, gp[1] - 90, 1, "pushed up", 44)
    + bd("basil", 1720, 1076, 480, t, { in: LT(c) + .3, flip: true, poses: [[LT(c) + .3, "arms_crossed"]] })
    + bd("momo", 1420, 1010, 380, t, { in: LT(c) + .45, flip: true, poses: [[LT(c) + .45, "arms_crossed"]] })
    + bd("pip", 240, 1076, 500, t, { in: s.t0 + .1, rock: inT ? 2.2 : 0, look: inT ? 6 : 0, poses: [[s.t0, "sit"], [LE("m901p") + .1, "pointing"], [LE("m901p") + 1.6, "sit"], [W(b, "something") + .9, "thinking"], [r0 - .2, "worried"], [bell + .35, "sit"]], jump: [[bell + .02, 30], [tC + .05, 26]], nohop: true })
    + faceCam("pip", t, tC + .05, tC + 1.9, 380, 380, 150, [[tC, "oops"]], { noreact: true })
    + stamp(t, tH, 960, 560, "HOLD ON!") + bellIcon(t, r0) + coin(t, tOne, 1420, 470, "+1", "arms crossed") + smallPrint(t, MK("try"), PHONE_RULE) + HUD(t); };

/* 10 · Momo at the two bar magnets on their round pencils: "So the same two magnets can push and pull? How does that work?" The camera
   pushes in on them (straight into the look-closer). Momo talks, then thinks (a real question). The spider on top of the bookshelf */
const PPM = [[1090, 822], [1330, 822]];
const ppWorld = (t, cam) => SR20(t, { bench: TF(TRAY[0] - 60, TRAY[1], .5, tray20(t)) + ringsAt(t) + PPM.map(([x, y]) => barOnPencils(t, x, y - 30, .4, { glint: false })).join("") }, cam);
const camPP = (t) => { const s = SCN.pushpull, u = eio((t - s.t0 - .5) / (s.t1 - s.t0 - .5)); return camMix(camOn([1100, 640], 1.18, 960, 580), camOn([1210, 780], 1.9, 1000, 620), u); };
SC.pushpull = (t, s) => ppWorld(t, camPP(t))
  + bd("momo", 260, 1076, 500, t, { in: s.t0 + .1, poses: [[s.t0, "sit"], [LE("m1001m") + .1, "thinking"]], look: 3 })
  + bd("pip", 1420, 1010, 380, t, { in: s.t0 + .15, flip: true }) + bd("basil", 1710, 1076, 480, t, { in: s.t0 + .2, flip: true }) + HUD(t);
/* [LOOK CLOSER] pull or push? (lc20.js lcPushPullArt). Faces: Momo at the right the whole time (her question is answered: thinking; cheer ON
   kw_repel: a key word learnt); at the left Basil (teaching REPEL; a smile after), then Pip (a nod at the verdict) */
SC.lcpushpull = (t, s) => { window._BUBAT = { '*': [960, 905] }; const cE = camPP(SCN.pushpull.t1), p = camPt(cE, [1210, 790]), tm = s.t0 + 1.2, tK = MK("kw_repel"), tb = LT("m1007b") - .5, tp = LT("m1008p") - .5;
  return lookCloser(t, s, { tz: s.t0, fx: p[0], fy: p[1], art: lcPushPullArt, bgc: "#FFF8EA", set: (tt) => ppWorld(tt, cE), verdict: [`PULL OR PUSH: IT DEPENDS WHICH POLES FACE`, GOODC], tv: MK("v_pushpull"), peek: false,
    over: (tt) => peekFace("momo", "r", tt, tm, undefined, [[tm + .2, "thinking"], [W("m1003", "red") - .2, "sit"], [tK + .1, "cheer"], [tK + 2.3, "sit"]]) + peekFace("basil", "l", tt, tb, tp - .3) + peekFace("pip", "l", tt, tp) }); };
SC.mark2 = (t, s) => markScene(t, s, { id: "m1010", sayId: "m1009", who: "basil", n: "2 of 2", text: "Magnets can attract (pull) or repel (push) one another. This depends on which poles are facing each other.", keys: ["attract", "(pull)", "repel", "(push)", "poles", "facing"], size: 58, y: 240, footer: FOOT, achieved: true, poses: [[LE("m1010") + .2, "cheer"], [LE("m1010") + 2.0, "sit"]],
  under: markPairs(t, 1250, 935, .72 * spring(t, s.t0 + .4, .5)) });

/* 11 · score hand, the spider (lizReveal: the score hand melts into the science room, ONE push-in onto the spider hanging on its silk thread
   under the edge of the front bench: the REVEAL spot, never the intro window frame); Basil's fun fact: baby spiders on the tips of tall grass
   stems letting out silk (ff_grass), floating up into the sky (ff_up), landing far away (ff_far). Pip points at the spider as it is ringed,
   then is surprised ON ff_grass (a fun fact); Momo listens */
SC.final = (t, s) => { const L = "m1101"; return finalScene(t, s, L, 1, [[s.t0, null, 1], [W(L, "two") - .1, null, 2]]); };
SC.liz = (t, s) => { const L = "m1102", tq = W(L, "it") - .1, c = SPAT.liz, tc = W(L, "spider");
  return lizReveal(t, s, L, SR20(t, { spider: c, bench: benchProps(t) }), c[0], c[1] - 22, tq, "It was hanging under the bench!", -120, 160, 80, 3.0, { from: () => SC.final(SCN.final.t1 - .04, SCN.final), qx: 1000, qy: 724, tx: 960, ty: 985, tell: "m1104",
    fact: { id: "m1103b", at: [1270, 400], w: 900, h: 440, items: [["ff_grass", "baby spiders", ffGrass20], ["ff_up", "the wind lifts them", ffUp20], ["ff_far", "far away!", ffFar20]], cols: ["#4BA862", "#5B6BD6", "#E8A23A"], sx: 1300, sy: 860, poses: [[MK("ff_in") - .4, "sit"]] } })
    + bd("pip", 170, 1076, 330, t, { in: s.t0 + .6, poses: [[s.t0 + .6, "sit"], [tc + .1, "pointing"], [LT("m1103b") - .3, "sit"], [MK("ff_grass") + .1, "surprised"], [MK("ff_grass") + 2.2, "sit"]] })
    + bd("momo", 390, 1076, 330, t, { in: s.t0 + .7, poses: [[s.t0 + .7, "sit"]] }) + smallPrint(t, s.t0 + .5, LOOK_RULE); };

/* 12 · the cliffhanger: Basil's two bar magnets on the front bench in front of THE POLES BOARD (its pull and push pairs drawn). pairs1: a red
   end and a blue end slide together: click (green chip pull); pairs2: one is turned round: a red end to a red end, they push apart (magenta
   chip push); blueends: both turned round: the two BLUE ends come slowly towards each other and stop just before they meet: a big ?. PART 2.
   Basil big at the left (talks, then thinks after his line: his own tricky question); Momo and Pip at the right, turned in to watch */
const CLX = 1060, CLY = 822;
const cliffMags = (t) => { const p1 = MK("pairs1"), p2 = MK("pairs2"), be = MK("blueends"), K = .42, H = 150 * K;
  // pairs1: [N|S] + [N|S] (a blue end meets a red end): they slide together and click. pairs2: the LEFT one is turned round, [S|N] + [N|S]:
  // two red ends push apart. blueends: both turned round, [N|S] + [S|N]: the two BLUE ends come slowly together and stop just before they meet
  let lx = CLX - 200, rx = CLX + 200, lsx = 1, rsx = 1, lf = false, rf = false;
  if (t >= p1 - .8) { const u = eio(clamp((t - p1 + .8) / .8)); lx = lerp(CLX - 200, CLX - H, u); rx = lerp(CLX + 200, CLX + H, u); }
  if (t >= p2 - .9) { const f = clamp((t - p2 + .9) / .5); lsx = Math.cos(Math.PI * f); lf = f > .5; lx = lerp(CLX - H, CLX - H - 40, clamp((t - p2 + .9) / .3)); if (t >= p2) { const u = eo(clamp((t - p2) / .6)); lx = lerp(CLX - H - 40, CLX - 220, u); rx = lerp(CLX + H, CLX + 200, u); } }
  if (t >= be - .7) { const f = clamp((t - be + .7) / .5); lsx = Math.cos(Math.PI * f); rsx = lsx; lf = f <= .5; rf = f > .5; const g = clamp((t - be - .2) / 1.8); lx = lerp(CLX - 220, CLX - H - 26, eio(g)); rx = lerp(CLX + 200, CLX + H + 26, eio(g)); }
  const one = (x, sx, fl, ro) => `<g transform="translate(${n2(x)} ${CLY - 30}) scale(${n2(Math.max(.03, Math.abs(sx)))} 1)">${barOnPencils(t, 0, 0, K, { flip: fl, glint: false, roll: ro })}</g>`;
  return one(lx, lsx, lf, lx - CLX) + one(rx, rsx, rf, rx - CLX); };
const camCliff = (t) => { const s = SCN.cliff, u = eio((t - MK("blueends") + 1) / 2.5); return camMix(camOn([CLX - 40, 600], 1.12, 960, 560), camOn([CLX, 880], 2.0, 1000, 640), u); };
SC.cliff = (t, s) => { const tP = W("m1202", "part") - .1, cam = camCliff(t), g = camPt(cam, [CLX, CLY - 30]);
  return SR20(t, { spider: false, bench: TF(TRAY[0] - 60, TRAY[1], .5, tray20(t)) + TF(PEN[0] - 330, PEN[1], PK, rings20(t)) + cliffMags(t) }, cam)
    + linkChip(t, MK("pairs1") + .4, g[0] - 160, g[1] - 230, g[0], g[1] - 40, 0, "pull", 44, MK("pairs2") - .9) + linkChip(t, MK("pairs2") + .5, g[0] + 160, g[1] - 230, g[0], g[1] - 40, 1, "push", 44, MK("blueends") - .7)
    + (t >= MK("blueends") + 1.6 ? TF(g[0], g[1] - 40, 1, `<circle r="14" fill="none" stroke="${P.sun}" stroke-width="5" opacity="${n2(.5 + .5 * Math.sin(t * 8))}"/>`) + TF(g[0] + 300, g[1] - 300, spring(t, MK("blueends") + 1.6, .45), tpill(0, 0, "two blue ends?", 40, SOUTHC, "#fff", { w: 700 })) : "")
    + qMark20(t, MK("blueends") + 2.0, g[0], g[1] - 200, 64)
    + bd("basil", 280, 1076, 480, t, { in: s.t0 + .1, poses: [[s.t0, "sit"], [LE("m1201b") + .1, "thinking"]], look: 4 })
    + bd("momo", 1480, 1076, 440, t, { in: s.t0 + .15, flip: true, poses: [[s.t0, "sit"]], look: -6, jump: [[LT("m1202") + .2, 20]] })
    + bd("pip", 1760, 1070, 440, t, { in: s.t0 + .2, flip: true, poses: [[s.t0, "sit"]], look: -6, jump: [[LT("m1202") + .35, 20]] })
    + (t >= tP ? slamFit(330, "PART 2", P.sun, slamK(t - tP, 0)) : "") + melt(t, s, "kwrecap", .4) + HUD(t); };
/* 13 · "Now you know!": THE POLES BOARD (filled) and the floating ring between the buddies */
SC.nyk = (t, s) => nykScene(t, s, polesCard(t, 930, 720, .95) + TF(1300, 1030, .3, rings20(t)), { bx: [230, 1730, 1500], hx: 430 });
})(); }
