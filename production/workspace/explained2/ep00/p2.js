// p2.js: PART 2, "One Week, One Blank Page. Who Remembers MORE?" (the mind map special, P3 EP0): "Last time..."; the void deck on Monday
// evening and the hidden cat; Round 1 (Part 1's lock-in, a short 3 s ring); make one together in TheOneApp (its REAL screens, capture.js);
// the check [LOOK CLOSER]: CHECK AND FIX, Mark Sentence 1; the Showdown (Pip's steps poster); BE AN IDEA (a picture of Basil's memory, a
// garden of paths); SPACE IT OUT, Mark Sentence 2; next Monday's two blank pages [LOOK CLOSER] (Round 1's answer); the chant; the cat; the
// dare. Segments 1-14 of ../p3_ep00_mindmap_script.md section 5 (approved 24 Nov 2026). The app's screens stay still or zoom smoothly.
if (PART === 2) { (() => {
SCORE.push([MK("coin2") - .1, 2, 0]);                 // the Showdown: YOU +2
SCORE.push([MK("coin1") - .1, 3, 1]);                 // Round 1 (answered next Monday): YOU +1, the Buddies +1 (Pip and Momo right)
const FOOT = "Study Skills · P3 to P6 · Make your own mind map";
const bd = (who, x, y, h, t, o = {}) => buddy(who, x, y, h, t, o);
window.SHELF_AWAY = (t) => { const w = SCN.waitw, a = MK("ring0_show") - .6, b = MK("bell_show") + .6; return Math.max(ss(w.t0 + .3, w.t0 + .8, t) * (1 - ss(SCN.pullout.t0 + .2, SCN.pullout.t0 + .6, t)), ss(a, a + .35, t) * (1 - ss(b, b + .35, t))); };   // away during the walk-in journey and the Showdown countdown
const CAT = { intro: [255, 880, .62, { pose: "sleep" }], wall: [585, 556, .42, { pose: "wash" }], plant: [1690, 640, .55, { pose: "tail" }], bay: [1340, 560, .36, { pose: "sit" }], step: [70, 692, .5, { pose: "sun" }], mat: [VD.mat[0], VD.mat[1] + 4, .62, { pose: "sleep" }] };
const BX = { l: 300, r: 1640, m: 1000 };
const world = (t, cam, o = {}) => VDS(t, { when: o.when || "night", cat: o.cat, board: o.board, top: o.top || "", front: o.front, people: o.people }, cam);
const dayPill = (t, d, k = 1, x = 500, y = 200) => TF(x, y, k, tpill(0, 0, d, 34, P.ink, "#fff", { w: 700 }));
// the table's things this week: the poster on its easel (turn: 0 facing us .. 1 turned to the wall), the tablet on its stand
const easelOn = (t, turn = 0, x = 640) => easelPoster(t, x, 704, 1, turn);

/* 1 · "Last time...": three pictures, one at a time, centred and large, a gentle push-in, one label each, Heart speaking at 0.30 s */
const LT_PICS = [["Read it or make it?", (t) => TF(-200, 160, 1.1, easelPoster(t, 0, 0, 1)) + `<use href="#s_pip_sit_closed" transform="translate(-470 -260) scale(${n2(360 / SPR.pip_sit_closed.bh)})"/>` + TF(250, -40, 1, sheet00(420, 300, { lines: false }) + TF(0, 0, .36, handMap(t, MAPB.slice(0, 4), { size: 40 }))) + `<use href="#s_basil_sit_closed" transform="translate(420 -230) scale(${n2(-330 / SPR.basil_sit_closed.bh)} ${n2(330 / SPR.basil_sit_closed.bh)})"/>`],
  ["Worked out: remembered better", (t) => TF(0, 0, .9, puzzleCards(t, { fill: [-9, -9, -9] })) + [-230, 0, 230].map((y) => `<rect x="${380 * .9 - 280}" y="${y * .9 - 70}" width="560" height="140" rx="26" fill="#FFD75A" opacity="${n2(.25 + .15 * Math.sin(t * 3))}"/>`).join("")],
  ["Memory first: poster closed", (t) => TF(-260, 170, 1.2, easelPoster(t, 0, 0, 1, 1)) + TF(-260, -170, 1, tpill(0, 0, "poster closed", 36, "#2E5C8A", "#fff", { w: 700 })) + TF(280, -20, 1.1, sheet00(420, 300, { lines: false }) + TF(0, 0, .36, handMap(t, MAPB.slice(0, 4), { size: 40 })))]];
SC.lasttime = (t, s) => { const tb = [s.t0, MK("pic2") - .2, MK("pic3") - .2], i = t >= tb[2] ? 2 : t >= tb[1] ? 1 : 0, u = t - tb[i], k = spring(t, tb[i], .5), z = 1 + .05 * eio(clamp(u / 4)), fadeO = 1 - ss(s.t1 - .4, s.t1, t);
  return bg("stage2") + OP(ramp(t, s.t0, .3), T(960, 110, "Last time…", 60, "#fff", { w: 600 }))
    + OP(fadeO, TF(960, 540, k * z, `<g filter="url(#drop)"><rect x="-760" y="-330" width="1520" height="660" rx="40" fill="#FFF8EA"/></g><clipPath id="ltc"><rect x="-740" y="-310" width="1480" height="620" rx="30"/></clipPath><g clip-path="url(#ltc)">${LT_PICS[i][1](t)}</g>`)
      + TF(960, 940, spring(t, tb[i] + .2, .45), tpill(0, 0, LT_PICS[i][0], 52, P.sun, P.ink, { w: 700 }))) + HUD(t); };

/* 2 · the void deck study corner on Monday evening: the fluorescent light on, the dark sky past the pillars, moths round the lamp; the card
   (HOME) with a small day pill Mon; the tablet on its stand on the table (TheOneApp's home screen), Pip's poster on its easel. Then ONE
   push-in onto the cat asleep under the stone bench beside the potted plant (its intro spot). Momo big, Basil at the right, Pip mid-ground */
const TABH = [1180, 560, 560];   // the tablet on the table in the wide shots: screen centre and width
const camWeek = (t) => { const s = SCN.week; return camMix(camOn([960, 600], 1.0, 960, 560), camOn([700, 760], 1.15, 760, 620), eio(clamp((t - s.t0) / 2.2))); };
SC.week = (t, s) => world(t, camWeek(t), { cat: CAT.intro, top: easelOn(t) + tablet00(t, "home", TABH[0], TABH[1], TABH[2]) })
  + bd("momo", 620, 1076, 470, t, { in: s.t0 + .05 }) + bd("pip", 1040, 1010, 360, t, { in: s.t0 + .1, flip: true }) + bd("basil", BX.r, 1076, 470, t, { in: s.t0 + .15, flip: true })
  + dayPill(t, "Mon") + OP(ramp(t, .2, .4), lowerPill(60, 96, "A void deck study corner ·", "Monday evening")) + HUD(t);
SC.game = (t, s) => { const cE = camWeek(SCN.week.t1), p = CAT.intro;
  return gameScene(t, s, ["b201h", "b202m", "b203h"], false, { world: (tt) => world(tt, cE, { cat: CAT.intro, top: easelOn(tt) + tablet00(tt, "home", TABH[0], TABH[1], TABH[2]) }), A: camPt(cE, [p[0], p[1] - 40]), T: [680, 440], Z: 2.2, dim0: 0 }) + smallPrint(t, LT("b203h"), CAT_RULE); };
SC.goals = (t, s) => goals3(t, s, [["Make one in TheOneApp", ""], ["Check and fix", ""], ["Space it out", ""]], ["b301m", "b302m", "b303m", "b304m"], "momo");
SC.r1card = (t, s) => roundCard(t, s, "ROUND 1", "YOUR ANSWER FROM LAST TIME");

/* 4 · Round 1: Part 1's lock-in (a short 3 s ring): the same THREE numbered picture cards, the clue labels read ×5 tonight · draw it on Tue
   and Thu · a blank page ON TOP of the ring; the ring's picture: two blank pages. Basil leads (worried in the ring); the picks Pip 2, Momo 2,
   Basil 3 (counting on his claws: a bold grin, he believes it). The answer waits for next Monday (see you next Monday! on the cards) */
const L1 = "b401h";
const twoPages = (t) => [-110, 110].map((x) => TF(430 + x, 470, 1, sheet00(190, 250, { lines: false }) + `<ellipse rx="44" ry="26" fill="#FFF3C4" stroke="${INK16}" stroke-width="4"/>` + T(0, 7, "Magnets", 20, INK16, { w: 700 }))).join("");
SC.r1 = (t, s) => lockN(t, { t0: LT(L1) - .1, cards: ["Pip", "Basil", "Both the same"], clues: [["read ×5 tonight", W(L1, "pip")], ["draw it on Tue and Thu", W(L1, "basil")], ["a blank page", W(L1, "blank")]], csize: 40, lead: "basil", q: "Who draws more of the map?", tq: W(L1, "who") - .1,
  tc: [W(L1, "pip"), W(L1, "basil"), W(L1, "show")], ring0: MK("ring0_r1"), dur: 3, lock: "b402h", pics: [0, 1, 2].map((i) => nextCardPic(i, t)), obj: twoPages,
  picks: [{ who: "pip", id: "b403p", word: "2" }, { who: "momo", id: "b404m", word: "2" }, { who: "basil", id: "b405b", word: "3" }] })
  + (t >= MK("seeyou") - .1 ? TF(960, 700, spring(t, MK("seeyou") - .1, .45), `<g transform="rotate(-3)">${tpill(0, 0, "see you next Monday!", 50, P.sun, P.ink, { w: 700 })}</g>`) : "");

/* 5 · make one together in TheOneApp: the tablet on its stand, big, front-on (TheOneApp's REAL screens), Basil big at the left (a focused
   smile, doing the steps), Pip and Momo at the far right. Each tap: a small ripple on the real button. The cat on the low wall by the
   playground, washing a paw (seen past the pillars at the start). The printed poster on its easel turned to face the wall (poster closed) */
const TB = [1130, 500, 960];   // the big tablet: screen centre and width
const tapAt = (shot, key, t0) => { const c = boxC(shot, key); return [c[0], c[1], t0]; };
// app3's smooth push onto the map (left part of the screen) while Basil types, then back for the Mark button
const camApp = (t) => { const a = eio(clamp((t - SCN.app3.t0 - .2) / 1.4)), b = eio(clamp((t - MK("tapmark") + 1.2) / 1.0)); return camMix(camMix([1, 960, 540], camOn([930, 380], 1.6, 960, 470), a), [1, 960, 540], b); };
const appWorld = (t, scr, o = {}) => { const cam = o.cam || [1, 960, 540];
  return CAM(world(t, [1, 960, 540], { cat: o.cat, top: easelOn(t, o.turn === undefined ? 1 : o.turn, 560) }) + `<rect width="1920" height="1080" fill="${P.night}" opacity=".25"/>` + tablet00(t, scr, TB[0], TB[1], TB[2], { tap: o.tap }) + (o.over || ""), cam[0], cam[1], cam[2]); };
const appBuds = (t, s, o = {}) => bd("basil", 250, 1076, 500, t, { in: s.t0 + .05, poses: [[s.t0, "sit"]], look: 4 }) + bd("pip", 1840, 1090, 300, t, { in: s.t0 + .1, flip: true }) + bd("momo", 1680, 1090, 300, t, { in: s.t0 + .15, flip: true });
SC.app1 = (t, s) => { const t1 = MK("tapmm"), t2 = MK("tapmine"), scr = t < t1 + .45 ? "home" : t < t2 + .45 ? "mmpage" : "sheet0";
  const tap = t < t1 + .9 ? tapAt("home", "mm", t1 + .15) : tapAt("mmpage", "make", t2 + .15);
  return appWorld(t, scr, { cat: CAT.wall, tap, turn: 0 }) + (scr === "home" ? boxGlow(t, t1 - .3, "home", "mm", TB[0] - TB[2] / 2, TB[1] - TB[2] * 820 / 2360, TB[2], TB[2] * 820 / 1180) : "")
    + appBuds(t, s) + dayPill(t, "Mon") + smallPrint(t, s.t0 + .3, CAT_RULE) + HUD(t); };
SC.app2 = (t, s) => { const tc = MK("pickch"), ts = MK("tapstart"), tm = MK("middle"), scr = t < tc + .4 ? "sheet0" : t < ts + .45 ? "sheet1" : "ed00", h = TB[2] * 820 / 1180, x0 = TB[0] - TB[2] / 2, y0 = TB[1] - h / 2, turn = eio(clamp((t - s.t0 - .3) / .8));
  const tap = t < ts - .5 ? tapAt("sheet0", "ch", tc + .1) : tapAt("sheet1", "start", ts + .15);
  const mid = scr === "ed00" && t >= tm ? (() => { const c = boxC("ed00", "centre"); return boxGlow(t, tm, "ed00", "centre", x0, y0, TB[2], h) + linkChip(t, tm + .1, x0 + c[0] * TB[2] - 40, y0 - 40, x0 + c[0] * TB[2], y0 + (c[1] - .04) * h, P.sun, "middle word: Magnets", 36, undefined, P.ink); })() : "";
  return appWorld(t, scr, { tap, turn }) + mid + (scr === "sheet1" ? boxGlow(t, tc + .2, "sheet1", "ch", x0, y0, TB[2], h) : "")
    + (t > s.t0 + 1 ? linkChip(t, s.t0 + 1.0, 330, 320, 560, 470, "#2E5C8A", "poster closed", 36, s.t1 - .3) : "") + appBuds(t, s) + dayPill(t, "Mon") + HUD(t); };
// app3: Basil types his map from memory, one box at a time (ed01..ed12 on his words); the map draws itself (the app's own drawing)
const ED = () => [["b503b", "two"], ["b503b", "north"], ["b503b", "south"], ["b503b", "together"], ["b503b", "unlike"], ["b503b", "like"], ["b504b", "magnetic"], ["b504b", "iron"], ["b504b", "not"], ["b504b", "magnet"], ["b504b", "pull"], ["b504b", "push"]].map(([id, w]) => W(id, w));
SC.app3 = (t, s) => { window._BUBAT = { basil: [1380, 930] }; const tt = ED(), n = tt.filter((x) => t >= x - .1).length, tk = MK("tapmark"), scr = t >= tk + .1 ? "mk1_busy" : n ? "ed" + String(n).padStart(2, "0") : "ed00";
  return appWorld(t, screenAt(scr), { cam: camApp(t), tap: t >= tk - .3 ? tapAt("ed12", "mark", tk + .1) : null })
    + bd("basil", 250, 1076, 500, t, { in: s.t0 + .05, poses: [[s.t0, "sit"]], look: 4 }) + bd("pip", 1840, 1090, 300, t, { in: s.t0 + .1, flip: true }) + bd("momo", 1680, 1090, 300, t, { in: s.t0 + .15, flip: true })
    + (t < LT("b503b") + 1.5 ? linkChip(t, LT("b503b"), 520, 300, 560, 470, "#2E5C8A", "poster closed", 36) : "") + dayPill(t, "Mon") + HUD(t); };

/* [LOOK CLOSER] the check (lc00.js lcCheckArt): the app's own ticks, the missing row, Compare with the poster, Back to my mind map, the new
   branch, Mark it again. Basil's face at the lower right: thinking at the missing row (what did I miss?), a nod when the poster shows it,
   then teaching CHECK AND FIX (his first cheer this part, after his line) */
SC.lccheck = (t, s) => { window._BUBAT = { '*': [960, 905] }; const tm = MK("missing");
  return lookCloser(t, s, { tz: s.t0, fx: TB[0], fy: TB[1], art: lcCheckArt, bgc: "#FFF6E8", set: (tt) => appWorld(tt, "mk1_busy"), verdict: ["CHECKED AND FIXED", GOODC], tv: MK("v_fix"), peek: false, as: 1.0,
    over: (tt) => peekFace("basil", "r", tt, tm - .2, undefined, [[tm, "thinking"], [MK("thereitis") + .2, "sit"], [LE("b508b") + .1, "cheer"], [LE("b508b") + 2.0, "sit"]], { achieved: true }) }); };
const peekFace = (who, side, t, tin, tout, poses, o = {}) => { if (t < tin - .05 || (tout !== undefined && t > tout + .3)) return ""; const W_ = LCW, x = side === "l" ? W_.x - W_.w / 2 + 200 : W_.x + W_.w / 2 - 200;
  return bd(who, x, W_.y + W_.h / 2 + 470 * .42 + (1 - eo((t - tin) / .45)) * 350, 470, t, { in: tin, out: tout, poses: [[tin, "sit"], ...(poses || [])], peek: true, tag: false, shadow: false, flip: side === "r", nohop: true, achieved: o.achieved }); };
// Mark Sentence 1 (Pip): under it, Basil's map with its ticks and the new gold branch
const fixedMap = (t, x, y, k) => k < .02 ? "" : TF(x, y, k, sheet00(620, 400, { lines: false }) + TF(0, 0, .5, handMap(t, MAPB, { size: 40, ticks: Object.fromEntries(mapKeys(MAPB).filter((q) => q !== "c").map((q) => [q, -9])), glow: { b4: SCN.mark3.t0 + .6, "b4.0": SCN.mark3.t0 + .8, "b4.1": SCN.mark3.t0 + 1.0 } })));
SC.mark3 = (t, s) => markScene(t, s, { id: "b512p", sayId: "b511p", who: "pip", n: "1 of 2", text: TL.lines.b512p.text, keys: ["check", "fix", "missed."], size: 66, y: 250, footer: FOOT, achieved: true, under: fixedMap(t, 1250, 890, .7 * spring(t, s.t0 + .4, .5)) });

/* 6 · the Showdown: Pip's hand-made poster HOW TO MAKE A MIND MAP (for our class) on a small easel by the study table; each line lights as he
   reads it. The ring takes the stage (the poster stays big, the YOU hand counts 1, 2, 3); Pip worried in the countdown. After the bell Basil
   and Momo pop in. The fix: line 2 struck (kept) at Basil's "two", the green rewrite under it; the coin +2. Pip shy through the whole fix
   (a face close-up as the strike lands: oops), Basil and Momo confident. The cat behind the potted plant at the lift lobby, only its tail */
const camShow = (t) => camOn([760, 600], 1.0, 960, 540);
const showWorld = (t, o = {}) => world(t, [1, 960, 540], { cat: CAT.plant, top: tablet00(t, "mk2_done", 1280, 560, 380), front: TF(820, 1060, .95, stepsPoster(t, o)) });
const litOf = (t) => ["l1", "l2", "l3"].map((k, i) => { const a = MK(k), b = i < 2 ? MK(["l2", "l3"][i]) : LE("b601p") + .3; return ss(a - .1, a + .2, t) * (1 - ss(b - .1, b + .2, t)); });
SC.show = (t, s) => { window._BUBAT = { basil: [1500, 230], momo: [1330, 250], pip: [520, 300] }; const r0 = MK("ring0_show"), bell = MK("bell_show"), rs = ringState(t, r0, 5), tS = LT("b603h") - .08, inT = t >= r0 && t < bell, R = [1440, 430], RR = 200;
  const st = ss(r0 - .6, r0 - .1, t) * (1 - ss(bell + .6, bell + 1.1, t)), bob = inT ? 16 * Math.sin((t - r0) * Math.PI * 2) : 0, nf = inT ? (Math.floor(t - r0) % 3) + 1 : 3;
  return showWorld(t, { lit: litOf(t) }) + OP(st, bg("stage"))
    + (st > .01 ? OP(st, TF(860, 1120, .78, stepsPoster(t, {})) + TF(R[0], R[1], spring(t, r0 - .6, .45) * (1 + .035 * (inT ? rs.tick : 0)), `<g transform="translate(${-R[0]} ${-R[1]})">${ringTimer(R[0], R[1], t < r0 ? 1 : t < bell ? rs.frac : 0, t < r0 ? 5 : t < bell ? rs.secs : 0, t, { R: RR, sw: 32, tick: rs.tick, shut: pulse(t, bell, .01, .6), chg: inT || (t >= bell && t < bell + .5) ? (t >= bell ? bell : rs.chg) : -9, ns: 1.2,
      inner: `<circle cx="${R[0]}" cy="${R[1]}" r="${RR - 24}" fill="#FFF8EA"/>` + TF(R[0], R[1] + 30 + bob * .3, .75, `<g filter="url(#dropS)">${countHand(nf)}</g>`) })}</g>`) + youPill(R[0] - 230, R[1] - 170, 1.1) + TF(R[0], 760, 1, tpill(0, 0, "line 1, 2 or 3?", 48, P.ink, "#fff", { w: 700 }))) : "")
    + bd("pip", 230, 1076, 480, t, { in: s.t0 + .1, rock: inT ? 2 : 0, poses: [[s.t0, "sit"], [LE("b601p") + .1, "sit"], [r0 - .3, "worried"], [bell + .35, "sit"]], jump: [[bell + .02, 26]] })
    + (st < .5 ? bd("momo", 1430, 1010, 360, t, { in: s.t0 + .2, flip: true }) + bd("basil", BX.r + 60, 1076, 470, t, { in: s.t0 + .25, flip: true, poses: [[s.t0, "sit"], [LT("b602h") + 1.5, "thinking"]] }) : "")
    + stamp(t, tS, 960, 460) + bellIcon(t, r0) + melt(t, s, "showcard", .3) + OP(1 - st, dayPill(t, "Mon")) + HUD(t); };
SC.fix = (t, s) => { window._BUBAT = { basil: [1250, 250], '*': [1250, 250] }; const strike = ss(MK("strike"), MK("strike") + .4, t), rw = ss(MK("rewrite"), MK("rewrite") + .8, t);
  return showWorld(t, { lit: [0, ss(s.t0, s.t0 + .3, t), 0], strike, rewrite: rw })
    + bd("pip", 230, 1076, 480, t, { in: s.t0 + .05 }) + faceCam("pip", t, MK("strike") + .05, MK("strike") + 2.2, 240, 330, 140, [[MK("strike"), "oops"]], { noreact: true })
    + bd("momo", 1430, 1010, 360, t, { in: s.t0 + .1, flip: true }) + bd("basil", BX.r + 60, 1076, 470, t, { in: s.t0 + .15, flip: true, poses: [[s.t0, "sit"], [MK("strike") - .2, "pointing"], [MK("rewrite") + .6, "sit"]] })
    + coin(t, MK("coin2") - .1, 1180, 330, "+2", "two fingers") + smallPrint(t, s.t0 + .3, MISTAKE_RULE) + dayPill(t, "Mon") + HUD(t); };

/* 7 · BE AN IDEA: the camera glides down onto Basil's map on the tablet, to the sub-branch "Like poles repel", and through it; the buddies wave,
   then shrink (a pop each) and follow. Small print: A picture of remembering, not a real brain. Then the garden (lc00.js gardenArt): You: an
   idea; the three buddies ride along on the path, shrunk, reacting (Momo surprised as the grass grows; Pip a nod as the path clears; Basil a
   proud grin on Thursday). A day counter and a speeded up tag while the days pass */
const LIKE = (() => { const a = APP.mk2_done_hi.at; return [.82, .56]; })();   // "Like poles repel" on the marked map (read off the picture)
const camDive = (t) => { const s = SCN.waitw, u = eio(clamp((t - s.t0 - .4) / (s.t1 - s.t0 - .4))); const h = TB[2] * 820 / 1180, p = [TB[0] - TB[2] / 2 + LIKE[0] * TB[2] * .59 + 30, TB[1] - h / 2 + (APP.mk2_done_hi.at[1] + LIKE[1] * APP.mk2_done_hi.at[3]) * h * .7]; return camMix([1, 960, 540], camOn(p, 1 + 9 * u * u, 960, 540), u); };
SC.waitw = (t, s) => { const L = "b701h", tP = W(L, "be") - .15, sh = W(L, "shrink") - .1;
  const buds = ["basil", "momo", "pip"].map((w, i) => { const x = [250, 1680, 1840][i]; return bd(w, x, [1076, 1090, 1090][i], [500, 300, 300][i], t, { in: s.t0 + .05 + .05 * i, out: sh + .2 * i + .3, flip: x > 960, poses: [[s.t0, "sit"], [tP + .2 + .15 * i, "waving"]], wave: true }); }).join("");
  return appWorld(t, screenAt("mk2_done"), { cam: camDive(t) }) + OP(1 - ss(s.t1 - 1.0, s.t1 - .5, t), buds + (t >= tP ? TF(960, 230, spring(t, tP, .45), tpill(0, 0, "Be an idea!", 76, P.sun, P.ink, { w: 700 })) : "") + HUD(t))
    + smallPrint(t, s.t0 + .4, PICTURE_RULE) + wipe(t, s.t1, "#BFE6FF", 960, 540); };
SC.garden = (t, s) => { const m = MK, st = pathState(t);
  const rp = { momo: [[m("grow1") + .6, "surprised"], [m("grow1") + 2.4, "sit"]], pip: [[m("clear1") + .1, "sit"]], basil: [[m("wide") + .1, "sit"]] };
  return gardenArt(t) + riders(t, s, { tin: m("gin") + .4, h: 190, at: { momo: [1230, 1046], pip: [1390, 1050], basil: [1560, 1056] }, poses: rp, jolts: [m("clear1") + .02] })
    + youTag(t, m("gin"), "You: an idea") + (t >= m("gin") + .5 ? TF(1720, 90, spring(t, m("gin") + .5, .4), tpill(0, 0, st.day, 40, P.ink, "#fff", { w: 700 })) : "")
    + speeded(t, m("grow1") + .2, m("tue") + .2) + speeded(t, m("grow2") + .1, m("thu") + .2)
    + feelTag(t, m("walk1") + .2, m("clear1") + 1.2, "Basil draws his map from memory", 300) + feelTag(t, m("walk2") + .1, m("wide") + 1.4, "Basil finds you again", 300)
    + smallPrint(t, s.t0 + .5, PICTURE_RULE) + OP(1 - clamp((t - s.t0) / .4), `<rect width="1920" height="1080" fill="#BFE6FF"/>`) + HUD(t); };
// the pull back out: the camera rises out of the garden and back through the tablet's screen; Thursday afternoon in the rain
SC.pullout = (t, s) => { const u = 1 - eio(clamp((t - s.t0) / 1.2)), w = world(t, [1, 960, 540], { when: "rain", top: easelOn(t, 1, 560) + tablet00(t, screenAt("mk2_done"), TABH[0], TABH[1], TABH[2]) + `<g transform="translate(1440 700)"><path d="M0 0 L-60 -10 L0 -120 L60 -10z" fill="#3F7FD0"/><path d="M0 -10 V40" stroke="#5B6470" stroke-width="5"/></g>` });
  return CAM(w, 1 + 7 * u * u, TABH[0], TABH[1]) + bd("basil", BX.r, 1076, 470, t, { in: s.t0 + .9, flip: true }) + bd("pip", BX.l, 1076, 480, t, { in: s.t0 + 1.0, poses: [[s.t0, "sit"]] }) + bd("momo", BX.m, 1010, 360, t, { in: s.t0 + 1.1 })
    + dayPill(t, "Thu", spring(t, s.t0 + 1.0, .4)) + wipe(t, s.t0, "#FFFFFF") + HUD(t); };

/* 8 · SPACE IT OUT: Thursday, rain. The camera pushes to the card ONE-WEEK MEMORY TEST (HOME) as it fills in: Basil's row, three small maps
   with ticks under Mon, Tue, Thu (each a NEW map drawn from memory: My Magnets mind map, 2, 3 on the tablet beside the card); Pip's row,
   read ×5 under Mon only. Momo big at the left teaching SPACE IT OUT (her cheer after her line). The cat sheltering under the bicycle bay */
const camSpace = (t) => { const s = SCN.space, a = eio(clamp((t - s.t0) / 1.6)); return camMix([1, 960, 540], camOn([330, 360], 1.75, 760, 430), a); };
SC.space = (t, s) => { const rt = MK("rowtue"), cam = camSpace(t), fill = { mon: 1, tue: ramp(t, rt, .3), thu: ramp(t, rt + .8, .3) };
  const tabP = camPt(cam, [600, 380]);
  const tp = camPt(cam, [640, 530]);
  return world(t, cam, { when: "rain", board: { fill }, cat: CAT.bay, top: tablet00(t, screenAt("list3"), 640, 530, 340) })
    + linkChip(t, s.t0 + 1.8, tp[0] + 60, tp[1] - 300 * cam[0] / 1.7, tp[0], tp[1] - 110 * cam[0], "#E0A33A", "a new map each time: My Magnets mind map, 2, 3", 30)
    + bd("momo", 330, 1076, 480, t, { in: s.t0 + .1, poses: [[s.t0, "sit"], [MK("kw_space_it_out") + 1.2, "pointing"], [LE("b802m") + .1, "cheer"], [LE("b802m") + 2.0, "sit"]], achieved: true })
    + bd("basil", BX.r, 1076, 470, t, { in: s.t0 + .2, flip: true }) + dayPill(t, "Thu", 1, 960, 150) + HUD(t); };
// Mark Sentence 2 (Basil): under it, a calendar strip Day 1 · Day 3 · Day 7 with a small map on each
const calStrip = (t, x, y, k) => k < .02 ? "" : TF(x, y, k, ["Day 1", "Day 3", "Day 7"].map((d, i) => TF((i - 1) * 260, 0, 1, `<g filter="url(#drop)"><rect x="-110" y="-100" width="220" height="200" rx="14" fill="#fff"/></g><rect x="-110" y="-100" width="220" height="44" rx="14" fill="#D84A3A"/>${T(0, -68, d, 28, "#fff", { w: 700 })}` + TF(0, 30, .17, handMap(t, MAPB)) + TF(80, 70, .6, tickBadge(30)))).join(""));
SC.mark4 = (t, s) => markScene(t, s, { id: "b804b", sayId: "b803b", who: "basil", n: "2 of 2", text: TL.lines.b804b.text, keys: ["again", "memory", "one", "day,", "three", "days", "week."], size: 62, y: 230, footer: FOOT, achieved: true, under: calStrip(t, 1250, 900, .9 * spring(t, s.t0 + .4, .5)) });

/* 9 · next Monday morning, sun through the pillars: two sheets on the study table; Pip and Basil each draw from memory (the poster turned to the
   wall, the tablet face down), a 3 s quiet while they draw (speeded up); both thinking (they are remembering). The cat stretched out in a
   sunny patch on the top step of the stairs to the car park */
const PG = { pip: 790, basil: 1150 };
const pageOnTable = (t, x, B, t0, t1) => { const at = {}, ks = mapKeys(B); ks.forEach((q, i) => { at[q] = lerp(t0, t1, i / ks.length); }); return `<g transform="translate(${x} 722) scale(1 .62)">${sheet00(360, 260, { lines: false })}${TF(0, 0, .3, handMap(t, B, { at, d: .25, size: 44 }))}</g>`; };
SC.pages = (t, s) => { const d0 = MK("draw0"), d1 = MK("draw1"), cam = camMix(camOn([960, 640], 1.12, 960, 600), camOn([970, 690], 1.6, 960, 560), eio(clamp((t - d0 + .4) / 1.2)));
  return world(t, cam, { when: "morning", cat: CAT.step, top: easelOn(t, 1, 560) + `<g transform="translate(1330 722)"><rect x="-90" y="-10" width="180" height="16" rx="5" fill="#22252C"/></g>` + pageOnTable(t, PG.pip, MAPB.slice(0, 1).concat([MAPB[2]]), d0, d1) + pageOnTable(t, PG.basil, MAPB, d0, d1) })
    + bd("pip", BX.l, 1076, 490, t, { in: s.t0 + .05, poses: [[s.t0, "sit"], [LE("b901h"), "thinking"]], look: 4 }) + bd("basil", BX.r, 1076, 470, t, { in: s.t0 + .1, flip: true, poses: [[s.t0, "sit"], [LE("b901h") + .1, "thinking"]], look: -4 })
    + speeded(t, d0, d1 + .3) + TF(500, 200, 1, tpill(0, 0, "next Mon", 34, P.ink, "#fff", { w: 700 })) + HUD(t); };
/* [LOOK CLOSER] the two pages (lc00.js lcPagesArt): a face close-up of Basil when his page shows all five (a big feeling: a real surprise: he won,
   but he picked three), then a sheepish, happy oops to the end (OUTCOMES); Pip's face at the lower left for his line (he was right about the
   round: confident, a warm smile, then a small determined nod). The coin YOU +1, the Buddies +1 */
SC.lcpages = (t, s) => { window._BUBAT = { pip: [700, 905], '*': [960, 905] }; const tb = MK("basp");
  return lookCloser(t, s, { tz: s.t0, fx: 960, fy: 700, art: lcPagesArt, bgc: "#EEF4E8", set: (tt) => SC.pages(SCN.pages.t1 - .04, SCN.pages), verdict: ["MADE, CHECKED, SPACED OUT", GOODC], tv: MK("v_week"), peek: false,
    over: (tt) => faceCam("basil", tt, tb + .1, tb + 2.6, 1790, 560, 125, [[tb + .1, "surprised"]], { noreact: true }) + peekFace("pip", "l", tt, LT("b903p") - .5)
      + coin(tt, MK("coin1") - .1, 960, 560, "+1", "if you showed two fingers") }); };

/* 10 · the chant: the three buddies in a row in front of the study table, the two pages behind them */
SC.chant = (t, s) => chantScene(t, s, "c1003", { board: (tt, f) => TF(1320, 230, .55, sheet00(330, 250, { lines: false }) + TF(0, 0, .27, handMap(tt, MAPB))) + TF(560, 230, .55, sheet00(330, 250, { lines: false }) + TF(0, 0, .27, handMap(tt, [MAPB[0], MAPB[2]]))), y0: 420 });

/* 11 · score hand, the cat (lizReveal: ONE push-in onto the cat curled up asleep on the doormat by the lift: the reveal spot, new); Momo's
   fun fact (a pet cat learns its own name; even a stranger); Basil points at the cat; Pip waves goodbye */
SC.final = (t, s) => finalScene(t, s, "b1101h", 1, [[s.t0, null, 1], [W("b1101h", "three") - .1, null, 3]]);
SC.liz = (t, s) => { const L = "b1102h", tq = W(L, "it") - .1, c = CAT.mat, tc = W(L, "cat");
  return lizReveal(t, s, L, world(t, [1, 960, 540], { when: "day", cat: c }), c[0], c[1] - 30, tq, "It was on the doormat by the lift!", -120, 160, 80, 2.3, { from: () => SC.final(SCN.final.t1 - .04, SCN.final), ix: 1400, iy: 400, qx: 1120, qy: 700, tx: 960, ty: 985, tell: "b1104h",
    fact: { id: "b1103m", at: [640, 420], w: 900, h: 440, sx: 700, sy: 790, items: [["ff_name", "its own name!", ffName1], ["ff_stranger", "even a stranger", ffName2]], cols: ["#E0A33A", "#5B6BD6"], poses: [[MK("ff_in") - .4, "surprised"], [MK("ff_in") + .8, "sit"]] } })
    + bd("basil", 170, 1076, 330, t, { in: s.t0 + .6, poses: [[s.t0 + .6, "sit"], [tc + .4, "pointing"], [LT("b1103m") - .3, "sit"]] })
    + bd("pip", 390, 1076, 330, t, { in: s.t0 + .7, poses: [[s.t0 + .7, "sit"], [LT("b1104h") - .1, "waving"], [s.t1, "sit"]], wave: true }) + smallPrint(t, s.t0 + .5, CAT_RULE); };

/* 12 · your dare: three cards along the stage, each a small picture of TheOneApp's REAL screen (Make my own mind map · Start a new mind map ·
   Mark my mind map); small print Pick any chapter you are learning. All three point at the viewer (inviting) */
const DARECROP = { mmpage: [.25, .04, .4, .3], sheet1: [.6, .08, .4, .3], mk2_done: [0, .5, .45, .34] };
SC.dare = (t, s) => { const tc = [MK("d1"), MK("d2"), MK("d3")], cur = tc.filter((x) => t >= x - .15).length - 1;
  let out = bg("stage2") + TF(960, 120, spring(t, s.t0 + .1, .45), `<g filter="url(#drop)"><rect x="-260" y="-56" width="520" height="112" rx="56" fill="${P.coral}"/></g>` + T(0, 20, "YOUR DARE", 60, "#fff", { ls: 6 }));
  DARE.forEach(([lab, shot], i) => { const k = spring(t, tc[i] - .6, .45); if (k < .02) return; const x = 380 + i * 580, lit = cur === i ? 1 : 0;
    out += TF(x, 470, k * (1 + .05 * lit), `${lit ? `<rect x="-275" y="-215" width="550" height="430" rx="40" fill="${P.sun}" opacity=".8" filter="url(#b10)"/>` : ""}<g filter="url(#drop)"><rect x="-260" y="-200" width="520" height="400" rx="30" fill="url(#gPaper)"/></g>` + appCrop(shot, DARECROP[shot], -240, -180, 480, 250)
      + `<rect x="-240" y="-180" width="480" height="250" fill="none" stroke="#E3C9A8" stroke-width="4"/>` + wrap(lab, 34, 470, 700).map((l, j, a) => T(0, 130 + (j - (a.length - 1) / 2) * 40, l, 34, P.ink, { w: 700 })).join("")
      + TF(-240, -180, 1, `<circle r="40" fill="url(#gSun)" stroke="${P.ink}" stroke-width="6"/>${T(0, 16, i + 1, 48, P.ink)}`)); });
  ["pip", "basil", "momo"].forEach((w, i) => { out += bd(w, [430, 960, 1490][i], 1076, 300, t, { in: s.t0 + .2 + i * .1, flip: i === 2, poses: [[s.t0, "sit"], [s.t0 + .6, "pointing"], [s.t1 - .2, "sit"]] }); });
  return out + smallPrint(t, s.t0 + .5, CHAPTER_RULE) + HUD(t); };
SC.nyk = (t, s) => nykScene(t, s, TF(960, 1000, .62, sheet00(760, 560, { lines: false }) + TF(0, 0, .66, handMap(t, MAPB, { size: 40 }))) + TF(1500, 560, .9, `<rect x="-160" y="-170" width="320" height="320" rx="10" fill="#C99A62"/><g transform="translate(-228 -344)">${noticeCard(t, { fill: { mon: 1, tue: 1, thu: 1, res: 1 } })}</g>`), { bx: [230, 1730, 1500], hx: 470 });
})(); }
