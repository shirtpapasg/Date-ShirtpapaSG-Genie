// lc23.js: EP23's art, part B (drawn 2026-11-25): the four [LOOK CLOSER] pictures, the two journeys, and the pictures of the rings, the
// cards, the recap, the fun facts, the Mark Sentence cards and the chant. Every action is drawn AT its timeline mark (script.py lists them).
// Science (script section 3; checked picture by picture): the clips cling at the nail's TIP; with the battery away the clips stay in the
// tray (all of them drop at once when it is taken away); the gold glow of electricity travels from the battery, round the coil and back, only
// while BOTH ends are joined (one end loose: no glow, no clips); the battery alone and the nail alone attract nothing; twenty turns attract a
// bigger bunch than ten (the same nail, wire and battery); two batteries in a row (+ to -) a bigger bunch than one (the same twenty turns);
// the bell's coil has MANY turns round an iron core. Bunches are drawn, never counted. No tiny magnets, no field lines, no sparks.

// the magnifier circle (copied unchanged from ../ep22/lc22.js)
// the magnifier circle (a close look at (px, py) drawn by inner(), shown at (x, y) radius r), joined by a line (EP20's magni20)
const magni22 = (t, t0, x, y, r, px, py, inner, lab, t1) => { if (t < t0) return ""; const a = t1 === undefined ? 1 : 1 - ramp(t, t1, .3); if (a <= .01) return ""; const k = spring(t, t0, .45), id = "mg" + Math.round(x) + Math.round(y);
  return OP(a, pline(px, py, x, y + r * .7 * Math.sign(py - y || 1), ramp(t, t0, .25), P.ink) + TF(x, y, k, `<clipPath id="${id}"><circle r="${r}"/></clipPath><circle r="${r}" fill="#F7FAFD"/><g clip-path="url(#${id})">${inner}</g><circle r="${r}" fill="none" stroke="${P.ink}" stroke-width="12"/><circle r="${r}" fill="none" stroke="#fff" stroke-width="4" opacity=".8"/>`)
    + (lab ? TF(x, y + r + 40, spring(t, t0 + .2, .4), tpill(0, 0, lab, 34, "#fff", P.ink, { w: 700 })) : "")); };
// the table top as the look-closer's background (warm wood, grain, a soft spotlight on the tray)
// a tray of steel clips (art22.js trayClips22) and the rig, in look-closer coordinates (centred on 0, 0)
const lcBG23 = (col = "#FFF6E6") => `<rect x="-930" y="-460" width="1860" height="920" fill="${col}"/>`;
const xBad23 = (t, t0, x, y, s = 1) => t < t0 ? "" : TF(x, y, spring(t, t0, .4) * s, `<g filter="url(#dropS)"><circle r="38" fill="#D84A3A" stroke="#fff" stroke-width="6"/></g><path d="M-15 -15 L15 15 M15 -15 L-15 15" stroke="#fff" stroke-width="9" stroke-linecap="round"/>`);
const tickB = (t, t0, x, y, s = 1) => t < t0 ? "" : TF(x, y, spring(t, t0, .4) * s, tickBadge(38));
const onOffAt = (t, sw) => { let on = false; for (const [tt, v] of sw) if (t >= tt) on = v; return on; };   // sw = [[t, true/false], ...]
const lastSw = (t, sw) => { let l = -9; for (const [tt] of sw) if (t >= tt) l = tt; return l; };
// a gentle pan inside a look-closer: the art's centre moves to (px, py) at scale z (all eased by the caller)
const panIn = (inner, px, py, z) => `<g transform="scale(${n2(z)}) translate(${n2(-px)} ${n2(-py)})">${inner}</g>`;

/* ================================================================ PART 1 [LOOK CLOSER] 1: is it still a magnet? (lcon) ================================================================ */
// off: the coiled nail BIG, tip down over the tray, the battery holder beside it with a grey OFF tag and one lead apart (battery away); the
// nail dips into the clips and lifts out: the clips stay in the tray (a magnifier on the bare tip). onoff: the lead clipped back (ON, the
// glow): the clips jump; unclipped (OFF): they drop; ON; OFF. crane: a smooth pan across the road to the scrapyard crane, seen through the
// yard's open gate (the gate posts and the road keep it "from outside"): the disc comes down on the heap (ON), lifts a tangle, swings over
// the tipper lorry, lets go (OFF): the scrap falls into the lorry. Then both side by side for ELECTROMAGNET.
const LCON_SW = () => [[MK("on1") + .1, true], [MK("off1") + .1, false], [MK("loses") - 2.1, true], [MK("loses") - .3, false]];
function lcOnRig(t, x, y, k) { const sw = LCON_SW(), on = onOffAt(t, sw), ls = lastSw(t, sw), dip = MK("dipn");
  const dy = t >= dip && t < dip + 2.4 ? 90 * Math.sin(Math.PI * clamp((t - dip) / 2.4)) : 0, jB = t < sw[0][0] ? 0 : (on ? eo(clamp((t - ls) / .25)) : 1 - eo(clamp((t - ls) / .25)));
  // the clips: jump on each ON, drop on each OFF (seen falling), lie in the tray otherwise
  let clips = null; for (let i = 0; i < sw.length; i += 2) { const a = sw[i][0], b = sw[i + 1] ? sw[i + 1][0] : 1e9; if (t >= a && t < b + .5) clips = [6, { t0: a + .25, from: [0, 150], drop: b + .05, to: [0, 150] }]; }
  return TF(x, y + dy, k, rig23(t, { n: 10, hold: [-330, -40], hk: 1, jA: 1, jB, flow: on ? clamp((t - ls) / .3) : 0, tag: on ? "on" : "off", clips, ck: 1.1 })); }
function lcOnArt(t) { const m = MK, tC = m("crane2"), tK = m("kw_electromagnet"), sw = LCON_SW(), on = onOffAt(t, sw), dip = m("dipn");
  const p1 = eio(clamp((t - tC + .2) / 1.4)), p2 = eio(clamp((t - tK + .9) / 1.1)), px = lerp(lerp(0, 1900, p1), 950, p2), z = lerp(1, .55, p2);
  // the rig panel (x 0) and the yard panel (x 1900)
  let A = lcBG23() + `<rect x="-930" y="200" width="1860" height="260" fill="#E2B378"/>` + trayClips22(t, 60, 330, 1.25, { n: 24 }) + lcOnRig(t, 60, 190, 1.2);
  A += lcLab(t, MK("away") - .1, -470, -300, "battery away", -330, -110, { t1: sw[0][0] - .2, size: 40 }) + lcLab(t, MK("away") + .3, 480, -330, "the iron nail", 60, -150, { t1: tC - .5, size: 38 });
  // the magnifier on the tip after the dip: bare (no clips)
  A += magni22(t, MK("stay") - .3, 470, 40, 120, 70, 196, `<rect x="-130" y="-130" width="260" height="260" fill="#FFF6E6"/>` + TF(0, -70, 2.2, nail22d(0, -150, 1, 90)), "the clips stay in the tray", sw[0][0] - .2);
  if (t >= sw[0][0] && t < tC) A += lcLab(t, sw[0][0] + .6, 520, -60, on ? "on: a magnet" : "off: the clips drop", 70, 210, { size: 40, fill: on ? "#EAF8EC" : "#fff" });
  // the yard panel: the road at the bottom, the gate posts at the sides, the yard, the heap at the right, the tipper lorry at the left
  const cOn = m("craneon"), cOff = m("craneoff"), sway = eio(clamp((t - cOn - .6) / 2.4)), lift = t < cOn - 1.6 ? 1 : t < cOn ? 1 - eio(clamp((t - cOn + 1.6) / 1.4)) : eio(clamp((t - cOn) / 1.2));
  let B = `<rect x="-930" y="-460" width="1860" height="920" fill="#BFE6FF"/><rect x="-930" y="120" width="1860" height="200" fill="#B8A890"/>` + TF(-60, 310, 2.2, `<path d="M-40 0 Q-20 -60 0 -70 Q20 -60 40 0z" fill="#8A5A3E"/>`)
    + TF(360, 320, 1.15, `<path d="M-260 0 Q-130 -190 0 -200 Q130 -190 260 0z" fill="#8A5A3E" stroke="#5A3420" stroke-width="5"/>` + [...Array(14)].map((_, i) => `<rect x="${n2(-200 + 400 * hash(i, 3))}" y="${n2(-30 - 140 * hash(i, 4) * (1 - Math.abs(hash(i, 3) - .5)))}" width="56" height="12" rx="4" fill="${["#A8683E", "#6E5A4E", "#B8784A"][i % 3]}" transform="rotate(${n2(180 * hash(i, 5))})"/>`).join(""))
    + TF(-380, 320, 1.5, `<rect x="-170" y="-150" width="260" height="110" rx="8" fill="#4E7AB0" stroke="#2E4A70" stroke-width="5"/><rect x="90" y="-140" width="90" height="100" rx="8" fill="#E8E2D0" stroke="#7A7262" stroke-width="5"/><rect x="104" y="-126" width="60" height="38" rx="4" fill="#BFE6FF"/><rect x="-180" y="-44" width="370" height="14" fill="#3A3A44"/>` + [-120, -20, 130].map((wx) => `<circle cx="${wx}" cy="-20" r="24" fill="#2E2E36"/>`).join(""));
  B += TF(620, 330, 1.35, yardCrane23(t, { sw: sway, lift, on: t >= cOn && t < cOff, fall: cOff }));
  if (t >= cOff && t < cOff + 1.4) B += TF(-380, 200, 1, [0, 1, 2].map((i) => `<path d="M${-60 + i * 60} -20 l-14 -30 M${-40 + i * 60} -24 l14 -30" stroke="#8A5A3E" stroke-width="6" stroke-linecap="round" opacity="${n2(1 - (t - cOff - .6) / .8)}"/>`).join(""));
  B += `<rect x="-930" y="320" width="1860" height="140" fill="#6A6E76"/>` + [...Array(8)].map((_, i) => `<rect x="${-900 + i * 240}" y="380" width="120" height="12" rx="4" fill="#F4F0E6"/>`).join("")
    + `<rect x="-930" y="-460" width="90" height="800" fill="#6E7882" stroke="#3E464E" stroke-width="5"/><rect x="840" y="-460" width="90" height="800" fill="#6E7882" stroke="#3E464E" stroke-width="5"/>`
    + `<rect x="-840" y="-200" width="150" height="540" fill="#4E9A5E" stroke="#2E6A3A" stroke-width="4"/><rect x="690" y="-200" width="150" height="540" fill="#4E9A5E" stroke="#2E6A3A" stroke-width="4"/>`;
  B += lcLab(t, cOn - .2, -260, -300, "ON: it lifts", 380, -60, { t1: cOff - .3, size: 42, fill: "#EAF8EC" }) + lcLab(t, cOff, -300, -300, "OFF: it lets go", -380, 120, { t1: tK - 1, size: 42 });
  let s = panIn(A + `<g transform="translate(1900 0)">${B}</g>`, px, 0, z);
  // ELECTROMAGNET: lines to Momo's coil and to the crane's disc (both seen side by side)
  if (t >= tK + .2) { const a = ramp(t, tK + .2, .3), cx = (60 - px) * z, cy = (190 - 150) * z, dx = (1900 + 620 - 520 * 1.35 * .62 - px) * z, dy0 = (330 - 300) * z; s += pline(-120, -250, cx, cy - 120 * z, a, P.sun) + pline(220, -250, (1900 + 300 - px) * z, -160 * z, a, P.sun); }
  return s; }

/* ================================================================ PART 1 [LOOK CLOSER] 2: what makes it a magnet? (lcparts) ================================================================ */
// FOUR tall columns, each named at the top and joined to its thing: the battery alone · the iron nail alone · one end joined · both ends
// joined; a tray of steel clips under every column. Only the last attracts the clips: the gold glow travels from the battery, round the
// nail and back (small arrows along it); then the clips JUMP to the tip. Pip's face (shy) at the lower left; Basil's for COIL at the lower right.
const COLX = [-660, -220, 220, 660];
function lcPartsArt(t) { const m = MK, tA = m("alone1"), tB = m("alone2"), tO = m("one"), tN = m("nothing"), tBo = m("both"), tF = m("flow"), tBe = m("becomes"), tK = m("kw_coil");
  const foc = t < tB - .3 ? 0 : t < tO - .3 ? 1 : t < tBo - .3 ? 2 : 3, fx = lerp(0, COLX[foc] * .18, eio(clamp((t - tA) / 1))), z = 1 + .06 * eio(clamp((t - tA) / 1));
  let s = lcBG23() + `<rect x="-930" y="130" width="1860" height="330" fill="#E2B378"/>`;
  const NAMES = ["the battery alone", "the iron nail alone", "one end joined", "both ends joined"], T0 = [tA - .5, tB - .5, tO - .5, tBo - .5];
  COLX.forEach((x, i) => { const act = foc === i ? 1 : 0, a = t >= T0[i] ? 1 : .35;
    s += `<rect x="${x - 205}" y="-380" width="410" height="590" rx="26" fill="#fff" opacity="${n2(.55 + .25 * act)}" stroke="${act ? P.sun : "#E3C9A8"}" stroke-width="${act ? 8 : 4}"/>` + OP(a, TF(x, -340, 1, tpill(0, 0, NAMES[i], 34, i === 3 ? GOODC : P.ink, "#fff", { w: 700 })))
      + trayClips22(t, x, 160, .95, { n: i === 3 && t >= tBe ? 12 : 18 }); });
  // 1 the battery alone, held by an adult's hand over the clips: nothing
  if (t >= tA - .5) { const k = ramp(t, tA - .5, .4); s += OP(k, TF(COLX[0], -10, .9, battHolder23(t, 1)) + TF(COLX[0] - 40, -60, .55, hand15({ curl: .5 }), 0)) + xBad23(t, tA + 1.2, COLX[0] + 130, 30) + (t >= tA + 1.2 ? lcLab(t, tA + 1.2, COLX[0], -230, "no clips", COLX[0], 90, { size: 34 }) : ""); }
  // 2 the new iron nail alone: nothing
  if (t >= tB - .5) { const k = ramp(t, tB - .5, .4); s += OP(k, TF(COLX[1], 60, .95, nail22d(0, -150, 1, 90))) + xBad23(t, tB + 1.2, COLX[1] + 130, 30) + (t >= tB + 1.2 ? lcLab(t, tB + 1.2, COLX[1], -230, "no clips", COLX[1], 90, { size: 34 }) : ""); }
  // 3 the coiled nail, one end clipped, the other lying loose with a clear gap (a magnifier on the gap): nothing
  if (t >= tO - .5) { const k = ramp(t, tO - .5, .4); s += OP(k, TF(COLX[2] + 40, 70, .78, rig23(t, { n: 10, hold: [-170, -60], hk: .9, jA: 1, jB: 0 })))
    + magni22(t, tO + .8, COLX[2] + 120, -160, 74, COLX[2] + 40 + (-170 + 113 * .9 + 40) * .78, 70 + (-60 - 45 * .9 + 70) * .78, `<rect x="-90" y="-90" width="180" height="180" fill="#FFF6E6"/>` + BARE(-30, 20, 60) + `<rect x="10" y="-20" width="30" height="34" rx="6" fill="#C9CED4" stroke="#6E7882" stroke-width="4"/>` + T(-6, -40, "gap", 28, "#D84A3A"), "not joined")
    + xBad23(t, tN, COLX[2] + 150, 60); }
  // 4 both ends joined: the glow travels (arrows), the clips jump, a green tick
  if (t >= tBo - .5) { const k = ramp(t, tBo - .5, .4), jB = eo(clamp((t - tBo) / .3)), fl = clamp((t - tF + .4) / .6), clips = t >= tBe - .4 ? [6, { t0: tBe - .3, from: [0, 90] }] : null;
    s += OP(k, TF(COLX[3] + 40, 70, .78, rig23(t, { n: 10, hold: [-170, -60], hk: .9, jA: 1, jB, flow: fl, clips, ck: 1.1 })));
    if (fl > .05) s += lcLab(t, tF, COLX[3] - 120, -250, "from the battery, round the nail, and back", COLX[3] - 60, -60, { size: 24, fill: "#FFF3C8" });
    s += tickB(t, tBe + .3, COLX[3] + 150, 70) + (t >= tBe + .3 ? lcLab(t, tBe + .3, COLX[3] + 170, 190, "clips!", COLX[3] + 40, 120, { size: 34, fill: "#EAF8EC" }) : ""); }
  // COIL: a line to the neat turns
  if (t >= tK + .2) s += pline(360, -120, COLX[3] + 30, -80, ramp(t, tK + .2, .3), P.sun);
  return `<g transform="scale(${n2(z)}) translate(${n2(-fx)} 0)">${s}</g>`; }

/* ================================================================ PART 1 JOURNEY: be the iron nail, in a coil ================================================================ */
// YOU are a new iron nail lying on the table: your long grey body runs from under the frame to your sharp tip at the vanishing point. A giant
// orange-red wire, held by an adult's hands (four fingers and a thumb), wraps round you from near your head towards your tip, each turn neatly
// beside the last (turn 1 · 2 · ... 10); the two bare ends stick out. jon: the hands clip the ends to the battery holder (joined!, a green ON
// tag); a gold glow runs round the turns and a gold ring of pull glows at your tip; jjump: the clips JUMP and cling to your tip. joff: a giant
// hand lifts the holder away (it goes completely), OFF; the glow and the ring fade to nothing; jdrop: the clips let go and fall into the tray.
function coilJourney(t, s) { const m = MK, tL = m("jlie"), tC = m("jcoil"), tOn = m("jon"), tP = m("jpull"), tJ = m("jjump"), tOff = m("joff"), tG = m("jgone"), tD = m("jdrop");
  const V = [960, 470], Y0 = 640, depth = (z) => [V[0], V[1] + Y0 / z], hw = (z) => 170 / z;
  let o = `<rect width="1920" height="1080" fill="#CFE8F6"/>`;
  // far off, soft: the coffee shop and the road seen from down here
  o += `<g filter="url(#b4)" opacity=".9"><rect x="-20" y="${V[1] - 260}" width="1960" height="260" fill="#C9C3B6"/><rect x="-20" y="${V[1] - 420}" width="700" height="200" fill="#4E9A5E"/><rect x="1240" y="${V[1] - 420}" width="700" height="200" fill="#4E9A5E"/><rect x="80" y="${V[1] - 520}" width="60" height="300" fill="#E8DCC8"/><rect x="1780" y="${V[1] - 520}" width="60" height="300" fill="#E8DCC8"/><circle cx="380" cy="${V[1] - 560}" r="200" fill="#6CBF52"/></g>`;
  // the table top: a wide white field running to the vanishing point
  o += `<path d="M-200 ${V[1]} H2120 V1200 H-200z" fill="#F2EDE4"/>` + [...Array(13)].map((_, i) => `<path d="M${n2(V[0] + (i - 6) * 30)} ${V[1]} L${n2(V[0] + (i - 6) * 520)} 1200" stroke="#DED6C6" stroke-width="2" opacity=".7"/>`).join("");
  // the tray of steel clips: a range of silver loops just past your tip
  const P2 = depth(11); o += trayClips22(t, P2[0] + 30, P2[1] + 46, .95, { n: t >= tJ && t < tD + .4 ? 14 : 24 });
  // YOU: your body
  o += `<path d="M${n2(V[0] - hw(1.15))} 1100 L${n2(P2[0] - hw(11))} ${n2(P2[1])} L${n2(V[0])} ${n2(P2[1] - 6)} L${n2(P2[0] + hw(11))} ${n2(P2[1])} L${n2(V[0] + hw(1.15))} 1100z" fill="#8E979F" stroke="#454C54" stroke-width="5"/>`
    + `<path d="M${n2(V[0] - hw(1.15) * .45)} 1100 L${n2(V[0] - hw(11) * .4)} ${n2(P2[1])}" stroke="#D8DEE3" stroke-width="16" opacity=".8"/>`;
  // the wire's turns: turn i at depth z_i, laid from your head towards your tip between tC and tOn - .9
  const N = 10, zOf = (i) => 1.7 + i * .55, nt = t < tC ? 0 : Math.min(N, (t - tC) / ((tOn - .9 - tC) / N)), on = t >= tOn + .2 && t < tOff + .3, gl = on ? clamp((t - tOn - .2) / .5) : t >= tOff + .3 ? 1 - clamp((t - tOff - .3) / .8) : 0;
  for (let i = N - 1; i >= 0; i--) { if (i >= Math.ceil(nt)) continue; const z = zOf(i), p = depth(z), w = hw(z) * 1.35, th = 46 / z, fr = Math.min(1, nt - i), tx = p[0] - w + 2 * w * fr;
    const d = `M${n2(p[0] - w)} ${n2(p[1] + th * .3)} Q${n2(p[0])} ${n2(p[1] - w * .75)} ${n2(tx)} ${n2(p[1] + th * .3 - (fr < 1 ? w * .75 * Math.sin(Math.PI * fr) : 0))}`;
    o += `<path d="${d}" stroke="${WIRED}" stroke-width="${n2(th * 1.15)}" fill="none" stroke-linecap="round"/><path d="${d}" stroke="${WIREC}" stroke-width="${n2(th * .78)}" fill="none" stroke-linecap="round"/><path d="${d}" stroke="#FFC9A0" stroke-width="${n2(th * .16)}" fill="none" stroke-linecap="round" opacity=".7"/>`;
    if (gl > .01) o += OP(gl * (.55 + .45 * Math.sin(t * 6 - i * .7)), `<path d="${d}" stroke="#FFF3B0" stroke-width="${n2(th * .3)}" fill="none" stroke-linecap="round"/>`); }
  // the turn counter, and the two ends (once the coil is done) running out to the right, to the battery holder
  if (t >= tC && t < tOn + 1.5) o += TF(1560, 300, spring(t, tC, .45) * (1 - ramp(t, tOn + 1.2, .3)), tpill(0, 0, "turn " + Math.max(1, Math.min(N, Math.ceil(nt))), 40, "#fff", P.ink, { w: 700 }));
  const done = nt >= N - .01, hA = t < tOff ? 1 : 1 - clamp((t - tOff - .2) / .9), hUp = t < tOff ? 0 : eio(clamp((t - tOff) / 1.1)), HX = 1500, HY = 700 - 420 * hUp;
  if (done) { const a = depth(zOf(0)), b = depth(zOf(N - 1)), jn = eo(clamp((t - tOn + .4) / .5)) * (t < tOff ? 1 : 1 - eo(clamp((t - tOff) / .3))), eA = [lerp(1300, HX - 150, jn), lerp(860, HY - 60, jn)], eB = [lerp(1640, HX + 150, jn), lerp(820, HY - 60, jn)];
    const dA = `M${n2(a[0] + hw(zOf(0)) * 1.35)} ${n2(a[1])} C1150 ${n2(a[1] + 20)} 1250 900 ${n2(eA[0])} ${n2(eA[1])}`, dB = `M${n2(b[0] + hw(zOf(N - 1)) * 1.35)} ${n2(b[1])} C1250 ${n2(b[1] + 10)} 1700 700 ${n2(eB[0])} ${n2(eB[1])}`;
    o += wireStroke(dA, { w: 22 }) + wireStroke(dB, { w: 16 }) + (gl > .01 ? glowStroke(dA, t, gl) + glowStroke(dB, t, gl, 20, true) : "");
    if (hA > .01) o += OP(hA, TF(HX, HY, 1.3, battHolder23(t, 1)) + TF(HX, HY + 90, 1.2, onTag(t >= tOn && t < tOff)));
    if (t >= tOff && hA <= .01) o += TF(HX, 790, 1.2, onTag(false)); }
  // the adult's hands: wrapping the wire (tC .. tOn - .9), clipping the ends (tOn - .6 .. tOn + .4), lifting the holder away (tOff .. tG)
  if (t >= tC - .4 && t < tOn - .7) { const z = zOf(Math.min(N - 1, Math.floor(nt))), p = depth(z), sw = Math.sin((nt % 1) * Math.PI * 2); o += TF(p[0] + hw(z) * 1.6 * sw, p[1] - 200 / z - 60, 2.4 / Math.sqrt(z), hand15({ curl: .6, sleeve: "#8A949E", sleeveD: "#5A6470" }), -60 + 30 * sw); }
  if (t >= tOn - .8 && t < tOn + .6) o += TF(HX - 160, HY - 160, 1.1, hand15({ curl: .55, sleeve: "#8A949E", sleeveD: "#5A6470" }), 70);
  if (t >= tOff - .4 && t < tG) o += OP(hA, TF(HX, HY - 170, 1.2, hand15({ curl: .62, sleeve: "#8A949E", sleeveD: "#5A6470" }), 90));
  // the pull: a gold ring glowing at your tip (only while on); the clips jump and cling, then drop when it is off
  if (gl > .01 && t >= tP - .6) o += OP(gl * clamp((t - tP + .6) / .6), `<circle cx="${P2[0]}" cy="${P2[1]}" r="${n2(46 + 8 * Math.sin(t * 7))}" fill="none" stroke="#FFD34A" stroke-width="10"/><circle cx="${P2[0]}" cy="${P2[1]}" r="${n2(80 + 14 * Math.sin(t * 5))}" fill="none" stroke="#FFF3B0" stroke-width="5" opacity=".6"/>`);
  if (t >= tJ - .6 && t < tD + 1.2) { const sh = t < tJ ? 3 * Math.sin(t * 60) : 0; o += clipBunch(t, P2[0] + sh, P2[1] + 4, 8, { k: 1.6, t0: tJ, from: [P2[0] + 40, P2[1] + 60], drop: tD, to: [P2[0] + 30, P2[1] + 50] }); }
  // your flat round head, just under the bottom of the frame
  o += `<path d="M560 1080 Q960 ${n2(1040 + 4 * Math.sin(t * 2))} 1360 1080z" fill="#A7B0B8" stroke="#454C54" stroke-width="6"/>`;
  return JOLT(t, [tOn + .05, tJ + .25, tOff + .1], o, 12); }

/* ================================================================ PART 2 [LOOK CLOSER] 1: why do more turns help? (lcturns) ================================================================ */
// two coiled nails side by side (the same nail, the same wire, one battery each in identical holders): ten turns (left) and twenty turns
// (right); chips name what is the same; only the coils glow. dip: each dips into its tray: ten turns a small bunch, twenty a bigger bunch.
// why: one small green arrow on each turn, pointing along the nail to the tip; the arrows slide together into one bar each (the twenty-turn
// bar twice as long). bell: a smooth glide to the school bell, its little black box opened: the coil with MANY turns round an iron core;
// slowed down: ON, the coil pulls the strip, the hammer hits the gong; OFF, it springs back; then up to speed (on and off, very fast).
const TURNX = [-330, 330];
function lcTurnsArt(t) { const m = MK, tS = m("same"), tO = m("only"), tD = m("dip"), tW = m("why"), tK = m("kw_strength"), tB = m("bell"), tF = m("fast");
  const pb = eio(clamp((t - tB + .4) / 1.3)), px = 1900 * pb;
  let A = lcBG23() + `<rect x="-930" y="200" width="1860" height="260" fill="#DDB27A"/>`;
  const dip = (i) => t >= tD + i * .9 && t < tD + i * .9 + 1.8 ? 70 * Math.sin(Math.PI * clamp((t - tD - i * .9) / 1.8)) : 0;
  [10, 20].forEach((n, i) => { const x = TURNX[i], on = t >= tD + i * .9 + .3, bunch = on ? [n === 10 ? 3 : 7, { t0: tD + i * .9 + .5, from: [0, 130] }] : null;
    A += trayClips22(t, x + 40, 320, 1.0, { n: on ? (n === 10 ? 18 : 14) : 22 }) + TF(x + 40, 150 + dip(i), 1.1, rig23(t, { n, sp: 11, hold: [-250, -70], hk: .85, jA: 1, jB: 1, flow: on ? .7 : 0, clips: bunch, ck: 1.0 }))
      + TF(x + 40, -290, 1, tpill(0, 0, n === 10 ? "ten turns" : "twenty turns", 40, "#fff", P.ink, { w: 700 })); });
  // what is the same (grey chips joined to what they name); the coils glow (only the turns are different)
  A += lcLab(t, tS - .2, -640, -250, "the same nail", TURNX[0] + 40, -60, { size: 30, fill: "#E6E9EC", t1: tW - .3 }) + lcLab(t, tS + .5, -640, -170, "the same wire", TURNX[0] + 20, -150, { size: 30, fill: "#E6E9EC", t1: tW - .3 })
    + lcLab(t, tS + 1.2, -640, -90, "one battery each", TURNX[0] - 170, 60, { size: 30, fill: "#E6E9EC", t1: tW - .3 });
  if (t >= tO && t < tW) A += [0, 1].map((i) => `<rect x="${TURNX[i] + 40 - 34}" y="${150 - 230 * 1.1 - 10}" width="68" height="${n2((i ? 220 : 110) * 1.1 + 20)}" rx="20" fill="none" stroke="${P.sun}" stroke-width="7" opacity="${n2(.5 + .5 * Math.sin(t * 6))}"/>`).join("") + lcLab(t, tO, 0, -250, "only the turns are different", TURNX[1] - 10, -150, { size: 32, fill: "#FFF3C8" });
  // the pull: one small green arrow per turn (pointing to the tip), then the arrows slide together into a bar
  if (t >= tW - .2) { const u = eio(clamp((t - tW - 1.6) / 1.2));
    [10, 20].forEach((n, i) => { const x = TURNX[i] + 40, bx = x + 120; for (let j = 0; j < n; j++) { if (t < tW - .2 + j * .06) continue; const y0 = 150 + (-252 + j * 11 + 5) * 1.1, yy = lerp(y0, 200 - (n - j) * 14, u), xx = lerp(x + 34, bx, u);
        A += TF(xx, yy, 1, `<path d="M0 -10 V8 M-7 2 L0 10 L7 2" stroke="${PULLC}" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`); }
      if (u > .9) A += OP((u - .9) * 10, `<rect x="${bx - 14}" y="${200 - n * 14 - 8}" width="28" height="${n * 14 + 16}" rx="10" fill="${PULLC}" opacity=".85"/>`); });
    A += lcLab(t, tW + .4, 0, -330, "each turn adds a little pull", TURNX[1] + 160, -120, { size: 34, fill: "#EAF8EC", t1: tB - .4 }); }
  // STRENGTH: a line to the bigger bunch
  if (t >= tK + .2 && t < tB) A += pline(240, -230, TURNX[1] + 40, 230, ramp(t, tK + .2, .3), P.sun);
  // the bell (x 1900): the corridor wall, the bell cut away
  const slow = t < tF ? 1 : 0, ph = t - tB - .8, onS = slow ? (ph > 0 ? (Math.floor(ph / 1.1) % 2 === 0 ? eio(clamp((ph % 1.1) / .25)) : 1 - eio(clamp((ph % 1.1) / .25))) : 0) : (Math.sin(t * 60) > 0 ? 1 : 0);
  let B = `<rect x="-930" y="-460" width="1860" height="920" fill="#EDE6D6"/><rect x="-930" y="300" width="1860" height="160" fill="#C9C1B4"/>` + TF(0, -60, .95, bellCut23(t, { on: onS, flow: 1 }));
  B += lcLab(t, tB + .3, -640, 130, "many turns of wire", -210, 180, { size: 34 }) + lcLab(t, tB + .9, 640, 200, "iron strip", 200, 260, { size: 32 }) + lcLab(t, tB + 1.3, 620, -300, "hammer", 90, -230, { size: 32 })
    + (slow ? TF(-640, -340, spring(t, tB + .4, .4), tpill(0, 0, "slowed down", 34, P.ink, "#fff", { w: 700 })) : lcLab(t, tF, -560, -340, "on and off, very fast", 0, -200, { size: 36, fill: "#FFF3C8" }))
    + (slow && onS > .9 && ph > 0 ? TF(-150, -330, 1, tpill(0, 0, "ding", 34, P.sun, P.ink, { w: 700 })) : "");
  return panIn(A + `<g transform="translate(1900 0)">${B}</g>`, px, 0, 1); }

/* ================================================================ PART 2 [LOOK CLOSER] 2: no more wire? (lcbatt) ================================================================ */
function lcBattArt(t) { const m = MK, t1 = m("one1"), t2 = m("two2"), tD = m("dip2"), tF = m("flow2"), tK = m("kw_number_of_batteries");
  let A = lcBG23() + `<rect x="-930" y="200" width="1860" height="260" fill="#DDB27A"/>`;
  const dip = (i) => t >= tD + i * .9 && t < tD + i * .9 + 1.8 ? 70 * Math.sin(Math.PI * clamp((t - tD - i * .9) / 1.8)) : 0;
  [1, 2].forEach((nb, i) => { const x = TURNX[i] + (i ? 60 : 0), on = t >= tD + i * .9 + .3, fl = t >= tF - 1.2 ? clamp((t - tF + 1.2) / .6) * (i ? 1 : .55) : (on ? .5 : 0), bunch = on ? [nb === 1 ? 6 : 11, { t0: tD + i * .9 + .5, from: [0, 130] }] : null;
    A += trayClips22(t, x + 40, 320, 1.0, { n: on ? (nb === 1 ? 14 : 10) : 22 }) + TF(x + 40, 150 + dip(i), 1.1, rig23(t, { n: 20, hold: [i ? -300 : -250, -70], hk: i ? .7 : .85, batt: nb, jA: 1, jB: 1, flow: fl, clips: bunch, ck: 1.0 }))
      + TF(x + 40, -290, 1, tpill(0, 0, nb === 1 ? "1 battery" : "2 batteries", 40, "#fff", P.ink, { w: 700 })); });
  A += lcLab(t, t1 - .4, -640, -250, "the same nail", TURNX[0] + 40, -60, { size: 30, fill: "#E6E9EC", t1: tK - .6 }) + lcLab(t, t1 + .4, -640, -170, "the same twenty turns", TURNX[0] + 20, -150, { size: 30, fill: "#E6E9EC", t1: tK - .6 })
    + lcLab(t, t1 + 1.2, 0, 380, "the same clips", TURNX[0] + 40, 300, { size: 30, fill: "#E6E9EC", t1: tK - .6 });
  if (t >= t2 && t < tD) A += [0, 1].map((i) => { const x = TURNX[i] + (i ? 60 : 0) + 40 + (i ? -300 : -250) * 1.1, w = (i ? 414 * .7 : 226 * .85) * 1.1; return `<rect x="${n2(x - w / 2 - 12)}" y="${n2(150 - 160 * 1.1)}" width="${n2(w + 24)}" height="110" rx="20" fill="none" stroke="${P.sun}" stroke-width="7" opacity="${n2(.5 + .5 * Math.sin(t * 6))}"/>`; }).join("") + lcLab(t, t2, 60, -250, "only the batteries are different", TURNX[1] + 60 - 280, -60, { size: 32, fill: "#FFF3C8" });
  if (t >= tF) A += lcLab(t, tF, 560, -260, "more electricity", TURNX[1] + 100, -120, { size: 34, fill: "#FFF3C8" });
  if (t >= tK + .2) A += pline(200, -230, TURNX[1] + 60 + 40 - 300 * 1.1, 40, ramp(t, tK + .2, .3), P.sun);
  return A; }

/* ================================================================ PART 2 JOURNEY: be a steel bolt ================================================================ */
// YOU are the steel bolt lying in the scrap tray: your grey hex head and threaded body at the bottom of the frame; round you giant steel caps,
// clips, aluminium ring-pulls and bright plastic caps (each named the first time, jrings); far above, the cardboard crane's arm and string.
// jten: Momo's hook (a giant nail tip, a short coil of ten turns) comes down; a weak shimmer; you tip up a little (jtip) and slip back (jslip);
// it goes up and away and fades out completely. jtwenty: Basil's hook (a long coil of twenty turns) comes down; a strong gold ripple; you jump
// and cling (jjump); you rise; the ring-pulls and plastic caps lie still (jstay), two steel caps jump up after you.
const hookArt = (t, n, k) => TF(0, 0, k, rig23(t, { n, sp: 11, free: [[-30, -300], [-14, -300]] }));
function boltJourney(t, s) { const m = MK, tT = m("jtray"), tR = m("jrings"), tN = m("jten"), tTip = m("jtip"), tS = m("jslip"), tW = m("jtwenty"), tJ = m("jjump"), tSt = m("jstay");
  const rise = eio(clamp((t - tJ - .3) / 1.6)), tip = t >= tTip - .3 && t < tS + .3 ? Math.sin(Math.PI * clamp((t - tTip + .3) / (tS - tTip + .6))) : 0;
  let o = `<rect width="1920" height="1080" fill="#F2EDE4"/>`;
  // far above: the room's ceiling and the cardboard crane's arm with its string
  o += `<g transform="translate(0 ${n2(rise * 120)})"><rect x="-100" y="-100" width="2120" height="360" fill="#FBF8F2"/>` + TF(1400, 90, .7, fan22(t * .5, 0, 0)) + `<path d="M300 60 L1300 110" stroke="#3A2E52" stroke-width="40" stroke-linecap="round"/><path d="M300 60 L1300 110" stroke="#FFC83A" stroke-width="30" stroke-linecap="round"/></g>`;
  // the scrap round you (it drops away as you rise)
  const hy = rise * 620;
  o += `<g transform="translate(0 ${n2(hy)})"><rect x="-100" y="600" width="2120" height="700" fill="#C49A62"/><rect x="-100" y="590" width="2120" height="20" fill="#D8B27E"/>`;
  const SCRAP = [["ring", 330, 760, 2.6, 20], ["plastic", 600, 700, 2.4, -10, "#3A8DFF"], ["cap", 1480, 720, 2.6, 0], ["ring", 1650, 860, 2.8, -30], ["plastic", 1250, 900, 2.6, 15, "#FFC83A"], ["cap", 760, 920, 2.7, 0], ["clip", 1150, 690, 1.6, 40], ["ring", 220, 980, 3, 10], ["plastic", 1760, 640, 2.2, -20, "#E0453A"]];
  SCRAP.forEach(([k, x, y, sc, a, c], i) => { const jumped = k === "cap" && t >= tJ + .5 + i * .1, ju = jumped ? eio(clamp((t - tJ - .5 - i * .1) / .5)) : 0, yy = y - ju * (y - 640) - ju * hy;
    o += k === "ring" ? ringPull23(x, y, a, sc) : k === "plastic" ? plasticCap23(x, y, c, a, sc) : k === "cap" ? steelCap23(lerp(x, 960 + (x - 960) * .3, ju), yy, a, sc) : TF(x, y, sc, clip22d(0, 0, a, 1)); });
  o += lcLab(t, tR, 330, 620, "aluminium ring-pull", 330, 730, { size: 34, t1: tN }) + lcLab(t, tR + .6, 600, 560, "plastic cap", 600, 680, { size: 34, t1: tN }) + lcLab(t, tR + 1.2, 1480, 580, "steel cap", 1480, 690, { size: 34, t1: tN });
  if (t >= tSt) o += lcLab(t, tSt, 400, 560 + hy * .2, "they stay behind", 330, 740 + hy * .9, { size: 36 });
  o += `</g>`;
  // the hooks: Momo's (ten turns) down at tN, up and away after the slip (fades out completely); Basil's (twenty turns) from tW
  { const d = t < tN ? -1 : eio(clamp((t - tN) / 1.6)), up = t >= tS + .3 ? eio(clamp((t - tS - .3) / 1.0)) : 0, a = 1 - clamp((t - tS - .6) / .8);
    if (d >= 0 && a > .01) { const y = lerp(-500, 520, d) - 900 * up; o += OP(a, TF(960, y, 2.3, hookArt(t, 10, 1))) + OP(a * (t >= tN + 1.4 && t < tS ? .6 : 0), `<circle cx="960" cy="${n2(y + 10)}" r="${n2(60 + 30 * Math.sin(t * 6))}" fill="none" stroke="#FFF3B0" stroke-width="5"/>`)
      + lcLab(t, tN + .6, 1400, 260, "Momo's hook: ten turns", 990, y - 300, { size: 36, t1: tS + .4 }); } }
  if (t >= tS) o += lcLab(t, tS, 1300, 470, "not strong enough", 1000, 640, { size: 36, t1: tW - .2 });
  { const d = t < tW ? -1 : eio(clamp((t - tW) / 1.4)); if (d >= 0) { const y = lerp(-600, 480, d) - rise * 40; o += TF(960, y, 2.3, hookArt(t, 20, 1)) + lcLab(t, tW + .6, 1420, 220, "Basil's hook: twenty turns", 990, y - 360, { size: 36, t1: tSt });
      if (t >= tW + .9 && t < tJ + .3) for (let i = 0; i < 3; i++) { const u = ((t - tW + i * .3) % .9) / .9; o += `<ellipse cx="960" cy="${n2(y + 20)}" rx="${n2(80 + 360 * u)}" ry="${n2(30 + 120 * u)}" fill="none" stroke="#FFD34A" stroke-width="10" opacity="${n2(.8 * (1 - u))}"/>`; } } }
  // YOU: your hex head and threaded body at the bottom (you tip up on one edge, slip back; then jump up to the hook's tip and rise)
  { const ju = eio(clamp((t - tJ) / .4)), yy = lerp(960, 540, ju) - (t >= tJ ? 0 : 0), a = lerp(-90 * .0 - 14 * tip, -90, ju), k = lerp(3.6, 3.0, ju);
    o += TF(960 + 40 * tip * (1 - ju), yy - 60 * tip, k, bolt23(0, 0, 0, 1), a);
    if (t >= tJ) o += `<circle cx="960" cy="${n2(lerp(880, 500, ju))}" r="${n2(34 + 6 * Math.sin(t * 8))}" fill="#FFF3B0" opacity=".45"/>`; }
  return JOLT(t, [tS + .05, tJ + .3], o, 12); }

/* ================================================================ the pictures ================================================================ */
// Part 1 Round 1's ring picture (lockN obj, drawn round (430, 470)): Momo's paw lifting the battery holder away from the coiled nail, the clips
// still hanging from its tip (no answer), a "?" over the clips
const momoPaw = (x, y, a = 0, k = 1) => TF(x, y, k, `<path d="M-120 -30 H-20 Q10 -30 10 0 Q10 30 -20 30 H-120z" fill="#FB7158" stroke="#B84A38" stroke-width="5"/><ellipse cx="14" cy="0" rx="34" ry="30" fill="#FFE3DC" stroke="#B84A38" stroke-width="5"/>` + [-16, 0, 16].map((dy) => `<circle cx="38" cy="${dy}" r="9" fill="#FFB8A8" stroke="#B84A38" stroke-width="3"/>`).join(""), a);
const ringP1_23 = (t) => TF(460, 560, .75, rig23(t, { n: 10, hold: [-250, -110], hdx: -30 - 20 * Math.sin(t * 1.4), hdy: -40, hk: .9, jA: 0, jB: 0, clips: [4, {}] })) + momoPaw(150, 430, 0, .8) + qMark20(t, 0, 560, 640, 34);
// the HOLD ON! ring: the pillar's wall socket at the left, Momo's coil at the right, a dotted "?" line between them (never touching)
const ringHold23 = (t) => `<rect x="250" y="250" width="120" height="460" fill="#E8DCC8" stroke="#B8A890" stroke-width="4"/>` + socket23(310, 560, .9) + TF(560, 420, .6, rig23(t, { n: 10, free: [[-60, 120], [-30, 90]] }))
  + `<path d="M380 560 Q470 520 520 520" stroke="#fff" stroke-width="7" stroke-dasharray="12 12" fill="none"/>` + qMark20(t, 0, 455, 470, 34);
// Part 2 Round 1's ring: the two coiled nails over the tray of clips, each with its battery holder (one battery each)
const ringP2_23 = (t) => trayClips22(t, 430, 640, .7, {}) + TF(330, 560, .6, rig23(t, { n: 10, hold: [-170, -60], hk: .6 })) + TF(540, 560, .6, rig23(t, { n: 20, hold: [170, -60], hk: .6 }));
// Part 2's three cards: ten turns · twenty turns · both the same (the coils drawn so the difference is obvious)
const cardP2 = (i, t) => { const one = (n, x, k = .55) => TF(x, 110, k, rig23(t, { n, hold: [-150, -40], hk: .7 }));
  if (i === 0) return `<rect x="-200" y="-130" width="400" height="260" fill="#F3EAD8"/>` + one(10, 40, .7) + TF(110, -60, 1, tpill(0, 0, "10", 30, "#fff", P.ink, { w: 700 }));
  if (i === 1) return `<rect x="-200" y="-130" width="400" height="260" fill="#F3EAD8"/>` + one(20, 40, .7) + TF(110, -60, 1, tpill(0, 0, "20", 30, "#fff", P.ink, { w: 700 }));
  return `<rect x="-200" y="-130" width="400" height="260" fill="#F3EAD8"/>` + TF(-70, 110, .5, rig23(t, { n: 10 , free: [[-60, 60], [-40, 40]] })) + TF(90, 110, .5, rig23(t, { n: 20, free: [[-60, 60], [-40, 40]] })) + T(10, -10, "=", 70, P.ink); };
// the Showdown ring: the poster's three small drawings
const ringShow23 = (t) => TF(330, 420, .45, rig23(t, { n: 10, free: [[-40, -150], [-30, -60]] })) + TF(450, 470, .32, rig23(t, { n: 10, hold: [-200, 20] })) + TF(560, 440, .9, chopstick22(0, 0, .45, 90)) + [...Array(6)].map((_, j) => `<path d="M${548} ${400 + j * 9} q12 4 24 0" stroke="${WIREC}" stroke-width="5" fill="none"/>`).join("")
  + [1, 2, 3].map((n, i) => TF([300, 430, 560][i], 330, 1, `<circle r="24" fill="${P.momo}"/>` + T(0, 10, n, 30, "#fff"))).join("");
// Part 2's recap pictures (each centred, large): 1 the coiled nail joined, clips on its tip, ON · 2 the holder apart, the clips in the tray ·
// 3 the wall socket with a red cross beside a battery with a green tick
const recapP2 = (i, t) => { if (i === 0) return trayClips22(t, 0, 170, .9, { n: 14 }) + TF(0, 60, .9, rig23(t, { n: 10, hold: [-260, -40], hk: .9, flow: .8, tag: "on", clips: [6, {}] }));
  if (i === 1) return trayClips22(t, 0, 170, .9, { n: 22 }) + TF(0, 40, .9, rig23(t, { n: 10, hold: [-280, -120], hdx: -40, hdy: -40, hk: .9, jA: 0, jB: 0, tag: "off" }));
  return TF(-170, -20, 1.4, socket23(0, 0, 1)) + `<path d="M-260 -110 L-80 70 M-80 -110 L-260 70" stroke="#D84A3A" stroke-width="20" stroke-linecap="round"/>` + TF(190, 50, 1.1, battHolder23(t, 1)) + TF(290, -100, 1, tickBadge(44)); };
// the fun-fact pictures (funFact items: pic(t, w, h) inside -w/2..w/2, -h/2..h/2)
const ffBg = (w, h, c = "#FFF6E6") => `<rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" fill="${c}"/>`;
const ffCoil23 = (t, w, h) => ffBg(w, h) + TF(-60, 50, 1.3, millipede23(t, { coil: .5 + .5 * Math.sin(t * .8) > .5 ? 1 : .85 })) + TF(90, 120, .5, rig23(t, { n: 10, free: [[-60, 80], [-40, 60]] }));
const ffLegs23 = (t, w, h) => ffBg(w, h) + TF(-10, 110, 1.05, millipede23(t, { walk: true })) + TF(30, -70, 1, `<g filter="url(#dropS)"><rect x="-90" y="-40" width="180" height="80" rx="40" fill="#fff" stroke="${P.ink}" stroke-width="4"/></g>` + T(0, 14, "1000?", 40, P.ink) + `<path d="M-80 30 L80 -30" stroke="#D84A3A" stroke-width="9" stroke-linecap="round"/>`);
const ffEar23 = (t, w, h) => ffBg(w, h, "#EAF6E2") + TF(-40, 90, 2.6, cricket23(t, { ear: true })) + `<circle cx="${n2(-40 + 31 * 2.6)}" cy="${n2(90 - 6 * 2.6)}" r="22" fill="none" stroke="#D84A3A" stroke-width="6"/>`;
const ffBell23 = (t, w, h) => ffBg(w, h, "#EDE6D6") + TF(-60, -40, .6, bell23(t, { ring: 1 })) + TF(90, 110, 1.4, cricket23(t, { ear: true }));
// the Mark Sentence pictures under the cards
const underBox23 = (inner, w = 1300, h = 230) => `<g filter="url(#dropS)"><rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="26" fill="#FFF8EA" opacity=".95"/></g>` + inner;
const markOnOff = (t, x, y, k) => TF(x, y, k, underBox23(trayClips22(t, -300, 90, .6, { n: 14 }) + TF(-300, 30, .5, rig23(t, { n: 10, hold: [-230, -40], flow: .7, tag: "on", clips: [5, {}] })) + trayClips22(t, 300, 90, .6, { n: 22 }) + TF(300, 30, .5, rig23(t, { n: 10, hold: [-250, -110], hdx: -30, jA: 0, jB: 0, tag: "off" })), 900, 300));
const markSteps = (t, x, y, k) => TF(x, y, k, underBox23([0, 1, 2].map((i) => { const cx = -420 + i * 420; return TF(cx, 0, 1, `<circle cx="-150" cy="-100" r="26" fill="url(#gSun)"/>` + T(-150, -90, i + 1, 30, P.ink)) + (i === 0 ? TF(cx, 110, .38, rig23(t, { n: 10, nt: 6 + 4 * ((t * .4) % 1), reel: [140, -200] })) : i === 1 ? TF(cx + 40, 100, .38, rig23(t, { n: 10, hold: [-240, -40] })) : trayClips22(t, cx + 20, 100, .45, { n: 14 }) + TF(cx + 20, 60, .38, rig23(t, { n: 10, hold: [-240, -40], clips: [4, {}] }))); }).join(""), 1300, 300));
const markTurns = (t, x, y, k) => TF(x, y, k, underBox23(trayClips22(t, -360, 90, .5, { n: 12 }) + TF(-360, 40, .45, rig23(t, { n: 10, hold: [-220, -40], clips: [3, {}] })) + T(-360, -110, "10 turns", 30, P.ink) + trayClips22(t, 60, 90, .5, { n: 10 }) + TF(60, 40, .45, rig23(t, { n: 20, hold: [-220, -40], clips: [7, {}] })) + T(60, -110, "20 turns", 30, P.ink) + TF(420, 20, .3, bellCut23(t, { on: 0 })), 1200, 300));
const markBatt = (t, x, y, k) => TF(x, y, k, underBox23(trayClips22(t, -420, 90, .5, { n: 12 }) + TF(-420, 40, .45, rig23(t, { n: 20, hold: [-220, -40], clips: [6, {}] })) + T(-420, -110, "1 battery", 30, P.ink) + trayClips22(t, 40, 90, .5, { n: 10 }) + TF(40, 40, .45, rig23(t, { n: 20, batt: 2, hold: [-290, -40], hk: .6, clips: [11, {}] })) + T(40, -110, "2 batteries", 30, P.ink) + paperLorry23(t, 420, 110, .5, { load: bolt23(-50, -120, 0, .8) }), 1300, 300));
// the chant's flashing board (chantScene o.board(t, flash)): line 1 the ten- and twenty-turn coils; line 2 the one- and two-battery holders;
// line 3 the wall socket with its red cross beside a battery with a green tick
const chantBoard23 = (t, f) => { const box = (x, y, w, h, fl, inner) => `<g transform="translate(${x} ${y}) scale(${n2(1 + .06 * fl)})"><g filter="url(#dropS)"><rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="24" fill="#FFF8EA" stroke="${fl > .1 ? P.sun : "#E3C9A8"}" stroke-width="${n2(5 + 6 * fl)}"/></g>${inner}</g>`;
  return box(1640, 300, 400, 200, f[0], TF(-90, 80, .32, rig23(t, { n: 10, hold: [-180, -40] })) + TF(90, 80, .32, rig23(t, { n: 20, hold: [-180, -40] })))
    + box(1640, 530, 400, 200, f[1], TF(-100, 40, .45, battHolder23(t, 1)) + TF(90, 40, .42, battHolder23(t, 2)))
    + box(1640, 760, 400, 200, f[2], TF(-80, 0, .7, socket23(0, 0, 1)) + `<path d="M-130 -50 L-30 50 M-30 -50 L-130 50" stroke="#D84A3A" stroke-width="12" stroke-linecap="round"/>` + TF(90, 40, .5, battHolder23(t, 1)) + TF(150, -40, 1, tickBadge(28))); };
