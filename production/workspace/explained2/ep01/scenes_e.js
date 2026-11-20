// scenes_e.js: the two-part cut. Part 1's ending (the box under its cloth, the score hand) and Part 2's opening (a silent recap, "Last time...").

/* ============ Part 1 · the tease: the box under its cloth ============ */
SC.tease = (t, s) => { const L = "h850", B = BOX, tq = W(L, "what") - .15, tp = W(L, "find") - .1, u = t - tq, day = t < tq ? 5 : Math.min(30, 5 + Math.floor(clamp(u / .7) * 25));
  const cy = t < tq ? -1200 : lerp(-900, 0, eo(u / .45)), bump = t < tq ? 0 : 34 * (pulse(t, tq + .9, .12, .5) + pulse(t, tq + 1.5, .12, .6) + pulse(t, tp + .5, .12, .6));
  const st = { day: 5, robotX: B.robot1, robot: robotWalkStop(0, 0), bites: 2, wx: -52, cid: "ct" }, z = lerp(1.0, 1.06, (t - s.t0) / (s.t1 - s.t0));
  // the days still to go: the counter's dots
  return boxView(t, { cam: [z, 960, 540], st, over: `<g transform="translate(0 ${n2(cy)})">${cloth(bump)}</g>` })
    + (t >= tq + .6 ? TF(1010, 470, spring(t, tq + .6, .5) * (1 + .05 * Math.sin(t * 5)), `<g filter="url(#drop)"><circle r="120" fill="url(#gSun)"/><circle r="120" fill="none" stroke="#fff" stroke-width="8" opacity=".5"/></g>${T(0, 62, "?", 180, P.ink)}`) : "")
    + (t >= tp ? TF(960, 940, spring(t, tp, .45), `<g filter="url(#drop)" transform="rotate(-3)"><rect x="-330" y="-62" width="660" height="124" rx="62" fill="${P.ink}"/></g><g transform="rotate(-3)">${T(0, 22, `Find out in <tspan fill="${P.sun}">PART 2!</tspan>`, 64, "#fff")}</g>`) : "")
    + buddy("pip", 190, 1100, 320, t, { in: s.t0 + .2, poses: [[s.t0, "thinking"], [tq + .5, "surprised"], [tp, "pointing"]] }) + buddy("momo", 1730, 1100, 320, t, { flip: true, in: s.t0 + .3, poses: [[s.t0, "thinking"], [tq + .6, "surprised"], [tp + .1, "waving"]] })
    + counter(t, day, t < tq ? -9 : tq + Math.floor(clamp(u / .7) * 6) / 6 * .7) + HUD(t); };

/* ============ Part 1 · the score hand (two rounds so far) ============ */
SC.p1score = (t, s) => { const L = "h851", ts = W(L, "score") - .1, tr = MK("recap"), nf = t >= ts + .5 ? 2 : t >= ts ? 1 : 0, hi = pulse(t, ts + .75, .12, .6);
  let out = bg("stage") + `<g transform="translate(960 ${n2(lerp(-200, 200, eo((t - s.t0) / .35)))})">${scoreboard(t, 0, 0, 1.6, { you: "?", bud: 1 })}</g>`
    + TF(960, 780 - 40 * hi, 1.8 * spring(t, s.t0 + .25, .5) * (1 + .08 * hi), `<g filter="url(#drop)">${countHand(nf)}</g>`) + youPill(960, 440, 1.3)
    + (t >= ts + .9 ? TF(1340, 520, spring(t, ts + .9, .4) * (1 - ramp(t, tr - .1, .2)), tpill(0, 0, "Two fingers? Perfect so far!", 40, P.sun, P.ink, { w: 700 })) : "")
    + (t >= tr ? TF(1330, 520, spring(t, tr, .4), tpill(0, 0, "Today’s key words", 44, P.ink, P.sun, { w: 700 })) + OP(ramp(t, tr + .1, .3), `<path d="M1500 470 Q1600 380 1650 300" fill="none" stroke="${P.sun}" stroke-width="8" stroke-linecap="round" stroke-dasharray="2 20"/>`) : "");
  [["pip", 250, false], ["basil", 620, false], ["momo", 1640, true]].forEach(([w, x, fl], i) => { out += buddy(w, x, 1060, i === 1 ? 250 : 300, t, { aura: true, flip: fl, in: s.t0 + .1 + i * .08, poses: w === "basil" ? [[s.t0, "cheer"], [ts + .7, "cheer"]] : [[s.t0, "waving"], [ts + .7, "cheer"], [tr, "pointing"]], wave: true }); });
  return out + logo(t); };

/* ============ Part 2 · the silent recap: the six things go in; DAY 1 to DAY 10 ============ */
SC.recap = (t, s) => { const u = t - s.t0, B = BOX, cut = 2.7;
  if (u < cut) return coldBoxShot(u * 2.3 - .1, 0, 5.0, 99) + lowerPill(60, 960, "Last time", "Part 1");
  const v = clamp((u - cut) / (s.t1 - s.t0 - cut - .35)), dayf = 1 + 9 * eio(v), day = Math.round(dayf), tf = s.t0 + cut + Math.floor(v * 9) / 9 * (s.t1 - s.t0 - cut - .35);
  return boxView(t, { cam: [1.02 + .04 * v, 960, 560], st: { day: dayf, robotX: lerp(B.robot0, B.robot1, clamp(v * 4)), robot: v < .25 ? robotWalk(v * 60, 1) : robotWalkStop(0, 0), bites: day > 6 ? 2 : day > 1 ? 1 : 0, wx: lerp(-40, 10, v), nu: .6 * v, lean: 6 * v, cid: "crp" } })
    + counter(t, day, tf) + speeded(t, s.t0 + cut, s.t1 + 1) + lowerPill(60, 960, "Last time", "Part 1") + logo(t); };

/* ============ Part 2 · "Last time..." ============ */
SC.recapline = (t, s) => { const L = "h880", B = BOX, tR = W(L, "the") - .2, tRn = W(L, "non-living") - .15, tB = W(L, "the", 1) - .2, tBl = W(L, "living") - .15, tQ = W(L, "so") - .15;
  // camera: wide, the robot, the bean, wide
  const shots = [[s.t0, 1.0, 960, 560], [tR, 1.7, B.robot1 - 60, 660], [tB, 1.9, B.bean + 80, 640], [tQ, 1.0, 960, 560]]; let i = 0; shots.forEach((sh, k) => { if (t >= sh[0]) i = k; });
  const p = shots[Math.max(0, i - 1)], c = shots[i], e = i ? eio((t - c[0]) / .5) : 1, cam = [lerp(p[1], c[1], e), lerp(p[2], c[2], e), lerp(p[3], c[3], e)];
  const walk = t >= tR && t < tRn - .1, rx = lerp(B.robot1 - 150, B.robot1, clamp((t - tR) / (tRn - .1 - tR)));
  const bday = t < tBl - .1 ? 2 : lerp(2, 10, eio((t - tBl + .1) / 1.6));
  const wx = (x) => 960 + (x - cam[1]) * cam[0], wy = (y) => 540 + (y - cam[2]) * cam[0];
  return boxView(t, { cam, st: { day: bday, robotX: t < tR ? B.robot1 : rx, robot: walk ? robotWalk((t - tR) / .27, 1) : robotWalkStop(0, 0), bites: 2, wx: -52, nu: .6, lean: 6, cid: "crl" } })
    + tag(t, tRn, wx(B.robot1), wy(B.lane - 260), false, 1.3 * (1 - ss(tB - .2, tB, t))) + tag(t, tBl, wx(B.bean), wy(B.floor - 330), true, 1.3 * (1 - ss(tQ - .2, tQ, t)))
    + (t >= tQ ? `<rect width="1920" height="1080" fill="${P.night}" opacity="${n2(.4 * ramp(t, tQ, .3))}"/>` + TF(960, 470, spring(t, tQ, .5), `<g filter="url(#drop)"><rect x="-560" y="-90" width="1120" height="180" rx="90" fill="${P.ink}"/></g>${T(0, 30, `So what are the <tspan fill="${P.sun}">real clues</tspan>?`, 84, "#fff")}`) : "")
    + buddy("momo", 210, 1090, 300, t, { in: s.t0 + .15, poses: [[s.t0, "waving"], [tR, "pointing"], [tQ, "thinking"]] })
    + OP(1 - ramp(t, tQ, .3), lowerPill(60, 130, "Last time", "Part 1")) + HUD(t); };
