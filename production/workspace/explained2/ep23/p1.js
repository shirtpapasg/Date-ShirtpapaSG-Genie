// p1.js: PART 1, "Take the Battery Away. Do the Clips STAY or DROP?": EP22's dare answered (two, the clips drop off), be the iron nail in
// a coil, the answer and ELECTRICAL METHOD (Momo), is it still a magnet? (battery away, on, off, the scrapyard crane: ELECTROMAGNET, Pip;
// Mark Sentence 7.4, Momo), HOLD ON! (Momo and the wall socket; Basil's fix; the WARNING strip 7.5), what makes it a magnet? (the battery
// alone, the nail alone, one end, both ends: COIL, Basil; Mark Sentence 7.4's three steps, Basil), the millipede, the cliffhanger (no more
// batteries). Segments 1-12 of ../p3_ep23_script.md section 4 (version 1, approved 25 Nov 2026).
// One real place, a COFFEE SHOP in an industrial estate on Saturday morning, across the road from a scrap metal yard (sets23.js CS23). The
// buddies stand IN the scene, big, with a contact shadow; the coiled nail a buddy holds is drawn at that buddy's paws (art23.js rigW), its
// battery holder on the table; the camera drifts or pushes in and never cuts inside the place. Every pose has its reason (STATE.md); the
// buddy who got it wrong stays shy and the right ones confident through the whole fix (lib.js OUTCOMES `to`). In every close-up
// demonstration the buddies WATCH the object (art23.js watchO), and at most one buddy a scene glances at the viewer with a wave.
if (PART === 1) { (() => {
// the scores (script section 3): Round 1 1 : 1 (Pip and Momo right for the right reason), HOLD ON! 2 : 1
SCORE.push([MK("coin1") - .1, 1, 1]);
SCORE.push([W("m803", "one") - .1, 2, 1]);
const FOOT = "P3 · Making and Using Magnets · The electrical method";
const bd = (who, x, y, h, t, o = {}) => buddy(who, x, y, h, t, o);
const slamFit = (y, txt, col, k) => slamLine(y, txt, Math.min(170, 170 * 1720 / tw(txt, 170, 700, "Fredoka", 4)), col, k);
window.SHELF_AWAY = (t) => { const a = W("m802", "cross") - .3, b = LE("m803") + .4, w = SCN.waitw; return Math.max(ss(a, a + .35, t) * (1 - ss(b, b + .35, t)), ss(w.t0 + .3, w.t0 + .8, t) * (1 - ss(SCN.pullout.t1, SCN.pullout.t1 + .4, t))); };
// the board's fills (they stay filled once made): box1 the answer, box2 (Mark Sentence 1), box3's three icons as the WARNING strip's three
// sentences are read, the four ticks of "What we need" (need)
const S3 = () => { const L = TL.lines.m805s, ws = L.words, i2 = ws.findIndex((w, i) => i > 3 && w.w === "Do"), i3 = ws.findIndex((w, i) => i > i2 && w.w === "Do"); return [ws[0].a, ws[i2].a, ws[i3].a]; };
const BOARD = () => ({ box1: MK("box1"), box2: MK("box2"), box3: S3()[0], icons: S3(), need: MK("need") });
const cs = (t, cam, o = {}) => CS23(t, { boardO: BOARD(), ...o }, cam);
const W0 = [1, 960, 540];
// the props on the round table: the mini crane, its scrap tray (with the steel bolt), the paper lorry, the tray of steel clips by Momo,
// the paper bag of new nails, the wire's reel
const CR = [945, 872, .5], CRT = () => craneTip(CR[0], CR[1], CR[2]), SCRAP = [820, 886, .42], LORRY = [1045, 882, .36], CLIPS = [585, 902, .45], HOLD = [712, 856], BAG = [1440, 872];
const tableTop = (t, o = {}) => (o.crane === false ? "" : miniCrane23(t, CR[0], CR[1], CR[2], o.craneO || {})) + scrapTray23(t, SCRAP[0], SCRAP[1], SCRAP[2], o.scrapO || {}) + paperLorry23(t, LORRY[0], LORRY[1], LORRY[2], o.lorryO || {})
  + (o.clips === false ? "" : trayClips22(t, CLIPS[0], CLIPS[1], CLIPS[2], { n: o.clipN === undefined ? 22 : o.clipN })) + (o.bag === false ? "" : paperBag22(BAG[0], BAG[1], .3));
// the buddies' usual places: Momo big at the left (her paws at the table's edge), Basil big at the right, Pip in the mid-ground
const MO = [330, 1040, 480], BA = [1720, 1076, 480], PI = [1450, 1010, 400];
// Momo's coiled nail at her paws (rigW), drawn in SCREEN space (the buddies are not moved by the camera) between the world and Momo (her
// paw over the nail's head); its holder stands on the table at HOLD and the tray at CLIPS (world), mapped to the screen through the scene's
// camera every frame, so the leads always reach the holder. Cameras near Momo's coil zoom about the tray (it stays where the tip is).
const momoRig = (t, cam, o = {}) => { const [px, py] = pawPt("momo", MO[0], MO[1], MO[2], false), z = cam[0], c = o.clips;
  return rigW(t, { head: [px, py + (o.dy || 0)], ang: 16, k: .7, hold: o.hold === false ? null : camPt(cam, HOLD), hk: .42 * z, ...o, reel: o.reel ? camPt(cam, o.reel) : undefined, clips: c ? [c[0], { ...(c[1] || {}), ...(c[1] && c[1].t0 !== undefined ? { from: camPt(cam, [CLIPS[0], CLIPS[1] - 24]) } : {}) }] : null, ck: .7 }); };
const momoTip = (o = {}) => { const [px, py] = pawPt("momo", MO[0], MO[1], MO[2], false); return rigTip({ head: [px, py + (o.dy || 0)], ang: 16, k: .7 }); };

/* 1 · the cold open, SPEAKING from 0.825 s: the coffee shop on Saturday morning; Momo coils the long wire round a new iron nail in neat turns
   (coil0 .. join0), clips the bare ends to the holder's leads on "joins" (join0), and lowers the nail: the clips jump to its tip on
   "attracts" (clips0). Pip turns to the viewer with a wave on Heart's first words (hello), then watches; Basil watches the clips. The yard's
   crane lifts a tangle slowly across the road (it does NOT drop it here). The place card from 0.2 s; one slow push towards Momo's paws */
const camCold = (t) => camMix(camOn([960, 600], 1.02, 960, 560), camOn([CLIPS[0], CLIPS[1]], 1.32, CLIPS[0], CLIPS[1]), eio(t / SCN.cold.t1));
SC.cold = (t, s) => { const c0 = MK("coil0"), j0 = MK("join0"), cl = MK("clips0"), nt = clamp((t - c0) / (j0 - .7 - c0)) * 10, jA = eo(clamp((t - j0) / .35)), jB = eo(clamp((t - j0 - .4) / .35)), down = t >= cl - .5 && t < cl + .6 ? Math.sin(Math.PI * clamp((t - cl + .5) / 1.1)) * 26 : 0;
  const cam = camCold(t), rig = momoRig(t, cam, { nt, reel: [470, 930], jA, jB, flow: jA * jB > .9 ? clamp((t - j0 - .8) / .5) : 0, tag: t >= j0 + .4 ? "on" : undefined, dy: down, clips: t >= cl ? [5, { t0: cl, from: [CLIPS[0], CLIPS[1] - 20] }] : null, clipN: 16 });
  const tip = momoTip();
  return cs(t, cam, { top: tableTop(t, { clipN: t >= cl ? 16 : 22 }) }) + rig
    + bd("basil", BA[0], BA[1], BA[2], t, { in: -1, ...watchO(BA[0], tip[0]) })
    + bd("pip", PI[0], PI[1], PI[2], t, { in: -1, ...watchO(PI[0], tip[0]), poses: [[0, "sit"], ...glanceWave(.9)] })
    + bd("momo", MO[0], MO[1], MO[2], t, { in: -1, ...watchO(MO[0], tip[0]) })
    + OP(ramp(t, .2, .4) * (1 - ramp(t, 9.6, .4)), lowerPill(60, 96, "A coffee shop across from a scrap metal yard, Singapore ·", "Saturday morning")) + smallPrint(t, s.t0 + 2.4, ADULT_RULE) + smallPrint(t, s.t0 + 3.2, YARD_RULE, 1); };

/* 2 · "Last time...": EP22's dare, word for word. ONE calm picture: EP22's own two dare cards (ep22dare.js, unchanged) over the coffee shop
   table softly blurred (Momo's coil held BEFORE the battery is taken away: no answer); each card steps forward and lights while Heart says it */
const dareCard23 = (i, o = {}, t = 0) => choiceCard3(i + 1, DARE_CARDS[i], darePic22(i, t), { w: 420, h: 330, size: 32, ...o });
SC.lasttime = (t, s) => { const L = "m103", tc = [W(L, "one"), W(L, "two")], z = 1 + .04 * eio((t - s.t0) / 8), k = ramp(t, s.t0 + .05, .5), cur = tc.filter((x) => t >= x - .15).length - 1;
  let cards = ""; [0, 1].forEach((i) => { const fw = cur === i ? ss(tc[i] - .15, tc[i] + .25, t) : (cur > i && i < 1 ? 1 - ss(tc[i + 1] - .15, tc[i + 1] + .25, t) : 0);
    cards += TF(740 + i * 440, 600 + 14 * (1 - spring(t, s.t0 + .2 + i * .15, .45)), .95 * (1 + .1 * fw), dareCard23(i, { pulse: cur === i ? .9 : pulse(t, tc[i], .04, .9), id: "lt" + i }, t)); });
  return `<g filter="url(#b10)">${cs(t, camCold(SCN.cold.t1), { top: tableTop(t, { clipN: 16 }), bug: false }) + momoRig(t, camCold(SCN.cold.t1), { flow: .8, tag: "on", clips: [5, {}] })}</g><rect width="1920" height="1080" fill="${P.night}" opacity=".45"/>`
    + OP(ramp(t, s.t0, .3), T(960, 110, "Last time…", 60, "#fff", { w: 600 }))
    + OP(k, `<g transform="translate(960 540) scale(${n2(z)}) translate(-960 -540)">${cards}</g>` + qMark20(t, W("m102", "what") - .1, 960, 260)
      + TF(960, 1000, spring(t, W("m102", "what") - .1, .4), tpill(0, 0, DARE_LABEL, 40, P.sun, P.ink, { w: 700 }))) + melt(t, s, "cold", .5) + HUD(t); };
/* back at the table: Momo holds the coiled nail with its clips, the holder still joined, about to take it away. "Hold on to your answer!":
   Momo a sure little smile, Basil a hop (a secret), Pip a small hop (fun suspense). A slow drift round the coil that carries on under the title */
const camBack = (t) => { const u = clamp((t - SCN.back.t0) / (SCN.title.t1 - SCN.back.t0)); return camMix(camOn([CLIPS[0], CLIPS[1]], 1.32, CLIPS[0], CLIPS[1]), camOn([CLIPS[0], CLIPS[1]], 1.4, CLIPS[0], CLIPS[1]), eio(u)); };
SC.back = (t, s) => { const tip = momoTip();
  return cs(t, camBack(t), { top: tableTop(t, { clipN: 16 }) }) + momoRig(t, camBack(t), { flow: .8, tag: "on", clips: [5, {}] })
    + bd("basil", BA[0], BA[1], BA[2], t, { in: s.t0 + .05, ...watchO(BA[0], tip[0]), jump: [[LT("m104") + .5, 14]] }) + bd("pip", PI[0], PI[1], PI[2], t, { in: s.t0 + .1, ...watchO(PI[0], tip[0]), jump: [[LT("m104") + .2, 18]] })
    + bd("momo", MO[0], MO[1], MO[2], t, { in: s.t0, ...watchO(MO[0], tip[0]) })
    + (t >= LT("m104") - .1 ? TF(960, 330, spring(t, LT("m104") - .1, .4), tpill(0, 0, "Hold on to your answer!", 56, P.sun, P.ink, { w: 700 })) : "") + melt(t, s, "lasttime", .5) + HUD(t); };
// the title slam over the dimmed table: TAKE THE BATTERY AWAY. (white) then STAY OR DROP? (sun yellow)
const TITLE = (k1, k2) => slamFit(400, "TAKE THE BATTERY AWAY.", "#fff", k1) + slamFit(610, "STAY OR DROP?", P.sun, k2);
SC.title = (t, s) => { const u = t - MK("title"), dim = clamp(u / .2); return lcSet(t, s, "back") + `<rect width="1920" height="1080" fill="${P.night}" opacity="${n2(.78 * dim)}"/>` + TITLE(slamK(u, .05), slamK(u, .55)) + HUD(t); };

/* 3 · today: the camera glides from Momo's coil to OUR MINI CRANE at its HOME (held about 2 s), then to the cardboard crane and the lorry,
   then on to the potted plant, where the game's push-in starts (one move). Momo (big at the left) talks, then points at the lorry; Basil
   (right) holds up his bar magnet with three steel caps stuck on its red end, tugs one off (caps: a pop), and laughs after his line */
const camBoard = camOn([1150, 640], 1.5, 1160, 520), camCrane = camOn([860, 760], 1.4, 860, 560), camPot = camOn([MPAT.intro[0], MPAT.intro[1] - 20], 1.6, 760, 480);
const camToday = (t) => { const s = SCN.today, a = eio((t - s.t0) / 1.4), b = eio((t - MK("lorry") + .8) / 1.4), c = eio((t - (s.t1 - 1.5)) / 1.5);
  return c > 0 ? camMix(camCrane, camPot, c) : b > 0 ? camMix(camBoard, camCrane, b) : camMix(camBack(SCN.title.t1), camBoard, a); };
const basilMag = (t, x, y, h, flip) => { const [px0, py0] = pawPt("basil", x, y, h, flip), px = px0 - 40, py = py0 - 120, tc = MK("caps"), pulled = t >= tc + .2, d = flip ? -1 : 1;
  return TF(px + d * 60, py - 10, .55, bar20(t, { glint: false, flip: flip }), 0) + [0, 1, 2].map((i) => { if (i === 2 && pulled) { const u = clamp((t - tc - .2) / .5); return steelCap23(px + d * (60 + 170 * .55 + 40 * u), py - 10 + 30 * u - 40 * Math.sin(Math.PI * u), 20 + 200 * u, .7); }
    return steelCap23(px + d * (60 + 168 * .55), py - 10 - 22 + i * 22, 0, .7); }).join(""); };
SC.today = (t, s) => { const out = s.t1 - 1.4;
  return cs(t, camToday(t), { top: tableTop(t, { clipN: 16 }) }) + OP(1 - ramp(t, s.t1 - 1.6, .4), momoRig(t, camToday(t), { flow: 0, jA: 0, jB: 0, tag: "off" }))
    + (t >= MK("board") ? OP(pulse(t, MK("board"), .05, .8), `<rect width="1920" height="1080" fill="#fff" opacity=".1"/>`) : "")
    + bd("basil", BA[0], BA[1], BA[2], t, { in: s.t0 + .1, out, flip: true, poses: [[s.t0, "sit"], [LE("m203b") + .1, "laughing"]] })
    + bd("pip", PI[0], PI[1], PI[2], t, { in: s.t0 + .15, out: out + .1, flip: true }) + (t < out + .1 ? basilMag(t, BA[0], BA[1], BA[2], true) : "")
    + bd("momo", MO[0], MO[1], MO[2], t, { in: s.t0 + .05, out: out + .2, poses: [[s.t0, "sit"], [LE("m201m") + .05, "pointing"], [LE("m201m") + 1.6, "sit"]] })
    + (t >= MK("caps") + .2 && t < out ? impactFX(t, MK("caps") + .25, pawPt("basil", BA[0], BA[1], BA[2], true)[0] - 220, pawPt("basil", BA[0], BA[1], BA[2], true)[1] - 120, "POP!", { s: .4, flash: false }) : "") + HUD(t); };
SC.game = (t, s) => { const cE = camToday(SCN.today.t1), p = MPAT.intro;
  return gameScene(t, s, ["m204", "m205p", "m206"], false, { world: (tt) => cs(tt, cE, { top: tableTop(tt, { clipN: 16 }) }), A: camPt(cE, [p[0], p[1] - 14]), T: [680, 440], Z: 2.6, dim0: 0,
    poses: { momo: [[W("m204", "millipede") + .1, "surprised"], [W("m204", "millipede") + 1.8, "sit"]], basil: [[W("m206", "buddies") - .1, "waving"], [W("m206", "buddies") + 1.0, "sit"]] } }) + smallPrint(t, LT("m206"), LOOK_RULE); };
SC.goals = (t, s) => goals3(t, s, [["The electrical method", ""], ["On and off", ""], ["Stay safe", ""]], ["m301b", "m302b", "m303b", "m304b"], "basil");
SC.r1card = (t, s) => roundCard(t, s, "ROUND 1", "YOUR ANSWER FROM LAST TIME");

/* 4 · Round 1: EP22's dare (a short 3 s ring). EP22's two cards as the ONE set of numbered picture cards; the clue labels ON TOP of the ring;
   the ring's picture: Momo's paw lifting the holder away from the coiled nail, the clips still hanging (no answer). Basil leads (thinking,
   worried through the countdown: lockN). Basil's pick: EP22's stroked nail with its clips (stroked); Pip's: the crane across the road letting
   go (crane); Pip points after his line */
const pipNailPic = (t) => `<g filter="url(#dropS)"><rect x="-150" y="-110" width="300" height="220" rx="24" fill="#FFF8EA"/></g>` + TF(-30, -20, .7, nail22d(0, 0, 1, 0)) + clipBunch(t, 75, -20, 4, { k: .7 }) + T(0, 90, "Pip's stroked nail", 26, P.ink);
const cranePic = (t) => `<g filter="url(#dropS)"><rect x="-150" y="-110" width="300" height="220" rx="24" fill="#BFE6FF"/></g><clipPath id="crP"><rect x="-150" y="-110" width="300" height="220" rx="24"/></clipPath><g clip-path="url(#crP)">` + TF(90, 120, .36, yardCrane23(t, { sw: .5 + .5 * Math.sin(t), lift: .8, on: Math.sin(t * 1.3) > 0 })) + `<rect x="-150" y="90" width="300" height="30" fill="#6A6E76"/></g>` + T(0, 90, "the crane across the road", 22, P.ink);
SC.r1 = (t, s) => { const L1 = "m401"; return lockN(t, { t0: LT(L1) - .1, cards: DARE_CARDS, clues: DARE_CLUES.map((c, i) => [c, W(L1, "what") + .15 * i]), lead: "basil", csize: 32, q: DARE_LABEL, tq: W(L1, "what") - .1,
  tc: [W(L1, "what"), W(L1, "show")], ring0: MK("ring0_r1"), dur: 3, lock: "m402",
  pics: [0, 1].map((i) => darePic22(i, t)), obj: ringP1_23, react: [[LE("m404p") + .1, "pip", "pointing"]],
  picks: [{ who: "basil", id: "m403b", word: "1" }, { who: "pip", id: "m404p", word: "2" }, { who: "momo", id: "m405m", word: "2" }] })
  + (t >= MKS("stroked") - .2 && t < LE("m403b") + .4 ? TF(1560, 330, spring(t, MKS("stroked") - .2, .4), pipNailPic(t)) : "")
  + (t >= MKS("crane") - .2 && t < LE("m404p") + .4 ? TF(1560, 330, spring(t, MKS("crane") - .2, .4), cranePic(t)) : ""); };

/* 5 · Be the iron nail! One glide down to a fresh new nail lying on the table beside the coil of wire (no cut); the buddies wave the viewer
   off (goodbye), then each shrinks with a pop. The millipede up the leg of the next table, as the camera passes */
const NEWNAIL = [600, 846];
const camWait = (t) => { const s = SCN.waitw, u = eio((t - s.t0) / (s.t1 - s.t0)); return camMix(camOn([960, 720], 1.1, 960, 560), camOn(NEWNAIL, 5.2, 960, 600), u * u); };
SC.waitw = (t, s) => { const L = "m501", tP = W(L, "be") - .15, sh = W(L, "shrink") - .1;
  const buds = ["momo", "pip", "basil"].map((w, i) => { const X = [MO, PI, BA][i]; return bd(w, X[0], X[1], X[2], t, { in: s.t0 + .1 + .05 * i, out: sh + .2 * i + .3, flip: X[0] > 960, poses: [[s.t0, "sit"], [tP + .2 + .15 * i, "waving"]], wave: true }); }).join("");
  return cs(t, camWait(t), { top: tableTop(t, { clipN: 22 }) + nail22d(NEWNAIL[0], NEWNAIL[1], .3, 4) }) + OP(1 - ss(s.t1 - 1.0, s.t1 - .5, t), buds + (t >= tP ? TF(960, 250, spring(t, tP, .45), tpill(0, 0, "Be the iron nail!", 76, P.sun, P.ink, { w: 700 })) : "") + HUD(t)) + wipe(t, s.t1, "#F2EDE4", 960, 600); };
// the riders: the three buddies, shrunk, on the table beside your head, WATCHING your tip (the vanishing point)
const riders23 = (t, s, o) => { let out = ""; for (const who of ["momo", "pip", "basil"]) { const [x, y] = o.at[who]; out += buddy(who, x, y, o.h || 200, t, { in: o.tin + ({ pip: 0, basil: .15, momo: .3 })[who], poses: (o.poses || {})[who] || [], tag: false, rim: "rimB", jump: (o.jolts || []).map((tj) => [tj, 34]), ...watchO(x, o.look || 960) }); } return out; };
SC.shrink = (t, s) => { const m = MK, rp = { basil: [[m("jdrop") + .15, "surprised"], [m("jdrop") + 2.0, "sit"]], pip: glanceWave(m("jcoil") + 1.8) };
  return coilJourney(t, s) + riders23(t, s, { tin: m("jlie") + .6, h: 200, at: { pip: [210, 1044], basil: [1720, 1050], momo: [400, 1040] }, poses: rp, jolts: [m("jon") + .05, m("joff") + .1] })
    + youTag(t, MK("jlie"), "You: an iron nail in a coil") + feelTag(t, MK("jlie") + .8, MK("jcoil") - .2, "to scale: an iron nail", 160)
    + feelTag(t, MK("jon") - .3, MK("jjump") - .2, "joined!", 160) + feelTag(t, MK("jjump"), MK("joff") - .2, "clips jump up!", 160) + feelTag(t, MK("jgone"), s.t1, "the pull is gone", 160)
    + (t >= MK("jon") - .9 && t < MK("jon") + 1 ? TF(1500, 430, spring(t, MK("jon") - .9, .4) * (1 - ramp(t, MK("jon") + .7, .3)), tpill(0, 0, "the two ends", 34, "#fff", P.ink, { w: 700 })) : ""); };
// the pull back out: the table at normal size; Momo holds the coiled nail over the tray, the holder apart (battery away), the clips in the tray
const momoOff = (t, cam) => momoRig(t, cam, { jA: 1, jB: 0, hdx: 20, hdy: -10, tag: "off" });
SC.pullout = (t, s) => { const u = 1 - eo((t - s.t0) / .6);
  const cam = camMix(camOn([CLIPS[0], CLIPS[1]], 1.06, CLIPS[0], CLIPS[1]), camOn(NEWNAIL, 5, 960, 600), u);
  return cs(t, cam, { top: tableTop(t, { clipN: 22 }) }) + (u < .3 ? momoOff(t, cam) : "")
    + bd("momo", MO[0], MO[1], MO[2], t, { in: s.t0 + .2 }) + bd("basil", PI[0], PI[1], PI[2], t, { in: s.t0 + .25, flip: true }) + bd("pip", BA[0], BA[1], BA[2], t, { in: s.t0 + .3, flip: true }) + wipe(t, s.t0, "#FFFFFF") + HUD(t); };

/* 6 · the answer is two: the clips drop off. EP22's two cards small at the top left (card 2 lit at ansglow; "not this one" on card 1); the
   coins YOU +1 and BUDDIES +1 (two of three were right); box1 fills (Momo's electromagnet ✓). The camera pushes to the clips in the tray,
   then eases back. Pip and Momo confident, Basil shy (OUTCOMES). Momo teaches ELECTRICAL METHOD (a line to her coil and her battery) and
   cheers after her line (a key word learnt). The millipede along the stack of drink crates */
const camAns = (t) => { const a = eio((t - MK("ansglow") + .2) / 1.0) * (1 - eio((t - MK("box1") - 1.4) / 1.2)), b = eio((t - MK("box1") + .3) / .8) * (1 - eio((t - MK("coin1") + .2) / 1)); return camMix(camMix(camOn([CLIPS[0], CLIPS[1]], 1.06, CLIPS[0], CLIPS[1]), camOn([CLIPS[0], CLIPS[1]], 1.5, CLIPS[0], CLIPS[1]), a), camOn([1150, 600], 1.35, 1200, 520), b); };
SC.answer = (t, s) => { const tA = MK("ansglow"), tK = MK("kw_electrical_method"), cam = camAns(t), tip = camPt(cam, momoTip()), hp = camPt(cam, HOLD);
  return cs(t, cam, { top: tableTop(t, { clipN: 22 }) }) + momoOff(t, cam)
    + `<g filter="url(#drop)"><rect x="30" y="40" width="470" height="200" rx="24" fill="#FFF8EA" opacity=".92"/></g>` + [0, 1].map((i) => TF(150 + i * 230, 135, .42, dareCard23(i, { id: "an" + i, lit: i === 1 && t >= tA ? spring(t, tA, .45) : 0 }, t))).join("")
    + tagAt(t, tA + .3, 150, 222, 1, "not this one", 22) + coin(t, MK("coin1") - .1, 860, 330, "+1", "if you showed two fingers") + coin(t, MK("coin1") + .2, 1640, 200, "+1", "Buddies")
    + bd("momo", MO[0], MO[1], MO[2], t, { in: s.t0 + .1, poses: [[s.t0, "sit"], [LE("m603m") + .05, "cheer"]], achieved: true }) + (t > s.t0 + .3 ? pickNum("momo", 520, 640, t, s.t0 + .3, "2") : "") + tickChip16(t, tA + .2, 575, 585, .7)
    + bd("basil", PI[0], PI[1], 400, t, { in: s.t0 + .15, flip: true }) + (t > s.t0 + .35 ? pickNum("basil", 1290, 700, t, s.t0 + .35, "1") : "") + xChip16(t, tA + .25, 1340, 650, .7)
    + bd("pip", BA[0], BA[1], BA[2], t, { in: s.t0 + .2, flip: true }) + (t > s.t0 + .4 ? pickNum("pip", 1880, 640, t, s.t0 + .4, "2") : "") + tickChip16(t, tA + .3, 1840, 585, .7)
    + (t >= tK + .2 && t < tK + 2.4 ? pline(860, 360, tip[0] - 60, tip[1] - 30, ramp(t, tK + .2, .3), P.sun) + pline(1060, 360, hp[0], hp[1] - 30, ramp(t, tK + .2, .3), P.sun) : "")
    + melt(t, s, "pullout", .3) + HUD(t); };

/* 7 · Basil (big at the left, still shy): "Is Momo's nail still a little magnet, like Pip's stroked nail?" He points at Momo's coiled nail;
   Momo big at the right holds it (the battery away, the holder apart on the table); Pip in the mid-ground. A push in on the coiled nail.
   The millipede on the rim of the mop pail */
const MR = [1700, 1076, 480], MRpaw = () => pawPt("momo", MR[0], MR[1], MR[2], true);
const momoRigR = (t, cam, o = {}) => { const [px, py] = MRpaw(); return rigW(t, { head: [px, py - 40], ang: 150, k: .6, hold: camPt(cam, [1350, 862]), hk: .38 * cam[0], jA: 1, jB: 0, hdx: 30, hdy: -8, tag: "off", ...o }); };
const camQ1 = (t) => { const s = SCN.lc1q, u = eio((t - s.t0) / (s.t1 - s.t0)); return camMix(camOn([960, 640], 1.06, 960, 600), camOn([1420, 860], 1.45, 1100, 640), u); };
SC.lc1q = (t, s) => { const tip = rigTip({ head: [MRpaw()[0], MRpaw()[1] - 40], ang: 150, k: .6 });
  return cs(t, camQ1(t), { top: tableTop(t, { clips: false }) + trayClips22(t, 1300, 900, .38, {}) }) + momoRigR(t, camQ1(t))
    + bd("pip", 1000, 1010, 380, t, { in: s.t0 + .15, ...watchO(1000, tip[0]) }) + bd("momo", MR[0], MR[1], MR[2], t, { in: s.t0 + .1, flip: true, ...watchO(MR[0], tip[0]) })
    + bd("basil", 330, 1076, 480, t, { in: s.t0 + .05 }) + smallPrint(t, s.t0 + .3, ADULT_RULE) + HUD(t); };
/* [LOOK CLOSER] is it still a magnet? (lc23.js lcOnArt). Faces: Basil at the lower left (shy: his own reason is tested; OUTCOMES), then Pip
   at the lower right (teaching ELECTROMAGNET; cheer after his line: a key word learnt, achieved). Both WATCH the panel */
const peek23 = (who, side, t, tin, tout, poses, o = {}) => { if (t < tin - .05 || (tout !== undefined && t > tout + .3)) return ""; const W_ = LCW, x = side === "l" ? W_.x - W_.w / 2 + 200 : W_.x + W_.w / 2 - 200;
  return bd(who, x, W_.y + W_.h / 2 + 470 * .42 + (1 - eo((t - tin) / .45)) * 350, 470, t, { in: tin, out: tout, poses: [[tin, "sit"], ...(poses || [])], peek: true, tag: false, shadow: false, flip: side === "r", nohop: true, achieved: o.achieved, watch: W_.x }); };
SC.lcon = (t, s) => { window._BUBAT = { '*': [960, 905] }; const cE = camQ1(SCN.lc1q.t1), p = camPt(cE, [1420, 860]), tm = s.t0 + 1.2, tp = LT("m706p") - .5;
  return lookCloser(t, s, { tz: s.t0, fx: p[0], fy: p[1], art: lcOnArt, bgc: "#FFF6E6", set: (tt) => cs(tt, cE, { top: tableTop(tt, { clips: false }) + trayClips22(tt, 1300, 900, .38, {}) }), verdict: ["IT WORKS ONLY WHILE ELECTRICITY FLOWS", GOODC], tv: MK("v_onoff"), peek: false,
    over: (tt) => peek23("basil", "l", tt, tm, tp - .2, []) + peek23("pip", "r", tt, tp, undefined, [[LE("m706p") + .1, "cheer"], [LE("m706p") + 2.2, "sit"]], { achieved: true })
      + smallPrint(tt, MK("crane2"), YARD_RULE, 0, MK("kw_electromagnet") - .5) + smallPrint(tt, MK("on1"), MOMENT_RULE, 0, MK("crane2") - .3) }); };
SC.mark1 = (t, s) => markScene(t, s, { id: "m708", sayId: "m707", who: "momo", n: "1 of 2", tab: "The electrical method", text: TL.lines.m708.text, keys: ["a", "magnet", "this", "method", "electromagnet."], size: 66, y: 250, footer: FOOT, poses: [[LE("m708") + .2, "sit"]],
  under: markOnOff(t, 1250, 920, .72 * spring(t, s.t0 + .4, .5)), extra: bd("basil", 1790, 1076, 300, t, { in: s.t0 + .3, flip: true }) });

/* 8 · HOLD ON! Momo (big at the left, by the pillar) holds the coil in one paw (by the plastic-covered wire, the bare ends down at the
   table) and points with the other at the white wall socket low on the pillar; a thought bubble "super magnet?" by HER head. Nobody moves
   towards the socket; the wire never comes near it. The HOLD ON! stamp; the countdown takes the stage (the ring with the socket and the coil,
   a dotted "?" between them; the clue labels ON TOP; only Momo at the side). After the bell: Momo shy through the WHOLE fix and the strip;
   Basil and Pip confident (OUTCOMES). stop: Basil (big at the right) holds up a paw (a hop) and Momo's coil is lowered to the table; a red
   cross stamps over the socket (NEVER!); mains: the tag "main electrical supply" joined to the socket; the WARNING strip, its three lines
   lighting as they are read, each with its icon on the board (box3). The millipede on the bottom rung of the plastic stool at the next table */
const MH = [400, 1060, 480];
const camHold = (t) => { const a = eio((t - SCN.holdon.t0) / 1.2) * (1 - eio((t - W("m802", "cross") + .6) / .8)), b = eio((t - MK("mains") + .8) / 1.2), c = eio((t - MK("strip") + .2) / 1.2);
  return camMix(camMix(camMix(camOn([960, 640], 1.06, 960, 600), camOn([260, 780], 1.35, 600, 640), a), camOn([200, 800], 1.5, 520, 560), b), camOn([960, 600], 1.0, 960, 560), c); };
const RG = [960, 420], RR = 215;
SC.holdon = (t, s) => { window._BUBAT = { momo: [960, 230], basil: [1180, 260], pip: [1180, 260] }; const b = "m802", c = "m803", r0 = MK("ring0_hold"), bell = MK("bell_hold"), rs = ringState(t, r0, 5), tX = W(b, "cross") - .15, tH = W(b, "hold") - .1, tOne = W(c, "one") - .1, inT = t >= r0 && t < bell, tS = MK("stop"), cam = camHold(t);
  const st = ss(tX - .1, tX + .4, t) * (1 - ss(LE(c) + .1, LE(c) + .6, t)), ring = st > .01, low = eio(clamp((t - tS - .4) / .8));
  const [px, py] = pawPt("momo", MH[0], MH[1], MH[2], true), coil = rigW(t, { head: [lerp(px, 560, low), lerp(py - 30, 846, low)], ang: lerp(100, 10, low), k: .48, free: null, n: 10 });
  const inner = `<clipPath id="hoC"><circle cx="${RG[0]}" cy="${RG[1]}" r="${RR - 24}"/></clipPath><circle cx="${RG[0]}" cy="${RG[1]}" r="${RR - 24}" fill="#FFFDF6"/><g clip-path="url(#hoC)"><g transform="translate(${RG[0]} ${RG[1] + 5}) scale(.75) translate(-430 -470)">${ringHold23(t)}</g></g>`;
  const labels = [["one battery", 420, 250, -1], ["the wall socket", 1500, 250, 1], ["a super magnet?", 1500, 560, 1]].map(([l, x, y, sd], i) => { const t0 = tX + .2 + i * .15; return t < t0 ? "" : pline(x - sd * 190, y + 40, RG[0] + sd * RR * .8, RG[1] + (i === 2 ? RR * .4 : -RR * .6), ramp(t, t0, .2)) + clue3(x, y, l, spring(t, t0, .4), 50, 520); }).join("");
  const bob = inT ? 16 * Math.sin((t - r0) * Math.PI * 2) : 6 * Math.sin(t * 3), sk = camPt(cam, CS.socket), [s1, s2, s3] = S3();
  const world = cs(t, cam, { top: tableTop(t, {}), bug: t < r0 - 1 || t > bell + 1 ? MPAT.holdon : false, front: coil });
  return world + (t >= tS ? TF(sk[0], sk[1], spring(t, tS, .4) * cam[0] * .9, `<path d="M-70 -60 L70 60 M70 -60 L-70 60" stroke="#D84A3A" stroke-width="22" stroke-linecap="round"/>`) + TF(Math.max(170, sk[0] + 40), sk[1] - 120 * cam[0], spring(t, tS + .1, .4), tpill(0, 0, "NEVER!", 52, "#D84A3A", "#fff", { w: 700, ls: 3 })) : "")
    + (t >= MK("mains") ? linkChip(t, MK("mains") + .05, sk[0] + 640, sk[1] - 250, sk[0] + 50, sk[1] - 20, "#fff", "main electrical supply", 40, undefined, P.ink) : "")
    + (ring ? OP(st, bg("stage")) + OP(st, TF(RG[0], RG[1], spring(t, tX, .45) * (1 + .035 * (inT ? rs.tick : 0)), `<g transform="translate(${-RG[0]} ${-RG[1]})">${ringTimer(RG[0], RG[1], t < r0 ? 1 : t < bell ? rs.frac : 0, t < r0 ? 5 : t < bell ? rs.secs : 0, t, { R: RR, sw: 34, tick: rs.tick, shut: pulse(t, bell, .01, .6), chg: inT || (t >= bell && t < bell + .5) ? (t >= bell ? bell : rs.chg) : -9, ns: 1.25, inner })}</g>`)
      + labels + TF(1700, 800 + bob, .9 * spring(t, tX + .1, .4), `<g filter="url(#dropS)">${crossedArms()}</g>`) + youPill(1700, 640 + bob * .6, 1.2) + TF(1700, 990, spring(t, tX + .2, .4), tpill(0, 0, "cross your arms", 38, P.ink, "#fff", { w: 700 }))) : "")
    + bd("pip", 1420, 1010, 380, t, { in: LT(c) + .4, flip: true })
    + bd("basil", BA[0], BA[1], BA[2], t, { in: LT(c) + .3, flip: true, jump: [[tS - .05, 30]] })
    + bd("momo", MH[0], MH[1], MH[2], t, { in: s.t0 + .1, flip: true, rock: inT ? 2.2 : 0, poses: [[s.t0, "sit"], [LE("m801m") + .05, "pointing"], [W(b, "something") + .2, "thinking"], [bell + .35, "sit"]], jump: [[MK("idea"), 22], [bell + .02, 30]], nohop: true })
    + thought(t, MK("idea") - .2, tX - .3, 760, 360, "super magnet?", { size: 52, col: P.momo, dir: -1 }) + (t >= MK("idea") - .2 && t < tX - .2 ? TF(985, 330, spring(t, MK("idea"), .4), `<path d="M0 -40 L-22 6 H0 L-12 44 L26 -8 H4 L16 -40z" fill="${P.sun}" stroke="${P.ink}" stroke-width="4" stroke-linejoin="round"/>`) : "")
    + (t >= MK("strip") ? stripThree(t) : "")
    + stamp(t, tH, 960, 560, "HOLD ON!") + bellIcon(t, r0) + coin(t, tOne, 960, 330, "+1", "arms crossed") + smallPrint(t, s.t0 + .4, HOLD_RULE, 0, tX - .3) + HUD(t); };
// the cream WARNING strip (7.5, three sentences): three lines, the words appearing as Heart reads them; WARNING in the strip's corner
const stripThree = (t) => { const L = TL.lines.m805s, ws = L.words.map((w) => w.w), i2 = ws.findIndex((w, i) => i > 3 && w === "Do"), i3 = ws.findIndex((w, i) => i > i2 && w === "Do"), tx = (a, b) => ws.slice(a, b).join(" ");
  return bookCaption(t, "m805s", tx(0, i2), 860, { size: 30, keys: ["too", "long", "hot."] }) + bookCaption(t, "m805s", tx(i2, i3), 935, { size: 30, off: i2, keys: ["exposed", "wires"] }) + bookCaption(t, "m805s", tx(i3), 1010, { size: 30, off: i3, keys: ["main", "electrical", "supply."] })
    + OP(ramp(t, L.t - .2, .3), TF(1700, 790, 1, tpill(0, 0, "WARNING", 34, "#D84A3A", "#fff", { w: 700, ls: 4 }))); };

/* 9 · Pip (big at the left) holds up the battery holder, peering at it: "I think the battery is a magnet, and the wire just joins it to the
   nail." Thinking after his line (he is about to test it). Basil big at the right, Momo in the mid-ground. A push in on the battery. The
   millipede on a fallen rain-tree leaf on the floor tiles */
const PL = [330, 1060, 480];
const camQ2 = (t) => { const s = SCN.lc2q, u = eio((t - s.t0) / (s.t1 - s.t0)); return camMix(camOn([960, 640], 1.06, 960, 600), camOn([460, 800], 1.5, 760, 600), u); };
SC.lc2q = (t, s) => { const [px, py] = pawPt("pip", PL[0], PL[1], PL[2], false);
  return cs(t, camQ2(t), { top: tableTop(t, {}) + rigW(t, { head: [600, 770], ang: 80, k: .46, free: [[560, 860], [575, 870]] }) })
    + bd("momo", 1000, 1010, 380, t, { in: s.t0 + .15, flip: true, ...watchO(1000, px) }) + bd("basil", BA[0], BA[1], BA[2], t, { in: s.t0 + .1, flip: true, ...watchO(BA[0], px) })
    + bd("pip", PL[0], PL[1], PL[2], t, { in: s.t0 + .05, poses: [[s.t0, "sit"], [LE("m901p") + .05, "thinking"]] }) + TF(px + 60, py + 10, .45, battHolder23(t, 1)) + smallPrint(t, s.t0 + .3, COVER_RULE) + HUD(t); };
SC.lcparts = (t, s) => { window._BUBAT = { '*': [960, 905] }; const cE = camQ2(SCN.lc2q.t1), [px, py] = pawPt("pip", PL[0], PL[1], PL[2], false), p = camPt(cE, [px + 60, py - 20]), tm = s.t0 + 1.2, tb = LT("m905b") - .5;
  return lookCloser(t, s, { tz: s.t0, fx: p[0], fy: p[1], art: lcPartsArt, bgc: "#FFF6E6", set: (tt) => cs(tt, cE, { top: tableTop(tt, {}) }), verdict: ["BOTH ENDS JOINED: THE NAIL BECOMES A MAGNET", GOODC], tv: MK("v_both"), peek: false,
    over: (tt) => peek23("pip", "l", tt, tm, undefined, [[tm + .2, "thinking"]]) + peek23("basil", "r", tt, tb, undefined, [[LE("m905b") + .1, "cheer"], [LE("m905b") + 2.2, "sit"]], { achieved: true })
      + smallPrint(tt, MK("one"), COVER_RULE, 0, MK("both") - .3) + smallPrint(tt, MK("both"), MOMENT_RULE, 0, MK("kw_coil") - .3) }); };
SC.mark2 = (t, s) => markScene(t, s, { id: "m907", sayId: "m906", who: "basil", n: "2 of 2", tab: "The electrical method: three steps", text: TL.lines.m907.text, keys: ["coil", "long", "piece", "wire", "connect", "ends", "battery.", "steel", "clips."], size: 50, y: 230, footer: FOOT, poses: [[LE("m907") + .2, "sit"]],
  under: markSteps(t, 1250, 930, .66 * spring(t, s.t0 + .4, .5)), extra: bd("pip", 1790, 1076, 300, t, { in: s.t0 + .3, flip: true }) });

/* 10 · score hand, the millipede (lizReveal: the score hand melts into the coffee shop, ONE push-in onto the millipede on the kerb by the
   bicycle rack: the REVEAL spot, never the intro pot); Pip's fun fact: a scared millipede coils up tight, like our wire (ff_coil); most have
   far fewer than a thousand legs (ff_legs). Momo points at the millipede once it is ringed; Basil surprised on "fewer"; Basil waves goodbye
   on "Tell someone at home!" */
SC.final = (t, s) => { const L = "m1001"; return finalScene(t, s, L, 1, [[s.t0, null, 1], [W(L, "two") - .1, null, 2]]); };
SC.liz = (t, s) => { const L = "m1002", tq = W(L, "it") - .1, c = MPAT.liz, tc = W(L, "millipede");
  return lizReveal(t, s, L, cs(t, W0, { bug: [c[0], c[1], c[2], { ...c[3], coil: t >= MK("ff_coil") && t < MK("ff_coil") + 2.4 ? 1 : 0 }], top: tableTop(t, {}) }), c[0], c[1] - 10, tq, "It was on the kerb!", -120, 160, 80, 2.8, { from: () => SC.final(SCN.final.t1 - .04, SCN.final), qx: 1000, qy: 724, tx: 960, ty: 985, tell: "m1004",
    fact: { id: "m1003p", at: [1250, 400], w: 760, h: 440, items: [["ff_coil", "like our coil!", ffCoil23], ["ff_legs", "most have far fewer", ffLegs23]], cols: ["#B8622E", "#2FA35A"], sx: 1300, sy: 860, poses: [[MK("ff_in") - .4, "surprised"], [MK("ff_in") + .3, "sit"]] } })
    + bd("momo", 170, 1076, 330, t, { in: s.t0 + .6, poses: [[s.t0 + .6, "sit"], [tc + .4, "pointing"], [LT("m1003p") - .3, "sit"]] })
    + bd("basil", 390, 1076, 330, t, { in: s.t0 + .7, poses: [[s.t0 + .7, "sit"], [MK("ff_legs") + .2, "surprised"], [MK("ff_legs") + 1.6, "sit"], [LT("m1004") - .1, "waving"], [s.t1, "sit"]], wave: true }) + smallPrint(t, s.t0 + .5, LOOK_RULE); };

/* 11 · the cliffhanger: Pip (big at the left) lowers the mini crane's hook (Momo's ten-turn nail, the battery joined for a moment) onto the
   steel bolt in the scrap tray: the bolt tips up, hangs for a second, and slips off with a clink (lift); Pip shows the empty battery packet
   (nobatt: no more batteries); a big ? by the bolt. PART 2. Basil and Momo at the right, watching; Basil thinking, then he picks up the
   leftover long wire (a hint, no words) */
const camCliff = (t) => { const s = SCN.cliff, u = eio((t - s.t0) / (s.t1 - s.t0)); return camMix(camOn([960, 640], 1.08, 960, 600), camOn([790, 760], 1.45, 860, 560), u); };
SC.cliff = (t, s) => { const tP = W("m1102", "part") - .1, tl = MK("lift"), tn = MK("nobatt"), dr = 150 + 120 * eio(clamp((t - s.t0 - .2) / (tl - s.t0 - .4))), tipUp = t >= tl - .2 && t < tl + 1.3, bolt = SCRAP;
  const bx = bolt[0] - 8, by = bolt[1] - 14, slip = t >= tl + 1.3 ? eio(clamp((t - tl - 1.3) / .3)) : 0, hang = tipUp ? Math.sin(Math.PI * clamp((t - tl + .2) / 1.5)) : 0, [cx, cy] = craneTip(CR[0], CR[1], CR[2], { drop: dr });
  const boltS = bolt23(lerp(bx, cx + 10, hang * .6), lerp(by, cy + 22, hang * .6), -8 + 50 * hang, .26);
  const top = miniCrane23(t, CR[0], CR[1], CR[2], { drop: dr, on: t >= s.t0 + .3 && t < tl + 1.6, rig: { flow: t >= s.t0 + .3 && t < tl + 1.6 ? .7 : 0 } }) + scrapTray23(t, SCRAP[0], SCRAP[1], SCRAP[2], { bolt: false }) + boltS + paperLorry23(t, LORRY[0], LORRY[1], LORRY[2]) + trayClips22(t, CLIPS[0], CLIPS[1], CLIPS[2]);
  const [px, py] = pawPt("pip", PL[0], PL[1], PL[2], false), bs = camPt(camCliff(t), [bx, by - 40]);
  return cs(t, camCliff(t), { top })
    + bd("momo", 1440, 1010, 380, t, { in: s.t0 + .15, ...watchO(1440, 800), jump: [[LT("m1102") + .2, 20]] })
    + bd("basil", BA[0], BA[1], BA[2], t, { in: s.t0 + .2, poses: [[s.t0, "sit"], [LE("m1101p") + .1, "thinking"]], ...watchO(BA[0], 800), jump: [[LT("m1102") + .35, 20]] })
    + (t >= LE("m1101p") + .6 ? TF(...pawPt("basil", BA[0], BA[1], BA[2], true), spring(t, LE("m1101p") + .6, .4) * .5, `<ellipse cx="-60" cy="0" rx="50" ry="32" fill="${WIREC}" stroke="${WIRED}" stroke-width="6"/><path d="M-100 10 q-40 30 -20 60" stroke="${WIREC}" stroke-width="10" fill="none"/>`) : "")
    + bd("pip", PL[0], PL[1], PL[2], t, { in: s.t0 + .1, ...watchO(PL[0], 800), jump: [[LT("m1102") + .1, 20]] })
    + (t >= tn - .2 ? TF(px + 70, py, spring(t, tn - .2, .4), `<g transform="rotate(-8)"><rect x="-70" y="-46" width="140" height="92" rx="8" fill="#FFF8EA" stroke="#8A6438" stroke-width="5"/><rect x="-56" y="-30" width="112" height="44" rx="6" fill="#E6E9EC" stroke="#9AA4AE" stroke-width="3" stroke-dasharray="6 5"/>${T(0, 36, "AA", 22, P.ink)}</g>`) + linkChip(t, tn + .1, px + 260, py - 180, px + 90, py - 40, "#fff", "no more batteries", 36, undefined, P.ink) : "")
    + (t >= tl + 1.4 ? qMark20(t, tl + 1.4, bs[0] + 60, bs[1] - 80, 54) : "") + smallPrint(t, s.t0 + .3, MOMENT_RULE)
    + (t >= tP ? slamFit(330, "PART 2", P.sun, slamK(t - tP, 0)) : "") + melt(t, s, "kwrecap", .4) + HUD(t); };
/* 12 · "Now you know!": OUR MINI CRANE (boxes 1 to 3 and the list filled) between the buddies */
SC.nyk = (t, s) => nykScene(t, s, boardCrane23(t, 960, 1060, 1.08, { all: true, icons: [0, 0, 0] }), { bx: [230, 1730, 1500], hx: 470 });
})(); }
