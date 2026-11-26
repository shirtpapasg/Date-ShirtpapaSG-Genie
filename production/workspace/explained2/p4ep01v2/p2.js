// p2.js: P4 EP1 v2, the flashback: TEN MINUTES EARLIER at the bicycle bay, STOP 1 the bell (pigeons), STOP 2 the chain (the snail-cam, the
// slow-motion replay, the snail tease), STOP 3 the brakes (top of the ramp), THE RUNAWAY BIKE (the set piece, ending on the cold open's
// exact layout) and FIX 1 TESTED: THE RACE (Heart's movie-trailer aside, the split screen, the toot, the side-by-side). Uses p1.js's x2*.

/* ================================================================ BAY · TEN MINUTES EARLIER ================================================================ */
// the void deck (vdv2) at the bicycle bay end: Basil beside his complete bike (bell, brakes, chain, kickstand), helmet on; Pip and Momo with
// him; across the floor Uncle Lim rides slowly past to the left (FACES the way he rides: mirrored), rings at a pigeon and stops at the start
// line to sip; the caption in Heart's handwriting style: "Uncle Lim is never in a hurry."
const BAYBK = [1230, 1050], BAYK = .78;
const bayCam = (t, s) => camMix(camOn([1000, 640], 1.0), camOn([900, 760], 1.08, 900, 640), eio(clamp((t - LT("s301") + .4) / 1.4)));
const x2limPast = (t, t0, t1, x0, x1, y, k, stopSip = true) => { const u = clamp((t - t0) / (t1 - t0)), x = lerp(x0, x1, eio(u)), mv = u < 1, cr = (t - t0) * 2.2 * (mv ? 1 : 0) + (mv ? 0 : (t1 - t0) * 2.2);
  return TF(x, y, -k, `<!--FACES:right limRide-->` + limRideV2(t, { crank: cr, sip: !mv && stopSip ? .5 + .5 * Math.sin((t - t1) * 1.3) : 0, ring: mv && u > .35 && u < .45 ? 1 : 0, stand: !mv }), 0, k); };
SC.bay = (t, s) => { const c = bayCam(t, s), tc = MK("cry2"), lx = x2limPast(t, s.t0 + .2, s.t0 + 4.6, 1560, 130, 915, .38);
  const pg = TF(860, 930, .5, pigeonV2(t, { peck: .5 + .5 * Math.sin(t * 6), ph: 1 }));
  const set = lx + pg + TF(...BAYBK, BAYK, bikeP4(t, { chain: 1, brakes: 1, bell: 1, crank: .6 }));
  window._BUBAT = { basil: [1000, 300] }; if (t > MK("cry2") - .2) x2said("s301");
  return x2place("vdv2", set, c) + battleCry(t, tc - .05, 1100, 330, "LIGHTER|IS FASTER!", { d: 1.5, k: .9 }) + windV2(t, 900, 700, 380, ss(tc - .1, tc + .1, t) * (1 - ss(LE("s301") + .2, LE("s301") + .5, t)))
    + x2bc(c, "pip", 1650, 1066, 340, t, { in: s.t0 + .2, flip: true, poses: [[0, "sit"], [tc + .1, "panic/thinking"], [LE("s301") + .5, "sit"]], look: -5 })
    + x2bc(c, "momo", 380, 1066, 320, t, { in: s.t0 + .35, poses: [[0, "sit"], [tc + .3, "thinking"]], look: 9 })
    + x2bc(c, "basil", 720, 1066, 380, t, { in: s.t0 + .05, poses: [[0, "sit"], [tc - .1, "hero/arms_crossed"], [LE("s301") + .3, "sit"]], look: 4 })
    + x2held(c, "basil", 720, 1066, 380, false, `<g transform="rotate(-30)">${spannerP4()}</g>` + OP(pulse(t, LT("s301") + 1.0, .02, .3), `<g transform="translate(46 -6)"><path d="M0 -30 V30 M-30 0 H30" stroke="#fff" stroke-width="6" stroke-linecap="round"/></g>`), -10, 30)
    + x2aside(t, s.t0 + 4.4, LT("s301") + 2.2, ...camPt(c, [330, 520]), "Uncle Lim is never in a hurry.")
    + x2rewind(t, s.t0 - .02, .5, null) + OP(1 - ramp(t, s.t0 + 1.6, .3), TF(960, 420, 1, tpill(0, 0, "10 MINUTES EARLIER", 54, P.sun, P.ink, { w: 700, ls: 4 })))
    + x2HUD(t); };

/* ================================================================ BELL · STOP 1: THE BELL ================================================================ */
// three shots: (A) a three-shot round the handlebar at the bay (Basil left, Pip middle, Momo right), the refrain; (B) from BEHIND: Basil
// rides AWAY along the floor towards the back wall (he gets smaller), the pigeons ahead; "Ring, ring!"; FLAP-FLAP-FLAP!; (C) the front:
// Basil standing beside his bike, three pigeons on him (one on his helmet); his face close-up (the big feeling); Pip and Momo jog up.
const BLB = [1060, 1050], BLK = .9, BELLW = [BLB[0] + BLK * (BK.HT[0] - 24), BLB[1] + BLK * (BK.HT[1] - 66)];
SC.bell = (t, s) => { const tO = MK("clink"), tR = MK("rideoff"), tF = MK("flap"), tB = tF + 1.0;   // shot B from the ride-off, shot C from tB
  if (t >= tR && t < tB) return x2bellRide(t, s);
  if (t >= tB) return x2bellFront(t, s);
  const c = camMix(camOn([980, 640], 1.0), camOn(BELLW, 1.2, 1000, 520), eio(clamp((t - s.t0 + .2) / 1.4)) * (1 - eio(clamp((t - tO + .2) / 1.0)) * .6)); x2said("s301");
  const on = t < tO - .1, ring = pulse(t, MK("flick"), .02, .25);
  const bellOff = !on ? (() => { const u = clamp((t - tO + .1) / .7), x = lerp(BELLW[0], 1500, eio(u)), y = lerp(BELLW[1], 1040, u) - 120 * Math.sin(Math.PI * u); return TF(x, y, BLK * 1.1, bellP4()); })() : "";
  const set = TF(...BLB, BLK, bikeP4(t, { chain: 1, brakes: 1, bell: on ? 1 : 0, crank: .6, ring })) + bellOff;
  window._BUBAT = { basil: [700, 330], pip: [1180, 300], momo: [1400, 360] };
  const look = (x) => watchO(x, BELLW[0]);
  return CAM(bg("vdv2") + set, c[0], c[1], c[2])
    + x2bc(c, "basil", 560, 1066, 400, t, { in: s.t0 - .5, poses: [[0, "sit"], [LE("b401") + .05, "arms_crossed"], [LT("b403") - .1, "sit"], [LE("b403") + .05, "arms_crossed"], [LE("b404") + .1, "shrug/oops"], [LT("b405") - .1, "sit"]], look: 5 })
    + x2bc(c, "pip", 1440, 1066, 370, t, { in: s.t0 - .5, flip: true, poses: [[0, "sit"], [LT("b401") + .5, "panic/thinking"], [LT("b402") - .1, "sit"], [LE("b402") + .05, "pointing"], [LT("b404") - .1, "sit"], [LT("b405") + .3, "panic/oops"]], look: -6 })
    + x2bc(c, "momo", 1830, 1066, 360, t, { in: s.t0 - .5, flip: true, poses: [[0, "sit"], [LT("b403") + .2, "thinking"], [LT("b404") - .1, "sit"], [LE("b404") + .05, "pointing"], [LT("b405") + .2, "sit"]], look: -9 })
    + x2refrain(t, "b401", LE("b401") + .6) + x2refrain(t, "b402", LE("b402") + 1.2, { size: 54, col: P.pip, litCol: "#6B4FD8" })
    + comicWord(t, MK("flick") + .02, ...camPt(c, [BELLW[0] + 90, BELLW[1] - 90]), "ting!", { size: 50, tiny: true, col: "#BFE6F7", d: .6 })
    + comicWord(t, tO + .55, ...camPt(c, [1500, 900]), "CLINK!", { size: 80, d: .8 })
    + x2HUD(t); };
// (B) the ride-off from behind: the floor recedes to the back wall; Basil (back view on the saddle) rides away, smaller; the pigeons ahead
const x2backRider = (t, x, y, k, cr, o = {}) => TF(x, y, k, `<!--FACES:away riderRear-->` + bikeRearV2(t, { crank: cr }) + buddy("basil", 0, -330, 330, t, { pose: "back", tag: false, shadow: false, noreact: true, still: false, items: false }) + basilHelmetBack(-6, -330 - 330 * .94 + 40, 1.05) + (o.rider || "")).replace("<!--FACES:away riderRear-->", "<!--FACES:away riderRear-->");
// Basil's helmet seen from behind (on his back-view painting)
function basilHelmetBack(x, y, k) { return TF(x, y, k, `<path d="M-120 30 Q-128 -90 0 -100 Q128 -90 120 30 Q0 4 -120 30z" fill="#FFA63D" stroke="#1E3442" stroke-width="8"/><path d="M-50 -92 Q-58 -30 -50 20 M0 -100 V14 M50 -92 Q58 -30 50 20" stroke="#7A3E12" stroke-width="12" fill="none" stroke-linecap="round" opacity=".8"/><path d="M-118 26 Q0 0 118 26" stroke="#C9661A" stroke-width="10" fill="none"/>`); }
function x2bellRide(t, s) { const tR = MK("rideoff"), tF = MK("flap"), u = clamp((t - tR) / (tF - tR)), d = eio(u) * .92 + (t > tF ? .08 * eo(clamp((t - tF) / .4)) : 0);
  const x = lerp(960, 980, d), y = lerp(1170, 860, d), k = lerp(1.0, .4, d), cr = (t - tR) * 7 * (t < tF ? 1 : Math.max(0, 1 - (t - tF) * 3));
  // the back wall straight ahead (the vdv2 wall, seen square on), the floor receding to it
  let w = `<g transform="translate(960 300) scale(.9) translate(-960 -480)">${bg("vdv2")}</g><rect y="760" width="1920" height="320" fill="url(#floorV2)"/>` + [...Array(16)].map((_, i) => `<path d="M${960 + (i - 7.5) * 60} 760 L${960 + (i - 7.5) * 260} 1080" stroke="#C2B8A4" stroke-width="3" opacity=".7"/>`).join("") + [800, 860, 950].map((yy) => `<path d="M0 ${yy} H1920" stroke="#C2B8A4" stroke-width="3" opacity=".6"/>`).join("");
  // the pigeons, pecking ahead; at "flap" they burst up all round him and settle on him (shot C)
  let pg = ""; for (let i = 0; i < 7; i++) { const px = 800 + i * 56 + 20 * Math.sin(i * 2), py = 850 + (i % 3) * 12, ph = i * .7; if (t < tF) pg += TF(px, py, .45, (i % 2 ? `<g transform="scale(-1 1)"><!--FACES:right pigeon-->${pigeonV2(t, { peck: .5 + .5 * Math.sin(t * 7 + ph), ph })}</g>` : pigeonV2(t, { peck: .5 + .5 * Math.sin(t * 7 + ph), ph })));
    else { const v = clamp((t - tF) / .9), ang = -Math.PI / 2 + (i - 3) * .45; pg += TF(px + 260 * v * Math.cos(ang) * (i % 2 ? 1 : .8), py - 220 * Math.sin(Math.PI * v * .9) - 40 * v, .45, (Math.cos(ang) < 0 ? `<g transform="scale(-1 1)"><!--FACES:right pigeon-->${pigeonV2(t, { fly: 1, ph })}</g>` : pigeonV2(t, { fly: 1, ph }))); } }
  window._BUBAT = { basil: [1200, 520] };
  return w + pg + x2backRider(t, x, y, k, cr)
    + x2bd("pip", 1440, 1076, 330, t, { in: tR - 3, ...watchO(1440, 960), poses: [[0, "sit"]], noStay: true, tag: false })
    + x2bd("momo", 1790, 1076, 320, t, { in: tR - 3, ...watchO(1790, 960), poses: [[0, "sit"]], noStay: true, tag: false })
    + (t >= tR + .9 && t < tF ? OP(ramp(t, tR + .9, .3), TF(lerp(x, x, 1) + 150 * k, y - 360 * k, 1, tpill(0, 0, "pat, pat...", 30, "#fff", P.ink, { w: 600 }))) : "")
    + comicWord(t, tF + .02, 1420, 560, "FLAP-FLAP-FLAP!", { size: 74, d: .9 })
    + x2HUD(t); }
// (C) the front: Basil standing beside his bike (no bell), three pigeons on him, one on his helmet; the face close-up; Pip and Momo jog up
const BELC = [1180, 1050];
function x2bellFront(t, s) { const tB = MK("flap") + 1.0, c = camMix(camOn([1000, 700], 1.25, 960, 620), camOn([1000, 640], 1.0), eio(clamp((t - LT("b407") - .3) / 1.6)));
  const B = [760, 1066, 410], pgOn = (who, dx, dy, k, flip, ph) => x2held(c, "basil", B[0], B[1], B[2], false, TF(dx, dy, k, flip ? `<g transform="scale(-1 1)">${pigeonV2(t, { ph, peck: .1 * Math.sin(t * 3 + ph) })}</g>` : pigeonV2(t, { ph })), 0, 0);
  const coo = LT("b408") + .6, turn = clamp((t - coo) / .5), hx = Math.cos(Math.PI * turn) > 0;
  const helmPig = x2held(c, "basil", B[0], B[1], B[2], false, TF(-20, -262, .95, hx ? pigeonV2(t, { ph: 3 }) : `<g transform="scale(-1 1)">${pigeonV2(t, { ph: 3 })}</g>`), 0, 0);
  const jog = (x0, x1, t0) => lerp(x0, x1, eio(clamp((t - t0) / .8)));
  window._BUBAT = { basil: [560, 300], momo: [1300, 330], pip: [1500, 300] };
  return x2place("vdv2", TF(...BELC, BLK, bikeP4(t, { chain: 1, brakes: 1, bell: 0, crank: .6 })), c)
    + x2bc(c, "basil", ...B, t, { in: tB - .02, noStay: true, poses: [[0, "shocked/surprised"], [LT("b407") + .4, "deadpan"]], look: 2, noreact: true })
    + pgOn("basil", 70, -110, .85, true, 1) + pgOn("basil", -150, -40, .8, false, 2) + helmPig
    + comicWord(t, coo, ...camPt(c, [B[0] + 40, B[1] - 520]), "coo.", { size: 40, tiny: true, col: "#fff", d: .7 })
    + (true ? x2bc(c, "momo", jog(1520, 1400, LT("b407") - .2), 1066, 360, t, { in: tB - 3, noStay: true, flip: true, poses: [[0, "sit"], [LT("b407") + .9, "laugh/cheer"], [LE("b407") + .2, "sit"]], look: -6 }) : "")
    + (true ? x2bc(c, "pip", jog(1880, 1780, LT("b407")), 1066, 350, t, { in: tB - 3, noStay: true, flip: true, poses: [[0, "sit"], [LT("b408") + .5, "embarrassed/oops"], [LE("b408") + .4, "sit"]], look: -6 }) : "")
    + faceCam("basil", t, tB + .05, tB + 1.5, 1520, 300, 150, [[0, "shocked/surprised"]], { flip: true, noreact: true })
    + x2lab(t, MK("warn"), s.t1, c, "bell: warns people you are coming", 1380, 200, BELC[0] + BLK * (BK.HT[0] - 24), BELC[1] + BLK * (BK.HT[1] - 66), 38)
    + x2HUD(t); }

/* ================================================================ CHAIN · STOP 2: THE CHAIN ================================================================ */
// the path by the garden (gardenv2): a two-shot of Basil and Momo over the chain (Momo crouching, leaning in to look); Pip a step back;
// the refrain with YOUR TURN!; the chain springs off (SPROING!) and lands in a heap
const CHB = [1000, 1050], CHK = .9;
SC.chain = (t, s) => { const tS = MK("sproing"), off = t >= tS - .05, c = camMix(camOn([900, 640], 1.0), camOn([CHB[0] - 120, 880], 1.3, 900, 620), eio(clamp((t - s.t0 - .3) / 1.6)) * (1 - eio(clamp((t - MK("yt2") + .3) / .8)) * .7));
  const flyU = clamp((t - tS + .05) / .7), heap = TF(lerp(CHB[0] - 120, 1560, eio(flyU)), lerp(CHB[1] - 160, 1046, flyU) - 160 * Math.sin(Math.PI * flyU), .55, `<g transform="rotate(${n2(-300 * flyU)})">${chainLoose(260, 90, t * 3 * (1 - flyU))}</g>`);
  const set = TF(...CHB, CHK, bikeP4(t, { chain: off ? false : 1, brakes: 1, bell: 0, crank: .6 })) + (off ? heap : "");
  window._BUBAT = { basil: [640, 330], momo: [1240, 360], pip: [1520, 320] }; x2said("n502");
  return x2place("gardenv2", set, c)
    + x2bc(c, "basil", 560, 1066, 400, t, { in: s.t0 - .5, poses: [[0, "sit"], [MK("grease") - .1, "pointing"], [LT("n503") - .1, "sit"], [LE("n504") + .05, "shrug/oops"], [LT("n505") - .1, "sit"]], look: 5, ...x2grease(t) })
    + x2bc(c, "momo", 1240, 1080, 330, t, { in: s.t0 - .5, flip: true, poses: [[0, "sit"], [LE("n501") + .1, "horrified/surprised"], [LT("n503") + .4, "thinking"], [LT("n504") - .1, "sit"], [LE("n504") + .05, "pointing"], [LT("n505") + .3, "sit"]], look: -12 })
    + x2bc(c, "pip", 1660, 1066, 360, t, { in: s.t0 - .5, flip: true, poses: [[0, "sit"], [LE("n501") + .1, "sit"], [MK("yt2") - .3, "pointing"], [MK("yt2") + .5, "proud/arms_crossed"], [LT("n503") + .4, "sit"], [LT("n505") + .5, "panic/oops"]], look: -6 })
    + x2refrain(t, "n501", LE("n501") + .6) + (t >= LT("n502") - .2 && t < MK("yt2") ? x2refrain(t, "n502", MK("yt2"), { size: 54, col: P.pip }) : "") + x2yourTurn(t, MK("yt2") + .1, 1.6)
    + comicWord(t, tS + .02, ...camPt(c, [CHB[0] - 80, 760]), "SPROING!", { size: 84, d: .85 })
    + x2HUD(t); };

/* ================================================================ SNAILCAM · the low side shot ================================================================ */
// the camera at ground level: the bike in profile (front at the right), only its lower half (Basil's body is out of the frame above; his
// banded teal tail hangs behind the saddle), the pedals a cartoon blur-circle, the bare gears, the BACK WHEEL DEAD STILL. WHIRRRR. The
// snail glides in from the left, in the foreground, FACING RIGHT, and slowly overtakes the still back wheel.
const SCB = [1260, 1060], SCK = 2.9;
const x2snailX = (t, t0) => lerp(-160, 1700, clamp((t - t0) / 9.0));   // the snail's own speed: about 205 px a second at this zoom
const x2tailHang = (t, sway = 0) => `<g transform="rotate(${n2(sway)})"><path d="M0 0 Q-30 120 -10 240 Q6 300 -20 340" stroke="#1E3442" stroke-width="58" fill="none" stroke-linecap="round"/><path d="M0 0 Q-30 120 -10 240 Q6 300 -20 340" stroke="#6FA59C" stroke-width="46" fill="none" stroke-linecap="round"/>${[60, 130, 200, 270].map((d, i) => `<path d="M-26 ${d} q22 10 44 0" stroke="#2BA58E" stroke-width="26" fill="none" stroke-linecap="round"/>`).join("")}<path d="M-30 160 Q0 150 24 166 M-28 198 Q0 190 22 204" stroke="#1E2227" stroke-width="12" stroke-linecap="round" fill="none" opacity=".8"/></g>`;
function x2snailcam(t, s, slow = 1, tw_) { const tt = tw_ === undefined ? t : tw_, cr = (tt - s.t0) * 16, sx = x2snailX(tt, MK("pedt") - 1.6);
  let w = `<rect width="1920" height="1080" fill="url(#vdSky)"/>` + hdbBlock27(-60, 40, 380, 520, "#F2E2C4", "#7BB0E0") + `<rect y="520" width="1920" height="200" fill="#5DAF4D"/>` + tree27(1500, 600, 1.2) + `<rect y="700" width="1920" height="380" fill="url(#vdPath)"/>`
    + [...Array(12)].map((_, i) => `<path d="M${i * 180 - 40} 700 L${i * 180 - 200} 1080" stroke="#A39B8C" stroke-width="4" opacity=".7"/>`).join("") + `<path d="M0 860 H1920" stroke="#A39B8C" stroke-width="4" opacity=".6"/>`;
  const bike = TF(...SCB, SCK, bikeP4(tt, { chain: false, brakes: 1, bell: 0, crank: cr, sh: 0, g2: 0, pedalBlur: 1, stand: false }));
  const tail = TF(SCB[0] + SCK * (BK.ST[0] - 60), -30, 1.25, x2tailHang(tt, 4 * Math.sin(tt * (slow < 1 ? 2 : 6))));
  const snail = TF(sx, 1048, 1.5, `<!--FACES:right snail-->` + snailV2(tt)) + snailTrail(-200, sx, 1042);
  return { w, bike, tail, snail, sx }; }
SC.snailcam = (t, s) => { const R = x2snailcam(t, s), c = camOn([960, 700], 1.0);
  return R.w + R.tail + R.bike + `<rect x="0" y="0" width="1920" height="70" fill="#1E3442" opacity="0"/>` + R.snail
    + comicWord(t, s.t0 + .2, 1300, 420, "WHIRRRR", { size: 84, d: 1.4, rot: -4 }) + comicWord(t, MK("pedt") - 1.4, R.sx + 120, 900, "squelch.", { size: 34, tiny: true, col: "#E8F4FF", d: .9 })
    + x2lab(t, MK("pedt"), s.t1, c, "pedals: turning", 1450, 300, SCB[0] + SCK * BK.BB[0] + 60, SCB[1] + SCK * BK.BB[1] - 40, 42) + x2lab(t, MK("bwst"), s.t1, c, "back wheel: still", 420, 300, SCB[0] + SCK * BK.RA[0], SCB[1] + SCK * BK.RA[1] - 90, 42)
    + OP(ramp(t, s.t0, .3), TF(1700, 990, 1, tpill(0, 0, "snail-cam", 30, "#fff", P.ink, { w: 600 }))) + x2HUD(t); };
/* the slow-motion replay: INSTANT REPLAY · SLOW MOTION ×¼; it looks EXACTLY the same (the snail is that slow), only Basil's tail flaps slowly */
SC.replay = (t, s) => { const s0 = SCN.snailcam, rp = MK("slow0") - .4, tw_ = t < rp ? s0.t1 - .02 : s0.t0 + 3.4 + (t - rp) * 1.0, R = x2snailcam(t, s0, .25, tw_);
  let film = `<rect width="1920" height="100" fill="#111"/><rect y="980" width="1920" height="100" fill="#111"/>`; for (let i = 0; i < 24; i++) { const x = ((i * 90 - (t * 40) % 90) + 1920) % 1980 - 30; film += `<rect x="${n2(x)}" y="26" width="46" height="48" rx="8" fill="#EEE"/><rect x="${n2(x)}" y="1006" width="46" height="48" rx="8" fill="#EEE"/>`; }
  const rew = t < s.t0 + .45 ? 1 - (t - s.t0) / .45 : 0;
  return R.w + R.tail + R.bike + R.snail + `<rect width="1920" height="1080" fill="#D9C7A0" opacity=".14"/>` + film
    + TF(330, 160, spring(t, s.t0 + .1, .4), tpill(0, 0, "INSTANT REPLAY", 40, "#E5484D", "#fff", { w: 700 })) + (t >= rp ? TF(1560, 160, spring(t, rp, .4), tpill(0, 0, "SLOW MOTION ×¼", 40, P.ink, P.sun, { w: 700 })) : "")
    + (t >= MK("rp0") ? OP(ramp(t, MK("rp0") + 1.2, .3), TF(960, 880, 1, tpill(0, 0, "(it looks exactly the same)", 32, "#fff", P.ink2, { w: 600 }))) : "")
    + (rew > 0 ? `<rect width="1920" height="1080" fill="#fff" opacity="${n2(.6 * rew)}"/>` + [0, 1, 2, 3, 4, 5].map((i) => `<rect x="0" y="${(i * 197 + t * 2400) % 1080}" width="1920" height="10" fill="#fff" opacity=".6"/>`).join("") + T(960, 560, "◀◀", 160, "#fff") : "") + logo(t); };
/* the tease: a two-shot (front view): Basil off the bike, Momo with her paws on her hips; BATTLE CRY 3, smaller, and it wobbles; the snail
   in the background, still going */
SC.tease = (t, s) => { const c = camOn([960, 700], 1.15, 960, 620), tc = MK("cry3");
  window._BUBAT = { momo: [1240, 330], basil: [640, 330] }; x2said("n509");
  return x2place("gardenv2", TF(...CHB, CHK, bikeP4(t, { chain: false, brakes: 1, bell: 0, crank: .6 })) + TF(1560, 1046, .55, `<g transform="rotate(20)">${chainLoose(260, 90, 0)}</g>`) + TF(lerp(1100, 1230, (t - s.t0) / 5), 960, .5, `<!--FACES:right snail-->` + snailV2(t)), c)
    + x2bc(c, "basil", 640, 1066, 400, t, { in: s.t0 - .5, poses: [[0, "deadpan"], [tc - .1, "pointing"], [LE("n509") + .3, "sit"]], look: 4, ...x2grease(t) })
    + x2bc(c, "momo", 1250, 1066, 380, t, { in: s.t0 - .5, flip: true, poses: [[0, "unimpressed"], [LT("n508") - .05, "sit"], [LE("n508") + .1, "unimpressed"], [tc + .1, "facepalm/oops"]], look: -5 })
    + x2bc(c, "pip", 1700, 1066, 360, t, { in: s.t0 - .5, flip: true, poses: [[0, "sit"]], look: -5, noreact: true })
    + battleCry(t, tc - .05, 900, 300, "LIGHTER|IS FASTER!", { d: 1.3, k: .62, wobble: true }) + x2HUD(t); };

/* ================================================================ BRAKES · STOP 3: THE BRAKES (top of the ramp) ================================================================ */
// the ramp (rampv2): the bike at the top (landing, y 760), Basil beside it; Pip and Momo on the ramp just below; the refrain; YOUR TURN!;
// CLANG! the levers off; Basil leans the bike on its kickstand and turns away into his heroic pose; his tail flicks the kickstand up
// (click.); the bike tips upright and starts to roll down the ramp on its own (front wheel first, to the right). Nobody is on it.
const RPB = [430, 760], RPK = .78;
const rampAt = (x) => RAMPY(x);
// the runaway bike on the ramp: s = how far it has rolled (px); it tilts with the slope; o.click (the stand)
function x2rampBike(t, s, o = {}) { const x = RPB[0] + s, y = rampAt(x + 100), a = x + 100 > 560 && x + 100 < 1460 ? Math.atan(240 / 900) * 180 / Math.PI : 0, cr = .6, wh = s / (BK.R * RPK);
  return `<g transform="translate(${n2(x)} ${n2(y)}) rotate(${n2(a)}) scale(${RPK})"><!--FACES:right bikeP4-->${bikeP4(t, { chain: false, brakes: o.brakes === undefined ? 0 : o.brakes, bell: 0, crank: cr, sh: 0, g2: 0, rw: wh, fw: wh, stand: !!o.stand, blur: Math.min(.6, s / 900), fblur: Math.min(.6, s / 900) })}</g>`; }
SC.brakes = (t, s) => { const tC = MK("clang"), tL = MK("lean"), tK = MK("click"), roll = t > tK + .2 ? 40 * (t - tK - .2) ** 2 : 0;
  const fwx = RPB[0] + RPK * BK.FA[0] + roll, c = t < tK + .1 ? camMix(camOn([560, 620], 1.0, 900, 560), camOn([560, 620], 1.15, 900, 560), eio(clamp((t - s.t0) / 1.4))) : camOn([fwx, rampAt(fwx) - 100], 1.9, 820, 640);
  const lev = t < tC - .05;
  const set = x2rampBike(t, roll, { brakes: lev ? 1 : 0, stand: t < tK }) + (lev ? "" : TF(RPB[0] - 120, 760, .9, `<path d="M-30 -6 q-6 22 -26 30 M30 -10 q6 22 26 30" stroke="#59616B" stroke-width="7" fill="none" stroke-linecap="round"/>`));
  const sq = pulse(t, MK("sqz"), .02, .3);
  window._BUBAT = { basil: [520, 300], pip: [1120, 400], momo: [1420, 460] }; x2said("k602");
  const turned = t >= tL;
  return x2place("rampv2", set, c) + CAM(rampFront(), c[0], c[1], c[2])
    + x2bc(c, "basil", 20, 762, 380, t, { in: s.t0 - .5, flip: turned, poses: [[0, "sit"], [MK("sqz") - .1, "pointing"], [LT("k602") - .1, "sit"], [LT("k604") - .1, "sit"], [LE("k605") + .05, "pointing"], [LT("k606") - .1, "sit"], [tL, "hero/arms_crossed"]], look: turned ? -4 : 4, ...x2grease(t) })
    + x2bc(c, "pip", 900, rampAt(900) + 4, 360, t, { in: s.t0 - .5, flip: true, poses: [[0, "sit"], [LT("k601") + .6, "panic/thinking"], [LT("k602") - .1, "sit"], [MK("yt3") - .3, "pointing"], [MK("yt3") + .5, "proud/arms_crossed"], [LT("k603") - .1, "sit"], [LE("k603") + .05, "pointing"], [LT("k604") + .3, "sit"], [LT("k606") + .3, "panic/oops"]], look: -6 })
    + x2bc(c, "momo", 1240, rampAt(1240) + 4, 360, t, { in: s.t0 - .5, flip: true, poses: [[0, "sit"], [LE("k603") + .05, "laugh/cheer"], [LT("k604") + .3, "thinking"], [LT("k605") - .1, "sit"], [LE("k606") + .2, "sit"]], look: -6 })
    + windV2(t, ...camPt(c, [-60, 560]), 300, ss(tL, tL + .2, t) * (1 - ss(tK + .3, tK + .6, t)))
    + x2refrain(t, "k601", LE("k601") + .6) + (t >= LT("k602") - .2 && t < MK("yt3") ? x2refrain(t, "k602", MK("yt3"), { size: 54, col: P.pip }) : "") + x2yourTurn(t, MK("yt3") + .1, 1.6)
    + OP(sq, `<g transform="translate(${n2(camPt(c, [RPB[0] + RPK * (BK.HT[0] - 80), 760 + RPK * (BK.HT[1] - 40)])[0])} ${n2(camPt(c, [0, 760 + RPK * (BK.HT[1] - 40)])[1])})"><path d="M-34 -26 l-20 -14 M-40 0 h-26 M34 -26 l20 -14 M40 0 h26" stroke="#fff" stroke-width="7" stroke-linecap="round"/></g>`)
    + comicWord(t, tC + .02, ...camPt(c, [RPB[0] + 80, 470]), "CLANG!", { size: 84, d: .85 }) + comicWord(t, tK + .02, ...camPt(c, [RPB[0] - 40, 690]), "click.", { size: 40, tiny: true, col: "#fff", d: .8 })
    + (t > tK + .1 ? `<rect width="1920" height="1080" fill="${P.night}" opacity="${n2(.18 * ramp(t, tK, .4))}"/>` : "") + x2HUD(t); };

/* ================================================================ RUNAWAY · THE SET PIECE ================================================================ */
// (A) k607: low angle down the ramp: the riderless bike rolls down, front wheel first, at a jogging pace (never a blur of speed), its lamp
// glinting like an eye; Pip and Momo turn and run for it (to the right, ahead of it). WHOOSH! (B) the chain reaction on the floor: the bike
// clips a stack of stools (CLATTER!), one spins into a ball (BOING!), the ball rolls under the pigeons, the pigeons lift (FLAP!) as the bike
// sails past; nobody is touched. (C) k608-k610: running side by side (the camera tracks with the trio), the bike behind them; Basil holds
// up the two levers (an inset); "no brakes: nothing slows the wheels". (D) k611 and after: the cold open's exact layout: Momo and Pip slide
// the ice box into the path; the bike rolls past the START line (Uncle Lim watches it go by, sipping); BONK! it stops against the box;
// Basil, running fastest, trips over the rim: KER-SPLOOSH! plip. The clock is back: RACE IN 3:00.
const RV = 300;   // the bike's speed on the floor (px a second)
SC.runaway = (t, s) => { const tA = s.t0, tB = MK("chainrx"), tC = LT("k608") - .3, tD = LT("k611") - .15;
  if (t < tB) return x2runA(t, s); if (t < tC) return x2runB(t, s); if (t < tD) return x2runC(t, s); return x2runD(t, s); };
function x2runA(t, s) { const u = t - s.t0, roll = 40 * (u + SCN.brakes.t1 - MK("click") - .2) ** 2, fwx = RPB[0] + RPK * BK.FA[0] + roll, c = camOn([fwx, rampAt(fwx) - 100], 1.9 - .65 * eio(clamp(u / 1.6)), 820 - 200 * eio(clamp(u / 1.6)), 640);
  const bx = RPB[0] + roll, run = (x0, sp) => x0 + sp * u;
  window._BUBAT = { pip: [1300, 300] };
  return x2place("rampv2", x2rampBike(t, roll), c) + OP(.85, `<circle cx="${n2(camPt(c, [bx + RPK * (BK.FA[0] + 120), 0])[0])}" cy="${n2(camPt(c, [0, rampAt(bx + 300) - 150])[1])}" r="${n2(18 + 10 * Math.sin(t * 9))}" fill="#FFF6C8" filter="url(#b4)"/>`) + CAM(rampFront(), c[0], c[1], c[2])
    + x2bc(c, "pip", run(fwx + 330 - u * 0, 0) + 260 * 0, rampAt(fwx + 330) + 4, 340, t, { in: s.t0 - 3, noStay: true, poses: [[0, "panic/surprised"]], look: 10, jump: [...Array(10)].map((_, i) => [s.t0 + .1 + i * .3, 16]) })
    + x2bc(c, "momo", fwx + 620, rampAt(fwx + 620) + 4, 340, t, { in: s.t0 - 3, noStay: true, poses: [[0, "horrified/surprised"]], look: 10, jump: [...Array(10)].map((_, i) => [s.t0 + .25 + i * .3, 16]) })
    + comicWord(t, s.t0 + .9, 560, 200, "WHOOSH!", { size: 92, d: .9 }) + x2HUD(t); }
function x2runB(t, s) { const t0 = MK("chainrx"), u = t - t0, cx = RV * u, bx = 300 + 40 * u, y = 1010, wh = (RV * (t - s.t0)) / (BK.R * .62);
  const hit = .5, spin = clamp((u - hit) / 1.2), stx = 760 - cx * 0 + 0;
  let w = trackV2(t, cx);
  // the stools: a stack (clipped at "hit": they clatter down), one spins away like a top into the ball; the ball rolls under the pigeons
  const sx = 900 - cx + RV * 0; let st = "";
  if (u < hit) st += [0, 1, 2, 3].map((i) => TF(sx, 1000 - i * 20, .8, stoolV2(i % 2 ? "#E5484D" : "#3AA6E8"))).join("");
  else { st += [0, 1, 2].map((i) => TF(sx - 60 + i * 50 + 80 * clamp((u - hit) * 2) * (i - 1), 1000, .8, `<g transform="rotate(${n2((i - 1) * 80 * clamp((u - hit) * 3))})">${stoolV2(i % 2 ? "#E5484D" : "#3AA6E8")}</g>`)).join("");
    st += TF(sx + 140 + 260 * spin, 1000, .8, `<g transform="scale(${n2(Math.cos(spin * 18))} 1)">${stoolV2("#43BF6C")}</g>`); }
  const ballX = sx + 420 + (u > hit + .8 ? 520 * (u - hit - .8) : 0), ball = TF(ballX, 1000, 1, ballV2(u > hit + .8 ? (u - hit - .8) * 600 : 0));
  let pg = ""; const tf = hit + 1.3; for (let i = 0; i < 5; i++) { const px = sx + 820 + i * 60, ph = i; if (u < tf) pg += TF(px, 1000, .55, pigeonV2(t, { peck: .5 + .5 * Math.sin(t * 7 + ph), ph, walk: 0 }));
    else { const v = clamp((u - tf) / .9); pg += TF(px + 120 * v, 1000 - 380 * Math.sin(Math.PI * v * .6) - 60 * v, .55, pigeonV2(t, { fly: 1, ph })); } }
  const bike = TF(bx, y, .62, bikeP4(t, { chain: false, brakes: 0, bell: 0, crank: .6, sh: 0, g2: 0, rw: wh, fw: wh, stand: false, blur: .5, fblur: .5 }));
  window._BUBAT = {};
  return w + st + ball + pg + bike
    + x2bd("pip", 1540 + 40 * u, 1070, 320, t, { in: t0 - 3, noStay: true, poses: [[0, "panic/surprised"]], look: 10, jump: [...Array(9)].map((_, i) => [t0 + i * .3, 16]), tag: false })
    + x2bd("momo", 1800 + 40 * u, 1070, 320, t, { in: t0 - 3, noStay: true, poses: [[0, "horrified/surprised"]], look: 10, jump: [...Array(9)].map((_, i) => [t0 + .15 + i * .3, 16]), tag: false })
    + comicWord(t, t0 + hit, sx + 40, 760, "CLATTER!", { size: 78, d: .85 }) + comicWord(t, t0 + hit + .8, sx + 430, 820, "BOING!", { size: 70, d: .8, rot: 6 }) + comicWord(t, t0 + tf, sx + 960, 640, "FLAP!", { size: 70, d: .8 })
    + x2HUD(t); }
function x2runC(t, s) { const t0 = LT("k608") - .3, u = t - t0, cx = 420 * u, gap = 520 - 40 * Math.sin(u * .8), bx = 380 - gap * 0, wh = cx / (BK.R * .58);
  const bike = TF(330 + 40 * Math.sin(u * .9), 1040, .58, bikeP4(t, { chain: false, brakes: 0, bell: 0, crank: .6, sh: 0, g2: 0, rw: wh, fw: wh, stand: false, blur: .55, fblur: .55 }));
  const jump = (ph) => [...Array(Math.ceil((LT("k611") - t0) / .3) + 2)].map((_, i) => [t0 + ph + i * .3, 16]);
  const tk = LT("k609"), lev = t >= tk - .1 && t < LE("k610") + .3;
  window._BUBAT = { momo: [1460, 330], basil: [1000, 300], pip: [1220, 380] };
  return trackV2(t, cx) + bike
    + x2bd("basil", 900, 1076, 330, t, { in: t0 - .02, noStay: true, poses: [[0, "shocked/surprised"], [LE("k609") + .2, "shocked/surprised"]], look: 12, jump: jump(.05), ...x2grease(t) })
    + x2bd("pip", 1260, 1076, 320, t, { in: t0 - 3, noStay: true, poses: [[0, "thinking"], [LT("k610") - .1, "sit"], [LE("k610") + .1, "panic/thinking"]], look: 10, jump: jump(.15) })
    + x2bd("momo", 1620, 1076, 330, t, { in: t0 - 3, noStay: true, poses: [[0, "horrified/surprised"], [LT("k608") - .05, "sit"], [LE("k608") + .1, "horrified/surprised"], [LE("k610") - .6, "pointing"]], look: 10, jump: jump(.25) })
    + (lev ? TF(620, 380, spring(t, tk - .1, .4) * (1 - ramp(t, LE("k610") + .1, .2)), `<g filter="url(#drop)"><circle r="150" fill="#FFF8EA" stroke="#E5484D" stroke-width="10"/></g>` + lizPaw(-70, 30, 1.5, -20) + lizPaw(70, 30, 1.5, 20, -1) + `<path d="M-90 -30 q-6 30 -30 40 M90 -30 q6 30 30 40" stroke="#59616B" stroke-width="12" fill="none" stroke-linecap="round"/><rect x="-118" y="-50" width="52" height="22" rx="8" fill="#2B2F36"/><rect x="66" y="-50" width="52" height="22" rx="8" fill="#2B2F36"/>` + T(0, 120, "his brake levers", 30, P.ink, { w: 700 })) : "")
    + (t >= MK("noslow") - .1 ? OP(spring(t, MK("noslow") - .1, .4), plabel(560, 700, "no brakes: nothing slows the wheels", 330 + 255 * .58, 1040 - 118 * .58, 38, "#fff")) : "")
    + x2HUD(t); }
// (D) the cold open's layout (p1.js CB): the box slides into the path, the bike rolls in and BONKs it, Basil trips into the ice
function x2runD(t, s) { const tD = LT("k611") - .15, tP = MK("push"), tBk = MK("bonk"), tSp = MK("splash"), c = camMix(camOn([960, 700], 1.0), camOn([1240, 760], 1.12, 1100, 640), eio(clamp((t - LT("k612") - .2) / 1.5)) * 0);
  const boxX = lerp(1540, CB.box[0], eio(clamp((t - tP + .5) / .9))), fwX = CB.bike[0] + CB.bk * (BK.FA[0]), endX = CB.bike[0];   // the bike's origin when its wheel touches the box
  const bx = t < tBk ? lerp(-500, endX, clamp((t - tD) / (tBk - tD))) : endX, wh = (bx + 500) / (BK.R * CB.bk), stopped = t >= tBk, jolt_ = stopped ? jolt(t, tBk, 14) : [0, 0];
  const bike = stopped ? `<g transform="translate(${jolt_[0]} 0)">${x2bikeLean(t, { rw: wh, fw: wh })}</g>` : TF(bx, CB.bike[1], CB.bk, `<!--FACES:right bikeP4-->` + bikeP4(t, { chain: false, brakes: 0, bell: 0, crank: .5, sh: 0, g2: 0, rw: wh, fw: wh, stand: false, blur: .4, fblur: .4 }).replace(/<path d="M[^"]*" stroke="#2B2F36" stroke-width="15"[^>]*>/, (m) => m));
  const set = TF(...CB.stool, .9, crownStoolV2(1)) + TF(...CB.lim, CB.limk, limRideV2(t, { crank: .4, sip: .4 + .6 * (.5 + .5 * Math.sin(t * .8)), stand: true })) + TF(...CB.snail, .62, snailV2(t)) + TF(boxX, CB.box[1], 1, iceBoxBackV2(t));
  // Basil runs in from the left behind the bike, trips over the rim at the splash and lands sitting in the ice (an arc)
  const bU = clamp((t - tD) / (tSp - tD)), basX = t < tSp - .45 ? lerp(80, CB.box[0] - 260, bU) : CB.box[0] + 10, inBox = t >= tSp;
  let basil; if (!inBox) { const fall = clamp((t - (tSp - .45)) / .45), x = lerp(CB.box[0] - 260, CB.box[0] + 10, fall), y = lerp(1066, 1040, fall) - 160 * Math.sin(Math.PI * fall);
    basil = x2bc(c, "basil", t < tSp - .45 ? basX : x, t < tSp - .45 ? 1066 : y, 400, t, { in: tD - 3, noStay: true, poses: [[0, "shocked/surprised"]], look: 10 + 70 * clamp((t - (tSp - .45)) / .45), jump: [...Array(12)].map((_, i) => [tD + i * .3, 14]), noreact: true }); }
  else basil = x2basilInBox(c, t, { in: tD - 3, noStay: true, poses: [[0, "shocked/surprised"], [tSp + .6, "deadpan"]], noreact: true, ...x2grease(t) });
  const can = inBox ? x2held(c, "basil", CB.box[0] + 10, 1040, 400, false, `<g transform="translate(-20 -270) rotate(-10)"><rect x="-22" y="-34" width="44" height="64" rx="8" fill="#43BF6C" stroke="#2B2F36" stroke-width="4"/><rect x="-22" y="-34" width="44" height="10" rx="4" fill="#C9D1DA"/></g>`, 0, 0) : "";
  const front = CAM(TF(boxX, CB.box[1], 1, iceBoxFrontV2(t)), c[0], c[1], c[2]);
  const splashFx = inBox && t < tSp + 1.0 ? [...Array(12)].map((_, i) => { const v = clamp((t - tSp) / .8), an = -Math.PI / 2 + (i - 5.5) * .25, r = 260 * v; return `<rect x="-12" y="-10" width="24" height="20" rx="5" fill="#fff" stroke="#9FD0EA" stroke-width="2.5" transform="translate(${n2(CB.box[0] + Math.cos(an) * r)} ${n2(880 + Math.sin(an) * r + 300 * v * v)}) rotate(${n2(i * 40 + v * 200)})" opacity="${n2(1 - v)}"/>`; }).join("") : "";
  // Momo and Pip slide the box in (from the right), then stand by it
  const mX = t < tP + .4 ? lerp(1700, CB.box[0] + 300, eio(clamp((t - tD) / 1.0))) : CB.box[0] + 300, pX = lerp(1920, CB.box[0] + 625, eio(clamp((t - tD - .1) / 1.1)));
  window._BUBAT = { momo: [1400, 330], pip: [1500, 300], basil: [1180, 320] };
  return CAM(bg("vdv2") + set + bike, c[0], c[1], c[2]) + basil + can + front + splashFx
    + x2bc(c, "momo", mX, 1066, 380, t, { in: tD - 3, noStay: true, flip: true, poses: [[0, "pointing"], [tP + .4, "sit"], [MK("cold") - .2, "sit"]], look: -10 })
    + x2bc(c, "pip", pX, 1066, 330, t, { in: tD - 3, noStay: true, flip: true, poses: [[0, "panic/surprised"], [tSp + .4, "sit"], [LT("k613") - .1, "sit"], [LE("k613") + .05, "angry/pointing"]], look: t >= LT("k613") - .2 ? 0 : -8 })
    + (inBox && t > LT("k612") + 1.2 && t < LE("k612") ? x2held(c, "momo", CB.box[0] + 300, 1066, 380, true, `<g transform="rotate(10)"><rect x="-22" y="-34" width="44" height="64" rx="8" fill="#E5484D" stroke="#2B2F36" stroke-width="4"/><rect x="-22" y="-34" width="44" height="10" rx="4" fill="#C9D1DA"/></g>`, -20, 10) : "")
    + comicWord(t, tBk, CB.box[0] - 160, 470, "BONK!", { size: 84, d: .7 }) + comicWord(t, tSp, CB.box[0] + 60, 400, "KER-SPLOOSH!", { size: 92, d: 1.0 }) + comicWord(t, tSp + 1.1, CB.box[0] + 160, 820, "plip.", { size: 40, tiny: true, col: "#BFE6F7", d: .8 })
    + x2lab(t, MK("brkl"), MK("cold") - .3, c, "brakes: help the bike slow down and stop safely", 760, 300, CB.bike[0] + CB.bk * (BK.HT[0] - 76), CB.bike[1] + CB.bk * (BK.HT[1] - 34), 36)
    + (t >= LT("k612") - .1 ? x2raceClock(t, 180, spring(t, LT("k612") - .1, .45)) : "")
    + x2fine(t, LT("k613"), s.t1 - .1, "Ride safely; check your brakes.") + OP(ramp(t, MK("cold") - .1, .2) * (1 - ramp(t, LE("k612"), .3)), TF(1480, 980, 1, tpill(0, 0, "brrr...", 30, "#BFE6F7", P.ink, { w: 700 })))
    + x2HUD(t); }

/* ================================================================ RACE · FIX 1, TESTED (the twist) ================================================================ */
// (A) r701-r702: HEAD-ON at the start line: Uncle Lim (left) on his roadster, Basil (right) on his stripped bike with a race plate taped to
// the bars (it hides his legs: his sitting painting reads as sitting on the saddle), both helmets buckled; Pip the starter (right) with a
// flag; Momo at the finish ribbon (left). Heart's trailer aside: letterbox bars, slow push-ins (Basil's eyes, the crown, the snail), the
// lettering ONE RACE. ONE CROWN. ONE SNAIL. (B) GO!: a comic split screen: left, Basil head-on pedalling as hard as he can, going nowhere;
// right, a wide side view: Uncle Lim pushes off slowly (FACES right), rings at the pigeons (they hop aside), squeezes his brakes gently at
// the corner, rides out right and back in from the left (the loop) and across the line; the ribbon breaks; zoom. (C) Basil slumps; toot;
// the head-on two-shot with Momo (and Pip); (D) r707: the side by side; STILL STUCK.
const RCB = [1180, 1066], RCL = [760, 1066], RCK = .9;
const x2basilFront = (t, c, x, y, k, o = {}) => { const cr = o.crank || 0, sl = o.slump || 0;
  const body = x2bc(c, "basil", x + 6 * k, y - 236 * k + 40 * k * sl, 380 * k, t, { tag: false, shadow: false, noreact: !!o.noreact, poses: o.poses || [[0, "sit"]], look: o.look || 0, still: o.still, ...x2grease(9999) });
  return { body, bike: CAM(TF(x, y, k, bikeFrontV2(t, { crank: cr, bell: 0, brakes: 0, plate: true, blur: o.blur || 0 })), c[0], c[1], c[2]) }; };
SC.race = (t, s) => { const tg = MK("racego"), tS = MK("slump"), tm = LT("r703m") - .3;
  if (t >= tg && t < tm) return x2raceSplit(t, s);
  if (t >= tm) return x2raceAfter(t, s);
  const tr = [MK("tr1"), MK("tr2"), MK("tr3")], trOn = t < LE("r701") + .3, lb = ss(s.t0, s.t0 + .5, t) * (1 - ss(LE("r701") + .2, LE("r701") + .7, t));
  // the trailer push-ins: Basil's eyes, the crown, the snail
  const c = camOn([960, 660], 1.0), pts = [[RCB[0], 560, 2.4], [520, 880, 2.2], [560, 1030, 3.0]];
  const B = x2basilFront(t, c, ...RCB, RCK, { poses: [[0, "hero/arms_crossed"], [LT("r702") + .2, "sit"]], noreact: trOn });
  const lim = CAM(TF(...RCL, RCK * .82, limFrontRideV2(t, {})), c[0], c[1], c[2]);
  const set = TF(520, 960, .85, crownStoolV2(1)) + TF(560, 1070, .62, `<!--FACES:right snail-->` + snailV2(t));
  const wave = ss(MK("go") - .2, MK("go"), t), check = LT("r702") + .1;
  window._BUBAT = { pip: [1500, 330], basil: [1220, 260] };
  return CAM(bg("vdv2") + set, c[0], c[1], c[2]) + lim + B.body + B.bike
    + x2bc(c, "momo", 170, 1070, 360, t, { in: s.t0 - .5, poses: [[0, "sit"]], look: 4, ...watchO(170, 900) })
    + x2bc(c, "pip", 1650, 1070, 360, t, { in: s.t0 - .5, flip: true, poses: [[0, "sit"]], look: t > check && t < check + 1.4 ? -12 : -5, jump: [[check, 10], [check + .6, 10]] })
    + x2held(c, "pip", 1650, 1070, 360, true, TF(0, 0, .8, flagV2(t, wave)), -60, -10)
    + windV2(t, ...camPt(c, [RCB[0], 760]), 300, trOn ? .8 : 0)
    + (lb > 0 ? `<rect width="1920" height="${n2(130 * lb)}" fill="#000"/><rect y="${n2(1080 - 130 * lb)}" width="1920" height="${n2(130 * lb)}" fill="#000"/>` : "")
    + x2trailerPanels(t, s, tr, pts, lim, set)
    + ["ONE RACE.", "ONE CROWN.", "ONE SNAIL."].map((w, i) => t >= tr[i] && t < (i < 2 ? tr[i + 1] - .2 : LE("r701") + .2) ? TF(960, 1000, lerp(1.4, 1, eo((t - tr[i]) / .25)), T(0, 30, w, 76, "#fff", { ls: 14 })) : "").join("")
    + (t > LE("r701") ? x2HUD(t) + x2raceClock(t, Math.max(0, 180 - (t - LE("r701"))), 1, 960, 62, t >= MK("go") ? 1 : 0) : ""); };
// the trailer's three slow push-ins, each in a wide letterbox PANEL over the scene (Basil's eyes, the crown, the snail); the wide shot and the
// buddies stay under it (no camera jumps)
function x2trailerPanels(t, s, tr, pts, lim, set) { let out = "";
  for (let i = 0; i < 3; i++) { const a = tr[i] - .1, b = i < 2 ? tr[i + 1] - .2 : LE("r701") + .1; if (t < a || t > b + .25) continue; const k = clamp((t - a) / .25) * (1 - clamp((t - b) / .25)), z = pts[i][2] * (1 + .12 * eio(clamp((t - a) / (b - a))));
    const cc = camOn([pts[i][0], pts[i][1]], z, 960, 470), inner = CAM(bg("vdv2") + set, cc[0], cc[1], cc[2]) + (i === 0 ? x2basilFront(t, cc, ...RCB, RCK, { poses: [[0, "hero/arms_crossed"]], noreact: true }).body + x2basilFront(t, cc, ...RCB, RCK, {}).bike : "");
    out += OP(k, `<clipPath id="trP"><rect x="160" y="250" width="1600" height="440" rx="20"/></clipPath><g clip-path="url(#trP)">${inner}</g><rect x="160" y="250" width="1600" height="440" rx="20" fill="none" stroke="#fff" stroke-width="8"/>`); }
  return out; }
// (B) the split screen (comic panels): left Basil head-on going nowhere; right the void deck loop, side view
function x2raceSplit(t, s) { const tg = MK("racego"), u = t - tg, tS = MK("slump"), tWin = LT("r703") - .6;
  const L = `<clipPath id="spL"><rect x="40" y="150" width="760" height="790" rx="24"/></clipPath>`, R = `<clipPath id="spR"><rect x="840" y="150" width="1040" height="790" rx="24"/></clipPath>`;
  // left: Basil head-on, the pedals a cartoon blur, going nowhere; sweat; then he slumps over the plate
  const cL = camOn([RCB[0], 700], .95, 420, 545), sl = ss(tS - .1, tS + .5, t), cr = t < tS ? u * 18 : (tS - tg) * 18 + 2 * (1 - Math.exp(-(t - tS)));
  const B = x2basilFront(t, cL, ...RCB, RCK, { crank: cr, blur: t < tS ? 1 : 0, slump: sl, poses: [[0, "shocked/surprised"], [tS, "deadpan"]], look: sl * 10, noreact: true });
  let sweat = t < tS ? [0, 1, 2].map((i) => { const v = ((t * 1.6 + i / 3) % 1); return `<path d="M${n2(420 + (i - 1) * 140)} ${n2(330 + 60 * v)} q-8 14 0 22 q8 -8 0 -22z" fill="#9FD8FF" opacity="${n2(1 - v)}"/>`; }).join("") : "";
  const left = `<g clip-path="url(#spL)">${CAM(bg("vdv2"), cL[0], cL[1], cL[2])}${B.body}${B.bike}${sweat}</g>`;
  // right: the loop, side view: Lim pushes off slowly to the right (FACES right), rings at the pigeons (they hop aside), squeezes his brakes
  // at the corner (the letterboxes), out at the right; back in from the left; across the line; the ribbon breaks; WINNER
  const cR = camOn([820, 820], .8, 1360, 660), pass = tWin - tg, half = pass * .5;
  const lx = u < half ? lerp(520, 2350, u / half) : lerp(-500, 560, clamp((u - half) / (pass - half))), moving = u < pass, cr2 = moving ? u * 2.4 : pass * 2.4;
  const pigeonsHop = (x0) => [0, 1, 2].map((i) => { const near = Math.abs(lx - (x0 + i * 60)) < 260 && u < half, hp = near ? 50 : 0; return TF(x0 + i * 60 + (near ? 40 : 0), 1040 - hp * Math.abs(Math.sin(t * 9 + i)), .7, pigeonV2(t, { peck: near ? 0 : .5 + .5 * Math.sin(t * 6 + i), ph: i })); }).join("");
  const ringNow = moving && Math.abs(lx - 1150) < 160 && u < half, brakeNow = moving && Math.abs(lx - 1700) < 140 && u < half;
  const right = `<g clip-path="url(#spR)">${CAM(bg("vdv2") + pigeonsHop(1200) + TF(240, 1000, .8, `<path d="M0 0 V-260" stroke="#8C96A2" stroke-width="10"/>`) + ribbonV2(240, 560, 800, moving && lx < 600 && u > half ? 0 : u >= pass - .1 ? clamp((u - pass + .1) / .5) : 0)
    + TF(lx, 1040, .62, `<!--FACES:right limRide-->` + limRideV2(t, { crank: cr2 * (brakeNow ? .6 : 1), ring: ringNow ? 1 : 0, sip: !moving ? .5 + .5 * Math.sin((t - tWin) * 1.4) : 0, stand: !moving })) + TF(1860, 1000, .9, crownStoolV2(1)) + TF(180 + 4 * u, 1066, .6, `<!--FACES:right snail-->` + snailV2(t)), cR[0], cR[1], cR[2])}</g>`;
  const momoR = x2bc(cR, "momo", 300, 1070, 380, t, { in: tg - 3, noStay: true, poses: [[0, "sit"], [tWin + .2, "surprised"], [LT("r703") + 1.2, "sit"]], look: 4, ...watchO(300, 1000), tag: false });
  const frame = `<rect x="40" y="150" width="760" height="790" rx="24" fill="none" stroke="#fff" stroke-width="10"/><rect x="840" y="150" width="1040" height="790" rx="24" fill="none" stroke="#fff" stroke-width="10"/>`;
  window._BUBAT = {};
  return `<rect width="1920" height="1080" fill="${P.indigo}"/>` + L + R + left + `<g clip-path="url(#spR)">${right}${momoR}</g>` + frame
    + (ringNow ? comicWord(t, t - .01, ...camPt(cR, [lx + 140, 820]), "ring ring!", { size: 40, tiny: true, col: "#fff", d: .5 }) : "") + (brakeNow ? comicWord(t, t - .01, ...camPt(cR, [lx, 840]), "squeak", { size: 36, tiny: true, col: "#fff", d: .4 }) : "")
    + (u > pass - .4 && u < pass + .5 ? comicWord(t, tg + pass - .4, ...camPt(cR, [560, 840]), "zoom.", { size: 34, tiny: true, col: P.sun, d: .9 }) : "")
    + (t >= tWin + .2 ? TF(1360, 230, spring(t, tWin + .2, .45), tpill(0, 0, "WINNER: UNCLE LIM", 44, P.leaf, "#fff", { w: 700 })) : "")
    + (t >= LT("r703") - .05 ? x2limSay("r703", ...camPt(cR, [lx + 120, 520]), t) : "")
    + tpill(170, 200, "BASIL", 30, P.basil, P.ink, { w: 700, ls: 4 }) + tpill(1000, 200, "UNCLE LIM", 30, P.lim, "#fff", { w: 700, ls: 4 })
    + x2raceClock(t, 0, 1, 960, 62, 1) + logo(t); }
// (C) after: the head-on two-shot (Basil on his bike, Momo beside him, Pip a step away); then (D) the side by side
function x2raceAfter(t, s) { const tm = LT("r703m") - .3, c = camOn([1000, 700], 1.12, 960, 600), tG = MK("gap");
  const B = x2basilFront(t, c, ...RCB, RCK, { slump: 1 - ss(LT("r704") - .2, LT("r704") + .3, t), poses: [[0, "deadpan"], [LT("r707") - .05, "oops"]], noreact: false });
  const sideK = ss(LT("r707") - .2, LT("r707") + .3, t) * (1 - ss(LE("r707") + .5, LE("r707") + .9, t));
  const side = sideK > .01 ? (() => { const cr = (t - LT("r707")) * 3, card = (x, title, inner, col) => TF(x, 470, .9 * spring(t, LT("r707") - .2, .45) * (1 - ss(LE("r707") + .5, LE("r707") + .9, t)), `<g filter="url(#drop)"><rect x="-430" y="-300" width="860" height="560" rx="34" fill="#FFF8EA" stroke="${col}" stroke-width="8"/></g>` + T(0, -240, title, 40, P.ink) + inner);
    const gap = .5 + .5 * Math.sin((t - tG) * 5) * (t >= tG ? 1 : 0);
    return `<rect width="1920" height="1080" fill="${P.night}" opacity="${n2(.5 * sideK)}"/>`
      + card(500, "Basil's bike", TF(0, 160, .72, bikeP4(t, { chain: false, brakes: 0, bell: 0, crank: cr, sh: 0, g2: 0, pedalBlur: .6, gapGlow: t >= tG ? gap : 0, stand: false })) + tpill(-150, 220, "pedals: turning", 26, "#fff", P.ink, { w: 700 }) + tpill(190, 220, "back wheel: still", 26, "#E5484D", "#fff", { w: 700 }) + (t >= tG ? OP(spring(t, tG, .4), tpill(-40, -150, "nothing joins them", 30, P.sun, P.ink, { w: 700 })) : ""), "#E5484D")
      + card(1420, "Uncle Lim's bike", TF(0, 160, .62, roadsterV2(t, { crank: cr, stand: false })) + tpill(-170, 220, "chain: turning", 26, "#fff", P.ink, { w: 700 }) + tpill(190, 220, "back wheel: turning", 26, P.leaf, "#fff", { w: 700 }), P.leaf)
      + (t >= MK("stuck") ? TF(960, 900, spring(t, MK("stuck"), .45) * (1 - ss(LE("r707") + .5, LE("r707") + .9, t)), x2fixCard(t, 1, { k: .36, stamp: ["STILL STUCK", false, MK("stuck") + .35] })) : ""); })() : "";
  window._BUBAT = { momo: [600, 330], basil: [1200, 240], pip: [1560, 320] };
  return CAM(bg("vdv2"), c[0], c[1], c[2]) + B.body + B.bike
    + x2bc(c, "momo", 640, 1070, 380, t, { in: tm - .4, poses: [[0, "sit"], [LE("r703m") + .1, "sit"], [LE("r704") + .1, "unimpressed"], [LT("r705") - .1, "sit"], [LE("r706") + .05, "laugh/cheer"], [LT("r707") + .4, "sit"], [LT("r708") - .1, "thinking"], [LT("r708") + .2, "sit"]], look: 5 })
    + x2bc(c, "pip", 1660, 1070, 360, t, { in: tm - .2, flip: true, poses: [[0, "sit"], [LE("r705") + .05, "embarrassed/oops"], [LE("r706") + .3, "sit"], [LT("r707") + .2, "arms_crossed"]], look: -5 })
    + side + x2HUD(t); }
