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
function roundCard(t, s, a, b, col = P.sun) { const u = t - s.t0, k = lerp(2.3, 1, eo(u / .16)) + .05 * wob(u, .16, .4);
  return bg("stage") + `<circle cx="960" cy="540" r="${n2(360 + 500 * eo(u / .7))}" fill="none" stroke="${col}" stroke-width="${n2(24 * (1 - eo(u / .7)))}"/><g transform="translate(960 540) scale(${n2(k)}) rotate(-4)"><g filter="url(#drop)"><rect x="${-(tw(a, 200, 700, "Fredoka", 10) + 160) / 2}" y="-150" width="${tw(a, 200, 700, "Fredoka", 10) + 160}" height="${b ? 380 : 300}" rx="60" fill="${col}"/></g>${T(0, 70, a, 200, P.ink, { ls: 10 })}${b ? T(0, 180, b, 64, P.ink, { ls: 8 }) : ""}</g>` + HUD(t); }
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
    + buddy("pip", 300, 1050, 300, t, { aura: true, jump: jumps, poses: [[ws[4][1] - .05, "cheer"]] }) + buddy("basil", 960, 1070, 230, t, { aura: true, jump: jumps, poses: [[ws[4][1] - .05, "cheer"]] }) + buddy("momo", 1620, 1050, 300, t, { aura: true, jump: jumps, poses: [[ws[4][1] - .05, "cheer"]] }) + HUD(t); };

/* ============ today's goals: a buddy READS the three cards aloud, word for word (teacher, 2026-11-21, SERIES_FORMAT section 11 step 3).
   The three cards drop in at the start; the title lights as "Today you'll learn" is said; each card lifts and glows while it is read.
   ids = [title line, card 1, card 2, card 3]; who = the reader (lip-sync on the sit sprites, a small hop to each card) ============ */
function goals3(t, s, goals, ids, who = "pip") { const cols = ["gBlue", "gPurple", "gOrange"], cues = [0, 1, 2].map((i) => ids ? LT(ids[i + 1]) : s.t0 + .4 + i * 1.22), ends = [0, 1, 2].map((i) => ids ? LE(ids[i + 1]) : cues[i] + 1.1);
  const tT = ids ? LT(ids[0]) : s.t0, tl = ids ? pulse(t, tT, .05, 1.0) : 0;
  let out = bg("stage2") + OP(ramp(t, s.t0 + .1, .3), TF(960, 190, 1 + .06 * tl, T(0, 20, "Today you’ll learn", 76, tl > .3 ? P.sun : "#fff", { w: 600 })));
  goals.forEach(([g, ic], i) => { const tin = ids ? s.t0 + .25 + i * .14 : cues[i] - .12, k = spring(t, tin, .5); if (k < .02) return; const lit = ids ? ss(cues[i] - .12, cues[i] + .08, t) * (1 - ss(ends[i] + .1, ends[i] + .35, t)) : pulse(t, cues[i], .05, 1.3);
    const x = 380 + i * 580, y = 570 + (1 - eo((t - tin) / .3)) * -220 - 30 * lit, ls = wrap(g, 46, 450, 700), read = ids ? (t >= ends[i] + .1 ? 1 : 0) : 0;
    out += TF(x, y, k * (1 + .07 * lit), `<g transform="rotate(${[-2, 1.5, -1.5][i]})">${lit > .05 ? `<rect x="-270" y="-205" width="540" height="430" rx="58" fill="${P.sun}" opacity="${n2(.9 * lit)}" filter="url(#b10)"/>` : ""}<g filter="url(#drop)"><rect x="-255" y="-190" width="510" height="400" rx="46" fill="url(#gPaper)"/><rect x="-255" y="-190" width="510" height="150" rx="46" fill="url(#${cols[i]})"/><rect x="-255" y="-90" width="510" height="50" fill="url(#${cols[i]})"/></g><g transform="translate(0 -112)">${ic}</g>${ls.map((l, j) => T(0, 66 + j * 56 - (ls.length - 1) * 22, l, 46, P.ink)).join("")}${read ? TF(214, -150, spring(t, ends[i] + .1, .35), tickBadge(26)) : ""}</g>`); });
  const hops = ids ? cues.map((c) => [c - .2, 22]) : [];
  return out + buddy(who, 180, 1060, 250, t, { aura: true, in: s.t0 + .2, poses: ids ? [[s.t0, "sit"], [ends[2] + .2, "cheer"]] : [[s.t0, who === "basil" ? "cheer" : "pointing"], [cues[2] + 1.0, "cheer"]], jump: hops, nohop: true }) + HUD(t); }

/* ============ the lock-in (fingers 1, 2, 3): the same routine every time ============
   c: { cards: [text, ...] (2 or 3 cream answer cards), q, tq, tc: [t1, ...] (each card pops as Heart says it), ring0, dur, lock (Heart's "Locked in!" line), obj(t) -> svg at the ring centre (430, 470),
        picks: [{who, id, word, x, fixed}] (fixed = that buddy has answered already), ans + tAns (the right card glows), pre(t), over(t), react, score } */
function lockN(t, c) { const n = c.cards.length, bell = c.ring0 + c.dur, tS = LT(c.lock) - .08, picks = c.picks, tb0 = Math.min(...picks.filter((p) => p.id).map((p) => LT(p.id))) - .5, rs = ringState(t, c.ring0, c.dur);
  const zb = ss(tb0, tb0 + .4, t), gs = lerp(1, .74, zb), shut = pulse(t, bell, .01, .6), RX = 430, CY = 470, x0 = n === 3 ? 950 : 1060, dx = n === 3 ? 312 : 420;
  let main = "";
  c.cards.forEach((txt, i) => { const k = spring(t, c.tc[i] - .08, .45); if (k < .02) return; const turn = t >= c.ring0 && t < bell ? (Math.floor((t - c.ring0) / .5) % n === i ? 1 : 0) : 0, said = pulse(t, c.tc[i], .04, .5), lit = c.ans === i + 1 && c.tAns !== undefined && t >= c.tAns ? spring(t, c.tAns, .45) : 0;
    main += TF(x0 + i * dx, CY, k, ansCard(i + 1, txt, { pulse: Math.max(turn * (.4 + rs.tick), said), lit, w: n === 2 ? 340 : 286, icon: c.icons ? c.icons[i] : undefined })); });
  main += ringTimer(RX, CY, t < bell ? rs.frac : 0, t < bell ? rs.secs : 0, t, { tick: rs.tick, shut, inner: `<circle cx="${RX}" cy="${CY}" r="172" fill="url(#mSky)"/>` + c.obj(t) });
  // clue labels (teacher, 2026-11-21, SERIES_FORMAT section 4): drawn ON TOP of the ring frame, and they stay through the whole countdown and after it,
  // like the cards and the ring picture. c.labels(t) -> svg; c.tag = one short label on the top of the ring
  if (c.tag && t >= c.tq) main += TF(RX, CY - RING_R - 14, spring(t, c.tq, .4), tpill(0, 0, c.tag, 34, "#fff", P.ink, { w: 700 }));
  if (c.labels) main += c.labels(t);
  if (shut > .05) main += `<circle cx="${RX}" cy="${CY}" r="${n2(RING_R + 40 + 80 * (1 - shut))}" fill="none" stroke="${P.sun}" stroke-width="6" opacity="${n2(shut * .8)}"/>`;
  const top = OP(ramp(t, c.tq, .3) * (1 - zb), T(c.q.length > 32 ? 930 : 960, 106, c.q, c.q.length > 32 ? 46 : c.q.length > 28 ? 52 : 62, "#fff", { w: 600 })) + OP(ramp(t, c.ring0 - .15, .2) * (1 - zb) * (t < bell ? .75 + .25 * Math.sin(t * 9) : 1), T(960, 176, "LOCK IT IN!", 40, P.sun, { ls: 8 }));
  // the buddies wait with their picks face down; after the bell each card flips as its buddy speaks
  const X0 = { pip: 600, basil: 960, momo: 1320 }, tin = c.tin || c.ring0 - .3; let buds = "", bubs = "", cards = "";
  ["pip", "basil", "momo"].forEach((who, i) => { const pk = picks.find((p) => p.who === who), tf = pk.fixed ? tin : LT(pk.id), uni = pk.id && TL.lines[pk.id].who === "chant", sp = t >= tb0 && speaking(who, t), hh = lerp(224, 320, zb) * (sp && !uni ? 1.06 : 1), x = lerp(X0[who], [400, 960, 1520][i], zb);
    const poses = pk.fixed ? [[tin, "sit"]] : [[tin, who === "basil" ? "arms_crossed" : "thinking"], [tf - .12, "sit"]];
    for (const [tt, w2, p2] of c.react || []) if (w2 === who) poses.push([tt, p2]); poses.sort((a, b) => a[0] - b[0]);
    buds += buddy(who, x, 1062, hh, t, { aura: true, auraO: .85, in: tin + i * .12, poses });
    if (t > tin + i * .12 + .2) cards += pickNum(who, x + hh * .66, 1062 - hh * .3, t, pk.fixed ? tin + i * .12 + .3 : tf - .1, pk.word);
    if (pk.id && !uni) bubs += say(pk.id, x + (i === 0 ? 60 : i === 2 ? -60 : 0), 1062 - hh - 120, t, { x: pk.x, tail: i === 0 ? -60 : i === 2 ? 60 : 0, maxW: 640, size: 42 }); });
  const note = OP(ramp(t, tin + .5, .3) * (1 - ss(bell, bell + .3, t)), pill(960, 802, 470, 48, "#120E2E", "The buddies lock in after you", 27, "#DDD3FF", { w: 500, ls: 1 }));
  // YOU: the fingers, shown once as Heart counts the choices
  const nf = n > 2 && t >= c.tc[2] - .1 ? 3 : t >= c.tc[1] - .1 ? 2 : 1, a = ramp(t, c.tc[0] - .15, .25) * (1 - ramp(t, c.ring0 - .5, .25));
  const demo = OP(a, TF(960, 950, 1.0 * (1 + .1 * pulse(t, c.tc[nf - 1], .03, .3)), `<g filter="url(#dropS)">${countHand(nf)}</g>`) + youPill(1120, 900, 1.05) + tpill(1190, 990, n === 2 ? "1 or 2 fingers" : "1, 2 or 3 fingers", 30, P.ink, "#fff"));
  return bg("stage") + `<g transform="translate(960 ${n2(lerp(505, 330, zb))}) scale(${n2(gs)}) translate(-960 -470)">${main}</g>` + top + `<rect y="800" width="1920" height="280" fill="url(#xFloor)"/>` + (c.pre ? c.pre(t) : "") + note + buds + cards + demo + bubs + (c.over ? c.over(t) : "")
    + stamp(t, tS, 960, lerp(505, 330, zb)) + bellIcon(t, c.ring0) + HUD(t, { score: c.score !== false }); }

/* ============ Mark Sentence card: the buddy beside it SAYS "Say it with me!", 0.8 s, then the SAME BUDDY reads the whole card aloud, word for word
   (teacher, 2026-11-21: Heart never reads a card). The words light up as the buddy reads them (lip-sync on the sit sprites); the card holds 2.5 s ============ */
function markScene(t, s, o) { const S = TL.lines[o.sayId], R = TL.lines[o.id], ts = S.t, p0 = o.who === "basil" ? "cheer" : "pointing", own = R.who === o.who;
  const poses = [[s.t0, p0], [ts - .12, "sit"], ...(own ? [[R.end + .2, p0]] : [[S.end + .15, p0]]), ...(o.poses || [])].sort((a, b) => a[0] - b[0]);
  return bg("stage2") + (o.under || "") + markCard(t, { footer: "P3 · Diversity · Materials", ...o, t0: s.t0 + .1 }) + buddy(o.who, 330, 960, 400, t, { aura: true, in: s.t0 + .15, poses, jump: [[ts - .1, 26]], nohop: true, wave: true })
    + say(o.sayId, 330, 388, t, { size: 44, tail: 0 }) + (o.extra || "") + HUD(t); }

/* ============ the chant: clap, clap, stomp. Call and response: the buddies chant a line, then one bar for the viewers ("YOUR TURN!"), then all together ============ */
// EP8: the seven names in the book's order, three lines; each name in its tile's stamp colour (materials.js MAT)
const PHR = ["Wood! Metal! Ceramic!", "Rubber! Glass!", "Plastic! Fabric!"], PCOL = Object.fromEntries(MAT.map((m) => [m.name[0] + m.name.slice(1).toLowerCase() + "!", "#fff"]));
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
// which board column flashes now (the word being chanted): [w, f, a] 0..1
// which board tile flashes now (the name being chanted): { wood: 0..1, metal: ..., ... }
function chantFlash(t, L) { const f = {}; for (const m of MAT) f[m.k] = 0; for (const w of L.words) { const k = w.w.replace(/[^A-Za-z]/g, "").toLowerCase(); if (k in f) f[k] = Math.max(f[k], pulse(t, w.a, .03, .35)); } return f; }
function chantScene(t, s, id, o = {}) { const L = TL.lines[id], beats = chantBeats(L); let fx = "", clap = 0, stomp = 0; for (const [bt, k, soft] of beats) { const g = soft ? .45 : 1; if (k === "c") clap = Math.max(clap, pulse(t, bt, .03, .18) * g); else stomp = Math.max(stomp, pulse(t, bt, .03, .25) * g); }
  const jumps = beats.filter((b) => b[1] === "s" && !b[2]).map((b) => [b[0] - .2, 30]), by = 1066, bh = 270, xs = [620, 990, 1360], tin = s.t0 + .15;
  let buds = ""; ["pip", "basil", "momo"].forEach((w, i) => { const sq = 1 - .05 * clap; buds += `<g transform="translate(${xs[i]} ${by}) scale(${n2(1 / sq)} ${n2(sq)}) translate(${-xs[i]} ${-by})">${buddy(w, xs[i], by, bh, t, { aura: true, in: tin + i * .08, jump: t >= L.t ? jumps : [], poses: [[s.t0, "sit"], [L.end - .28, "cheer"]] })}</g>`;
    fx += OP(clap, `<g stroke="${P.sun}" stroke-width="7" stroke-linecap="round"><path d="M${xs[i] - bh * .5} ${by - bh * .8} l-26 -22 M${xs[i] + bh * .5} ${by - bh * .8} l26 -22 M${xs[i]} ${by - bh * 1.08} v-30"/></g>`) + OP(stomp, `<ellipse cx="${xs[i]}" cy="${by}" rx="${n2(bh * (.5 + .4 * (1 - stomp)))}" ry="${n2(22 + 16 * (1 - stomp))}" fill="none" stroke="#fff" stroke-width="6"/>`); });
  // EP8: the full board of seven tiles stands beside them; each tile jumps on its name. Stage 2 passes o.board(t, flash) -> svg
  const board = o.board ? o.board(t, chantFlash(t, L)) : "";
  return bg("stage2") + board + chantLines(t, L, { x: 900, y0: 330, dy: 150, size: 74 }) + (o.head || "") + buds + fx + yourTurn(t, L, 1730, 700, .95) + say(o.sayId || "u1002", 960, 640, t, { size: 52, col: P.basil, tail: 0, merge: true }) + HUD(t); }

/* ============ the score hand ============ */
function finalScene(t, s, L, bud, tips, extra = "") { // tips: [[time, text, big]]; the last one is HIGH FIVE
  const thi = W(L, "high") - .05, hi = pulse(t, thi + .25, .12, .6); let nf = 1; for (const [tt, , n] of tips) if (t >= tt && n) nf = n;
  let tip = ""; tips.forEach(([tt, txt], i) => { const t1 = tips[i + 1] ? tips[i + 1][0] : 1e9; if (txt && t >= tt && t < t1) tip = TF(1350, 480, spring(t, tt, .4), tpill(0, 0, txt, 40, P.sun, P.ink, { w: 700 })); });
  let out = bg("stage") + `<g transform="translate(960 ${n2(lerp(-200, 200, eo((t - s.t0) / .35)))})">${scoreboard(t, 0, 0, 1.6, { you: "?", bud })}</g>`
    + TF(960, 760 - 60 * hi, 1.85 * spring(t, s.t0 + .25, .5) * (1 + .1 * hi), `<g filter="url(#drop)">${countHand(nf)}</g>`) + youPill(960, 430, 1.3)
    + OP(hi, `<g stroke="${P.sun}" stroke-width="12" stroke-linecap="round">${[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => { const an = -Math.PI * (.05 + i * .1125), r1 = 300 + 60 * (1 - hi), r2 = r1 + 80; return `<path d="M${n2(960 + Math.cos(an) * r1)} ${n2(640 + Math.sin(an) * r1)} L${n2(960 + Math.cos(an) * r2)} ${n2(640 + Math.sin(an) * r2)}"/>`; }).join("")}</g>`)
    + tip + (t >= thi ? TF(1350, 480, spring(t, thi, .4), tpill(0, 0, "HIGH FIVE!", 52, P.sun, P.ink, { w: 700, ls: 4 })) : "") + extra;
  [["pip", 230, false], ["basil", 610, false], ["momo", 1600, true]].forEach(([w, x, fl], i) => { out += buddy(w, x, 1060, i === 1 ? 250 : 300, t, { aura: true, flip: fl, poses: [[s.t0, "sit"], [thi - .15, "cheer"]], jump: [[thi + .05, 90]] }); });
  return out + logo(t); }

/* ============ the key-word read-along: the shelf comes to the centre, big; Heart says each word, then it is YOUR turn ============ */
SC.kwrecap = (t, s) => { const ids = KWLINE, us = KWLINE.map((k) => "u" + k.slice(1)), tw_ = LT("h864");
  let turn = -1; us.forEach((u, i) => { if (t >= LT(u) - .2 && t < LE(u) + .45) turn = i; });
  let out = bg("stage2") + OP(ramp(t, s.t0 + .2, .3) * (1 - ramp(t, LT(ids[0]) - .3, .3)), T(960, 190, "Let’s read today’s key words together!", 70, "#fff", { w: 600 }))
    + OP(ramp(t, LT(ids[0]) - .3, .3), T(960, 170, "KEY WORDS", 54, P.sun, { ls: 10 }));
  out += TF(330, 480, 1, youPill(0, 0, 1.3) + `<g transform="translate(0 130) scale(${n2(1 + (turn >= 0 ? .12 + .05 * Math.sin(t * 10) : 0))})" opacity="${turn >= 0 ? 1 : .35}"><g filter="url(#dropS)"><rect x="-110" y="-64" width="220" height="128" rx="50" fill="#fff"/><path d="M-30 60 L-56 108 L16 62z" fill="#fff"/></g>${[-52, 0, 52].map((x, i) => `<circle cx="${x}" cy="${n2(turn >= 0 ? -8 * Math.abs(Math.sin(t * 7 + i)) : 0)}" r="15" fill="${P.ink}"/>`).join("")}</g>`
    + (turn >= 0 ? TF(0, 300, spring(t, LT(us[turn]) - .2, .3), tpill(0, 0, "Say it!", 44, P.coral, "#fff", { w: 700 })) : ""));
  [["pip", 1600, 520], ["basil", 1770, 790], ["momo", 1600, 1060]].forEach(([w, x, y], i) => { out += buddy(w, x, y, 200, t, { aura: true, flip: true, in: s.t0 + .15 + i * .08, tag: false, poses: [[s.t0, "sit"], [tw_, "cheer"]], jump: [[tw_, 40]] }); });
  if (t >= tw_) out += TF(330, 900, spring(t, tw_, .45), `<g transform="rotate(-4)"><g filter="url(#drop)"><rect x="-230" y="-64" width="460" height="128" rx="64" fill="url(#gSun)"/></g>${T(0, 24, "Well done!", 70, P.ink)}</g>`);
  return out + HUD(t); };

/* ============ "Now you know!": exactly EP1's ending (notes 14-16). Behind the buddies: the hotel as it stands at the end of this part ============ */
function nykScene(t, s, prop, o = {}) { const BX = o.bx || [300, 1650, 1275], HX = o.hx || 530; const U = "u1300", L = "h1305", tN = LT(L), tOne = LT("h1304o"), tTwo = LT("h1304t"), tR = LT("h1304a");
  const t0 = Math.floor(TL.lines[L].know * 30 + 1e-6) / 30, k = lerp(2.6, 1, eo((t - t0) / .16)) + .07 * wob(t, t0 + .16, .5), on = t >= t0;
  let rays = ""; for (let i = 0; i < 18; i++) { const a = i * 20 + (t - s.t0) * 9; rays += `<path d="M960 520 L${n2(960 + Math.cos(a * Math.PI / 180) * 1600)} ${n2(520 + Math.sin(a * Math.PI / 180) * 1600)} L${n2(960 + Math.cos((a + 9) * Math.PI / 180) * 1600)} ${n2(520 + Math.sin((a + 9) * Math.PI / 180) * 1600)}z" fill="#FFE27A" opacity=".5"/>`; }
  let out = `<rect width="1920" height="1080" fill="url(#gSun)"/>${rays}<circle cx="960" cy="520" r="420" fill="#FFF3B8" opacity=".7" filter="url(#b60)"/>` + prop;
  const loop = []; for (let j = 0; j < 9; j++) loop.push([t0 + 1.0 + j * .62, 34]);
  [["pip", BX[0], false], ["basil", BX[1], true], ["momo", BX[2], true]].forEach(([w, x, fl], i) => { out += buddy(w, x, 1040, 320, t, { aura: true, flip: fl, in: s.t0 + .05 + i * .06, poses: [[s.t0, "waving"], [LT(U) - .12, "sit"], [LE(U) + .15, "pointing"], [tN - .1, "sit"], [t0, "cheer"]], wave: true, nohop: true, jump: [[tOne - .16, 26], [tTwo - .16, 26], [t0 - .02, 90], ...loop.map(([a, b]) => [a + i * .1, b])] }); });
  out += say(U, 960, 430, t, { size: 60, col: P.basil, tail: 0, merge: true });
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
function lizReveal(t, s, L, view, lx, ly, tq, qtext, dx = 60, dy = 130, rr = 88, zmax = 1.7) { const tTell = W(L, "tell") - .1, u = eio((t - s.t0 - .2) / 1.3), zz = lerp(1, zmax, u);
  return `<g transform="translate(960 540) scale(${n2(zz)}) translate(${n2(-lerp(960, lx + dx, u))} ${n2(-lerp(540, ly + dy, u))})">${view}<circle cx="${lx}" cy="${ly}" r="${n2(rr + rr * .07 * Math.sin(t * 6))}" fill="none" stroke="${P.sun}" stroke-width="${n2(9 * rr / 88 + 2)}"/></g>`
    + (t >= tq ? TF(960, 830, spring(t, tq, .45), `<g filter="url(#drop)"><rect x="${n2(-tw(qtext, 58, 700) / 2 - 60)}" y="-60" width="${n2(tw(qtext, 58, 700) + 120)}" height="120" rx="60" fill="${P.ink}"/></g>${T(0, 20, qtext, 58, "#fff")}`) : "")
    + (t >= tTell ? TF(960, 970, spring(t, tTell, .45), tpill(0, 0, "Tell someone at home!", 44, P.sun, P.ink, { w: 700 })) : "") + logo(t); }

/* ============ the game: You against the Buddies (full in Part 1, one breath in Part 2) ============ */
function gameScene(t, s, L, full) { const tLock = W(L, "lock"), tC = W(L, HIDDEN[0]), tFind = W(L, "spot");   // teacher, 2026-11-21: Heart NAMES the animal ("A little sparrow is hiding in this video. Can you spot it?") and its picture is shown
  let out = bg("stage");
  if (full) { const tYou = W(L, "you"), tBud = W(L, "buddies"), tb = W(L, "every") - .3, ph2 = ss(tb, tb + .4, t), tOne = W(L, "one");
    out += `<g transform="translate(960 ${n2(lerp(-200, 190, eo((t - s.t0) / .4)))})">${scoreboard(t, 0, 0, 1.45 + .12 * pulse(t, tYou, .02, .3) + .12 * pulse(t, tBud, .02, .3), { you: 0, bud: 0 })}</g>`;
    const nf = t >= tOne ? 1 : 0, youIn = spring(t, tYou - .1, .5);
    if (youIn > .02) { const px = lerp(400, 330, ph2), cx = lerp(880, 760, ph2), cs = lerp(1.15, 1.9, ph2), cy = lerp(700, 800, ph2);
      out += TF(px, lerp(640, 600, ph2), youIn * lerp(1.2, .9, ph2), `<g filter="url(#dropS)">${countHand(t >= tLock ? 2 : 0)}</g>`) + OP(1 - ph2, tpill(400, 880, "answer hand", 30, "#fff", P.ink));
      out += TF(cx, cy, youIn * cs * (1 + .06 * pulse(t, tOne, .02, .2)), `<g filter="url(#dropS)">${countHand(ph2 > .5 ? nf : 0)}</g>`) + OP(1 - ph2, tpill(880, 990, "score hand", 30, "#fff", P.ink));
      out += youPill(lerp(640, 330, ph2), lerp(470, 400, ph2), 1.3 * youIn);
      if (nf && ph2 > .5) out += TF(1010, 560, spring(t, tOne, .35), `<g filter="url(#dropS)"><circle r="70" fill="url(#gSun)"/></g>${T(0, 28, "+1", 70, P.ink)}`); }
    out += OP(pulse(t, tLock + .2, .2, 1.4) * (1 - ph2), `<g transform="translate(1010 620) scale(.42)">${ringTimer(0, 0, .62, 3, t)}</g>`);
    [["pip", 1170, "waving"], ["basil", 1455, "cheer"], ["momo", 1740, "waving"]].forEach(([w, x, pz], i) => { const tt = tBud + i * .14; out += buddy(w, x, 1030, 225, t, { aura: true, in: tt - .08, poses: [[tt - .08, pz], [tt + 1.4, "sit"], [tFind, "cheer"]], wave: true }); });
    if (t >= tC - .1) out += TF(1440, 430, spring(t, tC - .1, .5), hiddenBadge(t, 150)) + TF(1440, 640, spring(t, tFind - .1, .4), tpill(0, 0, "Can you spot it?", 40, P.ink, P.sun, { w: 700 }));
    return out + logo(t); }
  // Part 2: "Lock in first. And find the new lizard!"
  out += `<g transform="translate(960 ${n2(lerp(-200, 170, eo((t - s.t0) / .4)))})">${scoreboard(t, 0, 0, 1.35, { you: 0, bud: 0 })}</g>`;
  out += TF(560, 560, spring(t, tLock - .15, .5), `<g transform="scale(.8)">${ringTimer(0, 0, clamp(1 - (t - tLock) / 3), 5, t)}</g>` + TF(0, 0, .95, `<g filter="url(#dropS)">${countHand(t > tLock + .7 ? 3 : t > tLock + .35 ? 2 : 1)}</g>`)) + (t >= tLock ? TF(560, 880, spring(t, tLock + .1, .4), tpill(0, 0, "You lock in first", 42, "#fff", P.ink, { w: 700 })) + youPill(560, 330, 1.2) : "");
  if (t >= tC - .1) out += TF(1360, 540, spring(t, tC - .1, .5), hiddenBadge(t, 170)) + TF(1360, 790, spring(t, tFind - .1, .4), tpill(0, 0, "Can you spot it?", 42, P.ink, P.sun, { w: 700 }));
  [["pip", 1010, 880], ["basil", 960, 1066], ["momo", 1750, 1060]].slice(1).forEach(([w, x, y], i) => { out += buddy(w, x, y, 220, t, { aura: true, in: s.t0 + .2 + i * .1, flip: i === 1, poses: [[s.t0, "cheer"], [s.t0 + 1.6, "sit"]], wave: true }); });
  return out + logo(t); }
