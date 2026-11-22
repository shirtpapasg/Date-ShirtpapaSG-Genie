// p1v2.js: EP13 PART 1, the teacher's-eye redo (22 Nov 2026, "ALL these are important and you did not make these mistakes when creating
// episode 1"). Loaded after p1.js; it replaces Part 1's scenes picture by picture. Every word, timeline mark and sound cue is kept (one new
// line: the fun fact at the butterfly's reveal, teacher's request). The 22 Nov rules it follows (SERIES_FORMAT 1b, 1d, 4, 10 rule 6):
//  1 buddies at least 1.5x their old size, spread across the frame (never bunched in a corner), props between them, nothing behind a disc;
//  2 the camera pushes in on what is talked about (OUR DESIGN PLAN, the bag, the straps), the speaking buddy big beside it;
//  3 look-closers use the whole panel: OUR DESIGN PLAN large beside the bag, each part its own big moment, a buddy's face peeks in and reacts;
//  4 OUR DESIGN PLAN has ONE home (top left, HOME) in every scene; it only ever glides, never jumps across a cut;
//  5 countdowns take the stage: ring and picture big, clue labels >= 40 px cap height, the blue starry stage, one big reacting buddy;
//  6 one set of big numbered picture cards (the strap itself drawn big), verdict tags on the same cards;
//  7 the hidden butterfly: a smooth push-in, then a circle with a thick black ring on the blue stage, then the game pops; the reveal the same.
// Plus (teacher, 22 Nov): every buddy alive on every beat; the ring and the number pop on the beat of the ticks, the number changes ON a whole-
// second tick, the bell / LOCKED IN! land on 0; nothing over the key-word shelf; four fingers and a thumb; every sample named; chips tied to
// their part by colour and a line; the buddies ride along in the journey.
if (PART === 1) { (() => {
const L1 = "g501", FOOT = "P3 · Diversity of Materials · The design process";
const HOME = [560, 540, .52], BIGB = [1180, 870, .8], DOCK = [336, 334, .26];          // OUR DESIGN PLAN: home (top left), pushed in, tucked away
const L3 = (a, b, u) => [lerp(a[0], b[0], u), lerp(a[1], b[1], u), lerp(a[2], b[2], u)];
const brdAt = (t, p, o = {}) => TF(p[0], p[1], p[2], planBoard(t, o));
const TX = CL.tx, TY = CL.ty, BGX = 800, PX = 520, CAM0 = [1, 960, 540], CREAM = "#FFF6D8";
const CAMP = [1.3, PX, 740], CAMB = [1.25, BGX, 690];
const DARE = ["bagFabric", "bagMetal", "bagWood"], STRK = ["fabric", "metal", "wood"];
const dareBoard = (i, x, y, sc, o = {}) => picBoard(DARE[i], x, y, 1, { sc, lab: o.lab === false ? undefined : DARE_CARDS[i].toLowerCase(), size: 44, id: "p1d" + i + (o.id || "") });
const qMark = (t, t0, x, y, r = 50) => t < t0 ? "" : TF(x, y, spring(t, t0, .5) * (1 + .05 * Math.sin(t * 4)), `<g filter="url(#dropS)"><circle r="${r}" fill="url(#gSun)"/></g>${T(0, r * .52, "?", r * 1.56, P.ink)}`);
const slamFit = (y, txt, col, k) => slamLine(y, txt, Math.min(170, 170 * 1720 / tw(txt, 170, 700, "Fredoka", 4)), col, k);

/* ---------- the classroom: board at HOME (top left, in front of the whiteboard), the bag at the right end of the teacher's table ---------- */
const bagLying = () => TF(BGX - 110, TY, .85, `<g transform="rotate(90) translate(-100 0)">${bag13({ strapL: "tornflat", strapR: "none", zip: 1, open: .5, id: "ly" })}</g>`) + TF(BGX + 140, TY, .62, booksOut());
const bagUp = (o = {}, x = BGX) => TF(x, TY, .85, bag13({ strapR: "new", id: "up", ...o }));
const paperQ = (x) => `<path d="M${x - 110} ${TY} L${x - 84} ${TY - 22} H${x + 124} L${x + 106} ${TY}z" fill="#FFFDF4" stroke="#E3D6B8" stroke-width="4" stroke-linejoin="round"/>`;
const easelOn = (x, o = {}) => TF(x, TY, .5, easelS(TF(0, 0, .52, drawingPic({ mat: MATALL, words: false, cc: true, ...o })), 420, 300));
const tableStuff = (o) => (o.bag === "lying" ? bagLying() : o.bag === "new" ? bagUp({ zip: 1, open: 1 }) + TF(BGX - 210, TY, .7, bookStack()) : o.bag === "full" ? bagUp() : o.bag === "open" ? bagUp({ zip: 1, open: 1 }) : "")
  + (o.paper !== undefined ? paperQ(o.paper) : "") + (o.easel ? easelOn(o.easel === true ? PX : o.easel, o.easelO) : "");
const V = (t, o = {}, cam) => VC(t, { bfly: o.bfly, items: (o.back || "") + tableStuff(o) + (o.board === undefined ? "" : brdAt(t, o.boardP || HOME, o.board)) + (o.items || "") }, cam);
const VD = (t, o = {}, cam, a = .62) => V(t, o, cam) + `<rect width="1920" height="1080" fill="${P.night}" opacity="${a}"/>`;
// buddy slots in the classroom: L (left), R2 (right of centre), R1 (right); sizes 1.5x the old discs
const SL = { L: 300, R2: 1190, R1: 1605 };
const bud = (who, slot, h, t, o = {}) => buddy(who, SL[slot], 1062, h, t, { aura: true, flip: slot !== "L", ...o });
// a gentle nod (agreeing) as a lean that bobs for d seconds
const nodAt = (t, t0, d = 1.2, a = 5) => t < t0 || t > t0 + d ? 0 : a * Math.sin((t - t0) * 9) * (1 - (t - t0) / d);
// a quick pose list helper: listen (sit) and react on beats; every buddy on screen changes on the beats
const poses = (...p) => p.filter((x) => x && x[0] !== undefined).sort((a, b) => a[0] - b[0]);

/* ---------- a face that peeks in from a lower corner of a look-closer panel and reacts (gasp / nod / thinking) ---------- */
function peek(t, who, tin, tout, ps, o = {}) { const k = ss(tin, tin + .45, t) * (1 - ss(tout - .35, tout, t)); if (k <= .01) return "";
  const W_ = LCW, x0 = W_.x - W_.w / 2, y0 = W_.y - W_.h / 2, side = o.side || -1, h = o.h || 480, x = side < 0 ? x0 + (o.dx || 200) : x0 + W_.w - (o.dx || 200), bottom = y0 + W_.h, y = bottom + h * .52 + (1 - k) * h * .62;
  let look = o.look || 0; for (const [tn, d, a] of o.nods || []) look += nodAt(t, tn, d, a);
  return `<clipPath id="pk_${who}"><rect x="${x0}" y="${y0}" width="${W_.w}" height="${W_.h}" rx="44"/></clipPath><g clip-path="url(#pk_${who})">` + buddy(who, x, y, h, t, { aura: true, flip: side > 0, poses: ps, look, nohop: true, tag: false }) + `</g>`
    + OP(k, TF(x + (side < 0 ? 0 : 0), bottom - 26, 1, nameTag(who, 30))); }

/* ---------- the strap cards: ONE big numbered picture card per choice (the strap itself drawn big), the verdict tag on the same card ---------- */
function strapCard(i, o = {}) { const w = 330, h = 430, lit = o.lit || 0, pl = o.pulse || 0, k = STRK[i];
  return `<g transform="scale(${n2(1 + .05 * pl + .05 * Math.min(1, lit))})">${lit > .02 ? `<rect x="${-w / 2 - 16}" y="${-h / 2 - 16}" width="${w + 32}" height="${h + 32}" rx="50" fill="${P.sun}" opacity="${n2(.9 * Math.min(1, lit))}" filter="url(#b10)"/>` : ""}
    <g filter="url(#drop)"><rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="38" fill="url(#gPaper)" stroke="${pl > .3 || lit > .5 ? P.sun : "#E3C9A8"}" stroke-width="8"/></g>
    <rect x="${-w / 2 + 22}" y="${-h / 2 + 22}" width="${w - 44}" height="${h - 130}" rx="24" fill="#FFF1DA"/>
    <g transform="translate(0 ${-h / 2 + 22 + (h - 130) / 2}) rotate(90)">${strapBand(k, 270, 74)}</g>
    ${T(0, h / 2 - 40, DARE_CARDS[i].toLowerCase(), 62, P.ink)}
    <g transform="translate(${-w / 2 + 4} ${-h / 2 + 4})" filter="url(#dropS)"><circle r="56" fill="#3B2A8C" stroke="#fff" stroke-width="7"/>${T(0, 27, i + 1, 76, "#fff")}</g>
    ${o.tag !== undefined && o.tag[1] > .02 ? TF(0, h / 2 + 18, o.tag[1], jobTag(0, o.tag[0], 30)) : ""}
    ${lit > .5 ? TF(w / 2 - 28, -h / 2 + 28, spring(lit, .5, .5), tickBadge(40)) : ""}</g>`; }

/* ---------- the big ring (a countdown that takes the stage): it pulses on every tick, the number pops when it changes (ON the whole-second tick) ---------- */
function bigRing(t, x, y, sc, r0, dur, inner, o = {}) { const bell = r0 + dur, rs = ringState(t, r0, dur), secT = t >= r0 && t < bell ? r0 + Math.floor(t - r0) : -9, pop = secT > 0 ? pulse(t, secT, .01, .28) : 0, shut = pulse(t, bell, .01, .6);
  const run = t >= r0 && t < bell;
  return TF(x, y, sc * (1 + (run ? .022 * rs.tick + .03 * pop : 0) + .05 * pulse(t, bell, .01, .4)), ringTimer(0, 0, t < r0 ? 1 : t < bell ? rs.frac : 0, t < r0 ? dur : t < bell ? rs.secs : 0, t, { tick: Math.max(rs.tick, pop), shut, inner }))
    + (shut > .05 ? `<circle cx="${x}" cy="${y}" r="${n2((RING_R + 40 + 90 * (1 - shut)) * sc)}" fill="none" stroke="${P.sun}" stroke-width="8" opacity="${n2(shut * .85)}"/>` : "")
    + (run && pop > .05 ? `<circle cx="${x}" cy="${y}" r="${n2((RING_R + 36 + 40 * (1 - pop)) * sc)}" fill="none" stroke="#fff" stroke-width="${n2(6 * pop)}" opacity="${n2(.6 * pop)}"/>` : ""); }
// a stamp that slams in at t0 and stays until t1
function stampHold(t, t0, t1, x, y, txt, size = 124) { if (t < t0 || t > t1 + .25) return ""; const u = (t - t0) / .14, k = (u < 1 ? lerp(2.2, 1, eo(u)) : 1 + .06 * wob(t, t0 + .14, .4)), o = Math.min(1, u * 2) * (1 - ss(t1, t1 + .22, t));
  return OP(o, TF(x, y, k * 1.25, `<text x="0" y="40" font-family="Fredoka" font-weight="700" font-size="${size}" text-anchor="middle" letter-spacing="6" fill="${P.sun}" stroke="${P.ink}" stroke-width="22" stroke-linejoin="round" paint-order="stroke" filter="url(#drop)">${txt}</text><text x="0" y="40" font-family="Fredoka" font-weight="700" font-size="${size}" text-anchor="middle" letter-spacing="6" fill="url(#gSun)">${txt}</text>`, -6)); }
// a clue label big enough for a phone (Fredoka 60: cap height about 42 px), drawn ON TOP of the ring frame
const clue = (t, t0, x, y, txt) => t < t0 ? "" : TF(x, y, spring(t, t0, .4), tpill(0, 0, txt, 60, "#fff", P.ink, { w: 700 }));

/* ============ 1 · the silent cold open: the classroom after school; the torn bag; EP12's three boards stand in on the desks; the buddies pop in ============ */
const CBX = [1160, 1400, 1640], CBY = 690;
const coldBoards = (t, tb) => [0, 1, 2].map((i) => { const t0 = tb + i * .3; if (t < t0) return ""; const [x, d] = slideX(t, t0, .7, 2500, CBX[i], CBY); return d + dareBoard(i, x, CBY, .5, { lab: false, id: "c" }); }).join("");
const coldBuds = (t, tp, o = {}) => bud("pip", "L", 380, t, { in: tp, poses: poses([tp, "waving"], [tp + 1.4, "sit"], o.pip), wave: true }) + buddy("basil", 1010, 1062, 330, t, { aura: true, in: tp + .2, poses: poses([tp + .2, "cheer"], [tp + 2.2, "sit"], o.basil) })
  + buddy("momo", 1700, 1062, 360, t, { aura: true, flip: true, in: tp + .4, poses: poses([tp + .4, "waving"], [tp + 1.7, "sit"], o.momo), wave: true });
SC.cold = (t, s) => { const tb = MK("boardsIn"), tp = MK("budsIn");
  return V(t, { bag: "lying", items: coldBoards(t, tb) }, [1.02 + .02 * eio(t / 6), 960, 548]) + coldBuds(t, tp) + lowerPill(60, 96, "A Primary 3 classroom,", "Singapore"); };

/* ============ 2 · "Last time…": EP12's dare, word for word: the three big numbered strap cards (no second row of number cards) ============ */
SC.lasttime = (t, s) => { const L = "g203", tc = [W(L, "one"), W(L, "two"), W(L, "three")], z = 1 + .04 * eio((t - s.t0) / 8), k = ramp(t, s.t0 + .05, .5), cur = tc.filter((x) => t >= x - .15).length - 1;
  let cards = ""; [0, 1, 2].forEach((i) => { const fw = cur === i ? ss(tc[i] - .15, tc[i] + .25, t) : (cur > i ? 1 - ss(tc[i + 1] - .15, tc[i + 1] + .25, t) : 0);
    cards += TF(520 + i * 440, 560 - 30 * fw + 14 * (1 - spring(t, s.t0 + .2 + i * .15, .45)), 1.02 * (1 + .1 * fw), strapCard(i, { pulse: cur === i ? .9 * fw : pulse(t, tc[i], .04, .9) })); });
  return bg("stage2") + OP(ramp(t, s.t0, .3), T(960, 110, "Last time…", 60, "#fff", { w: 600 }))
    + OP(k, `<g transform="translate(960 540) scale(${n2(z)}) translate(-960 -540)">${cards}</g>` + qMark(t, W("g202", "which") - .1, 960, 230)
      + TF(960, 1000, spring(t, W("g202", "which") - .1, .4), tpill(0, 0, DARE_LABEL, 44, P.sun, P.ink, { w: 700 }))) + HUD(t); };
SC.back = (t, s) => V(t, { bag: "lying", items: coldBoards(t, -9) }) + coldBuds(t, -9, { basil: [LT("g204") - .1, "surprised"], pip: [LT("g204"), "pointing"] })
  + (t >= LT("g204") - .1 ? TF(960, 300, spring(t, LT("g204") - .1, .45), tpill(0, 0, "Hold on to your answer!", 60, P.ink, "#fff", { w: 700 })) : "") + HUD(t);
SC.title = (t, s) => { const u = t - MK("title"), dim = clamp(u / .2); return lcSet(t, s, "back") + `<rect width="1920" height="1080" fill="${P.night}" opacity="${n2(.78 * dim)}"/>`
  + slamFit(400, "A METAL STRAP?", "#fff", slamK(u, .05)) + slamFit(610, "DESIGN IT LIKE AN ENGINEER!", P.sun, slamK(u, .55)) + HUD(t); };

/* ============ 3 · the game and the hidden butterfly: ONE smooth push-in from the real classroom onto the butterfly; it lands in a circle with a
   thick BLACK ring and everything outside turns into the blue starry stage; then the game pops out over it (EP12 v2's push-in + the 22 Nov circle) ============ */
const GC = { T: [1450, 420], r: 178, Z: 3.2 };
const pushCam = (inner, u, ax, ay, tx, ty, Z) => `<g transform="translate(${n2(lerp(ax, tx, u))} ${n2(lerp(ay, ty, u))}) scale(${n2(lerp(1, Z, u) * 1000) / 1000}) translate(${-ax} ${-ay})">${inner}</g>`;
const popSpark = (t, t0, x, y, r = 90) => { const u = (t - t0) / .5; if (u <= 0 || u >= 1) return ""; let g = ""; for (let i = 0; i < 6; i++) { const a = (i * 60 + 20) * Math.PI / 180, d = r * (.55 + .65 * eo(u)); g += TF(x + Math.cos(a) * d, y + Math.sin(a) * d, (1 - u) * (i % 2 ? 1.2 : .8), `<path d="M0 -14 L4 -4 L14 0 L4 4 L0 14 L-4 4 L-14 0 L-4 -4z" fill="#fff"/>`); } return g; };
// the world pushed in on (ax, ay) -> (tx, ty) at zoom Z, then closed into a black-ringed circle of radius r on the blue stage (kc 0..1)
function circleShot(world, u, A, Tt, Z, r, kc, id) { const pushed = pushCam(world, u, A[0], A[1], Tt[0], Tt[1], Z); if (kc <= .001) return pushed;
  const cr = lerp(1500, r, eio(kc));
  return OP(Math.min(1, kc * 3), bg("stage")) + `<clipPath id="gc_${id}"><circle cx="${Tt[0]}" cy="${Tt[1]}" r="${n2(cr)}"/></clipPath><g clip-path="url(#gc_${id})">${pushed}</g><circle cx="${Tt[0]}" cy="${Tt[1]}" r="${n2(cr)}" fill="none" stroke="#14101F" stroke-width="${n2(22 * Math.min(1, kc * 2))}"/>`; }
const animalLabel = (t, t0, x, y, size = 46) => t < t0 ? "" : TF(x, y, spring(t, t0, .5), `<g filter="url(#dropS)"><path d="M-16 ${n2(size * .7)} L0 ${n2(size * 1.25)} L16 ${n2(size * .7)}z" fill="${P.ink}"/></g>` + tpill(0, 0, "a little " + HIDDEN[0], size, P.ink, "#fff", { w: 700 })) + popSpark(t, t0, x, y, 150);
SC.game = (t, s) => { const L = "g301", tLock = W(L, "lock"), tC = W(L, HIDDEN[0]), tFind = W(L, "spot"), tz = s.t0 + .05, dz = 1.2, u = eio((t - tz) / dz), kc = clamp((t - (tz + dz - .25)) / .6), tP = tz + dz + .3;
  const world = V(t, { bag: "lying", items: coldBoards(t, -9) }) + `<rect width="1920" height="1080" fill="${P.night}" opacity="${n2(.78 * (1 - u))}"/>`;
  let out = circleShot(world, u, [BFLY[0], BFLY[1] - 4], GC.T, GC.Z, GC.r, kc, "g");
  const gone = clamp((t - s.t0) / .3); if (gone < 1) out += OP(1 - gone, TF(0, 60 * gone, 1, coldBuds(t, -9) + slamFit(400, "A METAL STRAP?", "#fff", 1) + slamFit(610, "DESIGN IT LIKE AN ENGINEER!", P.sun, 1)));
  const tYou = W(L, "you"), tBud = W(L, "buddies"), tb = W(L, "every") - .3, ph2 = ss(tb, tb + .4, t), tOne = W(L, "one"), tH = Math.max(tYou - .1, tP);
  const k0 = eio((t - (s.t0 + .1)) / .55); out += scoreboard(t, lerp(1640, 760, k0), lerp(70, 170, k0), lerp(.62, 1.35, k0) + .12 * pulse(t, tYou, .02, .3) + .12 * pulse(t, tBud, .02, .3), { you: 0, bud: 0 });
  const nf = t >= tOne ? 1 : 0, youIn = spring(t, tH, .5);
  if (youIn > .02) { const px = lerp(400, 300, ph2), cx = lerp(880, 760, ph2), cs = lerp(1.15, 1.7, ph2), cy = lerp(700, 820, ph2), bob = 8 * Math.sin(t * 5);
    out += TF(px, lerp(640, 600, ph2) + bob, youIn * lerp(1.2, .9, ph2), `<g filter="url(#dropS)">${countHand(t >= tLock ? 2 : 0)}</g>`) + OP(1 - ph2, tpill(400, 880, "answer hand", 30, "#fff", P.ink));
    out += TF(cx, cy - bob, youIn * cs * (1 + .06 * pulse(t, tOne, .02, .2)), `<g filter="url(#dropS)">${countHand(ph2 > .5 ? nf : 0)}</g>`) + OP(1 - ph2, tpill(880, 990, "score hand", 30, "#fff", P.ink));
    out += youPill(lerp(640, 300, ph2), lerp(470, 400, ph2), 1.3 * youIn) + popSpark(t, tH, 640, 640, 260);
    if (nf && ph2 > .5) out += TF(960, 560, spring(t, tOne, .35), `<g filter="url(#dropS)"><circle r="70" fill="url(#gSun)"/></g>${T(0, 28, "+1", 70, P.ink)}`); }
  out += OP(pulse(t, tLock + .2, .2, 1.4) * (1 - ph2), `<g transform="translate(200 470) scale(.42)">${ringTimer(0, 0, .62, 3, t)}</g>`);
  [["pip", 1080, "waving"], ["basil", 1400, "cheer"], ["momo", 1720, "waving"]].forEach(([w, x, pz], i) => { const tt = Math.max(tBud, tP + .1) + i * .14;
    out += buddy(w, x, 1066, 300, t, { aura: true, in: tt - .08, poses: poses([tt - .08, pz], [tt + 1.4, "sit"], [tC - .1, "surprised"], [tFind, "cheer"], [tFind + 1.6, "sit"]), wave: true }); });
  out += animalLabel(t, tC - .1, GC.T[0], GC.T[1] - GC.r - 62) + (t >= tFind - .1 ? TF(GC.T[0], GC.T[1] + GC.r + 64, spring(t, tFind - .1, .4), tpill(0, 0, "Can you spot it?", 42, P.ink, P.sun, { w: 700 })) : "");
  return out + logo(t); };

/* ============ 4 · goals (Basil reads, big at the left; the cards beside him) and the countdown (buddies 1.5x) ============ */
SC.goals = (t, s) => goals3(t, s, [["What engineers do", ""], ["The design steps", ""], ["Design a school bag", ""]], ["g401", "g402", "g403", "g404"], "basil", { xs: [810, 1230, 1650], sc: .82, bx: 300, bh: 400, y: 600 });
SC.count = (t, s) => { const L = "h501", ws = [["Are you ready?", LT(L), 150, "#fff"], ["3", W(L, "three"), 520, P.sun], ["2", W(L, "two"), 520, P.sun], ["1", W(L, "one"), 520, P.sun], ["GO!", W(L, "go"), 460, "#fff"]];
  let cur = 0; ws.forEach((w, i) => { if (t >= w[1] - .03) cur = i; }); const [txt, t0, size, col] = ws[cur], k = lerp(2.2, 1, eo((t - t0 + .03) / .16)) + .05 * wob(t, t0 + .13, .4), ringR = 300 + 500 * eo((t - t0) / .6);
  const jumps = ws.slice(1).map((w) => [w[1] - .18, 60]), go = ws[4][1] - .05;
  return bg("stage") + (cur ? `<circle cx="960" cy="440" r="${n2(ringR)}" fill="none" stroke="${col}" stroke-width="${n2(22 * (1 - eo((t - t0) / .6)))}" opacity=".8"/><circle cx="960" cy="440" r="320" fill="${P.night}" opacity=".5"/>` : "")
    + `<g transform="translate(960 ${cur ? 440 : 410}) scale(${n2(k)})"><g transform="translate(0 ${size * .05})" opacity=".8">${T(0, size * .35, txt, size, P.ink, { ls: cur ? 0 : 4 })}</g>${T(0, size * .35 - 6, txt, size, col, { ls: cur ? 0 : 4 })}</g>`
    + buddy("pip", 300, 1062, 420, t, { aura: true, jump: jumps, poses: [[s.t0, "pointing"], [ws[1][1] - .2, "sit"], [go, "cheer"]] }) + buddy("basil", 960, 1072, 300, t, { aura: true, jump: jumps, poses: [[s.t0, "cheer"], [ws[1][1] - .2, "sit"], [go, "cheer"]] })
    + buddy("momo", 1620, 1062, 420, t, { aura: true, flip: true, jump: jumps, poses: [[s.t0, "waving"], [ws[1][1] - .2, "sit"], [go, "cheer"]], wave: true }) + HUD(t); };

/* ============ 5 · Round 1 (EP12's dare): the countdown takes the stage. Left: the ring, big, the torn bag in it, the clues ON its frame;
   right: ONE set of big numbered strap cards. During the ring only the question, Basil (big, fidgeting) and YOUR fingers. The buddies lock in after you ============ */
const R1X = 500, R1Y = 500, R1S = 1.2, CX3 = [1080, 1400, 1720], CY3 = 470;
SC.r1 = (t, s) => { const tq = W(L1, "fabric") - .1, tc = [W(L1, "fabric"), W(L1, "metal"), W(L1, "wood")], r0 = MK("ring0_r1"), dur = 3, bell = r0 + dur, lockE = LE("g502"), rs = ringState(t, r0, dur);
  const tPip = LT("g505"), tMomo = LT("g504"), tBas = LT("g503"), tin2 = bell + .15, zb = ss(bell + .1, bell + .6, t), up = lerp(0, -70, zb), gs = lerp(1, .9, zb);
  // the ring and its picture
  const inner = `<circle cx="0" cy="0" r="172" fill="url(#mSky)"/>` + TF(0, 96, .78, bag13({ strapR: "torn", id: "rg" }));
  let main = bigRing(t, R1X, R1Y, R1S, r0, dur, inner) + clue(t, tq + .1, R1X - 170, R1Y - 275, DARE_CLUES[0]) + clue(t, tq + .25, R1X - 210, R1Y - 150, DARE_CLUES[1]);
  // the cards: each pops as Heart says it; while the ring drains the highlight steps card to card ON the ticks
  [0, 1, 2].forEach((i) => { const k = spring(t, tc[i] - .08, .45); if (k < .02) return; const step = t >= r0 && t < bell ? (Math.floor((t - r0) * 2) % 3 === i ? 1 : 0) : 0;
    main += TF(CX3[i], CY3, k * .92, strapCard(i, { pulse: Math.max(step * (.5 + rs.tick), pulse(t, tc[i], .04, .5)) })); });
  let out = bg("stage") + `<g transform="translate(960 ${n2(540 + up)}) scale(${n2(gs)}) translate(-960 -540)">${main}</g>`;
  out += OP(ramp(t, tq, .3), T(900, 104, DARE_LABEL, 54, "#fff", { w: 600 })) + OP(ramp(t, r0 - .15, .2) * (1 - zb) * (t < bell ? .75 + .25 * Math.sin(t * 9) : 1), T(900, 166, "LOCK IT IN!", 42, P.sun, { ls: 8 }));
  out += `<rect y="820" width="1920" height="260" fill="url(#xFloor)"/>`;
  // YOU: the fingers (1, 2 or 3), bobbing on every tick through the countdown; away after the bell
  { const nf = t >= tc[2] - .1 ? 3 : t >= tc[1] - .1 ? 2 : 1, cyc = t >= r0 && t < bell ? 1 + (Math.floor((t - r0) * 2) % 3) : nf, a = ramp(t, tc[0] - .15, .25) * (1 - ramp(t, bell + .1, .25));
    out += OP(a, TF(170, 905 - 14 * rs.tick, .82 * (1 + .1 * pulse(t, tc[nf - 1], .03, .3)), `<g filter="url(#dropS)">${countHand(cyc)}</g>`) + youPill(170, 690, 1.15) + tpill(400, 1010, "1, 2 or 3 fingers", 34, P.ink, "#fff")); }
  out += OP(ramp(t, tq + .5, .3) * (1 - ss(r0 - .3, r0, t)), pill(1400, 790, 470, 48, "#120E2E", "The buddies lock in after you", 27, "#DDD3FF", { w: 500, ls: 1 }));
  // the buddies: Basil big through the countdown (thinking, fidgeting on the beat, leaning in); Pip and Momo pop in at the bell; each flips his pick and reacts
  const secJ = []; for (let b = 0; b < dur; b++) secJ.push([r0 + b, 12]);
  const B = { pip: [360, tin2, poses([tin2, "thinking"], [tPip - .12, "sit"], [LE("g505") + .1, "pointing"], [tBas + .2, "surprised"], [LE("g503") + .1, "thinking"])],
    basil: [1360, s.t0 + .3, poses([s.t0 + .3, "arms_crossed"], [r0 - .1, "arms_crossed"], [bell, "surprised"], [tBas - .12, "sit"], [LE("g503") + .1, "cheer"], [tMomo + .3, "arms_crossed"], [tPip + .3, "surprised"])],
    momo: [1660, tin2 + .12, poses([tin2 + .12, "thinking"], [tMomo - .12, "sit"], [LE("g504") + .1, "thinking"], [tPip + .4, "surprised"])] };
  const picks = { pip: ["g505", "1"], basil: ["g503", "2"], momo: ["g504", "3"] };
  let buds = "", cards = "", bubs = "";
  B.basil[0] = lerp(1360, 990, ss(bell + .1, bell + .7, t));
  ["pip", "basil", "momo"].forEach((who) => { const [x, tin, ps] = B[who], hh = 340, look = who === "basil" && t >= r0 && t < bell ? -6 * Math.sin((t - r0) * Math.PI * 2) : 0;
    buds += buddy(who, x, 1066, hh, t, { aura: true, auraO: .9, flip: who === "momo", in: tin, poses: ps, look, jump: who === "basil" ? secJ : [], nohop: who === "basil" && t < bell });
    if (t > tin + .2) cards += pickNum(who, x + hh * .62 * (who === "momo" ? -1 : 1), 1066 - hh * .32, t, LT(picks[who][0]) - .1, picks[who][1]);
    bubs += say(picks[who][0], x + (who === "momo" ? -120 : who === "pip" ? 60 : 0), 1066 - hh - 120, t, { x: who !== "pip", tail: who === "momo" ? 120 : who === "pip" ? -60 : 0, maxW: 560, size: 42 }); });
  return out + buds + cards + bubs + stampHold(t, bell, lockE + .15, 960, 470, "LOCKED IN!") + bellIcon(t, r0, 1160, 260) + HUD(t); };

/* ============ 6 · [LOOK CLOSER] the straps (the approved look, kept): Pip's face peeks in (it is his answer) and reacts ============ */
SC.lcstraps = (t, s) => { const tl = MK("lift"), tn = MK("notear"), tv = MK("v_straps");
  return lookCloser(t, s, { tz: s.t0, fx: CL.chx, fy: 690, art: strapsArt, set: (tt) => V(tt, { bag: "lying", bfly: false }, camL(CAM0, [1.3, 1020, 740], eio((tt - s.t0) / 1.0))),
    verdict: [`FABRIC: <tspan fill="#fff">FLEXIBLE AND STRONG</tspan>`, GOODC, { plain: "FABRIC: FLEXIBLE AND STRONG", vx: 1080 }], tv, over: (tt) => smallPrint(tt, s.t0 + 1.2, FORCE_RULE),
    top: (tt) => peek(tt, "pip", s.t0 + 1.6, s.t1 + 1, poses([s.t0, "thinking"], [MK("lay1") + .3, "pointing"], [MK("lay2") + .2, "thinking"], [MK("lift") - .1, "surprised"], [tn + .2, "cheer"], [tv, "cheer"]), { h: 470, dx: 170, nods: [[tn + .3, 1.4, 6], [tv + .1, 1.6, 6]] }) }); };

/* ============ the answer: ONE set of big numbered strap cards, the verdict tags ON them; card 1 glows; Basil (big) goes "oops"; the coin clear of the shelf ============ */
SC.strapans = (t, s) => { const L = "g605", tA = W(L, "one") - .1, tOne = W(L, "one", 2) - .1, hb = HAS("g606"), tg = MK("boardtags");
  return VD(t, { bag: "full" })
    + [0, 1, 2].map((i) => TF(420 + i * 400, 500, 1.06 * spring(t, s.t0 + .05 + i * .08, .4), strapCard(i, { lit: i === 0 && t >= tA ? spring(t, tA, .45) : 0, tag: [i === 0 ? 0 : 1, t >= tg + i * .2 ? spring(t, tg + i * .2, .45) : 0] }))).join("")
    + coin(t, tOne, 820, 850, "+1", "if you showed one finger")
    + buddy("basil", 1640, 1062, 420, t, { aura: true, flip: true, in: s.t0 + .1, poses: poses([s.t0, "surprised"], [tA + .1, "arms_crossed"], [hb ? LT("g606") - .12 : tA + 1, "oops"], [hb ? LE("g606") + .4 : tA + 3, "cheer"]), nohop: true, look: nodAt(t, hb ? LE("g606") + .4 : tA + 3, 1.2, 5) })
    + (hb ? say("g606", 1560, 520, t, { size: 42, tail: 60, maxW: 440 }) : "") + HUD(t); };

/* ============ 7 · what engineers do (Momo big at the right) ============ */
const STR3 = [["fabric", 0], ["metal", 1], ["wood", 1]];
SC.engineers = (t, s) => { const rows = [450, 640, 830]; let it = `<rect width="1920" height="1080" fill="#E9CC96"/><rect width="1920" height="150" fill="#B5C4B0"/><rect y="150" width="1920" height="30" fill="url(#sDesk)" stroke="#B98F52" stroke-width="5"/>${wgrain(40, 1880, 300, 10, 2)}${wgrain(40, 1880, 560, 10, 5)}${wgrain(40, 1880, 760, 10, 8)}${wgrain(40, 1880, 980, 10, 11)}`;
  STR3.forEach(([k, j], i) => { const y = rows[i], t0 = s.t0 + .25 + i * .25; it += `<rect x="130" y="${y + 14}" width="860" height="30" rx="15" fill="${P.ink}" opacity=".14" filter="url(#b4)"/>` + TF(560, y, 1, strapBand(k, 860, 60)) + (t >= t0 ? TF(560, y - 72, spring(t, t0, .4), jobTag(t, j, 32)) : ""); });
  const tE = MK("kw_engineers");
  return it + TF(1170, 1010, 1.3 * spring(t, s.t0 + .2, .5), hardHatCard())
    + buddy("momo", 1645, 1062, 400, t, { aura: true, flip: true, in: s.t0 + .1, poses: poses([s.t0, "thinking"], [tE - .1, "surprised"], [LT("g702") - .12, "cheer"], [LE("g702") + .3, "sit"], [LT("g703") + 1.2, "pointing"]), look: nodAt(t, LT("g703") + .3, 1.4, 5) })
    + say("g702", 1430, 560, t, { size: 42, tail: 120, maxW: 440 }) + HUD(t); };
SC.mark1 = (t, s) => markScene(t, s, { id: "g705", sayId: "g704", who: "basil", n: "1 of 2", text: "Knowing the physical properties of a material is important when designing and making new products.", keys: ["physical", "properties", "designing", "and", "making", "new", "products."], size: 62, y: 250, footer: FOOT,
  under: STR3.map(([k, j], i) => { const x = 620 + i * 240; return TF(x, 1000, 1, strapBand(k, 220, 26)) + TF(x, 950, 1, jobTag(t, j, 17)) + (i === 0 ? TF(x - 62, 1046, 1, propChip("FLEXIBLE", 16)) + TF(x + 62, 1046, 1, propChip("STRONG", 16)) : ""); }).join("") });

/* ============ 8 · the plan: OUR DESIGN PLAN is introduced BIG (the camera is on it), Basil big beside it; box 1 glows on "First" ============ */
SC.plan = (t, s) => { const ti = MK("planIn"), [bx, bd] = slideX(t, ti + .05, .75, 2700, BIGB[0], BIGB[1]), dimk = ramp(t, ti, .6);
  return V(t, { bag: "new" }, camL(CAM0, [1.12, 760, 600], eio((t - ti) / 1.4))) + `<rect width="1920" height="1080" fill="${P.night}" opacity="${n2(.45 * dimk)}"/>` + (t >= ti ? bd + TF(bx, BIGB[1], BIGB[2], planBoard(t, {})) : "")
    + buddy("basil", 300, 1062, 420, t, { aura: true, in: s.t0 + .05, poses: poses([s.t0, "sit"], [ti + .8, "cheer"], [MK("box1") - .1, "surprised"], [MK("box1") + .9, "sit"]), look: nodAt(t, MK("box1") + 1.0, 1.0, 5) }) + HUD(t); };

/* ============ [LOOK CLOSER] the bag, part by part: the whole panel. OUR DESIGN PLAN glides from the push-in to its HOME (top left) and stays there,
   large; the bag does its job on the right; each named part gets its own push-in, big label and light; Basil's face peeks in at the lower left ============ */
const PARTN = ["straps", "body", "zip", "base"], BH = { S: 1.2, FY: 300, TY: 140, CH: [610, 312, 1.3] };
function bagArt2(t) { const S = BH.S, FY = BH.FY, TY = BH.TY, CH = BH.CH, RAILY = CH[1] - 322 * CH[2], tb = MK("booksin"), tz = MK("zip1"), th = MK("hang"), tp = PARTN.map((p) => MK("p_" + p)), tu = PARTN.map((p) => MK("u_" + p)), tv = MK("v_bag");
  const P0 = [170, TY], P1 = [CH[0], RAILY + 44 + 250 * S], P2 = [330, FY], uh = eio((t - th) / .8), ud = eio((t - (tu[3] - .75)) / .75);
  const bx = ud > 0 ? lerp(P1[0], P2[0], ud) : lerp(P0[0], P1[0], uh), by = ud > 0 ? lerp(P1[1], P2[1], ud) - 50 * Math.sin(Math.PI * ud) : lerp(P0[1], P1[1], uh) - 150 * Math.sin(Math.PI * uh), hung = uh >= .93 && ud <= .07;
  const nb = [0, 1, 2, 3, 4].filter((i) => t >= tb + .1 + i * .22).length, zo = t < tz ? 1 : t < tu[1] ? 1 - eio((t - tz) / .5) : t < tu[2] ? ramp(t, tu[1], .4) : 1 - eio((t - tu[2]) / .6);
  let lit = null; tp.forEach((x, i) => { if (t >= x && t < (i < 3 ? tp[i + 1] : x + 2.4)) lit = PARTN[i]; });
  tu.forEach((x, i) => { if (t >= x - .3 && t < x + 1.6) lit = PARTN[i]; });
  const rot = hung ? 3 * wob(t, th + .8, 1.2) + 4 * wob(t, tu[0], 1.1) * (t >= tu[0] ? 1 : 0) : 0, sq = t >= tu[3] ? 1 - .05 * wob(t, tu[3], .4) : 1;
  // where each part is (art coords, before the push-in)
  const PP = { straps: [bx - 62, hung ? RAILY + 20 : by - 250 * S], body: [bx, by - 100 * S], zip: [bx, by - 172 * S], base: [bx, by - 18 * S] };
  // the push-in: on each part as it is named (p_*) and as it does its job (u_*); back out between
  // the push-in: C = the part (art), F = where it lands, Z = the zoom; blended in and out on the beats (one smooth move, never a cut)
  const FY_ = { straps: -170, body: 70, zip: -20, base: 190 }; let C = [470, 0], F = [470, 0], Z = 1; const zk = (a, b) => ss(a, a + .5, t) * (1 - ss(b - .4, b, t));
  const beats = [...tp.map((x, i) => [x - .25, i < 3 ? tp[i + 1] - .05 : tp[3] + 2.3, PARTN[i], 1.45]), ...tu.map((x, i) => [x - .5, x + 1.7, PARTN[i], 1.3])];
  for (const [a, b, p, zz] of beats) { const kk = zk(a, b); if (kk > 0) { C = [lerp(C[0], PP[p][0], kk), lerp(C[1], PP[p][1], kk)]; F = [lerp(F[0], 470, kk), lerp(F[1], FY_[p], kk)]; Z = lerp(Z, zz, kk); } }
  const e = clamp((Z - 1) / .3), O = [lerp(C[0], F[0], e), lerp(C[1], F[1], e)], M = (p) => [O[0] + Z * (p[0] - C[0]), O[1] + Z * (p[1] - C[1])];
  const zt = Z === 1 ? "" : `translate(${n2(O[0])} ${n2(O[1])}) scale(${n2(Z)}) translate(${n2(-C[0])} ${n2(-C[1])})`;
  // the straps over the rail while it hangs
  const hs = hung ? [-1, 1].map((sd) => ribbon([[bx + sd * 58 * S, by - 236 * S], [bx + sd * 62, RAILY - 30]], 28, sd > 0 ? {} : { plain: true, col: "#F58A2E", edge: BAGL }) + `<path d="M${bx + sd * 62 - 18} ${n2(RAILY - 31)} h36" stroke="${sd > 0 ? "#8A3A06" : BAGL}" stroke-width="10" stroke-linecap="round"/>`).join("") : "";
  const bag = `<g transform="translate(${n2(bx)} ${n2(by)}) rotate(${n2(rot)}) scale(${S} ${n2(S * sq)})">${bag13({ strapR: hung ? "none" : "new", strapL: hung ? "none" : "ok", zip: zo, open: zo, books: nb, lit, id: "lb" })}</g>`;
  const hsL = hung ? (lit === "straps" ? `<g filter="url(#glowS)">${hs}</g>` : lit ? `<g filter="url(#dimF)">${hs}</g>` : hs) : "";
  let fly = "", stack = ""; [0, 1, 2, 3, 4].forEach((i) => { const ti = tb + .1 + i * .22, u = clamp((t - (ti - .22)) / .22); if (t >= ti) return; if (u <= 0) { stack += TF(400 + (i % 2) * 8, TY - (4 - i) * 19, 1.25, bookFlat(i)); return; }
    const x = lerp(400, P0[0], eio(u)), y = lerp(TY - 50, TY - 176 * S - 60, eio(u)) - 90 * Math.sin(Math.PI * u); fly += TF(x, y, 1.0, bookC(i), 20 * (1 - u)) + aHand(x + 36, y - 20, 160, .9); });
  const zp = qbz(ZA[0], ZA[1], ZA[2], 1 - zo * .92), zx = bx + S * zp[0], zy = by + S * zp[1], hv = (a, b) => ramp(t, a, .2) * (1 - ramp(t, b, .25));
  const hands = OP(hv(tz - .3, tz + .6), aHand(zx + 4, zy - 4, 110, .9)) + OP(hv(th - .25, th + .95), aHand(bx - 60 * S, by - 256 * S, 70, .95) + aHand(bx + 60 * S, by - 256 * S, 110, .95))
    + OP(hv(tu[1] - .2, tu[1] + 1.0), aHand(bx - 104 * S, by - 196 * S, 20, .9) + aHand(bx + 104 * S, by - 196 * S, 160, .9)) + OP(hv(tu[2] - .2, tu[2] + .8), aHand(zx + 4, zy - 4, 110, .9))
    + OP(hv(tu[3] - .85, tu[3] + .3), aHand(bx - 60 * S, by - 256 * S, 70, .95) + aHand(bx + 60 * S, by - 256 * S, 110, .95));
  const scene = lcRoom(FY) + lcTable(TY, -20, 480) + `<rect x="450" y="${TY + 26}" width="22" height="${FY - TY - 26}" fill="#8E9AA8"/>` + stack
    + `<ellipse cx="${P2[0]}" cy="${FY + 6}" rx="${n2(190 * ud)}" ry="${n2(12 * ud)}" fill="${P.ink}" opacity=".18" filter="url(#b4)"/>` + TF(CH[0], CH[1], CH[2], chairS()) + bag + hsL + fly + hands + lcHit(P2[0] + 150, FY - 8, pulse(t, tu[3], .02, .35), 26);
  // the labels: BIG, in the free space below the board, each with ONE line to its part (drawn outside the push-in so they stay big)
  const LX = -60, LY = 200; let labs = lcLab(t, th + .75, LX, LY, "to carry books to school", ...M([P1[0] - 100, P1[1] - 140]), { size: 46, t1: tp[0] - .25 });
  PARTN.forEach((p, i) => { labs += lcLab(t, tp[i], LX, LY, p, ...M(PP[p]), { size: 76, t1: (i < 3 ? tp[i + 1] : tp[3] + 2.4) - .2, fill: PARTC[p], ink: "#fff" }); });
  const uses = ["straps · carry the bag", "body · holds the books", "zip · opens and closes", "base · sits on the floor"];
  uses.forEach((w, i) => { labs += lcLab(t, tu[i] + .1, LX - 40, LY + 40, w, ...M(PP[PARTN[i]]), { size: 48, t1: i < 3 ? tu[i + 1] - .2 : tv - .1, fill: PARTC[PARTN[i]], ink: "#fff" }); });
  return `<g transform="${zt}">${scene}</g>` + labs; }
SC.lcbag = (t, s) => { const ge = eio((t - s.t0) / 1.0), tv = MK("v_bag"), tp = PARTN.map((p) => MK("p_" + p)), tu = PARTN.map((p) => MK("u_" + p));
  return lookCloser(t, s, { tz: s.t0, fx: BGX, fy: 660, art: bagArt2, set: (tt) => V(tt, { bag: "new" }, CAMB), verdict: [...VSTYLE("ONE BAG · FOUR PARTS · FOUR USES", "sun").slice(0, 2), { ...(VSTYLE("ONE BAG · FOUR PARTS · FOUR USES", "sun")[2] || {}), vx: 1110 }], tv,
    top: (tt) => brdAt(tt, L3(BIGB, HOME, ge), {}) + peek(tt, "basil", s.t0 + 1.4, s.t1 + 1, poses([s.t0, "arms_crossed"], [MK("booksin"), "sit"], [MK("hang") + .1, "surprised"], [tp[0] - .1, "cheer"], [tp[2] - .1, "surprised"], [tp[3] + .4, "sit"], [MK("kw_intended_use") - .1, "surprised"], [tu[0], "cheer"], [tu[3] + .1, "surprised"], [tv, "cheer"]),
      { nods: [[tp[1] + .1, 1.0, 5], [tp[3] + .2, 1.0, 5], [tu[1] + .2, 1.0, 5], [tu[2] + .2, 1.0, 5], [tv + .1, 1.6, 6]] }) }); };

/* ============ 9 · HOLD ON! Pip big at the right (his own idea). In the classroom the four fabric tiles hop to the last box; then the countdown takes the
   stage: the classroom clears to the blue starry stage, the ring BIG with the bag and its three clues ON the frame, only Pip reacting; then back ============ */
const HR = [700, 480, 1.25];
SC.holdon = (t, s) => { const a = "g901", b = "g902", c = "g903", r0 = MK("ring0_hold"), bell = MK("bell_hold"), tX = W(b, "cross") - .15, tH = W(b, "hold") - .1, tOne = W(c, "one") - .1, tS0 = LT(b) - .05, tS1 = W(c, "one") + .55;
  const st = ss(tS0, tS0 + .7, t) * (1 - ss(tS1, tS1 + .7, t));
  const room = st < .999 ? V(t, { bag: "full", board: {}, boardP: HOME }) : "";
  const pic = `<circle r="172" fill="#FFF8EA"/>` + TF(0, 92, .72, bag13({ strapR: "new", tag: false, id: "ho" }) + [[-150, -200, -128, -150], [150, -90, 70, -90], [-150, -150, -70, -166], [150, -20, 96, -22]].map(([a, b, c, d]) => `<path d="M${a} ${b} L${c} ${d}" stroke="${P.ink}" stroke-width="7" stroke-linecap="round"/><circle cx="${a}" cy="${b}" r="12" fill="${P.ink}"/>`).join(""))
    + (t >= bell ? TF(0, 10, .62 * spring(t, bell, .35), crossedArms()) : "");
  const ringOn = t >= tX && t < tS1 + .4, ka = spring(t, tX, .4) * (1 - ss(tS1, tS1 + .4, t));
  let stage = "";
  if (ringOn) stage += TF(HR[0], HR[1], ka, `<g transform="translate(${-HR[0]} ${-HR[1]})">${bigRing(t, HR[0], HR[1], HR[2], r0, 5, pic)}</g>`)
    + OP(ka, clue(t, tX + .2, HR[0] - 260, HR[1] - 180, "four parts") + clue(t, tX + .35, HR[0], HR[1] - 290, "four uses") + clue(t, tX + .5, HR[0] + 290, HR[1] - 180, "one material?")
      + youPill(HR[0] - 330, HR[1] + 250, 1.2) + TF(HR[0], HR[1] + 370, 1, tpill(0, 0, "cross your arms", 46, P.ink, "#fff")));
  // Pip: proud, then hopeful (leans in, rocking on the beat), sheepish when the class crosses its arms, then a good-sport smile
  const lean = t >= r0 && t < bell ? -5 + 4 * Math.sin((t - r0) * Math.PI * 2) : 0, pj = []; for (let i = 0; i < 5; i++) pj.push([r0 + i, 14]);
  const pip = bud("pip", "R2", 450, t, { in: s.t0 + .05, poses: poses([s.t0, "cheer"], [LT(a) + .1, "sit"], [LE(a) + .15, "pointing"], [tS0 + .2, "cheer"], [tX + .3, "thinking"], [r0, "cheer"], [bell, "oops"], [W(c, "each") - .12, "surprised"], [LE(c) - 1.6, "waving"], [LE(c) + .2, "sit"]), look: lean + nodAt(t, LE(c) - 1.5, 1.4, 5), jump: pj, nohop: t >= r0 && t < bell, wave: true });
  return (room ? OP(1 - st, room) : "") + OP(st, bg("stage") + `<rect y="820" width="1920" height="260" fill="url(#xFloor)"/>`) + stage + pip
    + say(a, 1300, 330, t, { size: 44, tail: -80, maxW: 560 })
    + stampHold(t, tH, tH + .85, HR[0], HR[1], "HOLD ON!") + stampHold(t, bell, bell + 1.1, HR[0], HR[1] + 60, "ARMS CROSSED!", 96) + bellIcon(t, r0, 1160, 260) + coin(t, tOne, 1660, 470, "+1", "arms crossed") + HUD(t); };
SC.wetfloor = (t, s) => { const tw_ = MK("wetpic"), [px, pd] = slideX(t, tw_, .55, -600, 640, 1040);
  return VD(t, { bag: "full", board: {}, boardP: HOME }, undefined, .45) + (t >= tw_ ? pd + TF(px, 1040, 1.05, easelS(TF(0, 0, .96, wetFloorPic(t)), 470, 330)) : "")
    + bud("pip", "R2", 420, t, { poses: poses([s.t0, "sit"], [LT("g904") + .3, "surprised"], [LE("g904"), "oops"]) })
    + bud("basil", "R1", 420, t, { in: s.t0 + .05, poses: poses([s.t0, "surprised"], [LT("g904") + .6, "sit"], [LE("g904") + .1, "pointing"]) }) + say("g904", 1420, 470, t, { size: 42, tail: 160, maxW: 520 }) + HUD(t); };

/* ============ 10 · draw it: the paper slides onto the table, DRAW IT glows; the camera goes to the paper; [LOOK CLOSER] the drawing ============ */
SC.draw = (t, s) => { const u = eo((t - MK("paper")) / .5), cam = camL(CAM0, CAMP, eio((t - (s.t1 - 1.3)) / 1.3));
  return V(t, { bag: "full", paper: lerp(PX + 500, PX, u), board: {}, boardP: HOME }, cam) + OP(1 - eio((t - (s.t1 - 1.3)) / 1.0), bud("basil", "R1", 400, t, { poses: poses([s.t0, "sit"], [MK("paper") + .2, "pointing"], [MK("glow4"), "cheer"]) }) + bud("pip", "R2", 400, t, { poses: poses([s.t0, "oops"], [MK("paper") + .4, "thinking"], [MK("glow4") + .3, "cheer"]) })) + HUD(t); };
SC.lcdraw = (t, s) => { const g0 = eio((t - (s.t0 + .2)) / .9), g1 = eio((t - (s.t1 - .85)) / .8), p = L3(L3(HOME, DOCK, g0), HOME, g1), tv = MK("v_draw");
  return lookCloser(t, s, { tz: s.t0, fx: PX, fy: 760, art: drawArt, set: (tt) => V(tt, { bag: "full", paper: PX, bfly: false }, CAMP), verdict: [`OUR DESIGN: A SUITABLE MATERIAL FOR EACH PART`, GOODC, { vx: 1030 }], tv,
    over: (tt) => lcClock(tt, MK("pencil"), MK("fill4"), 1540, 880),
    top: (tt) => brdAt(tt, p, g0 > .5 && g1 < .5 ? { small: true } : {}) + peek(tt, "pip", s.t0 + 1.5, tv - .2, poses([s.t0, "thinking"], [MK("drop1") + .1, "surprised"], [MK("drop2") + .1, "surprised"], [MK("wpchip"), "cheer"], [MK("zc2"), "pointing"], [MK("zipchip"), "cheer"], [MK("fabhop2"), "thinking"], [MK("strongchip2"), "cheer"]),
      { h: 500, dx: 170, side: 1, nods: [[MK("wpchip") + .1, 1, 5], [MK("zipchip") + .1, 1, 5], [MK("strongchip2") + .1, 1, 5]] }) }); };
SC.pipfix = (t, s) => V(t, { bag: "full", easel: true, board: {}, boardP: HOME }, camL(CAMP, CAM0, eo((t - s.t0) / .7)))
  + bud("pip", "R2", 440, t, { in: s.t0 + .1, poses: poses([s.t0, "surprised"], [HAS("g1006") ? LT("g1006") + .5 : s.t0 + 1, "sit"], [HAS("g1006") ? LE("g1006") + .2 : s.t0 + 1.2, "cheer"]), jump: [[HAS("g1006") ? LE("g1006") + .25 : s.t0 + 1.3, 20]] })
  + bud("basil", "R1", 380, t, { poses: poses([s.t0, "sit"], [LT("g1006") + .8, "surprised"], [LE("g1006") + .2, "cheer"]), look: nodAt(t, LE("g1006") + .3, 1.2, 5) })
  + (HAS("g1006") ? say("g1006", 1040, 420, t, { size: 44, tail: 120, maxW: 520 }) : "") + HUD(t);

/* ============ 11 · Mark Sentence 2 (Pip); under the card: the finished drawing and the three samples, each named ============ */
const named = (x, y, s, art, txt) => TF(x, y, s, art) + T(x, y + 70, txt, 30, "#fff", { w: 600 });
SC.mark2 = (t, s) => markScene(t, s, { id: "g1102", sayId: "g1101", who: "pip", n: "2 of 2", text: "The materials are selected for the different functions of the parts based on their physical properties.", keys: ["different", "functions", "parts", "physical", "properties."], size: 62, y: 230, footer: FOOT,
  extra: (t >= s.t0 + .6 ? TF(1150, 800, spring(t, s.t0 + .6, .4), tpill(0, 0, "function = the job of a part", 34, "#FFF8EA", P.ink, { w: 700 })) : "")
    + TF(800, 960, .36, drawingPic({ mat: MATALL, words: false, cc: true })) + named(1030, 945, .7, sampleTile("fabric"), "fabric") + named(1180, 945, .7, sampleTile("plastic"), "plastic") + named(1370, 945, .6, zipShort(0), "metal zip") });

/* ============ 12 · BE A BOOK: the glide into the bag (the buddies come along: see shrink.js) ============ */
const TBAG = [BGX, TY - 150];
SC.waitw = (t, s) => { const L = "g1201", dive = ei((t - (s.t1 - 1.5)) / 1.5), e = eio((t - s.t0) / 1.2), m = Math.max(e * .5, dive), cam = [1 + .22 * e + 3.8 * dive, lerp(960, TBAG[0], m), lerp(540, TBAG[1], m)], tP = W(L, "be") - .2;
  return V(t, { bag: "open", items: TF(BGX, TY, .85, bag13({ strapR: "new", zip: 1, open: 1, books: 5, id: "wj" })), easel: true, board: {}, boardP: HOME }, cam)
    + OP(1 - dive * 1.6, bud("pip", "R2", 420, t, { poses: [[s.t0, "sit"], [tP, "cheer"]] }) + bud("basil", "R1", 400, t, { poses: [[s.t0, "sit"], [tP + .15, "surprised"], [tP + 1.2, "cheer"]] })
      + (t >= tP ? TF(1400, 300, spring(t, tP, .45), tpill(0, 0, "Be a book!", 80, P.sun, P.ink, { w: 700 })) : "") + HUD(t)) + wipe(t, s.t1, CREAM, 960, 540); };

/* ============ 13 · pull back out; the score hand; the butterfly's reveal (a push-in into its black-ringed circle on the stage, then Momo's fun fact) ============ */
SC.pullout = (t, s) => V(t, { bag: "full", easel: true, board: {}, boardP: HOME }, camL([4.6, TBAG[0], TBAG[1]], CAM0, eo((t - s.t0) / .6))) + wipe(t, s.t0, CREAM) + HUD(t);
SC.final = (t, s) => { const L = "g1301", thi = W(L, "high") - .05, tips = [[s.t0, null, 1], [W(L, "two") - .1, null, 2]], hi = pulse(t, thi + .25, .12, .6); let nf = 1; for (const [tt, , n] of tips) if (t >= tt && n) nf = n;
  let out = bg("stage") + `<g transform="translate(960 ${n2(lerp(-200, 200, eo((t - s.t0) / .35)))})">${scoreboard(t, 0, 0, 1.6, { you: "?", bud: 0 })}</g>`
    + TF(960, 760 - 60 * hi, 1.85 * spring(t, s.t0 + .25, .5) * (1 + .1 * hi), `<g filter="url(#drop)">${countHand(nf)}</g>`) + youPill(960, 430, 1.3)
    + OP(hi, `<g stroke="${P.sun}" stroke-width="12" stroke-linecap="round">${[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => { const an = -Math.PI * (.05 + i * .1125), r1 = 300 + 60 * (1 - hi), r2 = r1 + 80; return `<path d="M${n2(960 + Math.cos(an) * r1)} ${n2(640 + Math.sin(an) * r1)} L${n2(960 + Math.cos(an) * r2)} ${n2(640 + Math.sin(an) * r2)}"/>`; }).join("")}</g>`)
    + (t >= thi ? TF(1420, 480, spring(t, thi, .4), tpill(0, 0, "HIGH FIVE!", 56, P.sun, P.ink, { w: 700, ls: 4 })) : "");
  [["pip", 300, false, 420], ["basil", 1290, true, 340], ["momo", 1690, true, 390]].forEach(([w, x, fl, h], i) => { out += buddy(w, x, 1062, h, t, { aura: true, flip: fl, poses: [[s.t0, "sit"], [W(L, "beat") - .1, "cheer"], [W(L, "beat") + 1.2, "sit"], [thi - .15, "cheer"]], jump: [[thi + .05, 90]] }); });
  return out + logo(t); };
const LZ = { T: [560, 380], r: 230, Z: 3.6 };
// the fun fact's picture: a magnifier on the butterfly's wing: tiny scales like roof tiles, and a drop of water rolling off
function wingScales(t, t0, tw0, x, y, r = 170) { const k = t < t0 ? 0 : spring(t, t0, .45); if (k < .02) return ""; let sc = "";
  for (let j = 0; j < 9; j++) for (let i = 0; i < 9; i++) { const sx = -r + i * 44 + (j % 2) * 22, sy = -r + j * 40; sc += `<path d="M${sx - 20} ${sy} Q${sx - 20} ${sy + 34} ${sx} ${sy + 38} Q${sx + 20} ${sy + 34} ${sx + 20} ${sy}z" fill="${(i + j) % 3 ? "#F59E0B" : "#FBBF24"}" stroke="#92400E" stroke-width="3"/>`; }
  const u = t < tw0 ? -1 : (t - tw0) / 1.6, dx = u < 0 ? -40 : lerp(-40, 120, eio(u)), dy = u < 0 ? -40 : lerp(-40, 140, ei(u));
  return TF(x, y, k, `<clipPath id="wsc"><circle r="${r}"/></clipPath><g filter="url(#drop)"><circle r="${r + 12}" fill="#fff"/></g><g clip-path="url(#wsc)"><rect x="${-r}" y="${-r}" width="${2 * r}" height="${2 * r}" fill="#B45309"/>${sc}${u >= 0 && u < 1.1 ? TF(dx, dy, 1.6, waterDrop(16)) : ""}</g><circle r="${r}" fill="none" stroke="${P.ink}" stroke-width="12"/><path d="M${n2(r * .72)} ${n2(r * .72)} L${n2(r * 1.3)} ${n2(r * 1.3)}" stroke="#5E3F28" stroke-width="26" stroke-linecap="round"/>`)
    + (t >= t0 + .3 ? TF(x, y - r - 56, spring(t, t0 + .3, .4), tpill(0, 0, "tiny scales", 44, "#fff", P.ink, { w: 700 })) : "") + (t >= tw0 + .4 ? TF(x + r + 200, y - 60, spring(t, tw0 + .4, .4), tpill(0, 0, "water rolls off", 44, GOODC, "#fff", { w: 700 })) : ""); }
SC.liz = (t, s) => { const L = "g1302", F = "g1303", E = "g1304", tq = W(L, "it") - .1, tR = W(L, HIDDEN[0]) + .1, tz = s.t0 + .35, u = eio((t - tz) / 1.3), kc = clamp((t - (tz + 1.05)) / .6), f0 = 1 - clamp((t - s.t0) / .45), uf = t - (s.t0 + 1.6);
  const world = V(t, { bag: "full", easel: true, board: {}, boardP: HOME, bfly: { open: uf > 0 && uf < 1.6 ? .5 + .5 * Math.sin(uf * 22) : (uf >= 1.6 ? 1 : undefined), up: 60 * (uf > 0 && uf < 1.6 ? Math.sin(Math.PI * clamp(uf / 1.6)) : 0) } });
  const ringK = t < tR ? 0 : spring(t, tR, .5), tF = LT(F), tT = W(E, "tell") - .1;
  let out = circleShot(world, u, [BFLY[0], BFLY[1] - 16], LZ.T, LZ.Z, LZ.r, kc, "z") + (ringK > .02 ? `<circle cx="${LZ.T[0]}" cy="${LZ.T[1]}" r="${n2((120 + 8 * Math.sin(t * 6)) * ringK)}" fill="none" stroke="${P.sun}" stroke-width="12"/>` + popSpark(t, tR, LZ.T[0], LZ.T[1], 150) : "");
  out += (t >= tq ? OP(1 - ramp(t, tT - .4, .3), TF(LZ.T[0], 668, spring(t, tq, .45), `<g filter="url(#drop)"><rect x="${n2(-tw("It was on the plant by the window!", 54, 700) / 2 - 56)}" y="-58" width="${n2(tw("It was on the plant by the window!", 54, 700) + 112)}" height="116" rx="58" fill="${P.ink}"/></g>${T(0, 19, "It was on the plant by the window!", 54, "#fff")}`)) : "");
  out += wingScales(t, MK("ffscales") - .1, MK("ffwater"), 1130, 380) + (t >= tF - .1 ? pline(LZ.T[0] + 60, LZ.T[1] - 10, 966, 380, ramp(t, MK("ffscales"), .25)) : "");
  out += bud("momo", "R1", 420, t, { in: tF - .5, poses: poses([tF - .5, "surprised"], [tF + .4, "sit"], [LE(F) + .1, "cheer"], [tT, "pointing"]), jump: [[MK("ffwater") - .1, 24]] }) + say(F, 1130, 870, t, { size: 40, tail: 280, maxW: 620 });
  out += (t >= tT ? TF(LZ.T[0], 668, spring(t, tT, .45), tpill(0, 0, "Tell someone at home!", 60, P.sun, P.ink, { w: 700 })) : "");
  return (f0 > .01 ? out + OP(f0, SC.final(SCN.final.t1 - .04, SCN.final)) : out) + logo(t); };

/* ============ the key-word read-along: the buddies 1.5x, along the bottom right, mouthing along ============ */
SC.kwrecap = (t, s) => { const ids = KWLINE, us = KWLINE.map((k) => "u" + k.slice(1)), tw_ = LT("h864");
  let turn = -1; us.forEach((u, i) => { if (t >= LT(u) - .2 && t < LE(u) + .45) turn = i; });
  let out = bg("stage2") + OP(ramp(t, s.t0 + .2, .3) * (1 - ramp(t, LT(ids[0]) - .3, .3)), T(960, 190, "Let’s read today’s key words together!", 70, "#fff", { w: 600 })) + OP(ramp(t, LT(ids[0]) - .3, .3), T(960, 170, "KEY WORDS", 54, P.sun, { ls: 10 }));
  out += TF(330, 480, 1, youPill(0, 0, 1.3) + `<g transform="translate(0 130) scale(${n2(1 + (turn >= 0 ? .12 + .05 * Math.sin(t * 10) : 0))})" opacity="${turn >= 0 ? 1 : .35}"><g filter="url(#dropS)"><rect x="-110" y="-64" width="220" height="128" rx="50" fill="#fff"/><path d="M-30 60 L-56 108 L16 62z" fill="#fff"/></g>${[-52, 0, 52].map((x, i) => `<circle cx="${x}" cy="${n2(turn >= 0 ? -8 * Math.abs(Math.sin(t * 7 + i)) : 0)}" r="15" fill="${P.ink}"/>`).join("")}</g>` + (turn >= 0 ? TF(0, 300, spring(t, LT(us[turn]) - .2, .3), tpill(0, 0, "Say it!", 44, P.coral, "#fff", { w: 700 })) : ""));
  const hops = us.map((u) => [LT(u) - .15, 22]);
  [["pip", 1610, 570, 250], ["basil", 1700, 1066, 290], ["momo", 290, 1066, 250]].forEach(([w, x, y, h], i) => { out += buddy(w, x, y, h, t, { aura: true, flip: i < 2, in: s.t0 + .15 + i * .08, tag: false, poses: [[s.t0, "sit"], [tw_, "cheer"]], jump: [...hops, [tw_, 40]] }); });
  if (t >= tw_) out += TF(330, 300, spring(t, tw_, .45), `<g transform="rotate(-4)"><g filter="url(#drop)"><rect x="-230" y="-64" width="460" height="128" rx="64" fill="url(#gSun)"/></g>${T(0, 24, "Well done!", 70, P.ink)}</g>`);
  return out + HUD(t); };

/* ============ 14 · the cliffhanger: the camera goes to THEN: TEST IT beside the board, then to the new strap with its big ? ============ */
SC.cliff = (t, s) => { const tP = W("g1403", "part") - .1, tc = MK("testcard"), tq = MK("q"), c1 = eio((t - tc) / 1.0) * (1 - eio((t - (tq - .2)) / 1.0)), c2 = eio((t - (tq - .2)) / 1.0) * (1 - eio((t - (tP - .6)) / .8));
  const cam = [1 + .55 * c1 + .35 * c2, lerp(960, 900, c1) + (c2 > 0 ? (BGX - 960) * c2 : 0), lerp(540, 380, c1) + (c2 > 0 ? (620 - 540) * c2 : 0)];
  return V(t, { items: easelOn(PX) + bagUp({}, BGX) + qMark(t, tq, BGX, 520), board: {}, boardP: HOME }, cam)
    + bud("basil", "R1", 420, t, { in: s.t0 + .1, poses: poses([s.t0, "cheer"], [LT("g1401") - .12, "sit"], [LT("g1402"), "surprised"], [LE("g1402") - 1.2, "thinking"], [LE("g1402"), "sit"], [tP, "cheer"]), look: nodAt(t, W("g1402", "test") + .1, 1.2, 5) })
    + say("g1401", 1420, 470, t, { size: 42, tail: 160, maxW: 480 }) + (t >= tP ? slamFit(330, "PART 2", P.sun, slamK(t - tP, 0)) : "") + HUD(t); };
SC.nyk = (t, s) => nykScene(t, s, TF(790, 1045, .3, planBoard(t)), { bx: [290, 1640, 1275], hx: 790, bh: 400 });
})(); }
