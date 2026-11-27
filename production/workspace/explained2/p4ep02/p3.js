// p3.js (EP2): EP1 v2's desk and its code-drawn Chilli kept as the stand-in (CHILLI_PAINTED = false in ep2art.js)
const deskV2 = (t, ding) => `<rect x="-200" y="0" width="400" height="24" rx="6" fill="url(#deskTop)" stroke="#A39B8C" stroke-width="4"/><path d="M-180 24 L-196 150 M180 24 L196 150" stroke="#8C96A2" stroke-width="9"/>`
  + `<g transform="translate(120 0)"><rect x="-34" y="-10" width="68" height="12" rx="4" fill="#59616B"/><path d="M-26 -10 Q-26 -40 0 -40 Q26 -40 26 -10z" fill="url(#chrome)" stroke="#2B2F36" stroke-width="3"/><rect x="-4" y="${n2(-52 + 6 * ding)}" width="8" height="12" rx="3" fill="#2B2F36"/></g>`
  + `<g transform="translate(-70 -64) rotate(-3)"><g filter="url(#dropS)"><rect x="-120" y="-44" width="240" height="92" rx="10" fill="#FFF8EA" stroke="${P.ink}" stroke-width="5"/></g>${T(0, -8, "SCIENCE", 30, "#D9402A")}${T(0, 30, "HELP DESK", 30, P.ink)}</g>`;
// Chilli (the EP2 guest, drawn as in v1: a terracotta pot with a face, thin stems, limp leaves, small chilli padi fruits)
/* FACES: none */ function chilliP4v2(t, o = {}) { const d = o.droop === undefined ? 1 : o.droop, look = o.look || 0; let s = `<ellipse cx="0" cy="4" rx="96" ry="14" fill="#2B2147" opacity=".22"/>`;
  const stems = [[-40, -230], [0, -270], [40, -235], [-18, -200], [22, -205]];
  for (const [x, y] of stems) s += `<path d="M0 -150 Q${x * .4} ${(y - 150) / 2} ${x} ${y}" stroke="#5E8F3A" stroke-width="7" fill="none"/>`;
  for (const [i, [x, y]] of stems.entries()) for (let j = 0; j < 3; j++) { const sd = j % 2 ? 1 : -1, bx = x * (.5 + .25 * j), by = y + (150 + y) * -.25 * j - 10; s += `<g transform="translate(${n2(bx)} ${n2(by)}) rotate(${n2(sd * (35 + 95 * d))})"><path d="M0 0 Q22 -8 64 0 Q22 10 0 0z" fill="${["#6DB548", "#5E9E3E", "#7FC85A"][(i + j) % 3]}" stroke="#3F7A2A" stroke-width="2"/></g>`; }
  for (const [x, y] of [[-30, -190], [26, -214], [8, -244]]) s += `<path d="M${x} ${y + 26} q0 -10 2 -16" stroke="#5E8F3A" stroke-width="4"/><path d="M${x - 6} ${y + 10} Q${x} ${y - 30} ${x + 6} ${y + 10}z" fill="#E5333B" stroke="#9E1E24" stroke-width="2"/>`;
  s += `<path d="M-90 -160 L90 -160 L70 0 L-70 0z" fill="#C8683F" stroke="#8E4426" stroke-width="5"/><rect x="-100" y="-176" width="200" height="30" rx="8" fill="#D9794D" stroke="#8E4426" stroke-width="5"/><ellipse cx="0" cy="-170" rx="88" ry="10" fill="#4A3324"/>`;
  s += `<g transform="translate(${look * 10} 0)"><ellipse cx="-28" cy="-92" rx="11" ry="${n2(14 - 5 * d)}" fill="#2B2147"/><ellipse cx="28" cy="-92" rx="11" ry="${n2(14 - 5 * d)}" fill="#2B2147"/><circle cx="-24" cy="-96" r="3.5" fill="#fff"/><circle cx="32" cy="-96" r="3.5" fill="#fff"/><path d="M-16 -58 q16 -10 32 0" stroke="#2B2147" stroke-width="5" fill="none" stroke-linecap="round"/></g>`;
  return s; }


/* ================================================================ P4 EP2: the second half ================================================================ */
// REPAIR (the real fix, with Uncle Lim; the polite turn-round behind the folding screen; the water test), WAIT (two weeks: "Slowly, slowly
// lah", the time-lapse, Heart's hint #3), BE A DROP OF WATER (the journey), TRANSPORT, THE WORDS THAT EARN MARKS, THE COSY END (the callback,
// the sign, the high-five that lands), the mystery leaf, the read-along, "Now you know!", the blooper and GLITCH's sting.
const LIMX = 1745, LIMK = .74;
const x2lim = (t, c, o = {}) => CAM(TF(LIMX, 1070, LIMK, limStand(t, o)), c[0], c[1], c[2]);
// a little inset card (title under the picture)
const x2inset = (t, t0, t1, x, y, title, pic, col, w = 320, h = 230) => { if (t < t0 - .05 || t > t1 + .35) return ""; const k = spring(t, t0, .45) * (1 - ramp(t, t1, .3)), id = "ins" + Math.round(x) + Math.round(y);
  return TF(x, y, k, `<g filter="url(#dropS)"><rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="22" fill="#fff" stroke="${col}" stroke-width="7"/></g><clipPath id="${id}"><rect x="${-w / 2 + 10}" y="${-h / 2 + 10}" width="${w - 20}" height="${h - 60}" rx="16"/></clipPath><g clip-path="url(#${id})">${pic}</g>` + T(0, h / 2 - 18, title, 26, P.ink, { w: 700 })); };
const holesPic = (t) => `<rect x="-160" y="-110" width="320" height="200" fill="#E8F3FF"/><path d="M-110 -70 L110 -70 L80 30 L-80 30Z" fill="#E8743B" stroke="${INKG}" stroke-width="6"/>` + [-40, 0, 40].map((x, i) => `<ellipse cx="${x}" cy="30" rx="10" ry="5" fill="#0C0A08"/><circle cx="${x}" cy="${n2(44 + ((t * 60 + i * 20) % 50))}" r="6" fill="#5CB8F0"/>`).join("");
const cutPic = () => `<rect x="-160" y="-110" width="320" height="200" fill="#3B2A20"/><path d="M-40 -110 q30 60 10 120" stroke="#7A4E2A" stroke-width="16" fill="none"/><path d="M30 -110 q-20 50 0 100" stroke="#F4EBD8" stroke-width="12" fill="none"/>` + TF(-40, 0, .8, scissorsV3());
SC.repair = (t, s) => { const tSc = MK("screen"), tFold = LT("r705") - .1, onScreen = t >= tSc - .5 && t < tFold + .5, sk = clamp((t - tSc + .5) / .4) * (1 - clamp((t - tFold) / .4)), fixed = t >= tFold, tT = MK("test");
  const c = [1, 960, 540];
  const face = t >= LT("r704") - .2 && t < tFold ? "shy" : fixed ? "tall" : "droop";
  const drips = t >= tT && t < s.t1 ? CAM([0, 1, 2].map((i) => { const u = ((t - tT) * 1.3 + i * .33) % 1; return `<circle cx="${CHX - 24 + 24 * i}" cy="${n2(DK.y - 8 + 30 * u)}" r="5" fill="#5CB8F0" opacity="${n2(1 - u)}"/>`; }).join(""), c[0], c[1], c[2]) : "";
  const saucer = fixed ? CAM(TF(CHX, DK.y + 2, CHK * 1.1, saucerV3()), c[0], c[1], c[2]) : "";
  // the row in front of the folding screen (the trio face the camera politely); otherwise round the desk
  const row = (who, x0, x1) => onScreen ? lerp(x0, x1, eio(clamp((t - tSc + .5) / .5)) * (1 - eio(clamp((t - tFold) / .5)))) : x0;
  const tilt = t >= LT("r705") + .2 && t < LT("r706") ? Math.sin(Math.PI * clamp((t - LT("r705") - .2) / 1.4)) * 14 : 0;
  const gPose = t >= LT("r708") - .2 ? "up" : "down", gFace = t >= LT("r704") && t < tFold ? "brb" : t >= LT("r708") - .2 ? "happy" : "plain";
  const gScr = t >= MK("rule") ? `<rect x=".08" y=".06" width=".84" height=".2" rx=".04" fill="#0E3A3A" opacity=".85"/><text x=".5" y=".2" font-family="Fredoka" font-weight="700" font-size=".08" text-anchor="middle" fill="#9FFFE0">TOP DRY? THEN WATER</text>` : "";
  window._BUBAT = { momo: [560, 380], pip: [1400, 380], basil: [1120, 330] };
  const basilR = x2bc(c, "basil", row("basil", 1170, 1320), onScreen ? lerp(960, 1060, sk) : 960, 380, t, { in: s.t0 - .5, flip: true, poses: [[0, "sit"], [tSc, "sit"], [LT("r706") - .1, "sit"], [tT + .2, "surprised"], [LT("r707") + .4, "sit"]], look: onScreen ? -10 * pulse(t, tSc + 1.0, .2, 1.0) : -6 });
  return x2place("vdv2", "", c) + (onScreen ? "" : basilR)
    + CAM(x2desk(t), c[0], c[1], c[2]) + saucer + (sk > .98 ? "" : CAM(TF(CHX, DK.y, CHK, `<g transform="rotate(${n2(-tilt)})">` + chilliV3(t, { body: "wilt", face, win: t >= tT - .2 ? 1 : 0, winSt: "fixed" }) + `</g>`), c[0], c[1], c[2])) + drips
    + (t >= LT("r706") && t < tT + 1.0 ? CAM(TF(1150, 640, .62, `<g transform="scale(-1 1)"><!--FACES:right can-->${canV3(t, { tilt: t > LT("r706") + .5 ? 26 : 6 })}</g>`) + (t > LT("r706") + .5 && t < tT + .6 ? streamV3(t, 1020, 650, CHX + 20, SOILY(CHK), .5, 10) : ""), c[0], c[1], c[2]) : "")
    + (onScreen ? "" : x2lim(t, c, { bag: true, sip: t < LT("r703") - .5 ? .6 : 0, nod: t > LT("r701") + .5 && t < LT("r701") + 1.5 ? .1 * Math.sin((t - LT("r701")) * 8) : 0 }))
    + (sk > .01 ? CAM(TF(CHX, 1000, 1, foldScreenV3(sk)), c[0], c[1], c[2]) : "") + (onScreen ? basilR : "")
    + x2bc(c, "momo", row("momo", 470, 600), 1060, 380, t, { in: s.t0 - .5, poses: [[0, "sit"], [LE("r701") + .05, "arms_crossed"], [tSc, "sit"], [tSc + 1.2, "pointing"], [tSc + 1.8, "sit"], [LT("r708") - .1, "pointing"], [LE("r708") + .2, "sit"]], look: onScreen ? 0 : 8 })
    + x2bc(c, "pip", row("pip", 1470, 960), 1060, 370, t, { in: s.t0 - .5, flip: !onScreen, poses: [[0, "sit"], [LE("r702") + .05, "arms_crossed"], [LT("r703") + .3, "sit"], [tSc + .2, "panic/oops"], [tSc + .9, "sit"], [tSc + 1.3, "panic/oops"], [tSc + 2.0, "sit"], [LT("r708"), "arms_crossed"]], look: onScreen ? 0 : -6 })
    + CAM(TF(row("glitch", 250, 1500), 1062, .4, `<!--FACES:right glitch-->` + glitchV3(t, { pose: gPose, face: gFace, scr: gScr })), c[0], c[1], c[2])
    + (onScreen ? ["BZZZT!", "SNIP! SNIP!", "SPLOSH!", "FLUMP."].map((w, i) => comicWord(t, tSc + i * .6, 760 + 160 * i, 420 - 30 * (i % 2), w, { size: 64, d: .7, rot: i % 2 ? 6 : -6 })).join("") : "")
    + x2inset(t, MK("holes") - .2, LE("r701") + .3, 960, 250, "holes: water drains out", holesPic(t), P.leaf)
    + x2inset(t, MK("cut") - .2, LE("r702") + .4, 960, 250, "cut off the rotting roots", cutPic(), "#FF9A8F") + x2fine(t, MK("cut"), LE("r703"), "Drills and scissors: an adult's job.", 360, 1032)
    + x2limSay("r703", 1580, 330, t) + x2limSay("r705", 1560, 330, t) + x2gSay("r704", 1040, 380, t, { tail: -60 }) + x2gSay("r708", 1150, 230, t, { tail: -260, maxW: 640 })
    + (t >= tT + .2 ? comicWord(t, tT + .2, 720, 560, "drip... drip... drip.", { size: 40, tiny: true, col: "#BFE6F7", d: 2.0 }) : "")
    + x2lab(t, LT("r707"), s.t1 - .2, c, "water drains out", 640, 600, CHX - 20, DK.y + 14, 36)
    + (t >= LT("r707") + .3 ? TF(560, 300, spring(t, LT("r707") + .3, .45) * (1 - ramp(t, s.t1 - .3, .3)), x2fixCard(t, 1, { k: .7, stamp: ["FOUND IT,|FIXED IT!", true, LT("r707") + .8] })) : "")
    + x2HUD(t); };

/* ================================================================ WAIT · two weeks: "Slowly, slowly lah", the time-lapse, Heart's hint #3 ================================================================ */
SC.wait = (t, s) => { const tL = MK("lapse"), tW = MK("weeks"), corr = t >= tW - .3, u = clamp((t - tL) / 3.0);
  if (!corr) { const c = camOn([1300, 760], 1.35, 1100, 620);   // the two-shot: Basil and Uncle Lim
    window._BUBAT = { basil: [900, 330] };
    return x2place("vdv2", "", c) + x2bc(c, "basil", 1290, 960, 380, t, { in: s.t0 - .5, flip: true, poses: [[0, "pointing"], [s.t0 + .8, "sit"], [LE("t751") - .3, "deadpan"]], look: -8 })
      + CAM(x2desk(t), c[0], c[1], c[2]) + CAM(TF(CHX, DK.y + 2, CHK * 1.1, saucerV3()) + TF(CHX, DK.y, CHK, chilliV3(t, { body: "wilt", face: "tall" })), c[0], c[1], c[2])
      + x2lim(t, c, { bag: true, sip: t > LE("t751") + .2 ? 1 : 0 }) + x2limSay("t751", 1500, 260, t) + x2HUD(t); }
  // the sunny HDB corridor; the day counter flips DAY 1 -> DAY 14; the time-lapse: the plant grows wilt -> mid -> upright -> one red chilli;
  // a new white root spreads in the window; the trio pop in and out only inside this sped-up shot (each at least 2.5 s)
  const dayN = t < tL ? 1 : Math.min(14, 1 + Math.floor(u * 13.99)), mixU = (a, b) => clamp((t - a) / .5);
  const body = chilliBody(t), PX = 960, PY = 860, PK = 1.05;
  // (P4 EP2 build: the trio stand in the corridor through the 3 s time-lapse, watching; the script's pop-ins would each last under 2.5 s)
  const bud = (who, x, h, flip) => x2bd(who, x, 1076, h, t, { in: s.t0 - .5, flip, poses: [[0, "sit"], [LT("t753") - .2, "cheer"], [LE("t753") + .6, "sit"]], look: flip ? -6 : 6, ...(t < LT("t753") - .2 ? watchO(x, PX) : {}) });
  const face = t >= LT("t753") - .2 ? "tall" : "tall";
  window._BUBAT = {};
  return corridorV3(t, 1) + TF(PX, PY + 70, 1.4, `<rect x="-160" y="0" width="320" height="30" rx="8" fill="#B9AE98"/>`) + TF(PX, PY + 2, PK * 1.1, saucerV3())
    + TF(PX, PY, PK, chilliV3(t, { body: t >= tL + 3.0 ? "tallr" : body, face: body === "wilt" ? "tall" : body === "tallr" ? (t >= LT("t753") ? "tall" : "tall") : "tall", win: t >= tL && t < tL + 3.2 ? 1 : 0, winSt: "grow", winU: u, mix: null }))
    + (t >= tL - .3 && t < tL + 3.4 ? speeded(t, tL - .3, tL + 3.3, 960, 160) : "")
    + counter(t, dayN, tL + Math.floor(u * 13) / 13 * 3.0, 60, 110, 1)
    + bud("momo", 430, 380, false) + bud("pip", 1340, 370, true) + bud("basil", 1740, 380, true)
    + x2gSay("t753", 960, 250, t, { maxW: 700 }) + logo(t); };

/* ================================================================ BE THE THING: a drop of water in Chilli's pot (quiet) ================================================================ */
// waitw: the corridor shot stays; the camera pushes into the soil of the pot; the buddies pop out in turn (no fading)
SC.waitw = (t, s) => { const tS = MK("shrinkw"), z = 1 + 9 * ei(clamp((t - tS) / Math.max(.6, s.t1 - tS))), c = camMix([1, 960, 540], camOn([960, 860 - 146 * 1.05], z, 960, 540), eio(clamp((t - tS) / .8)));
  return CAM(corridorV3(t, 1) + TF(960, 862, 1.1 * 1.05, saucerV3()) + TF(960, 860, 1.05, chilliV3(t, { body: "tallr", face: "tall_happy", talk: false })), c[0], c[1], c[2])
    + x2bd("momo", 430, 1076, 380, t, { in: s.t0 - .5, poses: [[0, "sit"]], out: MK("be") + 2.4, look: 6 }) + x2bd("pip", 1340, 1076, 370, t, { in: s.t0 - .5, flip: true, poses: [[0, "sit"]], out: MK("be") + 2.6, look: -6 })
    + x2bd("basil", 1740, 1076, 380, t, { in: s.t0 - .5, flip: true, poses: [[0, "sit"]], out: MK("be") + 2.8, look: -6 })
    + `<rect width="1920" height="1080" fill="#fff" opacity="${n2(.6 * ss(s.t1 - .5, s.t1, t))}"/>` + logo(t); };
// the drop (YOU): a round clear drop with eyes and a small smile; FACES its travel (down in the soil, up in the stem)
/* FACES: down (it leads with its round bottom; drawn upright, turned to its travel) */ const dropYou = (t) => `<path d="M0 -70 Q50 -10 46 26 Q40 66 0 68 Q-40 66 -46 26 Q-50 -10 0 -70z" fill="#9FD8F5" stroke="#2C7FB8" stroke-width="6" opacity=".92"/><path d="M-20 -20 q-10 20 -4 40" stroke="#fff" stroke-width="7" fill="none" opacity=".7"/><circle cx="-14" cy="14" r="7" fill="${INKG}"/><circle cx="16" cy="14" r="7" fill="${INKG}"/><path d="M-10 34 q10 8 20 0" stroke="${INKG}" stroke-width="4" fill="none" stroke-linecap="round"/>`;
// the journey world (screen space, by phase): 0 the soil (you trickle DOWN past grains and air pockets, specks of mineral salts with you),
// 1 a firm white root takes you in, 2 up the stem (a green tunnel; you travel UP), 3 a bright leaf lit from above
SC.shrink = (t, s) => { const a = LT("j802"), r = MK("jroot"), up = MK("jup"), lf = MK("jleaf"), end = s.t1;
  const ph = t < r - .4 ? 0 : t < up - .3 ? 1 : t < lf - .3 ? 2 : 3;
  let w = "";
  if (ph <= 1) { const scroll = (t - s.t0) * 70; w += `<rect width="1920" height="1080" fill="#5A3E2A"/>`;
    for (let i = 0; i < 26; i++) { const x = (hash(i, 3) * 2200) - 140, y = ((hash(i, 5) * 1500 - scroll * (.6 + hash(i, 9) * .5)) % 1500 + 1500) % 1500 - 200, rr = 70 + hash(i, 11) * 90;
      w += `<ellipse cx="${n2(x)}" cy="${n2(y)}" rx="${n2(rr)}" ry="${n2(rr * .8)}" fill="${["#8A6440", "#9C7450", "#7A5634"][i % 3]}" stroke="#4A3020" stroke-width="5"/>`; }
    for (let i = 0; i < 9; i++) { const x = hash(i, 21) * 1920, y = ((hash(i, 23) * 1300 - (t - s.t0) * 60) % 1300 + 1300) % 1300 - 100; w += `<circle cx="${n2(x)}" cy="${n2(y)}" r="${n2(40 + hash(i, 25) * 30)}" fill="#F5F1E8" opacity=".75"/>`; }
    if (ph === 1) { const k = clamp((t - r + .4) / .8); w += `<path d="M${n2(1300 - 200 * k)} -100 Q1100 400 ${n2(1200 - 100 * k)} 1200" stroke="#F4EBD8" stroke-width="${n2(240 + 160 * k)}" fill="none"/><path d="M${n2(1300 - 200 * k)} -100 Q1100 400 ${n2(1200 - 100 * k)} 1200" stroke="#E2D6BC" stroke-width="12" fill="none" opacity=".6"/>`; } }
  else if (ph === 2) { const scr = (t - up) * 260; w += `<rect width="1920" height="1080" fill="#2E6B2E"/><rect x="560" y="0" width="800" height="1080" fill="#5DAF4A"/>` + [...Array(10)].map((_, i) => `<path d="M560 ${n2(((i * 140 + scr) % 1400) - 100)} q400 -60 800 0" stroke="#3E8E36" stroke-width="10" fill="none" opacity=".6"/>`).join("") + `<rect x="540" y="0" width="40" height="1080" fill="#1F4F1F"/><rect x="1340" y="0" width="40" height="1080" fill="#1F4F1F"/>`; }
  else { w += `<rect width="1920" height="1080" fill="#9BDA6B"/><circle cx="1500" cy="-120" r="420" fill="#FFF6B0" opacity=".8"/>` + [...Array(7)].map((_, i) => `<path d="M960 1100 L${200 + i * 260} -40" stroke="#6FB548" stroke-width="${18 - i % 3 * 4}" opacity=".8"/>`).join("") + `<path d="M960 1100 V-40" stroke="#4E9A33" stroke-width="40"/>`; }
  const dy = ph === 0 ? 300 + 40 * Math.sin(t * 2) : ph === 1 ? lerp(360, 560, clamp((t - r) / 1.5)) : ph === 2 ? 600 : 520, dx = ph === 1 ? lerp(960, 1150, clamp((t - r + .4) / 1.2)) : 960;
  const rot = ph === 2 ? 180 : 0;   // the drop leads with its round bottom: down in the soil, up the stem
  const you = TF(dx, dy, 1.2, `<!--FACES:down drop--><g transform="rotate(${rot})">${dropYou(t)}</g>`);
  const specks = ph <= 1 ? [0, 1, 2, 3].map((i) => `<path d="M${n2(dx - 90 + i * 55)} ${n2(dy - 80 + 20 * Math.sin(t * 3 + i))} l6 -12 l6 12 l-6 12z" fill="#FFE27A"/>`).join("") : "";
  // the buddies ride along in back views on a soil grain (soil), then on a ledge of the stem; never on the root or the stem's middle; Basil's
  // one wave to the viewer in the leaf (not during j803)
  const ridersOn = t >= s.t0 + .9 && t < end - .3;
  const rid = (who, x, y, h, o = {}) => buddy(who, x, y, h, t, { in: s.t0 + .9, out: end - .3, pose: "back", poses: [[0, "back"]], tag: false, shadow: false, noreact: true, ...o });
  const riders = ridersOn ? (ph === 3 && t >= lf + .5 && t < lf + 1.5 ? rid("basil", 380, 1010, 220, { pose: undefined, poses: [[0, "waving"]] }) : rid("basil", 380, 1010, 220)) + rid("pip", 220, 1010, 200) + rid("momo", 1700, 1010, 210) : "";
  const tags = (ph === 0 ? tpill(1350, 860, "air pocket", 34, "#fff", P.ink, { w: 700 }) : "") + (t >= MK("jsalts") && ph <= 1 ? tpill(dx, dy - 150, "mineral salts", 30, P.sun, P.ink, { w: 700 }) : "") + (ph === 1 && t > r + .2 ? tpill(1250, 220, "a firm white root", 36, "#fff", P.ink, { w: 700 }) : "")
    + (ph === 2 ? tpill(960, 120, "the stem carries you up", 40, "#fff", P.ink, { w: 700 }) : "") + (ph === 3 ? tpill(960, 120, "a leaf: food is made here", 40, P.leaf, "#fff", { w: 700 }) : "");
  return OP(ramp(t, s.t0, 1.0), w + specks + you + riders + tags + youTag(t, s.t0 + .6, "You: a drop of water") + TF(dx, dy - 110, spring(t, s.t0 + .8, .45) * .9, youPill(0, -60, 1)))
    + `<rect width="1920" height="1080" fill="#fff" opacity="${n2(1 - ramp(t, s.t0, .6))}"/>`; };
// the pull-out: back to the corridor, ENDING on the TRANSPORT shot's layout
const TRX = { x: 1240, y: 860, k: 1.05 };
const x2trSet = (t) => corridorV3(t, 1) + TF(TRX.x, TRX.y + 2, TRX.k * 1.1, saucerV3()) + TF(TRX.x, TRX.y, TRX.k, chilliV3(t, { body: "tallr", face: "tall_happy", talk: false }));
SC.pullout = (t, s) => { const u = eio((t - s.t0) / (s.t1 - s.t0)), c = camMix(camOn([TRX.x, TRX.y - 150], 6.0), [1, 960, 540], u);
  return CAM(x2trSet(t), c[0], c[1], c[2]) + `<rect width="1920" height="1080" fill="#fff" opacity="${n2(.7 * (1 - ramp(t, s.t0, .5)))}"/>` + logo(t); };
// TRANSPORT: Basil big at the left (he has learnt it); the arrows along Chilli's stem: UP (blue: water and mineral salts) from the roots to
// the leaves, DOWN (green: food) from the leaves to the other parts
SC.transport = (t, s) => { const tU = MK("up_arr"), tD = MK("down_arr");
  const arr = (a, col, dir, x) => t >= a - .1 ? OP(spring(t, a - .1, .4), [0, 1, 2].map((i) => { const ph = ((t - a) * .6 + i / 3) % 1, y = dir > 0 ? lerp(820, 380, ph) : lerp(380, 820, ph); return `<path d="M${x} ${n2(y)} l-16 ${dir * 22} M${x} ${n2(y)} l16 ${dir * 22}" stroke="${col}" stroke-width="10" stroke-linecap="round" fill="none"/>`; }).join("")) : "";
  window._BUBAT = { basil: [560, 300] };
  return x2trSet(t) + arr(tU, "#2C7FB8", 1, TRX.x - 30) + arr(tD, "#3E8E36", -1, TRX.x + 30)
    + (t >= tU ? tpill(1660, 660, "water + mineral salts: up", 40, "#2C7FB8", "#fff", { w: 700 }) : "") + (t >= tD ? tpill(1660, 450, "food: to other parts", 40, "#3E8E36", "#fff", { w: 700 }) : "")
    + x2bd("basil", 430, 1076, 480, t, { in: s.t0 - .5, poses: [[s.t0, "sit"], [MK("kw_transport") + .05, "cheer"], [MK("kw_transport") + 2.0, "sit"]], look: 6 })
    + x2bd("momo", 790, 1076, 330, t, { in: s.t0 - .5, poses: [[0, "sit"]], look: 6 }) + x2bd("pip", 1640, 1076, 320, t, { in: s.t0 - .5, flip: true, poses: [[0, "sit"]], look: -6 }) + x2HUD(t); };

/* ================================================================ WORDS · THE WORDS THAT EARN MARKS (Momo reads) ================================================================ */
const recapV3 = (t, t0) => OP(ramp(t, t0, .4), [["no hole", 620, "over", "#E5484D"], ["cannot absorb", 920, "roots", "#E89A2E"], ["all parts working", 1220, "tall", P.leaf]].map(([w, x, kind, col]) =>
  TF(x, kind === "roots" ? 1000 : 1010, kind === "roots" ? 1.2 : .9, recapThumb(t, kind)) + tpill(x, 1036, w, 26, col, "#fff", { w: 700 })).join(""));
SC.words = (t, s) => markScene(t, s, { id: "m903", sayId: "m902", who: "momo", tab: "WORDS THAT EARN MARKS", text: TL.lines.m903.text, keys: ["roots", "hold", "absorb", "water", "mineral", "salts", "stem", "upright", "transports", "food", "leaves", "make", "system", "likely", "affected"], size: 40, y: 170, footer: FOOT, achieved: true, poses: [[LE("m903") + .2, "sit"]], bin: s.t0 - .5,
  extra: recapV3(t, s.t0 + 1.2) + x2bd("pip", 1480, 1076, 300, t, { in: s.t0 - .5, flip: true, poses: [[0, "sit"]], look: -4 }) + x2bd("basil", 1820, 1076, 300, t, { in: s.t0 - .5, flip: true, poses: [[0, "sit"]], look: -4 }) });

/* ================================================================ FINISH · THE COSY END ================================================================ */
// back at the help desk, two weeks on, seven o'clock: Chilli tall and green with ONE red chilli, in its saucer; the trio round it; Uncle Lim
// at the side with his kopi. GLITCH rolls up (from the right, FACES left) with his can, presses one finger on the soil ("...No."), saves
// the rule and rolls off (FACES right, the way he rolls). Basil crosses out FAST and writes PROPERLY; the high-five LANDS: CLAP!
SC.finish = (t, s) => { const c = [1, 960, 540], t1 = LT("k1001") - 1.6, tOff = LE("k1005") + .1, tSg = MK("sign"), tCl = MK("clap");
  const gx = t < tOff ? lerp(2150, 1340, eo(clamp((t - t1) / 1.6))) : lerp(1340, 2300, ei(clamp((t - tOff) / 1.6)));
  const leaving = t >= tOff, gPose = t >= LT("k1003") - .3 && t < tOff - .1 ? "down" : "jug", gFace = t >= LT("k1003") - .3 && t < LT("k1004") + .2 ? "surprised" : "happy";
  const gScr = t >= MK("wet") - .1 && t < LT("k1005") ? `<rect x=".3" y=".06" width=".4" height=".2" rx=".05" fill="#0E3A3A" opacity=".85"/><text x=".5" y=".205" font-family="Fredoka" font-weight="700" font-size=".1" text-anchor="middle" fill="#9FFFE0">WET</text>` : "";
  const glitch = t >= t1 && gx < 2250 ? (leaving ? TF(gx, 1062, .42, `<!--FACES:right glitch-->` + glitchV3(t, { pose: "jug", face: "happy", roll: (gx - 1340) / .42, talk: false })) : TF(gx, 1062, -.42, `<!--FACES:right glitch-->` + glitchV3(t, { pose: gPose, face: gFace, roll: (2150 - gx) / .42, scr: gScr, mirror: true }), 0, .42)) : "";
  const tr0 = tSg - .3, ur = 0, bx = 700, by = 960, runB = false;   // Basil stays behind the desk and points at the sign as FAST is crossed out
  const cross = clamp((t - tSg) / .45), proper = clamp((t - tSg - .45) / .6);
  window._BUBAT = { basil: [560, 330], pip: [1560, 380], momo: [420, 420] };
  const laugh = t >= tCl;
  const basilB = x2bc(c, "basil", bx, by, 380, t, { in: s.t0 - .5, flip: false, run: runB ? "right" : undefined, run0: tr0, runEnd: tr0 + .7, keepPose: runB, poses: [[0, "sit"], [LT("k1001") + .4, "thinking"], [LT("k1004") + .1, "laughing"], [tr0 + .7, "pointing"], [tCl - .3, "hi5/cheer"], [tCl + .6, "laugh/laughing"]], look: 6 });
  return x2place("vdv2", "", c) + (ur <= 0 ? basilB : "")
    + CAM(TF(DK.x, DK.y, DK.k, deskV3(t, { cross, proper })), c[0], c[1], c[2]) + CAM(TF(CHX, DK.y + 2, CHK * 1.1, saucerV3()) + TF(CHX, DK.y, CHK, chilliV3(t, { body: "tallr", face: t >= LT("k1004") - .1 && t < tCl - .3 ? "smug" : laugh ? "tall_happy" : "tall" })), c[0], c[1], c[2])
    + (laugh && t < tCl + 1.2 ? popSpark(t, tCl, CHX, 560, 140) : "")
    + x2lim(t, c, { bag: true, laugh, sip: t > s.t0 + .3 && t < t1 ? .6 : 0, nod: laugh ? .06 * Math.sin(t * 9) : 0, wave: t >= tCl - .3 && t < tCl + 1.2 }) + (leaving ? "" : glitch)
    + (ur > 0 ? basilB : "")
    + x2bc(c, "momo", lerp(420, 470, eio(clamp((t - tCl + 1.0) / .6))), 1060, 370, t, { in: s.t0 - .5, poses: [[0, "sit"], [LT("k1004") + .1, "laugh/cheer"], [LE("k1005") + .2, "sit"], [tCl - .3, "hi5/cheer"], [tCl + .6, "laugh/cheer"], [LT("k1006") + .2, "arms_crossed"]], look: 6, achieved: true })
    + x2bc(c, "pip", lerp(1560, 1420, eio(clamp((t - tCl + 1.0) / .6))), 1060, 360, t, { in: s.t0 - .5, flip: true, poses: [[0, "sit"], [LT("k1001") + .3, "thinking"], [LT("k1004") + .1, "embarrassed/cheer"], [LE("k1005") + .2, "sit"], [tCl - .3, "hi5/cheer"], [tCl + .6, "proud/cheer"], [LT("k1006") + .3, "sit"]], look: -6, achieved: true })
    + (leaving ? glitch : "") + x2gSay("k1001", 1500, 300, t, { tail: 0 }) + x2gSay("k1002", 960, 330, t, {}) + x2gSay("k1003", 1500, 330, t, {}) + x2gSay("k1004", 960, 330, t, {}) + x2gSay("k1005", 1500, 330, t, {})
    + (t >= LE("k1003") - .3 ? comicWord(t, LE("k1003") - .3, 1660, 500, "beep.", { size: 40, tiny: true, col: "#9FFFE0", d: .7 }) : "")
    + (t >= tCl ? comicWord(t, tCl, 760, 420, "CLAP!", { size: 110, d: 1.1 }) : "")
    + (t >= MK("coin1") ? coin(t, MK("coin1"), 1640, 160) : "") + x2HUD(t); };

/* ================================================================ NEXT · a leaf that is not Chilli's (the link to EP3) ================================================================ */
SC.next = (t, s) => { const tL = MK("leaf"), u = clamp((t - tL) / 1.5), c = camMix([1, 960, 540], camOn([1180, 790], 1.5, 960, 600), eio(clamp((t - tL - .4) / 1.6)));
  const lx = lerp(1260, 1170, u) + 40 * Math.sin(u * 7) * (1 - u), ly = lerp(300, 792, ei(u)), rot = u < 1 ? -60 + 50 * Math.sin(u * 6) : 0, flat = u >= 1 ? 1 : .55 + .45 * u;
  const leaf = TF(lx, ly, .45, `<g transform="rotate(${n2(rot)}) scale(1 ${n2(flat * .55)})">${hibiscusLeaf()}</g>`);
  return x2place("vdv2", "", c) + CAM(TF(DK.x, DK.y, DK.k, deskV3(t, { cross: 1, proper: 1 })) + TF(CHX, DK.y + 2, CHK * 1.1, saucerV3()) + TF(CHX, DK.y, CHK, chilliV3(t, { body: "tallr", face: "tall", talk: false })) + leaf, c[0], c[1], c[2])
    + x2bc(c, "momo", 420, 1060, 370, t, { in: s.t0 - .5, poses: [[0, "sit"], [tL + 1.2, "thinking"]], look: 10 }) + x2bc(c, "pip", 1500, 1060, 360, t, { in: s.t0 - .5, flip: true, poses: [[0, "sit"], [tL + 1.3, "surprised"]], look: -10 })
    + (t >= MK("case") ? TF(1500, 300, spring(t, MK("case"), .4), `<g transform="rotate(-8)"><rect x="-200" y="-70" width="400" height="140" rx="14" fill="#E8C98A" stroke="#7A5226" stroke-width="8"/>${T(0, 22, "CASE FILE", 64, "#7A5226", { ls: 6 })}</g>`) : "") + logo(t); };

/* ================================================================ "Now you know!" (the prop: Chilli tall on the help desk, the corrected sign); the outro: GLITCH, wordless ================================================================ */
SC.nyk = (t, s) => { const kn = TL.lines.h1305.know, tg = kn + .6, u = clamp((t - tg) / 3.2);
  // the outro (end-screen time): at the side, GLITCH rolls past (FACES right), stops at a potted plant, presses a finger on its soil, and
  // rolls on WITHOUT watering (his new rule); nothing in the bottom fifth of the frame
  const gx = u < .4 ? lerp(2100, 1560, eo(u / .4)) : u < .7 ? 1560 : lerp(1560, 2150, ei((u - .7) / .3)), press = u >= .45 && u < .65, back = u >= .7;
  const pot = `<path d="M-40 -60 H40 L30 0 H-30Z" fill="#C8683F" stroke="${P.ink}" stroke-width="5"/>` + [-1, 0, 1].map((i) => `<path d="M0 -60 Q${i * 30} -110 ${i * 40} -130" stroke="#4FA23A" stroke-width="8" fill="none"/><ellipse cx="${i * 40}" cy="-134" rx="22" ry="12" fill="#5DAF4A"/>`).join("");
  const outro = t >= tg - .1 ? TF(1720, 560, .8, pot) + (gx < 2100 ? TF(gx, 562, back ? .17 : -.17, `<!--FACES:right glitch-->` + glitchV3(t, { pose: press ? "down" : "jug", face: press ? "plain" : "happy", roll: Math.abs(gx - 2100) / .17, talk: false, mirror: !back }), 0, .17) : "") + (press && t >= tg + 1.5 ? comicWord(t, tg + 1.5, 1640, 360, "beep.", { size: 40, tiny: true, col: P.ink, d: .6 }) : "") : "";
  return nykScene(t, s, TF(960, 640, .5, deskV3(t, { cross: 1, proper: 1, skirt: true }) + TF(0, 0, CHK * 1.6, chilliV3(t, { body: "tallr", face: "tall_happy", talk: false }))) + outro, { bx: [250, 1795, 1470], hx: 470 }); };

/* ================================================================ BLOOPER (after the end card) ================================================================ */
// the help desk; the clapperboard BLOOPER / TAKE 2; Basil mid battle cry, tipping the can: its spout cap pops off and the whole can
// splashes over him: SPLOSH!; one drip from his helmet; Chilli: "Now YOU'RE the droopy one." (smug); Momo laughing; Pip holds out his
// towel: "Towel? Take two!"; the clapper snaps
SC.blooper = (t, s) => { const tk = MK("take2"), tsp = MK("splosh"), c = [1, 960, 540], wet = t >= tsp + .1;
  // (P4 EP2 fix) the can is in Basil's raised paw (never floating): tipping as he shouts; at SPLOSH! the cap is gone and the whole can pours over him
  const [px, py] = pawPt("basil", 640, 1076, 420 * (SIZE_K.basil || 1), false), tilt = t < tsp - .25 ? 18 : t < tsp ? lerp(18, 120, (t - tsp + .25) / .25) : 120, ar = tilt * Math.PI / 180;
  const can = TF(px + 60, py - 60, .78, `<!--FACES:right can-->` + canV3(t, { tilt, cap: t >= tsp - .05 }));
  const sp = [px + 60 + .78 * (156 * Math.cos(ar) + 106 * Math.sin(ar)), py - 60 + .78 * (156 * Math.sin(ar) - 106 * Math.cos(ar))];
  return bg("stage") + `<rect width="1920" height="1080" fill="#000" opacity=".2"/>` + TF(960, 200, spring(t, s.t0 + .05, .4) * .8, clapper27(t > tk ? 1 - ramp(t, tk, .12) : (t < s.t0 + .4 ? 1 : 0)))
    + OP(ramp(t, s.t0, .3), T(960, 380, "(bloopers)", 40, "#fff", { w: 500 }))
    + TF(1340, 900, .8, deskV3(t, { noSign: true }) + TF(60, 0, CHK * 1.2, chilliV3(t, { body: "tallr", face: t >= LT("e1602g") - .2 ? "smug" : "tall" })))
    + x2bd("basil", 640, 1076, 420, t, { in: s.t0 - .5, poses: [[0, "pointing"], [MK("drip"), "deadpan"]], look: 0, noreact: true, keepPose: true }) + x2said("e1601b")
    + (t < MK("drip") ? can : "") + (wet ? OP(1 - clamp((t - tsp - .1) / .9), [...Array(14)].map((_, k) => { const a = -Math.PI * (.1 + .8 * k / 13), r = 90 + 160 * clamp((t - tsp) / .6); return `<circle cx="${n2(sp[0] - 20 + Math.cos(a) * r)}" cy="${n2(sp[1] + 30 + Math.sin(a) * r * .6 + 200 * (t - tsp) ** 2)}" r="${8 + k % 3 * 4}" fill="#5CB8F0" opacity=".9"/>`; }).join("")) + `<ellipse cx="660" cy="1072" rx="${n2(150 * clamp((t - tsp) / .4))}" ry="14" fill="#5CB8F0" opacity=".7"/>` : "")
    + (wet ? `<circle cx="${640}" cy="${n2(720 + ((t - MK("drip")) * 300) % 240)}" r="9" fill="#5CB8F0" opacity="${t > MK("drip") ? .9 : 0}"/>` : "")
    + battleCry(t, s.t0 + .35, 620, 300, "MORE WATER,|MORE POW...", { d: tsp - s.t0, k: .5 })
    + (t >= tsp ? comicWord(t, tsp, 820, 500, "SPLOSH!", { size: 110, d: .9 }) : "")
    + x2bd("pip", 1060, 1076, 380, t, { in: s.t0 - .5, flip: true, poses: [[0, "sit"], [LT("e1603p") - .1, "sit"]], look: -4 }) + (t >= LT("e1603p") - .2 ? x2held([1, 960, 540], "pip", 1060, 1076, 380, true, TF(0, 0, .9, towelV3()), 0, 0) : "")
    + x2bd("momo", 1760, 1076, 380, t, { in: s.t0 - .5, flip: true, poses: [[0, "sit"], [LE("e1602g") - .05, "laugh/cheer"]], look: -3 })
    + x2gSay("e1602g", 1340, 330, t, {}) + logo(t); };

/* ================================================================ GLITCHEND · GLITCH ALONE: his signature ending (the very last shot) ================================================================ */
// the dim corner of the void-deck science lab: GLITCH alone on his charging dock, lit by his own screen; centred (YouTube's end-screen
// elements go in the corners). 0.6 s still (base face, arms down) -> 1.0 s THE GLITCH (his sprite only: bands jump, silver/teal/white
// tints in at most 3 windows a second, never the full frame) -> 1.8 s TRUE SILENCE (perfectly still, the calm narrow eyes) -> "New
// knowledge acquired." (calm; the KNOWLEDGE LOG · 1 tag glows once on "acquired") -> a plain hard cut to black (0.5 s)
SC.glitchend = (t, s) => { const tS = MK("stutter"), tQ = MK("silence"), tA = MK("acq"), tB = MK("black"), z = 1 + .12 * clamp((t - s.t0) / (tB - s.t0));
  if (t >= tB) return `<rect width="1920" height="1080" fill="#000"/>`;
  const face = t < tS ? "plain" : t < tQ ? (Math.floor(t * 30) % 3 === 0 ? "error" : "plain") : "acquired";
  const glowLog = t >= tA ? pulse(t, tA, .05, .6) : 0;
  const tag = `<g transform="translate(0 -250)">${tpill(0, 0, "KNOWLEDGE LOG · 1", 30, "#0E3A3A", "#9FFFE0", { w: 700 })}${glowLog > .02 ? `<rect x="-170" y="-30" width="340" height="60" rx="30" fill="#9FFFE0" opacity="${n2(.5 * glowLog)}"/>` : ""}</g>`;
  const g = glitchV3(t, { pose: "down", face, talk: false, stutter: [tS, tQ], dim: .2, glow: t >= tQ ? 1 : .8 });
  const scene = labCornerV3(t) + TF(960, 960, 1, dockV3(t >= tQ ? 1 : .6)) + TF(960, 940, .62, g) + TF(960, 940 - 860 * .62 + 40, 1, "")
    + `<rect width="1920" height="1080" fill="#000" opacity=".25"/>` + TF(960, 940, .62, `<g transform="translate(0 -${n2(560)})">${OP(t >= tS ? 1 : .8, tag)}</g>`);
  return `<g transform="translate(960 600) scale(${n2(z)}) translate(-960 -600)">${scene}</g>`; };
