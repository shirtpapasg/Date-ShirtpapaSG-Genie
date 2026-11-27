// p1.js: P4 EP2 "TheOneApp, Explained", "Help! I'm Wilting!" (the Plant System): shared helpers and the opening (the cold open at the Science
// Help Desk, the title, the fix cards in a huddle round Chilli, the lock-in, the picks and the first missed high-five). The approved script
// v2.1 (../p4/p4_ep02_script.md, 27 Nov 2026). p2.js: the water and the lunch (fixes 2 and 3), both look-closers, the system, GLITCH.
// p3.js: the repair, the two weeks, the journey, the words, the cosy end, the mystery leaf, the ritual ending, the blooper, GLITCH's sting.
// Staging (P4-new-direction.md "The trio: synergy"): every line spoken TO someone and answered by a look, a pose or a reply; two-shots for
// banter, wide for chaos, the round face close-up only for a big feeling (Basil, 1:17); show first, then tell. Guests: ep2art.js.
P.lim = "#6FB3DE"; BNAME.lim = "Uncle Lim";
window.PIP_HELMET = true;
const x2bd = (who, x, y, h, t, o = {}) => buddy(who, x, y, h, t, o);
const x2bc = (c, who, x, y, h, t, o = {}) => { const [X, Y] = camPt(c, [x, y]); return buddy(who, X, Y, h * c[0], t, o); };
const x2place = (name, inner, c) => CAM(bg(name) + inner, c[0], c[1], c[2]);
const x2held = (c, who, x, y, h, flip, inner, dy = 0, dx = 0) => { const [X, Y] = camPt(c, [x, y]), [px, py] = pawPt(who, X, Y, h * c[0], flip); return TF(px + (flip ? -dx : dx) * c[0], py + dy * c[0], c[0], flip ? `<g transform="scale(-1 1)">${inner}</g>` : inner); };
const x2unflip = (k, inner) => `<g transform="scale(${-k} ${k})">${inner}</g>`;
const x2fine = (t, t0, t1, txt, x = 560, y = 1032) => OP(1 - ramp(t, t1, .3), finePrint(t, t0, txt, x, y));
const x2HUD = (t) => HUD(t);
const FOOT = "Primary 4 Science · Systems · Plant System";
SCORE.push([MK("coin1") - .05, 1, 1]);   // the fix pick: the viewers who picked 1, and Momo (who picked 1), each get a point at k1006
window.SHELF_AWAY = () => 0;
const x2said = (id) => { if (window._SAID) window._SAID[id] = 1; return ""; };   // a line whose words ARE its picture (a battle cry): no bubble
const x2whiff = (t, t0, x, y) => { const u = (t - t0) / .7; if (u < 0 || u > 1) return ""; return OP(1 - u, `<g transform="translate(${x} ${y})">${[-1, 0, 1].map((i) => `<path d="M${-70 + 40 * u} ${i * 22} q40 ${-10 * i} 140 0" stroke="#fff" stroke-width="7" fill="none" stroke-linecap="round" opacity=".9"/>`).join("")}</g>`) + comicWord(t, t0 + .05, x, y - 70, "whiff.", { size: 46, tiny: true, col: "#fff", d: .7 }); };
const x2frozen = (k) => k <= .01 ? "" : OP(k, `<rect x="18" y="18" width="1884" height="1044" fill="none" stroke="#fff" stroke-width="22"/><rect width="1920" height="1080" fill="#FFE9C8" opacity=".12"/>` + [...Array(40)].map((_, i) => `<circle cx="${n2(hash(i, 3) * 1920)}" cy="${n2(hash(i, 7) * 1080)}" r="2" fill="#fff" opacity=".35"/>`).join(""));
const x2flash = (t, t0, a = .7, d = .18) => t < t0 || t > t0 + d * 3 ? "" : `<rect x="0" y="0" width="1920" height="1080" fill="#fff" opacity="${n2(a * pulse(t, t0, .01, d))}"/>`;
const x2lab = (t, t0, t1, c, txt, x, y, wx, wy, size = 38, col = "#fff") => t < t0 - .05 || t > t1 + .35 ? "" : OP(spring(t, t0, .4) * (1 - ramp(t, t1, .3)), plabel(x, y, txt, ...camPt(c, [wx, wy]), size, col));
const x2limSay = (id, x, y, t, o = {}) => say(id, x, y, t, { size: 40, maxW: 440, tail: 0, ...o });
// a guest's speech bubble (Chilli, GLITCH): never down over a face; tail towards the speaker
const x2gSay = (id, x, y, t, o = {}) => say(id, x, y, t, { size: 40, maxW: 520, tail: 0, ...o });
const slamV2 = (txt, y, size, col, k) => k <= 0 ? "" : TF(960, y, lerp(2.4, 1, eo(k)) * (1 + .05 * wob(k, 1, .4)), `<g transform="translate(0 6)" opacity=".7">${T(0, size * .35, txt, size, P.ink, { ls: 4 })}</g>` + T(0, size * .35 - 6, txt, size, col, { ls: 4 }));

/* ---------------------------------------------------------------- the Help Desk set (world coordinates, camera 1) ---------------------------------------------------------------- */
// the void deck (vdv2), early on a Saturday morning; the Science Help Desk: the table top at y 800, x 640..1320 (k 1.13); the sign at its left
// part, Chilli beside the bell; Basil BEHIND the desk (a cloth skirt hides his lower half), Momo at its left end, Pip at its right end
const DK = { x: 980, y: 800, k: 1.13 }, CHX = 960, CHK = .62, BELLX = DK.x + 232 * DK.k;
const x2desk = (t, o = {}) => TF(DK.x, DK.y, DK.k, deskV3(t, o));
// GLITCH far back between two pillars (the dramatic irony: nobody notices); he rolls RIGHT, his screen counting down 06:58
function x2glitchFar(t, t0, t1) { if (t < t0 || t > t1) return ""; const u = (t - t0) / (t1 - t0), x = lerp(-120, 2040, u), d = (x + 120) / .1;
  return TF(x, 700, .11, `<!--FACES:right glitch-->` + glitchV3(t, { pose: "jug", face: "smug", roll: d, talk: false, scr: scrClock("06:5" + (u < .5 ? "9" : "8")) })); }

/* ================================================================ COLD · THE PROBLEM: the Help Desk's first customer ================================================================ */
const coldCam = (t) => camMix(camOn([900, 680], 1.75, 960, 560), [1, 960, 540], eio(clamp((t - 1.2) / 2.6)));
const HOPS = [[-160, 1030], [120, 1030], [370, 1030], [600, 952], [760, 952], [CHX, DK.y]];   // the floor, a crate at x 560..820 (top 952), the desk
const crateV3 = () => `<rect x="-130" y="-68" width="260" height="68" rx="6" fill="#C99A5B" stroke="#7A5226" stroke-width="6"/><path d="M-120 -34 H120 M-60 -64 V-4 M60 -64 V-4" stroke="#8A6234" stroke-width="5"/>`;
function x2chilliHop(t, tH, c, k = CHK) { const H_ = chilliHopAt(t, tH, HOPS, .42); const sq = H_.sq || 0, fr = H_.fr;
  const inner = `<g transform="scale(${n2(1 + .07 * sq)} ${n2(1 - .08 * sq)})">${chilliV3(t, { hop: fr })}</g>` + (fr === "a" ? dustPuffs(H_.dust) : "");
  const [X, Y] = camPt(c, [H_.x, H_.y]); return { svg: TF(X, Y, k * c[0], `<!--FACES:none chilli-->` + inner), done: H_.done, x: H_.x }; }
SC.cold = (t, s) => { const c = coldCam(t), tH = MK("hop1") - 5 * .42 + .02, ding = pulse(t, MK("hop1") + .02, .02, .3);
  const hopped = t >= MK("hop1") + .02;
  // Chilli: hops in (pot leading, small hops, dust on landing only), then sits by the bell: droop; flat for "I've heard that one."
  const cFace = t < LT("c104") - .1 ? "droop" : t < LE("c105") + .4 ? "flat" : "droop";
  const ch = hopped ? TF(...camPt(c, [CHX, DK.y]), CHK * c[0], chilliV3(t, { body: "wilt", face: cFace, sparkle: MK("sparkle") - .05, wob: t > MK("wilt") && t < MK("wilt") + .6 ? 2 * Math.sin((t - MK("wilt")) * 20) : 0 })) : (t >= tH ? x2chilliHop(t, tH, c).svg : "");
  const world = x2place("vdv2", x2glitchFar(t, .3, 4.6) + TF(690, 1022, .9, crateV3()), c);
  // Basil behind the desk (boast, taps FAST; the pun with both paws; deadpan; shrug), Momo left, Pip right
  const basil = x2bc(c, "basil", 1330, 960, 380, t, { in: -1, poses: [[0, "sit"], [LE("c101") + .1, "sit"], [MK("pun") - .2, "hero/pointing"], [LE("c103") + .15, "pointing"], [LT("c104") + .1, "shrug/oops"], [LT("c105") + .2, "deadpan"], [LE("c105") + .6, "sit"]], look: t < MK("hop1") + .3 ? -6 : -4 });
  const momo = x2bc(c, "momo", 470, 1010, 380, t, { in: -1, poses: [[0, "sit"], [MK("hop1") - .9, "surprised"], [MK("hop1") + .4, "sit"], [MK("flop1") + .1, "unimpressed"], [LT("c105") + .1, "sit"]], look: 6 });
  const pip = x2bc(c, "pip", 1690, 1010, 370, t, { in: 2.3, flip: true, poses: [[0, "sit"], [LT("c101") + .6, "panic/thinking"], [LE("c101") + .1, "sit"], [MK("hop1") - .9, "surprised"], [MK("hop1") + .4, "sit"], [LT("c103") + .4, "thinking"], [MK("flop1") + .05, "sit"], [LT("c105") + .2, "embarrassed/oops"], [LE("c105") + .5, "sit"]], look: -6 });
  const desk = CAM(TF(DK.x, DK.y, DK.k, deskV3(t, { ding })), c[0], c[1], c[2]);
  window._BUBAT = { basil: [1330, 400], momo: [470, 450], pip: [1640, 430] };
  return world + basil + desk + ch + momo + pip
    + (t >= MK("hop1") ? comicWord(t, MK("hop1") + .02, ...camPt(c, [1170, 520]), "DING!", { size: 60, d: .7, rot: 6 }) : "")
    + x2gSay("c102", 760, 360, t, { tail: 160, maxW: 640 }) + x2gSay("c104", 700, 440, t, { tail: 220 })
    + OP(ramp(t, LE("c101") - .3, .4) * (1 - ramp(t, LT("c104"), .4)), lowerPill(60, 140, "An HDB void deck ·", "Saturday, early morning")) + logo(t); };

/* title: HELP! / I'M / WILTING! over the blurred desk, Chilli's droopy leaf and the desk bell as icons */
SC.title = (t, s) => { const u = t - MK("title"), k1 = clamp(u / .16), k2 = clamp((u - .35) / .16), k3 = clamp((u - .7) / .16), ic = (i, x, y, inner) => TF(x, y, spring(t, MK("title") + .9 + i * .12, .4), inner);
  return `<g filter="url(#b10)">${x2place("vdv2", x2desk(t) + TF(CHX, DK.y, CHK, chilliV3(t, { body: "wilt", face: "droop", talk: false })), [1.05, 960, 600])}</g><rect width="1920" height="1080" fill="${P.night}" opacity=".55"/>`
    + ic(0, 420, 880, `<g transform="scale(.9)">${chilliV3(t, { body: "wilt", face: "droop", talk: false })}</g>`) + ic(1, 1500, 900, `<g transform="scale(2.2)"><rect x="-38" y="-12" width="76" height="14" rx="5" fill="#59616B"/><path d="M-29 -12 Q-29 -46 0 -46 Q29 -46 29 -12z" fill="url(#chrome)" stroke="#2B2F36" stroke-width="3"/></g>`)
    + slamV2("HELP!", 250, 150, "#fff", k1) + slamV2("I'M", 430, 110, P.sun, k2) + slamV2("WILTING!", 600, 170, "#fff", k3) + logo(t); };

/* ================================================================ FIXCARDS · THE FIX CARDS (a huddle round Chilli) ================================================================ */
const FIXLAB2 = [["FIND OUT WHY:", "CHECK EVERY PART"], ["WATER IT", "MORE"], ["FEED IT", "(a lunch)"]];
function x2fixPic(t, n) {
  if (n === 1) return TF(-30, 150, .55, chilliV3(t, { body: "wilt", face: "droop", talk: false, shadow: false })) + `<circle cx="-30" cy="62" r="34" fill="#fff" opacity=".85"/>` + T(-30, 82, "?", 62, "#E5484D")
    + `<g transform="translate(70 -20)"><circle r="62" fill="#E8F6FF" opacity=".55" stroke="${P.ink}" stroke-width="10"/><path d="M42 44 L100 104" stroke="${P.ink}" stroke-width="18" stroke-linecap="round"/></g>`;
  if (n === 2) return TF(-60, 40, .8, `<!--FACES:right can-->` + canV3(t, { tilt: 26 })) + streamV3(t, 60, -40, 110, 110, 1, 18) + [0, 1, 2].map((i) => `<circle cx="${100 + i * 20}" cy="${120 + (i % 2) * 8}" r="8" fill="#5CB8F0"/>`).join("");
  return TF(0, 60, 1.3, lunchboxV3()); }
function x2fixCard(t, n, o = {}) { const col = ["#FF6A3D", "#3AA6E8", "#8B5CF6"][n - 1], [l1, l2] = FIXLAB2[n - 1], k = o.k === undefined ? 1 : o.k;
  let s = `<g filter="url(#drop)"><rect x="-230" y="-250" width="460" height="500" rx="34" fill="#FFF8EA" stroke="${col}" stroke-width="12"/></g><g transform="translate(0 -20)">${x2fixPic(t, n)}</g>`
    + `<path d="M-230 140 h460 v76 a34 34 0 0 1 -34 34 h-392 a34 34 0 0 1 -34 -34z" fill="${col}"/>` + T(0, 186, l1, 40, "#fff") + T(0, 230, l2, l2.startsWith("(") ? 32 : 40, "#fff", { w: l2.startsWith("(") ? 600 : 700 })
    + `<g transform="translate(-196 -214)" filter="url(#dropS)"><circle r="54" fill="${P.sun}" stroke="${P.ink}" stroke-width="7"/></g>` + T(-196, -194, String(n), 64, P.ink);
  if (o.glow) s = `<rect x="-252" y="-272" width="504" height="544" rx="44" fill="none" stroke="${P.sun}" stroke-width="${n2(14 * o.glow)}" opacity="${n2(Math.min(1, o.glow))}"/>` + s;
  if (o.stamp) { const [txt, good, ts] = o.stamp; if (t >= ts) { const sz = txt.length > 14 ? 40 : 54; s += TF(0, -40, lerp(2, 1, eo((t - ts) / .15)), `<g transform="rotate(-12)"><rect x="${n2(-tw(txt, sz, 700) / 2 - 30)}" y="-48" width="${n2(tw(txt, sz, 700) + 60)}" height="96" rx="18" fill="${good ? P.leaf : "#E5484D"}" stroke="#fff" stroke-width="8"/>${T(0, sz * .35, txt, sz, "#fff")}</g>`); } }
  return TF(0, 0, k, s); }
const CX3 = [560, 960, 1360], CARDY = 330, CARDK = .58;
const x2cards = (t, y, k, o = {}) => [1, 2, 3].map((n) => { const ti = o.tin ? o.tin[n - 1] : -9, kk = k * (ti > -9 ? spring(t, ti, .45) : 1); if (kk < .02) return "";
  const sd = o.said ? pulse(t, o.said[n - 1], .04, .6) : 0, xs = o.xs || CX3; return TF(xs[n - 1], y - 14 * sd, kk * (1 + .05 * sd), x2fixCard(t, n, { glow: o.glow ? o.glow(n) : sd, stamp: o.stamp ? o.stamp(n) : null })); }).join("");
// the huddle: a small table in the middle with Chilli on it; Momo left, Basil right of Chilli, Pip far right; all lean in to Chilli
SC.fixcards = (t, s) => { const tc = [MK("c1"), MK("c2"), MK("c3")];
  window._BUBAT = { momo: [420, 600], basil: [1290, 590], pip: [1660, 600] };
  let z = 1, fx = 960; for (let i = 0; i < 3; i++) { const a = tc[i] - .1, b = i === 0 ? tc[1] - .4 : i === 1 ? tc[2] - .4 : LE("f205") + .2, u = ss(a, a + .7, t) * (1 - ss(b - .6, b, t)); if (u > 0) { z = 1 + .1 * u; fx = lerp(960, CX3[i], u); } }
  const c = camOn([fx, 330], z, fx, 330), boxK = t >= MK("box") - .15 ? 1 : 0, cry = MK("cry1");
  return `<g filter="url(#b4)">${x2place("vdv2", "", [1.1, 1100, 700])}</g><rect width="1920" height="1080" fill="${P.night}" opacity=".45"/>`
    + TF(900, 930, .8, deskV3(t, { noSign: true })) + TF(880, 930, .5, chilliV3(t, { body: "wilt", face: "droop" }))
    + OP(ramp(t, s.t0 + .1, .3), T(960, 112, "THREE FIXES", 60, P.sun, { ls: 6 })) + CAM(x2cards(t, CARDY, CARDK, { tin: tc.map((x) => x - .1), said: tc }), c[0], c[1], c[2])
    + battleCry(t, cry - .05, 1240, 600, "MORE WATER,|MORE POWER!", { d: 1.5, k: .55 }) + x2said("f202") + windV2(t, 1240, 760, 360, ss(cry - .1, cry + .1, t) * (1 - ss(LE("f202") + .2, LE("f202") + .5, t))) + flare(1250, 620, ss(cry, cry + .15, t) * (1 - ss(LE("f202"), LE("f202") + .4, t)))
    + x2bd("momo", 420, 1076, 340, t, { in: s.t0 - .5, poses: [[s.t0, "thinking"], [LT("f201") - .1, "sit"], [LE("f201") + .05, "pointing"], [LT("f202") + .3, "sit"], [LT("f204") - .1, "sit"], [LE("f204") + .05, "horrified/surprised"], [LE("f205") + .3, "unimpressed"], [LT("f206") + .2, "thinking"]], look: 6, mag: t >= LE("f201") + .05 && t < LT("f202") + .3 })
    + x2bd("basil", 1270, 1076, 330, t, { in: s.t0 - .5, flip: true, poses: [[s.t0, "thinking"], [LT("f201") + .4, "arms_crossed"], [LT("f202") - .1, "sit"], [cry - .1, "hero/arms_crossed"], [LE("f202") + .3, "sit"], [LE("f205") + .05, "laughing"], [LE("f205") + 1.3, "sit"], [LT("f206") + .2, "thinking"]], look: -6 })
    + x2bd("pip", 1690, 1076, 330, t, { in: s.t0 - .5, flip: true, poses: [[s.t0, "thinking"], [cry, "panic/oops"], [LT("f203") - .1, "sit"], [LE("f203") + .05, "pointing"], [LT("f204") + .3, "sit"], [LT("f205") - .1, "sit"], [LE("f205") + .05, "embarrassed/oops"], [LT("f206") + .2, "thinking"]], look: -6 })
    + (boxK ? x2held([1, 960, 540], "pip", 1690, 1076, 330, true, TF(0, 0, .55, lunchboxV3()), -30, 30) : "")
    + (t >= MK("show") - .1 ? TF(1760, 360, spring(t, MK("show") - .1, .4) * .8, countHand(t < W("f206", "two") ? 1 : t < W("f206", "three") ? 2 : 3, {}) + youPill(0, -170, .9)) : "") + x2HUD(t); };

/* the lock-in: the ring with wilting Chilli in its glossy pot; the clue labels ON TOP of the ring frame; the cards under it; Momo big at the left */
SC.lock = (t, s) => { const r0 = MK("ring0_fix"), bell = MK("bell_fix"), D = Math.round(bell - r0), rs = ringState(t, r0, D), inT = t >= r0 && t < bell, shut = pulse(t, bell, .01, .6), b = Math.floor(t - r0), RC = [960, 380], RR = 240;
  const inner = `<clipPath id="lkV3"><circle cx="${RC[0]}" cy="${RC[1]}" r="${RR - 26}"/></clipPath><circle cx="${RC[0]}" cy="${RC[1]}" r="${RR - 26}" fill="#E8F3FF"/><g clip-path="url(#lkV3)"><rect x="700" y="${RC[1] + 120}" width="520" height="200" fill="#D9D1C2"/>${TF(RC[0], RC[1] + 150, .78, chilliV3(t, { body: "wilt", face: "droop", talk: false }))}</g>`;
  const ring = ringTimer(RC[0], RC[1], t < bell ? rs.frac : 0, t < bell ? rs.secs : 0, t, { R: RR, sw: 34, tick: rs.tick, shut, chg: inT || (t >= bell && t < bell + .5) ? (t >= bell ? bell : rs.chg) : -9, ns: 1.3, inner });
  const clues = [["watered every day", 1450, 180, 1110, 250], ["leaves drooping", 470, 250, 900, 300], ["a beautiful new pot", 1490, 470, 1010, 470]].map(([txt, x, y, px, py], i) => OP(ramp(t, s.t0 + .2 + i * .15, .3), `<path d="M${x} ${y} L${px} ${py}" stroke="#fff" stroke-width="6" stroke-linecap="round"/>` + clue3(x, y, txt, spring(t, s.t0 + .2 + i * .15, .4), 50, 520))).join("");
  const peek = t >= bell - 1.0 && t < bell + .2;
  return bg("stage") + OP(ramp(t, s.t0, .3), T(960, 64, "Which fix helps Chilli?", 46, "#fff", { w: 600 })) + TF(...RC, spring(t, s.t0, .45) * (1 + .03 * (inT ? rs.tick : 0)), `<g transform="translate(${-RC[0]} ${-RC[1]})">${ring}</g>`) + clues
    + x2cards(t, 860, .4, { said: [0, 0, 0].map((_, i) => inT && b % 3 === i ? t : -9), glow: (n) => (inT && b % 3 === n - 1 ? .5 + rs.tick * .5 : 0) })
    + OP(ramp(t, r0 - .15, .2) * (t < bell ? .75 + .25 * Math.sin(t * 9) : 1), T(1680, 660, "LOCK IT IN!", 44, P.sun, { ls: 6 }))
    + (t >= bell + .05 ? stamp(t, bell + .05, 960, 670) : "")
    + x2bd("momo", 190, 1076, 440, t, { in: s.t0 - .5, mag: !peek, poses: [[s.t0, "worried/thinking"], [bell - 1.0, "oops"], [bell + .4, "sit"]], look: 4, jump: [[r0 + 1.5, 14], [r0 + 3.5, 14], [r0 + 5.4, 10]] }) + x2HUD(t); };

/* the picks: the cards rise to a row; each buddy stands under the card they picked (Momo 1, Basil 2, Pip 3); MISS 1: Basil's paws are on his
   full watering can (he is already acting), so Momo's and Pip's paws meet empty air */
SC.picks = (t, s) => { window._BUBAT = { pip: [1360, 560], basil: [960, 560], momo: [560, 560] }; const up = eio((t - s.t0) / .6), y = lerp(860, 300, up), k = lerp(.4, .48, up), tp = s.t0 + .3;
  const hf = LT("p207") + .3, ms = MK("miss1"), slosh = pulse(t, ms, .02, .4);
  const cardsUp = x2cards(t, y, k, { glow: (n) => t >= tp + (n - 1) * .25 ? .6 : 0 });
  return bg("stage") + (up >= 1 ? cardsUp : "")
    + x2bd("momo", CX3[0], 1076, 360, t, { in: s.t0 - .5, mag: t < hf, poses: [[s.t0, "sit"], [tp, "pointing"], [LT("p207") - .1, "sit"], [hf, "hi5/cheer"], [ms + .35, "unimpressed"], [LT("p208") + .4, "sit"]], look: t > hf && t < ms + .3 ? 10 : 3 })
    + x2bd("basil", CX3[1], 1076, 360, t, { in: s.t0 - .5, poses: [[s.t0, "sit"], [tp + .25, "hero/arms_crossed"], [LT("p207") - .2, "sit"], [LT("p208") + .2, "pointing"], [LE("p208") + .1, "sit"]], look: 0, noreact: true, jump: [[tp + .3, 16], [tp + .7, 14]] })
    + x2held([1, 960, 540], "basil", CX3[1], 1076, 360, false, `<!--FACES:right can-->` + TF(0, 0, .5, canV3(t, { tilt: -6 + 18 * slosh })), -20, 50) + (slosh > .05 ? OP(slosh, `<circle cx="1090" cy="760" r="10" fill="#5CB8F0"/><circle cx="1110" cy="790" r="7" fill="#5CB8F0"/>`) : "")
    + x2bd("pip", CX3[2], 1076, 360, t, { in: s.t0 - .5, flip: true, poses: [[s.t0, "sit"], [tp + .5, "pointing"], [LT("p207") - .1, "sit"], [hf, "hi5/cheer"], [ms + .35, "embarrassed/oops"], [LT("p208") + .4, "sit"]], look: t > hf && t < ms + .3 ? -12 : -3 })
    + (t < hf || t > ms + .3 ? x2held([1, 960, 540], "pip", CX3[2], 1076, 360, true, TF(0, 0, .5, lunchboxV3()), -30, 30) : "")
    + x2whiff(t, ms, 960, 600) + (t >= ms - .05 && t < ms + .6 ? comicWord(t, ms + .2, 1110, 720, "slosh.", { size: 40, tiny: true, col: "#BFE6F7", d: .6 }) : "")
    + (up < 1 ? cardsUp : "") + x2HUD(t); };
