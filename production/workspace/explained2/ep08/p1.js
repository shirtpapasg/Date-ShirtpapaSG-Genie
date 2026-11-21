// p1.js: PART 1, "This Jar Was Once SAND! What Are Things Made Of?": objects and materials, glass, metal, plastic, ceramic.
// Segments 1-14 of p3_ep08_script.md (Part 1 Segment 2 as updated on 2026-11-20 to open from EP7's dare).
// STAGE 2 (drawn): the set and props are in canteen.js, the picture boards in pics.js, the journey (SC.shrink) in shrink.js.
if (PART === 1) { (() => {
const L1 = "g701", L2 = "g1102";
// the scores (script section 3): HOLD ON! 1 : 0, Round 1 2 : 1, Round 2 3 : 2
SCORE.push([W("g603", "one") - .1, 1, 0]);
SCORE.push([W("g903", "one") - .1, 2, 1]);
SCORE.push([W("g1112", "one") - .1, 3, 2]);
const tSand = W("g201", "sand") - .1;               // the sand pile pops on the table (and stays)

/* ============ 1 · the silent cold open: the school canteen at recess ============ */
// the thumbnail's frame (thumb_still.js ... "&thumb"): the glass jar large, the pile of sand beside it, joined by the plain line; Basil surprised
const THUMB1 = (t) => { const cam = [1.9, 640, 760]; return canteenView(t, { noitems: true, items: TF(520, TY + 30, 1.0, sandPile()) + TF(880, TY + 6, 1.12, glassJar()) }, cam)
  + pline(gx(cam, 590), gy(cam, TY - 16), gx(cam, 770), gy(cam, TY - 60)) + buddy("basil", 190, 800, 250, t, { aura: true, tag: false, pose: "surprised", still: true }) + logo(t); };
SC.cold = (t, s) => { if (location.search.includes("thumb")) return THUMB1(t); const tb = MK("boardIn"), tp = MK("budsIn"), z = 1.02 + .02 * eio(t / 7);
  return canteenView(t, {}, [z, 960, 600]) + boardSlide(t, tb, BRD[0], BRD[1], BRD[2])
    + sMomo(t, { poses: [[0, "sit"], [tb + .55, "surprised"], [tb + 1.9, "sit"]] }) + sPip(t, { in: tp, poses: [[tp, "waving"], [tp + 1.4, "sit"]], wave: true }) + sBasil(t, { in: tp + .25, poses: [[tp + .25, "surprised"]] })
    + OP(1 - ramp(t, tb - .4, .3), lowerPill(60, 60, "School canteen, recess time,", "Singapore")); };

/* ============ 2 · last time (EP7's dare), the new chapter, the hook and the title ============ */
const GROUPS4 = [["PLANTS", "#2FA65A"], ["ANIMALS", "#F08A24"], ["FUNGI", "#9B6BFF"], ["BACTERIA", "#3A8DFF"]];
const sandQ = (t, cam) => t < tSand ? "" : TF(gx(cam, CX.sand) + 4, gy(cam, TY - 78), spring(t, tSand + .15, .45) * (1 + .05 * Math.sin(t * 4)), `<g filter="url(#dropS)"><circle r="40" fill="url(#gSun)"/></g>${T(0, 21, "?", 60, P.ink)}`);
SC.callback = (t, s) => { const a = "g201", b = "g202", tw_ = [W(a, "plastic") - .15, W(a, "metal") - .15, W(a, "glass") - .15], g = (i) => pulse(t, tw_[i], .1, 1.2), tL = LT(b) - .1, tN = W(b, "now") - .15, tM = W(b, "made") - .1;
  const off = eio((t - tN) / .5) * -2300, sw = clamp((t - tM) / 1.3);
  const chips = t < tL ? "" : TF(960 + off, 150, spring(t, tL, .4), tpill(0, 0, "Living things", 44, "#1F8A4C", "#fff", { w: 700 })) + GROUPS4.map(([nm, col], i) => { const k = spring(t, tL + .3 + i * .13, .45); return k < .02 ? "" : TF(390 + i * 380 + off, 260, k, `<g filter="url(#dropS)"><rect x="-170" y="-48" width="340" height="96" rx="48" fill="${col}"/><rect x="-162" y="-40" width="324" height="80" rx="40" fill="none" stroke="#fff" stroke-width="4" opacity=".8"/></g>${T(0, 17, nm, 48, "#fff", { ls: 3 })}`); }).join("");
  const nl = t < tN + .35 ? "" : TF(960, 210, spring(t, tN + .35, .5) * (1 + .03 * Math.sin(t * 4)), `<g filter="url(#glowS)"><rect x="-470" y="-66" width="940" height="132" rx="66" fill="url(#gBlue)"/><rect x="-458" y="-54" width="916" height="108" rx="54" fill="none" stroke="#fff" stroke-width="5" opacity=".8"/></g>${T(0, 25, "NON-LIVING THINGS", 74, "#fff", { ls: 5 })}`);
  return canteenView(t, { glow: { plastic: g(0), metal: g(1), jar: g(2) }, sand: spring(t, tSand, .45), back: sw > 0 && sw < 1 ? `<ellipse cx="${n2(lerp(60, 1500, sw))}" cy="${TY - 30}" rx="260" ry="120" fill="${P.sun}" opacity="${n2(.5 * Math.sin(Math.PI * sw))}" filter="url(#b30)"/>` : "" }, CAMW)
    + sandQ(t, CAMW) + boardAt(t, ...BRD) + chips + nl + (t >= tM ? TF(960, 370, spring(t, tM, .45), tpill(0, 0, "What are they made of?", 52, P.ink, "#fff", { w: 700 })) : "")
    + sPip(t) + sBasil(t) + sMomo(t, { poses: [[s.t0, "sit"], [tSand, "surprised"], [tSand + 1.6, "sit"]] }) + HUD(t); };
SC.hook = (t, s) => { const L = "g203", tw_ = [W(L, "plastic") - .2, W(L, "metal") - .2, W(L, "glass") - .2], g = (i) => pulse(t, tw_[i], .1, 1.2), tT = MK("title"), u = t - tT, dim = clamp(u / .2);
  const tags = ["plastic", "metal", "glass"].map((nm, i) => t < tw_[i] ? "" : TF(gx(CAMW, [CX.plastic, CX.metal, CX.jar][i]), gy(CAMW, TY + 66), spring(t, tw_[i], .4), tpill(0, 0, nm, 38, "#fff", P.ink, { w: 700 }))).join("");
  return canteenView(t, { glow: { plastic: g(0), metal: g(1), jar: g(2) }, sand: 1 }, CAMW) + sandQ(t, CAMW) + tags + boardAt(t, ...BRD) + sPip(t) + sBasil(t, { poses: [[s.t0, "sit"], [tT - .1, "arms_crossed"]] }) + sMomo(t, { poses: [[s.t0, "sit"], [tT - .1, "thinking"]] })
    + (u > 0 ? `<rect width="1920" height="1080" fill="${P.night}" opacity="${n2(.68 * dim)}"/>` + slamLine(380, "WHAT IS IT MADE OF?", 150, "#fff", slamK(u, .05)) + slamLine(570, "ONE WAS ONCE SAND!", 150, P.sun, slamK(u, .4))
      + (u > .8 ? TF(960, 730, spring(t, tT + .8, .45), tpill(0, 0, "Which one? Hold on to your answer!", 44, P.ink, "#fff", { w: 600 })) : "") : "") + HUD(t); };

/* ============ 3 · the game; 4 · today's goals (the countdown is in common.js) ============ */
SC.game = (t, s) => gameScene(t, s, "g301", true);
const tile4 = [["metal", -78], ["ceramic", -26], ["glass", 26], ["plastic", 78]].map(([k, x]) => `<rect x="${x - 22}" y="-22" width="44" height="44" rx="10" fill="${MATK[k].col}" stroke="#fff" stroke-width="4"/>`).join("");
SC.goals = (t, s) => goals3(t, s, [["Objects and materials", TF(-14, 0, .5, spoon())], ["Four of the 7 materials", TF(0, 0, 1.1, tile4)], ["Where each one comes from", TF(0, 32, .62, sandPile())]]);

/* ============ 5 · object and material: the spoon ============ */
const CAMS = [2.0, 1150, 866], SPX = gx(CAMS, CX.spoon), SPY = gy(CAMS, TY + 30), BOWLX = gx(CAMS, CX.spoon + 112 * .7);
// the round close-up of the spoon's shiny surface (what the magnifying glass shows)
const shine = (r) => `<clipPath id="shn"><circle r="${r}"/></clipPath><g clip-path="url(#shn)"><rect x="${-r}" y="${-r}" width="${2 * r}" height="${2 * r}" fill="url(#cSteel)"/>${Array.from({ length: 9 }, (_, i) => `<path d="M${-r} ${-r + i * r * .25 + 6} H${r}" stroke="#fff" stroke-width="2" opacity=".5"/>`).join("")}<path d="M${-r * .7} ${-r * .2} Q0 ${-r * .9} ${r * .8} ${-r * .5}" fill="none" stroke="#fff" stroke-width="${r * .22}" stroke-linecap="round" opacity=".95"/><ellipse cx="${r * .3}" cy="${r * .45}" rx="${r * .4}" ry="${r * .14}" fill="#fff" opacity=".6"/><ellipse cx="${-r * .4}" cy="${r * .5}" rx="${r * .16}" ry="${r * .08}" fill="#6E7A88" opacity=".35"/></g>`;
// the magnifying glass standing on its two little feet (origin = the middle of the lens; the feet reach down to fy)
const lensFeet = (r, fy, inner) => `<path d="M${-r * .5} ${r * .8} L${-r * .7} ${fy} M${r * .5} ${r * .8} L${r * .7} ${fy}" stroke="#5E3F28" stroke-width="12" stroke-linecap="round"/><path d="M${-r * .7 - 22} ${fy} h44 M${r * .7 - 22} ${fy} h44" stroke="#5E3F28" stroke-width="12" stroke-linecap="round"/><path d="M${r * .7} ${-r * .7} L${r * 1.5} ${-r * 1.5}" stroke="#5E3F28" stroke-width="${n2(r * .26)}" stroke-linecap="round"/><circle r="${r + 4}" fill="#fff"/>${inner}<circle r="${r}" fill="none" stroke="${P.ink}" stroke-width="${n2(r * .14)}"/>`;
SC.spoon = (t, s) => { const a = "g501", b = "g502", e = eio((t - s.t0) / 1.1), cam = [lerp(CAMW[0], CAMS[0], e), lerp(CAMW[1], CAMS[1], e), lerp(CAMW[2], CAMS[2], e)], tO = MK("kw_object") + KWHOLD + .1, tQ = LT(b) - .2, tMe = W(b, "metal") - .1;
  const [mx, md] = slideX(t, tQ, .7, 2200, BOWLX, SPY + 96);
  return canteenView(t, { sand: 1, glow: { spoon: pulse(t, W(a, "spoon") - .1, .1, 1.2) } }, cam)
    + (t >= tO ? ltag(t, tO, 1190, 470, "object: a thing you use", SPX - 190, SPY - 10, { size: 40 }) : "")
    + (t >= tQ ? md + TF(mx, SPY - 110, 1, lensFeet(120, 206, shine(120))) : "") + (t >= tMe ? TF(BOWLX, SPY - 290, spring(t, tMe, .45) * (1 + .08 * pulse(t, tMe, .03, .5)), tpill(0, 0, "metal", 52, MATC, "#fff", { w: 700 })) : "")
    + buddy("pip", 190, 1056, 220, t, { aura: true, in: s.t0 + .2, poses: [[s.t0, "pointing"], [tQ, "thinking"], [tMe, "cheer"], [tMe + 1.6, "sit"]] }) + HUD(t); };
// the spoon under the Mark Sentence card, with its two tags joined by plain lines
const spoonTags = (t, t0) => { const k1 = spring(t, t0 + .3, .45), k2 = spring(t, t0 + .7, .45); return TF(1160, 990, 1.05, spoon()) + pline(850, 930, 1010, 984, k1) + pline(1470, 930, 1290, 984, k2) + TF(800, 920, k1, kindTag("OBJECT", "spoon", OBJC)) + TF(1560, 920, k2, kindTag("MATERIAL", "metal", MATC)); };
SC.mark1 = (t, s) => markScene(t, s, { id: "g504", sayId: "g503", who: "pip", n: "1 of 2", text: "Materials are used to make objects. Objects are things you use for different purposes.", keys: ["Materials", "objects."], size: 62, y: 230, extra: spoonTags(t, s.t0) });

/* ============ 6 · HOLD ON! Basil's rule (listcard is in common.js) ============ */
const RB = [860, 1046, .9], RG = [1650, 700], WINXY = [1128, 344];
function ruleBoard(t, o = {}) { const k = o.k || [1, 1, 1], x = o.x || 0, wd = tw("So a window is a MATERIAL!", 50, 700);
  return `<ellipse cx="0" cy="4" rx="330" ry="18" fill="${P.ink}" opacity=".22" filter="url(#b4)"/><path d="M-200 0 L-120 -110 M200 0 L120 -110" stroke="#8A5A36" stroke-width="16" stroke-linecap="round"/><rect x="-250" y="-14" width="500" height="20" rx="10" fill="#8A5A36"/>
  <g filter="url(#drop)"><rect x="-560" y="-640" width="1120" height="570" rx="30" fill="${P.basil}"/><rect x="-540" y="-622" width="1080" height="534" rx="18" fill="url(#gPaper)"/></g>${T(0, -556, "BASIL’S RULE", 40, P.basil, { ls: 6 })}
  ${k[0] > .02 ? TF(-340, -330, k[0], `<clipPath id="rbw"><rect x="-150" y="-140" width="300" height="280" rx="18"/></clipPath><rect x="-158" y="-148" width="316" height="296" rx="24" fill="#fff" stroke="#C9D2E8" stroke-width="5"/><g clip-path="url(#rbw)"><g transform="scale(1.1)">${PIC.window()}</g></g>`) : ""}
  ${k[1] > .02 ? TF(190, -440, Math.min(1.04, k[1]), T(0, 0, "A window is made of glass.", 50, P.ink)) : ""}
  ${k[2] > .02 ? TF(190, -350, Math.min(1.04, k[2]), T(0, 0, "So a window is a MATERIAL!", 50, "#0E8C7E") + (x > .02 ? `<path d="M${n2(-wd / 2)} -16 H${n2(-wd / 2 + wd * Math.min(1, x))}" stroke="${P.coral}" stroke-width="9" stroke-linecap="round"/>` + TF(-wd / 2 - 40, -16, Math.min(1.1, x), xBadge(28)) : "")) : ""}
  ${(o.tg || [0, 0])[0] > .02 ? pline(140, -230, -186, -300, o.tg[0], P.ink) + TF(210, -230, Math.min(1.05, o.tg[0]), kindTag("OBJECT", "window", OBJC)) : ""}${(o.tg || [0, 0])[1] > .02 ? pline(140, -140, -290, -276, o.tg[1], P.ink) + TF(210, -140, Math.min(1.05, o.tg[1]), kindTag("MATERIAL", "glass", MATK.glass.col)) : ""}`; }
SC.rule = (t, s) => { const a = "g601", b = "g602", c = "g603", d = "g604", r0 = MK("ring0_hold"), bell = MK("bell_hold"), rs = ringState(t, r0, 5), tX = W(b, "cross") - .15, tH = W(b, "hold") - .1, tOne = W(c, "one") - .1, ring = t >= tX && t < bell + .8;
  const k = [spring(t, W(a, "window") - .15, .4), spring(t, W(a, "window") + .1, .4), spring(t, W(a, "so") - .1, .4)], tG = W(c, "glass") - .1, tWn = W(c, "window") - .1;
  return canteenView(t, { sand: 1, back: glowDisc(WINXY[0], WINXY[1], 110, .6 + .3 * Math.sin(t * 3)) }, CAMW) + `<rect width="1920" height="1080" fill="${P.night}" opacity=".22"/>` + TF(RB[0], RB[1], RB[2], ruleBoard(t, { k, x: spring(t, tG, .4), tg: [spring(t, tWn, .4), spring(t, tG + .1, .4)] }))
    + buddy("basil", 170, 1060, 230, t, { aura: true, in: s.t0 + .1, poses: [[s.t0, "cheer"], [LT(a) - .1, "sit"], [LE(a) + .15, "arms_crossed"], [tG, "surprised"], [LT(d) - .12, "oops"], [LT(d) + .9, "sit"], [LE(d) + .1, "cheer"]], nohop: true })
    + say(a, 440, 250, t, { size: 40, tail: -200, x: true, maxW: 640 }) + say(d, 440, 280, t, { size: 44, tail: -200, maxW: 640 })
    + (ring ? OP(1 - ss(bell + .5, bell + .8, t), TF(RG[0], RG[1], spring(t, tX, .4), `<g transform="translate(${-RG[0]} ${-RG[1]})">${ringTimer(RG[0], RG[1], t < r0 ? 1 : rs.frac, t < r0 ? 5 : rs.secs, t, { R: 128, sw: 22, tick: rs.tick, shut: pulse(t, bell, .01, .6), inner: TF(RG[0], RG[1] + 6, .5, crossedArms()) })}</g>`) + youPill(RG[0], RG[1] - 178, 1.0) + tpill(RG[0], RG[1] + 220, "cross your arms", 30, P.ink, "#fff")) : "")
    + stamp(t, tH, 860, 420, "HOLD ON!") + bellIcon(t, r0) + coin(t, tOne, 1650, 560, "+1", "arms crossed") + HUD(t); };

/* ============ 7 · Round 1: which one was made from sand? ============ */
const ring3 = (tt) => `<g clip-path="url(#cRing)"><rect x="250" y="520" width="360" height="140" fill="url(#cTable)"/><path d="M250 520 H610" stroke="#fff" stroke-width="4" opacity=".8"/>${TF(318, 548, .36, plasticBox())}${TF(430, 548, .36, metalBox())}${TF(540, 552, .4, glassJar())}${TF(430, 612, .5, sandPile())}</g>`;
SC.r1 = (t, s) => lockN(t, { cards: ["The plastic box", "The metal box", "The glass jar"], q: "Which one was made from sand?", tq: W(L1, "which") - .1, tc: [W(L1, "one", 1), W(L1, "two"), W(L1, "three")], ring0: MK("ring0_r1"), dur: 5, lock: "g702",
  obj: ring3, picks: [{ who: "momo", id: "g703", word: "2", x: true }, { who: "pip", id: "g704", word: "3" }, { who: "basil", id: "g705", word: "3" }],
  react: [[LE("g703") + .1, "momo", "thinking"], [LE("g704") + .1, "pip", "pointing"], [LE("g705") + .1, "basil", "cheer"]] });

/* ============ 8 · be a grain of sand: the dive (the journey itself is SC.shrink in shrink.js) ============ */
const SANDC = "#EAD49A";
SC.waitw = (t, s) => { const L = "g801", dive = ei((t - (s.t1 - .6)) / .6), e = eio((t - s.t0) / .9), FX = CX.sand, FY = TY + 16, cam = [lerp(1.04, 1.9, e) + 5 * dive, lerp(960, FX, Math.max(e * .8, dive)), lerp(600, FY - 40, Math.max(e, dive))], tP = W(L, "be") - .2;
  return canteenView(t, { sand: 1 }, cam)
    + OP(1 - dive, buddy("pip", 260, 1056, 220, t, { aura: true, in: s.t0 + .1, poses: [[s.t0, "pointing"], [s.t0 + 1.6, "sit"]] }) + buddy("momo", 1680, 1056, 230, t, { aura: true, flip: true, in: s.t0 + .2, poses: [[s.t0, "sit"], [tP, "cheer"]], nohop: true })
      + (t >= tP ? TF(960, 250, spring(t, tP, .45), tpill(0, 0, "Be a grain of sand!", 70, P.sun, P.ink, { w: 700 })) : "") + HUD(t))
    + wipe(t, s.t1, SANDC, gx(cam, FX), gy(cam, FY - 20)); };

/* ============ 9 · the reveal: glass ============ */
const CARD3 = [1560, 660, .62];
SC.reveal = (t, s) => { const a = "g901", e = eo((t - s.t0) / 1.0), cam = [lerp(3.2, 1.3, e), lerp(CX.jar, 800, e), lerp(TY - 110, 720, e)], tA = W(a, "three") - .1, lit = t >= tA ? spring(t, tA, .45) : 0;
  return canteenView(t, { sand: 1, glow: { jar: .5 * lit } }, cam) + pline(gx(cam, CX.sand + 30), gy(cam, TY + 6), gx(cam, CX.jar - 78), gy(cam, TY - 30), lit) + TF(CARD3[0], CARD3[1], CARD3[2] * spring(t, s.t0 + .5, .45), ansCard(3, "The glass jar", { lit }))
    + buddy("pip", 250, 1056, 220, t, { aura: true, in: s.t0 + .5, poses: [[s.t0, "sit"], [tA, "cheer"], [tA + 1.8, "sit"]] }) + buddy("basil", 90, 1060, 160, t, { aura: true, tag: false, in: s.t0 + .6, poses: [[s.t0, "sit"], [tA, "cheer"], [tA + 1.8, "sit"]], nohop: true })
    + buddy("momo", 1720, 1056, 220, t, { aura: true, flip: true, in: s.t0 + .55, poses: [[s.t0, "sit"], [tA, "surprised"], [tA + 1.8, "sit"]] }) + wipe(t, s.t0, "#EAF6FF") + HUD(t); };
// the teaching view for glass, metal and plastic: the table, the hero container a little bigger, picture boards standing along the back of the
// table (world coordinates, behind the containers), the board big at the bottom right
const BACKY = 762;
const teachView = (t, o, cam = [1.03, 900, 640]) => canteenView(t, { sand: 1, ...o }, cam) + boardAt(t, ...BRDT);
SC.glass = (t, s) => { const a = "g902", tn = MK("nm_glass"), tu = Math.max(MK("uses_glass"), tileT("glass")) + .3, tc = W("g903", "one") - .1, h = spring(t, s.t0, .5);
  const uses = [["window", "window"], ["bulb", "light bulb"], ["specs", "spectacles"]].map(([p, lab], i) => picBoard(p, 1150 + i * 250, BACKY, spring(t, tu + i * .22, .45), { sc: .64, lab, size: 44, id: "u" })).join("");
  return teachView(t, { hero: { jar: h }, glow: { jar: .35 }, back: uses }) + pline(gx([1.03, 900, 640], CX.sand + 30), gy([1.03, 900, 640], TY + 8), gx([1.03, 900, 640], CX.jar - 92), gy([1.03, 900, 640], TY - 30))
    + bookCaption(t, a, "Glass is made from sand.", 170, { size: 64, t1: tn - .1 }) + sPip(t, { in: s.t0 + .1 }) + sBasil(t, { in: s.t0 + .2, poses: [[s.t0, "sit"], [tileT("glass"), "cheer"], [tileT("glass") + 1.6, "sit"]], nohop: true })
    + coin(t, tc, 700, 420, "+1", "if you showed three fingers") + HUD(t); };

/* ============ 10 · metal and plastic ============ */
const METALS = [["ring", "gold: a ring"], ["gate", "iron: a gate"], ["wire", "copper: a wire"], ["can", "aluminium: a can"]];
SC.metal = (t, s) => { const a = "g1001", b = "g1002", c = "g1003", tB = LT(a) + .5, tC = LT(c) - .25, h = spring(t, s.t0 + .1, .5);
  const [rx, rd, rq] = slideX(t, tB, .7, 2400, 1180, BACKY), out = eio((t - tC) / .5), tg = [W(c, "gold"), W(c, "iron"), W(c, "copper"), W(c, "aluminium")].map((x) => x - .15);
  const back = (t >= tB && out < 1 ? rd + picBoard("rock", rx + out * 1400, BACKY, 1, { sc: .92, id: "m" }) : "") + METALS.map(([p, lab], i) => picBoard(p, 1070 + i * 240, BACKY, spring(t, tg[i], .45), { sc: .66, lab, size: 42, id: "m" + i })).join("");
  return teachView(t, { hero: { metal: h }, glow: { metal: .35 }, back }) + bookCaption(t, b, "Metals can be dug up from the ground.", 170, { size: 54, t1: tC })
    + bookCap(t, c, "Gold, iron, copper and aluminium are metals that are found naturally in the ground.", 150, { size: 46, maxW: 1250, t1: MK("nm_metal") - .1 })
    + sPip(t) + sBasil(t) + buddy("momo", 430, 1064, 140, t, { aura: true, tag: false, in: s.t0 + .2, poses: [[s.t0, "sit"], [tB + .7, "pointing"], [tC, "sit"]] }) + HUD(t); };
SC.plastic = (t, s) => { const a = "g1004", b = "g1005", j = "g1006", tB = LT(a) + .4, h = spring(t, s.t0 + .1, .5), tJ = LT(j), tO = W(b, "oil") - .1;
  const [ox, od] = slideX(t, tB, .7, 2400, 1280, BACKY), back = t >= tB ? od + picBoard("oil", ox, BACKY, 1, { sc: 1.0, lab: "oil, deep under the ground", size: 30, id: "p" }) : "";
  return teachView(t, { hero: { plastic: h, metal: 1 - ramp(t, s.t0, .4) }, glow: { plastic: .35 }, back }) + bookCap(t, b, "Plastic is made in factories using oil that comes from deep under the ground.", 150, { size: 46, maxW: 1250, t1: MK("nm_plastic") - .1 })
    + buddy("basil", 150, 1062, 200, t, { aura: true, in: s.t0 + .2, poses: [[s.t0, "sit"], [tO, "surprised"], [tJ - .12, "sit"], [LE(j) + .1, "cheer"]], nohop: true }) + say(j, 560, 520, t, { size: 44, tail: -330, maxW: 640 }) + HUD(t); };

/* ============ 11 · Round 2: ceramic ============ */
const SBRD = [1500, 1066, .5];
SC.r2 = (t, s) => { const tL = LT(L2), tz = MK("ring0_r2") + 1;
  return lockN(t, { cards: ["Sand", "Clay", "Oil"], q: "What is ceramic made from?", tq: W(L2, "what") - .1, tc: [W(L2, "one"), W(L2, "two"), W(L2, "three")], ring0: MK("ring0_r2"), dur: 5, lock: "g1103", tin: W(L2, "what") - .3,
    obj: (tt) => bowlRing(tt, lizShow(tt, tz)), picks: [{ who: "pip", id: "g1104", word: "1", x: true }, { who: "momo", id: "g1105", word: "2" }, { who: "basil", id: "g1106", word: "2" }],
    react: [[LE("g1104") + .1, "pip", "thinking"], [LE("g1105") + .1, "momo", "pointing"], [LE("g1106") + .1, "basil", "cheer"]],
    pre: (tt) => tt < tL - .3 ? stallView(tt, { back: glowDisc(STALLB[0], STALLB[1] - 70, 220, pulse(tt, W("g1101", "bowl") - .1, .1, 1.4)) }, [1.02 + .03 * eio((tt - s.t0) / 4), 800, 620]) + boardAt(tt, ...SBRD)
      + buddy("momo", 170, 1060, 200, tt, { aura: true, in: s.t0 + .15, poses: [[s.t0, "pointing"], [s.t0 + 2, "sit"]] }) + wipe(tt, tL - .04, P.indigo, 430, 470) : wipe(tt, tL - .04, P.indigo, 430, 470) }); };
SC.clay = (t, s) => { const a = "g1107", b = "g1108", tA = W(a, "two") - .1, lit = t >= tA ? spring(t, tA, .45) : 0, tB = LT(b) - .5, [bx, bd] = slideX(t, tB, .7, -500, 300, 800);
  return stallView(t, {}, [1.04, 800, 620]) + (t >= tB ? bd + picBoard("clay", bx, 800, 1, { sc: 1.05, id: "c" }) : "") + TF(1560, 700, .62 * spring(t, s.t0 + .15, .45), ansCard(2, "Clay", { lit })) + boardAt(t, ...SBRD)
    + bookCaption(t, b, "Clay can be found in soil dug from the ground.", 170, { size: 54 }) + buddy("basil", 150, 1062, 190, t, { aura: true, in: s.t0 + .1, poses: [[s.t0, "sit"], [tA, "cheer"], [tA + 1.8, "sit"]], nohop: true }) + HUD(t); };
SC.kiln = (t, s) => { const L = "g1109", tS = W(L, "shaped") - .2, tK = W(L, "baked") - .2, tW = W(L, "kiln") - .1, tb = MK("bowlback"), j = clamp((t - tb + .45) / .45), bx = lerp(1010, STALLB[0], eio(j)), hopY = 90 * Math.sin(Math.PI * j);
  const lump = t < tK ? TF(STALLB[0], STALLB[1], 1.3 * (1 - ramp(t, tK - .3, .3)), clayLump()) : "";
  return stallView(t, { bowl: false, items: lump + (j > 0 ? TF(bx, STALLB[1] - hopY, 1.15 * Math.min(1, j * 3), bowl()) + (j >= 1 ? TF(STALLB[0] + 300, STALLB[1] + 24, 1.1 * spring(t, tb, .4), soupSpoon()) + dust(STALLB[0], STALLB[1] + 6, (t - tb) / .4, 1.6) : "") : "") }, [1.04, 800, 620])
    + picBoard("clay", 300, 800, 1 - ramp(t, tS - .2, .25), { sc: 1.05, id: "c" }) + picBoard("hands", 300, 800, spring(t, tS, .45), { sc: 1.05, lab: "shaped", size: 38, id: "k" }) + picBoard("kiln", 1130, 800, spring(t, tK, .45), { sc: 1.05, t, id: "k2" })
    + (t >= tK ? TF(1130, 300, spring(t, tK + .3, .4), tpill(0, 0, "Very hot! Only in a factory.", 34, P.ink, P.sun, { w: 700 })) : "")
    + (t >= tW ? OP(ramp(t, tW, .3), `<g filter="url(#dropS)"><rect x="330" y="120" width="${n2(tw("kiln: a very hot oven for baking clay", 48, 700, "Atkinson Hyperlegible") + 90)}" height="96" rx="20" fill="url(#gPaper)"/><rect x="330" y="120" width="14" height="96" rx="7" fill="${P.sun}"/></g><rect x="372" y="172" width="${n2(tw("kiln:", 48, 700, "Atkinson Hyperlegible"))}" height="24" rx="5" fill="#FFD75A"/><text x="372" y="184" font-family="Atkinson Hyperlegible" font-weight="700" font-size="48" fill="${P.ink}">kiln: a very hot oven for baking clay</text>`) : "")
    + (t >= tb + .1 ? ltag(t, tb + .1, 620, 520, "It can break easily", STALLB[0] - 60, STALLB[1] - 140, { size: 36 }) : "") + boardAt(t, ...SBRD) + buddy("basil", 150, 1062, 190, t, { aura: true, poses: [[s.t0, "sit"], [tK + .4, "surprised"], [tK + 2, "sit"]] }) + HUD(t); };
// under Mark Sentence 2: the lump of clay beside the bowl, the sand pile beside the jar; the board (the CERAMIC tile fills)
const pairs2 = (t, t0) => { const k = (d) => spring(t, t0 + d, .45), y = 1040; return TF(690, y, .62 * k(.3), clayLump()) + pline(760, y - 30, 838, y - 30, k(.5)) + TF(920, y, .5 * k(.5), bowl()) + TF(1120, y, .62 * k(.8), sandPile()) + pline(1196, y - 30, 1262, y - 30, k(1.0)) + TF(1330, y, .46 * k(1.0), glassJar()); };
SC.mark2 = (t, s) => { const tc = W("g1112", "one") - .1; return markScene(t, s, { id: "g1111", sayId: "g1110", who: "basil", n: "2 of 2", text: "Ceramic is a material made from clay. Glass is made from sand.", keys: ["Ceramic", "clay.", "Glass", "sand."], size: 66, y: 196,
  extra: pairs2(t, s.t0) + boardAt(t, 1650, 1066, .3) + (t >= tileT("ceramic") - .2 ? TF(1650, 880, spring(t, tileT("ceramic") - .2, .4) * (1 - ramp(t, tileT("ceramic") + 2.4, .3)), tpill(0, 0, "Four tiles full!", 36, P.sun, P.ink, { w: 700 })) : "") + coin(t, tc, 1500, 760, "+1", "if you showed two fingers") }); };

/* ============ 12 · the score hand, the lizard (kwrecap is in common.js) ============ */
SC.final = (t, s) => { const L = "g1201"; return finalScene(t, s, L, 2, [[s.t0, null, 1], [W(L, "three") - .1, null, 3]], TF(1250, 1062, .36, board7(t))); };
SC.liz = (t, s) => { const L = "g1202"; return lizReveal(t, s, L, stallView(t, { liz: 0 }), LIZ1[0], LIZ1[1] + 6, W(L, "what") - .1, "What material is a window made of?", -120, 150); };

/* ============ 13 · the cliffhanger: white drops ============ */
SC.cliff = (t, s) => { const L = "g1301", tD = W(L, "sole") - .5, d = eio((t - tD) / .7), tR = W(L, "rubber") - .1, tW = W(L, "white") - .3, tQ = W(L, "where") - .1, tP = W(L, "find") - .1, q = .5 + .5 * Math.sin((t - s.t0) * 5), sh = [1150, 960, 1.15];
  const top = d < 1 ? `<g transform="translate(0 ${n2(-1080 * d)})">${canteenView(t, { sand: 1 }, CAMW)}<rect width="1920" height="1080" fill="${P.night}" opacity=".3"/>${boardAt(t, 960, 900, 1.25, { q: { wood: q, rubber: q, fabric: q } })}${TF(960, 180, spring(t, s.t0 + .2, .45), tpill(0, 0, "Three materials to go!", 60, P.sun, P.ink, { w: 700 }))}</g>` : "";
  const under = d > 0 ? `<g transform="translate(0 ${n2(1080 * (1 - d))})">${bg("under")}${TF(520, 960, 1.0, schoolBag())}${TF(sh[0], sh[1], sh[2], shoe({ sole: t >= tR - .4 ? .55 + .45 * Math.sin((t - tR) * 4) : 0 }))}
    ${ltag(t, tR, 1000, 560, "rubber", sh[0] - 60, sh[1] - 22 * sh[2], { size: 52, fill: MATK.rubber.col, ink: "#fff" })}${t >= tW ? TF(1560, 640, spring(t, tW, .5), dropsDisc(t, 150, "cl")) : ""}</g>` : "";
  return top + under + (t >= tQ ? TF(1130, 270, spring(t, tQ, .45), tpill(0, 0, "Where do the drops come from?", 54, P.ink, "#fff", { w: 700 })) : "")
    + (d >= 1 ? buddy("basil", 130, 1062, 170, t, { aura: true, tag: false, in: tD + .7, poses: [[tD + .7, "sit"], [tW, "surprised"], [tQ, "arms_crossed"]] }) + buddy("pip", 320, 1064, 150, t, { aura: true, tag: false, in: tD + .8, poses: [[tD + .8, "sit"], [tQ, "thinking"]] }) : "")
    + (t >= tP ? TF(560, 470, lerp(2.2, 1, eo((t - tP) / .16)) + .05 * wob(t, tP + .16, .4), `<text x="0" y="50" font-family="Fredoka" font-weight="700" font-size="170" text-anchor="middle" letter-spacing="6" fill="${P.sun}" stroke="${P.ink}" stroke-width="28" stroke-linejoin="round" paint-order="stroke" filter="url(#drop)">PART 2</text>`) : "") + HUD(t); };

/* ============ 14 · "Now you know!": the glass jar and the board stand between the buddies ============ */
SC.nyk = (t, s) => nykScene(t, s, TF(590, 1040, .95, glassJar()) + TF(690, 1044, .6, sandPile()) + TF(940, 1046, .38, board7(t)));
})(); }
