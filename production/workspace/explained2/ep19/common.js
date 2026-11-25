// common.js: the scenes both parts share (EP1's approved routines, adapted for EP3): the HUD, round cards, the countdown, the goals, the
// three-choice lock-in, Mark Sentence cards, the chant (call and response), the score hand, the key-word read-along, "Now you know!".
window.SC = window.SC || {};
const HUD = (t, o = {}) => window._noHud ? "" : (o.logo === false ? "" : logo(t)) + (o.score === false ? "" : scoreboard(t));
const dayCounter = (t, day, tflip = -9, x = 60, y = 110, s = .8) => counter(t, day, tflip, x, y, s, { nodots: true });
// a plain caption for the book's own words: a cream strip, the words appear as Heart says them. off = index of the first word in the line
function bookCaption(t, id, text, y = 150, o = {}) { const L = TL.lines[id], size = o.size || 52, toks = text.split(" "), fam = "Atkinson Hyperlegible", sp = tw(" ", size, 700, fam), total = tw(text, size, 700, fam), off = o.off || 0, x0 = (o.x || 960) - total / 2;
  const t0 = L.words[off].a - .3, t1 = o.t1 === undefined ? 1e9 : o.t1, a0 = ramp(t, t0, .3) * (1 - ramp(t, t1, .25)); if (a0 <= 0) return ""; let tx = "", cx = 0;
  toks.forEach((w, i) => { const wt = L.words[off + i].a, a = ramp(t, wt - .05, .15); if (a > 0 && (o.keys || []).includes(norm(w))) tx += `<rect x="${n2(x0 + cx - 5)}" y="${n2(y - size * .08)}" width="${n2(eo((t - wt) / .35) * (tw(w, size, 700, fam) + 10))}" height="${n2(size * .5)}" rx="6" fill="#FFD75A"/>`; if (a > 0) tx += `<text x="${n2(x0 + cx)}" y="${y + size * .34}" font-family="${fam}" font-weight="700" font-size="${size}" fill="${P.ink}" opacity="${n2(a)}">${esc(w)}</text>`; cx += tw(w, size, 700, fam) + sp; });
  return OP(a0, `<g filter="url(#dropS)"><rect x="${n2(x0 - 44)}" y="${n2(y - size * .82)}" width="${n2(total + 88)}" height="${n2(size * 1.64)}" rx="20" fill="url(#gPaper)"/><rect x="${n2(x0 - 44)}" y="${n2(y - size * .82)}" width="14" height="${n2(size * 1.64)}" rx="7" fill="${P.sun}"/></g>` + tx); }
// small print (always fully inside the frame)
const finePrint = (t, t0, txt, x = 960, y = 1030) => OP(ramp(t, t0, .4), `<g transform="translate(${x} ${y})"><rect x="${n2(-tw(txt, 28, 500) / 2 - 30)}" y="-28" width="${n2(tw(txt, 28, 500) + 60)}" height="56" rx="20" fill="${P.ink}" opacity=".85"/>${T(0, 10, txt, 28, "#fff", { w: 500 })}</g>`);
// a thought bubble (a cloud with two little circles), origin = its centre
function thought(t, t0, t1, x, y, txt, o = {}) { if (t < t0 || t > t1 + .25) return ""; const k = spring(t, t0, .4) * (1 - eo((t - t1) / .2)), size = o.size || 64, w = tw(txt, size, 700) + 110, dir = o.dir || 1;
  return TF(x, y, k, `<g filter="url(#dropS)"><rect x="${n2(-w / 2)}" y="-62" width="${n2(w)}" height="124" rx="62" fill="#FFF8EA" stroke="${o.col || P.momo}" stroke-width="7"/><circle cx="${n2(dir * (w / 2 - 40))}" cy="84" r="17" fill="#FFF8EA" stroke="${o.col || P.momo}" stroke-width="6"/><circle cx="${n2(dir * (w / 2 - 10))}" cy="118" r="10" fill="#FFF8EA" stroke="${o.col || P.momo}" stroke-width="5"/></g>${T(0, n2(size * .34), txt, size, o.ink || P.ink)}`); }

/* ============ round cards, the countdown ============ */
function roundCard(t, s, a, b, col = P.sun) { const u = t - s.t0, k = lerp(2.3, 1, eo(u / .16)) + .05 * wob(u, .16, .4), bs = b && tw(b, 64, 700, "Fredoka", 8) > 1500 ? 48 : 64, RW = Math.max(tw(a, 200, 700, "Fredoka", 10), b ? tw(b, bs, 700, "Fredoka", 8) : 0) + 160;   // EP9: the card is as wide as its longer line ("YOUR ANSWER FROM LAST TIME")
  return bg("stage") + `<circle cx="960" cy="540" r="${n2(360 + 500 * eo(u / .7))}" fill="none" stroke="${col}" stroke-width="${n2(24 * (1 - eo(u / .7)))}"/><g transform="translate(960 540) scale(${n2(k)}) rotate(-4)"><g filter="url(#drop)"><rect x="${-RW / 2}" y="-150" width="${RW}" height="${b ? 380 : 300}" rx="60" fill="${col}"/></g>${T(0, 70, a, 200, P.ink, { ls: 10 })}${b ? T(0, 180, b, bs, P.ink, { ls: 8 }) : ""}</g>` + HUD(t); }
SC.r1card = (t, s) => roundCard(t, s, "ROUND 1");
SC.r0card = (t, s) => roundCard(t, s, "ROUND ZERO", "WARM-UP");
SC.r2card = (t, s) => roundCard(t, s, "ROUND 2");
SC.listcard = (t, s) => roundCard(t, s, "BASIL’S RULE", null, "#9FEADD");
SC.showcard = (t, s) => roundCard(t, s, "SHOWDOWN", "DOUBLE POINTS", P.sun);
SC.count = (t, s) => { const L = "h501", ws = [["Are you ready?", LT(L), 150, "#fff"], ["3", W(L, "three"), 520, P.sun], ["2", W(L, "two"), 520, P.sun], ["1", W(L, "one"), 520, P.sun], ["GO!", W(L, "go"), 460, "#fff"]];
  let cur = 0; ws.forEach((w, i) => { if (t >= w[1] - .03) cur = i; }); const [txt, t0, size, col] = ws[cur], k = lerp(2.2, 1, eo((t - t0 + .03) / .16)) + .05 * wob(t, t0 + .13, .4), ringR = 300 + 500 * eo((t - t0) / .6);
  const jumps = ws.slice(1).map((w) => [w[1] - .18, 60]);
  return bg("stage") + (cur ? `<circle cx="960" cy="470" r="${n2(ringR)}" fill="none" stroke="${col}" stroke-width="${n2(22 * (1 - eo((t - t0) / .6)))}" opacity=".8"/><circle cx="960" cy="470" r="330" fill="${P.night}" opacity=".5"/>` : "")
    + `<g transform="translate(960 ${cur ? 470 : 430}) scale(${n2(k)})"><g transform="translate(0 ${size * .05})" opacity=".8">${T(0, size * .35, txt, size, P.ink, { ls: cur ? 0 : 4 })}</g>${T(0, size * .35 - 6, txt, size, col, { ls: cur ? 0 : 4 })}</g>`
    + buddy("pip", 250, 1076, 420, t, { jump: jumps }) + buddy("basil", 1290, 1076, 420, t, { flip: true, jump: jumps }) + buddy("momo", 1680, 1076, 420, t, { flip: true, jump: jumps }) + HUD(t); };

/* ============ today's goals: a buddy READS the three cards aloud, word for word (teacher, 2026-11-21, SERIES_FORMAT section 11 step 3).
   The three cards drop in at the start; the title lights as "Today you'll learn" is said; each card lifts and glows while it is read.
   ids = [title line, card 1, card 2, card 3]; who = the reader (lip-sync on the sit sprites, a small hop to each card) ============ */
function goals3(t, s, goals, ids, who = "pip") { const cols = ["gBlue", "gPurple", "gOrange"], cues = [0, 1, 2].map((i) => ids ? LT(ids[i + 1]) : s.t0 + .4 + i * 1.22), ends = [0, 1, 2].map((i) => ids ? LE(ids[i + 1]) : cues[i] + 1.1);
  const tT = ids ? LT(ids[0]) : s.t0, tl = ids ? pulse(t, tT, .05, 1.0) : 0;
  let out = bg("stage2") + OP(ramp(t, s.t0 + .1, .3), TF(1190, 190, 1 + .06 * tl, T(0, 20, "Today you’ll learn", 76, tl > .3 ? P.sun : "#fff", { w: 600 })));
  goals.forEach(([g, ic], i) => { const tin = ids ? s.t0 + .25 + i * .14 : cues[i] - .12, k = spring(t, tin, .5); if (k < .02) return; const lit = ids ? ss(cues[i] - .12, cues[i] + .08, t) * (1 - ss(ends[i] + .1, ends[i] + .35, t)) : pulse(t, cues[i], .05, 1.3);
    const x = 690 + i * 500, y = 600 + (1 - eo((t - tin) / .3)) * -220 - 30 * lit, ls = wrap(g, 46, 450, 700), read = ids ? (t >= ends[i] + .1 ? 1 : 0) : 0;
    out += TF(x, y, k * .88 * (1 + .07 * lit), `<g transform="rotate(${[-2, 1.5, -1.5][i]})">${lit > .05 ? `<rect x="-270" y="-205" width="540" height="430" rx="58" fill="${P.sun}" opacity="${n2(.9 * lit)}" filter="url(#b10)"/>` : ""}<g filter="url(#drop)"><rect x="-255" y="-190" width="510" height="400" rx="46" fill="url(#gPaper)"/><rect x="-255" y="-190" width="510" height="150" rx="46" fill="url(#${cols[i]})"/><rect x="-255" y="-90" width="510" height="50" fill="url(#${cols[i]})"/></g><g transform="translate(0 -112)">${ic}</g>${ls.map((l, j) => T(0, 66 + j * 56 - (ls.length - 1) * 22, l, 46, P.ink)).join("")}${read ? TF(214, -150, spring(t, ends[i] + .1, .35), tickBadge(26)) : ""}</g>`); });
  const hops = ids ? cues.map((c) => [c - .2, 22]) : [];
  if (ids && window._SAID) ids.forEach((id) => { window._SAID[id] = 1; });
  return out + buddy(who, 240, 1076, 540, t, { in: s.t0 + .2, poses: [[s.t0, "sit"]], jump: hops, nohop: true }) + HUD(t); }

/* ============ the lock-in (fingers 1, 2, 3), v3 (teacher, 22 Nov: "the countdown takes the stage"; "I no longer see the animation on the
   countdown, nor the interactive pet buddies' reactions"; "one set of big numbered choice cards").
   During the question and the countdown: the blue starry stage only; the ring and its picture BIG and central (R 215, about half the frame
   height); the clue labels large (58 px, cap height about 41 px) on top of the ring's frame; ONE set of big picture cards along the bottom,
   each with its number badge; the YOU hand on the right bobbing and counting 1-2-3 in step with the ticks; ONE big buddy on the left leaning
   in, fidgeting, then hand-to-head as the last second runs out, gasping at the bell. The ring pulses on every tick, drains one step a second
   ON the tick, the number pops as it changes, the bell lands on 0, LOCKED IN! slams in. Then the stage makes room: the ring and cards glide
   up and shrink, the other two buddies pop in, each flips its pick as it speaks and swaps pose on its reveal (cheer, groan, shrug).
   c: { cards: [label], pics: [svg at the card's picture centre], clues: [[text, t0]], q, tq, tc: [t per card], ring0, dur, lock, obj(t) (drawn
        for the old ring centre (430, 470)), picks: [{who, id, word, x, fixed}], lead (the countdown buddy), ans + tAns, react, score } ============ */
function choiceCard3(n, label, pic, o = {}) { const w = o.w || 320, h = o.h || 330, lit = o.lit || 0, pl = o.pulse || 0, ph = h - 92;
  return `<ellipse cx="0" cy="${h / 2 + 14}" rx="${w * .44}" ry="12" fill="${P.ink}" opacity=".3" filter="url(#b4)"/><g transform="scale(${n2(1 + .05 * pl + .06 * Math.min(1, lit))})">${lit > .02 ? `<rect x="${-w / 2 - 16}" y="${-h / 2 - 16}" width="${w + 32}" height="${h + 32}" rx="44" fill="${o.glow || P.sun}" opacity="${n2(.9 * Math.min(1, lit))}" filter="url(#b10)"/>` : ""}
    <g filter="url(#drop)"><rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="34" fill="url(#gPaper)" stroke="${pl > .3 || lit > .5 ? P.sun : "#E3C9A8"}" stroke-width="8"/></g>
    <clipPath id="cc3${n}${o.id || ""}"><rect x="${-w / 2 + 12}" y="${-h / 2 + 12}" width="${w - 24}" height="${ph - 6}" rx="24"/></clipPath><rect x="${-w / 2 + 12}" y="${-h / 2 + 12}" width="${w - 24}" height="${ph - 6}" rx="24" fill="${o.picBg || "#F3EAD8"}"/>
    <g clip-path="url(#cc3${n}${o.id || ""})"><g transform="translate(0 ${n2(-h / 2 + 6 + ph / 2)})">${pic || ""}</g></g>${T(0, h / 2 - 30, label, o.size || 46, P.ink)}
    <g transform="translate(${-w / 2 + 6} ${-h / 2 + 6})" filter="url(#dropS)"><circle r="${o.br || 46}" fill="url(#gSun)" stroke="${P.ink}" stroke-width="6"/>${T(0, n2((o.br || 46) * .42), n, n2((o.br || 46) * 1.2), P.ink)}</g>
    ${lit > .5 ? TF(w / 2 - 22, -h / 2 + 22, spring(lit, .5, .5), tickBadge(36)) : ""}${o.tag || ""}</g>`; }
// a clue label: large, dark on white, wrapped to two lines when long (cap height about 41 px at 58 px)
function clue3(x, y, txt, k, size = 58, maxW = 560) { if (k < .02) return ""; const ls = wrap(txt, size, maxW, 700), w = Math.max(...ls.map((l) => tw(l, size, 700))) + size * 1.1, h = ls.length * size * 1.12 + size * .62;
  return TF(x, y, k, `<g filter="url(#dropS)"><rect x="${n2(-w / 2)}" y="${n2(-h / 2)}" width="${n2(w)}" height="${n2(h)}" rx="${n2(Math.min(h / 2, size * .8))}" fill="#fff" stroke="${P.ink}" stroke-width="5"/></g>` + ls.map((l, j) => T(0, n2((j - (ls.length - 1) / 2) * size * 1.12 + size * .35), l, size, P.ink)).join("")); }
function lockN(t, c) { const n = c.cards.length, bell = c.ring0 + c.dur, tS = LT(c.lock) - .08, picks = c.picks, tb0 = Math.min(...picks.filter((p) => p.id).map((p) => LT(p.id))) - .5, rs = ringState(t, c.ring0, c.dur);
  const zb = ss(tb0 - .4, tb0 + .3, t), gs = lerp(1, .55, zb), shut = pulse(t, bell, .01, .6), RX = 960, CY = 395, RR = 215, inT = t >= c.ring0 && t < bell, b = Math.floor(t - c.ring0);
  const CW = n === 2 ? 400 : 370, CX = n === 2 ? [880, 1320] : [730, 1115, 1500], CYC = 905;
  let main = "";
  c.cards.forEach((txt, i) => { const k = spring(t, c.tc[i] - .08, .45); if (k < .02) return; const turn = inT && ((b % n) === i) ? 1 : 0, said = pulse(t, c.tc[i], .04, .5), lit = c.ans === i + 1 && c.tAns !== undefined && t >= c.tAns ? spring(t, c.tAns, .45) : 0;
    main += TF(CX[i], CYC - 30 * (1 - Math.min(1, k)), k, choiceCard3(i + 1, txt, c.pics ? c.pics[i] : "", { w: CW, h: 330, size: c.csize || 40, pulse: Math.max(turn * (.5 + rs.tick), said), lit, id: "l" })); });
  const rk = spring(t, c.t0 !== undefined ? c.t0 + .15 : Math.min(c.tq, c.ring0) - .2, .5), tp = inT ? rs.tick : 0;
  main += TF(RX, CY, rk * (1 + .035 * tp), `<g transform="translate(${-RX} ${-CY})">` + ringTimer(RX, CY, t < bell ? rs.frac : 0, t < bell ? rs.secs : 0, t, { R: RR, sw: 34, tick: rs.tick, shut, chg: inT || (t >= bell && t < bell + .5) ? (t >= bell ? bell : rs.chg) : -9, ns: 1.25,
    inner: `<clipPath id="lkRingC"><circle cx="${RX}" cy="${CY}" r="${RR - 24}"/></clipPath><circle cx="${RX}" cy="${CY}" r="${RR - 24}" fill="url(#mSky)"/><g clip-path="url(#lkRingC)"><g transform="translate(${RX} ${CY}) scale(1.1) translate(-430 -470)">${c.obj(t)}</g></g>` })   /* 24 Nov: the picture is clipped to the ring's inner circle (its own disc, r 190 x 1.1, used to spill under the track) */ + `</g>`);
  if (shut > .05) main += `<circle cx="${RX}" cy="${CY}" r="${n2(RR + 40 + 90 * (1 - shut))}" fill="none" stroke="${P.sun}" stroke-width="8" opacity="${n2(shut * .8)}"/>`;
  // clue labels ON TOP of the ring's frame, kept through the countdown and after it
  const CP = [[420, 270, -1, -.6], [1500, 270, 1, -.6], [400, 540, -1, .35], [1520, 540, 1, .35]]; (c.clues || []).forEach(([txt, t0], i) => { const [cx, cy, sd, ay] = CP[i]; if (t >= t0) main += pline(cx - sd * 170, cy, RX + sd * RR * Math.sqrt(1 - ay * ay), CY + ay * RR, ramp(t, t0, .2)) + clue3(cx, cy, txt, spring(t, t0, .4), 54, 520); });
  const top = OP(ramp(t, c.tq, .3) * (1 - zb), T(900, 84, c.q, c.q.length > 32 ? 46 : 54, "#fff", { w: 600 })) + OP(ramp(t, c.ring0 - .15, .2) * (1 - zb) * (t < bell ? .75 + .25 * Math.sin(t * 9) : 1), T(960, 150, "LOCK IT IN!", 40, P.sun, { ls: 8 }));
  // the buddies: ONE big buddy leans in through the countdown; the other two join for the reveal
  const lead = c.lead || picks[0].who, X1 = { pip: 330, basil: 960, momo: 1590 }, tin = Math.min(c.tq, c.ring0) - .1; let buds = "", bubs = "", cards = "";
  ["pip", "basil", "momo"].forEach((who, i) => { const pk = picks.find((p) => p.who === who), isL = who === lead, tf = pk.fixed ? tin : LT(pk.id), uni = pk.id && TL.lines[pk.id].who === "chant", sp = t >= tb0 && speaking(who, t);
    if (!isL && t < tb0 - .3) return; const hh = (isL ? lerp(470, 360, zb) : 360) * (sp && !uni ? 1.06 : 1), x = isL ? lerp(200, X1[who], zb) : X1[who], tIn = isL ? (c.t0 !== undefined ? c.t0 + .3 : tin) : tb0 - .3 + i * .1;
    // EP15 (one job per pose): the lead thinks right after the question, is WORRIED through the countdown, listens after the bell; the
    // others pop in listening. Right / wrong faces come from lib.js OUTCOMES at the reveal, never before it.
    const poses = isL ? [[tIn, "sit"], [c.tq + .8, "thinking"], [c.ring0 - .2, "worried"], [bell + .35, "sit"]] : [[tIn, "sit"]];
    for (const [tt, w2, p2] of c.react || []) if (w2 === who) poses.push([tt, p2]); poses.sort((a, b2) => a[0] - b2[0]);
    const fid = isL && inT ? 1 : 0, lean = isL ? 7 * ss(c.ring0 - .3, c.ring0 + .3, t) * (1 - ss(bell, bell + .3, t)) : 0;
    buds += buddy(who, x, 1062, hh, t, { in: tIn, poses, rock: fid * 2.2, look: lean, jump: isL ? [[bell + .02, 30]] : [] });
    if (t > tIn + .2) cards += pickNum(who, x + hh * (isL ? lerp(.5, .62, zb) : .62), 1062 - hh * (isL ? lerp(.22, .3, zb) : .3), t, pk.fixed ? tIn + .3 : tf - .1, pk.word);
    if (pk.id && !uni) bubs += say(pk.id, x + (i === 0 ? 60 : i === 2 ? -60 : 0), 556 + (Math.max(...sentPages(pk.id).map((p) => wrap(p.text, 42, 600).length)) * 42 * 1.22 + 40) / 2, t, { x: pk.x, tail: i === 0 ? -60 : i === 2 ? 60 : 0, maxW: 600, size: 42 }); });
  // YOU: the counting hand on the right; it shows the choices as Heart says them, then bobs and counts 1-2-3 in step with the ticks
  const nf = inT ? (b % n) + 1 : t >= bell ? null : (n > 2 && t >= c.tc[2] - .1 ? 3 : t >= c.tc[1] - .1 ? 2 : 1), ya = ramp(t, c.tc[0] - .15, .25) * (1 - zb), bob = inT ? 16 * Math.sin((t - c.ring0) * Math.PI * 2) : 6 * Math.sin(t * 3);
  const demo = OP(ya, TF(1775, 800 + bob, 1.05 * (1 + .12 * (inT ? rs.tick : pulse(t, c.tc[Math.max(0, (nf || 1) - 1)], .03, .3))), `<g filter="url(#dropS)">${countHand(nf === null ? 0 : nf)}</g>`) + youPill(1775, 570 + bob * .6, 1.2) + (t < c.ring0 ? tpill(1775, 478 + bob * .6, n === 2 ? "1 or 2 fingers" : "1, 2 or 3 fingers", 30, P.ink, "#fff") : ""));
  return bg("stage") + `<g transform="translate(960 ${n2(lerp(0, -50, zb))}) scale(${n2(gs)}) translate(-960 0)">${main}</g>` + top + demo + buds + cards + bubs + (c.pre ? c.pre(t) : "") + (c.over ? c.over(t) : "")
    + stamp(t, tS, 960, lerp(430, 250, zb)) + bellIcon(t, c.ring0) + HUD(t, { score: c.score !== false }); }

/* ============ Mark Sentence card: the buddy beside it SAYS "Say it with me!", 0.8 s, then the SAME BUDDY reads the whole card aloud, word for word
   (teacher, 2026-11-21: Heart never reads a card). The words light up as the buddy reads them (lip-sync on the sit sprites); the card holds 2.5 s ============ */
function markScene(t, s, o) { const S = TL.lines[o.sayId], R = TL.lines[o.id], ts = S.t, own = R.who === o.who;
  // EP15: the reader POINTS at the card as it lands (showing the sentence), reads it in the talking sprite, then listens (smile)
  const poses = [[s.t0, "sit"], [S.end + .1, "pointing"], [R.t - .12, "sit"], ...(o.poses || [])].sort((a, b) => a[0] - b[0]);   // points at the card in the pause before reading
  const exT = Math.min(1e9, ...TL.order.filter((id) => { const L = TL.lines[id]; return L && L.t >= R.end && L.t < s.t1 && ["pip", "basil", "momo"].includes(L.who) && L.who !== o.who; }).map((id) => TL.lines[id].t)), ck = 1 - .3 * ss(exT - .5, exT - .1, t);   // the card steps back (smaller, up-left) when another buddy speaks after it
  return bg("stage2") + (o.under || "") + `<g transform="translate(620 200) scale(${n2(ck)}) translate(-620 -200)">` + markCard(t, { footer: "P3 · Diversity · Materials", ...o, t0: s.t0 + .1 }) + `</g>` + buddy(o.who, 300, 1076, 560, t, { in: s.t0 + .15, poses, jump: [[ts - .1, 26]], nohop: true, wave: true, achieved: o.achieved })
    + TL.order.filter((id) => { const L = TL.lines[id]; return L && L.t >= s.t0 && L.t < s.t1 && ["pip", "basil", "momo"].includes(L.who) && L.who !== o.who; }).map((id) => { const L = TL.lines[id], ti = L.t - .5;
      return buddy(L.who, 1720, 1076, 420, t, { in: ti, flip: true, poses: [[ti, "sit"]] }) + say(id, 1330, 690, t, { size: 40, tail: 300, maxW: 560 }); }).join("")
    + say(o.sayId, 360, 380, t, { size: 44, tail: -40 }) + ((window._SAID || (window._SAID = {}))[o.id] = 1, "") + (o.extra || "") + HUD(t); }

/* ============ the chant: clap, clap, stomp. Call and response: the buddies chant a line, then one bar for the viewers ("YOUR TURN!"), then all together ============ */
// EP14: EP7's call and answer per line (script segment 11): "Day, night! Round and round!" (the day-and-night ring of CYCLE CHECK flashes),
// "Egg, chick! Round and round!" (the chicken ring), "Change, repeat! That's a cycle!" (the two tick boxes, then the green tag A CYCLE).
// "cycle!" in the green answer colour (the A CYCLE tag's); the rest white. No sun yellow (that is YOU).
const PHR = ["Iron and steel? Magnetic!", "Copper and aluminium? Non-magnetic!", "Do not guess! Test it with a magnet!"], PCOL = { "Magnetic!": "#7FE58F", "Non-magnetic!": "#8FCBFF" };   // EP19 (script.py CHANT): the answers in their colours (magnetic green, non-magnetic blue); line 3 white
function chantState(L, t) { const bar = L.bar, tb = (t - L.t) / bar, S = L.slots, nc = L.ncall; let k = -1; S.forEach(([p, b], i) => { if (tb >= b) k = i; });
  const inSlot = k >= 0 && tb < S[k][1] + 1, turn = k >= 0 && k < nc && !inSlot && tb < (S[k + 1] ? S[k + 1][1] : L.nbars) && tb < L.nbars, together = k >= nc;
  return { k, ph: k >= 0 ? S[k][0] : -1, inSlot, turn, together, tb, t0: k >= 0 ? L.t + S[k][1] * bar : L.t }; }
// every beat of the chant: [time, "c" | "s", soft]. Two claps and a stomp per bar; soft under the viewers' bars
function chantBeats(L) { const out = [], resp = new Set(); L.slots.forEach(([p, b], i) => { if (i < L.ncall) resp.add(b + 1); });
  for (let b = 0; b < L.nbars; b++) { const t0 = L.t + b * L.bar, soft = resp.has(b) ? 1 : 0; out.push([t0, "c", soft], [t0 + L.bar * .25, "c", soft], [t0 + L.bar * .5, "s", soft]); } return out; }
function yourTurn(t, L, x, y, sc = 1) { const st = chantState(L, t), beats = chantBeats(L); let clap = 0; if (st.turn) for (const [bt, k] of beats) if (k === "c") clap = Math.max(clap, pulse(t, bt, .04, .16));
  const tt = st.turn ? L.t + (L.slots[st.k][1] + 1) * L.bar : -9, kk = st.turn ? spring(t, tt, .3) * (1 - ss(tt + L.bar - .2, tt + L.bar, t)) : 0, gap = 70 - 56 * clap;
  return TF(x, y, sc, `<g opacity="${st.turn || st.together ? 1 : .55}"><g transform="translate(${n2(-gap)} 0) rotate(${n2(-12 + 10 * clap)})" filter="url(#dropS)"><g transform="scale(.62)">${countHand(5)}</g></g><g transform="translate(${n2(gap)} 0) scale(-1 1) rotate(${n2(-12 + 10 * clap)})" filter="url(#dropS)"><g transform="scale(.62)">${countHand(5)}</g></g></g>`
    + youPill(0, -150, .95) + (kk > .02 ? TF(0, -250, kk * (1 + .06 * Math.sin(t * 9)), `<g transform="rotate(-4)"><g filter="url(#drop)"><rect x="-190" y="-46" width="380" height="92" rx="46" fill="${P.coral}"/><rect x="-182" y="-38" width="364" height="76" rx="38" fill="none" stroke="#fff" stroke-width="5"/></g>${T(0, 18, "YOUR TURN!", 50, "#fff", { ls: 3 })}</g>`) : "")); }
function chantLines(t, L, o = {}) { const bar = L.bar, st = chantState(L, t); let lines = "";
  const y0 = o.y0 || 330, dy = o.dy || 150, size = o.size || 84, done = new Set(); L.slots.forEach(([p, b], i) => { if (i <= st.k) done.add(p); });
  PHR.forEach((ph, i) => { const ws = ph.split(" "), total = ws.reduce((a, w) => a + tw(w, size, 700, "Fredoka", 2) + size * .3, -size * .3), active = st.ph === i && (st.inSlot || st.turn);
    const sc = 1 + .08 * pulse(t, st.ph === i ? st.t0 : -9, .04, .5) + (active && st.turn ? .04 + .03 * Math.sin((t - L.t) / bar * Math.PI * 4) : 0); let cx = -total / 2, tx = "";
    const slotW = L.words.filter((w) => w.slot === st.k);
    ws.forEach((w, j) => { const lit = done.has(i) && (st.ph !== i || !st.inSlot || t >= slotW[j].a - .03), ww = tw(w, size, 700, "Fredoka", 2), col = PCOL[w], wt = st.ph === i && slotW[j] ? slotW[j].a : -9;
      tx += `<text x="${n2(cx)}" y="0" font-family="Fredoka" font-weight="700" font-size="${size}" letter-spacing="2" fill="${lit && col ? col : "#fff"}" opacity="${lit ? (active || st.k < 0 ? 1 : .85) : .28}" ${lit && col ? `transform="translate(${n2(cx + ww / 2)} 0) scale(${n2(1 + .14 * pulse(t, wt, .03, .35))}) translate(${n2(-cx - ww / 2)} 0)"` : ""}>${esc(w)}</text>`; cx += ww + size * .3; });
    lines += `<g transform="translate(${o.x || 960} ${y0 + i * dy}) scale(${n2(sc)})">${active && st.turn ? `<rect x="${n2(-total / 2 - 30)}" y="${n2(-size * .82)}" width="${n2(total + 60)}" height="${n2(size * 1.12)}" rx="${n2(size * .3)}" fill="${P.sun}" opacity=".16"/>` : ""}${tx}</g>`; });
  return lines + (st.together && st.tb < L.nbars ? TF(o.x || 960, y0 - 120, spring(t, L.t + L.slots[L.ncall][1] * bar, .4), tpill(0, 0, "All together!", 40, P.sun, P.ink, { w: 700 })) : ""); }
// EP14: what flashes now on the board CYCLE CHECK: [the day-and-night ring (line 1), the chicken ring (line 2), the two boxes + A CYCLE (line 3)], on each word of that line's call and answer
function chantFlash(t, L) { const f = [0, 0, 0]; for (const w of L.words) { const i = w.slot; if (i >= 0 && i < 3) f[i] = Math.max(f[i], pulse(t, w.a, .03, .35)); } return f; }
function chantScene(t, s, id, o = {}) { const L = TL.lines[id], beats = chantBeats(L); let fx = "", clap = 0, stomp = 0; for (const [bt, k, soft] of beats) { const g = soft ? .45 : 1; if (k === "c") clap = Math.max(clap, pulse(t, bt, .03, .18) * g); else stomp = Math.max(stomp, pulse(t, bt, .03, .25) * g); }
  const jumps = beats.filter((b) => b[1] === "s" && !b[2]).map((b) => [b[0] - .2, 30]), by = 1066, bh = o.bh || 270, xs = o.xs || [620, 990, 1360], tin = s.t0 + .15;
  let buds = ""; ["pip", "basil", "momo"].forEach((w, i) => { const sq = 1 - .05 * clap; buds += `<g transform="translate(${xs[i]} ${by}) scale(${n2(1 / sq)} ${n2(sq)}) translate(${-xs[i]} ${-by})">${buddy(w, xs[i], by, bh, t, { in: tin + i * .08, jump: t >= L.t ? jumps : [], poses: [[s.t0, "sit"]] })}</g>`;
    fx += OP(clap, `<g stroke="${P.sun}" stroke-width="7" stroke-linecap="round"><path d="M${xs[i] - bh * .5} ${by - bh * .8} l-26 -22 M${xs[i] + bh * .5} ${by - bh * .8} l26 -22 M${xs[i]} ${by - bh * 1.08} v-30"/></g>`) + OP(stomp, `<ellipse cx="${xs[i]}" cy="${by}" rx="${n2(bh * (.5 + .4 * (1 - stomp)))}" ry="${n2(22 + 16 * (1 - stomp))}" fill="none" stroke="#fff" stroke-width="6"/>`); });
  // EP14: the board CYCLE CHECK (its two closed rings) stands behind them, centred and big enough to read; each line's part flashes on its call. o.board(t, flash) -> svg
  const board = o.board ? o.board(t, chantFlash(t, L)) : "";
  return bg("stage2") + board + chantLines(t, L, { x: o.x || 900, y0: o.y0 || 330, dy: o.dy || 150, size: o.size || 58 }) + (o.head || "") + buds + fx + yourTurn(t, L, o.tx || 1730, o.ty || 700, o.ts || .95) + say(o.sayId || "u1002", o.sayX || 960, o.sayY || 640, t, { size: 52, col: P.basil, tail: 0, merge: true }) + HUD(t); }

/* ============ the score hand ============ */
function finalScene(t, s, L, bud, tips, extra = "") { // tips: [[time, text, big]]; the last one is HIGH FIVE
  const thi = W(L, "high") - .05, hi = pulse(t, thi + .25, .12, .6); let nf = 1; for (const [tt, , n] of tips) if (t >= tt && n) nf = n;
  let tip = ""; tips.forEach(([tt, txt], i) => { const t1 = tips[i + 1] ? tips[i + 1][0] : 1e9; if (txt && t >= tt && t < t1) tip = TF(1350, 480, spring(t, tt, .4), tpill(0, 0, txt, 40, P.sun, P.ink, { w: 700 })); });
  let out = bg("stage") + `<g transform="translate(960 ${n2(lerp(-200, 200, eo((t - s.t0) / .35)))})">${scoreboard(t, 0, 0, 1.6, { you: "?", bud })}</g>`
    + TF(960, 760 - 60 * hi, 1.85 * spring(t, s.t0 + .25, .5) * (1 + .1 * hi), `<g filter="url(#drop)">${countHand(nf)}</g>`) + youPill(960, 430, 1.3)
    + OP(hi, `<g stroke="${P.sun}" stroke-width="12" stroke-linecap="round">${[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => { const an = -Math.PI * (.05 + i * .1125), r1 = 300 + 60 * (1 - hi), r2 = r1 + 80; return `<path d="M${n2(960 + Math.cos(an) * r1)} ${n2(640 + Math.sin(an) * r1)} L${n2(960 + Math.cos(an) * r2)} ${n2(640 + Math.sin(an) * r2)}"/>`; }).join("")}</g>`)
    + tip + (t >= thi ? TF(1350, 480, spring(t, thi, .4), tpill(0, 0, "HIGH FIVE!", 52, P.sun, P.ink, { w: 700, ls: 4 })) : "") + extra;
  [["pip", 250, false], ["basil", 1330, true], ["momo", 1720, true]].forEach(([w, x, fl], i) => { out += buddy(w, x, 1076, 430, t, { flip: fl, poses: [[s.t0, "sit"], [thi - .15, "cheer"]], jump: [[thi + .05, 90]] }); });   // EP15: one size at one depth
  return out + logo(t); }

/* ============ the key-word read-along: the shelf comes to the centre, big; Heart says each word, then it is YOUR turn ============ */
SC.kwrecap = (t, s) => { const ids = KWLINE, us = KWLINE.map((k) => "u" + k.slice(1)), tw_ = LT("h864");
  let turn = -1; us.forEach((u, i) => { if (t >= LT(u) - .2 && t < LE(u) + .45) turn = i; });
  let out = bg("stage2") + OP(ramp(t, s.t0 + .2, .3) * (1 - ramp(t, LT(ids[0]) - .3, .3)), T(960, 190, "Let’s read today’s key words together!", 70, "#fff", { w: 600 }))
    + OP(ramp(t, LT(ids[0]) - .3, .3), T(960, 170, "KEY WORDS", 54, P.sun, { ls: 10 }));
  out += TF(400, 470, 1, youPill(0, 0, 1.3) + `<g transform="translate(0 130) scale(${n2(1 + (turn >= 0 ? .12 + .05 * Math.sin(t * 10) : 0))})" opacity="${turn >= 0 ? 1 : .35}"><g filter="url(#dropS)"><rect x="-110" y="-64" width="220" height="128" rx="50" fill="#fff"/><path d="M-30 60 L-56 108 L16 62z" fill="#fff"/></g>${[-52, 0, 52].map((x, i) => `<circle cx="${x}" cy="${n2(turn >= 0 ? -8 * Math.abs(Math.sin(t * 7 + i)) : 0)}" r="15" fill="${P.ink}"/>`).join("")}</g>`
    + (turn >= 0 ? TF(0, 300, spring(t, LT(us[turn]) - .2, .3), tpill(0, 0, "Say it!", 44, P.coral, "#fff", { w: 700 })) : ""));
  [["pip", 165, 1076], ["basil", 1555, 1076], ["momo", 1778, 1076]].forEach(([w, x, y], i) => { out += buddy(w, x, y, 335, t, { flip: w !== "pip", in: s.t0 + .15 + i * .08, tag: false, poses: [[s.t0, "sit"]], jump: [[tw_, 40]] }); });   // EP15: "Well done!" gets a hop; the hands-up cheer is kept for "Now you know!"
  if (t >= tw_) out += TF(330, 900, spring(t, tw_, .45), `<g transform="rotate(-4)"><g filter="url(#drop)"><rect x="-230" y="-64" width="460" height="128" rx="64" fill="url(#gSun)"/></g>${T(0, 24, "Well done!", 70, P.ink)}</g>`);
  return out + HUD(t); };

/* ============ "Now you know!": exactly EP1's ending (notes 14-16). Behind the buddies: the hotel as it stands at the end of this part ============ */
function nykScene(t, s, prop, o = {}) { const BX = o.bx || [300, 1650, 1275], HX = o.hx || 530; const U = "u1300", L = "h1305", tN = LT(L), tOne = LT("h1304o"), tTwo = LT("h1304t"), tR = LT("h1304a");
  const t0 = Math.floor(TL.lines[L].know * 30 + 1e-6) / 30, k = lerp(2.6, 1, eo((t - t0) / .16)) + .07 * wob(t, t0 + .16, .5), on = t >= t0;
  let rays = ""; for (let i = 0; i < 18; i++) { const a = i * 20 + (t - s.t0) * 9; rays += `<path d="M960 520 L${n2(960 + Math.cos(a * Math.PI / 180) * 1600)} ${n2(520 + Math.sin(a * Math.PI / 180) * 1600)} L${n2(960 + Math.cos((a + 9) * Math.PI / 180) * 1600)} ${n2(520 + Math.sin((a + 9) * Math.PI / 180) * 1600)}z" fill="#FFE27A" opacity=".5"/>`; }
  let out = `<rect width="1920" height="1080" fill="url(#gSun)"/>${rays}<circle cx="960" cy="520" r="420" fill="#FFF3B8" opacity=".7" filter="url(#b60)"/>` + prop;
  const loop = []; for (let j = 0; j < 9; j++) loop.push([t0 + 1.0 + j * .62, 34]);
  /* teacher, 2026-11-25 ("Wrong gestures for 'now you know'"): the scene's own poses win here. keepPose: the chants "Say it with us!" and
     "Now you know!" (who "chant": every buddy "speaks" them) no longer force the talking sprite over the cheer, and no OUTCOMES pose or the
     learnAt check applies; noreact: no reaction to Heart's "Ready? One! two!". Before the words: happy and expectant (Pip and Basil sit and
     smile, lip-syncing the chant; Momo WAVES, because every one of her sit/talking paintings has her arms crossed and her open mouth reads as
     shocked). ON "Now you know!" all three cheer, arms up, happy, to the end. */
  [["pip", BX[0], false], ["basil", BX[1], true], ["momo", BX[2], true]].forEach(([w, x, fl], i) => { out += buddy(w, x, 1066, o.bh || 420, t, { flip: fl, in: s.t0 + .05 + i * .06, poses: [[s.t0, w === "momo" ? "waving" : "sit"], [t0, "cheer"]], keepPose: true, noreact: true, wave: true, nohop: true, jump: [[tOne - .16, 26], [tTwo - .16, 26], [t0 - .02, 90], ...loop.map(([a, b]) => [a + i * .1, b])] }); });
  out += say(U, 960, o.sayY || 430, t, { size: 60, col: P.basil, tail: 0, merge: true });
  const cnt = t >= tTwo ? "2" : t >= tOne ? "1" : t >= tR ? "Ready?" : ""; if (cnt && t < tN - .04) { const tc = cnt === "2" ? tTwo : cnt === "1" ? tOne : tR; out += TF(960, 300, lerp(1.8, 1, eo((t - tc) / .14)), `<text x="0" y="60" font-family="Fredoka" font-weight="700" font-size="${cnt.length > 1 ? 150 : 230}" text-anchor="middle" fill="#fff" stroke="${P.ink}" stroke-width="26" stroke-linejoin="round" paint-order="stroke">${cnt}</text>`); }
  // YOU: the viewer's two hands, up and cheering, with their tag (no orphan labels: the tag stands with the hands it names)
  { const hu = on ? 26 * Math.abs(Math.sin((t - t0) * 5)) * clamp(1.6 - (t - t0) * .3) : 0; out += OP(ramp(t, LT(U), .3), [-1, 1].map((sd) => `<g transform="translate(${HX + sd * 62} ${n2(640 - hu)}) scale(${sd * .5} .5) rotate(${-10})" filter="url(#dropS)">${countHand(5)}</g>`).join("") + youPill(HX, 520 - hu, 1.0)
    + (on ? OP(pulse(t, t0, .02, 1.4), `<g stroke="#fff" stroke-width="9" stroke-linecap="round"><path d="M${HX - 100} 520 l-40 -22 M${HX + 100} 520 l40 -22 M${HX} 470 v-36"/></g>`) : "")); }
  if (!on && t >= tN - .03) { const y2 = W(L, "you"); out += TF(960, 300, 1, `<text x="0" y="50" font-family="Fredoka" font-weight="700" font-size="150" text-anchor="middle" letter-spacing="4" fill="#fff" stroke="${P.ink}" stroke-width="26" stroke-linejoin="round" paint-order="stroke">Now${t >= y2 ? " you" : ""}…</text>`); }
  if (on) { out += `<g transform="translate(960 300) scale(${n2(k * (1 + .015 * Math.sin((t - t0) * 3)))}) rotate(-3)"><text x="0" y="50" font-family="Fredoka" font-weight="700" font-size="190" text-anchor="middle" letter-spacing="4" fill="#fff" stroke="${P.ink}" stroke-width="30" stroke-linejoin="round" paint-order="stroke" filter="url(#drop)">Now you know!</text><text x="0" y="50" font-family="Fredoka" font-weight="700" font-size="190" text-anchor="middle" letter-spacing="4" fill="#fff">Now you know!</text></g>`;
    { const u = t - t0, cols = [P.coral, P.aqua, P.purple, "#fff", P.pink, P.leaf, P.blue]; for (let i = 0; i < 70; i++) { const an = hash(i, 11) * Math.PI * 2, sp = 500 + hash(i, 13) * 900, x = 960 + Math.cos(an) * sp * (1 - Math.exp(-u * 2.2)) * .9, y = 320 + Math.sin(an) * sp * (1 - Math.exp(-u * 2.2)) * .55 + 240 * u * u, o = clamp(1.6 - u * .45); if (o <= 0 || y > 1100) continue;
      out += `<rect x="-11" y="-6" width="22" height="12" rx="3" fill="${cols[i % 7]}" opacity="${n2(Math.min(1, o))}" transform="translate(${n2(x)} ${n2(y)}) rotate(${n2(hash(i, 17) * 360 + u * (200 + hash(i, 19) * 500))})"/>`; }
      if (u < .5) out += `<circle cx="960" cy="320" r="${n2(200 + 1500 * eo(u / .5))}" fill="none" stroke="#fff" stroke-width="${n2(26 * (1 - u / .5))}" opacity="${n2(1 - u / .5)}"/>`; }
    for (let i = 0; i < 22; i++) { const life = 1.1 + hash(i, 3) * .8, v = (((t - t0) + hash(i, 5) * 3) % life) / life, x = 120 + hash(i, 7) * 1680, y = 120 + hash(i, 9) * 560 + 50 * v; out += `<g transform="translate(${n2(x)} ${n2(y)}) scale(${n2((.5 + hash(i, 2) * .7) * Math.sin(Math.PI * v))}) rotate(${n2(90 * v + 20 * i)})"><path d="M0-32 Q4-4 32 0 Q4 4 0 32 Q-4 4 -32 0 Q-4-4 0-32z" fill="#fff"/></g>`; } }
  return out + logo(t); }
/* ============ the hidden animal, revealed: a replay of its shot with a ring around it ============ */
/* teacher, 22 Nov 2026 ("the transition to be from the real scene, directly zoom into the animal, then the other objects pop out ... no
   unnecessary cutting of scene"): the hidden-animal moments stay in the REAL place. pushCam = one smooth push-in that carries the world point
   (ax, ay) to the screen point (tx, ty) at zoom Z; spotDim = the rest of the picture softly dimmed round the animal (nothing is cut away);
   popSpark = the small sparkle of a pop. */
const pushCam = (inner, u, ax, ay, tx, ty, Z) => `<g transform="translate(${n2(lerp(ax, tx, u))} ${n2(lerp(ay, ty, u))}) scale(${n2(lerp(1, Z, u) * 1000) / 1000}) translate(${-ax} ${-ay})">${inner}</g>`;
const spotDim = (k, x, y, r0 = 250, r1 = 900, a = .74) => k <= .01 ? "" : `<radialGradient id="spotDimG" gradientUnits="userSpaceOnUse" cx="${n2(x)}" cy="${n2(y)}" r="${r1}"><stop offset="${n2(r0 / r1)}" stop-color="${P.night}" stop-opacity="0"/><stop offset="1" stop-color="${P.night}" stop-opacity="${a}"/></radialGradient><rect width="1920" height="1080" fill="url(#spotDimG)" opacity="${n2(Math.min(1, k))}"/>`;
const popSpark = (t, t0, x, y, r = 90) => { const u = (t - t0) / .5; if (u <= 0 || u >= 1) return ""; let g = ""; for (let i = 0; i < 6; i++) { const a = (i * 60 + 20) * Math.PI / 180, d = r * (.55 + .65 * eo(u)); g += TF(x + Math.cos(a) * d, y + Math.sin(a) * d, (1 - u) * (i % 2 ? 1.2 : .8), `<path d="M0 -14 L4 -4 L14 0 L4 4 L0 14 L-4 4 L-14 0 L-4 -4z" fill="#fff"/>`); } return g; };
// the name label that stands by the REAL animal (it replaces the picture-in-a-circle badge): a pill with a little tail pointing down at it
const animalLabel = (t, t0, x, y, size = 44) => t < t0 ? "" : TF(x, y, spring(t, t0, .5), `<g filter="url(#dropS)"><path d="M-16 ${n2(size * .7)} L0 ${n2(size * 1.25)} L16 ${n2(size * .7)}z" fill="${P.ink}"/></g>` + tpill(0, 0, "a little " + (HIDDEN[2] || HIDDEN[0]), size, P.ink, "#fff", { w: 700 })) + popSpark(t, t0, x, y, 150);
/* v3 (teacher, 22 Nov, on EP12 v2): after the smooth push-in lands, the animal sits in a CIRCLE with a thick BLACK ring and everything outside
   the circle turns into the blue-violet game stage (stars, the soft spotlight beam); the iris closes in over .5 s. k 0..1 */
function iris(k, x, y, r, id = "irM") { if (k <= .005) return ""; const R = lerp(1500, r, eio(k));
  return `<mask id="${id}" maskUnits="userSpaceOnUse" x="0" y="0" width="1920" height="1080"><rect width="1920" height="1080" fill="#fff"/><circle cx="${n2(x)}" cy="${n2(y)}" r="${n2(R)}" fill="#000"/></mask><g mask="url(#${id})">${bg("stage")}</g>`
    + `<circle cx="${n2(x)}" cy="${n2(y)}" r="${n2(R + 9)}" fill="none" stroke="${P.ink}" stroke-width="22"/><circle cx="${n2(x)}" cy="${n2(y)}" r="${n2(R + 19)}" fill="none" stroke="#120E2E" stroke-width="4" opacity=".6"/>`; }
/* the reveal: the picture melts from the score hand into the real place (o.from = the last frame of the scene before, no jump cut), the camera
   pushes in on the animal, and the ring pops round it on its name */
function lizReveal(t, s, L, view, lx, ly, tq, qtext, dx = 60, dy = 130, rr = 88, zmax = 1.7, o = {}) { const LT_ = TL.lines[o.tell || L] ? (o.tell || L) : L, tTell = W(LT_, "tell") - .1, u = eio((t - s.t0 - .2) / 1.3), tR = W(L, HIDDEN[0]) + .1, kr = t < tR ? 0 : spring(t, tR, .5), fade = 1 - clamp((t - s.t0) / .45);
  // v3: the camera pushes the animal to (ix, iy); the iris closes round it (black ring, the game stage outside), then the ring pops on its name
  const ix = o.ix || 520, iy = o.iy || 420, ir = o.ir || 210, ki = clamp((t - (s.t0 + 1.5)) / .5);
  let out = pushCam(view, u, lx, ly, ix, iy, zmax) + iris(ki, ix, iy, ir, "irL")
    + (kr ? `<circle cx="${ix}" cy="${iy}" r="${n2((ir - 26 + 6 * Math.sin(t * 6)) * kr)}" fill="none" stroke="${P.sun}" stroke-width="10"/>` + popSpark(t, tR, ix, iy, ir * 1.1) : "");
  out += t >= tq ? TF(o.qx || 960, o.qy || 850, spring(t, tq, .45), `<g filter="url(#drop)"><rect x="${n2(-tw(qtext, 54, 700) / 2 - 56)}" y="-56" width="${n2(tw(qtext, 54, 700) + 112)}" height="112" rx="56" fill="${P.ink}"/></g>${T(0, 19, qtext, 54, "#fff")}`) : "";
  if (o.fact) out += typeof o.fact === "function" ? o.fact(t) : funFact(t, o.fact);
  out += t >= tTell ? TF(o.tx || 960, o.ty || 975, spring(t, tTell, .45) * (1 + .04 * pulse(t, tTell + .3, .05, .6)), tpill(0, 0, "Tell someone at home!", 48, P.sun, P.ink, { w: 700 })) : "";
  return out + (fade > .01 && o.from ? meltFrom(t, s, o.from, fade) : "") + logo(t); }
/* the reveal's fun fact (SERIES_FORMAT 4, teacher 22 Nov): a labelled picture panel that opens on the buddy's "fun" (mark ff_in) and
   fills one labelled picture per mark. Stage 1: a PLACEHOLDER (cream panel, a box per picture naming what to draw, its label); Stage 2
   draws the pictures (keep the marks and labels). f = { id, at: [x, y], w, h, items: [[mark, label, "DRAW: ..."], ...] } */
function funFact(t, f) { const L = TL.lines[f.id], t0 = MK("ff_in") - .1; if (!L || t < t0 - .4 || t > L.end + 1.6) return ""; const k = spring(t, t0, .45) * (1 - ss(L.end + 1.2, L.end + 1.5, t));
  const n = f.items.length, w = f.w || 780, h = f.h || 560, gap = 24, bw = (w - 60 - gap * (n - 1)) / n, bh = 330, cols = f.cols || ["#E8A23A", "#5B6BD6", "#2FA35A"];
  let g = `<g filter="url(#drop)"><rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="34" fill="url(#gPaper)" stroke="#E3C9A8" stroke-width="7"/></g>` + TF(-w / 2 + 150, -h / 2, 1, tpill(0, 0, "FUN FACT!", 40, P[L.who], "#fff", { w: 700, ls: 3 }));
  f.items.forEach(([mk, lab, pic], i) => { const x = -w / 2 + 30 + i * (bw + gap) + bw / 2, a = (typeof mk === "number" ? mk : MK(mk)) - .1; if (t < a) return; const q = spring(t, a, .4), id = "ff" + PART + i, col = cols[i % cols.length];
    g += TF(x, -10, q, `<clipPath id="${id}"><rect x="${n2(-bw / 2)}" y="${-bh / 2}" width="${n2(bw)}" height="${bh}" rx="24"/></clipPath><g clip-path="url(#${id})">${pic(t, bw, bh)}</g><rect x="${n2(-bw / 2)}" y="${-bh / 2}" width="${n2(bw)}" height="${bh}" rx="24" fill="none" stroke="${col}" stroke-width="7"/>`
      + `<path d="M0 ${bh / 2} V${bh / 2 + 26}" stroke="${col}" stroke-width="6"/>` + tpill(0, bh / 2 + 60, lab, n > 2 ? 32 : 36, col, "#fff", { w: 700 }));
    const aP = i > 0 ? (typeof f.items[i - 1][0] === "number" ? f.items[i - 1][0] : MK(f.items[i - 1][0])) - .1 : 0; if (i > 0 && f.arrows !== false && t >= aP) g += OP(spring(t, Math.max(a, aP), .4), `<path d="M${n2(x - bw / 2 - gap + 2)} -10 l${gap - 4} 0" stroke="${P.ink}" stroke-width="5"/><path d="M${n2(x - bw / 2 - 8)} -20 l8 10 l-8 10" fill="none" stroke="${P.ink}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>`); });
  const fx = f.at ? f.at[0] : 1130, fy = f.at ? f.at[1] : 430;
  return TF(fx, fy, k, g) + popSpark(t, t0, fx - w / 2 + 150, fy - h / 2, 140)
    + say(f.id, f.sx || 1360, f.sy || 830, t, { size: 38, maxW: 470, tail: 280 }) + buddy(L.who, 1745, 1076, 430, t, { in: t0 - .3, poses: f.poses || [[t0 - .3, "sit"]], flip: true, nohop: true }); }
/* the fun-fact pictures (the reveal panels): each draws inside (-w/2..w/2, -h/2..h/2) */
const ffSky = (w, h, night) => `<rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" fill="${night ? "#141B48" : "#8FD0F6"}"/>` + (night ? [...Array(14)].map((_, i) => `<circle cx="${n2((hash(i, 3) - .5) * w)}" cy="${n2((hash(i, 5) - .5) * h * .8)}" r="${n2(2 + 2 * hash(i, 7))}" fill="#fff" opacity=".85"/>`).join("") + `<circle cx="${n2(w * .3)}" cy="${n2(-h * .3)}" r="30" fill="#FFF3C4"/><circle cx="${n2(w * .3 + 14)}" cy="${n2(-h * .3 - 8)}" r="26" fill="#141B48"/>`
  : `<circle cx="${n2(w * .34)}" cy="${n2(-h * .34)}" r="34" fill="#FFD75A"/><circle cx="${n2(w * .34)}" cy="${n2(-h * .34)}" r="48" fill="#FFD75A" opacity=".3"/>`);
const ffBranch = (w) => `<path d="M${-w / 2 - 10} 92 Q0 70 ${w / 2 + 10} 82" stroke="#7A5226" stroke-width="24" fill="none" stroke-linecap="round"/><path d="M-60 80 q-20 -30 -50 -34 q30 -8 52 22z M70 78 q22 -26 52 -26 q-26 14 -46 30z" fill="#58B56C" stroke="#2F8048" stroke-width="3"/>`;
const ffOwlDay = (t, w, h) => ffSky(w, h, false) + ffBranch(w) + TF(-10, 82, 1.35, owlArt(t, {}));
const ffOwlNight = (t, w, h) => ffSky(w, h, true) + ffBranch(w) + TF(-10, 82, 1.35, owlArt(t, { open: 1, look: 3 * Math.sin(t * 2) }));
const ffLeaf = (w, h) => `<rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" fill="#DFF3D2"/><path d="M${-w / 2 - 20} 120 Q-40 -40 ${w / 2 + 30} -60 Q60 110 ${-w / 2 - 20} 120z" fill="#6CC36E" stroke="#2F8048" stroke-width="5"/><path d="M${-w / 2} 112 Q0 40 ${w / 2} -50" stroke="#2F8048" stroke-width="4" fill="none"/>`;
const ffLarva = (t, w, h) => { const wig = 6 * Math.sin(t * 5); let seg = ""; for (let i = 0; i < 7; i++) { const x = -80 + i * 24, y = 20 + wig * Math.sin(i * .9 + t * 5) * .4, r = 18 - Math.abs(i - 2) * 1.2;
    seg += `<ellipse cx="${x}" cy="${n2(y)}" rx="${n2(r)}" ry="${n2(r * .9)}" fill="#3B3550" stroke="#1E1A2E" stroke-width="3"/>` + `<path d="M${x - 6} ${n2(y - r + 2)} l3 -12 l3 12 M${x + 4} ${n2(y - r + 3)} l3 -10 l3 10" fill="#1E1A2E" stroke="#1E1A2E" stroke-width="2" stroke-linejoin="round"/>` + (i === 2 || i === 3 ? `<circle cx="${x}" cy="${n2(y - 3)}" r="5" fill="#F28A2E"/>` : ""); }
  const legs = [-38, -16, 6].map((x, i) => `<path d="M${x} 34 l-6 ${n2(14 + 3 * Math.sin(t * 12 + i))}" stroke="#1E1A2E" stroke-width="4" stroke-linecap="round"/>`).join("");
  return ffLeaf(w, h) + `<g transform="rotate(-14)">${legs}${seg}<ellipse cx="-104" cy="14" rx="20" ry="17" fill="#2B2147"/><circle cx="-110" cy="8" r="6" fill="#fff"/><circle cx="-111" cy="8" r="3" fill="#2B2147"/><path d="M-118 22 q6 4 12 0" stroke="#fff" stroke-width="2.5" fill="none" stroke-linecap="round"/></g>`; };
const ffPupa = (t, w, h) => ffLeaf(w, h) + `<g transform="translate(0 14) rotate(-10) scale(${n2(1 + .015 * Math.sin(t * 2))})"><path d="M-62 10 Q-60 -40 -6 -50 Q54 -54 64 0 Q60 40 0 42 Q-50 44 -62 10z" fill="#F2A23A" stroke="#A8611E" stroke-width="5"/><path d="M-30 -40 Q-24 0 -30 40 M8 -50 Q14 0 8 42 M40 -38 Q44 0 40 36" stroke="#A8611E" stroke-width="3" fill="none"/>${[[-14, -18], [24, -24], [-10, 18], [28, 14], [50, -6]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="7" fill="#2B2147"/>`).join("")}<path d="M-62 10 l-26 6" stroke="#3B3550" stroke-width="10" stroke-linecap="round"/></g>`;
const ffLady = (t, w, h) => ffLeaf(w, h) + TF(0, 6, 2.2, ladybird14(t, { walk: true }), -18);


/* ============ the game: You against the Buddies. EP14 trial (teacher, 22 Nov): ONE smooth push-in from the real place onto the hidden animal,
   then the IRIS: the animal in a circle with a thick BLACK ring, the blue-violet starry game stage outside (no dimmed grey scene); FIND first
   (Heart names it, a buddy makes the search fun, big at the right), the buddies in colour (Part 1), THEN the rules: the circle glides and
   shrinks to the upper left, the score pill, the YOU hands and the other buddies pop in. L0 = [find, buddy lines..., rules] ============ */
function gameScene(t, s, L0, full, R) { const LF = L0[0], L = L0[L0.length - 1], LB = L0[1];
  const tLock = W(L, "lock"), tC = W(LF, HIDDEN[0]), tFind = W(LF, "spot"), tRule = LT(L) - .2;
  const tz = s.t0 + .05, dz = 1.1, tP = tz + dz - .1, u = eio((t - tz) / dz), gone = clamp((t - s.t0) / .3), ph = eio((t - tRule) / .9);
  const T0 = R.T || [700, 440], T1 = [330, 320], ax = lerp(T0[0], T1[0], ph), ay = lerp(T0[1], T1[1], ph), zk = lerp(1, .6, ph), ir = (R.ir || 230) * zk;
  let out = pushCam(R.world(t), u, R.A[0], R.A[1], ax, ay, R.Z * zk) + (R.dim0 && u < 1 ? `<rect width="1920" height="1080" fill="${P.night}" opacity="${n2(R.dim0 * (1 - u))}"/>` : "")
    + spotDim(u * (1 - clamp((t - tz - dz) / .5)), ax, ay, 250) + iris(clamp((t - (tz + dz - .05)) / .5), ax, ay, ir, "irG")
    + (gone < 1 && R.pre ? OP(1 - gone, TF(0, 60 * gone, 1, R.pre(t))) : "");
  // the animal's name under its circle, "Can you spot it?" beside it (they slip away when the circle moves to the corner)
  out += OP(1 - ph, animalLabel(t, tC - .1, T0[0], T0[1] + (R.ir || 230) + 70, 48) + (t >= tFind - .1 ? TF(T0[0], T0[1] - (R.ir || 230) - 60, spring(t, tFind - .1, .4), tpill(0, 0, "Can you spot it?", 46, P.ink, P.sun, { w: 700 })) : ""));
  // the score pill glides from its corner to the top centre on the rules
  { const k = eio((t - tRule) / .6); out += scoreboard(t, lerp(1640, 960, k), lerp(70, 150, k), lerp(.62, 1.3, k) + .1 * pulse(t, HAS(L) && full ? W(L, "you") : -9, .02, .3), { you: 0, bud: 0 }); }
  // YOU: the answer hand and the score hand, popping in on the rules
  const tH = Math.max(tRule + .2, tP), youIn = spring(t, tH, .5), tOne = W(L, "one");
  if (youIn > .02) { const nfA = t >= tLock + .7 ? 3 : t >= tLock + .35 ? 2 : t >= tLock ? 1 : 0;
    out += TF(450, 720, youIn * 1.05, `<g filter="url(#dropS)">${countHand(nfA)}</g>`) + tpill(450, 960, "answer hand", 32, "#fff", P.ink)
      + TF(800, 740, youIn * 1.25 * (1 + .08 * pulse(t, tOne, .02, .25)), `<g filter="url(#dropS)">${countHand(t >= tOne ? 1 : 0)}</g>`) + tpill(800, 960, "score hand", 32, "#fff", P.ink)
      + youPill(625, 520, 1.3 * youIn) + popSpark(t, tH, 625, 640, 260)
      + (t >= tLock ? TF(625, 1030, spring(t, tLock, .4), tpill(0, 0, "You lock in first", 38, P.sun, P.ink, { w: 700 })) : "")
      + (t >= tOne ? TF(800, 470, spring(t, tOne, .35), `<g filter="url(#dropS)"><circle r="58" fill="url(#gSun)"/></g>${T(0, 23, "+1", 58, P.ink)}`) : ""); }
  // the buddies, big, on the right half: the finder speaks big in front; the others pop in for the colours (Part 1) or the rules
  const finder = TL.lines[LB].who, CM = { momo: "g301c", pip: "g301p", basil: "g301t" }, CP = { momo: "waving", pip: "arms_crossed", basil: "cheer" };
  const POS = finder === "momo" ? { momo: [1400, 1066, 520], pip: [1065, 1040, 310], basil: [1762, 1040, 330] } : { basil: [1410, 1066, 530], pip: [1065, 1040, 310], momo: [1765, 1040, 330] };
  const fA = ["thinking", "pointing", "waving"];
  for (const w of ["pip", "basil", "momo"]) { const [x, y, h] = POS[w], isF = w === finder, cl = full && HAS(CM[w]) ? CM[w] : null;
    const tin = isF ? LT(LB) - .5 : (cl ? Math.min(LT(cl) - .5, LT(CM.momo) + (w === "pip" ? .4 : .8)) : tRule + (w === "pip" ? .1 : .25));
    if (t < tin) continue;
    const ps = isF ? [[tin, "sit"], [LE(LB) + .15, "pointing"], [LE(LB) + 2.6, "sit"]] : [[tin, "sit"]];   // EP15: the finder points at the animal in its circle
    if (cl) ps.push([LT(cl) - .12, CP[w]], [LE(cl) + .3, "sit"]);
    if (full && w === "momo") ps.push([LT(CM.momo) - .12, "waving"], [LE(CM.momo) + .2, "sit"]);
    ps.sort((a, b) => a[0] - b[0]);
    out += buddy(w, x, y, h * (speaking(w, t) ? 1.05 : 1), t, { in: tin, poses: ps, flip: x > 1300, wave: true, look: isF ? -4 : 0, twirl: full && w === "momo" && HAS("g301c") ? [MK("twirl") - .1] : [], jump: [[tLock + .02, 18]] });
    // a sparkle on Momo's twirl and on Basil's "handsome" (script 12.3)
    if (full && w === "momo" && TL.marks.twirl !== undefined) out += popSpark(t, MK("twirl"), x, y - h * .6, h * .7);
    if (full && w === "basil" && TL.marks.handsome !== undefined) out += popSpark(t, MK("handsome"), x, y - h * .6, h * .7); }
  return out + logo(t); }

/* ---------- riders: the three buddies, shrunk down, riding along in a journey (teacher, 22 Nov: "Can we bring the 3 pet buddies along?").
   They sit along the bottom edge (no discs: they are IN the micro-world), small (h 150-170), never in the middle of the view; each stop gets
   its reactions (poses = per buddy [[t, pose]]); jolt = shake times. ---------- */
function riders(t, s, o = {}) { const tin = o.tin || s.t0 + .8, P0 = o.at || { pip: [210, 1040], basil: [1690, 1048], momo: [380, 1034] }; let out = "";
  for (const who of ["momo", "pip", "basil"]) { const [x, y] = P0[who], j = (o.jolts || []).reduce((a, tj) => a + (t >= tj && t < tj + .4 ? 1 : 0), 0);
    out += buddy(who, x, y, o.h || 190, t, { in: tin + ({ pip: 0, basil: .15, momo: .3 })[who], poses: (o.poses || {})[who] || [], flip: x > 960, tag: false, rim: "rimB", jump: (o.jolts || []).map((tj) => [tj, 34]), noreact: !!o.noreact }); }
  return out; }
const numBadge = (t, t0, x, y, n, k = 1) => t < t0 ? "" : TF(x, y, spring(t, t0, .45) * k, `<g filter="url(#dropS)"><circle r="52" fill="url(#gSun)" stroke="${P.ink}" stroke-width="7"/></g>${T(0, 25, n, 68, P.ink)}`);
