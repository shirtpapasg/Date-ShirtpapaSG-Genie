// s3.js: P4 EP3, the second half: THE SUSPECTS (cleared one by one; PARALLEL VEINS; Basil's too-early CASE CLOSED! stopped by Pip; the
// edges; the hibiscus matches; the high-five lands), THE VILLAIN (GLITCH: "Show me the data", KNOWLEDGE LOG · ENTRY 2, Uncle Lim, the tape
// comes off), THE WITNESS REVEAL, THE WORDS THAT EARN MARKS (Pip reads), THE COSY END, the cactus, the read-along, "Now you know!", the
// blooper and GLITCH's sting.
// the taped leaves come off at GLITCH's peel (the hedge's first, in shot; the pandan's and the trunk's while he rolls on)
const PEEL = () => [MK("peel") + 1.3, MK("peel") + 1.9, MK("peel") + .4];
// a comparison card: two leaves side by side (never overlapped), each with its own label joined by a plain line
const cmpCard = (t, t0, t1, x, y, A, la, B, lb, extra = "", w = 640, h = 330) => t < t0 - .05 || t > t1 + .35 ? "" : TF(x, y, spring(t, t0, .4) * (1 - ramp(t, t1, .3)), `<g filter="url(#drop)"><rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="26" fill="#FFF8EA" stroke="${P.ink}" stroke-width="6"/></g><path d="M0 ${-h / 2 + 30} V${h / 2 - 90}" stroke="${P.ink}" stroke-width="3" stroke-dasharray="8 10" opacity=".4"/>` + A + B
  + (la ? tpill(-w / 4, h / 2 - 46, la, 32, "#fff", P.ink, { w: 700 }) : "") + (lb ? tpill(w / 4, h / 2 - 46, lb, 32, "#fff", P.ink, { w: 700 }) : "") + extra);
const mystL = (x, y, k, o = {}) => TF(x, y, k, `<g transform="rotate(${o.rot || -20}) translate(-130 0)">${hibLeaf({ id: o.id || "ml", ...o })}</g>`);
const tick = (x, y, k = 1) => TF(x, y, k, `<circle r="30" fill="${P.leaf}" stroke="#fff" stroke-width="5"/><path d="M-13 1 L-3 11 L14 -10" fill="none" stroke="#fff" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>`);

/* ================================================================ SUSPECTS · cleared one by one (and Basil's too-early CASE CLOSED) ================================================================ */
// the left third: the cork case board on the void deck wall, Basil at it (with the CASE CLOSED stamp); the right two thirds: the real place,
// the camera gliding from the pandan and the mango tree to the hibiscus hedge (no cuts); Momo and Pip by the suspects; GLITCH at the side
SC.suspects = (t, s) => { const tH = MK("hib") - .8, cA = camOn([220, 660], 1.25, 1080, 620), cB = [1.3, (1.3 * 2112 - 1920) / .3, (1.3 * 700 - 620) / .3], c = camMix(cA, cB, eio(clamp((t - tH) / 1.6)));
  const fz = MK("freeze"), frz = t >= fz && t < LT("q809") - .05, tw_ = frz ? fz : t;
  const st = [t >= MK("clr1") ? clamp((t - MK("clr1")) / .15) : 0, t >= MK("clr2") ? clamp((t - MK("clr2")) / .15) : 0, t >= MK("stamp") ? clamp((t - MK("stamp")) / .15) : 0];
  const hi = t < MK("clr1") ? 1 : t < MK("mango") - .3 ? 0 : t < MK("clr2") ? 2 : t >= tH ? 3 : 0;
  const BX = 330, BY = 520, BK = .82, cardAt = (i) => [BX + [-190, 0, 190][i] * BK, BY + [20, 60, 20][i] * BK];
  // Basil's stamp: lifted high over the mango card (q806), frozen (the freeze), lowered slowly (q809/q810); later brought down on the hibiscus card
  const up1 = t >= MK("rush") - .1 && t < LT("q810") + .6, sY = up1 ? (t < LT("q809") ? -170 : lerp(-170, 60, eio(clamp((t - LT("q809")) / 1.6)))) : 0;
  const down = t >= LT("q815") - .2 && t < MK("stamp") + .5, dY = down ? (t < MK("stamp") ? lerp(-160, -10, ei(clamp((t - LT("q815") + .2) / (MK("stamp") - LT("q815") + .2)))) : -10 - 60 * clamp((t - MK("stamp") - .15) / .3)) : 0;
  const stampG = up1 ? TF(cardAt(1)[0] + 20, cardAt(1)[1] - 60 + sY, .55, stampHandle()) : down ? TF(cardAt(2)[0], cardAt(2)[1] - 70 + dY, .55, stampHandle()) : "";
  const wall = `<rect x="0" y="0" width="640" height="1080" fill="#F2E9DA"/><rect x="0" y="0" width="640" height="1080" fill="url(#vdWall)"/><rect x="0" y="900" width="640" height="180" fill="url(#floorV2)"/><rect x="636" y="0" width="10" height="1080" fill="${P.ink}" opacity=".25"/>`;
  const board = TF(BX, BY, BK, caseBoard(t, st, hi)) + TF(BX + 230, BY - 190, .22, snail3(t));
  const gFace = t >= LT("q807") - .1 && t < fz ? "smug" : frz ? "happy" : t >= fz && t < LE("q810") ? "happy" : "plain";
  const gScr = t >= LT("q807") - .1 && t < LE("q808") + 1 ? scrLRS() + scrOwner("MANGO TREE", true) : scrLRS();
  const mx = t < MK("clap") - .9 ? 1160 : lerp(1160, 980, eio(clamp((t - MK("clap") + .9) / .6))), px = t < MK("clap") - .9 ? 1470 : lerp(1470, 1240, eio(clamp((t - MK("clap") + .9) / .6)));
  const cmp = cmpCard(t, MK("sbs") - .3, MK("clr1") + .6, 1190, 360, TF(-260, 90, .82, `<g transform="rotate(-62)">${pandanLeaf(330, { w: 34, hi: t >= MK("sbs") })}</g>`), t >= MK("kw_parallel_veins") - .2 ? "parallel veins" : "pandan", mystL(170, -30, .5, { id: "sm1", hi: { small: t >= MK("kw_parallel_veins") ? .6 : 0 } }), t >= MK("kw_parallel_veins") - .2 ? "net veins" : "mystery leaf",
    t >= MK("lanes") - .1 && t < MK("kw_parallel_veins") + .2 ? TF(-470, -60, .55, `<clipPath id="trk"><rect x="-170" y="-130" width="340" height="200" rx="20"/></clipPath><g clip-path="url(#trk)">${picTrack()}</g>`) : "")
    + cmpCard(t, MK("both") - .5, LT("q811") - .1, 1190, 360, TF(-200, -20, .5, `<g transform="rotate(-20)">${mangoLeaf({ id: "sm2" })}</g>`), "mango: net veins", mystL(170, -30, .5, { id: "sm3" }), "mystery: net veins")
    + cmpCard(t, LT("q811") + .3, MK("think0") - .1, 1190, 360, TF(-200, -20, .5, `<g transform="rotate(-20)">${mangoLeaf({ id: "sm4", hi: { edge: clamp((t - MK("feel")) / 1.5) } })}</g>`), "mango", mystL(170, -30, .5, { id: "sm5", hi: { edge: clamp((t - MK("feel") - .4) / 1.5) } }), "mystery leaf")
    + cmpCard(t, LT("q812") - .1, LE("q812") + .2, 1190, 360, TF(-200, -20, .5, `<g transform="rotate(-20)">${mangoLeaf({ id: "sm6", hi: { edge: 1 } })}</g>`) + `<circle cx="-60" cy="-60" r="60" fill="none" stroke="${P.ink}" stroke-width="7"/>`, t >= MK("straight") ? "straight edge" : "", mystL(170, -30, .5, { id: "sm7", hi: { edge: 1 } }) + `<circle cx="240" cy="-80" r="60" fill="none" stroke="${P.ink}" stroke-width="7"/>`, t >= MK("jagged") ? "jagged edge" : "")
    + cmpCard(t, MK("hib") - .2, LE("q814") + .4, 1190, 360, `<path d="M-330 60 Q-200 40 -110 -20" stroke="#6E4A2A" stroke-width="12" fill="none" stroke-linecap="round"/>` + TF(-150, 0, .5, `<g transform="rotate(-30) translate(-130 0)">${hibLeaf({ id: "sm8", noMark: true })}</g>`), "on the hedge", mystL(170, -10, .5, { id: "sm9", rot: -30 }), "mystery leaf",
      [[MK("tk1"), "veins", -150], [MK("tk2"), "edge", -90], [MK("tk3"), "shape", -30]].map(([a, lab, yy]) => t >= a - .1 ? OP(spring(t, a - .1, .4) * (1 + .1 * (t >= MK("match") && t < MK("match") + 2 ? Math.sin(t * 8) : 0)), `<path d="M-20 ${yy} H20" stroke="${P.ink}" stroke-width="4"/>` + tick(0, yy, .9) + T(0, yy + 50, lab, 24, P.ink)) : "").join(""));
  const think = t >= MK("think0") - .1 && t < LT("q812") - .1 ? (() => { const k = spring(t, MK("think0") - .1, .45) * (1 - ramp(t, LT("q812") - .4, .3));
    return `<rect width="1920" height="1080" fill="${P.night}" opacity="${n2(.45 * Math.min(1, k))}"/>` + TF(1190, 400, k, `<g filter="url(#drop)"><rect x="-560" y="-300" width="1120" height="560" rx="32" fill="#FFF8EA" stroke="${P.sun}" stroke-width="10"/></g>` + tpill(0, -300, "THINK!", 44, P.sun, P.ink, { w: 700 }) + T(0, -200, "Spot the difference: look at the edges.", 46, P.ink, { w: 700 })
      + TF(-260, 30, .62, `<g transform="rotate(-20)">${mangoLeaf({ id: "th1" })}</g>`) + TF(270, 40, .7, `<g transform="rotate(-20) translate(-130 0)">${hibLeaf({ id: "th2" })}</g>`) + tpill(-230, 210, "mango leaf", 30, "#fff", P.ink, { w: 700 }) + tpill(250, 210, "mystery leaf", 30, "#fff", P.ink, { w: 700 })); })() : "";
  const world = x2place("vd3", tapedLeaves(t), c) + x2pigeonTree(t, c, -9) + x2limFar(t, c) + CAM(x2desk(t), c[0], c[1], c[2]);
  const basil = x2bd("basil", 560, 1076, 360, tw_, { in: s.t0 - .5, flip: true, still: frz, poses: [[s.t0, "pointing"], [LE("q801") + .1, "arms_crossed"], [LE("q804") + .05, "laughing"], [LT("q805"), "sit"], [MK("rush") - .1, "hero/arms_crossed"], [LE("q806") + .1, "hero/arms_crossed"], [LT("q810") + .2, "sit"], [LE("q810") + .05, "sit"], [LT("q813"), "pointing"], [LE("q815") + .05, "hi5/cheer"], [MK("clap") + .8, "laugh/laughing"]], look: -4 });
  return world + wall + board + basil + stampG
    + x2glitchAt(tw_, [1, 960, 540], 1830, { tape: true, face: gFace, scr: gScr, k: .85 })
    + x2bd("momo", mx, 1076, 340, tw_, { in: s.t0 - .5, still: frz, flip: true, poses: [[s.t0, "sit"], [MK("kw_parallel_veins") + .05, "cheer"], [MK("kw_parallel_veins") + 2, "sit"], [LT("q804") - .1, "sit"], [LE("q804") + .05, "thinking"], [LT("q806") + .4, "worried/thinking"], [LT("q811") - .1, "sit"], [LE("q811") + .05, "thinking"], [LT("q814") + .3, "surprised"], [LE("q814"), "sit"], [MK("clap") - .3, "hi5/cheer"], [MK("clap") + .8, "laugh/cheer"]], look: -6, achieved: true })
    + x2bd("pip", px, 1076, 330, tw_, { in: s.t0 - .5, still: frz, flip: true, poses: [[s.t0, "sit"], [LE("q803") + .1, "sit"], [LE("q805") + .05, "pointing"], [LT("q806") + .3, "sit"], [LE("q808") + .05, "sit"], [LT("q810") + .5, "proud/arms_crossed"], [LT("q811"), "sit"], [LT("q814") + .3, "surprised"], [LE("q814"), "sit"], [MK("clap") - .3, "hi5/cheer"], [MK("clap") + .8, "laugh/cheer"]], look: -6, achieved: true })
    + (t >= MK("clap") - 1.0 ? TF(px + 120, 1060, .6, toolsBundle()) : x2held([1, 960, 540], "pip", px, 1076, 330, true, TF(0, 0, .8, clipPip()), 50, 30))
    + cmp + think
    + (t >= MK("rush") ? battleCry(t, MK("rush"), 1150, 250, "CASE CLOSED!", { d: 1.0, k: .5 }) : "") + x2said("q806")
    + (t >= MK("clr1") && t < MK("clr1") + .8 ? comicWord(t, MK("clr1"), cardAt(0)[0] + 90, cardAt(0)[1] - 120, "THUMP!", { size: 44, tiny: true, col: P.ink, d: .6 }) : "")
    + (t >= MK("stamp") ? comicWord(t, MK("stamp"), 560, 220, "CASE CLOSED!", { size: 70, d: 1.2, rot: -6 }) : "")
    + (t >= MK("clap") ? comicWord(t, MK("clap"), 930, 330, "CLAP!", { size: 110, d: 1.1 }) + popSpark(t, MK("clap"), 930, 420, 160) : "")
    + x2gSay("q807", 1600, 380, t) + x2frozen(frz ? 1 : 0) + x2HUD(t); };

/* ================================================================ GLITCH · "Show me the data", and the peace ================================================================ */
// the hedge end of the set: GLITCH rolls in between the trio and the hedge (screen face to the front); Basil next to him (this time he wins
// him over), Pip and Momo a step back; Uncle Lim by the hedge with his kopi. The chest display slides out beside GLITCH: the evidence one
// picture at a time, then KNOWLEDGE LOG · ENTRY 2 on top of entry 1
const CG = [1.15, (1.15 * 2112 - 1920) / .15, 1060];
const evPar = () => `<rect x="-280" y="-190" width="560" height="380" fill="#E8F3FF"/>` + TF(-140, -10, .62, `<g transform="rotate(-60)">${pandanLeaf(380, { w: 30, hi: true })}</g>`) + TF(150, 10, .5, `<g transform="rotate(-40) translate(-130 0)">${hibLeaf({ id: "ev1", hi: { small: 1 } })}</g>`) + T(-140, 170, "parallel", 34, INKG) + T(150, 170, "net", 34, INKG);
const evEdge = () => `<rect x="-280" y="-190" width="560" height="380" fill="#E8F3FF"/>` + TF(-230, 0, .5, `<g transform="rotate(-30)">${mangoLeaf({ id: "ev2", hi: { edge: 1 } })}</g>`) + TF(150, 10, .5, `<g transform="rotate(-40) translate(-130 0)">${hibLeaf({ id: "ev3", hi: { edge: 1 } })}</g>`) + T(-140, 170, "straight", 34, INKG) + T(150, 170, "jagged", 34, INKG);
const evMatch = () => `<rect x="-280" y="-190" width="560" height="380" fill="#E8F3FF"/>` + TF(-150, 0, .42, `<g transform="rotate(-40) translate(-130 0)">${hibLeaf({ id: "ev4", noMark: true })}</g>`) + TF(150, 0, .42, `<g transform="rotate(-40) translate(-130 0)">${hibLeaf({ id: "ev5" })}</g>`) + [0, 1, 2].map((i) => tick(-60 + i * 60, 140, .9)).join("") + T(0, -150, "HIBISCUS", 36, INKG);
function logCard2(t, u, cnt) { const fy = lerp(-60, -8, eio(clamp(u)));
  return `<rect x="-280" y="-190" width="560" height="380" fill="#DDF5EC"/>` + T(0, -146, "KNOWLEDGE LOG", 44, INKG, { ls: 2 }) + `<path d="M-230 -100 h150 l26 26 h284 v230 h-460z" fill="#F4C76B" stroke="${INKG}" stroke-width="6"/>`
    + `<g transform="translate(-14 -78) rotate(-3)"><rect x="-226" y="-30" width="452" height="60" rx="10" fill="#EFEFEF" stroke="${INKG}" stroke-width="4"/>${T(0, 10, "1 · ROOTS NEED AIR", 28, "#59616B")}</g>`
    + `<g transform="translate(0 ${n2(fy + 14)})"><rect x="-226" y="-82" width="452" height="170" rx="12" fill="#fff" stroke="${INKG}" stroke-width="5"/>${T(0, -36, "READ A LEAF", 40, INKG)}${T(0, 10, "BY ITS PARTS", 40, INKG)}${T(0, 62, "COLOUR + SIZE: WEAK CLUES", 30, "#D9302A")}</g>`
    + `<path d="M-230 104 h460 v52 h-460z" fill="#E9B04F" stroke="${INKG}" stroke-width="6"/>` + tpill(0, 130, `ENTRY ${cnt}`, 40, INKG, "#9FFFE0", { w: 700 }); }
SC.glitch = (t, s) => { const c = CG, tA = s.t0, ev1 = MK("ev1"), ev2 = MK("ev2"), ev3 = MK("ev3"), ez = MK("bzzt"), tU = MK("upd"), tSt = MK("stored"), tSc = MK("scan"), chill = MK("weakc") + 1.0, tP = MK("peel"), tG = LT("g907");
  const gx = t < tG ? lerp(2300, 1620, eo(clamp((t - tA) / 1.6))) : t < LT("g908") + .3 ? lerp(1620, 1700, eio(clamp((t - tG) / 1.2))) : t < tP ? 1700 : lerp(1700, 1790, eio(clamp((t - tP) / 1.2)));
  let pose = "crossed", face = "smug", scr = "", tape = true, left = true;
  if (t >= LT("g902")) { pose = "down"; face = "surprised"; tape = false; }
  if (t >= tSc) scr = scrScan((t - tSc) * .9);
  if (t >= ez) { face = "error"; scr = ""; }
  if (t >= LE("g904") + .1) face = "plain";
  if (t >= LT("g906") - .1) { pose = "crossed"; face = "grumpy"; scr = scrBar(clamp((t - tU) / (tSt - tU + .3))); }
  if (t >= tSt + .2) { pose = "up"; face = "happy"; scr = ""; }
  if (t >= chill && t < chill + 8 / 30) face = "narrow";
  if (t >= tG - .2) { pose = "crossed"; face = "happy"; tape = true; left = false; }
  if (t >= LT("g908")) { face = "surprised"; }
  if (t >= LT("g909") - .1) { face = "grumpy"; tape = false; pose = "down"; }
  if (t >= tP) { face = "happy"; pose = "down"; left = false; }
  const roll = Math.abs(gx - 2300) / GK, sparks = t >= ez && t < ez + 1.6 ? CAM([0, 1].map((i) => { const u = ((t - ez) * 3 + i * .5) % 1; return `<path d="M${n2(gx - 30 + i * 60)} ${n2(1042 - 400 - 20 * u)} l8 -16 l-6 0 l8 -16" stroke="#FFE27A" stroke-width="6" fill="none" opacity="${n2(1 - u)}"/>`; }).join(""), c[0], c[1], c[2]) : "";
  const glitch = x2glitchAt(t, c, gx, { left, tape, pose, face, roll, scr, stutter: t >= ez && t < ez + .3 ? [ez, ez + .3] : null });
  const pk = t >= tSc - .2 && t < ez ? spring(t, tSc - .2, .45) : t >= tU && t < tG ? spring(t, tU, .45) * (1 - ramp(t, tG - .4, .3)) : t >= ez && t < ez + .3 ? 1 - ramp(t, ez, .3) : 0;
  const pic = t < ev2 - .1 ? evPar() : t < ev3 - .1 ? evEdge() : evMatch();
  const panel = t < tU ? chestPanel(t, 1, t < tSc + .8 ? `<rect x="-280" y="-190" width="560" height="380" fill="#DDF5EC"/>` + T(0, 16, "SCANNING...", 52, INKG) : pic) : chestPanel(t, 1, logCard2(t, (t - tSt - .2) / .8, t >= chill ? 2 : 1));
  const [gsx] = camPt(c, [gx, 0]);
  const lim = CAM(TF(2025, 1000, .55, limStand(t, { bag: true, sip: t > LE("g908") + .3 && t < tP + 2 ? .8 : 0, nod: t >= LT("g908") && t < LE("g908") ? .08 * Math.sin((t - LT("g908")) * 6) : 0, talk: t >= LT("g908") - .1 && t <= LE("g908") + .1 })), c[0], c[1], c[2]);
  const basket = t >= tP - .6 ? x2held(c, "pip", 1180, 1060, 340, true, TF(0, 0, .7, basketV3(t < tP + .5 ? 0 : t < tP + 1.4 ? 1 : t < tP + 2.0 ? 2 : 3)), 0, 40) : "";
  return x2place("vd3", tapedLeaves(t, PEEL()) + TF(1860, 832, .26, snail3(t)), c) + lim
    + x2bc(c, "momo", 860, 1062, 360, t, { in: s.t0 - .5, poses: [[0, "surprised"], [LT("g901") + .6, "sit"], [LT("g904") + .1, "thinking"], [LE("g905") - .3, "sit"], [tSt + .2, "cheer"], [tSt + 1.6, "sit"], [LT("g908") + .5, "laugh/cheer"], [LE("g908") + .5, "sit"]], look: 6, achieved: true })
    + x2bc(c, "pip", 1180, 1060, 340, t, { in: s.t0 - .5, poses: [[0, "sit"], [LE("g903") + .05, "proud/arms_crossed"], [LT("g905"), "sit"], [tSt + .2, "cheer"], [tSt + 1.6, "sit"], [tP - .6, "sit"]], look: 8, achieved: true }) + basket
    + x2bc(c, "basil", 1420, 1062, 350, t, { in: s.t0 - .5, poses: [[0, "surprised"], [LT("g901") + .4, "sit"], [LE("g902") + .05, "pointing"], [LT("g903"), "sit"], [LT("g905") - .1, "sit"], [LE("g905") + .1, "arms_crossed"], [LT("g907") + .3, "sit"], [LE("g909") + .2, "laughing"]], look: 6 })
    + (t >= LT("g902") && t < tSc + 1.0 ? x2held(c, "basil", 1420, 1062, 350, false, TF(0, 0, .5, `<rect x="-90" y="-70" width="180" height="140" rx="8" fill="#E8C98A" stroke="#7A5226" stroke-width="7"/>` + T(0, 12, "CASE FILE", 28, "#7A5226")), -30, 40) : "")
    + glitch + sparks
    + (pk > .01 ? TF(gsx, 300, pk * .82, panel) : "")
    + x2gSay("g901", 1500, 300, t) + x2gSay("g904", 1500, 300, t) + x2gSay("g906", 1100, 220, t, { maxW: 600 }) + x2gSay("g907", 1500, 300, t) + x2gSay("g909", 1500, 300, t) + say("g908", 1600, 300, t, { size: 40, maxW: 460, tail: 0 })
    + (t >= LT("g901") ? comicWord(t, LT("g901") - .2, 1450, 380, "BEEP-BOOP!", { size: 60, d: .8, rot: 8 }) : "")
    + (t >= ez ? comicWord(t, ez + .02, gsx + 220, 520, "BZZT!", { size: 104, d: .9, rot: 10 }) : "")
    + (t >= tG ? comicWord(t, tG + .3, ...camPt(c, [1500, 620]), "SKRITCH!", { size: 64, d: .7 }) : "")
    + (t >= tP ? comicWord(t, tP + .3, ...camPt(c, [1700, 560]), "SKRITCH! SKRITCH!", { size: 64, d: 1.2, rot: -6 }) : "")
    + inset3(t, MK("newleaves") - .2, LE("g908") + .3, 520, 330, "the plant grows new leaves", picNewLeaves(t), P.leaf, 380, 270)
    + x2HUD(t); };

/* ================================================================ REVEAL · the witness ================================================================ */
// back at the hedge: one smooth push-in onto the snail under a hibiscus leaf, nibbling its edge, the tiny crown on its shell; the black ring
// closes round it on the blue stage; it is circled; the fun fact (its tongue: thousands of tiny teeth); "Tell someone at home!"
SC.reveal = (t, s) => { const [sx, sy, sk] = [1860, 832, .26], IX = 1420, IY = 470, u = eio(clamp((t - s.t0 - .2) / 1.2)), c = camMix(CG, camOn([sx + 5, sy - 18], 3.0, IX, IY), u), ki = clamp((t - s.t0 - 1.2) / .5), tR = MK("rsnail") + .1, kr = t < tR ? 0 : spring(t, tR, .5);
  const nib = t >= s.t0 + .5 ? TF(sx + 62, sy - 52, .17, `<g transform="rotate(-40) translate(-130 0)">${hibLeaf({ id: "rvl", noMark: true })}</g>`) : "";
  const view = x2place("vd3", nib + TF(sx, sy, sk, snail3(t, { ph: t * 2 })), c);
  const ff = t >= MK("ff_in") - .2 ? TF(600, 450, spring(t, MK("ff_in") - .2, .45), `<g filter="url(#drop)"><rect x="-360" y="-250" width="720" height="500" rx="30" fill="url(#gPaper)" stroke="#E3C9A8" stroke-width="7"/></g>` + tpill(-180, -250, "FUN FACT!", 40, P.momo, "#fff", { w: 700, ls: 3 })
    + `<clipPath id="ffT"><rect x="-320" y="-200" width="640" height="320" rx="20"/></clipPath><g clip-path="url(#ffT)"><g transform="scale(1.9 1.6)">${picTongue()}</g></g>` + tpill(0, 190, "a snail's tongue: thousands of tiny teeth", 32, P.momo, "#fff", { w: 700 })) : "";
  const tell = t >= LT("r954") - .1 ? TF(960, 975, spring(t, LT("r954") - .1, .45), tpill(0, 0, "Tell someone at home!", 48, P.sun, P.ink, { w: 700 })) : "";
  return view + iris(ki, IX, IY, 210, "irR") + (kr ? `<circle cx="${IX}" cy="${IY}" r="${n2((184 + 6 * Math.sin(t * 6)) * kr)}" fill="none" stroke="${P.sun}" stroke-width="10"/>` + popSpark(t, tR, IX, IY, 230) : "")
    + (ki > .5 ? TF(IX, IY + 270, spring(t, s.t0 + 1.6, .4), tpill(0, 0, "garden snail", 40, P.ink, "#fff", { w: 700 })) : "") + ff + tell
    + x2bd("momo", 1780, 1076, 380, t, { in: s.t0 - .3, flip: true, poses: [[s.t0, "sit"], [LE("r952") + .05, "surprised"], [LT("r953"), "sit"]], look: -6 })
    + x2bd("basil", 1100, 1076, 330, t, { in: s.t0 - .3, flip: true, poses: [[s.t0, "sit"], [LE("r953") + .05, "deadpan"]], look: -4 })
    + logo(t); };

/* ================================================================ WORDS · THE WORDS THAT EARN MARKS (Pip reads) ================================================================ */
const wordsStrip = (t, t0) => OP(ramp(t, t0, .4), TF(820, 985, .42, `<g transform="rotate(-6) translate(-130 0)">${hibLeaf({ id: "wsl" })}</g>`)
  + [["leaf blade", 640, 925, 840, 980], ["leaf stalk", 600, 1040, 772, 1000], ["main vein", 1050, 925, 880, 984], ["smaller veins", 1080, 1040, 900, 1002]].map(([w, x, y, px, py]) => plabel(x, y, w, px, py, 28, "#fff")).join("")
  + TF(1250, 1000, .55, `<g transform="rotate(-4)">${pandanLeaf(300, { w: 24 })}</g>`) + plabel(1420, 935, "parallel", 1340, 995, 28, "#fff"));
SC.words = (t, s) => markScene(t, s, { id: "m1003", sayId: "m1002", who: "pip", tab: "WORDS THAT EARN MARKS", text: TL.lines.m1003.text, keys: ["blade", "stalk", "main", "vein", "smaller", "veins", "attaches", "stem", "parallel", "net", "pattern"], size: 46, y: 170, footer: FOOT, achieved: true, poses: [[LE("m1003") + .2, "sit"]], bin: s.t0 - .5,
  extra: wordsStrip(t, s.t0 + 1.2) + x2bd("momo", 1560, 1076, 280, t, { in: s.t0 - .5, flip: true, poses: [[0, "sit"]], look: -4, mouth: t >= LT("m1003") && t < LE("m1003") ? Math.floor(t * 6) % 2 : undefined }) + x2bd("basil", 1800, 1076, 280, t, { in: s.t0 - .5, flip: true, poses: [[0, "sit"]], look: -4, mouth: t >= LT("m1003") && t < LE("m1003") ? Math.floor(t * 6 + 1) % 2 : undefined }) });

/* ================================================================ FINISH · the cosy end: GLITCH's new rule, the callback, the score ================================================================ */
// a wide shot of the void deck: the trio by the pandan pot, Uncle Lim at his table, GLITCH rolling along by the hedge; he scans a fallen leaf by
// its parts and leaves it on the ground; then a two-shot at the pandan: "am I shorter than a pandan leaf?" "Case closed."; the score
SC.finish = (t, s) => { const tL = LT("k1101") - 1.4, tOff = LE("k1103") - .2, two = eio(clamp((t - LT("k1104") + .6) / .9)), c = camMix([1, 960, 540], camOn([420, 760], 1.3, 760, 640), two);
  const gx = t < tOff ? lerp(2250, 1560, eo(clamp((t - tL) / 1.4))) : lerp(1560, 2300, ei(clamp((t - tOff) / 1.8))), leaving = t >= tOff;
  const gScr = t >= LT("k1101") && t < tOff ? scrParts((t - LT("k1101")) / 2.4) : "";
  const glitch = gx < 2280 ? x2glitchAt(t, c, gx, { left: !leaving, tape: !leaving && t < LT("k1103") + .8, pose: leaving || t >= LT("k1103") + .8 ? "up" : "crossed", face: "happy", roll: Math.abs(gx - 2250) / GK, scr: gScr }) : "";
  const ground = CAM(TF(1440, 1046, .2, `<g transform="scale(1 .45) rotate(20) translate(-130 0)">${hibLeaf({ id: "fgl", noMark: true })}</g>`), c[0], c[1], c[2]);
  const tap = MK("coin1") - 9;
  return x2place("vd3", "", c) + x2pigeonTree(t, c, -9) + x2limFar(t, c, { sip: t > tL && t < LT("k1104") ? .7 : 0 }) + CAM(x2desk(t), c[0], c[1], c[2]) + ground
    + x2bc(c, "pip", 400, 1060, 340, t, { in: s.t0 - .5, poses: [[0, "sit"], [LE("k1104") + .05, "thinking"], [LT("k1105") + .4, "laugh/cheer"], [LT("k1106") - .2, "sit"], [MK("coin1") + .1, "hi5/cheer"]], look: 6, achieved: true })
    + x2bc(c, "basil", 640, 1060, 350, t, { in: s.t0 - .5, flip: true, poses: [[0, "sit"], [LT("k1105") - .1, "sit"], [LE("k1105") + .05, "deadpan"], [LT("k1106") + .2, "arms_crossed"]], look: -4 })
    + (t >= LT("k1105") - .3 && t < LE("k1105") + .8 ? x2held(c, "basil", 640, 1060, 350, true, TF(0, 0, .4, stampHandle()), -40 - 30 * Math.max(0, Math.sin(Math.PI * clamp((t - LT("k1105")) / .5))), 40) : "")
    + x2bc(c, "momo", 880, 1062, 360, t, { in: s.t0 - .5, poses: [[0, "sit"], [LT("k1102") - .1, "sit"], [LE("k1102") + .05, "pointing"], [LE("k1103") + .1, "cheer"], [LE("k1103") + 1.5, "sit"], [LE("k1105") + .05, "laugh/cheer"], [LT("k1106") + .3, "hi5/cheer"]], look: 6, achieved: true })
    + glitch + x2gSay("k1101", 1500, 330, t) + x2gSay("k1103", 1500, 330, t)
    + (t >= LT("k1101") ? comicWord(t, LT("k1101") - .3, ...camPt(c, [1500, 600]), "beep.", { size: 40, tiny: true, col: "#2E9E4C", d: .7 }) : "")
    + (t >= MK("coin1") ? coin(t, MK("coin1"), 1640, 200, "+1", "YOU and BASIL") : "") + x2HUD(t); };

/* ================================================================ NEXT · a prickly customer (wordless): the link to EP4 ================================================================ */
// DING! a potted cactus hops up onto the Help Desk (the pot leading, small hops, dust on landing only, never floating), three plastic leaves
// sticky-taped on it; all three turn slowly to GLITCH; "...Not me." (his eyes dart sideways); Heart's line
const CHOPS = [[660, 1078], [760, 1074], [860, 1070], [960, 792]];
function cactusHop(t, t0) { const per = .38, i = Math.floor((t - t0) / per); if (t < t0) return null; if (i >= CHOPS.length - 1) return { x: CHOPS[CHOPS.length - 1][0], y: CHOPS[CHOPS.length - 1][1], sq: pulse(t, t0 + (CHOPS.length - 1) * per, .02, .2), dust: 0 };
  const f = ((t - t0) / per) % 1, [xa, ya] = CHOPS[i], [xb, yb] = CHOPS[i + 1]; return { x: lerp(xa, xb, f), y: lerp(ya, yb, f) - 120 * Math.sin(Math.PI * f), sq: f < .15 ? 1 - f / .15 : 0, dust: f < .2 ? 1 - f / .2 : 0 }; }
SC.next = (t, s) => { const tD = MK("ding"), tT = MK("turn"), c = camMix([1, 960, 540], camOn([1100, 760], 1.3, 960, 600), eio(clamp((t - tD - .2) / 1.4)));
  const h = cactusHop(t, tD + .1), cac = h ? CAM(TF(h.x, h.y, .5, cactusV3(t, { sq: h.sq }) + dustPuffs(h.dust) + `<rect data-face="cactus" x="-60" y="-100" width="120" height="80" fill="none" stroke="none"/>`), c[0], c[1], c[2]) : "";
  const look = t >= tT ? 1 : 0, gFace = t >= LT("n1201") - .3 && t < LE("n1201") + .2 ? (Math.floor((t - LT("n1201")) * 4) % 2 ? "narrow" : "plain") : "plain";
  return x2place("vd3", "", c) + x2bc(c, "basil", 1170, 960, 380, t, { in: s.t0 - .5, flip: look === 0, poses: [[0, "sit"], [tD + .3, "surprised"], [tT + .3, "deadpan"], [LT("n1202") + .3, "surprised"]], look: -4 })
    + CAM(x2desk(t, { ding: pulse(t, tD, .02, .3) }), c[0], c[1], c[2]) + cac
    + x2bc(c, "momo", 460, 1060, 370, t, { in: s.t0 - .5, poses: [[0, "sit"], [tD + .2, "surprised"], [LT("n1202") + .3, "surprised"]], look: look ? 8 : 6 })
    + x2bc(c, "pip", 1640, 1012, 360, t, { in: s.t0 - .5, flip: true, poses: [[0, "sit"], [tD + .2, "surprised"], [tT + .2, "thinking"], [LT("n1202") + .3, "surprised"]], look: -6 })
    + x2glitchAt(t, c, 1850, { tape: true, face: gFace, scr: scrLRS() })
    + (t >= tD - .05 ? comicWord(t, tD, 1430, 470, "DING!", { size: 80, d: .8, rot: 6 }) : "")
    + (t >= LT("n1201") ? comicWord(t, LT("n1201") - .2, ...camPt(c, [1720, 600]), "beep-boop...", { size: 40, tiny: true, col: "#0E3A3A", d: 1.0 }) : "")
    + x2gSay("n1201", 1500, 380, t) + logo(t); };

/* ================================================================ "Now you know!" (the prop: the CASE CLOSED file with the mystery leaf clipped to it); the outro: GLITCH, wordless ================================================================ */
SC.nyk = (t, s) => { const kn = TL.lines.h1305.know, tg = kn + .6, u = clamp((t - tg) / 3.2);
  // the outro (end-screen time): at the side, GLITCH rolls past a fallen leaf, scans it, and leaves it on the ground; nothing in the bottom fifth
  const gx = u < .4 ? lerp(2100, 1580, eo(u / .4)) : u < .7 ? 1580 : lerp(1580, 2150, ei((u - .7) / .3)), scan = u >= .42 && u < .68, back = u >= .7;
  const outro = t >= tg - .1 ? TF(1700, 600, .22, `<g transform="scale(1 .45) translate(-130 0)">${hibLeaf({ id: "nyl", noMark: true })}</g>`) + (gx < 2100 ? TF(gx, 600, back ? .17 : -.17, `<!--FACES:right glitch-->` + glitchV3(t, { pose: scan ? "down" : "up", face: "happy", roll: Math.abs(gx - 2100) / .17, talk: false, mirror: !back, scr: scan ? scrParts((u - .42) / .2) : "" }), 0, .17) : "") + (scan ? comicWord(t, tg + 1.5, 1650, 400, "beep.", { size: 40, tiny: true, col: P.ink, d: .6 }) : "") : "";
  const prop = TF(960, 600, .62, `<g transform="rotate(-4)"><g filter="url(#drop)"><path d="M-300 -200 h170 l24 -30 h110 l24 30 h272 v400 h-600z" fill="#E8C98A" stroke="#7A5226" stroke-width="9"/></g>${TF(-60, 30, .7, `<g transform="rotate(-20) translate(-130 0)">${hibLeaf({ id: "nyp" })}</g>`)}<path d="M-150 -60 h30 v70 h-30z" fill="none" stroke="#8C96A2" stroke-width="7"/>${TF(150, 120, .9, stampMark("CASE CLOSED", "#2E9E4C", 40))}</g>`);
  return nykScene(t, s, prop + outro, { bx: [250, 1795, 1470], hx: 470 }); };

/* ================================================================ BLOOPER (after the end card) ================================================================ */
// the help desk; the clapperboard BLOOPER / TAKE 2; Basil slams the case-file folder shut with a flourish... and the mystery leaf flutters
// out from between the pages and lands on the floor (edge first, then flat); Momo, deadpan, points at the floor; Basil: "...Case reopened."
SC.blooper = (t, s) => { const tk = MK("take2"), tS = MK("slap"), tF = MK("flutter"), c = [1, 960, 540];
  const shut = t < tS - .25 ? 0 : clamp((t - tS + .25) / .25), fu = clamp((t - tF + .3) / 1.2);
  const folder = TF(800, 950, .7, `<g filter="url(#dropS)"><rect x="-150" y="-110" width="300" height="220" rx="10" fill="#E8C98A" stroke="#7A5226" stroke-width="7"/></g><g transform="translate(-150 -110) scale(1 ${n2(1 - 2 * shut)})" opacity="${n2(shut < .5 ? 1 : .0)}"><rect x="0" y="0" width="300" height="220" rx="10" fill="#F2DDA8" stroke="#7A5226" stroke-width="7"/></g>${T(0, 14, "CASE FILE", 36, "#7A5226")}`);
  const lx = lerp(820, 1180, fu) + 60 * Math.sin(fu * 9) * (1 - fu), ly = lerp(900, 1050, ei(fu)), rot = fu < 1 ? -70 + 60 * Math.sin(fu * 7) : 0, flat = fu >= 1 ? .45 : lerp(1, .55, fu);
  const leaf = t >= tF - .3 ? TF(lx, ly, .3, `<g transform="rotate(${n2(rot)}) scale(1 ${n2(flat)}) translate(-130 0)">${hibLeaf({ id: "bll" })}</g>`) : "";
  return bg("stage") + `<rect width="1920" height="1080" fill="#000" opacity=".2"/>` + TF(960, 200, spring(t, s.t0 + .05, .4) * .8, clapper27(t > tk ? 1 - ramp(t, tk, .12) : (t < s.t0 + .4 ? 1 : 0)))
    + OP(ramp(t, s.t0, .3), T(960, 380, "(bloopers)", 40, "#fff", { w: 500 }))
    + x2bd("basil", 500, 1076, 420, t, { in: s.t0 - .5, poses: [[0, "hero/pointing"], [tS + .3, "arms_crossed"], [LT("e1702") + .3, "sit"], [LE("e1703") + .05, "shrug/oops"]], look: 4, noreact: true })
    + folder + leaf + (t >= tS ? comicWord(t, tS, 880, 640, "SLAP!", { size: 90, d: .7 }) : "")
    + x2bd("momo", 1420, 1076, 400, t, { in: s.t0 - .5, flip: true, poses: [[0, "sit"], [LT("e1702") - .1, "sit"], [LE("e1702") + .05, "pointing"], [LE("e1703") + .1, "laugh/cheer"]], look: -4 })
    + x2bd("pip", 1760, 1076, 380, t, { in: s.t0 - .5, flip: true, poses: [[0, "sit"], [LE("e1703") - .2, "laughing/cheer"], [LT("e1704") - .1, "sit"]], look: -4 }) + logo(t); };

/* ================================================================ GLITCHEND · GLITCH ALONE: his signature ending (the very last shot) ================================================================ */
// as EP2: the dim corner of the void-deck science lab, GLITCH alone on his charging dock, lit by his own screen; .6 s still -> 1.0 s THE
// GLITCH (his sprite only) -> 1.8 s TRUE SILENCE (the calm narrow eyes) -> "New knowledge acquired." -> a hard cut to black. New in EP3 (the
// cheap readable signs of "stronger"): the log shows 2, the antenna light a touch brighter and steadier, the voice a shade calmer (make_voice)
SC.glitchend = (t, s) => { const tS = MK("stutter"), tQ = MK("silence"), tA = MK("acq"), tB = MK("black"), z = 1 + .12 * clamp((t - s.t0) / (tB - s.t0));
  if (t >= tB) return `<rect width="1920" height="1080" fill="#000"/>`;
  const face = t < tS ? "plain" : t < tQ ? (Math.floor(t * 30) % 3 === 0 ? "error" : "plain") : "acquired";
  const glowLog = t >= tA ? pulse(t, tA, .05, .6) : 0;
  const tag = `<g transform="translate(0 -250)">${tpill(0, 0, "KNOWLEDGE LOG · 2", 30, "#0E3A3A", "#9FFFE0", { w: 700 })}${glowLog > .02 ? `<rect x="-170" y="-30" width="340" height="60" rx="30" fill="#9FFFE0" opacity="${n2(.5 * glowLog)}"/>` : ""}</g>`;
  const PD = GM.poses.down, bx = (PD.bulb ? PD.bulb.x - PD.ox : 0) * PD.scale, by = (PD.bulb ? PD.bulb.y - PD.oy : -860) * PD.scale;
  const g = glitchV3(t, { pose: "down", face, talk: false, stutter: [tS, tQ], dim: .2, glow: 1 }) + (t >= tQ ? `<circle cx="${n2(bx)}" cy="${n2(by)}" r="34" fill="#FFF6B0" opacity=".55" filter="url(#b4)"/>` : "");   // EP3: steadier, a touch brighter
  const scene = labCornerV3(t) + TF(960, 960, 1, dockV3(t >= tQ ? 1 : .6)) + TF(960, 940, .62, g)
    + `<rect width="1920" height="1080" fill="#000" opacity=".25"/>` + TF(960, 940, .62, `<g transform="translate(0 -${n2(560)})">${OP(t >= tS ? 1 : .8, tag)}</g>`);
  return `<g transform="translate(960 600) scale(${n2(z)}) translate(-960 -600)">${scene}</g>`; };
