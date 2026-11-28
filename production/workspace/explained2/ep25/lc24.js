// lc24.js: EP24's look-closer panels, its two journeys, and the ring / card / recap / fun-fact / Mark Sentence / chant pictures.
// Look-closer art is centred on (0, 0) inside +-830 x +-395 (closer.js); keep the top 110 px for a book strip and the bottom 80 px for the verdict.
const SETX = [-330, 330];
const redLab = (t, t0, x, y, txt, px, py, t1) => lcLab(t, t0, x, y, txt, px, py, { size: 32, fill: CHANGEDC, ink: "#fff", t1 });
const greenLab = (t, t0, x, y, txt, px, py, t1) => lcLab(t, t0, x, y, txt, px, py, { size: 30, fill: SAMEC, ink: "#fff", t1 });

/* Part 1 look-closer 1 · TWO THINGS CHANGED: Basil's two set-ups big, side by side; the kinds of nail glow red ("different!"), the turns glow
   red ("different!"), the batteries and the trays tick green ("the same"); over the big bunch two arrows from the two red differences meet at
   a "?" (the iron? the turns?) */
function lcUnfairArt(t) { const m = MK, tK = m("kind"), tT = m("turns"), tW = m("which"), tN = m("notsure"), tS = m("strip");
  let A = lcBG23("#FFF6E6") + `<rect x="-930" y="220" width="1860" height="260" fill="#DDB27A"/>`;
  [[25, "iron", "iron nail", 8], [8, "steel", "steel nail", 2]].forEach(([n, kind, lab, nc], i) => { const x = SETX[i];
    A += trayClips22(t, x + 20, 340, .95, { n: 22 - nc }) + setup24(t, { x: x + 20, y: 150, k: 1.05, kind, n, batt: 1, clips: nc, hx: -250, hy: 80, hk: .6 })
      + TF(x + 20, -290, 1, tpill(0, 0, `${lab} · ${n} turns`, 36, "#fff", P.ink, { w: 700 })); });
  // red: the kind of nail (the two tags), then the number of turns (the two coils)
  A += glowBox24(t, tK, SETX[0] + 20, -290, 360, 76, CHANGEDC, tS) + glowBox24(t, tK + .15, SETX[1] + 20, -290, 360, 76, CHANGEDC, tS) + redLab(t, tK + .3, 0, -380, "different nails!", 0, -300, tS);
  A += glowBox24(t, tT, SETX[0] + 20, -10, 90, 330, CHANGEDC, tS) + glowBox24(t, tT + .15, SETX[1] + 20, -105, 90, 140, CHANGEDC, tS) + redLab(t, tT + .3, 0, -40, "different turns!", SETX[1] - 20, -100, tS);
  // green: the same batteries, the same clips
  A += greenLab(t, tT + 2.2, -720, 330, "one battery each", SETX[0] - 240, 210, tS) + greenLab(t, tT + 2.6, 720, 330, "the same clips", SETX[1] + 120, 330, tS);
  // which one did it? two arrows meet at a "?" over the big bunch
  if (t >= tW - .2 && t < tS + .3) { const a = ramp(t, tW - .2, .3) * (1 - ramp(t, tS, .3)), q = [SETX[0] + 230, 120];
    A += OP(a, fatArrow(SETX[0] + 40, -230, q[0] - 40, q[1] - 50, "#D84A3A", 12) + fatArrow(SETX[0] + 90, -20, q[0] - 50, q[1] - 10, "#D84A3A", 12)
      + TF(q[0] + 30, q[1], 1.2 + .06 * Math.sin(t * 5), `<circle r="54" fill="#fff" stroke="#D84A3A" stroke-width="7"/>` + T(0, 26, "?", 76, "#D84A3A", { w: 700 })))
      + lcLab(t, m("which") + .4, -720, -170, "the iron?", SETX[0] - 40, -250, { size: 40, fill: "#FFF3C8", t1: tS }) + lcLab(t, W("m703", "because", 1) - .1, -720, 40, "the turns?", SETX[0] - 20, -40, { size: 40, fill: "#FFF3C8", t1: tS }); }
  if (t >= tN && t < tS + .3) A += OP(1 - ramp(t, tS, .3), TF(560, 120, spring(t, tN, .4), tpill(0, 0, "we cannot be sure", 40, "#3A2E52", "#fff", { w: 700 })));
  return A; }

/* Part 1 look-closer 2 · MAKE IT FAIR: the two set-ups again; the long coil unwinds to twenty turns and the short one winds up to twenty
   (counters, green); the battery, the wire and the clips tick green; only the nails' tags glow red (the only thing changed); both tips dip the
   same way to the same depth (a green dashed line); a "?" over each tip (the result is not shown) */
function lcFairArt(t) { const m = MK, tT = m("twenty"), tB = m("samebat"), tWi = m("samewire"), tC = m("sameclips"), tD = m("dipfair"), tO = m("onlynail"), tE = m("kw_experiment");
  const u = eio(clamp((t - tT - .2) / 2.0)), dip = t >= tD + .2 ? 60 * eio(clamp((t - tD - .2) / .9)) * (1 - eio(clamp((t - tO - 1.6) / .9))) : 0;
  let A = lcBG23("#FFF6E6") + `<rect x="-930" y="220" width="1860" height="260" fill="#DDB27A"/>`;
  [[25, "iron", "iron nail"], [8, "steel", "steel nail"]].forEach(([n0, kind, lab], i) => { const x = SETX[i], n = Math.round(lerp(n0, 20, u));
    A += trayClips22(t, x + 20, 340, .95, { n: 22 }) + setup24(t, { x: x + 20, y: 150 + dip, k: 1.05, kind, n, batt: 1, hx: -250, hy: 80 - dip / 1.05, hk: .6 })
      + TF(x + 20, -290, 1, tpill(0, 0, lab, 38, "#fff", P.ink, { w: 700 })) + (t >= tT ? TF(x + 190, -150, spring(t, tT, .4), tpill(0, 0, `${n} turns`, 34, u > .98 ? SAMEC : "#fff", u > .98 ? "#fff" : P.ink, { w: 700 })) : "")
      + (t >= tD + 1.0 ? TF(x + 20, 230 + dip, .8 + .05 * Math.sin(t * 4 + i), `<circle r="34" fill="#fff" stroke="${P.ink}" stroke-width="5"/>` + T(0, 17, "?", 48, P.ink, { w: 700 })) : ""); });
  A += greenLab(t, tB, -720, 330, "the same kind of battery", SETX[0] - 240, 210, tE) + greenLab(t, tWi, 0, -60, "the same wire", SETX[1] - 100, -40, tE) + greenLab(t, tC, 720, 330, "the same steel clips", SETX[1] + 120, 330, tE);
  if (t >= tD + .3 && t < tE) A += OP(ramp(t, tD + .3, .3) * (1 - ramp(t, tE - .3, .3)), `<path d="M-800 ${n2(150 + 60)} H800" stroke="${SAMEC}" stroke-width="6" stroke-dasharray="20 14"/>` + TF(-700, 186, 1, chip24("the same depth", SAMEC, 26)));
  A += glowBox24(t, tO, SETX[0] + 20, -290, 300, 80, CHANGEDC) + glowBox24(t, tO + .15, SETX[1] + 20, -290, 300, 80, CHANGEDC) + redLab(t, tO + .3, 0, -380, "the only thing changed: the kind of nail", 0, -300);
  return A; }

/* Part 2 look-closer 1 · OUR PLAN: the book's table big, three coloured rows filling as Heart reads them (the book's own words), each with a
   small picture of the thing on the bench it names */
function lcTableArt(t) { const m = MK, R = [m("row1"), m("row2"), m("row3")], K = [m("k1"), m("k2"), m("k3"), m("k4")];
  let A = lcBG23("#FFFDF6") + `<g filter="url(#dropS)"><rect x="-800" y="-370" width="1600" height="690" rx="26" fill="#fff" stroke="#C9D2DA" stroke-width="5"/></g>` + T(0, -320, "Prediction: more batteries, a stronger electromagnet", 34, "#5A6A7A", { w: 700 });
  const rows = [["Variable to be changed", -250, 100], ["Variables to be kept the same", -82, 214], ["Variable to be measured", 82, 104]];
  rows.forEach(([h, y, hh], i) => { const a = ramp(t, R[i] - .2, .35); A += OP(.35 + .65 * a, `<rect x="-770" y="${y - hh / 2}" width="1540" height="${hh - 12}" rx="18" fill="${ROWC[i]}" opacity=".13"/><rect x="-770" y="${y - hh / 2}" width="16" height="${hh - 12}" rx="8" fill="${ROWC[i]}"/>`) + T(-740, y - hh / 2 + 44, h, 36, ROWC[i], { a: "start", w: 700 }); });
  // row 1: Number of batteries (the one-battery and two-battery holders)
  if (t >= R[0] + .4) A += OP(ramp(t, R[0] + .4, .3), T(-200, -230, "Number of batteries", 40, P.ink, { a: "start", w: 600 }) + TF(420, -214, .42, battHolder23(t, 1)) + TF(640, -214, .36, battHolder23(t, 2)));
  // row 2: Type of batteries · Type of steel clips · Type of iron nail · Number of turns of wire around the iron nail (one by one)
  [["Type of batteries", (x, y) => TF(x, y + 26, .3, battHolder23(t, 1))], ["Type of steel clips", (x, y) => clipBunch(t, x, y - 30, 3, { k: .8 })], ["Type of iron nail", (x, y) => TF(x, y + 50, .4, nail24("iron", 1), 0)],
   ["Number of turns of wire around the iron nail", (x, y) => TF(x, y + 50, .32, nail24("iron", 1) + coil23d(10, 1))]].forEach(([txt, pic], j) => { if (t < K[j] - .1) return; const x = j < 3 ? -740 + j * 470 : -740, y = j < 3 ? -70 : -6, a = ramp(t, K[j] - .1, .3);
    A += OP(a, T(x + (j < 3 ? 90 : 90), y, txt, 32, P.ink, { a: "start", w: 600 }) + pic(x + 40, y - 6)); });
  // row 3: Number of steel clips attracted (a nail with clips, a counting finger)
  if (t >= R[2] + .4) A += OP(ramp(t, R[2] + .4, .3), T(-200, 102, "Number of steel clips attracted", 40, P.ink, { a: "start", w: 600 }) + TF(560, 60, .3, setup24(t, { kind: "iron", n: 10, clips: 6, holder: false })) + TF(680, 40, .26, hand15({ point: true }), -100));
  return A; }

/* Part 2 look-closer 2 · COUNT IT AGAIN: Pip's one count (7) with a clip slipping off the tip; then the counts drawn as rows of clips:
   2 batteries 9, 8, 9 (nearly the same length: close to each other) and 1 battery 5, 6, 5; "Our prediction was right!" */
function lcCountArt(t) { const m = MK, tS = m("slip"), tF = m("fast"), tC2 = m("counts2"), tC1 = m("counts1"), tR = m("right");
  let A = lcBG23("#FFF6E6");
  // left: the nail with its clips; one slips off at `slip`
  const sl = t >= tS ? eio(clamp((t - tS) / .7)) : 0;
  A += trayClips22(t, -560, 360, .8, { n: 16 }) + setup24(t, { x: -560, y: 140, k: .95, kind: "iron", n: 20, batt: 2, clips: 6, hx: -270, hy: 90, hk: .5 })
    + TF(-560 + 40 * sl, 270 + 90 * sl * sl, .9, clip22d(0, 0, 90 + 200 * sl, 1)) + (t >= tS ? lcLab(t, tS + .2, -300, 120, "a clip slipped off!", -500, 250, { size: 32, fill: "#FFF3C8", t1: tC2 }) : "")
    + (t >= tF ? lcLab(t, tF, -300, 10, "counted too fast?", -520, 70, { size: 32, fill: "#FFF3C8", t1: tC2 }) : "") + TF(-560, -390 + 40, 1, tpill(0, 0, "Pip's one count: 7", 34, "#fff", P.ink, { w: 700 }));
  // right: the counts as rows of clips
  const row = (y, n, t0, col) => { let s = ""; for (let j = 0; j < n; j++) { if (t < t0 + j * .05) continue; s += TF(-60 + j * 62, y, .9 * Math.min(1, spring(t, t0 + j * .05, .3)), clip22d(0, 0, 0, 1)); } return s + (t >= t0 ? T(-60 + n * 62 + 30, y + 14, String(n), 44, col, { a: "start", w: 700 }) : ""); };
  if (t >= tC2 - .2) { A += T(250, -300, "2 batteries", 40, ROWC[0], { w: 700 }); [9, 8, 9].forEach((n, i) => { A += row(-230 + i * 80, n, tC2 + i * .55, P.ink); }); A += lcLab(t, tC2 + 2.0, 650, -330, "close to each other", 600, -160, { size: 32, fill: "#EAF8EC" }); }
  if (t >= tC1 - .2) { A += T(250, 50, "1 battery", 40, ROWC[1], { w: 700 }); [5, 6, 5].forEach((n, i) => { A += row(120 + i * 80, n, tC1 + i * .55, P.ink); }); }
  if (t >= tR) A += TF(450, 370, spring(t, tR, .4), tpill(0, 0, "our prediction was right!", 40, GOODC, "#fff", { w: 700 }));
  return A; }

/* ============================================================ JOURNEY 1 · Be a steel paper clip (Part 1) ============================================================
   First person: you lie among silver clips in a wide tray; far above, Basil's two nails side by side (the iron nail with a thick coil of many
   turns, the steel nail with a few); the iron nail's tip pulls you up (you rise, the tray falls away); across the gap, the steel nail's tip
   holds only two clips; two thought tags (the iron? the turns?) */
function clipJourney1(t, s) { const m = MK, tL = m("jlie"), tM = m("jmany"), tP = m("jpull"), tWk = m("jweak"), tWo = m("jwonder");
  const rise = eio(clamp((t - tP - .4) / 1.6)), pan = eio(clamp((t - tWk + .2) / 1.4)) * (1 - eio(clamp((t - tWo - .6) / 1.4))), look = eio(clamp((t - tM + .5) / 1.6));
  let o = `<rect width="1920" height="1080" fill="#F4EFE6"/>`;
  // the room far above, the two giant nails hanging from an adult's hand each (only the coils and tips are seen)
  const cx = 960 - pan * 520, up = -look * 140 + rise * 260;
  o += `<g transform="translate(${n2(cx - 960)} ${n2(up)})">` + `<rect x="-400" y="-400" width="3000" height="500" fill="#FBF8F2"/>`
    + setup24(t, { x: 640, y: 420, k: 2.1, kind: "iron", n: 25, holder: false, clips: t >= tP + .3 ? 8 : 0, ct0: tP + .3 }) + setup24(t, { x: 1500, y: 420, k: 2.1, kind: "steel", n: 8, holder: false, clips: t >= tWk - .3 ? 2 : 0, ct0: tWk - .3 })
    + lcLab(t, tM, 1000, -60, "the iron nail: many, many turns", 640, -120, { size: 38, t1: tWk }) + lcLab(t, tWk, 1500, 520, "the steel nail: only a few turns", 1500, 330, { size: 38, t1: tWo + 1.5 });
  if (t >= tP && t < tWk) for (let i = 0; i < 3; i++) { const u = ((t - tP + i * .3) % .9) / .9; o += `<ellipse cx="640" cy="460" rx="${n2(60 + 300 * u)}" ry="${n2(24 + 100 * u)}" fill="none" stroke="#FFD34A" stroke-width="9" opacity="${n2(.75 * (1 - u))}"/>`; }
  o += `</g>`;
  // the tray of clips round you (it drops away as you rise)
  const hy = rise * 700;
  o += `<g transform="translate(0 ${n2(hy)})"><rect x="-100" y="760" width="2120" height="600" fill="#C8D0D6"/><rect x="-100" y="748" width="2120" height="20" fill="#E6ECF0"/>`;
  for (let i = 0; i < 16; i++) o += TF(80 + (i * 233) % 1900, 840 + (i % 3) * 90, 2.2 + (i % 4) * .3, clip22d(0, 0, (i * 47) % 180, 1));
  o += `</g>`;
  // YOU: your own big loop at the bottom (you rise and hang from the tip)
  o += TF(960 + (1 - rise) * 0, lerp(1020, 900, rise), 4.2, clip22d(0, 0, lerp(10, 90, rise), 1));
  if (t >= tWo) o += lcLab(t, tWo + .2, 560, 300, "the iron?", 640 - pan * 520 + 0, 330 + up, { size: 44, fill: "#FFF3C8" }) + lcLab(t, MK("jturns"), 1360, 300, "the turns?", 820 - pan * 520, 260 + up, { size: 44, fill: "#FFF3C8" })
    + TF(960, 180, spring(t, MK("jturns") + .5, .4), `<circle r="60" fill="#fff" stroke="${P.ink}" stroke-width="7"/>` + T(0, 28, "?", 84, P.ink, { w: 700 }));
  return o; }

/* ============================================================ JOURNEY 2 · Be a steel paper clip, counted again and again (Part 2) ============================================================
   You lie in the tray; the two-battery nail comes down; you jump up to its tip; a giant adult hand (four fingers and a thumb) lays you and
   the others in a row on the bench and a finger taps each one; back into the tray; up again; a tally grows in the corner: 9 · 8 · 9 */
function clipJourney2(t, s) { const m = MK, tD = m("jdown"), tU = m("jup"), tCt = m("jcount"), tB = m("jback"), tA = m("jagain"), C = [m("c1"), m("c2"), m("c3")];
  const down = eio(clamp((t - tD) / 1.4)), row = t >= tCt ? eio(clamp((t - tCt) / .8)) * (1 - eio(clamp((t - tB) / .6))) : 0;
  // you hang from the tip between `jup` and `jcount`, and again after `jagain`; else you lie in the tray
  const hangU = t >= tA ? eio(clamp((t - tA) / .5)) : t >= tU && t < tCt ? eio(clamp((t - tU) / .5)) : 0, tipY = lerp(-200, 470, down);
  let o = `<rect width="1920" height="1080" fill="#F4EFE6"/><rect x="0" y="0" width="1920" height="300" fill="#FBF8F2"/>`;
  // the tray: a wide silver floor of clips at the bottom
  o += `<rect x="-100" y="760" width="2120" height="600" fill="#C8D0D6"/><rect x="-100" y="748" width="2120" height="20" fill="#E6ECF0"/>` + [...Array(14)].map((_, i) => TF(80 + (i * 263) % 1900, 840 + (i % 3) * 90, 2.2 + (i % 4) * .3, clip22d(0, 0, (i * 53) % 180, 1))).join("");
  // the nail with two batteries, from above; its bunch of clips when you hang there
  o += setup24(t, { x: 960, y: tipY, k: 2.0, kind: "iron", n: 20, holder: false, clips: hangU > .5 ? 6 : 0, ck: .9, tag: "2 batteries", tagS: 26 });
  if (t >= tD - .2 && t < tD + 3) o += lcLab(t, tD + .3, 1400, 300, "the nail with two batteries", 1010, Math.max(60, tipY - 300), { size: 36, t1: tU + .6 });
  // YOU: your own big loop (in the tray, or up at the tip)
  o += TF(lerp(960, 1000, hangU), lerp(980, tipY + 140, hangU), lerp(4.2, 3.2, hangU), clip22d(0, 0, lerp(10, 90, hangU), 1));
  // the count: the clips laid in a row on the bench, a giant adult hand (four fingers and a thumb) tapping each one
  if (row > .02) { const n = t < C[1] ? 9 : t < C[2] ? 8 : 9, tap = Math.min(n, Math.floor(clamp((t - tCt - .8) / 1.6) * (n + 1)));
    o += OP(row, `<rect width="1920" height="1080" fill="#D8B27E"/><rect x="0" y="0" width="1920" height="300" fill="#FBF8F2"/><rect x="0" y="290" width="1920" height="16" fill="#B88A50"/>`);
    for (let j = 0; j < n; j++) o += OP(row, TF(330 + j * 150, 640, 2.2, clip22d(0, 0, 0, 1)) + (j < tap ? T(330 + j * 150, 780, String(j + 1), 48, P.ink, { w: 700 }) : ""));
    o += OP(row, TF(330 + Math.max(0, tap - 1) * 150 + 30, 520, .9, hand15({ point: true }), -80)); }
  // the tally in the corner
  o += `<g filter="url(#dropS)"><rect x="1500" y="120" width="360" height="110" rx="22" fill="#FFF8EA"/></g>` + T(1680, 160, "our counts", 28, "#5A6A7A", { w: 700 }) + T(1680, 210, [9, 8, 9].filter((_, i) => t >= C[i]).join(" · ") || "…", 44, P.ink, { w: 700 });
  return o; }

/* ============================================================ the ring / card / recap pictures ============================================================ */
// lockN's ring picture frame: about 0..860 x 0..880, centre (430, 470)
const ringP1_24 = (t) => trayClips22(t, 330, 690, .55, { n: 16 }) + trayClips22(t, 560, 690, .55, { n: 16 }) + setup24(t, { x: 330, y: 600, k: .62, kind: "iron", n: 25, hx: -200, hy: 60, hk: .5 }) + setup24(t, { x: 560, y: 600, k: .62, kind: "steel", n: 8, hx: 200, hy: 60, hk: .5 });
const ringHold24 = (t) => pinTray24(t, 300, 800, .8, { n: 14 }) + pinTray24(t, 590, 800, .8, { n: 18 }) + `<path d="M300 280 V420 M590 280 V690" stroke="#5A4A3A" stroke-width="5"/>` + heldBar24(t, 300, 440, .8, 2) + heldBar24(t, 590, 710, .8, 7) + TF(300, 360, 1, chip24("far", P.ink, 34)) + TF(590, 610, 1, chip24("close", P.momo, 34));
const ringP2_24 = (t) => trayClips22(t, 330, 690, .5, { n: 14 }) + trayClips22(t, 560, 690, .5, { n: 14 }) + setup24(t, { x: 330, y: 600, k: .6, kind: "iron", n: 10, batt: 1, hx: -200, hy: 60, hk: .5 }) + setup24(t, { x: 560, y: 600, k: .6, kind: "iron", n: 20, batt: 2, hx: 230, hy: 60, hk: .4 })
  + TF(330, 380, 1, chip24("X", P.ink, 34)) + TF(560, 380, 1, chip24("Y", P.ink, 34));
// Part 2 Round 1's three cards (-200..200 x -130..130): 1 yes (X and Y, a green tick) · 2 no, two things changed (the batteries and the coils
// outlined red) · 3 no, use a steel nail (a steel nail with a "?")
const xyPair24 = (t, red) => setup24(t, { x: -80, y: 110, k: .42, kind: "iron", n: 10, batt: 1, hx: -230, hy: 40, hk: .6 }) + setup24(t, { x: 120, y: 110, k: .42, kind: "iron", n: 20, batt: 2, hx: -280, hy: 40, hk: .45 })
  + T(-80, -110, "X", 30, P.ink, { w: 700 }) + T(120, -110, "Y", 30, P.ink, { w: 700 })
  + (red ? `<rect x="${-80 - 18}" y="${110 - 120}" width="36" height="34" rx="8" fill="none" stroke="${CHANGEDC}" stroke-width="5"/><rect x="${120 - 18}" y="${110 - 126}" width="36" height="104" rx="8" fill="none" stroke="${CHANGEDC}" stroke-width="5"/><rect x="${120 - 175}" y="${110 + 2}" width="105" height="30" rx="8" fill="none" stroke="${CHANGEDC}" stroke-width="5"/><rect x="${-80 - 125}" y="${110 + 2}" width="70" height="30" rx="8" fill="none" stroke="${CHANGEDC}" stroke-width="5"/>` : "");
const cardP2_24 = (i, t) => { const bgc = `<rect x="-200" y="-130" width="400" height="260" fill="#F3EAD8"/>`;
  if (i === 0) return bgc + xyPair24(t, false) + TF(160, -90, 1, tickBadge(26));
  if (i === 1) return bgc + xyPair24(t, true);
  return bgc + TF(0, 110, .7, nail24("steel", 1)) + T(110, 10, "?", 80, P.ink, { w: 700 }) + TF(-110, -80, 1, tpill(0, 0, "steel nail", 26, "#fff", P.ink, { w: 700 })); };
// the Showdown ring: the plan card's three small drawings
const ringShow24 = (t) => TF(300, 470, .4, battHolder23(t, 1)) + TF(300, 560, .34, battHolder23(t, 2)) + [0, 1, 2].map((j) => `<path d="M${410 + j * 30} 500 l8 9 l15 -18" stroke="${SAMEC}" stroke-width="7" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`).join("")
  + `<path d="M590 450 V540" stroke="${P.ink}" stroke-width="9" stroke-linecap="round"/>` + T(630, 510, "x1", 40, P.ink, { w: 700 }) + [1, 2, 3].map((n, i) => TF([300, 440, 600][i], 360, 1, `<circle r="24" fill="#8B5CF6"/>` + T(0, 10, n, 30, "#fff"))).join("");
// Part 2's recap pictures (each centred, large): 1 two things changed (25 / 8 turns, two red tags) · 2 only the nail changed (20 / 20, the
// nails' tags red) · 3 the same height (two magnets level by a ruler)
const recapP2_24 = (i, t) => TF(0, 40, 1.25, recapIn24(i, t));
const recapIn24 = (i, t) => { if (i === 0) return setup24(t, { x: -170, y: 200, k: .85, kind: "iron", n: 25, hx: -230, hk: .55, tag: "iron nail · 25 turns", tagC: CHANGEDC }) + setup24(t, { x: 230, y: 200, k: .85, kind: "steel", n: 8, hx: -230, hk: .55, tag: "steel nail · 8 turns", tagC: CHANGEDC });
  if (i === 1) return setup24(t, { x: -170, y: 200, k: .85, kind: "iron", n: 20, hx: -230, hk: .55, tag: "iron nail", tagC: CHANGEDC }) + setup24(t, { x: 230, y: 200, k: .85, kind: "steel", n: 20, hx: -230, hk: .55, tag: "steel nail", tagC: CHANGEDC }) + TF(30, 250, 1, chip24("20 turns each", SAMEC, 30));
  return pinTray24(t, -200, 220, .9, { n: 16 }) + pinTray24(t, 200, 220, .9, { n: 16 }) + heldBar24(t, -200, 0, .8, 4) + heldBar24(t, 200, 0, .8, 4) + ruler24(0, 230, 260, 1) + `<path d="M-360 0 H360" stroke="${SAMEC}" stroke-width="6" stroke-dasharray="18 12"/>` + TF(0, -120, 1, chip24("the same height", SAMEC, 32)); };
// the fun-fact pictures (funFact items: pic(t, w, h))
const ffCrab24 = (t, w, h) => ffBg(w, h, "#E8F3FA") + TF(-150, 60, 1.6, woodlouse24(t, {})) + TF(120, -40, 1, `<ellipse cx="0" cy="0" rx="70" ry="46" fill="#E0663A" stroke="#8A3418" stroke-width="5"/><path d="M-60 -20 q-50 -40 -30 -70 M60 -20 q50 -40 30 -70" stroke="#8A3418" stroke-width="10" fill="none" stroke-linecap="round"/><circle cx="-90" cy="-92" r="18" fill="#E0663A" stroke="#8A3418" stroke-width="5"/><circle cx="90" cy="-92" r="18" fill="#E0663A" stroke="#8A3418" stroke-width="5"/><circle cx="-18" cy="-26" r="7" fill="#1A1410"/><circle cx="18" cy="-26" r="7" fill="#1A1410"/>` + [-1, 1].map((d) => [0, 1, 2].map((j) => `<path d="M${d * 60} ${10 + j * 12} l${d * 40} ${20 + j * 4}" stroke="#8A3418" stroke-width="6" stroke-linecap="round"/>`).join("")).join(""))
  + TF(150, 130, .9, `<path d="M-80 0 Q0 -50 80 -10 Q60 20 -70 20z" fill="#F2A07A" stroke="#A85A3A" stroke-width="5"/><path d="M80 -10 q30 -20 50 -60 M70 -5 q40 -10 70 -30" stroke="#A85A3A" stroke-width="3" fill="none"/><circle cx="60" cy="-12" r="5" fill="#1A1410"/>`) + T(0, h / 2 - 24, "cousins!", 34, P.ink, { w: 700 });
const ffDamp24 = (t, w, h) => ffBg(w, h, "#FFF6E6") + `<rect x="-260" y="-110" width="520" height="220" rx="16" fill="#fff" stroke="${P.ink}" stroke-width="5"/><rect x="-252" y="-102" width="252" height="204" fill="#B8E0F2"/><rect x="0" y="-102" width="252" height="204" fill="#F2E2C0"/><path d="M0 -110 V110" stroke="${P.ink}" stroke-width="4" stroke-dasharray="10 8"/>`
  + T(-126, -60, "damp", 32, "#2E6E9A", { w: 700 }) + T(126, -60, "dry", 32, "#8A5A1A", { w: 700 }) + [0, 1, 2, 3].map((j) => woodlouseAt(t, -200 + j * 50 + 10 * Math.sin(t + j), 40 + (j % 2) * 30, .32, { ph: j, dir: j % 2 ? -1 : 1 })).join("") + woodlouseAt(t, 80 - 30 * ((t * .2) % 1), 30, .3, { dir: -1 }) + T(0, h / 2 - 24, "a fair test!", 34, P.ink, { w: 700 });
const ffHeart24 = (t, w, h) => { const b = 1 + .12 * Math.max(0, Math.sin(t * 18)); return ffBg(w, h, "#FFF0EE") + TF(-150, 40, 2.2, sparrow24(t, { hop: false })) + TF(150, -20, b, `<path d="M0 30 C-60 -10 -40 -60 0 -30 C40 -60 60 -10 0 30z" fill="#E0453A" stroke="#9A2A1E" stroke-width="5"/>`) + T(150, 80, "hundreds of beats", 30, P.ink, { w: 700 }) + T(150, 116, "in one minute!", 30, P.ink, { w: 700 }); };
const ffCount24 = (t, w, h) => ffBg(w, h, "#EEF6EA") + TF(-120, 20, 1.3, sparrow24(t, {})) + [0, 1, 2].map((i) => TF(140, -80 + i * 70, spring(t, 0, .3), tpill(0, 0, "count", 34, "#fff", P.ink, { w: 700 }))).join("") + T(0, h / 2 - 24, "again and again", 34, P.ink, { w: 700 });
// the Mark Sentence pictures under the cards
const markFair24 = (t, x, y, k) => TF(x, y, k, underBox23(trayClips22(t, -260, 100, .5, { n: 14 }) + setup24(t, { x: -260, y: 60, k: .5, kind: "iron", n: 20, hx: -220, hk: .6, tag: "iron nail", tagC: CHANGEDC, tagS: 40 }) + trayClips22(t, 260, 100, .5, { n: 14 }) + setup24(t, { x: 260, y: 60, k: .5, kind: "steel", n: 20, hx: -220, hk: .6, tag: "steel nail", tagC: CHANGEDC, tagS: 40 }) + TF(0, 90, 1, chip24("everything else the same", SAMEC, 30)), 900, 300));
const markExp24 = (t, x, y, k) => TF(x, y, k, underBox23(trayClips22(t, -300, 100, .5, { n: 14 }) + setup24(t, { x: -300, y: 60, k: .5, kind: "iron", n: 20, hx: -220, hk: .6 }) + trayClips22(t, -40, 100, .5, { n: 14 }) + setup24(t, { x: -40, y: 60, k: .5, kind: "steel", n: 20, hx: -220, hk: .6 })
  + TF(320, -10, 1, `<g filter="url(#dropS)"><rect x="-200" y="-60" width="400" height="120" rx="24" fill="#fff" stroke="${P.ink}" stroke-width="4"/></g>` + T(0, -8, "Which nail makes a", 28, P.ink, { w: 700 }) + T(0, 30, "stronger electromagnet?", 28, P.ink, { w: 700 })), 1000, 300));
const markPred24 = (t, x, y, k) => TF(x, y, k, underBox23(setup24(t, { x: -280, y: 80, k: .5, kind: "iron", n: 10, batt: 1, hx: -220, hk: .6, tag: "1 battery", tagS: 40 }) + setup24(t, { x: 80, y: 80, k: .5, kind: "iron", n: 10, batt: 2, hx: -300, hk: .5, tag: "2 batteries", tagS: 40 })
  + TF(340, -10, 1, `<g filter="url(#dropS)"><ellipse rx="130" ry="70" fill="#fff" stroke="${P.ink}" stroke-width="4"/></g>` + T(0, 12, "stronger?", 36, P.ink, { w: 700 })), 1000, 300));
const markRep24 = (t, x, y, k) => TF(x, y, k, underBox23([9, 8, 9].map((n, i) => TF(-300 + i * 300, 0, 1, `<g filter="url(#dropS)"><rect x="-110" y="-80" width="220" height="160" rx="22" fill="#fff"/></g>` + T(0, -30, `count ${i + 1}`, 30, "#5A6A7A", { w: 700 }) + T(0, 50, String(n), 70, P.ink, { w: 700 }))).join("") + TF(0, 120, 1, chip24("close to each other: reliable", SAMEC, 28)), 1000, 300));
// the chant's flashing board: line 1 one red "change" chip on a nail; line 2 green ticks; line 3 three counts
const chantBoard24 = (t, f) => { const box = (x, y, w, h, fl, inner) => `<g transform="translate(${x} ${y}) scale(${n2(1 + .06 * fl)})"><g filter="url(#dropS)"><rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="24" fill="#FFF8EA" stroke="${fl > .1 ? P.sun : "#E3C9A8"}" stroke-width="${n2(5 + 6 * fl)}"/></g>${inner}</g>`;
  return box(1640, 300, 400, 200, f[0], TF(-60, 70, .5, nail24("steel", 1)) + TF(80, 0, 1, chip24("only one", CHANGEDC, 30)))
    + box(1640, 530, 400, 200, f[1], [0, 1, 2, 3].map((j) => `<path d="M${-110 + j * 70} 0 l12 14 l24 -28" stroke="${SAMEC}" stroke-width="10" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`).join(""))
    + box(1640, 760, 400, 200, f[2], [9, 8, 9].map((n, i) => T(-110 + i * 110, 22, String(n), 60, P.ink, { w: 700 })).join("")); };
