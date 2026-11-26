// p1.js: P4 EP1 v2 "TheOneApp, Explained", "The Great Void Deck Race": shared helpers and the opening (the cold open's freeze-frame, the
// title, the fix cards in a huddle, the lock-in, the picks and the first missed high-five). The beat table of the approved script
// (../p4/p4_ep01_script.md, version 2, 26 Nov 2026; cards 2 and 3 swapped: script.py). p2.js: the flashback (bell, chain, brakes, the
// runaway, the race). p3.js: the look-closer, the journey, the reversal, SYSTEM, the body and the tree, the words, the cosy end, the rest.
// Staging (P4-new-direction.md "The trio: synergy" and "Scene craft", 26 Nov): every line spoken TO someone and answered by a look, a pose
// or a reply; two-shots for banter, wide for chaos, the round face close-up only for a big feeling; show first, then tell.
// Shared helpers are global functions prefixed x2 (p2.js and p3.js use them). The new emotion paintings are asked for by name
// ("deadpan", "panic/oops", ...): lib.js resolvePose shows today's painting until the new one is in spr/ (new_poses.py).
P.lim = "#6FB3DE"; BNAME.lim = "Uncle Lim";
window.PIP_HELMET = true;
const x2bd = (who, x, y, h, t, o = {}) => buddy(who, x, y, h, t, o);
const x2bc = (c, who, x, y, h, t, o = {}) => { const [X, Y] = camPt(c, [x, y]); return buddy(who, X, Y, h * c[0], t, o); };
const x2place = (name, inner, c) => CAM(bg(name) + inner, c[0], c[1], c[2]);
const x2held = (c, who, x, y, h, flip, inner, dy = 0, dx = 0) => { const [X, Y] = camPt(c, [x, y]), [px, py] = pawPt(who, X, Y, h * c[0], flip); return TF(px + (flip ? -dx : dx) * c[0], py + dy * c[0], c[0], flip ? `<g transform="scale(-1 1)">${inner}</g>` : inner); };
const x2fine = (t, t0, t1, txt, x = 560, y = 1032) => OP(1 - ramp(t, t1, .3), finePrint(t, t0, txt, x, y));
const x2HUD = (t) => HUD(t);
const FOOT = "Primary 4 Science · Systems · What is a system?";
SCORE.push([MK("coin1") - .05, 1, 1]);   // the fix pick: the viewers who picked 2, and Pip (who picked 2), each get a point at e1304
window.SHELF_AWAY = () => 0;
// Basil's grease stripe on his tail (from n505 on: "To make my tail greasy"): drawn in the sit painting's own pixels (lib.js itemsOf hook)
{ const _io = itemsOf; itemsOf = function (who, name, fl, o) { let s = _io(who, name, fl, o); if (who === "basil" && o.grease && poseKey(who, name) === "sit") s = `<path d="M118 318 Q150 300 186 312 M112 356 Q150 340 192 352" stroke="#1E2227" stroke-width="16" stroke-linecap="round" fill="none" opacity=".82"/>` + s; return s; }; }
const x2grease = (t) => t >= MK("sproing") ? { grease: true } : {};

/* ---------------------------------------------------------------- the race clock (story time) ---------------------------------------------------------------- */
// RACE IN 3:00 (cold open), rolls back to 13:00 on "ten minutes earlier", ticks through the flashback (off screen), shows 3:00 again at the
// ice box (k612), then RACE: GO!
function x2raceClock(t, secs, k = 1, x = 960, y = 62, go = 0) { if (k <= .01) return ""; const s = Math.max(0, Math.ceil(secs)), mm = Math.floor(s / 60), ss_ = s % 60, txt = `${mm}:${String(ss_).padStart(2, "0")}`;
  const col = go > .5 ? P.leaf : s <= 180 ? "#FF5A4E" : P.ink, pl = s <= 180 && go < .5 ? 1 + .04 * Math.max(0, Math.sin(t * 6.3)) : 1;
  const inner = go > .5 ? T(0, 15, "RACE: GO!", 44, "#fff") : `<circle cx="-182" cy="0" r="24" fill="#fff"/><circle cx="-182" cy="0" r="18" fill="${P.sun}"/><path d="M-182 0 V-12 M-182 0 L${n2(-182 + 9 * Math.cos(t * 2))} ${n2(9 * Math.sin(t * 2))}" stroke="${P.ink}" stroke-width="4" stroke-linecap="round"/>`
    + T(-140, 13, "RACE IN", 34, "#fff", { a: "start", w: 600 }) + T(176, 15, txt, 46, P.sun, { a: "end", w: 700 });
  return TF(x, y, k * pl, `<g filter="url(#dropS)"><rect x="-230" y="-40" width="460" height="80" rx="40" fill="${col}"/></g>` + inner); }
const x2secs = (t) => { const tc = MK("clock"), tr = MK("rew"); if (t < tr) return 180 - .05 * Math.max(0, t - tc); const u = eio(clamp((t - tr) / 1.4)); return lerp(180 - .05 * (tr - tc), 780, u); };

/* ---------------------------------------------------------------- the fix cards (cards 2 and 3 swapped: script.py) ---------------------------------------------------------------- */
const FIXLAB2 = [["PEDAL FASTER", "(no fixing)"], ["ALL THREE", "PARTS BACK"], ["CHAIN + BRAKES", "(skip the bell)"]];
// the dotted outline where a part is missing (bike coordinates, artp4 BK): bell, chain, brakes
const x2ghostBell = (k = 1, col = "#fff") => `<circle cx="${BK.HT[0] - 24}" cy="${BK.HT[1] - 66}" r="${n2(30 * k)}" fill="none" stroke="${col}" stroke-width="6" stroke-dasharray="8 8"/>`;
const x2ghostChain = () => `<path d="${BIKELOOP.d}" fill="none" stroke="#fff" stroke-width="6" stroke-dasharray="8 9"/>`;
const x2ghostBrakes = () => `<circle cx="${BK.HT[0] - 76}" cy="${BK.HT[1] - 34}" r="26" fill="none" stroke="#fff" stroke-width="6" stroke-dasharray="8 8"/><circle cx="-184" cy="-213" r="24" fill="none" stroke="#fff" stroke-width="6" stroke-dasharray="8 8"/><circle cx="200" cy="-224" r="24" fill="none" stroke="#fff" stroke-width="6" stroke-dasharray="8 8"/>`;
function x2fixPic(t, n) {
  if (n === 1) { const a = t * 9; return TF(10, 110, .48, bikeP4(t, { chain: false, brakes: 0, bell: 0, crank: a, sh: 0, g2: 0, pedalBlur: 1 }))
    + [0, 1, 2].map((i) => `<path d="M${-200 + i * 14} ${-40 + i * 36} h${70 - i * 10}" stroke="${P.ink}" stroke-width="9" stroke-linecap="round" opacity=".4"/>`).join("") + T(140, -110, "zoom!", 34, "#D9402A"); }
  const lit = (inner) => `<g filter="url(#rim)">${inner}</g>`;
  if (n === 2) return TF(0, 110, .48, lit(bikeP4(t, { chain: 1, brakes: 1, bell: 1, crank: .6, lit: 1 }))) + TF(150, -70, .42, clipboardV2(t, { bell: 1, brakes: 1, chain: 1 }));
  return TF(0, 110, .48, lit(bikeP4(t, { chain: 1, brakes: 1, bell: 0, crank: .6 })) + x2ghostBell(1.2, P.ink)); }
function x2fixCard(t, n, o = {}) { const col = ["#FF6A3D", "#3AA6E8", "#8B5CF6"][n - 1], [l1, l2] = FIXLAB2[n - 1], k = o.k === undefined ? 1 : o.k;
  let s = `<g filter="url(#drop)"><rect x="-230" y="-250" width="460" height="500" rx="34" fill="#FFF8EA" stroke="${col}" stroke-width="12"/></g><g transform="translate(0 -20)">${x2fixPic(t, n)}</g>`
    + `<path d="M-230 140 h460 v76 a34 34 0 0 1 -34 34 h-392 a34 34 0 0 1 -34 -34z" fill="${col}"/>` + T(0, 186, l1, 40, "#fff") + T(0, 230, l2, l2.startsWith("(") ? 32 : 40, "#fff", { w: l2.startsWith("(") ? 600 : 700 })
    + `<g transform="translate(-196 -214)" filter="url(#dropS)"><circle r="54" fill="${P.sun}" stroke="${P.ink}" stroke-width="7"/></g>` + T(-196, -194, String(n), 64, P.ink);
  if (o.glow) s = `<rect x="-252" y="-272" width="504" height="544" rx="44" fill="none" stroke="${P.sun}" stroke-width="${n2(14 * o.glow)}" opacity="${n2(Math.min(1, o.glow))}"/>` + s;
  if (o.stamp) { const [txt, good, ts] = o.stamp; if (t >= ts) s += TF(0, -40, lerp(2, 1, eo((t - ts) / .15)), `<g transform="rotate(-12)"><rect x="${n2(-tw(txt, 54, 700) / 2 - 34)}" y="-50" width="${n2(tw(txt, 54, 700) + 68)}" height="100" rx="18" fill="${good ? P.leaf : "#E5484D"}" stroke="#fff" stroke-width="8"/>${T(0, 18, txt, 54, "#fff")}</g>`); }
  return TF(0, 0, k, s); }

/* ---------------------------------------------------------------- shared staging bits ---------------------------------------------------------------- */
// the refrain strip (the words the class learns to chant), top centre under the HUD, each word lighting up as it is said
function x2refrain(t, id, t1, o = {}) { const L = TL.lines[id]; if (window._SAID && TL.order.includes(id)) window._SAID[id] = 1; if (!L || t < L.t - .2 || t > t1 + .35) return ""; const k = spring(t, L.t - .2, .4) * (1 - eo((t - t1) / .3)), size = o.size || 46;
  const words = o.words || L.words.map((w) => ({ w: w.w, a: w.a })), txt = words.map((w) => w.w).join(" "), W_ = Math.min(1500, tw(txt, size, 700) + 120);
  let x = -W_ / 2 + 60, s = `<g filter="url(#dropS)"><rect x="${n2(-W_ / 2)}" y="-46" width="${n2(W_)}" height="92" rx="46" fill="#FFF8EA" stroke="${o.col || P.ink}" stroke-width="6"/></g>`;
  if (o.tag) s += TF(-W_ / 2 + 10, -50, 1, tpill(70, 0, o.tag, 24, o.tagCol || P.ink, "#fff", { w: 700 }));
  for (const w of words) { const ww = tw(w.w + " ", size, 700), lit = t >= w.a - .03; s += `<text x="${n2(x)}" y="${n2(size * .35)}" font-family="Fredoka" font-weight="700" font-size="${size}" fill="${lit ? (o.litCol || P.ink) : "#B8AE9C"}">${esc(w.w)}</text>`; if (lit && t < w.a + .25) s += `<rect x="${n2(x - 4)}" y="${n2(size * .5)}" width="${n2(tw(w.w, size, 700) + 8)}" height="7" rx="3" fill="${P.sun}"/>`; x += ww; }
  return TF(960, o.y || 212, k, s); }
// YOUR TURN!: the YOU hands bob and the refrain's words light up at a child's chanting pace (from t0, over d s)
function x2yourTurn(t, t0, d, txt = "...but what does THAT part do?", x = 1500, y = 760) { if (t < t0 - .1 || t > t0 + d + .4) return ""; const k = spring(t, t0 - .1, .4) * (1 - eo((t - t0 - d) / .3)), ws = txt.split(" ");
  let s = tpill(0, -250, "YOUR TURN!", 50, P.coral, "#fff", { w: 700 }) + youPill(0, -150, 1.1); const per = d / ws.length;
  const hb = 12 * Math.abs(Math.sin((t - t0) * Math.PI / per));
  s += [-1, 1].map((sd) => `<g transform="translate(${sd * 60} ${n2(-30 - hb)}) scale(${sd * .42} .42)" filter="url(#dropS)">${countHand(5)}</g>`).join("");
  return TF(x, y, k, s) + x2refrain(t, "__yt", t0 + d, { words: ws.map((w, i) => ({ w, a: t0 + i * per })), y: 212, litCol: P.coral, tag: "THE CLASS", tagCol: P.coral, col: P.coral, t0 }); }
// x2refrain needs a line: the YOUR TURN strip passes its own words (a fake line id "__yt")
TL.lines.__yt = { t: -9, end: -9, words: [], who: "x" };
// the high-five attempt (cheer painting as the "paws up to slap" gesture) and the whiff line between the paws
const x2whiff = (t, t0, x, y) => { const u = (t - t0) / .7; if (u < 0 || u > 1) return ""; return OP(1 - u, `<g transform="translate(${x} ${y})">${[-1, 0, 1].map((i) => `<path d="M${-70 + 40 * u} ${i * 22} q40 ${-10 * i} 140 0" stroke="#fff" stroke-width="7" fill="none" stroke-linecap="round" opacity=".9"/>`).join("")}</g>`) + comicWord(t, t0 + .05, x, y - 70, "whiff.", { size: 46, tiny: true, col: "#fff", d: .7 }); };
// the freeze-frame look: a thin white border, grain, a slight warm tint
const x2frozen = (k) => k <= .01 ? "" : OP(k, `<rect x="18" y="18" width="1884" height="1044" fill="none" stroke="#fff" stroke-width="22"/><rect width="1920" height="1080" fill="#FFE9C8" opacity=".12"/><rect width="1920" height="1080" fill="none" stroke="#2B2147" stroke-width="10" opacity=".4"/>`);
const x2flash = (t, t0, a = .7, d = .18) => t < t0 || t > t0 + d * 3 ? "" : `<rect width="1920" height="1080" fill="#fff" opacity="${n2(a * pulse(t, t0, .01, d))}"/>`;
// the rewind effect (lines, a VHS wobble, the tag)
const x2rewind = (t, t0, d, tag) => { const u = (t - t0) / d; if (u < 0 || u > 1.6) return ""; const a = u < 1 ? 1 : 1 - (u - 1) / .6;
  return OP(a, [0, 1, 2, 3, 4, 5, 6].map((i) => `<rect x="0" y="${n2((i * 163 + t * 2600) % 1080)}" width="1920" height="${8 + (i % 3) * 6}" fill="#fff" opacity=".45"/>`).join("") + `<rect width="1920" height="1080" fill="#3A8DFF" opacity="${n2(.12 * Math.min(1, u * 3))}"/>`
    + T(960, 560, "◀◀", 150, "#fff") + (tag ? TF(960, 700, spring(t, t0 + .3, .4), tpill(0, 0, tag, 54, P.sun, P.ink, { w: 700, ls: 4 })) : "")); };
// a little label that points at a world point through the camera
const x2lab = (t, t0, t1, c, txt, x, y, wx, wy, size = 38, col = "#fff") => t < t0 - .05 || t > t1 + .35 ? "" : OP(spring(t, t0, .4) * (1 - ramp(t, t1, .3)), plabel(x, y, txt, ...camPt(c, [wx, wy]), size, col));
// a caption in Heart's handwriting style (the on-screen aside)
const x2aside = (t, t0, t1, x, y, txt) => t < t0 || t > t1 + .4 ? "" : OP(ramp(t, t0, .4) * (1 - ramp(t, t1, .35)), TF(x, y, 1, `<g transform="rotate(-3)"><rect x="${n2(-tw(txt, 34, 600) / 2 - 26)}" y="-34" width="${n2(tw(txt, 34, 600) + 52)}" height="62" rx="14" fill="#fff" opacity=".92"/>${T(0, 10, txt, 34, P.ink2, { w: 600 })}</g>`));
// the small say bubble for Uncle Lim (he is not a buddy: no automatic bubble)
const x2limSay = (id, x, y, t) => say(id, x, y, t, { size: 40, maxW: 420, tail: 0 });

/* ================================================================ COLD · THE PROBLEM: the freeze-frame ================================================================ */
// the void deck (vdv2), Saturday 9 a.m.: Basil IN the ice box (chest up), helmet on and buckled, a feather on it, the grease stripe on his
// tail, ice around him; his stripped bike leans on the box (no bell, no levers, no chain: bare gears); Uncle Lim far left on his roadster at
// the START line, sipping; the snail a metre from the line, facing it; the crown on its stool. Camera: tight on Basil, eases to a three-shot.
const CB = { box: [1300, 1062], bike: [842, 1050], bk: .75, lim: [300, 975], limk: .5, snail: [250, 1066], stool: [600, 945], momo: [420, 1066], pip: [1640, 1066] };
const x2bikeLean = (t, o = {}) => `<g transform="translate(${CB.bike[0]} ${CB.bike[1]}) rotate(-1.5) scale(${CB.bk})">${bikeP4(t, { chain: false, brakes: 0, bell: 0, crank: .5, sh: 0, g2: 0, stand: false, ...o })}</g>`;
// the cold-open set as a world group (also the runaway's last shot, which ends on exactly this layout)
function x2coldSet(t, o = {}) { const ice = o.iceT !== undefined ? o.iceT : t;
  return TF(...CB.stool, .9, crownStoolV2(1)) + TF(...CB.lim, CB.limk, limRideV2(t, { crank: .4, sip: o.limSip === undefined ? .3 + .7 * (.5 + .5 * Math.sin(t * .8)) : o.limSip, stand: true }))
    + TF(...CB.snail, .62, snailV2(t)) + (o.noBike ? "" : x2bikeLean(t)) + TF(...CB.box, 1, iceBoxBackV2(ice)); }
const coldCam = (t) => { const s = SCN.cold, u = eio(clamp((t - MK("thaw") - .2) / 3.2)); return camMix(camOn([1310, 820], 1.85, 960, 600), camOn([960, 700], 1.0), u); };
// Basil in the box: his painting with its feet inside the box (the front wall drawn over him)
const x2basilInBox = (c, t, o = {}) => x2bc(c, "basil", CB.box[0] + 10, 1040, 400, t, { shadow: false, tag: false, ...o });
SC.cold = (t, s) => { const tf = MK("frz"), th = MK("thaw"), fz = t >= tf && t < th, tw_ = fz ? tf : t;   // the world time: frozen between "box" and "here"
  const c0 = coldCam(t), u101 = ss(s.t0, s.t0 + 1.0, t), cr = MK("cry1"), lowc = ss(cr - .2, cr + .2, t) * (1 - ss(LT("c106") + .3, LT("c106") + 1.0, t)), c = camMix(c0, camOn([1220, 900], 1.18, 1060, 640), lowc * .6);
  const zp = fz ? 1 + .03 * eo(clamp((t - tf) / .12)) : 1;   // the zoom-punch on the freeze
  const ice = pulse(t, LT("c106") + 1.2, .02, .3), plipY = LT("c106") + .4;
  // Basil: deadpan stare in the box; turns to the viewer in the frozen frame (the only thing moving); battle cry 1 (arms crossed + wind)
  const bPoses = [[0, "deadpan"], [LT("c102") - .1, "sit"], [LE("c102") + .1, "deadpan"], [LE("c103") + .05, "shrug/oops"], [cr - .1, "hero/arms_crossed"], [LE("c106") + .4, "deadpan"]];
  const basil = x2basilInBox(c, t, { poses: bPoses, look: t < LT("c102") ? 0 : -3, still: fz && t < LT("c102") - .1, noreact: true, ...x2grease(9999), jump: [[cr - .05, 24]] });
  const feather = x2held(c, "basil", CB.box[0] + 10, 1040, 400, false, `<g transform="translate(-40 -250) rotate(-30)">${featherV2(.9)}</g>`, 0, 0);
  const front = CAM(TF(...CB.box, 1, iceBoxFrontV2(t)) + (t > plipY && t < plipY + .9 ? TF(CB.box[0] + 30, lerp(700, 870, ei(clamp((t - plipY) / .5))), 1, `<rect x="-14" y="-12" width="28" height="22" rx="5" fill="#fff" stroke="#9FD0EA" stroke-width="2.5"/>`) : ""), c[0], c[1], c[2]);
  // Momo runs in from the left (facing right) on c103; Pip from the right (facing left) on c104
  const tm = LT("c103") - .45, tp = LT("c104") - .45, mx = lerp(-200, CB.momo[0], eo(clamp((t - tm) / .5))), px = lerp(2150, CB.pip[0], eo(clamp((t - tp) / .5)));
  const momo = t >= tm ? x2bc(c, "momo", mx, CB.momo[1], 400, t, { poses: [[0, "sit"], [LT("c104") + .3, "horrified/surprised"], [LT("c105") + .1, "facepalm/oops"], [LE("c106") + .2, "sit"]], look: 6, jump: t < tm + .5 ? [[tm + .1, 18], [tm + .3, 14]] : [] }) : "";
  const pip = t >= tp ? x2bc(c, "pip", px, CB.pip[1], 380, t, { flip: true, poses: [[0, "sit"], [LE("c104") + .05, "pointing"], [LT("c105") + .1, "sit"], [LT("c106") + .2, "embarrassed/oops"], [LE("c106") + .3, "sit"]], look: -5, jump: t < tp + .5 ? [[tp + .1, 18], [tp + .3, 14]] : [] }) : "";
  // c104: the three dotted outlines on the bike, each joined to its empty spot
  const bk = (p) => camPt(c, [CB.bike[0] + CB.bk * p[0], CB.bike[1] + CB.bk * p[1]]);
  const outl = (mk, p, txt, lx, ly) => { if (t < MK(mk) - .1 || t > LE("c105") + .2) return ""; const k = spring(t, MK(mk) - .1, .4) * (1 - ramp(t, LE("c105"), .25)), [X, Y] = bk(p);
    return OP(Math.min(1, k), `<circle cx="${n2(X)}" cy="${n2(Y)}" r="${n2(30 * c[0])}" fill="none" stroke="#fff" stroke-width="6" stroke-dasharray="8 8"/>` + plabel(lx, ly, txt, X, Y, 42, "#fff")); };
  const outs = outl("ob", [BK.HT[0] - 24, BK.HT[1] - 66], "bell?", 700, 300) + outl("oc", [(BK.RA[0] + BK.BB[0]) / 2, BK.BB[1] - 20], "chain?", 380, 560) + outl("obr", [BK.HT[0] - 76, BK.HT[1] - 34], "brakes?", 1060, 260);
  const cry = battleCry(t, cr - .05, 1120, 300, "LIGHTER|IS FASTER!", { d: 1.7 }) + windV2(t, 1250, 640, 420, ss(cr - .1, cr + .1, t) * (1 - ss(LE("c105") + .3, LE("c105") + .6, t))) + flare(...camPt(c, [1220, 640]), ss(cr, cr + .15, t) * (1 - ss(LE("c105"), LE("c105") + .4, t)));
  const world = `<g transform="translate(960 540) scale(${n2(zp)}) translate(-960 -540)">` + CAM(bg("vdv2") + x2coldSet(tw_, { iceT: tw_ }), c[0], c[1], c[2]) + `</g>`;
  window._BUBAT = { basil: [1180, t < LE("c102") ? 330 : 300], momo: [560, 470], pip: [1500, 420] };
  return world + (t < MK("cry1") - .1 ? "" : cry) + basil + feather + front + momo + pip + outs
    + x2frozen(fz ? 1 : 0) + x2flash(t, tf, .6, .12) + (fz ? OP(ramp(t, tf + .9, .3), TF(1540, 980, 1, tpill(0, 0, "PAUSED", 34, "#fff", P.ink, { w: 700, ls: 6 }))) : "")
    + (t > plipY && t < plipY + 1 ? comicWord(t, plipY + .4, ...camPt(c, [CB.box[0] + 120, 880]), "plip.", { size: 44, tiny: true, col: "#BFE6F7" }) : "")
    + (t >= MK("clock") - .1 ? x2raceClock(t, x2secs(t), spring(t, MK("clock") - .1, .45)) : "")
    + x2fine(t, LT("c106"), s.t1 - .1, "Ride safely; check your brakes.")
    + OP(ramp(t, LE("c102") + .3, .4) * (1 - ramp(t, LT("c105") - .2, .4)), lowerPill(60, 140, "An HDB void deck ·", "Saturday, 9 a.m.")) + logo(t); };

/* title: THE GREAT / VOID DECK / RACE! over the blurred void deck; the crown, a bell, a chain and the snail as icons */
const slamV2 = (txt, y, size, col, k) => k <= 0 ? "" : TF(960, y, lerp(2.4, 1, eo(k)) * (1 + .05 * wob(k, 1, .4)), `<g transform="translate(0 6)" opacity=".7">${T(0, size * .35, txt, size, P.ink, { ls: 4 })}</g>` + T(0, size * .35 - 6, txt, size, col, { ls: 4 }));
SC.title = (t, s) => { const u = t - MK("title"), k1 = clamp(u / .16), k2 = clamp((u - .35) / .16), k3 = clamp((u - .7) / .16), ic = (i, x, y, inner) => TF(x, y, spring(t, MK("title") + .9 + i * .12, .4), inner);
  return `<g filter="url(#b10)">${x2place("vdv2", x2coldSet(t, { noBike: true }), [1.05, 960, 600])}</g><rect width="1920" height="1080" fill="${P.night}" opacity=".55"/>`
    + ic(0, 330, 880, `<g transform="scale(.9)">${crownV2()}</g>`) + ic(1, 760, 900, `<g transform="scale(3)">${bellP4()}</g>`) + ic(2, 1180, 880, `<g transform="scale(.55 .5)">${chainLoose(260, 90, t)}</g>`) + ic(3, 1600, 920, snailV2(t))
    + slamV2("THE GREAT", 250, 110, "#fff", k1) + slamV2("VOID DECK", 420, 180, P.sun, k2) + slamV2("RACE!", 600, 160, "#fff", k3) + logo(t); };

/* ================================================================ FIXCARDS · THE FIX CARDS (a huddle) ================================================================ */
// the trio in a huddle in front of the ice box (blurred behind): Basil left, Pip middle, Momo right, close together, leaning in; each
// pitches TO the other two; the three big numbered cards pop above the huddle as each is pitched; the camera pushes onto each card
const CX3 = [560, 960, 1360], CARDY = 360, CARDK = .64, HUD3 = { basil: [690, 1076], pip: [960, 1076], momo: [1230, 1076] };
const x2cards = (t, y, k, o = {}) => [1, 2, 3].map((n) => { const ti = o.tin ? o.tin[n - 1] : -9, kk = k * (ti > -9 ? spring(t, ti, .45) : 1); if (kk < .02) return "";
  const sd = o.said ? pulse(t, o.said[n - 1], .04, .6) : 0, xs = o.xs || CX3; return TF(xs[n - 1], y - 14 * sd, kk * (1 + .05 * sd), x2fixCard(t, n, { glow: o.glow ? o.glow(n) : sd, stamp: o.stamp ? o.stamp(n) : null })); }).join("");
SC.fixcards = (t, s) => { const tc = [MK("c1"), MK("c2"), MK("c3")];
  window._BUBAT = { basil: [520, 640], pip: [960, 640], momo: [1400, 640] };
  let z = 1, fx = 960; for (let i = 0; i < 3; i++) { const a = tc[i] - .1, b = i === 0 ? tc[1] - .4 : i === 1 ? LE("f206") + .2 : LE("f204") + .2, u = ss(a, a + .7, t) * (1 - ss(b - .6, b, t)); if (u > 0) { z = 1 + .12 * u; fx = lerp(960, CX3[i], u); } }
  const c = camOn([fx, 360], z, fx, 360), clipK = t >= MK("clip") - .2 ? 1 : 0;
  return `<g filter="url(#b4)">${x2place("vdv2", x2coldSet(t), [1.1, 1100, 700])}</g><rect width="1920" height="1080" fill="${P.night}" opacity=".5"/>`
    + OP(ramp(t, s.t0 + .1, .3), T(960, 112, "THREE FIXES", 60, P.sun, { ls: 6 })) + CAM(x2cards(t, CARDY, CARDK, { tin: tc.map((x) => x - .1), said: tc }), c[0], c[1], c[2])
    + x2bd("basil", ...HUD3.basil, 330, t, { in: s.t0 + .05, poses: [[s.t0, "thinking"], [LT("f202") - .1, "sit"], [LE("f202") + .1, "arms_crossed"], [LT("f205") - .1, "sit"], [LE("f205") + .1, "deadpan"], [LE("f206") + .1, "shrug/oops"], [LT("f204") + .3, "pointing"], [LE("f204") + .2, "sit"]], look: 6 })
    + x2bd("pip", ...HUD3.pip, 320, t, { in: s.t0 + .2, poses: [[s.t0, "thinking"], [LT("f202") + .6, "panic/thinking"], [LT("f203") - .1, "sit"], [LE("f203") + .05, "pointing"], [LT("f205") + .4, "proud/arms_crossed"], [LT("f206") - .1, "sit"], [LE("f206") + .1, "sit"]], look: t < LT("f205") ? -3 : -6, flip: t > LE("f203") + .05 && t < LE("f206") + .3 })
    + x2bd("momo", ...HUD3.momo, 330, t, { in: s.t0 + .35, flip: true, poses: [[s.t0, "thinking"], [LT("f203") - .1, "sit"], [LE("f206") - .05, "laugh/cheer"], [LT("f204") - .15, "sit"]], look: -6 })
    + (clipK ? x2held([1, 960, 540], "pip", ...HUD3.pip, 320, false, TF(0, 0, .5, clipboardV2(t, {})), -50, 40) : "")
    + (t >= MK("show") - .1 ? TF(1730, 920, spring(t, MK("show") - .1, .4), countHand(t < W("f207", "two") ? 1 : t < W("f207", "three") ? 2 : 3, {}) + youPill(0, -170, .9)) : "") + x2HUD(t); };

/* the lock-in: the ring with the stripped bike in it (three dotted outlines; the clue labels ON TOP of its frame); the cards under it */
SC.lock = (t, s) => { const r0 = MK("ring0_fix"), bell = MK("bell_fix"), D = bell - r0, rs = ringState(t, r0, D), inT = t >= r0 && t < bell, shut = pulse(t, bell, .01, .6), b = Math.floor(t - r0), RC = [960, 330], RR = 230;
  const inner = `<clipPath id="lkV2"><circle cx="${RC[0]}" cy="${RC[1]}" r="${RR - 26}"/></clipPath><circle cx="${RC[0]}" cy="${RC[1]}" r="${RR - 26}" fill="#E8F3FF"/><g clip-path="url(#lkV2)"><rect x="700" y="${RC[1] + 110}" width="520" height="200" fill="#D9D1C2"/>${TF(985, RC[1] + 140, .5, bikeP4(t, { chain: false, brakes: 0, bell: 0, crank: .6, sh: 0, g2: 0 }) + x2ghostBell() + x2ghostChain() + x2ghostBrakes())}</g>`;
  const ring = ringTimer(RC[0], RC[1], t < bell ? rs.frac : 0, t < bell ? rs.secs : 0, t, { R: RR, sw: 34, tick: rs.tick, shut, chg: inT || (t >= bell && t < bell + .5) ? (t >= bell ? bell : rs.chg) : -9, ns: 1.3, inner });
  const clues = [["no bell", 1450, 190, 1060, 260], ["no chain", 470, 260, 860, 380], ["no brakes", 1480, 450, 1110, 330]].map(([txt, x, y, px, py], i) => OP(ramp(t, s.t0 + .2 + i * .15, .3), `<path d="M${x} ${y} L${px} ${py}" stroke="#fff" stroke-width="6" stroke-linecap="round"/>` + clue3(x, y, txt, spring(t, s.t0 + .2 + i * .15, .4), 54, 520))).join("");
  return bg("stage") + OP(ramp(t, s.t0, .3), T(960, 64, "Which fix gets Basil racing?", 46, "#fff", { w: 600 })) + TF(...RC, spring(t, s.t0, .45) * (1 + .03 * (inT ? rs.tick : 0)), `<g transform="translate(${-RC[0]} ${-RC[1]})">${ring}</g>`) + clues
    + x2cards(t, 850, .42, { said: [0, 0, 0].map((_, i) => inT && b % 3 === i ? t : -9), glow: (n) => (inT && b % 3 === n - 1 ? .5 + rs.tick * .5 : 0) })
    + OP(ramp(t, r0 - .15, .2) * (t < bell ? .75 + .25 * Math.sin(t * 9) : 1), T(1680, 660, "LOCK IT IN!", 44, P.sun, { ls: 6 }))
    + (t >= bell + .05 ? stamp(t, bell + .05, 960, 330) : "")
    + x2bd("pip", 170, 1076, 430, t, { in: s.t0 - .5, poses: [[s.t0, "panic/worried"], [bell - .9, "oops"], [bell + .4, "sit"]], look: 4, jump: [[r0 + 1.5, 14], [r0 + 3.5, 14], [r0 + 5.4, 10]] }) + x2HUD(t); };

/* the picks: the cards rise to a row; each buddy stands under the card they picked (Basil 1, Pip 2, Momo 3); MISS 1: Basil is still in his
   battle-cry pose facing the wrong way, so Momo's and Pip's paws meet empty air */
SC.picks = (t, s) => { window._BUBAT = { pip: [960, 560], basil: [560, 560], momo: [1360, 560] }; const up = eio((t - s.t0) / .6), y = lerp(850, 300, up), k = lerp(.42, .48, up), tp = s.t0 + .3;
  const hf = LT("p208") + .3, ms = MK("miss1");
  return bg("stage") + x2cards(t, y, k, { glow: (n) => t >= tp + (n - 1) * .25 ? .6 : 0 })
    + x2bd("basil", CX3[0], 1076, 360, t, { in: s.t0 - .5, flip: true, poses: [[s.t0, "sit"], [tp, "hero/arms_crossed"], [LE("p209") + .1, "sit"]], look: -6, noreact: true })
    + windV2(t, CX3[0] - 40, 860, 300, ss(tp, tp + .2, t) * (1 - ss(ms + 1.2, ms + 1.5, t)))
    + x2bd("pip", CX3[1], 1076, 360, t, { in: s.t0 - .5, poses: [[s.t0, "sit"], [tp + .25, "proud/arms_crossed"], [hf, "hi5/cheer"], [ms + .35, "embarrassed/oops"], [LT("p209") + .4, "sit"]], look: t > hf && t < ms + .3 ? -10 : 0, flip: t > hf && t < ms + .35 })
    + (t < hf || t > ms + .3 ? x2held([1, 960, 540], "pip", CX3[1], 1076, 360, false, TF(0, 0, .45, clipboardV2(t, {})), -40, 30) : "")
    + x2bd("momo", CX3[2], 1076, 360, t, { in: s.t0 - .5, flip: true, poses: [[s.t0, "sit"], [tp + .5, "pointing"], [LT("p208") - .1, "sit"], [hf, "hi5/cheer"], [ms + .35, "unimpressed"], [LT("p209") + .4, "sit"]], look: t > hf && t < ms + .3 ? -12 : -3 })
    + x2whiff(t, ms, 760, 640) + (t >= ms - .05 && t < ms + .6 ? comicWord(t, ms + .4, 760, 520, "bwop.", { size: 40, tiny: true, col: "#fff", d: .6 }) : "")
    + x2rewind(t, MK("rew") - .3, s.t1 - MK("rew") + .3, "10 MINUTES EARLIER")
    + (t >= s.t0 ? x2raceClock(t, x2secs(t), 1) : "") + x2HUD(t); };
