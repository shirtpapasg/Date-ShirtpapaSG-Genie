// p1.js: PART 1, "Spin a Hanging Magnet. Why Does It Stop the SAME Way?": EP20's dare answered (two, the same way every time), be the
// hanging magnet (spun, slowing, swinging back, stopping facing the rain tree, twice), the answer and Basil's two cones, which way? (Pip: the
// steel goalpost; the same line in three places: FREELY SUSPENDED, NORTH-SOUTH DIRECTION; Mark Sentence 6.17), HOLD ON! (Basil: "nobody is
// holding it, so it is free": the bench rubs; hung up, it turns freely), how does it know? (fly up to see the whole Earth: EARTH BEHAVES
// LIKE A MAGNET; Mark Sentence 6.16), the swallow, the cliffhanger (Momo's compass needle lines up with the cones: is it a magnet?).
// Segments 1-13 of ../p3_ep21_script.md section 4 (version 1, 24 Nov 2026).
// STAGE 2 (drawn 2026-11-24): one real place, a SCHOOL FIELD on Tuesday after school (sets21.js FD21: the rain tree at the far left, the
// goal, the school block, the floodlights and their wire, the fence, the sports shed, the PE trolley, the netball court, THE SPIN CHART at its
// home by the wooden bench, the two plastic chairs with the broom handle and Basil's hanging magnet, the cones); the buddies stand IN the
// scene, big, with a contact shadow; the camera drifts or pushes in and never cuts inside the field. Every pose has its reason
// (SCENES_TODO.md, pose_reasons.json); the buddy who got it wrong stays shy and the right ones confident through the whole fix (lib.js
// OUTCOMES `to`). Every action is drawn AT its mark.
if (PART === 1) { (() => {
const L1 = "m501";
// the scores (script section 3): Round 1 1 : 1 (Pip and Basil right: the Buddies score too), HOLD ON! 2 : 1 (nothing for the Buddies)
SCORE.push([MK("coin1") - .1, 1, 1]);
SCORE.push([W("m903", "one") - .1, 2, 1]);
const FOOT = "P3 · Interactions · Properties of Magnets";
const bd = (who, x, y, h, t, o = {}) => buddy(who, x, y, h, t, o);
const slamFit = (y, txt, col, k) => slamLine(y, txt, Math.min(170, 170 * 1720 / tw(txt, 170, 700, "Fredoka", 4)), col, k);
const field = (t, cam, o = {}) => FD21(t, o, cam);
// a quick spin that settles back to 0 (the red end to the rain tree): turns, d seconds to the stop
const spinQ = (t, t0, turns = 1, d = 2) => { const u = t - t0; if (u <= 0) return 0; if (u > d + 1.6) return 0; return (360 * turns * (1 - Math.pow(Math.max(0, 1 - u / d), 3)) + (u > d * .7 ? 22 * Math.exp(-(u - d * .7) / .5) * Math.sin((u - d * .7) * 7) : 0)) % 360; };
const HG = [HANG[0], HANG[1]];   // the hanging magnet's middle (world)
window.SHELF_AWAY = (t) => { if (PART !== 1) return 0; const a = W("m902", "cross") - .3, b = LE("m903") + .4, w = SCN.waitw; return Math.max(ss(a, a + .35, t) * (1 - ss(b, b + .35, t)), ss(w.t0 + .3, w.t0 + .8, t) * (1 - ss(SCN.pullout.t1, SCN.pullout.t1 + .4, t))); };
const coneK = (t) => { const c = MKS("cones"); return t < c ? false : [spring(t, c, .4), spring(t, c + .3, .4)]; };
const coneLine = (t) => t >= MKS("cones") + .6 ? MKS("cones") + .6 : 0;
// the dashed gold line between the cones: plain until lcplaces names it; with its N and S ends afterwards (nsLine draws both)
const fieldCones = (t) => { const k = coneK(t); return k ? { cones: k, coneLine: t >= MKS("nsline") ? MKS("cones") + .6 : 0 } : {}; };
const coneDash = (t) => { const c = MKS("cones") + .6; if (t < c || t >= MKS("nsline")) return ""; const u = eo((t - c) / .6); return `<path d="M${CONES[0][0] + 30} ${CONES[0][1] - 8} H${n2(CONES[0][0] + 30 + (CONES[1][0] - CONES[0][0] - 60) * u)}" stroke="${NSC}" stroke-width="8" stroke-dasharray="20 12"/>`; };

/* 1 · the cold open, SPEAKING from 0.825 s (SERIES_FORMAT 11 item 1; EP22's approach): the school field on Tuesday after school while Heart
   says "Last time, we asked: Basil hangs his bar magnet on a string, so it can turn freely. He spins it again and again." The place card
   from 0.2 s (about 7.9 s on screen). One slow push towards the turning magnet over the whole scene; no cut. spin1 (at "spins"): he spins it
   again (the same swish and hop). spin0: Basil gives the
   magnet a gentle spin (a swish at its end; he hops back); it turns, slows, swings past and back. budsIn: Momo and Pip lean in (front views
   turned in), Momo waves hello to the viewer. The swallow on the floodlight wire (the intro spot) */
const camCold = (t) => camMix(camOn([960, 600], 1.04, 960, 560), camOn([HG[0], HG[1] - 40], 1.34, 980, 540), eio(t / SCN.cold.t1));
const swishAt = (t, g, tp) => { const sw = clamp((t - tp) / .45); return sw > 0 && sw < 1 ? OP(Math.sin(Math.PI * sw), `<path d="M${n2(g[0] + 60)} ${n2(g[1] + 70)} Q${n2(g[0] + 150)} ${n2(g[1] + 40)} ${n2(g[0] + 170 - 60 * sw)} ${n2(g[1] - 30)}" stroke="#fff" stroke-width="12" fill="none" stroke-linecap="round"/>`) : ""; };
SC.cold = (t, s) => { const tb = MK("budsIn"), tp = MK("spin0"), t1 = MK("spin1"), cam = camCold(t), g = camPt(cam, HG);
  return field(t, cam, { rig: { a: spinAng(t, tp, 2, 4.4) + (t1 !== undefined ? spinAng(t, t1, 2, 4.4) : 0) } })
    + swishAt(t, g, tp) + (t1 !== undefined ? swishAt(t, g, t1) : "")
    + bd("basil", 330, 1076, 480, t, { in: .05, poses: [[0, "sit"]], look: 5, jump: [[tp - .05, 22]].concat(t1 !== undefined ? [[t1 - .05, 22]] : []) })
    + bd("momo", 1430, 1060, 470, t, { in: tb, flip: true, poses: [[tb, "sit"], [tb + .7, "waving"], [tb + 2.6, "sit"]], look: -5, wave: true })
    + bd("pip", 1730, 1076, 500, t, { in: tb + .15, flip: true, poses: [[tb + .15, "sit"]], look: -6 })
    + OP(ramp(t, .2, .4), lowerPill(60, 96, "A school field, Singapore ·", "Tuesday after school")); };

/* 2 · "Last time...": EP20's dare, word for word. ONE calm picture: the two dare cards side by side (EP20's own, ep20dare.js), a gentle
   push-in, the big ?, each card steps forward and lights while Heart says it (>= 2.5 s each) */
SC.lasttime = (t, s) => { const L = "m203", tc = [W(L, "one"), W(L, "two")], z = 1 + .04 * eio((t - s.t0) / 8), k = ramp(t, s.t0 + .05, .5), cur = tc.filter((x) => t >= x - .15).length - 1;
  let cards = ""; [0, 1].forEach((i) => { const fw = cur === i ? ss(tc[i] - .15, tc[i] + .25, t) : (cur > i && i < 1 ? 1 - ss(tc[i + 1] - .15, tc[i + 1] + .25, t) : 0);
    cards += TF(740 + i * 440, 600 + 14 * (1 - spring(t, s.t0 + .2 + i * .15, .45)), .95 * (1 + .1 * fw), dareCard2(i, { pulse: cur === i ? .9 : pulse(t, tc[i], .04, .9), id: "lt" + i }, t)); });
  return bg("stage2") + OP(ramp(t, s.t0, .3), T(960, 110, "Last time…", 60, "#fff", { w: 600 }))
    + OP(k, `<g transform="translate(960 540) scale(${n2(z)}) translate(-960 -540)">${cards}</g>`
      + qMark20(t, W("m202", "where") - .1, 960, 260)
      + TF(960, 1000, spring(t, W("m202", "where") - .1, .4), tpill(0, 0, DARE_LABEL, 40, P.sun, P.ink, { w: 700 }))) + melt(t, s, "cold", .5) + HUD(t); };
/* back on the field: a slow drift round the hanging magnet (Basil has spun it again) that carries on under the title. Pip hides his answer
   (a hop), Basil a secret fist (a hop), Momo a sure little smile: no pose sprites */
const camBack = (t) => { const u = clamp((t - SCN.back.t0) / (SCN.title.t1 - SCN.back.t0)); return camMix(camOn([HG[0] - 60, HG[1] - 30], 1.36, 960, 540), camOn([HG[0] + 50, HG[1] - 40], 1.44, 960, 540), eio(u)); };
const backBuds = (t, t0) => bd("basil", 300, 1076, 480, t, { in: t0, poses: [[t0, "sit"]], look: 4, jump: [[LT("m204") + .5, 14]] }) + bd("momo", 1430, 1060, 470, t, { in: t0 + .1, flip: true, poses: [[t0, "sit"]] })
  + bd("pip", 1730, 1076, 500, t, { in: t0 + .05, flip: true, poses: [[t0, "sit"]], jump: [[LT("m204") + .3, 26]] });
SC.back = (t, s) => field(t, camBack(t), { rig: { a: spinAng(t, SCN.back.t0 - 1.2, 2, 4.4) } }) + backBuds(t, s.t0 + .05) + (t >= LT("m204") - .1 ? TF(960, 300, spring(t, LT("m204") - .1, .4), tpill(0, 0, "Hold on to your answer!", 56, P.sun, P.ink, { w: 700 })) : "") + melt(t, s, "lasttime", .5) + HUD(t);
// the title slam over the dimmed field: SPIN IT AGAIN AND AGAIN. (white) then WHERE DOES IT STOP? (sun yellow)
const TITLE = (k1, k2) => slamFit(400, "SPIN IT AGAIN AND AGAIN.", "#fff", k1) + slamFit(610, "WHERE DOES IT STOP?", P.sun, k2);
SC.title = (t, s) => { const u = t - MK("title"), dim = clamp(u / .2); return lcSet(t, s, "back") + `<rect width="1920" height="1080" fill="${P.night}" opacity="${n2(.78 * dim)}"/>` + TITLE(slamK(u, .05), slamK(u, .55)) + HUD(t); };

/* 3 · today: the camera glides from the hanging magnet to THE SPIN CHART (its three empty rows, held about 2 s from `chart`), then up to the
   floodlight wire, where the game's push-in starts (one move). Basil taps his chart (a hop: showing it, no pose) */
const camChart = camOn([FD.chart[0] + 20, FD.chart[1] - 30], 1.45, 1100, 500), SWI = SWAT.intro, camWire = camOn([SWI[0], SWI[1] - 10], 1.8, 760, 440);
const camToday = (t) => { const s = SCN.today, a = eio((t - s.t0) / 1.3), b = eio((t - (s.t1 - 1.5)) / 1.5); return b > 0 ? camMix(camChart, camWire, b) : camMix(camBack(SCN.title.t1), camChart, a); };
SC.today = (t, s) => { const out = s.t1 - 1.4; window._BUBAT = { '*': [960, 250] };
  return field(t, camToday(t), { rig: { a: spinAng(t, SCN.back.t0 - 1.2, 2, 4.4) } }) + (t >= MK("chart") ? OP(pulse(t, MK("chart"), .05, .8), `<rect width="1920" height="1080" fill="#fff" opacity=".12"/>`) : "")
    + bd("basil", 300, 1076, 480, t, { in: s.t0 + .1, out, poses: [[s.t0, "sit"]], look: -3, jump: [[MK("chart") - .1, 18]] }) + bd("pip", 1440, 1010, 380, t, { in: s.t0 + .15, out: out + .1, flip: true, poses: [[s.t0, "sit"]] })
    + bd("momo", 1730, 1076, 500, t, { in: s.t0 + .2, out: out + .2, flip: true, poses: [[s.t0, "sit"]], look: -3 }) + HUD(t); };
SC.game = (t, s) => { const cE = camToday(SCN.today.t1), p = SWI;
  return gameScene(t, s, ["m302", "m303b", "m304"], false, { world: (tt) => field(tt, cE), A: camPt(cE, [p[0] - 6, p[1] - 12]), T: [680, 440], Z: 2.4, dim0: 0 }) + smallPrint(t, LT("m304"), LOOK_RULE); };
SC.goals = (t, s) => goals3(t, s, [["A freely suspended magnet", ""], ["The North-South direction", ""], ["Earth is like a magnet", ""]], ["m401", "m402", "m403", "m404"], "momo");
SC.r1card = (t, s) => roundCard(t, s, "ROUND 1", "YOUR ANSWER FROM LAST TIME");

/* 5 · Round 1: EP20's dare (a short 3 s ring). EP20's two cards as the ONE set of numbered picture cards; the clue labels a string · spin,
   spin, spin · free to turn ON TOP of the ring; in the ring Basil's magnet on its string, spinning. ON `top` (Momo's pick): a small spinning
   top pops by her, wobbles and falls over (what she means). Basil leads (thinking after the question, worried through the countdown: lockN) */
const spinTop = (t, t0) => { if (t < t0) return ""; const u = t - t0, fall = ss(1.4, 2.0, u), wob = 14 * Math.sin(u * 9) * (1 - fall) * (.4 + u * .4);
  return TF(0, 0, spring(t, t0, .45), `<ellipse cx="0" cy="6" rx="60" ry="10" fill="${P.ink}" opacity=".2"/><g transform="rotate(${n2(wob + 78 * fall)} 0 0)"><path d="M0 0 L-46 -70 Q0 -96 46 -70z" fill="#FF8A3A" stroke="${P.ink}" stroke-width="5"/><path d="M-30 -48 Q0 -40 30 -48" stroke="#fff" stroke-width="6" fill="none"/><ellipse cx="0" cy="-74" rx="46" ry="12" fill="#FFC23A" stroke="${P.ink}" stroke-width="5"/><rect x="-6" y="-104" width="12" height="30" rx="4" fill="${P.ink}"/></g>`); };
SC.r1 = (t, s) => lockN(t, { cards: DARE_CARDS, clues: DARE_CLUES.map((c, i) => [c, W(L1, "where") + .15 * i]), lead: "basil", csize: 32, q: DARE_LABEL, tq: W(L1, "where") - .1,
  tc: [W(L1, "where"), W(L1, "stop")], ring0: MK("ring0_r1"), dur: 3, lock: "m502", pics: [0, 1].map((i) => darePic(i, t)), obj: ringP1,
  picks: [{ who: "momo", id: "m503m", word: "1" }, { who: "pip", id: "m504p", word: "2" }, { who: "basil", id: "m505b", word: "2" }],
  over: (tt) => tt < LE("m503m") + .6 ? TF(1650, 420, 1.1, spinTop(tt, MK("top"))) : "" });

/* 6 · Be the hanging magnet! The camera glides down to the magnet on its string (one glide); the buddies wave the viewer off (goodbye), then
   each shrinks with a pop. The swallow on the edge of the sports shed's roof as the camera passes */
const camWait = (t) => { const s = SCN.waitw, u = eio((t - s.t0) / (s.t1 - s.t0)); return camMix(camOn([HG[0] + 40, HG[1] - 160], 1.2, 960, 500), camOn([HG[0], HG[1]], 4.6, 960, 560), u * u); };
SC.waitw = (t, s) => { const L = "m601", tP = W(L, "be") - .15, sh = W(L, "shrink") - .1;
  const buds = ["basil", "momo", "pip"].map((w, i) => { const x = [300, 1430, 1730][i]; return bd(w, x, [1076, 1060, 1076][i], [470, 460, 490][i], t, { in: s.t0 + .1 + .05 * i, out: sh + .2 * i + .3, flip: x > 960, poses: [[s.t0, "sit"], [tP + .2 + .15 * i, "waving"]], wave: true }); }).join("");
  return field(t, camWait(t), { rig: { a: 0 } }) + OP(1 - ss(s.t1 - 1.0, s.t1 - .5, t), buds + (t >= tP ? TF(960, 250, spring(t, tP, .45), tpill(0, 0, "Be the hanging magnet!", 76, P.sun, P.ink, { w: 700 })) : "") + HUD(t)) + wipe(t, s.t1, "#CFE6F0", 960, 600); };
SC.shrink = (t, s) => { const m = MK, rp = { momo: [[m("jback") + .1, "thinking"], [m("jback") + 2.0, "sit"], [m("jstop2") + .1, "surprised"], [m("jstop2") + 2.2, "sit"]] };
  return magnetJourney(t, s) + riders(t, s, { tin: m("jspin") + .6, h: 200, at: { pip: [230, 1000], basil: [1700, 1004], momo: [420, 996] }, poses: rp })
    + youTag(t, m("jspin"), "You: a bar magnet on a string") + feelTag(t, m("jfinger"), m("jslow") - .2, "to scale: a bar magnet", 170) + feelTag(t, m("jback"), m("jstop") - .2, "something turns you back", 170)
    + feelTag(t, m("jstop"), m("jagain") - .2, "the rain tree", 170) + feelTag(t, m("jstop2"), s.t1, "same way!", 170)
    + (t >= m("jstop") ? TF(1600, 300, spring(t, m("jstop") + .3, .45), tpill(0, 0, t >= m("jstop2") ? "spin 1 ✓ · spin 2 ✓" : "spin 1 ✓", 34, "#fff", P.ink, { w: 700 })) : ""); };
// the pull back out: the field at normal size; the magnet still, its red end towards the rain tree
SC.pullout = (t, s) => { const u = 1 - eo((t - s.t0) / .6);
  return field(t, camMix(camOn([HG[0] - 80, HG[1] + 20], 1.18, 960, 580), camOn([HG[0], HG[1]], 4.6, 960, 560), u), { rig: { a: 0 } })
    + bd("basil", 300, 1076, 480, t, { in: s.t0 + .2 }) + bd("momo", 1440, 1010, 380, t, { in: s.t0 + .25, flip: true }) + bd("pip", 1730, 1076, 500, t, { in: s.t0 + .3, flip: true }) + wipe(t, s.t0, "#FFFFFF") + HUD(t); };

/* 7 · the answer is two: the same way every time. EP20's two cards small at the top left (card 2 lit at ansglow; "not this one" on card 1);
   the coins YOU +1 and BUDDIES +1. Pip and Basil confident, Momo shy, to the END of the scene (OUTCOMES `to`). chart1: an arrow lands in each
   row of THE SPIN CHART, all the same way (the camera pushes to it); Basil explains; cones: he sets two orange cones under the magnet's ends.
   The swallow on the top of the chain-link fence */
const camAns = (t) => { const a = eio((t - MK("chart1") + .3) / 1.1) * (1 - eio((t - LT("m702b") + .2) / 1.4)), b = eio((t - LT("m702b") + .2) / 1.4);
  return camMix(camMix(camOn([900, 620], 1.12, 960, 580), camOn([FD.chart[0] + 30, FD.chart[1] - 20], 1.55, 1060, 520), a), camOn([HG[0], HG[1] + 90], 1.42, 980, 560), b); };
SC.answer = (t, s) => { window._BUBAT = { basil: [1000, 230] }; const tA = MK("ansglow");
  return field(t, camAns(t), { rig: { a: 0 }, ...fieldCones(t), front: coneDash(t) })
    + `<g filter="url(#drop)"><rect x="30" y="40" width="460" height="200" rx="24" fill="#FFF8EA" opacity=".92"/></g>` + [0, 1].map((i) => TF(150 + i * 220, 135, .42, dareCard2(i, { id: "an" + i, lit: i === 1 && t >= tA ? spring(t, tA, .45) : 0 }, t))).join("")
    + tagAt(t, tA + .3, 150, 222, 1, "not this one", 22) + coin(t, MK("coin1") - .1, 1560, 400, "+1", "if you showed two fingers")
    + bd("basil", 280, 1076, 480, t, { in: s.t0 + .1, poses: [[s.t0, "sit"]], jump: [[MK("cones") - .3, 20]] }) + (t > s.t0 + .3 ? pickNum("basil", 440, 640, t, s.t0 + .3, "2") : "") + tickChip16(t, tA + .2, 500, 585, .7)
    + bd("momo", 1440, 1010, 380, t, { in: s.t0 + .15, flip: true, poses: [[s.t0, "sit"]] }) + (t > s.t0 + .35 ? pickNum("momo", 1320, 720, t, s.t0 + .35, "1") : "") + xChip16(t, tA + .25, 1370, 665, .7)
    + bd("pip", 1730, 1076, 500, t, { in: s.t0 + .2, flip: true, poses: [[s.t0, "sit"]] }) + (t > s.t0 + .4 ? pickNum("pip", 1880, 640, t, s.t0 + .4, "2") : "") + tickChip16(t, tA + .3, 1860, 580, .7)
    + melt(t, s, "pullout", .3) + HUD(t); };

/* 8 · Pip: "The red end faces the goalpost. Magnets attract steel, so the goalpost turns it." The camera pushes along the magnet to the white
   goal (the swallow sits on its crossbar, in plain sight). Pip talks (sure), then thinks (a real question) */
const camGoal = (t) => { const s = SCN.goal, u = eio((t - s.t0 - .3) / (s.t1 - s.t0 - .3)); return camMix(camOn([HG[0], HG[1] + 40], 1.4, 1000, 560), camOn([(FD.goal[0] + FD.goal[1]) / 2 + 60, FD.goal[3] + 90], 1.85, 1080, 470), u); };
SC.goal = (t, s) => field(t, camGoal(t), { rig: { a: 0 }, ...fieldCones(t), front: coneDash(t) })
  + bd("pip", 280, 1076, 500, t, { in: s.t0 + .1, poses: [[s.t0, "sit"], [LE("m801p") + .1, "thinking"]], look: 3 })
  + bd("momo", 1440, 1010, 380, t, { in: s.t0 + .15, flip: true }) + bd("basil", 1730, 1076, 480, t, { in: s.t0 + .2, flip: true }) + HUD(t);
/* [LOOK CLOSER] which way? (lc21.js lcPlacesArt). Faces: Pip at the left first (his goalpost idea is tested: thinking; OOPS as the field
   magnet stops far from the goalpost, and he stays shy to the verdict: the 23 Nov rule; he leaves when Basil comes to teach); Momo at the
   right (teaching FREELY SUSPENDED; cheer after her line: achieved); Basil at the left (teaching NORTH-SOUTH DIRECTION; a smile and a nod) */
SC.lcplaces = (t, s) => { window._BUBAT = { '*': [960, 912] }; const cE = camGoal(SCN.goal.t1), p = camPt(cE, HG), tm = s.t0 + 1.2, tO = MK("field") + 1.5, tMo = LT("m805m") - .5, tB = LT("m806b") - .5, tK = MK("kw_freely_suspended"), tK2 = MK("kw_north_south_direction");
  const kwLines = (tt) => { let o = ""; if (tt > tK + .3 && tt < tK + 3.2) { const a = ramp(tt, tK + .3, .3) * (1 - ramp(tt, tK + 2.9, .3)); o += [lcXY(tt, s, PX[0], PY0 + 140), lcXY(tt, s, PX[2] + 80, PY0 + 250)].map(([x, y]) => pline(640, 340, x, y, a)).join(""); }
    if (tt > tK2 + .3 && tt < tK2 + 3.2) { const a = ramp(tt, tK2 + .3, .3) * (1 - ramp(tt, tK2 + 2.9, .3)), [x, y] = lcXY(tt, s, 120, 150); o += pline(1240, 340, x, y, a); } return o; };
  return lookCloser(t, s, { tz: s.t0, fx: p[0], fy: p[1], art: lcPlacesArt, bgc: "#FFF8EA", set: (tt) => field(tt, cE, { rig: { a: 0 }, ...fieldCones(tt), front: coneDash(tt) }), verdict: [`SAME LINE EVERY TIME: NORTH–SOUTH`, GOODC], tv: MK("v_places"), peek: false,
    over: (tt) => kwLines(tt) + peekFace("pip", "l", tt, tm, tB - .3, [[tm + .2, "thinking"], [tO, "oops"]])
      + peekFace("momo", "r", tt, tMo, undefined, [[LE("m805m") + .1, "cheer"], [LE("m805m") + 2.1, "sit"]], { achieved: true })
      + peekFace("basil", "l", tt, tB) }); };
SC.mark1 = (t, s) => markScene(t, s, { id: "m809", sayId: "m808", who: "basil", n: "1 of 2", text: "A freely suspended magnet comes to rest in the North-South direction.", keys: ["freely", "suspended", "magnet", "comes", "rest", "North-South", "direction."], size: 66, y: 250, footer: FOOT, achieved: true, poses: [[LE("m809") + .2, "cheer"], [LE("m809") + 2.0, "sit"]],
  under: markHang(t, 1250, 900, .7 * spring(t, s.t0 + .4, .5)) });

/* 9 · HOLD ON! Basil: "My string got tangled, so I laid the magnet on the bench. Nobody is holding it, so it is free!" tangle: he holds up a
   tangled knot of string; try: the magnet lies flat on the WOODEN BENCH and he spins it: it scrapes round and stops one way; again another
   way; a third time another way (three chalk arrows on the bench's back rail). His note card on THE SPIN CHART's tray. The HOLD ON! stamp;
   the countdown takes the stage (the blue game stage, the ring big and central with the magnet on the bench, the clue labels on the bench ·
   nobody holding it · free? ON TOP of the ring, YOU cross your arms; only Basil at the side, thinking: it is his own idea on trial). After the
   bell Basil stays shy through the WHOLE fix; Pip and Momo confident (OUTCOMES `to`). rubs: a magenta chip "the bench rubs: not free to
   turn" joined to the magnet; hangup: Pip hangs it back from the broom handle; freeturn: it turns freely, slows and stops along the cones'
   line (a gentle camera nudge as it stops; a close-up of Momo's face, a nod in her confident pose); a green chip "free to turn!". The swallow
   on the handle of the PE trolley (not in the countdown) */
const BNC = [FD.bench[0] + 10, FD.bench[1] - 102];   // where the magnet lies on the bench seat (world)
const benchStops = [40, -55, 125];
const benchAng = (t) => { const tr = MK("try"); let a = 0; for (let i = 0; i < 3; i++) { const t0 = tr + .9 * i; if (t >= t0) { const u = clamp((t - t0) / .75); a = (i ? benchStops[i - 1] : 0) + (benchStops[i] + 360 - (i ? benchStops[i - 1] : 0)) * (1 - Math.pow(1 - u, 2)); } } return a % 360; };
const flatMag = (t, a, k = .55) => { const c = Math.cos(a * Math.PI / 180); return `<ellipse cx="0" cy="22" rx="${n2(90 * Math.max(.3, Math.abs(c)))}" ry="8" fill="${P.ink}" opacity=".25"/><g transform="scale(${n2(Math.max(.12, Math.abs(c)) * k)} ${n2(k * .62)})">${bar20(t, { glint: false, flip: c < 0 })}</g>`; };
const chalkArrows = (t) => { const tr = MK("try"); return [0, 1, 2].map((i) => { const t0 = tr + .9 * i + .8; if (t < t0) return ""; const x = FD.bench[0] - 110 + i * 110, y = FD.bench[1] - 168, a = [180, -40, 70][i];
  return OP(ramp(t, t0, .25), `<g transform="translate(${x} ${y}) rotate(${a})"><path d="M-26 0 H22 M8 -12 L24 0 L8 12" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity=".9"/></g>`); }).join(""); };
const tangleStr = (t, t0, t1) => t < t0 || t > t1 + .3 ? "" : OP(1 - ramp(t, t1, .3), TF(470, 690, 1.3 * spring(t, t0, .45), `<path d="M0 -120 V-60" stroke="#7A7060" stroke-width="4"/><path d="M-10 -60 c40 -30 60 30 10 30 c-60 0 -40 -50 10 -40 c50 10 20 60 -20 50 c-40 -10 -20 -60 30 -50 c30 10 30 40 -10 50 M10 -20 q30 30 0 70" stroke="#F4F2EC" stroke-width="6" fill="none"/><path d="M-10 -60 c40 -30 60 30 10 30 c-60 0 -40 -50 10 -40 c50 10 20 60 -20 50 c-40 -10 -20 -60 30 -50 c30 10 30 40 -10 50 M10 -20 q30 30 0 70" stroke="#7A7060" stroke-width="2.5" fill="none"/>`));
const holdPic = (t) => `<circle cx="430" cy="470" r="190" fill="#FFF8EA"/>` + TF(430, 560, .9, `<path d="M-200 -60 H200 L180 0 H-180z" fill="url(#woodG)" stroke="#7A4A22" stroke-width="5"/><path d="M-170 -40 H170 M-180 -20 H180" stroke="#7A4A22" stroke-width="2" opacity=".5"/>`) + TF(430, 470, 1, flatMag(t, 30 * Math.sin(t * .8) + 20, .9))
  + [[330, 380, 160], [430, 360, -30], [530, 390, 70]].map(([x, y, a]) => `<g transform="translate(${x} ${y}) rotate(${a})"><path d="M-26 0 H22 M8 -12 L24 0 L8 12" stroke="${P.ink}" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity=".55"/></g>`).join("");
const hangA = (t) => { const h = MK("hangup"); return t < h + .4 ? null : spinQ(t, h + .6, 1, 1.5); };
const camHold = (t) => { const a = eio((t - MK("try") + .8) / 1.2) * (1 - eio((t - MK("hangup") + .9) / 1.1)), b = eio((t - MK("hangup") + .9) / 1.1);
  return camMix(camMix(camOn([820, 680], 1.12, 960, 560), camOn([BNC[0], BNC[1] + 20], 1.85, 960, 620), a), camOn([HG[0] - 40, HG[1] + 60], 1.5, 1000, 560), b); };
const holdWorld = (t, cam) => { const r0 = MK("ring0_hold"), bell = MK("bell_hold"), ha = hangA(t), onB = ha === null;
  return field(t, cam, { swallow: t < r0 - 1 || t > bell + 1 ? SWAT.holdon : false, rig: onB ? {} : { a: ha }, ...fieldCones(t), chart: { note: t >= MK("try") + 2.4 },
    bench: (onB ? TF(BNC[0], BNC[1], 1, flatMag(t, t >= MK("try") ? benchAng(t) : 0)) : "") + chalkArrows(t), front: coneDash(t) }); };
const RG = [960, 420], RR = 215;
SC.holdon = (t, s) => { window._BUBAT = { basil: [1250, 260], momo: [1250, 260], pip: [1300, 250] }; const b = "m902", c = "m903", r0 = MK("ring0_hold"), bell = MK("bell_hold"), rs = ringState(t, r0, 5), tX = W(b, "cross") - .15, tH = W(b, "hold") - .1, tOne = W(c, "one") - .1, inT = t >= r0 && t < bell, tF = MK("freeturn") + 1.0, cam = camHold(t);
  const st = ss(tX - .1, tX + .4, t) * (1 - ss(LE(c) + .1, LE(c) + .6, t)), ring = st > .01;
  const inner = `<circle cx="${RG[0]}" cy="${RG[1]}" r="${RR - 24}" fill="#FFFDF6"/><g transform="translate(${RG[0]} ${RG[1] + 20}) scale(1.05) translate(-430 -470)">${holdPic(t)}</g>`;
  const labels = [["on the bench", 400, 260, -1], ["nobody holding it", 1520, 260, 1], ["free?", 420, 560, -1]].map(([l, x, y, sd], i) => { const t0 = tX + .2 + i * .15; return t < t0 ? "" : pline(x - sd * 190, y + 20, RG[0] + sd * RR * .8, RG[1] + (y > 400 ? RR * .5 : -RR * .6), ramp(t, t0, .2)) + clue3(x, y, l, spring(t, t0, .4), 54, 520); }).join("");
  const bob = inT ? 16 * Math.sin((t - r0) * Math.PI * 2) : 6 * Math.sin(t * 3), gb = camPt(cam, BNC), gm = camPt(cam, HG);
  const world = JOLT(t, [tF], holdWorld(t, cam), 10);
  return world + (ring ? OP(st, bg("stage")) : "")
    + (ring ? OP(st, TF(RG[0], RG[1], spring(t, tX, .45) * (1 + .035 * (inT ? rs.tick : 0)), `<g transform="translate(${-RG[0]} ${-RG[1]})">${ringTimer(RG[0], RG[1], t < r0 ? 1 : t < bell ? rs.frac : 0, t < r0 ? 5 : t < bell ? rs.secs : 0, t, { R: RR, sw: 34, tick: rs.tick, shut: pulse(t, bell, .01, .6), chg: inT || (t >= bell && t < bell + .5) ? (t >= bell ? bell : rs.chg) : -9, ns: 1.25, inner })}</g>`)
      + labels + TF(1700, 640 + bob, .9 * spring(t, tX + .1, .4), `<g filter="url(#dropS)">${crossedArms()}</g>`) + youPill(1700, 470 + bob * .6, 1.2) + TF(1700, 860, spring(t, tX + .2, .4), tpill(0, 0, "cross your arms", 38, P.ink, "#fff", { w: 700 }))) : "")
    + (ring ? "" : tangleStr(t, MK("tangle"), MK("try") + .4))
    + linkChip(t, MK("rubs") + .3, gb[0] - 40, gb[1] - 200, gb[0], gb[1] - 10, 1, "the bench rubs: not free to turn", 40, MK("hangup") - .6)
    + linkChip(t, MK("freeturn") + .3, gm[0] + 330, gm[1] - 220, gm[0] + 40, gm[1] - 20, 0, "free to turn!", 44)
    + (t >= tF ? `<circle cx="${n2(gm[0])}" cy="${n2(gm[1])}" r="${n2(120 + 400 * eo((t - tF) / .6))}" fill="none" stroke="${NSC}" stroke-width="${n2(10 * (1 - clamp((t - tF) / .6)))}" opacity="${n2(1 - clamp((t - tF) / .6))}"/>` : "")
    + bd("pip", 1720, 1076, 500, t, { in: LT(c) + .3, flip: true, poses: [[LT(c) + .3, "arms_crossed"]] })
    + bd("momo", 1420, 1010, 380, t, { in: LT(c) + .45, flip: true, poses: [[LT(c) + .45, "arms_crossed"]] })
    + bd("basil", 250, 1076, 480, t, { in: s.t0 + .1, rock: inT ? 2.2 : 0, look: inT ? 6 : 0, poses: [[s.t0, "sit"], [LE("m901b") + .1, "pointing"], [Math.max(LE("m901b") + 1.2, W(b, "something") + .9), "thinking"], [bell + .35, "sit"]], jump: [[MK("tangle") - .05, 16], [bell + .02, 30]], nohop: true })
    + faceCam("momo", t, tF + .1, tF + 2.2, 640, 330, 150, [[tF + .1, "arms_crossed"]], { noreact: true })
    + stamp(t, tH, 960, 560, "HOLD ON!") + bellIcon(t, r0) + coin(t, tOne, 1420, 470, "+1", "arms crossed") + smallPrint(t, MK("try"), PHONE_RULE) + HUD(t); };

/* 10 · Momo at the still magnet: "But how does the magnet know which way is North? Nothing is touching it!" (talks, then thinks: a real
   question); Basil: "Maybe a giant magnet is hiding somewhere, turning it round!" (his guess: a bold hop after his line). The camera pushes in
   on the still magnet (straight into the look-closer: no cut). The swallow on the top edge of THE SPIN CHART's frame */
const camEarthq = (t) => { const s = SCN.earthq, u = eio((t - s.t0 - .3) / (s.t1 - s.t0 - .3)); return camMix(camOn([900, 600], 1.05, 960, 560), camOn([HG[0], HG[1] - 20], 1.5, 1000, 560), u); };
SC.earthq = (t, s) => field(t, camEarthq(t), { rig: { a: 0 }, ...fieldCones(t) })
  + bd("momo", 290, 1076, 500, t, { in: s.t0 + .1, poses: [[s.t0, "sit"], [LE("m1001m") + .1, "thinking"]], look: -4 })
  + bd("pip", 1440, 1010, 380, t, { in: s.t0 + .15, flip: true }) + bd("basil", 1730, 1076, 480, t, { in: s.t0 + .2, flip: true, jump: [[LE("m1002b") + .1, 26]] }) + HUD(t);
/* [LOOK CLOSER] fly up and see the whole Earth (lc21.js lcEarthArt). Faces: Momo at the left the whole time (her question is answered:
   thinking; eyes wide as the Earth appears: listening; CHEER at EARTH BEHAVES LIKE A MAGNET: a key word learnt); Basil at the right from the
   key word (surprised: his wild guess was nearly right; then he teaches what it means; a smile) */
SC.lcearth = (t, s) => { window._BUBAT = { '*': [960, 912] }; const cE = camEarthq(SCN.earthq.t1), p = camPt(cE, HG), tm = s.t0 + 1.2, tK = MK("kw_earth_behaves_like_a_magnet");
  return lookCloser(t, s, { tz: s.t0, fx: p[0], fy: p[1], art: lcEarthArt, bgc: "#0B1033", set: (tt) => field(tt, cE, { rig: { a: 0 }, ...fieldCones(tt) }), verdict: [`THE EARTH TURNS IT: NO TOUCHING`, GOODC], tv: MK("v_earth"), peek: false,
    over: (tt) => peekFace("momo", "l", tt, tm, undefined, [[tm + .2, "thinking"], [MK("earth") - .2, "sit"], [tK + .1, "cheer"], [tK + 2.3, "sit"]])
      + peekFace("basil", "r", tt, tK - .3, undefined, [[tK + .15, "surprised"], [tK + 2.4, "sit"]]) }); };
SC.mark2 = (t, s) => markScene(t, s, { id: "m1008", sayId: "m1007", who: "pip", n: "2 of 2", text: "Earth behaves like a magnet with its own North and South poles. It interacts with a freely suspended magnet. This causes the freely suspended magnet to always point in the North-South direction.", keys: ["Earth", "behaves", "like", "its", "own", "North", "South", "poles.", "interacts", "always", "point", "North-South", "direction."], size: 50, y: 225, footer: FOOT, achieved: true, poses: [[LE("m1008") + .2, "cheer"], [LE("m1008") + 2.0, "sit"]],
  under: markEarth(t, 1250, 900, .62 * spring(t, s.t0 + .4, .5)) });

/* 11 · score hand; the swallow (lizReveal: the score hand melts into the field, ONE push-in onto the swallow on the rim of the near netball
   hoop: the REVEAL spot, never the intro wire); Basil's fun fact (ff_map, ff_earth, ff_way). Pip points at the swallow once it is ringed,
   Momo is surprised ON ff_earth (a real surprise), Pip waves goodbye at "Tell someone at home!" */
SC.final = (t, s) => { const L = "m1101"; return finalScene(t, s, L, 1, [[s.t0, null, 1], [W(L, "two") - .1, null, 2]]); };
SC.liz = (t, s) => { const L = "m1102", tq = W(L, "it") - .1, c = SWAT.liz, tc = W(L, "swallow"), sw = clamp((t - s.t0 - 2.2) / 1.4);
  const swoop = sw > 0 && sw < 1 ? TF(lerp(1300, 2100, sw), 560 - 120 * Math.sin(Math.PI * sw), .22, swallowFly(t, { look: 1, ph: 2 })) : "";
  return lizReveal(t, s, L, field(t, null, { swallow: c, rig: { a: 0 }, ...fieldCones(t), front: swoop }), c[0] - 4, c[1] - 10, tq, "It was on the netball hoop!", -120, 160, 80, 3.2, { from: () => SC.final(SCN.final.t1 - .04, SCN.final), qx: 1000, qy: 724, tx: 960, ty: 985, tell: "m1104",
    fact: { id: "m1103b", at: [1270, 400], w: 900, h: 440, items: [["ff_map", "from far away", ffMap21], ["ff_earth", "they feel the Earth's magnet", ffEarth21], ["ff_way", "it helps them find the way", ffWay21]], cols: ["#4BA862", "#5B6BD6", "#E8A23A"], sx: 1300, sy: 860, poses: [[MK("ff_in") - .4, "sit"]] } })
    + bd("pip", 170, 1076, 330, t, { in: s.t0 + .6, poses: [[s.t0 + .6, "sit"], [tc + .2, "pointing"], [LT("m1103b") - .3, "sit"], [LT("m1104") - .1, "waving"], [LE("m1104") + 1.6, "sit"]], wave: true })
    + bd("momo", 390, 1076, 330, t, { in: s.t0 + .7, poses: [[s.t0 + .7, "sit"], [MK("ff_earth") + .1, "surprised"], [MK("ff_earth") + 2.2, "sit"]] }) + smallPrint(t, s.t0 + .5, LOOK_RULE); };

/* 12 · the cliffhanger: Momo holds her clear hiking compass flat over the cones (compass: a magnifier opens on it: its needle swings, slows
   and settles along the cones' line, red end towards the rain tree); a big ? by the needle (qneedle); PART 2. Momo big at the left (talks,
   then thinks: her own question); Basil and Pip at the right, turned in to watch the needle; all three hop on "Find out in Part Two!" */
const camCliff = (t) => { const s = SCN.cliff, u = eio((t - s.t0) / 2.5); return camMix(camOn([HG[0], HG[1] + 120], 1.3, 1000, 560), camOn([HG[0] + 20, HG[1] + 160], 1.5, 1040, 600), u); };
SC.cliff = (t, s) => { const tP = W("m1202", "part") - .1, cam = camCliff(t), tc = MKS("compass"), g = camPt(cam, [HG[0], CONES[0][1] - 20]), hand = [450, 870];
  return field(t, cam, { swallow: false, rig: { a: 0 }, ...fieldCones(t) })
    + bd("momo", 330, 1076, 500, t, { in: s.t0 + .1, poses: [[s.t0, "sit"], [LE("m1201m") + .1, "thinking"]], look: 3, jump: [[LT("m1202") + .1, 20]] })
    + TF(hand[0], hand[1], .42, compass21(t, settle21(t, tc, 20, 1.0, 4.6, -90), 0, { sy: .55 }))
    + magni21(t, tc - .1, 1420, 370, 200, hand[0] + 60, hand[1] - 20, cliffMagni(t, tc), "Momo's compass")
    + qMark20(t, MK("qneedle") + .2, 1690, 190, 60)
    + bd("pip", 1500, 1076, 440, t, { in: s.t0 + .15, flip: true, poses: [[s.t0, "sit"]], look: -6, jump: [[LT("m1202") + .2, 20]] })
    + bd("basil", 1760, 1070, 440, t, { in: s.t0 + .2, flip: true, poses: [[s.t0, "sit"]], look: -6, jump: [[LT("m1202") + .35, 20]] })
    + smallPrint(t, s.t0 + .3, PHONE_RULE) + (t >= tP ? slamFit(330, "PART 2", P.sun, slamK(t - tP, 0)) : "") + melt(t, s, "kwrecap", .4) + HUD(t); };
/* 13 · "Now you know!": THE SPIN CHART (complete) and the hanging magnet over its cones between the buddies */
SC.nyk = (t, s) => nykScene(t, s, nykP1(t), { bx: [230, 1760, 1570], hx: 400 });
})(); }
