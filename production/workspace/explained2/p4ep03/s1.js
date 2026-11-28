// s1.js: P4 EP3 "The Case of the Mystery Leaf": shared helpers and the opening (the cold open at the Science Help Desk, the title, the
// witness, the fix cards in a huddle round the mystery leaf, the lock-in, the picks and the first missed high-five). The approved script v2
// (../p4/p4_ep03_script.md, Genie 3cbc25d). s2.js: clue 1 and clue 2 tested, the look-closer, the journey, NET VEINS. s3.js: the suspects,
// GLITCH, the witness reveal, the words that earn marks, the cosy end, the cactus, the ritual ending, the blooper and GLITCH's sting.
// Built on the P4 EP2 engine (../p4ep02/: lib.js, common.js, ep2art.js); the new art is in ep3art.js; the four-face score bar in
// ../kit/score4.js (the script's question 9 A).
P.lim = "#6FB3DE"; BNAME.lim = "Uncle Lim";
window.PIP_HELMET = true;
const x2bd = (who, x, y, h, t, o = {}) => buddy(who, x, y, h, t, o);
const x2bc = (c, who, x, y, h, t, o = {}) => { const [X, Y] = camPt(c, [x, y]); return buddy(who, X, Y, h * c[0], t, o); };
const x2place = (name, inner, c) => CAM(bg(name) + inner, c[0], c[1], c[2]);
const x2held = (c, who, x, y, h, flip, inner, dy = 0, dx = 0) => { const [X, Y] = camPt(c, [x, y]), [px, py] = pawPt(who, X, Y, h * c[0], flip); return TF(px + (flip ? -dx : dx) * c[0], py + dy * c[0], c[0], flip ? `<g transform="scale(-1 1)">${inner}</g>` : inner); };
const x2fine = (t, t0, t1, txt, x = 560, y = 1032) => OP(1 - ramp(t, t1, .3), finePrint(t, t0, txt, x, y));
const x2HUD = (t) => HUD(t);
const FOOT = "Primary 4 Science · Systems · Plant System: parts of a leaf";
SCORE4.push([MK("coin1") - .05, 1, 0, 0, 1]);   // the clue pick: the viewers who picked 3, and Basil (who picked 3 for the right reason), each +1 at k1106
window.SHELF_AWAY = () => 0;
const x2said = (id) => { if (window._SAID) window._SAID[id] = 1; return ""; };
const x2whiff = (t, t0, x, y) => { const u = (t - t0) / .7; if (u < 0 || u > 1) return ""; return OP(1 - u, `<g transform="translate(${x} ${y})">${[-1, 0, 1].map((i) => `<path d="M${-70 + 40 * u} ${i * 22} q40 ${-10 * i} 140 0" stroke="#fff" stroke-width="7" fill="none" stroke-linecap="round" opacity=".9"/>`).join("")}</g>`) + comicWord(t, t0 + .05, x, y - 70, "whiff.", { size: 46, tiny: true, col: "#fff", d: .7 }); };
const x2frozen = (k) => k <= .01 ? "" : OP(k, `<rect x="18" y="18" width="1884" height="1044" fill="none" stroke="#fff" stroke-width="22"/><rect width="1920" height="1080" fill="#FFE9C8" opacity=".12"/>`);
const x2flash = (t, t0, a = .7, d = .18) => t < t0 || t > t0 + d * 3 ? "" : `<rect x="0" y="0" width="1920" height="1080" fill="#fff" opacity="${n2(a * pulse(t, t0, .01, d))}"/>`;
const x2lab = (t, t0, t1, txt, x, y, px, py, size = 36, col = "#fff") => t < t0 - .05 || t > t1 + .35 ? "" : OP(spring(t, t0, .4) * (1 - ramp(t, t1, .3)), plabel(x, y, txt, px, py, size, col));
const x2gSay = (id, x, y, t, o = {}) => say(id, x, y, t, { size: 40, maxW: 520, tail: 0, ...o });
const slamV2 = (txt, y, size, col, k) => k <= 0 ? "" : TF(960, y, lerp(2.4, 1, eo(k)) * (1 + .05 * wob(k, 1, .4)), `<g transform="translate(0 6)" opacity=".7">${T(0, size * .35, txt, size, P.ink, { ls: 4 })}</g>` + T(0, size * .35 - 6, txt, size, col, { ls: 4 }));
const whip = (t, t0, d = .22) => { const u = (t - t0) / d; return u < 0 || u > 1 ? "" : `<rect width="1920" height="1080" fill="#fff" opacity="${n2(.35 * Math.sin(Math.PI * u))}" filter="url(#b10)"/>`; };

/* ---------------------------------------------------------------- the set (world coordinates, camera 1): ep3art.js BG.vd3 ---------------------------------------------------------------- */
// the Science Help Desk (EP2's deskV3, its sign corrected to PROPERLY) in the middle; the pandan pot by the letterboxes at the left, the
// mango tree in the open side beyond it, the hibiscus hedge in front of the bicycle bay at the right, Uncle Lim's stone table beside it
const DK = { x: 980, y: 800, k: 1.13 }, BELLX = DK.x + 232 * DK.k;
const x2desk = (t, o = {}) => TF(DK.x, DK.y, DK.k, deskV3(t, { cross: 1, proper: 1, ...o }));
// the mystery leaf lying on the desk (seen a little from above); o.k scale; the same leaf in every shot
const LEAFDESK = [905, 790];
const deskLeaf = (t, o = {}) => TF(o.x || LEAFDESK[0], o.y || LEAFDESK[1], o.k || .44, `<g transform="rotate(${o.rot === undefined ? -6 : o.rot}) scale(1 ${o.flat === undefined ? .42 : o.flat}) translate(-120 0)">${hibLeaf({ id: "dl" })}</g>`);
// the mystery leaf held up in a paw (upright, its tip up); k scale
const heldLeaf = (k = .5, rot = -70) => `<g transform="scale(${k}) rotate(${rot}) translate(40 0)">${hibLeaf({ id: "hl2" })}</g>`;
// Uncle Lim at the stone table (front view, his kopi), far back unless the scene brings him near
const LIMF = [1395, 902, .4];
const x2limFar = (t, c, o = {}) => CAM(TF(LIMF[0], LIMF[1], LIMF[2], limStand(t, { bag: true, sip: o.sip !== undefined ? o.sip : .5 + .5 * Math.sin(t * .7), ...o })), c[0], c[1], c[2]);
// the pigeon on the mango tree's low branch (EP1-EP2's running gag); it turns its head to GLITCH on KOO!
const x2pigeonTree = (t, c, tk) => CAM(TF(300, 452, t >= tk ? .62 : -.62, `<!--FACES:right pigeon-->` + pigeonV2(t, { ph: 3 }), 0, .62), c[0], c[1], c[2]);
// GLITCH at the right edge (EP2's painting; he rolls LEFT into the shot mirrored, screen to the front); x2glitchAt(t, c, x, o)
const GK = .43, GY = 1042;
const x2glitchAt = (t, c, x, o = {}) => CAM(TF(x, o.y || GY, o.left ? -GK * (o.k || 1) : GK * (o.k || 1), `<!--FACES:right glitch-->` + (o.tape ? glitchTape(t, { ...o, mirror: !!o.left }) : glitchV3(t, { ...o, mirror: !!o.left })), 0, GK * (o.k || 1)), c[0], c[1], c[2]);
// Basil's cap (script 6b A): plopped on at "Finally" (it slides down to his eyebrows, he pushes it back up), then worn to the end
window.CAP = (t) => { const tc = MK("cap") - .15; if (t < tc - .5) return null; if (t < tc) return lerp(-6, 0, eo((t - tc + .5) / .5));
  if (t < tc + .5) return lerp(0, 1, eio((t - tc) / .5)); if (t < MK("expert") - .2) return 1; if (t < MK("expert") + .2) return lerp(1, .25, eio((t - MK("expert") + .2) / .4));
  const sc = SCN.glitchend, bl = SCN.blooper; if (sc && t >= sc.t0) return null; return .25; };
// the snail (the witness) at its spot for each scene (script section 7); k its size
const SNAIL = { cold: [178, 806, .3], witness: [178, 806, .3], colour: [180, 668, .16], size: [80, 935, .3], suspects: null, glitch: [1980, 760, .26] };

/* ================================================================ COLD · THE PROBLEM: a leaf with no owner, and a robot with sticky tape ================================================================ */
// opens tight on the leaf (a voice in the first second), eases back to the three-shot; SKRRRITCH! GLITCH rolls in from the right; the
// pigeon's KOO!; the camera WHIPS to the pandan (the taped mango leaf, and the pandan leaf on the mango trunk) on "tape"; back right to
// GLITCH tearing a strip beside the hedge (the mango leaf taped on it); back to the three-shot for "Hold it!"
const BAS0 = [1170, 960], MOM0 = [500, 1010], PIP0 = [1640, 1012];
function coldCam(t) { const wide = [1, 960, 540], open = camMix(camOn([905, 780], 1.9, 960, 600), wide, eio(clamp((t - 1.0) / 2.2))), tw_ = MK("whip"), tR = LT("c107") - .1, tB = LT("c108") - .1;
  if (t < tw_ - .1) return open;
  const L = camOn([260, 600], 1.45, 600, 560), R = camOn([1800, 760], 1.35, 1500, 620);
  if (t < tR) return camMix(wide, L, eio(clamp((t - tw_ + .1) / .22)));
  if (t < tB) return camMix(L, R, eio(clamp((t - tR) / .22)));
  return camMix(R, wide, eio(clamp((t - tB) / .3))); }
SC.cold = (t, s) => { const c = coldCam(t), tS = MK("skr"), arrive = clamp((t - tS) / 1.1), gx = lerp(2240, 1810, eo(arrive)), tk = MK("koo");
  const gFace = t < LT("c105") ? "surprised" : t < LT("c107") ? "smug" : "smug", rip = t >= MK("rip1") - .1 && t < LE("c107") + .6 ? clamp((t - MK("rip1") + .1) / .5) : 0;
  const scr = t < LT("c105") + .4 ? scrLRS() : t < LE("c105") + 1.2 ? scrLRS() + scrOwner("MANGO TREE") : scrLRS();
  const glitch = t >= tS - .05 ? x2glitchAt(t, c, gx, { left: true, tape: true, face: gFace, roll: (2240 - gx) / GK, scr, strip: rip }) : "";
  const pnl = t >= LT("c105") + .3 && t < LE("c105") + 1.0 ? spring(t, LT("c105") + .3, .45) * (1 - ramp(t, LE("c105") + .7, .3)) : 0;
  const panel = pnl > .01 ? TF(1180, 250, pnl * .62, chestPanel(t, 1, `<rect x="-280" y="-190" width="560" height="380" fill="#DDF5EC"/>` + `<rect x="-230" y="-150" width="120" height="120" rx="12" fill="#4FA23A" stroke="${INKG}" stroke-width="6"/>` + TF(10, -90, .9, rulerV3(200)) + TF(180, -60, .2, mangoTreeIcon())
    + T(0, 70, "OWNER: MANGO TREE", 44, INKG) + T(0, 135, "ACCURACY 100%", 40, "#2E9E4C"))) : "";
  const momoPoses = [[0, "sit"], [LT("c104") - .1, "sit"], [LE("c104") + .1, "pointing"], [tS, "surprised"], [LT("c105") + .6, "sit"], [LT("c106") - .1, "sit"], [LE("c106") + .05, "horrified/surprised"], [LT("c108") + .5, "arms_crossed"]];
  const world = x2place("vd3", tapedLeaves(t) + TF(SNAIL.cold[0], SNAIL.cold[1], SNAIL.cold[2], snail3(t)), c) + x2pigeonTree(t, c, tk) + x2limFar(t, c);
  const basil = x2bc(c, "basil", ...BAS0, 380, t, { in: -1, flip: true, poses: [[0, "sit"], [LE("c101") + .1, "arms_crossed"], [LT("c104") + .3, "sit"], [tS, "surprised"], [LT("c105") + .4, "sit"], [LT("c108") - .1, "sit"], [LE("c108") + .05, "hero/arms_crossed"]], look: -4 });
  const momo = x2bc(c, "momo", ...MOM0, 380, t, { in: -1, mag: t >= LT("c104") - .1 && t < tS, poses: momoPoses, look: 6 });
  const pip = x2bc(c, "pip", ...PIP0, 370, t, { in: -1, flip: true, poses: [[0, "sit"], [LT("c104") + .5, "thinking"], [tS, "surprised"], [LT("c105") + .5, "panic/thinking"], [LE("c105") + .4, "sit"], [LT("c108") + .5, "arms_crossed"]], look: -6 });
  const desk = CAM(x2desk(t) + deskLeaf(t), c[0], c[1], c[2]);
  return world + basil + desk + momo + pip + glitch + panel
    + (t >= tS - .05 ? comicWord(t, tS, ...camPt(c, [1560, 560]), "SKRRRITCH!", { size: 84, d: .9, rot: -8 }) : "")
    + (t >= LT("c105") ? comicWord(t, LT("c105") + .1, ...camPt(c, [1700, 470]), "BEEP-BOOP!", { size: 60, d: .8, rot: 8 }) : "")
    + (t >= tk ? comicWord(t, tk + .05, ...camPt(c, [420, 340]), "KOO!", { size: 96, d: .8 }) : "")
    + (rip > 0 ? comicWord(t, MK("rip1"), ...camPt(c, [1620, 600]), "SKRITCH!", { size: 72, d: .8, rot: 6 }) : "")
    + inset3(t, MK("chilliinset") - .2, LE("c104") + .2, 960, 250, "Chilli's leaf · the mystery leaf", picChilliLeaf(), P.leaf, 380, 270)
    + x2gSay("c105", 1500, 360, t) + x2gSay("c107", 1500, 360, t)
    + (t >= LT("c108") ? battleCry(t, MK("holdit"), 960, 250, "HOLD IT!", { d: 1.3, k: .6 }) : "")
    + whip(t, MK("whip") - .05) + whip(t, LT("c107") - .12) + whip(t, LT("c108") - .12)
    + OP(ramp(t, LE("c101") - .3, .4) * (1 - ramp(t, LT("c104"), .4)), lowerPill(60, 140, "An HDB void deck ·", "Saturday morning")) + logo(t); };
const mangoTreeIcon = () => `<rect x="-40" y="0" width="80" height="260" fill="#8A5A34" stroke="${INKG}" stroke-width="20"/><circle cx="0" cy="-60" r="230" fill="#3B8F45" stroke="${INKG}" stroke-width="20"/>`;

/* title: THE CASE OF THE / MYSTERY LEAF! on a manila case-file folder over the blurred desk (a paper-clipped photo of the leaf, a magnifier, the tape) */
SC.title = (t, s) => { const u = t - MK("title"), k1 = clamp(u / .16), k2 = clamp((u - .35) / .16), ic = (i, x, y, inner) => TF(x, y, spring(t, MK("title") + .7 + i * .12, .4), inner);
  const folder = TF(960, 560, spring(t, MK("title") - .05, .4), `<g transform="rotate(-2)"><g filter="url(#drop)"><path d="M-620 -300 h360 l40 -50 h220 l40 50 h580 v640 h-1240z" fill="#E8C98A" stroke="#7A5226" stroke-width="10"/></g><path d="M-600 -270 H600" stroke="#D2AE6A" stroke-width="6"/></g>`);
  return `<g filter="url(#b10)">${x2place("vd3", "", [1.05, 960, 600])}${CAM(x2desk(t) + deskLeaf(t), 1.05, 960, 600)}</g><rect width="1920" height="1080" fill="${P.night}" opacity=".45"/>` + folder
    + ic(0, 470, 800, `<g transform="rotate(-8)"><rect x="-150" y="-110" width="300" height="220" fill="#fff" stroke="${P.ink}" stroke-width="6"/><g transform="translate(-100 0) scale(.62)">${hibLeaf({ id: "ttl" })}</g><path d="M-120 -126 h30 v60 h-30z" fill="none" stroke="#8C96A2" stroke-width="7"/></g>`)
    + ic(1, 1050, 830, `<g transform="rotate(-20)"><circle r="78" fill="#E8F6FF" opacity=".55" stroke="${P.ink}" stroke-width="12"/><path d="M55 55 L140 140" stroke="${P.ink}" stroke-width="24" stroke-linecap="round"/></g>`) + ic(2, 1460, 820, tapeRoll(1.1))
    + slamV2("THE CASE OF THE", 330, 104, "#fff", k1) + slamV2("MYSTERY LEAF!", 520, 150, P.sun, k2) + logo(t); };

/* ================================================================ WITNESS · the hidden animal, back for the Case File ================================================================ */
// one smooth push-in from the void deck straight onto the snail on the rim of the pandan pot (1.2 s); the black ring closes round it, the
// blue-violet starry game stage outside; the name badge "garden snail" and a small picture of it; hold; ease back to the desk
SC.witness = (t, s) => { const tin = MK("snailin") - .6, tout = LT("a202") - .4, u = eio(clamp((t - tin) / 1.2)) * (1 - eio(clamp((t - tout) / 1.0)));
  const [sx, sy, sk] = SNAIL.witness, c = camMix([1, 960, 540], camOn([sx + 4, sy - 16], 3.2, 760, 560), u), ki = clamp((t - tin - .9) / .5) * (1 - clamp((t - tout) / .4));
  const view = x2place("vd3", tapedLeaves(t) + TF(sx, sy, sk, snail3(t)), c) + x2pigeonTree(t, c, -9) + x2limFar(t, c) + CAM(x2desk(t) + deskLeaf(t), c[0], c[1], c[2])
    + x2bc(c, "basil", ...BAS0, 380, t, { in: -1, flip: true, poses: [[0, "sit"], [LE("a202") + .05, "deadpan"]], look: -4, ...watchO(BAS0[0], 400) })
    + x2bc(c, "momo", ...MOM0, 380, t, { in: -1, poses: [[0, "sit"], [LT("a201") + 2.5, "thinking"], [LT("a202"), "sit"]], look: 6 })
    + x2bc(c, "pip", ...PIP0, 370, t, { in: -1, flip: true, poses: [[0, "sit"], [LE("a202") + .05, "laughing/oops"]], look: -6 });
  const badge = t >= tin + 1.3 && ki > .02 ? TF(1220, 470, spring(t, tin + 1.3, .45) * ki, `<g filter="url(#drop)"><rect x="-200" y="-150" width="400" height="300" rx="28" fill="#FFF8EA" stroke="${P.sun}" stroke-width="8"/></g>` + TF(-10, 70, .9, snailV2(t, { crown: true })) + tpill(0, 115, "garden snail", 38, P.ink, "#fff", { w: 700 }) + tpill(0, -150, "THE WITNESS", 32, P.sun, P.ink, { w: 700, ls: 3 })) : "";
  return view + iris(ki, 760, 560, 210, "irW") + badge + logo(t); };

/* ================================================================ FIXCARDS · how do we find the leaf's real owner? (a huddle round the leaf) ================================================================ */
// labels on two short lines (cap height >= 40 px on screen: EP2 fix pass 1); a big number badge; the picture above the label band
const FIXLAB3 = [["MATCH THE", "COLOUR"], ["MEASURE THE", "SIZE"], ["READ THE", "LEAF'S PARTS"]];
function x3fixPic(t, n) {
  if (n === 1) return TF(-60, 40, 1.1, swatchFan(1.1)) + TF(80, 20, .34, `<g transform="rotate(-60)">${hibLeaf({ id: "fc1", noMark: true })}</g>`);
  if (n === 2) return TF(0, 70, 1.1, rulerV3(300)) + TF(-110, -10, .36, hibLeaf({ id: "fc2", noMark: true }));
  return TF(-120, 30, .55, hibLeaf({ id: "fc3", noMark: true, hi: { edge: 1, small: .6 } })) + `<g transform="translate(40 -10)"><circle r="78" fill="#E8F6FF" opacity=".45" stroke="${P.ink}" stroke-width="12"/><path d="M55 55 L120 120" stroke="${P.ink}" stroke-width="22" stroke-linecap="round"/></g>`; }
function x2fixCard(t, n, o = {}) { const col = ["#FF6A3D", "#3AA6E8", "#8B5CF6"][n - 1], [l1, l2] = FIXLAB3[n - 1], k = o.k === undefined ? 1 : o.k, fit = (s) => Math.min(72, 72 * 420 / tw(s, 72, 700));
  let s = `<g filter="url(#drop)"><rect x="-230" y="-250" width="460" height="500" rx="34" fill="#FFF8EA" stroke="${col}" stroke-width="12"/></g><clipPath id="fcc${n}"><rect x="-220" y="-240" width="440" height="320" rx="26"/></clipPath><g clip-path="url(#fcc${n})"><g transform="translate(0 -88) scale(.82)">${x3fixPic(t, n)}</g></g>`
    + `<path d="M-230 82 h460 v134 a34 34 0 0 1 -34 34 h-392 a34 34 0 0 1 -34 -34z" fill="${col}"/>` + T(0, 156, l1, fit(l1), "#fff") + T(0, 226, l2, fit(l2), "#fff")
    + `<g transform="translate(-180 -196)" filter="url(#dropS)"><circle r="76" fill="${P.sun}" stroke="${P.ink}" stroke-width="8"/></g>` + T(-180, -166, String(n), 92, P.ink);
  if (o.glow) s = `<rect x="-252" y="-272" width="504" height="544" rx="44" fill="none" stroke="${P.sun}" stroke-width="${n2(14 * o.glow)}" opacity="${n2(Math.min(1, o.glow))}"/>` + s;
  if (o.stamp) { const [txt, good, ts] = o.stamp; if (t >= ts) { const ls = txt.split("|"), sz = 64, w = Math.max(...ls.map((l) => tw(l, sz, 700))) + 60, h = ls.length * sz * 1.1 + 30;
    s += TF(0, -70, lerp(2, 1, eo((t - ts) / .15)), `<g transform="rotate(-12)"><rect x="${n2(-w / 2)}" y="${n2(-h / 2)}" width="${n2(w)}" height="${n2(h)}" rx="18" fill="${good ? P.leaf : "#E5484D"}" stroke="#fff" stroke-width="8"/>${ls.map((l, i) => T(0, n2((i - (ls.length - 1) / 2) * sz * 1.1 + sz * .35), l, sz, "#fff")).join("")}</g>`); } }
  return TF(0, 0, k, s); }
const CX3 = [560, 960, 1360], CARDY = 315, CARDK = .8;
const x2cards = (t, y, k, o = {}) => [1, 2, 3].map((n) => { const ti = o.tin ? o.tin[n - 1] : -9, kk = k * (ti > -9 ? spring(t, ti, .45) : 1); if (kk < .02) return "";
  const sd = o.said ? pulse(t, o.said[n - 1], .04, .6) : 0, xs = o.xs || CX3; return TF(xs[n - 1], y - 14 * sd, kk * (1 + .05 * sd), x2fixCard(t, n, { glow: o.glow ? o.glow(n) : sd, stamp: o.stamp ? o.stamp(n) : null })); }).join("");
// the huddle: the desk low in the frame with the leaf on it, the cork case board with the three cards above; Momo left, Pip right of the
// leaf, Basil far right; GLITCH at the right edge, tape ready; each pitches TO the other two
SC.fixcards = (t, s) => { const tc = [MK("c1"), MK("c2"), MK("c3")], fl = MK("flop1");
  let z = 1, fx = 960; for (let i = 0; i < 3; i++) { const a = tc[i] - .1, b = i === 0 ? tc[1] - .4 : i === 1 ? tc[2] - .4 : fl, u = ss(a, a + .7, t) * (1 - ss(b - .6, b, t)); if (u > 0) { z = 1 + .06 * u; fx = lerp(960, CX3[i], u); } }
  const c = camOn([fx, 330], z, fx, 330), tools = t >= MK("tools") - .6;
  const board = `<g filter="url(#drop)"><rect x="300" y="110" width="1320" height="420" rx="18" fill="#8A5A2B"/></g><rect x="316" y="126" width="1288" height="388" rx="8" fill="url(#cork)"/>`;
  return `<g filter="url(#b4)">${x2place("vd3", "", [1.1, 1100, 700])}</g><rect width="1920" height="1080" fill="${P.night}" opacity=".45"/>`
    + OP(ramp(t, s.t0, .3), board) + TF(920, 950, .78, deskV3(t, { noSign: true })) + TF(900, 942, .5, `<g transform="scale(1 .42) translate(-120 0)">${hibLeaf({ id: "dl" })}</g>`)
    + OP(ramp(t, s.t0 + .1, .3), T(960, 82, "THREE CLUES", 50, P.sun, { ls: 6 })) + CAM(x2cards(t, CARDY, CARDK, { tin: tc.map((x) => x - .1), said: tc }), c[0], c[1], c[2])
    + x2glitchAt(t, [1, 960, 540], 1830, { tape: true, face: t >= LT("f204") - .1 && t < LE("f204") + .4 ? "smug" : "plain", scr: t >= LT("f204") - .1 && t < LE("f204") + .6 ? scrLaugh() : scrLRS(), k: .85 })
    + x2bd("momo", 420, 1076, 340, t, { in: s.t0 - .5, poses: [[s.t0, "thinking"], [LT("f201") - .1, "sit"], [LE("f201") + .05, "pointing"], [LT("f202") + .3, "sit"], [fl + .1, "unimpressed"], [LT("f205") + .2, "thinking"]], look: 6 })
    + (t >= MK("swatches") - .2 && t < LT("f202") + .3 ? x2held([1, 960, 540], "momo", 420, 1076, 340, false, swatchFan(.6), 60, 90) : "")
    + x2bd("pip", 1340, 1076, 330, t, { in: s.t0 - .5, flip: true, poses: [[s.t0, "thinking"], [LT("f201") + .4, "sit"], [LE("f202") + .05, "pointing"], [LT("f203") + .3, "sit"], [fl + .1, "thinking"], [LT("f205") + .2, "thinking"]], look: -6 })
    + (tools ? x2held([1, 960, 540], "pip", 1340, 1076, 330, true, TF(0, 0, spring(t, MK("tools") - .6, .35), toolsBundle()), 40, 30) : "")
    + x2bd("basil", 1600, 1076, 330, t, { in: s.t0 - .5, flip: true, poses: [[s.t0, "thinking"], [LT("f201") + .4, "arms_crossed"], [LT("f203") - .1, "sit"], [LE("f203") + .05, "hero/pointing"], [fl + .1, "deadpan"], [LT("f205") + .2, "thinking"]], look: -6 })
    + (t >= MK("show") - .1 ? TF(1760, 400, spring(t, MK("show") - .1, .4) * .7, countHand(t < W("f205", "two") ? 1 : t < W("f205", "three") ? 2 : 3, {}) + youPill(0, -170, .9)) : "")
    + x2gSay("f204", 1500, 320, t) + x2HUD(t); };

/* the lock-in: the ring with the mystery leaf; the clue labels ON TOP of the ring frame; the cards under it; Pip big at the left (worried),
   peeking over his clipboard held BELOW his eyes */
SC.lock = (t, s) => { const r0 = MK("ring0_fix"), bell = MK("bell_fix"), D = Math.round(bell - r0), rs = ringState(t, r0, D), inT = t >= r0 && t < bell, shut = pulse(t, bell, .01, .6), b = Math.floor(t - r0), RC = [960, 345], RR = 228;
  const inner = `<clipPath id="lkV3"><circle cx="${RC[0]}" cy="${RC[1]}" r="${RR - 26}"/></clipPath><circle cx="${RC[0]}" cy="${RC[1]}" r="${RR - 26}" fill="#E8F3FF"/><g clip-path="url(#lkV3)">${TF(RC[0] - 20, RC[1] + 20, .62, `<g transform="rotate(-30) translate(-130 0)">${hibLeaf({ id: "lk" })}</g>`)}</g>`;
  const ring = ringTimer(RC[0], RC[1], t < bell ? rs.frac : 0, t < bell ? rs.secs : 0, t, { R: RR, sw: 34, tick: rs.tick, shut, chg: inT || (t >= bell && t < bell + .5) ? (t >= bell ? bell : rs.chg) : -9, ns: 1.3, inner });
  const clues = [["green", 1380, 170, 1080, 210], ["big", 520, 230, 860, 270], ["lines on it", 1440, 470, 1020, 430]].map(([txt, x, y, px, py], i) => OP(ramp(t, s.t0 + .2 + i * .15, .3), `<path d="M${x} ${y} L${px} ${py}" stroke="#fff" stroke-width="6" stroke-linecap="round"/>` + clue3(x, y, txt, spring(t, s.t0 + .2 + i * .15, .4), 54, 520))).join("");
  return bg("stage") + OP(ramp(t, s.t0, .3), T(960, 64, "Which clue cracks the case?", 46, "#fff", { w: 600 })) + TF(...RC, spring(t, s.t0, .45) * (1 + .03 * (inT ? rs.tick : 0)), `<g transform="translate(${-RC[0]} ${-RC[1]})">${ring}</g>`) + clues
    + x2cards(t, 880, .8, { xs: [600, 990, 1380], said: [0, 0, 0].map((_, i) => inT && b % 3 === i ? t : -9), glow: (n) => (inT && b % 3 === n - 1 ? .5 + rs.tick * .5 : 0) })
    + OP(ramp(t, r0 - .15, .2) * (t < bell ? .75 + .25 * Math.sin(t * 9) : 1), T(1745, 800, "LOCK IT IN!", 52, P.sun, { ls: 4 }))
    + (t >= bell + .05 ? stamp(t, bell + .05, 960, 610) : "")
    + x2bd("pip", 190, 1076, 440, t, { in: s.t0 - .5, poses: [[s.t0, "worried/thinking"], [bell + .4, "sit"]], look: 4, jump: [[r0 + 1.5, 14], [r0 + 3.5, 14], [r0 + 5.4, 10]] })
    + TF(250, 1076 - 440 * .22, .7, clipPip()) + x2HUD(t); };

/* the picks: the cards rise to a row; each buddy stands under the card they picked (Momo 1, Pip 2, Basil 3); MISS 1: both of Pip's paws are
   full of measuring things (he over-prepared), so Momo's and Basil's paws meet empty air */
SC.picks = (t, s) => { const up = eio(clamp((t - s.t0) / .6)), y = lerp(880, 300, up), k = lerp(.8, .7, up), tp = s.t0 + .3, xsP = [600, 990, 1380].map((x, i) => lerp(x, CX3[i], up));
  const hf = LT("p301") + .3, ms = MK("miss1");
  const cardsUp = x2cards(t, y, k, { xs: xsP, glow: (n) => t >= tp + (n - 1) * .25 ? .6 : 0 });
  return bg("stage") + (up >= 1 ? cardsUp : "")
    + x2bd("momo", CX3[0], 1076, 360, t, { in: s.t0 - .5, poses: [[s.t0, "sit"], [tp, "pointing"], [LT("p301") - .1, "sit"], [hf, "hi5/cheer"], [ms + .35, "unimpressed"], [LT("p302") + .4, "sit"]], look: t > hf && t < ms + .3 ? 10 : 3 })
    + (t < LT("p301") - .1 ? x2held([1, 960, 540], "momo", CX3[0], 1076, 360, false, swatchFan(.6), 60, 90) : "")
    + x2bd("pip", CX3[1], 1076, 360, t, { in: s.t0 - .5, flip: true, poses: [[s.t0, "sit"], [tp + .25, "pointing"], [LT("p301") - .1, "sit"], [ms + .2, "embarrassed/oops"], [LT("p302") + .4, "sit"]], look: 0, noreact: true })
    + x2held([1, 960, 540], "pip", CX3[1], 1076, 360, true, toolsBundle(), 40, 30)
    + x2bd("basil", CX3[2], 1076, 360, t, { in: s.t0 - .5, flip: true, poses: [[s.t0, "sit"], [tp + .5, "hero/pointing"], [LT("p301") - .1, "sit"], [hf, "hi5/cheer"], [ms + .35, "deadpan"], [LT("p302") + .4, "sit"]], look: t > hf && t < ms + .3 ? -12 : -3 })
    + x2whiff(t, ms, 960, 600) + (up < 1 ? cardsUp : "") + x2HUD(t); };
