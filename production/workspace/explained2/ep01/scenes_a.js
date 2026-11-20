// scenes_a.js: segments 1-3: the silent cold open, the hook, the title, the practice lock-in, the game, the goals. Also the shared lock-in scene.
window.SC = window.SC || {};
const HUD = (t, o = {}) => (o.logo === false ? "" : logo(t)) + (o.score === false ? "" : scoreboard(t));
// the box on its ledge: far plane (mode a -> b cross-fade for time passing), the box, its things. cam = [zoom, cx, cy]
function boxView(t, o = {}) { const cam = o.cam || [1 + .03 * (o.push || 0), 960, 560], st = o.st || {}, m = o.mode || "day";
  let far = bg("boxfar_" + m); if (o.mode2 && o.mix > 0) far += OP(o.mix, bg("boxfar_" + o.mode2));
  const dark = o.dark || 0;
  return CAM(far + (o.farOver || ""), cam[0], cam[1], cam[2], .35) + CAM(boxBack() + (o.behind || "") + boxThings(st) + (o.inside || "") + (dark ? `<rect x="360" y="230" width="1200" height="640" rx="30" fill="#120E2E" opacity="${n2(dark * .45)}"/>` : "") + boxFront(o.front || {}) + (o.over || ""), cam[0], cam[1], cam[2], 1); }

/* ============ BG: the bedroom, wide (cold open) ============ */
BG.room = () => { const r = rndm(5); let floor = ""; for (let i = 0; i < 9; i++) floor += `<path d="M${-400 + i * 340} 1190 L${520 + i * 110} 760" stroke="#8E6A66" stroke-width="3" opacity=".3"/>`;
  return `<defs>${lg("rmWall", [[0, "#5E58B0"], [.6, "#8E84C8"], [1, "#B49CC4"]])}${lg("rmFloor", [[0, "#B08A78"], [1, "#7A5648"]])}${lg("rmSky", [[0, "#8FA3C8"], [1, "#C9D3E6"]])}${lg("rmBed", [[0, "#3FD0C3"], [1, "#1B8F92"]])}${lg("rmDesk", [[0, "#E6C39A"], [1, "#B98A5A"]])}</defs>
  <rect x="-200" y="-120" width="2320" height="1320" fill="url(#rmWall)"/><rect x="-200" y="760" width="2320" height="440" fill="url(#rmFloor)"/>${floor}<rect x="-200" y="750" width="2320" height="22" fill="#D9CCE0"/>
  <g clip-path="url(#rmW)"><rect x="330" y="150" width="760" height="470" fill="url(#rmSky)"/><g filter="url(#b2)">${hdbBlock(360, 190, 230, "#B79AA6", "#FF8A66")}${hdbBlock(590, 150, 320, "#A99BBE", "#9B6BFF")}${hdbBlock(790, 250, 190, "#BFA596", "#2EC4B6")}<path d="M330 590 Q500 550 700 585 T1090 570 V640 H330z" fill="#5E9478"/></g></g>
  <g fill="none" stroke="#EEE8FA" stroke-width="16"><rect x="330" y="150" width="760" height="470" rx="14"/><path d="M583 150 V620 M836 150 V620"/></g><g stroke="#EEE8FA" stroke-width="5" opacity=".9"><path d="M330 268 H1090 M330 386 H1090 M330 504 H1090"/></g>
  <g stroke="#B9B2CC" stroke-width="7" stroke-linecap="round" opacity=".8"><path d="M250 190 h70 M250 250 h70 M1100 190 h70 M1100 250 h70"/></g>
  <rect x="290" y="614" width="840" height="34" rx="10" fill="#F1EAFB"/><rect x="290" y="642" width="840" height="12" fill="#8E84C8" opacity=".6"/>
  <g transform="translate(1290 250)"><circle r="62" fill="#FFF8EA" filter="url(#dropS)"/><circle r="62" fill="none" stroke="${P.coral}" stroke-width="10"/><path d="M0 0 L-34 6 M0 0 L4 -46" stroke="${P.ink}" stroke-width="7" stroke-linecap="round"/><circle r="6" fill="${P.ink}"/></g>
  <g transform="translate(1640 330)" filter="url(#dropS)"><rect x="-170" y="0" width="340" height="18" rx="6" fill="#E6C39A"/><rect x="-140" y="-92" width="34" height="92" rx="5" fill="${P.blue}"/><rect x="-102" y="-78" width="28" height="78" rx="5" fill="${P.sun}"/><rect x="-70" y="-100" width="38" height="100" rx="5" fill="${P.coral}"/><rect x="-28" y="-70" width="30" height="70" rx="5" fill="${P.leaf}"/><circle cx="90" cy="-44" r="44" fill="#5FB0FF"/><path d="M70-70 q20 10 10 30 q-14 6-18 22 M102-84 q24 14 26 38" stroke="#57B77A" stroke-width="12" fill="none" stroke-linecap="round"/></g>
  <g style="mix-blend-mode:screen"><path d="M330 630 L1090 630 L1500 1190 L200 1190z" fill="#DCE6FF" opacity=".14" filter="url(#b10)"/></g>
  ${groundShadow(1620, 1010, 330, 30, .3)}<rect x="1360" y="620" width="700" height="250" rx="34" fill="#C99A78"/><rect x="1332" y="780" width="760" height="170" rx="36" fill="#FFF8EA"/>
  <path d="M1332 820 Q1480 780 1640 830 T2092 810 V940 Q2092 976 2056 976 H1368 Q1332 976 1332 940z" fill="url(#rmBed)"/><g fill="#fff" opacity=".3">${[0, 1, 2, 3, 4, 5, 6].map((i) => `<circle cx="${1400 + i * 84}" cy="${890 + (i % 2) * 34}" r="12"/>`).join("")}</g>
  <rect x="1380" y="720" width="250" height="90" rx="40" fill="#FFF8EA" filter="url(#dropS)"/>
  <g filter="url(#b10)" opacity=".94"><path d="M-200 1190 V760 Q-180 600 -40 590 Q120 590 150 760 L190 1190z" fill="#1B1440"/><path d="M-80 600 Q-30 500 30 600" fill="none" stroke="#1B1440" stroke-width="30"/></g>
  <rect x="-200" y="-120" width="2320" height="1320" fill="#2B2A6B" opacity=".16"/>`; };
// rain streaks inside a rectangle (drawn, deterministic)
function rain(t, x, y, w, h, n = 36, len = 34, o = .5) { let s = ""; for (let i = 0; i < n; i++) { const rx = x + hash(i, 3) * w, sp = .9 + hash(i, 5) * .6, ry = y + ((hash(i, 7) + t * sp) % 1) * (h + len) - len; s += `<path d="M${n2(rx)} ${n2(ry)} l${-len * .22} ${len}" stroke="#EAF2FF" stroke-width="3" opacity="${n2(o * (.5 + hash(i, 9) * .5))}" stroke-linecap="round"/>`; } return s; }
// a small empty clear box (wide shot)
const miniBox = () => `<rect x="-120" y="-128" width="240" height="128" rx="10" fill="#E9F4FF" opacity=".3"/><rect x="-120" y="-128" width="240" height="128" rx="10" fill="none" stroke="#F4FAFF" stroke-width="5"/><path d="M-100 -112 L-64 -112 L-92 -16 L-100 -16z" fill="#fff" opacity=".35"/>`;

// close on the box: buddy paws put the six things in, one at a time; the lid; DAY 1. tb = first thing, tl = the lid, rainy = the cold open's weather
function coldBoxShot(t, tb, tl, t30) { const B = BOX;
    const items = [["pebble", B.pebble, B.floor - 30, 50, "#E4E1EC"], ["teddy", B.teddy, B.floor, 200, "#B9B4D6"], ["bean", B.bean, B.floor, 60, "#DCE4DE"], ["plant", B.plant, B.floor - 72, 350, "#E4E1EC"], ["dish", B.dish, B.floor, 60, "#B9B4D6"], ["robot", 880, B.lane, 215, "#DCE4DE"]];
    const hide = {}, drop = []; let paws = "";
    items.forEach(([nm, x, y, hh, col], i) => { const t0 = tb + .15 + i * .78, u = clamp((t - t0) / .42), land = t0 + .42; if (t < t0) { hide[nm] = 1; return; }
      const yy = lerp(-420, 0, 1 - Math.pow(1 - u, 2)), sq = 1 - .12 * wob(t, land, .3) * (t > land ? 1 : 0); drop.push([nm, x, y, yy, sq]);
      const up = clamp((t - land - .08) / .3); if (up < 1) paws += TF(x, y - hh - 6 + yy - up * 700, 1.25, paw(col, "#9C96B8", i % 3)); });
    const st = { day: 1, hide: {} }; for (const k of ["plant", "bean", "dish", "pebble", "teddy", "robot"]) st.hide[k] = 1;
    // draw each landed/falling thing itself (so it can fall and squash)
    const one = (nm) => { const h2 = { plant: 1, bean: 1, dish: 1, pebble: 1, teddy: 1, robot: 1 }; delete h2[nm]; return h2; };
    let things = ""; for (const [nm, x, y, yy, sq] of drop) { if (nm === "robot") continue; things += `<g transform="translate(0 ${n2(yy)}) translate(${x} ${y}) scale(${n2(1 / sq)} ${n2(sq)}) translate(${-x} ${-y})">${boxThings({ day: 1, hide: one(nm) })}</g>`; }
    // the robot: set down, wound up (the key turns: crrk-crrk), then it walks
    const rb = drop.find((d) => d[0] === "robot"); let rob = "";
    if (rb) { const land = tb + .15 + 5 * .78 + .42, tw0 = land + .15, tgo = land + .75, p = Math.max(0, (t - tgo) / .26), x = 880 + Math.min(p, 6) / 6 * (B.robot0 - 880), wind = t > tw0 && t < tgo ? Math.floor((t - tw0) / .15) * .9 + ss(0, .1, (t - tw0) % .15) * .9 : 0;
      rob = TF(x, B.lane + rb[3], B.rs, t < tgo ? robotRig({ key: wind, sy: rb[4] }) : (p < 6 ? robotWalk(p, 1) : robotWalk(6 + (t - tgo - 6 * .26) / .26, 1))); }
    const lidU = clamp((t - tl) / .4), lidY = t < tl ? -600 : lerp(-420, 0, 1 - Math.pow(1 - lidU, 2)) - 10 * wob(t, tl + .4, .3) * (t > tl + .4 ? 1 : 0);
    const tct = tl + .75, ck = t < tct ? 0 : lerp(1.9, 1, eo((t - tct) / .16)) + .05 * wob(t, tct + .16, .35);
    // the camera goes to each thing as it lands, then pulls back for the lid
    const ii = clamp(Math.floor((t - tb - .15) / .78), 0, 5), uu = eio((t - (tb + .15 + ii * .78)) / .4), fx = lerp(ii ? items[ii - 1][1] : 1200, items[ii][1], uu), wide = ss(tl - .5, tl + .3, t), fx2 = ii === 5 && rob ? lerp(fx, 760, ss(tb + 5.2, tb + 6, t)) : fx;
    const z = lerp(1.42, 1.0, wide), ccx = lerp(clamp(fx2, 700, 1220), 960, wide), ccy = lerp(640, 560, wide);
    return CAM(bg("boxfar_rain") + `<g clip-path="url(#bfW)">${rain(t, -80, -40, 1330, 940, 40, 44, .4)}</g>`, z, ccx, ccy, .35) + CAM(boxBack() + things + rob + boxFront({ lid: t < tl ? 0 : 1, lidY }) + paws, z, ccx, ccy)
      + (ck ? `<g transform="translate(180 226) scale(${n2(ck)}) translate(-180 -226)" opacity="${n2(clamp((t - tct) / .08))}">${counter(t, 1, -9)}</g>` : ""); }
/* ============ 1 · the silent cold open ============ */
SC.cold = (t) => { const tb = MK("coldBox"), tl = MK("coldLid"), t30 = MK("coldD30"), tc = MK("coldCut"), B = BOX;
  if (t >= tc) return `<rect width="1920" height="1080" fill="#0B0820"/>`;
  if (t < tb) { const z = 1 + .16 * eio(t / tb);   // wide: the room, rain on the grilles, the empty box on the ledge
    return CAM(bg("room") + `<g clip-path="url(#rmW)">${rain(t, 330, 150, 760, 470, 46, 36, .55)}</g>` + TF(710, 616, 1.25, miniBox()) + `<ellipse cx="710" cy="618" rx="130" ry="10" fill="${P.ink}" opacity=".25" filter="url(#b4)"/>`, z, 710, 520) + lowerPill(60, 960, "Toa Payoh, Singapore", "6.40 am"); }
  if (t < t30) return coldBoxShot(t, tb, tl, t30);
  // flash forward: DAY 30. A cloth covers the box; something inside is pushing it up
  const u = t - t30, day = Math.min(30, 1 + Math.floor(u / .45 * 29)), cy = lerp(-900, 0, eo(u / .4)), bump = 34 * (pulse(t, t30 + .75, .12, .5) + pulse(t, t30 + 1.2, .12, .6));
  return CAM(bg("boxfar_day"), 1.06, 960, 560, .35) + CAM(boxBack() + boxThings({ day: 1, hide: { bean: 1 } }) + boxFront({}) + `<g transform="translate(0 ${n2(cy)})">${cloth(bump)}</g>`, 1.06 + .03 * u, 960, 520) + counter(t, day, t30 + .45); };


/* ============ 2 · the hook: Momo and a teddy bear ============ */
SC.hook = (t, s) => { const L = "h201", tM = LT(L), tT = W(L, "this", 1), tE = W(L, "two"), tF = W(L, "soft"), tL = W(L, "one"), tN = W(L, "one", 1), z = 1 + .04 * (t - s.t0) / (s.t1 - s.t0);
  const q = (x, t0, col) => { const k = spring(t, t0, .45); return k < .02 ? "" : TF(x, 250 + 6 * Math.sin(t * 2 + x), k, `<g filter="url(#drop)"><rect x="-170" y="-48" width="340" height="96" rx="48" fill="${P.ink}"/></g>${T(-22, 20, "LIVING", 52, "#fff", { ls: 8 })}${T(140, 22, "?", 64, P.sun)}`); };
  const eyes = (x1, x2, y, r) => OP(pulse(t, tE + .1, .1, 1.1), `<g fill="none" stroke="${P.sun}" stroke-width="7" filter="url(#b2)"><circle cx="${x1}" cy="${y}" r="${r + 8 * Math.sin(t * 8)}"/><circle cx="${x2}" cy="${y}" r="${r + 8 * Math.sin(t * 8)}"/></g>`);
  const ted = TF(1270, 866, 1.95 * spring(t, tT - .1, .5), teddyBig());
  return CAM(bg("daystage") + `<ellipse cx="660" cy="870" rx="250" ry="34" fill="${P.momo}" opacity=".5"/><ellipse cx="1270" cy="870" rx="250" ry="34" fill="#E9D3B0" opacity=".7"/>`
    + buddy("momo", 660, 866, 430, t, { in: s.t0 + .05 }) + groundShadow(1270, 868, 190, 26, .3) + ted
    + eyes(604, 716, 590, 44) + eyes(1223, 1317, 538, 30)
    + OP(pulse(t, tF + .1, .1, 1.0), `<g stroke="${P.sun}" stroke-width="6" stroke-linecap="round" fill="none"><path d="M520 720 q-30 10 -44 34 M800 720 q30 10 44 34 M1150 720 q-30 10 -44 34 M1392 720 q30 10 44 34"/></g>`)
    + (t >= tM ? TF(660, 950, spring(t, tM, .4), tpill(0, 0, "Momo", 40, P.momo, P.ink, { w: 700 })) : "") + (t >= tT ? TF(1270, 950, spring(t, tT + .1, .4), tpill(0, 0, "teddy bear", 40, "#fff", P.ink, { w: 700 })) : "")
    + q(660, tL, 0) + q(1270, tN, 1), z, 960, 620); };

/* ============ the title slam ============ */
SC.title = (t, s) => { const u = t - s.t0, a = (d) => { const k = clamp((u - d) / .16); return k <= 0 ? 0 : lerp(2.4, 1, eo(k)) + .05 * wob(u, d + .16, .4); }, k1 = a(.1), k2 = a(.5), k3 = a(.95);
  const ln = (y, txt, size, col, k, ls = 6) => k ? `<g transform="translate(960 ${y}) scale(${n2(k)})"><g transform="translate(0 8)" opacity=".85">${T(0, 0, txt, size, P.ink, { ls })}</g>${T(0, 0, txt, size, col, { ls })}</g>` : "";
  return boxView(t, { cam: [1.05 + .05 * u / 3.4, 960, 560], st: { day: 1 } }) + `<rect width="1920" height="1080" fill="${P.night}" opacity="${n2(.66 * clamp(u / .2))}"/>`
    + ln(330, "6 THINGS.", 170, "#fff", k1) + ln(520, "30 DAYS.", 170, "#fff", k2) + ln(760, "WHICH ONES ARE ALIVE?", 132, P.sun, k3, 4) + OP(clamp((u - .2) / .3), logo(t)); };

/* ============ the lock-in scene (style 7.1), shared by the practice and Rounds 1 and 2 ============
   c: { s (scene), q (question), tq (when the question shows), tL, tR (cards pop), ring0, dur, lock (Heart's "Locked in!" line), obj(t) -> svg at the ring centre,
        picks: [{who, id, word, kind, x}], t1 (the scene ends), demo (show the YOU pointing hands), score }  */
function lockScene(t, c) { const bell = c.ring0 + c.dur, tS = LT(c.lock) - .08, picks = c.picks, tb0 = Math.min(...picks.map((p) => LT(p.id))) - .5, rs = ringState(t, c.ring0, c.dur);
  const zb = ss(tb0, tb0 + .4, t), gs = lerp(1, .76, zb), shut = pulse(t, bell, .01, .6);
  const cardL = spring(t, c.tL, .45), cardR = spring(t, c.tR, .45), pl = t >= c.ring0 && t < bell ? rs.tick : 0;
  let main = `<ellipse cx="330" cy="470" rx="380" ry="330" fill="${P.leaf}" opacity="${n2(.3 * Math.min(1, cardL))}" filter="url(#b60)"/><ellipse cx="1590" cy="470" rx="380" ry="330" fill="${P.blue}" opacity="${n2(.3 * Math.min(1, cardR))}" filter="url(#b60)"/>`;
  if (cardL > .02) main += TF(330, 470, cardL, choiceCard(0, 0, "green", "LIVING", "point LEFT", { flip: 1, pulse: pl, h: 400 }));
  if (cardR > .02) main += TF(1590, 470, cardR, choiceCard(0, 0, "blue", "NON-LIVING", "point RIGHT", { flip: -1, pulse: pl, h: 400 }));
  main += ringTimer(960, 470, t < bell ? rs.frac : 0, t < bell ? rs.secs : 0, t, { tick: rs.tick, shut, inner: `<ellipse cx="960" cy="596" rx="120" ry="18" fill="${P.ink}" opacity=".5" filter="url(#b4)"/>` + c.obj(t) });
  if (shut > .05) main += `<circle cx="960" cy="470" r="${n2(RING_R + 40 + 80 * (1 - shut))}" fill="none" stroke="${P.sun}" stroke-width="6" opacity="${n2(shut * .8)}"/>`;
  let top = OP(ramp(t, c.tq, .3) * (1 - zb), T(960, 106, c.q, 62, "#fff", { w: 600 })) + OP(ramp(t, c.ring0 - .15, .2) * (1 - zb) * (t < bell ? .75 + .25 * Math.sin(t * 9) : 1), T(960, 176, "LOCK IT IN!", 40, P.sun, { ls: 8 }));
  // the buddies wait with their picks face down; after the bell each card flips as its buddy speaks
  const bx = { [picks[0].who]: 0, [picks[1].who]: 0, [picks[2].who]: 0 }; const X0 = { pip: 600, basil: 960, momo: 1320 }; let buds = "", bubs = "";
  const tin = c.demo ? c.ring0 - .3 : c.s.t0 + .25;
  let cards = "";
  ["pip", "basil", "momo"].forEach((who, i) => { const pk = picks.find((p) => p.who === who), sp = speaking(who, t), hh = lerp(224, 320, zb) * (sp ? 1.06 : 1), x = lerp(X0[who], [400, 960, 1520][i], zb), poses = [[tin, who === "basil" ? "arms_crossed" : "thinking"], [LT(pk.id) - .12, "sit"]];
    if (c.react) for (const [tt, w2, p2] of c.react) if (w2 === who) poses.push([tt, p2]);
    poses.sort((a, b) => a[0] - b[0]);
    buds += buddy(who, x, 1062, hh, t, { aura: true, auraO: .85, in: tin + i * .12, poses });
    if (t > tin + i * .12 + .2) cards += pickCard(who, x + hh * .66, 1062 - hh * .3, t, pk.word ? LT(pk.id) - .1 : 1e9, pk.word, pk.kind);
    bubs += say(pk.id, x + (i === 0 ? 60 : i === 2 ? -60 : 0), 1062 - hh - 120, t, { x: pk.x, tail: i === 0 ? -60 : i === 2 ? 60 : 0, maxW: 620, size: 42 }); });
  buds += cards;
  const note = OP(ramp(t, tin + .5, .3) * (1 - ss(bell, bell + .3, t)), pill(960, 802, 470, 48, "#120E2E", "The buddies lock in after you", 27, "#DDD3FF", { w: 500, ls: 1 }));
  // YOU: the pointing move, shown once
  let demo = ""; if (c.demo) { const a = ramp(t, c.tL - .1, .25) * (1 - ramp(t, c.ring0 - .5, .25)), dir = t < c.tR - .12 ? -1 : 1, sw = t < c.tR - .12 ? spring(t, c.tL, .4) : spring(t, c.tR - .12, .4);
    demo = OP(a, TF(960 + dir * 90 * sw, 900, 1.25, `<g transform="scale(${dir} 1)" filter="url(#dropS)">${pointHand()}</g>`) + youPill(960, 1010, 1.1)); }
  return bg("stage") + `<g transform="translate(960 ${n2(lerp(505, 330, zb))}) scale(${n2(gs)}) translate(-960 -470)">${main}</g>` + top + `<rect y="800" width="1920" height="280" fill="url(#xFloor)"/>` + note + buds + demo + bubs
    + stamp(t, tS, 960, lerp(505, 330, zb)) + bellIcon(t, c.ring0) + HUD(t, { score: c.score !== false }); }

/* ============ the practice round: the teddy bear ============ */
SC.prac = (t, s) => { const tv = LT("h208"), tT = WE("h208", "thing"), tLk = W("h208", "eyes");
  if (t < tv - .35) return lockScene(t, { s, q: "The teddy bear. Is it…", tq: W("h203", "the"), tL: W("h203", "left"), tR: W("h203", "right"), ring0: MK("ring0_p"), dur: 5, lock: "h204", demo: true, score: false,
    obj: () => TF(960, 566, 1.22, teddyBig(), 0), picks: [{ who: "pip", id: "p205", word: "NON-LIVING", kind: "blue" }, { who: "basil", id: "b206", word: "NON-LIVING", kind: "blue" }, { who: "momo", id: "m207", word: null }] });
  // the verdict: the teddy bear alone, the tag lands, "buttons" joined to its eyes by a plain line
  const u = t - (tv - .35), z = 1 + .05 * u / 8;
  return bg("stage") + CAM(`<circle cx="960" cy="520" r="330" fill="#fff" opacity=".08"/><circle cx="960" cy="520" r="250" fill="#fff" opacity=".07"/>` + groundShadow(960, 742, 190, 26, .5) + `<g filter="url(#rim)">${TF(960, 740, 2.1 * spring(t, tv - .35, .5), teddyBig())}</g>`
    + (t > tLk ? OP(ramp(t, tLk, .25), `<path d="M1300 300 L1018 384" stroke="#fff" stroke-width="5" stroke-linecap="round"/><circle cx="1014" cy="385" r="8" fill="#fff"/>` + tpill(1350, 290, "buttons", 40, "#fff", P.ink)) : "")
    + tag(t, tT - .25, 960, 830, false, 1.5), z, 960, 560)
    + buddy("momo", 330, 1050, 300, t, { aura: true, poses: [[tv - .3, "thinking"], [W("h208", "we"), "sit"]] }) + buddy("pip", 1560, 1050, 270, t, { aura: true, flip: true, poses: [[tT - .2, "cheer"], [tT + 1.3, "sit"]] })
    + HUD(t, { score: false }); };

/* ============ 3 · the game ============ */
SC.game = (t, s) => { const a = "h301", b = "h302", tb = LT(b) - .3, ph2 = ss(tb, tb + .4, t);
  const tYou = W(a, "you"), tBud = W(a, "buddies"), tLock = W(a, "lock"), tP = W(a, "pip"), tB = W(a, "basil"), tM = W(a, "momo");
  const sbk = spring(t, s.t0 + .15, .5);
  let out = bg("stage") + `<g transform="translate(960 ${n2(lerp(-200, 190, eo((t - s.t0) / .4)))})">${scoreboard(t, 0, 0, 1.45 + .12 * pulse(t, tYou, .02, .3) + .12 * pulse(t, tBud, .02, .3), { you: 0, bud: 0 })}</g>`;
  // YOU: one hand points (the answer hand), the other holds up fingers (the score hand)
  const cnt = [W(b, "one"), W(b, "one") + .5, W(b, "one") + 1.0]; let nf = 0; cnt.forEach((x) => { if (t >= x) nf++; });
  const t5 = W(b, "find"), hi = 0;
  const youIn = spring(t, tYou - .1, .5);
  if (youIn > .02) { const px = lerp(400, 330, ph2), cx = lerp(880, 760, ph2), cs = lerp(1.15, 1.9, ph2), cy = lerp(700, 800, ph2) - 30 * hi;
    out += TF(px, lerp(640, 600, ph2), youIn * lerp(1.2, .9, ph2), `<g filter="url(#dropS)" transform="scale(-1 1) rotate(${n2(-8 + 6 * Math.sin(t * 3))})">${pointHand()}</g>`) + OP(1 - ph2, tpill(400, 760, "answer hand", 30, "#fff", P.ink) );
    out += TF(cx, cy, youIn * cs * (1 + .06 * pulse(t, cnt[Math.max(0, nf - 1)], .02, .2)), `<g filter="url(#dropS)">${countHand(ph2 > .5 ? nf : 1)}</g>`) + OP(1 - ph2, tpill(880, 990, "score hand", 30, "#fff", P.ink));
    out += youPill(lerp(640, 330, ph2), lerp(470, 440, ph2), 1.3 * youIn);
    if (nf && ph2 > .5) out += TF(1010, 560, spring(t, cnt[nf - 1], .35), `<g filter="url(#dropS)"><circle r="70" fill="url(#gSun)"/></g>${T(0, 28, nf, 84, P.ink)}`);
    if (hi > .05) out += OP(hi, `<g stroke="${P.sun}" stroke-width="10" stroke-linecap="round">${[0, 1, 2, 3, 4, 5, 6].map((i) => { const an = -Math.PI * (.1 + i * .133), r1 = 250 + 40 * (1 - hi), r2 = r1 + 60; return `<path d="M${n2(760 + Math.cos(an) * r1)} ${n2(620 + Math.sin(an) * r1)} L${n2(760 + Math.cos(an) * r2)} ${n2(620 + Math.sin(an) * r2)}"/>`; }).join("")}</g>`); }
  // "You lock in first": a small ring
  out += OP(pulse(t, tLock + .2, .2, 1.4) * (1 - ph2), TF(700, 640, .0, "") + `<g transform="translate(1010 620) scale(.42)">${ringTimer(0, 0, .62, 3, t)}</g>`);
  // the buddies pop in on their names
  [["pip", tP, 1170, "waving"], ["basil", tB, 1455, "cheer"], ["momo", tM, 1740, "waving"]].forEach(([w, tt, x, pz]) => { out += buddy(w, x, 1030, 225, t, { aura: true, in: tt - .08, poses: [[tt - .08, pz], [tt + 1.4, "sit"], [t5, "cheer"]], wave: true }); });
  // no lock-in, no point · the cicak
  const tN = W(b, "no"), tC = W(b, "cicak");
  out += (t >= tN ? TF(1440, 480, spring(t, tN, .4) * (1 - ramp(t, tC - .2, .2)), tpill(0, 0, "No lock-in, no point!", 46, "#fff", P.ink, { w: 700 })) : "");
  if (t >= tC - .1) out += TF(1440, 430, spring(t, tC - .1, .5), `<g filter="url(#drop)"><circle r="150" fill="${P.paper}"/></g><g transform="translate(-10 20) scale(2.3) rotate(${n2(4 * Math.sin(t * 5))})">${cicak(P.ink)}</g><g transform="translate(110 -100) rotate(12)"><circle r="46" fill="url(#gSun)"/>${T(0, 22, "?", 64, P.ink)}</g>`) + TF(1440, 640, spring(t, W(b, "find"), .4), tpill(0, 0, "Find the cicak!", 40, P.ink, P.sun, { w: 700 }));
  return out + logo(t); };

/* ============ today's goals ============ */
SC.goals = (t, s) => { const cues = HAS("h303") ? [W("h303", "diversity"), W("h303", "classify"), W("h303", "tell")] : [s.t0 + .6, s.t0 + 1.5, s.t0 + 2.4], goals = [["What diversity is", "blue"], ["How to classify things", "purple"], ["Living or non-living?", "orange"]];
  const ic = [
    `<circle cx="-40" cy="-6" r="24" fill="${P.leaf}"/><rect x="-6" y="-34" width="46" height="46" rx="10" fill="${P.sun}"/><path d="M50 28 l28 -50 l28 50z" fill="${P.coral}" transform="translate(-64 4)"/>`,
    `<rect x="-78" y="-32" width="66" height="70" rx="12" fill="#fff" opacity=".9"/><rect x="12" y="-32" width="66" height="70" rx="12" fill="#fff" opacity=".9"/><circle cx="-45" cy="2" r="16" fill="${P.blue}"/><rect x="30" y="-14" width="30" height="30" rx="6" fill="${P.orange}"/>`,
    `<g transform="translate(-44 4) scale(.6)">${leaf(40, true)}</g><g transform="translate(44 4) scale(.28)">${pebble()}</g>`];
  let out = bg("stage2") + OP(ramp(t, s.t0 + .1, .3), T(960, 210, "Today you will learn", 76, "#fff", { w: 600 }));
  goals.forEach(([g, kind], i) => { const k = spring(t, cues[i] - .12, .5); if (k < .02) return; const x = 380 + i * 580, y = 560 + (1 - eo((t - cues[i] + .12) / .3)) * -220, col = { blue: "gBlue", purple: "gPurple", orange: "gOrange" }[kind];
    const ls = wrap(g, 54, 440, 700);
    out += TF(x, y, k, `<g transform="rotate(${[-2, 1.5, -1.5][i]})"><g filter="url(#drop)"><rect x="-255" y="-190" width="510" height="400" rx="46" fill="url(#gPaper)"/><rect x="-255" y="-190" width="510" height="150" rx="46" fill="url(#${col})"/><rect x="-255" y="-90" width="510" height="50" fill="url(#${col})"/></g><g transform="translate(0 -112) scale(1.5)">${ic[i]}</g>${ls.map((l, j) => T(0, 60 + j * 66 - (ls.length - 1) * 20, l, 54, P.ink)).join("")}</g>`); });
  return out + buddy("pip", 180, 1060, 250, t, { aura: true, in: s.t0 + .2, poses: [[s.t0, "pointing"], [cues[2] + .8, "cheer"]] }) + HUD(t); };
