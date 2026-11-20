// scenes_d.js: segments 9-13: HOLD ON (Momo's sort), Mark Sentence 2, the Showdown (Pip's homework), three ways, Day 30, the ending.

/* ============ 9 · the sort: two trays, six things ============ */
// the six things as small pictures (origin = where each stands)
const TH = { teddy: () => TF(0, 0, .72, teddyKey()), dish: () => TF(0, 0, .66, wormDish({ id: "sd", bites: 2, wl: 86 })), plant: () => TF(0, -36, .6, potPlant({ nu: .6, lean: 6 })), bean: () => TF(0, 0, .72, beanPlant(10)), robot: () => TF(0, 0, .6, robotWalkStop(0, 0)), pebble: () => TF(0, -22, .7, pebble()) };
const TNAME = { teddy: "teddy bear", dish: "mealworm", plant: "plant", bean: "green bean plant", robot: "wind-up robot", pebble: "pebble" };
const WAITX = { teddy: 420, dish: 636, plant: 852, bean: 1068, robot: 1284, pebble: 1500 }, WAITY = 430;
const SOFTX = { teddy: 420, dish: 590, plant: 750, bean: 880 }, HARDX = { robot: 1200, pebble: 1420 }, TRAYY = 810;
const P2 = HAS("m902");
const SORT = P2 ? { s1: W("m902", "squish"), s2: W("m902", "squish", 1), k1: W("m902", "knock"), k2: W("m902", "knock", 1) } : { s1: 0, s2: 0, k1: 0, k2: 0 };
SORT.mv = { teddy: SORT.s1, plant: SORT.s2, bean: SORT.s2 + .38, dish: SORT.k1 - .5, robot: SORT.k1, pebble: SORT.k2 };
const tray = (x, w, label, lt, t, col) => `<g filter="url(#drop)"><rect x="${x}" y="640" width="${w}" height="230" rx="34" fill="#E6C39A"/><rect x="${x + 16}" y="654" width="${w - 32}" height="190" rx="24" fill="#FFF3DC"/></g>` + (label && t >= lt ? TF(x + w / 2, 912, spring(t, lt, .45), `<g transform="rotate(-2)" filter="url(#dropS)"><rect x="${-(tw(label, 50, 700, "Fredoka", 6) + 80) / 2}" y="-42" width="${tw(label, 50, 700, "Fredoka", 6) + 80}" height="84" rx="42" fill="${col || P.sun}"/>${T(0, 18, label, 50, col ? "#fff" : P.ink, { ls: 6 })}</g>`) : "");
// st: { moved: t -> 0..1 per thing (or 0), labels: [left, right, time, colL, colR], task: flash 0..1, back: 0..1 (things go back to the row) }
function sortView(t, st = {}) { let things = "", fx = "";
  const tk = 1 + .06 * (st.flash || 0);
  let out = bg("daystage") + `<g transform="translate(960 150) scale(${n2(tk)})"><g filter="url(#drop)"><rect x="-560" y="-50" width="1120" height="100" rx="30" fill="${P.paper}"/><rect x="-560" y="-50" width="20" height="100" rx="10" fill="${P.sun}"/></g>${st.flash > .05 ? `<rect x="-560" y="-50" width="1120" height="100" rx="30" fill="none" stroke="${P.sun}" stroke-width="${n2(10 * st.flash)}"/>` : ""}
    ${T(0, 16, `Sort into <tspan font-weight="700">LIVING THINGS</tspan> and <tspan font-weight="700">NON-LIVING THINGS</tspan>`, 42, P.ink, { w: 500 })}</g>`;
  const lb = st.labels || [];
  out += tray(310, 660, lb[0], lb[2], t, lb[3]) + tray(1030, 580, lb[1], lb[2] + (lb[5] || 0), t, lb[4]);
  for (const k of ["teddy", "dish", "plant", "bean", "robot", "pebble"]) { const soft = k in SOFTX, tm = SORT.mv[k], u = st.all ? 1 : clamp((t - tm) / .34) * (1 - (st.back || 0)), x1 = soft ? SOFTX[k] : HARDX[k];
    const x = lerp(WAITX[k], x1, eio(u)), y = lerp(WAITY, TRAYY, eio(u)) - 50 * Math.sin(Math.PI * u) * (u < 1 ? 1 : 0);
    // Momo's test: a pat (soft things squash) or a tap (hard things do not)
    const pat = st.all ? 0 : pulse(t, tm - .16, .06, .16) * (k === "dish" ? 0 : 1), sq = soft ? 1 - .2 * pat : 1;
    things += `<ellipse cx="${n2(x)}" cy="${n2(y + 4)}" rx="70" ry="10" fill="${P.ink}" opacity=".18" filter="url(#b4)"/><g transform="translate(${n2(x)} ${n2(y)}) scale(${n2(1 / Math.sqrt(sq))} ${n2(sq)})">${TH[k]()}</g>`;
    if (pat > .05) { const ty = y - (k === "plant" ? 190 : k === "robot" ? 170 : k === "teddy" ? 190 : 70); fx += TF(x, ty - 46 * (1 - pat), .62, `<g transform="rotate(180)">${paw("#E4E1EC", "#9C96B8").replace('y="-640" width="68" height="640"', 'y="-200" width="68" height="200"')}</g>`) + (soft ? "" : `<g stroke="${P.ink2}" stroke-width="6" stroke-linecap="round" opacity="${n2(pat)}"><path d="M${n2(x - 70)} ${n2(ty + 30)} l-22 -14 M${n2(x + 70)} ${n2(ty + 30)} l22 -14 M${n2(x)} ${n2(ty - 20)} v-24"/></g>`); }
    if (!st.nonames && u <= 0) things += T(n2(x), WAITY + 52, TNAME[k], 27, P.ink2, { w: 600 }); }
  return out + things + fx; }
SC.sort = (t, s) => { const tgo = MK("sortGo"), r0 = MK("ring0_3"), bell = r0 + 5, c = "h904", tSoft = W(c, "soft") - .1, tHard = W(c, "hard") - .1, tJoin = W(c, "sitting") - .2, tOne = WE(c, "crossed") + .2;
  const rs = ringState(t, r0, 5), shut = pulse(t, bell, .01, .6);
  let out = sortView(t, { labels: ["SOFT", "HARD", tSoft, null, null, tHard - tSoft], flash: pulse(t, tSoft, .1, .8) })
    + (t >= tJoin ? OP(ramp(t, tJoin, .25) * (1 - ramp(t, LT("m905"), .3)), `<path d="M${SOFTX.teddy} ${TRAYY - 190} Q505 ${TRAYY - 290} ${SOFTX.dish} ${TRAYY - 70}" fill="none" stroke="${P.coral}" stroke-width="8" stroke-linecap="round"/><circle cx="${SOFTX.teddy}" cy="${TRAYY - 190}" r="10" fill="${P.coral}"/><circle cx="${SOFTX.dish}" cy="${TRAYY - 70}" r="10" fill="${P.coral}"/>`) : "");
  // the HOLD ON ring (cross your arms)
  const rk = spring(t, r0 - .5, .4) * (1 - ss(bell + .9, bell + 1.2, t));
  if (rk > .02) out += TF(1740, 400, rk, `<g transform="scale(.56)">${ringTimer(0, 0, t < bell ? rs.frac : 0, t < bell ? rs.secs : 0, t, { tick: rs.tick, shut, inner: `<g transform="scale(.82) translate(0 -10)">${crossedArms()}</g>` })}</g>` + tpill(0, -170, "HOLD ON!", 40, P.sun, P.ink, { w: 700, ls: 3 }));
  const tCA = W("h903", "cross") - .1, ca = spring(t, tCA, .45) * (1 - ss(r0 + .8, r0 + 1.2, t));
  if (ca > .02) out += TF(960, 520, ca * 1.5, `<g filter="url(#drop)">${crossedArms()}</g>`) + TF(960, 700, ca, youPill(0, 0, 1.3));
  out += stamp(t, bell + .05, 960, 480, "HOLD ON!") + coin(t, tOne, 1640, 250, "+1", "if you crossed your arms") + bellIcon(t, r0);
  out += buddy("momo", 150, 1066, 330, t, { aura: true, in: s.t0 + .2, poses: [[s.t0, "waving"], [tgo - .2, "pointing"], [LT("m902") - .1, "sit"], [LE("m902") + .1, "cheer"], [LT("h903"), "sit"], [r0, "thinking"], [tSoft, "oops"], [LT("m905") - .1, "sit"], [LE("m905") + .1, "cheer"]] })
    + say("m902", 330, 560, t, { size: 42, maxW: 520, tail: -80, merge: false }) + say("m905", 400, 560, t, { size: 42, maxW: 560, tail: -120 });
  const [d, tf] = dayAt(t, [[0, 10], [s.t0 + .3, 10]]);
  return out + counter(t, 10, s.t0 + .3, 60, 250, .78, { nodots: true }) + HUD(t); };
if (P2) SCORE.push([WE("h904", "crossed") + .2, 1, 0]);

/* ============ Mark Sentence 2: classification ============ */
SC.mark2 = (t, s) => { const a = "h906", b = "h907", tm = LT("p906") - .7;
  if (t < tm) { const tA = W(a, "alike"), tD = W(a, "different"), g1 = pulse(t, tA + .2, .2, 1.3), g2 = pulse(t, tD + .2, .2, 1.3);
    return sortView(t, { all: true, labels: ["SOFT", "HARD", 0, null, null, 0] }) + OP(g1, `<rect x="300" y="560" width="680" height="330" rx="44" fill="none" stroke="${P.sun}" stroke-width="12"/><rect x="1020" y="560" width="600" height="330" rx="44" fill="none" stroke="${P.sun}" stroke-width="12"/>`)
      + OP(g2, `<path d="M1000 540 V910" stroke="${P.coral}" stroke-width="10" stroke-dasharray="4 22" stroke-linecap="round"/>`)
      + (t >= tA ? TF(640, 500, spring(t, tA, .4) * (1 - ramp(t, tm - .3, .2)), tpill(0, 0, "alike: together", 40, P.ink, "#fff", { w: 700 })) : "") + (t >= tD ? TF(1320, 500, spring(t, tD, .4) * (1 - ramp(t, tm - .3, .2)), tpill(0, 0, "different: apart", 40, P.ink, "#fff", { w: 700 })) : "")
      + buddy("momo", 150, 1066, 330, t, { aura: true, pose: "cheer", nohop: true }) + counter(t, 10, -9, 60, 250, .78, { nodots: true }) + HUD(t) + wipe(t, tm, P.indigo, 960, 540); }
  const sc = { t0: tm, t1: s.t1 }, D = TL.lines.h907b, td = D.t - .35, dk = spring(t, td, .5);
  // the word box: cream, dark text, the key word highlighted; its words appear as Heart reads them
  const dtx = ["similarities:", "characteristics", "that", "things", "have", "in", "common."]; let dx = 0, dw = ""; const dsz = 46, dtot = tw(dtx.join(" "), dsz, 700, "Atkinson Hyperlegible");
  dtx.forEach((w, i) => { const ww = tw(w, dsz, 700, "Atkinson Hyperlegible"), wt = D.words[i].a, o = ramp(t, wt - .05, .15); if (i === 0) dw += `<rect x="${n2(-dtot / 2 - 6)}" y="-30" width="${n2((ww + 12) * eo((t - wt) / .35))}" height="50" rx="8" fill="#FFD75A"/>`;
    dw += `<text x="${n2(-dtot / 2 + dx)}" y="14" font-family="Atkinson Hyperlegible" font-weight="700" font-size="${dsz}" fill="${P.ink}" opacity="${n2(.25 + .75 * o)}">${esc(w)}</text>`; dx += ww + tw(" ", dsz, 700, "Atkinson Hyperlegible"); });
  return markScene(t, sc, { id: b, sayId: "p906", who: "pip", n: "2 of 3", size: 66, y: 190, text: "Classification is the grouping of things based on their similarities and differences.", keys: ["classification", "grouping", "similarities", "differences."],
    poses: [[LE(b), "cheer"], [td, "pointing"]],
    extra: dk > .02 ? TF(1150, 930, dk, `<g transform="rotate(.6)"><g filter="url(#drop)"><rect x="${n2(-dtot / 2 - 60)}" y="-62" width="${n2(dtot + 120)}" height="124" rx="26" fill="url(#gPaper)"/><rect x="${n2(-dtot / 2 - 60)}" y="-62" width="18" height="124" rx="9" fill="${P.sun}"/></g><g transform="translate(${n2(-dtot / 2 - 20)} -92)"><rect x="0" y="0" width="230" height="52" rx="26" fill="${P.ink}"/>${T(115, 36, "WORD BOX", 28, P.sun, { ls: 3 })}</g>${dw}</g>`) : "" }) + wipe(t, tm, P.indigo, 960, 540); };

SC.relabel = (t, s) => { const L = "h908", tq = W(L, "living") - .15, lift = ss(LT(L) + .2, LT(L) + 1.0, t), back = ss(LT(L) + .3, LT(L) + 1.3, t);
  return sortView(t, { all: false, back: 0, labels: t < tq - .35 ? ["SOFT", "HARD", 0, null, null, 0] : ["LIVING THINGS", "NON-LIVING THINGS", tq, P.leafDeep, P.blueDeep, .35], flash: pulse(t, tq, .1, .8), ...(t < s.t0 + 99 ? { relabel: 1 } : {}) , all: t < LT(L) + .3, back })
    + (t >= tq - .35 ? "" : OP(1, ""))
    + buddy("momo", 150, 1066, 330, t, { aura: true, poses: [[s.t0, "sit"], [tq, "surprised"], [W(L, "has"), "thinking"]] }) + buddy("pip", 1770, 1066, 300, t, { aura: true, flip: true, in: W(L, "has") - .1, poses: [[W(L, "has") - .1, "waving"]] })
    + counter(t, 10, -9, 60, 250, .78, { nodots: true }) + HUD(t); };

/* ============ 10 · the Showdown: Pip's homework ============ */
SC.showcard = (t, s) => roundCard(t, s, "SHOWDOWN", "DOUBLE POINTS", P.sun);
const SMALL = { mealworm: () => TF(0, 14, .8, mealworm(.3, 84)), bean: () => TF(0, 26, .5, beanSeed(0, 0)), teddy: () => TF(0, 30, .32, teddyKey()), robot: () => TF(0, 34, .28, robotRig({})), plant: () => TF(0, 12, .26, potPlant({})), pebble: () => TF(0, 2, .42, pebble()) };
// Pip's table. st: { badges: time the 1-2-3 badges show (or null), fix: 0..1 "plant" rubbed out, write: 0..1 "plant" written under LIVING THINGS, tick, glow: which badge is lit }
function homework(t, st = {}) { const fix = st.fix || 0, wr = st.write || 0, RY = [225, 315, 405, 495];
  const row = (x, y, k, name, o = {}) => `<g transform="translate(${x} ${y})"><g opacity="${n2(o.op === undefined ? 1 : o.op)}"><g transform="translate(46 0)">${SMALL[k]()}</g><text x="110" y="16" font-family="Fredoka" font-weight="600" font-size="44" fill="${o.fresh ? "#5A5F86" : P.ink}">${name}</text></g>${o.smudge > 0 ? `<ellipse cx="150" cy="4" rx="${n2(150 * o.smudge)}" ry="26" fill="#C9CEDF" opacity=".5" filter="url(#b4)"/>` : ""}</g>`;
  let b = ""; if (st.badges) [["1", RY[1], W("h1003", "one")], ["2", RY[2], W("h1003", "two")], ["3", RY[3], W("h1003", "three")]].forEach(([n, y, t0], i) => { const k = spring(t, t0 - .08, .4); if (k < .02) return; const lit = st.lit === i + 1;
    b += `<rect x="556" y="${y - 40}" width="490" height="80" rx="22" fill="${P.sun}" opacity="${n2(.28 + .2 * pulse(t, t0, .05, .5) + (lit ? .3 : 0))}"/>` + TF(1006, y, k, `<circle r="30" fill="${P.ink}" filter="url(#dropS)"/>${T(0, 15, n, 42, P.sun)}`); });
  return `<g filter="url(#drop)"><rect x="0" y="0" width="1080" height="640" rx="20" fill="url(#gPaper)"/></g><g stroke="#BFD0F0" stroke-width="2.5">${Array.from({ length: 10 }, (_, i) => `<path d="M30 ${180 + i * 45} H1050"/>`).join("")}</g><path d="M90 0 V640" stroke="#FFB3B3" stroke-width="3"/>
    <text x="120" y="66" font-family="Fredoka" font-weight="700" font-size="50" fill="${P.ink}">Things in our box</text>
    <g transform="translate(900 52) rotate(8)"><rect x="-84" y="-30" width="168" height="60" rx="12" fill="none" stroke="${P.coral}" stroke-width="5"/>${T(0, 14, "Day 1", 38, P.coral, { ls: 2 })}</g>
    <rect x="110" y="96" width="446" height="74" rx="14" fill="${P.leafDeep}"/><rect x="548" y="96" width="502" height="74" rx="14" fill="${P.blueDeep}"/>
    ${T(330, 148, "LIVING THINGS", 38, "#fff", { ls: 3 })}${T(800, 148, "NON-LIVING THINGS", 38, "#fff", { ls: 3 })}
    <path d="M552 170 V610" stroke="${P.ink2}" stroke-width="4"/>${b}
    ${row(130, RY[0], "mealworm", "mealworm")}${row(130, RY[1], "bean", "green bean", { fresh: 1 })}
    ${row(570, RY[0], "teddy", "teddy bear")}${row(570, RY[1], "robot", "wind-up robot")}${row(570, RY[2], "plant", "plant", { op: 1 - fix * .9, smudge: fix })}${row(570, RY[3], "pebble", "pebble")}
    <g opacity=".6"><ellipse cx="760" cy="578" rx="150" ry="22" fill="#C9CEDF" filter="url(#b4)"/><text x="680" y="592" font-family="Fredoka" font-weight="600" font-size="44" fill="#AEB4CC" opacity=".6">green bean</text></g>`
    + (wr > 0 ? `<clipPath id="hwW"><rect x="120" y="${RY[2] - 50}" width="${n2(430 * wr)}" height="100"/></clipPath><g clip-path="url(#hwW)">${row(130, RY[2], "plant", "plant", { fresh: 1 })}</g>` : "")
    + (st.tick ? TF(470, RY[2], spring(t, st.tick, .45), `<circle r="32" fill="${P.leaf}" stroke="#fff" stroke-width="5"/><path d="M-14 2 L-4 12 L15 -10" fill="none" stroke="#fff" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>`) : ""); }
function homeworkSheet(t, st, x = 420, y = 150, sc = 1) { return `<g transform="translate(${x + 540} ${y}) scale(${n2(sc)}) rotate(-1) translate(-540 0)">${homework(t, st)}</g>`; }
SC.show = (t, s) => { const r0 = MK("ring0_4"), bell = r0 + 6, rs = ringState(t, r0, 6), shut = pulse(t, bell, .01, .6), tS = LT("h1004") - .08, tb0 = LT("b1005") - .5, zb = ss(tb0, tb0 + .4, t);
  const q = "h1003", nf = t >= W(q, "three") - .1 ? 3 : t >= W(q, "two") - .1 ? 2 : 1, lit = t < W(q, "one") - .1 ? 0 : t < r0 ? nf : 0;
  let out = bg("stage") + homeworkSheet(t, { badges: t >= W(q, "one") - .2 ? 1 : null, lit }, lerp(330, 420, zb), lerp(140, 110, zb), lerp(1, .86, zb));
  // the ring (6 s) and the YOU fingers: 1, 2 or 3
  const rk = spring(t, W(q, "is") - .2, .45) * (1 - zb);
  if (rk > .02) out += TF(1650, 420, rk, `<g transform="scale(.62)">${ringTimer(0, 0, t < r0 ? 1 : t < bell ? rs.frac : 0, t < r0 ? 6 : t < bell ? rs.secs : 0, t, { tick: rs.tick, shut, inner: T(0, 40, "?", 190, "#fff") })}</g>`)
    + (t >= W(q, "one") - .1 ? TF(1650, 830, rk * 1.15 * (1 + .1 * pulse(t, [W(q, "one"), W(q, "two"), W(q, "three")][nf - 1], .03, .3)), `<g filter="url(#dropS)">${countHand(nf)}</g>`) + youPill(1650, 640, 1.1 * rk) : "") + OP(ramp(t, W(q, "show"), .3) * (1 - zb), tpill(1380, 1010, "1, 2 or 3 fingers", 34, P.ink, "#fff"));
  // Pip presents; after the bell the three answer
  const X = [300, 960, 1620];
  if (t < tb0) out += buddy("pip", 170, 1066, 300, t, { aura: true, in: s.t0 + .1, poses: [[s.t0, "pointing"], [LT("p1001") - .1, "sit"], [LE("p1001") + .1, "pointing"], [r0, "thinking"]] }) + say("p1001", 330, 660, t, { size: 40, maxW: 520, tail: -90 });
  else { const picks = [["pip", "p1007", null, true], ["basil", "b1005", "2"], ["momo", "m1006", "2"]]; let cards = "";
    picks.forEach(([w, id, word, x], i) => { const sp = speaking(w, t), hh = 300 * (sp ? 1.06 : 1); out += buddy(w, X[i], 1066, hh, t, { aura: true, flip: i === 2, poses: [[tb0, w === "basil" ? "arms_crossed" : "thinking"], [LT(id) - .12, "sit"], ...(w === "basil" ? [[LE(id) + .1, "arms_crossed"]] : [])] });
      if (word) cards += pickCard(w, X[i] + hh * .66 * (i === 2 ? -1 : 1), 1066 - hh * .3, t, LT(id) - .1, word, "purple");
      out += say(id, X[i] + (i === 0 ? 90 : i === 2 ? -90 : 0), 1066 - hh - 110, t, { x: !!x, size: 42, maxW: 600, tail: i === 0 ? -90 : i === 2 ? 90 : 0 }); }); out += cards; }
  return out + stamp(t, tS, 960, 420) + bellIcon(t, r0) + HUD(t); };

/* the replay: the plant on DAY 1 and on DAY 14 (speeded up). Same pot, same spot; a new leaf; it leans towards the light from the window */
function plantHalf(t, x0, day, st, o = {}) { const w = 900, id = "ph" + day;
  return `<clipPath id="${id}"><rect x="${x0}" y="150" width="${w}" height="780" rx="40"/></clipPath><g filter="url(#drop)"><rect x="${x0}" y="150" width="${w}" height="780" rx="40" fill="#C5B1EE"/></g><g clip-path="url(#${id})">
    <rect x="${x0}" y="150" width="${w}" height="780" fill="url(#rpWall)"/><rect x="${x0 + 30}" y="190" width="330" height="520" rx="10" fill="url(#rpSky)"/><g filter="url(#b4)" opacity=".8"><rect x="${x0 + 60}" y="330" width="120" height="380" fill="#E9A7A0"/><rect x="${x0 + 210}" y="420" width="110" height="290" fill="#D9B3D6"/></g><circle cx="${x0 + 110}" cy="270" r="90" fill="#FFF3B8" opacity=".8" filter="url(#b30)"/>
    <g fill="none" stroke="#F7F1FF" stroke-width="22"><rect x="${x0 + 30}" y="190" width="330" height="520" rx="10"/><path d="M${x0 + 195} 190 V710"/></g><path d="M${x0 + 30} 450 H${x0 + 360}" stroke="#F7F1FF" stroke-width="8"/>
    ${o.band ? `<g style="mix-blend-mode:screen" opacity="${n2(o.band)}"><path d="M${x0 + 60} 240 L${x0 + 340} 300 L${x0 + 660} 560 L${x0 + 470} 640z" fill="#FFE27A" filter="url(#b4)"/></g><path d="M${x0 + 200} 290 L${x0 + 520} 560" stroke="${P.sun}" stroke-width="10" stroke-linecap="round" opacity="${n2(o.band)}"/>` : ""}
    ${o.cicak ? `<g transform="translate(${x0 + 150} 204) scale(${n2(.95 * o.cicak)}) rotate(-12)" opacity="${n2(Math.min(1, o.cicak))}">${cicak()}</g>` : ""}
    <rect x="${x0}" y="760" width="${w}" height="170" fill="url(#xLedge)"/><rect x="${x0}" y="760" width="${w}" height="8" fill="#fff" opacity=".7"/>
    ${groundShadow(x0 + 590, 800, 150, 16, .3)}${o.ghost ? `<g opacity="${n2(o.ghost)}" filter="url(#ghostF)">${TF(x0 + 590, 690, 1.75, potPlant({}))}</g>` : ""}${TF(x0 + 590, 690, 1.75, potPlant(st))}</g>
    ${o.nocounter ? "" : `<g transform="translate(${x0 + 300} 776) scale(.6)">${counter(t, day, o.flip || -9, 0, 0, 1, { nodots: true })}</g>`}`; }
const RPDEFS = () => `<defs>${lg("rpWall", [[0, "#8E86E0"], [.7, "#C5B1EE"], [1, "#E6C4DA"]])}${lg("rpSky", [[0, "#7FB7FF"], [.6, "#CFE6FF"], [1, "#FFE9C8"]])}</defs>`;
SC.replay = (t, s) => { const L = "h1008", tg = W(L, "from") - .1, g = eio((t - tg) / 2.6), tNew = W(L, "new"), tLight = W(L, "light") - .3, tT = W(L, "living") - .15, tCi = W(L, "it"), ck = spring(t, tCi, .4) * (1 - ramp(t, tCi + 2.4, .3));
  const day = Math.round(lerp(1, 14, g)), nuP = 1 + .3 * pulse(t, tNew + .1, .1, .7);
  return bg("stage") + RPDEFS() + TF(0, 0, 1, plantHalf(t, 40, 1, {}, {})) + plantHalf(t, 980, day, { lean: 15 * g, nu: Math.min(1, g * 1.25) }, { band: ramp(t, tLight, .5) * .9, cicak: ck, ghost: .55 * ss(.5, 1, g), flip: -9 })
    + (t > tNew - .1 ? OP(pulse(t, tNew, .1, 1.6), `<circle cx="${980 + 590 - 70 * 1.75 - 15 * 3.4 * 1.75}" cy="${690 - 214 * 1.75}" r="${n2(84 * nuP)}" fill="none" stroke="${P.sun}" stroke-width="9"/>`) + OP(ramp(t, tNew, .25) * (1 - ramp(t, tLight, .3)), tpill(1690, 360, "a new leaf", 38, "#fff", P.ink, { w: 700 })) : "")
    + OP(ramp(t, tLight + .3, .3), tpill(1210, 990, "light from the window", 34, P.ink, P.sun)) + tag(t, tT, 1430, 330, true, 1.3) + speeded(t, tg, tg + 4, 1700, 1010) + HUD(t); };

SC.fixed = (t, s) => { const tR = s.t0 + .25, fix = ss(tR, tR + .6, t), wr = ss(tR + .7, LT("p1009") + .25, t), tk = LT("p1009") + .35, tc = WE("h1010", "fingers") + .25, tb = tc + .6;
  const px = t < tR + .65 ? 420 + 720 + 60 * Math.sin((t - tR) * 26) : 420 + 240 + 180 * wr, py = 150 + 405;
  return bg("stage") + homeworkSheet(t, { fix, write: wr, tick: tk }, 420, 150, 1) + (t > tR - .2 && t < tk ? TF(px + 40, py - 20, .8, `<g transform="rotate(${t < tR + .65 ? 150 : -40})">${pencil()}</g>`) : "")
    + buddy("pip", 190, 1066, 330, t, { aura: true, poses: [[s.t0, "thinking"], [LT("p1009") - .1, "sit"], [LE("p1009") + .1, "cheer"]] }) + say("p1009", 350, 640, t, { size: 40, maxW: 500, tail: -90 })
    + coin(t, tc, 1660, 380, "+2", "if you showed two fingers") + coin(t, tb, 1660, 620, "+2", "Basil and Momo") + (t >= W("h1010", "put") ? TF(1700, 900, spring(t, W("h1010", "put"), .4) * 1.1, `<g filter="url(#dropS)">${countHand(t >= W("h1010", "more") ? 3 : 1)}</g>`) : "") + HUD(t); };
if (P2) SCORE.push([WE("h1010", "fingers") + .25, 3, 0], [WE("h1010", "fingers") + .85, 3, 2]);

/* ============ 11 · three ways to show the groups ============ */
SC.ways = (t, s) => { const a = "h1101", b = "h1102", tp = W(b, "pictures"), tt = W(b, "table"), tg = W(b, "graphic"), tOther = W(a, "other");
  const fr = (x, head, t0, bumpT, inner) => { const k = spring(t, t0, .5); if (k < .02) return ""; return TF(x, 420, k * (1 + .06 * pulse(t, bumpT, .05, .6)), `<g filter="url(#${t >= bumpT - .05 && t < bumpT + 1.2 ? "glowS" : "drop"})"><rect x="-285" y="-260" width="570" height="560" rx="40" fill="url(#gPaper)"/><path d="M-285 -220 Q-285 -260 -245 -260 H245 Q285 -260 285 -220 V-170 H-285z" fill="url(#gSun)"/></g>${T(0, -196, head, 40, P.ink, { ls: 3 })}${inner}`); };
  const mini = (k, x, y, sc) => TF(x, y, sc, TH[k]());
  const pics = `<rect x="-262" y="-150" width="250" height="420" rx="24" fill="#DFF5E4"/><rect x="12" y="-150" width="250" height="420" rx="24" fill="#DCEBFF"/>${mini("bean", -137, 10, .62)}${mini("dish", -137, 110, .6)}${mini("plant", -137, 250, .55)}${mini("teddy", 137, 10, .6)}${mini("robot", 137, 140, .52)}${mini("pebble", 137, 240, .6)}`;
  const cell = (x, y, s2, w = 600) => `<text x="${x}" y="${y}" font-family="Fredoka" font-weight="${w}" font-size="27" fill="${P.ink}" text-anchor="middle">${s2}</text>`;
  const table = `<rect x="-262" y="-150" width="524" height="64" rx="12" fill="${P.blueDeep}"/><rect x="-262" y="-150" width="262" height="64" rx="12" fill="${P.leafDeep}"/><rect x="-20" y="-150" width="40" height="64" fill="${P.blueDeep}"/><rect x="-262" y="-150" width="524" height="400" rx="12" fill="none" stroke="${P.ink2}" stroke-width="4"/><path d="M0 -150 V250 M-262 -86 H262 M-262 26 H262 M-262 138 H262" stroke="${P.ink2}" stroke-width="3"/>
    ${T(-131, -108, "Living things", 28, "#fff")}${T(131, -108, "Non-living things", 27, "#fff")}${cell(-131, -22, "green bean plant")}${cell(-131, 90, "mealworm")}${cell(-131, 202, "plant")}${cell(131, -22, "teddy bear")}${cell(131, 90, "wind-up robot")}${cell(131, 202, "pebble")}`;
  const bub = (x, y, w, txt, col) => `<rect x="${x - w / 2}" y="${y - 34}" width="${w}" height="68" rx="34" fill="${col}"/>${T(x, y + 10, txt, 27, "#fff")}`;
  const org = `<path d="M0 -76 L-136 30 M0 -76 L136 30" stroke="${P.ink2}" stroke-width="5" stroke-linecap="round"/>${bub(0, -110, 300, "Things in our box", P.ink)}${bub(-136, 50, 236, "Living things", P.leafDeep)}${bub(136, 50, 250, "Non-living things", P.blueDeep)}
    ${cell(-136, 120, "green bean plant", 500)}${cell(-136, 160, "mealworm", 500)}${cell(-136, 200, "plant", 500)}${cell(136, 120, "teddy bear", 500)}${cell(136, 160, "wind-up robot", 500)}${cell(136, 200, "pebble", 500)}<path d="M-136 84 V96 M136 84 V96" stroke="${P.ink2}" stroke-width="4" stroke-linecap="round"/>`;
  // Mark Sentence 3 on a paper card, word by word (two lines)
  const L = TL.lines[b], LNS = ["We can present our classification using", "pictures, a table, and a graphic organiser."], size = 58, keys = ["pictures,", "table,", "graphic", "organiser."]; let tx = "", wi = 0; const sp = tw(" ", size, 700, "Atkinson Hyperlegible");
  LNS.forEach((ln, li) => { const total = tw(ln, size, 700, "Atkinson Hyperlegible"); let cx = 0; ln.split(" ").forEach((w) => { const wt = L.words[wi++].a, o = ramp(t, wt - .05, .15), ww = tw(w, size, 700, "Atkinson Hyperlegible"), y = 856 + li * 78;
    if (o > 0) tx += (keys.includes(w) ? `<rect x="${n2(960 - total / 2 + cx - 5)}" y="${y - 24}" width="${n2((ww + 10) * eo((t - wt) / .3))}" height="30" rx="6" fill="#FFD75A"/>` : "") + `<text x="${n2(960 - total / 2 + cx)}" y="${y}" font-family="Atkinson Hyperlegible" font-weight="700" font-size="${size}" fill="${P.ink}" opacity="${n2(o)}">${esc(w)}</text>`; cx += ww + sp; }); });
  const sk = spring(t, LT("b1101") - .9, .5);
  return bg("stage2") + `<g transform="translate(960 505) scale(.86) translate(-960 -420)">` + fr(360, "PICTURES", tOther - .1, tp, pics) + fr(960, "A TABLE", s.t0 + .15, tt, table) + fr(1560, "A GRAPHIC ORGANISER", tOther + .12, tg, org) + `</g>`
    + (sk > .02 ? TF(960, 905, sk, `<g transform="translate(-960 -880) rotate(-.6 960 880)"><g filter="url(#drop)"><rect x="330" y="780" width="1260" height="200" rx="28" fill="url(#gPaper)"/><rect x="330" y="780" width="20" height="200" rx="10" fill="${P.sun}"/></g><g transform="translate(370 750)"><rect x="0" y="0" width="350" height="58" rx="29" fill="url(#gSun)" filter="url(#dropS)"/><g transform="translate(34 29)"><circle r="17" fill="${P.ink}"/><path d="M-8 0 L-2 6 L9 -6" fill="none" stroke="${P.sun}" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/></g>${T(64, 40, "MARK SENTENCE", 30, P.ink, { a: "start", ls: 3 })}</g>${T(1560, 818, "3 of 3", 26, P.ink2, { a: "end", w: 600 })}${tx}</g>`) : "")
    + buddy("basil", 150, 1062, 230, t, { aura: true, in: LT("b1101") - .7, poses: [[LT("b1101") - .7, "cheer"], [LT("b1101") - .12, "sit"], [LE(b) + .2, "cheer"]], nohop: true, jump: [[LT("b1101") - .1, 24]] }) + say("b1101", 300, 700, t, { size: 42, tail: -110 })
    + HUD(t); };

/* ============ 12 · Day 30 ============ */
const D30 = { day: 30, lean: 16, nu: 2, bites: 3, wl: 112, wx: -30, wb: .35, cid: "c30" };
SC.day30 = (t, s) => { const a = "h1201", b = "h1202", tr = MK("reveal"), B = BOX, u = (t - tr), spin = clamp((t - s.t0 - .1) / 1.1), day = Math.round(lerp(14, 30, eio(spin)));
  const fly = clamp(u / .55), bump = t < tr ? 30 * (pulse(t, s.t0 + .9, .15, .5) + pulse(t, LE(a) + .3, .15, .5) + pulse(t, tr - .5, .15, .4)) : 0;
  // camera: wide while the cloth is on; then each thing as Heart names it; then wide with the DAY 1 outlines
  const shots = [[tr, 1.0, 960, 560], [W(b, "green") - .2, 1.5, B.bean + 40, 520], [W(b, "mealworm") - .25, 2.2, B.dish, 730], [W(b, "plant", 1) - .25, 1.6, B.plant + 30, 560], [W(b, "and") - .2, 1.55, 1320, 660], [W(b, "exactly") - .2, 1.0, 960, 560]];
  let cam = [1.04, 960, 540]; if (t >= tr) { let i = 0; shots.forEach((sh, k) => { if (t >= sh[0]) i = k; }); const p = shots[Math.max(0, i - 1)], c = shots[i], e = i ? eio((t - c[0]) / .5) : 1; cam = [lerp(p[1], c[1], e), lerp(p[2], c[2], e), lerp(p[3], c[3], e)]; }
  const gh = t >= tr ? .55 + .35 * pulse(t, W(b, "exactly"), .2, 1.2) : 0;
  const cl = fly < 1 ? `<g transform="translate(${n2(900 * ei(fly))} ${n2(-1100 * eo(fly))}) rotate(${n2(24 * fly)} 960 500)">${cloth(bump)}</g>` : "";
  const cheer = tr + .15;
  return boxView(t, { cam, st: { ...D30, ghost: gh, robotX: B.robot1, robot: robotWalkStop(0, 0), sway: t >= tr ? 1.2 * wob(t, tr + .1, 1.2) : 0 }, over: cl })
    + buddy("pip", 180, 1066, 280, t, { aura: true, tag: false, poses: [[s.t0, "pointing"], [cheer, "cheer"], [cheer + 2.2, "sit"]], out: W(b, "green") - .3 }) + buddy("momo", 1740, 1066, 280, t, { aura: true, tag: false, flip: true, poses: [[s.t0, "pointing"], [tr - .6, "surprised"], [cheer + .1, "cheer"], [cheer + 2.2, "sit"]], out: W(b, "green") - .3 })
    + buddy("basil", 1400, 1070, 250, t, { aura: true, tag: false, flip: true, in: tr + .2, poses: [[tr + .2, "cheer"]], out: W(b, "green") - .3 })
    + counter(t, day, spin < 1 ? s.t0 + .1 + Math.floor(spin * 8) / 8 * 1.1 : -9) + HUD(t); };

/* two picture piles + the win strip + the chant */
SC.piles = (t, s) => { const L = "h1203", tA = W(L, "three") - .1, tB = W(L, "three", 1) - .1, ch = TL.lines.c1204;
  const pile = (x, head, col, bgc, ks, t0) => { const k = spring(t, t0, .5); if (k < .02) return ""; let th = ""; ks.forEach(([nm, dx, dy, sc], i) => { th += TF(dx, dy, sc * spring(t, t0 + .12 + i * .1, .4), TH[nm]()); });
    return TF(x, 350, k * .8, `<g filter="url(#drop)"><rect x="-400" y="-170" width="800" height="400" rx="40" fill="${bgc}"/></g><g transform="translate(0 -170) rotate(-1.5)" filter="url(#dropS)"><rect x="${-(tw(head, 46, 700, "Fredoka", 5) + 80) / 2}" y="-40" width="${tw(head, 46, 700, "Fredoka", 5) + 80}" height="80" rx="40" fill="${col}"/>${T(0, 16, head, 46, "#fff", { ls: 5 })}</g>${th}`); };
  // the win strip: the three Mark Sentences fly past in gold, each with a tick
  const wins = ["This is called diversity.", "Classification is the grouping of things…", "pictures, a table, and a graphic organiser"]; let strip = "";
  wins.forEach((w, i) => { const t0 = s.t0 + 1.2 + i * 1.5, x = lerp(2300, 130 + i * 590, eo((t - t0) / .6)); if (t < t0) return; const ww = 560;
    strip += `<g transform="translate(${n2(x)} 1044)"><rect x="0" y="-27" width="${ww}" height="54" rx="27" fill="url(#gSun)"/><circle cx="30" cy="0" r="17" fill="${P.leafDeep}"/><path d="M22 1 L28 7 L39 -6" fill="none" stroke="#fff" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/><text x="58" y="9" font-family="Atkinson Hyperlegible" font-weight="700" font-size="27" fill="${P.ink}">${esc(w)}</text></g>`; });
  // the chant: "Say it with us!", then call and response (one phrase at a time, big), then all together
  const st = chantState(ch, t), cur = st.ph; let line = "";
  if (cur >= 0 && st.tb < ch.nbars) { const k = spring(t, st.t0, .3), sc = st.turn ? 1.04 + .03 * Math.sin((t - ch.t) / ch.bar * Math.PI * 4) : 1; line = TF(715, 640, k * sc, (st.turn ? `<rect x="-470" y="-58" width="940" height="124" rx="40" fill="${P.sun}" opacity=".16"/>` : "") + `<g transform="translate(0 6)" opacity=".8">${T(0, 30, PHR[cur], 92, P.ink, { ls: 2 })}</g>` + T(0, 30, PHR[cur], 92, cur === 1 ? "#fff" : P.sun, { ls: 2 })); }
  const beats = chantBeats(ch), jumps = beats.filter((b2) => b2[1] === "s" && !b2[2]).map((b2) => [b2[0] - .2, 28]);
  let buds = ""; [["pip", 300], ["basil", 715], ["momo", 1130]].forEach(([w, x]) => { buds += buddy(w, x, 962, 230, t, { aura: true, in: s.t0 + .2, jump: t >= ch.t ? jumps : [], poses: [[s.t0, "cheer"], [LT("u1203") - .15, "sit"], [ch.end - .25, "cheer"]], nohop: t < s.t0 + .5 }); });
  return bg("stage2") + pile(380, "LIVING THINGS", P.leafDeep, "#DFF5E4", [["bean", -250, 200, 1.45], ["dish", 20, 190, 1.35], ["plant", 270, 190, 1.2]], tA) + pile(1050, "NON-LIVING THINGS", P.blueDeep, "#DCEBFF", [["teddy", -250, 196, 1.5], ["robot", 10, 200, 1.4], ["pebble", 260, 190, 1.5]], tB)
    + line + buds + say("u1203", 715, 600, t, { size: 50, col: P.basil, tail: 0, merge: true }) + yourTurn(t, ch, 1640, 700, 1.05) + (st.together && st.tb < ch.nbars ? TF(715, 540, spring(t, ch.t + 8 * ch.bar, .4), tpill(0, 0, "All together!", 38, P.sun, P.ink, { w: 700 })) : "") + strip + HUD(t); };

/* ============ 13 · the score hand, the cicak, the dare, "Now you know!" ============ */
SC.final = (t, s) => { const L = "h1301", t5 = W(L, "three") - .1, thi = W(L, "high") - .05, tm = W(L, "more"), nf = t >= t5 ? 3 : t >= tm ? 2 : 1, hi = pulse(t, thi + .25, .12, .6);
  let out = bg("stage") + `<g transform="translate(960 ${n2(lerp(-200, 200, eo((t - s.t0) / .35)))})">${scoreboard(t, 0, 0, 1.6, { you: "?", bud: 2 })}</g>`
    + TF(960, 760 - 60 * hi, 1.85 * spring(t, s.t0 + .25, .5) * (1 + .1 * hi), `<g filter="url(#drop)">${countHand(nf)}</g>`) + youPill(960, 430, 1.3)
    + OP(hi, `<g stroke="${P.sun}" stroke-width="12" stroke-linecap="round">${[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => { const an = -Math.PI * (.05 + i * .1125), r1 = 300 + 60 * (1 - hi), r2 = r1 + 80; return `<path d="M${n2(960 + Math.cos(an) * r1)} ${n2(640 + Math.sin(an) * r1)} L${n2(960 + Math.cos(an) * r2)} ${n2(640 + Math.sin(an) * r2)}"/>`; }).join("")}</g>`)
    + (t >= tm && t < t5 ? TF(1330, 480, spring(t, tm, .4), tpill(0, 0, "More than 2? You win!", 40, P.sun, P.ink, { w: 700 })) : "") + (t >= thi ? TF(1330, 480, spring(t, thi, .4), tpill(0, 0, "HIGH FIVE!", 52, P.sun, P.ink, { w: 700, ls: 4 })) : "");
  [["pip", 230, false], ["basil", 610, false], ["momo", 1600, true]].forEach(([w, x, fl], i) => { out += buddy(w, x, 1060, i === 1 ? 250 : 300, t, { aura: true, flip: fl, poses: [[s.t0, "sit"], [thi - .15, "cheer"]], jump: [[thi + .05, 90]] }); });
  return out + logo(t); };

SC.cicak = (t, s) => { const L = "h1302", z = lerp(1, 1.9, eio((t - s.t0 - .2) / 1.2)), tq = W(L, "is", 1) - .1, tTell = W(L, "tell") - .1, cx = 980 + 150, cy = 204;
  return bg("stage") + RPDEFS() + CAM(plantHalf(t, 40, 1, {}, { nocounter: 1 }) + plantHalf(t, 980, 14, { lean: 15, nu: 1 }, { band: .5, cicak: 1 }) + `<circle cx="${cx}" cy="${cy}" r="${n2(58 + 5 * Math.sin(t * 6))}" fill="none" stroke="${P.sun}" stroke-width="7"/>`, z, cx + 84, cy + 126, 1)
    + (t >= tq ? TF(960, 820, spring(t, tq, .45), `<g filter="url(#drop)"><rect x="-520" y="-60" width="1040" height="120" rx="60" fill="${P.ink}"/></g>${T(0, 20, `A lizard: <tspan fill="#7BE08F">living</tspan> or <tspan fill="#8CC8FF">non-living</tspan>?`, 58, "#fff")}`) : "")
    + (t >= tTell ? TF(960, 960, spring(t, tTell, .45), tpill(0, 0, "Tell someone at home!", 44, P.sun, P.ink, { w: 700 })) : "") + HUD(t); };

SC.day31 = (t, s) => { const B = BOX, tf = s.t0 + .35, droop = ss(tf, tf + 1.6, t) * .9, h = "h1304", tNext = W(h, "lock") - .2, z = lerp(1.0, 1.55, eio((t - s.t0) / 2.2));
  return boxView(t, { cam: [z, B.plant + 180, 600], st: { ...D30, droop, lean: 16 * (1 - droop * .5), robotX: B.robot1, robot: robotWalkStop(0, 0) } })
    + buddy("momo", 1560, 1066, 380, t, { flip: true, aura: true, tag: false, poses: [[s.t0, "sit"], [tf + .3, "surprised"], [LT("m1303") - .1, "sit"], [LE("m1303") + .1, "oops"], [W(h, "what"), "thinking"]] }) + say("m1303", 1420, 560, t, { size: 50, tail: 80 })
    + (t >= tNext ? TF(800, 190, spring(t, tNext, .45), `<g filter="url(#drop)"><rect x="-560" y="-64" width="1120" height="128" rx="64" fill="${P.ink}"/></g>${T(0, 20, `<tspan fill="${P.sun}">NEXT:</tspan> A drooping plant isn’t sad.`, 60, "#fff")}`) : "")
    + (() => { const d = t >= tf ? 31 : 30; return counter(t, d, tf); })() + HUD(t); };

SC.nyk = (t, s) => { const U = "u1300", R = "h1304b", L = "h1305", t0 = LT(L) - .05, k = lerp(2.4, 1, eo((t - t0) / .18)) + .05 * wob(t, t0 + .18, .5), on = t >= t0, tOne = W(R, "one"), tTwo = W(R, "two");
  let rays = ""; for (let i = 0; i < 18; i++) { const a = i * 20 + (t - s.t0) * 9; rays += `<path d="M960 520 L${n2(960 + Math.cos(a * Math.PI / 180) * 1600)} ${n2(520 + Math.sin(a * Math.PI / 180) * 1600)} L${n2(960 + Math.cos((a + 9) * Math.PI / 180) * 1600)} ${n2(520 + Math.sin((a + 9) * Math.PI / 180) * 1600)}z" fill="#FFE27A" opacity=".5"/>`; }
  let out = `<rect width="1920" height="1080" fill="url(#gSun)"/>${rays}<circle cx="960" cy="520" r="420" fill="#FFF3B8" opacity=".7" filter="url(#b60)"/>`;
  // OUR BOX with all six things (as they are at the end of this part)
  const d = PART === 1 ? 5 : 30, six = TF(-98, -34, .2, potPlant(PART === 1 ? {} : { nu: 2, lean: 10 })) + TF(-58, -8, PART === 1 ? .34 : .17, beanPlant(d, { maxH: 620 })) + TF(-14, -8, .3, wormDish({ id: "nk", bites: 2, wl: PART === 1 ? 76 : 100 })) + TF(34, -8, .2, robotRig({})) + TF(72, -18, .22, pebble()) + TF(104, -8, .2, teddyKey());
  out += TF(790, 1040, 1.9, ourBox(six, { lid: 1 }));
  // the buddies: "Say it with us!" (sitting, talking), then arms up on "Now you know!", then they keep bouncing
  const loop = []; for (let j = 0; j < 9; j++) loop.push([t0 + 1.0 + j * .62, 34]);
  [["pip", 300, false], ["basil", 1650, true], ["momo", 1275, true]].forEach(([w, x, fl], i) => { out += buddy(w, x, 1040, 320, t, { aura: true, flip: fl, in: s.t0 + .05 + i * .06, poses: [[s.t0, "waving"], [LT(U) - .12, "sit"], [LE(U) + .15, "pointing"], [t0 - .1, "sit"], [LE("u1305") + .05, "cheer"]], wave: true, nohop: true, jump: [[t0, 70], ...loop.map(([a, b]) => [a + i * .1, b])] }); });
  out += say(U, 960, 430, t, { size: 60, col: P.basil, tail: 0, merge: true });
  // "Ready? One, two..."
  const cnt = t >= tTwo ? "2" : t >= tOne ? "1" : t >= LT(R) ? "Ready?" : ""; if (cnt && t < t0) { const tc = cnt === "2" ? tTwo : cnt === "1" ? tOne : LT(R); out += TF(960, 300, lerp(1.8, 1, eo((t - tc) / .14)), `<text x="0" y="60" font-family="Fredoka" font-weight="700" font-size="${cnt.length > 1 ? 150 : 230}" text-anchor="middle" fill="#fff" stroke="${P.ink}" stroke-width="26" stroke-linejoin="round" paint-order="stroke">${cnt}</text>`); }
  // YOU join in
  out += OP(ramp(t, LT(U), .3), TF(790, 590, 1, youPill(0, 0, 1.1)) + (on ? OP(pulse(t, t0, .05, 1.4), `<g stroke="#fff" stroke-width="9" stroke-linecap="round"><path d="M700 570 l-40 -22 M880 570 l40 -22 M790 545 v-36"/></g>`) : ""));
  if (on) { out += `<g transform="translate(960 300) scale(${n2(k * (1 + .015 * Math.sin((t - t0) * 3)))}) rotate(-3)"><text x="0" y="50" font-family="Fredoka" font-weight="700" font-size="190" text-anchor="middle" letter-spacing="4" fill="#fff" stroke="${P.ink}" stroke-width="30" stroke-linejoin="round" paint-order="stroke" filter="url(#drop)">Now you know!</text><text x="0" y="50" font-family="Fredoka" font-weight="700" font-size="190" text-anchor="middle" letter-spacing="4" fill="#fff">Now you know!</text></g>`;
    for (let i = 0; i < 22; i++) { const life = 1.1 + hash(i, 3) * .8, v = (((t - t0) + hash(i, 5) * 3) % life) / life, x = 120 + hash(i, 7) * 1680, y = 120 + hash(i, 9) * 560 + 50 * v; out += `<g transform="translate(${n2(x)} ${n2(y)}) scale(${n2((.5 + hash(i, 2) * .7) * Math.sin(Math.PI * v))}) rotate(${n2(90 * v + 20 * i)})"><path d="M0-32 Q4-4 32 0 Q4 4 0 32 Q-4 4 -32 0 Q-4-4 0-32z" fill="#fff"/></g>`; } }
  return out + logo(t); };
